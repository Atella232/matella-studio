# Inferentzia · 2.º Bachillerato Ciencias Sociales

Tema 13 de 2.º Sociales (`inferencia`, «Inferentzia Estatistikoa: Estimazioa / Inferencia estadística: estimación»), cuarto y último del bloque «Probabilidad e inferencia». Tema **nuevo** (sin gemelo en Ciencias). Carpeta `src/pages/batx2-gizarte-inferentzia`, `storagePrefix` `matella-inferentzia-batx2g`, rama `feat/inferentzia-batx2g` (cortada de `feat/laginketa-batx2g`), ids 153000–153999, puerto 5203.

Fuentes: Santillana 2.º Sociales U12 (intervalos de confianza, error, tamaño de muestra) y Anaya U12 §4–6 y U13 §3–5, más los exámenes EBAU del País Vasco (intervalos al 94, 95 y 96 %, problema inverso); ver `probabilitatea-batx2g.md`. Elección del dueño (2026-11-17, «las recomendadas»): I-L1 Cien intervalos (simulador que cuenta cuántos atrapan el valor verdadero), I-L2 El margen de error, I-J1 ¿Verdadero o falso? (interpretación), I-J2 Del intervalo a los datos, I-J4 detective; carrera y memoria propias. Sin I-L3, I-J3 ni diferencia de medias.

Convención aprobada: valores críticos de la tabla, el más cercano y el punto medio si hay empate (1,645 · 1,75 · 1,88 · 1,96 · 2,05 · 2,33 · 2,575, con `criticalZ` de `batx2-gizarte-banaketak/critical.ts`); n con raíz exacta; σ o p̂ elegidos para que el error salga exacto; el tamaño de muestra se redondea hacia arriba; notación p̂ y N(μ; σ).

## Fase 1: lecciones, figuras y contenido

- 15 lecciones en 5 etapas: `estimation` (point-estimate, confidence-level, critical-value), `mean-ci` (mean-interval, interpret, interval-to-data), `error-size` (error-margin, sample-size, what-changes), `proportion-ci` (proportion-interval, proportion-error, proportion-size), `decisions` (polls, compare-claim, level-or-size).
- Contenido: diagnóstico 153001–153008; práctica 1–20 (4 por etapa); retos 101–115 (3 por etapa); banco 1–50 (10 por etapa). Test `tests/inferentzia-batx2g-content.test.ts` (valores críticos, valores de la tabla, tamaños redondeados hacia arriba e intervalos recalculados).
- Registro: `courses.ts` (`inferencia` activo), router `InferentziaBatx2gPage`, `paths.ts`.
- Trucos: `${z}_{\\alpha/2}` en todos los idiomas (el test de euskera toma `$z` por sufijo pegado); resultados aproximados con `\\approx` (el test comprueba las igualdades).

## En curso

- Fase 1 hecha. Siguiente: laboratorio (I-L1 Cien intervalos, I-L2 El margen de error, ids 1531xx), juegos (I-J1 ¿Verdadero o falso?, I-J2 Del intervalo a los datos, I-J4 detective, carrera y memoria propias, ids 1534xx–1538xx), revisión a 375 px y cierre.
