import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Balio zehatza (Valor exacto): a ratio of an angle that is not
   notable (75°, 105°, 15°…) and four exact values, the same root with the
   four signs and the two forms; the learner picks the right one. The
   explanation takes the angle to the first quadrant (the sign of its
   quadrant) and writes it as a sum, a difference or a half of notable
   angles. Level 1: the sine and the cosine of 15°, 75° and 105°; level 2:
   any angle that ends in 15° or 75°, the tangent too; level 3: half
   angles (22.5°, 67.5° and the like) with nested roots. Every option has
   a value, so the tests check that only one is right. Formulas write
   \sen and \tg.
   ========================================================================== */

export const EXACT_ROUNDS = 6

export type ExactRatio = 'sin' | 'cos' | 'tan'

export interface ExactRound {
    ratio: ExactRatio
    angle: number
    /** The angle of the first quadrant with the same ratio up to the sign */
    reference: number
    options: Array<{ latex: string; value: number }>
    right: number
}

const D = Math.PI / 180
const s6 = Math.sqrt(6)
const s2 = Math.SQRT2
const s3 = Math.sqrt(3)
export const ratioValue = (ratio: ExactRatio, angle: number) => (ratio === 'sin' ? Math.sin(angle * D) : ratio === 'cos' ? Math.cos(angle * D) : Math.tan(angle * D))

/** The two magnitudes of each family and their LaTeX */
const FAMILIES = {
    quarter: [{ latex: '\\frac{\\sqrt{6}+\\sqrt{2}}{4}', value: (s6 + s2) / 4 }, { latex: '\\frac{\\sqrt{6}-\\sqrt{2}}{4}', value: (s6 - s2) / 4 }],
    tangent: [{ latex: '2+\\sqrt{3}', value: 2 + s3 }, { latex: '2-\\sqrt{3}', value: 2 - s3 }],
    half: [{ latex: '\\frac{\\sqrt{2+\\sqrt{2}}}{2}', value: Math.sqrt(2 + s2) / 2 }, { latex: '\\frac{\\sqrt{2-\\sqrt{2}}}{2}', value: Math.sqrt(2 - s2) / 2 }]
}

/** The four options: both magnitudes, each with both signs */
function optionsFor(family: keyof typeof FAMILIES) {
    return FAMILIES[family].flatMap((item) => [item, { latex: family === 'tangent' ? `-(${item.latex})` : `-${item.latex}`, value: -item.value }])
}

/** The angle of the first quadrant (0°–90°) with the same ratio up to the sign: 180° − r, 180° + r or 360° − r */
export function referenceAngle(angle: number): number {
    const inHalf = angle % 180
    return inHalf > 90 ? 180 - inHalf : inHalf
}

const LEVEL_ANGLES = [
    [15, 75, 105],
    [15, 75, 105, 165, 195, 255, 285, 345],
    [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]
]

function makeRound(random: Random, level: number): ExactRound {
    const angle = pick(random, LEVEL_ANGLES[level])
    const ratio = level === 1 ? pick(random, ['sin', 'cos', 'tan'] as const) : pick(random, ['sin', 'cos'] as const)
    const family = level === 2 ? 'half' : ratio === 'tan' ? 'tangent' : 'quarter'
    const options = shuffle(random, optionsFor(family))
    const truth = ratioValue(ratio, angle)
    return { ratio, angle, reference: referenceAngle(angle), options, right: options.findIndex((option) => Math.abs(option.value - truth) < 1e-9) }
}

/** Six different rounds of one level */
export function createExactRounds(random: Random, levelIndex: number): ExactRound[] {
    const rounds: ExactRound[] = []
    for (let attempt = 0; rounds.length < EXACT_ROUNDS && attempt < 2000; attempt += 1) {
        const made = makeRound(random, levelIndex)
        if (!rounds.some((other) => other.angle === made.angle && other.ratio === made.ratio)) rounds.push(made)
    }
    return rounds
}

const NAME: Record<ExactRatio, string> = { sin: '\\sen', cos: '\\cos', tan: '\\tg' }
/** An angle for LaTeX: 22{,}5° */
const deg = (value: number) => `${String(value).replace('.', '{,}')}°`

/** How the reference angle is made from notable ones: 45° + 30°, 45° − 30°, 45° / 2 */
const MADE: Record<string, string> = {
    15: '15°=45°-30°',
    75: '75°=45°+30°',
    22.5: '22{,}5°=\\frac{45°}{2}',
    67.5: '67{,}5°=\\frac{135°}{2}'
}

/** The working shown after the answer: the reduction to the first quadrant, the notable angles, the value */
export function exactWorking(round: ExactRound): string[] {
    const name = NAME[round.ratio]
    const lines: string[] = []
    const right = round.options[round.right]
    if (round.angle !== round.reference) {
        const sign = Math.sign(ratioValue(round.ratio, round.angle)) === Math.sign(ratioValue(round.ratio, round.reference)) ? '' : '-'
        lines.push(`${name} ${deg(round.angle)}=${sign}${name} ${deg(round.reference)}`)
    }
    lines.push(MADE[round.reference])
    lines.push(`${name} ${deg(round.angle)}=${right.latex}`)
    return lines
}
