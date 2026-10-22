---
name: zatikiak-dbh2-lab-plus
description: "2. DBH Zatikiak lab upgrade: phase 1 (L1 bars + L2 expression) deployed 2026-10-21; phase 2 (M1 extra challenges + M2 predictions) deployed 2026-10-21; phase 3 games J1+J2 deployed 2026-10-22; J6 Rebajas deployed 2026-10-22; M4 deployed 2026-10-22; L3 deployed 2026-10-22; L4 built 2026-10-22 on claude/eloquent-darwin-nhotrt (7873d14), waiting for the owner to merge; options left: L5, M3, J3–J5"
---

On 2026-10-21 the owner asked for a review of the 2. DBH Zatikiak lab and games. From the proposed options the owner chose phase 1: L1 «Problemas con barras» + L2 «Desmonta la expresión».

Later phases:
- M1 (endless challenges) + M2 (predict before calculating) for the existing tools;
- then games J1 (exact target, Cifras-style) + J2 (error detective).

Phase 1 is done: commit eb305df on `feat/zatikiak-dbh2-lab-plus`, fast-forwarded into main, pushed and deployed to matella.net on 2026-10-21 (bundle index-B5a-z_0N); checked live.

L1 «Problemas con barras»:
- logic in `lab/barModel.ts`: a first part, plus an optional second part taken from the total or from «lo que queda»; known and asked segment; worked steps;
- `lab/BarModelTool.tsx` and `BarModel.css`;
- tool id `bars`, stage proportionality, lesson fraction-of; challenges 1501–1504.

L2 «Desmonta la expresión»:
- `lab/expression.ts`: tokens and parse tree; tapping a ready operation reduces it; a wrong tap gives every rule broken, the focus ops and the wrong-order result;
- `lab/ExpressionTool.tsx` and `Expression.css`;
- tool id `expression`, stage operations, lessons combined + powers; 8 presets; challenges 1601–1604 (clean runs).

Tests: `tests/zatikiak-bars.test.ts` and `tests/zatikiak-expression.test.ts`. Suite 810/810, lint and build OK. Checked at 375 px in eu, es and ar.

Gotchas:
- MathText rewrites ':' to ÷, and this unit writes division as \div.
- Use --success/--error for right/wrong highlights: in the operations stage --second is blue.
- On mobile the page doesn't scroll via window.scrollTo; use the computer scroll action.
- New CSS lives in its own files, because 28 units import `lab/Lab.css`.

Phase 2: commit 70106f9 on `feat/zatikiak-dbh2-lab-m1m2`, fast-forwarded into main, pushed and deployed 2026-10-21 (bundle index-C6w4bNdc); checked live.

M1, endless challenges:
- the shared `ChallengePanel` in `features/unit-v2/lab/LabKit.tsx` takes an optional `extraChallenges` maker (`LabChallengeMaker` in `types.ts`), shown as an ∞ dot;
- extra challenges are not saved as progress, and a session counter shows how many were solved;
- makers for the 8 old tools are in `lab/extraChallenges.ts`, each wrapped with `freshFrom` so a challenge never starts solved;
- prompts use $formulas$, and Basque prompts never put a suffix after a number;
- a tool uses the default makers only when it has no `challenges` prop of its own, so 1. DBH gets no extras;
- tests in `tests/zatikiak-extra.test.ts`.

M2, predict before calculating:
- `PredictionStep.tsx` and `Prediction.css`; a `prediction` field on Sum, Product and Proportion state, reset by `freshQuestion`;
- references:
  - addition: compared with 1;
  - subtraction: sign (negative, zero or positive);
  - multiplication and division: compared with the first fraction;
  - fraction or percent of a quantity: compared with half of the quantity;
- the answer field opens only after a prediction;
- this also reaches 1. DBH, which shares the components;
- tests in `tests/zatikiak-prediction.test.ts`.

Also fixed: the Arabic answer placeholder now uses LRI/PDI and no «مثال:».

Suite 815/815, lint and build OK. Checked at 375 px in eu, es and ar.

