# Limiteak eta jarraitutasuna · 1.º Bachillerato Ciencias

Es la quinta unidad de Bachillerato y la segunda del bloque Análisis: curso `batx1-zientziak`, tema `limites-continuidad`. En euskera el tema es «Limiteak», no «Mugak».

- **Carpeta:** `src/pages/batx1-zientziak-limiteak`
- **`storagePrefix`:** `matella-limiteak-batx1z`
- **Página:** `LimiteakBatx1zIntroPage`
- **Rama:** `feat/limiteak-batx1z`, cortada de `feat/funtzioak-batx1z` 80e1c8c
- **Bloque de ids:** 109000–109999 (diagnóstico 109001–109008, laboratorio propio 1091xx–1093xx, juegos 109401–109899)

## Fuentes y alcance

- **Libros:** Santillana 1.º Bach Ciencias U9 «Límites de funciones. Continuidad» y Anaya Matemáticas I U11 «Límites de funciones. Continuidad y ramas infinitas». Del libro solo se ha sacado el alcance; textos y ejercicios son propios.
- **Orden de Santillana:** límites (con 1^∞), en el infinito, ∞/∞ y ∞ − ∞, laterales y a trozos → asíntotas verticales, horizontales y oblicuas → continuidad y tipos de discontinuidad → Bolzano (solo en las actividades finales). De Anaya: 0/0 y k/0 en un punto, las ramas infinitas y las ramas de las funciones racionales.
- **Solapamiento:** la idea de límite de una sucesión, los límites infinitos y el número e están en Segidak (1.º); la continuidad y las discontinuidades a simple vista, en Funciones de 4.º (académicas y aplicadas). Van como enlaces «Antes de empezar».

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `point` | `idea`, `one-sided`, `infinite` |
| `calculus` | `substitute`, `zero-zero`, `roots` |
| `infinity` | `degrees`, `infinity-minus`, `e-limits` |
| `asymptotes` | `vertical-horizontal`, `oblique`, `branches` |
| `continuity` | `continuous`, `discontinuities`, `bolzano` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-05):**
- V1: lo que ya está en Segidak y en 4.º, como repaso corto con enlaces; Bolzano dentro; una sola lección de 1^∞.
- Herramientas propias: L1 «La lupa del límite», L2 «El agujero del 0/0», L3 «Gana el de mayor grado», L5 «Bolzano encierra la raíz».
- M: herramientas prestadas (la banda del límite y la máquina de e de Segidak, unir trozos de 4.º, el taller de transformaciones de Funciones).
- Juegos propios: J1 «¿Indeterminación o no?», J2 «Caza la asíntota», J3 «¿Qué discontinuidad?», J5 detective.
- J6 carrera y memoria; J7 de Segidak «¿Hacia dónde va?» y «Atrapa la banda».
- Fuera: L4 y J4.

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 tienen las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario, 5 «¿Por qué funciona?» y casos en `branches` y `discontinuities`; `lessonChecks.ts` con error típico y «Compruébalo»; enlaces «Antes de empezar» a Segidak, Números reales, Funciones y Ecuaciones de 1.º y a 4.º académicas).
- **Textos:** `lessons.tsx`, `lessonTexts.ts`, `lessonChecks.ts` y `content.ts` usan `say`/`same` (o `plain`/`plainSame`) de `../batx1-zientziak-funtzioak/text.ts`; aquí no hay nombres trigonométricos, así que da igual cuál.
- **Dibujos nuevos (`figures.tsx`):** un `PlotFigure` genérico (plano con curvas, puntos huecos, asíntotas verticales, horizontales y oblicuas y una columna de notas; `units` dice cuánto vale cada cuadro en cada eje) y con él `ApproachFigure`, `OneSidedFigure`, `VerticalAsymptoteFigure`, `HoleFigure` (`factor` y `root`), `TendsFigure` (`degrees`, `conjugate`, `e`), `AsymptotesFigure`, `ObliqueFigure`, `ContinuousJoinFigure` y `BolzanoFigure`; además `FormsFigure` (lo que se sabe y las indeterminaciones) y `BachLimitsHeroArt`. De 4.º aplicadas: `ContinuityFigure` (tipos de discontinuidad). `branches` no lleva dibujo.
- **Contenido:** diagnóstico 109001–109008, práctica 1–20, retos 101–115 y banco 1–50. Las respuestas son un número: el límite, un parámetro, la a de eᵃ, cuántas asíntotas o discontinuidades hay o un extremo entero del intervalo de Bolzano.
- **Registro:** `active: true` en `courses.ts` (solo la línea de 1.º Ciencias: hay una igual en cada curso de Bachillerato), ruta en `src/router/index.tsx` y la dirección en `src/features/unit-v2/paths.ts`.
- **Test nuevo:** `tests/limiteak-batx1z-content.test.ts`.
- **Comprobación:** 2235 tests, lint y `tsc -b` en verde. Las 15 lecciones, el resumen, el diagnóstico, la práctica, el banco y los retos a 375 px en eu, es y ar, sin desbordes, errores de KaTeX, LaTeX crudo ni texto cortado en los dibujos.

