import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { deviationProducts, pairStats, type Pair } from '../bivariate.ts'

/* ==========================================================================
   J1 · Kobariantzaren zeinua (El signo de la covarianza): rounds on a
   small board 0–10 with the centre of gravity drawn. Level 1: a cloud of
   six points — is the covariance positive, almost zero or negative?
   Level 2: five numbered points — which one adds the most to the
   covariance, or takes the most away? (the far points weigh more than
   the many). Level 3: four pairs written out — the value of σxy, with
   the two usual slips (not subtracting x̄ȳ, not dividing by N) as the
   wrong options. Pure logic.
   ========================================================================== */

export const SIGN_ROUNDS = 6

export type SignRound =
    /** 0 positive, 1 almost zero, 2 negative */
    | { kind: 'sign'; points: Pair[]; answer: 0 | 1 | 2 }
    /** The point (index) that adds the most, or that takes the most away */
    | { kind: 'point'; points: Pair[]; ask: 'adds' | 'subtracts'; answer: number }
    /** σxy among three values */
    | { kind: 'value'; points: Pair[]; options: number[]; answer: number }

const round2 = (value: number) => Math.round(value * 100) / 100
const quarter = (value: number) => Math.abs(value * 4 - Math.round(value * 4)) < 1e-9

/** Six points with a clear sign (|r| ≥ 0,6) or almost none (|r| ≤ 0,15) */
function signRound(random: Random): SignRound | null {
    const answer = pick<0 | 1 | 2>(random, [0, 1, 2])
    const sign = answer === 0 ? 1 : answer === 2 ? -1 : 0
    const xs = shuffle(random, [1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6)
    const slope = sign * pick(random, [0.6, 0.8, 1])
    const points = xs.map((x) => [x, Math.min(10, Math.max(0, Math.round(5 + slope * (x - 5) + randomInt(random, -2, 2))))] as Pair)
    const { r, vx, vy } = pairStats(points)
    if (vx === 0 || vy === 0) return null
    if (sign !== 0 && (Math.sign(r) !== sign || Math.abs(r) < 0.6)) return null
    if (sign === 0 && Math.abs(r) > 0.15) return null
    return { kind: 'sign', points, answer }
}

/** Five numbered points; the one asked for wins by at least 2 */
function pointRound(random: Random): SignRound | null {
    const points = Array.from({ length: 5 }, () => [randomInt(random, 0, 10), randomInt(random, 0, 10)] as Pair)
    if (new Set(points.map(([x, y]) => `${x},${y}`)).size < 5) return null
    // Five integers: the means are fifths, so every product has at most two decimals
    const products = deviationProducts(points)
    const ask = pick(random, ['adds', 'subtracts'] as const)
    const order = products.map((value, index) => ({ value, index })).sort((a, b) => (ask === 'adds' ? b.value - a.value : a.value - b.value))
    const [first, second] = order
    if (ask === 'adds' ? first.value <= 0 : first.value >= 0) return null
    if (Math.abs(first.value - second.value) < 2) return null
    // Both signs on the board, so the question is not answered by «the far one»
    if (!products.some((value) => value > 0.5) || !products.some((value) => value < -0.5)) return null
    return { kind: 'point', points, ask, answer: first.index }
}

/** Four pairs with a covariance in quarters, and the two usual slips as wrong values */
function valueRound(random: Random): SignRound | null {
    const points = Array.from({ length: 4 }, () => [randomInt(random, 1, 6), randomInt(random, 1, 8)] as Pair)
    const { mx, my, cxy } = pairStats(points)
    if (!Number.isInteger(mx) || !Number.isInteger(my) || !quarter(cxy) || Math.abs(cxy) < 0.5) return null
    const meanProducts = cxy + mx * my
    const sum = 4 * cxy
    const values = [round2(cxy), round2(meanProducts), round2(sum)]
    if (new Set(values).size < 3) return null
    const options = shuffle(random, values)
    return { kind: 'value', points, options, answer: options.indexOf(round2(cxy)) }
}

export function createSignRounds(random: Random, level: number): SignRound[] {
    const maker = level === 0 ? signRound : level === 1 ? pointRound : valueRound
    const rounds: SignRound[] = []
    for (let attempt = 0; rounds.length < SIGN_ROUNDS && attempt < 20000; attempt += 1) {
        const round = maker(random)
        if (!round) continue
        // No two rounds with the same points
        const key = round.points.map(([x, y]) => `${x},${y}`).join(' ')
        if (rounds.some((other) => other.points.map(([x, y]) => `${x},${y}`).join(' ') === key)) continue
        rounds.push(round)
    }
    if (rounds.length < SIGN_ROUNDS) throw new Error(`No rounds for level ${level}`)
    // Level 1: the three answers all appear
    if (level === 0 && new Set(rounds.map((round) => (round.kind === 'sign' ? round.answer : -1))).size < 3) return createSignRounds(random, level)
    return rounds
}

/** A decimal for LaTeX: 2{,}25, -1{,}5, 3 */
export const texNumber = (value: number) => String(round2(value)).replace('.', '{,}')
