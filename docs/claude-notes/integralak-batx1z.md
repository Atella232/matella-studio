# Integralak · 1.º Bachillerato Ciencias

Es la octava unidad de Bachillerato y la quinta y última del bloque Análisis: curso `batx1-zientziak`, tema `integrales`.

- **Carpeta:** `src/pages/batx1-zientziak-integralak`
- **`storagePrefix`:** `matella-integralak-batx1z`
- **Página:** `IntegralakBatx1zIntroPage`
- **Rama:** `feat/integralak-batx1z`, cortada de `feat/aplikazioak-batx1z` d9df8ed
- **Bloque de ids:** 112000–112999 (diagnóstico 112001–112008, laboratorio propio 1121xx–1123xx, juegos 112401–112899)

## Fuentes y alcance

- **Libros:** Santillana 1.º Bach Ciencias U12 «Integral» (solucionario). Anaya Matemáticas I no tiene tema de integrales; Anaya Matemáticas II (2.º) U11–U12 solo se ha mirado como referencia de la parte común. Del libro solo se ha sacado el alcance; textos y ejercicios son propios.
- **Orden de Santillana:** primitivas (F′ = f, la constante, la primitiva por un punto) → inmediatas (potencias, eˣ, 1/x, seno, coseno, 1 + tg², arcoseno, arcotangente) → compuestas (u′·uⁿ, u′·eᵘ, u′/u, ajustar constantes, arcotangente completando el cuadrado) → integral definida y Barrow → área con signo → área entre dos curvas.
- **Fuera:** integración por partes, cambio de variable general y fracciones simples (son de 2.º).
- **Euskera:** jatorrizkoa (primitiva), integral mugagabea / mugatua, Barrow-ren erregela, azalera, ebaki-puntuak. Pendiente de que el dueño confirme los nombres que usa en clase.

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `primitives` | `primitive`, `power-rule`, `through-point` |
| `immediate` | `exp-log`, `trig`, `arcs` |
| `compound` | `chain-power`, `chain-exp-log`, `adjust` |
| `definite` | `rectangles`, `barrow`, `properties` |
| `areas` | `area-axis`, `area-sign`, `between-curves` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-06):**
- V1: el área con rectángulos antes de Barrow. V2: la arcotangente completando el cuadrado, como parte corta de la lección `arcs`. V3: el alcance de Santillana, con Anaya Matemáticas II solo como referencia.
- Herramientas propias: L2 «Rectángulos bajo la curva», L3 «Área con signo», L4 «Área entre dos curvas», L5 «La función área».
- M: prestadas `slope-graph` y `chain` de Derivadas.
- Juegos propios: J1 «¿De quién es la primitiva?», J2 «Ajusta la constante», J3 «Área a ojo», J5 detective.
- J6: carrera y memoria.
- Fuera: L1 y J4.

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 con las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario y 5 «¿Por qué funciona?» en `power-rule`, `trig`, `chain-power`, `barrow` (A(x + h) − A(x) ≈ f(x)·h) y `area-sign`; `lessonChecks.ts` con error típico y «Compruébalo»; enlaces «Antes de empezar» a Derivadas: `powers`, `sum-constant`, `exp-log`, `trig`, `chain`).
- **Errores típicos:** olvidar + k; xⁿ⁺¹ sin dividir; k igual a la y del punto; eˣ como potencia; el signo de ∫ sen x; 1/(1 + x²) leído como u′/u; falta u′ fuera; ajustar con una letra; rectángulos anchos «mejores»; F(a) − F(b); la integral de un producto partida; límites que no son los cortes; la parte de abajo que resta; la curva de abajo menos la de arriba.
- **Dibujos (`figures.tsx`):** `AreaPlot` propio (el `PlotFigure` de Limiteak más áreas rellenas entre una curva y una base y rectángulos); áreas positivas en azul y negativas en rojo en cualquier etapa, segunda curva en violeta. Tablas «función → integral» (`TableFigure`) para la potencia, eˣ/1/x, trigonométricas y arcos. Tarjetas propias para la cadena al revés, u′/u y ajustar constantes. Portada `BachIntegralsHeroArt`. En castellano sen/tg/arcsen/arctg y en euskera tg/arctg dentro de los SVG (`trig(language)`).
- **Contenido (`content.ts`):** diagnóstico 112001–112008; práctica 1–20 (4 por etapa); retos 101–115 (10/20/30 puntos); banco 1–50. Una integral indefinida no tiene un número por respuesta: las preguntas cerradas piden la k de una primitiva por un punto, un valor F(b), un exponente o un factor de una compuesta, una integral definida o un área. Las primitivas completas van en el banco, sin respuesta cerrada.
- **Test:** `tests/integralak-batx1z-content.test.ts` (copia del de Aplicaciones).
- **Registro:** `courses.ts` (solo la fila de 1.º Ciencias), router y `paths.ts`.
- **Revisión a 375 px:** las 15 lecciones en eu, es y ar sin desbordes ni fórmulas encogidas; las 15 figuras ampliadas (también en árabe); a 1024 px ningún paso deja menos de 90 px al texto. Las fórmulas de contenido de más de unos 250 px van en filas `aligned`.

