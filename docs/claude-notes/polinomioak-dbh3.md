# Polinomioak · 3. DBH (polinomios)

Tema `polinomios` de `dbh3`. Carpeta `src/pages/dbh3-polinomioak/`, `storagePrefix` `matella-polinomioak-dbh3`, ruta `#/matematika/dbh3/polinomios`, rama `feat/polinomios-dbh3` (sale de `feat/sucesiones-dbh3`, ver `dbh3-plan.md`).

Fuentes: Santillana 3.º U5 «Polinomios» + Anaya 3.º U5 «Lenguaje algebraico». Ejercicios originales. Idiomas: eu, es, en, ar.

## Diseño (encargo del 2026-10-31, sin menú)

- Errores típicos: sumar no semejantes; multiplicar exponentes; el menos solo al primer término; olvidar productos cruzados; olvidar 2ab o ponerlo simple; −b² en el cuadrado de una diferencia; suma por diferencia con +; signo de a en Ruffini (x + 3 → −3); resto P(a) con el signo cambiado; faltar el 1 al sacar factor común; «tachar» sumandos en una fracción algebraica.
- Objetos por etapa: fichas de monomios que solo se juntan si son semejantes (álgebra), baldosas y área del producto (operaciones, prestadas), el cuadrado del binomio troceado (identidades), la máquina del resto con la tabla de Ruffini (Ruffini), el rectángulo x² + bx + c (factorización).

## Fase 1 (lecciones y contenido)
- 5 etapas: `algebra`, `operations`, `identities`, `ruffini`, `factor`. 15 temas: expressions, monomials, value · add-sub, product, division · square-sum, square-diff, sum-diff · ruffini, remainder, roots · common-factor, factor-identities, algebraic-fractions. Figuras de 2. DBH Aljebra y de 4.º ap Polinomios.
- Diagnóstico 6601–6608; práctica 1–20; retos 101–115; banco 1–50. Respuestas: número (el coeficiente o el valor que se pide).
- El test de contenido evalúa además cada igualdad con x en x = 2, 3 y −1 (`atX`; los cocientes de monomios `\mathbin{:}` se evalúan por separado).

## Fase 2 (laboratorio)
- 4 propias: `chips` (911xx, juntar fichas semejantes; sin retos infinitos, el dado baraja un mazo nuevo), `square` (912xx, a² + 2ab + b² con piezas), `remainder` (913xx, la máquina del resto: tabla de Ruffini + P(a)), `factor` (914xx, rectángulo de x² + bx + c).
- 4 prestadas: `machine`, `tiles`, `area` (2. DBH Aljebra) y `ruffini` (4.º ap Polinomios), con sus retos.
- Reutiliza `LabParts.tsx` y `labStyle.ts` de `dbh3-segidak`.

## Fase 3 (juegos)
- 6 juegos: carrera (92101–92105, 5 circuitos), parejas (92201–92203), `alike` A por los semejantes (92301–92303), `identity` La pieza de la identidad (92401–92403), `ruffini` La tabla de Ruffini (92501–92503), `detective` Detective de polinomios (92601–92603, 12 errores de este tema).
- CSS: `prop3-*` de Proporcionalidad 3. DBH + `games/Games.css` + AlgebraGames.css.
- Tests: `tests/polinomioak-dbh3-content|lab|games.test.ts`. Los de juegos evalúan en x = 2 las parejas, las identidades y los pasos del detective.

## Trucos
- Detective: con x²·x² multiplicar exponentes da lo mismo que sumarlos, y con (x + 2)/x «tachar» también: esos casos se descartan.
- Árabe: los textos planos de juegos y herramientas con fórmulas (x + 3, a = −3, (a + b)²) van aislados con LRI/PDI y espacios duros; en `lab/labTools.ts` lo hace `isolate` dentro de `say`.

## Estado
Hecha en la rama `feat/polinomios-dbh3`. Tests, lint y tipos en verde; inventario OK; revisada a 375 px en eu y ar. Sin publicar.
