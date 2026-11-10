import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   L5 · Teorema egokia (El teorema justo): four functions on an interval
   [a, b] with whole ends, and three layers, one per theorem. Bolzano
   looks at the signs of f(a) and f(b); the intermediate values, at a line
   y = k; Weierstrass, at the highest and the lowest point, and there the
   interval can also be opened. Before drawing, the learner predicts
   whether the theorem ensures something (>) or why not: the function is
   not continuous on [a, b] (<) or the other condition fails (=): the same
   sign, k outside, an open interval. ▶ slides the line y = k from f(a)
   to f(b). g₁ and g₄ are continuous; g₂ jumps at 1 and g₃ has an
   asymptote at 1, and on [0, 2] both change sign with no root.
   ========================================================================== */

export type TheoremFunction = 'cubic' | 'jump' | 'pole' | 'parabola'
export type TheoremLayer = 'bolzano' | 'darboux' | 'weierstrass'

export const THEOREM_FUNCTIONS: TheoremFunction[] = ['cubic', 'jump', 'pole', 'parabola']
export const THEOREM_LAYERS: TheoremLayer[] = ['bolzano', 'darboux', 'weierstrass']

export const THEOREM_LIMITS = { end: { min: -2, max: 2 }, k: { min: -3, max: 3 } } as const

export interface TheoremState {
    fn: TheoremFunction
    layer: TheoremLayer
    a: number
    b: number
    /** The line y = k of the intermediate values */
    k: number
    /** The interval without its ends (only Weierstrass looks at it) */
    open: boolean
    prediction: Prediction | null
}

export const initialTheoremState: TheoremState = { fn: 'cubic', layer: 'bolzano', a: -2, b: 2, k: 0, open: false, prediction: null }

export function setTheorem(state: TheoremState, patch: Partial<Omit<TheoremState, 'prediction'>>): TheoremState {
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
    const fn = patch.fn ?? state.fn
    const layer = patch.layer ?? state.layer
    let a = clamp(patch.a ?? state.a, THEOREM_LIMITS.end.min, THEOREM_LIMITS.end.max - 1)
    let b = clamp(patch.b ?? state.b, THEOREM_LIMITS.end.min + 1, THEOREM_LIMITS.end.max)
    // Moving one end past the other drags it along: the interval always has a < b
    if (a >= b) {
        if (patch.a !== undefined) b = a + 1
        else a = b - 1
    }
    const k = clamp(patch.k ?? state.k, THEOREM_LIMITS.k.min, THEOREM_LIMITS.k.max)
    const open = patch.open ?? state.open
    const next = { fn, layer, a, b, k, open, prediction: null }
    const same = fn === state.fn && layer === state.layer && a === state.a && b === state.b && (layer !== 'darboux' || k === state.k) && (layer !== 'weierstrass' || open === state.open)
    return { ...next, prediction: same ? state.prediction : null }
}

interface TheoremSetup {
    f: (x: number) => number
    /** Where it is not continuous */
    breakAt: number | null
    latex: string
}

export const THEOREM_SETUP: Record<TheoremFunction, TheoremSetup> = {
    cubic: { f: (x) => x ** 3 - 3 * x + 1, breakAt: null, latex: 'x^3-3x+1' },
    jump: { f: (x) => (x < 1 ? x + 1 : x - 3), breakAt: 1, latex: '\\begin{cases}x+1 & x<1\\\\ x-3 & x\\ge 1\\end{cases}' },
    pole: { f: (x) => 1 / (x - 1), breakAt: 1, latex: '\\frac{1}{x-1}' },
    parabola: { f: (x) => x * x - 2, breakAt: null, latex: 'x^2-2' }
}

export const theoremValue = (fn: TheoremFunction, x: number) => THEOREM_SETUP[fn].f(x)

