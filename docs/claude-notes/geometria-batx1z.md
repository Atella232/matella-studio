# Geometria analitikoa · 1.º Bachillerato Ciencias

Segunda unidad del bloque Geometría (reparto en paralelo de 1.º Ciencias, ver `bachillerato.md`): curso `batx1-zientziak`, tema `geometria-analitica`.

- **Carpeta:** `src/pages/batx1-zientziak-geometria`
- **`storagePrefix`:** `matella-geometria-batx1z`
- **Rama:** `feat/geometria-batx1z`, cortada de `feat/bektoreak-batx1z` (813d303) para usar sus piezas
- **Bloque de ids:** 106000–106999 (diagnóstico 106001–106008, laboratorio propio 106101–106399, juegos 106401–106899)

## Fuentes y alcance

- **Libros:** Anaya Matemáticas I (Saber Hacer) U8 «Geometría analítica» y la segunda parte de Santillana 1.º Bach Ciencias U6 (solucionario; fórmulas como imagen). Del libro solo se saca el alcance; textos y ejercicios propios.
- **Lo que viene de Bektoreak:** punto medio, simétrico, puntos alineados y dividir un segmento (Anaya U8 §1) se dan aquí.
- **Corte con `konikak`:** la bisectriz de dos rectas y la mediatriz como lugares geométricos van a Konikak (Anaya U9 empieza por ahí); aquí la mediatriz solo sale como recta notable del triángulo.
- **Solapamiento con 4.º académicas** (`dbh4-akademikoak-bektoreak`): puntos, ecuaciones de la recta, pendiente, paralelas, perpendiculares y posición relativa ya están; lo nuevo es el vector normal, el haz de rectas, el ángulo de dos rectas, las distancias a una recta, el simétrico respecto de una recta, los puntos notables con ecuaciones y el área con la distancia.

## Diseño elegido

- 2026-11-05: el dueño eligió «Las recomendadas». Herramientas propias: L2 «El haz de rectas», L3 «El ángulo de dos rectas» y L4 «La distancia más corta»; prestadas: de 4.º el segmento, alinear, las formas de la recta y dos rectas, y de 3.º los puntos notables. Juegos propios: J1 «Rectas gemelas», J2 «El radar» y J4 detective de rectas; además, carrera (J5), memoria y «Encuentra k» de 4.º.

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** 15 en 5 etapas (`points`, `lines`, `positions`, `distances`, `triangles`), con las diez mejoras de la teoría (`lessonTexts.ts` y `lessonChecks.ts`; tres «¿Por qué funciona?» en `divide-segment`, `general-normal` y `point-line`). Enlaces «Antes de empezar» a 4.º académicas (Vectores y rectas, Trigonometría), a Bektoreak de 1.º (operaciones, perpendiculares, ángulo, proyección) y a 3.º (puntos notables).
- **Dibujos nuevos (10):** `DivideFigure`, `NormalFigure`, `InclinationFigure`, `PencilFigure`, `LineAngleFigure`, `PointLineFigure`, `ParallelDistanceFigure`, `ReflectionFigure`, `TrianglePointsFigure`, `TriangleAreaFigure`, más `BachGeometryHeroArt`, todos en `Fig` (`figureKit.tsx`; los colores en `figureColors.ts`, porque `figures.tsx` solo puede exportar componentes). De 4.º: `MidpointFigure`, `CollinearFigure`, `ParametricFigure`, `ParallelLinesFigure` y `PositionsFigure` (su «y» del eje queda pegada al borde de arriba, como en 4.º; se ve entera).
- **Contenido:** diagnóstico 106001–106008, práctica 1–20, retos 101–115 y banco 1–50. Respuestas de un número (coordenada, coeficiente, pendiente, ángulo en grados, distancia, área o parámetro), leídas con `readVectorsAnswer` de 4.º.
- **Test nuevo:** `tests/geometria-batx1z-content.test.ts` (copia del de Bektoreak).
- **Comprobación:** 2233 tests, lint y tsc en verde. Revisado a 375 px en eu, es y ar: las 15 lecciones con todos los pasos, el resumen, la portada, el diagnóstico, la práctica, los retos y el banco. Cuatro fórmulas de pasos bajaban de 13 px: partidas en dos filas con `gathered`.

**Fase 3, laboratorio:** 8 herramientas.
- **Propias (3), en `lab/`:** `pencil.ts` «El haz de rectas» (106101–106105: centro P, pendiente de una lista de 11 y un punto Q; se predice si Q está por debajo, sobre o por encima de la recta, y Q se oculta hasta predecir; el haz entero se dibuja en gris), `lineAngle.ts` «El ángulo de dos rectas» (106201–106205: dos rectas por el origen con sus vectores directores; se predice si el ángulo es menor, igual o mayor que 45°, comparando con enteros 2(u·v)² frente a |u|²|v|²) y `shortest.ts` «La distancia más corta» (106301–106305: cuatro rectas, P y un Q que anda por la recta a pasos enteros; se predice si d(P, r) es menor, igual o mayor que |PQ|, y ▶ lleva Q al pie H con el ángulo recto). Retos infinitos en las tres. Componentes en `GeometryTools.tsx`.
- **Prestadas:** de 4.º académicas el segmento, el tercer punto, las formas de la recta y la segunda recta; de 3.º los puntos notables (con sus ids).
- **Test nuevo:** `tests/geometria-batx1z-lab.test.ts`.
- **Comprobación:** 2237 tests y lint en verde; revisado a 375 px en eu, es y ar con la predicción hecha y ▶ pulsado. Las prestadas de 4.º dejan la «x» y la «y» de los ejes pegadas al borde, como en su unidad.

**Fase 4, juegos:** 6 juegos en `games/`.
- **Propios:** `twins.ts` «Rectas gemelas» (106501–106503: una recta en una forma y cuatro en otra; las falsas son paralela, perpendicular por tomar el normal como director, punto con el signo cambiado y pendiente invertida; al responder se dibujan la recta y la elegida; nivel 1 general ↔ explícita, nivel 2 vectorial, paramétricas y continua ↔ general, nivel 3 las seis formas), `radar.ts` «El radar» (106601–106603: distancia de un radar a la ruta de un barco, con distractores sin raíz, entre A + B, sin C, sin valor absoluto y el signo de y; dibujo con el alcance y la perpendicular; nivel 2 con la ruta como y = mx + n y nivel 3 con dos rutas paralelas, una con los coeficientes dobles) y `detective.ts` «Detective de rectas» (106701–106703, 12 errores típicos de la unidad).
- **Carrera** `race.ts` (106401–106405, 15 tipos de pregunta con `meta`) y **memoria** `boards.ts` (106801–106803: pendiente, punto medio y distancia). De 4.º, «Encuentra k» (106811–106813).
- `lines.ts` reúne las formas de la recta en LaTeX (general reducida, explícita, punto-pendiente, vectorial, paramétricas y continua).
- **Test nuevo:** `tests/geometria-batx1z-games.test.ts`.
- **Comprobación:** 2244 tests, lint y build en verde; inventario OK; juegos revisados a 375 px en eu, es y ar.

## En curso

- Fases 1+2, 3 y 4 hechas. Queda el cierre: hoja de revisión del euskera y aviso a la sesión principal. Después, Konikak (`feat/konikak-batx1z`, cortada de esta rama).
