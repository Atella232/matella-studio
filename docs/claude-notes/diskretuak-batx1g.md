# Diskretuak · 1.º Bachillerato Ciencias Sociales

Tema 10 de 1.º Sociales (curso `batx1-gizarte`, tema `distribuciones-discretas`), primero del bloque «Probabilidad» del reparto en paralelo de 1.º Sociales (ver `bachillerato.md`). Unidad propia, más sencilla que su pareja de 2.º Ciencias (`batx2-zientziak-banaketak`), con contextos de economía y sociedad; reutiliza piezas (importa, no edita) de `batx2-zientziak-banaketak`, `batx2-zientziak-probabilitatea`, `dbh4-akademikoak-probabilitatea` y `dbh4-akademikoak-konbinatoria`.

- **Carpeta:** `src/pages/batx1-gizarte-diskretuak`
- **`storagePrefix`:** `matella-diskretuak-batx1g`
- **Rama:** `feat/diskretuak-batx1g` (cortada de `main` 70894bdb)
- **Bloque de ids:** 139000–139999 (diagnóstico 139001–139008, laboratorio propio 139101–139399, juegos 139401–139899)
- **Servidor de pruebas:** puerto 5194 (`.claude/launch.json` propio, sin commit)

## Fuentes

Anaya 1.º Bach MACS, Suma Piezas U9 «Distribuciones de probabilidad de variable discreta» (solucionario, pp. 251–271) + Estándar U10 (solucionario de la edición anterior, pp. 243–261). En el texto extraído de Suma Piezas faltan las fracciones: todos los números se calculan con código. Ficha fuera del repositorio, en `~/Documents/Matella-fuentes/batx1g-probabilidad/ficha-diskretuak.md`.

## Al fusionar

- «Antes de empezar» solo enlaza a lo que ya está en `main` (ESO, 1.º y 2.º Ciencias). El enlace a 1.º Sociales Estadística (`batx1-gizarte-estatistika`, otro bloque) se pone al fusionar.

## Elección del dueño (2026-11-17)

«Las recomendadas»: V1 (14 lecciones en 4 etapas, sin F(x) ni variable continua), L1 Galton, L2 Ajusta los datos, L3 La rifa justa (L4 urna, no), J1 ¿A qué casilla?, J2 Traduce el suceso, J3 ¿Merece la pena?, J4 detective; prestados «¿Es binomial?», carrera y memoria. A1: notación de la web, `P(X = k)` y `B(n;\,p)`. A2: respuestas exactas (p en décimas, n pequeño); decimales largos en ejercicios abiertos con ≈. A3: en el ajuste se corrigen p, los esperados y la mayor diferencia; **regla de Matella**: se acepta si la mayor diferencia no pasa del 5 % del total (guía práctica, no prueba exacta; dicha así en la lección).

## Fase 1 · lecciones y contenido

- **Etapas:** `review`, `variable`, `binomial`, `fit`. **Lecciones (14):** compound, orders · random-variable, probability-table, mean-sd, expected-gain · galton, is-binomial, binomial-formula, binomial-events, binomial-parameters · fit-p, expected-values, good-fit.
- **Prestado (importado, sin editar):** `TrialsFigure`, `binomialPmfDecimal` y `choose` de `batx2-zientziak-banaketak`; `readStatisticsAnswer` de 2. DBH.
- **«Antes de empezar» enlaza a:** 4.º ak Probabilidad (`dependent`, `trees`, `independent`, `fair-games`), 4.º ak Combinatoria (`binomial`, `pascal`), 1.º Ciencias Estadística (`variance-sd`, `coefficient-variation`). Al fusionar, se podría cambiar a 1.º Sociales Estadística si su sesión tiene esas lecciones.
- **Contenido:** diagnóstico 139001–139008; práctica 20 (3/6/8/3), retos 101–115 (2/4/6/3), banco 50 (6/14/20/10). Ejemplo de ajuste común a las tres lecciones de la etapa 4: 80 grupos de 3 clientes, observados 11, 27, 33, 9, $B(3;\,0{,}5)$, esperados 10, 30, 30, 10, mayor diferencia 3 = 3,75 %.
- **Tests:** `tests/diskretuak-batx1g-content.test.ts` (recuentos, ids, KaTeX, idiomas, igualdades, respuestas recalculadas con la binomial exacta y el ajuste con la regla del 5 %).
- **Trucos:** el test de notación de la idea clave exige que las letras de la idea clave salgan en la lección (`x_i`, `p_i`, `P(X=k)`): se añadieron en definiciones y explicaciones. `coinFaces` vive en `coins.ts` (react-refresh no deja exportar funciones desde `figures.tsx`). Un `\u00a0` escrito tal cual en el archivo rompe el lint (irregular whitespace).
- Revisado a 375 px en eu, es y ar: los 14 dibujos medidos con `getBBox`, sin textos fuera ni pisados.

