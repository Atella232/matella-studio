---
name: areak-dbh4ak
description: "Sixth 4. DBH akademikoak unit (Áreas, volúmenes y semejanza): sources, structure, ids, phase progress"
---

Started 2026-10-12 when the owner said «continua» after deploying [[sistemak-dbh4ak]]. Course topic `areas-volumenes-semejanza` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-areak`, storagePrefix `matella-areak-dbh4ak`, page `AreakDbh4AkIntroPage`, branch `feat/areak-dbh4ak`.

Sources: Santillana 4.º Académicas U6 «Áreas y volúmenes. Semejanza» (scanned solucionario, rendered to scratchpad sk6/) + Anaya Ac. U6 «Semejanza. Aplicaciones» (scratchpad ak6.txt: Thales, altitude/leg theorems, frustums, scales).

Stages plane-areas/solid-areas/volumes/similarity/ratios; 15 topics: regular-polygons, circle-parts, segments, polyhedra-area, round-area, sphere-area, prism-cylinder-volume, pyramid-cone-volume, sphere-composite, thales, similar-triangles, right-theorems, ratio-powers, frustums, models. π ≈ 3,14, answers read with aplikatuak `readSimilarityAnswer`. New figures: SegmentFigure, RightTheoremsFigure, FrustumFigure (+ hero); the rest reused from dbh1-figurak, dbh2-gorputzak, dbh2-pitagoras, 4. DBH aplikatuak areak/antzekotasuna.

Phase 1 DONE 47a0a9c (diag 5401–5408, practice 1–20, challenges 101–115, bank 1–50; tests/areak-dbh4ak-content.test.ts). Lab DONE 3464017 (owner said «dale»): 12 tools; reused regular + compound (aplikatuak areak), sector (dbh1), pyramid/round/volume (dbh2), thales + growth (aplikatuak antzekotasuna); new segment 691xx, projections 692xx, frustum 693xx, model 694xx (lab/AreasSimilarityTools.tsx). Shared fix in the same commit: the Readout of dbh1-figurak and aplikatuak-areak labs splits at \qquad so long readouts wrap (sector overflowed 108 px); ships to 1. DBH and 4. DBH ap on deploy. Known harmless: reused Thales readout scrolls 10 px at 375 px. Games DONE a386f26 (owner said «continua»): race 70101–70105 (borrows are:/sol:/sim: from aplikatuak areak, dbh2 gorputzak, aplikatuak antzekotasuna; 17 own kinds with `meta`), memory 70201–70203 (altitude m,n↔h; k with A₂:A₁ or V₂:V₁; volumes in π). Max card 81 px of 106 on phone. Gotcha: MathText turns a bare ':' inside $…$ into ÷ — write scales as `1\mathbin{:}n` (fixed in the lesson too). Basque check `$-ko` only on own race questions (borrowed aplikatuak arc prompt has `$60^{\circ}$-ko`, which is correct Basque). DEPLOYED 2026-10-12 (main a386f26, bundle index-C2zxjdyS), with the dbh1/aplikatuak lab readout wrap fix. Next 4.º académicas unit only when asked: `trigonometria` (Santillana Ac. U7 + Anaya Ac. U7).

Figure check trick (browser pane hidden, screenshots fail): bundle a renderToStaticMarkup script with `NODE_PATH=$PWD/node_modules npx esbuild … --platform=node --jsx=automatic`, then `qlmanage -t -s 1440` the SVGs and Read the PNGs (qlmanage crops to a square).

## Own games (2026-11-02)

How many glasses? (70301–3), grow it k times (70401–3) and a geometry detective (70501–3). Details in `dbh4-own-games.md`.
Deployed on matella.net 2026-11-02 (main 885c2ac, bundle index-BQ8PGQN9.js).

**Sufijos del euskera en el archivo de lecciones (2026-11-03, rama `feat/lessons-eu-suffixes`, commit 817ad3c, publicado el 2026-11-03: main fb72223, bundle `index-CWC0dhqi.js`):** 1 texto de `lessons.tsx`: «3-z zatitzea ahaztea» → «3 zenbakiaz zatitzea ahaztea». Solo cambia el euskera; las fórmulas son las mismas en los cuatro idiomas. Lo vigila `tests/lessons-basque-suffixes.test.ts`, que ahora mira el archivo de lecciones de todas las unidades.


**Teoría con las mejoras de 2. DBH (2026-11-04, rama `claude/teoria-dbh4ak-d45b04`, commits a0bbb6e y ceef7b0, sin publicar):** `lessonTexts.ts` y `lessonChecks.ts` en las 15 lecciones; 8 enlaces a 3. DBH; 3 «¿Por qué funciona?» (tres pirámides en un cubo, teorema de la altura, $k^{2}$ y $k^{3}$); el segmento circular, con el dibujo tras los pasos. Los dos ejemplos largos (partes del círculo, área de poliedros), en dos filas. Detalles en `teoria-dbh4ak.md`.
