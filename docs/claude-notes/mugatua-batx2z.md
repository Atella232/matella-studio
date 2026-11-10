# Integral mugatua · 2.º Bachillerato Ciencias

Segundo tema del bloque Integrales de 2.º Ciencias (reparto en paralelo, ver `bachillerato.md`): curso `batx2-zientziak`, tema `integral-definida`.

- **Carpeta:** `src/pages/batx2-zientziak-mugatua`
- **`storagePrefix`:** `matella-mugatua-batx2z`
- **Rama:** `feat/mugatua-batx2z`, cortada de `feat/mugagabeak-batx2z` eeb3922
- **Puerto de pruebas:** 5184 (`.claude/launch.json` propio, sin commit)
- **Bloque de ids:** 127000–127999 (diagnóstico 127001–127008, laboratorio propio 1271xx–1273xx, juegos 127401–127899)

## Fuentes y alcance

- **Fuentes:** Santillana 2.º Bach Ciencias U12 + Anaya Matemáticas II U12 + exámenes de EBAU del País Vasco 2017–2022 (solo para ver el estilo). Del libro solo se saca el alcance; textos y ejercicios son propios.
- **Ya en 1.º** (`batx1-zientziak-integralak`): rectángulos, Barrow, propiedades, áreas bajo una curva, con signo y entre dos curvas (repaso con «Antes de empezar»).
- **Nuevo de 2.º:** sumas inferior y superior, la integral como límite, el teorema del valor medio, la función integral y el teorema fundamental, Barrow con sus condiciones, cambio de variable y partes en una definida, áreas con varios cortes y de tres curvas, problemas con parámetro. Los volúmenes de revolución solo salen en Anaya.
- **Elección del dueño (2026-11-10):** «Las recomendadas»: repaso de 1.º en 2 lecciones, volúmenes como lección corta al final, límite de sumas con Σi y Σi², valor medio con lección propia; laboratorio L1 «Encaja el área», L2 «El rectángulo del valor medio», L3 «Parte el recinto» + prestadas «La función área» y «Área con signo» de 1.º; juegos J1 «¿Vale Barrow?», J2 «Cambia los límites», J3 «Deriva la función integral», J5 detective solo con errores de 2.º, J6 carrera y memoria. Fuera: L4 (discos), L5 y J4.
- **Reutiliza de `mugagabeak`:** `plot.tsx` (`AreaPlot`, `F`, `Up`, `Back`, `ArrowHead`) y `figureKit.ts` (colores, `say`, `decimal`), y las lecciones de partes y cambio de variable para «Antes de empezar».

## Fase 1+2: lecciones y contenido (hecho)

- **Etapas (5) y lecciones (15):** `review` (azul) «Repaso de 1.º»: `barrow-review`, `areas-review` · `sums` (violeta): `lower-upper`, `limit-sums`, `mean-value` · `fundamental` (mostaza): `area-function`, `upper-limit`, `barrow-conditions` · `techniques` (coral): `definite-change`, `definite-parts`, `piecewise` · `problems` (verde): `three-curves`, `parameter`, `integral-extrema`, `revolution`.
- **«Antes de empezar»:** 1.º `integrales` (barrow, properties, area-sign, between-curves, rectangles), 1.º `derivadas` (chain), 1.º `aplicaciones-derivada` (singular-points) y 2.º `integrales-indefinidas` (change, by-parts). Escritas con la dirección literal (no con constantes) para que `lesson-needs.test.ts` las compruebe.
- **Diez mejoras:** `lessonTexts.ts` (definiciones, vocabulario, explicación ≤ 60 palabras, ejemplo con números propios, casos en `limit-sums`, `barrow-conditions` e `integral-extrema`, «¿Por qué funciona?» en 8 lecciones) y `lessonChecks.ts` (error típico + «Compruébalo» con dos fórmulas en el enunciado).
- **Contenido (`content.ts`):** diagnóstico 127001–127008, práctica 1–20 (4 por etapa), retos 101–115 (3 por etapa), banco 1–50 (10 por etapa). Las respuestas cerradas son racionales (integral, área, suma, valor medio, F′(a), parámetro, la a de aπ o de ln a); lo que da e, ln o π va en preguntas abiertas.
- **Test:** `tests/mugatua-batx2z-content.test.ts` (copia del de `mugagabeak`) y, además, cada respuesta cerrada se vuelve a calcular desde el enunciado: la integral por Simpson, F′(a) derivando numéricamente la función integral, los extremos buscando el mínimo o máximo de F.
- **Registro:** `courses.ts` (`active: true` en `integral-definida`), router (después de Integral mugagabeak) y `paths.ts`.
- **Revisión a 375 px:** las 15 lecciones con todos los pasos abiertos y «¿Por qué?» en eu, es y ar (sin desbordes, sin fórmulas encogidas, sin errores de KaTeX, ningún texto fuera de los dibujos), los 15 dibujos mirados en grande en árabe, y el banco con las 50 soluciones abiertas en ar y eu. Las fórmulas de práctica, retos y diagnóstico medidas fuera de la página.

