import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Rollek puntua bilatzen du (Rolle busca el punto): a function and an
   interval [a, b] whose ends the learner steps along a list. When the
   three hypotheses hold (continuous on [a, b], differentiable on (a, b)
   and f(a) = f(b)), the board marks every c in (a, b) with a horizontal
   tangent; when one fails (a corner, a jump or different heights), it
   says which one and marks none. Before drawing, the learner predicts
   how many points c the starting interval has: none (<), one (=) or more
   than one (>).
   ========================================================================== */

export type RolleFunction = 'parabola' | 'cubic' | 'abs' | 'jump' | 'wave'

export const ROLLE_FUNCTIONS: RolleFunction[] = ['parabola', 'cubic', 'abs', 'jump', 'wave']

interface RolleSetup {
    f: (x: number) => number
    latex: string
    /** The values a and b step through, written in LaTeX */
    points: number[]
    labels: string[]
    /** The starting interval, as two indices of the list */
    start: [number, number]
    /** Where f′ = 0 */
    criticals: number[]
    /** Where f is not differentiable (a corner) and where it jumps */
    corners: number[]
    jumps: number[]
    view: { xMin: number; xMax: number; yMin: number; yMax: number }
}

const R3 = Math.sqrt(3)
const PI = Math.PI

export const ROLLE_SETUP: Record<RolleFunction, RolleSetup> = {
    parabola: { f: (x) => x * x - 2 * x, latex: 'x^2-2x', points: [-1, 0, 1, 2, 3], labels: ['-1', '0', '1', '2', '3'], start: [0, 4], criticals: [1], corners: [], jumps: [], view: { xMin: -2, xMax: 4, yMin: -1.5, yMax: 4.5 } },
    cubic: { f: (x) => x ** 3 - 3 * x, latex: 'x^3-3x', points: [-2, -R3, -1, 0, 1, R3, 2], labels: ['-2', '-\\sqrt{3}', '-1', '0', '1', '\\sqrt{3}', '2'], start: [1, 5], criticals: [-1, 1], corners: [], jumps: [], view: { xMin: -2.5, xMax: 2.5, yMin: -3, yMax: 3 } },
    abs: { f: Math.abs, latex: '|x|', points: [-2, -1, 0, 1, 2], labels: ['-2', '-1', '0', '1', '2'], start: [1, 3], criticals: [], corners: [0], jumps: [], view: { xMin: -2.5, xMax: 2.5, yMin: -0.8, yMax: 2.6 } },
    jump: { f: (x) => (x < 1 ? x : x - 2), latex: '\\begin{cases}x & x<1\\\\ x-2 & x\\ge 1\\end{cases}', points: [-1, 0, 1, 2, 3], labels: ['-1', '0', '1', '2', '3'], start: [1, 3], criticals: [], corners: [], jumps: [1], view: { xMin: -1.5, xMax: 3.5, yMin: -2, yMax: 1.6 } },
    wave: { f: Math.sin, latex: '\\sin x', points: [0, PI / 2, PI, (3 * PI) / 2, 2 * PI], labels: ['0', '\\frac{\\pi}{2}', '\\pi', '\\frac{3\\pi}{2}', '2\\pi'], start: [0, 2], criticals: [PI / 2, (3 * PI) / 2], corners: [], jumps: [], view: { xMin: -0.4, xMax: 6.8, yMin: -1.6, yMax: 1.6 } }
}

export interface RolleState {
    fn: RolleFunction
    /** The indices of a and b in the list of the function */
    a: number
    b: number
    prediction: Prediction | null
}

export const initialRolleState: RolleState = { fn: 'parabola', a: ROLLE_SETUP.parabola.start[0], b: ROLLE_SETUP.parabola.start[1], prediction: null }

/** A new function starts at its own interval and asks for a new prediction */
export function setRolle(state: RolleState, patch: Partial<Omit<RolleState, 'prediction'>>): RolleState {
    const fn = patch.fn ?? state.fn
    const setup = ROLLE_SETUP[fn]
    if (fn !== state.fn) return { fn, a: setup.start[0], b: setup.start[1], prediction: null }
    const last = setup.points.length - 1
    const clamp = (value: number) => Math.min(last, Math.max(0, Math.round(value)))
    return { fn, a: clamp(patch.a ?? state.a), b: clamp(patch.b ?? state.b), prediction: state.prediction }
}

export type RolleFailure = 'order' | 'jump' | 'corner' | 'heights' | null

export interface RolleResult {
    a: number
    b: number
    fa: number
    fb: number
    /** The first hypothesis that fails, or null when Rolle applies */
    failure: RolleFailure
    /** The points c in (a, b) with f′(c) = 0, when Rolle applies */
    cs: number[]
}

