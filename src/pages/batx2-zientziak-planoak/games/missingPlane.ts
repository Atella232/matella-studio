import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { cross, dot, isZero, primitive, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { levelLatex } from '../lab/common.ts'

/* ==========================================================================
   J3 · Falta den planoa (El plano que falta): the equation
   a·x + b·y + c·z = d of a plane with one number hidden behind a box,
   and the conditions that fix the plane. Level 1: through a point,
   parallel to a plane or perpendicular to a line (the d is missing).
   Level 2: through three points (a coefficient of the normal or the d).
   Level 3: through a point and holding a line (a coefficient or the d).
   Four numbers to choose from: the right one and the typical mistakes
   (the sign of d, the d of the other plane, the point of the line
   instead of the given one, the minus of the j forgotten). After
   answering, the plane is drawn on the 3D board with the data.
   ========================================================================== */

export const MISSING_ROUNDS = 6

export type MissingVariant = 'parallel' | 'perpendicular' | 'three-points' | 'point-line'
/** The hidden number: a coefficient (0, 1, 2) or the d (3) */
export type MissingPlace = 0 | 1 | 2 | 3

export interface MissingRound {
    variant: MissingVariant
    prompt: LocalizedText
    normal: Vec3
    level: number
    place: MissingPlace
    answer: number
    options: number[]
    /** The data, for the board */
    points: Array<{ at: Vec3; label: string }>
    line?: { point: Vec3; direction: Vec3 }
    plane?: { normal: Vec3; level: number }
    working: string
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`
const small = (random: Random, limit: number): Vec3 => [randomInt(random, -limit, limit), randomInt(random, -limit, limit), randomInt(random, -limit, limit)]
const NAMES = ['x', 'y', '{z}']

/** a·x + b·y + c·z = d with one number as a box (the other numbers written well: no 1x, no 0y) */
export function boxedLatex(normal: Vec3, level: number, place: MissingPlace): string {
    let text = ''
    normal.forEach((value, index) => {
        if (index === place) {
            text += `${text ? '+' : ''}\\square\\,${NAMES[index]}`
            return
        }
        if (value === 0) return
        const size = Math.abs(value)
        text += `${value < 0 ? '-' : text ? '+' : ''}${size === 1 ? '' : size}${NAMES[index]}`
    })
    return `${text}=${place === 3 ? '\\square' : level + 0}`
}

/** The right number and three wrong ones, all different */
function choose(random: Random, answer: number, wrong: number[]): number[] | null {
    const options = [answer]
    for (const value of [...wrong, answer + 1, answer - 1, answer + 2, -answer + 1]) {
        if (options.length === 4) break
        if (!options.includes(value + 0)) options.push(value + 0)
    }
    return options.length === 4 ? shuffle(random, options) : null
}

function parallelRound(random: Random): MissingRound | null {
    const normal = small(random, 3)
    const p = small(random, 3)
    if (normal.filter((value) => value !== 0).length < 2) return null
    const level0 = randomInt(random, -4, 4)
    const answer = dot(normal, p) + 0
    if (answer === level0) return null
    const options = choose(random, answer, [-answer, level0])
    if (!options) return null
    const plane = { normal, level: level0 }
    return {
        variant: 'parallel',
        prompt: say(`$P${vec(p)}$ puntutik pasatzen den eta $${levelLatex(normal, level0)}$ planoaren paraleloa den planoa.`, `El plano por $P${vec(p)}$ paralelo a $${levelLatex(normal, level0)}$.`, `المستوى المار بـ $P${vec(p)}$ والموازي لـ $${levelLatex(normal, level0)}$.`, `The plane through $P${vec(p)}$ parallel to $${levelLatex(normal, level0)}$.`),
        normal, level: answer, place: 3, answer, options,
        points: [{ at: p, label: 'P' }], plane,
        working: `d=\\vec{n}\\cdot P=${normal.map((value, index) => `${value < 0 ? `(${value})` : value}\\cdot ${p[index] < 0 ? `(${p[index]})` : p[index]}`).join('+')}=${answer}`
    }
}

function perpendicularRound(random: Random): MissingRound | null {
    const a = small(random, 2)
    const u = small(random, 2)
    const p = small(random, 3)
    if (u.filter((value) => value !== 0).length < 2) return null
    const answer = dot(u, p) + 0
    const fromA = dot(u, a) + 0
    if (fromA === answer) return null
    const options = choose(random, answer, [-answer, fromA])
    if (!options) return null
    return {
        variant: 'perpendicular',
        prompt: say(`$P${vec(p)}$ puntutik pasatzen den eta $r$: $${vec(a)}+t\\,${vec(u)}$ zuzenarekiko perpendikularra den planoa.`, `El plano por $P${vec(p)}$ perpendicular a $r$: $${vec(a)}+t\\,${vec(u)}$.`, `المستوى المار بـ $P${vec(p)}$ والعمودي على $r$: ‏$${vec(a)}+t\\,${vec(u)}$.`, `The plane through $P${vec(p)}$ perpendicular to $r$: $${vec(a)}+t\\,${vec(u)}$.`),
        normal: u, level: answer, place: 3, answer, options,
        points: [{ at: p, label: 'P' }], line: { point: a, direction: u },
        working: `\\vec{n}=\\vec{u}=${vec(u)}\\qquad d=\\vec{u}\\cdot P=${answer}`
    }
}

/** The place hidden in levels 2 and 3: a coefficient that is not 0, or the d */
function hide(random: Random, normal: Vec3): MissingPlace {
    const places = ([0, 1, 2] as const).filter((index) => normal[index] !== 0)
    return pick<MissingPlace>(random, [...places, 3])
}

/** The wrong numbers: for a coefficient, its sign (the order of the product or the minus of the j), its double and the d; for the d, its sign and its neighbours */
const mistakes = (normal: Vec3, place: MissingPlace, level: number) => {
    if (place === 3) return [-level, level + 1, level - 1]
    const value = normal[place]
    return [-value, 2 * value, level]
}

function threePointsRound(random: Random): MissingRound | null {
    const a = small(random, 2)
    const b = small(random, 2)
    const c = small(random, 2)
    const raw = cross(sub(b, a), sub(c, a))
    if (isZero(raw)) return null
    const normal = primitive(raw)
    if (normal.some((value) => Math.abs(value) > 5) || normal.filter((value) => value !== 0).length < 2) return null
    const level = dot(normal, a) + 0
    const place = hide(random, normal)
    const answer = place === 3 ? level : normal[place]
    const options = choose(random, answer, mistakes(normal, place, level))
    if (!options) return null
    return {
        variant: 'three-points',
        prompt: say(`$A${vec(a)}$, $B${vec(b)}$ eta $C${vec(c)}$ puntuetatik pasatzen den planoa.`, `El plano por $A${vec(a)}$, $B${vec(b)}$ y $C${vec(c)}$.`, `المستوى المار بـ $A${vec(a)}$ و$B${vec(b)}$ و$C${vec(c)}$.`, `The plane through $A${vec(a)}$, $B${vec(b)}$ and $C${vec(c)}$.`),
        normal, level, place, answer, options,
        points: [{ at: a, label: 'A' }, { at: b, label: 'B' }, { at: c, label: 'C' }],
        working: `\\overrightarrow{AB}\\times\\overrightarrow{AC}=${vec(raw)}\\qquad d=${level}`
    }
}

function pointLineRound(random: Random): MissingRound | null {
    const a = small(random, 2)
    const u = small(random, 2)
    const p = small(random, 2)
    if (u.filter((value) => value !== 0).length < 2) return null
    const raw = cross(u, sub(p, a))
    if (isZero(raw)) return null
    const normal = primitive(raw)
    if (normal.some((value) => Math.abs(value) > 5) || normal.filter((value) => value !== 0).length < 2) return null
    const level = dot(normal, p) + 0
    const place = hide(random, normal)
    const answer = place === 3 ? level : normal[place]
    const options = choose(random, answer, mistakes(normal, place, level))
    if (!options) return null
    return {
        variant: 'point-line',
        prompt: say(`$r$: $${vec(a)}+t\\,${vec(u)}$ zuzena duen eta $P${vec(p)}$ puntutik pasatzen den planoa.`, `El plano que contiene a $r$: $${vec(a)}+t\\,${vec(u)}$ y pasa por $P${vec(p)}$.`, `المستوى الذي يحوي $r$: ‏$${vec(a)}+t\\,${vec(u)}$ ويمر بـ $P${vec(p)}$.`, `The plane holding $r$: $${vec(a)}+t\\,${vec(u)}$ and passing through $P${vec(p)}$.`),
        normal, level, place, answer, options,
        points: [{ at: p, label: 'P' }, { at: a, label: 'A' }], line: { point: a, direction: u },
        working: `\\vec{u}\\times\\overrightarrow{AP}=${vec(raw)}\\qquad d=${level}`
    }
}

const BUILDERS: Array<Array<(random: Random) => MissingRound | null>> = [[parallelRound, perpendicularRound], [threePointsRound], [pointLineRound]]

/** Six rounds of one level, no two with the same prompt */
export function createMissingRounds(random: Random, level: number): MissingRound[] {
    const builders = BUILDERS[Math.min(2, Math.max(0, level))]
    const rounds: MissingRound[] = []
    for (let attempt = 0; rounds.length < MISSING_ROUNDS && attempt < 6000; attempt++) {
        const round = pick(random, builders)(random)
        if (round && !rounds.some((other) => other.prompt.es === round.prompt.es)) rounds.push(round)
    }
    return rounds
}
