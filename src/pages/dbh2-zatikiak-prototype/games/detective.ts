import type { LocalizedText } from '../content.ts'
import { add, divide, equals, fraction, gcd, multiply, subtract, type FractionValue } from '../math/fraction.ts'
import { pick, shuffle, type Random } from './random.ts'
import type { Stars } from './records.ts'

/* ==========================================================================
   Akatsen detektibea (Detective de errores): a worked solution where one
   line is wrong. Every line carries the value it stands for: the lines
   before the mistake keep the value of the exercise, the wrong line changes
   it, and the lines after it are right steps from the wrong value. So the
   mistake is exactly where the value changes.
   ========================================================================== */

export type DetectiveError =
    | 'added-denominators'
    | 'forgot-numerator'
    | 'calculation'
    | 'bad-simplify'
    | 'sign'
    | 'cross-multiplied'
    | 'no-invert'
    | 'inverted-first'
    | 'priority'
    | 'power-numerator'

export interface DetectiveLine {
    latex: string
    /** The value the line stands for */
    value: FractionValue
}

export interface DetectiveCase {
    /** The exercise, as a formula */
    statement: string
    /** Its right value */
    value: FractionValue
    /** Each line is shown after an equals sign */
    lines: DetectiveLine[]
    wrong: number
    error: DetectiveError
    /** What the wrong line should have been */
    fix: string
    /** Three kinds of error to choose from, the right one among them */
    options: DetectiveError[]
}

/** The mistakes each level shows */
export const detectiveLevels: DetectiveError[][] = [
    ['added-denominators', 'forgot-numerator', 'calculation', 'bad-simplify', 'sign'],
    ['cross-multiplied', 'no-invert', 'inverted-first', 'calculation', 'bad-simplify'],
    ['priority', 'power-numerator', 'no-invert', 'calculation', 'bad-simplify']
]

export const DETECTIVE_CASES = 6

export const detectiveErrorNames: Record<DetectiveError, LocalizedText> = {
    'added-denominators': { eu: 'Izendatzaileak batu ditu', es: 'Sumó los denominadores', en: 'Added the denominators', ar: 'جمع المقامات' },
    'forgot-numerator': { eu: 'Ez du zenbakitzailea aldatu', es: 'No cambió el numerador', en: 'Did not change the numerator', ar: 'لم يغيّر البسط' },
    calculation: { eu: 'Kalkulu-akatsa', es: 'Error de cálculo', en: 'Calculation error', ar: 'خطأ حسابي' },
    'bad-simplify': { eu: 'Gaizki sinplifikatu du', es: 'Simplificó mal', en: 'Simplified incorrectly', ar: 'اختزل خطأً' },
    sign: { eu: 'Zeinu-akatsa', es: 'Error de signo', en: 'Sign error', ar: 'خطأ في الإشارة' },
    'cross-multiplied': { eu: 'Gurutzean biderkatu du', es: 'Multiplicó en cruz', en: 'Cross-multiplied', ar: 'ضرب تبادليًا' },
    'no-invert': { eu: 'Ez du bigarrena alderantzikatu', es: 'No invirtió la segunda', en: 'Did not invert the second one', ar: 'لم يقلب الكسر الثاني' },
    'inverted-first': { eu: 'Lehena alderantzikatu du', es: 'Invirtió la primera', en: 'Inverted the first one', ar: 'قلب الكسر الأول' },
    priority: { eu: 'Ez du hierarkia errespetatu', es: 'Se saltó la jerarquía', en: 'Skipped the order of operations', ar: 'لم يحترم أولوية العمليات' },
    'power-numerator': { eu: 'Zenbakitzailea bakarrik berretu du', es: 'Solo elevó el numerador', en: 'Only raised the numerator to a power', ar: 'رفع البسط وحده' }
}

