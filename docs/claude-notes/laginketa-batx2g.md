# Laginketa · 2.º Bachillerato Ciencias Sociales

Tema 12 de 2.º Sociales (`muestreo`, «Lagin Estatistikoak / Muestras estadísticas»), tercero del bloque «Probabilidad e inferencia». Tema **nuevo** (sin gemelo en Ciencias). Carpeta `src/pages/batx2-gizarte-laginketa`, `storagePrefix` `matella-laginketa-batx2g`, rama `feat/laginketa-batx2g` (cortada de `feat/banaketak-batx2g`), ids 152000–152999, puerto 5203.

Fuentes: Anaya 2.º Sociales U11 (muestreo), el principio de Santillana U11 (población, muestra, tipos de muestreo, todas las muestras de tamaño 2) y de U12 (TCL, distribución de X̄ y de p̂), Anaya U12 §1–3 y U13 §1–2 (ver `probabilitatea-batx2g.md`). Elección del dueño (2026-11-17, «las recomendadas»): M-L1 La urna de las medias, M-L2 Muchas muestras, M-J1 ¿Hay sesgo?, M-J2 Reparte la muestra, M-J4 detective; prestadas la muestra estratificada de 4.º ak y la muestra de 3.º; carrera y memoria. Sin M-L3 ni M-J3.

## Fase 1 (b5587d69): lecciones, figuras y contenido

- 15 lecciones en 5 etapas: `sampling` (population-sample, bias, simple-systematic), `strata` (proportional-allocation, equal-allocation, all-samples), `means` (sample-mean-distribution, central-limit, sum-distribution), `proportions` (sample-proportion, proportion-distribution, proportion-probability), `characteristic` (mean-interval, proportion-interval, bigger-sample).
- Contenido: diagnóstico 152001–152008; práctica 1–20 (4 por etapa); retos 101–115 (3 por etapa, 10/20/30); banco 1–50 (10 por etapa). Test `tests/laginketa-batx2g-content.test.ts` (valores de la tabla, valores críticos y repartos por mayores restos recalculados).
- Registro: `courses.ts` (`muestreo` activo), router `LaginketaBatx2gPage`, `paths.ts`.
- Trucos: en euskera nunca `$z=` ni `$z_{` (el test lo toma por sufijo pegado): se escribe `${z}=` y `${z}_{\\alpha/2}`, salvo en el «takeaway» (el test de notación se confunde), que va sin fórmula. «50eko lagina» → «50 laguneko lagina». Cuidado con `String.replace` en Node: `` en el texto de reemplazo inserta el resto del archivo; usa `split/join`.

## En curso

- Fase 1 hecha. Siguiente: laboratorio (M-L1 La urna de las medias y M-L2 Muchas muestras, propios, ids 1521xx; prestadas `strata` de 4.º ak estadística y `sample` de 3.º estadística), después juegos (M-J1 ¿Hay sesgo?, M-J2 Reparte la muestra, M-J4 detective, carrera y memoria propias, ids 1524xx–1528xx), revisión a 375 px y cierre.
