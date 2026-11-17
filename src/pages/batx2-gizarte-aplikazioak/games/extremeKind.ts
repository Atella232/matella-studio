import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J1 · Maximoa, minimoa ala ezer ez? (¿Máximo, mínimo o nada?): a point
   where the derivative is zero, and the learner says what is there.
   Level 1: a numeric sign chart of f′ (the colour does or does not
   change). Level 2: a polynomial, worked with f″ or with the sign of f′
   (x³ − 3k²x, x⁴ − 2k²x², a parabola, (x − a)³ + a³ with no extremum).
   Level 3: economy (a profit, sales with a peak and a trough, an average
   cost, users that stop for an instant).
   ========================================================================== */

export const EXTREME_ROUNDS = 6

export type ExtremeKind = 'max' | 'min' | 'none'

export const EXTREME_KINDS: ExtremeKind[] = ['max', 'min', 'none']

export interface ExtremeRound {
    prompt: LocalizedText
    /** The table or the formula, shown big */
    latex: string
    answer: ExtremeKind
    /** Why, in LaTeX */
    working: string
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const sign = (value: 1 | -1) => (value > 0 ? '+' : '-')
const kindOf = (left: 1 | -1, right: 1 | -1): ExtremeKind => (left === right ? 'none' : left > 0 ? 'max' : 'min')
const atPoint = (name: string, variable: string, point: number) => say(
    `$${name}'(${point})=0$. Zer dago $${variable}=${point}$ puntuan?`,
    `$${name}'(${point})=0$. ¿Qué hay en $${variable}=${point}$?`,
    `$${name}'(${point})=0$. ماذا يوجد عند $${variable}=${point}$؟`,
    `$${name}'(${point})=0$. What is there at $${variable}=${point}$?`
)

/** Level 1: the sign chart of f′ with two zeros */
function tableRound(random: Random): ExtremeRound {
    const a = randomInt(random, -4, 2)
    const b = a + randomInt(random, 1, 3)
    const signs = [pick(random, [1, -1] as const), pick(random, [1, -1] as const), pick(random, [1, -1] as const)]
    const which = randomInt(random, 0, 1)
    const point = which === 0 ? a : b
    const left = signs[which]
    const right = signs[which + 1]
    return {
        prompt: say(
            `$f'$ funtzioaren zeinu-taula. Zer dago $x=${point}$ puntuan?`,
            `Tabla de signos de $f'$. ¿Qué hay en $x=${point}$?`,
            `جدول إشارات $f'$. ماذا يوجد عند $x=${point}$؟`,
            `Sign chart of $f'$. What is there at $x=${point}$?`
        ),
        latex: `\\begin{array}{c|ccccc}x & & ${a} & & ${b} & \\\\ \\hline f'(x) & ${sign(signs[0])} & 0 & ${sign(signs[1])} & 0 & ${sign(signs[2])}\\end{array}`,
        answer: kindOf(left, right),
        working: `${sign(left)}\\ 0\\ ${sign(right)}`
    }
}

/** Level 2: polynomials */
function polynomialRound(random: Random): ExtremeRound {
    const kind = randomInt(random, 0, 3)
    if (kind === 0) {
        const k = randomInt(random, 1, 4)
        const point = pick(random, [k, -k])
        return { prompt: atPoint('f', 'x', point), latex: `f(x)=x^3-${3 * k * k}x`, answer: point > 0 ? 'min' : 'max', working: `f''(${point})=${6 * point}` }
    }
    if (kind === 1) {
        const a = randomInt(random, 1, 3)
        return { prompt: atPoint('f', 'x', a), latex: `f(x)=x^3-${3 * a}x^2+${3 * a * a}x`, answer: 'none', working: `f'(x)=3(x-${a})^2\\ge 0` }
    }
    if (kind === 2) {
        const k = randomInt(random, 1, 3)
        const point = pick(random, [0, k, -k])
        const second = 12 * point * point - 4 * k * k
        return { prompt: atPoint('f', 'x', point), latex: `f(x)=x^4-${2 * k * k}x^2`, answer: second < 0 ? 'max' : 'min', working: `f''(${point})=${second}` }
    }
    const a = randomInt(random, 1, 5)
    const up = randomInt(random, 0, 1) === 0
    return { prompt: atPoint('f', 'x', a), latex: up ? `f(x)=x^2-${2 * a}x` : `f(x)=-x^2+${2 * a}x`, answer: up ? 'min' : 'max', working: `f''(x)=${up ? 2 : -2}` }
}

/** Level 3: economy */
function economyRound(random: Random): ExtremeRound {
    const kind = randomInt(random, 0, 3)
    if (kind === 0) {
        const a = randomInt(random, 2, 6) * 5
        const c = randomInt(random, 1, 9) * 100
        return { prompt: atPoint('B', 'x', a), latex: `B(x)=-x^2+${2 * a}x-${c}`, answer: 'max', working: `B''(x)=-2<0` }
    }
    if (kind === 1) {
        const a = randomInt(random, 1, 3)
        const b = a + 2 * randomInt(random, 1, 2)
        const point = pick(random, [a, b])
        const s = (3 * (a + b)) / 2
        return { prompt: atPoint('V', 't', point), latex: `V(t)=t^3-${s}t^2+${3 * a * b}t`, answer: point === a ? 'max' : 'min', working: `V'(t)=3(t-${a})(t-${b})\\qquad V''(${point})=${6 * point - 2 * s}` }
    }
    if (kind === 2) {
        const k = randomInt(random, 1, 6) * 5
        const c = randomInt(random, 2, 20)
        return { prompt: atPoint('M', 'x', k), latex: `M(x)=x+${c}+\\frac{${k * k}}{x}`, answer: 'min', working: `M''(${k})=\\frac{${2 * k * k}}{${k * k * k}}>0` }
    }
    const a = randomInt(random, 1, 4)
    return { prompt: atPoint('U', 't', a), latex: `U(t)=t^3-${3 * a}t^2+${3 * a * a}t${signed(100)}`, answer: 'none', working: `U'(t)=3(t-${a})^2\\ge 0` }
}

/** Six rounds of a level, no exercise twice and at least two different answers */
export function createExtremeRounds(random: Random, levelIndex: number): ExtremeRound[] {
    const generator = [tableRound, polynomialRound, economyRound][levelIndex] ?? tableRound
    for (let attempt = 0; attempt < 200; attempt += 1) {
        const rounds: ExtremeRound[] = []
        for (let tries = 0; rounds.length < EXTREME_ROUNDS && tries < 2000; tries += 1) {
            const round = generator(random)
            if (!rounds.some((other) => other.latex === round.latex && other.prompt.es === round.prompt.es)) rounds.push(round)
        }
        if (rounds.length === EXTREME_ROUNDS && new Set(rounds.map((round) => round.answer)).size >= 2) return rounds
    }
    throw new Error('No extreme rounds')
}
