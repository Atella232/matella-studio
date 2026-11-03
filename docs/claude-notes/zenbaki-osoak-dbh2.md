# Zenbaki osoak 2. DBH

Folder `src/pages/dbh2-zenbaki-osoak`, route `matematika/dbh2/numeros-enteros/*`. Stages: integers, absolute, ordering, addsub, muldiv. Games: race 21xx, pyramid 22xx, memory 23xx, order (queue) 24xx.

## Detective (2026-11-02)

Branch `feat/osoak-zatigarritasuna-dbh2-detectives`. Third own game: `detective` (`games/detective.ts`, `games/DetectiveGame.tsx`), 2501–2503, on the shared WorkedDetectiveGame. 12 typical sign mistakes: |−7| = −7, ordering negatives by absolute value, subtracting a negative, −5 + 3 = −8; minus by minus, three negatives, −3² = 9, the sign of a quotient; adding before multiplying, a minus before a bracket, ÷ and · from right to left, the product before the power. The wrong line moves between lines 1 and 2 (the test checks it is not always the same).

Deployed 2026-11-02: main fd383b3, bundle `index-NhNlFoWP.js`; checked live at 375 px in eu, es and ar (every new game opens and starts, no overflow, no console errors).

**«Error típico» y «Compruébalo» (mejoras 5 y 7 de la teoría, rama `feat/teoria-error-check`, **publicado el 2026-11-03**: main 4bd962d, bundle `index-B-aBnto3.js`):** commit 28928b4. Cada lección lleva su error típico y su pregunta en `lessonChecks.ts` (`integerLessonChecks`, sobre `IntegerTopicId`), mezclados en `lessons.tsx`. Fue el piloto de las mejoras 5 y 7. Reglas, test y revisión a 375 px en `teoria-dbh2.md`.

**Definiciones, explicación corta y «Otro ejemplo» (mejoras 3 y 4 de la teoría, rama `feat/teoria-ejemplos`, **publicado el 2026-11-03**: main 0470827, bundle `index-BU-MwfSc.js`):** commit 0776962. Lo que cuenta cada lección (definiciones, explicación de 50 palabras como mucho, casos y el ejemplo con enunciado, números propios y respuesta) está en `lessonTexts.ts` (`integerLessonTexts`); `lessons.tsx` ya no tiene `explanation` ni `example`. Negativos, Valor absoluto, Opuesto y Resta tienen ahora «Vamos a resolver» con sus pasos (en `lessonTexts.ts`). El opuesto se escribe $-(+7)=-7$ en todos los idiomas. El problema de Ordenar va con una fórmula por número (antes se salía 12 px a 375 px). Reglas y test en `docs/claude-notes/teoria-dbh2.md`.

**Vocabulario en 4 idiomas y «¿Por qué funciona?» (mejoras 8 y 9 de la teoría, rama `feat/teoria-porque-vocabulario`, **publicado el 2026-11-03**: main a9e1ca7, bundle `index-DK3RAImw.js`):** commit 19e3a11. Cada lección lleva en `lessonTexts.ts` su `vocabulary` (2–5 palabras que la lección usa en cada idioma, sin repetir las definiciones). «¿Por qué funciona?» (`why`, cerrado hasta que se abre) en add (la recta: avanzar y retroceder), subtract (restar deshace sumar: restar un negativo es sumar su opuesto) y multiply-divide (la tabla del −2: cada vez que el primer factor baja 1, el resultado sube 2). Piloto de la mejora: se probó a 375 px en eu y ar antes de seguir.
