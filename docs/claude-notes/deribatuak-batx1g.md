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

## Fase 4: juegos

- 9 juegos. Propios:
  - `produce` «¿Cuánto producir?» (`ekoiztu`): botones −5 −1 +1 +5 y dos barras, I′(x) y C′(x); hay que igualarlas. Niveles: precio fijo y c = 1; c = 0,5, 1 o 2; precio que baja, I = (P − d·x)·x. 136501–136503.
  - `rates` «¿Media o instantánea?» (`tasak`): T.V.M. en un intervalo; velocidad y coste marginal; el instante en que la tasa instantánea iguala a la media (punto medio en una parábola). 136551–136553.
  - `detective` (12 errores de este tema): 136701–136703.
- Carrera 136401–136405 (15 tipos) y memoria 136801–136803.
- Prestados de Ciencias: `slopes` 136811–136813; `match` solo niveles 1–2 (el 3 trae seno y coseno) 136821–136822; `updown` 136831–136833; `extrema` 136841–136843.
- Test: `tests/deribatuak-batx1g-games.test.ts`.
- Truco: el barrido de 9 juegos con todos sus niveles pasa de 45 s; se hace en dos o tres tandas.
- Aviso (piezas prestadas): en árabe, el barrido marca la «y» de los ejes de los juegos de Ciencias (altura de Noto Sans Arabic).

## Cierre

- **2026-11-18:** 3372 tests, lint y build en verde; inventario OK (de verdad: 2 herramientas y 2 juegos propios más el detective, lo que eligió el dueño).
- **Revisión a 375 px (eu, es, ar), con barridos de JS y capturas:** portada, las 15 lecciones con sus pasos abiertos, diagnóstico, práctica, retos, ejercicios con soluciones abiertas, las 5 herramientas antes y después de predecir, y los 9 juegos en cada nivel con una elección hecha. La carrera solo se vio al empezar.
- **Hoja de euskera:** `hoja-revision.mjs batx1-gizarte-deribatuak … --herramientas marginal,profit --juegos produce,rates,detective,race,memory`, en la carpeta de notas compartidas (`hoja-euskera-deribatuak-batx1g.html`).
- **Cambios respecto al menú elegido** (por quitar la trigonometría y por no haber curvatura en el libro): fuera «Monta la gráfica», «De la secante a la tangente» y «La gráfica de f′» de Ciencias; dentro la tasa de variación de 4.º aplicadas. «Empareja f y f′» va sin su tercer nivel. El dueño confirmó el 2026-11-18 dejar fuera la secante y la gráfica de f′.
- **e y ln:** el tema 2 solo nombra la tecla «ln» de pasada; `chain-exp-log` define el número e y enlaza la lección `log-inverse`. El diagnóstico 136005 pregunta $\log 1$.
- **Para fusionar:** registro en `courses.ts` (línea de `derivadas` de `batx1-gizarte`), router y `paths.ts`.
