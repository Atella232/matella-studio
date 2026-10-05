import { add, checkAnswer, divide, fraction, multiply, subtract, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { generateProportionDbh2RaceQuestion, proportionDbh2RaceErrorTips, written, type ProportionDbh2RaceError } from '../../dbh2-proportzionaltasuna-v2/games/race.ts'
import { readMoneyAnswer } from '../answers.ts'

/* ==========================================================================
   Proportzionaltasunaren lasterketa (4. DBH aplikatuak): five circuits, one
   per stage. The first three borrow the 2. DBH generators (proportions;
   compound proportionality and shares; percentages and chained indices).
   The new ones are interest (compound interest forwards and backwards,
   simple interest in months) and the arithmetic problems (mixtures,
   vehicles meeting or chasing, taps). Every wrong option is a typical
   mistake: simple interest instead of compound, months taken as years, the
   mean of the prices instead of the mixture's, the speeds added in a chase,
   the hours of the taps added… Compound-interest values are chosen so the
   result is exact to the cent. Prompts never put a Basque suffix after a
   generated number.
   ========================================================================== */

export const PROPORTION_DBH4AP_RACE_CIRCUITS = 5

export type ProportionDbh4ApRaceError = ProportionDbh2RaceError | 'simple-instead' | 'months' | 'average-prices' | 'cost-only' | 'speeds-op' | 'added-hours'

export type ProportionDbh4ApRaceQuestion = RaceQuestion<ProportionDbh4ApRaceError>

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`
const percentLatex = (percent: number | string) => `${percent}\\,\\%`
const percentEu = (percent: number | string) => `\\%\\,${percent}`

/** A number for a prompt or a worked line */
const w = (value: FractionValue) => written(value) ?? `\\frac{${value.numerator}}{${value.denominator}}`
const n = (value: number) => fraction(value)
const dec = (hundredths: number) => fraction(hundredths, 100)
const power = (value: FractionValue, exponent: number) => Array.from({ length: exponent }).reduce<FractionValue>((total) => multiply(total, value), n(1))

interface Candidate {
    value: FractionValue
    error: ProportionDbh4ApRaceError
}

const near = (value: FractionValue): Candidate[] => [multiply(value, n(10)), divide(value, n(10)), multiply(value, n(2)), divide(value, n(2))].map((item) => ({ value: item, error: 'calculation' }))

/** The right option and three different mistakes, all positive and written as exact decimals */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<ProportionDbh4ApRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: ProportionDbh4ApRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (candidate.value.numerator <= 0) continue
        const latex = written(candidate.value)
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<ProportionDbh4ApRaceError>[], answer: FractionValue, solution: LocalizedText): ProportionDbh4ApRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution }
}

/* ---------- Circuits 0–2: the 2. DBH generators ---------- */

/** A 2. DBH question from one of its circuits, renumbered as this race's circuit */
function borrowed(random: Random, circuit: number, tier: Tier, from: number[], skip: string[] = []): ProportionDbh4ApRaceQuestion | null {
    const next = generateProportionDbh2RaceQuestion(random, pick(random, from), tier)
    return skip.includes(next.kind) ? null : { ...next, circuit }
}

/* ---------- Circuit 3: interest ---------- */

function compoundQuestion(random: Random, tier: Tier): ProportionDbh4ApRaceQuestion | null {
    const years = tier === 0 ? 2 : pick(random, [2, 3])
    // 1000 € keeps two years exact to the cent; 10 000 € three years
    const capital = years === 2 && tier === 0 ? 1000 : 10000
    const rate = pick(random, tier === 0 ? [2, 4, 5, 10] : [2, 3, 4, 5, 6, 8, 10])
    const index = dec(100 + rate)
    const answer = multiply(n(capital), power(index, years))
    const simple = n((capital * (100 + rate * years)) / 100)
    const choices = options(random, answer, [
        { value: simple, error: 'simple-instead' },
        { value: multiply(n(capital), index), error: 'one-year' },
        { value: subtract(answer, n(capital)), error: 'change-only' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(3, 'compound', say(
        `Kapitala ${math(`${capital}`)} €, interes konposatua ${math(percentEu(rate))}, ${math(`${years}`)} urte. Zenbat diru dago amaieran?`,
        `¿En cuánto se convierten ${math(`${capital}`)} € al ${math(percentLatex(rate))} de interés compuesto durante ${math(`${years}`)} años?`,
        `كم يصبح رأس مال ${math(`${capital}`)} € بفائدة مركّبة ${math(percentLatex(rate))} مدة ${math(`${years}`)} سنوات؟`
    ), choices, answer, same(math(`${capital}\\cdot ${w(index)}^{${years}}=${w(answer)}`)))
}

function initialCapitalQuestion(random: Random, tier: Tier): ProportionDbh4ApRaceQuestion | null {
    const years = tier === 0 ? 2 : pick(random, [2, 3])
    const capital = pick(random, years === 2 ? [1000, 2000, 5000, 10000] : [10000, 20000])
    const rate = pick(random, tier === 0 ? [5, 10, 20] : [2, 4, 5, 6, 10, 20])
    const index = dec(100 + rate)
    const final = multiply(n(capital), power(index, years))
    if (written(final) === null) return null
    const answer = n(capital)
    const choices = options(random, answer, [
        { value: multiply(final, power(index, years)), error: 'multiplied' },
        { value: multiply(final, dec(100 - rate * years)), error: 'undo-percent' },
        { value: divide(final, dec(100 + rate * years)), error: 'simple-instead' },
        { value: divide(final, index), error: 'one-year' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(3, 'initial-capital', say(
        `Interes konposatuan, ${math(percentEu(rate))}, ${math(`${years}`)} urte igaro ondoren kontuan ${math(w(final))} € daude. Zenbat jarri ziren?`,
        `Tras ${math(`${years}`)} años al ${math(percentLatex(rate))} de interés compuesto hay ${math(w(final))} €. ¿Cuánto se puso?`,
        `بعد ${math(`${years}`)} سنوات بفائدة مركّبة ${math(percentLatex(rate))} صار في الحساب ${math(w(final))} €. كم أُودع؟`
    ), choices, answer, same(math(`${w(final)}\\mathbin{:}${w(index)}^{${years}}=${capital}`)))
}

function monthsQuestion(random: Random, tier: Tier): ProportionDbh4ApRaceQuestion | null {
    const capital = pick(random, tier === 0 ? [1200, 2400, 6000] : [1200, 1800, 2400, 3000, 3600, 6000, 9000])
    const rate = randomInt(random, 2, tier === 0 ? 4 : 6)
    const months = pick(random, tier === 0 ? [3, 6] : [3, 4, 6, 8, 9])
    const answer = fraction(capital * rate * months, 1200)
    const choices = options(random, answer, [
        { value: fraction(capital * rate * months, 100), error: 'months' },
        { value: fraction(capital * rate, 100), error: 'one-year' },
        { value: add(n(capital), answer), error: 'change-only' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(3, 'months', say(
        `Interes bakuna: kapitala ${math(`${capital}`)} €, urteko tasa ${math(percentEu(rate))}, ${math(`${months}`)} hilabete. Zenbat interes?`,
        `¿Qué interés simple producen ${math(`${capital}`)} € al ${math(percentLatex(rate))} anual durante ${math(`${months}`)} meses?`,
        `ما الفائدة البسيطة التي تُنتجها ${math(`${capital}`)} € بنسبة ${math(percentLatex(rate))} سنويًا مدة ${math(`${months}`)} أشهر؟`
    ), choices, answer, same(math(`\\frac{${capital}\\cdot ${rate}\\cdot ${months}}{1200}=${w(answer)}`)))
}

/* ---------- Circuit 4: mixtures, vehicles and taps ---------- */

function mixtureQuestion(random: Random, tier: Tier): ProportionDbh4ApRaceQuestion | null {
    const kilos = [randomInt(random, 1, tier === 0 ? 5 : 12), randomInt(random, 1, tier === 0 ? 5 : 12)]
    // Prices in tenths of a euro
    const prices = [pick(random, tier === 0 ? [40, 60, 80, 100] : [45, 60, 74, 95, 120, 124, 150]), pick(random, tier === 0 ? [20, 30, 50] : [30, 52, 60, 70, 85])]
    if (kilos[0] === kilos[1] || prices[0] === prices[1]) return null
    const total = kilos[0] + kilos[1]
    const cost = fraction(kilos[0] * prices[0] + kilos[1] * prices[1], 10)
    const answer = divide(cost, n(total))
    if (written(answer) === null || (written(answer)!.split('{,}')[1] ?? '').length > 2) return null
    const choices = options(random, answer, [
        { value: fraction(prices[0] + prices[1], 20), error: 'average-prices' },
        { value: cost, error: 'cost-only' },
        { value: divide(cost, n(2)), error: 'average-prices' },
        ...near(answer)
    ])
    if (!choices) return null
    const [a, b] = prices.map((price) => w(fraction(price, 10)))
    return question(4, 'mixture', say(
        `Nahasketa: ${math(`${kilos[0]}`)} kg, ${math(a)} €/kg-an, eta ${math(`${kilos[1]}`)} kg, ${math(b)} €/kg-an. Zein da kiloaren prezioa?`,
        `Se mezclan ${math(`${kilos[0]}`)} kg a ${math(a)} €/kg con ${math(`${kilos[1]}`)} kg a ${math(b)} €/kg. ¿A cuánto sale el kilo de la mezcla?`,
        `نخلط ${math(`${kilos[0]}`)} كغ بسعر ${math(a)} €/كغ مع ${math(`${kilos[1]}`)} كغ بسعر ${math(b)} €/كغ. كم سعر كيلو الخليط؟`
    ), choices, answer, same(math(`\\frac{${kilos[0]}\\cdot ${a}+${kilos[1]}\\cdot ${b}}{${total}}=\\frac{${w(cost)}}{${total}}=${w(answer)}`)))
}

function motionQuestion(random: Random, tier: Tier): ProportionDbh4ApRaceQuestion | null {
    const meet = random() < 0.5
    const speeds = [randomInt(random, 4, 12) * 10, randomInt(random, 3, 11) * 10]
    if (!meet && speeds[0] <= speeds[1]) return null
    const closing = meet ? speeds[0] + speeds[1] : speeds[0] - speeds[1]
    // A time in quarters of an hour (halves at the first tier)
    const quarters = randomInt(random, 2, tier === 0 ? 6 : 14) * (tier === 0 ? 2 : 1)
    const distance = (closing * quarters) / 4
    if (!Number.isInteger(distance)) return null
    const answer = fraction(quarters, 4)
    const other = meet ? speeds[0] - speeds[1] : speeds[0] + speeds[1]
    const choices = options(random, answer, [
        { value: fraction(distance, Math.abs(other) || 1), error: 'speeds-op' },
        { value: fraction(distance, speeds[0]), error: 'calculation' },
        { value: fraction(distance, speeds[1]), error: 'calculation' },
        ...near(answer)
    ])
    if (!choices) return null
    const prompt = meet
        ? say(
            `Bi auto elkarrengana doaz, ${math(`${distance}`)} km-ko tartea dute, eta haien abiadurak ${math(`${speeds[0]}`)} eta ${math(`${speeds[1]}`)} km/h dira. Zenbat ordu behar dute gurutzatzeko?`,
            `Dos coches están a ${math(`${distance}`)} km y van uno hacia el otro a ${math(`${speeds[0]}`)} y ${math(`${speeds[1]}`)} km/h. ¿Cuántas horas tardan en cruzarse?`,
            `سيارتان تفصل بينهما ${math(`${distance}`)} كم وتتجه كل منهما نحو الأخرى بسرعة ${math(`${speeds[0]}`)} و${math(`${speeds[1]}`)} كم/س. كم ساعة حتى تتقاطعا؟`
        )
        : say(
            `Auto bat, ${math(`${speeds[0]}`)} km/h-ra, beste baten atzetik doa; aurrekoa ${math(`${speeds[1]}`)} km/h-ra doa eta tartea ${math(`${distance}`)} km da. Zenbat ordu behar ditu harrapatzeko?`,
            `Un coche a ${math(`${speeds[0]}`)} km/h persigue a otro que va a ${math(`${speeds[1]}`)} km/h, ${math(`${distance}`)} km por delante. ¿Cuántas horas tarda en alcanzarlo?`,
            `سيارة بسرعة ${math(`${speeds[0]}`)} كم/س تلاحق أخرى بسرعة ${math(`${speeds[1]}`)} كم/س تسبقها بـ${math(`${distance}`)} كم. كم ساعة تحتاج لتلحق بها؟`
        )
    return question(4, meet ? 'meet' : 'chase', prompt, choices, answer, same(math(`${distance}\\mathbin{:}(${speeds[0]}${meet ? '+' : '-'}${speeds[1]})=${distance}\\mathbin{:}${closing}=${w(answer)}`)))
}

/** Hours of two taps whose time together, ab/(a+b), is an exact decimal */
const tapPairs: Array<[number, number]> = [[3, 6], [2, 3], [4, 4], [6, 12], [4, 12], [2, 8], [5, 20], [3, 12], [10, 15], [6, 6], [4, 6], [5, 5], [6, 10], [8, 8], [2, 6], [12, 12], [3, 7], [12, 4], [20, 30]]

function tapsQuestion(random: Random, tier: Tier): ProportionDbh4ApRaceQuestion | null {
    const [a, b] = pick(random, tier === 0 ? tapPairs.slice(0, 6) : tapPairs)
    const answer = fraction(a * b, a + b)
    const choices = options(random, answer, [
        { value: n(a + b), error: 'added-hours' },
        { value: fraction(a + b, 2), error: 'added-hours' },
        { value: n(Math.abs(a - b) || a * 2), error: 'calculation' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(4, 'taps', say(
        `A txorrotak biltegia ${math(`${a}`)} orduan betetzen du; B txorrotak, ${math(`${b}`)} orduan. Zenbat ordu biak batera?`,
        `El grifo A llena un depósito en ${math(`${a}`)} horas y el B en ${math(`${b}`)} horas. ¿Cuántas horas tardan los dos juntos?`,
        `يملأ الصنبور أ خزانًا في ${math(`${a}`)} ساعات والصنبور ب في ${math(`${b}`)} ساعات. كم ساعة يحتاجان معًا؟`
    ), choices, answer, same(math(`\\frac{1}{${a}}+\\frac{1}{${b}}=\\frac{${a + b}}{${a * b}}\\ \\to\\ \\frac{${a * b}}{${a + b}}=${w(answer)}`)))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => ProportionDbh4ApRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [(random, tier) => borrowed(random, 0, tier, [0])],
    [(random, tier) => borrowed(random, 1, tier, [1, 2])],
    [(random, tier) => borrowed(random, 2, tier, [3, 4], ['interest'])],
    [compoundQuestion, initialCapitalQuestion, monthsQuestion],
    [mixtureQuestion, motionQuestion, tapsQuestion]
]

export function generateProportionDbh4ApRaceQuestion(random: Random, circuit: number, tier: Tier): ProportionDbh4ApRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkProportionDbh4ApPitAnswer(question: ProportionDbh4ApRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(readMoneyAnswer(input), question.answer, question.answerForm)
}

export function proportionDbh4ApParTime(circuit: number): number {
    return parTimeFor([11, 14, 13, 15, 15][circuit] ?? 12)
}

export const proportionDbh4ApRaceErrorTips: Record<ProportionDbh4ApRaceError, LocalizedText> = {
    ...proportionDbh2RaceErrorTips,
    'simple-instead': say('Hori interes bakuna da. Konposatuan urtero indizeaz biderkatzen da: $C\\cdot(1+\\frac{r}{100})^{t}$.', 'Eso es interés simple. En el compuesto se multiplica cada año por el índice: $C\\cdot(1+\\frac{r}{100})^{t}$.', 'هذه فائدة بسيطة. في المركّبة نضرب كل سنة في المؤشر: $C\\cdot(1+\\frac{r}{100})^{t}$.'),
    months: say('Tasa urtekoa da: hilabeteekin zatitu 1200ez, ez 100ez.', 'El tipo es anual: con meses se divide entre 1200, no entre 100.', 'السعر سنوي: مع الأشهر نقسم على 1200 لا على 100.'),
    'average-prices': say('Ez da prezioen batez bestekoa: kostu osoa zati kantitate osoa.', 'No es la media de los precios: coste total entre cantidad total.', 'ليس متوسط السعرين: الكلفة الكلية على الكمية الكلية.'),
    'cost-only': say('Hori kostu osoa da; zatitu kilo guztien artean.', 'Ese es el coste total; divídelo entre todos los kilos.', 'هذه الكلفة الكلية؛ اقسمها على كل الكيلوغرامات.'),
    'speeds-op': say('Elkarrengana: abiadurak batu. Atzetik: kendu.', 'Al encuentro: suma las velocidades. En una persecución: réstalas.', 'في التلاقي اجمع السرعتين، وفي المطاردة اطرحهما.'),
    'added-hours': say('Orduak ez dira batzen: batu ordu bateko zatiak, $\\frac{1}{a}+\\frac{1}{b}$, eta hartu alderantzizkoa.', 'Las horas no se suman: suma las partes de una hora, $\\frac{1}{a}+\\frac{1}{b}$, y toma el inverso.', 'لا تُجمع الساعات: اجمع جزأي الساعة $\\frac{1}{a}+\\frac{1}{b}$ وخذ المقلوب.')
}
