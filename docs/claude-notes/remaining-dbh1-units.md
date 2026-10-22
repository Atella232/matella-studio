---
name: remaining-dbh1-units
description: Owner's standing order (2026-09-28) — finish DBH1 Zatikiak, then Aljebra, Geometria, Estadística on the V2 engine; progress log to resume after interruptions
---

On 2026-09-28 the owner asked to rebuild, one after another and until finished, the remaining legacy 1. DBH units: Zatikiak → Aljebra → Geometria → Estadística, each with the 4 phases (lessons, content, lab, games) like [[zatigarritasuna-dbh1]]. If the session stops (usage limit), resume from this log when the owner says «sigue».

**Why:** the owner wants all DBH1 units at the V2 level.

**How to apply:** one branch per unit, chained (each starts from the previous unit's branch). Do NOT deploy without asking (affects students); ask once at the end to merge + deploy all. Sources: Obsidian `…/LIBROS/1_ESO/Santillana/Unidad_XX` and Anaya `Libro_Estandar` (Swift PDFKit script `txt.swift` extracts text).

Progress:
- Zatikiak DBH1 — DONE 2026-09-28 on branch `feat/zatikiak-dbh1` (not merged/deployed): c8b27a3 lessons (15), 525cc10 content, 0fdf35b lab (8 tools/32, ids 51xx–58xx; DBH2 fraction tools take `challenges`, NumberLineTool `ranges`, ProportionTool `modes`), 96678a8 games (race 5 circuits + target/wall/memory with `config`; ids 61xx–64xx). Legacy DBH1 zatikiak pages + legacy games (Pizza/FractionMemory/FractionRace/GamesHubDBH1 and their tests) deleted; CSS used by DBH2 algebra/ekuazioak moved to `src/styles/legacy-unit/`.
- Aljebra DBH1 — DONE 2026-09-28 on branch `feat/aljebra-dbh1` (chained after zatikiak; not merged/deployed): 79ac449 lessons (14), 51cae3b content, 2c33d5c lab (5 new tools / 19, ids 71xx–75xx), games commit after it (race 5 circuits, balance, memory; ids 81xx–83xx). `algebra.ts` = linear expressions/equations/terms helpers.
- Geometria DBH1 — DONE 2026-09-28 on branch `feat/geometria-dbh1` (chained after aljebra; not merged/deployed): 95bcc05 lessons (16), 10ef907 content, 1dfbf89 lab (5 new tools / 20, ids 91xx–95xx), 316b38a shared PairsMemoryGame in engine (`features/unit-v2/games/PairsMemoryGame.tsx` + `pairsMemory.ts`), games commit after (race, angle estimation, memory; ids 101xx–103xx).
- Estadística: DONE — 13 lessons (519f441), content (5a13843), lab 5 tools ids 111xx–115xx (799d32c), games race/mean-estimate/memory ids 121xx–123xx (359d773).
- 2026-09-28: all four units fast-forwarded into main (359d773), pushed and deployed to matella.net at the owner's request. Standing order complete.
