# Product Redesign — new storytelling brief

Brief for Claude Code. Rewrite the `product-redesign` project in `index.html` (the `sections` array, ~line 4650) to the structure below. Keep copy short: 1–2 sentences per paragraph, max 2 paragraphs per section.

## The new angle

The old story was "we redesigned, it was too much, we pivoted." The new story leads with the **audit**: 15 years of features had piled up with no hierarchy, no clustering, overlapping features and no basic UX logic behind them. We had to challenge the product's DNA and rethink every part of it — while keeping it close enough to what users already knew. The pivot stays and gets its own section - it shaped what shipped and what comes next - but it's no longer the headline.

## Rules

- Reuse existing renderers: `media` (`kind: 'wide'`), `sideBySide` + `sideMedia`, `concepts` (the accordion from Advanced Search, ~line 4987), `sideMarquee`, `leadMedia`.
- Images: full width, natural height, never cropped (`kind: 'wide'`).
- Any image that doesn't exist yet → `{ placeholder: true, caption: '…' }`. Don't invent paths.
- Remove these sections: `research`, `wireframing`, `prototyping`, `testing`, `setbacks`, `facelift-grid` (drop the grid demo entirely). Fold what matters from them into the sections below.
- Keep project metadata (title, subtitle, role, year, etc.). Update `summary` and Context only.

## Header

- **subtitle:** keep as is.
- **summary:** `A redesign of the KMS Lighthouse platform that started by untangling 15 years of piled-on features, pivoted mid-project, and shipped a facelift users could actually adopt.`

## Sections (in order)

### 1. Context
Text only. Keep `context` and `role` merged into one section.
- KMS Lighthouse is an enterprise knowledge platform (DHL, GE Healthcare, AIG, Allianz) - the core product the company is built on.
- 15 years of feature requests, outsourced designers and no design system. Every feature made sense on its own; together they didn't.
- I was a Senior Designer on a small in-house team. I owned the content management experience, the field component system, and co-designed the responsive grid.

### 2. Product mapping — `id: 'mapping'`
Full-width image.
- Before designing anything, we mapped the whole product: every screen, feature and setting, and where each one lived.
- The map showed what years of patching had hidden: no clear hierarchy, related features scattered across the product, several features doing the same job, and entry points with no logic behind them.
- Media: `{ placeholder: true, caption: 'Product map - every feature, where it lived, and what it overlapped with', kind: 'wide' }`

### 3. Three users — `id: 'users'`
Three equal tiles in a row. Each tile is an actual screen that persona uses (not avatars), with the persona as the caption.
- One platform, three users, three very different jobs.
- Tiles (image placeholders until screens are supplied; caption = name + one line):
  - **Admin** - configures and runs the system. Smallest group, most settings.
  - **Author** (content manager) - writes the content everyone else relies on. Highest cognitive load.
  - **End user** - agents looking for an answer under time pressure.

### 4. The problem — `id: 'problem'`
Old-design image on the left, accordion on the right. Use the `concepts` renderer; each item swaps the image.
- Intro: `The map turned into five problems. Each one came from the same root: features added, never placed.`
- Accordion items (body = one sentence; images = existing crops):
  1. **No hierarchy** - Everything was treated as equally important, so nothing stood out. → `redesign/overwhelming-1-crop.png`
  2. **No clustering** - Related features lived in different places, so users had to remember where things were instead of understanding why. → placeholder
  3. **Redundancies** - Several features did the same job in slightly different ways, built years apart. → placeholder
  4. **Inconsistency** - The same pattern appeared in three different forms across the product. → `redesign/inconsistent-1-crop.png`, `redesign/inconsistent-2-crop.png`
  5. **No grid** - No shared spatial system, so every screen invented its own layout. → `redesign/no-grid-1-crop.png`, `redesign/no-grid-2-crop.png`
- Outro: `The challenge wasn't fixing screens. It was questioning why each feature existed, and where it belonged - without breaking 15 years of user habits.`
- Remove the old `problemRows` and cards.

