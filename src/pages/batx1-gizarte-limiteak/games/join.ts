import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Lotu zatiak (Empalma los trozos): a function in two pieces with a
   parameter k. The learner tries the cards: each one draws the second
   piece with that k, so the jump grows, shrinks or vanishes on the board;
   then checks. Level 1: two lines, k added to the second; level 2: a
   parabola and a line, k as a coefficient (k·x) or added to the parabola;
   level 3: tariffs in euros with prices in halves of a euro. The wrong
   cards are the typical slips: the value of the first piece alone, the
   sign changed, the second piece forgotten at the joining point.
   ========================================================================== */

export const JOIN_ROUNDS = 5

/** A piece y = q·x² + m·x + c, with k added (`plus`) or multiplying x (`times`) */
export interface JoinPiece {
    q: number
    m: number
    c: number
    k?: 'plus' | 'times'
}

export interface JoinRound {
    left: JoinPiece
    right: JoinPiece
    /** The joining point: the left piece takes x ≤ a when `leftCloses`, else x < a */
    a: number
    leftCloses: boolean
    answer: number
    options: number[]
    /** A tariff in euros (level 3) */
    tariff: boolean
}

export const pieceAt = (piece: JoinPiece, x: number, k: number) => piece.q * x * x + (piece.k === 'times' ? k : piece.m) * x + piece.c + (piece.k === 'plus' ? k : 0)
export const jumpWith = (round: Pick<JoinRound, 'left' | 'right' | 'a'>, k: number) => pieceAt(round.right, round.a, k) - pieceAt(round.left, round.a, k)

const dec = (value: number) => String(value).replace('.', '{,}')

/** A piece in LaTeX, with k where it goes */
export function pieceLatex(piece: JoinPiece): string {
    const parts: string[] = []
    if (piece.q !== 0) parts.push(piece.q === 1 ? 'x^2' : `${dec(piece.q)}x^2`)
    if (piece.k === 'times') parts.push(parts.length ? '+kx' : 'kx')
    else if (piece.m !== 0) {
        const size = Math.abs(piece.m) === 1 ? '' : dec(Math.abs(piece.m))
        parts.push(`${piece.m < 0 ? '-' : parts.length ? '+' : ''}${size}x`)
    }
    if (piece.c !== 0) parts.push(`${piece.c < 0 ? '-' : parts.length ? '+' : ''}${dec(Math.abs(piece.c))}`)
    if (piece.k === 'plus') parts.push(parts.length ? '+k' : 'k')
    return parts.join('') || '0'
}

export function joinLatex(round: JoinRound): string {
    const name = round.tariff ? 'C' : 'f'
    return `${name}(x)=\\begin{cases}${pieceLatex(round.left)} & x${round.leftCloses ? '\\le' : '<'} ${round.a}\\\\ ${pieceLatex(round.right)} & x${round.leftCloses ? '>' : '\\ge'} ${round.a}\\end{cases}`
}

/** The k that joins the pieces: the jump is linear in k, so two values of it give the root */
export function joiningK(round: Pick<JoinRound, 'left' | 'right' | 'a'>): number {
    const j0 = jumpWith(round, 0)
    const j1 = jumpWith(round, 1)
    return j0 / (j0 - j1)
}

function finish(random: Random, left: JoinPiece, right: JoinPiece, a: number, tariff: boolean): JoinRound | null {
    const base = { left, right, a }
    const answer = joiningK(base)
    if (!Number.isInteger(answer) || answer === 0) return null
    const leftValue = pieceAt(left, a, 0)
    const wrong = [-answer, leftValue, answer + 2 * a, answer - a, answer + 1, answer - 2].filter((value) => Number.isInteger(value) && value !== answer)
    const options = [...new Set([answer, ...wrong])].slice(0, 4)
    if (options.length < 4) return null
    return { left, right, a, leftCloses: random() < 0.5, answer, options: shuffle(random, options), tariff }
}

function linesRound(random: Random): JoinRound | null {
    const a = randomInt(random, -2, 4)
    const left: JoinPiece = { q: 0, m: pick(random, [-2, -1, 1, 2, 3]), c: randomInt(random, -4, 6) }
    const right: JoinPiece = { q: 0, m: pick(random, [-1, 1, 2, 3, 4]), c: 0, k: 'plus' }
    if (left.m === right.m) return null
    return finish(random, left, right, a, false)
}

function parabolaRound(random: Random): JoinRound | null {
    const a = pick(random, [1, 2, 3, -1, -2])
    if (random() < 0.5) {
        // x² + c and k·x
        const left: JoinPiece = { q: 1, m: 0, c: randomInt(random, -4, 8) }
        const right: JoinPiece = { q: 0, m: 0, c: randomInt(random, -5, 5), k: 'times' }
        return finish(random, left, right, a, false)
    }
    // x² + k and a line
    const left: JoinPiece = { q: 1, m: 0, c: 0, k: 'plus' }
    const right: JoinPiece = { q: 0, m: pick(random, [1, 2, 3, 4, -2]), c: randomInt(random, -5, 6) }
    return finish(random, left, right, a, false)
}

function tariffRound(random: Random): JoinRound | null {
    const L = pick(random, [4, 6, 8, 10, 12, 20])
    const p1 = pick(random, [1.5, 2, 2.5, 3])
    const p2 = pick(random, [0.5, 1, 1.5, 2])
    if (p2 >= p1) return null
    const left: JoinPiece = { q: 0, m: p1, c: 0 }
    const right: JoinPiece = { q: 0, m: p2, c: 0, k: 'plus' }
    const round = finish(random, left, right, L, true)
    return round && { ...round, leftCloses: true }
}

const levelMakers = [linesRound, parabolaRound, tariffRound]

/** Five different rounds of one level */
export function createJoinRounds(random: Random, level: number): JoinRound[] {
    const make = levelMakers[level] ?? linesRound
    const rounds: JoinRound[] = []
    for (let attempt = 0; rounds.length < JOIN_ROUNDS && attempt < 5000; attempt += 1) {
        const round = make(random)
        if (!round || rounds.some((other) => joinLatex(other) === joinLatex(round))) continue
        rounds.push(round)
    }
    return rounds
}
