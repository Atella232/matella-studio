# Espazioko bektoreak · 2.º Bachillerato Ciencias

Primera unidad del bloque Espacio (reparto en paralelo de 2.º Ciencias, ver `bachillerato.md`): curso `batx2-zientziak`, tema `vectores-espacio`.

- **Carpeta:** `src/pages/batx2-zientziak-bektoreak`
- **`storagePrefix`:** `matella-bektoreak-batx2z`
- **Rama:** `feat/bektoreak-batx2z`, cortada de `main` 2a27cff
- **Bloque de ids:** 119000–119999 (diagnóstico 119001–119008, laboratorio propio 119101–119399, juegos 119401–119899)
- **Servidor de pruebas:** puerto 5182 (`.claude/launch.json` propio, sin commit)

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U4 «Vectores en el espacio» (solucionario, fórmulas como imagen) y Anaya Matemáticas II U4 (solucionario). Estilo de problemas: EBAU del País Vasco 2017–2022 (los vectores salen como herramienta: producto vectorial para directores y normales, áreas y volúmenes). Del libro solo se saca el alcance; textos y ejercicios propios.
- **Corte con `planoak`:** se sigue Santillana (libro de clase), que pone aquí las coordenadas de puntos, el punto medio, el simétrico y los puntos alineados (Anaya los deja en su U5 §2).
- **Lo que viene de 1.º** (`batx1-zientziak-bektoreak`): operaciones, combinación lineal, bases y producto escalar en el plano; aquí se repasan en 3D con «Antes de empezar». Lo nuevo: dependencia con rango y determinante, producto vectorial y producto mixto.
- **Álgebra de 2.º** (determinantes y rango) va en paralelo y no está en la rama: funciones propias pequeñas en la carpeta. Enlaces «Antes de empezar» a sus lecciones pendientes para la fusión (ver abajo).

## Diseño elegido

- 2026-11-09: el dueño eligió «Las recomendadas» (todo el menú): V1 (lo de 1.º como repaso corto en 3D con «Antes de empezar»; punto medio, simétrico y alineados aquí, como Santillana), V2 (dibujos con el tablero 3D que se gira), L1 «El punto y su caja», L2 «¿Cabe en el plano?», L3 «La sombra en el espacio», L4 «La mano derecha», L5 «La caja de tres vectores», J1 «¿Número o vector?» en el espacio, J2 «¿Cuál es u×v?», J3 «La caja aplastada», J4 detective, J5 carrera y memoria.
- **Palabras en euskera propuestas** (el dueño debe confirmarlas en la hoja): biderkadura bektoriala, biderkadura mistoa, linealki mendekoak / independenteak, heina (rango), planokideak (coplanarios), paralelepipedoa, tetraedroa, eskuineko eskuaren erregela, oktantea. Árabe: الجداء المتجهي، الجداء المختلط، مرتبطة / مستقلة خطيًا، الرتبة، المحدد، مستوية، متوازي السطوح، رباعي الأوجه. Rango en las fórmulas: $\operatorname{rg}$ (igual en los cuatro idiomas).

## Hecho

**Tablero 3D del bloque** (`space/`, para los tres temas): `vec3.ts` (vectores, productos escalar, vectorial y mixto, determinante 3×3, rango por Gauss con pivote mayor, `primitive`), `camera.ts` (vista con acimut y elevación, perspectiva suave, escala fija para que no salte al girar; `clipLine` y `clipPlane` recortan rectas y planos a la caja del dibujo), `scene.ts` (lo que se dibuja: punto con líneas al suelo, vector, segmento, recta, plano, polígono, caja con aristas ocultas a trazos, etiqueta, ángulo recto, arco; paleta `SPACE`; `cuboid`), `sceneKit.ts` (caja entre dos puntos, plano de dos vectores, paralelogramo, triángulo) y `Board3D.tsx` + `Board3D.css` (SVG de 360 de ancho; `rotate="drag"` gira en las dos direcciones, `"swipe"` solo de lado para que la página siga bajando; flechas del teclado y botones ↺ ↻ y «Vista inicial»; un arrastre no cuenta como clic, así la lección no abre el dibujo ampliado). Test: `tests/bektoreak-batx2z-space.test.ts`.

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** 15 en 5 etapas (`space`, `dependence`, `dot`, `cross`, `mixed`): `space-points`, `space-vectors`, `midpoint-symmetric`; `combination-3d`, `dependence-rank`, `basis-3d`; `dot-3d`, `angle-3d`, `projection-3d`; `cross-product`, `cross-properties`, `cross-area`; `mixed-product`, `mixed-volume`, `coplanar`. Con las diez mejoras de la teoría (`lessonTexts.ts` y `lessonChecks.ts`; cinco «¿Por qué funciona?» en `space-vectors`, `dependence-rank`, `projection-3d`, `cross-area` y `mixed-volume`). Enlaces «Antes de empezar» a 1.º (Vectores, Geometría analítica, Sistemas), a 2.º DBH (diagonal del ortoedro) y a 4.º académicas (pirámide).
- **Dibujos (15 + portada),** todos con el tablero 3D en modo `swipe`, con los números de «Resolvamos».
- **Contenido:** diagnóstico 119001–119008, práctica 1–20, retos 101–115 y banco 1–50. Respuestas de un número, leídas con `readVectorsAnswer` de 4.º.
- **Test nuevo:** `tests/bektoreak-batx2z-content.test.ts` (copia del de 1.º).
- **Comprobación:** 2712 tests, lint y build en verde. Revisado a 375 px en eu: los 15 dibujos y todas las fórmulas de las lecciones con los pasos abiertos (ninguna baja de 13 px ni se sale).

