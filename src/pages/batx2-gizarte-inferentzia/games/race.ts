import { checkAnswer, fraction, toNumber, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { criticalZ, inverseZ } from '../../batx2-gizarte-banaketak/critical.ts'

/* ==========================================================================
   Inferentziaren lasterketa (Batxilergoa 2 · Gizarte Zientziak): five
   circuits, one per stage — estimation (p̂, the critical value), the
   interval for the mean (the error, an end), error and size (the sample
   size, rounded up), the proportion (its error, its size with no data)
   and decisions (the margin of a poll, the midpoint of an interval). The
   wrong options are the typical mistakes; every question carries `meta`,
   the numbers the tests check it against.
   ========================================================================== */

export const INFERENCE_BATX2G_RACE_CIRCUITS = 5

export type InferenceBatx2gRaceError = 'inverted' | 'level-as-phi' | 'critical' | 'not-divided' | 'side' | 'round-down' | 'not-squared' | 'no-root' | 'not-worst-case' | 'whole-width' | 'calculation'

export type InferenceBatx2gRaceQuestion = RaceQuestion<InferenceBatx2gRaceError> & { meta: Record<string, number> }

interface Candidate {
    value: FractionValue
    error: InferenceBatx2gRaceError
}
const as = (value: FractionValue, error: InferenceBatx2gRaceError): Candidate => ({ value, error })
const exact = (value: number) => fraction(Math.round(value * 1e6), 1e6)
const up = (value: number) => Math.ceil(value - 1e-9)
const nearby = (value: FractionValue): Candidate[] => {
    const number = toNumber(value)
    if (Number.isInteger(number)) return [number + 1, number - 1, number * 2].map((item) => as(fraction(item), 'calculation'))
    return [number * 2, number / 2, number + 0.1].map((item) => as(exact(item), 'calculation'))
}

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<InferenceBatx2gRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: InferenceBatx2gRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<InferenceBatx2gRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): InferenceBatx2gRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const all = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
const dec = (value: number) => String(Math.round(value * 1e6) / 1e6).replace('.', '{,}')
const LEVELS = [80, 90, 94, 95, 96, 98, 99] as const

/* ---------- Circuit 0: estimation ---------- */

function proportionQuestion(random: Random): InferenceBatx2gRaceQuestion | null {
    const n = pick(random, [40, 50, 80, 100, 200, 250, 400, 500])
    const x = randomInt(random, 1, 19) * (n / 20)
    const answer = exact(x / n)
    const choices = options(random, answer, [as(exact(n / x), 'inverted'), as(exact((n - x) / n), 'calculation')])
    return choices && build(0, 'proportion', say(`${n} pertsonatik, ${x} pertsonak baietz diote. Zenbat da $\\hat{p}$?`, `De ${n} personas, ${x} dicen que sí. ¿Cuánto vale $\\hat{p}$?`, `من ${n} شخص يقول ${x} نعم. كم يساوي $\\hat{p}$؟`, `Of ${n} people, ${x} say yes. What is $\\hat{p}$?`), choices, answer, all(`\\hat{p}=\\frac{${x}}{${n}}=${dec(x / n)}`), { n, x })
}

function criticalQuestion(random: Random): InferenceBatx2gRaceQuestion | null {
    const level = pick(random, LEVELS)
    const answer = exact(criticalZ(level))
    const index = LEVELS.indexOf(level)
    const neighbour = LEVELS[index + 1] ?? LEVELS[index - 1]
    const choices = options(random, answer, [as(exact(inverseZ(level * 100)), 'level-as-phi'), as(exact(criticalZ(neighbour)), 'critical')])
    return choices && build(0, 'critical', say(`Zein da balio kritikoa, %\u00a0${level} mailan?`, `¿Cuál es el valor crítico al ${level}\u00a0%?`, `ما القيمة الحرجة عند ${level}\u00a0%؟`, `What is the critical value at ${level}%?`), choices, answer, all(`1-\\frac{${dec(1 - level / 100)}}{2}=${dec(1 - (1 - level / 100) / 2)}\\ \\to\\ ${dec(criticalZ(level))}`), { level })
}

/* ---------- Circuit 1: the interval for the mean ---------- */

