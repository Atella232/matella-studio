import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { innerLatex } from '../lab/transform.ts'

/* ==========================================================================
   J1 · Non erortzen da puntua? (¿Dónde cae el punto?): a function f passes
   through P(p, q), and y = A·f(Bx + c) + k is shown; the learner taps on
   the grid the point of the new graph that comes from P. There is a
   single right point: x = (p − c)/B and y = A·q + k, both whole and on the
   board. Level 1: one change (a translation, or a sign); level 2: two
   changes; level 3: three or four, with factors 2 or −2. Moving x the
   wrong way (p + c) always gives a different point.
   ========================================================================== */

export const WHERE_ROUNDS = 6
export const WHERE_BOX = 7

export interface WhereRound {
    point: [number, number]
    A: number
    B: number
    c: number
    k: number
    /** The new formula, in LaTeX: y=-2f(x+3)+1 */
    latex: string
    answer: [number, number]
}

const signed = (value: number) => (value > 0 ? `+${value}` : value < 0 ? `-${-value}` : '')

/** y = A·f(Bx + c) + k in LaTeX */
export function whereLatex(A: number, B: number, c: number, k: number): string {
    const outer = A === 1 ? '' : A === -1 ? '-' : String(A)
    return `y=${outer}f(${innerLatex(B, c)})${signed(k)}`
}

/** Where P goes: Bx + c = p and y = A·q + k */
export const whereAnswer = (point: [number, number], A: number, B: number, c: number, k: number): [number, number] => [(point[0] - c) / B, A * point[1] + k]

type Change = 'c' | 'k' | 'A' | 'B'

/** A whole number from 1 to limit, with either sign */
function nonZero(random: Random, limit: number): number {
    const value = randomInt(random, 1, limit)
    return pick(random, [value, -value])
}

function makeRound(random: Random, level: number): WhereRound | null {
    const point: [number, number] = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
    let A = 1
    let B = 1
    let c = 0
    let k = 0
    const changes: Change[] = level === 0
        ? [pick(random, ['c', 'k', 'A', 'B'] as Change[])]
        : level === 1
            ? shuffle(random, ['c', 'k', 'A', 'B'] as Change[]).slice(0, 2)
            : ['c', 'k', 'A', pick(random, ['B', 'B', 'A'] as Change[])]
    for (const change of changes) {
        if (change === 'c') c = nonZero(random, 4)
        if (change === 'k') k = nonZero(random, 4)
        if (change === 'A') A = level === 0 ? -1 : pick(random, level === 1 ? [-1, 2, -2] : [2, -2, -1])
        if (change === 'B') B = level === 2 ? pick(random, [2, -2, -1]) : -1
    }
    if (level === 2 && Math.abs(A) !== 2 && Math.abs(B) !== 2) return null
    const answer = whereAnswer(point, A, B, c, k)
    if (!Number.isInteger(answer[0]) || Math.abs(answer[0]) > WHERE_BOX - 1 || Math.abs(answer[1]) > WHERE_BOX - 1) return null
    if (answer[0] === point[0] && answer[1] === point[1]) return null
    // Moving x the wrong way (p + c instead of p − c) must land somewhere else
    const wrongX = (point[0] + c) / B
    if (c !== 0 && wrongX === answer[0]) return null
    return { point, A, B, c, k, latex: whereLatex(A, B, c, k), answer: [answer[0] + 0, answer[1] + 0] }
}

/** Six different rounds of one level */
export function createWhereRounds(random: Random, level: number): WhereRound[] {
    const rounds: WhereRound[] = []
    for (let attempt = 0; rounds.length < WHERE_ROUNDS && attempt < 5000; attempt += 1) {
        const round = makeRound(random, level)
        if (!round || rounds.some((other) => other.latex === round.latex && other.point.join() === round.point.join())) continue
        rounds.push(round)
    }
    return rounds
}

export const isWherePick = (round: WhereRound, picked: [number, number] | null) => picked !== null && picked[0] === round.answer[0] && picked[1] === round.answer[1]

/** The two short calculations under the answer: the x from the inside, the y from the outside */
export function whereWorking(round: WhereRound): [string, string] {
    const [p, q] = round.point
    const [x, y] = round.answer
    const inside = `${innerLatex(round.B, round.c)}=${p}\\ \\to\\ x=${x}`
    const factor = round.A === 1 ? '' : round.A === -1 ? '-' : `${round.A}\\cdot `
    const value = q < 0 && round.A !== 1 ? `(${q})` : String(q)
    const outside = round.A === 1 && round.k === 0 ? `y=${q}` : `y=${factor}${value}${signed(round.k)}=${y}`
    return [inside, outside]
}
