import { gcd } from '../../../features/unit-v2/math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types.ts'
import { latexNumber, moneyText } from './numbers.ts'

/* ==========================================================================
   Nahasketa perfektua (Mezcla perfecta, 4. DBH aplikatuak): two qualities of
   a product and a price a kilo to reach (or gold of two finenesses and a
   fineness to reach). The player sets how much of each goes in and mixes.
   The seesaw has its support under the price asked for, so it stays level
   only when kilos times distance are the same on both sides; otherwise it
   tips to the heavy side. Three tries a round, and every round has exactly
   one answer in whole kilos (or grams).
   ========================================================================== */

export type MixKind = 'total' | 'add'
export type MixProduct = 'coffee' | 'tea' | 'sweets' | 'nuts' | 'gold'

export interface MixLevel {
    gold: boolean
    kinds: MixKind[]
}

export const mixLevels: MixLevel[] = [
    { gold: false, kinds: ['total'] },
    { gold: false, kinds: ['add'] },
    { gold: true, kinds: ['total', 'add'] }
]

export const MIX_ROUNDS = 5
export const MIX_TRIES = 3

export interface MixRound {
    kind: MixKind
    product: MixProduct
    /** Price in cents a kilo, or fineness in thousandths: the low one first */
    values: [number, number]
    /** The price (or fineness) to reach, in the same units */
    target: number
    /** 'total': kilos (grams) of mixture; 'add': kilos (grams) already in, of the product `given` */
    amount: number
    given: 0 | 1
    /** Kilos (grams) of the low and of the high product that hit the target */
    solution: [number, number]
}

const GOODS = [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1800, 2000] as const
const GOLD = [600, 650, 700, 750, 800, 850, 900, 950, 1000] as const
const GOODS_PRODUCTS: MixProduct[] = ['coffee', 'tea', 'sweets', 'nuts']

/** Arabic writes the decimal point inside its formulas too */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })

const isGold = (round: MixRound) => round.product === 'gold'
/** Cents in a euro, or thousandths in a fineness of 1 */
const scale = (round: MixRound) => (isGold(round) ? 1000 : 100)

/** The most the player can add on an 'add' round: the end of the slider, the same in every round */
export const addMax = (round: MixRound) => (isGold(round) ? 80 : 40)

/** The slider sets the high product on a 'total' round, and the product added on an 'add' round */
export const settingMax = (round: MixRound) => (round.kind === 'total' ? round.amount : addMax(round))

/** Kilos (grams) of the low and of the high product for a setting of the slider */
export function mixAmounts(round: MixRound, setting: number): [number, number] {
    if (round.kind === 'total') return [round.amount - setting, setting]
    return round.given === 0 ? [round.amount, setting] : [setting, round.amount]
}

export const solutionSetting = (round: MixRound) => (round.kind === 'total' ? round.solution[1] : round.solution[1 - round.given])

/** Distances from each value to the support, in cents (thousandths) */
export const mixDistances = (round: MixRound): [number, number] => [round.target - round.values[0], round.values[1] - round.target]

/** Kilos times distance on each side of the seesaw, in cents (thousandths) */
export function mixMoments(round: MixRound, amounts: [number, number]): [number, number] {
    const [low, high] = mixDistances(round)
    return [amounts[0] * low, amounts[1] * high]
}

/** −1 when the mixture comes out too cheap (the seesaw tips to the low side), 1 when too dear, 0 when right */
export function mixSide(round: MixRound, amounts: [number, number]): -1 | 0 | 1 {
    const [low, high] = mixMoments(round, amounts)
    return low === high ? 0 : high > low ? 1 : -1
}

