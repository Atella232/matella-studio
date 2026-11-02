# Teoría 2. DBH: revisión y mejoras (2026-11-02)

El dueño pidió revisar la teoría («Ikasi / Aprende») de las 10 unidades de 2. DBH (142 lecciones) y proponer 10 mejoras. Eligió arreglar los fallos encontrados y las mejoras 1, 2 y 6. Rama `feat/teoria-dbh2`, sin publicar.

## Fallos arreglados

- Zatikiak › Fracciones equivalentes: `\frac{9}{12}:\ 6\cdot 12…` salía «÷». Ahora `6\cdot 12=8\cdot 9=72\ \Rightarrow\ \frac{6}{8}=\frac{9}{12}`. Recuerda: dentro de `$…$` cualquier `:` es división; para dos puntos de puntuación, fuera de la fórmula.
- Caja «Idea clave»: la regla de la etiqueta (`.fraction-v2-takeaway span:not(…)`) llegaba a todos los spans de MathText, así que la frase salía a 13 px, en mayúsculas y espaciada, y las fórmulas cambiaban (Trapecios «B − B»). Ahora la regla es `.fraction-v2-takeaway > div > span` y la frase sale como estaba diseñada (23/19 px, cursiva). Afecta a todos los cursos. Ya no hace falta evitar minúsculas en las fórmulas de la idea clave (se quitó de CLAUDE.md; los tests de 3. DBH que lo vigilan siguen pasando y se dejaron).
- Funtzioak › Máximos y mínimos: el ejemplo da los puntos completos.
- Zatikiak › Potencias: «fracción propia positiva» (con base negativa no se hace más pequeña).
- Estatistika › Mediana desde una tabla: «busca en la columna de $F_i$ cuál es el dato de la posición central» (la regla «la primera $F_i$ que supera N:2» fallaba con $F_i = N/2$). En 4. DBH aplicadas se dice «se busca la posición N:2 en las frecuencias acumuladas»: no se ha tocado.
- Zatigarritasuna › Criterios del 11 y del 7: `3238` sin espacio.

## Mejoras del motor (todas las unidades V2 de todos los cursos)

- **Dibujos enteros (mejora 1):** `.fraction-v2-lesson-figure svg` ya no tiene `min-width: 540px`. `LessonFigure` (en `LessonExtras.tsx`) mide el SVG y, si queda por debajo del 80 % de su `viewBox`, muestra «Ampliar» (eu Handitu, en Enlarge, ar تكبير): abre el dibujo a pantalla completa y, en un móvil vertical, lo gira 90° para usar el lado largo. Esc y «Cerrar» lo cierran, el foco vuelve al botón y la página no se desplaza debajo. En el móvil la caja del dibujo y la del ejemplo ganan ancho (márgenes negativos y menos relleno, `@media (max-width: 760px)` de `UnitPage.css`).
- **Fórmulas que encogen (mejora 1):** `FitMath` (ejemplo, fórmulas de los pasos y de los casos) reduce la letra hasta el 60 %, nunca por debajo de 12 px, antes de dejar desplazamiento lateral. Observa solo el ancho de la caja y repite al cargar las fuentes de KaTeX.
- **Dibujo tras la explicación (mejora 2):** orden de la lección: explicación → casos → dibujo → «Vamos a resolver» → pasos → ejemplo → error típico → idea clave. No se ha redibujado nada: el dibujo queda debajo de la explicación que ilustra (en Hipotenusa, el 6-8-10 del texto).
- **Pasos de uno en uno (mejora 6):** `LessonSteps`, con `key={currentTopic.id}`. Solo cuando hay `problem`, `stepsKind` es `steps` y la lección no está marcada como entendida: enseña el paso 1 y la caja «¿Qué harías ahora?» con «Ver el paso N» y «Ver todos los pasos». El foco va al paso nuevo.

## Medidas a 375 px (eu, es y ar, las 142 lecciones)

| | Antes | Después |
|---|---|---|
| Dibujos con desplazamiento lateral | 120 de 120 | 0 (112 con «Ampliar») |
| Ejemplos cortados | 76 | 0 (63 encogidos, mínimo 13,2 px) |
| Fórmulas de pasos cortadas | 11 | 0 (12 encogidas, mínimo 12,6 px) |
| Distancia media explicación → dibujo | 927 px | 336 px (ar 247) |

En el móvil, sin ampliar, las letras pequeñas de los dibujos quedan en unos 6–7 px: para leerlas está «Ampliar». Arreglarlo del todo pide dibujos de 720 de ancho rehechos en vertical, dibujo a dibujo.

## Cómo auditar

Script en el navegador (pestaña oculta: sin `await` largos, guardar en `window.__…` y consultar por partes): recorrer `#/matematika/dbh2/<unidad>/teoria/<id>`, esperar a que cambie `#fraction-v2-lesson-title`, pulsar `.lesson-steps-all` y medir `scrollWidth > clientWidth` en la caja y en sus `.math-token`. El idioma se cambia pulsando `.fraction-v2-language button[lang=…]`.

## Pendiente (2026-11-02)

- ~~**Mejora 2 frente a mejora 6**~~ (hecho el mismo día, commit 1ec6a0a): en 32 lecciones el dibujo enseñaba el problema de «Vamos a resolver» ya resuelto y, al subir, daba la respuesta antes de «¿Qué harías ahora?». Nuevo campo opcional `figureAfterSteps` en `UnitTopic`: el dibujo va después de los pasos y solo aparece al ver el último. Revisadas a ojo las 94 lecciones con pasos de uno en uno y dibujo; marcadas: Enteros › order; Zatigarritasuna › primes, factorization; Zatikiak › representation, simplification, proportionality; Proporcionalidad › compound-unit, inverse-share; Aljebra › language; Ekuazioak › lcm, incomplete; Gorputzak › frustum-area, cone, pyramid-volume, sphere-volume; Funtzioak › coordinates, tables, formula, plot, slope, affine, line-equation; Estatistika › cumulative, grouped, pie, mean-table, median-table, deviation, quartiles, events, tree, double-table. Se quedan arriba, aunque marquen la respuesta, porque son el dato que hay que leer: Funtzioak › graph-reading, extremes; Estatistika › box-plot. En symmetry la respuesta ya está en la explicación (eso es de la mejora 4). En unidades nuevas: si el dibujo es el problema resuelto, pon `figureAfterSteps: true`. Ojo: un método automático (números del último paso en el texto del dibujo) se saltaba la mitad, porque varios dibujos escriben en HTML y no en SVG; hay que mirarlos.
- **Ideas clave de 3. DBH en mayúsculas:** se escribieron con fórmulas solo en mayúsculas por la regla antigua (96 de 150; también 18 en 4. académicas, 8 en 4. aplicadas, 3 en 1. y 6 en 2.). Ahora la frase sale en minúsculas y esas fórmulas desentonan (`Y=MX+N`, `A_{N}`, y `1\ \mathrm{KM}=100\,000\ \mathrm{CM}`, que además escribe mal las unidades). Hay que pasarlas a la notación normal de cada lección, una a una (P, Q₁, F_i, N… sí van en mayúscula).
