# Matella

Web interactiva de matemáticas de ESO (DBH) y, más adelante, Bachillerato. Idiomas: euskera, castellano, inglés y árabe (eu/es/en/ar). React + Vite + TypeScript, publicada en GitHub Pages (matella.net).

El dueño habla castellano: contéstale en castellano y con palabras sencillas.

## Comandos

- `npm install`
- `npm test`: `node --test` con archivos `.ts`; necesita Node 22.18 o superior (en el Mac se usa 22.21).
- `npm run lint`
- `npm run build`
- `npm run deploy`: publica para los alumnos. **Nunca sin el visto bueno del dueño.**

## Forma de trabajar

- Una rama por cambio (`feat/...`). Antes de dar algo por terminado: tests, lint y build en verde.
- En sesiones en la nube: no publicar ni tocar `main` ni `gh-pages`. Sube tu rama y el dueño la fusiona y publica desde su Mac.
- Cada unidad V2 sigue `docs/unit-model.md`, `docs/unit-quality-checklist.md` y `docs/unit-reusable-template.md`.
- `docs/claude-notes/` guarda el historial de cada unidad: ids de ejercicios y retos, qué se reutiliza, fases hechas y trucos. Lee primero su `README.md` y la nota de la unidad que vayas a tocar. Al terminar, añade a esa nota lo hecho (commit, ids nuevos, trucos).
- Las fuentes (libros de Santillana y Anaya) no están en el repositorio y no deben subirse: el repositorio es público.

## Trucos que valen para todo

- El router es de hash (`#/matematika/...`).
- `MathText` convierte `:` en ÷; para dividir se escribe `\div`.
- El test de comprobación numérica solo evalúa `\frac` (no `\dfrac`); las lecciones pueden usar `\dfrac`.
- Las cajas de «takeaway» ponen el KaTeX en mayúsculas: nada de letras minúsculas en sus fórmulas.
- Euskera: los enunciados nunca llevan un sufijo pegado a un número.
- Árabe: envuelve las fórmulas con LRI/PDI; nada de árabe dentro de `\text{}` de KaTeX.
- El CSS nuevo va en archivos propios: muchas unidades importan `lab/Lab.css`.
- Revisa siempre a 375 px de ancho en eu, es y ar.
