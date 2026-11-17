import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { bachRealsRaceErrorTips, generateBachRealsRaceQuestion, written, type BachRealsRaceError } from '../../batx1-zientziak-errealak/games/race.ts'

/* ==========================================================================
   Errealen lasterketa (Batxilergoa 1 · Gizarte Zientziak): five circuits,
   one per stage — numbers and sets (the elements of {x ∈ ℤ | a < x ≤ b},
   how many rational numbers), the real line (the questions of the
   1.º Ciencias race), roots (a root as a power, a product of roots, a
   factor out, rationalising), logarithms (a value, a whole-number part,
   the digits of 2ⁿ) and errors (the 1.º Ciencias questions on figures,
   bounds and relative error, and the exponent of scientific notation).
   The wrong options are the typical mistakes. Every question carries
   `meta`, the numbers the tests check it against.
   ========================================================================== */

export const GIZ_REALS_RACE_CIRCUITS = 5

export type GizRealsRaceError =
    | BachRealsRaceError
    | 'endpoint'
    | 'square-root'
    | 'recurring'
    | 'index'
    | 'exponents-multiplied'
    | 'whole-part'
    | 'digits'
    | 'comma'

export type GizRealsRaceQuestion = RaceQuestion<GizRealsRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`

interface Candidate {
    value: FractionValue
    error: GizRealsRaceError
}
const whole = (value: number, error: GizRealsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (numerator: number, denominator: number, error: GizRealsRaceError): Candidate => ({ value: fraction(numerator, denominator), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<GizRealsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: GizRealsRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right.numerator / right.denominator)]) {
        if (wrong.length === 3) break
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<GizRealsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): GizRealsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const calc = (formula: string) => say(`Kalkulatu ${math(formula)}.`, `Calcula ${math(formula)}.`, `احسب ${math(formula)}.`, `Work out ${math(formula)}.`)
const howMuch = (formula: string, letter: string) => say(`${math(formula)}. Zenbat da ${math(letter)}?`, `${math(formula)}. ¿Cuánto vale ${math(letter)}?`, `${math(formula)}. كم تساوي ${math(letter)}؟`, `${math(formula)}. What is the value of ${math(letter)}?`)
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))

/* ---------- Circuit 0: numbers and sets ---------- */

function countQuestion(random: Random): GizRealsRaceQuestion | null {
    const a = randomInt(random, -6, 3)
    const b = a + randomInt(random, 3, 8)
    const strictLeft = random() < 0.5
    const set = strictLeft ? `\\{x\\in\\mathbb{Z}\\mid ${a}<x\\le ${b}\\}` : `\\{x\\in\\mathbb{Z}\\mid ${a}\\le x<${b}\\}`
    const count = b - a
    const answer = fraction(count)
    const choices = options(random, answer, [whole(count + 1, 'endpoint'), whole(count - 1, 'endpoint'), whole(b + a, 'calculation')])
    return choices && build(0, 'count', say(`Zenbat elementu ditu ${math(set)} multzoak?`, `¿Cuántos elementos tiene ${math(set)}?`, `كم عنصرًا في ${math(set)}؟`, `How many elements does ${math(set)} have?`), choices, answer, say(`Mutur bat barruan eta bestea kanpoan: $${b}-(${a})=${count}$.`, `Un extremo dentro y el otro fuera: $${b}-(${a})=${count}$.`, `طرف داخل والآخر خارج: $${b}-(${a})=${count}$.`, `One endpoint in and the other out: $${b}-(${a})=${count}$.`), { a, b, count })
}

function rationalQuestion(random: Random): GizRealsRaceQuestion | null {
    // Each number: its LaTeX, whether it is rational, and whether it looks like a root or a recurring decimal
    const square = randomInt(random, 2, 9)
    const pool = shuffle(random, [
        { latex: `\\sqrt{${square * square}}`, rational: true, root: true, recurring: false },
        { latex: `\\sqrt{${pick(random, [2, 3, 5, 6, 7, 10, 11])}}`, rational: false, root: true, recurring: false },
        { latex: `\\frac{${randomInt(random, 1, 8)}}{${pick(random, [3, 7, 9, 11])}}`, rational: true, root: false, recurring: false },
        { latex: `0{,}\\overline{${randomInt(random, 1, 9)}}`, rational: true, root: false, recurring: true },
        { latex: '\\pi', rational: false, root: false, recurring: false },
        { latex: `-${randomInt(random, 2, 9)}`, rational: true, root: false, recurring: false }
    ]).slice(0, 4)
    const count = pool.filter((item) => item.rational).length
    const rootsAsIrrational = pool.filter((item) => item.rational && !item.root).length
    const recurringAsIrrational = pool.filter((item) => item.rational && !item.recurring).length
    const answer = fraction(count)
    const choices = options(random, answer, [whole(rootsAsIrrational, 'square-root'), whole(recurringAsIrrational, 'recurring'), whole(4 - count, 'calculation')])
    const list = pool.map((item) => item.latex).join(',\\ ')
    return choices && build(0, 'rational', say(`Zenbat dira arrazionalak? ${math(list)}`, `¿Cuántos son racionales? ${math(list)}`, `كم منها نسبي؟ ${math(list)}`, `How many are rational? ${math(list)}`), choices, answer, say(`Erro zehatzak, zatikiak, periodikoak eta osoak arrazionalak dira: ${count}.`, `Las raíces exactas, fracciones, periódicos y enteros son racionales: ${count}.`, `الجذور التامة والكسور والدورية والصحيحة نسبية: ${count}.`, `Exact roots, fractions, recurring decimals and integers are rational: ${count}.`), { count })
}

/* ---------- Circuit 2: roots ---------- */

function rootPowerQuestion(random: Random): GizRealsRaceQuestion | null {
    const n = randomInt(random, 2, 6)
    const m = randomInt(random, 1, 7)
    if (m === n || m % n === 0) return null
    const g = gcd(m, n)
    const answer = fraction(m, n)
    const choices = options(random, answer, [ratio(n, m, 'index'), whole(m * n, 'calculation'), whole(m - n, 'calculation')])
    return choices && build(2, 'root-power', howMuch(`\\sqrt[${n}]{a^{${m}}}=a^{k}`, 'k'), choices, answer, same(`k=\\frac{${m}}{${n}}${g > 1 ? `=\\frac{${m / g}}{${n / g}}` : ''}`), { m, n })
}

function rootProductQuestion(random: Random): GizRealsRaceQuestion | null {
    const p = randomInt(random, 2, 4)
    const q = randomInt(random, p + 1, 6)
    const answer = fraction(p + q, p * q)
    const choices = options(random, answer, [ratio(1, p * q, 'exponents-multiplied'), ratio(2, p + q, 'calculation'), ratio(1, p + q, 'calculation')])
    return choices && build(2, 'root-product', howMuch(`\\sqrt[${p}]{a}\\cdot\\sqrt[${q}]{a}=a^{k}`, 'k'), choices, answer, same(`\\frac{1}{${p}}+\\frac{1}{${q}}=\\frac{${p + q}}{${p * q}}`), { p, q })
}

function extractQuestion(random: Random): GizRealsRaceQuestion | null {
    const k = randomInt(random, 2, 7)
    const m = pick(random, [2, 3, 5, 6, 7])
    const answer = fraction(k)
    const choices = options(random, answer, [whole(k * k, 'outside'), whole(k * m, 'calculation'), whole(k + m, 'calculation')])
    return choices && build(2, 'extract', howMuch(`\\sqrt{${k * k * m}}=a\\sqrt{${m}}`, 'a'), choices, answer, same(`\\sqrt{${k * k}\\cdot ${m}}=${k}\\sqrt{${m}}`), { k, m })
}

function rationalizeQuestion(random: Random): GizRealsRaceQuestion | null {
    const b = pick(random, [2, 3, 5, 6, 7])
    const a = randomInt(random, 1, 5)
    const c = a * b
    const answer = fraction(a)
    const choices = options(random, answer, [whole(c, 'denominator'), whole(c * b, 'denominator'), whole(a + b, 'calculation')])
    return choices && build(2, 'rationalize', howMuch(`\\frac{${c}}{\\sqrt{${b}}}=a\\sqrt{${b}}`, 'a'), choices, answer, same(`\\frac{${c}\\sqrt{${b}}}{${b}}=${a}\\sqrt{${b}}`), { a, b })
}

/* ---------- Circuit 3: logarithms ---------- */

function logValueQuestion(random: Random): GizRealsRaceQuestion | null {
    const base = pick(random, [2, 3, 5, 10])
    const x = randomInt(random, -3, base === 2 ? 6 : 4)
    if (x === 0 || x === 1) return null
    const value = x > 0 ? String(base ** x) : `\\frac{1}{${base ** -x}}`
    const answer = fraction(x)
    const choices = options(random, answer, [whole(-x, 'log-value'), whole(x > 0 ? base ** x / base : base * -x, 'log-value'), whole(x + 1, 'calculation')])
    return choices && build(3, 'log-value', calc(`\\log_{${base}} ${value}`), choices, answer, same(`${base}^{${x}}=${value}`), { base, x })
}

function wholePartQuestion(random: Random): GizRealsRaceQuestion | null {
    const base = pick(random, [2, 3, 5, 10])
    const k = randomInt(random, base === 10 ? 2 : 3, base === 2 ? 9 : base === 10 ? 6 : 5)
    const low = base ** k
    const high = base ** (k + 1)
    const n = randomInt(random, low + 1, high - 1)
    const latex = n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : String(n)
    const answer = fraction(k)
    const choices = options(random, answer, [whole(k + 1, 'whole-part'), whole(k - 1, 'whole-part'), whole(String(n).length, 'digits')])
    return choices && build(3, 'whole-part', say(`Zein da ${math(`\\log_{${base}} ${latex}`)} logaritmoaren zati osoa?`, `¿Cuál es la parte entera de ${math(`\\log_{${base}} ${latex}`)}?`, `ما الجزء الصحيح من ${math(`\\log_{${base}} ${latex}`)}؟`, `What is the whole-number part of ${math(`\\log_{${base}} ${latex}`)}?`), choices, answer, same(`${base}^{${k}}\\le ${latex}<${base}^{${k + 1}}`), { base, n, k })
}

function digitsQuestion(random: Random): GizRealsRaceQuestion | null {
    const n = randomInt(random, 12, 45)
    const log = n * 0.301
    const part = Math.floor(log)
    if (log - part < 0.05 || log - part > 0.95) return null
    const answer = fraction(part + 1)
    const choices = options(random, answer, [whole(part, 'digits'), whole(n, 'calculation'), whole(part + 2, 'calculation')])
    return choices && build(3, 'digits', say(`${math('\\log 2\\approx 0{,}301')}. Zenbat zifra ditu ${math(`2^{${n}}`)} zenbakiak?`, `${math('\\log 2\\approx 0{,}301')}. ¿Cuántas cifras tiene ${math(`2^{${n}}`)}?`, `${math('\\log 2\\approx 0{,}301')}. كم رقمًا في ${math(`2^{${n}}`)}؟`, `${math('\\log 2\\approx 0{,}301')}. How many digits does ${math(`2^{${n}}`)} have?`), choices, answer, same(`${n}\\cdot 0{,}301=${String(Math.round(log * 1000) / 1000).replace('.', '{,}')}\\ \\to\\ ${part}+1=${part + 1}`), { n, digits: part + 1 })
}

/* ---------- Circuit 4: errors and scientific notation ---------- */

function scientificQuestion(random: Random): GizRealsRaceQuestion | null {
    const digits = randomInt(random, 11, 999)
    if (digits % 10 === 0) return null
    const shown = randomInt(random, -6, 9)
    const length = String(digits).length
    const exponent = shown + length - 1
    const answer = fraction(exponent)
    const choices = options(random, answer, [whole(shown - length + 1, 'comma'), whole(shown, 'comma'), whole(exponent + 1, 'calculation')])
    const mantissa = `${String(digits)[0]}{,}${String(digits).slice(1)}`
    return choices && build(4, 'scientific', howMuch(`${digits}\\cdot 10^{${shown}}=${mantissa}\\cdot 10^{n}`, 'n'), choices, answer, say(`Koma ${length - 1} leku ezkerrera: berretzailea ${length - 1} igotzen da.`, `La coma va ${length - 1} lugares a la izquierda: el exponente sube ${length - 1}.`, `تتحرك الفاصلة ${length - 1} منازل إلى اليسار: يزيد الأس ${length - 1}.`, `The point moves ${length - 1} places left: the exponent goes up by ${length - 1}.`), { digits, shown, exponent })
}

type Generator = (random: Random, tier: Tier) => GizRealsRaceQuestion | null

/** A question of the 1.º Ciencias race, in a circuit of this race */
const twin = (twinCircuit: number, circuit: number): Generator => (random, tier) => ({ ...generateBachRealsRaceQuestion(random, twinCircuit, tier), circuit })

const circuitGenerators: Generator[][] = [
    [countQuestion, rationalQuestion],
    [twin(1, 1)],
    [rootPowerQuestion, rootProductQuestion, extractQuestion, rationalizeQuestion],
    [logValueQuestion, wholePartQuestion, digitsQuestion],
    [twin(2, 4), twin(2, 4), scientificQuestion, scientificQuestion]
]

export function generateGizRealsRaceQuestion(random: Random, circuit: number, tier: Tier): GizRealsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkGizRealsPitAnswer(question: RaceQuestion<GizRealsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function gizRealsParTime(circuit: number): number {
    return parTimeFor([12, 11, 12, 12, 12][circuit] ?? 12)
}

export const gizRealsRaceErrorTips: Record<GizRealsRaceError, LocalizedText> = {
    ...bachRealsRaceErrorTips,
    endpoint: say('< ikurrarekin muturra kanpoan dago; ≤ ikurrarekin, barruan.', 'Con < el extremo queda fuera; con ≤, dentro.', 'مع < يكون الطرف خارجًا، ومع ≤ داخلًا.', 'With < the endpoint is out; with ≤, it is in.'),
    'square-root': say('Erro zehatz bat, √49 = 7, arrazionala da.', 'Una raíz exacta, √49 = 7, es racional.', 'الجذر التام، √49 = 7، عدد نسبي.', 'An exact root, √49 = 7, is rational.'),
    recurring: say('Hamartar periodiko bat zatiki bat da: arrazionala.', 'Un decimal periódico es una fracción: racional.', 'العدد العشري الدوري كسر: فهو نسبي.', 'A recurring decimal is a fraction: rational.'),
    index: say('ⁿ√(aᵐ) = a^(m/n): indizea izendatzailean.', 'ⁿ√(aᵐ) = a^(m/n): el índice al denominador.', 'ⁿ√(aᵐ) = a^(m/n): الدليل في المقام.', 'ⁿ√(aᵐ) = a^(m/n): the index in the denominator.'),
    'exponents-multiplied': say('Oinarri bereko berreturak biderkatzean, berretzaileak batu.', 'Al multiplicar potencias de igual base, los exponentes se suman.', 'عند ضرب قوى لها الأساس نفسه تُجمع الأسس.', 'When multiplying powers with the same base, add the exponents.'),
    'whole-part': say('Bilatu N inguratzen duten oinarriaren berreturak.', 'Busca las potencias de la base que rodean a N.', 'ابحث عن قوى الأساس التي تحيط بـ N.', 'Find the powers of the base around N.'),
    digits: say('Zifrak = log N zenbakiaren zati osoa + 1.', 'Cifras = parte entera de log N + 1.', 'عدد الأرقام = الجزء الصحيح من log N + 1.', 'Digits = whole-number part of log N + 1.'),
    comma: say('Koma ezkerrera, berretzailea gora: lekuak beste.', 'Coma a la izquierda, exponente arriba: tantos como lugares.', 'الفاصلة إلى اليسار والأس إلى الأعلى بعدد المنازل.', 'Point to the left, exponent up: as many as the places.')
}
