# Funtzio esponentzialak eta logaritmikoak · 1.º Bachillerato Ciencias Sociales

Segundo tema del bloque Funciones de 1.º Sociales: curso `batx1-gizarte`, tema `funciones-exponenciales`.

- **Carpeta:** `src/pages/batx1-gizarte-esponentzialak`
- **`storagePrefix`:** `matella-esponentzialak-batx1g`
- **Rama:** `feat/esponentzialak-batx1g`, cortada de `feat/funtzioak-batx1g` (0d3c8af)
- **Bloque de ids:** 134000–134999 (diagnóstico 134001–134008, laboratorio propio 1341xx–1343xx, juegos 134401–134899)
- **Puerto de pruebas:** 5192

## Fuentes

- Anaya, Matemáticas Aplicadas a las CCSS I, edición nueva (`Suma_Piezas`), U5 «Funciones II»: transformaciones (traslaciones, −f(x), f(−x), k·f(x), |f(x)|; escribir x² + bx + c como (x − m)² + p), composición, función inversa (también por ramas), exponenciales (crecimiento %, interés compuesto, depreciación, y = k·aˣ por dos puntos, logística) y logarítmicas (inversa de la exponencial, resolver aᵗ = c con logaritmos, modelos como el olvido). Los ejercicios 32–35 traen funciones trigonométricas, sin teoría.
- Del libro solo se saca el alcance; textos y ejercicios son propios.
- El nombre del tema en `courses.ts` dice «…y Trigonométricas»: lo cambia la sesión coordinadora si el dueño lo decide.

## Lo que eligió el dueño (2026-11-17)

«Las recomendadas»: V1 lecciones propias; A1 sin trigonometría; A2 el interés compuesto solo se enlaza (va en «Aritmética mercantil»); L1 «¿Recta o exponencial?», L2 «La curva en S»; M prestadas (Ciencias: dos máquinas en cadena, el espejo y = x; 4.º: mueve la exponencial, mueve el logaritmo, crecimiento, escalera de logaritmos); J1 «¿Lineal o exponencial?», J2 «Descuento, IVA y envío», J3 detective; J4 carrera, memoria y prestados (Ciencias: ¿dónde cae el punto? niveles 1–2, ordena las máquinas, deshaz la máquina; 4.º: ¿cuándo se duplica?, láser de curvas). Fuera: L3.

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Etapas y lecciones (ids):** `transforms` (`shifts`, `reflections`, `vertex-form`) · `composition` (`composition`, `inverse`, `inverse-graph`) · `exponential` (`exp-graph`, `percent-growth`, `two-points`) · `logarithmic` (`log-inverse`, `log-graph`, `solve-time`) · `models` (`doubling`, `logistic`, `log-model`).
- **Dibujos nuevos (7):** `TaxDiscountFigure`, `PercentFigure`, `TwoPointsExpFigure`, `SolveTimeFigure`, `DoublingFigure`, `LogisticFigure`, `LogModelFigure`, más `SocExpHeroArt`. Prestados: `ShiftsFigure`, `ReflectionsFigure`, `MachineFigure`, `MirrorFigure` (Ciencias, Funciones), `ShiftFigure`, `ExponentialFigure` (4.º aplicadas, Gráfica), `LogGraphFigure`, `LogShiftFigure` (4.º académicas, Exponenciales).
- **Contenido:** diagnóstico 134001–134008, práctica 1–20, retos 101–115, banco 1–50. Cuando un logaritmo da decimales, se pide el año o el día entero (o la respuesta queda abierta con dos decimales).
- **Registro:** `active: true` en la línea de `funciones-exponenciales` de `courses.ts`, ruta en el router y dirección en `paths.ts`.
- **Test nuevo:** `tests/esponentzialak-batx1g-content.test.ts`.
- **Revisión a 375 px (eu, es, ar):** las 15 lecciones, portada, ejercicios y diagnóstico: sin desbordes ni errores de KaTeX.

## Trucos

