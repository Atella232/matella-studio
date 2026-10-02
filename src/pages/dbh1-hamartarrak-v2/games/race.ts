import { add, checkAnswer, compare, divide, fraction, multiply, subtract, toExactDecimal, toNumber, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readDecimalAnswer } from '../answers.ts'

/* ==========================================================================
   Hamartarren lasterketa (1. DBH): five circuits, one per stage — place
   value, order, fractions and rounding, adding and multiplying, dividing
   and problems. Every wrong option is a typical mistake: a digit read in
   the wrong place, "more digits is bigger", commas not aligned, decimals
   miscounted in a product, the comma moved the wrong way, truncating
   instead of rounding, only the divisor multiplied by 10…
   ========================================================================== */

export const DECIMALS_RACE_CIRCUITS = 5

export type DecimalsRaceError =
    | 'place'
    | 'more-digits'
    | 'outside'
    | 'fraction-digits'
    | 'truncate'
    | 'comma-align'
    | 'comma-count'
    | 'shift-direction'
    | 'shift-count'
    | 'divisor-only'
    | 'calculation'

export type DecimalsRaceQuestion = RaceQuestion<DecimalsRaceError>

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`

/** units / 10^places as an exact fraction */
const dec = (units: number, places: number) => fraction(units, 10 ** places)

/** An exact decimal in LaTeX with the comma ({,}) */
export function written(value: FractionValue): string {
    const text = toExactDecimal(value, ',')
    if (text === null) throw new Error(`Not an exact decimal: ${value.numerator}/${value.denominator}`)
    return text.replace(',', '{,}')
}

/** Decimal places of an exact decimal */
const placesOf = (value: FractionValue) => {
    const text = toExactDecimal(value, ',')!
    return text.includes(',') ? text.split(',')[1].length : 0
}

interface Candidate {
    value: FractionValue
    error: DecimalsRaceError
}

/** The right option and three different mistakes, all positive */
function options(random: Random, right: FractionValue, candidates: Candidate[], write: (value: FractionValue) => string = written): RaceOption<DecimalsRaceError>[] | null {
    const used = new Set([write(right)])
    const wrong: Array<{ latex: string; error: DecimalsRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (candidate.value.numerator <= 0) continue
        const latex = write(candidate.value)
        if (used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: write(right), correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<DecimalsRaceError>[], answer: FractionValue, solution: LocalizedText, writable = true): DecimalsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable, solution }
}

/** A nearby value, one unit of the last place up or down */
const nudges = (value: FractionValue, places: number): Candidate[] => [1, -1, 10, -10].map((times) => ({ value: add(value, dec(times, places)), error: 'calculation' }))

/* ---------- Circuit 0: place value ---------- */

const placeNames = [
    { power: 1, eu: 'hamarrekoak', es: 'decenas', ar: 'العشرات' },
    { power: 0, eu: 'unitateak', es: 'unidades', ar: 'الآحاد' },
    { power: -1, eu: 'hamarrenak', es: 'décimas', ar: 'الأعشار' },
    { power: -2, eu: 'ehunenak', es: 'centésimas', ar: 'الأجزاء من مئة' },
    { power: -3, eu: 'milarenak', es: 'milésimas', ar: 'الأجزاء من ألف' }
]

const tenPower = (power: number) => (power >= 0 ? fraction(10 ** power) : fraction(1, 10 ** -power))

function digitValueQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const decimals = tier === 0 ? 2 : 3
    const digits = shuffle(random, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2 + decimals)
    const units = digits.reduce((total, digit) => total * 10 + digit, 0)
    const number = dec(units, decimals)
    const position = randomInt(random, tier === 0 ? 1 : 0, digits.length - 1)
    const digit = digits[position]
    const power = 1 - position
    const answer = multiply(fraction(digit), tenPower(power))
    const choices = options(random, answer, shuffle(random, [power + 1, power - 1, power + 2, power - 2]).map((wrong) => ({ value: multiply(fraction(digit), tenPower(wrong)), error: 'place' as const })))
    if (!choices) return null
    const place = placeNames.find((item) => item.power === power)!
    return question(0, 'digit-value', say(`Zenbat balio du ${digit} zifrak ${math(written(number))} zenbakian?`, `¿Cuánto vale la cifra ${digit} en ${math(written(number))}?`, `كم قيمة الرقم ${digit} في ${math(written(number))}؟`), choices, answer, say(`${place.eu}: ${math(`${digit}\\cdot ${written(tenPower(power))}=${written(answer)}`)}`, `${place.es}: ${math(`${digit}\\cdot ${written(tenPower(power))}=${written(answer)}`)}`, `${place.ar}: ${math(`${digit}\\cdot ${written(tenPower(power))}=${written(answer)}`)}`))
}

function composeQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    // Some places are left empty so the zeros matter
    const powers = tier === 0 ? [0, -1, -2] : [1, 0, -1, -2, -3]
    const used = powers.filter(() => random() < 0.7)
    if (used.length < 3 || !used.some((power) => power < 0)) return null
    const parts = used.map((power) => ({ power, digit: randomInt(random, 1, 9) }))
    const value = parts.reduce((total, part) => add(total, multiply(fraction(part.digit), tenPower(part.power))), fraction(0))
    // The usual slip: the decimal parts written one place too far left (no zeros kept)
    const squeezed = parts.reduce((total, part, index) => add(total, multiply(fraction(part.digit), tenPower(part.power < 0 ? -1 - parts.filter((other, j) => j < index && other.power < 0).length : part.power))), fraction(0))
    const choices = options(random, value, [
        { value: squeezed, error: 'place' },
        ...parts.filter((part) => part.power < 0).map((part) => ({ value: add(value, multiply(fraction(part.digit), subtract(tenPower(part.power + 1), tenPower(part.power)))), error: 'place' as const })),
        ...parts.filter((part) => part.power < 0).map((part) => ({ value: subtract(value, multiply(fraction(part.digit), subtract(tenPower(part.power), tenPower(part.power - 1)))), error: 'place' as const }))
    ])
    if (!choices) return null
    const sum = parts.map((part) => written(multiply(fraction(part.digit), tenPower(part.power)))).join('+')
    return question(0, 'compose', say(`Zein zenbaki da ${math(sum)}?`, `¿Qué número es ${math(sum)}?`, `ما العدد ${math(sum)}؟`), choices, value, same(math(`${sum}=${written(value)}`)))
}

function convertQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const target = [{ power: -1, eu: 'hamarren', es: 'décimas', ar: 'عُشرًا' }, { power: -2, eu: 'ehunen', es: 'centésimas', ar: 'جزءًا من مئة' }, { power: -3, eu: 'milaren', es: 'milésimas', ar: 'جزءًا من ألف' }][tier]
    const places = randomInt(random, 1, -target.power)
    const units = randomInt(random, 1, places === 1 ? 9 : 99)
    if (units % 10 === 0) return null
    const value = dec(units, places)
    const answer = divide(value, tenPower(target.power))
    const choices = options(random, answer, [10, 1 / 10, 100, 1 / 100].map((factor) => ({ value: multiply(answer, factor >= 1 ? fraction(factor) : fraction(1, 1 / factor)), error: 'place' as const })))
    if (!choices) return null
    return question(0, 'convert', say(`Zenbat ${target.eu} dira ${math(written(value))}?`, `¿Cuántas ${target.es} son ${math(written(value))}?`, `كم ${target.ar} في ${math(written(value))}؟`), choices, answer, same(math(`${written(value)}\\cdot ${written(tenPower(-target.power))}=${written(answer)}`)))
}

/* ---------- Circuit 1: order ---------- */

function extremeQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const whole = randomInt(random, 0, 9)
    const largest = random() < 0.5
    // Tenths, hundredths and thousandths with different numbers of digits: the classic trap
    const pool = [dec(whole * 10 + randomInt(random, 1, 9), 1), dec(whole * 100 + randomInt(random, 1, 99), 2), dec(whole * 1000 + randomInt(random, 1, 999), 3), dec(whole * 100 + randomInt(random, 1, 99), 2)]
    if (tier === 2) pool.push(dec((whole + 1) * 10 - randomInt(random, 1, 9), 1))
    const values = pool.filter((value, index) => pool.findIndex((other) => compare(other, value) === 0) === index).slice(0, 4)
    if (values.length < 4 || values.some((value) => value.denominator === 1)) return null
    const sorted = [...values].sort(compare)
    const answer = largest ? sorted[3] : sorted[0]
    const choices = shuffle(random, values.map((value) => ({ latex: written(value), correct: value === answer, error: value === answer ? null : (largest ? placesOf(value) > placesOf(answer) : placesOf(value) < placesOf(answer)) ? 'more-digits' as const : 'calculation' as const })))
    const chain = sorted.map(written).join('<')
    return question(1, largest ? 'largest' : 'smallest', largest ? say('Zein da handiena?', '¿Cuál es el mayor?', 'أيها الأكبر؟') : say('Zein da txikiena?', '¿Cuál es el menor?', 'أيها الأصغر؟'), choices, answer, same(math(chain)), false)
}

function betweenQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const places = tier === 0 ? 1 : 2
    const low = randomInt(random, 10, 10 ** (places + 1) - 2)
    const a = dec(low, places)
    const b = dec(low + 1, places)
    const answer = dec(low * 10 + randomInt(random, 1, 9), places + 1)
    const below = dec(low * 10 - randomInt(random, 1, 9), places + 1)
    const above = dec((low + 1) * 10 + randomInt(random, 1, 9), places + 1)
    const farther = dec(low - 1, places)
    const swapped = dec((low + 1) * 100 + randomInt(random, 1, 99), places + 2)
    const choices = options(random, answer, shuffle(random, [{ value: below, error: 'outside' }, { value: above, error: 'outside' }, { value: farther, error: 'outside' }, { value: swapped, error: 'more-digits' }]))
    if (!choices) return null
    return question(1, 'between', say(`Zein zenbaki dago ${math(written(a))} eta ${math(written(b))} artean?`, `¿Qué número está entre ${math(written(a))} y ${math(written(b))}?`, `أي عدد يقع بين ${math(written(a))} و${math(written(b))}؟`), choices, answer, same(math(`${written(a)}<${written(answer)}<${written(b)}`)), false)
}

function midpointQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const places = tier === 0 ? 1 : randomInt(random, 1, 2)
    const low = randomInt(random, 10, 10 ** (places + 1))
    const step = tier === 2 ? randomInt(random, 1, 4) : 1
    const a = dec(low, places)
    const b = dec(low + step, places)
    const answer = divide(add(a, b), fraction(2))
    const choices = options(random, answer, [{ value: add(a, b), error: 'calculation' }, { value: subtract(b, a), error: 'calculation' }, { value: divide(subtract(b, a), fraction(2)), error: 'calculation' }, ...nudges(answer, placesOf(answer))])
    if (!choices) return null
    return question(1, 'midpoint', say(`Zein zenbaki dago ${math(written(a))} eta ${math(written(b))} zenbakien erdi-erdian?`, `¿Qué número está justo en medio de ${math(written(a))} y ${math(written(b))}?`, `ما العدد الواقع في منتصف ${math(written(a))} و${math(written(b))} تمامًا؟`), choices, answer, same(math(`(${written(a)}+${written(b)})\\mathbin{:}2=${written(answer)}`)))
}

/* ---------- Circuit 2: fractions and rounding ---------- */

const fractionLatex = (value: FractionValue) => `\\frac{${value.numerator}}{${value.denominator}}`

function toFractionQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const places = randomInt(random, 1, tier === 0 ? 2 : 3)
    const units = randomInt(random, 1, tier === 2 ? 9999 : 10 ** places * 3)
    if (units % 10 === 0) return null
    const value = dec(units, places)
    // The options keep the denominator 10, 100, 1000 (not simplified), as in class
    const decimalFraction = (top: number, power: number) => `\\frac{${top}}{${10 ** power}}`
    const right = decimalFraction(units, places)
    const wrongs = ([
        { latex: decimalFraction(units, places + 1), error: 'fraction-digits' },
        { latex: decimalFraction(units, Math.max(1, places - 1)), error: 'fraction-digits' },
        { latex: decimalFraction(units, places + 2), error: 'fraction-digits' }
    ] as Array<{ latex: string; error: DecimalsRaceError }>).filter((item) => item.latex !== right)
    if (wrongs.length < 3) wrongs.push({ latex: `\\frac{${10 ** places}}{${units}}`, error: 'calculation' })
    const choices = shuffle(random, [{ latex: right, correct: true, error: null as DecimalsRaceError | null }, ...wrongs.slice(0, 3).map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
    if (new Set(choices.map((choice) => choice.latex)).size < 4) return null
    return question(2, 'to-fraction', say(`Zein zatiki hamartar da ${math(written(value))}?`, `¿Qué fracción decimal es ${math(written(value))}?`, `ما الكسر العشري المساوي لـ ${math(written(value))}؟`), choices, value, same(math(`${written(value)}=${right}`)), false)
}

const terminatingDenominators = [[2, 4, 5, 10], [4, 5, 8, 20, 25], [8, 16, 20, 25, 40, 50]]

function toDecimalQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const denominator = pick(random, terminatingDenominators[tier])
    const numerator = randomInt(random, 1, denominator * (tier === 0 ? 1 : 3) - 1)
    const value = fraction(numerator, denominator)
    if (value.denominator !== denominator || numerator % denominator === 0) return null
    // "3/4 = 0,34": the two terms written after the comma
    const glued = Number(`${numerator}${denominator}`)
    const choices = options(random, value, ([
        { value: dec(glued, String(glued).length), error: 'fraction-digits' },
        { value: fraction(denominator, numerator), error: 'calculation' },
        { value: multiply(value, fraction(10)), error: 'place' },
        { value: divide(value, fraction(10)), error: 'place' }
    ] as Candidate[]).filter((candidate) => toExactDecimal(candidate.value) !== null && placesOf(candidate.value) <= 4))
    if (!choices) return null
    return question(2, 'to-decimal', say(`Idatzi hamartar gisa: ${math(fractionLatex(value))}`, `Escribe como decimal: ${math(fractionLatex(value))}`, `اكتب عددًا عشريًا: ${math(fractionLatex(value))}`), choices, value, same(math(`${numerator}\\mathbin{:}${denominator}=${written(value)}`)))
}

function roundQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const to = tier === 0 ? 1 : randomInt(random, 1, 2)
    const places = to + 1 + (tier === 2 ? randomInt(random, 0, 1) : 0)
    const units = randomInt(random, 10 ** places, 10 ** (places + 1) - 1)
    const value = dec(units, places)
    const drop = 10 ** (places - to)
    const rest = units % drop
    // Only numbers whose rounding goes up, half of the time, so truncating is a real trap
    if (rest * 2 < drop && random() < 0.5) return null
    if (rest === 0) return null
    const truncated = dec(Math.floor(units / drop), to)
    const answer = rest * 2 >= drop ? dec(Math.floor(units / drop) + 1, to) : truncated
    // The options show the rounded value with its places (3,0 and not 3)
    const show = (candidate: FractionValue, digits: number) => {
        const scaled = candidate.numerator * (10 ** digits / candidate.denominator)
        const text = String(Math.round(scaled)).padStart(digits + 1, '0')
        return `${text.slice(0, -digits)}{,}${text.slice(-digits)}`
    }
    const candidates: Array<{ latex: string; error: DecimalsRaceError }> = [
        { latex: show(answer.numerator === truncated.numerator && answer.denominator === truncated.denominator ? add(truncated, dec(1, to)) : truncated, to), error: 'truncate' },
        { latex: show(dec(Math.round(units / 10 ** (places - to - 1)), to + 1), to + 1), error: 'place' },
        { latex: show(add(answer, dec(1, to)), to), error: 'calculation' },
        { latex: show(subtract(answer, dec(1, to)), to), error: 'calculation' }
    ]
    const right = show(answer, to)
    const seen = new Set([right])
    // Compared by value too: 2,760 is not a mistake when the answer is 2,76
    const valueOfShown = (latex: string) => Number(latex.replace('{,}', '.'))
    const wrong = candidates.filter((item) => valueOfShown(item.latex) !== valueOfShown(right) && !seen.has(item.latex) && seen.add(item.latex)).slice(0, 3)
    if (wrong.length < 3) return null
    const choices = shuffle(random, [{ latex: right, correct: true, error: null as DecimalsRaceError | null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
    const placeName = to === 1 ? say('hamarrenetara', 'a las décimas', 'إلى الأعشار') : say('ehunenetara', 'a las centésimas', 'إلى الأجزاء من مئة')
    return question(2, 'round', say(`Biribildu ${math(written(value))} ${placeName.eu}.`, `Redondea ${math(written(value))} ${placeName.es}.`, `قرّب ${math(written(value))} ${placeName.ar}.`), choices, answer, same(math(`${written(value)}\\approx ${right}`)))
}

/* ---------- Circuit 3: add, subtract and multiply ---------- */

function addSubQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const subtracting = tier > 0 && random() < 0.5
    const a = dec(randomInt(random, 11, tier === 0 ? 99 : 999), 1)
    const b = dec(randomInt(random, 101, tier === 0 ? 999 : 2999), 2)
    if (placesOf(a) !== 1 || placesOf(b) !== 2) return null
    const [left, right] = subtracting ? (compare(a, b) > 0 ? [a, b] : [b, a]) : [a, b]
    const answer = subtracting ? subtract(left, right) : add(left, right)
    // Commas not aligned: the digits lined up from the right, so 3,8 is read as 0,38
    const misread = (value: FractionValue) => (placesOf(value) === 1 ? divide(value, fraction(10)) : value)
    const misaligned = (subtracting ? subtract : add)(misread(left), misread(right))
    const choices = options(random, answer, [{ value: misaligned, error: 'comma-align' }, ...nudges(answer, 1), ...nudges(answer, 2)])
    if (!choices || compare(misaligned, answer) === 0) return null
    const sign = subtracting ? '-' : '+'
    // The worked line writes both terms with two decimals, as in the column
    const twoPlaces = (value: FractionValue) => {
        const text = String(Math.round(toNumber(value) * 100)).padStart(3, '0')
        return `${text.slice(0, -2)}{,}${text.slice(-2)}`
    }
    return question(3, subtracting ? 'subtract' : 'add', same(math(`${written(left)}${sign}${written(right)}`)), choices, answer, same(math(`${twoPlaces(left)}${sign}${twoPlaces(right)}=${written(answer)}`)))
}

function multiplyQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const aPlaces = randomInt(random, 1, tier === 0 ? 1 : 2)
    const bPlaces = tier === 0 ? 0 : randomInt(random, 0, 2)
    const aUnits = randomInt(random, 2, tier === 0 ? 99 : 399)
    const bUnits = randomInt(random, 2, bPlaces === 0 ? 9 : tier === 2 ? 99 : 19)
    if (aUnits % 10 === 0 || bUnits % 10 === 0) return null
    const a = dec(aUnits, aPlaces)
    const b = dec(bUnits, bPlaces)
    const answer = multiply(a, b)
    const digits = aUnits * bUnits
    const places = aPlaces + bPlaces
    const choices = options(random, answer, [
        { value: dec(digits, places + 1), error: 'comma-count' },
        { value: dec(digits, places - 1), error: 'comma-count' },
        { value: dec(digits, Math.max(aPlaces, bPlaces)), error: 'comma-count' },
        ...nudges(answer, places)
    ])
    if (!choices) return null
    return question(3, 'multiply', same(math(`${written(a)}\\cdot ${written(b)}`)), choices, answer, same(math(`${aUnits}\\cdot ${bUnits}=${digits}\\ \\to\\ ${written(a)}\\cdot ${written(b)}=${written(answer)}`)))
}

function shiftQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const places = randomInt(random, 1, 3)
    const units = randomInt(random, 11, 9999)
    if (units % 10 === 0) return null
    const value = dec(units, places)
    const power = randomInt(random, 1, tier === 0 ? 2 : 3)
    const multiplying = random() < 0.5
    const factor = fraction(10 ** power)
    const answer = multiplying ? multiply(value, factor) : divide(value, factor)
    const opposite = multiplying ? divide(value, factor) : multiply(value, factor)
    const short = multiplying ? multiply(value, fraction(10 ** (power - 1))) : divide(value, fraction(10 ** (power - 1)))
    const long = multiplying ? multiply(value, fraction(10 ** (power + 1))) : divide(value, fraction(10 ** (power + 1)))
    const choices = options(random, answer, ([{ value: opposite, error: 'shift-direction' }, { value: short, error: 'shift-count' }, { value: long, error: 'shift-count' }] as Candidate[]).filter((candidate) => placesOf(candidate.value) <= 6))
    if (!choices) return null
    const latex = `${written(value)}${multiplying ? '\\cdot ' : '\\mathbin{:}'}${10 ** power}`
    return question(3, 'shift', same(math(latex)), choices, answer, same(math(`${latex}=${written(answer)}`)))
}

/* ---------- Circuit 4: division and problems ---------- */

function divideNaturalQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const divisor = randomInt(random, 2, tier === 0 ? 5 : 9)
    const quotient = dec(randomInt(random, 11, tier === 0 ? 99 : 999), tier === 0 ? 1 : randomInt(random, 1, 2))
    if (quotient.denominator === 1) return null
    const dividend = multiply(quotient, fraction(divisor))
    if (dividend.denominator === 1 && tier === 0) return null
    const choices = options(random, quotient, [{ value: multiply(quotient, fraction(10)), error: 'place' }, { value: divide(quotient, fraction(10)), error: 'place' }, ...nudges(quotient, placesOf(quotient))])
    if (!choices) return null
    return question(4, 'divide-natural', same(math(`${written(dividend)}\\mathbin{:}${divisor}`)), choices, quotient, same(math(`${written(dividend)}\\mathbin{:}${divisor}=${written(quotient)}`)))
}

function divideDecimalQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    const divisor = pick(random, tier === 0 ? [dec(2, 1), dec(5, 1)] : [dec(2, 1), dec(5, 1), dec(25, 2), dec(5, 2), dec(15, 1), dec(4, 1)])
    const quotient = tier === 2 ? dec(randomInt(random, 11, 99), 1) : fraction(randomInt(random, 2, 40))
    const dividend = multiply(quotient, divisor)
    if (placesOf(dividend) > 3) return null
    const shift = fraction(10 ** placesOf(divisor))
    const choices = options(random, quotient, [{ value: divide(quotient, shift), error: 'divisor-only' }, { value: multiply(quotient, shift), error: 'divisor-only' }, ...nudges(quotient, placesOf(quotient))])
    if (!choices) return null
    const scaledDividend = multiply(dividend, shift)
    const scaledDivisor = multiply(divisor, shift)
    return question(4, 'divide-decimal', same(math(`${written(dividend)}\\mathbin{:}${written(divisor)}`)), choices, quotient, same(math(`${written(dividend)}\\mathbin{:}${written(divisor)}=${written(scaledDividend)}\\mathbin{:}${written(scaledDivisor)}=${written(quotient)}`)))
}

function problemQuestion(random: Random, tier: Tier): DecimalsRaceQuestion | null {
    if (random() < 0.5) {
        // Price per kilo times the weight
        const price = dec(randomInt(random, 105, tier === 0 ? 400 : 1500), 2)
        const weight = tier === 0 ? fraction(randomInt(random, 2, 5)) : dec(randomInt(random, 2, 9) * 5, 1)
        const answer = multiply(price, weight)
        if (placesOf(answer) > 2) return null
        const choices = options(random, answer, [{ value: add(price, weight), error: 'calculation' }, { value: multiply(answer, fraction(10)), error: 'comma-count' }, { value: divide(answer, fraction(10)), error: 'comma-count' }, ...nudges(answer, 2)])
        if (!choices) return null
        return question(4, 'price', say(`Kiloa ${math(written(price))} €. Zenbat balio dute ${math(written(weight))} kg-k?`, `El kilo cuesta ${math(written(price))} €. ¿Cuánto cuestan ${math(written(weight))} kg?`, `سعر الكيلو ${math(written(price))} €. كم ثمن ${math(written(weight))} كغ؟`), choices, answer, same(math(`${written(price)}\\cdot ${written(weight)}=${written(answer)}`)))
    }
    // Sharing a bill equally
    const friends = randomInt(random, 2, tier === 0 ? 4 : 8)
    const share = dec(randomInt(random, 105, 2500), 2)
    const total = multiply(share, fraction(friends))
    const choices = options(random, share, [{ value: subtract(total, fraction(friends)), error: 'calculation' }, { value: multiply(share, fraction(10)), error: 'place' }, { value: divide(share, fraction(10)), error: 'place' }, ...nudges(share, 2)])
    if (!choices) return null
    return question(4, 'share', say(`${friends} lagunek ${math(written(total))} € ordaindu dituzte, denek berdin. Zenbat bakoitzak?`, `${friends} amigos pagan ${math(written(total))} € a partes iguales. ¿Cuánto paga cada uno?`, `دفع ${friends} أصدقاء ${math(written(total))} € بالتساوي. كم دفع كل واحد؟`), choices, share, same(math(`${written(total)}\\mathbin{:}${friends}=${written(share)}`)))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => DecimalsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [digitValueQuestion, composeQuestion, convertQuestion],
    [extremeQuestion, betweenQuestion, midpointQuestion],
    [toFractionQuestion, toDecimalQuestion, roundQuestion],
    [addSubQuestion, multiplyQuestion, shiftQuestion],
    [divideNaturalQuestion, divideDecimalQuestion, problemQuestion]
]

export function generateDecimalsRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): DecimalsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkDecimalsPitAnswer(question: DecimalsRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(readDecimalAnswer(input), question.answer, question.answerForm)
}

export function decimalsParTime(circuit: number): number {
    return parTimeFor([9, 9, 10, 11, 12][circuit] ?? 10)
}

export const decimalsRaceErrorTips: Record<DecimalsRaceError, LocalizedText> = {
    place: say('Begiratu zifraren tokia: komaren ondoren hamarrenak, ehunenak eta milarenak datoz, ordena horretan.', 'Mira el lugar de la cifra: tras la coma vienen décimas, centésimas y milésimas, en ese orden.', 'انظر إلى منزلة الرقم: بعد الفاصلة الأعشار ثم الأجزاء من مئة ثم الأجزاء من ألف.'),
    'more-digits': say('Zifra gehiago izateak ez du handiago egiten: idatzi denak zifra hamartar kopuru berarekin eta konparatu.', 'Tener más cifras no lo hace mayor: escríbelos con las mismas cifras decimales y compara.', 'كثرة الأرقام لا تجعله أكبر: اكتبها بالعدد نفسه من الأرقام العشرية ثم قارن.'),
    outside: say('Zenbaki hori tartetik kanpo dago: gehitu zero bat bi muturrei eta aukeratu bien artekoa.', 'Ese número queda fuera del tramo: añade un cero a los extremos y elige uno entre ellos.', 'هذا العدد خارج القطعة: أضف صفرًا إلى الطرفين واختر عددًا بينهما.'),
    'fraction-digits': say('Zifra hamartar bakoitzeko, zero bat izendatzailean: $0{,}47=\\frac{47}{100}$.', 'Por cada cifra decimal, un cero en el denominador: $0{,}47=\\frac{47}{100}$.', 'لكل رقم عشري صفر في المقام: $0{,}47=\\frac{47}{100}$.'),
    truncate: say('Biribiltzean begiratu hurrengo zifrari: 5 edo gehiago bada, gehitu bat.', 'Al redondear mira la cifra siguiente: si es 5 o más, suma uno.', 'عند التقريب انظر إلى الرقم التالي: إذا كان 5 أو أكثر أضف واحدًا.'),
    'comma-align': say('Batzeko eta kentzeko, koma komaren azpian: unitateak unitateen azpian, hamarrenak hamarrenen azpian.', 'Para sumar y restar, coma bajo coma: unidades bajo unidades, décimas bajo décimas.', 'للجمع والطرح فاصلة تحت فاصلة: الآحاد تحت الآحاد والأعشار تحت الأعشار.'),
    'comma-count': say('Biderkaduran, emaitzak bi faktoreen zifra hamartar guztiak ditu.', 'En el producto, el resultado tiene todas las cifras decimales de los dos factores.', 'في الضرب، للناتج كل الأرقام العشرية للعاملين.'),
    'shift-direction': say('Bider 10, 100…: koma eskuinera (handiagoa). Zati: ezkerrera (txikiagoa).', 'Por 10, 100…: la coma a la derecha (más grande). Entre: a la izquierda (más pequeño).', 'الضرب في 10 و100…: الفاصلة يمينًا (أكبر). القسمة: يسارًا (أصغر).'),
    'shift-count': say('Koma zeroak adina toki mugitzen da: 100 → bi toki, 1000 → hiru.', 'La coma se mueve tantos lugares como ceros: 100 → dos lugares, 1000 → tres.', 'تتحرك الفاصلة بعدد الأصفار: 100 ← منزلتان، 1000 ← ثلاث.'),
    'divisor-only': say('Biak biderkatu behar dira 10, 100… zenbakiaz, zatikizuna eta zatitzailea.', 'Hay que multiplicar los dos por 10, 100…: dividendo y divisor.', 'يجب ضرب الاثنين في 10 أو 100…: المقسوم والمقسوم عليه.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
