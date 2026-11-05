import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Bete zeinuen taula (Rellena la tabla de signos): a product or a
   quotient of factors x − a and an inequality. The roots cut the line into
   stretches: the learner puts + or − on each one and then chooses the
   solution among three, where the wrong ones take the other stretches or
   the wrong ends (closed where it is open, the hole of the denominator
   included). Level 1: two factors and > or <; level 2: three factors,
   sometimes a double root (which does not change the sign); level 3:
   quotients, also with ≥ or ≤, where the hole is never included.
   ========================================================================== */

export const SIGNS_ROUNDS = 5

export type SignsRelation = '>' | '<' | '\\ge' | '\\le'

export interface SignsRound {
    /** Roots of the numerator (a double root appears twice) */
    roots: number[]
    /** Root of the denominator, or null for a product */
    hole: number | null
    relation: SignsRelation
    /** The three solutions to choose from, one right */
    options: string[]
}
/** A round before its options are drawn */
type SignsShape = Omit<SignsRound, 'options'>

/** The breakpoints of the line, smallest first */
export const breakpoints = (round: SignsShape) => [...new Set([...round.roots, ...(round.hole === null ? [] : [round.hole])])].sort((a, b) => a - b)
/** The stretches between breakpoints, as [left, right] with ±Infinity at the ends */
export const stretches = (round: SignsShape): Array<[number, number]> => {
    const points = [-Infinity, ...breakpoints(round), Infinity]
    return points.slice(0, -1).map((left, index) => [left, points[index + 1]])
}
/** The value of the expression at x */
export function signsValue(round: SignsShape, x: number): number {
    const top = round.roots.reduce((total, root) => total * (x - root), 1)
    return round.hole === null ? top : top / (x - round.hole)
}
/** A point inside a stretch */
const inside = ([left, right]: [number, number]) => (left === -Infinity ? right - 1 : right === Infinity ? left + 1 : (left + right) / 2)
/** The sign (+1 or −1) on each stretch */
export const stretchSigns = (round: SignsShape) => stretches(round).map((stretch) => Math.sign(signsValue(round, inside(stretch))))
/** The stretches (by index) that solve the inequality */
export function solvingStretches(round: SignsShape): number[] {
    const positive = round.relation === '>' || round.relation === '\\ge'
    return stretchSigns(round).flatMap((sign, index) => ((positive ? sign > 0 : sign < 0) ? [index] : []))
}
/** Right when every stretch has its sign and the chosen solution is the right one */
export const isSignsChoice = (round: SignsShape, signs: Array<number | null>, solution: string) =>
    stretchSigns(round).every((sign, index) => signs[index] === sign) && solution === solutionLatex(round)

const factor = (root: number) => (root === 0 ? 'x' : `(x${root > 0 ? '-' : '+'}${Math.abs(root)})`)
/** A product of factors with powers for repeated roots */
function product(roots: number[]): string {
    const counts = new Map<number, number>()
    for (const root of roots) counts.set(root, (counts.get(root) ?? 0) + 1)
    return [...counts.entries()].map(([root, count]) => `${factor(root)}${count > 1 ? `^${count}` : ''}`).join('')
}
const bare = (root: number) => (root === 0 ? 'x' : `x${root > 0 ? '-' : '+'}${Math.abs(root)}`)
/** The inequality in LaTeX */
export function signsLatex(round: SignsShape): string {
    const left = round.hole === null
        ? product(round.roots)
        : `\\frac{${round.roots.length === 1 ? bare(round.roots[0]) : product(round.roots)}}{${bare(round.hole)}}`
    return `${left}${round.relation}0`
}
const end = (value: number) => (value === -Infinity ? '-\\infty' : value === Infinity ? '+\\infty' : String(value))
/** A stretch in LaTeX, open at both ends: (−∞, 2) */
export const stretchLatex = ([left, right]: [number, number]) => `(${end(left)},${end(right)})`
const closedRelation = (relation: SignsRelation) => relation === '\\ge' || relation === '\\le'
const flipped: Record<SignsRelation, SignsRelation> = { '>': '<', '<': '>', '\\ge': '\\le', '\\le': '\\ge' }
/** The solving stretches joined, each end closed when `included` says so */
function intervalsLatex(round: SignsShape, included: (point: number) => boolean): string {
    const all = stretches(round)
    const parts = solvingStretches(round).map((index) => {
        const [left, right] = all[index]
        const closed = (point: number) => Number.isFinite(point) && included(point)
        return `${closed(left) ? '[' : '('}${end(left)},${end(right)}${closed(right) ? ']' : ')'}`
    })
    return parts.length === 0 ? '\\varnothing' : parts.join('\\cup')
}
/** The solution in LaTeX, with the roots of the numerator included for ≥ and ≤ */
export const solutionLatex = (round: SignsShape) => intervalsLatex(round, (point) => closedRelation(round.relation) && point !== round.hole && round.roots.includes(point))
/** The right solution and two wrong ones: the other stretches, and the wrong ends */
export function signsOptions(random: Random, round: SignsShape): string[] {
    const right = solutionLatex(round)
    const other = solutionLatex({ ...round, relation: flipped[round.relation] })
    const ends = !closedRelation(round.relation)
        ? intervalsLatex(round, (point) => round.roots.includes(point))
        : round.hole === null ? intervalsLatex(round, () => false) : intervalsLatex(round, () => true)
    return shuffle(random, [...new Set([right, other, ends])])
}

function makeRound(random: Random, level: number): SignsShape | null {
    if (level === 0) {
        const a = randomInt(random, -5, 4)
        const b = randomInt(random, a + 1, 6)
        return { roots: [a, b], hole: null, relation: pick<SignsRelation>(random, ['>', '<']) }
    }
    if (level === 1) {
        const double = randomInt(random, 0, 2) === 0
        if (double) {
            const a = randomInt(random, -3, 3)
            const b = randomInt(random, -4, 4)
            if (a === b) return null
            // A double root only with > or <: with ≥ or ≤ it would be an isolated point
            return { roots: [a, a, b], hole: null, relation: pick<SignsRelation>(random, ['>', '<']) }
        }
        const roots = [randomInt(random, -5, -1), randomInt(random, 0, 1), randomInt(random, 2, 5)]
        return { roots, hole: null, relation: pick<SignsRelation>(random, ['>', '<', '\\ge', '\\le']) }
    }
    const a = randomInt(random, -5, 5)
    const h = randomInt(random, -5, 5)
    if (a === h) return null
    return { roots: [a], hole: h, relation: pick<SignsRelation>(random, ['\\ge', '\\le', '>', '<']) }
}

/** Five different rounds of one level */
export function createSignsRounds(random: Random, level: number): SignsRound[] {
    const rounds: SignsRound[] = []
    for (let attempt = 0; rounds.length < SIGNS_ROUNDS && attempt < 2000; attempt += 1) {
        const round = makeRound(random, level)
        if (!round || rounds.some((other) => signsLatex(other) === signsLatex(round))) continue
        const options = signsOptions(random, round)
        if (options.length === 3) rounds.push({ ...round, options })
    }
    return rounds
}
