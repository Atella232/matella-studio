import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Zein grafiko da? (¿Qué gráfica es?): a formula and three small
   graphs; the learner picks the one that belongs to it. Level 1,
   polynomials (a cubic, a quartic, a parabola) against the graph turned
   upside down and one of another degree. Level 2, rational functions
   b + k/(x − a) against the asymptotes swapped and the branches flipped.
   Level 3, exponentials and logarithms against their mirror images.
   ========================================================================== */

export const WHICH_ROUNDS = 6

export interface Curve {
    fn: (x: number) => number
    key: string
    /** A vertical asymptote, where the drawing breaks */
    breakAt?: number
}

export interface WhichRound {
    latex: string
    options: Curve[]
    answer: number
    /** What gives it away, in LaTeX */
    working: string
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

function round(random: Random, latex: string, right: Curve, wrong: Curve[], working: string): WhichRound {
    const options = shuffle(random, [right, ...wrong])
    return { latex, options, answer: options.indexOf(right), working }
}

/** Level 1: polynomials */
function polynomialRound(random: Random): WhichRound {
    const kind = randomInt(random, 0, 2)
    if (kind === 0) {
        const k = randomInt(random, 1, 4)
        return round(random, `f(x)=x^3-${k}x`, { fn: (x) => x ** 3 - k * x, key: 'right' }, [{ fn: (x) => -(x ** 3) + k * x, key: 'flip' }, { fn: (x) => x * x - k, key: 'degree' }], `x\\to+\\infty\\ \\to\\ +\\infty\\qquad f(-x)=-f(x)`)
    }
    if (kind === 1) {
        const k = randomInt(random, 1, 3)
        return round(random, `f(x)=x^4-${2 * k * k}x^2`, { fn: (x) => x ** 4 - 2 * k * k * x * x, key: 'right' }, [{ fn: (x) => -(x ** 4) + 2 * k * k * x * x, key: 'flip' }, { fn: (x) => x ** 3 - 3 * k * k * x, key: 'degree' }], `\\min(\\pm ${k},-${k ** 4})\\qquad \\max(0,0)`)
    }
    const a = randomInt(random, -2, 2)
    const b = randomInt(random, 1, 4)
    const latex = `f(x)=-(x${a === 0 ? '' : signed(-a)})^2+${b}`
    return round(random, latex, { fn: (x) => -((x - a) ** 2) + b, key: 'right' }, [{ fn: (x) => (x - a) ** 2 - b, key: 'flip' }, { fn: (x) => -((x - a - 3) ** 2) + b, key: 'shift' }], `\\max(${a},${b})`)
}

/** Level 2: b + k/(x − a) */
function rationalRound(random: Random): WhichRound {
    const a = randomInt(random, -2, 2)
    const b = pick(random, [-2, -1, 1, 2, 3])
    if (a === b) return rationalRound(random)
    const k = pick(random, [-2, -1, 1, 2])
    const model = (aa: number, bb: number, kk: number) => (x: number) => bb + kk / (x - aa)
    const latex = `f(x)=${b}${k < 0 ? '-' : '+'}\\frac{${Math.abs(k)}}{x${a === 0 ? '' : signed(-a)}}`
    return round(random, latex, { fn: model(a, b, k), key: 'right', breakAt: a }, [{ fn: model(b, a, k), key: 'swap', breakAt: b }, { fn: model(a, b, -k), key: 'flip', breakAt: a }], `x=${a}\\qquad y=${b}`)
}

/** Level 3: exponentials and logarithms */
function expLogRound(random: Random): WhichRound {
    const c = randomInt(random, -2, 2)
    const kind = randomInt(random, 0, 2)
    const tail = c === 0 ? '' : signed(c)
    if (kind === 0) return round(random, `f(x)=e^{x}${tail}`, { fn: (x) => Math.exp(x) + c, key: 'right' }, [{ fn: (x) => Math.exp(-x) + c, key: 'mirror' }, { fn: (x) => -Math.exp(x) + c, key: 'flip' }], `x\\to-\\infty\\ \\to\\ y=${c}`)
    if (kind === 1) return round(random, `f(x)=e^{-x}${tail}`, { fn: (x) => Math.exp(-x) + c, key: 'right' }, [{ fn: (x) => Math.exp(x) + c, key: 'mirror' }, { fn: (x) => -Math.exp(-x) + c, key: 'flip' }], `x\\to+\\infty\\ \\to\\ y=${c}`)
    const a = randomInt(random, -2, 2)
    const inside = `x${a === 0 ? '' : signed(-a)}`
    const log = (shift: number, sign: number) => (x: number) => (x - shift > 0 ? sign * Math.log(x - shift) : Number.NaN)
    return round(random, `f(x)=\\ln(${inside})`, { fn: log(a, 1), key: 'right', breakAt: a }, [{ fn: log(a, -1), key: 'flip', breakAt: a }, { fn: (x) => (a - x > 0 ? Math.log(a - x) : Number.NaN), key: 'mirror', breakAt: a }], `x>${a}\\qquad x=${a}`)
}

/** Six rounds of a level, no formula twice */
export function createWhichRounds(random: Random, levelIndex: number): WhichRound[] {
    const generator = [polynomialRound, rationalRound, expLogRound][levelIndex] ?? polynomialRound
    const rounds: WhichRound[] = []
    for (let tries = 0; rounds.length < WHICH_ROUNDS && tries < 2000; tries += 1) {
        const next = generator(random)
        if (!rounds.some((other) => other.latex === next.latex)) rounds.push(next)
    }
    if (rounds.length < WHICH_ROUNDS) throw new Error('No which-graph rounds')
    return rounds
}
