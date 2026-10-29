---
name: matella-marca
description: Estilo de marca de Matella («Cuaderno a color»): papel cálido y tinta, Fraunces + Atkinson Hyperlegible, un color por etapa, bordes de tinta y sombras duras, logo de cuatro cuadros. Úsala SIEMPRE que crees o cambies algo con la imagen de Matella en cualquier formato — páginas o componentes de la web, artifacts, documentos y PDF imprimibles (dosieres, fichas, exámenes), vídeos, piezas de Instagram, presentaciones, carteles, Word o PowerPoint — aunque el usuario no diga «marca» ni «estilo».
---

# Marca Matella · «Cuaderno a color»

Matella es una web de matemáticas de ESO (matella.net) en euskera, castellano, inglés y árabe.
Su imagen es la de **un cuaderno de clase con colores**: papel cálido, tinta oscura, cuadrícula
detrás de las matemáticas y pegatinas de color con borde de tinta. Tranquila y editorial, pero con energía.

Esta skill vale para cualquier formato. Primero aplica las **reglas base**; luego lee la guía
del formato en [formatos.md](formatos.md).

## Archivos de la skill

- [tokens.css](tokens.css): variables CSS y componentes listos para copiar (botón, tarjeta, chip, idea clave, cuadrícula, logo). Úsalo en cualquier HTML (artifacts, documentos, kits).
- [formatos.md](formatos.md): reglas por formato (web, documento A4, vídeo, Instagram, diapositivas, Word/PowerPoint) e idiomas.
- [logo.svg](logo.svg) y [logo-mark.svg](logo-mark.svg): logotipo con nombre y solo el símbolo.

Fuentes de verdad en el repositorio (si cambian, manda el repositorio):
`src/index.css` y `src/features/unit-v2/UnitPage.css` (web), `promo/engine.js` (paleta, `logoMark`),
`promo/instagram/kit/kit.js` (piezas de redes).

## Reglas base

### 1. Colores

| Papel y tinta | Hex | Uso |
|---|---|---|
| Papel | `#F6F1E7` | fondo de todo |
| Papel hondo | `#EFE7D6` | bandas, zonas secundarias, hover |
| Nota | `#F3EBDC` | recuadros suaves |
| Tarjeta | `#FFFCF6` | tarjetas y cajas |
| Tinta | `#1D2733` | texto, bordes, sombras |
| Tinta suave | `#3A4452` | texto secundario fuerte |
| Gris | `#58616E` | texto apagado, pies |
| Línea | `#E3D9C6` / `#CFC2AA` | separadores finos / fuertes |

**Cinco colores de etapa**. Cada etapa de una unidad (o cada tema de un documento) lleva uno, siempre en este orden:

| # | Etapa | Color | Tinte (fondo) | Tinta (texto sobre tinte) | Texto encima del color |
|---|---|---|---|---|---|
| 1 | azul | `#2F6FDB` | `#DDE7F7` | `#1E4A96` | blanco |
| 2 | violeta | `#7A55D6` | `#E8E0F7` | `#4A2F9E` | blanco |
| 3 | mostaza | `#E0A100` | `#FBEBC0` | `#6B4E12` | **tinta** (nunca blanco) |
| 4 | coral | `#C4432A`* | `#F8DCD0` | `#9A3218` | blanco |
| 5 | verde | `#267B53` | `#D6EDDF` | `#1F6443` | blanco |

\* El coral vivo es `#D9502E` (ilustraciones, pegatinas, logo). Cuando lleva texto blanco encima usa `#C4432A`, que tiene contraste suficiente.
Si hay más de cinco temas, se repiten los colores en el mismo orden.

Rojo de error `#B3261E` (tinte `#F9DEDC`) y verde de acierto = verde de etapa. Nada de degradados, neones ni vidrio.

### 2. Tipografía

- **Fraunces** (serif con tamaño óptico) para títulos, números grandes y fórmulas dibujadas. Peso 700–800 en títulos; cursiva 600 para la frase de la idea clave.
- **Atkinson Hyperlegible** para todo el texto. 400 normal, 700 negrita.
- **Noto Sans Arabic** para el árabe (va primero en la lista de fuentes cuando la página está en árabe).
- Google Fonts: `https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap`
- Las **cifras** en piezas gráficas (vídeo, redes) van en Fraunces aunque estén dentro de texto Atkinson: el 0 tachado de Atkinson parece ∅. En la web y en documentos no hace falta.
- Fraunces no tiene Δ, √, ≠ ni →: en gráficos dibújalos o deja que caigan en otra fuente y compruébalo.
- Etiquetas pequeñas («GOGORATU», «IDEA CLAVE»): Atkinson 700, 13 px, mayúsculas, espaciado 0,12em.
- Fórmulas: KaTeX en web y documentos. Para dividir se escribe `\div` (en la web `:` se convierte en ÷).

