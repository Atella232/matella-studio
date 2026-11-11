---
name: zenbaki-osoak-dbh1
description: Zenbaki osoak DBH1 unit (2026-09-27) — second DBH1 V2 unit; sources, how it reuses the DBH2 integers unit, phase progress
---

Second 1. DBH unit on the V2 engine (after [[zenbaki-naturalak-dbh1]]). Branch `feat/zenbaki-osoak-dbh1`, route `matematika/dbh1/numeros-enteros/*`, code in `src/pages/dbh1-zenbaki-osoak-v2/`. Legacy `dbh1-zenbaki-osoak/` deleted (owner approved deleting legacy folders once replaced).

Sources: owner's Drive `LIBROS/1_ESO/Santillana/Unidad_05_Enteros.pdf` (class textbook, curricular adaptation: meaning, line/order, absolute value & opposite, sums/subtractions incl. brackets, mult/div sign rule; NO powers, no hierarchy) and `Anaya/Libro_Estandar/Unidad_04_Numeros_Enteros.pdf`. It is the introductory version of the DBH2 integers unit (which already covers the same scope further).

Reuse of DBH2 (`src/pages/dbh2-zenbaki-osoak/`) instead of copying: NumberLine/SituationsFigure/SignRuleFigure figures and CSS; the six lab tools accept a `challenges` prop (IntegerToolProps loosened to LabToolProps); PyramidGame/OrderGame accept `config` {game, levels, art}; the DBH1 race reuses DBH2 generators capped at tier ≤1 plus a new situations circuit. New own pieces: ElevatorFigure, CountersFigure, BracketsFigure, lab BracketsTool, ElevatorGame.

Phases: 1) 14 lessons [263762c]; 2) diagnostic 8, practice 19, bank 30 (15 closed with `answer`), challenges 12 [13b3e81]; 3) lab 7 tools × 4 [dc29b3f]; 4) games race/elevator/pyramid/order [done 2026-09-27]. Merged to main (fast-forward, be079da), pushed and deployed to matella.net on 2026-09-27 at the owner's request.

Own games (2026-11-02): see `dbh1-own-games.md` for the new games, their ids and checks.

**Teoría con las mejoras de 2. DBH (2026-11-04, rama `feat/teoria-dbh1`, commit 88b7a5f, sin publicar):** `lessonTexts.ts` (`integerIntroLessonTexts`; el opuesto, Aur en euskera y árabe y Op en castellano e inglés, como en los pasos) y `lessonChecks.ts` (`integerIntroLessonChecks`, `IntegerIntroTopicId`). «¿Por qué funciona?» en compare-absolute, subtract y multiply. Dibujo tras los pasos: order. 3 enlaces a Zenbaki naturalak. Arreglado: el «Vamos a resolver» de subtract (el submarino, una suma) no casaba con sus pasos, que calculan (−6) − (−1); ahora pide esa resta. La lista de order iba en una sola fórmula y se salía 12 px a 375 px: una fórmula por número, con «،» en árabe. Detalles en `teoria-dbh1.md`.

**Árabe de los dibujos por `Label` (rama `feat/arabic-svg-labels`, 2026-11-11, sin publicar; sale de `feat/arabic-svg-formulas`):** los 8 textos con palabras de `figures.tsx` pasan por `Label` (`dbh2-funtzioak-v2/plane.tsx`), y también los de 2.º Zenbaki osoak que reutiliza. Visto de paso, sin arreglar: la lección number-line llama a `NumberLine` sin `language` (`figure: () => …`), así que «Enteros negativos / positivos» sale en castellano en los 4 idiomas. En árabe la frase va ahora de derecha a izquierda y cada fórmula de izquierda a derecha; eu, es y en no cambian. Detalles, método y lo que queda fuera en `funtzioak-dbh2.md`.

**Idioma en la recta numérica (rama `feat/numberline-language`, 2026-11-11, sin publicar; sale de `feat/arabic-svg-labels`):** la lección number-line ya pasa `language` a `NumberLine` (`figure: (language) => …`), así que «Zenbaki oso negatiboak/positiboak» sale en el idioma del alumno. Es la única llamada que lo necesitaba: `language` solo afecta a las llaves (`braces`); las demás figuras de la unidad no llevan texto con palabras, y las herramientas del laboratorio ya lo pasaban. Comprobado a 375 px en eu, es y ar: en árabe las etiquetas van de derecha a izquierda y centradas bajo su llave, sin desbordar.
