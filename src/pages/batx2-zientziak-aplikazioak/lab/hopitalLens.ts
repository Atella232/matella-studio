import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · L'Hôpital hurbiletik (L'Hôpital de cerca): a quotient f/g at a
   point a, and the learner steps x = a + h towards a from either side.
   The board draws f/g and f′/g′ and marks both at x; the readout gives
   their values. With 0/0 both approach the same number; with the last
   quotient, which is not indeterminate, f′/g′ goes elsewhere and the
   readout warns that the rule does not apply. Before drawing, the learner
   predicts whether the limit is smaller than 1 (<), equal to 1 (=) or
   larger than 1 (>).
   ========================================================================== */

export type QuotientId = 'sine' | 'exp' | 'cos' | 'poly' | 'log' | 'none'

export const QUOTIENTS: QuotientId[] = ['sine', 'exp', 'cos', 'poly', 'log', 'none']

interface QuotientSetup {
    f: (x: number) => number
    g: (x: number) => number
    df: (x: number) => number
    dg: (x: number) => number
    a: number
    /** The true limit of f/g at a */
    limit: number
    /** Whether f(a) = g(a) = 0 */
    indeterminate: boolean
    latex: string
    derivativeLatex: string
    limitLatex: string
    view: { yMin: number; yMax: number }
}

export const QUOTIENT_SETUP: Record<QuotientId, QuotientSetup> = {
    sine: { f: Math.sin, g: (x) => x, df: Math.cos, dg: () => 1, a: 0, limit: 1, indeterminate: true, latex: '\\frac{\\sin x}{x}', derivativeLatex: '\\frac{\\cos x}{1}', limitLatex: '1', view: { yMin: -0.2, yMax: 1.6 } },
    exp: { f: (x) => Math.exp(x) - 1, g: (x) => x, df: Math.exp, dg: () => 1, a: 0, limit: 1, indeterminate: true, latex: '\\frac{e^x-1}{x}', derivativeLatex: '\\frac{e^x}{1}', limitLatex: '1', view: { yMin: -0.2, yMax: 2.6 } },
    cos: { f: (x) => 1 - Math.cos(x), g: (x) => x * x, df: Math.sin, dg: (x) => 2 * x, a: 0, limit: 0.5, indeterminate: true, latex: '\\frac{1-\\cos x}{x^2}', derivativeLatex: '\\frac{\\sin x}{2x}', limitLatex: '\\frac{1}{2}', view: { yMin: -0.2, yMax: 1.2 } },
    poly: { f: (x) => x * x - 1, g: (x) => x - 1, df: (x) => 2 * x, dg: () => 1, a: 1, limit: 2, indeterminate: true, latex: '\\frac{x^2-1}{x-1}', derivativeLatex: '\\frac{2x}{1}', limitLatex: '2', view: { yMin: -0.2, yMax: 4.2 } },
    log: { f: Math.log, g: (x) => x - 1, df: (x) => 1 / x, dg: () => 1, a: 1, limit: 1, indeterminate: true, latex: '\\frac{\\ln x}{x-1}', derivativeLatex: '\\frac{1/x}{1}', limitLatex: '1', view: { yMin: -0.2, yMax: 2.6 } },
    none: { f: (x) => x + 1, g: (x) => x + 2, df: () => 1, dg: () => 1, a: 0, limit: 0.5, indeterminate: false, latex: '\\frac{x+1}{x+2}', derivativeLatex: '\\frac{1}{1}', limitLatex: '\\frac{1}{2}', view: { yMin: -0.2, yMax: 1.6 } }
}

/** How far from a the learner stands: x = a + h */
export const STEPS = [-0.8, -0.4, -0.1, -0.01, 0.01, 0.1, 0.4, 0.8]

export interface HopitalState {
    q: QuotientId
    /** The index of h in STEPS */
    k: number
    prediction: Prediction | null
}

export const initialHopitalState: HopitalState = { q: 'sine', k: 0, prediction: null }

export function setHopital(state: HopitalState, patch: Partial<Omit<HopitalState, 'prediction'>>): HopitalState {
    const q = patch.q ?? state.q
    const k = Math.min(STEPS.length - 1, Math.max(0, Math.round(patch.k ?? state.k)))
    if (q !== state.q) return { q, k, prediction: null }
    return { q, k, prediction: state.prediction }
}

/** f/g and f′/g′ at x = a + h */
export function hopitalValues(state: Pick<HopitalState, 'q' | 'k'>): { x: number; h: number; quotient: number; derivatives: number } {
    const setup = QUOTIENT_SETUP[state.q]
    const h = STEPS[state.k]
    const x = setup.a + h
    return { x, h, quotient: setup.f(x) / setup.g(x), derivatives: setup.df(x) / setup.dg(x) }
}

/** Is the limit smaller than, equal to or larger than 1? */
export const hopitalPrediction = (state: Pick<HopitalState, 'q'>): Prediction => compareTo(QUOTIENT_SETUP[state.q].limit, 1)

const at = (q: QuotientId, h: number) => (state: HopitalState) => state.q === q && Math.abs(STEPS[state.k] - h) < 1e-9

