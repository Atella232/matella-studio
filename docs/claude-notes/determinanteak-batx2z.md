# Determinanteak · 2.º Bachillerato Ciencias

Segundo tema de 2.º Ciencias (curso `batx2-zientziak`, tema `determinantes`), segundo del bloque «Álgebra» del reparto en paralelo (ver `bachillerato.md`, «Reparto en paralelo de 2.º Ciencias»).

- **Carpeta:** `src/pages/batx2-zientziak-determinanteak`
- **`storagePrefix`:** `matella-determinanteak-batx2z`
- **Rama:** `feat/determinanteak-batx2z`, cortada de `feat/matrizeak-batx2z` (baddf42)
- **Bloque de ids:** 117000–117999 (diagnóstico 117001–117008, laboratorio propio 117101–117399, juegos 117401–117899)
- **Servidor de pruebas:** puerto 5181 (`.claude/launch.json` sin commit)

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U2 «Determinantes» (solucionario; fórmulas con la capa de texto rota, leído por las marcas de página) y Anaya Matemáticas II U2 «Determinantes». Exámenes de EBAU del País Vasco para el estilo (inversa según un parámetro con $|A|=0$, propiedades de un determinante sabiendo otro).
- **Textos y ejercicios:** todos propios.
- **Frontera:** aquí determinante, propiedades, menores y adjuntos, desarrollo, rango por menores e inversa con la adjunta. Cramer y Rouché van en `sistemak`.
- **Reutiliza de `matrizeak`:** `matrix.ts` (fracciones, operaciones de fila), `MatrixSvg.tsx`, y en los tests `tests/matrix-latex.ts`.

## Diseño elegido (2026-11-10, «las recomendadas»)

- **Etapas (5) y lecciones (16):** orden 2 y 3 (`det-two`, `sarrus`, `zero-det`), propiedades (`transpose-swap`, `scale-row`, `add-multiple`, `product-det`), menores y desarrollo (`minors-cofactors`, `laplace`, `order-four`, `det-equations`), rango por menores (`rank-by-minors`, `rank-parameter-minors`) e inversa por adjuntos (`adjugate-inverse`, `inverse-parameter`, `det-matrix-equations`). Ids de etapa: `orders`, `properties`, `expansion`, `rank`, `inverse`.
- **Notación:** $|A|$ en los cuatro idiomas; filas $E_1, E_2$; rango `\operatorname{rg}`; adjunta `\operatorname{Adj}(A)`. Respuestas: siempre un número (`fraction()`).
- **Menú:** L1 el paralelogramo, L2 la máquina de propiedades, L3 el tablero de signos, L4 el deslizador del determinante · M1 el deslizador del rango de `matrizeak` · J1 ¿Qué le pasa al determinante?, J2 ¿Cero sin calcular?, J4 detective, J5 carrera y memoria · V1 lecciones con las diez mejoras, V2 retos al estilo EBAU.

## Fases hechas

- **Fase 1+2 (lecciones y contenido):** 16 lecciones con `lessonTexts.ts` y `lessonChecks.ts` (cinco «¿Por qué funciona?»: `det-two`, `zero-det`, `add-multiple`, `product-det`, `adjugate-inverse`); diagnóstico 117001–117008; práctica 1–20, retos 101–115 y banco 1–50 (4/3/10 por etapa). Lógica exportada en `determinant.ts` (`det`, `minor`, `cofactor`, `cofactorMatrix`, `inverseByCofactors`, `expansionTerms`, `sarrusTerms`, `minorsOfOrder`, `rankByMinors`, `detLatex`) y dibujo en `DeterminantSvg.tsx` (`DeterminantBlock`), para Sistemas y para 2.º Sociales. Test `tests/determinanteak-batx2z-content.test.ts`; `tests/matrix-latex.ts` ahora lee `vmatrix` como su valor, `|X|` como el determinante de lo de dentro y casillas `{-4}`.

## Trucos

- El test común `lesson-texts.test.ts` parte `\begin{vmatrix}` por filas y cambia `&` por espacios: una casilla negativa que no sea la primera de su fila (`1&-4`) se lee como una resta. En las fórmulas de `lessonTexts.ts` se escribe `{-4}`; el lector de `tests/matrix-latex.ts` quita esas llaves.
- En el test de contenido, la línea mala de un error típico puede tener pasos bien hechos (`|…|=1\cdot 4+2\cdot 3=10`): basta con que un paso falle.

## En curso

- Fase 1+2 hecha (ver commit). Siguiente: fase 3, laboratorio (L1–L4 con ids 117101–117399, más M1 con sus ids de `matrizeak`), y su test `tests/determinanteak-batx2z-lab.test.ts`.
