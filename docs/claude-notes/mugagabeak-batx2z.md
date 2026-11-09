# Integral mugagabeak · 2.º Bachillerato Ciencias

Primer tema del bloque Integrales de 2.º Ciencias (reparto en paralelo, ver `bachillerato.md`): curso `batx2-zientziak`, tema `integrales-indefinidas`.

- **Carpeta:** `src/pages/batx2-zientziak-mugagabeak`
- **`storagePrefix`:** `matella-mugagabeak-batx2z`
- **Página:** `MugagabeakBatx2zIntroPage`
- **Rama:** `feat/mugagabeak-batx2z`, cortada de `main` 2a27cff
- **Puerto de pruebas:** 5184 (`.claude/launch.json` propio, sin commit)
- **Bloque de ids:** 126000–126999 (diagnóstico 126001–126008, laboratorio propio 1261xx–1263xx, juegos 126401–126899)

## Fuentes y alcance

- **Fuentes:** Santillana 2.º Bach Ciencias U11 + Anaya Matemáticas II U11 + exámenes de EBAU del País Vasco 2017–2022 (solo para ver el estilo). Del libro solo se saca el alcance; textos y ejercicios son propios.
- **Lo que ya está en 1.º** (`batx1-zientziak-integralak`): primitivas, potencia, primitiva por un punto, eˣ y 1/x, seno y coseno, arcos, compuestas u′·uⁿ, u′·eᵘ y u′/u, ajustar constantes. Aquí va como repaso corto con «Antes de empezar» a esas lecciones.
- **Lo nuevo de 2.º:** compuestas trigonométricas y de arcos con u, integración por partes (dos veces y cíclica), racionales (división, raíces simples, múltiples y complejas), cambio de variable y problemas con condiciones (f″ dada, tangente dada).
- **Va al tema 2 (`mugatua`):** Barrow con sus condiciones, el teorema fundamental, áreas, volúmenes y el cambio de variable en la integral definida.

**Lo que eligió el dueño («Las recomendadas», 2026-11-09):**
- V1: el orden de Santillana (partes → racionales → cambio de variable).
- V2: x = a·sen t como parte corta de la lección de potencias de seno y coseno (un caso de `trig-powers`).
- V3: las potencias de seno y coseno como lección propia.
- V4: el repaso en 3 lecciones.
- Herramientas propias: L1 «Elige u y dv», L2 «Fracciones simples», L3 «Dos constantes».
- M1: prestadas «La gráfica de f′» y «La cadena de máquinas» de Derivadas de 1.º.
- Juegos propios: J1 «¿Qué método?», J2 «Elige la u», J3 «Construye las fracciones», J5 detective.
- J6: carrera y memoria.
- Fuera: L4 «Campo de pendientes», L5 «El rectángulo de partes» (para el tema 2), M2 y J4 «¿Qué cambio?».

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `review` | `table`, `composed`, `composed-arcs` |
| `parts` | `by-parts`, `parts-twice`, `log-arcs` |
| `rational` | `division`, `simple-roots`, `double-roots`, `no-roots` |
| `substitution` | `change`, `roots-exp`, `trig-powers` |
| `strategy` | `choose`, `conditions` |

