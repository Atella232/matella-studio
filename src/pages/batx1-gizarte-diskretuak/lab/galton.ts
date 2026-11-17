import { createRandom, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { binomialPmfDecimal, choose } from '../../batx2-zientziak-banaketak/binomial.ts'

/* ==========================================================================
   L1 · Galtonen tresna (El aparato de Galton): from 1 to 10 rows of pins
   and a board that can lean (p, the chance of going right, in tenths).
   Balls are dropped one, ten or a hundred at a time with a seeded random
   source, so a state always gives the same counts; ▶ follows the path of
   the last ball. Tapping a bin shows its paths C(n, k) and its
   probability. Before the bars of the theory appear, the learner says
   whether the most likely bin is left of the middle, in the middle or
   right of it. Pure: the drawing is in DiscreteBatx1gTools.tsx.
   ========================================================================== */

export interface GaltonState {
    rows: number
    /** p (going right at a pin) in tenths */
    p: number
    /** The bin tapped, from 0 to rows */
    selected: number
    /** Balls dropped into each bin */
    counts: number[]
    /** The moves of the last ball: 1 right, 0 left */
    lastPath: number[]
    /** How many drops so far: the seed of the next one */
    drops: number
    prediction: Prediction | null
}

export const GALTON_LIMITS = { rows: { min: 1, max: 10 }, p: { min: 1, max: 9 } } as const

const empty = (rows: number) => Array.from({ length: rows + 1 }, () => 0)

export const initialGaltonState: GaltonState = { rows: 4, p: 5, selected: 2, counts: empty(4), lastPath: [], drops: 0, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** Changing the board empties it and asks for a new prediction */
export function setGalton(state: GaltonState, patch: Partial<Pick<GaltonState, 'rows' | 'p' | 'selected'>>): GaltonState {
    const rows = clamp(patch.rows ?? state.rows, GALTON_LIMITS.rows.min, GALTON_LIMITS.rows.max)
    const p = clamp(patch.p ?? state.p, GALTON_LIMITS.p.min, GALTON_LIMITS.p.max)
    const selected = clamp(patch.selected ?? state.selected, 0, rows)
    if (rows === state.rows && p === state.p) return { ...state, selected }
    return { rows, p, selected, counts: empty(rows), lastPath: [], drops: 0, prediction: null }
}

/** Drop some balls: each pin sends a ball right with probability p */
export function dropBalls(state: GaltonState, howMany: number): GaltonState {
    const random = createRandom(9_731 + state.drops * 7_919 + state.rows * 101 + state.p)
    const counts = [...state.counts]
    let lastPath: number[] = []
    for (let ball = 0; ball < howMany; ball++) {
        lastPath = Array.from({ length: state.rows }, () => (random() < state.p / 10 ? 1 : 0))
        counts[lastPath.reduce((sum, move) => sum + move, 0)] += 1
    }
    return { ...state, counts, lastPath, drops: state.drops + 1 }
}

/** Take every ball out, keeping the board and the prediction */
export const emptyBoard = (state: GaltonState): GaltonState => ({ ...state, counts: empty(state.rows), lastPath: [], drops: 0 })

export const ballsOf = (state: Pick<GaltonState, 'counts'>) => state.counts.reduce((sum, value) => sum + value, 0)

/** The bars of the theory, B(rows; p) */
export const galtonBars = (state: Pick<GaltonState, 'rows' | 'p'>) => Array.from({ length: state.rows + 1 }, (_, k) => binomialPmfDecimal(state.rows, state.p / 10, k))

/** Paths that reach a bin */
export const pathsTo = (state: Pick<GaltonState, 'rows'>, bin: number) => choose(state.rows, bin)

/** The bins with the largest probability (two when they tie) */
export function likeliest(state: Pick<GaltonState, 'rows' | 'p'>): number[] {
    const bars = galtonBars(state)
    const top = Math.max(...bars)
    return bars.flatMap((value, k) => (Math.abs(value - top) < 1e-12 ? [k] : []))
}

/** Is the most likely bin left of the middle, in the middle or right of it? It only depends on p */
export const galtonPrediction = (state: Pick<GaltonState, 'p'>): Prediction => compareTo(state.p, 5)

/* ---------- Challenges ---------- */

export const galtonChallenges: LabChallenge<GaltonState>[] = [
    { id: 139101, prompt: say('Bilatu zehazki 10 bide iristen diren kutxatila bat.', 'Busca una casilla a la que lleguen exactamente 10 caminos.', 'ابحث عن خانة تصل إليها 10 مسارات بالضبط.', 'Find a bin that exactly 10 paths reach.'), hint: say('Tartagliaren 5. errenkadan dago: $\\binom{5}{2}=10$.', 'Está en la fila 5 de Tartaglia: $\\binom{5}{2}=10$.', 'إنه في الصف 5 من مثلث تارتاليا: $\\binom{5}{2}=10$.', 'It is in row 5 of Tartaglia: $\\binom{5}{2}=10$.'), isSolved: (state) => pathsTo(state, state.selected) === 10 },
    { id: 139102, prompt: say('Tresna zuzenarekin ($p=0{,}5$), aukeratu $\\frac{1}{64}$ probabilitateko kutxatila bat.', 'Con el tablero recto ($p=0{,}5$), elige una casilla de probabilidad $\\frac{1}{64}$.', 'باللوح المستقيم ($p=0{,}5$)، اختر خانة احتمالها $\\frac{1}{64}$.', 'With the board straight ($p=0{,}5$), choose a bin with probability $\\frac{1}{64}$.'), hint: say('$64=2^6$, eta mutur batera bide bakarra iristen da.', '$64=2^6$, y a un extremo llega un solo camino.', '$64=2^6$، ولا يصل إلى الطرف إلا مسار واحد.', '$64=2^6$, and only one path reaches an end.'), isSolved: (state) => state.p === 5 && state.rows === 6 && (state.selected === 0 || state.selected === 6) },
    { id: 139103, prompt: say('4 errenkadarekin, okertu tresna 3. kutxatila izan dadin probableena, bakarrik.', 'Con 4 filas, inclina el tablero para que la casilla 3 sea la más probable, ella sola.', 'بأربعة صفوف، أَمِل اللوح لتكون الخانة 3 وحدها الأرجح.', 'With 4 rows, tilt the board so that bin 3 alone is the most likely.'), hint: say('Probableena $np$ ingurukoa da; $p=0{,}6$ denean, 2 eta 3 berdintzen dira.', 'La más probable está cerca de $np$; con $p=0{,}6$ empatan 2 y 3.', 'الأرجح قرب $np$؛ ومع $p=0{,}6$ تتعادل 2 و3.', 'The most likely is near $np$; with $p=0{,}6$, 2 and 3 tie.'), isSolved: (state) => state.rows === 4 && likeliest(state).join() === '3' }
]

/** Endless practice: a bin that a given number of paths reaches */
const galtonMaker: LabChallengeMaker<GaltonState> = (random) => {
    const rows = randomInt(random, 3, 9)
    const bin = randomInt(random, 1, rows - 1)
    const paths = choose(rows, bin)
    const solution: GaltonState = { ...initialGaltonState, rows, selected: bin, counts: empty(rows) }
    return {
        prompt: say(`Bilatu zehazki ${paths} bide iristen diren kutxatila bat.`, `Busca una casilla a la que lleguen exactamente ${paths} caminos.`, `ابحث عن خانة تصل إليها ${paths} مسارًا بالضبط.`, `Find a bin that exactly ${paths} paths reach.`),
        hint: say('Bilatu zenbakia Tartagliaren triangeluan: errenkada errenkada kopurua da.', 'Busca el número en el triángulo de Tartaglia: la fila es el número de filas.', 'ابحث عن العدد في مثلث تارتاليا: الصف هو عدد الصفوف.', 'Look for the number in Tartaglia\'s triangle: the row is the number of rows.'),
        isSolved: (state) => pathsTo(state, state.selected) === paths,
        solution
    }
}

export const galtonExtra = freshFrom(initialGaltonState, galtonMaker)
