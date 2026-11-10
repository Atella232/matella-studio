import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · L'Hôpitalek balio du? (¿Vale L'Hôpital?): a limit, and the learner
   says what to do: L'Hôpital applies now (0/0 or ∞/∞), it has to be
   transformed first (0·∞, ∞ − ∞, 1^∞, 0⁰ or ∞⁰) or there is no
   indeterminate form at all. Level 1: limits at a point; level 2: limits
   at infinity; level 3: everything mixed. Every round carries its form
   and its value, shown after the answer.
   ========================================================================== */

export type HopitalBin = 'now' | 'transform' | 'none'

export const HOPITAL_BINS: HopitalBin[] = ['now', 'transform', 'none']

export const HOPITAL_ROUNDS = 8

export interface HopitalRound {
    /** The limit, in LaTeX */
    latex: string
    /** What substituting gives: \frac{0}{0}, 0\cdot\infty, \frac{1}{2}… */
    form: string
    /** The value of the limit */
    value: string
    bin: HopitalBin
}

type Maker = (random: Random) => HopitalRound

const at = (a: number | string) => `\\lim_{x\\to ${a}}`

/** A fraction in lowest terms, or a whole number */
function frac(p: number, q: number): string {
    const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y))
    const g = gcd(p, q)
    return q / g === 1 ? String(p / g) : `\\frac{${p / g}}{${q / g}}`
}

/** Level 1: limits at a point */
const POINT: Record<HopitalBin, Maker[]> = {
    now: [
        (random) => { const k = randomInt(random, 2, 6); return { latex: `${at(0)}\\frac{e^{${k}x}-1}{x}`, form: '\\frac{0}{0}', value: String(k), bin: 'now' } },
        (random) => { const k = randomInt(random, 2, 5); return { latex: `${at(0)}\\frac{\\sin ${k}x}{x}`, form: '\\frac{0}{0}', value: String(k), bin: 'now' } },
        (random) => { const a = randomInt(random, 2, 5); return { latex: `${at(a)}\\frac{x^2-${a * a}}{x-${a}}`, form: '\\frac{0}{0}', value: String(2 * a), bin: 'now' } },
        () => ({ latex: `${at(1)}\\frac{\\ln x}{x-1}`, form: '\\frac{0}{0}', value: '1', bin: 'now' }),
        () => ({ latex: `${at(0)}\\frac{1-\\cos x}{x^2}`, form: '\\frac{0}{0}', value: '\\frac{1}{2}', bin: 'now' })
    ],
    transform: [
        () => ({ latex: `\\lim_{x\\to 0^+}x\\ln x`, form: '0\\cdot(-\\infty)', value: '0', bin: 'transform' }),
        (random) => { const k = randomInt(random, 2, 5); return { latex: `${at(0)}(1+${k}x)^{1/x}`, form: '1^{\\infty}', value: `e^{${k}}`, bin: 'transform' } },
        () => ({ latex: `\\lim_{x\\to 0^+}x^x`, form: '0^0', value: '1', bin: 'transform' }),
        () => ({ latex: `${at(0)}\\left(\\frac{1}{x}-\\frac{1}{e^x-1}\\right)`, form: '\\infty-\\infty', value: '\\frac{1}{2}', bin: 'transform' }),
        () => ({ latex: `\\lim_{x\\to 0^+}\\sqrt{x}\\ln x`, form: '0\\cdot(-\\infty)', value: '0', bin: 'transform' })
    ],
    none: [
        (random) => { const p = randomInt(random, 1, 5); const q = p + randomInt(random, 1, 3); return { latex: `${at(0)}\\frac{x+${p}}{x+${q}}`, form: `\\frac{${p}}{${q}}`, value: frac(p, q), bin: 'none' } },
        (random) => { const k = randomInt(random, 2, 5); return { latex: `${at(0)}\\frac{\\cos x}{x+${k}}`, form: `\\frac{1}{${k}}`, value: `\\frac{1}{${k}}`, bin: 'none' } },
        (random) => { const k = randomInt(random, 1, 4); return { latex: `${at(0)}\\frac{e^x+${k}}{x+1}`, form: `\\frac{${k + 1}}{1}`, value: String(k + 1), bin: 'none' } },
        (random) => { const a = randomInt(random, 2, 4); return { latex: `${at(a)}\\frac{x^2}{x+1}`, form: `\\frac{${a * a}}{${a + 1}}`, value: frac(a * a, a + 1), bin: 'none' } }
    ]
}

