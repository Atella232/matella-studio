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

## En curso

- Fase 1+2 hecha (lecciones y contenido). Siguiente paso: fase 3, laboratorio (L2 haz, L3 ángulo, L4 distancia más corta; ids 106101–106399) y las prestadas.
