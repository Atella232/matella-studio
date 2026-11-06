# Funtzio elementalak · 1.º Bachillerato Ciencias

Es la cuarta unidad de Bachillerato y la primera del bloque Análisis: curso `batx1-zientziak`, tema `funciones`.

- **Carpeta:** `src/pages/batx1-zientziak-funtzioak`
- **`storagePrefix`:** `matella-funtzioak-batx1z`
- **Página:** `FuntzioakBatx1zIntroPage`
- **Rama:** `feat/funtzioak-batx1z`, cortada de `main` 2ff41c2
- **Bloque de ids:** 108000–108999 (diagnóstico 108001–108008, laboratorio propio 1081xx–1083xx, juegos 108401–108899)

## Fuentes y alcance

- **Libros:** Santillana 1.º Bach Ciencias U8 «Funciones» (solucionario; varias páginas escaneadas o con las fórmulas rotas) y Anaya Matemáticas I U10 «Funciones elementales» (solucionario, buena capa de texto). Del libro solo se ha sacado el alcance; textos y ejercicios son propios.
- **Orden de Santillana:** dominio y simetría → transformaciones → inversa → exponencial, logarítmica y arco → a trozos → operaciones y composición. De Anaya: la parte entera, las cadenas de transformaciones y las ramas de la inversa.
- **Solapamiento con 4.º académicas:** las familias (rectas, parábolas, hipérbolas, raíces, exponenciales) ya están en `dbh4-akademikoak-funtzioak`, `-polinomikoak` y `-esponentzialak`. Van como enlaces «Antes de empezar»; lo nuevo de 1.º va a fondo.

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `study` | `domain`, `symmetry`, `periodic` |
| `transforms` | `shifts`, `reflections`, `stretch` |
| `inverse` | `inverse-function`, `inverse-graph`, `exp-log`, `arc` |
| `piecewise` | `piecewise`, `absolute`, `floor` |
| `operations` | `operations`, `composition` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-05):**
- V1: lo de 4.º como repaso corto con enlaces; lo nuevo, a fondo.
- Herramientas propias: L1 «El taller de transformaciones», L2 «Dos máquinas en cadena», L3 «El espejo y = x», L4 «La escalera de la parte entera».
- M: herramientas prestadas de 4.º (construir dominios, par o impar, unir trozos, periódica, valor absoluto, traslaciones de la exponencial y del logaritmo).
- Juegos propios: J1 «¿Dónde cae el punto?», J2 «Ordena las máquinas», J3 «Deshaz la máquina», J5 detective.
- J6 carrera y memoria; J7 de 4.º «Pinta el dominio» y «Láser de curvas».
- Fuera: L5 «Doblar o copiar» y J4 «¿Qué transformación?».
- **Notación aceptada:** la parte entera se escribe $E(x)$ en los cuatro idiomas (zati osoa, parte entera, integer part, الجزء الصحيح); la parte decimal es $x-E(x)$ (zati hamartarra, parte decimal, fractional part, الجزء الكسري).
- **Funciones arco en este tema:** las dos editoriales las ponen aquí; el tema de funciones trigonométricas de Anaya (U5) no las trae.

## Hecho

**Fase 1+2, lecciones y contenido, commit ad83cc8:**
- **Lecciones:** las 15 tienen las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario y 7 «¿Por qué funciona?»; `lessonChecks.ts` con error típico y «Compruébalo»; 20 enlaces «Antes de empezar» a 4.º académicas y a Números reales de 1.º).
- **Nombres trigonométricos:** `text.ts` copia la idea de Trigonometría de 4.º y la amplía a los arcos. `lessonTexts.ts` y `lessonChecks.ts` escriben `\sin`, `\tan`, `\arcsin`, `\arctan` igual en los cuatro idiomas (los tests comparan las fórmulas), y `lessons.tsx` los cambia con `localizeNames`: arcsen y arctg en castellano, arcsin y arctg en euskera, arcsin y arctan en inglés y árabe. `content.ts` y los pasos usan el `say` de `text.ts`, que ya los cambia.
- **Dibujos nuevos (13):** `DomainFigure`, `PeriodicFigure`, `ShiftsFigure`, `ReflectionsFigure`, `StretchFigure`, `MachineFigure`, `MirrorFigure`, `ArcFigure`, `PiecewiseBachFigure`, `AbsoluteGraphFigure`, `StairsFigure`, `OperationsFigure`, `CompositionFigure`, más `BachFunctionsHeroArt`. De 4.º: `SymmetryFigure` (Funciones) y `LogGraphFigure` (Exponenciales).
- **Contenido:** diagnóstico 108001–108008, práctica 1–20, retos 101–115 y banco 1–50. Las respuestas son un número: una coordenada del punto, cuántos enteros tiene un dominio o el menor, el ángulo de un arco en grados, la a de aπ.
- **Registro:** `active: true` en `courses.ts`, ruta en `src/router/index.tsx` y la dirección en `src/features/unit-v2/paths.ts` (es una sola línea: al fusionar con otras sesiones habrá conflicto en esa línea; basta con dejar todas las direcciones).
- **Test nuevo:** `tests/funtzioak-batx1z-content.test.ts`.
- **Comprobación:** 2200 tests, lint y `tsc -b` en verde. Las 15 lecciones a 375 px en eu, es y ar sin desbordes ni errores de KaTeX.

