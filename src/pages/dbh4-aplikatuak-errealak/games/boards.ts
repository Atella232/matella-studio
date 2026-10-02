import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { PairCard } from '../../../features/unit-v2/games/pairsMemory.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import { fraction, toLatex, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { commaLatex, expand, expansionLatex, generatrixLatex, groupedLatex, isPerfectSquare, radicalLatex, scientificLatex, simplifySqrt, toScientific } from '../reals.ts'

/* ==========================================================================
   Zenbaki errealak (4. DBH, aplikatuak) games besides the race:
   - Kokatu zuzenean: eight numbers to place on the real line, two tries
     each. Fractions and decimals go exactly on a mark; an irrational is
     right on either of the two tenths around it.
   - Memoria: a periodic decimal and its fraction, a number and its
     scientific notation, a root and its simplified radical.
   ========================================================================== */

/* ---------- Placing numbers on the line ---------- */

export const PLACE_ROUNDS = 8
export const PLACE_TRIES = 2

export interface PlaceLevel {
    from: number
    to: number
    /** Small marks between whole numbers; a click snaps to the nearest one */
    minor: number
    /** How far from the true value a pick may be (irrationals: one tenth) */
    tolerance: number
}

export const placeLevels: PlaceLevel[] = [
    { from: -3, to: 3, minor: 4, tolerance: 0 },
    { from: -2, to: 2, minor: 10, tolerance: 0 },
    { from: 0, to: 5, minor: 10, tolerance: 0.1 }
]

export interface PlaceTarget {
    value: number
    /** The number as it is asked */
    latex: string
    /** Worked line shown after the answer */
    worked: string
}

const tidy = (value: number) => Math.round(value * 1e9) / 1e9

/** The mark a pick snaps to on a level */
export const snapToMark = (level: PlaceLevel, value: number) => {
    const clamped = Math.min(level.to, Math.max(level.from, value))
    return tidy(Math.round(clamped * level.minor) / level.minor)
}

export const isPlacedRight = (level: PlaceLevel, pick: number, value: number) => Math.abs(pick - value) <= level.tolerance + 1e-9

const decimalLatex = (value: number) => commaLatex(String(tidy(value)))

function quarterTarget(random: Random): PlaceTarget {
    const quarters = randomInt(random, -11, 11)
    const value = fraction(quarters, 4)
    if (value.denominator === 1) return quarterTarget(random)
    if (random() < 0.5) return { value: toNumber(value), latex: toLatex(value), worked: `${toLatex(value)}=${decimalLatex(toNumber(value))}` }
    return { value: toNumber(value), latex: decimalLatex(toNumber(value)), worked: `${decimalLatex(toNumber(value))}=${toLatex(value)}` }
}

function tenthTarget(random: Random): PlaceTarget {
    const tenths = randomInt(random, -19, 19)
    if (tenths % 10 === 0 || tenths % 5 === 0 && random() < 0.6) return tenthTarget(random)
    const value = fraction(tenths, 10)
    const asked = random() < 0.4 ? toLatex(value) : decimalLatex(tenths / 10)
    return { value: tenths / 10, latex: asked, worked: asked === toLatex(value) ? `${asked}=${decimalLatex(tenths / 10)}` : `${asked}=${toLatex(value)}` }
}

function irrationalTarget(random: Random): PlaceTarget {
    const choice = random()
    if (choice < 0.12) return { value: Math.PI, latex: '\\pi', worked: '\\pi\\approx 3{,}14' }
    if (choice < 0.22) {
        const n = pick(random, [2, 3, 5])
        const value = 1 + Math.sqrt(n)
        return { value, latex: `1+\\sqrt{${n}}`, worked: `1+\\sqrt{${n}}\\approx 1+${decimalLatex(Math.round(Math.sqrt(n) * 100) / 100)}=${decimalLatex(Math.round(value * 100) / 100)}` }
    }
    const n = randomInt(random, 2, 24)
    if (isPerfectSquare(n)) return irrationalTarget(random)
    const low = Math.floor(Math.sqrt(n))
    return { value: Math.sqrt(n), latex: `\\sqrt{${n}}`, worked: `${low}^{2}=${low * low}<${n}<${(low + 1) ** 2}=${low + 1}^{2},\\ \\sqrt{${n}}\\approx ${decimalLatex(Math.round(Math.sqrt(n) * 100) / 100)}` }
}

