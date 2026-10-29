---
name: zatigarritasuna-dbh1
description: "Zatigarritasuna DBH1 unit (started 2026-09-28) — third DBH1 V2 unit; sources, scope, reuse of the DBH2 unit, phase progress"
---

Third 1. DBH unit on the V2 engine (after [[zenbaki-osoak-dbh1]]). Branch `feat/zatigarritasuna-dbh1`, route `matematika/dbh1/divisibilidad/*`, code in `src/pages/dbh1-zatigarritasuna-v2/`. Legacy `dbh1-zatigarritasuna/` deleted in phase 1.

Sources: Santillana 1.º ESO `LIBROS/1_ESO/Santillana/Unidad_02_Divisibilidad.pdf` (curricular adaptation: multiples/divisors via exact division and groupings, rules 2/3/5/10, primes, factorization + divisor table method, common divisors/multiples, m.c.d./m.c.m.) and Anaya `Libro_Estandar/Unidad_03_Divisibilidad.pdf` (adds rule for 9, sieve). Books live in the Obsidian iCloud folder `…/ATB/WIKI/raw/Klase/Matematika/LIBROS/`; text extracted with a Swift PDFKit script.

Scope: 12 lessons (no rules for 7/11, which stay in DBH2). Reuses DBH2 `figures.tsx`, `notation.ts`, `math.ts` and CSS; own figures: BagsFigure, DivisorTableFigure, PoolCalendarFigure. Thousands with a dot in KaTeX (`5{.}027`), as in class.

Phases (all done 2026-09-28; merged to main fast-forward c145bfe, pushed and deployed to matella.net the same day at the owner's request): 1) 12 lessons [1cdbe61]; 2) diagnostic 8, practice 19, bank 30 (12 closed), challenges 12, `normalizeInput: readNaturalAnswer` [13b9651]; 3) lab 8 tools / 31 challenges (ids 31xx–38xx): DBH2 tools now take `challenges` (CriteriaTool also `criteria`, here [2,3,5,9,10]) + new divisor TableTool [32ac9ac]; 4) games race/hunt/factor/memory (ids 41xx–44xx): DBH2 Hunt/Factor/Memory take `config` {game, levels}; race adds a "left over" question in circuit 0, caps DBH2 tiers at ≤1 [c145bfe]. Tests: tests/zatigarritasuna-dbh1-{content,lab,games}.test.ts.

**2026-10-29 · sort tool.** «ZKH ala MKT?» (`sort`) uses the shared DBH2 `problemCards`, which grew from 8 to 15 cards; details in [[zatigarritasuna-dbh2]] note.
