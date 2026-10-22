---
name: funtzioak-dbh2
description: "Funtzioak 2. DBH V2 unit rebuilt from scratch (2026-10-01/02) — sources, ids, structure; DONE, merged and deployed"
---

Owner asked (2026-10-01): "retoma Funtzioak y rehazlo hasta dejarlo al nivel de los demás ... y publícalo al terminar". The old WIP of another session (poor, broken LaTeX escapes) was deleted and rewritten. Branch `feat/funtzioak-dbh2`; folder `src/pages/dbh2-funtzioak-v2`, route `matematika/dbh2/funciones/*`, storagePrefix `matella-funtzioak-dbh2`.

Sources: `LIBROS/2_ESO/Santillana/Unidad_13_Funciones.pdf` (solutions manual) and `Anaya/Unidad_13_Funciones.pdf` (scratchpad s13.txt / a13.txt via pdftext.swift). Basque terms: funtzioa, aldagai askea/menpekoa, koordenatuak, koadrantea, balio-taula, malda, gorakorra/beherakorra/konstantea, maximoa/minimoa, jarraitua/etena, proportzionaltasun zuzena, funtzio lineala y=mx+n, konstantea y=k.

Structure: 17 lessons / 5 stages (idea, representations, reading, proportional, lines). Shared `plane.tsx` (PlaneGrid/Plane SVG, click-to-pick) + `planeMap.ts` + pure `functions.ts` (lines, quadrants, story graphs). Content ids: diagnostic 3001–3008, practice 1–20, bank 1–48, challenges 101–113. Lab 6 tools / 31 challenges ids 301xx–306xx. Games race (5 circuits, ids 3110x, questions carry `meta` for tests), plot (click-to-place, 3 levels 3120x), memory (3 levels 3130x). Engine change: `PairCard.explain` optional worked line for the success message.

Status: ALL DONE — commits a584f56 lessons, e584b76 content, 03630e5 lab, 0e63e5f games; fast-forwarded into main, pushed and deployed 2026-10-02. Tests: tests/funtzioak-dbh2-{functions,content,lab,games}.test.ts (full suite 242 pass at deploy).

Next candidates for 2. DBH still on legacy: Proporcionalidad y porcentajes, Teorema de Pitágoras, Cuerpos geométricos, Estadística y probabilidad (see [[ekuazioak-dbh2]] for the 4-phase pattern; node PATH in [[node-toolchain-path]]).

Quality pass (2026-10-02, owner: "todavía un pelín verde"), branch `fix/funtzioak-quality` commit fd6675b, merged and deployed 2026-10-02: engine got optional `figure` on DiagnosticQuestion/PracticeItem/ExerciseItem (+`solutionFigure`) and `RaceRules.figure`; Funtzioak content carries pure `graph`/`solutionGraph` GraphSpec (functions.ts) drawn via `withGraphs` (withGraphs.tsx) / `GraphFigure` (graphs.tsx); plane `Label` auto-RTL for Arabic with LRI-isolated formulas; Frame clips lines (planeClip.tsx); lab relations A–H incl. parabola + circle; race reading circuit drawn as graphs + graph-point/value/slope/line kinds. Bank ids are progress keys: new items take the next free id inside their section (49 lines, 50 reading).

**Why:** resume after interruptions / pick the next unit. **How to apply:** graph-reading exercises should show a real graph (GraphSpec), not a table; keep LaTeX out of `observe` hints (plain text) and Arabic/€ out of `\text{}`; review lesson figures in a temporary gallery page (not committed) since the browser pane's screenshots lag.
