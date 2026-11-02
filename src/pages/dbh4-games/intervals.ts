import { inequalityLatex, interval, type Interval } from '../dbh4-aplikatuak-errealak/reals.ts'
import { randomInt, shuffle, type Random } from '../../features/unit-v2/games/random.ts'
import type { Stars } from '../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Eraiki tartea (Construye el intervalo), 4. DBH: a set of real numbers
   given as an inequality, in words or with an absolute value, and a
   number line to build it on: the two ends with steppers, −∞ and +∞, and
   each end open or closed. The interval notation is written as it is
   built. Level 1: bounded intervals; level 2: half-lines; level 3: words
   (applied) or |x − c| ≤ r (academic).
   ========================================================================== */

export const INTERVAL_ROUNDS = 6
export const INTERVAL_MIN = -10
export const INTERVAL_MAX = 10

export type IntervalTrack = 'applied' | 'academic'

export interface IntervalRound {
    target: Interval
    /** The set as a formula, or null when it is given in words */
    latex: string | null
    words: LocalizedText | null
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** A number inside a sentence: a true minus, isolated left to right in Arabic */
const plain = (value: number) => (value < 0 ? `−${-value}` : String(value))
const isolate = (value: number) => `⁦${plain(value)}⁩`

/** The set in words, for the applied level 3 */
function inWords(target: Interval): LocalizedText {
    const { from, to, closedFrom, closedTo } = target
    const low = from === null ? null : say(
        `${plain(from)} baino handiagoak${closedFrom ? ' edo berdinak' : ''}`,
        `mayores ${closedFrom ? 'o iguales ' : ''}que ${plain(from)}`,
        `الأكبر من ${closedFrom ? 'أو تساوي ' : ''}${isolate(from)}`,
        `greater than ${closedFrom ? 'or equal to ' : ''}${plain(from)}`
    )
    const high = to === null ? null : say(
        `${plain(to)} baino txikiagoak${closedTo ? ' edo berdinak' : ''}`,
        `menores ${closedTo ? 'o iguales ' : ''}que ${plain(to)}`,
        `الأصغر من ${closedTo ? 'أو تساوي ' : ''}${isolate(to)}`,
        `less than ${closedTo ? 'or equal to ' : ''}${plain(to)}`
    )
    const parts = [low, high].filter((part): part is LocalizedText => part !== null)
    if (parts.length === 1) return say(`Zenbaki errealak, ${parts[0].eu}.`, `Los números reales ${parts[0].es}.`, `الأعداد الحقيقية ${parts[0].ar}.`, `The real numbers ${parts[0].en}.`)
    return say(`Zenbaki errealak, ${parts[0].eu} eta ${parts[1].eu}.`, `Los números reales ${parts[0].es} y ${parts[1].es}.`, `الأعداد الحقيقية ${parts[0].ar} و${parts[1].ar}.`, `The real numbers ${parts[0].en} and ${parts[1].en}.`)
}

function bounded(random: Random): Interval {
    const from = randomInt(random, -8, 4)
    const to = randomInt(random, from + 2, Math.min(9, from + 10))
    return interval(from, to, random() < 0.5, random() < 0.5)
}

function halfLine(random: Random): Interval {
    const end = randomInt(random, -8, 8)
    return random() < 0.5 ? interval(end, null, random() < 0.5, false) : interval(null, end, false, random() < 0.5)
}

export function createIntervalRound(random: Random, levelIndex: number, track: IntervalTrack): IntervalRound {
    if (levelIndex === 0) {
        const target = bounded(random)
        return { target, latex: inequalityLatex(target), words: null }
    }
    if (levelIndex === 1) {
        const target = halfLine(random)
        return { target, latex: inequalityLatex(target), words: null }
    }
    if (track === 'applied') {
        const target = random() < 0.6 ? bounded(random) : halfLine(random)
        return { target, latex: null, words: inWords(target) }
    }
    // |x − c| ≤ r is the closed interval [c − r, c + r]; with < it is open
    const centre = randomInt(random, -5, 5)
    const radius = randomInt(random, 1, 4)
    const closed = random() < 0.5
    const target = interval(centre - radius, centre + radius, closed, closed)
    const inside = centre === 0 ? 'x' : centre > 0 ? `x-${centre}` : `x+${-centre}`
    return { target, latex: `|${inside}|${closed ? '\\le ' : '<'}${radius}`, words: null }
}

export function createIntervalRounds(random: Random, levelIndex: number, track: IntervalTrack): IntervalRound[] {
    const rounds: IntervalRound[] = []
    while (rounds.length < INTERVAL_ROUNDS) {
        const round = createIntervalRound(random, levelIndex, track)
        // No two rounds with the same set
        if (!rounds.some((other) => sameInterval(other.target, round.target))) rounds.push(round)
    }
    return shuffle(random, rounds)
}

export const sameInterval = (a: Interval, b: Interval) => a.from === b.from && a.to === b.to && a.closedFrom === b.closedFrom && a.closedTo === b.closedTo

export function intervalStars(score: number): Stars {
    if (score >= 6) return 3
    if (score >= 5) return 2
    if (score >= 3) return 1
    return 0
}
