---
name: proportzionaltasuna-dbh4ap-lab-plus
description: "4. DBH aplikatuak Proportzionaltasuna upgrade (2026-10-26), modelled on the Zatikiak 2. DBH one: full review, options A/M/L/J/V; phase 1 (A1–A5 fixes, M1 predictions, M2 endless challenges) committed 576b3da on feat/proportzionaltasuna-dbh4ap-lab-plus, fast-forwarded into main and deployed 2026-10-26 (bundle index-CeH4y5Qt); phase 2 (L2 the 100 % bar, L1 the rule of three with arrows) committed 3751d4f on feat/proportzionaltasuna-dbh4ap-lab-l1l2, fast-forwarded into main and deployed 2026-10-27 (bundle index-BZ8nV5vz); phase 3 (M3 ▶ motion, M4 interest in layers, M5 mixture seesaw with gold, L3 distance–time graph) committed 90b3caa on feat/proportzionaltasuna-dbh4ap-lab-motion, fast-forwarded into main and deployed 2026-10-27 (bundle index-buE2QkQf); phase 4 (J1 error detective, J2 bank) committed 866d9d5 on feat/proportzionaltasuna-dbh4ap-games, fast-forwarded into main and deployed 2026-10-27 (bundle index-B-ETaI-9); phase 5 (J3 meeting on the road, J4 fill the tank) committed b26ae19 on feat/proportzionaltasuna-dbh4ap-games-road, fast-forwarded into main and deployed 2026-10-28 (bundle index-BeM7dYPx); phase 6 (J5 perfect mixture, J6 shop till) committed 789f9df on feat/proportzionaltasuna-dbh4ap-games-mix, fast-forwarded into main and deployed 2026-10-28 (bundle index-CfxntXIn); phase 7 (J7 own memory boards) committed fa2ead7 on feat/proportzionaltasuna-dbh4ap-memory, fast-forwarded into main and deployed 2026-10-28 (bundle index-B5-qfK7e); phase 8 (L4 shopping receipt) committed 88b48e0 on feat/proportzionaltasuna-dbh4ap-receipt, fast-forwarded into main and deployed 2026-10-29 (bundle index-5EvrNL4x); phase 9 (M6 interest in months and days) committed 34bd45f and 486bf40 on feat/proportzionaltasuna-dbh4ap-interest, fast-forwarded into main and deployed 2026-10-30 (bundle index-DqdNpvzH); phase 10 (English thousands in the lab checks) on feat/proportzionaltasuna-dbh4ap-english-answers, not deployed yet"
---

On 2026-10-26 the owner asked for the same kind of review as [[zatikiak-dbh2-lab-plus]], this time for `src/pages/dbh4-aplikatuak-proportzionaltasuna`. The unit was built in October (see [[remaining-eso-units]]).

What the unit had:
- 15 lessons and 98 exercises;
- 9 lab tools:
  - 1. DBH classify;
  - 2. DBH compound, share, chain and interest;
  - its own growth, mixture, motion and taps;
- 2 games: race, and memory with two of its three boards taken from 2. DBH.

## Options proposed

Fixes:
- A1: the title overflows at 375 px.
- A2: lab drawings are tiny on a phone.
- A3: the motion lesson figure scrolls sideways.
- A4: some challenges are solved when the tool opens.
- A5: language slips.

Improvements to the existing tools:
- M1: predict before seeing the result.
- M2: endless challenges.
- M3: a ▶ button so that cars, the tank and the bars move.
- M4: interest bars in layers (capital, interest, interest on interest).
- M5: the mixture as a seesaw, with alloys.
- M6: simple interest that also finds C, r or t, in months and days.

New tools:
- L1: the rule of three with arrows, as a double number line.
- L2: the 100 % bar: part, total, VAT and discounts, forwards and backwards.
- L3: a distance–time graph.
- L4: a shopping receipt.

New games:
- J1: error detective.
- J2: bank offers.
- J3: meeting on the road.
- J4: fill the tank.
- J5: perfect mixture.
- J6: shop till.
- J7: new 4. DBH memory boards.

Lessons:
- V1: shorter explanations, split into cases.
- V2: a «typical mistake» box.

Order agreed:
1. A + M1 + M2;
2. L2 + L1;
3. M3 + M4 + M5 + L3;
4. J1 + J2.

## Phase 1 (branch `feat/proportzionaltasuna-dbh4ap-lab-plus`)

Committed as 576b3da, fast-forwarded into main, pushed and deployed to matella.net on 2026-10-26 (bundle index-CeH4y5Qt). Checked live at 375 px:
- the title fits in eu, es and ar;
- the four new tools ask for a prediction;
- the ∞ challenges work in growth, mixture, motion, taps, chain and the 2. DBH shares;
- there is no sideways scroll and no console error.

### A1: long titles at 375 px

This is an engine change, so it is good for every unit:
- the hero h1 sets `--hero-letters` to the length of its longest word;
- `.fraction-v2-hero-copy` is a size container;
- the font size is `min(…, 100cqi / (letters · 0.52))`.

Before, «Proportzionaltasuna» made the page 486 px wide on a phone (416 px with «Proporcionalidad»), and it also overflowed on a computer.

The mobile top-bar title now ends in «…» (`min-width: 0`, `text-overflow: ellipsis`) instead of pushing the language buttons off the screen.

### A2: the drawings in the lab

The four own tools draw on a 360-wide viewBox with `maxWidth: 520` and 14–17 px text. Before, they used a 640 viewBox and text came out about 6 px on a phone.

The 2. DBH `Board` got a `narrow` option, used by the chain tool. The other 2. DBH and 1. DBH boards are still 640 wide.

