# Probabilitatea · 2.º Bachillerato Ciencias

Tema 13 de 2.º Ciencias (curso `batx2-zientziak`, tema `probabilidad`), primero del bloque «Probabilidad» del reparto en paralelo (ver `bachillerato.md`). Solo Ciencias; las piezas de probabilidad se dejan exportadas para 2.º Sociales.

- **Carpeta:** `src/pages/batx2-zientziak-probabilitatea`
- **`storagePrefix`:** `matella-probabilitatea-batx2z`
- **Rama:** `feat/probabilitatea-batx2z`, cortada de `main` 2a27cff
- **Bloque de ids:** 128000–128999 (diagnóstico 128001–128008, laboratorio propio 128101–128399, juegos 128401–128899)
- **Servidor de pruebas:** puerto 5185 (`.claude/launch.json` propio, sin commit)

## Fuentes

Santillana 2.º Bach Ciencias U13 «Probabilidad» (solucionario, pp. 318–340) + Anaya 2.º Bach Ciencias U13 «Azar y probabilidad» (solucionario, pp. 389–411); estilo de problemas de los exámenes de EBAU del País Vasco, Matemáticas II 2017–2022. La ficha y los textos extraídos están fuera del repositorio, en `~/Documents/Matella-fuentes/batx2z-probabilitatea/`.

**Solapamiento con 4.º académicas** (`dbh4-akademikoak-probabilitatea`): ya enseña sucesos, operaciones y De Morgan, frecuencia, Laplace, propiedades, árboles, con y sin devolución, tablas, condicionada (con la prueba P(A/B) = P(A)), probabilidad total (y «hacia atrás» con dos urnas) y combinatoria. Lo nuevo de 2.º: espacio de sucesos (2ⁿ) y sistema completo, diferencia A − B y las cuatro regiones, axiomas y sus consecuencias, probabilidades a partir de otras, regla del producto encadenada, independencia con la prueba del producto (independientes ≠ incompatibles, contrarios de independientes), tablas a partir de porcentajes, probabilidad total con n causas, Bayes (a priori y a posteriori), pruebas diagnósticas y experimentos en dos tiempos.

## Propuesta enviada al dueño (2026-11-09)

Notación de 4.º: P(A), \overline{A}, P(A/B). 15 lecciones en 4 etapas: «Antes de empezar» (3 lecciones de repaso de 4.º) y álgebra de sucesos, condicionada e independencia, total y Bayes (12 nuevas). Menú: L1 pinta el suceso (Venn), L2 las cuatro regiones (Venn con probabilidades), L3 el cuadrado de probabilidad (independencia = cortes alineados), L4 las causas en el cuadrado (total y Bayes como áreas), L5 1000 personas (prueba diagnóstica), L6 de una urna a otra (opcional); M1 herramientas prestadas de 4.º; J1 ¿independientes, incompatibles o ninguno?, J2 rellena el Venn, J3 ¿quién fue? (ordenar las a posteriori), J4 detective de 2.º; M2 árbol y tabla de 4.º con niveles nuevos; carrera y memoria. V2 probabilidad geométrica (solo Anaya) a elección del dueño.

## Elección del dueño (2026-11-09)

«Las recomendadas»: V1 (15 lecciones, sin la probabilidad geométrica), L1–L5, M1 (herramientas de 4.º), J1–J4, M2 (árbol y tabla de 4.º con niveles nuevos), carrera y memoria. L6 (de una urna a otra) no.

## Fase 1: lecciones y contenido

- **Etapas y lecciones (15):** `review` «Hasi aurretik: 4. DBHko errepasoa» (`review-events`, `review-compound`, `review-counting`, con enlaces a 4.º ak Probabilidad y Combinatoria), `events` (`event-space`, `event-algebra`, `axioms`, `from-data`), `conditional` (`conditional`, `product-rule`, `independence`, `percent-tables`) y `bayes` (`total-probability`, `bayes`, `diagnostic-tests`, `two-stage`). Las lecciones nuevas también enlazan a la lección de 4.º en la que se apoyan.
- **Diez mejoras de la teoría** desde el principio: `lessonTexts.ts` (definiciones, vocabulario, explicación corta, «Otro ejemplo» con números propios, 9 «¿Por qué funciona?») y `lessonChecks.ts` (error típico y «Compruébalo»).
- **Figuras nuevas** (`figures.tsx`, 15): dado de 12 caras en Venn, árbol de dos extracciones, elegir 2 de 10, ruleta partida en un sistema completo, las cuatro zonas de un dado, Venn con probabilidades (axiomas y tres datos), la condición como nuevo total, tres pilas seguidas, el cuadrado de dos independientes (cortes a la misma altura), tabla del gimnasio, árbol de la fábrica, barras a priori / a posteriori, árbol de 10 000 personas y la bola que pasa de I a II. Cada una dibuja los números de su «Resolvamos». Ayudas internas `Venn`, `ZoneValue`, `Ball`, `Sub`.
- **Contenido:** diagnóstico 128001–128008; práctica 1–20 (repaso 2, y 6 por etapa nueva); retos 101–115 (3, 4, 4, 4); banco 1–50 (8, 14, 14, 14). Respuestas exactas (fracción o decimal que acaba) con `readStatisticsAnswer`.
- **Test** `tests/probabilitatea-batx2z-content.test.ts`: recuentos por etapa, ids del bloque, KaTeX, mismas fórmulas en los cuatro idiomas, sufijos del euskera, igualdades, y las probabilidades de las lecciones, retos y banco **recalculadas contando todos los casos** (extracciones ordenadas sin devolución, pasar una bola de una urna a otra, dos dados).
- **Trucos:** las letras de los sucesos son las mismas en los cuatro idiomas (A, B, D, E, M, N), definidas con palabras en cada idioma; en euskera nada de «% 1ek», «% 99an», «% 34ra»: se reescribe («Biztanleen % 1 gaixo dago», «% 34 izatera»). Un enunciado de «Otro ejemplo» tiene 30 palabras como mucho (en castellano).
- **Revisión:** las 15 lecciones a 375 px en eu y ar sin desbordes ni textos que se pisen o se salgan de las figuras (medido con `getBBox`); figuras vistas ampliadas en eu.

## En curso

- Fase 1 (lecciones y contenido) hecha; falta el commit con tests, lint y build en verde.
- Siguiente paso: fase 2, laboratorio (L1 pinta el suceso, L2 las cuatro zonas, L3 el cuadrado, L4 las causas en el cuadrado, L5 1000 personas, y las prestadas de 4.º).
