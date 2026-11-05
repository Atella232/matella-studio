# Ekuazioak eta sistemak · 3. DBH (ecuaciones y sistemas)

Tema `ecuaciones-sistemas` de `dbh3`. Carpeta `src/pages/dbh3-ekuazioak/`, `storagePrefix` `matella-ekuazioak-dbh3`, ruta `#/matematika/dbh3/ecuaciones-sistemas`, rama `feat/ecuaciones-dbh3` (sale de `feat/polinomios-dbh3`, ver `dbh3-plan.md`).

Fuentes: Santillana 3.º U6 «Ecuaciones de primer y segundo grado» y U7 «Sistemas de ecuaciones» + Anaya 3.º U6–U7 (los PDF son solucionarios: solo fijan alcance y orden). Ejercicios originales. Idiomas: eu, es, en, ar.

## Diseño (encargo del 2026-10-31, sin menú)

- Errores típicos: pasar un término sin cambiar el signo; restar en vez de dividir; el menos de un paréntesis solo al primer término; no multiplicar todos los términos por el m.c.m.; dividir entre x y perder x = 0; solo la raíz positiva; b en vez de −b; el signo de c en Δ; sustituir sin paréntesis; multiplicar un solo miembro; una pareja que cumple una sola ecuación; sumar los años a una sola persona.
- Objetos por etapa: la balanza (1.er grado), la parábola que toca el suelo (2.º grado), dos balanzas con manzanas y peras (sistemas), métodos prestados (sustitución, reducción, plano), la línea del tiempo de las edades (problemas).

## Fase 1 (lecciones y contenido)
- 5 etapas: `linear`, `quadratic`, `systems`, `methods`, `problems`. 15 temas: equations, brackets, denominators · incomplete, formula, discriminant · pairs, graphic, classify · substitution, equalisation, elimination · equation-problems, quadratic-problems, system-problems. Todos con `mistake`; `cases` en incomplete, discriminant y classify.
- Figuras: de 1. DBH (BalanceFigure), 2. DBH Ekuazioak y 4.º ap Ecuaciones; nueva `AgesFigure` (`figures.tsx`, usa el `Board` de Segidak).
- Diagnóstico 6701–6708; práctica 1–20; retos 101–115; banco 1–50. Respuesta: un número (la solución, la positiva, la mayor o la incógnita que se pide).
- El test de contenido sustituye la respuesta en cada ecuación de «Resuelve …» y la pareja (x, y) de la solución en cada sistema (`holds`).

## Fase 2 (laboratorio)
- 4 propias: `balance` (931xx, quitar cajas/kilos de los dos platillos y repartir; ▶ muestra la solución entera), `ground` (932xx, raíces = donde la parábola toca el suelo; ▶ baja la parábola), `scales` (933xx, dos balanzas con manzanas y peras; ▶ quita la balanza 2 de la 1 = reducción), `ages` (934xx, edades con t; ▶ pasa el tiempo y la razón baja hacia 1).
- 5 prestadas: `solver`, `lcm` (2. DBH Ekuazioak), `plane`, `reduction` (4.º ap) y `substitution` (4.º ak Sistemas).

## Fase 3 (juegos)
- 6 juegos: carrera (94101–94105), parejas (94201–94203), `step` El paso correcto (94301–94303), `roots` Raíces en la recta (94401–94403), `crossing` El cruce de rectas (94501–94503), `detective` Detective de ecuaciones (94601–94603, 12 errores de este tema).
- Tests: `tests/ekuazioak-dbh3-content|lab|games.test.ts`. El paso correcto guarda cada ecuación como Ax + B = Cx + D para comprobar que solo el bueno conserva la solución.

## Trucos
- Las descripciones de nivel de los juegos son texto plano (sin `$`); en árabe, fórmulas con LRI/PDI y espacios duros.
- Los nombres de error del detective llevan fórmulas: aquí `DetectiveGame` los pasa por `MathText`.
- `.fraction-v2-lesson-figure svg` pide 540 px de ancho mínimo; el `Board` de 360 de Segidak y Proporcionalidad 3. DBH lleva `minWidth: 0` (arreglado en esta rama: antes sus figuras se desplazaban en el móvil).

## Estado
Hecha en la rama `feat/ecuaciones-dbh3`. Tests, lint y tipos en verde; inventario OK; revisada a 375 px en eu, es y ar. Publicada el 2026-10-31.

## Publicación
Publicada en matella.net el 2026-10-31 junto con las otras 7 unidades de 3.º (fusión de avance rápido de `feat/estadistica-dbh3` en `main`, último commit 5042946; bundle `index-DSpCP6ns.js`). Comprobada en vivo a 375 px en eu, es y ar (ruta, laboratorio y juegos de las 8).

**Teoría con las mejoras de 2. DBH (2026-11-04/05, rama `claude/teoria-dbh3-46f5a5`, commit ed6319f1, más b5b0dde2 para las fórmulas a 375 px; sin publicar):** las 15 lecciones tienen sus textos en `lessonTexts.ts` (`equations3LessonTexts`) y su error típico y «Compruébalo» en `lessonChecks.ts` (`equations3LessonChecks`, ids `Equations3TopicId`); explicación de 50 palabras como mucho, «Otro ejemplo» con números propios y vocabulario en 4 idiomas. «¿Por qué funciona?» en equations, incomplete, formula y elimination. Enlaces (9): equations → 2. Ecuaciones › elements; brackets → 2. Enteros › brackets; denominators → 2. Divisibilidad › lcm; incomplete → Polinomios › common-factor; formula → Potencias › roots; pairs → 2. Funciones › coordinates; graphic → 2. Funciones › plot; classify → Proporcionalidad › ratio; equation-problems → 2. Ecuaciones › problem-steps. El dibujo de equation-problems (las edades, x = 10) va tras los pasos (`figureAfterSteps`). Arreglado en euskera un error típico: «$2x$ bider 2 da» → «$2x$ 2 bider $x$ da». A 375 px se partieron 16 fórmulas (las cadenas con `\ \to\ ` de los ejemplos, las tarjetas de incomplete, un paso de quadratic-problems y dos «¿Por qué?»). Revisado a 375 px en eu, es y ar (pasos abiertos, «¿Por qué?» abiertos, todas las palabras abiertas): nada se sale, sin errores de KaTeX, fórmulas en 17 px o más. Resumen de todo el curso en `teoria-dbh3.md`.
