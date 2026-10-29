---
name: matella-fuentes
description: Convierte un capítulo de un libro de texto (Santillana, Anaya) o unos apuntes y exámenes del dueño en una «ficha de fuente» estructurada — alcance, etapas, temas en orden, tipos de ejercicio, notación y qué reutilizar — sin copiar su texto, para empezar una unidad nueva de Matella. Extrae el texto de PDF (también escaneados) y los lee como imagen cuando la capa de texto no sirve. Úsala SIEMPRE que el dueño diga «saca el alcance de la unidad X del libro», «mira el Santillana/Anaya de…», «empezamos una unidad nueva y estas son las fuentes», o pase un PDF o capítulo de libro para preparar contenido, aunque no diga «fuentes».
---

# Fuentes: del libro a la ficha de la unidad

Cada unidad de Matella parte de un capítulo de **Santillana** y otro de **Anaya** (o de apuntes del dueño).
Antes de escribir una lección hay que saber qué cubre cada libro, en qué orden, con qué tipos de ejercicio y
con qué notación. Esta skill produce esa **ficha**, y de ahí sale el alcance de la unidad
(`matella-nueva-unidad`, paso 1).

## Regla de oro: los libros no entran en el repositorio

`CLAUDE.md`: *las fuentes no están en el repositorio y no deben subirse; el repositorio es público.* Eso incluye
fragmentos pegados en una nota, en `docs/claude-notes/`, en una skill, en un test o en un commit.

- La ficha **describe** (temas, tipos de ejercicio, cuántos, dificultad, notación) y **no copia**: ni
  enunciados, ni soluciones, ni figuras, ni párrafos de teoría. Los ejercicios de la unidad se escriben
  **originales**, con números y contextos propios, aunque sigan la misma idea.
- Los PDF, los textos extraídos y las imágenes de páginas se quedan en una carpeta **fuera del repositorio**
  (por ejemplo `~/Documents/Matella-fuentes/<curso>-<unidad>/`) o en la carpeta temporal de la sesión.
  Nunca se modifica el original (suele estar en el Drive del dueño).
- Los apuntes y exámenes del dueño son suyos, pero pueden llevar nombres de alumnado o profesorado:
  no los copies a ningún sitio (ver `matella-materiales-imprimibles`, `references/entrada.md`).

## Dónde están los libros

En el Drive del dueño, **montado en su Mac** (por eso esto solo funciona en local, no en sesiones en la nube).
No está en «Mi unidad» sino en el equipo sincronizado:

```text
~/Library/CloudStorage/GoogleDrive-<cuenta>/Otros ordenadores/Mi portátil/Ideas/Klase/Matematika/LIBROS/
  1_ESO  2_ESO  3_ESO  4_ESO  1_Bach  2_Bach  EBAU
  <curso>/<Editorial>/Unidad_NN_Tema.pdf
```

- **1.º y 2.º ESO:** `Anaya` y `Santillana`. En 1.º, Anaya trae `Libro_Estandar/` (con `Libro_Completo.pdf`) y
  `Suma_Piezas/`.
- **3.º ESO:** además de Anaya y Santillana, `Bruño`, `Edebe`, `Marea_Verde` y `SM_Savia` (algunas con menos
  unidades); Anaya incluye `Libro_Completo.pdf`.
- **4.º ESO:** `<Editorial>/Academicas/` y `<Editorial>/Aplicadas/` (la misma unidad puede tener otro número
  en cada editorial: busca por tema).
- **Bachillerato:** `Ciencias` y `Sociales` por editorial; **EBAU** por comunidad y asignatura.
- El libro de clase del dueño es el de **Santillana**; la pareja habitual de una unidad es Santillana + Anaya.

Para encontrar un capítulo sin recorrer carpetas (solo lista rutas, no abre nada):

```bash
.claude/skills/matella-fuentes/scripts/buscar-libro.sh 2_ESO Decimal
.claude/skills/matella-fuentes/scripts/buscar-libro.sh 4_ESO Trigono
```

