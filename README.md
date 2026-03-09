# RS Recourse Demo — FINAL v5 (Feels real)

This version fixes the “manipulation doesn’t feel like recourse” problem.

Recourse (C/D):
1) **Voice (confirm vs contest a specific reason)** tied to the participant’s actual quiz answer.
   - If contested, the system visibly **refreshes** the list (re-rank + “Updated after your correction”).
2) **Repair (hide one item → alternative appears)** with badge + highlight.

Exposure:
- In recourse conditions, **Finish is gated** until Step 1 and Step 2 are completed.

Upload `index.html`, `app.html`, `README.md` to repo root for GitHub Pages.


v5.1 hotfix: “Applied” acknowledgement now appears AFTER the visible change (with a short progress message first).


v5.2 hotfix: Loader message shown first; “Applied” appears only after the updated list is visibly repainted (double rAF).
