import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { add, fraction, gcd, multiply, subtract, toLatex, toNumber } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki arrazionalen detektibea (3. DBH): a worked solution of three
   lines where exactly one line has a mistake, and the lines after it
   carry it on. The learner taps the wrong line and says which mistake it
   is, among three. Level 1: fractions and order (adding numerators and
   denominators, a common denominator with the numerators left as they
   were, the order of two negatives, −(−a) left negative); level 2:
   operations (dividing straight across, multiplying across, the order of
   operations, the sign of a product of negatives); level 3: decimals and
   problems (a mixed recurring decimal read as pure, the digits before the
   period not subtracted, the second cut taken of the whole, the whole
   multiplied by the fraction). Every case carries the right value and the
   value reached.
   ========================================================================== */

export type DetectiveError =
    | 'add-across'
    | 'numerators-kept'
    | 'negative-order'
    | 'double-minus'
    | 'divide-straight'
    | 'multiply-cross'
    | 'hierarchy'
    | 'product-sign'
    | 'mixed-as-pure'
    | 'preperiod-kept'
    | 'remaining-of-whole'
    | 'whole-times'

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
    right: number
    reached: number
}

export const detectiveLevels: DetectiveError[][] = [
    ['add-across', 'numerators-kept', 'negative-order', 'double-minus'],
    ['divide-straight', 'multiply-cross', 'hierarchy', 'product-sign'],
    ['mixed-as-pure', 'preperiod-kept', 'remaining-of-whole', 'whole-times']
]