function errorQuestion(random: Random): InferenceBatx2gRaceQuestion | null {
    const level = pick(random, [90, 95, 99] as const)
    const z = criticalZ(level)
    const root = pick(random, [2, 3, 4, 5, 10])
    const s = randomInt(random, 1, 4)
    const answer = exact(z * s)
    const other = criticalZ(level === 95 ? 90 : 95)
    const choices = options(random, answer, [as(exact(z * s * root), 'not-divided'), as(exact(other * s), 'critical')])
    return choices && build(1, 'error', say(`$\\sigma=${s * root}$ eta $n=${root * root}$. Zein da errorea, %\u00a0${level} mailan?`, `$\\sigma=${s * root}$ y $n=${root * root}$. ¿Cuál es el error al ${level}\u00a0%?`, `$\\sigma=${s * root}$ و$n=${root * root}$. ما الخطأ عند ${level}\u00a0%؟`, `$\\sigma=${s * root}$ and $n=${root * root}$. What is the error at ${level}%?`), choices, answer, all(`${dec(z)}\\cdot\\frac{${s * root}}{\\sqrt{${root * root}}}=${dec(z * s)}`), { level, sd: s * root, n: root * root })
}

function endQuestion(random: Random): InferenceBatx2gRaceQuestion | null {
    const z = criticalZ(95)
    const root = pick(random, [2, 4, 5, 10])
    const s = randomInt(random, 1, 3)
    const mean = 10 * randomInt(random, 4, 20)
    const answer = exact(mean - z * s)
    const choices = options(random, answer, [as(exact(mean + z * s), 'side'), as(exact(mean - z * s * root), 'not-divided')])
    return choices && build(1, 'end', say(`$\\bar{x}=${mean}$, $\\sigma=${s * root}$ eta $n=${root * root}$. Zein da % 95 mailako tartearen beheko muga?`, `$\\bar{x}=${mean}$, $\\sigma=${s * root}$ y $n=${root * root}$. ¿Cuál es el extremo inferior del intervalo al 95 %?`, `$\\bar{x}=${mean}$ و$\\sigma=${s * root}$ و$n=${root * root}$. ما الطرف الأدنى لفترة 95 %؟`, `$\\bar{x}=${mean}$, $\\sigma=${s * root}$ and $n=${root * root}$. What is the lower end of the 95% interval?`), choices, answer, all(`${mean}-1{,}96\\cdot ${s}=${dec(mean - z * s)}`), { mean, sd: s * root, n: root * root })
}

/* ---------- Circuit 2: error and size ---------- */

function sizeQuestion(random: Random): InferenceBatx2gRaceQuestion | null {
    const level = pick(random, [90, 95, 99] as const)
    const z = criticalZ(level)
    const sd = 5 * randomInt(random, 1, 8)
    const e = pick(random, [1, 2, 3, 4, 5])
    const raw = ((z * sd) / e) ** 2
    if (Number.isInteger(Math.round(raw * 1e6) / 1e6) || raw < 10 || raw > 3000) return null
    const answer = fraction(up(raw))
    const choices = options(random, answer, [as(fraction(Math.floor(raw)), 'round-down'), as(fraction(up((z * sd) / e)), 'not-squared')])
    return choices && build(2, 'size', say(`$\\sigma=${sd}$. Zenbat pertsona behar dira $E\\le ${e}$ izateko, %\u00a0${level} mailan?`, `$\\sigma=${sd}$. ¿Cuántas personas hacen falta para $E\\le ${e}$ al ${level}\u00a0%?`, `$\\sigma=${sd}$. كم شخصًا نحتاج لـ $E\\le ${e}$ عند ${level}\u00a0%؟`, `$\\sigma=${sd}$. How many people are needed for $E\\le ${e}$ at ${level}%?`), choices, answer, all(`\\left(\\frac{${dec(z)}\\cdot ${sd}}{${e}}\\right)^2\\approx ${dec(Math.round(raw * 100) / 100)}\\ \\to\\ ${up(raw)}`), { level, sd, e })
}

function quarterQuestion(random: Random): InferenceBatx2gRaceQuestion | null {
    const error = pick(random, [2, 4, 6, 8, 10, 12])
    const factor = pick(random, [4, 9, 16, 25])
    const answer = exact(error / Math.sqrt(factor))
    const choices = options(random, answer, [as(exact(error / factor), 'not-squared'), as(exact(error * Math.sqrt(factor)), 'calculation')])
    return choices && build(2, 'quarter', say(`Errorea ${error} da. Zein da errorea, $n$ bider ${factor} egiten bada?`, `El error es ${error}. ¿Cuál es el error si $n$ se multiplica por ${factor}?`, `الخطأ ${error}. ما الخطأ إذا ضُرب $n$ في ${factor}؟`, `The error is ${error}. What is the error if $n$ is multiplied by ${factor}?`), choices, answer, all(`\\frac{${error}}{\\sqrt{${factor}}}=${dec(error / Math.sqrt(factor))}`), { error, factor })
}

