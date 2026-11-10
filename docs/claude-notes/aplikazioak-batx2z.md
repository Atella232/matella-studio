# Deribatuaren aplikazioak · 2.º Bachillerato Ciencias

Tercer tema del bloque Cálculo diferencial de 2.º Ciencias (reparto en paralelo del 2026-11-09): curso `batx2-zientziak`, tema `aplicaciones-derivada`.

- **Carpeta:** `src/pages/batx2-zientziak-aplikazioak`
- **`storagePrefix`:** `matella-aplikazioak-batx2z`
- **Página:** `AplikazioakBatx2zIntroPage`
- **Rama:** `feat/aplikazioak-batx2z`, cortada de `feat/deribatuak-batx2z` (5e4f4cc)
- **Bloque de ids:** 124000–124999 (diagnóstico 124001–124008, laboratorio propio 1241xx–1243xx, juegos 124401–124899)
- **Servidor de pruebas:** puerto 5183 (`.claude/launch.json` sin commit, `matella-dev-5183`)

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U9 «Aplicaciones de las derivadas» y Anaya Matemáticas II U9. EBAU del País Vasco solo para el estilo. Del libro solo se ha sacado el alcance; textos y ejercicios son propios.
- **Santillana U9:** crecimiento y extremos, curvatura e inflexión, optimización, Rolle, valor medio y L'Hôpital con todas las indeterminaciones (0/0, ∞/∞, 0·∞, ∞ − ∞ y potencias).
- **Anaya U9:** lo mismo y además Rolle y valor medio con parámetros, contar raíces con Bolzano y Rolle, «si f′ = 0, f es constante» y el teorema de Cauchy.
- **EBAU País Vasco:** extremos y optimización casi todos los años; coeficientes a partir de un extremo, una inflexión o una tangente. No salen ni Rolle ni L'Hôpital.
- **Lo que ya vio 1.º (Aplikazioak 1.º):** signo de f′ e intervalos, puntos singulares y criterio de f″, coeficientes con extremos e inflexión, curvatura, extremos absolutos, optimización geométrica y de contextos, y gráficas.

