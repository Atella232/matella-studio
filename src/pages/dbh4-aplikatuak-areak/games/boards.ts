import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { createFiguresMemoryBoard } from '../../dbh1-figurak-v2/games/boards.ts'
import { createSolidsMemoryBoard } from '../../dbh2-gorputzak-v2/games/boards.ts'

/* ==========================================================================
   Perimetroak, azalerak eta bolumenak (4. DBH aplikatuak) memory: the
   angle sum of a polygon (the 1. DBH board), the area of a triangle,
   rhombus, trapezoid or circle and its value, and the volume of a solid
   (the 2. DBH board). π ≈ 3,14. Every card has exactly one partner.
   ========================================================================== */

export const AREAS_VOLUMES_MEMORY_PAIRS = 6

export const areasVolumesMemoryLevels = ['angle-sum', 'areas', 'volumes'] as const

interface Pair {
    question: string
    answer: string
    /** The value in hundredths, to tell pairs apart */
    key: number
}

/** A value in hundredths in LaTeX with the comma: 2826 → 28{,}26 */
const fromHundredths = (hundredths: number) => {
    const whole = Math.floor(hundredths / 100)
    const rest = hundredths % 100
    if (rest === 0) return `${whole}`
    return `${whole}{,}${String(rest).padStart(2, '0').replace(/0$/, '')}`
}

function areaPair(random: Random): Pair {
    const shape = pick(random, ['triangle', 'rhombus', 'trapezoid', 'circle'] as const)
    if (shape === 'circle') {
        const r = randomInt(random, 1, 10)
        return { question: `3{,}14\\cdot ${r}^{2}`, answer: fromHundredths(314 * r * r), key: 314 * r * r }
    }
    if (shape === 'trapezoid') {
        const B = randomInt(random, 4, 12)
        const b = randomInt(random, 2, B - 1)
        const h = randomInt(random, 2, 8)
        return { question: `\\frac{(${B}+${b})\\cdot ${h}}{2}`, answer: fromHundredths(50 * (B + b) * h), key: 50 * (B + b) * h }
    }
    const x = randomInt(random, 3, 14)
    const y = randomInt(random, 2, 10)
    return { question: `\\frac{${x}\\cdot ${y}}{2}`, answer: fromHundredths(50 * x * y), key: 50 * x * y }
}

/** Six pairs with different values; the first and last levels are the 1. and 2. DBH boards */
export function createAreasVolumesMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = areasVolumesMemoryLevels[levelIndex] ?? 'angle-sum'
    if (level === 'angle-sum') return createFiguresMemoryBoard(random, 0)
    if (level === 'volumes') return createSolidsMemoryBoard(random, 2)
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < AREAS_VOLUMES_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = areaPair(random)
        if (pairs.some((other) => other.key === pair.key || other.question === pair.question)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question}=${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question}=${pair.answer}` }
    ]))
}
