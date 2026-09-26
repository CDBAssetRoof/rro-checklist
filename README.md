# RRO Observation Checklist

AssetRoof field checklist for Registered Roof Observer daily observation reports. It installs on an Android phone from Chrome and runs with no internet connection.

Inspection data stays on the phone that recorded it. Nothing is sent anywhere unless the user taps Share or Back up.

## Install on the phone

1. Open the GitHub Pages address in Chrome.
2. Chrome menu, then **Add to Home screen** (or **Install app**).
3. Open it once from the home screen while online. After that it works offline.

## Updating the app

Change the files, then bump `VERSION` in `sw.js` (for example `rro-v1` to `rro-v2`), commit and push. The phone picks up the new copy the next time the app opens online, and shows "Update ready. Close and reopen the app."

## Files

- `index.html`: the whole app
- `sw.js`: offline cache
- `manifest.webmanifest`, `icon-*.png`: install details
- `fonts/`: Montserrat and Open Sans (SIL Open Font License)
