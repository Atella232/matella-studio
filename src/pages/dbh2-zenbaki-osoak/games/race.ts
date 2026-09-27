import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Carrera de enteros: question generators for the five circuits. Every wrong
   option comes from a typical sign mistake, so a wrong answer can say what
   probably went wrong.
   ========================================================================== */

export const INTEGER_RACE_CIRCUITS = 5

export type IntegerRaceError =
    | 'sign'
    | 'abs-sign'
    | 'no-opposite'
    | 'bigger-abs'
    | 'compare'
    | 'outside'
    | 'subtract-sign'
    | 'added-abs'
    | 'sign-rule'
    | 'added'
    | 'priority'
    | 'brackets'
    | 'calculation'

export type IntegerRaceQuestion = RaceQuestion<IntegerRaceError>

/* ---------- Writing helpers ---------- */

/** An integer as the textbook writes a result: −7, 0, +7 */
export const signedLatex = (value: number): string => (value < 0 ? `-${-value}` : value > 0 ? `+${value}` : '0')
/** An operand in brackets: (−7), (+7) */
const b = (value: number): string => `(${signedLatex(value)})`
const math = (latex: string) => `$${latex}$`
const text = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const formula = (latex: string): LocalizedText => ({ eu: math(latex), es: math(latex), ar: math(latex) })

function around(before: LocalizedText, latex: string): LocalizedText {
    return { eu: `${before.eu}${math(latex)}`, es: `${before.es}${math(latex)}`, ar: `${before.ar}${math(latex)}` }
}

/** A non-zero integer whose size is between min and max */
function nonZero(random: Random, min: number, max: number): number {
    const size = randomInt(random, min, max)
    return random() < 0.5 ? -size : size
}

/* ---------- Options ---------- */

interface Candidate {
    value: number
    error: IntegerRaceError
}

/**
 * Builds four options: the right value and three wrong ones taken from the
 * typical mistakes, in order of preference. Values never repeat. Returns null
 * when there are not enough different mistakes, so the generator tries again.
 */
function buildOptions(random: Random, answer: number, mistakes: Candidate[]): RaceOption<IntegerRaceError>[] | null {
    const used = new Set([answer])
    const wrong: Candidate[] = []
    for (const mistake of mistakes) {
        if (wrong.length === 3) break
        if (!Number.isInteger(mistake.value) || used.has(mistake.value)) continue
        used.add(mistake.value)
        wrong.push(mistake)
    }
    if (wrong.length < 3) return null
    return shuffle(random, [
        { latex: signedLatex(answer), correct: true, error: null },
        ...wrong.map((mistake) => ({ latex: signedLatex(mistake.value), correct: false, error: mistake.error }))
    ])
}

/** Near misses when the typical mistakes collide: one more or one less */
const nearMisses = (answer: number): Candidate[] => [
    { value: answer + 1, error: 'calculation' },
    { value: answer - 1, error: 'calculation' },
    { value: answer + 2, error: 'calculation' }
]

function question(
    circuit: number,
    kind: string,
    prompt: LocalizedText,
    options: RaceOption<IntegerRaceError>[],
    answer: number,
    solution: LocalizedText,
    writable = true
): IntegerRaceQuestion {
    return { circuit, kind, prompt, options, answer: fraction(answer === 0 ? 0 : answer), answerForm: 'any', percentAnswer: false, writable, solution }
}

const calculate = text('Kalkulatu: ', 'Calcula: ', 'احسب: ')

/* ---------- Circuit 0: absolute value and opposite ---------- */

function absoluteQuestion(random: Random, tier: Tier): IntegerRaceQuestion | null {
    const limit = [9, 15, 25][tier]
    const first = nonZero(random, 2, limit)
    const second = nonZero(random, 2, limit)
    const subtract = tier > 0 && random() < 0.5
    const answer = subtract ? Math.abs(first) - Math.abs(second) : Math.abs(first) + Math.abs(second)
    const op = subtract ? '-' : '+'
    const latex = `\\lvert ${signedLatex(first)}\\rvert ${op}\\lvert ${signedLatex(second)}\\rvert`
    const options = buildOptions(random, answer, [
        { value: subtract ? first - second : first + second, error: 'abs-sign' },
        { value: -answer, error: 'sign' },
        { value: subtract ? Math.abs(first) + Math.abs(second) : Math.abs(Math.abs(first) - Math.abs(second)), error: 'calculation' },
        ...nearMisses(answer)
    ])
    if (!options) return null
    return question(0, 'absolute', around(calculate, latex), options, answer, formula(`${latex}=${Math.abs(first)}${op}${Math.abs(second)}=${signedLatex(answer)}`))
}

