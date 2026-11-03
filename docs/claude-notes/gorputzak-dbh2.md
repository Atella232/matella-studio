# Gorputz geometrikoak 2. DBH

Folder `src/pages/dbh2-gorputzak-v2`, route `matematika/dbh2/cuerpos-geometricos/*`. Stages: polyhedra, areas, round, units, volume. Lab 7 tools (251xx…); games race 341xx and memory 342xx. 3D drawing kit in `geometry3d.ts` + `solids.tsx` (`Solid`, `Cylinder`, `fitCamera`).

## Own games (2026-11-02)

Branch `feat/gorputzak-dbh2-games` (stacked on the Aljebra, Ekuazioak and Pitagoras game branches). Three games of this topic:
- `euler` (`games/euler.ts`), 34301–34303: count and Euler. A polyhedron drawn in 3D (hidden edges dashed) and three steppers for faces, vertices and edges; level 1 prisms and pyramids, level 2 more sides, frustums and regular solids, level 3 no drawing: two numbers and Euler's formula. The formula is written in words, as in the lessons («caras + vértices = aristas + 2»). The test checks `countElements` of the drawing equals the formulas.
- `tank` (`games/tank.ts`), 34401–34403: fill the tank. A box or cylinder with its measures; the learner sets the litres (slider + stepper) and opens the tap; only then the water rises (fills, stays short or spills). Level 1 boxes in dm, level 2 boxes in cm and in m, level 3 cylinders rounded to the litre.
- `detective` (`games/detective.ts`), 34501–34503: 12 typical errors (one base, the height for the slant height, the diameter as radius, base area × height for a lateral area; the third of pyramids and cones, r² in the sphere, the circumference as base; 1 cm³ = 1 L, 1 m³ = 100 dm³, the height forgotten, 1 L = 100 mL). Units in formulas as `\,\text{cm}^{3}`.

Trick: water colour is a fixed `#7fb0e8`; the theme's blue tint is too pale to read as water.

Deployed 2026-11-02: main fd383b3, bundle `index-NhNlFoWP.js`; checked live at 375 px in eu, es and ar (every new game opens and starts, no overflow, no console errors).

**«Error típico» y «Compruébalo» (mejoras 5 y 7 de la teoría, rama `feat/teoria-error-check`, **publicado el 2026-11-03**: main 4bd962d, bundle `index-B-aBnto3.js`):** commit 802608f. Cada lección lleva su error típico y su pregunta en `lessonChecks.ts` (`solidsLessonChecks`, sobre `SolidsTopicId`), mezclados en `lessons.tsx`. π ≈ 3,14 como en las lecciones; unidades fuera de $…$. Reglas, test y revisión a 375 px en `teoria-dbh2.md`.

**Definiciones, explicación corta y «Otro ejemplo» (mejoras 3 y 4 de la teoría, rama `feat/teoria-ejemplos`, **publicado el 2026-11-03**: main 0470827, bundle `index-BU-MwfSc.js`):** commit 4122e92. Lo que cuenta cada lección (definiciones, explicación de 50 palabras como mucho, casos y el ejemplo con enunciado, números propios y respuesta) está en `lessonTexts.ts` (`solidsLessonTexts`); `lessons.tsx` ya no tiene `explanation` ni `example`. El euskera escribe el área de la base $A_O$ (el test compara las fórmulas del euskera por su forma). Reglas y test en `docs/claude-notes/teoria-dbh2.md`.

**Vocabulario en 4 idiomas y «¿Por qué funciona?» (mejoras 8 y 9 de la teoría, rama `feat/teoria-porque-vocabulario`, **publicado el 2026-11-03**: main a9e1ca7, bundle `index-DK3RAImw.js`):** commit 34e037a. Cada lección lleva en `lessonTexts.ts` su `vocabulary` (2–5 palabras que la lección usa en cada idioma, sin repetir las definiciones). «¿Por qué funciona?» (`why`, cerrado hasta que se abre) en elements (en el prisma, n aristas en cada base y n laterales: 3n; 2n vértices; n + 2 caras), regular (tres hexágonos ya suman 360°: por eso solo hay cinco) y pyramid-area (n triángulos de área l·a/2 dan P·a/2). Palabras como las escribe la lección: «zirkulu-erdia», «edukiera-unitateak» (no «mililitro»: la lección solo dice mL).
