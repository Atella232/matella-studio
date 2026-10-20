import { readTrigonometryAnswer } from '../dbh4-akademikoak-trigonometria/answers.ts'

/* ==========================================================================
   Funtzio esponentzialak, logaritmikoak eta trigonometrikoak · 4. DBH
   akademikoak — reading written answers. Every closed answer is one
   number (a value, an exponent, a parameter, degrees, the a of aπ): as in
   Trigonometria (degree sign and «rad» dropped, comma or point, fractions),
   and a leading «x =», «k =» or «f(…) =» is dropped too.
   ========================================================================== */

export const readExponentialAnswer = (input: string) => readTrigonometryAnswer(input.replace(/^\s*(?:[a-zA-Z]|f\s*\([^)]*\))\s*=\s*/, ''))
