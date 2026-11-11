# Deribatuak · 2.º Bachillerato Ciencias

Segundo tema del bloque Cálculo diferencial de 2.º Ciencias (reparto en paralelo del 2026-11-09): curso `batx2-zientziak`, tema `derivadas`.

- **Carpeta:** `src/pages/batx2-zientziak-deribatuak`
- **`storagePrefix`:** `matella-deribatuak-batx2z`
- **Página:** `DeribatuakBatx2zIntroPage`
- **Rama:** `feat/deribatuak-batx2z`, cortada de `feat/limiteak-batx2z` (a75a2e1)
- **Bloque de ids:** 123000–123999 (diagnóstico 123001–123008, laboratorio propio 1231xx–1233xx, juegos 123401–123899)
- **Servidor de pruebas:** puerto 5183 (`.claude/launch.json` sin commit, `matella-dev-5183`)

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U8 «Derivadas» y Anaya Matemáticas II U8 «Derivadas». EBAU del País Vasco 2017–2022 solo para el estilo. Del libro solo se ha sacado el alcance; textos y ejercicios son propios.
- **Santillana U8:** derivada en un punto, tangente y normal; derivadas laterales y derivabilidad (muchos trozos); función derivada, reglas y tabla con arcos; tangentes con condiciones (paralelas, desde un punto exterior, con parámetros); derivabilidad con parámetros. Implícita en un solo ejercicio; sin logarítmica ni diferencial.
- **Anaya U8:** lo mismo y además derivadas sucesivas y de orden n, derivada de la inversa, derivación implícita (mucha) y logarítmica, y la diferencial.
- **EBAU País Vasco:** «halla a y b para que f sea derivable» (2018, 2020, 2022) y «halla los coeficientes sabiendo la tangente en un punto» (2017, 2021).
- **Lo que ya vio 1.º (Deribatuak 1.º):** T.V.M., derivada por la definición, tangente y normal, laterales y derivabilidad básica, reglas, cadena simple, exponencial, logaritmo, trigonométricas y arcos, tangente paralela u horizontal.

**Lo que eligió el dueño («Las recomendadas», 2026-11-10):**
- V1: la diferencial fuera. V2: derivación implícita y logarítmica dentro. V3: el repaso de 1.º en una etapa de 2 lecciones.
- Herramientas propias: L1 «La lupa de la derivabilidad», L2 «Ajusta a y b: que no haya pico», L3 «La tangente a la curva implícita», L4 «El espejo de la inversa».
- M: prestadas de 1.º «De la secante a la tangente», «La gráfica de f′» y «¿Derivable aquí?».
- Juegos propios: J1 «¿Derivable?», J2 «Pela la cebolla», J3 «Pendiente escondida», J5 detective de 2.º.
- J6 carrera y memoria; J7 de 1.º «Empareja f y f′» y «Tangente exacta».
- Fuera: L5 «La cebolla de la cadena» y J4 «Orden n».

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `review` | `review-tangent`, `review-rules` |
| `derivability` | `corners`, `absolute`, `parameters` |
| `chain` | `three-layers`, `composite-table`, `higher-order` |
| `special` | `inverse`, `implicit`, `logarithmic` |
| `tangents` | `coefficients`, `exterior-point`, `tangent-curves` |

La propuesta decía «15 lecciones (2 + 13)», pero su tabla, que es lo aprobado, tiene 14 (2 + 3 + 3 + 3 + 3). Se han hecho las 14 de la tabla.

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 14 con las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario, casos en `composite-table` y `higher-order` y 5 «¿Por qué funciona?» en `corners`, `three-layers`, `inverse`, `implicit` y `logarithmic`; `lessonChecks.ts` con error típico y «Compruébalo»). «Antes de empezar» enlaza a Deribatuak, Funciones, Sucesiones y Cónicas de 1.º y a «Dos parámetros: un sistema» de Limiteak 2.º.
- **Dibujos (`figures.tsx`):** `LimitPlot` de Limiteak 2.º (importado, sin tocarlo) para 10 planos; la circunferencia de `implicit` es un camino cerrado propio (dos mitades con √ dejaban un hueco en x = ±5); las tres reglas, las capas, la tabla de compuestas y la escalera de derivadas son dibujos propios. Portada `Bach2DerivativesHeroArt`. Nombres: sen/tg/arcsen/arctg en castellano, tg/arctg en euskera, tan/arctan en inglés y árabe.
- **Contenido (`content.ts`):** diagnóstico 123001–123008; práctica 1–20 (4 por etapa); retos 101–115 (10/20/30); banco 1–50. Toda respuesta cerrada es un número: una pendiente, una derivada en un punto, un parámetro (o la suma o el producto de dos), cuántos picos o tangentes hay, o una abscisa.
- **Registro:** `active: true` en la fila `derivadas` de 2.º Ciencias de `courses.ts`, ruta en `src/router/index.tsx` y la dirección en `src/features/unit-v2/paths.ts`.
- **Test:** `tests/deribatuak-batx2z-content.test.ts` (copia del de Limiteak 2.º).
- **Trucos:** el evaluador de los tests no lee `3!`, `e^0` ni `\ln`, así que esas igualdades no se comprueban (ni fallan); las fórmulas largas van en filas `gathered` desde el principio. Los dibujos propios (reglas, capas, tabla, escalera) van en filas a todo el ancho con letra de 27–31: en dos columnas o con letra de 19 se leían mal a 375 px.
- **Comprobación:** tests de lecciones y de contenido, `tsc` y lint en verde. Revisión a 375 px en eu, es y ar: las 14 lecciones (con los pasos y los «¿Por qué funciona?» abiertos y el «Compruébalo» contestado), el resumen, el diagnóstico, la práctica, los retos y el banco: sin desbordes, sin desplazamiento lateral, sin errores de KaTeX y sin textos fuera de los dibujos.

