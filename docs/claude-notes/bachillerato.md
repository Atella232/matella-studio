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

## Reparto en paralelo de 1.º Ciencias (2026-11-05)

El dueño aceptó hacer los 14 temas que quedan en **4 sesiones a la vez, una por bloque**. Cada sesión hace sus temas en orden, porque cada uno aprovecha las piezas del anterior.

**Reglas comunes:**
- Cada tema tiene **un bloque de mil ids** para todo: diagnóstico `N001–N008`, laboratorio propio `N101–N399`, juegos `N401–N899`. Nadie usa ids fuera de su bloque.
- Carpeta `src/pages/batx1-zientziak-<nombre>`, `storagePrefix` `matella-<nombre>-batx1z`, rama `feat/<nombre>-batx1z` y nota `docs/claude-notes/<nombre>-batx1z.md`.
- El tema siguiente del bloque se corta de la rama del anterior, para poder usar sus piezas.
- Las sesiones **no publican, no fusionan en `main` y no suben nada**. Tampoco tocan `docs/claude-notes/README.md` ni la memoria de Claude: eso se hace en la sesión principal al fusionar y publicar, de una en una.
- La hoja de euskera sale con `node .claude/skills/matella-nueva-unidad/scripts/hoja-revision.mjs <carpeta> <salida.html> "<título>" --herramientas … --juegos …`.

| Bloque | Tema (`id` del curso) | Nombre | Bloque de ids | Estado (2026-11-06) |
|---|---|---|---|---|
| Trigonometría | `resolucion-triangulos` | `triangeluak` | 102000–102999 | Publicado 2026-11-06 |
| Trigonometría | `funciones-trigonometricas` | `trigonometria` | 103000–103999 | Publicado 2026-11-06 |
| Trigonometría | `numeros-complejos` | `konplexuak` | 104000–104999 | A medias (3 de 15 lecciones) |
| Geometría | `vectores` | `bektoreak` | 105000–105999 | Publicado 2026-11-06 |
| Geometría | `geometria-analitica` | `geometria` | 106000–106999 | Publicado 2026-11-06 |
| Geometría | `conicas` | `konikak` | 107000–107999 | Publicado 2026-11-06 |
| Análisis | `funciones` | `funtzioak` | 108000–108999 | Publicado 2026-11-06 |
| Análisis | `limites-continuidad` | `limiteak` | 109000–109999 | Publicado 2026-11-06 |
| Análisis | `derivadas` | `deribatuak` | 110000–110999 | Publicado 2026-11-06 |
| Análisis | `aplicaciones-derivada` | `aplikazioak` | 111000–111999 | Publicado 2026-11-06 |
| Análisis | `integrales` | `integralak` | 112000–112999 | Terminado, sin publicar |
| Álgebra y estadística | `sistemas` | `sistemak` | 113000–113999 | Publicado 2026-11-06 |
| Álgebra y estadística | `estadistica` | `estatistika` | 114000–114999 | Publicado 2026-11-06 |
| Álgebra y estadística | `estadistica-bidimensional` | `bidimentsionala` | 115000–115999 | Publicado 2026-11-06 |

