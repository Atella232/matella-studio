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

## Equations (ap `dbh4-aplikatuak-ekuazioak`, ak `dbh4-akademikoak-ekuazioak`)

Code in `dbh4-games/equations.ts`, `EquationGames.tsx`, `equationsDetective.ts`.
- ak `check` (66301–3): is it a solution? Candidates as chips; keep only the true solutions (radicals with a false root, a fraction whose candidate cancels the denominator, biquadratics with the t values as traps). «None» is a valid answer.
- ak `paint` (66401–3): paint the solution of an inequality; the line is cut at the roots (hidden in level 3, with double roots and no roots); pieces and ends (● / ○) are switched on.
- ap `build` (48301–3): build x² + bx + c = 0 from two solutions; the parabola appears after checking.
- ap `cross` (48401–3): the crossing point of two lines, tapped on the plane (`Plane` of Funtzioak 2. DBH). Reusable for Sistemak.
- `detective` (ap 48501–3, ak 66501–3): the applied track reuses the first- and second-degree cases of Ekuazioak 2. DBH (`buildEquationDetectiveCase`, now exported) and adds systems; the academic track has quadratics and biquadratics, radical/fraction/exponential equations and inequalities. Values: lists → `solutionsValue`, systems → x·1000 + y, sets → `setCode`.

Trick: the wiring script once changed the wrong `assert.equal(x.length, n)` in a test; it now only matches `…Games.length`.

## Functions (ap `dbh4-aplikatuak-funtzioak`, ak `dbh4-akademikoak-funtzioak`)

- `domain` (`dbh4-games/functions.ts` + `DomainGame` in `EquationGames.tsx`): paint the domain. A `DomainRound` is a `PaintRound` with the formula `display`; the condition behind it is the radicand ≥ 0, a denominator as (denominator)² > 0, or both > 0. Ids ap 54301–3, ak 76301–3.
- `slope` (`FunctionGames.tsx`): the mean slope. Choose [a, b] whose mean rate of change is the target; the plane is fitted to the function and capped at 250 px; the secant appears after checking; any right interval counts. Ids ap 54401–3, ak 76401–3.
- `detective` (`functionsDetective.ts`): images and preimages, domains (sets), the rate of change. Ids ap 54501–3, ak 76501–3.

Trick: several academic hub tests limited the progress ids to `…101–…299`; they now allow up to `…599`.

## Graphs (ap `dbh4-aplikatuak-grafikoa`, ak `dbh4-akademikoak-polinomikoak`, ak `dbh4-akademikoak-esponentzialak`)

Code in `dbh4-games/curves.ts`, `CurveGames.tsx`, `graphsDetective.ts`; each unit passes its families per level.
- `laser` (all three): curve laser. A family template (y = mx + n, a(x − h)² + k, a|x − h| + k, a/(x − h) + k, b^(x − h) + k, log_b(x − h) + k), steppers for its parameters and 2–3 targets; the curve appears after firing (the right one dashed after a miss). `uniqueFit` checks that no other stepper setting hits every target; the steppers start on a curve no round uses (`START`). Ids: graphs 58301–3, polynomial 78301–3, exponential 80301–3.
- `match` (graphs 58401–3, polynomial 78401–3): which formula? A graph and four formulas (shift sign, opening sign, h and k swapped).
- `growth` (exponential 80401–3): when does it double? Bacteria that double or triple, half-lives; set the time; bars appear after checking.
- `detective` (graphs 58501–3, polynomial 78501–3, exponential 80501–3): 20 errors on lines, parabolas, shifts, absolute value, hyperbolas, exponentials and logarithms; three levels per unit.

## Systems (ak `dbh4-akademikoak-sistemak`)

- `cross` (68301–3): the crossing point of Ekuazioak (`CrossingPointGame`).
- `touch` (`dbh4-games/halfPlanes.ts`, `SystemGames.tsx`, 68401–3): touch the solution. One, two or three linear inequalities; tap any whole point of the region; afterwards the boundary lines (dashed when strict) and the region's whole points are drawn.
- `detective` (68501–3): the equations detective with a `systems` track: methods, non-linear systems (a lost negative root, a product distributed to one term), problems (legs, a difference written backwards, years added to one person). Several points in a line are written `x=…, y=…;\ x=…, y=…` and coded as the sum of `systemCode`.
