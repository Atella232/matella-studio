---
name: potentziak-dbh4ak
description: Second 4. DBH akademikoak unit (Potencias, radicales y logaritmos), deployed 2026-10-11; sources, ids, next unit
---

Started 2026-10-10 after the owner said «sigue con 4.º académicas» (4. DBH aplikatuak finished, see [[remaining-eso-units]]). Course topic `potencias-radicales` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-potentziak`, storagePrefix `matella-potentziak-dbh4ak`, page `PotentziakDbh4AkIntroPage`, branch `feat/potentziak-dbh4ak`.

Sources: Santillana 4.º Académicas U2 (scanned solucionario, rendered to scratchpad sk2/) + radicals/logs part of Anaya Académicas U1 (scratchpad ak1.txt, pages 7–17). Order of the course after this: polinomios-fracciones (Santillana Ac. U3 + Anaya Ac. U2).

Stages powers/radicals/operations/rationalize/logarithms; topics integer-powers, power-rules, scientific, roots, fractional, equivalent, extract, add-radicals, multiply-radicals, rationalize-square, rationalize-index, conjugate, log-definition, log-properties, change-base. Reuses 4. DBH aplikatuak errealak figures (Powers, ScientificOps, Roots, Simplify, RadicalOps) + 10 new figures; pure `radicals.ts` (simplifyRadical, lowestIndex, extractFactors, putInside, commonIndex, rationalPower, exactLog). Radical answers ask for one number («= a√2, ¿cuánto vale a?»). No normalizeInput.

Phase 1+2 DONE 78e6a9a (diag 5001–5008, practice 1–20, challenges 101–115, bank 1–50). Phase 3 lab DONE 8528115 (10 tools: aplikatuak PowersTool + ScientificTool with ids 401xx/407xx, new rules 611xx, fractional 612xx, common index 613xx, extract 2ᵃ3ᵇ5ᶜ 614xx, rationalize 615xx, conjugate 616xx, log ladder 617xx, change of base 618xx). Also fixed the shared aplikatuak ladder-of-powers Arabic label (y 14→17), not deployed yet. Phase 4 games DONE a230edc (race 62101–62105, all new generators with `meta` recomputed by the test; memory 62201–62203: fractional exponents, extract, logarithms). Merged and deployed 2026-10-11 (bundle index-CaLS8nNJ, with the aplikatuak ladder label fix); main pushed. Next 4. DBH akademikoak unit: polinomios-fracciones (Santillana Ac. U3 + Anaya Ac. U2) — only when asked.

Gotchas: in SVG avoid rare glyphs like ᐟ for fractional exponents; use a raised <tspan> (helper `Up` in figures.tsx). Arabic must never go inside KaTeX \text{}.

## Own games (2026-11-02)

Simplify the radical (62301–3), find the exponent (62401–3) and a powers detective (62501–3). Details in `dbh4-own-games.md`.
Deployed on matella.net 2026-11-02 (main 885c2ac, bundle index-BQ8PGQN9.js).

**Sufijos del euskera en el archivo de lecciones (2026-11-03, rama `feat/lessons-eu-suffixes`, commit 817ad3c, publicado el 2026-11-03: main fb72223, bundle `index-CWC0dhqi.js`):** 11 textos de `lessons.tsx` (12 sufijos): «2ari» → «2 zenbakiari», «2-ren $3:3=1$» → «2 zenbakiaren $3:3=1$», «10en berretura» → «10 oinarriko berretura», «Osatu 5eraino» → «Osatu 5 arte», «1en desberdina» → «baina ez 1». Solo cambia el euskera; las fórmulas son las mismas en los cuatro idiomas. Lo vigila `tests/lessons-basque-suffixes.test.ts`, que ahora mira el archivo de lecciones de todas las unidades.


**Teoría con las mejoras de 2. DBH (2026-11-04, rama `claude/teoria-dbh4ak-d45b04`, commit 2f1fe93, sin publicar):** `lessonTexts.ts` y `lessonChecks.ts` en las 15 lecciones; 9 enlaces a 3. DBH; 4 «¿Por qué funciona?» (exponente 0 y negativo, $a^{1/2}=\sqrt{a}$, logaritmo del producto, cambio de base); «Una raíz cuadrada en el denominador» con el dibujo tras los pasos. Detalles en `teoria-dbh4ak.md`.
