# RS Recourse Demo — v6.4

Goal: eliminate async glitches and ensure **No** provides a clear **final alternative choice**.

Changes:
- No setTimeout for the recourse logic (No → refresh happens synchronously).
- When users click **No**, the system shows an **Alternative option (preview)** and requires **Keep vs Switch**.
- Finish is gated until the decision is recorded (for No). For Yes, Finish is immediately available.

Deploy:
Upload `index.html`, `app.html`, `README.md` to repo root.
Open with `&v=64` to avoid caching.
Build: 2026-03-10 00:24:57Z (UTC)