function draft(random: Random, level: number, kind: MixKind): MixRound | null {
    const gold = mixLevels[level].gold
    const product = gold ? 'gold' : pick(random, GOODS_PRODUCTS)
    const [low, high] = shuffle(random, gold ? GOLD : GOODS).slice(0, 2).sort((a, b) => a - b)
    if (high - low < (gold ? 100 : 200)) return null
    let amounts: [number, number]
    let amount: number
    let given: 0 | 1 = 0
    if (kind === 'total') {
        amount = randomInt(random, gold ? 10 : 6, gold ? 60 : 30)
        const dear = randomInt(random, 1, amount - 1)
        amounts = [amount - dear, dear]
    } else {
        given = random() < 0.5 ? 0 : 1
        amount = randomInt(random, gold ? 5 : 2, gold ? 60 : 30)
        const added = randomInt(random, 1, gold ? 60 : 30)
        amounts = given === 0 ? [amount, added] : [added, amount]
    }
    const [a, b] = amounts
    // Not half and half, and a ratio of small numbers: the seesaw rule gives it in a line
    if (a === b || Math.max(a, b) / gcd(a, b) > 6) return null
    // A price a kilo in tens of cents (a fineness in hundredths), with neither distance tiny
    const sum = a * low + b * high
    if (sum % ((a + b) * 10) !== 0) return null
    const target = sum / (a + b)
    if (Math.min(target - low, high - target) < (gold ? 20 : 30)) return null
    return { kind, product, values: [low, high], target, amount, given, solution: amounts }
}

const sameRound = (left: MixRound, right: MixRound) => left.values.join() === right.values.join() || left.target === right.target

export function createMixRound(random: Random, level: number, kind: MixKind, avoid: MixRound[] = []): MixRound {
    for (let attempt = 0; attempt < 20000; attempt += 1) {
        const round = draft(random, level, kind)
        if (round && !avoid.some((other) => sameRound(other, round))) return round
    }
    throw new Error(`No mixture round for level ${level}`)
}

/** On the gold level, three rounds of a whole bar and two of adding */
export function createMixRounds(random: Random, level: number): MixRound[] {
    const kinds = mixLevels[level].kinds
    const plan: MixKind[] = kinds.length === 1 ? Array.from({ length: MIX_ROUNDS }, () => kinds[0]) : shuffle(random, ['total', 'total', 'total', 'add', 'add'])
    const rounds: MixRound[] = []
    for (const kind of plan) rounds.push(createMixRound(random, level, kind, rounds))
    return rounds
}

/** 3 points at the first try, 2 at the second, 1 at the third */
export const mixPoints = (tries: number) => Math.max(0, MIX_TRIES + 1 - tries)

export function mixStars(total: number): Stars {
    if (total >= 13) return 3
    if (total >= 10) return 2
    if (total >= 6) return 1
    return 0
}

/* ---------- Texts ---------- */

/** «6 kg», «40 g»; in Arabic «6 كغ» */
export function amountText(round: MixRound, value: number, language: UnitLanguage): string {
    const unit = isGold(round) ? (language === 'ar' ? 'غ' : 'g') : language === 'ar' ? 'كغ' : 'kg'
    return `${value} ${unit}`
}

/** A price a kilo («8,40 €/kg») or a fineness («0,82»), rounded to the cent or the thousandth */
export function valueText(round: MixRound, value: number, language: UnitLanguage): string {
    if (!isGold(round)) return `${moneyText(Math.round(value) / 100, language)} €/${language === 'ar' ? 'كغ' : 'kg'}`
    const text = String(Math.round(value) / 1000)
    return language === 'ar' ? text : text.replace('.', ',')
}

/** A value in a sentence: «8 €/kg», or «ley 0,82» for gold */
function valuePhrase(round: MixRound, value: number, language: UnitLanguage): string {
    if (!isGold(round)) return valueText(round, value, language)
    return `${say('purutasuna', 'ley', 'عيار')[language]} ${valueText(round, value, language)}`
}

/** A distance on the seesaw: «2 €», «1,50 €», «0,05» */
export function distanceText(round: MixRound, value: number, language: UnitLanguage): string {
    return isGold(round) ? valueText(round, value, language) : `${moneyText(value / 100, language)} €`
}

const forLanguages = (make: (language: UnitLanguage) => string) => say(make('eu'), make('es'), make('ar'))

