import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Balio absolutuaren ispilua (El espejo del valor absoluto): a
   function f and three views of it: f itself, |f(x)| (what is below the
   X axis is reflected upwards) and f(|x|) (the part with x ≥ 0 is copied
   to the left). The board marks the corners of the view and a point x₀
   that the learner steps along. Before drawing, the learner predicts how
   many corners |f(x)| will have: fewer than two (<), two (=) or more (>).
   Unlike «Fold the absolute value» of 4.º, it also shows f(|x|), counts
   the corners and asks to stand on them.
   ========================================================================== */

export type MirrorFunction = 'f1' | 'f2' | 'f3' | 'f4' | 'f5'
export type MirrorMode = 'f' | 'abs' | 'even'

export const MIRROR_FUNCTIONS: MirrorFunction[] = ['f1', 'f2', 'f3', 'f4', 'f5']
export const MIRROR_MODES: MirrorMode[] = ['f', 'abs', 'even']

interface MirrorSetup {
    f: (x: number) => number
    latex: string
    /** f(|x|) written out */
    evenLatex: string
    /** Where f changes sign (the corners of |f(x)|) */
    signChanges: number[]
    /** Where f(|x|) has a corner (x = 0 when f′(0) ≠ 0) */
    evenCorners: number[]
    /** The minima of f(|x|) */
    evenMinima: number[]
    view: { yMin: number; yMax: number }
}

const R = 2 / Math.sqrt(3)

export const MIRROR_SETUP: Record<MirrorFunction, MirrorSetup> = {
    f1: { f: (x) => x * x - 2 * x - 3, latex: 'x^2-2x-3', evenLatex: 'x^2-2|x|-3', signChanges: [-1, 3], evenCorners: [0], evenMinima: [-1, 1], view: { yMin: -5, yMax: 7 } },
    f2: { f: (x) => x ** 3 - 4 * x, latex: 'x^3-4x', evenLatex: '|x|^3-4|x|', signChanges: [-2, 0, 2], evenCorners: [0], evenMinima: [-R, R], view: { yMin: -6, yMax: 6 } },
    f3: { f: (x) => x - 2, latex: 'x-2', evenLatex: '|x|-2', signChanges: [2], evenCorners: [0], evenMinima: [0], view: { yMin: -5, yMax: 5 } },
    f4: { f: (x) => x * x - 4, latex: 'x^2-4', evenLatex: 'x^2-4', signChanges: [-2, 2], evenCorners: [], evenMinima: [0], view: { yMin: -5, yMax: 7 } },
    f5: { f: (x) => x * x + 1, latex: 'x^2+1', evenLatex: 'x^2+1', signChanges: [], evenCorners: [], evenMinima: [0], view: { yMin: -3, yMax: 9 } }
}

/** The values x₀ steps through: from −4 to 4 every half unit */
export const MIRROR_XS = Array.from({ length: 17 }, (_, k) => -4 + k / 2)
const ZERO = MIRROR_XS.indexOf(0)

export interface MirrorState {
    fn: MirrorFunction
    mode: MirrorMode
    /** The index of x₀ in MIRROR_XS */
    x: number
    prediction: Prediction | null
}

export const initialMirrorState: MirrorState = { fn: 'f1', mode: 'f', x: ZERO, prediction: null }

/** A new function goes back to f itself and asks for a new prediction */
export function setMirror(state: MirrorState, patch: Partial<Omit<MirrorState, 'prediction'>>): MirrorState {
    const fn = patch.fn ?? state.fn
    if (fn !== state.fn) return { fn, mode: 'f', x: ZERO, prediction: null }
    const x = Math.min(MIRROR_XS.length - 1, Math.max(0, Math.round(patch.x ?? state.x)))
    return { fn, mode: patch.mode ?? state.mode, x, prediction: state.prediction }
}

/** The view as a function of x */
export function mirrorValue(fn: MirrorFunction, mode: MirrorMode, x: number): number {
    const f = MIRROR_SETUP[fn].f
    return mode === 'abs' ? Math.abs(f(x)) : mode === 'even' ? f(Math.abs(x)) : f(x)
}

/** The corners of the view (f itself has none) */
export function mirrorCorners(fn: MirrorFunction, mode: MirrorMode): number[] {
    const setup = MIRROR_SETUP[fn]
    return mode === 'abs' ? setup.signChanges : mode === 'even' ? setup.evenCorners : []
}

