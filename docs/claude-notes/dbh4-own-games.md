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

## Geometry (ap `dbh4-aplikatuak-areak`, ak `dbh4-akademikoak-areak`, ap `dbh4-aplikatuak-antzekotasuna`)

Code in `dbh4-games/pour.ts`, `tiles.ts`, `similarity.ts`, `VolumeGames.tsx`, `SimilarityGames.tsx`, `geometryDetective.ts`, `format.ts` (`plainNumber`: comma in eu/es, point in en/ar).
- `tiles` (ap areas 50301–3): tile the floor. A plan with its sides in metres (rectangle, L, or L/U/T with oblong tiles) and a tile in cm; set the count, then the tiles go down row by row; bare floor is dashed red, extra tiles counted. Side labels are placed long sides first and skipped when two would overlap (the skipped side follows from the others).
- `pour` (ap areas 50401–3, ak areas 70301–3): how many glasses? A small and a big vessel at the same scale (cylinder/cone/sphere/hemisphere into a cylinder, prism/pyramid/cube into a prism); the big one fills glass by glass (`useCountUp`), spills or stays short. Volumes are kept whole (in π cm³ for round vessels); the fills are 2–12.
- `scale` (ak areas 70401–3, ap similarity 52501–3): grow it k times. Contexts that go with length (fence, frame), area (paint, seed, photo) or volume (jug, statue, box); four options (×k, ×k², ×k³, +k or the value kept); level 3 has reductions and the way back (area ×9 → k = 3). After answering the big square fills with k² copies or the big cube with k³ cubes.
- `tower` (ap similarity 52301–3): measure the tower with a shadow, a mirror or a line of sight from the ground. The scene uses one scale across (fitted to the ground) and another up (fitted to the stepper's 20 m, never to the answer): parallel rays stay parallel. The real ray is drawn in green after a miss.
- `map` (ap similarity 52401–3): the map scale. Half the rounds place B on a 10 cm ruler (tap or stepper), half read the real distance (slider and stepper); level 3 is house plans in metres.
- `detective` (ap areas 50501–3, ak areas 70501–3, ap similarity 52601–3): 24 errors that need 4. DBH tools (height or slant height by Pythagoras, side used for the perimeter, sector over 180, ring as (R − r)², segment added, hidden circle of a compound solid counted, hemisphere not halved, hole added, k instead of k², area ratio taken as k, Thales upside down or with a part, scale zeros, plan multiplied, shadows swapped or mixed units). Values with π stay as multiples of π (`endValue` reads `\pi`).

Tricks: `checkDetective` now also checks that English has no Arabic letters and Arabic (formulas left out) no Latin word, so a swapped `say()` cannot pass; it ran clean over every 4. DBH detective. In Arabic a formula like `1\mathbin{:}100` is isolated LTR by `UnitPage.css`, so it reads correctly.

## Statistics (ap `dbh4-aplikatuak-estatistika`, ak `dbh4-akademikoak-estatistika`)

Code in `dbh4-games/statistics.ts`, `StatisticsGames.tsx`, `statsDetective.ts`; quartiles come from `dbh4-aplikatuak-estatistika/stats.ts` (the textbook rule of the lessons), `percentilePlaces` gives the data behind each one.
- `box` (ap 60301–3, ak 82301–3): build the box plot. Data as a dot plot on 0–20; steppers for Q₁, Me and Q₃ (step 0,5, starting on the smallest datum, which is never a mark); the box moves with them. After checking: the right box (green, dashed) and the data of each quartile coloured. Levels: odd N (whole quartiles), even N (at least one half), 17–24 data with piles. No outliers, so the whiskers reach the ends.
- `cloud` (ap 60401–3, ak 82401–3): guess the correlation. Clouds made with a seeded Box–Muller noise and kept only when r falls in a band with gaps (strong ≥ 0,8, weak 0,35–0,6, none ≤ 0,15). Level 1: sign; level 2: five kinds; level 3: tap ŷ on the dashed line x = k (±1 counts). The regression line and the mean point appear after answering.
- `detective` (ap 60501–3, ak 82501–3): 11 errors: interval end as class mark, mean of means, Q₁ rounded down, whole position without the next datum, variance without − x̄², variance given as σ, CV upside down, mean deviation with signs, equal strata, means swapped in the regression line, the minus of x − x̄ lost. Perfect-square variances come from fixed deviation patterns (random sets almost never give one).

## Powers (ak `dbh4-akademikoak-potentziak`, route `potencias-radicales`)

Code in `dbh4-games/radicals.ts`, `PowerGames.tsx`, `powersDetective.ts`.
- `radical` (62301–3): simplify the radical. ⁿ√N (or a sum of two square roots) written as a·ⁿ√b with two steppers (outside starts at 1, inside at the first radicand; sums always give 2 or more outside, so the start is never the answer). After checking, each radicand's prime factors sit under a root sign; the groups of n are coloured and copied outside. The steppers keep the a·ⁿ√b order in Arabic (`dir="ltr"`).
- `log` (62401–3): find the exponent. log_b N with whole exponents; then negative and fractional ones (1/8, 0,01, √2; whole roots such as 4^{1/2} are shown as 2); then the base or the argument unknown. After checking, a ladder of powers of the base marks the right rung and the chosen one.
- `detective` (62501–3): 12 errors: exponents multiplied in a product or added in a power of a power, a^{−n} as −aⁿ, the places of scientific notation, √(a + b) = √a + √b, a fractional exponent upside down, only the denominator multiplied when rationalising, the conjugates giving a + b, log of a sum, log of a power as (log)ⁿ, log of a quotient as a quotient, log_b N as N ÷ b.

## Trigonometry (ak `dbh4-akademikoak-trigonometria`)

Code in `dbh4-games/trigonometry.ts`, `TrigGames.tsx`, `trigDetective.ts`. Formulas are written with `\sen` and `\tg` and turned into each language's names by the unit's `localize` (`text.ts`): sen/tg in Spanish, sin/tg in Basque, sin/tan in English and Arabic.
- `circle` (72301–3): the unit circle. A ratio of α (exact notable value) and, when needed, the sign of another ratio so that exactly one stepper angle fits (`fittingAngles`); turn the radius in steps of 15°. After checking: the right radius and its projections (cos on x, sen on y). Level 1 keeps 0°–90°; level 3 shows radians and asks tangents.
- `ratios` (72401–3): the other ratios. One ratio from a Pythagorean triple and the quadrant (level 3: a sign instead, which with the given ratio leaves one quadrant); choose the two others among four fractions each (sign changed, other leg). After checking, the triangle is drawn inside the circle with signed legs.
- `detective` (72501–3): 10 errors (cos for sen, multiplying by the tangent, sen for an elevation, sen + cos = 1, the sign of quadrant II, tg = cos/sen, reducing with 90°, area without ½, the height with cos, π rad = 360°). Exact surds (`5\sqrt{3}`) so `endValue` reads them.

Engine change: `WorkedDetectiveConfig` has an optional `localize(latex, language)` applied to the lines and the fix; `checkDetective` in the tests takes the same function (the trig test runs it in all four languages).

## Vectors (ak `dbh4-akademikoak-bektoreak`, route `vectores-rectas`)

Code in `dbh4-games/vectors.ts`, `VectorGames.tsx`, `vectorsDetective.ts`.
- `jump` (74301–3): the vector jump. Two steppers: the vector AB (level 1), the end B from A and the midpoint M (level 2), or a and b with a·u + b·v = w (level 3, u and v independent, a and b never 0). The arrows (and, after a miss, the right path dashed) appear after checking; they are clipped to the grid.
- `lines` (74401–3): find k. Two lines in general form with k in one coefficient: parallel (not the same line), perpendicular, or the line through P. The test checks that only that k in −10…10 works. Both lines are drawn after checking (the right one dashed after a miss).
- `detective` (74501–3): 11 errors (A − B, half the difference for the midpoint, the length without the root, a number times one coordinate, the slope upside down, the normal taken as the direction, the sign of the point in y − y₀ = m(x − x₀), the perpendicular slope without the minus, the parallel proportion upside down, r² taken as the radius, a distance as Δx + Δy). Points and vectors end a line as `(x,y)`; the test reads them as x·1000 + y (`checkDetective` now takes a `read` function).

## Combinatorics (ak `dbh4-akademikoak-konbinatoria`, route `combinatoria`)

Code in `dbh4-games/combinatorics.ts`, `CombinatoricsGames.tsx`, `combinatoricsDetective.ts`. The lessons write `\frac{n!}{(n-k)!}`, `\binom{n}{k}`, `n^{k}`, `n!` (no V/C symbols), and the model is chosen with two questions: order and repetition.
- `model` (84301–3): does order matter? Ten situations (podium, posts, teams, handshakes, flavours, padlock, football pool, flags, queues, shelves). Two yes/no toggles (repetition hidden when the order does not matter) and four counts (the other models with the same n and k). After checking, a decision tree lights the right path green and the chosen one red.
- `boxes` (84401–3): the box method. One ▲/▼ box per position (1–10); right when the product is the count. Level 3 has a condition (no leading 0, even, a vowel first); the canonical filling highlights the box filled first.
- `detective` (84501–3): 9 errors (adding two choices, a repetition forgotten, n!/k! as (n/k)!, order ignored or counted, repeated digits not divided out, Pascal's rule with the wrong index, two groups added, repetition allowed for different objects).

## Probability (ak `dbh4-akademikoak-probabilitatea`, route `probabilidad`)

Code in `dbh4-games/probability.ts`, `ProbabilityGames.tsx`, `probabilityDetective.ts`. The lessons write P(A∩B), P(A∪B), P(A/B) and \overline{A}.
- `tree` (86301–3): the paths of the tree. A bag (balls drawn on top with the colour's initial in each language), two draws with or without replacement, an event in words; tap the leaves (keyboard too). After checking, the leaf products and their sum (leaf values only when there are more than three). The test recomputes the event probability by listing every ordered pair of balls. Second-level branch labels sit at the end of each branch so close branches do not overlap.
- `table` (86401–3): the contingency table. Inner cells go to the numerator, a total to the denominator; P(A), P(A∩D), P(A∪D), P(D/A), P(A/D) in two contexts (girls and sport, pets and town). Level texts are plain (the hub does not render formulas there).
- `detective` (86501–3): 9 errors (favourable over unfavourable, the eleven sums as equally likely, the union without the intersection, independent events added, no replacement treated as replacement, «at least one» added, the conditional over the whole total or over the wrong group, the total probability with one branch).

## Chained percentages (ak `dbh4-akademikoak-errealak`, route `numeros-reales`)

The academic reals unit had only one own mechanic (build the interval) besides its detective and the place game borrowed from the applied unit, so `chain` (42601–3, `dbh4-games/percentChain.ts`, `PercentGames.tsx`) was added: a price and two or three rises/discounts, choose the total change (the options are the product of the multipliers, the percentages added, the last change and the sign turned); level 3 goes back to the price before one change. Only exact total changes with one decimal are kept. After answering, the price bars go step by step with ×1,2, ×0,9… Its hub art is `ChainArt` (the rest of the unit uses the applied unit's `RealsGameArt`).

## Inventory

`inventario-unidad.mjs` (matella-nueva-unidad skill) counted the games imported from `dbh4-games` as borrowed; that folder now counts as own (`SHARED_OWN`). With it every 4. DBH unit shows at least 2 own mechanics, plus a detective that the script lists apart as a pattern.
