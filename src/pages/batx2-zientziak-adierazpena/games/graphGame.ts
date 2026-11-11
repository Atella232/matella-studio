import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Zein grafiko da? (¿Qué gráfica es?): a formula and three sketches;
   the learner picks the one that belongs to it. The three come from the
   same family and differ in one feature only — where an asymptote is,
   the sign, the side of the domain, a reflection — so the choice is made
   by the study, not by the general shape. Level 1: rational functions
   and polynomials; level 2: exponential, logarithmic and with roots;
   level 3: absolute values and trigonometric ones, mixed with the rest.
   After the answer, the key features of the right one.
   ========================================================================== */

export const GRAPH_ROUNDS = 8

export interface GraphView { xMin: number; xMax: number; yMin: number; yMax: number }

export interface GraphMember {
    latex: string
    fn: (x: number) => number
    /** The features that tell it apart, in LaTeX */
    note: string
}

export interface GraphRound {
    latex: string
    view: GraphView
    options: GraphMember[]
    correct: number
    note: string
}

interface Family {
    view: GraphView
    members: GraphMember[]
}

type FamilyMaker = (random: Random) => Family

const member = (latex: string, fn: (x: number) => number, note: string): GraphMember => ({ latex, fn, note })
const ln = (value: number) => (value > 0 ? Math.log(value) : NaN)
const root = (value: number) => (value >= 0 ? Math.sqrt(value) : NaN)

/* ---------- Level 1: rational functions and polynomials ---------- */

const hyperbola: FamilyMaker = (random) => {
    const p = randomInt(random, 1, 3)
    const q = randomInt(random, 1, 2)
    return {
        view: { xMin: -6, xMax: 6, yMin: -5, yMax: 5 },
        members: [
            member(`\\frac{1}{x-${p}}+${q}`, (x) => 1 / (x - p) + q, `x=${p}\\qquad y=${q}`),
            member(`-\\frac{1}{x-${p}}+${q}`, (x) => -1 / (x - p) + q, `x=${p}\\qquad y=${q}`),
            member(`\\frac{1}{x+${p}}+${q}`, (x) => 1 / (x + p) + q, `x=-${p}\\qquad y=${q}`),
            member(`\\frac{1}{x-${p}}-${q}`, (x) => 1 / (x - p) - q, `x=${p}\\qquad y=-${q}`)
        ]
    }
}

const cubic: FamilyMaker = (random) => {
    const [a, b] = shuffle(random, [1, 2, 3]).slice(0, 2)
    return {
        view: { xMin: -4.5, xMax: 4.5, yMin: -10, yMax: 10 },
        members: [
            member(`x(x-${a})(x+${b})`, (x) => x * (x - a) * (x + b), `x=-${b},\\ x=0,\\ x=${a}`),
            member(`-x(x-${a})(x+${b})`, (x) => -x * (x - a) * (x + b), `x=-${b},\\ x=0,\\ x=${a}`),
            member(`x(x+${a})(x-${b})`, (x) => x * (x + a) * (x - b), `x=-${a},\\ x=0,\\ x=${b}`)
        ]
    }
}

const evenRational: FamilyMaker = (random) => {
    const p = randomInt(random, 1, 2)
    const p2 = p * p
    return {
        view: { xMin: -5, xMax: 5, yMin: -4, yMax: 4 },
        members: [
            member(`\\frac{x^2}{x^2-${p2}}`, (x) => (x * x) / (x * x - p2), `x=\\pm ${p}\\qquad y=1`),
            member(`\\frac{x^2}{x^2+${p2}}`, (x) => (x * x) / (x * x + p2), 'y=1'),
            member(`-\\frac{x^2}{x^2-${p2}}`, (x) => -(x * x) / (x * x - p2), `x=\\pm ${p}\\qquad y=-1`),
            member(`\\frac{x}{x^2-${p2}}`, (x) => x / (x * x - p2), `x=\\pm ${p}\\qquad y=0`)
        ]
    }
}

/* ---------- Level 2: exponential, logarithmic and with roots ---------- */

const logarithm: FamilyMaker = (random) => {
    const p = randomInt(random, 1, 3)
    return {
        view: { xMin: -6, xMax: 6, yMin: -4, yMax: 4 },
        members: [
            member(`\\ln(x-${p})`, (x) => ln(x - p), `x>${p}\\qquad x=${p}`),
            member(`\\ln(x+${p})`, (x) => ln(x + p), `x>-${p}\\qquad x=-${p}`),
            member(`-\\ln(x-${p})`, (x) => -ln(x - p), `x>${p}\\qquad x=${p}`),
            member(`\\ln(${p}-x)`, (x) => ln(p - x), `x<${p}\\qquad x=${p}`)
        ]
    }
}

