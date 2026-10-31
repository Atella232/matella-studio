import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L1 · Balantza (La balanza): ax + b = cx + d as a balance with boxes of
   unknown weight x and 1 kg weights. The learner may only do the same on
   both pans: take a box off each, take a kilo off each, or share each pan
   among the boxes. The pans stay level, and when one pan holds a single
   box the other shows its weight. Before that, the learner predicts
   whether a box weighs less than, exactly or more than 4 kg; ▶ shows the
   whole solution move by move. Pure logic, whole numbers only.
   ========================================================================== */

/** Boxes and kilos on the left and right pans: ax + b = cx + d */
export interface Pans {
    a: number
    b: number
    c: number
    d: number
}

export const BALANCE_EQUATIONS: Pans[] = [
    { a: 3, b: 2, c: 1, d: 8 },
    { a: 4, b: 1, c: 2, d: 9 },
    { a: 2, b: 5, c: 0, d: 13 },
    { a: 5, b: 2, c: 2, d: 17 },
    { a: 1, b: 9, c: 3, d: 1 }
]

export interface BalanceState {
    /** The fixed equation being solved, or -1 for a new one */
    equation: number
    start: Pans
    pans: Pans
    moves: number
    prediction: Prediction | null
}

const fresh = (equation: number, start: Pans): BalanceState => ({ equation, start, pans: { ...start }, moves: 0, prediction: null })
export const startEquation = (equation: number): BalanceState => fresh(equation, BALANCE_EQUATIONS[equation])
export const initialBalanceState: BalanceState = startEquation(0)

/** The weight of a box */
export const boxWeight = ({ a, b, c, d }: Pans) => (d - b) / (a - c)
export const balancePrediction = (state: BalanceState): Prediction => compareTo(boxWeight(state.start), 4)

export type BalanceMove = 'box' | 'kilo' | 'share'

/** Which moves keep the balance level from here */
export function canMove({ a, b, c, d }: Pans, move: BalanceMove): boolean {
    if (move === 'box') return a > 0 && c > 0
    if (move === 'kilo') return b > 0 && d > 0
    // Sharing: one pan has only boxes (more than one), the other only kilos, and they divide exactly
    if (a > 1 && b === 0 && c === 0) return d % a === 0
    if (c > 1 && d === 0 && a === 0) return b % c === 0
    return false
}

export function applyMove(state: BalanceState, move: BalanceMove): BalanceState {
    const { a, b, c, d } = state.pans
    if (!canMove(state.pans, move)) return state
    const pans = move === 'box'
        ? { a: a - 1, b, c: c - 1, d }
        : move === 'kilo'
            ? { a, b: b - 1, c, d: d - 1 }
            : a > 0 ? { a: 1, b: 0, c: 0, d: d / a } : { a: 0, b: b / c, c: 1, d: 0 }
    return { ...state, pans, moves: state.moves + 1 }
}

/** A single box on one pan and only kilos on the other */
export const balanceSolved = ({ a, b, c, d }: Pans) => (a === 1 && b === 0 && c === 0) || (c === 1 && d === 0 && a === 0)

/** The shortest solution: boxes off, kilos off, then share */
export function solutionSteps(start: Pans): Pans[] {
    let state: BalanceState = fresh(-1, start)
    const steps = [start]
    for (let guard = 0; guard < 60 && !balanceSolved(state.pans); guard += 1) {
        const move: BalanceMove = canMove(state.pans, 'box') ? 'box' : canMove(state.pans, 'kilo') ? 'kilo' : 'share'
        state = applyMove(state, move)
        steps.push(state.pans)
    }
    return steps
}

export const setBalancePrediction = (state: BalanceState, prediction: Prediction): BalanceState => (state.prediction === null ? { ...state, prediction } : state)

