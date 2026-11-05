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

**Fase 3, laboratorio:** 8 herramientas (`lab/labTools.ts`).
- **Propias (3),** con predicción antes del resultado y retos infinitos (`freshFrom` de `dbh3-segidak/lab/prediction.ts`); piezas de `dbh3-segidak/lab/LabParts`:
  - L1 `compass` «El compás del caso dudoso», retos 102101–102105 (`lab/compass.ts`): A, b y la abertura a; se predice si hay 0, 1 o 2 triángulos y después se ven la circunferencia, los cortes B₁ y B₂ y sus ángulos. La altura h y la abertura a se ven antes de predecir.
  - L2 `hinge` «La bisagra del coseno», retos 102201–102205 (`lab/hinge.ts`): b, c y A; se predice si a² es menor, igual o mayor que b² + c²; las barras enseñan b² + c² y a², con la corrección que falta (discontinua) o sobra (roja). ▶ abre la bisagra desde 10°.
  - L3 `circumcircle` «La circunferencia de 2R», retos 102301–102305 (`lab/circumcircle.ts`): a, A y la posición de A en su arco; se predice si R es menor, igual o mayor que a (sen A frente a ½); después, la circunferencia, el centro, el diámetro y los tres cocientes iguales a 2R. ▶ mueve A por el arco. B y C están en 270° ∓ A, así que el arco BC sin A mide 2A.
- **Prestadas de 4.º académicas (5),** con sus retos e ids 71xxx: circunferencia goniométrica, calculadora, conociendo dos lados, doble observación y área.
- **Test:** `tests/triangeluak-batx1z-lab.test.ts` (los cortes están a distancia a de C; los ángulos B cumplen el teorema de los senos; el tercer lado cierra el triángulo; los tres vértices están en la circunferencia y los tres cocientes valen 2R en cualquier posición de A).
- **Revisión:** las 8 herramientas a 375 px en eu, es y ar, antes y después de predecir, y las propias en sus valores extremos: sin desbordes ni texto fuera del tablero.

## Trucos

- En `lessonTexts.ts` y `lessonChecks.ts` se escribe `\sin` y `\tan`; `lessons.tsx` los pasa por `localizeNames` (sen y tg en castellano, tg en euskera). En `lessons.tsx` y `content.ts` se escribe `\sen` y `\tg` con el `say` de 4.º.
- Los dibujos de lección miden 720 de ancho y a 375 px se ven a 0,417: la letra tiene que ser de 21 px o más (8,75 px en pantalla), como en Ekuazioak.
- Dos fórmulas `b=… \qquad c=…` del ejemplo no cabían a 375 px: van en dos filas con `gathered`.
- Al revisar con el navegador, «Ver todos los pasos» mueve la página al último paso un segundo después: espera antes de centrar el dibujo.
- La comprobación de números salta el lado «mal» del error típico (está mal a propósito).
- En los resultados del laboratorio, una fórmula con `\\qquad` no cabe a 375 px: una fórmula por línea.
- La bisagra y la circunferencia se veían diminutas con los valores de partida: la bisagra usa 20 px por unidad y barras a escala de (b + c)²; la circunferencia, 16 px por unidad hasta que R no cabe.

## En curso

- Fases 1+2 (commit 6a59d1d) y 3 hechas. Siguiente: fase 4, juegos: J1 ¿Cuántos triángulos?, J2 Resuelve por piezas, J3 Localiza la emisora, J4 detective; J5 carrera, memoria y «La circunferencia» y «Las otras razones» de 4.º con niveles nuevos.
