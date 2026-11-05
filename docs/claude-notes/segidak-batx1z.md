# Segidak · 1.º Bachillerato Ciencias

Es la segunda unidad de Bachillerato: curso `batx1-zientziak`, tema `sucesiones`.

- **Carpeta:** `src/pages/batx1-zientziak-segidak`
- **`storagePrefix`:** `matella-segidak-batx1z`
- **Página:** `SegidakBatx1zIntroPage`
- **Rama:** `feat/segidak-batx1z`, cortada de `main` 1bcf7da

## Fuentes y alcance

- **Libro:** Anaya Matemáticas I U2. Santillana 1.º Bach Ciencias no tiene unidad de sucesiones.
- **Textos y ejercicios:** todos son propios. Del libro solo se ha sacado el alcance.
- **Solapamiento con 3.º:** `dbh3-segidak` ya da términos, recurrencia y progresiones. El dueño eligió V1:
  - lo ya visto, como repaso corto con enlaces «Antes de empezar» a esas lecciones;
  - lo nuevo de 1.º, más a fondo: Fibonacci y el número áureo, monotonía, decimales periódicos como suma infinita, suma de cuadrados, límite de una sucesión, «a partir de qué término», límites infinitos y oscilantes, cociente de polinomios, el número e y el crecimiento continuo.

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `sequences` | `terms`, `fibonacci`, `monotony` |
| `progressions` | `arithmetic`, `geometric`, `progression-problems` |
| `infinite-sums` | `geometric-series`, `periodic-decimals`, `squares-sum` |
| `limits` | `converge`, `from-term`, `infinite-limits`, `quotient-limits` |
| `number-e` | `e-number`, `continuous-growth` |

## Hecho

**Fase 1+2, lecciones y contenido, commit aee1b07:**
- **Lecciones:** las 15 tienen las diez mejoras de la teoría:
  - `lessonTexts.ts`: definiciones, «Otro ejemplo» con números propios, vocabulario y 4 «¿Por qué funciona?» (`fibonacci`, `periodic-decimals`, `squares-sum`, `quotient-limits`);
  - `lessonChecks.ts`: error típico y «Compruébalo»;
  - 11 enlaces «Antes de empezar» a 3.º (`dbh3/sucesiones`) y a 4.º académicas (`generatrix`, `compound-interest`).
- **Dibujos nuevos (8):** `MonotonyFigure`, `PeriodicFigure`, `SquaresPyramidFigure`, `ConvergeFigure` (con `band` para «a partir de qué término»), `InfiniteLimitFigure`, `QuotientLimitFigure`, `ENumberFigure` y `ContinuousGrowthFigure` (con `figureAfterSteps`), más `BachSequencesHeroArt`. Los demás se toman de 3.º (`SticksFigure`, `RecursiveFigure`, `JumpsFigure`, `BounceFigure`, `HalvesFigure`) y de 4.º académicas (`CompoundInterestFigure`).
- **Contenido:** diagnóstico 7801–7808, práctica 1–20, retos 101–115 y banco 1–50. Las respuestas son números: cuando el resultado es ±∞ o una potencia de e, se pide un valor aproximado o no hay casilla.
- **Test nuevo:** `tests/segidak-batx1z-content.test.ts`.
- **Arreglo en 3.º:** el pie de `RecursiveFigure` en castellano se salía del dibujo a 375 px; ahora es más corto.
- **Comprobación:** 2134 tests, lint y build en verde. Revisado a 375 px en eu, es y ar (63 páginas: las 15 lecciones con los pasos abiertos y cada palabra, el resumen, el inicio, la práctica, el banco, los retos y el diagnóstico). No se sale nada de la pantalla y no hay errores de KaTeX.

**Fase 3, laboratorio, commit 48f1f77:** 8 herramientas.
- **Propias (3),** con predicción antes del resultado y retos infinitos (`freshFrom` de `dbh3-segidak/lab/prediction.ts`):
  - L1 `fibonacci` «Fibonacci y el número de oro», retos 100101–100105: dos términos iniciales y la regla; los cocientes saltan por encima y por debajo de φ. Predice si el último cociente queda por debajo, igual o por encima de φ («igual» nunca pasa: φ es irracional). ▶ dibuja los cocientes de uno en uno.
  - L2 `limit-band` «La banda del límite», retos 100201–100205: tres sucesiones convergentes, ε (0,5; 0,25; 0,1; 0,05) y un término N; predice si N es demasiado pronto, justo el primero o más tarde de lo necesario. La distancia al límite se escribe exacta (1/n, 4/(n + 1)), sin redondeos.
  - L3 `e-machine` «La máquina de e», retos 100301–100305: 1 € con k = 1, 2 o 3 y n pagos al año (1, 2, 4, 12, 52, 365, 1000); la escalera (1 + k/n)ⁿ junto a la curva eᵏᵗ. Predice si el año acaba por debajo o por encima de eᵏ cortado a una cifra (2,7; 7,3; 20). ▶ sube la escalera.
