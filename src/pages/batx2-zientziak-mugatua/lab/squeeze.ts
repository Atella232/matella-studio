import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { exact } from '../../batx1-zientziak-integralak/lab/numbers.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Encaja el área (lower and upper sums). [a, b] is split into n equal
   pieces; on each piece one rectangle is as high as the minimum of f on it
   (blue, the lower sum s) and another as high as the maximum (red, the
   upper sum S). It is not «Rectangles under the curve» of 1.º, where the
   height is taken at the left, the middle or the right: here the curves go
   up and down, so the minimum and the maximum of a piece are not always at
   its ends. The area is trapped in the band S − s, which narrows as n
   grows; ▶ doubles n. Before the area is shown the learner guesses whether
   it lies nearer to s, halfway or nearer to S: that depends on the shape
   of the curve (bent up, straight or bent down), not on n.
   ========================================================================== */

export type SqueezeFunction = 'cap' | 'valley' | 'line' | 'root'

export const SQUEEZE_FUNCTIONS: SqueezeFunction[] = ['cap', 'valley', 'line', 'root']
export const SQUEEZE_LIMITS = { n: { min: 1, max: 40 } } as const

interface SqueezeSetup {
    fn: (x: number) => number
    /** An antiderivative, for the exact area */
    F: (x: number) => number
    latex: string
    /** The exact area as LaTeX */
    areaLatex: string
    a: number
    b: number
    /** The y range of the board */
    view: [number, number]
}

export const SQUEEZE_SETUP: Record<SqueezeFunction, SqueezeSetup> = {
    cap: { fn: (x) => 4 - x * x, F: (x) => 4 * x - x ** 3 / 3, latex: 'f(x)=4-x^2', areaLatex: '\\frac{32}{3}', a: -2, b: 2, view: [0, 4] },
    valley: { fn: (x) => (x - 1) ** 2 + 1, F: (x) => (x - 1) ** 3 / 3 + x, latex: 'f(x)=(x-1)^2+1', areaLatex: '\\frac{28}{3}', a: -1, b: 3, view: [0, 5] },
    line: { fn: (x) => x / 2 + 1, F: (x) => x * x / 4 + x, latex: 'f(x)=\\frac{x}{2}+1', areaLatex: '8', a: 0, b: 4, view: [0, 3] },
    root: { fn: (x) => Math.sqrt(x), F: (x) => (2 / 3) * x ** 1.5, latex: 'f(x)=\\sqrt{x}', areaLatex: '\\frac{16}{3}', a: 0, b: 4, view: [0, 2] }
}

export interface SqueezeState {
    fn: SqueezeFunction
    n: number
    prediction: Prediction | null
}

export const initialSqueezeState: SqueezeState = { fn: 'cap', n: 4, prediction: null }

/** A new function asks for a new prediction; more or fewer pieces do not (the answer does not depend on n) */
export function setSqueeze(state: SqueezeState, patch: Partial<Omit<SqueezeState, 'prediction'>>): SqueezeState {
    const fn = patch.fn ?? state.fn
    const n = Math.min(SQUEEZE_LIMITS.n.max, Math.max(SQUEEZE_LIMITS.n.min, Math.round(patch.n ?? state.n)))
    return { fn, n, prediction: fn === state.fn ? state.prediction : null }
}

/** The lowest and highest value of f on [from, to]: at the ends or where f turns (sampled finely) */
function range(fn: (x: number) => number, from: number, to: number): [number, number] {
    let low = Math.min(fn(from), fn(to))
    let high = Math.max(fn(from), fn(to))
    for (let k = 1; k < 200; k += 1) {
        const y = fn(from + ((to - from) * k) / 200)
        low = Math.min(low, y)
        high = Math.max(high, y)
    }
    // The turning points of these curves (x = 0, x = 1) are exact grid values: catch them exactly
    for (const turn of [0, 1]) if (turn > from && turn < to) { low = Math.min(low, fn(turn)); high = Math.max(high, fn(turn)) }
    return [exact(low), exact(high)]
}

/** The pieces: left end, width, the minimum m and the maximum M of f on it */
export function pieces(fn: SqueezeFunction, n: number) {
    const { a, b, fn: f } = SQUEEZE_SETUP[fn]
    const width = (b - a) / n
    return Array.from({ length: n }, (_, i) => {
        const x = a + i * width
        const [low, high] = range(f, x, x + width)
        return { x, width, low, high }
    })
}

export const lowerSum = (fn: SqueezeFunction, n: number) => exact(pieces(fn, n).reduce((total, piece) => total + piece.width * piece.low, 0))
export const upperSum = (fn: SqueezeFunction, n: number) => exact(pieces(fn, n).reduce((total, piece) => total + piece.width * piece.high, 0))
export const squeezeArea = (fn: SqueezeFunction) => exact(SQUEEZE_SETUP[fn].F(SQUEEZE_SETUP[fn].b) - SQUEEZE_SETUP[fn].F(SQUEEZE_SETUP[fn].a))
export const band = (fn: SqueezeFunction, n: number) => exact(upperSum(fn, n) - lowerSum(fn, n))

/** The area lies nearer to s (<), halfway (=) or nearer to S (>) */
export const squeezePrediction = (state: Pick<SqueezeState, 'fn' | 'n'>): Prediction =>
    compareTo(exact(squeezeArea(state.fn) - lowerSum(state.fn, state.n)), exact(upperSum(state.fn, state.n) - squeezeArea(state.fn)))

const withCurve = (fn: SqueezeFunction, goal: LocalizedText): LocalizedText => {
    const f = SQUEEZE_SETUP[fn].latex
    return say(`$${f}$ funtzioarekin, ${goal.eu}`, `Con $${f}$, ${goal.es}`, `مع $${f}$، ${goal.ar}`, `With $${f}$, ${goal.en}`)
}

