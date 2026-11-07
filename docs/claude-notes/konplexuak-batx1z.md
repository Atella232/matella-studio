# Zenbaki konplexuak · 1.º Bachillerato Ciencias

Es la sexta unidad de Bachillerato (bloque Trigonometría del reparto en paralelo): curso `batx1-zientziak`, tema `numeros-complejos`.

- **Carpeta:** `src/pages/batx1-zientziak-konplexuak`
- **`storagePrefix`:** `matella-konplexuak-batx1z`
- **Rama:** `feat/konplexuak-batx1z`, cortada de `feat/trigonometria-batx1z` (a49b1dbc) para usar sus piezas
- **Ids:** todo en el bloque 104000–104999: diagnóstico 104001–104008, retos del laboratorio propio 1041xx–1043xx, juegos 1044xx–1048xx.

## Fuentes y alcance

- **Libros:** Anaya Matemáticas I U6 «Números complejos» (solucionario con capa de texto) y Santillana 1.º Bach Ciencias U5 (solucionario; mismo orden). Del libro solo se saca el alcance; la ficha está fuera del repositorio.
- **Ya visto:** los conjuntos de números y racionalizar con el conjugado (`errealak-batx1z`), la fórmula de segundo grado (4.º), los vectores (4.º), las razones de cualquier ángulo y el cuadrante (`triangeluak-batx1z`), las fórmulas de la suma y del ángulo doble (`trigonometria-batx1z`).
- **Nuevo:** la unidad imaginaria, la forma binómica, el plano complejo, operaciones en binómica, potencias de i, forma polar y trigonométrica, producto y cociente en polar (giros), Moivre, raíces n-ésimas y polígonos regulares, ecuaciones en ℂ.

## Propuesta enviada al dueño (2026-11-06)

Cinco etapas y 15 lecciones:

- `binomial`: `imaginary-unit`, `binomial-form`, `complex-plane`.
- `operations`: `add-multiply`, `division`, `powers-of-i`, `quadratic-complex`.
- `polar`: `modulus-argument`, `polar-binomial`.
- `polar-operations`: `product-quotient`, `rotations`, `de-moivre`.
- `roots`: `nth-roots`, `roots-polygons`, `binomial-equations`.

Menú: V1–V4; L1 el plano complejo, L2 multiplicar es girar, L3 las raíces forman un polígono, L4 la espiral de las potencias; M de 4.º y del tema 2; J1 dónde cae el afijo, J2 gira y estira, J3 caza las raíces, J4 detective, J5 carrera y memoria.

## Diseño elegido (2026-11-06: «Las recomendadas»)

V1 polar $r_\alpha$ (subíndice) y también la forma trigonométrica $r(\cos\alpha+i\sen\alpha)$; V2 respuestas numéricas (parte real o imaginaria, módulo, argumento en grados en [0°, 360°), cuántas raíces); sin V3 (familias en el plano) ni V4 (sistemas en ℂ). L1 el plano complejo (opuesto, conjugado, módulo y argumento, con predicción del cuadrante), L2 multiplicar es girar (▶), L3 las raíces forman un polígono (sin L4). M: los vectores de 4.º (suma como paralelogramo), la circunferencia de 4.º y «las soluciones dan vueltas» del tema 2. J1 dónde cae el afijo, J2 gira y estira, J3 caza las raíces, J4 detective, J5 carrera y memoria.

## Fases

### Fase 1+2: lecciones y contenido

