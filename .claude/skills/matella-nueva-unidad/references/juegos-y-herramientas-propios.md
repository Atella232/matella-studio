# Juegos y herramientas de laboratorio propios

El dueño lo pidió expresamente (2026-10-29): en juegos y laboratorios se habían usado «los mismos todo el
rato». Reutilizar «está bien» como base, pero cada unidad necesita además lo suyo, **pensado para su tema**.

## Qué cuenta como propio

| Cuenta | No cuenta |
|---|---|
| Una mecánica que solo tiene sentido en este tema: el depósito con grifos, el encuentro en la carretera, la barra del 100 %, la balanza, el tren de fracciones, la pirámide de sumas, el ticket de compra | La carrera con preguntas nuevas |
| Un objeto que el alumno **manipula** (arrastra, desliza, construye, ▶ mueve) y cuyo efecto ve | Las parejas de memoria con otro tablero (`boards.ts`) |
| Un «detective de errores» cuyos fallos son los **errores típicos de este tema** | Un detective con fallos genéricos, o como único juego propio |
| Una herramienta cuyo estado cambia el dibujo y se puede retar (retos con `isSolved`) | Una calculadora con pasos o un formulario que da el resultado |

Mínimo por defecto: **2 juegos y 2 herramientas propios** (el dueño lo puede cambiar). `scripts/inventario-unidad.mjs`
lo comprueba, pero solo mira el código: decide tú, abriendo la unidad, si de verdad es propio.

## Cómo diseñarlos (antes de escribir código)

1. **Ideas clave y errores típicos del tema.** ¿Qué entiende mal un alumno de 12–16 años? (sumar
   numeradores con denominadores, olvidar que el porcentaje se aplica sobre el nuevo precio, confundir
   directa con inversa…). Cada herramienta o juego debería atacar uno.
2. **Un objeto por etapa.** ¿Qué se puede tocar? Reparto en una barra, una recta con dos móviles, un depósito,
   una balanza, una pirámide de sumas, un tablero de cifras. Si no hay objeto, no hay herramienta propia.
3. **Que el objeto fuerce el concepto.** En «Encuentro en la carretera» el alumno coloca la bandera donde
   se encontrarán y luego ve el viaje: no puede acertar sin entender velocidades y tiempos.
4. **Una solución única por ronda** (en la carretera, un único punto; en el depósito, una única combinación de
   grifos), para que el acierto no sea suerte.
5. **Niveles y estrellas** (`GameInfo` con `levels` y `progressId`), 3 niveles que suben en dificultad.

Referencias reales: Zatikiak 2. DBH (`dbh2-zatikiak-prototype`: Balanza, Pirámide, Tren, Rebajas, Cifras;
herramientas barras, expresión, primos, zoom) y Proportzionaltasuna 4. DBH aplikatuak
(`dbh4-aplikatuak-proportzionaltasuna`: Banco, Carretera, Depósito, Mezcla perfecta, Caja; herramientas barra
del 100 %, regla de tres con flechas, gráfica distancia-tiempo, ticket). Las notas de ambas están en
`docs/claude-notes/zatikiak-dbh2-lab-plus.md` y `proportzionaltasuna-dbh4ap-lab-plus.md`.

## Patrones de calidad que el dueño ya aprobó (por defecto en lo nuevo)

- **Predecir antes de ver el resultado** (`Prediction` en `labTools.ts` de Proportzionaltasuna 4. DBH ap):
  el campo de respuesta se abre tras la predicción.
- **Retos infinitos** con `extraChallenges` y `freshFrom`, para que un reto nunca empiece ya resuelto; los
  extras no guardan progreso y llevan una `solution` que los tests comprueban.
- **▶ para el movimiento** (`usePlayback` en `lab/usePlayback.ts` de esa unidad): móviles, depósito y barras se animan.
- **Dibujos legibles en móvil:** viewBox de 360 de ancho, `maxWidth: 520`, texto de 14–17 px; nunca un
  viewBox de 640 con texto de 6 px.
- **Lógica pura aparte:** `<juego>.ts` / `<herramienta>.ts` sin React; la interfaz en `.tsx` con su propio `.css`.
- **Arte del hub** (`GameArt.tsx`) sin comas decimales (no tiene idioma).
- **Registro** por `info.ts` + `components` de `GamesHub` / `labTools.ts` + `toolComponents` de `LabShell`
  (ver `arquitectura.md`).

## Tests que debe tener cada pieza propia

Modelo: `tests/proportzionaltasuna-dbh4ap-tank.test.ts`. Recorre muchas semillas
(`createRandom(seed * 7919 + nivel)`) y comprueba: rondas bien formadas, solución única, resultados enteros o
«bonitos», KaTeX que renderiza (`katex.renderToString` con `strict: 'error'`), sin sufijos pegados a números
en euskera, sin `{,}` ni `a,b` en árabe y sin árabe dentro de `$…$`. Para herramientas: cada reto fijo se
resuelve desde su estado inicial en un paso, y cada reto infinito se resuelve con su `solution`.

## Cuándo es una revisión («lab plus»)

Si la unidad ya existe y solo tiene carrera y parejas: `inventario-unidad.mjs` lo demuestra; propón el menú
L/J (y A/M si hay fallos) y construye por fases, una rama por fase, como en las dos revisiones anteriores
(fase 1 arreglos y predicciones, fase 2 herramientas nuevas, fase 3 movimiento, fase 4 y siguientes juegos).
