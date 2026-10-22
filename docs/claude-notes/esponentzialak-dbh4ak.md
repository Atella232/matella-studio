---
name: esponentzialak-dbh4ak
description: 11th 4. DBH akademikoak unit (Funciones exponenciales, logarítmicas y trigonométricas): folder, ids, reuse, deployed 2026-10-20
---

Started 2026-10-20 when the owner said «ahora» after [[polinomikoak-dbh4ak]] was deployed. Course topic `funciones-exponenciales` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-esponentzialak`, storagePrefix `matella-esponentzialak-dbh4ak`, page `EsponentzialakDbh4AkIntroPage`, branch `feat/exponenciales-dbh4ak`. Sources: Santillana Ac. U11 (scanned, rendered with render.swift) + exp/log part of Anaya Ac. U5.

Stages exponential/growth/logarithmic/trigonometric/transforms; topics exp-graph, exp-values, exp-shifts, growth, decay, exp-equations, log-values, log-graph, log-shifts, trig-values, sine, cosine, amplitude, period, tangent. Uses the Trigonometría `say`/`same` (\sen, \tg → sen/sin, tg/tan per language; tests must `localize` lesson formulas) and `readExponentialAnswer` (trig reader + drops «x =»). Periods are asked as «aπ, ¿cuánto vale a?». Reused figures: aplikatuak grafikoa Exponential/Growth, potentziak LogDefinition/PowerRules, trigonometria UnitCircle; 10 new figures with a `TrigPlane` helper (x axis in π/2 steps).

Phase 1+2 486e519 (diag 6001–6008, practice 1–20, challenges 101–115, bank 1–50). Lab 361dec6: grafikoa exponential, potentziak ladder, trigonometria circle with their ids + new shift 791xx, growth 792xx, log-shift 793xx, wave 794xx. Games (race 80101–80105, memory 80201–80203: powers, logarithms, periods of cos kx — cos only so cards are the same in every language). Full suite 747/747, lint and build OK. Merged to main (fast-forward 148c90b), pushed and deployed 2026-10-20 (bundle index-C4Xd_E6R).

Next 4. DBH akademikoak units: estadistica, combinatoria, probabilidad. Gotcha: long browser checks time out at 45 s when the pane is hidden — split them into one call per level.
