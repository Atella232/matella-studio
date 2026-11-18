# Bachillerato: modalidades y lista de unidades

El 2026-11-05 el dueño eligió hacer Bachillerato en dos modalidades, como 4. DBH:
- **Ciencias:** Matemáticas I y II.
- **Ciencias Sociales:** Matemáticas Aplicadas a las Ciencias Sociales I y II.

Antes había un solo `batx1` y un solo `batx2`, con temas inventados que no coincidían con los libros. La rama `feat/batx-modalidades` los cambia por cuatro cursos en `src/data/courses.ts`:

- `batx1-zientziak`
- `batx1-gizarte`
- `batx2-zientziak`
- `batx2-gizarte`

**Hay un tema por capítulo de libro.** Ninguno está activo todavía. Las direcciones viejas `#/matematika/batx1` y `batx2` vuelven a la lista de cursos, como pasó con `dbh4`. `naturaCourses.ts` también tiene sus propios `batx1`/`batx2`: son de Natura y no se tocan.

**Lo comprueba `tests/batxilergoa-courses.test.ts`:**
- que estén los cuatro cursos;
- que cada uno tenga su número de temas;
- que no se repita ningún id;
- que los nombres estén en los cuatro idiomas;
- que no quede `batx1` ni `batx2`.

**Ajuste de paso:** el menú de cursos de la barra de arriba (`Navigation.css`) pasa de `max-height: 400px` a `min(520px, 70vh)`. Así caben los nueve cursos sin desplazarse.

## Fuentes

Libros en Drive, `LIBROS/1_Bach` y `2_Bach` (ver la skill `matella-fuentes`).

| Curso | Santillana | Anaya |
|---|---|---|
| 1.º Ciencias | 14 unidades (solucionario) | Saber Hacer, 13 unidades |
| 1.º Sociales | **No sirve:** la carpeta `Santillana/Sociales` tiene los mismos archivos que `Ciencias` (mismo tamaño; trae Complejos y Cónicas). | Saber Hacer / Estándar, 11 unidades |
| 2.º Ciencias | 14 unidades | 14 unidades, más el libro entero |
| 2.º Sociales | 12 unidades | 13 unidades |

- Los PDF sin título (`Unidad_01.pdf`, `Unidad_13.pdf`…) son copias de capítulos que ya tienen nombre.
- Algunos no se abren (`Anaya/Ciencias/Saber_Hacer/Unidad_02.pdf`, `Anaya/Sociales/Suma_Piezas/Unidad_05.pdf`); probablemente no están descargados.
- También están los exámenes de EBAU en `LIBROS/EBAU/<comunidad>/Matematicas_II` y `Matematicas_CCSS_II`, entre ellas País Vasco.

## Las cuatro listas

En la columna «Capítulos», S es Santillana y A es Anaya. «Solo S» o «solo A» quiere decir que el tema sale en un solo libro.

### `batx1-zientziak` · Matemáticas I (17)

| # | id | Tema (es / eu) | Capítulos | Reutilizar de |
|---|---|---|---|---|
| 1 | numeros-reales | Números Reales / Zenbaki Errealak | S1, A1 | `dbh4-akademikoak-errealak`, `-potentziak` |
| 2 | sucesiones | Sucesiones / Segidak | solo A2 | `dbh3-segidak` |
| 3 | ecuaciones-inecuaciones | Ecuaciones e Inecuaciones / Ekuazioak eta Inekuazioak | S2, A3 | `dbh4-akademikoak-ekuazioak`, `-polinomioak` |
| 4 | sistemas | Sistemas de Ecuaciones / Ekuazio-sistemak | S3, A3 | `dbh4-akademikoak-sistemak` (Gauss, nuevo) |
| 5 | resolucion-triangulos | Resolución de Triángulos / Triangeluen Ebazpena | S4, A4 | `dbh4-akademikoak-trigonometria` |
| 6 | funciones-trigonometricas | Fórmulas y Funciones Trigonométricas / Formula eta Funtzio Trigonometrikoak | S4, A5 | `dbh4-akademikoak-trigonometria`, `-esponentzialak` |
| 7 | numeros-complejos | Números Complejos / Zenbaki Konplexuak | S5, A6 | nuevo |
| 8 | vectores | Vectores / Bektoreak | S6, A7 | `dbh4-akademikoak-bektoreak` |
| 9 | geometria-analitica | Geometría Analítica / Geometria Analitikoa | S6, A8 | `dbh4-akademikoak-bektoreak` |
| 10 | conicas | Lugares Geométricos y Cónicas / Leku Geometrikoak eta Konikak | S7, A9 | nuevo |
| 11 | funciones | Funciones Elementales / Funtzio Elementalak | S8, A10 | `dbh4-akademikoak-funtzioak`, `-polinomikoak`, `-esponentzialak` |
| 12 | limites-continuidad | Límites y Continuidad / Limiteak eta Jarraitutasuna | S9, A11 | `dbh4-akademikoak-funtzioak` (tendencia), `-polinomikoak` (asíntotas) |
| 13 | derivadas | Derivadas / Deribatuak | S10, A12 | `dbh4-aplikatuak-funtzioak` (T.V.M.) |
| 14 | aplicaciones-derivada | Aplicaciones de la Derivada / Deribatuaren Aplikazioak | S11, A12 | nuevo |
| 15 | integrales | Integrales / Integralak | solo S12 | nuevo |
| 16 | estadistica | Estadística Unidimensional / Estatistika Unidimentsionala | solo S13 | `dbh4-akademikoak-estatistika` |
| 17 | estadistica-bidimensional | Estadística Bidimensional / Estatistika Bidimentsionala | S14, A13 | `dbh4-aplikatuak-estatistika` (nube, r, recta) |

