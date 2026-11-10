import { checkAnswer, fraction, toNumber, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'
import { hundredthsLatex, say } from '../lab/probability.ts'

/* ==========================================================================
   Probabilitatearen lasterketa (Batxilergoa 2 · Zientziak): four circuits,
   one per stage — review (Laplace with a die, two draws without
   replacement, the pairs of a group), events (the union, the difference,
   «neither», the number of events), conditional (P(A/B), the
   multiplication rule, independence, «at least one») and Bayes (total
   probability and a posterior with two causes). The wrong options are the
   typical mistakes. Every question carries `meta`, the numbers the tests
   check it against.
   ========================================================================== */

export const PROBABILITY_BATX2_RACE_CIRCUITS = 4

export type ProbabilityBatx2RaceError =
    | 'odds'
    | 'replacement'
    | 'order'
    | 'intersection'
    | 'difference'
    | 'morgan'
    | 'count'
    | 'divide'
    | 'multiply'
    | 'exclusive'
    | 'complement'
    | 'average'
    | 'swapped'
    | 'prior'
    | 'calculation'

export type ProbabilityBatx2RaceQuestion = RaceQuestion<ProbabilityBatx2RaceError> & { meta: Record<string, number> }

const h = hundredthsLatex

interface Candidate {
    value: FractionValue
    error: ProbabilityBatx2RaceError
}
const as = (value: FractionValue, error: ProbabilityBatx2RaceError): Candidate => ({ value, error })
const nearby = (value: FractionValue): Candidate[] => {
    const number = toNumber(value)
    if (Number.isInteger(number)) return [number + 1, number - 1, number * 2].map((item) => as(fraction(item), 'calculation'))
    return [fraction(value.numerator + 1, value.denominator), fraction(Math.max(1, value.numerator - 1), value.denominator), fraction(value.numerator, value.denominator + 1)].map((item) => as(item, 'calculation'))
}

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<ProbabilityBatx2RaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: ProbabilityBatx2RaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<ProbabilityBatx2RaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): ProbabilityBatx2RaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const all = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
const frac = (numerator: number, denominator: number) => `\\frac{${numerator}}{${denominator}}`

/* ---------- Circuit 0: review of 4. DBH ---------- */

/** A die with n faces: a number greater than k */
function laplaceQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const faces = pick(random, [6, 8, 10, 12, 20])
    const k = randomInt(random, 2, faces - 2)
    const favourable = faces - k
    const answer = fraction(favourable, faces)
    const choices = options(random, answer, [as(fraction(favourable, k), 'odds'), as(fraction(k, faces), 'complement'), as(fraction(favourable - 1, faces), 'count')])
    return choices && build(0, 'laplace', say(`${faces} aurpegiko dado bat botatzen da. Zein da ${k} baino gehiago ateratzeko probabilitatea?`, `Se lanza un dado de ${faces} caras. ¿Probabilidad de sacar más de ${k}?`, `يُرمى نرد له ${faces} وجهًا. ما احتمال الحصول على أكثر من ${k}؟`, `A ${faces}-sided die is rolled. What is the probability of getting more than ${k}?`), choices, answer, all(`${frac(favourable, faces)}=${written(answer)}`), { faces, k })
}

/** Two of one colour without replacement */
function drawsQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const red = randomInt(random, 2, 6)
    const other = randomInt(random, 2, 6)
    const total = red + other
    const answer = fraction(red * (red - 1), total * (total - 1))
    const choices = options(random, answer, [as(fraction(red * red, total * total), 'replacement'), as(fraction(red, total), 'multiply'), as(fraction(red * (red - 1), total * total), 'replacement')])
    return choices && build(0, 'draws', say(`Kutxa batek ${red} bola gorri eta ${other} urdin ditu. Bi ateratzen dira itzuli gabe. Zein da biak gorriak izateko probabilitatea?`, `Una urna tiene ${red} rojas y ${other} azules. Se sacan dos sin devolver. ¿Probabilidad de dos rojas?`, `في جرّة ${red} كرات حمراء و${other} زرقاء. تُسحب كرتان دون إرجاع. ما احتمال حمراوين؟`, `An urn has ${red} red and ${other} blue balls. Two are drawn without replacement. What is the probability of two red?`), choices, answer, all(`${frac(red, total)}\\cdot ${frac(red - 1, total - 1)}=${written(answer)}`), { red, total })
}

