import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L4 · ¿Derivable aquí?: a curved piece for x < 1 and the line y = mx + n
   for x ≥ 1. The learner moves m and n: if the line does not start where
   the piece ends there is a jump; if it does but with another slope there
   is a corner; with the same value and the same slope the function is
   differentiable at 1. Before the graph is shown, the learner predicts
   whether the line that joins smoothly goes down, is horizontal or goes
   up (the sign of the slope of the piece at 1). ▶ walks a tangent along
   the curve and on along the line.
   ========================================================================== */

export type SmoothPiece = 'square' | 'cubic' | 'cap' | 'flat'

export const SMOOTH_PIECES: SmoothPiece[] = ['square', 'cubic', 'cap', 'flat']

export const SMOOTH_JOIN = 1

export const SMOOTH_LIMITS = { m: { min: -4, max: 4 }, n: { min: -6, max: 6 } } as const

interface PieceSetup {
    fn: (x: number) => number
    derivative: (x: number) => number
    latex: string
}

export const SMOOTH_SETUP: Record<SmoothPiece, PieceSetup> = {
    square: { fn: (x) => x * x, derivative: (x) => 2 * x, latex: 'x^2' },
    cubic: { fn: (x) => x ** 3, derivative: (x) => 3 * x * x, latex: 'x^3' },
    cap: { fn: (x) => 4 - x * x, derivative: (x) => -2 * x, latex: '4-x^2' },
    flat: { fn: (x) => x ** 3 - 3 * x, derivative: (x) => 3 * x * x - 3, latex: 'x^3-3x' }
}

export interface SmoothState {
    piece: SmoothPiece
    m: number
    n: number
    prediction: Prediction | null
}

