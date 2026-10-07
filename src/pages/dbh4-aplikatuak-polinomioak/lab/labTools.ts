import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { PolynomialsStageId } from '../lessons.tsx'
import { areaChallenges, factorChallenges, identityChallenges, machineChallenges, tilesChallenges } from '../../dbh2-aljebra-v2/lab/labTools.ts'

/* ==========================================================================
   Polinomioak (4. DBH aplikatuak) laboratory. The number machine, the
   algebra tiles, the area of a product, the identities and the common
   factor come from 2. DBH with their own challenges. The new tools are a
   Ruffini table filled in step by step (bring down, multiply by a, add)
   and a root finder that tries the divisors of the constant term, divides
   by each root it finds and ends with the factorisation. Polynomials are
   arrays of integer coefficients, highest degree first. Pure state logic;
   the components live next to this file. Tests in
   tests/polinomioak-dbh4ap-lab.test.ts.
   ========================================================================== */

export type PolynomialsLabToolId = 'machine' | 'tiles' | 'area' | 'identities' | 'factor' | 'ruffini' | 'roots'

export interface PolynomialsLabTool extends LabToolInfo {
    id: PolynomialsLabToolId
    stage: PolynomialsStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string) => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export const polynomialsLabTools: PolynomialsLabTool[] = [
    { id: 'machine', stage: 'monomials', lessonTopic: 'polynomial-value', title: say('Zenbaki-makina', 'La máquina de números', 'آلة الأعداد'), observe: say('Ordeztu x zenbaki negatiboekin ere: parentesiak jarri. Bi adierazpen baliokideek beti ematen dute gauza bera.', 'Sustituye x también por negativos: con paréntesis. Dos expresiones equivalentes siempre dan lo mismo.', 'عوّض x بأعداد سالبة أيضًا: مع الأقواس. والعبارتان المتكافئتان تعطيان دائمًا الشيء نفسه.') },
    { id: 'tiles', stage: 'operations', lessonTopic: 'add-subtract', title: say('Fitxa aljebraikoak', 'Fichas algebraicas', 'البطاقات الجبرية'), observe: say('Antzeko fitxak bakarrik elkartzen dira. Kentzean, bigarren polinomioaren fitxa guztiek kolorea aldatzen dute.', 'Solo se juntan fichas semejantes. Al restar, todas las fichas del segundo polinomio cambian de color.', 'لا تُجمع إلا البطاقات المتشابهة. وعند الطرح تتغيّر ألوان كل بطاقات الحدودية الثانية.') },
    { id: 'area', stage: 'operations', lessonTopic: 'multiply', title: say('Biderketaren azalera', 'El área del producto', 'مساحة الجداء'), observe: say('(x + a)(x + b) laukizuzenak lau zati ditu: x², ax, bx eta ab. Erdiko bi zatiek x-ren koefizientea osatzen dute.', 'El rectángulo (x + a)(x + b) tiene cuatro partes: x², ax, bx y ab. Las dos del medio forman el coeficiente de x.', 'للمستطيل (x + a)(x + b) أربعة أجزاء: x² وax وbx وab. والجزآن الأوسطان يكوّنان معامل x.') },
    { id: 'identities', stage: 'operations', lessonTopic: 'identities', title: say('Identitateak zenbakiekin', 'Identidades con números', 'المتطابقات بالأعداد'), observe: say('Aukeratu a eta b: identitatearen bi aldeek beti ematen dute gauza bera. a² + b² ez, ordea: 2ab falta zaio.', 'Elige a y b: los dos lados de la identidad siempre dan lo mismo. a² + b² no: le falta 2ab.', 'اختر a وb: طرفا المتطابقة يعطيان دائمًا الشيء نفسه. أما a² + b² فلا: ينقصه 2ab.') },
    { id: 'ruffini', stage: 'division', lessonTopic: 'ruffini', title: say('Ruffiniren taula', 'La tabla de Ruffini', 'جدول روفيني'), observe: say('Urrats bakoitza berdina da: bider a eta batu. Azken zenbakia hondarra da, eta P(a) ere bai.', 'Cada paso es igual: por a y suma. El último número es el resto, y también P(a).', 'كل خطوة متماثلة: في a ثم اجمع. والعدد الأخير هو الباقي وهو أيضًا P(a).') },
    { id: 'roots', stage: 'factor', lessonTopic: 'factorize', title: say('Erroen bila', 'A la caza de raíces', 'البحث عن الجذور'), observe: say('Erro osoak gai askearen zatitzaileen artean daude. Erro bakoitzak faktore bat ematen du, eta zatidurarekin jarraitzen da.', 'Las raíces enteras están entre los divisores del término independiente. Cada raíz da un factor, y se sigue con el cociente.', 'الجذور الصحيحة بين قواسم الحد الثابت. وكل جذر يعطي عاملًا، ونتابع مع خارج القسمة.') },
    { id: 'factor', stage: 'factor', lessonTopic: 'common-factor', title: say('Faktore komuna', 'Factor común', 'العامل المشترك'), observe: say('Faktore bat baliozkoa da gai guztiak zatitzen baditu. Handiena lortzen duzunean, parentesi barruan ez da ezer komunik geratzen.', 'Un factor vale si divide a todos los términos. Cuando consigues el mayor, dentro del paréntesis no queda nada en común.', 'يصلح العامل إذا قسم كل الحدود. وعندما تصل إلى أكبرها لا يبقى شيء مشترك داخل القوس.') }
]

