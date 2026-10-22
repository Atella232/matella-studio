---
name: aljebra-dbh2
description: Aljebra 2. DBH V2 unit (started 2026-09-28) — sources, scope, ids and phase progress
---

Owner chose (2026-09-28) to continue with 2. DBH: Aljebra first, then Ekuazioak (the last two legacy DBH2 units). Branch `feat/aljebra-dbh2` from main 359d773; folder `src/pages/dbh2-aljebra-v2`, route `matematika/dbh2/algebra/*`, storagePrefix `matella-aljebra-dbh2`.

Sources: `LIBROS/2_ESO/Santillana/Unidad_05_Expresiones_Algebraicas.pdf` (solutions manual only) and `LIBROS/2_ESO/Anaya/Unidad_06_Algebra.pdf`; text extracted to scratchpad s25.txt / a26.txt with txt.swift. Basque terms: gai, gai askea, maila, monomio antzekoak/aurkakoak, biderkadura nabarmenak, faktore komuna ateratzea.

Phases: ALL DONE on branch — 1) 15 lessons [5348939]; 2) content 8/20/12/30 [4fc9460]; 3) lab 5 tools ids 261xx–265xx, DBH1 MachineTool/TilesTool now take expressions/limits/initial/challenges props [1f3a4f1]; 4) games race/expand/memory ids 271xx–273xx [see git log]. Legacy dbh2-algebra deleted, its 4 CSS moved to src/styles/legacy-unit/Algebra*.css for Ekuazioak. Merged to main (fast-forward e518146), pushed and deployed to matella.net on 2026-09-28 at the owner's request. Next: Ekuazioak (last legacy DBH2 unit).

**Why:** resume after interruptions. **How to apply:** see [[remaining-dbh1-units]] for the same 4-phase pattern.
