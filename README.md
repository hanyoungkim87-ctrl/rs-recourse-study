# RS recourse study — profile-based recourse (static demo)

This folder is a **static** (HTML/CSS/JS) website you can host on GitHub Pages.

## How to run locally
Open `app.html` in a browser, or run a local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/app.html
```

## Conditions (A/B/C/D)
Use the URL parameter `cond`:

- `cond=A` → Explanation only
- `cond=B` → Explanation + Control (source weighting slider)
- `cond=C` → Explanation + Recourse (profile correction)
- `cond=D` → Explanation + Control + Recourse

Example:
`app.html?cond=D`

## Replace product images
Images are placeholders in `assets/img/`. You can replace the files with your own images:

- Keep the same filenames (recommended), **or**
- Update `catalog` in `assets/js/app.js` to point to your new image paths.

The UI uses `object-fit: contain` so tall images should not be cropped.
