import { compare, equals, fraction, gcd, type FractionValue } from '../math/fraction.ts'
import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'

/* ==========================================================================
   A magnifying glass on the number line: two fractions are marks of their
   common denominator. When no mark is left between them, cutting every piece
   into 2, 3… (amplifying both fractions) makes new marks appear. Choose one,
   zoom in between it and either end, and there is room again: between two
   different fractions there is always another one.
   ========================================================================== */

export interface ZoomState {
    first: FractionValue
    second: FractionValue
    /** The pair looked at after zooming in, smaller first; null: the whole view of the two fractions */
    lens: [FractionValue, FractionValue] | null
    /** Each piece of the common denominator is cut into this many */
    split: number
    /** The chosen mark strictly between the pair, as a numerator over zoomDenominator */
    picked: number | null
    /** How many times the lens has gone in between a chosen fraction and one end */
    zooms: number
}

export const ZOOM_LIMITS = { minDenominator: 1, maxDenominator: 12, maxUnits: 3, minSplit: 1, maxSplit: 10, maxZooms: 6 } as const

export const initialZoomState: ZoomState = {
    first: { numerator: 1, denominator: 3 },
    second: { numerator: 1, denominator: 2 },
    lens: null,
    split: 1,
    picked: null,
    zooms: 0
}

/** a/gcd·b keeps the numbers small even after many zooms */
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** The two fractions to look between, smaller first; null when they are worth the same */
export function zoomPair(state: ZoomState): [FractionValue, FractionValue] | null {
    if (state.lens) return state.lens
    const order = compare(state.first, state.second)
    if (order === 0) return null
    return order < 0 ? [state.first, state.second] : [state.second, state.first]
}

/** Denominator of the marks: the common denominator of the pair, times the split */
export function zoomDenominator(state: ZoomState): number {
    const pair = zoomPair(state) ?? [state.first, state.second]
    return lcm(pair[0].denominator, pair[1].denominator) * state.split
}

/** A fraction as a numerator over the marks' denominator (it always divides exactly) */
export const markOf = (value: FractionValue, denominator: number) => (value.numerator * denominator) / value.denominator

/** Marks strictly between the pair */
export function marksBetween(state: ZoomState): number {
    const pair = zoomPair(state)
    if (!pair) return 0
    const denominator = zoomDenominator(state)
    return markOf(pair[1], denominator) - markOf(pair[0], denominator) - 1
}

/** The chosen fraction, simplified */
export function pickedValue(state: ZoomState): FractionValue | null {
    return state.picked === null ? null : fraction(state.picked, zoomDenominator(state))
}

/** What the line shows: the whole units around the two fractions, or the pair with a quarter of its width on each side */
export function zoomWindow(state: ZoomState): { low: number; high: number } {
    const pair = zoomPair(state)
    if (state.lens && pair) {
        const low = pair[0].numerator / pair[0].denominator
        const high = pair[1].numerator / pair[1].denominator
        const margin = (high - low) / 4
        return { low: low - margin, high: high + margin }
    }
    return wholeWindow(state)
}

export function wholeWindow(state: ZoomState): { low: number; high: number } {
    const values = [state.first, state.second].map((value) => value.numerator / value.denominator)
    const low = Math.floor(Math.min(...values))
    return { low, high: Math.max(low + 1, Math.ceil(Math.max(...values))) }
}

/** How much bigger the line looks than the whole-unit view */
export function magnification(state: ZoomState): number {
    const whole = wholeWindow(state)
    const now = zoomWindow(state)
    return (whole.high - whole.low) / (now.high - now.low)
}

const fresh = { lens: null, split: 1, picked: null, zooms: 0 }

/** New fractions start a new search */
export function setZoomFraction(state: ZoomState, which: 'first' | 'second', numerator: number, denominator: number): ZoomState {
    const nextDenominator = clamp(denominator, ZOOM_LIMITS.minDenominator, ZOOM_LIMITS.maxDenominator)
    const nextNumerator = clamp(numerator, 0, ZOOM_LIMITS.maxUnits * nextDenominator)
    return { ...state, ...fresh, [which]: { numerator: nextNumerator, denominator: nextDenominator } }
}