- En euskera, «% 20ko» pega el sufijo al número: se escribe «deskontu bat (% 20)» o «BEZa (% 21)».
- `lesson-checks` comprueba los puntos de las opciones en la fórmula: una pregunta del tipo «¿por qué punto pasa siempre $y=a^x$?» falla porque no puede evaluar $a^x$; se pregunta el valor en $x=0$.
- Los dibujos con planos altos necesitan `oy` ≈ 42 y la altura del dibujo a la medida (la «y» del eje y los números de abajo se cortaban).

**Fase 3, laboratorio:** 9 herramientas.
- **Propias (2):** L1 `line-exp` «¿Recta o exponencial?», retos 134101–134105 (`lab/lineExp.ts`): A(0, a) y B(1, b) dan la recta y la exponencial; se predice cuál da más en x; ▶ dibuja las dos. L2 `logistic` «La curva en S», retos 134201–134205 (`lab/logistic.ts`): M, b, a ∈ {1,5; 2; 3} y un día x; se predice si ya se ha pasado de M/2 (aˣ frente a b); la curva y la línea M/2 solo aparecen tras predecir; ▶ recorre los días.
- **Prestadas (7):** dos máquinas en cadena y espejo y = x (Ciencias); función exponencial, mueve la exponencial, crecimiento, escalera de logaritmos, mueve el logaritmo (4.º).
- **Test:** `tests/esponentzialak-batx1g-lab.test.ts`.
- **Revisión a 375 px (eu, es, ar):** las 2 propias antes y después de predecir, sin desbordes; en árabe, «mueve la exponencial» (la «y») y «crecimiento» (el 1000) cortan un texto del eje: son de 4.º, no se tocan.

**Fase 4, juegos:** 10 juegos, récords en `matella-esponentzialak-batx1g-game-records`.
- **Propios (2 + detective):** J1 `table` «¿Lineal o exponencial?», niveles 134501–134503 (`games/table.ts`): tabla de cuatro datos; se elige el modelo (diferencias o cocientes constantes) y el valor en x = 4 (o x = 5 en el nivel 3); las cartas falsas son el otro modelo y los cruces. J2 `checkout` «Descuento, IVA y envío», niveles 134551–134553 (`games/checkout.ts`): precio final con dos operaciones en orden; qué orden da el precio (2 operaciones); qué orden de 3 da el precio (4 cartas, solo una da el precio). Céntimos enteros. Detective 134701–134703 con 12 errores (x + a, f(−x), f ∘ g, f⁻¹; 1 − r, la raíz, (k·a)ˣ, dos subidas; c/a, log(c/a), dominio del log, 2ⁿ).
- **Carrera** 134401–134405 (15 tipos) y **memoria** 134801–134803 (factores de %, logaritmos, inversas).
- **Prestados:** de Ciencias, «¿Dónde cae el punto?» (solo niveles 1–2) 134811–134812, «Ordena las máquinas» 134821–134823, «Deshaz la máquina» 134831–134833; de 4.º, «¿Cuándo se duplica?» 134841–134843 y «Láser de curvas» 134851–134853 (exp y parábola; log e hipérbola; exp y log).
- **Test:** `tests/esponentzialak-batx1g-games.test.ts`.

## Cierre

- **2026-11-17:** 3308 tests, lint y build en verde; inventario OK (el script cuenta como propios juegos y herramientas prestados; de verdad: 2 herramientas y 2 juegos propios más el detective, lo que eligió el dueño).
- **Revisión a 375 px (eu, es, ar):** portada, las 15 lecciones, diagnóstico, ejercicios, las 9 herramientas (antes y después de predecir) y los juegos propios hasta el veredicto. Sin desbordes ni errores de KaTeX. Avisos de 4.º (no se tocan): en árabe, «mueve la exponencial» y «crecimiento» cortan un texto del eje.
- **Hoja de euskera:** `hoja-revision.mjs batx1-gizarte-esponentzialak … --herramientas line-exp,logistic --juegos race,table,checkout,detective,memory`, en la carpeta de notas compartidas.
- **Para fusionar:** el nombre del tema en `courses.ts` sigue diciendo «…y Trigonométricas»; el dueño quitó la trigonometría (decide la sesión coordinadora).