const narrower = (d: string) => say(
    `lortu $S-s$ banda $${d}$ baino estuagoa.`,
    `consigue una banda $S-s$ menor que $${d}$.`,
    `احصل على شريط $S-s$ أصغر من $${d}$.`,
    `get a band $S-s$ smaller than $${d}$.`
)

export const squeezeChallenges: LabChallenge<SqueezeState>[] = [
    {
        id: 127101,
        prompt: withCurve('cap', narrower('2')),
        hint: say('Zati gehiagorekin, laukizuzen gorriak eta urdinak elkarrengana hurbiltzen dira.', 'Con más tramos, los rectángulos rojos y los azules se acercan.', 'مع أجزاء أكثر تتقارب المستطيلات الحمراء والزرقاء.', 'With more pieces, the red and the blue rectangles come closer.'),
        isSolved: (state) => state.fn === 'cap' && band('cap', state.n) < 2
    },
    {
        id: 127102,
        prompt: withCurve('valley', say('lortu $8{,}5$ baino handiagoa den behe-batura.', 'consigue una suma inferior mayor que $8{,}5$.', 'احصل على مجموع أدنى أكبر من $8{,}5$.', 'get a lower sum greater than $8{,}5$.')),
        hint: say('Behe-batura igo egiten da zatiketa finagoarekin, baina ez du inoiz azalera gainditzen.', 'La suma inferior sube con una partición más fina, pero nunca pasa del área.', 'يرتفع المجموع الأدنى مع تجزئة أدق لكنه لا يتجاوز المساحة أبدًا.', 'The lower sum goes up with a finer partition, but never passes the area.'),
        isSolved: (state) => state.fn === 'valley' && lowerSum('valley', state.n) > 8.5
    },
    {
        id: 127103,
        prompt: withCurve('line', say('aurkitu zenbat zatirekin den $S-s=1$.', 'halla con cuántos tramos $S-s=1$.', 'أوجد عدد الأجزاء الذي يجعل $S-s=1$.', 'find with how many pieces $S-s=1$.')),
        hint: say('Zuzen batean, $S-s$ zati bakoitzaren altuera-jauzia bider zabalera da; guztira, $\\frac{8}{n}$.', 'En una recta, $S-s$ es el salto de altura de cada tramo por su anchura; en total, $\\frac{8}{n}$.', 'في المستقيم $S-s$ هو فرق الارتفاع في كل جزء في عرضه؛ والمجموع $\\frac{8}{n}$.', 'On a straight line, $S-s$ is the jump in height of each piece times its width; in all, $\\frac{8}{n}$.'),
        isSolved: (state) => state.fn === 'line' && Math.abs(band('line', state.n) - 1) < 1e-9
    },
    {
        id: 127104,
        prompt: withCurve('root', narrower('0{,}25')),
        hint: say('Behar duzun $n$ handia da: erabili ▶ edo igo urratsez urrats.', 'Hace falta un $n$ grande: usa ▶ o súbelo paso a paso.', 'تحتاج إلى $n$ كبير: استعمل ▶ أو زده خطوة خطوة.', 'You need a large $n$: use ▶ or raise it step by step.'),
        isSolved: (state) => state.fn === 'root' && band('root', state.n) < 0.25
    },
    {
        id: 127105,
        prompt: withCurve('cap', say('lortu $s$ eta $S$ biak azaleratik 1 baino gutxiagora.', 'consigue que $s$ y $S$ estén los dos a menos de 1 del área.', 'اجعل $s$ و$S$ كليهما على بعد أقل من 1 من المساحة.', 'get both $s$ and $S$ within 1 of the area.')),
        hint: say('Kurba ganbila denean, $s$ urrunago dago; igo $n$ hura ere hurbildu arte.', 'Cuando la curva se dobla hacia abajo, $s$ queda más lejos; sube $n$ hasta que también se acerque.', 'عندما ينحني المنحنى إلى الأسفل يبقى $s$ أبعد؛ زد $n$ حتى يقترب هو أيضًا.', 'When the curve bends down, $s$ is further away; raise $n$ until it gets close too.'),
        isSolved: (state) => state.fn === 'cap' && squeezeArea('cap') - lowerSum('cap', state.n) < 1 && upperSum('cap', state.n) - squeezeArea('cap') < 1
    }
]

const GAPS: Array<[number, string]> = [[2, '2'], [1, '1'], [0.5, '0{,}5'], [0.4, '0{,}4']]

/** Endless practice: a curve and how narrow the band must be */
const squeezeMaker: LabChallengeMaker<SqueezeState> = (random) => {
    for (;;) {
        const fn = SQUEEZE_FUNCTIONS[randomInt(random, 0, SQUEEZE_FUNCTIONS.length - 1)]
        const [gap, text] = GAPS[randomInt(random, 0, GAPS.length - 1)]
        // The fewest pieces that do it: at least 3 and within the stepper
        let n = 1
        while (n <= SQUEEZE_LIMITS.n.max && band(fn, n) >= gap) n += 1
        if (n < 3 || n > SQUEEZE_LIMITS.n.max) continue
        return {
            prompt: withCurve(fn, narrower(text)),
            hint: say('Zatiketa finagoarekin, $s$ igo eta $S$ jaitsi egiten da.', 'Con una partición más fina, $s$ sube y $S$ baja.', 'مع تجزئة أدق يرتفع $s$ وينخفض $S$.', 'With a finer partition, $s$ goes up and $S$ goes down.'),
            isSolved: (state) => state.fn === fn && band(fn, state.n) < gap,
            solution: { fn, n, prediction: null }
        }
    }
}

export const squeezeExtra = freshFrom(initialSqueezeState, squeezeMaker)
