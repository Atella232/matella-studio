import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Polinomioen detektibea (3. DBH): a worked solution of three lines where
   exactly one line has a mistake, and the lines after it carry it on. The
   learner taps the wrong line and says which mistake it is, among three.
   The mistakes are the typical ones of this unit. Level 1: monomials and
   operations (unlike terms added, exponents multiplied, the minus sign
   only on the first term, products missing); level 2: special products
   (the middle term forgotten, −b², a² + b² for a sum times a difference,
   a instead of 2a); level 3: Ruffini and factorising (the sign of a, P(a)
   for x + a, the 1 forgotten in a common factor, a sum cancelled in a
   fraction). Every case carries the value of the right result and of the
   wrong one at x = 2, so that the tests can check they differ.
   ========================================================================== */

export type DetectiveError =
    | 'add-unlike'
    | 'multiply-exponents'
    | 'minus-first'
    | 'missing-products'
    | 'no-middle'
    | 'square-sign'
    | 'sum-diff-plus'
    | 'middle-single'
    | 'ruffini-sign'
    | 'remainder-sign'
    | 'factor-one'
    | 'cancel-sum'

export interface DetectiveLine {
    label: LocalizedText
    latex: string
}

export interface DetectiveCase {
    problem: LocalizedText
    lines: DetectiveLine[]
    wrong: number
    error: DetectiveError
    fix: string
    options: DetectiveError[]
    /** The right result and the one the solution reached, both at x = 2 (or the number asked for) */
    right: number
    reached: number
}

export const detectiveLevels: DetectiveError[][] = [
    ['add-unlike', 'multiply-exponents', 'minus-first', 'missing-products'],
    ['no-middle', 'square-sign', 'sum-diff-plus', 'middle-single'],
    ['ruffini-sign', 'remainder-sign', 'factor-one', 'cancel-sum']
]

