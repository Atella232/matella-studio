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

## Fases

### Fase 1+2: lecciones y contenido

- Cinco etapas (`binomial`, `operations`, `polar`, `turns`, `roots`) y 15 lecciones: `imaginary-unit`, `binomial-form`, `complex-plane`, `add-multiply`, `division`, `powers-of-i`, `quadratic-complex`, `modulus-argument`, `polar-binomial`, `product-quotient`, `rotations`, `de-moivre`, `nth-roots`, `roots-polygons`, `binomial-equations`.
- Las 10 mejoras de teoría desde el principio: definiciones, vocabulario, ejemplo con enunciado propio, «¿Por qué funciona?» en `division`, `powers-of-i`, `product-quotient`, `de-moivre` y `nth-roots`; `cases` en `binomial-form`, `quadratic-complex` (el signo del discriminante) y `modulus-argument` (el cuadrante); enlaces «Repasa antes» a `errealak-batx1z` (`sets`, `newton`, `rationalize`), a 4.º (`vector-operations`, `quadratic-formula`, `notable-angles`), a `triangeluak-batx1z` (`quadrant-ratios`, `inverse-angles`), a `trigonometria-batx1z` (`sum-formulas`, `double-angle`) y a `ekuazioak-batx1z` (`ruffini-roots`).
- Figuras propias (`figures.tsx`, texto ≥21 px, ejes Re e Im en todos los idiomas): eje imaginario, conjuntos de números, plano con z, −z y z̄, suma como paralelogramo, división por el conjugado, las cuatro potencias de i, parábola sin cortes y sus raíces conjugadas, módulo y argumento, forma polar con sus proyecciones, producto que suma ángulos, giro de 90°, espiral de potencias y `RootsFigure` (`kind`: `cube`, `triangle`, `equation`).
- Contenido: diagnóstico 104001–104008, práctica 1–20, retos 101–115, banco 1–50. Respuestas: parte real o imaginaria, módulo, argumento en grados entre 0° y 360° (la nota de respuestas lo dice), coordenadas, áreas y recuentos.
- Test propio `tests/konplexuak-batx1z-content.test.ts`: un evaluador de LaTeX con complejos (`[re, im]`; `i`, `\frac`, `\sqrt`, `\sqrt[n]`, `^n`, `\overline`, `|…|`, `\cos`/`\sen`/`\tg` en grados y la polar `r_{α}`) comprueba cada `=` y `≈`; una tabla `computed` recalcula cada respuesta; también resuelve otra vez las ecuaciones y raíces de las lecciones.

## Trucos

- Los tests compartidos (`lesson-checks`, `lesson-texts`) tratan `i` como una letra que puede valer cualquier número. Un «Compruébalo» con una sola fórmula de cálculo con `i` en el enunciado y una sola en la respuesta falla: el enunciado lleva dos fórmulas (`${z}=…$` y lo que se pregunta).
- `${z}` en los cuatro idiomas, también en `content.ts`; el test propio lo comprueba. Ni siquiera en un comentario de `lessons.tsx` se puede escribir «$z…»: el test lee las fórmulas del archivo como texto.
- En árabe, «la raíz $n$-ésima» lleva la $n$ como fórmula («الجذر من الرتبة $n$»): si no, el orden de las fórmulas no coincide con el castellano.
- `text.ts` reexporta el de `trigonometria-batx1z` (`\sen`, `\tg` en el nombre de cada idioma).

## En curso

- Fase 1+2 hecha (ver el commit de la rama). Siguiente: fase 3, laboratorio (L1 plano complejo, L2 multiplicar es girar, L3 raíces en polígono; prestadas de 4.º y del tema 2).
- Truco para empezar: el test de sufijos vascos confunde `$z$` con un «-z» pegado; escribir `${z}$` en los cuatro idiomas (nota compartida `basque-z-suffix-test.md`).
