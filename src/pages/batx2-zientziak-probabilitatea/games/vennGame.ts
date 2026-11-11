import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { EVENT_EXPRESSIONS, type EventExpression } from '../lab/events.ts'
import { hundredthsLatex } from '../lab/probability.ts'

/* ==========================================================================
   J2 · Bete Venn diagrama (Rellena el Venn): three data in the style of the
   entrance exam fix the four zones of the Venn diagram; the round asks for
   the probability of one event (one zone or several), drawn shaded with a
   question mark, and offers three values, two of them typical mistakes
   (P(A) − P(B) for A − B, 1 − P(A∩B) for «neither», the complement of the
   answer, a zone too many or too few). Level 1 gives P(A), P(B) and
   P(A∩B); level 2 the union, the difference or «neither» instead of the
   intersection; level 3 the complements and De Morgan, and asks for
   compound events. Zones in hundredths, multiples of 5, none empty.
   Pure logic.
   ========================================================================== */

export const VENN_ROUNDS = 6

/** The four zones in hundredths: only A, both, only B, neither */
export type VennZones = [number, number, number, number]

export interface VennRound {
    zones: VennZones
    /** The three data, in LaTeX */
    data: string[]
    /** The event asked for */
    asked: EventExpression
    /** Three values in hundredths, one of them right */
    options: number[]
    answer: number
    /** How the intersection comes out of the data, in LaTeX (empty when it is given) */
    steps: string[]
}

const h = hundredthsLatex
const expression = (id: string) => EVENT_EXPRESSIONS.find((item) => item.id === id)!
export const valueOf = (zones: VennZones, asked: EventExpression) => asked.zones.reduce((sum, inside, index) => sum + (inside ? zones[index] : 0), 0)

const ASKED: string[][] = [
    ['aMinusB', 'bMinusA', 'neither', 'or'],
    ['and', 'aMinusB', 'neither', 'bMinusA'],
    ['exactlyOne', 'notAOrB', 'aOrNotB', 'notAnd', 'same']
]

/** The data of a level and how the intersection comes out of them */
function dataFor(random: Random, level: number, zones: VennZones): { data: string[]; steps: string[] } {
    const [onlyA, both, onlyB, none] = zones
    const a = onlyA + both
    const b = both + onlyB
    const union = 100 - none
    if (level === 0) return { data: [`P(A)=${h(a)}`, `P(B)=${h(b)}`, `P(A\\cap B)=${h(both)}`], steps: [] }
    if (level === 1) {
        const kind = pick(random, ['union', 'difference', 'neither'] as const)
        if (kind === 'union') return { data: [`P(A)=${h(a)}`, `P(B)=${h(b)}`, `P(A\\cup B)=${h(union)}`], steps: [`P(A\\cap B)=${h(a)}+${h(b)}-${h(union)}=${h(both)}`] }
        if (kind === 'difference') return { data: [`P(A)=${h(a)}`, `P(B)=${h(b)}`, `P(A-B)=${h(onlyA)}`], steps: [`P(A\\cap B)=${h(a)}-${h(onlyA)}=${h(both)}`] }
        return { data: [`P(A)=${h(a)}`, `P(B)=${h(b)}`, `P(\\overline{A}\\cap\\overline{B})=${h(none)}`], steps: [`P(A\\cup B)=1-${h(none)}=${h(union)}`, `P(A\\cap B)=${h(a)}+${h(b)}-${h(union)}=${h(both)}`] }
    }
    const notA = 100 - a
    const notB = 100 - b
    const complements = `P(A)=1-${h(notA)}=${h(a)}\\qquad P(B)=1-${h(notB)}=${h(b)}`
    if (pick(random, [true, false])) return { data: [`P(\\overline{A})=${h(notA)}`, `P(\\overline{B})=${h(notB)}`, `P(\\overline{A}\\cup\\overline{B})=${h(100 - both)}`], steps: [complements, `P(A\\cap B)=1-${h(100 - both)}=${h(both)}`] }
    return { data: [`P(\\overline{A})=${h(notA)}`, `P(\\overline{B})=${h(notB)}`, `P(\\overline{A}\\cap\\overline{B})=${h(none)}`], steps: [complements, `P(A\\cup B)=1-${h(none)}=${h(union)}`, `P(A\\cap B)=${h(a)}+${h(b)}-${h(union)}=${h(both)}`] }
}

/** Two typical mistakes for the event asked, different from the answer and from each other */
function mistakes(random: Random, zones: VennZones, asked: EventExpression): number[] {
    const [, both, onlyB, none] = zones
    const a = zones[0] + both
    const b = both + onlyB
    const answer = valueOf(zones, asked)
    const typical: number[] = []
    if (asked.id === 'aMinusB') typical.push(a - b)
    if (asked.id === 'bMinusA') typical.push(b - a)
    if (asked.id === 'neither') typical.push(100 - both)
    if (asked.id === 'notAnd') typical.push(none)
    if (asked.id === 'or') typical.push(a + b)
    if (asked.id === 'exactlyOne') typical.push(100 - none)
    typical.push(100 - answer)
    // One zone too many or too few
    for (const [index, inside] of asked.zones.entries()) typical.push(answer + (inside ? -zones[index] : zones[index]))
    const options: number[] = []
    for (const value of [...typical.slice(0, 2), ...shuffle(random, typical.slice(2))]) {
        if (value <= 0 || value >= 100 || value === answer || options.includes(value)) continue
        options.push(value)
        if (options.length === 2) break
    }
    return options
}

function makeRound(random: Random, level: number): VennRound | null {
    const zones = [5 * randomInt(random, 1, 8), 5 * randomInt(random, 1, 6), 5 * randomInt(random, 1, 8), 0] as VennZones
    zones[3] = 100 - zones[0] - zones[1] - zones[2]
    if (zones[3] < 5) return null
    const asked = expression(pick(random, ASKED[level] ?? ASKED[0]))
    const answer = valueOf(zones, asked)
    const wrong = mistakes(random, zones, asked)
    if (wrong.length < 2) return null
    const { data, steps } = dataFor(random, level, zones)
    return { zones, data, asked, options: shuffle(random, [answer, ...wrong]), answer, steps }
}

/** Six rounds, never the same event twice in a row nor the same diagram twice */
export function createVennRounds(random: Random, level: number): VennRound[] {
    const rounds: VennRound[] = []
    for (let attempt = 0; rounds.length < VENN_ROUNDS && attempt < 3000; attempt += 1) {
        const round = makeRound(random, level)
        if (!round) continue
        if (rounds.some((other) => other.zones.join() === round.zones.join())) continue
        if (rounds.length && rounds[rounds.length - 1].asked.id === round.asked.id) continue
        rounds.push(round)
    }
    return rounds
}
