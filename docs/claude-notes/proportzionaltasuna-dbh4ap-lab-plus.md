---
name: proportzionaltasuna-dbh4ap-lab-plus
description: "4. DBH aplikatuak Proportzionaltasuna upgrade (2026-10-26), modelled on the Zatikiak 2. DBH one: full review, options A/M/L/J/V; phase 1 (A1–A5 fixes, M1 predictions, M2 endless challenges) committed 576b3da on feat/proportzionaltasuna-dbh4ap-lab-plus, fast-forwarded into main and deployed 2026-10-26 (bundle index-CeH4y5Qt); phase 2 (L2 the 100 % bar, L1 the rule of three with arrows) committed 3751d4f on feat/proportzionaltasuna-dbh4ap-lab-l1l2, fast-forwarded into main and deployed 2026-10-27 (bundle index-BZ8nV5vz); phase 3 (M3 ▶ motion, M4 interest in layers, M5 mixture seesaw with gold, L3 distance–time graph) committed 90b3caa on feat/proportzionaltasuna-dbh4ap-lab-motion, fast-forwarded into main and deployed 2026-10-27 (bundle index-buE2QkQf); phase 4 (J1 error detective, J2 bank) committed 866d9d5 on feat/proportzionaltasuna-dbh4ap-games, fast-forwarded into main and deployed 2026-10-27 (bundle index-B-ETaI-9)"
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
