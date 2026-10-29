# Del error de clase a la web

Un error repetido en clase debería acabar siendo (1) una respuesta incorrecta tentadora en la carrera,
(2) una línea equivocada en el detective y (3) una frase en la lección. Los tres usan el **mismo código**.
Comprobado en el código el 2026-10-29. Modelo: `src/pages/dbh4-aplikatuak-proportzionaltasuna/games/`.

## 1 · Carrera (`games/race.ts`)

- Añade el código al tipo unión `XRaceError` (p. ej. `ProportionDbh2RaceError`: `'cross' | 'relation' | …`).
- Añade su explicación a `XRaceErrorTips` con `say(eu, es, ar)`. Euskera: ningún sufijo pegado a un número;
  árabe: sin `{,}` ni árabe dentro de `$…$` (`say` ya cambia `{,}` por `.`).
- En el generador de la pregunta, haz que una opción incorrecta salga **del error** (calcula el valor que
  daría un alumno con ese error) y márcala con `error: '<código>'`. `RaceOption` es
  `{ latex, correct, error }` (`src/features/unit-v2/games/raceCore.ts`).
- El test de la unidad exige que cada opción incorrecta tenga explicación (`ErrorTips[option.error]`), que
  ninguna incorrecta coincida con la respuesta y que las cuatro opciones sean distintas.

## 2 · Detective (`games/detective.ts`, si la unidad lo tiene)

- Añade el código a `XDetectiveError`, su nombre corto a `…ErrorNames` y su explicación a `…ErrorTips`.
- El caso se resuelve **dos veces con los mismos datos** (bien y con el error); la primera línea que
  difiere es la equivocada y las siguientes arrastran el fallo (`interface Mistake`, `SLIPS`).
- Los fallos deben ser los típicos de esa unidad; el detective no puede quedarse en fallos genéricos.

## 3 · Lección (`content.ts` / `lessons`)

- `errorByStage` (texto plano, sin LaTeX) y, si la unidad la tiene, la caja de «error típico» de la lección
  (opción V2 de las revisiones «lab plus»).

## Cómo hacerlo

No edites la web sin que el dueño lo pida. Presenta primero la lista (código, qué hace el alumno, dónde
encaja: carrera / detective / lección) y deja que elija. Cada pieza nueva lleva su test (modelo
`tests/proportzionaltasuna-dbh4ap-detective.test.ts`). Si el error pide un juego o herramienta nuevo
y no solo un distractor, entra por el menú L/J de `matella-nueva-unidad`.
