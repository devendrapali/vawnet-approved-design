# VAWnet v3 — static build (homepage)

```
build-v3/
├─ index.html                  all blocks assembled
├─ assets/css/global.css       tokens, base, grid, shared components
├─ assets/css/blocks/*.css     one file per block
└─ assets/js/site.js           quick exit, mega menus, mobile nav, search scopes
```

No inline styles. Every colour, font, size, radius and shadow is a variable in `global.css` `:root`.

## Load order
1. Google Fonts (Plus Jakarta Sans + Manrope)
2. `global.css`: enqueue site-wide in the theme
3. Block CSS: in WordPress, register each file as the block's `style` in `block.json` so it only loads on pages that use that block

## Shared building blocks (global.css)
- `.container`: max width + gutters
- `.section`: half of `--section-space` above and below, so any two blocks stack to one full gap
- `.grid .grid--2|3|4|5`: responsive card grid (5→3→2→1)
- `.surface-light | -tint | -dark | -brand`: colour context; headings, eyebrows, text and buttons inside adapt automatically
- `.section-head`: eyebrow + title, optional `__desc`, optional `__link`
- `.eyebrow`, `.section-title(--sm)`, `.section-text`, `.text-accent`
- `.btn` + `--plum | --brand | --white | --outline`, sizes `--lg | --xl`, layout `--block | --split`, `--shadow`
- `.tag`, `.chip`, `.badge-pill`, `.check-list`, `.icon` (Lucide inline SVG, inherits currentColor)

## Blocks → suggested ACF fields
- **safety-bar** (template part): message, hint, exit URL
- **site-header** (template part): logo, menus from WP nav menus, login URL, CTA link
- **hero**: badge text, title (WYSIWYG-lite, wrap accent word in `.text-accent`), lead, scope options (repeater: label, value), placeholder, popular links (repeater), main image, inset image, stats (repeater, max 2)
- **action-cards**: toggle “overlap block above” (adds `--overlap`), cards (repeater: icon, title, text, link, style select light/dark/brand)
- **media-split**: toggle reverse, image A, image B, badge number + label, eyebrow, title, text, checklist (repeater), button link, note (WYSIWYG)
- **post-grid**: eyebrow, title, description, header link, columns (2/3/4), source (post type / taxonomy / manual relationship), show badge / meta / footer count / read-more
- **stats-band**: eyebrow, title, text, stats (repeater: number, label, sub)
- **event-grid**: eyebrow, title, header link, source (events query or manual), columns
- **topic-grid**: eyebrow, title, header link, terms (taxonomy field), columns
- **cta-banner**: surface select (brand/dark), eyebrow, title, text, buttons (repeater: link, style)
- **site-footer** (template part): logo, address, menus, newsletter form shortcode, legal menu

## Reuse on the other templates
- The collections and news sections are the same `post-grid` block; card parts (`__badge`, `__meta`, `__footer`, `__more`) are optional.
- Switch any section’s colours by adding a surface class to the wrapper.
- Only `site.js` initialises behaviour, scoped by `data-*` attributes, so a block can appear more than once on a page.