export const polynomialsLabToolForTopic: Record<string, PolynomialsLabToolId | undefined> = {
    monomials: 'tiles',
    'polynomial-value': 'machine',
    language: 'machine',
    'add-subtract': 'tiles',
    multiply: 'area',
    identities: 'identities',
    'long-division': 'ruffini',
    ruffini: 'ruffini',
    remainder: 'ruffini',
    roots: 'roots',
    'common-factor': 'factor',
    factorize: 'roots',
    'algebraic-fractions': 'roots',
    simplify: 'identities',
    problems: 'machine'
}

/* ---------- Polynomial helpers ---------- */

/** Value of the polynomial at a (Horner) */
export const evaluate = (coefficients: number[], a: number) => coefficients.reduce((value, coefficient) => value * a + coefficient, 0)

/** The Ruffini rows: the products written under each coefficient and the bottom row (quotient, then remainder) */
export function ruffiniRows(coefficients: number[], a: number): { products: Array<number | null>; bottom: number[] } {
    const bottom: number[] = []
    const products: Array<number | null> = []
    coefficients.forEach((coefficient, index) => {
        const product = index === 0 ? null : bottom[index - 1] * a
        products.push(product)
        bottom.push(coefficient + (product ?? 0))
    })
    return { products, bottom }
}

/** Quotient of an exact division by (x − a) */
export const deflate = (coefficients: number[], a: number) => ruffiniRows(coefficients, a).bottom.slice(0, -1)

/** A polynomial in LaTeX: 2x^{3}-7x^{2}+x-3 */
export function polynomialLatex(coefficients: number[]): string {
    const degree = coefficients.length - 1
    const terms = coefficients.map((coefficient, index) => ({ coefficient, power: degree - index })).filter((term) => term.coefficient !== 0)
    if (!terms.length) return '0'
    return terms.map((term, index) => {
        const sign = term.coefficient < 0 ? '-' : index === 0 ? '' : '+'
        const size = Math.abs(term.coefficient)
        const number = size === 1 && term.power > 0 ? '' : String(size)
        const letter = term.power === 0 ? '' : term.power === 1 ? 'x' : `x^{${term.power}}`
        return `${sign}${number}${letter}`
    }).join('')
}

/** (x − a) in LaTeX: x-5, x+3, x */
export const binomialLatex = (a: number) => (a === 0 ? 'x' : a > 0 ? `x-${a}` : `x+${-a}`)

/* ---------- 1. The Ruffini table ---------- */

export const ruffiniPolynomials: number[][] = [
    [1, -7, 9, -3],
    [2, 7, 2, 4],
    [1, -2, -5, 3, -6],
    [2, -7, -17, 10],
    [1, 0, 0, 0, 0, -32]
]

export const RUFFINI_A_LIMIT = 6

export interface RuffiniState {
    polynomial: number
    a: number
    /** Columns of the bottom row already filled in */
    steps: number
}

export const initialRuffiniState: RuffiniState = { polynomial: 0, a: 5, steps: 1 }

export const ruffiniDone = (state: RuffiniState) => state.steps >= ruffiniPolynomials[state.polynomial].length

export function setRuffini(state: RuffiniState, patch: { polynomial?: number; a?: number }): RuffiniState {
    const polynomial = clamp(patch.polynomial ?? state.polynomial, 0, ruffiniPolynomials.length - 1)
    const a = clamp(patch.a ?? state.a, -RUFFINI_A_LIMIT, RUFFINI_A_LIMIT)
    // A new polynomial or a new a starts the table again
    return { polynomial, a, steps: 1 }
}