Si no la encuentra, el Drive no está montado (`ls ~/Library/CloudStorage`). Prueba hecha el 2026-10-29: un
capítulo de 16 páginas de Santillana 2.º se lee con `pdf-texto` y la capa de texto sirve; otros libros
pueden venir escaneados (los solucionarios de 4.º aplicadas lo estaban).

## Herramientas (Mac, sin dependencias)

```bash
export PATH=$PATH:$HOME/pinokio/bin/miniconda/bin
SK=.claude/skills/matella-fuentes/scripts
W=~/Documents/Matella-fuentes/<curso>-<unidad>     # carpeta de trabajo fuera del repo
mkdir -p $W && swiftc -O $SK/pdf-texto.swift -o $W/pdf-texto && swiftc -O $SK/pdf-paginas.swift -o $W/pdf-paginas

$W/pdf-texto  /ruta/Unidad_05.pdf $W/s5.txt --paginas 3-24     # texto por página + diagnóstico de la capa de texto
$W/pdf-paginas /ruta/Unidad_05.pdf $W/s5-img --paginas 3-9     # páginas como JPG (1400 px; --ancho 2000 si hay letra pequeña)
```

`pdf-texto` avisa de las páginas **sin texto** (escaneadas) y de las de **texto roto**: ahí hay que leer
la imagen. Una portada o una página casi vacía también sale como «sin texto»; míralas igual. Leer
imágenes es lo más caro: hazlo por tramos de páginas, no el libro entero.

## Flujo

1. **Localiza** los dos capítulos con `buscar-libro.sh`. **Identifica** libro, edición, curso, unidad y páginas; si es libro del alumno o solucionario, y si tiene
   «adaptación curricular» (un contenido reducido: eso fija el alcance). Pregunta lo que no esté claro.
2. **Extrae el texto**; si la capa falla, renderiza y lee las páginas como imagen.
3. **Perfila cada libro** (usa [references/ficha-fuente.md](references/ficha-fuente.md)): secciones y su orden,
   temas, ejemplos resueltos, tipos de ejercicio con recuento y salto de dificultad, notación y
   vocabulario (en euskera, los términos de la unidad anterior del curso), qué **no** tiene.
4. **Compara los dos libros:** qué comparten (eso va seguro), qué tiene solo uno (decide), en qué orden
   explica cada uno. Sigue el orden del libro de clase.
5. **Propón el alcance de la unidad:** 4–6 etapas y unos 15 temas, en el orden del libro, con una frase
   por tema; lo que queda fuera y por qué.
6. **Mapa de reutilización:** busca en `docs/claude-notes/` y en `src/pages/` qué existe ya en otras unidades
   (figuras, herramientas, lectura de respuestas `readXAnswer`, juegos). Ejecuta
   `node .claude/skills/matella-nueva-unidad/scripts/inventario-unidad.mjs --all` y las notas de los
   cursos vecinos.
7. **Entrega la ficha** en la carpeta de trabajo y un resumen al dueño con el alcance propuesto y las
   dudas. Pasa a `matella-nueva-unidad`; allí la propuesta de diseño pide su visto bueno antes de programar.
8. **Una línea para la nota de la unidad** (`docs/claude-notes/<unidad>.md`): libro, unidad y páginas que se
   han usado, sin citar contenido. Ejemplo de forma: «Fuentes: Santillana 1.º U5 (adaptación curricular) +
   Anaya U4».

## Comprobaciones

- Si usas soluciones del libro para validar las tuyas, calcula también con código: los solucionarios tienen
  erratas.
- Lo que el libro enseña con una notación distinta a la de la web (π ≈ 3,14, redondeos, símbolos)
  se anota en la ficha; la web decide con `CLAUDE.md` y las notas de la unidad vecina.
- Si dos fuentes se contradicen, no elijas en silencio: pregúntalo al dueño.
