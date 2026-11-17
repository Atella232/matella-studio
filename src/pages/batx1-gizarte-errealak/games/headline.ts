import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J2 · Titular zuzena (El titular justo): an exact figure (votes,
   visitors, inhabitants…) and four headlines that round it to 1, 2, 3 and
   4 significant figures. The learner chooses the shortest headline whose
   relative error stays under the limit of the level (5 %, 1 %, 0,1 %):
   fewer figures break the limit, more figures are longer than needed.
   Pure logic; the figures are whole numbers of six or seven digits.
   ========================================================================== */

export const HEADLINE_ROUNDS = 5
export const HEADLINE_LIMITS = [0.05, 0.01, 0.001] as const

export interface HeadlineRound {
    label: LocalizedText
    exact: number
    limit: number
    /** The four headlines, each with its significant figures, in the order shown */
    options: Array<{ figures: number; value: number }>
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

const LABELS: LocalizedText[] = [
    say('Alderdi baten botoak', 'Votos de un partido', 'أصوات حزب', 'Votes for a party'),
    say('Museo baten bisitariak', 'Visitantes de un museo', 'زوار متحف', 'Visitors to a museum'),
    say('Hiri baten biztanleak', 'Habitantes de una ciudad', 'سكان مدينة', 'Inhabitants of a city'),
    say('Langabeak', 'Parados', 'العاطلون عن العمل', 'Unemployed people'),
    say('Liburu baten salmentak', 'Ventas de un libro', 'مبيعات كتاب', 'Sales of a book'),
    say('Ikus-entzuleak', 'Espectadores', 'المشاهدون', 'Viewers')
]

/** N rounded to k significant figures */
export function roundTo(value: number, figures: number): number {
    const unit = 10 ** (Math.floor(Math.log10(value)) - figures + 1)
    return Math.round(value / unit) * unit
}

export const relativeError = (exact: number, value: number) => Math.abs(exact - value) / exact

/** The fewest figures whose relative error is under the limit */
export const neededFigures = (exact: number, limit: number) => [1, 2, 3, 4].find((figures) => relativeError(exact, roundTo(exact, figures)) < limit) ?? 4

export const rightOption = (round: HeadlineRound) => round.options.findIndex((option) => option.figures === neededFigures(round.exact, round.limit))

export function createHeadlineRound(random: Random, level: number): HeadlineRound {
    const limit = HEADLINE_LIMITS[level] ?? HEADLINE_LIMITS[0]
    for (;;) {
        const exact = randomInt(random, 120000, 9800000)
        const values = [1, 2, 3, 4].map((figures) => roundTo(exact, figures))
        // Four different headlines, none equal to the exact figure, and no error too close to the limit
        if (new Set(values).size < 4 || values.includes(exact)) continue
        if (values.some((value) => Math.abs(relativeError(exact, value) - limit) < limit * 0.08)) continue
        const needed = neededFigures(exact, limit)
        // The answer is not always the same number of figures: on the first level, 1 or 2 or 3; then 2, 3 or 4
        if (relativeError(exact, roundTo(exact, needed)) >= limit) continue
        if (level > 0 && needed === 1) continue
        return { label: pick(random, LABELS), exact, limit, options: shuffle(random, values.map((value, index) => ({ figures: index + 1, value }))) }
    }
}

export function createHeadlineRounds(random: Random, level: number): HeadlineRound[] {
    return Array.from({ length: HEADLINE_ROUNDS }, () => createHeadlineRound(random, level))
}

/** A whole number for LaTeX, thousands with \, from five digits */
export const groupedLatex = (value: number) => {
    const text = String(Math.round(value))
    return text.length >= 5 ? text.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : text
}
