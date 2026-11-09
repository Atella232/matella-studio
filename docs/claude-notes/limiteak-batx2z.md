# Limiteak eta jarraitutasuna · 2.º Bachillerato Ciencias

Primer tema del bloque Cálculo diferencial de 2.º Ciencias (reparto en paralelo del 2026-11-09): curso `batx2-zientziak`, tema `limites-continuidad`.

- **Carpeta:** `src/pages/batx2-zientziak-limiteak`
- **`storagePrefix`:** `matella-limiteak-batx2z`
- **Página:** `LimiteakBatx2zIntroPage`
- **Rama:** `feat/limiteak-batx2z`, cortada de `main` 2a27cff
- **Bloque de ids:** 122000–122999 (diagnóstico 122001–122008, laboratorio propio 1221xx–1223xx, juegos 122401–122899)
- **Servidor de pruebas:** puerto 5183 (`.claude/launch.json` sin commit, `matella-dev-5183`)

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U7 «Límites y continuidad» (solucionario) y Anaya Matemáticas II U7 «Límites de funciones. Continuidad». Exámenes de EBAU del País Vasco 2017–2022 (ordinaria y extraordinaria) solo para ver el estilo. Del libro solo se ha sacado el alcance; textos y ejercicios son propios.
- **Orden de Santillana:** límites en el infinito (con ε) → operaciones e indeterminaciones (∞/∞, ∞ − ∞, 1^∞) → límite en un punto, laterales, 0/0 y k/0 → continuidad y discontinuidades → Bolzano, valores intermedios (Darboux) y Weierstrass. De Anaya: la definición con ε y δ, la comparación de infinitos, sen x / x.
- **EBAU País Vasco:** ningún examen trae Bolzano, Rolle ni L'Hôpital; lo que se repite es continuidad y derivabilidad con parámetros, extremos, optimización y gráficas. Por eso hay muchos ejercicios de parámetros y los teoremas se trabajan por sus condiciones.
- **Reparto del bloque (decisión del dueño, «Las recomendadas», 2026-11-09):**
  - Límites: sin asíntotas (van en Representación) y sin L'Hôpital.
  - Derivadas: derivabilidad, regla de la cadena a fondo, derivación implícita y logarítmica.
  - Aplicaciones: L'Hôpital (como Santillana U9; Anaya lo pone en U7), Rolle, valor medio, crecimiento, extremos, curvatura y optimización.
  - Representación: asíntotas y ramas, gráfica completa.

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `review` | `review-point`, `review-infinity`, `review-continuity` |
| `definition` | `epsilon-delta`, `infinite-definitions`, `minus-infinity` |
| `notable` | `orders`, `one-infinity`, `sine-limit` |
| `continuity` | `interval`, `parameter`, `two-parameters` |
| `theorems` | `bolzano-equations`, `intermediate`, `weierstrass` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-09):**
- V: el reparto del bloque de arriba; L'Hôpital en Aplicaciones; el repaso de 1.º en una sola etapa de 3 lecciones; ε y δ con dibujo y números, sin demostraciones largas.
- Herramientas propias: L1 «Épsilon y delta», L2 «La carrera de infinitos», L4 «Ajusta a y b», L5 «El teorema justo».
- M: prestadas de 1.º la lupa del límite, el agujero del 0/0, gana el de mayor grado, Bolzano encierra la raíz y la máquina de e.
- Juegos propios: J1 «¿Quién gana?», J2 «¿Lo asegura el teorema?», J3 «Caza raíces», J5 detective de 2.º.
- J6 carrera y memoria; J7 de 1.º «¿Indeterminación o no?» y «¿Qué discontinuidad?».
- Fuera: L3 «sen x / x en la circunferencia» y J4 «Une con a y b».

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 con las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario, casos en `bolzano-equations` y 5 «¿Por qué funciona?» en `epsilon-delta`, `orders`, `one-infinity`, `sine-limit` y `bolzano-equations`; `lessonChecks.ts` con error típico y «Compruébalo»). Enlaces «Antes de empezar» a Limiteak, Funciones, Números reales, Sucesiones, Trigonometría y Aplicaciones de 1.º y a Sistemas de 4.º académicas.
- **Textos:** `say`/`same` y `plain`/`plainSame` de `../batx1-zientziak-funtzioak/text.ts`; `lessons.tsx` pasa `lessonTexts` y `lessonChecks` por `localizeNames` (sen en castellano).
- **Dibujos (`figures.tsx`):** `LimitPlot`, el plano de Limiteak 1.º con dos capas más (bandas horizontales y franjas verticales sombreadas para ε, δ y «a partir de K») y notas un 18 % más grandes. Con él, las 15 figuras y la portada `Bach2LimitsHeroArt`. Todo exportado para 2.º Sociales.
- **Contenido (`content.ts`):** diagnóstico 122001–122008; práctica 1–20 (4 por etapa); retos 101–115 (10/20/30 puntos); banco 1–50. Toda respuesta cerrada es un número: un límite, un δ o un K, la a de eᵃ, un parámetro, cuántas raíces asegura Bolzano o el menor entero del intervalo con raíz.
- **Registro:** `active: true` en la fila de 2.º Ciencias de `courses.ts`, ruta en `src/router/index.tsx` y la dirección en `src/features/unit-v2/paths.ts`.
- **Test:** `tests/limiteak-batx2z-content.test.ts` (copia del de 1.º; ahora lee también las filas de un bloque `gathered`).
- **Comprobación:** 2706 tests, lint y `tsc -b` en verde. Revisión a 375 px en eu, es y ar: las 15 lecciones y el resumen (con los pasos y los «¿Por qué funciona?» abiertos), el diagnóstico, la práctica (20, contestadas), los retos (15, contestados) y el banco (50, con las soluciones abiertas): sin desbordes, sin desplazamiento lateral, sin errores de KaTeX ni LaTeX sin dibujar, y sin textos fuera de los dibujos.

