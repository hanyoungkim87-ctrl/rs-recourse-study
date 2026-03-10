# RS Recourse Demo — v6.2 (clean rebuild)

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


v6.2: Two-step confirmation for Step 2 (Hide/Replace).
- First click arms the action (no list change, no 'Applied').
- Second click confirms and applies.
- Cancel button resets the armed state.
This prevents the 'hidden item replaced' message from appearing unless the user explicitly confirms.
