# Arquitectura real de una unidad V2

Comprobada en el código el 2026-10-29. Si algo no coincide, manda el código.

## Carpeta de la unidad (`src/pages/<curso>-<unidad>/`)

```text
content.ts        diagnóstico, práctica guiada, retos, banco de ejercicios (ExerciseSection), textos de home
lessons.ts(x)     etapas y lecciones con ejemplos resueltos (+ stages del curso)
figures.tsx       figuras SVG de las lecciones (solo exporta componentes: exportar números rompe react-refresh)
answers.ts        lectura de respuestas (coma o punto, %, €, unidades); algunas unidades lo comparten
index.tsx         página de la unidad (storagePrefix, hero, secciones, progreso)
lab/              index.tsx (LabShell) · labTools.ts (ids, etapas, retos) · <Herramienta>.tsx + .ts de lógica pura
games/            index.tsx (GamesHub) · info.ts (GameInfo + progressId) · <Juego>.tsx + <juego>.ts · RaceGame ·
                  boards.ts (parejas) · GameArt.tsx (arte del hub) · <Juego>.css
```

Los tipos de texto están en `src/features/unit-v2/types.ts` (`LocalizedText`, `UnitLanguage` = eu/es/ar).

## Registro (qué más hay que tocar)

- `src/data/courses.ts`: la entrada del tema (`id`, nombres eu/es/ar, `active: true`).
- `src/router/index.tsx`: la ruta de la página de la unidad.
- Los tests viven en `tests/` con el patrón `<tema>-<curso>-content|lab|games.test.ts` (+ uno por herramienta o
  juego propio, p. ej. `tests/proportzionaltasuna-dbh4ap-tank.test.ts`).

## Motor compartido (`src/features/unit-v2/`)

- Laboratorio: `lab/LabShell.tsx` (selector y marco), `lab/LabKit.tsx` (`Stepper`, `Segmented`, `ToolFrame` —que incluye el panel de retos y acepta
  `extraChallenges`—, `ResultAnswer`), `lab/types.ts` (`LabToolInfo`, `LabToolProps`, `LabChallenge`,
  `LabExtraChallenge`, `LabChallengeMaker`).
- Juegos: `games/GamesHub.tsx` (hub y modos), `games/GameKit.tsx` (`GameTopbar`, `LevelPicker`,
  `ResultPanel`, `StarRow`, `Car`), `games/records.ts` (`GameInfo`, estrellas, `levelProgressIds`),
  `games/gameHooks.ts` (`useGameText`, `useGameRecords`, `localLatex`), `games/random.ts`
  (`createRandom`, `randomSeed`, `pick`, `shuffle`), `games/raceCore.ts` / `RaceGame.tsx` (carrera),
  `games/pairsMemory.ts` / `PairsMemoryGame.tsx` (parejas).
- Fracciones y exactitud: `math/fraction.ts`. Rutas de la unidad: `paths.ts`, `routing.ts`.

## Cómo se registra

**Juego propio:** `games/info.ts` (entrada `GameInfo` con `id`, título/tagline/skills eu-es-ar y niveles con
`progressId`; el tipo `XGameId` lista los ids) → componente en el mapa `components` de `games/index.tsx` →
`hubGames`. La lógica pura (rondas, soluciones, puntuación, estrellas) va en `<juego>.ts`; la interfaz en
`<Juego>.tsx` con su `.css`. Modelo: `games/tank.ts` + `TankGame.tsx` de la unidad de Proportzionaltasuna
4. DBH aplikatuak.

**Herramienta propia:** su `id` y etapa en `lab/labTools.ts` (tipo `XLabToolId`, `LabToolInfo` con
`lessonTopic`, `title`, `observe`), lógica pura y retos en `lab/<herramienta>.ts`, componente en
`toolComponents` de `lab/index.tsx`, que se pasa a `LabShell`.

## Ids de progreso

Cada unidad tiene un bloque de ids para diagnóstico (`4201–4208`), retos de laboratorio (`431xx…`), carrera
(`44101–44105`), memoria (`44201–44203`) y cada juego propio (`443xx`, `444xx`…). No hay un test global de
unicidad: busca el mayor `progressId` en uso y continúa por encima, y añade al test de contenido de la
unidad una comprobación de que los suyos no se repiten.

```bash
grep -rhoE "progressId: *[0-9]+" src/pages | grep -oE "[0-9]+" | sort -n | uniq | tail -3
```

El mayor a 2026-10-29 era 86203 (probabilidad 4. DBH académicas). Lee también la nota de la última unidad.

## Idiomas y respuestas

eu primero y siempre; es y ar con la misma estructura. Notación por idioma en
`.claude/skills/matella-marca/formatos.md` (sección «Idiomas»). Los enunciados en euskera no llevan sufijo
pegado a un número; si hay que declinar, `ren`, `rekin`… están en `src/pages/dbh2-zatigarritasuna/basque.ts`.
