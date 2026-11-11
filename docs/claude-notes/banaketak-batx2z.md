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

## Fase 2 · laboratorio

- **Herramientas propias (5):** `build` (Eraiki banaketa: cinco barras en décimas; μ como punto de equilibrio y σ² en centésimas, exactas), `machine` (Makina binomiala: n 1–20, p en décimas, «= / ≥ / ≤ k»), `bell` (Kanpaiaren azpian: N(μ; σ) con σ = 2, 4, 5 o 10 y a, b en pasos que dejan z con dos decimales; ▶ tipifica cambiando el eje x por el eje z), `lookup` (Normalaren taula: signo, fila, columna y lado; los negativos con la simetría), `approx` (Binomiala kanpaiaren azpian: B(16; 0,5), B(25; 0,2), B(100; 0,5) y B(400; 0,5), con σ = 2, 2, 5, 10; corrección sí/no).
- **Prestadas para el repaso:** `pascal` (4.º ak Combinatoria) y `score` (1.º Ciencias Estadística), con sus ids.
- **Ids:** retos 129101–129103 (build), 129111–129113 (machine), 129121–129123 (bell), 129131–129133 (lookup), 129141–129143 (approx); cada herramienta tiene retos sin fin (`freshFrom`).
- **Tests:** `tests/banaketak-batx2z-lab.test.ts` (retos resolubles y no resueltos al abrir, z siempre con dos decimales, la b de los retos sin fin única, la tabla estrictamente creciente hasta 2,5, la aproximación con corrección a < 0,002 de la exacta salvo B(25; 0,2), que llega a 0,019 por ser np = 5 justo: lo dice el «Zeri begiratu»).
- **Trucos:** `with` es palabra reservada (no sirve de nombre en los tests). En las pizarras, los valores con cuatro decimales van con `toFixed(4)` (si no, 0,3770 sale 0,377).

## Fase 3 · juegos

- **Propios:** `binomial` (¿Es binomial?: 1) sí o no y por qué —sin devolución, sin n fijo, no cuenta éxitos—; 2) qué B(n; p), con p y q cambiadas, «dos resultados, así que 1/2» o «n = 100 por el porcentaje»; 3) qué expresión es P(X = k), sin el número combinatorio o con p y q cambiadas), `area` (¿Qué área es?: tres campanas sombreadas; complemento, imagen simétrica y, entre dos valores, las colas o el intervalo desde 0: la imagen simétrica de un intervalo tiene la misma área, por eso no se usa ahí), `hunt` (Busca en la tabla: k con signo cambiado o una fila al lado; en el nivel 3, x = μ + kσ con μ − kσ y μ + k como errores), `detective` (12 errores en 3 niveles: binomial, normal y aproximación).
- **Genéricos:** carrera de 5 circuitos (uno por etapa; 16 tipos de pregunta, con `meta` comprobada en los tests) y memoria (B(n; p) ↔ μ, P(Z > k) ↔ valor de la tabla, N(μ; σ) y x ↔ z).
- **Ids:** carrera 129401–129405, binomial 129501–129503, área 129601–129603, tabla 129701–129703, detective 129751–129753, memoria 129801–129803.
- **Tests:** `tests/banaketak-batx2z-games.test.ts`.
- **Trucos:** con k = n − k, «p y q cambiadas» da el mismo número: no se pregunta; tampoco valores menores que 0,001 (en la prueba salían iguales a 0). El inventario (`inventario-unidad.mjs`) da OK: 3 juegos y 6 herramientas propios, más el detective de patrón con errores de esta unidad.

## Cierre (2026-11-11)

- **Commits:** fase 1 `bfc1a0e9`, fase 2 `35384ee9`, fase 3 `21590e8a`, nota `2b324d88` y el último retoque (nombres de etapa más cortos), en la rama `feat/banaketak-batx2z` (sin push ni fusión: lo hace el dueño).
- 3036 tests, lint y build en verde. Inventario OK: 5 herramientas propias (más 2 prestadas: Tartaglia de 4.º y la puntuación típica de 1.º, que el script cuenta como propia por estar en otra carpeta de Bachillerato) y 3 juegos propios, más el detective con los 12 errores de esta unidad, la carrera y la memoria.
- Revisado a 375 px en eu, es y ar: las 15 lecciones (dibujos medidos con `getBBox`, sin desbordes ni textos que se pisen), las 7 herramientas con la predicción hecha, los 6 juegos en sus tres niveles respondiendo una ronda, y la portada, el diagnóstico, la práctica, los retos y el banco por temas. Las fórmulas de práctica, retos, diagnóstico y banco se midieron todas en un hueco de 295 px: el trozo sin corte más ancho mide 208 px. El desplegable de temas del banco se salía 22 px de su tarjeta por dos nombres de etapa largos: ahora son «Variable continua y normal» y «De la binomial a la normal» (y lo mismo en eu, en y ar). En el juego del área, las tres campanas van una debajo de otra en el móvil y las marcas cercanas se separan.
- **Hoja de euskera:** `~/Documents/Matella-fuentes/batx2z-probabilitatea/hoja-euskera-banaketak.html` (fuera del repositorio), mandada al dueño.
- **Sin comprobar a la vista:** la animación del botón ▶ de «Kanpaiaren azpian» (con el panel del navegador oculto no corre `requestAnimationFrame`); revisada en el código.
- **Al fusionar:** solo comparte con las otras sesiones las tres líneas de registro (`courses.ts`, el router y `paths.ts`).
- **Para Sociales:** `normal.ts` (tabla, simetrías, búsqueda inversa) y `binomial.ts` (exacta y decimal) no dependen de nada de Ciencias.

## Publicación

- **Publicada el 2026-11-11** en la segunda tanda de 2.º Ciencias, con el visto bueno del dueño («si»): `main` 9e5e40b, bundle `index-B542gguY.js`. 3166 tests, lint y build en verde; revisada en matella.net a 375 px en eu, es y ar.
- El ▶ de «Kanpaiaren azpian» se comprobó antes de publicar (con un `requestAnimationFrame` de sustitución, porque la página seguía oculta): el eje pasa de x a z y aparece z = (x − μ)/σ.
