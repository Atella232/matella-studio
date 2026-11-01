import { termLatex, type Term } from '../../dbh1-aljebra-v2/algebra.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   J2 · Monomioen piramidea (La pirámide de monomios): six bricks, three
   at the bottom, two in the middle and one on top; each brick is the sum
   (level 1) or the product (levels 2 and 3) of the two below it. Three
   bricks are empty and six cards wait below: the three right monomials
   and three made with the typical mistakes (adding exponents when adding,
   adding coefficients when multiplying, multiplying exponents...). An
   empty brick on the bottom row is found going down: subtracting or
   dividing monomials.
   ========================================================================== */

export type PyramidOperation = 'sum' | 'product'
/** How a hidden brick is found: from the two below it, or from the one above and its neighbour */
type Way = { brick: number; from: 'below' | 'above'; operands: [number, number] }

export const PYRAMID_ROUNDS = 5
export const PYRAMID_BRICKS = 6

/** Bricks 0, 1, 2 at the bottom; 3 = 0∘1, 4 = 1∘2; 5 = 3∘4 on top */
const BELOW: Record<number, [number, number]> = { 3: [0, 1], 4: [1, 2], 5: [3, 4] }

/** The empty bricks of a round, in the order they can be found, and how */
const PATTERNS: Way[][] = [
    [{ brick: 3, from: 'below', operands: [0, 1] }, { brick: 4, from: 'below', operands: [1, 2] }, { brick: 5, from: 'below', operands: [3, 4] }],
    [{ brick: 0, from: 'above', operands: [3, 1] }, { brick: 4, from: 'below', operands: [1, 2] }, { brick: 5, from: 'below', operands: [3, 4] }],
    [{ brick: 1, from: 'above', operands: [4, 2] }, { brick: 3, from: 'below', operands: [0, 1] }, { brick: 5, from: 'below', operands: [3, 4] }],
    [{ brick: 4, from: 'above', operands: [5, 3] }, { brick: 1, from: 'above', operands: [4, 2] }, { brick: 0, from: 'above', operands: [3, 1] }]
]

export interface PyramidCard {
    term: Term
    latex: string
    /** The brick this card belongs to, or null for a card with a mistake */
    brick: number | null
}

export interface PyramidRound {
    operation: PyramidOperation
    bricks: Term[]
    hidden: number[]
    /** How each hidden brick is found, for the explanation */
    ways: Way[]
    cards: PyramidCard[]
}

const same = (left: Term, right: Term) => left.coefficient === right.coefficient && left.power === right.power
export const monomialLatex = (term: Term) => termLatex(term)

/** One brick from the two below it */
export function combine(operation: PyramidOperation, left: Term, right: Term): Term {
    return operation === 'sum'
        ? { coefficient: left.coefficient + right.coefficient, power: left.power }
        : { coefficient: left.coefficient * right.coefficient, power: left.power + right.power }
}

/** The bricks above the bottom row */
export function buildBricks(operation: PyramidOperation, bottom: [Term, Term, Term]): Term[] {
    const bricks: Term[] = [...bottom]
    for (const brick of [3, 4, 5]) bricks[brick] = combine(operation, bricks[BELOW[brick][0]], bricks[BELOW[brick][1]])
    return bricks
}

/** True when every brick is the sum or product of the two below it */
export function pyramidHolds(operation: PyramidOperation, bricks: Term[]): boolean {
    return [3, 4, 5].every((brick) => same(bricks[brick], combine(operation, bricks[BELOW[brick][0]], bricks[BELOW[brick][1]])))
}

