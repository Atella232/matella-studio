# Planoko geometria · 3. DBH (geometría del plano)

Tema `geometria-plana` de `dbh3`. Carpeta `src/pages/dbh3-geometria/`, `storagePrefix` `matella-geometria-dbh3`, ruta `#/matematika/dbh3/geometria-plana`, rama `feat/geometria-dbh3` (sale de `feat/ecuaciones-dbh3`, ver `dbh3-plan.md`).

Fuentes: Santillana 3.º U8 «Geometría plana» + Anaya 3.º U10 «Problemas métricos en el plano». Ejercicios originales. Idiomas: eu, es, en, ar. Cuerpos geométricos (Santillana U10, Anaya U11) no está en la lista de temas de 3.º y se queda fuera.

## Diseño (encargo del 2026-10-31, sin menú)

- Errores típicos: n triángulos en vez de n − 2; 360° para un triángulo; el exterior como interior; inscrito = doble del central; repartir la raíz; sumar cuadrados para un cateto; la base entera en el isósceles; olvidar la raíz; no dividir el triángulo entre 2; diámetro por radio; áreas por k en vez de k²; Tales al revés.
- Objetos por etapa: el punto P que recorre la circunferencia (ángulos), el vértice C que se mueve (puntos notables), la escalera que resbala (Pitágoras), figuras prestadas de áreas, la copia ampliada (semejanza).

## Fase 1 (lecciones y contenido)
- 5 etapas: `angles`, `loci`, `pythagoras`, `areas`, `similarity`. 15 temas: polygon-angles, regular-polygons, circle-angles · perpendicular-bisector, angle-bisector, notable-points · pythagoras, pythagoras-figures, pythagoras-problems · polygon-areas, regular-area, circle-areas · thales, similar-triangles, scale-areas.
- Figuras prestadas de 1. DBH Figurak, 2. DBH Pitagoras y 4.º ap Áreas y Semejanza; nuevas `PerpendicularBisectorFigure` y `AngleBisectorFigure` (`figures.tsx`).
- Diagnóstico 6801–6808; práctica 1–20; retos 101–115; banco 1–50. π = 3,14 y el enunciado lo dice.
- `geometry3Checks` (en `content.ts`): fórmula y datos de cada respuesta. El test recalcula la respuesta y comprueba que los datos están en el enunciado (salvo el número de lados de un polígono con nombre). Las primas de Tales en las lecciones se escriben `^{\prime}` (el test de lecciones no lee fórmulas con `'`). Escalas con `\mathbin{:}`.

## Fase 2 (laboratorio)
- 4 propias: `inscribed` (951xx, el ángulo en P se calcula con los puntos; ▶ P da la vuelta), `notable` (952xx, A(0,0) B(6,0) y C móvil; cuatro puntos; ▶ dibuja las rectas una a una), `ladder` (953xx, escalera de L m; predicción «¿baja más o menos de 1 m?»; ▶ resbala), `enlarge` (954xx, copia con razón k; área ×k²; ▶ crece desde k = 1).
- 6 prestadas: `polygon`, `sector` (1. DBH Figurak), `squares`, `figure` (2. DBH Pitagoras), `regular` (4.º ap Áreas), `thales` (4.º ap Semejanza).
- Coordenadas con decimales: en eu/es se separan con punto y coma, (3; 1,38).

## Fase 3 (juegos)
- 6 juegos: carrera (96101–96105), parejas (96201–96203), `angles` La caza de ángulos (96301–96303, con dibujo `AngleArt`), `triangle` ¿Qué triángulo es? (96401–96403), `point` ¿Qué punto es? (96501–96503, usa `notableLines` de `lab/notable.ts`), `detective` Detective de geometría (96601–96603).
- Tests: `tests/geometria-dbh3-content|lab|games.test.ts`.

## Estado
Hecha en la rama `feat/geometria-dbh3`. Tests, lint y tipos en verde; inventario OK; revisada a 375 px en eu, es y ar. Publicada el 2026-10-31.

## Publicación
Publicada en matella.net el 2026-10-31 junto con las otras 7 unidades de 3.º (fusión de avance rápido de `feat/estadistica-dbh3` en `main`, último commit 5042946; bundle `index-DSpCP6ns.js`). Comprobada en vivo a 375 px en eu, es y ar (ruta, laboratorio y juegos de las 8).

**Teoría con las mejoras de 2. DBH (2026-11-04/05, rama `claude/teoria-dbh3-46f5a5`, commit 9069f24a, más b5b0dde2 para las fórmulas a 375 px; sin publicar):** las 15 lecciones tienen sus textos en `lessonTexts.ts` (`geometry3LessonTexts`) y su error típico y «Compruébalo» en `lessonChecks.ts` (`geometry3LessonChecks`, ids `Geometry3TopicId`); explicación de 50 palabras como mucho, «Otro ejemplo» con números propios y vocabulario en 4 idiomas. «¿Por qué funciona?» en polygon-angles, notable-points y scale-areas. Enlaces (7): pythagoras → 2. Pitágoras › formula; pythagoras-figures → 2. Pitágoras › triangle-height; pythagoras-problems → 2. Funciones › coordinates; regular-area → 2. Pitágoras › apothem; thales → Proporcionalidad › proportion; similar-triangles → Proporcionalidad › ratio; scale-areas → Proporcionalidad › scale. Arreglado: la línea buena del error típico de regular-polygons ya no da 180°. A 375 px se partieron 3 ejemplos (regular-polygons, angle-bisector, similar-triangles). Revisado a 375 px en eu, es y ar (pasos abiertos, «¿Por qué?» abiertos, todas las palabras abiertas): nada se sale, sin errores de KaTeX, fórmulas en 17 px o más. Resumen de todo el curso en `teoria-dbh3.md`.