export const detectiveErrorTips: Record<DetectiveError, LocalizedText> = {
    'added-denominators': { eu: 'Izendatzaileak ez dira batzen: lehenik, izendatzaile komuna.', es: 'Los denominadores no se suman: primero, denominador común.', en: 'Denominators are not added: first, a common denominator.', ar: 'لا تُجمع المقامات: أولًا المقام المشترك.' },
    'forgot-numerator': { eu: 'Izendatzailea aldatzen baduzu, zenbakitzailea zenbaki beraz biderkatu behar da.', es: 'Si cambias el denominador, el numerador se multiplica por el mismo número.', en: 'If you change the denominator, the numerator is multiplied by the same number.', ar: 'إذا غيّرت المقام فاضرب البسط في العدد نفسه.' },
    calculation: { eu: 'Berrikusi lerro horretako eragiketa.', es: 'Repasa la operación de esa línea.', en: 'Check the calculation on that line.', ar: 'راجع العملية في ذلك السطر.' },
    'bad-simplify': { eu: 'Sinplifikatzeko, zatitu zenbakitzailea eta izendatzailea zenbaki beraz.', es: 'Para simplificar, divide numerador y denominador entre el mismo número.', en: 'To simplify, divide the numerator and the denominator by the same number.', ar: 'للاختزال اقسم البسط والمقام على العدد نفسه.' },
    sign: { eu: 'Zatiki handiago bat kentzen baduzu, emaitza negatiboa da.', es: 'Si restas una fracción mayor, el resultado es negativo.', en: 'If you subtract a larger fraction, the result is negative.', ar: 'إذا طرحت كسرًا أكبر فالنتيجة سالبة.' },
    'cross-multiplied': { eu: 'Biderkatzeko: zenbakitzailea zenbakitzaileaz eta izendatzailea izendatzaileaz.', es: 'Para multiplicar: numerador por numerador y denominador por denominador.', en: 'To multiply: numerator by numerator and denominator by denominator.', ar: 'للضرب: البسط في البسط والمقام في المقام.' },
    'no-invert': { eu: 'Zatitzeko, bigarren zatikiaren alderantzizkoaz biderkatzen da.', es: 'Para dividir, se multiplica por la inversa de la segunda fracción.', en: 'To divide, multiply by the reciprocal of the second fraction.', ar: 'للقسمة نضرب في مقلوب الكسر الثاني.' },
    'inverted-first': { eu: 'Bigarren zatikia alderantzikatzen da, ez lehena.', es: 'Se invierte la segunda fracción, no la primera.', en: 'Invert the second fraction, not the first.', ar: 'نقلب الكسر الثاني لا الأول.' },
    priority: { eu: 'Lehenik biderketak eta zatiketak; gero batuketak eta kenketak.', es: 'Primero las multiplicaciones y divisiones; después las sumas y restas.', en: 'First multiply and divide; then add and subtract.', ar: 'أولًا الضرب والقسمة، ثم الجمع والطرح.' },
    'power-numerator': { eu: 'Zatiki baten berreturak zenbakitzailea eta izendatzailea berretzen ditu.', es: 'Al elevar una fracción se elevan el numerador y el denominador.', en: 'When you raise a fraction to a power, you raise both the numerator and the denominator.', ar: 'عند رفع كسر إلى قوة يُرفع البسط والمقام معًا.' }
}

/* ---------- Writing ---------- */

/** A fraction exactly as written (denominator positive), the minus sign in front */
const written = (numerator: number, denominator: number) =>
    denominator === 1 ? String(numerator) : `${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator)}}{${denominator}}`
const tex = (value: FractionValue) => written(value.numerator, value.denominator)

const lcm = (a: number, b: number) => (a * b) / gcd(a, b)
const divisorsOf = (n: number) => Array.from({ length: n }, (_, index) => index + 1).filter((d) => n % d === 0)

function properFraction(random: Random, minD: number, maxD: number, minN = 1): FractionValue {
    for (;;) {
        const denominator = minD + Math.floor(random() * (maxD - minD + 1))
        const numerator = minN + Math.floor(random() * (denominator - minN))
        if (numerator >= minN && numerator < denominator && gcd(numerator, denominator) === 1) return { numerator, denominator }
    }
}

type Slip = 'calculation' | 'bad-simplify' | 'sign' | null

interface Tail {
    lines: DetectiveLine[]
    /** Index of the wrong line within these lines, or null when they are all right */
    wrong: number | null
    fix: string | null
}

/**
 * The last lines: the result N/D as computed, then simplified. A slip makes
 * one of them wrong: a miscounted numerator, a lost minus sign, or terms
 * divided by different numbers.
 */
