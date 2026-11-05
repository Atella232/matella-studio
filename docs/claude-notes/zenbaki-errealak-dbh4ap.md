---
name: zenbaki-errealak-dbh4ap
description: "4. DBH split into aplikatuak/akademikoak; first applied unit Zenbaki errealak complete on branch, not deployed"
---

Goal (user, 2026-10-02): during the 1st evaluation, have the FIRST unit of every course available, even before finishing 1./2. DBH. 4. DBH has two maths: `dbh4-aplikatuak` (Santillana Aplicadas, 9 topics) and `dbh4-akademikoak` (Santillana Académicas, 14 topics).

Zenbaki errealak (`/matematika/dbh4-aplikatuak/numeros-reales`, folder `src/pages/dbh4-aplikatuak-errealak/`): all phases done — 17 lessons, content, lab (8 tools, 32 challenges, ids 401xx–408xx), games (race 41101–5, line placing 41201–3, memory 41301–3). Sources: Santillana Aplicadas unit 1 + Anaya Aplicadas unit 3 (radicals).

Status 2026-10-02: merged into main (fast-forward, includes fix/funtzioak-quality) and deployed to matella.net.

Shared engine changes in that branch: race/memory use `localLatex` (Arabic decimal point); `.fraction-v2 .math-text` no longer forced LTR (only `.math-token`/`.katex`), fixing Arabic sentence order in every unit.

Next (after the academic unit, see [[errealak-ehunekoak-dbh4ak]]): other courses' first units — confirm order with the user. See [[funtzioak-dbh2]], [[remaining-dbh1-units]].

## Own games (2026-11-02)

Build the interval and the reals detective, shared with the other track: see [dbh4-own-games](dbh4-own-games.md).

**Sufijos del euskera en el archivo de lecciones (2026-11-03, rama `feat/lessons-eu-suffixes`, commit 817ad3c, publicado el 2026-11-03: main fb72223, bundle `index-CWC0dhqi.js`):** 9 textos de `lessons.tsx` (10 sufijos): «zatitu 5ez eta biderkatu 2z» → «zatitu 5 zenbakiaz eta biderkatu 2 zenbakiaz», «berretzaile 0ko berretura» → «berretzailea 0 duen berretura», «5aren / 1aren ondoren» → «5 zifraren / 1 zifraren ondoren», «10en berreturak» → «10 oinarriko berreturak». Visto de paso, sin tocar (ya pasaba en matella.net): a 375 px la lección `powers` ensancha la página a 396 px; lo que se sale es la capa MathML oculta de KaTeX de una fórmula larga. Solo cambia el euskera; las fórmulas son las mismas en los cuatro idiomas. Lo vigila `tests/lessons-basque-suffixes.test.ts`, que ahora mira el archivo de lecciones de todas las unidades.

**Teoría con las mejoras de 2. DBH (2026-11-04, rama `feat/teoria-dbh4ap`, commit 74f38ac9, sin publicar):** los textos de las 17 lecciones están en `lessonTexts.ts` y el error típico y «Compruébalo» en `lessonChecks.ts` (tipo `RealsTopicId`). Hay 6 enlaces «Antes de empezar, repasa» a 3. DBH y 5 «¿Por qué funciona?»: powers, decimal-kinds, periodic-to-fraction, scientific-ops y radical-ops. Seis dibujos van tras los pasos: fraction-amount, fraction-ops, decimal-kinds, number-sets, rounding y roots. El «Vamos a resolver» de Potencias va en dos filas, porque se salía de la pantalla a 375 px. Detalle y trucos en [teoria-dbh4ap](teoria-dbh4ap.md).
