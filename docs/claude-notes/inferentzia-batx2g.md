# Inferentzia · 2.º Bachillerato Ciencias Sociales

Tema 13 de 2.º Sociales (`inferencia`, «Inferentzia Estatistikoa: Estimazioa / Inferencia estadística: estimación»), cuarto y último del bloque «Probabilidad e inferencia». Tema **nuevo** (sin gemelo en Ciencias). Carpeta `src/pages/batx2-gizarte-inferentzia`, `storagePrefix` `matella-inferentzia-batx2g`, rama `feat/inferentzia-batx2g` (cortada de `feat/laginketa-batx2g`), ids 153000–153999, puerto 5203.

Fuentes: Santillana 2.º Sociales U12 (intervalos de confianza, error, tamaño de muestra) y Anaya U12 §4–6 y U13 §3–5, más los exámenes EBAU del País Vasco (intervalos al 94, 95 y 96 %, problema inverso); ver `probabilitatea-batx2g.md`. Elección del dueño (2026-11-17, «las recomendadas»): I-L1 Cien intervalos (simulador que cuenta cuántos atrapan el valor verdadero), I-L2 El margen de error, I-J1 ¿Verdadero o falso? (interpretación), I-J2 Del intervalo a los datos, I-J4 detective; carrera y memoria propias. Sin I-L3, I-J3 ni diferencia de medias.

Convención aprobada: valores críticos de la tabla, el más cercano y el punto medio si hay empate (1,645 · 1,75 · 1,88 · 1,96 · 2,05 · 2,33 · 2,575, con `criticalZ` de `batx2-gizarte-banaketak/critical.ts`); n con raíz exacta; σ o p̂ elegidos para que el error salga exacto; el tamaño de muestra se redondea hacia arriba; notación p̂ y N(μ; σ).

## Fase 1 (010ef184): lecciones, figuras y contenido

- 15 lecciones en 5 etapas: `estimation` (point-estimate, confidence-level, critical-value), `mean-ci` (mean-interval, interpret, interval-to-data), `error-size` (error-margin, sample-size, what-changes), `proportion-ci` (proportion-interval, proportion-error, proportion-size), `decisions` (polls, compare-claim, level-or-size).
- Contenido: diagnóstico 153001–153008; práctica 1–20 (4 por etapa); retos 101–115 (3 por etapa); banco 1–50 (10 por etapa). Test `tests/inferentzia-batx2g-content.test.ts` (valores críticos, valores de la tabla, tamaños redondeados hacia arriba e intervalos recalculados).
- Registro: `courses.ts` (`inferencia` activo), router `InferentziaBatx2gPage`, `paths.ts`.
- Trucos: `${z}_{\\alpha/2}` en todos los idiomas (el test de euskera toma `$z` por sufijo pegado); resultados aproximados con `\\approx` (el test comprueba las igualdades).

## Fases 2 y 3 (8483e601 y el commit de cierre): laboratorio y juegos

- Laboratorio (`lab/`): propias **cien intervalos** (`hundred.ts`, retos 153101–153103: N(50; 10), 100 muestras por tanda con semilla fija (tanda y n), intervalo x̄ ± z·σ/√n, cuenta cuántos atrapan μ; la tanda inicial es la 7 porque da 95 de 100 al 95 %) y **el margen de error** (`margin.ts`, retos 153121–153123: nivel, σ o p̂ y n frente al intervalo del 95 %). Prestadas con sus retos e ids: la tabla de la normal (`lookup`, 2.º Ciencias) y la franja del k % (`band`, Banaketak de Sociales).
- Juegos (`games/`): propios **¿Verdadero o falso?** (`truth.ts`: significado, cambios y frases con números; 153501–153503, 8 rondas, mitad verdaderas) y **Del intervalo a los datos** (`backwards.ts`: x̄ o E, n, el nivel; 153601–153603); **detective** con errores de este tema (`detective.ts`, 153701–153703); **carrera** propia de 5 circuitos (`race.ts`, 153401–153405) y **memoria** propia (`boards.ts`: nivel ↔ z, intervalo ↔ x̄, intervalo ↔ E; 153801–153803).
- Tests `tests/inferentzia-batx2g-lab.test.ts` y `tests/inferentzia-batx2g-games.test.ts`. Inventario OK. Revisado a 375 px en eu, es y ar. Hoja de euskera: `~/Documents/Matella-fuentes/batx2g-probabilidad/hoja-euskera-inferentzia.html`.
- Trucos: la herramienta Write deja `\u00a0` como espacio no separable real dentro de las plantillas y el lint lo rechaza: pasar el archivo por un script que lo vuelva a escribir como `\\u00a0`.
