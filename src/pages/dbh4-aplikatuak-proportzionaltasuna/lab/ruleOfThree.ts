import { checkAnswer, divide, equals, fraction, multiply, parseFractionInput, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readLabAnswer } from '../answers.ts'
import { roundedAnswer } from './percentBar.ts'

/* ==========================================================================
   The rule of three with arrows: two rows, one per magnitude, and a column
   per value. The learner first decides whether the magnitudes are direct
   or inverse; then the arrows appear. Across the top row the first
   magnitude is multiplied by some number (×k, or ÷a and ×c going through
   1); across the bottom row the other one is multiplied by the same number
   if the relation is direct, and divided by it if it is inverse. Finally
   the learner writes x. Tests in tests/proportzionaltasuna-dbh4ap-rule.test.ts.
   ========================================================================== */

export type RuleContext = 'price' | 'distance' | 'workers' | 'speed' | 'food' | 'cows' | 'tap'
export type RuleRelation = 'direct' | 'inverse'
/** One arrow (×k), or two through the unit (÷a, then ×c) */
export type RuleMethod = 'factor' | 'unit'

export interface RuleContextInfo {
    relation: RuleRelation
    /** Ranges for the generated problems: [min, max, step] of a, b and c */
    ranges: [[number, number, number], [number, number, number], [number, number, number]]
}

export const RULE_CONTEXTS: Record<RuleContext, RuleContextInfo> = {
    price: { relation: 'direct', ranges: [[2, 12, 1], [2, 60, 1], [2, 20, 1]] },
    distance: { relation: 'direct', ranges: [[10, 30, 5], [2, 20, 1], [15, 90, 5]] },
    workers: { relation: 'inverse', ranges: [[2, 12, 1], [6, 60, 1], [2, 15, 1]] },
    speed: { relation: 'inverse', ranges: [[40, 120, 10], [1, 6, 1], [40, 120, 10]] },
    food: { relation: 'inverse', ranges: [[2, 10, 1], [6, 60, 1], [2, 12, 1]] },
    cows: { relation: 'inverse', ranges: [[10, 60, 5], [20, 90, 5], [10, 60, 5]] },
    tap: { relation: 'inverse', ranges: [[4, 20, 1], [10, 60, 5], [4, 25, 1]] }
}

export const RULE_VALUE_MAX = 9999

export interface RuleState extends OperationAnswer {
    /** Typed on the English page (18,700 is eighteen thousand seven hundred) */
    english?: boolean
    context: RuleContext
    /** The known pair (a of the first magnitude goes with b of the second), and the new value c of the first */
    a: number
    b: number
    c: number
    /** The learner's choice; null until chosen */
    relation: RuleRelation | null
    method: RuleMethod
}

const freshAnswer = { answer: '', checked: false, revealed: false }

/** Not one of the challenges, so that none is solved on arrival: 3 kg for 6 €, how much for 5 kg? */
export const initialRuleState: RuleState = { context: 'price', a: 3, b: 6, c: 5, relation: null, method: 'factor', ...freshAnswer }

const clamp = (value: number) => Math.min(RULE_VALUE_MAX, Math.max(1, Math.round(value)))

/** A new problem asks again for the relation and clears the answer; the method only changes the arrows */
export function setRule(state: RuleState, patch: Partial<Pick<RuleState, 'context' | 'a' | 'b' | 'c' | 'method'>>): RuleState {
    const next = {
        context: patch.context ?? state.context,
        a: clamp(patch.a ?? state.a),
        b: clamp(patch.b ?? state.b),
        c: clamp(patch.c ?? state.c)
    }
    const method = patch.method ?? state.method
    const same = next.context === state.context && next.a === state.a && next.b === state.b && next.c === state.c
    return same ? { ...state, method } : { ...state, ...next, method, relation: null, ...freshAnswer }
}

/** The learner may change their mind about the relation */
export const chooseRelation = (state: RuleState, relation: RuleRelation): RuleState => ({ ...state, relation })

