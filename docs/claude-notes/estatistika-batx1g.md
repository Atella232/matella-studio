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

## En curso

- Fase 3 (laboratorio): empezada la lógica de L1 (`lab/ogive.ts`). Siguiente: L2 `between`, L3 `widths`, la interfaz, las prestadas y `tests/estatistika-batx1g-lab.test.ts`.
