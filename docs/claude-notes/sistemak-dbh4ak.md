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
