import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Balio absolutu tolestua (El valor absoluto doblado): the line
   y = mx + q with the part below the axis folded up, which is
   y = |mx + q|, and the horizontal line y = c. The relation =, < or >
   picks an equation or an inequality, and its solutions are the cuts or
   the part of the axis under (or over) the line. A probe x is placed and
   the learner first predicts whether |mx + q| is below c, exactly c or
   above it there. Pure logic, whole numbers only.
   ========================================================================== */

export type AbsoluteRelation = '=' | '<' | '>'

export const ABSOLUTE_LIMITS = { m: [1, 2, 3] as const, q: { min: -6, max: 6 }, c: { min: -2, max: 7 }, probe: { min: -6, max: 6 } }

export interface AbsoluteState {
    m: number
    q: number
    c: number
    relation: AbsoluteRelation
    probe: number
    prediction: Prediction | null
}

export const initialAbsoluteState: AbsoluteState = { m: 1, q: 0, c: 2, relation: '=', probe: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setAbsolute(state: AbsoluteState, patch: Partial<Omit<AbsoluteState, 'prediction'>>): AbsoluteState {
    const m = ABSOLUTE_LIMITS.m.includes((patch.m ?? state.m) as 1 | 2 | 3) ? (patch.m ?? state.m) : state.m
    const q = clamp(patch.q ?? state.q, ABSOLUTE_LIMITS.q.min, ABSOLUTE_LIMITS.q.max)
    const c = clamp(patch.c ?? state.c, ABSOLUTE_LIMITS.c.min, ABSOLUTE_LIMITS.c.max)
    const relation = patch.relation ?? state.relation
    const probe = clamp(patch.probe ?? state.probe, ABSOLUTE_LIMITS.probe.min, ABSOLUTE_LIMITS.probe.max)
    const same = m === state.m && q === state.q && c === state.c && relation === state.relation && probe === state.probe
    return { m, q, c, relation, probe, prediction: same ? state.prediction : null }
}

/** |mx + q| */
export const foldValue = ({ m, q }: Pick<AbsoluteState, 'm' | 'q'>, x: number) => Math.abs(m * x + q)
/** Below (<), on (=) or above (>) the line y = c at the probe */
export const absolutePrediction = (state: AbsoluteState): Prediction => compareTo(foldValue(state, state.probe), state.c)
/** Whether x solves |mx + q| (=, < or >) c */
export function isAbsoluteSolution(state: Pick<AbsoluteState, 'm' | 'q' | 'c' | 'relation'>, x: number): boolean {
    const value = foldValue(state, x)
    if (state.relation === '=') return Math.abs(value - state.c) < 1e-9
    return state.relation === '<' ? value < state.c - 1e-9 : value > state.c + 1e-9
}
/** Where |mx + q| = c: two points, one (c = 0) or none (c < 0), left to right */
export function absoluteCuts({ m, q, c }: Pick<AbsoluteState, 'm' | 'q' | 'c'>): number[] {
    if (c < 0) return []
    if (c === 0) return [-q / m]
    return [(-c - q) / m, (c - q) / m]
}

/** |mx + q| in LaTeX: |2x-3|, |x+1|, |3x| */
export function foldLatex({ m, q }: Pick<AbsoluteState, 'm' | 'q'>): string {
    const mx = m === 1 ? 'x' : `${m}x`
    return `|${mx}${q === 0 ? '' : q > 0 ? `+${q}` : `-${-q}`}|`
}
const relationLatex = (relation: AbsoluteRelation) => (relation === '=' ? '=' : relation)
/** The whole equation or inequality in LaTeX */
export const absoluteLatex = (state: Pick<AbsoluteState, 'm' | 'q' | 'c' | 'relation'>) => `${foldLatex(state)}${relationLatex(state.relation)}${state.c}`

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const setUp = (state: AbsoluteState, m: number, q: number, c: number, relation: AbsoluteRelation) => state.m === m && state.q === q && state.c === c && state.relation === relation

export const absoluteChallenges: LabChallenge<AbsoluteState>[] = [
    { id: 101201, prompt: say('Prestatu $|x-2|=3$ eta jarri zunda soluzio batean.', 'Prepara $|x-2|=3$ y pon la sonda en una solución.', 'حضّر $|x-2|=3$ وضع المسبار عند حل.', 'Set up $|x-2|=3$ and put the probe on a solution.'), hint: say('Bi soluzio daude: $x-2=3$ edo $x-2=-3$.', 'Hay dos: $x-2=3$ o $x-2=-3$.', 'هناك حلّان: $x-2=3$ أو $x-2=-3$.', 'There are two: $x-2=3$ or $x-2=-3$.'), isSolved: (state) => setUp(state, 1, -2, 3, '=') && isAbsoluteSolution(state, state.probe) },
    { id: 101202, prompt: say('Egin $|2x+q|=c$ ekuazioak soluziorik ez izatea.', 'Haz que $|2x+q|=c$ no tenga solución.', 'اجعل المعادلة $|2x+q|=c$ بلا حل.', 'Make $|2x+q|=c$ have no solution.'), hint: say('Balio absolutua ez da inoiz negatiboa.', 'Un valor absoluto nunca es negativo.', 'القيمة المطلقة ليست سالبة أبدًا.', 'An absolute value is never negative.'), isSolved: (state) => state.m === 2 && state.relation === '=' && state.c < 0 },
    { id: 101203, prompt: say('Prestatu $|2x-4|<6$ eta jarri zunda soluzio batean.', 'Prepara $|2x-4|<6$ y pon la sonda en una solución.', 'حضّر $|2x-4|<6$ وضع المسبار عند حل.', 'Set up $|2x-4|<6$ and put the probe on a solution.'), hint: say('0 zenbakitik 6 baino gutxiagora: $-6<2x-4<6$.', 'A menos de 6 del 0: $-6<2x-4<6$.', 'على بعد أقل من 6 عن 0: $-6<2x-4<6$.', 'Less than 6 from 0: $-6<2x-4<6$.'), isSolved: (state) => setUp(state, 2, -4, 6, '<') && isAbsoluteSolution(state, state.probe) },
    { id: 101204, prompt: say('$|x+1|>2$ inekuazioarekin, jarri zunda soluzio negatibo batean.', 'Con $|x+1|>2$, pon la sonda en una solución negativa.', 'مع $|x+1|>2$ ضع المسبار عند حل سالب.', 'With $|x+1|>2$, put the probe on a negative solution.'), hint: say('Ezkerreko zuzenerdia: $x+1<-2$.', 'La semirrecta de la izquierda: $x+1<-2$.', 'نصف المستقيم الأيسر: $x+1<-2$.', 'The half-line on the left: $x+1<-2$.'), isSolved: (state) => setUp(state, 1, 1, 2, '>') && state.probe < 0 && isAbsoluteSolution(state, state.probe) },
    { id: 101205, prompt: say('$|x-3|=c$ ekuazioak soluzio bakarra izan dezan, aukeratu $c$.', 'Elige $c$ para que $|x-3|=c$ tenga una sola solución.', 'اختر $c$ لتكون للمعادلة $|x-3|=c$ حل واحد فقط.', 'Choose $c$ so that $|x-3|=c$ has a single solution.'), hint: say('Zuzenak Vren erpinean ukitu behar du.', 'La recta tiene que tocar el pico de la V.', 'يجب أن يلمس المستقيم رأس الشكل V.', 'The line has to touch the tip of the V.'), isSolved: (state) => setUp(state, 1, -3, 0, '=') }
]

/** Endless practice: an equation or inequality with whole solutions, and the probe on one of them */
const absoluteMaker: LabChallengeMaker<AbsoluteState> = (random) => {
    for (;;) {
        const m = pick(random, [1, 2])
        const q = randomInt(random, -4, 4)
        const relation = pick<AbsoluteRelation>(random, ['=', '<', '>'])
        const c = randomInt(random, 1, 5)
        const base: AbsoluteState = { m, q, c, relation, probe: 0, prediction: null }
        const probes = Array.from({ length: 13 }, (_, i) => i - 6).filter((x) => isAbsoluteSolution(base, x))
        if (probes.length === 0) continue
        const latex = absoluteLatex(base)
        return {
            prompt: say(`Prestatu $${latex}$ eta jarri zunda soluzio batean.`, `Prepara $${latex}$ y pon la sonda en una solución.`, `حضّر $${latex}$ وضع المسبار عند حل.`, `Set up $${latex}$ and put the probe on a solution.`),
            hint: relation === '='
                ? say('Bi kasuak: barrukoa $c$ edo $-c$.', 'Los dos casos: lo de dentro vale $c$ o $-c$.', 'الحالتان: ما في الداخل يساوي $c$ أو $-c$.', 'The two cases: the inside is $c$ or $-c$.')
                : relation === '<'
                    ? say('Zuzenaren azpiko zatia: tarte bat.', 'La parte bajo la recta: un intervalo.', 'الجزء تحت المستقيم: مجال واحد.', 'The part under the line: an interval.')
                    : say('Zuzenaren gaineko zatia: bi zuzenerdi.', 'La parte sobre la recta: dos semirrectas.', 'الجزء فوق المستقيم: نصفا مستقيم.', 'The part over the line: two half-lines.'),
            isSolved: (state) => setUp(state, m, q, c, relation) && isAbsoluteSolution(state, state.probe),
            solution: { ...base, probe: pick(random, probes) }
        }
    }
}

export const absoluteExtra = freshFrom(initialAbsoluteState, absoluteMaker)
