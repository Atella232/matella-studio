# Deribatuaren aplikazioak · 1.º Bachillerato Ciencias

Es la séptima unidad de Bachillerato y la cuarta del bloque Análisis: curso `batx1-zientziak`, tema `aplicaciones-derivada`.

- **Carpeta:** `src/pages/batx1-zientziak-aplikazioak`
- **`storagePrefix`:** `matella-aplikazioak-batx1z`
- **Página:** `AplikazioakBatx1zIntroPage`
- **Rama:** `feat/aplikazioak-batx1z`, cortada de `feat/deribatuak-batx1z` 1da2288
- **Bloque de ids:** 111000–111999 (diagnóstico 111001–111008, laboratorio propio 1111xx–1113xx, juegos 111401–111899)

## Fuentes y alcance

- **Libros:** Santillana 1.º Bach Ciencias U11 «Aplicaciones de la derivada. Representación de funciones» (solucionario) y Anaya Matemáticas I U12 «Derivadas», apartados 5 y 6 (Anaya no tiene un tema aparte). Del libro solo se ha sacado el alcance; textos y ejercicios son propios.
- **Orden de Santillana:** crecimiento → máximos y mínimos (cambio de signo y segunda derivada) → curvatura e inflexión → coeficientes con condiciones → representación → optimización. De Anaya: extremos absolutos en un intervalo cerrado.
- **Fuera:** L'Hôpital (solo Anaya, en un ejercicio); Rolle y el valor medio (no los trae ninguno); trigonométricas en la representación.
- **Curvatura (decisión del dueño, «Las recomendadas», 2026-11-06):** la convención de Santillana: f″ > 0 es «cóncava» (∪) y f″ < 0 «convexa» (∩), siempre con el dibujo ∪/∩ al lado. En euskera, **ahurra (∪)** y **ganbila (∩)**, la traducción directa que Matella ya usa (cóncavo = ahur, convexo = ganbil en Geometría de 1.º y Cuerpos de 2.º). Inglés: *concave up / concave down*; árabe: مقعّرة نحو الأعلى / نحو الأسفل (no dependen de la convención). Para cambiarlo, basta buscar `ahur|ganbil` en la carpeta.
- **Derivadas cambiada:** la frase de la herramienta `secant` decía «Ganbila den kurban… konkaboan» (ganbila = ∪, al revés que aquí); ahora dice «gorantz / beherantz irekitzen den», como el castellano.

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `monotony` | `sign-monotony`, `intervals`, `always-increasing` |
| `extremes` | `singular-points`, `second-derivative`, `extreme-coefficients` |
| `curvature` | `concavity`, `inflection`, `inflection-coefficients` |
| `optimization` | `absolute-extremes`, `geometry`, `contexts` |
| `graphs` | `polynomial-graph`, `rational-graph`, `exp-log-graph` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-06):**
- V1: convención de Santillana para la curvatura, con ∪/∩. V2: L'Hôpital fuera.
- Herramientas propias: L1 «El semáforo de f′», L3 «La caja sin tapa», L4 «Curvatura con la tangente», L5 «Monta la gráfica».
- M: prestadas la gráfica de f′ de Derivadas y «Recorre una gráfica» de 4.º académicas.
- Juegos propios: J1 «Sube o baja», J2 «Caza los extremos», J4 «¿∪ o ∩?», J5 detective.
- J6: carrera y memoria.
- Fuera: L2 «¿Máximo o mínimo?» (lo cubre L4) y J3 «Plantea el problema».

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 con las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario y 5 «¿Por qué funciona?» en `sign-monotony`, `singular-points`, `second-derivative`, `concavity` y `absolute-extremes`; `lessonChecks.ts` con error típico y «Compruébalo»; enlaces «Antes de empezar» a 4.º académicas (funciones, ecuaciones), Funciones 1.º, Limiteak y Derivadas).
- **Dibujos (`figures.tsx`):** los 15 con `PlotFigure` de Limiteak; tangentes y asíntotas oblicuas como curvas rectas (`line(m, n)`). Notas con palabras solas (sin fórmulas) para que el árabe no se mezcle. Portada `BachApplicationsHeroArt`.
- **Contenido (`content.ts`):** diagnóstico 111001–111008; práctica 1–20 (4 por etapa); retos 101–115 (10/20/30 puntos); banco 1–50. Toda respuesta cerrada es un número: la x de algo, el valor de un extremo, un parámetro, un recuento de extremos o inflexiones, o un valor óptimo. Varios de optimización piden el valor y no la x (el error típico). Intervalos y gráficas completas van en el banco, sin respuesta cerrada.
- **Test:** `tests/aplikazioak-batx1z-content.test.ts` (copia del de Derivadas; ahora lee también las filas de un bloque `aligned`).
- **Registro:** `courses.ts` (solo la fila de 1.º Ciencias), router y `paths.ts`.
- **Revisión a 375 px:** las 15 lecciones en eu, es y ar sin desbordes ni fórmulas encogidas; las 15 figuras ampliadas, sin textos encima de otros (también en árabe); práctica (20), retos (15), banco (50) y diagnóstico en los tres idiomas, con las soluciones abiertas.