export const DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): DetectiveLine => ({ label, latex })
const LABELS = {
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const detectiveErrorNames: Record<DetectiveError, LocalizedText> = {
    'add-across': say('Zenbakitzaileak eta izendatzaileak batu ditu', 'Sumó numeradores y denominadores', 'جمع البسوط والمقامات', 'Added the numerators and the denominators'),
    'numerators-kept': say('Izendatzailea aldatu du, baina zenbakitzailea ez', 'Cambió el denominador pero no el numerador', 'غيّر المقام دون البسط', 'Changed the denominator but not the numerator'),
    'negative-order': say('Negatiboetan, balio absolutu handiena handiena dela uste du', 'Creyó que en los negativos es mayor el de mayor valor absoluto', 'ظنّ أن السالب ذا القيمة المطلقة الأكبر هو الأكبر', 'Thought the negative with the bigger absolute value is bigger'),
    'double-minus': say('$-(-a)$ negatibo utzi du', 'Dejó negativo $-(-a)$', 'ترك $-(-a)$ سالبًا', 'Left $-(-a)$ negative'),
    'divide-straight': say('Zuzen zatitu du, gurutzean biderkatu beharrean', 'Dividió en línea en vez de multiplicar en cruz', 'قسم مباشرة بدل الضرب التبادلي', 'Divided straight across instead of cross-multiplying'),
    'multiply-cross': say('Gurutzean biderkatu du biderketa batean', 'Multiplicó en cruz en un producto', 'ضرب تبادليًا في عملية ضرب', 'Cross-multiplied in a product'),
    'hierarchy': say('Batuketa biderketaren aurretik egin du', 'Hizo la suma antes que el producto', 'أجرى الجمع قبل الضرب', 'Did the addition before the product'),
    'product-sign': say('Bi negatiboren biderkadura negatibo egin du', 'Hizo negativo el producto de dos negativos', 'جعل حاصل ضرب سالبين سالبًا', 'Made the product of two negatives negative'),
    'mixed-as-pure': say('Periodiko mistoa hutsa balitz bezala hartu du', 'Trató un periódico mixto como si fuera puro', 'عامل الدوري المختلط كأنه بحت', 'Treated a mixed recurring decimal as a pure one'),
    'preperiod-kept': say('Ez du kendu periodoaren aurreko zatia', 'No restó la parte de antes del periodo', 'لم يطرح الجزء الذي قبل الدور', 'Did not subtract the part before the period'),
    'remaining-of-whole': say('Bigarren zatikia osoarena hartu du, ez geratzen denarena', 'Tomó la segunda fracción del total, no de lo que queda', 'أخذ الكسر الثاني من الكل لا من الباقي', 'Took the second fraction of the whole, not of what is left'),
    'whole-times': say('Osoa lortzeko zatikiaz biderkatu du, zatitu beharrean', 'Para el total multiplicó por la fracción en vez de dividir', 'ضرب في الكسر بدل القسمة لإيجاد الكل', 'Multiplied by the fraction instead of dividing to find the whole')
}

export const detectiveErrorTips: Record<DetectiveError, LocalizedText> = {
    'add-across': say('Lehenik izendatzaile komuna: $\\frac{a}{b}+\\frac{c}{d}=\\frac{ad+bc}{bd}$.', 'Primero, denominador común: $\\frac{a}{b}+\\frac{c}{d}=\\frac{ad+bc}{bd}$.', 'أولًا مقام مشترك: $\\frac{a}{b}+\\frac{c}{d}=\\frac{ad+bc}{bd}$.', 'First a common denominator: $\\frac{a}{b}+\\frac{c}{d}=\\frac{ad+bc}{bd}$.'),
    'numerators-kept': say('Izendatzailea zenbakiz biderkatzean, zenbakitzailea ere bai: zatiki baliokidea.', 'Si el denominador se multiplica por un número, el numerador también: fracción equivalente.', 'إذا ضُرب المقام في عدد فالبسط كذلك: كسر مكافئ.', 'If the denominator is multiplied by a number, so is the numerator: an equivalent fraction.'),
    'negative-order': say('Zuzenean, $-\\frac{8}{12}$ eskuinerago dago $-\\frac{9}{12}$ baino: negatiboetan, txikiena da balio absolutu handiena duena.', 'En la recta, $-\\frac{8}{12}$ está más a la derecha que $-\\frac{9}{12}$: en los negativos, el de mayor valor absoluto es el menor.', 'على المستقيم يقع $-\\frac{8}{12}$ يمين $-\\frac{9}{12}$: في السالبة صاحب القيمة المطلقة الأكبر هو الأصغر.', 'On the number line $-\\frac{8}{12}$ lies to the right of $-\\frac{9}{12}$: among negatives, the one with the bigger absolute value is smaller.'),
    'double-minus': say('Bi minus jarraian plus dira: $-(-a)=+a$.', 'Dos menos seguidos son un más: $-(-a)=+a$.', 'إشارتا طرح متتاليتان تصيران جمعًا: $-(-a)=+a$.', 'Two minus signs in a row make a plus: $-(-a)=+a$.'),
    'divide-straight': say('Zatitzeko, biderkatu alderantzizkoaz: $\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$.', 'Para dividir, multiplica por la inversa: $\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$.', 'للقسمة اضرب في المقلوب: $\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$.', 'To divide, multiply by the reciprocal: $\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$.'),
    'multiply-cross': say('Biderkatzeko, zuzen: $\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{a\\cdot c}{b\\cdot d}$.', 'Para multiplicar, en línea: $\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{a\\cdot c}{b\\cdot d}$.', 'للضرب مباشرة: $\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{a\\cdot c}{b\\cdot d}$.', 'To multiply, straight across: $\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{a\\cdot c}{b\\cdot d}$.'),
    'hierarchy': say('Biderketak eta zatiketak batuketen eta kenketen aurretik doaz.', 'Las multiplicaciones y divisiones van antes que las sumas y restas.', 'الضرب والقسمة قبل الجمع والطرح.', 'Multiplications and divisions come before additions and subtractions.'),
    'product-sign': say('Zeinu bereko bi zenbakiren biderkadura positiboa da.', 'El producto de dos números del mismo signo es positivo.', 'حاصل ضرب عددين بالإشارة نفسها موجب.', 'The product of two numbers with the same sign is positive.'),
    'mixed-as-pure': say('Mistoan: zifra guztiak ken periodoaren aurrekoak, 9 bat periodoko zifra bakoitzeko eta 0 bat aurreperiodoko bakoitzeko.', 'En el mixto: todas las cifras menos las de antes del periodo, un 9 por cifra del periodo y un 0 por cifra del anteperiodo.', 'في المختلط: كل الأرقام ناقص ما قبل الدور، و9 لكل رقم في الدور و0 لكل رقم قبله.', 'For a mixed one: all the digits minus the ones before the period, a 9 per period digit and a 0 per digit before it.'),
    'preperiod-kept': say('Zenbakitzailean, kendu periodoaren aurreko zatia: $1{,}2\\overline{3}\\to 123-12$.', 'En el numerador, resta lo de antes del periodo: $1{,}2\\overline{3}\\to 123-12$.', 'في البسط اطرح ما قبل الدور: $1.2\\overline{3}\\to 123-12$.', 'In the numerator, subtract what comes before the period: $1{,}2\\overline{3}\\to 123-12$.'),
    'remaining-of-whole': say('«Geratzen denaren» zatikia: biderkatu geratzen den zatiaz.', 'Fracción «de lo que queda»: multiplica por la parte que queda.', 'كسر «من الباقي»: اضرب في الجزء الباقي.', 'A fraction “of what is left”: multiply by the part that is left.'),
    'whole-times': say('Zatia ezaguna bada, osoa = zatia zati zatikia.', 'Si se conoce la parte, el total es la parte entre la fracción.', 'إذا عُرف الجزء فالكل هو الجزء مقسومًا على الكسر.', 'If the part is known, the whole is the part divided by the fraction.')
}

type Built = Omit<DetectiveCase, 'options'>
type Builder = (random: Random) => Built | null

const f = (numerator: number, denominator: number) => `\\frac{${numerator}}{${denominator}}`
const neg = (numerator: number, denominator: number) => `-\\frac{${numerator}}{${denominator}}`
const lcm = (a: number, b: number) => (a * b) / gcd(a, b)
/** A proper fraction a/b in lowest terms */
const proper = (random: Random, denominators: number[]) => {
    for (;;) {
        const denominator = pick(random, denominators)
        const numerator = randomInt(random, 1, denominator - 1)
        if (gcd(numerator, denominator) === 1) return { numerator, denominator }
    }
}
const calculate = (latex: string) => say(`Kalkulatu $${latex}$.`, `Calcula $${latex}$.`, `احسب $${latex}$.`, `Work out $${latex}$.`)

/* ---------- Level 1: fractions and order ---------- */

function addAcross(random: Random): Built | null {
    const p = proper(random, [2, 3, 4, 5, 6, 7])
    const q = proper(random, [2, 3, 4, 5, 6, 7])
    if (p.denominator === q.denominator) return null
    const sum = add(fraction(p.numerator, p.denominator), fraction(q.numerator, q.denominator))
    const reached = fraction(p.numerator + q.numerator, p.denominator + q.denominator)
    const L = lcm(p.denominator, q.denominator)
    return {
        problem: calculate(`${f(p.numerator, p.denominator)}+${f(q.numerator, q.denominator)}`),
        lines: [line(LABELS.rule, '\\frac{a}{b}+\\frac{c}{d}=\\frac{a+c}{b+d}'), line(LABELS.step, `\\frac{${p.numerator}+${q.numerator}}{${p.denominator}+${q.denominator}}=${f(p.numerator + q.numerator, p.denominator + q.denominator)}`), line(LABELS.result, toLatex(reached))],
        wrong: 0, error: 'add-across', fix: `${f((p.numerator * L) / p.denominator, L)}+${f((q.numerator * L) / q.denominator, L)}=${toLatex(sum)}`, right: toNumber(sum), reached: toNumber(reached)
    }
}

function numeratorsKept(random: Random): Built | null {
    const p = proper(random, [2, 3, 4, 5, 6])
    const q = proper(random, [2, 3, 4, 5, 6])
    const L = lcm(p.denominator, q.denominator)
    if (L === p.denominator || L === q.denominator) return null
    const sum = add(fraction(p.numerator, p.denominator), fraction(q.numerator, q.denominator))
    const reached = fraction(p.numerator + q.numerator, L)
    return {
        problem: calculate(`${f(p.numerator, p.denominator)}+${f(q.numerator, q.denominator)}`),
        lines: [line(LABELS.rule, `${p.denominator}\\cdot ${L / p.denominator}=${L}\\qquad ${q.denominator}\\cdot ${L / q.denominator}=${L}`), line(LABELS.step, `${f(p.numerator, L)}+${f(q.numerator, L)}`), line(LABELS.result, `${f(p.numerator + q.numerator, L)}${toLatex(reached) === f(p.numerator + q.numerator, L) ? '' : `=${toLatex(reached)}`}`)],
        wrong: 1, error: 'numerators-kept', fix: `${f(p.numerator * (L / p.denominator), L)}+${f(q.numerator * (L / q.denominator), L)}=${toLatex(sum)}`, right: toNumber(sum), reached: toNumber(reached)
    }
}

function negativeOrder(random: Random): Built | null {
    const p = proper(random, [3, 4, 5, 6])
    const q = proper(random, [3, 4, 5, 6])
    const L = lcm(p.denominator, q.denominator)
    const P = (p.numerator * L) / p.denominator
    const Q = (q.numerator * L) / q.denominator
    if (P <= Q) return null
    // −p/q has the bigger absolute value, so it is the smaller one
    return {
        problem: say(`Zein da handiagoa: $${neg(p.numerator, p.denominator)}$ ala $${neg(q.numerator, q.denominator)}$?`, `¿Cuál es mayor: $${neg(p.numerator, p.denominator)}$ o $${neg(q.numerator, q.denominator)}$?`, `أيهما أكبر: $${neg(p.numerator, p.denominator)}$ أم $${neg(q.numerator, q.denominator)}$؟`, `Which is bigger: $${neg(p.numerator, p.denominator)}$ or $${neg(q.numerator, q.denominator)}$?`),
        lines: [line(LABELS.rule, `${neg(p.numerator, p.denominator)}=${neg(P, L)}\\qquad ${neg(q.numerator, q.denominator)}=${neg(Q, L)}`), line(LABELS.step, `${neg(P, L)}>${neg(Q, L)}`), line(LABELS.result, `${neg(p.numerator, p.denominator)}>${neg(q.numerator, q.denominator)}`)],
        wrong: 1, error: 'negative-order', fix: `${neg(P, L)}<${neg(Q, L)}\\ \\to\\ ${neg(q.numerator, q.denominator)}`, right: -q.numerator / q.denominator, reached: -p.numerator / p.denominator
    }
}

function doubleMinus(random: Random): Built | null {
    const p = proper(random, [2, 3, 4, 5, 6])
    const q = proper(random, [2, 3, 4, 5, 6])
    if (p.denominator === q.denominator) return null
    const L = lcm(p.denominator, q.denominator)
    const P = (p.numerator * L) / p.denominator
    const Q = (q.numerator * L) / q.denominator
    const right = add(fraction(-p.numerator, p.denominator), fraction(q.numerator, q.denominator))
    const reached = fraction(-P - Q, L)
    return {
        problem: calculate(`${neg(p.numerator, p.denominator)}-\\left(${neg(q.numerator, q.denominator)}\\right)`),
        lines: [line(LABELS.step, `${neg(p.numerator, p.denominator)}-${f(q.numerator, q.denominator)}`), line(LABELS.step, `${neg(P, L)}-${f(Q, L)}`), line(LABELS.result, toLatex(reached))],
        wrong: 0, error: 'double-minus', fix: `${neg(p.numerator, p.denominator)}+${f(q.numerator, q.denominator)}=${toLatex(right)}`, right: toNumber(right), reached: toNumber(reached)
    }
}

/* ---------- Level 2: operations ---------- */

function divideStraight(random: Random): Built | null {
    const p = proper(random, [2, 3, 4, 5, 7])
    const q = proper(random, [3, 4, 5, 7, 8])
    const right = fraction(p.numerator * q.denominator, p.denominator * q.numerator)
    const reached = fraction(p.numerator * q.numerator, p.denominator * q.denominator)
    if (toNumber(right) === toNumber(reached)) return null
    return {
        problem: calculate(`${f(p.numerator, p.denominator)}\\div ${f(q.numerator, q.denominator)}`),
        lines: [line(LABELS.rule, '\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a\\cdot c}{b\\cdot d}'), line(LABELS.step, `\\frac{${p.numerator}\\cdot ${q.numerator}}{${p.denominator}\\cdot ${q.denominator}}=${f(p.numerator * q.numerator, p.denominator * q.denominator)}`), line(LABELS.result, toLatex(reached))],
        wrong: 0, error: 'divide-straight', fix: `\\frac{${p.numerator}\\cdot ${q.denominator}}{${p.denominator}\\cdot ${q.numerator}}=${toLatex(right)}`, right: toNumber(right), reached: toNumber(reached)
    }
}

function multiplyCross(random: Random): Built | null {
    const p = proper(random, [2, 3, 4, 5, 7])
    const q = proper(random, [3, 4, 5, 7, 8])
    const right = fraction(p.numerator * q.numerator, p.denominator * q.denominator)
    const reached = fraction(p.numerator * q.denominator, p.denominator * q.numerator)
    if (toNumber(right) === toNumber(reached)) return null
    return {
        problem: calculate(`${f(p.numerator, p.denominator)}\\cdot ${f(q.numerator, q.denominator)}`),
        lines: [line(LABELS.step, `${f(p.numerator, p.denominator)}\\cdot ${f(q.numerator, q.denominator)}`), line(LABELS.step, `\\frac{${p.numerator}\\cdot ${q.denominator}}{${p.denominator}\\cdot ${q.numerator}}=${f(p.numerator * q.denominator, p.denominator * q.numerator)}`), line(LABELS.result, toLatex(reached))],
        wrong: 1, error: 'multiply-cross', fix: `\\frac{${p.numerator}\\cdot ${q.numerator}}{${p.denominator}\\cdot ${q.denominator}}=${toLatex(right)}`, right: toNumber(right), reached: toNumber(reached)
    }
}

function hierarchy(random: Random): Built | null {
    const a = proper(random, [2, 3, 4, 5])
    const b = proper(random, [2, 3, 4, 5])
    const c = proper(random, [2, 3, 5, 7])
    const A = fraction(a.numerator, a.denominator)
    const B = fraction(b.numerator, b.denominator)
    const C = fraction(c.numerator, c.denominator)
    const right = add(A, multiply(B, C))
    const sum = add(A, B)
    const reached = multiply(sum, C)
    return {
        problem: calculate(`${f(a.numerator, a.denominator)}+${f(b.numerator, b.denominator)}\\cdot ${f(c.numerator, c.denominator)}`),
        lines: [line(LABELS.step, `${f(a.numerator, a.denominator)}+${f(b.numerator, b.denominator)}=${toLatex(sum)}`), line(LABELS.step, `${toLatex(sum)}\\cdot ${f(c.numerator, c.denominator)}`), line(LABELS.result, toLatex(reached))],
        wrong: 0, error: 'hierarchy', fix: `${f(a.numerator, a.denominator)}+${toLatex(multiply(B, C))}=${toLatex(right)}`, right: toNumber(right), reached: toNumber(reached)
    }
}

function productSign(random: Random): Built {
    const p = proper(random, [2, 3, 4, 5, 7])
    const q = proper(random, [3, 4, 5, 7, 9])
    const right = fraction(p.numerator * q.numerator, p.denominator * q.denominator)
    return {
        problem: calculate(`\\left(${neg(p.numerator, p.denominator)}\\right)\\cdot\\left(${neg(q.numerator, q.denominator)}\\right)`),
        lines: [line(LABELS.step, `${f(p.numerator, p.denominator)}\\cdot ${f(q.numerator, q.denominator)}=${toLatex(right)}`), line(LABELS.rule, '(-)\\cdot(-)=(-)'), line(LABELS.result, toLatex(fraction(-right.numerator, right.denominator)))],
        wrong: 1, error: 'product-sign', fix: `(-)\\cdot(-)=(+)\\ \\to\\ ${toLatex(right)}`, right: toNumber(right), reached: -toNumber(right)
    }
}

/* ---------- Level 3: decimals and problems ---------- */

/** A mixed recurring decimal 0,aṗ with one digit before the period and one in it */
function mixedDigits(random: Random) {
    const before = randomInt(random, 1, 8)
    const period = randomInt(random, 1, 9)
    return period === before ? null : { before, period, latex: `0{,}${before}\\overline{${period}}`, value: fraction(10 * before + period - before, 90) }
}

function mixedAsPure(random: Random): Built | null {
    const decimal = mixedDigits(random)
    if (!decimal) return null
    const all = 10 * decimal.before + decimal.period
    const reached = fraction(all, 99)
    return {
        problem: say(`Aurkitu $${decimal.latex}$ zenbakiaren zatiki sortzailea.`, `Halla la fracción generatriz de $${decimal.latex}$.`, `جد الكسر المولّد للعدد $${decimal.latex}$.`, `Find the generating fraction of $${decimal.latex}$.`),
        lines: [line(LABELS.rule, `x=${decimal.latex}`), line(LABELS.step, `x=${f(all, 99)}`), line(LABELS.result, toLatex(reached))],
        wrong: 1, error: 'mixed-as-pure', fix: `\\frac{${all}-${decimal.before}}{90}=${toLatex(decimal.value)}`, right: toNumber(decimal.value), reached: toNumber(reached)
    }
}

function preperiodKept(random: Random): Built | null {
    const whole = randomInt(random, 1, 3)
    const before = randomInt(random, 1, 8)
    const period = randomInt(random, 1, 9)
    if (period === before) return null
    const all = 100 * whole + 10 * before + period
    const head = 10 * whole + before
    const right = fraction(all - head, 90)
    const reached = fraction(all, 90)
    const latex = `${whole}{,}${before}\\overline{${period}}`
    return {
        problem: say(`Aurkitu $${latex}$ zenbakiaren zatiki sortzailea.`, `Halla la fracción generatriz de $${latex}$.`, `جد الكسر المولّد للعدد $${latex}$.`, `Find the generating fraction of $${latex}$.`),
        lines: [line(LABELS.rule, `x=${latex}`), line(LABELS.step, `x=${f(all, 90)}`), line(LABELS.result, toLatex(reached))],
        wrong: 1, error: 'preperiod-kept', fix: `\\frac{${all}-${head}}{90}=${toLatex(right)}`, right: toNumber(right), reached: toNumber(reached)
    }
}

function remainingOfWhole(random: Random): Built | null {
    const p = proper(random, [3, 4, 5, 6])
    const q = proper(random, [2, 3, 4, 5])
    const P = fraction(p.numerator, p.denominator)
    const Q = fraction(q.numerator, q.denominator)
    const left = subtract(fraction(1), P)
    const right = multiply(left, subtract(fraction(1), Q))
    const reached = subtract(left, Q)
    if (toNumber(reached) <= 0) return null
    return {
        problem: say(
            `Soldataren $${f(p.numerator, p.denominator)}$ gastatu du, eta gero geratzen denaren $${f(q.numerator, q.denominator)}$. Zer zati geratzen zaio?`,
            `Gasta $${f(p.numerator, p.denominator)}$ de su paga y luego $${f(q.numerator, q.denominator)}$ de lo que le queda. ¿Qué fracción le queda?`,
            `أنفق $${f(p.numerator, p.denominator)}$ من مصروفه ثم $${f(q.numerator, q.denominator)}$ من الباقي. ما الكسر الذي يبقى له؟`,
            `They spend $${f(p.numerator, p.denominator)}$ of their pocket money and then $${f(q.numerator, q.denominator)}$ of what is left. What fraction is left?`
        ),
        lines: [line(LABELS.step, `1-${f(p.numerator, p.denominator)}=${toLatex(left)}`), line(LABELS.step, `${toLatex(left)}-${f(q.numerator, q.denominator)}`), line(LABELS.result, toLatex(reached))],
        wrong: 1, error: 'remaining-of-whole', fix: `${toLatex(left)}\\cdot ${toLatex(subtract(fraction(1), Q))}=${toLatex(right)}`, right: toNumber(right), reached: toNumber(reached)
    }
}

function wholeTimes(random: Random): Built {
    const p = proper(random, [3, 4, 5, 8])
    const part = p.numerator * randomInt(random, 2, 9)
    const right = fraction(part * p.denominator, p.numerator)
    const reached = fraction(part * p.numerator, p.denominator)
    return {
        problem: say(
            `Depositu baten $${f(p.numerator, p.denominator)}$ betetzeko $${part}$ litro behar dira. Zenbat litro sartzen dira osoan?`,
            `Para llenar $${f(p.numerator, p.denominator)}$ de un depósito hacen falta $${part}$ litros. ¿Cuántos litros caben en total?`,
            `لملء $${f(p.numerator, p.denominator)}$ خزان يلزم $${part}$ لترًا. كم لترًا يتسع الخزان كله؟`,
            `Filling $${f(p.numerator, p.denominator)}$ of a tank takes $${part}$ litres. How many litres does the whole tank hold?`
        ),
        lines: [line(LABELS.rule, `T=${part}\\cdot ${f(p.numerator, p.denominator)}`), line(LABELS.step, `T=${f(part * p.numerator, p.denominator)}`), line(LABELS.result, `T=${toLatex(reached)}`)],
        wrong: 0, error: 'whole-times', fix: `T=${part}\\div ${f(p.numerator, p.denominator)}=${toLatex(right)}`, right: toNumber(right), reached: toNumber(reached)
    }
}

const builders: Record<DetectiveError, Builder> = {
    'add-across': addAcross,
    'numerators-kept': numeratorsKept,
    'negative-order': negativeOrder,
    'double-minus': doubleMinus,
    'divide-straight': divideStraight,
    'multiply-cross': multiplyCross,
    hierarchy,
    'product-sign': productSign,
    'mixed-as-pure': mixedAsPure,
    'preperiod-kept': preperiodKept,
    'remaining-of-whole': remainingOfWhole,
    'whole-times': wholeTimes
}

export function createDetectiveCase(random: Random, levelIndex: number, error: DetectiveError): DetectiveCase {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    for (let attempt = 0; attempt < 500; attempt += 1) {
        const made = builders[error](random)
        if (!made || Math.abs(made.right - made.reached) < 1e-12) continue
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