/** Level 2: limits at infinity */
const INFINITY: Record<HopitalBin, Maker[]> = {
    now: [
        () => ({ latex: `${at('+\\infty')}\\frac{\\ln x}{x}`, form: '\\frac{\\infty}{\\infty}', value: '0', bin: 'now' }),
        (random) => { const k = randomInt(random, 2, 4); return { latex: `${at('+\\infty')}\\frac{x^${k}}{e^x}`, form: '\\frac{\\infty}{\\infty}', value: '0', bin: 'now' } },
        () => ({ latex: `${at('+\\infty')}\\frac{e^x}{x^2}`, form: '\\frac{\\infty}{\\infty}', value: '+\\infty', bin: 'now' }),
        (random) => { const k = randomInt(random, 2, 6); return { latex: `${at('+\\infty')}\\frac{\\ln x}{x^${k}}`, form: '\\frac{\\infty}{\\infty}', value: '0', bin: 'now' } }
    ],
    transform: [
        (random) => { const k = randomInt(random, 2, 4); return { latex: `${at('+\\infty')}x^${k}e^{-x}`, form: '\\infty\\cdot 0', value: '0', bin: 'transform' } },
        () => ({ latex: `${at('+\\infty')}x^{1/x}`, form: '\\infty^0', value: '1', bin: 'transform' }),
        (random) => { const k = randomInt(random, 2, 5); return { latex: `${at('+\\infty')}\\left(1+\\frac{${k}}{x}\\right)^x`, form: '1^{\\infty}', value: `e^{${k}}`, bin: 'transform' } },
        (random) => { const k = pick(random, [2, 4, 6]); return { latex: `${at('+\\infty')}\\left(\\sqrt{x^2+${k}x}-x\\right)`, form: '\\infty-\\infty', value: String(k / 2), bin: 'transform' } }
    ],
    none: [
        (random) => { const k = randomInt(random, 2, 5); return { latex: `${at('+\\infty')}\\frac{${k}}{x}`, form: `\\frac{${k}}{\\infty}`, value: '0', bin: 'none' } },
        () => ({ latex: `${at('+\\infty')}\\frac{e^{-x}}{x}`, form: '\\frac{0}{\\infty}', value: '0', bin: 'none' }),
        () => ({ latex: `${at('+\\infty')}x\\,e^x`, form: '\\infty\\cdot\\infty', value: '+\\infty', bin: 'none' }),
        () => ({ latex: `${at('+\\infty')}\\frac{\\ln x}{e^{-x}}`, form: '\\frac{\\infty}{0^+}', value: '+\\infty', bin: 'none' })
    ]
}

const LEVELS: Array<Record<HopitalBin, Maker[]>> = [
    POINT,
    INFINITY,
    { now: [...POINT.now, ...INFINITY.now], transform: [...POINT.transform, ...INFINITY.transform], none: [...POINT.none, ...INFINITY.none] }
]

/** Eight rounds of one level: three, three and two of the bins, all different */
export function createHopitalRounds(random: Random, levelIndex: number): HopitalRound[] {
    const makers = LEVELS[levelIndex] ?? POINT
    const bins = shuffle(random, [...HOPITAL_BINS, ...HOPITAL_BINS, ...HOPITAL_BINS.slice(0, 2)].slice(0, HOPITAL_ROUNDS))
    for (let attempt = 0; attempt < 200; attempt += 1) {
        const rounds: HopitalRound[] = []
        for (const bin of bins) {
            for (let tries = 0; tries < 200; tries += 1) {
                const next = pick(random, makers[bin])(random)
                if (!rounds.some((other) => other.latex === next.latex)) {
                    rounds.push(next)
                    break
                }
            }
        }
        if (rounds.length === HOPITAL_ROUNDS) return rounds
    }
    throw new Error('No L\'Hôpital rounds')
}
