# Modelo común de unidad

Zatikiak DBH2 queda como unidad de referencia. A partir de ella, una unidad completa debe tener la misma superficie funcional y pedagógica.

## Rutas canónicas

- `/{subject}/{course}/{unit}`: home de unidad.
- `/{subject}/{course}/{unit}/teoria`: teoría.
- `/{subject}/{course}/{unit}/laboratorio`: laboratorio.
- `/{subject}/{course}/{unit}/retos`: retos o misiones.
- `/{subject}/{course}/{unit}/juegos`: juegos.
- `/{subject}/{course}/{unit}/ejercicios`: ejercicios.

Aliases heredados permitidos solo como compatibilidad temporal:

- `laborategia` -> `laboratorio`
- `misioa` -> `retos`
- `jokuak` -> `juegos`
- `ariketak` -> `ejercicios`

## Archivos recomendados

```text
src/pages/<course>-<unit>/
  HomePage/index.tsx
  TheoryPage/index.tsx
  LabPage/index.tsx
  MissionPage/index.tsx
  GamesPage/index.tsx
  ExercisesPage/index.tsx
  content.ts
  theoryData.ts
  labData.ts
  missionData.ts
  gamesData.ts
  exercisesData.ts
```

No todos los archivos son obligatorios desde el primer día, pero el contenido pedagógico debe salir del JSX cuando empiece a crecer.

## Tipos compartidos

La base común vive en `src/features/units/unitTypes.ts`:

- `UnitLanguage`
- `LocalizedText`
- `UnitRouteSet`
- `UnitHomeData`
- `UnitFeature`
- `UnitQualityStatus`

Las unidades pueden extender estos tipos con estructuras propias, pero no deberían redefinir `LocalizedText` ni la normalización de idioma.

## Criterios de consolidación

- La navegación nueva apunta solo a rutas canónicas.
- Los aliases antiguos siguen en router mientras haya enlaces externos o históricos.
- Los textos nuevos entran limpios, sin depender de `fixMaybeText`.
- La unidad supera la checklist de `docs/unit-quality-checklist.md`.
- Teoría, laboratorio, retos, juegos y ejercicios comparten vocabulario y progresión.

## Plantilla operativa

Para crear nuevas unidades, usar `docs/unit-reusable-template.md` como plantilla de trabajo.

Resumen de decisiones:

- EU es el idioma principal y fuente del contenido pedagógico.
- ES y AR son idiomas secundarios activos desde el inicio, no añadidos finales.
- Zatikiak DBH2 y Algebra DBH2 son las dos unidades modelo actuales.
- El JSX debe renderizar estructura e interacción; los datos pedagógicos grandes viven en archivos `*Data.ts`.
