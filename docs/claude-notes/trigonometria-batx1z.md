# Formula eta funtzio trigonometrikoak · 1.º Bachillerato Ciencias

Es la quinta unidad de Bachillerato (bloque Trigonometría del reparto en paralelo): curso `batx1-zientziak`, tema `funciones-trigonometricas`.

- **Carpeta:** `src/pages/batx1-zientziak-trigonometria`
- **`storagePrefix`:** `matella-trigonometria-batx1z`
- **Rama:** `feat/trigonometria-batx1z`, cortada de `feat/triangeluak-batx1z` (9e38658) para usar sus piezas
- **Ids:** todo en el bloque 103000–103999: diagnóstico 103001–103008, retos del laboratorio propio 1031xx–1033xx, juegos 1034xx–1038xx. Lo prestado de 4.º guarda sus ids.

## Fuentes y alcance

- **Libros:** Anaya Matemáticas I U5 «Fórmulas y funciones trigonométricas» (Saber Hacer, solucionario con capa de texto) y la primera mitad de Santillana 1.º Bach Ciencias U4 «Trigonometría» (radianes, sec/cosec/cotg, suma y diferencia, doble y mitad, ecuaciones). Del libro solo se saca el alcance.
- **Ya visto:** en 4.º académicas, el radián (`dbh4-akademikoak-trigonometria › radians`) y las funciones seno, coseno y tangente con amplitud y periodo (`dbh4-akademikoak-esponentzialak`, herramienta `wave` y juego `laser`); en `triangeluak-batx1z`, las razones de cualquier ángulo, la reducción y los dos ángulos con el mismo seno.
- **Nuevo en 1.º:** sec, cosec y cotg; identidades; fórmulas de suma y diferencia, ángulo doble y mitad, transformación de sumas en productos; valores exactos (15°, 75°…); ecuaciones trigonométricas con solución general; el desfase de una onda.

## Diseño elegido (2026-11-05: «Las recomendadas»)

V1 repaso corto y lo nuevo a fondo; V2 sec, cosec y cotg aquí; V3 ecuaciones en grados, con respuesta «cuántas soluciones en [0°, 360°)», su suma, la mayor o la menor, y periodos como «aπ, ¿cuánto vale a?»; V4 identidades solo en «Compruébalo», el detective y «simplifica y calcula en 30°». L1 dos ángulos que se suman, L2 las soluciones dan vueltas (sen(nx)=k o cos(nx)=k con n = 1, 2, 3), L3 las seis razones en la circunferencia (L4 no). M: el radián, la circunferencia y la onda de 4.º. J1 monta la fórmula, J2 caza las soluciones, J3 valor exacto, J4 detective, J5 carrera, memoria y juegos de 4.º.

- **Cambio en J5:** el láser de curvas de 4.º (`laser`) no tiene familia trigonométrica, así que en su lugar va «La circunferencia» de 4.º (`UnitCircleGame` de `dbh4-games/TrigGames`, con su nivel de radianes). Díselo al dueño en el informe del tema.

## Fases

### Fase 1+2: lecciones y contenido

- Cinco etapas (`ratios`, `sums`, `double`, `equations`, `functions`) y 15 lecciones: `radians-review`, `reciprocal`, `identities`, `sum-formulas`, `difference-tangent`, `known-ratios`, `double-angle`, `half-angle`, `sum-to-product`, `basic-equations`, `quadratic-equations`, `formula-equations`, `trig-graphs`, `transformations`, `periodic-models`.
- Las 10 mejoras de teoría desde el principio: definiciones, vocabulario, ejemplo con enunciado propio, «¿Por qué funciona?» en `reciprocal`, `double-angle`, `half-angle`, `formula-equations` y `transformations`; `cases` en `identities`, `sum-to-product` y `basic-equations`; enlaces «Repasa antes» a 4.º (radián, relaciones fundamentales, 30°-45°-60°, funciones seno y tangente, periodo), a `triangeluak-batx1z` (`quadrant-ratios`, `inverse-angles`) y a `ekuazioak-batx1z` (`change-variable`, `high-degree`).
- Figuras propias (`figures.tsx`, texto ≥21 px): radián, seis razones, triángulo de radio 1, suma de ángulos, signos de la resta, triángulos 3-4-5 y 5-12-13, ángulo doble y mitad, semisuma y semidiferencia, rectas que cortan la circunferencia (`EquationCircleFigure` con `kind`), cortes de una onda, amplitud-periodo-desfase y noria. No se usa la `RadianFigure` de 4.º: su texto es de 14–17 px y a 375 px no se lee.
- Contenido: diagnóstico 103001–103008, práctica 1–20, retos 101–115, banco 1–50. Ninguna ecuación tiene 0° como solución (el test lo comprueba), así que da igual si el intervalo incluye los extremos.
- Test propio `tests/trigonometria-batx1z-content.test.ts`: recalcula cada respuesta (una tabla `computed` y un buscador de soluciones en grados enteros), comprueba los `=` y `≈` con las seis razones y con π = 180° (así 240° y $\frac{4\pi}{3}$ valen lo mismo) y resuelve otra vez las ecuaciones de las lecciones.

