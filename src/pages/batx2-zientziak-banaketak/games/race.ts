import { checkAnswer, fraction, toNumber, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { choose } from '../binomial.ts'
import { above, below, between, tableLatex, zLatex } from '../normal.ts'

/* ==========================================================================
   Banaketen lasterketa (Batxilergoa 2 · Zientziak): five circuits, one per
   stage — review (binomial coefficients, the mean of a table), discrete
   (the missing probability, μ, the expected gain), binomial (P(X = k) with
   p = 0,5, μ = np, σ² = npq, «at least one»), normal (above, below a
   negative, between −k and k, the standard score) and approximation (σ of
   the approximating normal, the edge of the continuity correction and an
   approximation of B(100; 0,5)). The wrong options are the typical
   mistakes. Every normal value comes from the table of normal.ts; every
   question carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const DISTRIBUTIONS_BATX2_RACE_CIRCUITS = 5

export type DistributionsBatx2RaceError =
    | 'order'
    | 'weights'
    | 'sum'
    | 'cost'
    | 'probability'
    | 'coefficient'
    | 'variance'
    | 'mean'
    | 'pq'
    | 'multiply'
    | 'table'
    | 'half'
    | 'double'
    | 'divide'
    | 'correction'
    | 'side'
    | 'calculation'

export type DistributionsBatx2RaceQuestion = RaceQuestion<DistributionsBatx2RaceError> & { meta: Record<string, number> }

interface Candidate {
    value: FractionValue
    error: DistributionsBatx2RaceError
}
const as = (value: FractionValue, error: DistributionsBatx2RaceError): Candidate => ({ value, error })
const nearby = (value: FractionValue): Candidate[] => {
    const number = toNumber(value)
    if (Number.isInteger(number)) return [number + 1, number - 1, number * 2].map((item) => as(fraction(item), 'calculation'))
    return [fraction(value.numerator + 1, value.denominator), fraction(Math.max(1, value.numerator - 1), value.denominator), fraction(value.numerator, value.denominator + 1)].map((item) => as(item, 'calculation'))
}

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<DistributionsBatx2RaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: DistributionsBatx2RaceError }> = []
    for (const candidate of [...candidates, ...nearby(right)]) {
        if (wrong.length === 3) break
        if (candidate.value.numerator < 0) continue
        const latex = written(candidate.value)
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<DistributionsBatx2RaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): DistributionsBatx2RaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const all = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
const tenths = (value: number) => String(value / 10).replace('.', '{,}')
const table = (tenThousandths: number) => fraction(tenThousandths, 10_000)

/* ---------- Circuit 0: review ---------- */

function coefficientQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const n = randomInt(random, 5, 10)
    const k = randomInt(random, 2, 3)
    const answer = fraction(choose(n, k))
    const ordered = k === 2 ? n * (n - 1) : n * (n - 1) * (n - 2)
    const choices = options(random, answer, [as(fraction(ordered), 'order'), as(fraction(n * k), 'calculation'), as(fraction(choose(n, k + 1)), 'calculation')])
    return choices && build(0, 'coefficient', say(`Zenbat da $\\binom{${n}}{${k}}$?`, `¿Cuánto vale $\\binom{${n}}{${k}}$?`, `كم يساوي $\\binom{${n}}{${k}}$؟`, `What is $\\binom{${n}}{${k}}$?`), choices, answer, all(`\\binom{${n}}{${k}}=\\frac{${ordered}}{${k === 2 ? 2 : 6}}=${choose(n, k)}`), { n, k })
}

function tableMeanQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const low = randomInt(random, 1, 4)
    const high = low + randomInt(random, 2, 5)
    const share = randomInt(random, 1, 9)
    const mean = fraction(low * share + high * (10 - share), 10)
    const choices = options(random, mean, [as(fraction(low + high, 2), 'weights'), as(fraction(low * (10 - share) + high * share, 10), 'weights'), as(fraction(low * share + high * (10 - share), 100), 'calculation')])
    return choices && build(0, 'table-mean', say(`$${low}$ balioaren maiztasun erlatiboa $${tenths(share)}$ da, eta $${high}$ balioarena, $${tenths(10 - share)}$. Zein da batez bestekoa?`, `El valor $${low}$ tiene frecuencia relativa $${tenths(share)}$ y el $${high}$, $${tenths(10 - share)}$. ¿Cuál es la media?`, `التكرار النسبي للقيمة $${low}$ هو $${tenths(share)}$ وللقيمة $${high}$ هو $${tenths(10 - share)}$. ما المتوسط؟`, `The value $${low}$ has relative frequency $${tenths(share)}$ and $${high}$, $${tenths(10 - share)}$. What is the mean?`), choices, mean, all(`${low}\\cdot ${tenths(share)}+${high}\\cdot ${tenths(10 - share)}=${written(mean)}`), { low, high, share })
}

/* ---------- Circuit 1: discrete random variables ---------- */

function missingQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const shares = [randomInt(random, 1, 4), randomInt(random, 1, 4), randomInt(random, 1, 3)]
    const used = shares.reduce((sum, value) => sum + value, 0)
    if (used >= 10) return null
    const answer = fraction(10 - used, 10)
    const choices = options(random, answer, [as(fraction(used, 10), 'sum'), as(fraction(10 - shares[0] - shares[1], 10), 'sum'), as(fraction(1, 4), 'calculation')])
    return choices && build(1, 'missing', say(`$X$ aldagaiak 0, 1, 2 eta 3 hartzen ditu: $${tenths(shares[0])}$, $${tenths(shares[1])}$, $${tenths(shares[2])}$ eta $k$. Zenbat da $k$?`, `$X$ toma 0, 1, 2 y 3 con $${tenths(shares[0])}$, $${tenths(shares[1])}$, $${tenths(shares[2])}$ y $k$. ¿Cuánto vale $k$?`, `يأخذ $X$ القيم 0 و1 و2 و3 باحتمالات $${tenths(shares[0])}$ و$${tenths(shares[1])}$ و$${tenths(shares[2])}$ و$k$. كم يساوي $k$؟`, `$X$ takes 0, 1, 2 and 3 with $${tenths(shares[0])}$, $${tenths(shares[1])}$, $${tenths(shares[2])}$ and $k$. What is $k$?`), choices, answer, all(`k=1-${tenths(shares[0])}-${tenths(shares[1])}-${tenths(shares[2])}=${written(answer)}`), { a: shares[0], b: shares[1], c: shares[2] })
}

function meanQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const shares = [randomInt(random, 1, 6), 0, 0]
    shares[1] = randomInt(random, 1, 9 - shares[0])
    shares[2] = 10 - shares[0] - shares[1]
    const answer = fraction(shares[1] + 2 * shares[2], 10)
    const choices = options(random, answer, [as(fraction(1), 'weights'), as(fraction(2 * shares[1] + shares[2], 10), 'weights'), as(fraction(shares[1] + shares[2], 10), 'calculation')])
    return choices && build(1, 'mean', say(`$X$ aldagaiak 0, 1 eta 2 hartzen ditu, $${tenths(shares[0])}$, $${tenths(shares[1])}$ eta $${tenths(shares[2])}$ probabilitateekin. Zenbat da $\\mu$?`, `$X$ toma 0, 1 y 2 con probabilidades $${tenths(shares[0])}$, $${tenths(shares[1])}$ y $${tenths(shares[2])}$. ¿Cuánto vale $\\mu$?`, `يأخذ $X$ القيم 0 و1 و2 باحتمالات $${tenths(shares[0])}$ و$${tenths(shares[1])}$ و$${tenths(shares[2])}$. كم يساوي $\\mu$؟`, `$X$ takes 0, 1 and 2 with probabilities $${tenths(shares[0])}$, $${tenths(shares[1])}$ and $${tenths(shares[2])}$. What is $\\mu$?`), choices, answer, all(`\\mu=1\\cdot ${tenths(shares[1])}+2\\cdot ${tenths(shares[2])}=${written(answer)}`), { a: shares[0], b: shares[1], c: shares[2] })
}

function gainQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const faces = pick(random, [4, 5, 6, 8, 10])
    const prize = faces * randomInt(random, 1, 4)
    const cost = randomInt(random, 1, 4)
    const answer = fraction(prize - cost * faces, faces)
    if (answer.numerator === 0) return null
    const choices = options(random, answer, [as(fraction(prize, faces), 'cost'), as(fraction(prize - cost), 'probability'), as(fraction(cost * faces - prize, faces), 'calculation')])
    return choices && build(1, 'gain', say(`Jokatzeak ${cost} euro balio du, eta ${faces} aurpegiko dado batean 1 ateratzen bada, ${prize} euro irabazten dira. Zein da irabaziaren itxaropena?`, `Jugar cuesta ${cost} € y, si en un dado de ${faces} caras sale el 1, se ganan ${prize} €. ¿Cuál es la ganancia esperada?`, `تكلّف المشاركة ${cost} €، وإذا ظهر 1 في نرد له ${faces} أوجه يُربح ${prize} €. ما الربح المتوقع؟`, `Playing costs €${cost} and, if a ${faces}-sided die shows 1, you win €${prize}. What is the expected gain?`), choices, answer, all(`${prize}\\cdot\\frac{1}{${faces}}-${cost}=${written(answer)}`), { faces, prize, cost })
}

/* ---------- Circuit 2: the binomial ---------- */

function pmfQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const n = randomInt(random, 3, 6)
    const k = randomInt(random, 1, n - 1)
    const answer = fraction(choose(n, k), 2 ** n)
    const choices = options(random, answer, [as(fraction(1, 2 ** n), 'coefficient'), as(fraction(k, n), 'calculation'), as(fraction(choose(n, k), 2 ** k), 'calculation')])
    return choices && build(2, 'pmf', say(`$X$ aldagaia $B(${n};\\,0{,}5)$ da. Zenbat da $P(X=${k})$?`, `$X$ sigue una $B(${n};\\,0{,}5)$. ¿Cuánto vale $P(X=${k})$?`, `يتبع $X$ التوزيع $B(${n};\\,0{,}5)$. كم يساوي $P(X=${k})$؟`, `$X$ follows $B(${n};\\,0{,}5)$. What is $P(X=${k})$?`), choices, answer, all(`\\frac{${choose(n, k)}}{${2 ** n}}=${written(answer)}`), { n, k })
}

function binomialMeanQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const n = 10 * randomInt(random, 1, 10)
    const p = randomInt(random, 1, 9)
    if (p === 5) return null
    const answer = fraction(n * p, 10)
    const choices = options(random, answer, [as(fraction(n * p * (10 - p), 100), 'variance'), as(fraction(n * (10 - p), 10), 'pq'), as(fraction(n, 2), 'calculation')])
    return choices && build(2, 'binomial-mean', say(`$X$ aldagaia $B(${n};\\,${tenths(p)})$ da. Zenbat da $\\mu$?`, `$X$ sigue una $B(${n};\\,${tenths(p)})$. ¿Cuánto vale $\\mu$?`, `يتبع $X$ التوزيع $B(${n};\\,${tenths(p)})$. كم يساوي $\\mu$؟`, `$X$ follows $B(${n};\\,${tenths(p)})$. What is $\\mu$?`), choices, answer, all(`\\mu=${n}\\cdot ${tenths(p)}=${written(answer)}`), { n, p })
}

function binomialVarianceQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const n = 10 * randomInt(random, 1, 10)
    const p = randomInt(random, 1, 9)
    if (p === 5) return null
    const answer = fraction(n * p * (10 - p), 100)
    const choices = options(random, answer, [as(fraction(n * p, 10), 'mean'), as(fraction(n * p * p, 100), 'pq'), as(fraction(n * (10 - p), 10), 'pq')])
    return choices && build(2, 'binomial-variance', say(`$X$ aldagaia $B(${n};\\,${tenths(p)})$ da. Zenbat da $\\sigma^2$?`, `$X$ sigue una $B(${n};\\,${tenths(p)})$. ¿Cuánto vale $\\sigma^2$?`, `يتبع $X$ التوزيع $B(${n};\\,${tenths(p)})$. كم يساوي $\\sigma^2$؟`, `$X$ follows $B(${n};\\,${tenths(p)})$. What is $\\sigma^2$?`), choices, answer, all(`\\sigma^2=${n}\\cdot ${tenths(p)}\\cdot ${tenths(10 - p)}=${written(answer)}`), { n, p })
}

function atLeastQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const n = randomInt(random, 2, 3)
    const p = pick(random, [1, 2, 3, 4, 6, 7, 8, 9])
    const scale = 10 ** n
    const answer = fraction(scale - (10 - p) ** n, scale)
    const choices = options(random, answer, [as(fraction(scale - p ** n, scale), 'pq'), as(fraction(n * p, 10), 'multiply'), as(fraction((10 - p) ** n, scale), 'calculation')])
    return choices && build(2, 'at-least', say(`$X$ aldagaia $B(${n};\\,${tenths(p)})$ da. Zenbat da $P(X\\ge 1)$?`, `$X$ sigue una $B(${n};\\,${tenths(p)})$. ¿Cuánto vale $P(X\\ge 1)$?`, `يتبع $X$ التوزيع $B(${n};\\,${tenths(p)})$. كم يساوي $P(X\\ge 1)$؟`, `$X$ follows $B(${n};\\,${tenths(p)})$. What is $P(X\\ge 1)$?`), choices, answer, all(`1-${tenths(10 - p)}^{${n}}=${written(answer)}`), { n, p })
}

/* ---------- Circuit 3: the normal ---------- */

const someZ = (random: Random) => randomInt(random, 2, 25) / 10 + (random() < 0.5 ? 0 : randomInt(random, 1, 9) / 100)

function aboveQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const k = Math.round(someZ(random) * 100) / 100
    const answer = table(above(k))
    const choices = options(random, answer, [as(table(below(k)), 'table'), as(table(below(k) - 5000), 'half'), as(table(2 * above(k)), 'double')])
    return choices && build(3, 'above', say(`$P(Z\\le ${zLatex(k)})=${tableLatex(below(k))}$ bada, zenbat da $P(Z>${zLatex(k)})$?`, `Si $P(Z\\le ${zLatex(k)})=${tableLatex(below(k))}$, ¿cuánto vale $P(Z>${zLatex(k)})$?`, `إذا كان $P(Z\\le ${zLatex(k)})=${tableLatex(below(k))}$، فكم يساوي $P(Z>${zLatex(k)})$؟`, `If $P(Z\\le ${zLatex(k)})=${tableLatex(below(k))}$, what is $P(Z>${zLatex(k)})$?`), choices, answer, all(`1-${tableLatex(below(k))}=${tableLatex(above(k))}`), { k: Math.round(k * 100) })
}

function negativeQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const k = Math.round(someZ(random) * 100) / 100
    const answer = table(below(-k))
    const choices = options(random, answer, [as(table(below(k)), 'table'), as(table(below(k) - 5000), 'half'), as(table(2 * below(-k)), 'double')])
    return choices && build(3, 'negative', say(`$P(Z\\le ${zLatex(k)})=${tableLatex(below(k))}$ bada, zenbat da $P(Z\\le ${zLatex(-k)})$?`, `Si $P(Z\\le ${zLatex(k)})=${tableLatex(below(k))}$, ¿cuánto vale $P(Z\\le ${zLatex(-k)})$?`, `إذا كان $P(Z\\le ${zLatex(k)})=${tableLatex(below(k))}$، فكم يساوي $P(Z\\le ${zLatex(-k)})$؟`, `If $P(Z\\le ${zLatex(k)})=${tableLatex(below(k))}$, what is $P(Z\\le ${zLatex(-k)})$?`), choices, answer, all(`1-${tableLatex(below(k))}=${tableLatex(below(-k))}`), { k: Math.round(k * 100) })
}

function centralQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const k = Math.round(someZ(random) * 100) / 100
    const answer = table(between(-k, k))
    const choices = options(random, answer, [as(table(below(k)), 'table'), as(table(2 * above(k)), 'double'), as(table(below(k) - 5000), 'half')])
    return choices && build(3, 'central', say(`$P(Z\\le ${zLatex(k)})=${tableLatex(below(k))}$ bada, zenbat da $P(${zLatex(-k)}\\le Z\\le ${zLatex(k)})$?`, `Si $P(Z\\le ${zLatex(k)})=${tableLatex(below(k))}$, ¿cuánto vale $P(${zLatex(-k)}\\le Z\\le ${zLatex(k)})$?`, `إذا كان $P(Z\\le ${zLatex(k)})=${tableLatex(below(k))}$، فكم يساوي $P(${zLatex(-k)}\\le Z\\le ${zLatex(k)})$؟`, `If $P(Z\\le ${zLatex(k)})=${tableLatex(below(k))}$, what is $P(${zLatex(-k)}\\le Z\\le ${zLatex(k)})$?`), choices, answer, all(`2\\cdot ${tableLatex(below(k))}-1=${tableLatex(between(-k, k))}`), { k: Math.round(k * 100) })
}

function scoreQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const sd = pick(random, [2, 4, 5, 10])
    const mean = 5 * randomInt(random, 4, 30)
    const steps = randomInt(random, 1, 10)
    const x = mean + steps
    const answer = fraction(steps, sd)
    const choices = options(random, answer, [as(fraction(steps, sd * sd), 'variance'), as(fraction(steps), 'divide'), as(fraction(x, sd), 'calculation')])
    return choices && build(3, 'score', say(`$X$ aldagaia $N(${mean};\\,${sd})$ da. Zein da $x=${x}$ balioaren $${'{z}'}$?`, `$X$ sigue una $N(${mean};\\,${sd})$. ¿Cuál es la $${'{z}'}$ de $x=${x}$?`, `يتبع $X$ التوزيع $N(${mean};\\,${sd})$. ما قيمة $${'{z}'}$ للقيمة $x=${x}$؟`, `$X$ follows $N(${mean};\\,${sd})$. What is the $${'{z}'}$ of $x=${x}$?`), choices, answer, all(`{z}=\\frac{${x}-${mean}}{${sd}}=${written(answer)}`), { mean, sd, x })
}

/* ---------- Circuit 4: approximation ---------- */

const CASES = [{ n: 100, p: 5, sd: 5 }, { n: 16, p: 5, sd: 2 }, { n: 25, p: 2, sd: 2 }, { n: 400, p: 5, sd: 10 }, { n: 225, p: 2, sd: 6 }, { n: 48, p: 2.5, sd: 3 }, { n: 100, p: 1, sd: 3 }]

function sigmaQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const { n, p, sd } = pick(random, CASES)
    const answer = fraction(sd)
    const choices = options(random, answer, [as(fraction(sd * sd), 'variance'), as(fraction(n * p, 10), 'mean'), as(fraction(sd + 1), 'calculation')])
    return choices && build(4, 'sigma', say(`$B(${n};\\,${tenths(p)})$ normal batez hurbiltzen da. Zein da haren $\\sigma$?`, `$B(${n};\\,${tenths(p)})$ se aproxima por una normal. ¿Cuál es su $\\sigma$?`, `يُقرَّب $B(${n};\\,${tenths(p)})$ بتوزيع طبيعي. ما $\\sigma$ له؟`, `$B(${n};\\,${tenths(p)})$ is approximated by a normal. What is its $\\sigma$?`), choices, answer, all(`\\sigma=\\sqrt{${sd * sd}}=${sd}`), { n, p: p * 10, sd })
}

function edgeQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const k = randomInt(random, 10, 90)
    const kind = pick(random, ['le', 'ge', 'lt', 'gt'] as const)
    const edge = kind === 'le' || kind === 'gt' ? k + 0.5 : k - 0.5
    const other = kind === 'le' || kind === 'gt' ? k - 0.5 : k + 0.5
    const answer = fraction(Math.round(edge * 2), 2)
    const asked = kind === 'le' ? `P(X\\le ${k})\\approx P(Y\\le a)` : kind === 'ge' ? `P(X\\ge ${k})\\approx P(Y\\ge a)` : kind === 'lt' ? `P(X<${k})\\approx P(Y\\le a)` : `P(X>${k})\\approx P(Y\\ge a)`
    const choices = options(random, answer, [as(fraction(k), 'correction'), as(fraction(Math.round(other * 2), 2), 'side'), as(fraction(k + 1), 'calculation')])
    return choices && build(4, 'edge', say(`Jarraitutasun-zuzenketarekin, $${asked}$. Zenbat da $a$?`, `Con la corrección de continuidad, $${asked}$. ¿Cuánto vale $a$?`, `مع تصحيح الاتصال $${asked}$. كم يساوي $a$؟`, `With the continuity correction, $${asked}$. What is $a$?`), choices, answer, all(`a=${written(answer)}`), { k, edge: edge * 10 })
}

function approxQuestion(random: Random): DistributionsBatx2RaceQuestion | null {
    const k = 50 + randomInt(random, -12, 12)
    if (k === 50) return null
    const z = Math.round(((k + 0.5 - 50) / 5) * 100) / 100
    const plain = Math.round(((k - 50) / 5) * 100) / 100
    const answer = table(below(z))
    const choices = options(random, answer, [as(table(below(plain)), 'correction'), as(table(above(z)), 'table'), as(table(below(Math.round(((k - 0.5 - 50) / 5) * 100) / 100)), 'side')])
    return choices && build(4, 'approx', say(`$X$ aldagaia $B(100;\\,0{,}5)$ da. Normalarekin, zenbat da $P(X\\le ${k})$?`, `$X$ sigue una $B(100;\\,0{,}5)$. Con la normal, ¿cuánto vale $P(X\\le ${k})$?`, `يتبع $X$ التوزيع $B(100;\\,0{,}5)$. بالتوزيع الطبيعي، كم يساوي $P(X\\le ${k})$؟`, `$X$ follows $B(100;\\,0{,}5)$. Using the normal, what is $P(X\\le ${k})$?`), choices, answer, all(`P(Z\\le ${zLatex(z)})=${tableLatex(below(z))}`), { k })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => DistributionsBatx2RaceQuestion | null>> = [
    [coefficientQuestion, tableMeanQuestion],
    [missingQuestion, meanQuestion, gainQuestion],
    [pmfQuestion, binomialMeanQuestion, binomialVarianceQuestion, atLeastQuestion],
    [aboveQuestion, negativeQuestion, centralQuestion, scoreQuestion],
    [sigmaQuestion, edgeQuestion, approxQuestion]
]

export function generateDistributionsBatx2RaceQuestion(random: Random, circuit: number, tier: Tier): DistributionsBatx2RaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkDistributionsBatx2PitAnswer(question: RaceQuestion<DistributionsBatx2RaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer, question.answerForm)
}

export function distributionsBatx2ParTime(circuit: number): number {
    return parTimeFor([11, 12, 14, 13, 13][circuit] ?? 13)
}