### `batx1-gizarte` · Matemáticas Aplicadas a las CCSS I (11, solo Anaya)

| # | id | Tema (es / eu) | Capítulos | Reutilizar de |
|---|---|---|---|---|
| 1 | numeros-reales | Números Reales / Zenbaki Errealak | A1 | gemelo de Ciencias |
| 2 | aritmetica-mercantil | Aritmética Mercantil / Merkataritza-aritmetika | A2 | `dbh4-aplikatuak-proportzionaltasuna` (interés), `dbh4-akademikoak-errealak` (%) |
| 3 | algebra | Álgebra / Aljebra | A3 | `dbh4-akademikoak-ekuazioak`, `-sistemak` |
| 4 | funciones | Funciones Elementales / Funtzio Elementalak | A4 | gemelo de Ciencias |
| 5 | funciones-exponenciales | Funciones Exponenciales, Logarítmicas y Trigonométricas | A5 | `dbh4-akademikoak-esponentzialak` |
| 6 | limites-continuidad | Límites y Continuidad / Limiteak eta Jarraitutasuna | A6 | gemelo de Ciencias |
| 7 | derivadas | Derivadas y sus Aplicaciones / Deribatuak eta haien Aplikazioak | A7 | gemelo de Ciencias (13 + 14) |
| 8 | estadistica | Estadística Unidimensional / Estatistika Unidimentsionala | A8 | gemelo de Ciencias |
| 9 | estadistica-bidimensional | Estadística Bidimensional / Estatistika Bidimentsionala | A9 | gemelo de Ciencias |
| 10 | distribuciones-discretas | Distribuciones de Probabilidad Discretas / Probabilitate-banaketa Diskretuak | A10 | `dbh4-akademikoak-konbinatoria`, `-probabilitatea` |
| 11 | distribucion-normal | Distribuciones Continuas: la Normal / Banaketa Jarraituak: Normala | A11 | nuevo |

### `batx2-zientziak` · Matemáticas II (14)

| # | id | Tema (es / eu) | Capítulos |
|---|---|---|---|
| 1 | matrices | Matrices / Matrizeak | S1, A1 |
| 2 | determinantes | Determinantes / Determinanteak | S2, A2 |
| 3 | sistemas | Sistemas de Ecuaciones / Ekuazio-sistemak | S3, A3 |
| 4 | vectores-espacio | Vectores en el Espacio / Espazioko Bektoreak | S4, A4 |
| 5 | rectas-planos | Rectas y Planos en el Espacio / Zuzenak eta Planoak Espazioan | S5, A5 |
| 6 | angulos-distancias | Ángulos y Distancias / Angeluak eta Distantziak | S6, A6 |
| 7 | limites-continuidad | Límites y Continuidad / Limiteak eta Jarraitutasuna | S7, A7 |
| 8 | derivadas | Derivadas / Deribatuak | S8, A8 |
| 9 | aplicaciones-derivada | Aplicaciones de la Derivada / Deribatuaren Aplikazioak | S9, A9 |
| 10 | representacion-funciones | Representación de Funciones / Funtzioen Adierazpen Grafikoa | S10, A10 |
| 11 | integrales-indefinidas | Integrales Indefinidas / Integral Mugagabeak | S11, A11 |
| 12 | integral-definida | Integral Definida / Integral Mugatua | S12, A12 |
| 13 | probabilidad | Probabilidad / Probabilitatea | S13, A13 |
| 14 | binomial-normal | Distribuciones Binomial y Normal / Banaketa Binomiala eta Normala | S14, A14 |

### `batx2-gizarte` · Matemáticas Aplicadas a las CCSS II (13)