### 3. Forma: tinta, sombra dura y cuadrícula

- **Bordes de tinta** de 1,5–2 px (5 px en piezas de 1080 px) y **sombra dura desplazada** (`4px 4px 0` tinta, sin desenfoque).
  Se reservan para lo importante: botón principal, etapa actual, tarjeta de lección, idea clave, pegatinas. El resto: tarjeta clara con línea fina o sin borde.
- Esquinas redondeadas: 14 px botones, 16–18 px tarjetas, píldora para chips.
- **Idea clave** («Gogoratu»): caja mostaza claro, borde de tinta, sombra dura, girada −1°, icono redondo de tinta, frase en Fraunces cursiva. En árabe, sin cursiva.
- Una pequeña inclinación (−1° a −4°) en pegatinas, logo e ideas clave da el aire de cuaderno. Una o dos por pantalla, no todo torcido.
- **Cuadrícula de papel milimetrado** detrás de modelos matemáticos, gráficas y portadas (líneas de tinta al 4–8 %, una línea más marcada cada 5).
- Botón principal: fondo tinta, texto papel, sombra dura **mostaza**. Botón de etapa: fondo del color de la etapa, sombra de tinta.
- Iconos: trazo grueso de tinta, relleno plano de un color de etapa, como pegatinas. Aciertos con círculo verde y ✓ blanco; errores con círculo coral y ✕ blanco.

### 4. Logo

Cuadrado redondeado partido en cuatro cuadros — **azul** (arriba izq.), **mostaza** (arriba der.), **coral** (abajo izq.), **tinta** (abajo der.) —
con borde de tinta, sombra de tinta desplazada y girado −4°. Al lado, «Matella» en Fraunces 800 color tinta.
Sobre fondo oscuro o de color, el símbolo lleva un anillo de papel alrededor para que se vea la tinta.
No cambies sus colores, no lo estires, no le pongas efectos. Dirección: `matella.net` en Atkinson 700.

### 5. Voz y textos

- Lema: eu «Matematika zentzuz ikasteko» · es «Matemáticas con sentido» · en «Maths that makes sense» · ar «رياضيات لها معنى».
- Las secciones de cada unidad: Ikasi · Laborategia · Praktikatu · Erronkak · Jolastu (Aprende, Laboratorio, Practica, Retos, Juega).
- Tono: cercano, claro y tranquilo, de profe que explica bien. Frases cortas, tú al alumno, ejemplos concretos. Sin emojis en la web; en redes, uno como mucho (📐).
- Notación por idioma: eu `%35`, ZKH/MKT, coma decimal y punto de miles (1.230); es `35 %`, m.c.d./m.c.m., coma decimal; en `35%`, GCD/LCM, punto decimal y coma de miles; ar con cifras latinas, ق.م.أ / م.م.أ, punto decimal, coma de miles. Las unidades (m, kg, €) siempre en latino.
- Euskera: nunca un sufijo pegado a un número en los enunciados (sigue `src/pages/dbh2-zatigarritasuna/basque.ts`).
- Árabe: de derecha a izquierda; las fórmulas en un tramo de izquierda a derecha (LRI/PDI en HTML); nada de árabe dentro de `\text{}` de KaTeX.
- Nunca nombres reales de alumnos o profesores sacados de los archivos del dueño.

## Lo que NO es Matella

Fondos oscuros con brillo, vidrio esmerilado, degradados, sombras difuminadas, morados neón, fotos de stock,
Inter/Roboto, todo centrado y con mucho aire vacío, iconos finos de línea, colores fuera de la paleta,
o todos los colores de etapa mezclados en un mismo bloque (cada bloque, un color).

## Comprobación final (cualquier formato)

1. ¿Fondo papel (o un color de etapa liso) y texto tinta? ¿Solo colores de la tabla?
2. ¿Títulos Fraunces, texto Atkinson, árabe Noto Sans Arabic? ¿Fuentes cargadas de verdad (mira una captura)?
3. ¿Bordes de tinta y sombras duras solo en lo importante?
4. ¿Cada tema o etapa con su color, en el orden azul → violeta → mostaza → coral → verde?
5. ¿Contraste: texto tinta sobre mostaza, blanco solo sobre los colores oscuros?
6. ¿Logo correcto y `matella.net` donde toque?
7. ¿Probado en los idiomas que lleva, incluido árabe (orden de las fórmulas) y a 375 px si es pantalla?
