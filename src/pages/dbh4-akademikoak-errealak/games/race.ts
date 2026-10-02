import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import {
    absErrorQuestion,
    expansionQuestion,
    generatrixQuestion,
    intervalCountQuestion,
    intervalQuestion,
    irrationalPickQuestion,
    kindPickQuestion,
    realsRaceErrorTips,
    roundQuestion,
    sqrtBetweenQuestion,
    type RealsRaceError,
    type RealsRaceQuestion
} from '../../dbh4-aplikatuak-errealak/games/race.ts'
import { chainedIndex, compoundFinal, simpleInterest, tidy, variationIndex } from '../percent.ts'

/* ==========================================================================
   Zenbaki errealak eta ehunekoak (4. DBH, akademikoak) race: five circuits,
   one per stage. The first three reuse the applied unit's questions
   (decimals, irrationals, intervals, rounding and errors); percentages and
   interest are new. Every wrong option is a typical mistake: forgetting to
   divide by 100, the index without the 1, adding chained percentages,
   subtracting the percentage from the final amount, the simple interest
   for the compound one… Each question carries `meta` for the tests.
   ========================================================================== */

export const PERCENT_RACE_CIRCUITS = 5

export type PercentRaceError =
    | RealsRaceError
    | 'percent-scale'
    | 'index-one'
    | 'index-sign'
    | 'percent-added'
    | 'inverse-subtract'
    | 'simple-compound'
    | 'interest-final'
    | 'square-sum'

export type PercentRaceMeta =
    | { kind: 'percent-of'; p: number; amount: number; value: number }
    | { kind: 'index'; change: number; index: number }
    | { kind: 'chained'; changes: number[]; total: number }
    | { kind: 'inverse'; change: number; initial: number; final: number }
    | { kind: 'simple'; capital: number; rate: number; years: number; interest: number; ask: 'interest' | 'rate' }
    | { kind: 'compound'; capital: number; rate: number; years: number; final: number }
    | { kind: 'sqrt-floor'; n: number; low: number }
    | { kind: 'hypotenuse'; a: number; b: number; n: number }

export type PercentRaceQuestion = RaceQuestion<PercentRaceError> & { meta: PercentRaceMeta | RealsRaceQuestion['meta']; line?: RealsRaceQuestion['line'] }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => say(`$${latex}$`, `$${latex}$`, `$${latex}$`)
const math = (latex: string) => `$${latex}$`
/** A number in LaTeX with the decimal comma: 1.21 → 1{,}21 */
const num = (value: number) => String(tidy(value, 6)).replace('.', '{,}').replace(/^-/, '-')
const signed = (value: number) => `${value > 0 ? '+' : ''}${num(value)}`

interface Choice {
    latex: string
    error: PercentRaceError | null
}

