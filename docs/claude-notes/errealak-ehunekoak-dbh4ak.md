---
name: errealak-ehunekoak-dbh4ak
description: "First 4. DBH akademikoak unit (Números reales y porcentajes) complete on branch feat/dbh4-akademikoak-1, not deployed"
---

Zenbaki errealak eta ehunekoak (`/matematika/dbh4-akademikoak/numeros-reales`, folder `src/pages/dbh4-akademikoak-errealak/`), built 2026-10-02 following Santillana 4.º Académicas unit 1 (solutions book, scanned). Anaya Académicas U1 also covers radicals/logs, but those belong to the course's unit 2 (Potencias, radicales y logaritmos), so they were left out.

Five stages: rational, reals, approx (intervals + approximations), percent, interest; 18 lessons. Reuses a lot of the applied unit ([[zenbaki-errealak-dbh4ap]]): reals.ts, the real line, 6 figures, 5 lab tools, race questions (exported), PlaceGameView, memory generatrix board. Own: percent.ts, 12 figures, Pythagoras / chained-percent / interest lab tools (ids 409xx–411xx), games (ids 421xx–423xx).

Status: merged into main (fast-forward, up to 832b160) and deployed to matella.net on 2026-10-02.

Gotcha learnt: Chrome ignores LRI/PDI isolates inside SVG text, so in Arabic figure labels keep formulas in their own <text>, never mixed with Arabic words. Basque suffixes after generated numbers (% 5ean, 1200en) depend on pronunciation: phrase generated prompts without suffixes.
