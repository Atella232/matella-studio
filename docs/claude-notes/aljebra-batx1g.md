# Aljebra · 1.º Bachillerato Ciencias Sociales

Tercer tema del bloque «Números y álgebra» de 1.º Sociales: curso `batx1-gizarte`, tema `algebra`.

- **Carpeta:** `src/pages/batx1-gizarte-aljebra`
- **`storagePrefix`:** `matella-aljebra-batx1g`
- **Rama:** `feat/aljebra-batx1g`, cortada de `feat/merkataritza-batx1g` (f073c2c).
- **Bloque de ids:** 132000–132999 (diagnóstico 132001–132008, laboratorio propio 132101–132399, juegos 132401–132899; práctica 1–20, retos 101–115, banco 1–50).
- **Servidor de pruebas:** puerto 5191 (`.claude/launch.json` sin commit).
- **Reutilizar:** `batx1-zientziak-ekuazioak`, `batx1-zientziak-sistemak`, `dbh4-akademikoak-polinomioak`.

## Fuentes y alcance

- **Fuente:** solo Anaya Matemáticas aplicadas a las CCSS I, U3 (edición `Suma_Piezas`, solucionario). Textos y ejercicios propios.
- **Orden del libro:** polinomios y factorización → fracciones algebraicas → ecuaciones (bicuadradas, grado alto, radicales, racionales, exponenciales, logarítmicas) → sistemas (no lineales, Gauss) → inecuaciones de una incógnita → inecuaciones con dos incógnitas. Problemas con contextos económicos (recaudación, ventas, mezclas, presupuesto).

## Diseño elegido (2026-11-17)

El dueño eligió las recomendadas: V1 (13 lecciones de 1.º Ciencias + 4 propias), L1–L3 y J1–J3.

## Fase 1+2 · lecciones y contenido

- **Etapas:** `polynomials`, `equations`, `systems`, `inequalities`, `economy`.
- **Lecciones (17):** de `batx1-zientziak-ekuazioak` ruffini-roots, factorize-high, algebraic-fractions, change-variable, rational-equations, radical-equations, exponential-equations, log-equations, polynomial-inequalities, rational-inequalities; de `batx1-zientziak-sistemak` nonlinear-substitution, gauss-method, half-plane-regions; propias `money-systems`, `break-even`, `supply-demand`, `budget-region` (con `BreakEvenFigure`, `SupplyDemandFigure`, `BudgetRegionFigure`).
- **Contenido:** diagnóstico 132001–132008; práctica 1–20, retos 101–115, banco 1–50. Cada respuesta es un número: «la mayor solución», «cuántos enteros», «cuántas entradas». Los intervalos van en ejercicios del banco sin casilla.
- **Notación:** oferta $O(p)$ y beneficio $B(x)$ en eu/es/ar; en inglés $S(p)$ y $P(x)$. El punto muerto en euskera es «errentagarritasun-atalasea». En la pregunta «Compruébalo» de oferta y demanda no hay nombres de función, porque `lesson-checks` exige fórmulas idénticas en los cuatro idiomas.
- **Respuestas:** `inputMode: 'text'`, como Ciencias (hay negativos y fracciones).
- **Truco:** el test de sufijos en euskera de la unidad mira solo detrás de una fórmula cerrada; `$z=2$` no es un sufijo.

## Fase 3 · laboratorio

- **Propias:** L1 `break-even` (`breakEven.ts`, retos 132101–132105: mochilas, panadería y academia; precio y unidades), L2 `market` (`market.ts`, 132201–132205: tres mercados con equilibrio entero 25, 16 y 20), L3 `budget` (`budget.ts`, 132301–132305: taller y pastelería; sin función objetivo, que es de 2.º). Componentes en `GizAlgebraTools.tsx`.
- **Prestadas (con sus ids):** ruffini, root-hunt, change-machine, radical, exponential, circle, gauss-machine, mixture, sign-table, half-plane, region. 14 herramientas en total.
- **Trucos:** en la etapa `economy` el color de etapa es coral, así que `var(--stage)` sale rojo: las herramientas y los dibujos propios usan azul y rojo fijos, porque las leyendas nombran los colores. El título vasco largo «Errentagarritasun-atalasea» empujaba el botón «Ikusi ikasgaia» fuera de los 375 px: la herramienta se llama «Atalasea». La fórmula del beneficio va en tres líneas (I, C, B).

## En curso

- 2026-11-17: fases 1+2 y 3 hechas (tests, lint y build en verde; revisado a 375 px en eu/es/ar). **Siguiente:** juegos con J1 «Cuadra la taquilla», J2 «¿Gana o pierde?», J3 detective, carrera y memoria (ids 132401–132899), y los reutilizados de Ciencias desde 132811.