**Fase 3, laboratorio (`lab/`):**
- **Herramientas propias (4):**
  - `sign` «El semáforo de f′» (`sign.ts`, ids 111101–111105): cinco funciones (x³/3 − x, (x − 1)³/3 + 1 con f′ = 0 sin cambio de signo, x⁴/4 − x²/2, x + 1/x con hueco en 0, x·eˣ); la sonda pinta bajo la gráfica una tira verde (f′ > 0) o roja (f′ < 0), con puntos ámbar donde f′ = 0. Predicción: en el punto marcado con f′ = 0, ¿máximo, mínimo o ninguno?
  - `box` «La caja sin tapa» (`box.ts`, ids 111201–111205): chapa de 12, 18, 24 o 30 cm y corte x en medios centímetros; la chapa con las esquinas cortadas y la gráfica de V(x) = x(L − 2x)². Predicción: ¿el mejor corte (L/6) es menor que 3 cm, 3 cm o mayor?
  - `curvature` «Curvatura con la tangente» (`curvature.ts`, ids 111301–111305): cinco funciones (x³/3 − x, x⁴/12 − x²/2, x⁴/12 como trampa, x·eˣ, 1/x); el hueco entre la curva y su tangente se pinta verde (curva por encima, ∪) o rojo (por debajo, ∩). Predicción: en el punto marcado, ¿por encima, la atraviesa o por debajo?
  - `layers` «Monta la gráfica» (`layers.ts`, ids 111351–111355): −x³ + 3x, x⁴/2 − x², x²/(x − 1) y x·eˣ, por capas (dominio, cortes, asíntotas, crecimiento, curvatura, curva). Los retos describen una función por sus rasgos (la de asíntota oblicua, la de un solo extremo…): hay que elegirla y mostrar la capa que lo prueba. Predicción: ¿menos de 2 extremos, 2 o más?
- **Prestadas (2), con sus ids:** `slope-graph` de Derivadas (`SlopeGraphTool`, 110201–110205) y `explorer` de 4.º («Recorre una gráfica», `ExplorerTool` de 4.º aplicadas, ficha de 4.º académicas).
- **Componentes:** `BachApplicationsTools.tsx` (copia `curvePath`, `Grid` y `useClip` de Derivadas), `index.tsx` con `BachApplicationsLaboratory`, `labTools.ts`.
- **Test:** `tests/aplikazioak-batx1z-lab.test.ts` (además comprueba con derivadas numéricas f′ y f″ de cada función, que las marcas de «Monta la gráfica» son lo que dicen y que las asíntotas lo son).
- **Revisión a 375 px:** las 6 herramientas en eu, es y ar, antes y después de predecir, sin desbordes; tableros mirados en capturas.

**Fase 4, juegos (`games/`):**
- **Juegos propios (3 + detective):**
  - `updown` «Sube o baja» (`updown.ts`, ids 111501–111503): la tabla de signos de f′ (tira verde/roja con puntos ámbar y huecos) y tres gráficas pequeñas; ¿cuál es f? Nivel 1, parábolas; nivel 2, cúbicas; nivel 3, también un punto plano (a(x − h)³) y una hipérbola con hueco. Las malas son la misma curva dada la vuelta y la curva movida al menos 2 unidades.
  - `extrema` «Caza los extremos» (`extrema.ts`, ids 111601–111603): la gráfica es f′; tres puntos A, B y C en el eje; ¿dónde tiene f un máximo, un mínimo o un punto con f′ = 0 sin extremo? Nivel 1, f′ parábola (el vértice como señuelo); nivel 2, tres ceros simples igual de separados; nivel 3, un cero doble (f′ toca el eje). f′ se escala para que la zona de los ceros llene el plano; fuera puede salirse.
  - `shape` «¿∪ o ∩?» (`shape.ts`, ids 111651–111653): ∪, ∩ o inflexión en un punto; nivel 1 desde una gráfica (parábolas y cúbicas de `curves.ts` de Derivadas), nivel 2 desde f″ (incluida la trampa (x − r)²), nivel 3 desde f (incluida la trampa x⁴ + c).
  - `detective` (`detective.ts`, ids 111701–111703): 12 errores en 3 niveles (signo de f en vez de f′, un intervalo que salta un hueco, «f′ = 0 ⇒ extremo», f″ > 0 como máximo; «f″ = 0 ⇒ inflexión», f′ para la inflexión, la altura en f′, f′ > 0 como ∪; los bordes de [a, b], x en vez del valor, el perímetro entero, un hueco como extremo). Las líneas no llevan palabras: ↗↘ y ∪∩.
