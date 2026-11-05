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

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 tienen las diez mejoras de la teoría:
  - `lessonTexts.ts`: definiciones, «Otro ejemplo» con números propios, vocabulario y 4 «¿Por qué funciona?» (`fibonacci`, `periodic-decimals`, `squares-sum`, `quotient-limits`);
  - `lessonChecks.ts`: error típico y «Compruébalo»;
  - 11 enlaces «Antes de empezar» a 3.º (`dbh3/sucesiones`) y a 4.º académicas (`generatrix`, `compound-interest`).
- **Dibujos nuevos (8):** `MonotonyFigure`, `PeriodicFigure`, `SquaresPyramidFigure`, `ConvergeFigure` (con `band` para «a partir de qué término»), `InfiniteLimitFigure`, `QuotientLimitFigure`, `ENumberFigure` y `ContinuousGrowthFigure` (con `figureAfterSteps`), más `BachSequencesHeroArt`. Los demás se toman de 3.º (`SticksFigure`, `RecursiveFigure`, `JumpsFigure`, `BounceFigure`, `HalvesFigure`) y de 4.º académicas (`CompoundInterestFigure`).
- **Contenido:** diagnóstico 7801–7808, práctica 1–20, retos 101–115 y banco 1–50. Las respuestas son números: cuando el resultado es ±∞ o una potencia de e, se pide un valor aproximado o no hay casilla.
- **Test nuevo:** `tests/segidak-batx1z-content.test.ts`.
- **Arreglo en 3.º:** el pie de `RecursiveFigure` en castellano se salía del dibujo a 375 px; ahora es más corto.
- **Comprobación:** 2134 tests, lint y build en verde. Revisado a 375 px en eu, es y ar (63 páginas: las 15 lecciones con los pasos abiertos y cada palabra, el resumen, el inicio, la práctica, el banco, los retos y el diagnóstico). No se sale nada de la pantalla y no hay errores de KaTeX.

## Trucos

- Las fórmulas con dos o tres cálculos unidos por `\qquad` bajaban a 13 px a 375 px. Se parten en filas con `\begin{gathered}…\\…\end{gathered}`. Las que siguen a 16 px son fórmulas dentro de texto de 16 px, y eso está bien.
- En la prueba de «mismas fórmulas en los cuatro idiomas», el orden cuenta y `\varepsilon` no se cambia por x: en euskera hubo que reordenar dos frases para que $\varepsilon$ y $L$ salieran en el mismo orden que en castellano.

## En curso

- **Fase 3, laboratorio:** propias L1 «Fibonacci y el número de oro», L2 «La banda del límite» y L3 «La máquina de e», con retos 100101–100305; prestadas de 3.º (palillos, rana, barras de Gauss, pelota y barra), con sus ids de 3.º.
- **Fase 4, juegos:** propios J1 «¿Hacia dónde va?», J2 «Atrapa la banda» y J4 detective; carrera y memoria; y de 3.º «El patrón escondido», «El clasificador» y «La escalera de Gauss», con ids de progreso nuevos (100xxx).
- Después: hoja de revisión en euskera, y publicar solo con el visto bueno del dueño.