### A3: the motion lesson figure

`MotionFigure` uses a local `NarrowFigure`: a 360 viewBox with inline `minWidth: 0`, which overrides the 540 px minimum that lesson figures have. Every other lesson figure on the site still has that minimum and scrolls sideways on a phone.

### A4: challenges solved on arrival

New first states, so that no challenge starts solved:
- growth: 2000 € at 5 % for 2 years;
- mixture: 10 kg at 9,50 € and 5 kg at 6 €;
- motion: 300 km, 60 and 90 km/h;
- taps: 4 h and 6 h;
- 2. DBH share: 120 shared out over 1, 2 and 3.

The share change also affects 2. DBH, whose challenge 21301 was solved on arrival there too. A test now checks every tool in the unit for this.

### A5: languages

- The Arabic notes say «أي بزيادة 31 €» instead of «(+31 €)», and times use س and د.
- The Spanish motion note says «al cabo de 1 h 20 min».

### M1: predict before seeing the result

The four own tools hide their readout, and the result inside the drawing, until the learner predicts:
- growth: will the money reach double the capital? The tip gives the rule of 72.
- mixture: will the mean price be nearer the cheaper product, halfway, or nearer the dearer one?
- motion: will they meet before 1 h, at 1 h or after it? There is no question when they never meet.
- taps: compared with the fastest tap alone, will the tank fill sooner, just as soon, or later or never?

How it is built:
- each state has a `prediction` field;
- the setters clear it only when the case changes (in the motion tool, moving the clock does not clear it);
- `setPrediction` keeps the first guess;
- the component reuses the Zatikiak `PredictionStep`, which now takes an optional `wait` text.

The motion clock is now a `NumberField`, so the learner types the minutes. A meeting at 225 min used to take 45 taps on «+».

### M2: endless challenges (∞)

Every maker is wrapped in `freshFrom`, so no extra challenge is already solved when it appears.

The four own tools, in `labTools.ts`:
- `growthExtra`: the first year above an amount, beating simple interest by more than an amount, doubling time, or a set-up with capitalisation periods;
- `mixtureExtra`: a target price from two given prices, or how many kilos to add;
- `motionExtra`: set the clock at a meeting or a catch-up, or choose the speeds for a given time;
- `tapsExtra`: choose tap B for a given time, or open the drain for a given time.

The 2. DBH tools, in their own `labTools.ts`, so 2. DBH gets them too:
- `shareExtra`: find the numbers that give some parts, or share out a total;
- `chainExtra`: reach a final price, reach a total index, or go up and down by the same percentage;
- `interestExtra`: an exact amount of interest, the years, or the rate.

### Tests

- `tests/proportzionaltasuna-dbh4ap-extra.test.ts`:
  - every endless challenge can be solved and is not solved at the start;
  - there are more than 60 different prompts per tool;
  - every solution stays inside what the controls can set;
  - KaTeX renders, there is no Arabic inside formulas, no comma in Arabic, and no Basque case ending after a number or formula;
  - the predictions;
  - no fixed challenge is solved on arrival.
- `tests/proportzionaltasuna-dbh4ap-lab.test.ts` now builds the lesson states explicitly.
- Suite 866/866; lint and build OK.

Checked at 375 px in eu, es and ar, in 4. DBH and in the 2. DBH tools that share the code; also checked on a computer.

### Gotchas

- In the extra-challenge tests, `/\$[^$]+\$[a-z]/` also matches across two formulas («…$: behar duzu $r…»). Check the character after each formula found with `matchAll` instead.
- The `Label` from `dbh2-funtzioak-v2/plane` flips its anchor for Arabic. A legend drawn as a square and then a Label still reads left to right.

## Phase 2 (branch `feat/proportzionaltasuna-dbh4ap-lab-l1l2`, 2026-10-27)

Two new tools for the four lessons that had none of their own. The lab now has 11 tools.

Committed as 3751d4f, fast-forwarded into main, pushed and deployed to matella.net on 2026-10-27 (bundle index-BZ8nV5vz). Checked live at 375 px:
- both tools take a correct answer and have ∞ challenges;
- the lessons direct-rule, inverse-rule, percent-calc and index open them («Experimentar en el laboratorio»);
- no sideways scroll and no console error.

### L2 «La barra del 100 %»

- Tool id `percentbar`, stage percent. The lessons `percent-calc` and `index` now open it instead of the chain tool.
- Logic in `lab/percentBar.ts`, component in `lab/PercentBarTool.tsx`.
- Situation: «a % of», «rise» or «cut». The learner picks what to find:
  - the part (or the final price);
  - the total (or the price before the change);
  - the percentage (or the size of the change).
- Amounts and the rate are typed with `NumberField`, in whole euros.
- The learner writes the unknown with `ResultAnswer`, read with `readMoneyAnswer`.
  - A result with more than two decimals is expected rounded to the hundredths (`roundedAnswer`, shared with L1).
  - A rise to a lower price is flagged as impossible, with no answer field.
- The drawing:
  - the 100 % bar on top, in ten 10 % pieces;
  - the compared bar below, on the same scale, with the extra part in green for a rise or a dashed red gap for a cut;
  - an arrow between them with the index (« · 1,21 », or « : 0,75 » going back);
  - «each piece: 10 % = …».
  - The unknown shows «?» until it is written right or revealed.
- `percentSlip` catches the classic slips after a wrong check:
  - adding the % to the final price (84 € + 25 % = 105 €);
  - multiplying by the index instead of dividing.