export function rolleResult(state: Pick<RolleState, 'fn' | 'a' | 'b'>): RolleResult {
    const setup = ROLLE_SETUP[state.fn]
    const a = setup.points[state.a]
    const b = setup.points[state.b]
    const fa = setup.f(a)
    const fb = setup.f(b)
    // A jump at j breaks continuity on [a, b] when a < j ≤ b (f is continuous from the right at j)
    const failure: RolleFailure = a >= b ? 'order'
        : setup.jumps.some((j) => a < j && j <= b + 1e-12) ? 'jump'
            : setup.corners.some((c) => a < c && c < b) ? 'corner'
                : Math.abs(fa - fb) > 1e-9 ? 'heights'
                    : null
    return { a, b, fa, fb, failure, cs: failure ? [] : setup.criticals.filter((c) => a < c - 1e-12 && c < b - 1e-12) }
}

/** How many points c: none (<), one (=) or more (>) */
const countKind = (count: number): Prediction => (count === 0 ? '<' : count === 1 ? '=' : '>')

/** At the starting interval of the function: how many points c? */
export function rollePrediction(state: Pick<RolleState, 'fn'>): Prediction {
    const [a, b] = ROLLE_SETUP[state.fn].start
    return countKind(rolleResult({ fn: state.fn, a, b }).cs.length)
}

const same = (text: string) => say(text, text, text, text)

export const rolleChallenges: LabChallenge<RolleState>[] = [
    {
        id: 124101,
        prompt: say('$x^2-2x$ funtzioarekin, aukeratu Rolle betetzen duen beste $[a,b]$ tarte bat.', 'Con $x^2-2x$, elige otro intervalo $[a,b]$ que cumpla Rolle.', 'مع $x^2-2x$، اختر فترة أخرى $[a,b]$ تحقق مبرهنة رول.', 'With $x^2-2x$, choose another interval $[a,b]$ that satisfies Rolle.'),
        hint: say('$f(a)=f(b)$ izateko, $a$ eta $b$ simetrikoak dira $x=1$ zuzenarekiko.', 'Para que $f(a)=f(b)$, $a$ y $b$ son simétricos respecto de $x=1$.', 'لكي يكون $f(a)=f(b)$ يجب أن تكون $a$ و$b$ متناظرتين بالنسبة إلى $x=1$.', 'For $f(a)=f(b)$, $a$ and $b$ are symmetric about $x=1$.'),
        isSolved: (state) => state.fn === 'parabola' && rolleResult(state).failure === null && !(state.a === 0 && state.b === 4)
    },
    {
        id: 124102,
        prompt: say('$x^3-3x$ funtzioarekin, aukeratu $c$ bakarra duen tarte bat.', 'Con $x^3-3x$, elige un intervalo con un solo $c$.', 'مع $x^3-3x$، اختر فترة فيها $c$ واحدة فقط.', 'With $x^3-3x$, choose an interval with only one $c$.'),
        hint: say('Zuzen ukitzaile horizontalak $x=-1$ eta $x=1$ puntuetan daude: tarteak bat bakarrik hartu behar du.', 'Las tangentes horizontales están en $x=-1$ y $x=1$: el intervalo debe tomar solo una.', 'المماسان الأفقيان عند $x=-1$ و$x=1$: يجب أن تحوي الفترة واحدًا فقط.', 'The horizontal tangents are at $x=-1$ and $x=1$: the interval must take only one.'),
        isSolved: (state) => state.fn === 'cubic' && rolleResult(state).cs.length === 1
    },
    {
        id: 124103,
        prompt: say('$|x|$ funtzioarekin, aukeratu $f(a)=f(b)$ duen tarte bat. Zergatik ez da $c$ punturik agertzen?', 'Con $|x|$, elige un intervalo con $f(a)=f(b)$. ¿Por qué no aparece ningún $c$?', 'مع $|x|$، اختر فترة يكون فيها $f(a)=f(b)$. لماذا لا تظهر أي $c$؟', 'With $|x|$, choose an interval with $f(a)=f(b)$. Why does no $c$ appear?'),
        hint: say('Begiratu $x=0$ puntuari: punta bat dago.', 'Mira en $x=0$: hay un pico.', 'انظر إلى $x=0$: توجد زاوية.', 'Look at $x=0$: there is a corner.'),
        isSolved: (state) => state.fn === 'abs' && rolleResult(state).failure === 'corner' && Math.abs(rolleResult(state).fa - rolleResult(state).fb) < 1e-9
    },
    {
        id: 124104,
        prompt: say('Jauzia duen funtzioarekin, aukeratu $f(a)=f(b)$ duen tarte bat, jauzia barruan duela.', 'Con la función con salto, elige un intervalo con $f(a)=f(b)$ que contenga el salto.', 'مع الدالة ذات القفزة، اختر فترة يكون فيها $f(a)=f(b)$ وتحوي القفزة.', 'With the function that jumps, choose an interval with $f(a)=f(b)$ that contains the jump.'),
        hint: say('Jauzia $x=1$ puntuan dago.', 'El salto está en $x=1$.', 'القفزة عند $x=1$.', 'The jump is at $x=1$.'),
        isSolved: (state) => state.fn === 'jump' && rolleResult(state).failure === 'jump' && Math.abs(rolleResult(state).fa - rolleResult(state).fb) < 1e-9
    },
    {
        id: 124105,
        prompt: say('$\\sin x$ funtzioarekin, aukeratu bi $c$ puntu dituen tarte bat.', 'Con $\\sin x$, elige un intervalo con dos puntos $c$.', 'مع $\\sin x$، اختر فترة فيها نقطتان $c$.', 'With $\\sin x$, choose an interval with two points $c$.'),
        hint: same('$\\sin 0=\\sin 2\\pi=0$'),
        isSolved: (state) => state.fn === 'wave' && rolleResult(state).cs.length === 2
    }
]

