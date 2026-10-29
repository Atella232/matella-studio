# De dónde sacar los ejercicios

## De la propia web (lo más rápido, y es contenido original)

`src/pages/<curso>-<unidad>/content.ts` guarda el banco de ejercicios (tipo `ExerciseSection`, p. ej.
`equationsExerciseBank`), la práctica guiada y el diagnóstico; `lessons.ts(x)` tiene los ejemplos
resueltos, y algunas unidades `bankAnswers.ts`. Todo va por idioma (tipos en
`src/features/unit-v2/types.ts`). Lee la nota de la unidad en `docs/claude-notes/` para saber los ids y qué
se reutiliza; los nombres de archivo varían entre unidades, así que comprueba con `ls` antes. Los textos
vienen con `MathText`/KaTeX: copia las fórmulas tal cual dentro de `\( \)`. Recuerda que `MathText`
convierte `:` en ÷, así que para dividir en LaTeX se escribe `\div`.

## De documentos del dueño (.docx, .pdf)

El dueño suele dar exámenes y planes de clase sueltos en `~/Downloads`. Trátalos como **entrada**, no como
algo que se copia: cuenta qué tipos de ejercicio hay y crea variantes nuevas.

- `.docx`: la matemática está en OMML. `unzip -p fichero.docx word/document.xml` y lee `<m:...>`
  (fracciones `m:f`, subíndices `m:sSub`, raíces `m:rad`). Las figuras están en `word/media/`.
- `.pdf`: texto con PDFKit (`page.string`; en este Mac no hay poppler) y figuras renderizando la página con
  `scripts/preview-pages.swift`. Mira siempre la página como imagen: el texto extraído pierde las fracciones.
- No copies a la skill ni al repositorio nombres, firmas de pie de página ni datos del alumnado que
  aparezcan en estos archivos.

## Figuras

Dibuja con SVG en línea (colores de etapa y tinta, trazo 1,5–2 px). Para gráficas de funciones o
geometría reutiliza la idea de las figuras de la web (`src/pages/dbh4-akademikoak-areak` etc.), pero
revisa cómo salen en papel: el trazo claro desaparece al fotocopiar en blanco y negro. Si el material se
va a fotocopiar, comprueba que se entiende sin color (formas y etiquetas, no solo tono).
