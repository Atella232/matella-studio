import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { complexLatex, mul, polarPoint, type Complex } from '../lab/complex.ts'

/* ==========================================================================
   J1 · Non dago afixua? (¿Dónde cae el afijo?): a complex number written
   in some way and a grid of whole points from −5 to 5; the learner taps
   the point where its affix falls. Level 1: the number, its opposite or
   its conjugate; level 2: the result of a sum, a product, a square or a
   division; level 3: the polar and the trigonometric form, and powers of
   i and of 1 + i. Every answer has whole coordinates inside the grid.
   `working` is the line shown after the answer.
   ========================================================================== */

export const AFFIX_ROUNDS = 6
export const AFFIX_LIMIT = 5

export interface AffixRound {
    /** What is asked, for LaTeX (\sen in each language's name) */
    expression: string
    answer: Complex
    /** The working shown after the answer */
    working: string
    kind: string
}

const inside = ([a, b]: Complex) => Math.abs(a) <= AFFIX_LIMIT && Math.abs(b) <= AFFIX_LIMIT && Number.isInteger(a) && Number.isInteger(b)
const small = (random: Random, limit = 4): Complex => [randomInt(random, -limit, limit), randomInt(random, -limit, limit)]
const nonZero = (value: Complex) => value[0] !== 0 || value[1] !== 0
/** A number for LaTeX in brackets when it has two terms or a sign */
const bracket = (value: Complex) => (value[0] !== 0 && value[1] !== 0) || value[0] < 0 || value[1] < 0 ? `(${complexLatex(value)})` : complexLatex(value)
const add = (a: Complex, b: Complex): Complex => [a[0] + b[0], a[1] + b[1]]
const neg = ([a, b]: Complex): Complex => [-a || 0, -b || 0]
const conj = ([a, b]: Complex): Complex => [a, -b || 0]
const pow = (value: Complex, n: number): Complex => (n === 0 ? [1, 0] : mul(value, pow(value, n - 1)))

function levelOne(random: Random): AffixRound | null {
    const z = small(random)
    if (!nonZero(z) || z[0] === 0 || z[1] === 0) return null
    const kind = pick(random, ['direct', 'opposite', 'conjugate', 'both'])
    const latex = complexLatex(z)
    if (kind === 'direct') return { expression: latex, answer: z, working: `${latex}\\ \\to\\ (${z[0]},\\ ${z[1]})`, kind }
    if (kind === 'opposite') return { expression: `-(${latex})`, answer: neg(z), working: `-(${latex})=${complexLatex(neg(z))}`, kind }
    if (kind === 'conjugate') return { expression: `\\overline{${latex}}`, answer: conj(z), working: `\\overline{${latex}}=${complexLatex(conj(z))}`, kind }
    return { expression: `-\\overline{${latex}}`, answer: neg(conj(z)), working: `-\\overline{${latex}}=${complexLatex(neg(conj(z)))}`, kind }
}

function levelTwo(random: Random): AffixRound | null {
    const kind = pick(random, ['sum', 'difference', 'times-i', 'product', 'square', 'division'])
    if (kind === 'sum' || kind === 'difference') {
        const [z, w] = [small(random, 3), small(random, 3)]
        if (!nonZero(z) || !nonZero(w)) return null
        const answer = kind === 'sum' ? add(z, w) : add(z, neg(w))
        return { expression: `${bracket(z)}${kind === 'sum' ? '+' : '-'}${bracket(w)}`, answer, working: `${bracket(z)}${kind === 'sum' ? '+' : '-'}${bracket(w)}=${complexLatex(answer)}`, kind }
    }
    if (kind === 'times-i') {
        const z = small(random)
        if (z[0] === 0 || z[1] === 0) return null
        const answer = mul(z, [0, 1])
        return { expression: `i\\cdot ${bracket(z)}`, answer, working: `${complexLatex([0, z[0]])}${z[1] < 0 ? '-' : '+'}${Math.abs(z[1]) === 1 ? '' : Math.abs(z[1])}i^2=${complexLatex(answer)}`, kind }
    }
    if (kind === 'product') {
        const z: Complex = pick(random, [[1, 1], [1, -1], [2, 1], [1, 2], [2, -1]])
        const w = small(random, 2)
        if (w[0] === 0 || w[1] === 0) return null
        const answer = mul(z, w)
        return { expression: `${bracket(z)}${bracket(w)}`, answer, working: `${bracket(z)}${bracket(w)}=${complexLatex(answer)}`, kind }
    }
    if (kind === 'square') {
        const z: Complex = pick(random, [[1, 1], [1, -1], [2, 1], [2, -1], [1, 2], [1, -2], [-1, 2], [-2, 1]])
        const answer = mul(z, z)
        return { expression: `${bracket(z)}^2`, answer, working: `${bracket(z)}^2=${complexLatex([z[0] * z[0], 0])}${2 * z[0] * z[1] < 0 ? '-' : '+'}${Math.abs(2 * z[0] * z[1])}i${z[1] * z[1] > 0 ? '-' : '+'}${z[1] * z[1]}=${complexLatex(answer)}`, kind }
    }
    // A division with a whole result: (answer · divisor) / divisor
    const answer = small(random, 3)
    const divisor: Complex = pick(random, [[1, 1], [1, -1], [2, 1], [1, 2], [0, 1], [1, 3], [3, -1]])
    if (!nonZero(answer)) return null
    const top = mul(answer, divisor)
    const norm = divisor[0] ** 2 + divisor[1] ** 2
    const numerator = mul(top, conj(divisor))
    return { expression: `\\frac{${complexLatex(top)}}{${complexLatex(divisor)}}`, answer, working: `\\frac{${bracket(top)}${bracket(conj(divisor))}}{${norm}}=\\frac{${complexLatex(numerator)}}{${norm}}=${complexLatex(answer)}`, kind }
}

