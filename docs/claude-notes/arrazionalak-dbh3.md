---
name: arrazionalak-dbh3
description: "First 3. DBH unit (Números racionales) deployed 2026-10-02; reuse map"
---

Zenbaki arrazionalak (`/matematika/dbh3/numeros-racionales`, folder `src/pages/dbh3-arrazionalak/`), built 2026-10-02 from Santillana 3.º ESO unit 1 (the class textbook; text layer is broken, render pages to JPG). 15 lessons, stages fractions / order / operations / decimals / problems.

Heavy reuse: 2. DBH zatikiak-prototype figures, lab tools (with 3.º challenges 311xx–315xx) and race circuits 0–4 one tier up; 4. DBH applied figures, decimals/generatrix tools, race questions, PlaceGameView (2 levels, custom art). New: hierarchy lab tool (order of operations, lab/hierarchy.ts, ids 316xx), problems race circuit, memory boards; games ids 331xx–333xx.

Status: merged and deployed 2026-10-02 (race circuit 0 rerolls 20 % of level-2 questions until one has a negative option: ~34 % at tiers 1–2, ~23 % overall; user asked ≥15 %). Goal remains: first unit of every course ([[zenbaki-errealak-dbh4ap]], [[errealak-ehunekoak-dbh4ak]]); next would be Bachillerato.

## Lab and games of its own (2026-11-01, branch `feat/arrazionalak-dbh3-plus`)

The owner asked to bring this unit up to the level of the other 3. DBH units (it had only the hierarchy tool and no game of its own) and chose all four tools and three games.

- Lab (commit 2e40cba), `lab/RationalTools.tsx` + pure logic, prediction before the result and ▶ in each; shared pieces from `dbh3-segidak/lab/LabParts.tsx`:
  - L1 `magnifier.ts` — la lupa en la recta (topic `between`), ids 31701–31705 + endless. Common denominator × k; prediction: none / one / more than one in between.
  - L2 `remaining.ts` — lo que queda (topic `remaining`), ids 31801–31805. Columns × rows grid; the note shows the mistake 1 − a/b − c/d.
  - L3 `machine.ts` — la máquina de la generatriz (topic `periodic-generatrix`), ids 31901–31905. Strips 10ᵐx and 10ⁿx (n = −1: nothing subtracted); tails compared over 12 digits; prediction = kind of decimal (exact / pure / mixed). The borrowed 4. DBH generatrix tool now opens from `exact-generatrix`.
  - L4 `whole.ts` — del trozo al todo (topic `whole-from-part`), ids 33701–33705. Prediction: whole less than / exactly / more than double the part.
- Games: `jug` (Llena la jarra, levels 33501–33503, negatives in level 3), `period` (Caza el periodo, 33601–33603, CSS fall animation, level 3 = unsimplified fractions), `detective` (12 errors, 33401–33403). Hub order: race, jug, period, detective, place, memory.
- Tricks: the Basque check in tests must not include `n` after `$` (it matched `$n=0$`). Arabic Segmented labels with "…" need LRI/PDI or the dots jump to the left. Game art has no decimal commas: fractions only. Jug cards use `\dfrac` so they are readable.

Deployed 2026-11-01 (main 19c1f38, bundle index-Bn7PqFNZ.js); checked live at 375 px in eu, es and ar: new lab tools and games load, no overflow, no console errors.

**Sufijos del euskera en el archivo de lecciones (2026-11-03, rama `feat/lessons-eu-suffixes`, commit 817ad3c, publicado el 2026-11-03: main fb72223, bundle `index-CWC0dhqi.js`):** 12 textos de `lessons.tsx` (15 sufijos): «Sinplifikatu 3z / 125ez» → «… 3 zenbakiaz / 125 zenbakiaz», «9ak periodoarentzat, 0ak…» → «9 zifrak…, 0 zifrak…», «0ren ezkerrean» → «0 puntuaren ezkerrean», «$\frac{2}{3}$-ren» → «$\frac{2}{3}$ zatikiaren». Solo cambia el euskera; las fórmulas son las mismas en los cuatro idiomas. Lo vigila `tests/lessons-basque-suffixes.test.ts`, que ahora mira el archivo de lecciones de todas las unidades.

**Teoría con las mejoras de 2. DBH (2026-11-04/05, rama `claude/teoria-dbh3-46f5a5`, commit 4c8e6d75, más b5b0dde2 para las fórmulas a 375 px; sin publicar):** las 15 lecciones tienen sus textos en `lessonTexts.ts` (`rationalsLessonTexts`) y su error típico y «Compruébalo» en `lessonChecks.ts` (`rationalsLessonChecks`, ids `RationalsTopicId`); explicación de 50 palabras como mucho, «Otro ejemplo» con números propios y vocabulario en 4 idiomas. Errores típicos nuevos en las 15 (la unidad no tenía ninguno). «¿Por qué funciona?» en equivalent, mul-div, decimal-kinds y periodic-generatrix. «Antes de empezar, repasa…» (8): rational-meaning → 2. Enteros › integer-set; simplify → 2. Divisibilidad › gcd; compare y add-sub → 2. Divisibilidad › lcm; line → 2. Fracciones › representation; mul-div → 2. Enteros › multiply-divide; combined → 2. Enteros › combined; decimal-kinds → 2. Divisibilidad › factorization. A 375 px se partieron 5 fórmulas en filas (ejemplos de rational-meaning y compare, paso de compare y de remaining, «¿Por qué?» de periodic-generatrix). Revisado a 375 px en eu, es y ar (pasos abiertos, «¿Por qué?» abiertos, todas las palabras abiertas): nada se sale, sin errores de KaTeX, fórmulas en 17 px o más. Resumen de todo el curso en `teoria-dbh3.md`.
