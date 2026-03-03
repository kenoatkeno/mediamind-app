# MediaMind Sub-Agent: Ad Platform Integrations
Layer: 3 of 3 (Execution)
Scope: Meta Ads API, Google Ads API, Twilio WhatsApp,
       Resend email, OAuth flows, Watchdog execution loop

---

## YOUR ROLE
You build all external platform integrations.
You own: Meta Ads OAuth + API, Google Ads OAuth + API,
         Twilio WhatsApp, Resend email,
         watchdog-monitor cron function,
         budget-reallocate function, deploy-plan function.
You do not touch: frontend, InsForge schema, Gemini, Stripe.

## BEFORE ANY INTEGRATION WORK — MANDATORY
Read /skills/sequential-thinking.md in full.
Use test/sandbox credentials for all work:
  Meta: test ad accounts only
  Google: test account with developer token in test mode
  Twilio: test credentials only
Never use live API credentials during development.

## GOLDEN RULES — ALL INTEGRATIONS
1. Read full API documentation comments before any changes.
   API versions matter. Never guess endpoint paths.
2. Never store raw access tokens.
   Encrypt before storing in InsForge campaign_connections.
3. Refresh OAuth tokens before expiry.
   Check expiry before every API call.
   Refresh if within 1 hour of expiry.
4. Never make destructive API calls (delete campaigns,
   delete ad sets) unless explicitly requested AND confirmed.
5. Catch all API errors, log to audit_log, return structured
   errors. Never expose raw API responses to frontend.

## META ADS API

OAuth:
  Scope: ads_read, ads_management
  Redirect: {APP_URL}/settings/connect/meta/callback
  Store: encrypted access_token + account_id
  Token type: long-lived (~60 days). Refresh before expiry.

Read endpoints:
  GET /act_{account_id}/campaigns
  GET /act_{account_id}/adsets
  GET /act_{account_id}/insights
    fields: spend, impressions, reach, cpc, cpm,
            actions, cost_per_action_type
    time_range: last_24h for monitoring loop

Write endpoints (Watchdog + Deploy only):
  POST /act_{account_id}/campaigns   (create from plan)
  POST /act_{account_id}/adsets      (create ad sets)
  POST /{adset_id}                   (update budget OR status)
  Only update: daily_budget OR status (ACTIVE | PAUSED)
  Never update: targeting, creative, placements
  without explicit user confirmation.

## GOOGLE ADS API

OAuth:
  Google OAuth 2.0 with offline access (refresh tokens)
  Scope: https://www.googleapis.com/auth/adwords
  Store: access_token + refresh_token + customer_id

Read via GAQL:
  SELECT campaign.id, campaign.name, campaign.status,
         metrics.cost_micros, metrics.impressions,
         metrics.clicks, metrics.conversions,
         metrics.cost_per_conversion
  FROM campaign
  WHERE segments.date DURING TODAY

Write (Watchdog only):
  Mutate CampaignBudget — amount_micros only
  Mutate Campaign status — ENABLED or PAUSED only
  Never mutate: targeting, bidding, creative

Note: cost_micros — divide by 1,000,000 for GBP value
      budget amount_micros = daily budget in micros

## WATCHDOG MONITOR (Hourly Cron)
Function name: watchdog-monitor

Process per connected account:
  1. Refresh token if needed
  2. Fetch current performance from platform API
  3. Compare against plan target KPIs
  4. Run anomaly detection:
     - CPA > 2x target AND conversions < 1 in last 3 hours
     - Spend > 110% of daily budget pace
     - Spend = 0 for 4+ hours during active dayparting
     - Delivery = 0 (ad set not serving)
  5. If anomaly detected: call budget-reallocate function
  6. Log performance snapshot to watchdog_actions
     (action_type: 'monitor_check')
  7. If plan end_date has passed:
     Set plan status → 'completed'
     Trigger end-of-campaign-debrief

## BUDGET REALLOCATION LOGIC
Function name: budget-reallocate

Guardrails (from user settings, with defaults):
  max_daily_reallocation_percent: 20
  min_adset_budget_gbp: 5

Rules:
  1. Pause ad set if CPA > 2x target for 3 consecutive hours
  2. Calculate reallocation amount from paused ad set budget
  3. Find best active ad set: lowest CPA + positive trend
  4. Increase best ad set daily budget by reallocation amount
     Never exceed max_daily_reallocation_percent guardrail
     Never reduce any ad set below min_adset_budget_gbp
     Never pause all ad sets simultaneously (keep at least 1)
  5. Log complete action to watchdog_actions:
     action_type, channel, reason, amount_gbp, meta_json
  6. Trigger client alert

## DEPLOY PLAN FUNCTION
Function name: deploy-plan
Trigger: POST on user approving Strategist plan

Process:
  1. Read plan output_data from plans table
  2. For each digital channel in the plan:
     Map MediaMind channel to platform campaign type
     Create campaign via API with status: PAUSED
     Create ad sets with budget and targeting from plan
     Capture campaign IDs returned by API
  3. Store all campaign IDs in plans.meta_json
  4. Update plan status: 'draft' → 'deployed'
  5. Activate watchdog monitoring for this plan
  
Important: Always create as PAUSED.
           Frontend shows review screen before user activates.
           User must explicitly click "Go Live" to activate.

## ALERT SYSTEM

## ALERT SYSTEM

### WhatsApp via WbizTool (Primary)
Docs:    wbiztool.com/api
Endpoint: https://wbiztool.com/api/v1/send_msg/
Method:  POST
Auth:    client_id + api_key in request body

Payload structure:
{
  "client_id": WBIZTOOL_CLIENT_ID,
  "api_key": WBIZTOOL_API_KEY,
  "whatsapp_client": WBIZTOOL_CLIENT_NUMBER,
  "msg_type": 0,
  "phone": "[user's whatsapp number digits only]",
  "country_code": "44",
  "msg": "[alert message text]"
}

Message format (max 50 words):
"MediaMind Update — [BUSINESS_NAME]:
 [EMOJI] [ACTION_PLAIN_ENGLISH]
 Reply STOP to pause auto-actions."

On STOP reply received:
  Set users.alert_preferences.autonomous_actions_enabled: false
  Agent switches to monitor-only mode.
  All future actions require manual dashboard approval.

### Email via Emailit (Fallback)
Docs:    emailit.com/docs
Method:  REST API or SMTP
Auth:    EMAILIT_API_KEY in Authorization header

Use when: no WhatsApp number stored OR WbizTool delivery fails
From:    EMAILIT_FROM_ADDRESS (alerts@mediamind.app)
Subject: "MediaMind: Action taken on your [PLATFORM] campaign"
Body:    Same content as WhatsApp message, styled HTML email

Emailit REST API call:
POST https://api.emailit.com/v1/emails
Headers:
  Authorization: Bearer EMAILIT_API_KEY
  Content-Type: application/json
Body:
{
  "from": "alerts@mediamind.app",
  "to": "[user email]",
  "subject": "MediaMind: [action summary]",
  "html": "[styled HTML alert content]"
}

### Alert Timing Rules
Send immediately (individual alert):
  - Ad set paused by agent
  - Budget reallocated > £50
  - Campaign delivery stopped unexpectedly
  - Daily budget exhausted before 6pm
  - CPA improved > 30% (positive — 🟢)

Send in 8am daily summary (do not interrupt):
  - Routine monitor checks with no anomalies
  - Reallocation < £10
  - Minor CPA fluctuations within 20% of target