### Fase 3: laboratorio

- Seis herramientas (`lab/labTools.ts`), una o dos por etapa. Propias, cada una con predicción, retos fijos, retos infinitos y ▶:
  - `six` (L3, `six.ts`, retos 103301–103305): el punto en la circunferencia, la recta x = 1 (tg y sec) y la recta y = 1 (cotg y cosec). Se predice el signo de la razón elegida («0 o no existe» es la opción del medio).
  - `sum` (L1, `sum.ts`, retos 103101–103105): α y β seguidos en la circunferencia; dos barras comparan la razón de α ± β con la suma (o resta) de las razones. Retos infinitos: escribir 15°, 75°, 105°… como suma o resta de múltiplos de 30° o 45°.
  - `spin` (L2, `spin.ts`, retos 103201–103205): sen(nx) = k o cos(nx) = k con n = 1, 2, 3 y k notable (o ±3/2, sin solución); las soluciones caen en una regla de 0° a 360°. Se predice si hay menos de 2, 2 o más.
- Prestadas con sus ids: `radian` y `circle` de 4.º trigonometría (71901–71904 y 71001–71004) y `wave` de 4.º funciones exponenciales (79401–79405).
- Test `tests/trigonometria-batx1z-lab.test.ts`: la fórmula de la suma coincide con la razón de α ± β para todos los pares de la herramienta, `spinSolutions` coincide con una búsqueda fina, y las seis razones cumplen 1 + tg² = sec² y el signo de su razón.

## Trucos

- `text.ts` propio: `say` y `same` envuelven los de 4.º y además cambian `\cosec` y `\cotg` (`\operatorname{cosec}` y `\operatorname{cotg}` en eu y es; `\csc` y `\cot` en en y ar). `localizeNames` pasa `\sin`, `\tan`, `\csc` y `\cot` de `lessonTexts.ts` y `lessonChecks.ts` a esos nombres.
- El test compartido `lesson-texts` compara las fórmulas en orden: si en árabe o en inglés la frase pone las fórmulas al revés que en castellano («pon A en lugar de B»), falla. Escribe la frase en el mismo orden.
- En SVG, varios espacios seguidos se juntan en uno: dos valores en la misma línea van en dos `<text>`.
- Revisión de figuras con el panel oculto: clonar el SVG en un `div` fijo a 367 px y hacer `zoom` de la captura. El auditor de desbordes debe saltarse `.hide-tail` (la raíz de KaTeX dibuja una cola muy larga recortada).

- En las herramientas, los números de los tableros llevan el signo menos tipográfico (`num` en `TrigonometryTools.tsx`); `dec` deja el guion.
- Pendiente fuera de esta unidad: en árabe, la herramienta `wave` de 4.º saca las etiquetas «6» y «−6» 1–3 px fuera del tablero. No se ha tocado (es de otra unidad).

## En curso

- Fases 1+2 (72f2ee1a) y 3 hechas. Siguiente: fase 4, juegos: J1 monta la fórmula, J2 caza las soluciones, J3 valor exacto, J4 detective, carrera, memoria y «La circunferencia» de 4.º (ids 1034xx–1038xx).
