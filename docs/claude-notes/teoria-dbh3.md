# Teoría 3. DBH: las mejoras de 2. DBH en las 10 unidades (2026-11-04/05)

Se llevaron a las 150 lecciones de 3. DBH las mejoras de la teoría de 2. DBH (ver `teoria-dbh2.md`): textos en archivo propio, explicaciones cortas, «Otro ejemplo», «Error típico» y «Compruébalo», «Antes de empezar, repasa…», vocabulario en 4 idiomas, «¿Por qué funciona?» y dibujos tras los pasos. No se tocó el motor (`src/features/unit-v2/`): todo eso ya existía. Rama `claude/teoria-dbh3-46f5a5`, un commit por unidad; **sin fusionar ni publicar** (lo hará la sesión que la pidió, con el visto bueno del dueño).

## Qué tiene ahora cada lección

- `src/pages/dbh3-<unidad>/lessonTexts.ts` (sin JSX): definiciones, vocabulario, explicación, casos, ejemplo como ejercicio (`examplePrompt`, `example`, `exampleAnswer`) y, en algunas, `why`. `lessons.tsx` se queda con títulos, objetivos, «Vamos a resolver», pasos, ideas clave y dibujos (`Omit<UnitTopic, 'explanation' | 'example'>[]`) y lo mezcla todo con `baseTopics.map(...)`.
- `src/pages/dbh3-<unidad>/lessonChecks.ts`: el error típico y la pregunta «Compruébalo» de las 15 lecciones. Las unidades que ya tenían error típico lo conservan (alguno corregido, ver abajo); Racionales y Potencias no tenían ninguno: 30 nuevos.
- Explicación de 50 palabras como mucho en castellano; lo que eran «si… / si…» va a tarjetas (`cases`, 31 lecciones); definiciones solo para palabras nuevas (65 lecciones).
- Vocabulario de 2 a 5 palabras en las 150 lecciones (533 palabras).
- «¿Por qué funciona?» en 35 lecciones (3 o 4 por unidad) y 78 enlaces «Antes de empezar, repasa…», a 2. DBH o a una unidad anterior de 3. DBH, solo cuando el texto usa esa idea.
- `figureAfterSteps` en 5 lecciones cuyo dibujo es el ejercicio resuelto: Ecuaciones › equation-problems (edades, x = 10), Funciones › proportional (y = 2x), Movimientos › vector-components ((4, 3)) y translation, Estadística › grouped-data (la marca 165).

| Unidad | Nombres (textos / checks / ids) | «¿Por qué?» | Enlaces | Commit |
|---|---|---|---|---|
| Racionales | `rationalsLessonTexts` / `rationalsLessonChecks` / `RationalsTopicId` | 4 | 8 | 4c8e6d75 |
| Potencias y raíces | `powersLessonTexts` / `powersLessonChecks` / `PowersTopicId` | 4 | 7 | c2e9d1f7 |
| Proporcionalidad | `proportion3LessonTexts` / `proportion3LessonChecks` / `Proportion3TopicId` | 4 | 9 | 6c9daa2f |
| Sucesiones | `sequencesLessonTexts` / `sequencesLessonChecks` / `SequencesTopicId` | 3 | 7 | f623d360 |
| Polinomios | `polynomialsLessonTexts` / `polynomialsLessonChecks` / `PolynomialsTopicId` | 3 | 6 | a6232c51 |
| Ecuaciones y sistemas | `equations3LessonTexts` / `equations3LessonChecks` / `Equations3TopicId` | 4 | 9 | ed6319f1 |
| Funciones | `functions3LessonTexts` / `functions3LessonChecks` / `Functions3TopicId` | 4 | 8 | 3daf2915 |
| Geometría plana | `geometry3LessonTexts` / `geometry3LessonChecks` / `Geometry3TopicId` | 3 | 7 | 9069f24a |
| Movimientos | `motions3LessonTexts` / `motions3LessonChecks` / `Motions3TopicId` | 3 | 6 | 73355130 |
| Estadística y probabilidad | `stats3LessonTexts` / `stats3LessonChecks` / `Stats3TopicId` | 3 | 11 | 5e17dded |

Qué lecciones llevan «¿Por qué?» y enlaces, en la nota de cada unidad.

## Fallos de contenido arreglados de paso

- Potencias › power-rules (ar): «يمكن ضرب الأسس» decía «exponentes» donde la regla habla de las bases: ahora «الأساسات». Potencias › irrational (ar): el decimal de un racional era «صحيح» (entero); ahora «منتهٍ» (exacto).
- Ecuaciones (eu), error típico: «$2x$ bider 2 da» → «$2x$ 2 bider $x$ da».
- Geometría › regular-polygons: la línea buena del error típico ya no da 180°.
- Proporcionalidad › direct-share e inverse-share: la explicación ya no resuelve el «Vamos a resolver».
- Estadística › grouped-data: la explicación usaba el mismo $[150,160)$ del problema; ahora $[140,150)$. El inglés dice «class midpoint» y el euskera «parentesi karratua», como los pasos.
- Polinomios › add-sub y ruffini, Sucesiones › recursive: el enunciado era una sola fórmula en una línea y se salía 18–43 px a 375 px (ya pasaba en la web); ahora es una sola fórmula en dos filas (`aligned` / `gathered`). Ojo: no partirla en varias fórmulas sueltas, porque en árabe, si caben en una línea, salen en orden inverso.

