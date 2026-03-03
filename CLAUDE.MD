# MediaMind — CLAUDE.md (Directive Layer)
Version: 1.1 | Updated: 2026-03-02
Layer: 1 of 3 (Directive — Global Rules & Identity)

---

## WHO YOU ARE
You are a Claude Code agent building MediaMind — an autonomous 
AI-powered campaign planning and optimisation platform for SMBs, 
boutique brands, and micro media agencies in the UK.

MediaMind has two operating modes:
1. THE STRATEGIST — Conversational AI agent that builds optimum 
   media mix plans from budget, audience, objective, and timing inputs
2. THE WATCHDOG — Autonomous agent that monitors live digital 
   campaigns via Meta and Google Ads APIs, reallocates budget, 
   and alerts clients in plain English

For TV, radio, and outdoor channels, MediaMind provides 
intelligence, projection modelling, and readiness reports only.
Human advisory (the agency) handles booking and trafficking 
for those channels.

---

## THE STACK (Non-Negotiable)
- Frontend: React + TypeScript + Tailwind CSS + shadcn/ui
- Charts: Recharts
- Animation: motion/react only (no raw CSS keyframes)
- Forms: React Hook Form + Zod validation
- Backend: InsForge (database, auth, edge functions, storage)
- AI: Gemini Pro API via InsForge edge functions only
  (never call Gemini directly from the frontend)
- Payments: Stripe (test keys during build, live at launch)
- PDF: React-PDF
- Alerts: Twilio (WhatsApp) + Resend (email)
- Version Control: GitHub
- Deployment: Vercel (frontend) + InsForge managed (backend)

---

## DESIGN SYSTEM (Always Active)
- Primary:    Deep Teal    #0F766E
- Accent:     Amber        #F59E0B
- Background: Near-black   #0A0A0A  (dark mode default)
- Surface:    Card grey    #141414
- Success:    Green        #22C55E
- Warning:    Amber        #F59E0B
- Error:      Red          #EF4444
- Body font:  Inter
- Heading:    Satoshi (fallback: Cal Sans)
- Components: shadcn/ui + Radix UI primitives
- Aesthetic:  Linear.app / Vercel Dashboard / Resend.com
- Default:    Dark mode. Light mode toggle available.
- Rule:       One primary CTA per screen. No competing actions.

---

## SKILLS (Load Before Relevant Work)

Three skills must be active throughout this build:

### 1. Anthropic Frontend Design Skill (Critical)
Source: mcpservers.org/claude-skills/anthropic/frontend-design
File:   /skills/frontend-design.md
Load:   Read /skills/frontend-design.md in full before writing
        ANY frontend component, page, or UI element.
Purpose: Prevents generic AI aesthetics. Enforces distinctive,
         production-grade UI with intentional spatial composition,
         real typography, atmospheric depth, and memorable details.
         The dashboard is the product. It must look exceptional.

### 2. Vercel React Best Practices Skill
Source: mcpservers.org/claude-skills
File:   /skills/react-best-practices.md
Load:   Read /skills/react-best-practices.md before building
        any React component, page, data fetching, or routing.
Purpose: Enforces correct React patterns — bundle optimisation,
         component architecture, rendering strategies, 
         performance best practices.

### 3. Sequential Thinking Skill
Source: mcpservers.org/claude-skills
File:   /skills/sequential-thinking.md
Load:   Read /skills/sequential-thinking.md before building
        any edge function, API integration, reallocation logic,
        Stripe webhook, or function with 3+ conditional branches.
Purpose: Forces step-by-step reasoning before acting.
         Prevents compounding logic errors in complex functions.

### Skill Activation Rule
Start of any UI session:
  "Read /skills/frontend-design.md and 
   /skills/react-best-practices.md. Confirm both loaded."
Start of any backend/API session:
  "Read /skills/sequential-thinking.md. Confirm loaded."

---

## NON-NEGOTIABLE OPERATING RULES

### Rule 1 — Read Before You Write
Never speculate about any file, API, schema, or integration 
you have not opened and read. Before writing code that touches 
an existing file, read that file in full first.

### Rule 2 — Plan Before You Execute
Before making any changes, produce a concise Implementation Plan.
Do not write code until the plan is confirmed.

### Rule 3 — Never Commit Secrets
.env is never committed. Ever.
Always verify .gitignore excludes .env before any push.
.env.example is always committed with redacted values.

### Rule 4 — Safe Actions Only
Prefer read-only checks before write operations.
Warn before any action that is irreversible or incurs cost.
Never modify or delete production data unless confirmed.
Never expose raw API errors to the UI — always show a 
human-readable fallback message.

### Rule 5 — Validate All Inputs Server-Side
Never rely on frontend-only validation for anything that 
affects stored data, AI calls, or payment actions.
All tier gating checks happen in InsForge edge functions.

### Rule 6 — Fail Gracefully
Every screen must have: loading state, empty state, 
error state, and success confirmation.
AI API failures retry once, then show a friendly message.
MCP failures stop execution immediately — do not guess.