/** Continuous on the closed interval [a, b] */
export function continuousOn(state: Pick<TheoremState, 'fn' | 'a' | 'b'>): boolean {
    const at = THEOREM_SETUP[state.fn].breakAt
    return at === null || at < state.a || at > state.b
}

/** The roots of f inside (a, b), found on a fine grid (the functions are simple enough) */
export function rootsIn(state: Pick<TheoremState, 'fn' | 'a' | 'b'>): number[] {
    const { f, breakAt } = THEOREM_SETUP[state.fn]
    const roots: number[] = []
    const step = 1 / 512
    for (let x = state.a; x < state.b - 1e-12; x += step) {
        const y = x + step
        if (breakAt !== null && x < breakAt && y >= breakAt) continue
        const fx = f(x)
        const fy = f(y)
        if (fx === 0 && x > state.a) roots.push(x)
        else if (fx * fy < 0) {
            let lo = x
            let hi = y
            for (let i = 0; i < 40; i++) {
                const mid = (lo + hi) / 2
                if (f(lo) * f(mid) <= 0) hi = mid
                else lo = mid
            }
            roots.push((lo + hi) / 2)
        }
    }
    return roots
}

/** The highest and the lowest value of f on [a, b] (only when it is continuous there) */
export function extremes(state: Pick<TheoremState, 'fn' | 'a' | 'b'>): { max: [number, number]; min: [number, number] } {
    const { f } = THEOREM_SETUP[state.fn]
    let max: [number, number] = [state.a, f(state.a)]
    let min: [number, number] = [state.a, f(state.a)]
    const steps = 2000
    for (let i = 0; i <= steps; i++) {
        const x = state.a + ((state.b - state.a) * i) / steps
        const y = f(x)
        if (y > max[1] + 1e-12) max = [x, y]
        if (y < min[1] - 1e-12) min = [x, y]
    }
    return { max, min }
}

/** Does the theorem of this layer ensure something here (>), or does continuity (<) or the other condition (=) fail? */
export function theoremPrediction(state: Omit<TheoremState, 'prediction'>): Prediction {
    if (!continuousOn(state)) return '<'
    const fa = theoremValue(state.fn, state.a)
    const fb = theoremValue(state.fn, state.b)
    if (state.layer === 'bolzano') return fa * fb < 0 ? '>' : '='
    if (state.layer === 'darboux') return (state.k - fa) * (state.k - fb) < 0 ? '>' : '='
    return state.open ? '=' : '>'
}

/** On the open interval, the highest (or the lowest) value would sit at an end, which is left out */
export function openLosesExtreme(state: Pick<TheoremState, 'fn' | 'a' | 'b'>): boolean {
    const { max, min } = extremes(state)
    const atEnd = ([x]: [number, number]) => Math.abs(x - state.a) < 1e-9 || Math.abs(x - state.b) < 1e-9
    return atEnd(max) || atEnd(min)
}

