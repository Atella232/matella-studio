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

- **Fase 3 (laboratorio):** cuatro herramientas propias en `lab/`, cada una con predicción, 5 retos fijos y retos sin fin:
  - L1 `parallelogram` (`parallelogram.ts`, retos 117101–117105): las columnas $u=(a,c)$ y $v=(b,d)$ como flechas que se arrastran (o con los pasos), en −3…3; $|A|$ es el área con signo; ▶ desliza $v$ a lo largo de $u$ y el área no cambia.
  - L2 `property-machine` (`propertyMachine.ts`, 117151–117155): matrices A, B, C (|A| = 6, 2, 5); cambiar filas, multiplicar una fila por 2 o 3, o sumar $k$ veces otra ($k$ de −3 a 3, sin 0); se predice qué le pasa a $|A|$ y luego se aplica. `TRIANGLE_ROUTES` deja cada una triangular.
  - L3 `sign-board` (`signBoard.ts`, 117201–117205): determinantes A, B, D de orden 3 y C de orden 4 con el tablero de signos; se predice cuántos adjuntos pide la línea elegida.
  - L4 `det-slider` (`detSlider.ts`, 117301–117305): cinco familias con $k$ de −3 a 3, $|A(k)|$ como curva; se predice el signo; ▶ dibuja la curva. Exporta `DET_FAMILIES`, `detAt`, `detCurve` y `rootsIn` para Sistemas.
  - M1: `RankSliderTool` de `matrizeak`, sin cambios y con sus ids 116301–116305.
  - Test `tests/determinanteak-batx2z-lab.test.ts`. Revisado a 375 px en eu, es y ar con la predicción hecha.

## Trucos

- El test común `lesson-texts.test.ts` parte `\begin{vmatrix}` por filas y cambia `&` por espacios: una casilla negativa que no sea la primera de su fila (`1&-4`) se lee como una resta. En las fórmulas de `lessonTexts.ts` se escribe `{-4}`; el lector de `tests/matrix-latex.ts` quita esas llaves.
- En el laboratorio, el título vasco «Determinantearen graduatzailea» no cabía junto al botón de la lección a 375 px (la palabra larga no se parte): se llama «Determinantea, k aldatzean». Las etiquetas de predicción han de ser cortas: tres botones en una fila.
- `-0`: `ad-bc` puede dar `-0` y `assert.equal` lo distingue de `0`; se suma `+ 0`.
- En el test de contenido, la línea mala de un error típico puede tener pasos bien hechos (`|…|=1\cdot 4+2\cdot 3=10`): basta con que un paso falle.

## En curso

- Fases 1+2 y 3 hechas (ver commits). Siguiente: fase 4, juegos (J1 ¿Qué le pasa al determinante?, J2 ¿Cero sin calcular?, J4 detective, carrera y memoria; ids 117401–117899) y su test `tests/determinanteak-batx2z-games.test.ts`. Después, el cierre: inventario, revisión a 375 px, hoja de euskera y nota final.
