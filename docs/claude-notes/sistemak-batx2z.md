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

## En curso

- 2026-11-11: fuentes leídas (ficha fuera del repositorio, `~/Documents/Matella-fuentes/batx2z-algebra/ficha-sistemas.md`). Propuesta de diseño mandada al dueño; **se espera su respuesta antes de escribir código.**
- Ojo al construir: `work()` y `same()` solo con fórmulas (ver la nota de Determinantes); probar una lección con `\begin{array}{ccc|c}` y `\begin{cases}` contra el test común `lesson-texts` antes de escribir todas; enseñar a `tests/matrix-latex.ts` a comprobar una solución en un `\begin{cases}`.
