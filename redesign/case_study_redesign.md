# Product Redesign — Case Study Copy

A full redesign of KMS Lighthouse's enterprise knowledge management platform — and the story of why the ambitious version got scrapped, and what shipped instead.

---

## Section structure (recommended order for long-scroll)

1. Hero
2. Context
3. Role & Approach
4. The Problem
5. Initial Goals
6. Research
7. Key Insights
8. User Flows
9. Wireframing
10. Prototyping
11. Usability Testing
12. **Setbacks** *(the pivot moment)*
13. **The Pivot** *(revised goals)*
14. The Facelift — End-User Experience
15. The Facelift — Responsive Grid System
16. The Facelift — Consolidating the Editing Experience
17. The Facelift — Right Sidebar & AI Assistant
18. The Scrapped Design *(optional deep-dive)*
19. Outcome & Key Takeaways

---

## 1. Hero

**Tag line / project name**
Product Redesign

**One-line description**
A full redesign of the KMS Lighthouse platform that pivoted mid-project — and got better because of it.

**Meta**
- Role: Senior Designer
- Project type: Team project
- My contributions: content management experience, field component system, responsive grid (co-designed)
- Scope: UX + UI
- Year: 2024–2025
- Company: KMS Lighthouse

**Suggested image:** the redesigned article view (page 35) or the new homepage (page 23). Avoid the busy "everything visible" cover image — pick one strong final.

---

## 2. Context

KMS Lighthouse is an enterprise knowledge management platform used by companies like DHL, GE Healthcare, AIG, and Allianz to power their call centers, self-service portals, and internal knowledge bases. It's the core product the company is built on.

But by 2024, the platform was showing its age. Years of feature additions, multiple outsourced design teams, and no unified design system had produced an interface that was cluttered, inconsistent, and increasingly hard for users — and the company — to maintain.

We set out to redesign it. What we delivered wasn't what we started with.

---

## 3. Role & Approach

I worked on this as a Senior Designer alongside a small in-house design team, partnering closely with product and engineering across multiple phases.

It was a team effort with no single lead, but each designer owned distinct surfaces end to end. My focus was on the content management experience — the part of the product where business users spend most of their day — and I designed the field component system (input fields and view-only fields) that became the foundation for consolidating the platform's separate editing and end-user views. I also co-designed the responsive grid that underpins the whole redesign.

The work below reflects what I designed and led on.

---

## 4. The Problem

The platform had three structural issues that compounded each other:

**Cluttered interface.**
The UI was overloaded with information and lacked a clear grid system, making it difficult for users to focus on critical tasks.

**Inconsistency.**
Built over several years without a unified design system — and through various outsourced designers — the platform had drifted into a confusing, inconsistent experience. The same pattern appeared in three different forms across the product.

**Performance issues.**
Years of layered feature additions had created redundancy, with multiple features serving the same purpose. The system had slowed down, both technically and cognitively.

---

## 5. Initial Goals

The original ambition was big. Five goals to fundamentally reshape the product:

**Simplify the interface.** Reduce cognitive load and improve task completion.

**Build for consistency and scale.** Establish a unified design system the company could grow with.

**Optimize for mobile.** Make the platform genuinely responsive, not just adapted.

**Consolidate features.** Merge redundant features that had drifted apart over years of patches.

**Enhance collaboration.** Add comments, tagging, and simultaneous editing — features long requested by users.

These goals were the right destination. They turned out not to be the right route.

---

## 6. Research

To make sure the redesign was grounded in real needs, we ran four research tracks:

- **Stakeholder interviews** to understand business priorities and the constraints the redesign had to respect.
- **User interviews** with existing users to surface specific usability pain points.
- **Competitive analysis** of other leading knowledge management platforms to identify table-stakes patterns and gaps we could differentiate on.
- **Usability evaluations** of the current system to pinpoint the highest-friction moments.

---

## 7. Key Insights

Four insights emerged from the research, and each one shaped a decision later in the project:

**Editing felt disconnected from reading.**
Lighthouse has three distinct user types — admins, content managers, and end users (typically call center reps) — and each one was looking at a completely different interface. The content managers had it worst: every time they updated a piece of content, they had to jump to a separate tab or window to see what the end user would actually see. That gap created constant low-grade anxiety — *did I just break something?* — and slowed work down because every edit required a context switch to verify it. Notion became our reference point here: editing and reading should feel nearly identical, so you trust what you're writing.

**Navigation was disorienting.**
Users frequently lost track of where they were in the product. The information architecture had grown organically, not deliberately.

