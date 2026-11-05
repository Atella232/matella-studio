# Zenbaki errealak · 1.º Bachillerato Ciencias

Es la primera unidad de Bachillerato: curso `batx1-zientziak`, tema `numeros-reales`.

- **Carpeta:** `src/pages/batx1-zientziak-errealak`
- **`storagePrefix`:** `matella-errealak-batx1z`
- **Página:** `ErrealakBatx1zIntroPage`
- **Rama:** `feat/errealak-batx1z`, cortada de `feat/batx-modalidades` (la lista de cursos de Bachillerato, sin publicar)

## Fuentes y alcance

- **Libros:** Santillana 1.º Bach Ciencias U1, que es un solucionario con páginas escaneadas (4, 7, 8, 18–20 y 31: se renderizan y se leen como imagen), y Anaya Matemáticas I U1 (Saber Hacer).
- **Textos y ejercicios:** todos son propios. Del libro solo se ha sacado el alcance.
- **Solapamiento con 4.º académicas:** las unidades `dbh4-akademikoak-errealak`, `-potentziak` y `-konbinatoria` ya dan casi la mitad del capítulo. El dueño eligió V1:
  - lo ya visto, como repaso corto con enlaces «Antes de empezar» a esas lecciones;
  - lo nuevo de 1.º, más a fondo: lenguaje de conjuntos, prueba de que √2 es irracional, valor absoluto como distancia, entornos, cotas de error, error relativo y binomio de Newton.

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `reals` | `sets`, `irrational-proof`, `exact-line` |
| `absolute` | `interval-sets`, `absolute-value`, `neighbourhoods` |
| `errors` | `significant`, `relative`, `scientific-errors` |
| `radicals` | `radical-ops`, `rationalize`, `logarithms`, `log-unknown` |
| `newton-stage` | `combinatorial`, `newton` |

La etapa se llama `newton-stage` y no `newton` porque `newton` es el id de una lección.

## Hecho

**Fase 1+2, commit 77ac2b5:**
- **Lecciones:** las 15 tienen las diez mejoras de la teoría:
  - `lessonTexts.ts`: definiciones, «Otro ejemplo» con números propios, vocabulario y 4 «¿Por qué funciona?» (`irrational-proof`, `rationalize`, `logarithms`, `newton`);
  - `lessonChecks.ts`: error típico y «Compruébalo»;
  - 18 enlaces «Antes de empezar» a 4.º académicas.
- **Dibujos nuevos (8):** `SetsFigure` (con `figureAfterSteps`), `ExactLineFigure`, `DistanceFigure`, `NeighbourhoodFigure`, `ErrorBoundFigure`, `RelativeErrorFigure`, `LogScaleFigure` y `BinomialFigure`, más `BachRealsHeroArt`. Los demás se toman de 4.º: `IrrationalFigure`, `IntervalOpsFigure`, `ScientificOpsFigure`, `RadicalProductFigure`, `ConjugateFigure`, `LogPropertiesFigure` y `PascalFigure`.
- **Contenido:** diagnóstico 7701–7708, práctica 1–20, retos 101–115 y banco 1–50. Las respuestas son números: si el resultado es un intervalo o un conjunto, se pide uno de sus números.
- **Test nuevo:** `tests/errealak-batx1z-content.test.ts`.
- **Cambio en test común:** `tests/lesson-texts.test.ts` da 60 palabras de explicación también a las carpetas `batx*`.
- **Comprobación:** 2101 tests, lint y build en verde. Revisado a 375 px en eu, es y ar:
  - las 15 lecciones, con los pasos abiertos, «¿Por qué funciona?» y una palabra;
  - el inicio, el diagnóstico, la práctica, el banco, los retos y el resumen.

  No se sale nada de la pantalla y no hay errores de KaTeX. Las franjas de tareas que se deslizan de lado son las mismas que en 4.º.

**Fase 3, laboratorio, commit 707b1bc:** 11 herramientas.
- **Propias (3),** con predicción antes del resultado y retos infinitos (`freshFrom` de `dbh3-segidak/lab/prediction.ts`):
  - L1 `distance` «Distancia en la recta», retos 99101–99105: entorno E(a, r) y punto x; predice dentro, borde o fuera.
  - L2 `slide-rule` «La regla de cálculo», retos 99201–99205: dos escalas logarítmicas que se deslizan con ▶; predice si el producto es menor, igual o mayor que la suma.
  - L3 `error-band` «La banda del error», retos 99301–99305: redondear o truncar π, √2, e, φ, 1/7, 0,045918 o 1234,567; predice si el valor exacto queda por debajo o por encima.
- **Prestadas (8),** con sus retos e ids de 4.º:
  - de `dbh4-akademikoak-errealak`: Pitágoras;
  - de `dbh4-aplikatuak-errealak`: intervalos y redondeo;
  - de `dbh4-akademikoak-potentziak`: sacar factores, índice común, conjugado y cambio de base;
  - de `dbh4-akademikoak-konbinatoria`: Tartaglia.
- **Piezas comunes:** `Board`, `Readout`, `Predict` y `PlayButton` de `dbh3-segidak/lab/LabParts.tsx`, y `usePlayback` de `dbh4-aplikatuak-proportzionaltasuna/lab`.
- **Test:** `tests/errealak-batx1z-lab.test.ts`. 2105 tests en verde.
- **Revisión:** las 11 herramientas a 375 px en eu, es y ar, sin desbordes ni texto fuera del tablero.

## Trucos

- Las funciones `howMuch(formula)` y `calc(formula)` copian el texto de la fórmula a los cuatro idiomas: no se les puede pasar texto en euskera. Para eso, `say()`.
- **Test de igualdades de las lecciones:** con `\approx` compara usando los decimales escritos. Un redondeo a centenas (`25\,371\approx 25\,400`) falla, así que ahí se escribe `\to`.
- **Test de «Compruébalo»:** si la pregunta es una ecuación con logaritmos y las opciones son `x=4`, intenta evaluar `\log` y falla. Las opciones van como número suelto (`$4$`).
- **Árabe en los dibujos:** una fórmula con superíndice suelto, como `(a + b)ⁿ`, se desordena dentro de una frase en árabe. En ese pie se escribe en palabras.

## En curso

Lo siguiente es la fase 4, los juegos:
- J1 «Entorno al blanco»;
- J2 «El coeficiente escondido»;
- J4, un detective con los errores típicos de la unidad;
- la carrera y las parejas, reutilizadas.

Ids de progreso libres desde 99001 (el mayor en uso es 98603).

Publicar necesita el visto bueno del dueño. Se publicará junto con la lista de Bachillerato de `feat/batx-modalidades`.