/** Cutting the pieces finer keeps the chosen mark when it is still a mark */
export function setZoomSplit(state: ZoomState, split: number): ZoomState {
    const next = clamp(split, ZOOM_LIMITS.minSplit, ZOOM_LIMITS.maxSplit)
    if (next === state.split) return state
    const picked = state.picked !== null && (state.picked * next) % state.split === 0 ? (state.picked * next) / state.split : null
    return { ...state, split: next, picked }
}

/** Choose a mark; only marks strictly between the pair count */
export function pickZoomMark(state: ZoomState, mark: number): ZoomState {
    const pair = zoomPair(state)
    if (!pair) return state
    const denominator = zoomDenominator(state)
    if (mark <= markOf(pair[0], denominator) || mark >= markOf(pair[1], denominator)) return state
    return { ...state, picked: mark }
}

/** Fill the line with the pair */
export function zoomIn(state: ZoomState): ZoomState {
    const pair = zoomPair(state)
    return pair && !state.lens ? { ...state, lens: pair } : state
}

/** Go in between the chosen fraction and one end: there is a new gap to fill */
export function zoomBeside(state: ZoomState, side: 'left' | 'right'): ZoomState {
    const pair = zoomPair(state)
    const middle = pickedValue(state)
    if (!pair || !middle || state.zooms >= ZOOM_LIMITS.maxZooms) return state
    return { ...state, lens: side === 'left' ? [pair[0], middle] : [middle, pair[1]], split: 1, picked: null, zooms: state.zooms + 1 }
}

export const zoomOut = (state: ZoomState): ZoomState => ({ ...state, ...fresh })

/** The mark next to the left end, a quick way in from the keyboard */
export function firstMarkBetween(state: ZoomState): number | null {
    const pair = zoomPair(state)
    if (!pair || marksBetween(state) < 1) return null
    return markOf(pair[0], zoomDenominator(state)) + 1
}

/* ---------- Challenges ---------- */

const sameValues = (state: ZoomState, a: FractionValue, b: FractionValue) =>
    (equals(state.first, a) && equals(state.second, b)) || (equals(state.first, b) && equals(state.second, a))

const between = (value: FractionValue | null, low: FractionValue, high: FractionValue) =>
    value !== null && compare(low, value) < 0 && compare(value, high) < 0

const found = (state: ZoomState, a: FractionValue, b: FractionValue) => {
    const [low, high] = compare(a, b) < 0 ? [a, b] : [b, a]
    return sameValues(state, a, b) && between(pickedValue(state), low, high)
}

export const zoomChallenges: LabChallenge<ZoomState>[] = [
    {
        id: 1901,
        prompt: {
            eu: 'Aurkitu 1/3 eta 1/2 arteko zatiki bat.',
            es: 'Encuentra una fracción entre 1/3 y 1/2.',
            ar: 'جد كسرًا بين 1/3 و1/2.'
        },
        hint: {
            eu: 'Izendatzaile komunarekin, 2/6 eta 3/6 dira: ez dago marrarik tartean. Zatitu zati bakoitza bitan.',
            es: 'Con denominador común son 2/6 y 3/6: no hay marca en medio. Parte cada trozo en 2.',
            ar: `بالمقام المشترك هما \u20662/6\u2069 و\u20663/6\u2069: لا علامة بينهما. قسّم كل جزء إلى 2.`
        },
        isSolved: (state) => found(state, fraction(1, 3), fraction(1, 2))
    },
    {
        id: 1902,
        prompt: {
            eu: 'Zein da handiagoa, 5/6 ala 7/9? Hurbildu lupa eta aurkitu bien arteko zatiki bat.',
            es: '¿Cuál es mayor, 5/6 o 7/9? Acerca la lupa y encuentra una fracción entre las dos.',
            ar: 'أيهما أكبر، 5/6 أم 7/9؟ قرّب العدسة وجد كسرًا بينهما.'
        },
        hint: {
            eu: 'Elkarren ondoan daude: 15/18 eta 14/18. Zatitu zatiak eta sakatu «Hurbildu lupa».',
            es: 'Están pegadas: 15/18 y 14/18. Parte los trozos y pulsa «Acercar la lupa».',
            ar: `هما متجاوران: \u206615/18\u2069 و\u206614/18\u2069. قسّم الأجزاء واضغط «قرّب العدسة».`
        },
        isSolved: (state) => state.lens !== null && found(state, fraction(5, 6), fraction(7, 9))
    },
    {
        id: 1903,
        prompt: {
            eu: 'Zatitu zatiak 2/5 eta 3/5 artean gutxienez 5 marra egon arte, eta aukeratu bat.',
            es: 'Parte los trozos hasta que entre 2/5 y 3/5 haya al menos 5 marcas, y elige una.',
            ar: 'قسّم الأجزاء حتى يكون بين 2/5 و3/5 خمس علامات على الأقل، ثم اختر واحدة.'
        },
        hint: {
            eu: 'Bosten batean 6 zati: 12/30 eta 18/30 artean 5 marra daude.',
            es: 'Un quinto partido en 6: entre 12/30 y 18/30 hay 5 marcas.',
            ar: `خُمس مقسّم إلى 6: بين \u206612/30\u2069 و\u206618/30\u2069 خمس علامات.`
        },
        isSolved: (state) => found(state, fraction(2, 5), fraction(3, 5)) && marksBetween(state) >= 5
    },
    {
        id: 1904,
        prompt: {
            eu: 'Hurbildu lupa hiru aldiz jarraian, eta aurkitu beste zatiki bat tartean: beti dago beste bat.',
            es: 'Acerca la lupa tres veces seguidas y encuentra otra fracción en medio: siempre hay otra.',
            ar: 'قرّب العدسة ثلاث مرات متتالية وجد كسرًا آخر في الوسط: يوجد دائمًا كسر آخر.'
        },
        hint: {
            eu: 'Aukeratu marra bat tartean, sakatu «Lupa…» botoietako bat, eta errepikatu.',
            es: 'Elige una marca en medio, pulsa uno de los botones «Lupa…» y repite.',
            ar: 'اختر علامة في الوسط، واضغط أحد زرّي «العدسة…»، ثم كرّر.'
        },
        isSolved: (state) => state.zooms >= 3 && state.picked !== null
    }
]

