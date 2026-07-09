# The Paw Report — Changelog

This tracks releases for both the Android app (Google Play) and the underlying web app (PWA, auto-updates for all users on every visit).

## Android App (Google Play)

| Version | Version Code | Date | Highlights |
|---|---|---|---|
| 5.1.9 | 23 | 2026-07-09 | Fixed widget showing "--°F" — LauncherActivity now saves last known GPS coordinates to SharedPreferences as a fallback for the widget when LocationManager returns null on first launch. |
| 5.1.8 | 19–21 | 2026-07-09 | Version code conflict resolution builds. Same feature set as v5.1.7 (widget config screen, resizable footprint, gear icon). |
| 5.1.7 | 17 | 2026-07-09 | Added widget configuration screen — lets users pick pet size (S/M/L), theme color (teal/navy/violet), and toggle air temperature display. Widget footprint reduced to 110x90dp (resizable). Gear icon on widget opens settings. Also removed a developer debug "hot car test bar" that was leaking to all users. |
| 5.1.6 | 15 | 2026-07-09 | Widget confirmed working on real device. Added GPS location permissions + non-blocking permission request in LauncherActivity. Rebuilt GroundTempWidgetProvider from scratch with full defensive error handling and direct backend integration. |
| 5.1.5 | 13 | 2026-07-09 | First build to genuinely contain the widget — previous builds (v5.1.2–v5.1.4) were silently missing it because bubblewrap's project regeneration wiped all manually-added native files on every build. Identified root cause and implemented mandatory re-injection step (/app/inject_widget.sh). Widget features: paw icon, live ground temp, safety status, S/M/L size chip (tap to cycle), refresh button. |
| 5.1.4 | 11 | 2026-07-09 | Fixed the home screen widget failing to load ("Can't load widget") after being added. Root cause: release build had code shrinking (`minifyEnabled true`) with zero explicit keep rules for the widget provider, which can silently break RemoteViews binding. Added proguard keep rules for the widget class, and hardened the provider so any unexpected error falls back to a safe placeholder instead of crashing the widget host. |
| 5.1.3 | 10 | 2026-07-08 | Fixed home screen widget not appearing in the widget picker (was incorrectly non-exported). Edge lighting now has a color-cycling shimmer wave plus a brighter baseline glow and bigger chase flash. |
| 5.1.2 | 9 | 2026-07-08 | Added the Ground Temp home screen widget (paw-shaped, transparent background, S/M/L size toggle, refresh button). Edge-lighting chase tuned to a true continuous loop with more vibrancy. |
| 5.1.1 | 8 | 2026-07-08 | Edge-lighting and branding refinements ahead of the widget release. |
| 5.0.0.0 | 6 | 2026-07-08 | New twin-paw launcher icon and app-wide branding refresh (header, nav, avatars, notification icon). |

## Web App / PWA (auto-updates, no store submission needed)

Every user gets these instantly since the app is a live PWA hosted on GitHub Pages.

- **v146** — Full code audit: removed unused CSS variables, dead debug functions, stale console.log calls, and 30+ obsolete "What's New" entries. Removed a developer "hot car test" debug bar that was unconditionally visible to all users. App trimmed to 208KB — cleanest build ever.
- **v145** — Fixed edge-lighting paw prints not reaching the screen bottom on some phones. Fixed "Report still yellow" issue by syncing the backend `getPawSafety` temperature thresholds (79°F/80°F Warm→Hot) with the frontend rating logic.
- **v144** — Removed edge-lighting shimmer/filter animation entirely after confirming that even container-level CSS `filter` animation causes lag on real devices (same root cause as v140 — `filter` forces GPU rasterization of the entire animated subtree on every frame). Lowered Warm→Hot edge-lighting color threshold to a flat 80°F for all pet sizes (was size-calibrated 82–88°F).
- **v143** — Brought back the edge-lighting color shimmer using a lightweight method — the hue animation now runs on just the 4 strip containers instead of on every individual icon, so it doesn't reintroduce the lag that v140 fixed.
- **v142** — Fixed a gap sometimes appearing at the bottom of the edge-lighting side strips on some phones — the viewport height used to size the icon chain could be measured before the browser UI fully settled. Now uses the largest of several viewport measurements plus a defensive re-check shortly after load.
- **v141** — Critical fix: the service worker's offline cache (`sw.js`) had been frozen since v131 with a cache-first strategy, meaning some installed devices could keep being served an old, stale copy of the app indefinitely. Switched to network-first (always fetch the latest when online, fall back to cache only when offline).
- **v140** — Major performance fix: edge lighting was animating expensive `filter` effects on 100+ paw icons continuously — a classic cause of phone lag and battery drain. Now uses a static filter (computed once) with cheap GPU-friendly opacity/scale animation only.
- **v139** — Fixed edge lighting sometimes not matching the active tab — a background report refresh was force-overriding the glow color even while the Safety tab was open.
- **v138** — Fixed the Frost theme's header title and paw icon being nearly invisible (dark text on dark background).
- **v137** — Fixed a bug where the chosen theme would flash back to the light background every time a report finished loading.
- **v136** — Edge lighting shimmer wave added (soft brightness/color sweep around the screen).
- **v135** — Edge lighting more vibrant: brighter baseline glow, bigger flash, richer saturation.
- **v134** — Fixed edge-lighting chase to be one true continuous loop; glow made brighter.
- **v133** — Edge lighting chase slowed; paw prints sized up slightly.
- **v132** — Edge lighting paws chase around the screen in a continuous loop.
- **v131** — Twin-paw mark applied to avatar picker and Android push notification icon/badge.
- **v130** — Twin-paw mark added to avatar, Report tab, and notification banner.
- **v129** — Edge lighting switched to the twin-paw mark.
- **v128** — New twin-paw logo mark introduced in the header.
- **v127** — Fixed top/bottom edge paw print spacing to match the sides.
- **v126** — Edge lighting paw prints form a tight, continuous chain along every edge.
- **v125** — Edge lighting paw prints packed tighter.
- **v124** — Tuned edge lighting — smaller, closer paw prints.
- **v123** — Edge lighting switched from solid glow to a row of paw prints tracing the screen border, colored by safety rating.
- **v122** — App title gained a gradient fade matching the active theme color.
- **v121** — Fixed paw-print avatar option rendering as a mismatched blue emoji.
- **v120** — Replaced emoji paw icon in title/Report tab with a crisp SVG for consistent cross-device rendering.
- **v119** — Profile avatar circle now matches the active app theme color.
- **v118** — Fixed Area Safety scale bar showing green instead of orange for "Elevated Risk".
- **v117** — 7-day forecast accuracy improved for US locations (full hour-by-hour data).
- **v116** — Fixed the Violet theme — picker swatch and applied accent color both corrected.
- **v115** — Location fixes fall back to network-based positioning if GPS is slow indoors.
- **v114** — Fixed a bug asking for location again even after permission was already granted.
- **v113** — Fixed the Violet theme showing teal instead of purple.
- **v112** — Fixed an invisible "Today" tab (broken CSS colors) and a sparse late-night forecast chart.
- **v111** — Fixed Best Time to Walk & Ground Temp by switching to MET Norway weather API.

---
*Maintained by the mypawreport team — mypawreport@gmail.com*
