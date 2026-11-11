import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J3 · Eraiki zatikiak / Construye las fracciones: a rational function
   and three options. Level 1, the skeleton: which fractions does the
   denominator ask for (two simple roots, a double root, a root and a
   quadratic with no real roots, a double and a simple root)? Level 2, the
   number: the A (or the B) of A/(x − a) + B/(x − b), with the other
   coefficient and N(a) not divided by a − b as wrong options. Level 3,
   divide first: quotient plus remainder over the divisor, against the
   remainder taken from the constant term and the quotient with the wrong
   sign. Every round of levels 2 and 3 keeps the functions of its options,
   so the tests can check that only the right one equals R.
   ========================================================================== */

export const BUILD_ROUNDS = 6

export interface BuildRound {
    /** R(x) in LaTeX */
    rational: string
    /** What the round asks: the skeleton, the value of A or B, or the division */
    ask: 'skeleton' | 'A' | 'B' | 'division'
    options: string[]
    answer: number
    /** The worked reason, in LaTeX */
    reason: string
    /** For levels 2 and 3: R and each option as functions of x (the skeletons have none) */
    R?: (x: number) => number
    values?: Array<(x: number) => number>
}

const linear = (a: number) => (a === 0 ? 'x' : a > 0 ? `x-${a}` : `x+${-a}`)
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const poly = (p: number, q: number) => {
    const head = p === 0 ? '' : p === 1 ? 'x' : p === -1 ? '-x' : `${p}x`
    if (!head) return String(q)
    return q === 0 ? head : `${head}${signed(q)}`
}

/* ---------- Level 1: the skeleton ---------- */

function skeleton(random: Random): BuildRound {
    const [a, b] = shuffle(random, [-3, -2, -1, 1, 2, 3]).slice(0, 2)
    const c = pick(random, [1, 4, 9])
    const N = pick(random, ['3', '2x+1', 'x+5', '4'])
    const kind = pick(random, ['simple', 'double', 'quadratic', 'mixed'] as const)
    const la = linear(a)
    const lb = linear(b)
    const sets: Record<typeof kind, { denominator: string; right: string; wrong: string[] }> = {
        simple: { denominator: `(${la})(${lb})`, right: `\\frac{A}{${la}}+\\frac{B}{${lb}}`, wrong: [`\\frac{A}{(${la})(${lb})}`, `\\frac{A}{${la}}+\\frac{B}{(${lb})^2}`] },
        double: { denominator: `(${la})^2`, right: `\\frac{A}{${la}}+\\frac{B}{(${la})^2}`, wrong: [`\\frac{A}{(${la})^2}`, `\\frac{A}{${la}}+\\frac{B}{${la}}`] },
        quadratic: { denominator: `(${la})(x^2+${c})`, right: `\\frac{A}{${la}}+\\frac{Bx+C}{x^2+${c}}`, wrong: [`\\frac{A}{${la}}+\\frac{B}{x+${c}}`, `\\frac{A}{${la}}+\\frac{B}{x^2}`] },
        mixed: { denominator: `(${la})^2(${lb})`, right: `\\frac{A}{${la}}+\\frac{B}{(${la})^2}+\\frac{C}{${lb}}`, wrong: [`\\frac{A}{(${la})^2}+\\frac{B}{${lb}}`, `\\frac{A}{${la}}+\\frac{B}{${lb}}`] }
    }
    const set = sets[kind]
    const options = shuffle(random, [set.right, ...set.wrong])
    const reasons: Record<typeof kind, string> = {
        simple: `${la},\\ ${lb}\\ \\to\\ \\frac{A}{${la}}+\\frac{B}{${lb}}`,
        double: `(${la})^2\\ \\to\\ \\frac{A}{${la}}+\\frac{B}{(${la})^2}`,
        quadratic: `x^2+${c}\\ \\to\\ \\frac{Bx+C}{x^2+${c}}`,
        mixed: `(${la})^2\\ \\to\\ \\frac{A}{${la}}+\\frac{B}{(${la})^2}`
    }
    return { rational: `\\frac{${N}}{${set.denominator}}`, ask: 'skeleton', options, answer: options.indexOf(set.right), reason: reasons[kind] }
}

