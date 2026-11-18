# Integralak · 2.º Bachillerato Ciencias Sociales

Quinto y último tema del bloque Análisis de 2.º Sociales (reparto en paralelo del 2026-11-17): curso `batx2-gizarte`, tema `integrales` (un solo tema: indefinida y definida).

- **Carpeta:** `src/pages/batx2-gizarte-integralak`
- **`storagePrefix`:** `matella-integralak-batx2g`
- **Rama:** `feat/integralak-batx2g`, cortada de `feat/adierazpena-batx2g` (fe75c42c)
- **Bloque de ids:** 149000–149999 (diagnóstico 149001–149008, laboratorio propio 1491xx–1492xx, juegos 149401–149899)
- **Servidor de pruebas:** puerto 5202 (`.claude/launch.json` sin commit)

## Fuentes y alcance

- **Libros (solucionarios):** Santillana 2.º Bach Sociales U9 y Anaya Matemáticas Aplicadas a las CCSS II U9. Solo se saca el alcance.
- **Lo que traen los dos:** primitiva e integral indefinida, inmediatas (potencias, raíces, exponenciales, 1/x y compuestas f′·fⁿ, f′/f, f′·eᶠ), primitiva por un punto, área con rectángulos, Barrow, propiedades, área curva-eje (con cambios de signo) y entre dos curvas. Fuera (V2): integración por partes y racionales. No elegido: V3 (cambio de variable).

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `primitives` | `primitive`, `powers`, `exp-log` |
| `composite` | `power-chain`, `log-exp-chain`, `condition` |
| `definite` | `rectangles`, `barrow`, `properties` |
| `areas` | `area-axis`, `area-sign`, `between` |
| `economy` | `cost-from-marginal`, `accumulated`, `income-from-marginal` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-17):** V1, V2, V4 (el excedente, que no está en los libros, se cambia por «del ingreso de la unidad siguiente al ingreso total»: lección `income-from-marginal`), L1, L2, L3, M1, J1 «¿Qué primitiva es?», J2 «Área con signo», J4 detective, J5 carrera y memoria.

**Cambio en el laboratorio (para avisar al dueño):** L1 «Rectángulos que se ajustan» y L3 «Área entre dos curvas» ya existen en Integrales de 1.º Ciencias (`rectangles` y `between`), y también el área con signo (`signed`): se prestan con sus retos e ids. La L2 «La función área» de 1.º lleva el coseno (trigonometría, fuera de Sociales), así que no se presta: se hace propia en economía, «Del marginal al total» (`total`, que también cubre la L4 del menú). Segunda herramienta propia, «¿Cuándo se recupera la inversión?» (`payback`), para cumplir el mínimo de dos propias.

## Hecho

**Fases 1–4 (commit en esta rama):**
- 15 lecciones con las diez mejoras («¿Por qué funciona?» en `primitive`, `barrow` y `cost-from-marginal`); 15 figuras con `AreaPlot` de Integral mugagabeak 2.º Ciencias (importado) y la portada.
- Diagnóstico 149001–149008, práctica 1–20, retos 101–115, banco 1–50.
- Laboratorio (5): propias `total` (`lab/total.ts`, 149101–149105: C(x) = K + ∫₀ˣ C′ en tres empresas) y `payback` (`lab/payback.ts`, 149201–149205: beneficio mensual b(t) = mt − c, pérdida en rojo y ganancia en verde hasta A(t) = 0). Prestadas de Integrales 1.º: `rectangles`, `signed`, `between`.
- Juegos (5): propios J1 `primitive` (`games/whichPrimitive.ts`, 149501–149503; el test deriva cada candidata y solo la correcta da f) y J2 `signed` (`games/signedArea.ts`, 149601–149603: ¿es el área, con el signo cambiado o hay que partir?); detective (`games/detective.ts`, 149701–149703); carrera (`games/race.ts`, 149401–149405, el test recalcula cada respuesta con integrales numéricas) y memoria (`games/boards.ts`, 149801–149803).
- Tests `tests/integralak-batx2g-{content,lab,games}.test.ts`.

## Trucos

- `takeaway-notation` exige que las letras de la idea clave sean las de la lección: nada de `A=\int_a^b…` si la lección escribe `a`.

## Cierre (2026-11-17)

- **Comprobado:** 3405 tests, lint y build en verde; inventario OK (2 juegos propios, 5 herramientas).
- **375 px en eu, es y ar:** la portada y las 15 lecciones, las 5 herramientas (cada variante, antes y después de predecir y con los pasos al máximo), ¿qué primitiva es? y área con signo (las 6 rondas de los tres niveles), detective (6 rondas por nivel), carrera y memoria al empezar: sin problemas. Arreglo: 4 soluciones de práctica, retos y banco en filas; medidas con KaTeX a 22 px, ninguna pasa ya de 400 px.
- **Al fusionar:** `paths.ts` es una sola línea; las líneas `active: true` de `courses.ts` están juntas.

## Publicación

- 2026-11-18: publicada en matella.net con la primera tanda de 2.º Sociales (`main` 2bbfdde, bundle `index-4g-iHeeL.js`). Comprobada en vivo a 375 px en eu, es y ar.
