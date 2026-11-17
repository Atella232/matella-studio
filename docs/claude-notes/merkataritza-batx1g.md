# Merkataritza-aritmetika · 1.º Bachillerato Ciencias Sociales

Segundo tema del bloque «Números y álgebra» de 1.º Sociales: curso `batx1-gizarte`, tema `aritmetica-mercantil`.

- **Carpeta:** `src/pages/batx1-gizarte-merkataritza`
- **`storagePrefix`:** `matella-merkataritza-batx1g`
- **Rama:** `feat/merkataritza-batx1g`, cortada de `feat/errealak-batx1g` (bebb614).
- **Bloque de ids:** 131000–131999 (diagnóstico 131001–131008, laboratorio propio 131101–131399, juegos 131401–131899; práctica 1–20, retos 101–115, banco 1–50).
- **Servidor de pruebas:** puerto 5191 (`.claude/launch.json` sin commit).
- **Reutilizar:** `dbh4-aplikatuak-proportzionaltasuna` (porcentajes, interés), `dbh4-akademikoak-errealak` (%), `batx1-zientziak-segidak` (progresiones geométricas).

## Fuentes y alcance

- **Fuente:** solo Anaya Matemáticas aplicadas a las CCSS I, U2 (edición `Suma_Piezas`, solucionario). Textos y ejercicios propios.
- **Orden del libro:** porcentajes e índice de variación → interés compuesto y periodos de capitalización → TAE → amortización de préstamos (tabla) → progresiones geométricas → anualidades de capitalización y de amortización.

## Diseño elegido (2026-11-17, «las recomendadas»)

V1 + L1, L2, L3 + J1, J2, J3.
- **Etapas:** `percent`, `interest`, `tae`, `savings`, `loans`.
- **Lecciones (14):** importadas sin tocar `index`, `chained` (4.º aplicadas), `percent-inverse` (4.º académicas), `compound-interest`, `periods` (4.º aplicadas) y `geometric` (1.º Ciencias, sucesiones); propias `interest-time`, `tae`, `tae-costs`, `geometric-sum`, `pension`, `loan-payment`, `amortization-table`, `pending-debt`.
- **Laboratorio propio:** L1 `double` «¿Cuándo se duplica?», L2 `table` «El cuadro de amortización», L3 `tae` «La TAE crece». Prestadas de 4.º aplicadas: barra del 100 %, encadenados, tique, simple o compuesto, meses y días.
- **Juegos propios:** J1 `offer` «¿Qué oferta es mejor?», J2 `gaps` «La tabla con huecos», J3 detective; carrera y memoria nuevas; prestados de 4.º aplicadas: banco y caja.

## Hecho

**Fase 1+2 (lecciones y contenido):**
- `lessonChecks.ts` y `lessonTexts.ts` con las 8 lecciones propias; las importadas se colocan con `borrowed(topics, id, stage)` en `lessons.tsx`.
- Dibujos propios `PensionFigure` (cinco ingresos, cada uno crece sus años) y `AmortizationFigure` (pago igual: intereses que bajan, amortización que sube), y `GizMoneyHeroArt`; `interest-time` usa `CompoundInterestFigure` de 4.º académicas.
- Diagnóstico 131001–131008, práctica 1–20, retos 101–115 y banco 1–50 (4/3/10 por etapa). Todos los resultados con decimales se calcularon con Python.
- Test `tests/merkataritza-batx1g-content.test.ts`. Tests, lint y `tsc -b` en verde. Revisado a 375 px en eu, es y ar: las 14 lecciones, resumen, práctica, banco, retos y diagnóstico.

**Fase 3 (laboratorio), 8 herramientas:**
- **Propias (3),** con predicción y retos sin fin:
  - L1 `double` «¿Cuándo se duplica?», retos 131101–131105: interés 1–12 % y objetivo ×1,5, ×2 o ×3; escalera de capitales; predice si hacen falta menos, justo o más de 10 años; regla del 72.
  - L2 `table` «El cuadro de amortización», retos 131201–131205: tres préstamos, anualidad en pasos de 100 €; barras de la deuda año a año; predice si queda deuda, a cero o de más (a cero = la anualidad a la centena).
  - L3 `tae` «La TAE crece», retos 131301–131305: interés 1–12 % y pago anual, semestral, trimestral, mensual o diario; barras de lo que la TAE pasa al nominal; predice si pasa de 0,25 puntos.
- **Prestadas (5)** de 4.º aplicadas con sus ids: barra del 100 %, encadenados (de 2.º), tique, simple o compuesto, meses y días.
- Test `tests/merkataritza-batx1g-lab.test.ts`. Tests y lint en verde; revisado a 375 px en eu, es y ar sin desbordes.

## Trucos

- Euskera: «% 15eko», «% 4an» llevan sufijo pegado al número y los tests lo prohíben: se escribe «interesa % 4 dela», «BEZa % 21 bada», «komisioa % 2 da».
- Inglés: los números de 4 cifras fuera de las fórmulas van con coma (2,000) también en los enunciados de las lecciones.
- TAE en euskera: «urteko tasa baliokidea».

- `(1+0,08/12)^12` da 8,29995 %: «al menos 8,3 %» no se cumple con el 8 %. Comprobar los umbrales con código.

## En curso

- Fases 1+2 y 3 hechas. Sigue la fase 4 (juegos: J1 `offer`, J2 `gaps`, J3 detective; carrera, memoria; banco y caja de 4.º aplicadas).
