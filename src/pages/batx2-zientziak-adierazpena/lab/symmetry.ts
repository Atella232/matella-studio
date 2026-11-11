import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L4 · Simetria eta periodoa (Simetría y periodo): a function and, on the
   same board, one copy of it: its reflection in the Y axis, f(−x), its
   reflection through the origin, −f(−x), or the copy shifted by T,
   f(x + T), with T a multiple of π/2. The readout says whether the copy
   falls on the curve: the first means even, the second odd and the third
   that T is a period. Before drawing the copy, the learner predicts
   whether f is odd (<), neither (=) or even (>).
   ========================================================================== */

export type SymmetryFunction = 's1' | 's2' | 's3' | 's4' | 's5' | 's6'
export type SymmetryMode = 'mirror' | 'origin' | 'shift'
export type Parity = 'odd' | 'none' | 'even'

export const SYMMETRY_FUNCTIONS: SymmetryFunction[] = ['s1', 's2', 's3', 's4', 's5', 's6']
export const SYMMETRY_MODES: SymmetryMode[] = ['mirror', 'origin', 'shift']

interface SymmetrySetup {
    f: (x: number) => number
    latex: string
    parity: Parity
}

export const SYMMETRY_SETUP: Record<SymmetryFunction, SymmetrySetup> = {
    s1: { f: (x) => (4 * x) / (x * x + 1), latex: '\\frac{4x}{x^2+1}', parity: 'odd' },
    s2: { f: (x) => 3 / (x * x + 1) - 1, latex: '\\frac{3}{x^2+1}-1', parity: 'even' },
    s3: { f: (x) => (2 * (x + 1)) / (x * x + 1), latex: '\\frac{2(x+1)}{x^2+1}', parity: 'none' },
    s4: { f: (x) => 2 * Math.cos(2 * x), latex: '2\\cos 2x', parity: 'even' },
    s5: { f: (x) => Math.sin(x) + Math.cos(x), latex: '\\sin x+\\cos x', parity: 'none' },
    s6: { f: (x) => 2 * Math.sin(x), latex: '2\\sin x', parity: 'odd' }
}

/** The shifts T = kπ/2, k = 1 … 4, as LaTeX */
export const SHIFT_LABELS = ['\\frac{\\pi}{2}', '\\pi', '\\frac{3\\pi}{2}', '2\\pi']
export const SHIFT_LIMITS = { min: 1, max: 4 } as const

export interface SymmetryState {
    fn: SymmetryFunction
    mode: SymmetryMode
    /** T = kπ/2 */
    k: number
    prediction: Prediction | null
}

export const initialSymmetryState: SymmetryState = { fn: 's1', mode: 'mirror', k: 1, prediction: null }

/** A new function keeps the copy but asks for a new prediction */
export function setSymmetry(state: SymmetryState, patch: Partial<Omit<SymmetryState, 'prediction'>>): SymmetryState {
    const fn = patch.fn ?? state.fn
    const k = Math.min(SHIFT_LIMITS.max, Math.max(SHIFT_LIMITS.min, Math.round(patch.k ?? state.k)))
    return { fn, mode: patch.mode ?? state.mode, k, prediction: fn === state.fn ? state.prediction : null }
}

/** The copy as a function of x */
export function copyValue(state: Pick<SymmetryState, 'fn' | 'mode' | 'k'>, x: number): number {
    const f = SYMMETRY_SETUP[state.fn].f
    return state.mode === 'mirror' ? f(-x) : state.mode === 'origin' ? -f(-x) : f(x + (state.k * Math.PI) / 2)
}

/** The copy written as y = … */
export function copyLatex(state: Pick<SymmetryState, 'mode' | 'k'>): string {
    return state.mode === 'mirror' ? 'y=f(-x)' : state.mode === 'origin' ? 'y=-f(-x)' : `y=f(x+T)\\qquad T=${SHIFT_LABELS[state.k - 1]}`
}

/** Whether the copy falls on the curve */
export function copyMatches(state: Pick<SymmetryState, 'fn' | 'mode' | 'k'>): boolean {
    const f = SYMMETRY_SETUP[state.fn].f
    for (let x = -8; x <= 8; x += 0.05) if (Math.abs(copyValue(state, x) - f(x)) > 1e-9) return false
    return true
}

/** Odd (<), neither (=) or even (>) */
export const symmetryPrediction = (state: Pick<SymmetryState, 'fn'>): Prediction => ({ odd: '<', none: '=', even: '>' } as const)[SYMMETRY_SETUP[state.fn].parity]

const named = (fn: SymmetryFunction) => `$f(x)=${SYMMETRY_SETUP[fn].latex}$`

