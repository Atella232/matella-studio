# Matella Studio

Matella Studio es una plataforma educativa React/Vite para construir unidades de Matemática y Natura con teoría, laboratorio, retos, juegos y ejercicios en tres idiomas.

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
- `src/i18n/locales/ar.json`

Cuando se añada contenido nuevo, la fuente debe quedar completa en euskera primero y después sincronizarse a castellano y árabe.

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
