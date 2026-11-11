import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Dimentsioen dominoa (Dominó de dimensiones): every matrix is a
   domino tile, rows on the left half and columns on the right. Two tiles
   can be put together (multiplied) only when the touching halves are
   equal, and the result keeps the outer halves. Level 1: A · ? = m × p.
   Level 2: A · ? · C = m × q. Level 3: products with transposes (AᵗB, ABᵗ,
   BᵗA…): its size, or «it cannot be done». One right option per round;
   the wrong ones are the typical slips (the tile turned round, the size
   of the result, the size of A).
   ========================================================================== */

export const DOMINO_ROUNDS = 6

export type Size = [number, number]

/** A tile, or «it cannot be done» (null) */
export type DominoOption = Size | null

export interface DominoRound {
    level: number
    /** The tiles in the chain; the gap is null (levels 1 and 2) */
    chain: Array<Size | null>
    /** The size the product must have (levels 1 and 2) */
    target: Size | null
    /** Level 3: the expression asked about, as A^tB, AB^t…, and the sizes of A and B */
    expression: { left: 'A' | 'B'; leftT: boolean; right: 'A' | 'B'; rightT: boolean } | null
    sizes: { A: Size; B: Size } | null
    options: DominoOption[]
    answer: number
}

const same = (a: DominoOption, b: DominoOption) => (a === null || b === null ? a === b : a[0] === b[0] && a[1] === b[1])
const T = (size: Size): Size => [size[1], size[0]]

/** The size of a chain of tiles, or null when two touching halves differ */
export function chainSize(chain: Size[]): Size | null {
    for (let index = 1; index < chain.length; index++) if (chain[index - 1][1] !== chain[index][0]) return null
    return [chain[0][0], chain[chain.length - 1][1]]
}

/** Whether a tile fills the gap of a round: the chain can be multiplied and gives the target */
export function fits(round: Pick<DominoRound, 'chain' | 'target'>, tile: DominoOption): boolean {
    if (tile === null) return false
    const filled = round.chain.map((item) => item ?? tile)
    const size = chainSize(filled)
    return size !== null && round.target !== null && same(size, round.target)
}

/** Level 3: the size of the expression, or null */
export function expressionSize(round: Pick<DominoRound, 'expression' | 'sizes'>): Size | null {
    const { expression, sizes } = round
    if (!expression || !sizes) return null
    const left = expression.leftT ? T(sizes[expression.left]) : sizes[expression.left]
    const right = expression.rightT ? T(sizes[expression.right]) : sizes[expression.right]
    return chainSize([left, right])
}

/** The expression as LaTeX: A^tB, AB^t, B^tA… */
export function expressionLatex(round: Pick<DominoRound, 'expression'>): string {
    const e = round.expression!
    return `${e.left}${e.leftT ? '^t' : ''}${e.right}${e.rightT ? '^t' : ''}`
}

const dimension = (random: Random) => randomInt(random, 1, 5)

function distinctOptions(random: Random, right: DominoOption, wrong: DominoOption[]): { options: DominoOption[]; answer: number } | null {
    const list: DominoOption[] = [right]
    for (const item of wrong) {
        if (list.some((other) => same(other, item))) continue
        list.push(item)
        if (list.length === 4) break
    }
    if (list.length < 4) return null
    const options = shuffle(random, list)
    return { options, answer: options.findIndex((item) => same(item, right)) }
}

function twoTiles(random: Random): DominoRound | null {
    const m = dimension(random)
    const n = dimension(random)
    const p = dimension(random)
    const right: Size = [n, p]
    const made = distinctOptions(random, right, [[p, n], [m, p], [n, m], [m, n], [p, p], [n, n]])
    if (!made) return null
    const round: DominoRound = { level: 0, chain: [[m, n], null], target: [m, p], expression: null, sizes: null, ...made }
    return round.options.filter((option) => fits(round, option)).length === 1 ? round : null
}

function threeTiles(random: Random): DominoRound | null {
    const m = dimension(random)
    const n = dimension(random)
    const q = dimension(random)
    const r = dimension(random)
    const right: Size = [n, q]
    const made = distinctOptions(random, right, [[q, n], [m, r], [n, r], [m, q], [n, n], [q, q]])
    if (!made) return null
    const round: DominoRound = { level: 1, chain: [[m, n], null, [q, r]], target: [m, r], expression: null, sizes: null, ...made }
    return round.options.filter((option) => fits(round, option)).length === 1 ? round : null
}

function transposes(random: Random): DominoRound | null {
    const A: Size = [dimension(random), dimension(random)]
    const B: Size = [dimension(random), dimension(random)]
    const [left, right] = pick(random, [['A', 'B'], ['B', 'A'], ['A', 'A'], ['B', 'B']] as Array<['A' | 'B', 'A' | 'B']>)
    const leftT = random() < 0.5
    const rightT = left === right ? !leftT : random() < 0.5
    const round = { expression: { left, leftT, right, rightT }, sizes: { A, B } }
    const size = expressionSize(round)
    // Without transposes, the sizes a learner gets by forgetting them
    const plain = chainSize([round.sizes[left], round.sizes[right]])
    const wrong: DominoOption[] = [size === null ? [round.sizes[left][0], round.sizes[right][1]] : null, size ? T(size) : null, plain, round.sizes[left], round.sizes[right], [round.sizes[left][1], round.sizes[right][0]]]
    const made = distinctOptions(random, size, wrong)
    return made && { level: 2, chain: [], target: null, ...round, ...made }
}

const makers = [twoTiles, threeTiles, transposes]

/** The rounds of a level, all different */
export function createDominoRounds(random: Random, level: number): DominoRound[] {
    const rounds: DominoRound[] = []
    const keys = new Set<string>()
    for (let attempt = 0; rounds.length < DOMINO_ROUNDS && attempt < 5000; attempt++) {
        const round = makers[level] ? makers[level](random) : null
        if (!round) continue
        const key = JSON.stringify([round.chain, round.expression, round.sizes])
        if (keys.has(key)) continue
        // Level 3 keeps a balance: about one round in three cannot be done
        if (level === 2 && round.options[round.answer] === null && rounds.filter((item) => item.options[item.answer] === null).length >= 2) continue
        keys.add(key)
        rounds.push(round)
    }
    return rounds
}

/** A size as text: 2 × 3 */
export const sizeText = (size: Size) => `${size[0]} × ${size[1]}`
