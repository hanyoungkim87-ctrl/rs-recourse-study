# RS Recourse Demo — v6.0 (clean rebuild)

This is a clean rebuild after patch-chain issues.

Key behaviors:
- **Recourse (C/D)** = voice + repair
  1) Confirm vs contest a **specific** reason tied to the participant’s actual quiz answer.
     - Contest replaces the TOP recommendation with a clearly different alternative + badge.
  2) Hide one item → system replaces it with an alternative + badge.
- **Finish is gated** in recourse conditions until repair is completed.
- **Control (B/D)** = one lightweight slider before results.

Deployment:
Upload `index.html`, `app.html`, `README.md` to repo root and hard refresh (Cmd+Shift+R).
Launcher links include `&v=6` for cache-busting.
