---
name: matella-video-explicativo
description: Crea los vídeos explicativos verticales (1080×1920) de una unidad de Matella — cinco por unidad, uno por etapa — primero en euskera y luego en castellano, inglés y árabe, con el motor propio de promo/explicaciones/v2: un dibujo que se transforma paso a paso, un pie por paso, resumen «Gogoratu» y quiz con cuenta atrás. También audita las traducciones y re-renderiza. Úsala SIEMPRE que el dueño pida «los vídeos de la unidad X», «vídeos explicativos», «los vídeos en euskera / en los otros idiomas», «rehaz el vídeo de…» o un vídeo para redes sobre un tema concreto.
---

# Vídeos explicativos de Matella

Un vídeo por etapa de la unidad (5 por unidad), de 85 a 125 s, que explica **un concepto** con un dibujo
que se transforma. Lo que se busca es claridad, no velocidad: el 2026-10-12 el dueño rechazó una primera
versión de 36 s por rápida y por saltarse pasos, y pidió la altura de «la mejor educación».

**Solo funciona en el Mac del dueño.** `promo/` no está en git (pesa unos 12 GB con los MP4 y los
fotogramas) y el render usa Chrome sin cabeza y `swiftc`. En una sesión en la nube no se puede renderizar;
solo se puede escribir y auditar un guion si la carpeta existe. Antes de empezar, comprueba que existe
`promo/explicaciones/v2/` y que Chrome está en `/Applications/Google Chrome.app`.

Identidad visual y audio: sección «Vídeo» de [../matella-marca/formatos.md](../matella-marca/formatos.md).

## Cómo es un vídeo (estructura fija)

gancho (4,6 s) → título (4,2 s) → **actos** (el dibujo que se transforma, con un pie por paso y un
«capítulo») → resumen «Gogoratu» → quiz con cuenta atrás de 3 s → logo y `matella.net`.
Los ejemplos y la notación son **los mismos que las lecciones de la web**
(`src/pages/<unidad>/lessons.tsx` o `lessons.ts`); no inventes otros. El euskera es el guion original y la
fuente de claves de las demás lenguas.

## Flujo

1. **Elige unidad y etapas.** Cinco vídeos, uno por etapa de la unidad (`stages` de `lessons`). Pregunta si
   el dueño quiere solo euskera (lo habitual la primera vez) o también es/en/ar.
2. **Escribe el guion** `promo/explicaciones/v2/<unidad>.js` en euskera: `LESSONS.<unidad>[1..5] = { tone,
   stickers, hook, title, sub, acts: [{ chapter, dur, caps, sfx, draw(t) }], summary, quiz }`. Lee antes
   `ekuazioak.js` o `zatikiak.js` como modelo y reutiliza piezas de otros guiones (`zk*` de zatikiak,
   `al*` de aljebra, `pp*` de proportzionaltasuna) en lugar de copiarlas. Cada pie (`caps`) es `[segundo,
   'texto con *resaltado*']` y debe caer sobre lo que el dibujo hace en ese instante.
3. **Regístralo:** una línea `<script src="<unidad>.js">` en `v2/index.html` (antes de `scenes.js`), la
   entrada de `UNIT_NAME` en `scenes.js` y, si usa exponentes o subíndices dibujados (x², a₂), añade la
   unidad a `SUPS`. Ojo: la etiqueta `2. DBH` de `scenes.js` (`const lab = …`) está escrita a mano; para otro
   curso hay que parametrizarla.
4. **Previsualiza:** `node promo/serve.mjs` y abre
   `http://localhost:5290/explicaciones/v2/index.html?unit=<unidad>&stage=<n>&lang=eu&t=<segundo>`
   (`lang` = eu/es/en/ar; con `t` queda en pausa en ese segundo). Revisa el dibujo, la sincronía de los pies
   y que nada se salga de los 1080 px. (Con el panel del navegador oculto no hay capturas: pide verlo.)