- Challenges 43501–43504:
  - the stadium: 24 000 is the 80 %;
  - the dress: 84 € after a 25 % cut;
  - the plumber: 119 € plus 21 % VAT;
  - the insurance: 520 € down to 442 €.
- Endless `percentBarExtra`: every situation and unknown, with whole euros on both bars.
- Tests in `tests/proportzionaltasuna-dbh4ap-percentbar.test.ts`.

### L1 «Regla de tres con flechas»

- Tool id `rule`, stage simple. The lessons `direct-rule` and `inverse-rule` now open it instead of the classifier.
- Logic in `lab/ruleOfThree.ts`, component in `lab/RuleTool.tsx`.
- Seven situations, each with a fixed relation:
  - direct: price (kg → €) and distance (min → km);
  - inverse: workers, speed, food, cows and tap.
- The learner types a, b and the new c, then chooses direct or inverse.
  - A wrong choice can be changed. The feedback gives the «double → double / half» reason, styled with the Zatikiak `Prediction.css` classes.
- Only with the right relation do the bottom arrows and the answer field appear.
- Methods:
  - «Regla de tres»: one arrow, · c/a on top; on the bottom · c/a when direct, : c/a when inverse.
  - «Reducción a la unidad»: a middle column for 1 (: a then · c), with b/a or a·b on the bottom row.
- The solved cell turns green.
- `ruleSlip` warns when the written x is the other relation's result.
- Challenges 43601–43604:
  - food: 4 people, 30 days, 6 people;
  - cyclist: 12 min for 4 km, 30 min;
  - cows: 35, 60 days, 20;
  - oranges through the unit: 5 kg for 8 €, 12 kg.
- Endless `ruleExtra`: any situation; the result is whole 75 % of the time, otherwise up to two decimals.
- Tests in `tests/proportzionaltasuna-dbh4ap-rule.test.ts`.

### Checks

- Suite 874/874; lint and build OK.
- Checked at 375 px in eu, es and ar: no sideways scroll, and no SVG text outside the viewBox.

### Gotchas

- An SVG `Label` with Arabic words and a formula such as «10 % = 50 €» comes out scrambled. Wrap the formula in LRI/PDI yourself (`\u2066…\u2069`).
- Basque prompts were rewritten so that no number takes a case ending («% 25 merketu dute», not «% 25eko beherapena»).

## Phase 3 (branch `feat/proportzionaltasuna-dbh4ap-lab-motion`, 2026-10-27)

Committed as 90b3caa, fast-forwarded into main, pushed and deployed to matella.net on 2026-10-27 (bundle index-buE2QkQf). Checked live at 375 px:
- growth, mixture, motion, taps, graph, rule and percentbar in eu, es and ar: no sideways scroll and no SVG text outside its drawing;
- in Arabic, «Ver el viaje» waits for the prediction, then the cars move and the clock runs («1 h 42 min» half way).

### M3: the ▶ buttons

`lab/usePlayback.ts` runs a requestAnimationFrame progress from 0 to 1.
- The progress belongs to the case it started for, through a key. When the case changes the animation simply disappears, with no effect needed.
- With reduced motion it jumps to the end.
- The ▶ buttons sit under the drawing and wait for the prediction.

The three animations:
- Interest, «Año a año»: one year every 0.45 s.
- Motion, «Ver el viaje»: three seconds from the start to the meeting, or to 300 min if they never meet. The cars use exact float positions, and the clock shows «1 h 20 min» and turns green at the meeting. The typed clock is left as it was.
- Taps, «Llenar el depósito»: the water rises in three seconds, showing the hours that have passed. It is off when the tank never fills.

### M4: interest in layers

Each year has two bars, simple on the left and compound on the right, each in three layers:
- the capital: a fixed grey block, with a white zigzag to show that it is not to scale;
- the interest of the capital (blue): the same in both bars;
- the interest of the interest (green): only in the compound bar.

Only the interest is to scale, so 2205 € against 2200 € can now be seen. The note says how many euros are interest on interest.

### M5: the mixture as a seesaw, and gold

`MixtureState` has a `kind`:
- coffee: prices in cents;
- alloy: fineness in thousandths, `ALLOY_PURITIES` 750–1000.

Changing the kind sets two first values. Helpers:
- `mixtureMean` gives the mean in raw units;
- `mixtureMoments` gives kilos × distance;
- the coffee challenges check `kind === 'coffee'`.

The drawing:
- the loads sit on a beam that works as a ruler (5–15 €, or 0,7–1);
- after the prediction, the support (a red triangle) appears under the mean, with the two distances below it;
- when both distances are short, the second label goes lower.

The readout adds «Balancín: 12 · 2 = 8 · 3 (kilos por distancia)», with ≈ when the mean is not a whole number of cents or thousandths.

Challenges:
- New challenge 43205: the lesson's gold bar, twice as big (4 kg of 0,85 and 3 kg of 0,9).
- `mixtureExtra` also makes gold targets (25 %).
- The prediction buttons were shortened («Hacia el barato»).

### L3 «Gráfica distancia–tiempo»

- Tool `graph`, stage problems, lesson motion. The lab now has 12 tools.
- Logic in `lab/roadGraph.ts`, component in `lab/RoadGraphTool.tsx`.
- Settings:
  - meeting or chase;
  - B's start (0 km only in a chase);
  - both speeds;
  - who sets off later, and by 15–120 min.
- `graphMeeting` solves the gap between the vehicles stretch by stretch, between departures, with exact fractions. It finds, for example, A reaching B's town while B still waits.
- The plot uses axes with round steps (`niceAxis`). Each line is flat while its vehicle waits, and is clipped to the plot.
- After the right answer (or «Ver el resultado»), the meeting point appears with dashed lines to the axes.
- The learner writes the minutes since the first departure.
- Challenges 43701–43704:
  - the truck and the car an hour later (180 min);
  - the car and the motorbike half an hour later (132 min);
  - the lesson's 240 km (80 min);
  - meeting halfway with different speeds (the slower one sets off first).
