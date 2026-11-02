# Idioma inglés (en) en toda la web

Publicada en matella.net el 2026-10-30: commit `df11157` en `main` (avance rápido desde `feat/idioma-ingles`) y desplegada con `npm run deploy`. Inglés británico.

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

## Pendiente

Resuelto el 2026-11-02 (rama `feat/eso-polish`, publicada el mismo día: main 2cc3d60, bundle `index-BZ690MU_.js`, comprobado en vivo a 375 px en eu, es, en y ar):
1. ~~Lecturas directas de dinero en proporzionaltasuna 4.º~~ (2026-10-30).
2. ~~Dinero sin agrupar en inglés~~: `money()` y el recibo usan `groupDigits` (12,000.00).
3. ~~Miles mezclados en es/eu~~: el dueño eligió la norma RAE (espacio desde 5 cifras, 4 cifras juntas). `groupDigits`/`groupLatex` en `numberFormat.ts`; los textos se reescribieron por llamada desde el castellano; las respuestas valen con espacio, punto o sin separar (`checkAnswer`).
4. ~~Árabe `0.00 052`~~: `RealsTools` agrupa solo la parte entera.
5. Abreviaturas: la mediana es `Med` en inglés (`englishLatex` cambia `\text{Me}`); `Dom` se queda (también se usa en inglés).
6. ~~Moneda en inglés~~: €400 en el dibujo de interés y «€31» en los textos ingleses (los resultados de una cuenta, «… = 72 €», siguen con el signo detrás).
7. `hundredthsText`: ya se mostraba con `plain()` según el idioma; no hacía falta tocarlo.
8. ~~`englishLatex` con grupos de decimales~~: los espacios finos de la parte decimal se quedan (0.000\,072).
9. ~~La habilidad `matella-nueva-unidad` decía tres idiomas~~: ahora dice cuatro.

## Trucos

- `say(eu, es, ar, en)` y `text(eu, es, ar, en)`: el orden es ese.
- Dentro de `\text{}` de KaTeX no va árabe; las fórmulas en `say()` se escriben una vez.
- Marcadores de texto plano: `englishNumberText` (formato español → inglés). Para LaTeX: `englishLatex`.
- Si una respuesta se escribe con comas de miles en inglés, pásala por `englishDigits` antes del lector.

## Publicación (2026-10-30)

- Comprobaciones antes de publicar: tests 917/917, lint y build en verde; inventario de juegos y laboratorios sin cambios (31 de 45 unidades ya no tenían juegos ni herramientas propias antes de este cambio: pendiente, no lo toca esta publicación).
- Publicado: `df11157` en `main`, subido a `origin/main`, y `npm run deploy` a `gh-pages` (commit `759ac52a`). El bundle en vivo es `index-DVSmNaRZ.js` con `index-wVUHXYHz.css`.
- Comprobado en vivo a 375 px en eu, es, en y ar: el selector de idioma cabe, no hay desborde horizontal y la sección de laboratorio abre en los cuatro.
- Incidencia tras el despliegue: durante unos minutos un fragmento de carga diferida respondió 503 en matella.net. La pestaña guarda ese fallo hasta que se recarga la página entera; recargando, todo carga bien.
