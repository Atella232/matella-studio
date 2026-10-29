# Ficha de fuente (plantilla)

Rellénala por libro y deja el archivo fuera del repositorio. **Describe, no copies.**

```markdown
# <Curso> · <Tema> · <Libro> U<NN> (páginas a–b)
Edición / tipo: libro de alumno | solucionario | adaptación curricular | apuntes del dueño
Capa de texto: sirve | rota | escaneado (leído como imagen: páginas …)

## Secciones en orden
1. <título corto> (pp. x–y) — idea que enseña, en una frase propia
2. …

## Temas candidatos (en orden del libro)
tema-1, tema-2, … (id corto en minúsculas con guiones, como en `lessons`: `proportional`, `ruffini`…)

## Ejercicios
| Sección | Tipo (en mis palabras) | Nº aprox. | Dificultad (1–3) | Respuesta: número / expresión / abierta | Figura |
|---|---|---|---|---|---|

## Notación y vocabulario
- Símbolos, redondeos (π ≈ 3,14), formato de respuesta esperado (unidades, %, €).
- Términos en euskera si el libro está en euskera, o los de la unidad anterior del curso.

## No incluye
- Lo que el libro deja fuera (p. ej. «sin potencias ni jerarquía»): fija el alcance.

## Reutilizable de la web
Figuras, herramientas de laboratorio, `readXAnswer`, juegos y banco que ya existen en otras unidades.
```

## Cómo se convierte en unidad

- **Etapas** = bloques de secciones con una idea común (4–6, cada una con su color).
- **Temas** = las lecciones (unas 15) en el orden del libro de clase.
- **Banco de ejercicios** = los tipos de la tabla, escritos de nuevo (unos 50), con respuesta comprobable por código.
- **Respuestas**: el tipo de la tabla decide si hace falta un `answers.ts` propio (coma/punto, %, unidades) o se
  reutiliza el de otra unidad.
- Lo que solo trae un libro es una decisión del dueño, no tuya.
