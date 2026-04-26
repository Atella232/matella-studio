# Plantilla reusable de unidad

Esta plantilla sirve para crear nuevas unidades a partir de las dos unidades modelo actuales:

- Zatikiak DBH2: referencia de unidad completa, ejercicios ricos y experiencia final.
- Algebra DBH2: referencia de teoria data-driven y estructura consolidada.

## Decision base

- Idioma principal y fuente pedagogica: EU.
- Idiomas secundarios: ES y AR.
- Rutas canonicas: `teoria`, `laboratorio`, `retos`, `juegos`, `ejercicios`.
- Aliases historicos solo como compatibilidad temporal: `laborategia`, `misioa`, `jokuak`, `ariketak`.
- Formulas y etiquetas matematicas: siempre mediante `MathText`, tambien en labels, ayudas, tabs, botones y textos de laboratorio. Nunca escribir `$a$`, `$x$` o `$ax^2+bx+c=0$` como texto plano en JSX.
- Contenido grande: siempre fuera del JSX, en archivos de datos.

## Arbol recomendado

```text
src/pages/<course>-<unit>/
  HomePage/index.tsx
  TheoryPage/index.tsx
  TheoryPage/theoryData.ts
  LabPage/index.tsx
  LabPage/labData.ts
  MissionPage/index.tsx
  MissionPage/missionData.ts
  GamesPage/index.tsx
  GamesPage/gamesData.ts
  ExercisesPage/index.tsx
  ExercisesPage/ExercisesPage.css
  exercisesData.ts
  content.ts
```

Si una seccion es pequena puede empezar sin archivo `*Data.ts`, pero debe extraerse en cuanto tenga varias tarjetas, tablas, ejercicios o variantes por idioma.

## Responsabilidades por archivo

### `content.ts`

- Titulo, subtitulo y descripcion de la unidad.
- Textos de home y etiquetas compartidas.
- Normalizacion de idioma si la unidad necesita adaptadores propios.
- Reexportar o reutilizar tipos comunes de `src/features/units/unitTypes.ts`.

### `TheoryPage/index.tsx`

- Solo renderiza estructura: cabecera, tabs, tarjetas, tablas y bloques visuales.
- No contiene contenido pedagogico largo.
- Usa renderizadores genericos tipo `renderTheoryCard`, `renderTable`, `renderExample`.
- Puede mantener UI visual especifica si es realmente presentacional, por ejemplo un SVG explicativo.

### `TheoryPage/theoryData.ts`

- Tabs de teoria.
- Tarjetas, formulas, tablas y bloques explicativos.
- Textos localizados EU/ES/AR, con EU como referencia principal.
- Ejemplos paso a paso.

### `LabPage/index.tsx` y `labData.ts`

- El JSX conserva interaccion y estado.
- `labData.ts` guarda modos, parametros, formulas, etiquetas y explicaciones.
- El laboratorio debe conectar con al menos dos subtemas de teoria.
- Las etiquetas de inputs y descripciones con variables/formulas deben renderizarse con `MathText`, no como texto plano entre `$...$`.
- Evitar emojis como iconos principales de tabs/herramientas. Usar simbolos controlados por CSS, iconos de la libreria del proyecto o `MathText`, con color explicito para estados activo/hover.

### `MissionPage/index.tsx` y `missionData.ts`

- Retos ordenados por dificultad.
- Cada reto debe tener enunciado, respuesta esperada, pista y feedback.
- Las expresiones matematicas deben pasar por `MathText`.

### `GamesPage/index.tsx` y `gamesData.ts`

- Juegos simples, autocontenidos y conectados con la progresion.
- Si el juego crece, separar preguntas/reglas de la UI.
- Debe tener estado claro de acierto/error/progreso.
- Los botones de modo o cartas clicables deben tener fondo oscuro/tematico y estados `hover`/`active` visibles; evitar botones blancos o neutros que rompan el estilo de la unidad.
- Evitar emojis en iconos de modos de juego; pueden renderizarse con estilos de sistema inconsistentes. Preferir texto corto, simbolos matematicos controlados o iconos CSS/libreria.

### `ExercisesPage/index.tsx` y `exercisesData.ts`

- Ejercicios agrupados por subtema.
- Cada grupo debe ordenar ejercicios por dificultad: `easy`, `medium`, `hard`.
- Cada ejercicio debe tener solucion.
- La pagina debe permitir mostrar/ocultar soluciones.

## Orden recomendado para crear una unidad nueva

1. Crear `content.ts` con EU como fuente y estructura minima ES/AR.
2. Crear `HomePage` con enlaces canonicos.
3. Crear `TheoryPage` con `theoryData.ts`.
4. Crear `ExercisesPage` con subtemas y niveles.
5. Crear `MissionPage` usando los mismos subtemas.
6. Crear `LabPage` si hay una manipulacion visual clara.
7. Crear `GamesPage` o marcar juegos como pendiente claro.
8. Registrar rutas canonicas y aliases necesarios en router.
9. Revisar navegacion desde home y menu superior.
10. Ejecutar checklist de calidad.

## Criterios de unidad lista

- `npm run lint` OK.
- `npm run build` OK.
- Home, teoria, laboratorio, retos, juegos y ejercicios existen o tienen estado pendiente claro.
- Rutas canonicas funcionan.
- Home apunta solo a rutas canonicas.
- EU/ES/AR no muestran textos rotos ni mojibake visible.
- No hay dependencia nueva de `fixMaybeText`.
- Teoria, laboratorio, juegos y ejercicios no contienen formulas LaTeX visibles sin renderizar.
- Laboratorio y juegos no dependen de emojis para comunicar modos o herramientas.
- Ejercicios tienen solucion.
- Responsive revisado al menos en escritorio y movil.
- La checklist propia de la unidad queda creada en `docs/units/<course>-<unit>-checklist.md`.

## Minimo viable para expandir rapido

Para crear temas nuevos sin perder calidad, el minimo aceptable es:

- Home.
- Teoria data-driven.
- Ejercicios por subtema y dificultad.
- Retos basicos.
- Juegos o laboratorio en estado "proximamente" si todavia no aportan valor real.
- Checklist creada desde el primer dia.

Este minimo permite ampliar temario sin bloquearse, pero cada unidad debe volver al checklist antes de considerarse modelo.