export const distributionsBatx2RaceErrorTips: Record<DistributionsBatx2RaceError, LocalizedText> = {
    order: say('Ordenarik gabe aukeratzen da: zatitu $k!$ zenbakiaz.', 'Se elige sin orden: divide entre $k!$.', 'نختار دون ترتيب: اقسم على $k!$.', 'Choose with no order: divide by $k!$.'),
    weights: say('Balio bakoitzak bere probabilitatearen pisua du.', 'Cada valor pesa según su probabilidad.', 'لكل قيمة وزن بحسب احتمالها.', 'Each value is weighted by its probability.'),
    sum: say('Guztiek 1 egiten dute batuta: falta dena 1 ken besteak da.', 'Todas suman 1: la que falta es 1 menos las demás.', 'مجموعها كلها 1: الناقص هو 1 ناقص الباقي.', 'They all add up to 1: the missing one is 1 minus the others.'),
    cost: say('Ez ahaztu jokatzeak balio duena kentzea.', 'No olvides restar lo que cuesta jugar.', 'لا تنسَ طرح كلفة اللعب.', 'Do not forget to subtract what it costs to play.'),
    probability: say('Saria haren probabilitateaz biderkatzen da.', 'El premio se multiplica por su probabilidad.', 'تُضرب الجائزة في احتمالها.', 'The prize is multiplied by its probability.'),
    coefficient: say('Ez ahaztu ordenak: $\\binom{n}{k}$.', 'No olvides los órdenes: $\\binom{n}{k}$.', 'لا تنسَ الترتيبات: $\\binom{n}{k}$.', 'Do not forget the orders: $\\binom{n}{k}$.'),
    variance: say('Hori bariantza da; $\\sigma$ haren erroa da.', 'Eso es la varianza; $\\sigma$ es su raíz.', 'هذا هو التباين؛ و$\\sigma$ جذره.', 'That is the variance; $\\sigma$ is its root.'),
    mean: say('Hori batez bestekoa da, $np$.', 'Eso es la media, $np$.', 'هذا هو المتوسط $np$.', 'That is the mean, $np$.'),
    pq: say('$p$ arrakasta da eta $q=1-p$ porrota: ez nahastu.', '$p$ es el éxito y $q=1-p$ el fracaso: no los cambies.', '$p$ النجاح و$q=1-p$ الفشل: لا تبدّلهما.', '$p$ is success and $q=1-p$ failure: do not swap them.'),
    multiply: say('«Gutxienez bat» kalkulatzeko, erabili aurkakoa: $1-q^n$.', 'Para «al menos uno», usa el contrario: $1-q^n$.', 'لـ «واحد على الأقل» استعمل المعاكس: $1-q^n$.', 'For ‘at least one’, use the complement: $1-q^n$.'),
    table: say('Taulak azpikoa ematen du; gainetik, 1 ken taula.', 'La tabla da lo de debajo; por encima, 1 menos la tabla.', 'يعطي الجدول ما تحت؛ وفوق: 1 ناقص الجدول.', 'The table gives what lies below; above, 1 minus the table.'),
    half: say('Kanpaiaren erdia 0 zenbakiaren alde bakoitzean dago.', 'La mitad de la campana está a cada lado del 0.', 'نصف الجرس في كل جانب من 0.', 'Half the bell lies on each side of 0.'),
    double: say('Isats bakarra da, ez bi.', 'Es una sola cola, no dos.', 'إنه ذيل واحد لا ذيلان.', 'It is a single tail, not two.'),
    divide: say('Tipifikatzean, zatitu $\\sigma$ zenbakiaz.', 'Al tipificar, divide entre $\\sigma$.', 'عند التوحيد اقسم على $\\sigma$.', 'When standardising, divide by $\\sigma$.'),
    correction: say('Gehitu edo kendu puntu erdia: barrak 1 zabalerakoak dira.', 'Suma o resta medio punto: las barras miden 1 de ancho.', 'أضف نصف وحدة أو اطرحها: عرض الأعمدة 1.', 'Add or subtract half a unit: the bars are 1 wide.'),
    side: say('Pentsatu $k$ balioa sartzen den ala ez: puntu erdia alde horretara.', 'Piensa si $k$ entra o no: el medio punto va hacia ese lado.', 'فكّر هل تدخل $k$ أم لا: نصف الوحدة نحو تلك الجهة.', 'Think whether $k$ is in or not: the half unit goes that way.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
