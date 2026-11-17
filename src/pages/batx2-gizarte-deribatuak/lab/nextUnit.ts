import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Hurrengo unitatea (La unidad siguiente): three cost functions and a
   production x; the board zooms in around x and draws the tangent of
   slope C'(x) and the real step C(x + 1) − C(x). A workshop with a fixed
   cost per unit (straight line: both are the same), a crowded factory
   (convex: the next unit costs a little more than C'(x)) and a firm with
   economies of scale (concave: a little less). Before drawing, the
   learner predicts which of the three it is.
   ========================================================================== */

export type CostKind = 'line' | 'crowded' | 'scale'

export const COST_KINDS: CostKind[] = ['line', 'crowded', 'scale']

export const UNITS = [10, 20, 50, 100, 160, 200]

export interface NextState {
    kind: CostKind
    /** Index in UNITS */
    step: number
    prediction: Prediction | null
}

export const initialNextState: NextState = { kind: 'crowded', step: 0, prediction: null }

interface Cost {
    c: (x: number) => number
    d: (x: number) => number
    latex: string
    /** The next unit against C'(x): less (concave), the same (line) or more (convex) */
    trend: Prediction
}

export const COSTS: Record<CostKind, Cost> = {
    line: { c: (x) => 300 + 12 * x, d: () => 12, latex: 'C(x)=300+12x', trend: '=' },
    crowded: { c: (x) => 0.05 * x * x + 4 * x + 200, d: (x) => 0.1 * x + 4, latex: 'C(x)=0{,}05x^2+4x+200', trend: '>' },
    scale: { c: (x) => 400 + 30 * Math.sqrt(x), d: (x) => 15 / Math.sqrt(x), latex: 'C(x)=400+30\\sqrt{x}', trend: '<' }
}

export function setNext(state: NextState, patch: Partial<Omit<NextState, 'prediction'>>): NextState {
    const kind = patch.kind ?? state.kind
    const step = Math.min(UNITS.length - 1, Math.max(0, Math.round(patch.step ?? state.step)))
    return { kind, step, prediction: kind === state.kind ? state.prediction : null }
}

export const unitsOf = (state: Pick<NextState, 'step'>) => UNITS[state.step]
export const marginalOf = (state: Pick<NextState, 'kind' | 'step'>) => COSTS[state.kind].d(unitsOf(state))
export const nextCostOf = (state: Pick<NextState, 'kind' | 'step'>) => COSTS[state.kind].c(unitsOf(state) + 1) - COSTS[state.kind].c(unitsOf(state))
export const nextPrediction = (state: Pick<NextState, 'kind'>): Prediction => COSTS[state.kind].trend

const same = (text: string) => say(text, text, text, text)

export const nextChallenges: LabChallenge<NextState>[] = [
    {
        id: 146101,
        prompt: say("Lantegi beteta, bilatu $C'(x)=14$ den produkzioa.", "En la fábrica llena, busca la producción con $C'(x)=14$.", "في المصنع المزدحم، ابحث عن الإنتاج الذي يكون فيه $C'(x)=14$.", "In the crowded factory, find the production with $C'(x)=14$."),
        hint: same('$0{,}1x+4=14$'),
        isSolved: (state) => state.kind === 'crowded' && Math.abs(marginalOf(state) - 14) < 1e-9
    },
    {
        id: 146102,
        prompt: say("Eskala-ekonomiak dituen enpresan, bilatu $C'(x)=1{,}5$ den produkzioa.", "En la empresa con economías de escala, busca la producción con $C'(x)=1{,}5$.", "في الشركة ذات وفورات الحجم، ابحث عن الإنتاج الذي يكون فيه $C'(x)=1{,}5$.", "In the firm with economies of scale, find the production with $C'(x)=1{,}5$."),
        hint: same('$\\frac{15}{\\sqrt{x}}=1{,}5$'),
        isSolved: (state) => state.kind === 'scale' && Math.abs(marginalOf(state) - 1.5) < 1e-9
    },
    {
        id: 146103,
        prompt: say('Lantegi beteta, bilatu hurrengo unitateak 20 euro baino gehiago kostatzen duen produkzio txikiena.', 'En la fábrica llena, busca la menor producción en la que la unidad siguiente cuesta más de 20 €.', 'في المصنع المزدحم، ابحث عن أصغر إنتاج تكلّف فيه الوحدة التالية أكثر من 20 €.', 'In the crowded factory, find the smallest production where the next unit costs more than €20.'),
        hint: same('$0{,}1x+4{,}05>20$'),
        isSolved: (state) => state.kind === 'crowded' && unitsOf(state) === 160
    },
    {
        id: 146104,
        prompt: say('Lantegi linealean, egiaztatu hurrengo unitateak zehazki $C\'(x)$ kostatzen duela.', "En el taller lineal, comprueba que la unidad siguiente cuesta justo $C'(x)$.", "في الورشة الخطية، تحقق أن الوحدة التالية تكلّف $C'(x)$ تمامًا.", "In the linear workshop, check that the next unit costs exactly $C'(x)$."),
        hint: say('Zuzen batean malda ez da aldatzen.', 'En una recta la pendiente no cambia.', 'في المستقيم لا يتغير الميل.', 'On a line the slope does not change.'),
        isSolved: (state) => state.kind === 'line'
    },
    {
        id: 146105,
        prompt: say('Eskala-ekonomiak dituen enpresan, bilatu hurrengo unitateak 1,5 euro baino gutxiago kostatzen duen produkzio txikiena.', 'En la empresa con economías de escala, busca la menor producción en la que la unidad siguiente cuesta menos de 1,5 €.', 'في الشركة ذات وفورات الحجم، ابحث عن أصغر إنتاج تكلّف فيه الوحدة التالية أقل من 1.5 €.', 'In the firm with economies of scale, find the smallest production where the next unit costs less than €1.5.'),
        hint: same('$30(\\sqrt{x+1}-\\sqrt{x})<1{,}5$'),
        isSolved: (state) => state.kind === 'scale' && unitsOf(state) === 100
    }
]

const NAMES: Record<CostKind, LocalizedText> = {
    line: say('Lantegi linealean', 'En el taller lineal', 'في الورشة الخطية', 'In the linear workshop'),
    crowded: say('Lantegi beteta', 'En la fábrica llena', 'في المصنع المزدحم', 'In the crowded factory'),
    scale: say('Eskala-ekonomiak dituen enpresan', 'En la empresa con economías de escala', 'في الشركة ذات وفورات الحجم', 'In the firm with economies of scale')
}

/** Endless practice: set the production where the next unit costs about a given amount */
const nextMaker: LabChallengeMaker<NextState> = (random) => {
    const kind: CostKind = randomInt(random, 0, 1) === 0 ? 'crowded' : 'scale'
    const step = randomInt(random, 0, UNITS.length - 1)
    const value = Math.round(COSTS[kind].d(UNITS[step]) * 100) / 100
    const shown = String(value).replace('.', '{,}')
    const name = NAMES[kind]
    return {
        prompt: say(`${name.eu}, bilatu $C'(x)=${shown}$ den produkzioa.`, `${name.es}, busca la producción con $C'(x)=${shown}$.`, `${name.ar}، ابحث عن الإنتاج الذي يكون فيه $C'(x)=${shown}$.`, `${name.en}, find the production with $C'(x)=${shown}$.`),
        hint: say(`$C'(x)$ funtzioa: $${kind === 'crowded' ? '0{,}1x+4' : '\\frac{15}{\\sqrt{x}}'}$.`, `La función $C'(x)$: $${kind === 'crowded' ? '0{,}1x+4' : '\\frac{15}{\\sqrt{x}}'}$.`, `الدالة $C'(x)$: $${kind === 'crowded' ? '0{,}1x+4' : '\\frac{15}{\\sqrt{x}}'}$.`, `The function $C'(x)$: $${kind === 'crowded' ? '0{,}1x+4' : '\\frac{15}{\\sqrt{x}}'}$.`),
        isSolved: (state) => state.kind === kind && state.step === step,
        solution: { kind, step, prediction: null }
    }
}

export const nextExtra = freshFrom(initialNextState, nextMaker)
