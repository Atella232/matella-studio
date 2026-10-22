---
name: funtzioak-dbh4ak
description: 9th 4. DBH akademikoak unit (Funciones): deployed 2026-10-18; ids, reuse, Arabic SVG gotchas; next unit
---

Started 2026-10-18 when the owner said «Sí, empieza Funciones de 4. DBH akademikoak con el patrón de 4 fases». Course topic `funciones` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-funtzioak`, storagePrefix `matella-funtzioak-dbh4ak`, page `FuntzioakDbh4AkIntroPage`, branch `feat/funciones-dbh4ak`. Sources: Anaya Ac. U4 «Funciones. Características» + Santillana Ac. U9 «Funciones» (text layers extracted with a PDFKit swift script to scratchpad a4.txt / s9.txt).

Stages concept/domain/continuity/features/change; topics what-is, images, range-graph, rational-domain, radical-domain, mixed-domain, discontinuities, piecewise, piecewise-continuity, intercepts, sign, symmetry, monotony, rate, periodic. Reuses 2. DBH FunctionTest/Formula figures and 4. DBH aplikatuak DomainGraph/Continuity/Extrema/Rate/Periodic figures + `sampled` from its functions.ts; 8 new figures. Answers `readFunctionsAnswer` (drops a leading «x =», «k =», «f(…) =»).

Phase 1+2 DONE 07dfeee (diag 5701–5708, practice 1–20, challenges 101–115, bank 1–50; tests/funtzioak-dbh4ak-content.test.ts). Phase 3 lab DONE 5dd0799 (10 tools: 2. DBH relation/table + aplikatuak domain/explorer/rate/periodic with their ids, new domains builder 751xx, join k 752xx, cubic roots 753xx, parity 754xx). Phase 4 games DONE d761d8a (race 76101–76105, all new generators with `meta` recomputed by the test; every circuit needs at least one writable question for the pit stop; memory 76201–76203: domains, images, T.V.M., cards without «y =»/«f(x) =» to stay under ~90 px). Full suite 713/713, build OK. Merged to main (fast-forward), pushed and deployed 2026-10-18 (bundle index-CZZ0PnRY). Next 4. DBH akademikoak unit: funciones-polinomicas-racionales (Santillana Ac. U10 + Anaya Ac. U5/U9).

Gotchas: in SVG, never put an Arabic word inside an F (ltr) formula, and Label only isolates formula runs without ≥/≠ — write those lines as pure formulas. Step `math` over ~30 chars overflows at 375 px: split into more steps.