**Fase 3, laboratorio (`lab/`):**
- **Herramientas propias (4):**
  - `rectangles` «Rectángulos bajo la curva» (`rectangles.ts`, ids 112101–112105): x², 4 − x², x + 1, √x y eˣ en su intervalo; n de 1 a 24 y la altura a la izquierda, en el medio o a la derecha. Antes de predecir se ven las barras y su suma; después, el área exacta en verde. Predicción: ¿la suma es menor, igual o mayor que el área? (depende de la función y la altura, no de n; la recta con la altura del medio da «igual»). ▶ estrecha los rectángulos.
  - `area-function` «La función área» (`accumulate.ts`, ids 112351–112355): 2 − x, x² − 1, x² − 4x + 3 y cos x; arriba la región de 0 a x (azul o roja), abajo A(x). Predicción: en el punto marcado, ¿A crece, se queda quieta o decrece? (el signo de f(p); x² − 1 en 1 da «quieta»). ▶ llena la región desde 0.
  - `signed` «Área con signo» (`signed.ts`, ids 112201–112205): x² − 2x, x − 1, x³ − 4x y x² − 4 con límites a y b de −3 a 3 (a puede ser mayor que b). Cada función abre en su intervalo; la predicción es el signo de la integral en él (x² − 2x en [0, 3] da 0). ▶ mueve b.
  - `between` «Área entre dos curvas» (`between.ts`, ids 112301–112305): cinco parejas (x² y 2x, x + 2 y x², x³ y x, 6 − x² y x² − 2, x y 2 − x²); azul donde f va arriba y violeta donde va g. Predicción en el intervalo propio de la pareja: ¿g arriba, se cruzan o f arriba?
- **Prestadas (2), con sus ids:** `slope-graph` (110201–110205) y `chain` de Derivadas.
- **Componentes:** `BachIntegralsTools.tsx` (copia `curvePath`, `Grid` y `useClip` de Aplicaciones, con `regionPath` para las áreas), `numbers.ts` (`exact` redondea a 9 decimales para que «=» salga exacto; `numberLatex` escribe fracciones), `index.tsx` con `BachIntegralsLaboratory`, `labTools.ts`.
- **Test:** `tests/integralak-batx1z-lab.test.ts`: cada primitiva cerrada se compara con Simpson; las predicciones no cambian al mover n, los límites o x; retos fijos con su solución e infinitos.
- **Revisión a 375 px:** las 6 herramientas, cada función, en eu, es y ar, antes y después de predecir: sin desbordes.

## Trucos

- En el navegador, los botones de predicción no responden a `dispatchEvent`; sí a llamar a `onClick` desde `__reactProps…` del botón (o a un clic real).

- Las fórmulas largas de pasos, ejemplos, soluciones y errores típicos van en `\begin{aligned}&…\\ &=…\end{aligned}`: a 375 px el banco tiene unos 257 px y los pasos unos 237 px.
- El SVG de una figura se puede mirar grande en el navegador fijándolo arriba a la izquierda con 720 px de ancho (`position: fixed`) y haciendo zoom de esa zona; el modal «Ampliar» gira la figura en el móvil.
- `PropertiesFigure` usa f(x) = 2,705·e^(−0,3539x), con ∫₀³ f ≈ 5 y ∫₃⁷ f ≈ 2.

## En curso

- **Siguiente paso:** fase 4, los juegos (J1 «¿De quién es la primitiva?», J2 «Ajusta la constante», J3 «Área a ojo», detective, carrera y memoria; ids 112401–112899), y después el cierre.
