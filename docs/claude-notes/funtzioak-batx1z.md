# Funtzio elementalak · 1.º Bachillerato Ciencias

Es la cuarta unidad de Bachillerato y la primera del bloque Análisis: curso `batx1-zientziak`, tema `funciones`.

- **Carpeta:** `src/pages/batx1-zientziak-funtzioak`
- **`storagePrefix`:** `matella-funtzioak-batx1z`
- **Página:** `FuntzioakBatx1zIntroPage`
- **Rama:** `feat/funtzioak-batx1z`, cortada de `main` 2ff41c2
- **Bloque de ids:** 108000–108999 (diagnóstico 108001–108008, laboratorio propio 1081xx–1083xx, juegos 108401–108899)

## Fuentes y alcance

- **Libros:** Santillana 1.º Bach Ciencias U8 «Funciones» (solucionario; varias páginas escaneadas o con las fórmulas rotas) y Anaya Matemáticas I U10 «Funciones elementales» (solucionario, buena capa de texto). Del libro solo se ha sacado el alcance; textos y ejercicios son propios.
- **Orden de Santillana:** dominio y simetría → transformaciones → inversa → exponencial, logarítmica y arco → a trozos → operaciones y composición. De Anaya: la parte entera, las cadenas de transformaciones y las ramas de la inversa.
- **Solapamiento con 4.º académicas:** las familias (rectas, parábolas, hipérbolas, raíces, exponenciales) ya están en `dbh4-akademikoak-funtzioak`, `-polinomikoak` y `-esponentzialak`. Van como enlaces «Antes de empezar»; lo nuevo de 1.º va a fondo.

**Etapas y lecciones (ids):**

| Etapa | Lecciones |
|---|---|
| `study` | `domain`, `symmetry`, `periodic` |
| `transforms` | `shifts`, `reflections`, `stretch` |
| `inverse` | `inverse-function`, `inverse-graph`, `exp-log`, `arc` |
| `piecewise` | `piecewise`, `absolute`, `floor` |
| `operations` | `operations`, `composition` |

**Lo que eligió el dueño («Las recomendadas», 2026-11-05):**
- V1: lo de 4.º como repaso corto con enlaces; lo nuevo, a fondo.
- Herramientas propias: L1 «El taller de transformaciones», L2 «Dos máquinas en cadena», L3 «El espejo y = x», L4 «La escalera de la parte entera».
- M: herramientas prestadas de 4.º (construir dominios, par o impar, unir trozos, periódica, valor absoluto, traslaciones de la exponencial y del logaritmo).
- Juegos propios: J1 «¿Dónde cae el punto?», J2 «Ordena las máquinas», J3 «Deshaz la máquina», J5 detective.
- J6 carrera y memoria; J7 de 4.º «Pinta el dominio» y «Láser de curvas».
- Fuera: L5 «Doblar o copiar» y J4 «¿Qué transformación?».
- **Notación aceptada:** la parte entera se escribe $E(x)$ en los cuatro idiomas (zati osoa, parte entera, integer part, الجزء الصحيح); la parte decimal es $x-E(x)$ (zati hamartarra, parte decimal, fractional part, الجزء الكسري).
- **Funciones arco en este tema:** las dos editoriales las ponen aquí; el tema de funciones trigonométricas de Anaya (U5) no las trae.

## Hecho

**Fase 1+2, lecciones y contenido:**
- **Lecciones:** las 15 tienen las diez mejoras de la teoría (`lessonTexts.ts` con definiciones, «Otro ejemplo», vocabulario y 7 «¿Por qué funciona?»; `lessonChecks.ts` con error típico y «Compruébalo»; 20 enlaces «Antes de empezar» a 4.º académicas y a Números reales de 1.º).
- **Nombres trigonométricos:** `text.ts` copia la idea de Trigonometría de 4.º y la amplía a los arcos. `lessonTexts.ts` y `lessonChecks.ts` escriben `\sin`, `\tan`, `\arcsin`, `\arctan` igual en los cuatro idiomas (los tests comparan las fórmulas), y `lessons.tsx` los cambia con `localizeNames`: arcsen y arctg en castellano, arcsin y arctg en euskera, arcsin y arctan en inglés y árabe. `content.ts` y los pasos usan el `say` de `text.ts`, que ya los cambia.
- **Dibujos nuevos (13):** `DomainFigure`, `PeriodicFigure`, `ShiftsFigure`, `ReflectionsFigure`, `StretchFigure`, `MachineFigure`, `MirrorFigure`, `ArcFigure`, `PiecewiseBachFigure`, `AbsoluteGraphFigure`, `StairsFigure`, `OperationsFigure`, `CompositionFigure`, más `BachFunctionsHeroArt`. De 4.º: `SymmetryFigure` (Funciones) y `LogGraphFigure` (Exponenciales).
- **Contenido:** diagnóstico 108001–108008, práctica 1–20, retos 101–115 y banco 1–50. Las respuestas son un número: una coordenada del punto, cuántos enteros tiene un dominio o el menor, el ángulo de un arco en grados, la a de aπ.
- **Registro:** `active: true` en `courses.ts`, ruta en `src/router/index.tsx` y la dirección en `src/features/unit-v2/paths.ts` (es una sola línea: al fusionar con otras sesiones habrá conflicto en esa línea; basta con dejar todas las direcciones).
- **Test nuevo:** `tests/funtzioak-batx1z-content.test.ts`.
- **Comprobación:** 2200 tests, lint y `tsc -b` en verde. Las 15 lecciones a 375 px en eu, es y ar sin desbordes ni errores de KaTeX.

## Trucos

- En las etiquetas de los dibujos en árabe, una fórmula con `∘` se da la vuelta (`f ∘ g` sale `g ∘ f`): `Label` solo aísla los trozos con letras, cifras y signos sencillos. Las fórmulas de composición van en `F` o sin `∘`.
- En el árabe de `lessonTexts.ts`, las fórmulas tienen que salir en el mismo orden que en castellano (el test compara la lista en orden): «نغيّر $x$ إلى $-x$», no «نضع $-x$ مكان $x$».
- Una palabra del vocabulario tiene que aparecer en la lección con su raíz: «repetir» no casa con «se repite» (la raíz es «repet»); «التقريب» no casa con «تقرّب».
- Los grados en las fórmulas se escriben `60^\circ`: `°` dentro de `$…$` rompe KaTeX en modo estricto.

## En curso

- Fase 3, laboratorio: L1–L4 propias y las prestadas de 4.º.
- Después, fase 4 (juegos), cierre (375 px, hoja de euskera) y el tema siguiente, Límites.