function oppositeQuestion(random: Random, tier: Tier): IntegerRaceQuestion | null {
    const limit = [9, 15, 25][tier]
    const first = nonZero(random, 2, limit)
    const second = nonZero(random, 2, limit)
    const answer = -first + Math.abs(second)
    const op = (name: string) => `\\mathrm{${name}}(${signedLatex(first)})+\\lvert ${signedLatex(second)}\\rvert`
    const options = buildOptions(random, answer, [
        { value: first + Math.abs(second), error: 'no-opposite' },
        { value: -first + second, error: 'abs-sign' },
        { value: -answer, error: 'sign' },
        ...nearMisses(answer)
    ])
    if (!options) return null
    const prompt = { eu: `Kalkulatu: ${math(op('Aur'))}`, es: `Calcula: ${math(op('Op'))}`, ar: `احسب معاكس ${math(signedLatex(first))} زائد ${math(`\\lvert ${signedLatex(second)}\\rvert`)}` }
    const worked = `${b(-first)}+${Math.abs(second)}=${signedLatex(answer)}`
    return question(0, 'opposite', prompt, options, answer, formula(worked))
}

/* ---------- Circuit 1: comparing ---------- */

function distinctIntegers(random: Random, count: number, min: number, max: number): number[] {
    const values = new Set<number>()
    while (values.size < count) values.add(randomInt(random, min, max))
    return [...values]
}

function extremeQuestion(random: Random, tier: Tier, largest: boolean): IntegerRaceQuestion | null {
    const limit = [10, 20, 40][tier]
    // Mostly negatives: that is where the typical mistake lives
    const values = distinctIntegers(random, 4, -limit, Math.round(limit / 3))
    if (values.filter((value) => value < 0).length < 2) return null
    const answer = largest ? Math.max(...values) : Math.min(...values)
    const biggestAbs = values.reduce((best, value) => (Math.abs(value) > Math.abs(best) ? value : best))
    const smallestAbs = values.reduce((best, value) => (Math.abs(value) < Math.abs(best) ? value : best))
    const tempting = largest ? biggestAbs : smallestAbs
    if (tempting === answer) return null
    const options = shuffle(random, values).map((value) => ({
        latex: signedLatex(value),
        correct: value === answer,
        error: value === answer ? null : value === tempting ? 'bigger-abs' as const : 'compare' as const
    }))
    const prompt = largest
        ? text('Zein da handiena?', '¿Cuál es el mayor?', 'أي عدد هو الأكبر؟')
        : text('Zein da txikiena?', '¿Cuál es el menor?', 'أي عدد هو الأصغر؟')
    const sorted = [...values].sort((left, right) => left - right).map(signedLatex).join('<')
    return question(1, largest ? 'largest' : 'smallest', prompt, options, answer, formula(sorted))
}

function betweenQuestion(random: Random, tier: Tier): IntegerRaceQuestion | null {
    const limit = [10, 20, 40][tier]
    const low = randomInt(random, -limit, limit - 4)
    const high = low + randomInt(random, 3, 6)
    const answer = randomInt(random, low + 1, high - 1)
    // Wrong options: the mirror of the interval (sign mistake) and values just outside it
    const options = buildOptions(random, answer, [
        { value: -answer, error: 'sign' },
        { value: low - randomInt(random, 1, 3), error: 'outside' },
        { value: high + randomInt(random, 1, 3), error: 'outside' },
        { value: low, error: 'outside' },
        { value: high, error: 'outside' }
    ].filter((mistake) => mistake.value <= low || mistake.value >= high) as Candidate[])
    if (!options) return null
    return question(1, 'between', around(text('Zein dago tarte honetan? ', '¿Cuál está entre los dos? ', 'أي عدد يقع بينهما؟ '), `${signedLatex(low)}<\\;?\\;<${signedLatex(high)}`), options, answer, formula(`${signedLatex(low)}<${signedLatex(answer)}<${signedLatex(high)}`), false)
}

/* ---------- Circuit 2: sums and subtractions ---------- */

