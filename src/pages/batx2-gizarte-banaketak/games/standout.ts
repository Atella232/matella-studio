import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   B-J2 · Nork nabarmentzen du gehiago? (¿Quién destaca más?): two or three
   people, each with a result in a different normal (marks out of 10,
   tests out of 100, minutes in a race…). The learner taps the one who
   stands out most: the biggest z (levels 1 and 3) or the most unusual
   one, the biggest |z| (level 2, where someone is below the mean). The
   raw numbers are chosen so that the biggest raw result is never the
   answer when it can be avoided. Values are exact: z in quarters and σ a
   multiple of 4, or z in tenths and σ a multiple of 10. Pure logic.
   ========================================================================== */

export const STANDOUT_ROUNDS = 6

export const PEOPLE = ['Ane', 'Jon', 'Mikel', 'Leire', 'Unai', 'Nora'] as const

export interface Person {
    name: (typeof PEOPLE)[number]
    mean: number
    sd: number
    value: number
    z: number
}

export interface StandoutRound {
    people: Person[]
    /** «stand out» (biggest z) or «most unusual» (biggest |z|) */
    unusual: boolean
    answer: number
}

const SCALES = [
    { means: [5, 6], sds: [0.8, 1.2, 1.6] },
    { means: [50, 60, 65], sds: [8, 12, 16] },
    { means: [100, 120], sds: [20, 40] }
]

function person(random: Random, name: Person['name'], z: number): Person | null {
    const scale = pick(random, SCALES)
    const mean = pick(random, scale.means)
    const sd = pick(random, scale.sds)
    const value = Math.round((mean + z * sd) * 100) / 100
    if (value <= 0 || Math.abs((value - mean) / sd - z) > 1e-9) return null
    return { name, mean, sd, value, z }
}

function makeRound(random: Random, level: number): StandoutRound | null {
    const count = level === 2 ? 3 : 2
    const names = shuffle(random, [...PEOPLE]).slice(0, count)
    const zs = level === 1
        ? shuffle(random, [pick(random, [1, 1.25, 1.5, 2]), -pick(random, [1.25, 1.5, 1.75, 2.25])])
        : shuffle(random, [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]).slice(0, count)
    const people: Person[] = []
    for (let index = 0; index < count; index += 1) {
        const made = person(random, names[index], zs[index])
        if (!made) return null
        people.push(made)
    }
    const unusual = level === 1
    const score = (item: Person) => (unusual ? Math.abs(item.z) : item.z)
    const best = Math.max(...people.map(score))
    if (people.filter((item) => score(item) === best).length > 1) return null
    return { people, unusual, answer: people.findIndex((item) => score(item) === best) }
}

/** Six rounds of a level; in most of them the biggest raw value is not the one that stands out */
export function createStandoutRounds(random: Random, level: number): StandoutRound[] {
    const rounds: StandoutRound[] = []
    for (let attempt = 0; rounds.length < STANDOUT_ROUNDS && attempt < 3000; attempt += 1) {
        const round = makeRound(random, level)
        if (!round) continue
        const biggestRaw = round.people.reduce((best, item, index) => (item.value > round.people[best].value ? index : best), 0)
        const trap = biggestRaw !== round.answer
        if (!trap && rounds.filter((item) => item.people.reduce((best, p, index) => (p.value > item.people[best].value ? index : best), 0) === item.answer).length >= 2) continue
        rounds.push(round)
    }
    return rounds
}

/** z with up to two decimals for LaTeX */
export const zText = (z: number) => String(z).replace('.', '{,}')
/** A number with up to two decimals for LaTeX */
export const numText = (value: number) => String(value).replace('.', '{,}')
