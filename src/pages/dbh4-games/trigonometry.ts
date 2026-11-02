import { pick, shuffle, type Random } from '../../features/unit-v2/games/random.ts'

/* ==========================================================================
   The trigonometry games of 4. DBH academic. Formulas write \sen and \tg;
   `localize` of the unit turns them into sen/sin and tg/tan.
   · The unit circle: a ratio of α and the sign of another; turn the radius
     to α (steps of 15°). Then the projections cos α and sen α are drawn.
     Level 1: 0°–90°; level 2: the four quadrants; level 3: radians and tg.
   · The other ratios: one ratio of α (from a Pythagorean triple) and its
     quadrant; choose the other two. Then the triangle is drawn in the
     unit circle. Level 1: first quadrant; level 2: the quadrant is given;
     level 3: it follows from the signs.
   ========================================================================== */

export type Ratio = 'sen' | 'cos' | 'tg'

export function ratioValue(ratio: Ratio, angle: number): number | null {
    const radians = (angle * Math.PI) / 180
    const [sen, cos] = [Math.sin(radians), Math.cos(radians)]
    const clean = (value: number) => (Math.abs(value) < 1e-12 ? 0 : value)
    if (ratio === 'sen') return clean(sen)
    if (ratio === 'cos') return clean(cos)
    return Math.abs(cos) < 1e-12 ? null : clean(sen / cos)
}

/** An exact value as LaTeX: 0, ±1, ±\frac{1}{2}, ±\frac{\sqrt{2}}{2}, ±\frac{\sqrt{3}}{2}, ±\frac{\sqrt{3}}{3}, ±\sqrt{3} */
export function valueLatex(value: number): string {
    const sign = value < 0 ? '-' : ''
    const size = Math.abs(value)
    const forms: Array<[number, string]> = [[0, '0'], [1, '1'], [0.5, '\\frac{1}{2}'], [Math.SQRT1_2, '\\frac{\\sqrt{2}}{2}'], [Math.sqrt(3) / 2, '\\frac{\\sqrt{3}}{2}'], [Math.sqrt(3) / 3, '\\frac{\\sqrt{3}}{3}'], [Math.sqrt(3), '\\sqrt{3}']]
    const form = forms.find(([candidate]) => Math.abs(candidate - size) < 1e-9)
    if (!form) throw new Error(`not a notable value: ${value}`)
    return form[1] === '0' ? '0' : `${sign}${form[1]}`
}

export const ratioName = (ratio: Ratio) => (ratio === 'sen' ? '\\sen' : ratio === 'cos' ? '\\cos' : '\\tg')

/** An angle in radians as LaTeX, from degrees: 150 → \frac{5\pi}{6} */
export function radiansLatex(degrees: number): string {
    if (degrees === 0) return '0'
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    const divisor = gcd(degrees, 180)
    const [numerator, denominator] = [degrees / divisor, 180 / divisor]
    const top = numerator === 1 ? '\\pi' : `${numerator}\\pi`
    return denominator === 1 ? top : `\\frac{${top}}{${denominator}}`
}

/* ---------- The unit circle ---------- */

export const CIRCLE_ROUNDS = 5
export const CIRCLE_STEP = 15

export interface CircleRound {
    angle: number
    given: Ratio
    /** The sign of another ratio, so that only one angle fits */
    condition: { ratio: Ratio; sign: 1 | -1 } | null
    /** Level 1 keeps α between 0° and 90° */
    firstQuadrant: boolean
    radians: boolean
}

/** Every angle of the stepper that fits the round */
export function fittingAngles(round: Omit<CircleRound, 'angle'> & { angle?: number }, value: number): number[] {
    const angles: number[] = []
    for (let angle = 0; angle < 360; angle += CIRCLE_STEP) {
        if (round.firstQuadrant && angle > 90) continue
        const own = ratioValue(round.given, angle)
        if (own === null || Math.abs(own - value) > 1e-9) continue
        if (round.condition) {
            const other = ratioValue(round.condition.ratio, angle)
            if (other === null || Math.sign(other) !== round.condition.sign) continue
        }
        angles.push(angle)
    }
    return angles
}

const ALL_NOTABLE = [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330]

export function createCircleRound(random: Random, levelIndex: number): CircleRound {
    for (;;) {
        const angle = pick(random, levelIndex === 0 ? [30, 45, 60, 90] : ALL_NOTABLE)
        const given: Ratio = levelIndex === 2 ? pick(random, ['sen', 'cos', 'tg', 'tg'] as const) : pick(random, ['sen', 'cos'] as const)
        const value = ratioValue(given, angle)
        if (value === null) continue
        const base = { given, condition: null, firstQuadrant: levelIndex === 0, radians: levelIndex === 2 }
        if (fittingAngles(base, value).length === 1) return { angle, ...base }
        const others: Ratio[] = (['sen', 'cos'] as const).filter((ratio) => ratio !== given)
        const conditionRatio = pick(random, others)
        const other = ratioValue(conditionRatio, angle)
        if (other === null || other === 0) continue
        const round = { ...base, condition: { ratio: conditionRatio, sign: Math.sign(other) as 1 | -1 } }
        if (fittingAngles(round, value).length === 1) return { angle, ...round }
    }
}

