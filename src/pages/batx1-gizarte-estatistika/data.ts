/* ==========================================================================
   Estatistika unidimentsionala · Batxilergoa 1 · Gizarte Zientziak — the
   numbers the lesson figures draw. They live here (no JSX) so the tests can
   check that each figure draws its lesson's «Let's solve».
   ========================================================================== */

/** Hours of television of 60 people: intervals of different widths */
export const UNEQUAL = [
    { from: 0, to: 1, count: 12 },
    { from: 1, to: 2, count: 18 },
    { from: 2, to: 4, count: 20 },
    { from: 4, to: 8, count: 10 }
]

/** Ages of the 200 customers of a shop: [20,30) 20, [30,40) 60, [40,50) 80, [50,60) 40 */
export const OGIVE = {
    bars: [
        { from: 20, to: 30, count: 20 },
        { from: 30, to: 40, count: 60 },
        { from: 40, to: 50, count: 80 },
        { from: 50, to: 60, count: 40 }
    ],
    /** (upper end, cumulative percentage) */
    points: [[20, 0], [30, 10], [40, 40], [50, 80], [60, 100]] as Array<[number, number]>,
    q1: 35,
    median: 42.5,
    value: 45,
    valuePercent: 60
}

/** Three bar charts of 10 data on the values 1–5, all with mean 3 */
export const SPREAD = [
    { name: 'A', counts: [1, 2, 4, 2, 1], variance: 1.2 },
    { name: 'B', counts: [2, 2, 2, 2, 2], variance: 2 },
    { name: 'C', counts: [4, 1, 0, 1, 4], variance: 3.4 }
]

/** Lengths in mm of 500 parts; the acceptable ones measure between 46 and 54 */
export const SHARE = {
    bars: [
        { from: 40, to: 44, count: 20 },
        { from: 44, to: 48, count: 150 },
        { from: 48, to: 52, count: 260 },
        { from: 52, to: 56, count: 60 },
        { from: 56, to: 60, count: 10 }
    ],
    accepted: [46, 54] as [number, number]
}

/** Waiting minutes of 50 patients, with x̄ = 20 and σ = 7 */
export const BAND = {
    bars: [
        { from: 0, to: 10, count: 3 },
        { from: 10, to: 20, count: 22 },
        { from: 20, to: 30, count: 22 },
        { from: 30, to: 40, count: 3 }
    ],
    mean: 20,
    sd: 7
}
