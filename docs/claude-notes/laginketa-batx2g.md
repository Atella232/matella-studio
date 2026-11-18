# Laginketa · 2.º Bachillerato Ciencias Sociales

Tema 12 de 2.º Sociales (`muestreo`, «Lagin Estatistikoak / Muestras estadísticas»), tercero del bloque «Probabilidad e inferencia». Tema **nuevo** (sin gemelo en Ciencias). Carpeta `src/pages/batx2-gizarte-laginketa`, `storagePrefix` `matella-laginketa-batx2g`, rama `feat/laginketa-batx2g` (cortada de `feat/banaketak-batx2g`), ids 152000–152999, puerto 5203.

Fuentes: Anaya 2.º Sociales U11 (muestreo), el principio de Santillana U11 (población, muestra, tipos de muestreo, todas las muestras de tamaño 2) y de U12 (TCL, distribución de X̄ y de p̂), Anaya U12 §1–3 y U13 §1–2 (ver `probabilitatea-batx2g.md`). Elección del dueño (2026-11-17, «las recomendadas»): M-L1 La urna de las medias, M-L2 Muchas muestras, M-J1 ¿Hay sesgo?, M-J2 Reparte la muestra, M-J4 detective; prestadas la muestra estratificada de 4.º ak y la muestra de 3.º; carrera y memoria. Sin M-L3 ni M-J3.

## Fase 1 (b5587d69): lecciones, figuras y contenido

- 15 lecciones en 5 etapas: `sampling` (population-sample, bias, simple-systematic), `strata` (proportional-allocation, equal-allocation, all-samples), `means` (sample-mean-distribution, central-limit, sum-distribution), `proportions` (sample-proportion, proportion-distribution, proportion-probability), `characteristic` (mean-interval, proportion-interval, bigger-sample).
- Contenido: diagnóstico 152001–152008; práctica 1–20 (4 por etapa); retos 101–115 (3 por etapa, 10/20/30); banco 1–50 (10 por etapa). Test `tests/laginketa-batx2g-content.test.ts` (valores de la tabla, valores críticos y repartos por mayores restos recalculados).
- Registro: `courses.ts` (`muestreo` activo), router `LaginketaBatx2gPage`, `paths.ts`.
- Trucos: en euskera nunca `$z=` ni `$z_{` (el test lo toma por sufijo pegado): se escribe `${z}=` y `${z}_{\\alpha/2}`, salvo en el «takeaway» (el test de notación se confunde), que va sin fórmula. «50eko lagina» → «50 laguneko lagina». Cuidado con `String.replace` en Node: `` en el texto de reemplazo inserta el resto del archivo; usa `split/join`.

## Fases 2 y 3 (6ee4d11c y el commit de cierre): laboratorio y juegos

- Laboratorio (`lab/`): propias **urna de las medias** (`urn.ts`, retos 152101–152103: todas las muestras de tamaño n con reemplazamiento, kⁿ, media de medias = μ y desviación σ/√n contadas de la lista) y **muchas muestras** (`many.ts`, retos 152121–152123: 500 muestras con semilla fija de un gasto no normal, μ = 20 y σ² = 600, o de sí/no con p = 0,3; campana N(μ; σ/√n), predicción «cerca del 95 % en μ ± 2σ»). Prestadas con sus retos e ids: `sample` (3.º estadística, 56101–) y `strata` (4.º ak estadística).
- Juegos (`games/`): propios **¿Hay sesgo?** (`bias.ts`: 6 estudios con un plan bueno y dos sesgados; niveles «buena o sesgada», «elige la buena», «qué muestreo es»; 152501–152503) y **Reparte la muestra** (`allocate.ts`: exacta, mayores restos, al revés; 152601–152603); **detective** con errores de este tema (`detective.ts`, 152701–152703); **carrera** propia de 5 circuitos (`race.ts`, 152401–152405) y **memoria** propia (`boards.ts`: N y n ↔ h, σ y n ↔ σ/√n, p y n ↔ √(pq/n); 152801–152803).
- Tests `tests/laginketa-batx2g-lab.test.ts` y `tests/laginketa-batx2g-games.test.ts`. Inventario OK (2+2). Revisado a 375 px en eu, es y ar (lecciones, ejercicios, laboratorio y juegos). Hoja de euskera: `~/Documents/Matella-fuentes/batx2g-probabilidad/hoja-euskera-laginketa.html`.
- Trucos: las etiquetas de los botones con listas (`{2, 4, 6}`) se invierten en árabe: envolverlas con LRI/PDI (`\u2066…\u2069`). Un `node -e '…'` con comillas simples dentro del texto rompe el shell: escribir el script en un archivo del scratchpad.

## Publicación

- 2026-11-18: publicada en matella.net con la primera tanda de 2.º Sociales (`main` 2bbfdde, bundle `index-4g-iHeeL.js`). Comprobada en vivo a 375 px en eu, es y ar.