/* ---------- Level 2: the number ---------- */

function coefficient(random: Random): BuildRound {
    for (;;) {
        const [a, b] = shuffle(random, [-3, -2, -1, 1, 2, 3]).slice(0, 2)
        // a − b must not be ±1, or N(a) would equal A
        if (Math.abs(a - b) < 2) continue
        const A = pick(random, [-3, -2, -1, 1, 2, 3])
        const B = pick(random, [-3, -2, -1, 1, 2, 3])
        if (A === B) continue
        const p = A + B
        const q = -(A * b + B * a)
        if (p === 0) continue
        const askA = random() < 0.5
        const value = askA ? A : B
        const other = askA ? B : A
        const root = askA ? a : b
        const naive = p * root + q
        const wrong = [other, naive].filter((item) => item !== value)
        const distinct = [...new Set(wrong)]
        if (distinct.length < 2) continue
        const options = shuffle(random, [value, ...distinct]).map(String)
        const R = (x: number) => (p * x + q) / ((x - a) * (x - b))
        const N = poly(p, q)
        return {
            rational: `\\frac{${N}}{(${linear(a)})(${linear(b)})}`,
            ask: askA ? 'A' : 'B',
            options,
            answer: options.indexOf(String(value)),
            reason: `x=${root}\\ \\to\\ ${askA ? 'A' : 'B'}=\\frac{${naive}}{${root - (askA ? b : a)}}=${value}`,
            R,
            values: options.map((option) => {
                const guess = Number(option)
                return (x: number) => askA ? guess / (x - a) + B / (x - b) : A / (x - a) + guess / (x - b)
            })
        }
    }
}

/* ---------- Level 3: divide first ---------- */

function division(random: Random): BuildRound {
    for (;;) {
        const a = pick(random, [-3, -2, -1, 1, 2, 3])
        const c = pick(random, [-3, -2, -1, 1, 2, 3])
        const r = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4, 5])
        // N = (x − a)(x + c) + r = x² + (c − a)x + (r − ac)
        const p = c - a
        const q = r - a * c
        if (q === r || p === 0) continue
        const top = `x^2${p === 1 ? '+x' : p === -1 ? '-x' : signed(p) + 'x'}${q === 0 ? '' : signed(q)}`
        const quotient = (shift: number) => `x${shift === 0 ? '' : signed(shift)}`
        const fraction = (rest: number) => `${rest < 0 ? '-' : '+'}\\frac{${Math.abs(rest)}}{${linear(a)}}`
        const candidates = [
            { latex: `${quotient(c)}${fraction(r)}`, fn: (x: number) => x + c + r / (x - a) },
            { latex: `${quotient(c)}${fraction(q)}`, fn: (x: number) => x + c + q / (x - a) },
            { latex: `${quotient(-c)}${fraction(r)}`, fn: (x: number) => x - c + r / (x - a) }
        ]
        const order = shuffle(random, [0, 1, 2])
        return {
            rational: `\\frac{${top}}{${linear(a)}}`,
            ask: 'division',
            options: order.map((index) => candidates[index].latex),
            answer: order.indexOf(0),
            reason: `${top}=(${linear(a)})(${quotient(c)})${signed(r)}`,
            R: (x) => (x * x + p * x + q) / (x - a),
            values: order.map((index) => candidates[index].fn)
        }
    }
}

const MAKERS = [skeleton, coefficient, division]

/** Six rounds of one level, never the same function twice */
export function createBuildRounds(random: Random, level: number): BuildRound[] {
    const make = MAKERS[Math.min(2, Math.max(0, level))]
    const rounds: BuildRound[] = []
    for (let attempt = 0; rounds.length < BUILD_ROUNDS && attempt < 400; attempt += 1) {
        const round = make(random)
        if (attempt < 399 && rounds.some((item) => item.rational === round.rational)) continue
        rounds.push(round)
    }
    return rounds
}
