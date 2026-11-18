# Sistemak · 2.º Bachillerato Ciencias Sociales

Tercer tema de 2.º Sociales (curso `batx2-gizarte`, tema `sistemas`), tercero del bloque «Álgebra» del reparto en paralelo (ver `bachillerato.md`, «Reparto en paralelo de 2.º Sociales»).

- **Carpeta:** `src/pages/batx2-gizarte-sistemak`
- **`storagePrefix`:** `matella-sistemak-batx2g`
- **Rama:** `feat/sistemak-batx2g`, cortada de `feat/determinanteak-batx2g` (9eb9541)
- **Bloque de ids:** 143000–143999 (diagnóstico 143001–143008, laboratorio propio 143101–143399, juegos 143401–143899)
- **Gemelos:** `batx2-zientziak-sistemak` (Rouché, Cramer, homogéneos, discusión, problemas) y `batx1-zientziak-sistemak` (Gauss). Se importan, no se copian ni se editan. Política del dueño: importar las lecciones de cálculo y escribir solo las de contexto. Al importar de 1.º hay que cambiar la etapa de cada lección (`{ ...topic, stage }`), porque las etapas de 1.º no son las de esta unidad.

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach CCSS U3 «Sistemas de ecuaciones» (solucionario, fórmulas como imagen), Anaya MACS II U1 «Método de Gauss» y U3 §6–§9 (Rouché, Cramer, homogéneos, discusión). EBAU País Vasco: problemas de tres incógnitas planteados y resueltos. Ficha: `~/Documents/Matella-fuentes/batx2g-algebra/ficha-sistemas.md`.
- **Frontera:** Determinantes deja aquí «ninguna solución / infinitas» (allí solo decide $|A|$). Programación lineal (inecuaciones) va en `programazioa`.

## Elección del dueño (2026-11-18)

«Las recomendadas»: V1 (16 lecciones de Ciencias + 2 propias), V3 (retos y ejercicios estilo EBAU), L1 y L2 propias + M1 máquina de Gauss (1.º) y M2 mapa de la discusión (2.º), J1 «¿Cuántas soluciones tiene el negocio?», J2 «Traduce la frase», J3 detective propio, J4 «Rouché exprés» y «Columnas de Cramer» de 2.º, J5 carrera y memoria de 2.º.

## Fases 1–3: lecciones, contenido y laboratorio

- **Etapas propias** (`stages.ts`, aparte para que `content.ts` y los tests las importen): `gauss`, `rouche`, `cramer` (con los homogéneos), `discussion`, `problems`. Cada lección importada recibe la etapa de esta unidad (`twinStage` en `lessons.tsx`); lo mismo los ejercicios de práctica y retos (`stageOf`).
- **Lecciones:** de 1.º `classify-systems`, `triangular-systems`, `gauss-method`, `solutions-count`, `parametric-solutions`; de 2.º `matrix-form`, `rouche-theorem`, `rank-classify`, `cramer-rule`, `inverse-solve`, `homogeneous-trivial`, `parameter-determinant`, `parameter-ranks`, `parameter-solve`, `word-problems`, `parameter-problems`. Propias: `prices-how-many` «¿Ninguno, uno o infinitos precios?» (etapa `rouche`, tres lotes de dos productos y Rouché) y `statement-system` «Del enunciado al sistema» (etapa `problems`, fondos de inversión; ejemplo: examen con aciertos, fallos y blancos).
- **Contenido:** diagnóstico 143001–143006 de Ciencias (113002, 113005, 118002, 118003, 118004, 118006) y 143007–143008 propios. Práctica, retos y banco: claves `['b1' | 'b2', id]` en `practiceOrder`, `challengeOrder` y `sectionOrder`; propios `rankBundles`, `translate`, `infinitePrices`; `noPrices`, `thirdBundle`, `cramerPrices`, `exam`; `bundlesThree`, `invest`, `cakes`. Fuera: rectas (2.º práctica 4, banco 7), cuatro incógnitas (retos 101 y 103), Cramer con λ (reto 106, banco 16).
- **Laboratorio:** L1 `prices-count` (`lab/pricesCount.ts`, 143101–143105: frutería con precios únicos, papelería con datos que no cuadran, panadería con infinitos; se predice ninguno/uno/infinitos y se ven los rangos) y L2 `statement` (`lab/statement.ts`, 143151–143155: fondos, examen y tienda; cada frase se escribe con pasos de −3 a 3 y la derecha; vale cualquier múltiplo). De Ciencias, tal cual: `gauss-machine` (1.º) y `discussion-map` (2.º).
- **Trucos:** el test de euskera de las lecciones pide que cada palabra del vocabulario salga en el texto de esa lengua (por eso la explicación en euskera nombra «bateragarri determinatua» e «indeterminatua»). Una fórmula que empieza por `$z=` en euskera la toma el test de sufijos por «$z»: se escribe `$\frac{|A_z|}{|A|}…$`.

## En curso

- Fases 1–3 hechas (commit siguiente). Falta: fase 4 juegos (J1, J2, J3 propios; «Rouché exprés», «Columnas de Cramer», carrera y memoria de 2.º renumerados, 143401–143899) y cierre (375 px eu/es/ar, inventario, hoja en euskera).