Commit 43bcbbf.

**Fase 3, laboratorio (7 herramientas), «Lupas, espejos y tangentes»:**
- **Propias (4),** con predicción antes del dibujo, retos fijos y retos infinitos (`freshFrom`); todos los tableros con la misma escala en los dos ejes, para que las pendientes se vean como son:
  - L1 `zoom` «La lupa de la derivabilidad» (`lab/zoom.ts`, ids 123101–123105): f₁ = x² en 1, f₂ = |x − 1| + 1, f₃ = x² | 3x − 2 en 1 (pico que de lejos no se ve), f₄ = x|x| en 0, f₅ = √|x| en 0 (se pone vertical), f₆ = sen x en 0; lupa ×1 … ×64 (media anchura 2/zoom). La lectura da las pendientes de las dos cuerdas (m⁻, m⁺), que tienden a las derivadas laterales. Predicción: de cerca, ¿pico, recta o vertical? Retos infinitos: acercar hasta que una cuerda quede a menos de 0,5/0,2/0,1 de su derivada lateral.
  - L2 `no-corner` «Ajusta a y b: que no haya pico» (`lab/noCorner.ts`, ids 123201–123205): g₁ = x² + ax | b ln x + 3 en 1 (2, 4), g₂ = ax² + 1 | bx − 3 en 2 (1, 4), g₃ = ax + b | x² − 4x + 7 en 1 (−2, 6), g₄ = ax + b | x² − 4x + 6 en 2 (0, 2). La unión es salto, pico o suave; sin salto se dibujan las dos tangentes. Predicción: el signo de la pendiente en la unión cuando no hay pico (>, >, <, =).
  - L3 `implicit` «La tangente a la curva implícita» (`lab/implicitTangent.ts`, ids 123301–123305): C₁ x² + y² = 25, C₂ x² + 2y² = 9, C₃ xy = 4, C₄ y² = 4x, con puntos de coordenadas exactas; la lectura deriva la ecuación y da y′ como fracción, o dice que la tangente es vertical. Predicción: el signo de la pendiente en el punto de partida P (=, >, <, >). Va en la etapa `tangents` para que cada etapa tenga herramienta (su lección es `implicit`).
  - L4 `mirror` «El espejo de la inversa» (`lab/mirror.ts`, ids 123351–123355): eˣ, x³, x² (x ≥ 0) y x³ + x con su inversa reflejada en y = x (dibujada como los puntos (f(x), x)), P = (a, f(a)), Q = (f(a), a) y las dos tangentes; donde f′(a) = 0 la reflejada es vertical. Predicción: la pendiente de la inversa en Q, ¿menor, igual o mayor que m? (>, <, =, <).
- **Prestadas de 1.º, con sus retos e ids:** de la secante a la tangente (`review-tangent`), ¿derivable aquí? (`corners`) y la gráfica de f′ (`higher-order`, etapa `chain`).
- **Truco:** en los puntos con decimales (0,25; 0,368) se separan las coordenadas con punto y coma en eu y es.
- **Test:** `tests/deribatuak-batx2z-lab.test.ts` (retos resueltos por su solución y no al abrir; extras alcanzables; cada punto está en su curva y su pendiente coincide con la numérica; la inversa deshace f y su pendiente es 1/f′).
- **Comprobación:** revisión a 375 px en eu, es y ar de las 7 herramientas, antes y después de predecir y moviendo todos los controles: sin desbordes ni textos fuera del tablero.

Commit 7823f12.

