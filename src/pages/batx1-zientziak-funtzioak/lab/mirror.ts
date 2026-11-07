import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../text.ts'

/* ==========================================================================
   L3 · y = x ispilua (El espejo y = x): a curve (parabola, |x|, 2ˣ or a
   line, moved by v and w) and a cut that keeps all of it, the part x ≥ cut
   or the part x ≤ cut. A horizontal line y = h tests whether the kept part
   is injective: before it is drawn the learner predicts how many times the
   line cuts it (none, once, twice). Then ▶ folds the kept part over y = x:
   its mirror is the inverse, a function only when every horizontal line
   cut the kept part at most once. Pure logic, whole parameters only.
   ========================================================================== */

export type MirrorFamily = 'parabola' | 'abs' | 'exp' | 'line'
export type MirrorSide = 'all' | 'right' | 'left'

export const MIRROR_FAMILIES: MirrorFamily[] = ['parabola', 'abs', 'exp', 'line']
export const MIRROR_LIMITS = { v: { min: -3, max: 3 }, w: { min: -3, max: 3 }, cut: { min: -4, max: 4 }, probe: { min: -4, max: 6 } } as const

export interface MirrorState {
    family: MirrorFamily
    v: number
    w: number
    side: MirrorSide
    cut: number
    /** The horizontal line y = probe */
    probe: number
    prediction: Prediction | null
}

