import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { complexLatex, mul, type Complex } from '../lab/complex.ts'

/* ==========================================================================
   J2 · Biratu eta luzatu (Gira y estira): z is a point on the plane and
   an operation is asked (z · i, −z, z̄, 2z, z · (1 + i), z / i, i³ · z…).
   Four points are marked A, B, C and D: the right one and three typical
   mistakes (turning the other way, the conjugate for the opposite,
   swapping the parts without the sign, stretching without turning). The
   learner picks the letter. Level 1: turns of 90° and 180°, opposite and
   conjugate; level 2: stretching and turning (2z, 2i · z, (1 ± i) · z,
   z / i); level 3: powers of i and conjugates of turns. Every point has
   whole coordinates between −6 and 6.
   ========================================================================== */

export const TWIST_ROUNDS = 6
export const TWIST_LIMIT = 6

export type TwistMistake = 'other-way' | 'swap' | 'opposite' | 'conjugate' | 'no-stretch' | 'no-turn' | 'added' | 'only-real'

export interface TwistOption {
    point: Complex
    /** null for the right one */
    mistake: TwistMistake | null
}

export interface TwistRound {
    z: Complex
    /** The operation for LaTeX, with z written {z} */
    operation: string
    answer: Complex
    /** The four points, in the order of the letters A, B, C, D */
    options: TwistOption[]
    working: string
    kind: string
}

const I: Complex = [0, 1]
const clean = ([a, b]: Complex): Complex => [a || 0, b || 0]
const neg = ([a, b]: Complex): Complex => clean([-a, -b])
const conj = ([a, b]: Complex): Complex => clean([a, -b])
const swap = ([a, b]: Complex): Complex => [b, a]
const scale = ([a, b]: Complex, k: number): Complex => clean([a * k, b * k])
const pow = (value: Complex, n: number): Complex => (n === 0 ? [1, 0] : mul(value, pow(value, n - 1)))
const bracket = (value: Complex) => (value[0] !== 0 && value[1] !== 0) || value[0] < 0 || value[1] < 0 ? `(${complexLatex(value)})` : complexLatex(value)
const inside = ([a, b]: Complex) => Math.abs(a) <= TWIST_LIMIT && Math.abs(b) <= TWIST_LIMIT

interface Made { operation: string; answer: Complex; wrong: Array<[Complex, TwistMistake]>; working: string; kind: string }

