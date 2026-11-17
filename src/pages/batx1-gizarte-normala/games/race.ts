import { checkAnswer, fraction, toNumber, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { above, below, between, tableLatex, zLatex } from '../../batx2-zientziak-banaketak/normal.ts'

/* ==========================================================================
   Normalaren lasterketa (Batxilergoa 1 · Gizarte Zientziak): five
   circuits, one per stage — review (the height of a bar, a standard
   score), continuous (k of a rectangle or a triangle), normal (above,
   below a negative, between −k and k), approximation (σ of the normal,
   the edge of the half unit) and fit (a class mark, an expected count, a
   difference as a percentage). The wrong options are the typical
   mistakes; every question carries `meta`, the numbers the tests check.
   ========================================================================== */

export const NORMAL_BATX1G_RACE_CIRCUITS = 5

export type NormalBatx1gRaceError = 'width' | 'divide' | 'half' | 'table' | 'double' | 'variance' | 'correction' | 'side' | 'edge' | 'probability' | 'percent' | 'calculation'

export type NormalBatx1gRaceQuestion = RaceQuestion<NormalBatx1gRaceError> & { meta: Record<string, number> }

interface Candidate {
    value: FractionValue
    error: NormalBatx1gRaceError
}
const as = (value: FractionValue, error: NormalBatx1gRaceError): Candidate => ({ value, error })
const nearby = (value: FractionValue): Candidate[] => {
    const number = toNumber(value)
    if (Number.isInteger(number)) return [number + 1, number - 1, number * 2].map((item) => as(fraction(item), 'calculation'))
    return [fraction(value.numerator + 1, value.denominator), fraction(Math.max(1, value.numerator - 1), value.denominator), fraction(value.numerator, value.denominator + 1)].map((item) => as(item, 'calculation'))
}

function options(random: Random, right: FractionValue, candidates: Candidate[], allowNegative = false): RaceOption<NormalBatx1gRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: NormalBatx1gRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right)]) {
        if (wrong.length === 3) break
        if (!allowNegative && candidate.value.numerator < 0) continue
        const latex = written(candidate.value)
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<NormalBatx1gRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): NormalBatx1gRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const all = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
const table = (tenThousandths: number) => fraction(tenThousandths, 10_000)
const Z = '{z}'

/* ---------- Circuit 0: review ---------- */

function barQuestion(random: Random): NormalBatx1gRaceQuestion | null {
    const width = pick(random, [2, 4, 5, 10])
    const percent = 5 * randomInt(random, 2, 12)
    const answer = fraction(percent, 100 * width)
    const choices = options(random, answer, [as(fraction(percent, 100), 'width'), as(fraction(percent * width, 100), 'width')])
    return choices && build(0, 'bar', say(`${width} zabalerako klase batek % ${percent} du. Zein da barraren altuera?`, `Una clase de anchura ${width} tiene el ${percent} %. ¿Qué altura tiene la barra?`, `فئة عرضها ${width} لها ${percent}٪. ما ارتفاع العمود؟`, `A class of width ${width} has ${percent}%. How tall is the bar?`), choices, answer, all(`\\frac{${written(fraction(percent, 100))}}{${width}}=${written(answer)}`), { width, percent })
}

function scoreQuestion(random: Random): NormalBatx1gRaceQuestion | null {
    const sd = pick(random, [2, 4, 6, 10])
    const mean = 10 * randomInt(random, 2, 10)
    const steps = pick(random, [-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5])
    const x = mean + steps * sd
    const answer = fraction(Math.round(steps * 10), 10)
    const choices = options(random, answer, [as(fraction(Math.round(steps * 10), 10 * sd), 'divide'), as(fraction(Math.round(-steps * 10), 10), 'calculation')], true)
    return choices && build(0, 'score', say(`Batez bestekoa ${mean} da, eta $\\sigma=${sd}$. Zein da ${x} balioaren $${Z}$?`,`La media es ${mean} y $\\sigma=${sd}$. ¿Cuál es la $${Z}$ de ${x}?`, `المتوسط ${mean} و$\\sigma=${sd}$. ما $${Z}$ للقيمة ${x}؟`, `The mean is ${mean} and $\\sigma=${sd}$. What is the $${Z}$ of ${x}?`), choices, answer, all(`${Z}=\\frac{${x}-${mean}}{${sd}}=${written(answer)}`), { mean, sd, x })
}

/* ---------- Circuit 1: continuous ---------- */

