import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { formatNatural } from '../format.ts'
import { placeNames } from '../lab/text.ts'
import { roundTo } from './race.ts'

/* ==========================================================================
   Zenbaki-ehiza (Caza de números): a grid of numbers and a condition; tap
   every number that meets it. The grid is full of traps: the same digit in
   another place, numbers just past the half, squares plus one…
   ========================================================================== */

export const HUNT_ROUNDS = 5
export const HUNT_CELLS = 16
export const HUNT_PENALTY_MS = 3000

export interface HuntRule {
    id: string
    label: LocalizedText
    test: (value: number) => boolean
    /** Why a number does or does not meet the rule */
    why: (value: number) => LocalizedText
    /** A number that may or may not meet the rule, often a tempting one */
    sample: (random: Random) => number
}

export interface HuntRound {
    rule: HuntRule
    numbers: number[]
}

const f = formatNatural
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })

/** Digit of `value` at `place` (0 = units) */
export const digitAt = (value: number, place: number) => Math.floor(value / 10 ** place) % 10

/** Basque places with the inessive: "in the tens" */
const placesIn = ['unitateetan', 'hamarrekoetan', 'ehunekoetan', 'milakoetan', 'hamar milakoetan']

/** "The digit d is worth d · 10^place" among five-digit numbers */
function digitRule(digit: number, place: number): HuntRule {
    const worth = digit * 10 ** place
    return {
        id: `digit-${digit}-${place}`,
        label: say(`${digit} zifrak ${f(worth)} balio du`, `La cifra ${digit} vale ${f(worth)}`, `قيمة الرقم ${digit} هي ${f(worth)}`),
        test: (value) => digitAt(value, place) === digit,
        why: (value) => {
            const places = [0, 1, 2, 3, 4].filter((index) => digitAt(value, index) === digit)
            if (places.includes(place)) return say(`${digit} ${placesIn[place]} dago.`, `El ${digit} está en las ${placeNames.es[place]}.`, `الرقم ${digit} في مرتبة ${placeNames.ar[place]}.`)
            if (places.length === 0) return say(`Ez du ${digit} zifrarik.`, `No tiene ningún ${digit}.`, `لا يحتوي على الرقم ${digit}.`)
            const other = places[0]
            return say(
                `Hemen ${digit} zifrak ${f(digit * 10 ** other)} balio du (${placeNames.eu[other]}).`,
                `Aquí el ${digit} vale ${f(digit * 10 ** other)} (${placeNames.es[other]}).`,
                `هنا قيمة ${digit} هي ${f(digit * 10 ** other)} (${placeNames.ar[other]}).`
            )
        },
        sample: (random) => {
            const digits = Array.from({ length: 5 }, (_, index) => (index === 4 ? randomInt(random, 1, 9) : randomInt(random, 0, 9)))
                .map((item) => (item === digit ? (item + 1) % 10 : item))
            const roll = random()
            // Half the numbers meet the rule; most of the others have the digit somewhere else
            const where = roll < 0.45 ? place : roll < 0.85 ? pick(random, [0, 1, 2, 3, 4].filter((index) => index !== place)) : -1
            if (where >= 0) digits[where] = digit
            if (digits[4] === 0) digits[4] = digit === 1 ? 2 : 1
            return digits.reduce((sum, item, index) => sum + item * 10 ** index, 0)
        }
    }
}

const roundWords: Record<number, LocalizedText> = {
    100: say('ehunekoetara', 'a las centenas', 'إلى المئات'),
    1000: say('milakoetara', 'a los millares', 'إلى الآلاف')
}

/** "Rounded to the place, they give target" */
function roundingRule(target: number, place: number): HuntRule {
    const words = roundWords[place]
    return {
        id: `round-${target}-${place}`,
        label: say(`${words.eu} biribilduta: ${f(target)}`, `Redondeados ${words.es} dan ${f(target)}`, `مقرَّبة ${words.ar} تعطي ${f(target)}`),
        test: (value) => roundTo(value, place) === target,
        why: (value) => say(`${f(value)} ≈ ${f(roundTo(value, place))}`, `${f(value)} ≈ ${f(roundTo(value, place))}`, `${f(value)} ≈ ${f(roundTo(value, place))}`),
        // Close to the target, and often just around the halves
        sample: (random) => (random() < 0.4
            ? target + pick(random, [-1, 1]) * (place / 2) + randomInt(random, -3, 3) * (place / 100)
            : target + randomInt(random, -Math.round(place * 1.4), Math.round(place * 1.4)))
    }
}

