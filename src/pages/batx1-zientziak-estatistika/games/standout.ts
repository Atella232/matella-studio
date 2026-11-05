import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J1 · Nork nabarmentzen du gehiago? (¿Quién destaca más?): two or three
   people, each with a result in their own group (its mean and σ). The
   learner taps the one that stands out more, that is, the one with the
   best standard score z = (x − x̄) / σ. Level 1: marks, the higher the
   better; level 2: times, the lower the better (the most negative z);
   level 3: three marks. In most rounds the best raw result is not the one
   that stands out. Numbers are kept in tenths so every z is exact.
   ========================================================================== */

export const STANDOUT_ROUNDS = 6

export interface StandoutPerson {
    /** The result, the mean and σ, in tenths */
    value: number
    mean: number
    sd: number
}

export interface StandoutRound {
    people: StandoutPerson[]
    /** Times: the lower the better */
    lowerBetter: boolean
    /** The one that stands out more */
    answer: number
}

export const standoutZ = (person: StandoutPerson): FractionValue => fraction(person.value - person.mean, person.sd)
export const zNumber = (person: StandoutPerson) => (person.value - person.mean) / person.sd

/** The index of the best standard score */
export function bestIndex(people: StandoutPerson[], lowerBetter: boolean): number {
    let best = 0
    for (let index = 1; index < people.length; index += 1) {
        const better = lowerBetter ? zNumber(people[index]) < zNumber(people[best]) : zNumber(people[index]) > zNumber(people[best])
        if (better) best = index
    }
    return best
}

/** The index of the best raw result */
export const rawBest = (people: StandoutPerson[], lowerBetter: boolean) => people.reduce((best, person, index) => ((lowerBetter ? person.value < people[best].value : person.value > people[best].value) ? index : best), 0)

/** A mark out of 10 with its group: mean 5–8, σ 0,5–2, z from −1,5 to 2,5 */
function markPerson(random: Random): StandoutPerson | null {
    const mean = 5 * randomInt(random, 10, 16)
    const sd = 5 * randomInt(random, 1, 4)
    const twiceZ = randomInt(random, -3, 5)
    const value = mean + (twiceZ * sd) / 2
    if (!Number.isInteger(value) || value < 0 || value > 100) return null
    return { value, mean, sd }
}

/** A time in seconds: a sprint of about 12–16 s, σ 0,2–0,6 s */
function timePerson(random: Random): StandoutPerson | null {
    const mean = 10 * randomInt(random, 12, 16) + 2 * randomInt(random, 0, 4)
    const sd = 2 * randomInt(random, 1, 3)
    const twiceZ = randomInt(random, -5, 3)
    const value = mean + (twiceZ * sd) / 2
    if (!Number.isInteger(value) || value <= 0) return null
    return { value, mean, sd }
}

function makeRound(random: Random, level: number, trap: boolean): StandoutRound | null {
    const lowerBetter = level === 1
    const size = level === 2 ? 3 : 2
    const people: StandoutPerson[] = []
    for (let attempt = 0; people.length < size && attempt < 40; attempt += 1) {
        const person = lowerBetter ? timePerson(random) : markPerson(random)
        if (person && !people.some((other) => Math.abs(zNumber(other) - zNumber(person)) < 0.25 || other.value === person.value)) people.push(person)
    }
    if (people.length < size) return null
    const answer = bestIndex(people, lowerBetter)
    // A trap: the best raw result is not the one that stands out
    if (trap !== (rawBest(people, lowerBetter) !== answer)) return null
    return { people, lowerBetter, answer }
}

export function createStandoutRounds(random: Random, level: number): StandoutRound[] {
    const traps = shuffle(random, [true, true, true, true, false, false])
    return traps.map((trap) => {
        for (let attempt = 0; attempt < 2000; attempt += 1) {
            const round = makeRound(random, level, trap)
            if (round) return round
        }
        throw new Error(`No round for level ${level}`)
    })
}

/** A number in tenths for LaTeX: 125 → 12{,}5 */
export const tenths = (value: number) => (value % 10 === 0 ? String(value / 10) : `${Math.trunc(value / 10)}{,}${Math.abs(value % 10)}`)

/** z for LaTeX: 1{,}5, -0{,}5, 2 */
export const zText = (person: StandoutPerson) => String(Math.round(zNumber(person) * 100) / 100).replace('.', '{,}')
