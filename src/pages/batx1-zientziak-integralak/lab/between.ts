import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { exact, numberLatex } from './numbers.ts'

/* ==========================================================================
   L4 · Área entre dos curvas: two curves f and g and two limits a and b
   (from −3 to 3, in half steps). Once the learner has guessed, the region
   between them is shaded blue where f is on top and violet where g is,
   and the readout gives ∫ₐᵇ (f − g) dx and the area, split at the
   crossings. ▶ moves b from a to the right end. Each pair opens on an
   interval of its own, and the prediction is about it: is g on top, do
   they cross inside, or is f on top?
   ========================================================================== */

export type BetweenPair = 'parabolaLine' | 'lineParabola' | 'cubicLine' | 'twoParabolas' | 'lineCap'

export const BETWEEN_PAIRS: BetweenPair[] = ['parabolaLine', 'lineParabola', 'cubicLine', 'twoParabolas', 'lineCap']

/** A limit is at x = t / 2 */
export const BETWEEN_LIMITS = { t: { min: -6, max: 6 } } as const

interface BetweenSetup {
    f: (x: number) => number
    g: (x: number) => number
    /** An antiderivative of f − g */
    H: (x: number) => number
    fLatex: string
    gLatex: string
    /** Where f = g, left to right */
    cuts: number[]
    /** The interval the pair opens on (and the prediction is about), in half units */
    preset: [number, number]
    view: [number, number]
}

export const BETWEEN_SETUP: Record<BetweenPair, BetweenSetup> = {
    parabolaLine: { f: (x) => x * x, g: (x) => 2 * x, H: (x) => x ** 3 / 3 - x * x, fLatex: 'x^2', gLatex: '2x', cuts: [0, 2], preset: [0, 2], view: [-2, 6] },
    lineParabola: { f: (x) => x + 2, g: (x) => x * x, H: (x) => x * x / 2 + 2 * x - x ** 3 / 3, fLatex: 'x+2', gLatex: 'x^2', cuts: [-1, 2], preset: [-2, 4], view: [-2, 6] },
    cubicLine: { f: (x) => x ** 3, g: (x) => x, H: (x) => x ** 4 / 4 - x * x / 2, fLatex: 'x^3', gLatex: 'x', cuts: [-1, 0, 1], preset: [-2, 2], view: [-3, 3] },
    twoParabolas: { f: (x) => 6 - x * x, g: (x) => x * x - 2, H: (x) => 8 * x - (2 * x ** 3) / 3, fLatex: '6-x^2', gLatex: 'x^2-2', cuts: [-2, 2], preset: [-4, 4], view: [-3, 7] },
    lineCap: { f: (x) => x, g: (x) => 2 - x * x, H: (x) => x * x / 2 - 2 * x + x ** 3 / 3, fLatex: 'x', gLatex: '2-x^2', cuts: [-2, 1], preset: [-4, 2], view: [-4, 3] }
}

export interface BetweenState {
    pair: BetweenPair
    /** a = ta / 2 */
    ta: number
    /** b = tb / 2 */
    tb: number
    prediction: Prediction | null
}

export const initialBetweenState: BetweenState = { pair: 'parabolaLine', ta: 0, tb: 2, prediction: null }

const clampT = (t: number) => Math.min(BETWEEN_LIMITS.t.max, Math.max(BETWEEN_LIMITS.t.min, Math.round(t)))

/** A new pair opens on its own interval and asks for a new prediction; new limits do not */
export function setBetween(state: BetweenState, patch: Partial<Omit<BetweenState, 'prediction'>>): BetweenState {
    const pair = patch.pair ?? state.pair
    if (pair !== state.pair) {
        const [ta, tb] = BETWEEN_SETUP[pair].preset
        return { pair, ta: clampT(patch.ta ?? ta), tb: clampT(patch.tb ?? tb), prediction: null }
    }
    return { pair, ta: clampT(patch.ta ?? state.ta), tb: clampT(patch.tb ?? state.tb), prediction: state.prediction }
}

export const betweenA = (state: BetweenState) => state.ta / 2
export const betweenB = (state: BetweenState) => state.tb / 2

/** ∫ₐᵇ (f − g) dx */
export const betweenIntegral = (pair: BetweenPair, a: number, b: number) => exact(BETWEEN_SETUP[pair].H(b) - BETWEEN_SETUP[pair].H(a))

/** Where f and g meet strictly between a and b, with the two ends: the pieces of the region */
export function betweenPieces(pair: BetweenPair, a: number, b: number): number[] {
    const low = Math.min(a, b)
    const high = Math.max(a, b)
    return [low, ...BETWEEN_SETUP[pair].cuts.filter((cut) => cut > low && cut < high), high]
}