| # | id | Tema (es / eu) | Capítulos |
|---|---|---|---|
| 1 | matrices | Matrices / Matrizeak | S1, A2 |
| 2 | determinantes | Determinantes / Determinanteak | S2, A3 |
| 3 | sistemas | Sistemas de Ecuaciones / Ekuazio-sistemak | S3, A1, A3 |
| 4 | programacion-lineal | Programación Lineal / Programazio Lineala | S4, A4 |
| 5 | limites-continuidad | Límites y Continuidad / Limiteak eta Jarraitutasuna | S5, A5 |
| 6 | derivadas | Derivadas / Deribatuak | S6, A6 |
| 7 | aplicaciones-derivada | Aplicaciones de la Derivada / Deribatuaren Aplikazioak | S7, A7 |
| 8 | representacion-funciones | Representación de Funciones / Funtzioen Adierazpen Grafikoa | S8, A8 |
| 9 | integrales | Integrales / Integralak | S9, A9 |
| 10 | probabilidad | Probabilidad / Probabilitatea | S10, A10 |
| 11 | binomial-normal | Distribuciones Binomial y Normal / Banaketa Binomiala eta Normala | solo S11 |
| 12 | muestreo | Muestras Estadísticas / Lagin Estatistikoak | A11 (y el principio de S12) |
| 13 | inferencia | Inferencia Estadística: Estimación / Inferentzia Estatistikoa: Estimazioa | S12, A12 + A13 (media y proporción juntas) |

## Decisiones y preguntas abiertas

- **Euskera:**
  - «Limiteak», no «Mugak», como el antiguo `batx1`. Elhuyar da *limite* para el límite matemático; en la web, «muga» solo aparece como borde (bigotes, extremos de un intervalo).
  - El dueño tiene que confirmar los nombres en euskera de las cuatro listas.
- **Gemelos Ciencias/Sociales:** Límites, Derivadas, Estadística y Reales salen en las dos modalidades. Hay que decidir antes de hacer el segundo de cada pareja:
  - una sola unidad que se ve en los dos cursos;
  - o dos unidades que comparten piezas, como 4.º aplicadas y académicas.
- **Siguiente paso propuesto:** 1.º Ciencias › Números reales, en una carpeta `src/pages/batx1-zientziak-errealak` (por decidir). Hay que seguir la skill `matella-nueva-unidad`, con las mejoras de la teoría desde el principio y al menos 2 juegos y 2 herramientas propias.

## Estado

- Rama `feat/batx-modalidades`, cortada de `main` 4da1f1c:
  - fusión de `feat/notas-en-curso` (regla de notas «En curso» en `CLAUDE.md`);
  - 83ca83d, los cuatro cursos y su test;
  - el ajuste del menú.
- Tests 2078, lint y build en verde.
- Revisado a 375 px en eu, es y ar:
  - la lista de cursos (9 tarjetas);
  - las cuatro páginas de temas;
  - el menú de cursos;
  - que `#/matematika/batx1` vuelve a la lista.

  No se sale nada de la pantalla.
- **Publicado el 2026-11-05,** junto con la primera unidad, Números reales de 1.º Ciencias: `main` 3be8b8e, bundle `index-ZB994Q3f.js`. Ver `errealak-batx1z.md`.
- 1.º Ciencias publicadas el 2026-11-05: Números reales, Sucesiones y Ecuaciones e inecuaciones (ver sus notas).
- **2026-11-06: nueve temas más de 1.º Ciencias publicados a la vez** (`main` 27c197e, bundle `index-7UBtIGbr.js`): Resolución de triángulos, Fórmulas y funciones trigonométricas, Vectores, Geometría analítica, Funciones elementales, Límites y continuidad, Derivadas, Sistemas y Estadística unidimensional. Se fusionaron las cuatro ramas finales de cada bloque (`feat/trigonometria-`, `feat/geometria-`, `feat/deribatuak-` y `feat/estatistika-batx1z`), que ya traen los temas anteriores. Ojo al fusionar: el arreglo automático de `courses.ts` repitió líneas y hubo que dejarlas a mano. Ver la tabla del reparto.
- **2026-11-06, segunda tanda: Cónicas, Estadística bidimensional y Aplicaciones de la derivada** (`main` 5cec556, bundle `index-DOvfCVKR.js`). Con ellas, 15 de los 17 temas de 1.º Ciencias están en la web. El dueño eligió la regla de percentiles de 4.º para Estadística (la que ya usaba la web) y confirmó ahurra (∪) y ganbila (∩). Quedan Números complejos (a medias) e Integrales (terminado en `feat/integralak-batx1z`, va encima de Aplicaciones, sin publicar).
- **2026-11-07: Integrales publicado** (`main` 4b87350, bundle `index-DSObpCRa.js`): 16 de los 17 temas de 1.º Ciencias en la web. Solo falta Números complejos (3 de 15 lecciones en `feat/konplexuak-batx1z`, sesión de Trigonometría).
- **2026-11-07: Números complejos publicado** (`main` 4ea794c, bundle `index-BEQ4mLjw.js`): **1.º Ciencias completo, con sus 17 temas en la web.** Siguen sin hacer 2.º Ciencias y los dos cursos de Ciencias Sociales.

