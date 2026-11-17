import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Lotu f eta f′ (Une f con f′): the formula of a function and three
   small graphs; the learner picks the graph of its derivative. The wrong
   graphs are the typical confusions: the graph of f itself, and the
   derivative with the wrong sign (or the inside forgotten, for the
   compositions of level 3). Level 1: parabolas (f′ is a line). Level 2:
   cubics (f′ is a parabola). Level 3: exponentials and logarithms.
   ========================================================================== */

export const MATCH_ROUNDS = 6

export interface Curve {
    fn: (x: number) => number
    /** A short name for the tests and the explanation */
    latex: string
}

export interface MatchRound {
    latex: string
    /** The derivative in LaTeX, for the explanation */
    derivative: string
    options: Curve[]
    /** Index of the right graph in options */
    answer: number
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const coefficient = (value: number) => (value === 1 ? '' : value === -1 ? '-' : String(value))

function make(random: Random, latex: string, derivative: Curve, f: Curve, wrong: Curve): MatchRound {
    const options = shuffle(random, [derivative, f, wrong])
    return { latex, derivative: derivative.latex, options, answer: options.indexOf(derivative) }
}

/** f = a x² + b x: f′ = 2a x + b */
function parabolaRound(random: Random): MatchRound | null {
    const a = pick(random, [-2, -1, 1, 2])
    const b = randomInt(random, -4, 4)
    const latex = `${coefficient(a)}x^2${b === 0 ? '' : `${signed(b)}x`}`
    return make(
        random,
        `f(x)=${latex}`,
        { fn: (x) => 2 * a * x + b, latex: `${2 * a}x${b === 0 ? '' : signed(b)}` },
        { fn: (x) => a * x * x + b * x, latex },
        { fn: (x) => -(2 * a * x + b), latex: `${-2 * a}x${b === 0 ? '' : signed(-b)}` }
    )
}

/** f = x³ − k x: f′ = 3x² − k */
function cubicRound(random: Random): MatchRound | null {
    const sign = pick(random, [1, -1])
    const k = randomInt(random, 0, 6)
    const latex = `${sign === 1 ? '' : '-'}x^3${k === 0 ? '' : signed(-sign * k)}x`
    return make(
        random,
        `f(x)=${latex}`,
        { fn: (x) => sign * (3 * x * x - k), latex: `${3 * sign}x^2${k === 0 ? '' : signed(-sign * k)}` },
        { fn: (x) => sign * (x ** 3 - k * x), latex },
        { fn: (x) => -sign * (3 * x * x - k), latex: `${-3 * sign}x^2${k === 0 ? '' : signed(sign * k)}` }
    )
}

/** f = e^{kx} or ln(x² + c): the inside forgotten or the sign changed */
function expLogRound(random: Random): MatchRound | null {
    if (randomInt(random, 0, 1) === 0) {
        const k = pick(random, [-2, 2, -0.5, 0.5])
        const kTex = String(k).replace('.', '{,}')
        const power = `e^{${k === -1 ? '-' : kTex}x}`
        const times = (value: number) => (value === 1 ? '' : value === -1 ? '-' : String(value).replace('.', '{,}'))
        return make(
            random,
            `f(x)=${power}`,
            { fn: (x) => k * Math.exp(k * x), latex: `${times(k)}${power}` },
            { fn: (x) => Math.exp(k * x), latex: power },
            { fn: (x) => -k * Math.exp(k * x), latex: `${times(-k)}${power}` }
        )
    }
    const c = randomInt(random, 1, 4)
    return make(
        random,
        `f(x)=\\ln(x^2+${c})`,
        { fn: (x) => (2 * x) / (x * x + c), latex: `\\frac{2x}{x^2+${c}}` },
        { fn: (x) => Math.log(x * x + c), latex: `\\ln(x^2+${c})` },
        { fn: (x) => 1 / (x * x + c), latex: `\\frac{1}{x^2+${c}}` }
    )
}

/** Six rounds of a level, no function twice */
export function createMatchRounds(random: Random, levelIndex: number): MatchRound[] {
    const generator = [parabolaRound, cubicRound, expLogRound][levelIndex] ?? parabolaRound
    const rounds: MatchRound[] = []
    for (let tries = 0; rounds.length < MATCH_ROUNDS && tries < 2000; tries += 1) {
        const round = generator(random)
        if (round && !rounds.some((other) => other.latex === round.latex)) rounds.push(round)
    }
    if (rounds.length < MATCH_ROUNDS) throw new Error('No match rounds')
    return rounds
}
