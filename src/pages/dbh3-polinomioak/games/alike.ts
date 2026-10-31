import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Antzekoen ehiza (La caza de semejantes, 3. DBH): a monomial is shown,
   and among nine cards the learner taps every one that is a like term (the
   same letters with the same exponents), then presses «done». Level 1 has
   one letter; level 2 two letters (x²y is not xy²); level 3 the traps — the
   same coefficient with another exponent, and like terms with different
   coefficients and signs. A round is right only if the set is exact.
   Pure logic.
   ========================================================================== */

export const ALIKE_ROUNDS = 8
export const ALIKE_CARDS = 9

export interface Monomial {
    coefficient: number
    /** Exponent of x and of y */
    x: number
    y: number
}

export interface AlikeRound {
    target: Monomial
    cards: Monomial[]
    /** Positions of the like terms */
    like: number[]
}

export const sameLiteral = (a: Monomial, b: Monomial) => a.x === b.x && a.y === b.y

export function monomialLatex({ coefficient, x, y }: Monomial): string {
    const letters = `${x === 0 ? '' : x === 1 ? 'x' : `x^{${x}}`}${y === 0 ? '' : y === 1 ? 'y' : `y^{${y}}`}`
    const size = Math.abs(coefficient)
    const number = size === 1 && letters !== '' ? '' : String(size)
    return `${coefficient < 0 ? '-' : ''}${number}${letters}`
}

const coefficient = (random: Random) => pick(random, [-7, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 8, 9])

function round(random: Random, level: number): AlikeRound | null {
    const twoLetters = level >= 1
    const target: Monomial = { coefficient: coefficient(random), x: randomInt(random, 1, 3), y: twoLetters ? randomInt(random, level === 1 ? 0 : 1, 2) : 0 }
    const likeCount = randomInt(random, 2, 4)
    const cards: Monomial[] = []
    for (let i = 0; i < likeCount; i += 1) cards.push({ ...target, coefficient: coefficient(random) })
    while (cards.length < ALIKE_CARDS) {
        const card: Monomial = level === 2
            // Traps: the target's coefficient with the exponents moved around
            ? pick(random, [{ ...target, x: target.y, y: target.x }, { ...target, x: target.x + 1 }, { ...target, y: target.y + 1 }, { ...target, x: Math.max(0, target.x - 1) }, { coefficient: coefficient(random), x: randomInt(random, 0, 3), y: randomInt(random, 0, 2) }])
            : { coefficient: coefficient(random), x: randomInt(random, 0, 3), y: twoLetters ? randomInt(random, 0, 2) : 0 }
        if (sameLiteral(card, target) || (card.x === 0 && card.y === 0 && random() < 0.6)) continue
        cards.push(card)
    }
    const shuffled = shuffle(random, cards)
    const like = shuffled.map((card, index) => (sameLiteral(card, target) ? index : -1)).filter((index) => index >= 0)
    // Every card shows a different monomial
    if (new Set(shuffled.map(monomialLatex)).size < ALIKE_CARDS) return null
    return { target, cards: shuffled, like }
}

export function createAlikeRounds(random: Random, level: number): AlikeRound[] {
    const rounds: AlikeRound[] = []
    while (rounds.length < ALIKE_ROUNDS) {
        const next = round(random, level)
        if (next) rounds.push(next)
    }
    return rounds
}

export const alikeRight = (round: AlikeRound, picked: number[]) => picked.length === round.like.length && round.like.every((index) => picked.includes(index))

export function alikeStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