const HEADINGS: Record<MixProduct, LocalizedText> = {
    coffee: say('Kafe nahasketa, kiloa:', 'Mezcla de café a:', 'خليط من البن بسعر:'),
    tea: say('Te nahasketa, kiloa:', 'Mezcla de té a:', 'خليط من الشاي بسعر:'),
    sweets: say('Gozoki nahasketa, kiloa:', 'Mezcla de caramelos a:', 'خليط من الحلوى بسعر:'),
    nuts: say('Fruitu lehor nahasketa, kiloa:', 'Mezcla de frutos secos a:', 'خليط من المكسرات بسعر:'),
    gold: say('Urre-aleazioa, purutasuna:', 'Aleación de oro de ley:', 'سبيكة من الذهب عيارها:')
}

/** Above the value to reach: what is being made */
export const mixHeading = (round: MixRound) => HEADINGS[round.product]

/** The value to reach, big */
export const mixTarget = (round: MixRound) => forLanguages((language) => valueText(round, round.target, language))

/** What the player has to decide */
export function mixTask(round: MixRound): LocalizedText {
    const amount = (language: UnitLanguage) => amountText(round, round.amount, language)
    if (round.kind === 'total') {
        return say(
            `Guztira: ${amount('eu')}. Zenbat jarri bakoitzetik?`,
            `En total, ${amount('es')}. ¿Cuánto pones de cada uno?`,
            `المجموع ${amount('ar')}. كم تضع من كلٍّ منهما؟`
        )
    }
    const given = (language: UnitLanguage) => valuePhrase(round, round.values[round.given], language)
    const other = (language: UnitLanguage) => valuePhrase(round, round.values[1 - round.given], language)
    return say(
        `Dagoeneko ${amount('eu')} daude (${given('eu')}). Zenbat gehitzen duzu bestetik (${other('eu')})?`,
        `Ya hay ${amount('es')} (${given('es')}). ¿Cuánto añades del otro (${other('es')})?`,
        `لديك ${amount('ar')} (${given('ar')}). كم تضيف من الآخر (${other('ar')})؟`
    )
}

/** The mean of a try: (6 · 6 + 4 · 11) / 10 = 80 / 10 = 8, with ≈ when it is not a whole number of cents (thousandths) */
export function mixLatex(round: MixRound, amounts: [number, number]): string {
    const [a, b] = amounts
    const [low, high] = round.values
    const unit = scale(round)
    const sum = a * low + b * high
    const total = a + b
    const result = sum % total === 0 ? `=${latexNumber(sum / total / unit)}` : `\\approx ${latexNumber(Math.round(sum / total) / unit)}`
    return `\\frac{${a}\\cdot ${latexNumber(low / unit)}+${b}\\cdot ${latexNumber(high / unit)}}{${total}}=\\frac{${latexNumber(sum / unit)}}{${total}}${result}`
}

/** What a try gives: right, too cheap or too dear (too low or too high a fineness) */
export function mixVerdict(round: MixRound, amounts: [number, number]): { right: boolean; text: LocalizedText } {
    const side = mixSide(round, amounts)
    const [a, b] = amounts
    const sum = a * round.values[0] + b * round.values[1]
    const approx = sum % (a + b) === 0 ? '' : '≈ '
    // In Arabic the value and its ≈ stay together, left to right
    const value = (language: UnitLanguage) => {
        const text = `${approx}${valueText(round, sum / (a + b), language)}`
        return language === 'ar' ? `\u2066${text}\u2069` : text
    }
    if (isGold(round)) {
        if (side === 0) return { right: true, text: say(`Aleazio perfektua: purutasuna ${value('eu')}!`, `¡Aleación perfecta! Ley ${value('es')}.`, `سبيكة مثالية: العيار ${value('ar')}!`) }
        return side > 0
            ? { right: false, text: say(`Purutasuna: ${value('eu')}. Altuegia!`, `Ley ${value('es')}: demasiado alta.`, `العيار ${value('ar')}: مرتفع جدًا.`) }
            : { right: false, text: say(`Purutasuna: ${value('eu')}. Baxuegia!`, `Ley ${value('es')}: demasiado baja.`, `العيار ${value('ar')}: منخفض جدًا.`) }
    }
    if (side === 0) return { right: true, text: say(`Nahasketa perfektua: ${value('eu')}!`, `¡Mezcla perfecta! Sale a ${value('es')}.`, `خليط مثالي: ${value('ar')}!`) }
    return side > 0
        ? { right: false, text: say(`Prezioa: ${value('eu')}. Garestiegia!`, `Sale a ${value('es')}: demasiado cara.`, `السعر ${value('ar')}: غالٍ جدًا.`) }
        : { right: false, text: say(`Prezioa: ${value('eu')}. Merkeegia!`, `Sale a ${value('es')}: demasiado barata.`, `السعر ${value('ar')}: رخيص جدًا.`) }
}

