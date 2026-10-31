# Proportzionaltasuna · 3. DBH (proporcionalidad)

Tema `proporcionalidad` de `dbh3`. Carpeta `src/pages/dbh3-proportzionaltasuna/`, `storagePrefix` `matella-proportzionaltasuna-dbh3`, ruta `#/matematika/dbh3/proporcionalidad`, rama `feat/proporcionalidad-dbh3` (sale de `main` 6698152). Primera de las 8 unidades que faltaban en 3. DBH (ver `dbh3-plan.md`).

Fuentes: Santillana 3.º U4 «Proporcionalidad numérica» (razones y proporciones, directa e inversa, repartos, compuesta, porcentajes, interés simple) + Anaya 3.º U3 «Problemas aritméticos» (mezclas, móviles, grifos). Ejercicios originales. Idiomas: eu, es, en, ar.

## Diseño (hecho sin esperar al menú: encargo del dueño del 2026-10-31)

- Ideas clave y errores típicos: sumar en vez de multiplicar en una proporción; usar la regla directa en una inversa; olvidar el cambio de unidad en las escalas; repartir a partes iguales o «dar la vuelta» al reparto directo para hacer el inverso; poner todas las fracciones nuevo/viejo en la compuesta; calcular el % sobre el precio final; sumar porcentajes encadenados; meses como años en el interés; la media simple en las mezclas; sumar velocidades en el alcance; sumar los tiempos de dos grifos.
- La unidad de 4.º aplicadas cubre casi lo mismo y ya tiene sus juegos propios (depósito, carretera, mezcla, banco, caja). Para no clonarla, aquí los objetos propios son otros: la receta y su despensa, el mapa, las ruedas dentadas, el rectángulo que se estira, la fotocopiadora y el botín.

## Fase 1 (lecciones y contenido)
- 5 etapas: `ratios`, `simple`, `compound`, `percent`, `problems`.
- 15 temas: ratio, proportion, scale · direct, inverse, graphs · compound, direct-share, inverse-share · percent-index, chained, interest · mixtures, motion, work. Todos con `mistake`; `cases` en proportion, direct, graphs, percent-index, motion.
- Figuras nuevas (360 de ancho) en `figures.tsx`: `ScaleFigure`, `GearsFigure`, `GraphsFigure` y el componente `Gear`. El resto se reutiliza de 1.º, 2.º y 4.º ap.
- Diagnóstico 6401–6408; práctica 1–20; retos 101–115; banco 1–50.
- `text.ts` guarda `say`/`same`: el test de lecciones lee el código fuente buscando `$…$`, y la expresión regular de `glue` lo confundía.

## Fase 2 (laboratorio)
- 13 herramientas: 4 propias — `recipe` (receta y despensa, ingrediente que se acaba primero, 874xx), `map` (mapa a escala, 873xx), `gears` (ruedas dentadas con ▶, 871xx), `rectangle` (área fija → hipérbola, altura fija → recta, con ▶, 872xx) — y 9 prestadas de 4.º ap y 2.º (rule, compound, share, percentbar, chain, interest, mixture, motion, taps) con sus retos.
- Todas las propias piden una predicción antes del resultado (`PredictionStep` de Zatikiak) y tienen retos infinitos (`freshFrom` en `lab/prediction.ts`).
- Lógica pura en `lab/gears.ts`, `rectangle.ts`, `mapScale.ts`, `recipe.ts`; interfaz en `lab/ProportionTools.tsx`.
- Las fórmulas largas del panel van en dos líneas (`Readout` acepta una lista) para que no se salgan a 375 px.

## Fase 3 (juegos)
- 6 juegos: carrera (88101–88105, 5 circuitos, 15 tipos de error), parejas (88201–88203: proporciones, índices, porcentajes) y 4 propios:
  - `gearbox` La caja de cambios (88301–88303): dos ruedas; una rueda en medio (no cambia la velocidad: la trampa es usar sus dientes); dos ruedas en el mismo eje (se dibujan en dos filas unidas por el eje).
  - `copier` La fotocopiadora (88401–88403): llegar a una medida exacta con botones de %; los índices se multiplican (+25 % y −20 % vuelven al principio).
  - `loot` El reparto del botín (88501–88503): repartir monedas directo a los días o inverso a los fallos.
  - `treasure` El mapa del tesoro (88601–88603): colocar el cofre, medir el camino, adivinar la escala.
- Tests: `tests/proportzionaltasuna-dbh3-content|lab|games.test.ts`.

## Trucos
- En los textos de juegos, el árabe aísla con LRI/PDI las escalas, distancias, medidas y porcentajes (`isolate` en `games/format.ts`); si no, «1 : 20 000.» y «2 cm» salen dados la vuelta.
- `MathText` convierte `:` en ÷: la escala se escribe `1\mathbin{:}50\,000`.
- Los porcentajes encadenados de la carrera se calculan exactos en centésimas: `Math.round(x * 1000) / 10` redondeaba 6,25 a 6,3.
- El lint de React no deja reasignar variables dentro del `map` del render: las direcciones de giro se calculan antes con `reduce`.

## Estado
Fases 1–2 en `453430f`. Fase 3 en el commit siguiente. Tests, lint y tipos en verde; inventario OK (4 juegos propios, 4 herramientas propias). Publicada el 2026-10-31.

## Publicación
Publicada en matella.net el 2026-10-31 junto con las otras 7 unidades de 3.º (fusión de avance rápido de `feat/estadistica-dbh3` en `main`, último commit 5042946; bundle `index-DSpCP6ns.js`). Comprobada en vivo a 375 px en eu, es y ar (ruta, laboratorio y juegos de las 8).
