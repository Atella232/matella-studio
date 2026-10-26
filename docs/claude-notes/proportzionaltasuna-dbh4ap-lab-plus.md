---
name: proportzionaltasuna-dbh4ap-lab-plus
description: "4. DBH aplikatuak Proportzionaltasuna upgrade (2026-10-26), modelled on the Zatikiak 2. DBH one: full review, options A/M/L/J/V; phase 1 (A1–A5 fixes, M1 predictions, M2 endless challenges) built on feat/proportzionaltasuna-dbh4ap-lab-plus, not merged or deployed yet"
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