- Endless `roadGraphExtra`: whole minutes, and both vehicles on the road at the meeting.
- Tests in `tests/proportzionaltasuna-dbh4ap-graph.test.ts`.

### Checks

- Suite 877/877; lint and build OK.
- Checked at 375 px in eu, es and ar: no sideways scroll, no SVG text outside the viewBox, no clipped button text.
- All three animations were checked: the button is off before the prediction, there is an in-between frame, and the end state is right.

### Gotchas

- An SVG `Label` adds its own isolate around formulas. An extra LRI/PDI around «2000 €» is harmless.
- `getStartPositionOfChar` is a reliable way to check Arabic order in SVG.

## Phase 4 (branch `feat/proportzionaltasuna-dbh4ap-games`, 2026-10-27)

Two new games, J1 and J2. The unit now has four games: race, memory, detective and bank. The games description in `index.tsx` says so.

Committed as 866d9d5, fast-forwarded into main, pushed and deployed to matella.net on 2026-10-27 (bundle index-B-ETaI-9). Checked live at 375 px:
- the detective and the bank, all three levels, in eu, es and ar: no sideways scroll, and nothing sticks out of the page;
- after the first answer, the bank shows its bars (2 on level 1, 3 on levels 2 and 3) and the verdict; in Arabic the amounts keep the € on the right («⁦210.68 €⁩»).

### J1 «Akatsen detektibea / Detective de errores»

- Game id `detective`, slugs detektibea/detective, progress ids 44301–44303.
- Logic in `games/detective.ts`, component in `games/DetectiveGame.tsx`.
- CSS: it reuses the Zatikiak `Detective.css` (sheet, lines, options) and adds its own `games/Detective.css` (the problem sentence, a label above each formula, formulas aligned left).
- Each case is a word problem with a 3-line worked solution. The template solves it twice from the same data: once right, once with the mistake. The wrong line is the first line that differs; the lines after it carry the mistake on.
- `sheet()` checks that every value is exact (cents, or 4 decimals for an index or a backwards division) before rounding. Rounding first let 0,3333 through. A sheet that is not exact is thrown away.
- Three levels, 5 mistakes each, 6 cases per game (every mistake once, plus one more):
  - proportions and percentages: direct-inverse, added-percents, percent-of-final (VAT and discounts backwards), index (a fall written as a rise, or a rise without the 1), calculation;
  - interest: months-years, simple-for-compound, rate-not-split (semesters, quarters, months), index (3 % → 1,3), calculation;
  - mixtures, taps and vehicles: mean-prices, added-hours, speeds (meeting and chase mixed up), upside-down (cost : kilos, distance : speed, 1 : part), calculation.
- The 3 options to name the mistake put the other mistakes of the same kind of problem first («Error de cálculo» is almost always one of them).
- Scoring as in Zatikiak: 1 point for the line, 1 for the kind; stars at 11/9/6.
- Tests in `tests/proportzionaltasuna-dbh4ap-detective.test.ts`:
  - every line except the wrong one checks with `evaluate`;
  - a slip breaks its line, and any other mistake is right arithmetic with a wrong idea;
  - the wrong line appears in all three positions;
  - texts render, no Basque suffix after a number, Arabic decimal point.

### J2 «Bankua / El banco»

- Game id `bank`, slugs bankua/banco, progress ids 44401–44403.
- Logic in `games/bank.ts`, component in `games/BankGame.tsx`, CSS in `games/Bank.css`.
- 6 rounds: the same capital and years for every offer; the player taps the offer that gives the most money. Then each card shows its formula and amount, bars show the interest of each offer (they grow with a CSS animation that respects reduced motion), and two sentences follow: the verdict with the difference in euros, and the lesson of the round (`bankLesson`).
- Levels:
  - simple or compound (2 offers);
  - how often the interest is paid (3 compound offers, close rates);
  - three offers of every kind.
- `createBankRounds` asks each level for a set mix of winners (for example 3 simple and 3 compound), so no kind of offer always wins. The best offer beats the next one by at least 0,2 % of the capital and never by less than 5 €.
- Stars at 6/5/4. The result also shows «Dinero que dejaste en el banco».
- `games/numbers.ts` holds `latexNumber` (thin space from 10 000) and `moneyText` (narrow no-break space).
- Tests in `tests/proportzionaltasuna-dbh4ap-bank.test.ts`:
  - the margin holds and every kind of winner shows up;
  - each formula evaluates to the amount shown (the periodic index is worked out first, because `evaluate` does not take nested brackets);
  - texts render;
  - money formatting is right.

### Checks

- Suite 883/883; lint and build OK.
- Checked at 375 px in eu, es and ar: all 18 detective cases and all 18 bank rounds per language, with no overflow and no sideways scroll.

### Gotchas

- In Arabic the «+», «=» or «≈» before an amount has to go inside the LRI/PDI isolate. Outside it, it ends up on the wrong side («7798.40 €+»).
- KaTeX centres display formulas through `.katex-display > .katex`, so aligning them left needs that selector too.
- Writing `⁦` or ` ` with the Write tool can store the raw character. Check with grep and use escapes.

## Phase 5 (branch `feat/proportzionaltasuna-dbh4ap-games-road`, 2026-10-28)

Two more games, J3 and J4. The unit now has six games, and the games description in `index.tsx` lists them.

