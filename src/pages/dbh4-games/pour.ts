import { pick, type Random } from '../../features/unit-v2/games/random.ts'

/* ==========================================================================
   How many glasses? (4. DBH areas and volumes, applied and academic): a
   small container and a big one, drawn to the same scale with their
   measures in centimetres. How many full small ones fill the big one? Set
   the number and pour: the big one fills glass by glass, falls short or
   spills. Level 1: the same base (a cone in a cylinder of its radius, a
   pyramid in a prism of its base); level 2: other bases (r², s²); level 3:
   spheres, hemispheres and cones of another radius in cylinders.
   ========================================================================== */

export type VesselShape = 'cylinder' | 'cone' | 'sphere' | 'hemisphere' | 'prism' | 'pyramid' | 'cube'
/** size: the radius (round vessels) or the side of the square base; height: the height (the diameter of a sphere) */
export interface Vessel { shape: VesselShape; size: number; height: number }
export interface PourRound { source: Vessel; target: Vessel; fills: number }

export const POUR_ROUNDS = 5
export const POUR_MAX = 20

export const ROUND_VESSELS: VesselShape[] = ['cylinder', 'cone', 'sphere', 'hemisphere']
export const isRound = (shape: VesselShape) => ROUND_VESSELS.includes(shape)

export function vessel(shape: VesselShape, size: number, height = size): Vessel {
    return { shape, size, height: shape === 'sphere' ? 2 * size : shape === 'hemisphere' || shape === 'cube' ? size : height }
}

/** Three times the volume, without π for the round vessels: a whole number */
export function tripleVolume({ shape, size, height }: Vessel): number {
    switch (shape) {
        case 'cylinder':
        case 'prism': return 3 * size * size * height
        case 'cone':
        case 'pyramid': return size * size * height
        case 'sphere': return 4 * size ** 3
        case 'hemisphere': return 2 * size ** 3
        case 'cube': return 3 * size ** 3
    }
}

/** The volume, in π cm³ for the round vessels and in cm³ for the others */
export const volumeOf = (v: Vessel) => tripleVolume(v) / 3

/** How the volume is worked out: V = π · 3² · 8 = 72π */
export function volumeLatex(v: Vessel): string {
    const { shape, size: r, height: h } = v
    const pi = isRound(shape) ? '\\pi' : ''
    const value = `${volumeOf(v)}${pi}`
    switch (shape) {
        case 'cylinder': return `V=\\pi\\cdot ${r}^{2}\\cdot ${h}=${value}`
        case 'cone': return `V=\\frac{\\pi\\cdot ${r}^{2}\\cdot ${h}}{3}=${value}`
        case 'sphere': return `V=\\frac{4}{3}\\pi\\cdot ${r}^{3}=${value}`
        case 'hemisphere': return `V=\\frac{2}{3}\\pi\\cdot ${r}^{3}=${value}`
        case 'prism': return `V=${r}^{2}\\cdot ${h}=${value}`
        case 'pyramid': return `V=\\frac{${r}^{2}\\cdot ${h}}{3}=${value}`
        case 'cube': return `V=${r}^{3}=${value}`
    }
}

/** The measures to read: r = 3 cm, h = 8 cm (a = 4 cm for a square base) */
export function measuresLatex({ shape, size, height }: Vessel): string {
    const cm = '\\ \\text{cm}'
    if (shape === 'sphere' || shape === 'hemisphere') return `r=${size}${cm}`
    if (shape === 'cube') return `a=${size}${cm}`
    return `${isRound(shape) ? 'r' : 'a'}=${size}${cm},\\ h=${height}${cm}`
}

const SIZES = [2, 3, 4, 5, 6, 8, 9, 10, 12]
const HEIGHTS = [3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 30]
const FILLS_MIN = 2
const FILLS_MAX = 12

/** Every pair the level allows, grouped by the shape of the small vessel */
function candidates(levelIndex: number): Map<VesselShape, PourRound[]> {
    const groups = new Map<VesselShape, PourRound[]>()
    const add = (source: Vessel, target: Vessel) => {
        const [s, t] = [tripleVolume(source), tripleVolume(target)]
        if (s % 3 !== 0 || t % 3 !== 0 || t % s !== 0) return
        const fills = t / s
        if (fills < FILLS_MIN || fills > FILLS_MAX) return
        // The small vessel fits beside the big one and is not taller than it
        if (source.height > target.height || source.size > target.size) return
        groups.set(source.shape, [...(groups.get(source.shape) ?? []), { source, target, fills }])
    }
    for (const size of SIZES) for (const height of HEIGHTS) {
        // A jug at least as tall as its radius, a box at least as tall as half its side
        if (height < size) continue
        const jug = vessel('cylinder', size, height)
        const box = vessel('prism', size, height)
        if (levelIndex === 0) {
            for (const h of HEIGHTS) {
                add(vessel('cylinder', size, h), jug)
                add(vessel('cone', size, h), jug)
                add(vessel('prism', size, h), box)
                add(vessel('pyramid', size, h), box)
            }
        } else if (levelIndex === 1) {
            for (const small of SIZES.filter((value) => value < size)) {
                for (const h of HEIGHTS) {
                    add(vessel('cylinder', small, h), jug)
                    add(vessel('prism', small, h), box)
                    add(vessel('pyramid', small, h), box)
                }
                add(vessel('cube', small), box)
            }
        } else {
            for (const r of [3, 6]) {
                add(vessel('sphere', r), jug)
                add(vessel('hemisphere', r), jug)
            }
            for (const small of SIZES.filter((value) => value < size)) for (const h of HEIGHTS) add(vessel('cone', small, h), jug)
        }
    }
    return groups
}

const cache = new Map<number, Map<VesselShape, PourRound[]>>()

export function createPourRounds(random: Random, levelIndex: number): PourRound[] {
    if (!cache.has(levelIndex)) cache.set(levelIndex, candidates(levelIndex))
    const groups = cache.get(levelIndex)!
    const shapes = [...groups.keys()]
    const rounds: PourRound[] = []
    const seen = new Set<string>()
    while (rounds.length < POUR_ROUNDS) {
        const round = pick(random, groups.get(pick(random, shapes))!)
        const key = JSON.stringify(round)
        // No two rounds alike, and not every answer the same
        if (seen.has(key) || rounds.filter((other) => other.fills === round.fills).length >= 2) continue
        seen.add(key)
        rounds.push(round)
    }
    return rounds
}