export const theoremChallenges: LabChallenge<TheoremState>[] = [
    {
        id: 122351,
        prompt: say('Bolzano geruzan, aurkitu 1 luzerako tarte bat, non Bolzanok $x^3-3x+1$ funtzioaren erro bat ziurtatzen duen.', 'En la capa de Bolzano, encuentra un intervalo de longitud 1 donde Bolzano asegure una raíz de $x^3-3x+1$.', 'في طبقة بولتسانو أوجد فترة طولها 1 تضمن فيها بولتسانو جذرًا لـ $x^3-3x+1$.', 'In the Bolzano layer, find an interval of length 1 where Bolzano ensures a root of $x^3-3x+1$.'),
        hint: say('Begiratu $f(0)$ eta $f(1)$.', 'Mira $f(0)$ y $f(1)$.', 'انظر إلى $f(0)$ و$f(1)$.', 'Look at $f(0)$ and $f(1)$.'),
        isSolved: (state) => state.layer === 'bolzano' && state.fn === 'cubic' && state.b - state.a === 1 && theoremPrediction(state) === '>'
    },
    {
        id: 122352,
        prompt: say('Bilatu funtzio eta tarte bat, non $f(a)$ eta $f(b)$ zeinu desberdinekoak diren baina errorik ez dagoen.', 'Busca una función y un intervalo en que $f(a)$ y $f(b)$ tengan distinto signo pero no haya ninguna raíz.', 'ابحث عن دالة وفترة تختلف فيها إشارتا $f(a)$ و$f(b)$ ولا يوجد أي جذر.', 'Find a function and an interval where $f(a)$ and $f(b)$ have different signs but there is no root.'),
        hint: say('Jauzi bat edo asintota bat tartearen barruan.', 'Un salto o una asíntota dentro del intervalo.', 'قفزة أو مقارب داخل الفترة.', 'A jump or an asymptote inside the interval.'),
        isSolved: (state) => state.layer === 'bolzano' && theoremValue(state.fn, state.a) * theoremValue(state.fn, state.b) < 0 && rootsIn(state).length === 0
    },
    {
        id: 122353,
        prompt: say('Tarteko balioen geruzan, $x^3-3x+1$ funtzioarekin $[-1,1]$ tartean, aukeratu $k=2$: teoremak $f(c)=2$ ziurtatzen du.', 'En la capa de valores intermedios, con $x^3-3x+1$ en $[-1,1]$, elige $k=2$: el teorema asegura $f(c)=2$.', 'في طبقة القيم الوسيطة، مع $x^3-3x+1$ على $[-1,1]$، اختر $k=2$: تضمن المبرهنة $f(c)=2$.', 'In the intermediate value layer, with $x^3-3x+1$ on $[-1,1]$, choose $k=2$: the theorem ensures $f(c)=2$.'),
        hint: say('$f(-1)=3$ eta $f(1)=-1$: 2 tartean dago.', '$f(-1)=3$ y $f(1)=-1$: el 2 está entre medias.', '$f(-1)=3$ و$f(1)=-1$: العدد 2 بينهما.', '$f(-1)=3$ and $f(1)=-1$: 2 is in between.'),
        isSolved: (state) => state.layer === 'darboux' && state.fn === 'cubic' && state.a === -1 && state.b === 1 && state.k === 2
    },
    {
        id: 122354,
        prompt: say('Weierstrass geruzan, $x^2-2$ funtzioarekin, aukeratu tarte ireki bat, non maximoa edo minimoa muturrean geratzen den eta, beraz, hartzen ez den.', 'En la capa de Weierstrass, con $x^2-2$, elige un intervalo abierto en el que el máximo o el mínimo quede en un extremo y, por tanto, no se alcance.', 'في طبقة فايرشتراس، مع $x^2-2$، اختر فترة مفتوحة تقع فيها القيمة العظمى أو الصغرى عند طرف، فلا تُبلغ.', 'In the Weierstrass layer, with $x^2-2$, choose an open interval where the maximum or the minimum would be at an end, so it is not reached.'),
        hint: say('Adibidez $(0,2)$: altuena 2 puntuan legoke.', 'Por ejemplo $(0,2)$: lo más alto estaría en 2.', 'مثلًا $(0,2)$: الأعلى سيكون عند 2.', 'For example $(0,2)$: the highest would be at 2.'),
        isSolved: (state) => state.layer === 'weierstrass' && state.fn === 'parabola' && state.open && openLosesExtreme(state)
    },
    {
        id: 122355,
        prompt: say('Weierstrass geruzan, tarte itxi batekin ere, aurkitu funtzio eta tarte bat, non maximorik ez dagoen.', 'En la capa de Weierstrass, aun con el intervalo cerrado, encuentra una función y un intervalo sin máximo.', 'في طبقة فايرشتراس، ولو كانت الفترة مغلقة، أوجد دالة وفترة بلا قيمة عظمى.', 'In the Weierstrass layer, even with a closed interval, find a function and an interval with no maximum.'),
        hint: say('Asintota bat tartearen barruan.', 'Una asíntota dentro del intervalo.', 'مقارب داخل الفترة.', 'An asymptote inside the interval.'),
        isSolved: (state) => state.layer === 'weierstrass' && !state.open && state.fn === 'pole' && !continuousOn(state)
    }
]

