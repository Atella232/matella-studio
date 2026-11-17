# Probabilitatea · 2.º Bachillerato Ciencias Sociales

Tema 10 de 2.º Sociales (curso `batx2-gizarte`, tema `probabilidad`), primero del bloque «Probabilidad e inferencia» del reparto en paralelo de 2.º Sociales (ver `bachillerato.md`). Los cuatro temas del bloque son `probabilitatea`, `banaketak`, `laginketa` e `inferentzia`, en ramas apiladas.

- **Carpeta:** `src/pages/batx2-gizarte-probabilitatea`
- **`storagePrefix`:** `matella-probabilitatea-batx2g`
- **Rama:** `feat/probabilitatea-batx2g`, cortada de `main` 286824e
- **Bloque de ids:** 150000–150999 (diagnóstico 150001–150008, laboratorio propio 150101–150399, juegos 150401–150899)
- **Servidor de pruebas:** puerto 5203 (`.claude/launch.json` propio, sin commit)

## Fuentes

Santillana 2.º Bach Sociales U10 «Probabilidad» + Anaya 2.º Bach Sociales U10 «Azar y probabilidad» (solucionarios); estilo de la EBAU del País Vasco, Matemáticas Aplicadas a las CCSS II 2017–2022. La ficha de los cuatro temas y los textos extraídos están fuera del repositorio, en `~/Documents/Matella-fuentes/batx2g-probabilidad/`.

**El mapa de capítulos de `bachillerato.md` no coincide del todo con los PDF:** los tipos de muestreo abren Santillana U11 (no U12); Santillana U12 empieza con las distribuciones de la media y la proporción muestral y trae también la diferencia de medias (solo Santillana); Santillana U10 abre con combinatoria. Reparto usado: Probabilidad = S10 + A10; Binomial y normal = S11 sin el muestreo; Muestreo = A11 + muestreo de S11 + principio de S12 + A12 §1–3 + A13 §1–2; Inferencia = resto de S12 + A12 §4–5 + A13 §3 en adelante.

## Propuesta enviada al dueño (2026-11-17)

Los cuatro temas en un solo mensaje, con letras por tema (P-, B-, M-, I-) y una selección recomendada. Convención de respuestas de Inferencia propuesta: valores críticos de la tabla (el más cercano; en empate, el punto medio): 1,645 · 1,88 · 1,96 · 2,05 · 2,33 · 2,575, calculados y comprobados con código en la carpeta propia (sin tocar `normal.ts` de Ciencias); n con raíz exacta y σ, p̂ elegidos para que el error salga exacto; tamaño de muestra redondeado hacia arriba.

## Elección del dueño (2026-11-17)

«Las recomendadas» para los cuatro temas: Probabilidad P-L1, P-L2, P-J1, P-J2, P-J3 y M; Binomial-normal B-L1, B-L2, B-J1–B-J3 y M; Muestreo M-L1, M-L2, M-J1, M-J2, M-J4 y M; Inferencia I-L1, I-L2, I-J1, I-J2, I-J4. Sin P-L3, M-L3, M-J3, I-L3, I-J3 ni la diferencia de medias. Convención de respuestas de Inferencia aprobada.

## Fase 1: lecciones y contenido

- **Etapas y lecciones (15):** `counting` «Zenbatzen ikasi» (`variations`, `permutations`, `combinations`, `counting-laplace`), `events` (`events`, `frequency`, `union`, `two-events`), `conditional` (`tables`, `conditional`, `independence`, `trees`) y `bayes` (`total`, `bayes`, `screening`). Más sencilla que la de Ciencias (sin espacio de sucesos ni axiomas) y con contextos de sociedad: asociaciones, encuestas, tiendas online, salud, transporte. «Antes de empezar» enlaza a 4.º ak Combinatoria y Probabilidad.
- Lecciones, textos, errores típicos y figuras propias (15 figuras en `figures.tsx`; ayudas `Venn`, `FourZones`, `Table`, `Node`, `Person`, `Word`). Notación: `V_{n,k}`, `VR_{n,k}`, `P_n`, `C_{n,k}`, `P(A/B)`.
- **Contenido:** diagnóstico 150001–150008; práctica 1–20 (5 por etapa); retos 101–115 (4, 4, 4, 3); banco 1–50 (12, 13, 13, 12).
- **Test** `tests/probabilitatea-batx2g-content.test.ts`: recuentos, ids, KaTeX, mismas fórmulas en los cuatro idiomas, sufijos del euskera, igualdades, y los recuentos y probabilidades recalculados listando todos los casos.
- **Fuera de la carpeta:** `courses.ts` (línea de `probabilidad` de `batx2-gizarte` con `active: true`), router, `paths.ts` y `tests/probabilitatea-batx2z-content.test.ts` (decía que la Probabilidad de Sociales no estaba activa; ahora remite a este test).
- **Trucos:** en euskera, nada de «% 45ek», «260k», «1etik»: se reescribe con «artean» («gaixoen artean % 95 positibo ateratzen dira»). Número y % con espacio no separable (`\u00a0`), si no el árabe parte «10 %» en dos líneas. En árabe, «10 000» dentro de una frase se ve «000 10»: se aísla con LRI/PDI (`\u2066…\u2069`). Un enunciado de «Otro ejemplo» no pasa de 30 palabras.

## En curso

- Fase 1 de Probabilidad hecha. Siguiente: laboratorio (P-L1 La encuesta, P-L2 El árbol de tuberías + prestadas de Ciencias) y juegos (P-J1 ¿Entre cuántos divido?, P-J2 ¿Importa el orden?, P-J3 detective + prestados, carrera y memoria).