Committed as b26ae19, fast-forwarded into main, pushed and deployed to matella.net on 2026-10-28 (bundle index-BeM7dYPx). Checked live at 375 px:
- the road and the tank, all three levels, in eu, es and ar: no sideways scroll, and nothing sticks out of the page;
- each road round shows its result and three lines of working, and each tank round solved at the first try gives 3 points.
- The pane was hidden, so `requestAnimationFrame` did not run. The check patched `matchMedia` to reduced motion, which makes `usePlayback` jump to the end, then reloaded the page.

### J3 «Errepideko topaketa / Encuentro en la carretera»

- Game id `road`, slugs errepidea/carretera, progress ids 44501–44503.
- Logic in `games/road.ts`, component in `games/RoadGame.tsx`, CSS in `games/Road.css`.
- How it plays:
  - A road seen from above, with B's lane on top and A's below.
  - The player taps or drags on the road to plant a flag. There are − and + buttons (1 km) and the arrow keys. The flag starts unplanted, so the middle of the road gives no free points.
  - «¡Salida!» drives both cars to the meeting in 3 s (`lab/usePlayback`, keyed by seed and round). The green line and its label show the real point; a red band covers the gap to the flag.
  - Then the result shows the points, the answer in words, and three lines of working (`roadSteps`) with a label above each.
- Levels:
  1. towards each other (`meet`);
  2. a chase (`chase`, B ahead);
  3. a late start (`late-meet`: B waits; `late-chase`: A leaves the same town later), 3 rounds of each.
- Every meeting point is a whole km, and the distances are multiples of 5. In a chase the road goes on past the meeting point by a random 10–100 %, so its end gives nothing away.
- Points: 100 within 1 % of the road, then fewer, and none from 15 %. 6 rounds; stars at 510/390/240.
- The topbar adds a throw's points only after the cars arrive.
- Tests in `tests/proportzionaltasuna-dbh4ap-road.test.ts`:
  - positions meet exactly at `minutes`, a late car waits, and the working holds line by line;
  - the problem text holds every number;
  - points, stars and texts.

### J4 «Bete biltegia / Llena el depósito»

- Game id `tank`, slugs biltegia/deposito, progress ids 44601–44603.
- Logic in `games/tank.ts`, component in `games/TankGame.tsx`, CSS in `games/Tank.css`.
- How it plays:
  - A target time («2 h 24 min») and a switch for each tap and for the drain.
  - «¡Llenar!» fills the drawn tank in 2.5 s with a clock. The feedback shows the sum of the parts of an hour (`tankLatex`; a single tap is just its part) and «too soon» or «too late».
  - After a miss, a hint gives the part to fill each hour.
  - 3 tries, worth 3/2/1 points. A choice already tried cannot be poured again. After the last miss the solution is shown.
- Levels:
  1. 3 taps, open 2;
  2. 4 taps, open 2 or 3;
  3. 3 taps and a drain, which is needed in 3 rounds out of 5.
- Each round is built from a real combination. The target is a whole number of minutes (30 min–10 h), and no other combination gives it (checked over every choice).
- 5 rounds; stars at 13/10/6.
- `games/numbers.ts` gained `durationText` («1 h 20 min», «1 س 20 د») and `hoursLatex` (a short decimal or a fraction).
- Tests in `tests/proportzionaltasuna-dbh4ap-tank.test.ts`:
  - a single solution, whole minutes, and the right mix of drain rounds;
  - every choice's sum evaluates to its rate;
  - texts, points and stars.

### Checks

- Suite 887/887; lint and build OK.
- Checked at 375 px in eu, es and ar: every level of both games, with no sideways scroll, and a whole road game played to the result panel.

### Gotchas

- `usePlayback`'s key must not change at the moment `play()` is called. Keying the tank by «try number» broke it: the try was added in the same click, so the progress belonged to an old key and the result never showed. It is keyed by seed and round now; each `play()` restarts from 0.
- Toggle buttons must update with `setChoice((current) => …)`. Two quick taps on the old closure kept only the last one.
- In an SVG label «أ · 80 km/h», the 80 jumps in front of the Arabic letter (European digits after an Arabic letter turn Arabic). An LRM after the letter, inside an LRI/PDI, keeps the order.
- In the pane browser `requestAnimationFrame` runs about once a second, so the 3 s animations take about 4 s there; wait 4–5 s in scripts.

## Phase 6 (branch `feat/proportzionaltasuna-dbh4ap-games-mix`, 2026-10-28)

Two more games, J5 and J6. The unit now has eight games, and the games description in `index.tsx` lists them.

Committed as 789f9df, fast-forwarded into main, pushed and deployed to matella.net on 2026-10-28 (bundle index-CfxntXIn). Checked live at 375 px: every level of both games in eu, es and ar starts, a mix shows its feedback and a wrong charge its complaint, with no sideways scroll and no drawing text outside the board.

### J5 «Nahasketa perfektua / Mezcla perfecta»

- Game id `mix`, slugs nahasketa/mezcla, progress ids 44701–44703, stage problems.
- Logic in `games/mixture.ts`, component in `games/MixGame.tsx`, CSS in `games/Mix.css`.
- How it plays:
  - A card with the price a kilo to reach (or the fineness for gold) and the task.
  - A seesaw with its support under the target. Each product sits at its distance from the support, the farther one 128 px away, so the near load needs more weight. The distances are written under the ground.
  - Two cards with − / + (on a whole mixture, + on one side takes a kilo from the other) and a slider for big moves.
  - Two blocks hold the beam level. «¡Mezclar!» («¡Fundir!» for gold) lets go: the beam stays level and turns green, or falls (0.9 s, faster and faster) until its end rests on the ground, and turns red.
  - The feedback shows the mean as a fraction (≈ when it is not a whole number of cents or thousandths), the verdict (too cheap or too dear, too low or too high), and after a miss the seesaw rule with what each side weighs now («$5\cdot 2=10$ y $5\cdot 3=15$»).
  - 3 tries, 3/2/1 points; after the last miss, the amounts and the balance («$6\cdot 2=4\cdot 3$»). 5 rounds; stars at 13/10/6.