const isSquare = (value: number) => Number.isInteger(Math.sqrt(value))
const isCube = (value: number) => Math.round(Math.cbrt(value)) ** 3 === value

const squaresRule: HuntRule = {
    id: 'squares',
    label: say('Karratuak (n²)', 'Cuadrados (n²)', 'المربعات (n²)'),
    test: isSquare,
    why: (value) => {
        const root = Math.floor(Math.sqrt(value))
        return isSquare(value)
            ? same(`${value} = ${root}²`)
            : say(`${root}² = ${root * root} eta ${root + 1}² = ${(root + 1) ** 2}: tartean dago.`, `${root}² = ${root * root} y ${root + 1}² = ${(root + 1) ** 2}: está entre medias.`, `${root}² = ${root * root} و${root + 1}² = ${(root + 1) ** 2}: يقع بينهما.`)
    },
    sample: (random) => {
        const root = randomInt(random, 2, 12)
        return random() < 0.45 ? root * root : Math.max(2, root * root + pick(random, [-2, -1, 1, 2, root]))
    }
}

const cubesRule: HuntRule = {
    id: 'cubes',
    label: say('Kuboak (n³)', 'Cubos (n³)', 'المكعبات (n³)'),
    test: isCube,
    why: (value) => {
        const root = Math.floor(Math.cbrt(value + 0.5))
        return isCube(value)
            ? same(`${value} = ${root}³`)
            : say(`${root}³ = ${root ** 3} eta ${root + 1}³ = ${(root + 1) ** 3}: tartean dago.`, `${root}³ = ${root ** 3} y ${root + 1}³ = ${(root + 1) ** 3}: está entre medias.`, `${root}³ = ${root ** 3} و${root + 1}³ = ${(root + 1) ** 3}: يقع بينهما.`)
    },
    sample: (random) => {
        const root = randomInt(random, 1, 7)
        // Traps: squares and "base times three"
        return random() < 0.45 ? root ** 3 : pick(random, [root * root, root * 3, root ** 3 + 1, root ** 3 - 1, (root + 1) ** 2].filter((value) => value > 1))
    }
}

function same(value: string): LocalizedText {
    return { eu: value, es: value, ar: value }
}

export interface HuntLevel {
    rule: (random: Random) => HuntRule
    secondsPerRound: number
}

export const huntLevels: HuntLevel[] = [
    { rule: (random) => digitRule(randomInt(random, 1, 9), randomInt(random, 1, 4)), secondsPerRound: 18 },
    { rule: (random) => (random() < 0.5 ? roundingRule(randomInt(random, 3, 60) * 1000, 1000) : roundingRule(randomInt(random, 11, 90) * 100, 100)), secondsPerRound: 20 },
    { rule: (random) => (random() < 0.6 ? squaresRule : cubesRule), secondsPerRound: 16 }
]

/** A grid of distinct numbers with between 4 and 7 right answers */
export function createHuntRound(random: Random, levelIndex: number): HuntRound {
    const level = huntLevels[levelIndex]
    for (let attempt = 0; attempt < 200; attempt += 1) {
        const rule = level.rule(random)
        const count = randomInt(random, 4, 7)
        const yes = new Set<number>()
        const no = new Set<number>()
        for (let tries = 0; tries < 600 && (yes.size < count || no.size < HUNT_CELLS - count); tries += 1) {
            const value = rule.sample(random)
            if (!Number.isInteger(value) || value < 1) continue
            if (rule.test(value)) {
                if (yes.size < count) yes.add(value)
            } else if (no.size < HUNT_CELLS - count) {
                no.add(value)
            }
        }
        if (yes.size < count || no.size < HUNT_CELLS - count) continue
        return { rule, numbers: shuffle(random, [...yes, ...no]) }
    }
    throw new Error('Could not build a hunt round')
}

export const targetsLeft = (round: HuntRound, found: number[]) => round.numbers.filter((value) => round.rule.test(value) && !found.includes(value)).length

export function huntParTime(levelIndex: number): number {
    return (HUNT_ROUNDS * huntLevels[levelIndex].secondsPerRound + 5) * 1000
}

export function huntStars(levelIndex: number, timeMs: number, mistakes: number): Stars {
    const par = huntParTime(levelIndex)
    if (timeMs <= par * 0.8 && mistakes <= 1) return 3
    if (timeMs <= par) return 2
    return 1
}
