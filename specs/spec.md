# MediaMind — spec.md (Orchestration Layer)
Version: 1.1 | Updated: 2026-03-02
Layer: 2 of 3 (Orchestration — Milestones & Task List)

---

## PRODUCT SUMMARY
MediaMind is a two-mode agentic campaign platform for UK SMBs,
boutique brands, and micro media agencies.

MODE 1 — THE STRATEGIST
Input:  Budget, audience, objective, timing, KPIs
Output: AI-recommended media mix plan across 10 UK channels
Action: Digital channels (Meta, Google, TikTok, Spotify) —
        agent executes campaigns via API on user approval.
        Broadcast channels (TV, Radio, Outdoor) —
        agent produces intelligence reports and readiness
        projections only. Agency handles booking.

MODE 2 — THE WATCHDOG
Input:  Connected ad accounts (Meta, Google)
Action: Monitors every hour, reallocates budget autonomously
        within user-set guardrails, fires WhatsApp/email alerts
Output: Live Command Centre dashboard, weekly insight reports,
        post-campaign debrief with next campaign pre-fill

---

## PERSONAS
1. SMB Owner — solo or small team, £500–£25k budget,
   no agency, wants campaigns run for them
2. Micro Agency — manages 3–10 SMB clients, wants white-label
   planning and monitoring tools
3. Boutique Brand — £10k–£100k budget, wants to grow from
   digital-only into TV/radio

---

## SUBSCRIPTION TIERS
Free:    1 plan, watermarked PDF, no Watchdog
Starter: £49/month — 5 plans, Watchdog 1 account, clean PDF
Pro:     £99/month — unlimited plans, Watchdog 3 accounts,
         white-label PDF, weekly insights, CSV export
Agency:  £199/month — all Pro + 5 seats, client management,
         white-label dashboard branding

---

## CURRENT STATUS
Active Milestone: 2 — The Strategist (COMPLETED)
Last completed task: 2.9 — Commit frontend work
Last session: 2026-03-07 — Milestone 2 fully complete

** Update this block at the end of every session **

---

## MILESTONE 1 — FOUNDATION
Goal: Project skeleton, data layer, InsForge schema, GitHub
Sub-agent: backend-agent.md

- [x] 1.1  Create full directory structure as per CLAUDE.md
           Confirm .gitignore, .env.example, README.md exist
- [x] 1.2  Copy skill files into /skills/:
           frontend-design.md
           react-best-practices.md
           sequential-thinking.md
- [x] 1.3  Populate /data/benchmarks.json
           10 channels: YouTube, Instagram, Facebook, TikTok,
           Spotify, Google Display, Google Search,
           DAX Digital Audio, Outdoor/DOOH, Linear TV
           Fields per channel:
             channel, uk_average_cpm_gbp,
             uk_reach_monthly_millions,
             best_for_objectives (array),
             demographic_strength (16_24 / 25_34 / 35_44 /
               45_54 / 55_plus scored 1–10),
             min_budget_gbp, typical_formats (array),
             avg_lead_time_days,
             seasonality_q4_uplift_percent,
             agency_required (boolean), notes
           Validate: all 10 channels present, no missing fields
- [x] 1.4  InsForge schema — create all 6 tables:
           users, plans, campaign_connections,
           watchdog_actions, weekly_insights, audit_log
           (full schemas in backend-agent.md)
- [x] 1.5  Configure InsForge auth:
           Email + password and Google OAuth
           Row-level security: users own their rows only
- [x] 1.6  Initialise React app in /frontend:
           Vite + React + TypeScript + Tailwind + shadcn/ui
           Configure design tokens in tailwind.config.ts
           Confirm dev server starts without errors
- [x] 1.7  First GitHub commit on dev branch:
           "chore: foundation — structure, schema, 
            benchmark data, React init"

Definition of Done — Milestone 1:
✓ benchmarks.json validates (all 10 channels, all fields)
✓ All 6 InsForge tables exist, RLS confirmed active
✓ React app runs on localhost without console errors
✓ .env NOT in commit. .env.example IS in commit.

---

## MILESTONE 2 — THE STRATEGIST AGENT
Goal: Conversational planning flow, AI mix generation,
      results dashboard, PDF export, auth, user dashboard
