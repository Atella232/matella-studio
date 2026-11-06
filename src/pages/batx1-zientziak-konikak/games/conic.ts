import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { ELLIPSE_TRIPLES, ellipseLatex, fociOf, hyperbolaLatex, overOf, point, polynomial, ratio, shiftOf, squareOf } from './conicLatex.ts'

/* ==========================================================================
   J1 · Zein konika da? (¿Qué cónica es?): an equation; first the learner
   says which conic it is (circle, ellipse, hyperbola or parabola), then
   picks one of its elements out of four. The wrong elements are the
   mistakes of this unit: r² for r, the diameter, the foci on the wrong
   axis or with c² = a² + b², a vertex for a focus, the asymptote slope
   upside down or squared, p for p/2, the centre with its signs unchanged
   or swapped. Level 1 has the reduced equations at the origin; level 2,
   the shifted ones; level 3, the general equation, where the coefficients
   of x² and y² tell the conic and completing the square finds the centre.
   ========================================================================== */

export const CONIC_ROUNDS = 6

export type ConicKind = 'circle' | 'ellipse' | 'hyperbola' | 'parabola'
export const CONIC_KINDS: ConicKind[] = ['circle', 'ellipse', 'hyperbola', 'parabola']

export type ConicElement = 'radius' | 'foci' | 'asymptotes' | 'focus' | 'centre' | 'vertex'

export type ConicError = 'square' | 'diameter' | 'axis' | 'sum' | 'vertex' | 'inverted' | 'squares' | 'not-half' | 'side' | 'sign' | 'swapped' | 'one-sign' | 'calculation'

export interface ConicOption {
    latex: string
    error: ConicError | null
}

export interface ConicRound {
    latex: string
    kind: ConicKind
    element: ConicElement
    options: ConicOption[]
    /** The working shown after answering */
    working: string
}

const nonZero = (random: Random, limit: number) => pick(random, Array.from({ length: 2 * limit }, (_, index) => (index < limit ? index - limit : index - limit + 1)))

/** The four options, or null when two of them would read the same */
function options(random: Random, right: string, wrong: Array<[string, ConicError]>): ConicOption[] | null {
    const all: ConicOption[] = [{ latex: right, error: null }, ...wrong.map(([latex, error]) => ({ latex, error }))]
    if (new Set(all.map((option) => option.latex)).size !== all.length) return null
    return shuffle(random, all)
}

/** A centre or a vertex (h, k) and its three usual mistakes */
function centreOptions(random: Random, name: string, h: number, k: number) {
    return options(random, point(name, h, k), [[point(name, -h, -k), 'sign'], [point(name, k, h), 'swapped'], [point(name, h, -k), 'one-sign']])
}

/** Two whole numbers for a shifted centre: not zero, not equal and not opposite, so that the four options differ */
function centre(random: Random, limit: number): [number, number] | null {
    const h = nonZero(random, limit)
    const k = nonZero(random, limit)
    return Math.abs(h) === Math.abs(k) ? null : [h, k]
}

/* ---------- Level 1: at the origin ---------- */

function atOrigin(random: Random, kind: ConicKind): ConicRound | null {
    switch (kind) {
        case 'circle': {
            const r = randomInt(random, 2, 7)
            const choices = options(random, `r=${r}`, [[`r=${r * r}`, 'square'], [`r=${2 * r}`, 'diameter'], [`r=${r + 1}`, 'calculation']])
            return choices && { latex: `x^2+y^2=${r * r}`, kind, element: 'radius', options: choices, working: `r=\\sqrt{${r * r}}=${r}` }
        }
        case 'ellipse': {
            const [a, b, c] = pick(random, ELLIPSE_TRIPLES)
            const vertical = pick(random, [false, true])
            const choices = options(random, fociOf(c, vertical), [[fociOf(c, !vertical), 'axis'], [fociOf(`\\sqrt{${a * a + b * b}}`, vertical), 'sum'], [fociOf(a, vertical), 'vertex']])
            return choices && { latex: ellipseLatex(a, b, vertical), kind, element: 'foci', options: choices, working: `c=\\sqrt{${a * a}-${b * b}}=${c}` }
        }
        case 'hyperbola': {
            const a = randomInt(random, 2, 6)
            const b = randomInt(random, 2, 6)
            if (a === b) return null
            const slope = (n: number, d: number) => `y=\\pm ${ratio(n, d)}x`
            const choices = options(random, slope(b, a), [[slope(a, b), 'inverted'], [slope(b * b, a * a), 'squares'], [slope(a * a, b * b), 'squares']])
            return choices && { latex: hyperbolaLatex(a, b), kind, element: 'asymptotes', options: choices, working: `a=${a}\\quad b=${b}\\quad y=\\pm\\frac{b}{a}x` }
        }
        case 'parabola': {
            const n = pick(random, [2, 4, 6, 8, 10, 12])
            const side = pick(random, [1, -1])
            const vertical = pick(random, [false, true])
            const latex = vertical ? `x^2=${side < 0 ? '-' : ''}${n}y` : `y^2=${side < 0 ? '-' : ''}${n}x`
            const focus = (value: number, onY: boolean) => (onY ? point('F', 0, ratio(value, 4)) : point('F', ratio(value, 4), 0))
            const choices = options(random, focus(side * n, vertical), [[focus(side * 2 * n, vertical), 'not-half'], [focus(-side * n, vertical), 'side'], [focus(side * n, !vertical), 'axis']])
            return choices && { latex, kind, element: 'focus', options: choices, working: `2p=${n}\\ \\to\\ \\frac{p}{2}=${ratio(n, 4)}` }
        }
    }
}

