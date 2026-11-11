import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   L4 · Doitu a eta b (Ajusta a y b): three functions in three pieces with
   two parameters, as in the Basque EBAU. Two sliders move a and b; each
   joint shows the end of the piece on its left and the start of the
   piece on its right, green when they meet. Only one pair (a, b) closes
   both joints. Before drawing, the learner predicts how b must move to
   keep the first joint closed when a goes up: down (S2), not at all (S3)
   or up (S1).
   ========================================================================== */

export type JointsSetup = 's1' | 's2' | 's3'

export const JOINTS_SETUPS: JointsSetup[] = ['s1', 's2', 's3']

export const JOINTS_LIMITS = { a: { min: -10, max: 10 }, b: { min: -10, max: 10 } } as const

export interface JointsState {
    setup: JointsSetup
    a: number
    b: number
    prediction: Prediction | null
}

export const initialJointsState: JointsState = { setup: 's1', a: 0, b: 0, prediction: null }

export function setJoints(state: JointsState, patch: Partial<Omit<JointsState, 'prediction'>>): JointsState {
    const setup = patch.setup ?? state.setup
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
    return {
        setup,
        a: clamp(patch.a ?? state.a, JOINTS_LIMITS.a.min, JOINTS_LIMITS.a.max),
        b: clamp(patch.b ?? state.b, JOINTS_LIMITS.b.min, JOINTS_LIMITS.b.max),
        prediction: setup === state.setup ? state.prediction : null
    }
}

interface Piece {
    f: (x: number, a: number, b: number) => number
    latex: string
}

interface Setup {
    /** The two joints */
    joints: [number, number]
    pieces: [Piece, Piece, Piece]
    /** The pair that closes both joints */
    solution: [number, number]
    /** When a goes up, b must go down (<), stay (=) or go up (>) to keep the first joint closed */
    firstJoint: Prediction
    view: { xMin: number; xMax: number; yMin: number; yMax: number; yStep: number }
}

export const JOINTS_SETUP: Record<JointsSetup, Setup> = {
    s1: {
        joints: [1, 3],
        pieces: [
            { f: (x, a) => a * x + 2, latex: 'ax+2' },
            { f: (x, _a, b) => x * x + b, latex: 'x^2+b' },
            { f: (x, a) => a * x, latex: 'ax' }
        ],
        solution: [5, 6],
        firstJoint: '>',
        view: { xMin: -1, xMax: 4, yMin: -10, yMax: 25, yStep: 5 }
    },
    s2: {
        joints: [1, 2],
        pieces: [
            { f: (x, a) => x * x - a, latex: 'x^2-a' },
            { f: (x, _a, b) => b * x, latex: 'bx' },
            { f: (x, a) => a * x + 6, latex: 'ax+6' }
        ],
        solution: [-1, 2],
        firstJoint: '<',
        view: { xMin: -2, xMax: 4, yMin: -6, yMax: 9, yStep: 3 }
    },
    s3: {
        joints: [0, 2],
        pieces: [
            { f: (x, _a, b) => x + b, latex: 'x+b' },
            { f: (x, a) => a * x + 3, latex: 'ax+3' },
            { f: (x) => x * x + 3, latex: 'x^2+3' }
        ],
        solution: [2, 3],
        firstJoint: '=',
        view: { xMin: -2, xMax: 4, yMin: -4, yMax: 20, yStep: 4 }
    }
}

/** The function in LaTeX: the first piece for x < p, the second for p ≤ x < q, the third for x ≥ q */
export function jointsLatex(setup: JointsSetup): string {
    const { joints: [p, q], pieces } = JOINTS_SETUP[setup]
    return `f(x)=\\begin{cases}${pieces[0].latex} & x<${p}\\\\ ${pieces[1].latex} & ${p}\\le x<${q}\\\\ ${pieces[2].latex} & x\\ge ${q}\\end{cases}`
}

/** At joint j: where the piece on the left arrives and where the piece on the right starts (it is f there) */
export function jointValues(state: Pick<JointsState, 'setup' | 'a' | 'b'>, j: 0 | 1): [number, number] {
    const { joints, pieces } = JOINTS_SETUP[state.setup]
    const x = joints[j]
    return [pieces[j].f(x, state.a, state.b), pieces[j + 1].f(x, state.a, state.b)]
}

export function jointClosed(state: Pick<JointsState, 'setup' | 'a' | 'b'>, j: 0 | 1): boolean {
    const [left, right] = jointValues(state, j)
    return Math.abs(left - right) < 1e-9
}

export const isContinuous = (state: Pick<JointsState, 'setup' | 'a' | 'b'>) => jointClosed(state, 0) && jointClosed(state, 1)

/** The value of f at x */
export function jointsValue(state: Pick<JointsState, 'setup' | 'a' | 'b'>, x: number): number {
    const { joints: [p, q], pieces } = JOINTS_SETUP[state.setup]
    const piece = x < p ? pieces[0] : x < q ? pieces[1] : pieces[2]
    return piece.f(x, state.a, state.b)
}

export const jointsPrediction = (state: Pick<JointsState, 'setup'>): Prediction => JOINTS_SETUP[state.setup].firstJoint

