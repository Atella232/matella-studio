import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { sarrusTerms } from '../../batx2-zientziak-determinanteak/determinant.ts'

/* ==========================================================================
   J1 · Prezio bakarrak? (¿Hay precios únicos?): the quantities of some
   bundles, one row per bundle. Levels 1 and 2 (two and three products):
   can the prices be found? The options join the answer and |A|: the right
   one and the slips (ad + bc, Sarrus with every product added, the sign
   turned, «no» when |A| ≠ 0 or «yes» when |A| = 0). About half the rounds
   have a bundle that is a multiple or a sum of the others. Level 3: the
   value of a that leaves the prices undecided. Only |A| decides here.
   ========================================================================== */

export const UNIQUE_ROUNDS = 5

export interface VerdictOption {
    found: boolean
    value: number
}

export interface UniqueRound {
    level: number
    /** The quantities; in level 3 one cell is the letter a */
    q: Array<Array<number | string>>
    det: number
    /** Levels 1 and 2: the verdicts; level 3: the values of a */
    verdicts: VerdictOption[]
    values: number[]
    answer: number
    worked: string
}

const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))

/** The right verdict and three different wrong ones */
function verdictOptions(random: Random, det: number, slips: number[]): { verdicts: VerdictOption[]; answer: number } | null {
    const right: VerdictOption = { found: det !== 0, value: det }
    const key = (option: VerdictOption) => `${option.found}:${option.value}`
    const wrong: VerdictOption[] = []
    const candidates: VerdictOption[] = det === 0
        ? slips.filter((slip) => slip !== 0).map((slip) => ({ found: true, value: slip }))
        : [{ found: false, value: 0 }, { found: true, value: -det }, ...slips.filter((slip) => slip !== 0).map((slip) => ({ found: true, value: slip }))]
    for (const candidate of [...candidates, ...[1, 2, -1, 3].map((shift) => ({ found: true, value: det + shift }))]) {
        if (wrong.length === 3) break
        if (candidate.found && candidate.value === 0) continue
        if ([right, ...wrong].some((other) => key(other) === key(candidate))) continue
        wrong.push(candidate)
    }
    if (wrong.length < 3) return null
    const verdicts = shuffle(random, [right, ...wrong])
    return { verdicts, answer: verdicts.findIndex((option) => key(option) === key(right)) }
}

function twoRound(random: Random): UniqueRound | null {
    const first = [randomInt(random, 1, 6), randomInt(random, 1, 6)]
    const second = random() < 0.5 ? first.map((value) => value * pick(random, [2, 3])) : [randomInt(random, 1, 6), randomInt(random, 1, 6)]
    const [[p, q], [r, s]] = [first, second]
    const det = p * s - q * r
    const picked = verdictOptions(random, det, [p * s + q * r, q * r - p * s])
    return picked && { level: 0, q: [first, second], det, values: [], ...picked, worked: `|A|=${p}\\cdot ${s}-${q}\\cdot ${r}=${det}` }
}

function threeRound(random: Random): UniqueRound | null {
    const rows = [0, 1].map(() => [0, 1, 2].map(() => randomInt(random, 0, 4)))
    const kind = random()
    const third = kind < 0.25 ? rows[0].map((value, k) => value + rows[1][k]) : kind < 0.45 ? rows[0].map((value) => 2 * value) : [0, 1, 2].map(() => randomInt(random, 0, 4))
    const q = [...rows, third]
    if (q.some((row) => row.every((value) => value === 0))) return null
    const { plus, minus } = sarrusTerms(q)
    const P = plus.reduce((sum, value) => sum + value, 0)
    const M = minus.reduce((sum, value) => sum + value, 0)
    const det = P - M
    if (M === 0 && det !== 0) return null
    const picked = verdictOptions(random, det, [P + M, M - P])
    return picked && { level: 1, q, det, values: [], ...picked, worked: `|A|=(${plus.map(bracket).join('+')})-(${minus.map(bracket).join('+')})=${det}` }
}

/** |p a / r s| = 0: a = ps/r, a whole number */
function parameterRound(random: Random): UniqueRound | null {
    const r = randomInt(random, 1, 4)
    const a = randomInt(random, 1, 6)
    const p = randomInt(random, 1, 6)
    if ((a * r) % p !== 0) return null
    const s = (a * r) / p
    if (s > 9 || s === a) return null
    const q = [[p, 'a'], [r, s]]
    const wrong = [-a, p * s * r, (r * s) / p, a + 1, a - 1, a + 2].filter((value) => Number.isInteger(value) && value !== a)
    const values = [a, ...[...new Set(wrong)].slice(0, 3)]
    if (values.length < 4) return null
    const shuffled = shuffle(random, values)
    return { level: 2, q, det: 0, verdicts: [], values: shuffled, answer: shuffled.indexOf(a), worked: `|A|=${p}\\cdot ${s}-${r}a=0\\ \\to\\ a=${a}` }
}

export function createUniqueRounds(random: Random, level: number): UniqueRound[] {
    const rounds: UniqueRound[] = []
    const make = level === 0 ? twoRound : level === 1 ? threeRound : parameterRound
    for (let attempt = 0; rounds.length < UNIQUE_ROUNDS && attempt < 5000; attempt += 1) {
        const round = make(random)
        if (!round || rounds.some((other) => other.q.flat().join() === round.q.flat().join())) continue
        // Two rounds of each kind at least: the prices found and the prices not found
        const zeros = rounds.filter((other) => other.det === 0).length
        if (level < 2 && round.det === 0 && zeros >= 3) continue
        if (level < 2 && round.det !== 0 && rounds.length - zeros >= 3) continue
        rounds.push(round)
    }
    return rounds
}

export const uniqueLatex = (round: UniqueRound) => `A=\\begin{pmatrix}${round.q.map((row) => row.join('&')).join('\\\\')}\\end{pmatrix}`