/** The view written as y = … */
export function mirrorLatex(fn: MirrorFunction, mode: MirrorMode): string {
    const setup = MIRROR_SETUP[fn]
    return mode === 'abs' ? `y=|${setup.latex}|` : mode === 'even' ? `y=${setup.evenLatex}` : `y=${setup.latex}`
}

/** How many corners |f(x)| has, against two */
export const mirrorPrediction = (state: Pick<MirrorState, 'fn'>): Prediction => compareTo(MIRROR_SETUP[state.fn].signChanges.length, 2)

const near = (value: number, list: number[]) => list.some((item) => Math.abs(item - value) < 1e-9)
const onCorner = (state: MirrorState) => near(MIRROR_XS[state.x], mirrorCorners(state.fn, state.mode))
const named = (fn: MirrorFunction) => `$f(x)=${MIRROR_SETUP[fn].latex}$`

export const mirrorChallenges: LabChallenge<MirrorState>[] = [
    {
        id: 125201,
        prompt: say(`${named('f1')} funtzioarekin, erakutsi $|f(x)|$ eta jarri puntua punta batean.`, `Con ${named('f1')}, muestra $|f(x)|$ y pon el punto en un pico.`, `مع ${named('f1')}، اعرض $|f(x)|$ وضع النقطة على زاوية.`, `With ${named('f1')}, show $|f(x)|$ and put the point on a corner.`),
        hint: say('Puntak $f$ funtzioaren zeroetan daude.', 'Los picos están en los ceros de $f$.', 'الزوايا عند أصفار $f$.', 'The corners are at the zeros of $f$.'),
        isSolved: (state) => state.fn === 'f1' && state.mode === 'abs' && onCorner(state)
    },
    {
        id: 125202,
        prompt: say('Bilatu $|f(x)|$ funtzioak hiru punta dituen funtzio bat.', 'Busca una función cuya $|f(x)|$ tenga tres picos.', 'ابحث عن دالة يكون في $|f(x)|$ ثلاث زوايا.', 'Find a function whose $|f(x)|$ has three corners.'),
        hint: say('Hiru zero behar ditu, eta $f$ funtzioak zeinua aldatu behar du haietan.', 'Necesita tres ceros en los que $f$ cambie de signo.', 'يلزم ثلاثة أصفار تغيّر عندها $f$ إشارتها.', 'It needs three zeros where $f$ changes sign.'),
        isSolved: (state) => state.mode === 'abs' && mirrorCorners(state.fn, 'abs').length === 3
    },
    {
        id: 125203,
        prompt: say('Bilatu $|f(x)|$ funtzioak punta bakar bat ere ez duen funtzio bat.', 'Busca una función cuya $|f(x)|$ no tenga ningún pico.', 'ابحث عن دالة لا يكون في $|f(x)|$ أي زاوية.', 'Find a function whose $|f(x)|$ has no corner at all.'),
        hint: say('$f$ inoiz negatiboa ez bada, $|f(x)|=f(x)$.', 'Si $f$ nunca es negativa, $|f(x)|=f(x)$.', 'إذا لم تكن $f$ سالبة أبدًا فإن $|f(x)|=f(x)$.', 'If $f$ is never negative, $|f(x)|=f(x)$.'),
        isSolved: (state) => state.mode === 'abs' && mirrorCorners(state.fn, 'abs').length === 0
    },
    {
        id: 125204,
        prompt: say(`${named('f2')} funtzioarekin, erakutsi $f(|x|)$ eta jarri puntua haren puntan.`, `Con ${named('f2')}, muestra $f(|x|)$ y pon el punto en su pico.`, `مع ${named('f2')}، اعرض $f(|x|)$ وضع النقطة على زاويتها.`, `With ${named('f2')}, show $f(|x|)$ and put the point on its corner.`),
        hint: say('$f(|x|)$ funtzioak eskuineko zatia kopiatzen du: lotunea $x=0$ puntuan dago.', '$f(|x|)$ copia la parte derecha: la unión está en $x=0$.', 'تنسخ $f(|x|)$ الجزء الأيمن: نقطة الالتقاء عند $x=0$.', '$f(|x|)$ copies the right-hand part: the joint is at $x=0$.'),
        isSolved: (state) => state.fn === 'f2' && state.mode === 'even' && onCorner(state)
    },
    {
        id: 125205,
        prompt: say('Bilatu $x^2+1$ ez den funtzio bat, haren $f(|x|)$ funtzioak puntarik ez duela.', 'Busca una función, distinta de $x^2+1$, cuya $f(|x|)$ no tenga pico.', 'ابحث عن دالة غير $x^2+1$ لا يكون في $f(|x|)$ الخاصة بها زاوية.', 'Find a function, other than $x^2+1$, whose $f(|x|)$ has no corner.'),
        hint: say('$f$ bikoitia bada, $f(|x|)=f(x)$.', 'Si $f$ es par, $f(|x|)=f(x)$.', 'إذا كانت $f$ زوجية فإن $f(|x|)=f(x)$.', 'If $f$ is even, $f(|x|)=f(x)$.'),
        isSolved: (state) => state.mode === 'even' && state.fn !== 'f5' && mirrorCorners(state.fn, 'even').length === 0
    }
]

