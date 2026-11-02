# Zenbaki osoak 2. DBH

Folder `src/pages/dbh2-zenbaki-osoak`, route `matematika/dbh2/numeros-enteros/*`. Stages: integers, absolute, ordering, addsub, muldiv. Games: race 21xx, pyramid 22xx, memory 23xx, order (queue) 24xx.

## Detective (2026-11-02)

Branch `feat/osoak-zatigarritasuna-dbh2-detectives`. Third own game: `detective` (`games/detective.ts`, `games/DetectiveGame.tsx`), 2501–2503, on the shared WorkedDetectiveGame. 12 typical sign mistakes: |−7| = −7, ordering negatives by absolute value, subtracting a negative, −5 + 3 = −8; minus by minus, three negatives, −3² = 9, the sign of a quotient; adding before multiplying, a minus before a bracket, ÷ and · from right to left, the product before the power. The wrong line moves between lines 1 and 2 (the test checks it is not always the same).