5. **Renderiza el euskera** (puede tardar varios minutos por vídeo; `JOBS` limita cuántos se renderizan a la vez):

   ```bash
   export PATH=$PATH:$HOME/pinokio/bin/miniconda/bin
   LANGS=eu promo/explicaciones/v2/build.sh <unidad>:1 <unidad>:2 <unidad>:3 <unidad>:4 <unidad>:5
   ```

   Sale `promo/explicaciones/2dbh-<unidad>-<etapa>-<idioma>.mp4`.
6. **Otros idiomas, cuando los pida.** Añade a `v2/texts.js`, en los bloques `es`, `en` y `ar`, una clave por
   cada texto del guion (la clave es el euskera exacto, con su marcado). Después **audita**:

   ```bash
   node .claude/skills/matella-video-explicativo/scripts/auditar-textos.mjs <unidad>
   ```

   y solo cuando salga OK renderiza (`build.sh <unidad>:<n>`; por defecto `es en ar`).
7. **Revisa los fotogramas** de cada idioma, sobre todo el árabe, a 720 px: a 360 px el orden de las
   matemáticas parece torcido aunque esté bien. Claude no puede oír el audio: pide la opinión del dueño.
8. **Anota** en la memoria/`docs/claude-notes/` qué unidad y qué idiomas están hechos.

## Reglas que no se pueden saltar

- **No borres fotogramas** de `~/Library/Caches/matella-explicaciones/` sin permiso del dueño.
  `build.sh` **borra la carpeta de fotogramas del vídeo** antes de renderizarlo: nunca vuelvas a renderizar
  un vídeo ya hecho sin su visto bueno.
- Una falta de traducción **no avisa**: `TR()` deja el euskera en el vídeo. Por eso el audit va antes del
  render. El audit solo ve lo que pasa por `TR()` (gancho, título, pegatinas, subtítulo, capítulos, pies,
  resumen y quiz); no ve textos que un `draw()` compone o dibuja él mismo (plantillas `${n} egun`,
  etiquetas de fichas): comprueba esos mirando los fotogramas.
- Pendiente conocido: la pegatina `0,5` del gancho de Zatikiak salió en euskera en los vídeos en/ar ya
  renderizados (las pegatinas no se traducían antes del 2026-10-14). Arreglarlo exige re-renderizar: pregunta.

## Notación e idiomas

- es: m.c.d./m.c.m., coma decimal (0,75), `35 %` con espacio en prosa y `35_%` dentro de fórmulas.
- en: GCD/LCM, punto (0.75), `35%`. ar: ق.م.أ / م.م.أ, 0.75 y 35%, cifras latinas.
- Las unidades siguen en latín (m, s, kg, km/h, €) en todas. `~` entre número y unidad (`450~€`).
- Euskera: `%35`; los sufijos tras cifras siguen `src/pages/dbh2-zatigarritasuna/basque.ts`.
- **Árabe:** el texto SVG ignora los aislantes bidi (⁦⁩). Las etiquetas de ficha («chips») deben ser árabe
  puro: mezclar árabe y matemáticas en una ficha invierte el orden. En las filas/fórmulas, deja un espacio
  entre la palabra árabe y la matemática que sigue (`ق.م.أ (84,_126) = 42{v}`). En los pies, la flecha que
  lleva a lo siguiente es `←`; en filas matemáticas se mantiene `→`. Los titulares animan palabra a palabra
  (`wordsAr`); los titulares solo matemáticos quedan LTR.
- Fracciones: una ficha `a/b` se dibuja apilada; en esas filas `(`, `)` y `)²` crecen. El resumen y el quiz
  cambian a ese dibujo solo si el texto lleva una fracción.
- Claves de `texts.js`: el euskera exacto, con `*resalte*`, `{b|resalte}` (b, c, g, v, m, k) y `_` como
  espacio dentro de filas; una fórmula que lleva una palabra (MKT, ZKH) necesita su propia clave.