**Lo que eligió el dueño («Las recomendadas», 2026-11-10):**
- V1: Cauchy fuera (solo se nombra en el «¿Por qué funciona?» de L'Hôpital). V2: el repaso de 1.º en 3 lecciones. V3: las gráficas completas van a Representación.
- Herramientas propias: L1 «Rolle busca el punto», L2 «La secante y su tangente paralela», L3 «L'Hôpital de cerca», L4 «La distancia mínima a una curva».
- M: prestadas de Aplikazioak 1.º «El semáforo de f′», «Curvatura con la tangente» y «La caja sin tapa».
- Juegos propios: J1 «¿Vale L'Hôpital?», J2 «¿Cumple Rolle?», J3 «Plantea y optimiza», J5 detective de 2.º.
- J6 carrera y memoria; J7 de 1.º «Caza los extremos» y «¿∪ o ∩?».
- Fuera: L5 «Ajusta a, b y c» y J4 «Encuentra el c del valor medio».

**Etapas y lecciones (ids), 15 = 3 + 12:**

| Etapa | Lecciones |
|---|---|
| `review` | `monotony-review`, `curvature-review`, `absolute-review` |
| `rolle` | `rolle`, `roots-count`, `mean-value` |
| `hopital` | `hopital`, `hopital-products`, `hopital-powers` |
| `conditions` | `extreme-condition`, `inflection-condition`, `extreme-tangent` |
| `optimization` | `areas-volumes`, `distances`, `contexts-interval` |

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 con las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario, casos en `hopital-products` y `hopital-powers` y 5 «¿Por qué funciona?» en `rolle`, `mean-value`, `hopital` (Cauchy), `extreme-tangent` y `areas-volumes`; `lessonChecks.ts` con error típico y «Compruébalo»). «Antes de empezar» enlaza a Aplikazioak, Limiteak y Deribatuak de 1.º y a Limiteak y Deribatuak de 2.º (todas en esta rama).
- **Dibujos (`figures.tsx`):** los 15 con `LimitPlot` de Limiteak 2.º (importado, sin tocarlo): curvas, cuerdas y tangentes como curvas rectas y una columna de notas. Portada `Bach2ApplicationsHeroArt`.
- **Contenido (`content.ts`):** diagnóstico 124001–124008; práctica 1–20 (4 por etapa); retos 101–115 (10/20/30); banco 1–50. Toda respuesta cerrada es un número: una abscisa, un valor, un coeficiente (o una suma), cuántas raíces o extremos hay, un límite o su logaritmo, o el óptimo.
- **Registro:** `active: true` en la fila `aplicaciones-derivada` de 2.º Ciencias de `courses.ts`, ruta en `src/router/index.tsx` y la dirección en `src/features/unit-v2/paths.ts`.
- **Test:** `tests/aplikazioak-batx2z-content.test.ts` (copia del de Derivadas 2.º).
- **Comprobación:** tests de lecciones y de contenido, `tsc` y lint en verde. Revisión a 375 px en eu, es y ar: las 15 lecciones (pasos abiertos), el resumen, el diagnóstico, la práctica (20, contestadas), los retos (15) y el banco (50, con las soluciones abiertas): sin desbordes ni desplazamiento lateral (salvo la lista de tareas, a propósito), sin errores de KaTeX ni LaTeX sin dibujar.
- **Trucos:**
  - El test de formas exige el mismo orden de fórmulas en los cuatro idiomas también en «¿Por qué funciona?»; el euskera tiende a darles la vuelta («$g'(c)=0$ duen $c$»). Script rápido para verlos todos a la vez: comparar `formulas()` de cada texto en `scratchpad/order.ts`.
  - El inglés escribe `1{,}72` dentro de la fórmula, igual que el castellano: la coma la cambia la app.
  - Para medir todas las fórmulas de golpe: importar en la consola `katex.mjs`, `latexLanguage.ts` y `content.ts`, y dibujarlas con la `.katex` a 18 px. Las de más de ~255 px (banco y práctica) o ~280 px («Otro ejemplo») se parten en filas `gathered`: cada `\qquad` y cada `\ \to\ ` en su fila, y las cadenas de `\lim` en la segunda igualdad.
  - El banco solo enseña la solución tras escribir un intento: rellenar los campos con el `setter` nativo y pulsar «Comprobar» antes de «Compara con la solución».

**Fase 3, laboratorio «Los teoremas de cerca» (7 herramientas):**
- **Propias (cada una pide una predicción antes de dibujar y tiene 5 retos fijos y retos sin fin con `freshFrom`):**
  - `rolle.ts`, L1 «Rolle busca el punto» (124101–124105): f₁ = x² − 2x, f₂ = x³ − 3x (con ±√3 en la lista), f₃ = |x|, f₄ con salto en x = 1 y f₅ = sen x (múltiplos de π/2). Mueves a y b; si se cumplen las tres hipótesis marca cada c con tangente horizontal; si no, dice cuál falla (orden, salto, pico o alturas). Predicción: cuántos c en el intervalo de salida (ninguno, uno, más).
  - `meanValue.ts`, L2 «La secante y su tangente paralela» (124201–124205): x², x³, √x y eˣ; secante, tangentes paralelas en cada c y una marca en el punto medio. Predicción: c más cerca de a, en el medio o más cerca de b (∪ lo lleva hacia b, ∩ hacia a).
  - `hopitalLens.ts`, L3 «L'Hôpital de cerca» (124301–124305): seis cocientes (q₁…q₆; q₆ = (x + 1)/(x + 2) no es indeterminado). Mueves h = x − a por los dos lados y se ven f/g y f′/g′. Predicción: el límite menor, igual o mayor que 1.
  - `distance.ts`, L4 «La distancia mínima a una curva» (124351–124355): cinco curvas con su punto P; Q se mueve por la curva, debajo se dibuja d(x), y en el mínimo PQ es perpendicular a la tangente. Predicción: el punto más cercano a la izquierda de P, en su vertical o a la derecha.
- **Prestadas de Aplikazioak 1.º, con sus retos e ids:** el semáforo de f′, la curvatura con la tangente y la caja sin tapa (componentes `SignTool`, `CurveTool` y `BoxTool`, sin tocarlos).
- **Componentes:** `Bach2ApplicationsTools.tsx` (copias de `curvePath`, `Grid` y `useClip` de Deribatuak 2.º), `labTools.ts` e `index.tsx`. Test `tests/aplikazioak-batx2z-lab.test.ts`.
- **Comprobación:** las 7 herramientas a 375 px en eu, es y ar, antes y después de predecir, con todas las funciones y los pasadores en sus dos extremos: sin desbordes, sin errores de KaTeX y sin textos fuera del tablero (el selector de herramientas se desliza a propósito).
- **Trucos:** en las etapas violeta y verde el color de la etapa coincide con el violeta y el verde de las piezas: las cuerdas, A y B van en tinta y el segmento PQ en rojo. En el árabe de los retos los decimales van con punto también dentro de la fórmula (`$x=1.01$`).

## En curso

- **Siguiente:** fase 4, juegos (ids 124401–124899): J1 «¿Vale L'Hôpital?», J2 «¿Cumple Rolle?», J3 «Plantea y optimiza», detective, carrera, memoria y los prestados de 1.º «Caza los extremos» y «¿∪ o ∩?». Después el cierre (inventario, 375 px, hoja de euskera, nota).
