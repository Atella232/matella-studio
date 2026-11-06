# Estatistika bidimentsionala · 1.º Bachillerato Ciencias

Sexta unidad de 1.º Ciencias (curso `batx1-zientziak`, tema `estadistica-bidimensional`), tercera del bloque «Álgebra y estadística» del reparto en paralelo (ver `bachillerato.md`). Solo la versión de Ciencias: la de Sociales se decidirá más adelante.

- **Carpeta:** `src/pages/batx1-zientziak-bidimentsionala`
- **`storagePrefix`:** `matella-bidimentsionala-batx1z`
- **Rama:** `feat/bidimentsionala-batx1z`, cortada de `feat/estatistika-batx1z` 854e9ac9
- **Bloque de ids:** 115000–115999 (diagnóstico 115001–115008, laboratorio propio 115101–115399, juegos 115401–115899)
- **Registro:** en `src/data/courses.ts`, solo la línea de Ciencias (`batx1-zientziak`, `estadistica-bidimensional`); la de Sociales no se toca.

## Fuentes

- **Santillana 1.º Bach Ciencias U14** «Estadística bidimensional» (solucionario; páginas 25, 30, 31 y 36 escaneadas y casi vacías) + **Anaya Matemáticas I Ciencias U13** «Distribuciones bidimensionales» (solucionario «Saber hacer»). Ficha fuera del repositorio, en `~/Documents/Matella-fuentes/batx1z-bidimensional/`.
- **Solapamiento con 4.º:** 4.º académicas ya tiene nube de puntos, correlación y recta de regresión con la pendiente dada (etapa `two`); 4.º aplicadas tiene la tabla de contingencia con probabilidades. Lo nuevo de 1.º: tablas de doble entrada con marginales, condicionadas e independencia; covarianza; r calculado; recta de Y sobre X y de X sobre Y; las dos rectas (corte en (x̄, ȳ), r² = producto de pendientes, ángulo); cambio de unidades; datos agrupados en las dos variables.

## Elección del dueño (2026-11-06)

«Las recomendadas»: F1 (Santillana marca el orden; Anaya añade las dos rectas, el cambio de unidades y relación funcional frente a estadística), V1 (16 lecciones en 5 etapas con «Repasa antes» a 4.º), L1–L3 propias (cuadrantes, tijeras, ¿independientes?), M (de 4.º ap, «La nube, r y la recta» y «Tabla de contingencia»), J1 (signo de la covarianza), J2 (¿qué rectas?), J4 (detective) y J5 (carrera, memoria y «Adivina la correlación» de 4.º).

## Fase 1+2: lecciones y contenido (commit 39d203f5)

- **Etapas y lecciones (16):** tablas (`two-variables`, `marginal`, `conditional`, `independence`), nube (`scatter-dependence`, `quadrants`), parámetros (`covariance`, `correlation-coefficient`, `units-change`), rectas (`regression-yx`, `estimation`, `regression-xy`, `two-lines`) y problemas (`grouped-pairs`, `calculation-table`, `inverse-problems`). «¿Por qué funciona?» en independencia, covarianza, cambio de unidades, X sobre Y y las dos rectas.
- **Cuentas comunes** en `bivariate.ts` (medias, varianzas, σxy, r, las dos rectas, independencia, corte de dos rectas, si un par de rectas es posible) y **datos de las figuras** en `data.ts`, para que los tests comprueben que cada figura dibuja los números de su lección.
- **Figuras nuevas** (`figures.tsx`): pares contados en la tabla, márgenes, dos condicionadas en barras, tabla completada para independencia, tres nubes (funcional, fuerte negativa, sin dependencia), cuadrantes con rectángulos con signo, tabla de la covarianza, la misma nube en m y en cm, recta de Y sobre X (distancias verticales) y de X sobre Y (horizontales) con un componente, estimación dentro y fuera de los datos (datos `sunPairs` de 4.º ap), las dos rectas cortándose en (5, 10), tabla con intervalos y la tabla de cálculo. Prestada: `CorrelationFigure` (4.º ap).
- **Notación:** σxy, σx, σy, r; pendientes $m_{yx}=\frac{\sigma_{xy}}{\sigma_x^2}$ y $m_{xy}=\frac{\sigma_{xy}}{\sigma_y^2}$; la recta de X sobre Y siempre como x = …, para que $r^2=m_{yx}\cdot m_{xy}$ sea directo. En euskera, «Y-ren X-rekiko erregresio-zuzena».
- **Contenido:** diagnóstico 115001–115008; práctica 1–20; retos 101–115; banco 1–50 (10 por etapa). Respuestas con `readStatisticsAnswer`.
- **Trucos:** los pares van siempre como fórmula `$(2,\,1)$` para que el árabe no les dé la vuelta. `deviationProducts` suma `+ 0` para no dar −0. A 375 px las figuras se ven pequeñas: la tabla de doble entrada usa números de 24.
- **Revisión:** las 16 lecciones a 375 px en eu, es y ar con todos los pasos abiertos: sin desbordes, sin textos que se pisen o se salgan de las figuras (medido con `getBBox`) y sin LaTeX sin dibujar.

## Fase 3: laboratorio

- **Propias** (en `lab/`, con predicción y retos infinitos):
  - `independence` «¿Independientes?» (`independenceTable.ts`): tabla 2 × 2 chicas/chicos × deporte sí/no con cuatro contadores; cada fila es una barra del 100 % y una raya marca la parte de «sí» del total. Se predice en qué fila es mayor la parte de «sí» (o si es igual). La lectura da las dos condicionadas y la casilla que pediría la independencia. Retos 115301–115303.
  - `quadrants` «Los cuatro cuadrantes» (`quadrantBoard.ts`): cinco puntos en una rejilla 0–8 que se arrastran (o con contadores); el centro de gravedad se mueve con ellos y, tras predecir el signo de σxy, salen los rectángulos verdes y corales. Retos 115101–115103; los infinitos piden σxy de −3 a 3 (puntos alrededor de (4, 4) con dy = s·dx más un patrón que suma 1).
  - `scissors` «Las tijeras» (`scissors.ts`): diez puntos con x̄ = 5, ȳ = 10, σx = 2, σy = 4 y el r elegido en décimas (u·cos θ + v·sin θ con u ⊥ v, así r es exacto). Las rectas anteriores quedan a trazos; se predice si las nuevas estarán más cerradas, igual o más abiertas. ▶ mueve r de −1 a 1. Retos 115201–115203.
- **Prestadas** de 4.º ap con sus ids: `contingency` (para las condicionadas) y `scatter` (la nube, r y la recta). 5 herramientas en total.
- **Trucos:** las dos rectas de las tijeras llevan colores fijos (azul Y sobre X, rojo X sobre Y): `STAGE` y `SECOND` cambian con la etapa y la leyenda no cuadraría. En árabe, el r de las fórmulas tiene que llevar punto (`tenthsLatex` da `{,}`: se cambia antes de MathText). La lectura en varias líneas, no con `\qquad`, para que quepa a 375 px.
- **Revisión:** a 375 px en eu, es y ar, las cinco herramientas antes y después de predecir: sin desbordes, sin textos fuera del tablero y sin fórmulas que se deslicen. De paso, en las lecciones se partieron en filas (`gathered`) seis fórmulas de pasos que pasaban del ancho de su caja.

## En curso

- Fases 1+2 y 3 hechas. Siguiente: fase 4, juegos (J1 «Signo de la covarianza», J2 «¿Qué rectas?», J4 detective, J5 carrera, memoria y `cloud` de 4.º), ids 115401–115899.
