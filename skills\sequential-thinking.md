# Sequential Thinking Skill — MediaMind
Source: mcpservers.org/claude-skills
Applied to: All edge functions, API integrations, 
            complex logic, and multi-branch conditionals

---

## CORE PRINCIPLE
Think before you act.
For any function with more than 2 conditional branches,
write the thinking steps first. Then write the code.

## WHEN TO ACTIVATE THIS SKILL
Always activate before:
- Writing any InsForge edge function
- Writing any API integration (Meta, Google, Stripe, Twilio)
- Writing the Watchdog reallocation logic
- Writing Gemini prompts
- Debugging unexpected behaviour
- Any task where a wrong assumption has expensive consequences

## THE THINKING PROTOCOL

Before writing any complex function:

Step 1 — State the goal
"This function must: [one sentence]"

Step 2 — Identify the inputs
"It receives: [list every input and its type]"

Step 3 — Identify the outputs
"It must return: [list every output and its type]"

Step 4 — Map the happy path
"When everything works correctly, the sequence is:
 1. [first action]
 2. [second action]
 ..."

Step 5 — Map the failure modes
"It can fail when:
 - [failure condition 1] → handle by: [action]
 - [failure condition 2] → handle by: [action]"

Step 6 — Check for side effects
"This function also affects: [list anything it changes
 outside its direct output — DB rows, external API calls,
 logs, alerts, etc.]"

Step 7 — Write the code
Only after steps 1–6 are complete.

## APPLICATION TO MEDIAMIND SPECIFICALLY

### Watchdog Reallocation Logic
Before writing budget-reallocate, complete the protocol.
Specific questions to answer:
- What happens if the best-performing ad set is the same
  one being paused?
- What happens if all active ad sets have CPA > 2x target?
- What happens if reallocation would push an ad set below
  min_adset_budget_gbp?
- What happens if the user has STOP mode active?

### Meta/Google API Calls
Before writing any write operation to an ad platform:
- What is the exact API endpoint and method?
- What does the API return on success?
- What does the API return on rate limit (429)?
- What does the API return on auth failure (401)?
- How do we handle each failure case?

### Gemini Prompts
Before finalising any system prompt:
- Can this prompt return anything other than valid JSON?
- What happens if Gemini adds a markdown fence?
- What happens if Gemini adds explanatory text?
- Do we strip and parse, or do we reject and retry?

## THE ONE-LINE RULE
If you cannot explain what a function does in one sentence,
it is doing too many things. Split it.
