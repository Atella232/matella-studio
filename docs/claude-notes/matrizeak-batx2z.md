# Matrizeak · 2.º Bachillerato Ciencias

Primer tema de 2.º Ciencias (curso `batx2-zientziak`, tema `matrices`), primero del bloque «Álgebra» del reparto en paralelo (ver `bachillerato.md`, «Reparto en paralelo de 2.º Ciencias»).

- **Carpeta:** `src/pages/batx2-zientziak-matrizeak`
- **`storagePrefix`:** `matella-matrizeak-batx2z`
- **Rama:** `feat/matrizeak-batx2z`, cortada de `main` 2a27cff
- **Bloque de ids:** 116000–116999 (diagnóstico 116001–116008, laboratorio propio 116101–116399, juegos 116401–116899)
- **Servidor de pruebas:** puerto 5181 (`.claude/launch.json` sin commit)

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U1 «Matrices» (solucionario; la capa de texto de las fórmulas está rota: se leyó por las marcas de página y algunas páginas como imagen) y Anaya Matemáticas II U1 «Álgebra de matrices» (solucionario). Exámenes de EBAU del País Vasco 2019–2022 para el estilo (la primera parte siempre es de álgebra: inversa según un parámetro, Mⁿ, sistemas con parámetro).
- **Textos y ejercicios:** todos propios. Del libro solo se saca el alcance.
- **Frontera con los otros dos temas del bloque:** aquí la inversa solo por Gauss-Jordan (y por sistema en 2 × 2) y el rango solo por Gauss; «¿tiene inversa según k?» se decide por el rango. Determinantes, adjunta y rango por menores van en `determinanteak`; Rouché, Cramer y discusión de sistemas, en `sistemak`.

**Lo que eligió el dueño («Las recomendadas», 2026-11-09):**
- **V1:** 16 lecciones en cinco etapas con las diez mejoras de la teoría, y «Antes de empezar» a 1.º (Gauss y matriz ampliada en Sistemas, combinación lineal en Vectores). **V2:** retos al estilo de la EBAU vasca (inversa según un parámetro, Mⁿ, ecuación matricial).
- **L propias:** L1 «Fila por columna», L2 «El mapa de rutas» (grafo y A²), L3 «La máquina de Gauss-Jordan», L4 «El deslizador del rango» (reutilizable en Determinantes y Sistemas).
- **M prestada:** M1 «La máquina de Gauss» de 1.º, tal cual.
- **J propios:** J1 «Dominó de dimensiones», J2 «Despeja la X», J3 «Potencia gigante», J5 detective de errores de matrices. **J6:** carrera y memoria.
- **Notación:** filas $E_1$, $E_2$… en los cuatro idiomas (como el Gauss de 1.º); rango `\operatorname{rg}` en los cuatro idiomas. Euskera: matrize iraulia, alderantzizko matrizea, heina, identitate-matrizea, matrize trukakorrak. Árabe: الرتبة (rango), الأبعاد (dimensión), المنقول (traspuesta).
- **Respuestas:** siempre un número (un elemento, un rango, un parámetro, cuántos caminos). Las matrices enteras solo en el banco, con la solución a la vista.

**Etapas y lecciones:**

| Etapa | Lecciones |
|---|---|
| `basics` | `what-is-a-matrix`, `matrix-types`, `transpose-symmetric` |
| `operations` | `sum-scalar`, `matrix-product`, `product-properties`, `matrix-applications` |
| `rank` | `linear-dependence`, `rank-gauss`, `rank-parameter` |
| `inverse` | `inverse-definition`, `gauss-jordan`, `matrix-powers` |
| `equations` | `matrix-equations`, `equation-systems`, `commuting-matrices` |

## Hecho

