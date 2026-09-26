# DBH2 Zatikiak V2 — entrega y sustitución reversible

## Estado de la versión paralela

La V2 está aislada en `src/pages/dbh2-zatikiak-prototype/` y se revisa en `#/prototipo/zatikiak-v2`. La ruta pública y sus subrutas siguen usando la unidad anterior.

Inventario funcional:

- 12 temas de teoría en 5 bloques curriculares.
- 6 preguntas de diagnóstico sin calificación, con un intento por pregunta, puntuación real y temas recomendados según los fallos.
- 10 actividades guiadas con pista, validación exacta y explicación.
- 42 ejercicios del banco completo, organizados en 7 temas y 3 dificultades.
- 12 retos contextualizados y auditados.
- 7 laboratorios: pizza, área, recta, equivalencia, comparación, operaciones y proporcionalidad.
- 4 modos de juego: equivalencias, pizza, memoria y carrera de cálculo.
- 108 objetivos de progreso local, separados de la unidad pública.
- Interfaz completa en euskera, castellano y árabe, con fórmulas siempre de izquierda a derecha.

## Comparación con la unidad actual

| Área | Unidad actual | V2 paralela |
|---|---|---|
| Navegación | Varias páginas y rutas | Un recorrido coherente con siete espacios |
| Teoría | Contenido disperso | 12 temas breves con objetivo, ejemplo e idea clave |
| Respuestas | Validaciones heterogéneas | Un único motor racional exacto y localizado |
| Práctica | Banco de 42 ejercicios | Banco completo más 10 actividades guiadas |
| Juegos | Pizza, memoria y carrera separados | Cuatro juegos reconstruidos sobre el mismo motor exacto |
| Diagnóstico | No existe | 6 preguntas que recomiendan el punto de entrada |
| Accesibilidad | Variable según página | Controles semánticos, teclado, estados anunciados y RTL real |
| Progreso | Parcial y separado por experiencias | 108 objetivos en un único indicador local |
| Móvil | Cabecera y contenidos irregulares | Diseño comprobado sin desbordamiento entre 390 y 1440 px |

## Cambio de rutas cuando exista aprobación

La sustitución debe realizarse en una sola operación revisable:

1. Crear un punto de restauración de los cambios aprobados.
2. En `src/router/index.tsx`, usar `ZatikiakPrototypePage` para la ruta principal y todas las subrutas históricas de DBH2 Zatikiak.
3. Mantener las rutas antiguas para no romper enlaces. La V2 ya interpreta sus sufijos y abre directamente teoría, laboratorio, banco de ejercicios, retos o el juego correspondiente.
4. En `src/components/common/Layout/index.tsx`, tratar `/matematika/dbh2/zatikiak` como ruta inmersiva para evitar duplicar cabeceras y pies.
5. Conservar temporalmente `#/prototipo/zatikiak-v2` como ruta de comparación y retirada rápida.
6. Ejecutar pruebas, análisis estático, compilación y una sesión visual final en la ruta pública.

## Vuelta atrás

Si la prueba posterior a la sustitución detecta un problema, se restauran únicamente los elementos de las rutas públicas y la condición inmersiva del `Layout`. La carpeta V2 y sus claves de progreso son independientes, por lo que este retroceso no modifica la unidad anterior ni sus datos.