function finish(random: Random, numerator: number, denominator: number, value: FractionValue, slip: Slip): Tail | null {
    const simplified = (shown: number, shownValue: FractionValue): DetectiveLine[] =>
        shown !== 0 && gcd(Math.abs(shown), denominator) > 1 ? [{ latex: tex(shownValue), value: shownValue }] : []
    if (slip === 'calculation') {
        const deltas = [-2, -1, 1, 2].filter((delta) => numerator + delta !== 0 && Math.sign(numerator + delta) === Math.sign(numerator))
        if (deltas.length === 0) return null
        const shown = numerator + pick(random, deltas)
        const shownValue = fraction(shown, denominator)
        return { lines: [{ latex: written(shown, denominator), value: shownValue }, ...simplified(shown, shownValue)], wrong: 0, fix: written(numerator, denominator) }
    }
    if (slip === 'sign') {
        if (numerator >= 0) return null
        const shownValue = fraction(-numerator, denominator)
        return { lines: [{ latex: written(-numerator, denominator), value: shownValue }, ...simplified(-numerator, shownValue)], wrong: 0, fix: written(numerator, denominator) }
    }
    const lines: DetectiveLine[] = [{ latex: written(numerator, denominator), value }]
    if (slip === 'bad-simplify') {
        const common = gcd(Math.abs(numerator), denominator)
        if (numerator === 0 || common === 1) return null
        // The numerator divided by the common divisor, the denominator by another number (or not at all);
        // the wrong result stays on the same side of 1 as the right one, so it does not give itself away
        const side = (n: number, d: number) => Math.sign(Math.abs(n) - d)
        const others = divisorsOf(denominator).filter((d) => d > 1 && d !== common && d !== denominator
            && side(numerator / common, denominator / d) === side(numerator, denominator))
        const other = others.length > 0 ? pick(random, others) : 1
        const wrongValue = fraction(numerator / common, denominator / other)
        if (equals(wrongValue, value)) return null
        lines.push({ latex: written(numerator / common, denominator / other), value: wrongValue })
        return { lines, wrong: 1, fix: tex(value) }
    }
    return { lines: [...lines, ...simplified(numerator, value)], wrong: null, fix: null }
}

/** Adding or subtracting two fractions: common denominator, numerators together, result */
function sumSteps(random: Random, x: FractionValue, op: '+' | '-', y: FractionValue, slip: Slip): Tail | null {
    const value = op === '+' ? add(x, y) : subtract(x, y)
    const common = lcm(x.denominator, y.denominator)
    const first = x.numerator * (common / x.denominator)
    const second = y.numerator * (common / y.denominator)
    const lines: DetectiveLine[] = []
    if (x.denominator !== y.denominator) lines.push({ latex: `${written(first, common)}${op}${written(second, common)}`, value })
    lines.push({ latex: `\\frac{${first}${op}${second}}{${common}}`, value })
    const tail = finish(random, op === '+' ? first + second : first - second, common, value, slip)
    if (!tail) return null
    return { lines: [...lines, ...tail.lines], wrong: tail.wrong === null ? null : lines.length + tail.wrong, fix: tail.fix }
}

/** Multiplying written out: the products, the result, simplified */
function productSteps(random: Random, x: FractionValue, y: FractionValue, slip: Slip): Tail | null {
    const value = multiply(x, y)
    const lines: DetectiveLine[] = [{ latex: `\\frac{${x.numerator}\\cdot ${y.numerator}}{${x.denominator}\\cdot ${y.denominator}}`, value }]
    const tail = finish(random, x.numerator * y.numerator, x.denominator * y.denominator, value, slip)
    if (!tail) return null
    return { lines: [...lines, ...tail.lines], wrong: tail.wrong === null ? null : lines.length + tail.wrong, fix: tail.fix }
}

interface Built {
    statement: string
    value: FractionValue
    lines: DetectiveLine[]
    wrong: number
    fix: string
}

/** The lines of a solution whose first line is either right or the mistake */
function withFirst(statement: string, value: FractionValue, first: DetectiveLine, rest: Tail | null, firstWrong: string | null): Built | null {
    if (!rest) return null
    if (firstWrong !== null) return { statement, value, lines: [first, ...rest.lines], wrong: 0, fix: firstWrong }
    if (rest.wrong === null || rest.fix === null) return null
    return { statement, value, lines: [first, ...rest.lines], wrong: rest.wrong + 1, fix: rest.fix }
}

const slipOf = (error: DetectiveError): Slip => (error === 'calculation' || error === 'bad-simplify' || error === 'sign' ? error : null)

/* ---------- Level 1: adding and subtracting ---------- */

