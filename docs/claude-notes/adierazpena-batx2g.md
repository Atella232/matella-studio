# Funtzioen adierazpen grafikoa · 2.º Bachillerato Ciencias Sociales

Cuarto tema del bloque Análisis de 2.º Sociales (reparto en paralelo del 2026-11-17): curso `batx2-gizarte`, tema `representacion-funciones`.

- **Carpeta:** `src/pages/batx2-gizarte-adierazpena`
- **`storagePrefix`:** `matella-adierazpena-batx2g`
- **Rama:** `feat/adierazpena-batx2g`, cortada de `feat/aplikazioak-batx2g` (1356f3a7)
- **Bloque de ids:** 148000–148999 (diagnóstico 148001–148008, laboratorio propio 1481xx–1482xx, juegos 148401–148899)
- **Servidor de pruebas:** puerto 5202 (`.claude/launch.json` sin commit)

## Fuentes y alcance

- **Libros (solucionarios):** Santillana 2.º Bach Sociales U8 y Anaya Matemáticas Aplicadas a las CCSS II U8. Solo se saca el alcance.
- **Lo que traen los dos:** dominio, simetrías, cortes, asíntotas verticales, horizontales y oblicuas, crecimiento, extremos, curvatura e inflexión, gráficas de polinómicas, racionales, exponenciales y logarítmicas; Anaya añade valor absoluto, describir una gráfica y dibujar desde datos. Fuera (V2): periodicidad y trigonométricas.

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `first` | `domain`, `symmetry`, `intercepts` |
| `asymptotes` | `vertical`, `horizontal`, `oblique` |
| `derivatives` | `monotony`, `concavity`, `summary` |
| `graphs` | `polynomial`, `rational`, `exp-log` |
| `reading` | `absolute-value`, `describe`, `from-data` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-17):** V1, V2, L1 «Capas de la gráfica», L2 «La división da la oblicua», L3 «Dibuja desde los datos», M1, J1 «¿Qué gráfica es?», J2 «Completa la ficha», J4 detective, J5 carrera y memoria. L1 ya existe como `layers` en Aplicaciones de 1.º («Monta la gráfica»): se presta en lugar de rehacerla.

## Hecho

**Fases 1–4 (commit en esta rama):**
- 15 lecciones con las diez mejoras («¿Por qué funciona?» en `horizontal`, `oblique` y `absolute-value`); 15 figuras con `LimitPlot` de Límites 2.º Ciencias (curvas partidas en la asíntota) y la portada.
- Diagnóstico 148001–148008, práctica 1–20, retos 101–115, banco 1–50.
- Laboratorio (5): propias L2 `oblique` «La división da la oblicua» (`lab/oblique.ts`, 148101–148105: tres cocientes, el resto decide si la curva va encima, debajo o sobre la recta) y L3 `data` «Dibuja desde los datos» (`lab/fromData.ts`, 148201–148205: modelo b + k/(x − a) con tres pasos, una sola terna cumple cada ficha). Prestadas: `layers` (Aplicaciones 1.º), `mirror` y `derivative` (Representación 2.º Ciencias), con sus retos e ids. No se presta `symmetry` de 2.º Ciencias porque lleva periodo y trigonometría.
- Juegos (5): propios J1 `which` «¿Qué gráfica es?» (`games/whichGraph.ts`, 148501–148503) y J2 `sheet` «Completa la ficha» (`games/sheet.ts`, 148601–148603); detective (`games/detective.ts`, 148701–148703); carrera (`games/race.ts`, 148401–148405) y memoria (`games/boards.ts`, 148801–148803).
- Tests `tests/adierazpena-batx2g-{content,lab,games}.test.ts`.

## Trucos

- En las definiciones, las fórmulas tienen que ir en el mismo orden en los cuatro idiomas (el test las compara una a una).

## Cierre (2026-11-17)

- **Comprobado:** 3373 tests, lint y build en verde; inventario OK (2 juegos propios, 5 herramientas).
- **375 px en eu, es y ar:** la portada y las 15 lecciones, las 5 herramientas (cada variante, antes y después de predecir y con los pasos al máximo), ¿qué gráfica es? y completa la ficha (las 6 rondas de los tres niveles), detective (6 rondas por nivel), carrera y memoria al empezar. Arreglos: el ejemplo de `intercepts` en dos filas, la lectura de `oblique` en dos líneas y 8 soluciones del banco en filas; medidas con KaTeX a 22 px, ninguna fórmula de práctica, retos o banco pasa de 400 px.
- **Al fusionar:** `paths.ts` es una sola línea; las líneas `active: true` de `courses.ts` están juntas.
