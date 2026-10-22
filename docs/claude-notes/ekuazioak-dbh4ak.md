---
name: ekuazioak-dbh4ak
description: "Fourth 4. DBH akademikoak unit (Ecuaciones e inecuaciones): sources, structure, ids, phase progress"
---

Started 2026-10-12 when the owner said «sigue con ecuaciones e inecuaciones» (after [[polinomioak-dbh4ak]]). Course topic `ecuaciones-inecuaciones` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-ekuazioak`, storagePrefix `matella-ekuazioak-dbh4ak`, page `EkuazioakDbh4AkIntroPage`, branch `feat/ekuazioak-dbh4ak`.

Sources: Santillana 4.º Académicas U4 (scanned solucionario, rendered to scratchpad sk4/) + Anaya Académicas U3 «Ecuaciones, inecuaciones y sistemas» (scratchpad ak3.txt). The systems part of Anaya U3 belongs to the next course topic `sistemas` (Santillana Ac. U5).

Stages quadratic/other/exponential/inequalities/quadratic-inequalities; topics quadratic-formula, roots-relations, quadratic-problems, biquadratic, factored, rational, radical, exponential, logarithmic, inequalities, linear-inequality, inequality-problems, quadratic-inequality, graphic-inequality, inequality-systems. Reuses 4. DBH aplikatuak QuadraticFormula/Factored/Radical and 2. DBH ProblemSteps figures + 11 new figures (own NumberLine/Stretch helpers for intervals). The content test lists every equation with its solutions and false solutions, and every inequality with values inside/outside, and checks them (and that each appears in content or lessons). Equations with x on both sides are NOT identities, so the polynomials-unit identity checker is not used here.

Phase 1 DONE ce51823 (diag 5201–5208, practice 1–20, challenges 101–115, bank 1–50).
Lab DONE d120ea6: 10 tools; reused 2. DBH QuadraticTool + 4. DBH aplikatuak RadicalTool; new roots 651xx, biquadratic 652xx, exponential 653xx, linear 654xx, tariffs 655xx, sign 656xx, graphic 657xx, system 658xx. labTools.ts has a generic Span/intersect/setLatex for unions of intervals (reuse for later units). Lab observe text is plain (no $…$); readouts must stay short (~429 px at 1024 wide): long steps go to the note. Known: the reused 2. DBH quadratic Δ readout overflows by ~13 px at a=−3,b=−10,c=−12 (left as is, shared).
Games DONE 12332da: race 66101–66105 (21 kinds; probe kind is writable: false), memory 66201–66203 (sum-product, linear, quadratic). Memory cards: S/P stacked with \begin{array}{c}; inequalities use a tight() helper wrapping signs and relations in braces ({+}, {<}) to fit the 102 px phone card (max 97 px measured).
DEPLOYED 2026-10-12 (main 12332da, bundle index-DLz3HLPh). Next unit only when asked: course topic `sistemas` (Santillana Ac. U5 + Anaya U3 systems part).