const NAMES: Record<TheoremFunction, string> = { cubic: 'g_1', jump: 'g_2', pole: 'g_3', parabola: 'g_4' }

/** Endless practice: an interval of length 1 with a root that Bolzano ensures, or a value k that the intermediate values ensure */
const theoremMaker: LabChallengeMaker<TheoremState> = (random) => {
    const fn = randomInt(random, 0, 1) === 0 ? 'cubic' : 'parabola'
    const g = `$${NAMES[fn]}$`
    if (randomInt(random, 0, 1) === 0) {
        const starts = [-2, -1, 0, 1].filter((a) => theoremValue(fn, a) * theoremValue(fn, a + 1) < 0)
        const a = starts[randomInt(random, 0, starts.length - 1)]
        const between = `$${a}$`
        return {
            prompt: say(`Bolzano geruzan, ziurtatu ${g} funtzioaren erro bat ${between} zenbakitik hasten den 1 luzerako tartean.`, `En la capa de Bolzano, asegura una raíz de ${g} en el intervalo de longitud 1 que empieza en ${between}.`, `في طبقة بولتسانو، اضمن جذرًا لـ ${g} في الفترة التي طولها 1 وتبدأ عند ${between}.`, `In the Bolzano layer, ensure a root of ${g} on the interval of length 1 that starts at ${between}.`),
            hint: say('Zeinu desberdinak muturretan.', 'Signos distintos en los extremos.', 'إشارتان مختلفتان عند الطرفين.', 'Different signs at the ends.'),
            isSolved: (state) => state.layer === 'bolzano' && state.fn === fn && state.a === a && state.b === a + 1,
            solution: { fn, layer: 'bolzano', a, b: a + 1, k: 0, open: false, prediction: null }
        }
    }
    for (;;) {
        const a = randomInt(random, -2, 1)
        const b = randomInt(random, a + 1, 2)
        const fa = theoremValue(fn, a)
        const fb = theoremValue(fn, b)
        const options: number[] = []
        for (let k = THEOREM_LIMITS.k.min; k <= THEOREM_LIMITS.k.max; k++) if ((k - fa) * (k - fb) < 0) options.push(k)
        if (options.length === 0) continue
        const k = options[randomInt(random, 0, options.length - 1)]
        const interval = `$[${a},${b}]$`
        const value = `$f(c)=${k}$`
        return {
            prompt: say(`Tarteko balioen geruzan, ${g} funtzioarekin ${interval} tartean, aukeratu teoremak ${value} ziurtatzen duen $k$.`, `En la capa de valores intermedios, con ${g} en ${interval}, elige la $k$ para la que el teorema asegura ${value}.`, `في طبقة القيم الوسيطة، مع ${g} على ${interval}، اختر قيمة $k$ التي تضمن المبرهنة لها ${value}.`, `In the intermediate value layer, with ${g} on ${interval}, choose the $k$ for which the theorem ensures ${value}.`),
            hint: say('$k$ zenbakiak $f(a)$ eta $f(b)$ artean egon behar du.', '$k$ tiene que estar entre $f(a)$ y $f(b)$.', 'يجب أن تكون $k$ بين $f(a)$ و$f(b)$.', '$k$ must be between $f(a)$ and $f(b)$.'),
            isSolved: (state) => state.layer === 'darboux' && state.fn === fn && state.a === a && state.b === b && state.k === k,
            solution: { fn, layer: 'darboux', a, b, k, open: false, prediction: null }
        }
    }
}

export const theoremExtra = freshFrom(initialTheoremState, theoremMaker)
