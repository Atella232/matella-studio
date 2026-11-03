---
name: aljebra-dbh2
description: Aljebra 2. DBH V2 unit (started 2026-09-28) — sources, scope, ids and phase progress
---

Owner chose (2026-09-28) to continue with 2. DBH: Aljebra first, then Ekuazioak (the last two legacy DBH2 units). Branch `feat/aljebra-dbh2` from main 359d773; folder `src/pages/dbh2-aljebra-v2`, route `matematika/dbh2/algebra/*`, storagePrefix `matella-aljebra-dbh2`.

Sources: `LIBROS/2_ESO/Santillana/Unidad_05_Expresiones_Algebraicas.pdf` (solutions manual only) and `LIBROS/2_ESO/Anaya/Unidad_06_Algebra.pdf`; text extracted to scratchpad s25.txt / a26.txt with txt.swift. Basque terms: gai, gai askea, maila, monomio antzekoak/aurkakoak, biderkadura nabarmenak, faktore komuna ateratzea.

Phases: ALL DONE on branch — 1) 15 lessons [5348939]; 2) content 8/20/12/30 [4fc9460]; 3) lab 5 tools ids 261xx–265xx, DBH1 MachineTool/TilesTool now take expressions/limits/initial/challenges props [1f3a4f1]; 4) games race/expand/memory ids 271xx–273xx [see git log]. Legacy dbh2-algebra deleted, its 4 CSS moved to src/styles/legacy-unit/Algebra*.css for Ekuazioak. Merged to main (fast-forward e518146), pushed and deployed to matella.net on 2026-09-28 at the owner's request. Next: Ekuazioak (last legacy DBH2 unit).

**Why:** resume after interruptions. **How to apply:** see [[remaining-dbh1-units]] for the same 4-phase pattern.

## Own games (2026-11-02)

Branch `feat/aljebra-dbh2-games`. Two more games of this topic, besides the quick expansion:
- `pyramid` (`games/pyramid.ts`), 27401–27403: the pyramid of monomials. Six bricks, three empty, six cards (three right, three typical mistakes: exponents added when adding, coefficients added when multiplying, exponents multiplied, the sign lost only as a last resort). Level 1 sums (going up and down), level 2 products going up, level 3 products going down too (dividing monomials).
- `detective` (`games/detective.ts`), 27501–27503: 12 typical errors (like terms, powers, negative squared, minus before a bracket, distributive law, products of binomials, quotients, the square without 2ab, the coefficient not squared, the common factor not divided, the lost 1). Lines end on polynomials; right/reached are the polynomials at x = 2.

Shared: `RoundVerdict` now lives in `RoundGame.tsx`; `WorkedDetectiveGame` shows a long fix on two lines, split at `\ \to\ `. Trick: detective lines must stay under ~230 px at 21 px (phone); measure them in the browser with KaTeX before committing.

Deployed 2026-11-02: main fd383b3, bundle `index-NhNlFoWP.js`; checked live at 375 px in eu, es and ar (every new game opens and starts, no overflow, no console errors).

**«Error típico» y «Compruébalo» (mejoras 5 y 7 de la teoría, rama `feat/teoria-error-check`, sin publicar):** commit ab339d9. Cada lección lleva su error típico y su pregunta en `lessonChecks.ts` (`algebraLessonChecks`, sobre `AlgebraTopicId`), mezclados en `lessons.tsx`. El test comprueba las expresiones con letras dando números a las letras. Reglas, test y revisión a 375 px en `teoria-dbh2.md`.
