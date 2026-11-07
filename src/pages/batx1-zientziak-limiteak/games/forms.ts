import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Indeterminazioa ala ez? (¿Indeterminación o no?): a limit; the
   learner says what substituting gives before doing any algebra: an
   indeterminate form, 0, ±∞ or another number. Level 1: limits at a point
   (0/0, k/0, 0/k, a plain number); level 2: limits at infinity (∞/∞,
   ∞ − ∞, ∞ + ∞, k/∞, 0·∞, k + 0); level 3: powers (1^∞, 2^∞, (1/2)^∞,
   ∞⁰, 0^∞, 1³). After answering, the form is shown.
   ========================================================================== */

export type FormBin = 'indeterminate' | 'zero' | 'infinity' | 'number'

export const FORM_BINS: FormBin[] = ['indeterminate', 'zero', 'infinity', 'number']

export const FORMS_ROUNDS = 8

export interface FormsRound {
    kind: string
    /** The limit, for LaTeX */
    limit: string
    /** What substituting gives, for LaTeX */
    form: string
    bin: FormBin
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
/** x − a, or x for a = 0 */
const factor = (a: number) => (a === 0 ? 'x' : `x${signed(-a)}`)
/** x² + bx + c */
const quadratic = (b: number, c: number) => `x^2${b === 0 ? '' : `${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x`}${c === 0 ? '' : signed(c)}`
const atPoint = (a: number, body: string) => `\\lim_{x\\to ${a}}${body}`
const atInfinity = (body: string) => `\\lim_{x\\to+\\infty}${body}`

/** Level 1: substituting at a point */
function pointRound(random: Random): FormsRound | null {
    const a = pick(random, [-3, -2, -1, 1, 2, 3])
    const kind = pick(random, ['zero-zero', 'k-zero', 'zero-k', 'number'] as const)
    if (kind === 'zero-zero') {
        const b = randomInt(random, -4, 4)
        if (b === a) return null
        return { kind, limit: atPoint(a, `\\frac{${quadratic(-(a + b), a * b)}}{${factor(a)}}`), form: '\\frac{0}{0}', bin: 'indeterminate' }
    }
    if (kind === 'k-zero') {
        const b = randomInt(random, -4, 5)
        if (a + b === 0) return null
        return { kind, limit: atPoint(a, `\\frac{${factor(-b)}}{${factor(a)}}`), form: `\\frac{${a + b}}{0}`, bin: 'infinity' }
    }
    if (kind === 'zero-k') {
        const b = randomInt(random, -4, 5)
        if (a + b === 0) return null
        return { kind, limit: atPoint(a, `\\frac{${factor(a)}}{${factor(-b)}}`), form: `\\frac{0}{${a + b}}`, bin: 'zero' }
    }
    const c = randomInt(random, 1, 6)
    const b = randomInt(random, -3, 4)
    if (a + b === 0) return null
    return { kind, limit: atPoint(a, `\\frac{x^2+${c}}{${factor(-b)}}`), form: `\\frac{${a * a + c}}{${a + b}}`, bin: 'number' }
}

/** Level 2: limits at infinity */
function infinityRound(random: Random): FormsRound | null {
    const kind = pick(random, ['quotient', 'difference', 'roots', 'sum', 'k-infinity', 'zero-times', 'k-plus-zero'] as const)
    const p = randomInt(random, 2, 6)
    const q = randomInt(random, 2, 6)
    switch (kind) {
        case 'quotient': return { kind, limit: atInfinity(`\\frac{${p}x^2+1}{${q}x^2+x}`), form: '\\frac{\\infty}{\\infty}', bin: 'indeterminate' }
        case 'difference': return { kind, limit: atInfinity(`\\left(x^2-${p}x\\right)`), form: '\\infty-\\infty', bin: 'indeterminate' }
        case 'roots': return { kind, limit: atInfinity(`\\left(\\sqrt{x+${p}}-\\sqrt{x}\\right)`), form: '\\infty-\\infty', bin: 'indeterminate' }
        case 'sum': return { kind, limit: atInfinity(`\\left(x^2+${p}x\\right)`), form: '\\infty+\\infty', bin: 'infinity' }
        case 'k-infinity': return { kind, limit: atInfinity(`\\frac{${p}}{x^2+${q}}`), form: `\\frac{${p}}{\\infty}`, bin: 'zero' }
        case 'zero-times': return { kind, limit: atInfinity(`\\left(x\\cdot\\frac{${p}}{x^2}\\right)`), form: '\\infty\\cdot 0', bin: 'indeterminate' }
        case 'k-plus-zero': return { kind, limit: atInfinity(`\\left(${p}+\\frac{${q}}{x}\\right)`), form: `${p}+0`, bin: 'number' }
    }
}

/** Level 3: powers */
function powerRound(random: Random): FormsRound | null {
    const kind = pick(random, ['one-infinity', 'base-two', 'base-half', 'one-power', 'infinity-zero', 'zero-infinity', 'quotient-power'] as const)
    const p = randomInt(random, 1, 5)
    const b = randomInt(random, 2, 4)
    switch (kind) {
        case 'one-infinity': return { kind, limit: atInfinity(`\\left(1+\\frac{${p}}{x}\\right)^{${pick(random, ['x', '2x', '3x', 'x^2'])}}`), form: '1^{\\infty}', bin: 'indeterminate' }
        case 'base-two': return { kind, limit: atInfinity(`\\left(${b}+\\frac{${p}}{x}\\right)^{x}`), form: `${b}^{\\infty}`, bin: 'infinity' }
        case 'base-half': return { kind, limit: atInfinity(`\\left(\\frac{1}{${b}}+\\frac{${p}}{x}\\right)^{x}`), form: `\\left(\\frac{1}{${b}}\\right)^{\\infty}`, bin: 'zero' }
        case 'one-power': return { kind, limit: atInfinity(`\\left(1+\\frac{${p}}{x}\\right)^{${b}}`), form: `1^{${b}}`, bin: 'number' }
        case 'infinity-zero': return { kind, limit: atInfinity(`\\left(x+${p}\\right)^{\\frac{1}{x}}`), form: '\\infty^{0}', bin: 'indeterminate' }
        case 'zero-infinity': return { kind, limit: atInfinity(`\\left(\\frac{${p}}{x}\\right)^{x}`), form: '0^{\\infty}', bin: 'zero' }
        case 'quotient-power': {
            const base = randomInt(random, 1, 3)
            return { kind, limit: atInfinity(`\\left(\\frac{${base === 1 ? '' : base}x+${p}}{x-1}\\right)^{x}`), form: `${base}^{\\infty}`, bin: base === 1 ? 'indeterminate' : 'infinity' }
        }
    }
}

const makers = [pointRound, infinityRound, powerRound]

/** Eight different rounds of one level, with every kind of answer at least once */
export function createFormsRounds(random: Random, level: number): FormsRound[] {
    const make = makers[level] ?? pointRound
    for (let draw = 0; draw < 200; draw += 1) {
        const rounds: FormsRound[] = []
        for (let attempt = 0; rounds.length < FORMS_ROUNDS && attempt < 2000; attempt += 1) {
            const round = make(random)
            if (!round || rounds.some((other) => other.limit === round.limit)) continue
            rounds.push(round)
        }
        if (FORM_BINS.every((bin) => rounds.some((round) => round.bin === bin))) return shuffle(random, rounds)
    }
    throw new Error(`No rounds for level ${level}`)
}
