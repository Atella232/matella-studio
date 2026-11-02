# Teoría 2. DBH: revisión y mejoras (2026-11-02)

El dueño pidió revisar la teoría («Ikasi / Aprende») de las 10 unidades de 2. DBH (142 lecciones) y proponer 10 mejoras. Eligió arreglar los fallos encontrados y las mejoras 1, 2 y 6. Rama `feat/teoria-dbh2`, sin publicar.

## Fallos arreglados

- Zatikiak › Fracciones equivalentes: `\frac{9}{12}:\ 6\cdot 12…` salía «÷». Ahora `6\cdot 12=8\cdot 9=72\ \Rightarrow\ \frac{6}{8}=\frac{9}{12}`. Recuerda: dentro de `$…$` cualquier `:` es división; para dos puntos de puntuación, fuera de la fórmula.
- Caja «Idea clave»: la regla de la etiqueta (`.fraction-v2-takeaway span:not(…)`) llegaba a todos los spans de MathText, así que la frase salía a 13 px, en mayúsculas y espaciada, y las fórmulas cambiaban (Trapecios «B − B»). Ahora la regla es `.fraction-v2-takeaway > div > span` y la frase sale como estaba diseñada (23/19 px, cursiva). Afecta a todos los cursos. Ya no hace falta evitar minúsculas en las fórmulas de la idea clave (se quitó de CLAUDE.md). Los 9 tests de 3. DBH que lo exigían se quitaron el mismo día al pasar las fórmulas a minúsculas (ver «Pendiente»).
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