## Reparto en paralelo de 1.º Ciencias (2026-11-05)

El dueño aceptó hacer los 14 temas que quedan en **4 sesiones a la vez, una por bloque**. Cada sesión hace sus temas en orden, porque cada uno aprovecha las piezas del anterior.

**Reglas comunes:**
- Cada tema tiene **un bloque de mil ids** para todo: diagnóstico `N001–N008`, laboratorio propio `N101–N399`, juegos `N401–N899`. Nadie usa ids fuera de su bloque.
- Carpeta `src/pages/batx1-zientziak-<nombre>`, `storagePrefix` `matella-<nombre>-batx1z`, rama `feat/<nombre>-batx1z` y nota `docs/claude-notes/<nombre>-batx1z.md`.
- El tema siguiente del bloque se corta de la rama del anterior, para poder usar sus piezas.
- Las sesiones **no publican, no fusionan en `main` y no suben nada**. Tampoco tocan `docs/claude-notes/README.md` ni la memoria de Claude: eso se hace en la sesión principal al fusionar y publicar, de una en una.
- La hoja de euskera sale con `node .claude/skills/matella-nueva-unidad/scripts/hoja-revision.mjs <carpeta> <salida.html> "<título>" --herramientas … --juegos …`.

| Bloque | Tema (`id` del curso) | Nombre | Bloque de ids | Estado (2026-11-07) |
|---|---|---|---|---|
| Trigonometría | `resolucion-triangulos` | `triangeluak` | 102000–102999 | Publicado 2026-11-06 |
| Trigonometría | `funciones-trigonometricas` | `trigonometria` | 103000–103999 | Publicado 2026-11-06 |
| Trigonometría | `numeros-complejos` | `konplexuak` | 104000–104999 | Publicado 2026-11-07 |
| Geometría | `vectores` | `bektoreak` | 105000–105999 | Publicado 2026-11-06 |
| Geometría | `geometria-analitica` | `geometria` | 106000–106999 | Publicado 2026-11-06 |
| Geometría | `conicas` | `konikak` | 107000–107999 | Publicado 2026-11-06 |
| Análisis | `funciones` | `funtzioak` | 108000–108999 | Publicado 2026-11-06 |
| Análisis | `limites-continuidad` | `limiteak` | 109000–109999 | Publicado 2026-11-06 |
| Análisis | `derivadas` | `deribatuak` | 110000–110999 | Publicado 2026-11-06 |
| Análisis | `aplicaciones-derivada` | `aplikazioak` | 111000–111999 | Publicado 2026-11-06 |
| Análisis | `integrales` | `integralak` | 112000–112999 | Publicado 2026-11-07 |
| Álgebra y estadística | `sistemas` | `sistemak` | 113000–113999 | Publicado 2026-11-06 |
| Álgebra y estadística | `estadistica` | `estatistika` | 114000–114999 | Publicado 2026-11-06 |
| Álgebra y estadística | `estadistica-bidimensional` | `bidimentsionala` | 115000–115999 | Publicado 2026-11-06 |


## Reparto en paralelo de 2.º Ciencias (2026-11-09)

El dueño pidió hacer 2.º Ciencias con varias sesiones a la vez. Los 14 temas van en **5 sesiones, una por bloque**. Dentro de cada bloque los temas se hacen en orden y la rama de cada tema se corta de la del anterior. Esta sesión principal no hace temas: fusiona en `main` y publica, de una en una y con el visto bueno del dueño.

**Reglas comunes (las mismas que en 1.º):**
- Cada tema tiene **un bloque de mil ids** para todo: diagnóstico `N001–N008`, laboratorio propio `N101–N399`, juegos `N401–N899`. Nadie usa ids fuera de su bloque.
- Carpeta `src/pages/batx2-zientziak-<nombre>`, `storagePrefix` `matella-<nombre>-batx2z`, rama `feat/<nombre>-batx2z` y nota `docs/claude-notes/<nombre>-batx2z.md` (con su sección «En curso» mientras dure).
- Se sigue la skill `matella-nueva-unidad`: fuentes con `matella-fuentes`, propuesta con menú de letras, **el dueño elige en cada tema** y después se construye. Mínimo 2 juegos y 2 herramientas propias.
- Fuera de su carpeta, cada sesión solo toca los puntos de registro: **su línea** de `src/data/courses.ts` (añadir `active: true`, sin mover nada), el router y las rutas. Si una pieza prestada de otra unidad necesita un arreglo, no se edita: se apunta en la nota y se avisa (así no chocan dos sesiones).
- Los enlaces «Antes de empezar» solo pueden ir a lecciones que ya estén en la rama (ESO, 1.º Bachillerato o temas anteriores del mismo bloque). Los enlaces a temas de otro bloque de 2.º se apuntan en la nota y se ponen al fusionar.
- Las sesiones **no publican, no fusionan en `main` y no suben nada**. Tampoco tocan `docs/claude-notes/README.md`, esta nota ni la memoria de Claude.
- Cada sesión arranca su propio servidor de pruebas en su puerto (archivo `.claude/launch.json` propio, sin hacer commit), para no mirar la web de otra.
- Exámenes de EBAU del País Vasco (`LIBROS/EBAU/<comunidad>/Matematicas_II`): sirven para ver el estilo de los problemas de 2.º, nunca para copiarlos.
- Las piezas que puedan servir a 2.º Sociales (matrices, límites, derivadas, integrales, probabilidad…) se dejan exportadas y reutilizables: la decisión de los gemelos Ciencias/Sociales se toma al empezar Sociales.