**Collaboration was a real gap.**
There was strong demand for the ability to share notes, comment on documents, and work alongside teammates — features competitors offered and Lighthouse didn't.

**Mobile didn't really work.**
The platform wasn't optimized for smaller screens, which had become a daily friction for users in the field.

---

## 8. User Flows

Working closely with product, I mapped key task flows to make sure the new product simplified the most common journeys rather than just visually polishing them.

A particular focus: the article versioning model (Draft → Active → Past versions), which was central to how content managers worked but had no clear conceptual model in the old product.

*[Use the user flow diagram from the deck — image 8]*

---

## 9. Wireframing

Wireframes explored layout structures, content hierarchy, and how responsiveness would work across devices — particularly for the densest screens like the article editor.

*[Image 9]*

---

## 10. Prototyping

I built interactive prototypes to validate flows, test interactions, and gather early feedback from product and engineering before committing to high-fidelity design.

*[Image 10]*

---

## 11. Usability Testing

We tested the prototypes with existing users to validate design decisions before going further.

The testing surfaced something we hadn't expected — and that became the inflection point of the entire project.

---

## 12. Setbacks

The redesign was working, on paper. The flows were cleaner. The interface was simpler. The new patterns were more consistent.

But four problems showed up at the same time, and together they killed the original plan:

**Dev estimates came in too high.**
Implementation projected three full-time engineering teams working for nine months. That timeline didn't fit any reasonable product roadmap.

**Usability testing flagged adoption risk.**
The changes were too far removed from the current product. Existing users — who had built workflows around the old patterns over years — pushed back. The data suggested low adoption if we shipped it as-is.

**Users needed features now.**
The roadmap had specific features users were urgently waiting on. A nine-month redesign cycle meant putting those on hold.

**Two products in parallel was untenable.**
Not all users wanted to upgrade. Supporting both interfaces during a long migration would have meant effectively maintaining two different products.

We had a choice: push through and hope, or pivot.

---

## 13. The Pivot

We pivoted. The full redesign was scaled back. Three goals stayed:

**Simplify the interface.**
**Build for consistency and scale.**
**Optimize for mobile.**

The other two — consolidating redundant features and adding collaboration tools — were paused, not killed. They'd return in later phases, sequenced around what users actually needed first.

The new approach: a focused **facelift** that improved the parts of the product users touched most, on the foundation of a real design system and grid, without breaking the workflows people relied on.

*[Use the comparison Goals image — page 15, where two goals are greyed out]*

---

## 14. The Facelift — End-User Experience

The facelift focused on the moments users hit most — homepage, search, article view, content editing — and brought them onto a shared visual and structural foundation.

