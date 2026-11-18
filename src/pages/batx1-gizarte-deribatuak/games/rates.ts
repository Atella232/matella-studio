import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../text.ts'

/* ==========================================================================
   J2 · Batez bestekoa ala berehalakoa? (¿Media o instantánea?): a function
   in a context and a question about its rate. Level 1: the average rate
   on an interval; level 2: the instantaneous rate at a moment (a speed, a
   marginal cost); level 3: the moment inside [p, q] where both rates are
   equal, which for a parabola is the midpoint. The wrong cards are the
   typical slips: the change not divided, dividing by q instead of q − p,
   the average taken for the instantaneous and the other way round.
   ========================================================================== */

export const RATES_ROUNDS = 5

export interface RatesRound {
    prompt: LocalizedText
    latex: string
    answer: number
    options: number[]
    working: string
}

const term = (value: number, body: string) => (value === 0 ? '' : `${value < 0 ? '-' : '+'}${Math.abs(value) === 1 && body ? '' : Math.abs(value)}${body}`)
const quadratic = (a: number, b: number, c: number) => `${a === 1 ? '' : a === -1 ? '-' : a}x^2${term(b, 'x')}${term(c, '')}`

function finish(prompt: LocalizedText, latex: string, answer: number, wrong: number[], working: string, random: Random): RatesRound | null {
    const options = [...new Set([answer, ...wrong.filter((value) => Number.isInteger(value))])].slice(0, 4)
    if (options.length < 4) return null
    return { prompt, latex, answer, options: shuffle(random, options), working }
}

function averageRound(random: Random): RatesRound | null {
    const a = pick(random, [-2, -1, 1, 2, 3])
    const b = randomInt(random, -6, 10)
    const c = randomInt(random, 0, 9)
    const p = randomInt(random, 0, 4)
    const q = p + randomInt(random, 2, 4)
    const f = (x: number) => a * x * x + b * x + c
    const change = f(q) - f(p)
    const answer = change / (q - p)
    const latex = `f(x)=${quadratic(a, b, c)}`
    const prompt = say(`Zein da batez besteko aldakuntza-tasa $[${p},${q}]$ tartean?`, `¿Cuál es la tasa de variación media en $[${p},${q}]$?`, `ما معدل التغير المتوسط في $[${p},${q}]$؟`, `What is the average rate of change on $[${p},${q}]$?`)
    return finish(prompt, latex, answer, [change, q === 0 ? NaN : change / q, 2 * a * q + b, answer + 1], `\\frac{f(${q})-f(${p})}{${q}-${p}}=\\frac{${change}}{${q - p}}=${answer}`, random)
}

function instantRound(random: Random): RatesRound | null {
    if (random() < 0.5) {
        // A position s(t) = k·t² + m·t: the speed at t₀
        const k = randomInt(random, 1, 5)
        const m = randomInt(random, 0, 10)
        const t = randomInt(random, 2, 6)
        const answer = 2 * k * t + m
        const prompt = say(`Mugikor batek $s(t)$ metro egiten ditu. Zein da haren abiadura $t=${t}$ unean?`, `Un móvil recorre $s(t)$ metros. ¿Cuál es su velocidad en $t=${t}$?`, `يقطع متحرك $s(t)$ مترًا. ما سرعته عند $t=${t}$؟`, `A moving object covers $s(t)$ metres. What is its speed at $t=${t}$?`)
        return finish(prompt, `s(t)=${k === 1 ? '' : k}t^2${term(m, 't')}`, answer, [k * t + m, k * t * t + m * t, 2 * k * t, answer + k], `s'(t)=${2 * k}t${term(m, '')}\\qquad s'(${t})=${answer}`, random)
    }
    // A cost C(x) = a·x² + b·x + F: the marginal cost at x₀
    const a = randomInt(random, 1, 3)
    const b = randomInt(random, 2, 20)
    const F = pick(random, [50, 100, 200, 300])
    const x = randomInt(random, 2, 10)
    const answer = 2 * a * x + b
    const prompt = say(`Zein da kostu marjinala $x=${x}$ unitate direnean?`, `¿Cuál es el coste marginal con $x=${x}$ unidades?`, `ما التكلفة الحدية عند $x=${x}$ وحدة؟`, `What is the marginal cost at $x=${x}$ units?`)
    const total = a * x * x + b * x + F
    return finish(prompt, `C(x)=${a === 1 ? '' : a}x^2+${b}x+${F}`, answer, [total % x === 0 ? total / x : answer + 2 * a + 1, answer + a, total, answer - 1], `C'(x)=${2 * a}x+${b}\\qquad C'(${x})=${answer}`, random)
}

function meanValueRound(random: Random): RatesRound | null {
    const a = pick(random, [-2, -1, 1, 2])
    const b = randomInt(random, -6, 6)
    const c = randomInt(random, 0, 9)
    const p = randomInt(random, 0, 4)
    const q = p + 2 * randomInt(random, 1, 3)
    const answer = (p + q) / 2
    const prompt = say(`Zein unetan da berehalako tasa $[${p},${q}]$ tarteko batez besteko tasaren berdina?`, `¿En qué instante la tasa instantánea es igual a la tasa media de $[${p},${q}]$?`, `في أي لحظة يساوي المعدل اللحظي معدل التغير المتوسط في $[${p},${q}]$؟`, `At which instant is the instantaneous rate equal to the average rate on $[${p},${q}]$?`)
    const mean = a * (p + q) + b
    return finish(prompt, `f(x)=${quadratic(a, b, c)}`, answer, [p, q, (q - p) / 2, mean], `${2 * a}x${term(b, '')}=${mean}\\ \\to\\ x=${answer}`, random)
}

const levelMakers = [averageRound, instantRound, meanValueRound]

/** Five different rounds of one level */
export function createRatesRounds(random: Random, level: number): RatesRound[] {
    const make = levelMakers[level] ?? averageRound
    const rounds: RatesRound[] = []
    for (let attempt = 0; rounds.length < RATES_ROUNDS && attempt < 5000; attempt += 1) {
        const round = make(random)
        if (!round || rounds.some((other) => other.latex === round.latex && other.prompt.es === round.prompt.es)) continue
        rounds.push(round)
    }
    return rounds
}