- Levels:
  1. total fixed (coffee, tea, sweets or nuts): share out the kilos;
  2. add: one product is already in (its card is dashed and fixed), choose how much of the other (slider up to 40 kg);
  3. gold in grams: 3 whole bars and 2 to add to (slider up to 80 g).
- Every round has one answer in whole kilos (grams): never half and half, the ratio of the amounts uses numbers up to 6, the target is a multiple of 10 cents (0,01 of fineness), and neither distance is tiny.
- Tests in `tests/proportzionaltasuna-dbh4ap-mixture.test.ts`: only the answer balances (every slider setting checked), each try's working holds, the hint's products are right, texts render.

### J6 «Dendako kutxa / La caja de la tienda»

- Game id `till`, slugs kutxa/caja, progress ids 44801–44803, stage percent.
- Logic in `games/till.ts`, component in `games/TillGame.tsx`, CSS in `games/Till.css`.
- How it plays:
  - A customer (a face that goes from smiling to cross) asks a question, with a patience bar under it: 45, 60 or 75 s by level.
  - A price tag: the product, what the price is («Precio», «Sin IVA», «Rebajado», «IVA incluido», «Ha pagado»), the amount and a sticker for each change.
  - A till keypad (7 8 9 / 4 5 6 / 1 2 3 / , 0 ⌫) and «Cobrar» («Responder» going back). The keyboard works too: digits, comma or point, Backspace, Enter.
  - Right at the first try: 50 points plus up to 50 for the patience left; at the second try, half. Two tries; when the patience runs out the customer leaves. Then the working with a label on each line («Precio por el índice», «El índice total», «Precio entre el índice total»).
  - 8 customers, each with a different product; stars at 600/450/300.
- Levels:
  1. final price: a discount or VAT (books 4 %, cakes 10 %, the rest 21 %); prices end in 0 or 5 and the result has at most one decimal;
  2. original price: back from a discount or from VAT;
  3. chained: two discounts or a discount and VAT, forwards and backwards; after the first change the price is in whole euros.
- `tillSlip` names a typical slip after a wrong answer: only the discount (or VAT), the change the wrong way, the % taken from the final price, multiplying by the index instead of dividing, adding the percentages. With 50 % off the discount equals the answer, so the answer is never a slip.
- Tests in `tests/proportzionaltasuna-dbh4ap-till.test.ts`: exact cents, the working ends in the answer, every slip is spotted, reading the till, points and stars.

### Checks

- Suite 891/891; lint and build OK.
- Checked at 375 px: the mixture in es (level 1), eu (level 2, played right) and ar (gold, a miss with its hint); the till in es (level 1: a slip, then right), ar (level 3: right at the second try, and a customer leaving), eu (level 2: the «% of the final price» slip). The hub shows 8 cards, with no sideways scroll; also seen on a wide screen.

### Gotchas

- The browser pane's `key` action sends an empty key for the names «period» and «comma»; send «.» and «,». Its `type` action sends no key events at all, so the till does not see it.
- To test the till running out, move the page clock: `Date.now = () => realNow() + 80000` (`nowMs` reads `Date.now`).
- The Write tool stored LRI/PDI as raw characters again; they were turned into `\u2066`/`\u2069` escapes.
- In Arabic the verdict's value and its ≈ go inside LRI/PDI, as in the bank game.
- An amount and its € are joined with a no-break space, or «46,84» and «€» can end up on two lines.

## Phase 7 (branch `feat/proportzionaltasuna-dbh4ap-memory`, 2026-10-28)

J7: the memory game no longer borrows the 2. DBH boards. All three boards are the unit's own, in `games/boards.ts`; the progress ids stay 44201–44203.

Committed as fa2ead7, fast-forwarded into main, pushed and deployed to matella.net on 2026-10-28 (bundle index-B5-qfK7e). Checked live at 375 px: every card of the three boards in eu, es and ar fits, with no scroll bar inside a card and no sideways scroll.

- Level 1 «Lehengo prezioa / El precio de antes» (stage percent): a change written over «? → 40», and the price before it, 50. The change is in `\overset{\textstyle −20\,\%}{?\to 40}`. Only whole prices after the change (`BACK_PRICES`). When found: `40 : 0,8 = 50`.
- Level 2 «Aldiak / Periodos» (stage interest): an annual rate paid k times a year and the index of each period, `1+\frac{0{,}08}{4}` and 1,02. k is 2, 3, 4 or 12, and the rate of each period is a whole number of quarters of a point (`PERIOD_RATES`). When found: `8 % / 4 = 2 % → 1,02`.
- Level 3 «Interes konposatua / Interés compuesto»: the board this unit already had (C · index^t and the amount).
- Every board has 6 pairs with different values, and no more than two pairs of a kind (the same change, periods a year or index), so there are at least three kinds.
- The skills line and the level texts in `info.ts` are new.
- Engine: `PairsMemoryGame` reads a card to screen readers with `spokenLatex`: fractions as a/b, `\overset` as «label, formula», `\cdot`, `\to`, `\%` and the decimal comma as text. Before, a label could say «\frac{12}{100· 12}».
- The memory test in `tests/proportzionaltasuna-dbh4ap-games.test.ts` now checks the worked line of each pair and the three kinds per board.

