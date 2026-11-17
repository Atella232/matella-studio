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

**Fase 3 (laboratorio), 10 herramientas:**
- **Propias (3),** con predicción y retos sin fin (`freshFrom`):
  - L1 `weight` «El mismo error, distinto peso», retos 130101–130105: sueldo y café, país y pueblo, piso y menú; un paso de error para cada cantidad; predice qué error relativo pesa más; barras con el error como parte del valor (barra entera = 26 %).
  - L2 `digits` «¿Cuántas cifras tiene?», retos 130201–130205: N = m · 10ᵉ en una regla logarítmica de cuatro potencias; predice si log N está más cerca de e o de e + 1 (el punto medio es 3,16).
  - L3 `comma` «La coma viajera», retos 130301–130305: cinco datos económicos (deuda, PIB, parados, un mensaje, votos); al cambiar el exponente la coma se mueve; predice si el exponente científico baja, se queda o sube; ▶ lleva la coma hasta la notación científica (solo el dibujo).
- **Prestadas (7)** de `batx1-zientziak-errealak/lab/labTools.ts` con sus ids: intervalos, distancia, índice común, sacar factores, conjugado, cambio de base y redondeo.
- Test `tests/errealak-batx1g-lab.test.ts`. 3269 tests y lint en verde. Revisado a 375 px en eu, es y ar: las 10 herramientas con la predicción hecha; sin desbordes ni texto fuera del tablero.

**Fase 4 (juegos), 9 juegos:**
- **Propios:** `order` «Ordena la economía» 130501–130503 (cuatro datos, tocar de menor a mayor; niveles: notación científica, formas mezcladas, números pequeños); `headline` «El titular justo» 130601–130603 (redondeos a 1–4 cifras, el más corto con error relativo bajo 5 %, 1 %, 0,1 %); `detective` 130701–130703 (12 errores de esta unidad).
- **Carrera** 130401–130405: circuitos 0, 2 y 3 propios; 1 y parte del 4 usan `generateBachRealsRaceQuestion` de Ciencias. **Memoria** 130801–130803 (raíces, logaritmos, notación científica).
- **Prestados de Ciencias:** sitúa en la recta 130811–813, intervalo 130821–823, radical 130831–833, exponente 130841–843.
- Test `tests/errealak-batx1g-games.test.ts`. 3275 tests, lint y build en verde; inventario OK. Revisado a 375 px en eu, es y ar: centro y los 9 juegos (niveles 1 y 3), sin desbordes ni errores de KaTeX.

**Hoja de euskera:** `~/Documents/Matella-fuentes/batx1g-errealak/hojas/errealak-batx1g-euskara.html` (fuera del repositorio), enviada al dueño el 2026-11-17.

## Trucos

- `lesson-texts`: «3,4» dentro de `\{3,4,5\}` se lee como el decimal 3,4: el ejemplo no puede repetir esas parejas del error típico.
- `takeaway-notation`: la idea clave no puede usar `n` y `N` a la vez (lo lee como la misma letra en mayúscula): en `log-integer` va `k`.
- Las definiciones tienen que llevar las fórmulas en el mismo orden en los cuatro idiomas.

- `lab/labTools.ts` importa el tipo de etapa de `lessons.tsx` con `import type`: así los tests de node lo pueden cargar.
