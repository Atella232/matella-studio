import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Doitu a eta b: puntarik ez (Ajusta a y b: que no haya pico): four
   functions in two pieces with two parameters, as in the Basque EBAU.
   Two steppers move a and b; at the joint the board draws the end of
   each piece and, once the heights meet, the tangent of each side. The
   joint is a jump, a corner or smooth. Only one pair (a, b) makes the
   function differentiable. Before drawing, the learner predicts the sign
   of the slope at the joint once there is no corner: down (<),
   horizontal (=) or up (>).
   ========================================================================== */

export type NoCornerSetup = 'g1' | 'g2' | 'g3' | 'g4'

export const NO_CORNER_SETUPS: NoCornerSetup[] = ['g1', 'g2', 'g3', 'g4']

export const NO_CORNER_LIMITS = { a: { min: -6, max: 6 }, b: { min: -6, max: 6 } } as const

interface Piece {
    f: (x: number, a: number, b: number) => number
    /** The derivative of the piece */
    d: (x: number, a: number, b: number) => number
    latex: string
}

interface Setup {
    joint: number
    left: Piece
    right: Piece
    /** The pair that makes the function differentiable */
    solution: [number, number]
    view: { xMin: number; xMax: number; yMin: number; yMax: number; yStep: number }
}

export const NO_CORNER_SETUP: Record<NoCornerSetup, Setup> = {
    g1: {
        joint: 1,
        left: { f: (x, a) => x * x + a * x, d: (x, a) => 2 * x + a, latex: 'x^2+ax' },
        right: { f: (x, _a, b) => b * Math.log(x) + 3, d: (x, _a, b) => b / x, latex: 'b\\ln x+3' },
        solution: [2, 4],
        view: { xMin: -2, xMax: 4, yMin: -4, yMax: 10, yStep: 2 }
    },
    g2: {
        joint: 2,
        left: { f: (x, a) => a * x * x + 1, d: (x, a) => 2 * a * x, latex: 'ax^2+1' },
        right: { f: (x, _a, b) => b * x - 3, d: (_x, _a, b) => b, latex: 'bx-3' },
        solution: [1, 4],
        view: { xMin: -1, xMax: 4, yMin: -4, yMax: 12, yStep: 2 }
    },
    g3: {
        joint: 1,
        left: { f: (x, a, b) => a * x + b, d: (_x, a) => a, latex: 'ax+b' },
        right: { f: (x) => x * x - 4 * x + 7, d: (x) => 2 * x - 4, latex: 'x^2-4x+7' },
        solution: [-2, 6],
        view: { xMin: -2, xMax: 4, yMin: -2, yMax: 10, yStep: 2 }
    },
    g4: {
        joint: 2,
        left: { f: (x, a, b) => a * x + b, d: (_x, a) => a, latex: 'ax+b' },
        right: { f: (x) => x * x - 4 * x + 6, d: (x) => 2 * x - 4, latex: 'x^2-4x+6' },
        solution: [0, 2],
        view: { xMin: -1, xMax: 5, yMin: -2, yMax: 8, yStep: 2 }
    }
}

export interface NoCornerState {
    setup: NoCornerSetup
    a: number
    b: number
    prediction: Prediction | null
}

export const initialNoCornerState: NoCornerState = { setup: 'g1', a: 0, b: 0, prediction: null }

/** Only a new function asks for a new prediction */
export function setNoCorner(state: NoCornerState, patch: Partial<Omit<NoCornerState, 'prediction'>>): NoCornerState {
    const setup = patch.setup ?? state.setup
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
    return {
        setup,
        a: clamp(patch.a ?? state.a, NO_CORNER_LIMITS.a.min, NO_CORNER_LIMITS.a.max),
        b: clamp(patch.b ?? state.b, NO_CORNER_LIMITS.b.min, NO_CORNER_LIMITS.b.max),
        prediction: setup === state.setup ? state.prediction : null
    }
}

