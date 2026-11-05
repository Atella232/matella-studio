import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Zatika ebatzi (Resuelve por piezas): a triangle with three of its
   six pieces known. The learner finishes it one piece at a time, choosing
   the piece and the tool: 180° for an angle, the sine rule or the cosine
   rule. A move only works with what is already known; the sine rule for
   an angle is only safe for the angle of a side no longer than the known
   pair's side (otherwise it could be obtuse: the ambiguous case). The
   round is won by three good moves, and ends at the first bad one. Level
   1: two angles and a side, two sides and the angle between them; level
   2: three sides, and two sides and their angle; level 3: everything,
   also two sides and an opposite angle.
   ========================================================================== */

export const PIECES_ROUNDS = 5

export type Side = 'a' | 'b' | 'c'
export type Angle = 'A' | 'B' | 'C'
export type Piece = Side | Angle
export type Tool = 'sum' | 'sines' | 'cosine'
export type MoveProblem = 'two-angles' | 'no-pair' | 'opposite-unknown' | 'ambiguous' | 'two-sides-angle' | 'three-sides'
export type Shape = 'AAS' | 'SAS' | 'SSS' | 'SSA'

export const SIDES: Side[] = ['a', 'b', 'c']
export const ANGLES: Angle[] = ['A', 'B', 'C']
export const PIECES: Piece[] = ['a', 'b', 'c', 'A', 'B', 'C']

export const isAngle = (piece: Piece): piece is Angle => piece === 'A' || piece === 'B' || piece === 'C'
/** The angle opposite a side, or the side opposite an angle */
export const opposite = (piece: Piece): Piece => (isAngle(piece) ? (piece.toLowerCase() as Side) : (piece.toUpperCase() as Angle))

export type Triangle = Record<Piece, number>

export interface PiecesRound {
    shape: Shape
    triangle: Triangle
    known: Piece[]
}

export interface Move {
    piece: Piece
    tool: Tool
}

const D = Math.PI / 180

/** The whole triangle from its three angles (degrees) and one side */
function fromAngles(A: number, B: number, side: Side, length: number): Triangle {
    const C = 180 - A - B
    const angles: Record<Angle, number> = { A, B, C }
    const diameter = length / Math.sin(angles[opposite(side) as Angle] * D)
    return { A, B, C, a: diameter * Math.sin(A * D), b: diameter * Math.sin(B * D), c: diameter * Math.sin(C * D) }
}

/** The whole triangle from its three sides */
function fromSides(a: number, b: number, c: number): Triangle {
    const angle = (x: number, y: number, z: number) => Math.acos((y * y + z * z - x * x) / (2 * y * z)) / D
    return { a, b, c, A: angle(a, b, c), B: angle(b, a, c), C: angle(c, a, b) }
}

const rotations: Array<[Side, Side, Side]> = [['a', 'b', 'c'], ['b', 'c', 'a'], ['c', 'a', 'b']]

function makeRound(random: Random, shape: Shape): PiecesRound | null {
    const [s1, s2, s3] = pick(random, rotations)
    const [S1, S2, S3] = [s1, s2, s3].map((side) => opposite(side) as Angle)
    if (shape === 'AAS') {
        // Two angles S1 and S2, and one side with a whole length
        const first = pick(random, [30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 95, 105])
        const second = pick(random, [30, 35, 40, 45, 50, 55, 60, 70, 75])
        if (first + second > 150) return null
        const angles = { [S1]: first, [S2]: second, [S3]: 180 - first - second } as Record<Angle, number>
        const side = pick(random, [s1, s3])
        return { shape, triangle: fromAngles(angles.A, angles.B, side, randomInt(random, 5, 12)), known: [S1, S2, side] }
    }
    if (shape === 'SAS') {
        // The sides s2 and s3 and the angle S1 between them
        const lengths = { [s2]: randomInt(random, 4, 12), [s3]: randomInt(random, 4, 12) } as Record<Side, number>
        const angle = pick(random, [35, 40, 50, 55, 65, 70, 80, 100, 110, 120, 130])
        lengths[s1] = Math.sqrt(lengths[s2] ** 2 + lengths[s3] ** 2 - 2 * lengths[s2] * lengths[s3] * Math.cos(angle * D))
        return { shape, triangle: fromSides(lengths.a, lengths.b, lengths.c), known: [s2, s3, S1] }
    }
    if (shape === 'SSS') {
        const sides = [randomInt(random, 4, 12), randomInt(random, 4, 12), randomInt(random, 4, 12)]
        const [x, y, z] = [...sides].sort((p, q) => p - q)
        if (x + y <= z + 1 || new Set(sides).size < 2) return null
        return { shape, triangle: fromSides(sides[0], sides[1], sides[2]), known: ['a', 'b', 'c'] }
    }
    // SSA with one triangle: the known angle S1 is opposite the longer known side s1
    const long = randomInt(random, 7, 12)
    const short = randomInt(random, 3, long - 2)
    const angle = pick(random, [30, 35, 40, 45, 50, 55, 60, 70, 80, 110, 120])
    const shortAngle = Math.asin((short * Math.sin(angle * D)) / long) / D
    const angles = { [S1]: angle, [S2]: shortAngle, [S3]: 180 - angle - shortAngle } as Record<Angle, number>
    return { shape, triangle: fromAngles(angles.A, angles.B, s1, long), known: [s1, s2, S1] }
}

