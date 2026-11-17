import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J2 · Optimizatu enpresa (Optimiza la empresa): a short economy problem
   and four numbers; the learner picks the best one. Level 1: the profit
   B(x) = −ax² + bx − c (best units or highest profit). Level 2: the
   average cost of C(x) = ax² + bx + c (units or lowest average). Level 3:
   the price that brings in most, (p + x)(q − kx). The wrong options are
   the typical slips: the 2 of the derivative forgotten, the profit for
   the units, √c without a, the rise for the price.
   ========================================================================== */

export const OPTIMIZE_ROUNDS = 6

export interface OptimizeRound {
    story: LocalizedText
    answer: number
    options: number[]
    /** Units or euros */
    unit: 'units' | 'euros'
    working: string
}

const tex = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
const round2 = (value: number) => Math.round(value * 100) / 100
const coefficient = (value: number) => (value === 1 ? '' : tex(value))

function options(random: Random, answer: number, wrong: number[]): number[] | null {
    const values = [round2(answer)]
    for (const value of [...wrong, answer + 5, answer * 2, answer - 5]) {
        const v = round2(value)
        if (values.length < 4 && Number.isFinite(v) && v > 0 && !values.some((other) => Math.abs(other - v) < 1e-9)) values.push(v)
    }
    return values.length === 4 ? shuffle(random, values) : null
}

/** Level 1: the profit */
function profitRound(random: Random): OptimizeRound | null {
    const a = pick(random, [0.5, 1, 2])
    const best = pick(random, [10, 15, 20, 25, 30, 40])
    const b = 2 * a * best
    const c = randomInt(random, 1, 9) * 100
    const top = -a * best * best + b * best - c
    if (top <= 0) return null
    const profit = `B(x)=-${coefficient(a)}x^2+${tex(b)}x-${c}`
    const derivative = `B'(x)=-${tex(2 * a)}x+${tex(b)}=0\\ \\to\\ x=${best}`
    if (randomInt(random, 0, 1) === 0) {
        const choices = options(random, best, [b / a, top, b])
        return choices && {
            story: say(`$${profit}$ euro. Zenbat unitaterekin da irabazia handiena?`, `$${profit}$ euros. ¿Con cuántas unidades es máximo el beneficio?`, `$${profit}$ يورو. بكم وحدة يكون الربح أعظميًا؟`, `$${profit}$ euros. With how many units is the profit highest?`),
            answer: best,
            options: choices,
            unit: 'units',
            working: derivative
        }
    }
    const choices = options(random, top, [best, top + c, a * best * best])
    return choices && {
        story: say(`$${profit}$ euro. Zenbat da irabazirik handiena?`, `$${profit}$ euros. ¿Cuál es el mayor beneficio?`, `$${profit}$ يورو. ما أكبر ربح؟`, `$${profit}$ euros. What is the highest profit?`),
        answer: top,
        options: choices,
        unit: 'euros',
        working: `${derivative}\\ \\to\\ B(${best})=${tex(top)}`
    }
}

/** Level 2: the average cost */
function averageRound(random: Random): OptimizeRound | null {
    const a = pick(random, [0.5, 1, 2])
    const best = pick(random, [10, 15, 20, 30])
    const c = a * best * best
    const b = randomInt(random, 2, 20)
    const cost = `C(x)=${coefficient(a)}x^2+${b}x+${tex(c)}`
    const average = `M(x)=${coefficient(a)}x+${b}+\\frac{${tex(c)}}{x}`
    const lowest = 2 * a * best + b
    if (randomInt(random, 0, 1) === 0) {
        const choices = options(random, best, [Math.sqrt(c), c / a / 10, lowest])
        return choices && {
            story: say(`$${cost}$ euro. Zenbat unitaterekin da batez besteko kostua minimoa?`, `$${cost}$ euros. ¿Con cuántas unidades es mínimo el coste medio?`, `$${cost}$ يورو. بكم وحدة يكون متوسط التكلفة أصغريًا؟`, `$${cost}$ euros. With how many units is the average cost lowest?`),
            answer: best,
            options: choices,
            unit: 'units',
            working: `${average}\\ \\to\\ x=${best}`
        }
    }
    const choices = options(random, lowest, [best, a * best + b, a * best * best + b * best + c])
    return choices && {
        story: say(`$${cost}$ euro. Zein da batez besteko kosturik txikiena?`, `$${cost}$ euros. ¿Cuál es el menor coste medio?`, `$${cost}$ يورو. ما أصغر متوسط تكلفة؟`, `$${cost}$ euros. What is the lowest average cost?`),
        answer: lowest,
        options: choices,
        unit: 'euros',
        working: `${average}\\ \\to\\ x=${best}\\ \\to\\ M(${best})=${tex(lowest)}`
    }
}

/** Level 3: the price that brings in most */
function priceRound(random: Random): OptimizeRound | null {
    const p = pick(random, [10, 20, 30, 40])
    const k = pick(random, [2, 5, 10, 20])
    const rise = randomInt(random, 2, 15)
    const q = k * (2 * rise + p)
    const price = p + rise
    const choices = options(random, price, [rise, p + 2 * rise, (q / k) / 2])
    return choices && {
        story: say(
            `Negozio batek ${p} euro kobratzen ditu eta ${q} bezero ditu. Euro bat igotzen den bakoitzean, ${k} bezero galtzen ditu. Zein preziok ematen ditu diru-sarrerarik handienak?`,
            `Un negocio cobra ${p} € y tiene ${q} clientes. Por cada euro de subida pierde ${k} clientes. ¿Qué precio da los mayores ingresos?`,
            `يتقاضى نشاط تجاري ${p} € وله ${q} زبونًا. ومع كل يورو زيادة يفقد ${k} زبائن. أي سعر يعطي أكبر إيراد؟`,
            `A business charges €${p} and has ${q} customers. For each euro of rise it loses ${k} customers. Which price brings in most?`
        ),
        answer: price,
        options: choices,
        unit: 'euros',
        working: `I(x)=(${p}+x)(${q}-${k}x)\\ \\to\\ x=${rise}\\ \\to\\ ${p}+${rise}=${price}`
    }
}

/** Six rounds of a level, no story twice */
export function createOptimizeRounds(random: Random, levelIndex: number): OptimizeRound[] {
    const generator = [profitRound, averageRound, priceRound][levelIndex] ?? profitRound
    const rounds: OptimizeRound[] = []
    for (let tries = 0; rounds.length < OPTIMIZE_ROUNDS && tries < 2000; tries += 1) {
        const round = generator(random)
        if (round && !rounds.some((other) => other.story.es === round.story.es)) rounds.push(round)
    }
    if (rounds.length < OPTIMIZE_ROUNDS) throw new Error('No optimize rounds')
    return rounds
}
