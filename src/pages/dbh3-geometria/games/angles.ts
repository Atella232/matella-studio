import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Angeluen ehiza (La caza de ángulos): a figure with one angle
   missing. Level 1: a triangle (180°) or a quadrilateral (360°) with the
   other angles written in; level 2: a regular polygon, its interior or
   exterior angle; level 3: a circle, an inscribed angle from the central
   one or the other way round, on the far or the near arc. The wrong
   options are the typical mistakes (360° for a triangle, 360° : n for the
   interior angle, double instead of half).
   ========================================================================== */

export const ANGLE_ROUNDS = 8

export type AngleFigure =
    | { type: 'triangle'; known: number[] }
    | { type: 'quad'; known: number[] }
    | { type: 'regular'; sides: number; ask: 'interior' | 'exterior' }
    | { type: 'circle'; central: number; near: boolean; ask: 'inscribed' | 'central'; inscribed: number }

export interface AngleRound {
    figure: AngleFigure
    answer: number
    options: number[]
}

/** The size of the missing angle, worked out from the figure */
export function angleAnswer(figure: AngleFigure): number {
    if (figure.type === 'triangle') return 180 - figure.known.reduce((sum, angle) => sum + angle, 0)
    if (figure.type === 'quad') return 360 - figure.known.reduce((sum, angle) => sum + angle, 0)
    if (figure.type === 'regular') return figure.ask === 'exterior' ? 360 / figure.sides : 180 - 360 / figure.sides
    return figure.ask === 'inscribed' ? figure.inscribed : figure.central
}

function triangle(random: Random): AngleRound {
    const a = randomInt(random, 4, 14) * 5
    const b = randomInt(random, 4, 14) * 5
    const figure: AngleFigure = random() < 0.5 ? { type: 'triangle', known: [a, b] } : { type: 'quad', known: [a + 30, b + 40, randomInt(random, 12, 20) * 5] }
    const answer = angleAnswer(figure)
    const sum = figure.known.reduce((total, angle) => total + angle, 0)
    return { figure, answer, options: [answer, figure.type === 'triangle' ? 360 - sum : 180 - sum + 360, figure.type === 'triangle' ? 180 - a : 360 - sum + 20, answer + 10] }
}

function regular(random: Random): AngleRound {
    const sides = pick(random, [5, 6, 8, 9, 10, 12, 15, 18])
    const ask = random() < 0.6 ? 'interior' : 'exterior'
    const figure: AngleFigure = { type: 'regular', sides, ask }
    const answer = angleAnswer(figure)
    const other = ask === 'interior' ? 360 / sides : 180 - 360 / sides
    return { figure, answer, options: [answer, other, ((sides - 2) * 180) / sides + 10, 180 / sides] }
}

function circle(random: Random): AngleRound {
    const central = randomInt(random, 4, 16) * 10
    const near = random() < 0.3
    const inscribed = near ? 180 - central / 2 : central / 2
    const ask = !near && random() < 0.4 ? 'central' : 'inscribed'
    const figure: AngleFigure = { type: 'circle', central, near, ask, inscribed }
    const answer = angleAnswer(figure)
    const options = ask === 'central' ? [central, inscribed / 2, 180 - inscribed, central + 20] : [inscribed, 2 * central, near ? central / 2 : 180 - central / 2, central]
    return { figure, answer, options }
}

const makers = [triangle, regular, circle]

export function createAngleRounds(random: Random, level: number): AngleRound[] {
    const make = makers[level] ?? makers[0]
    const rounds: AngleRound[] = []
    while (rounds.length < ANGLE_ROUNDS) {
        const next = make(random)
        const options = [...new Set(next.options.filter((option) => option > 0 && option < 360 && Number.isInteger(option)))]
        if (next.answer <= 0 || !options.includes(next.answer) || options.length < 4) continue
        if (rounds.some((other) => JSON.stringify(other.figure) === JSON.stringify(next.figure))) continue
        rounds.push({ ...next, options: shuffle(random, options.slice(0, 4)) })
    }
    return rounds
}

export function angleStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