/* ---------- Level 2: shifted ---------- */

function shifted(random: Random, kind: ConicKind): ConicRound | null {
    const place = centre(random, 5)
    if (!place) return null
    const [h, k] = place
    const x = squareOf('x', h)
    const y = squareOf('y', k)
    switch (kind) {
        case 'circle': {
            const r = randomInt(random, 2, 6)
            const choices = centreOptions(random, 'C', h, k)
            return choices && { latex: `${x}+${y}=${r * r}`, kind, element: 'centre', options: choices, working: `${point('C', h, k)}\\quad r=${r}` }
        }
        case 'ellipse':
        case 'hyperbola': {
            const a = randomInt(random, 2, 5)
            const b = randomInt(random, 2, 5)
            if (a === b) return null
            const choices = centreOptions(random, 'C', h, k)
            const latex = `${overOf(x, a * a)}${kind === 'ellipse' ? '+' : '-'}${overOf(y, b * b)}=1`
            return choices && { latex, kind, element: 'centre', options: choices, working: point('C', h, k) }
        }
        case 'parabola': {
            const n = pick(random, [2, 4, 6, 8])
            const choices = centreOptions(random, 'V', h, k)
            return choices && { latex: `${y}=${n}${shiftOf('x', h)}`, kind, element: 'vertex', options: choices, working: point('V', h, k) }
        }
    }
}

/* ---------- Level 3: the general equation ---------- */

function general(random: Random, kind: ConicKind): ConicRound | null {
    const place = centre(random, 4)
    if (!place) return null
    const [h, k] = place
    switch (kind) {
        case 'circle': {
            const r = randomInt(random, 1, 5)
            const c = h * h + k * k - r * r
            const choices = centreOptions(random, 'C', h, k)
            const latex = `${polynomial([[1, 'x^2'], [1, 'y^2'], [-2 * h, 'x'], [-2 * k, 'y'], [c, '']])}=0`
            return choices && { latex, kind, element: 'centre', options: choices, working: `${squareOf('x', h)}+${squareOf('y', k)}=${r * r}` }
        }
        case 'ellipse':
        case 'hyperbola': {
            const a = randomInt(random, 1, 3)
            const b = randomInt(random, 1, 3)
            if (kind === 'ellipse' && a === b) return null
            const s = kind === 'ellipse' ? 1 : -1
            // b²(x − h)² ± a²(y − k)² = a²b², expanded
            const terms: Array<[number, string]> = [[b * b, 'x^2'], [s * a * a, 'y^2'], [-2 * b * b * h, 'x'], [-2 * s * a * a * k, 'y'], [b * b * h * h + s * a * a * k * k - a * a * b * b, '']]
            const choices = centreOptions(random, 'C', h, k)
            const working = `${overOf(squareOf('x', h), a * a)}${s > 0 ? '+' : '-'}${overOf(squareOf('y', k), b * b)}=1`
            return choices && { latex: `${polynomial(terms)}=0`, kind, element: 'centre', options: choices, working }
        }
        case 'parabola': {
            const n = pick(random, [2, 4, 6, 8])
            // (y − k)² = n(x − h), expanded
            const latex = `${polynomial([[1, 'y^2'], [-n, 'x'], [-2 * k, 'y'], [k * k + n * h, '']])}=0`
            const choices = centreOptions(random, 'V', h, k)
            return choices && { latex, kind, element: 'vertex', options: choices, working: `${squareOf('y', k)}=${n}${shiftOf('x', h)}` }
        }
    }
}

const makers = [atOrigin, shifted, general]

/** Six rounds of one level: every conic at least once, no equation twice */
export function createConicRounds(random: Random, level: number): ConicRound[] {
    const make = makers[level] ?? atOrigin
    const kinds = shuffle(random, [...CONIC_KINDS, pick(random, CONIC_KINDS), pick(random, CONIC_KINDS)])
    const rounds: ConicRound[] = []
    for (const kind of kinds) {
        for (let attempt = 0; attempt < 500; attempt += 1) {
            const round = make(random, kind)
            if (round && !rounds.some((other) => other.latex === round.latex)) {
                rounds.push(round)
                break
            }
        }
    }
    return rounds
}

export const rightOption = (round: ConicRound) => round.options.find((option) => option.error === null)!