/* ---------- Circuit 3: the proportion ---------- */

function proportionErrorQuestion(random: Random): InferenceBatx2gRaceQuestion | null {
    const [p, n] = pick(random, [[0.5, 100], [0.5, 400], [0.5, 625], [0.2, 100], [0.2, 400], [0.1, 900], [0.4, 600], [0.5, 2500]] as const)
    const level = pick(random, [90, 95, 99] as const)
    const z = criticalZ(level)
    const sd = Math.sqrt((p * (1 - p)) / n)
    const answer = exact(z * sd)
    const choices = options(random, answer, [as(exact((z * p * (1 - p)) / n), 'no-root'), as(exact(criticalZ(level === 95 ? 99 : 95) * sd), 'critical')])
    return choices && build(3, 'proportion-error', say(`$\\hat{p}=${dec(p)}$ eta $n=${n}$. Zein da errorea, %\u00a0${level} mailan?`, `$\\hat{p}=${dec(p)}$ y $n=${n}$. ¿Cuál es el error al ${level}\u00a0%?`, `$\\hat{p}=${dec(p)}$ و$n=${n}$. ما الخطأ عند ${level}\u00a0%؟`, `$\\hat{p}=${dec(p)}$ and $n=${n}$. What is the error at ${level}%?`), choices, answer, all(`${dec(z)}\\cdot ${dec(sd)}=${dec(z * sd)}`), { p, n, level })
}

function proportionSizeQuestion(random: Random): InferenceBatx2gRaceQuestion | null {
    const e = pick(random, [0.02, 0.03, 0.04, 0.05])
    const level = pick(random, [90, 95] as const)
    const z = criticalZ(level)
    const raw = (z * z * 0.25) / (e * e)
    const answer = fraction(up(raw))
    const choices = options(random, answer, [as(fraction(up((z * z * 0.09) / (e * e))), 'not-worst-case'), as(fraction(Math.floor(raw)), 'round-down')])
    return choices && build(3, 'proportion-size', say(`Daturik gabe, zenbat pertsona behar dira $E\\le ${dec(e)}$ izateko, %\u00a0${level} mailan?`, `Sin datos previos, ¿cuántas personas hacen falta para $E\\le ${dec(e)}$ al ${level}\u00a0%?`, `بلا بيانات سابقة، كم شخصًا نحتاج لـ $E\\le ${dec(e)}$ عند ${level}\u00a0%؟`, `With no previous data, how many people are needed for $E\\le ${dec(e)}$ at ${level}%?`), choices, answer, all(`\\frac{${dec(z)}^2\\cdot 0{,}25}{${dec(e)}^2}\\approx ${dec(Math.round(raw * 100) / 100)}\\ \\to\\ ${up(raw)}`), { e, level })
}

/* ---------- Circuit 4: decisions ---------- */

function pollQuestion(random: Random): InferenceBatx2gRaceQuestion | null {
    const n = pick(random, [100, 400, 625, 1600, 2500])
    const sd = Math.sqrt(0.25 / n)
    const answer = exact(1.96 * sd)
    const choices = options(random, answer, [as(exact(sd), 'not-divided'), as(exact(1.645 * sd), 'critical')])
    return choices && build(4, 'poll', say(`Inkesta: ${n} elkarrizketa, % 95 maila eta kasurik txarrena. Zein da errore-marjina?`, `Encuesta: ${n} entrevistas, 95 % y el caso más desfavorable. ¿Cuál es el margen de error?`, `استطلاع: ${n} مقابلة و95 % وأسوأ حالة. ما هامش الخطأ؟`, `A poll: ${n} interviews, 95% and the worst case. What is the margin of error?`), choices, answer, all(`1{,}96\\cdot\\sqrt{\\frac{0{,}25}{${n}}}=${dec(1.96 * sd)}`), { n })
}