Phase 3: commit e676c53 on `feat/zatikiak-dbh2-games-j1j2`, fast-forwarded into main, pushed and deployed 2026-10-22 (bundle index-DGxbDOg5); checked live.

Options from the 2026-10-21 proposal that are still open:
- lab: L3 prime scissors, L4 fraction to decimal, L5 number-line zoom;
- existing tools: M3 animations, M4 checked steps;
- games: J3 balance, J4 pyramid, J5 order train, J6 sales.

J1 «Helburu zehatza / Objetivo exacto»:
- `games/exact.ts`: rounds built from a real combination of the cards, so they are always solvable; an iterative-deepening solver gives hints from the current cards;
- `ExactGame.tsx` and `Exact.css`;
- id `exact`, slugs helburua/objetivo; progress ids 1001–1003; 5 rounds; 100 points per round, 50 with a hint; stars at 450/300/150.

J2 «Akatsen detektibea / Detective de errores»:
- `games/detective.ts`: each line carries its value, and the wrong line is exactly where the value changes;
- 10 mistake kinds over 3 levels (sums, products, combined);
- `DetectiveGame.tsx` and `Detective.css`;
- id `detective`, slugs detektibea/detective; progress ids 1101–1103; 6 cases, 1 point for the line and 1 for the kind; stars at 11/9/6.

Tests: `tests/zatikiak-exact.test.ts` and `tests/zatikiak-detective.test.ts`; `tests/zatikiak-games.test.ts` now expects 6 games. Suite 819/819, lint and build OK. Checked at 375 px in eu, es and ar.

Gotcha: a `.x > span` rule also hits MathText's root span (it shrank the target and the statement). Give labels their own class. Formula overrides need `.game .x .math-text .math-token` specificity.

J6 «Merkealdiak / Rebajas», recommended by me and accepted by the owner on 2026-10-22, was committed as b564431 on `feat/zatikiak-dbh2-sales`, fast-forwarded into main, pushed and deployed 2026-10-22 (bundle index-qRXAIX-C); checked live.
- Code: `games/sales.ts`, `SalesGame.tsx` and `Sales.css`; id `sales`, slugs merkealdiak/rebajas; progress ids 1201–1203; stage proportionality.
- Why this one: the proportionality stage had 7 of the unit's 12 challenges but only 1.5 games.
- Levels:
  - L1: pay or save with a % or fraction discount;
  - L2: compare 2–3 offers (%, fraction off, «pagas a/b», n × m);
  - L3: chained discounts, chained against single, and the original price.
- Wrong options come from typical mistakes; after answering, price bars and steps are shown.
- Stars: 6 → 3, 4 → 2, 3 → 1.
- Arabic: `say()` wraps «$formula$ €» in LRI/PDI. Basque offer labels use «Deskontua: % 25», so there is no suffix after a number.
- Tests in `tests/zatikiak-sales.test.ts`; suite 821/821.

M4 «Pasos con corrección» (2026-10-22) was committed as 1ab7ce7 on `feat/zatikiak-dbh2-sum-steps`, fast-forwarded into main, pushed and deployed 2026-10-22 (bundle index-BWKQFznW); checked live in 2. and 1. DBH.
- In Suma y resta, `lab/SumWorksheet.tsx` and `SumWorksheet.css` replace the single result field with optional steps: common denominator, both numerators, numerator of the result, simplified result. Each step written is checked on its own.
- Logic `markSumWorksheet` in labTools:
  - any common multiple counts, with a note if it is not the least one;
  - the numerators are judged over the learner's common denominator, and the result numerator waits while an earlier step is wrong;
  - the result is right when simplified or written as a mixed number.
- `normalizeDigits` is now exported from the shared fraction module, so the steps accept Arabic digits.
- 1. DBH gets it too, because it shares SumTool.
- Tests in `tests/zatikiak-worksheet.test.ts`; suite 826/826.

