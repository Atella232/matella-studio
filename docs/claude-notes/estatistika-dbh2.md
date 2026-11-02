# Estatistika eta probabilitatea 2. DBH

Folder `src/pages/dbh2-estatistika-v2`, route `matematika/dbh2/estadistica-probabilidad/*`. Stages: tables, graphs, centre, spread, chance. Lab 6 tools (261xx…); games race 351xx and memory 352xx.

## Own games (2026-11-02)

Branch `feat/estatistika-dbh2-games` (stacked on the other 2. DBH game branches). Three games of this topic:
- `missing` (`games/missing.ts`), 35301–35303: the missing card. A card face down and a target: level 1 the mean of five marks, level 2 the median of six data (so the hidden card shares the middle with a known one and is never the target itself), level 3 the missing frequency of a table with a given mean. The test checks that exactly one value of the stepper gives the target, and that the stepper never starts on it.
- `bag` (`games/bag.ts`), 35401–35403: pack the bag. Steppers for red, blue and green balls so that the bag has the probabilities on the card (one; two; «not green» and «red twice as likely as blue»). Any bag that meets them is right; the smallest one has at most 12 balls and is shown as an example after a miss.
- `detective` (`games/detective.ts`), 35501–35503: 12 typical errors (relative frequency over the categories, cumulative not added, sector out of 100, percentage not × 100; mean over the number of values, median unsorted, mode given as its frequency, one middle value with an even count; range of unsorted data, favourable over unfavourable, the complement as the reciprocal, 11 equally likely sums of two dice).

Tricks: a Python heredoc edit turned `\\max` into `\max` in a TS template (lint caught `\m`, but `\t`, `\f` would pass silently): scan new files for control characters. Every stepper game must start on a value that is never the answer.

Deployed 2026-11-02: main fd383b3, bundle `index-NhNlFoWP.js`; checked live at 375 px in eu, es and ar (every new game opens and starts, no overflow, no console errors).
