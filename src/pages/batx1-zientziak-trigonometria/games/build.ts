import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Muntatu formula (Monta la fórmula): the left side of a formula and
   its right side with gaps. The learner fills the gaps one by one, each
   from two or three pieces; the wrong pieces are the typical mistakes
   (the sign of the cosine, the sum of the ratios, 1 + in the denominator
   of the tangent, the half of the ratio for the half angle). Level 1: the
   sine and the cosine of a sum and of a difference; level 2: the tangent
   and the double angle; level 3: the half angle and sums into products.
   Every piece carries its value, so the tests check that exactly one way
   of filling the gaps gives the left side. Formulas write \sen and \tg
   and the letters α and β, which a round may change for x and y or A and
   B.
   ========================================================================== */

export const BUILD_ROUNDS = 6

type Value = (a: number, b: number) => number

export interface BuildPiece {
    latex: string
    value: Value
}

export interface BuildFormula {
    id: string
    level: number
    left: string
    /** The right side with {0}, {1}… where the gaps are */
    template: string
    /** The pieces of each gap; the first one is right */
    gaps: BuildPiece[][]
    /** The value of the right side from the values of the pieces in the gaps */
    combine: (values: number[], a: number, b: number) => number
    /** The value of the left side */
    truth: Value
}

const p = (latex: string, value: Value): BuildPiece => ({ latex, value })
const PLUS = p('+', () => 1)
const MINUS = p('-', () => -1)
const { sin, cos, tan, sqrt } = Math

/** sen α cos β ± cos α sen β… : the product pieces of the sum formulas */
const SACB = p('\\sen\\alpha\\cos\\beta', (a, b) => sin(a) * cos(b))
const CASB = p('\\cos\\alpha\\sen\\beta', (a, b) => cos(a) * sin(b))
const CACB = p('\\cos\\alpha\\cos\\beta', (a, b) => cos(a) * cos(b))
const SASB = p('\\sen\\alpha\\sen\\beta', (a, b) => sin(a) * sin(b))
const signed = ([first, sign, second]: number[]) => first + sign * second