export const ruffiniStep = (state: RuffiniState): RuffiniState => ({ ...state, steps: Math.min(ruffiniPolynomials[state.polynomial].length, state.steps + 1) })
export const ruffiniFinish = (state: RuffiniState): RuffiniState => ({ ...state, steps: ruffiniPolynomials[state.polynomial].length })

/** The remainder once the table is complete, or null */
export const ruffiniRemainder = (state: RuffiniState) => (ruffiniDone(state) ? ruffiniRows(ruffiniPolynomials[state.polynomial], state.a).bottom.at(-1)! : null)

export const ruffiniChallenges: LabChallenge<RuffiniState>[] = [
    { id: 45101, prompt: say('Bete taula: $(x^{3}-7x^{2}+9x-3)\\mathbin{:}(x-5)$.', 'Completa la tabla: $(x^{3}-7x^{2}+9x-3)\\mathbin{:}(x-5)$.', 'أكمل الجدول: $(x^{3}-7x^{2}+9x-3)\\mathbin{:}(x-5)$.'), hint: say('$a=5$; hondarra $-8$.', '$a=5$; el resto es $-8$.', '$a=5$؛ الباقي $-8$.'), isSolved: (state) => state.polynomial === 0 && state.a === 5 && ruffiniDone(state) },
    { id: 45102, prompt: say('Zatitu $2x^{3}+7x^{2}+2x+4$ polinomioa $(x+3)$-z.', 'Divide $2x^{3}+7x^{2}+2x+4$ entre $(x+3)$.', 'اقسم $2x^{3}+7x^{2}+2x+4$ على $(x+3)$.'), hint: say('$x+3=x-(-3)$: $a=-3$.', '$x+3=x-(-3)$: $a=-3$.', '$x+3=x-(-3)$: $a=-3$.'), isSolved: (state) => state.polynomial === 1 && state.a === -3 && ruffiniDone(state) },
    { id: 45103, prompt: say('Bilatu a bat $2x^{3}-7x^{2}-17x+10$ zehazki zatitzeko (hondarra 0).', 'Busca un a que divida exactamente $2x^{3}-7x^{2}-17x+10$ (resto 0).', 'جد قيمة a تقسم $2x^{3}-7x^{2}-17x+10$ قسمة تامة (الباقي 0).'), hint: say('Probatu 10en zatitzaileak: 5 edo $-2$.', 'Prueba divisores de 10: 5 o $-2$.', 'جرّب قواسم 10: 5 أو $-2$.'), isSolved: (state) => state.polynomial === 3 && ruffiniRemainder(state) === 0 },
    { id: 45104, prompt: say('Egiaztatu $x^{5}-32$ zehazki zatitzen dela $(x-2)$-z: falta diren gaien tokian 0.', 'Comprueba que $x^{5}-32$ es divisible entre $(x-2)$: 0 en los términos que faltan.', 'تحقّق أن $x^{5}-32$ يقبل القسمة على $(x-2)$: 0 مكان الحدود الناقصة.'), hint: say('$2^{5}=32$.', '$2^{5}=32$.', '$2^{5}=32$.'), isSolved: (state) => state.polynomial === 4 && state.a === 2 && ruffiniDone(state) }
]

/* ---------- 2. Hunting for roots ---------- */

export const rootsPolynomials: number[][] = [
    [1, -6, 11, -6],
    [1, 7, 14, 8],
    [1, 2, -8, 0],
    [1, -2, -8, 18, -9],
    [1, -1, -1, -2],
    [1, 3, 3, 1]
]

export interface RootsState {
    polynomial: number
    /** Roots found, in order; a double root appears twice */
    roots: number[]
    /** Candidates tried on the current quotient that were not roots */
    misses: number[]
}

export const initialRootsState: RootsState = { polynomial: 0, roots: [], misses: [] }

/** The quotient left after dividing by every root found */
export const currentQuotient = (state: Pick<RootsState, 'polynomial' | 'roots'>) => state.roots.reduce((coefficients, root) => deflate(coefficients, root), rootsPolynomials[state.polynomial])

/** Candidates for an integer root of the current quotient: 0 if there is no constant term, else ± the divisors of it */
export function candidates(coefficients: number[]): number[] {
    const constant = coefficients.at(-1)!
    if (constant === 0) return [0]
    const size = Math.abs(constant)
    const divisors = Array.from({ length: size }, (_, index) => index + 1).filter((value) => size % value === 0)
    return divisors.flatMap((value) => [value, -value])
}

