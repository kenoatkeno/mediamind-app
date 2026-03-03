# Frontend Design Skill — MediaMind
Source: Anthropic / mcpservers.org/claude-skills/anthropic/frontend-design
Applied to: All UI components, pages, and views in MediaMind

---

## CORE PRINCIPLE
Do not build generic AI interfaces.
Every screen must feel intentional, distinctive, and crafted.
The dashboard is the product. It must earn trust on first load.

## VISUAL QUALITY STANDARDS

### Spatial Composition
- Use generous whitespace — elements should breathe
- Establish clear visual hierarchy: one thing dominates each screen
- Group related elements with proximity, not just borders
- Align everything to a consistent grid (8px base unit)
- Asymmetry is allowed and often better than forced symmetry

### Typography
- Headings: Satoshi, bold, tight letter-spacing (-0.02em)
- Body: Inter, regular, comfortable line-height (1.6)
- Data/numbers: Inter, tabular numerals, medium weight
- Never use more than 2 font weights on the same screen
- Size scale: 12 / 14 / 16 / 20 / 24 / 32 / 48px only

### Colour Application
- Background #0A0A0A is the canvas — use it generously
- Surface #141414 for cards — subtle, not heavy borders
- Primary #0F766E used sparingly — CTAs and key data only
- Amber #F59E0B for alerts and positive accents only
- Never use pure white (#FFFFFF) — use #F8F8F8 or #E5E5E5
- Gradients: subtle, same hue family, max 15% opacity shift

### Depth and Atmosphere
- Use layered surfaces (bg → surface → elevated card)
- Subtle inner shadows on interactive elements
- Slight blur effects on overlapping layers (backdrop-filter)
- Avoid flat designs — slight depth makes UI feel real

### Data Visualisation (Recharts)
- Chart backgrounds: transparent (not white boxes)
- Grid lines: #222222 (barely visible)
- Tooltips: dark surface #1A1A1A with teal accent border
- Chart colours: teal → amber → green → red → blue → purple
  (in this order for consistency)
- Always animate charts on first render
- Label data directly on charts where possible

### Interactive States
- Hover: subtle background shift + 1px teal left border
- Active/selected: teal background at 10% opacity
- Focus: 2px teal outline, offset 2px
- Disabled: 40% opacity, cursor-not-allowed
- Loading skeleton: #1A1A1A animated shimmer

## COMPONENT-SPECIFIC RULES

### Channel Cards
- Dark surface background #141414
- Channel colour as a thin top border (3px)
- Large percentage number: 48px, Satoshi, bold, teal
- Suitability dots: filled ● teal, empty ○ #333333
- Subtle hover lift (translateY -2px + shadow increase)
- Agency Required badge: amber, small caps

### Agent Activity Feed
- Full width, no card container — feels like a live log
- Each entry: timestamp (muted) | emoji | plain English text
- Divider: 1px #1A1A1A between entries
- New entries: fade in from top (motion/react)
- Green entries: left border #22C55E
- Red entries: left border #EF4444
- Amber entries: left border #F59E0B

### Health Score Display
- Large numeral: 80px Satoshi, centred
- Circular progress ring: SVG, teal fill, #1A1A1A track
- Score ranges:
  80-100: teal ring, "Performing Well"
  50-79:  amber ring, "Monitor Closely"
  0-49:   red ring, "Action Needed"

### Conversational Input (Strategist)
- Full screen per question — no surrounding chrome
- Question text: 32px Satoshi, centred, max 60 chars wide
- Input below: large, clean, minimal border
- Progress dots: 8px circles, teal = complete, white = current
- Background: #0A0A0A — nothing competing for attention

## WHAT NEVER TO DO
- Never use card borders heavier than 1px
- Never use box-shadow on dark backgrounds (use border instead)
- Never centre-align body text (left-align always)
- Never use more than 3 colours on a single component
- Never build a component that looks like it came from a template
- Never use rounded corners greater than 12px on cards
- Never use default Tailwind grey scale — use the custom tokens
