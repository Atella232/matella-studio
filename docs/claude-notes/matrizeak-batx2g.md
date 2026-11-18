# Matrizeak · 2.º Bachillerato Ciencias Sociales

Primer tema de 2.º Sociales (curso `batx2-gizarte`, tema `matrices`), primero del bloque «Álgebra» del reparto en paralelo (ver `bachillerato.md`, «Reparto en paralelo de 2.º Sociales»).

- **Carpeta:** `src/pages/batx2-gizarte-matrizeak`
- **`storagePrefix`:** `matella-matrizeak-batx2g`
- **Rama:** `feat/matrizeak-batx2g`, cortada de `main` 286824e
- **Bloque de ids:** 141000–141999 (diagnóstico 141001–141008, laboratorio propio 141101–141399, juegos 141401–141899)
- **Servidor de pruebas:** puerto 5201 (`.claude/launch.json` sin commit)
- **Gemelo:** `batx2-zientziak-matrizeak` (se importa, no se copia ni se edita).

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach CCSS U1 «Matrices» (solucionario; capa de texto rota, leído por las marcas de página y algunas páginas como imagen; mismo orden que el de Ciencias, con más problemas de contexto al final) y Anaya MACS II U2 «Álgebra de matrices» (solucionario; sin la sección de n-uplas de Ciencias y con «Forma matricial de un sistema»). EBAU País Vasco MACS II 2019–2022 para el estilo. Ficha fuera del repositorio: `~/Documents/Matella-fuentes/batx2g-algebra/ficha-matrices.md`.
- **Textos y ejercicios:** todos propios.
- **Frontera con los otros temas del bloque:** aquí la inversa solo por Gauss-Jordan (y por sistema en 2 × 2) y el rango solo por Gauss; «¿inversa según k?» se decide por el rango. La forma matricial $AX=B$ (Anaya §7) solo como «resolver con $A^{-1}$»; la discusión va en `sistemak`. Determinantes y adjunta, en `determinanteak`.
- **Matrices de transición (cuotas de mercado):** no salen en ninguno de los dos libros; se ofrecen como extra.
- **«Antes de empezar»:** solo a `batx1-zientziak/sistemas` (Gauss, matriz ampliada) o a 4.º. El enlace a 1.º Sociales «Álgebra» se pone al fusionar, cuando esté en `main`.

**Lo que eligió el dueño (2026-11-17):** «Las recomendadas» (V1, V2, L1 «El ticket», L2 «La cadena de producción», M1 Gauss-Jordan y M2 deslizador del rango de Ciencias, J1 «¿Qué producto lo calcula?», J2 «El ticket escondido», J3 detective, J4 «Despeja la X» de Ciencias, J6 carrera y memoria). Después, «Sí, importa»: las lecciones de cálculo se importan de Ciencias tal cual y solo se escriben nuevas las de contexto económico (vale para los cuatro temas del bloque).

**Etapas y lecciones** (las mismas cinco etapas de Ciencias; ★ = propia):

| Etapa | Lecciones |
|---|---|
| `basics` | ★`data-tables`, `matrix-types`, `transpose-symmetric` |
| `operations` | `sum-scalar`, `matrix-product`, `product-properties`, ★`costs-profits`, ★`production-chain` |
| `rank` | `rank-gauss`, `rank-parameter` |
| `inverse` | `inverse-definition`, `gauss-jordan`, `matrix-powers` |
| `equations` | `matrix-equations`, `equation-systems`, ★`matrix-form-system` |

Fuera: `what-is-a-matrix` (la sustituye `data-tables`), `matrix-applications` (la sustituyen las dos de economía), `linear-dependence` y `commuting-matrices`.

## Hecho

**Fase 1+2, lecciones y contenido:**
- `lessons.tsx` mezcla las 4 lecciones propias (con `lessonTexts.ts`, `lessonChecks.ts` y 4 dibujos nuevos en `figures.tsx`: tabla → matriz, Q·(V − C), la cadena casas → ventanas → piezas y AX = B) con las 12 de `batx2-zientziak-matrizeak` (`matrizeakTopics`, importadas por id). Los tests comunes de lecciones leen el archivo fuente, así que solo ven las 4 propias; las importadas ya las prueba Ciencias.
- `content.ts`: diagnóstico 141001–141008 (6 de Ciencias con id nuevo y 2 propios), práctica 1–20 (5 propias), retos 101–115 (4 propios: ventas por días, cajas de botellas, beneficio anual (B − A)·D, A = Aᵗ sin inversa al estilo de la EBAU), banco 1–50 (10 propios: notas, autobuses, gastos, conservera, viviendas y ventanas, proveedores, rango con contexto, entradas de museo con AX = B, XA + 2I = A²). Lo de Ciencias se importa y se renumera con `{ ...item, id }`.
- Registro: `courses.ts` (`active: true`), router, `paths.ts`.
- **Test de otra unidad tocado:** `tests/matrizeak-batx2z-content.test.ts` comprobaba que la Matrices de Sociales no estaba activa; se quitó esa línea (lo mismo pasará con Determinantes y Sistemas).
- Test nuevo `tests/matrizeak-batx2g-content.test.ts`. 3267 tests, lint y tipos en verde.