The homepage kept what worked (search-first, customer's branded content, news, employee spotlight) but cleaned up the chrome around it. The article view got a clearer hierarchy, persistent navigation, and a right-side rail that surfaces related content and AI assistance.

*[Images 23 (homepage), 35 (article view)]*

---

## 15. The Facelift — Responsive Grid System

I co-designed the responsive grid system that became the foundation for the redesign — and the basis for the design system going forward.

The grid handles the full range of platform states: no side panels, left side panel, right side panel, both side panels — each across five breakpoints. It's the first time the product has had a unified spatial system that designers and engineers can both work from.

*[Image 30]*

---

## 16. The Facelift — Consolidating the Editing Experience

The biggest shift in the facelift — and the one I'm proudest of — was closing the gap between editing and reading.

Lighthouse has three user types looking at different interfaces: admins, content managers, and end users. Of those, the content manager has the highest cognitive load — they're writing the content that powers everyone else's work — and the old product made their job harder by showing them an editor that looked nothing like what their readers would see. Every save was followed by a tab switch to verify nothing had broken.

In the facelift, the content manager's view and the end user's view sit on the same structural foundation. Same field types, same layout, same content blocks. The editor sees what the reader will see — minus the editing affordances — so they can write with confidence instead of constantly verifying.

We can't fully replicate the Notion model (Lighthouse is a much more complex system with more field types, more permission states, and more content structures), but we could borrow the principle: **minimize the deviation between writing and reading**.

**My specific contribution:**
I designed the field components that made this consolidation possible — the input fields and the view-only fields — and the interaction model that governs how a single field behaves across edit and view-only states. The system-level decision to consolidate views could only ship if the components underneath it were designed to behave coherently across both modes. That's the piece I owned.

*[Image 58 (CM view vs Agent view comparison), image 32 (table view fields), image 50 (editor with field-level controls)]*

---

## 17. The Facelift — Right Sidebar & AI Assistant

A new right sidebar was added in editing mode, designed to surface contextual tools without cluttering the main workspace — history, analytics, permissions, and properties, each opening as a focused panel.

This also set the stage for the **AI Assistant**, which sits in the same sidebar real estate and lets users ask questions of the content directly inside the article they're working on.

*[Images 40, 50, 55]*

---

## 18. The Scrapped Design *(optional)*

The original ambitious redesign isn't lost — it's documented and preserved as future direction for the platform. If you're showing the full case study, the scrapped designs are worth including as evidence of what the team is capable of when constraints allow.

*[Images 47, 50, 52 — scrapped editor concepts]*

**Note for the web version:** if including this section, frame it clearly as "not shipped, but informing future work." Recruiters value that distinction.

---

## 19. Outcome & Key Takeaways

**Outcome**
Although the full redesign was ultimately scrapped, the process gave us a much clearer understanding of the platform's real constraints, user needs, and technical realities. The pivot — from a complete overhaul to a focused facelift — produced something that better aligned with what users and the business could actually absorb.

The shipped facelift improves the highest-traffic moments of the product, runs on a unified responsive grid system, and meaningfully closes the gap between content managers and the end users they're writing for. The structural groundwork is now in place for future phases — including the feature consolidation and collaboration work that got paused.

**Key takeaways**

- **Prioritize user needs through consistent research and testing.** The feedback gathered throughout the project was what made the pivot possible — and the right call. Without it, we'd have shipped a redesign users wouldn't have adopted.
- **A simple, intuitive interface is what reduces frustration — not novelty.** Small, targeted changes to existing user flows significantly improved usability in testing.
- **Components are where systems live or die.** Decisions like "consolidate the editing and reading views" sound like UX architecture, but they only work if the underlying components are designed to behave coherently across every context they appear in. The system-level call and the component-level work are inseparable.
- **Collaboration tools should be integrated seamlessly, not bolted on.** Pausing the collaboration work was the right call, because doing it well requires more design space than a facelift allows. It's worth shipping later, properly, rather than now, poorly.

---

# Notes for implementation

**On the central story.**
The pivot is the strongest moment in this case study — possibly in the whole portfolio. Most portfolios show projects that worked as planned, which is a tell that they're sanitized. A case study that shows real constraints, a hard call made in response, and a better outcome because of it is genuinely rare. Lead into it deliberately and don't soften it.

**On the consolidated views section.**
This is the work where your individual contribution is most claimable — you owned the field components that made the system-level consolidation possible. Make sure that section gets real visual treatment on the page: the before/after gap between CM view and end-user view is the single most demonstrable improvement in the facelift. If you can do a side-by-side comparison (old CM view → old end-user view → new unified pattern), that's the most powerful image in the case study.

**On length.**
This is longer than the Help Center case study because it has two distinct halves — the original redesign attempt and the pivot to a facelift. If you want to keep both halves on one long-scroll page, the structure above works. If it feels heavy, cut Section 18 (Scrapped Design) entirely and let the pivot stand on the strength of sections 12–13.

**On image priorities.**
- **Must keep:** the before/after comparison (page 3 vs page 23), the Setbacks page (12), the revised Goals (page 15), the grid system (page 30), the article view (page 35), the CM view vs Agent view comparison (page 58)
- **Strong supporting:** user flows (8), AI Assistant (40), right sidebar (55), field components (page 32)
- **Cut first:** duplicate prototyping/usability testing pages (10, 11), the scrapped design deep-dive (47–52)

**Errors in the source deck still worth fixing if you're keeping the PDF as a downloadable:**

1. **Key Insights page (page 7):** Two of the four insights are labeled "Streamlining Navigation" but cover different topics. The labels also don't match the body copy underneath them. The four real insights are in Section 7 of this rewrite.
2. **Consolidated Views page (58):** The body copy is duplicated from the user flows page and doesn't describe what the page is actually about. The correct framing is in Section 16 of this rewrite.
3. **Pivot page transition (13–16):** The deck has the original Goals page appearing twice before showing the revised version. The web flow above shows them once each, with the Setbacks section in between.

**On iteration.**
You mentioned this is the first pass and you'll revise once it's live. Smart instinct. Two things worth watching once it's published:
- Whether the consolidated views section reads as a *user-impact* story or a *components-nerd* story. It should be both, but the user-impact framing (content managers writing with confidence) needs to lead, not follow.
- Whether the pivot reads as a setback or a strength. The current copy positions it as a strength; if any reader friction comes back from the section, that's the signal to make the framing even more direct.