/** Endless practice: stand on a corner of |f(x)| or of f(|x|), or on a minimum of f(|x|) */
const mirrorMaker: LabChallengeMaker<MirrorState> = (random) => {
    const options: Array<{ prompt: LocalizedText; hint: LocalizedText; fn: MirrorFunction; mode: MirrorMode; targets: number[] }> = []
    const inList = (values: number[]) => values.filter((value) => near(value, MIRROR_XS))
    for (const fn of MIRROR_FUNCTIONS) {
        const setup = MIRROR_SETUP[fn]
        const absCorners = inList(setup.signChanges)
        if (absCorners.length) options.push({
            fn, mode: 'abs', targets: absCorners,
            prompt: say(`${named(fn)} funtzioarekin, erakutsi $|f(x)|$ eta jarri puntua punta batean.`, `Con ${named(fn)}, muestra $|f(x)|$ y pon el punto en un pico.`, `مع ${named(fn)}، اعرض $|f(x)|$ وضع النقطة على زاوية.`, `With ${named(fn)}, show $|f(x)|$ and put the point on a corner.`),
            hint: say('Puntak $f$ funtzioaren zeroetan daude.', 'Los picos están en los ceros de $f$.', 'الزوايا عند أصفار $f$.', 'The corners are at the zeros of $f$.')
        })
        const evenCorners = inList(setup.evenCorners)
        if (evenCorners.length) options.push({
            fn, mode: 'even', targets: evenCorners,
            prompt: say(`${named(fn)} funtzioarekin, erakutsi $f(|x|)$ eta jarri puntua haren puntan.`, `Con ${named(fn)}, muestra $f(|x|)$ y pon el punto en su pico.`, `مع ${named(fn)}، اعرض $f(|x|)$ وضع النقطة على زاويتها.`, `With ${named(fn)}, show $f(|x|)$ and put the point on its corner.`),
            hint: say('Lotunea $x=0$ puntuan dago.', 'La unión está en $x=0$.', 'نقطة الالتقاء عند $x=0$.', 'The joint is at $x=0$.')
        })
        const minima = inList(setup.evenMinima)
        if (minima.length && fn !== 'f5' && fn !== 'f4') options.push({
            fn, mode: 'even', targets: minima,
            prompt: say(`${named(fn)} funtzioarekin, erakutsi $f(|x|)$ eta jarri puntua minimo batean.`, `Con ${named(fn)}, muestra $f(|x|)$ y pon el punto en un mínimo.`, `مع ${named(fn)}، اعرض $f(|x|)$ وضع النقطة على قيمة صغرى.`, `With ${named(fn)}, show $f(|x|)$ and put the point on a minimum.`),
            hint: say('Begiratu $f$ funtzioari $x\\ge 0$ denean: $f(|x|)$ funtzioak hura kopiatzen du.', 'Mira $f$ para $x\\ge 0$: $f(|x|)$ la copia.', 'انظر إلى $f$ من أجل $x\\ge 0$: تنسخها $f(|x|)$.', 'Look at $f$ for $x\\ge 0$: $f(|x|)$ copies it.')
        })
    }
    const chosen = options[randomInt(random, 0, options.length - 1)]
    const index = MIRROR_XS.findIndex((x) => near(x, chosen.targets))
    return {
        prompt: chosen.prompt,
        hint: chosen.hint,
        isSolved: (state) => state.fn === chosen.fn && state.mode === chosen.mode && near(MIRROR_XS[state.x], chosen.targets),
        solution: { fn: chosen.fn, mode: chosen.mode, x: index, prediction: null }
    }
}

export const mirrorExtra = freshFrom(initialMirrorState, mirrorMaker)
