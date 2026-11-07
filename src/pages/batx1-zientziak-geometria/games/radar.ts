import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { explicitLatex, generalLatex, type Line, type Point } from './lines.ts'

/* ==========================================================================
   J2 · Radarra (El radar): a radar at P watches a ship that sails along a
   straight route. The learner picks how close the ship gets, the distance
   from P to the route, among four values: the right one and the typical
   mistakes (no square root, dividing by A + B, forgetting C, no absolute
   value, the sign of y when the route comes as y = mx + n). The drawing
   then shows the perpendicular and whether the ship enters the radar's
   range. Level 1: the route in general form with whole distances; level
   2: the route as y = mx + n; level 3: two parallel routes, one of them
   with its coefficients doubled.
   ========================================================================== */

export const RADAR_ROUNDS = 6

export type RadarKind = 'general' | 'explicit' | 'parallel'
export type RadarError = 'no-root' | 'coefficient-sum' | 'forgot-c' | 'no-absolute' | 'y-sign' | 'not-equalised'

export interface RadarRound {
    kind: RadarKind
    route: Line
    /** The second route of level 3, with its coefficients doubled */
    second: Line | null
    radar: Point
    range: number
    /** The route as the learner reads it */
    routeLatex: string
    secondLatex: string | null
    value: FractionValue
    answer: string
    options: Array<{ latex: string; error: RadarError | null }>
    working: string
}

export const radarLevels: RadarKind[] = ['general', 'explicit', 'parallel']

/** Normal vectors with a whole length */
const NORMALS: Array<[number, number, number]> = [[3, 4, 5], [4, 3, 5], [3, -4, 5], [4, -3, 5], [5, 12, 13], [12, 5, 13], [5, -12, 13], [12, -5, 13]]
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value))

/** The right value and three different mistakes, shuffled; null when two of them read the same */
function choices(random: Random, right: FractionValue, wrong: Array<{ value: FractionValue; error: RadarError }>) {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const options: Array<{ latex: string; error: RadarError | null }> = [{ latex: rightLatex, error: null }]
    for (const item of shuffle(random, wrong)) {
        if (options.length === 4) break
        const latex = written(item.value)
        if (latex === null || used.has(latex) || latex === '0') continue
        used.add(latex)
        options.push({ latex, error: item.error })
    }
    return options.length === 4 ? shuffle(random, options) : null
}

/** |Ax₀ + By₀ + C| / √(A² + B²) written out for P */
function distanceWorking({ A, B, C }: Line, [x, y]: Point, length: number, value: number) {
    const constant = C === 0 ? '' : C < 0 ? `${C}` : `+${C}`
    return `\\frac{|${A}\\cdot ${wrap(x)}${B < 0 ? '' : '+'}${B}\\cdot ${wrap(y)}${constant}|}{\\sqrt{${A * A}+${B * B}}}=\\frac{${Math.abs(value)}}{${length}}`
}

function make(random: Random, kind: RadarKind): RadarRound | null {
    const [A, B, length] = pick(random, NORMALS)
    const radar: Point = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
    if (kind === 'parallel') {
        const c1 = randomInt(random, -12, 12)
        const c2 = randomInt(random, -24, 24)
        const gap = 2 * c1 - c2
        if (gap === 0 || c2 === 2 * c1 || Math.abs(gap) > 4 * length) return null
        const route = { A, B, C: c1 }
        const second = { A: 2 * A, B: 2 * B, C: c2 }
        const value = fraction(Math.abs(gap), 2 * length)
        const options = choices(random, value, [
            { value: fraction(Math.abs(c1 - c2), length), error: 'not-equalised' },
            { value: fraction(Math.abs(gap), 2 * length * length), error: 'no-root' },
            { value: fraction(Math.abs(gap), 2 * (Math.abs(A) + Math.abs(B))), error: 'coefficient-sum' },
            { value: fraction(Math.abs(c1 + c2), length), error: 'not-equalised' }
        ])
        if (!options) return null
        const halfValue = written(fraction(c2, 2))!
        const halfC = c2 === 0 ? '' : c2 < 0 ? halfValue : `+${halfValue}`
        const working = `${generalLatex(second)}\\ \\to\\ ${generalLatex({ A, B, C: 0 }).replace('=0', '')}${halfC}=0\\qquad d=\\frac{|${c1}-${c2 < 0 ? `(${halfValue})` : halfValue}|}{${length}}=${written(value)}`
        return { kind, route, second, radar, range: 0, routeLatex: generalLatex(route), secondLatex: generalLatex(second), value, answer: written(value)!, options, working }
    }
    const distance = kind === 'general' ? randomInt(random, 1, 4) : 0
    const signed = kind === 'general' ? pick(random, [1, -1]) * distance * length : pick(random, [-1, 1]) * randomInt(random, 2, 3 * length)
    if (kind === 'explicit' && signed % length === 0) return null
    const C = signed - (A * radar[0] + B * radar[1])
    if (C === 0 || Math.abs(C) > 40) return null
    // A and B have no common factor and A > 0: the route is written as chosen
    const shown: Line = { A, B, C }
    const value = fraction(Math.abs(signed), length)
    const plain = A * radar[0] + B * radar[1]
    const wrong: Array<{ value: FractionValue; error: RadarError }> = [
        { value: fraction(Math.abs(signed), length * length), error: 'no-root' },
        { value: fraction(Math.abs(signed), Math.abs(A) + Math.abs(B)), error: 'coefficient-sum' },
        { value: fraction(Math.abs(plain), length), error: 'forgot-c' }
    ]
    if (signed < 0) wrong.push({ value: fraction(signed, length), error: 'no-absolute' })
    if (kind === 'explicit') wrong.push({ value: fraction(Math.abs(A * radar[0] - B * radar[1] + C), length), error: 'y-sign' })
    const options = choices(random, value, wrong)
    if (!options) return null
    const range = Math.max(2, Math.round(value.numerator / value.denominator) + pick(random, [-1, 1]))
    const routeLatex = kind === 'general' ? generalLatex(shown) : explicitLatex(shown)
    const working = `${kind === 'explicit' ? `${generalLatex(shown)}\\qquad ` : ''}d=${distanceWorking(shown, radar, length, signed)}=${written(value)}`
    return { kind, route: shown, second: null, radar, range, routeLatex, secondLatex: null, value, answer: written(value)!, options, working }
}

/** Six rounds of one level, no route twice */
export function createRadarRounds(random: Random, level: number): RadarRound[] {
    const kind = radarLevels[level] ?? 'general'
    const rounds: RadarRound[] = []
    for (let attempt = 0; rounds.length < RADAR_ROUNDS && attempt < 3000; attempt += 1) {
        const round = make(random, kind)
        if (round && !rounds.some((other) => other.routeLatex === round.routeLatex && other.radar.join() === round.radar.join())) rounds.push(round)
    }
    return rounds
}

/** The ship enters the radar's range when the route passes closer than the range */
export const detected = (round: RadarRound) => round.value.numerator / round.value.denominator <= round.range
