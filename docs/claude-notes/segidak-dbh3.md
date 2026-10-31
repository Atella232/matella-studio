# Segidak · 3. DBH (sucesiones)

Tema `sucesiones` de `dbh3`. Carpeta `src/pages/dbh3-segidak/`, `storagePrefix` `matella-segidak-dbh3`, ruta `#/matematika/dbh3/sucesiones`, rama `feat/sucesiones-dbh3` (sale de `feat/proporcionalidad-dbh3`, ver `dbh3-plan.md`).

Fuentes: Santillana 3.º U3 «Progresiones» + Anaya 3.º U4 «Progresiones». Ejercicios originales. Idiomas: eu, es, en, ar. No hay unidad anterior de sucesiones: todo es nuevo.

## Diseño (sin esperar al menú, encargo del 2026-10-31)

- Errores típicos: confundir lugar y valor; n saltos en vez de n − 1; la diferencia al revés; contar términos en vez de saltos; olvidar dividir entre 2 en la suma; (a₁·r)ⁿ⁻¹; rⁿ en vez de rⁿ⁻¹; sumar la razón; no sacar la raíz; Gauss en una geométrica; suma infinita con r ≥ 1.
- Objetos por etapa: patrones de palillos (sucesiones), la rana en la recta (aritméticas), las barras de Gauss (sumas), la pelota que rebota (geométricas), la barra que nunca se llena (sumas geométricas).

## Fase 1 (lecciones y contenido)
- 5 etapas: `sequences`, `arithmetic`, `sums`, `geometric`, `geo-sums`. 15 temas: terms, general-term, recursive · arith-difference, arith-general, arith-find · gauss, arith-sum, arith-problems · geo-ratio, geo-general, geo-find · geo-sum, geo-infinite, geo-problems. Todos con `mistake`; `cases` en general-term.
- Figuras nuevas (360 de ancho): `SticksFigure`, `RecursiveFigure`, `JumpsFigure`, `GaussFigure`, `BounceFigure`, `HalvesFigure`, `SequencesHeroArt` (sin texto con idioma).
- Diagnóstico 6501–6508; práctica 1–20; retos 101–115; banco 1–50. Respuestas: número o fracción (`checkAnswer` sin `normalizeInput`).

## Fase 2 (laboratorio)
- 5 herramientas propias: `sticks` (891xx, predicción «¿se añade lo mismo?»), `frog` (892xx, ▶ saltos), `gauss` (893xx, ▶ la copia del revés baja), `bounce` (894xx, ▶ la pelota, fracciones exactas), `bar` (895xx, ▶ añade trozos, fracciones exactas).
- Piezas comunes para el resto de 3. DBH: `lab/LabParts.tsx` (Board, Readout en varias líneas, Predict, PlayButton, Hidden) y `lab/labStyle.ts` (colores, `say`, `dec`, `texDec`). Separadas porque react-refresh no deja exportar constantes y componentes en el mismo archivo.

## Fase 3 (juegos)
- 6 juegos: carrera (90101–90105), parejas (90201–90203, tarjetas en dos líneas con `gathered`), `hidden` El patrón escondido (90301–90303), `sorter` El clasificador (90401–90403), `staircase` La escalera de Gauss (90501–90503), `detective` Detective de progresiones (90601–90603, 12 errores de esta unidad; la pantalla es la de Potencias 3. DBH con el texto inglés corregido).
- Los juegos usan el CSS de Proporcionalidad 3. DBH (`prop3-*`) más `games/Games.css`.
- Tests: `tests/segidak-dbh3-content|lab|games.test.ts`. El test de lecciones acepta etapas con guion (`geo-sums`).

## Trucos
- En la escalera, el total en árabe va aislado (LRI/PDI): se lee «usados / total» de izquierda a derecha.
- La pelota usa razones como fracciones (`BOUNCE_RATIOS`) para comparar con 1/2 de forma exacta.

## Estado
Hecha en la rama `feat/sucesiones-dbh3`. Tests, lint y tipos en verde; inventario OK. Publicada el 2026-10-31.

## Publicación
Publicada en matella.net el 2026-10-31 junto con las otras 7 unidades de 3.º (fusión de avance rápido de `feat/estadistica-dbh3` en `main`, último commit 5042946; bundle `index-DSpCP6ns.js`). Comprobada en vivo a 375 px en eu, es y ar (ruta, laboratorio y juegos de las 8).
