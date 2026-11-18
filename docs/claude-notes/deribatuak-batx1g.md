# Deribatuak eta haien aplikazioak · 1.º Bachillerato Ciencias Sociales

Cuarto y último tema del bloque Funciones de 1.º Sociales: curso `batx1-gizarte`, tema `derivadas` («Derivadas y sus aplicaciones»).

- **Carpeta:** `src/pages/batx1-gizarte-deribatuak`
- **`storagePrefix`:** `matella-deribatuak-batx1g`
- **Rama:** `feat/deribatuak-batx1g`, cortada de `feat/limiteak-batx1g` (c62106c)
- **Bloque de ids:** 136000–136999 (diagnóstico 136001–136008, laboratorio propio 1361xx–1363xx, juegos 136401–136899)
- **Puerto de pruebas:** 5192

## Fuentes

- Anaya, Matemáticas Aplicadas a las CCSS I, edición nueva (`Suma_Piezas`), U7 «Derivadas»: es la única unidad de derivadas (la U8 ya es estadística bidimensional), así que trae también las aplicaciones. Orden: tasa de variación media, derivada en un punto (definición, pendiente de la tangente), función derivada, reglas de derivación (potencias, producto, cociente, cadena, exponenciales y logaritmos; también trigonométricas), recta tangente y normal, puntos singulares, crecimiento y decrecimiento, máximos y mínimos, coeficientes a partir de los extremos, representación de polinomios y de funciones racionales, extremos en un intervalo y optimización (costes, beneficios, geometría). No trae curvatura ni segunda derivada.
- Del libro solo se saca el alcance; textos y ejercicios son propios.

## Reutilizable (Ciencias)

- `batx1-zientziak-deribatuak`: herramientas `secant` «De la secante a la tangente», `slope-graph` «La gráfica de f′», `chain` «La cadena de máquinas»; juegos `slopes` «¿Qué pendiente?», `match` «Empareja f y f′», `tangent`.
- `batx1-zientziak-aplikazioak`: herramientas `sign` «El semáforo de f′», `box` «La caja sin tapa», `layers` «Monta la gráfica»; juegos `updown` «Sube o baja», `extrema` «Caza los extremos».
- Figuras: `PlotFigure` de `batx1-zientziak-limiteak/figures`.

## Diseño elegido (2026-11-18: «Las recomendadas»)

- V1 lecciones propias con ejemplos de economía; A1 sin derivadas trigonométricas.
- L1 «El coste marginal», L2 «Beneficio máximo» (propias); M: secante → tangente, gráfica de f′, semáforo de f′, caja sin tapa, monta la gráfica (Ciencias).
- J1 «¿Cuánto producir?», J2 «¿Media o instantánea?», J3 detective (propios); J4 carrera, memoria y ¿qué pendiente?, empareja f y f′, sube o baja, caza los extremos (Ciencias, sin niveles de trigonometría ni f″).

## Fases 1–2: lecciones y contenido

- Etapas: `rate`, `rules`, `monotony`, `optimization`, `graphs`.
- Lecciones: average-rate, derivative-point, tangent · derivative-function, product-quotient, chain-exp-log · sign-intervals, singular-points, extreme-coefficients · max-profit, optimize, interval-extremes · polynomial-graph, rational-graph, derivative-graph.
- Figuras propias con `PlotFigure`; secantes y tangentes van como curvas (siguen las unidades de los ejes; `obliques` va en cuadros de la cuadrícula).
- Diagnóstico 136001–136008; práctica 1–20; retos 101–115; banco 1–50.
- Test: `tests/deribatuak-batx1g-content.test.ts`.
- Cambio respecto al menú: «Monta la gráfica» de Ciencias trae la capa de curvatura (∪ ∩), que no está en el libro; en su lugar va la tasa de variación de 4.º aplicadas (`rate`).

## Fase 3: laboratorio

- 5 herramientas. Propias: `marginal` «El coste marginal» (C = ax² + bx + F; predicción: la unidad siguiente frente a C′(x), la diferencia es justo a; ▶ encoge el paso y la secante se vuelve tangente; retos 136101–136105) y `profit` «Beneficio máximo» (I = px, C = cx² + vx + F; predicción: una unidad más sube, deja igual o baja el beneficio; ▶ recorre la producción; ventana simétrica alrededor del máximo; retos 136201–136205).
- Prestadas: `rate` (4.º aplicadas), `sign` y `box` (Ciencias, aplicaciones).
- Fuera respecto al menú: `secant` y `slope-graph` de Ciencias traen sin x (el dueño quitó la trigonometría).
- Test: `tests/deribatuak-batx1g-lab.test.ts`.
- Aviso (pieza prestada): en árabe, el barrido marca los números del eje de `rate` como salidos de la caja; es la altura de la fuente Noto Sans Arabic, no un corte visible.

## En curso

- Fases 1–3 hechas. Siguiente: fase 4, juegos (J1 «¿Cuánto producir?», J2 «¿Media o instantánea?», detective, carrera, memoria y ¿qué pendiente?, empareja f y f′, sube o baja, caza los extremos).
