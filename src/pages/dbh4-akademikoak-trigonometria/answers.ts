import { readFiguresAnswer } from '../dbh1-figurak-v2/answers.ts'

/* ==========================================================================
   Trigonometria · 4. DBH akademikoak — reading written answers. Answers are
   ratios (maybe negative), lengths, areas, angles in degrees or radians in
   decimal form: as in Irudi lauak (degree sign and units dropped, comma or
   point), and a trailing «rad» is dropped too.
   ========================================================================== */

export const readTrigonometryAnswer = (input: string) => readFiguresAnswer(input.replace(/\s*rad(?:ian\w*)?\s*$/i, ''))