export const initialMirrorState: MirrorState = { family: 'parabola', v: 0, w: 0, side: 'all', cut: 0, probe: 2, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setMirror(state: MirrorState, patch: Partial<Omit<MirrorState, 'prediction'>>): MirrorState {
    const next = {
        family: patch.family ?? state.family,
        v: clamp(patch.v ?? state.v, MIRROR_LIMITS.v.min, MIRROR_LIMITS.v.max),
        w: clamp(patch.w ?? state.w, MIRROR_LIMITS.w.min, MIRROR_LIMITS.w.max),
        side: patch.side ?? state.side,
        cut: clamp(patch.cut ?? state.cut, MIRROR_LIMITS.cut.min, MIRROR_LIMITS.cut.max),
        probe: clamp(patch.probe ?? state.probe, MIRROR_LIMITS.probe.min, MIRROR_LIMITS.probe.max)
    }
    const same = (Object.keys(next) as Array<keyof typeof next>).every((key) => next[key] === state[key])
    return { ...next, prediction: same ? state.prediction : null }
}

/** The curve: (x − v)² + w, |x − v| + w, 2^(x − v) + w or 2(x − v) + w */
export function mirrorValue(state: Pick<MirrorState, 'family' | 'v' | 'w'>, x: number): number {
    const t = x - state.v
    if (state.family === 'parabola') return t * t + state.w
    if (state.family === 'abs') return Math.abs(t) + state.w
    if (state.family === 'exp') return 2 ** t + state.w
    return 2 * t + state.w
}

/** Whether x is in the part that is kept */
export const isKept = (state: Pick<MirrorState, 'side' | 'cut'>, x: number) => state.side === 'all' || (state.side === 'right' ? x >= state.cut - 1e-9 : x <= state.cut + 1e-9)

/** The x where the curve takes the value h (before the cut) */
export function preimages(state: Pick<MirrorState, 'family' | 'v' | 'w'>, h: number): number[] {
    const d = h - state.w
    if (state.family === 'parabola') return d < 0 ? [] : d === 0 ? [state.v] : [state.v - Math.sqrt(d), state.v + Math.sqrt(d)]
    if (state.family === 'abs') return d < 0 ? [] : d === 0 ? [state.v] : [state.v - d, state.v + d]
    if (state.family === 'exp') return d <= 0 ? [] : [state.v + Math.log2(d)]
    return [state.v + d / 2]
}

/** The points where y = probe cuts the kept part */
export const cutsOfProbe = (state: MirrorState) => preimages(state, state.probe).filter((x) => isKept(state, x))

/** None (<), once (=) or twice (>) */
export const mirrorPrediction = (state: MirrorState): Prediction => compareTo(cutsOfProbe(state).length, 1)

/** The kept part is injective: no horizontal line cuts it twice */
export function keptIsInjective(state: Pick<MirrorState, 'family' | 'v' | 'side' | 'cut'>): boolean {
    if (state.family === 'exp' || state.family === 'line') return true
    if (state.side === 'right') return state.cut >= state.v
    if (state.side === 'left') return state.cut <= state.v
    return false
}

const signed = (value: number) => (value > 0 ? `+${value}` : value < 0 ? `-${-value}` : '')
const shifted = (v: number) => (v === 0 ? 'x' : `x${signed(-v)}`)

/** The curve in LaTeX */
export function mirrorLatex(state: Pick<MirrorState, 'family' | 'v' | 'w'>): string {
    const inner = shifted(state.v)
    const body = state.family === 'parabola' ? (state.v === 0 ? 'x^2' : `(${inner})^2`)
        : state.family === 'abs' ? `|${inner}|`
            : state.family === 'exp' ? `2^{${inner}}`
                : state.v === 0 ? '2x' : `2(${inner})`
    return `y=${body}${signed(state.w)}`
}

/** The kept part in LaTeX: x ≥ 2, x ≤ −1 or nothing */
export const sideLatex = (state: Pick<MirrorState, 'side' | 'cut'>) => (state.side === 'all' ? '' : `x${state.side === 'right' ? '\\ge' : '\\le'} ${state.cut}`)

export const mirrorChallenges: LabChallenge<MirrorState>[] = [
    {
        id: 108301,
        prompt: say('$y=x^2$ funtzioarekin, gorde adar bat, alderantzizkoa izan dezan.', 'Con $y=x^2$, quédate con una rama para que tenga inversa.', 'مع $y=x^2$ احتفظ بفرع واحد كي تكون لها عكسية.', 'With $y=x^2$, keep one branch so that it has an inverse.'),
        hint: say('Moztu erpinean, $x=0$ puntuan, eta gorde alde bat.', 'Corta en el vértice, en $x=0$, y quédate con un lado.', 'اقطع عند الرأس $x=0$ واحتفظ بجانب واحد.', 'Cut at the vertex, at $x=0$, and keep one side.'),
        isSolved: (state) => state.family === 'parabola' && state.v === 0 && state.w === 0 && state.side !== 'all' && keptIsInjective(state)
    },
    {
        id: 108302,
        prompt: say('$y=(x-2)^2-1$ funtzioarekin, gorde eskuineko adar osoa, $x\\ge 2$.', 'Con $y=(x-2)^2-1$, quédate con toda la rama derecha, $x\\ge 2$.', 'مع $y=(x-2)^2-1$ احتفظ بالفرع الأيمن كله، $x\\ge 2$.', 'With $y=(x-2)^2-1$, keep the whole right branch, $x\\ge 2$.'),
        hint: say('Erpina $(2,-1)$ puntuan dago.', 'El vértice está en $(2,-1)$.', 'الرأس عند $(2,-1)$.', 'The vertex is at $(2,-1)$.'),
        isSolved: (state) => state.family === 'parabola' && state.v === 2 && state.w === -1 && state.side === 'right' && state.cut === 2
    },
    {
        id: 108303,
        prompt: say('$y=x^2-3$ osoarekin, jarri zuzen horizontala bi aldiz mozten duen lekuan.', 'Con $y=x^2-3$ entera, pon la recta horizontal donde la corta dos veces.', 'مع $y=x^2-3$ كاملة ضع المستقيم الأفقي حيث يقطعها مرتين.', 'With the whole of $y=x^2-3$, put the horizontal line where it cuts it twice.'),
        hint: say('Zuzenak erpinaren gainetik joan behar du.', 'La recta tiene que pasar por encima del vértice.', 'يجب أن يمر المستقيم فوق الرأس.', 'The line must pass above the vertex.'),
        isSolved: (state) => state.family === 'parabola' && state.v === 0 && state.w === -3 && state.side === 'all' && cutsOfProbe(state).length === 2
    },
    {
        id: 108304,
        prompt: say('Aukeratu $\\mathbb{R}$ osoan alderantzizkoa duen funtzio bat, ezer moztu gabe.', 'Elige una función que tenga inversa en todo $\\mathbb{R}$, sin cortar nada.', 'اختر دالة لها عكسية على كل $\\mathbb{R}$ دون قطع أي شيء.', 'Choose a function that has an inverse on the whole of $\\mathbb{R}$, without cutting anything.'),
        hint: say('Beti gora doan funtzio bat.', 'Una que siempre sube.', 'دالة تصعد دائمًا.', 'One that always goes up.'),
        isSolved: (state) => state.side === 'all' && keptIsInjective(state)
    },
    {
        id: 108305,
        prompt: say('$y=|x+1|$ funtzioarekin, gorde $x\\le -1$ adarra eta jarri zuzena $y=4$ lekuan.', 'Con $y=|x+1|$, quédate con la rama $x\\le -1$ y pon la recta en $y=4$.', 'مع $y=|x+1|$ احتفظ بالفرع $x\\le -1$ وضع المستقيم عند $y=4$.', 'With $y=|x+1|$, keep the branch $x\\le -1$ and put the line at $y=4$.'),
        hint: say('Zuzenak behin bakarrik moztu behar du.', 'La recta tiene que cortarla una sola vez.', 'يجب أن يقطعها المستقيم مرة واحدة.', 'The line has to cut it only once.'),
        isSolved: (state) => state.family === 'abs' && state.v === -1 && state.w === 0 && state.side === 'left' && state.cut === -1 && state.probe === 4
    }
]

/** Endless practice: keep the right or the left branch of a parabola or of |x| */
const mirrorMaker: LabChallengeMaker<MirrorState> = (random) => {
    const family = pick(random, ['parabola', 'abs'] as const)
    const v = randomInt(random, -3, 3)
    const w = randomInt(random, -3, 3)
    const side = pick(random, ['right', 'left'] as const)
    const latex = mirrorLatex({ family, v, w })
    const kept = sideLatex({ side, cut: v })
    return {
        prompt: say(`$${latex}$ funtzioarekin, gorde $${kept}$ adarra.`, `Con $${latex}$, quédate con la rama $${kept}$.`, `مع $${latex}$ احتفظ بالفرع $${kept}$.`, `With $${latex}$, keep the branch $${kept}$.`),
        hint: say('Moztu erpinean.', 'Corta en el vértice.', 'اقطع عند الرأس.', 'Cut at the vertex.'),
        isSolved: (state) => state.family === family && state.v === v && state.w === w && state.side === side && state.cut === v,
        solution: { family, v, w, side, cut: v, probe: initialMirrorState.probe, prediction: null }
    }
}

export const mirrorExtra = freshFrom(initialMirrorState, mirrorMaker)
