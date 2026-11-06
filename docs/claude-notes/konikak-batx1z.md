# Konikak · 1.º Bachillerato Ciencias

Tercera unidad del bloque Geometría (reparto en paralelo de 1.º Ciencias, ver `bachillerato.md`): curso `batx1-zientziak`, tema `conicas` (Lugares geométricos y cónicas).

- **Carpeta:** `src/pages/batx1-zientziak-konikak`
- **`storagePrefix`:** `matella-konikak-batx1z`
- **Rama:** `feat/konikak-batx1z`, cortada de `feat/geometria-batx1z` (92ab6ba) para usar sus piezas
- **Bloque de ids:** 107000–107999 (diagnóstico 107001–107008, laboratorio propio 107101–107399, juegos 107401–107899)

## Fuentes y alcance

- **Libros:** Anaya Matemáticas I (Saber Hacer) U9 «Lugares geométricos. Cónicas» y Santillana 1.º Bach Ciencias U7 (solucionario). Del libro solo se saca el alcance; textos y ejercicios propios.
- **Notación de los dos libros:** parábola y² = 2px (foco (p/2, 0), directriz x = −p/2); elipse con a² = b² + c²; hipérbola con c² = a² + b²; e = c/a.
- **Solo en Anaya:** potencia de un punto y eje radical (Santillana no los trae): se proponen como opción.
- **Viene de Geometría analítica:** la mediatriz como recta del triángulo y la distancia punto-recta; aquí la mediatriz y las bisectrices son lugares geométricos.

## Diseño elegido (2026-11-06: «Las recomendadas»)

- **V1:** 15 lecciones en 5 etapas (3/4/3/2/3):
  - `loci` (azul): `perpendicular-bisector`, `angle-bisectors`, `distance-loci`.
  - `circle` (violeta): `circle-equation`, `circle-general`, `circle-line`, `two-circles`.
  - `ellipse` (mostaza): `ellipse-definition`, `ellipse-elements`, `ellipse-shifted`.
  - `hyperbola` (coral): `hyperbola-definition`, `hyperbola-asymptotes`.
  - `parabola` (verde): `parabola-definition`, `parabola-positions`, `recognize-conic`.
- **Laboratorio:** L1 «El jardinero» (elipse con cuerda), L2 «Foco y directriz» (parábola), L3 «La excentricidad»; prestadas de 4.º `circle` y `bisector`.
- **Juegos:** J1 «¿Qué cónica es?», J3 «La antena», J4 detective de cónicas (12 errores), J5 carrera, J6 memoria.

## Trucos

- **Notación fija en toda la unidad (lecciones, laboratorio y juegos):** `a` es siempre el semieje mayor; la elipse de eje vertical es $\frac{x^2}{b^2}+\frac{y^2}{a^2}=1$. Parábola $y^2=2px$, foco $(\frac{p}{2},0)$, directriz $x=-\frac{p}{2}$; nunca 4p.
- **Términos:** eu «leku geometrikoa», «erdibitzailea» (mediatriz), «erdikaria» (bisectriz), «fokua», «zuzentzailea», «ardatzerdi nagusia/txikia», «eszentrikotasuna», «asintota»; ar «المحل الهندسي», «محور القطعة», «منصّف الزاوية», «البؤرة», «الدليل», «الاختلاف المركزي», «المقارب».
- **«Compruébalo» con una ecuación:** el test lee una sola fórmula con «=» como la ecuación que hay que resolver (un punto de respuesta se mete en la curva). Nombra lo que se pide con otra fórmula ($C$, $E$: …) para que haya dos.

## En curso

