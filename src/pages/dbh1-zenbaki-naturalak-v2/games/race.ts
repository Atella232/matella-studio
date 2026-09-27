import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { formatNatural } from '../format.ts'
import { readNaturalAnswer, toRoman } from '../numbers.ts'

/* ==========================================================================
   Carrera de números naturales: question generators for the five circuits.
   Every wrong option comes from a typical mistake (the digit instead of its
   value, reading a Roman numeral by adding everything, going left to right,
   base times exponent…) and explains it.
   ========================================================================== */

export const NATURALS_RACE_CIRCUITS = 5

export type NaturalsRaceError =
    | 'digit-only'
    | 'wrong-place'
    | 'missing-zeros'
    | 'order'
    | 'roman-subtract'
    | 'rounding-direction'
    | 'kept-digits'
    | 'inverse'
    | 'forgot-remainder'
    | 'quotient-not-remainder'
    | 'nine-eleven'
    | 'left-to-right'
    | 'ignored-brackets'
    | 'wrong-operation'
    | 'power-times'
    | 'swapped-base'
    | 'zeros'
    | 'multiplied-exponents'
    | 'calculation'

export type NaturalsRaceQuestion = RaceQuestion<NaturalsRaceError>

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value })
const f = formatNatural

interface Candidate {
    latex: string
    error: NaturalsRaceError
}

/** The right option and three different wrong ones, in order of preference; null when there are not enough */
function buildOptions(random: Random, right: string, mistakes: Candidate[]): RaceOption<NaturalsRaceError>[] | null {
    const used = new Set([right])
    const wrong: Candidate[] = []
    for (const mistake of mistakes) {
        if (wrong.length === 3) break
        if (used.has(mistake.latex)) continue
        used.add(mistake.latex)
        wrong.push(mistake)
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: right, correct: true, error: null }, ...wrong.map((mistake) => ({ latex: mistake.latex, correct: false, error: mistake.error }))])
}

const numbers = (values: number[], error: NaturalsRaceError): Candidate[] => values.filter((value) => Number.isSafeInteger(value) && value >= 0).map((value) => ({ latex: f(value), error }))

const nearMisses = (answer: number, step = 1): Candidate[] => numbers([answer + step, answer - step, answer + 2 * step, answer + 10 * step], 'calculation')

function question(circuit: number, kind: string, prompt: LocalizedText, options: RaceOption<NaturalsRaceError>[], answer: number, solution: LocalizedText, writable: boolean): NaturalsRaceQuestion {
    return { circuit, kind, prompt, options, answer: fraction(answer), answerForm: 'any', percentAnswer: false, writable, solution }
}

const calculate = (latex: string) => say(`Kalkulatu: $${latex}$`, `Calcula: $${latex}$`, `احسب: $${latex}$`)

/** A number with `length` digits, the first one not zero */
function randomNumber(random: Random, length: number): number {
    let text = String(randomInt(random, 1, 9))
    for (let index = 1; index < length; index += 1) text += String(randomInt(random, 0, 9))
    return Number(text)
}

/* ---------- Circuit 0: the decimal system ---------- */

function digitValueQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const value = randomNumber(random, [4, 5, 7][tier])
    const digits = String(value)
    const index = randomInt(random, 0, digits.length - 2)
    const digit = Number(digits[index])
    if (digit === 0 || digits.split('').filter((item) => Number(item) === digit).length > 1) return null
    const place = digits.length - 1 - index
    const answer = digit * 10 ** place
    const options = buildOptions(random, f(answer), [
        ...numbers([digit], 'digit-only'),
        ...numbers([answer * 10, answer / 10], 'wrong-place')
    ])
    if (!options) return null
    return question(0, 'digit-value', say(`Zenbat balio du ${digit} zifrak ${f(value)} zenbakian?`, `¿Cuánto vale la cifra ${digit} en ${f(value)}?`, `كم قيمة الرقم ${digit} في العدد ${f(value)}؟`), options, answer, same(`$${digit}\\cdot ${f(10 ** place)}=${f(answer)}$`), true)
}

function decompositionQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const top = [3, 4, 6][tier]
    const places = shuffle(random, Array.from({ length: top + 1 }, (_, place) => place)).slice(0, tier === 2 ? 3 : 2).sort((a, b) => b - a)
    if (!places.includes(top) || places.length < 2) return null
    const parts = places.map((place) => ({ digit: randomInt(random, 1, 9), place }))
    const answer = parts.reduce((sum, part) => sum + part.digit * 10 ** part.place, 0)
    const latex = parts.map((part) => (part.place === 0 ? String(part.digit) : `${part.digit}\\cdot ${f(10 ** part.place)}`)).join('+')
    const squeezed = Number(parts.map((part) => part.digit).join(''))
    const last = parts[parts.length - 1]
    const options = buildOptions(random, f(answer), [
        ...numbers([squeezed], 'missing-zeros'),
        ...numbers([answer + last.digit * 10 ** last.place * 9, answer * 10], 'wrong-place'),
        ...nearMisses(answer, 10 ** last.place)
    ])
    if (!options) return null
    return question(0, 'decomposition', say(`Zein zenbaki da $${latex}$?`, `¿Qué número es $${latex}$?`, `ما العدد $${latex}$؟`), options, answer, same(`$${latex}=${f(answer)}$`), true)
}

/** What a Roman numeral adds up to if every symbol is added, the usual slip */
function romanAllAdded(roman: string): number {
    const values: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
    return roman.split('').reduce((sum, symbol) => sum + values[symbol], 0)
}

function romanQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const answer = randomInt(random, [4, 40, 400][tier], [50, 400, 3999][tier])
    const roman = toRoman(answer)
    if (!/IV|IX|XL|XC|CD|CM/.test(roman)) return null
    const options = buildOptions(random, f(answer), [
        ...numbers([romanAllAdded(roman)], 'roman-subtract'),
        ...numbers([answer + 10, answer - 10, answer + 2, answer - 2], 'calculation')
    ])
    if (!options) return null
    return question(0, 'roman', say(`Zein zenbaki da $\\mathrm{${roman}}$?`, `¿Qué número es $\\mathrm{${roman}}$?`, `ما العدد $\\mathrm{${roman}}$؟`), options, answer, same(`$\\mathrm{${roman}}=${f(answer)}$`), true)
}

function biggestQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const base = randomNumber(random, [4, 5, 6][tier])
    const digits = String(base).split('')
    const variants = new Set<number>([base])
    for (let attempt = 0; attempt < 40 && variants.size < 4; attempt += 1) {
        const next = shuffle(random, digits).join('')
        if (next[0] !== '0') variants.add(Number(next))
    }
    if (variants.size < 4) return null
    const list = [...variants].slice(0, 4)
    const answer = Math.max(...list)
    const options = buildOptions(random, f(answer), numbers(list.filter((value) => value !== answer), 'order'))
    if (!options) return null
    const sorted = [...list].sort((a, b) => b - a).map(f).join('>')
    return question(0, 'biggest', say('Zein da handiena?', '¿Cuál es el mayor?', 'أيها الأكبر؟'), options, answer, same(`$${sorted}$`), false)
}

/* ---------- Circuit 1: rounding ---------- */

export function roundTo(value: number, place: number): number {
    const lower = Math.floor(value / place) * place
    return value - lower >= place / 2 ? lower + place : lower
}

const placeWords: Record<number, LocalizedText> = {
    10: say('hamarrekoetara', 'a las decenas', 'إلى العشرات'),
    100: say('ehunekoetara', 'a las centenas', 'إلى المئات'),
    1000: say('milakoetara', 'a los millares', 'إلى الآلاف'),
    10000: say('hamar milakoetara', 'a las decenas de millar', 'إلى عشرات الآلاف'),
    100000: say('ehun milakoetara', 'a las centenas de millar', 'إلى مئات الآلاف')
}

function roundQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const place = pick(random, [[10, 100], [100, 1000], [1000, 10000, 100000]][tier])
    const value = randomNumber(random, String(place).length + randomInt(random, 1, 2))
    if (value % place === 0) return null
    const answer = roundTo(value, place)
    const lower = Math.floor(value / place) * place
    const other = answer === lower ? lower + place : lower
    const words = placeWords[place]
    const options = buildOptions(random, f(answer), [
        ...numbers([other], 'rounding-direction'),
        ...numbers([answer + (value % place)], 'kept-digits'),
        ...numbers([roundTo(value, place * 10), roundTo(value, place / 10)], 'wrong-place')
    ])
    if (!options) return null
    return question(1, 'round', say(`Biribildu ${f(value)} ${words.eu}.`, `Redondea ${f(value)} ${words.es}.`, `قرّب ${f(value)} ${words.ar}.`), options, answer, same(`$${f(value)}\\approx ${f(answer)}$`), true)
}

function reverseRoundQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const place = pick(random, [[100], [1000], [1000, 10000]][tier])
    const target = randomInt(random, 2, 90) * place
    const half = place / 2
    const answer = target - half + randomInt(random, 0, place - 1)
    const words = placeWords[place]
    const wrongs = [target + half + randomInt(random, 0, half - 1), target - half - randomInt(random, 1, half), target + half]
    const options = buildOptions(random, f(answer), numbers(wrongs, 'rounding-direction'))
    if (!options) return null
    return question(1, 'reverse-round', say(`Zein zenbakik ematen du ${f(target)} ${words.eu} biribiltzean?`, `¿Qué número da ${f(target)} al redondearlo ${words.es}?`, `أي عدد يعطي ${f(target)} عند تقريبه ${words.ar}؟`), options, answer, same(`$${f(answer)}\\approx ${f(target)}$`), false)
}

/* ---------- Circuit 2: basic operations ---------- */

function missingTermQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const size = [100, 1000, 10000][tier]
    const a = randomInt(random, size / 10, size)
    const b = randomInt(random, size / 10, size)
    const kind = pick(random, ['minus-box', 'box-minus', 'plus-box'] as const)
    const big = Math.max(a, b)
    const small = Math.min(a, b)
    if (big === small) return null
    const cases = {
        // big − □ = small → □ = big − small
        'minus-box': { latex: `${f(big)}-\\square=${f(small)}`, answer: big - small, wrong: big + small },
        // □ − small = big → □ = big + small
        'box-minus': { latex: `\\square-${f(small)}=${f(big)}`, answer: big + small, wrong: big - small },
        // small + □ = big → □ = big − small
        'plus-box': { latex: `${f(small)}+\\square=${f(big)}`, answer: big - small, wrong: big + small }
    }
    const { latex, answer, wrong } = cases[kind]
    const options = buildOptions(random, f(answer), [...numbers([wrong], 'inverse'), ...nearMisses(answer, 10), ...nearMisses(answer)])
    if (!options) return null
    return question(2, kind, say(`Osatu: $${latex}$`, `Completa: $${latex}$`, `أكمل: $${latex}$`), options, answer, same(`$\\square=${f(answer)}$`), true)
}

function dividendQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const divisor = randomInt(random, 3, [9, 25, 60][tier])
    const quotient = randomInt(random, 4, [12, 40, 150][tier])
    const remainder = randomInt(random, 1, divisor - 1)
    const answer = divisor * quotient + remainder
    const options = buildOptions(random, f(answer), [
        ...numbers([divisor * quotient, divisor * quotient - remainder], 'forgot-remainder'),
        ...numbers([(divisor + remainder) * quotient, divisor + quotient + remainder], 'calculation'),
        ...nearMisses(answer)
    ])
    if (!options) return null
    return question(2, 'dividend', say(`Zatitzailea ${divisor} da, zatidura ${quotient} eta hondarra ${remainder}. Zein da zatikizuna?`, `El divisor es ${divisor}, el cociente ${quotient} y el resto ${remainder}. ¿Cuál es el dividendo?`, `المقسوم عليه ${divisor} وخارج القسمة ${quotient} والباقي ${remainder}. ما المقسوم؟`), options, answer, same(`$${divisor}\\cdot ${quotient}+${remainder}=${f(answer)}$`), true)
}

function remainderQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const divisor = randomInt(random, 3, [9, 15, 40][tier])
    const quotient = randomInt(random, 3, [11, 30, 90][tier])
    const answer = randomInt(random, 1, divisor - 1)
    const dividend = divisor * quotient + answer
    if (quotient === answer) return null
    const options = buildOptions(random, String(answer), [
        ...numbers([quotient], 'quotient-not-remainder'),
        ...numbers([divisor - answer, answer + 1, answer + divisor], 'calculation')
    ])
    if (!options) return null
    return question(2, 'remainder', say(`Zein da $${f(dividend)}\\mathbin{:}${divisor}$ zatiketaren hondarra?`, `¿Cuál es el resto de $${f(dividend)}\\mathbin{:}${divisor}$?`, `ما باقي القسمة $${f(dividend)}\\mathbin{:}${divisor}$؟`), options, answer, same(`$${f(dividend)}=${divisor}\\cdot ${quotient}+${answer}$`), true)
}

function mentalQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const n = randomInt(random, 12, [49, 99, 199][tier])
    const factor = pick(random, [9, 11])
    const answer = n * factor
    const opposite = factor === 9 ? n * 11 : n * 9
    const options = buildOptions(random, f(answer), [
        ...numbers([opposite], 'nine-eleven'),
        ...numbers([n * 10], 'calculation'),
        ...nearMisses(answer)
    ])
    if (!options) return null
    const worked = factor === 9 ? `${n}\\cdot 9=${f(n * 10)}-${n}=${f(answer)}` : `${n}\\cdot 11=${f(n * 10)}+${n}=${f(answer)}`
    return question(2, 'mental', say(`Kalkulatu buruz: $${n}\\cdot ${factor}$`, `Calcula mentalmente: $${n}\\cdot ${factor}$`, `احسب ذهنيًا: $${n}\\cdot ${factor}$`), options, answer, same(`$${worked}$`), true)
}

/* ---------- Circuit 3: order of operations and problems ---------- */

function hierarchyQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const small = () => randomInt(random, 2, 9)
    const patterns = [0, 1, 2, 3, ...(tier >= 1 ? [4] : []), ...(tier === 2 ? [5] : [])]
    const pattern = pick(random, patterns)
    let latex = ''
    let answer = 0
    const wrongs: Candidate[] = []
    if (pattern === 0) {
        const [a, b, c] = [randomInt(random, 2, 20), small(), small()]
        latex = `${a}+${b}\\cdot ${c}`
        answer = a + b * c
        wrongs.push(...numbers([(a + b) * c], 'left-to-right'))
    } else if (pattern === 1) {
        const [b, c] = [small(), small()]
        const a = b * c + randomInt(random, 1, 30)
        latex = `${a}-${b}\\cdot ${c}`
        answer = a - b * c
        wrongs.push(...numbers([(a - b) * c], 'left-to-right'))
    } else if (pattern === 2) {
        const [a, b, c] = [small(), small(), small()]
        latex = `${a}\\cdot (${b}+${c})`
        answer = a * (b + c)
        wrongs.push(...numbers([a * b + c], 'ignored-brackets'))
    } else if (pattern === 3) {
        const [b, c, d] = [small(), small(), small()]
        const a = b * randomInt(random, 2, 9)
        latex = `${a}\\mathbin{:}${b}+${c}\\cdot ${d}`
        answer = a / b + c * d
        wrongs.push(...numbers([(a / b + c) * d], 'left-to-right'))
    } else if (pattern === 4) {
        const c = small()
        const b = c + randomInt(random, 2, 20)
        const a = b + randomInt(random, 2, 30)
        latex = `${a}-(${b}-${c})`
        answer = a - (b - c)
        wrongs.push(...numbers([a - b - c], 'ignored-brackets'))
    } else {
        const [c, d] = [small(), small()]
        const b = c * d + randomInt(random, 1, 12)
        const a = small()
        latex = `${a}\\cdot [${b}-${c}\\cdot ${d}]`
        answer = a * (b - c * d)
        wrongs.push(...numbers([a * (b - c) * d], 'left-to-right'), ...numbers([a * b - c * d], 'ignored-brackets'))
    }
    const options = buildOptions(random, f(answer), [...wrongs, ...nearMisses(answer), ...nearMisses(answer, 10)])
    if (!options) return null
    return question(3, `hierarchy-${pattern}`, calculate(latex), options, answer, same(`$${latex}=${f(answer)}$`), true)
}

function problemQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const [a, c] = [randomInt(random, 3, [9, 20, 40][tier]), randomInt(random, 3, [9, 20, 40][tier])]
    const [b, d] = [randomInt(random, 4, 15), randomInt(random, 4, 15)]
    if (b === d) return null
    const answer = a * b + c * d
    const options = buildOptions(random, f(answer), [
        ...numbers([(a + c) * (b + d), a + b + c + d], 'wrong-operation'),
        ...numbers([(a + c) * b], 'calculation'),
        ...nearMisses(answer)
    ])
    if (!options) return null
    return question(3, 'problem', say(
        `Furgoneta batek ${b} kiloko ${a} kutxa eta ${d} kiloko ${c} kutxa daramatza. Zenbat kilo guztira?`,
        `Una furgoneta lleva ${a} cajas de ${b} kilos y ${c} cajas de ${d} kilos. ¿Cuántos kilos en total?`,
        `تنقل شاحنة صغيرة ${a} صناديق وزن كل منها ${b} كغ و${c} صناديق وزن كل منها ${d} كغ. كم كيلوغرامًا في المجموع؟`
    ), options, answer, same(`$${a}\\cdot ${b}+${c}\\cdot ${d}=${f(answer)}$`), true)
}

/* ---------- Circuit 4: powers ---------- */

function powerQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const base = randomInt(random, 2, [5, 9, 12][tier])
    const exponent = randomInt(random, 2, [3, 4, 5][tier])
    const answer = base ** exponent
    if (answer > 1000000) return null
    const options = buildOptions(random, f(answer), [
        ...numbers([base * exponent], 'power-times'),
        ...numbers([exponent ** base], 'swapped-base'),
        ...numbers([base ** (exponent + 1), base ** (exponent - 1)], 'calculation')
    ])
    if (!options) return null
    const factors = Array.from({ length: exponent }, () => base).join('\\cdot ')
    return question(4, 'power', calculate(`${base}^{${exponent}}`), options, answer, same(`$${base}^{${exponent}}=${factors}=${f(answer)}$`), true)
}

function tenPowerQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const exponent = randomInt(random, [2, 3, 5][tier], [4, 6, 9][tier])
    const answer = 10 ** exponent
    const options = buildOptions(random, f(answer), [
        ...numbers([10 ** (exponent + 1), 10 ** (exponent - 1)], 'zeros'),
        ...numbers([10 * exponent], 'power-times')
    ])
    if (!options) return null
    return question(4, 'ten-power', calculate(`10^{${exponent}}`), options, answer, same(`$10^{${exponent}}=${f(answer)}$`), true)
}

