# Profile-based Recourse + Control stimuli (v81)

This build includes BOTH product contexts (wine + USB) and 5 conditions:

- A: Explanation only (no control, no recourse)
- B: Explanation + Control (weighting slider)
- C: Explanation + Recourse (contest + correct inferred profile)
- D: Explanation + Control + Recourse
- E: No transparency baseline (recommendations only)

## URLs
- `app.html?product=wine&cond=A&v=79`
- `app.html?product=usb&cond=D&v=79`
- `app.html?product=wine&cond=E&v=79`

## Images
This build uses exactly 6 images per product type:
- `assets/img/wine_1.jpg` ... `wine_6.jpg`
- `assets/img/usb_1.jpg` ... `usb_6.jpg`

Replace those files (same filenames) with your own photos.

Build: 2026-03-28 18:55:54Z UTC

## Completion codes (shown on the final screen)
Each product × condition has a unique 4-digit code to copy/paste into the survey.

Base codes:
- Wine: A=1100, B=1200, C=1300, D=1400, E=1500
- USB:  A=2100, B=2200, C=2300, D=2400, E=2500

Recourse tracking:
- In Recourse conditions (C/D), the last digit indicates whether the participant applied a correction:
  - 0 = no correction applied
  - 1 = correction applied
  Examples: wine C not corrected = 1300; wine C corrected = 1301.



v81: Adds image cache-buster (uses ?v=) and safe fallback for missing images.
