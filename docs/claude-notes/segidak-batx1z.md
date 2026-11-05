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

**Fase 3, laboratorio:** 8 herramientas.
- **Propias (3),** con predicción antes del resultado y retos infinitos (`freshFrom` de `dbh3-segidak/lab/prediction.ts`):
  - L1 `fibonacci` «Fibonacci y el número de oro», retos 100101–100105: dos términos iniciales y la regla; los cocientes saltan por encima y por debajo de φ. Predice si el último cociente queda por debajo, igual o por encima de φ («igual» nunca pasa: φ es irracional). ▶ dibuja los cocientes de uno en uno.
  - L2 `limit-band` «La banda del límite», retos 100201–100205: tres sucesiones convergentes, ε (0,5; 0,25; 0,1; 0,05) y un término N; predice si N es demasiado pronto, justo el primero o más tarde de lo necesario. La distancia al límite se escribe exacta (1/n, 4/(n + 1)), sin redondeos.
  - L3 `e-machine` «La máquina de e», retos 100301–100305: 1 € con k = 1, 2 o 3 y n pagos al año (1, 2, 4, 12, 52, 365, 1000); la escalera (1 + k/n)ⁿ junto a la curva eᵏᵗ. Predice si el año acaba por debajo o por encima de eᵏ cortado a una cifra (2,7; 7,3; 20). ▶ sube la escalera.
- **Prestadas (5),** con sus retos e ids de 3.º: palillos, rana, barras de Gauss, pelota y barra.
- **Test:** `tests/segidak-batx1z-lab.test.ts`. 2138 tests en verde.
- **Revisión:** las 8 herramientas a 375 px en eu, es y ar (antes y después de predecir, con ▶, pista y reto infinito), sin desbordes ni texto fuera del tablero.

## Trucos

- Las fórmulas con dos o tres cálculos unidos por `\qquad` bajaban a 13 px a 375 px. Se parten en filas con `\begin{gathered}…\\…\end{gathered}`. Las que siguen a 16 px son fórmulas dentro de texto de 16 px, y eso está bien.
- En la prueba de «mismas fórmulas en los cuatro idiomas», el orden cuenta y `\varepsilon` no se cambia por x: en euskera hubo que reordenar dos frases para que $\varepsilon$ y $L$ salieran en el mismo orden que en castellano.

## En curso

- **Fase 4, juegos:** propios J1 «¿Hacia dónde va?», J2 «Atrapa la banda» y J4 detective; carrera y memoria; y de 3.º «El patrón escondido», «El clasificador» y «La escalera de Gauss», con ids de progreso nuevos (100xxx).
- Después: hoja de revisión en euskera, y publicar solo con el visto bueno del dueño.
