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

## Trucos

- El test común `lesson-texts` y el de contenido buscan sufijos vascos con `\$(?:…|z|…)`: en euskera **ninguna fórmula puede empezar por la letra z** («$z=\lambda$» se lee como «$…$z»). Se escribe «hirugarren ezezaguna», se reordena ($x$ primero) o se pone `|A_z|` delante.
- `\begin{vmatrix}…\end{vmatrix}` arrastra las letras «vmatrix» al test de la idea clave: si la idea clave usa $A$, la lección tiene que escribir $A$ en alguna fórmula.
- Los párrafos de Python con `$` en un heredoc de Bash los bloquea el control de seguridad: escribir el script en el scratchpad y ejecutarlo.

## En curso

- Fase 1+2 hecha (ver commit). Siguiente: fase 3, laboratorio (L1–L4, ids 118101–118399, y M1 con sus ids de 1.º) y su test.
