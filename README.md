# Actionable Transparency Study (GitHub Pages)

This is a lightweight static prototype for a recommender-system experiment.

## What it does
- Uses the same flow as the prior Wine/USB study:
  - Step 1: 5 preference/lifestyle questions
  - Step 2: Results page with 3 fixed recommendations
- The explanation box is identical across all conditions.
- The only manipulation is the action options under the explanation box:
  - Condition A: Explanation-only
  - Condition B: Explanation + Control (slider)
  - Condition C: Explanation + Recourse (Remove this reason)
  - Condition D: Explanation + Control + Recourse

## Files
- `index.html` — launcher with links to all 8 versions (Wine/USB × A–D)
- `app.html` — the actual study flow (reads URL params)

## URL params
- `product=wine` or `product=usb`
- `cond=A|B|C|D`

Example:
- `app.html?product=wine&cond=C`

## Deploy on GitHub Pages
1. Create a new GitHub repository.
2. Upload `index.html`, `app.html`, and `README.md` to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
5. Save. Your site will be available at the URL GitHub shows.

## Notes
- This prototype does not send data to a server.
- For quick testing, the app shows a JSON payload at the end, and stores it in `localStorage` as `rs_study_last`.