export const trueRelation = (state: RuleState) => RULE_CONTEXTS[state.context].relation
export const relationRight = (state: RuleState) => state.relation === trueRelation(state)

/** x from either relation: b·c/a when direct, a·b/c when inverse */
export const ruleResult = (state: RuleState, relation: RuleRelation = trueRelation(state)): FractionValue =>
    relation === 'direct' ? divide(multiply(fraction(state.b), fraction(state.c)), fraction(state.a)) : divide(multiply(fraction(state.a), fraction(state.b)), fraction(state.c))

/** The number on the top arrow: c / a */
export const ruleFactor = (state: RuleState) => fraction(state.c, state.a)
/** The value that goes with 1 on the second row: b/a when direct, a·b when inverse */
export const unitValue = (state: RuleState): FractionValue => (trueRelation(state) === 'direct' ? fraction(state.b, state.a) : fraction(state.a * state.b))

export const expectedRuleAnswer = (state: RuleState) => roundedAnswer(ruleResult(state)).value

/** The right relation was chosen and x is written right (a revealed result does not count) */
export const ruleAnswered = (state: RuleState) =>
    relationRight(state) && checkAnswer(readLabAnswer(state), expectedRuleAnswer(state)) === 'correct'

/** After checking: the answer the other relation would give (multiplying where one should divide) */
export function ruleSlip(state: RuleState): boolean {
    if (!state.checked) return false
    const value = parseFractionInput(readLabAnswer(state))
    if (value === null) return false
    const other = ruleResult(state, trueRelation(state) === 'direct' ? 'inverse' : 'direct')
    return !equals(other, ruleResult(state)) && equals(value, roundedAnswer(other).value)
}

/* ---------- Problems in words ---------- */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

/** The problem of a context with its numbers, as a sentence */
export function ruleProblem(context: RuleContext, a: number, b: number, c: number): LocalizedText {
    switch (context) {
        case 'price': return say(`Laranjak: ${a} kg, ${b} €. Zenbat balio dute ${c} kilo laranjak?`, `${a} kg de naranjas cuestan ${b} €. ¿Cuánto cuestan ${c} kg?`, `ثمن ${a} كغ من البرتقال ${b} €. كم ثمن ${c} كغ؟`, `${a} kg of oranges cost €${b}. How much do ${c} kg cost?`)
        case 'distance': return say(`Txirrindulari batek ${b} km egiten ditu ${a} minututan. Zenbat km egingo ditu ${c} minututan?`, `Un ciclista recorre ${b} km en ${a} minutos. ¿Cuántos km recorre en ${c} minutos?`, `يقطع درّاج ${b} كم في ${a} دقيقة. كم كيلومترًا يقطع في ${c} دقيقة؟`, `A cyclist covers ${b} km in ${a} minutes. How many km would they cover in ${c} minutes?`)
        case 'workers': return say(`Obra bat egiteko ${b} egun behar dituzte ${a} langilek. Zenbat egun beharko dituzte ${c} langilek?`, `${a} obreros hacen una obra en ${b} días. ¿Cuántos días tardan ${c} obreros?`, `ينجز ${a} عمّال عملًا في ${b} يومًا. كم يومًا يحتاج ${c} عمّال؟`, `${a} workers finish a job in ${b} days. How many days would ${c} workers take?`)
        case 'speed': return say(`Bidaia batek ${b} ordu irauten du ${a} km/h abiaduran. Zenbat ordu ${c} km/h abiaduran?`, `A ${a} km/h, un viaje dura ${b} horas. ¿Cuántas horas dura a ${c} km/h?`, `تستغرق رحلة ${b} ساعات بسرعة ${a} كم/س. كم ساعة تستغرق بسرعة ${c} كم/س؟`, `At ${a} km/h, a journey takes ${b} hours. How many hours does it take at ${c} km/h?`)
        case 'food': return say(`Janaria: ${a} pertsonentzat, ${b} egunerako. Zenbat egunerako izango da ${c} pertsonentzat?`, `${a} personas tienen comida para ${b} días. ¿Para cuántos días tienen ${c} personas?`, `لدى ${a} أشخاص طعام يكفي ${b} يومًا. كم يومًا يكفي ${c} أشخاص؟`, `${a} people have food for ${b} days. How many days will the food last for ${c} people?`)
        case 'cows': return say(`Bazka: ${a} behirentzat, ${b} egunerako. Zenbat egunerako izango da ${c} behirentzat?`, `Un ganadero tiene pasto para ${a} vacas durante ${b} días. ¿Cuántos días le dura para ${c} vacas?`, `لدى مربٍّ مرعى يكفي ${a} بقرة مدة ${b} يومًا. كم يومًا يكفي ${c} بقرة؟`, `A farmer has pasture for ${a} cows for ${b} days. How many days will it last for ${c} cows?`)
        case 'tap': return say(`Txorrota batek ${a} l/min botatzen ditu eta biltegia ${b} minututan betetzen du. Zenbat minutu behar ditu ${c} l/min botatzen dituen txorrota batek?`, `Un grifo de ${a} l/min llena un depósito en ${b} minutos. ¿Cuántos minutos tarda uno de ${c} l/min?`, `صنبور تدفقه ${a} ل/د يملأ خزانًا في ${b} دقيقة. كم دقيقة يحتاج صنبور تدفقه ${c} ل/د؟`, `A tap running at ${a} l/min fills a tank in ${b} minutes. How many minutes does a tap running at ${c} l/min take?`)
    }
}

