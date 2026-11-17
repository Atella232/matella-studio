# Normala · 1.º Bachillerato Ciencias Sociales

Tema 11 de 1.º Sociales (curso `batx1-gizarte`, tema `distribucion-normal`), segundo y último del bloque «Probabilidad» del reparto en paralelo de 1.º Sociales (ver `bachillerato.md`). Unidad propia, más sencilla que la parte normal de `batx2-zientziak-banaketak`; reutiliza (importa, no edita) `normal.ts`, herramientas y juegos de esa unidad.

- **Carpeta:** `src/pages/batx1-gizarte-normala`
- **`storagePrefix`:** `matella-normala-batx1g`
- **Rama:** `feat/normala-batx1g`, cortada de `feat/diskretuak-batx1g` (35505503)
- **Bloque de ids:** 140000–140999 (diagnóstico 140001–140008, laboratorio propio 140101–140399, juegos 140401–140899)
- **Servidor de pruebas:** puerto 5194 (el mismo `.claude/launch.json`, sin commit)

## Fuentes

Anaya 1.º Bach MACS, Suma Piezas U10 «Distribuciones de probabilidad de variable continua» (solucionario, pp. 273–291) + Estándar U11 (edición anterior). **Ojo:** la lista del curso dice A11 porque la edición Estándar la numera U11; en Suma Piezas es la U10. En el texto extraído faltan fracciones: todo se calcula con código. Ficha fuera del repositorio: `~/Documents/Matella-fuentes/batx1g-probabilidad/ficha-normala.md`.

## Elección del dueño (2026-11-17)

«Las recomendadas»: V1 (15 lecciones, 5 etapas), L1 Del histograma a la campana, L2 Construye una densidad, L3 Ajusta a una normal; J1 ¿Qué porcentaje?, J2 ¿Es una densidad?, J3 Nota de corte, J4 detective; prestados de Banaketak (bell, lookup, approx, area, hunt) y `score`. A1 N(μ; σ) y P(Z ≤ k); A2 densidades de trozos rectos; A3 regla del 5 % también aquí; A4 μ y σ redondos en los ejercicios cerrados.

## En curso

- Fase 1 a medias (commit WIP de este cambio): `lessonChecks.ts`, `lessons.tsx`, `lessonTexts.ts`, `figures.tsx`, `content.ts` e `index.tsx` escritos y registrados (courses, router, paths). Pasan los tests de lecciones, tsc y lint de la carpeta.
- Falta de la fase 1: `tests/normala-batx1g-content.test.ts` (copiar el de diskretuak y comprobar los valores de la tabla y las z exactas), `npm test` completo, build, y revisar los 15 dibujos a 375 px en eu, es y ar (con `getBBox`).
- Después: fase 2 (laboratorio L1–L3 + prestadas, ids 140101–140399) y fase 3 (juegos J1–J4 + prestados, carrera de 5 circuitos, memoria; ids 140401–140899), hoja de euskera.
