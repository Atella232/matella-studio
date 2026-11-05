# Ekuazioak eta inekuazioak · 1.º Bachillerato Ciencias

Es la tercera unidad de Bachillerato: curso `batx1-zientziak`, tema `ecuaciones-inecuaciones`.

- **Carpeta:** `src/pages/batx1-zientziak-ekuazioak`
- **`storagePrefix`:** `matella-ekuazioak-batx1z`
- **Página:** `EkuazioakBatx1zIntroPage`
- **Rama:** `feat/ekuazioak-batx1z`, cortada de `main` fe5fe70

## Fuentes y alcance

- **Libros:** Santillana 1.º Bach Ciencias U2 (solucionario; la capa de texto de las fórmulas está rota) y Anaya Matemáticas I U3 «Álgebra», apartados 1–3 y 6.
- **Fuera de esta unidad:** los sistemas, el método de Gauss y las inecuaciones con dos incógnitas de Anaya U3 van al tema siguiente, `sistemas`.
- **Textos y ejercicios:** todos son propios. Del libro solo se ha sacado el alcance.
- **Solapamiento con 4.º académicas:** `dbh4-akademikoak-ekuazioak` y `-polinomioak` ya dan casi la mitad. El dueño eligió V1:
  - lo ya visto, como repaso corto con enlaces «Antes de empezar»;
  - lo nuevo de 1.º, más a fondo: grado ≥ 3 con Ruffini, cambio de variable (x⁶, x³, 2ˣ), dos radicales, valor absoluto, exponenciales con logaritmos y con cambio t = aˣ, dominio de los logaritmos, inecuaciones polinómicas y racionales con tabla de signos, inecuaciones con valor absoluto.

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `polynomials` | `ruffini-roots`, `factorize-high`, `algebraic-fractions` |
| `polynomial-equations` | `high-degree`, `change-variable`, `rational-equations` |
| `radical-absolute` | `radical-equations`, `absolute-equations` |
| `exp-log` | `exponential-equations`, `exponential-change`, `log-equations` |
| `inequalities` | `polynomial-inequalities`, `rational-inequalities`, `absolute-inequalities`, `inequality-systems` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-05):** V1; L1 «La tabla de signos», L2 «El valor absoluto doblado», L3 «La máquina del cambio de variable»; M (herramientas prestadas de 4.º: Ruffini, caza de raíces, fórmula de 2.º grado, soluciones falsas con radicales, exponenciales, signo de la parábola, dos inecuaciones a la vez); J1 «¿Válida o falsa?», J2 «Rellena la tabla de signos», J4 detective; J5 carrera, memoria y de 4.º «¿Es solución?», «Pinta la solución», «Caza de raíces» y «Simplifica la fracción».

**Ids previstos:** diagnóstico 7901–7908; laboratorio propio y progreso de juegos en el bloque 101xxx.

## Hecho

**Fase 1+2, lecciones y contenido, commit e7ccbbe:**
- **Lecciones:** las 15 tienen las diez mejoras de la teoría:
  - `lessonTexts.ts`: definiciones, «Otro ejemplo» con números propios, vocabulario y 4 «¿Por qué funciona?» (`ruffini-roots`, `change-variable`, `radical-equations`, `rational-inequalities`);
  - `lessonChecks.ts`: error típico y «Compruébalo»;
  - 16 enlaces «Antes de empezar» a 4.º académicas (Polinomios y Ecuaciones) y a Números reales de 1.º (`absolute-value`, `neighbourhoods`).
- **Dibujos nuevos (3, con variantes):** `ChangeVariableFigure` (`kind` `power` o `exp`), `AbsoluteFoldFigure` (con `inequality`), `SignTableFigure` (con `rational` y `figureAfterSteps`), más `BachEquationsHeroArt`. Los demás se toman de 4.º: `RuffiniFigure`, `AlgebraicFractionFigure` (aplicadas), `FactorStrategyFigure`, `FactoredFigure`, `RationalEquationFigure`, `RadicalFigure`, `ExponentialFigure`, `LogEquationFigure` e `IntervalIntersectionFigure`.
- **Contenido:** diagnóstico 7901–7908, práctica 1–20, retos 101–115 y banco 1–50. Las respuestas son un número: con varias soluciones se pide una, su suma o cuántas hay; con inecuaciones, un extremo o cuántos enteros la cumplen.
- **Test nuevo:** `tests/ekuazioak-batx1z-content.test.ts` (pide al menos 10 igualdades comprobadas, no 25: casi todas las soluciones llevan letras).
- **Comprobación:** 2167 tests, lint y build en verde. Revisado a 375 px en eu, es y ar (63 páginas, con los pasos abiertos y cada palabra). No se sale nada de la pantalla y no hay errores de KaTeX.

**Fase 3, laboratorio:** 10 herramientas.
- **Propias (3),** con predicción antes del resultado y retos infinitos (`freshFrom` de `dbh3-segidak/lab/prediction.ts`):
  - L1 `sign-table` «La tabla de signos», retos 101101–101105: dos o tres factores (x − a) cuyas raíces se mueven; el último puede ir al denominador (su raíz es un agujero). Una sonda x: se predice si el signo ahí es negativo, 0 (o no existe) o positivo; después se ve la fila del producto.
  - L2 `absolute-fold` «El valor absoluto doblado», retos 101201–101205: la V de |mx + q| contra la recta y = c, con =, < o >. Se predice si en la sonda |mx + q| queda por debajo, igual o por encima de c; después se ven los cortes y la parte del eje que es solución.
  - L3 `change-machine` «La máquina del cambio de variable», retos 101301–101305: t₁ y t₂ con t = x², x³ o 2ˣ; se predice si habrá menos de 2, 2 o más de 2 soluciones en x; ▶ lleva cada t a sus x y tacha los que no dan nada.
- **Prestadas (7),** con sus retos e ids de 4.º: Ruffini y caza de raíces (aplicadas), fórmula de 2.º grado (2.º ESO), soluciones falsas con radicales (aplicadas), exponentes que se encuentran, signo de la parábola y dos inecuaciones a la vez (académicas).
- **Test:** `tests/ekuazioak-batx1z-lab.test.ts`. 2171 tests en verde.
- **Revisión:** las 10 herramientas a 375 px en eu, es y ar (antes y después de predecir, con ▶ y reto infinito), sin desbordes ni texto fuera del tablero.

## Trucos

- En `lessonChecks.ts`, una ecuación con $\log$, $|x|$ o $2^x$ no se puede evaluar: si la respuesta se escribe `x=2`, el test falla. Se escribe el número solo o con palabras.
- Las soluciones falsas nunca se escriben como `x=…` en el ejemplo: el test comprueba cada `x=…`.
- Seis fórmulas como `x^4+x^3-x-1=(x-1)(x^3+2x^2+2x+1)` bajaban a 12–15 px a 375 px: van en dos filas con `gathered` (la fila que empieza por `=` sigue a la de arriba para el test).
- La idea clave tiene que usar las mismas letras que su lección: en `log-equations`, $\log A+\log B$ y no $\log a+\log b$.

## En curso

- Fase 4, juegos: J1 «¿Válida o falsa?», J2 «Rellena la tabla de signos», J4 detective; carrera y memoria; de 4.º «¿Es solución?», «Pinta la solución», «Caza de raíces» y «Simplifica la fracción».
