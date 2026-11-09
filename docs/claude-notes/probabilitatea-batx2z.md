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

Commit 7c923c4 (2710 tests, lint y build en verde).

## Fase 2: laboratorio

- **Propias** (en `lab/`, lógica pura exportada en `.ts`, con predicción y retos infinitos):
  - `paint` «Margotu gertaera / Pinta el suceso» (`events.ts`, retos 128101–128103): las cuatro zonas de un Venn se pintan tocándolas (o con los botones); 20 expresiones (A, Ā, A ∩ B̄, (A − B) ∪ (B − A), ∅, E…) cubren los 16 conjuntos de zonas, y el resultado da todos los nombres de lo pintado, así que De Morgan se ve solo. Predicción: cuántas zonas ocupa el suceso elegido.
  - `zones` «Lau zonak / Las cuatro zonas» (`zones.ts`, 128121–128123): P(A), P(B) y P(A ∩ B) en centésimas (pasos de 0,05), Venn con los valores y barra del 100 %. Predicción: P(A ∪ B) frente a P(A) + P(B). Los retos infinitos dan tres datos como en la EBAU (unión, contrario de la intersección, ni A ni B, diferencia).
  - `mosaic` «Probabilitatearen karratua / El cuadrado de probabilidad» (`mosaic.ts`, 128141–128143): P(A), P(B/A) y P(B/Ā) en décimas; las piezas son las intersecciones; independientes = cortes a la misma altura. Predicción: P(A/B) frente a P(A). ▶ «Junta B» lleva las dos piezas de B a una barra.
  - `causes` «Kausak karratuan / Las causas en el cuadrado» (`causes.ts`, 128161–128163): tres franjas P(Aᵢ) (décimas) pintadas hasta P(D/Aᵢ) (por ciento); P(D) es el área pintada y Bayes la parte de cada franja. Predicción: la causa más probable sabiendo D (al empezar es A₃, la que menos fabrica). ▶ «Junta lo pintado».
  - `people` «10 000 pertsona / 10 000 personas» (`people.ts`, 128181–128183): cuadrícula de 100 × 100 dibujada por tramos (pocas `rect`); prevalencia, sensibilidad y falsos positivos en por ciento, así que todos los grupos son enteros. Predicción: P(E/+) frente a 1/2; los positivos solo se colorean después de predecir.
- **Prestadas** con sus ids: `union`, `urn`, `contingency` (4.º aplicadas) y `draw`, `repeat`, `total` (4.º académicas). 11 herramientas.
- `lab/probability.ts`: `say` que pasa `{,}` a punto en árabe, `probLatex` (decimal exacto corto o fracción), `hundredthsLatex`, `tenthsLatex`.
- **Test** `tests/probabilitatea-batx2z-lab.test.ts`: retos fijos con su solución y sin empezar resueltos, retos infinitos (150 semillas) resolubles y alcanzables, mismas fórmulas en los cuatro idiomas, De Morgan (dos nombres para una zona), independencia en todos los cortes iguales, grupos enteros en las 10 000 personas.
- **Trucos:** las fórmulas del resultado van una por línea y cortas (a 375 px, `P(A∪B)=0,5+0,4−0,2=0,7` ya necesita barra); la cuenta va en la nota. El árabe no pasa `{,}` a punto por sí solo en el laboratorio: `inLanguage` lo hace en las fórmulas del resultado y el `say` de `probability.ts` en los textos. Un texto árabe con números en el SVG va con `Label`, no con `text`. El lint de React no deja reasignar variables al dibujar (`let x` dentro de un `map`): se calculan los inicios con `reduce`. Con el panel oculto, `requestAnimationFrame` no corre: el ▶ no se puede ver, solo comprobar en el código.
- **Revisión:** las 11 herramientas a 375 px en eu y ar sin desbordes, sin textos que se pisen o se salgan del tablero y sin fórmulas con barra de desplazamiento.

## En curso

- Fase 2 (laboratorio) hecha: commit 4d6ca6f.
- Fase 3 sin empezar (nada de código). Modelo a copiar: `src/pages/batx1-zientziak-estatistika/games/` (`info.ts` con `GameInfo` y niveles, `index.tsx` con `GamesHub`, juegos propios con `RoundGame` de `features/unit-v2/games/RoundGame`, detective con `createWorkedCases` y `WorkedDetectiveGame`, carrera, memoria con `PairsMemoryGame`, `GameArt.tsx`) y su test `tests/estatistika-batx1z-games.test.ts`. Ids de juegos: 128401–128899 (p. ej. carrera 128401–128405, J1 128501–3, J2 128601–3, J3 128701–3, J4 128751–3, memoria 128801–3, árbol y tabla de 4.º con 128811–3 y 128821–3). El detective de 4.º ya usa «conditional-swapped» y «total-one-branch»: el de 2.º usa otros errores (ignorar la a priori, P(A − B) = P(A) − P(B), independiente ⇒ incompatible, P(A∩B) como P(A/B), P(Ā/B) = 1 − P(A/B̄), De Morgan mal, multiplicar sin independencia, dividir entre P(Aᵢ) en Bayes). Después: registrar `games` en `index.tsx`, cierre (tests, lint, build, inventario, 375 px, hoja de euskera) y el tema 2 `binomial-normal`.
- Fase 3: juegos (J1 ¿independientes, incompatibles o ninguno?, J2 rellena el Venn, J3 ¿quién fue?, J4 detective de 2.º; el árbol y la tabla de 4.º con niveles nuevos; carrera y memoria).