/** The function in LaTeX: the left piece for x < p (≤ in g1), the right one after */
export function noCornerLatex(setup: NoCornerSetup): string {
    const { joint, left, right } = NO_CORNER_SETUP[setup]
    const [lower, upper] = setup === 'g1' ? ['\\le', '>'] : ['<', '\\ge']
    return `f(x)=\\begin{cases}${left.latex} & x${lower} ${joint}\\\\ ${right.latex} & x${upper} ${joint}\\end{cases}`
}

/** At the joint: the heights and the slopes of the two pieces */
export function jointReadings(state: Pick<NoCornerState, 'setup' | 'a' | 'b'>) {
    const { joint, left, right } = NO_CORNER_SETUP[state.setup]
    return {
        leftValue: left.f(joint, state.a, state.b),
        rightValue: right.f(joint, state.a, state.b),
        leftSlope: left.d(joint, state.a, state.b),
        rightSlope: right.d(joint, state.a, state.b)
    }
}

export type JointKind = 'jump' | 'corner' | 'smooth'

export function jointKind(state: Pick<NoCornerState, 'setup' | 'a' | 'b'>): JointKind {
    const { leftValue, rightValue, leftSlope, rightSlope } = jointReadings(state)
    if (Math.abs(leftValue - rightValue) > 1e-9) return 'jump'
    return Math.abs(leftSlope - rightSlope) > 1e-9 ? 'corner' : 'smooth'
}

/** The sign of the slope at the joint when the function is differentiable */
export function noCornerPrediction(state: Pick<NoCornerState, 'setup'>): Prediction {
    const { solution: [a, b] } = NO_CORNER_SETUP[state.setup]
    return compareTo(jointReadings({ setup: state.setup, a, b }).rightSlope, 0)
}

const smooth = (setup: NoCornerSetup) => (state: NoCornerState) => state.setup === setup && jointKind(state) === 'smooth'

export const noCornerChallenges: LabChallenge<NoCornerState>[] = [
    {
        id: 123201,
        prompt: say('$g_1$ funtzioan, aurkitu $a$ eta $b$, $x=1$ puntuan deribagarria izan dadin.', 'En $g_1$, encuentra $a$ y $b$ para que sea derivable en $x=1$.', 'في $g_1$ أوجد $a$ و$b$ لتكون قابلة للاشتقاق عند $x=1$.', 'In $g_1$, find $a$ and $b$ so that it is differentiable at $x=1$.'),
        hint: say('Altuerak: $1+a=3$. Maldak: $2+a=b$.', 'Alturas: $1+a=3$. Pendientes: $2+a=b$.', 'الارتفاعان: $1+a=3$. الميلان: $2+a=b$.', 'Heights: $1+a=3$. Slopes: $2+a=b$.'),
        isSolved: smooth('g1')
    },
    {
        id: 123202,
        prompt: say('$g_2$ funtzioan, aurkitu $a$ eta $b$, $x=2$ puntuan deribagarria izan dadin.', 'En $g_2$, encuentra $a$ y $b$ para que sea derivable en $x=2$.', 'في $g_2$ أوجد $a$ و$b$ لتكون قابلة للاشتقاق عند $x=2$.', 'In $g_2$, find $a$ and $b$ so that it is differentiable at $x=2$.'),
        hint: say('Altuerak: $4a+1=2b-3$. Maldak: $4a=b$.', 'Alturas: $4a+1=2b-3$. Pendientes: $4a=b$.', 'الارتفاعان: $4a+1=2b-3$. الميلان: $4a=b$.', 'Heights: $4a+1=2b-3$. Slopes: $4a=b$.'),
        isSolved: smooth('g2')
    },
    {
        id: 123203,
        prompt: say('$g_3$ funtzioan, aurkitu $a$ eta $b$, $x=1$ puntuan deribagarria izan dadin.', 'En $g_3$, encuentra $a$ y $b$ para que sea derivable en $x=1$.', 'في $g_3$ أوجد $a$ و$b$ لتكون قابلة للاشتقاق عند $x=1$.', 'In $g_3$, find $a$ and $b$ so that it is differentiable at $x=1$.'),
        hint: say('Zuzena parabolaren zuzen ukitzailea da: malda $2\\cdot 1-4$.', 'La recta es la tangente de la parábola: pendiente $2\\cdot 1-4$.', 'المستقيم مماس القطع المكافئ: الميل $2\\cdot 1-4$.', 'The line is the tangent of the parabola: slope $2\\cdot 1-4$.'),
        isSolved: smooth('g3')
    },
    {
        id: 123204,
        prompt: say('$g_4$ funtzioan, aurkitu $a$ eta $b$, $x=2$ puntuan deribagarria izan dadin.', 'En $g_4$, encuentra $a$ y $b$ para que sea derivable en $x=2$.', 'في $g_4$ أوجد $a$ و$b$ لتكون قابلة للاشتقاق عند $x=2$.', 'In $g_4$, find $a$ and $b$ so that it is differentiable at $x=2$.'),
        hint: say('Parabolaren erpina $x=2$ puntuan dago.', 'El vértice de la parábola está en $x=2$.', 'رأس القطع المكافئ عند $x=2$.', 'The vertex of the parabola is at $x=2$.'),
        isSolved: smooth('g4')
    },
    {
        id: 123205,
        prompt: say('$g_1$ funtzioan, egin jarraitua baina punta batekin.', 'En $g_1$, hazla continua pero con un pico.', 'في $g_1$ اجعلها متصلة لكن بزاوية.', 'In $g_1$, make it continuous but with a corner.'),
        hint: say('Lehenik $a=2$; gero, $b$ edozein, 4 izan ezik.', 'Primero $a=2$; después, cualquier $b$ menos 4.', 'أولًا $a=2$؛ ثم أي $b$ عدا 4.', 'First $a=2$; then any $b$ but 4.'),
        isSolved: (state) => state.setup === 'g1' && jointKind(state) === 'corner'
    }
]

