import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { choose } from '../../batx2-zientziak-banaketak/binomial.ts'

/* ==========================================================================
   J1 · Zein kutxatilatara? (¿A qué casilla?): the Galton board. Level 1
   shows the path of a ball as arrows (→ right, ← left) and asks for its
   bin: the wrong options count the lefts or number the bins from 1.
   Level 2 asks how many paths reach a bin: the wrong options are all the
   paths 2ⁿ and the number of the row above in Tartaglia's triangle.
   Level 3 asks for the probability of a bin with a straight board: the
   wrong options are «all bins alike», 1/(n + 1), and «a single path»,
   1/2ⁿ. Six rounds, never the same twice. Pure logic.
   ========================================================================== */

export const GALTON_ROUNDS = 6

export interface GaltonRound {
    rows: number
    bin: number
    /** Level 1: the moves of the ball, 1 right and 0 left */
    path: number[]
    /** Three LaTeX options */
    options: string[]
    answer: number
}

const reduced = (numerator: number, denominator: number) => {
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
    const d = gcd(numerator, denominator)
    return `\\frac{${numerator / d}}{${denominator / d}}`
}

function makeRound(random: Random, level: number): GaltonRound | null {
    if (level === 0) {
        const rows = randomInt(random, 4, 7)
        const path: number[] = Array.from({ length: rows }, () => (random() < 0.5 ? 1 : 0))
        const bin = path.reduce((sum, move) => sum + move, 0)
        const values = [bin, rows - bin, bin + 1]
        if (new Set(values).size < 3) return null
        const options = shuffle(random, values.map(String))
        return { rows, bin, path, options, answer: options.indexOf(String(bin)) }
    }
    if (level === 1) {
        const rows = randomInt(random, 4, 8)
        const bin = randomInt(random, 1, rows - 1)
        const values = [choose(rows, bin), 2 ** rows, choose(rows - 1, bin)]
        if (new Set(values).size < 3) return null
        const options = shuffle(random, values.map(String))
        return { rows, bin, path: [], options, answer: options.indexOf(String(values[0])) }
    }
    const rows = randomInt(random, 3, 6)
    const bin = randomInt(random, 0, rows)
    const right = reduced(choose(rows, bin), 2 ** rows)
    const values = [right, reduced(1, rows + 1), reduced(1, 2 ** rows)]
    if (new Set(values).size < 3) return null
    const options = shuffle(random, values)
    return { rows, bin, path: [], options, answer: options.indexOf(right) }
}

export function createGaltonRounds(random: Random, level: number): GaltonRound[] {
    const rounds: GaltonRound[] = []
    for (let attempt = 0; attempt < 2000 && rounds.length < GALTON_ROUNDS; attempt += 1) {
        const round = makeRound(random, level)
        if (round && !rounds.some((other) => other.rows === round.rows && other.bin === round.bin && other.path.join() === round.path.join())) rounds.push(round)
    }
    return rounds
}