- 2026-11-06: el dueño eligió «Las recomendadas». Fase 1+2 empezada, **sin código todavía** (se cortó por límite de uso). Abajo, el diseño ya calculado: copiarlo tal cual.
- **Cómo seguir:** copia la estructura de `batx1-zientziak-geometria` (commit ffa0932 = lista de archivos de la fase 1+2: lessons, lessonTexts, lessonChecks, content, figureColors, figures, index, test de contenido, y las 3 líneas de registro: `courses.ts` `conicas` con `active: true`, ruta lazy tras Geometría `matematika/batx1-zientziak/conicas/*`, y añadir la ruta a `paths.ts`). Reutiliza `Fig`, `Frame`, `F`, `Dot`, `LineDraw`, `Segment` de `../batx1-zientziak-geometria/figureKit`. Prueba primero `node --test tests/lesson-*.test.ts tests/takeaway-notation.test.ts tests/lessons-basque-suffixes.test.ts`.
- **Lecciones (problema → resultado):**
  1. `perpendicular-bisector`: A(1,−2), B(5,4) → 2x+3y−9=0 (X(0,3) a √26 de los dos). Ejemplo A(−3,0), B(1,4) → x+y−1=0. Error: (x−4)² = x²−16. Compruébalo: mediatriz de A(2,0), B(0,4): (−1,1) sí; (3,2) y (1,3) no. needs: 3.º `perpendicular-bisector`, 4.º `bisector`.
  2. `angle-bisectors`: 3x−4y+2=0 y 4x+3y−1=0 → x+7y−3=0 y 7x−y+1=0. Ejemplo x−2y+3=0 y 2x+y−4=0 → x+3y−7=0 y 3x−y−1=0. Error: olvidar ± y dividir por normas distintas (x+y−2, 7x−y+4: 5(x+y−2)=±(7x−y+4)). Compruébalo: r: 3x+4y=0, s: 4x+3y=0 → (1,1). «Why»: |u|=|v| ⇔ u=±v. needs: 3.º `angle-bisector`, Geometría `point-line`.
  3. `distance-loci`: a distancia 2 de 3x+4y−1=0 → 3x+4y−11=0 y 3x+4y+9=0. Ejemplo distancia 3 de 6x−8y+5=0 → 6x−8y−25=0 y 6x−8y+35=0. Casos «De una recta» / «De un punto». Compruébalo: distancia 4 de C(1,−3) → (x−1)²+(y+3)²=16. needs: Geometría `parallel-lines`.
  4. `circle-equation`: diámetro A(−1,2), B(5,−6) → C(2,−2), r=5. Ejemplo centro (4,−3) por el origen → r=5. Error: signo del centro. Compruébalo: centro (−2,5), r=3. needs: 4.º `circle`, Geometría `midpoint-symmetric`.
  5. `circle-general`: x²+y²+4x−6y−3=0 → (x+2)²+(y−3)²=16, C(−2,3), r=4. Ejemplo x²+y²−2x+8y+20=0 → r²=−3, no es. «Why»: A=−2a. Error: centro (10,−4) en lugar de (−5,2). Compruébalo «el centro $C$ de …−6x+2y+1=0» → (3,−1).
  6. `circle-line`: tangente a (x−1)²+(y−2)²=25 en P(4,6) → 3x+4y−36=0, d=5. La recta se llama s o t (r es el radio). Ejemplo x+y−7=0 y x²+y²=9 → d≈4,95>3 exterior. Error: comparar con r². Compruébalo: 3x−4y+5=0, centro (2,−1), r=3 → tangente.
  7. `two-circles`: (x−1)²+(y−1)²=4 y (x−4)²+(y−5)²=9 → d=5=r₁+r₂, tangentes exteriores. Casos: se cortan / tangentes / no se tocan. Ejemplo x²+y²=25 y (x−6)²+y²=9 → secantes. Compruébalo: centros (0,0),(5,0), radios 6 y 1 → tangentes interiores. needs: 4.º `distance`.
  8. `ellipse-definition`: focos (±4,0), 2a=10 → x²/25+y²/9=1; P(3; 2,4): PF=2,6, PF′=7,4. Ejemplo focos (±12,0), suma 26 → x²/169+y²/25=1. Error: c²=a²+b² en la elipse (x²/40+y²/24). Compruébalo x²/36+y²/20 → 12.
  9. `ellipse-elements`: x²/16+y²/25=1 vertical, a=5, b=4, c=3, e=0,6. Ejemplo x²/100+y²/36 → e=0,8. «Why»: Pitágoras a²=b²+c². Compruébalo x²/9+y²/25 → focos (0,±4).
  10. `ellipse-shifted`: (x−2)²/25+(y+1)²/9=1 → focos (6,−1) y (−2,−1). Ejemplo (x+3)²/4+(y−2)²/16 → vértices (−3,6), (−3,−2). Compruébalo (x+4)²/9+(y−1)²/4 → (−4,1).
  11. `hyperbola-definition`: focos (±5,0), 2a=6 → x²/9−y²/16=1; P(5; 16/3), PF′−PF=6. Ejemplo focos (±13,0), 2a=10 → x²/25−y²/144=1. Error: restar (x²/20−y²/16). Compruébalo x²/16−y²/9 → c=5.
  12. `hyperbola-asymptotes`: x²/36−y²/64=1 → y=±4/3 x, c=10, e=5/3. Ejemplo x²/9−y²/9 equilátera, e=√2. «Why»: y=±(b/a)√(x²−a²). Error: a/b al revés. Compruébalo x²/4−y²/25 → y=±5/2 x.
  13. `parabola-definition`: foco (3,0), directriz x=−3 → y²=12x; P(3,6). Ejemplo y²=10x → F(5/2,0). «Why»: desarrollar las dos distancias. Error: foco en p. Compruébalo «el foco $F$ de $y^2=8x$» → (2,0).
  14. `parabola-positions`: (y−1)²=8(x+2) → V(−2,1), F(0,1), directriz x=−4. 4 casos (derecha, izquierda, arriba, abajo). Ejemplo x²=−12y → F(0,−3), y=3. Compruébalo y²=−5x → izquierda.
  15. `recognize-conic`: 4x²+9y²−16x+18y−11=0 → (x−2)²/9+(y+1)²/4=1. Casos: circunferencia e=0, elipse, parábola e=1, hipérbola e>1. Ejemplo x²−4y²−2x−8y−7=0 → hipérbola de centro (1,−1). Compruébalo 3x²+3y²−6x+12y−1=0 → circunferencia.
- **Respuestas ya calculadas:** práctica 1–20: −9, 8, 1/7, 17, 5, 10, 15, 6, 0,6, 12, 8, 6, 7, 1,25, 3, 6, 4,5, 10, −3, 4. Retos 101–115: 2, 4, 2 (Apolonio), −3, 3/4, 5, 6, 8, 0,6, 14, 8, 4, 4, 7, 40. Diagnóstico 107001–107008: distancia, punto-recta, centro, completar cuadrado, suma 2a, eje vertical, asíntotas, foco.
- Las figuras son propias (15 + portada); solo la de la mediatriz puede reutilizar la de 4.º.
