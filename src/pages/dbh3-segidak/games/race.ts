import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Segiden lasterketa (3. DBH): five circuits, one per stage — sequences
   (a term from the general term, the position of a value, a recursive
   term), arithmetic progressions (a term, the difference from two terms,
   the first term), sums (1 + … + n, Sₙ, sums of evens and odds), geometric
   progressions (a term, the ratio from two terms, the next term) and
   geometric sums (Sₙ, the infinite sum, growth). Wrong options are the
   typical mistakes of the unit. Every question carries `meta`, the numbers
   the tests check it against. All answers are whole numbers.
   ========================================================================== */

export const SEQUENCES_RACE_CIRCUITS = 5

export type SequencesRaceError =
    | 'n-jumps'
    | 'position-value'
    | 'count-terms'
    | 'sign'
    | 'no-half'
    | 'power-first'
    | 'exponent-n'
    | 'no-root'
    | 'gauss-geometric'
    | 'one-plus'
    | 'calculation'

export type SequencesRaceQuestion = RaceQuestion<SequencesRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`

interface Candidate {
    value: number
    error: SequencesRaceError
}
const wrong = (value: number, error: SequencesRaceError): Candidate => ({ value, error })

/** The right option and three different whole-number mistakes */
function options(random: Random, right: number, candidates: Candidate[]): RaceOption<SequencesRaceError>[] | null {
    if (!Number.isInteger(right)) return null
    const used = new Set([right])
    const chosen: Candidate[] = []
    for (const candidate of [...candidates, wrong(right + 1, 'calculation'), wrong(right - 1, 'calculation'), wrong(right * 2, 'calculation'), wrong(right + 10, 'calculation')]) {
        if (chosen.length === 3) break
        if (!Number.isInteger(candidate.value) || used.has(candidate.value) || Math.abs(candidate.value) > 999999) continue
        used.add(candidate.value)
        chosen.push(candidate)
    }
    if (chosen.length < 3) return null
    return shuffle(random, [{ latex: String(right), correct: true, error: null }, ...chosen.map((item) => ({ latex: String(item.value), correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SequencesRaceError>[], answer: number, solution: LocalizedText, meta: Record<string, number>): SequencesRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer), answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const howMuch = (formula: string, letter: string) => say(`${math(formula)}. Zenbat da ${math(letter)}?`, `${math(formula)}. ¿Cuánto vale ${math(letter)}?`, `${math(formula)}. كم يساوي ${math(letter)}؟`, `${math(formula)}. What is ${math(letter)}?`)
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

/* ---------- Circuit 0: sequences ---------- */

function generalTermQuestion(random: Random, tier: Tier): SequencesRaceQuestion | null {
    const p = randomInt(random, 2, tier === 0 ? 5 : 9)
    const q = randomInt(random, -9, 9)
    const n = randomInt(random, 5, 20)
    const answer = p * n + q
    const choices = options(random, answer, [wrong(p + n + q, 'calculation'), wrong(p * (n - 1) + q, 'n-jumps'), wrong(n, 'position-value')])
    return choices && build(0, 'general', howMuch(`a_{n}=${p}n${signed(q)}`, `a_{${n}}`), choices, answer, same(`a_{${n}}=${p}\\cdot ${n}${signed(q)}=${answer}`), { p, q, n })
}

function positionQuestion(random: Random): SequencesRaceQuestion | null {
    const p = randomInt(random, 2, 7)
    const q = randomInt(random, -5, 9)
    const n = randomInt(random, 6, 30)
    const value = p * n + q
    const choices = options(random, n, [wrong(value, 'position-value'), wrong(p * value + q, 'position-value'), wrong(Math.round(value / p), 'calculation')])
    return choices && build(0, 'position', say(`${math(`a_{n}=${p}n${signed(q)}`)}. Zein lekutan dago ${value}?`, `${math(`a_{n}=${p}n${signed(q)}`)}. ¿En qué lugar está el ${value}?`, `${math(`a_{n}=${p}n${signed(q)}`)}. في أي رتبة يقع ${value}؟`, `${math(`a_{n}=${p}n${signed(q)}`)}. In which position is ${value}?`), choices, n, same(`${p}n${signed(q)}=${value}\\ \\to\\ n=${n}`), { p, q, value })
}

function recursiveQuestion(random: Random): SequencesRaceQuestion | null {
    const a1 = randomInt(random, 1, 5)
    const k = pick(random, [2, 3])
    const c = randomInt(random, -2, 3)
    const terms = [a1]
    while (terms.length < 4) terms.push(k * terms[terms.length - 1] + c)
    const answer = terms[3]
    const choices = options(random, answer, [wrong(terms[2], 'n-jumps'), wrong(k * 4 + c, 'position-value'), wrong(k * answer + c, 'calculation')])
    return choices && build(0, 'recursive', howMuch(`a_{1}=${a1},\\ a_{n}=${k}a_{n-1}${c === 0 ? '' : signed(c)}`, 'a_{4}'), choices, answer, same(terms.join(',\\,')), { a1, k, c })
}

/* ---------- Circuit 1: arithmetic progressions ---------- */

function arithTermQuestion(random: Random, tier: Tier): SequencesRaceQuestion | null {
    const a1 = randomInt(random, -10, 20)
    const d = pick(random, tier === 0 ? [2, 3, 4, 5] : [-6, -4, -3, 3, 4, 6, 7])
    const n = randomInt(random, 8, 30)
    const answer = a1 + (n - 1) * d
    const choices = options(random, answer, [wrong(a1 + n * d, 'n-jumps'), wrong(a1 - (n - 1) * d, 'sign'), wrong(n * d, 'calculation')])
    return choices && build(1, 'arith-term', howMuch(`a_{1}=${a1},\\ d=${d}`, `a_{${n}}`), choices, answer, same(`a_{${n}}=${a1}+${n - 1}\\cdot(${d})=${answer}`), { a1, d, n })
}

function arithDiffQuestion(random: Random): SequencesRaceQuestion | null {
    const k = randomInt(random, 2, 5)
    const gap = randomInt(random, 3, 8)
    const d = pick(random, [-5, -4, -3, -2, 2, 3, 4, 5, 6])
    const ak = randomInt(random, -10, 30)
    const am = ak + gap * d
    const choices = options(random, d, [wrong((am - ak) / (gap + 1), 'count-terms'), wrong(-d, 'sign'), wrong(am - ak, 'calculation')])
    return choices && build(1, 'arith-diff', howMuch(`a_{${k}}=${ak},\\ a_{${k + gap}}=${am}`, 'd'), choices, d, same(`d=\\frac{${am}-(${ak})}{${gap}}=${d}`), { k, gap, ak, am })
}

function arithFirstQuestion(random: Random): SequencesRaceQuestion | null {
    const a1 = randomInt(random, -10, 20)
    const d = pick(random, [-4, -3, -2, 2, 3, 4, 5])
    const n = randomInt(random, 4, 12)
    const an = a1 + (n - 1) * d
    const choices = options(random, a1, [wrong(an - n * d, 'n-jumps'), wrong(an + (n - 1) * d, 'sign'), wrong(an - d, 'calculation')])
    return choices && build(1, 'arith-first', howMuch(`a_{${n}}=${an},\\ d=${d}`, 'a_{1}'), choices, a1, same(`a_{1}=${an}-${n - 1}\\cdot(${d})=${a1}`), { an, d, n })
}

/* ---------- Circuit 2: sums of arithmetic progressions ---------- */

function gaussQuestion(random: Random): SequencesRaceQuestion | null {
    const n = randomInt(random, 10, 60)
    const answer = (n * (n + 1)) / 2
    const choices = options(random, answer, [wrong(n * (n + 1), 'no-half'), wrong((n * (n - 1)) / 2, 'n-jumps'), wrong((n * n) / 2, 'calculation')])
    return choices && build(2, 'gauss', say(`Kalkulatu ${math(`1+2+\\cdots+${n}`)}.`, `Calcula ${math(`1+2+\\cdots+${n}`)}.`, `احسب ${math(`1+2+\\cdots+${n}`)}.`, `Work out ${math(`1+2+\\cdots+${n}`)}.`), choices, answer, same(`\\frac{${n}\\cdot ${n + 1}}{2}=${answer}`), { n })
}

function arithSumQuestion(random: Random, tier: Tier): SequencesRaceQuestion | null {
    const a1 = randomInt(random, 1, 10)
    const d = randomInt(random, 2, tier === 0 ? 4 : 7)
    const n = randomInt(random, 6, 16)
    const an = a1 + (n - 1) * d
    const answer = ((a1 + an) * n) / 2
    const choices = options(random, answer, [wrong((a1 + an) * n, 'no-half'), wrong(((a1 + a1 + n * d) * n) / 2, 'n-jumps'), wrong(an * n, 'calculation')])
    return choices && build(2, 'arith-sum', say(`${math(`a_{1}=${a1},\\ d=${d}`)}. Kalkulatu ${math(`S_{${n}}`)}.`, `${math(`a_{1}=${a1},\\ d=${d}`)}. Calcula ${math(`S_{${n}}`)}.`, `${math(`a_{1}=${a1},\\ d=${d}`)}. احسب ${math(`S_{${n}}`)}.`, `${math(`a_{1}=${a1},\\ d=${d}`)}. Work out ${math(`S_{${n}}`)}.`), choices, answer, same(`a_{${n}}=${an}\\quad S_{${n}}=\\frac{(${a1}+${an})\\cdot ${n}}{2}=${answer}`), { a1, d, n })
}

function oddsQuestion(random: Random): SequencesRaceQuestion | null {
    const n = randomInt(random, 8, 40)
    const odd = random() < 0.5
    const last = odd ? 2 * n - 1 : 2 * n
    const answer = odd ? n * n : n * (n + 1)
    const choices = options(random, answer, [wrong(odd ? 2 * n * n : 2 * n * (n + 1), 'no-half'), wrong(odd ? ((1 + last) * last) / 2 : ((2 + last) * last) / 2, 'count-terms'), wrong(answer - last, 'calculation')])
    const formula = odd ? `1+3+5+\\cdots+${last}` : `2+4+6+\\cdots+${last}`
    return choices && build(2, odd ? 'odds' : 'evens', say(`Kalkulatu ${math(formula)}.`, `Calcula ${math(formula)}.`, `احسب ${math(formula)}.`, `Work out ${math(formula)}.`), choices, answer, same(`\\frac{(${odd ? 1 : 2}+${last})\\cdot ${n}}{2}=${answer}`), { n, odd: odd ? 1 : 0 })
}

/* ---------- Circuit 3: geometric progressions ---------- */

function geoTermQuestion(random: Random): SequencesRaceQuestion | null {
    const a1 = randomInt(random, 1, 6)
    const r = pick(random, [2, 3, -2])
    const n = randomInt(random, 3, r === 3 ? 5 : 7)
    const answer = a1 * r ** (n - 1)
    const choices = options(random, answer, [wrong((a1 * r) ** (n - 1), 'power-first'), wrong(a1 * r ** n, 'exponent-n'), wrong(a1 + (n - 1) * r, 'calculation')])
    return choices && build(3, 'geo-term', howMuch(`a_{1}=${a1},\\ r=${r}`, `a_{${n}}`), choices, answer, same(`a_{${n}}=${a1}\\cdot(${r})^{${n - 1}}=${answer}`), { a1, r, n })
}

function geoRatioQuestion(random: Random): SequencesRaceQuestion | null {
    const r = pick(random, [2, 3, 4, 5])
    const jumps = pick(random, [2, 3])
    const a2 = randomInt(random, 1, 5)
    const am = a2 * r ** jumps
    if (am > 2000) return null
    const choices = options(random, r, [wrong(r ** jumps, 'no-root'), wrong((am - a2) / jumps, 'calculation'), wrong(r * jumps, 'calculation')])
    return choices && build(3, 'geo-ratio', say(`Gai positiboak: ${math(`a_{2}=${a2},\\ a_{${2 + jumps}}=${am}`)}. Zenbat da ${math('r')}?`, `Términos positivos: ${math(`a_{2}=${a2},\\ a_{${2 + jumps}}=${am}`)}. ¿Cuánto vale ${math('r')}?`, `حدود موجبة: ${math(`a_{2}=${a2},\\ a_{${2 + jumps}}=${am}`)}. كم يساوي ${math('r')}؟`, `Positive terms: ${math(`a_{2}=${a2},\\ a_{${2 + jumps}}=${am}`)}. What is ${math('r')}?`), choices, r, same(`r^{${jumps}}=\\frac{${am}}{${a2}}=${r ** jumps}\\ \\to\\ r=${r}`), { r, jumps, a2 })
}

function geoNextQuestion(random: Random): SequencesRaceQuestion | null {
    const a1 = randomInt(random, 1, 5)
    const r = pick(random, [2, 3, 4, -3])
    const terms = [0, 1, 2, 3].map((k) => a1 * r ** k)
    const answer = a1 * r ** 4
    const choices = options(random, answer, [wrong(terms[3] + (terms[3] - terms[2]), 'calculation'), wrong(terms[3] * (r + 1), 'calculation'), wrong(-answer, 'sign')])
    return choices && build(3, 'geo-next', say(`Zein da hurrengoa? ${math(`${terms.join(',\\,')},\\ldots`)}`, `¿Cuál es el siguiente? ${math(`${terms.join(',\\,')},\\ldots`)}`, `ما الحد التالي؟ ${math(`${terms.join(',\\,')},\\ldots`)}`, `What comes next? ${math(`${terms.join(',\\,')},\\ldots`)}`), choices, answer, same(`${terms[3]}\\cdot(${r})=${answer}`), { a1, r })
}

/* ---------- Circuit 4: geometric sums ---------- */

function geoSumQuestion(random: Random): SequencesRaceQuestion | null {
    const a1 = randomInt(random, 1, 5)
    const r = pick(random, [2, 3])
    const n = randomInt(random, 4, r === 2 ? 8 : 6)
    const answer = (a1 * (r ** n - 1)) / (r - 1)
    const an = a1 * r ** (n - 1)
    const choices = options(random, answer, [wrong(((a1 + an) * n) / 2, 'gauss-geometric'), wrong((a1 * (r ** (n - 1) - 1)) / (r - 1), 'exponent-n'), wrong(an, 'calculation')])
    return choices && build(4, 'geo-sum', say(`${math(`a_{1}=${a1},\\ r=${r}`)}. Kalkulatu ${math(`S_{${n}}`)}.`, `${math(`a_{1}=${a1},\\ r=${r}`)}. Calcula ${math(`S_{${n}}`)}.`, `${math(`a_{1}=${a1},\\ r=${r}`)}. احسب ${math(`S_{${n}}`)}.`, `${math(`a_{1}=${a1},\\ r=${r}`)}. Work out ${math(`S_{${n}}`)}.`), choices, answer, same(`S_{${n}}=\\frac{${a1}\\cdot(${r}^{${n}}-1)}{${r}-1}=${answer}`), { a1, r, n })
}

function infiniteQuestion(random: Random): SequencesRaceQuestion | null {
    const [p, q] = pick(random, [[1, 2], [1, 3], [1, 4], [2, 3], [3, 4]] as const)
    const k = randomInt(random, 1, 8)
    const a1 = (q - p) * k * (q === 4 ? 1 : 2)
    const answer = (a1 * q) / (q - p)
    const choices = options(random, answer, [wrong((a1 * q) / (q + p), 'one-plus'), wrong(a1 * 2, 'calculation'), wrong(a1 + (a1 * p) / q, 'calculation')])
    return choices && build(4, 'infinite', say(`${math(`a_{1}=${a1},\\ r=\\frac{${p}}{${q}}`)}. Kalkulatu batura infinitua.`, `${math(`a_{1}=${a1},\\ r=\\frac{${p}}{${q}}`)}. Calcula la suma infinita.`, `${math(`a_{1}=${a1},\\ r=\\frac{${p}}{${q}}`)}. احسب المجموع اللانهائي.`, `${math(`a_{1}=${a1},\\ r=\\frac{${p}}{${q}}`)}. Work out the infinite sum.`), choices, answer, same(`S=\\frac{${a1}}{1-\\frac{${p}}{${q}}}=${answer}`), { a1, p, q })
}

function growthQuestion(random: Random): SequencesRaceQuestion | null {
    const start = pick(random, [100, 200, 300, 500, 1000])
    const r = pick(random, [2, 3])
    const hours = randomInt(random, 2, r === 2 ? 6 : 4)
    const answer = start * r ** hours
    const choices = options(random, answer, [wrong(start * r * hours, 'calculation'), wrong(start * r ** (hours - 1), 'exponent-n'), wrong(start + r * hours, 'calculation')])
    const verb = r === 2 ? say('bikoizten', 'duplican', 'تتضاعف', 'double') : say('hirukoizten', 'triplican', 'تتضاعف ثلاث مرات', 'triple')
    return choices && build(4, 'growth', say(`${start} bakterio, orduro ${verb.eu} dira. Zenbat ${hours} ordu barru?`, `${start} bacterias que se ${verb.es} cada hora. ¿Cuántas dentro de ${hours} horas?`, `${start} بكتيريا ${verb.ar} كل ساعة. كم عددها بعد ${hours} ساعات؟`, `${start} bacteria that ${verb.en} every hour. How many in ${hours} hours?`), choices, answer, same(`${start}\\cdot ${r}^{${hours}}=${answer}`), { start, r, hours })
}

type Generator = (random: Random, tier: Tier) => SequencesRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [generalTermQuestion, positionQuestion, recursiveQuestion],
    [arithTermQuestion, arithDiffQuestion, arithFirstQuestion],
    [gaussQuestion, arithSumQuestion, oddsQuestion],
    [geoTermQuestion, geoRatioQuestion, geoNextQuestion],
    [geoSumQuestion, infiniteQuestion, growthQuestion]
]

export function generateSequencesRaceQuestion(random: Random, circuit: number, tier: Tier): SequencesRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSequencesPitAnswer(question: RaceQuestion<SequencesRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function sequencesParTime(circuit: number): number {
    return parTimeFor([12, 13, 14, 13, 15][circuit] ?? 13)
}

export const sequencesRaceErrorTips: Record<SequencesRaceError, LocalizedText> = {
    'n-jumps': say('Lehen gaitik n. gaira n − 1 jauzi daude.', 'Del primer término al n-ésimo hay n − 1 saltos.', 'من الحد الأول إلى الحد n هناك n − 1 قفزة.', 'From the first term to the n-th there are n − 1 jumps.'),
    'position-value': say('n lekua da eta aₙ leku horretako balioa: ez nahastu.', 'n es el lugar y aₙ el valor de ese lugar: no los confundas.', 'n هو الرتبة وaₙ قيمة تلك الرتبة: لا تخلط بينهما.', 'n is the position and aₙ the value in that position: do not mix them up.'),
    'count-terms': say('Zenbatu jauziak, ez gaiak: m − k.', 'Cuenta los saltos, no los términos: m − k.', 'عُدّ القفزات لا الحدود: m − k.', 'Count the jumps, not the terms: m − k.'),
    sign: say('Kontuz zeinuarekin: diferentzia hurrengoa ken aurrekoa da.', 'Cuidado con el signo: la diferencia es el siguiente menos el anterior.', 'انتبه للإشارة: الفرق هو التالي ناقص السابق.', 'Watch the sign: the difference is the next term minus the previous one.'),
    'no-half': say('(a₁ + aₙ) · n batura bikoitza da: zatitu 2 zenbakiaz.', '(a₁ + aₙ) · n es el doble de la suma: divide entre 2.', '(a₁ + aₙ) · n ضعف المجموع: اقسم على 2.', '(a₁ + aₙ) · n is twice the sum: divide by 2.'),
    'power-first': say('Lehenik berretura: a₁ · rⁿ⁻¹, ez (a₁ · r)ⁿ⁻¹.', 'Primero la potencia: a₁ · rⁿ⁻¹, no (a₁ · r)ⁿ⁻¹.', 'القوة أولًا: a₁ · rⁿ⁻¹ لا (a₁ · r)ⁿ⁻¹.', 'The power first: a₁ · rⁿ⁻¹, not (a₁ · r)ⁿ⁻¹.'),
    'exponent-n': say('Berretzailea n − 1 da gai orokorrean, eta n baturan.', 'El exponente es n − 1 en el término general, y n en la suma.', 'الأس n − 1 في الحد العام وn في المجموع.', 'The exponent is n − 1 in the general term, and n in the sum.'),
    'no-root': say('Bi gai zatitzean rᵏ lortzen da: atera erroa.', 'Al dividir dos términos sale rᵏ: saca la raíz.', 'عند قسمة حدّين نحصل على rᵏ: خذ الجذر.', 'Dividing two terms gives rᵏ: take the root.'),
    'gauss-geometric': say('Gaussen formula aritmetikoentzat da; geometrikoan Sₙ = a₁(rⁿ − 1)/(r − 1).', 'La fórmula de Gauss es para las aritméticas; en la geométrica Sₙ = a₁(rⁿ − 1)/(r − 1).', 'صيغة غاوس للحسابية؛ وفي الهندسية Sₙ = a₁(rⁿ − 1)/(r − 1).', 'Gauss\'s formula is for arithmetic progressions; for geometric ones Sₙ = a₁(rⁿ − 1)/(r − 1).'),
    'one-plus': say('Batura infinitua a₁ / (1 − r) da, ez a₁ / (1 + r).', 'La suma infinita es a₁ / (1 − r), no a₁ / (1 + r).', 'المجموع اللانهائي a₁ / (1 − r) لا a₁ / (1 + r).', 'The infinite sum is a₁ / (1 − r), not a₁ / (1 + r).'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
