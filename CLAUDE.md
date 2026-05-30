# Skills
- **graphify** (`~/.claude/skills/graphify/SKILL.md`) — convert any input to a knowledge graph. Trigger: `/graphify`
  When the user types `/graphify`, invoke the Skill tool with `skill: "graphify"` before doing anything else.

# Project: Timeless — AI Voice Watch Concierge

## Stack
- React 19 + Vite 8 + Tailwind CSS v4
- Tailwind v4: use `@import "tailwindcss"` — no config file
- Pure JavaScript (no TypeScript)

## Data Layer
- All product data lives in `src/data/products.json`
- Utility functions in `src/lib/products.js`: `getProductBySlug`, `getProductsByCategory`, `getProductsBySubcategory`, `getFeaturedProducts`, `searchProducts`, `formatPrice`
- **NEVER read the full `src/data/products.json` to understand schema.** Use `src/data/products.mock.json` (one product, full schema) for structure reference.
- When appending new products to `products.json`, read only the **last 20 lines** to find the insertion point.

## Tailwind v4 Canonical Classes
Always use these — the IDE linter will warn on non-canonical forms:
- `bg-linear-to-t/r/b/l` not `bg-gradient-to-*`
- `shrink-0` not `flex-shrink-0`
- `grow` not `flex-grow`
- `h-N` / `w-N` (px ÷ 4) not `h-[Xpx]` — e.g. `h-150` for 600px
- `rounded-4xl` not `rounded-[2rem]`
- `max-w-360` not `max-w-[1440px]`
- `text-on-surface-variant` for `#c4c7c8`
- `text-outline` for `#8e9192`
- `bg-surface-container-low` for `#1b1b1b`
- `from-surface-container-lowest` for `#0e0e0e`
- `aspect-4/5` not `aspect-[4/5]`
- `duration-1500` not `duration-[1500ms]`

## Component Patterns
- Clickable cards must be `<button type="button">` — never `<div role="button">` or `<article onClick>`
- `hidden md:flex` sidebar pattern needs `md:flex-col md:items-center` scoped to md breakpoint to avoid CSS conflict
- `cardImage || image` pattern: use `cardImage` for collection grid thumbnails, `image` for detail/hero

## Product Schema Notes
- `viewSlug`: route to navigate to. Products without their own page point to the nearest existing route.
- `isOrbMatch`: controls the AI "Orb Match" badge on collection cards
- `semanticDescription`: natural language field for future Qdrant vector indexing
- `gallery[0]`: used for bento detail shots when a second image is needed
