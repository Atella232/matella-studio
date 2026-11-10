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

Commit 74b593e.

**Fase 3, laboratorio (9 herramientas):**
- **Propias (4),** con predicción antes del dibujo, retos fijos y retos infinitos (`freshFrom`):
  - L1 `epsilon` «Épsilon y delta» (`lab/epsilon.ts`, ids 122101–122105): f₁ = 3x − 1, f₂ = x/2 + 1, f₃ = (x² − 1)/(x − 1) y f₄ = x²; ε de una lista (1; 0,5; 0,2; 0,1) y δ de otra (2 … 0,01). La parte de la curva sobre la franja se pinta verde si cabe en la banda y roja si no. Predicción: el mayor δ que sirve, ¿menor, igual o mayor que ε? (es ε entre la pendiente). ▶ abre la franja. Retos: el mayor δ de la lista para cada función.
  - L2 `race` «La carrera de infinitos» (`lab/infinities.ts`, ids 122201–122205): c·f arriba y g abajo entre ln x, √x, x, x², x³, x¹⁰, 1,1ˣ, 2ˣ y eˣ, en x = 10 … 10 000. Todo con log₁₀ (las cifras): barras y «≈ 10ᵐ». Predicción: el cociente va a 0, a un número o a ∞. ▶ hace crecer x. Trampa: x¹⁰ va delante de 1,1ˣ hasta x = 100.
  - L4 `joints` «Ajusta a y b» (`lab/joints.ts`, ids 122301–122305): tres funciones de tres trozos (soluciones (5, 6), (−1, 2) y (2, 3)); cada unión verde si se cierra. Predicción: si a sube, ¿b baja, se queda o sube para mantener cerrada la primera unión? (f₂, f₃ y f₁).
  - L5 `theorem` «El teorema justo» (`lab/theorems.ts`, ids 122351–122355): g₁ = x³ − 3x + 1, g₂ salto en 1, g₃ = 1/(x − 1), g₄ = x² − 2, intervalo [a, b] entero entre −2 y 2 y tres capas: Bolzano, valores intermedios (recta y = k, ▶ la desliza de f(a) a f(b)) y Weierstrass (intervalo cerrado o abierto). Predicción: sí lo asegura, no (no es continua) o no (falla la otra condición).
- **Prestadas de 1.º, con sus retos e ids:** la lupa (`review-continuity`), el agujero del 0/0 (`review-point`), gana el de mayor grado (`review-infinity`), la máquina de e (`one-infinity`) y Bolzano encierra la raíz (`bolzano-equations`).
- **Archivos:** `lab/Bach2LimitsTools.tsx` (copia `curvePath`, `Grid` y `useClip` de 1.º, que no los exporta), `labTools.ts`, `index.tsx`; test `tests/limiteak-batx2z-lab.test.ts` (además comprueba con muestreo que δ vale, que el orden de infinitos manda a la larga, que solo una pareja (a, b) cierra las dos uniones y que cuando un teorema dice «sí» lo prometido está).
- **Comprobación:** las 9 herramientas a 375 px en eu, es y ar, antes y después de predecir: sin desbordes, sin errores de KaTeX y sin textos fuera del tablero (el selector de herramientas se desliza a propósito).

## Trucos

- La revisión a 375 px se puede automatizar con un script en la consola del navegador: recorrer las lecciones por `location.hash`, pulsar «Ikusi urrats guztiak» y medir el ancho de la página, cada `.katex`, los `.katex-error`, el LaTeX sin dibujar y el `getBBox` de cada `<text>` de los dibujos. Con el panel oculto los temporizadores van lentos: lanzar el script sin esperar y guardar el resultado en `window`.
- Un paso con tres igualdades seguidas (`b=a+1 → … → a=5, b=6`) se encogía a 12 px: va en `\begin{gathered}`.
- A 375 px, una fórmula de solución o de «Otro ejemplo» de más de unos 260 px (medida con KaTeX a 22 px) pide desplazamiento lateral dentro de su caja: se parte en filas con `\begin{gathered}` (cada `\qquad` y cada `\ \to\ ` en su fila). Para medirlas todas de una vez, importar en la consola `/node_modules/katex/dist/katex.mjs` y el `content.ts` de la unidad (`?t=…`).
- La comprobación de desbordes tiene que mirar también el desplazamiento dentro de las cajas (`scrollWidth > clientWidth` con `overflow-x` distinto de `visible`), sin contar `.katex-mathml` ni la lista de tareas de la práctica, que se desplaza a propósito.

## En curso

- Fases 1+2 y 3 terminadas.
- Siguiente: fase 4, juegos. Propios: J1 «¿Quién gana?» (cociente de dos infinitos: 0, número o ∞), J2 «¿Lo asegura el teorema?» (sí y cuál, o qué condición falla), J3 «Caza raíces» (marcar todos los [n, n + 1] con raíz asegurada; nivel 3, cortes de dos curvas), J5 detective de 2.º. Después carrera y memoria, y de 1.º «¿Indeterminación o no?» (`forms`) y «¿Qué discontinuidad?» (`discontinuity`). Ids 122401–122899. Modelo: `games/` de `batx1-zientziak-limiteak`.
- Al cerrar: npm test, lint, build, inventario, revisión a 375 px, hoja de euskera con `hoja-revision.mjs --herramientas epsilon,race,joints,theorem --juegos …`.
- Derivadas: propuesta enviada al dueño (`propuesta-deribatuak-batx2z.md` en la carpeta de notas compartidas); esperando respuesta.
