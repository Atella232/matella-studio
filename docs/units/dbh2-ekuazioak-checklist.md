# Checklist real: Ekuazioak DBH2

Fecha de creación: 2026-04-26

Estado general: unidad nueva creada a partir de la plantilla reusable. Sirve como prueba de expansión tras Zatikiak DBH2 y Algebra DBH2.

## Estado técnico

- [x] `npm run lint` pasa sin errores.
- [x] `npm run build` pasa sin errores.
- [x] Rutas hash compatibles con GitHub Pages.
- [x] Rutas canónicas añadidas: `teoria`, `laboratorio`, `retos`, `juegos`, `ejercicios`.
- [x] Tema activo en DBH2 con slug canónico `ekuazioak`.
- [x] Sin dependencia nueva de `fixMaybeText`.

## Estructura de unidad

- [x] Home disponible.
- [x] Teoría disponible.
- [x] Laboratorio disponible.
- [x] Retos disponibles.
- [x] Juegos disponibles.
- [x] Ejercicios disponibles.
- [x] Teoría extraída a `TheoryPage/theoryData.ts`.
- [x] Ejercicios extraídos a `exercisesData.ts`.

## Idiomas

- [x] EU como idioma principal.
- [x] ES como idioma secundario.
- [x] AR como idioma secundario.
- [x] Fórmulas renderizadas con `MathText`.
- [ ] Revisión lingüística humana pendiente para matices de EU/AR.

## Pedagogía

- [x] Progresión clara: significado, elementos, equivalencia, primer grado, paréntesis/denominadores, problemas y segundo grado.
- [x] 56 ejercicios propios organizados por subtema y dificultad.
- [x] Retos conectados con teoría y laboratorio.
- [x] Juegos tipo quiz por modo.
- [x] Laboratorio con balanza, resolutor de primer grado y discriminante.

## QA pendiente

- [ ] Revisión responsive móvil/escritorio con capturas.
- [ ] Revisión manual de todos los flujos internos.
- [ ] Revisar foco/contraste final en botones, tabs y tarjetas.
- [ ] Validar visualmente que no queda LaTeX sin renderizar en las cinco rutas.