- Cinco etapas (`binomial`, `operations`, `polar`, `turns`, `roots`) y 15 lecciones: `imaginary-unit`, `binomial-form`, `complex-plane`, `add-multiply`, `division`, `powers-of-i`, `quadratic-complex`, `modulus-argument`, `polar-binomial`, `product-quotient`, `rotations`, `de-moivre`, `nth-roots`, `roots-polygons`, `binomial-equations`.
- Las 10 mejoras de teoría desde el principio: definiciones, vocabulario, ejemplo con enunciado propio, «¿Por qué funciona?» en `division`, `powers-of-i`, `product-quotient`, `de-moivre` y `nth-roots`; `cases` en `binomial-form`, `quadratic-complex` (el signo del discriminante) y `modulus-argument` (el cuadrante); enlaces «Repasa antes» a `errealak-batx1z` (`sets`, `newton`, `rationalize`), a 4.º (`vector-operations`, `quadratic-formula`, `notable-angles`), a `triangeluak-batx1z` (`quadrant-ratios`, `inverse-angles`), a `trigonometria-batx1z` (`sum-formulas`, `double-angle`) y a `ekuazioak-batx1z` (`ruffini-roots`).
- Figuras propias (`figures.tsx`, texto ≥21 px, ejes Re e Im en todos los idiomas): eje imaginario, conjuntos de números, plano con z, −z y z̄, suma como paralelogramo, división por el conjugado, las cuatro potencias de i, parábola sin cortes y sus raíces conjugadas, módulo y argumento, forma polar con sus proyecciones, producto que suma ángulos, giro de 90°, espiral de potencias y `RootsFigure` (`kind`: `cube`, `triangle`, `equation`).
- Contenido: diagnóstico 104001–104008, práctica 1–20, retos 101–115, banco 1–50. Respuestas: parte real o imaginaria, módulo, argumento en grados entre 0° y 360° (la nota de respuestas lo dice), coordenadas, áreas y recuentos.
- Test propio `tests/konplexuak-batx1z-content.test.ts`: un evaluador de LaTeX con complejos (`[re, im]`; `i`, `\frac`, `\sqrt`, `\sqrt[n]`, `^n`, `\overline`, `|…|`, `\cos`/`\sen`/`\tg` en grados y la polar `r_{α}`) comprueba cada `=` y `≈`; una tabla `computed` recalcula cada respuesta; también resuelve otra vez las ecuaciones y raíces de las lecciones.

### Fase 3: laboratorio

- Siete herramientas (`lab/labTools.ts`), una o dos por etapa. Propias, cada una con predicción, retos fijos, retos infinitos y ▶:
  - `plane` (L1, `plane.ts`, retos 104101–104105): ${z}=a+bi$ con $a$ y $b$ de −4 a 4, y su opuesto o su conjugado. Se predice el cuadrante donde cae la imagen (cinco botones: 1.º–4.º y «Eje», con un `ChoicePredict` propio que usa el CSS de la predicción común); luego salen $|z|$ y el argumento, y ▶ lleva z a su imagen.
  - `turn` (L2, `turn.ts`, retos 104201–104205): z por $w$ ($i$, $-1$, $-i$, 2, $1+i$, $2i$ o $\frac{1+i}{2}$). Se predice si z gira menos de 90°, 90° o más; ▶ gira y estira a la vez. El producto va en verde porque la etapa es coral.
  - `roots` (L3, `roots.ts`, retos 104301–104305): las n raíces de $w$ ($|w|$ de 1, 8, 16, 27 o 64; argumento de 30 en 30°), en una circunferencia y como polígono. Se predice cuántas caen dentro del primer cuadrante (las de un eje no cuentan); ▶ las enseña una a una.
  - `complex.ts`: aritmética común (`mul`, `argumentOf` en [0°, 360°), `complexLatex`, `complexPlain` con el menos tipográfico) para las herramientas y los juegos.
- Prestadas con sus ids: `vector` y `combination` de 4.º vectores (73101–73104 y 73201–73204), `circle` de 4.º trigonometría (71001–71004) y `spin` de `trigonometria-batx1z` (103201–103205).
- Test `tests/konplexuak-batx1z-lab.test.ts`: retos resueltos por un estado conocido y no resueltos al abrir; 150 retos infinitos por herramienta; la imagen y su cuadrante para todos los z; $|zw|=|z||w|$ y $\arg(zw)=\arg z+\arg w$ para todos los z y w; cada raíz elevada a n devuelve w.

### Fase 4: juegos