const setUp = say(' Prestatu tresnan eta idatzi x.', ' Prepáralo en la herramienta y escribe x.', ' جهّزها في الأداة واكتب x.', ' Set it up in the tool and write x.')
const withSetUp = (text: LocalizedText): LocalizedText => ({ eu: text.eu + setUp.eu, es: text.es + setUp.es, en: text.en + setUp.en, ar: text.ar + setUp.ar })

const formulaHint = (relation: RuleRelation, a: number, b: number, c: number) => relation === 'direct'
    ? say(`Zuzena: $x=\\frac{${b}\\cdot ${c}}{${a}}$.`, `Directa: $x=\\frac{${b}\\cdot ${c}}{${a}}$.`, `طردي: $x=\\frac{${b}\\cdot ${c}}{${a}}$.`, `Direct: $x=\\frac{${b}\\cdot ${c}}{${a}}$.`)
    : say(`Alderantzizkoa: $x=\\frac{${a}\\cdot ${b}}{${c}}$.`, `Inversa: $x=\\frac{${a}\\cdot ${b}}{${c}}$.`, `عكسي: $x=\\frac{${a}\\cdot ${b}}{${c}}$.`, `Inverse: $x=\\frac{${a}\\cdot ${b}}{${c}}$.`)

const isProblem = (state: RuleState, context: RuleContext, a: number, b: number, c: number) =>
    state.context === context && state.a === a && state.b === b && state.c === c && ruleAnswered(state)

/* ---------- Challenges: the lessons' food, cyclist and cows, and the unit path ---------- */

