import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { continuousLatex, explicitLatex, generalLatex, lineThrough, parametricLatex, pointSlopeLatex, sameLine, vectorLatex, type Line, type Point } from './lines.ts'

/* ==========================================================================
   J1 · Zuzen bikiak (Rectas gemelas): a line written in one form and four
   lines written in another; only one is the same line. The other three
   are the typical mistakes of this unit: a parallel (right direction,
   another point), the perpendicular (the normal vector taken as the
   direction), the point with its signs changed (x + a for x − a) and the
   slope upside down. Level 1 goes between the general and the explicit
   form; level 2 from the vector, parametric and continuous forms to the
   general one and back; level 3 mixes all six forms.
   ========================================================================== */

export const TWINS_ROUNDS = 6

export type LineForm = 'general' | 'explicit' | 'point-slope' | 'vector' | 'parametric' | 'continuous'
export type TwinError = 'parallel' | 'normal-direction' | 'point-sign' | 'slope-inverted'

export interface TwinChoice {
    latex: string
    line: Line
    /** The point and direction the option was written with */
    point: Point
    direction: Point
    error: TwinError | null
}

export interface TwinRound {
    given: LineForm
    target: LineForm
    givenLatex: string
    givenPoint: Point
    givenDirection: Point
    line: Line
    choices: TwinChoice[]
}

/** Which form is given and which one is asked, per level */
const LEVEL_PAIRS: Array<Array<[LineForm, LineForm]>> = [
    [['general', 'explicit'], ['explicit', 'general']],
    [['vector', 'general'], ['parametric', 'general'], ['continuous', 'general'], ['general', 'vector'], ['general', 'continuous'], ['general', 'parametric']],
    [['explicit', 'vector'], ['point-slope', 'general'], ['continuous', 'explicit'], ['parametric', 'point-slope'], ['vector', 'continuous'], ['point-slope', 'parametric'], ['general', 'point-slope'], ['explicit', 'continuous']]
]

export const twinLevels = LEVEL_PAIRS

/** The line written in a form, from one of its points and a direction */
export function formLatex(form: LineForm, line: Line, point: Point, direction: Point): string {
    switch (form) {
        case 'general':
            return generalLatex(line)
        case 'explicit':
            return explicitLatex(line)
        case 'point-slope':
            return pointSlopeLatex(point, direction)
        case 'vector':
            return vectorLatex(point, direction)
        case 'parametric':
            return parametricLatex(point, direction)
        case 'continuous':
            return continuousLatex(point, direction)
    }
}

const DIRECTIONS: Point[] = [[1, 1], [1, -1], [1, 2], [1, -2], [2, 1], [2, -1], [1, 3], [1, -3], [3, 1], [3, -1], [2, 3], [2, -3], [3, 2], [3, -2]]

/** Another point of the same line and another direction vector, so the option does not copy the given numbers */
function rewrite(point: Point, direction: Point, random: Random): { point: Point; direction: Point } {
    const step = pick(random, [-1, 1])
    const flip = pick(random, [1, -1])
    return { point: [point[0] + step * direction[0], point[1] + step * direction[1]], direction: [flip * direction[0], flip * direction[1]] }
}

function make(random: Random, given: LineForm, target: LineForm): TwinRound | null {
    const point: Point = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
    const direction = pick(random, DIRECTIONS)
    const line = lineThrough(point, direction)
    // The sign mistake only shows when the line misses the origin
    if (line.C === 0 || (point[0] === 0 && point[1] === 0)) return null
    const [a, b] = direction
    const k = pick(random, [-2, -1, 1, 2])
    const wrong: Array<{ point: Point; direction: Point; error: TwinError }> = [
        { point: [point[0], point[1] + k], direction, error: 'parallel' },
        { point, direction: [line.A, line.B], error: 'normal-direction' },
        { point: [-point[0], -point[1]], direction, error: 'point-sign' },
        { point, direction: [b, a], error: 'slope-inverted' },
        { point: [point[0], point[1] - k], direction, error: 'parallel' }
    ]
    const choices: TwinChoice[] = []
    const add = (source: { point: Point; direction: Point }, error: TwinError | null) => {
        const option = lineThrough(source.point, source.direction)
        if (source.direction[0] === 0 || source.direction[1] === 0) return
        if (choices.some((other) => sameLine(other.line, option))) return
        if (error !== null && sameLine(option, line)) return
        const written = rewrite(source.point, source.direction, random)
        choices.push({ latex: formLatex(target, option, written.point, written.direction), line: option, point: written.point, direction: written.direction, error })
    }
    add({ point, direction }, null)
    for (const item of shuffle(random, wrong)) if (choices.length < 4) add(item, item.error)
    if (choices.length < 4 || new Set(choices.map((choice) => choice.latex)).size < 4) return null
    const givenLatex = formLatex(given, line, point, direction)
    // The right option must not be a copy of the given line
    if (choices[0].latex === givenLatex) return null
    return { given, target, givenLatex, givenPoint: point, givenDirection: direction, line, choices: shuffle(random, choices) }
}

/** Six rounds of one level, no line twice */
export function createTwinRounds(random: Random, level: number): TwinRound[] {
    const pairs = LEVEL_PAIRS[level] ?? LEVEL_PAIRS[0]
    const rounds: TwinRound[] = []
    for (let attempt = 0; rounds.length < TWINS_ROUNDS && attempt < 2000; attempt += 1) {
        const [given, target] = pick(random, pairs)
        const round = make(random, given, target)
        if (round && !rounds.some((other) => sameLine(other.line, round.line))) rounds.push(round)
    }
    return rounds
}

export const rightChoice = (round: TwinRound) => round.choices.find((choice) => choice.error === null)!