- Seis juegos (`games/info.ts`), ids 104401–104813:
  - `race` (104401–104405, `race.ts`): cinco circuitos, uno por etapa (partes, opuesto y conjugado; parte real de un producto o cociente y potencias de i; módulo, argumento y parte real de $r_\alpha$; argumento del producto, módulo del cociente y Moivre; módulo de las raíces, primer argumento, separación y cuántas reales). Las opciones malas son los errores típicos; cada pregunta lleva `meta` para el test.
  - `affix` J1 «¿Dónde cae el afijo?» (104501–104503, `affix.ts`): se toca un punto entero de −5 a 5. Nivel 1 número, opuesto y conjugado; nivel 2 suma, producto, cuadrado y división con resultado entero; nivel 3 polar con múltiplos de 90° o $k\sqrt{2}$ y 45°, forma trigonométrica, $i^n\cdot z$ y $(1+i)^n$.
  - `twist` J2 «Gira y estira» (104601–104603, `twist.ts`): z en el plano y cuatro puntos A–D (la respuesta y tres errores: girar al otro lado, conjugado por opuesto, cambiar las partes sin signo, estirar sin girar).
  - `hunt` J3 «Caza las raíces» (104701–104703, `hunt.ts`): el diseño de `hunt` del tema 2 (un punto cada 15°); solo n = 2, 3, 4 y 6 y argumentos que dejan las raíces en múltiplos de 15°.
  - `detective` J4 (104801–104803, `detective.ts`): 12 errores típicos de la unidad.
  - `memory` (104811–104813, `boards.ts`): $k\,i^n$ ↔ valor, polar ↔ binómica, operación ↔ resultado.
- Tests `tests/konplexuak-batx1z-games.test.ts` (cada ronda se recalcula con el evaluador de complejos) y `tests/konplexuak-batx1z-math.ts` (el evaluador, compartido con el test de contenido; no es un test).

## Trucos

- Los tests compartidos (`lesson-checks`, `lesson-texts`) tratan `i` como una letra que puede valer cualquier número. Un «Compruébalo» con una sola fórmula de cálculo con `i` en el enunciado y una sola en la respuesta falla: el enunciado lleva dos fórmulas (`${z}=…$` y lo que se pregunta).
- `${z}` en los cuatro idiomas, también en `content.ts`; el test propio lo comprueba. Ni siquiera en un comentario de `lessons.tsx` se puede escribir «$z…»: el test lee las fórmulas del archivo como texto.
- En árabe, «la raíz $n$-ésima» lleva la $n$ como fórmula («الجذر من الرتبة $n$»): si no, el orden de las fórmulas no coincide con el castellano.
- `text.ts` reexporta el de `trigonometria-batx1z` (`\sen`, `\tg` en el nombre de cada idioma).

## Cierre (2026-11-07)

- Fases: 1+2 (cad3dd52), 3 (3c5b034d), 4 (bdbd90fe) y arreglos del cierre (ver el último commit de la rama). Antes de la fase 1+2 se fusionó main 373890c en la rama (solo chocaron las líneas de registro).
- `npm test` (2683), `npm run lint` y `npm run build` en verde; inventario OK (3 juegos propios: `affix`, `twist`, `hunt`; 3 herramientas propias: `plane`, `turn`, `roots`).
- Revisión a 375 px en eu, es y ar: 15 lecciones con todos los pasos y la figura (sin desbordes, sin textos fuera del SVG ni solapados), laboratorio con predicción hecha y varios estados de las raíces, los 6 juegos con sus 3 niveles (también con respuestas falladas), diagnóstico, práctica (20 bien), retos (15 bien) y banco con las 50 soluciones abiertas, portada, resumen y menú de juegos. Arreglados en el cierre: cuatro rótulos de figuras, «Re» e «Im» de los tableros del laboratorio, y dos casos del detective que no cabían (se parten en dos filas).
- Hoja de euskera en la carpeta de notas compartidas: `konplexuak-batx1z-revision.html` (tras `hoja-revision.mjs`, nombres de sen y tg por columna y «…» donde la pantalla pone un número variable).
- Pendiente fuera de la unidad (no tocado): en las herramientas `vector` y `combination` de 4.º vectores, la «y» del eje sale medio cortada arriba y la «x» 2 px fuera a la derecha.

## Publicación

Publicada en matella.net el 2026-11-07 (`main` 4ea794c, bundle `index-BEQ4mLjw.js`), la última de los 17 temas de 1.º Ciencias. La rama ya traía `main` fusionado, así que entró por avance rápido y sin choques. Antes de publicar: 2683 tests, lint y build en verde, y sin claves de guardado repetidas. Comprobado en vivo a 375 px en eu, es y ar (portada, lecciones 1, 8 y 15, laboratorio y juegos): sin desbordes, sin errores de KaTeX y sin errores en la consola. La página del curso muestra los 17 temas activos.
