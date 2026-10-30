# Matella Studio

Matella Studio es una plataforma educativa React/Vite para construir unidades de Matemática y Natura con teoría, laboratorio, retos, juegos y ejercicios en cuatro idiomas: euskera, castellano, inglés y árabe.

## Scripts

- `npm run dev`: servidor local de desarrollo.
- `npm run build`: validación TypeScript y build de producción.
- `npm run lint`: revisión ESLint.
- `npm run preview`: previsualización del build.
- `npm run deploy`: despliegue a GitHub Pages desde `dist`.

## Idiomas

El idioma fuente del proyecto es `eu` y también es el fallback de i18n. Las traducciones activas están en:

- `src/i18n/locales/eu.json`
- `src/i18n/locales/es.json`
- `src/i18n/locales/en.json`
- `src/i18n/locales/ar.json`

Cuando se añada contenido nuevo, la fuente debe quedar completa en euskera primero y después sincronizarse a castellano, inglés y árabe. Cada texto localizado (`{ eu, es, en, ar }`) lleva los cuatro idiomas: `npx tsc` avisa si falta alguno.

Los números se escriben así en cada idioma:

- Euskera, castellano y árabe: `0,5` y `15.000` (en el árabe se mantienen las costumbres de cada unidad).
- Inglés: `0.5` y `15,000`. Las fórmulas se escriben una vez en castellano y el inglés las convierte al mostrarlas (`src/utils/latexLanguage.ts`).

La página de la biosfera tiene una versión por idioma: `public/natura/bioaniztasuna/Bioaniztasuna_en.html` para inglés.

## Estructura

- `src/router`: rutas principales de la aplicación.
- `src/data`: catálogo de cursos y temas.
- `src/pages`: páginas por asignatura, curso y unidad.
- `src/features/games`: juegos reutilizables.
- `src/features/labs`: laboratorios interactivos reutilizables.
- `src/components`: componentes comunes.
- `cursos`: contenido estático legado pendiente de migración progresiva.

## Estado Técnico

El proyecto usa Rollup WASM (`rollup` alias a `@rollup/wasm-node`) para evitar problemas con binarios nativos de Rollup en entornos macOS restringidos.
