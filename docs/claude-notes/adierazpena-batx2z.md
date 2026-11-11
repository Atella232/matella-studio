# Funtzioen adierazpen grafikoa · 2.º Bachillerato Ciencias

Cuarto y último tema del bloque Cálculo diferencial de 2.º Ciencias (reparto en paralelo del 2026-11-09): curso `batx2-zientziak`, tema `representacion-funciones`.

- **Carpeta:** `src/pages/batx2-zientziak-adierazpena`
- **`storagePrefix`:** `matella-adierazpena-batx2z`
- **Página:** `AdierazpenaBatx2zIntroPage`
- **Rama:** `feat/adierazpena-batx2z`, cortada de `feat/aplikazioak-batx2z` (8994e60)
- **Bloque de ids:** 125000–125999 (diagnóstico 125001–125008, laboratorio propio 1251xx–1253xx, juegos 125401–125899)
- **Servidor de pruebas:** puerto 5183 (`.claude/launch.json` sin commit, `matella-dev-5183`)
- **Prefijo de nombres en el código:** `bach2Sketch*` / `Bach2Sketch*`

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U10 «Representación de funciones» y Anaya Matemáticas II U10 (los dos PDF son solucionarios). EBAU del País Vasco solo para el estilo. Del libro solo se ha sacado el alcance; textos y ejercicios son propios. Ficha: `~/Documents/Matella-fuentes/batx2-zientziak-calculo/ficha-u10.md` (fuera del repositorio).
- **Santillana U10:** el estudio previo (dominio, cortes y signo, simetrías y periodicidad, asíntotas y ramas, crecimiento y curvatura) y funciones completas por familias: polinómicas, racionales, con raíces, exponenciales, logarítmicas, a trozos y con valor absoluto; al final, parámetros y curvas a partir de datos.
- **Anaya U10:** lo mismo y además dibujar una curva a partir de límites y valores, la posición de la curva respecto de sus asíntotas, ramas parabólicas y alguna trigonométrica.
- **EBAU País Vasco:** «estudia y representa» (racional con oblicua, producto con eᵏˣ o logaritmo); a veces la gráfica de f′ para deducir f.
- **Lo que ya vio 1.º:** Limiteak 1.º (asíntotas y ramas de las racionales), Aplikazioak 1.º (polinómicas, racionales, exponenciales y logarítmicas sencillas) y Funtzioak 1.º (simetrías, periodo, valor absoluto, a trozos).

**Lo que eligió el dueño («Las recomendadas», 2026-11-11):**
- V1: el repaso de 1.º en 3 lecciones. V2: las trigonométricas en una sola lección, en un periodo. V3: las funciones con parámetros van a los ejercicios y retos.
- Herramientas propias: L1 «La curva y su asíntota», L2 «El espejo del valor absoluto», L3 «De f′ a f», L4 «Simetría y periodo».
- M: prestadas «Monta la gráfica» (Aplikazioak 1.º) y «El taller de transformaciones» (Funtzioak 1.º).
- Juegos propios: J1 «¿Qué gráfica es?», J2 «Lee la derivada», J3 «Asíntotas a la vista», J5 detective de 2.º.
- J6 carrera y memoria (función ↔ asíntota, función ↔ simetría); J7 de 1.º «Sube o baja» (Aplikazioak) y «Caza las asíntotas» (Limiteak).
- Fuera: L5 «La campana» y J4 «Datos y curva».

**Etapas y lecciones (ids), 15 = 3 + 12:**