- **Carrera** (`race.ts`, ids 111401–111405): 15 tipos en 5 circuitos, uno por etapa; cada pregunta lleva `meta` y el test la recalcula numéricamente.
- **Memoria** (`boards.ts`, ids 111801–111803): función ↔ x del vértice, función ↔ x de la inflexión, x(S − x) ↔ valor máximo.
- **Hub:** `index.tsx` con `BachApplicationsGames`; `info.ts` (slugs `lasterketa`, `gora-behera`, `muturrak`, `kurbadura`, `detektibea`, `memoria`); `GameArt.tsx`; `BachApplicationsGames.css`.
- **Test:** `tests/aplikazioak-batx1z-games.test.ts`.
- **Revisión a 375 px:** los seis juegos en eu, es y ar sin desbordes; cartas de memoria de 75 px como mucho (miden 106); líneas del detective de 245 px como mucho (caben unos 255).

## Trucos

- **Fórmulas largas:** a 375 px el banco tiene 257 px de ancho; todo lo que lleva `\qquad` con dos partes va en filas con `\begin{aligned}`. En pantalla ancha (1024), un paso con fórmula muy larga deja el texto del paso en una columna estrechísima (el diseño común pone la fórmula a la derecha); también pasa en Derivadas. Aquí se parten las que dejaban menos de 60 px.
- **Revisar figuras:** con el panel oculto, lo más fiable es abrir la figura con «Ampliar» y hacer captura de la ventana.
- **Las soluciones del banco** solo se abren después de escribir un intento; para revisarlas a 375 px hay que rellenar los campos.
- **Predicciones del laboratorio desde JS:** `button.click()` no las marca; `dispatchEvent(new MouseEvent('click', { bubbles: true }))` sí.
- **Ancho de las líneas del detective:** se puede medir sin jugar, importando en la consola del navegador `/node_modules/katex/dist/katex.mjs` y el módulo `games/detective.ts?t=…` (con `?t=` para no leer el módulo viejo) y dibujando cada línea a 21 px.
- **Memoria:** sin término independiente (x² − 6x, no x² − 6x + 5); con él, la carta llegaba a 104 px.
- **Colores en el laboratorio:** en la etapa verde (`graphs`) los mínimos van en violeta propio, porque la curva ya es verde.

## Cierre (2026-11-06)

- **Comprobado:** 2318 tests, lint y build en verde; inventario OK (3 juegos propios más el detective; 4 herramientas propias: el script cuenta 5 porque toma como propia la gráfica de f′, que viene de Derivadas).
- **Revisión a 375 px en eu, es y ar:** lecciones (con las figuras ampliadas), diagnóstico, práctica, retos, banco, las 6 herramientas y los 6 juegos.
- **Hoja de euskera:** `aplikazioak-batx1z-euskera.html` en la carpeta de notas compartidas de la sesión principal, con `--herramientas sign,curvature,box,layers --juegos updown,extrema,shape,detective`. Como en las anteriores, no lleva los retos fijos del laboratorio ni `content.ts`.
- **Euskera confirmado por el dueño (2026-11-06):** ahurra (∪) y ganbila (∩). Si algún día cambia, basta buscar `ahur|ganbil` en la carpeta (lecciones, contenido, laboratorio y juegos).
- **Portada:** los puntos rojo y verde están en la cima y el valle exactos de la curva; la tarjeta dice «f″ > 0 → ∪» y «f″ < 0 → ∩» por separado (antes parecía una unión de conjuntos).
- **Derivadas, arreglado aquí:** el detective de Derivadas también se salía a 375 px; se acortaron sus líneas (ver su nota).
- **Commits:** 7e9127a (fases 1+2), 62bb3e7 (fase 3), 233f490 (fase 4), 8ec84ac (nota) y el de la portada y el detective de Derivadas.