const makers = [quarterTarget, tenthTarget, irrationalTarget]

export function createPlaceRound(random: Random, levelIndex: number): PlaceTarget[] {
    const targets: PlaceTarget[] = []
    for (let attempt = 0; targets.length < PLACE_ROUNDS && attempt < 500; attempt += 1) {
        const target = makers[levelIndex](random)
        // Different numbers, and not two at the same mark
        if (targets.some((item) => item.latex === target.latex || Math.abs(item.value - target.value) < 0.05)) continue
        targets.push(target)
    }
    return targets
}

/** Points for one number: 2 at the first try, 1 at the second, 0 otherwise */
export function placePoints(failedTries: number): number {
    return failedTries === 0 ? 2 : failedTries === 1 ? 1 : 0
}

export function placeStars(total: number): Stars {
    if (total >= 14) return 3
    if (total >= 10) return 2
    return 1
}

/** Which way to move after a wrong pick */
export const placeHint = (pick: number, value: number): LocalizedText => (pick < value
    ? { eu: 'Ez da hori: zenbakia eskuinerago dago.', es: 'No es ahí: el número está más a la derecha.', ar: 'ليس هناك: العدد أبعد إلى اليمين.' }
    : { eu: 'Ez da hori: zenbakia ezkerrerago dago.', es: 'No es ahí: el número está más a la izquierda.', ar: 'ليس هناك: العدد أبعد إلى اليسار.' })

/* ---------- Memory ---------- */

export const REALS_MEMORY_PAIRS = 6

export const realsMemoryLevels = ['generatrix', 'scientific', 'radicals'] as const

type Pair = [question: string, answer: string, explain: string]

function generatrixPair(random: Random): Pair {
    const denominator = pick(random, [3, 9, 11, 6, 12, 15, 18, 22, 30, 90])
    const numerator = randomInt(random, 1, denominator * 2)
    const value: FractionValue = fraction(numerator, denominator)
    if (value.denominator !== denominator) return generatrixPair(random)
    const expansion = expand(value)
    return [expansionLatex(expansion), toLatex(value), `${expansionLatex(expansion)}=${generatrixLatex(expansion)}=${toLatex(value)}`]
}

function scientificPair(random: Random): Pair {
    const significant = String(randomInt(random, 12, 98)).replace(/0$/, '')
    const exponent = randomInt(random, 3, 9) * (random() < 0.5 ? 1 : -1)
    const point = 1 + exponent
    const text = point <= 0 ? `0.${'0'.repeat(-point)}${significant}` : significant + '0'.repeat(point - significant.length)
    const scientific = toScientific(text)
    return [groupedLatex(text), scientificLatex(scientific), `${groupedLatex(text)}=${scientificLatex(scientific)}`]
}

function radicalPair(random: Random): Pair {
    const inside = pick(random, [2, 3, 5, 6, 7])
    const outside = randomInt(random, 2, inside <= 3 ? 7 : 5)
    const radicand = outside * outside * inside
    if (simplifySqrt(radicand).outside !== outside) return radicalPair(random)
    return [`\\sqrt{${radicand}}`, radicalLatex(outside, inside), `\\sqrt{${radicand}}=\\sqrt{${outside * outside}\\cdot ${inside}}=${radicalLatex(outside, inside)}`]
}

const pairMakers = { generatrix: generatrixPair, scientific: scientificPair, radicals: radicalPair }

/** Six pairs with different answers (and different questions), so every card has exactly one partner */
export function createRealsMemoryBoard(random: Random, levelIndex: number): PairCard[] {
    const make = pairMakers[realsMemoryLevels[levelIndex]]
    const pairs: Pair[] = []
    for (let attempt = 0; pairs.length < REALS_MEMORY_PAIRS && attempt < 500; attempt += 1) {
        const pair = make(random)
        if (pairs.some(([question, answer]) => answer === pair[1] || question === pair[0])) continue
        pairs.push(pair)
    }
    return shuffle(random, pairs.flatMap(([question, answer, explain], setId) => [
        { id: `${setId}-q`, setId, latex: question, shows: answer, explain },
        { id: `${setId}-a`, setId, latex: answer, shows: answer, explain }
    ]))
}