const levelShapes: Shape[][] = [['AAS', 'SAS'], ['SSS', 'SAS'], ['AAS', 'SAS', 'SSS', 'SSA']]

export function createPiecesRounds(random: Random, levelIndex: number): PiecesRound[] {
    const shapes = levelShapes[levelIndex] ?? levelShapes[0]
    const plan = shuffle(random, Array.from({ length: PIECES_ROUNDS }, (_, index) => shapes[index % shapes.length]))
    return plan.map((shape) => {
        for (;;) {
            const made = makeRound(random, shape)
            if (made && PIECES.every((piece) => Number.isFinite(made.triangle[piece]) && made.triangle[piece] > 0.5)) return made
        }
    })
}

/** Whether a move can be made with what is known; null when it can, else what is wrong */
export function checkMove(round: PiecesRound, known: Piece[], { piece, tool }: Move): MoveProblem | null {
    const has = (item: Piece) => known.includes(item)
    const pairs = SIDES.filter((side) => has(side) && has(opposite(side)))
    if (tool === 'sum') return isAngle(piece) && ANGLES.filter((angle) => angle !== piece).every(has) ? null : 'two-angles'
    if (tool === 'sines') {
        const mine = opposite(piece)
        if (!has(mine)) return 'opposite-unknown'
        const others = pairs.filter((side) => side !== mine && side !== piece)
        if (others.length === 0) return 'no-pair'
        // An angle from its sine is only safe for the angle of a side no longer than the pair's side
        if (isAngle(piece)) return others.some((side) => round.triangle[mine] <= round.triangle[side] + 1e-9) ? null : 'ambiguous'
        return null
    }
    if (isAngle(piece)) return SIDES.every(has) ? null : 'three-sides'
    return SIDES.filter((side) => side !== piece).every(has) && has(opposite(piece)) ? null : 'two-sides-angle'
}

/** A good order to finish the triangle: 180° when it can, the cosine for sides and angles, the safe sines */
export function solutionMoves(round: PiecesRound): Move[] {
    const known = [...round.known]
    const moves: Move[] = []
    while (known.length < 6) {
        const missing = PIECES.filter((piece) => !known.includes(piece))
        const tries: Move[] = [
            ...missing.filter(isAngle).map((piece): Move => ({ piece, tool: 'sum' })),
            ...missing.filter((piece) => !isAngle(piece)).map((piece): Move => ({ piece, tool: 'sines' })),
            ...missing.filter((piece) => !isAngle(piece)).map((piece): Move => ({ piece, tool: 'cosine' })),
            // The largest angle first by the cosine, then the safe sines
            ...[...missing.filter(isAngle)].sort((p, q) => round.triangle[opposite(q)] - round.triangle[opposite(p)]).map((piece): Move => ({ piece, tool: 'cosine' })),
            ...missing.filter(isAngle).map((piece): Move => ({ piece, tool: 'sines' }))
        ]
        const move = tries.find((item) => checkMove(round, known, item) === null)
        if (!move) throw new Error(`No move for ${round.shape}`)
        moves.push(move)
        known.push(move.piece)
    }
    return moves
}

/** The moves offered for the missing pieces: every tool for angles, the two rules for sides */
export function offeredMoves(known: Piece[]): Move[] {
    return PIECES.filter((piece) => !known.includes(piece)).flatMap((piece): Move[] => (isAngle(piece)
        ? [{ piece, tool: 'sum' }, { piece, tool: 'sines' }, { piece, tool: 'cosine' }]
        : [{ piece, tool: 'sines' }, { piece, tool: 'cosine' }]))
}
