import { readDecimalAnswer } from '../dbh1-hamartarrak-v2/answers.ts'

/* ==========================================================================
   Estatistika eta probabilitatea · 2. DBH — reading written answers.
   Answers are counts, frequencies, parameters, degrees, percentages or
   probabilities (a fraction like 3/8 or a decimal). A typed % or degree
   sign is dropped, as the questions ask for the number; decimals as in
   Hamartarrak (comma or point).
   ========================================================================== */

export const readStatisticsAnswer = (input: string) => readDecimalAnswer(input.replace(/[%٪°º]/g, '').trim())