function rectangleQuestion(random: Random): NormalBatx1gRaceQuestion | null {
    const base = pick(random, [2, 4, 5, 8, 10, 20])
    const answer = fraction(1, base)
    const choices = options(random, answer, [as(fraction(base), 'calculation'), as(fraction(1, 2 * base), 'half')])
    return choices && build(1, 'rectangle', say(`Dentsitate bat $k$ da 0 eta ${base} artean. Zenbat da $k$?`, `Una densidad vale $k$ entre 0 y ${base}. ¿Cuánto vale $k$?`, `كثافة تساوي $k$ بين 0 و${base}. كم يساوي $k$؟`, `A density is $k$ between 0 and ${base}. What is $k$?`), choices, answer, all(`${base}k=1\\qquad k=${written(answer)}`), { base })
}

function triangleQuestion(random: Random): NormalBatx1gRaceQuestion | null {
    const base = pick(random, [2, 4, 5, 10])
    const answer = fraction(2, base)
    const choices = options(random, answer, [as(fraction(1, base), 'half'), as(fraction(4, base), 'calculation')])
    return choices && build(1, 'triangle', say(`Dentsitate bat triangelu bat da, oinarria 0 eta ${base} artean. Zein da haren altuera?`, `Una densidad es un triángulo de base de 0 a ${base}. ¿Qué altura tiene?`, `كثافة على شكل مثلث قاعدته من 0 إلى ${base}. ما ارتفاعه؟`, `A density is a triangle with base from 0 to ${base}. How tall is it?`), choices, answer, all(`\\frac{${base}\\cdot h}{2}=1\\qquad h=${written(answer)}`), { base })
}

/* ---------- Circuit 2: normal ---------- */

function aboveQuestion(random: Random): NormalBatx1gRaceQuestion | null {
    const k = randomInt(random, 20, 250) / 100
    const answer = table(above(k))
    const choices = options(random, answer, [as(table(below(k)), 'table'), as(table(2 * above(k)), 'double')])
    return choices && build(2, 'above', say(`Zenbat da $P(Z>${zLatex(k)})$?`, `¿Cuánto vale $P(Z>${zLatex(k)})$?`, `كم يساوي $P(Z>${zLatex(k)})$؟`, `What is $P(Z>${zLatex(k)})$?`), choices, answer, all(`1-${tableLatex(below(k))}=${tableLatex(above(k))}`), { k: Math.round(k * 100) })
}

function negativeQuestion(random: Random): NormalBatx1gRaceQuestion | null {
    const k = randomInt(random, 20, 250) / 100
    const answer = table(below(-k))
    const choices = options(random, answer, [as(table(below(k)), 'table'), as(table(5000 - below(-k)), 'half')])
    return choices && build(2, 'negative', say(`Zenbat da $P(Z\\le -${zLatex(k)})$?`, `¿Cuánto vale $P(Z\\le -${zLatex(k)})$?`, `كم يساوي $P(Z\\le -${zLatex(k)})$؟`, `What is $P(Z\\le -${zLatex(k)})$?`), choices, answer, all(`1-${tableLatex(below(k))}=${tableLatex(below(-k))}`), { k: Math.round(k * 100) })
}

function centralQuestion(random: Random): NormalBatx1gRaceQuestion | null {
    const k = randomInt(random, 20, 250) / 100
    const answer = table(between(-k, k))
    const choices = options(random, answer, [as(table(below(k)), 'table'), as(table(between(0, k)), 'half')])
    return choices && build(2, 'central', say(`Zenbat da $P(-${zLatex(k)}\\le Z\\le ${zLatex(k)})$?`, `¿Cuánto vale $P(-${zLatex(k)}\\le Z\\le ${zLatex(k)})$?`, `كم يساوي $P(-${zLatex(k)}\\le Z\\le ${zLatex(k)})$؟`, `What is $P(-${zLatex(k)}\\le Z\\le ${zLatex(k)})$?`), choices, answer, all(`2\\cdot ${tableLatex(below(k))}-1=${tableLatex(between(-k, k))}`), { k: Math.round(k * 100) })
}

/* ---------- Circuit 3: approximation ---------- */