function sameBaseQuestion(random: Random, tier: Tier): NaturalsRaceQuestion | null {
    const base = pick(random, [[2, 3, 10], [2, 3, 5, 10], [2, 3, 5, 7, 10]][tier])
    const m = randomInt(random, 2, 5)
    const k = randomInt(random, 2, 5)
    if (m * k === m + k) return null
    const answer = base ** (m + k)
    const options = buildOptions(random, `${base}^{${m + k}}`, [
        { latex: `${base}^{${m * k}}`, error: 'multiplied-exponents' },
        { latex: `${base * base}^{${m + k}}`, error: 'calculation' },
        { latex: `${base}^{${m + k + 1}}`, error: 'calculation' }
    ])
    if (!options) return null
    return question(4, 'same-base', say(`Idatzi berretura bakar gisa: $${base}^{${m}}\\cdot ${base}^{${k}}$`, `Escribe como una sola potencia: $${base}^{${m}}\\cdot ${base}^{${k}}$`, `اكتب قوةً واحدة: $${base}^{${m}}\\cdot ${base}^{${k}}$`), options, answer, same(`$${base}^{${m}}\\cdot ${base}^{${k}}=${base}^{${m}+${k}}=${base}^{${m + k}}$`), false)
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => NaturalsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [digitValueQuestion, decompositionQuestion, romanQuestion, biggestQuestion],
    [roundQuestion, roundQuestion, reverseRoundQuestion],
    [missingTermQuestion, dividendQuestion, remainderQuestion, mentalQuestion],
    [hierarchyQuestion, hierarchyQuestion, problemQuestion],
    [powerQuestion, powerQuestion, tenPowerQuestion, sameBaseQuestion]
]

export function generateNaturalsRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): NaturalsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 400; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

/** Pit stop answers are read like the rest of the unit: 15.000 is fifteen thousand */
export function checkNaturalsPitAnswer(question: NaturalsRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(readNaturalAnswer(input), question.answer, question.answerForm)
}

export function naturalsParTime(circuit: number): number {
    return parTimeFor([9, 10, 12, 13, 11][circuit] ?? 10)
}

