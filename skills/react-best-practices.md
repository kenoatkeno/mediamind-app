# React Best Practices Skill — MediaMind
Source: Vercel / mcpservers.org/claude-skills
Applied to: All React components and pages in /frontend

---

## CORE PRINCIPLE
Build for performance and maintainability from the start.
Do not optimise later — apply these patterns now.

## COMPONENT ARCHITECTURE

### Single Responsibility
Each component does one thing.
If a component handles data fetching AND display AND
user interaction, split it into three components.

### Component Size
Maximum 200 lines per component file.
If approaching 200 lines, extract into sub-components.

### Prop Design
Define TypeScript interfaces for all props.
No prop drilling more than 2 levels — use context or state.
No "any" types — every prop must be typed.

## DATA FETCHING

### InsForge Data
Use custom hooks for all InsForge data fetching.
Pattern:
  const { data, loading, error } = usePlan(planId)
Never fetch data directly inside component render functions.
Always handle loading, error, and empty states in the hook.

### Streaming Responses (Strategist Agent)
Use ReadableStream API for streaming Gemini responses.
Update state progressively — never wait for full response.
Show partial channel cards as data arrives.
Pattern:
  const reader = response.body.getReader()
  while streaming: updateResults(partialData)

## STATE MANAGEMENT
Local state (useState): UI state, form inputs, toggles
Context: Auth state, user subscription tier, theme
InsForge realtime: Live dashboard data (WebSocket)
Do NOT use Redux or Zustand — unnecessary for this scope.

## PERFORMANCE RULES
Memoize expensive computations: useMemo
Memoize callbacks passed to children: useCallback
Lazy load route components: React.lazy + Suspense
Image optimisation: use loading="lazy" on all images
Bundle: check bundle size before committing new dependencies

## TAILWIND RULES
Use cn() utility (clsx + twMerge) for conditional classes.
Never construct class names dynamically from string templates.
Extract repeated class combinations into component variants.
Use @apply in CSS files only for base element styles.

## ACCESSIBILITY
All images: meaningful alt text or alt="" if decorative
All form inputs: explicit <label> or aria-label
All modals: focus trap + Escape key close
All interactive elements: visible focus state