/** The equation on the pans, in LaTeX */
export function pansLatex({ a, b, c, d }: Pans): string {
    const side = (boxes: number, kilos: number) => {
        const x = boxes === 0 ? '' : boxes === 1 ? 'x' : `${boxes}x`
        if (x === '') return String(kilos)
        return kilos === 0 ? x : `${x}+${kilos}`
    }
    return `${side(a, b)}=${side(c, d)}`
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const E = (index: number) => pansLatex(BALANCE_EQUATIONS[index])
const solves = (equation: number, most = Infinity) => (state: BalanceState) => state.equation === equation && balanceSolved(state.pans) && state.moves <= most

export const balanceChallenges: LabChallenge<BalanceState>[] = [
    { id: 93101, prompt: say(`Ebatzi $${E(0)}$ balantzarekin.`, `Resuelve $${E(0)}$ con la balanza.`, `حلّ $${E(0)}$ بالميزان.`, `Solve $${E(0)}$ with the balance.`), hint: say('Kendu kaxa bat bi platerretatik, gero kiloak.', 'Quita una caja de cada platillo y después los kilos.', 'أزل صندوقًا من كل كفة ثم الكيلوغرامات.', 'Take a box off each pan, then the kilos.'), isSolved: solves(0) },
    { id: 93102, prompt: say(`Ebatzi $${E(1)}$.`, `Resuelve $${E(1)}$.`, `حلّ $${E(1)}$.`, `Solve $${E(1)}$.`), hint: say('Bi kaxa geratzen direnean, banatu.', 'Cuando queden dos cajas, reparte.', 'عندما يبقى صندوقان، وزّع.', 'When two boxes are left, share.'), isSolved: solves(1) },
    { id: 93103, prompt: say(`Ebatzi $${E(2)}$: eskuinean ez dago kaxarik.`, `Resuelve $${E(2)}$: a la derecha no hay cajas.`, `حلّ $${E(2)}$: لا صناديق في اليمين.`, `Solve $${E(2)}$: there are no boxes on the right.`), hint: say('Kendu 5 kilo bi aldeetatik.', 'Quita 5 kilos de cada lado.', 'أزل 5 كيلوغرامات من كل جانب.', 'Take 5 kilos off each side.'), isSolved: solves(2) },
    { id: 93104, prompt: say(`Ebatzi $${E(3)}$ 5 mugimendutan edo gutxiagotan.`, `Resuelve $${E(3)}$ en 5 movimientos o menos.`, `حلّ $${E(3)}$ في 5 حركات أو أقل.`, `Solve $${E(3)}$ in 5 moves or fewer.`), hint: say('Kaxak kendu, kiloak kendu eta azkenean banatu: ez da besterik behar.', 'Quita cajas, quita kilos y al final reparte: no hace falta más.', 'أزل الصناديق ثم الكيلوغرامات ثم وزّع: لا حاجة لغير ذلك.', 'Remove boxes, remove kilos and finally share: nothing else is needed.'), isSolved: solves(3, 5) },
    { id: 93105, prompt: say(`Ebatzi $${E(4)}$: kaxa gehiago eskuinean daude.`, `Resuelve $${E(4)}$: hay más cajas a la derecha.`, `حلّ $${E(4)}$: الصناديق أكثر في اليمين.`, `Solve $${E(4)}$: there are more boxes on the right.`), hint: say('$x$ eskuinean geratuko da.', 'La $x$ se quedará a la derecha.', 'سيبقى $x$ في اليمين.', 'The $x$ will stay on the right.'), isSolved: solves(4) }
]

/** Endless practice: a new equation with a whole-number solution */
export function randomPans(random: () => number): Pans {
    for (;;) {
        const x = randomInt(random, 1, 6)
        const c = randomInt(random, 0, 2)
        const a = c + randomInt(random, 1, 3)
        const b = randomInt(random, 0, 6)
        const d = a * x + b - c * x
        if (d <= 18 && d >= 0 && a + c <= 6 && b + d > 0) return random() < 0.3 ? { a: c, b: d, c: a, d: b } : { a, b, c, d }
    }
}

const balanceMaker: LabChallengeMaker<BalanceState> = (random) => {
    const start = randomPans(random)
    const solved = solutionSteps(start)
    const end = solved[solved.length - 1]
    return {
        prompt: say(`Ebatzi $${pansLatex(start)}$ balantzarekin.`, `Resuelve $${pansLatex(start)}$ con la balanza.`, `حلّ $${pansLatex(start)}$ بالميزان.`, `Solve $${pansLatex(start)}$ with the balance.`),
        hint: say(`Kaxa batek ${boxWeight(start)} kilo pisatzen ditu.`, `Una caja pesa ${boxWeight(start)} kilos.`, `يزن الصندوق ${boxWeight(start)} كيلوغرامات.`, `A box weighs ${boxWeight(start)} kilos.`),
        isSolved: (state) => state.equation === -1 && pansLatex(state.start) === pansLatex(start) && balanceSolved(state.pans),
        solution: { equation: -1, start, pans: end, moves: solved.length - 1, prediction: null }
    }
}

export const balanceExtra = freshFrom(initialBalanceState, balanceMaker)