export const BUILD_FORMULAS: BuildFormula[] = [
    /* ---------- Level 1: the sine and the cosine of a sum and of a difference ---------- */
    { id: 'sin-plus', level: 0, left: '\\sen(\\alpha+\\beta)', template: '{0}{1}{2}', gaps: [[SACB, SASB, CACB], [PLUS, MINUS], [CASB, SASB, CACB]], combine: signed, truth: (a, b) => sin(a + b) },
    { id: 'sin-minus', level: 0, left: '\\sen(\\alpha-\\beta)', template: '{0}{1}{2}', gaps: [[SACB, SASB, CACB], [MINUS, PLUS], [CASB, SASB, CACB]], combine: signed, truth: (a, b) => sin(a - b) },
    { id: 'cos-plus', level: 0, left: '\\cos(\\alpha+\\beta)', template: '{0}{1}{2}', gaps: [[CACB, SACB, CASB], [MINUS, PLUS], [SASB, CASB, SACB]], combine: signed, truth: (a, b) => cos(a + b) },
    { id: 'cos-minus', level: 0, left: '\\cos(\\alpha-\\beta)', template: '{0}{1}{2}', gaps: [[CACB, SACB, CASB], [PLUS, MINUS], [SASB, CASB, SACB]], combine: signed, truth: (a, b) => cos(a - b) },

    /* ---------- Level 2: the tangent and the double angle ---------- */
    {
        id: 'tan-plus', level: 1, left: '\\tg(\\alpha+\\beta)', template: '\\frac{{0}}{{1}}',
        gaps: [[p('\\tg\\alpha+\\tg\\beta', (a, b) => tan(a) + tan(b)), p('\\tg\\alpha-\\tg\\beta', (a, b) => tan(a) - tan(b)), p('\\tg\\alpha\\tg\\beta', (a, b) => tan(a) * tan(b))], [p('1-\\tg\\alpha\\tg\\beta', (a, b) => 1 - tan(a) * tan(b)), p('1+\\tg\\alpha\\tg\\beta', (a, b) => 1 + tan(a) * tan(b)), p('1-\\tg\\alpha-\\tg\\beta', (a, b) => 1 - tan(a) - tan(b))]],
        combine: ([top, bottom]) => top / bottom, truth: (a, b) => tan(a + b)
    },
    {
        id: 'tan-minus', level: 1, left: '\\tg(\\alpha-\\beta)', template: '\\frac{{0}}{{1}}',
        gaps: [[p('\\tg\\alpha-\\tg\\beta', (a, b) => tan(a) - tan(b)), p('\\tg\\alpha+\\tg\\beta', (a, b) => tan(a) + tan(b)), p('\\tg\\alpha\\tg\\beta', (a, b) => tan(a) * tan(b))], [p('1+\\tg\\alpha\\tg\\beta', (a, b) => 1 + tan(a) * tan(b)), p('1-\\tg\\alpha\\tg\\beta', (a, b) => 1 - tan(a) * tan(b)), p('1+\\tg\\alpha-\\tg\\beta', (a, b) => 1 + tan(a) - tan(b))]],
        combine: ([top, bottom]) => top / bottom, truth: (a, b) => tan(a - b)
    },
    {
        id: 'sin-double', level: 1, left: '\\sen 2\\alpha', template: '{0}',
        gaps: [[p('2\\sen\\alpha\\cos\\alpha', (a) => 2 * sin(a) * cos(a)), p('2\\sen\\alpha', (a) => 2 * sin(a)), p('\\sen^2\\alpha+\\cos^2\\alpha', (a) => sin(a) ** 2 + cos(a) ** 2)]],
        combine: ([value]) => value, truth: (a) => sin(2 * a)
    },
    {
        id: 'cos-double', level: 1, left: '\\cos 2\\alpha', template: '{0}{1}{2}',
        gaps: [[p('\\cos^2\\alpha', (a) => cos(a) ** 2), p('2\\cos\\alpha', (a) => 2 * cos(a)), p('\\sen^2\\alpha', (a) => sin(a) ** 2)], [MINUS, PLUS], [p('\\sen^2\\alpha', (a) => sin(a) ** 2), p('2\\sen\\alpha', (a) => 2 * sin(a))]],
        combine: signed, truth: (a) => cos(2 * a)
    },
    {
        id: 'cos-double-sin', level: 1, left: '\\cos 2\\alpha', template: '1{0}{1}',
        gaps: [[MINUS, PLUS], [p('2\\sen^2\\alpha', (a) => 2 * sin(a) ** 2), p('2\\cos^2\\alpha', (a) => 2 * cos(a) ** 2), p('\\sen 2\\alpha', (a) => sin(2 * a))]],
        combine: ([sign, value]) => 1 + sign * value, truth: (a) => cos(2 * a)
    },
    {
        id: 'tan-double', level: 1, left: '\\tg 2\\alpha', template: '\\frac{{0}}{{1}}',
        gaps: [[p('2\\tg\\alpha', (a) => 2 * tan(a)), p('\\tg\\alpha', (a) => tan(a)), p('\\tg^2\\alpha', (a) => tan(a) ** 2)], [p('1-\\tg^2\\alpha', (a) => 1 - tan(a) ** 2), p('1+\\tg^2\\alpha', (a) => 1 + tan(a) ** 2), p('2-\\tg\\alpha', (a) => 2 - tan(a))]],
        combine: ([top, bottom]) => top / bottom, truth: (a) => tan(2 * a)
    },

    /* ---------- Level 3: the half angle and sums into products ---------- */
    {
        id: 'sin-half', level: 2, left: '\\sen\\frac{\\alpha}{2}', template: '\\sqrt{\\frac{{0}}{{1}}}',
        gaps: [[p('1-\\cos\\alpha', (a) => 1 - cos(a)), p('1+\\cos\\alpha', (a) => 1 + cos(a)), p('\\sen\\alpha', (a) => sin(a))], [p('2', () => 2), p('4', () => 4)]],
        combine: ([top, bottom]) => sqrt(top / bottom), truth: (a) => sin(a / 2)
    },
    {
        id: 'cos-half', level: 2, left: '\\cos\\frac{\\alpha}{2}', template: '\\sqrt{\\frac{{0}}{{1}}}',
        gaps: [[p('1+\\cos\\alpha', (a) => 1 + cos(a)), p('1-\\cos\\alpha', (a) => 1 - cos(a)), p('\\cos\\alpha', (a) => cos(a))], [p('2', () => 2), p('4', () => 4)]],
        combine: ([top, bottom]) => sqrt(top / bottom), truth: (a) => cos(a / 2)
    },
    {
        id: 'sin-sum', level: 2, left: '\\sen\\alpha+\\sen\\beta', template: '2{0}{1}',
        gaps: [[p('\\sen\\frac{\\alpha+\\beta}{2}', (a, b) => sin((a + b) / 2)), p('\\cos\\frac{\\alpha+\\beta}{2}', (a, b) => cos((a + b) / 2)), p('\\sen(\\alpha+\\beta)', (a, b) => sin(a + b))], [p('\\cos\\frac{\\alpha-\\beta}{2}', (a, b) => cos((a - b) / 2)), p('\\sen\\frac{\\alpha-\\beta}{2}', (a, b) => sin((a - b) / 2))]],
        combine: ([first, second]) => 2 * first * second, truth: (a, b) => sin(a) + sin(b)
    },
    {
        id: 'sin-difference', level: 2, left: '\\sen\\alpha-\\sen\\beta', template: '2{0}{1}',
        gaps: [[p('\\cos\\frac{\\alpha+\\beta}{2}', (a, b) => cos((a + b) / 2)), p('\\sen\\frac{\\alpha+\\beta}{2}', (a, b) => sin((a + b) / 2)), p('\\cos(\\alpha-\\beta)', (a, b) => cos(a - b))], [p('\\sen\\frac{\\alpha-\\beta}{2}', (a, b) => sin((a - b) / 2)), p('\\cos\\frac{\\alpha-\\beta}{2}', (a, b) => cos((a - b) / 2))]],
        combine: ([first, second]) => 2 * first * second, truth: (a, b) => sin(a) - sin(b)
    },
    {
        id: 'cos-sum', level: 2, left: '\\cos\\alpha+\\cos\\beta', template: '2{0}{1}',
        gaps: [[p('\\cos\\frac{\\alpha+\\beta}{2}', (a, b) => cos((a + b) / 2)), p('\\sen\\frac{\\alpha+\\beta}{2}', (a, b) => sin((a + b) / 2)), p('\\cos(\\alpha+\\beta)', (a, b) => cos(a + b))], [p('\\cos\\frac{\\alpha-\\beta}{2}', (a, b) => cos((a - b) / 2)), p('\\sen\\frac{\\alpha-\\beta}{2}', (a, b) => sin((a - b) / 2))]],
        combine: ([first, second]) => 2 * first * second, truth: (a, b) => cos(a) + cos(b)
    },
    {
        id: 'cos-difference', level: 2, left: '\\cos\\alpha-\\cos\\beta', template: '{0}2\\sen\\frac{\\alpha+\\beta}{2}{1}',
        gaps: [[MINUS, PLUS], [p('\\sen\\frac{\\alpha-\\beta}{2}', (a, b) => sin((a - b) / 2)), p('\\cos\\frac{\\alpha-\\beta}{2}', (a, b) => cos((a - b) / 2))]],
        combine: ([sign, second], a, b) => sign * 2 * sin((a + b) / 2) * second, truth: (a, b) => cos(a) - cos(b)
    }
]

