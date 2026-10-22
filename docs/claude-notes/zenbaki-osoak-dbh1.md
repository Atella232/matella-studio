---
name: zenbaki-osoak-dbh1
description: Zenbaki osoak DBH1 unit (2026-09-27) — second DBH1 V2 unit; sources, how it reuses the DBH2 integers unit, phase progress
---

Second 1. DBH unit on the V2 engine (after [[zenbaki-naturalak-dbh1]]). Branch `feat/zenbaki-osoak-dbh1`, route `matematika/dbh1/numeros-enteros/*`, code in `src/pages/dbh1-zenbaki-osoak-v2/`. Legacy `dbh1-zenbaki-osoak/` deleted (owner approved deleting legacy folders once replaced).

Sources: owner's Drive `LIBROS/1_ESO/Santillana/Unidad_05_Enteros.pdf` (class textbook, curricular adaptation: meaning, line/order, absolute value & opposite, sums/subtractions incl. brackets, mult/div sign rule; NO powers, no hierarchy) and `Anaya/Libro_Estandar/Unidad_04_Numeros_Enteros.pdf`. It is the introductory version of the DBH2 integers unit (which already covers the same scope further).

Reuse of DBH2 (`src/pages/dbh2-zenbaki-osoak/`) instead of copying: NumberLine/SituationsFigure/SignRuleFigure figures and CSS; the six lab tools accept a `challenges` prop (IntegerToolProps loosened to LabToolProps); PyramidGame/OrderGame accept `config` {game, levels, art}; the DBH1 race reuses DBH2 generators capped at tier ≤1 plus a new situations circuit. New own pieces: ElevatorFigure, CountersFigure, BracketsFigure, lab BracketsTool, ElevatorGame.

Phases: 1) 14 lessons [263762c]; 2) diagnostic 8, practice 19, bank 30 (15 closed with `answer`), challenges 12 [13b3e81]; 3) lab 7 tools × 4 [dc29b3f]; 4) games race/elevator/pyramid/order [done 2026-09-27]. Merged to main (fast-forward, be079da), pushed and deployed to matella.net on 2026-09-27 at the owner's request.
