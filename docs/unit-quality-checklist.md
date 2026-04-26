# Checklist de calidad por unidad

Usar esta lista antes de dar una unidad por consolidada o tomarla como plantilla para nuevas unidades.

## Estado técnico

- [ ] `npm run lint` pasa sin errores.
- [ ] `npm run build` pasa sin errores.
- [ ] La unidad carga en GitHub Pages con rutas hash.
- [ ] No hay imports, estados ni tipos sin usar.
- [ ] No hay `any` evitables en código nuevo.

## Estructura de unidad

- [ ] Home de unidad disponible.
- [ ] Teoría disponible.
- [ ] Laboratorio disponible.
- [ ] Retos disponibles.
- [ ] Juegos disponibles o estado "próximamente" claro.
- [ ] Ejercicios disponibles o estado "próximamente" claro.
- [ ] El contenido pedagógico vive en archivos de datos cuando supera una complejidad razonable.

## Rutas y navegación

- [ ] Rutas canónicas activas: `teoria`, `laboratorio`, `retos`, `juegos`, `ejercicios`.
- [ ] Aliases heredados necesarios siguen funcionando temporalmente.
- [ ] La navegación superior marca correctamente la sección activa.
- [ ] Los enlaces internos de la home apuntan a rutas canónicas.
- [ ] No hay enlaces rotos dentro de la unidad.

## Idiomas y texto

- [ ] ES completo.
- [ ] EU completo.
- [ ] AR completo.
- [ ] Sin mojibake visible.
- [ ] No se depende de `fixMaybeText` para corregir contenido fuente nuevo.
- [ ] Las fórmulas se renderizan correctamente con `MathText`.

## UX y accesibilidad básica

- [ ] Responsive revisado en móvil y escritorio.
- [ ] Los botones tienen texto o `aria-label` comprensible.
- [ ] Estados activos, hover y foco son visibles.
- [ ] El contraste es suficiente en tarjetas y botones principales.
- [ ] El contenido largo no se solapa ni desborda.

## Pedagogía

- [ ] Teoría organizada por subtemas.
- [ ] Ejercicios ordenados por nivel.
- [ ] Soluciones revisadas.
- [ ] Laboratorio conectado con los conceptos de la teoría.
- [ ] Retos/juegos refuerzan la misma progresión.