| Bloque | Puerto | Tema (`id` del curso) | Nombre | Bloque de ids | Reutilizar de | Estado (2026-11-11) |
|---|---|---|---|---|---|---|
| Álgebra | 5181 | `matrices` | `matrizeak` | 116000–116999 | nuevo (Gauss de `batx1-zientziak-sistemak`) | Publicado 2026-11-10 |
| Álgebra | 5181 | `determinantes` | `determinanteak` | 117000–117999 | `matrizeak` | Publicado 2026-11-11 |
| Álgebra | 5181 | `sistemas` | `sistemak` | 118000–118999 | `batx1-zientziak-sistemak`, `determinanteak` | Publicado 2026-11-11 |
| Espacio | 5182 | `vectores-espacio` | `bektoreak` | 119000–119999 | `batx1-zientziak-bektoreak` (tablero 3D nuevo, para todo el bloque) | Publicado 2026-11-10 |
| Espacio | 5182 | `rectas-planos` | `planoak` | 120000–120999 | `batx1-zientziak-geometria`, `bektoreak` | Publicado 2026-11-11 |
| Espacio | 5182 | `angulos-distancias` | `distantziak` | 121000–121999 | `batx1-zientziak-geometria`, `planoak` | Publicado 2026-11-11 |
| Cálculo diferencial | 5183 | `limites-continuidad` | `limiteak` | 122000–122999 | `batx1-zientziak-limiteak` | Publicado 2026-11-10 |
| Cálculo diferencial | 5183 | `derivadas` | `deribatuak` | 123000–123999 | `batx1-zientziak-deribatuak` | Publicado 2026-11-10 |
| Cálculo diferencial | 5183 | `aplicaciones-derivada` | `aplikazioak` | 124000–124999 | `batx1-zientziak-aplikazioak` | Publicado 2026-11-10 |
| Cálculo diferencial | 5183 | `representacion-funciones` | `adierazpena` | 125000–125999 | `batx1-zientziak-funtzioak`, `-limiteak`, `-aplikazioak` | Publicado 2026-11-11 |
| Integrales | 5184 | `integrales-indefinidas` | `mugagabeak` | 126000–126999 | `batx1-zientziak-integralak`, `-deribatuak` | Publicado 2026-11-10 |
| Integrales | 5184 | `integral-definida` | `mugatua` | 127000–127999 | `batx1-zientziak-integralak`, `mugagabeak` | Publicado 2026-11-10 |
| Probabilidad | 5185 | `probabilidad` | `probabilitatea` | 128000–128999 | `dbh4-akademikoak-probabilitatea`, `-konbinatoria` | Publicado 2026-11-10 |
| Probabilidad | 5185 | `binomial-normal` | `banaketak` | 129000–129999 | `dbh4-akademikoak-probabilitatea`, `probabilitatea` | Publicado 2026-11-11 |

**Ids reservados para más adelante:** 1.º Sociales 130000–140999 (11 temas) y 2.º Sociales 141000–153999 (13 temas), un bloque de mil por tema en el orden del curso.

**Fuentes:** todas en Drive, `LIBROS/2_Bach/Santillana/Ciencias` (U1–U14) y `LIBROS/2_Bach/Anaya/Ciencias` (U1–U14, con los mismos temas y en el mismo orden).

**2026-11-10: primera tanda de 2.º Ciencias publicada** (`main` 5e186b4, bundle `index-BiUKCFuE.js`): Matrices, Vectores en el espacio, Límites y continuidad, Derivadas, Aplicaciones de la derivada, Integrales indefinidas, Integral definida y Probabilidad. Se fusionaron las ramas finales `feat/matrizeak-`, `feat/bektoreak-`, `feat/aplikazioak-`, `feat/mugatua-` y `feat/probabilitatea-batx2z` en `feat/batx2z-tanda1`. Conflictos solo en `paths.ts`, el router y `courses.ts` (dos líneas `active: true` vecinas): se resolvieron con el script de unión. 2993 tests en verde. Quedan Determinantes, Sistemas, Rectas y planos, Ángulos y distancias, Representación de funciones y Binomial y normal.

