import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'

/* ==========================================================================
   Segiden lasterketa (Batxilergoa 1 · Zientziak): five circuits, one per
   stage — sequences (a term from the general term, from a recursion, from
   a Fibonacci-like rule), progressions (an arithmetic term, a geometric
   term, an arithmetic sum), infinite sums (a geometric series, a recurring
   decimal, the sum of the squares), limits (a quotient of the same degree,
   a lower degree on top, from which term on) and the number e (the
   exponent of (1 + k/n)^(mn), of (1 + 1/(kn))ⁿ and of continuous growth).
   The wrong options are the typical mistakes. Every question carries
   `meta`, the numbers the tests check it against.
   ========================================================================== */

export const BACH_SEQUENCES_RACE_CIRCUITS = 5

export type BachSequencesRaceError =
    | 'next-term'
    | 'swap'
    | 'one-less'
    | 'one-more'
    | 'n-d'
    | 'power'
    | 'arithmetic'
    | 'half'
    | 'series-sign'
    | 'upside-down'
    | 'period'
    | 'square-of-sum'
    | 'constants'
    | 'degree'
    | 'strict'
    | 'one'
    | 'add'
    | 'time'
    | 'percent'
    | 'calculation'

export type BachSequencesRaceQuestion = RaceQuestion<BachSequencesRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`

interface Candidate {
    value: FractionValue
    error: BachSequencesRaceError
}
const whole = (value: number, error: BachSequencesRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: BachSequencesRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachSequencesRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachSequencesRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachSequencesRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachSequencesRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const howMuch = (formula: string, letter: string) => say(`${math(formula)}. Zenbat da ${math(letter)}?`, `${math(formula)}. ¿Cuánto vale ${math(letter)}?`, `${math(formula)}. كم تساوي ${math(letter)}؟`, `${math(formula)}. What is the value of ${math(letter)}?`)
const calc = (formula: string) => say(`Kalkulatu ${math(formula)}.`, `Calcula ${math(formula)}.`, `احسب ${math(formula)}.`, `Work out ${math(formula)}.`)
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

/* ---------- Circuit 0: sequences ---------- */

function termQuestion(random: Random): BachSequencesRaceQuestion | null {
    const p = randomInt(random, 2, 7)
    const q = randomInt(random, -9, 9)
    const n = randomInt(random, 5, 20)
    if (q === 0) return null
    const answer = fraction(p * n + q)
    const choices = options(random, answer, [whole(p * (n + 1) + q, 'next-term'), whole(p + q * n, 'swap'), whole(p * n - q, 'calculation')])
    return choices && build(0, 'term', howMuch(`a_n=${p}n${signed(q)}`, `a_{${n}}`), choices, answer, same(`a_{${n}}=${p}\\cdot ${n}${signed(q)}=${p * n + q}`), { p, q, n })
}

function recursionQuestion(random: Random): BachSequencesRaceQuestion | null {
    const a1 = randomInt(random, 1, 5)
    const c = randomInt(random, -3, 4)
    const terms = [a1]
    for (let i = 1; i < 5; i += 1) terms.push(2 * terms[i - 1] + c)
    const answer = fraction(terms[3])
    const choices = options(random, answer, [whole(terms[2], 'one-less'), whole(terms[4], 'one-more'), whole(2 * terms[2], 'calculation')])
    return choices && build(0, 'recursion', say(`${math(`a_1=${a1}`)} eta ${math(`a_n=2a_{n-1}${signed(c)}`)}. Zenbat da ${math('a_4')}?`, `${math(`a_1=${a1}`)} y ${math(`a_n=2a_{n-1}${signed(c)}`)}. ¿Cuánto vale ${math('a_4')}?`, `${math(`a_1=${a1}`)} و${math(`a_n=2a_{n-1}${signed(c)}`)}. كم تساوي ${math('a_4')}؟`, `${math(`a_1=${a1}`)} and ${math(`a_n=2a_{n-1}${signed(c)}`)}. What is ${math('a_4')}?`), choices, answer, same(terms.slice(0, 4).join(',\\ ')), { a1, c })
}

function fibonacciQuestion(random: Random): BachSequencesRaceQuestion | null {
    const a1 = randomInt(random, 1, 6)
    const a2 = randomInt(random, 1, 6)
    const terms = [a1, a2]
    while (terms.length < 7) terms.push(terms[terms.length - 1] + terms[terms.length - 2])
    const answer = fraction(terms[5])
    const choices = options(random, answer, [whole(terms[4], 'one-less'), whole(terms[6], 'one-more'), whole(terms[4] + 1, 'calculation')])
    return choices && build(0, 'fibonacci', say(`${math(`a_1=${a1}`)}, ${math(`a_2=${a2}`)} eta ${math('a_n=a_{n-1}+a_{n-2}')}. Zenbat da ${math('a_6')}?`, `${math(`a_1=${a1}`)}, ${math(`a_2=${a2}`)} y ${math('a_n=a_{n-1}+a_{n-2}')}. ¿Cuánto vale ${math('a_6')}?`, `${math(`a_1=${a1}`)} و${math(`a_2=${a2}`)} و${math('a_n=a_{n-1}+a_{n-2}')}. كم تساوي ${math('a_6')}؟`, `${math(`a_1=${a1}`)}, ${math(`a_2=${a2}`)} and ${math('a_n=a_{n-1}+a_{n-2}')}. What is ${math('a_6')}?`), choices, answer, same(terms.slice(0, 6).join(',\\ ')), { a1, a2 })
}

/* ---------- Circuit 1: progressions ---------- */

function arithTermQuestion(random: Random): BachSequencesRaceQuestion | null {
    const a1 = randomInt(random, -6, 9)
    const d = pick(random, [-4, -3, -2, 2, 3, 4, 5, 6])
    const n = randomInt(random, 6, 25)
    const answer = fraction(a1 + (n - 1) * d)
    const choices = options(random, answer, [whole(a1 + n * d, 'n-d'), whole((n - 1) * d, 'calculation'), whole(a1 + (n - 1) + d, 'calculation')])
    return choices && build(1, 'arith-term', say(`Aritmetikoa: ${math(`a_1=${a1}`)} eta ${math(`d=${d}`)}. Zenbat da ${math(`a_{${n}}`)}?`, `Aritmética: ${math(`a_1=${a1}`)} y ${math(`d=${d}`)}. ¿Cuánto vale ${math(`a_{${n}}`)}?`, `حسابية: ${math(`a_1=${a1}`)} و${math(`d=${d}`)}. كم تساوي ${math(`a_{${n}}`)}؟`, `Arithmetic: ${math(`a_1=${a1}`)} and ${math(`d=${d}`)}. What is ${math(`a_{${n}}`)}?`), choices, answer, same(`a_{${n}}=${a1}+${n - 1}\\cdot(${d})=${a1 + (n - 1) * d}`), { a1, d, n })
}

function geoTermQuestion(random: Random): BachSequencesRaceQuestion | null {
    const a1 = randomInt(random, 1, 5)
    const r = pick(random, [2, 3, -2])
    const n = randomInt(random, 3, 6)
    const answer = fraction(a1 * r ** (n - 1))
    const choices = options(random, answer, [whole(a1 * r ** n, 'power'), whole(a1 + (n - 1) * r, 'arithmetic'), whole((a1 * r) ** (n - 1), 'calculation')])
    return choices && build(1, 'geo-term', say(`Geometrikoa: ${math(`a_1=${a1}`)} eta ${math(`r=${r}`)}. Zenbat da ${math(`a_${n}`)}?`, `Geométrica: ${math(`a_1=${a1}`)} y ${math(`r=${r}`)}. ¿Cuánto vale ${math(`a_${n}`)}?`, `هندسية: ${math(`a_1=${a1}`)} و${math(`r=${r}`)}. كم تساوي ${math(`a_${n}`)}؟`, `Geometric: ${math(`a_1=${a1}`)} and ${math(`r=${r}`)}. What is ${math(`a_${n}`)}?`), choices, answer, same(`a_${n}=${a1}\\cdot(${r})^{${n - 1}}=${a1 * r ** (n - 1)}`), { a1, r, n })
}

function arithSumQuestion(random: Random): BachSequencesRaceQuestion | null {
    const a1 = randomInt(random, 1, 9)
    const d = randomInt(random, 1, 5)
    const n = pick(random, [10, 12, 15, 20])
    const an = a1 + (n - 1) * d
    const answer = fraction(((a1 + an) * n) / 2)
    const choices = options(random, answer, [whole((a1 + an) * n, 'half'), whole(an * n, 'calculation'), whole(((a1 + an) * (n - 1)) / 2, 'calculation')])
    return choices && build(1, 'arith-sum', say(`Aritmetikoa: ${math(`a_1=${a1}`)} eta ${math(`d=${d}`)}. Zenbat da ${math(`S_{${n}}`)}?`, `Aritmética: ${math(`a_1=${a1}`)} y ${math(`d=${d}`)}. ¿Cuánto vale ${math(`S_{${n}}`)}?`, `حسابية: ${math(`a_1=${a1}`)} و${math(`d=${d}`)}. كم يساوي ${math(`S_{${n}}`)}؟`, `Arithmetic: ${math(`a_1=${a1}`)} and ${math(`d=${d}`)}. What is ${math(`S_{${n}}`)}?`), choices, answer, same(`a_{${n}}=${an}\\qquad S_{${n}}=\\frac{(${a1}+${an})\\cdot ${n}}{2}=${((a1 + an) * n) / 2}`), { a1, d, n })
}

/* ---------- Circuit 2: infinite sums ---------- */

function seriesQuestion(random: Random): BachSequencesRaceQuestion | null {
    const k = pick(random, [2, 3, 4, 5])
    const sign = pick(random, [1, -1])
    const a1 = k * randomInt(random, 1, 6)
    // S∞ = a₁ / (1 − r), with r = sign/k
    const answer = fraction(a1 * k, k - sign)
    const second = (a1 * sign) / k
    const terms = `${a1}${second < 0 ? '-' : '+'}${Math.abs(second)}+\\ldots`.replace('+-', '-')
    const choices = options(random, answer, [ratio(a1 * k, k + sign, 'series-sign'), ratio(a1 * (k - sign), k, 'upside-down'), ratio(a1 * k, 1, 'calculation')])
    const r = sign > 0 ? `\\frac{1}{${k}}` : `-\\frac{1}{${k}}`
    return choices && build(2, 'series', calc(terms), choices, answer, same(`r=${r}\\qquad S_\\infty=\\frac{${a1}}{1-(${r})}=${written(answer)}`), { a1, k, sign })
}

function periodQuestion(random: Random): BachSequencesRaceQuestion | null {
    const block = randomInt(random, 12, 98)
    if (block % 11 === 0 || block % 10 === 0) return null
    const answer = fraction(block, 99)
    const choices = options(random, answer, [ratio(block, 100, 'period'), ratio(block, 90, 'period'), ratio(block, 9, 'period')])
    return choices && build(2, 'period', say(`Zein zatiki da ${math(`0{,}\\overline{${block}}`)}?`, `¿Qué fracción es ${math(`0{,}\\overline{${block}}`)}?`, `أيّ كسر هو ${math(`0{,}\\overline{${block}}`)}؟`, `Which fraction is ${math(`0{,}\\overline{${block}}`)}?`), choices, answer, same(`\\frac{0{,}${block}}{1-0{,}01}=\\frac{${block}}{99}=${written(answer)}`), { block })
}

function squaresQuestion(random: Random): BachSequencesRaceQuestion | null {
    const n = randomInt(random, 4, 12)
    const answer = fraction((n * (n + 1) * (2 * n + 1)) / 6)
    const choices = options(random, answer, [whole(((n * (n + 1)) / 2) ** 2, 'square-of-sum'), whole((n * (n + 1)) / 2, 'calculation'), whole(n * n * n, 'calculation')])
    return choices && build(2, 'squares', calc(`1^2+2^2+\\ldots+${n}^2`), choices, answer, same(`\\frac{${n}\\cdot ${n + 1}\\cdot ${2 * n + 1}}{6}=${(n * (n + 1) * (2 * n + 1)) / 6}`), { n })
}

/* ---------- Circuit 3: limits ---------- */

function quotientQuestion(random: Random): BachSequencesRaceQuestion | null {
    const a = pick(random, [-6, -4, -3, -2, 2, 3, 4, 5, 6, 8])
    const b = randomInt(random, 2, 6)
    const c = randomInt(random, 1, 9)
    const d = randomInt(random, 1, 9)
    if (a * d === b * c) return null
    const answer = fraction(a, b)
    const choices = options(random, answer, [ratio(c, d, 'constants'), ratio(b, a, 'upside-down'), whole(0, 'degree')])
    return choices && build(3, 'quotient', calc(`\\lim\\frac{${a}n${signed(c)}}{${b}n${signed(d)}}`), choices, answer, same(`\\frac{${a}}{${b}}=${written(answer)}`), { a, b, c, d })
}

function lowerQuestion(random: Random): BachSequencesRaceQuestion | null {
    const a = randomInt(random, 2, 9)
    const b = randomInt(random, 2, 6)
    const c = randomInt(random, 1, 9)
    const d = randomInt(random, 1, 9)
    if (a === b || c === d) return null
    const answer = fraction(0)
    const choices = options(random, answer, [ratio(a, b, 'degree'), ratio(c, d, 'constants'), whole(1, 'calculation')])
    return choices && build(3, 'lower', calc(`\\lim\\frac{${a}n+${c}}{${b}n^2+${d}}`), choices, answer, say('Behean maila handiagoa: limitea 0 da.', 'Grado mayor abajo: el límite es 0.', 'درجة المقام أكبر: النهاية 0.', 'Higher degree below: the limit is 0.'), { a, b, c, d })
}

function fromTermQuestion(random: Random): BachSequencesRaceQuestion | null {
    const c = randomInt(random, 1, 9)
    const [epsilon, m] = pick(random, [['0{,}1', 10], ['0{,}01', 100], ['0{,}05', 20], ['0{,}02', 50], ['0{,}2', 5]] as Array<[string, number]>)
    const l = randomInt(random, 1, 5)
    const answer = fraction(c * m + 1)
    const choices = options(random, answer, [whole(c * m, 'strict'), whole(m + 1, 'calculation'), whole(c * m - 1, 'calculation')])
    return choices && build(3, 'from-term', say(`${math(`a_n=${l}+\\frac{${c}}{n}`)}: zein gaitik aurrera daude guztiak ${l} zenbakitik ${math(epsilon)} baino gertuago?`, `${math(`a_n=${l}+\\frac{${c}}{n}`)}: ¿a partir de qué término están todos a menos de ${math(epsilon)} de ${l}?`, `${math(`a_n=${l}+\\frac{${c}}{n}`)}: ابتداءً من أيّ حد تكون كلها على بعد أقل من ${math(epsilon)} عن ${l}؟`, `${math(`a_n=${l}+\\frac{${c}}{n}`)}: from which term on are they all less than ${math(epsilon)} away from ${l}?`), choices, answer, same(`\\frac{${c}}{n}<${epsilon}\\ \\to\\ n>${c * m}\\ \\to\\ N=${c * m + 1}`), { c, m })
}

/* ---------- Circuit 4: the number e ---------- */

function eExponentQuestion(random: Random): BachSequencesRaceQuestion | null {
    const k = randomInt(random, 1, 5)
    const m = randomInt(random, 2, 4)
    const answer = fraction(k * m)
    const choices = options(random, answer, [whole(k + m, 'add'), whole(m, 'one'), whole(k, 'calculation')])
    const top = k === 1 ? '\\frac{1}{n}' : `\\frac{${k}}{n}`
    return choices && build(4, 'e-exponent', say(`${math(`\\left(1+${top}\\right)^{${m}n}\\to e^a`)}. Zenbat da ${math('a')}?`, `${math(`\\left(1+${top}\\right)^{${m}n}\\to e^a`)}. ¿Cuánto vale ${math('a')}?`, `${math(`\\left(1+${top}\\right)^{${m}n}\\to e^a`)}. كم تساوي ${math('a')}؟`, `${math(`\\left(1+${top}\\right)^{${m}n}\\to e^a`)}. What is ${math('a')}?`), choices, answer, same(`\\left(\\left(1+${top}\\right)^n\\right)^{${m}}\\to\\left(e^{${k}}\\right)^{${m}}=e^{${k * m}}`), { k, m })
}

function eRootQuestion(random: Random): BachSequencesRaceQuestion | null {
    const k = randomInt(random, 2, 6)
    const answer = fraction(1, k)
    const choices = options(random, answer, [whole(k, 'upside-down'), whole(1, 'one'), ratio(1, k + 1, 'calculation')])
    return choices && build(4, 'e-root', say(`${math(`\\left(1+\\frac{1}{${k}n}\\right)^{n}\\to e^a`)}. Zenbat da ${math('a')}?`, `${math(`\\left(1+\\frac{1}{${k}n}\\right)^{n}\\to e^a`)}. ¿Cuánto vale ${math('a')}?`, `${math(`\\left(1+\\frac{1}{${k}n}\\right)^{n}\\to e^a`)}. كم تساوي ${math('a')}؟`, `${math(`\\left(1+\\frac{1}{${k}n}\\right)^{n}\\to e^a`)}. What is ${math('a')}?`), choices, answer, same(`\\left(\\left(1+\\frac{1}{${k}n}\\right)^{${k}n}\\right)^{\\frac{1}{${k}}}\\to e^{\\frac{1}{${k}}}`), { k })
}

function continuousQuestion(random: Random): BachSequencesRaceQuestion | null {
    const rate = randomInt(random, 2, 9)
    const years = pick(random, [2, 4, 5, 10])
    const start = pick(random, [200, 500, 800])
    const answer = fraction(rate * years, 100)
    const choices = options(random, answer, [ratio(rate, 100, 'time'), whole(rate * years, 'percent'), ratio(rate + years, 100, 'calculation')])
    return choices && build(4, 'continuous', say(`${start} € % ${rate} interes jarraituan, ${years} urtez: ${math(`${start}\\cdot e^{a}`)}. Zenbat da ${math('a')}?`, `${start} € al ${rate} % con interés continuo, ${years} años: ${math(`${start}\\cdot e^{a}`)}. ¿Cuánto vale ${math('a')}?`, `${start} € بفائدة مستمرة ${rate} % مدة ${years} سنوات: ${math(`${start}\\cdot e^{a}`)}. كم تساوي ${math('a')}؟`, `€${start} at ${rate}% continuous interest for ${years} years: ${math(`${start}\\cdot e^{a}`)}. What is ${math('a')}?`), choices, answer, same(`a=k\\cdot t=${written(fraction(rate, 100))}\\cdot ${years}=${written(answer)}`), { rate, years })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BachSequencesRaceQuestion | null>> = [
    [termQuestion, recursionQuestion, fibonacciQuestion],
    [arithTermQuestion, geoTermQuestion, arithSumQuestion],
    [seriesQuestion, periodQuestion, squaresQuestion],
    [quotientQuestion, lowerQuestion, fromTermQuestion],
    [eExponentQuestion, eRootQuestion, continuousQuestion]
]

export function generateBachSequencesRaceQuestion(random: Random, circuit: number, tier: Tier): BachSequencesRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachSequencesPitAnswer(question: RaceQuestion<BachSequencesRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bachSequencesParTime(circuit: number): number {
    return parTimeFor([12, 13, 13, 12, 12][circuit] ?? 12)
}

export const bachSequencesRaceErrorTips: Record<BachSequencesRaceError, LocalizedText> = {
    'next-term': say('Ordezkatu eskatzen den n bera, ez hurrengoa.', 'Sustituye el n que se pide, no el siguiente.', 'عوّض n المطلوب نفسه لا التالي.', 'Substitute the n that is asked for, not the next one.'),
    swap: say('Koefizientea n-ren ondoan doa: p·n + q.', 'El coeficiente va con n: p·n + q.', 'المعامل يرافق n: ‏p·n + q.', 'The coefficient goes with n: p·n + q.'),
    'one-less': say('Zenbatu gaiak: a₁ lehena da.', 'Cuenta los términos: a₁ es el primero.', 'عُدّ الحدود: a₁ هو الأول.', 'Count the terms: a₁ is the first one.'),
    'one-more': say('Gelditu eskatutako gaian.', 'Para en el término que se pide.', 'توقّف عند الحد المطلوب.', 'Stop at the term that is asked for.'),
    'n-d': say('aₙ = a₁ + (n − 1)·d: n − 1 jauzi.', 'aₙ = a₁ + (n − 1)·d: n − 1 saltos.', 'aₙ = a₁ + (n − 1)·d: ‏n − 1 قفزة.', 'aₙ = a₁ + (n − 1)·d: n − 1 jumps.'),
    power: say('aₙ = a₁·rⁿ⁻¹, ez rⁿ.', 'aₙ = a₁·rⁿ⁻¹, no rⁿ.', 'aₙ = a₁·rⁿ⁻¹ لا rⁿ.', 'aₙ = a₁·rⁿ⁻¹, not rⁿ.'),
    arithmetic: say('Geometrikoan biderkatu egiten da, ez batu.', 'En la geométrica se multiplica, no se suma.', 'في الهندسية نضرب لا نجمع.', 'In a geometric progression you multiply, not add.'),
    half: say('Sₙ = (a₁ + aₙ)·n : 2.', 'Sₙ = (a₁ + aₙ)·n ÷ 2.', 'Sₙ = (a₁ + aₙ)·n ÷ 2.', 'Sₙ = (a₁ + aₙ)·n ÷ 2.'),
    'series-sign': say('S∞ = a₁/(1 − r): r negatiboa bada, 1 − r handiagoa da.', 'S∞ = a₁/(1 − r): si r es negativa, 1 − r es mayor.', 'S∞ = a₁/(1 − r): إذا كان r سالبًا فإن 1 − r أكبر.', 'S∞ = a₁/(1 − r): if r is negative, 1 − r is bigger.'),
    'upside-down': say('Zatiketa alderantziz egin duzu.', 'Has dividido al revés.', 'قسمت بالعكس.', 'You divided the wrong way round.'),
    period: say('Bi zifrako periodoa: 99 behean, ez 100 edo 90.', 'Periodo de dos cifras: 99 abajo, no 100 ni 90.', 'دورة من رقمين: 99 في المقام، لا 100 ولا 90.', 'A two-figure repeating block: 99 underneath, not 100 or 90.'),
    'square-of-sum': say('Karratuen batura ez da baturaren karratua: n(n + 1)(2n + 1)/6.', 'La suma de los cuadrados no es el cuadrado de la suma: n(n + 1)(2n + 1)/6.', 'مجموع المربعات ليس مربع المجموع: n(n + 1)(2n + 1)/6.', 'The sum of the squares is not the square of the sum: n(n + 1)(2n + 1)/6.'),
    constants: say('n handia denean, maila handieneko gaiek agintzen dute.', 'Cuando n es grande, mandan los términos de mayor grado.', 'عندما يكون n كبيرًا تغلب الحدود ذات الدرجة الأكبر.', 'When n is large, the highest-degree terms win.'),
    degree: say('Alderatu mailak: berdinak, koefiziente nagusiak; behean handiagoa, 0.', 'Compara grados: iguales, coeficientes principales; mayor abajo, 0.', 'قارن الدرجتين: متساويتان، المعاملان الرئيسيان؛ المقام أكبر، 0.', 'Compare degrees: equal, leading coefficients; higher below, 0.'),
    strict: say('c/n < ε hertsia da: n > c/ε, beraz hurrengo gaia.', 'c/n < ε es estricta: n > c/ε, así que el término siguiente.', 'c/n < ε صارمة: n > c/ε، إذن الحد التالي.', 'c/n < ε is strict: n > c/ε, so the next term.'),
    one: say('(1 + 1/n)ⁿ → e, ez 1.', '(1 + 1/n)ⁿ → e, no 1.', '(1 + 1/n)ⁿ → e لا 1.', '(1 + 1/n)ⁿ → e, not 1.'),
    add: say('(eᵏ)ᵐ = eᵏᵐ: berretzaileak biderkatu.', '(eᵏ)ᵐ = eᵏᵐ: los exponentes se multiplican.', '(eᵏ)ᵐ = eᵏᵐ: تُضرب الأسس.', '(eᵏ)ᵐ = eᵏᵐ: the exponents multiply.'),
    time: say('C = C₀·eᵏᵗ: biderkatu urteekin.', 'C = C₀·eᵏᵗ: multiplica por los años.', 'C = C₀·eᵏᵗ: اضرب في عدد السنوات.', 'C = C₀·eᵏᵗ: multiply by the years.'),
    percent: say('% 6 = 0,06: zatitu 100 zenbakiaz.', '6 % = 0,06: divide entre 100.', '6 % = 0.06: اقسم على 100.', '6% = 0.06: divide by 100.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
