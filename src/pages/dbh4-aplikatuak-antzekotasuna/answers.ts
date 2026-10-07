import { readSolidsAnswer } from '../dbh2-gorputzak-v2/answers.ts'

/* ==========================================================================
   Antzekotasuna · 4. DBH aplikatuak — reading written answers. Answers are
   lengths, ratios, areas, volumes or the n of a scale 1:n: as in the 2. DBH
   solids unit (units dropped, comma or point), and a leading "1:" of a
   scale is dropped too, so "1:20 000" reads as 20 000.
   ========================================================================== */

export const readSimilarityAnswer = (input: string) => readSolidsAnswer(input.replace(/^\s*1\s*[:∶]\s*/, ''))
