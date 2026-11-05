# Triangeluen ebazpena · 1.º Bachillerato Ciencias

Es la cuarta unidad de Bachillerato (bloque Trigonometría del reparto en paralelo): curso `batx1-zientziak`, tema `resolucion-triangulos`.

- **Carpeta:** `src/pages/batx1-zientziak-triangeluak`
- **`storagePrefix`:** `matella-triangeluak-batx1z`
- **Página:** `TriangeluakBatx1zIntroPage`
- **Rama:** `feat/triangeluak-batx1z`, cortada de `main` 2ff41c2
- **Ids:** todo en el bloque 102000–102999: diagnóstico 102001–102008, retos del laboratorio propio 1021xx–1023xx, juegos 1024xx–1028xx (también las versiones de los juegos de 4.º). Las herramientas prestadas de 4.º guardan sus ids 71xxx.

## Fuentes y alcance

- **Libros:** Anaya Matemáticas I U4 «Resolución de triángulos» (Saber Hacer; Suma Piezas trae lo mismo) y Santillana 1.º Bach Ciencias U4 «Trigonometría» (solucionario; algunas páginas escaneadas). Del libro solo se saca el alcance; textos y ejercicios propios.
- **Reparto con el tema siguiente:** Santillana U4 trae todo el bloque junto y deja los triángulos para el final. Se sigue el orden de Anaya: aquí, razones de cualquier ángulo y triángulos (U4); en `funciones-trigonometricas`, radianes, fórmulas de suma, doble y mitad, transformación en producto, ecuaciones y gráficas (U5). sec, cosec y cotg solo salen en Santillana: van al tema siguiente.
- **Ya visto en 4.º académicas** (`dbh4-akademikoak-trigonometria`): razones de un ángulo agudo, relaciones fundamentales, calculadora, triángulos rectángulos, doble observación, estrategia de la altura, área ½·b·c·sen A, circunferencia goniométrica, reducción con 180° ± α y 360° − α, radianes.
- **Nuevo en 1.º:** ángulos mayores de 360° y negativos, 90° ± α y 270° ± α, el segundo ángulo que la calculadora no da, teoremas de los senos (con 2R) y del coseno, caso dudoso, clase del triángulo por el signo del coseno, Herón, distancias inaccesibles y triangulación, paralelogramos y fuerzas.

**Lo que eligió el dueño («Las recomendadas», 2026-11-05):** V1 (repaso corto con «Antes de empezar» + lo nuevo a fondo), V3 «teorema de los senos» (eu «sinuaren teorema», en «sine rule», ar «مبرهنة الجيوب»), V4 ángulos en grados con un decimal y lados con dos; L1 compás del caso dudoso, L2 bisagra del coseno, L3 circunferencia de 2R; M herramientas de 4.º (circunferencia goniométrica, calculadora, conociendo dos lados, doble observación, área); J1 ¿Cuántos triángulos?, J2 Resuelve por piezas, J3 Localiza la emisora, J4 detective, J5 carrera, memoria y de 4.º «La circunferencia» y «Las otras razones». Sin V2 (sec/cosec/cotg), L4 ni L5.

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `angles` | `quadrant-ratios`, `big-angles`, `related-angles`, `inverse-angles` |
| `right` | `right-review`, `height-strategy` |
| `sines` | `sine-rule`, `ambiguous-case`, `circumradius` |
| `cosines` | `cosine-rule`, `three-sides`, `which-rule` |
| `applications` | `heron`, `inaccessible`, `parallelogram-forces` |

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 con las diez mejoras de la teoría: `lessonTexts.ts` (definiciones, «Otro ejemplo» con números propios, vocabulario, casos en `related-angles` y `which-rule`, y 5 «¿Por qué funciona?»: `inverse-angles`, `sine-rule`, `circumradius`, `cosine-rule`, `heron`) y `lessonChecks.ts` (error típico y «Compruébalo»). 19 enlaces «Antes de empezar»: 4.º académicas (Trigonometría y Vectores), 3.º (Pitágoras, puntos notables, ángulos en la circunferencia) y lecciones anteriores de esta unidad.
- **Dibujos nuevos (15 + portada), en `figures.tsx`:** `QuadrantSignsFigure`, `TurnsFigure`, `QuarterTurnFigure`, `TwinAnglesFigure`, `RightReviewFigure`, `HeightStrategyFigure` (dentro y fuera), `SineRuleFigure`, `AmbiguousFigure` (compás), `CircumcircleFigure`, `CosineRuleFigure`, `TriangleKindsFigure`, `FourCasesFigure`, `HeronFigure`, `TriangulationFigure`, `ForcesFigure` y `TrianglesHeroArt`. Ninguno se toma de 4.º. `figureAfterSteps` en `quadrant-ratios`, `inverse-angles`, `right-review` y `ambiguous-case` (enseñan la respuesta).
- **Contenido:** diagnóstico 102001–102008, práctica 1–20, retos 101–115 y banco 1–50. Respuestas: un número sin unidad; ángulos a la décima, longitudes y áreas a la centésima. Se reutilizan `say`/`same`/`localize`/`localizeNames` (`text.ts`) y `readTrigonometryAnswer` (`answers.ts`) de 4.º académicas.
- **Test nuevo:** `tests/triangeluak-batx1z-content.test.ts`. Además de lo de siempre, vuelve a calcular con código cada respuesta desde sus datos (tabla `computed`) y comprueba cada «=» y «≈» con senos, cosenos y tangentes en grados (el test común no evalúa trigonometría), también en las lecciones, los ejemplos y «Compruébalo».
- **Comprobación:** 2204 tests, lint y build en verde. Revisado a 375 px en eu, es y ar: las 15 lecciones con todos los pasos abiertos, el resumen, práctica, retos, banco y diagnóstico; sin desbordes, sin errores de KaTeX, sin textos fuera de los dibujos y con letra de 21 px o más en ellos.

## Trucos

- En `lessonTexts.ts` y `lessonChecks.ts` se escribe `\sin` y `\tan`; `lessons.tsx` los pasa por `localizeNames` (sen y tg en castellano, tg en euskera). En `lessons.tsx` y `content.ts` se escribe `\sen` y `\tg` con el `say` de 4.º.
- Los dibujos de lección miden 720 de ancho y a 375 px se ven a 0,417: la letra tiene que ser de 21 px o más (8,75 px en pantalla), como en Ekuazioak.
- Dos fórmulas `b=… \qquad c=…` del ejemplo no cabían a 375 px: van en dos filas con `gathered`.
- Al revisar con el navegador, «Ver todos los pasos» mueve la página al último paso un segundo después: espera antes de centrar el dibujo.
- La comprobación de números salta el lado «mal» del error típico (está mal a propósito).

## En curso

- Fase 1+2 terminada (commit de esta fase). Siguiente: fase 3, laboratorio: L1 compás del caso dudoso, L2 bisagra del coseno, L3 circunferencia de 2R (propias, con predicción y retos infinitos), y las prestadas de 4.º.
