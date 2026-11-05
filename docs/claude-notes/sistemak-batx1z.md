# Ekuazio-sistemak · 1.º Bachillerato Ciencias

Cuarta unidad de 1.º Ciencias (curso `batx1-zientziak`, tema `sistemas`), primera del bloque «Álgebra y estadística» del reparto en paralelo (ver `bachillerato.md`).

- **Carpeta:** `src/pages/batx1-zientziak-sistemak`
- **`storagePrefix`:** `matella-sistemak-batx1z`
- **Página:** `SistemakBatx1zIntroPage`
- **Rama:** `feat/sistemak-batx1z`, cortada de `main` 2ff41c2
- **Bloque de ids:** 113000–113999 (diagnóstico 113001–113008, laboratorio propio 113101–113399, juegos 113401–113899)

## Fuentes y alcance

- **Libros:** Santillana 1.º Bach Ciencias U3 «Sistemas de ecuaciones» (solucionario; la capa de texto de las fórmulas está rota, se leyó como imagen) y Anaya Matemáticas I U3 «Álgebra», apartados 4, 5 y 7 y sus problemas (la parte de ecuaciones ya está en `ekuazioak-batx1z`).
- **Textos y ejercicios:** todos propios. Del libro solo se ha sacado el alcance.
- **Santillana no trae** inecuaciones con dos incógnitas: salen de Anaya U3.7.

**Lo que eligió el dueño («Las recomendadas», 2026-11-05):**
- **V1:** lo de 4.º académicas (`dbh4-akademikoak-sistemak`) como repaso corto con «Antes de empezar»; lo nuevo de 1.º a fondo (tres incógnitas, sistemas equivalentes, Gauss con la matriz ampliada, la última fila, λ, discusión según *a*, no lineales con raíces, logaritmos y exponenciales, regiones vacías o abiertas, problemas de tres incógnitas).
- **L propias:** L1 «La máquina de Gauss», L2 «El deslizador del parámetro», L3 «La familia de soluciones».
- **M prestadas de 4.º académicas:** «Mueve la segunda recta», «Recta y circunferencia», «Dos cuadrados», «Semiplano y punto de prueba», «Los puntos enteros del triángulo», «Cuántos y cuánto».
- **J propios:** J1 «Haz el cero», J2 «Lee la última fila», J4 detective.
- **J5:** carrera, memoria y de 4.º «El punto de corte» y «Toca la solución», con niveles nuevos en el bloque 1134xx–1138xx.

**Etapas y lecciones (ids):** en la propuesta eran seis etapas; se juntaron en cinco (los problemas van con su tipo de sistema) para tener 4 ejercicios de práctica, 3 retos y 10 del banco por etapa, como las unidades anteriores.

| Etapa | Lecciones |
|---|---|
| `linear` | `linear-equations`, `classify-systems`, `equivalent-systems` |
| `gauss` | `triangular-systems`, `gauss-method`, `augmented-matrix`, `three-unknown-problems` |
| `discussion` | `solutions-count`, `parametric-solutions`, `parameter-discussion` |
| `nonlinear` | `nonlinear-substitution`, `radical-log-systems`, `exponential-systems`, `nonlinear-problems` |
| `inequalities` | `half-plane-regions`, `region-cases` |

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 16 tienen las diez mejoras de la teoría (`lessonTexts.ts`: definiciones, «Otro ejemplo» con números propios, vocabulario y 4 «¿Por qué funciona?» en `equivalent-systems`, `solutions-count`, `parametric-solutions` y `parameter-discussion`; `lessonChecks.ts`: error típico y «Compruébalo»); 16 enlaces «Antes de empezar» a 4.º académicas (Sistemas) y a Ecuaciones de 1.º.
- **Dibujos nuevos (14):** `EquivalentFigure`, `StaircaseFigure`, `EliminationFigure`, `AugmentedMatrixFigure`, `TicketsFigure`, `LastRowFigure`, `ParametricFigure`, `ParameterFigure`, `CubicLineFigure`, `CandidatesFigure`, `ExponentialChangeFigure`, `RightTriangleFigure`, `TriangleRegionFigure`, `RegionCasesFigure`, más `BachSystemsHeroArt`. De 4.º aplicadas: `LinearSolutionsFigure` y `SystemTypesFigure`. La región se recorta con `region()` de `dbh4-akademikoak-sistemak/systems.ts`.
- **Contenido:** diagnóstico 113001–113008, práctica 1–20, retos 101–115 y banco 1–50 (4, 3 y 10 por etapa). Cada respuesta es un número.
- **Test nuevo:** `tests/sistemak-batx1z-content.test.ts`. Además de lo de siempre, comprueba cada fila de cada `\begin{cases}` de lecciones, ejemplos, «Compruébalo», práctica, retos y banco en su solución (unas 440 filas), que las respuestas falsas de «Compruébalo» fallan alguna fila y que ninguna fórmula escribe una igualdad imposible como 0 = 5.

