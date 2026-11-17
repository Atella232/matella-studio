# Limiteak eta jarraitutasuna · 1.º Bachillerato Ciencias Sociales

Tercer tema del bloque Funciones de 1.º Sociales: curso `batx1-gizarte`, tema `limites-continuidad`.

- **Carpeta:** `src/pages/batx1-gizarte-limiteak`
- **`storagePrefix`:** `matella-limiteak-batx1g`
- **Rama:** `feat/limiteak-batx1g`, cortada de `feat/esponentzialak-batx1g` (9ec4407)
- **Bloque de ids:** 135000–135999 (diagnóstico 135001–135008, laboratorio propio 1351xx–1353xx, juegos 135401–135899)
- **Puerto de pruebas:** 5192

## Fuentes

- Anaya, Matemáticas Aplicadas a las CCSS I, edición nueva (`Suma_Piezas`), U6 «Límites»: comportamiento en el infinito (x → +∞ y x → −∞: polinomios, cocientes por grados, exponenciales, raíces), comportamiento en un punto (límites laterales, infinitos, 0/0 simplificando), continuidad (tipos de discontinuidad, funciones a trozos con parámetros) y ramas infinitas y asíntotas (vertical, horizontal, oblicua, ramas parabólicas, posición). Problemas: un interés que tiende a un valor, una piscifactoría que se estabiliza, la arena de una playa a trozos. No trae Bolzano ni el número e.
- Del libro solo se saca el alcance; textos y ejercicios son propios.

## Diseño elegido (2026-11-17: «Las recomendadas»)

- V1 lecciones propias (15), A1 sin Bolzano ni el número e.
- Etapas: El infinito · Más límites en el infinito · En un punto · Continuidad · Asíntotas.
- L1 «A largo plazo», L2 «La tarifa que no salta» (propias); M: lupa, agujero 0/0 y carrera de grados de Ciencias.
- J1 «¿Y a la larga?», J2 «Empalma los trozos», J3 detective (propios); J4 carrera, memoria e indeterminaciones, asíntotas y discontinuidades de Ciencias.

## Fases 1–2: lecciones y contenido

- Etapas: `infinity`, `more-infinity`, `point`, `continuity`, `asymptotes`.
- Lecciones: long-run, poly-exp, degrees · minus-infinity, roots-infinity, long-models · one-sided, infinite, zero-zero · continuous, discontinuities, parameter · vertical-horizontal, oblique, branches.
- Figuras propias hechas con `PlotFigure` de Ciencias (`batx1-zientziak-limiteak/figures`); `discontinuities` usa `ContinuityFigure` de 4.º aplicadas.
- Diagnóstico 135001–135008; práctica 1–20; retos 101–115; banco 1–50. Los límites que valen ±∞ van como pregunta abierta.
- Test: `tests/limiteak-batx1g-content.test.ts`.
- Trucos: el «Compruébalo» con una sola fórmula en el enunciado y otra en la respuesta lo evalúa `lesson-checks` (una asíntota y = 4 frente a f(x) falla): añade una segunda fórmula al enunciado. Las figuras con `figureAfterSteps` solo aparecen tras pulsar los pasos: el barrido a 375 px pulsa `.lesson-steps-next-actions button`.

## Fase 3: laboratorio

- 5 herramientas. Propias: `long-run` «A largo plazo» (f(t) = (At + B)/(t + C): empieza en B/C y tiende a A; predicción: el largo plazo frente al comienzo; ▶ y tabla f(1)…f(1000); retos 135101–135105) y `tariff` «La tarifa que no salta» (p₁x hasta L y p₂x + k después; predicción: dónde empieza el segundo trozo frente a dónde acaba el primero; ▶; retos 135201–135205).
- Prestadas de Ciencias con sus ids: `degrees`, `lens`, `hole` (etapas y lecciones de esta unidad).
- Test: `tests/limiteak-batx1g-lab.test.ts`.
- Truco: una fila con cuatro fórmulas no cabe a 375 px; la tabla va en dos filas.

## En curso

- Fases 1–3 hechas. Siguiente: fase 4, juegos (J1 «¿Y a la larga?», J2 «Empalma los trozos», detective, carrera, memoria e indeterminaciones, asíntotas y discontinuidades de Ciencias).
