# Estatistika unidimentsionala · 1.º Bachillerato Ciencias

Quinta unidad de 1.º Ciencias (curso `batx1-zientziak`, tema `estadistica`), segunda del bloque «Álgebra y estadística» del reparto en paralelo (ver `bachillerato.md`). Solo la versión de Ciencias: la de Sociales se decidirá más adelante.

- **Carpeta:** `src/pages/batx1-zientziak-estatistika`
- **`storagePrefix`:** `matella-estatistika-batx1z`
- **Rama:** `feat/estatistika-batx1z`, cortada de `feat/sistemak-batx1z` 35b6d4a
- **Bloque de ids:** 114000–114999 (diagnóstico 114001–114008, laboratorio propio 114101–114399, juegos 114401–114899)

## Fuentes

- **Santillana 1.º Bach Ciencias U13** «Estadística unidimensional» (solucionario; las páginas 21, 32 y 33 están escaneadas). Anaya Matemáticas I de Ciencias no trae este tema (su U13 es la bidimensional).
- **Solapamiento con 4.º académicas** (`dbh4-akademikoak-estatistika`): muestreo, tablas, intervalos, media, mediana, moda, agrupados, cuartiles, percentiles, caja, desviación media, varianza y CV ya están. Lo nuevo de 1.º: √N intervalos, pirámides y diagramas comparados, el dato que falta con un sistema, percentiles de tablas agrupadas, asimetría, atípicos con x̄ ± 3σ, puntuaciones típicas (x − x̄)/σ, y cómo cambian x̄ y σ al transformar o añadir datos.

## Elección del dueño (2026-11-05)

«Las recomendadas»: F1 (solo Santillana), V1 (16 lecciones con repaso de 4.º y enlaces «Repasa antes»), L1–L3 propias, M (herramientas prestadas de 4.º y el eje engañoso de 3.º), J1, J2, J4 y J5.

## Fase 1+2: lecciones y contenido (commit d3323209)

- **Etapas y lecciones (16):** datos (`population-sample`, `frequency-tables`, `class-intervals`, `charts`), centralización (`centre-measures`, `grouped-centre`, `missing-datum`), posición (`quartiles-percentiles`, `box-plot`, `skewness`), dispersión (`range-mean-deviation`, `variance-sd`, `coefficient-variation`) e interpretar (`outliers`, `standard-scores`, `transform-data`).
- **Figuras nuevas** (`figures.tsx`): pirámide, goles en puntos con la media como balanza, la tabla con dos frecuencias que faltan, histograma de edades, caja con sus límites, tres formas (asimetría), tabla de la varianza, banda x̄ ± 3σ, dos reglas en desviaciones típicas y los datos ×1,8 + 32. Cada una dibuja los números de su «Resolvamos». Prestadas: `SampleFigure`, `CumulativeFigure`, `DeviationFigure` (2.º), `QuartileRuleFigure` (4.º ak) e `IntervalsFigure`, `VariationFigure` (4.º ap).
- **Contenido:** diagnóstico 114001–114008; práctica 1–20 (4 por etapa); retos 101–115; banco 1–50 (10 por etapa). Respuestas con `readStatisticsAnswer` (vale 35 %, 0,15 y 0.15).
- **Percentiles:** la web sigue la regla de 4.º (posición N·k/100; si no es entera, el dato siguiente; si es entera, la media de ese dato y el siguiente). Santillana toma «la primera F mayor que N·k/100», que da otro valor cuando la posición es entera. La unidad solo pregunta posiciones enteras donde las dos reglas coinciden; `tests/estatistika-batx1z-content.test.ts` lo comprueba en cada percentil. **Hay que comentárselo al dueño.**
- **Trucos:** las fórmulas que empiezan por z se escriben `{z}`; en euskera, nada de «50i» o «120ri»: «50 bazkideri». El orden de las fórmulas de una definición debe ser el mismo en los cuatro idiomas.
- **Revisión:** las 16 lecciones a 375 px en eu, es y ar sin desbordes ni textos que se pisen o se salgan de las figuras (medido con `getBBox`, el panel estaba oculto); en árabe también portada, diagnóstico, práctica, ejercicios y retos.

## En curso

- Siguiente: fase 3, laboratorio (L1 «La puntuación típica», L2 «¿Atípico o no?», L3 «La cola del histograma», ids 1141xx–1143xx; después las prestadas de 4.º y el eje engañoso de 3.º).
