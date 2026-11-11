import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Zuritu tipula (Pela la cebolla): a function of three layers. The
   learner first taps its layers from outside in (only one order is
   right), then chooses its derivative among three: the right product of
   three factors, the one that forgets the inner layer and the one that
   forgets the middle layer. Level 1: a power or an exponential of a
   sine or a cosine of kx; level 2: a root or a logarithm outside, and qx²
   inside; level 3: every layer, with x² + c inside. The cards show each
   layer with a box for what goes inside.
   ========================================================================== */

export const ONION_ROUNDS = 8

interface Layer {
    box: string
    apply: (inside: string) => string
    derivative: (inside: string) => string
    /** The layer and its derivative as numbers, for the tests */
    f: (u: number) => number
    d: (u: number) => number
}

interface Outer extends Layer {
    id: 'square' | 'cube' | 'root' | 'exp' | 'log'
}

interface Middle extends Layer {
    id: 'sin' | 'cos' | 'exp' | 'log'
}

const OUTERS: Record<Outer['id'], Outer> = {
    square: { id: 'square', box: '\\square^2', apply: (m) => `\\left(${m}\\right)^2`, derivative: (m) => `2${m}`, f: (u) => u * u, d: (u) => 2 * u },
    cube: { id: 'cube', box: '\\square^3', apply: (m) => `\\left(${m}\\right)^3`, derivative: (m) => `3\\left(${m}\\right)^2`, f: (u) => u ** 3, d: (u) => 3 * u * u },
    root: { id: 'root', box: '\\sqrt{\\square}', apply: (m) => `\\sqrt{${m}}`, derivative: (m) => `\\frac{1}{2\\sqrt{${m}}}`, f: Math.sqrt, d: (u) => 1 / (2 * Math.sqrt(u)) },
    exp: { id: 'exp', box: 'e^{\\square}', apply: (m) => `e^{${m}}`, derivative: (m) => `e^{${m}}`, f: Math.exp, d: Math.exp },
    log: { id: 'log', box: '\\ln\\square', apply: (m) => `\\ln\\left(${m}\\right)`, derivative: (m) => `\\frac{1}{${m}}`, f: Math.log, d: (u) => 1 / u }
}

const MIDDLES: Record<Middle['id'], Middle> = {
    sin: { id: 'sin', box: '\\sin\\square', apply: (i) => `\\sin(${i})`, derivative: (i) => `\\cos(${i})`, f: Math.sin, d: Math.cos },
    cos: { id: 'cos', box: '\\cos\\square', apply: (i) => `\\cos(${i})`, derivative: (i) => `\\left(-\\sin(${i})\\right)`, f: Math.cos, d: (u) => -Math.sin(u) },
    exp: { id: 'exp', box: 'e^{\\square}', apply: (i) => `e^{${i}}`, derivative: (i) => `e^{${i}}`, f: Math.exp, d: Math.exp },
    log: { id: 'log', box: '\\ln\\square', apply: (i) => `\\ln(${i})`, derivative: (i) => `\\frac{1}{${i}}`, f: Math.log, d: (u) => 1 / u }
}

export interface OnionRound {
    /** The function, its three layers from outside in, and the three cards in the order shown */
    latex: string
    layers: [string, string, string]
    cards: string[]
    /** The three options for the derivative, and which one is right */
    options: string[]
    correct: number
    /** The function and its derivative as numbers, for the tests */
    f: (x: number) => number
    df: (x: number) => number
}

/** Layers that do not undo each other and give two different cards */
const fits = (outer: Outer, middle: Middle) => outer.id !== middle.id && !(['square', 'cube', 'log'].includes(outer.id) && middle.id === 'exp') && !(outer.id === 'exp' && middle.id === 'log')

function makeRound(random: Random, levelIndex: number): OnionRound | null {
    const outerIds: Outer['id'][] = levelIndex === 0 ? ['square', 'cube', 'exp'] : levelIndex === 1 ? ['root', 'log', 'square'] : ['square', 'cube', 'root', 'exp', 'log']
    const middleIds: Middle['id'][] = levelIndex === 0 ? ['sin', 'cos'] : levelIndex === 1 ? ['sin', 'cos', 'exp'] : ['sin', 'cos', 'exp', 'log']
    const outer = OUTERS[pick(random, outerIds)]
    const middle = MIDDLES[pick(random, middleIds)]
    if (!fits(outer, middle)) return null
    const k = randomInt(random, 2, 5)
    const c = randomInt(random, 1, 4)
    const q = randomInt(random, 1, 3)
    const innerKinds: Array<[string, string, (x: number) => number, (x: number) => number]> = levelIndex === 0
        ? [[`${k}x`, String(k), (x) => k * x, () => k]]
        : levelIndex === 1
            ? [[`${q === 1 ? '' : q}x^2`, `${2 * q}x`, (x) => q * x * x, (x) => 2 * q * x]]
            : [[`x^2+${c}`, '2x', (x) => x * x + c, (x) => 2 * x], [`${k}x`, String(k), (x) => k * x, () => k]]
    const [inner, innerDerivative, g, dg] = pick(random, innerKinds)
    // ln of a logarithm or of a cosine would leave the domain for many x: keep the logarithm inside positive things
    if (middle.id === 'log' && inner.startsWith(`${k}x`)) return null
    const middleLatex = middle.apply(inner)
    const latex = `f(x)=${outer.apply(middleLatex)}`
    const a = outer.derivative(middleLatex)
    const b = middle.derivative(inner)
    const right = `${a}\\cdot ${b}\\cdot ${innerDerivative}`
    const noInner = `${a}\\cdot ${b}`
    const noMiddle = `${a}\\cdot ${innerDerivative}`
    const options = shuffle(random, [right, noInner, noMiddle])
    const layers: [string, string, string] = [outer.box, middle.box, inner]
    let cards = shuffle(random, [...layers])
    if (cards.join() === layers.join()) cards = [layers[1], layers[2], layers[0]]
    const f = (x: number) => outer.f(middle.f(g(x)))
    const df = (x: number) => outer.d(middle.f(g(x))) * middle.d(g(x)) * dg(x)
    return { latex, layers, cards, options, correct: options.indexOf(right), f, df }
}

/** Eight different rounds of a level, with the right option in different places */
export function createOnionRounds(random: Random, levelIndex: number): OnionRound[] {
    for (let attempt = 0; attempt < 300; attempt += 1) {
        const rounds: OnionRound[] = []
        for (let tries = 0; rounds.length < ONION_ROUNDS && tries < 400; tries += 1) {
            const next = makeRound(random, levelIndex)
            if (next && !rounds.some((other) => other.latex === next.latex)) rounds.push(next)
        }
        if (rounds.length === ONION_ROUNDS && new Set(rounds.map((item) => item.correct)).size >= 2) return rounds
    }
    throw new Error('No onion rounds')
}

/** The picks are right when they follow the layers from outside in */
export const isOnionOrder = (round: Pick<OnionRound, 'layers'>, picked: string[]) => picked.length === 3 && picked.every((card, index) => card === round.layers[index])
