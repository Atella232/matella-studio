import { checkAnswer, fraction, toNumber, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { below } from '../../batx2-zientziak-banaketak/normal.ts'
import { criticalZ } from '../../batx2-gizarte-banaketak/critical.ts'

/* ==========================================================================
   Laginketaren lasterketa (Batxilergoa 2 · Gizarte Zientziak): five
   circuits, one per stage — sampling (the step, the k-th one chosen),
   strata (a proportional share, an equal share), the sample mean (σ/√n,
   a probability of X̄), the sample proportion (p̂, √(pq/n)) and the
   characteristic intervals (the radius, an end). The wrong options are
   the typical mistakes. Every normal value comes from the table; every
   question carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const SAMPLING_BATX2G_RACE_CIRCUITS = 5

export type SamplingBatx2gRaceError = 'inverted' | 'off-by-one' | 'equal' | 'not-divided' | 'no-root' | 'table' | 'critical' | 'side' | 'calculation'

export type SamplingBatx2gRaceQuestion = RaceQuestion<SamplingBatx2gRaceError> & { meta: Record<string, number> }

interface Candidate {
    value: FractionValue
    error: SamplingBatx2gRaceError
}
const as = (value: FractionValue, error: SamplingBatx2gRaceError): Candidate => ({ value, error })
/** A decimal with up to six places as an exact fraction */
const exact = (value: number) => fraction(Math.round(value * 1e6), 1e6)
const nearby = (value: FractionValue): Candidate[] => {
    const number = toNumber(value)
    if (Number.isInteger(number)) return [number + 1, number - 1, number * 2].map((item) => as(fraction(item), 'calculation'))
    return [number * 2, number / 2, number + 0.1].map((item) => as(exact(item), 'calculation'))
}

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<SamplingBatx2gRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SamplingBatx2gRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SamplingBatx2gRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): SamplingBatx2gRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const all = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
const dec = (value: number) => String(Math.round(value * 1e6) / 1e6).replace('.', '{,}')

/* ---------- Circuit 0: sampling ---------- */

function stepQuestion(random: Random): SamplingBatx2gRaceQuestion | null {
    const n = pick(random, [20, 25, 40, 50, 60])
    const h = randomInt(random, 8, 30)
    const population = n * h
    const answer = fraction(h)
    const choices = options(random, answer, [as(fraction(n, population), 'inverted'), as(fraction(population - n), 'calculation')])
    return choices && build(0, 'step', say(`${population} pertsonatik ${n} laguneko lagin sistematikoa. Zein da jauzia?`, `Muestra sistemática de ${n} entre ${population} personas. ¿Cuál es el salto?`, `عيّنة منتظمة من ${n} بين ${population} شخصًا. ما القفزة؟`, `A systematic sample of ${n} among ${population} people. What is the step?`), choices, answer, all(`h=\\frac{${population}}{${n}}=${h}`), { population, n })
}

function chosenQuestion(random: Random): SamplingBatx2gRaceQuestion | null {
    const h = pick(random, [10, 20, 25, 30, 40])
    const start = randomInt(random, 1, h)
    const k = randomInt(random, 3, 9)
    const answer = fraction(start + (k - 1) * h)
    const choices = options(random, answer, [as(fraction(start + k * h), 'off-by-one'), as(fraction(k * h), 'calculation')])
    return choices && build(0, 'chosen', say(`Jauzia $h=${h}$ da, eta lehena ${start} zenbakia. Zein da ${k}. aukeratua?`, `El salto es $h=${h}$ y el primero, el ${start}. ¿Quién es el elegido número ${k}?`, `القفزة $h=${h}$ والأول هو ${start}. من المختار رقم ${k}؟`, `The step is $h=${h}$ and the first is ${start}. Who is chosen number ${k}?`), choices, answer, all(`${start}+${k - 1}\\cdot ${h}=${start + (k - 1) * h}`), { h, start, k })
}

/* ---------- Circuit 1: strata ---------- */