/* ---------- New pairs and endless practice ---------- */

/**
 * Two neighbouring fractions: a/b and c/d with a·d − b·c = ±1, so with their
 * common denominator there is no mark between them and the pieces must be cut.
 */
export function randomNeighbours(random: () => number): [FractionValue, FractionValue] {
    for (;;) {
        const b = randomInt(random, 2, 12)
        const a = randomInt(random, 1, b - 1)
        if (gcd(a, b) !== 1) continue
        const options: FractionValue[] = []
        for (let d = 2; d <= 12; d += 1) {
            if (d === b) continue
            for (const sign of [1, -1]) {
                // a·d − b·c = sign  →  c = (a·d − sign) / b
                const c = (a * d - sign) / b
                if (Number.isInteger(c) && c >= 1 && c < d) options.push({ numerator: c, denominator: d })
            }
        }
        if (options.length > 0) return random() < 0.5 ? [{ numerator: a, denominator: b }, pick(random, options)] : [pick(random, options), { numerator: a, denominator: b }]
    }
}

/** A finished search: the pair cut in two and the mark in the middle chosen */
export function zoomSolution(first: FractionValue, second: FractionValue): ZoomState {
    let state = setZoomFraction(setZoomFraction(initialZoomState, 'first', first.numerator, first.denominator), 'second', second.numerator, second.denominator)
    state = zoomIn(setZoomSplit(state, 2))
    const mark = firstMarkBetween(state)
    return mark === null ? state : pickZoomMark(state, mark)
}

export const zoomExtra: LabChallengeMaker<ZoomState> = (random) => {
    const [first, second] = randomNeighbours(random)
    const a = `${first.numerator}/${first.denominator}`
    const b = `${second.numerator}/${second.denominator}`
    const common = first.denominator * second.denominator
    return {
        prompt: {
            eu: `Aurkitu ${a} eta ${b} arteko zatiki bat.`,
            es: `Encuentra una fracción entre ${a} y ${b}.`,
            ar: `جد كسرًا بين ${a} و${b}.`
        },
        hint: {
            eu: `Izendatzaile komuna: ${common}. Ez badago marrarik tartean, zatitu zati bakoitza bitan.`,
            es: `Denominador común: ${common}. Si no hay marca en medio, parte cada trozo en 2.`,
            ar: `المقام المشترك: ${common}. إن لم توجد علامة في الوسط فقسّم كل جزء إلى 2.`
        },
        isSolved: (state) => found(state, first, second),
        solution: zoomSolution(first, second)
    }
}