/** The letters of a round: α and β, x and y, or A and B */
export const BUILD_LETTERS: Array<[string, string]> = [['\\alpha', '\\beta'], ['x', 'y'], ['A', 'B']]

/** A formula with its letters changed: \sen\alpha → \sen x (a space keeps the command apart) */
export const lettered = (latex: string, [first, second]: [string, string]) =>
    latex.replace(/\\alpha(?![a-zA-Z])/g, first.startsWith('\\') ? first : ` ${first}`).replace(/\\beta(?![a-zA-Z])/g, second.startsWith('\\') ? second : ` ${second}`)

export interface BuildRound {
    formula: string
    letters: [string, string]
    left: string
    template: string
    /** The pieces of each gap as the round shows them, and where the right one is */
    gaps: Array<{ options: string[]; right: number }>
}

/** Fills the template: each gap with its chosen piece, the current one boxed, the others empty */
export function fillTemplate(round: BuildRound, chosen: Array<number | null>, current: number | null): string {
    return round.template.replace(/\{(\d)\}/g, (_, index: string) => {
        const gap = Number(index)
        const piece = chosen[gap]
        if (piece !== null && piece !== undefined) {
            const latex = round.gaps[gap].options[piece]
            return latex === '+' || latex === '-' ? latex : `{${latex}}`
        }
        return gap === current ? '\\boxed{\\,?\\,}' : '\\square'
    })
}

/** The right side with every gap right */
export const rightSide = (round: BuildRound) => fillTemplate(round, round.gaps.map((gap) => gap.right), null)

export const isBuildRight = (round: BuildRound, chosen: Array<number | null>) => round.gaps.every((gap, index) => chosen[index] === gap.right)

/** Six different rounds of one level: the formulas of the level, each with letters and the pieces in a new order */
export function createBuildRounds(random: Random, levelIndex: number): BuildRound[] {
    const formulas = BUILD_FORMULAS.filter((formula) => formula.level === levelIndex)
    const order = shuffle(random, formulas)
    const rounds: BuildRound[] = []
    for (let index = 0; rounds.length < BUILD_ROUNDS; index += 1) {
        const formula = order[index % order.length]
        const letters = index < order.length ? BUILD_LETTERS[0] : pick(random, BUILD_LETTERS.slice(1))
        if (rounds.some((round) => round.formula === formula.id && round.letters === letters)) continue
        const gaps = formula.gaps.map((pieces) => {
            const options = shuffle(random, pieces.map((_, position) => position))
            return { options: options.map((position) => lettered(pieces[position].latex, letters)), right: options.indexOf(0) }
        })
        rounds.push({ formula: formula.id, letters, left: lettered(formula.left, letters), template: lettered(formula.template, letters), gaps })
    }
    return shuffle(random, rounds)
}