export const jointsChallenges: LabChallenge<JointsState>[] = [
    {
        id: 122301,
        prompt: say('$f_1$ funtzioan, aurkitu $a$ eta $b$, $\\mathbb{R}$ osoan jarraitua izan dadin.', 'En $f_1$, encuentra $a$ y $b$ para que sea continua en $\\mathbb{R}$.', 'في $f_1$ أوجد $a$ و$b$ لتكون متصلة على $\\mathbb{R}$.', 'In $f_1$, find $a$ and $b$ so that it is continuous on $\\mathbb{R}$.'),
        hint: say('$x=1$ puntuan: $a+2=1+b$. $x=3$ puntuan: $9+b=3a$.', 'En $x=1$: $a+2=1+b$. En $x=3$: $9+b=3a$.', 'عند $x=1$: $a+2=1+b$. وعند $x=3$: $9+b=3a$.', 'At $x=1$: $a+2=1+b$. At $x=3$: $9+b=3a$.'),
        isSolved: (state) => state.setup === 's1' && isContinuous(state)
    },
    {
        id: 122302,
        prompt: say('$f_2$ funtzioan, aurkitu $a$ eta $b$, $\\mathbb{R}$ osoan jarraitua izan dadin.', 'En $f_2$, encuentra $a$ y $b$ para que sea continua en $\\mathbb{R}$.', 'في $f_2$ أوجد $a$ و$b$ لتكون متصلة على $\\mathbb{R}$.', 'In $f_2$, find $a$ and $b$ so that it is continuous on $\\mathbb{R}$.'),
        hint: say('$x=1$ puntuan: $1-a=b$. $x=2$ puntuan: $2b=2a+6$.', 'En $x=1$: $1-a=b$. En $x=2$: $2b=2a+6$.', 'عند $x=1$: $1-a=b$. وعند $x=2$: $2b=2a+6$.', 'At $x=1$: $1-a=b$. At $x=2$: $2b=2a+6$.'),
        isSolved: (state) => state.setup === 's2' && isContinuous(state)
    },
    {
        id: 122303,
        prompt: say('$f_3$ funtzioan, aurkitu $a$ eta $b$, $\\mathbb{R}$ osoan jarraitua izan dadin.', 'En $f_3$, encuentra $a$ y $b$ para que sea continua en $\\mathbb{R}$.', 'في $f_3$ أوجد $a$ و$b$ لتكون متصلة على $\\mathbb{R}$.', 'In $f_3$, find $a$ and $b$ so that it is continuous on $\\mathbb{R}$.'),
        hint: say('Lotune bakoitzean parametro bakarra dago.', 'En cada unión hay un solo parámetro.', 'في كل نقطة التقاء وسيط واحد فقط.', 'Each joint has only one parameter.'),
        isSolved: (state) => state.setup === 's3' && isContinuous(state)
    },
    {
        id: 122304,
        prompt: say('$f_1$ funtzioan, $a=0$ izanik, itxi lehen lotunea bakarrik.', 'En $f_1$, con $a=0$, cierra solo la primera unión.', 'في $f_1$ مع $a=0$، أغلق نقطة الالتقاء الأولى فقط.', 'In $f_1$, with $a=0$, close only the first joint.'),
        hint: say('$0+2=1+b$', '$0+2=1+b$', '$0+2=1+b$', '$0+2=1+b$'),
        isSolved: (state) => state.setup === 's1' && state.a === 0 && jointClosed(state, 0)
    },
    {
        id: 122305,
        prompt: say('$f_2$ funtzioan, $a=1$ izanik, itxi bigarren lotunea bakarrik.', 'En $f_2$, con $a=1$, cierra solo la segunda unión.', 'في $f_2$ مع $a=1$، أغلق نقطة الالتقاء الثانية فقط.', 'In $f_2$, with $a=1$, close only the second joint.'),
        hint: say('$2b=2\\cdot 1+6$', '$2b=2\\cdot 1+6$', '$2b=2\\cdot 1+6$', '$2b=2\\cdot 1+6$'),
        isSolved: (state) => state.setup === 's2' && state.a === 1 && jointClosed(state, 1)
    }
]

/** b that closes joint j for a given a (s3 closes its first joint with b alone and its second with a alone) */
function closingB(setup: JointsSetup, j: 0 | 1, a: number): number | null {
    if (setup === 's1') return j === 0 ? a + 1 : 3 * a - 9
    if (setup === 's2') return j === 0 ? 1 - a : a + 3
    return j === 0 ? 3 : null
}

const NAMES: Record<JointsSetup, string> = { s1: 'f_1', s2: 'f_2', s3: 'f_3' }

/** Endless practice: with a given a, close one joint */
const jointsMaker: LabChallengeMaker<JointsState> = (random) => {
    for (;;) {
        const setup = JOINTS_SETUPS[randomInt(random, 0, 2)]
        const j = (setup === 's3' ? 0 : randomInt(random, 0, 1)) as 0 | 1
        const a = randomInt(random, -4, 6)
        const b = closingB(setup, j, a)
        if (b === null || b < JOINTS_LIMITS.b.min || b > JOINTS_LIMITS.b.max) continue
        const f = `$${NAMES[setup]}$`
        const fixed = `$a=${a}$`
        const which = j === 0
            ? say('lehen lotunea', 'la primera unión', 'نقطة الالتقاء الأولى', 'the first joint')
            : say('bigarren lotunea', 'la segunda unión', 'نقطة الالتقاء الثانية', 'the second joint')
        return {
            prompt: say(`${f} funtzioan, ${fixed} izanik, itxi ${which.eu}.`, `En ${f}, con ${fixed}, cierra ${which.es}.`, `في ${f} مع ${fixed}، أغلق ${which.ar}.`, `In ${f}, with ${fixed}, close ${which.en}.`),
            hint: say('Berdindu bi zatiak lotune horretan.', 'Iguala los dos trozos en esa unión.', 'ساوِ الجزأين عند نقطة الالتقاء تلك.', 'Set both pieces equal at that joint.'),
            isSolved: (state) => state.setup === setup && state.a === a && jointClosed(state, j),
            solution: { setup, a, b, prediction: null }
        }
    }
}

export const jointsExtra = freshFrom(initialJointsState, jointsMaker)