function shareQuestion(random: Random): SamplingBatx2gRaceQuestion | null {
    const n = pick(random, [20, 30, 40, 50, 60, 80])
    const unit = pick(random, [10, 20, 50])
    const parts = [randomInt(random, 1, 6), randomInt(random, 1, 6), randomInt(random, 1, 6)]
    const sizes = parts.map((part) => part * unit)
    const total = sizes.reduce((a, b) => a + b, 0)
    const share = (n * sizes[0]) / total
    if (!Number.isInteger(share)) return null
    const answer = fraction(share)
    const choices = options(random, answer, [as(fraction(n, 3), 'equal'), as(fraction(n * sizes[0], 1000), 'calculation')])
    return choices && build(1, 'share', say(`Geruzak: $N_A=${sizes[0]}$, $N_B=${sizes[1]}$ eta $N_C=${sizes[2]}$. ${n} laguneko lagin proportzionalean, zenbat A geruzatik?`, `Estratos: $N_A=${sizes[0]}$, $N_B=${sizes[1]}$ y $N_C=${sizes[2]}$. En una muestra proporcional de ${n}, ¿cuántos de A?`, `الطبقات: $N_A=${sizes[0]}$ و$N_B=${sizes[1]}$ و$N_C=${sizes[2]}$. في عيّنة تناسبية من ${n}، كم من A؟`, `Strata: $N_A=${sizes[0]}$, $N_B=${sizes[1]}$ and $N_C=${sizes[2]}$. In a proportional sample of ${n}, how many from A?`), choices, answer, all(`${n}\\cdot\\frac{${sizes[0]}}{${total}}=${share}`), { n, a: sizes[0], b: sizes[1], c: sizes[2] })
}

function equalQuestion(random: Random): SamplingBatx2gRaceQuestion | null {
    const k = randomInt(random, 3, 6)
    const each = randomInt(random, 5, 30)
    const n = k * each
    const population = 100 * randomInt(random, 10, 40)
    const answer = fraction(each)
    const choices = options(random, answer, [as(fraction(n, 2), 'calculation'), as(fraction(population, k), 'calculation')])
    return choices && build(1, 'equal', say(`${k} geruza eta ${n} laguneko lagina, esleipen berdinarekin. Zenbat geruza bakoitzetik?`, `${k} estratos y una muestra de ${n} con afijación igual. ¿Cuántos de cada estrato?`, `${k} طبقات وعيّنة من ${n} بالتوزيع المتساوي. كم من كل طبقة؟`, `${k} strata and a sample of ${n} with equal allocation. How many from each stratum?`), choices, answer, all(`\\frac{${n}}{${k}}=${each}`), { k, n })
}

/* ---------- Circuit 2: the sample mean ---------- */

function meanSdQuestion(random: Random): SamplingBatx2gRaceQuestion | null {
    const root = randomInt(random, 2, 10)
    const sd = root * randomInt(random, 1, 5)
    const answer = fraction(sd / root)
    const choices = options(random, answer, [as(exact(sd / (root * root)), 'no-root'), as(fraction(sd), 'not-divided')])
    return choices && build(2, 'mean-sd', say(`$\\sigma=${sd}$ eta $n=${root * root}$. Zein da $\\bar{X}$ aldagaiaren desbideratze tipikoa?`, `$\\sigma=${sd}$ y $n=${root * root}$. ¿Cuál es la desviación típica de $\\bar{X}$?`, `$\\sigma=${sd}$ و$n=${root * root}$. ما الانحراف المعياري لـ $\\bar{X}$؟`, `$\\sigma=${sd}$ and $n=${root * root}$. What is the standard deviation of $\\bar{X}$?`), choices, answer, all(`\\frac{${sd}}{\\sqrt{${root * root}}}=${sd / root}`), { sd, n: root * root })
}

function meanTailQuestion(random: Random): SamplingBatx2gRaceQuestion | null {
    const root = pick(random, [3, 4, 5, 10])
    const s = randomInt(random, 1, 4)
    const sd = root * s
    const mean = 10 * randomInt(random, 3, 12)
    const z = pick(random, [1, 1.5, 2])
    const x = mean + z * s
    const right = 10_000 - below(z)
    const answer = fraction(right, 10_000)
    const wrongZ = Math.round((z / root) * 100) / 100
    const choices = options(random, answer, [as(fraction(below(z), 10_000), 'table'), as(fraction(10_000 - below(wrongZ), 10_000), 'not-divided')])
    return choices && build(2, 'mean-tail', say(`$X\\sim N(${mean};\\,${sd})$ eta $n=${root * root}$. Zenbat da $P(\\bar{X}>${dec(x)})$?`, `$X\\sim N(${mean};\\,${sd})$ y $n=${root * root}$. ¿Cuánto vale $P(\\bar{X}>${dec(x)})$?`, `$X\\sim N(${mean};\\,${sd})$ و$n=${root * root}$. كم يساوي $P(\\bar{X}>${dec(x)})$؟`, `$X\\sim N(${mean};\\,${sd})$ and $n=${root * root}$. What is $P(\\bar{X}>${dec(x)})$?`), choices, answer, all(`z=\\frac{${dec(x)}-${mean}}{${s}}=${dec(z)}\\ \\to\\ ${written(answer)}`), { mean, sd, n: root * root, x, z })
}

