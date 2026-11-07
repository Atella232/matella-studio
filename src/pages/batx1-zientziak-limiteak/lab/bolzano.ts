import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { same, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   L5 · Bolzanok erroa harrapatzen du (Bolzano encierra la raíz): a function
   and an interval [p, q] with whole ends. Before the graph is shown the
   learner predicts, from the signs of f(p) and f(q): Bolzano guarantees a
   root inside (<), one end is already a root (=), or Bolzano guarantees
   nothing, because the signs are equal or f is not continuous (>). Then
   the interval is halved up to three times, keeping the half where the
   sign changes; ▶ shows the halvings one after another. The ends are
   multiples of 1/8 and the functions are polynomials (or 1/(x − 1)), so
   every value is exact.
   ========================================================================== */

export type BolzanoFunction = 'cubic' | 'square' | 'cubic2' | 'odd' | 'jump'

export const BOLZANO_FUNCTIONS: BolzanoFunction[] = ['cubic', 'square', 'cubic2', 'odd', 'jump']

export const BOLZANO_LIMITS = { p: { min: -3, max: 2 }, q: { min: -2, max: 3 }, halvings: { min: 0, max: 3 } } as const

export interface BolzanoState {
    fn: BolzanoFunction
    p: number
    q: number
    halvings: number
    prediction: Prediction | null
}

export const initialBolzanoState: BolzanoState = { fn: 'square', p: -1, q: 1, halvings: 0, prediction: null }

const clamp = (value: number, { min, max }: { min: number; max: number }) => Math.min(max, Math.max(min, Math.round(value)))

export function setBolzano(state: BolzanoState, patch: Partial<Omit<BolzanoState, 'prediction'>>): BolzanoState {
    const fn = patch.fn ?? state.fn
    let p = clamp(patch.p ?? state.p, BOLZANO_LIMITS.p)
    let q = clamp(patch.q ?? state.q, BOLZANO_LIMITS.q)
    // The end that was not moved makes way
    if (q <= p) {
        if (patch.q !== undefined && patch.p === undefined) p = q - 1
        else q = p + 1
    }
    const halvings = clamp(patch.halvings ?? state.halvings, BOLZANO_LIMITS.halvings)
    const unchanged = fn === state.fn && p === state.p && q === state.q
    return { fn, p, q, halvings, prediction: unchanged ? state.prediction : null }
}

export const BOLZANO_LATEX: Record<BolzanoFunction, string> = {
    cubic: 'f(x)=x^3-3x+1',
    square: 'f(x)=x^2-2',
    cubic2: 'f(x)=x^3+x-3',
    odd: 'f(x)=x^3-x',
    jump: 'f(x)=\\frac{1}{x-1}'
}

/** f(x), or null where it is not defined */
export function bolzanoValue(fn: BolzanoFunction, x: number): number | null {
    switch (fn) {
        case 'cubic': return x ** 3 - 3 * x + 1
        case 'square': return x ** 2 - 2
        case 'cubic2': return x ** 3 + x - 3
        case 'odd': return x ** 3 - x
        case 'jump': return x === 1 ? null : 1 / (x - 1)
    }
}

/** Whether f is continuous on [p, q] */
export const isContinuous = (state: BolzanoState) => state.fn !== 'jump' || state.q < 1 || state.p > 1

/** A root inside for sure (<), an end that is a root (=), or no guarantee (>) */
export function bolzanoKind(state: BolzanoState): Prediction {
    if (!isContinuous(state)) return '>'
    const fp = bolzanoValue(state.fn, state.p)!
    const fq = bolzanoValue(state.fn, state.q)!
    if (fp === 0 || fq === 0) return '='
    return fp * fq < 0 ? '<' : '>'
}

export const bolzanoPrediction = bolzanoKind

/** The intervals of the halvings: the first is [p, q]; a midpoint that is a root closes the interval on it */
export function bolzanoIntervals(state: BolzanoState): Array<[number, number]> {
    const intervals: Array<[number, number]> = [[state.p, state.q]]
    if (bolzanoKind(state) !== '<') return intervals
    for (let step = 0; step < state.halvings; step += 1) {
        const [lo, hi] = intervals[intervals.length - 1]
        if (lo === hi) break
        const mid = (lo + hi) / 2
        const fm = bolzanoValue(state.fn, mid)!
        const flo = bolzanoValue(state.fn, lo)!
        intervals.push(fm === 0 ? [mid, mid] : fm * flo < 0 ? [lo, mid] : [mid, hi])
    }
    return intervals
}

export const finalInterval = (state: BolzanoState) => bolzanoIntervals(state).at(-1)!

/** A root of f inside [lo, hi] (f changes sign there), found by halving many times */
export function rootIn(fn: BolzanoFunction, lo: number, hi: number): number {
    let a = lo
    let b = hi
    for (let step = 0; step < 60; step += 1) {
        const mid = (a + b) / 2
        if (bolzanoValue(fn, mid)! * bolzanoValue(fn, a)! <= 0) b = mid
        else a = mid
    }
    return (a + b) / 2
}

/** Whether the halving has caught this root in an interval this narrow */
function caught(state: BolzanoState, root: number, width: number): boolean {
    if (state.fn === 'jump' || bolzanoKind(state) !== '<') return false
    const [lo, hi] = finalInterval(state)
    return hi - lo <= width + 1e-12 && lo <= root && root <= hi
}

export const WIDTH_LATEX = ['1', '\\frac{1}{2}', '\\frac{1}{4}', '\\frac{1}{8}']

export const bolzanoChallenges: LabChallenge<BolzanoState>[] = [
    {
        id: 109351,
        prompt: say('$x^3-3x+1$ funtzioarekin, bilatu 1 luzerako tarte bat, mutur negatiboekin, non Bolzanok erro bat ziurtatzen duen.', 'Con $x^3-3x+1$, busca un intervalo de longitud 1 con extremos negativos donde Bolzano asegure una raíz.', 'مع $x^3-3x+1$ ابحث عن مجال طوله 1 طرفاه سالبان يضمن فيه بولتسانو جذرًا.', 'With $x^3-3x+1$, find an interval of length 1 with negative ends where Bolzano guarantees a root.'),
        hint: say('Probatu $f(-2)$ eta $f(-1)$.', 'Prueba $f(-2)$ y $f(-1)$.', 'جرّب $f(-2)$ و$f(-1)$.', 'Try $f(-2)$ and $f(-1)$.'),
        isSolved: (state) => state.fn === 'cubic' && state.q - state.p === 1 && state.q <= 0 && bolzanoKind(state) === '<'
    },
    {
        id: 109352,
        prompt: say('$\\frac{1}{x-1}$ funtzioarekin, bilatu tarte bat, non zeinua aldatzen den baina errorik ez dagoen.', 'Con $\\frac{1}{x-1}$, busca un intervalo donde cambie el signo pero no haya raíz.', 'مع $\\frac{1}{x-1}$ ابحث عن مجال تتغير فيه الإشارة دون أن يوجد جذر.', 'With $\\frac{1}{x-1}$, find an interval where the sign changes but there is no root.'),
        hint: say('Tarteak $x=1$ hartu behar du barruan.', 'El intervalo tiene que contener $x=1$.', 'يجب أن يحتوي المجال على $x=1$.', 'The interval has to contain $x=1$.'),
        isSolved: (state) => state.fn === 'jump' && state.p < 1 && state.q > 1
    },
    {
        id: 109353,
        prompt: say('Harrapatu $x^2-2$ funtzioaren erro positiboa $\\frac{1}{4}$ zabalerako tarte batean.', 'Encierra la raíz positiva de $x^2-2$ en un intervalo de anchura $\\frac{1}{4}$.', 'احصر الجذر الموجب لـ $x^2-2$ في مجال عرضه $\\frac{1}{4}$.', 'Trap the positive root of $x^2-2$ in an interval of width $\\frac{1}{4}$.'),
        hint: say('Hasi $[1,2]$ tartetik eta erdibitu bi aldiz.', 'Empieza en $[1,2]$ y divide por la mitad dos veces.', 'ابدأ من $[1,2]$ ونصّفه مرتين.', 'Start from $[1,2]$ and halve it twice.'),
        isSolved: (state) => state.fn === 'square' && caught(state, Math.SQRT2, 0.25)
    },
    {
        id: 109354,
        prompt: say('$x^3-x$ funtzioarekin, aukeratu tarte bat, non mutur bat dagoeneko erroa den.', 'Con $x^3-x$, elige un intervalo cuyo extremo ya sea una raíz.', 'مع $x^3-x$ اختر مجالًا يكون أحد طرفيه جذرًا.', 'With $x^3-x$, choose an interval with an end that is already a root.'),
        hint: same('$x^3-x=x(x-1)(x+1)$'),
        isSolved: (state) => state.fn === 'odd' && bolzanoKind(state) === '='
    },
    {
        id: 109355,
        prompt: say('Erakutsi $x^3+x-3$ funtzioak erro bat duela $1{,}125$ eta $1{,}25$ artean.', 'Demuestra que $x^3+x-3$ tiene una raíz entre $1{,}125$ y $1{,}25$.', 'برهن أن لـ $x^3+x-3$ جذرًا بين $1{,}125$ و$1{,}25$.', 'Show that $x^3+x-3$ has a root between $1{,}125$ and $1{,}25$.'),
        hint: say('Hasi $[1,2]$ tartetik eta erdibitu hiru aldiz.', 'Empieza en $[1,2]$ y divide por la mitad tres veces.', 'ابدأ من $[1,2]$ ونصّفه ثلاث مرات.', 'Start from $[1,2]$ and halve it three times.'),
        isSolved: (state) => {
            const [lo, hi] = finalInterval(state)
            return state.fn === 'cubic2' && lo === 1.125 && hi === 1.25
        }
    }
]

/** The roots the endless challenges ask for: the function and the whole numbers around each root */
const BRACKETS: Array<[BolzanoFunction, number]> = [['cubic', -2], ['cubic', 0], ['cubic', 1], ['square', -2], ['square', 1], ['cubic2', 1]]

/** Endless practice: trap a root in a narrow interval */
const bolzanoMaker: LabChallengeMaker<BolzanoState> = (random) => {
    const [fn, p] = BRACKETS[randomInt(random, 0, BRACKETS.length - 1)]
    const halvings = randomInt(random, 1, 3)
    const root = rootIn(fn, p, p + 1)
    const width = 1 / 2 ** halvings
    const f = `$${BOLZANO_LATEX[fn].replace('f(x)=', '')}$`
    const w = `$${WIDTH_LATEX[halvings]}$`
    const ends = `$${p}$`
    const next = `$${p + 1}$`
    return {
        prompt: say(
            `Harrapatu ${f} funtzioak ${ends} eta ${next} artean duen erroa ${w} zabalerako tarte batean.`,
            `Encierra la raíz de ${f} que está entre ${ends} y ${next} en un intervalo de anchura ${w}.`,
            `احصر جذر ${f} الواقع بين ${ends} و${next} في مجال عرضه ${w}.`,
            `Trap the root of ${f} between ${ends} and ${next} in an interval of width ${w}.`
        ),
        hint: say('Erdibitzen duzun bakoitzean, zabalera erdira jaisten da.', 'Cada vez que divides por la mitad, la anchura se queda en la mitad.', 'كل تنصيف يقسم العرض على 2.', 'Each halving cuts the width in half.'),
        isSolved: (state) => state.fn === fn && caught(state, root, width),
        solution: { fn, p, q: p + 1, halvings, prediction: null }
    }
}

export const bolzanoExtra = freshFrom(initialBolzanoState, bolzanoMaker)