### Checks

- Suite 891/891; lint and build OK.
- At 375 px, all 12 cards of each board in eu, es and ar, measured with the card turned over: at least 7 px to spare across, no scroll bar inside a card, no sideways scroll.

### Gotchas

- A card is about 90 px wide inside on a phone, and KaTeX writes at 1.21 times the 18 px card font. «□ −20 % → 40» with the change on the arrow (`\xrightarrow`) stuck out by up to 27 px. «1 + 8 / (100 · 12)» stuck out by 7 px; with the rate as a decimal («1 + 0,08 / 12») it fits.
- Two lines with `\begin{gathered}` fitted, but KaTeX's array is a pixel or two wider than its box, and the card's `.math-token` (`overflow-x: auto`) showed a scroll bar. `\overset{\textstyle …}{…}` gives the same two lines with no scroll bar. Test it with `offsetHeight` against `clientHeight` of `.math-token`.
- To look at one card, turn over just one: it stays up until the second click. Two turned cards hide again after 1.3 s, and screenshots often catch them half turned (blank).
- `getBoundingClientRect` of a card is skewed while it turns; use `offsetWidth`/`offsetHeight`.

## Phase 8 (branch `feat/proportzionaltasuna-dbh4ap-receipt`, 2026-10-29)

L4 «Erosketaren tiketa / El tique de la compra / إيصال الشراء». The lab now has 13 tools.

- Tool `receipt`, stage percent. The lesson `chained` now opens it instead of the 2. DBH chain tool (which stays in the lab).
- Logic in `lab/receipt.ts`, component in `lab/ReceiptTool.tsx`, CSS in `lab/Receipt.css`.
- Settings: the price without VAT (whole euros), the discount (0–90 %), the VAT (4, 10 or 21 %), a coupon of fixed euros (0–500), and the order of the three lines, each with ↑ and ↓. A 0 % discount or a 0 € coupon is greyed out and leaves the receipt.
- The receipt is drawn on a 320-wide viewBox with a torn edge. Before the answer, each line shows its operation («· 0,75», «· 1,21», «− 5») and «?»; the learner writes the total (`ResultAnswer`, read with `readMoneyAnswer`, rounded to the cent when needed). After it, every line shows its change and what is left, and the working, e.g. `(60\cdot 0{,}75-5)\cdot 1{,}21=48{,}40` (money always with two decimals).
- The note after the answer: each change multiplies by its index; swapping the discount and the VAT gives the same total; and, with a coupon, the totals with the coupon first, in the middle and last (60 €, 25 %, 21 %, 5 €: 49,91 €, 48,40 €, 49,45 €).
- A coupon bigger than what is left at its line is flagged, with no answer field.
- Challenges 43801–43804:
  - the bag: 80 €, 20 %, 21 % (77,44 €);
  - the same with the VAT first (the same total);
  - with a 5 € coupon, the order that pays least (71,39 €);
  - the book: 30 €, 10 %, 4 % VAT and a 3 € coupon last (25,08 €).
- Endless `receiptExtra`: a receipt in a given order (any order with the same total is accepted), or «the order that pays least» (about a quarter); totals exact to the cent.
- Tests in `tests/proportzionaltasuna-dbh4ap-receipt.test.ts`: the lines and totals, the six orders, the coupon places, the cheapest total, moving lines, rounding, the challenges and the endless ones.

### Checks

- Suite 895/895; lint and build OK.
- At 375 px in eu, es and ar: no sideways scroll and no SVG text outside the drawing; the total and the notes in Arabic; the coupon moved between the lines in Spanish; challenge 43801 solved in Basque.

Committed as 88b48e0, fast-forwarded into main, pushed and deployed to matella.net on 2026-10-29 (bundle index-5EvrNL4x). Checked live at 375 px: the receipt in eu, es and ar with no sideways scroll; 54,45 € accepted in es and eu with the working and the note.

### Gotchas

- `Label` (from `dbh2-funtzioak-v2/plane`) already flips an Arabic label so that it keeps the LTR position. Mirroring the x myself as well put the Arabic names off the right edge. The receipt keeps the same layout in every language.
- Amounts in the SVG are wrapped in LRI/PDI; otherwise «? €» came out as «€ ?» on the Arabic page.
- The Write tool stored the LRI/PDI marks raw again (in `ReceiptTool.tsx`); they were turned into escapes.
- Seen live: in Basque, «(% 21)» in challenge 43801 can break between «%» and «21» on a phone. The texts use ordinary spaces around % and €, like the rest of the site.

## Phase 9 (branch `feat/proportzionaltasuna-dbh4ap-interest`, 2026-10-30)

M6 «Interesa hilabete eta egunetan / Interés en meses y días / الفائدة بالأشهر والأيام / Interest in months and days». The lab now has 14 tools.

- A new tool of this unit, `calendar` (stage interest). The lesson `simple-interest` now opens it. The borrowed 2. DBH `interest` tool stays in the lab, with its challenges 21501–21504, so that progress already earned is kept.
- Logic in `lab/calendar.ts`, component in `lab/CalendarTool.tsx`, CSS in `lab/Calendar.css`.
- `lab/DecimalField.tsx` and `lab/decimalInput.ts`: a field like `NumberField` that takes up to two decimals (3,2 %, 448,80 €). Each language has its own decimal mark: 3,2 in eu and es (18.700 and 18 700 are thousands), and 3.2 in en (18,700 is thousands) and ar. It formats its text again when the language changes.
- Controls:
  - the unknown: interest, principal, rate or time;
  - the unit: years, months or days;
  - the three known values.
