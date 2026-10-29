# Matella por formatos

Primero las reglas base de [SKILL.md](SKILL.md). Aquí va lo propio de cada formato.

## Web (la propia matella.net)

- Usa las variables que ya existen: `src/index.css` (globales) y `src/features/unit-v2/UnitPage.css` (unidades V2, con `data-stage` / `data-tone`). No inventes colores nuevos.
- El CSS nuevo va en un archivo propio (muchas unidades importan `lab/Lab.css`).
- Las unidades siguen `docs/unit-model.md`, `docs/unit-quality-checklist.md` y `docs/unit-reusable-template.md`.
- Las cajas de idea clave ponen el KaTeX en mayúsculas: nada de letras minúsculas en sus fórmulas.
- Revisa a 375 px en eu, es y ar.

## Artifacts y páginas HTML sueltas

- Copia [tokens.css](tokens.css) dentro de un `<style>` y carga las tres fuentes de Google Fonts.
- Cabecera con el logo en línea (`.m-logo`) y, si es para alumnos, `matella.net` al pie.
- El artifact debe tener modo noche: usa el bloque `prefers-color-scheme` de tokens.css (fondo tinta, texto papel, mismos colores de etapa). Por defecto se diseña en claro.
- Gráficas: ejes y texto en tinta o gris, series con los colores de etapa en orden, cuadrícula de papel detrás.

## Documentos imprimibles (A4, PDF): dosieres, fichas, exámenes

- Fondo blanco cálido (`--card`) para ahorrar tinta; el papel `#F6F1E7` solo en la portada y en bandas.
- Portada: cuadrícula de papel, logo, título grande en Fraunces, curso y tema, una pegatina inclinada del color del primer tema.
- Un color de etapa por tema, en orden (6.º tema = azul otra vez). Cabecera de tema con `.m-stage-band` o con el número grande en el color.
- Estructura habitual: Gogoratu (idea clave mostaza) → Adibide ebatziak → Ariketak → Soluzioak al final.
- Ejercicios numerados con el número en un círculo de tinta; huecos para responder con la línea punteada de `--line-strong`.
- Fórmulas con KaTeX ya renderizado (del `node_modules/katex` del repositorio).
- PDF con Chrome sin cabeza (`--print-to-pdf`), con `<!doctype html>` delante. En `@media print` Chrome ignora `break-inside: avoid` en hijos de grid/flex: convierte las rejillas en bloques y los hijos en `inline-grid`/`inline-flex` con anchos en %, para que una caja no se parta entre páginas.
- Sombras duras más cortas (2–3 px) y bordes de 1,5 px: en papel pesan más.

## Vídeo (promo y explicaciones)

- Motor propio en `promo/` (SVG animado por código → fotogramas → `promo/encode.swift`). Reutiliza `promo/engine.js` (`C`, `logoMark`, `STAGE`) y `promo/explicaciones/v2/` (`lib.js`, `scenes.js`, `texts.js`).
- Vertical 1080×1920 para explicaciones y reels; 1920×1080 para la promo. 30 o 60 fps.
- Fondo papel con cuadrícula; un color de etapa por vídeo; títulos en Fraunces 800 que entran palabra a palabra; subtítulo por paso en Atkinson.
- Estructura de explicación: gancho → un dibujo que se transforma paso a paso con un subtítulo por paso → «Gogoratu» → pregunta con cuenta atrás de 3 s → logo y `matella.net`.
- Movimiento: entradas con un poco de rebote, piezas que se deslizan y encajan; nada de transiciones de presentación (fundidos genéricos, giros 3D).
- Cifras en Fraunces (opsz 36). Exponentes y subíndices dibujados si la fuente no los tiene.
- Pon `~` entre número y unidad en subtítulos (`450~€`). Las fórmulas de los subtítulos no se parten: que sean cortas.
- Audio: pico cerca de −1 dBFS, RMS cerca de −18,5 dBFS. Claude no puede escucharlo: pide la opinión del dueño.
- No borres los fotogramas de `~/Library/Caches/matella-explicaciones/` sin permiso.

## Redes sociales (Instagram)

- Generador en `promo/instagram/kit/kit.js` (piezas como funciones SVG; `?lang=` elige idioma; textos en `kit-texts.js`). Reutiliza `bg`, `box`, `chip`, `stk`, `logo`, `hd`, `tx`, `mth`.
- Formatos: publicación 1080×1350, reel/historia/destacada 1080×1920, perfil 1080×1080. Deja ~84 px de margen lateral (el perfil recorta a 3:4).
- Bordes de 5 px y sombras de 6–10 px a este tamaño. Pegatinas redondas con símbolos (%, ½, π, +) inclinadas.
- Fondos: papel con cuadrícula o un color de etapa liso (con cuadrícula blanca muy suave). En fondo de color el logo lleva anillo de papel.
- Cuentas por idioma: eu, es, en, ar. Las descripciones van en `GUIA.md` (eu) y `TEXTOS.md` (los demás).

## Presentaciones (diapositivas)

- 16:9, fondo papel, un color de etapa por bloque de diapositivas.
- Portada: cuadrícula, logo, título Fraunces enorme, pegatina inclinada. Cierre: logo + lema + `matella.net`.
- Una idea por diapositiva; la fórmula o el dibujo manda, el texto acompaña. Idea clave con la caja mostaza.

## Word y PowerPoint (.docx / .pptx)

- Fuentes: Fraunces y Atkinson Hyperlegible (incrústalas si el formato lo permite; si no, alternativas: Georgia para títulos y Verdana/Arial para texto). Para árabe, Noto Sans Arabic o Arial.
- Colores en hex de la tabla de SKILL.md. Tablas con cabecera en tinte de etapa y texto de tinta de etapa, bordes `#CFC2AA`.
- La idea clave como cuadro de texto mostaza claro con borde de tinta de 1,5 pt (sin rotación si da problemas).
- Logo como PNG exportado de [logo.svg](logo.svg) (con la fuente cargada) arriba a la izquierda (a la derecha en árabe).

## Idiomas (todos los formatos)

- **Euskera**: es el idioma principal; se hace primero. Ningún sufijo pegado a un número. `%35`, ZKH/MKT, 1.230.
- **Castellano**: `35 %` (espacio) en texto, m.c.d./m.c.m., 0,75.
- **Inglés**: `35%`, GCD/LCM, 0.75, 1,230.
- **Árabe**: RTL y alineado a la derecha; cifras latinas; fórmulas en un solo tramo LTR (LRI/PDI en HTML; en SVG `unicode-bidi:embed;direction:ltr`, porque SVG ignora los aislantes); `+`/`−` antes de cifra con marca LRM; flecha «siguiente» `←` en el texto pero `→` en fórmulas; iconos y filas espejados; nada de árabe dentro de `\text{}`. Revisa capturas a buen tamaño (720 px) antes de dar el orden por malo.
- Los textos en en/ar/es escritos por Claude no los ha revisado un nativo: avísalo al entregar.