L3 «Factores primos», the next option after the owner's «ADELANTE» on 2026-10-22, was committed as 13261d7 on `feat/zatikiak-dbh2-primes`, fast-forwarded into main, pushed and deployed 2026-10-22 (bundle index-BC4YSreS); checked live.
- Code: `lab/primes.ts`, `PrimesTool.tsx` and `Primes.css`; tool id `primes`, stage equivalence; the lesson `simplification` now opens it.
- How it works: numerator and denominator are rows of prime tiles. Tapping a tile above and the same prime below crosses them out; a mismatch gives a warning.
- Readout: the fraction with \cancel, the irreducible result, and once complete the m.c.d. (what was crossed out) and the m.c.m. (crossed out once × what is left).
- Challenges 1701–1704 (84/126, gcd of 60 and 90, lcm of 12 and 18, three pairs), plus endless extras.
- Tests in `tests/zatikiak-primes.test.ts`; suite 830/830.
- Gotchas:
  - MathText has an `inline` prop: a lone formula is otherwise rendered in display mode, as a centred block;
  - keep `direction: ltr` on the formula rows only, or Arabic sentences get their punctuation in the wrong place.

L4 «De fracción a decimal» (2026-10-22, first cloud session) was committed as 7873d14 on `claude/eloquent-darwin-nhotrt` and pushed; the owner merges and deploys from the Mac. Not deployed yet.
- Scope chosen by the owner: exact, pure periodic and mixed periodic, with the 2-and-5 rule. 1. DBH Hamartarrak only teaches exact/periodic and 3. DBH Arrazionalak the full classification, so the 2. DBH lesson `percentages` («Fracciones, decimales y porcentajes») got a fifth fact, «Exacto, puro o mixto», to say the same as the lab.
- Interaction chosen by the owner: predict first, then watch. The learner predicts the kind from the denominator's prime tiles; the division opens only after the prediction, and right/wrong is shown when the division ends.
- Code: `lab/decimals.ts` (`longDivision`, `divisionKind`, `denominatorFactors`, `kindFromFactors`, state helpers), `DecimalsTool.tsx` and `Decimals.css`. It reuses `pairAll`/`primesSummary` from `lab/primes.ts` for the crossed-out denominator factors, the `.primes-tile` classes from `Primes.css` and the `.prediction` classes from `Prediction.css`.
- Tool id `decimals`, stage proportionality; the lesson `percentages` now opens it instead of `proportion` (`proportionality` still opens `proportion`).
- What it shows: the denominator in prime tiles (the ones that simplify away crossed out), three prediction buttons, «Siguiente cifra» / «Hasta el final» / «Empezar de nuevo», the quotient in boxes (anteperiodo mustard, periodo green with a bar on top), a step list «70 ÷ 12 | 5 | 10» that scrolls to the last step, and chips with every possible remainder (0 … d−1), the repeated one in coral.
- Limits: numerator 1–999, denominator 2–40 (40 chips still fit at 375 px; 1/29 gives 28 steps).
- Challenges 1801–1804: 3/8 to the end; a pure periodic with a 6-digit period (1/7, 1/13, 1/21); a mixed periodic with 2 digits before the period (1/12); a denominator with a 3 that still gives an exact decimal, not a whole number (3/6). Endless extras ask to divide a random fraction (30 % with both terms doubled or tripled) and only count a right prediction.
- Tests in `tests/zatikiak-decimals.test.ts` (every n ≤ 200, d ≤ 40: steps, stop rule, value given back with BigInt, kind from the factors, anteperiodo length = max exponent of 2 and 5); suite 836/836, lint and build OK. Checked at 375 px in eu, es and ar with Playwright (`playwright-core` in the scratchpad, `executablePath` `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, language via `localStorage.i18nextLng`, route `#/matematika/dbh2/zatikiak/laboratorio/decimals`): no horizontal overflow, no console errors.
- Gotchas:
  - V2 units only have eu/es/ar (`UnitLanguage`); English falls back to Basque, so there are no English texts.
  - Arabic counts change the noun's form with the number, so «12 بواقٍ» is avoided: the chips say «عددها 12 فقط».
  - In Basque UI text, «0ra», «12rekin» and the like are suffixes after a number: write «Adibidez: 1/12.» or «hondarra inoiz 0 ez bada». The test checks the challenge texts for it.
  - Writing `\u2066` inside a tool parameter can land as the raw invisible character; use the `ltr()` helper with escapes instead.

