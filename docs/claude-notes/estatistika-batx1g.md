# Estatistika unidimentsionala · 1.º Bachillerato Ciencias Sociales

Tema `estadistica` del curso `batx1-gizarte`, primero del bloque «Estadística» del reparto en paralelo de 1.º Sociales (ver `bachillerato.md`). Gemelo de `batx1-zientziak-estatistika`: unidad propia, más sencilla y con contextos de economía y sociedad, que importa piezas de Ciencias y de 4.º sin editarlas.

- **Carpeta:** `src/pages/batx1-gizarte-estatistika`
- **`storagePrefix`:** `matella-estatistika-batx1g`
- **Rama:** `feat/estatistika-batx1g`, cortada de `main` 70894bdb
- **Bloque de ids:** 137000–137999 (diagnóstico 137001–137008, laboratorio propio 137101–137399, juegos 137401–137899)
- **Puerto de pruebas:** 5193

## Fuentes

- **Anaya Matemáticas Aplicadas a las CCSS I, U8 «Estadística»**, solo el solucionario (19 páginas; `Estandar` y `Saber_Hacer` son el mismo PDF). `Suma_Piezas` no trae este tema. Ficha fuera del repositorio, en `~/Documents/Matella-fuentes/batx1g-estadistica/`.
- Respecto a Ciencias, Anaya Sociales no trae asimetría, atípicos con 3σ, puntuaciones típicas, transformar datos ni el dato que falta con un sistema. Lo que sí trae y la web no tiene: polígono de porcentajes acumulados, percentiles de datos agrupados por interpolación, el percentil de un valor, histogramas con intervalos de distinta amplitud y el porcentaje de datos entre dos valores repartiendo dentro del intervalo.

## Elección del dueño (2026-11-17)

«Las recomendadas»: P2 (percentiles de datos agrupados por interpolación, como Anaya), V1 (18 lecciones en 5 etapas: 9 prestadas de Ciencias sin cambios y 9 nuevas en contextos de economía y sociedad), L1–L3 propias (polígono acumulado, ¿cuántos caben?, anchos distintos), M (prestadas de Ciencias y 4.º), J1 control de calidad, J2 caza el percentil, J3 detective, J4 carrera, memoria, «¿Qué histograma?» y «Construye la caja».

## Fase 1+2: lecciones y contenido

- **Lecciones (18):** datos (`population-sample`, `frequency-tables`, `class-intervals` prestadas; `unequal-widths`), centralización (`centre-measures`, `grouped-centre` prestadas; `group-means`), posición (`quartiles-percentiles` prestada; `cumulative-polygon`, `grouped-percentiles`, `percentile-of-value`; `box-plot` prestada), dispersión (`variance-sd`, `coefficient-variation` prestadas; `compare-spread`) e interpretar (`quartile-counts`, `share-between`, `mean-sd-band`).
- **Cómo se prestan:** `borrow(id, etapa)` en `lessons.tsx` toma la lección de `bachStatsTopics` de Ciencias tal cual (con su error típico y su «Compruébalo»). `lessonTexts.ts` y `lessonChecks.ts` solo tienen las 9 nuevas (los tests globales leen las lecciones de la forma `id: '…', stage:`, y las prestadas no la tienen). La única pieza cambiada: la última frase de la explicación de `quartiles-percentiles` («en datos agrupados se da la marca del intervalo»), que `borrowed.ts` cambia por «se interpola en el polígono…». El archivo de Ciencias no se toca.
- **Interpolación:** $P_k=L_i+\frac{k-H_{i-1}}{h_i}\cdot a_i$ y, al revés, $k=H_{i-1}+\frac{x-L_i}{a_i}\cdot h_i$. Todos los números elegidos para que salga exacto; el test lo recalcula.
- **Figuras nuevas** (`figures.tsx`, números en `data.ts`): histograma con anchos distintos, dos grupos en una balanza, polígono acumulado en tres modos (construir, leer un percentil, leer el percentil de un valor), tres diagramas con la misma media, cuartiles de 400 pisos, piezas defectuosas y la banda x̄ ± σ.
- **Contenido:** diagnóstico 137001–137008; práctica 1–20; retos 101–115; banco 1–50. Percentiles de datos sueltos solo en posiciones donde la regla de la web y la del libro coinciden.
- **Fuera de la carpeta:** la línea de `courses.ts`, el router, `paths.ts` y una línea de `tests/estatistika-batx1z-content.test.ts`, que comprobaba que el tema de Sociales seguía inactivo (ahora es una unidad propia).
- **Trucos:** en `group-means` la fórmula con $N_A$, $N_B$ (no $n$): el test de las ideas clave pide las letras de la lección. En árabe, el pie del dibujo de tres diagramas se salía por abajo: Figure más alta.
- **Revisión:** las 18 lecciones a 375 px en eu, es y ar con todos los pasos abiertos (sin desbordes, sin textos fuera de los dibujos, medido con `getBBox`); en ar también portada, diagnóstico, práctica, ejercicios, retos y resumen.

## Fase 3: laboratorio