/** a that closes the jump for a given b, or null when none in the range does */
function closingA(setup: NoCornerSetup, b: number): number | null {
    const candidates = Array.from({ length: NO_CORNER_LIMITS.a.max - NO_CORNER_LIMITS.a.min + 1 }, (_, i) => NO_CORNER_LIMITS.a.min + i)
    return candidates.find((a) => jointKind({ setup, a, b }) !== 'jump') ?? null
}

const NAMES: Record<NoCornerSetup, string> = { g1: 'g_1', g2: 'g_2', g3: 'g_3', g4: 'g_4' }

/** Endless practice: with a given b, make the function continuous with a corner */
const noCornerMaker: LabChallengeMaker<NoCornerState> = (random) => {
    for (;;) {
        const setup = NO_CORNER_SETUPS[randomInt(random, 0, NO_CORNER_SETUPS.length - 1)]
        const b = randomInt(random, -4, 6)
        if (b === NO_CORNER_SETUP[setup].solution[1]) continue
        const a = closingA(setup, b)
        if (a === null || jointKind({ setup, a, b }) !== 'corner') continue
        const g = `$${NAMES[setup]}$`
        const fixed = `$b=${b}$`
        return {
            prompt: say(`${g} funtzioan, ${fixed} izanik, egin jarraitua: punta bat geratuko da.`, `En ${g}, con ${fixed}, hazla continua: quedará un pico.`, `في ${g} مع ${fixed}، اجعلها متصلة: ستبقى زاوية.`, `In ${g}, with ${fixed}, make it continuous: a corner will remain.`),
            hint: say('Berdindu bi zatien altuerak lotunean.', 'Iguala las alturas de los dos trozos en la unión.', 'ساوِ ارتفاعي الجزأين عند نقطة الالتقاء.', 'Set the heights of both pieces equal at the joint.'),
            isSolved: (state) => state.setup === setup && state.b === b && jointKind(state) === 'corner',
            solution: { setup, a, b, prediction: null }
        }
    }
}

export const noCornerExtra = freshFrom(initialNoCornerState, noCornerMaker)