/* ---------- Circuit 3: the sample proportion ---------- */

function proportionQuestion(random: Random): SamplingBatx2gRaceQuestion | null {
    const n = pick(random, [50, 100, 200, 250, 400, 500])
    const x = randomInt(random, 1, 19) * (n / 20)
    const answer = exact(x / n)
    const choices = options(random, answer, [as(exact(n / x), 'inverted'), as(exact((n - x) / n), 'calculation')])
    return choices && build(3, 'proportion', say(`${n} pertsonatik, ${x} pertsonak baietz diote. Zenbat da $\\hat{p}$?`, `De ${n} personas, ${x} dicen que sí. ¿Cuánto vale $\\hat{p}$?`, `من ${n} شخص يقول ${x} نعم. كم يساوي $\\hat{p}$؟`, `Of ${n} people, ${x} say yes. What is $\\hat{p}$?`), choices, answer, all(`\\hat{p}=\\frac{${x}}{${n}}=${dec(x / n)}`), { n, x })
}

function proportionSdQuestion(random: Random): SamplingBatx2gRaceQuestion | null {
    const [p, n] = pick(random, [[0.5, 100], [0.5, 400], [0.5, 625], [0.2, 100], [0.2, 400], [0.1, 900], [0.4, 600], [0.1, 100]] as const)
    const sd = Math.sqrt((p * (1 - p)) / n)
    const answer = exact(sd)
    const choices = options(random, answer, [as(exact((p * (1 - p)) / n), 'no-root'), as(exact(Math.sqrt(p * (1 - p))), 'not-divided')])
    return choices && build(3, 'proportion-sd', say(`$p=${dec(p)}$ eta $n=${n}$. Zein da $\\hat{p}$ aldagaiaren desbideratze tipikoa?`, `$p=${dec(p)}$ y $n=${n}$. ¿Cuál es la desviación típica de $\\hat{p}$?`, `$p=${dec(p)}$ و$n=${n}$. ما الانحراف المعياري لـ $\\hat{p}$؟`, `$p=${dec(p)}$ and $n=${n}$. What is the standard deviation of $\\hat{p}$?`), choices, answer, all(`\\sqrt{\\frac{${dec(p * (1 - p))}}{${n}}}=${dec(sd)}`), { p, n })
}

/* ---------- Circuit 4: characteristic intervals ---------- */

function radiusQuestion(random: Random): SamplingBatx2gRaceQuestion | null {
    const level = pick(random, [90, 95, 99])
    const z = criticalZ(level)
    const root = pick(random, [2, 3, 4, 5, 10])
    const s = randomInt(random, 1, 4)
    const sd = root * s
    const answer = exact(z * s)
    const other = criticalZ(level === 95 ? 90 : 95)
    const choices = options(random, answer, [as(exact(z * sd), 'not-divided'), as(exact(other * s), 'critical')])
    return choices && build(4, 'radius', say(`$\\sigma=${sd}$ eta $n=${root * root}$. Zein da batez bestekoen tartearen erradioa, %\u00a0${level} probabilitatearekin?`, `$\\sigma=${sd}$ y $n=${root * root}$. ¿Cuál es el radio del intervalo del ${level}\u00a0% de las medias?`, `$\\sigma=${sd}$ و$n=${root * root}$. ما نصف قطر فترة ${level}\u00a0% للمتوسطات؟`, `$\\sigma=${sd}$ and $n=${root * root}$. What is the radius of the ${level}% interval of the means?`), choices, answer, all(`${dec(z)}\\cdot\\frac{${sd}}{\\sqrt{${root * root}}}=${dec(z * s)}`), { level, sd, n: root * root })
}