/** The pairs that can be made in a group of n */
function pairsQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const people = randomInt(random, 5, 12)
    const pairs = (people * (people - 1)) / 2
    const answer = fraction(pairs)
    const choices = options(random, answer, [as(fraction(people * (people - 1)), 'order'), as(fraction(people * people), 'order'), as(fraction(2 * people), 'count')])
    return choices && build(0, 'pairs', say(`Zenbat bikote desberdin osa daitezke ${people} pertsonarekin?`, `¿Cuántas parejas distintas se forman con ${people} personas?`, `كم زوجًا مختلفًا يمكن تكوينه من ${people} أشخاص؟`, `How many different pairs can be made from ${people} people?`), choices, answer, all(`C_{${people},2}=\\frac{${people}\\cdot ${people - 1}}{2}=${pairs}`), { people })
}

/* ---------- Circuit 1: algebra of events ---------- */

function eventData(random: Random) {
    const a = 5 * randomInt(random, 4, 14)
    const b = 5 * randomInt(random, 2, 12)
    const both = 5 * randomInt(random, 1, Math.min(a, b) / 5 - 1)
    return a + b - both > 100 || a <= b ? null : { a, b, both }
}

function unionQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const data = eventData(random)
    if (!data) return null
    const { a, b, both } = data
    const answer = fraction(a + b - both, 100)
    const choices = options(random, answer, [as(fraction(a + b, 100), 'intersection'), as(fraction(100 - a - b + both, 100), 'complement'), as(fraction(a + b - 2 * both, 100), 'intersection')])
    return choices && build(1, 'union', say(`$P(A)=${h(a)}$, $P(B)=${h(b)}$ eta $P(A\\cap B)=${h(both)}$. Zenbat da $P(A\\cup B)$?`, `$P(A)=${h(a)}$, $P(B)=${h(b)}$ y $P(A\\cap B)=${h(both)}$. ¿$P(A\\cup B)$?`, `$P(A)=${h(a)}$ و$P(B)=${h(b)}$ و$P(A\\cap B)=${h(both)}$. كم $P(A\\cup B)$؟`, `$P(A)=${h(a)}$, $P(B)=${h(b)}$ and $P(A\\cap B)=${h(both)}$. What is $P(A\\cup B)$?`), choices, answer, all(`${h(a)}+${h(b)}-${h(both)}=${h(a + b - both)}`), { a, b, both })
}

function differenceQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const data = eventData(random)
    if (!data) return null
    const { a, b, both } = data
    const answer = fraction(a - both, 100)
    const choices = options(random, answer, [as(fraction(a - b, 100), 'difference'), as(fraction(b - both, 100), 'difference'), as(fraction(100 - a + both, 100), 'complement')])
    return choices && build(1, 'difference', say(`$P(A)=${h(a)}$, $P(B)=${h(b)}$ eta $P(A\\cap B)=${h(both)}$. Zenbat da $P(A-B)$?`, `$P(A)=${h(a)}$, $P(B)=${h(b)}$ y $P(A\\cap B)=${h(both)}$. ¿$P(A-B)$?`, `$P(A)=${h(a)}$ و$P(B)=${h(b)}$ و$P(A\\cap B)=${h(both)}$. كم $P(A-B)$؟`, `$P(A)=${h(a)}$, $P(B)=${h(b)}$ and $P(A\\cap B)=${h(both)}$. What is $P(A-B)$?`), choices, answer, all(`${h(a)}-${h(both)}=${h(a - both)}`), { a, both })
}

function neitherQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const union = 5 * randomInt(random, 8, 19)
    const both = 5 * randomInt(random, 1, 8)
    if (both >= union || union === 100 - both) return null
    const answer = fraction(100 - union, 100)
    const choices = options(random, answer, [as(fraction(100 - both, 100), 'morgan'), as(fraction(union, 100), 'complement'), as(fraction(union - both, 100), 'morgan')])
    return choices && build(1, 'neither', say(`$P(A\\cup B)=${h(union)}$ eta $P(A\\cap B)=${h(both)}$. Zenbat da $P(\\overline{A}\\cap\\overline{B})$?`, `$P(A\\cup B)=${h(union)}$ y $P(A\\cap B)=${h(both)}$. ¿$P(\\overline{A}\\cap\\overline{B})$?`, `$P(A\\cup B)=${h(union)}$ و$P(A\\cap B)=${h(both)}$. كم $P(\\overline{A}\\cap\\overline{B})$؟`, `$P(A\\cup B)=${h(union)}$ and $P(A\\cap B)=${h(both)}$. What is $P(\\overline{A}\\cap\\overline{B})$?`), choices, answer, all(`1-${h(union)}=${h(100 - union)}`), { union })
}

function eventsQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const outcomes = randomInt(random, 3, 8)
    const answer = fraction(2 ** outcomes)
    const choices = options(random, answer, [as(fraction(2 * outcomes), 'count'), as(fraction(outcomes * outcomes), 'count'), as(fraction(2 ** outcomes - 2), 'count')])
    return choices && build(1, 'events', say(`Esperimentu batek ${outcomes} emaitza ditu. Zenbat gertaera ditu?`, `Un experimento tiene ${outcomes} resultados. ¿Cuántos sucesos tiene?`, `لتجربة ${outcomes} نتائج. كم حدثًا لها؟`, `An experiment has ${outcomes} outcomes. How many events does it have?`), choices, answer, all(`2^{${outcomes}}=${2 ** outcomes}`), { outcomes })
}

/* ---------- Circuit 2: conditional probability and independence ---------- */

function conditionalQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const b = pick(random, [20, 25, 40, 50, 80])
    const both = 5 * randomInt(random, 1, b / 5 - 1)
    const answer = fraction(both, b)
    const choices = options(random, answer, [as(fraction(both, 100), 'divide'), as(fraction(both * b, 10_000), 'multiply'), as(fraction(b - both, b), 'complement')])
    return choices && build(2, 'conditional', say(`$P(A\\cap B)=${h(both)}$ eta $P(B)=${h(b)}$. Zenbat da $P(A/B)$?`, `$P(A\\cap B)=${h(both)}$ y $P(B)=${h(b)}$. ¿$P(A/B)$?`, `$P(A\\cap B)=${h(both)}$ و$P(B)=${h(b)}$. كم $P(A/B)$؟`, `$P(A\\cap B)=${h(both)}$ and $P(B)=${h(b)}$. What is $P(A/B)$?`), choices, answer, all(`\\frac{${h(both)}}{${h(b)}}=${written(answer)}`), { both, b })
}

function productQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const a = 10 * randomInt(random, 2, 9)
    const given = 10 * randomInt(random, 1, 9)
    const answer = fraction(a * given, 10_000)
    const choices = options(random, answer, [as(fraction(given, 100), 'divide'), as(fraction(a, given), 'divide'), as(fraction(a + given, 200), 'average')])
    return choices && build(2, 'product', say(`$P(A)=${h(a)}$ eta $P(B/A)=${h(given)}$. Zenbat da $P(A\\cap B)$?`, `$P(A)=${h(a)}$ y $P(B/A)=${h(given)}$. ¿$P(A\\cap B)$?`, `$P(A)=${h(a)}$ و$P(B/A)=${h(given)}$. كم $P(A\\cap B)$؟`, `$P(A)=${h(a)}$ and $P(B/A)=${h(given)}$. What is $P(A\\cap B)$?`), choices, answer, all(`${h(a)}\\cdot ${h(given)}=${written(answer)}`), { a, given })
}

function independentQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const a = 10 * randomInt(random, 1, 8)
    const b = 10 * randomInt(random, 1, 8)
    const product = fraction(a * b, 10_000)
    const answer = fraction(a * 100 + b * 100 - a * b, 10_000)
    const choices = options(random, answer, [as(fraction(a + b, 100), 'exclusive'), as(product, 'intersection'), as(fraction(10_000 - a * b, 10_000), 'complement')])
    return choices && build(2, 'independent', say(`$A$ eta $B$ independenteak dira, $P(A)=${h(a)}$ eta $P(B)=${h(b)}$ izanik. Zenbat da $P(A\\cup B)$?`, `$A$ y $B$ son independientes, $P(A)=${h(a)}$ y $P(B)=${h(b)}$. ¿$P(A\\cup B)$?`, `$A$ و$B$ مستقلان، $P(A)=${h(a)}$ و$P(B)=${h(b)}$. كم $P(A\\cup B)$؟`, `$A$ and $B$ are independent, $P(A)=${h(a)}$ and $P(B)=${h(b)}$. What is $P(A\\cup B)$?`), choices, answer, all(`${h(a)}+${h(b)}-${h(a)}\\cdot ${h(b)}=${written(answer)}`), { a, b })
}

function atLeastQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const p = 10 * randomInt(random, 1, 5)
    const times = randomInt(random, 2, 3)
    const none = (100 - p) ** times
    const scale = 100 ** times
    const answer = fraction(scale - none, scale)
    const choices = options(random, answer, [as(fraction(p * times, 100), 'multiply'), as(fraction(none, scale), 'complement'), as(fraction(p ** times, scale), 'multiply')])
    return choices && build(2, 'at-least', say(`Gertaera batek $p=${h(p)}$ probabilitatea du, eta ${times} aldiz errepikatzen da, modu independentean. Zein da gutxienez behin gertatzeko probabilitatea?`, `Un suceso tiene probabilidad $p=${h(p)}$ y se repite ${times} veces de forma independiente. ¿Probabilidad de que ocurra al menos una vez?`, `لحدث احتمال $p=${h(p)}$ ويتكرّر ${times} مرات باستقلال. ما احتمال وقوعه مرة على الأقل؟`, `An event has probability $p=${h(p)}$ and is repeated ${times} times independently. What is the probability that it happens at least once?`), choices, answer, all(`1-${h(100 - p)}^{${times}}=${written(answer)}`), { p, times })
}

/* ---------- Circuit 3: total probability and Bayes ---------- */

function bayesData(random: Random) {
    const share = 10 * randomInt(random, 2, 8)
    const rate1 = 5 * randomInt(random, 1, 8)
    const rate2 = 5 * randomInt(random, 1, 8)
    return rate1 === rate2 ? null : { share, rate1, rate2 }
}

function totalQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const data = bayesData(random)
    if (!data) return null
    const { share, rate1, rate2 } = data
    const total = share * rate1 + (100 - share) * rate2
    const answer = fraction(total, 10_000)
    const choices = options(random, answer, [as(fraction(rate1 + rate2, 200), 'average'), as(fraction(rate1 + rate2, 100), 'average'), as(fraction(share * rate1, 10_000), 'prior')])
    return choices && build(3, 'total', say(`$P(A_1)=${h(share)}$, $P(D/A_1)=${h(rate1)}$ eta $P(D/A_2)=${h(rate2)}$, $A_2$ gertaera $A_1$ gertaeraren aurkakoa izanik. Zenbat da $P(D)$?`, `$P(A_1)=${h(share)}$, $P(D/A_1)=${h(rate1)}$ y $P(D/A_2)=${h(rate2)}$, con $A_2$ el contrario de $A_1$. ¿$P(D)$?`, `$P(A_1)=${h(share)}$ و$P(D/A_1)=${h(rate1)}$ و$P(D/A_2)=${h(rate2)}$، و$A_2$ معاكس $A_1$. كم $P(D)$؟`, `$P(A_1)=${h(share)}$, $P(D/A_1)=${h(rate1)}$ and $P(D/A_2)=${h(rate2)}$, with $A_2$ the complement of $A_1$. What is $P(D)$?`), choices, answer, all(`${h(share)}\\cdot ${h(rate1)}+${h(100 - share)}\\cdot ${h(rate2)}=${written(answer)}`), { share, rate1, rate2 })
}

function posteriorQuestion(random: Random): ProbabilityBatx2RaceQuestion | null {
    const data = bayesData(random)
    if (!data) return null
    const { share, rate1, rate2 } = data
    const path1 = share * rate1
    const total = path1 + (100 - share) * rate2
    const answer = fraction(path1, total)
    const choices = options(random, answer, [as(fraction(rate1, 100), 'swapped'), as(fraction(rate1, rate1 + rate2), 'prior'), as(fraction(path1, 10_000), 'divide')])
    return choices && build(3, 'posterior', say(`$P(A_1)=${h(share)}$, $P(D/A_1)=${h(rate1)}$ eta $P(D/\\overline{A_1})=${h(rate2)}$. Zenbat da $P(A_1/D)$?`, `$P(A_1)=${h(share)}$, $P(D/A_1)=${h(rate1)}$ y $P(D/\\overline{A_1})=${h(rate2)}$. ¿$P(A_1/D)$?`, `$P(A_1)=${h(share)}$ و$P(D/A_1)=${h(rate1)}$ و$P(D/\\overline{A_1})=${h(rate2)}$. كم $P(A_1/D)$؟`, `$P(A_1)=${h(share)}$, $P(D/A_1)=${h(rate1)}$ and $P(D/\\overline{A_1})=${h(rate2)}$. What is $P(A_1/D)$?`), choices, answer, all(`\\frac{${h(share)}\\cdot ${h(rate1)}}{${h(share)}\\cdot ${h(rate1)}+${h(100 - share)}\\cdot ${h(rate2)}}=${written(answer)}`), { share, rate1, rate2 })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => ProbabilityBatx2RaceQuestion | null>> = [
    [laplaceQuestion, drawsQuestion, pairsQuestion],
    [unionQuestion, differenceQuestion, neitherQuestion, eventsQuestion],
    [conditionalQuestion, productQuestion, independentQuestion, atLeastQuestion],
    [totalQuestion, posteriorQuestion]
]

export function generateProbabilityBatx2RaceQuestion(random: Random, circuit: number, tier: Tier): ProbabilityBatx2RaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkProbabilityBatx2PitAnswer(question: RaceQuestion<ProbabilityBatx2RaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer, question.answerForm)
}

