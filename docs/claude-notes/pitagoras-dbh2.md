# Pitagorasen teorema 2. DBH

Folder `src/pages/dbh2-pitagoras-v2`, route `matematika/dbh2/teorema-pitagoras/*`. Stages: theorem, sides, plane, circle, space. Lab 7 tools (ids 231xx…); games race 241xx and memory 242xx.

## Own games (2026-11-02)

Branch `feat/pitagoras-dbh2-games` (stacked on the Aljebra and Ekuazioak game branches). Three games of this topic:
- `ladder` (`games/ladder.ts`), 24301–24303: the ladder. The learner works out where to put the foot (a leg) or which ladder is needed (the hypotenuse), sets it with a slider and a stepper and leans it; the ladder is drawn only after the answer (green if it reaches the window, red if it stays short or goes past). Level 1 whole triples, level 2 half-metre triples (step 0.5), level 3 any lengths to tenths. No window higher than 12 m.
- `classify` (`games/classify.ts`), 24401–24403: what triangle is it (acute, right, obtuse) from three sides; near misses of triples, decimal halves in level 3. `kindOf` compares in tenths.
- `detective` (`games/detective.ts`), 24501–24503: 12 typical errors (legs added, root forgotten, square as double, square of the sum; adding for a leg, subtracting for the hypotenuse, the root split, metres and centimetres mixed; the whole base of an isosceles triangle, the whole diagonals of a rhombus, the base diagonal not squared, the distance to the centre as a leg of the tangent). Non-whole lengths end in `\approx` with hundredths.

Tricks: Arabic prose uses «م» for metres; SVG text needs `direction="ltr"`. A CSS rule on `span` inside a box that holds MathText must use `> span`, or it styles every KaTeX span.

Deployed 2026-11-02: main fd383b3, bundle `index-NhNlFoWP.js`; checked live at 375 px in eu, es and ar (every new game opens and starts, no overflow, no console errors).

**«Error típico» y «Compruébalo» (mejoras 5 y 7 de la teoría, rama `feat/teoria-error-check`, **publicado el 2026-11-03**: main 4bd962d, bundle `index-B-aBnto3.js`):** commit f717f44. Cada lección lleva su error típico y su pregunta en `lessonChecks.ts` (`pythagorasLessonChecks`, sobre `PythagorasTopicId`), mezclados en `lessons.tsx`. Las cajas de hypotenuse, leg y triangle-height repiten el error que ya nombra la explicación. Reglas, test y revisión a 375 px en `teoria-dbh2.md`.

**Definiciones, explicación corta y «Otro ejemplo» (mejoras 3 y 4 de la teoría, rama `feat/teoria-ejemplos`, **publicado el 2026-11-03**: main 0470827, bundle `index-BU-MwfSc.js`):** commit e955e6a. Lo que cuenta cada lección (definiciones, explicación de 50 palabras como mucho, casos y el ejemplo con enunciado, números propios y respuesta) está en `lessonTexts.ts` (`pythagorasLessonTexts`); `lessons.tsx` ya no tiene `explanation` ni `example`. Unidad piloto de las mejoras 3 y 4. Reglas y test en `docs/claude-notes/teoria-dbh2.md`.

**Vocabulario en 4 idiomas y «¿Por qué funciona?» (mejoras 8 y 9 de la teoría, rama `feat/teoria-porque-vocabulario`, sin publicar):** commit 4ce4e37. Cada lección lleva en `lessonTexts.ts` su `vocabulary` (2–5 palabras que la lección usa en cada idioma, sin repetir las definiciones). «¿Por qué funciona?» (`why`, cerrado hasta que se abre) en triples (multiplicar 3, 4, 5 por 2 multiplica cada cuadrado por 4), hypotenuse (a² = b² + c²: la hipotenusa es el lado más largo y menor que la suma de los catetos) y leg (la misma fórmula despejada). Sin la demostración por recolocación (necesita un dibujo que la caja no tiene) ni Clasificar (sus tarjetas ya dan la razón). El árabe dice الوتر para la hipotenusa y وتر الدائرة para la cuerda.
