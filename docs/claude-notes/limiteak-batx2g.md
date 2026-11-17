# Limiteak eta jarraitutasuna · 2.º Bachillerato Ciencias Sociales

Primer tema del bloque Análisis de 2.º Sociales (reparto en paralelo del 2026-11-17): curso `batx2-gizarte`, tema `limites-continuidad`.

- **Carpeta:** `src/pages/batx2-gizarte-limiteak`
- **`storagePrefix`:** `matella-limiteak-batx2g`
- **Rama:** `feat/limiteak-batx2g`, cortada de `main` 286824e
- **Bloque de ids:** 145000–145999 (diagnóstico 145001–145008, laboratorio propio 1451xx–1453xx, juegos 145401–145899)
- **Servidor de pruebas:** puerto 5202 (`.claude/launch.json` sin commit)

## Fuentes y alcance

- **Libros (solucionarios):** Santillana 2.º Bach Sociales U5 «Límites y continuidad» y Anaya Matemáticas Aplicadas a las CCSS II U5 «Límites de funciones. Continuidad». Solo se saca el alcance; textos y ejercicios son propios.
- **Lo que traen los dos:** idea gráfica de los límites (ramas), operaciones con ∞ e indeterminaciones, comparación de infinitos, límites en ±∞ de polinomios, cocientes y diferencias de raíces (conjugado), límite en un punto con laterales, k/0 y 0/0 (factorizar), continuidad, tipos de discontinuidad y funciones a trozos con parámetros.
- **Solo Santillana:** 1^∞ con la fórmula de e (Anaya solo lo nombra como indeterminación) y problemas de contexto: población a largo plazo, curva de aprendizaje, tarifas por tramos con saltos, ganancias a trozos.
- **Ninguno trae (comprobado también en las imágenes de Santillana):** Bolzano, Weierstrass, ε–δ, sen x / x ni L'Hôpital. Asíntotas solo de paso (van en Representación).

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `graph` | `branches`, `infinity-arithmetic`, `indeterminate` |
| `infinity` | `degrees`, `conjugate`, `number-e` |
| `point` | `one-sided`, `k-zero`, `zero-zero` |
| `continuity` | `continuous`, `discontinuities`, `parameter` |
| `context` | `long-run`, `brackets`, `fair-tariff` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-17):** V1 (15 lecciones con las diez mejoras), V2 (sin ε y δ, sen x / x, Bolzano ni Weierstrass; asíntotas en Representación), L1 coste medio, L2 tarifa por tramos, L3 interés cada vez más a menudo, M1 (lupa, agujero, mayor grado, une dos trozos de 1.º), M2 (ajusta a y b de 2.º Ciencias), M3 (¿indeterminación o no? y ¿qué discontinuidad? de 1.º), J1 ¿a largo plazo?, J2 cierra la tarifa, J4 detective, J5 carrera y memoria. Fuera: L4 población que se estabiliza y J3 ¿dónde salta la factura?

## Hecho

**Fases 1+2, lecciones y contenido (commit 8781969):**
- 15 lecciones con las diez mejoras (`lessonTexts.ts`: definiciones, «Otro ejemplo» con números propios, vocabulario, casos en `indeterminate`, `degrees` y `zero-zero`, «¿Por qué funciona?» en `degrees`, `conjugate`, `number-e` y `long-run`; `lessonChecks.ts`: error típico y «Compruébalo»). Enlaces «Antes de empezar» solo a Límites de 1.º Ciencias.
- Figuras (`figures.tsx`): 13 `LimitPlot` importados de `batx2-zientziak-limiteak/figures` (sin copiar) y la portada `Bach2gLimitsHeroArt`. Sin figura: `infinity-arithmetic` e `indeterminate`.
- Contenido (`content.ts`): diagnóstico 145001–145008; práctica 1–20; retos 101–115; banco 1–50. Respuestas cerradas: un límite, la a de eᵃ, cuántas formas o discontinuidades, un parámetro, el tamaño de un salto, un valor inicial o de largo plazo. Los límites infinitos van como ejercicios abiertos.
- Registro: `active: true` en la fila de 2.º Sociales de `courses.ts`, ruta en el router y dirección en `paths.ts`.
- Test `tests/limiteak-batx2g-content.test.ts` (copia adaptada del de 2.º Ciencias).

**Fase 3, laboratorio (8 herramientas):**
- Propias, con predicción, retos fijos, retos infinitos y ▶:
  - L1 `average-cost` «Coste medio a largo plazo» (`lab/averageCost.ts`, 145101–145105): panadería C = 600 + 2x (→ 2), app C = 5000 (→ 0), taller C = 400 + 10x + 0,05x² (→ +∞); x de 10 a 10 000 en escala de decenas. Predicción: tiende a 0, al coste por unidad o crece sin límite.
  - L2 `tariff` «La tarifa por tramos» (`lab/tariff.ts`, 145201–145205): agua (2x | 1,5x + k en 10), aparcamiento (3t | 2t + k en 2), luz (0,2x | 0,15x + k en 300); empiezan con salto hacia arriba, hacia abajo y sin salto. ▶ mueve un cliente por el límite del tramo.
  - L3 `compound` «Interés cada vez más a menudo» (`lab/compound.ts`, 145301–145305): 1000 (1 + r/n)ⁿ con r = 5 %, 10 %, 100 % y n de 1 a 8760; barras bajo la recta 1000 eʳ.
- Prestadas con sus retos e ids: `lens`, `degrees`, `hole` y `join` (1.º Ciencias) y `joints` (2.º Ciencias).
- Test `tests/limiteak-batx2g-lab.test.ts`.

**Fase 4, juegos (7):**
- Propios: J1 `long-run` «¿A largo plazo?» (`games/longRun.ts`, 145501–145503: modelos, coste medio, mezclados con eᵗ, 0,8ᵗ y raíces); J2 `close-tariff` «Cierra la tarifa» (`games/closeTariff.ts`, 145601–145603: la cuota k, el precio p, tres tramos con dos cuotas); detective `detective` (`games/detective.ts`, 145701–145703: ∞ − ∞ = 0, 1^∞ = 1, cociente al revés, signo en −∞; k/0 = 0, 0/0 «no existe», solo f(a), trozo equivocado; largo plazo en t = 0, coste fijo que no se reparte, salto = diferencia de precios, cuota sin el límite del tramo).
- Carrera (`games/race.ts`, 145401–145405, 15 tipos, tres por etapa; el test recalcula cada respuesta con `meta`) y memoria (`games/boards.ts`, 145801–145803).
- De 1.º, con niveles y etapas de esta unidad: `forms` (145811–145813) y `discontinuity` (145821–145823).
- Test `tests/limiteak-batx2g-games.test.ts`. Inventario: OK (4 juegos y 7 herramientas propias según el script).

## Trucos

- Las piezas de Ciencias se importan tal cual: `LimitPlot` para las figuras, y las herramientas y juegos prestados con sus ids (el progreso se guarda con el `storagePrefix` de esta unidad).
- Las tablas de las herramientas propias llevan los títulos de los ejes debajo de la cuadrícula: el `Board` mide 264 de alto para que quepan.

## En curso

- Fases 1–4 hechas y comprobadas (3275 tests, lint y build en verde; lecciones, laboratorio y juegos revisados a 375 px en eu, es y ar sin desbordes ni errores de KaTeX). **Siguiente paso:** propuestas de Derivadas, Aplicaciones, Representación e Integrales al dueño; luego cerrar esta nota.