export function createCircleRounds(random: Random, levelIndex: number): CircleRound[] {
    const rounds: CircleRound[] = []
    while (rounds.length < CIRCLE_ROUNDS) {
        const round = createCircleRound(random, levelIndex)
        if (rounds.some((other) => other.angle === round.angle && other.given === round.given)) continue
        rounds.push(round)
    }
    return rounds
}

/** The question: \sen\alpha=\frac{1}{2},\ \cos\alpha<0 */
export function circleQuestionLatex(round: CircleRound): string {
    const given = `${ratioName(round.given)}\\alpha=${valueLatex(ratioValue(round.given, round.angle)!)}`
    const condition = round.condition ? `,\\ \\ ${ratioName(round.condition.ratio)}\\alpha${round.condition.sign > 0 ? '>' : '<'}0` : ''
    return `${given}${condition}`
}

/* ---------- The other ratios ---------- */

export const RATIOS_ROUNDS = 5
export const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [7, 24, 25], [24, 7, 25]]

export interface RatiosRound {
    /** |sen α| = p / r, |cos α| = q / r */
    triple: [number, number, number]
    quadrant: 1 | 2 | 3 | 4
    given: Ratio
    /** Level 3 gives signs instead of the quadrant */
    signs: Array<{ ratio: Ratio; sign: 1 | -1 }> | null
    /** The two ratios to choose, each with four options (as [numerator, denominator] with sign) */
    asked: Array<{ ratio: Ratio; options: Array<[number, number]>; right: number }>
}

export const QUADRANT_SIGNS: Record<1 | 2 | 3 | 4, Record<Ratio, 1 | -1>> = {
    1: { sen: 1, cos: 1, tg: 1 },
    2: { sen: 1, cos: -1, tg: -1 },
    3: { sen: -1, cos: -1, tg: 1 },
    4: { sen: -1, cos: 1, tg: -1 }
}

/** The ratio as a signed fraction [numerator, denominator] */
export function ratioFraction(ratio: Ratio, [p, q, r]: [number, number, number], quadrant: 1 | 2 | 3 | 4): [number, number] {
    const sign = QUADRANT_SIGNS[quadrant][ratio]
    if (ratio === 'sen') return [sign * p, r]
    if (ratio === 'cos') return [sign * q, r]
    return [sign * p, q]
}

export const fractionLatex = ([numerator, denominator]: [number, number]) => `${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator)}}{${denominator}}`

export function createRatiosRound(random: Random, levelIndex: number): RatiosRound {
    const triple = pick(random, TRIPLES)
    const quadrant = levelIndex === 0 ? 1 : pick(random, levelIndex === 1 ? [2, 3, 4] as const : [1, 2, 3, 4] as const)
    const given: Ratio = levelIndex === 2 ? pick(random, ['sen', 'cos', 'tg'] as const) : pick(random, ['sen', 'cos'] as const)
    const [p, q, r] = triple
    // Level 3: the sign of a ratio that is not given and, with the given one, fixes the quadrant
    let signs: RatiosRound['signs'] = null
    if (levelIndex === 2) {
        const other = pick(random, (['sen', 'cos', 'tg'] as const).filter((ratio) => ratio !== given))
        signs = [{ ratio: other, sign: QUADRANT_SIGNS[quadrant][other] }]
    }
    const asked = (['sen', 'cos', 'tg'] as const).filter((ratio) => ratio !== given).map((ratio) => {
        const right = ratioFraction(ratio, triple, quadrant)
        // The sign changed, the fraction upside down (or the other leg), and both
        const swapped: [number, number] = ratio === 'tg' ? [q, p] : [ratio === 'sen' ? q : p, r]
        const candidates: Array<[number, number]> = [right, [-right[0], right[1]], [Math.sign(right[0]) * swapped[0], swapped[1]], [-Math.sign(right[0]) * swapped[0], swapped[1]]]
        const options = shuffle(random, candidates)
        return { ratio, options, right: options.findIndex(([a, b]) => a === right[0] && b === right[1]) }
    })
    return { triple, quadrant, given, signs, asked }
}

export function createRatiosRounds(random: Random, levelIndex: number): RatiosRound[] {
    const rounds: RatiosRound[] = []
    while (rounds.length < RATIOS_ROUNDS) {
        const round = createRatiosRound(random, levelIndex)
        if (rounds.some((other) => other.triple === round.triple && other.quadrant === round.quadrant)) continue
        rounds.push(round)
    }
    return rounds
}

/** The given ratio and where α is: \sen\alpha=\frac{3}{5} (quadrant in words outside the formula) */
export const givenLatex = (round: RatiosRound) => `${ratioName(round.given)}\\alpha=${fractionLatex(ratioFraction(round.given, round.triple, round.quadrant))}`
export const signsLatex = (round: RatiosRound) => (round.signs ?? []).map(({ ratio, sign }) => `${ratioName(ratio)}\\alpha${sign > 0 ? '>' : '<'}0`).join(',\\ ')

/** The quadrants where a ratio has a sign */
export const quadrantsWith = (ratio: Ratio, sign: 1 | -1) => ([1, 2, 3, 4] as const).filter((quadrant) => QUADRANT_SIGNS[quadrant][ratio] === sign)