Commit 316a89c.

**Fase 3, laboratorio (8 herramientas):**
- **Propias (4):**
  - L1 «La lupa del límite» (`lens`, 109101–109105): cinco funciones (f₁…f₅: agujero, salto hacia arriba, punto movido, |x|/x, salto hacia abajo) y dos sondas en a − h y a + h con h = 1, 0,1, 0,01 y 0,001. Se predice si el límite por la izquierda es menor, igual o mayor que por la derecha; ▶ acerca las sondas.
  - L2 «El agujero del 0/0» (`hole`, 109201–109205): f(x) = (x − r)(x − s)/(x − d)ᵖ con r, s, d de −3 a 3 y p = 1 o 2. Se predice qué pasa en x = d: k/0 y asíntota, 0/0 y agujero, o 0/0 pero asíntota (con el denominador al cuadrado). ▶ acerca dos sondas a d.
  - L3 «Gana el de mayor grado» (`degrees`, 109301–109305): (a·xᵐ + 5xᵐ⁻¹)/(b·xⁿ − 4) con m, n de 1 a 3 y a, b de −3 a 3 (nunca 0), en x = 10, 100, 1000 y 10 000. Dos barras (escala logarítmica) compiten y un punto recorre la recta numérica hacia el límite. Se predice 0, a/b o infinito; ▶ hace crecer x.
  - L5 «Bolzano encierra la raíz» (`bolzano`, 109351–109355): cinco funciones (x³ − 3x + 1, x² − 2, x³ + x − 3, x³ − x y 1/(x − 1)), extremos enteros y hasta tres mitades. Se predice: raíz dentro, un extremo es raíz o no asegura nada (mismo signo o salto). ▶ enseña las mitades una a una.
- **Prestadas, con sus retos e ids:** la banda del límite y la máquina de e de Segidak (etapa `infinity`), el taller de transformaciones de Funtzio elementalak (etapa `asymptotes`, para mover las asíntotas de 1/x) y unir dos trozos de 4.º académicas (etapa `continuity`).
- **Archivos:** `lab/lens.ts`, `hole.ts`, `degrees.ts`, `bolzano.ts` (lógica), `BachLimitsTools.tsx`, `labTools.ts`, `index.tsx`; test `tests/limiteak-batx1z-lab.test.ts`.
- **Comprobación:** 2240 tests, lint y `tsc -b` en verde. Las 8 herramientas a 375 px en eu, es y ar con predicción y ▶, sin desbordes ni errores de KaTeX.
- En árabe, la comprobación con `getBBox` marca la «y» del eje de «Une dos trozos» (4.º académicas) y de los planos de los juegos: es un falso positivo, porque la fuente árabe da una caja de línea más alta; la letra se ve entera.

Commit 37971fe.

