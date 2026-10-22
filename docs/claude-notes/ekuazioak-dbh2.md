---
name: ekuazioak-dbh2
description: Ekuazioak 2. DBH V2 unit (started 2026-09-28) — sources, scope, ids, phase progress; owner pre-authorised publishing
---

Owner asked (2026-09-28): "continua con ecuaciones 2 eso y publicala" — publishing (merge to main + deploy) is authorised once done. Branch `feat/ekuazioak-dbh2` from main e518146; folder `src/pages/dbh2-ekuazioak-v2`, route `matematika/dbh2/ekuazioak/*`, storagePrefix `matella-ekuazioak-dbh2`.

Sources: `LIBROS/2_ESO/Santillana/Unidad_06_Ecuaciones.pdf` (solutions manual) and `Anaya/Unidad_07_Ecuaciones.pdf` (scratchpad s26.txt / a27.txt). Basque terms as DBH1: atalak, gaiak, ezezaguna, ebazpena, askatu x, ekuazio baliokideak, izendatzaileak, MKT, ekuazio osatugabeak, formula orokorra, diskriminatzailea.

Phases: ALL DONE — 1) 14 lessons [03c421e]; legacy dbh2-ekuazioak, dbh2-ekuazioak-prototype (route redirects) and src/styles/legacy-unit deleted; 2) content 8/20/12/30 [49d6e25]; 3) lab 5 tools ids 281xx–285xx [6ca124a]; 4) games race/solve/memory ids 291xx–293xx [063004c]. Merged to main (fast-forward 063004c), pushed and deployed 2026-09-30. Deployed from a clean git worktree of main because the working tree held another session's uncommitted Funciones DBH2 work (src/pages/dbh2-funtzioak-v2 + router/paths/courses edits) — never commit or deploy that without its owner.

**Why:** resume after interruptions. **How to apply:** same 4-phase pattern as [[aljebra-dbh2]].
