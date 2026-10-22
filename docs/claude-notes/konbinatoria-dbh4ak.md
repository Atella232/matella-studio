---
name: konbinatoria-dbh4ak
description: "13th 4. DBH akademikoak unit (Combinatoria): folder, ids, phase progress; deployed 2026-10-21"
---

Started 2026-10-21 when the owner said «adelante» after [[estatistika-dbh4ak]] was deployed. Course topic `combinatoria` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-konbinatoria`, storagePrefix `matella-konbinatoria-dbh4ak`, page `KonbinatoriaDbh4AkIntroPage`, branch `feat/combinatoria-dbh4ak`. Sources: Santillana Ac. U13 (scanned, rendered to scratchpad s13/) + Anaya Ac. U11 (a11.txt). Scratchpad helper scripts disappear between sessions: recreate tools/pdftext.swift and render.swift; a contact sheet of figure PNGs with Pillow (run python without -I so Pillow loads).

Stages counting/variations/permutations/combinations/problems; topics tree, product, factorial, with-repetition, variations, conditions (no leading 0), permutations, restricted (blocks), repeated (n!/a!b!), combinations, binomial (symmetry), pascal, which-model, geometry (grid paths, lines, diagonals), committees. Notation V_{n,k}, VR_{n,k}, P_n, C_{n,k} and \binom in every language. 15 new figures, no reuse. Answers are whole numbers via `answers.ts` readCountAnswer (drops spaces, thin and no-break spaces, then readStatisticsAnswer); big counts written 40\,320 in LaTeX.

Phase 1 ada0c84 (diag 6201–6208, practice 1–20, challenges 101–115, bank 1–50). Lab f41cf66: 7 new tools (tree 831xx, factorial 833xx, slots V/VR 832xx, letters 834xx, choose 835xx, pascal 836xx, grid 837xx). Games baa330d (race 84101–84105, memory 84201–84203). Full suite 784/784, lint and build OK. Merged to main (fast-forward baa330d), pushed and deployed 2026-10-21 (bundle index-g87kmqP8).

Next 4. DBH akademikoak unit: probabilidad (Santillana Ac. U14 + Anaya Ac. U12), the last one.
