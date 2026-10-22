---
name: v2-redesign-direction
description: "Project direction (Sept 2026) — rebuild Matella around the DBH2 Zatikiak V2 prototype, then extend its style to all units and courses; progress and next steps"
---

On 2026-09-26 the owner decided to overhaul the whole project: polish the DBH2 Zatikiak V2 prototype (`src/pages/dbh2-zatikiak-prototype/`, route `#/prototipo/zatikiak-v2`) until it is the desired target, then extend that style to the other topics and courses.

Decisions:
- Every unit keeps the same V2 structure: diagnostic, learn, lab, practice, challenges, games.
- Order of work: 1) visual redesign, 2) polish lab and games, 3) then correct, improve and evolve content.

Progress as of 2026-09-26:
- Visual redesign "D · Cuaderno a color" applied (see [[visual-direction-d]]).
- Lab rebuilt in `src/pages/dbh2-zatikiak-prototype/lab/` (8 tools, 32 challenges, tests in `tests/zatikiak-lab.test.ts`).
- V2 is now the OFFICIAL DBH2 Zatikiak: route `matematika/dbh2/zatikiak/*` renders it; `prototipo/zatikiak-v2` and legacy `/teoria` `/laboratorio` `/retos` redirect. Merged to main, pushed and deployed (commit 12229f2).
- Whole site restyled to Cuaderno (except Natura, which the owner wants unchanged): tokens in `src/index.css` (`:root` = cuaderno, `:root[data-theme="classic"]` = old dark look, set by Layout on `/natura*`), shared overrides in `src/styles/cuaderno.css`, and legacy unit CSS colours remapped by script to the stage palette. Legacy units only got a reskin, not the V2 structure.
- Games rebuilt (2026-09-27, merged to main, pushed and deployed on 2026-09-27, commit 2351097): pizza, quick-equivalence and calc-sprint removed; new `games/` folder with Zatikien lasterketa (6 circuits, multiple choice + written pit stop, no sound — owner's choice), Itua (number line target), Zatiki-horma (fill rows to exactly 1) and Memoria v2 (pairs/trios, trap values). Logic in pure seeded modules tested in `tests/zatikiak-games.test.ts`. Drawn with inline SVG; Magnific MCP was offered by the owner for images but not needed.

- 2026-09-27: shared unit engine extracted to `src/features/unit-v2/` (UnitPage + UnitDefinition; Zatikiak is now just a definition). Zenbaki osoak DBH2 started at route `matematika/dbh2/numeros-enteros` (`src/pages/dbh2-zenbaki-osoak/`), branch `feat/unit-engine-zenbaki-osoak`, NOT merged/deployed. Owner chose: integers only (no powers/roots/divisibility — separate topics on the site), shared engine, delivery in reviewed phases: 1) engine + lessons + route [done], 2) diagnostic, practice, challenges [done 2026-09-27, commit 1d8c2c5, content in `src/pages/dbh2-zenbaki-osoak/content.ts`], 3) lab [done 2026-09-27, commits 5658588 + 9eef8ed: lab shell now shared in `src/features/unit-v2/lab/` (LabShell, ToolFrame, Stepper…); integer lab in `src/pages/dbh2-zenbaki-osoak/lab/` with 7 tools × 4 challenges, logic tested in `tests/zenbaki-osoak-lab.test.ts`], 4) games [done 2026-09-27, commits 045deb1 (hub, kit, records, race moved to `src/features/unit-v2/games/`; a unit plugs its questions into the race via RaceRules) + 5091dda (integer games in `src/pages/dbh2-zenbaki-osoak/games/`: race 5 circuits, pyramid, memory, en fila; tests in `tests/zenbaki-osoak-games.test.ts`)]. All four phases done; merged to main (fast-forward, 5091dda), pushed and deployed to matella.net on 2026-09-27 at the owner's request. Notation: Aur(a) in Basque, Op(a) in Spanish; in Arabic strings wrap signed numbers in LRI…PDI (U+2066/U+2069) — LRM alone still showed 6− . Content follows the owner's Basque textbook (3. gaia "Zenbaki osoak": Aur(−5), modu laburtua, kako zuzenak; ':' for division).

**Why:** the legacy units are copied page folders with inconsistent design and validation; V2 is meant to become the template.

**How to apply:** next, extend the V2 unit structure to other units. Prefer extracting reusable unit components/data over copying V2 per unit. Deploying (`npm run deploy`) affects real students, so confirm first; see [[node-toolchain-path]] for the PATH gotcha.

- 2026-09-27: an external expert review of the V2 units was worked through and deployed: math wording fixes (0 as multiple, 90=2·5·9), real URLs for every section/lesson/lab tool/practice/game, Zatikiak lessons rebuilt with steps + SVG figures, a `problem` statement shown before worked steps, mobile tweaks (lab in the bottom bar instead of games — owner's choice; lesson picker), and auto-checked answers for the 52 single-result bank exercises. Still open: multi-part (a/b/c) answer fields for 28 bank exercises (owner wants to see the single-answer version in class first) and a Basque teacher's review of the new Zatikiak lesson texts.
