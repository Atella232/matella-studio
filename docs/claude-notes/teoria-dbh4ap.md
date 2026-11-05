# Teoría 4. DBH aplicadas: las mejoras de 2. DBH (2026-11-04 y 2026-11-05)

La sesión principal pidió llevar a las **137 lecciones** de las 9 unidades de 4. DBH aplicadas las mejoras de la teoría de 2. DBH (ver [teoria-dbh2](teoria-dbh2.md)). Rama `feat/teoria-dbh4ap`, un commit por unidad; **sin fusionar ni publicar** (lo hace la sesión principal).

## Qué lleva cada lección

- Los textos están en `lessonTexts.ts` de cada unidad, como datos (`say`/`same`): explicación, definiciones, casos, «Otro ejemplo», vocabulario y «¿Por qué funciona?». `lessons.tsx` se queda con el título, el objetivo, «Vamos a resolver», los pasos, la idea clave, los enlaces «Antes de empezar, repasa» (`needs`) y el dibujo, y lo junta todo: `baseTopics.map((topic) => ({ ...topic, ...xLessonTexts[id], ...xLessonChecks[id] }))`.
- `lessonChecks.ts` (nuevo en las 9): el error típico (`mistake`) y la pregunta «Compruébalo» (`check`) de cada lección, y el tipo `XTopicId` con los ids. En Proporcionalidad, los errores típicos que ya había se movieron aquí desde `lessonTexts.ts`.
- La explicación en castellano tiene como mucho 60 palabras; lo demás va a definiciones o casos.
- «Otro ejemplo» es un ejercicio con números propios (`examplePrompt`, `example`, `exampleAnswer`). Las lecciones de tipo «¿qué clase es?» contestan con palabras (`example: ''`).
- Cuando el dibujo enseña el «Vamos a resolver» ya resuelto, va después de los pasos (`figureAfterSteps`).

| Unidad | Carpeta | Lecciones | Commit | Repasa (`needs`) | ¿Por qué? | Dibujo tras los pasos |
|---|---|---|---|---|---|---|
| Números reales | `errealak` | 17 | 74f38ac9 | 6 | 5: powers, decimal-kinds, periodic-to-fraction, scientific-ops, radical-ops | 6: fraction-amount, fraction-ops, decimal-kinds, number-sets, rounding, roots |
| Proporcionalidad | `proportzionaltasuna` | 15 | 47fd1ed8 | 7 | 4: inverse-share, chained, compound-interest, motion | 0 |
| Polinomios | `polinomioak` | 15 | 3923e368 | 7 | 4: identities, remainder, roots, algebraic-fractions | 0 |
| Ecuaciones y sistemas | `ekuazioak` | 15 | c250af3f | 8 | 4: discriminant, factored, radical, equalization | 0 |
| Perímetros, áreas y volúmenes | `areak` | 15 | 9a917792 | 6 | 3: triangles, perimeters, pyramid-volume | 3: composite, pyramid-area, compound |
| Semejanza | `antzekotasuna` | 15 | 82173a8e | 5 | 3: criteria, area-ratio, mirror | 3: shadows, mirror, sight |
| Funciones | `funtzioak` | 15 | 223af38f | 7 | 3: what-is, rate, periodicity | 0 |
| Gráfica de una función | `grafikoa` | 15 | 7128be5e | 6 | 3: vertex, shifts, exponential | 1: line-equation |
| Estadística y probabilidad | `estatistika` | 15 | 9acebdf0 | 6 | 3: variance, laplace, compound | 12: todas menos sampling, charts y correlation |

En total: 58 lecciones con «Antes de empezar, repasa» (a 3. DBH o a unidades anteriores de 4. aplicadas, con el título copiado en los 4 idiomas), 32 «¿Por qué funciona?», 65 definiciones, 424 palabras de vocabulario y 25 dibujos tras los pasos.

## Arreglos de contenido