Vistos y sin tocar (son de otros cursos): Polinomios › algebraic-fractions usa `SimplifyFigure` de 4. aplicadas, que enseña una expresión y no una fracción algebraica; el dibujo de Mezclas (`MixtureFigure`, 4. aplicadas) lleva en euskera «12,40-an»; `RatiosFigure` escribe $r$ y la lección $k$.

## Cómo se hizo (trucos para repetirlo)

- **Cadena por unidad:** un borrador por unidad (`=== id`, los campos de textos, `--- checks`, el error y la pregunta; `mistake: KEEP` copia el error de `lessons.tsx`) → script que escribe `lessonTexts.ts` y `lessonChecks.ts` → script con el analizador de TypeScript que quita `explanation`, `example`, `mistake` y `cases` de `lessons.tsx` → `needs` insertados por script con el título copiado de la lección destino. Importante: el borrador con `KEEP` solo se puede montar **antes** de quitar los errores de `lessons.tsx`; después, corrige directamente los dos archivos nuevos.
- Los tests de contenido de cada unidad (`tests/<unidad>-dbh3-content.test.ts`) leían solo `lessons.tsx`: ahora leen los tres archivos (una línea, `lessonsSource`). Prohíben `\text{` en cualquier parte, también en un comentario.
- **Pegas de los tests:** el orden de las fórmulas tiene que ser el mismo en los cuatro idiomas (cambia el orden de la frase, no la fórmula); `\approx` vale con las cifras escritas en los dos lados (`6{,}27\approx 6{,}3` falla: usa `\to`); el vocabulario se busca por la raíz (las tildes del castellano y los plurales rotos del árabe no casan: usa la forma de la lección o cambia la frase); el ejemplo no puede tener los mismos números que «Compruébalo»; el enunciado del ejemplo, 30 palabras como mucho.
- **Euskera:** nunca un sufijo pegado a un número: «% 15ek» → «… % 15 dira», «1etik 9ra» → con palabras; los miles con espacio no separable (`50 000`).
- **Fórmulas grandes:** a 375 px `FitMath` encoge el ejemplo y los pasos; dos fórmulas con `\qquad` caen a 12–15 px. Van en dos filas (`\begin{gathered}…\\…\end{gathered}`) para quedar en 17 px o más.
- **Vite con `node_modules` enlazado:** en un worktree con `node_modules` como enlace simbólico, el servidor de desarrollo cargaba React dos veces («Invalid hook call», página en blanco). Arreglo local (sin commit): una configuración propia con `resolve.dedupe` de react, react-dom, react-router(-dom), react-i18next e i18next, y `cacheDir` dentro de una carpeta `node_modules` propia.
- **Revisión en el navegador:** con el panel oculto, `ResizeObserver` no llega y `FitMath` no encoge: no midas el tamaño que tiene la fórmula, sino el que le daría `FitMath` (copiar su cálculo: base, mínimo 60 % o 12 px, dos pasadas). El panel oculto va lento (≈ 1 min por unidad e idioma): deja el recorrido corriendo en `window.__job` y consulta por partes (cada llamada corta a los 45 s).

## Revisión a 375 px (2026-11-05)

Script en el navegador sobre las 150 lecciones en eu, es y ar (450 páginas): abre todos los pasos, abre los 35 «¿Por qué?» y una a una las 533 palabras del vocabulario, y mide la página, cada fórmula, párrafo, botón y dibujo, y el tamaño que `FitMath` da a cada fórmula de ejemplo, paso, tarjeta y «¿Por qué?».

- Primera pasada: 3 enunciados se salían (Polinomios › add-sub y ruffini, Sucesiones › recursive) y 72 fórmulas quedaban en 12–16,8 px, 26 de ellas cortadas (con desplazamiento lateral). Casi todas eran «Otro ejemplo» con dos cuentas separadas por `\qquad` o una cadena de `\ \to\ `. Se partieron en filas con un script (`\qquad` → `gathered`; `\ \to\ ` → filas que empiezan por `\to`; cadena de `=` → `aligned` con `&=`) y dos a mano en tres filas. Commit b5b0dde2.
- Los tres enunciados se partieron primero en fórmulas sueltas; en árabe, en una pantalla ancha, quedarían en orden inverso, así que son una sola fórmula en dos filas (commit siguiente a b5b0dde2).
- Pasada final: en los tres idiomas, las 150 lecciones con «Otro ejemplo», «Error típico» y «Compruébalo», 78 enlaces, 35 «¿Por qué?», 533 de 533 palabras abiertas; nada se sale de la página, ningún error de KaTeX y todas las fórmulas de caja en 17 px o más.
- Tests 1577/1577, lint y build en verde (2026-11-05).
- Resúmenes de las 10 unidades (`teoria/laburpena`) en eu, es y ar (30 páginas), ahora con los 150 errores típicos y las definiciones: nada se sale, sin errores de KaTeX.
- Visto sin tocar (es del motor y de todos los cursos): en árabe, la idea clave de Polinomios › square-diff parte la fórmula `(a-b)^{2}=a^{2}-2ab+b^{2}` al final de la línea y deja «: الإشارات» con los dos puntos al principio.

Hoja de revisión para el dueño (euskera y castellano, las 150 lecciones), hecha con un script que importa los `lessonTexts.ts` y `lessonChecks.ts` y dibuja las fórmulas con KaTeX: en la carpeta de notas compartidas de la sesión, `teoria-dbh3-revision.html`.