/** The area between the curves from a to b: the integral of f − g split at the crossings, each part positive */
export function betweenArea(pair: BetweenPair, a: number, b: number): number {
    const pieces = betweenPieces(pair, a, b)
    let total = 0
    for (let i = 0; i + 1 < pieces.length; i += 1) total += Math.abs(betweenIntegral(pair, pieces[i], pieces[i + 1]))
    return exact(total)
}

/** On (a, b): g is on top (<), they cross inside (=) or f is on top (>) */
export function topCurve(pair: BetweenPair, a: number, b: number): Prediction {
    const { f, g } = BETWEEN_SETUP[pair]
    const pieces = betweenPieces(pair, a, b)
    const signs = new Set<number>()
    for (let i = 0; i + 1 < pieces.length; i += 1) {
        const middle = (pieces[i] + pieces[i + 1]) / 2
        signs.add(Math.sign(f(middle) - g(middle)))
    }
    if (signs.size > 1) return '='
    return signs.has(1) ? '>' : '<'
}

export function betweenPrediction(state: BetweenState): Prediction {
    const [ta, tb] = BETWEEN_SETUP[state.pair].preset
    return topCurve(state.pair, ta / 2, tb / 2)
}

const withPair = (pair: BetweenPair, goal: LocalizedText): LocalizedText => {
    const { fLatex, gLatex } = BETWEEN_SETUP[pair]
    return say(
        `$f(x)=${fLatex}$ eta $g(x)=${gLatex}$ kurbekin, ${goal.eu}`,
        `Con $f(x)=${fLatex}$ y $g(x)=${gLatex}$, ${goal.es}`,
        `مع $f(x)=${fLatex}$ و$g(x)=${gLatex}$، ${goal.ar}`,
        `With $f(x)=${fLatex}$ and $g(x)=${gLatex}$, ${goal.en}`
    )
}

const ends = (state: BetweenState) => [Math.min(betweenA(state), betweenB(state)), Math.max(betweenA(state), betweenB(state))]

export const betweenChallenges: LabChallenge<BetweenState>[] = [
    {
        id: 112301,
        prompt: withPair('parabolaLine', say('jarri mugak bi ebaki-puntuetan.', 'pon los límites en los dos cortes.', 'ضع الحدّين عند نقطتي التقاطع.', 'put the limits at the two crossings.')),
        hint: same('$x^2=2x$'),
        isSolved: (state) => state.pair === 'parabolaLine' && ends(state)[0] === 0 && ends(state)[1] === 2
    },
    {
        id: 112302,
        prompt: withPair('lineParabola', say('lortu $\\int_a^b(f-g)\\,dx$ negatiboa, $a<b$ izanik.', 'consigue $\\int_a^b(f-g)\\,dx$ negativa, con $a<b$.', 'احصل على $\\int_a^b(f-g)\\,dx$ سالبًا مع $a<b$.', 'get a negative $\\int_a^b(f-g)\\,dx$, with $a<b$.')),
        hint: say('Bilatu $g$ goian dagoen tarte bat: ebaki-puntuetatik kanpo.', 'Busca un tramo donde $g$ vaya arriba: fuera de los cortes.', 'ابحث عن جزء تكون فيه $g$ في الأعلى: خارج نقطتي التقاطع.', 'Look for a stretch where $g$ is on top: outside the crossings.'),
        isSolved: (state) => state.pair === 'lineParabola' && state.ta < state.tb && betweenIntegral('lineParabola', betweenA(state), betweenB(state)) < 0
    },
    {
        id: 112303,
        prompt: withPair('cubicLine', say('$a=0$ hartuta, lortu $\\frac{1}{4}$ balio duen azalera.', 'empieza en $a=0$ y consigue un área de $\\frac{1}{4}$.', 'ابدأ من $a=0$ واحصل على مساحة تساوي $\\frac{1}{4}$.', 'start at $a=0$ and get an area of $\\frac{1}{4}$.')),
        hint: say('Kurbak $-1$, 0 eta 1 puntuetan ebakitzen dira.', 'Las curvas se cortan en $-1$, 0 y 1.', 'يتقاطع المنحنيان عند $-1$ و0 و1.', 'The curves meet at $-1$, 0 and 1.'),
        isSolved: (state) => state.pair === 'cubicLine' && betweenA(state) === 0 && betweenArea('cubicLine', 0, betweenB(state)) === exact(1 / 4)
    },
    {
        id: 112304,
        prompt: withPair('twoParabolas', say('$a=0$ hartuta, lortu $\\frac{32}{3}$ balio duen azalera.', 'empieza en $a=0$ y consigue un área de $\\frac{32}{3}$.', 'ابدأ من $a=0$ واحصل على مساحة تساوي $\\frac{32}{3}$.', 'start at $a=0$ and get an area of $\\frac{32}{3}$.')),
        hint: same('$6-x^2=x^2-2$'),
        isSolved: (state) => state.pair === 'twoParabolas' && betweenA(state) === 0 && betweenArea('twoParabolas', 0, betweenB(state)) === exact(32 / 3)
    },
    {
        id: 112305,
        prompt: withPair('lineCap', say('jarri $f$ goian dagoen tarte bat, $a<b$ izanik.', 'pon un tramo donde $f$ vaya arriba, con $a<b$.', 'ضع جزءًا تكون فيه $f$ في الأعلى مع $a<b$.', 'set a stretch where $f$ is on top, with $a<b$.')),
        hint: same('$x=2-x^2$'),
        isSolved: (state) => state.pair === 'lineCap' && state.ta < state.tb && topCurve('lineCap', betweenA(state), betweenB(state)) === '>'
    }
]