**2026-11-11: segunda tanda publicada** (`main` 9e5e40b, bundle `index-B542gguY.js`): Determinantes, Rectas y planos, Representación de funciones y Binomial y normal (12 de 14), junto con el arreglo del árabe en los dibujos (`feat/arabic-svg-formulas` + `feat/arabic-svg-labels`: las fórmulas dentro de frases árabes de los SVG se leen de izquierda a derecha también en Safari; 104 textos de 13 `figures.tsx` de 1.º y 2.º pasan por `Label`). Rama de unión `feat/batx2z-tanda2`; el script de unión ya resuelve también las líneas `active: true` vecinas de `courses.ts`. 3166 tests en verde. Quedan Sistemas y Ángulos y distancias (esperan la elección del dueño).

**2026-11-11: tercera tanda publicada** (`main` 39ce689, bundle `index-D6LgGDvF.js`): Sistemas y Ángulos y distancias. **2.º Ciencias completo, con sus 14 temas en la web.** 3241 tests en verde. Los dos arreglos del árabe que faltaban (`feat/arabic-svg-labs-games`, `feat/numberline-language`) se publicaron el mismo día (`main` e21dc6d, bundle `index-D2MmycQM.js`; ver `funtzioak-dbh2.md`). Siguen sin hacer los dos cursos de Ciencias Sociales.

## Reparto en paralelo de 1.º Sociales (2026-11-17)

El dueño eligió (2026-11-17):
- **Gemelos:** cada tema de Sociales es **su propia unidad**, más sencilla y con contextos de economía y sociedad, que **reutiliza** (importa, sin copiar ni editar) lecciones, laboratorio, juegos y generadores de su gemelo de 1.º Ciencias o de 4.º. Como 4.º aplicadas y académicas. Nada de trigonometría ni contenido que el libro de Sociales (Anaya, solo) no trae.
- **Reparto:** 4 sesiones a la vez, una por bloque. Esta sesión principal no hace temas: fusiona en `main` y publica, un bloque cada vez y con el visto bueno del dueño.

**Reglas comunes:** las mismas que en 2.º Ciencias (ver arriba), con estos cambios:
- Carpeta `src/pages/batx1-gizarte-<nombre>`, `storagePrefix` `matella-<nombre>-batx1g`, rama `feat/<nombre>-batx1g`, nota `docs/claude-notes/<nombre>-batx1g.md` (con «En curso» mientras dure).
- Fuentes: solo Anaya, `LIBROS/1_Bach/Anaya/Sociales` (la carpeta `Santillana/Sociales` es una copia de Ciencias y no sirve). Algún PDF puede no estar descargado (`Suma_Piezas/Unidad_05.pdf`): si falta, avisar al dueño.
- Una pieza prestada de Ciencias que necesite cambios no se edita: se envuelve o se hace una variante en la carpeta propia, o se apunta en la nota.
- Puertos 5191–5194.

| Bloque | Puerto | Tema (`id` del curso) | Nombre | Bloque de ids | Reutilizar de | Estado |
|---|---|---|---|---|---|---|
| Números y álgebra | 5191 | `numeros-reales` | `errealak` | 130000–130999 | `batx1-zientziak-errealak`, `dbh4-akademikoak-errealak` | Publicado 2026-11-18 |
| Números y álgebra | 5191 | `aritmetica-mercantil` | `merkataritza` | 131000–131999 | `dbh4-aplikatuak-proportzionaltasuna`, `dbh4-akademikoak-errealak` (%) | Publicado 2026-11-18 |
| Números y álgebra | 5191 | `algebra` | `aljebra` | 132000–132999 | `batx1-zientziak-ekuazioak`, `-sistemak`, `dbh4-akademikoak-polinomioak` | Publicado 2026-11-18 |
| Funciones | 5192 | `funciones` | `funtzioak` | 133000–133999 | `batx1-zientziak-funtzioak` | Publicado 2026-11-18 |
| Funciones | 5192 | `funciones-exponenciales` | `esponentzialak` | 134000–134999 | `dbh4-akademikoak-esponentzialak`, `batx1-zientziak-funtzioak` | Publicado 2026-11-18 |
| Funciones | 5192 | `limites-continuidad` | `limiteak` | 135000–135999 | `batx1-zientziak-limiteak` | Publicado 2026-11-18 |
| Funciones | 5192 | `derivadas` | `deribatuak` | 136000–136999 | `batx1-zientziak-deribatuak`, `-aplikazioak` (un solo tema) | Publicado 2026-11-18 |
| Estadística | 5193 | `estadistica` | `estatistika` | 137000–137999 | `batx1-zientziak-estatistika` | Publicado 2026-11-18 |
| Estadística | 5193 | `estadistica-bidimensional` | `bidimentsionala` | 138000–138999 | `batx1-zientziak-bidimentsionala` | Publicado 2026-11-18 |
| Probabilidad | 5194 | `distribuciones-discretas` | `diskretuak` | 139000–139999 | `dbh4-akademikoak-konbinatoria`, `-probabilitatea`, `batx2-zientziak-probabilitatea`, `-banaketak` | Publicado 2026-11-18 |
| Probabilidad | 5194 | `distribucion-normal` | `normala` | 140000–140999 | `batx2-zientziak-banaketak` | Publicado 2026-11-18 |

