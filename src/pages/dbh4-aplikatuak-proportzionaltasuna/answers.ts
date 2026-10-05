import { readDecimalAnswer } from '../dbh1-hamartarrak-v2/answers.ts'

/* ==========================================================================
   Proportzionaltasuna · 4. DBH aplikatuak — reading written answers. Like
   the first-year unit, the % sign is dropped (25 %, %25 and 25 are the same
   answer), and so is the euro sign, because many answers are money
   (8131,33 € or 8.131,33 €).
   ========================================================================== */

export const readMoneyAnswer = (input: string) => readDecimalAnswer(input.replace(/[%٪€]/g, ''))