Sub-agents: backend-agent.md + frontend-agent.md

- [x] 2.1  Edge function: generate-plan
           (full spec in gemini-agent.md)
- [x] 2.2  Edge function: save-plan
           Enforces tier plan limits before saving
- [x] 2.3  Conversational input interface — /app/new-plan
           5-question flow (not a form — a conversation)
           Q1: "What's your budget and what do you sell?"
           Q2: "Who are you trying to reach?"
           Q3: "What do you want this campaign to achieve?"
           Q4: "When do you want to run it?"
           Q5: "Any channels you want or want to avoid?"
           Progress dots at top. Slide transition between Qs.
- [x] 2.4  Results dashboard — /app/plan/:id
           Animated doughnut chart (draws on load, Recharts)
           Channel cards (staggered entrance, motion/react)
           Seasonality alert banner (Q4 detection)
           Manual override sliders (auto-redistribute to 100%)
           TV/Radio readiness panel for broadcast channels
           "Deploy to Ad Accounts" — disabled with tooltip
           (unlocked in Milestone 3)
- [x] 2.5  PDF export — React-PDF
           Page 1: Campaign summary
           Page 2: Media mix chart + channel breakdown table
           Page 3: Rationale + suggested next steps
           Free: diagonal watermark. Paid: clean branded PDF.
- [x] 2.6  User dashboard — /app
           Saved plans list (name, date, budget, channel count)
           Empty state with clear CTA
           Plan limit indicator for free tier
           Duplicate, view, delete actions per plan
