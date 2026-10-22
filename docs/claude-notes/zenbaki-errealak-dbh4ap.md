---
name: zenbaki-errealak-dbh4ap
description: "4. DBH split into aplikatuak/akademikoak; first applied unit Zenbaki errealak complete on branch, not deployed"
---

Goal (user, 2026-10-02): during the 1st evaluation, have the FIRST unit of every course available, even before finishing 1./2. DBH. 4. DBH has two maths: `dbh4-aplikatuak` (Santillana Aplicadas, 9 topics) and `dbh4-akademikoak` (Santillana Académicas, 14 topics).

Zenbaki errealak (`/matematika/dbh4-aplikatuak/numeros-reales`, folder `src/pages/dbh4-aplikatuak-errealak/`): all phases done — 17 lessons, content, lab (8 tools, 32 challenges, ids 401xx–408xx), games (race 41101–5, line placing 41201–3, memory 41301–3). Sources: Santillana Aplicadas unit 1 + Anaya Aplicadas unit 3 (radicals).

Status 2026-10-02: merged into main (fast-forward, includes fix/funtzioak-quality) and deployed to matella.net.

Shared engine changes in that branch: race/memory use `localLatex` (Arabic decimal point); `.fraction-v2 .math-text` no longer forced LTR (only `.math-token`/`.katex`), fixing Arabic sentence order in every unit.

Next (after the academic unit, see [[errealak-ehunekoak-dbh4ak]]): other courses' first units — confirm order with the user. See [[funtzioak-dbh2]], [[remaining-dbh1-units]].