| Etapa | Lecciones |
|---|---|
| `review` | `sketch-plan`, `asymptotes-review`, `rational-review` |
| `study` | `symmetry-period`, `asymptote-position`, `domain-edges` |
| `explog` | `exp-products`, `exp-special`, `log-functions` |
| `roots` | `root-functions`, `trig-functions`, `piecewise-graphs` |
| `reading` | `absolute-graphs`, `derivative-graph`, `curve-from-data` |

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 con las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario, casos en `asymptotes-review` y `absolute-graphs` y 5 «¿Por qué funciona?» en `symmetry-period`, `asymptote-position`, `exp-products`, `root-functions` y `derivative-graph`; `lessonChecks.ts` con error típico y «Compruébalo»). «Antes de empezar» enlaza a Limiteak, Aplikazioak y Funtzioak de 1.º y a Deribatuak y Aplikazioak de 2.º (todas en esta rama).
- **Dibujos (`figures.tsx`):** los 15 con `LimitPlot` de Limiteak 2.º (importado, sin tocarlo): la curva, sus asíntotas a trazos y los puntos de los pasos, y una columna de notas. `absolute-graphs` lleva dos planos, uno para |f(x)| y otro para f(|x|). Portada `Bach2SketchHeroArt`.
- **Contenido (`content.ts`):** diagnóstico 125001–125008; práctica 1–20 (4 por etapa); retos 101–115 (10/20/30); banco 1–50 (con 8 ejercicios abiertos de «representa» o «dibuja»). Toda respuesta cerrada es un número: dónde está una asíntota, un coeficiente de la oblicua, la abscisa de un extremo o una inflexión, un periodo, cuántas asíntotas, picos o cortes hay, o un parámetro.
- **Registro:** `active: true` en la fila `representacion-funciones` de 2.º Ciencias de `courses.ts`, ruta en `src/router/index.tsx` y la dirección en `src/features/unit-v2/paths.ts`.
- **Test:** `tests/adierazpena-batx2z-content.test.ts` (copia del de Aplicaciones 2.º).
- **Comprobación:** tests de lecciones (1206) y de contenido, `tsc` y lint en verde. Revisión a 375 px en eu, es y ar: las 15 lecciones (pasos abiertos), el resumen, el diagnóstico, la práctica (20, contestadas), los retos (15) y el banco (50, con las soluciones abiertas): sin desbordes ni desplazamiento lateral (salvo la lista de tareas, a propósito), sin errores de KaTeX ni LaTeX sin dibujar. En los dibujos, ninguna nota se monta sobre otra ni sobre la «x» del eje, y cada punto cae sobre su curva.
- **Trucos:**
  - Las palabras de las notas de `LimitPlot` van a `size: 18` (a 375 px se leen a unos 8,7 px); a 16 o 17 quedan por debajo de 8,5 px. Los números de los ejes son pequeños en todas las unidades que usan `LimitPlot`.
  - La «x» del eje queda justo a la derecha del plano: `notesX` tiene que empezar unos 14 px más allá de esa «x», o las notas a la altura del eje se montan con ella.
  - El test «el ejemplo tiene números propios» compara los números sin exponentes: `g(x)=x^4-2x^2` y `f(x)=-x^3+2x` cuentan como iguales (solo el 2).
  - Las oblicuas con raíz se explican en dos filas: la resta por el conjugado y, debajo, `n=\frac{4}{1+1}=2`.

**Fase 3, laboratorio «Las gráficas de cerca» (6 herramientas):**
- **Propias (cada una pide una predicción antes de dibujar y tiene 5 retos fijos y retos sin fin con `freshFrom`):**
  - `asymptote.ts`, L1 «La curva y su asíntota» (125101–125105): g₁ = (x² + 1)/x, g₂ = (x² − 2)/x, g₃ = (x − 2)/(x² + 1) (corta su asíntota en x = 2), g₄ = (2x² + 1)/(x² + 1) y g₅ = √(x² + 4) (oblicua distinta a cada lado). x₀ va de −20 a 20 y el tablero se aleja con él; tras predecir se sombrea la diferencia (verde encima, rojo debajo). Predicción para x > 0: siempre debajo, la corta o siempre encima. Retos sin fin: un x con una diferencia exacta dada (fracción).
  - `symmetry.ts`, L4 «Simetría y periodo» (125351–125355): seis funciones (dos impares, dos pares, dos ni una cosa ni otra; tres trigonométricas). En el mismo tablero, la copia f(−x), −f(−x) o f(x + T) con T = π/2 … 2π, y la lectura dice si cae sobre la curva. Predicción: impar, ninguna o par.
  - `mirror.ts`, L2 «El espejo del valor absoluto» (125201–125205): cinco f y tres vistas (f, |f(x)|, f(|x|)), con los picos marcados y un punto x₀. Predicción: cuántos picos tendrá |f(x)| (menos de dos, dos, más). A diferencia de «Dobla el valor absoluto» de 4.º, añade f(|x|) y cuenta los picos.
  - `fromDerivative.ts`, L3 «De f′ a f» (125301–125305): arriba f′, abajo f dibujada hasta x₀, con un paso para C = f(0). Predicción: el máximo de f en un x negativo, en 0 o en un x positivo. Retos sin fin: ponerse en un extremo o una inflexión, o elegir C para un máximo dado.
- **Prestadas, con sus retos e ids:** «Monta la gráfica» (`layers` de Aplikazioak 1.º, etapa `review`) y «El taller de transformaciones» (`transform` de Funtzioak 1.º, etapa `roots`), sin tocarlas.
- **Componentes:** `Bach2SketchTools.tsx` (copias de `curvePath`, `Grid` con paso de líneas y `useClip` de Aplikazioak 2.º), `labTools.ts` e `index.tsx`. Test `tests/adierazpena-batx2z-lab.test.ts` (5 pruebas: retos, retos sin fin, las tres respuestas de cada predicción y la matemática de cada herramienta).
- **Comprobación:** las 6 herramientas a 375 px en eu, es y ar, con cada función y cada vista, antes y después de predecir y con los pasadores en sus dos extremos: sin desbordes, sin LaTeX sin dibujar y sin textos montados en los tableros (el selector de herramientas se desliza a propósito).
- **Trucos:**
  - Las opciones de una predicción no pasan por KaTeX: van en texto llano (`x = 0`, y en árabe con LRI/PDI).
  - La lectura de «De f′ a f» va en cuatro líneas y con dos decimales: con tres, `f′(x₀)` y `f(x₀)` juntos no caben en 268 px.

