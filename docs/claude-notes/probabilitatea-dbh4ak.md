---
name: probabilitatea-dbh4ak
description: "14th and last 4. DBH akademikoak unit (Probabilidad): folder, ids, reuse, phase progress; deployed 2026-10-21"
---

Started 2026-10-21 when the owner said «adelante» after [[konbinatoria-dbh4ak]] was deployed. Course topic `probabilidad` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-probabilitatea`, storagePrefix `matella-probabilitatea-dbh4ak`, page `ProbabilitateaDbh4AkIntroPage`, branch `feat/probabilidad-dbh4ak`. Sources: Santillana Ac. U14 + Anaya Ac. U12 (both solucionarios with text; scratchpad s14.txt / a12.txt).

Stages events/probability/compound/conditional/counting; topics experiments, operations, compatible, frequency, laplace, properties, independent, dependent, trees, contingency, conditional, total, with-combinations, several-dice, fair-games. Notation P(A/B), \overline{A}, coins C/+. Answers: fraction or exact decimal via readStatisticsAnswer (dbh2).

Phase 1 5bca638 (diag 6301–6308, practice 1–20, challenges 101–115, bank 1–50, 15 new figures). Lab bd79cac: 10 tools — reused union/urn/contingency (aplikatuak 597xx–599xx) and dice (dbh2 26601–26603); new simulate 851xx (fixed mulberry32 seeds coin 11, die 59, pin 3), repeat 852xx (De Méré), total 853xx, draw 854xx, three-dice 855xx, fair 856xx. Games f8ddf34: race 86101–86105, memory 86201–86203 (dice sums, products, conditionals).

Shared fix in bd79cac: `LabKit.css` readout-main got padding-block 4px + overflow-y hidden (KaTeX fractions made a vertical scrollbar in every unit's lab readout), and `.math-token.display` inside it overflow visible (single-formula readouts clipped denominators).

Full suite 804/804, lint and build OK. Merged to main (fast-forward f8ddf34), pushed and deployed 2026-10-21 (bundle index-BX0TEDsp). With it, all 14 units of 4. DBH akademikoak are live.

## Own games (2026-11-02)

The paths of the tree (86301–3), the contingency table (86401–3) and a probability detective (86501–3). Details in `dbh4-own-games.md`.
Deployed on matella.net 2026-11-02 (main 885c2ac, bundle index-BQ8PGQN9.js).

**Sufijos del euskera en el archivo de lecciones (2026-11-03, rama `feat/lessons-eu-suffixes`, commit 817ad3c, publicado el 2026-11-03: main fb72223, bundle `index-CWC0dhqi.js`):** 10 textos de `lessons.tsx` (15 sufijos): «1etik 10era zenbakitutako 10 bola» → «10 bola …, 1 eta 10 arteko zenbakiekin», «240k eta 100ek» → «240 ikaslek eta 100 ikaslek», «49tik 6 zenbakirekin» → «49 zenbakitatik 6 aukeratuta», «1etik kentzea» → «1 zenbakiari kentzea». Solo cambia el euskera; las fórmulas son las mismas en los cuatro idiomas. Lo vigila `tests/lessons-basque-suffixes.test.ts`, que ahora mira el archivo de lecciones de todas las unidades.


**Teoría con las mejoras de 2. DBH (2026-11-05, rama `claude/teoria-dbh4ak-d45b04`, commit 72d1d03, sin publicar):** `lessonTexts.ts` y `lessonChecks.ts` en las 15 lecciones; 11 enlaces (3. DBH Estadística y probabilidad; Reales, Estadística y Combinatoria de 4.º); 3 «¿Por qué funciona?» (restar la intersección, dividir entre $P(B)$, la esperanza como media); 11 dibujos tras los pasos. Detalles en `teoria-dbh4ak.md`.
