import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J1 · Zenbat kostatzen da hurrengoa? (¿Cuánto cuesta la siguiente?): a
   cost, an income or a profit and a production x; the learner picks what
   unit x + 1 costs or brings in, roughly. The right answer is the
   derivative at x; the wrong ones are the typical slips: the average
   C(x)/x, the total C(x), and the derivative at the wrong point or with
   the fixed cost kept. Level 1: quadratic costs. Level 2: costs with a
   root or a logarithm. Level 3: income and profit (B′ = I′ − C′).
   ========================================================================== */

export const NEXT_COST_ROUNDS = 6

export interface NextCostRound {
    story: LocalizedText
    /** The derivative at x and the working, in LaTeX */
    answer: number
    options: number[]
    working: string
}

const tex = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
const round2 = (value: number) => Math.round(value * 100) / 100

function options(random: Random, answer: number, wrong: number[]): number[] | null {
    const values = [round2(answer)]
    for (const value of [...wrong, answer + 1, answer * 2]) {
        const v = round2(value)
        if (values.length < 4 && Number.isFinite(v) && v > 0 && !values.some((other) => Math.abs(other - v) < 1e-9)) values.push(v)
    }
    return values.length === 4 ? shuffle(random, values) : null
}

const costStory = (cost: string, x: number) => say(`Kostua $${cost}$ euro da. Zenbat kostatzen da gutxi gorabehera ${x + 1}. unitatea?`, `El coste es $${cost}$ euros. ¿Cuánto cuesta más o menos la unidad ${x + 1}?`, `التكلفة $${cost}$ يورو. كم تكلّف تقريبًا الوحدة ${x + 1}؟`, `The cost is $${cost}$ euros. Roughly what does unit ${x + 1} cost?`)

/** Level 1: C = a x² + b x + F */
function quadraticRound(random: Random): NextCostRound | null {
    const a = pick(random, [0.1, 0.2, 0.5, 1])
    const b = randomInt(random, 2, 20)
    const fixed = randomInt(random, 1, 9) * 100
    const x = pick(random, [10, 20, 30, 40, 50])
    const answer = 2 * a * x + b
    const total = a * x * x + b * x + fixed
    const choices = options(random, answer, [total / x, total, 2 * a * (x + 1) + b + fixed / 100])
    if (!choices) return null
    const cost = `C(x)=${tex(a)}x^2+${b}x+${fixed}`
    return { story: costStory(cost, x), answer: round2(answer), options: choices, working: `C'(x)=${tex(2 * a)}x+${b}\\ \\to\\ C'(${x})=${tex(answer)}` }
}

/** Level 2: C = F + k√x or F + k ln(x + 1) */
function curvedRound(random: Random): NextCostRound | null {
    const fixed = randomInt(random, 2, 9) * 100
    if (randomInt(random, 0, 1) === 0) {
        const x = pick(random, [4, 16, 25, 100])
        const k = pick(random, [20, 40, 60, 80])
        const answer = k / (2 * Math.sqrt(x))
        const total = fixed + k * Math.sqrt(x)
        const choices = options(random, answer, [total / x, k * Math.sqrt(x), k / Math.sqrt(x)])
        if (!choices) return null
        return { story: costStory(`C(x)=${fixed}+${k}\\sqrt{x}`, x), answer: round2(answer), options: choices, working: `C'(x)=\\frac{${k}}{2\\sqrt{x}}\\ \\to\\ C'(${x})=${tex(answer)}` }
    }
    const x = pick(random, [4, 9, 19, 49])
    const k = pick(random, [100, 200, 500])
    const answer = k / (x + 1)
    const total = fixed + k * Math.log(x + 1)
    const choices = options(random, answer, [total / x, k / x + 10, k * Math.log(x + 1) / x])
    if (!choices) return null
    return { story: costStory(`C(x)=${fixed}+${k}\\ln(x+1)`, x), answer: round2(answer), options: choices, working: `C'(x)=\\frac{${k}}{x+1}\\ \\to\\ C'(${x})=${tex(answer)}` }
}

/** Level 3: income I = p x − q x² and profit B = I − C */
function profitRound(random: Random): NextCostRound | null {
    const p = randomInt(random, 6, 12) * 10
    const q = pick(random, [0.5, 1])
    const c = randomInt(random, 2, 10)
    const x = pick(random, [10, 15, 20, 25])
    if (randomInt(random, 0, 1) === 0) {
        const answer = p - 2 * q * x
        if (answer <= 0) return null
        const income = p * x - q * x * x
        const choices = options(random, answer, [income / x, p - q * x, p])
        if (!choices) return null
        return {
            story: say(`Diru-sarrerak $I(x)=${p}x-${tex(q)}x^2$ euro dira. Zenbat ekarriko du gutxi gorabehera ${x + 1}. unitateak?`, `Los ingresos son $I(x)=${p}x-${tex(q)}x^2$ euros. ¿Cuánto aportará más o menos la unidad ${x + 1}?`, `الإيراد $I(x)=${p}x-${tex(q)}x^2$ يورو. كم ستضيف الوحدة ${x + 1} تقريبًا؟`, `The income is $I(x)=${p}x-${tex(q)}x^2$ euros. Roughly how much will unit ${x + 1} bring in?`),
            answer: round2(answer),
            options: choices,
            working: `I'(x)=${p}-${tex(2 * q)}x\\ \\to\\ I'(${x})=${tex(answer)}`
        }
    }
    const answer = p - 2 * q * x - c
    if (answer <= 0) return null
    const choices = options(random, answer, [p - 2 * q * x, p - c, answer + c * 2])
    if (!choices) return null
    return {
        story: say(`$I(x)=${p}x-${tex(q)}x^2$ eta $C(x)=${c}x+300$ euro. Zenbat irabaziko da gutxi gorabehera ${x + 1}. unitatearekin?`, `$I(x)=${p}x-${tex(q)}x^2$ y $C(x)=${c}x+300$ euros. ¿Cuánto se ganará más o menos con la unidad ${x + 1}?`, `$I(x)=${p}x-${tex(q)}x^2$ و$C(x)=${c}x+300$ يورو. كم يُربح تقريبًا من الوحدة ${x + 1}؟`, `$I(x)=${p}x-${tex(q)}x^2$ and $C(x)=${c}x+300$ euros. Roughly how much will unit ${x + 1} earn?`),
        answer: round2(answer),
        options: choices,
        working: `B'(x)=${p}-${tex(2 * q)}x-${c}\\ \\to\\ B'(${x})=${tex(answer)}`
    }
}

/** Six rounds of a level, no story twice */
export function createNextCostRounds(random: Random, levelIndex: number): NextCostRound[] {
    const generator = [quadraticRound, curvedRound, profitRound][levelIndex] ?? quadraticRound
    const rounds: NextCostRound[] = []
    for (let tries = 0; rounds.length < NEXT_COST_ROUNDS && tries < 2000; tries += 1) {
        const round = generator(random)
        if (round && !rounds.some((other) => other.story.es === round.story.es)) rounds.push(round)
    }
    if (rounds.length < NEXT_COST_ROUNDS) throw new Error('No next-cost rounds')
    return rounds
}