function same(value: string) {
    return say(value, value, value, value)
}

/** Endless practice: the limits at the crossings, or from a given a an area or an integral of a given value */
const betweenMaker: LabChallengeMaker<BetweenState> = (random) => {
    for (;;) {
        const pair = BETWEEN_PAIRS[randomInt(random, 0, BETWEEN_PAIRS.length - 1)]
        const kind = randomInt(random, 0, 2)
        const { cuts } = BETWEEN_SETUP[pair]
        if (kind === 0) {
            const [low, high] = [cuts[0], cuts[cuts.length - 1]]
            return {
                prompt: withPair(pair, say('jarri mugak kanpoko bi ebaki-puntuetan.', 'pon los límites en los cortes de los extremos.', 'ضع الحدّين عند نقطتي التقاطع الطرفيتين.', 'put the limits at the outermost crossings.')),
                hint: same(`$${BETWEEN_SETUP[pair].fLatex}=${BETWEEN_SETUP[pair].gLatex}$`),
                isSolved: (state) => state.pair === pair && ends(state)[0] === low && ends(state)[1] === high,
                solution: { pair, ta: low * 2, tb: high * 2, prediction: null }
            }
        }
        const ta = randomInt(random, BETWEEN_LIMITS.t.min, BETWEEN_LIMITS.t.max - 1)
        const tb = randomInt(random, ta + 1, BETWEEN_LIMITS.t.max)
        const [a, b] = [ta / 2, tb / 2]
        const area = kind === 1
        const value = area ? betweenArea(pair, a, b) : betweenIntegral(pair, a, b)
        if (Math.abs(value) < 0.2) continue
        const target = numberLatex(value)
        const start = numberLatex(a)
        const goal = area
            ? say(`$a=${start}$ hartuta, lortu $${target}$ balio duen azalera.`, `empieza en $a=${start}$ y consigue un área de $${target}$.`, `ابدأ من $a=${start}$ واحصل على مساحة تساوي $${target}$.`, `start at $a=${start}$ and get an area of $${target}$.`)
            : say(`$a=${start}$ hartuta, lortu $\\int_a^b(f-g)\\,dx=${target}$.`, `empieza en $a=${start}$ y consigue $\\int_a^b(f-g)\\,dx=${target}$.`, `ابدأ من $a=${start}$ واحصل على $\\int_a^b(f-g)\\,dx=${target}$.`, `start at $a=${start}$ and get $\\int_a^b(f-g)\\,dx=${target}$.`)
        return {
            prompt: withPair(pair, goal),
            hint: area
                ? say('Azalerak, kurbak gurutzatzen diren tokian, zatiak positibo gisa batzen ditu.', 'Donde las curvas se cruzan, el área suma las partes en positivo.', 'حيث يتقاطع المنحنيان تجمع المساحة الأجزاء موجبة.', 'Where the curves cross, the area adds the parts as positive.')
                : say('Integralak $g$ goian dagoen zatia kendu egiten du.', 'La integral resta la parte donde $g$ va arriba.', 'التكامل يطرح الجزء الذي تكون فيه $g$ في الأعلى.', 'The integral subtracts the part where $g$ is on top.'),
            isSolved: (state) => state.pair === pair && state.ta === ta && Math.abs((area ? betweenArea(pair, betweenA(state), betweenB(state)) : betweenIntegral(pair, betweenA(state), betweenB(state))) - value) < 1e-9,
            solution: { pair, ta, tb, prediction: null }
        }
    }
}

export const betweenExtra = freshFrom(initialBetweenState, betweenMaker)
