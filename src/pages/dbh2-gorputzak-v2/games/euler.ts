import { countElements, frustumVertices, platonic, prismVertices, pyramidVertices, type V3 } from '../geometry3d.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J1 · Zenbatu eta Euler (Cuenta y Euler): a polyhedron drawn in 3D and
   three steppers, faces, vertices and edges; the learner counts them,
   hidden edges included, and Euler's formula C + V = A + 2 checks the
   count. Level 1: prisms and pyramids with few sides; level 2: more sides
   and frustums; level 3: no drawing, only the name and two of the three
   numbers, and the third comes from Euler's formula.
   ========================================================================== */

export const EULER_ROUNDS = 5

export type SolidKind = 'prism' | 'pyramid' | 'frustum' | 'tetra' | 'cube' | 'octa' | 'dodeca' | 'icosa'
export type EulerElement = 'faces' | 'vertices' | 'edges'
export const EULER_ELEMENTS: EulerElement[] = ['faces', 'vertices', 'edges']

export interface EulerCounts { faces: number; vertices: number; edges: number }

export interface EulerRound {
    kind: SolidKind
    /** Sides of the base, for prisms, pyramids and frustums */
    sides: number
    vertices: V3[]
    counts: EulerCounts
    /** Level 3: the element to find with Euler's formula; the other two are given */
    unknown: EulerElement | null
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** The base polygon of a prism, pyramid or frustum */
const POLYGONS: Record<number, LocalizedText> = {
    3: say('triangeluar', 'triangular', 'ثلاثي', 'triangular'),
    4: say('karratu', 'cuadrangular', 'رباعي', 'square'),
    5: say('pentagonal', 'pentagonal', 'خماسي', 'pentagonal'),
    6: say('hexagonal', 'hexagonal', 'سداسي', 'hexagonal'),
    7: say('heptagonal', 'heptagonal', 'سباعي', 'heptagonal'),
    8: say('oktogonal', 'octogonal', 'ثماني', 'octagonal'),
    10: say('dekagonal', 'decagonal', 'عشاري', 'decagonal'),
    12: say('dodekagonal', 'dodecagonal', 'اثنا عشري', 'dodecagonal'),
    20: say('ikosagonal', 'de 20 lados', 'ذو 20 ضلعًا', '20-sided')
}

const PLATONIC_NAMES: Record<'tetra' | 'cube' | 'octa' | 'dodeca' | 'icosa', LocalizedText> = {
    tetra: say('Tetraedroa', 'Tetraedro', 'رباعي الأوجه', 'Tetrahedron'),
    cube: say('Kuboa', 'Cubo', 'المكعب', 'Cube'),
    octa: say('Oktaedroa', 'Octaedro', 'ثماني الأوجه', 'Octahedron'),
    dodeca: say('Dodekaedroa', 'Dodecaedro', 'اثنا عشري الأوجه', 'Dodecahedron'),
    icosa: say('Ikosaedroa', 'Icosaedro', 'عشريني الأوجه', 'Icosahedron')
}

/** The name of the solid: «Prisma hexagonala», «Pirámide pentagonal»... */
export function solidName(round: Pick<EulerRound, 'kind' | 'sides'>): LocalizedText {
    if (round.kind !== 'prism' && round.kind !== 'pyramid' && round.kind !== 'frustum') return PLATONIC_NAMES[round.kind]
    const base = POLYGONS[round.sides]
    if (round.kind === 'prism') return say(`Prisma ${base.eu}a`, `Prisma ${base.es}`, `منشور ${base.ar}`, `${base.en[0].toUpperCase()}${base.en.slice(1)} prism`)
    if (round.kind === 'pyramid') return say(`Piramide ${base.eu}a`, `Pirámide ${base.es}`, `هرم ${base.ar}`, `${base.en[0].toUpperCase()}${base.en.slice(1)} pyramid`)
    return say(`Piramide-enbor ${base.eu}a`, `Tronco de pirámide ${base.es}`, `جذع هرم ${base.ar}`, `${base.en[0].toUpperCase()}${base.en.slice(1)} frustum`)
}

/** Faces, vertices and edges from the base: what the learner should know without counting */
export function formulaCounts(kind: SolidKind, sides: number): EulerCounts {
    if (kind === 'prism' || kind === 'frustum') return { faces: sides + 2, vertices: 2 * sides, edges: 3 * sides }
    if (kind === 'pyramid') return { faces: sides + 1, vertices: sides + 1, edges: 2 * sides }
    return { tetra: { faces: 4, vertices: 4, edges: 6 }, cube: { faces: 6, vertices: 8, edges: 12 }, octa: { faces: 8, vertices: 6, edges: 12 }, dodeca: { faces: 12, vertices: 20, edges: 30 }, icosa: { faces: 20, vertices: 12, edges: 30 } }[kind]
}

function verticesOf(kind: SolidKind, sides: number): V3[] {
    if (kind === 'prism') return prismVertices(sides, 1, 1.5, Math.PI / sides)
    if (kind === 'pyramid') return pyramidVertices(sides, 1, 1.6, Math.PI / sides)
    if (kind === 'frustum') return frustumVertices(sides, 1, 0.55, 1.2, Math.PI / sides)
    return platonic[kind]
}

export function createEulerRound(random: Random, levelIndex: number, kind: SolidKind): EulerRound {
    const sides = kind === 'prism' || kind === 'pyramid' || kind === 'frustum'
        ? pick(random, levelIndex === 0 ? [3, 4, 5, 6] : levelIndex === 1 ? [5, 6, 7, 8] : [7, 8, 10, 12, 20])
        : 0
    const vertices = levelIndex === 2 ? [] : verticesOf(kind, sides)
    const counts = formulaCounts(kind, sides)
    return { kind, sides, vertices, counts, unknown: levelIndex === 2 ? pick(random, EULER_ELEMENTS) : null }
}

export function createEulerRounds(random: Random, levelIndex: number): EulerRound[] {
    const kinds: SolidKind[][] = [
        ['prism', 'prism', 'pyramid', 'pyramid', pick(random, ['prism', 'pyramid'] as const)],
        ['prism', 'pyramid', 'frustum', 'frustum', pick(random, ['octa', 'cube', 'tetra'] as const)],
        ['prism', 'pyramid', 'frustum', pick(random, ['dodeca', 'icosa'] as const), pick(random, ['octa', 'prism', 'pyramid'] as const)]
    ]
    return shuffle(random, kinds[levelIndex]).map((kind) => createEulerRound(random, levelIndex, kind))
}

/** The counts of the drawing, from its faces: the same as the formulas */
export const drawnCounts = (round: EulerRound): EulerCounts => {
    const counted = countElements(round.vertices)
    return { faces: counted.faces, vertices: counted.vertices, edges: counted.edges }
}

export const eulerRight = (round: EulerRound, answer: EulerCounts) => round.unknown
    ? answer[round.unknown] === round.counts[round.unknown]
    : EULER_ELEMENTS.every((element) => answer[element] === round.counts[element])

export function eulerStars(score: number): Stars {
    if (score >= 5) return 3
    if (score >= 4) return 2
    if (score >= 3) return 1
    return 0
}