export const hopitalChallenges: LabChallenge<HopitalState>[] = [
    {
        id: 124301,
        prompt: say('Aurkitu 2 balio duen limitea, eta hurbildu $a$ puntura 0,01 baino gutxiagora.', 'Encuentra el límite que vale 2 y acércate a $a$ a menos de 0,01.', 'جد النهاية التي تساوي 2، واقترب من $a$ إلى أقل من 0.01.', 'Find the limit that is 2 and get closer to $a$ than 0.01.'),
        hint: same('$\\frac{x^2-1}{x-1}$'),
        isSolved: (state) => state.q === 'poly' && Math.abs(STEPS[state.k]) <= 0.01 + 1e-12
    },
    {
        id: 124302,
        prompt: say('Aurkitu L\'Hôpitalek emaitza okerra ematen duen zatidura.', 'Encuentra el cociente en el que L\'Hôpital da un resultado falso.', 'جد خارج القسمة الذي تعطي فيه قاعدة لوبيتال نتيجة خاطئة.', 'Find the quotient in which L\'Hôpital gives a wrong result.'),
        hint: say('Ordezkatu $x=a$: $\\frac{0}{0}$ ematen ez duena.', 'Sustituye $x=a$: el que no da $\\frac{0}{0}$.', 'عوّض $x=a$: الذي لا يعطي $\\frac{0}{0}$.', 'Substitute $x=a$: the one that does not give $\\frac{0}{0}$.'),
        isSolved: (state) => state.q === 'none'
    },
    {
        id: 124303,
        prompt: say('$\\frac{1-\\cos x}{x^2}$ zatidurarekin, hurbildu $\\frac{f}{g}$ eta $\\frac{f\'}{g\'}$ 0,01 baino gutxiago bereizten diren arte.', 'Con $\\frac{1-\\cos x}{x^2}$, acércate hasta que $\\frac{f}{g}$ y $\\frac{f\'}{g\'}$ difieran menos de 0,01.', 'مع $\\frac{1-\\cos x}{x^2}$، اقترب حتى يختلف $\\frac{f}{g}$ و$\\frac{f\'}{g\'}$ بأقل من 0.01.', 'With $\\frac{1-\\cos x}{x^2}$, get closer until $\\frac{f}{g}$ and $\\frac{f\'}{g\'}$ differ by less than 0.01.'),
        hint: say('Biak $\\frac{1}{2}$ baliora hurbiltzen dira.', 'Las dos se acercan a $\\frac{1}{2}$.', 'كلتاهما تقتربان من $\\frac{1}{2}$.', 'Both approach $\\frac{1}{2}$.'),
        isSolved: (state) => {
            const values = hopitalValues(state)
            return state.q === 'cos' && Math.abs(values.quotient - values.derivatives) < 0.01
        }
    },
    {
        id: 124304,
        prompt: say('$\\frac{\\sin x}{x}$ zatidurarekin, hurbildu 0 puntura ezkerretik, $x=-0{,}01$ arte.', 'Con $\\frac{\\sin x}{x}$, acércate a 0 por la izquierda hasta $x=-0{,}01$.', 'مع $\\frac{\\sin x}{x}$، اقترب من 0 من اليسار حتى $x=-0.01$.', 'With $\\frac{\\sin x}{x}$, approach 0 from the left until $x=-0{,}01$.'),
        hint: say('Mugitu $h$ zero aldera, zeinu negatiboarekin.', 'Mueve $h$ hacia 0 con signo negativo.', 'حرّك $h$ نحو 0 بإشارة سالبة.', 'Move $h$ towards 0 with a negative sign.'),
        isSolved: at('sine', -0.01)
    },
    {
        id: 124305,
        prompt: say('$\\frac{\\ln x}{x-1}$ zatidurarekin, jarri $x=1{,}01$ puntuan: zenbat balio dute bi zatidurek?', 'Con $\\frac{\\ln x}{x-1}$, ponte en $x=1{,}01$: ¿cuánto valen los dos cocientes?', 'مع $\\frac{\\ln x}{x-1}$، قف عند $x=1.01$: كم يساوي خارجا القسمة؟', 'With $\\frac{\\ln x}{x-1}$, stand at $x=1{,}01$: what are the two quotients?'),
        hint: say('$h=0{,}01$ da, $a=1$ puntutik.', 'Es $h=0{,}01$ desde $a=1$.', 'إنها $h=0.01$ ابتداءً من $a=1$.', 'It is $h=0{,}01$ from $a=1$.'),
        isSolved: at('log', 0.01)
    }
]

function same(text: string) {
    return say(text, text, text, text)
}

/** Endless practice: stand at a given distance from a, on a given side */
const hopitalMaker: LabChallengeMaker<HopitalState> = (random) => {
    const q = (['sine', 'exp', 'cos', 'poly', 'log'] as const)[randomInt(random, 0, 4)]
    const setup = QUOTIENT_SETUP[q]
    const k = [2, 3, 4, 5][randomInt(random, 0, 3)]
    const h = STEPS[k]
    const x = (setup.a + h).toFixed(2).replace(/\.?0+$/, '')
    const name = `$${setup.latex}$`
    const point = `$x=${x.replace('.', '{,}')}$`
    const pointAr = `$x=${x}$`
    return {
        prompt: say(`${name} zatidurarekin, jarri ${point} puntuan eta alderatu bi zatidurak.`, `Con ${name}, ponte en ${point} y compara los dos cocientes.`, `مع ${name}، قف عند ${pointAr} وقارن خارجي القسمة.`, `With ${name}, stand at ${point} and compare the two quotients.`),
        hint: say(`$a=${setup.a}$ puntutik $h$ distantzia.`, `La distancia $h$ desde $a=${setup.a}$.`, `المسافة $h$ ابتداءً من $a=${setup.a}$.`, `The distance $h$ from $a=${setup.a}$.`),
        isSolved: at(q, h),
        solution: { q, k, prediction: null }
    }
}

export const hopitalExtra = freshFrom(initialHopitalState, hopitalMaker)