**Fase 4, juegos (8):**
- **Propios (3):**
  - J1 `derivable` «¿Derivable?» (`games/derivable.ts`, ids 123501–123503): una función a trozos (o con valor absoluto) y la unión; tres veredictos: derivable, continua con pico o no continua. Nivel 1: dos polinomios (la mitad de los saltos con las mismas pendientes: la trampa de mirar solo las pendientes); nivel 2: polinomio y eˣ, e²ˣ, sen x, cos x, ln(x + 1), ln x, x³, 1/x, eˣ⁻¹; nivel 3: x|x|, (x − a)|x − a|, |x − a|³, |x² − a²|, x|x − a|, |x − a| + x, |x − a|/(x − a), (x² − a²)/|x − a|. 8 rondas, cada veredicto al menos dos veces. Tras responder salen las alturas y las pendientes de los dos lados.
  - J2 `onion` «Pela la cebolla» (`games/onion.ts`, ids 123601–123603): una función de tres capas; primero se tocan las tarjetas de fuera adentro (solo vale un orden) y después se elige la derivada entre tres: la buena, la que olvida la capa de dentro y la que olvida la del medio. Fuera: □², □³, √□, e^□, ln □; medio: sen, cos, e, ln; dentro: kx, qx², x² + c. Se evitan las parejas que se deshacen (ln e^□, e^{ln □}) y □² de una exponencial.
  - J3 `hidden` «Pendiente escondida» (`games/hidden.ts`, ids 123651–123653): una curva, un punto de coordenadas enteras y tres rectas A, B, C por él; solo una es la tangente. Nivel 1 circunferencias (normal y signo cambiado), nivel 2 elipses x² + ky² = d y xy = k (factor olvidado, x e y cambiadas), nivel 3 x² ± xy + y² = d (xy derivado sin y′ o sin y). Si dos pendientes quedan a menos de 12°, se toman la normal o el signo cambiado.
- **Detective** (`games/detective.ts`, ids 123701–123703), 12 errores: normal −m, (uv)′ = u′v′, pendientes iguales con salto, pico donde lo de dentro solo toca 0; capa de dentro, u′ de ln u, signo que alterna, n en vez de n!; 1/f′(b), (y²)′ = 2y, (xˣ)′ = x·xˣ⁻¹, pendiente en la abscisa del punto exterior.
- **Carrera** (`games/race.ts`, ids 123401–123405): 15 tipos con `meta` (tangente, normal, producto; k de la unión, picos de un valor absoluto, f′(a⁺); tres capas en 0, ln(x² + c) en 1, eᵏˣ de orden n; inversa, circunferencia, elipse; tangente horizontal, coeficiente b, tangentes desde (0, −k²)).
- **Memoria** (`games/boards.ts`, ids 123801–123803): compuestas ↔ derivada, sucesivas ↔ resultado, curva ↔ y′; cada tablero toma cada plantilla una vez y no hay senos ni arcos (las tarjetas no se traducen).
- **Prestados de 1.º:** «Empareja f y f′» (123811–123813) y «Tangente exacta» (123821–123823), con sus textos y niveles y las etapas de esta unidad.
- **Test:** `tests/deribatuak-batx2z-games.test.ts` (alturas y pendientes de J1 comparadas con las numéricas de la propia función; en J2 el producto de factores es la derivada numérica; en J3 la pendiente se sigue por la curva con Newton; la carrera contra su `meta` y, en cinco tipos, contra un cálculo numérico).

## Cierre (2026-11-10)

- `npm test` (2754), `npm run lint` y `npm run build` en verde.
- Inventario: OK (juegos propios: `derivable`, `onion`, `hidden` y el detective; herramientas propias: `zoom`, `no-corner`, `implicit`, `mirror`).
- Revisión a 375 px en eu, es y ar: lecciones, resumen, diagnóstico, práctica, retos, banco, las 7 herramientas y los 8 juegos en sus tres niveles.
- Hoja de euskera: `deribatuak-batx2z-euskera.html` en la carpeta compartida del bloque, enviada al dueño.
- **Coeficientes 0 y 1:** la carrera y el detective escribían a veces `x^2x`, `+1x` o `+0x` (KaTeX lo dibuja sin error y la revisión de desbordes no lo ve). Ahora usan `plusTerm`/`times`, y un test de juegos busca esas formas en todos los textos generados.
- **Arreglos de la revisión:** en «Pendiente escondida» las letras A, B y C se buscan a lo largo de su recta hasta que caben en el tablero; en el detective, las líneas «deriva» de orden n muestran solo f″ (la pareja f′, f″ no cabía en árabe).
- **Fallo de otra unidad (sin tocar, para el dueño):** en árabe, en «Empareja f y f′» y «Tangente exacta» de Deribatuak 1.º, la «y» del eje vertical se sale unos píxeles por arriba del dibujo. Pasa igual en la unidad de 1.º; habría que bajar ese rótulo en `batx1-zientziak-deribatuak/games/BachDerivativesGames.tsx`.
- **Para 2.º Sociales:** `LimitPlot` (de Limiteak 2.º) y las figuras de `figures.tsx` están exportadas; `polyLatex` de `games/derivable.ts` también.

## Publicación

- **Publicada el 2026-11-10** con los otros temas terminados de 2.º Ciencias, tras el «publica lo que ya esté hecho» del dueño: `main` 5e186b4, bundle `index-BiUKCFuE.js`. 2993 tests, lint y build en verde; revisada en matella.net a 375 px en eu, es y ar.