export function probabilityBatx2ParTime(circuit: number): number {
    return parTimeFor([12, 12, 13, 15][circuit] ?? 13)
}

export const probabilityBatx2RaceErrorTips: Record<ProbabilityBatx2RaceError, LocalizedText> = {
    odds: say('Aldekoak zati kasu posible guztiak, ez zati aurkakoak.', 'Favorables entre todos los posibles, no entre los contrarios.', 'الملائمة على كل الممكنة لا على المعاكسة.', 'Favourable over all the possible cases, not over the unfavourable ones.'),
    replacement: say('Itzuli gabe, bigarren ateratzean bola bat gutxiago dago.', 'Sin devolver, en la segunda hay una bola menos.', 'دون إرجاع تنقص كرة في السحبة الثانية.', 'Without replacement, there is one ball fewer the second time.'),
    order: say('Bikote batean ordenak ez du axola: zatitu 2 zenbakiaz.', 'En una pareja el orden no importa: divide entre 2.', 'لا يهم الترتيب في الزوج: اقسم على 2.', 'In a pair the order does not matter: divide by 2.'),
    intersection: say('Ebakidura behin kendu behar da, ez bi aldiz eta ez inoiz ez.', 'La intersección se resta una vez: ni dos ni ninguna.', 'يُطرح التقاطع مرة واحدة: لا مرتين ولا أبدًا.', 'Subtract the intersection once: not twice, not never.'),
    difference: say('$P(A-B)=P(A)-P(A\\cap B)$, ez $P(A)-P(B)$.', '$P(A-B)=P(A)-P(A\\cap B)$, no $P(A)-P(B)$.', '$P(A-B)=P(A)-P(A\\cap B)$ لا $P(A)-P(B)$.', '$P(A-B)=P(A)-P(A\\cap B)$, not $P(A)-P(B)$.'),
    morgan: say('«Ez $A$ ez $B$» bilduraren aurkakoa da.', '«Ni $A$ ni $B$» es el contrario de la unión.', '«لا $A$ ولا $B$» هو معاكس الاتحاد.', '‘Neither $A$ nor $B$’ is the complement of the union.'),
    count: say('Zenbatu berriro: emaitza bakoitza barruan dago edo ez.', 'Vuelve a contar: cada resultado está o no está.', 'أعد العدّ: كل نتيجة إما داخل وإما لا.', 'Count again: each outcome is either in or out.'),
    divide: say('Baldintzatuan, zatitu dakigunaren probabilitateaz.', 'En la condicionada, divide entre la probabilidad de lo que se sabe.', 'في المشروط اقسم على احتمال المعلوم.', 'In a conditional probability, divide by the probability of what is known.'),
    multiply: say('Bide batean probabilitateak biderkatu egiten dira.', 'En un camino las probabilidades se multiplican.', 'في المسار تُضرب الاحتمالات.', 'Along a path, probabilities are multiplied.'),
    exclusive: say('Independenteak ez dira bateraezinak: ebakidura $P(A)\\cdot P(B)$ da.', 'Independientes no es incompatibles: la intersección es $P(A)\\cdot P(B)$.', 'المستقلان ليسا متنافيين: التقاطع $P(A)\\cdot P(B)$.', 'Independent is not mutually exclusive: the intersection is $P(A)\\cdot P(B)$.'),
    complement: say('Hori aurkakoa da; begiratu zer galdetzen den.', 'Ese es el contrario; mira qué se pregunta.', 'هذا هو المعاكس؛ انظر إلى المطلوب.', 'That is the complement; look at what is asked.'),
    average: say('Kausa bakoitzak bere probabilitatearen pisua du.', 'Cada causa pesa según su probabilidad.', 'لكل سبب وزن بحسب احتماله.', 'Each cause weighs according to its probability.'),
    swapped: say('Hori $P(D/A_1)$ da; galdetzen dena alderantziz da.', 'Esa es $P(D/A_1)$; lo que se pregunta es al revés.', 'هذا $P(D/A_1)$؛ والمطلوب بالعكس.', 'That is $P(D/A_1)$; what is asked is the other way round.'),
    prior: say('Ez ahaztu a priori probabilitateak: bide bakoitza kausa bider akatsa.', 'No olvides las probabilidades a priori: cada camino es causa por defecto.', 'لا تنسَ الاحتمالات القبلية: كل مسار هو السبب في العيب.', 'Do not forget the priors: each path is cause times fault.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
