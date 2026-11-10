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

**Fase 4, juegos (`games/`):**
- **Juegos propios (3 + detective):**
  - `method` «¿Qué método?» (`method.ts`, ids 126501–126503): una integral y cuatro cestas (inmediata o compuesta, partes, racional, cambio de variable); 8 rondas, dos por cesta, cada una sacada de una plantilla de su método. Nivel 1, ejemplos limpios; nivel 2, trampas (un cociente que es u′/u, x·e^(x²)); nivel 3, ln x y arctg x solos, cos³ x, divisiones.
  - `choose-u` «Elige la u» (`chooseU.ts`, ids 126551–126553): tres repartos u/dv (el bueno, el del revés y el producto entero como u); sale du, v y el primer paso. Nivel 1, x por eᵏˣ, sen kx o cos kx; nivel 2, x², x³ y xⁿ ln x; nivel 3, ln x, arctg x, ln(x + 1) con dv = dx y x·arctg x. Sin eˣ·sen x (valen los dos repartos).
  - `fractions` «Construye las fracciones» (`build.ts`, ids 126601–126603): nivel 1, el esqueleto según el denominador (raíces simples, doble, factor sin raíces, doble y simple); nivel 2, A o B (distractores: el otro coeficiente y N(a) sin dividir); nivel 3, cociente + resto/(x − a) (distractores: el término independiente como resto y el cociente con el signo cambiado).
  - `detective` (`detective.ts`, ids 126701–126703): 12 errores (partes: el signo, v derivada, el último paso, la integral nueva; racionales: no dividir, raíz doble como logaritmo, A sin dividir entre a − b, el signo de las raíces; cambio y condiciones: dx sin cambiar, el cambio sin deshacer, cos² x como potencia, una sola constante). Las líneas se escriben con `localize` (cos, sen…) y son cortas: con la etiqueta «Urratsa» o «Ordezkatu» del euskera una línea de unos 205 px ya se salía.
- **Carrera** (`race.ts`, ids 126401–126405): 15 tipos en 5 circuitos, uno por etapa; cada pregunta lleva `meta`, y el test recalcula la respuesta y deriva la primitiva cuando la hay.
- **Memoria** (`boards.ts`, ids 126801–126803): compuestas, partes ((x + c)·eˣ, x·eˣ, ln x) y cambio de variable; ninguna tarjeta repite otra; sin sen ni tg; tarjetas de 78 px como mucho a 18 px.
- **Componentes:** `Bach2IndefiniteGames.tsx` (+ `.css`), `GameArt.tsx`, `RaceGame.tsx`, `info.ts`, `index.tsx`.
- **Test:** `tests/mugagabeak-batx2z-games.test.ts`: cada resultado de «¿Qué método?» y «Elige la u» y cada pareja de memoria se deriva numéricamente; en «Construye las fracciones» solo la opción buena rehace R. Este test encontró una pareja mal (3(3x+1)² ↔ (3x+1)³).
- **Revisión a 375 px:** «¿Qué método?», «Elige la u» y «Construye las fracciones» jugados en sus tres niveles, y el detective dos veces por nivel, en eu, es y ar: sin desbordes ni errores de KaTeX. La carrera no se puede mirar con el panel oculto (la cuenta atrás no corre); la cubren los tests.

## Trucos

- **`takeaway-notation.test.ts`:** si la idea clave usa una letra mayúscula (A de una fracción) y el resto de la lección no, falla. Ojo: las letras de `{aligned}` cuentan como letras de la lección (a, l, i, g, n, e, d).
- **«the worked formulas add up» necesita al menos una igualdad solo con números** en ejemplos, casos o pasos de `lessonTexts.ts`: en integrales casi todo lleva letras; en `division` va «$5=2\cdot 2+1$».
- **Revisión en el navegador con el panel oculto:** las capturas sí funcionan, pero el `zoom` devuelve la imagen anterior; una captura pequeña (`scale 0.1`) antes del `zoom` la refresca. Para ver un dibujo grande, se clona su SVG en un `div` fijo de 720 px.
- **Banco:** las soluciones solo se ven tras escribir algo; para revisarlas con un script hay que rellenar el `textarea` con el setter nativo y lanzar `input`. El tema se elige con un `select` (`.fraction-v2-bank-toolbar select`).

- **Medir fórmulas sin jugar:** con el servidor de Vite se pueden importar los módulos en la página (`await import('/src/pages/…/games/detective.ts')` y `'/node_modules/katex/dist/katex.mjs'`), generar muchos casos y medir cada línea en un `div` oculto. Ojo: `.katex` lleva 1,21em, así que esa medida es 1,21 veces la real; y después de editar, recarga la página (el módulo queda en caché).
- **Los juegos de rondas** se recorren con un script: nivel con los botones que empiezan por número, la opción con `.prop3-options button` y «Siguiente» es el último botón. Para volver a la lista de niveles hay que pasar por la portada de juegos.

## Cierre

- **Commits en `feat/mugagabeak-batx2z`:** 6ef7bb4 (fases 1+2), 524b88a (fase 3), a248155 (lista de juegos y «¿Qué método?», a medias) y el de la fase 4 con esta nota.
- **Inventario:** OK (3 juegos propios + detective; 3 herramientas propias más las 2 prestadas de Derivadas, que el script cuenta como propias).
- **Hoja de euskera** para el dueño: `mugagabeak-batx2z-euskera.html` en las notas compartidas de la sesión principal (enviada).
- **Para la sesión principal:** esta rama toca `courses.ts` (solo `active: true` en `integrales-indefinidas`), el router y `paths.ts`; nada de otras unidades. Lo que exporta para `mugatua` y para 2.º Sociales: `plot.tsx`, `figureKit.ts` y la lógica de `lab/` y `games/`.