- Changing the unknown keeps the case: the old unknown keeps its value (I = 30 € → «which principal gives 30 €?»).
- Changing the unit converts the time when the result is exact (6 months = 180 days). The answer then still holds, unless the unknown is the time.
- The drawing:
  - one row is one year, with the interest of one year and of one month (or day) above it;
  - 12 squares per row, one month each, or 30 days each;
  - in years, each square is one year, with up to 10 squares;
  - the squares are filled up to t;
  - tapping a square sets the time (8 months, or 240 days in days), with one empty year after the filled ones so the time can grow;
  - each square is a button with its time as its name, for the keyboard and screen readers;
  - when the time is the unknown, the squares do not respond, because the time is what the learner has to find.
- Before the answer, the unknown shows as «?».
- After the answer:
  - the formula in two lines: with letters, then with the data and the result;
  - why the divisor is 1200 or 36 000;
  - for the interest, what you would get by taking the months or days as years («12 times as much»).
- An unknown outside the field limits (rate above 30 %, time beyond the drawing) gives a note and no answer field.
- English answers: the tool reads «18,700» typed on the English page as 18 700 in the challenge checks too. Since phase 10 this goes through the shared `typeLabAnswer` / `readLabAnswer` (see below).
- Challenges 43901–43905 come from the lesson:
  - 6000 € at 3 % for 8 months → 120;
  - 1000 € at 4 % for 4 months → 13,33;
  - 448,80 € at 3,2 % in 9 months → C = 18 700;
  - 120 000 → 126 750 in 6 months → r = 11,25;
  - 3600 € at 5 % giving 30 € → 60 days.
- Endless `calendarExtra`: any unknown and any unit (months and days more often), with every answer exact. The hint is the formula with letters.
- In passing:
  - English fix in the 2. DBH `interestExtra`, which said «años» in English;
  - English fix in `receiptData`, which had Spanish words in English.
- Tests in `tests/proportzionaltasuna-dbh4ap-calendar.test.ts`:
  - the lesson cases, the working and the units;
  - changing the unknown, the unit and the data;
  - English answers with commas;
  - the decimal fields;
  - the challenges, and 300 endless seeds.
- The text checks run in four languages:
  - Basque: no case ending on a number (now also `ez`);
  - Arabic: no `{,}`;
  - English: no decimal comma;
  - es/eu: no space that can break a number from € or %.

### Checks

- Suite 923/923; lint and build OK. The unit inventory gives OK (9 own tools).
- At 375 px, no sideways scroll and no SVG text outside the drawing:
  - eu: challenge 1 data, 120 €;
  - es: principal 18 700 from 448,80 € and 3,2 %, and challenge 43903 solved;
  - en: 120,000 and 6,750 typed with commas, 11.25, and challenge 43904 solved;
  - ar: 60 days, and challenge 43905 solved;
  - es: years mode and the note for an impossible unknown.
  - es: tapping the 18-month square sets 18 months and fills a year and a half.

Committed as 34bd45f and 486bf40, fast-forwarded into main, pushed and deployed to matella.net on 2026-10-30 (bundle index-DqdNpvzH). Checked live at 375 px:
- eu, es, en and ar: the tool opens with no sideways scroll and no SVG text outside the drawing;
- tapping the 10-month square sets 10 months in each language;
- es: 50 € is accepted, with the working in two lines and the «12 veces más» note.

### Gotchas

- The Write tool stored the LRI/PDI marks and no-break spaces raw again; they were turned into escapes.
- The first version wrote the formula in one line, which gave a scroll bar at 375 px. It is now two lines.
- The lesson itself writes «1200ez» and «36 000z» in Basque: a case ending on a number. This phase does not change the lesson; the owner should decide.

## Phase 10 (branch `feat/proportzionaltasuna-dbh4ap-english-answers`, 2026-10-30)

Open item 1 of `idioma-ingles.md`, for this unit. On the English page, an answer such as «30,000» passed the «Your result» check (`ResultAnswer` takes the commas out), but the challenge checks read it as 30. Five tools had this: the receipt, the 100 % bar, the rule of three, the graph and the calendar.

- `answers.ts` has two new helpers:
  - `LabAnswer` (`answer` plus `english?`);
  - `typeLabAnswer(state, patch, language)`, which the tools call from `ResultAnswer`'s `onChange` and which records whether the answer was typed on the English page;
  - `readLabAnswer(state)`, which takes out the thousands commas (`englishDigits`) only for those answers and then reads them as before (`readMoneyAnswer`).
- Every check of a typed answer in `percentBar.ts`, `ruleOfThree.ts`, `receipt.ts` and `roadGraph.ts` now goes through `readLabAnswer`. That includes the slips (`percentSlip`, `ruleSlip`).
- Each state has `english?: boolean`. A state without it reads as before.
- The calendar dropped its own `reading` field and uses the same helpers.
- A flag left over after a new case does no harm: it only says which page the next answer comes from.
- Tests in `tests/proportzionaltasuna-dbh4ap-english-answers.test.ts`:
  - the reader, in English and in Spanish;
  - in English, «2,178» on the receipt, «1,800» on the 100 % bar, «3,000» in the rule of three, and a meeting minute on the graph;
  - in Spanish, the same «2,178» stays two point one seven eight.

### Checks

- Suite 925/925; lint and build OK.
- At 375 px, en: challenge 1 of the 100 % bar (24,000 fans at 80 %), answered «30,000», gives «Correct!» and «Completed!». That is the exact case of the open item.
- es: the calendar still accepts its answer.

