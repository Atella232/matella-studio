# Bektoreak · 1.º Bachillerato Ciencias

Primera unidad del bloque Geometría (reparto en paralelo de 1.º Ciencias, ver `bachillerato.md`): curso `batx1-zientziak`, tema `vectores`.

- **Carpeta:** `src/pages/batx1-zientziak-bektoreak`
- **`storagePrefix`:** `matella-bektoreak-batx1z`
- **Página:** `BektoreakBatx1zIntroPage`
- **Rama:** `feat/bektoreak-batx1z`, cortada de `main` 2ff41c2
- **Bloque de ids:** 105000–105999 (diagnóstico 105001–105008, laboratorio propio 105101–105399, juegos 105401–105899)

## Fuentes y alcance

- **Libros:** Anaya Matemáticas I (Saber Hacer) U7 «Vectores» y la primera parte de Santillana 1.º Bach Ciencias U6 «Geometría analítica» (solucionario; las fórmulas solo se leen como imagen). Del libro solo se saca el alcance; textos y ejercicios propios.
- **Corte con `geometria`:** Santillana mezcla vectores y rectas en la misma unidad. Aquí van los vectores (Anaya U7). Punto medio, simétrico y puntos alineados van a `geometria` (Anaya U8 §1).
- **Solapamiento con 4.º académicas** (`dbh4-akademikoak-bektoreak`): coordenadas, módulo, operaciones y paralelos ya están; lo nuevo es la base no ortonormal, el producto escalar, el ángulo, la proyección y la descomposición.

**Lo que eligió el dueño («Las recomendadas», 2026-11-05):** V1 (lo de 4.º como repaso corto con «Antes de empezar», lo nuevo a fondo); L1 «La cuadrícula torcida», L2 «La sombra», L4 «El barco y el río»; M (de 4.º: «El vector de A a B» y «La combinación a·u + b·v»); J1 «¿Número o vector?», J2 «Productos en el polígono», J4 detective; J5 carrera, memoria y de 4.º «El salto del vector» y «Encuentra k».

**Palabras en euskera propuestas** (el dueño debe confirmarlas en la hoja): biderkadura eskalarra, oinarria / oinarri ortonormala, konbinazio lineala, bektore askea / finkoa, ekipolenteak, bektore unitarioa, proiekzioa; norabidea, noranzkoa y modulua como en 4.º. Árabe: الجداء السلمي، الأساس، متجه الوحدة، الإسقاط، الطول (como 4.º).

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `vectors` | `free-vectors`, `vector-operations` |
| `bases` | `linear-combination`, `basis`, `basis-coordinates` |
| `dot` | `dot-definition`, `dot-figures`, `dot-properties` |
| `analytic` | `orthonormal`, `modulus-unit`, `angle-vectors`, `perpendicular-vectors` |
| `applications` | `projection`, `decomposition`, `forces` |

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 con las diez mejoras de la teoría (`lessonTexts.ts`: definiciones, «Otro ejemplo», vocabulario y 4 «¿Por qué funciona?» en `basis`, `dot-properties`, `orthonormal` y `projection`; `lessonChecks.ts`: error típico y «Compruébalo»). 12 enlaces «Antes de empezar» a 4.º académicas (Vectores y rectas, Sistemas, Trigonometría) y a 3.º (Cuadrado de una suma).
- **Dibujos nuevos (13):** `CombinationFigure`, `BasisFigure`, `SkewGridFigure`, `DotSignFigure`, `TailToTailFigure`, `DiagonalsFigure`, `OrthonormalFigure`, `UnitVectorFigure`, `AngleFigure`, `PerpendicularFigure`, `ProjectionFigure`, `DecompositionFigure`, `RiverFigure`, más `BachVectorsHeroArt`. De 4.º: `VectorFigure` y `OperationsFigure`. Todos los nuevos van en `Fig`, que deja 14 px arriba para que la «y» del eje no se corte.
- **Contenido:** diagnóstico 105001–105008, práctica 1–20, retos 101–115 y banco 1–50. Respuestas de un número (una coordenada, un módulo, un producto escalar, un ángulo en grados, un parámetro, un trabajo en julios); se leen con `readVectorsAnswer` de 4.º (quita «°» y unidades).
- **Test nuevo:** `tests/bektoreak-batx1z-content.test.ts` (copia del de Ekuazioak; su `evaluate` ya no admite comas, porque `(2,5)\cdot(-5,2)` se evaluaba con el operador coma de JavaScript).
- **Comprobación:** 2200 tests, lint y build en verde. Revisado a 375 px en eu, es y ar: las 15 lecciones con todos los pasos abiertos, el resumen, la portada, el diagnóstico, la práctica, los retos y el banco. No se sale nada de la pantalla, no hay errores de KaTeX ni fórmulas de menos de 13 px, y los textos de los dibujos no se cortan ni se pisan.