## Fase 2 · laboratorio

- **Herramientas propias (3):** `galton` (Galtonen tresna: 1–10 filas, p en décimas para inclinar el tablero, +10/+100 bolas con semilla, ▶ «Suelta una bola» sigue su camino; elegir casilla muestra C(n, k) y P(k); predicción: la casilla más probable, a la izquierda, en el centro o a la derecha), `raffle` (Zozketa bidezkoa: 100/200/500 boletos, precio, premio gordo, premios pequeños; dinero que entra contra el que sale y ganancia media exacta en céntimos; predicción: desfavorable, justo o favorable), `fit` (Doitu datuak: tres tablas —80 grupos de 3 clientes, 100 piezas de 2 soldaduras, 50 familias de 4 hijos—, p de 0,05 en 0,05 y botón p = x̄/n; barras esperadas, |diferencias| y la regla del 5 %; predicción: menor, igual o mayor que el 5 %).
- **Prestadas:** `pascal` (4.º ak Combinatoria), `build` y `machine` (2.º Ciencias Banaketak), con sus ids y retos. El inventario las cuenta como propias porque están en otra carpeta de Bachillerato: las propias de verdad son 3.
- **Ids:** retos 139101–139103 (galton), 139111–139113 (fit), 139121–139123 (raffle); cada una con retos sin fin (`freshFrom`).
- **Tests:** `tests/diskretuak-batx1g-lab.test.ts` (Galton: caminos, barras, moda, semilla, 2000 bolas cerca de la teoría; rifa: ganancia exacta; ajuste: p estimada, 3,75 %, 12 %, 2,5 %, ninguna p salva las soldaduras).
- **Trucos:** los textos árabes de las pizarras van con `Label` (test `figures-arabic-label`); con `Label`, una etiqueta alineada a la izquierda se deja en x = 30 también en árabe (Label da la vuelta al ancla). El `x̄` con macron se ve mal en los botones: el botón usa `MathText`. Los «€» van con espacio no separable para que no salten de línea.
- Revisado a 375 px en eu, es, en y ar: las 6 herramientas con la predicción hecha, sin textos fuera ni desbordes laterales.

## Fase 3 · juegos

- **Propios:** `galton` (¿A qué casilla?: 1) flechas → casilla, con «contar las de la izquierda» y «numerar desde 1» como errores; 2) cuántos caminos, con 2ⁿ y la fila de encima de Tartaglia; 3) probabilidad con tablero recto, con 1/(n + 1) y 1/2ⁿ), `events` (Traduce el suceso: 1) palabra → símbolo ≥, >, ≤, <, =; 2) el contrario: 1 − P(X = 0), 1 − P(X = 0) − P(X = 1), 1 − P(X = n), qⁿ; 3) el número en B(3 o 4; p en décimas), con el borde movido y el complementario), `worth` (¿Merece la pena?: rifas, dados y dos monedas; 1) ganancia media; 2) desfavorable/justo/favorable, dos de cada; 3) precio justo, con la media simple de los premios y el premio gordo solo), `detective` (12 errores de esta unidad en 3 niveles: tabla, binomial, ajuste).
- **Prestado:** `binomial` («¿Es binomial?» de 2.º Ciencias, el componente importado con la info y los ids de esta unidad). **Genéricos:** carrera de 4 circuitos (12 tipos de pregunta, `meta` comprobada en los tests) y memoria (casilla ↔ C(n, k), B(n; p) ↔ μ, N y B(n; 0,5) ↔ esperado).
- **Ids:** carrera 139401–139404, casilla 139501–139503, suceso 139551–139553, merece 139601–139603, binomial 139651–139653, detective 139701–139703, memoria 139801–139803.
- **Tests:** `tests/diskretuak-batx1g-games.test.ts`.
- **Trucos:** en «¿Merece la pena?» el nivel 1 no saca juegos justos (ganancia 0 = precio − μ, dos opciones iguales). En el detective, la suma P(X = k) + … se salía a 375 px: se escribe 1 − P(X ≤ k − 1). Inventario OK: 4 juegos propios y 3 herramientas propias de verdad (el script cuenta como propias las prestadas de otra carpeta de Bachillerato).
- Revisado a 375 px en es y ar: los seis juegos de rondas en sus tres niveles, sin desbordes.

## En curso

- Fases 1 (0ea6b3c0), 2 (a377edc6) y 3 hechas. Queda: repaso a 375 px en eu de lecciones y laboratorio con la versión final, hoja de euskera, y después el tema `normala` (rama `feat/normala-batx1g` cortada de esta).