**Fase 4, juegos (8):**
- **Propios (3 + detective):**
  - J1 «¿Indeterminación o no?» (`forms`, 109501–109503): un límite; se dice qué sale al sustituir de cabeza: indeterminación, 0, ±∞ u otro número. Nivel 1 en un punto (0/0, k/0, 0/k, número), nivel 2 en el infinito (∞/∞, ∞ − ∞, ∞ + ∞, k/∞, ∞·0, k + 0), nivel 3 potencias (1^∞, b^∞, (1/b)^∞, 1ᵇ, ∞⁰, 0^∞). Ocho rondas con los cuatro tipos de respuesta.
  - J2 «Caza las asíntotas» (`asymptote`, 109601–109603): una función racional desarrollada y 4–5 cartas con rectas; se marcan todas las asíntotas y ninguna más. Trampas: raíz del numerador, agujero, signo contrario, y = 0 con el mismo grado, y = mx sin n. Al comprobar sale la gráfica con las asíntotas y el agujero.
  - J3 «¿Qué discontinuidad?» (`discontinuity`, 109651–109653): continua, evitable, salto finito o infinito. Nivel 1 desde la gráfica, nivel 2 a trozos (la gráfica sale después), nivel 3 cocientes, |x − a|/(x − a), E(x) y el pico de |x − a| (continua).
  - J5 «Detective de límites» (`detective`, 109701–109703): 0/0 = 0, k/0 = 0, límite = f(a), x² − a² = (x − a)²; ∞ − ∞ = 0, 1^∞ = 1, coeficientes equivocados, √x² = x con x → −∞; agujero tomado por asíntota, y = 0 con el mismo grado, signo en la división de la oblicua, Bolzano con un salto.
- **Carrera** (`race`, 109401–109405): 15 tipos, tres por etapa (lateral, k para que exista el límite, cuántas asíntotas verticales; factorizar, conjugado, sustituir; grados, √(x² + px) − x, la a de eᵃ; horizontal, n y m de la oblicua; k para que sea continua, valor que llena el agujero, Bolzano).
- **Memoria** (`memory`, 109801–109803): límite en un punto ↔ valor (a² − b², a³ − b³, conjugado), función ↔ límite en +∞ (la carta no lleva «lim»), función ↔ asíntotas (en dos líneas).
- **De Segidak:** «¿Hacia dónde va?» (`toward`, 109811–109813, etapa `infinity`) y «Atrapa la banda» (`band`, 109821–109823, etapa `point`).
- **Archivos:** `games/forms.ts`, `asymptotes.ts`, `discontinuity.ts`, `detective.ts`, `race.ts`, `boards.ts`, `info.ts`, `BachLimitsGames.tsx` (+ `.css`), `GameArt.tsx`, `RaceGame.tsx`, `index.tsx`; test `tests/limiteak-batx1z-games.test.ts` (rehace cada respuesta de la carrera con el límite numérico).
- **Comprobación:** 2247 tests, lint y `tsc -b` en verde; inventario OK (5 juegos propios contando los de Segidak, 7 herramientas). Juegos a 375 px en eu, es y ar sin desbordes ni errores de KaTeX.

## Trucos

- `figureAfterSteps: true` esconde el dibujo hasta ver todos los pasos: para revisarlo en el navegador hay que pulsar «Ikusi urrats guztiak».
- Un enunciado que empieza por una función a trozos queda feo en el móvil (la llave baja de línea y el «. Kalkulatu…» empieza solo). Va primero el texto y la función al final: «Kalkulatu … funtzio honetan: $f(x)=\begin{cases}…$».
- El test de cuentas de las lecciones no lee `\frac{3}{0{,}001}` (las llaves de `{,}` rompen la fracción): se escribe `3\div 0{,}001=3000`.
- Una fórmula larga al final del enunciado deja el punto solo en otra línea a 375 px: en esos enunciados, sin punto final.
- En el laboratorio, las etiquetas de los botones con fórmulas (`(x − d)²`, `x³ − 3x + 1`) van entre LRI y PDI (`\u2066…\u2069`): en árabe, `(x − d)²` salía `²(x - d)`.
- Un intervalo con extremos decimales se escribe con punto y coma en eu y es: `(1;1{,}25)`.
- Para que la predicción tenga sentido, el dibujo (curva, barras, valores) se esconde hasta elegir; los controles cambian el estado sin enseñar nada.
- Las cartas de memoria miden 106 px a 375 px (90 px útiles): `\lim\limits_{x\to a}` pone el «x → a» debajo y ahorra anchura; las asíntotas van en `\begin{gathered}…\end{gathered}`; en el nivel del infinito la carta no lleva «lim» y la explicación sí. Para medir, voltear las cartas de dos en dos y leer `getBoundingClientRect` del `.katex`.

## En curso

- Cierre: build, revisión final, hoja de euskera para el dueño y aviso a la sesión principal. Después, el tema siguiente, Derivadas (ids 110000–110999), cortado de esta rama.
