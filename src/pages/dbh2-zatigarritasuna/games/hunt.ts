import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { ren, rekin } from '../basque.ts'
import { divisors, isPrime } from '../math.ts'

/* ==========================================================================
   Zenbaki-ehiza (Caza de números): a grid of numbers and a condition; tap
   every number that meets it. A wrong tap costs time and says why.
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
}

export interface HuntRound {
    rule: HuntRule
    numbers: number[]
}

const multipleRule = (n: number): HuntRule => ({
    id: `multiple-${n}`,
    label: { eu: `${ren(n)} multiploak`, es: `Múltiplos de ${n}`, ar: `مضاعفات ${n}` },
    test: (value) => value % n === 0,
    why: (value) => (value % n === 0
        ? { eu: `${value} = ${n} · ${value / n}`, es: `${value} = ${n} · ${value / n}`, ar: `${value} = ${n} · ${value / n}` }
        : { eu: `${value} = ${n} · ${Math.floor(value / n)} + ${value % n}: hondarra ez da 0.`, es: `${value} = ${n} · ${Math.floor(value / n)} + ${value % n}: el resto no es 0.`, ar: `${value} = ${n} · ${Math.floor(value / n)} + ${value % n}: الباقي ليس 0.` })
})

const divisorRule = (n: number): HuntRule => ({
    id: `divisor-${n}`,
    label: { eu: `${ren(n)} zatitzaileak`, es: `Divisores de ${n}`, ar: `قواسم ${n}` },
    test: (value) => n % value === 0,
    why: (value) => (n % value === 0
        ? { eu: `${n} = ${value} · ${n / value}`, es: `${n} = ${value} · ${n / value}`, ar: `${n} = ${value} · ${n / value}` }
        : { eu: `${n} : ${value} ez da zehatza (hondarra ${n % value}).`, es: `${n} : ${value} no es exacta (resto ${n % value}).`, ar: `${n} : ${value} ليست تامة (الباقي ${n % value}).` })
})

const digitSumText = (value: number) => `${String(value).split('').join(' + ')} = ${String(value).split('').reduce((sum, digit) => sum + Number(digit), 0)}`

const byRule = (d: number): HuntRule => ({
    id: `by-${d}`,
    label: { eu: `${rekin(d)} zatigarriak`, es: `Divisibles por ${d}`, ar: `تقبل القسمة على ${d}` },
    test: (value) => value % d === 0,
    why: (value) => {
        if (d === 3 || d === 9) return { eu: digitSumText(value), es: digitSumText(value), ar: digitSumText(value) }
        return value % d === 0
            ? { eu: `${value} = ${d} · ${value / d}`, es: `${value} = ${d} · ${value / d}`, ar: `${value} = ${d} · ${value / d}` }
            : { eu: `${value} ez da ${rekin(d)} zatigarria (hondarra ${value % d}).`, es: `${value} no es divisible por ${d} (resto ${value % d}).`, ar: `${value} لا يقبل القسمة على ${d} (الباقي ${value % d}).` }
    }
})

const primeRule: HuntRule = {
    id: 'primes',
    label: { eu: 'Zenbaki lehenak', es: 'Números primos', ar: 'الأعداد الأولية' },
    test: isPrime,
    why: (value) => {
        if (isPrime(value)) return { eu: `${value}: 1 eta ${value} bakarrik.`, es: `${value}: solo 1 y ${value}.`, ar: `${value}: قاسماه 1 و${value} فقط.` }
        const smallest = divisors(value).find((divisor) => divisor > 1 && divisor < value) ?? value
        return { eu: `${value} = ${smallest} · ${value / smallest}: konposatua.`, es: `${value} = ${smallest} · ${value / smallest}: compuesto.`, ar: `${value} = ${smallest} · ${value / smallest}: مؤلف.` }
    }
}

const bothRule = (a: number, b: number): HuntRule => ({
    id: `both-${a}-${b}`,
    label: { eu: `${rekin(a)} eta ${rekin(b)} zatigarriak`, es: `Divisibles por ${a} y por ${b}`, ar: `تقبل القسمة على ${a} و${b}` },
    test: (value) => value % a === 0 && value % b === 0,
    why: (value) => ({
        eu: `${a}: ${value % a === 0 ? 'bai' : 'ez'} · ${b}: ${value % b === 0 ? 'bai' : 'ez'}`,
        es: `${a}: ${value % a === 0 ? 'sí' : 'no'} · ${b}: ${value % b === 0 ? 'sí' : 'no'}`,
        ar: `${a}: ${value % a === 0 ? 'نعم' : 'لا'} · ${b}: ${value % b === 0 ? 'نعم' : 'لا'}`
    })
})

export interface HuntLevel {
    rules: (random: Random) => HuntRule
    /** Range of the numbers in the grid */
    range: (rule: HuntRule) => [number, number]
    secondsPerRound: number
}

export const huntLevels: HuntLevel[] = [
    {
        rules: (random) => (random() < 0.5 ? multipleRule(pick(random, [3, 4, 6, 7, 8, 9])) : divisorRule(pick(random, [24, 30, 36, 40, 48, 60]))),
        range: (rule) => (rule.id.startsWith('divisor') ? [1, Number(rule.id.split('-')[1])] : [2, 80]),
        secondsPerRound: 14
    },
    {
        rules: (random) => byRule(pick(random, [3, 9, 11, 5, 10])),
        range: () => [100, 999],
        secondsPerRound: 20
    },
    {
        rules: (random) => (random() < 0.4 ? primeRule : bothRule(...pick(random, [[2, 3], [3, 5], [2, 5], [2, 9]] as Array<[number, number]>))),
        range: (rule) => (rule.id === 'primes' ? [2, 100] : [20, 300]),
        secondsPerRound: 20
    }
]

/** A grid of distinct numbers with between 4 and 7 right answers */
export function createHuntRound(random: Random, levelIndex: number): HuntRound {
    const level = huntLevels[levelIndex]
    for (let attempt = 0; attempt < 200; attempt += 1) {
        const rule = level.rules(random)
        const [min, max] = level.range(rule)
        const pool = Array.from({ length: max - min + 1 }, (_, index) => min + index)
        const yes = shuffle(random, pool.filter(rule.test))
        const no = shuffle(random, pool.filter((value) => !rule.test(value)))
        const count = Math.min(yes.length, randomInt(random, 4, 7))
        if (count < 4 || no.length < HUNT_CELLS - count) continue
        return { rule, numbers: shuffle(random, [...yes.slice(0, count), ...no.slice(0, HUNT_CELLS - count)]) }
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
