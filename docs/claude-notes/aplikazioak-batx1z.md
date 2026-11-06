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

## Trucos

- **Fórmulas largas:** a 375 px el banco tiene 257 px de ancho; todo lo que lleva `\qquad` con dos partes va en filas con `\begin{aligned}`. En pantalla ancha (1024), un paso con fórmula muy larga deja el texto del paso en una columna estrechísima (el diseño común pone la fórmula a la derecha); también pasa en Derivadas. Aquí se parten las que dejaban menos de 60 px.
- **Revisar figuras:** con el panel oculto, lo más fiable es abrir la figura con «Ampliar» y hacer captura de la ventana.
- **Las soluciones del banco** solo se abren después de escribir un intento; para revisarlas a 375 px hay que rellenar los campos.

## En curso

- Fase 1+2 hecha. Siguiente: fase 3, laboratorio (L1, L3, L4, L5 propias; prestadas `slope-graph` de Derivadas y `explorer` de 4.º).