/** The function as the learner reads it in a prompt */
const named = (fn: RolleFunction) => `$${ROLLE_SETUP[fn].latex}$`

/** Endless practice: an interval where Rolle gives a given c, or two of them */
const rolleMaker: LabChallengeMaker<RolleState> = (random) => {
    const options: Array<{ prompt: LocalizedText; isSolved: (state: RolleState) => boolean; solution: RolleState }> = []
    for (const fn of ['cubic', 'wave'] as const) {
        const setup = ROLLE_SETUP[fn]
        const valid: Array<[number, number]> = []
        for (let a = 0; a < setup.points.length; a++) for (let b = a + 1; b < setup.points.length; b++) if (rolleResult({ fn, a, b }).failure === null && rolleResult({ fn, a, b }).cs.length) valid.push([a, b])
        for (const c of setup.criticals) {
            const label = setup.labels[setup.points.findIndex((point) => Math.abs(point - c) < 1e-9)] ?? (fn === 'cubic' ? String(c) : '')
            const pair = valid.find(([a, b]) => rolleResult({ fn, a, b }).cs.some((value) => Math.abs(value - c) < 1e-9))
            if (!pair || !label) continue
            const cLatex = `$c=${label}$`
            options.push({
                prompt: say(`${named(fn)} funtzioarekin, aukeratu Rollek ${cLatex} ematen duen tarte bat.`, `Con ${named(fn)}, elige un intervalo donde Rolle dé ${cLatex}.`, `مع ${named(fn)}، اختر فترة تعطي فيها مبرهنة رول ${cLatex}.`, `With ${named(fn)}, choose an interval where Rolle gives ${cLatex}.`),
                isSolved: (state) => state.fn === fn && rolleResult(state).cs.some((value) => Math.abs(value - c) < 1e-9),
                solution: { fn, a: pair[0], b: pair[1], prediction: null }
            })
        }
        const two = valid.find(([a, b]) => rolleResult({ fn, a, b }).cs.length === 2)
        if (two) options.push({
            prompt: say(`${named(fn)} funtzioarekin, aukeratu Rolleren bi $c$ puntu dituen tarte bat.`, `Con ${named(fn)}, elige un intervalo con dos puntos $c$ de Rolle.`, `مع ${named(fn)}، اختر فترة فيها نقطتان $c$ لمبرهنة رول.`, `With ${named(fn)}, choose an interval with two Rolle points $c$.`),
            isSolved: (state) => state.fn === fn && rolleResult(state).cs.length === 2,
            solution: { fn, a: two[0], b: two[1], prediction: null }
        })
        const one = valid.filter(([a, b]) => rolleResult({ fn, a, b }).cs.length === 1)
        if (one.length) {
            const [a, b] = one[randomInt(random, 0, one.length - 1)]
            const interval = `$[${setup.labels[a]},\\,${setup.labels[b]}]$`
            options.push({
                prompt: say(`${named(fn)} funtzioarekin, jarri ${interval} tartea eta begiratu zenbat $c$ dauden.`, `Con ${named(fn)}, pon el intervalo ${interval} y mira cuántos $c$ hay.`, `مع ${named(fn)}، ضع الفترة ${interval} وانظر كم $c$ توجد.`, `With ${named(fn)}, set the interval ${interval} and see how many $c$ there are.`),
                isSolved: (state) => state.fn === fn && state.a === a && state.b === b,
                solution: { fn, a, b, prediction: null }
            })
        }
    }
    const chosen = options[randomInt(random, 0, options.length - 1)]
    return { prompt: chosen.prompt, hint: say('Lehenik $f(a)=f(b)$, gero zuzen ukitzaile horizontalak barruan.', 'Primero $f(a)=f(b)$, después las tangentes horizontales dentro.', 'أولًا $f(a)=f(b)$، ثم المماسات الأفقية في الداخل.', 'First $f(a)=f(b)$, then the horizontal tangents inside.'), isSolved: chosen.isSolved, solution: chosen.solution }
}

export const rolleExtra = freshFrom(initialRolleState, rolleMaker)
