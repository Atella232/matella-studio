import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { criticalZ, decimalLatex } from '../../batx2-gizarte-banaketak/critical.ts'

/* ==========================================================================
   I-J2 · Tartetik datuetara (Del intervalo a los datos): a confidence
   interval for μ and some of its data; the learner finds the missing one.
   Level 1: the sample mean or the error. Level 2: the sample size n
   (given σ and the level). Level 3: the confidence level (given σ and n).
   Three options: the right one and two typical slips (the whole width
   for E, an end for x̄, √n for n, a neighbouring level). Pure logic.
   ========================================================================== */

export const BACKWARDS_ROUNDS = 6

export interface BackwardsRound {
    prompt: LocalizedText
    options: string[]
    answer: string
    work: string
}

const d = decimalLatex
const LEVELS = [80, 90, 94, 95, 96, 98, 99] as const

function interval(random: Random) {
    const level = pick(random, LEVELS)
    const z = criticalZ(level)
    const root = pick(random, [3, 4, 5, 6, 8, 10])
    const sd = root * pick(random, [1, 2, 3, 4])
    const mean = 10 * randomInt(random, 3, 25)
    const error = (z * sd) / root
    return { level, z, root, n: root * root, sd, mean, error, low: mean - error, high: mean + error }
}

const intervalText = (low: number, high: number) => `(${d(low)};\\ ${d(high)})`

function firstRound(random: Random): BackwardsRound | null {
    const data = interval(random)
    const asksMean = random() < 0.5
    const shown = intervalText(data.low, data.high)
    if (asksMean) {
        const options = [d(data.mean), d(data.low), d(2 * data.error)]
        if (new Set(options).size < 3) return null
        return {
            prompt: say(`$\\mu$ zenbakiaren tartea $${shown}$ da. Zenbat da $\\bar{x}$?`, `El intervalo para $\\mu$ es $${shown}$. ¿Cuánto vale $\\bar{x}$?`, `فترة $\\mu$ هي $${shown}$. كم يساوي $\\bar{x}$؟`, `The interval for $\\mu$ is $${shown}$. What is $\\bar{x}$?`),
            options: shuffle(random, options),
            answer: options[0],
            work: `\\bar{x}=\\frac{${d(data.low)}+${d(data.high)}}{2}=${d(data.mean)}`
        }
    }
    const options = [d(data.error), d(2 * data.error), d(data.mean)]
    if (new Set(options).size < 3) return null
    return {
        prompt: say(`$\\mu$ zenbakiaren tartea $${shown}$ da. Zenbat da errorea, $E$?`, `El intervalo para $\\mu$ es $${shown}$. ¿Cuánto vale el error $E$?`, `فترة $\\mu$ هي $${shown}$. كم يساوي الخطأ $E$؟`, `The interval for $\\mu$ is $${shown}$. What is the error $E$?`),
        options: shuffle(random, options),
        answer: options[0],
        work: `E=\\frac{${d(data.high)}-${d(data.low)}}{2}=${d(data.error)}`
    }
}

function sizeRound(random: Random): BackwardsRound | null {
    const data = interval(random)
    const shown = intervalText(data.low, data.high)
    const options = [String(data.n), String(data.root), String(data.n * 2)]
    if (new Set(options).size < 3) return null
    return {
        prompt: say(`% ${data.level} mailako tartea $${shown}$ da, eta $\\sigma=${data.sd}$. Zenbat da $n$?`, `El intervalo al ${data.level} % es $${shown}$ y $\\sigma=${data.sd}$. ¿Cuánto vale $n$?`, `فترة ${data.level} % هي $${shown}$ و$\\sigma=${data.sd}$. كم يساوي $n$؟`, `The ${data.level}% interval is $${shown}$ and $\\sigma=${data.sd}$. What is $n$?`),
        options: shuffle(random, options),
        answer: options[0],
        work: `\\sqrt{n}=\\frac{${d(data.z)}\\cdot ${data.sd}}{${d(data.error)}}=${data.root}\\ \\to\\ n=${data.n}`
    }
}

function levelRound(random: Random): BackwardsRound | null {
    const data = interval(random)
    const shown = intervalText(data.low, data.high)
    const index = LEVELS.indexOf(data.level)
    const neighbours = [LEVELS[index - 1], LEVELS[index + 1]].filter((value) => value !== undefined)
    const others = shuffle(random, [...neighbours, ...LEVELS.filter((value) => value !== data.level && !neighbours.includes(value))]).slice(0, 2)
    const pct = (value: number) => `${value}\\,\\%`
    const options = [pct(data.level), ...others.map(pct)]
    return {
        prompt: say(`Tartea $${shown}$ da, $\\sigma=${data.sd}$ eta $n=${data.n}$ izanik. Zein da konfiantza-maila?`, `El intervalo es $${shown}$, con $\\sigma=${data.sd}$ y $n=${data.n}$. ¿Cuál es el nivel de confianza?`, `الفترة $${shown}$ مع $\\sigma=${data.sd}$ و$n=${data.n}$. ما مستوى الثقة؟`, `The interval is $${shown}$, with $\\sigma=${data.sd}$ and $n=${data.n}$. What is the confidence level?`),
        options: shuffle(random, options),
        answer: options[0],
        work: `{z}_{\\alpha/2}=\\frac{${d(data.error)}\\cdot ${data.root}}{${data.sd}}=${d(data.z)}\\ \\to\\ ${data.level}\\,\\%`
    }
}

/** Six rounds of one level, with no two the same */
export function createBackwardsRounds(random: Random, level: number): BackwardsRound[] {
    const make = [firstRound, sizeRound, levelRound][level] ?? firstRound
    const rounds: BackwardsRound[] = []
    for (let attempt = 0; rounds.length < BACKWARDS_ROUNDS && attempt < 3000; attempt += 1) {
        const round = make(random)
        if (round && !rounds.some((other) => other.prompt.es === round.prompt.es)) rounds.push(round)
    }
    return rounds
}
