# Zenbaki konplexuak · 1.º Bachillerato Ciencias

Es la sexta unidad de Bachillerato (bloque Trigonometría del reparto en paralelo): curso `batx1-zientziak`, tema `numeros-complejos`.

- **Carpeta:** `src/pages/batx1-zientziak-konplexuak`
- **`storagePrefix`:** `matella-konplexuak-batx1z`
- **Rama:** `feat/konplexuak-batx1z`, cortada de `feat/trigonometria-batx1z` (a49b1dbc) para usar sus piezas
- **Ids:** todo en el bloque 104000–104999: diagnóstico 104001–104008, retos del laboratorio propio 1041xx–1043xx, juegos 1044xx–1048xx.

## Fuentes y alcance

- **Libros:** Anaya Matemáticas I U6 «Números complejos» (solucionario con capa de texto) y Santillana 1.º Bach Ciencias U5 (solucionario; mismo orden). Del libro solo se saca el alcance; la ficha está fuera del repositorio.
- **Ya visto:** los conjuntos de números y racionalizar con el conjugado (`errealak-batx1z`), la fórmula de segundo grado (4.º), los vectores (4.º), las razones de cualquier ángulo y el cuadrante (`triangeluak-batx1z`), las fórmulas de la suma y del ángulo doble (`trigonometria-batx1z`).
- **Nuevo:** la unidad imaginaria, la forma binómica, el plano complejo, operaciones en binómica, potencias de i, forma polar y trigonométrica, producto y cociente en polar (giros), Moivre, raíces n-ésimas y polígonos regulares, ecuaciones en ℂ.

## Propuesta enviada al dueño (2026-11-06)

Cinco etapas y 15 lecciones:

- `binomial`: `imaginary-unit`, `binomial-form`, `complex-plane`.
- `operations`: `add-multiply`, `division`, `powers-of-i`, `quadratic-complex`.
- `polar`: `modulus-argument`, `polar-binomial`.
- `polar-operations`: `product-quotient`, `rotations`, `de-moivre`.
- `roots`: `nth-roots`, `roots-polygons`, `binomial-equations`.

Menú: V1–V4; L1 el plano complejo, L2 multiplicar es girar, L3 las raíces forman un polígono, L4 la espiral de las potencias; M de 4.º y del tema 2; J1 dónde cae el afijo, J2 gira y estira, J3 caza las raíces, J4 detective, J5 carrera y memoria.

## Diseño elegido (2026-11-06: «Las recomendadas»)

V1 polar $r_\alpha$ (subíndice) y también la forma trigonométrica $r(\cos\alpha+i\sen\alpha)$; V2 respuestas numéricas (parte real o imaginaria, módulo, argumento en grados en [0°, 360°), cuántas raíces); sin V3 (familias en el plano) ni V4 (sistemas en ℂ). L1 el plano complejo (opuesto, conjugado, módulo y argumento, con predicción del cuadrante), L2 multiplicar es girar (▶), L3 las raíces forman un polígono (sin L4). M: los vectores de 4.º (suma como paralelogramo), la circunferencia de 4.º y «las soluciones dan vueltas» del tema 2. J1 dónde cae el afijo, J2 gira y estira, J3 caza las raíces, J4 detective, J5 carrera y memoria.

## En curso

- Fase 1+2 a medias (commit WIP de esta rama): carpeta `src/pages/batx1-zientziak-konplexuak` con `text.ts` (reexporta el de trigonometria), `lessons.tsx`, `lessonTexts.ts` y `lessonChecks.ts` con solo las 3 lecciones de la etapa `binomial`, `figures.tsx` (Plane, 3 figuras y hero), `index.tsx` sin contenido, laboratorio ni juegos. Registro hecho (courses, router, paths).
- Etapas: `binomial`, `operations`, `polar`, `turns` (antes `polar-operations`), `roots`.
- Fallan 2 tests compartidos en la unidad: `lesson-texts` «the worked formulas add up» y «texts in four languages, same formulas, all drawn by KaTeX». Mirar el mensaje con `node --test tests/lesson-texts.test.ts 2>&1 | grep -A8 konplexu` y corregir antes de seguir.
- Siguiente paso: arreglar esos 2 fallos; escribir las 12 lecciones que faltan (plan de lecciones, errores y «Compruébalo» arriba en la propuesta); `content.ts` (diagnóstico 104001–104008, práctica 20, retos 15, banco 50); test propio `tests/konplexuak-batx1z-content.test.ts` con un evaluador de complejos ([re, im], `i`, `\frac`, `\sqrt`, `^n`, `\cos`/`\sen` en grados y la polar `r_{α°}`).
- Ojo con los tests compartidos: tratan `i` como una letra cualquiera. Un «Compruébalo» cuyo enunciado tenga una sola fórmula de cálculo con `i` y una respuesta de una sola fórmula falla: poner dos fórmulas en el enunciado (`${z}=…$` y `$\overline{z}$`).
- Truco para empezar: el test de sufijos vascos confunde `$z$` con un «-z» pegado; escribir `${z}$` en los cuatro idiomas (nota compartida `basque-z-suffix-test.md`).