**Fase 3, laboratorio:** 9 herramientas.
- **Propias (3),** con predicción antes del resultado y retos infinitos (`freshFrom` de `dbh3-segidak/lab/prediction.ts`):
  - L1 `gauss-machine` «La máquina de Gauss», retos 113101–113105: la matriz ampliada de seis sistemas (A, B y F con una solución, C incompatible, D indeterminado, E empieza por 2x). Se elige la fila que cambia (E2 o E3), la que usa (E1 o E2), m (1–4) y k (−6…6): la fila nueva es m·Eᵢ + k·Eⱼ, término independiente incluido. Se predice si bajo el pivote queda un negativo, 0 o un positivo; después se ve la fila y se aplica. También cambia filas. Escalonada, dice si hay una solución (con la terna), infinitas o ninguna (rangos). `gaussPlan` da las operaciones que escalonan cada sistema (los retos infinitos y los tests lo usan).
  - L2 `parameter-slider` «El deslizador del parámetro», retos 113201–113205: x + qy = r y sx + ay = b (cuatro sistemas); E2 − s·E1 deja (a − sq)y = b − sr. Se predice ninguna, una o infinitas soluciones antes de ver la segunda recta.
  - L3 `solution-family` «La familia de soluciones», retos 113301–113305: cuatro sistemas compatibles indeterminados de dos ecuaciones y tres incógnitas, z = λ; λ mueve la solución por una recta del plano xy (▶ la recorre entera). Se predice si y baja, no cambia o sube al crecer λ.
- **Prestadas (6),** con sus retos e ids de 4.º académicas: mueve la segunda recta (671xx), cuántos y cuánto (677xx), recta y circunferencia (673xx), dos cuadrados (674xx), semiplano y punto de prueba (675xx) y los puntos enteros del triángulo (676xx).
- **Test:** `tests/sistemak-batx1z-lab.test.ts` (cada sistema de la máquina se escalona con operaciones permitidas y da la solución o el tipo que toca; cada punto de cada familia cumple las dos ecuaciones; retos fijos e infinitos).
- **Revisión:** las 9 herramientas a 375 px en eu, es y ar, con la predicción hecha: sin desbordes (la fila de herramientas de arriba se desplaza a propósito) ni texto fuera del tablero; en árabe la «y» del plano sobresale 1 px, como en 4.º.

## Trucos

- **Fórmulas que empiezan por z en euskera:** el test de sufijos (`/\$(?:…|z|…)/`) no distingue el `$` que abre del que cierra, y `$z=3$` cuenta como «sufijo -z». Se escriben `${z}=3$` (KaTeX lo dibuja igual) en los cuatro idiomas.
- **Filas imposibles:** se escriben con su letra (`$0z=5$`, `$0x+0y=11$`), nunca `0=5`: los tests evalúan cada igualdad de números.
- **Sistemas en las preguntas:** dentro de `\begin{cases}`, el test común de «Compruébalo» no los evalúa (ve varias igualdades); los comprueba el test de la unidad.
- **Orden de las fórmulas:** el test común compara las fórmulas de cada texto en orden; en euskera la frase tiene que nombrarlas en el mismo orden que en castellano.

## En curso

- Fases 1+2 y 3 hechas en `feat/sistemak-batx1z`. Siguiente: fase 4, juegos (J1 «Haz el cero», J2 «Lee la última fila», J4 detective; carrera 1134xx, memoria, y de 4.º «El punto de corte» y «Toca la solución» con niveles nuevos).
