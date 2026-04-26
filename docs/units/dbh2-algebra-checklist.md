# Checklist real: Algebra DBH2

Fecha de revisión: 2026-04-26

Estado general: unidad consolidada como segunda unidad modelo junto a Zatikiak DBH2. Quedan mejoras finas de QA visual/accesibilidad, pero no bloquean empezar a construir nuevas unidades con este patrón.

## Estado técnico

- [x] `npm run lint` pasa sin errores.
- [x] `npm run build` pasa sin errores.
- [x] Rutas hash compatibles con GitHub Pages.
- [x] Rutas canónicas añadidas: `teoria`, `laboratorio`, `retos`, `juegos`, `ejercicios`.
- [x] Aliases heredados conservados: `laborategia`, `misioa`, `jokuak`, `ariketak`.
- [x] Sin dependencia directa de `fixMaybeText`/`fixMojibake` dentro de `dbh2-algebra`.
- [x] Imports/tipos revisados tras la extracción grande de teoría.

## Estructura de unidad

- [x] Home disponible.
- [x] Teoría disponible.
- [x] Laboratorio disponible.
- [x] Retos disponibles.
- [x] Juegos disponibles.
- [x] Ejercicios disponibles.
- [x] Ejercicios organizados por bloques y dificultad.
- [x] Teoría extraída a `TheoryPage/theoryData.ts` y renderizada desde una vista plantilla.
- [ ] Laboratorio pendiente de evaluar si conviene separar configuración/datos de UI. No bloquea la unidad modelo.

## Idiomas

- [x] ES activo.
- [x] EU activo.
- [x] AR activo.
- [x] Correcciones aplicadas en ejercicios: textos EU/AR sin restos evidentes de castellano.
- [x] Fórmulas renderizadas en ejercicios.
- [x] Fórmulas renderizadas en retos.
- [ ] Revisión lingüística humana pendiente para matices de EU/AR.
- [ ] Detectar automáticamente restos de castellano en EU/AR como parte de una futura tarea de calidad. No bloquea expansión.

## Rutas y navegación

- [x] Navegación principal apunta a rutas canónicas.
- [x] Sección activa compatible con aliases heredados.
- [x] Home apunta a `laboratorio`, `retos`, `juegos`, `ejercicios`.
- [x] Rutas principales y aliases contrastados en router.
- [x] Enlaces de home contrastados contra rutas canónicas.
- [ ] Revisión manual profunda de todos los flujos internos desde juegos y subpantallas.

## UX y accesibilidad básica

- [x] Fórmulas con `MathText` en teoría, retos y ejercicios.
- [x] Botones principales con texto visible.
- [x] Estados de feedback en retos.
- [ ] Revisión responsive móvil/escritorio con capturas. Pendiente por falta de Playwright/npx disponible en el entorno actual.
- [ ] Revisión de foco visible en cards, tabs, botones e inputs.
- [x] Botones inspeccionados: no hay botones solo-icono en las pantallas principales de Álgebra DBH2.
- [ ] Revisar contraste final en badges y cajas de feedback.

## Pedagogía

- [x] Progresión clara: lenguaje algebraico, monomios, operaciones, polinomios, productos notables y factor común.
- [x] Retos conectados con teoría y laboratorio.
- [x] Ejercicios con soluciones.
- [x] Niveles `easy`, `medium`, `hard` en ejercicios.
- [x] Coherencia general entre teoría, retos y ejercicios revisada a nivel de progresión.
- [ ] Añadir más ejercicios contextualizados si se quiere igualar la riqueza de Zatikiak DBH2.

## Próximas acciones recomendadas

1. Usar Álgebra DBH2 como "unidad modelo 2" junto a Zatikiak DBH2.
2. Aplicar la plantilla de `docs/unit-reusable-template.md` a la siguiente unidad nueva.
3. Hacer revisión responsive con navegador en `/teoria`, `/laboratorio`, `/retos`, `/juegos`, `/ejercicios`.
4. Revisar foco/contraste en tabs, inputs de retos, cards clicables y botones.
5. Extraer datos del laboratorio si empieza a crecer o si se reutiliza en otra unidad.