function sumCase(random: Random, error: DetectiveError): Built | null {
    const x = properFraction(random, 2, 8)
    const y = properFraction(random, 2, 8)
    if (x.denominator === y.denominator || equals(x, y) || lcm(x.denominator, y.denominator) > 24) return null
    const op: '+' | '-' = error === 'added-denominators' ? '+' : error === 'sign' ? '-' : pick(random, ['+', '-'] as const)
    // A difference is positive, except where the mistake is losing its minus sign
    const larger = subtract(x, y).numerator > 0
    const [a, b] = op === '+' || larger !== (error === 'sign') ? [x, y] : [y, x]
    const value = op === '+' ? add(a, b) : subtract(a, b)
    const statement = `${tex(a)}${op}${tex(b)}`
    const common = lcm(a.denominator, b.denominator)
    const rightFirst = `${written(a.numerator * (common / a.denominator), common)}${op}${written(b.numerator * (common / b.denominator), common)}`
    if (error === 'added-denominators') {
        const wrongValue = fraction(a.numerator + b.numerator, a.denominator + b.denominator)
        if (equals(wrongValue, value)) return null
        const tail = finish(random, a.numerator + b.numerator, a.denominator + b.denominator, wrongValue, null)!
        return { statement, value, lines: [{ latex: `\\frac{${a.numerator}+${b.numerator}}{${a.denominator}+${b.denominator}}`, value: wrongValue }, ...tail.lines], wrong: 0, fix: rightFirst }
    }
    if (error === 'forgot-numerator') {
        const numerator = op === '+' ? a.numerator + b.numerator : a.numerator - b.numerator
        const wrongValue = fraction(numerator, common)
        if (numerator <= 0 || equals(wrongValue, value)) return null
        const tail = finish(random, numerator, common, wrongValue, null)!
        return {
            statement,
            value,
            lines: [
                { latex: `${written(a.numerator, common)}${op}${written(b.numerator, common)}`, value: wrongValue },
                { latex: `\\frac{${a.numerator}${op}${b.numerator}}{${common}}`, value: wrongValue },
                ...tail.lines
            ],
            wrong: 0,
            fix: rightFirst
        }
    }
    const steps = sumSteps(random, a, op, b, slipOf(error))
    if (!steps || steps.wrong === null || steps.fix === null) return null
    return { statement, value, lines: steps.lines, wrong: steps.wrong, fix: steps.fix }
}

/* ---------- Level 2: multiplying and dividing ---------- */

function productCase(random: Random, error: DetectiveError): Built | null {
    const a = properFraction(random, 2, 9)
    const b = properFraction(random, 2, 9)
    if (equals(a, b)) return null
    const op = error === 'cross-multiplied' ? '·' : error === 'no-invert' || error === 'inverted-first' ? ':' : pick(random, ['·', ':'] as const)
    if (op === '·') {
        const value = multiply(a, b)
        const statement = `${tex(a)}\\cdot ${tex(b)}`
        if (error === 'cross-multiplied') {
            const wrongValue = fraction(a.numerator * b.denominator, a.denominator * b.numerator)
            const tail = finish(random, a.numerator * b.denominator, a.denominator * b.numerator, wrongValue, null)!
            return {
                statement,
                value,
                lines: [{ latex: `\\frac{${a.numerator}\\cdot ${b.denominator}}{${a.denominator}\\cdot ${b.numerator}}`, value: wrongValue }, ...tail.lines],
                wrong: 0,
                fix: `\\frac{${a.numerator}\\cdot ${b.numerator}}{${a.denominator}\\cdot ${b.denominator}}`
            }
        }
        const steps = productSteps(random, a, b, slipOf(error))
        if (!steps || steps.wrong === null || steps.fix === null) return null
        return { statement, value, lines: steps.lines, wrong: steps.wrong, fix: steps.fix }
    }
    const value = divide(a, b)
    const statement = `${tex(a)}\\div ${tex(b)}`
    const inverse = { numerator: b.denominator, denominator: b.numerator }
    const rightFirst = `${tex(a)}\\cdot ${written(inverse.numerator, inverse.denominator)}`
    if (error === 'no-invert' || error === 'inverted-first') {
        const [left, right] = error === 'no-invert' ? [a, b] : [{ numerator: a.denominator, denominator: a.numerator }, b]
        const wrongValue = multiply(left, right)
        if (equals(wrongValue, value)) return null
        return withFirst(statement, value, { latex: `${written(left.numerator, left.denominator)}\\cdot ${tex(right)}`, value: wrongValue }, productSteps(random, left, right, null), rightFirst)
    }
    return withFirst(statement, value, { latex: rightFirst, value }, productSteps(random, a, inverse, slipOf(error)), null)
}

/* ---------- Level 3: combined operations ---------- */

