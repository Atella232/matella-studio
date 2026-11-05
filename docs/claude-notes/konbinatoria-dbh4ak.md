---
name: konbinatoria-dbh4ak
description: "13th 4. DBH akademikoak unit (Combinatoria): folder, ids, phase progress; deployed 2026-10-21"
---

Started 2026-10-21 when the owner said «adelante» after [[estatistika-dbh4ak]] was deployed. Course topic `combinatoria` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-konbinatoria`, storagePrefix `matella-konbinatoria-dbh4ak`, page `KonbinatoriaDbh4AkIntroPage`, branch `feat/combinatoria-dbh4ak`. Sources: Santillana Ac. U13 (scanned, rendered to scratchpad s13/) + Anaya Ac. U11 (a11.txt). Scratchpad helper scripts disappear between sessions: recreate tools/pdftext.swift and render.swift; a contact sheet of figure PNGs with Pillow (run python without -I so Pillow loads).

Stages counting/variations/permutations/combinations/problems; topics tree, product, factorial, with-repetition, variations, conditions (no leading 0), permutations, restricted (blocks), repeated (n!/a!b!), combinations, binomial (symmetry), pascal, which-model, geometry (grid paths, lines, diagonals), committees. Notation V_{n,k}, VR_{n,k}, P_n, C_{n,k} and \binom in every language. 15 new figures, no reuse. Answers are whole numbers via `answers.ts` readCountAnswer (drops spaces, thin and no-break spaces, then readStatisticsAnswer); big counts written 40\,320 in LaTeX.

Phase 1 ada0c84 (diag 6201–6208, practice 1–20, challenges 101–115, bank 1–50). Lab f41cf66: 7 new tools (tree 831xx, factorial 833xx, slots V/VR 832xx, letters 834xx, choose 835xx, pascal 836xx, grid 837xx). Games baa330d (race 84101–84105, memory 84201–84203). Full suite 784/784, lint and build OK. Merged to main (fast-forward baa330d), pushed and deployed 2026-10-21 (bundle index-g87kmqP8).

Next 4. DBH akademikoak unit: probabilidad (Santillana Ac. U14 + Anaya Ac. U12), the last one.

## Own games (2026-11-02)

Does order matter? (84301–3), the box method (84401–3) and a combinatorics detective (84501–3). Details in `dbh4-own-games.md`.
Deployed on matella.net 2026-11-02 (main 885c2ac, bundle index-BQ8PGQN9.js).

**Sufijos del euskera en el archivo de lecciones (2026-11-03, rama `feat/lessons-eu-suffixes`, commit 817ad3c, publicado el 2026-11-03: main fb72223, bundle `index-CWC0dhqi.js`):** 9 textos de `lessons.tsx` (11 sufijos): «Mutilak: 5etik 2» → «Mutilak: 5 mutiletatik 2», «Neskak: 4tik 3» → «Neskak: 4 nesketatik 3», «$n$etatik» → «$n$ elementutatik», «$n-1$ak» → «$n-1$ elementuak», «3ko nahasketak» → «3 koloreko nahasketak». Solo cambia el euskera; las fórmulas son las mismas en los cuatro idiomas. Lo vigila `tests/lessons-basque-suffixes.test.ts`, que ahora mira el archivo de lecciones de todas las unidades.


**Teoría con las mejoras de 2. DBH (2026-11-05, rama `claude/teoria-dbh4ak-d45b04`, commit 2850b12, sin publicar):** `lessonTexts.ts` y `lessonChecks.ts` en las 15 lecciones; 4 enlaces (3. DBH Estadística y Geometría plana; Potencias y Polinomios de 4.º); 3 «¿Por qué funciona?» (dividir entre $k!$, la regla del triángulo, «al menos una» con el contrario); 10 dibujos tras los pasos. La notación V, VR, P y C es la misma en los cuatro idiomas. La respuesta buena de «Compruébalo» cambia de sitio (el test lo pide). Detalles en `teoria-dbh4ak.md`.