**Fase 3, laboratorio, commit ab39298:** 11 herramientas.
- **Propias (4),** con predicción antes del resultado, retos infinitos (`freshFrom`) y ▶:
  - L1 `transform` «El taller de transformaciones», retos 108101–108105: una función madre (√x, x², |x|, 2ˣ, 1/x) con un punto P se convierte en $y=A\cdot f(Bx+c)+k$. Se predice si P va a la izquierda, se queda en la misma vertical o va a la derecha; ▶ lleva P a su sitio. Los retos de «construye» comparan la curva, no los números (|−x + 1| es |x − 1|). Lógica en `lab/transform.ts`.
  - L2 `composition` «Dos máquinas en cadena», retos 108201–108205: máquinas +3, −2, ·2, ·(−1), x²; arriba $f\circ g$, abajo $g\circ f$. Se predice cuál sale mayor; ▶ hace pasar la x. Retos: llegar a un valor, encontrar el x con los dos órdenes iguales, dos máquinas que conmutan, descomponer $(x-2)^2$. Lógica en `lab/composition.ts`.
  - L3 `mirror` «El espejo y = x», retos 108301–108305: parábola, |x|, 2ˣ o recta (movidas con v y w), un corte (todo, x ≥ c o x ≤ c) y una recta horizontal y = h. Se predice cuántas veces corta la recta a la parte que se guarda; ▶ dobla esa parte sobre y = x (verde si es función, rojo discontinuo si no). Lógica en `lab/mirror.ts`.
  - L4 `stairs` «La escalera de la parte entera», retos 108351–108355: E(x) o x − E(x), con una sonda en décimas de −4 a 4 (se guarda en décimas para no redondear). Se predice si E(x) es el entero de la izquierda, el mismo o el de la derecha (nunca es el de la derecha); con la parte decimal, si es menor, igual o mayor que 0,5. ▶ recorre la escalera. Lógica en `lab/stairs.ts`.
- **Prestadas (7),** con sus retos e ids de 4.º académicas: construye el dominio, ¿par o impar?, une dos trozos (Funciones), funciones periódicas (aplicadas), dobla el valor absoluto (Polinómicas), mueve la exponencial y el logaritmo (Exponenciales).
- **Test:** `tests/funtzioak-batx1z-lab.test.ts`. 2205 tests en verde.
- **Revisión:** las 4 propias a 375 px en eu, es y ar, antes y después de predecir: sin desbordes ni errores de KaTeX.

**Fase 4, juegos, commit fd78d02:** 8 juegos, récords en `matella-funtzioak-batx1z-game-records`.
- **Propios (4):**
  - J1 `where` «¿Dónde cae el punto?», niveles 108501–108503: $f$ pasa por $P(p,q)$ y se da $y=A\cdot f(Bx+c)+k$; se toca en la cuadrícula (`Plane` con `onPick`) el punto que sale de P. Un solo punto vale: $x=\frac{p-c}{B}$ y $y=Aq+k$, enteros y dentro del tablero; mover x al revés ($p+c$) da siempre otro punto. Un cambio; dos; tres o cuatro con un factor 2 o −2. Lógica en `games/where.ts`.
  - J2 `order` «Ordena las máquinas», niveles 108601–108603: tarjetas de máquinas (+n, ·n, x², ·(−1)) que se ponen en fila. Dos máquinas y un número que tiene que salir; tres máquinas; descomponer una fórmula $h(x)$. Solo un orden llega a la meta (se prueban todos). Lógica en `games/order.ts`.
  - J3 `undo` «Deshaz la máquina», niveles 108651–108653: $f$ es una cadena de 2 o 3 máquinas; con las tarjetas (las inversas y las propias máquinas de $f$, que tientan) se construye $f^{-1}$. Vale cualquier cadena que devuelve cada $f(x)$ a $x$. Dos máquinas; tres (con cambio de signo); con x³ o 2ˣ (se deshacen con ∛x y log₂ x). Lógica en `games/undo.ts`; las máquinas y la fórmula de una cadena en `games/machines.ts`.
  - J4 `detective`, niveles 108701–108703: 12 errores (log con ≥ 0, olvidar el denominador, $x+a$ a la derecha, «impar» por tener $x^3$; $f^{-1}=\frac{1}{f}$, deshacer en mal orden, inversa de $2^x+c$, arco coseno fuera de $[0,\pi]$; $E(x)$ quitando decimales, el trozo que no toca, $f\circ g$ al revés, quitar el cero del numerador en $\frac{f}{g}$).