export const ruleChallenges: LabChallenge<RuleState>[] = [
    {
        id: 43601,
        prompt: withSetUp(ruleProblem('food', 4, 30, 6)),
        hint: say('Pertsona gehiago → egun gutxiago: alderantzizkoa. Janari osoa: $4\\cdot 30=120$.', 'Más personas → menos días: inversa. La comida total: $4\\cdot 30=120$.', 'أشخاص أكثر ← أيام أقل: عكسي. الطعام كله: $4\\cdot 30=120$.', 'More people → fewer days: inverse. The total food: $4\\cdot 30=120$.'),
        isSolved: (state) => isProblem(state, 'food', 4, 30, 6)
    },
    {
        id: 43602,
        prompt: withSetUp(ruleProblem('distance', 12, 4, 30)),
        hint: say('Denbora gehiago → km gehiago: zuzena. Gezia: $\\cdot 2{,}5$.', 'Más tiempo → más km: directa. La flecha: $\\cdot 2{,}5$.', 'وقت أطول ← كيلومترات أكثر: طردي. السهم: $\\cdot 2{,}5$.', 'More time → more km: direct. The arrow: $\\cdot 2{,}5$.'),
        isSolved: (state) => isProblem(state, 'distance', 12, 4, 30)
    },
    {
        id: 43603,
        prompt: withSetUp(ruleProblem('cows', 35, 60, 20)),
        hint: say('Behi gutxiago → egun gehiago. Bazka osoa: $35\\cdot 60=2100$ «behi-egun».', 'Menos vacas → más días. Todo el pasto: $35\\cdot 60=2100$ «vacas-día».', 'أبقار أقل ← أيام أكثر. المرعى كله: $35\\cdot 60=2100$.', 'Fewer cows → more days. All the pasture: $35\\cdot 60=2100$ ‘cow-days’.'),
        isSolved: (state) => isProblem(state, 'cows', 35, 60, 20)
    },
    {
        id: 43604,
        prompt: say(
            'Unitatera laburtuz: 5 kg laranjak 8 € balio dute. Zenbat balio dute 12 kilo laranjak? Aukeratu «Unitatera laburtzea» eta idatzi x.',
            'Reduciendo a la unidad: 5 kg de naranjas cuestan 8 €. ¿Cuánto cuestan 12 kg? Elige «Reducción a la unidad» y escribe x.',
            'بالإرجاع إلى الوحدة: ثمن 5 كغ من البرتقال 8 €. كم ثمن 12 كغ؟ اختر «الإرجاع إلى الوحدة» واكتب x.', 'Using the unitary method: 5 kg of oranges cost €8. How much do 12 kg cost? Choose ‘Unitary method’ and write x.'
        ),
        hint: say('Kilo bat: $8\\mathbin{:}5=1{,}6$ €; gero bider 12.', 'Un kilo: $8\\mathbin{:}5=1{,}6$ €; luego por 12.', 'كيلوغرام واحد: $8\\mathbin{:}5=1{,}6$ €؛ ثم في 12.', 'One kilo: $8\\mathbin{:}5=1{,}6$ €; then multiply by 12.'),
        isSolved: (state) => state.method === 'unit' && isProblem(state, 'price', 5, 8, 12)
    }
]

/* ---------- Endless challenges ---------- */

/** An endless challenge is never already solved by the tool's first state */
function freshFrom<State>(start: State, maker: LabChallengeMaker<State>): LabChallengeMaker<State> {
    return (random) => {
        for (;;) {
            const challenge = maker(random)
            if (!challenge.isSolved(start)) return challenge
        }
    }
}

const inRange = (random: () => number, [min, max, step]: [number, number, number]) => min + step * randomInt(random, 0, Math.floor((max - min) / step))

/** A problem of any context with a result of at most two decimals, whole most of the time */
export const ruleExtra: LabChallengeMaker<RuleState> = freshFrom(initialRuleState, (random) => {
    const wantWhole = random() < 0.75
    for (;;) {
        const context = pick(random, Object.keys(RULE_CONTEXTS) as RuleContext[])
        const info = RULE_CONTEXTS[context]
        const [a, b, c] = info.ranges.map((range) => inRange(random, range))
        if (a === c) continue
        const solution: RuleState = { context, a, b, c, relation: info.relation, method: 'factor', ...freshAnswer }
        const result = ruleResult(solution)
        if (wantWhole ? result.denominator !== 1 : roundedAnswer(result).rounded || result.denominator === 1) continue
        const written = roundedAnswer(result).value
        return {
            prompt: withSetUp(ruleProblem(context, a, b, c)),
            hint: formulaHint(info.relation, a, b, c),
            isSolved: (state) => isProblem(state, context, a, b, c),
            solution: { ...solution, answer: `${written.numerator / written.denominator}`.replace('.', ','), checked: true }
        }
    }
})
