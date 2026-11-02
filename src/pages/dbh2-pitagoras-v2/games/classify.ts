import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   J2 · Zer triangelu da? (¿Qué triángulo es?): three sides and three
   answers. The square of the longest side against the sum of the squares
   of the other two: smaller, acute-angled; equal, right-angled; larger,
   obtuse-angled. Level 1: whole sides up to 15, the longest last; level 2:
   longer sides in any order, near misses of the triples (6, 8, 11);
   level 3: decimal sides. Every answer at least twice.
   ========================================================================== */

export type TriangleKind = 'acute' | 'right' | 'obtuse'
export const TRIANGLE_KINDS: TriangleKind[] = ['acute', 'right', 'obtuse']
export const CLASSIFY_ROUNDS = 8

export interface ClassifyRound {
    /** The three sides as shown */
    sides: [number, number, number]
    kind: TriangleKind
}

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [7, 24, 25], [12, 16, 20], [20, 21, 29], [10, 24, 26]]

/** Compares in tenths, so decimal sides compare exactly */
export function kindOf(sides: number[]): TriangleKind {
    const [a, b, c] = [...sides].map((side) => Math.round(side * 10)).sort((left, right) => left - right)
    const difference = c * c - (a * a + b * b)
    return difference === 0 ? 'right' : difference < 0 ? 'acute' : 'obtuse'
}

export const isTriangle = (sides: number[]) => {
    const [a, b, c] = [...sides].sort((left, right) => left - right)
    return a + b > c + 1e-9
}

function makeSides(random: Random, levelIndex: number, kind: TriangleKind): [number, number, number] {
    for (;;) {
        let sides: [number, number, number]
        if (levelIndex === 2) {
            // Halves of a triple, or of a triple with the longest side moved by a half
            const [a, b, c] = pick(random, TRIPLES.slice(0, 5))
            const shift = kind === 'right' ? 0 : kind === 'acute' ? -pick(random, [1, 2]) : pick(random, [1, 2])
            sides = [a / 2, b / 2, (c + shift) / 2]
        } else {
            const triples = levelIndex === 0 ? TRIPLES.slice(0, 5) : TRIPLES
            const [a, b, c] = pick(random, triples)
            if (kind === 'right') sides = [a, b, c]
            else {
                // A near miss: the longest side one or two units off
                const shift = randomInt(random, 1, levelIndex === 0 ? 2 : 3)
                sides = [a, b, kind === 'acute' ? c - shift : c + shift]
            }
            if (levelIndex === 0 && kind !== 'right' && random() < 0.4) {
                // Or a triangle with no triple behind it
                sides = [randomInt(random, 3, 9), randomInt(random, 4, 12), randomInt(random, 5, 15)].sort((left, right) => left - right) as [number, number, number]
            }
        }
        if (!isTriangle(sides) || kindOf(sides) !== kind || new Set(sides).size < 3) continue
        // Level 3 always shows a decimal side
        if (levelIndex === 2 && sides.every(Number.isInteger)) continue
        const sorted = [...sides].sort((left, right) => left - right) as [number, number, number]
        return levelIndex === 0 ? sorted : shuffle(random, sorted) as [number, number, number]
    }
}

export function createClassifyRounds(random: Random, levelIndex: number): ClassifyRound[] {
    const kinds = shuffle(random, [...TRIANGLE_KINDS, ...TRIANGLE_KINDS, ...shuffle(random, TRIANGLE_KINDS).slice(0, CLASSIFY_ROUNDS - 6)])
    return kinds.map((kind) => ({ sides: makeSides(random, levelIndex, kind), kind }))
}

export function classifyStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
