# 4. DBH own games (applied and academic)

From 2026-11-02 the 4. DBH units get their own games (target: 3 own games per unit, besides the race and the memory), as 2. DBH did ([dbh2 notes](proportzionaltasuna-dbh2.md)). Labs were not touched: every 4. DBH lab already had at least two own tools.

Shared code lives in `src/pages/dbh4-games/` (engines and detectives used by both tracks, with a `track` or level sets per track). Wiring uses the same shape as every V2 unit (info.ts entry, slug, path parser, games/index.tsx component, art). Tests: `tests/dbh4-own-games.test.ts` (shared `checkDetective` and `endValue`) plus each unit's hub count.

## Real numbers (ap `dbh4-aplikatuak-errealak`, ak `dbh4-akademikoak-errealak`)

- `intervals` (`dbh4-games/intervals.ts`, `IntervalGame.tsx`): build the interval on the number line (two ends with steppers, ±∞, open or closed). Level 1 bounded, level 2 half-lines, level 3 words (applied) or |x − c| ≤ r (academic). Ids ap 41501–41503, ak 42401–42403.
- `detective` (`dbh4-games/realsDetective.ts`): both tracks start with decimals and approximations; academic goes on with percentages and compound interest, applied with radicals. Ids ap 41601–41603, ak 42501–42503.
- With the existing `place` game, each unit has three own games.

Tricks: in Arabic the two end boxes need `direction: ltr` so the left end stays on the left of the line. Basque names must not glue a suffix to a number («12z» → «hamabiz»).

## Polynomials (ap `dbh4-aplikatuak-polinomioak`, ak `dbh4-akademikoak-polinomioak`)

- `hunt` (`dbh4-games/polynomials.ts`, `PolynomialGames.tsx`): root hunt. The divisors of the constant term as chips; each try runs Ruffini (table shown); a root lowers the degree (roots can repeat); won with at most one miss. Level 1 three different roots, level 2 leading coefficient and repeated roots, level 3 degree 4. Ids ap 46301–3, ak 64301–3.
- `divisible` (applied only): choose k (slider + stepper) so that x − a divides the polynomial; the Ruffini table shows the remainder. The test checks that only one k in −40…40 works. Ids 46401–3.
- `simplify` (academic only): four simplifications of a fraction of quadratics; the wrong ones cancel the x², swap the signs or cancel the x. Ids 64401–3.
- `detective` (`dbh4-games/polynomialsDetective.ts`): 16 errors; applied = operations, division, factorising; academic = division, factorising, algebraic fractions. Lines with polynomials or fractions are compared at x = 11. Ids ap 46501–3, ak 64501–3.
