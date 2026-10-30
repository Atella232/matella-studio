import { add, divide, equals, fraction, subtract, toLatex, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { durationText } from './numbers.ts'

/* ==========================================================================
   Bete biltegia (Llena el depósito, 4. DBH aplikatuak): a target time and
   some taps (and, on level 3, a drain). The player chooses what to open so
   that the empty tank fills in exactly that time, as in «Cifras»: three
   tries a round, and each try shows the sum of the parts of an hour. Each
   round is built from a real combination, and no other combination gives
   the same time.
   ========================================================================== */

export interface TankLevel {
    /** Taps offered */
    taps: number
    /** Whether there is a drain to open or leave shut */
    drain: boolean
    /** How many taps the solution opens */
    open: number[]
}

export const tankLevels: TankLevel[] = [
    { taps: 3, drain: false, open: [2] },
    { taps: 4, drain: false, open: [2, 3] },
    { taps: 3, drain: true, open: [2, 3] }
]

export const TANK_ROUNDS = 5
export const TANK_TRIES = 3

/** What is open: each tap, and the drain */
export interface TankChoice {
    taps: boolean[]
    drain: boolean
}

export interface TankRound {
    /** Hours each tap takes alone to fill the tank, from the quickest */
    taps: number[]
    /** Hours the drain takes to empty the full tank; 0 when there is none */
    drain: number
    /** The time to hit, in hours */
    target: FractionValue
    solution: TankChoice
}

const TAP_HOURS = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24] as const
const DRAIN_HOURS = [3, 4, 5, 6, 8, 10, 12, 15, 20, 24] as const

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** Part of the tank filled in an hour; negative when the drain wins */
export function tankRate(round: TankRound, choice: TankChoice): FractionValue {
    const taps = round.taps.reduce((sum, hours, index) => (choice.taps[index] ? add(sum, fraction(1, hours)) : sum), fraction(0))
    return choice.drain && round.drain > 0 ? subtract(taps, fraction(1, round.drain)) : taps
}

/** Hours to fill the empty tank, or null when it never fills */
export function tankHours(round: TankRound, choice: TankChoice): FractionValue | null {
    const rate = tankRate(round, choice)
    return rate.numerator > 0 ? divide(fraction(1), rate) : null
}

/** Every choice with at least one tap open */
export function tankChoices(round: TankRound): TankChoice[] {
    const choices: TankChoice[] = []
    for (let mask = 1; mask < 2 ** round.taps.length; mask += 1) {
        const taps = round.taps.map((_, index) => (mask & (2 ** index)) !== 0)
        choices.push({ taps, drain: false })
        if (round.drain > 0) choices.push({ taps, drain: true })
    }
    return choices
}

export const sameChoice = (left: TankChoice, right: TankChoice) => left.drain === right.drain && left.taps.every((open, index) => open === right.taps[index])

function draft(random: Random, level: TankLevel, drainOpen: boolean): TankRound | null {
    const taps: number[] = shuffle(random, TAP_HOURS).slice(0, level.taps).sort((a, b) => a - b)
    const drain = level.drain ? pick(random, DRAIN_HOURS) : 0
    if (taps.includes(drain)) return null
    const open = new Set(shuffle(random, taps.map((_, index) => index)).slice(0, pick(random, level.open)))
    const solution: TankChoice = { taps: taps.map((_, index) => open.has(index)), drain: drainOpen }
    const round: TankRound = { taps, drain, target: fraction(1), solution }
    const hours = tankHours(round, solution)
    if (!hours) return null
    // A whole number of minutes, between half an hour and ten hours
    const minutes = fraction(60 * hours.numerator, hours.denominator)
    if (minutes.denominator !== 1 || minutes.numerator < 30 || minutes.numerator > 600) return null
    // No other choice fills it in the same time
    if (tankChoices(round).some((choice) => !sameChoice(choice, solution) && equals(tankHours(round, choice) ?? fraction(-1), hours))) return null
    return { ...round, target: hours }
}

export function createTankRound(random: Random, level: number, drainOpen = false, avoid: TankRound[] = []): TankRound {
    for (let attempt = 0; attempt < 20000; attempt += 1) {
        const round = draft(random, tankLevels[level], drainOpen)
        if (round && !avoid.some((other) => other.taps.join() === round.taps.join() && other.drain === round.drain)) return round
    }
    throw new Error(`No tank round for level ${level}`)
}

/** On level 3 the drain is needed in three rounds out of five */
export function createTankRounds(random: Random, level: number): TankRound[] {
    const drains = tankLevels[level].drain ? shuffle(random, [true, true, true, false, false]) : Array.from({ length: TANK_ROUNDS }, () => false)
    const rounds: TankRound[] = []
    for (const drainOpen of drains) rounds.push(createTankRound(random, level, drainOpen, rounds))
    return rounds
}

