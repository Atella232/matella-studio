# Probabilitatea · 2.º Bachillerato Ciencias Sociales

Tema 10 de 2.º Sociales (curso `batx2-gizarte`, tema `probabilidad`), primero del bloque «Probabilidad e inferencia» del reparto en paralelo de 2.º Sociales (ver `bachillerato.md`). Los cuatro temas del bloque son `probabilitatea`, `banaketak`, `laginketa` e `inferentzia`, en ramas apiladas.

- **Carpeta:** `src/pages/batx2-gizarte-probabilitatea`
- **`storagePrefix`:** `matella-probabilitatea-batx2g`
- **Rama:** `feat/probabilitatea-batx2g`, cortada de `main` 286824e
- **Bloque de ids:** 150000–150999 (diagnóstico 150001–150008, laboratorio propio 150101–150399, juegos 150401–150899)
- **Servidor de pruebas:** puerto 5203 (`.claude/launch.json` propio, sin commit)

## Fuentes

Santillana 2.º Bach Sociales U10 «Probabilidad» + Anaya 2.º Bach Sociales U10 «Azar y probabilidad» (solucionarios); estilo de la EBAU del País Vasco, Matemáticas Aplicadas a las CCSS II 2017–2022. La ficha de los cuatro temas y los textos extraídos están fuera del repositorio, en `~/Documents/Matella-fuentes/batx2g-probabilidad/`.

**El mapa de capítulos de `bachillerato.md` no coincide del todo con los PDF:** los tipos de muestreo abren Santillana U11 (no U12); Santillana U12 empieza con las distribuciones de la media y la proporción muestral y trae también la diferencia de medias (solo Santillana); Santillana U10 abre con combinatoria. Reparto usado: Probabilidad = S10 + A10; Binomial y normal = S11 sin el muestreo; Muestreo = A11 + muestreo de S11 + principio de S12 + A12 §1–3 + A13 §1–2; Inferencia = resto de S12 + A12 §4–5 + A13 §3 en adelante.

## Propuesta enviada al dueño (2026-11-17)

Los cuatro temas en un solo mensaje, con letras por tema (P-, B-, M-, I-) y una selección recomendada. Convención de respuestas de Inferencia propuesta: valores críticos de la tabla (el más cercano; en empate, el punto medio): 1,645 · 1,88 · 1,96 · 2,05 · 2,33 · 2,575, calculados y comprobados con código en la carpeta propia (sin tocar `normal.ts` de Ciencias); n con raíz exacta y σ, p̂ elegidos para que el error salga exacto; tamaño de muestra redondeado hacia arriba.

## Elección del dueño (2026-11-17)

«Las recomendadas» para los cuatro temas: Probabilidad P-L1, P-L2, P-J1, P-J2, P-J3 y M; Binomial-normal B-L1, B-L2, B-J1–B-J3 y M; Muestreo M-L1, M-L2, M-J1, M-J2, M-J4 y M; Inferencia I-L1, I-L2, I-J1, I-J2, I-J4. Sin P-L3, M-L3, M-J3, I-L3, I-J3 ni la diferencia de medias. Convención de respuestas de Inferencia aprobada.

## Fase 1: lecciones y contenido

- **Etapas y lecciones (15):** `counting` «Zenbatzen ikasi» (`variations`, `permutations`, `combinations`, `counting-laplace`), `events` (`events`, `frequency`, `union`, `two-events`), `conditional` (`tables`, `conditional`, `independence`, `trees`) y `bayes` (`total`, `bayes`, `screening`). Más sencilla que la de Ciencias (sin espacio de sucesos ni axiomas) y con contextos de sociedad: asociaciones, encuestas, tiendas online, salud, transporte. «Antes de empezar» enlaza a 4.º ak Combinatoria y Probabilidad.
- Lecciones, textos, errores típicos y figuras propias (15 figuras en `figures.tsx`; ayudas `Venn`, `FourZones`, `Table`, `Node`, `Person`, `Word`). Notación: `V_{n,k}`, `VR_{n,k}`, `P_n`, `C_{n,k}`, `P(A/B)`.
- **Contenido:** diagnóstico 150001–150008; práctica 1–20 (5 por etapa); retos 101–115 (4, 4, 4, 3); banco 1–50 (12, 13, 13, 12).
- **Test** `tests/probabilitatea-batx2g-content.test.ts`: recuentos, ids, KaTeX, mismas fórmulas en los cuatro idiomas, sufijos del euskera, igualdades, y los recuentos y probabilidades recalculados listando todos los casos.
- **Fuera de la carpeta:** `courses.ts` (línea de `probabilidad` de `batx2-gizarte` con `active: true`), router, `paths.ts` y `tests/probabilitatea-batx2z-content.test.ts` (decía que la Probabilidad de Sociales no estaba activa; ahora remite a este test).
- **Trucos:** en euskera, nada de «% 45ek», «260k», «1etik»: se reescribe con «artean» («gaixoen artean % 95 positibo ateratzen dira»). Número y % con espacio no separable (`\u00a0`), si no el árabe parte «10 %» en dos líneas. En árabe, «10 000» dentro de una frase se ve «000 10»: se aísla con LRI/PDI (`\u2066…\u2069`). Un enunciado de «Otro ejemplo» no pasa de 30 palabras.