export const symmetryChallenges: LabChallenge<SymmetryState>[] = [
    {
        id: 125351,
        prompt: say(`${named('s2')} funtzioarekin, aukeratu kurbaren gainean erortzen den islapena.`, `Con ${named('s2')}, elige el reflejo que cae sobre la curva.`, `مع ${named('s2')}، اختر الانعكاس الذي يقع على المنحنى.`, `With ${named('s2')}, choose the reflection that falls on the curve.`),
        hint: say('$x$ bakarrik $x^2$ gisa agertzen da.', '$x$ solo aparece como $x^2$.', 'لا تظهر $x$ إلا في صورة $x^2$.', '$x$ only appears as $x^2$.'),
        isSolved: (state) => state.fn === 's2' && state.mode !== 'shift' && copyMatches(state)
    },
    {
        id: 125352,
        prompt: say(`${named('s1')} funtzioarekin, aukeratu kurbaren gainean erortzen den islapena.`, `Con ${named('s1')}, elige el reflejo que cae sobre la curva.`, `مع ${named('s1')}، اختر الانعكاس الذي يقع على المنحنى.`, `With ${named('s1')}, choose the reflection that falls on the curve.`),
        hint: same('$f(-x)=\\frac{-4x}{x^2+1}$'),
        isSolved: (state) => state.fn === 's1' && state.mode !== 'shift' && copyMatches(state)
    },
    {
        id: 125353,
        prompt: say(`${named('s4')} funtzioarekin, bilatu periodorik txikiena.`, `Con ${named('s4')}, busca el periodo más pequeño.`, `مع ${named('s4')}، ابحث عن أصغر دور.`, `With ${named('s4')}, find the smallest period.`),
        hint: say('$\\cos kx$ funtzioaren periodoa $\\frac{2\\pi}{k}$ da.', 'El periodo de $\\cos kx$ es $\\frac{2\\pi}{k}$.', 'دور $\\cos kx$ هو $\\frac{2\\pi}{k}$.', 'The period of $\\cos kx$ is $\\frac{2\\pi}{k}$.'),
        isSolved: (state) => state.fn === 's4' && state.mode === 'shift' && state.k === 2
    },
    {
        id: 125354,
        prompt: say(`${named('s5')} funtzioarekin, bilatu kurba bere horretan uzten duen $T$ desplazamendu bat.`, `Con ${named('s5')}, busca un desplazamiento $T$ que deje la curva igual.`, `مع ${named('s5')}، ابحث عن إزاحة $T$ تترك المنحنى كما هو.`, `With ${named('s5')}, find a shift $T$ that leaves the curve as it is.`),
        hint: say('Sinuak eta kosinuak $2\\pi$ bakoitzean errepikatzen dira.', 'El seno y el coseno se repiten cada $2\\pi$.', 'يتكرر الجيب وجيب التمام كل $2\\pi$.', 'The sine and the cosine repeat every $2\\pi$.'),
        isSolved: (state) => state.fn === 's5' && state.mode === 'shift' && copyMatches(state)
    },
    {
        id: 125355,
        prompt: say('Bilatu bakoitia eta periodikoa den funtzio bat, eta jarri haren periodoa.', 'Busca una función impar y periódica, y pon su periodo.', 'ابحث عن دالة فردية ودورية، وضع دورها.', 'Find a function that is odd and periodic, and set its period.'),
        hint: say('Sinua bakoitia da.', 'El seno es impar.', 'الجيب دالة فردية.', 'The sine is odd.'),
        isSolved: (state) => SYMMETRY_SETUP[state.fn].parity === 'odd' && state.mode === 'shift' && copyMatches(state)
    }
]

function same(text: string): LocalizedText {
    return say(text, text, text, text)
}

/** Endless practice: the reflection that falls on the curve, or a shift that is a period */
const symmetryMaker: LabChallengeMaker<SymmetryState> = (random) => {
    const options: Array<{ prompt: LocalizedText; hint: LocalizedText; isSolved: (state: SymmetryState) => boolean; solution: SymmetryState }> = []
    for (const fn of SYMMETRY_FUNCTIONS) {
        const parity = SYMMETRY_SETUP[fn].parity
        if (parity !== 'none') {
            const mode: SymmetryMode = parity === 'even' ? 'mirror' : 'origin'
            options.push({
                prompt: say(`${named(fn)} funtzioarekin, aukeratu kurbaren gainean erortzen den islapena.`, `Con ${named(fn)}, elige el reflejo que cae sobre la curva.`, `مع ${named(fn)}، اختر الانعكاس الذي يقع على المنحنى.`, `With ${named(fn)}, choose the reflection that falls on the curve.`),
                hint: say('Kalkulatu $f(-x)$ eta alderatu $f(x)$ funtzioarekin.', 'Calcula $f(-x)$ y compárala con $f(x)$.', 'احسب $f(-x)$ وقارنها بـ $f(x)$.', 'Work out $f(-x)$ and compare it with $f(x)$.'),
                isSolved: (state) => state.fn === fn && state.mode === mode,
                solution: { fn, mode, k: 1, prediction: null }
            })
        }
        for (let k = SHIFT_LIMITS.min; k <= SHIFT_LIMITS.max; k++) {
            if (!copyMatches({ fn, mode: 'shift', k })) continue
            const T = `$T=${SHIFT_LABELS[k - 1]}$`
            options.push({
                prompt: say(`${named(fn)} funtzioarekin, egiaztatu ${T} periodo bat dela.`, `Con ${named(fn)}, comprueba que ${T} es un periodo.`, `مع ${named(fn)}، تحقّق من أن ${T} دور.`, `With ${named(fn)}, check that ${T} is a period.`),
                hint: say('Erabili $f(x+T)$ kopia.', 'Usa la copia $f(x+T)$.', 'استعمل النسخة $f(x+T)$.', 'Use the copy $f(x+T)$.'),
                isSolved: (state) => state.fn === fn && state.mode === 'shift' && state.k === k,
                solution: { fn, mode: 'shift', k, prediction: null }
            })
        }
    }
    const chosen = options[randomInt(random, 0, options.length - 1)]
    return { prompt: chosen.prompt, hint: chosen.hint, isSolved: chosen.isSolved, solution: chosen.solution }
}

export const symmetryExtra = freshFrom(initialSymmetryState, symmetryMaker)
