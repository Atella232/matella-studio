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

### Fase 3 · laboratorio (2026-11-06)

- **Propias** (`lab/`): `gardener.ts` L1 «El jardinero» (focos (±c, 0) con c 0…4, cuerda 2a con a ≥ c + 1, P entero; predice PF + PF′ frente a 2a; ▶ dibuja con la cuerda; retos 107101–107105), `directrix.ts` L2 «Foco y directriz» (y² = 2px, p 1…6; predice PF frente a PH; ▶ construye la parábola punto a punto; retos 107201–107205), `eccentricity.ts` L3 «La excentricidad» (foco en el origen, r = 2 / (1 + e·cos θ), e de cuarto en cuarto hasta 2, θ cada 30°; predice elipse, parábola o hipérbola; retos 107301–107305). Pantallas en `ConicsTools.tsx`.
- **Prestadas de 4.º:** `bisector` (etapa loci) y `circle` (etapa circle), con sus retos e ids.
- Comparaciones exactas con enteros: b²x² + a²y² − a²b² (elipse) e y² − 2px (parábola); los tests comprueban que coinciden con las distancias en toda la pizarra. Test `tests/konikak-batx1z-lab.test.ts`.
- Pizarras de 14 casillas con `cell={22}`: con 24 la «x» del eje se salía 1 px. Las etiquetas de los focos van encima del eje para no tapar los números.

### Fase 4 · juegos (2026-11-06)

- **Propios** (`games/`): `conic.ts` J1 «¿Qué cónica es?» (primero el tipo, luego un elemento; niveles: en el origen, trasladadas, ecuación general; progreso 107501–107503), `antenna.ts` J3 «La antena» (y² = 2px → p/2; ancho y profundidad → p; sala elíptica → c; 107601–107603), `detective.ts` J4 (12 errores en 3 niveles; 107701–107703). Pantallas en `ConicsGames.tsx` (+ `ConicsGames.css`).
- **Carrera** `race.ts`: 5 circuitos × 3 tipos (107401–107405). **Memoria** `boards.ts`: centro, focos de la elipse, foco de la parábola (107801–107803).
- `conicLatex.ts` reúne la escritura común (cuadrados con el signo bien, polinomios, ternas pitagóricas de elipse e hipérbola).
- Juego por rondas en dos pasos: si falla el tipo de cónica, la ronda acaba (`onAnswer(false)`) y no se pregunta el elemento.
- A 375 px: la ecuación grande usa `font-size: clamp(17px, 5.2vw, 24px)` (si no, la general se partía) y las tarjetas de la memoria parten la ecuación en dos renglones con `gathered`.
- Test `tests/konikak-batx1z-games.test.ts` (comprueba con cuentas propias cada respuesta de la carrera, de la antena, de la memoria y el centro de las ecuaciones generales).

### Cierre (2026-11-06)

- `npm test` (todas), `npm run lint` y `npm run build` en verde; inventario OK (juegos propios: conic, antenna, más el detective; herramientas propias: gardener, eccentricity, directrix).
- Revisión a 375 px en eu, es y ar: lecciones con todos los pasos abiertos, figuras (sin textos fuera del dibujo), laboratorio, juegos, práctica, retos y banco con todas las soluciones abiertas. Sin desbordes, sin errores de KaTeX y sin fórmulas por debajo de 13 px.
- Para que nada se desplace de lado en el móvil: `rows()` en `content.ts` parte en renglones (`gathered`) las explicaciones y soluciones largas (en cada `\qquad`/`\quad`, y en las flechas de las líneas de más de 28 caracteres); tres explicaciones van partidas a mano en el signo igual; en las lecciones, seis ejemplos y cuatro pasos van en renglones. El test de contenido revisa cada renglón por separado.
- Fórmulas que solo salen al responder (corrección del detective, explicación de la antena y de «¿Qué cónica es?», solución de la carrera): medidas en una caja de 256 px; las del detective (4 errores) y la de la antena (nivel 2) van en renglones.
- Hoja de revisión del euskera: `konikak-batx1z-revision.html` en la carpeta compartida de la sesión (enviada al dueño).

## Publicación

- Pendiente: la publica la sesión principal. La rama `feat/konikak-batx1z` va encima de `feat/geometria-batx1z` (y esta, de `feat/bektoreak-batx1z`): fusionarla trae las tres unidades.
- Registro: `courses.ts` (`active: true` en la línea de `conicas`), `router/index.tsx` (una línea `lazy` tras la de Geometría y un bloque de ruta tras el de `geometria-analitica`) y `paths.ts` (ruta añadida al final de la línea única: choque trivial).