/** 3 points at the first try, 2 at the second, 1 at the third */
export const tankPoints = (tries: number) => Math.max(0, TANK_TRIES + 1 - tries)

export function tankStars(total: number): Stars {
    if (total >= 13) return 3
    if (total >= 10) return 2
    if (total >= 6) return 1
    return 0
}

/* ---------- Texts ---------- */

export const TANK_LETTERS: LocalizedText[] = [say('A', 'A', 'أ', 'A'), say('B', 'B', 'ب', 'B'), say('C', 'C', 'ج', 'C'), say('D', 'D', 'د', 'D')]

/** The parts of an hour: 1/4 + 1/6 − 1/12 = 1/3; a single tap is just its part */
export function tankLatex(round: TankRound, choice: TankChoice): string {
    const parts = round.taps.flatMap((hours, index) => (choice.taps[index] ? [`\\frac{1}{${hours}}`] : []))
    const drain = choice.drain && round.drain > 0 ? `-\\frac{1}{${round.drain}}` : ''
    return parts.length === 1 && !drain ? parts[0] : `${parts.join('+')}${drain}=${toLatex(tankRate(round, choice))}`
}

export const tankMinutes = (hours: FractionValue) => Math.round(60 * toNumber(hours))

export function tankTarget(round: TankRound): LocalizedText {
    const minutes = tankMinutes(round.target)
    return say(durationText(minutes, 'eu'), durationText(minutes, 'es'), durationText(minutes, 'ar'), durationText(minutes, 'en'))
}

/** What a try gives: just in time, too soon, too late or never */
export function tankVerdict(round: TankRound, choice: TankChoice): { right: boolean; text: LocalizedText } {
    const hours = tankHours(round, choice)
    if (!hours) {
        return {
            right: false,
            text: say('Hustubideak sartzen den beste edo gehiago ateratzen du: ez da inoiz beteko.', 'El desagüe saca tanto o más de lo que entra: no se llenará nunca.', 'يُخرج المصرف قدر ما يدخل أو أكثر: لن يمتلئ أبدًا.', 'The drain takes out as much as or more than what comes in: it will never fill up.')
        }
    }
    const minutes = tankMinutes(hours)
    const time = (language: 'eu' | 'es' | 'en' | 'ar') => durationText(minutes, language)
    if (equals(hours, round.target)) return { right: true, text: say(`Justu garaiz! Biltegia betetzeko: ${time('eu')}.`, `¡Justo a tiempo! Se llena en ${time('es')}.`, `في الوقت تمامًا! يمتلئ في ${time('ar')}.`, `Just in time! It fills in ${time('en')}.`) }
    return toNumber(hours) < toNumber(round.target)
        ? { right: false, text: say(`Betetzeko: ${time('eu')}. Goizegi!`, `Se llena en ${time('es')}: demasiado pronto.`, `يمتلئ في ${time('ar')}: مبكرًا جدًا.`, `It fills in ${time('en')}: too soon.`) }
        : { right: false, text: say(`Betetzeko: ${time('eu')}. Beranduegi!`, `Se llena en ${time('es')}: tarda demasiado.`, `يمتلئ في ${time('ar')}: متأخرًا جدًا.`, `It fills in ${time('en')}: it takes too long.`) }
}

/** After a miss: the part of the tank each hour has to fill */
export function tankHint(round: TankRound): LocalizedText {
    const part = toLatex(divide(fraction(1), round.target))
    return say(`Ordu bakoitzean biltegiaren $${part}$ bete behar da.`, `Cada hora hay que llenar $${part}$ del depósito.`, `يجب ملء $${part}$ من الخزان كل ساعة.`, `Each hour, you must fill $${part}$ of the tank.`)
}

/** What to open, in words: «A, C y el desagüe» */
export function tankSolutionText(round: TankRound): LocalizedText {
    const names = (language: 'eu' | 'es' | 'en' | 'ar') => round.solution.taps.flatMap((open, index) => (open ? [TANK_LETTERS[index][language]] : []))
    const list = (language: 'eu' | 'es' | 'en' | 'ar', and: string, drain: string) => {
        const items = [...names(language), ...(round.solution.drain ? [drain] : [])]
        if (language === 'ar') return items.join(' و')
        return `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`
    }
    return say(
        `Ireki behar zena: ${list('eu', 'eta', 'hustubidea')}.`,
        `Había que abrir ${list('es', 'y', 'el desagüe')}.`,
        `كان يجب فتح ${list('ar', 'و', 'المصرف')}.`, `You had to open ${list('en', 'and', 'the drain')}.`
    )
}
