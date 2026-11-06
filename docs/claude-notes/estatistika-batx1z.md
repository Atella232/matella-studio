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
- **Percentiles:** la web sigue la regla de 4.º (posición N·k/100; si no es entera, el dato siguiente; si es entera, la media de ese dato y el siguiente). Santillana toma «la primera F mayor que N·k/100», que da otro valor cuando la posición es entera. La unidad solo pregunta posiciones enteras donde las dos reglas coinciden; `tests/estatistika-batx1z-content.test.ts` lo comprueba en cada percentil. **Decisión del dueño (2026-11-06): se queda la regla de 4.º**, la que ya usa la web.
- **Trucos:** las fórmulas que empiezan por z se escriben `{z}`; en euskera, nada de «50i» o «120ri»: «50 bazkideri». El orden de las fórmulas de una definición debe ser el mismo en los cuatro idiomas.
- **Revisión:** las 16 lecciones a 375 px en eu, es y ar sin desbordes ni textos que se pisen o se salgan de las figuras (medido con `getBBox`, el panel estaba oculto); en árabe también portada, diagnóstico, práctica, ejercicios y retos.

## Fase 3: laboratorio (commit 5aec662e)

- **Propias** (en `lab/`, con predicción y retos infinitos):
  - `score` «La puntuación típica» (`standardScore.ts`): dos notas A y B, cada una con su media y su σ; antes de predecir están en una regla de notas 0–10 y después las reglas se alinean en desviaciones típicas (▶ «Alinear en σ»). Todo en mitades, para que z salga exacta. Retos 114101–114103.
  - `outlier` «¿Atípico o no?» (`outlierBand.ts`): 19 tiempos fijos alrededor de 20 (con el dato en 20, x̄ = 20 y σ² = 8) y un dato que se arrastra de 0 a 50; regla x̄ ± 3σ o de la caja. El dato se esconde a sí mismo: 32 no es atípico y 33 sí; 8 no y 7 sí. Con 10 datos ningún dato puede pasar de 3σ (z máxima (n − 1)/√n ≈ 2,85): por eso hay 20. ▶ mueve el dato de 0 a 50. Retos 114201–114203.
  - `tail` «La cola del histograma» (`histogramTail.ts`): libros leídos 0–6, una barra por valor (se toca la barra y se cambia su frecuencia); Mo, Me, x̄ y la caja debajo. Retos 114301–114303.
- **Prestadas** con sus ids: de 4.º ak `cumulative`, `intervals`, `centre`, `histogram`, `balance` (para el dato que falta), `percentile`, `whiskers`, `deviation`, `table`, `transform`; de 3.º `axis` (el eje engañoso, para los gráficos). 14 herramientas en total.
- **Trucos:** en una lectura de LaTeX, nada de «:» (MathText lo convierte en ÷): `\to`. En euskera, «0 eta 50 artean», no «0tik 50era».
- **Revisión:** las 14 herramientas a 375 px en eu, es y ar con la predicción hecha: sin desbordes ni textos que se pisen o se salgan del tablero.

## Fase 4: juegos (commit 527f19a5)

- **Propios:**
  - `standout` «¿Quién destaca más?» (`games/standout.ts`, niveles 114501–114503): dos notas, después tiempos (gana la z más negativa) y tres notas; en 4 de las 6 rondas el mejor resultado bruto no es el que más destaca. Todo en décimas para que z sea exacta.
  - `histogram` «¿Qué histograma?» (`games/whichHistogram.ts`, 114601–114603): tres diagramas de diez datos con formas simétricas; mayor (o menor) σ, mayor CV con las medias movidas (la mayor σ no siempre es el mayor CV) y un x̄ y una σ dados con dos señuelos (misma media, misma σ).
  - `detective` (`games/detective.ts`, 114701–114703): marca de clase, mediana sin ordenar, dividir entre el número de valores, el dato que falta como media; posición no entera redondeada hacia abajo, límite sin el 1,5, varianza sin − x̄², CV al revés; z entre σ², banda con σ², sumar cambia σ, y en tiempos la z más alta como la mejor.
- **Carrera** (`games/race.ts`, 114401–114405): cinco circuitos con 15 tipos de pregunta; los percentiles nunca caen en posición entera y la mediana se pregunta con N impar.
- **Memoria** (`games/boards.ts`, 114801–114803): datos ↔ media, (x − x̄)/σ con números ↔ z, x̄ y σ ↔ CV.
- **Prestado:** `box` «Construye el diagrama de caja» de 4.º con niveles 114811–114813. Ojo: sus niveles con N par usan la regla de la web (media de dos datos) en posiciones enteras.
- **Trucos:** en la memoria, «x = 5 / x̄ = 6, σ = 1» no cabía en la tarjeta a 375 px: se escribe `\frac{5-6}{1}`. El evaluador de los tests no lee `\frac` con `{,}` dentro: la memoria cambia `{,}` por `.` antes de evaluar.
- **Revisión:** a 375 px en eu, es y ar, el centro de juegos y los seis juegos con sus niveles (respondiendo): sin desbordes ni LaTeX sin dibujar.

**Cierre:** 2253 tests, lint y build en verde; inventario OK (3 juegos y 3 herramientas propios). Revisado a 375 px en eu, es y ar: las 16 lecciones, las 14 herramientas, los juegos, práctica, ejercicios, retos, diagnóstico y portada. Hoja de euskera hecha con `hoja-revision.mjs` (fuera del repositorio) y mandada al dueño. La regla de percentiles se queda como en 4.º (decisión del dueño, 2026-11-06). Los ejercicios, retos, banco, carrera y detective solo preguntan posiciones donde las dos reglas coinciden, pero la regla de la web sigue a la vista donde no coinciden: la explicación de `quartiles-percentiles`, su error típico (N = 40, Q₁ como media de los datos 10.º y 11.º), la figura prestada `QuartileRuleFigure` (12 · 0,25 = 3 → (3 + 4) : 2), la cinta de percentiles y el juego de la caja de 4.º con N par, y los límites de la caja de la herramienta `outlier` (con el dato en 30, Q₃ = 22,5 con la web y 23 con el libro).

## Publicación

Publicada en matella.net el 2026-11-06 junto con otros ocho temas de 1.º Ciencias (`main` 27c197e, bundle `index-7UBtIGbr.js`). Al fusionar solo chocaron `courses.ts`, el router y `paths.ts`, en las líneas de registro. Antes de publicar: 2501 tests, lint y build en verde, y sin choques de ids, claves de guardado ni CSS con los otros temas. Comprobado en vivo a 375 px en eu, es y ar (portada, tres lecciones, laboratorio y juegos): sin desbordes, sin errores de KaTeX y sin errores en la consola.

Regla de percentiles: el 2026-11-06 el dueño eligió la de 4.º, la que ya usa la web, así que no hay que cambiar nada.
