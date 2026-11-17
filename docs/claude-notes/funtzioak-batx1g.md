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

## Trucos

- En `takeaway-notation`, una letra de la idea clave no puede salir en mayúscula en la lección: con $y=ax^2+bx+c$ y $y=mx+n$ en la idea clave, la lección no puede usar $A(x)$, $C(x)$ ni $M(t)$ (se usan $S$, $P$, $V$).
- El selector de etapas de «Ejercicios» se ensancha con el nombre más largo: «Alderantzizko proportzionaltasuna eta erroak» desbordaba a 375 px; queda «Alderantzizkoak eta erroak».
- En los dibujos, los ejes con números de 4 cifras necesitan `ox` ≥ 70.

## En curso

- Fases 1–2 hechas (ver commit). Siguiente: fase 3, laboratorio: L1 «Entre dos (o tres) datos», L2 «El precio que más da», L3 «Coste medio» (ids 1331xx–1333xx) y las prestadas de 4.º.