function sigmaQuestion(random: Random): NormalBatx1gRaceQuestion | null {
    const [n, p, sd] = pick(random, [[16, 5, 2], [100, 5, 5], [400, 5, 10], [25, 2, 2], [625, 2, 10], [100, 2, 4], [36, 5, 3], [64, 5, 4]])
    const answer = fraction(sd)
    const choices = options(random, answer, [as(fraction(sd * sd), 'variance'), as(fraction((n * p) / 10), 'calculation')])
    return choices && build(3, 'sigma', say(`Zein da $\\sigma$, $B(${n};\\,${written(fraction(p, 10))})$ hurbiltzen duen normalarena?`, `¿Cuál es la $\\sigma$ de la normal que aproxima a $B(${n};\\,${written(fraction(p, 10))})$?`, `ما $\\sigma$ للتوزيع الطبيعي الذي يقرّب $B(${n};\\,${written(fraction(p, 10))})$؟`, `What is the $\\sigma$ of the normal that approximates $B(${n};\\,${written(fraction(p, 10))})$?`), choices, answer, all(`\\sqrt{${sd * sd}}=${sd}`), { n, p, sd })
}

function edgeQuestion(random: Random): NormalBatx1gRaceQuestion | null {
    const k = randomInt(random, 10, 90)
    const kind = pick(random, ['le', 'ge', 'lt', 'gt'] as const)
    const value = kind === 'le' || kind === 'gt' ? k + 0.5 : k - 0.5
    const answer = fraction(Math.round(value * 10), 10)
    const other = kind === 'le' || kind === 'gt' ? k - 0.5 : k + 0.5
    const choices = options(random, answer, [as(fraction(Math.round(other * 10), 10), 'side'), as(fraction(k), 'correction')])
    const symbol = { le: '\\le', ge: '\\ge', lt: '<', gt: '>' }[kind]
    const target = kind === 'le' || kind === 'lt' ? '\\le' : '\\ge'
    return choices && build(3, 'edge', say(`Zuzenketarekin, $P(X${symbol} ${k})\\approx P(Y${target} a)$. Zenbat da $a$?`, `Con la corrección, $P(X${symbol} ${k})\\approx P(Y${target} a)$. ¿Cuánto vale $a$?`, `مع التصحيح $P(X${symbol} ${k})\\approx P(Y${target} a)$. كم يساوي $a$؟`, `With the correction, $P(X${symbol} ${k})\\approx P(Y${target} a)$. What is $a$?`), choices, answer, all(`a=${written(answer)}`), { k, value: Math.round(value * 10) })
}

/* ---------- Circuit 4: fit ---------- */

function markQuestion(random: Random): NormalBatx1gRaceQuestion | null {
    const width = pick(random, [2, 4, 5, 10, 20])
    const start = width * randomInt(random, 1, 15)
    const answer = fraction(2 * start + width, 2)
    const choices = options(random, answer, [as(fraction(start), 'edge'), as(fraction(start + width), 'edge')])
    return choices && build(4, 'mark', say(`Zein da ${start}–${start + width} klasearen marka?`, `¿Cuál es la marca de la clase ${start}–${start + width}?`, `ما مركز الفئة ${start}–${start + width}؟`, `What is the mark of the class ${start}–${start + width}?`), choices, answer, all(`\\frac{${start}+${start + width}}{2}=${written(answer)}`), { start, width })
}

function expectedQuestion(random: Random): NormalBatx1gRaceQuestion | null {
    const total = pick(random, [100, 200, 400, 500])
    const [from, to] = pick(random, [[0, 1], [-1, 0], [1, 2], [-2, -1]])
    const probability = between(from, to)
    const answer = fraction(total * probability, 10_000)
    const choices = options(random, answer, [as(table(probability), 'probability'), as(fraction(total * between(-1, 1), 10_000), 'calculation')])
    return choices && build(4, 'expected', say(`${total} datu eta $P(${from}\\le Z\\le ${to})$ duen klase bat. Zenbat datu espero dira?`, `${total} datos y una clase con $P(${from}\\le Z\\le ${to})$. ¿Cuántos datos se esperan?`, `${total} معطى وفئة احتمالها $P(${from}\\le Z\\le ${to})$. كم معطى يُتوقع؟`, `${total} data and a class with $P(${from}\\le Z\\le ${to})$. How many data are expected?`), choices, answer, all(`${total}\\cdot ${tableLatex(probability)}=${written(answer)}`), { total, from, to })
}

