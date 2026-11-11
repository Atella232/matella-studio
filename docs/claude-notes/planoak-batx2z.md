# Zuzenak eta planoak espazioan · 2.º Bachillerato Ciencias

Segunda unidad del bloque Espacio (reparto en paralelo de 2.º Ciencias, ver `bachillerato.md`): curso `batx2-zientziak`, tema `rectas-planos`.

- **Carpeta:** `src/pages/batx2-zientziak-planoak`
- **`storagePrefix`:** `matella-planoak-batx2z`
- **Rama:** `feat/planoak-batx2z`, cortada de `main` e4dc4f8 (que ya tiene Vectores en el espacio publicado, así que no hace falta la rama `feat/bektoreak-batx2z`)
- **Bloque de ids:** 120000–120999 (diagnóstico 120001–120008, laboratorio propio 120101–120399, juegos 120401–120899)
- **Servidor de pruebas:** puerto 5182 (`.claude/launch.json` propio, sin commit)

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U5 «Rectas y planos en el espacio» (solucionario, fórmulas como imagen) y Anaya Matemáticas II U5 «Puntos, rectas y planos en el espacio» (solucionario). Estilo de problemas: EBAU del País Vasco 2017–2022 (plano que contiene un punto y una recta, paramétricas desde implícitas, posiciones con parámetro, rectas que se cruzan). Del libro solo se saca el alcance; textos y ejercicios propios.
- **Corte con `bektoreak`:** punto medio, simétrico y alineados ya están en Vectores en el espacio (como Santillana). Los simétricos respecto de una recta o un plano son métricos: van a `distantziak`.
- **Lo que viene de 1.º:** formas de la recta en el plano (`batx1-zientziak-geometria`) y tipos de sistemas y discusión con parámetro (`batx1-zientziak-sistemas`), con «Antes de empezar». De 2.º: Vectores en el espacio (vectores y módulo, combinación lineal, producto vectorial, coplanarios, ángulo).
- **Álgebra de 2.º** (determinantes, rango, Rouché) va en paralelo y no está en la rama: el determinante se calcula con Sarrus dentro de las lecciones y el rango con `rank` de `vec3.ts`. Enlaces pendientes para la fusión (ver abajo).

## Diseño elegido

- 2026-11-11: el dueño eligió «Las recomendadas» (todo el menú): V1 (lecciones con el tablero 3D y «Antes de empezar» a 1.º y a Vectores en el espacio), V2 (lección propia «De implícitas a paramétricas»), L1 «El parámetro t», L2 «El plano y su normal», L3 «¿Se cortan o se cruzan?», L4 «La recta que atraviesa», L5 «Tres planos», J1 «Rectas gemelas en el espacio», J2 «Clasifica la pareja», J3 «El plano que falta», J4 detective, J5 carrera y memoria.
- **Palabras en euskera propuestas** (el dueño debe confirmarlas en la hoja): norabide-bektorea, ekuazio parametrikoak / jarraitua / inplizituak, bektore normala, ekuazio orokorra, zuzen ebakitzaileak / gurutzatuak / paraleloak / bat datozenak, plano-sorta, koefizienteen matrizea $M$ eta matrize zabaldua $M^*$. Árabe: متجه التوجيه، المعادلات الوسيطية / المتصلة / الديكارتية، المتجه الناظمي، مستقيمان متقاطعان / متخالفان / متوازيان / منطبقان، حزمة المستويات. Rango: $\operatorname{rg}$ como en `bektoreak`.

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** 15 en 5 etapas (`lines`, `planes`, `two-lines`, `line-plane`, `planes-position`): `line-parametric`, `line-continuous`, `implicit-to-parametric`; `plane-parametric`, `plane-general`, `plane-three-points`; `lines-parallel`, `lines-cross`, `lines-intersection`; `line-plane-position`, `line-plane-point`, `pencil-planes`; `two-planes`, `three-planes`, `planes-parameter`. Con las diez mejoras de la teoría (`lessonTexts.ts` y `lessonChecks.ts`; cinco «¿Por qué funciona?» en `implicit-to-parametric`, `plane-general`, `plane-three-points`, `lines-cross` y `three-planes`). Enlaces «Antes de empezar» a 1.º (Geometría analítica: vectorial y paramétricas, continua y general, posición de dos rectas, haz de rectas; Sistemas: tipos y discusión con parámetro) y a Vectores en el espacio (vectores y módulo, combinación lineal, producto vectorial, coplanarios, ángulo).
- **Dibujos (15 + portada),** con el tablero 3D del bloque (`../batx2-zientziak-bektoreak/space/`) en modo `swipe`, con los números de «Resolvamos». `SpaceFigure` acepta una vista inicial: el plano de normal (−1, 1, 2) de `plane-parametric` y `plane-general` se ve de canto desde la esquina de siempre y usa `{ azimuth: 62, elevation: 30 }`; las rectas de `lines-intersection`, `{ azimuth: 70, elevation: 22 }`.
- **Contenido:** diagnóstico 120001–120008, práctica 1–20, retos 101–115 y banco 1–50. Respuestas de un número (coordenada, coeficiente, parámetro, determinante o valor de t), leídas con `readVectorsAnswer` de 4.º.
- **Registro:** `courses.ts` (`rectas-planos` con `active: true`), router (`PlanoakBatx2zPage`) y `paths.ts`.
- **Test nuevo:** `tests/planoak-batx2z-content.test.ts` (copia del de `bektoreak`).
- **Comprobación:** 3016 tests, lint y build en verde.
- **Revisión a 375 px** en eu, es y ar: las 15 lecciones con todos los pasos abiertos; ninguna fórmula baja de 13 px ni se sale. Los 15 dibujos vistos en eu y algunos en ar.

## Trucos

- Los de `bektoreak` siguen valiendo: `${z}$` en euskera; `numbers()` lee `(1,1,0)` como «1,1» y «0», así que el ejemplo no puede repetir pares como `1,0` o `0,1` de «Resolvamos»; `\qquad` entre igualdades; fórmulas largas en dos filas con `gathered`.
- Una igualdad falsa a propósito (`4=5` para decir que no hay solución) la caza el test de contenido: escribir `4\neq 5`.
- Cada palabra del vocabulario tiene que salir en los textos de la lección (`producto escalar` en `line-plane-position`).
- El nombre de una recta en el tablero va al 86 % del tramo dibujado, hacia el final de su vector director: si cae encima de un punto, se dibuja la recta con el director cambiado de signo (la recta es la misma).
- Un punto justo en el borde de la caja (coordenada igual a `range`) queda fuera del plano dibujado (los planos se recortan a 0,92·`range`): subir `range`.

## Pendiente para la fusión

- Enlaces «Antes de empezar» a Determinantes y a Sistemas (Rouché) de 2.º (bloque Álgebra, no están en esta rama): en `lines-cross`, `three-planes` y `planes-parameter`. Ahora se usan Sarrus y los rangos dentro de la lección y se enlaza a Sistemas de 1.º.

## En curso

- Fase 1+2 terminada (commit de esta fase). Siguiente: fase 3, laboratorio (L1–L5, ids 120101–120399), después fase 4, juegos (J1–J5, ids 120401–120899) y el cierre (tests, lint, build, inventario, 375 px en eu/es/ar, hoja de euskera con `hoja-revision.mjs` en la carpeta de notas compartidas).
