# Deribatuak · 2.º Bachillerato Ciencias Sociales

Segundo tema del bloque Análisis de 2.º Sociales (reparto en paralelo del 2026-11-17): curso `batx2-gizarte`, tema `derivadas`.

- **Carpeta:** `src/pages/batx2-gizarte-deribatuak`
- **`storagePrefix`:** `matella-deribatuak-batx2g`
- **Rama:** `feat/deribatuak-batx2g`, cortada de `feat/limiteak-batx2g` (02dfc181)
- **Bloque de ids:** 146000–146999 (diagnóstico 146001–146008, laboratorio propio 1461xx–1463xx, juegos 146401–146899)
- **Servidor de pruebas:** puerto 5202 (`.claude/launch.json` sin commit)

## Fuentes y alcance

- **Libros (solucionarios):** Santillana 2.º Bach Sociales U6 «Derivadas» y Anaya Matemáticas Aplicadas a las CCSS II U6 «Técnicas de derivación». Solo se saca el alcance.
- **Lo que traen los dos:** T.V.M., derivada en un punto (definición y tangente), derivabilidad (laterales, a trozos con parámetros), función derivada, reglas (suma, producto, cociente, cadena con potencias, raíces, exponenciales y logaritmos), derivadas sucesivas. Los dos traen también seno, coseno y tangente: fuera por decisión del dueño (D-V3 no elegida).
- **«Marginal»:** ningún libro usa la palabra; la lección `marginal` la presenta como «lo que cuesta la unidad siguiente» y da el nombre en la definición.

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `rate` | `average-rate`, `rate-context`, `instant` |
| `point` | `definition`, `tangent`, `derivable` |
| `rules` | `powers`, `product-quotient`, `derivative-graph` |
| `chain` | `chain-power`, `chain-exp`, `chain-log` |
| `economy` | `higher`, `smooth-join`, `marginal` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-17):** V1, V2 (sin derivación implícita ni logarítmica), L1 la unidad siguiente, L2 de la media a la instantánea, L3 suaviza la tarifa, M1 prestadas, J1 ¿cuánto cuesta la siguiente?, J2 une f con f′, J4 detective, J5 carrera y memoria. Fuera: V3 (trigonométricas) y J3 (la regla que toca).

## Hecho

**Fases 1+2 (commit 9d092ecb):** 15 lecciones con las diez mejoras (definiciones, «Otro ejemplo» con números propios, vocabulario, «¿Por qué funciona?» en `derivable`, `chain-power` y `marginal`); 15 figuras con `LimitPlot` de Límites 2.º Ciencias (importado) y la portada; diagnóstico 146001–146008, práctica 1–20, retos 101–115, banco 1–50. Enlaces «Antes de empezar» a Derivadas de 1.º Ciencias y a Límites de 2.º Sociales. Test `tests/deribatuak-batx2g-content.test.ts`.

**Fase 3, laboratorio (6 herramientas):**
- Propias: L1 `next-unit` «La unidad siguiente» (`lab/nextUnit.ts`, 146101–146105: coste lineal, lleno (convexo) y con economías de escala (cóncavo); el tablero amplía alrededor de x y dibuja la tangente y el escalón C(x + 1) − C(x)); L2 `instant` «De la media a la instantánea» (`lab/instantRate.ts`, 146201–146205: ventas 12t − t², usuarios t² + 2t y lineal desde t = 2, h de 4 a 0,01, ▶ encoge h); L3 `smooth-tariff` «Suaviza la tarifa» (`lab/smoothTariff.ts`, 146301–146305: x², x² + 1 y −x² + 6x seguidas de ax + b; un solo par sin salto ni pico).
- Prestadas de Derivadas 1.º con sus retos e ids: `smooth` (¿derivable aquí?), `slope-graph` (la gráfica de f′) y `chain` (la cadena de máquinas). No se presta la secante de 1.º: L2 hace lo mismo con contexto.
- Test `tests/deribatuak-batx2g-lab.test.ts`.

**Fase 4, juegos (5):**
- Propios: J1 `next-cost` (`games/nextCost.ts`, 146501–146503: costes cuadráticos, con raíz o logaritmo, ingresos y beneficio; opciones con el coste medio y el total como errores); J2 `match-slope` (`games/matchSlope.ts`, 146601–146603: fórmula de f y tres gráficas pequeñas; parábolas, cúbicas, e y ln); detective (`games/detective.ts`, 146701–146703).
- Carrera (`games/race.ts`, 146401–146405, 15 tipos; el test recalcula cada respuesta con derivadas numéricas) y memoria (`games/boards.ts`, 146801–146803).
- Test `tests/deribatuak-batx2g-games.test.ts`.

## Trucos

- En `matchSlope`, la exponencial no usa k = −1: con ese valor el «signo cambiado» de −k·eᵏˣ es la propia f y dos gráficas salen iguales.
- En euskera, nada de años como «2018an»: el sufijo va pegado al número.

## Cierre (2026-11-17)

- **Comprobado:** 3308 tests, lint y build en verde; inventario OK.
- **375 px en eu, es y ar:** las 15 lecciones y el resumen, las 6 herramientas (antes y después de predecir), ¿cuánto cuesta la siguiente? y une f con f′ (todas las rondas de los tres niveles), detective (6 rondas por nivel). Arreglos: notas del eje de la figura `marginal` (ox 54), lecturas largas de `next-unit` e `instant` en dos líneas, la lectura de `smooth-tariff` sin «:» (MathText lo dibuja como ÷), dos soluciones del banco en `gathered`. Las fórmulas de práctica, retos y banco se midieron con KaTeX a 22 px: ninguna pasa de 400 px.
- **Al fusionar:** `paths.ts` es una sola línea; las líneas `active: true` de `courses.ts` están juntas.
- **Excepción conocida (2026-11-17):** la herramienta prestada `slope-graph` (Derivadas 1.º) trae, entre sus cuatro funciones, $\sin x$ y un reto con $\cos 0$, aunque la trigonometría quedó fuera (V3 no elegida). No se puede editar la de 1.º; quitarla dejaría la etapa `rules` sin herramienta. Pendiente de que el dueño decida: dejarla o cambiarla por una propia.

## Publicación

- 2026-11-18: publicada en matella.net con la primera tanda de 2.º Sociales (`main` 2bbfdde, bundle `index-4g-iHeeL.js`). Comprobada en vivo a 375 px en eu, es y ar.