function addSubQuestion(random: Random, tier: Tier): IntegerRaceQuestion | null {
    const limit = [9, 15, 30][tier]
    const first = nonZero(random, 1, limit)
    const second = nonZero(random, 1, limit)
    const subtract = random() < 0.55
    // Two positives added is arithmetic, not integers
    if (!subtract && first > 0 && second > 0) return null
    const answer = subtract ? first - second : first + second
    const latex = `${b(first)}${subtract ? '-' : '+'}${b(second)}`
    const mistakes: Candidate[] = subtract
        ? [
            { value: first + second, error: 'subtract-sign' },
            { value: -answer, error: 'sign' },
            { value: Math.abs(first) + Math.abs(second) * Math.sign(answer || 1), error: 'added-abs' }
        ]
        : [
            { value: Math.sign(first + second || 1) * (Math.abs(first) + Math.abs(second)), error: 'added-abs' },
            { value: -answer, error: 'sign' },
            { value: first - second, error: 'subtract-sign' }
        ]
    const options = buildOptions(random, answer, [...mistakes, ...nearMisses(answer)])
    if (!options) return null
    const worked = subtract ? `${latex}=${b(first)}+${b(-second)}=${signedLatex(answer)}` : `${latex}=${signedLatex(answer)}`
    return question(2, subtract ? 'subtract' : 'add', around(calculate, latex), options, answer, formula(worked))
}

function chainQuestion(random: Random, tier: Tier): IntegerRaceQuestion | null {
    const count = tier === 2 ? 5 : 4
    const limit = [9, 12, 20][tier]
    const terms = Array.from({ length: count }, () => nonZero(random, 1, limit))
    const answer = terms.reduce((sum, term) => sum + term, 0)
    const latex = terms.map((term, index) => (index === 0 ? String(term) : term < 0 ? `-${-term}` : `+${term}`)).join('')
    const positives = terms.filter((term) => term > 0).reduce((sum, term) => sum + term, 0)
    const negatives = -terms.filter((term) => term < 0).reduce((sum, term) => sum + term, 0)
    const options = buildOptions(random, answer, [
        { value: -answer, error: 'sign' },
        { value: positives + negatives, error: 'added-abs' },
        { value: answer - 2 * terms[count - 1], error: 'subtract-sign' },
        ...nearMisses(answer)
    ])
    if (!options) return null
    return question(2, 'chain', around(calculate, latex), options, answer, formula(`${positives}-${negatives}=${signedLatex(answer)}`))
}

function bracketsQuestion(random: Random, tier: Tier): IntegerRaceQuestion | null {
    const limit = [8, 12, 15][tier]
    const first = nonZero(random, 1, limit)
    const inner = [nonZero(random, 1, limit), nonZero(random, 1, limit)]
    const innerValue = inner[0] + inner[1]
    const answer = first - innerValue
    const innerLatex = `${inner[0]}${inner[1] < 0 ? `-${-inner[1]}` : `+${inner[1]}`}`
    const latex = `${first}-(${innerLatex})`
    const options = buildOptions(random, answer, [
        // Only the first term inside the bracket changed sign
        { value: first - inner[0] + inner[1], error: 'brackets' },
        { value: first + innerValue, error: 'subtract-sign' },
        { value: -answer, error: 'sign' },
        ...nearMisses(answer)
    ])
    if (!options) return null
    return question(2, 'brackets', around(calculate, latex), options, answer, formula(`${first}-${b(innerValue)}=${signedLatex(answer)}`))
}

/* ---------- Circuit 3: products and quotients ---------- */

function productQuestion(random: Random, tier: Tier): IntegerRaceQuestion | null {
    const limit = [6, 9, 12][tier]
    const first = nonZero(random, 2, limit)
    const second = nonZero(random, 2, limit)
    const divide = random() < 0.45
    if (first > 0 && second > 0) return null
    const dividend = first * second
    const answer = divide ? first : first * second
    const latex = divide ? `${b(dividend)}\\mathbin{:}${b(second)}` : `${b(first)}\\cdot${b(second)}`
    const options = buildOptions(random, answer, [
        { value: -answer, error: 'sign-rule' },
        { value: divide ? dividend + second : first + second, error: 'added' },
        { value: divide ? -(dividend - second) : -(first + second), error: 'added' },
        ...nearMisses(answer)
    ])
    if (!options) return null
    const sameSign = (divide ? dividend : first) * second > 0
    const rule = sameSign ? text('Zeinu bera → +. ', 'Mismo signo → +. ', 'الإشارة نفسها ← +. ') : text('Zeinu desberdinak → −. ', 'Signos distintos → −. ', 'إشارتان مختلفتان ← −. ')
    return question(3, divide ? 'divide' : 'multiply', around(calculate, latex), options, answer, around(rule, `${latex}=${signedLatex(answer)}`))
}

