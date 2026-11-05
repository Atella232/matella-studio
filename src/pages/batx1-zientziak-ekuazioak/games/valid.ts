import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Baliozkoa ala faltsua? (¿Válida o falsa?): an equation is shown
   with the candidates that the algebra gives (multiplying by the
   denominator, squaring, joining logarithms), and the learner says of
   each one whether it works or why it does not: it makes a denominator
   zero, the radical would equal a negative number, or a logarithm gets a
   negative number. Level 1: fractions and radicals; level 2: logarithms
   and radicals; level 3: all of them mixed.
   ========================================================================== */

export const VALID_ROUNDS = 6

export type ValidKind = 'rational' | 'radical' | 'log-double' | 'log-sum'
/** Why a candidate is false */
export type FalseReason = 'denominator' | 'sign' | 'domain'
/** What the learner says of a candidate */
export type CandidateVerdict = 'valid' | FalseReason
export const CANDIDATE_VERDICTS: CandidateVerdict[] = ['valid', 'denominator', 'sign', 'domain']

export interface Candidate {
    value: number
    /** Null when it really solves the equation */
    reason: FalseReason | null
}

export interface ValidRound {
    kind: ValidKind
    /** The equation, in LaTeX */
    latex: string
    /** The equation the algebra leads to, in LaTeX */
    reduced: string
    candidates: Candidate[]
    meta: Record<string, number>
}

const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
/** x² + bx + c = 0 for the roots r and s */
const quadratic = (r: number, s: number) => `x^2${signed(-(r + s)) === '' ? '' : `${signed(-(r + s)).replace(/^([+-])1$/, '$1')}x`}${signed(r * s)}=0`

/** (x² + ab)/(x − a) = (a + b)x/(x − a): the candidates a and b, and a makes the denominator zero */
function rationalRound(random: Random): ValidRound | null {
    const a = pick(random, [-3, -2, -1, 1, 2, 3, 4])
    const b = pick(random, [-4, -3, -2, -1, 1, 2, 3, 5])
    if (a === b || a + b === 0) return null
    const top = `x^2${signed(a * b)}`
    const right = `${a + b === 1 ? '' : a + b === -1 ? '-' : a + b}x`
    const latex = `\\frac{${top}}{x${signed(-a)}}=\\frac{${right}}{x${signed(-a)}}`
    return { kind: 'rational', latex, reduced: quadratic(a, b), candidates: [{ value: a, reason: 'denominator' }, { value: b, reason: null }], meta: { a, b } }
}

/** √(x + p) = x + q, squared: the roots r₁ and r₂; a root with r + q < 0 is false */
function radicalRound(random: Random): ValidRound | null {
    const r1 = randomInt(random, -4, 6)
    const r2 = randomInt(random, -4, 6)
    if (r1 === r2 || (r1 + r2) % 2 === 0) return null
    const q = (1 - r1 - r2) / 2
    const p = q * q - r1 * r2
    if (p === 0 || q === 0 || Math.abs(p) > 12) return null
    const candidates = [r1, r2].map((value) => ({ value, reason: value + q >= 0 ? null : ('sign' as const) }))
    // Mostly one true and one false; sometimes both true
    if (candidates.every((candidate) => candidate.reason !== null)) return null
    return { kind: 'radical', latex: `\\sqrt{x${signed(p)}}=x${signed(q)}`, reduced: quadratic(r1, r2), candidates, meta: { p, q } }
}

/** 2 log x = log(x + k): x² = x + k, the roots r and 1 − r; the one that is not positive is false */
function logDoubleRound(random: Random): ValidRound | null {
    const r = randomInt(random, 2, 6)
    const k = r * r - r
    return { kind: 'log-double', latex: `2\\log x=\\log(x+${k})`, reduced: quadratic(r, 1 - r), candidates: [{ value: r, reason: null }, { value: 1 - r, reason: 'domain' }], meta: { k } }
}

/** log(x + a) + log(x − a) = log c: x² = a² + c, x = ±s; the negative one is false */
function logSumRound(random: Random): ValidRound | null {
    const a = randomInt(random, 1, 3)
    const s = randomInt(random, a + 1, a + 3)
    const c = s * s - a * a
    return { kind: 'log-sum', latex: `\\log(x+${a})+\\log(x-${a})=\\log ${c}`, reduced: `x^2=${s * s}`, candidates: [{ value: s, reason: null }, { value: -s, reason: 'domain' }], meta: { a, c } }
}

const makers: Array<Array<(random: Random) => ValidRound | null>> = [
    [rationalRound, radicalRound],
    [logDoubleRound, logSumRound, radicalRound],
    [rationalRound, radicalRound, logDoubleRound, logSumRound]
]

/** Six different rounds of one level, the candidates in random order */
export function createValidRounds(random: Random, level: number): ValidRound[] {
    const rounds: ValidRound[] = []
    const pool = makers[level] ?? makers[0]
    for (let attempt = 0; rounds.length < VALID_ROUNDS && attempt < 3000; attempt += 1) {
        const round = pick(random, pool)(random)
        if (!round || rounds.some((other) => other.latex === round.latex)) continue
        rounds.push({ ...round, candidates: shuffle(random, round.candidates) })
    }
    return rounds
}

/** The candidates that really solve the equation */
export const validValues = (round: ValidRound) => round.candidates.filter((candidate) => candidate.reason === null).map((candidate) => candidate.value)
/** The right verdict on a candidate */
export const verdictOf = (candidate: Candidate): CandidateVerdict => candidate.reason ?? 'valid'
/** Right when every candidate gets its right verdict */
export const isValidChoice = (round: ValidRound, verdicts: Array<CandidateVerdict | null>) => round.candidates.every((candidate, index) => verdicts[index] === verdictOf(candidate))