/** Polar forms with whole coordinates: a modulus and a multiple of 90°, or k√2 and an odd multiple of 45° */
function levelThree(random: Random): AffixRound | null {
    const kind = pick(random, ['polar', 'diagonal', 'trigonometric', 'powers-of-i', 'one-plus-i'])
    if (kind === 'polar' || kind === 'trigonometric') {
        const r = randomInt(random, 1, 5)
        const angle = pick(random, [0, 90, 180, 270])
        const answer = polarPoint(r, angle)
        const expression = kind === 'polar' ? `${r}_{${angle}°}` : `${r}(\\cos ${angle}°+i\\sen ${angle}°)`
        return { expression, answer, working: `${r}\\cos ${angle}°+${r}i\\sen ${angle}°=${complexLatex(answer)}`, kind }
    }
    if (kind === 'diagonal') {
        const k = randomInt(random, 1, 4)
        const angle = pick(random, [45, 135, 225, 315])
        const answer = polarPoint(k * Math.SQRT2, angle).map(Math.round) as Complex
        const r = k === 1 ? '\\sqrt{2}' : `${k}\\sqrt{2}`
        return { expression: `${r}_{${angle}°}`, answer, working: `${r}_{${angle}°}=${complexLatex(answer)}`, kind }
    }
    if (kind === 'powers-of-i') {
        const z = small(random, 4)
        const n = randomInt(random, 2, 11)
        if (z[0] === 0 || z[1] === 0) return null
        const answer = mul(pow([0, 1], n), z)
        const reduced = complexLatex(pow([0, 1], n % 4))
        return { expression: `i^{${n}}\\cdot ${bracket(z)}`, answer, working: `i^{${n}}=${reduced}\\qquad ${reduced === '1' ? '' : `${bracket(pow([0, 1], n % 4))}\\cdot `}${bracket(z)}=${complexLatex(answer)}`, kind }
    }
    const n = randomInt(random, 2, 5)
    const answer = pow([1, 1], n)
    return { expression: `(1+i)^{${n}}`, answer, working: `(1+i)^{${n}}=(\\sqrt{2}_{45°})^{${n}}=${complexLatex(answer)}`, kind }
}

const makers = [levelOne, levelTwo, levelThree]

/** Six rounds of one level, with different numbers and every kind of the level when possible */
export function createAffixRounds(random: Random, levelIndex: number): AffixRound[] {
    const make = makers[levelIndex] ?? levelOne
    const rounds: AffixRound[] = []
    for (let attempt = 0; rounds.length < AFFIX_ROUNDS && attempt < 5000; attempt += 1) {
        const made = make(random)
        if (!made || !inside(made.answer) || rounds.some((other) => other.expression === made.expression)) continue
        // At most two rounds of each kind
        if (rounds.filter((other) => other.kind === made.kind).length >= 2) continue
        rounds.push(made)
    }
    return shuffle(random, rounds)
}

export const isAffixRight = (round: AffixRound, point: Complex) => round.answer[0] === point[0] && round.answer[1] === point[1]
