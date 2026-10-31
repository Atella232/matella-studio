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
Hecha en la rama `feat/ecuaciones-dbh3`. Tests, lint y tipos en verde; inventario OK; revisada a 375 px en eu y ar. Sin publicar.
