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

**Fase 3, laboratorio (`lab/`):**
- **Herramientas propias (4):**
  - `secant` «De la secante a la tangente» (`secant.ts`, ids 110101–110105): x², x³, √x y sin x; P fijo, Q a distancia h = 1, 0,5, 0,1, 0,01 o 0,001. Predicción: ¿la tangente es menos empinada, igual o más que la secante con h = 1? ▶ acerca Q.
  - `smooth` «¿Derivable aquí?» (`smooth.ts`, ids 110301–110305): trozo x², x³, 4 − x² o x³ − 3x para x < 1 y la recta mx + n para x ≥ 1; dice salto, pico o suave. Predicción: ¿la recta que lo hace derivable baja, es horizontal o sube? ▶ pasea una tangente por el trozo y la recta.
  - `slope-graph` «La gráfica de f′» (`slopeGraph.ts`, ids 110201–110205): cinco funciones (dos polinomios, una colina, sin x y eˣ); la sonda recorre f y abajo se dibuja f′. Predicción: en el punto marcado, ¿la tangente baja, es horizontal o sube?
  - `chain` «La cadena de máquinas» (`chain.ts`, ids 110351–110355): u = 2x, x + 1, x² o x/2 y y = u², u³, 3u o u/2; un trozo Δx se estira g′ y luego h′ veces (barras). Predicción: en x = 1, ¿el trozo final es más corto, igual o más largo?
- **Prestadas (2), con sus ids:** `rate` de 4.º (T.V.M., `RateTool` de 4.º aplicadas, ficha de 4.º académicas) y `composition` de Funciones de 1.º (dos máquinas en cadena).
- **Componentes:** `BachDerivativesTools.tsx` (copia `curvePath`, `Grid` y `useClip` de Limiteak, que no los exporta), `index.tsx` con `BachDerivativesLaboratory`, `labTools.ts`.
- **Test:** `tests/deribatuak-batx1z-lab.test.ts` (además comprueba numéricamente que cada derivada es la pendiente de su función y que la regla de la cadena coincide con la pendiente de la compuesta).
- **Revisión a 375 px:** las 6 herramientas en eu, es y ar, antes y después de predecir: sin desbordes ni textos fuera del tablero (en árabe, el falso aviso del título «y» de la herramienta prestada de 4.º).

**Fase 4, juegos (`games/`):**
- **Juegos propios (3 + detective):**
  - `slopes` «¿Qué pendiente?» (`slopes.ts`, ids 110501–110503): una gráfica (parábola o cúbica de `curves.ts`) y tres puntos A, B, C; nivel 1, dónde f′ = 0, > 0 o < 0; nivel 2, la pendiente mayor o menor; nivel 3, la tangente paralela a una recta (la recta se aleja al menos 1,5 de los tres puntos para no parecer la tangente de uno).
  - `match` «Empareja f y f′» (`match.ts`, ids 110601–110603): la gráfica de f y tres gráficas pequeñas; parábolas → rectas, cúbicas → parábolas, y sin, cos, eˣ, e⁻ˣ, ln x. Errores: f′ dada la vuelta, el cero en otro sitio, la propia f.
  - `tangent` «Tangente exacta» (`tangent.ts`, ids 110651–110653): se construye y = mx + n con dos botones ± y se ve la recta sobre la gráfica; m y n enteros entre −9 y 9, nunca y = 0 (es el punto de partida).
  - `detective` (`detective.ts`, ids 110701–110703): 12 errores en 3 niveles (T.V.M. sin dividir, h = 0, f′(x) en la tangente, −f′ en la normal; (fg)′ = f′g′, el orden del cociente, la cadena sin la de dentro, x⁻ⁿ; (eᵏˣ)′ = eᵏˣ, la regla de la potencia en aˣ, (ln u)′ = 1/u, «continua ⇒ derivable»).