**Fase 1+2, lecciones y contenido** (commit c2d0234):
- 16 lecciones con las diez mejoras (`lessonTexts.ts`, `lessonChecks.ts`), 5 «¿Por qué funciona?», 16 dibujos (`figures.tsx`) y el arte de la portada. 5 enlaces «Antes de empezar» a `batx1-zientziak/sistemas` (`augmented-matrix`, `gauss-method`, `parameter-discussion`, `equivalent-systems`) y a `batx1-zientziak/vectores` (`linear-combination`).
- Contenido: diagnóstico 116001–116008, práctica 1–20, retos 101–115, banco 1–50 (4, 3 y 10 por etapa).
- **Piezas compartidas, exportadas** (para Determinantes, Sistemas y 2.º Sociales): `matrix.ts` (operaciones con fracciones exactas, tipos, operaciones de fila, `echelonSteps`, `rank`, `gaussJordan`, `inverse`, LaTeX de matrices y de operaciones `E_2-3E_1`) y `MatrixSvg.tsx` (`MatrixBlock`, una matriz dibujada en SVG con casillas coloreadas y barra de `(A | I)`).
- **Tests nuevos:** `tests/matrix-latex.ts` (lee cada `pmatrix` como números y comprueba cada igualdad entre expresiones de matrices: sumas, por números, productos, potencias, `^t`, `^{-1}`, `I` y `O`; con una tabla de matrices con nombre por texto; sirve para los otros dos temas del bloque), `tests/matrizeak-batx2z-content.test.ts` (unas 200 igualdades de matrices de lecciones, ejemplos, «Compruébalo», práctica, retos y banco; que el error típico de verdad está mal; que solo la respuesta buena de «Compruébalo» da el cálculo) y `tests/matrizeak-batx2z-matrix.test.ts` (Gauss y Gauss-Jordan con 500 matrices al azar).
- 2717 tests, lint y build en verde. Dibujos comprobados en euskera a 375 px con `getBBox`: ningún texto fuera.

**Fase 3, laboratorio** (commit 01bd4a0): 5 herramientas.
- **Propias (4),** con predicción antes del resultado y retos infinitos (`freshFrom`):
  - L1 `row-column` «Fila por columna», retos 116101–116105: A 2 × 3 por B 3 × 2 (tres pares); se elige la casilla $c_{ij}$ (también tocándola) y se cambian los tres números de esa columna de B. Se predice el signo de la casilla. Lógica en `lab/rowColumn.ts`.
  - L2 `route-map` «El mapa de rutas», retos 116151–116155: cuatro pueblos; tocar una flecha pone o quita una línea y cambia A; se predice si hay 0, 1 o más viajes con un transbordo y después se ve $A^2$ y los caminos. Lógica en `lab/routeMap.ts`.
  - L3 `gauss-jordan` «La máquina de Gauss-Jordan», retos 116201–116205: (A | I) de seis matrices (A, B, D, E con inversa; C y F sin ella); m·Eᵢ + k·Eⱼ con m 1–4 y k −6…6, «÷ pivote» y cambio de filas; fracciones exactas. Lógica en `lab/jordanMachine.ts`.
  - L4 `rank-slider` «El deslizador del rango», retos 116301–116305: cinco familias 3 × 3 con m de −4 a 6 (valores críticos 3; 2; 1; −2 y 1; 6); se predice el rango (1, 2 o 3) y ▶ recorre todos los m dejando el rango de cada uno en una tira. Lógica en `lab/rankSlider.ts` (exportada para Determinantes y Sistemas).
- **Prestada (1):** M1 «La máquina de Gauss» de 1.º, con sus retos 113101–113105, en la etapa del rango.
- **Test:** `tests/matrizeak-batx2z-lab.test.ts` (cada reto fijo se resuelve y ninguno empieza resuelto; los infinitos, con 150 semillas; $A^2$ cuenta caminos a fuerza bruta; la máquina de Gauss-Jordan llega a (I | A⁻¹) con sus propios límites de m y k en las cuatro matrices con inversa, y a una fila de ceros en las otras dos).
- Revisado en euskera a 375 px con `getBBox`: ningún texto fuera de los tableros.

## Trucos

- **Matrices en los tests comunes:** `lesson-texts.test.ts` quita `\begin{pmatrix}` y cambia `&` por espacios, y parte por `\\`. Una fila como `2 -3` se evalúa como 2 − 3: si una igualdad entre matrices escrita en `lessonTexts.ts` (ejemplo, casos, «¿Por qué?») fallara por eso, basta con reordenar la fórmula. De momento no ha pasado.
- **Orden de las fórmulas:** el test común compara las fórmulas de cada texto en orden con su forma (cada letra pasa a `x`): `$AB$` (dos letras) y `$c_{ij}$` no pueden cambiar de sitio entre idiomas; dos letras sueltas sí.
- **Ejemplos en general:** la tabla de matrices con nombre del test se aplica solo a «Resolvemos» y sus pasos (la idea clave habla de una $A$ cualquiera).
- **Respuestas con decimal exacto:** si la respuesta es $\frac{1}{5}$, la explicación tiene que escribir también $0{,}2$ (el test busca la forma decimal).

## En curso

- Siguiente paso: fase 4, juegos (J1, J2, J3, J5, carrera y memoria). Después, cierre (inventario, 375 px en eu, es y ar, hoja de euskera).