### 4b. Key insights — `id: 'insights'`
Text only. Keep the existing 4 cards (`listStyle: 'cards'`), trim each `text` to one sentence. Change the intro to: `Talking to users added what the map couldn't show:`

### 4c. Goals — `id: 'goals'`
Text only. Keep the existing 5 goals as is (label + short text). Intro: `Five goals, each answering something the map or the users told us:`. Keep the outro: `These goals were the right destination. They turned out not to be the right route.`

### 5. User flow — `id: 'flows'`
Full-width (slightly wider than the column, per sketch). Keep the existing `diagram: 'user-flow'`.
- We rebuilt the key flows from scratch, starting with article versioning (Draft → Active → Past), which users relied on daily but had no clear model.

### 6. The abandoned design — `id: 'scrapped'`
Image left, short text right (`sideBySide`). Keep the existing `sideGallery`.
Merge in `setbacks`. Keep it tight:
- Our first design answered every problem on the map at once. In testing, it was too far from what users knew.
- Then the rest: 3 teams for 9 months, urgent features on hold, two products to maintain in parallel, and risky data migration.
- Compact `list` for the 5 reasons (label + max one short sentence each).
- Outro: `The full design is documented and kept as future direction.`

### 6b. The pivot — `id: 'pivot'`
Text only. Keep the section, lighten it:
- Intro: `We scaled back to a facelift. Three goals stayed:` + existing 3-item list (simplify, consistency and scale, mobile).
- Consolidation and collaboration were paused, not killed - they come back in later phases, sequenced by what users need first.
- What we took from it (short list, 2–3 items, label + one sentence): e.g. **Change has a budget** - every change was right alone, but users can only absorb so much at once. **The map outlives the design** - the audit still guides what gets consolidated next. **Foundations first** - grid and components could ship now and carry the bigger changes later.

### 7. The facelift — `id: 'facelift'`
Three equal tiles in a row: **Admin**, **Content manager**, **End user**.
- Same principle for all three: keep what users know, fix the structure underneath.
- Media: CM → `redesign/58.png`, End user → `redesign/23.png`, Admin → placeholder.

### 8. Article fields — `id: 'facelift-fields'`, `group: 'facelift'`
Full-width image. Condense the current `facelift-consolidation`.
- The biggest shift: closing the gap between writing and reading. Editors used to save, switch tabs and check.
- I designed the field components (input and view-only) and how a single field behaves in both modes - so the editor sees what the reader will see.
- Media: `redesign/58.png` (wide), `redesign/32.png`, `redesign/50.png`.

### 9. Article view prototype — `id: 'facelift-article'`, `group: 'facelift'`
Full-width video.
- A clearer hierarchy, persistent navigation, and a right rail for related content and tools.
- Media: `redesign/article-view-prototype.mp4` (wide).

### 10. Article nav bar + micro animations — `id: 'facelift-nav'`, `group: 'facelift'`
Full-width. Keep the existing `sideMarquee` of TOC videos and `redesign/TOC/toc-sidebar.png`.
- The table of contents became the article's nav bar: pinned, collapsed or peeking, with small motions that show where you are.

### 11. AI assistant — `id: 'facelift-ai'`, `group: 'facelift'`
Full-width.
- The right rail made room for an AI assistant that answers questions from inside the article.
- Media: `{ placeholder: true, caption: 'AI Assistant - in-article Q&A', kind: 'wide' }`

### 12. Outcome & takeaways — `id: 'outcome'`
Text only. Cut to 1 paragraph + 3 takeaways (label + one sentence each):
- Paragraph: `The facelift shipped on a unified grid and component system, and the product map still guides what gets consolidated next.`
- **Audit before you design.** - Mapping the product showed us the real problem wasn't the UI, it was the structure.
- **Research makes the pivot possible.** - Testing early told us to change course before we'd built the wrong thing.
- **Components are where systems live or die.** - Consolidating views only worked because the fields behaved the same in every mode.

(Don't repeat "Change has a budget" here - it lives in The Pivot.)
