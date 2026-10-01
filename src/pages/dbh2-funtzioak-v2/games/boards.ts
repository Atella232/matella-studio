import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import { fraction, toLatex } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { lineLatex, pointLatex, type Point } from '../functions.ts'
import type { PlaneBox } from '../planeMap.ts'

/* ==========================================================================
   Funtzioak (2. DBH) games besides the race:
   - Kokatu puntua: eight points to place on the plane, two tries each. The
     last level gives a function and an x: the student calculates y first.
   - Memoria: a function and its result, two points and their slope, a line
     and where it cuts the X axis.
   ========================================================================== */

/* ---------- Placing points ---------- */

export const PLOT_ROUNDS = 8
export const PLOT_TRIES = 2

export interface PlotLevel {
    box: PlaneBox
}

export const plotLevels: PlotLevel[] = [
    { box: { xMin: 0, xMax: 9, yMin: 0, yMax: 9 } },
    { box: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 } },
    { box: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 } }
]

export interface PlotTarget {
    point: Point
    prompt: LocalizedText
    /** Worked result shown after the answer */
    worked: string
}

const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))

export function createPlotRound(random: Random, levelIndex: number): PlotTarget[] {
    const targets: PlotTarget[] = []
    const seen = new Set<string>()
    for (let attempt = 0; targets.length < PLOT_ROUNDS && attempt < 500; attempt += 1) {
        let point: Point
        let target: PlotTarget
        if (levelIndex === 0) {
            point = [randomInt(random, 1, 9), randomInt(random, 1, 9)]
            target = { point, prompt: say(`Kokatu $A${pointLatex(point)}$ puntua.`, `Sitúa el punto $A${pointLatex(point)}$.`, `ضع النقطة $A${pointLatex(point)}$.`), worked: `A${pointLatex(point)}` }
        } else if (levelIndex === 1) {
            const onAxis = random() < 0.2
            point = onAxis
                ? (random() < 0.5 ? [randomInt(random, -6, 6) || 3, 0] : [0, randomInt(random, -6, 6) || -2])
                : [randomInt(random, 1, 6) * (random() < 0.5 ? -1 : 1), randomInt(random, 1, 6) * (random() < 0.5 ? -1 : 1)]
            target = { point, prompt: say(`Kokatu $A${pointLatex(point)}$ puntua.`, `Sitúa el punto $A${pointLatex(point)}$.`, `ضع النقطة $A${pointLatex(point)}$.`), worked: `A${pointLatex(point)}` }
        } else {
            const m = pick(random, [-3, -2, -1, 1, 2, 3])
            const n = randomInt(random, -3, 3)
            const x = randomInt(random, -3, 3)
            const y = m * x + n
            if (Math.abs(y) > 6) continue
            point = [x, y]
            target = {
                point,
                prompt: say(`Kokatu $${lineLatex(m, n)}$ funtzioaren puntua $x=${x}$ denean.`, `Sitúa el punto de $${lineLatex(m, n)}$ cuando $x=${x}$.`, `ضع نقطة $${lineLatex(m, n)}$ عندما $x=${x}$.`),
                worked: `y=${m}\\cdot ${bracket(x)}${n < 0 ? '' : '+'}${n}=${y}\\ \\to\\ ${pointLatex(point)}`
            }
        }
        const key = point.join(',')
        if (seen.has(key)) continue
        seen.add(key)
        targets.push(target)
    }
    return targets
}

function say(eu: string, es: string, ar: string): LocalizedText {
    return { eu, es, ar }
}

/** Points for one target: 2 at the first try, 1 at the second, 0 otherwise */
export function plotPoints(failedTries: number): number {
    return failedTries === 0 ? 2 : failedTries === 1 ? 1 : 0
}

export function plotStars(total: number): Stars {
    if (total >= 14) return 3
    if (total >= 10) return 2
    return 1
}

export const samePoint = (left: Point, right: Point) => left[0] === right[0] && left[1] === right[1]

/* ---------- Memory ---------- */

export const FUNCTIONS_MEMORY_PAIRS = 6

export const functionsMemoryLevels = ['values', 'slopes', 'cuts'] as const

function valuePair(random: Random): [PairCard['latex'], string, string] {
    const m = pick(random, [-4, -3, -2, 2, 3, 4, 5])
    const n = pick(random, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
    const x = randomInt(random, -4, 5) || 4
    const y = m * x + n
    return [`${lineLatex(m, n)},\\ x=${x}`, `y=${y}`, `${m}\\cdot ${bracket(x)}${n < 0 ? '' : '+'}${n}=${y}`]
}

function slopePair(random: Random): [string, string, string] {
    const p = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4, 5])
    const q = random() < 0.35 ? pick(random, [2, 3]) : 1
    if (q > 1 && Math.abs(p) % q === 0) return slopePair(random)
    const dx = q * randomInt(random, 1, 2)
    const dy = (p * dx) / q
    const a: Point = [randomInt(random, -4, 2), randomInt(random, -4, 4)]
    const b: Point = [a[0] + dx, a[1] + dy]
    const m = toLatex(fraction(dy, dx))
    return [`A${pointLatex(a)},\\ B${pointLatex(b)}`, `m=${m}`, `m=\\frac{${b[1]}-${bracket(a[1])}}{${b[0]}-${bracket(a[0])}}=${m}`]
}

function cutPair(random: Random): [string, string, string] {
    const m = pick(random, [-3, -2, -1, 1, 2, 3, 4])
    const x0 = randomInt(random, -5, 6) || 2
    const n = -m * x0
    return [lineLatex(m, n), `(${x0},\\,0)`, `0=${m}x${n < 0 ? '' : '+'}${n}\\ \\to\\ x=${x0}`]
}

const makers = { values: valuePair, slopes: slopePair, cuts: cutPair }

/** Six pairs with different answers (and different questions), so every card has exactly one partner */
export function createFunctionsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = makers[functionsMemoryLevels[levelIndex]]
    const pairs: Array<[string, string, string]> = []
    for (let attempt = 0; pairs.length < FUNCTIONS_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some(([question, answer]) => answer === pair[1] || question === pair[0])) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap(([question, answer, explain], setId) => [
        { id: `${setId}-q`, setId, latex: question, shows: answer, explain },
        { id: `${setId}-a`, setId, latex: answer, shows: answer, explain }
    ]))
}