/** The wrong results for a brick found one way: the sign lost first, then the typical mistakes */
function mistakes(operation: PyramidOperation, way: Way, bricks: Term[]): Term[] {
    const [first, second] = way.operands.map((brick) => bricks[brick])
    const right = bricks[way.brick]
    if (operation === 'sum') {
        // Going up: the exponents added (x + x = x²) or a sign lost; going down: adding instead of subtracting
        if (way.from === 'below') return [{ coefficient: -right.coefficient, power: right.power }, { coefficient: right.coefficient, power: right.power * 2 }, { coefficient: first.coefficient - second.coefficient, power: right.power }]
        return [{ coefficient: second.coefficient - first.coefficient, power: right.power }, { coefficient: first.coefficient + second.coefficient, power: right.power }]
    }
    if (way.from === 'below') return [{ coefficient: -right.coefficient, power: right.power }, { coefficient: first.coefficient + second.coefficient, power: right.power }, { coefficient: right.coefficient, power: first.power * second.power }]
    // Dividing: the exponents added, or the coefficients subtracted
    return [{ coefficient: -right.coefficient, power: right.power }, { coefficient: right.coefficient, power: first.power + second.power }, { coefficient: first.coefficient - second.coefficient, power: right.power }]
}

const NONZERO = (values: number[]) => values.filter((value) => value !== 0)

export function createPyramidRound(random: Random, levelIndex: number): PyramidRound {
    const operation: PyramidOperation = levelIndex === 0 ? 'sum' : 'product'
    for (;;) {
        let bottom: [Term, Term, Term]
        if (operation === 'sum') {
            const power = pick(random, [1, 2, 3])
            const coefficients = NONZERO(Array.from({ length: 13 }, (_, index) => index - 6))
            bottom = [0, 1, 2].map(() => ({ coefficient: pick(random, coefficients), power })) as [Term, Term, Term]
        } else {
            const small = levelIndex === 1 ? [-3, -2, -1, 1, 2, 3, 4] : [-3, -2, -1, 1, 2, 3]
            bottom = [0, 1, 2].map((index) => ({ coefficient: pick(random, index === 1 ? [-2, -1, 1, 2, 3] : small), power: randomInt(random, 1, levelIndex === 1 ? 3 : 2) })) as [Term, Term, Term]
        }
        const bricks = buildBricks(operation, bottom)
        if (bricks.some((term) => term.coefficient === 0 || Math.abs(term.coefficient) > 60)) continue
        // Level 1: any empty bricks; level 2: going up; level 3: going down too
        const ways = levelIndex === 1 ? PATTERNS[0] : levelIndex === 2 ? pick(random, PATTERNS.slice(1)) : pick(random, PATTERNS)
        const hidden = ways.map((way) => way.brick)
        const rights = hidden.map((brick) => bricks[brick])
        if (rights.some((term, index) => rights.findIndex((other) => same(other, term)) !== index)) continue
        // One mistake per empty brick, all different from each other and from every right card
        const decoys: Term[] = []
        for (const way of ways) {
            // The typical mistakes first, in any order; the lost sign only when none of them fits
            const [sign, ...typical] = mistakes(operation, way, bricks)
            const options = [...shuffle(random, typical), sign].filter((term) => term.coefficient !== 0 && term.power > 0 && !rights.some((right) => same(right, term)) && !decoys.some((decoy) => same(decoy, term)))
            if (options.length > 0) decoys.push(options[0])
        }
        if (decoys.length < 3) continue
        const cards = shuffle(random, [
            ...hidden.map((brick) => ({ term: bricks[brick], latex: monomialLatex(bricks[brick]), brick })),
            ...decoys.map((term) => ({ term, latex: monomialLatex(term), brick: null }))
        ])
        return { operation, bricks, hidden, ways, cards }
    }
}

export const createPyramidRounds = (random: Random, levelIndex: number) => Array.from({ length: PYRAMID_ROUNDS }, () => createPyramidRound(random, levelIndex))

/** The round is right when every empty brick holds its own monomial */
export const pyramidSolved = (round: PyramidRound, placed: Record<number, number | undefined>) => round.hidden.every((brick) => {
    const card = placed[brick]
    return card !== undefined && same(round.cards[card].term, round.bricks[brick])
})

export function pyramidStars(score: number): Stars {
    if (score >= 5) return 3
    if (score >= 4) return 2
    if (score >= 3) return 1
    return 0
}
