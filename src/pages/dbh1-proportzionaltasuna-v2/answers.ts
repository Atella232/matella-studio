import { readDecimalAnswer } from '../dbh1-hamartarrak-v2/answers.ts'

/* ==========================================================================
   Proportzionaltasuna · 1. DBH — reading written answers. Percentages are
   answered with the number before the % sign, so a typed % is dropped
   (otherwise "25 %" would be read as 0,25); decimals as in Hamartarrak.
   ========================================================================== */

export const readProportionAnswer = (input: string) => readDecimalAnswer(input.replace(/[%٪]/g, ''))
