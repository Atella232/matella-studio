---
name: trigonometria-dbh4ak
description: "Seventh 4. DBH akademikoak unit (Trigonometría): sources, structure, ids, sen/sin/tan naming, phase progress"
---

Started 2026-10-12 when the owner said «continua» after deploying [[areak-dbh4ak]]. Course topic `trigonometria` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-trigonometria`, storagePrefix `matella-trigonometria-dbh4ak`, page `TrigonometriaDbh4AkIntroPage`, branch `feat/trigonometria-dbh4ak`.

Sources: Anaya Ac. U7 (solucionario with text layer, scratchpad ak7.txt) + Santillana Ac. U7 (scanned, rendered to scratchpad sk7/). The scratchpad is wiped between sessions: pdftext.swift / render.swift are tiny PDFKit scripts, rewrite them if needed. Books live in iCloud Obsidian `WIKI/raw/Klase/Matematika/LIBROS/4_ESO/{Anaya,Santillana}/Academicas/`.

Stages ratios/identities/solving/problems/circle; 15 topics: right-ratios, ratio-properties, notable-angles, fundamental, one-ratio, calculator, two-sides, side-angle, elevation, double-observation, oblique, trig-area, unit-circle, reduction, radians. All 14 figures new (figures.tsx). Naming: `text.ts` say/same turn `\sen`/`\tg` into es sen/tg, eu sin/tg, ar sin/tan (figures use trig()). Answers `answers.ts` readTrigonometryAnswer (figurak reader + drops «rad»), inputMode text (negatives). Stage chip is nowrap: long stage titles overflow at 375 px (shortened «Triángulos rectángulos»). Tests can't import .tsx: the content test reads lessons.tsx source and renders its formulas.

Phase 1 DONE c0a75b4 (diag 5501–5508, practice 1–20, challenges 101–115, bank 1–50; tests/trigonometria-dbh4ak-content.test.ts). Lab DONE dd52e71 (ids 710xx–719xx), games DONE 4dcec6a. Merged to main and deployed. Next unit: [[bektoreak-dbh4ak]].
