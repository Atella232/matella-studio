import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   Aplikazioen memoria (Batxilergoa 2 · Gizarte Zientziak): a function and
   the point that matters. Level 1, a parabola and the x of its vertex;
   level 2, a cubic and the x of its point of inflection; level 3, a
   profit or an average cost and its best production.
   ========================================================================== */

export const BACH2G_APPLICATIONS_MEMORY_PAIRS = 6

export const bach2gApplicationsMemoryLevels = ['vertex', 'inflection', 'best'] as const

interface Pair {
    question: string
    answer: string
    explain: string
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

function vertexPair(random: Random): Pair | null {
    const a = randomInt(random, -6, 6)
    const c = randomInt(random, -9, 9)
    if (a === 0) return null
    const up = randomInt(random, 0, 1) === 0
    const question = `${up ? '' : '-'}x^2${signed(up ? -2 * a : 2 * a)}x${c === 0 ? '' : signed(c)}`
    return { question, answer: `x=${a}`, explain: `f'(x)=${up ? '' : '-'}2x${signed(up ? -2 * a : 2 * a)}=0\\ \\to\\ x=${a}` }
}

function inflectionPair(random: Random): Pair | null {
    const p = randomInt(random, -6, 6)
    const c = randomInt(random, 1, 9)
    if (p === 0) return null
    return { question: `x^3${signed(-3 * p)}x^2+${c}x`, answer: `x=${p}`, explain: `f''(x)=6x${signed(-6 * p)}=0\\ \\to\\ x=${p}` }
}

function bestPair(random: Random): Pair | null {
    if (randomInt(random, 0, 1) === 0) {
        const a = randomInt(random, 2, 12) * 5
        const c = randomInt(random, 1, 9) * 100
        return { question: `B(x)=-x^2+${2 * a}x-${c}`, answer: `x=${a}`, explain: `B'(x)=-2x+${2 * a}=0\\ \\to\\ x=${a}` }
    }
    const r = pick(random, [5, 10, 15, 20, 25, 30, 40])
    const b = randomInt(random, 2, 20)
    return { question: `C(x)=x^2+${b}x+${r * r}`, answer: `x=${r}`, explain: `M'(x)=1-\\frac{${r * r}}{x^2}=0\\ \\to\\ x=${r}` }
}

/** Six pairs of one level, every question and every answer different */
export function createBach2gApplicationsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = bach2gApplicationsMemoryLevels[levelIndex] ?? 'vertex'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < BACH2G_APPLICATIONS_MEMORY_PAIRS && attempt < 4000; attempt += 1) {
        const pair = level === 'vertex' ? vertexPair(random) : level === 'inflection' ? inflectionPair(random) : bestPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: pair.explain },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: pair.explain }
    ]))
}
