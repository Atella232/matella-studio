import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { scale, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { levelLatex } from '../../batx2-zientziak-planoak/lab/common.ts'
import { fracLatex, small, tidy, vec } from './common.ts'

/* ==========================================================================
   Angeluak eta distantziak (Batxilergoa 2 · Zientziak) memory: a point
   and a plane a·z = c with their distance, two parallel planes z = c
   and k·z = c′ with their distance, and a point and a plane x = k,
   y = k or z = k with the symmetric point. Every card has exactly one
   partner, and the text stays short enough for a card (two small rows,
   planes along an axis, at most one minus sign in a point).
   ========================================================================== */

export const DISTANCES_MEMORY_PAIRS = 6

export const distancesMemoryLevels = ['point-plane', 'parallel', 'symmetric'] as const

interface Pair {
    question: string
    answer: string
}

const minusCount = (latex: string) => (latex.match(/-/g) ?? []).length
const card = (first: string, second: string) => `\\footnotesize\\begin{gathered}${first}\\\\ ${second}\\end{gathered}`

/** The value of a distance |top| / size, written d = … */
const distanceLatex = (top: number, size: number) => `d=${fracLatex(Math.abs(top), size)}`
const AXES: Vec3[] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
/** The short plane a·x = c (or y, z): the only planes that fit on a card */
const axisPlane = (axis: number, a: number, c: number) => levelLatex(scale(a, AXES[axis]), c)

function pointPlanePair(random: Random): Pair | null {
    const axis = randomInt(random, 0, 2)
    const a = pick(random, [1, 2, 3])
    const c = randomInt(random, -4, 4)
    const p = small(random, 2)
    const top = a * p[axis] - c
    if (minusCount(vec(p)) > 1 || top === 0) return null
    return { question: card(`P${vec(p)}`, axisPlane(axis, a, c)), answer: distanceLatex(top, a) }
}

function parallelPair(random: Random): Pair | null {
    const axis = randomInt(random, 0, 2)
    const factor = pick(random, [2, 3])
    const D1 = randomInt(random, -3, 3)
    const D2 = randomInt(random, -8, 8)
    // x = D1 and factor·x = D2: the distance |D2 − factor·D1| / factor
    const top = D2 - factor * D1
    if (top === 0) return null
    return { question: card(axisPlane(axis, 1, D1), axisPlane(axis, factor, D2)), answer: distanceLatex(top, factor) }
}

function symmetricPair(random: Random): Pair | null {
    const axis = randomInt(random, 0, 2)
    const p = small(random, 3)
    const k = randomInt(random, -2, 2)
    const image: [number, number, number] = [p[0], p[1], p[2]]
    image[axis] = 2 * k - p[axis]
    if (image[axis] === p[axis] || minusCount(vec(p)) > 1 || minusCount(vec(tidy(image))) > 1) return null
    return { question: card(`P${vec(p)}`, axisPlane(axis, 1, k)), answer: vec(tidy(image)) }
}

/** Six pairs with different answers, so every card has exactly one partner */
export function createDistancesMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const level = distancesMemoryLevels[levelIndex] ?? 'point-plane'
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < DISTANCES_MEMORY_PAIRS && attempt < 5000; attempt += 1) {
        const pair = level === 'point-plane' ? pointPlanePair(random) : level === 'parallel' ? parallelPair(random) : symmetricPair(random)
        if (!pair || pairs.some((other) => other.question === pair.question || other.answer === pair.answer)) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap((pair, setId) => [
        { id: `${setId}-q`, setId, latex: pair.question, shows: pair.answer, explain: `${pair.question.replace('\\footnotesize', '')}\\ \\Rightarrow\\ ${pair.answer}` },
        { id: `${setId}-a`, setId, latex: pair.answer, shows: pair.answer, explain: `${pair.question.replace('\\footnotesize', '')}\\ \\Rightarrow\\ ${pair.answer}` }
    ]))
}
