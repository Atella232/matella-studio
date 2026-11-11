# Banaketak · 2.º Bachillerato Ciencias

Tema 14 de 2.º Ciencias (curso `batx2-zientziak`, tema `binomial-normal`), segundo y último del bloque «Probabilidad» del reparto en paralelo (ver `bachillerato.md`). Solo Ciencias; las piezas de binomial y normal se dejan exportadas para 1.º y 2.º Sociales.

- **Carpeta:** `src/pages/batx2-zientziak-banaketak`
- **`storagePrefix`:** `matella-banaketak-batx2z`
- **Rama:** `feat/banaketak-batx2z`, cortada de `feat/probabilitatea-batx2z`
- **Bloque de ids:** 129000–129999 (diagnóstico 129001–129008, laboratorio propio 129101–129399, juegos 129401–129899)
- **Servidor de pruebas:** puerto 5185 (el mismo `.claude/launch.json` del bloque)

## Fuentes

Santillana 2.º Bach Ciencias U14 «Distribuciones binomial y normal» (solucionario, pp. 342–362; la página 18 del PDF tiene el texto roto) + Anaya 2.º Bach Ciencias U14 «Distribuciones de probabilidad» (solucionario, pp. 413–435); estilo de problemas de la EBAU del País Vasco, Matemáticas II 2017–2022 (normal con porcentajes, normal inversa, binomial y su aproximación con n grande). Ficha y textos fuera del repositorio, en `~/Documents/Matella-fuentes/batx2z-probabilitatea/`.

**Lo que ya existe:** números combinatorios y Tartaglia (4.º ak Combinatoria), esperanza (4.º ak Probabilidad), media, σ y puntuación típica de datos (1.º Ciencias Estadística), independencia y regla del producto (tema 13 de este bloque). Lo nuevo: variable aleatoria discreta (función de probabilidad, de distribución, μ y σ), binomial, variable continua y función de densidad, normal con su tabla, tipificación y búsqueda inversa, y la aproximación de la binomial por la normal con corrección de continuidad.

## Propuesta enviada al dueño (2026-11-10)

Ver el mensaje de la sesión. 15 lecciones en 5 etapas (repaso, variable discreta, binomial, continua y normal, aproximación); L1–L5 y J1–J4 propios; la tabla N(0, 1) calculada con código y comprobada en los tests.

## Elección del dueño (2026-11-11)

«Las recomendadas»: V1 (15 lecciones; sin la función de distribución F(x), que solo trae Santillana, y con densidades de trozos rectos, áreas de rectángulos y triángulos, sin integrales), L1–L5, J1–J4, carrera y memoria.

**Convención de respuestas** (la web solo acepta valores exactos): Φ sale de la tabla de 4 decimales calculada con código; las restas usan esos valores redondeados, como los libros; z sale exacta con 2 decimales; σ exacta (npq cuadrado perfecto); las binomiales de muchos decimales van en preguntas abiertas o de elegir.

La rama se puso al día con `main` (e4dc4f8, primera tanda de 2.º publicada, con Probabilidad) antes de empezar.

## Fase 1 · lecciones y contenido

- **Módulos propios (exportados para Sociales):** `normal.ts` (Φ por serie, `tableValue` = Φ redondeada a 4 decimales para z = 0,00…3,99, `below`/`above`/`between` en diezmilésimas, `inverseTable` con empates a `null`: 0,95 y 0,995 nunca se preguntan, `standardize`, `tableLatex`, `zLatex`) y `binomial.ts` (`choose`, `binomialPmf` exacta con fracciones, `binomialBetween/AtMost/AtLeast`, `binomialMean`, `binomialVariance`, `approximable` y `binomialPmfDecimal` en logaritmos para n grande).
- **Etapas:** `review`, `discrete`, `binomial`, `normal`, `approximation`. **Lecciones (15):** review-combinatorial, review-mean-sd · random-variable, mean-variance, expected-value · is-binomial, binomial-formula, binomial-parameters · density, normal-curve, standard-table, standardize, inverse-normal · binomial-to-normal, continuity. Notación: `B(n;\,p)`, `N(\mu;\,\sigma)`, `P(Z\le k)` (con punto y coma por la coma decimal).
- **«Antes de empezar» enlaza a:** 4.º ak Combinatoria (`binomial`, `pascal`), 4.º ak Probabilidad (`fair-games`, `independent`), 1.º Ciencias Estadística (`variance-sd`, `standard-scores`) y el tema 13 de esta rama (`independence`, `product-rule`).
- **Contenido:** diagnóstico 129001–129008; práctica 20 (2/4/5/5/4), retos 101–115 (2/3/3/4/3), banco 50 (6/10/12/12/10). Los valores de la normal se escriben con `tableLatex(below(z))` en las plantillas, así que el texto y la respuesta salen del mismo cálculo.
- **Tests:** `tests/banaketak-batx2z-content.test.ts` comprueba la tabla (valores conocidos, monotonía, |tabla − Φ| ≤ 0,00005), la binomial (suma 1, μ = np, σ² = npq, la versión decimal), recalcula cada respuesta normal desde μ, σ y x exigiendo z exacta con dos decimales y búsquedas inversas sin empate, y compara cada aproximación con corrección de continuidad con la binomial exacta (diferencia < 0,01).
- **Trucos:** el test de sufijos del euskera lee `$z` como sufijo «-z»: la z va como `{z}` (`${z}=…$`; en las plantillas, la constante `Z`). La fracción exacta de la binomial se desborda desde n ≈ 40 (5¹⁰⁰): los dibujos usan `binomialPmfDecimal`. Las fórmulas largas de los pasos aprietan el texto de al lado en pantalla ancha: una cuenta corta por paso y el resto en el texto. Con σ = 3, 4, 6 u 8 las z de la corrección de continuidad no salen con dos decimales: en la aproximación solo σ = 2; 2,5; 5 o 10.

## En curso

- Fase 1 escrita y en verde (tests, lint, tsc); falta la revisión final a 375 px en eu, es y ar y el commit.
- Siguiente paso: fase 2, laboratorio L1–L5 (ids 129101–129399).
