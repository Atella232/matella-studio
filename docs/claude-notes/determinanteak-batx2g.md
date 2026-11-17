# Determinanteak · 2.º Bachillerato Ciencias Sociales

Segundo tema de 2.º Sociales (curso `batx2-gizarte`, tema `determinantes`), segundo del bloque «Álgebra» del reparto en paralelo (ver `bachillerato.md`, «Reparto en paralelo de 2.º Sociales»).

- **Carpeta:** `src/pages/batx2-gizarte-determinanteak`
- **`storagePrefix`:** `matella-determinanteak-batx2g`
- **Rama:** `feat/determinanteak-batx2g`, cortada de `feat/matrizeak-batx2g` (bb3bf75)
- **Bloque de ids:** 142000–142999 (diagnóstico 142001–142008, laboratorio propio 142101–142399, juegos 142401–142899)
- **Gemelo:** `batx2-zientziak-determinanteak` (se importa, no se copia ni se edita). Como en Matrices, el dueño eligió importar las lecciones de cálculo y escribir solo las de contexto.

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach CCSS U2 «Determinantes» (solucionario, capa rota; mismo orden y ejercicios que el de Ciencias) y Anaya MACS II U3 «Resolución de sistemas mediante determinantes» (§1–§5 y §10 aquí; §6–§9, Rouché, Cramer, homogéneos y discusión, en `sistemak`). Ninguno trae contextos económicos en los determinantes. Ficha: `~/Documents/Matella-fuentes/batx2g-algebra/ficha-determinantes.md`.
- **Frontera:** aquí determinante, propiedades, adjuntos, desarrollo, rango por menores e inversa con la adjunta. Cramer y Rouché en `sistemak`.

## Elección del dueño (2026-11-17)

«Las recomendadas»: V1 (14 lecciones de Ciencias importadas tal cual, sin `order-four` ni `det-equations`, + 1 propia), V2 (retos y ejercicios estilo EBAU), L1 y L2 propias + M1 máquina de propiedades y M2 deslizador del determinante de Ciencias, J1 «¿Hay precios únicos?», J2 «Adjunto exprés», J3 detective propio, J4 «¿Qué le pasa al determinante?» de Ciencias, J5 carrera y memoria de Ciencias.

## Fase 1+2: lecciones y contenido

- **Lección propia:** `unique-prices` «¿Se pueden averiguar los precios?» (etapa `inverse`, al final). Solo decide por $|A|$: $|A|\neq 0$ → precios únicos con $X=A^{-1}B$; $|A|=0$ → no se pueden fijar. No separa «ninguna / infinitas» (Rouché) ni usa Cramer: eso es de `sistemak`. «Antes de empezar» apunta a `batx2-zientziak/matrices` `matrix-equations` (la de Sociales aún no está en main).
- **Orden:** las 14 de Ciencias por etapas y `unique-prices` al final (`const order` en `lessons.tsx`).
- **Diagnóstico:** 142001–142007 son 117001–117007 de Ciencias con id nuevo; 142008 propio (lotes proporcionales, $|A|=0$).
- **Práctica** (`practiceOrder`): Ciencias 1–10, 13–18 y 20; propios `cofactor` (11), `expand` (12) y `prices` (20). Fuera: 11 (orden 4), 12 (ecuación de grado 2), 19.
- **Retos** (`challengeOrder`, ids 101–115): propios `sarrusParameter` (103), `column` (108), `row` (109) y `threeBundles` (114). Fuera: 103, 108, 109, 114 de Ciencias.
- **Banco** (`sectionOrder`, ids 1–50): propios `bundleDet`, `sarrus`, `parameter` (orden 2 y 3), `cofactorTwo`, `rowTwo`, `adjugate`, `zeros`, `missingCofactor` (adjuntos), `bundles` y `exam` (inversa, estilo EBAU). Fuera: 7, 9, 10 (áreas y ecuación cúbica), 25–29 (orden 4 y ecuaciones), 47 y 49.
- **Tests:** `tests/determinanteak-batx2g-content.test.ts` (también comprueba que no quede orden 4, áreas ni $x^2$). Quitada la línea «only the Ciencias course» de `tests/determinanteak-batx2z-content.test.ts`.
- **Truco:** dos tests comunes suponían muchas lecciones propias por unidad. `tests/lesson-checks.test.ts` pedía que la respuesta correcta de «Compruébalo» no esté siempre en el mismo sitio (imposible con una sola lección) y `tests/lessons-basque-suffixes.test.ts` pedía más de 20 textos en euskera en `lessons.tsx`. Ahora aceptan una unidad con una sola lección propia o que importa `…Topics` de un gemelo (umbral 4). Lo necesitarán también `sistemak` y `programazioa` si importan lecciones.

## Fase 3: laboratorio

- **L1 «¿Se deducen los precios?»** (`lab/bundles.ts`, id de herramienta `bundles`, retos 142101–142105): frutería y papelería (2 × 2) y panadería (3 × 3). Las cantidades son $A$; los totales $B$ salen de precios escondidos. Se predice el signo de $|A|$; con $|A|\neq 0$ salen los precios, con $|A|=0$ dice qué lote es múltiplo (`multipleOf`) o que es mezcla. Infinito: «haz que $|A|$ valga t» cambiando un número de un lote.
- **L2 «La adjunta, casilla a casilla»** (`lab/adjugate.ts`, `adjugate`, retos 142151–142155): tres matrices 3 × 3 con $|A|$ = 3, 1 y 5. Vistas «Adjunto» (fila y columna tachadas, signos del tablero), «Adj A» e «Inversa» (el adjunto (i, j) cae en (j, i) de $A^{-1}$). Se predice el signo del adjunto. Infinito: «enciende el elemento (i, j) de $A^{-1}$».
- **De Ciencias, tal cual:** la máquina de propiedades y el deslizador del determinante, con sus ids.
- Componentes en `lab/SocialTools.tsx`; tests en `tests/determinanteak-batx2g-lab.test.ts` (A⁻¹B devuelve los precios, la traspuesta de la adjunta coincide con la inversa, retos resolubles y ninguno resuelto al empezar). Revisado a 375 px en ar y es.

## En curso

- Fases 1+2 (09148b8) y 3 hechas. Falta: fase 4 juegos (J1 «¿Hay precios únicos?», J2 «Adjunto exprés», J3 detective propio; «¿Qué le pasa al determinante?», carrera y memoria de Ciencias renumerados, 142401–142899) y cierre (375 px eu/es/ar, inventario, hoja en euskera).