## Trucos

- La revisión a 375 px se puede automatizar con un script en la consola del navegador: recorrer las lecciones por `location.hash`, pulsar «Ikusi urrats guztiak» y medir el ancho de la página, cada `.katex`, los `.katex-error`, el LaTeX sin dibujar y el `getBBox` de cada `<text>` de los dibujos. Con el panel oculto los temporizadores van lentos: lanzar el script sin esperar y guardar el resultado en `window`.
- Un paso con tres igualdades seguidas (`b=a+1 → … → a=5, b=6`) se encogía a 12 px: va en `\begin{gathered}`.
- A 375 px, una fórmula de solución o de «Otro ejemplo» de más de unos 260 px (medida con KaTeX a 22 px) pide desplazamiento lateral dentro de su caja: se parte en filas con `\begin{gathered}` (cada `\qquad` y cada `\ \to\ ` en su fila). Para medirlas todas de una vez, importar en la consola `/node_modules/katex/dist/katex.mjs` y el `content.ts` de la unidad (`?t=…`).
- La comprobación de desbordes tiene que mirar también el desplazamiento dentro de las cajas (`scrollWidth > clientWidth` con `overflow-x` distinto de `visible`), sin contar `.katex-mathml` ni la lista de tareas de la práctica, que se desplaza a propósito.

## En curso

- Fase 1+2 terminada (commit de la fase).
- Siguiente: fase 3, laboratorio. Lógica ya escrita (sin commit): `lab/epsilon.ts` (L1) y `lab/infinities.ts` (L2). Faltan `lab/joints.ts` (L4, «Ajusta a y b»), `lab/theorems.ts` (L5, «El teorema justo»), los componentes, `labTools.ts`, `lab/index.tsx`, el registro en `index.tsx` y el test `tests/limiteak-batx2z-lab.test.ts`.
- Derivadas: propuesta enviada al dueño (`propuesta-deribatuak-batx2z.md` en la carpeta de notas compartidas); esperando respuesta.
