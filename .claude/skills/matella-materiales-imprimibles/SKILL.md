---
name: matella-materiales-imprimibles
description: Crea materiales de clase imprimibles de Matella en PDF A4 — fichas de ejercicios, dosieres de refuerzo o recuperación, exámenes con variantes A/B y soluciones, hojas de repaso — con la marca «Cuaderno a color», fórmulas KaTeX, euskera/castellano/inglés/árabe y sin cortes de página feos. Úsala SIEMPRE que el dueño (profesor) pida algo para imprimir o repartir en clase: «hazme una ficha», «un examen de…», «un dosier de recuperación», «hoja de ejercicios de…», «versión A y B», «para fotocopiar», aunque no diga PDF ni Matella. También para regenerar o corregir un PDF de este tipo ya hecho.
---

# Materiales imprimibles de Matella

El dueño es profesor de matemáticas de ESO (DBH) y reparte estos materiales a su alumnado. Un PDF mal
cortado, con una fórmula torcida o con una solución equivocada se nota delante de la clase, así que esta
skill cuida tres cosas: **que las respuestas sean correctas, que la página no parta cajas ni ejercicios, y que
parezca Matella**.

Antes de maquetar lee la marca: [../matella-marca/SKILL.md](../matella-marca/SKILL.md) (reglas base e
idiomas) y la sección «Documentos imprimibles» de [../matella-marca/formatos.md](../matella-marca/formatos.md).
Esta skill no las repite: añade el **flujo** y las **herramientas** (`scripts/` y `assets/`). Si piden
`.docx`, usa la skill `docx` con esas mismas reglas de marca; esta skill es para PDF.

## Flujo

1. **Entiende el encargo.** Tipo (ficha, dosier, examen, repaso), curso y tema, idioma (euskera primero),
   cuántas variantes, si lleva soluciones y para qué se usa (examen = sin pistas; refuerzo = con «Gogoratu»
   y adibide ebatziak). Si falta algo que cambia el resultado, pregunta una vez, junto.
2. **Reúne el material.** Mira [references/entrada.md](references/entrada.md): ejercicios de la propia web
   (`content.ts` de cada unidad en `src/pages/`; son originales y públicos), exámenes del dueño en .docx/.pdf, o
   enunciados nuevos. Los libros de texto no están ni deben estar en el repositorio: nunca copies sus textos;
   crea variantes propias con la misma idea.
3. **Escribe el HTML** a partir de [assets/plantilla.html](assets/plantilla.html) (portada, tema con color
   de etapa, Gogoratu, adibide, ariketak con huecos, soluzioak). Fórmulas con `\( … \)` (en línea) y
   `\[ … \]` (bloque): el script las convierte con el KaTeX del repositorio. Las clases útiles están
   comentadas en [assets/print.css](assets/print.css).
4. **Calcula las soluciones con código**, no de cabeza: un `node` pequeño que parta de los mismos números
   del enunciado y escriba la solución (o la compruebe). Para variantes A/B conviene un generador
   `gen.mjs` que produzca ambos HTML desde una lista de parámetros: así tienen la misma estructura y
   dificultad. Ver [references/examen.md](references/examen.md).
5. **Genera el PDF y revísalo página a página** (comandos abajo). Mira la hoja de contacto entera para ver
   los cortes, y amplía al menos una página con fórmulas y la primera de cada idioma.
6. **Entrega.** Guarda el PDF **y el HTML fuente** juntos, fuera del repositorio (la carpeta temporal de la
   sesión se borra entre días y regenerar desde cero cuesta). Si el dueño no ha dicho dónde, propón
   `~/Documents/Matella-materiales/<nombre>/`. Dile la ruta, el número de páginas y qué idiomas has
   hecho; si hay en/ar/es escritos por ti, avisa de que no los ha revisado un nativo.

## Comandos

Node solo existe dentro de Pinokio: añade su carpeta **al final** del PATH (si va delante, su `git`
rompe el deploy). Trabaja en tu carpeta temporal de sesión o en la carpeta de entrega.

```bash
export PATH=$PATH:/Users/asier/pinokio/bin/miniconda/bin
SK=/Users/asier/Documents/Proyectos/matella-studio/.claude/skills/matella-materiales-imprimibles

node $SK/scripts/build-pdf.mjs ficha.html ficha.pdf         # HTML → PDF (imprime el nº de páginas)

swiftc -O $SK/scripts/preview-pages.swift -o ./preview      # una vez
./preview ficha.pdf ./vista                                 # page-NN.png + sheet-N.png (8 páginas por hoja)
```

Lee `vista/sheet-1.png` (y siguientes) con la herramienta de lectura de imágenes. `build-pdf.mjs` inyecta
solo `tokens.css` + `print.css` + KaTeX donde pongas `<!-- matella:css -->`, antepone `<!doctype html>` y
espera a que carguen las fuentes de Google Fonts (necesita conexión; sin ella cae a Georgia/sistema).

## Trampas de impresión (ya pagadas una vez)

- **Chrome ignora `break-inside: avoid` en hijos de grid/flex.** Por eso `print.css` usa bloques normales,
  números con `position:absolute` y columnas con `inline-block` en %. No metas `display:grid/flex` dentro
  de un ejercicio, ejemplo o caja; si lo haces, se partirá entre páginas.
- **Las fracciones altas pueden asomar en la página anterior** si el bloque no tiene relleno arriba: los
  ejercicios ya llevan `padding-top`; mantenlo en bloques nuevos.
- Imprime siempre en **modo estándar** (el script ya antepone el doctype); sin él el resultado difiere
  del visor.
- El fondo del cuerpo es blanco (ahorra tinta); el papel `#F6F1E7` solo en portada y bandas.
- Un tema empieza página nueva; las soluciones, siempre en página aparte al final.
- En las cajas de «Gogoratu» el KaTeX sale en mayúsculas: nada de letras minúsculas en sus fórmulas.
- Los huecos de respuesta miden: 9 mm (una línea), `tall` 22 mm (razonar). Calcula el espacio que de
  verdad necesita un alumno, sobre todo en exámenes.

## Idiomas

Reglas completas en `formatos.md` de la marca. Lo que muerde en papel:

- **Euskera:** primero y siempre. `%35`, 1.230, ningún sufijo pegado a un número.
- **Árabe:** `<html lang="ar" dir="rtl">`; las etiquetas pequeñas («1 ن» de puntos, etc.) deben ser árabe
  puro, o el orden se invierte (ya pasó con «1 p» → «p 1»); fórmulas en un solo tramo LTR (el script ya
  las envuelve en `.m-ltr`); nada de árabe dentro de `\text{}`.
- Una versión por idioma = un HTML por idioma, mismos números, mismas soluciones.

## Privacidad

El repositorio es público y los materiales llegan a menores. En el PDF nunca pongas nombres de alumnado
ni de profesorado (ni los que aparezcan en los nombres de archivo de entrada): la cabecera de examen lleva
huecos en blanco (`Izena: ____`). Los PDF generados y sus fuentes **no se suben al repositorio** salvo que
el dueño lo pida. No pegues en la skill ni en los materiales textos de libros, URLs privadas de artifacts
ni datos de exámenes reales de alumnos.
