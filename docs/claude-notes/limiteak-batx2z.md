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

Commit 7655b1e.

**Fase 4, juegos (8):**
- **Propios (3 + detective):**
  - J1 `winner` «¿Quién gana?» (`games/winner.ts`, ids 122501–122503): el límite en +∞ de un cociente; cada término es c·aˣ·xᵖ·(ln x)^q y el orden se decide por a, luego p, luego q. Se responde 0, un número o +∞. Nivel 1, un término arriba y otro abajo; nivel 2, sumas (solo el principal); nivel 3, trampas (x¹⁰ y 1,1ˣ, 2ˣ y 3ˣ, ln x⁵ y √x, e²ˣ y x³eˣ…).
  - J2 `assure` «¿Lo asegura el teorema?» (`games/assure.ts`, ids 122601–122603): función, intervalo y afirmación (raíz: Bolzano; valor k: valores intermedios; máximo y mínimo: Weierstrass). Respuestas: sí; no, no es continua (se mira primero); no, falla otra condición (mismo signo, k fuera, intervalo no cerrado). Nivel 3 con ln, √ e intervalos abiertos.
  - J3 `hunt` «Caza raíces» (`games/hunt.ts`, ids 122651–122653): marcar todos los [n, n + 1] de −3 a 3 con cambio de signo. Nivel 1, cúbica con un cambio; nivel 2, con tres; nivel 3, ecuaciones x⁴ + c = bx² y x³ = bx + c (h = f − g). Ningún valor entero es 0.
  - Detective `detective` (`games/detective.ts`, ids 122701–122703): δ = ε sin mirar la pendiente, la potencia gana a la exponencial, 1^∞ = 1, √x² = x con x → −∞; sen px / qx → 1/q, una sola unión para dos parámetros, «existe el límite» por continua, el extremo del dominio como discontinuidad; mismo signo «sin raíz», h = f − g con el signo mal, un valor fuera de f(a) y f(b), el máximo en el extremo de un intervalo abierto. Las líneas solo llevan fórmulas; `\sin` pasa por `localize`.
- **Carrera** (`games/race.ts`, ids 122401–122405): 15 tipos, tres por etapa; el test recalcula cada respuesta con `meta`.
- **Memoria** (`games/boards.ts`, ids 122801–122803): 1^∞ ↔ eᵃ (en un punto y en el infinito), límites en −∞ con raíces, cocientes en +∞. Sin senos: las cartas no se traducen y el castellano escribe sen.
- **De 1.º, con niveles y etapas de esta unidad:** «¿Indeterminación o no?» (`forms`, 122811–122813) y «¿Qué discontinuidad?» (`discontinuity`, 122821–122823).
- **Archivos:** `Bach2LimitsGames.tsx` (+ `.css`), `GameArt.tsx`, `RaceGame.tsx`, `info.ts`, `index.tsx`; test `tests/limiteak-batx2z-games.test.ts`.
- **Inventario:** OK. Propios de verdad: 3 juegos más el detective y 4 herramientas (el script cuenta también los prestados de 1.º).

Commit 592f76b.

## Trucos

- La revisión a 375 px se puede automatizar con un script en la consola del navegador: recorrer las lecciones por `location.hash`, pulsar «Ikusi urrats guztiak» y medir el ancho de la página, cada `.katex`, los `.katex-error`, el LaTeX sin dibujar y el `getBBox` de cada `<text>` de los dibujos. Con el panel oculto los temporizadores van lentos: lanzar el script sin esperar y guardar el resultado en `window`.
- Un paso con tres igualdades seguidas (`b=a+1 → … → a=5, b=6`) se encogía a 12 px: va en `\begin{gathered}`.
- A 375 px, una fórmula de solución o de «Otro ejemplo» de más de unos 260 px (medida con KaTeX a 22 px) pide desplazamiento lateral dentro de su caja: se parte en filas con `\begin{gathered}` (cada `\qquad` y cada `\ \to\ ` en su fila). Para medirlas todas de una vez, importar en la consola `/node_modules/katex/dist/katex.mjs` y el `content.ts` de la unidad (`?t=…`).
- La comprobación de desbordes tiene que mirar también el desplazamiento dentro de las cajas (`scrollWidth > clientWidth` con `overflow-x` distinto de `visible`), sin contar `.katex-mathml` ni la lista de tareas de la práctica, que se desplaza a propósito.

## Cierre (2026-11-10)

- **Comprobado:** 2718 tests, lint y build en verde; inventario OK.
- **Revisión a 375 px en eu, es y ar:** lecciones y resumen, diagnóstico, práctica, retos, banco, las 9 herramientas (antes y después de predecir) y los 6 juegos nuevos en sus tres niveles (respondiendo rondas): sin desbordes, sin errores de KaTeX ni LaTeX sin dibujar. Lo único que «se desplaza» es a propósito: el selector de herramientas, la lista de tareas de la práctica y un texto solo para lectores de pantalla de la carrera.
- **Hoja de euskera:** `limiteak-batx2z-euskera.html` en la carpeta de notas compartidas de la sesión principal, con `--herramientas epsilon,race,joints,theorem --juegos race,winner,assure,hunt,detective,memory`. Como en 1.º, no trae los retos fijos del laboratorio ni `content.ts`.
- **Fuera de la carpeta:** solo el registro (la fila de 2.º Ciencias de `courses.ts`, el router y `paths.ts`). No se ha tocado ninguna pieza de otra unidad.
- **Al fusionar:** `paths.ts` es una sola línea y las cinco sesiones de 2.º la tocan: hay que dejar todas las direcciones. Los enlaces «Antes de empezar» solo van a 1.º Bachillerato y a 4.º ESO.
- **Para 2.º Sociales:** quedan exportados `LimitPlot` y las figuras (`figures.tsx`), las cuatro herramientas (`lab/Bach2LimitsTools.tsx` y su lógica) y los tres juegos (`games/Bach2LimitsGames.tsx`).
- **Commits:** 74b593e (fases 1+2), 7655b1e (fase 3), 592f76b (fase 4) y el de esta nota, todos en `feat/limiteak-batx2z`.

## Publicación

- **Publicada el 2026-11-10** con los otros temas terminados de 2.º Ciencias, tras el «publica lo que ya esté hecho» del dueño: `main` 5e186b4, bundle `index-BiUKCFuE.js`. 2993 tests, lint y build en verde; revisada en matella.net a 375 px en eu, es y ar.
