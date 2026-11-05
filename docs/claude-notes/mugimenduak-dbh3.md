# Planoko mugimenduak · 3. DBH (movimientos en el plano)

Tema `movimientos-plano` de `dbh3`. Carpeta `src/pages/dbh3-mugimenduak/`, `storagePrefix` `matella-mugimenduak-dbh3`, ruta `#/matematika/dbh3/movimientos-plano`, rama `feat/movimientos-dbh3` (sale de `feat/geometria-dbh3`, ver `dbh3-plan.md`).

Fuentes: Santillana 3.º U9 «Movimientos en el plano» + Anaya 3.º U12 «Transformaciones geométricas». Ejercicios originales. Idiomas: eu, es, en, ar.

## Diseño (encargo del 2026-10-31, sin menú)

- Errores típicos: origen menos extremo; módulo = a + b; perder un signo al trasladar; el vector de la traslación al revés; girar 90° = solo intercambiar; el signo en la coordenada equivocada; reflejar en el otro eje; x = k como k − x; dos espejos sin doblar (d, α); n saltos en un friso; sumar k en la homotecia.
- Objeto de la unidad: la bandera (`motion.ts`: palo y triángulo, para ver a simple vista si gira o se da la vuelta). Todas las transformaciones son funciones puras de `motion.ts` (giros exactos en múltiplos de 90°).

## Fase 1 (lecciones y contenido)
- 5 etapas: `vectors`, `translations`, `rotations`, `reflections`, `patterns`. 15 temas: vector-components, vector-modulus, vector-sum · translation, translation-coordinates, translation-composition · rotation, rotation-coordinates, central-symmetry · axial-symmetry, reflection-coordinates, two-mirrors · friezes, tessellations, homothety.
- Figura propia `MotionFigure` (`figures.tsx`) con 13 variantes (componentes, suma, traslación, giro, simetrías, dos espejos, friso, mosaico); en árabe los pies de figura solo llevan palabras (el SVG no aísla fórmulas). Homotecia de 4.º ap.
- Diagnóstico 6901–6908; práctica 1–20; retos 101–115; banco 1–50.
- `motions3Checks` (en `content.ts`): movimiento y datos de cada respuesta; el test lo recalcula y comprueba que los datos están en el enunciado.
- Primas en lecciones: `^{\prime}` (el test de lecciones no lee fórmulas con `'`).

## Fase 2 (laboratorio)
- 4 propias: `slide` (971xx, vector; predicción «¿más o menos de 5?»; ▶ desliza), `turn` (972xx, centro y ángulo; predicción «¿P′ a la izquierda, a la altura o a la derecha?»; ▶ gira), `mirror` (973xx, x = k, y = k o y = x; ▶ dobla), `two-mirrors` (974xx, paralelos → traslación 2d; secantes → giro 2α; ▶ las dos reflexiones).
- 4 prestadas: `vector`, `combination` (4.º ak Bektoreak), `tiling` (1. DBH Figurak), `homothety` (4.º ap Antzekotasuna). Las etiquetas «x»/«y» de las herramientas de Bektoreak se salen un poco del viewBox (ya era así allí).

## Fase 3 (juegos)
- 6 juegos: carrera (98101–98105), parejas (98201–98203), `where` ¿Dónde cae? (98301–98303, cuadrícula con puntos que se tocan, como el cruce de Ecuaciones), `which` ¿Qué movimiento es? (98401–98403; la homotecia no usa k = −1 porque parecería un giro de 180°), `tiles` ¿Cubren el plano? (98501–98503), `detective` Detective de movimientos (98601–98603).
- Tests: `tests/mugimenduak-dbh3-content|lab|games.test.ts`. El test de juegos comprueba con la orientación y el tamaño de la bandera que cada movimiento deja su marca.

## Estado
Hecha en la rama `feat/movimientos-dbh3`. Tests, lint y tipos en verde; inventario OK; revisada a 375 px en eu, es y ar. Publicada el 2026-10-31.

## Publicación
Publicada en matella.net el 2026-10-31 junto con las otras 7 unidades de 3.º (fusión de avance rápido de `feat/estadistica-dbh3` en `main`, último commit 5042946; bundle `index-DSpCP6ns.js`). Comprobada en vivo a 375 px en eu, es y ar (ruta, laboratorio y juegos de las 8).

**Teoría con las mejoras de 2. DBH (2026-11-04/05, rama `claude/teoria-dbh3-46f5a5`, commit 73355130, más b5b0dde2 para las fórmulas a 375 px; sin publicar):** las 15 lecciones tienen sus textos en `lessonTexts.ts` (`motions3LessonTexts`) y su error típico y «Compruébalo» en `lessonChecks.ts` (`motions3LessonChecks`, ids `Motions3TopicId`); explicación de 50 palabras como mucho, «Otro ejemplo» con números propios y vocabulario en 4 idiomas. «¿Por qué funciona?» en rotation-coordinates, two-mirrors y homothety. Enlaces (6): vector-components y reflection-coordinates → 2. Funciones › coordinates; vector-modulus → Geometría › pythagoras; axial-symmetry → Geometría › perpendicular-bisector; tessellations → Geometría › regular-polygons; homothety → Geometría › similar-triangles. Los dibujos de vector-components ((4, 3)) y translation van tras los pasos. A 375 px se partieron 7 fórmulas (6 ejemplos y el «¿Por qué?» de rotation-coordinates). Revisado a 375 px en eu, es y ar (pasos abiertos, «¿Por qué?» abiertos, todas las palabras abiertas): nada se sale, sin errores de KaTeX, fórmulas en 17 px o más. Resumen de todo el curso en `teoria-dbh3.md`.
