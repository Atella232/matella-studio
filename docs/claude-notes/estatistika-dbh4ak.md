---
name: estatistika-dbh4ak
description: "12th 4. DBH akademikoak unit (Estadística): folder, ids, reuse, phase progress; deployed 2026-10-20"
---

Started 2026-10-20 when the owner said «dale continua» after [[esponentzialak-dbh4ak]] was deployed. Course topic `estadistica` in dbh4-akademikoak, folder `src/pages/dbh4-akademikoak-estatistika`, storagePrefix `matella-estatistika-dbh4ak`, page `EstatistikaDbh4AkIntroPage`, branch `feat/estadistica-dbh4ak`. Sources: Santillana Ac. U12 (scanned, rendered to scratchpad s12/) + Anaya Ac. U10 «Distribuciones bidimensionales» (a10.txt; qualitative r and regression, no covariance).

Stages data/centre/position/spread/two; topics sampling (simple, systematic, stratified n·Nᵢ/N), frequencies, intervals, mean (weighted, joined groups, missing datum), median-mode, grouped-centre, quartiles (Anaya N·k/100 rule, same as aplikatuak), percentiles, box-plot, mean-deviation, variance, cv, scatter, correlation, regression (ŷ − ȳ = m(x − x̄)). Heavy reuse of the 2. DBH and 4. DBH aplikatuak statistics figures, stats.ts and readStatisticsAnswer; own data.ts (600 students in 4 courses, goals of 30 matches x̄ 1,8 σ² 1,76, groups 20·6,5 + 30·7,2, sport hours with outlier 15, waiting times) and stats.ts (allocate, joinedMean, meanDeviation, tableMedian); 6 new figures.

Phase 1 e4fc4b5 (diag 6101–6108, practice 1–20, challenges 101–115, bank 1–50). Lab 2130dce: 12 tools (2. DBH cumulative/centre/histogram + aplikatuak intervals/percentile/whiskers/table/scatter with their ids, new strata 811xx, balance 812xx, deviation 813xx, transform a·x+b 814xx); also made the 2. DBH and aplikatuak stats lab readouts split at \quad (they overflowed on phones). Games 71a068a (race 82101–82105, memory 82201–82203). Full suite 765/765, lint and build OK. Merged to main (fast-forward 71a068a), pushed and deployed 2026-10-20 (bundle index-ft_Rhq8N).

Gotchas: lab boards are 640 wide and shrink to ~330 px on phones, so board text needs size ≥ 20; long data lists in race prompts must be one $…$ per item or KaTeX won't wrap.

Next 4. DBH akademikoak units: combinatoria, probabilidad.