export const DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`
const line = (label: LocalizedText, latex: string): DetectiveLine => ({ label, latex })
const LABELS = {
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const work = (latex: string) => say(`Kalkulatu ${math(latex)}.`, `Calcula ${math(latex)}.`, `احسب ${math(latex)}.`, `Work out ${math(latex)}.`)
const X = 2

export const detectiveErrorNames: Record<DetectiveError, LocalizedText> = {
    'add-unlike': say('Antzekoak ez diren gaiak batu ditu', 'Sumó términos que no son semejantes', 'جمع حدودًا غير متشابهة', 'Added terms that are not like terms'),
    'multiply-exponents': say('Berretzaileak biderkatu ditu, batu beharrean', 'Multiplicó los exponentes en vez de sumarlos', 'ضرب الأسس بدل جمعها', 'Multiplied the exponents instead of adding them'),
    'minus-first': say('Kenketak lehen gaiari bakarrik eragin dio', 'La resta solo afectó al primer término', 'لم يؤثر الطرح إلا في الحد الأول', 'The subtraction only affected the first term'),
    'missing-products': say('Biderkadura batzuk ahaztu ditu', 'Olvidó algunos productos', 'نسي بعض حواصل الضرب', 'Forgot some of the products'),
    'no-middle': say('Erdiko gaia ahaztu du', 'Olvidó el término del medio', 'نسي الحد الأوسط', 'Forgot the middle term'),
    'square-sign': say('Azken karratuari minus jarri dio', 'Puso un menos al último cuadrado', 'وضع سالبًا للمربع الأخير', 'Put a minus sign on the last square'),
    'sum-diff-plus': say('Batura bider kendura batura bihurtu du', 'Convirtió suma por diferencia en una suma', 'حوّل مجموعًا في فرق إلى مجموع', 'Turned a sum times a difference into a sum'),
    'middle-single': say('Erdiko gaian ez du bikoiztu', 'No duplicó el término del medio', 'لم يضاعف الحد الأوسط', 'Did not double the middle term'),
    'ruffini-sign': say('a zenbakiaren zeinua okerra da', 'El signo de a está mal', 'إشارة a خاطئة', 'The sign of a is wrong'),
    'remainder-sign': say('P(a) kalkulatu du zeinu okerrarekin', 'Calculó P(a) con el signo cambiado', 'حسب P(a) بإشارة معكوسة', 'Worked out P(a) with the wrong sign'),
    'factor-one': say('Faktore komunean 1 ahaztu du', 'Olvidó el 1 al sacar factor común', 'نسي 1 عند إخراج العامل المشترك', 'Forgot the 1 when taking out a common factor'),
    'cancel-sum': say('Batugai bat ezabatu du, ez faktore bat', 'Tachó un sumando, no un factor', 'شطب حدًا مجموعًا لا عاملًا', 'Cancelled a term being added, not a factor')
}

export const detectiveErrorTips: Record<DetectiveError, LocalizedText> = {
    'add-unlike': say('Antzekoak bakarrik batzen dira: $2x+3x^{2}$ ezin da laburtu.', 'Solo se suman los semejantes: $2x+3x^{2}$ no se reduce.', 'لا تُجمع إلا المتشابهة: $2x+3x^{2}$ لا يُختصر.', 'Only like terms are added: $2x+3x^{2}$ does not reduce.'),
    'multiply-exponents': say('Oinarri bera biderkatzean berretzaileak batu: $x^{2}\\cdot x^{3}=x^{5}$.', 'Al multiplicar la misma base se suman los exponentes: $x^{2}\\cdot x^{3}=x^{5}$.', 'عند ضرب الأساس نفسه تُجمع الأسس: $x^{2}\\cdot x^{3}=x^{5}$.', 'When multiplying the same base, add the exponents: $x^{2}\\cdot x^{3}=x^{5}$.'),
    'minus-first': say('Parentesiaren aurreko minusak gai guztien zeinua aldatzen du.', 'El menos delante del paréntesis cambia el signo de todos los términos.', 'السالب أمام القوس يغيّر إشارة كل الحدود.', 'The minus sign in front of the brackets changes the sign of every term.'),
    'missing-products': say('Gai bakoitza bider gai guztiak: bi binomiok lau biderkadura.', 'Cada término por todos: dos binomios dan cuatro productos.', 'كل حد في كل الحدود: ثنائيا حد يعطيان أربعة حواصل.', 'Each term times all the others: two binomials give four products.'),
    'no-middle': say('$(a+b)^{2}=a^{2}+2ab+b^{2}$: bi laukizuzenak falta dira.', '$(a+b)^{2}=a^{2}+2ab+b^{2}$: faltan los dos rectángulos.', '$(a+b)^{2}=a^{2}+2ab+b^{2}$: ينقص المستطيلان.', '$(a+b)^{2}=a^{2}+2ab+b^{2}$: the two rectangles are missing.'),
    'square-sign': say('$(a-b)^{2}=a^{2}-2ab+b^{2}$: karratua beti positiboa.', '$(a-b)^{2}=a^{2}-2ab+b^{2}$: un cuadrado siempre es positivo.', '$(a-b)^{2}=a^{2}-2ab+b^{2}$: المربع موجب دائمًا.', '$(a-b)^{2}=a^{2}-2ab+b^{2}$: a square is always positive.'),
    'sum-diff-plus': say('$(a+b)(a-b)=a^{2}-b^{2}$: karratuen kendura.', '$(a+b)(a-b)=a^{2}-b^{2}$: diferencia de cuadrados.', '$(a+b)(a-b)=a^{2}-b^{2}$: فرق مربعين.', '$(a+b)(a-b)=a^{2}-b^{2}$: a difference of squares.'),
    'middle-single': say('Erdiko gaia $2ab$ da, ez $ab$.', 'El término del medio es $2ab$, no $ab$.', 'الحد الأوسط $2ab$ لا $ab$.', 'The middle term is $2ab$, not $ab$.'),
    'ruffini-sign': say('$x+a$ zatitzeko, taulan $-a$ jartzen da.', 'Para dividir entre $x+a$, en la tabla se pone $-a$.', 'للقسمة على $x+a$ نضع $-a$ في الجدول.', 'To divide by $x+a$, put $-a$ in the table.'),
    'remainder-sign': say('$P(x):(x+a)$ eragiketaren hondarra $P(-a)$ da.', 'El resto de $P(x):(x+a)$ es $P(-a)$.', 'باقي $P(x):(x+a)$ هو $P(-a)$.', 'The remainder of $P(x):(x+a)$ is $P(-a)$.'),
    'factor-one': say('Gai bat faktorearen berdina bada, barruan 1 geratzen da.', 'Si un término es igual al factor, dentro queda un 1.', 'إذا ساوى حدٌّ العامل يبقى في الداخل 1.', 'If a term equals the factor, a 1 is left inside.'),
    'cancel-sum': say('Zatiki batean faktoreak bakarrik ezabatzen dira, ez batugaiak.', 'En una fracción solo se tachan factores, no sumandos.', 'في الكسر لا يُشطب إلا العوامل لا الحدود المجموعة.', 'In a fraction only factors are cancelled, not terms being added.')
}

type Built = Omit<DetectiveCase, 'options'>
type Builder = (random: Random) => Built | null

function addUnlike(random: Random): Built {
    const a = randomInt(random, 2, 6)
    const b = randomInt(random, 2, 6)
    const c = randomInt(random, 1, 5)
    return {
        problem: work(`${a}x+${b}x^{2}+${c}x`),
        lines: [line(LABELS.step, `${a}x+${c}x=${a + c}x`), line(LABELS.step, `${a + c}x+${b}x^{2}=${a + b + c}x^{3}`), line(LABELS.result, `${a + b + c}x^{3}`)],
        wrong: 1, error: 'add-unlike', fix: `${b}x^{2}+${a + c}x`, right: b * X * X + (a + c) * X, reached: (a + b + c) * X ** 3
    }
}

function multiplyExponents(random: Random): Built | null {
    const a = randomInt(random, 2, 5)
    const b = randomInt(random, 2, 5)
    const m = randomInt(random, 2, 4)
    const n = randomInt(random, 2, 4)
    // x² · x²: multiplying the exponents happens to give the right one
    if (m * n === m + n) return null
    return {
        problem: work(`${a}x^{${m}}\\cdot ${b}x^{${n}}`),
        lines: [line(LABELS.step, `${a}\\cdot ${b}=${a * b}`), line(LABELS.rule, `x^{${m}}\\cdot x^{${n}}=x^{${m * n}}`), line(LABELS.result, `${a * b}x^{${m * n}}`)],
        wrong: 1, error: 'multiply-exponents', fix: `x^{${m}}\\cdot x^{${n}}=x^{${m + n}}`, right: a * b * X ** (m + n), reached: a * b * X ** (m * n)
    }
}

function minusFirst(random: Random): Built {
    const a = randomInt(random, 3, 7)
    const b = randomInt(random, 1, 6)
    const c = randomInt(random, 1, 2)
    const d = randomInt(random, 1, 6)
    return {
        problem: work(`(${a}x^{2}+${b}x)-(${c}x^{2}+${d}x)`),
        lines: [line(LABELS.step, `${a}x^{2}+${b}x-${c}x^{2}+${d}x`), line(LABELS.step, `(${a}-${c})x^{2}+(${b}+${d})x`), line(LABELS.result, `${a - c}x^{2}+${b + d}x`)],
        wrong: 0, error: 'minus-first', fix: `${a}x^{2}+${b}x-${c}x^{2}-${d}x`, right: (a - c) * X * X + (b - d) * X, reached: (a - c) * X * X + (b + d) * X
    }
}

function missingProducts(random: Random): Built {
    const a = randomInt(random, 2, 7)
    const b = randomInt(random, 2, 7)
    return {
        problem: work(`(x+${a})(x+${b})`),
        lines: [line(LABELS.rule, `(x+${a})(x+${b})=x\\cdot x+${a}\\cdot ${b}`), line(LABELS.step, `x\\cdot x=x^{2}`), line(LABELS.result, `x^{2}+${a * b}`)],
        wrong: 0, error: 'missing-products', fix: `x^{2}+${b}x+${a}x+${a * b}=x^{2}+${a + b}x+${a * b}`, right: (X + a) * (X + b), reached: X * X + a * b
    }
}

function noMiddle(random: Random): Built {
    const a = randomInt(random, 2, 9)
    return {
        problem: work(`(x+${a})^{2}`),
        lines: [line(LABELS.rule, `(x+${a})^{2}=x^{2}+${a}^{2}`), line(LABELS.step, `${a}^{2}=${a * a}`), line(LABELS.result, `x^{2}+${a * a}`)],
        wrong: 0, error: 'no-middle', fix: `(x+${a})^{2}=x^{2}+${2 * a}x+${a * a}`, right: (X + a) ** 2, reached: X * X + a * a
    }
}

function squareSign(random: Random): Built {
    const a = randomInt(random, 2, 9)
    return {
        problem: work(`(x-${a})^{2}`),
        lines: [line(LABELS.step, `x^{2}`), line(LABELS.step, `-2\\cdot x\\cdot ${a}=-${2 * a}x`), line(LABELS.result, `x^{2}-${2 * a}x-${a * a}`)],
        wrong: 2, error: 'square-sign', fix: `x^{2}-${2 * a}x+${a * a}`, right: (X - a) ** 2, reached: X * X - 2 * a * X - a * a
    }
}

function sumDiffPlus(random: Random): Built {
    const a = randomInt(random, 2, 9)
    return {
        problem: work(`(x+${a})(x-${a})`),
        lines: [line(LABELS.rule, `(x+${a})(x-${a})=x^{2}+${a}^{2}`), line(LABELS.step, `${a}^{2}=${a * a}`), line(LABELS.result, `x^{2}+${a * a}`)],
        wrong: 0, error: 'sum-diff-plus', fix: `(x+${a})(x-${a})=x^{2}-${a * a}`, right: X * X - a * a, reached: X * X + a * a
    }
}

function middleSingle(random: Random): Built {
    const a = randomInt(random, 2, 9)
    return {
        problem: work(`(x+${a})^{2}`),
        lines: [line(LABELS.step, `x^{2}`), line(LABELS.step, `x\\cdot ${a}=${a}x`), line(LABELS.result, `x^{2}+${a}x+${a * a}`)],
        wrong: 1, error: 'middle-single', fix: `2\\cdot x\\cdot ${a}=${2 * a}x`, right: (X + a) ** 2, reached: X * X + a * X + a * a
    }
}

function ruffiniSign(random: Random): Built | null {
    const a = randomInt(random, 1, 4)
    const b = randomInt(random, -5, 5)
    const c = randomInt(random, -6, 6)
    const right = a * a - b * a + c
    const reached = a * a + b * a + c
    if (right === reached) return null
    return {
        problem: say(`Ruffinirekin, kalkulatu ${math(`(x^{2}${b < 0 ? b : `+${b}`}x${c < 0 ? c : `+${c}`}):(x+${a})`)} zatiketaren hondarra.`, `Con Ruffini, calcula el resto de ${math(`(x^{2}${b < 0 ? b : `+${b}`}x${c < 0 ? c : `+${c}`}):(x+${a})`)}.`, `بروفيني احسب باقي ${math(`(x^{2}${b < 0 ? b : `+${b}`}x${c < 0 ? c : `+${c}`}):(x+${a})`)}.`, `With Ruffini, work out the remainder of ${math(`(x^{2}${b < 0 ? b : `+${b}`}x${c < 0 ? c : `+${c}`}):(x+${a})`)}.`),
        lines: [line(LABELS.rule, `a=${a}`), line(LABELS.step, `1\\quad ${b + a}\\quad ${c + (b + a) * a}`), line(LABELS.result, `R=${reached}`)],
        wrong: 0, error: 'ruffini-sign', fix: `a=-${a}\\ \\to\\ R=${right}`, right, reached
    }
}

function remainderSign(random: Random): Built | null {
    const a = randomInt(random, 1, 4)
    const b = randomInt(random, -4, 4)
    const c = randomInt(random, -6, 6)
    const right = -(a ** 3) - b * a + c
    const reached = a ** 3 + b * a + c
    if (right === reached) return null
    const poly = `x^{3}${b < 0 ? b : `+${b}`}x${c < 0 ? c : `+${c}`}`
    return {
        problem: say(`Zein da ${math(`(${poly}):(x+${a})`)} zatiketaren hondarra?`, `¿Cuál es el resto de ${math(`(${poly}):(x+${a})`)}?`, `ما باقي ${math(`(${poly}):(x+${a})`)}؟`, `What is the remainder of ${math(`(${poly}):(x+${a})`)}?`),
        lines: [line(LABELS.rule, `R=P(${a})`), line(LABELS.step, `${a}^{3}${b * a < 0 ? b * a : `+${b * a}`}${c < 0 ? c : `+${c}`}`), line(LABELS.result, `R=${reached}`)],
        wrong: 0, error: 'remainder-sign', fix: `R=P(-${a})=${right}`, right, reached
    }
}

function factorOne(random: Random): Built {
    const k = randomInt(random, 2, 7)
    const m = randomInt(random, 2, 5)
    return {
        problem: say(`Atera faktore komuna: ${math(`${k * m}x^{2}+${k}x`)}`, `Saca factor común: ${math(`${k * m}x^{2}+${k}x`)}`, `أخرج العامل المشترك: ${math(`${k * m}x^{2}+${k}x`)}`, `Take out the common factor: ${math(`${k * m}x^{2}+${k}x`)}`),
        lines: [line(LABELS.rule, `${k}x`), line(LABELS.step, `${k * m}x^{2}\\mathbin{:}${k}x=${m}x`), line(LABELS.result, `${k}x(${m}x)`)],
        wrong: 2, error: 'factor-one', fix: `${k}x(${m}x+1)`, right: k * X * (m * X + 1), reached: k * X * m * X
    }
}

function cancelSum(random: Random): Built {
    // From 3 on: with 2 the wrong cancellation happens to give the right value
    const a = randomInt(random, 3, 9)
    return {
        problem: say(`Sinplifikatu ${math(`\\frac{x+${a}}{x}`)} eta kalkulatu haren balioa ${math('x=2')} denean.`, `Simplifica ${math(`\\frac{x+${a}}{x}`)} y calcula su valor para ${math('x=2')}.`, `بسّط ${math(`\\frac{x+${a}}{x}`)} واحسب قيمته عندما ${math('x=2')}.`, `Simplify ${math(`\\frac{x+${a}}{x}`)} and work out its value when ${math('x=2')}.`),
        lines: [line(LABELS.step, `\\frac{x+${a}}{x}=${a}`), line(LABELS.step, `x=2`), line(LABELS.result, `${a}`)],
        wrong: 0, error: 'cancel-sum', fix: `\\frac{2+${a}}{2}=${(2 + a) / 2 === Math.round((2 + a) / 2) ? (2 + a) / 2 : `\\frac{${2 + a}}{2}`}`, right: (X + a) / X, reached: a
    }
}

const builders: Record<DetectiveError, Builder> = {
    'add-unlike': addUnlike,
    'multiply-exponents': multiplyExponents,
    'minus-first': minusFirst,
    'missing-products': missingProducts,
    'no-middle': noMiddle,
    'square-sign': squareSign,
    'sum-diff-plus': sumDiffPlus,
    'middle-single': middleSingle,
    'ruffini-sign': ruffiniSign,
    'remainder-sign': remainderSign,
    'factor-one': factorOne,
    'cancel-sum': cancelSum
}

export function createDetectiveCase(random: Random, levelIndex: number, error: DetectiveError): DetectiveCase {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    for (let attempt = 0; attempt < 500; attempt += 1) {
        const made = builders[error](random)
        if (!made) continue
        const others = shuffle(random, pool.filter((item) => item !== error)).slice(0, 2)
        return { ...made, options: shuffle(random, [error, ...others]) }
    }
    throw new Error(`No detective case for ${error}`)
}

export function createDetectiveCases(random: Random, levelIndex: number): DetectiveCase[] {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    const order = shuffle(random, pool)
    const errors = Array.from({ length: DETECTIVE_CASES }, (_, index) => order[index % order.length])
    return shuffle(random, errors).map((error) => createDetectiveCase(random, levelIndex, error))
}

export function detectiveStars(score: number): Stars {
    if (score >= 11) return 3
    if (score >= 9) return 2
    if (score >= 6) return 1
    return 0
}