/** Finished: the quotient is of degree 1, or none of its candidates is a root */
export function rootsFinished(state: RootsState) {
    const quotient = currentQuotient(state)
    if (quotient.length <= 2) return true
    return candidates(quotient).every((candidate) => state.misses.includes(candidate))
}

export const chooseRootsPolynomial = (_state: RootsState, polynomial: number): RootsState => ({ polynomial: clamp(polynomial, 0, rootsPolynomials.length - 1), roots: [], misses: [] })

export function tryCandidate(state: RootsState, candidate: number): RootsState {
    if (rootsFinished(state)) return state
    const quotient = currentQuotient(state)
    if (evaluate(quotient, candidate) === 0) return { ...state, roots: [...state.roots, candidate], misses: [] }
    return state.misses.includes(candidate) ? state : { ...state, misses: [...state.misses, candidate] }
}

/** The factorisation so far: the factors (x − r) and the quotient left */
export function factorizationLatex(state: RootsState): string {
    const quotient = currentQuotient(state)
    // The last linear quotient x − r also shows as a factor
    const linear = quotient.length === 2 && quotient[0] === 1
    const roots = linear ? [...state.roots, -quotient[1]] : state.roots
    const counts = new Map<number, number>()
    for (const root of roots) counts.set(root, (counts.get(root) ?? 0) + 1)
    const factors = [...counts.entries()].map(([root, count]) => (root === 0 ? `x${count > 1 ? `^{${count}}` : ''}` : `(${binomialLatex(root)})${count > 1 ? `^{${count}}` : ''}`))
    const rest = linear || (quotient.length === 1 && quotient[0] === 1) ? '' : `(${polynomialLatex(quotient)})`
    return [...factors, rest].filter(Boolean).join('') || polynomialLatex(quotient)
}

export const rootsChallenges: LabChallenge<RootsState>[] = [
    { id: 45201, prompt: say('Faktorizatu osorik $x^{3}-6x^{2}+11x-6$.', 'Factoriza del todo $x^{3}-6x^{2}+11x-6$.', 'حلّل كليًا $x^{3}-6x^{2}+11x-6$.'), hint: say('Probatu 1, 2 eta 3.', 'Prueba 1, 2 y 3.', 'جرّب 1 و2 و3.'), isSolved: (state) => state.polynomial === 0 && rootsFinished(state) },
    { id: 45202, prompt: say('Aurkitu erro bikoitz bat $x^{4}-2x^{3}-8x^{2}+18x-9$ polinomioan.', 'Encuentra una raíz doble en $x^{4}-2x^{3}-8x^{2}+18x-9$.', 'جد جذرًا مضاعفًا في $x^{4}-2x^{3}-8x^{2}+18x-9$.'), hint: say('Probatu 1 bi aldiz.', 'Prueba el 1 dos veces.', 'جرّب 1 مرتين.'), isSolved: (state) => state.polynomial === 3 && state.roots.filter((root) => root === 1).length >= 2 },
    { id: 45203, prompt: say('Erakutsi $x^{3}-x^{2}-x-2$ polinomioak erro oso bakarra duela.', 'Demuestra que $x^{3}-x^{2}-x-2$ tiene una sola raíz entera.', 'بيّن أن $x^{3}-x^{2}-x-2$ له جذر صحيح واحد فقط.'), hint: say('2 aurkitu ondoren, probatu $\\pm 1$ zatiduran.', 'Tras encontrar el 2, prueba $\\pm 1$ en el cociente.', 'بعد إيجاد 2 جرّب $\\pm 1$ في خارج القسمة.'), isSolved: (state) => state.polynomial === 4 && state.roots.length === 1 && rootsFinished(state) },
    { id: 45204, prompt: say('Idatzi $x^{3}+3x^{2}+3x+1$ binomio baten kubo gisa.', 'Escribe $x^{3}+3x^{2}+3x+1$ como el cubo de un binomio.', 'اكتب $x^{3}+3x^{2}+3x+1$ مكعّبًا لثنائي حد.'), hint: say('$-1$ hiru aldiz.', '$-1$ tres veces.', '$-1$ ثلاث مرات.'), isSolved: (state) => state.polynomial === 5 && rootsFinished(state) }
]

/* ---------- Progress ids: the 2. DBH tools' challenges, then the new ones ---------- */

export const polynomialsLabChallengeIds = [
    ...machineChallenges,
    ...tilesChallenges,
    ...areaChallenges,
    ...identityChallenges,
    ...factorChallenges,
    ...ruffiniChallenges,
    ...rootsChallenges
].map((challenge) => challenge.id)
