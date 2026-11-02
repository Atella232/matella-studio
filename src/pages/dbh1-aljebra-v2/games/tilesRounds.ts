import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Algebra tiles (1. DBH algebra): an expression with like terms. The learner
   sets the coefficients of the reduced expression with steppers; then each
   term becomes tiles (x² squares, x bars, unit squares, negative ones in
   coral), each kind in its row, and the + and − tiles cancel in pairs.
   Level 1: x terms and numbers, all added; level 2: with subtractions;
   level 3: x² terms too.
   ========================================================================== */

export const TILES_ROUNDS = 5
/** The steppers' range */
export const COEFFICIENT_LIMIT = 9
/** At most this many tiles in a line of a row */
export const LINE_MAX: Record<Kind, number> = { x2: 6, x: 12, c: 14 }

export type Kind = 'x2' | 'x' | 'c'
export const KINDS: Kind[] = ['x2', 'x', 'c']
export interface Term { kind: Kind; value: number }
export type Poly = Record<Kind, number>

export interface TilesRound {
    terms: Term[]
    answer: Poly
}

const signedPart = (value: number, kind: Kind, first: boolean): string => {
    const size = Math.abs(value)
    const letters = kind === 'x2' ? 'x^{2}' : kind === 'x' ? 'x' : ''
    const body = kind === 'c' ? `${size}` : size === 1 ? letters : `${size}${letters}`
    return `${value < 0 ? '-' : first ? '' : '+'}${body}`
}

/** The expression as written, term after term */
export const termsLatex = (terms: Term[]) => terms.map((term, index) => signedPart(term.value, term.kind, index === 0)).join('')

/** A reduced expression: x², x and the number, the zero ones left out */
export function polyLatex(poly: Poly): string {
    const parts = KINDS.filter((kind) => poly[kind] !== 0)
    return parts.length === 0 ? '0' : parts.map((kind, index) => signedPart(poly[kind], kind, index === 0)).join('')
}

/** The sum of the positive and of the negative coefficients of a kind */
export function tileCounts(terms: Term[], kind: Kind): [number, number] {
    const values = terms.filter((term) => term.kind === kind).map((term) => term.value)
    return [values.filter((value) => value > 0).reduce((sum, value) => sum + value, 0), -values.filter((value) => value < 0).reduce((sum, value) => sum + value, 0)]
}

const signed = (random: Random, max: number) => (random() < 0.5 ? -1 : 1) * randomInt(random, 1, max)

export function createTilesRound(random: Random, levelIndex: number): TilesRound {
    for (;;) {
        const terms: Term[] = levelIndex === 0
            ? [{ kind: 'x', value: randomInt(random, 1, 5) }, { kind: 'x', value: randomInt(random, 1, 5) }, { kind: 'c', value: randomInt(random, 1, 6) }, { kind: 'c', value: randomInt(random, 1, 6) }]
            : [
                ...(levelIndex === 2 ? [{ kind: 'x2' as const, value: signed(random, 3) }, { kind: 'x2' as const, value: signed(random, 3) }] : []),
                { kind: 'x', value: signed(random, 6) }, { kind: 'x', value: signed(random, 6) },
                ...(levelIndex === 1 ? [{ kind: 'x' as const, value: signed(random, 4) }] : []),
                { kind: 'c', value: signed(random, 7) }, { kind: 'c', value: signed(random, 7) }
            ]
        const shuffled = shuffle(random, terms)
        const answer = { x2: 0, x: 0, c: 0 }
        for (const term of shuffled) answer[term.kind] += term.value
        if (answer.x === 0 || KINDS.some((kind) => Math.abs(answer[kind]) > COEFFICIENT_LIMIT)) continue
        if (levelIndex === 2 && answer.x2 === 0) continue
        if (levelIndex > 0 && !shuffled.some((term) => term.value < 0)) continue
        if (KINDS.some((kind) => tileCounts(shuffled, kind).some((count) => count > LINE_MAX[kind]))) continue
        return { terms: shuffled, answer }
    }
}

export const createTilesRounds = (random: Random, levelIndex: number) => Array.from({ length: TILES_ROUNDS }, () => createTilesRound(random, levelIndex))
