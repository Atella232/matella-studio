# Deribatuaren aplikazioak · 2.º Bachillerato Ciencias Sociales

Tercer tema del bloque Análisis de 2.º Sociales (reparto en paralelo del 2026-11-17): curso `batx2-gizarte`, tema `aplicaciones-derivada`.

- **Carpeta:** `src/pages/batx2-gizarte-aplikazioak`
- **`storagePrefix`:** `matella-aplikazioak-batx2g`
- **Rama:** `feat/aplikazioak-batx2g`, cortada de `feat/deribatuak-batx2g` (3389fa00)
- **Bloque de ids:** 147000–147999 (diagnóstico 147001–147008, laboratorio propio 1471xx–1473xx, juegos 147401–147899)
- **Servidor de pruebas:** puerto 5202 (`.claude/launch.json` sin commit)

## Fuentes y alcance

- **Libros (solucionarios):** Santillana 2.º Bach Sociales U7 y Anaya Matemáticas Aplicadas a las CCSS II U7 «Aplicaciones de las derivadas». Solo se saca el alcance.
- **Lo que traen los dos:** recta tangente (y paralela a una dada, en el punto de inflexión), crecimiento y decrecimiento, máximos y mínimos relativos y absolutos (en un intervalo cerrado), extremos con parámetros, curvatura e inflexión, leer la gráfica de f′, y optimización con contextos de empresa (beneficio, coste medio, ingresos con precio). Fuera: L'Hôpital, Rolle y valor medio (no los traen).

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `tangent` | `tangent-line`, `parallel-tangent`, `inflection-tangent` |
| `growth` | `sign`, `intervals`, `growth-context` |
| `extrema` | `relative`, `absolute`, `parameters` |
| `curvature` | `second-sign`, `inflection`, `read-graph` |
| `optimization` | `max-profit`, `min-average`, `max-income` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-17).** L3 de la propuesta se cambió por «El precio que más ingresa»: la tabla de signos ya la hace la herramienta `sign` de Aplicaciones 1.º, que se presta.

## Hecho

**Fases 1–4 (commit en esta rama):**
- 15 lecciones con las diez mejoras (definiciones, «Otro ejemplo» con números propios, vocabulario, «¿Por qué funciona?» en `relative`, `max-profit` y `min-average`); 15 figuras con `LimitPlot` de Límites 2.º Ciencias (importado) y la portada.
- Diagnóstico 147001–147008, práctica 1–20, retos 101–115, banco 1–50. Enlaces «Antes de empezar» a Aplicaciones de 1.º Ciencias y a Derivadas de 2.º Sociales.
- Laboratorio (6): propias L1 `profit` «Ingreso menos coste» (`lab/profit.ts`, 147101–147105: taller, panadería e imprenta; I, C y el hueco B), L2 `average` «Coste medio mínimo» (`lab/average.ts`, 147201–147205: M(x) y C′(x) se cortan en el mínimo), L3 `price` «El precio que más ingresa» (`lab/price.ts`, 147301–147305: gimnasio, concierto y hotel, I(x) = (p + x)(q − kx)). Prestadas de Aplicaciones 1.º con sus retos e ids: `sign`, `box`, `curvature`.
- Juegos (5): propios J1 `extreme` «¿Máximo, mínimo o nada?» (`games/extremeKind.ts`, 147501–147503: tabla de signos, polinomios, economía) y J2 `optimize` «Optimiza la empresa» (`games/optimize.ts`, 147601–147603: beneficio, coste medio, precio); detective (`games/detective.ts`, 147701–147703, 12 errores de esta unidad); carrera (`games/race.ts`, 147401–147405, 15 tipos) y memoria (`games/boards.ts`, 147801–147803).
- Tests `tests/aplikazioak-batx2g-{content,lab,games}.test.ts`.

## Trucos

- `lesson-checks` toma un par «(a,b)» como punto de la gráfica y «x=3» como solución de la fórmula del enunciado: si la respuesta no es eso, pon dos fórmulas en el enunciado o escribe las opciones como desigualdades.
- El «Otro ejemplo» no puede repetir números del «Compruébalo».

## Cierre (2026-11-17)

- **Comprobado:** 3341 tests, lint y build en verde; inventario OK (2 juegos propios, 6 herramientas).
- **375 px en eu, es y ar:** las 15 lecciones y la portada, las 6 herramientas (cada variante, antes y después de predecir y con el paso al máximo), ¿máximo, mínimo o nada? y optimiza la empresa (las 6 rondas de los tres niveles), detective (6 rondas por nivel), carrera y memoria al empezar. Arreglos: cuatro fórmulas de lecciones en `gathered` (`intervals`, `max-profit`, ejemplos de `min-average` y `max-income`), dos líneas del detective acortadas (`ends`, `rise-for-price`), el hueco del beneficio en mostaza (el verde era el color de la etapa) y 13 fórmulas de práctica, retos y banco en filas: medidas con KaTeX a 22 px, ninguna pasa ya de 400 px.
- **Al fusionar:** `paths.ts` es una sola línea; las líneas `active: true` de `courses.ts` están juntas.
