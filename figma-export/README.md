# Figma export — static portfolio pages

Flat HTML snapshots of every portfolio page, captured from the live React app
at a **1920px** viewport. No React, no Babel, no scripts — just markup plus the
site's own `<style>` block, so an HTML→Figma importer sees final layout.

| File | Page | Source |
|---|---|---|
| `01-home.html` | Home / index | `main` |
| `02-work.html` | All Work | `main` |
| `03-about.html` | About | `main` |
| `04-resume.html` | Resume | `main` |
| `05-project-help-center.html` | Help Center case study | `main` |
| `05b-project-help-center-BRANCH.html` | Help Center case study | `help-center-page-rebuild` |
| `06-project-design-system.html` | Design System case study | `main` |
| `07-project-product-redesign.html` | Product Redesign case study | `main` |
| `08-project-advanced-search.html` | Advanced Search case study | `main` |

## What was changed vs. the live site

- **Images and video are blank placeholders.** Every `<img>` / `<video>` became a
  `div.fx-ph` — a dashed, lightly-filled box pinned to the exact width/height the
  real asset occupied at 1920px, so layout is unchanged. The original filename is
  kept on `data-src` if you need to know what belongs in a slot.
- **Scroll reveals are resolved.** `.reveal` elements are forced to their visible
  resting state; all animations and transitions are disabled.
- **Runtime chrome removed** — loader, grain overlay, scroll bar, page-wipe,
  blob cursor, tweaks panel, cmd-K.
- Only external dependency left is the Google Fonts stylesheet (Montserrat + Raleway).

Theme is the site default: **dark**, `signal` accent, dense.
