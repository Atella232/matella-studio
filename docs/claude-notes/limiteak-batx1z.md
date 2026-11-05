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

## Trucos

- `figureAfterSteps: true` esconde el dibujo hasta ver todos los pasos: para revisarlo en el navegador hay que pulsar «Ikusi urrats guztiak».
- Un enunciado que empieza por una función a trozos queda feo en el móvil (la llave baja de línea y el «. Kalkulatu…» empieza solo). Va primero el texto y la función al final: «Kalkulatu … funtzio honetan: $f(x)=\begin{cases}…$».
- El test de cuentas de las lecciones no lee `\frac{3}{0{,}001}` (las llaves de `{,}` rompen la fracción): se escribe `3\div 0{,}001=3000`.
- Una fórmula larga al final del enunciado deja el punto solo en otra línea a 375 px: en esos enunciados, sin punto final.

## En curso

- Fase 3, laboratorio: L1, L2, L3 y L5 propias y las prestadas.
- Después, fase 4 (juegos), cierre (375 px, hoja de euskera) y el tema siguiente, Derivadas.
