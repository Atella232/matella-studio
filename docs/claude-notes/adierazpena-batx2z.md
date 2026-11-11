# Funtzioen adierazpen grafikoa · 2.º Bachillerato Ciencias

Cuarto y último tema del bloque Cálculo diferencial de 2.º Ciencias (reparto en paralelo del 2026-11-09): curso `batx2-zientziak`, tema `representacion-funciones`.

- **Carpeta:** `src/pages/batx2-zientziak-adierazpena`
- **`storagePrefix`:** `matella-adierazpena-batx2z`
- **Página:** `AdierazpenaBatx2zIntroPage`
- **Rama:** `feat/adierazpena-batx2z`, cortada de `feat/aplikazioak-batx2z` (8994e60)
- **Bloque de ids:** 125000–125999 (diagnóstico 125001–125008, laboratorio propio 1251xx–1253xx, juegos 125401–125899)
- **Servidor de pruebas:** puerto 5183 (`.claude/launch.json` sin commit, `matella-dev-5183`)
- **Prefijo de nombres en el código:** `bach2Sketch*` / `Bach2Sketch*`

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U10 «Representación de funciones» y Anaya Matemáticas II U10 (los dos PDF son solucionarios). EBAU del País Vasco solo para el estilo. Del libro solo se ha sacado el alcance; textos y ejercicios son propios. Ficha: `~/Documents/Matella-fuentes/batx2-zientziak-calculo/ficha-u10.md` (fuera del repositorio).
- **Santillana U10:** el estudio previo (dominio, cortes y signo, simetrías y periodicidad, asíntotas y ramas, crecimiento y curvatura) y funciones completas por familias: polinómicas, racionales, con raíces, exponenciales, logarítmicas, a trozos y con valor absoluto; al final, parámetros y curvas a partir de datos.
- **Anaya U10:** lo mismo y además dibujar una curva a partir de límites y valores, la posición de la curva respecto de sus asíntotas, ramas parabólicas y alguna trigonométrica.
- **EBAU País Vasco:** «estudia y representa» (racional con oblicua, producto con eᵏˣ o logaritmo); a veces la gráfica de f′ para deducir f.
- **Lo que ya vio 1.º:** Limiteak 1.º (asíntotas y ramas de las racionales), Aplikazioak 1.º (polinómicas, racionales, exponenciales y logarítmicas sencillas) y Funtzioak 1.º (simetrías, periodo, valor absoluto, a trozos).

**Lo que eligió el dueño («Las recomendadas», 2026-11-11):**
- V1: el repaso de 1.º en 3 lecciones. V2: las trigonométricas en una sola lección, en un periodo. V3: las funciones con parámetros van a los ejercicios y retos.
- Herramientas propias: L1 «La curva y su asíntota», L2 «El espejo del valor absoluto», L3 «De f′ a f», L4 «Simetría y periodo».
- M: prestadas «Monta la gráfica» (Aplikazioak 1.º) y «El taller de transformaciones» (Funtzioak 1.º).
- Juegos propios: J1 «¿Qué gráfica es?», J2 «Lee la derivada», J3 «Asíntotas a la vista», J5 detective de 2.º.
- J6 carrera y memoria (función ↔ asíntota, función ↔ simetría); J7 de 1.º «Sube o baja» (Aplikazioak) y «Caza las asíntotas» (Limiteak).
- Fuera: L5 «La campana» y J4 «Datos y curva».

**Etapas y lecciones (ids), 15 = 3 + 12:**

| Etapa | Lecciones |
|---|---|
| `review` | `sketch-plan`, `asymptotes-review`, `rational-review` |
| `study` | `symmetry-period`, `asymptote-position`, `domain-edges` |
| `explog` | `exp-products`, `exp-special`, `log-functions` |
| `roots` | `root-functions`, `trig-functions`, `piecewise-graphs` |
| `reading` | `absolute-graphs`, `derivative-graph`, `curve-from-data` |

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 con las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario, casos en `asymptotes-review` y `absolute-graphs` y 5 «¿Por qué funciona?» en `symmetry-period`, `asymptote-position`, `exp-products`, `root-functions` y `derivative-graph`; `lessonChecks.ts` con error típico y «Compruébalo»). «Antes de empezar» enlaza a Limiteak, Aplikazioak y Funtzioak de 1.º y a Deribatuak y Aplikazioak de 2.º (todas en esta rama).
- **Dibujos (`figures.tsx`):** los 15 con `LimitPlot` de Limiteak 2.º (importado, sin tocarlo): la curva, sus asíntotas a trazos y los puntos de los pasos, y una columna de notas. `absolute-graphs` lleva dos planos, uno para |f(x)| y otro para f(|x|). Portada `Bach2SketchHeroArt`.
- **Contenido (`content.ts`):** diagnóstico 125001–125008; práctica 1–20 (4 por etapa); retos 101–115 (10/20/30); banco 1–50 (con 8 ejercicios abiertos de «representa» o «dibuja»). Toda respuesta cerrada es un número: dónde está una asíntota, un coeficiente de la oblicua, la abscisa de un extremo o una inflexión, un periodo, cuántas asíntotas, picos o cortes hay, o un parámetro.
- **Registro:** `active: true` en la fila `representacion-funciones` de 2.º Ciencias de `courses.ts`, ruta en `src/router/index.tsx` y la dirección en `src/features/unit-v2/paths.ts`.
- **Test:** `tests/adierazpena-batx2z-content.test.ts` (copia del de Aplicaciones 2.º).
- **Comprobación:** tests de lecciones (1206) y de contenido, `tsc` y lint en verde. Revisión a 375 px en eu, es y ar: las 15 lecciones (pasos abiertos), el resumen, el diagnóstico, la práctica (20, contestadas), los retos (15) y el banco (50, con las soluciones abiertas): sin desbordes ni desplazamiento lateral (salvo la lista de tareas, a propósito), sin errores de KaTeX ni LaTeX sin dibujar. En los dibujos, ninguna nota se monta sobre otra ni sobre la «x» del eje, y cada punto cae sobre su curva.
- **Trucos:**
  - Las palabras de las notas de `LimitPlot` van a `size: 18` (a 375 px se leen a unos 8,7 px); a 16 o 17 quedan por debajo de 8,5 px. Los números de los ejes son pequeños en todas las unidades que usan `LimitPlot`.
  - La «x» del eje queda justo a la derecha del plano: `notesX` tiene que empezar unos 14 px más allá de esa «x», o las notas a la altura del eje se montan con ella.
  - El test «el ejemplo tiene números propios» compara los números sin exponentes: `g(x)=x^4-2x^2` y `f(x)=-x^3+2x` cuentan como iguales (solo el 2).
  - Las oblicuas con raíz se explican en dos filas: la resta por el conjugado y, debajo, `n=\frac{4}{1+1}=2`.

## En curso

- **Siguiente paso:** fase 3, laboratorio. Herramientas propias L1 «La curva y su asíntota» (125101–125105), L2 «El espejo del valor absoluto» (125201–125205), L3 «De f′ a f» (125301–125305) y L4 «Simetría y periodo» (125351–125355), cada una con predicción y 5 retos + retos sin fin; después las prestadas «Monta la gráfica» (`LayersTool` de Aplikazioak 1.º) y «El taller de transformaciones» (primera herramienta de Funtzioak 1.º).
- **Después:** fase 4, juegos (J1 125501–03, J2 125601–03, J3 125651–53, detective 125701–03, carrera 125401–05, memoria 125801–03, «Sube o baja» 125811–13, «Caza las asíntotas» 125821–23) y el cierre (tests, inventario, 375 px, hoja de euskera).
