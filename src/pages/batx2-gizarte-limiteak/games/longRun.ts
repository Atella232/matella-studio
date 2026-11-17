import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J1 · Epe luzera? (¿A largo plazo?): a model of economy or society and
   the question of what it does in the long run: it dies away (0), it
   levels off at a number, or it grows without end. Level 1: quotients
   (population, sales, learning) with the same degree, more degree below
   or more degree on top. Level 2: the average cost C(x)/x of a total
   cost with no cost per unit, a cost per unit or a square term. Level 3,
   all mixed with exponentials (eᵗ, 0,8ᵗ) and roots. Every round carries
   the value, so the verdict can say where it goes.
   ========================================================================== */

export type LongRunBin = 'zero' | 'number' | 'infinity'

export const LONG_RUN_BINS: LongRunBin[] = ['zero', 'number', 'infinity']

export const LONG_RUN_ROUNDS = 8

export interface LongRunRound {
    /** The story, with the model inside */
    story: LocalizedText
    /** The model, as LaTeX, for the explanation */
    model: string
    bin: LongRunBin
    /** The number it levels off at, when it does */
    value: number | null
    /** Why, in a short formula */
    reason: string
}

type Topic = 'population' | 'sales' | 'pieces' | 'visitors'

const STORIES: Record<Topic, (model: string) => LocalizedText> = {
    population: (model) => say(`Herri baten biztanleria, milakatan, $${model}$ da, $t$ urteetan.`, `La población de un pueblo, en miles, es $${model}$, con $t$ en años.`, `سكان بلدة بالآلاف هم $${model}$، حيث $t$ بالسنوات.`, `The population of a town, in thousands, is $${model}$, with $t$ in years.`),
    sales: (model) => say(`Produktu baten salmentak, milakatan, $${model}$ dira, $t$ hilabetetan.`, `Las ventas de un producto, en miles, son $${model}$, con $t$ en meses.`, `مبيعات منتج بالآلاف هي $${model}$، حيث $t$ بالأشهر.`, `The sales of a product, in thousands, are $${model}$, with $t$ in months.`),
    pieces: (model) => say(`Langile batek egunean egiten dituen piezak $${model}$ dira, $t$ eguneko esperientziarekin.`, `Las piezas que hace un trabajador al día son $${model}$, tras $t$ días de experiencia.`, `عدد القطع التي ينتجها عامل يوميًا هو $${model}$ بعد $t$ يومًا من الخبرة.`, `The pieces a worker makes a day are $${model}$, after $t$ days of experience.`),
    visitors: (model) => say(`Webgune baten bisitak, milakatan, $${model}$ dira, $t$ astetan.`, `Las visitas a una web, en miles, son $${model}$, con $t$ en semanas.`, `زيارات موقع إلكتروني بالآلاف هي $${model}$، حيث $t$ بالأسابيع.`, `The visits to a website, in thousands, are $${model}$, with $t$ in weeks.`)
}

const coefficient = (value: number) => (value === 1 ? '' : String(value))

/** Level 1: (pt + q)/(t + r) levels off at p; c/(t + r) dies away; (pt² + q)/(t + r) grows */
function quotientRound(random: Random): LongRunRound {
    const topic = pick(random, ['population', 'sales', 'pieces', 'visitors'] as Topic[])
    const kind = pick(random, ['number', 'number', 'zero', 'infinity'] as LongRunBin[])
    const p = randomInt(random, 2, 12) * 5
    const q = randomInt(random, 1, 9)
    const r = randomInt(random, 1, 6)
    if (kind === 'number') {
        const model = `\\frac{${p}t+${q}}{t+${r}}`
        return { story: STORIES[topic](model), model, bin: 'number', value: p, reason: `\\frac{${p}t}{t}=${p}` }
    }
    if (kind === 'zero') {
        const model = `\\frac{${p}t}{t^2+${r}}`
        return { story: STORIES[topic](model), model, bin: 'zero', value: null, reason: `\\frac{${p}t}{t^2}=\\frac{${p}}{t}\\to 0` }
    }
    const model = `\\frac{${coefficient(q)}t^2+${p}}{t+${r}}`
    return { story: STORIES[topic](model), model, bin: 'infinity', value: null, reason: `\\frac{${coefficient(q)}t^2}{t}=${coefficient(q)}t\\to+\\infty` }
}

/** Level 2: the average cost C(x)/x */
function costRound(random: Random): LongRunRound {
    const kind = pick(random, ['number', 'number', 'zero', 'infinity'] as LongRunBin[])
    const fixed = randomInt(random, 2, 30) * 100
    const c = randomInt(random, 2, 20)
    const square = pick(random, [0.01, 0.02, 0.05, 0.1])
    const squareTex = String(square).replace('.', '{,}')
    const story = (cost: string) => say(`Kostu osoa $${cost}$ euro da, $x$ unitate eginda. Nora doa batez besteko kostua?`, `El coste total es $${cost}$ euros por $x$ unidades. ¿Adónde va el coste medio?`, `التكلفة الكلية $${cost}$ يورو لإنتاج $x$ وحدة. إلى أين يتجه متوسط التكلفة؟`, `The total cost is $${cost}$ euros for $x$ units. Where does the average cost go?`)
    if (kind === 'number') {
        const cost = `C(x)=${fixed}+${c}x`
        return { story: story(cost), model: `\\frac{${fixed}+${c}x}{x}`, bin: 'number', value: c, reason: `\\frac{${fixed}}{x}+${c}\\to ${c}` }
    }
    if (kind === 'zero') {
        const cost = `C(x)=${fixed}`
        return { story: story(cost), model: `\\frac{${fixed}}{x}`, bin: 'zero', value: null, reason: `\\frac{${fixed}}{x}\\to 0` }
    }
    const cost = `C(x)=${fixed}+${c}x+${squareTex}x^2`
    return { story: story(cost), model: `\\frac{${fixed}+${c}x+${squareTex}x^2}{x}`, bin: 'infinity', value: null, reason: `${squareTex}x\\to+\\infty` }
}

