import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Gorputz geometrikoak (2. DBH) memory: the same volume in two units (or in
   litres), the area of a cube, a box, a pyramid or a cylinder and its value,
   and the volume of a prism, a pyramid, a cylinder, a cone or a sphere and
   its value (π ≈ 3,14). Every card has exactly one partner.
   ========================================================================== */

export const SOLIDS_MEMORY_PAIRS = 6

export const solidsMemoryLevels = ['units', 'areas', 'volumes'] as const

interface Pair {
    question: string
    answer: string
    /** The shared value (in hundredths, or in cm³ for units), to tell pairs apart */
    key: number
}

/** A value given in hundredths, in LaTeX with the comma: 6280 → 62{,}8 */
const fromHundredths = (hundredths: number) => {
    const whole = Math.floor(hundredths / 100)
    const rest = hundredths % 100
    if (rest === 0) return `${whole}`
    return `${whole}{,}${String(rest).padStart(2, '0').replace(/0$/, '')}`
}
const decimal = (value: number) => String(value).replace('.', '{,}')

const UNITS = [
    { latex: '\\text{m}^{3}', cm3: 1_000_000 },
    { latex: '\\text{dm}^{3}', cm3: 1000 },
    { latex: '\\text{L}', cm3: 1000 },
    { latex: '\\text{cm}^{3}', cm3: 1 },
    { latex: '\\text{mL}', cm3: 1 }
]

const unitPair = (random: Random): Pair | null => {
    const from = randomInt(random, 0, 1)
    const to = randomInt(random, from + 1, UNITS.length - 1)
    if (UNITS[from].cm3 === UNITS[to].cm3) return null
    const amount = pick(random, [0.5, 1, 1.5, 2, 2.5, 3, 4, 0.25, 0.75, 5, 7, 12])
    const cm3 = amount * UNITS[from].cm3
    const other = cm3 / UNITS[to].cm3
    if (other > 99999) return null
    return { question: `${decimal(amount)}\\ ${UNITS[from].latex}`, answer: `${decimal(other)}\\ ${UNITS[to].latex}`, key: cm3 }
}

const areaPair = (random: Random): Pair | null => {
    switch (randomInt(random, 0, 3)) {
        case 0: {
            const l = randomInt(random, 2, 12)
            return { question: `6\\cdot ${l}^{2}`, answer: `${6 * l * l}`, key: 600 * l * l }
        }
        case 1: {
            const [a, b, c] = [randomInt(random, 2, 9), randomInt(random, 2, 9), randomInt(random, 1, 9)]
            const area = 2 * (a * b + a * c + b * c)
            return { question: `2\\cdot (${a}\\cdot ${b}+${a}\\cdot ${c}+${b}\\cdot ${c})`, answer: `${area}`, key: 100 * area }
        }
        case 2: {
            const [side, apothem] = [randomInt(random, 2, 10), randomInt(random, 3, 15)]
            const area = 2 * side * apothem
            return { question: `4\\cdot \\frac{${side}\\cdot ${apothem}}{2}`, answer: `${area}`, key: 100 * area }
        }
        default: {
            const [r, h] = [randomInt(random, 1, 6), randomInt(random, 1, 10)]
            const hundredths = 2 * 314 * r * h
            return { question: `2\\cdot 3{,}14\\cdot ${r}\\cdot ${h}`, answer: fromHundredths(hundredths), key: hundredths }
        }
    }
}

const volumePair = (random: Random): Pair | null => {
    switch (randomInt(random, 0, 4)) {
        case 0: {
            const [a, b, c] = [randomInt(random, 2, 9), randomInt(random, 2, 9), randomInt(random, 2, 9)]
            return { question: `${a}\\cdot ${b}\\cdot ${c}`, answer: `${a * b * c}`, key: 100 * a * b * c }
        }
        case 1: {
            const [side, h] = [randomInt(random, 2, 10), 3 * randomInt(random, 1, 5)]
            const volume = (side * side * h) / 3
            return { question: `\\frac{${side}^{2}\\cdot ${h}}{3}`, answer: `${volume}`, key: 100 * volume }
        }
        case 2: {
            const [r, h] = [randomInt(random, 1, 5), randomInt(random, 1, 10)]
            const hundredths = 314 * r * r * h
            return { question: `3{,}14\\cdot ${r}^{2}\\cdot ${h}`, answer: fromHundredths(hundredths), key: hundredths }
        }
        case 3: {
            const [r, h] = [randomInt(random, 1, 5), 3 * randomInt(random, 1, 4)]
            const hundredths = (314 * r * r * h) / 3
            return { question: `\\frac{3{,}14\\cdot ${r}^{2}\\cdot ${h}}{3}`, answer: fromHundredths(hundredths), key: hundredths }
        }
        default: {
            const r = pick(random, [3, 6])
            const hundredths = (4 * 314 * r * r * r) / 3
            return { question: `\\frac{4\\cdot 3{,}14\\cdot ${r}^{3}}{3}`, answer: fromHundredths(hundredths), key: hundredths }
        }
    }
}

const makers = { units: unitPair, areas: areaPair, volumes: volumePair }

/** Six pairs with different values, so every card has exactly one partner */
export function createSolidsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = makers[solidsMemoryLevels[levelIndex]]
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < SOLIDS_MEMORY_PAIRS && attempt < 1000; attempt += 1) {
        const pair = make(random)
        if (!pair || pairs.some((other) => other.key === pair.key || other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}=${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}=${pair.answer}` }
    ]))
}
