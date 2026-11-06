# Deribatuak · 1.º Bachillerato Ciencias

Es la sexta unidad de Bachillerato y la tercera del bloque Análisis: curso `batx1-zientziak`, tema `derivadas`.

- **Carpeta:** `src/pages/batx1-zientziak-deribatuak`
- **`storagePrefix`:** `matella-deribatuak-batx1z`
- **Página:** `DeribatuakBatx1zIntroPage`
- **Rama:** `feat/deribatuak-batx1z`, cortada de `feat/limiteak-batx1z` 00f10a6
- **Bloque de ids:** 110000–110999 (diagnóstico 110001–110008, laboratorio propio 1101xx–1103xx, juegos 110401–110899)

## Fuentes y alcance

- **Libros:** Santillana 1.º Bach Ciencias U10 «Derivada de una función» (solucionario) y Anaya Matemáticas I U12 «Derivadas». Del libro solo se ha sacado el alcance; textos y ejercicios son propios.
- **Orden de Santillana:** T.V.M. → derivada en un punto por la definición → tangente y normal → función derivada → tabla de derivadas → reglas → cadena → derivabilidad a trozos. De Anaya: la regla de la cadena con nombre, los arcos, la tangente paralela u horizontal y los parámetros para que una función a trozos sea derivable.
- **Frontera con el tema 4 (Aplicaciones de la derivada):** crecimiento, extremos, curvatura, optimización y representación van allí. Aquí una tangente horizontal es solo «f′(x) = 0»; no se habla de máximos ni de mínimos.
- **Solapamiento:** la T.V.M. está en Funciones de 4.º académicas (lección `rate`); los límites, en Limiteak; la composición, los arcos y la exponencial, en Funciones de 1.º. Van como enlaces «Antes de empezar».

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `rate` | `average-rate`, `derivative-point`, `tangent` |
| `derivability` | `one-sided-derivatives`, `derivable-continuous`, `piecewise-derivable` |
| `function` | `definition`, `powers`, `sum-constant` |
| `rules` | `product`, `quotient`, `chain` |
| `elementary` | `exp-log`, `trig`, `tangent-conditions` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-06):**
- V1: el tema llega hasta las rectas tangentes; crecimiento y extremos, al tema 4. V2: los arcos, como parte corta de la lección de trigonométricas. La derivabilidad, como etapa propia.
- Herramientas propias: L1 «De la secante a la tangente», L3 «La gráfica de f′», L4 «¿Derivable aquí?», L5 «La cadena de máquinas».
- M: prestadas la tasa de variación de 4.º académicas y las máquinas de composición de Funciones de 1.º.
- Juegos propios: J1 «¿Qué pendiente?», J2 «Empareja f y f′», J4 «Tangente exacta», J5 detective.
- J6: carrera y memoria (función ↔ derivada).
- Fuera: L2 «El velocímetro» y J3 «¿Qué regla primero?».

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 tienen las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario y 5 «¿Por qué funciona?» en `derivative-point`, `derivable-continuous`, `powers`, `product` y `chain`; `lessonChecks.ts` con error típico y «Compruébalo»; enlaces «Antes de empezar» a Limiteak, Funciones de 1.º y a 4.º académicas: funciones, vectores y rectas, polinomios, potencias y trigonometría).
- **Nombres trigonométricos:** `lessonTexts.ts` y `lessonChecks.ts` escriben `\sin`, `\tan`, `\arcsin` y `\arctan` en todos los idiomas con `plain`; `lessons.tsx` pasa los dos por `localizeNames` (como Funciones), y `lessons.tsx` y `content.ts` usan `say`/`same`, que ya ponen sen y arcsen en castellano.
- **Dibujos (`figures.tsx`):** casi todos con `PlotFigure` de Limiteak (ahora exportado: es el único cambio en Limiteak); una tangente o una secante es una curva recta (`line(m, n)`). `SecantFigure`, `SecantsToTangentFigure`, `TangentNormalFigure`, `CornerFigure`, `JumpSlopesFigure`, `SmoothJoinFigure`, `DerivativeGraphFigure`, `SameSlopeFigure`, `QuotientTangentFigure`, `ExpTangentFigure`, `SinCosFigure` (sen en castellano), `ParallelTangentFigure`; dibujos propios: `PowerRulesFigure`, `ProductAreaFigure`, `ChainFigure` y `BachDerivativesHeroArt`.
- **Contenido (`content.ts`):** diagnóstico 110001–110008; práctica 1–20 (4 por etapa); retos 101–115 (10/20/30 puntos); banco 1–50. Toda respuesta cerrada es un número: una T.V.M., f′(a), la n de una tangente, un parámetro o la x de una tangente con pendiente dada.
- **Test:** `tests/deribatuak-batx1z-content.test.ts` (copia del de Limiteak).
- **Registro:** `courses.ts` (línea 175, solo 1.º Ciencias), router y `paths.ts`.

## Trucos

- **«Compruébalo» con una sola fórmula:** el test de `lesson-checks` compara la fórmula de la pregunta con la respuesta; con `f'(x)` dentro no puede evaluar y falla. Todas las preguntas llevan dos fórmulas («Si $f(x)=…$, ¿qué es $f'(x)$?»).
- **`errorByStage` es texto plano:** nada de `$…$`; se escribe f′, xⁿ y, en árabe, fórmulas entre LRI/PDI.
- **El evaluador del test de contenido** solo lee potencias con llaves: `1^{3}`, no `1^3`.

- **Revisión a 375 px:** las 15 lecciones en eu, es y ar sin desbordes ni fórmulas encogidas (la del desarrollo en `definition` va en dos filas con `aligned`), y las 15 figuras sin textos fuera ni encima de otros. En `quotient` y `trig` la figura sale después de los pasos.
- **Colores de las figuras:** cada etapa pinta `--stage` de su color, así que una segunda curva no puede ser `--success` en la etapa verde ni `--second` en la coral: `ln x` va en violeta propio, `cos x` en gris y la tangente del cociente en verde.

## En curso

- Fase 1+2 terminada (commit en esta rama). Siguiente: fase 3, el laboratorio (L1, L3, L4, L5 propias y las dos prestadas, ids 1101xx–1103xx).
- Después: fase 4 (juegos J1, J2, J4, J5, carrera y memoria) y el cierre.
