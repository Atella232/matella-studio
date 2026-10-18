import { readFiguresAnswer } from '../dbh1-figurak-v2/answers.ts'

/* ==========================================================================
   Bektoreak eta zuzenak · 4. DBH akademikoak — reading written answers.
   Every closed answer is one number (a coordinate, a length, a slope, a
   parameter…), maybe negative, a decimal with comma or point or a
   fraction: as in Irudi lauak, with a trailing «u» (units) dropped too.
   ========================================================================== */

export const readVectorsAnswer = (input: string) => readFiguresAnswer(input.replace(/\s*u\.?\s*$/i, ''))
