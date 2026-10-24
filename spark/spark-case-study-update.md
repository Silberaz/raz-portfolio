# Update: Spark Design System case study copy

## Task

Update the copy on the **Spark Design System** case study page of my portfolio site (the page reached from Work → "Spark design system"). This is a copy-only change.

- Find each "Current text" below in the codebase (search for a distinctive phrase from it; the source may store it in a data/content file rather than in a component).
- Replace it with the "New text".
- Keep all existing markup, components, class names, styles, layout and section order. Do not restyle anything.
- Leave every other `{{ ... }}` placeholder on the page untouched unless it is listed below. I'll fill those in myself later.
- Match the site's existing punctuation style: spaced hyphens (" - ") rather than em dashes.
- Don't edit the other case studies.
- When done, run the site locally, open the Spark case study, and confirm every section below renders with the new text and nothing else changed.

---

## 1. Role

**Current text**
```
{{ Product Designer - sole designer on the system / lead }}
```

**New text**
```
Designer · Senior contributor
```

---

## 2. Intro paragraph (below the subtitle)

**Current text**
```
The design system behind KMS Lighthouse - tokens, components, and documentation serving two very different surfaces: a dense authoring environment for knowledge managers, and a fast lookup experience for agents.
```

**New text**
```
The design system behind KMS Lighthouse - tokens, components, and documentation for a white-label product used by three very different groups: knowledge managers authoring content, agents looking up answers under pressure, and admins running the system. Every surface carries the customer's brand, not ours.
```

---

## 3. Context

**Current text** (two paragraphs)
```
KMS Lighthouse builds enterprise knowledge management software - the tool support agents, banks, and telcos use to find a verified answer in seconds. That means two very different surfaces in one product: a dense authoring and admin environment for knowledge managers, and a fast, low-friction lookup experience for agents under time pressure.

Spark is the design system that holds both together.
```

**New text** (three paragraphs)
```
KMS Lighthouse builds enterprise knowledge management software - the tool support agents, banks, and telcos use to find a verified answer in seconds. It's sold white-label, so every customer sees it under their own brand.

Inside it are three user groups with three separate interfaces: a dense authoring environment for knowledge managers, a fast, low-friction lookup experience for agents under time pressure, and an admin interface for the smallest group, the people who run the system. Spark currently covers authoring and agent lookup; the admin interface joins later in the redesign roadmap.

Spark is the design system that holds them together.
```

---

## 4. The problem - add a fourth point

Keep the three existing points (Drift, Slow handoff, No accessibility floor) exactly as they are. Add this as a **fourth** point, using the same format as the others (bold lead-in, then the sentence):

```
Branding by hand. Every customer's theme was designed manually by someone on the team - one to three weeks depending on the client - then spent another two weeks to a month in development and shipping.
```

Lead-in: `Branding by hand.`

---

## 5. Principles

Replace the three placeholder principles. Keep the existing list structure (title, then description). If the component only supports one line per principle, put the full description in that line.

**Current text**
```
{{ Principle 1 }} - {{ one line }}
{{ Principle 2 }} - {{ one line }}
{{ Principle 3 }} - {{ one line }}
```

**New text**

Principle 1
- Title: `Simple by default`
- Description: `The product is complex enough on its own. Components stay plain, clear, and predictable, so the interface never adds to the load the content already carries.`

Principle 2
- Title: `Brand-neutral, brand-ready`
- Description: `Spark powers a white-label product. Components carry no identity of their own, so every customer can apply their brand and make the interface theirs.`

Principle 3
- Title: `One system, every surface`
- Description: `Three user groups, three distinct interfaces, and many designers working across many projects. Strict guidelines are what keep it all feeling like one product.`

---

## 6. Foundations

**Current text**
```
Tokens first: color, type, spacing, radius, elevation - defined once, named semantically, and mirrored 1:1 between Figma variables and code.
```

**New text** (two paragraphs)
```
Tokens first: color, type, spacing, radius, elevation - defined once, named semantically, and mirrored 1:1 between Figma variables and code.

A brand layer sits on top. Through a customization panel, customer admins now apply their own branding themselves. What used to take three to seven weeks of design and development now takes as long as picking a few colors and uploading a few images - no design pass, no implementation, no delivery cycle.
```

Do not change the image caption under this section.

---

## 7. Components

**Current text**
```
{{ N }} components covering the {{ authoring console and agent workspace }}, each with defined variants, states, and responsive behavior.
```

**New text** (keep the `{{ N }}` placeholder)
```
{{ N }} components covering the authoring environment and agent workspace, each with defined variants, states, and responsive behavior - and each deliberately plain, so it stays legible under any customer's brand.
```

---

## 8. Documentation & governance

**Current text**
```
Spark ships with usage documentation, contribution guidelines, and a review path - so the system stays alive after I stop maintaining it personally.
```

**New text**
```
Spark ships with usage documentation, contribution guidelines, and a review path. With multiple designers working across multiple projects, that's what keeps everyone building from the same rules - and keeps the system alive long after any one of us stops maintaining it.
```

---

## 9. Where it stands - measurement line

Leave the first paragraph of "Where it stands" (with its placeholders) unchanged. Replace only the measurement sentence.

**Current text**
```
What I'd measure at launch: time from design to shipped screen, share of UI built from Spark components, and accessibility defects caught before QA.
```

**New text**
```
What I'd measure at launch: time from design to shipped screen, share of UI built from Spark components, accessibility defects caught before QA, and how many customers brand the product themselves instead of asking us.
```

---

## Not changing

- Page title, subtitle, timeline, tags, and the "In active internal rollout" note
- The three existing "The problem" points
- All image captions
- "Where it stands" first paragraph and "What I'd do differently" (placeholders stay for now)