- **Carrera** 108401–108405 (15 tipos, tres por etapa) y **memoria** 108801–108803 (parte entera, inversas, dominios).
- **De 4.º académicas, con niveles y etapas de esta unidad:** «Pinta el dominio» 108811–108813 (Funciones) y «Láser de curvas» 108821–108823 (Polinómicas), con familias propias por nivel: parábolas y |x|; exponenciales y logaritmos; hipérbolas, |x| y logaritmos.
- **Test:** `tests/funtzioak-batx1z-games.test.ts` (cada respuesta de la carrera se recalcula con `meta`; el punto de J1 sale de P; J2 tiene un solo orden; J3 se deshace con las inversas en orden inverso; los casos del detective se dibujan en KaTeX).
- **Comprobación:** 2212 tests, lint y build en verde; inventario OK. Ojo: el script cuenta como propios `exp-shift`, `log-shift`, `domain` y `laser`, que son de 4.º. Lo propio de verdad: 4 herramientas (transform, composition, mirror, stairs) y 3 juegos más el detective (where, order, undo).

## Trucos

- En las etiquetas de los dibujos en árabe, una fórmula con `∘` se da la vuelta (`f ∘ g` sale `g ∘ f`): `Label` solo aísla los trozos con letras, cifras y signos sencillos. Las fórmulas de composición van en `F` o sin `∘`.
- En el árabe de `lessonTexts.ts`, las fórmulas tienen que salir en el mismo orden que en castellano (el test compara la lista en orden): «نغيّر $x$ إلى $-x$», no «نضع $-x$ مكان $x$».
- Una palabra del vocabulario tiene que aparecer en la lección con su raíz: «repetir» no casa con «se repite» (la raíz es «repet»); «التقريب» no casa con «تقرّب».
- Los grados en las fórmulas se escriben `60^\circ`: `°` dentro de `$…$` rompe KaTeX en modo estricto.

- Las etiquetas de los botones de predicción son texto plano (no pasan por MathText): nada de fórmulas ni `∘` en ellas.
- En `Readout` la fórmula no depende del idioma: en árabe hay que cambiar `{,}` por `.` a mano (el inglés lo cambia el motor).

- En una frase árabe, las etiquetas de las máquinas (− 4, ÷ 2) van envueltas en LRI/PDI (`\u2066…\u2069`) para que no se den la vuelta.
- `WorkedDetectiveGame` acepta `localize(latex, language)`: así las líneas pueden llevar nombres trigonométricos.

## Cierre

- **2026-11-05:** 2212 tests, lint y build en verde; inventario OK.
- **Revisión a 375 px en eu, es y ar:** las 15 lecciones (con los pasos y los «¿Por qué funciona?» abiertos), portada, diagnóstico, resumen, práctica, ejercicios, retos, el centro de juegos y cada juego, y las 11 herramientas. Sin desbordes, sin errores de KaTeX y sin LaTeX sin dibujar. «arcsen» sale en castellano y «arcsin», «arctg» en euskera.
- **Textos cortados en los dibujos:** se mide con `getBBox()` cada `<text>` de los dibujos de las lecciones y de las 4 herramientas (el SVG recorta sin cambiar el ancho de la página). Salía el título «y» del eje por arriba en Stretch, Mirror, AbsoluteGraph y Stairs: el marco baja a `oy={32}`.
- **Hoja de euskera:** `hoja-revision.mjs batx1-zientziak-funtzioak … --herramientas transform,composition,mirror,stairs --juegos race,where,order,undo,detective,memory`, mandada al dueño (fuera del repositorio).
- **Sin publicar:** la rama `feat/funtzioak-batx1z` espera a la sesión principal, que fusiona y publica.
