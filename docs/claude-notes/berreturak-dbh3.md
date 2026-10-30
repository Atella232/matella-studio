# Berreturak eta erroak · 3. DBH (potencias y raíces)

Tema `potencias-raices` de `dbh3` (sustituye al tema `numeros-reales`, que estaba sin activar): Santillana 3.º ESO no tiene unidad «Números reales»; lo real (irracionales, recta, intervalos, aproximación) va dentro de su Unidad 2 «Potencias y raíces». Carpeta `src/pages/dbh3-berreturak/`, `storagePrefix` `matella-berreturak-dbh3`, ruta `#/matematika/dbh3/potencias-raices`, rama `feat/potencias-raices-dbh3`.

Fuentes: Santillana 3.º U2 (págs. 39–72; el PDF es el solucionario, escaneado) + Anaya 3.º U2. Idiomas: eu/es/ar. Los ejercicios son originales; los libros solo fijan alcance y orden.

## Fase 1 (lecciones y contenido)
- 5 etapas: `powers`, `scientific`, `roots`, `reals`, `approx`.
- 15 temas: power-sign, negative-zero, power-rules · sci-write, sci-compare, sci-ops · roots, extract, introduce, radical-ops · irrational, real-line, intervals · rounding, errors.
- Diagnóstico 3601–3608; práctica 1–20 (4 por etapa); retos 101–115 (3 por etapa); banco 1–50 (10 por etapa).
- Figuras reutilizadas de 4.º aplicadas errealak (Powers, Scientific, ScientificOps, Roots, Simplify, RadicalOps, Irrational, RealLine, Intervals, Rounding, Errors) y de 4.º académicas potentziak (PowerRules). Sin figura propia en sci-compare e introduce.
- Test: `tests/berreturak-dbh3-content.test.ts` (copia adaptada del de potentziak, más comprobación de lecciones y de sufijos euskera pegados a números).

## Fase 2 (laboratorio) — hecha
- 10 herramientas: 4 propias (`tokens` fichas de factores 361xx, `square` el cuadrado de la raíz 362xx, `scale` escala de magnitudes 363xx, `spiral` espiral de raíces 364xx) + 6 prestadas de 4.º aplicadas (`powers`, `scientific`, `radicals`, `zoom`, `intervals`, `rounding`, con sus retos 401xx–408xx).
- Lógica pura en `lab/tokens.ts`, `square.ts`, `scale.ts`, `spiral.ts` (retos fijos + `extraChallenges` que nunca empiezan resueltos); interfaz en `lab/BerreturakTools.tsx`; tool list en `lab/labTools.ts`.
- Todas dibujan en un SVG de 360 de ancho. La espiral tiene ▶ (`usePlayback` de proportzionaltasuna 4. DBH ap) y se reescala sola. La escala de magnitudes es de predecir y comprobar.
- Test: `tests/berreturak-dbh3-lab.test.ts` (retos fijos resueltos y no resueltos al abrir; 150 semillas por reto infinito; KaTeX, árabe, sufijos euskera; geometría de la espiral).
- Trucos: los `Stepper` calculan el valor con lo ya pintado, así que al probar desde la consola hay que esperar entre clics; cambiar de herramienta por `location.hash` no cambia la herramienta, se hace con las pestañas; `observe` es texto plano (nada de `$`).

## Fase 3 (juegos) — hecha
- 6 juegos: carrera de 5 circuitos (37101–37105, `race.ts`, 16 tipos de error), **4 propios** — `order` Escala cósmica (37301–37303, ordenar tamaños en notación científica, con tranpas: mismo exponente y números sin normalizar), `extract` Saca de la raíz (37401–37403, fichas de factores primos y parejas), `guard` El guardián del puente (37501–37503, racional o irracional), `detective` Detective de potencias y raíces (37601–37603, 15 errores típicos del tema) — y parejas (37201–37203, `boards.ts`).
- Lógica pura en `games/order.ts`, `extract.ts`, `guard.ts`, `detective.ts`, `race.ts`, `boards.ts`; interfaz en `OrderGame.tsx`, `ExtractGame.tsx`, `GuardGame.tsx`, `DetectiveGame.tsx` (reutiliza `Detective.css` de zatikiak) y `Games.css`.
- Test: `tests/berreturak-dbh3-games.test.ts` (carrera: 5 circuitos × 3 niveles × 120 semillas, cada respuesta recalculada desde `meta`; parejas verdaderas por evaluación numérica; detective: cada línea de cada caso evaluada, la errónea falla y las anteriores y el arreglo valen).
- Inventario: 3 juegos propios + detective de patrón (sus fallos sí son los de esta unidad) y 4 herramientas propias.
- Trucos: el hub guarda el juego abierto; para probar a mano otro juego, recarga la página. En el guardián no se habla de izquierda/derecha (en árabe el primer botón queda a la derecha).

## Revisión final (2026-10-29)
- Las cajas «takeaway» imprimen el KaTeX en mayúsculas: ninguna fórmula suya lleva letras minúsculas; lo vigila un test (`takeaway` en `berreturak-dbh3-content.test.ts`).
- La espiral se comprueba con `getBBox` para cada n de 2 a 17 (no solo para el último); el SVG mide 272 de alto.
- Barrido a 375 px en eu/es/ar: lecciones, laboratorio (las 4 propias), diagnóstico, práctica, retos, banco, los 4 juegos propios y el circuito 4 de la carrera; sin desbordes ni errores de KaTeX.
- Detective: el error relativo usa aproximaciones a menos del 10 % del valor exacto y fracciones exactas; `add-radicands` y `root-sum` (la misma identidad falsa leída al revés) nunca se ofrecen juntos como respuesta y distractor.
- Test de ids: diagnóstico, laboratorio y juegos no repiten ningún id.

## Estado
Rama `feat/potencias-raices-dbh3` con 3 fases (commits fase 1 `4a507e0`, fase 2 `cd97396`, fase 3 `ef46ff4`), tests/lint/build en verde (tests). Fusionada en `main` (2d35676) y **publicada en matella.net el 2026-10-30** (main 76d2d7b, bundle `index-CU3tvjVr.js`). Comprobado en vivo a 375 px en eu/es/ar: inicio, lección, laboratorio, juegos, banco; sin desbordes ni errores de KaTeX ni de consola.

## Ids reservados
Lab: 361xx–364xx (una herramienta por centena). Juegos: carrera 37101–37105, parejas 37201–37203, propios 373xx–376xx.

## Plan acordado con el dueño (2026-10-29)
4 herramientas propias (L1 fichas de factores, L2 el cuadrado de la raíz, L3 escala de magnitudes, L4 espiral de raíces) y 4 juegos propios (J1 escala cósmica, J2 saca de la raíz, J3 el guardián racional/irracional, J4 detective de potencias), más carrera, parejas y herramientas prestadas de 4.º.

## Trucos
- `{,}` en `say()` pasa a `.` en árabe; nada de `\text{}` con texto dentro de KaTeX (en eu/es/ar).
- Euskera: nada de «3ri», «5ekin»: el test lo detecta; reescribe con «oinarriari», «errokizunarekin».
- Hay que registrar el tema en tres sitios: `src/data/courses.ts`, `src/features/unit-v2/paths.ts` (`unitV2Paths`) y `src/router/index.tsx`.