- **Propias** (en `lab/`, con predicción y retos infinitos):
  - `widths` «Anchos distintos» (`widths.ts`): horas de televisión de 50 personas, hora a hora de 0 a 12 (`HOURS`), agrupadas en tres intervalos cuyos dos límites se arrastran. Antes de predecir, las barras van con altura = f (mal); después (y con ▶ se ve el cambio) con altura f / a, y una línea de puntos dibuja las personas por hora. Predicción: bien dibujada, ¿la 3.ª barra es más baja, igual o más alta que la 1.ª? Retos 137301–137303.
  - `ogive` «El polígono acumulado» (`ogive.ts`): tres tablas (edades de la lección, minutos al trabajo, gasto semanal); en modo percentil se arrastra la raya a k % y se lee $P_k$; en modo valor, a x y se lee su percentil; salen los triángulos de la interpolación. Predicción: ¿$P_k$ queda antes, en o después de la marca de clase de su intervalo? (lo que daría Ciencias); en modo valor, ¿menos de la mitad, la mitad o más por debajo? Retos 137101–137103 (el 3.º: un $P_k$ que caiga justo en la marca).
  - `between` «¿Cuántos caben?» (`between.ts`): dos cortes en un histograma (las 500 piezas de la lección y la espera de 50 pacientes con x̄ = 20, σ = 7); lo verde es lo que cuenta, partiendo en proporción los intervalos de los extremos. Predicción: ¿menos de la mitad, la mitad o más entre los cortes? ▶ abre los cortes desde el centro. Retos 137201–137203.
- **Prestadas** con sus ids (como en Ciencias): `cumulative`, `intervals`, `centre`, `histogram`, `balance` (ahora para la media de dos grupos), `percentile`, `whiskers` y `table`. 11 herramientas.
- **Trucos:** el texto árabe del tablero de `widths` va por `Label`. La etiqueta del resultado de `ogive` se salía por abajo: tablero de 244 de alto.
- **Revisión:** las 11 herramientas a 375 px en eu, es y ar con la predicción hecha: sin desbordes ni textos fuera del tablero (medido con `getBBox`).

## Fase 4: juegos

- **Propios:**
  - `quality` «Control de calidad» (`games/quality.ts`, niveles 137501–137503): las longitudes de las piezas en cinco intervalos y el tramo aceptable en verde; ¿cuántas son defectuosas? Los límites caen dentro del 2.º y el 4.º intervalo: a la mitad (nivel 1), a un cuarto o tres cuartos (nivel 2) y en porcentaje con 200, 400 o 500 piezas (nivel 3). Opciones falsas: contar enteros los intervalos cortados, dejarlos fuera o dar las aceptables. Recuentos múltiplos de 4 para que todo salga entero.
  - `hunt` «Caza el percentil» (`games/hunt.ts`, 137601–137603): un polígono acumulado con cada punto rotulado; el valor de $P_k$ (falsas: la marca de clase, dividir entre $H_i$, el extremo), el percentil de un valor (falsas: el % del extremo superior o inferior, solo el tramo) y el porcentaje entre dos valores (falsas: intervalos enteros). $k$ nunca cae en un punto del polígono.
  - `detective` (`games/detective.ts`, 137701–137703): altura = f, media de medias, acumulado con $f_i$, punto en la marca; dividir entre $H_i$, la marca como percentil, por el extremo en vez de la amplitud, el percentil de un valor en el extremo; intervalo del extremo entero, banda con $\sigma^2$, más datos en el tramo más largo entre cuartiles, CV al revés.
- **Carrera** (`games/race.ts`, 137401–137405): cinco circuitos con 15 tipos de pregunta (porcentaje, acumulado, altura f / a; media, agrupada, dos grupos; $P_k$ interpolado, percentil de un valor, mediana; σ, varianza, CV; cuartiles, parte de un intervalo, x̄ + σ).
- **Memoria** (`games/boards.ts`, 137801–137803): f y a ↔ altura; interpolación con números ↔ valor; dos grupos ↔ media conjunta.
- **Prestados** con ids de esta unidad: «¿Qué histograma?» de 1.º Ciencias (`HistogramGame`, 137821–137823) y «Construye la caja» de 4.º (137811–137813). 7 juegos.
- **Trucos:** el evaluador de los tests no lee `\frac` con `{,}` dentro: el test de juegos cambia `{,}` por `.` antes de evaluar. Las etiquetas de los valores del polígono de «Caza el percentil» se salían por abajo: viewBox de 206 de alto.
- **Revisión:** a 375 px en eu, es y ar, el centro de juegos y los juegos con sus niveles (respondiendo): sin desbordes, sin fórmulas fuera de la pantalla ni textos fuera de los dibujos.

**Cierre:** 3280 tests, lint y build en verde; inventario OK (4 juegos y 3 herramientas propios). Hoja de euskera hecha con `hoja-revision.mjs` (fuera del repositorio, `~/Documents/Matella-fuentes/batx1g-estadistica/hoja-euskera-estatistika-batx1g.html`; solo las 9 lecciones nuevas, las prestadas ya se revisaron en Ciencias). Al fusionar: este tema activa su línea de `courses.ts` y añade su ruta al final de `paths.ts` y tras la de la bidimensional de Ciencias en el router.