**2026-11-18: primera tanda de 1.º Sociales publicada** (`main` 7f7d96e, bundle `index-D8IDgBC7.js`), con el «Sí, los 10» del dueño: Números reales, Aritmética mercantil, Álgebra, Funciones elementales, Exponenciales, Límites y continuidad, Estadística unidimensional, Estadística bidimensional, Distribuciones discretas y Normal (10 de 11). Se fusionaron las ramas finales `feat/aljebra-`, `feat/limiteak-`, `feat/bidimentsionala-` y `feat/normala-batx1g` en `feat/batx1g-tanda1`, encima de la tanda de 2.º Sociales (`f3caf5a`). Conflictos solo en `paths.ts` (unir las listas), `courses.ts` (líneas `active: true` vecinas: quedarse con la activa) y el router (dos bloques de rutas: poner los dos). 3920 tests, lint, build e inventario en verde. Falta Derivadas (terminada después, en `feat/deribatuak-batx1g`). Pieza prestada con un detalle conocido: en «Adivina la correlación» (`CloudGame` de 4.º) la «y» del eje se sale unos píxeles, también en 4.º y 1.º Ciencias.

**2026-11-18: Derivadas publicado** (`main` 38202d3, bundle `index-DKihXm7d.js`), con el «Sí, publícalo» del dueño. **1.º Sociales completo, con sus 11 temas en la web.** 3952 tests, lint, build e inventario en verde; 21 vistas en vivo a 375 px en eu/es/ar sin desbordes. Queda una pregunta abierta en la sesión de Funciones: el juego de indeterminaciones de Límites (ya publicado) pregunta en su nivel 2 por ∞−∞ y 0·∞ y nombra 1^∞, que las lecciones de Sociales no explican.

## Reparto en paralelo de 2.º Sociales (2026-11-17)

El dueño pidió empezar 2.º Sociales a la vez que 1.º Sociales («Sí, arráncalas»). Los 13 temas van en **3 sesiones, una por bloque**. Dentro de cada bloque los temas se hacen en orden y la rama de cada tema se corta de la del anterior. La sesión principal no hace temas: fusiona en `main` y publica, un bloque cada vez y con el visto bueno del dueño.

**Gemelos:** igual que en 1.º Sociales. Cada tema es **su propia unidad**, más sencilla y con contextos de economía y sociedad, que **reutiliza** (importa, sin copiar ni editar) lecciones, laboratorio, juegos y generadores de su gemelo de 2.º Ciencias, de 1.º Ciencias o de 4.º. No se mete contenido que los libros de Sociales no traen (nada de geometría en el espacio ni integración por partes si el libro no la trae).

**Reglas comunes:** las mismas que en 2.º Ciencias (ver arriba), con estos cambios:
- Carpeta `src/pages/batx2-gizarte-<nombre>`, `storagePrefix` `matella-<nombre>-batx2g`, rama `feat/<nombre>-batx2g`, nota `docs/claude-notes/<nombre>-batx2g.md` (con «En curso» mientras dure).
- Fuentes: `LIBROS/2_Bach/Santillana/Sociales` (12 unidades) y `LIBROS/2_Bach/Anaya/Sociales` (13). Capítulos de cada tema: tabla de `batx2-gizarte` más arriba. Exámenes de EBAU del País Vasco de Matemáticas Aplicadas a las CCSS II para ver el estilo, nunca para copiarlos.
- Una pieza prestada que necesite cambios no se edita: se envuelve o se hace una variante en la carpeta propia, o se apunta en la nota.
- 1.º Sociales se está haciendo a la vez: no se importa nada de `batx1-gizarte-*` hasta que esté en `main`.
- Puertos 5201–5203.

