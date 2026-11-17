# Funtzio elementalak · 1.º Bachillerato Ciencias Sociales

Primer tema del bloque Funciones de 1.º Sociales: curso `batx1-gizarte`, tema `funciones`.

- **Carpeta:** `src/pages/batx1-gizarte-funtzioak`
- **`storagePrefix`:** `matella-funtzioak-batx1g`
- **Rama:** `feat/funtzioak-batx1g`, cortada de `main` 70894bd
- **Bloque de ids:** 133000–133999 (diagnóstico 133001–133008, laboratorio propio 1331xx–1333xx, juegos 133401–133899)
- **Puerto de pruebas:** 5192 (`.claude/launch.json` propio, sin commit)

## Fuentes

- Anaya, Matemáticas Aplicadas a las CCSS I. Hay dos ediciones en el Drive:
  - `Estandar/` y `Saber_Hacer/` son el mismo archivo (solucionario antiguo, U4 pp. 105–127). Su U4 trae también transformaciones y parte entera; su U5 es «Exp, Log, Trig».
  - `Suma_Piezas/` es la edición nueva (LOMLOE, con metas ODS): U4 «Funciones I» y U5 «Funciones II». La U4 no trae transformaciones ni parte entera, y sí la interpolación parabólica (método de Newton). La U5 trae transformaciones, composición, inversa, exponenciales y logarítmicas, sin trigonometría.
- Del libro solo se saca el alcance; textos y ejercicios son propios.

## Propuesta (2026-11-17)

Etapas propuestas (edición nueva): familias y dominio · funciones lineales e interpolación · cuadráticas (vértice, máximos de ingresos y beneficio, parábola por tres puntos) · proporcionalidad inversa y raíz (coste medio) · a trozos y valor absoluto. El dueño eligió «Las recomendadas» (2026-11-17): edición nueva (Suma_Piezas), V1 lecciones propias con dibujos prestados; L1 «Entre dos (o tres) datos», L2 «El precio que más da», L3 «Coste medio»; M prestadas de 4.º (dominio, unir trozos, valor absoluto, punto-pendiente, parábola, hipérbola); J1 «Estima el dato», J2 «El precio justo», J3 «La factura a trozos», J5 detective, J6 carrera, parejas, «Pinta el dominio» y «Láser de curvas». Fuera: L4, J4, parte entera y transformaciones (van al tema 5).

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Etapas y lecciones (ids):** `families` (`families`, `domain`, `context-domain`) · `linear` (`line`, `interpolation`, `linear-models`) · `quadratic` (`parabola`, `optimum`, `three-points`) · `inverse` (`inverse-prop`, `average-cost`, `root`) · `piecewise` (`piecewise`, `piecewise-model`, `absolute`).
- Lecciones con las mejoras de la teoría (`lessonTexts.ts`, `lessonChecks.ts`, enlaces «Antes de empezar» a 4.º y a Ciencias). `text.ts` reexporta `say`/`same`/`plain` del gemelo de Ciencias.
- **Dibujos nuevos (8):** `AreaFigure`, `InterpolationFigure`, `TariffLinesFigure`, `RevenueFigure`, `ThreePointsFigure`, `AverageCostFigure`, `ParkingFigure`, `CopiesFigure`, más `SocFunctionsHeroArt`. Prestados de 4.º: `ModelsFigure`, `VertexFigure`, `HyperbolaFigure`, `RootGraphFigure` (aplicadas, Gráfica), `DomainCasesFigure` (académicas, Funciones), `LineKindsFigure`, `AbsQuadraticFigure` (académicas, Polinómicas).
- **Contenido:** diagnóstico 133001–133008, práctica 1–20, retos 101–115, banco 1–50. Respuestas: un número (euros, unidades, minutos…).
- **Registro:** `active: true` en `courses.ts`, ruta en el router y la dirección en `paths.ts`.
- **Test nuevo:** `tests/funtzioak-batx1g-content.test.ts`.

**Fase 3, laboratorio:** 12 herramientas.
- **Propias (3),** con predicción antes del resultado, retos infinitos (`freshFrom`) y ▶:
  - L1 `estimate` «Entre dos (o tres) datos», retos 133101–133105: datos A(0, a), B(4, b) y, con tres, C(8, c); un objetivo x. Se predice si estimar ahí es interpolar, un dato o extrapolar; ▶ dibuja la recta o la parábola de Newton (con tres datos, la recta queda discontinua para comparar). Zona de los datos en verde y fuera en rojo. Lógica en `lab/estimate.ts`.
  - L2 `price` «El precio que más da», retos 133201–133205: demanda q = Q − k·p; el rectángulo p × q son los ingresos (con coste v por unidad, la parte de costes en rojo y la de beneficio en verde). Se predice si subir 1 € hace subir, quedar igual o bajar los ingresos (o el beneficio); ▶ lleva un punto al vértice (antes de ▶ no aparece). Lógica en `lab/price.ts`.
  - L3 `average` «Coste medio», retos 133301–133305: F, v y x; la barra de x tiene dos partes, v y F/x, sobre la hipérbola que baja hacia la asíntota y = v. Se predice si el coste medio es mayor, igual o menor que 2v (igual cuando F/x = v); ▶ recorre la producción de 10 a 200. Lógica en `lab/average.ts`.
