import { readDecimalAnswer } from '../dbh1-hamartarrak-v2/answers.ts'

/* ==========================================================================
   Irudi lauak · 1. DBH — reading written answers. Answers are numbers:
   degrees, lengths, areas or counts. A typed degree sign and a trailing
   unit (cm, m², km…, also in Arabic letters) are dropped; decimals as in
   Hamartarrak.
   ========================================================================== */

export const readFiguresAnswer = (input: string) =>
    readDecimalAnswer(
        input
            .replace(/[°º]/g, '')
            .replace(/[؀-ۿ²]+/g, ' ')
            .replace(/\s*(?:[kdcm]?m(?:\^?2)?|€|gradu|grados?)\s*$/i, '')
    )
