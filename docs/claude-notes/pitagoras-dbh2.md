# Pitagorasen teorema 2. DBH

Folder `src/pages/dbh2-pitagoras-v2`, route `matematika/dbh2/teorema-pitagoras/*`. Stages: theorem, sides, plane, circle, space. Lab 7 tools (ids 231xx…); games race 241xx and memory 242xx.

## Own games (2026-11-02)

Branch `feat/pitagoras-dbh2-games` (stacked on the Aljebra and Ekuazioak game branches). Three games of this topic:
- `ladder` (`games/ladder.ts`), 24301–24303: the ladder. The learner works out where to put the foot (a leg) or which ladder is needed (the hypotenuse), sets it with a slider and a stepper and leans it; the ladder is drawn only after the answer (green if it reaches the window, red if it stays short or goes past). Level 1 whole triples, level 2 half-metre triples (step 0.5), level 3 any lengths to tenths. No window higher than 12 m.
- `classify` (`games/classify.ts`), 24401–24403: what triangle is it (acute, right, obtuse) from three sides; near misses of triples, decimal halves in level 3. `kindOf` compares in tenths.
- `detective` (`games/detective.ts`), 24501–24503: 12 typical errors (legs added, root forgotten, square as double, square of the sum; adding for a leg, subtracting for the hypotenuse, the root split, metres and centimetres mixed; the whole base of an isosceles triangle, the whole diagonals of a rhombus, the base diagonal not squared, the distance to the centre as a leg of the tangent). Non-whole lengths end in `\approx` with hundredths.

Tricks: Arabic prose uses «م» for metres; SVG text needs `direction="ltr"`. A CSS rule on `span` inside a box that holds MathText must use `> span`, or it styles every KaTeX span.
