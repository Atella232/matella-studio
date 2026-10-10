import type { FrequencyRow, Pair } from './stats.ts'

/* ==========================================================================
   Estatistika eta probabilitatea · 4. DBH aplikatuak — the data sets that
   run through the lessons, after Anaya Aplicadas units 11–13 and
   Santillana Aplicadas unit 9: the heights of 40 students in six
   intervals, the cars of 25 families, the spelling mistakes of 40
   students, the 14 heights with an outlier, two groups with the same mean,
   study hours and grades, sunshine and temperature, and the glasses table.
   ========================================================================== */

/** Heights of 40 students (148 cm to 177 cm) in 6 intervals of 5 cm from 147,5: x̄ = 163,5 */
export const heightIntervals = [
    { from: 147.5, to: 152.5, count: 2 },
    { from: 152.5, to: 157.5, count: 5 },
    { from: 157.5, to: 162.5, count: 10 },
    { from: 162.5, to: 167.5, count: 12 },
    { from: 167.5, to: 172.5, count: 8 },
    { from: 172.5, to: 177.5, count: 3 }
]
export const heightRows: FrequencyRow[] = heightIntervals.map((row) => ({ value: (row.from + row.to) / 2, count: row.count }))

/** Cars per family in a housing estate of 25 families (Anaya): x̄ = 1,6, Q₁ = Me = 1, Q₃ = 2 */
export const carRows: FrequencyRow[] = [
    { value: 0, count: 3 },
    { value: 1, count: 12 },
    { value: 2, count: 4 },
    { value: 3, count: 4 },
    { value: 4, count: 2 }
]

/** Spelling mistakes of 40 students in a dictation (Anaya): x̄ = 1,7, σ² = 2,46 */
export const spellingRows: FrequencyRow[] = [
    { value: 0, count: 12 },
    { value: 1, count: 9 },
    { value: 2, count: 7 },
    { value: 3, count: 6 },
    { value: 4, count: 3 },
    { value: 5, count: 3 }
]

/** Heights of 14 students (Anaya): Q₁ = 171, Me = 175,5, Q₃ = 181 and 150 is an outlier */
export const classHeights = [150, 158, 169, 171, 172, 172, 175, 176, 177, 179, 181, 182, 183, 184]

/** Two groups with mean 7: variance 4 and 0,4 */
export const gradesA = [4, 6, 7, 8, 10]
export const gradesB = [6, 7, 7, 7, 8]

/** Weekly study hours and grade of 10 students: strong positive correlation */
export const studyPairs: Pair[] = [[1, 3], [2, 4], [2, 5], [3, 5], [4, 6], [5, 6], [5, 8], [6, 7], [7, 9], [8, 9]]

/** Hours of sunshine and maximum temperature (°C) on 8 days: regression line y = 0,5x + 8 */
export const sunPairs: Pair[] = [[2, 8], [2, 10], [4, 10], [6, 10], [6, 12], [8, 12], [10, 12], [10, 14]]

/** Four clouds for the correlation lesson: r ≈ 0,98, −0,98, 0,59 and 0,06 */
export const correlationClouds: Pair[][] = [
    [[1, 2], [2, 2], [2, 3], [3, 4], [4, 4], [5, 5], [5, 6], [6, 6], [7, 7], [8, 8], [8, 9], [9, 9]],
    [[1, 9], [2, 8], [2, 9], [3, 7], [4, 7], [5, 6], [5, 5], [6, 4], [7, 4], [8, 2], [8, 3], [9, 1]],
    [[1, 3], [2, 6], [2, 2], [3, 5], [4, 3], [5, 7], [5, 4], [6, 8], [7, 4], [8, 7], [8, 5], [9, 8]],
    [[1, 5], [2, 8], [2, 2], [3, 6], [4, 3], [5, 8], [5, 2], [6, 5], [7, 7], [8, 3], [8, 7], [9, 5]]
]

/** Glasses among the 1000 students of a school (Anaya): rows wear / don't wear, columns boys / girls */
export const glassesTable = [
    [187, 113],
    [413, 287]
]
