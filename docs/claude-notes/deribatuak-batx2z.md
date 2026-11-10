# Deribatuak · 2.º Bachillerato Ciencias

Segundo tema del bloque Cálculo diferencial de 2.º Ciencias (reparto en paralelo del 2026-11-09): curso `batx2-zientziak`, tema `derivadas`.

- **Carpeta:** `src/pages/batx2-zientziak-deribatuak`
- **`storagePrefix`:** `matella-deribatuak-batx2z`
- **Página:** `DeribatuakBatx2zIntroPage`
- **Rama:** `feat/deribatuak-batx2z`, cortada de `feat/limiteak-batx2z` (a75a2e1)
- **Bloque de ids:** 123000–123999 (diagnóstico 123001–123008, laboratorio propio 1231xx–1233xx, juegos 123401–123899)
- **Servidor de pruebas:** puerto 5183 (`.claude/launch.json` sin commit, `matella-dev-5183`)

## Fuentes y alcance

- **Libros:** Santillana 2.º Bach Ciencias U8 «Derivadas» y Anaya Matemáticas II U8 «Derivadas». EBAU del País Vasco 2017–2022 solo para el estilo. Del libro solo se ha sacado el alcance; textos y ejercicios son propios.
- **Santillana U8:** derivada en un punto, tangente y normal; derivadas laterales y derivabilidad (muchos trozos); función derivada, reglas y tabla con arcos; tangentes con condiciones (paralelas, desde un punto exterior, con parámetros); derivabilidad con parámetros. Implícita en un solo ejercicio; sin logarítmica ni diferencial.
- **Anaya U8:** lo mismo y además derivadas sucesivas y de orden n, derivada de la inversa, derivación implícita (mucha) y logarítmica, y la diferencial.
- **EBAU País Vasco:** «halla a y b para que f sea derivable» (2018, 2020, 2022) y «halla los coeficientes sabiendo la tangente en un punto» (2017, 2021).
- **Lo que ya vio 1.º (Deribatuak 1.º):** T.V.M., derivada por la definición, tangente y normal, laterales y derivabilidad básica, reglas, cadena simple, exponencial, logaritmo, trigonométricas y arcos, tangente paralela u horizontal.

**Lo que eligió el dueño («Las recomendadas», 2026-11-10):**
- V1: la diferencial fuera. V2: derivación implícita y logarítmica dentro. V3: el repaso de 1.º en una etapa de 2 lecciones.
- Herramientas propias: L1 «La lupa de la derivabilidad», L2 «Ajusta a y b: que no haya pico», L3 «La tangente a la curva implícita», L4 «El espejo de la inversa».
- M: prestadas de 1.º «De la secante a la tangente», «La gráfica de f′» y «¿Derivable aquí?».
- Juegos propios: J1 «¿Derivable?», J2 «Pela la cebolla», J3 «Pendiente escondida», J5 detective de 2.º.
- J6 carrera y memoria; J7 de 1.º «Empareja f y f′» y «Tangente exacta».
- Fuera: L5 «La cebolla de la cadena» y J4 «Orden n».

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `review` | `review-tangent`, `review-rules` |
| `derivability` | `corners`, `absolute`, `parameters` |
| `chain` | `three-layers`, `composite-table`, `higher-order` |
| `special` | `inverse`, `implicit`, `logarithmic` |
| `tangents` | `coefficients`, `exterior-point`, `tangent-curves` |

La propuesta decía «15 lecciones (2 + 13)», pero su tabla, que es lo aprobado, tiene 14 (2 + 3 + 3 + 3 + 3). Se han hecho las 14 de la tabla.

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 14 con las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario, casos en `composite-table` y `higher-order` y 5 «¿Por qué funciona?» en `corners`, `three-layers`, `inverse`, `implicit` y `logarithmic`; `lessonChecks.ts` con error típico y «Compruébalo»). «Antes de empezar» enlaza a Deribatuak, Funciones, Sucesiones y Cónicas de 1.º y a «Dos parámetros: un sistema» de Limiteak 2.º.
- **Dibujos (`figures.tsx`):** `LimitPlot` de Limiteak 2.º (importado, sin tocarlo) para 10 planos; la circunferencia de `implicit` es un camino cerrado propio (dos mitades con √ dejaban un hueco en x = ±5); las tres reglas, las capas, la tabla de compuestas y la escalera de derivadas son dibujos propios. Portada `Bach2DerivativesHeroArt`. Nombres: sen/tg/arcsen/arctg en castellano, tg/arctg en euskera, tan/arctan en inglés y árabe.
- **Contenido (`content.ts`):** diagnóstico 123001–123008; práctica 1–20 (4 por etapa); retos 101–115 (10/20/30); banco 1–50. Toda respuesta cerrada es un número: una pendiente, una derivada en un punto, un parámetro (o la suma o el producto de dos), cuántos picos o tangentes hay, o una abscisa.
- **Registro:** `active: true` en la fila `derivadas` de 2.º Ciencias de `courses.ts`, ruta en `src/router/index.tsx` y la dirección en `src/features/unit-v2/paths.ts`.
- **Test:** `tests/deribatuak-batx2z-content.test.ts` (copia del de Limiteak 2.º).
- **Trucos:** el evaluador de los tests no lee `3!`, `e^0` ni `\ln`, así que esas igualdades no se comprueban (ni fallan); las fórmulas largas van en filas `gathered` desde el principio. Los dibujos propios (reglas, capas, tabla, escalera) van en filas a todo el ancho con letra de 27–31: en dos columnas o con letra de 19 se leían mal a 375 px.
- **Comprobación:** tests de lecciones y de contenido, `tsc` y lint en verde. Revisión a 375 px en eu, es y ar: las 14 lecciones (con los pasos y los «¿Por qué funciona?» abiertos y el «Compruébalo» contestado), el resumen, el diagnóstico, la práctica, los retos y el banco: sin desbordes, sin desplazamiento lateral, sin errores de KaTeX y sin textos fuera de los dibujos.

## En curso

- Fase 3 (laboratorio): escritos `lab/zoom.ts`, `noCorner.ts`, `implicitTangent.ts`, `mirror.ts`, `Bach2DerivativesTools.tsx`, `labTools.ts`, `index.tsx` y `tests/deribatuak-batx2z-lab.test.ts` (en verde). Falta registrarlo en `index.tsx` de la unidad, revisarlo a 375 px y el commit.
- Después: fase 4 (juegos), cierre (hoja de euskera, esta nota).
