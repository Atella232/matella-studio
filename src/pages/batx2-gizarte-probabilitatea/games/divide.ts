import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   P-J1 · Zeren artean zatitu? (¿Entre cuántos divido?): the table of a poll
   and a question in words. The learner taps the cell that goes on top of
   the fraction and then the one that goes below. Level 1 asks for a total
   share (one feature, or both at once: over the grand total); level 2,
   a share inside a row (the row is the new total); level 3, a share
   inside a column, the condition the other way round. The typical mistake
   is the grand total below a conditional. Cells: [row, column], with
   row 2 and column 2 the totals. Pure logic.
   ========================================================================== */

export const DIVIDE_ROUNDS = 6

export type Cell = [number, number]

interface Label {
    /** Basque: the plural noun and its genitive (for «…en artean») */
    eu: string
    euGen: string
    /** Spanish: the noun and the noun with its article */
    es: string
    esArt: string
    en: string
    ar: string
}

interface Context {
    rows: [Label, Label]
    columns: [Label, Label]
}

const CONTEXTS: Context[] = [
    {
        rows: [
            { eu: 'neskak', euGen: 'nesken', es: 'chicas', esArt: 'las chicas', en: 'girls', ar: 'الفتيات' },
            { eu: 'mutilak', euGen: 'mutilen', es: 'chicos', esArt: 'los chicos', en: 'boys', ar: 'الفتيان' }
        ],
        columns: [
            { eu: 'kirolariak', euGen: 'kirolarien', es: 'deportistas', esArt: 'los deportistas', en: 'athletes', ar: 'الرياضيون' },
            { eu: 'ez-kirolariak', euGen: 'ez-kirolarien', es: 'no deportistas', esArt: 'los no deportistas', en: 'non-athletes', ar: 'غير الرياضيين' }
        ]
    },
    {
        rows: [
            { eu: 'gazteak', euGen: 'gazteen', es: 'jóvenes', esArt: 'los jóvenes', en: 'young people', ar: 'الشباب' },
            { eu: 'helduak', euGen: 'helduen', es: 'adultos', esArt: 'los adultos', en: 'adults', ar: 'البالغون' }
        ],
        columns: [
            { eu: 'autobusez doazenak', euGen: 'autobusez doazenen', es: 'usuarios del bus', esArt: 'los usuarios del bus', en: 'bus users', ar: 'مستعملو الحافلة' },
            { eu: 'autoz doazenak', euGen: 'autoz doazenen', es: 'conductores', esArt: 'los conductores', en: 'drivers', ar: 'السائقون' }
        ]
    },
    {
        rows: [
            { eu: 'erretiratuak', euGen: 'erretiratuen', es: 'jubilados', esArt: 'los jubilados', en: 'pensioners', ar: 'المتقاعدون' },
            { eu: 'langileak', euGen: 'langileen', es: 'trabajadores', esArt: 'los trabajadores', en: 'workers', ar: 'العاملون' }
        ],
        columns: [
            { eu: 'online erosleak', euGen: 'online erosleen', es: 'compradores online', esArt: 'los compradores online', en: 'online shoppers', ar: 'المشترون عبر الإنترنت' },
            { eu: 'dendako erosleak', euGen: 'dendako erosleen', es: 'compradores en tienda', esArt: 'los compradores en tienda', en: 'in-store shoppers', ar: 'المشترون في المتجر' }
        ]
    }
]

export type DivideKind = 'margin' | 'both' | 'given-row' | 'given-column'

export interface DivideRound {
    context: number
    /** The four inner counts: [row][column] */
    counts: [[number, number], [number, number]]
    kind: DivideKind
    row: number
    column: number
    top: Cell
    bottom: Cell
}

/** The value of any cell, totals included */
export function cellValue(round: Pick<DivideRound, 'counts'>, [row, column]: Cell): number {
    const inner = (r: number, c: number) => round.counts[r][c]
    if (row < 2 && column < 2) return inner(row, column)
    if (row < 2) return inner(row, 0) + inner(row, 1)
    if (column < 2) return inner(0, column) + inner(1, column)
    return inner(0, 0) + inner(0, 1) + inner(1, 0) + inner(1, 1)
}

