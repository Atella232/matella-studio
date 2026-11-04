# Teoría 4. DBH académicas: las mejoras de 2. DBH en las 14 unidades (2026-11-04)

El dueño pidió llevar a 1.º, 3.º, 4.º académicas y 4.º aplicadas el contenido de las diez mejoras de la teoría de 2. DBH (`teoria-dbh2.md`), con cuatro sesiones en paralelo, una por curso. Esta es la de 4.º académicas: 14 unidades, 213 lecciones (`src/pages/dbh4-akademikoak-*`). Rama `claude/teoria-dbh4ak-d45b04` (worktree `.claude/worktrees/teoria-dbh4ak-d45b04`), sin fusionar ni publicar: la sesión madre fusiona y publica curso a curso.

## Qué lleva cada lección

- `lessonTexts.ts` (nuevo, por unidad): definiciones, explicación de 60 palabras como mucho en castellano (tope de `tests/lesson-texts.test.ts` para `dbh4`), casos, «Otro ejemplo» con números propios (`examplePrompt`, `example`, `exampleAnswer`), vocabulario de 2 a 5 palabras y, en 3 o 4 lecciones por unidad, «¿Por qué funciona?».
- `lessonChecks.ts` (nuevo): error típico y «Compruébalo» con tres respuestas.
- `lessons.tsx`: sin `explanation` ni `example`; `needs` («Antes de empezar, repasa…», solo hacia 3. DBH o unidades anteriores de 4.º académicas) y `figureAfterSteps` donde el dibujo enseña el ejercicio resuelto.

## Cómo se hizo

- Un script con el analizador de TypeScript quita `explanation` y `example` de cada lección, añade `needs` (copia el título de la lección destino en los cuatro idiomas, en el formato de una línea que lee `tests/lesson-needs.test.ts`), `figureAfterSteps` y la mezcla `baseTopics.map(...)`. Los textos nuevos se escriben a mano.
- Cada archivo nuevo tiene su `say` con el punto decimal en árabe (`{,}` → `.`), porque `lesson-checks.test.ts` lo exige.
- Navegador: con `node_modules` enlazado, Vite carga React dos veces y la página sale en blanco («Invalid hook call»). Arreglo local, sin subir: `.claude/vite.local.config.ts` con `cacheDir: 'node_modules/.vite-dbh4ak'`, `optimizeDeps.entries` y `resolve.dedupe` de React, y `--force` (ver la nota de la sesión de 3. DBH en la carpeta compartida).
- Auditoría a 375 px con un script en la página: abre cada lección en es, eu y ar, pulsa «Ver todos los pasos», abre «¿Por qué funciona?» y cada palabra del vocabulario y de las definiciones, y mide el desborde de la página y de las cajas (sin contar la capa MathML oculta de KaTeX), los errores de KaTeX y la letra mínima del ejemplo y del «¿Por qué?».

## Trucos

- `\approx` se comprueba con los decimales de los dos lados: `7{,}4862\approx 7{,}5` falla. Para redondear un decimal, una flecha (`7{,}4862\to 7{,}5`); `\approx` solo detrás de una expresión (`\frac{2}{3}\approx 0{,}67`).
- Una fórmula sola en «Vamos a resolver» se dibuja grande y no se parte: si es larga, mejor una frase con varias fórmulas.
- Dos igualdades en el ejemplo o en un paso: `gathered`, una por fila, para quedar en 17 px o más.

- `aligned` suma el ancho de sus dos columnas: si la primera fila es larga, empieza cada fila por `&` (`&2x^{3}-5x+7\\&=(x-2)(\dots)`); si no, el ejemplo baja a 14 px.
- Una pregunta de «Compruébalo» con una sola fórmula que es una cuenta (también una expresión con letras sin `=`) se toma por «calcula esto»: si se pregunta otra cosa (el grado, el resto, el factor), da dos fórmulas («al dividir $A$ entre $B$»).
- `lesson-checks.test.ts` no lee logaritmos: una ecuación logarítmica con respuestas «$x=10$» falla («no la resuelve»). Ahí las respuestas van como números sueltos.
- `MathText` deja los dos puntos de `\mathbin{:}` (escalas 1:n); un `:` suelto se dibuja ÷.

## Progreso

- **Errealak (18 lecciones)**, commits 8ba159a y siguiente: 12 enlaces a 3. DBH (Racionales, Potencias y raíces, Geometría plana, Proporcionalidad), 4 «¿Por qué?» (tipos de decimal, generatriz con $100x-x$, $\sqrt{2}$ irracional, porcentajes encadenados), 3 dibujos tras los pasos (unión e intersección, porcentajes encadenados, cantidad inicial). Arreglos: Unión e intersección tenía $A=(-5,\,3]$ y su dibujo $[-5,\,3]$ (ahora $[-5,\,3]$ y $A\cup B=[-5,\,+\infty)$), y su «Vamos a resolver» era una sola fórmula que ensanchaba la página a 402 px (ya pasaba en la web; ahora es una frase); los pasos de Error absoluto y relativo, en dos filas (bajaban a 12 px y se salían 47 px); el título inglés de la etapa 2 acababa en punto. Revisado a 375 px: 54 páginas, 195 palabras abiertas, 12 «¿Por qué?», sin desbordes ni errores de KaTeX.
- **Potentziak (15)**, 2f1fe93: 9 enlaces a 3. DBH (Potencias y raíces, Polinomios), 4 «¿Por qué?» (exponente 0 y negativo, $a^{1/2}=\sqrt{a}$, logaritmo del producto, cambio de base), «Una raíz cuadrada en el denominador» con el dibujo tras los pasos. 45 páginas a 375 px, 135 palabras, sin desbordes.
- **Polinomioak (15)**, 9430ec1 y 0ac8c74/3396946: 13 enlaces a 3. DBH, 3 «¿Por qué?» (cuadrado de una suma, teorema del resto, raíces y factores), parámetro tras los pasos. Los ejemplos son identidades (unidad de `identityUnits`): 38 comprobadas con dos juegos de números. El paso del m.c.d. y el m.c.m. (15,8 px) en dos filas.
- **Ekuazioak (15)**, 7612033 y 0556f95: 17 enlaces (3. DBH y Potencias, Polinomios y Reales de 4.º), 3 «¿Por qué?» (suma y producto de raíces, soluciones falsas al elevar al cuadrado, signo constante entre raíces). En árabe la unidad dice «متراجحة» para inecuación. Un paso de «Problemas de segundo grado» se salía 4 px: en dos filas.
- **Sistemak (15)**, b8a084b y 3396946: 16 enlaces, 3 «¿Por qué?» (punto de corte, sumar igualdades, un punto de prueba basta). `tests/sistemak-dbh4ak-content.test.ts` lee ahora también `lessonTexts.ts` y `lessonChecks.ts`, y comprueba 14 sistemas y 2 semiplanos nuevos (quitado el de «dos números suman 27», que ya no está).
- **Areak (15)**, a0bbb6e: 8 enlaces a 3. DBH, 3 «¿Por qué?» (tres pirámides en un cubo, teorema de la altura, $k^{2}$ y $k^{3}$), segmento circular tras los pasos.
