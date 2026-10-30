import type { OperationAnswer } from '../../features/unit-v2/lab/types.ts'
import type { UnitLanguage } from '../../features/unit-v2/types.ts'
import { englishDigits } from '../../utils/numberFormat.ts'
import { readDecimalAnswer } from '../dbh1-hamartarrak-v2/answers.ts'

/* ==========================================================================
   Proportzionaltasuna · 4. DBH aplikatuak — reading written answers. Like
   the first-year unit, the % sign is dropped (25 %, %25 and 25 are the same
   answer), and so is the euro sign, because many answers are money
   (8131,33 € or 8.131,33 €).
   ========================================================================== */

export const readMoneyAnswer = (input: string) => readDecimalAnswer(input.replace(/[%٪€]/g, ''))

/** A lab answer, and whether it was typed on the English page, where 18,700 groups thousands */
export interface LabAnswer {
    answer: string
    english?: boolean
}

/** A lab answer as the checks read it: from the English page the commas between thousands go (18,700 → 18700) */
export const readLabAnswer = (state: LabAnswer) => readMoneyAnswer(state.english ? englishDigits(state.answer) : state.answer)

/** The learner types or checks: the answer keeps the language of the page */
export function typeLabAnswer<State extends LabAnswer>(state: State, patch: Partial<OperationAnswer>, language: UnitLanguage): State {
    return { ...state, ...patch, english: language === 'en' }
}