/** Kilos times distance on one side, in LaTeX: 5 · 2 = 10 */
function momentLatex(round: MixRound, amount: number, distance: number): string {
    const unit = scale(round)
    return `${amount}\\cdot ${latexNumber(distance / unit)}=${latexNumber((amount * distance) / unit)}`
}

/** After a miss: the seesaw rule, and what each side weighs now */
export function mixHint(round: MixRound, amounts: [number, number]): LocalizedText {
    const [low, high] = mixDistances(round)
    const left = momentLatex(round, amounts[0], low)
    const right = momentLatex(round, amounts[1], high)
    return isGold(round)
        ? say(
            `Balantza: gramoak bider distantzia, berdin bi aldeetan. Orain: $${left}$ eta $${right}$.`,
            `Balancín: gramos por distancia, igual a los dos lados. Ahora: $${left}$ y $${right}$.`,
            `الميزان: الغرامات في المسافة متساوية في الجهتين. الآن: $${left}$ و$${right}$.`
        )
        : say(
            `Balantza: kiloak bider distantzia, berdin bi aldeetan. Orain: $${left}$ eta $${right}$.`,
            `Balancín: kilos por distancia, igual a los dos lados. Ahora: $${left}$ y $${right}$.`,
            `الميزان: الكيلوغرامات في المسافة متساوية في الجهتين. الآن: $${left}$ و$${right}$.`
        )
}

/** The seesaw balanced with the answer: 6 · 2 = 4 · 3 */
export function mixBalanceLatex(round: MixRound): string {
    const [low, high] = mixDistances(round)
    const unit = scale(round)
    return `${round.solution[0]}\\cdot ${latexNumber(low / unit)}=${round.solution[1]}\\cdot ${latexNumber(high / unit)}`
}

/** After the last miss: what had to go in */
export function mixSolutionText(round: MixRound): LocalizedText {
    const amount = (side: 0 | 1, language: UnitLanguage) => amountText(round, round.solution[side], language)
    const value = (side: 0 | 1, language: UnitLanguage) => valuePhrase(round, round.values[side], language)
    if (round.kind === 'add') {
        const other = (1 - round.given) as 0 | 1
        return say(
            `Gehitu behar zena: ${amount(other, 'eu')} (${value(other, 'eu')}).`,
            `Había que añadir ${amount(other, 'es')} (${value(other, 'es')}).`,
            `كان يجب إضافة ${amount(other, 'ar')} (${value(other, 'ar')}).`
        )
    }
    return say(
        `Jarri behar zena: ${amount(0, 'eu')} (${value(0, 'eu')}) eta ${amount(1, 'eu')} (${value(1, 'eu')}).`,
        `Había que poner ${amount(0, 'es')} (${value(0, 'es')}) y ${amount(1, 'es')} (${value(1, 'es')}).`,
        `كان يجب وضع ${amount(0, 'ar')} (${value(0, 'ar')}) و${amount(1, 'ar')} (${value(1, 'ar')}).`
    )
}
