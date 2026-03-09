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


v5.3: stronger recourse feel + robustness.
- Key signal is more concrete (includes numeric slider position; avoids vague “balanced”).
- Finish is explicitly gated (disabled) immediately when voice step is taken.
- Reason state uses “Under review” before being removed.
- After removal, key-signal line is annotated “removed at your request.”
- Build tag shown in UI (v5.3).


v5.4: hardening + more obvious refresh
- Contest now replaces the TOP recommendation with a clearly different alternative (stronger visible refresh).
- Hide button names the specific item being hidden.
- Finish stays disabled until repair completes (and disabled styling is stronger).
- Build watermark appears in the modal title and condition badge.
- Added cache-control meta tags.


v5.5: UX fix for “No disables everything”.
- Only the Yes/No buttons are disabled during the refresh; the panel stays responsive.
- No button text changes to “Updating…” during processing.
- A prominent status box appears while updating.
- Step 2 (hide & replace) unlocks after the refresh completes.
