# Banaketak · 2.º Bachillerato Ciencias Sociales

Tema 11 de 2.º Sociales (`binomial-normal`), segundo del bloque «Probabilidad e inferencia». Carpeta `src/pages/batx2-gizarte-banaketak`, `storagePrefix` `matella-banaketak-batx2g`, rama `feat/banaketak-batx2g` (cortada de `feat/probabilitatea-batx2g`), ids 151000–151999, puerto 5203. Fuente: Santillana 2.º Sociales U11 sin su parte de muestreo (ver `probabilitatea-batx2g.md`). Elección del dueño: «las recomendadas» (B-L1 Mil encuestas, B-L2 La franja del k %, B-J1 La nota de corte, B-J2 ¿Quién destaca más?, B-J3 detective; prestadas de Ciencias machine, bell, lookup, approx, juegos area y hunt, carrera y memoria).

## Fase 1: lecciones y contenido

- `critical.ts`: `inverseZ` (valor de la tabla más cercano; punto medio en empate) y `criticalZ(nivel)`: 50 → 0,67; 80 → 1,28; 90 → 1,645; 94 → 1,88; 95 → 1,96; 96 → 2,05; 98 → 2,33; 99 → 2,575. `inverseZ` solo da $z\ge 0$: para colas izquierdas se usa $1-p$ y se cambia el signo. Lo usarán Muestreo e Inferencia.
- **Etapas y lecciones (14):** `discrete` (`random-variable`, `mean-variance`, `expected-gain`), `binomial` (`is-binomial`, `binomial-formula`, `binomial-mean`), `normal` (`normal-curve`, `standard-table`, `standardize`, `compare-scores`, `inverse-normal`) y `approximation` «Intervalos y aproximación» (`characteristic-interval`, `binomial-to-normal`, `continuity`). Sin densidades (no las trae Sociales). «Antes de empezar» enlaza a 4.º ak, 1.º Ciencias Estadística y la Probabilidad de 2.º Sociales (tema 1 de esta rama).
- **Contenido:** diagnóstico 151001–151008; práctica 20 (5 por etapa); retos 101–115 (4, 4, 4, 3); banco 50 (12, 13, 13, 12). Valores de la normal con los cuatro decimales de la tabla de `batx2-zientziak-banaketak/normal.ts`.
- **Test** `tests/banaketak-batx2g-content.test.ts` (recalcula cada valor de la normal y de la binomial, y los valores críticos).
- **Fuera de la carpeta:** courses, router, paths y `tests/banaketak-batx2z-content.test.ts` (la línea que decía que la de Sociales no estaba activa).
- **Trucos:** el test de sufijos lee `$z` como sufijo «-z»: se escribe `${z}`; en las ideas clave (takeaway) ni eso (el test de notación no lo entiende): se reescribe sin `z` al principio. «% 95eko», «7ko», «1etik», «0ra» → reescritos. En inglés, miles con coma también en euros (€2,250).

## Fase 2: laboratorio

- **Propias:** `surveys` «Mila inkesta / Mil encuestas» (`surveys.ts`, 151101–151103): n y p; ▶ repite la encuesta 1000 veces con semilla fija y apila los resultados sobre las barras exactas; la campana aparece si $np\ge 5$ y $nq\ge 5$. Predicción: qué parte cae en μ ± σ (menos de la mitad, dos tercios, casi todas). `band` «% k-ko zerrenda / La franja del k %» (`band.ts`, 151121–151123): μ, σ y nivel (50–99 %); la franja μ ± z·σ. Predicción: más estrecha, igual o más ancha que μ ± 2σ (95 % cuenta como igual).
- **Prestadas** de 2.º Ciencias: `machine`, `lookup`, `bell`, `approx`. 6 herramientas. Test `tests/banaketak-batx2g-lab.test.ts`.
- **Truco:** un texto árabe dentro del dibujo va con `Label` (lo exige `figures-arabic-label.test.ts`).

## Fase 3: juegos

- **Propios:** `cutoff` «Ebaketa-nota / La nota de corte» (151501–151503: onenak, txarrenak, erdiko tartea), `standout` «Nork nabarmentzen du gehiago? / ¿Quién destaca más?» (151601–151603: z mayor, |z| mayor, tres personas; casi siempre gana quien no tiene la nota más alta) y `detective` (151701–151703: órdenes olvidados, σ = npq, 1 − pⁿ; P(Z > k) leída directa, dividir entre la varianza, signo negativo, cola equivocada; radio sin σ, valor crítico en 0,95, corrección al revés).
- **Prestados** de 2.º Ciencias: carrera (sus circuitos 2–5 son aquí 1–4, 151401–151404), «¿Qué área es?» (151811–151813), «Busca en la tabla» (151821–151823) y memoria (151801–151803). Test `tests/banaketak-batx2g-games.test.ts`.

## Cierre (2026-11-18)

- Commits en `feat/banaketak-batx2g`: WIP `4949ec24`, fase 1 `49043fb4`, fases 2–3 y nota en el commit siguiente.
- 3309 tests, lint y build en verde; inventario OK.
- Revisado a 375 px en eu, es y ar: las 14 lecciones con todos los pasos (textos de los dibujos medidos), las dos herramientas propias con la predicción hecha y el ▶, y los juegos propios respondiendo una ronda (dos líneas del detective que se salían, acortadas).
- Hoja de euskera: `~/Documents/Matella-fuentes/batx2g-probabilidad/hoja-euskera-banaketak.html`.