| Bloque | Puerto | Tema (`id` del curso) | Nombre | Bloque de ids | Reutilizar de | Estado |
|---|---|---|---|---|---|---|
| Álgebra | 5201 | `matrices` | `matrizeak` | 141000–141999 | `batx2-zientziak-matrizeak` | Publicado 2026-11-18 |
| Álgebra | 5201 | `determinantes` | `determinanteak` | 142000–142999 | `batx2-zientziak-determinanteak` | Publicado 2026-11-18 |
| Álgebra | 5201 | `sistemas` | `sistemak` | 143000–143999 | `batx2-zientziak-sistemak`, `batx1-zientziak-sistemak` | Publicado 2026-11-18 |
| Álgebra | 5201 | `programacion-lineal` | `programazioa` | 144000–144999 | nuevo (inecuaciones 2D de `dbh4-akademikoak-sistemak`) | Publicado 2026-11-18 |
| Análisis | 5202 | `limites-continuidad` | `limiteak` | 145000–145999 | `batx2-zientziak-limiteak` | Publicado 2026-11-18 |
| Análisis | 5202 | `derivadas` | `deribatuak` | 146000–146999 | `batx2-zientziak-deribatuak` | Publicado 2026-11-18 |
| Análisis | 5202 | `aplicaciones-derivada` | `aplikazioak` | 147000–147999 | `batx2-zientziak-aplikazioak` (optimización con economía) | Publicado 2026-11-18 |
| Análisis | 5202 | `representacion-funciones` | `adierazpena` | 148000–148999 | `batx2-zientziak-adierazpena` | Publicado 2026-11-18 |
| Análisis | 5202 | `integrales` | `integralak` | 149000–149999 | `batx2-zientziak-mugagabeak`, `-mugatua` (un solo tema) | Publicado 2026-11-18 |
| Probabilidad e inferencia | 5203 | `probabilidad` | `probabilitatea` | 150000–150999 | `batx2-zientziak-probabilitatea` | Publicado 2026-11-18 |
| Probabilidad e inferencia | 5203 | `binomial-normal` | `banaketak` | 151000–151999 | `batx2-zientziak-banaketak` | Publicado 2026-11-18 |
| Probabilidad e inferencia | 5203 | `muestreo` | `laginketa` | 152000–152999 | nuevo (`banaketak`, `dbh4-akademikoak-estatistika`) | Publicado 2026-11-18 |
| Probabilidad e inferencia | 5203 | `inferencia` | `inferentzia` | 153000–153999 | nuevo (`laginketa`, `banaketak`) | Publicado 2026-11-18 |

**2026-11-18: primera tanda de 2.º Sociales publicada** (`main` 2bbfdde, bundle `index-4g-iHeeL.js`) tras el «Sí, publícalos» del dueño: Matrices, Límites, Derivadas, Aplicaciones de la derivada, Representación de funciones, Integrales, Probabilidad, Binomial y normal, Muestreo e Inferencia (10 de 13). Rama de unión `feat/batx2g-tanda1` con `feat/integralak-`, `feat/inferentzia-` y `feat/matrizeak-batx2g`. Conflictos solo en `courses.ts` (líneas `active: true` vecinas: se queda la que lo tiene) y `paths.ts` (unión de las listas). 3578 tests, lint, build e inventario en verde; en vivo a 375 px en eu/es/ar, los 10 cargan.
- Determinantes quedó fuera: se terminó después del visto bueno (`feat/determinanteak-batx2g`, sin publicar). Faltan Sistemas (espera la elección del dueño) y Programación lineal.
- Arreglado en la segunda tanda: en castellano el chip «2.º Bachillerato · Ciencias Sociales» de la cabecera desborda 1 px a 375 px (`scrollWidth` 376). En eu y ar no pasa.

**2026-11-18: segunda tanda de 2.º Sociales publicada** (`main` 99b1569, bundle `index-FB15mWyL.js`) tras el «Sí, publícalos» del dueño: Determinantes y Sistemas (12 de 13), más el arreglo del chip de la cabecera (`feat/header-chip-overflow`: `.fraction-v2-hero-copy .fraction-v2-chip` pasa a dos líneas si no cabe). Unión `feat/batx2g-tanda2` sobre el `main` de 1.º Sociales (2255f6a); conflicto solo en `paths.ts` (unión de listas). 4024 tests, lint, build e inventario en verde; en vivo a 375 px en eu/es/ar sin desborde.
- Programación lineal se terminó después del visto bueno (`feat/programazioa-batx2g`, 1b8a5400, sin publicar): es el último tema de 2.º Sociales.

**2026-11-18: tercera tanda, 2.º Sociales completo (13 de 13)** (`main` e1561e6, bundle `index-BLkYk7zF.js`) tras el «Sí, publícalo» del dueño: Programación lineal. Unión `feat/batx2g-tanda3` sobre 6d57b96; conflictos en `courses.ts` (línea con `active: true`) y `paths.ts` (unión de listas). 4060 tests, lint, build e inventario (3 juegos y 3 herramientas propias) en verde; en vivo a 375 px en eu/es/ar sin desborde, laboratorio abre, sin errores en consola. **Con esto están todos los cursos de ESO y Bachillerato.**