**Fase 3, laboratorio:** 5 herramientas.
- **Propias (3),** con predicción antes del resultado y retos infinitos (`freshFrom` de `dbh3-segidak/lab/prediction.ts`):
  - L1 `skew-grid` «La cuadrícula torcida», retos 105101–105105: u y v (−3…3) dibujan la red de la base y w (−6…6) es un punto. Se predice el signo de la primera coordenada de w en la base; después sale el camino a·u, b·v y `(a,b)_B` (con fracciones si hace falta, por Cramer). Si u y v son paralelos, la red se aplasta en una recta y no hay predicción.
  - L2 `shadow` «La sombra», retos 105201–105205: u y v con coordenadas enteras (−4…4); la recta de u, y la sombra de v sobre ella (verde hacia delante, roja hacia atrás). Se predice el signo de u·v; después salen u₁v₁ + u₂v₂, la sombra u·v/|u| y el ángulo. Cubre también las lecciones de la etapa `analytic`. La propuesta decía «v gira alrededor de u»; se hizo con coordenadas enteras para que sirva también a esa etapa, que no tenía herramienta.
  - L3 `river` «El barco y el río», retos 105301–105305: río de 12 m, corriente 0–4 m/s, barca (b₁, b₂) con b₂ de 1 a 5. Se predice si llega aguas arriba, justo enfrente o aguas abajo; ▶ hace la travesía (`usePlayback`). Lectura: velocidad real, `t = 12/b₂` y el desvío.
- **Prestadas (2),** con sus retos e ids de 4.º: «El vector de A a B» y «La combinación a·u + b·v».
- **Test:** `tests/bektoreak-batx1z-lab.test.ts` (Cramer reconstruye w en 200 bases; retos fijos resueltos por un estado y nunca al abrir; 150 semillas de retos infinitos).
- **Revisión:** las 5 herramientas a 375 px en eu, es y ar (antes y después de predecir y con ▶), sin desbordes ni texto del tablero cortado. Las dos de 4.º tienen la «x» y la «y» de los ejes medio cortadas (de su unidad; no se ha tocado).

**Fase 4, juegos:** 7 juegos, récords en `matella-bektoreak-batx1z-game-records`.
- **Propios (3):**
  - J1 `kind` «¿Número o vector?», niveles 105501–105503: tres vectores u, v, w y una expresión; primero se dice si da un número, un vector o no tiene sentido (número + vector), y después se elige el valor entre cuatro (el bueno y los errores típicos: u·v como vector, el producto cruzado, el módulo como suma…). Lógica en `games/kind.ts`.
  - J2 `polygon` «Productos en el polígono», niveles 105601–105603: cuadrado, triángulo equilátero o hexágono regular de lado 2–4 con dos vectores marcados; se elige u·v entre cuatro (el bueno, el del ángulo interior con el signo cambiado, |u|·|v| sin coseno, otro). Nivel 1 desde el mismo punto, nivel 2 uno tras otro (al responder, el segundo se traslada a trazos), nivel 3 diagonales. El valor sale de las coordenadas de los vértices. Lógica en `games/polygon.ts`.
  - J4 `detective`, niveles 105701–105703: 12 errores (A − B, el número en una sola coordenada, el módulo como suma, copiar las coordenadas en una base; u·v como vector, sin 2u·v, el ángulo interior, un solo módulo en el coseno; unitario dividiendo entre la suma, (a, b) ⟂ (b, a), el agudo con coseno negativo, la proyección entre el módulo equivocado).
- **Carrera** 105401–105405 (15 tipos, tres por etapa) y **memoria** 105801–105803 (producto escalar, módulo, k para que sean perpendiculares).
- **De 4.º, con niveles y etapas de esta unidad:** «El salto del vector» 105811–105813 y «Encuentra k» 105821–105823.
- **Test:** `tests/bektoreak-batx1z-games.test.ts` (cada respuesta de la carrera sale de sus números; cada valor de «¿Número o vector?» se recalcula con u, v y w; cada producto del polígono se comprueba con las coordenadas y cada lado mide s; el nivel 1 del polígono sale del mismo punto y el 2 nunca).
- **Revisión:** los 7 juegos a 375 px en eu, es y ar, respondiendo: sin desbordes ni textos cortados.

## Cierre

- Comprobación final: 2210 tests, lint y build en verde.
- Inventario: 4 juegos propios (contando los dos de 4.º) y 3 herramientas propias → OK.
- Hoja de euskera: `hoja-revision.mjs` con `--herramientas skew-grid,shadow,river --juegos kind,polygon,detective`, en la carpeta de notas compartidas de la sesión (`bektoreak-batx1z-revision.html`).

## Trucos

- En `lesson-texts.test.ts` las fórmulas de cada texto se comparan **en orden** entre idiomas: en euskera hay que mantener el orden del castellano aunque la frase pida otro.
- Cuatro fórmulas bajaban a 12–13 px a 375 px: van en dos filas con `gathered` (la fila que empieza por `=` sigue a la de arriba).
- Un par de coordenadas como `(2,5)` nunca debe llegar a `Function()`: el test de contenido rechaza la coma.
- Los dibujos de 4.º (`VectorFigure`, `OperationsFigure`) tienen la «y» del eje medio cortada arriba; no se ha tocado porque es de otra unidad publicada.

- En J1, la ronda «sin sentido» `u + 3` era siempre igual y no salían 6 rondas: ahora es `u + k` con k al azar, y las rondas se comparan también por sus vectores. Y los niveles barajan su lista antes de repetir (si no, el nivel 3, con 10 expresiones, solo usaba las 6 primeras).
- En J2 el marco del dibujo incluye desde el principio el extremo del vector trasladado, para que no se salga al responder ni se mueva el polígono.

## Publicación

Pendiente: la sesión principal la fusiona en `main` y la publica cuando el dueño dé el visto bueno.