### Rule 7 — Revert Over Patch
If a fix requires more than two corrections, stop.
Revert to the last clean state and re-read the spec task.
Never patch on top of a patch.

---

## SESSION DISCIPLINE (Hardcoded — Always Follow)

### On Starting Every Session
Before writing a single line of code, you must:
1. Read CLAUDE.md (this file) in full
2. Read specs/spec.md in full
3. State out loud:
   - "Current milestone: [X]"
   - "Last completed task: [X.X]"
   - "Next task: [X.X — description]"
4. Produce a short Implementation Plan for that task only
5. Wait for confirmation before writing any code

Never assume context from a previous session.
Always re-read the files. Always re-state the plan.

### On Executing a Task
- Work on ONE task from spec.md at a time
- Complete it fully before moving to the next
- Do not speculatively build things not in the current task
- Do not refactor code outside the current task's scope
- If you notice something broken outside scope,
  note it in spec.md as a future task — do not fix it now
- Mark the task complete in spec.md before moving on

### On File Operations
- Read a file before editing it. Every time. No exceptions.
- Only open files relevant to the current task
- Do not read the entire codebase on every action
- If you need to understand a data shape,
  read only the relevant schema or type file
- Never rewrite a file you have not read first

### On AI Calls and Edge Functions
- Never rewrite a working edge function to "improve" it
  unless that is explicitly the current task
- Never change a Gemini prompt that is already
  producing valid output
- Test edge function changes with the smallest
  possible input before scaling

### On Asking Questions
- If the current task is unclear, ask ONE specific question
- Do not ask multiple questions at once
- Do not ask for confirmation on obvious implementation details
- Only ask when the answer would materially change the approach

### On Ending Every Session
Before closing, you must:
1. Mark completed tasks in spec.md with ✅
2. Update the "Current Status" line in spec.md
3. Commit all changes to the dev branch with
   a conventional commit message
4. Confirm .env is not included in the commit
5. Write a one-line session summary:
   "Session complete: [what was built]. Next: [next task]."

### Token Efficiency Rules (Non-Negotiable)
- Never read files you do not need for the current task
- Never produce long explanations when code is sufficient
- Never repeat back what the user just said
- Never summarise what you are about to do — just do it
- Never write placeholder comments like
  "// TODO: implement this" — either implement it or
  note it in spec.md as a future task
- Never generate boilerplate you will immediately delete
- If asked to explain something, be concise —
  maximum 5 sentences unless more is explicitly requested
- Prefer editing existing files over creating new ones
  where the new file would duplicate existing logic
- When creating components, build only what the
  current task requires — no speculative props,
  no unused variants, no "we might need this later" code

### Context Recovery (Use When Session Gets Long)
If a session has been running for more than 60 minutes
or the context feels cluttered, stop and say:
"Context recovery needed. Re-reading CLAUDE.md and spec.md.
 Current task: [X.X]. Continuing from [last action taken]."
Then re-read only CLAUDE.md and specs/spec.md before continuing.
Do not re-read the entire codebase.

### The One Rule Above All Others
Do less, better.
One task. One file. One commit.
Finish it completely before starting the next thing.

---

## MCP CONNECTIONS (Establish Before Building)
1. InsForge MCP — database, auth, edge functions, storage
   Verify: call InsForge MCP fetch-docs before any backend work
2. GitHub MCP — version control, commits, branches, PRs
   Verify: confirm repo mediamind-app is accessible

---

## ENVIRONMENT VARIABLES
Required in .env (never committed):
INSFORGE_API_KEY
INSFORGE_PROJECT_URL
GEMINI_API_KEY
STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
META_ADS_APP_ID
META_ADS_APP_SECRET
GOOGLE_ADS_CLIENT_ID
GOOGLE_ADS_CLIENT_SECRET
GOOGLE_ADS_DEVELOPER_TOKEN
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_WHATSAPP_FROM
RESEND_API_KEY
NEXT_PUBLIC_APP_URL

---

## DIRECTORY STRUCTURE
/frontend          React app (Tailwind, shadcn/ui, Recharts)
/data              benchmarks.json and static reference data
/functions         InsForge edge function source files
/specs             spec.md — milestone and task list
/skills            frontend-design.md, react-best-practices.md,
                   sequential-thinking.md
/.claude/agents    Sub-agent definition files
.env               Secrets — never commit
.env.example       Redacted template — always commit
.gitignore         Excludes .env, node_modules, .DS_Store
CLAUDE.md          This file (Directive Layer)

---

## COMMIT CONVENTION
Format: type(scope): description
Types: feat / fix / chore / docs / refactor / test
Example: feat(watchdog): add Meta Ads hourly monitoring loop
Never commit with broken tests or console errors present.
Always confirm .env is absent before pushing.

---

## FOR DEEPER CONTEXT
Read these files before starting any session:
- /specs/spec.md — current milestone and active task list
- Relevant sub-agent file in /.claude/agents/
- Relevant skill file in /skills/ for the work type

This CLAUDE.md is the table of contents.
The spec and sub-agents contain the detail.
