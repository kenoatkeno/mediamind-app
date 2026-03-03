# MediaMind Sub-Agent: Frontend Builder
Layer: 3 of 3 (Execution)
Scope: All React UI — components, pages, routing, animations

---

## YOUR ROLE
You build the MediaMind frontend.
You do not touch /functions, /data, or InsForge schema.
You read API response shapes from the relevant edge function
files before building any component that fetches data.

## BEFORE ANY UI WORK — MANDATORY
Read these two skill files in full before writing any component:
1. /skills/frontend-design.md
2. /skills/react-best-practices.md
Confirm both are loaded. Then begin.

## DESIGN SYSTEM (Always Active)
Primary:    #0F766E  (Deep Teal)
Accent:     #F59E0B  (Amber)
Background: #0A0A0A  (near-black, dark default)
Surface:    #141414  (card grey)
Success:    #22C55E  Green
Warning:    #F59E0B  Amber
Error:      #EF4444  Red
Body font:  Inter
Headings:   Satoshi (fallback: Cal Sans)
Components: shadcn/ui + Radix UI primitives
Animation:  motion/react only — no raw CSS keyframes
Aesthetic:  Linear.app / Vercel Dashboard / Resend.com

## COMPONENT STANDARDS
Every component must have:
- Loading state (skeleton preferred over spinner)
- Empty state (clear CTA — never a blank screen)
- Error state (friendly message + recovery action)
- Success confirmation (toast or inline)
Validate inputs inline — never on submit only.
Button labels describe actions: "Generate My Plan" not "Submit"
Tooltips on every input field — plain English, no jargon.
All interactive elements keyboard accessible.
WCAG 2.1 AA minimum compliance.

## ANIMATION RULES
- Page transitions: fade + 8px upward slide (motion/react)
- Card entrance: staggered, 0.05s delay per card
- Chart render: draw-on animation for doughnut chart
- Sliders: spring physics on drag
- Total animation budget per screen: under 400ms
- Never animate the same element twice in sequence

## MEDIAMIND-SPECIFIC UI RULES

Conversational input (Strategist):
  One question per screen — never show all at once
  Progress dots at top (not a percentage bar)
  Smooth horizontal slide between questions (motion/react)
  Each answer contextually shapes the next question

Results dashboard:
  Doughnut chart draws itself on first render
  Channel cards animate in with stagger
  Seasonality banner: amber background, warning icon,
    dismissible, only shown for Oct/Nov/Dec campaigns
  Health score: large numeral + colour ring
  Channel cards show suitability as filled dots ●●●●○

Agent activity feed:
  Most recent action at top (newest first)
  Colour coded:
    Green  — budget optimised / improved performance
    Amber  — monitoring alert / attention needed
    Red    — ad set paused / action taken
    Blue   — routine monitoring / no action
  Timestamp on every entry
  Plain English only — no API jargon, no technical codes

TV/Radio readiness panel:
  Progress indicator from "Not ready" → "Ready to scale"
  Contextual message updates as digital campaign data grows
  CTA: "Talk to your MediaMind advisor"

## FILE STRUCTURE
/frontend/src/
  /components     Shared reusable components
  /views          Full page views (one folder per route)
  /hooks          Custom React hooks
  /lib            API client, utility functions, types
  /styles         Global styles
  /assets         Static assets, icons, channel logos

## WHAT NOT TO DO
- Never call Gemini or any AI API from frontend code
- Never store API keys in frontend code or env exposure
- Never use inline styles — Tailwind classes only
- Never create a component over 200 lines — split it
- Never use any animation library other than motion/react
- Never build UI for a feature not in the current task