export const divideAnswer = (round: DivideRound): FractionValue => fraction(cellValue(round, round.top), cellValue(round, round.bottom))

export const rowLabels = (round: Pick<DivideRound, 'context'>) => CONTEXTS[round.context].rows
export const columnLabels = (round: Pick<DivideRound, 'context'>) => CONTEXTS[round.context].columns

const capital = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

/** The question in words */
export function divideQuestion(round: DivideRound): LocalizedText {
    const row = CONTEXTS[round.context].rows[round.row]
    const column = CONTEXTS[round.context].columns[round.column]
    switch (round.kind) {
        case 'margin':
            return { eu: `Guztien artean, zer proportzio dira ${column.eu}?`, es: `Del total, ¿qué proporción son ${column.es}?`, en: `Of everyone, what share are ${column.en}?`, ar: `من الجميع، ما نسبة ${column.ar}؟` }
        case 'both':
            return { eu: `Guztien artean, zer proportzio dira, aldi berean, ${row.eu} eta ${column.eu}?`, es: `Del total, ¿qué proporción son a la vez ${row.es} y ${column.es}?`, en: `Of everyone, what share are ${row.en} and ${column.en} at once?`, ar: `من الجميع، ما نسبة من هم ${row.ar} و${column.ar} معًا؟` }
        case 'given-row':
            return { eu: `${capital(row.euGen)} artean, zer proportzio dira ${column.eu}?`, es: `Entre ${row.esArt}, ¿qué proporción son ${column.es}?`, en: `Among the ${row.en}, what share are ${column.en}?`, ar: `بين ${row.ar}، ما نسبة ${column.ar}؟` }
        case 'given-column':
            return { eu: `${capital(column.euGen)} artean, zer proportzio dira ${row.eu}?`, es: `Entre ${column.esArt}, ¿qué proporción son ${row.es}?`, en: `Among the ${column.en}, what share are ${row.en}?`, ar: `بين ${column.ar}، ما نسبة ${row.ar}؟` }
    }
}

const KINDS: DivideKind[][] = [['margin', 'both'], ['given-row'], ['given-column', 'given-row']]

function makeRound(random: Random, level: number, kind: DivideKind): DivideRound {
    const scale = pick(random, [1, 2, 5])
    const counts: DivideRound['counts'] = [
        [scale * 5 * randomInt(random, 1, 9), scale * 5 * randomInt(random, 1, 9)],
        [scale * 5 * randomInt(random, 1, 9), scale * 5 * randomInt(random, 1, 9)]
    ]
    const row = randomInt(random, 0, 1)
    const column = randomInt(random, 0, 1)
    const where = {
        margin: { top: [2, column] as Cell, bottom: [2, 2] as Cell },
        both: { top: [row, column] as Cell, bottom: [2, 2] as Cell },
        'given-row': { top: [row, column] as Cell, bottom: [row, 2] as Cell },
        'given-column': { top: [row, column] as Cell, bottom: [2, column] as Cell }
    }[kind]
    void level
    return { context: randomInt(random, 0, CONTEXTS.length - 1), counts, kind, row, column, ...where }
}

/** Six rounds of a level, each kind at least twice and no two the same */
export function createDivideRounds(random: Random, level: number): DivideRound[] {
    const kinds = KINDS[level] ?? KINDS[0]
    const plan = shuffle(random, Array.from({ length: DIVIDE_ROUNDS }, (_, index) => kinds[index % kinds.length]))
    const rounds: DivideRound[] = []
    for (const kind of plan) {
        for (let attempt = 0; attempt < 50; attempt += 1) {
            const round = makeRound(random, level, kind)
            // Two different rows and columns, so the row total, the column total and the grand total never coincide
            const sameTotals = cellValue(round, [round.row, 2]) === cellValue(round, [2, round.column])
            if (sameTotals) continue
            if (rounds.some((other) => JSON.stringify(other) === JSON.stringify(round))) continue
            rounds.push(round)
            break
        }
    }
    return rounds
}

/** Right when both cells are the right ones; a different cell with the same value would also be right */
export function isRightDivision(round: DivideRound, top: Cell, bottom: Cell): boolean {
    return cellValue(round, top) === cellValue(round, round.top) && cellValue(round, bottom) === cellValue(round, round.bottom)
}
