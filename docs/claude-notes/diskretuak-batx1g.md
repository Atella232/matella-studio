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

## En curso

- Fase 1 hecha (commit de este cambio). Siguiente: fase 2, laboratorio (L1 Galton, L2 Ajusta los datos, L3 La rifa justa, y prestadas `build`/`machine` de banaketak y `pascal` de 4.º), ids 139101–139399.
