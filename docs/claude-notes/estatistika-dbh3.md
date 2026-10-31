# Estatistika eta probabilitatea · 3. DBH (estadística y probabilidad)

Tema `estadistica-probabilidad` de `dbh3`. Carpeta `src/pages/dbh3-estatistika/`, `storagePrefix` `matella-estatistika-dbh3`, ruta `#/matematika/dbh3/estadistica-probabilidad`, rama `feat/estadistica-dbh3` (sale de `feat/funciones-dbh3`, ver `dbh3-plan.md`). Es la última de las 8 unidades: esta rama contiene todas.

Fuentes: Santillana 3.º U13 «Estadística» + U14 «Probabilidad»; Anaya 3.º U13–15. Ejercicios originales. Idiomas: eu, es, en, ar.

## Diseño (encargo del 2026-10-31, sin menú)

- Errores típicos: el porcentaje tomado como grados; la acumulada sin las anteriores; el extremo del intervalo como marca de clase; dividir entre el resto y no entre N; la media sin las frecuencias; la mediana sin ordenar; la frecuencia como moda; un solo dato central con N par; la varianza como σ; favorables entre desfavorables; sin devolver como si se devolviera; contar dos veces la intersección.
- Objetos de la unidad: la muestra de un colegio (200 alumnos, 40 % futboleros), el eje que no empieza en 0, el balancín de la media (¿qué nota necesito?) y una ruleta que pinta el alumno.

## Fase 1 (lecciones y contenido)
- 5 etapas: `data`, `charts`, `centre`, `spread`, `chance`. 15 temas: population-sample, frequency-table, grouped-data · bar-histogram, pie-chart, reading-charts · mean, median, mode · range-quartiles, box-plot, variance · events, laplace, compound.
- Figuras prestadas: 2. DBH Estatistika (`SampleFigure`, `CumulativeFigure`, `GroupedFigure`, `HistogramFigure`, `PieFigure`, `MisleadingFigure`, `MeanTableFigure`, `MedianTableFigure`, `SymmetryFigure`, `QuartilesFigure`, `BoxPlotFigure`, `EventsFigure`, `TreeFigure`), 4.º ap Estatistika (`VarianceFigure`, héroe `StatisticsHeroArt`), 4.º ak Probabilitatea (`TwoDiceFigure`).
- Diagnóstico 7601–7608; práctica 1–20; retos 101–115; banco 1–50.
- `stats3Checks` (en `content.ts`), como `functions3Checks` de Funciones: cálculo y datos de cada respuesta; `statsAnswer` da la respuesta exacta (fracción) y `statsWork` escribe la explicación (un paso por línea con `gathered`). Medianas y cuartiles con `percentile` de `dbh4-aplikatuak-estatistika/stats.ts` (la regla del libro, la misma que las herramientas prestadas). Las desviaciones típicas solo se piden cuando la varianza es un cuadrado perfecto.
- Respuestas: número o fracción (`readStatisticsAnswer` de 2. DBH).

## Fase 2 (laboratorio, 14 herramientas)
- 4 propias: `sample` La muestra (561xx; tamaño y nº de muestra, cada una un sorteo fijo; predicción «¿menos del 35 %, 35–45 % o más?»; ▶ elige a los alumnos), `axis` El eje engañoso (562xx; dónde empieza el eje; predicción «¿B parece menos, justo o más del doble?»; ▶ desliza el eje), `needed` ¿Qué nota necesito? (563xx; cuatro notas y la quinta; predicción «¿media menor, igual o mayor que 6?»; ▶ cae la nota y se mueve el punto de equilibrio), `spinner` La ruleta (564xx; sectores rojo/azul/verde, 10/100/1000 tiradas con sorteo fijo; predicción «¿P(rojo) menor, igual o mayor que ½?»; ▶ gira).
- 10 prestadas: `cumulative`, `histogram`, `pie`, `centre`, `box` (2. DBH Estatistika); `intervals`, `percentile`, `spread`, `union`, `urn` (4.º ap Estatistika).

## Fase 3 (juegos)
- 6 juegos: carrera (32101–32105; cada pregunta es un `StatsCheck`, probabilidades como fracción), parejas (32201–32203), `read` Lee el gráfico (32301–32303: moda, mediana, media de un diagrama de barras; las opciones falsas son los despistes típicos), `variable` ¿Qué tipo de variable? (32401–32403: tipo de variable y gráfico adecuado), `bags` ¿Qué bolsa? (32501–32503: comparar probabilidades; en el nivel 1 las dos bolsas tienen las mismas bolas, con verdes para que «igual» sea posible), `detective` Detective de estadística (32601–32603).
- Los tres juegos de dibujo y palabras comparten `QuizGames.tsx` (copiado de Funciones 3. DBH).
- Tests: `tests/estatistika-dbh3-content|lab|games.test.ts`. El test de juegos tarda (las 1000 tiradas de la ruleta y muchas semillas): no es un cuelgue.

## Estado
Hecha en la rama `feat/estadistica-dbh3`. Revisada a 375 px en eu, es y ar. Publicada el 2026-10-31.

## Publicación
Publicada en matella.net el 2026-10-31 junto con las otras 7 unidades de 3.º (fusión de avance rápido de `feat/estadistica-dbh3` en `main`, último commit 5042946; bundle `index-DSpCP6ns.js`). Comprobada en vivo a 375 px en eu, es y ar (ruta, laboratorio y juegos de las 8).
