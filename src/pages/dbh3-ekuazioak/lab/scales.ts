import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L3 · Bi balantza (Dos balanzas): a system as two balances with apples
   (x) and pears (y) against kilos. The learner tries weights for an apple
   and a pear; each balance tips until its pans weigh the same, and the
   system is solved when both are level. First a prediction: is an apple
   lighter than, as heavy as or heavier than a pear? ▶ takes the second
   balance off the first as many times as it fits, which is the
   elimination method seen on the pans.
   ========================================================================== */

/** a·apples + b·pears = c kilos */
export interface Pan {
    a: number
    b: number
    c: number
}

export const SCALE_SYSTEMS: Array<[Pan, Pan]> = [
    [{ a: 2, b: 1, c: 8 }, { a: 1, b: 1, c: 5 }],
    [{ a: 1, b: 2, c: 10 }, { a: 1, b: 1, c: 7 }],
    [{ a: 3, b: 1, c: 13 }, { a: 1, b: 1, c: 7 }],
    [{ a: 2, b: 3, c: 12 }, { a: 1, b: 1, c: 5 }],
    [{ a: 4, b: 2, c: 14 }, { a: 1, b: 1, c: 4 }]
]

export const SCALE_LIMIT = 8

export interface ScalesState {
    /** The fixed system, or -1 for a new one */
    system: number
    pans: [Pan, Pan]
    x: number
    y: number
    prediction: Prediction | null
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
export const startSystem = (system: number): ScalesState => ({ system, pans: SCALE_SYSTEMS[system], x: 1, y: 1, prediction: null })
export const initialScalesState: ScalesState = startSystem(0)

export const setScales = (state: ScalesState, patch: { x?: number; y?: number }): ScalesState => ({
    ...state,
    x: clamp(patch.x ?? state.x, 0, SCALE_LIMIT),
    y: clamp(patch.y ?? state.y, 0, SCALE_LIMIT)
})

/** The solution of a·x + b·y = c, d·x + e·y = f */
export function scalesSolution([first, second]: [Pan, Pan]): { x: number; y: number } {
    const det = first.a * second.b - first.b * second.a
    return { x: (first.c * second.b - first.b * second.c) / det, y: (first.a * second.c - first.c * second.a) / det }
}

/** How much heavier the left pan is (apples and pears) than the kilos */
export const tilt = (pan: Pan, x: number, y: number) => pan.a * x + pan.b * y - pan.c
export const scalesLevel = (state: ScalesState) => state.pans.every((pan) => tilt(pan, state.x, state.y) === 0)
/** Is an apple lighter (<), as heavy (=) or heavier (>) than a pear? */
export const scalesPrediction = (state: ScalesState): Prediction => {
    const { x, y } = scalesSolution(state.pans)
    return compareTo(x, y)
}

/** Elimination on the pans: the second balance taken off the first as many times as it fits */
export function eliminated([first, second]: [Pan, Pan]): { times: number; left: Pan } {
    const times = Math.min(second.a > 0 ? Math.floor(first.a / second.a) : Infinity, second.b > 0 ? Math.floor(first.b / second.b) : Infinity, Math.floor(first.c / second.c))
    return { times, left: { a: first.a - times * second.a, b: first.b - times * second.b, c: first.c - times * second.c } }
}

export const setScalesPrediction = (state: ScalesState, prediction: Prediction): ScalesState => (state.prediction === null ? { ...state, prediction } : state)

export function panLatex({ a, b, c }: Pan): string {
    const term = (k: number, letter: string) => (k === 0 ? '' : k === 1 ? letter : `${k}${letter}`)
    return `${[term(a, 'x'), term(b, 'y')].filter(Boolean).join('+') || '0'}=${c}`
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const S = (index: number) => `${panLatex(SCALE_SYSTEMS[index][0])},\\ ${panLatex(SCALE_SYSTEMS[index][1])}`
const levels = (system: number) => (state: ScalesState) => state.system === system && scalesLevel(state)

export const scalesChallenges: LabChallenge<ScalesState>[] = [
    { id: 93301, prompt: say(`Orekatu bi balantzak: $${S(0)}$.`, `Equilibra las dos balanzas: $${S(0)}$.`, `وازن الميزانين: $${S(0)}$.`, `Level both balances: $${S(0)}$.`), hint: say('Lehen balantzak bigarrenak baino sagar bat gehiago eta 3 kilo gehiago ditu.', 'La primera tiene una manzana y 3 kilos más que la segunda.', 'في الأول تفاحة و3 كيلوغرامات أكثر من الثاني.', 'The first has one apple and 3 kilos more than the second.'), isSolved: levels(0) },
    { id: 93302, prompt: say(`Orekatu: $${S(1)}$.`, `Equilibra: $${S(1)}$.`, `وازن: $${S(1)}$.`, `Level: $${S(1)}$.`), hint: say('Kendu bigarrena lehenengoari: madari bat 3 kilo.', 'Quita la segunda de la primera: una pera, 3 kilos.', 'اطرح الثاني من الأول: إجاصة، 3 كيلوغرامات.', 'Take the second off the first: one pear, 3 kilos.'), isSolved: levels(1) },
    { id: 93303, prompt: say(`Orekatu: $${S(2)}$.`, `Equilibra: $${S(2)}$.`, `وازن: $${S(2)}$.`, `Level: $${S(2)}$.`), hint: say('Bi sagarrek 6 kilo pisatzen dute.', 'Dos manzanas pesan 6 kilos.', 'تزن تفاحتان 6 كيلوغرامات.', 'Two apples weigh 6 kilos.'), isSolved: levels(2) },
    { id: 93304, prompt: say(`Orekatu: $${S(3)}$.`, `Equilibra: $${S(3)}$.`, `وازن: $${S(3)}$.`, `Level: $${S(3)}$.`), hint: say('Kendu bigarrena bi aldiz lehenengoari.', 'Quita dos veces la segunda de la primera.', 'اطرح الثاني من الأول مرتين.', 'Take the second off the first twice.'), isSolved: levels(3) },
    { id: 93305, prompt: say(`Orekatu: $${S(4)}$.`, `Equilibra: $${S(4)}$.`, `وازن: $${S(4)}$.`, `Level: $${S(4)}$.`), hint: say('Bi aldiz kenduta, bi sagar 6 kilo dira.', 'Quitando dos veces, dos manzanas son 6 kilos.', 'بالطرح مرتين، تفاحتان 6 كيلوغرامات.', 'Taking it off twice, two apples are 6 kilos.'), isSolved: levels(4) }
]

/** Endless practice: a new pair of balances with whole weights */
const scalesMaker: LabChallengeMaker<ScalesState> = (random) => {
    for (;;) {
        const x = randomInt(random, 1, 6)
        const y = randomInt(random, 1, 6)
        const first = { a: randomInt(random, 1, 4), b: randomInt(random, 1, 3), c: 0 }
        const second = { a: randomInt(random, 1, 2), b: 1, c: 0 }
        if (first.a * second.b === first.b * second.a) continue
        first.c = first.a * x + first.b * y
        second.c = second.a * x + second.b * y
        const pans: [Pan, Pan] = [first, second]
        return {
            prompt: say(`Orekatu bi balantzak: $${panLatex(first)},\\ ${panLatex(second)}$.`, `Equilibra las dos balanzas: $${panLatex(first)},\\ ${panLatex(second)}$.`, `وازن الميزانين: $${panLatex(first)},\\ ${panLatex(second)}$.`, `Level both balances: $${panLatex(first)},\\ ${panLatex(second)}$.`),
            hint: say(`Sagar batek ${x} kilo pisatzen ditu.`, `Una manzana pesa ${x} kilos.`, `تزن التفاحة ${x} كيلوغرامات.`, `An apple weighs ${x} kilos.`),
            isSolved: (state) => state.system === -1 && panLatex(state.pans[0]) === panLatex(first) && panLatex(state.pans[1]) === panLatex(second) && scalesLevel(state),
            solution: { system: -1, pans, x, y, prediction: null }
        }
    }
}

export const scalesExtra = freshFrom(initialScalesState, scalesMaker)
