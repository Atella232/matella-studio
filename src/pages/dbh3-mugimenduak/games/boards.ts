import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { reflect, rotate, translate } from '../motion.ts'

/* ==========================================================================
   Planoko mugimenduak (3. DBH) memory: a point with a translation, a
   rotation or a reflection, and its image. Every card has exactly one
   partner, and the text stays short enough for a card on a phone (two
   lines with gathered).
   ========================================================================== */

export const MOTIONS3_MEMORY_PAIRS = 6

interface MemoryPair {
    question: string
    answer: string
}

const pair = (x: number, y: number) => `(${x},${y})`

function translationPair(random: Random): MemoryPair {
    const x = randomInt(random, -4, 4)
    const y = randomInt(random, -4, 4)
    const a = randomInt(random, -4, 4)
    const b = randomInt(random, -4, 4)
    const [ix, iy] = translate([x, y], [a, b])
    return { question: `\\begin{gathered}${pair(x, y)}\\\\ +${pair(a, b)}\\end{gathered}`, answer: pair(ix, iy) }
}

function rotationPair(random: Random): MemoryPair {
    const x = randomInt(random, -4, 4)
    const y = randomInt(random, -4, 4)
    const angle = pick(random, [90, 180, 270])
    const [ix, iy] = rotate([x, y], angle)
    return { question: `\\begin{gathered}${pair(x, y)}\\\\ ${angle}°\\end{gathered}`, answer: pair(ix, iy) }
}

function reflectionPair(random: Random): MemoryPair {
    const x = randomInt(random, -4, 4)
    const y = randomInt(random, -4, 4)
    const axis = pick(random, [{ name: 'X', axis: { kind: 'horizontal' as const, at: 0 } }, { name: 'Y', axis: { kind: 'vertical' as const, at: 0 } }, { name: 'y=x', axis: { kind: 'diagonal' as const } }])
    const [ix, iy] = reflect([x, y], axis.axis)
    return { question: `\\begin{gathered}${pair(x, y)}\\\\ ${axis.name}\\end{gathered}`, answer: pair(ix, iy) }
}

const generators = [translationPair, rotationPair, reflectionPair]

/** Six pairs with different answers, so every card has exactly one partner */
export function createMotions3MemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = generators[levelIndex] ?? generators[0]
    const pairs: MemoryPair[] = []
    for (let attempt = 0; pairs.length < MOTIONS3_MEMORY_PAIRS && attempt < 3000; attempt += 1) {
        const next = make(random)
        if (pairs.some((other) => other.answer === next.answer || other.question === next.question)) continue
        pairs.push(next)
    }
    return shuffle(random, pairs.flatMap((item, setId) => [
        { id: `${setId}-q`, setId, latex: item.question, shows: item.answer, explain: `${item.question}\\ \\to\\ ${item.answer}` },
        { id: `${setId}-a`, setId, latex: item.answer, shows: item.answer, explain: `${item.question}\\ \\to\\ ${item.answer}` }
    ]))
}
