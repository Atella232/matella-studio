import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Dentsitatea da? (¿Es una densidad?): a density made of straight
   pieces — a rectangle f(x) = h on [0, b] or a triangle f(x) = h·x/b.
   Level 1: is it a density? Yes, no because its area is not 1, or no
   because part of it is negative (a straight line that crosses the axis).
   Level 2: the k that makes it a density; the wrong options forget the
   ½ of the triangle or give the base instead of 1 over it. Level 3: the
   probability of a window, an area; the wrong options forget the ½ or
   give the other side. Values exact, in ten-thousandths. Pure.
   ========================================================================== */

export const DENSITY_ROUNDS = 6

export type DensityVerdict = 'yes' | 'area' | 'negative'
export const DENSITY_VERDICTS: DensityVerdict[] = ['yes', 'area', 'negative']

export interface DensityRound {
    shape: 'rectangle' | 'triangle' | 'line'
    base: number
    /** The top height in hundredths (rectangle, triangle); for the line, f(x) = x − c */
    height: number
    /** Level 3: the window [0, to] */
    to: number
    /** Level 1: verdicts; levels 2 and 3: values in ten-thousandths */
    options: Array<DensityVerdict | number>
    answer: number
}

const areaOf = (shape: 'rectangle' | 'triangle', base: number, height: number) => (shape === 'rectangle' ? base * height * 100 : base * height * 50)

function makeRound(random: Random, level: number, verdict: DensityVerdict): DensityRound | null {
    const base = pick(random, [2, 4, 5, 10])
    if (level === 0) {
        if (verdict === 'negative') {
            const crossing = randomInt(random, 1, Math.max(1, base - 1))
            return { shape: 'line', base, height: crossing, to: base, options: DENSITY_VERDICTS, answer: 2 }
        }
        const shape = pick(random, ['rectangle', 'triangle'] as const)
        const good = shape === 'rectangle' ? 100 / base : 200 / base
        const height = verdict === 'yes' ? good : good + pick(random, [-5, 5, 10, good])
        if (height <= 0 || height > 100) return null
        return { shape, base, height, to: base, options: DENSITY_VERDICTS, answer: DENSITY_VERDICTS.indexOf(verdict) }
    }
    const shape = pick(random, ['rectangle', 'triangle'] as const)
    const height = shape === 'rectangle' ? 100 / base : 200 / base
    if (level === 1) {
        // k in ten-thousandths: the height that makes the area 1
        const right = height * 100
        const values = shape === 'rectangle' ? [right, base * 10_000, right / 2] : [right, right / 2, right * 2]
        if (new Set(values).size < 3 || values.some((value) => !Number.isInteger(value))) return null
        const options = shuffle(random, values)
        return { shape, base, height, to: base, options, answer: options.indexOf(right) }
    }
    const to = randomInt(random, 1, base - 1)
    const right = shape === 'rectangle' ? to * height * 100 : (height * to * to * 100) / (2 * base)
    const noHalf = shape === 'rectangle' ? to * height * 50 : (height * to * to * 100) / base
    const values = [right, noHalf, 10_000 - right]
    if (new Set(values).size < 3 || values.some((value) => !Number.isInteger(value) || value <= 0 || value >= 20_000)) return null
    const options = shuffle(random, values)
    return { shape, base, height, to, options, answer: options.indexOf(right) }
}

export function createDensityRounds(random: Random, level: number): DensityRound[] {
    const verdicts = level === 0 ? shuffle(random, [...DENSITY_VERDICTS, ...DENSITY_VERDICTS]) : Array<DensityVerdict>(DENSITY_ROUNDS).fill('yes')
    const rounds: DensityRound[] = []
    for (const verdict of verdicts) {
        for (let attempt = 0; attempt < 500; attempt += 1) {
            const round = makeRound(random, level, verdict)
            if (round && !rounds.some((other) => other.shape === round.shape && other.base === round.base && other.height === round.height && other.to === round.to)) {
                rounds.push(round)
                break
            }
        }
    }
    return rounds
}

export const isRightDensity = (round: DensityRound) => round.shape !== 'line' && areaOf(round.shape, round.base, round.height) === 10_000
