# Teoría 1. DBH: las mejoras de 2. DBH en las 143 lecciones (2026-11-04)

El dueño pidió llevar a 1., 3., 4. académicas y 4. aplicadas el contenido de las diez mejoras de la teoría de 2. DBH (receta en `teoria-dbh2.md`), con una sesión por curso. Esta es la de 1. DBH. Rama `feat/teoria-dbh1`, desde main 23a7dbc. Una unidad por commit; sin fusionar ni publicar (lo hace la sesión madre).

## Progreso

- Zenbaki naturalak (14, a1d3c63): «¿Por qué?» en rounding, divide, powers, powers-of-ten. Dibujo tras los pasos: rounding, problems. Arreglado: tres fórmulas de pasos con puntos de miles (15.728, 1.967, 14.823).
- Zatigarritasuna (12): «¿Por qué?» en divisors (parejas), criteria-sum (cada decena es 9 + 1), divisor-table (3 · 3 combinaciones). Dibujo tras los pasos: primes, factorization, divisor-table, gcd. 3 enlaces a Zenbaki naturalak (divide ×2, powers).

- Zenbaki osoak (14): «¿Por qué?» en compare-absolute (deber 15 € es peor que deber 5 €), subtract (restar deshace sumar) y multiply (el patrón de la tabla del −3). Dibujo tras los pasos: order. 3 enlaces a Zenbaki naturalak (order, brackets, divide). Arreglado: el «Vamos a resolver» de subtract era el submarino (−100 + 55, una suma) y sus pasos calculaban (−6) − (−1): ahora pide «Calcula (−6) − (−1)». La lista de order iba en una sola fórmula y se salía 12 px a 375 px (ya pasaba en la web): ahora una fórmula por número, con «،» en árabe.

## Trucos

- Redondear enteros: en `lessonTexts.ts` con flecha (`38\,592\to 38\,600`), no con `\approx`: el test lee `\approx` como redondeo de decimales y falla con 30 de diferencia.
- `say` de los archivos nuevos cambia `{,}` por `.` en árabe, como el de Hamartarrak.
- Scripts del trabajo (en la carpeta temporal de la sesión): volcar las lecciones evaluando `lessons.tsx` con los dibujos vacíos; quitar `explanation`/`example` con el analizador de TypeScript; copiar el título exacto de la lección enlazada para `needs`.
