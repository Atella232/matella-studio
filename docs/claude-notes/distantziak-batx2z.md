# Angeluak eta distantziak · 2.º Bachillerato Ciencias

Tercera unidad del bloque Espacio (reparto en paralelo de 2.º Ciencias, ver `bachillerato.md`): curso `batx2-zientziak`, tema `angulos-distancias`.

- **Carpeta:** `src/pages/batx2-zientziak-distantziak`
- **`storagePrefix`:** `matella-distantziak-batx2z`
- **Rama:** `feat/distantziak-batx2z`, cortada de `feat/planoak-batx2z` (6472b733), para poder enlazar a Rectas y planos en «Antes de empezar». Lleva dentro también todo `planoak` y el arreglo de la memoria de `bektoreak` (f755ae54).
- **Bloque de ids:** 121000–121999 (diagnóstico 121001–121008, laboratorio propio 121101–121399, juegos 121401–121899)
- **Servidor de pruebas:** puerto 5182 (`.claude/launch.json` propio, sin commit)

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U6 «Ángulos y distancias» (solucionario, libro de clase: manda el orden) y Anaya Matemáticas II U6 «Problemas métricos» (solucionario). Estilo de problemas: EBAU del País Vasco 2017–2022 (simétrico respecto de un plano y de una recta, distancias de recta paralela a plano y entre planos, proyecciones, ángulo de recta y plano). Del libro solo se saca el alcance; textos y ejercicios propios. Ficha fuera del repositorio: `~/Documents/Matella-fuentes/batx2z-espacio/ficha-distantziak.md`.
- **Fuera:** la esfera (no sale en la EBAU del País Vasco; decisión del dueño). Áreas y volúmenes ya están en Vectores en el espacio.
- **Lo que viene de antes:** 1.º (ángulo de rectas, distancias y simétrico en el plano), Vectores en el espacio (ángulo, proyección, área, volumen, punto medio) y Rectas y planos (normal, corte recta–plano, posiciones), con «Antes de empezar».

## Diseño elegido

- 2026-11-11: el dueño eligió «Las recomendadas» (sin esfera): V1 (lecciones con el tablero 3D), L1 «El transportador 3D», L2 «El pie de la perpendicular», L3 «El espejo», L4 «La regla de la distancia», L5 «La caja de las que se cruzan», J1 «¿Seno o coseno?», J2 «El espejo», J3 «¿Quién está más cerca?», J4 detective, J5 carrera y memoria. Propuesta completa en la carpeta de notas compartidas (`propuesta-distantziak-batx2z.md`).
- **Palabras en euskera propuestas** (el dueño debe confirmarlas en la hoja): angelua, sinua, osagarria, proiekzio ortogonala, oina (pie), simetrikoa, ispilua, plano erdikaria (mediador), distantzia, perpendikular komuna, puntu orokorra. Árabe: المسقط العمودي، المسقط (pie)، النظيرة، المستوى المنصِّف، العمودي المشترك.

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** 15 en 5 etapas (`angles`, `projections`, `symmetric`, `point-distances`, `line-distances`): `angle-lines`, `angle-line-plane`, `angle-planes`; `project-point-plane`, `project-point-line`, `project-line-plane`; `symmetric-plane`, `symmetric-line`, `mediator-plane`; `point-plane`, `parallel-planes`, `point-line`; `parallel-lines`, `skew-distance`, `common-perpendicular`. Con las diez mejoras de la teoría (`lessonTexts.ts` y `lessonChecks.ts`; cinco «¿Por qué funciona?» en `angle-line-plane`, `symmetric-plane`, `point-plane`, `point-line` y `skew-distance`).
- **Dibujos (15 + portada),** con el tablero 3D del bloque en modo `swipe`: arco del ángulo, perpendicular a trazos hasta el pie, simétrico, segmento de la distancia, la caja de las que se cruzan y la perpendicular común. Vistas propias donde la perpendicular se veía de frente: `SIDEWAYS` (`{ azimuth: -25, elevation: 20 }`) para planos de normal horizontal a 45°, y otras en proyección de punto, proyección de recta, plano mediador y punto–recta.
- **Contenido:** diagnóstico 121001–121008, práctica 1–20, retos 101–115 y banco 1–50. Respuestas de un número (ángulo en grados, coordenada, parámetro o distancia), elegidas para que salgan exactas; `normalizeInput` quita el signo de grado y usa `readVectorsAnswer`.
- **Registro:** `courses.ts` (`angulos-distancias` con `active: true`), router (`DistantziakBatx2zPage`) y `paths.ts`.
- **Test nuevo:** `tests/distantziak-batx2z-content.test.ts` (copia del de `planoak`).
- **Comprobación:** 3054 tests, lint y build en verde.
- **Revisión a 375 px** en eu, es y ar: las 15 lecciones con todos los pasos abiertos (dos fórmulas pasadas a dos filas); los 15 dibujos en eu.