function combinedCase(random: Random, error: DetectiveError): Built | null {
    const pattern = error === 'power-numerator' ? 'power'
        : error === 'no-invert' ? 'quotient'
            : pick(random, error === 'priority' ? ['product', 'quotient'] as const : ['product', 'power', 'quotient'] as const)
    const op = pick(random, ['+', '-'] as const)
    const a = properFraction(random, 2, 6)
    const c = properFraction(random, 2, 6)
    const join = (x: FractionValue, y: FractionValue) => (op === '+' ? add(x, y) : subtract(x, y))
    const slip = slipOf(error)
    if (pattern === 'power') {
        const base = properFraction(random, 3, 6, 2)
        const square = fraction(base.numerator ** 2, base.denominator ** 2)
        const value = join(square, c)
        if (value.numerator <= 0) return null
        const statement = `\\left(${tex(base)}\\right)^{2}${op}${tex(c)}`
        const rightFirst = `${written(base.numerator ** 2, base.denominator ** 2)}${op}${tex(c)}`
        if (error === 'power-numerator') {
            const half = fraction(base.numerator ** 2, base.denominator)
            const wrongValue = join(half, c)
            if (wrongValue.numerator <= 0) return null
            return withFirst(statement, value, { latex: `${written(base.numerator ** 2, base.denominator)}${op}${tex(c)}`, value: wrongValue }, sumSteps(random, half, op, c, null), rightFirst)
        }
        return withFirst(statement, value, { latex: rightFirst, value }, sumSteps(random, square, op, c, slip), null)
    }
    const b = properFraction(random, 2, 6)
    if (equals(b, c)) return null
    const middle = pattern === 'product' ? multiply(b, c) : divide(b, c)
    const value = join(a, middle)
    if (value.numerator <= 0 || lcm(a.denominator, middle.denominator) > 36) return null
    const statement = `${tex(a)}${op}${tex(b)}${pattern === 'product' ? '\\cdot ' : '\\div '}${tex(c)}`
    const rightFirst = `${tex(a)}${op}${tex(middle)}`
    if (error === 'priority') {
        // The sum or difference done first, then the product or quotient
        const early = join(a, b)
        if (early.numerator <= 0 || equals(early, c)) return null
        const wrongValue = pattern === 'product' ? multiply(early, c) : divide(early, c)
        const first = { latex: `${tex(early)}${pattern === 'product' ? '\\cdot ' : '\\div '}${tex(c)}`, value: wrongValue }
        if (equals(wrongValue, value)) return null
        if (pattern === 'product') return withFirst(statement, value, first, productSteps(random, early, c, null), rightFirst)
        const inverse = { numerator: c.denominator, denominator: c.numerator }
        const steps = productSteps(random, early, inverse, null)
        return withFirst(statement, value, first, steps && { ...steps, lines: [{ latex: `${tex(early)}\\cdot ${written(inverse.numerator, inverse.denominator)}`, value: wrongValue }, ...steps.lines] }, rightFirst)
    }
    if (error === 'no-invert') {
        const wrongMiddle = multiply(b, c)
        const wrongValue = join(a, wrongMiddle)
        if (wrongValue.numerator <= 0 || equals(wrongValue, value)) return null
        return withFirst(statement, value, { latex: `${tex(a)}${op}${tex(wrongMiddle)}`, value: wrongValue }, sumSteps(random, a, op, wrongMiddle, null), rightFirst)
    }
    return withFirst(statement, value, { latex: rightFirst, value }, sumSteps(random, a, op, middle, slip), null)
}

const builders = [sumCase, productCase, combinedCase]

export function createDetectiveCase(random: Random, levelIndex: number, error: DetectiveError): DetectiveCase {
    const kinds = detectiveLevels[levelIndex]
    for (;;) {
        const built = builders[levelIndex](random, error)
        // Keep the lines short enough for a phone, and the mistake visible
        if (!built || built.lines.length > 5 || built.fix === built.lines[built.wrong].latex) continue
        const distractors = shuffle(random, kinds.filter((kind) => kind !== error)).slice(0, 2)
        return { ...built, error, options: shuffle(random, [error, ...distractors]) }
    }
}

/** Six cases with as many different mistakes as the level has */
export function createDetectiveCases(random: Random, levelIndex: number): DetectiveCase[] {
    const kinds = detectiveLevels[levelIndex]
    const order = [...shuffle(random, kinds), ...shuffle(random, kinds)].slice(0, DETECTIVE_CASES)
    return order.map((error) => createDetectiveCase(random, levelIndex, error))
}

/** One point for the line and one for the kind of mistake */
export function detectiveStars(score: number): Stars {
    if (score >= 11) return 3
    if (score >= 9) return 2
    if (score >= 6) return 1
    return 0
}
