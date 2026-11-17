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

## Fase 1 · lecciones y contenido

- **Etapas:** `review`, `continuous`, `normal`, `approximation`, `fit`. **Lecciones (15):** histogram, standard-score · density, straight-density · normal-curve, sigma-rule, standard-table, table-symmetry, standardize, inverse · binomial-to-normal, continuity · fit-parameters, fit-expected, fit-decision.
- **Prestado (importado):** `normal.ts` (tabla, `below`/`above`/`between`, `inverseTable`, `tableLatex`, `phiDensity`) y `binomialPmfDecimal` de Banaketak.
- **«Antes de empezar»:** 1.º Ciencias Estadística (`charts`, `standard-scores`) y Diskretuak de esta rama (`mean-sd`, `binomial-parameters`, `good-fit`).
- **Contenido:** diagnóstico 140001–140008; práctica 20 (3/4/7/3/3), retos 101–115 (2/3/5/2/3), banco 50 (6/10/18/8/8). Ejemplo de ajuste: 80 estaturas 150–190 con 15, 25, 25, 15 → x̄ = 170, s = 10 exactos; esperados 12,696 y 27,304 con las clases extremas abiertas; mayor diferencia 2,304 = 2,88 %.
- **Tests:** `tests/normala-batx1g-content.test.ts` (recuentos, ids, KaTeX, idiomas, igualdades, valores de la tabla recalculados y el ajuste de las 80 estaturas).
- **Trucos:** en las plantillas, la z va como constante `Z = '{z}'`; un script de shell con `${...}` lo para la comprobación de seguridad: usar el editor. `const P` o `const T` en `lessons.tsx` rompen react-refresh (parecen componentes): se llaman `tableBelow`, `tableOf`. En euskera, «% 20k» y «% 50ek» pegan sufijo: se reescriben («etxeen % 20 da…», «herritarren erdiak…»).
- Revisado a 375 px en eu, es y ar: los 15 dibujos medidos con `getBBox` y ninguna fórmula se sale.

## En curso

- Fase 1 hecha. Siguiente: fase 2, laboratorio (L1 Del histograma a la campana, L2 Construye una densidad, L3 Ajusta a una normal; prestadas `bell`, `lookup`, `approx` de Banaketak y `score` de 1.º Ciencias), ids 140101–140399. Después, fase 3 (juegos, ids 140401–140899) y hoja de euskera.