## Fase 2: laboratorio

- **Propias** (lógica pura en `lab/*.ts`, con predicción y retos sin fin):
  - `survey` «Inkesta / La encuesta» (`survey.ts`, retos 150101–150103): 100 personas, jóvenes (G) en decenas y «sí» (S) de cada grupo en cincos; una condición (todos, jóvenes, adultos, «sí») apaga a los demás. Predicción: P(S/G) frente a P(S). Independencia = misma proporción de «sí» en los dos grupos.
  - `pipes` «Hodien zuhaitza / El árbol de tuberías» (`pipes.ts`, 150121–150123): 10 000 litros repartidos entre A, B, C (cincos de %) con su tasa a D (% entero), así que cada chorro son litros enteros. Predicción: el tubo que más agua lleva a D. ▶ «Junta el agua de D» llena una barra con los tres chorros (Bayes).
- **Prestadas** con sus ids: `slots`, `choose` (4.º ak Combinatoria), `draw` (4.º ak Probabilidad), `zones`, `mosaic`, `causes`, `people` (2.º Ciencias). 9 herramientas.
- **Test** `tests/probabilitatea-batx2g-lab.test.ts`.
- **Trucos:** los colores `STAGE`/`STAGE_TINT` cambian con la etapa (en «conditional» son mostaza, en «bayes» coral): para distinguir grupos o tubos se usan colores fijos. `\u00a0` escrito tal cual dentro de una plantilla ``…`` rompe el lint (no-irregular-whitespace): se escribe como escape.

## Fase 3: juegos

- **Propios** (lógica pura en `games/*.ts`, pantallas con `RoundGame` en `ProbabilityBatx2gGames.tsx`):
  - `divide` «Zeren artean zatitu? / ¿Entre cuántos divido?» (`divide.ts`, niveles 150501–150503): tabla de una encuesta (3 contextos) y una pregunta en palabras; se toca la casilla de arriba y la de abajo. Nivel 1 sobre el total, 2 dentro de una fila, 3 dentro de una columna. El error típico (el total general bajo una condicionada) siempre está mal: el total de la fila y el de la columna nunca coinciden.
  - `order` «Ordenak axola du? / ¿Importa el orden?» (`order.ts`, 150601–150603): una situación (cargos, podio, PIN, encuesta sí/no, quiniela, cola, anuncios, comisión, helados, premios iguales) y los cuatro modelos V, VR, P, C; nivel 1 solo V/C; nivel 3 elige el número entre los recuentos de los otros modelos.
  - `detective` (`detective.ts`, 150701–150703): errores de esta unidad: orden en una comisión, repetición en cargos, favorables con orden y posibles sin él; total general bajo una condicionada, condición al revés, fila + columna sin quitar la común, segunda rama sin quitar a la persona; media simple de tasas, Bayes sin a priori, sensibilidad como P(E/+).
- **Carrera** (`race.ts`, 150401–150404): circuito 0 propio (cargos, PIN, colas, comisiones, sorteo con combinaciones; las opciones malas son los otros modelos) y circuitos 1–3 de 2.º Ciencias tal cual.
- **Prestados** de 2.º Ciencias con los ids de esta unidad: «Rellena el Venn» (150811–150813), «¿Quién fue?» (150821–150823) y la memoria (150801–150803).
- **Test** `tests/probabilitatea-batx2g-games.test.ts`.
- **Truco:** el evaluador de los tests no lee `V_{8,3}` ni `C_{6,3}`: en el detective se comprueba que el último valor del arreglo es el correcto.

## Cierre (2026-11-17)

- Commits: fase 1 `08b166fa`, fase 2 `8790498a`, fase 3 y nota en la rama `feat/probabilitatea-batx2g` (sin push ni fusión).
- 3276 tests, lint y build en verde. Inventario OK: 4 juegos propios (contando el detective) y 6 herramientas «propias» (el script cuenta como propias las de 2.º Ciencias; las de verdad propias son `survey` y `pipes`).
- Revisado a 375 px en eu, es y ar: las 15 lecciones con todos los pasos abiertos (textos de los dibujos medidos con `getBBox`, sin desbordes), el banco de ejercicios, las dos herramientas propias con la predicción hecha y los juegos propios respondiendo una ronda.
- Hoja de euskera: `~/Documents/Matella-fuentes/batx2g-probabilidad/hoja-euskera-probabilitatea.html` (fuera del repositorio).
- **Al fusionar:** comparte con las otras sesiones solo las líneas de registro (`courses.ts`, router, `paths.ts`) y una línea de `tests/probabilitatea-batx2z-content.test.ts`.