export const initialSmoothState: SmoothState = { piece: 'square', m: 0, n: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** Only a new piece asks for a new prediction */
export function setSmooth(state: SmoothState, patch: Partial<Omit<SmoothState, 'prediction'>>): SmoothState {
    const piece = patch.piece ?? state.piece
    const m = clamp(patch.m ?? state.m, SMOOTH_LIMITS.m.min, SMOOTH_LIMITS.m.max)
    const n = clamp(patch.n ?? state.n, SMOOTH_LIMITS.n.min, SMOOTH_LIMITS.n.max)
    return { piece, m, n, prediction: piece === state.piece ? state.prediction : null }
}

/** The value and the slope of the piece where it meets the line */
export function pieceEnd(piece: SmoothPiece): { value: number; slope: number } {
    const { fn, derivative } = SMOOTH_SETUP[piece]
    return { value: fn(SMOOTH_JOIN), slope: derivative(SMOOTH_JOIN) }
}

export type SmoothKind = 'jump' | 'corner' | 'smooth'

export function smoothKind(state: SmoothState): SmoothKind {
    const { value, slope } = pieceEnd(state.piece)
    if (state.m * SMOOTH_JOIN + state.n !== value) return 'jump'
    return state.m === slope ? 'smooth' : 'corner'
}

/** The line that joins smoothly goes down (<), is horizontal (=) or goes up (>) */
export const smoothPrediction = (state: SmoothState): Prediction => compareTo(pieceEnd(state.piece).slope, 0)

/** The line y = mx + n in LaTeX */
export function lineLatex(m: number, n: number): string {
    const slope = m === 0 ? '' : m === 1 ? 'x' : m === -1 ? '-x' : `${m}x`
    if (!slope) return String(n)
    return n === 0 ? slope : `${slope}${n > 0 ? '+' : '-'}${Math.abs(n)}`
}

/** The whole function in LaTeX */
export const smoothLatex = (state: SmoothState) => `f(x)=\\begin{cases}${SMOOTH_SETUP[state.piece].latex} & x<1\\\\ ${lineLatex(state.m, state.n)} & x\\ge 1\\end{cases}`

const isSmooth = (state: SmoothState, piece: SmoothPiece) => state.piece === piece && smoothKind(state) === 'smooth'

export const smoothChallenges: LabChallenge<SmoothState>[] = [
    {
        id: 110301,
        prompt: say('$x^2$ zatiarekin, egin funtzioa jarraitua 1 puntuan, baina punta batekin.', 'Con el trozo $x^2$, haz que la función sea continua en 1, pero con un pico.', 'مع الجزء $x^2$ اجعل الدالة متصلة عند 1 لكن مع زاوية.', 'With the piece $x^2$, make the function continuous at 1, but with a corner.'),
        hint: say('Zuzenak $(1,\\,1)$ puntutik pasatu behar du, 2 ez den maldarekin.', 'La recta tiene que pasar por $(1,\\,1)$ con una pendiente distinta de 2.', 'يجب أن يمر المستقيم بالنقطة $(1,\\,1)$ بميل غير 2.', 'The line has to go through $(1,\\,1)$ with a slope other than 2.'),
        isSolved: (state) => state.piece === 'square' && smoothKind(state) === 'corner'
    },
    {
        id: 110302,
        prompt: say('$x^2$ zatiarekin, egin funtzioa deribagarria 1 puntuan.', 'Con el trozo $x^2$, haz que la función sea derivable en 1.', 'مع الجزء $x^2$ اجعل الدالة قابلة للاشتقاق عند 1.', 'With the piece $x^2$, make the function differentiable at 1.'),
        hint: say('Balioa $1^2=1$ eta malda $2\\cdot 1=2$.', 'Valor $1^2=1$ y pendiente $2\\cdot 1=2$.', 'القيمة $1^2=1$ والميل $2\\cdot 1=2$.', 'Value $1^2=1$ and slope $2\\cdot 1=2$.'),
        isSolved: (state) => isSmooth(state, 'square')
    },
    {
        id: 110303,
        prompt: say('$4-x^2$ zatiarekin, egin funtzioa deribagarria 1 puntuan.', 'Con el trozo $4-x^2$, haz que la función sea derivable en 1.', 'مع الجزء $4-x^2$ اجعل الدالة قابلة للاشتقاق عند 1.', 'With the piece $4-x^2$, make the function differentiable at 1.'),
        hint: say('Balioa 3 eta malda $-2$.', 'Valor 3 y pendiente $-2$.', 'القيمة 3 والميل $-2$.', 'Value 3 and slope $-2$.'),
        isSolved: (state) => isSmooth(state, 'cap')
    },
    {
        id: 110304,
        prompt: say('$x^3$ zatiarekin, egin funtzioa deribagarria 1 puntuan.', 'Con el trozo $x^3$, haz que la función sea derivable en 1.', 'مع الجزء $x^3$ اجعل الدالة قابلة للاشتقاق عند 1.', 'With the piece $x^3$, make the function differentiable at 1.'),
        hint: say('Malda $3\\cdot 1^2=3$.', 'Pendiente $3\\cdot 1^2=3$.', 'الميل $3\\cdot 1^2=3$.', 'Slope $3\\cdot 1^2=3$.'),
        isSolved: (state) => isSmooth(state, 'cubic')
    },
    {
        id: 110305,
        prompt: say('$x^3-3x$ zatiarekin, egin funtzioa deribagarria 1 puntuan: zuzena horizontala da.', 'Con el trozo $x^3-3x$, haz que la función sea derivable en 1: la recta sale horizontal.', 'مع الجزء $x^3-3x$ اجعل الدالة قابلة للاشتقاق عند 1: يخرج المستقيم أفقيًّا.', 'With the piece $x^3-3x$, make the function differentiable at 1: the line comes out horizontal.'),
        hint: say('Balioa $-2$ eta malda 0.', 'Valor $-2$ y pendiente 0.', 'القيمة $-2$ والميل 0.', 'Value $-2$ and slope 0.'),
        isSolved: (state) => isSmooth(state, 'flat')
    }
]

/** Endless practice: a smooth join, a corner with a given slope, or a jump with the right slope and a given n */
const smoothMaker: LabChallengeMaker<SmoothState> = (random) => {
    const piece = SMOOTH_PIECES[randomInt(random, 0, SMOOTH_PIECES.length - 1)]
    const { value, slope } = pieceEnd(piece)
    const formula = `$${SMOOTH_SETUP[piece].latex}$`
    const goal = randomInt(random, 0, 2)
    if (goal === 0) {
        return {
            prompt: say(`${formula} zatiarekin, egin funtzioa deribagarria 1 puntuan.`, `Con el trozo ${formula}, haz que la función sea derivable en 1.`, `مع الجزء ${formula} اجعل الدالة قابلة للاشتقاق عند 1.`, `With the piece ${formula}, make the function differentiable at 1.`),
            hint: say('Balio bera eta malda bera 1 puntuan.', 'El mismo valor y la misma pendiente en 1.', 'القيمة نفسها والميل نفسه عند 1.', 'The same value and the same slope at 1.'),
            isSolved: (state) => isSmooth(state, piece),
            solution: { piece, m: slope, n: value - slope, prediction: null }
        }
    }
    if (goal === 1) {
        // A corner with a slope m other than the piece's, and the line still through (1, value)
        const options = Array.from({ length: 9 }, (_, i) => i - 4).filter((m) => m !== slope && Math.abs(value - m) <= SMOOTH_LIMITS.n.max)
        const m = options[randomInt(random, 0, options.length - 1)]
        return {
            prompt: say(`${formula} zatiarekin eta $m=${m}$ maldarekin, egin funtzioa jarraitua 1 puntuan: punta bat izango du.`, `Con el trozo ${formula} y pendiente $m=${m}$, haz que la función sea continua en 1: tendrá un pico.`, `مع الجزء ${formula} والميل $m=${m}$ اجعل الدالة متصلة عند 1: ستكون لها زاوية.`, `With the piece ${formula} and slope $m=${m}$, make the function continuous at 1: it will have a corner.`),
            hint: say('Zuzenak zatiaren amaieratik abiatu behar du.', 'La recta tiene que salir del final del trozo.', 'يجب أن ينطلق المستقيم من نهاية الجزء.', 'The line has to start at the end of the piece.'),
            isSolved: (state) => state.piece === piece && state.m === m && smoothKind(state) === 'corner',
            solution: { piece, m, n: value - m, prediction: null }
        }
    }
    // A jump with the same slope: n given, different from the smooth one
    const smoothN = value - slope
    const options = Array.from({ length: 13 }, (_, i) => i - 6).filter((n) => n !== smoothN)
    const n = options[randomInt(random, 0, options.length - 1)]
    return {
        prompt: say(`${formula} zatiarekin eta $n=${n}$ hartuta, egin zatiek malda bera izan dezaten 1 puntuan: jauzia geratuko da.`, `Con el trozo ${formula} y $n=${n}$, haz que los trozos lleguen con la misma pendiente a 1: quedará un salto.`, `مع الجزء ${formula} و$n=${n}$ اجعل الجزأين يصلان بالميل نفسه إلى 1: ستبقى قفزة.`, `With the piece ${formula} and $n=${n}$, make the pieces arrive at 1 with the same slope: a jump will remain.`),
        hint: say('Malda bera, baina zuzena ez da zatiaren amaieratik abiatzen.', 'La misma pendiente, pero la recta no sale del final del trozo.', 'الميل نفسه، لكن المستقيم لا ينطلق من نهاية الجزء.', 'The same slope, but the line does not start at the end of the piece.'),
        isSolved: (state) => state.piece === piece && state.m === slope && state.n === n,
        solution: { piece, m: slope, n, prediction: null }
    }
}

export const smoothExtra = freshFrom(initialSmoothState, smoothMaker)
