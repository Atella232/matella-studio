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

**Sufijos del euskera en el archivo de lecciones (rama `feat/lessons-eu-suffixes`, publicado el 2026-11-03: main fb72223, bundle `index-CWC0dhqi.js`):** commit a4a19bf. 6 textos de `lessons.tsx`: «6, 4 eta 3rekiko» → «6, 4 eta 3 zenbakiekiko» (y «2rekiko»), «$\frac{1}{4}$-rekiko» → «$\frac{1}{4}$ zatikiekiko», «% 100etik gorakoak» → «% 100 baino handiagoak», «200en % 115» → «200 zenbakiaren % 115», «% 8an hartu» → «% 8 interesarekin hartu». Se quedan «€-ko» y «€-an»: el sufijo va en el símbolo del euro, que se lee siempre igual. Solo cambia el euskera; las fórmulas son las mismas en los cuatro idiomas. Lo vigila `tests/lessons-basque-suffixes.test.ts` (ver `teoria-dbh2.md`, «Pendiente»).

**Definiciones, explicación corta y «Otro ejemplo» (mejoras 3 y 4 de la teoría, rama `feat/teoria-ejemplos`, **publicado el 2026-11-03**: main 0470827, bundle `index-BU-MwfSc.js`):** commit 2b63898. Lo que cuenta cada lección (definiciones, explicación de 50 palabras como mucho, casos y el ejemplo con enunciado, números propios y respuesta) está en `lessonTexts.ts` (`proportionLessonTexts`); `lessons.tsx` ya no tiene `explanation` ni `example`. La explicación conserva los ejemplos que dibujan sus figuras (albañiles, pienso, 180 entre 2, 5 y 8, apartamento); los que iban en medio de la explicación (aspersores, falda, chaqueta, 8000 € al 5 %) son ahora «Otro ejemplo». Reglas y test en `docs/claude-notes/teoria-dbh2.md`.

**Vocabulario en 4 idiomas y «¿Por qué funciona?» (mejoras 8 y 9 de la teoría, rama `feat/teoria-porque-vocabulario`, **publicado el 2026-11-03**: main a9e1ca7, bundle `index-DK3RAImw.js`):** commit 5f7f7de. Cada lección lleva en `lessonTexts.ts` su `vocabulary` (2–5 palabras que la lección usa en cada idioma, sin repetir las definiciones). «¿Por qué funciona?» (`why`, cerrado hasta que se abre) en proportion-review (productos cruzados: las dos razones con denominador b·d), direct-share (2 + 5 + 8 = 15 partes iguales), index (subir un 12 % es quedarse con el 100 % y añadir el 12 %: ·1,12) e interest (el interés de cada año es el mismo, por eso ·t). Porcentajes con espacio no separable como el resto de la unidad («% 12», «12 %»). En Compuesta el árabe dice «الكسر», no «خارج القسمة»: el vocabulario usa «magnitud» y «relación directa».
