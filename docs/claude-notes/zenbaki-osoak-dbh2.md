# Zenbaki osoak 2. DBH

Folder `src/pages/dbh2-zenbaki-osoak`, route `matematika/dbh2/numeros-enteros/*`. Stages: integers, absolute, ordering, addsub, muldiv. Games: race 21xx, pyramid 22xx, memory 23xx, order (queue) 24xx.

## Detective (2026-11-02)

Branch `feat/osoak-zatigarritasuna-dbh2-detectives`. Third own game: `detective` (`games/detective.ts`, `games/DetectiveGame.tsx`), 2501–2503, on the shared WorkedDetectiveGame. 12 typical sign mistakes: |−7| = −7, ordering negatives by absolute value, subtracting a negative, −5 + 3 = −8; minus by minus, three negatives, −3² = 9, the sign of a quotient; adding before multiplying, a minus before a bracket, ÷ and · from right to left, the product before the power. The wrong line moves between lines 1 and 2 (the test checks it is not always the same).

Deployed 2026-11-02: main fd383b3, bundle `index-NhNlFoWP.js`; checked live at 375 px in eu, es and ar (every new game opens and starts, no overflow, no console errors).

**«Error típico» y «Compruébalo» (mejoras 5 y 7 de la teoría, rama `feat/teoria-error-check`, **publicado el 2026-11-03**: main 4bd962d, bundle `index-B-aBnto3.js`):** commit 28928b4. Cada lección lleva su error típico y su pregunta en `lessonChecks.ts` (`integerLessonChecks`, sobre `IntegerTopicId`), mezclados en `lessons.tsx`. Fue el piloto de las mejoras 5 y 7. Reglas, test y revisión a 375 px en `teoria-dbh2.md`.
