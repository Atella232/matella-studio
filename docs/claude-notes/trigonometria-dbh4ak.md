---
name: trigonometria-dbh4ak
description: "Seventh 4. DBH akademikoak unit (Trigonometría): sources, structure, ids, sen/sin/tan naming, phase progress"
---

Started 2026-10-12 when the owner said «continua» after deploying [[areak-dbh4ak]]. Course topic `trigonometria` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-trigonometria`, storagePrefix `matella-trigonometria-dbh4ak`, page `TrigonometriaDbh4AkIntroPage`, branch `feat/trigonometria-dbh4ak`.

Sources: Anaya Ac. U7 (solucionario with text layer, scratchpad ak7.txt) + Santillana Ac. U7 (scanned, rendered to scratchpad sk7/). The scratchpad is wiped between sessions: pdftext.swift / render.swift are tiny PDFKit scripts, rewrite them if needed. Books live in iCloud Obsidian `WIKI/raw/Klase/Matematika/LIBROS/4_ESO/{Anaya,Santillana}/Academicas/`.

Stages ratios/identities/solving/problems/circle; 15 topics: right-ratios, ratio-properties, notable-angles, fundamental, one-ratio, calculator, two-sides, side-angle, elevation, double-observation, oblique, trig-area, unit-circle, reduction, radians. All 14 figures new (figures.tsx). Naming: `text.ts` say/same turn `\sen`/`\tg` into es sen/tg, eu sin/tg, ar sin/tan (figures use trig()). Answers `answers.ts` readTrigonometryAnswer (figurak reader + drops «rad»), inputMode text (negatives). Stage chip is nowrap: long stage titles overflow at 375 px (shortened «Triángulos rectángulos»). Tests can't import .tsx: the content test reads lessons.tsx source and renders its formulas.

Phase 1 DONE c0a75b4 (diag 5501–5508, practice 1–20, challenges 101–115, bank 1–50; tests/trigonometria-dbh4ak-content.test.ts). Lab DONE dd52e71 (ids 710xx–719xx), games DONE 4dcec6a. Merged to main and deployed. Next unit: [[bektoreak-dbh4ak]].

## Own games (2026-11-02)

The unit circle (72301–3), the other ratios (72401–3) and a trigonometry detective (72501–3; lines use \sen and \tg with `localize`). Details in `dbh4-own-games.md`.
Deployed on matella.net 2026-11-02 (main 885c2ac, bundle index-BQ8PGQN9.js).

**Sufijos del euskera en el archivo de lecciones (2026-11-03, rama `feat/lessons-eu-suffixes`, commit 817ad3c, publicado el 2026-11-03: main fb72223, bundle `index-CWC0dhqi.js`):** 12 textos de `lessons.tsx` (17 sufijos): «1eko / 2ko aldeko» → «1 / 2 aldeko», «$\sqrt{2}$-ko hipotenusarekin» → «$\sqrt{2}$ luzerako hipotenusarekin», «12ko aurkako katetoa eta 5eko ondokoa» → «aurkako katetoa 12 eta ondokoa 5», «60z» → «60 zenbakiaz», «$\frac{\pi}{180}$-z» → «… zatikiaz». Solo cambia el euskera; las fórmulas son las mismas en los cuatro idiomas. Lo vigila `tests/lessons-basque-suffixes.test.ts`, que ahora mira el archivo de lecciones de todas las unidades.


**Teoría con las mejoras de 2. DBH (2026-11-04, rama `claude/teoria-dbh4ak-d45b04`, commit f8bce45, sin publicar):** `lessonTexts.ts` y `lessonChecks.ts` en las 15 lecciones. Los archivos nuevos escriben `\sin` y `\tan` en los cuatro idiomas (así los tests comparan las mismas fórmulas) y `localizeNames` de `text.ts` los cambia al mezclarlos en `lessons.tsx` (sen y tg en castellano, tg en euskera). `tests/trigonometria-dbh4ak-content.test.ts` dibuja también las fórmulas nuevas y prueba `localizeNames`. Detalles en `teoria-dbh4ak.md`.