- **Prestadas (5),** con sus retos e ids de 3.º: palillos, rana, barras de Gauss, pelota y barra.
- **Test:** `tests/segidak-batx1z-lab.test.ts`. 2138 tests en verde.
- **Revisión:** las 8 herramientas a 375 px en eu, es y ar (antes y después de predecir, con ▶, pista y reto infinito), sin desbordes ni texto fuera del tablero.

**Fase 4, juegos, commits e68f652 y 18da898:** 8 juegos. `recordsKey` `matella-segidak-batx1z-game-records`.
- **Propios (3):**
  - J1 `where` «¿Hacia dónde va?» (`/jokuak/nora`), progreso 100501–100503: una sucesión y cuatro destinos (un número, +∞, −∞ o «no tiene límite»). Niveles: cocientes de polinomios, potencias y signos, el número e. Los distractores son los errores típicos (cociente al revés, términos independientes, 0 para todo, k·e, 1).
  - J2 `band` «Atrapa la banda» (`/jokuak/banda`), progreso 100601–100603: se escribe el primer término N dentro de la banda. Niveles: L + c/n, cocientes (Ln + c₀)/(n + b), y c/n² o (−1)ⁿ·c/n. ε = p/q y la desigualdad se decide con enteros.
  - J4 `detective` «Detective de sucesiones», progreso 100701–100703: 12 errores de la unidad en tres niveles (n·d, rⁿ, suma sin dividir entre 2, p/100 como razón; S∞ con |r| ≥ 1, periodo entre 100, términos independientes, grado mayor abajo → ∞; (1 + 1/n)ⁿ → 1, k·e, N = 1/ε, crecimiento continuo sin t).
- **Carrera** (100401–100405, 15 tipos de pregunta en 5 circuitos) y **memoria** (100801–100803: término, suma infinita, límite).
- **De 3.º,** con sus pantallas y los ids de progreso de esta unidad (el hub da el id): «El patrón escondido» 100811–100813, «El clasificador» 100821–100823, «La escalera de Gauss» 100831–100833.
- **Test:** `tests/segidak-batx1z-games.test.ts`: en «¿Hacia dónde va?» cada respuesta se comprueba evaluando la sucesión en n = 200 000.
- **Inventario:** OK (2 juegos propios más el detective; 3 herramientas propias).
- **Comprobación:** 2144 tests, lint y build en verde. Revisado a 375 px en eu, es y ar: el hub y los 8 juegos, empezando un nivel (dos en los propios) y contestando tres rondas, y las 48 cartas de la memoria vueltas en eu y ar; sin desbordes ni errores de KaTeX.

## Trucos

- Las fórmulas con dos o tres cálculos unidos por `\qquad` bajaban a 13 px a 375 px. Se parten en filas con `\begin{gathered}…\\…\end{gathered}`. Las que siguen a 16 px son fórmulas dentro de texto de 16 px, y eso está bien.
- En la memoria, una tarjeta como `a_n=6n-4,\ a_{8}` medía 122 px en una tarjeta de 106 px a 375 px: el término va en dos filas con `gathered`. Para revisar la memoria hay que dar la vuelta a las cartas (`.fraction-v2-memory-card`) y comparar cada `.katex` con su tarjeta, no con la pantalla.
- Los juegos de 3.º (`HiddenGame`, `SorterGame`, `StaircaseGame`) no aceptan otra ficha de juego, pero no hace falta: el hub de esta unidad da el id de progreso al terminar un nivel.
- En la prueba de «mismas fórmulas en los cuatro idiomas», el orden cuenta y `\varepsilon` no se cambia por x: en euskera hubo que reordenar dos frases para que $\varepsilon$ y $L$ salieran en el mismo orden que en castellano.

## Publicación

- **2026-11-05**, con el visto bueno del dueño («Sí, publica»): `main` 18da898 (avance rápido desde 1bcf7da), publicado desde un worktree limpio. Bundle `index-DG8lej_T.js` y `index-DWvHYxm_.css`.
- Con la unidad también se publicó el pie más corto de `RecursiveFigure` de 3.º.
- Comprobado en vivo en matella.net a 375 px en eu, es y ar: inicio, cinco lecciones, resumen, práctica, banco, retos, diagnóstico, las tres herramientas propias y una prestada, el hub y cuatro juegos (60 vistas). Sin desbordes, sin errores de KaTeX y sin errores en la consola.