- **Prestadas (9),** con sus retos e ids de 4.º: construye el dominio, une dos trozos (académicas, Funciones), marco de mayor área, punto y pendiente, parábola, hipérbola, raíz (aplicadas, Gráfica), parábola desde sus raíces y dobla el valor absoluto (académicas, Polinómicas).
- **Test:** `tests/funtzioak-batx1g-lab.test.ts`.
- **Revisión a 375 px en eu, es y ar:** las 12 herramientas antes y después de predecir: sin desbordes ni errores de KaTeX. **Aviso para fusionar (no es de esta unidad):** en árabe, la «y» del eje de las herramientas prestadas de 4.º se corta 3 px por arriba (pasa igual en su unidad de origen, p. ej. `dbh4-aplikatuak/grafica-funcion`, parábola).

**Fase 4, juegos:** 8 juegos, récords en `matella-funtzioak-batx1g-game-records`.
- **Propios (3 + detective):**
  - J1 `estimate` «Estima el dato», niveles 133501–133503: datos en la cuadrícula (`Plane` con `onPick`) y un x objetivo; se elige «interpolar» o «extrapolar» y se toca el punto estimado. Dos datos cerca; dos datos lejos y extrapolaciones lejanas; tres datos con la parábola de Newton (la recta de los dos datos más cercanos da otro punto). Lógica en `games/estimate.ts`.
  - J2 `price` «El precio justo», niveles 133551–133553: demanda q = A − B·p y cuatro precios; cada tarjeta dibuja su rectángulo p × q (con coste, la parte roja es el coste). Ingresos; beneficio con coste por unidad; «por cada s € de subida vende d menos». La tarjeta buena da estrictamente más que las otras. Lógica en `games/price.ts`.
  - J3 `bill` «La factura a trozos», niveles 133601–133603: tarifa con parte fija, un precio hasta un límite y otro después, con su gráfica. Desde la fórmula; desde el enunciado; al revés (se sabe la factura, ¿cuánto se gastó?). Precios múltiplos de 5 céntimos y cantidades de 20: todas las facturas en euros enteros. Lógica en `games/bill.ts`.
  - J4 `detective`, niveles 133701–133703: 12 errores (raíz con >, olvidar el denominador, pendiente al revés, olvidar el coste fijo; vértice sin el menos, dar la x como beneficio, olvidar el coste en el beneficio, interpolar desde el dato equivocado; inversa hecha directa, asíntota con el signo cambiado, el trozo que no toca en el límite, el segundo precio para todas las unidades).
- **Carrera** 133401–133405 (15 tipos, tres por etapa) y **memoria** 133801–133803 (dominios, vértices, asíntotas).
- **De 4.º académicas:** «Pinta el dominio» 133811–133813 y «Láser de curvas» 133821–133823 (familias: recta y parábola; hipérbola y |x|; parábola, hipérbola y |x|).
- **Test:** `tests/funtzioak-batx1g-games.test.ts`.
- **Comprobación:** 3276 tests, lint y build en verde; inventario OK (el script cuenta como propios `point-slope`, `domain` y `laser`, que son de 4.º).

## Trucos

- En `takeaway-notation`, una letra de la idea clave no puede salir en mayúscula en la lección: con $y=ax^2+bx+c$ y $y=mx+n$ en la idea clave, la lección no puede usar $A(x)$, $C(x)$ ni $M(t)$ (se usan $S$, $P$, $V$).
- El selector de etapas de «Ejercicios» se ensancha con el nombre más largo: «Alderantzizko proportzionaltasuna eta erroak» desbordaba a 375 px; queda «Alderantzizkoak eta erroak».
- En los dibujos, los ejes con números de 4 cifras necesitan `ox` ≥ 70.

## En curso

- Fases 1–4 hechas. Falta: hoja de euskera, repaso final a 375 px y cerrar la nota. Después, tema 2: `funciones-exponenciales` (`esponentzialak`, 134000–134999), rama `feat/esponentzialak-batx1g` cortada de esta.
