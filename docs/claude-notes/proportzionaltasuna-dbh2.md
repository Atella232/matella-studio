---
name: proportzionaltasuna-dbh2
description: "2. DBH Proporcionalidad y porcentajes (deployed 2026-10-03); 2026-11-01 four games of its own"
---

Proportzionaltasuna eta ehunekoak 2. DBH (`/matematika/dbh2/proporcionalidad`, folder `src/pages/dbh2-proportzionaltasuna-v2/`). Built 2026-10-03 (Anaya 2.º U5 + Santillana 2.º U8): stages proportions / compound / shares / percent / changes; diag 1401–1408, lab 212xx–215xx, race 22101–22105, memory 22201–22203.

## Games of its own (2026-11-01, branch `feat/proportzionaltasuna-dbh2-games`)

The unit had only the race and the memory. The owner chose four games:

- `tag` La etiqueta (`games/tag.ts`), levels 22301–22303: stickers with % changes to reach a final price; money in cents; level 2 often a +x/−x trap; level 3 three stickers with VAT +21 %.
- `kind` ¿Directa o inversa? (`games/kind.ts`), 22401–22403: 14 everyday situations and generated tables; every answer at least twice per round of 8; level 3 tables that rise or fall without being proportional.
- `work` Termina la obra (`games/work.ts`), 22501–22503: workers (and hours) to finish exactly on a deadline; level 3 accepts any pair.
- `detective` (`games/detective.ts`), 22601–22603: 12 typical errors in three levels (proportions, shares/compound, percentages).

New shared pieces, for the rest of 2. DBH: `src/features/unit-v2/games/RoundGame.tsx` (a game of a few one-try rounds: picker, dots, result; each game gives `create` and a `Round` component) and `WorkedDetectiveGame.tsx` + `workedDetective.ts` (the worked-solution detective with `createWorkedCases`). Test helpers in `tests/helpers/ownGamesCheck.ts` (`checkTexts`, `checkWorkedCases`).

Tricks: in Basque, problem numbers go in `$…$` and the words after them carry the case (`$8$ langilek`). Euro amounts in money games are written with `toFixed(2)` and the language's decimal mark, not LaTeX.

Deployed 2026-11-01: main 942edd4, bundle `index-CpeeiNuH.js`; checked live at 375 px in eu, es and ar (four games open and start, no overflow, no console errors).

**«Error típico» y «Compruébalo» (mejoras 5 y 7 de la teoría, rama `feat/teoria-error-check`, **publicado el 2026-11-03**: main 4bd962d, bundle `index-B-aBnto3.js`):** commit 1497ad1. Cada lección lleva su error típico y su pregunta en `lessonChecks.ts` (`proportionLessonChecks`, sobre `ProportionTopicId`), mezclados en `lessons.tsx`. Porcentajes en las palabras («% 12» en euskera); en f608932 las fórmulas con flecha llevan cada lado entre llaves. Reglas, test y revisión a 375 px en `teoria-dbh2.md`.

**Definiciones, explicación corta y «Otro ejemplo» (mejoras 3 y 4 de la teoría, rama `feat/teoria-ejemplos`, sin publicar):** commit 2b63898. Lo que cuenta cada lección (definiciones, explicación de 50 palabras como mucho, casos y el ejemplo con enunciado, números propios y respuesta) está en `lessonTexts.ts` (`proportionLessonTexts`); `lessons.tsx` ya no tiene `explanation` ni `example`. La explicación conserva los ejemplos que dibujan sus figuras (albañiles, pienso, 180 entre 2, 5 y 8, apartamento); los que iban en medio de la explicación (aspersores, falda, chaqueta, 8000 € al 5 %) son ahora «Otro ejemplo». Reglas y test en `docs/claude-notes/teoria-dbh2.md`.
