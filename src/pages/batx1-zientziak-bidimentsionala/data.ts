import type { Pair } from './bivariate.ts'

/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Zientziak — the data that
   the lesson figures draw, kept as plain TypeScript so the tests can check
   that each figure shows the numbers of its lesson.
   ========================================================================== */

/** Children (X) and pets (Y) of ten families */
export const FAMILY_PAIRS: Pair[] = [[1, 0], [2, 1], [1, 1], [3, 2], [2, 1], [2, 0], [1, 0], [3, 1], [2, 1], [3, 2]]
/** The pairs counted: rows X = 1, 2, 3 and columns Y = 0, 1, 2 */
export const FAMILY_TABLE = [1, 2, 3].map((x) => [0, 1, 2].map((y) => FAMILY_PAIRS.filter(([a, b]) => a === x && b === y).length))
/** Siblings X = 0, 1, 2 (rows) and pets Y = 0, 1 (columns) of 20 students */
export const PETS_TABLE = [[4, 2], [3, 5], [1, 5]]
/** A 2 × 2 table completed for independence: row totals 30 and 20, column totals 20 and 30 */
export const INDEPENDENT_TABLE = [[12, 18], [8, 12]]
/** The points of the quadrants: centre (3, 4) */
export const QUADRANT_PAIRS: Pair[] = [[1, 2], [2, 3], [3, 3], [4, 5], [5, 7]]
/** Study hours and marks of five students: σxy = 1,8 */
export const STUDY_PAIRS: Pair[] = [[1, 2], [2, 3], [3, 5], [4, 4], [5, 6]]
/** Five heights (in metres) and weights: r = 0,6 exactly */
export const UNITS_PAIRS: Pair[] = [[1.6, 62], [1.65, 74], [1.7, 70], [1.75, 66], [1.8, 78]]
/** A cloud with x̄ = 4, ȳ = 10, σx² = 2,5 and σxy = 5: the line of y on x is y = 2x + 2 */
export const YX_PAIRS: Pair[] = [[2, 5], [3, 9], [5, 13], [6, 13]]
/** A cloud with x̄ = 5, ȳ = 8, σy² = 4 and σxy = 3: the line of x on y is x = 0,75y − 1 */
export const XY_PAIRS: Pair[] = [[4, 6], [3, 6], [6, 10], [7, 10]]
/** Marks x = 10, 20 (rows) and y = 1, 3 (columns) */
export const GROUPED_TABLE = [[6, 2], [2, 10]]
/** The pairs of the working table: r = 0,8 */
export const WORKING_PAIRS: Pair[] = [[1, 3], [2, 2], [4, 6], [5, 5]]
