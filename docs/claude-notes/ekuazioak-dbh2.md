---
name: ekuazioak-dbh2
description: Ekuazioak 2. DBH V2 unit (started 2026-09-28) — sources, scope, ids, phase progress; owner pre-authorised publishing
---

Owner asked (2026-09-28): "continua con ecuaciones 2 eso y publicala" — publishing (merge to main + deploy) is authorised once done. Branch `feat/ekuazioak-dbh2` from main e518146; folder `src/pages/dbh2-ekuazioak-v2`, route `matematika/dbh2/ekuazioak/*`, storagePrefix `matella-ekuazioak-dbh2`.

Sources: `LIBROS/2_ESO/Santillana/Unidad_06_Ecuaciones.pdf` (solutions manual) and `Anaya/Unidad_07_Ecuaciones.pdf` (scratchpad s26.txt / a27.txt). Basque terms as DBH1: atalak, gaiak, ezezaguna, ebazpena, askatu x, ekuazio baliokideak, izendatzaileak, MKT, ekuazio osatugabeak, formula orokorra, diskriminatzailea.

Phases: ALL DONE — 1) 14 lessons [03c421e]; legacy dbh2-ekuazioak, dbh2-ekuazioak-prototype (route redirects) and src/styles/legacy-unit deleted; 2) content 8/20/12/30 [49d6e25]; 3) lab 5 tools ids 281xx–285xx [6ca124a]; 4) games race/solve/memory ids 291xx–293xx [063004c]. Merged to main (fast-forward 063004c), pushed and deployed 2026-09-30. Deployed from a clean git worktree of main because the working tree held another session's uncommitted Funciones DBH2 work (src/pages/dbh2-funtzioak-v2 + router/paths/courses edits) — never commit or deploy that without its owner.

**Why:** resume after interruptions. **How to apply:** same 4-phase pattern as [[aljebra-dbh2]].

## Own games (2026-11-02)

Branch `feat/ekuazioak-dbh2-games` (stacked on `feat/aljebra-dbh2-games`). Two more games of this topic, besides solve quickly:
- `pose` (`games/pose.ts`), 29401–29403: set up the equation. A problem and four equations, the wrong ones are the usual misreadings (brackets of «the double of the sum», x + 2x + 3x for consecutive numbers, half the perimeter, 90° or 360° in a triangle, area instead of perimeter...). 13 templates in three levels (numbers; ages and money; geometry); every answer a whole number. Templates reject the parameters where a wrong equation happens to hold too (x = a, a square of side 4, area = perimeter).
- `detective` (`games/detective.ts`), 29501–29503: 12 typical errors (first degree, denominators, second degree). Lines with two solutions are written `x_{1}=…,\ x_{2}=…`; `solutionsValue` turns a list into one number for right/reached.

Trick: in Arabic text, a number with ° must be isolated (`⁦…°⁩`), or the sign jumps to the other side.

Deployed 2026-11-02: main fd383b3, bundle `index-NhNlFoWP.js`; checked live at 375 px in eu, es and ar (every new game opens and starts, no overflow, no console errors).

**«Error típico» y «Compruébalo» (mejoras 5 y 7 de la teoría, rama `feat/teoria-error-check`, **publicado el 2026-11-03**: main 4bd962d, bundle `index-B-aBnto3.js`):** commit 6fd35b3. Cada lección lleva su error típico y su pregunta en `lessonChecks.ts` (`equationLessonChecks`, sobre `EquationTopicId`), mezclados en `lessons.tsx`. El test resuelve las ecuaciones de las preguntas; en f608932 las fórmulas con flecha llevan cada lado entre llaves para cortarse tras la flecha. Reglas, test y revisión a 375 px en `teoria-dbh2.md`.

**Sufijos del euskera en el archivo de lecciones (rama `feat/lessons-eu-suffixes`, sin publicar):** commit a4a19bf. 4 textos de `lessons.tsx`: «3z», «6z», «2z» → «3 zenbakiaz», «6 zenbakiaz», «2 zenbakiaz» («Biderkatu gai guztiak 6 zenbakiaz»). «2x» y «0x» son términos algebraicos y se quedan. Solo cambia el euskera; las fórmulas son las mismas en los cuatro idiomas. Lo vigila `tests/lessons-basque-suffixes.test.ts` (ver `teoria-dbh2.md`, «Pendiente»).

**Definiciones, explicación corta y «Otro ejemplo» (mejoras 3 y 4 de la teoría, rama `feat/teoria-ejemplos`, **publicado el 2026-11-03**: main 0470827, bundle `index-BU-MwfSc.js`):** commit 020f085. Lo que cuenta cada lección (definiciones, explicación de 50 palabras como mucho, casos y el ejemplo con enunciado, números propios y respuesta) está en `lessonTexts.ts` (`equationLessonTexts`); `lessons.tsx` ya no tiene `explanation` ni `example`. Incompletas y Fórmula general llevan sus casos como tarjetas. El test comprueba que cada «x = …» del ejemplo cumple la ecuación del enunciado. Reglas y test en `docs/claude-notes/teoria-dbh2.md`.