function percentQuestion(random: Random): NormalBatx1gRaceQuestion | null {
    const total = pick(random, [40, 50, 80, 100, 200, 400])
    const largest = randomInt(random, 1, 12)
    const answer = fraction(100 * largest, total)
    const choices = options(random, answer, [as(fraction(largest, total), 'percent'), as(fraction(largest), 'percent')])
    return choices && build(4, 'percent', say(`${total} datu, eta diferentziarik handiena ${largest}. Zer ehuneko da?`, `${total} datos y la mayor diferencia es ${largest}. ¿Qué porcentaje es?`, `${total} معطى وأكبر فرق ${largest}. ما النسبة المئوية؟`, `${total} data and the largest difference is ${largest}. What percentage is it?`), choices, answer, all(`\\frac{${largest}}{${total}}\\cdot 100=${written(answer)}`), { total, largest })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => NormalBatx1gRaceQuestion | null>> = [
    [barQuestion, scoreQuestion],
    [rectangleQuestion, triangleQuestion],
    [aboveQuestion, negativeQuestion, centralQuestion],
    [sigmaQuestion, edgeQuestion],
    [markQuestion, expectedQuestion, percentQuestion]
]

export function generateNormalBatx1gRaceQuestion(random: Random, circuit: number, tier: Tier): NormalBatx1gRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkNormalBatx1gPitAnswer(question: RaceQuestion<NormalBatx1gRaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer, question.answerForm)
}

export function normalBatx1gParTime(circuit: number): number {
    return parTimeFor([11, 11, 13, 12, 12][circuit] ?? 12)
}

export const normalBatx1gRaceErrorTips: Record<NormalBatx1gRaceError, LocalizedText> = {
    width: say('Altuera = proportzioa zati zabalera.', 'Altura = proporción entre anchura.', 'الارتفاع = النسبة على العرض.', 'Height = proportion over width.'),
    divide: say('Tipifikatzean, zatitu $\\sigma$ zenbakiaz, behin bakarrik.', 'Al tipificar, divide entre $\\sigma$, una sola vez.', 'عند التوحيد اقسم على $\\sigma$ مرة واحدة.', 'When standardising, divide by $\\sigma$, just once.'),
    half: say('Begiratu alde bat ala bi diren: kanpaiaren erdia 0 zenbakiaren alde bakoitzean dago.', 'Mira si es un lado o los dos: la mitad de la campana está a cada lado del 0.', 'انظر هل هي جهة أم جهتان: نصف الجرس في كل جهة من 0.', 'Check whether it is one side or both: half the bell lies on each side of 0.'),
    table: say('Taulak azpikoa ematen du; gainetik, 1 ken taula.', 'La tabla da lo de debajo; por encima, 1 menos la tabla.', 'يعطي الجدول ما تحت؛ وفوق: 1 ناقص الجدول.', 'The table gives what lies below; above, 1 minus the table.'),
    double: say('Isats bakarra da, ez bi.', 'Es una sola cola, no dos.', 'إنه ذيل واحد لا ذيلان.', 'It is a single tail, not two.'),
    variance: say('Hori bariantza da; $\\sigma$ haren erroa da.', 'Eso es la varianza; $\\sigma$ es su raíz.', 'هذا هو التباين؛ و$\\sigma$ جذره.', 'That is the variance; $\\sigma$ is its root.'),
    correction: say('Gehitu edo kendu puntu erdia: barrak 1 zabalerakoak dira.', 'Suma o resta medio punto: las barras miden 1 de ancho.', 'أضف نصف وحدة أو اطرحها: عرض الأعمدة 1.', 'Add or subtract half a unit: the bars are 1 wide.'),
    side: say('Pentsatu $k$ sartzen den ala ez: puntu erdia alde horretara.', 'Piensa si $k$ entra o no: el medio punto va hacia ese lado.', 'فكّر هل تدخل $k$ أم لا: نصف الوحدة نحو تلك الجهة.', 'Think whether $k$ is in or not: the half unit goes that way.'),
    edge: say('Klase-marka erdiko puntua da.', 'La marca de clase es el punto medio.', 'مركز الفئة هو النقطة الوسطى.', 'The class mark is the midpoint.'),
    probability: say('Biderkatu datu kopuruaz: $N\\cdot p$.', 'Multiplica por el número de datos: $N\\cdot p$.', 'اضرب في عدد المعطيات: $N\\cdot p$.', 'Multiply by the number of data: $N\\cdot p$.'),
    percent: say('Zatitu guztizkoaz eta biderkatu 100 zenbakiaz.', 'Divide entre el total y multiplica por 100.', 'اقسم على الكل واضرب في 100.', 'Divide by the total and multiply by 100.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