**Fase 4, juegos (8):**
- **Propios:**
  - `graphGame.ts`, J1 «¿Qué gráfica es?» (125501–125503): una fórmula y tres esbozos de la misma familia que solo cambian en un rasgo (dónde está una asíntota, el signo, el lado del dominio, un reflejo). Niveles: racionales y polinomios; exponenciales, logaritmos y raíces; valor absoluto y trigonométricas mezcladas con el resto. Tras responder, los rasgos clave.
  - `readGame.ts`, J2 «Lee la derivada» (125601–125603): la gráfica de f′ (no de f) y una pregunta sobre f con tres respuestas. Niveles: máximo o mínimo (f′ recta o parábola); dónde crece e inflexión; cuántos extremos (f′ puede tocar el eje sin cruzarlo). Las malas son las lecturas típicas: la otra raíz, el vértice de f′, donde crece f′.
  - `sightGame.ts`, J3 «Asíntotas a la vista» (125651–125653): una función y tres listas de asíntotas; las malas cambian a y p, un signo, quitan o añaden una, ponen una horizontal en lugar de la oblicua o la misma oblicua a los dos lados.
  - `detective.ts` (125701–125703): 12 errores en tres niveles (agujero tomado por asíntota, par/impar, signo de la diferencia, n sin el cociente entero; ≥ en el logaritmo, la constante de la horizontal, √x² = x a la izquierda, periodo por k; f(|x|) por |f(x)|, vértice de f′ como extremo, roce como extremo, picos sin ceros).
- **Genéricos:** carrera (`race.ts`, 125401–125405, 15 tipos con `meta`) y memoria (`boards.ts`, 125801–125803: asíntotas verticales, horizontales u oblicuas y picos del valor absoluto). La simetría no entra en la memoria: sus respuestas («par», «impar») serían palabras y se repetirían; en su lugar, los picos.
- **Prestados de 1.º:** «Sube o baja» (`updown` de Aplikazioak 1.º, 125811–125813, etapa `reading`) y «Caza las asíntotas» (`asymptote` de Limiteak 1.º, 125821–125823, etapa `review`).
- **Test:** `tests/adierazpena-batx2z-games.test.ts` (7 pruebas: los miembros de cada familia se distinguen en el plano, cada respuesta de «Lee la derivada» se comprueba con los cambios de signo de f′, cada lista de asíntotas con la función, el detective, la carrera con `meta` y la memoria).
- **Comprobación:** los tres juegos propios y los dos prestados jugados en sus tres niveles a 375 px en eu, es y ar; el detective y la memoria pulsando líneas y tarjetas; la carrera medida fuera de la página (todas sus soluciones caben en 234 px).
- **Trucos:**
  - En la carrera, `rows()` parte en filas a partir de 14 caracteres (con 28, `f″(x) = 2x + 2 = 0 → x = −1` medía 296 px); la división de la oblicua va en dos filas.
  - `x·e⁻ˣ` y `x²·e⁻ˣ` se parecen demasiado en un esbozo pequeño: en la familia va `(x − 1)·e⁻ˣ`.
  - Las asíntotas de un logaritmo crecen despacio: el test mira |f| > 15 a 10⁻⁹ del borde, y solo exige horizontal donde f se estabiliza lejos.
- **Fallo que no es de esta unidad:** en árabe, la «y» del eje y algún número se salen un poco por arriba en «Sube o baja» de Aplikazioak 1.º (el mismo fallo de `batx1-zientziak-aplikazioak/games/BachApplicationsGames.tsx` que ya se anotó en Aplicaciones 2.º). No se ha tocado.

## Cierre (2026-11-11)

- `npm test` (2825), `npm run lint` y `npm run build` en verde.
- Inventario: OK (juegos propios: `graph`, `read`, `sight` y el detective; el script cuenta también como propios los dos prestados de 1.º. Herramientas propias: `asymptote`, `symmetry`, `mirror`, `derivative`; el script cuenta 6 porque las de 1.º son propias de su unidad).
- Revisión a 375 px en eu, es y ar: lecciones, resumen, diagnóstico, práctica, retos, banco, las 6 herramientas y los juegos jugando; la carrera, medida fuera de la página.
- Hoja de euskera: `adierazpena-batx2z-euskera.html` en la carpeta compartida del bloque, enviada al dueño.
- **Fallo de otra unidad (sin tocar, para el dueño):** la «y» del eje en árabe en «Sube o baja» de Aplikazioak 1.º (ver la fase 4).
- **Para 2.º Sociales:** las figuras de `figures.tsx`, las herramientas de `lab/Bach2SketchTools.tsx` y los juegos están exportados.

## Publicación

- **Publicada el 2026-11-11** en la segunda tanda de 2.º Ciencias, con el visto bueno del dueño («si»): `main` 9e5e40b, bundle `index-B542gguY.js`. 3166 tests, lint y build en verde; revisada en matella.net a 375 px en eu, es y ar.