function threeFactorsQuestion(random: Random, tier: Tier): IntegerRaceQuestion | null {
    const limit = tier === 0 ? 4 : 5
    const factors = [nonZero(random, 1, limit), nonZero(random, 2, limit), nonZero(random, 2, limit)]
    const answer = factors.reduce((product, factor) => product * factor, 1)
    const latex = factors.map(b).join('\\cdot')
    const negatives = factors.filter((factor) => factor < 0).length
    const options = buildOptions(random, answer, [
        { value: -answer, error: 'sign-rule' },
        { value: factors.reduce((sum, factor) => sum + factor, 0), error: 'added' },
        { value: Math.abs(answer) === answer ? -answer - factors[0] : answer + factors[0], error: 'calculation' },
        ...nearMisses(answer)
    ])
    if (!options) return null
    const rule = negatives % 2 === 0
        ? text(`${negatives} faktore negatibo (bikoitia) → +. `, `${negatives} factores negativos (par) → +. `, `${negatives} عوامل سالبة (عدد زوجي) ← +. `)
        : text(`${negatives} faktore negatibo (bakoitia) → −. `, `${negatives} factores negativos (impar) → −. `, `${negatives} عوامل سالبة (عدد فردي) ← −. `)
    return question(3, 'three-factors', around(calculate, latex), options, answer, around(rule, `${latex}=${signedLatex(answer)}`))
}

/* ---------- Circuit 4: order of operations ---------- */

function combinedQuestion(random: Random, tier: Tier): IntegerRaceQuestion | null {
    const limit = [6, 8, 10][tier]
    const first = nonZero(random, 1, limit + 4)
    const second = nonZero(random, 2, limit)
    const third = nonZero(random, 2, limit)
    const form = randomInt(random, 0, tier === 0 ? 1 : 3)
    let latex: string
    let answer: number
    let leftToRight: number
    let worked: string
    if (form === 0) {
        // a + b·c
        answer = first + second * third
        leftToRight = (first + second) * third
        latex = `${first}+${b(second)}\\cdot${b(third)}`
        worked = `${first}+${b(second * third)}=${signedLatex(answer)}`
    } else if (form === 1) {
        // a − b·c
        answer = first - second * third
        leftToRight = (first - second) * third
        latex = `${first}-${b(second)}\\cdot${b(third)}`
        worked = `${first}-${b(second * third)}=${signedLatex(answer)}`
    } else if (form === 2) {
        // (a + b)·c
        answer = (first + second) * third
        leftToRight = first + second * third
        latex = `(${first}${second < 0 ? `-${-second}` : `+${second}`})\\cdot${b(third)}`
        worked = `${b(first + second)}\\cdot${b(third)}=${signedLatex(answer)}`
    } else {
        // a − b : c, with an exact quotient
        const dividend = second * third
        answer = first - second
        leftToRight = (first - dividend) / third
        latex = `${first}-${b(dividend)}\\mathbin{:}${b(third)}`
        worked = `${first}-${b(second)}=${signedLatex(answer)}`
    }
    const mistakes: Candidate[] = [
        { value: leftToRight, error: form === 2 ? 'brackets' : 'priority' },
        { value: form === 1 ? first + second * third : form === 3 ? first + second : -answer, error: 'sign-rule' },
        { value: -answer, error: 'sign' },
        ...nearMisses(answer)
    ]
    const options = buildOptions(random, answer, mistakes)
    if (!options) return null
    return question(4, `combined-${form}`, around(calculate, latex), options, answer, formula(worked))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => IntegerRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [absoluteQuestion, oppositeQuestion],
    [(random, tier) => extremeQuestion(random, tier, true), (random, tier) => extremeQuestion(random, tier, false), betweenQuestion],
    [addSubQuestion, addSubQuestion, chainQuestion, bracketsQuestion],
    [productQuestion, productQuestion, threeFactorsQuestion],
    [combinedQuestion]
]

