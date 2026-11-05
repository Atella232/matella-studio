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
- **Pendiente fuera de esta unidad:** en árabe, la «y» del eje de «Une dos trozos» (herramienta de 4.º académicas) se sale 1 px del dibujo.

## Trucos

- `figureAfterSteps: true` esconde el dibujo hasta ver todos los pasos: para revisarlo en el navegador hay que pulsar «Ikusi urrats guztiak».
- Un enunciado que empieza por una función a trozos queda feo en el móvil (la llave baja de línea y el «. Kalkulatu…» empieza solo). Va primero el texto y la función al final: «Kalkulatu … funtzio honetan: $f(x)=\begin{cases}…$».
- El test de cuentas de las lecciones no lee `\frac{3}{0{,}001}` (las llaves de `{,}` rompen la fracción): se escribe `3\div 0{,}001=3000`.
- Una fórmula larga al final del enunciado deja el punto solo en otra línea a 375 px: en esos enunciados, sin punto final.
- En el laboratorio, las etiquetas de los botones con fórmulas (`(x − d)²`, `x³ − 3x + 1`) van entre LRI y PDI (`\u2066…\u2069`): en árabe, `(x − d)²` salía `²(x - d)`.
- Un intervalo con extremos decimales se escribe con punto y coma en eu y es: `(1;1{,}25)`.
- Para que la predicción tenga sentido, el dibujo (curva, barras, valores) se esconde hasta elegir; los controles cambian el estado sin enseñar nada.

## En curso

- Fase 4, juegos (ids 109401–109899): J1 «¿Indeterminación o no?», J2 «Caza la asíntota», J3 «¿Qué discontinuidad?», J5 detective; carrera (15 tipos) y memoria; de Segidak «¿Hacia dónde va?» y «Atrapa la banda».
- Después, cierre (inventario, 375 px, hoja de euskera) y el tema siguiente, Derivadas.
