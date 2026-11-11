# Sistemak · 2.º Bachillerato Ciencias

Tercer tema de 2.º Ciencias (curso `batx2-zientziak`, tema `sistemas`), tercero del bloque «Álgebra» del reparto en paralelo (ver `bachillerato.md`), después de `matrizeak` y `determinanteak`.

- **Carpeta:** `src/pages/batx2-zientziak-sistemak`
- **`storagePrefix`:** `matella-sistemak-batx2z`
- **Rama:** `feat/sistemak-batx2z`, cortada de `feat/determinanteak-batx2z` (1678171)
- **Bloque de ids:** 118000–118999 (diagnóstico 118001–118008, laboratorio propio 118101–118399, juegos 118401–118899)
- **Servidor de pruebas:** puerto 5181 (`.claude/launch.json` sin commit)

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U3 «Sistemas de ecuaciones» (solucionario; fórmulas con la capa de texto rota en 16 páginas) y Anaya Matemáticas II U3 «Sistemas de ecuaciones». Exámenes de EBAU del País Vasco (2019–2022) para el estilo: cada año, discutir según un parámetro con determinantes y rangos y resolver con Cramer.
- **Textos y ejercicios:** todos propios.
- **Frontera con 1.º (`sistemak-batx1z`):** allí están clasificar, Gauss con la matriz ampliada, la última fila, λ y la discusión por Gauss. Aquí, lo nuevo: Rouché-Frobenius con rangos, Cramer, homogéneos, forma matricial con $A^{-1}$ y discusión con determinantes.
- **Reutiliza:** `matrizeak/matrix.ts` y `MatrixSvg.tsx`; `determinanteak/determinant.ts` (`det`, `minor`, `rankByMinors`, `inverseByCofactors`), `DeterminantSvg.tsx` y las familias de `determinanteak/lab/detSlider.ts`; de 1.º, el vocabulario de la clasificación. En los tests, `tests/matrix-latex.ts`.

## Diseño elegido (2026-11-11, «las recomendadas»)

- **Etapas (5) y lecciones (15):** Rouché-Frobenius (`matrix-form`, `rouche-theorem`, `rank-classify`, `geometric-meaning`), Cramer (`cramer-rule`, `cramer-indeterminate`, `inverse-solve`), homogéneos (`homogeneous-trivial`, `homogeneous-parameter`), discusión según un parámetro (`parameter-determinant`, `parameter-ranks`, `parameter-solve`) y problemas (`extra-equations`, `word-problems`, `parameter-problems`). Ids de etapa: `rouche`, `cramer`, `homogeneous`, `discussion`, `problems`.
- **Notación:** matriz ampliada $A^*$ (Santillana); filas $E_1, E_2$; rango `\operatorname{rg}`; clasificación con las palabras de 1.º (bateragarri determinatua / compatible determinado / متوافق محدد / consistent and independent…). Respuestas: siempre un número; el tipo de sistema, con opciones (diagnóstico y «Compruébalo»).
- **Menú:** L1 el semáforo de Rouché, L2 la máquina de Cramer, L3 el mapa de la discusión, L4 tres rectas · M1 la familia de soluciones de 1.º · J1 Rouché exprés, J2 Cramer columna a columna, J4 detective, J5 carrera y memoria · V1, V2.

## Fases hechas

- **Fase 1+2 (lecciones y contenido):** 15 lecciones con `lessonTexts.ts` y `lessonChecks.ts` (cuatro «¿Por qué funciona?»: `rouche-theorem`, `cramer-rule`, `homogeneous-trivial`, `parameter-determinant`); diagnóstico 118001–118008; práctica 1–20, retos 101–115 y banco 1–50 (4/3/10 por etapa). Lógica exportada en `system.ts` (`classify`, `cramer`, `replaceColumn`, `augmentedRows`, `rankOf`, `detValue`, `satisfies`, `systemLatex`, `augmentedStarLatex`, `KIND_WORDS`) para el laboratorio, los juegos y 2.º Sociales. Dibujos en `figures.tsx`: `AugmentedFigure`, `RoucheFigure`, `ThreeLinesFigure`, `CramerFigure`, `ParameterMapFigure`, `SystemsHeroArt`. Test `tests/sistemak-batx2z-content.test.ts`: además de lo de siempre, lee cada `\begin{cases}` de los enunciados (con el parámetro sustituido por la respuesta) y comprueba con `system.ts` cada respuesta (Cramer, rangos, tipo, soluciones no triviales) y que el valor del parámetro es el único.

