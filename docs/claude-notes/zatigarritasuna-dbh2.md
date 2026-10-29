---
name: zatigarritasuna-dbh2
description: Zatigarritasuna DBH2 unit (started 2026-09-27) — sources, scope, notation and phase progress
---

Second unit rebuilt on the V2 engine after Zenbaki osoak (see [[v2-redesign-direction]]). Branch `feat/zatigarritasuna-dbh2`, route `matematika/dbh2/divisibilidad`, code in `src/pages/dbh2-zatigarritasuna/`.

Sources the owner gave: class follows **Santillana 2 ESO, unit 1** (divisibility part, book pages 14–19; only the solutions manual PDF was available), plus two Basque class handouts: "Zatigarritasun irizpideak" (rules for 2, 3, 5, 7, 10, 11 — the 7 rule: remove last digit, subtract its double) and "Buruketak ZKH eta MKT" (4 steps: ZKH ala MKT? → faktorizatu → kalkulatu → emaitza esaldi gisa unitateekin; lepokoak 9/12/15 bola, 4/6/8 mm example). Scanned PDFs can be read by rendering with a Swift PDFKit script (no poppler on this Mac).

Scope (owner): multiploak, zatitzaileak, zatigarritasun irizpideak, ZKH eta MKT, buruketak. Notation: Basque Zat(a)/ZKH/MKT, Spanish Div(a)/m.c.d./m.c.m., Arabic formulas use the Basque notation (via `notation()` in `notation.ts`; engine allows per-language `example`/step `math`).

Phases like Zenbaki osoak: 1) lessons + route [done 2026-09-27, commit ffc9847, not merged], 2) diagnostic, practice, challenges [done 2026-09-27, commit 2eea8be, `content.ts`; tests recompute every ZKH/MKT], 3) lab [done 2026-09-27, commit 26d4435: 7 tools / 27 challenges in `lab/`, number theory in `math.ts`], 4) games [done 2026-09-27: race, hunt, factor, memory in `games/`; `basque.ts` gives 3ren/5en and 9rekin/10ekin]. All four phases done; merged to main (fast-forward, 95d187f) and deployed to matella.net on 2026-09-27. DBH2 topic order is now Zenbaki osoak → Zatigarritasuna → Zatikiak (owner's class order, in `src/data/courses.ts`). Gotcha: MathText turns a bare ':' into ÷ — write division as `\mathbin{:}` inside $…$.

**2026-10-29 · «ZKH ala MKT?» tool, 8 → 15 cards.** `problemCards` in `lab/labTools.ts` now holds 15 cards (7 ZKH, 8 MKT); new ids: `cyclists`, `teams`, `square`, `trees`, `pills`, `notebooks`, `gears`. The list is shared: the 1. DBH lab (`dbh1-zatigarritasuna-v2`, `introSortChallenges` 3801–3803) imports the same cards through `SortTool`, so one edit covers both courses. Challenge ids unchanged; 1703 wording says «quince/hamabost». Test in `tests/zatigarritasuna-lab.test.ts` checks 15 cards, unique ids and the 7/8 split. Checked at 375 px in eu/es/ar, no overflow. Not merged or deployed yet (branch `feat/zkh-mkt-sort-cards`).