## Fase 3: laboratorio (hecho)

- **Herramientas propias (3):** L1 «Encaja el área» (`lab/squeeze.ts`, retos 127101–127105): en cada tramo el rectángulo azul con el mínimo (s) y el rojo con el máximo (S), con curvas que suben y bajan; ▶ duplica n; predicción: ¿el área está más cerca de s, en el medio o de S? (depende de cómo se dobla la curva, no de n). L2 «El rectángulo del valor medio» (`lab/meanRect.ts`, 127201–127205): c en décimas (paso a paso o tocando el tablero) hasta que f(c)·(b − a) iguala el área; predicción: ¿c a la izquierda, en el centro o a la derecha del centro? L3 «Parte el recinto» (`lab/strips.ts`, 127301–127305): cinco recintos estilo EBAU; predicción: ¿una, dos o tres tiras?; luego se elige la curva de arriba en cada tira y cada tira se calcula como ∫(elegida − otra).
- **Prestadas de Integralak de 1.º (con sus ids):** «Área con signo» (etapa `techniques`, lección `piecewise`) y «La función área» (etapa `fundamental`).
- **Retos infinitos:** L1 curva × anchura de banda; L2 colocar c, o un rectángulo que sobre o falte al menos 1; L3 encajar el recinto, o sacar a propósito una suma negativa.
- **Test:** `tests/mugatua-batx2z-lab.test.ts`: s ≤ A ≤ S para todo n, cada rectángulo es el mínimo y el máximo de verdad (comprobado en una malla fina), la banda no crece al duplicar n y la predicción no cambia con n; el c exacto da f(c)·(b − a) = A y la mejor décima es la que más se acerca; en cada tira la curva marcada arriba está arriba, y con las buenas todas las tiras son positivas y suman el área; retos fijos con su solución y 150 semillas de retos infinitos.
- **Revisión a 375 px:** las 5 herramientas en eu, es y ar con cada función o recinto, la predicción hecha y el paso al máximo: sin desbordes ni fórmulas encogidas.

## Fase 4: juegos (hecho)

- **Juegos propios (3):** J1 «¿Vale Barrow?» (`games/barrow.ts`, niveles 127501–127503): una integral y tres respuestas (su valor, «no: asíntota en x = c» o «sí, partiendo en x = c»); los distractores son F(a) − F(b), Barrow a ciegas, la asíntota en −c, «no es derivable» con |x − c| y «tiene un salto». J2 «Cambia los límites» (`games/limits.ts`, 127551–127553): t = x² + m, kx + m, ln x, sen x, eˣ; los distractores dejan los límites viejos, los dan la vuelta, cambian solo uno, olvidan la m, los sacan con cos o pierden el 1/k. J3 «Deriva la función integral» (`games/derive.ts`, 127601–127603): ∫ₐˣ, ∫ₐ^g(x) y ∫ desde h(x) hasta g(x); los distractores derivan f, restan f(a), olvidan g′, ponen x en vez de g(x), suman en vez de restar u olvidan el límite de abajo.
- **Detective (127701–127703):** solo errores de 2.º (ninguno del de 1.º): suma inferior con los máximos, valor medio sin dividir entre b − a, Barrow con asíntota dentro; límites viejos tras t = g(x), uv solo arriba, |x − c| sin partir; g′ olvidada, el radio sin elevar al cuadrado, π olvidado.
- **Carrera (127401–127405)** con un circuito por etapa y **memoria (127801–127803)**: valores de integrales, función integral ↔ derivada, volúmenes ↔ valor.
- **Test:** `tests/mugatua-batx2z-games.test.ts`: en «¿Vale Barrow?» el valor se recalcula por Simpson (partiendo en c) y la asíntota está dentro; en «Cambia los límites» solo la opción buena tiene el valor de la integral original; en «Deriva» F′ se calcula derivando numéricamente la integral; cada pregunta de la carrera se recalcula desde su `meta`; cada pareja de memoria se comprueba; el detective sale con sus 9 errores.
- **Revisión a 375 px:** «¿Vale Barrow?», «Cambia los límites» y «Deriva» jugados en sus tres niveles en eu, es y ar (sin desbordes ni botones cortados); las líneas del detective y las tarjetas de memoria medidas fuera de la página. La carrera no se puede mirar con el panel oculto; la cubren los tests.