/** Level 3: exponentials and roots mixed in */
function mixedRound(random: Random): LongRunRound {
    const topic = pick(random, ['population', 'sales', 'visitors'] as Topic[])
    const kind = randomInt(random, 0, 5)
    const a = randomInt(random, 2, 12) * 5
    const b = randomInt(random, 2, 9) * 5
    if (kind === 0) {
        const model = `${a}+${b}e^{-t}`
        return { story: STORIES[topic](model), model, bin: 'number', value: a, reason: `e^{-t}\\to 0\\ \\to\\ ${a}` }
    }
    if (kind === 1) {
        const model = `${a}\\cdot 0{,}8^{t}`
        return { story: STORIES[topic](model), model, bin: 'zero', value: null, reason: `0{,}8^{t}\\to 0` }
    }
    if (kind === 2) {
        const model = `${a}\\cdot 1{,}05^{t}`
        return { story: STORIES[topic](model), model, bin: 'infinity', value: null, reason: `1{,}05^{t}\\to+\\infty` }
    }
    if (kind === 3) {
        const model = `\\frac{${a}\\sqrt{t}}{\\sqrt{t}+${randomInt(random, 1, 5)}}`
        return { story: STORIES[topic](model), model, bin: 'number', value: a, reason: `\\frac{${a}\\sqrt{t}}{\\sqrt{t}}=${a}` }
    }
    if (kind === 4) {
        const model = `\\frac{${a}}{\\sqrt{t}+1}`
        return { story: STORIES[topic](model), model, bin: 'zero', value: null, reason: `\\frac{${a}}{+\\infty}=0` }
    }
    const model = `${a}-${b}e^{-t}`
    return { story: STORIES[topic](model), model, bin: 'number', value: a, reason: `e^{-t}\\to 0\\ \\to\\ ${a}` }
}

/** Eight rounds of a level, with every bin at least once and no model twice */
export function createLongRunRounds(random: Random, levelIndex: number): LongRunRound[] {
    const generator = [quotientRound, costRound, mixedRound][levelIndex] ?? quotientRound
    for (let attempt = 0; attempt < 400; attempt += 1) {
        const rounds: LongRunRound[] = []
        for (let tries = 0; rounds.length < LONG_RUN_ROUNDS && tries < 400; tries += 1) {
            const round = generator(random)
            if (!rounds.some((other) => other.model === round.model)) rounds.push(round)
        }
        if (rounds.length === LONG_RUN_ROUNDS && new Set(rounds.map((round) => round.bin)).size === 3) return shuffle(random, rounds)
    }
    throw new Error('No long-run rounds')
}

/** The value of the model at a large t, to check the bin */
export function modelAt(round: LongRunRound, t: number): number {
    const latex = round.model
    const read = (pattern: RegExp) => latex.match(pattern)?.slice(1).map((value) => Number(value.replace('{,}', '.') || 1)) ?? []
    let match: number[]
    if ((match = read(/^\\frac\{(\d+)t\+(\d+)\}\{t\+(\d+)\}$/)).length) return (match[0] * t + match[1]) / (t + match[2])
    if ((match = read(/^\\frac\{(\d+)t\}\{t\^2\+(\d+)\}$/)).length) return (match[0] * t) / (t * t + match[1])
    if ((match = read(/^\\frac\{(\d*)t\^2\+(\d+)\}\{t\+(\d+)\}$/)).length) return (match[0] * t * t + match[1]) / (t + match[2])
    if ((match = read(/^\\frac\{(\d+)\+(\d+)x\}\{x\}$/)).length) return (match[0] + match[1] * t) / t
    if ((match = read(/^\\frac\{(\d+)\}\{x\}$/)).length) return match[0] / t
    if ((match = read(/^\\frac\{(\d+)\+(\d+)x\+([\d{},]+)x\^2\}\{x\}$/)).length) return (match[0] + match[1] * t + match[2] * t * t) / t
    if ((match = read(/^(\d+)\+(\d+)e\^\{-t\}$/)).length) return match[0] + match[1] * Math.exp(-t)
    if ((match = read(/^(\d+)-(\d+)e\^\{-t\}$/)).length) return match[0] - match[1] * Math.exp(-t)
    if ((match = read(/^(\d+)\\cdot 0\{,\}8\^\{t\}$/)).length) return match[0] * 0.8 ** t
    if ((match = read(/^(\d+)\\cdot 1\{,\}05\^\{t\}$/)).length) return match[0] * 1.05 ** t
    if ((match = read(/^\\frac\{(\d+)\\sqrt\{t\}\}\{\\sqrt\{t\}\+(\d+)\}$/)).length) return (match[0] * Math.sqrt(t)) / (Math.sqrt(t) + match[1])
    if ((match = read(/^\\frac\{(\d+)\}\{\\sqrt\{t\}\+1\}$/)).length) return match[0] / (Math.sqrt(t) + 1)
    throw new Error(`Unknown model ${latex}`)
}
