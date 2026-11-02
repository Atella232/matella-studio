import { pick, randomInt, shuffle, type Random } from '../../features/unit-v2/games/random.ts'
import { add, fraction, multiply, toLatex, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   The probability games of 4. DBH academic:
   · The paths of the tree: two balls are drawn from a bag; tap the leaves
     of the tree that make up the event. Then the products of the branches
     and their sum appear. Level 1: with replacement; level 2: without;
     level 3: three colours.
   · The contingency table: tap the cells of the numerator and the total of
     the denominator. Level 1: P(A) and P(A∩D); level 2: P(A∪D); level 3:
     P(D/A) and P(A/D).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/* ---------- The paths of the tree ---------- */

export const TREE_ROUNDS = 5

export type TreeEventKind = 'both' | 'same' | 'different' | 'at-least' | 'second' | 'exactly-one'
export interface TreeRound {
    counts: number[]
    replace: boolean
    event: TreeEventKind
    /** The colour the event is about (0 = red) */
    colour: number
    /** Leaves as "i-j", first and second ball */
    right: string[]
}

export const COLOUR_NAMES: LocalizedText[] = [say('gorria', 'roja', 'حمراء', 'red'), say('urdina', 'azul', 'زرقاء', 'blue'), say('berdea', 'verde', 'خضراء', 'green')]
/** Both balls of a colour: the plural (and the Arabic dual) */
const BOTH: LocalizedText[] = [say('biak gorriak', 'las dos rojas', 'الكرتان حمراوان', 'both red'), say('biak urdinak', 'las dos azules', 'الكرتان زرقاوان', 'both blue'), say('biak berdeak', 'las dos verdes', 'الكرتان خضراوان', 'both green')]

/** The leaves of the event */
export function eventLeaves(colours: number, event: TreeEventKind, colour: number): string[] {
    const leaves: string[] = []
    for (let first = 0; first < colours; first += 1) {
        for (let second = 0; second < colours; second += 1) {
            const hits = [first, second].filter((value) => value === colour).length
            const fits = event === 'both' ? hits === 2
                : event === 'same' ? first === second
                    : event === 'different' ? first !== second
                        : event === 'at-least' ? hits >= 1
                            : event === 'second' ? second === colour
                                : hits === 1
            if (fits) leaves.push(`${first}-${second}`)
        }
    }
    return leaves
}

/** P(first) and P(second | first) */
export function branch(round: Pick<TreeRound, 'counts' | 'replace'>, first: number, second?: number): FractionValue {
    const total = round.counts.reduce((sum, count) => sum + count, 0)
    if (second === undefined) return fraction(round.counts[first], total)
    if (round.replace) return fraction(round.counts[second], total)
    return fraction(round.counts[second] - (first === second ? 1 : 0), total - 1)
}

export const leafProbability = (round: Pick<TreeRound, 'counts' | 'replace'>, leaf: string): FractionValue => {
    const [first, second] = leaf.split('-').map(Number)
    return multiply(branch(round, first), branch(round, first, second))
}

export const eventProbability = (round: TreeRound) => round.right.reduce((sum, leaf) => add(sum, leafProbability(round, leaf)), fraction(0))

export function createTreeRound(random: Random, levelIndex: number): TreeRound {
    for (;;) {
        const colours = levelIndex === 2 ? 3 : 2
        const counts = Array.from({ length: colours }, () => randomInt(random, 2, levelIndex === 2 ? 4 : 6))
        const replace = levelIndex === 0 ? true : levelIndex === 1 ? false : pick(random, [true, false])
        const event = pick(random, levelIndex === 0 ? ['both', 'second', 'exactly-one'] as const : levelIndex === 1 ? ['same', 'different', 'at-least', 'exactly-one'] as const : ['same', 'at-least', 'both', 'different'] as const)
        const colour = event === 'same' || event === 'different' ? 0 : randomInt(random, 0, colours - 1)
        const right = eventLeaves(colours, event, colour)
        // Two-colour bags are not all the same size; the event is not the whole tree
        if (right.length === colours * colours || right.length === 0) continue
        return { counts, replace, event, colour, right }
    }
}

export function createTreeRounds(random: Random, levelIndex: number): TreeRound[] {
    const rounds: TreeRound[] = []
    while (rounds.length < TREE_ROUNDS) {
        const round = createTreeRound(random, levelIndex)
        if (rounds.some((other) => other.event === round.event && other.colour === round.colour && other.counts.join() === round.counts.join())) continue
        rounds.push(round)
    }
    return rounds
}

/** The event in words: the two red, the same colour, at least one blue… */
export function eventText(round: TreeRound): LocalizedText {
    const c = COLOUR_NAMES[round.colour]
    switch (round.event) {
        case 'both': return BOTH[round.colour]
        case 'same': return say('biak kolore berekoak', 'las dos del mismo color', 'الكرتان من اللون نفسه', 'both the same colour')
        case 'different': return say('kolore desberdinekoak', 'de distinto color', 'من لونين مختلفين', 'different colours')
        case 'at-least': return say(`gutxienez bat ${c.eu}`, `al menos una ${c.es}`, `واحدة ${c.ar} على الأقل`, `at least one ${c.en}`)
        case 'second': return say(`bigarrena ${c.eu} izatea`, `que la segunda sea ${c.es}`, `أن تكون الثانية ${c.ar}`, `the second one being ${c.en}`)
        case 'exactly-one': return say(`zehazki bat ${c.eu}`, `exactamente una ${c.es}`, `واحدة ${c.ar} بالضبط`, `exactly one ${c.en}`)
    }
}

export const fractionText = (value: FractionValue) => toLatex(value)

/* ---------- The contingency table ---------- */

export const TABLE_ROUNDS = 5

export type Cell = `${0 | 1}-${0 | 1}`
export type Total = 'all' | 'row-0' | 'row-1' | 'column-0' | 'column-1'
export type TableQuestion = 'row' | 'cell' | 'union' | 'given-row' | 'given-column'

export interface TableContext {
    rowLetter: string
    columnLetter: string
    rows: [LocalizedText, LocalizedText]
    columns: [LocalizedText, LocalizedText]
}

export const TABLE_CONTEXTS: TableContext[] = [
    {
        rowLetter: 'A', columnLetter: 'D',
        rows: [say('neska', 'chica', 'فتاة', 'girl'), say('mutila', 'chico', 'فتى', 'boy')],
        columns: [say('kirola egiten du', 'hace deporte', 'يمارس الرياضة', 'does sport'), say('ez du egiten', 'no hace', 'لا يمارسها', 'does not')]
    },
    {
        rowLetter: 'M', columnLetter: 'C',
        rows: [say('maskota du', 'tiene mascota', 'لديه حيوان أليف', 'has a pet'), say('ez du', 'no tiene', 'ليس لديه', 'has none')],
        columns: [say('hirian bizi da', 'vive en ciudad', 'يسكن في مدينة', 'lives in a town'), say('herrian bizi da', 'vive en pueblo', 'يسكن في قرية', 'lives in a village')]
    }
]

export interface TableRound {
    context: number
    cells: [[number, number], [number, number]]
    question: TableQuestion
    numerator: Cell[]
    denominator: Total
}

export function createTableRound(random: Random, levelIndex: number): TableRound {
    const cells: [[number, number], [number, number]] = [[randomInt(random, 4, 30), randomInt(random, 4, 30)], [randomInt(random, 4, 30), randomInt(random, 4, 30)]]
    const question: TableQuestion = pick(random, levelIndex === 0 ? ['row', 'cell'] as const : levelIndex === 1 ? ['union', 'union', 'cell'] as const : ['given-row', 'given-column'] as const)
    const numerator: Cell[] = question === 'row' ? ['0-0', '0-1'] : question === 'union' ? ['0-0', '0-1', '1-0'] : ['0-0']
    const denominator: Total = question === 'given-row' ? 'row-0' : question === 'given-column' ? 'column-0' : 'all'
    return { context: randomInt(random, 0, TABLE_CONTEXTS.length - 1), cells, question, numerator, denominator }
}

export function createTableRounds(random: Random, levelIndex: number): TableRound[] {
    const rounds = Array.from({ length: TABLE_ROUNDS }, () => createTableRound(random, levelIndex))
    // Both kinds of question in levels 1 and 3
    if (levelIndex !== 1 && new Set(rounds.map((round) => round.question)).size < 2) return createTableRounds(random, levelIndex)
    return shuffle(random, rounds)
}

export const cellValue = (round: TableRound, cell: Cell) => round.cells[Number(cell[0])][Number(cell[2])]
export function totalValue(round: TableRound, total: Total): number {
    const [[a, b], [c, d]] = round.cells
    if (total === 'all') return a + b + c + d
    if (total === 'row-0') return a + b
    if (total === 'row-1') return c + d
    if (total === 'column-0') return a + c
    return b + d
}

/** P(A), P(A∩D), P(A∪D), P(D/A) or P(A/D) */
export function tableQuestionLatex(round: TableRound): string {
    const { rowLetter: A, columnLetter: D } = TABLE_CONTEXTS[round.context]
    if (round.question === 'row') return `P(${A})`
    if (round.question === 'cell') return `P(${A}\\cap ${D})`
    if (round.question === 'union') return `P(${A}\\cup ${D})`
    if (round.question === 'given-row') return `P(${D}/${A})`
    return `P(${A}/${D})`
}

export const tableAnswer = (round: TableRound) => fraction(round.numerator.reduce((sum, cell) => sum + cellValue(round, cell), 0), totalValue(round, round.denominator))