**Fase 3, laboratorio:** 4 herramientas.
- **Propias (2)**, con predicción antes del resultado y retos infinitos (`freshFrom`):
  - L1 `ticket` «El ticket», retos 141101–141105: tres tablas (frutería, papelería, panadería) de 2 tiendas × 3 productos; se elige tiendas en filas ($Q$) o en columnas ($Q^t$), precios en columna o en fila, el orden y si el precio es de venta, coste o beneficio ($V-C$); de las ocho formas solo se pueden $QP$ y $P^tQ^t$, y las demás dicen por qué no. Se predice qué tienda tiene más. Pasos para las cantidades de la tienda elegida. Lógica en `lab/ticket.ts`.
  - L2 `production-chain` «La cadena de producción», retos 141151–141155: muebles, ropa y comedores; clientes → productos ($A$) → piezas ($B$) dibujados con los números de los caminos del cliente y la pieza elegidos; se cambia el pedido o la receta; $AB$ da clientes × piezas y $BA$ no se puede. Se predice qué cliente necesita más. Lógica en `lab/chain.ts`.
- **Prestadas (2):** el deslizador del rango y la máquina de Gauss-Jordan de Ciencias, con sus retos 116301–116305 y 116201–116205.
- **Test:** `tests/matrizeak-batx2g-lab.test.ts`. Revisado a 375 px en eu, es, ar y en con `getBBox`: nada se sale y los nombres caben en sus cajas.

**Fase 4, juegos:** 6 juegos, récords en `matella-matrizeak-batx2g-game-records`.
- **Propios (3):**
  - J1 `which-product` «¿Qué producto lo calcula?», niveles 141501–141503: una historia nombra 2 o 3 matrices (qué son filas y columnas, y su dimensión) y pregunta algo; cuatro expresiones, una buena (QV, NW, PQ; Q(V − C), AB, ABP, (Q + R)V, 2QV; QᵗV, VᵗQ, ABᵗ, QPᵗ, AᵗB). 15 plantillas en `games/whichProduct.ts`.
  - J2 `hidden-ticket` «El ticket escondido», niveles 141601–141603: Q·P = totales con un número tapado (un precio; una cantidad con 3 productos; un coste en Q(V − C)); una fila es una ecuación. `games/hiddenTicket.ts`.
  - J3 `detective`, niveles 141801–141803: 11 errores de Sociales (a_ij al revés, casilla a casilla, columna en vez de fila, QV − C; BA, 2Q con una fila, traspuesta girada; coeficientes por columnas, lado de A⁻¹, A en vez de A⁻¹, A + 1). `games/detective.ts`.
- **Prestado:** «Despeja la X» de Ciencias (componente `SolveXGame`) con niveles 141701–141703.
- **Carrera** 141401–141405: la de Ciencias sin las preguntas de combinación lineal ni de matrices que conmutan, y con preguntas propias la mitad de las veces en los circuitos 1, 2 y 5 (tabla, ingreso de una tienda, piezas de un pedido, x de AX = B). **Memoria** 141851–141853: fila de cantidades × columna de precios ↔ total, tabla ↔ traspuesta, sistema ↔ matriz de coeficientes.
- **Test:** `tests/matrizeak-batx2g-games.test.ts` (en «¿Qué producto…?» se dan números a las matrices y ninguna opción mala da lo mismo que la buena ni su traspuesta; el número tapado es el único que cuadra; casos del detective; la carrera no saca lo que los libros no traen). 3277 tests, lint y tipos en verde.

## Trucos

- El test común de lecciones parte las fórmulas por `\\`: un producto de matrices con columnas (`…\end{pmatrix}=\begin{pmatrix}228\\289…`) no pasa en el ejemplo. Escribe el ejemplo como cuentas (`12\cdot 9+30\cdot 4=228`).
- Node no importa `.tsx` en los tests: el orden de las lecciones se lee del fuente (`const order = [...]`).

**Cierre (2026-11-17):** 3277 tests, lint y build en verde; inventario OK (3 juegos propios más el detective, 4 herramientas, 2 de ellas propias). Revisado a 375 px en eu, es y ar con `getBBox` y medidas de la página: laboratorio, los seis juegos (en el nivel 3 del ticket escondido, $Q[V-C]$ no cabía: clase `soc-hidden-wide`, más pequeña y en una línea) y las lecciones propias. Hoja de euskera en `~/Documents/Matella-fuentes/batx2g-algebra/hojas/matrizeak-batx2g.html`, mandada al dueño.

**Al fusionar:** cambiar el «Antes de empezar» de `data-tables` y `matrix-form-system` a 1.º Sociales «Álgebra» si ya está en `main`.

## Publicación

- 2026-11-18: publicada en matella.net con la primera tanda de 2.º Sociales (`main` 2bbfdde, bundle `index-4g-iHeeL.js`). Comprobada en vivo a 375 px en eu, es y ar.
