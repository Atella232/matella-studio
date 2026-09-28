import { checkAnswer, fraction } from '../../../features/unit-v2/math/fraction.ts'
import { freshAnswer, type LabChallenge, type LabToolInfo, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import { reduceTerms, termsLatex, type Term } from '../../dbh1-aljebra-v2/algebra.ts'
import { groupTerms, tilesResult, type MachineExpression, type MachineState, type TilesState } from '../../dbh1-aljebra-v2/lab/labTools.ts'
import type { AlgebraStageId } from '../lessons.tsx'

/* ==========================================================================
   Aljebra (2. DBH) laboratory: the number machine and the algebra tiles of
   1. DBH with polynomials of this course, the area model of (x + a)(x + b),
   the notable products checked with numbers and taking out a common
   factor. Pure state logic and challenges; components live next to this
   file. Tests in tests/aljebra-dbh2-lab.test.ts.
   ========================================================================== */

export type AlgebraLabToolId = 'machine' | 'tiles' | 'area' | 'identities' | 'factor'

export interface AlgebraLabTool extends LabToolInfo {
    id: AlgebraLabToolId
    stage: AlgebraStageId
}

export const algebraLabTools: AlgebraLabTool[] = [
    {
        id: 'machine',
        stage: 'language',
        lessonTopic: 'value',
        title: { eu: 'Zenbaki-makina', es: 'La máquina de números', ar: 'آلة الأعداد' },
        observe: {
            eu: 'Ordeztu x zenbaki negatiboekin ere: parentesiak jarri. Konparatu $(x+3)^{2}$ eta $x^{2}+6x+9$: beti ematen dute gauza bera.',
            es: 'Sustituye x también por negativos: con paréntesis. Compara $(x+3)^{2}$ y $x^{2}+6x+9$: siempre dan lo mismo.',
            ar: 'عوّض x بأعداد سالبة أيضًا: مع الأقواس. قارن $(x+3)^{2}$ و$x^{2}+6x+9$: يعطيان دائمًا الشيء نفسه.'
        }
    },
    {
        id: 'tiles',
        stage: 'monomials',
        lessonTopic: 'add-polynomials',
        title: { eu: 'Fitxa aljebraikoak', es: 'Fichas algebraicas', ar: 'البطاقات الجبرية' },
        observe: {
            eu: 'Antzeko fitxak bakarrik elkartzen dira. Kentzean, bigarren polinomioaren fitxa guztiek kolorea aldatzen dute.',
            es: 'Solo se juntan fichas semejantes. Al restar, todas las fichas del segundo polinomio cambian de color.',
            ar: 'لا تُجمع إلا البطاقات المتشابهة. وعند الطرح تتغيّر ألوان كل بطاقات الحدودية الثانية.'
        }
    },
    {
        id: 'area',
        stage: 'polynomials',
        lessonTopic: 'multiply-polynomials',
        title: { eu: 'Biderketaren azalera', es: 'El área del producto', ar: 'مساحة الجداء' },
        observe: {
            eu: '(x + a)(x + b) laukizuzenak lau zati ditu: x², ax, bx eta ab. Erdiko bi zatiek x-ren koefizientea osatzen dute: a + b.',
            es: 'El rectángulo (x + a)(x + b) tiene cuatro partes: x², ax, bx y ab. Las dos del medio forman el coeficiente de x: a + b.',
            ar: 'للمستطيل (x + a)(x + b) أربعة أجزاء: x² وax وbx وab. والجزآن الأوسطان يكوّنان معامل x: a + b.'
        }
    },
    {
        id: 'identities',
        stage: 'products',
        lessonTopic: 'square-sum',
        title: { eu: 'Identitateak zenbakiekin', es: 'Identidades con números', ar: 'المتطابقات بالأعداد' },
        observe: {
            eu: 'Aukeratu a eta b: identitatearen bi aldeek beti ematen dute gauza bera. $a^{2}+b^{2}$ ez, ordea: $2ab$ falta zaio.',
            es: 'Elige a y b: los dos lados de la identidad siempre dan lo mismo. $a^{2}+b^{2}$ no: le falta $2ab$.',
            ar: 'اختر a وb: طرفا المتطابقة يعطيان دائمًا الشيء نفسه. أما $a^{2}+b^{2}$ فلا: ينقصه $2ab$.'
        }
    },
    {
        id: 'factor',
        stage: 'factor',
        lessonTopic: 'common-factor',
        title: { eu: 'Faktore komuna', es: 'Factor común', ar: 'العامل المشترك' },
        observe: {
            eu: 'Faktore bat baliozkoa da gai guztiak zatitzen baditu. Handiena lortzen duzunean, parentesi barruan ez da ezer komunik geratzen.',
            es: 'Un factor vale si divide a todos los términos. Cuando consigues el mayor, dentro del paréntesis no queda nada en común.',
            ar: 'يصلح العامل إذا قسم كل الحدود. وعندما تصل إلى أكبرها لا يبقى شيء مشترك داخل القوس.'
        }
    }
]

export const algebraLabToolForTopic: Record<string, AlgebraLabToolId | undefined> = {
    language: 'machine',
    value: 'machine',
    polynomial: 'machine',
    monomial: 'tiles',
    'add-monomials': 'tiles',
    'multiply-monomials': 'factor',
    'add-polynomials': 'tiles',
    'multiply-monomial': 'area',
    'multiply-polynomials': 'area',
    'square-sum': 'identities',
    'square-difference': 'identities',
    'sum-difference': 'identities',
    'common-factor': 'factor',
    'factor-identities': 'identities',
    mental: 'identities'
}

const answered = (state: OperationAnswer, expected: number) => checkAnswer(state.answer, fraction(expected)) === 'correct'
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/* ---------- The number machine (1. DBH tool, polynomials of this course) ---------- */

export const machineExpressions: MachineExpression[] = [
    { latex: '2x^{2}-3x+1', value: (x) => 2 * x * x - 3 * x + 1 },
    { latex: 'x^{3}-x^{2}+3x-1', value: (x) => x ** 3 - x * x + 3 * x - 1 },
    { latex: '(x+3)^{2}', value: (x) => (x + 3) ** 2 },
    { latex: 'x^{2}+6x+9', value: (x) => x * x + 6 * x + 9 },
    { latex: '(x+2)(x-2)', value: (x) => (x + 2) * (x - 2) }
]

export const MACHINE_LIMITS = { min: -6, max: 10 } as const

const machineAt = (state: MachineState, index: number, x: number) => state.expression === index && state.x === x

export const machineChallenges: LabChallenge<MachineState>[] = [
    {
        id: 26101,
        prompt: { eu: 'Kalkulatu $2x^{2}-3x+1$ balioa $x=-2$ denean.', es: 'Calcula el valor de $2x^{2}-3x+1$ para $x=-2$.', ar: 'احسب قيمة $2x^{2}-3x+1$ عندما $x=-2$.' },
        hint: { eu: '$2\\cdot(-2)^{2}-3\\cdot(-2)+1$', es: '$2\\cdot(-2)^{2}-3\\cdot(-2)+1$', ar: '$2\\cdot(-2)^{2}-3\\cdot(-2)+1$' },
        isSolved: (state) => machineAt(state, 0, -2) && answered(state, 15)
    },
    {
        id: 26102,
        prompt: { eu: 'Kalkulatu P(2), $P(x)=x^{3}-x^{2}+3x-1$ bada.', es: 'Calcula P(2) si $P(x)=x^{3}-x^{2}+3x-1$.', ar: 'احسب P(2) إذا كان $P(x)=x^{3}-x^{2}+3x-1$.' },
        hint: { eu: '$8-4+6-1$', es: '$8-4+6-1$', ar: '$8-4+6-1$' },
        isSolved: (state) => machineAt(state, 1, 2) && answered(state, 9)
    },
    {
        id: 26103,
        prompt: { eu: 'Kalkulatu $(x+3)^{2}$ balioa $x=-5$ denean.', es: 'Calcula el valor de $(x+3)^{2}$ para $x=-5$.', ar: 'احسب قيمة $(x+3)^{2}$ عندما $x=-5$.' },
        hint: { eu: '$(-5+3)^{2}=(-2)^{2}$', es: '$(-5+3)^{2}=(-2)^{2}$', ar: '$(-5+3)^{2}=(-2)^{2}$' },
        isSolved: (state) => machineAt(state, 2, -5) && answered(state, 4)
    },
    {
        id: 26104,
        prompt: { eu: 'Kalkulatu $(x+2)(x-2)$ balioa $x=10$ denean. Zein da buruz egiteko modurik azkarrena?', es: 'Calcula el valor de $(x+2)(x-2)$ para $x=10$. ¿Cuál es la forma más rápida de hacerlo de cabeza?', ar: 'احسب قيمة $(x+2)(x-2)$ عندما $x=10$. ما أسرع طريقة لحسابها ذهنيًا؟' },
        hint: { eu: '$10^{2}-2^{2}$', es: '$10^{2}-2^{2}$', ar: '$10^{2}-2^{2}$' },
        isSolved: (state) => machineAt(state, 4, 10) && answered(state, 96)
    }
]

/* ---------- Algebra tiles (1. DBH tool, polynomials of this course) ---------- */

export const initialTilesState: TilesState = { first: { squares: 3, bars: -5, units: 2 }, second: { squares: 1, bars: -2, units: 1 }, op: 'add' }

const isGroup = (group: TilesState['first'], squares: number, bars: number, units: number) => group.squares === squares && group.bars === bars && group.units === units
const resultIs = (state: TilesState, squares: number, bars: number, units: number) => {
    const result = tilesResult(state)
    const coefficient = (power: number) => result.find((term) => term.power === power)?.coefficient ?? 0
    return coefficient(2) === squares && coefficient(1) === bars && coefficient(0) === units
}

export const tilesChallenges: LabChallenge<TilesState>[] = [
    {
        id: 26201,
        prompt: { eu: 'Batu $(3x^{2}-5x+2)+(x^{2}-2x+1)$.', es: 'Suma $(3x^{2}-5x+2)+(x^{2}-2x+1)$.', ar: 'اجمع $(3x^{2}-5x+2)+(x^{2}-2x+1)$.' },
        hint: { eu: 'Emaitza: $4x^{2}-7x+3$.', es: 'Resultado: $4x^{2}-7x+3$.', ar: 'الناتج: $4x^{2}-7x+3$.' },
        isSolved: (state) => state.op === 'add' && isGroup(state.first, 3, -5, 2) && isGroup(state.second, 1, -2, 1)
    },
    {
        id: 26202,
        prompt: { eu: 'Kendu $(5x^{2}-2x-3)-(4x^{2}+3x-1)$.', es: 'Resta $(5x^{2}-2x-3)-(4x^{2}+3x-1)$.', ar: 'اطرح $(5x^{2}-2x-3)-(4x^{2}+3x-1)$.' },
        hint: { eu: 'Emaitza: $x^{2}-5x-2$.', es: 'Resultado: $x^{2}-5x-2$.', ar: 'الناتج: $x^{2}-5x-2$.' },
        isSolved: (state) => state.op === 'subtract' && isGroup(state.first, 5, -2, -3) && isGroup(state.second, 4, 3, -1)
    },
    {
        id: 26203,
        prompt: { eu: 'A = $2x^{2}-x+3$ bada, aurkitu B, A + B = 0 izan dadin.', es: 'Si A = $2x^{2}-x+3$, encuentra B para que A + B = 0.', ar: 'إذا كان A = $2x^{2}-x+3$ فجد B بحيث A + B = 0.' },
        hint: { eu: 'B polinomio aurkakoa da: zeinu guztiak aldatuta.', es: 'B es el polinomio opuesto: todos los signos cambiados.', ar: 'B هي الحدودية المعاكسة: كل الإشارات مغيّرة.' },
        isSolved: (state) => state.op === 'add' && isGroup(state.first, 2, -1, 3) && isGroup(state.second, -2, 1, -3)
    },
    {
        id: 26204,
        prompt: { eu: 'Egin hiru gaiko bi polinomioren batuketa edo kenketa bat, emaitza $x^{2}+x+1$ izan dadin.', es: 'Haz una suma o resta de dos polinomios de tres términos cuyo resultado sea $x^{2}+x+1$.', ar: 'اصنع جمعًا أو طرحًا لحدوديتين من ثلاثة حدود ناتجه $x^{2}+x+1$.' },
        hint: { eu: 'Adibidez: $(3x^{2}+2x-1)+(-2x^{2}-x+2)$.', es: 'Por ejemplo: $(3x^{2}+2x-1)+(-2x^{2}-x+2)$.', ar: 'مثلًا: $(3x^{2}+2x-1)+(-2x^{2}-x+2)$.' },
        isSolved: (state) => groupTerms(state.first).length === 3 && groupTerms(state.second).length === 3 && resultIs(state, 1, 1, 1)
    }
]

/* ---------- Area model of (x + a)(x + b) ---------- */

export const AREA_LIMITS = { min: 0, max: 6 } as const

export type AreaAsk = 'middle' | 'constant'

export interface AreaState extends OperationAnswer {
    a: number
    b: number
    ask: AreaAsk
    /** Products written right, as "a,b,ask" */
    solved: string[]
}

export const initialAreaState: AreaState = { a: 2, b: 3, ask: 'middle', solved: [], ...freshAnswer }

export function setAreaModel(state: AreaState, patch: Partial<Pick<AreaState, 'a' | 'b' | 'ask'>>): AreaState {
    return { ...state, a: clamp(patch.a ?? state.a, AREA_LIMITS.min, AREA_LIMITS.max), b: clamp(patch.b ?? state.b, AREA_LIMITS.min, AREA_LIMITS.max), ask: patch.ask ?? state.ask, ...freshAnswer }
}

/** x² + (a + b)x + ab */
export const areaProduct = (state: Pick<AreaState, 'a' | 'b'>): Term[] => reduceTerms([{ coefficient: 1, power: 2 }, { coefficient: state.a + state.b, power: 1 }, { coefficient: state.a * state.b, power: 0 }])
export const areaExpected = (state: Pick<AreaState, 'a' | 'b' | 'ask'>) => (state.ask === 'middle' ? state.a + state.b : state.a * state.b)

const areaKey = (state: Pick<AreaState, 'a' | 'b' | 'ask'>) => `${Math.min(state.a, state.b)},${Math.max(state.a, state.b)},${state.ask}`

export function answerArea(state: AreaState, patch: Partial<OperationAnswer>): AreaState {
    const next = { ...state, ...patch }
    if (next.checked && !next.revealed && answered(next, areaExpected(next)) && !next.solved.includes(areaKey(next))) return { ...next, solved: [...next.solved, areaKey(next)] }
    return next
}

export const areaChallenges: LabChallenge<AreaState>[] = [
    {
        id: 26301,
        prompt: { eu: 'Egin $(x+2)(x+3)$ eta idatzi x-ren koefizientea.', es: 'Construye $(x+2)(x+3)$ y escribe el coeficiente de x.', ar: 'ابنِ $(x+2)(x+3)$ واكتب معامل x.' },
        hint: { eu: 'Erdiko bi zatiak: $2x+3x$.', es: 'Las dos partes del medio: $2x+3x$.', ar: 'الجزآن الأوسطان: $2x+3x$.' },
        isSolved: (state) => state.solved.includes('2,3,middle')
    },
    {
        id: 26302,
        prompt: { eu: 'Egin $(x+4)(x+1)$ eta idatzi gai askea.', es: 'Construye $(x+4)(x+1)$ y escribe el término independiente.', ar: 'ابنِ $(x+4)(x+1)$ واكتب الحد الثابت.' },
        hint: { eu: 'Izkinako zati txikia: $4\\cdot 1$.', es: 'La parte pequeña de la esquina: $4\\cdot 1$.', ar: 'الجزء الصغير في الزاوية: $4\\cdot 1$.' },
        isSolved: (state) => state.solved.includes('1,4,constant')
    },
    {
        id: 26303,
        prompt: { eu: 'Egin $(x+3)^{2}$ karratua eta idatzi x-ren koefizientea.', es: 'Construye el cuadrado $(x+3)^{2}$ y escribe el coeficiente de x.', ar: 'ابنِ المربع $(x+3)^{2}$ واكتب معامل x.' },
        hint: { eu: 'a = b = 3: bikoitza bider biderkadura.', es: 'a = b = 3: el doble del producto.', ar: 'a = b = 3: ضعف الجداء.' },
        isSolved: (state) => state.solved.includes('3,3,middle')
    },
    {
        id: 26304,
        prompt: { eu: 'Aurkitu biderkadura bat, $x^{2}+7x+12$ ematen duena, eta idatzi gai askea.', es: 'Encuentra un producto que dé $x^{2}+7x+12$ y escribe su término independiente.', ar: 'جد جداءً يعطي $x^{2}+7x+12$ واكتب حدّه الثابت.' },
        hint: { eu: 'Bi zenbaki: batuta 7, biderkatuta 12.', es: 'Dos números: suman 7 y multiplicados dan 12.', ar: 'عددان: مجموعهما 7 وجداؤهما 12.' },
        isSolved: (state) => state.solved.includes('3,4,constant')
    }
]

/* ---------- Notable products with numbers ---------- */

export type IdentityKind = 'sum' | 'difference' | 'product'

export const IDENTITY_LIMITS = { min: 1, max: 30 } as const

export interface IdentityState extends OperationAnswer {
    kind: IdentityKind
    a: number
    b: number
    /** Left sides written right, as "kind,a,b" */
    solved: string[]
}

export const initialIdentityState: IdentityState = { kind: 'sum', a: 5, b: 3, solved: [], ...freshAnswer }

export function setIdentity(state: IdentityState, patch: Partial<Pick<IdentityState, 'kind' | 'a' | 'b'>>): IdentityState {
    return { ...state, kind: patch.kind ?? state.kind, a: clamp(patch.a ?? state.a, IDENTITY_LIMITS.min, IDENTITY_LIMITS.max), b: clamp(patch.b ?? state.b, IDENTITY_LIMITS.min, IDENTITY_LIMITS.max), ...freshAnswer }
}

/** The value of the left side: (a + b)², (a − b)² or (a + b)(a − b) */
export function identityValue(state: Pick<IdentityState, 'kind' | 'a' | 'b'>): number {
    const { a, b } = state
    if (state.kind === 'sum') return (a + b) ** 2
    if (state.kind === 'difference') return (a - b) ** 2
    return (a + b) * (a - b)
}

/** The three terms of the right side, as numbers: a², ±2ab, ±b² */
export function identityTerms(state: Pick<IdentityState, 'kind' | 'a' | 'b'>): number[] {
    const { a, b } = state
    if (state.kind === 'sum') return [a * a, 2 * a * b, b * b]
    if (state.kind === 'difference') return [a * a, -2 * a * b, b * b]
    return [a * a, -b * b]
}

/** What the usual mistake gives: a² + b² for the squares */
export const identityMistake = (state: Pick<IdentityState, 'kind' | 'a' | 'b'>) => (state.kind === 'product' ? null : state.a ** 2 + state.b ** 2)

const identityKey = (state: Pick<IdentityState, 'kind' | 'a' | 'b'>) => `${state.kind},${state.a},${state.b}`

export function answerIdentity(state: IdentityState, patch: Partial<OperationAnswer>): IdentityState {
    const next = { ...state, ...patch }
    if (next.checked && !next.revealed && answered(next, identityValue(next)) && !next.solved.includes(identityKey(next))) return { ...next, solved: [...next.solved, identityKey(next)] }
    return next
}

export const identityChallenges: LabChallenge<IdentityState>[] = [
    {
        id: 26401,
        prompt: { eu: 'Kalkulatu $21^{2}$ batura baten karratu gisa: a = 20 eta b = 1.', es: 'Calcula $21^{2}$ como el cuadrado de una suma: a = 20 y b = 1.', ar: 'احسب $21^{2}$ مربعَ مجموع: a = 20 وb = 1.' },
        hint: { eu: '$400+40+1$', es: '$400+40+1$', ar: '$400+40+1$' },
        isSolved: (state) => state.solved.includes('sum,20,1')
    },
    {
        id: 26402,
        prompt: { eu: 'Kalkulatu $19^{2}$ kendura baten karratu gisa: a = 20 eta b = 1.', es: 'Calcula $19^{2}$ como el cuadrado de una diferencia: a = 20 y b = 1.', ar: 'احسب $19^{2}$ مربعَ فرق: a = 20 وb = 1.' },
        hint: { eu: '$400-40+1$', es: '$400-40+1$', ar: '$400-40+1$' },
        isSolved: (state) => state.solved.includes('difference,20,1')
    },
    {
        id: 26403,
        prompt: { eu: 'Kalkulatu $23\\cdot 17$ batura bider kendura gisa.', es: 'Calcula $23\\cdot 17$ como suma por diferencia.', ar: 'احسب $23\\cdot 17$ مجموعًا في فرق.' },
        hint: { eu: '$(20+3)(20-3)=400-9$', es: '$(20+3)(20-3)=400-9$', ar: '$(20+3)(20-3)=400-9$' },
        isSolved: (state) => state.solved.includes('product,20,3')
    },
    {
        id: 26404,
        prompt: { eu: 'Aurkitu a eta b, $(a+b)^{2}$ eta $a^{2}+b^{2}$-ren arteko aldea 24 izan dadin.', es: 'Encuentra a y b para que la diferencia entre $(a+b)^{2}$ y $a^{2}+b^{2}$ sea 24.', ar: 'جد a وb بحيث يكون الفرق بين $(a+b)^{2}$ و$a^{2}+b^{2}$ هو 24.' },
        hint: { eu: 'Aldea $2ab$ da: $ab=12$.', es: 'La diferencia es $2ab$: $ab=12$.', ar: 'الفرق هو $2ab$: $ab=12$.' },
        isSolved: (state) => state.kind === 'sum' && 2 * state.a * state.b === 24
    }
]

/* ---------- Common factor ---------- */

export interface FactorPolynomial {
    terms: Term[]
}

/** Polynomials in x with a common factor to take out */
export const factorPolynomials: FactorPolynomial[] = [
    { terms: [{ coefficient: 6, power: 1 }, { coefficient: 9, power: 0 }] },
    { terms: [{ coefficient: 4, power: 2 }, { coefficient: 8, power: 1 }] },
    { terms: [{ coefficient: 6, power: 3 }, { coefficient: -9, power: 2 }, { coefficient: 3, power: 1 }] },
    { terms: [{ coefficient: 10, power: 5 }, { coefficient: 8, power: 3 }, { coefficient: -6, power: 2 }, { coefficient: 12, power: 1 }] },
    { terms: [{ coefficient: 15, power: 4 }, { coefficient: -12, power: 3 }, { coefficient: 18, power: 2 }] }
]

export const FACTOR_LIMITS = { coefficient: { min: 1, max: 12 }, power: { min: 0, max: 5 } } as const

export interface FactorState {
    polynomial: number
    coefficient: number
    power: number
    /** Polynomials whose greatest common factor was found */
    finished: number[]
}

export const initialFactorState: FactorState = { polynomial: 0, coefficient: 1, power: 0, finished: [] }

const gcd = (left: number, right: number): number => (right === 0 ? Math.abs(left) : gcd(right, left % right))

/** The greatest common factor k·x^p of a polynomial */
export function greatestFactor(terms: Term[]): { coefficient: number; power: number } {
    return {
        coefficient: terms.reduce((result, term) => gcd(result, term.coefficient), 0),
        power: Math.min(...terms.map((term) => term.power))
    }
}

/** The terms left inside the bracket, or null when k·x^p does not divide every term */
export function factorInside(terms: Term[], coefficient: number, power: number): Term[] | null {
    if (terms.some((term) => term.coefficient % coefficient !== 0 || term.power < power)) return null
    return terms.map((term) => ({ coefficient: term.coefficient / coefficient, power: term.power - power }))
}

const isGreatest = (state: Pick<FactorState, 'polynomial' | 'coefficient' | 'power'>) => {
    const greatest = greatestFactor(factorPolynomials[state.polynomial].terms)
    return greatest.coefficient === state.coefficient && greatest.power === state.power
}

export function setFactor(state: FactorState, patch: Partial<Pick<FactorState, 'polynomial' | 'coefficient' | 'power'>>): FactorState {
    const next = {
        ...state,
        polynomial: clamp(patch.polynomial ?? state.polynomial, 0, factorPolynomials.length - 1),
        coefficient: clamp(patch.coefficient ?? state.coefficient, FACTOR_LIMITS.coefficient.min, FACTOR_LIMITS.coefficient.max),
        power: clamp(patch.power ?? state.power, FACTOR_LIMITS.power.min, FACTOR_LIMITS.power.max)
    }
    if (patch.polynomial !== undefined && patch.polynomial !== state.polynomial) Object.assign(next, { coefficient: 1, power: 0 })
    return isGreatest(next) && !next.finished.includes(next.polynomial) ? { ...next, finished: [...next.finished, next.polynomial] } : next
}

export const factorLatex = (terms: Term[]) => termsLatex(terms)

export const factorChallenges: LabChallenge<FactorState>[] = [
    {
        id: 26501,
        prompt: { eu: 'Atera faktore komunik handiena: $6x+9$.', es: 'Saca el mayor factor común: $6x+9$.', ar: 'أخرج أكبر عامل مشترك: $6x+9$.' },
        hint: { eu: 'ZKH(6, 9) = 3; x ez dago bi gaietan.', es: 'm.c.d.(6, 9) = 3; la x no está en los dos términos.', ar: 'ق.م.أ(6، 9) = 3؛ وx ليس في الحدين.' },
        isSolved: (state) => state.finished.includes(0)
    },
    {
        id: 26502,
        prompt: { eu: 'Atera faktore komunik handiena: $4x^{2}+8x$.', es: 'Saca el mayor factor común: $4x^{2}+8x$.', ar: 'أخرج أكبر عامل مشترك: $4x^{2}+8x$.' },
        hint: { eu: '$4x$', es: '$4x$', ar: '$4x$' },
        isSolved: (state) => state.finished.includes(1)
    },
    {
        id: 26503,
        prompt: { eu: 'Atera faktore komunik handiena: $6x^{3}-9x^{2}+3x$.', es: 'Saca el mayor factor común: $6x^{3}-9x^{2}+3x$.', ar: 'أخرج أكبر عامل مشترك: $6x^{3}-9x^{2}+3x$.' },
        hint: { eu: 'ZKH(6, 9, 3) eta x berretzaile txikienarekin.', es: 'm.c.d.(6, 9, 3) y x con el menor exponente.', ar: 'ق.م.أ(6، 9، 3) وx بأصغر أس.' },
        isSolved: (state) => state.finished.includes(2)
    },
    {
        id: 26504,
        prompt: { eu: 'Atera faktore komunik handiena beste bi polinomioei.', es: 'Saca el mayor factor común de los otros dos polinomios.', ar: 'أخرج أكبر عامل مشترك من الحدوديتين الأخريين.' },
        hint: { eu: '$2x$ eta $3x^{2}$.', es: '$2x$ y $3x^{2}$.', ar: '$2x$ و$3x^{2}$.' },
        isSolved: (state) => state.finished.includes(3) && state.finished.includes(4)
    }
]

export const algebraLabChallengeIds: number[] = [
    ...machineChallenges,
    ...tilesChallenges,
    ...areaChallenges,
    ...identityChallenges,
    ...factorChallenges
].map((challenge) => challenge.id)

export const productLatex = (state: Pick<AreaState, 'a' | 'b'>) => termsLatex(areaProduct(state))
