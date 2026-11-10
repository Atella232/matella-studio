# Integral mugatua · 2.º Bachillerato Ciencias

Segundo tema del bloque Integrales de 2.º Ciencias (reparto en paralelo, ver `bachillerato.md`): curso `batx2-zientziak`, tema `integral-definida`.

- **Carpeta:** `src/pages/batx2-zientziak-mugatua`
- **`storagePrefix`:** `matella-mugatua-batx2z`
- **Rama:** `feat/mugatua-batx2z`, cortada de `feat/mugagabeak-batx2z` eeb3922
- **Puerto de pruebas:** 5184 (`.claude/launch.json` propio, sin commit)
- **Bloque de ids:** 127000–127999 (diagnóstico 127001–127008, laboratorio propio 1271xx–1273xx, juegos 127401–127899)

## Fuentes y alcance

- **Fuentes:** Santillana 2.º Bach Ciencias U12 + Anaya Matemáticas II U12 + exámenes de EBAU del País Vasco 2017–2022 (solo para ver el estilo). Del libro solo se saca el alcance; textos y ejercicios son propios.
- **Ya en 1.º** (`batx1-zientziak-integralak`): rectángulos, Barrow, propiedades, áreas bajo una curva, con signo y entre dos curvas (repaso con «Antes de empezar»).
- **Nuevo de 2.º:** sumas inferior y superior, la integral como límite, el teorema del valor medio, la función integral y el teorema fundamental, Barrow con sus condiciones, cambio de variable y partes en una definida, áreas con varios cortes y de tres curvas, problemas con parámetro. Los volúmenes de revolución solo salen en Anaya.
- **Elección del dueño (2026-11-10):** «Las recomendadas»: repaso de 1.º en 2 lecciones, volúmenes como lección corta al final, límite de sumas con Σi y Σi², valor medio con lección propia; laboratorio L1 «Encaja el área», L2 «El rectángulo del valor medio», L3 «Parte el recinto» + prestadas «La función área» y «Área con signo» de 1.º; juegos J1 «¿Vale Barrow?», J2 «Cambia los límites», J3 «Deriva la función integral», J5 detective solo con errores de 2.º, J6 carrera y memoria. Fuera: L4 (discos), L5 y J4.
- **Reutiliza de `mugagabeak`:** `plot.tsx` (`AreaPlot`, `F`, `Up`, `Back`, `ArrowHead`) y `figureKit.ts` (colores, `say`, `decimal`), y las lecciones de partes y cambio de variable para «Antes de empezar».

## Fase 1+2: lecciones y contenido (hecho)

- **Etapas (5) y lecciones (15):** `review` (azul) «Repaso de 1.º»: `barrow-review`, `areas-review` · `sums` (violeta): `lower-upper`, `limit-sums`, `mean-value` · `fundamental` (mostaza): `area-function`, `upper-limit`, `barrow-conditions` · `techniques` (coral): `definite-change`, `definite-parts`, `piecewise` · `problems` (verde): `three-curves`, `parameter`, `integral-extrema`, `revolution`.
- **«Antes de empezar»:** 1.º `integrales` (barrow, properties, area-sign, between-curves, rectangles), 1.º `derivadas` (chain), 1.º `aplicaciones-derivada` (singular-points) y 2.º `integrales-indefinidas` (change, by-parts). Escritas con la dirección literal (no con constantes) para que `lesson-needs.test.ts` las compruebe.
- **Diez mejoras:** `lessonTexts.ts` (definiciones, vocabulario, explicación ≤ 60 palabras, ejemplo con números propios, casos en `limit-sums`, `barrow-conditions` e `integral-extrema`, «¿Por qué funciona?» en 8 lecciones) y `lessonChecks.ts` (error típico + «Compruébalo» con dos fórmulas en el enunciado).
- **Contenido (`content.ts`):** diagnóstico 127001–127008, práctica 1–20 (4 por etapa), retos 101–115 (3 por etapa), banco 1–50 (10 por etapa). Las respuestas cerradas son racionales (integral, área, suma, valor medio, F′(a), parámetro, la a de aπ o de ln a); lo que da e, ln o π va en preguntas abiertas.
- **Test:** `tests/mugatua-batx2z-content.test.ts` (copia del de `mugagabeak`) y, además, cada respuesta cerrada se vuelve a calcular desde el enunciado: la integral por Simpson, F′(a) derivando numéricamente la función integral, los extremos buscando el mínimo o máximo de F.
- **Registro:** `courses.ts` (`active: true` en `integral-definida`), router (después de Integral mugagabeak) y `paths.ts`.
- **Revisión a 375 px:** las 15 lecciones con todos los pasos abiertos y «¿Por qué?» en eu, es y ar (sin desbordes, sin fórmulas encogidas, sin errores de KaTeX, ningún texto fuera de los dibujos), los 15 dibujos mirados en grande en árabe, y el banco con las 50 soluciones abiertas en ar y eu. Las fórmulas de práctica, retos y diagnóstico medidas fuera de la página.

## Trucos

- **Árabe dentro de un dibujo:** Chrome no respeta los aislantes LRI/PDI dentro de `<text>` de SVG, así que «x = 0» o «π r² dx» dentro de una frase árabe salen desordenados. En los dibujos, la frase va sola en una línea y la fórmula en otra (con `F`). Una letra suelta (x, f) sí sale bien. Esto pasa con el `Label` compartido en todo el sitio (pendiente para el dueño, no es pieza de esta unidad).
- **SVG junta los espacios:** «u = x      dv = …» sale con un solo espacio; separa con «;».
- **Revisar lecciones:** los pasos se abren uno a uno («Ikusi 2. urratsa») y el dibujo con `figureAfterSteps` solo aparece al final; hay que pulsar todos antes de medir.
- **Banco:** para ver la solución hay que escribir algo antes; el tema se elige en `#fraction-v2-bank-section` (un `<select>`).

## En curso

- Fase 1+2 terminada (commit con esta nota). Siguiente paso: fase 3, el laboratorio (L1, L2, L3 propios con ids 1271xx–1273xx y las dos herramientas prestadas de 1.º).
