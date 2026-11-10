import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { hundredthsLatex, tenthsLatex } from '../lab/probability.ts'

/* ==========================================================================
   J1 · Independenteak, bateraezinak ala ez bata ez bestea? (¿Independientes,
   incompatibles o ninguna de las dos?): a few data about two events and
   three buttons. Independent when P(A∩B) = P(A)·P(B), mutually exclusive
   when P(A∩B) = 0 (with P(A) and P(B) positive, never both). Level 1
   gives P(A∩B); level 2 gives P(A∪B), so the intersection has to be
   worked out first; level 3 gives P(B/A), to compare with P(B). Every set
   of six rounds has each answer at least once. Probabilities in
   hundredths, so every value is exact. Pure logic.
   ========================================================================== */

export const RELATION_ROUNDS = 6

export type Relation = 'independent' | 'exclusive' | 'neither'
export const RELATIONS: Relation[] = ['independent', 'exclusive', 'neither']

export interface RelationRound {
    /** P(A), P(B) and P(A∩B) in hundredths */
    a: number
    b: number
    both: number
    /** What the round shows: the intersection, the union or P(B/A) */
    given: 'both' | 'union' | 'conditional'
    answer: Relation
}

export const relationOf = (round: Pick<RelationRound, 'a' | 'b' | 'both'>): Relation => (round.both === 0 ? 'exclusive' : round.both * 100 === round.a * round.b ? 'independent' : 'neither')

/** The data of a round, in LaTeX */
export function relationData(round: RelationRound): string[] {
    const h = hundredthsLatex
    const third = round.given === 'both' ? `P(A\\cap B)=${h(round.both)}` : round.given === 'union' ? `P(A\\cup B)=${h(round.a + round.b - round.both)}` : `P(B/A)=${tenthsLatex((round.both * 10) / round.a)}`
    return [`P(A)=${h(round.a)}`, `P(B)=${h(round.b)}`, third]
}

/** The worked check after answering */
export function relationWorked(round: RelationRound): string[] {
    const h = hundredthsLatex
    const lines: string[] = []
    if (round.given === 'union') lines.push(`P(A\\cap B)=${h(round.a)}+${h(round.b)}-${h(round.a + round.b - round.both)}=${h(round.both)}`)
    if (round.given === 'conditional') lines.push(`P(A\\cap B)=${h(round.a)}\\cdot ${tenthsLatex((round.both * 10) / round.a)}=${h(round.both)}`)
    lines.push(`P(A)\\cdot P(B)=${h(round.a)}\\cdot ${h(round.b)}=${h((round.a * round.b) / 100)}`)
    return lines
}

function makeRound(random: Random, level: number, answer: Relation): RelationRound | null {
    const given = (['both', 'union', 'conditional'] as const)[level] ?? 'both'
    const a = 10 * randomInt(random, 2, 8)
    const b = 10 * randomInt(random, 2, 8)
    let both: number
    if (answer === 'exclusive') {
        if (a + b > 100) return null
        both = 0
    } else if (answer === 'independent') {
        both = (a * b) / 100
    } else if (given === 'conditional') {
        // P(B/A) in tenths, different from P(B) and from 0
        const tenths = randomInt(random, 1, 9)
        if (tenths * 10 === b) return null
        both = (a * tenths) / 10
    } else {
        both = 5 * randomInt(random, 1, Math.min(a, b) / 5)
        if (both * 100 === a * b) return null
    }
    if (!Number.isInteger(both) || both > Math.min(a, b) || a + b - both > 100) return null
    if (given === 'conditional' && !Number.isInteger((both * 10) / a)) return null
    const round: RelationRound = { a, b, both, given, answer }
    return relationOf(round) === answer ? round : null
}

/** Six rounds: each answer twice, in a random order, never the same numbers twice */
export function createRelationRounds(random: Random, level: number): RelationRound[] {
    const answers = shuffle(random, [...RELATIONS, ...RELATIONS])
    const rounds: RelationRound[] = []
    for (const answer of answers) {
        for (let attempt = 0; attempt < 500; attempt += 1) {
            const round = makeRound(random, level, answer)
            if (round && !rounds.some((other) => other.a === round.a && other.b === round.b && other.both === round.both)) {
                rounds.push(round)
                break
            }
        }
    }
    return rounds.length === RELATION_ROUNDS ? rounds : createRelationRounds(random, level)
}