**Fase 3, laboratorio (ids 121101–121305):** cinco herramientas en `lab/`, cada una con predicción antes de ver el resultado, 5 retos y práctica sin fin.
- **L1 El transportador 3D** (`protractor.ts`, 121101–05): recta–recta, recta–plano y plano–plano; predicción 0°, agudo o 90°.
- **L2 El pie de la perpendicular** (`foot.ts`, 121151–55): proyección de un punto sobre plano o recta; el ▶ desliza el punto por la perpendicular.
- **L3 El espejo** (`mirror.ts`, 121201–05): simétrico respecto de un plano ($P'=2M-P$); predicción debajo, en o encima.
- **L4 La regla de la distancia** (`ruler.ts`, 121251–55): punto–plano (d de −9 a 9) y punto–recta; predicción menor, igual o mayor que 3.
- **L5 La caja de las que se cruzan** (`skewBox.ts`, 121301–05): volumen $|[AB,u,v]|$ entre base $|u\times v|$; el ▶ mueve B por s y la distancia no cambia.
- Comunes en `lab/common.ts` (`rootLatex`, `degreesLatex`, `angleFromSquare`; el resto se reexporta de `planoak`). Usa el CSS `.planoak-lab-equations` de `planoak` (importado, no copiado).
- **Test nuevo:** `tests/distantziak-batx2z-lab.test.ts`. 3061 tests, lint y build en verde. Revisado a 375 px en eu, es y ar.

**Fase 4, juegos y cierre (ids 121401–121803):** seis juegos en `games/`, con `info.ts` (`matella-distantziak-batx2z-game-records`).
- **Carrera** (`race.ts`, 121401–05): cinco circuitos, uno por etapa, tres tipos de pregunta en cada uno (ángulos; t del pie y coordenadas del pie en plano y recta; simétricos y la D del mediador; punto–plano, planos paralelos, punto–recta; producto mixto, que se cruzan, paralelas). Distractores: complementario, sin valor absoluto, pie, M − P, sin dividir, sin D, normales sin igualar.
- **J1 ¿Seno o coseno?** (`sine.ts`, 121501–03): primero la fórmula (coseno de directores, de normales o seno), después el ángulo (0°, 30°, 45°, 60° o 90°) con el complementario y el obtuso como trampa.
- **J2 El espejo** (`mirror.ts`, 121551–53): cuatro puntos numerados en el tablero 3D (P′, el pie M, M − P como punto y P al revés); niveles: planos de normal en un eje, cualquier plano y respecto de una recta.
- **J3 ¿Quién está más cerca?** (`nearer.ts`, 121601–03): un punto y dos objetos (dos planos, plano y recta, dos rectas) a distancia entera por construcción (normales de módulo 1 o 3, desplazamientos de longitud entera); al responder, las perpendiculares en el tablero.
- **J4 Detective** (`detective.ts`, 121701–03): doce errores en tres niveles (sin valor absoluto, coseno por seno, olvidar P, pie por simétrico; sin |n|, sin D, normales sin igualar, entre |AP|; entre |u||v|, entre |AB|, fórmula de paralelas, mediador por un extremo).
- **Memoria** (`boards.ts`, 121801–03): punto y plano ↔ distancia, planos paralelos ↔ distancia, punto y plano x = k ↔ simétrico. Solo planos de un eje (a·z = c): los planos completos no caben en una carta (86 px).
- **Test nuevo:** `tests/distantziak-batx2z-games.test.ts`. 3068 tests, lint y build en verde; inventario: 3 juegos y 5 herramientas propias.
- **Revisión a 375 px** en eu, es y ar de los seis juegos (la ronda 2 de «¿Seno o coseno?» empieza limpia: `RoundGame` monta cada ronda con `key`); las líneas y correcciones del detective medidas en el navegador con todos los casos (máximo 233 de 234 px).
- **Hoja de euskera:** `distantziak-batx2z-revision.html` en la carpeta de notas compartidas.

## Trucos

- Los de `bektoreak` y `planoak` siguen valiendo (`${z}`, `\qquad`, `gathered`, `\colon` en vez de `:` dentro de fórmulas, `\dfrac` en vez de `\displaystyle`).
- El test de textos compara el orden de las fórmulas en los cuatro idiomas: si en castellano sale «la recta $P+t\vec n$, que pasa por $P$», en euskera hay que mantener ese orden.
- Detective a 375 px: el hueco de una línea es de 234 px (botón de 292 menos número y huecos). Medir con `katex.renderToString` dentro del navegador (`import('/node_modules/katex/dist/katex.mjs')` y el módulo del juego con `?t=`) es más fiable que mirar elemento a elemento.
- Herramientas del laboratorio: un título largo en euskera desborda la cabecera a 375 px (máximo unos 179 px); los marcadores con tres fórmulas van en filas separadas.
- Ángulos con decimales (26,39°) no van como respuesta cerrada (el redondeo no casa con la fracción exacta): solo en soluciones del banco.

## Pendiente para la fusión

- Nada propio: las lecciones no usan Determinantes ni Sistemas de 2.º.
- Piezas prestadas (solo importadas, sin tocar): CSS `PlanesGames.css` y `PlanesTools.css` y `lab/common.ts` de `planoak`; tablero 3D y `vec3.ts` de `bektoreak`.