- Reales › Potencias: el «Vamos a resolver» medía 396 px a 375 px de ancho; ahora va en dos filas.
- Proporcionalidad: tres casos daban la respuesta de «Vamos a resolver». Ahora usan los 22 000 € del dibujo (reparto inverso), una rebaja del 30 % (índice de variación) y grifos de 6, 10 y 3 horas. Los miles del inglés van con coma (€1,000) y en árabe 24 000 y 25 000 llevan espacio no separable.
- Ecuaciones › Igualación y Reducción: la explicación usa el sistema del dibujo (2x + y = 7, x − y = 2).
- Gráfica › La ecuación de una recta: el dibujo enseñaba y = 2x + 1, la respuesta; ahora sale tras los pasos.
- Estadística › Tablas de contingencia: la explicación daba la respuesta del problema (300/1000 y 113/400); ahora habla de A y B. Coeficiente de variación: `2\,500` pasa a `2500` (las de 4 cifras van juntas), también en el enunciado inglés.
- Las fórmulas que a 375 px salían por debajo de 17 px se partieron en filas (`gathered`/`aligned`): Reales, Proporcionalidad, Polinomios, Ecuaciones, Áreas y Estadística (Percentiles y Desviación típica desde una tabla).

## Trucos

- Lo que miden los tests de los textos (`tests/lesson-texts.test.ts`, solo en unidades con `examplePrompt`):
  - Explicación ≤ 60 palabras en castellano (una fórmula cuenta como una palabra).
  - De 2 a 4 casos con título, de ≤ 30 palabras cada uno.
  - Como mucho 3 definiciones: término ≤ 5 palabras, significado ≤ 30.
  - `examplePrompt` ≤ 30 palabras en todos los idiomas.
- El ejemplo:
  - Comparte como mucho un número de 2 cifras con el problema, el error típico y la pregunta.
  - Su fórmula no puede estar ya en `lessons.tsx`.
  - Sus igualdades tienen que dar bien.
- Las fórmulas van iguales y en el mismo orden en los 4 idiomas, también dentro de las definiciones (en euskera el orden de la frase cambia, ojo).
- Vocabulario:
  - Cada palabra tiene que salir en la lección. En castellano cuentan las tildes («comprueba» no vale por «comprobar»).
  - En árabe se escribe el plural exacto (المربعات).
  - Una palabra que ya es término de una definición no puede ir en el vocabulario.
- `tests/lesson-checks.test.ts`: una pregunta con una sola fórmula se toma como una cuenta y se compara con la respuesta. Hay dos salidas:
  - dar los números con palabras;
  - escribir dos fórmulas o más.
- En las fórmulas compartidas, nada de palabras dentro de `\text{}`: el árabe no puede llevarlas. Usa letras (A, B) o saca la palabra de la fórmula.
- Cuidado al generar o retocar archivos con un script: nunca uses `String.replace(a, b)` si `b` lleva `$`, porque `` $` `` y `$'` pegan trozos del archivo. Usa `split(a).join(b)`.
- Navegador a 375 px desde un worktree con `node_modules` enlazado: Vite carga React dos veces y la página sale en blanco. Usa una configuración propia, solo local:
  - `cacheDir` dentro de una carpeta llamada `node_modules`;
  - `optimizeDeps.entries`;
  - `resolve.dedupe` de react, react-dom, react-router e i18next.
- Si el panel del navegador está oculto, la página frena los `setTimeout` (hasta uno por minuto). En los scripts de revisión, espera con `MessageChannel`.

## Comprobado

- `npm test` (1562/1562), `npm run lint` y `npm run build` en verde el 2026-11-05.
- Navegador a 375 px en eu, es y ar: 411 vistas (las 137 lecciones × 3 idiomas). En cada una:
  - se abren los pasos, las cajas «¿Por qué funciona?» y cada palabra del vocabulario;
  - se mira que nada se salga de la pantalla, que no haya errores de KaTeX y que ninguna fórmula se desplace;
  - se mide la letra del ejemplo y del «¿Por qué?».
- Resultado:
  - Se abrieron 1467 palabras del vocabulario, 96 cajas «¿Por qué funciona?» y 174 enlaces «Repasa».
  - Nada se sale de la pantalla, no hay errores de KaTeX ni en la consola, y ninguna fórmula se desplaza.
  - Las fórmulas del ejemplo y del «¿Por qué?» van a 17,1 px o más.
  - Todas las lecciones tienen su error típico y su «Compruébalo».

## Pendiente (fuera de este encargo)

- Sufijos del euskera pegados a números en `dbh4-aplikatuak-funtzioak/figures.tsx` (dibujos Tendency y Glucose) y en `dbh4-aplikatuak-proportzionaltasuna/content.ts`.
- Proporcionalidad: algunos dibujos vienen de 2. DBH y llevan otros números que la explicación de 4. aplicadas.
- Polinomios › Suma y resta: un paso se sale en euskera solo mientras carga la fuente.
- Publicar: la sesión principal fusiona en main y publica.
