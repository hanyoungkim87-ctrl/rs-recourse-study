# Experiment-ready stimuli (v72)

This build is intended to feel like a normal shopping site, not an “experiment stimulus”.

Key updates:
- Removed stimulus-like labels and instruction banners.
- Results layout reordered: recommendations appear FIRST, recourse UI appears BELOW.
- Added simple product images (inline SVG data URIs; no external assets).
- Fixed modal scrolling by enabling overlay + modalInner scrolling and setting max-height.

## GitHub Pages deploy
1) Upload `index.html` and `app.html` to repo root
2) Settings → Pages → Deploy from a branch → main / (root)
3) Use cache buster: `&v=72`

## URLs
`app.html?product=wine&cond=A&v=72`
`app.html?product=wine&cond=B&v=72`
`app.html?product=wine&cond=C&v=72`
`app.html?product=wine&cond=D&v=72`

Optional redirect back to a survey:
`app.html?product=wine&cond=D&v=72&return=https://example.com`

Build: 2026-03-26 19:53:59Z UTC
