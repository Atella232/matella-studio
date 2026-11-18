# Programazio lineala · 2.º Bachillerato Ciencias Sociales

Cuarto y último tema del bloque «Álgebra» de 2.º Sociales (curso `batx2-gizarte`, tema `programacion-lineal`; ver `bachillerato.md`, «Reparto en paralelo de 2.º Sociales»).

- **Carpeta:** `src/pages/batx2-gizarte-programazioa`
- **`storagePrefix`:** `matella-programazioa-batx2g`
- **Rama:** `feat/programazioa-batx2g`, cortada de `feat/sistemak-batx2g` (785c441)
- **Bloque de ids:** 144000–144999 (diagnóstico 144001–144008, laboratorio propio 144101–144399, juegos 144401–144899)
- **Sin gemelo de Ciencias:** no hay unidad de programación lineal en Matella. Se pueden importar los semiplanos y regiones de `batx1-zientziak-sistemak` (1.º Ciencias) y de `dbh4-akademikoak-sistemak` (4.º académicas); lo demás es propio.

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach CCSS U4 y Anaya MACS II U4. EBAU País Vasco: un problema de programación lineal cada año (viviendas, perlas). Ficha: `~/Documents/Matella-fuentes/batx2g-algebra/ficha-programacion.md`.

## Elección del dueño (2026-11-18)

«Las recomendadas»: V1 (2 lecciones de 1.º Ciencias + 9 propias en cinco etapas), V3 (retos y ejercicios estilo EBAU), L1 «La recta de nivel» y L2 «Construye la región» propias + M1 semiplano y M2 «Comprar con un presupuesto» (4.º académicas), J1 «¿Qué vértice gana?», J2 «Restricción exprés», J3 «¿Única, múltiple o ninguna?», J4 detective y J5 memoria, todos propios. Sin carrera (J6 no elegido).

## Fase 1+2: lecciones y contenido

- **Lógica común** `lp.ts`: vértices (cortes de dos fronteras que cumplen todo, ordenados alrededor), `optimum` (única / múltiple / sin óptimo / vacía; «sin óptimo» si en una caja de ±1000 la región da un valor mejor que todos los vértices), puntos enteros y LaTeX. Usa `region` e `inHalfPlane` de `dbh4-akademikoak-sistemak/systems.ts`.
- **Dibujo** `RegionPlane.tsx` (sobre `Plane` de `dbh2-funtzioak-v2`): región sombreada, fronteras, vértices con nombre, recta de nivel discontinua, puntos enteros; `unit` divide las coordenadas (100 cabe en 10 cuadros). `figures.tsx` tiene un `LessonRegion` por lección.
- **Etapas** (`stages.ts`): `regions`, `feasible`, `objective`, `cases`, `problems`. Lecciones: `half-plane-regions` y `region-cases` de 1.º (con la etapa `regions`) y propias `constraints`, `vertices`, `integer-points`, `level-lines`, `vertex-method`, `solution-types`, `max-profit`, `min-cost`, `full-problem` (este, tipo EBAU de viviendas con otros números).
- **Contenido** (`content.ts`): 144001 = 113008 de 1.º, 144002–144008 propios. Práctica 1–4, retos 101–103 y banco 1–10 son de 1.º (desigualdades). El resto se construye con plantillas que calculan con `lp.ts`: `cross` (corte de dos rectas), `count` (puntos enteros por columnas), `valueAt`, `best` (método de los vértices, la explicación lista $F$ en cada vértice) y `problem` (enunciado con contexto).
- **Tests:** `tests/programazioa-batx2g-content.test.ts` (también comprueba que cada máximo o mínimo pedido es el mayor o menor de los valores listados).

## En curso

- Fase 1+2 hecha (commit siguiente). Falta: fase 3 laboratorio (L1 recta de nivel y L2 construye la región, 144101–144399; semiplano y compras de 4.º), fase 4 juegos (J1–J5 propios, 144401–144899) y cierre.