export function generateIntegerRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): IntegerRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 200; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkIntegerPitAnswer(question: IntegerRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function integerParTime(circuit: number): number {
    return parTimeFor([8, 7, 10, 9, 14][circuit] ?? 10)
}

export const integerRaceErrorTips: Record<IntegerRaceError, LocalizedText> = {
    sign: text('Kalkulua ondo dago, baina zeinua ez. Begiratu zein zenbakik duen balio absolutu handiena.', 'El cálculo está bien, pero el signo no. Mira qué número tiene mayor valor absoluto.', 'الحساب صحيح لكن الإشارة خاطئة. انظر أي عدد له القيمة المطلقة الأكبر.'),
    'abs-sign': text('Balio absolutua distantzia da: kendu zeinua barren barrukoari kalkulatu aurretik.', 'El valor absoluto es una distancia: quita el signo de dentro de las barras antes de calcular.', 'القيمة المطلقة مسافة: احذف الإشارة داخل الخطين قبل الحساب.'),
    'no-opposite': text('Aurkakoa hartzean zeinua aldatzen da: Aur(−5) = +5.', 'Al tomar el opuesto se cambia el signo: Op(−5) = +5.', 'عند أخذ المعاكس تتغير الإشارة: معاكس ⁦−5⁩ هو ⁦+5⁩.'),
    'bigger-abs': text('Negatiboetan, balio absolutu handiena duena da txikiena: −9 < −2.', 'Entre negativos, el de mayor valor absoluto es el menor: −9 < −2.', 'بين السالبة، صاحب القيمة المطلقة الأكبر هو الأصغر: ⁦−9 < −2⁩.'),
    compare: text('Irudikatu zenbakiak zuzenean: eskuinean dagoena da handiena.', 'Imagina los números en la recta: el que está más a la derecha es el mayor.', 'تخيّل الأعداد على الخط: الواقع إلى اليمين هو الأكبر.'),
    outside: text('Zenbaki hori tartetik kanpo dago (edo muturrean). Bilatu bi zenbakien artean.', 'Ese número está fuera del intervalo (o en un extremo). Busca entre los dos números.', 'هذا العدد خارج المجال (أو على طرفه). ابحث بين العددين.'),
    'subtract-sign': text('Kentzea aurkakoa batzea da: bigarren zenbakiaren zeinua aldatu behar da.', 'Restar es sumar el opuesto: hay que cambiar el signo del segundo número.', 'الطرح هو جمع المعاكس: يجب تغيير إشارة العدد الثاني.'),
    'added-abs': text('Zeinu desberdinak: ez batu balio absolutuak, kendu egin behar dira.', 'Con signos distintos no se suman los valores absolutos: se restan.', 'مع إشارتين مختلفتين لا نجمع القيمتين المطلقتين بل نطرحهما.'),
    'sign-rule': text('Berrikusi zeinuen araua: zeinu bera → +, zeinu desberdinak → −.', 'Repasa la regla de los signos: mismo signo → +, signos distintos → −.', 'راجع قاعدة الإشارات: الإشارة نفسها ← +، إشارتان مختلفتان ← −.'),
    added: text('Hemen biderkatu edo zatitu egin behar da, ez batu.', 'Aquí hay que multiplicar o dividir, no sumar.', 'هنا يجب الضرب أو القسمة، لا الجمع.'),
    priority: text('Biderketak eta zatiketak batuketak eta kenketak baino lehen egiten dira.', 'Los productos y cocientes se hacen antes que las sumas y restas.', 'يُجرى الضرب والقسمة قبل الجمع والطرح.'),
    brackets: text('Parentesiaren aurrean − dagoenean, barruko zeinu guztiak aldatzen dira (edo egin lehenik barrukoa).', 'Con un − delante del paréntesis cambian todos los signos de dentro (o haz primero lo de dentro).', 'عندما تسبق − القوس تتغير كل الإشارات داخله (أو احسب ما بداخله أولًا).'),
    calculation: text('Zeinua ondo dago, baina kalkuluan akats txiki bat dago. Egin berriro poliki.', 'El signo está bien, pero hay un pequeño error de cálculo. Hazlo otra vez despacio.', 'الإشارة صحيحة لكن في الحساب خطأ صغير. أعده ببطء.')
}
