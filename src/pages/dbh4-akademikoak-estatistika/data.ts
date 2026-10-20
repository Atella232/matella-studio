import type { FrequencyRow } from '../dbh4-aplikatuak-estatistika/stats.ts'

/* ==========================================================================
   Estatistika · 4. DBH akademikoak — the data sets that run through the
   lessons, after Santillana Académicas unit 12 and Anaya Académicas
   unit 10: the 600 students of a school in four courses, the goals of 30
   matches, two classes with different means, the sport hours of 12
   students with an outlier and the waiting times in four intervals. The
   heights, cars, spelling, firms and the two-variable clouds come from
   the 4. DBH aplikatuak unit.
   ========================================================================== */

/** Students of a school by course and the stratified sample of 60 (proportional allocation) */
export const schoolStrata = [
    { course: 1, students: 180 },
    { course: 2, students: 150 },
    { course: 3, students: 140 },
    { course: 4, students: 130 }
]
export const schoolTotal = 600
export const schoolSample = 60

/** Goals in 30 matches (Santillana): x̄ = 1,8, Me = Mo = 2, Σ fᵢxᵢ² = 150, σ² = 1,76 */
export const goalRows: FrequencyRow[] = [
    { value: 0, count: 6 },
    { value: 1, count: 7 },
    { value: 2, count: 8 },
    { value: 3, count: 6 },
    { value: 4, count: 2 },
    { value: 5, count: 1 }
]

/** Two classes: 20 students with mean 6,5 and 30 with mean 7,2; together 6,92 */
export const classGroups = [
    { students: 20, mean: 6.5 },
    { students: 30, mean: 7.2 }
]

/** Weekly sport hours of 12 students: Q₁ = 3,5, Me = 5,5, Q₃ = 7,5; 15 is an outlier */
export const sportHours = [2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 15]

/** Waiting times (min) in four intervals (Santillana): x̄ = 30,75, two modal intervals, median interval [30, 45) */
export const waitIntervals = [
    { from: 0, to: 15, count: 6 },
    { from: 15, to: 30, count: 3 },
    { from: 30, to: 45, count: 5 },
    { from: 45, to: 60, count: 6 }
]
