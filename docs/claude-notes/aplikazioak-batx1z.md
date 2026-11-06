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

## Trucos

- **Fórmulas largas:** a 375 px el banco tiene 257 px de ancho; todo lo que lleva `\qquad` con dos partes va en filas con `\begin{aligned}`. En pantalla ancha (1024), un paso con fórmula muy larga deja el texto del paso en una columna estrechísima (el diseño común pone la fórmula a la derecha); también pasa en Derivadas. Aquí se parten las que dejaban menos de 60 px.
- **Revisar figuras:** con el panel oculto, lo más fiable es abrir la figura con «Ampliar» y hacer captura de la ventana.
- **Las soluciones del banco** solo se abren después de escribir un intento; para revisarlas a 375 px hay que rellenar los campos.
- **Predicciones del laboratorio desde JS:** `button.click()` no las marca; `dispatchEvent(new MouseEvent('click', { bubbles: true }))` sí.
- **Colores en el laboratorio:** en la etapa verde (`graphs`) los mínimos van en violeta propio, porque la curva ya es verde.

## En curso

- Fases 1+2 y 3 hechas. Siguiente: fase 4, juegos (J1 «Sube o baja», J2 «Caza los extremos», J4 «¿∪ o ∩?», detective, carrera y memoria).