function widthQuestion(random: Random): InferenceBatx2gRaceQuestion | null {
    const mean = 10 * randomInt(random, 3, 20)
    const e = pick(random, [1.96, 2.94, 3.29, 3.92, 5.15, 5.88])
    const answer = exact(e)
    const choices = options(random, answer, [as(exact(2 * e), 'whole-width'), as(fraction(mean), 'calculation')])
    return choices && build(4, 'width', say(`Tartea $(${dec(mean - e)};\\ ${dec(mean + e)})$ da. Zenbat da errorea?`, `El intervalo es $(${dec(mean - e)};\\ ${dec(mean + e)})$. ¿Cuánto vale el error?`, `الفترة $(${dec(mean - e)};\\ ${dec(mean + e)})$. كم يساوي الخطأ؟`, `The interval is $(${dec(mean - e)};\\ ${dec(mean + e)})$. What is the error?`), choices, answer, all(`\\frac{${dec(mean + e)}-${dec(mean - e)}}{2}=${dec(e)}`), { mean, e })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => InferenceBatx2gRaceQuestion | null>> = [
    [proportionQuestion, criticalQuestion],
    [errorQuestion, endQuestion],
    [sizeQuestion, quarterQuestion],
    [proportionErrorQuestion, proportionSizeQuestion],
    [pollQuestion, widthQuestion]
]

export function generateInferenceBatx2gRaceQuestion(random: Random, circuit: number, tier: Tier): InferenceBatx2gRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkInferenceBatx2gPitAnswer(question: RaceQuestion<InferenceBatx2gRaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer, question.answerForm)
}

export function inferenceBatx2gParTime(circuit: number): number {
    return parTimeFor([11, 12, 14, 13, 12][circuit] ?? 12)
}

export const inferenceBatx2gRaceErrorTips: Record<InferenceBatx2gRaceError, LocalizedText> = {
    inverted: say('Zatiketa alderantziz egin duzu: $\\hat{p}=\\frac{x}{n}$.', 'Has dividido al revés: $\\hat{p}=\\frac{x}{n}$.', 'قسمت بالعكس: $\\hat{p}=\\frac{x}{n}$.', 'You divided the wrong way round: $\\hat{p}=\\frac{x}{n}$.'),
    'level-as-phi': say('Buztan bakoitzean $\\frac{\\alpha}{2}$: bilatu $1-\\frac{\\alpha}{2}$, ez maila.', 'En cada cola $\\frac{\\alpha}{2}$: busca $1-\\frac{\\alpha}{2}$, no el nivel.', 'في كل ذيل $\\frac{\\alpha}{2}$: ابحث عن $1-\\frac{\\alpha}{2}$ لا المستوى.', 'Each tail holds $\\frac{\\alpha}{2}$: look up $1-\\frac{\\alpha}{2}$, not the level.'),
    critical: say('Balio kritikoak: 1,645 (% 90), 1,96 (% 95), 2,575 (% 99).', 'Valores críticos: 1,645 (90 %), 1,96 (95 %), 2,575 (99 %).', 'القيم الحرجة: 1.645 (90 %) و1.96 (95 %) و2.575 (99 %).', 'Critical values: 1.645 (90%), 1.96 (95%), 2.575 (99%).'),
    'not-divided': say('Ez ahaztu $\\sqrt{n}$ zenbakiaz zatitzea.', 'No olvides dividir entre $\\sqrt{n}$.', 'لا تنسَ القسمة على $\\sqrt{n}$.', 'Do not forget to divide by $\\sqrt{n}$.'),
    side: say('Beheko muga: $\\bar{x}-E$.', 'El extremo inferior: $\\bar{x}-E$.', 'الطرف الأدنى: $\\bar{x}-E$.', 'The lower end: $\\bar{x}-E$.'),
    'round-down': say('Gorantz biribildu beti.', 'Redondea siempre hacia arriba.', 'قرّب دائمًا إلى الأعلى.', 'Always round up.'),
    'not-squared': say('$\\sqrt{n}$ da, ez $n$: karratura jaso.', 'Eso es $\\sqrt{n}$, no $n$: eleva al cuadrado.', 'هذا $\\sqrt{n}$ لا $n$: ربّع.', 'That is $\\sqrt{n}$, not $n$: square it.'),
    'no-root': say('Desbideratzeak erroa behar du: $\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.', 'La desviación lleva raíz: $\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.', 'الانحراف بالجذر: $\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.', 'The deviation has a root: $\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.'),
    'not-worst-case': say('Daturik gabe, $\\hat{p}=0{,}5$.', 'Sin datos, $\\hat{p}=0{,}5$.', 'بلا بيانات $\\hat{p}=0{,}5$.', 'With no data, $\\hat{p}=0{,}5$.'),
    'whole-width': say('Errorea zabaleraren erdia da.', 'El error es la mitad de la anchura.', 'الخطأ نصف العرض.', 'The error is half the width.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
