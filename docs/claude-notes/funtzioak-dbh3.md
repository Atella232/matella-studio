# Funtzioak · 3. DBH (funciones lineales y cuadráticas)

Tema `funciones-lineales` de `dbh3`. Carpeta `src/pages/dbh3-funtzioak/`, `storagePrefix` `matella-funtzioak-dbh3`, ruta `#/matematika/dbh3/funciones-lineales`, rama `feat/funciones-dbh3` (sale de `feat/movimientos-dbh3`, ver `dbh3-plan.md`).

Fuentes: Santillana 3.º U11 «Funciones» + U12 «Funciones lineales y cuadráticas»; Anaya 3.º U8 «Funciones y gráficas» + U9 «Funciones lineales». El curso solo tiene un tema («Funciones lineales»), así que la unidad junta las dos de cada libro: gráficas y características, rectas y parábolas. Ejercicios originales. Idiomas: eu, es, en, ar.

## Diseño (encargo del 2026-10-31, sin menú)

- Errores típicos: −3² por (−3)²; x = 0 para cortar el eje X; el máximo dado como su x; perder un signo al sustituir; pendiente al revés o con los puntos en distinto orden; n = la y de cualquier punto; pasar un término sin cambiar el signo; b/2a sin el menos; −b/a sin el 2; el signo de c en −4ac; (−p)² negativo en el vértice.
- Objetos de la unidad: el paseo (gráfica distancia–tiempo por horas), el taxímetro (y = mx + n), dos tarifas (dos rectas y su corte) y el lanzamiento de una pelota (parábola h = h₀ + vt − 5t²).

## Fase 1 (lecciones y contenido)
- 5 etapas: `graphs`, `features`, `linear`, `lines`, `quadratic`. 15 temas: function-concept, domain-range, reading-graphs · growth, extremes, intercepts · proportional, slope, affine · two-points, parallel-lines, linear-problems · parabola-shape, vertex, parabola-intercepts.
- Figuras prestadas (todas reciben `language`): 2. DBH Funtzioak (`TableFigure`, `ReadFigure`, `VariationFigure`, `ExtremesFigure`, `InterceptsFigure`, `ProportionalFigure`, `SlopeFigure`, `AffineFigure`, `LineEquationFigure`), 4.º ap Funtzioak (`DomainGraphFigure`), 4.º ap Grafikoak (`LinearModelsFigure`, `ParallelFigure`, `ParabolaShapesFigure`, `VertexFigure`, héroe `GraphsHeroArt`), 4.º ak Polinomikoak (`ParabolaCutsFigure`). Las de 2. DBH tienen viewBox 720 y se desplazan dentro de su marco a 375 px (igual que en su unidad). La página importa `dbh2-funtzioak-v2/Functions.css`.
- Diagnóstico 7001–7008; práctica 1–20; retos 101–115; banco 1–50.
- `functions3Checks` (en `content.ts`): tipo de cálculo y datos de cada respuesta. La explicación se escribe con `functionWork` a partir del mismo dato, un paso por línea (`gathered`) para que quepa en el móvil; el test recalcula la respuesta, comprueba cada igualdad y que los datos (salvo coeficientes 0 y ±1) están en el enunciado.
- `\parallel` sale mal en MathText (se convierte en «\paral\le l»): no usarlo.

## Fase 2 (laboratorio, 13 herramientas)
- 4 propias: `walk` El paseo (381xx; velocidad de cada hora; predicción «¿más o menos de 4 km?»; ▶ camina), `taxi` El taxímetro (382xx; bajada, precio/km, km; predicción «¿más o menos de 20 €?»; ▶ el taxi sube por la recta), `plans` Dos tarifas (383xx; A = 5x + 20 fija, B se construye; predicción «¿B más barata, igual o más cara este mes?»; ▶ los meses), `throw` El lanzamiento (384xx; v, h₀ y cursor t; predicción «¿lo más alto antes, a los 2 s o después?»; ▶ lanza).
- 9 prestadas: `relation`, `slope`, `line` (2. DBH Funtzioak), `domain`, `explorer`, `intercepts` (4.º ap Funtzioak), `point-slope`, `two-lines`, `parabola` (4.º ap Grafikoak). En árabe la «y» de los ejes de esas herramientas se sale un poco del viewBox (ya era así allí).

## Fase 3 (juegos)
- 6 juegos: carrera (55101–55105, cada pregunta es un `FunctionCheck` y su solución sale de `functionWork`), parejas (55201–55203), `match` ¿Qué gráfica es? (55301–55303: rectas, pendientes fraccionarias, parábolas), `story` La historia del paseo (55401–55403: un paseo en palabras y tres gráficas), `signs` Cazador de signos (55501–55503: m y n, a y c, a y x_v), `detective` Detective de funciones (55601–55603).
- Los tres juegos de dibujo comparten `QuizGames.tsx` (un tablero, ocho rondas) y `quiz.ts`.
- Tests: `tests/funtzioak-dbh3-content|lab|games.test.ts`. El test de `match` evalúa cada ecuación en varios x y comprueba que solo la buena coincide con la gráfica.

## Estado
Hecha en la rama `feat/funciones-dbh3`. Tests (1099), lint y build en verde; inventario OK; revisada a 375 px en eu, es y ar. Sin publicar.