**Fase 3, laboratorio:** 5 herramientas propias en `lab/`, todas en el tablero 3D (`rotate="drag"`), con predicción antes del resultado y retos infinitos (`freshFrom` de `dbh3-segidak/lab/prediction.ts`). Un selector (Segmented) elige el punto o el vector que se cambia, con tres steppers x, y, z.
- L1 `point-box` «El punto y su caja» (`pointBox.ts`, retos 119101–119105): A y B (−4…4), el vector AB y su caja; se predice si |AB| es menor, igual o mayor que 5; después AB, el módulo con los tres cuadrados y el punto medio M.
- L2 `in-plane` «¿Cabe en el plano?» (`inPlane.ts`, 119151–119155): u, v y w (−3…3) con el plano de u y v; se predice «dentro», «no hay plano» (paralelos) o «fuera»; después el determinante, el rango y, si está dentro, w = a·u + b·v (exacto, con fracciones) dibujado a trazos.
- L3 `space-shadow` «La sombra en el espacio» (`spaceShadow.ts`, 119201–119205): se predice el signo de u·v; después la sombra (verde hacia delante, roja hacia atrás), la proyección y el ángulo.
- L4 `right-hand` «La mano derecha» (`rightHand.ts`, 119251–119255): paralelogramo de u y v; se predice si u × v apunta abajo, horizontal o arriba; un botón cambia el orden (v × u) y pide predecir otra vez; después el determinante con i, j, k y el área.
- L5 `box-volume` «La caja de tres vectores» (`boxVolume.ts`, 119301–119305): cada cambio guarda la caja anterior (dibujada a trazos); se predice si el volumen baja, sigue igual o sube; empieza con w movido de lado (mismo volumen). ▶ «Aplasta la caja» baja w al plano de la base (`flattenedW`). Se puede ver la caja o el tetraedro.
- Test: `tests/bektoreak-batx2z-lab.test.ts` (retos fijos resueltos por un estado y nunca al abrir, 150 semillas de retos infinitos, coeficientes exactos, sombra perpendicular, aplastar a medias = mitad de volumen).
- Revisión a 375 px en eu: las cinco herramientas antes y después de predecir; sin desbordes ni fórmulas de menos de 13 px.

## Pendiente para la fusión

- Enlaces «Antes de empezar» a Determinantes de 2.º (bloque Álgebra, no está en esta rama): en `dependence-rank` (regla de Sarrus), `basis-3d` y `mixed-product`. Ahora el determinante se calcula con Sarrus dentro de la lección.

## Trucos

- En euskera, una fórmula que empieza por `z` (`$z$`, `$z=0$`) la caza el test de sufijos (`$z` + no letra). Se escribe `${z}$` en los cuatro idiomas.
- `numbers()` de `lesson-texts.test.ts` lee `(1,1,0)` como los decimales «1,1» y «0»: un ejemplo con vectores parecidos a los de «Resolvamos» choca. Usar otros números.
- El test de contenido compara todos los valores numéricos de una igualdad separada solo por comas: `b=1,\ a=5-3=2` falla; separar con `\qquad`.
- Fórmulas largas de productos vectoriales: a 375 px bajan a 12 px; van en dos filas con `gathered` (la fila que empieza por `=` sigue a la de arriba).

## En curso

- Fases 1+2 y 3 hechas. Siguiente: fase 4, juegos (J1 «¿Número o vector?» en el espacio, J2 «¿Cuál es u×v?», J3 «La caja aplastada», J4 detective, J5 carrera y memoria) en `games/`, ids 119401–119899.
