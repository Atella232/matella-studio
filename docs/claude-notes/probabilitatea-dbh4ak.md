---
name: probabilitatea-dbh4ak
description: "14th and last 4. DBH akademikoak unit (Probabilidad): folder, ids, reuse, phase progress; deployed 2026-10-21"
---

Started 2026-10-21 when the owner said «adelante» after [[konbinatoria-dbh4ak]] was deployed. Course topic `probabilidad` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-probabilitatea`, storagePrefix `matella-probabilitatea-dbh4ak`, page `ProbabilitateaDbh4AkIntroPage`, branch `feat/probabilidad-dbh4ak`. Sources: Santillana Ac. U14 + Anaya Ac. U12 (both solucionarios with text; scratchpad s14.txt / a12.txt).

Stages events/probability/compound/conditional/counting; topics experiments, operations, compatible, frequency, laplace, properties, independent, dependent, trees, contingency, conditional, total, with-combinations, several-dice, fair-games. Notation P(A/B), \overline{A}, coins C/+. Answers: fraction or exact decimal via readStatisticsAnswer (dbh2).

Phase 1 5bca638 (diag 6301–6308, practice 1–20, challenges 101–115, bank 1–50, 15 new figures). Lab bd79cac: 10 tools — reused union/urn/contingency (aplikatuak 597xx–599xx) and dice (dbh2 26601–26603); new simulate 851xx (fixed mulberry32 seeds coin 11, die 59, pin 3), repeat 852xx (De Méré), total 853xx, draw 854xx, three-dice 855xx, fair 856xx. Games f8ddf34: race 86101–86105, memory 86201–86203 (dice sums, products, conditionals).

Shared fix in bd79cac: `LabKit.css` readout-main got padding-block 4px + overflow-y hidden (KaTeX fractions made a vertical scrollbar in every unit's lab readout), and `.math-token.display` inside it overflow visible (single-formula readouts clipped denominators).

Full suite 804/804, lint and build OK. Merged to main (fast-forward f8ddf34), pushed and deployed 2026-10-21 (bundle index-BX0TEDsp). With it, all 14 units of 4. DBH akademikoak are live.