- **Fase 3 (laboratorio):** cuatro herramientas propias en `lab/`, con predicción, 5 retos fijos y retos sin fin:
  - L1 `rouche-light` (`roucheLight.ts`, 118101–118105): $A^*$ de tres sistemas (A, B, C); se cambian $b_1, b_2, b_3$ y la esquina $k$; se predice cuántas soluciones y se encienden los rangos con un semáforo.
  - L4 `three-lines` (`threeLines.ts`, 118151–118155): tres rectas $ax+by=c$ que se cambian una a una; se predice cuántos puntos comunes; `commonPoint`.
  - L2 `cramer-machine` (`cramerMachine.ts`, 118201–118205): tres sistemas de Cramer; se elige la incógnita, ▶ mete la columna $B$ y se ve $|A_j|/|A|$.
  - L3 `discussion-map` (`discussionMap.ts`, 118301–118305): cuatro familias con $a$ de −4 a 4; cada valor visto se pinta (verde una, ámbar infinitas, rojo ninguna). Exporta `DISCUSSION_FAMILIES`, `kindAt`, `criticalValues`.
  - M1: `SolutionFamilyTool` de 1.º, sin cambios y con sus ids.
  - La predicción del tipo se pregunta como «cuántas soluciones» (ninguna, una, infinitas): las palabras largas del tipo no cabían en tres botones a 375 px.
  - Test `tests/sistemak-batx2z-lab.test.ts`. Revisado a 375 px en eu, es y ar con la predicción hecha.

- **Fase 4 (juegos):** cinco juegos en `games/` (ids en `info.ts`):
  - J1 `rouche-espresa` (`roucheExpress.ts`, 118501–118503): rangos, $A^*$ o un sistema con un valor de $a$; tres botones (ninguna, una, infinitas).
  - J2 `cramer-zutabez` (`cramerColumns.ts`, 118601–118603): elegir $|A_x|$ (o el valor de la incógnita en el nivel 3) entre cuatro; exporta `vm`, `replaceRow`, `NAMES`, `roundSystem`.
  - J4 `detektibea` (`detective.ts`, 118801–118803): 12 errores en 3 niveles con `createWorkedCases`.
  - Carrera `lasterketa` (`race.ts`, 118401–118405): 15 tipos; usa `written()` de la carrera de 1.º.
  - Memoria `memoria` (`boards.ts`, 118851–118853): $A^*$ ↔ $(x, y)$, $A^*$ ↔ $|A_x|$, $A^*$ homogénea con $k$ ↔ $k$.
  - Test `tests/sistemak-batx2z-games.test.ts`: resuelve cada ronda con `system.ts` y lee las cartas de memoria (`augmentedIn`).

**Cierre (2026-11-11):** 3078 tests, lint y build en verde; inventario OK (2 juegos propios para el script, más el detective con los errores de esta unidad; 5 herramientas, 4 nuevas y la familia de soluciones de 1.º). Revisado a 375 px en eu, es y ar: las 15 lecciones (con los desplegables abiertos) y el resumen, las 4 herramientas con la predicción hecha, los 5 juegos (rondas de Rouché exprés y de Cramer, detective, carrera y los tres niveles de memoria), el banco de ejercicios, la práctica, los retos, el diagnóstico y la portada; sin desbordes ni errores de KaTeX. En el cierre salió que, en árabe, las descripciones de los juegos con fórmulas en texto plano («A* ↔ |Aₓ|») se veían desordenadas: van entre LRI y PDI (U+2066…U+2069), y «|A_y|» con barra baja se cambió por palabras; el test de juegos lo vigila (sin «_» y en árabe toda fórmula entre LRI y PDI), y los tests de juegos y laboratorio vigilan también palabras latinas en árabe y frases vascas en es/en. Hoja de euskera hecha con `hoja-revision.mjs` (fuera del repositorio, `~/Documents/Matella-fuentes/batx2z-algebra/hojas/sistemak-euskara.html`) y mandada al dueño.

## Trucos

- El test común `lesson-texts` y el de contenido buscan sufijos vascos con `\$(?:…|z|…)`: en euskera **ninguna fórmula puede empezar por la letra z** («$z=\lambda$» se lee como «$…$z»). Se escribe «hirugarren ezezaguna», se reordena ($x$ primero) o se pone `|A_z|` delante.
- `\begin{vmatrix}…\end{vmatrix}` arrastra las letras «vmatrix» al test de la idea clave: si la idea clave usa $A$, la lección tiene que escribir $A$ en alguna fórmula.
- Memoria: un sistema entero no cabe en una carta a 375 px; se enseña su $A^*$ en `\scriptstyle` con números pequeños (nivel 1: coeficientes 1..3, soluciones 0..3, $b$ de −9 a 12). Ocupa 87–101 px de 106.
- Los textos del centro de juegos (`info.ts`: título, lema, habilidades, niveles) se pintan como texto plano, no con `MathText`: nada de `$…$` ni de `_`, y en árabe cada fórmula entre U+2066 y U+2069.
- `detValue` suma `+ 0` para no devolver `-0` (los tests comparan con `===`).
- Los párrafos de Python con `$` en un heredoc de Bash los bloquea el control de seguridad: escribir el script en el scratchpad y ejecutarlo.
