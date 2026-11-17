# Estatistika bidimentsionala · 1.º Bachillerato Ciencias Sociales

Tema `estadistica-bidimensional` del curso `batx1-gizarte`, segundo del bloque «Estadística» del reparto en paralelo de 1.º Sociales (ver `bachillerato.md`). Gemelo de `batx1-zientziak-bidimentsionala`: unidad propia, más sencilla y con contextos de economía y sociedad, que importa piezas de Ciencias y de 4.º sin editarlas.

- **Carpeta:** `src/pages/batx1-gizarte-bidimentsionala`
- **`storagePrefix`:** `matella-bidimentsionala-batx1g`
- **Rama:** `feat/bidimentsionala-batx1g`, cortada de `feat/estatistika-batx1g` 872aab56
- **Bloque de ids:** 138000–138999 (diagnóstico 138001–138008, laboratorio propio 138101–138399, juegos 138401–138899)
- **Puerto de pruebas:** 5193

## Fuentes

- **Anaya Matemáticas Aplicadas a las CCSS I**, dos ediciones en el Drive, solo solucionarios: `Estandar/Unidad_09_Bidimensionales.pdf` (20 páginas) y `Suma_Piezas/Unidad_08_Distrib_Bidimensionales.pdf` (32 páginas, la edición nueva). Las dos traen relación funcional y estadística, nube de puntos, correlación, covarianza, r, las dos rectas de regresión, fiabilidad de las estimaciones y r sin unidades; solo la nueva añade «Tablas de contingencia» (marginales, condicionadas con x̄ y σ, independencia). Ficha fuera del repositorio, en `~/Documents/Matella-fuentes/batx1g-estadistica/`.
- Anaya escribe la recta de X sobre Y despejando y: $y=\bar{y}+\frac{\sigma_y^2}{\sigma_{xy}}(x-\bar{x})$; Ciencias la escribe como $x=\dots$.

## Elección del dueño (2026-11-17)

«Las recomendadas»: F1 (tablas de contingencia al final, edición nueva), R1 (recta de X sobre Y también con y despejada, como Anaya), V1, L1–L2, M, J1–J4. «¿Qué rectas?» de Ciencias no se presta (escribe x = …); en su lugar, «Adivina la correlación» de 4.º.

## Hecho (commit b67bbb9a)

- 18 lecciones: 14 prestadas de Ciencias con `borrow()` y 4 nuevas (`reading-r`, `line-xy`, `both-lines`, `marginal-measures`); contenido 138001–138008, práctica 1–20, retos 101–115, banco 1–50.
- Laboratorio: `relation` (138101–103) y `reliable` (138201–203) propias; prestadas quadrants, scissors, independence (Ciencias), scatter y contingency (4.º ap).
- Juegos: `which-r` (138501–503), `predict` (138601–603), detective (138701–703), carrera (138401–405), memoria (138801–803); prestados `sign` (138811–813) y `cloud` (138821–823).
- Fuera de la carpeta: courses, router, paths y una línea de `tests/bidimentsionala-batx1z-content.test.ts` (comprobaba que Sociales seguía inactivo).

## Cierre

3315 tests, lint y build en verde. Revisado a 375 px en eu, es y ar: las 18 lecciones con todos los pasos abiertos, las 7 herramientas con la predicción hecha, portada, diagnóstico, práctica, ejercicios, retos, resumen y los 7 juegos con sus niveles (respondiendo): sin desbordes, sin errores de KaTeX ni textos fuera de los dibujos de esta unidad. Única marca: en el juego prestado «Adivina la correlación» (`dbh4-games/StatisticsGames`, `CloudGame`) la letra «y» del eje se sale unos píxeles del dibujo; es una pieza de 4.º que no se edita desde aquí (también pasa en Ciencias y en 4.º). Hoja de euskera hecha con `hoja-revision.mjs` (fuera del repositorio, `~/Documents/Matella-fuentes/batx1g-estadistica/hoja-euskera-bidimentsionala-batx1g.html`; las 4 lecciones nuevas, las 2 herramientas y los 5 juegos propios). Al fusionar: este tema activa su línea de `courses.ts` y añade su ruta al final de `paths.ts` y tras la de `estadistica` de Sociales en el router.
