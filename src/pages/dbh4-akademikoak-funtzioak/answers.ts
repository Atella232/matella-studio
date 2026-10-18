import { readFiguresAnswer } from '../dbh1-figurak-v2/answers.ts'

/* ==========================================================================
   Funtzioak · 4. DBH akademikoak — reading written answers. Every closed
   answer is one number (an image, an end of an interval, a root, a rate,
   a period, a parameter…), maybe negative, a decimal with comma or point
   or a fraction: as in Irudi lauak. A leading «x =», «y =», «k =» or
   «f(…) =» is dropped, so «x = −4» reads as −4.
   ========================================================================== */

export const readFunctionsAnswer = (input: string) => readFiguresAnswer(input.replace(/^\s*(?:[a-zA-Z]|f\s*\([^)]*\))\s*=\s*/, ''))