**Euskera elegido (para revisar en la hoja):** zatikako integrazioa (por partes; ojo, «zatikako funtzioa» es «a trozos» en otras unidades), zatiki sinpleak, erro bakuna / bikoitza / anizkoitza, polinomio laburtezina, aldagai-aldaketa (como en Ekuazioak de 1.º), integrakizuna (integrando), integral ziklikoa, hasierako baldintza, zatikizuna / zatitzailea / zatidura / hondarra (como en 4.º).

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 con las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario, casos en `trig-powers` y 6 «¿Por qué funciona?» en `table`, `composed`, `by-parts`, `parts-twice`, `simple-roots` y `change`; `lessonChecks.ts` con error típico y «Compruébalo»). «Antes de empezar» enlaza a Integralak de 1.º (`power-rule`, `exp-log`, `trig`, `chain-power`, `chain-exp-log`, `adjust`, `arcs`, `through-point`), a Derivadas de 1.º (`product`, `chain`), a Ecuaciones de 1.º (`factorize-high`), a Trigonometría de 1.º (`double-angle`) y a Polinomios de 4.º académicas (`long-division`). Nada de 2.º de otros bloques.
- **Errores típicos:** 1/x² leído como logaritmo, falta u′ (cos 5x), falta el 1/a de la arcotangente, el signo de −∫v du, el último paso de partes olvidado, la derivada de ln x tomada como su integral, no dividir antes, el logaritmo del denominador sin fracciones simples, la raíz doble como logaritmo, el número que da la arcotangente perdido, dx sin cambiar, el cambio sin deshacer, sen² x como potencia de x, partes para una compuesta y faltar constantes al integrar dos veces.
- **Dibujos:** `plot.tsx` (exporta `AreaPlot`, `TableFigure`, `F`, `Up`, `Back`, `ArrowHead`: copia del plano de Integralak de 1.º, que no los exporta) y `figureKit.ts` (colores, `say`, `decimal`, `trig`), pensados para que los use también `mugatua`. `figures.tsx`: tabla en dos columnas, tablas con u, tarjeta u/dv, tabla de derivar e integrar (dos veces), división (dividendo = divisor · cociente + resto), raíces que anulan un sumando, raíz doble, logaritmo + arcotangente, cambio en tres cajas, raíz y exponencial, sen² x alrededor de ½, diagrama de «qué método» y la familia fijada por pendiente y punto. Portada `Bach2IndefiniteHeroArt`.
- **Contenido (`content.ts`):** diagnóstico 126001–126008; práctica 1–20 (4 por etapa); retos 101–115 (10/20/30 puntos); banco 1–50 (dos con respuesta cerrada: 20 y 45). Las respuestas cerradas son un coeficiente del resultado (a de a·sen 4x, A de una fracción, el resto, un exponente), la k de un punto o un valor f(b) una vez fijada f.
- **Test:** `tests/mugagabeak-batx2z-content.test.ts` (copia del de Integralak de 1.º) y, además, cada coeficiente cerrado se comprueba derivando numéricamente la primitiva en varios puntos (y un valor equivocado no pasa).
- **Registro:** `courses.ts` (`active: true` en `integrales-indefinidas`), router y `paths.ts`.
- **Revisión a 375 px:** las 15 lecciones, el banco con las 50 soluciones abiertas, la práctica guiada, los retos y el diagnóstico en eu, es y ar: sin desbordes, sin fórmulas encogidas (las largas van en filas `aligned`) y sin errores de KaTeX. Los 15 dibujos mirados en grande; ningún texto se sale de su caja en los tres idiomas.

**Fase 3, laboratorio (`lab/`):**
- **Herramientas propias (3):**
  - `parts` «Elige u y dv» (`parts.ts`, ids 126101–126105): seis productos (x·eˣ, eˣ·x², x·sen x, cos x·x, x·ln x, eˣ·sen x). Se toca un factor (será u; el otro, dv). Predicción: ¿la integral nueva ∫v du será más fácil, igual o más difícil? Después se ven du, v, los pasos y la cadena de integrandos en el tablero (verde si baja, rojo si sube, violeta si vuelve I). ▶ aplica partes otra vez. Con la u buena llega al resultado; eˣ·sen x vuelve a I en dos pasos.
  - `fractions` «Fracciones simples» (`fractions.ts`, ids 126201–126205): seis fracciones (tres con raíces simples y tres con una raíz doble, una con A = 0). A y B se mueven de medio en medio; la gráfica de la suma (violeta) se pone sobre la de R hasta coincidir, y entonces sale la integral. Predicción: el signo de A (regla de tapar).
  - `constants` «Dos constantes» (`constants.ts`, ids 126301–126305): cinco problemas con f″ dada; k₁ inclina y k₂ sube la curva hasta pasar por P con la pendiente m (trazo rojo). Predicción: el signo de k₁. ▶ recorre la familia con k₂.
