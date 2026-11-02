# 4. DBH own games (applied and academic)

From 2026-11-02 the 4. DBH units get their own games (target: 3 own games per unit, besides the race and the memory), as 2. DBH did ([dbh2 notes](proportzionaltasuna-dbh2.md)). Labs were not touched: every 4. DBH lab already had at least two own tools.

Shared code lives in `src/pages/dbh4-games/` (engines and detectives used by both tracks, with a `track` or level sets per track). Wiring uses the same shape as every V2 unit (info.ts entry, slug, path parser, games/index.tsx component, art). Tests: `tests/dbh4-own-games.test.ts` (shared `checkDetective` and `endValue`) plus each unit's hub count.

## Real numbers (ap `dbh4-aplikatuak-errealak`, ak `dbh4-akademikoak-errealak`)

- `intervals` (`dbh4-games/intervals.ts`, `IntervalGame.tsx`): build the interval on the number line (two ends with steppers, ±∞, open or closed). Level 1 bounded, level 2 half-lines, level 3 words (applied) or |x − c| ≤ r (academic). Ids ap 41501–41503, ak 42401–42403.
- `detective` (`dbh4-games/realsDetective.ts`): both tracks start with decimals and approximations; academic goes on with percentages and compound interest, applied with radicals. Ids ap 41601–41603, ak 42501–42503.
- With the existing `place` game, each unit has three own games.

Tricks: in Arabic the two end boxes need `direction: ltr` so the left end stays on the left of the line. Basque names must not glue a suffix to a number («12z» → «hamabiz»).