/** Four distinct options: the right one and three typical mistakes (never with the right value) */
function pickOptions(random: Random, right: Choice, wrongs: Choice[]): RaceOption<PercentRaceError>[] | null {
    const used = new Set([right.latex])
    const chosen: Choice[] = []
    for (const wrong of wrongs) {
        if (chosen.length === 3) break
        if (used.has(wrong.latex)) continue
        used.add(wrong.latex)
        chosen.push(wrong)
    }
    if (chosen.length < 3) return null
    return shuffle(random, [{ latex: right.latex, correct: true, error: null as PercentRaceError | null }, ...chosen.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

const numberChoice = (value: number, error: PercentRaceError): Choice => ({ latex: num(value), error })
const near = (value: number, unit = 1): Choice[] => [value + unit, value - unit, value + 2 * unit].map((item) => numberChoice(tidy(item, 6), 'calculation'))

/** The exact fraction of a decimal value (for the pit stop) */
function exact(value: number): FractionValue {
    const text = String(tidy(value, 6))
    const [whole, decimals = ''] = text.replace('-', '').split('.')
    const result = fraction(Number(whole + decimals), 10 ** decimals.length)
    return text.startsWith('-') ? fraction(-result.numerator, result.denominator) : result
}

function build(circuit: number, kind: string, prompt: LocalizedText, options: RaceOption<PercentRaceError>[], answer: number | null, worked: LocalizedText, meta: PercentRaceMeta): PercentRaceQuestion {
    return { circuit, kind, prompt, options, answer: answer === null ? fraction(0) : exact(answer), answerForm: 'any', percentAnswer: false, writable: answer !== null, solution: worked, meta }
}

/** A question of the applied unit, moved to this unit's circuit */
const moved = (question: RealsRaceQuestion | null, circuit: number): PercentRaceQuestion | null => (question ? { ...question, circuit } : null)

/* ---------- Circuit 1: irrationals on the line (written answers) ---------- */

function sqrtFloorQuestion(random: Random): PercentRaceQuestion | null {
    const n = randomInt(random, 5, 120)
    const low = Math.floor(Math.sqrt(n))
    if (low * low === n) return null
    const options = pickOptions(random, numberChoice(low, 'calculation'), shuffle(random, [numberChoice(low + 1, 'calculation'), numberChoice(Math.floor(n / 2), 'root-guess'), numberChoice(low - 1, 'calculation'), numberChoice(low + 2, 'calculation')]).filter((item) => Number(item.latex) > 0))
    if (!options) return null
    return build(1, 'sqrt-floor', say(`${math(`\\sqrt{${n}}`)} bi zenbaki oso jarraituren artean dago. Zein da txikiena?`, `${math(`\\sqrt{${n}}`)} está entre dos enteros consecutivos. ¿Cuál es el menor?`, `${math(`\\sqrt{${n}}`)} يقع بين عددين صحيحين متتاليين. ما الأصغر؟`), options, low, same(`${low * low}<${n}<${(low + 1) * (low + 1)}\\ \\to\\ ${low}<\\sqrt{${n}}<${low + 1}`), { kind: 'sqrt-floor', n, low })
}

function hypotenuseQuestion(random: Random): PercentRaceQuestion | null {
    const a = randomInt(random, 1, 7)
    const b = randomInt(random, 1, 7)
    const n = a * a + b * b
    const options = pickOptions(random, numberChoice(n, 'calculation'), shuffle(random, [numberChoice((a + b) * (a + b), 'square-sum'), numberChoice(a + b, 'square-sum'), numberChoice(2 * a + 2 * b, 'calculation'), numberChoice(n + 1, 'calculation')]).filter((item) => item.latex !== num(n)))
    if (!options) return null
    return build(1, 'hypotenuse', say(`Triangelu zuzen baten katetoak ${a} eta ${b} dira. Hipotenusa ${math('\\sqrt{n}')} da. Zenbat da $n$?`, `Los catetos de un triángulo rectángulo miden ${a} y ${b}. La hipotenusa mide ${math('\\sqrt{n}')}. ¿Cuánto vale $n$?`, `ضلعا مثلث قائم ${a} و${b}. طول الوتر ${math('\\sqrt{n}')}. كم تساوي $n$؟`), options, n, same(`${a}^{2}+${b}^{2}=${a * a}+${b * b}=${n}`), { kind: 'hypotenuse', a, b, n })
}

/* ---------- Circuit 3: percentages ---------- */

function percentOfQuestion(random: Random, tier: Tier): PercentRaceQuestion | null {
    const p = pick(random, tier === 0 ? [10, 20, 25, 50, 75] : [5, 12, 15, 16, 30, 40, 8.5, 12.5])
    const amount = pick(random, tier === 0 ? [40, 60, 80, 120, 200, 300] : [48, 220, 360, 480, 1200, 640])
    const value = tidy((p / 100) * amount, 6)
    if (!Number.isInteger(value * 100)) return null
    const options = pickOptions(random, numberChoice(value, 'calculation'), shuffle(random, [numberChoice(p * amount, 'percent-scale'), numberChoice(tidy(amount / p, 6), 'calculation'), numberChoice(tidy(value * 10, 6), 'percent-scale'), numberChoice(tidy(amount - value, 6), 'calculation'), ...near(value)]).filter((item) => Number.isFinite(Number(item.latex.replace('{,}', '.')))))
    if (!options) return null
    return build(3, 'percent-of', say(`Zenbat da ${math(num(amount))} zenbakiaren % ${num(p).replace('{,}', ',')}?`, `Calcula el ${num(p).replace('{,}', ',')} % de ${math(num(amount))}.`, `احسب ${num(p).replace('{,}', '.')} % من ${math(num(amount))}.`), options, value, same(`${num(p / 100)}\\cdot ${num(amount)}=${num(value)}`), { kind: 'percent-of', p, amount, value })
}

function indexQuestion(random: Random, tier: Tier): PercentRaceQuestion | null {
    const size = pick(random, tier === 0 ? [10, 20, 25, 50] : [5, 12, 15, 21, 35, 12.5, 2.5])
    const change = random() < 0.5 ? size : -size
    const index = variationIndex(change)
    const wrongs: Choice[] = [
        numberChoice(tidy(size / 100, 6), 'index-one'),
        numberChoice(variationIndex(-change), 'index-sign'),
        numberChoice(tidy(1 + (change / 10), 6), 'percent-scale'),
        numberChoice(tidy(index + 0.1, 6), 'calculation')
    ].filter((item) => Number(item.latex.replace('{,}', '.')) > 0)
    const options = pickOptions(random, numberChoice(index, 'calculation'), shuffle(random, wrongs))
    if (!options) return null
    const p = num(size).replace('{,}', ',')
    const prompt = change > 0
        ? say(`Kantitate bat % ${p} igotzeko, zenbatez biderkatzen da?`, `Para aumentar una cantidad un ${p} %, ¿por qué número se multiplica?`, `لزيادة كمية ${p.replace(',', '.')} %، في أي عدد نضرب؟`)
        : say(`Kantitate bat % ${p} jaisteko, zenbatez biderkatzen da?`, `Para disminuir una cantidad un ${p} %, ¿por qué número se multiplica?`, `لإنقاص كمية ${p.replace(',', '.')} %، في أي عدد نضرب؟`)
    return build(3, 'index', prompt, options, index, same(`1${change > 0 ? '+' : '-'}${num(size / 100)}=${num(index)}`), { kind: 'index', change, index })
}

function chainedQuestion(random: Random): PercentRaceQuestion | null {
    const first = pick(random, [10, 20, 25, 30, 50])
    const second = -pick(random, [10, 15, 20, 25, 40, 50])
    const changes = shuffle(random, [first, second])
    const total = tidy((chainedIndex(changes) - 1) * 100, 6)
    if (total === 0 || !Number.isInteger(total * 10)) return null
    const added = first + second
    const options = pickOptions(random, numberChoice(total, 'calculation'), [numberChoice(added, 'percent-added'), ...shuffle(random, [numberChoice(-total, 'index-sign'), numberChoice(tidy(total + 1, 6), 'calculation'), numberChoice(tidy(total - 2, 6), 'calculation')])].filter((item) => item.latex !== num(total)))
    if (!options) return null
    const [a, b] = changes.map((change) => (change > 0 ? `+${change}` : String(change)))
    return build(3, 'chained', say(`Prezio bat ${math(`${a}\\,\\%`)} eta gero ${math(`${b}\\,\\%`)} aldatu da. Zenbat aldatu da guztira (%)?`, `Un precio varía un ${math(`${a}\\,\\%`)} y después un ${math(`${b}\\,\\%`)}. ¿Cuánto ha variado en total (%)?`, `تغيّر سعر ${math(`${a}\\,\\%`)} ثم ${math(`${b}\\,\\%`)}. كم تغيّر إجمالًا (%)؟`), options, total, same(`${num(variationIndex(changes[0]))}\\cdot ${num(variationIndex(changes[1]))}=${num(chainedIndex(changes))}\\ \\to\\ ${signed(total)}\\,\\%`), { kind: 'chained', changes, total })
}

function inverseQuestion(random: Random, tier: Tier): PercentRaceQuestion | null {
    const size = pick(random, tier === 0 ? [10, 20, 25, 50] : [10, 15, 20, 25, 40, 12.5])
    const change = tier === 0 || random() < 0.5 ? size : -size
    const initial = randomInt(random, 2, 30) * 20
    const final = tidy(initial * variationIndex(change), 6)
    if (!Number.isInteger(final * 100)) return null
    const subtracted = tidy(final * variationIndex(-change), 6)
    const options = pickOptions(random, numberChoice(initial, 'calculation'), shuffle(random, [numberChoice(subtracted, 'inverse-subtract'), numberChoice(tidy(final * variationIndex(change), 6), 'index-sign'), numberChoice(tidy(final - change, 6), 'calculation'), ...near(initial, 10)]).filter((item) => item.latex !== num(initial)))
    if (!options) return null
    const p = num(size).replace('{,}', ',')
    const prompt = change > 0
        ? say(`Igoera: % ${p}. Orain ${math(num(final))} € balio du. Zenbat balio zuen?`, `Tras subir un ${p} %, cuesta ${math(num(final))} €. ¿Cuánto costaba?`, `بعد زيادة ${p.replace(',', '.')} % صار ثمنه ${math(num(final))} €. كم كان ثمنه؟`)
        : say(`Beherapena: % ${p}. Orain ${math(num(final))} € balio du. Zenbat balio zuen?`, `Tras una rebaja del ${p} %, cuesta ${math(num(final))} €. ¿Cuánto costaba?`, `بعد خصم ${p.replace(',', '.')} % صار ثمنه ${math(num(final))} €. كم كان ثمنه؟`)
    return build(3, 'inverse', prompt, options, initial, same(`${num(final)}:${num(variationIndex(change))}=${num(initial)}`), { kind: 'inverse', change, initial, final })
}

/* ---------- Circuit 4: simple and compound interest ---------- */

function simpleQuestion(random: Random, tier: Tier): PercentRaceQuestion | null {
    const capital = randomInt(random, 2, tier === 0 ? 10 : 30) * 500
    const rate = tier === 0 ? randomInt(random, 1, 5) : pick(random, [1.5, 2, 2.5, 3, 3.5, 4, 5, 6])
    const years = randomInt(random, 2, tier === 0 ? 4 : 8)
    const interest = simpleInterest(capital, rate, years)
    if (!Number.isInteger(interest * 100)) return null
    if (tier === 2 && random() < 0.5) {
        const options = pickOptions(random, numberChoice(rate, 'calculation'), shuffle(random, [numberChoice(tidy((interest * 100) / capital, 6), 'calculation'), numberChoice(tidy(interest / (capital * years), 6), 'percent-scale'), numberChoice(tidy(rate * 2, 6), 'calculation'), numberChoice(tidy(rate + 1, 6), 'calculation')]).filter((item) => item.latex !== num(rate)))
        if (!options) return null
        return build(4, 'simple-rate', say(`${math(num(capital))} €-k ${years} urtean ${math(num(interest))} € interes sinple eman dituzte. Zer interes-tasarekin (%)?`, `${math(num(capital))} € han dado ${math(num(interest))} € de interés simple en ${years} años. ¿A qué rédito (%)?`, `أعطت ${math(num(capital))} € فائدة بسيطة قدرها ${math(num(interest))} € في ${years} أعوام. بأي معدل (%)؟`), options, rate, same(`r=\\frac{100\\cdot ${num(interest)}}{${num(capital)}\\cdot ${years}}=${num(rate)}`), { kind: 'simple', capital, rate, years, interest, ask: 'rate' })
    }
    const compound = tidy(compoundFinal(capital, rate, years) - capital, 6)
    const options = pickOptions(random, numberChoice(interest, 'calculation'), shuffle(random, [numberChoice(tidy(capital * rate * years, 6), 'percent-scale'), numberChoice(tidy(capital + interest, 6), 'interest-final'), ...(compound !== interest ? [numberChoice(compound, 'simple-compound')] : []), numberChoice(tidy(interest / years, 6), 'calculation')]).filter((item) => item.latex !== num(interest)))
    if (!options) return null
    return build(4, 'simple-interest', say(`Interes sinplea. Kapitala: ${math(num(capital))} €; interes-tasa: % ${num(rate).replace('{,}', ',')}; denbora: ${years} urte. Zenbat interes (€)?`, `${math(num(capital))} € al ${num(rate).replace('{,}', ',')} % durante ${years} años a interés simple. ¿Cuántos intereses (€)?`, `${math(num(capital))} € بنسبة ${num(rate).replace('{,}', '.')} % لمدة ${years} أعوام بفائدة بسيطة. كم الفائدة (€)؟`), options, interest, same(`I=\\frac{${num(capital)}\\cdot ${num(rate)}\\cdot ${years}}{100}=${num(interest)}`), { kind: 'simple', capital, rate, years, interest, ask: 'interest' })
}

function compoundQuestion(random: Random, tier: Tier): PercentRaceQuestion | null {
    const capital = pick(random, [1000, 2000, 5000, 10000])
    const rate = pick(random, tier === 0 ? [10, 20, 5] : [2, 3, 4, 5, 10])
    const years = tier === 0 ? 2 : randomInt(random, 2, 3)
    const final = compoundFinal(capital, rate, years)
    const simple = tidy(capital + simpleInterest(capital, rate, years), 6)
    const options = pickOptions(random, numberChoice(final, 'calculation'), shuffle(random, [numberChoice(simple, 'simple-compound'), numberChoice(compoundFinal(capital, rate, years - 1), 'exponent-count'), numberChoice(compoundFinal(capital, rate, years + 1), 'exponent-count'), numberChoice(tidy(final - capital, 6), 'interest-final')]).filter((item) => item.latex !== num(final)))
    if (!options) return null
    return build(4, 'compound', say(`Interes konposatua. Kapitala: ${math(num(capital))} €; interes-tasa: % ${rate}; denbora: ${years} urte. Zenbat izango dira (€)?`, `${math(num(capital))} € al ${rate} % durante ${years} años a interés compuesto. ¿En cuánto se convierten (€)?`, `${math(num(capital))} € بنسبة ${rate} % لمدة ${years} أعوام بفائدة مركبة. كم تصبح (€)؟`), options, final, same(`${num(capital)}\\cdot ${num(variationIndex(rate))}^{${years}}\\approx ${num(final)}`), { kind: 'compound', capital, rate, years, final })
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => PercentRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [
        (random) => moved(kindPickQuestion(random), 0),
        (random) => moved(expansionQuestion(random), 0),
        (random, tier) => moved(generatrixQuestion(random, tier), 0),
        (random, tier) => moved(generatrixQuestion(random, tier), 0)
    ],
    [
        (random, tier) => moved(irrationalPickQuestion(random, tier), 1),
        (random) => moved(sqrtBetweenQuestion(random), 1),
        (random) => sqrtFloorQuestion(random),
        (random) => hypotenuseQuestion(random)
    ],
    [
        (random, tier) => moved(intervalQuestion(random, tier), 2),
        (random) => moved(intervalCountQuestion(random), 2),
        (random, tier) => moved(roundQuestion(random, tier), 2),
        (random) => moved(absErrorQuestion(random), 2)
    ],
    [
        (random, tier) => percentOfQuestion(random, tier),
        (random, tier) => indexQuestion(random, tier),
        (random, tier) => (tier === 0 ? percentOfQuestion(random, 0) : chainedQuestion(random)),
        (random, tier) => inverseQuestion(random, tier)
    ],
    [
        (random, tier) => simpleQuestion(random, tier),
        (random, tier) => compoundQuestion(random, tier),
        (random, tier) => simpleQuestion(random, tier),
        (random, tier) => (tier === 0 ? simpleQuestion(random, 0) : compoundQuestion(random, tier))
    ]
]

export function generatePercentRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): PercentRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkPercentPitAnswer(question: RaceQuestion<PercentRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function percentParTime(circuit: number): number {
    return parTimeFor([13, 11, 12, 12, 14][circuit] ?? 12)
}

export const percentRaceErrorTips: Record<PercentRaceError, LocalizedText> = {
    ...realsRaceErrorTips,
    'percent-scale': say('Ehunekoa zati 100 da: % 16 = 0,16, ez 16.', 'Un porcentaje es entre 100: el 16 % es 0,16, no 16.', 'النسبة المئوية على 100: 16 % هي 0.16 لا 16.'),
    'index-one': say('Indizean 1 dago: kantitate osoa gehi (edo ken) ehunekoa. % 21 igo → 1,21.', 'El índice incluye el 1: toda la cantidad más (o menos) el porcentaje. Subir un 21 % → 1,21.', 'المؤشر يتضمن 1: الكمية كلها زائد (أو ناقص) النسبة. زيادة 21 % → 1.21.'),
    'index-sign': say('Igoerak 1 baino handiagoa den indizea du; jaitsierak, txikiagoa.', 'Un aumento tiene índice mayor que 1; una disminución, menor.', 'للزيادة مؤشر أكبر من 1 وللنقصان مؤشر أصغر من 1.'),
    'percent-added': say('Ehuneko kateatuak ez dira batzen: biderkatu indizeak.', 'Los porcentajes encadenados no se suman: multiplica los índices.', 'لا تُجمع النسب المتسلسلة: اضرب المؤشرات.'),
    'inverse-subtract': say('Hasierakoa aurkitzeko, zatitu indizeaz; ehunekoa hasierako kantitatearen gainean zegoen.', 'Para hallar la inicial, divide entre el índice; el porcentaje era sobre la cantidad inicial.', 'لإيجاد الأولية اقسم على المؤشر؛ فالنسبة كانت من الكمية الأولية.'),
    'simple-compound': say('Sinplean urtero interes bera; konposatuan interesak kapitalari gehitzen zaizkio.', 'En el simple, cada año el mismo interés; en el compuesto, los intereses se suman al capital.', 'في البسيطة الفائدة نفسها كل عام؛ وفي المركبة تُضاف الفوائد إلى رأس المال.'),
    'square-sum': say('$(a+b)^{2}\\neq a^{2}+b^{2}$: karratu bakoitza bere aldetik.', '$(a+b)^{2}\\neq a^{2}+b^{2}$: cada cateto se eleva por separado.', '$(a+b)^{2}\\neq a^{2}+b^{2}$: يُربَّع كل ضلع على حدة.'),
    'interest-final': say('Begiratu zer galdetzen den: interesak ($I$) ala amaierako kapitala ($C+I$).', 'Mira qué se pregunta: los intereses ($I$) o el capital final ($C+I$).', 'انظر إلى المطلوب: الفوائد ($I$) أم رأس المال النهائي ($C+I$).')
}
