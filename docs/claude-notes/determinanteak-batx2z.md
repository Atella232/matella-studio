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

## En curso

- 2026-11-10: fuentes leídas (ficha fuera del repositorio). Propuesta de diseño mandada al dueño; **se espera su respuesta antes de escribir código.**
- Ojo al construir: el test común `lesson-texts.test.ts` parte `\begin{vmatrix}` por filas; un determinante con una casilla negativa que no sea la primera de su fila (`1&-4`) se lee como una resta. Probar una lección antes de escribir todas; si falla, escribir `{-4}` o dejar las cuentas en los pasos de `lessons.tsx`. Enseñar a `tests/matrix-latex.ts` a leer `vmatrix` como su determinante y `|A|` desde la tabla de matrices.
