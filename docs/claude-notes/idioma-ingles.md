# Idioma inglés (en) en toda la web

Rama: `feat/idioma-ingles`. Sin publicar: no hay deploy ni push. Inglés británico.

## Qué se ha hecho

- El inglés es el cuarto idioma (eu, es, en, ar). Botón EN en la cabecera y en el selector de cada unidad.
- Textos: `src/i18n/locales/en.json` tiene todas las claves. Los textos de unidad son `{ eu, es, en, ar }`; `tsc` avisa si falta uno.
- Fórmulas: se escriben una vez (castellano) y `englishLatex` (`src/utils/latexLanguage.ts`) las convierte al mostrarlas: `0{,}5` pasa a `0.5`, y `\sen`/`\tg` pasan a `\sin`/`\tan`.
- Números: en inglés `0.5` y `15,000`. En eu, es y ar se mantiene la coma decimal y el punto de miles de la regla de cada unidad (ver «Pendiente»).
- Respuestas: en inglés, `englishDigits` quita las comas de miles antes de leer la respuesta (`src/utils/numberFormat.ts`). Las fracciones aceptan las dos comas.
- Marcador de la carrera: `englishNumberText` pasa `2,35` a `2.35` y `15.000` a `15,000` (`src/features/unit-v2/games/RaceGame.tsx`).
- Biosfera: `public/natura/bioaniztasuna/Bioaniztasuna_en.html`.
- Eliminada la página antigua de zatikiak sin ruta (`ExercisesPage`, `ExercisesPage.css`, `exerciseValidation.ts`). El dueño lo pidió.
- Traducción: lotes hechos por subagentes Haiku (los ficheros de trabajo están en el scratchpad, no en el repositorio). Después se aplicó con AST y un control de copia.
- Revisión de código: un agente por carpeta de unidad (10 agentes). Cada uno cambió solo su carpeta y revisó los idiomas en/es/ar.

## Decisiones

- Sin revisión por hablante nativo (decisión del dueño).
- Inglés británico (decisión del dueño).
- Antzekotasuna: los miles en es/eu se quedan con espacio («50 000»), porque el corrector de respuestas lo exige. Un punto daba respuesta incorrecta.
- Konbinatoria: los miles en SVG usan espacio en eu/es/ar (el texto pide escribir «40 320»).

## Pendiente (no hecho)

1. Lecturas directas de dinero en proporzionaltasuna 4.º (`percentBar.ts`, `ruleOfThree.ts`, `receipt.ts`, `roadGraph.ts`): una respuesta «30,000» en inglés se lee como 30 en la comprobación directa. El laboratorio con `LabKit` sí la convierte. Hace falta pasar el idioma.
2. Dinero sin agrupar en proporzionaltasuna 4.º (`money()` en `ProportionDbh4ApTools.tsx` y `ReceiptTool.tsx`): en inglés sale `12000.00`.
3. Miles mezclados en es/eu: los valores dinámicos llevan punto (`100.000 €`, `9.880`), pero muchos textos fijos llevan espacio (`42 000`, `22 000`). Hay que decidir una norma y aplicarla a toda la web.
4. Árabe: algún eje sale con un espacio extra (`0.00 052`), fallo antiguo.
5. Abreviaturas en inglés: `Dom` (dominio) en las gráficas de funciones, y `Me` para la mediana (en inglés suele ser `Md` o `M`). Decidir.
6. Moneda en inglés: `400 €` en vez de `€400` (proporzionaltasuna 2.º, `figures.tsx:338`).
7. `hundredthsText` (`dbh4-aplikatuak-areak/lab/labTools.ts`) escribe coma también en inglés.
8. Ejes de la biosfera y de `reals.ts`: `englishLatex` convierte `0.000\,123` en `0.000{,}123` (sale `0.000,123` en inglés).
9. La habilidad `matella-nueva-unidad` (fuera del repositorio) sigue diciendo que hay tres idiomas.

## Trucos

- `say(eu, es, ar, en)` y `text(eu, es, ar, en)`: el orden es ese.
- Dentro de `\text{}` de KaTeX no va árabe; las fórmulas en `say()` se escriben una vez.
- Marcadores de texto plano: `englishNumberText` (formato español → inglés). Para LaTeX: `englishLatex`.
- Si una respuesta se escribe con comas de miles en inglés, pásala por `englishDigits` antes del lector.
