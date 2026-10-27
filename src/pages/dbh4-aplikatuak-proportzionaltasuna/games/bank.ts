import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { latexNumber as num } from './numbers.ts'

/* ==========================================================================
   El banco (4. DBH aplikatuak): two or three savings offers for the same
   capital and the same years; the player picks the one that gives the most
   money, and then bars show what each one gives. Level 1 sets simple
   interest against compound; level 2, compound interest paid every month,
   quarter, half-year or year at close rates; level 3 mixes all of them.
   The best offer always beats the next one by a clear margin, and each
   level is built so that every kind of offer wins some rounds.
   ========================================================================== */

export type BankPeriods = 1 | 2 | 4 | 12

export interface BankOffer {
    simple: boolean
    /** Annual rate, in % */
    rate: number
    /** Times a year the interest is paid (1 for simple interest) */
    periods: BankPeriods
}

export interface BankRound {
    capital: number
    years: number
    offers: BankOffer[]
    best: number
}

export const BANK_ROUNDS = 6

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`
const percent = (rate: number) => math(`${num(rate)}\\,\\%`)
const percentEu = (rate: number) => math(`\\%\\,${num(rate)}`)

export function bankFinal(capital: number, years: number, offer: BankOffer): number {
    if (offer.simple) return capital * (1 + (offer.rate / 100) * years)
    return capital * (1 + offer.rate / 100 / offer.periods) ** (offer.periods * years)
}

export const bankFinals = (round: BankRound) => round.offers.map((offer) => bankFinal(round.capital, round.years, offer))

/** How much the best offer must beat the next one by: 0,2 % of the capital, and never less than 5 € */
export const bankMargin = (capital: number) => Math.max(5, capital * 0.002)

/** The kind of offer that wins a round, so that each level spreads the winners */
type Winner = 'simple' | 'annual' | 'often' | 'rate'

/** Rates in halves (level 2 also in tenths) */
const halves = (random: Random, min: number, max: number) => randomInt(random, min * 2, max * 2) / 2

function draft(random: Random, level: number): Omit<BankRound, 'best'> {
    const capital = pick(random, [1000, 2000, 3000, 5000, 8000, 10000, 20000])
    if (level === 0) {
        const compound = halves(random, 2, 6)
        return {
            capital,
            years: randomInt(random, 2, 15),
            offers: [
                { simple: true, rate: compound + pick(random, [0, 0.5, 1, 1.5, 2, 2.5, 3]), periods: 1 },
                { simple: false, rate: compound, periods: 1 }
            ]
        }
    }
    if (level === 1) {
        // The less often a bank pays the interest, the higher the rate it tends to offer
        const base = halves(random, 3, 8)
        const periods = shuffle(random, [1, 2, 4, 12] as BankPeriods[]).slice(0, 3).sort((a, b) => b - a)
        let rate = base
        return {
            capital,
            years: randomInt(random, 2, 6),
            offers: periods.map((times) => {
                rate = Math.round((rate + (times === periods[0] ? 0 : randomInt(random, 0, 4) / 10)) * 10) / 10
                return { simple: false, rate, periods: times }
            })
        }
    }
    const base = halves(random, 2, 6)
    return {
        capital,
        years: randomInt(random, 2, 12),
        offers: [
            { simple: true, rate: base + pick(random, [0.5, 1, 1.5, 2, 3]), periods: 1 },
            { simple: false, rate: base + pick(random, [0, 0.2, 0.5]), periods: 1 },
            { simple: false, rate: base, periods: pick(random, [2, 4, 12] as const) }
        ]
    }
}

function winnerOf(offers: BankOffer[], best: number, level: number): Winner {
    const offer = offers[best]
    if (level === 1) return offer.periods === Math.max(...offers.map((other) => other.periods)) ? 'often' : 'rate'
    return offer.simple ? 'simple' : offer.periods === 1 ? 'annual' : 'often'
}

/** A round whose best offer is of the kind wanted (any kind if that does not come up), shown in a random order */
export function createBankRound(random: Random, level: number, wanted: Winner | null = null): BankRound {
    let fallback: BankRound | null = null
    for (let attempt = 0; attempt < 4000; attempt += 1) {
        const { capital, years, offers: drafted } = draft(random, level)
        const offers = shuffle(random, drafted)
        const finals = offers.map((offer) => bankFinal(capital, years, offer))
        const order = finals.map((_, index) => index).sort((a, b) => finals[b] - finals[a])
        if (finals[order[0]] - finals[order[1]] < bankMargin(capital)) continue
        const round = { capital, years, offers, best: order[0] }
        if (wanted === null || winnerOf(offers, order[0], level) === wanted) return round
        fallback ??= round
    }
    if (fallback) return fallback
    throw new Error(`No bank round for level ${level}`)
}

const levelWinners: Winner[][] = [
    ['simple', 'simple', 'simple', 'annual', 'annual', 'annual'],
    ['often', 'often', 'often', 'rate', 'rate', 'rate'],
    ['simple', 'simple', 'annual', 'annual', 'often', 'often']
]

export function createBankRounds(random: Random, level: number): BankRound[] {
    return shuffle(random, levelWinners[level]).map((wanted) => createBankRound(random, level, wanted))
}

/** One point per round */
export function bankStars(score: number): Stars {
    if (score >= 6) return 3
    if (score >= 5) return 2
    if (score >= 4) return 1
    return 0
}

/* ---------- Texts ---------- */

export const BANK_LETTERS = [say('A', 'A', 'أ'), say('B', 'B', 'ب'), say('C', 'C', 'ج')]

export const bankName = (index: number): LocalizedText => {
    const letter = BANK_LETTERS[index]
    return { eu: `${letter.eu} bankua`, es: `Banco ${letter.es}`, ar: `المصرف ${letter.ar}` }
}

export const bankPrompt = (round: BankRound) => say(
    `${math(num(round.capital))} € dituzu ${math(String(round.years))} urterako. Zein eskaintzak ematen dizu diru gehien?`,
    `Tienes ${math(num(round.capital))} € para ${math(String(round.years))} años. ¿Qué oferta te da más dinero?`,
    `لديك ${math(num(round.capital))} € لمدة ${math(String(round.years))} سنوات. أي عرض يعطيك مالًا أكثر؟`
)

const PERIOD_TEXT: Record<BankPeriods, LocalizedText> = {
    1: say('Interesak urtean behin', 'Intereses cada año', 'تُضاف الفوائد كل سنة'),
    2: say('Interesak sei hilean behin', 'Intereses cada semestre', 'تُضاف الفوائد كل ستة أشهر'),
    4: say('Interesak hiru hilean behin', 'Intereses cada trimestre', 'تُضاف الفوائد كل ثلاثة أشهر'),
    12: say('Interesak hilean behin', 'Intereses cada mes', 'تُضاف الفوائد كل شهر')
}

/** What the card of an offer says: the kind of interest, the rate and how often it is paid */
export function bankOfferTexts(offer: BankOffer): [LocalizedText, LocalizedText, LocalizedText] {
    return [
        offer.simple ? say('Interes bakuna', 'Interés simple', 'فائدة بسيطة') : say('Interes konposatua', 'Interés compuesto', 'فائدة مركّبة'),
        say(`Urteko ${percentEu(offer.rate)}`, `${percent(offer.rate)} anual`, `${percent(offer.rate)} سنويًا`),
        offer.simple ? say('Interesak ez dira kapitalari gehitzen', 'Los intereses no se suman al capital', 'لا تُضاف الفوائد إلى رأس المال') : PERIOD_TEXT[offer.periods]
    ]
}

/** The formula of an offer, without its value */
export function bankFormula(round: BankRound, offer: BankOffer): string {
    const capital = num(round.capital)
    if (offer.simple) return `${capital}\\cdot(1+${num(offer.rate / 100)}\\cdot ${round.years})`
    if (offer.periods === 1) return `${capital}\\cdot ${num(1 + offer.rate / 100)}^{${round.years}}`
    return `${capital}\\cdot\\left(1+\\frac{${num(offer.rate / 100)}}{${offer.periods}}\\right)^{${offer.periods * round.years}}`
}

/** What the round teaches, from the best offer and the next one */
export function bankLesson(round: BankRound): LocalizedText {
    const finals = bankFinals(round)
    const second = finals.map((_, index) => index).filter((index) => index !== round.best).sort((a, b) => finals[b] - finals[a])[0]
    const best = round.offers[round.best]
    const next = round.offers[second]
    const years = math(String(round.years))
    if (!best.simple && next.simple) {
        return best.rate < next.rate
            ? say(
                `${years} urtean, konposatuak irabazten du, tasa txikiagoa izan arren: interesek ere interesak sortzen dituzte.`,
                `En ${years} años, el compuesto gana aunque su tipo sea menor: los intereses también dan intereses.`,
                `في ${years} سنوات تربح المركّبة رغم أن سعرها أقل: الفوائد تُنتج فوائد أيضًا.`
            )
            : say(
                'Tasa berdinarekin edo handiagoarekin, konposatuak irabazten du bigarren urtetik aurrera.',
                'Con el mismo tipo o mayor, el compuesto gana a partir del segundo año.',
                'بالسعر نفسه أو بسعر أعلى تربح المركّبة ابتداءً من السنة الثانية.'
            )
    }
    if (best.simple) {
        return say(
            `Hemen tasak gehiago balio du: ${years} urtean, interesen interesek ez dute aldea berdintzen.`,
            `Aquí pesa más el tipo: en ${years} años, el interés de los intereses no llega a compensarlo.`,
            `هنا يغلب السعر: في ${years} سنوات لا تعوّضه فوائد الفوائد.`
        )
    }
    if (best.periods > next.periods && best.rate <= next.rate) {
        return say(
            'Interesak maizago sartzeak zerbait gehiago ematen du, tasa berdina edo txikiagoa izan arren.',
            'Abonar los intereses más a menudo da un poco más, aunque el tipo sea igual o menor.',
            'إضافة الفوائد بوتيرة أكبر تعطي أكثر قليلًا، ولو كان السعر مساويًا أو أقل.'
        )
    }
    if (best.rate > next.rate && best.periods <= next.periods) {
        return say(
            'Hemen tasak gehiago balio du: interesak maizago sartzeak ez du tasa txikiagoa berdintzen.',
            'Aquí pesa más el tipo: abonar los intereses más a menudo no compensa un tipo menor.',
            'هنا يغلب السعر: إضافة الفوائد بوتيرة أكبر لا تعوّض سعرًا أقل.'
        )
    }
    return say(
        'Tasa handiagoa eta interesak maizago: bi arrazoiengatik irabazten du.',
        'Tipo mayor e intereses más a menudo: gana por las dos cosas.',
        'سعر أعلى وإضافة أكثر تواترًا: يربح للسببين.'
    )
}