export const naturalsRaceErrorTips: Record<NaturalsRaceError, LocalizedText> = {
    'digit-only': say('Hori zifra da, ez bere balioa: begiratu zein posiziotan dagoen.', 'Esa es la cifra, no su valor: mira en qué posición está.', 'هذا هو الرقم لا قيمته: انظر في أي مرتبة يقع.'),
    'wrong-place': say('Posizio bat gehiago edo gutxiago hartu duzu: zenbatu ordenak eskuinetik.', 'Te has movido una posición: cuenta los órdenes desde la derecha.', 'أخطأت بمرتبة واحدة: عدّ المراتب من اليمين.'),
    'missing-zeros': say('Zeroak ere zenbatzen dira: posizio hutsek 0 bat behar dute.', 'Los ceros también cuentan: los huecos llevan un 0.', 'الأصفار مهمة أيضًا: المراتب الفارغة تحتاج 0.'),
    order: say('Lehenik zifra kopurua; gero, ezkerretik lehen zifra desberdina.', 'Primero el número de cifras; luego, la primera cifra distinta por la izquierda.', 'أولًا عدد الأرقام، ثم أول رقم مختلف من اليسار.'),
    'roman-subtract': say('Ikur txiki bat handiago baten aurretik badago, kendu egiten da (IV = 4), ez batu.', 'Un símbolo pequeño delante de uno mayor se resta (IV = 4), no se suma.', 'الرمز الصغير قبل رمز أكبر يُطرح (IV = 4) ولا يُجمع.'),
    'rounding-direction': say('Begiratu eskuineko zifrari: 5etik 9ra gora, 0tik 4ra behera.', 'Mira la cifra de la derecha: de 5 a 9 hacia arriba, de 0 a 4 hacia abajo.', 'انظر إلى الرقم الذي على اليمين: من 5 إلى 9 نرفع، ومن 0 إلى 4 نُبقي.'),
    'kept-digits': say('Biribiltzean, eskuineko zifra guztiak zero bihurtzen dira.', 'Al redondear, todas las cifras de la derecha pasan a ser ceros.', 'عند التقريب تصبح كل الأرقام التي على اليمين أصفارًا.'),
    inverse: say('Alderantzizko eragiketa behar da: kenketa batuketarekin egiaztatzen da, eta alderantziz.', 'Hace falta la operación inversa: la resta se comprueba con una suma, y al revés.', 'نحتاج العملية العكسية: نتحقق من الطرح بالجمع، والعكس.'),
    'forgot-remainder': say('Ez ahaztu hondarra: zatikizuna = zatitzailea · zatidura + hondarra.', 'No olvides el resto: D = d · c + r.', 'لا تنسَ الباقي: المقسوم = المقسوم عليه × الخارج + الباقي.'),
    'quotient-not-remainder': say('Hori zatidura da. Hondarra soberan geratzen dena da.', 'Ese es el cociente. El resto es lo que sobra.', 'هذا خارج القسمة. الباقي هو ما يتبقى.'),
    'nine-eleven': say('9z: 10ez biderkatu eta kendu. 11z: 10ez biderkatu eta batu.', 'Por 9: multiplica por 10 y resta. Por 11: multiplica por 10 y suma.', 'في 9: اضرب في 10 واطرح. في 11: اضرب في 10 وأضف.'),
    'left-to-right': say('Ezkerretik eskuinera egin duzu. Semaforoa: biderketak eta zatiketak lehenik.', 'Lo has hecho de izquierda a derecha. Semáforo: primero multiplicaciones y divisiones.', 'حسبت من اليسار إلى اليمين. إشارة المرور: الضرب والقسمة أولًا.'),
    'ignored-brackets': say('Parentesiak ahaztu dituzu: gorria lehenik, barrukoa egin behar da hasieran.', 'Te has saltado los paréntesis: el rojo va primero.', 'تجاهلت الأقواس: الأحمر أولًا.'),
    'wrong-operation': say('Idatzi datuak eta pentsatu: zer biderkatu behar da zerekin?', 'Escribe los datos y piensa: ¿qué hay que multiplicar por qué?', 'اكتب المعطيات وفكّر: ماذا نضرب في ماذا؟'),
    'power-times': say('Berretura ez da oinarria bider berretzailea: $2^{3}=2\\cdot 2\\cdot 2=8$.', 'Una potencia no es base por exponente: $2^{3}=2\\cdot 2\\cdot 2=8$.', 'القوة ليست الأساس ضرب الأس: $2^{3}=2\\cdot 2\\cdot 2=8$.'),
    'swapped-base': say('Oinarria eta berretzailea trukatu dituzu: $2^{3}=8$ baina $3^{2}=9$.', 'Has cambiado base y exponente: $2^{3}=8$ pero $3^{2}=9$.', 'بدّلت الأساس والأس: $2^{3}=8$ لكن $3^{2}=9$.'),
    zeros: say('10en berretura batek berretzaileak adina zero ditu.', 'Una potencia de 10 tiene tantos ceros como indica el exponente.', 'قوة العدد 10 فيها أصفار بعدد الأس.'),
    'multiplied-exponents': say('Oinarri bereko berreturak biderkatzean, berretzaileak batu egiten dira, ez biderkatu.', 'Al multiplicar potencias de la misma base, los exponentes se suman, no se multiplican.', 'عند ضرب قوى لها الأساس نفسه تُجمع الأسس ولا تُضرب.'),
    calculation: say('Metodoa ondo dago, baina kalkuluan akats bat dago. Egin berriro poliki.', 'El método está bien, pero hay un error de cálculo. Hazlo otra vez despacio.', 'الطريقة صحيحة لكن في الحساب خطأ. أعده ببطء.')
}
