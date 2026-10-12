import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { quadraticChallenges } from '../../dbh2-ekuazioak-v2/lab/labTools.ts'
import { radicalChallenges } from '../../dbh4-aplikatuak-ekuazioak/lab/labTools.ts'
import { polyLatex } from '../../dbh4-akademikoak-polinomioak/polynomials.ts'
import type { EquationsInequalitiesStageId } from '../lessons.tsx'

/* ==========================================================================
   Ekuazioak eta inekuazioak (4. DBH akademikoak) laboratory. The quadratic
   formula comes from 2. DBH and the radical equations from 4. DBH
   aplikatuak, with their own challenges. The new tools: an equation built
   from its roots (sum and product), a biquadratic from its two t roots,
   exponential equations as two exponents that meet, a linear inequality on
   the number line, two tariffs compared, the sign of a parabola, the
   parabola y = x² against a line, and a system of two inequalities. Pure
   state logic; the components live next to this file. Tests in
   tests/ekuazioak-dbh4ak-lab.test.ts.
   ========================================================================== */

export type EquationsInequalitiesLabToolId = 'quadratic' | 'roots' | 'biquadratic' | 'radical' | 'exponential' | 'linear' | 'tariffs' | 'sign' | 'graphic' | 'system'

export interface EquationsInequalitiesLabTool extends LabToolInfo {
    id: EquationsInequalitiesLabToolId
    stage: EquationsInequalitiesStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export const equationsInequalitiesLabTools: EquationsInequalitiesLabTool[] = [
    { id: 'quadratic', stage: 'quadratic', lessonTopic: 'quadratic-formula', title: say('Formula orokorra', 'La fórmula general', 'القانون العام'), observe: say('Aldatu a, b eta c: diskriminatzaileak esaten du zenbat ebazpen dauden. Parabolak ardatza mozten duen puntuak dira ebazpenak.', 'Cambia a, b y c: el discriminante dice cuántas soluciones hay. Las soluciones son los puntos donde la parábola corta el eje.', 'غيّر a وb وc: يخبرك المميّز بعدد الحلول. والحلول هي نقاط قطع القطع المكافئ للمحور.') },
    { id: 'roots', stage: 'quadratic', lessonTopic: 'roots-relations', title: say('Erroetatik ekuaziora', 'De las raíces a la ecuación', 'من الجذرين إلى المعادلة'), observe: say('Aukeratu bi erro: ekuazioa a(x² − Sx + P) = 0 da, S batura eta P biderkadura izanik. Erroak simetrikoak badira, x-ren gaia desagertzen da.', 'Elige dos raíces: la ecuación es a(x² − Sx + P) = 0, con S la suma y P el producto. Si las raíces son opuestas, desaparece el término en x.', 'اختر جذرين: المعادلة هي a(x² − Sx + P) = 0 حيث S المجموع وP الجداء. وإذا كان الجذران متعاكسين يختفي حد x.') },
    { id: 'biquadratic', stage: 'other', lessonTopic: 'biquadratic', title: say('Bikarratuaren bi t-ak', 'Las dos t de la bicuadrada', 'قيمتا t في المعادلة الثنائية التربيع'), observe: say('t positibo bakoitzak bi x ematen ditu, ±√t; t = 0 balioak bat, eta t negatiboak bat ere ez. Horregatik bikarratu batek 0, 1, 2, 3 edo 4 ebazpen izan ditzake.', 'Cada t positiva da dos x, ±√t; t = 0 da una, y una t negativa ninguna. Por eso una bicuadrada puede tener 0, 1, 2, 3 o 4 soluciones.', 'كل t موجبة تعطي قيمتين لـ x هما ±√t؛ وt = 0 تعطي واحدة، وt السالبة لا تعطي شيئًا. لذلك قد يكون للمعادلة 0 أو 1 أو 2 أو 3 أو 4 حلول.') },
    { id: 'radical', stage: 'exponential', lessonTopic: 'radical', title: say('Ebazpen faltsuen ehiza', 'A la caza de soluciones falsas', 'صيد الحلول الزائفة'), observe: say('Karratura jasotzean ebazpen berriak ager daitezke. Bakarrik hasierako ekuazioa betetzen dutenak dira ebazpenak.', 'Al elevar al cuadrado pueden aparecer soluciones nuevas. Solo son soluciones las que cumplen la ecuación inicial.', 'عند التربيع قد تظهر حلول جديدة. ولا يكون حلًّا إلا ما يحقق المعادلة الأصلية.') },
    { id: 'exponential', stage: 'exponential', lessonTopic: 'exponential', title: say('Berretzaileak elkartzen', 'Los exponentes se encuentran', 'الأسّان يلتقيان'), observe: say('Bi aldeak oinarri berean idatzita, berretzaileak berdinak direnean bakarrik dira berdinak. Mugitu x berretzaileak elkartu arte.', 'Escritos los dos lados con la misma base, solo son iguales cuando los exponentes son iguales. Mueve x hasta que los exponentes se encuentren.', 'إذا كُتب الطرفان بالأساس نفسه فلا يتساويان إلا إذا تساوى الأسّان. حرّك x حتى يلتقي الأسّان.') },
    { id: 'linear', stage: 'inequalities', lessonTopic: 'linear-inequality', title: say('Inekuazioa zuzenean', 'La inecuación en la recta', 'المتراجحة على المستقيم'), observe: say('Ebatzi ekuazio bat bezala, baina x-ren koefiziente negatibo batez zatitzean zentzua aldatzen da. Probatu x batzuk: soluzioan daudenek bakarrik betetzen dute.', 'Se resuelve como una ecuación, pero al dividir entre un coeficiente negativo cambia el sentido. Prueba valores de x: solo los de la solución la cumplen.', 'تُحلّ كالمعادلة، لكن عند القسمة على معامل سالب ينقلب الاتجاه. جرّب قيمًا لـ x: لا يحققها إلا ما في مجموعة الحل.') },
    { id: 'tariffs', stage: 'inequalities', lessonTopic: 'inequality-problems', title: say('Bi tarifa', 'Dos tarifas', 'تعرفتان'), observe: say('Kuota finkoa duen tarifa garestiagoa da hasieran, baina gutxiago igotzen da. Zuzenak gurutzatzen diren puntutik aurrera, merkeagoa da.', 'La tarifa con cuota fija es más cara al principio, pero sube menos. A partir del punto donde se cruzan las rectas, es más barata.', 'التعرفة ذات الرسم الثابت أغلى في البداية لكنها ترتفع أقل. وبعد نقطة تقاطع المستقيمين تصبح أرخص.') },
    { id: 'sign', stage: 'quadratic-inequalities', lessonTopic: 'quadratic-inequality', title: say('Parabolaren zeinua', 'El signo de la parábola', 'إشارة القطع المكافئ'), observe: say('Erroek zuzena hiru zatitan banatzen dute. a > 0 bada, polinomioa negatiboa da erroen artean eta positiboa kanpoan; a < 0 bada, alderantziz.', 'Las raíces parten la recta en tres trozos. Si a > 0, el polinomio es negativo entre las raíces y positivo fuera; si a < 0, al revés.', 'يقسم الجذران المستقيم إلى ثلاثة أجزاء. إذا كان a > 0 فالحدودية سالبة بين الجذرين وموجبة خارجهما؛ وإذا كان a < 0 فالعكس.') },
    { id: 'graphic', stage: 'quadratic-inequalities', lessonTopic: 'graphic-inequality', title: say('Parabola eta zuzena', 'Parábola y recta', 'القطع المكافئ والمستقيم'), observe: say('x² < mx + n betetzen da parabola zuzenaren azpian dagoen lekuan: bi ebaki-puntuen artean. Ukitzen badute edo ez badira mozten, ez dago tarterik.', 'x² < mx + n se cumple donde la parábola está por debajo de la recta: entre los dos puntos de corte. Si se tocan o no se cortan, no hay intervalo.', 'تتحقق x² < mx + n حيث يكون القطع المكافئ تحت المستقيم: بين نقطتي التقاطع. وإذا تماسّا أو لم يتقاطعا فلا مجال.') },
    { id: 'system', stage: 'quadratic-inequalities', lessonTopic: 'inequality-systems', title: say('Bi inekuazio batera', 'Dos inecuaciones a la vez', 'متراجحتان معًا'), observe: say('Sistemaren soluzioa bi soluzioen zati komuna da. Zuzenerdiek elkarri begiratzen badiote, tarte bat; bizkarra ematen badiote, ez dago soluziorik.', 'La solución del sistema es la parte común de las dos soluciones. Si las semirrectas se miran, un intervalo; si se dan la espalda, no hay solución.', 'حل النظام هو الجزء المشترك بين الحلّين. إذا تقابل نصفا المستقيم كان مجالًا؛ وإذا تدابرا فلا حل.') }
]

export const equationsInequalitiesLabToolForTopic: Record<string, EquationsInequalitiesLabToolId | undefined> = {
    'quadratic-formula': 'quadratic',
    'roots-relations': 'roots',
    'quadratic-problems': 'quadratic',
    biquadratic: 'biquadratic',
    factored: 'roots',
    rational: 'radical',
    radical: 'radical',
    exponential: 'exponential',
    logarithmic: 'exponential',
    inequalities: 'linear',
    'linear-inequality': 'linear',
    'inequality-problems': 'tariffs',
    'quadratic-inequality': 'sign',
    'graphic-inequality': 'graphic',
    'inequality-systems': 'system'
}

/* ---------- Sets of real numbers: unions of intervals ---------- */

export type Relation = '<' | '≤' | '>' | '≥'
export const RELATIONS: Relation[] = ['<', '≤', '>', '≥']
export const relationLatex: Record<Relation, string> = { '<': '<', '≤': '\\le', '>': '>', '≥': '\\ge' }
export const flip: Record<Relation, Relation> = { '<': '>', '≤': '≥', '>': '<', '≥': '≤' }
export const holds = (left: number, relation: Relation, right: number) => (relation === '<' ? left < right : relation === '≤' ? left <= right : relation === '>' ? left > right : left >= right)
const strict = (relation: Relation) => relation === '<' || relation === '>'

/** An interval; null is an infinite end. A single point has from = to, both closed */
export interface Span {
    from: number | null
    to: number | null
    closedFrom: boolean
    closedTo: boolean
}

export const span = (from: number | null, to: number | null, closedFrom = false, closedTo = false): Span => ({ from, to, closedFrom: from !== null && closedFrom, closedTo: to !== null && closedTo })

/** x R value as an interval */
export function ray(relation: Relation, value: number): Span {
    return relation === '<' || relation === '≤' ? span(null, value, false, relation === '≤') : span(value, null, relation === '≥', false)
}

export const spanContains = (s: Span, x: number) => (s.from === null || x > s.from || (x === s.from && s.closedFrom)) && (s.to === null || x < s.to || (x === s.to && s.closedTo))

/** The common part of two intervals, or null when they do not meet */
export function intersect(a: Span, b: Span): Span | null {
    let from = a.from
    let closedFrom = a.closedFrom
    if (b.from !== null && (from === null || b.from > from || (b.from === from && !b.closedFrom))) {
        from = b.from
        closedFrom = b.closedFrom
    }
    let to = a.to
    let closedTo = a.closedTo
    if (b.to !== null && (to === null || b.to < to || (b.to === to && !b.closedTo))) {
        to = b.to
        closedTo = b.closedTo
    }
    if (from !== null && to !== null && (from > to || (from === to && !(closedFrom && closedTo)))) return null
    return span(from, to, closedFrom, closedTo)
}

const endLatex = (value: number) => {
    const f = fraction(Math.round(value * 12), 12)
    if (f.denominator === 1) return String(f.numerator)
    return `${f.numerator < 0 ? '-' : ''}\\frac{${Math.abs(f.numerator)}}{${f.denominator}}`
}

/** (−∞, 3] ∪ {5}; ℝ for everything and ∅ for nothing */
export function setLatex(spans: Span[]): string {
    if (!spans.length) return '\\varnothing'
    return spans.map((s) => {
        if (s.from === null && s.to === null) return '\\mathbb{R}'
        if (s.from !== null && s.from === s.to) return `\\{${endLatex(s.from)}\\}`
        const left = s.from === null ? '(-\\infty' : `${s.closedFrom ? '[' : '('}${endLatex(s.from)}`
        const right = s.to === null ? '+\\infty)' : `${endLatex(s.to)}${s.closedTo ? ']' : ')'}`
        return `${left},\\,${right}`
    }).join('\\cup ')
}

/* ---------- 1. From the roots to the equation ---------- */

export const ROOTS_LIMITS = { a: { min: 1, max: 3 }, root: { min: -6, max: 6 } } as const

export interface RootsState {
    a: number
    r1: number
    r2: number
}

export const initialRootsState: RootsState = { a: 1, r1: 1, r2: 4 }

export const setRoots = (state: RootsState, patch: Partial<RootsState>): RootsState => ({
    a: clamp(patch.a ?? state.a, ROOTS_LIMITS.a.min, ROOTS_LIMITS.a.max),
    r1: clamp(patch.r1 ?? state.r1, ROOTS_LIMITS.root.min, ROOTS_LIMITS.root.max),
    r2: clamp(patch.r2 ?? state.r2, ROOTS_LIMITS.root.min, ROOTS_LIMITS.root.max)
})

export const rootsSum = (state: RootsState) => state.r1 + state.r2
export const rootsProduct = (state: RootsState) => state.r1 * state.r2
/** a x² − aS x + aP, highest power first */
export const rootsEquation = (state: RootsState): [number, number, number] => [state.a, -state.a * rootsSum(state), state.a * rootsProduct(state)]
const sameRoots = (state: RootsState, p: number, q: number) => (state.r1 === p && state.r2 === q) || (state.r1 === q && state.r2 === p)

export const rootsChallenges: LabChallenge<RootsState>[] = [
    { id: 65101, prompt: say('Aurkitu batura 5 eta biderkadura 6 duten bi erroak.', 'Encuentra las dos raíces que suman 5 y multiplican 6.', 'جد الجذرين اللذين مجموعهما 5 وجداؤهما 6.'), hint: say('$x^{2}-5x+6=0$: bi zenbaki txiki eta positibo.', '$x^{2}-5x+6=0$: dos números pequeños y positivos.', '$x^{2}-5x+6=0$: عددان صغيران موجبان.'), isSolved: (state) => sameRoots(state, 2, 3) },
    { id: 65102, prompt: say('Eraiki ekuazio bat, $x$-ren gairik gabea eta biderkadura $-16$ duena.', 'Construye una ecuación sin término en $x$ y con producto $-16$.', 'ابنِ معادلة بلا حد في $x$ وجداء جذريها $-16$.'), hint: say('Batura 0: erro aurkakoak.', 'Suma 0: raíces opuestas.', 'المجموع 0: جذران متعاكسان.'), isSolved: (state) => rootsSum(state) === 0 && rootsProduct(state) === -16 },
    { id: 65103, prompt: say('Lortu erro bikoitza duen ekuazio bat, gai askea 9 izanik.', 'Consigue una ecuación con raíz doble y término independiente 9.', 'احصل على معادلة لها جذر مضاعف وحدها الثابت 9.'), hint: say('Bi erro berdinak, eta $a\\cdot r^{2}=9$.', 'Dos raíces iguales, y $a\\cdot r^{2}=9$.', 'جذران متساويان، و$a\\cdot r^{2}=9$.'), isSolved: (state) => state.r1 === state.r2 && rootsEquation(state)[2] === 9 },
    { id: 65104, prompt: say('Eraiki $2x^{2}-2x-12=0$ ekuazioa.', 'Construye la ecuación $2x^{2}-2x-12=0$.', 'ابنِ المعادلة $2x^{2}-2x-12=0$.'), hint: say('$a=2$; erroek 1 batu eta $-6$ biderkatzen dute.', '$a=2$; las raíces suman 1 y multiplican $-6$.', '$a=2$؛ مجموع الجذرين 1 وجداؤهما $-6$.'), isSolved: (state) => rootsEquation(state).join() === '2,-2,-12' }
]

/* ---------- 2. A biquadratic from its two t roots ---------- */

export const T_LIMITS = { min: -4, max: 9 } as const

export interface BiquadraticState {
    t1: number
    t2: number
}

export const initialBiquadraticState: BiquadraticState = { t1: 1, t2: 4 }

export const setBiquadratic = (state: BiquadraticState, patch: Partial<BiquadraticState>): BiquadraticState => ({
    t1: clamp(patch.t1 ?? state.t1, T_LIMITS.min, T_LIMITS.max),
    t2: clamp(patch.t2 ?? state.t2, T_LIMITS.min, T_LIMITS.max)
})

/** x⁴ − (t₁ + t₂)x² + t₁t₂, highest power first */
export const biquadraticPoly = (state: BiquadraticState) => [1, 0, -(state.t1 + state.t2), 0, state.t1 * state.t2]
export const biquadraticLatex = (state: BiquadraticState) => polyLatex(biquadraticPoly(state))
export const resolventLatex = (state: BiquadraticState) => polyLatex([1, -(state.t1 + state.t2), state.t1 * state.t2], 't')

/** The x that one t gives: ±√t, 0, or none */
export const xFromT = (t: number): number[] => (t < 0 ? [] : t === 0 ? [0] : [-Math.sqrt(t), Math.sqrt(t)])

/** The distinct real solutions, smallest first */
export const biquadraticSolutions = (state: BiquadraticState) => [...new Set([...xFromT(state.t1), ...xFromT(state.t2)])].sort((p, q) => p - q)

export const biquadraticChallenges: LabChallenge<BiquadraticState>[] = [
    { id: 65201, prompt: say('Ebatzi $x^{4}-13x^{2}+36=0$.', 'Resuelve $x^{4}-13x^{2}+36=0$.', 'حلّ $x^{4}-13x^{2}+36=0$.'), hint: say('t-ek 13 batu eta 36 biderkatzen dute.', 'Las t suman 13 y multiplican 36.', 'مجموع قيمتي t هو 13 وجداؤهما 36.'), isSolved: (state) => biquadraticLatex(state) === 'x^{4}-13x^{2}+36' },
    { id: 65202, prompt: say('Lortu zehazki bi ebazpen dituen bikarratu bat.', 'Consigue una bicuadrada con exactamente dos soluciones.', 'احصل على معادلة ثنائية التربيع لها حلّان بالضبط.'), hint: say('t positibo bat eta beste bat negatiboa.', 'Una t positiva y otra negativa.', 'قيمة t موجبة وأخرى سالبة.'), isSolved: (state) => biquadraticSolutions(state).length === 2 },
    { id: 65203, prompt: say('Lortu zehazki hiru ebazpen dituen bikarratu bat.', 'Consigue una bicuadrada con exactamente tres soluciones.', 'احصل على معادلة ثنائية التربيع لها ثلاثة حلول بالضبط.'), hint: say('t = 0 balioak x bakarra ematen du.', 't = 0 da una sola x.', 't = 0 تعطي قيمة واحدة لـ x.'), isSolved: (state) => biquadraticSolutions(state).length === 3 },
    { id: 65204, prompt: say('Lortu ebazpenik gabeko bikarratu bat.', 'Consigue una bicuadrada sin ninguna solución.', 'احصل على معادلة ثنائية التربيع بلا أي حل.'), hint: say('Bi t-ak negatiboak.', 'Las dos t negativas.', 'قيمتا t سالبتان.'), isSolved: (state) => biquadraticSolutions(state).length === 0 }
]

/* ---------- 3. Exponential equations: two exponents that meet ---------- */

/** base^(p₁x + q₁) = base^(p₂x + q₂), and how each side is written in the book */
export const exponentialEquations: Array<{ base: number; left: [number, number]; right: [number, number]; latex: string }> = [
    { base: 2, left: [1, 1], right: [0, 4], latex: '2^{x+1}=16' },
    { base: 3, left: [2, -1], right: [0, 3], latex: '3^{2x-1}=27' },
    { base: 5, left: [1, -2], right: [0, -2], latex: '5^{x-2}=\\frac{1}{25}' },
    { base: 3, left: [2, 2], right: [1, 5], latex: '9^{x+1}=3^{x+5}' }
]

export const EXPONENT_X = { min: -4, max: 6 } as const

export interface ExponentialState {
    equation: number
    x: number
}

export const initialExponentialState: ExponentialState = { equation: 0, x: 0 }

export const setExponential = (state: ExponentialState, patch: Partial<ExponentialState>): ExponentialState => ({
    equation: clamp(patch.equation ?? state.equation, 0, exponentialEquations.length - 1),
    x: clamp(patch.x ?? state.x, EXPONENT_X.min, EXPONENT_X.max)
})

export function exponents(state: ExponentialState): [number, number] {
    const { left, right } = exponentialEquations[state.equation]
    return [left[0] * state.x + left[1], right[0] * state.x + right[1]]
}

/** The exponent as LaTeX: 2x-1, x+5, 4 */
export const exponentLatex = ([p, q]: [number, number]) => (p === 0 ? String(q) : polyLatex([p, q]))

const exponentialSolved = (index: number) => (state: ExponentialState) => state.equation === index && exponents(state)[0] === exponents(state)[1]

export const exponentialChallenges: LabChallenge<ExponentialState>[] = exponentialEquations.map((equation, index) => ({
    id: 65301 + index,
    prompt: say(`Ebatzi $${equation.latex}$.`, `Resuelve $${equation.latex}$.`, `حلّ $${equation.latex}$.`),
    hint: [
        say('$16=2^{4}$', '$16=2^{4}$', '$16=2^{4}$'),
        say('$27=3^{3}$, beraz $2x-1=3$.', '$27=3^{3}$, así que $2x-1=3$.', '$27=3^{3}$، إذن $2x-1=3$.'),
        say('$\\frac{1}{25}=5^{-2}$', '$\\frac{1}{25}=5^{-2}$', '$\\frac{1}{25}=5^{-2}$'),
        say('$9^{x+1}=3^{2x+2}$', '$9^{x+1}=3^{2x+2}$', '$9^{x+1}=3^{2x+2}$')
    ][index],
    isSolved: exponentialSolved(index)
}))

/* ---------- 4. A linear inequality ax + b R c ---------- */

export const LINEAR_LIMITS = { a: { min: -5, max: 5 }, b: { min: -9, max: 9 }, c: { min: -9, max: 12 }, probe: { min: -6, max: 6 } } as const

export interface LinearState {
    a: number
    b: number
    c: number
    relation: Relation
    probe: number
}

export const initialLinearState: LinearState = { a: 2, b: -1, c: 5, relation: '≤', probe: 0 }

export function setLinear(state: LinearState, patch: Partial<LinearState>): LinearState {
    let a = clamp(patch.a ?? state.a, LINEAR_LIMITS.a.min, LINEAR_LIMITS.a.max)
    // a = 0 is not an inequality in x: jump over it
    if (a === 0) a = (patch.a ?? state.a) < state.a ? -1 : 1
    return {
        a,
        b: clamp(patch.b ?? state.b, LINEAR_LIMITS.b.min, LINEAR_LIMITS.b.max),
        c: clamp(patch.c ?? state.c, LINEAR_LIMITS.c.min, LINEAR_LIMITS.c.max),
        relation: patch.relation ?? state.relation,
        probe: clamp(patch.probe ?? state.probe, LINEAR_LIMITS.probe.min, LINEAR_LIMITS.probe.max)
    }
}

/** x R' (c − b)/a, with the sense flipped when a is negative */
export function linearSolution(state: Pick<LinearState, 'a' | 'b' | 'c' | 'relation'>): { relation: Relation; end: FractionValue; flipped: boolean } {
    const flipped = state.a < 0
    return { relation: flipped ? flip[state.relation] : state.relation, end: fraction(state.c - state.b, state.a), flipped }
}

export const linearSpan = (state: LinearState) => {
    const { relation, end } = linearSolution(state)
    return ray(relation, end.numerator / end.denominator)
}

/** 2x-1 */
export const linearLeftLatex = (state: Pick<LinearState, 'a' | 'b'>) => polyLatex([state.a, state.b])
export const probeHolds = (state: LinearState) => holds(state.a * state.probe + state.b, state.relation, state.c)
const solutionIs = (state: LinearState, relation: Relation, numerator: number, denominator = 1) => {
    const { relation: r, end } = linearSolution(state)
    return r === relation && end.numerator === numerator && end.denominator === denominator
}

export const linearChallenges: LabChallenge<LinearState>[] = [
    { id: 65401, prompt: say('Ebatzi $-2x+4>10$.', 'Resuelve $-2x+4>10$.', 'حلّ $-2x+4>10$.'), hint: say('$a=-2$, $b=4$, $c=10$ eta $>$.', '$a=-2$, $b=4$, $c=10$ y $>$.', '$a=-2$ و$b=4$ و$c=10$ و$>$.'), isSolved: (state) => state.a === -2 && state.b === 4 && state.c === 10 && state.relation === '>' },
    { id: 65402, prompt: say('Lortu $x\\ge 2$ soluzioa, $x$-ren koefiziente negatibo batekin.', 'Consigue la solución $x\\ge 2$ con un coeficiente de $x$ negativo.', 'احصل على الحل $x\\ge 2$ بمعامل سالب لـ $x$.'), hint: say('Negatiboz zatitzean zentzua aldatzen da: hasieran $\\le$.', 'Al dividir entre un negativo cambia el sentido: al principio $\\le$.', 'عند القسمة على سالب ينقلب الاتجاه: في البداية $\\le$.'), isSolved: (state) => state.a < 0 && solutionIs(state, '≥', 2) },
    { id: 65403, prompt: say('Lortu $x\\le -1$ soluzioa eta jarri $x$ muturrean: betetzen du?', 'Consigue la solución $x\\le -1$ y pon $x$ en el extremo: ¿la cumple?', 'احصل على الحل $x\\le -1$ وضع $x$ عند الطرف: هل يحققها؟'), hint: say('$\\le$: muturra sartzen da.', '$\\le$: el extremo entra.', '$\\le$: الطرف داخل.'), isSolved: (state) => solutionIs(state, '≤', -1) && state.probe === -1 },
    { id: 65404, prompt: say('Lortu $x<\\frac{3}{2}$ soluzioa.', 'Consigue la solución $x<\\frac{3}{2}$.', 'احصل على الحل $x<\\frac{3}{2}$.'), hint: say('Adibidez $2x<3$.', 'Por ejemplo $2x<3$.', 'مثلًا $2x<3$.'), isSolved: (state) => solutionIs(state, '<', 3, 2) }
]

/* ---------- 5. Two tariffs: fixed fee + price per unit ---------- */

export const tariffScenarios: Array<{ a: [number, number]; b: [number, number]; unit: LocalizedText; title: LocalizedText }> = [
    { a: [20, 2], b: [0, 5], unit: say('ordu', 'horas', 'ساعات'), title: say('Kiroldegia', 'Gimnasio', 'النادي الرياضي') },
    { a: [0, 4], b: [30, 1], unit: say('km', 'km', 'كم'), title: say('Bizikleta', 'Bicicleta', 'الدراجة') },
    { a: [50, 3], b: [14, 7], unit: say('GB', 'GB', 'GB'), title: say('Mugikorra', 'Móvil', 'الهاتف') }
]

export const TARIFF_X = { min: 0, max: 20 } as const

export interface TariffsState {
    scenario: number
    x: number
}

export const initialTariffsState: TariffsState = { scenario: 0, x: 0 }

export const setTariffs = (state: TariffsState, patch: Partial<TariffsState>): TariffsState => ({
    scenario: clamp(patch.scenario ?? state.scenario, 0, tariffScenarios.length - 1),
    x: clamp(patch.x ?? state.x, TARIFF_X.min, TARIFF_X.max)
})

export const tariffCost = ([fixed, rate]: [number, number], x: number) => fixed + rate * x
export const tariffCosts = (state: TariffsState): [number, number] => {
    const { a, b } = tariffScenarios[state.scenario]
    return [tariffCost(a, state.x), tariffCost(b, state.x)]
}
/** Where the two lines cross */
export const tariffCross = (scenario: number) => {
    const { a, b } = tariffScenarios[scenario]
    return fraction(b[0] - a[0], a[1] - b[1])
}

export const tariffsChallenges: LabChallenge<TariffsState>[] = [
    { id: 65501, prompt: say('Kiroldegia: zenbat ordutik aurrera da A merkeagoa? Jarri $x$ lehen ordu horretan.', 'Gimnasio: ¿a partir de cuántas horas es más barata la A? Pon $x$ en la primera de esas horas.', 'النادي: ابتداءً من كم ساعة تكون A أرخص؟ ضع $x$ عند أول تلك الساعات.'), hint: say('$20+2x<5x$ → $x>\\frac{20}{3}$', '$20+2x<5x$ → $x>\\frac{20}{3}$', '$20+2x<5x$ → $x>\\frac{20}{3}$'), isSolved: (state) => state.scenario === 0 && state.x === 7 },
    { id: 65502, prompt: say('Bizikleta: A merkeagoa da gehienez zenbat km-tan? Jarri $x$ hor.', 'Bicicleta: ¿hasta cuántos km como mucho es más barata la A? Pon $x$ ahí.', 'الدراجة: حتى كم كم على الأكثر تكون A أرخص؟ ضع $x$ هناك.'), hint: say('$4x<30+x$ → $x<10$', '$4x<30+x$ → $x<10$', '$4x<30+x$ → $x<10$'), isSolved: (state) => state.scenario === 1 && state.x === 9 },
    { id: 65503, prompt: say('Mugikorra: zenbat GB-tan kostatzen dira berdin?', 'Móvil: ¿con cuántos GB cuestan lo mismo?', 'الهاتف: عند كم GB تتساوى التكلفة؟'), hint: say('$50+3x=14+7x$', '$50+3x=14+7x$', '$50+3x=14+7x$'), isSolved: (state) => state.scenario === 2 && state.x === 9 },
    { id: 65504, prompt: say('Mugikorra: gutxienez zenbat GB behar dira A merkeagoa izateko?', 'Móvil: ¿cuántos GB hacen falta como mínimo para que la A sea más barata?', 'الهاتف: كم GB على الأقل حتى تكون A أرخص؟'), hint: say('$50+3x<14+7x$ → $x>9$', '$50+3x<14+7x$ → $x>9$', '$50+3x<14+7x$ → $x>9$'), isSolved: (state) => state.scenario === 2 && state.x === 10 }
]

/* ---------- 6. The sign of a(x − r₁)(x − r₂) ---------- */

export const SIGN_ROOT = { min: -5, max: 5 } as const

export interface SignState {
    a: 1 | -1
    r1: number
    r2: number
    relation: Relation
}

export const initialSignState: SignState = { a: 1, r1: -1, r2: 3, relation: '<' }

export const setSign = (state: SignState, patch: Partial<SignState>): SignState => ({
    a: patch.a ?? state.a,
    r1: clamp(patch.r1 ?? state.r1, SIGN_ROOT.min, SIGN_ROOT.max),
    r2: clamp(patch.r2 ?? state.r2, SIGN_ROOT.min, SIGN_ROOT.max),
    relation: patch.relation ?? state.relation
})

export const signPoly = (state: SignState) => [state.a, -state.a * (state.r1 + state.r2), state.a * state.r1 * state.r2]
export const signValue = (state: SignState, x: number) => state.a * (x - state.r1) * (x - state.r2)

/** The solution of a(x − r₁)(x − r₂) R 0 */
export function signSolution(state: SignState): Span[] {
    const lo = Math.min(state.r1, state.r2)
    const hi = Math.max(state.r1, state.r2)
    // Where the polynomial is positive or negative, as sought
    const wantPositive = (state.relation === '>' || state.relation === '≥') === state.a > 0
    const closed = !strict(state.relation)
    if (lo === hi) {
        if (wantPositive) return closed ? [span(null, null)] : [span(null, lo), span(lo, null)]
        return closed ? [span(lo, lo, true, true)] : []
    }
    return wantPositive ? [span(null, lo, false, closed), span(hi, null, closed, false)] : [span(lo, hi, closed, closed)]
}

export const signChallenges: LabChallenge<SignState>[] = [
    { id: 65601, prompt: say('Ebatzi $x^{2}-2x-3\\le 0$.', 'Resuelve $x^{2}-2x-3\\le 0$.', 'حلّ $x^{2}-2x-3\\le 0$.'), hint: say('Erroak $-1$ eta 3 dira.', 'Las raíces son $-1$ y 3.', 'الجذران $-1$ و3.'), isSolved: (state) => signPoly(state).join() === '1,-2,-3' && state.relation === '≤' },
    { id: 65602, prompt: say('Lortu $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$ soluzioa.', 'Consigue la solución $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$.', 'احصل على الحل $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$.'), hint: say('$x^{2}-4>0$', '$x^{2}-4>0$', '$x^{2}-4>0$'), isSolved: (state) => setLatex(signSolution(state)) === '(-\\infty,\\,-2)\\cup (2,\\,+\\infty)' },
    { id: 65603, prompt: say('Lortu soluziorik gabeko inekuazio bat.', 'Consigue una inecuación sin solución.', 'احصل على متراجحة بلا حل.'), hint: say('Erro bikoitza eta $x^{2}<0$ bezalako zerbait.', 'Raíz doble y algo como $x^{2}<0$.', 'جذر مضاعف وشيء مثل $x^{2}<0$.'), isSolved: (state) => signSolution(state).length === 0 },
    { id: 65604, prompt: say('Lortu zenbaki bakar bat soluzio duen inekuazio bat.', 'Consigue una inecuación cuya solución sea un único número.', 'احصل على متراجحة حلها عدد واحد فقط.'), hint: say('$(x-1)^{2}\\le 0$', '$(x-1)^{2}\\le 0$', '$(x-1)^{2}\\le 0$'), isSolved: (state) => { const solution = signSolution(state); return solution.length === 1 && solution[0].from !== null && solution[0].from === solution[0].to } }
]

/* ---------- 7. The parabola y = x² against the line y = mx + n ---------- */

export const GRAPHIC_LIMITS = { m: { min: -4, max: 4 }, n: { min: -4, max: 9 } } as const

export interface GraphicState {
    m: number
    n: number
}

export const initialGraphicState: GraphicState = { m: 1, n: 2 }

export const setGraphic = (state: GraphicState, patch: Partial<GraphicState>): GraphicState => ({
    m: clamp(patch.m ?? state.m, GRAPHIC_LIMITS.m.min, GRAPHIC_LIMITS.m.max),
    n: clamp(patch.n ?? state.n, GRAPHIC_LIMITS.n.min, GRAPHIC_LIMITS.n.max)
})

/** x² = mx + n ⇔ x² − mx − n = 0 */
export const graphicDiscriminant = (state: GraphicState) => state.m * state.m + 4 * state.n
/** Where the parabola and the line meet, smallest first */
export function graphicCrossings(state: GraphicState): number[] {
    const delta = graphicDiscriminant(state)
    if (delta < 0) return []
    if (delta === 0) return [state.m / 2]
    return [(state.m - Math.sqrt(delta)) / 2, (state.m + Math.sqrt(delta)) / 2]
}

export const graphicChallenges: LabChallenge<GraphicState>[] = [
    { id: 65701, prompt: say('Ebatzi grafikoki $x^{2}<4$.', 'Resuelve gráficamente $x^{2}<4$.', 'حلّ بيانيًا $x^{2}<4$.'), hint: say('Zuzen horizontala: $m=0$.', 'Una recta horizontal: $m=0$.', 'مستقيم أفقي: $m=0$.'), isSolved: (state) => state.m === 0 && state.n === 4 },
    { id: 65702, prompt: say('Egin parabola zuzenaren azpian egotea $-1$ eta 3 artean bakarrik.', 'Haz que la parábola quede por debajo de la recta solo entre $-1$ y 3.', 'اجعل القطع المكافئ تحت المستقيم بين $-1$ و3 فقط.'), hint: say('$x^{2}-mx-n=(x+1)(x-3)$', '$x^{2}-mx-n=(x+1)(x-3)$', '$x^{2}-mx-n=(x+1)(x-3)$'), isSolved: (state) => graphicCrossings(state).join() === '-1,3' },
    { id: 65703, prompt: say('Egin zuzena parabolaren ukitzailea izatea, $x=1$ puntuan.', 'Haz que la recta sea tangente a la parábola en $x=1$.', 'اجعل المستقيم مماسًا للقطع المكافئ عند $x=1$.'), hint: say('$x^{2}-2x+1=(x-1)^{2}$', '$x^{2}-2x+1=(x-1)^{2}$', '$x^{2}-2x+1=(x-1)^{2}$'), isSolved: (state) => state.m === 2 && state.n === -1 },
    { id: 65704, prompt: say('Egin $x^{2}<mx+n$ inekuazioak soluziorik ez izatea, $m=2$ izanik.', 'Haz que $x^{2}<mx+n$ no tenga solución, con $m=2$.', 'اجعل $x^{2}<mx+n$ بلا حل مع $m=2$.'), hint: say('Zuzena parabolaren azpitik pasatu behar da: $4+4n\\le 0$.', 'La recta tiene que pasar por debajo de la parábola: $4+4n\\le 0$.', 'يجب أن يمر المستقيم تحت القطع: $4+4n\\le 0$.'), isSolved: (state) => state.m === 2 && graphicDiscriminant(state) <= 0 }
]

/* ---------- 8. A system of two inequalities x R₁ p, x R₂ q ---------- */

export const SYSTEM_LIMIT = 6

export interface SystemState {
    p: number
    first: Relation
    q: number
    second: Relation
}

export const initialSystemState: SystemState = { p: -2, first: '≥', q: 3, second: '<' }

export const setSystem = (state: SystemState, patch: Partial<SystemState>): SystemState => ({
    p: clamp(patch.p ?? state.p, -SYSTEM_LIMIT, SYSTEM_LIMIT),
    first: patch.first ?? state.first,
    q: clamp(patch.q ?? state.q, -SYSTEM_LIMIT, SYSTEM_LIMIT),
    second: patch.second ?? state.second
})

export const systemSpans = (state: SystemState): [Span, Span] => [ray(state.first, state.p), ray(state.second, state.q)]
export const systemSolution = (state: SystemState): Span[] => {
    const both = intersect(...systemSpans(state))
    return both ? [both] : []
}
const systemIs = (state: SystemState, latex: string) => setLatex(systemSolution(state)) === latex

export const systemChallenges: LabChallenge<SystemState>[] = [
    { id: 65801, prompt: say('Lortu $[-1,\\,4)$ soluzioa duen sistema bat.', 'Consigue un sistema con solución $[-1,\\,4)$.', 'احصل على نظام حله $[-1,\\,4)$.'), hint: say('$x\\ge -1$ eta $x<4$.', '$x\\ge -1$ y $x<4$.', '$x\\ge -1$ و$x<4$.'), isSolved: (state) => systemIs(state, '[-1,\\,4)') },
    { id: 65802, prompt: say('Lortu soluziorik gabeko sistema bat.', 'Consigue un sistema sin solución.', 'احصل على نظام بلا حل.'), hint: say('Zuzenerdiek bizkarra ematen diote elkarri: $x<0$ eta $x>2$.', 'Las semirrectas se dan la espalda: $x<0$ y $x>2$.', 'نصفا المستقيم متدابران: $x<0$ و$x>2$.'), isSolved: (state) => systemSolution(state).length === 0 },
    { id: 65803, prompt: say('Lortu soluzioa zenbaki bakarra izatea: $x=2$.', 'Consigue que la solución sea un solo número: $x=2$.', 'اجعل الحل عددًا واحدًا: $x=2$.'), hint: say('$x\\ge 2$ eta $x\\le 2$.', '$x\\ge 2$ y $x\\le 2$.', '$x\\ge 2$ و$x\\le 2$.'), isSolved: (state) => systemIs(state, '\\{2\\}') },
    { id: 65804, prompt: say('Lortu $x>3$ soluzioa, bi inekuazioak eskuinera begira eta muga desberdinekin.', 'Consigue la solución $x>3$ con las dos inecuaciones mirando a la derecha y con extremos distintos.', 'احصل على الحل $x>3$ والمتراجحتان نحو اليمين وبطرفين مختلفين.'), hint: say('Zati komuna: bi zuzenerdietako txikiena.', 'La parte común: la más corta de las dos semirrectas.', 'الجزء المشترك: أقصر نصفي المستقيم.'), isSolved: (state) => (state.first === '>' || state.first === '≥') && (state.second === '>' || state.second === '≥') && state.p !== state.q && systemIs(state, '(3,\\,+\\infty)') }
]

/* ---------- Progress ids: the borrowed tools' challenges, then the new ones ---------- */

export const equationsInequalitiesLabChallengeIds = [
    ...quadraticChallenges,
    ...rootsChallenges,
    ...biquadraticChallenges,
    ...radicalChallenges,
    ...exponentialChallenges,
    ...linearChallenges,
    ...tariffsChallenges,
    ...signChallenges,
    ...graphicChallenges,
    ...systemChallenges
].map((challenge) => challenge.id)
