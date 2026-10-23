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

export type ZoomPair = [FractionValue, FractionValue]

/** A view to come back to: the pair looked at, how finely it was cut and the mark chosen */
export interface ZoomView {
    lens: ZoomPair | null
    split: number
    picked: number | null
}

export interface ZoomState extends ZoomView {
    first: FractionValue
    second: FractionValue
    /** The views left behind each time the lens went in beside a chosen fraction, oldest first */
    trail: ZoomView[]
}

export const ZOOM_LIMITS = { minDenominator: 1, maxDenominator: 12, maxUnits: 3, minSplit: 1, maxSplit: 10, maxZooms: 6 } as const

export const initialZoomState: ZoomState = {
    first: { numerator: 1, denominator: 3 },
    second: { numerator: 1, denominator: 2 },
    lens: null,
    split: 1,
    picked: null,
    trail: []
}

/** a/gcd·b keeps the numbers small even after many zooms */
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** How many times the lens has gone in beside a chosen fraction */
export const zoomCount = (state: ZoomState) => state.trail.length

/** The two fractions to look between, smaller first; null when they are worth the same */
export function zoomPair(state: ZoomState): ZoomPair | null {
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

/** The whole units around the two fractions */
export function wholeWindow(state: ZoomState): { low: number; high: number } {
    const values = [state.first, state.second].map((value) => value.numerator / value.denominator)
    const low = Math.floor(Math.min(...values))
    return { low, high: Math.max(low + 1, Math.ceil(Math.max(...values))) }
}

export interface ZoomWindow {
    /** Ends of the line, as numbers */
    low: number
    high: number
    /** First and last mark drawn, as numerators over zoomDenominator */
    firstMark: number
    lastMark: number
}

/**
 * What the line shows, worked out in marks so no mark is lost to rounding:
 * the whole units, or the pair with a quarter of its width on each side
 * (never more than the whole units).
 */
export function zoomWindow(state: ZoomState): ZoomWindow {
    const denominator = zoomDenominator(state)
    const whole = wholeWindow(state)
    let low = whole.low * denominator
    let high = whole.high * denominator
    const pair = zoomPair(state)
    if (state.lens && pair) {
        const lowMark = markOf(pair[0], denominator)
        const highMark = markOf(pair[1], denominator)
        const margin = (highMark - lowMark) / 4
        low = Math.max(low, lowMark - margin)
        high = Math.min(high, highMark + margin)
    }
    return { low: low / denominator, high: high / denominator, firstMark: Math.ceil(low), lastMark: Math.floor(high) }
}

/** How much bigger the line looks than the whole-unit view */
export function magnification(state: ZoomState): number {
    const whole = wholeWindow(state)
    const now = zoomWindow(state)
    return (whole.high - whole.low) / (now.high - now.low)
}

const fresh: ZoomView & { trail: ZoomView[] } = { lens: null, split: 1, picked: null, trail: [] }

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

/**
 * The mark to choose for a tap at `value`: the nearest one strictly between
 * the pair, as long as the tap falls on the stretch between them (or half a
 * mark beyond it); null for taps elsewhere or when there is no mark between.
 */
export function markForTap(state: ZoomState, value: number): number | null {
    const pair = zoomPair(state)
    if (!pair || marksBetween(state) < 1) return null
    const denominator = zoomDenominator(state)
    const lowMark = markOf(pair[0], denominator)
    const highMark = markOf(pair[1], denominator)
    const mark = value * denominator
    if (mark < lowMark - 0.5 || mark > highMark + 0.5) return null
    return Math.min(highMark - 1, Math.max(lowMark + 1, Math.round(mark)))
}

/** Fill the line with the pair */
export function zoomIn(state: ZoomState): ZoomState {
    const pair = zoomPair(state)
    return pair && !state.lens ? { ...state, lens: pair } : state
}

/** Whether filling the line with the pair is worth it: it must look at least half as big again */
export const canZoomIn = (state: ZoomState) => !state.lens && zoomPair(state) !== null && magnification(zoomIn(state)) >= 1.5

/** Go in between the chosen fraction and one end: there is a new gap to fill */
export function zoomBeside(state: ZoomState, side: 'left' | 'right'): ZoomState {
    const pair = zoomPair(state)
    const middle = pickedValue(state)
    if (!pair || !middle || zoomCount(state) >= ZOOM_LIMITS.maxZooms) return state
    const left: ZoomView = { lens: state.lens, split: state.split, picked: state.picked }
    return { ...state, lens: side === 'left' ? [pair[0], middle] : [middle, pair[1]], split: 1, picked: null, trail: [...state.trail, left] }
}

/** Come back out to an earlier view of the trail (the last one by default), as it was left */
export function zoomBack(state: ZoomState, to = state.trail.length - 1): ZoomState {
    if (to < 0 || to >= state.trail.length) return state
    return { ...state, ...state.trail[to], trail: state.trail.slice(0, to) }
}

export const zoomOut = (state: ZoomState): ZoomState => ({ ...state, ...fresh })

/** The other way to find one: the mean of the pair, (a + b) / 2, always lies halfway between them */
export function zoomMidpoint(state: ZoomState): FractionValue | null {
    const pair = zoomPair(state)
    if (!pair) return null
    const [low, high] = pair
    return fraction(low.numerator * high.denominator + high.numerator * low.denominator, 2 * low.denominator * high.denominator)
}

/** The mark next to the left end, a quick way in from the keyboard */
export function firstMarkBetween(state: ZoomState): number | null {
    const pair = zoomPair(state)
    if (!pair || marksBetween(state) < 1) return null
    return markOf(pair[0], zoomDenominator(state)) + 1
}

/* ---------- Challenges ---------- */

/** In Arabic, a piece of arithmetic keeps its left-to-right order (LRI … PDI) */
const ltr = (text: string) => `\u2066${text}\u2069`

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
            eu: 'Jarri 1/3 eta 1/2, eta aurkitu bien arteko zatiki bat.',
            es: 'Pon 1/3 y 1/2 y encuentra una fracción entre las dos.',
            ar: `ضع ${ltr('1/3')} و${ltr('1/2')}، ثم جد كسرًا بينهما.`
        },
        hint: {
            eu: 'Izendatzaile komunarekin, 2/6 eta 3/6 dira: ez dago marrarik tartean. Zatitu zati bakoitza bitan.',
            es: 'Con denominador común son 2/6 y 3/6: no hay marca en medio. Parte cada trozo en 2.',
            ar: `بالمقام المشترك هما ${ltr('2/6')} و${ltr('3/6')}: لا علامة بينهما. قسّم كل جزء إلى 2.`
        },
        isSolved: (state) => found(state, fraction(1, 3), fraction(1, 2))
    },
    {
        id: 1902,
        prompt: {
            eu: 'Jarri 5/6 eta 7/9: oso gertu daude. Hurbildu lupa eta aurkitu bien arteko zatiki bat.',
            es: 'Pon 5/6 y 7/9: están muy cerca. Acerca la lupa y encuentra una fracción entre las dos.',
            ar: `ضع ${ltr('5/6')} و${ltr('7/9')}: هما قريبان جدًا. قرّب العدسة وجد كسرًا بينهما.`
        },
        hint: {
            eu: 'Elkarren ondoan daude: 14/18 eta 15/18, beraz 7/9 txikiagoa da. Zatitu zatiak eta sakatu «Hurbildu lupa».',
            es: 'Están pegadas: 14/18 y 15/18, así que 7/9 es la menor. Parte los trozos y pulsa «Acercar la lupa».',
            ar: `هما متجاوران: ${ltr('14/18')} و${ltr('15/18')}، إذن ${ltr('7/9')} هو الأصغر. قسّم الأجزاء واضغط «قرّب العدسة».`
        },
        isSolved: (state) => state.lens !== null && found(state, fraction(5, 6), fraction(7, 9))
    },
    {
        id: 1903,
        prompt: {
            eu: 'Jarri 2/5 eta 3/5. Zatitu zatiak bien artean gutxienez 5 marra egon arte, eta aukeratu horietako bat.',
            es: 'Pon 2/5 y 3/5. Parte los trozos hasta que entre las dos haya al menos 5 marcas, y elige una.',
            ar: `ضع ${ltr('2/5')} و${ltr('3/5')}. قسّم الأجزاء حتى يكون بينهما خمس علامات على الأقل، ثم اختر إحداها.`
        },
        hint: {
            eu: 'Bosten bakoitza 6 zatitan zatituz gero, 12/30 eta 18/30 artean 5 marra daude.',
            es: 'Si partes cada quinto en 6, entre 12/30 y 18/30 hay 5 marcas.',
            ar: `إذا قسّمت كل خُمس إلى 6 أجزاء: بين ${ltr('12/30')} و${ltr('18/30')} خمس علامات.`
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
        isSolved: (state) => zoomCount(state) >= 3 && state.picked !== null
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
            eu: `Jarri ${a} eta ${b}, eta aurkitu bien arteko zatiki bat.`,
            es: `Pon ${a} y ${b} y encuentra una fracción entre las dos.`,
            ar: `ضع ${ltr(a)} و${ltr(b)}، ثم جد كسرًا بينهما.`
        },
        hint: {
            eu: `Izendatzaile komuna: ${common}. Tartean marrarik ez badago, zatitu zati bakoitza bitan.`,
            es: `Denominador común: ${common}. Si no hay marca en medio, parte cada trozo en 2.`,
            ar: `المقام المشترك: ${common}. إن لم توجد علامة في الوسط فقسّم كل جزء إلى 2.`
        },
        isSolved: (state) => found(state, first, second),
        solution: zoomSolution(first, second)
    }
}