- **Mejora 2 frente a mejora 6:** en unas 15–20 lecciones el dibujo enseña el problema ya resuelto. Ahora va encima de «Vamos a resolver», así que da la respuesta antes de «¿Qué harías ahora?». Sobre todo en Gorputzak (tronco de pirámide, cono, volumen de pirámide y de esfera, poliedros regulares) y Estatistika (frecuencias acumuladas, datos agrupados, media, desviación media, cuartiles, árbol, tabla de doble entrada); también Zatikiak › Porcentajes y proporcionalidad, Proporcionalidad › Reparto inverso, Ekuazioak › Varios denominadores, Zatigarritasuna › Descomposición, Enteros › Ordenar. Lista sacada comparando los números del último paso con los textos del SVG; revisarla a ojo. Arreglo propuesto: campo opcional en `UnitTopic` para dejar el dibujo después de los pasos en esas lecciones. Cuando el dibujo es el dato del problema (gráficas de Funtzioak, diagrama de caja), arriba está bien.
- **Ideas clave de 3. DBH en mayúsculas: hecho (2026-11-02, rama `feat/takeaway-notation`, sobre `feat/teoria-dbh2`).** 108 ideas clave cambiadas en los cuatro idiomas: 3. DBH 86 (Ecuaciones 10, Estadística 5, Funciones 12, Geometría 10, Movimientos 10, Polinomios 11, Proporcionalidad 14, Sucesiones 14 — no Racionales ni Potencias), 4. académicas 14 (Ecuaciones 5, Polinomios 5, Sistemas 4), 4. aplicadas 8 (Polinomios 4, Proporcionalidad 4). 1. y 2. no tenían ninguna mal: lo contado allí eran mayúsculas buenas.
  - Regla: cada letra como en la explicación y los pasos de su lección (`y=mx+n`, `a_{n}=a_{1}+(n-1)\cdot d`, `x=\frac{-b\pm\sqrt{b^{2}-4ac}}{2a}`, `1\ \mathrm{km}=100\,000\ \mathrm{cm}`). Siguen en mayúscula porque la lección también: `P(x)`, `Q`, `C`, `R` (división de polinomios), `Q_{1}`, `N`, `S_{n}`, sucesos `A` y espacio `E`, puntos y segmentos (`PA=PB`, `OP^{\prime}=OP`, `P^{\prime}=2O-P`, Tales), `C` e `I` del interés, la base mayor `B` del trapecio y el área `A=\frac{P\cdot a}{2}`.
  - Letras que cambian de nombre, no solo de caja: frecuencias absolutas `f_{i}` (no `F_{I}`: la `F_{i}` mayúscula es la acumulada), apotema `a` (no `AP`), base menor `b` (no `B^{\prime}`), sector `\pi r^{2}` (no `R`), `D=d\cdot c+r` en la división de 4. académicas, `f(x)<g(x)` (no `F<G`), `C\cdot\left(1+\frac{r}{100}\right)^{t}` como en la lección de 4. aplicadas.
  - Sin letra en la lección, elegidas en minúscula: `a=b\Rightarrow a+c=b+c`, `-(a-b)=-a+b`, `\frac{a}{b}\cdot m` (m.c.m.), `y=a` e `y=b`, índices `i_{1}\cdot i_{2}`, mezcla `\frac{a\cdot p+b\cdot q}{a+b}`, grifos `\frac{1}{a}+\frac{1}{b}=\frac{1}{t}`, reparto inverso `\frac{1}{a}`, semejanza `k=\frac{a^{\prime}}{a}`, triángulo isósceles `h=\sqrt{l^{2}-(b\div 2)^{2}}`, distancia `d`, `x^{m}\cdot x^{n}`.
  - Palabras dentro de fórmulas (`\frac{NUEVO}{VIEJO}`, `\frac{CANTIDAD}{SUMA}`): pasan al texto, «Directa: nuevo/viejo», «Una parte = cantidad/suma» (y en eu/en/ar), como en la explicación de la lección y en 4. aplicadas. Proporcionalidad 3. DBH tiene un test que prohíbe `\text{}` en sus lecciones; además MathText convierte `to`, `le`, `ge`, `div`, `quad` sueltos en símbolos dentro de `\text{}` y el árabe no puede ir ahí.
  - Conectores escritos en mayúscula para ir con las fórmulas: «EDO/O/OR» → «edo/o/or» (Ecuaciones incompletas), «ETA/E/AND» → «eta/e/and» (Igualación; «e $y$» como en su explicación). Los ejes en el texto siguen «eje X», «Y ardatza», «X axis», como en las lecciones.
  - Dos ideas clave usaban `:` como etiqueta dentro de la fórmula y salía ÷: Giros con coordenadas, ahora `$90°$: $(x,y)\to(-y,x)$`; Simetrías con coordenadas, ahora en texto por idioma «Eje X: $(x,y)\to(x,-y)$. Eje Y: …» (como los títulos de sus casos).
  - No se tocaron las palabras de énfasis en mayúsculas del texto (TODOS, LAS DOS, ORIGEN, MISMA, COMPRUEBA…, unas 35 ideas clave de 3. DBH en eu/es/en; el árabe no tiene). Ahora se ven en mayúsculas dentro de una frase normal: pregunta abierta para el dueño.
  - Tests: quitado el test «no lowercase letters in takeaway formulas» de los 9 `tests/*-dbh3-content.test.ts`. Nuevo `tests/takeaway-notation.test.ts` para todas las lecciones de todos los cursos (lee los `.tsx` como texto; en 4. aplicadas Proporcionalidad suma `lessonTexts.ts`): una letra de la fórmula de la idea clave falla si su lección solo la escribe en la otra caja; excepción anotada: el área `A` de Geometría 3. DBH › Área de polígonos regulares. Otro test: unidades de `\mathrm{}` no en mayúsculas. Con las fórmulas antiguas falla.
  - Revisado a 375 px en eu, es y ar (28 lecciones de muestra, 84 cajas): ninguna se sale, ningún error de KaTeX.
- **`:` como etiqueta dentro de fórmulas de las lecciones (no idea clave):** sale ÷. Visto en 11 fórmulas: Funciones 3. DBH (`y=2x+3:\ 2\cdot 3+3=9`), Movimientos 3. DBH (`y=x:\ (2,-5)\to(-5,2)`, `x=3:\ …`, `k=\frac{1}{2}:\ …`), Polinomios 3. DBH (`x^{2}-9:\ x=3,\ x=-3`), Ecuaciones 4. académicas (`x\ge -2:\ [-2,+\infty)` y dos más), Reales 4. académicas (`\{x\in\mathbb{R}:\ 1\le x<5\}`), Reales 4. aplicadas (`\sqrt{2}\approx 1{,}4:\ E_a=…`). Arreglo: sacar la etiqueta de la fórmula o usar `\colon`/`\mid`. Sin hacer.