## Trucos

- **Árabe dentro de un dibujo:** en las capturas, Chrome no respetó los aislantes LRI/PDI dentro de `<text>` de SVG, así que «x = 0» o «π r² dx» dentro de una frase árabe salían desordenados. En los dibujos, la frase va sola en una línea y la fórmula en otra (con `F`). Una letra suelta (x, f) sí sale bien. Viene del `Label` compartido (ver «Aviso» en el cierre).
- **SVG junta los espacios:** «u = x      dv = …» sale con un solo espacio; separa con «;».
- **Revisar lecciones:** los pasos se abren uno a uno («Ikusi 2. urratsa») y el dibujo con `figureAfterSteps` solo aparece al final; hay que pulsar todos antes de medir.
- **Banco:** para ver la solución hay que escribir algo antes; el tema se elige en `#fraction-v2-bank-section` (un `<select>`).
- **Botones con fórmulas en árabe:** «√x» o «√x, 2 − x» salen al revés en un botón RTL; en HTML los aislantes sí funcionan, así que las etiquetas de los `Segmented` van envueltas con `ltr()` (U+2066 … U+2069).
- **Tarjetas de memoria:** caben 85 px de fórmula (tarjeta de 105 px con 10 px de margen): ∫₀¹ x² dx sí; ∫₀² |x − 1| dx o ∫₀¹ (x − x²) dx no.
- **Detective:** caben unos 220 px por línea; «m₁ = f(1) = 2  m₂ = f(2) = 5» no cabía y quedó «m₁ = f(1)  m₂ = f(2)».
- **Revisar herramientas:** con el panel oculto la captura no sigue el scroll; copiar `.fraction-v2-lab-tool` (con `cloneNode`) a una capa fija y mover su `scrollTop`.

## Cierre

- **Commits en `feat/mugatua-batx2z`:** f6ae31f (nota y propuesta), fe5c95f (fases 1+2), 7092dbf (fase 3), 3517d86 (fase 4) y el del cierre con esta nota.
- **Comprobaciones:** `npm test`, `npm run lint` y `npm run build` en verde.
- **Inventario:** OK (3 juegos propios + detective; 3 herramientas propias más las 2 prestadas de Integralak de 1.º, que el script cuenta como propias).
- **Hoja de euskera** para el dueño: `mugatua-batx2z-euskera.html` en las notas compartidas de la sesión principal (enviada).
- **Euskera elegido (para revisar en la hoja):** behe-batura / goi-batura (suma inferior / superior), zatiketa (partición; ojo, en otras unidades «zatiketa» es la división: alternativa «partiketa»), funtzio integragarria, batez besteko balioa, funtzio integrala, integrazio-aldagaia, muga aldakorra, oinarrizko teorema, barrutia (recinto), zerrenda (tira), bira-gorputza (cuerpo de revolución), inflexio-puntua, zatika definitutako funtzioa (a trozos), jauzia (salto).
- **Para la sesión principal:** esta rama toca `courses.ts` (solo `active: true` en `integral-definida`), el router y `paths.ts`; nada de otras unidades. Las piezas quedan exportadas para 2.º Sociales: la lógica de `lab/` (sumas, valor medio, tiras) y de `games/` (Barrow, límites, derivar la función integral, detective, carrera, memoria).
- **Aviso fuera de esta unidad:** el `Label` compartido (`dbh2-funtzioak-v2/plane.tsx`) aísla las fórmulas con LRI/PDI dentro de `<text>` SVG, pero en las capturas de esta revisión (Chrome) no se respetaron: «x = 0» dentro de una frase árabe de un dibujo salía al revés, y es probable que pase en otras unidades. Aquí se ha evitado separando frase y fórmula; mirarlo y arreglarlo en la pieza común es tarea aparte.
