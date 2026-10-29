---
name: matella-nueva-unidad
description: Crea una unidad V2 nueva de Matella (lecciones, retos, laboratorio, juegos y ejercicios en euskera, castellano y árabe) o rehace el laboratorio y los juegos de una unidad existente, y exige que cada unidad tenga juegos y herramientas de laboratorio PROPIOS de su tema, no solo la carrera y las parejas de siempre. Úsala SIEMPRE que el dueño diga «sigue con el siguiente tema/unidad», «hacemos la unidad de…», «empezamos X de Y DBH», «revisa o mejora el laboratorio / los juegos de…» o «lab plus», aunque no diga V2.
---

# Nueva unidad V2 de Matella

Cada unidad es una pieza grande (unas 15 lecciones, 98 ejercicios, 5–13 herramientas, varios juegos) que
llega a alumnado de ESO. Esta skill fija el **orden de trabajo** y, sobre todo, una regla del dueño que se
había perdido por el camino: **cada unidad lleva juegos y herramientas de laboratorio pensados para ese
tema.** Hoy 31 de las 44 unidades con juegos solo tienen la carrera y las parejas de memoria con preguntas
nuevas (compruébalo con `scripts/inventario-unidad.mjs --all`). Reutilizar sigue estando bien como base;
lo que falta es lo propio.

Lee antes: `CLAUDE.md` (comandos y trucos), `docs/claude-notes/README.md` y la nota de la unidad o del curso
(ids ya usados, qué se reutiliza), y las memorias `remaining-*` para saber qué toca. Trabaja en una rama
por cambio (`feat/...`); `npm run deploy` solo con el visto bueno del dueño; en sesiones en la nube no
toques `main` ni `gh-pages`.

## La regla: propio, no repetido

- **Mínimo por defecto: 2 juegos propios y 2 herramientas de laboratorio propias**, además de lo que se
  reutilice de otras unidades. Es un valor por defecto: el dueño puede subirlo o bajarlo; si una unidad
  pequeña no da para tanto, dilo en la propuesta en lugar de rellenar.
- **Propio** = una mecánica que solo tiene sentido en este tema (el depósito con grifos, los dos vehículos en
  la carretera, el ticket de compra, la barra del 100 %, la balanza, el tren de fracciones). **No cuenta**
  la carrera ni las parejas con preguntas nuevas, ni un tablero nuevo en `boards.ts`, ni una calculadora
  con pasos. Un «detective de errores» sí es buen juego, pero solo si sus fallos son los errores típicos de
  este tema, y no puede ser el único propio.
- Una herramienta propia deja **manipular** un objeto del tema (arrastrar, deslizar, ▶ mover, construir)
  y ver el efecto; no basta un formulario que da el resultado.

Detalle, criterios de diseño, patrones de calidad y ejemplos reales en
[references/juegos-y-herramientas-propios.md](references/juegos-y-herramientas-propios.md).

## Flujo

1. **Mira el estado.** Si es una revisión, ejecuta el inventario (Node solo está en Pinokio: añade su carpeta
   **al final** del PATH):

   ```bash
   export PATH=$PATH:/Users/asier/pinokio/bin/miniconda/bin
   node .claude/skills/matella-nueva-unidad/scripts/inventario-unidad.mjs dbh4-akademikoak-trigonometria
   ```

   (`--all` lista todas las unidades; `--games N --tools N` cambian el mínimo.) Si es nueva:
   fuentes (Santillana y Anaya, fuera del repo; nunca copies sus textos) → alcance en 4–6 etapas y unos 15
   temas, siguiendo el orden del libro.
2. **Propón el diseño antes de escribir código.** Es el formato que el dueño ya aprobó en las dos revisiones
   «lab plus»: (a) ideas clave del tema y errores típicos del alumnado; (b) por etapa, qué objeto manipula el
   alumno; (c) un **menú con letras** —A arreglos, M mejoras de lo que hay, **L herramientas nuevas, J juegos
   nuevos**, V lecciones— con una línea por opción; (d) el orden de fases que recomiendas. El dueño elige.
   Es una propuesta, no se construye nada hasta su respuesta.
3. **Fases 1–2, lecciones y contenido:** lecciones por etapa, diagnóstico, práctica guiada (20), retos
   (15), banco de ejercicios (50) y figuras. Cada unidad en su carpeta `src/pages/<curso>-<unidad>/`.
4. **Fase 3, laboratorio:** primero las herramientas **propias** (L), después las prestadas. Cada una con
   predicción, retos infinitos y, si hay movimiento, ▶.
5. **Fase 4, juegos:** primero los **propios** (J), después carrera y parejas, que se reutilizan.
6. **Cierra:** `npm test`, `npm run lint` y `npm run build` en verde; el inventario de la unidad debe dar OK
   (si no, explica por qué o añade lo que falta); revisión a 375 px en eu, es y ar; añade a la nota de `docs/claude-notes/` lo hecho (commit, ids nuevos, trucos). Ofrece publicar, pero no
   publiques sin su visto bueno.

Una fase por commit y rama; las unidades modelo para copiar la estructura son
`src/pages/dbh2-zatikiak-prototype` y `src/pages/dbh4-aplikatuak-proportzionaltasuna`.

## Dónde está cada cosa

La estructura real, los puntos de registro (`src/data/courses.ts`, `src/router/index.tsx`), los ids de
progreso y las piezas del motor están en [references/arquitectura.md](references/arquitectura.md).
Ojo: `docs/unit-reusable-template.md` y `docs/unit-model.md` describen un árbol de carpetas
(`GamesPage/gamesData.ts`, `exercisesData.ts`…) que **no es el de las unidades V2 reales**. No lo sigas;
menciónaselo una vez al dueño y no lo edites sin que lo pida.

## Trampas que se repiten en todas las unidades

- Router de hash: `#/matematika/...`. `MathText` convierte `:` en ÷; para dividir, `\div`.
- El test numérico solo evalúa `\frac`, no `\dfrac` (las lecciones sí pueden usar `\dfrac`); parte las
  desigualdades encadenadas (`a<b=c`) y no pongas `0=8` dentro de `$…$`.
- Cajas «takeaway»: el KaTeX sale en mayúsculas; nada de letras minúsculas en sus fórmulas.
- Euskera: ningún sufijo pegado a un número. Árabe: fórmulas envueltas con LRI/PDI, sin árabe dentro de
  `\text{}` y `{,}` pasa a `.`; el texto de SVG ignora los aislantes bidi.
- El CSS nuevo va en archivos propios (28 unidades importan `lab/Lab.css`). Textos de `observe` en
  herramientas: texto plano, no LaTeX. Colores de acierto/error con `--success`/`--error`.
- Los textos de las unidades V2 están hoy en eu, es y ar (`UnitLanguage`); `CLAUDE.md` nombra también el
  inglés para la web: pregunta antes de añadirlo a una unidad.
- Si el panel del navegador está oculto, no hay capturas ni cuenta atrás de carrera: comprueba desbordes
  con `getBBox` y confía en los tests.
