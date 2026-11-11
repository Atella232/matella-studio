---
name: sistemak-dbh4ak
description: "Fifth 4. DBH akademikoak unit (Sistemas de ecuaciones): sources, structure, ids, phase progress"
---

Started 2026-10-12 when the owner said «siguiente» after deploying [[ekuazioak-dbh4ak]]. Course topic `sistemas` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-sistemak`, storagePrefix `matella-sistemak-dbh4ak`, page `SistemakDbh4AkIntroPage`, branch `feat/sistemak-dbh4ak`.

Sources: Santillana 4.º Académicas U5 «Sistemas de ecuaciones e inecuaciones» (scanned solucionario, rendered to scratchpad sk5/) + systems part of Anaya Ac. U3 (scratchpad ak3.txt from line 1098). Santillana U5 also covers inequalities in TWO unknowns (half-planes, regions), which the unit includes.

Stages linear/methods/nonlinear/half-planes/problems; 15 topics: linear-equations, graphic, classify, substitution, equalization, reduction, simplify-first, line-curve, squares, check-solutions, half-plane, region, linear-problems, nonlinear-problems, region-problems. Reuses 4. DBH aplikatuak LinearSolutions/SystemTypes/Substitution/Equalization/Reduction/SystemProblem figures + 9 new. `systems.ts` has classify, solveLinear (Cramer), clipPolygon/region (half-plane clipping for shading) and latticePoints — reuse in lab/games.

Phase 1 DONE 78c0648 (diag 5301–5308, practice 1–20, challenges 101–115, bank 1–50).
Shared fix 871a397 (owner asked): under 760 px lesson step formulas span the whole card (UnitPage.css); all 35 V2 units fit at 375 px. Ships with this unit's deploy.
Lab DONE 4741542: reused aplikatuak PlaneTool (472xx) + ReductionTool (473xx); new classify 671xx, substitution 672xx, circle 673xx, squares 674xx, half-plane 675xx, region 676xx, mixture 677xx, shopping 678xx (SystemsTools.tsx). Known: reused PlaneTool's point label overlaps axis numbers near the axes; in Arabic the Plane 'y' bbox pokes 1 px above (font ascent) — both harmless.
Games DONE 45468d6: race 68101–68105 (21 kinds, linear-system kinds carry meta a1..c2 + ask for a Cramer check), memory 68201–68203 (linear, nonlinear, region). Memory cards: equations stacked with \begin{array}{c} and tight() braces; at most 7 symbols per row (no leading minus) to fit the 102 px phone card (max 98 measured).
DEPLOYED 2026-10-12 (main 45468d6, bundle index-CgDsm_eM), with the phone-steps fix. Next unit only when asked: `areas-volumenes-semejanza` (Santillana Ac. U6).

## Own games (2026-11-02)

The crossing point, touch the solution and the systems detective: see [dbh4-own-games](dbh4-own-games.md).


**Teoría con las mejoras de 2. DBH (2026-11-04, rama `claude/teoria-dbh4ak-d45b04`, commits b8a084b y 3396946, sin publicar):** `lessonTexts.ts` y `lessonChecks.ts` en las 15 lecciones; 16 enlaces; 3 «¿Por qué funciona?» (punto de corte, sumar igualdades, un punto de prueba basta). `tests/sistemak-dbh4ak-content.test.ts` lee ahora los tres archivos y comprueba 14 sistemas y 2 semiplanos nuevos. Un paso de «Recta y curva», en dos filas. Detalles en `teoria-dbh4ak.md`.


**Texto árabe de los dibujos SVG del laboratorio y los juegos (rama `feat/arabic-svg-labs-games`, 2026-11-11, sin publicar):** `lab/SystemsTools.tsx`: nombres de las cosas y unidades del escenario. Antes iba en un `<text>` suelto dentro de `direction: ltr` y la frase árabe salía de izquierda a derecha. Ahora pasa por `Label` (`dbh2-funtzioak-v2/plane.tsx`) con los mismos atributos; eu, es y en no cambian. Detalle del método en `funtzioak-dbh2.md` (sección «feat/arabic-svg-labels») y en la sección del mismo nombre de esa nota.