const squareRoot: FamilyMaker = (random) => {
    const p = randomInt(random, 1, 3)
    return {
        view: { xMin: -6, xMax: 6, yMin: -3, yMax: 3.5 },
        members: [
            member(`\\sqrt{x-${p}}`, (x) => root(x - p), `x\\ge ${p}`),
            member(`\\sqrt{x+${p}}`, (x) => root(x + p), `x\\ge -${p}`),
            member(`-\\sqrt{x-${p}}`, (x) => -root(x - p), `x\\ge ${p}`),
            member(`\\sqrt{${p}-x}`, (x) => root(p - x), `x\\le ${p}`)
        ]
    }
}

const exponentialProduct: FamilyMaker = () => ({
    view: { xMin: -3, xMax: 6, yMin: -1.5, yMax: 1.5 },
    members: [
        member('x\\,e^{-x}', (x) => x * Math.exp(-x), '\\max\\ \\left(1,\\,\\frac{1}{e}\\right)\\qquad y=0'),
        member('-x\\,e^{-x}', (x) => -x * Math.exp(-x), '\\min\\ \\left(1,\\,-\\frac{1}{e}\\right)\\qquad y=0'),
        member('x\\,e^{x}', (x) => x * Math.exp(x), '\\min\\ \\left(-1,\\,-\\frac{1}{e}\\right)\\qquad y=0'),
        member('(x-1)e^{-x}', (x) => (x - 1) * Math.exp(-x), '\\max\\ \\left(2,\\,\\frac{1}{e^2}\\right)\\qquad y=0')
    ]
})

const bell: FamilyMaker = (random) => {
    const k = randomInt(random, 1, 2)
    return {
        view: { xMin: -3.5, xMax: 3.5, yMin: -1.5, yMax: 1.5 },
        members: [
            member('e^{-x^2}', (x) => Math.exp(-x * x), '\\max\\ (0,\\,1)\\qquad y=0'),
            member('-e^{-x^2}', (x) => -Math.exp(-x * x), '\\min\\ (0,\\,-1)\\qquad y=0'),
            member(`e^{-(x-${k})^2}`, (x) => Math.exp(-((x - k) ** 2)), `\\max\\ (${k},\\,1)\\qquad y=0`),
            member('1-e^{-x^2}', (x) => 1 - Math.exp(-x * x), '\\min\\ (0,\\,0)\\qquad y=1')
        ]
    }
}

/* ---------- Level 3: absolute values and trigonometric functions ---------- */

const absolute: FamilyMaker = () => {
    const f = (x: number) => x * x - 2 * x - 3
    return {
        view: { xMin: -4.5, xMax: 4.5, yMin: -5, yMax: 6 },
        members: [
            member('|x^2-2x-3|', (x) => Math.abs(f(x)), 'x=-1,\\ x=3'),
            member('x^2-2|x|-3', (x) => f(Math.abs(x)), 'x=0\\qquad (\\pm 1,\\,-4)'),
            member('x^2-2x-3', f, '(1,\\,-4)'),
            member('-|x^2-2x-3|', (x) => -Math.abs(f(x)), 'x=-1,\\ x=3')
        ]
    }
}

const trigonometric: FamilyMaker = () => ({
    view: { xMin: -6.5, xMax: 6.5, yMin: -2.5, yMax: 2.5 },
    members: [
        member('2\\sin x', (x) => 2 * Math.sin(x), 'T=2\\pi\\qquad (0,\\,0)'),
        member('\\sin 2x', (x) => Math.sin(2 * x), 'T=\\pi\\qquad (0,\\,0)'),
        member('2\\cos x', (x) => 2 * Math.cos(x), 'T=2\\pi\\qquad (0,\\,2)'),
        member('1+\\sin x', (x) => 1 + Math.sin(x), 'T=2\\pi\\qquad (0,\\,1)')
    ]
})

const LEVELS: FamilyMaker[][] = [
    [hyperbola, cubic, evenRational],
    [logarithm, squareRoot, exponentialProduct, bell],
    [absolute, trigonometric, hyperbola, evenRational, logarithm, squareRoot, bell]
]

/** Every member of every family, for the tests */
export const graphFamiliesFor = (levelIndex: number, random: Random) => (LEVELS[levelIndex] ?? LEVELS[0]).map((make) => make(random))

/** Eight rounds of one level, each with its own formula */
export function createGraphRounds(random: Random, levelIndex: number): GraphRound[] {
    const makers = LEVELS[levelIndex] ?? LEVELS[0]
    const rounds: GraphRound[] = []
    for (let attempt = 0; attempt < 400 && rounds.length < GRAPH_ROUNDS; attempt += 1) {
        // Every family appears before one repeats
        const family = (rounds.length < makers.length ? makers[(rounds.length + attempt) % makers.length] : pick(random, makers))(random)
        const chosen = shuffle(random, family.members).slice(0, 3)
        const answer = chosen[randomInt(random, 0, 2)]
        if (rounds.some((round) => round.latex === answer.latex)) continue
        rounds.push({ latex: answer.latex, view: family.view, options: chosen, correct: chosen.indexOf(answer), note: answer.note })
    }
    if (rounds.length < GRAPH_ROUNDS) throw new Error('No graph rounds')
    return shuffle(random, rounds)
}