- **Carrera** (`race.ts`, ids 110401–110405): 15 tipos en 5 circuitos, uno por etapa; cada pregunta lleva `meta` y el test la recalcula con una derivada numérica.
- **Memoria** (`boards.ts`, ids 110801–110803): función ↔ derivada en potencias, reglas y exponenciales/logaritmos.
- **Hub:** `index.tsx` con `BachDerivativesGames`; `info.ts` (slugs `lasterketa`, `maldak`, `parekatu`, `ukitzailea`, `detektibea`, `memoria`); `GameArt.tsx`; `BachDerivativesGames.css`.
- **Test:** `tests/deribatuak-batx1z-games.test.ts` (respuestas comprobadas con derivadas numéricas; en «Empareja», las opciones malas no son la derivada).
- **Revisión a 375 px:** los seis juegos en eu, es y ar sin desbordes; cartas de memoria de 81 px como mucho (las cartas miden 106).

**Trucos de los juegos:**
- **Nombres trigonométricos:** la memoria, las líneas del detective y las opciones de la carrera son LaTeX sin traducir, así que no llevan sin ni tan (en castellano saldría «sin»). Los juegos propios sí los traducen con `localize` de `text.ts`, y los enunciados con `say`.
- **Dos binomios no caben en una carta** a 375 px: (x + 4)(x − 5) mide 111 px; la memoria usa x(x + p) y x²(x + p).
- **Etiquetas de los coches de la carrera:** en árabe, «f′» sale «′f»; usa una sola letra.

## Cierre (2026-11-06)

- **Comprobado:** 2282 tests, lint y build en verde; revisión a 375 px en eu, es y ar de las 15 lecciones, las 6 herramientas, los 6 juegos, el diagnóstico, la práctica guiada, los retos y el banco (con las soluciones abiertas). Diez soluciones largas (banco 4, 18, 34, 35 y 39; práctica 12 y 14; retos 102, 103 y 106) pedían desplazamiento lateral: van en dos filas con `aligned`.
- **Inventario:** OK (3 juegos propios más el detective; el script cuenta 5 herramientas propias porque `composition` está definida dentro de esta unidad, pero es la de Funciones: las propias de verdad son 4).
- **Hoja de euskera:** `hoja-revision.mjs` con `--herramientas secant,smooth,slope-graph,chain --juegos slopes,match,tangent,detective`, enviada al dueño. Como en Funciones y Limiteak, no trae los retos fijos del laboratorio ni los ejercicios de `content.ts`.
- **Motor común:** sin cambios, salvo el registro en `paths.ts`. En Limiteak solo cambia `export` en `PlotFigure`.

## Publicación

Publicada en matella.net el 2026-11-06 junto con otros ocho temas de 1.º Ciencias (`main` 27c197e, bundle `index-7UBtIGbr.js`). Al fusionar solo chocaron `courses.ts`, el router y `paths.ts`, en las líneas de registro. Antes de publicar: 2501 tests, lint y build en verde, y sin choques de ids, claves de guardado ni CSS con los otros temas. Comprobado en vivo a 375 px en eu, es y ar (portada, tres lecciones, laboratorio y juegos): sin desbordes, sin errores de KaTeX y sin errores en la consola.

**Arreglos hechos desde Aplicaciones de la derivada (rama `feat/aplikazioak-batx1z`, 2026-11-06):**
- **Detective a 375 px:** varias líneas se salían de la pantalla (hasta 323 px, y caben unos 255). Ahora ninguna pasa de 250 px: `\quad` en vez de `\qquad`, sin derivadas repetidas en la primera línea del producto y del cociente, arreglos cortos y sin `f((−2))` (ya no se usa `paren` dentro de `f(…)`).
- **Herramienta `secant`, frase en euskera:** decía «Ganbila den kurban… konkaboan», con ganbila = ∪, al revés que la unidad de Aplicaciones. Ahora dice «gorantz / beherantz irekitzen den», como el castellano. La hoja de euskera enviada para Derivadas tiene todavía la frase vieja.
