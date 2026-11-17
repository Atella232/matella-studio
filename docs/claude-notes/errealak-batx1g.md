# Zenbaki errealak · 1.º Bachillerato Ciencias Sociales

Primer tema del bloque «Números y álgebra» de 1.º Sociales: curso `batx1-gizarte`, tema `numeros-reales`.

- **Carpeta:** `src/pages/batx1-gizarte-errealak`
- **`storagePrefix`:** `matella-errealak-batx1g`
- **Rama:** `feat/errealak-batx1g`, cortada de `main` (70894bd). Los temas siguientes del bloque (`merkataritza`, `aljebra`) se cortan de esta.
- **Bloque de ids:** 130000–130999 (diagnóstico 130001–130008, laboratorio propio 130101–130399, juegos 130401–130899). Práctica 1–20, retos 101–115 y banco 1–50, como en 2.º Ciencias; las herramientas prestadas conservan sus ids.
- **Servidor de pruebas:** puerto 5191 (`.claude/launch.json` sin commit).
- **Gemelo:** `batx1-zientziak-errealak` (se importa, no se edita).

## Fuentes y alcance

- **Fuente:** solo Anaya Matemáticas aplicadas a las CCSS I, U1 (edición `Suma_Piezas`, solucionario; la de `Estandar`/`Saber_Hacer` es la edición antigua). Textos y ejercicios propios.
- **Orden del libro:** conjuntos y lenguaje → recta real, intervalos y valor absoluto → radicales → logaritmos → aproximaciones, errores y notación científica. Los problemas finales (ofertas, repartos, grifos…) son de proporcionalidad y porcentajes: aquí solo dan contextos a los ejercicios; las herramientas de `dbh4-aplikatuak-proportzionaltasuna` quedan para `merkataritza`.
- **Fuera:** binomio de Newton y números combinatorios (el libro de Sociales no los trae).

## Diseño elegido (2026-11-17, «las recomendadas»)

V1 + L1, L2, L3 + J1, J2, J3.
- **Lecciones (16):** 11 de 1.º Ciencias importadas sin tocar (se cambia solo la etapa, con `borrowed()` en `lessons.tsx`) y 5 propias con contextos sociales.
- **Etapas:** `numbers`, `line`, `radicals`, `logs`, `errors` (no `sets`: es id de lección).

| Etapa | Lecciones (★ propias) |
|---|---|
| `numbers` | `sets`, ★`number-kinds`, ★`set-language` |
| `line` | `interval-sets`, `absolute-value`, `neighbourhoods` |
| `radicals` | ★`radical-power`, `radical-ops`, `rationalize` |
| `logs` | `logarithms`, ★`log-integer`, `log-unknown` |
| `errors` | `significant`, `relative`, ★`big-numbers`, `scientific-errors` |

- **Laboratorio propio:** L1 «El mismo error, distinto peso» (error relativo de dos cantidades muy distintas), L2 «¿Cuántas cifras tiene?» (regla logarítmica, parte entera), L3 «La coma viajera» (normalizar la notación científica). Prestadas: intervalos, distancia, redondeo, sacar factores, índice común, conjugado y cambio de base.
- **Juegos propios:** J1 «Ordena la economía», J2 «El titular justo», J3 detective. Carrera y memoria nuevas; prestados de Ciencias: sitúa en la recta, construye el intervalo, simplifica el radical, encuentra el exponente.
- **Para los otros temas:** «¿cuántos años tarda en duplicarse?» va en `merkataritza`, no aquí.

## Hecho

**Fase 1+2 (lecciones y contenido):**
- `lessonChecks.ts` y `lessonTexts.ts` solo con las 5 lecciones propias (los tests comunes leen los ids de `lessons.tsx` con el patrón `id: '…', stage:`, y las importadas no lo tienen).
- Dibujo propio `DigitsLogFigure` (potencias de 10 alrededor de 345 000) y `GizRealsHeroArt`; las otras lecciones propias usan `NumberSetsFigure` y `ScientificFigure` de 4.º aplicadas y `FractionalFigure` de 4.º académicas.
- Diagnóstico 130001–130008, práctica 1–20, retos 101–115 y banco 1–50 (4/3/10 por etapa), con datos de votos, presupuestos, sueldos, precios y población.
- Test `tests/errealak-batx1g-content.test.ts`. 3265 tests, lint y `tsc -b` en verde. Revisado a 375 px en eu, es y ar: 16 lecciones, resumen, inicio, diagnóstico, práctica, banco y retos; sin desbordes ni errores de KaTeX.

## Trucos

- `lesson-texts`: «3,4» dentro de `\{3,4,5\}` se lee como el decimal 3,4: el ejemplo no puede repetir esas parejas del error típico.
- `takeaway-notation`: la idea clave no puede usar `n` y `N` a la vez (lo lee como la misma letra en mayúscula): en `log-integer` va `k`.
- Las definiciones tienen que llevar las fórmulas en el mismo orden en los cuatro idiomas.

## En curso

- Fase 1+2 hecha. Sigue la fase 3 (laboratorio: L1–L3 y prestadas).
