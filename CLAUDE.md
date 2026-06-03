# QNC ERP — Working rules

This repo holds a single self-contained ERP UI design: **`index.html`**
(HTML + inline CSS + inline JS, no build step).

## Rules agreed with the user

1. **Screenshot every result.** After completing any request that changes the
   UI, render `index.html` and show the user a screenshot of the result.
   Run:

   ```bash
   node .claude/screenshot.mjs index.html /tmp/qnc_shot.png
   ```

   Then deliver `/tmp/qnc_shot.png` to the user with `SendUserFile`.
   (First time in a fresh container: `npx playwright install chromium`.)

2. **Only edit `index.html`.** Keep all changes inside the single HTML file —
   do not split out separate `.css` / `.js` files or add new source files for
   the design. Tooling/config (`.claude/`, `CLAUDE.md`) is exempt.

## Notes

- External CDNs (bootstrap-icons, Google Fonts) may be blocked by the
  environment's network policy, so icons/fonts can appear missing in
  screenshots — that is an environment limitation, not a file bug.
