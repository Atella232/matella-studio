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
  - L2 `shadow` «La sombra», retos 105201–105205: u y v con coordenadas enteras (−4…4); la recta de u, y la sombra de v sobre ella (verde hacia delante, roja hacia atrás). Se predice el signo de u·v; después salen u₁v₁ + u₂v₂, la sombra u·v/|u| y el ángulo. Cubre también las lecciones de la etapa `analytic`.
  - L3 `river` «El barco y el río», retos 105301–105305: río de 12 m, corriente 0–4 m/s, barca (b₁, b₂) con b₂ de 1 a 5. Se predice si llega aguas arriba, justo enfrente o aguas abajo; ▶ hace la travesía (`usePlayback`). Lectura: velocidad real, `t = 12/b₂` y el desvío.
- **Prestadas (2),** con sus retos e ids de 4.º: «El vector de A a B» y «La combinación a·u + b·v».
- **Test:** `tests/bektoreak-batx1z-lab.test.ts` (Cramer reconstruye w en 200 bases; retos fijos resueltos por un estado y nunca al abrir; 150 semillas de retos infinitos).
- **Revisión:** las 5 herramientas a 375 px en eu, es y ar (antes y después de predecir y con ▶), sin desbordes ni texto del tablero cortado. Las dos de 4.º tienen la «x» y la «y» de los ejes medio cortadas (de su unidad; no se ha tocado).

## Trucos

- En `lesson-texts.test.ts` las fórmulas de cada texto se comparan **en orden** entre idiomas: en euskera hay que mantener el orden del castellano aunque la frase pida otro.
- Cuatro fórmulas bajaban a 12–13 px a 375 px: van en dos filas con `gathered` (la fila que empieza por `=` sigue a la de arriba).
- Un par de coordenadas como `(2,5)` nunca debe llegar a `Function()`: el test de contenido rechaza la coma.
- Los dibujos de 4.º (`VectorFigure`, `OperationsFigure`) tienen la «y» del eje medio cortada arriba; no se ha tocado porque es de otra unidad publicada.

## En curso

- Fases 1+2 y 3 hechas (commits en esta rama). Siguiente: fase 4, juegos (J1 ¿Número o vector?, J2 Productos en el polígono, J4 detective; carrera, memoria y de 4.º el salto del vector y encuentra k).
