import { readFiguresAnswer } from '../dbh1-figurak-v2/answers.ts'

/* ==========================================================================
   Gorputz geometrikoak · 2. DBH — reading written answers. Answers are
   counts, lengths, areas, volumes, litres or euros: as in Irudi lauak,
   plus cubic units (cm³, m3) and litres (L, mL, cL) dropped at the end.
   ========================================================================== */

export const readSolidsAnswer = (input: string) =>
    readFiguresAnswer(
        input
            .replace(/³/g, '')
            .replace(/([kdcm]?m)\^?3\s*$/i, '$1')
            .replace(/\s*(?:[kdcm]?[lL]|litro\w*)\s*$/, '')
    )
