# Konikak · 1.º Bachillerato Ciencias

Tercera unidad del bloque Geometría (reparto en paralelo de 1.º Ciencias, ver `bachillerato.md`): curso `batx1-zientziak`, tema `conicas` (Lugares geométricos y cónicas).

- **Carpeta:** `src/pages/batx1-zientziak-konikak`
- **`storagePrefix`:** `matella-konikak-batx1z`
- **Rama:** `feat/konikak-batx1z`, cortada de `feat/geometria-batx1z` (92ab6ba) para usar sus piezas
- **Bloque de ids:** 107000–107999 (diagnóstico 107001–107008, laboratorio propio 107101–107399, juegos 107401–107899)

## Fuentes y alcance

- **Libros:** Anaya Matemáticas I (Saber Hacer) U9 «Lugares geométricos. Cónicas» y Santillana 1.º Bach Ciencias U7 (solucionario). Del libro solo se saca el alcance; textos y ejercicios propios.
- **Notación de los dos libros:** parábola y² = 2px (foco (p/2, 0), directriz x = −p/2); elipse con a² = b² + c²; hipérbola con c² = a² + b²; e = c/a.
- **Solo en Anaya:** potencia de un punto y eje radical (Santillana no los trae): se proponen como opción.
- **Viene de Geometría analítica:** la mediatriz como recta del triángulo y la distancia punto-recta; aquí la mediatriz y las bisectrices son lugares geométricos.

## Diseño elegido (2026-11-06: «Las recomendadas»)

- **V1:** 15 lecciones en 5 etapas (3/4/3/2/3):
  - `loci` (azul): `perpendicular-bisector`, `angle-bisectors`, `distance-loci`.
  - `circle` (violeta): `circle-equation`, `circle-general`, `circle-line`, `two-circles`.
  - `ellipse` (mostaza): `ellipse-definition`, `ellipse-elements`, `ellipse-shifted`.
  - `hyperbola` (coral): `hyperbola-definition`, `hyperbola-asymptotes`.
  - `parabola` (verde): `parabola-definition`, `parabola-positions`, `recognize-conic`.
- **Laboratorio:** L1 «El jardinero» (elipse con cuerda), L2 «Foco y directriz» (parábola), L3 «La excentricidad»; prestadas de 4.º `circle` y `bisector`.
- **Juegos:** J1 «¿Qué cónica es?», J3 «La antena», J4 detective de cónicas (12 errores), J5 carrera, J6 memoria.

## Trucos

- **Notación fija en toda la unidad (lecciones, laboratorio y juegos):** `a` es siempre el semieje mayor; la elipse de eje vertical es $\frac{x^2}{b^2}+\frac{y^2}{a^2}=1$. Parábola $y^2=2px$, foco $(\frac{p}{2},0)$, directriz $x=-\frac{p}{2}$; nunca 4p.
- **Términos:** eu «leku geometrikoa», «erdibitzailea» (mediatriz), «erdikaria» (bisectriz), «fokua», «zuzentzailea», «ardatzerdi nagusia/txikia», «eszentrikotasuna», «asintota»; ar «المحل الهندسي», «محور القطعة», «منصّف الزاوية», «البؤرة», «الدليل», «الاختلاف المركزي», «المقارب».
- **«Compruébalo» con una ecuación:** el test lee una sola fórmula con «=» como la ecuación que hay que resolver (un punto de respuesta se mete en la curva). Nombra lo que se pide con otra fórmula ($C$, $E$: …) para que haya dos.

## Hecho

### Fase 1+2 · lecciones y contenido (2026-11-06)

- **Archivos** (`src/pages/batx1-zientziak-konikak/`): `lessons.tsx`, `lessonTexts.ts`, `lessonChecks.ts`, `content.ts`, `figures.tsx` (15 figuras propias + portada; usa `figureKit` y `figureColors` de Geometría), `index.tsx` (`KonikakBatx1zIntroPage`). Test `tests/konikak-batx1z-content.test.ts`.
- **Registro:** `courses.ts` `conicas` con `active: true`; ruta lazy `KonikakBatx1zPage` tras Geometría (`matematika/batx1-zientziak/conicas/*`); ruta añadida al final de `paths.ts`.
- **ids:** diagnóstico 107001–107008 (distancia, punto-recta, centro, completar cuadrado, suma 2a, eje vertical, asíntotas, foco). Práctica 1–20: −9, 8, 1/7, 17, 5, 10, 15, 6, 0,6, 12, 8, 6, 7, 1,25, 3, 6, 4,5, 10, −3, 4. Retos 101–115: 2, 4, 2 (Apolonio), −3, 3/4, 5, 6, 8, 0,6, 14, 8, 4, 4, 7, 40. Banco 1–50 en las 5 etapas.
- **«Por qué funciona»** en 5 lecciones: bisectrices (±), ecuación general (A = −2a), elementos de la elipse (a² = b² + c²), asíntotas, parábola (y² = 2px). Casos en `distance-loci`, `two-circles`, `parabola-positions` y `recognize-conic`.
- **Figuras:** planos con `oy={20}` y pie centrado debajo (con `oy={8}` la «y» del eje se cortaba arriba). En las notas de las figuras, el hueco entre fórmulas es un espacio largo (U+2003): el SVG junta los espacios normales.

## En curso

- Fase 1+2 hecha (commit en esta rama). Siguiente: fase 3, laboratorio: L1 «El jardinero», L2 «Foco y directriz», L3 «La excentricidad» (ids 107101–107399) y las prestadas de 4.º `circle` y `bisector`.