function endQuestion(random: Random): SamplingBatx2gRaceQuestion | null {
    const z = criticalZ(95)
    const root = pick(random, [2, 4, 5, 10])
    const s = randomInt(random, 1, 3)
    const sd = root * s
    const mean = 10 * randomInt(random, 4, 20)
    const answer = exact(mean - z * s)
    const choices = options(random, answer, [as(exact(mean + z * s), 'side'), as(exact(mean - z * sd), 'not-divided')])
    return choices && build(4, 'end', say(`$N(${mean};\\,${sd})$ eta $n=${root * root}$. Zein da batez bestekoen tartearen beheko muga, %\u00a095 probabilitatearekin?`, `$N(${mean};\\,${sd})$ y $n=${root * root}$. ¿Cuál es el extremo inferior del intervalo del 95\u00a0% de las medias?`, `$N(${mean};\\,${sd})$ و$n=${root * root}$. ما الطرف الأدنى لفترة 95\u00a0% للمتوسطات؟`, `$N(${mean};\\,${sd})$ and $n=${root * root}$. What is the lower end of the 95% interval of the means?`), choices, answer, all(`${mean}-1{,}96\\cdot ${s}=${dec(mean - z * s)}`), { mean, sd, n: root * root })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => SamplingBatx2gRaceQuestion | null>> = [
    [stepQuestion, chosenQuestion],
    [shareQuestion, equalQuestion],
    [meanSdQuestion, meanTailQuestion],
    [proportionQuestion, proportionSdQuestion],
    [radiusQuestion, endQuestion]
]

export function generateSamplingBatx2gRaceQuestion(random: Random, circuit: number, tier: Tier): SamplingBatx2gRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSamplingBatx2gPitAnswer(question: RaceQuestion<SamplingBatx2gRaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer, question.answerForm)
}

export function samplingBatx2gParTime(circuit: number): number {
    return parTimeFor([11, 12, 12, 12, 13][circuit] ?? 12)
}

export const samplingBatx2gRaceErrorTips: Record<SamplingBatx2gRaceError, LocalizedText> = {
    inverted: say('Zatiketa alderantziz egin duzu.', 'Has hecho la división al revés.', 'قسمت بالعكس.', 'You divided the wrong way round.'),
    'off-by-one': say('Lehena jada aukeratua dago: $k-1$ jauzi gehitu.', 'El primero ya está elegido: suma $k-1$ saltos.', 'الأول مختار سلفًا: أضف $k-1$ قفزة.', 'The first is already chosen: add $k-1$ steps.'),
    equal: say('Proportzionala da, ez berdina: geruza bakoitzak bere pisua.', 'Es proporcional, no igual: cada estrato según su peso.', 'التوزيع تناسبي لا متساوٍ: كل طبقة حسب وزنها.', 'It is proportional, not equal: each stratum by its weight.'),
    'not-divided': say('Ez ahaztu $\\sqrt{n}$ zenbakiaz zatitzea.', 'No olvides dividir entre $\\sqrt{n}$.', 'لا تنسَ القسمة على $\\sqrt{n}$.', 'Do not forget to divide by $\\sqrt{n}$.'),
    'no-root': say('Desbideratzeak erroa behar du.', 'La desviación lleva raíz.', 'الانحراف يحتاج إلى جذر.', 'The deviation needs the root.'),
    table: say('Taulak azpikoa ematen du; gainetik, 1 ken taula.', 'La tabla da lo de debajo; por encima, 1 menos la tabla.', 'يعطي الجدول ما تحت؛ وفوق: 1 ناقص الجدول.', 'The table gives what lies below; above, 1 minus the table.'),
    critical: say('Balio kritikoak: 1,645 (% 90), 1,96 (% 95), 2,575 (% 99).', 'Valores críticos: 1,645 (90 %), 1,96 (95 %), 2,575 (99 %).', 'القيم الحرجة: 1.645 (90 %) و1.96 (95 %) و2.575 (99 %).', 'Critical values: 1.645 (90%), 1.96 (95%), 2.575 (99%).'),
    side: say('Beheko muga: batez bestekoa ken erradioa.', 'El extremo inferior: la media menos el radio.', 'الطرف الأدنى: المتوسط ناقص نصف القطر.', 'The lower end: the mean minus the radius.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