- **Prestadas (2), con sus ids:** `slope-graph` (110201–110205) y `chain` (110351–110355) de Derivadas de 1.º.
- **Componentes:** `Bach2IndefiniteTools.tsx` (copia `curvePath`, `Grid` y `useClip` de Integralak de 1.º, que no los exporta), `labTools.ts`, `index.tsx` con `Bach2IndefiniteLaboratory`. La lógica (`parts.ts`, `fractions.ts`, `constants.ts`) no tiene React y queda exportada para 2.º Sociales.
- **Test:** `tests/mugagabeak-batx2z-lab.test.ts`: cada resultado de partes se deriva numéricamente; las piezas rehacen R y su integral se deriva a R (también en 60 fracciones generadas); k₁ y k₂ son únicos; retos fijos con su solución e infinitos (150 semillas).
- **Revisión a 375 px:** las 5 herramientas en eu, es y ar, con cada caso, cada u, la predicción y todos los pasos: sin desbordes ni fórmulas encogidas (las líneas de partes van como «= …» debajo de la integral) y sin textos fuera del tablero.

## Trucos

- **`takeaway-notation.test.ts`:** si la idea clave usa una letra mayúscula (A de una fracción) y el resto de la lección no, falla. Ojo: las letras de `{aligned}` cuentan como letras de la lección (a, l, i, g, n, e, d).
- **«the worked formulas add up» necesita al menos una igualdad solo con números** en ejemplos, casos o pasos de `lessonTexts.ts`: en integrales casi todo lleva letras; en `division` va «$5=2\cdot 2+1$».
- **Revisión en el navegador con el panel oculto:** las capturas sí funcionan, pero el `zoom` devuelve la imagen anterior; una captura pequeña (`scale 0.1`) antes del `zoom` la refresca. Para ver un dibujo grande, se clona su SVG en un `div` fijo de 720 px.
- **Banco:** las soluciones solo se ven tras escribir algo; para revisarlas con un script hay que rellenar el `textarea` con el setter nativo y lanzar `input`. El tema se elige con un `select` (`.fraction-v2-bank-toolbar select`).

## En curso

- Hechas: fase 1+2 (6ef7bb4) y fase 3, laboratorio (524b88a).
- **Fase 4, juegos, a medias** (commit WIP siguiente a esta nota): escritos `games/info.ts` (los 6 juegos con sus niveles e ids 126401–126803 y las direcciones) y `games/method.ts` (J1 «¿Qué método?»: plantillas por método y nivel, 8 rondas, cada ronda con `fn` y `F` para comprobarla). Aún sin enganchar en `index.tsx` de la unidad ni probados.
- Falta, en este orden:
  1. `games/chooseU.ts` (J2 «Elige la u»: tres repartos u/dv, uno bueno; niveles x·eᵏˣ/x·cos kx, x²·g y xⁿ ln x, ln x / arctg x / x·arctg x con dv = dx; sin eˣ·sen x, que vale de las dos maneras).
  2. `games/build.ts` (J3 «Construye las fracciones»: nivel 1 el esqueleto según el denominador; nivel 2 el valor de A o B con distractores B y N(a); nivel 3 cociente + resto/(x − a)).
  3. `games/detective.ts` con `createWorkedCases` (12 errores: partes — signo, v sin integrar, último paso, integral nueva mal; racionales — no dividir, raíz doble como logaritmo, A sin dividir entre a − b, signo de las raíces; cambio — dx sin cambiar, cambio sin deshacer, cos² x como potencia, una sola constante). Líneas sin sen ni tg y de 245 px como mucho.
  4. `games/race.ts` (5 circuitos, 3 tipos cada uno, respuestas numéricas con los errores típicos), `RaceGame.tsx`, `games/boards.ts` (memoria: compuestas, partes con (x + c)eˣ, cambio; tarjetas de 77 px como mucho y sin sen ni tg), `GameArt.tsx`, `Bach2IndefiniteGames.tsx` (+ `.css`) y `games/index.tsx`, como en `batx1-zientziak-integralak/games`.
  5. `tests/mugagabeak-batx2z-games.test.ts` (cada respuesta derivada numéricamente), enganchar `games` en `index.tsx`, revisión a 375 px en eu, es y ar, commit de la fase 4.
- Después, el cierre: `npm test`, lint y build, inventario, hoja de euskera con `hoja-revision.mjs` (`--herramientas parts,fractions,constants --juegos method,choose-u,fractions,detective`), y la propuesta del tema 2 (`mugatua`, rama cortada de esta).
