---
name: errealak-ehunekoak-dbh4ak
description: "First 4. DBH akademikoak unit (Números reales y porcentajes) complete on branch feat/dbh4-akademikoak-1, not deployed"
---

Zenbaki errealak eta ehunekoak (`/matematika/dbh4-akademikoak/numeros-reales`, folder `src/pages/dbh4-akademikoak-errealak/`), built 2026-10-02 following Santillana 4.º Académicas unit 1 (solutions book, scanned). Anaya Académicas U1 also covers radicals/logs, but those belong to the course's unit 2 (Potencias, radicales y logaritmos), so they were left out.

Five stages: rational, reals, approx (intervals + approximations), percent, interest; 18 lessons. Reuses a lot of the applied unit ([[zenbaki-errealak-dbh4ap]]): reals.ts, the real line, 6 figures, 5 lab tools, race questions (exported), PlaceGameView, memory generatrix board. Own: percent.ts, 12 figures, Pythagoras / chained-percent / interest lab tools (ids 409xx–411xx), games (ids 421xx–423xx).

Status: merged into main (fast-forward, up to 832b160) and deployed to matella.net on 2026-10-02.

Gotcha learnt: Chrome ignores LRI/PDI isolates inside SVG text, so in Arabic figure labels keep formulas in their own <text>, never mixed with Arabic words. Basque suffixes after generated numbers (% 5ean, 1200en) depend on pronunciation: phrase generated prompts without suffixes.

## Own games (2026-11-02)

Build the interval and the reals detective, shared with the other track: see [dbh4-own-games](dbh4-own-games.md).

## Own games (2026-11-02)

Chained percentages (42601–3) added, so the unit has two own mechanics (intervals, chain) besides the reals detective. Details in `dbh4-own-games.md`.
Deployed on matella.net 2026-11-02 (main 885c2ac, bundle index-BQ8PGQN9.js).

**Sufijos del euskera en el archivo de lecciones (2026-11-03, rama `feat/lessons-eu-suffixes`, commit 817ad3c, publicado el 2026-11-03: main fb72223, bundle `index-CWC0dhqi.js`):** 15 textos de `lessons.tsx` (20 sufijos): «% 3an» → «% 3 interesarekin», «% 20ko deskontua egin diote» → «% 20 deskontatu diote», «1575en % 115aren % 12» → «1575 zenbakiaren % 115, eta emaitzaren % 12», «$\frac{p}{100}$-z» → «$\frac{p}{100}$ zatikiaz», «−1etik 3ra» → «−1 eta 3 artean». Visto de paso, sin tocar (ya pasaba en matella.net): a 375 px la lección `interval-ops` ensancha la página a 405 px; lo que se sale es la capa MathML oculta de KaTeX de una fórmula larga. Solo cambia el euskera; las fórmulas son las mismas en los cuatro idiomas. Lo vigila `tests/lessons-basque-suffixes.test.ts`, que ahora mira el archivo de lecciones de todas las unidades.


**Teoría con las mejoras de 2. DBH (2026-11-04/05, rama `claude/teoria-dbh4ak-d45b04`, commits 8ba159a y cdc2682, sin publicar):** textos en `lessonTexts.ts` (explicación de 60 palabras como mucho, «Otro ejemplo» con números propios, 2–5 palabras, 4 «¿Por qué funciona?»: tipos de decimal, generatriz con $100x-x$, $\sqrt{2}$ irracional, porcentajes encadenados) y `lessonChecks.ts` (error típico y «Compruébalo» en las 18 lecciones); 12 enlaces «Antes de empezar» a 3. DBH; 3 dibujos tras los pasos. Arreglos: Unión e intersección tenía $A=(-5,\,3]$ y su dibujo $[-5,\,3]$ (ahora $[-5,\,3]$, unión $[-5,\,+\infty)$) y su «Vamos a resolver» era una sola fórmula que ensanchaba la página a 402 px; los pasos de Error absoluto y relativo, en dos filas; el título inglés de la etapa 2 acababa en punto. Detalles en `teoria-dbh4ak.md`.
