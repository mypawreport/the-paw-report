# The Paw Report — Changelog

This tracks releases for both the Android app (Google Play) and the underlying web app (PWA, auto-updates for all users on every visit).

## Android App (Google Play)

| Version | Version Code | Date | Highlights |
|---|---|---|---|
| 5.1.3 | 10 | 2026-07-08 | Fixed home screen widget not appearing in the widget picker (was incorrectly non-exported). Edge lighting now has a color-cycling shimmer wave plus a brighter baseline glow and bigger chase flash. |
| 5.1.2 | 9 | 2026-07-08 | Added the Ground Temp home screen widget (paw-shaped, transparent background, S/M/L size toggle, refresh button). Edge-lighting chase tuned to a true continuous loop with more vibrancy. |
| 5.1.1 | 8 | 2026-07-08 | Edge-lighting and branding refinements ahead of the widget release. |
| 5.0.0.0 | 6 | 2026-07-08 | New twin-paw launcher icon and app-wide branding refresh (header, nav, avatars, notification icon). |

## Web App / PWA (auto-updates, no store submission needed)

Every user gets these instantly since the app is a live PWA hosted on GitHub Pages. Full in-app "What's New" history goes back further — this is the recent highlight reel.

- **v137** — Fixed a bug where the chosen theme (Frost, Violet, etc.) would flash back to the light background every time a report finished loading — a leftover code path was force-resetting the background on every report cycle.
- **v136** — Edge lighting now has a living shimmer: a soft brightness/color wave sweeps around the screen on top of the paw chase.
- **v135** — Edge lighting significantly more vibrant: brighter baseline glow, bigger flash, richer color saturation.
- **v134** — Fixed the edge-lighting chase to be one true continuous loop (was cycling through hidden overflow icons), and made the glow brighter.
- **v133** — Edge lighting chase slowed down; paw prints sized up slightly.
- **v132** — Edge lighting paws now chase around the screen in a continuous loop.
- **v131** — Twin-paw mark applied to avatar picker swatch and the Android push notification icon/badge.
- **v130** — Twin-paw mark added to avatar, Report tab, and notification banner. Edge lighting sized down slightly.
- **v129** — Edge lighting switched to the twin-paw mark.
- **v128** — New twin-paw logo mark introduced in the header.
- **v127** — Fixed top/bottom edge paw prints (were packed edge-to-edge, now spaced to match the sides).
- **v126** — Edge lighting paw prints form a tight, continuous chain along every edge.
- **v125** — Edge lighting paw prints packed in tighter.
- **v124** — Tuned edge lighting paw prints — smaller and closer together.
- **v123** — Edge lighting switched from a solid glow to a row of paw prints tracing the screen border, still colored by safety rating.
- **v122** — "The Paw Report" title gained a subtle gradient fade matching the active theme color.
- **v121** — Fixed the paw-print avatar option rendering as a mismatched blue emoji.
- **v120** — Replaced emoji paw icon in title/Report tab with a crisp icon for consistent rendering across devices.
- **v119** — Profile avatar circle now matches the chosen app theme color.
- **v118** — Fixed the Area Safety scale bar showing green instead of orange for "Elevated Risk".
- **v117** — 7-day forecast accuracy improved for US locations (full hour-by-hour data).
- **v116** — Fixed the Violet theme for real — picker swatch and applied accent color both corrected.
- **v115** — Location fixes fall back to network-based positioning if GPS is slow indoors.
- **v114** — Fixed a bug asking for location again even after permission was already granted.
- **v113** — Fixed the Violet theme showing teal instead of purple.
- **v112** — Fixed an invisible "Today" tab (broken CSS colors) and a sparse late-night forecast chart.
- **v111** — Fixed Best Time to Walk & Ground Temp by switching to a more reliable weather data source (MET Norway).

---
*Maintained by the mypawreport team — mypawreport@gmail.com*
