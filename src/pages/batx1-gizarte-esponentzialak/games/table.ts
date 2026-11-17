import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Lineala ala esponentziala? (¿Lineal o exponencial?): a table of four
   data at x = 0, 1, 2, 3. The learner says whether the differences are
   constant (linear) or the quotients are (exponential), and picks the
   value at the asked x from four cards. Level 1: whole steps and whole
   ratios, the next value; level 2: percentages (×1,1, ×0,9…) and the next
   value; level 3: the value two steps further, at x = 5. The wrong cards
   are the other model, adding the last difference to an exponential, and
   multiplying by the last ratio a linear table.
   ========================================================================== */

export const TABLE_ROUNDS = 5

export type TableKind = 'linear' | 'exponential'

export interface TableRound {
    kind: TableKind
    values: number[]
    /** The x asked: 4 (next) or 5 (two further) */
    target: number
    answer: number
    options: number[]
}

const round2 = (value: number) => Math.round(value * 100) / 100

export const tableValue = (kind: TableKind, start: number, step: number, x: number) => round2(kind === 'linear' ? start + step * x : start * step ** x)

function makeRound(random: Random, level: number): TableRound | null {
    const kind: TableKind = random() < 0.5 ? 'linear' : 'exponential'
    let start: number
    let step: number
    if (level === 0) {
        start = randomInt(random, 1, 9)
        step = kind === 'linear' ? randomInt(random, 2, 9) : pick(random, [2, 3])
    } else {
        start = pick(random, [100, 200, 500, 1000])
        const rate = pick(random, [0.1, 0.2, -0.1, -0.2])
        step = kind === 'linear' ? start * rate : round2(1 + rate)
    }
    const target = level === 2 ? 5 : 4
    const values = [0, 1, 2, 3].map((x) => tableValue(kind, start, step, x))
    const answer = tableValue(kind, start, step, target)
    // The other model through the first two data, and the two cross slips
    const difference = values[3] - values[2]
    const ratio = values[3] / values[2]
    const other = kind === 'linear' ? tableValue('exponential', values[0], values[1] / values[0], target) : tableValue('linear', values[0], values[1] - values[0], target)
    const wrong = [other, round2(values[3] + difference * (target - 3)), round2(values[3] * ratio ** (target - 3)), round2(answer + (kind === 'linear' ? step : difference))]
    const distinct = [...new Set([answer, ...wrong.filter((value) => Number.isFinite(value) && value > 0)])]
    if (distinct.length < 4) return null
    return { kind, values, target, answer, options: shuffle(random, distinct.slice(0, 4)) }
}

/** Five rounds of one level, both kinds present */
export function createTableRounds(random: Random, level: number): TableRound[] {
    for (;;) {
        const rounds: TableRound[] = []
        for (let attempt = 0; rounds.length < TABLE_ROUNDS && attempt < 5000; attempt += 1) {
            const round = makeRound(random, level)
            if (!round || rounds.some((other) => other.values.join() === round.values.join())) continue
            rounds.push(round)
        }
        if (rounds.some((round) => round.kind === 'linear') && rounds.some((round) => round.kind === 'exponential')) return rounds
    }
}

export const isTableRight = (round: TableRound, kind: TableKind | null, value: number | null) => kind === round.kind && value === round.answer