- [x] 2.7  Auth pages — /login and /signup
           Email + password and Google OAuth
           Post-signup: create users row, tier = 'free'
           Auth guard on all /app/* routes
- [x] 2.8  App shell and routing
           Top nav: logo, dashboard link, pricing, auth buttons
           Page transitions: fade + 8px upward slide
           Routes: / | /app | /app/new-plan | /app/plan/:id
                   /login | /signup | /pricing
- [x] 2.9  Commit: "feat(strategist): conversational planning,
           results dashboard, PDF, auth, user dashboard"

Definition of Done — Milestone 2:
✓ Full conversation → Gemini → results display end to end
✓ Gemini returns valid JSON array (no markdown, no prose)
✓ PDF downloads correctly for free and paid tiers
✓ Plan saves to InsForge, appears on dashboard
✓ Login and signup work (email + Google OAuth)
✓ No console errors on any route

---

## MILESTONE 3 — THE WATCHDOG AGENT
Goal: Live ad account connections, autonomous monitoring,
      budget reallocation, client alerts, deploy-plan
Sub-agents: backend-agent.md + integrations-agent.md

- [ ] 3.1  Meta Ads OAuth flow + connection storage
           /settings/connect-accounts page
           Scope: ads_read, ads_management
           Store encrypted token in campaign_connections
- [ ] 3.2  Google Ads OAuth flow + connection storage
           Same pattern as Meta
- [ ] 3.3  Edge function: watchdog-monitor (hourly cron)
           (full spec in integrations-agent.md)
- [ ] 3.4  Budget reallocation logic
           Guardrails: max_daily_reallocation_percent,
           min_adset_budget_gbp
           Rules: pause if CPA > 2x target for 3 hours,
           reallocate to best performer, never pause all
- [ ] 3.5  Alert system
           WhatsApp via Twilio + email via Resend as fallback
           STOP reply disables autonomous actions
           Alert preferences in /settings
- [ ] 3.6  Edge function: deploy-plan
           Builds campaigns in Meta/Google on plan approval
           Creates as PAUSED — user activates after review
           Stores campaign IDs in plans table
           Activates Watchdog monitoring for this plan
- [ ] 3.7  Unlock "Deploy to Ad Accounts" button in dashboard
- [ ] 3.8  Commit: "feat(watchdog): ad connections, hourly
           monitor, reallocation, alerts, deploy-plan"

Definition of Done — Milestone 3:
✓ Meta and Google OAuth complete without errors
✓ Watchdog monitor runs and logs to InsForge correctly
✓ One autonomous reallocation fires and logs in test
✓ Alert sends via WhatsApp or email (test mode)
✓ Deploy-plan creates draft campaign in Meta test account

---

## MILESTONE 4 — CLIENT DASHBOARD
Goal: Three-view live dashboard — command centre,
      performance, intelligence
Sub-agents: frontend-agent.md + gemini-agent.md

- [ ] 4.1  Live Command Centre — /app/campaign/:id/live
           Campaign Health Score (0–100, colour ring)
           Today's spend vs budget bar
           Live channel performance tiles
           Agent Activity Feed (real-time WebSocket)
           Colour coded: green/amber/red/blue actions
- [ ] 4.2  Performance breakdown — /app/campaign/:id/performance
           Headline metrics row
           Channel performance table (vs-target indicators)
           Daily line chart (hover shows agent actions)
           Attribution summary panel
- [ ] 4.3  Intelligence view — /app/campaign/:id/insights
           Weekly insight cards (Gemini-generated)
           TV/Radio readiness indicator (updates over time)
           End-of-campaign debrief (auto on end date)
           "Start Next Campaign" — pre-fills with learnings
- [ ] 4.4  Edge function: watchdog-insights (Monday 7am cron)
           (full spec in gemini-agent.md)
- [ ] 4.5  Edge function: end-of-campaign-debrief
           (full spec in gemini-agent.md)
- [ ] 4.6  Mobile optimisation
           View 1: 6-second glance optimised
           View 2: swipe-friendly tables
           View 3: comfortable long-read
           Push notifications via PWA
- [ ] 4.7  White-label mode (Agency tier)
           Logo upload, brand colour override in settings
           Dashboard renders with agency branding
- [ ] 4.8  Commit: "feat(dashboard): three-view client
           dashboard, insights engine, mobile, white-label"

Definition of Done — Milestone 4:
✓ All three views render on desktop and mobile
✓ Agent activity feed updates in real time (WebSocket)
✓ Weekly insight cards generate and save correctly
✓ TV readiness panel visible on all campaigns
✓ White-label mode switches branding for agency tier

---

## MILESTONE 5 — MONETISATION & LAUNCH
Goal: Stripe, pricing page, settings, QA, Vercel deploy
Sub-agents: frontend-agent.md + backend-agent.md

- [ ] 5.1  Stripe integration
           Products + prices: Starter, Pro, Agency
           Stripe Checkout flow from pricing page
           Webhook: stripe-webhook edge function
           Tier gating server-side on all gated actions
           Upgrade prompts (not errors) at every gate
- [ ] 5.2  Pricing page — /pricing
           4 tier cards: Free / Starter / Pro / Agency
           Pro highlighted as "Most Popular"
           Annual toggle (20% discount)
- [ ] 5.3  Landing page — /
           Hero: "Your campaigns, planned and run by AI."
           How it works (3 steps)
           Demo: embedded read-only Strategist example
           (local law firm, £3,000 budget)
           Dashboard preview animation
           Pricing section (same 4 cards)
           Footer: Privacy / Terms / Cookie Notice
- [ ] 5.4  Settings page — /settings
           Account details and subscription management
           Ad account connections (Meta, Google)
           Alert preferences (WhatsApp, email, STOP/START)
           GDPR: data deletion flow
- [ ] 5.5  Pre-launch QA checklist
           [ ] Auth end to end (email + Google)
           [ ] Strategist: full conversation → valid plan
           [ ] PDF: free (watermarked) + paid (clean)
           [ ] Watchdog: connects to Meta test account
           [ ] Alert fires via WhatsApp or email
           [ ] Stripe test checkout + tier updates
           [ ] All three dashboard views render without errors
           [ ] Mobile layout (iOS + Android)
           [ ] No .env values in any commit
           [ ] Cookie banner + privacy policy present
           [ ] GDPR data deletion works
- [ ] 5.6  Vercel deployment
           All env vars set in Vercel dashboard
           NEXT_PUBLIC_APP_URL set to production domain
           Build succeeds. Production URL live.
- [ ] 5.7  Final commit on main:
           "chore: MediaMind v1.0 — production launch"

Definition of Done — Milestone 5:
✓ All QA items pass
✓ Live on production Vercel URL
✓ One real user completes full flow end to end
✓ Stripe live keys active

---

## BRANCH STRATEGY
main      → production (auto-deploys to Vercel)
dev       → active development (all work goes here first)
feature/* → individual features, merge into dev when done
