import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers.ts'

/* ==========================================================================
   Konbinatoria · 4. DBH akademikoak — answers are counts, often large:
   spaces (also thin and no-break ones) used to group thousands are
   dropped before reading the number, so 40 320 and 40320 are the same.
   ========================================================================== */

export const readCountAnswer = (input: string) => readStatisticsAnswer(input.replace(/[\s\u00a0\u202f\u2009]+/g, ''))