function make(random: Random, level: number, z: Complex): Made | null {
    const zl = complexLatex(z)
    const zb = bracket(z)
    if (level === 0) {
        const kind = pick(random, ['times-i', 'times-minus-i', 'opposite', 'conjugate'])
        if (kind === 'times-i') {
            const answer = mul(z, I)
            return { operation: '{z}\\cdot i', answer, wrong: [[mul(z, [0, -1]), 'other-way'], [swap(z), 'swap'], [neg(z), 'opposite']], working: `${zb}\\cdot i=${complexLatex(answer)}`, kind }
        }
        if (kind === 'times-minus-i') {
            const answer = mul(z, [0, -1])
            return { operation: '{z}\\cdot(-i)', answer, wrong: [[mul(z, I), 'other-way'], [swap(z), 'swap'], [conj(z), 'conjugate']], working: `${zb}\\cdot(-i)=${complexLatex(answer)}`, kind }
        }
        if (kind === 'opposite') {
            const answer = neg(z)
            return { operation: '-{z}', answer, wrong: [[conj(z), 'conjugate'], [neg(conj(z)), 'conjugate'], [mul(z, I), 'other-way']], working: `-${zb}=${complexLatex(answer)}`, kind }
        }
        const answer = conj(z)
        return { operation: '\\overline{z}', answer, wrong: [[neg(z), 'opposite'], [neg(conj(z)), 'opposite'], [swap(z), 'swap']], working: `\\overline{${zl}}=${complexLatex(answer)}`, kind }
    }
    if (level === 1) {
        const kind = pick(random, ['double', 'two-i', 'one-plus-i', 'one-minus-i', 'divide-i'])
        if (kind === 'double') {
            const answer = scale(z, 2)
            return { operation: '2{z}', answer, wrong: [[[2 * z[0], z[1]], 'only-real'], [[z[0] + 2, z[1]], 'added'], [mul(z, [0, 2]), 'no-stretch']], working: `2${zb}=${complexLatex(answer)}`, kind }
        }
        if (kind === 'two-i') {
            const answer = mul(z, [0, 2])
            return { operation: '{z}\\cdot 2i', answer, wrong: [[mul(z, I), 'no-stretch'], [scale(z, 2), 'no-turn'], [mul(z, [0, -2]), 'other-way']], working: `${zb}\\cdot 2i=${complexLatex(answer)}`, kind }
        }
        if (kind === 'one-plus-i' || kind === 'one-minus-i') {
            const w: Complex = kind === 'one-plus-i' ? [1, 1] : [1, -1]
            const answer = mul(z, w)
            return { operation: `{z}\\cdot(${complexLatex(w)})`, answer, wrong: [[[z[0] + 1, z[1] + w[1]], 'added'], [mul(z, conj(w)), 'other-way'], [mul(z, [0, w[1]]), 'no-stretch']], working: `${zb}(${complexLatex(w)})=${complexLatex(answer)}`, kind }
        }
        const answer = mul(z, [0, -1])
        return { operation: '\\frac{z}{i}', answer, wrong: [[mul(z, I), 'other-way'], [conj(z), 'conjugate'], [swap(z), 'swap']], working: `\\frac{${zl}}{i}=\\frac{${zb}\\cdot(-i)}{1}=${complexLatex(answer)}`, kind }
    }
    const kind = pick(random, ['power', 'conjugate-turn', 'turn-conjugate'])
    if (kind === 'power') {
        const n = randomInt(random, 2, 7)
        const answer = mul(pow(I, n), z)
        const reduced = pow(I, n % 4)
        return { operation: `i^{${n}}\\cdot{z}`, answer, wrong: [...[1, 2, 3].filter((k) => k !== n % 4).map((k): [Complex, TwistMistake] => [mul(pow(I, k), z), 'other-way']), [conj(answer), 'conjugate']], working: `i^{${n}}=${complexLatex(reduced)}\\qquad ${bracket(reduced)}\\cdot ${zb}=${complexLatex(answer)}`, kind }
    }
    if (kind === 'conjugate-turn') {
        const answer = mul(conj(z), I)
        return { operation: '\\overline{z}\\cdot i', answer, wrong: [[mul(z, I), 'conjugate'], [mul(conj(z), [0, -1]), 'other-way'], [neg(conj(z)), 'opposite']], working: `\\overline{z}=${complexLatex(conj(z))}\\qquad ${bracket(conj(z))}\\cdot i=${complexLatex(answer)}`, kind }
    }
    const answer = conj(mul(z, I))
    return { operation: '\\overline{{z}\\cdot i}', answer, wrong: [[mul(conj(z), I), 'conjugate'], [mul(z, I), 'conjugate'], [mul(z, [0, -1]), 'other-way']], working: `${zb}\\cdot i=${complexLatex(mul(z, I))}\\qquad\\overline{${complexLatex(mul(z, I))}}=${complexLatex(answer)}`, kind }
}

/** Six rounds of one level: four different points inside the grid each time */
export function createTwistRounds(random: Random, levelIndex: number): TwistRound[] {
    const rounds: TwistRound[] = []
    for (let attempt = 0; rounds.length < TWIST_ROUNDS && attempt < 5000; attempt += 1) {
        const z: Complex = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
        if (z[0] === 0 || z[1] === 0 || Math.abs(z[0]) === Math.abs(z[1])) continue
        const made = make(random, levelIndex, z)
        if (!made) continue
        const points: TwistOption[] = [{ point: clean(made.answer), mistake: null }, ...made.wrong.map(([point, mistake]) => ({ point: clean(point), mistake }))]
        const keys = new Set(points.map((option) => option.point.join(',')))
        if (keys.size !== 4 || !points.every((option) => inside(option.point)) || keys.has(z.join(','))) continue
        if (rounds.some((other) => other.operation === made.operation && other.z.join(',') === z.join(','))) continue
        if (rounds.filter((other) => other.kind === made.kind).length >= 2) continue
        rounds.push({ z, operation: made.operation, answer: clean(made.answer), options: shuffle(random, points), working: made.working, kind: made.kind })
    }
    return rounds
}

export const twistRight = (round: TwistRound) => round.options.findIndex((option) => option.mistake === null)
