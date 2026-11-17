import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'

/* ==========================================================================
   M-J2 · Banatu lagina (Reparte la muestra): three strata A, B and C and a
   proportional sample of size n. Level 1: the shares come out exact.
   Level 2: they do not, and the missing places go to the largest
   remainders. Level 3: the other way round, a stratum's share in the
   sample gives the size of the stratum. Three options: the right one,
   the equal allocation (or the shares rounded down, or the rest of the
   population) and the shares given to the wrong strata. Pure logic.
   ========================================================================== */

export const ALLOCATE_ROUNDS = 6

export interface AllocateRound {
    prompt: LocalizedText
    options: string[]
    answer: string
    /** The worked line shown after answering */
    work: string
}

export const triple = (values: number[]) => `(${values.join(',\\ ')})`

/** Proportional allocation with the largest remainders */
export function largestRemainders(sizes: number[], n: number): number[] {
    const total = sizes.reduce((a, b) => a + b, 0)
    const raw = sizes.map((size) => (n * size) / total)
    const shares = raw.map((value) => Math.floor(value + 1e-9))
    const missing = n - shares.reduce((a, b) => a + b, 0)
    const order = raw.map((value, index) => ({ rest: value - Math.floor(value + 1e-9), index })).sort((a, b) => b.rest - a.rest)
    for (let k = 0; k < missing; k += 1) shares[order[k].index] += 1
    return shares
}

const strataText = (sizes: number[]) => `N_A=${sizes[0]},\\ N_B=${sizes[1]},\\ N_C=${sizes[2]}`

function exactRound(random: Random): AllocateRound | null {
    const n = pick(random, [20, 30, 40, 50, 60])
    const parts = [randomInt(random, 2, 8), randomInt(random, 2, 8), randomInt(random, 1, 6)]
    const unit = pick(random, [10, 20, 50])
    const sizes = parts.map((part) => part * unit)
    const total = sizes.reduce((a, b) => a + b, 0)
    const shares = sizes.map((size) => (n * size) / total)
    if (!shares.every(Number.isInteger) || new Set(shares).size < 3) return null
    const equal = n % 3 === 0 ? [n / 3, n / 3, n / 3] : null
    const swapped = [shares[2], shares[0], shares[1]]
    const options = [triple(shares), triple(equal ?? [shares[1], shares[2], shares[0]]), triple(swapped)]
    if (new Set(options).size < 3) return null
    return {
        prompt: say(`Geruzak: $${strataText(sizes)}$. ${n} laguneko lagin proportzionala. Zenbat geruza bakoitzetik?`, `Estratos: $${strataText(sizes)}$. Muestra proporcional de ${n}. ¿Cuántos de cada estrato?`, `الطبقات: $${strataText(sizes)}$. عيّنة تناسبية من ${n}. كم من كل طبقة؟`, `Strata: $${strataText(sizes)}$. A proportional sample of ${n}. How many from each stratum?`),
        options: shuffle(random, options),
        answer: options[0],
        work: `\\frac{${n}}{${total}}\\cdot ${sizes[0]}=${shares[0]}`
    }
}

function remaindersRound(random: Random): AllocateRound | null {
    const n = pick(random, [20, 25, 30, 40])
    const sizes = [randomInt(random, 20, 60) * 10, randomInt(random, 15, 45) * 10, randomInt(random, 8, 30) * 10]
    const total = sizes.reduce((a, b) => a + b, 0)
    const raw = sizes.map((size) => (n * size) / total)
    if (raw.some(Number.isInteger) || raw.some((value) => Math.abs(value - Math.round(value * 100) / 100) > 1e-9)) return null
    if (new Set(raw.map((value) => Math.round((value - Math.floor(value)) * 100))).size < 3) return null
    const right = largestRemainders(sizes, n)
    const floors = raw.map((value) => Math.floor(value))
    if (floors.reduce((a, b) => a + b, 0) === n) return null
    const swapped = [right[2], right[0], right[1]]
    const options = [triple(right), triple(floors), triple(swapped)]
    if (new Set(options).size < 3) return null
    const rawText = raw.map((value) => String(value).replace('.', '{,}')).join(',\\ ')
    return {
        prompt: say(`Geruzak: $${strataText(sizes)}$. ${n} laguneko lagin proportzionala, hondar handienekin. Zenbat geruza bakoitzetik?`, `Estratos: $${strataText(sizes)}$. Muestra proporcional de ${n}, con los mayores restos. ¿Cuántos de cada estrato?`, `الطبقات: $${strataText(sizes)}$. عيّنة تناسبية من ${n} بأكبر البواقي. كم من كل طبقة؟`, `Strata: $${strataText(sizes)}$. A proportional sample of ${n}, with the largest remainders. How many from each stratum?`),
        options: shuffle(random, options),
        answer: options[0],
        work: `${rawText}\\ \\to\\ ${right.join(',\\ ')}`
    }
}

function inverseRound(random: Random): AllocateRound | null {
    const ratio = pick(random, [10, 20, 25, 40, 50])
    const n = pick(random, [40, 50, 60, 80, 100])
    const m = randomInt(random, 6, Math.floor(n / 2))
    const population = n * ratio
    const stratum = m * ratio
    const options = [String(stratum), String(population - stratum), String(m * n)]
    if (new Set(options).size < 3 || population - stratum <= 0) return null
    return {
        prompt: say(`${population} kideko populazio batetik ${n} laguneko lagin proportzionala hartzen da, eta A geruzak ${m} kide ditu laginean. Zenbat kide ditu A geruzak?`, `De una población de ${population} se toma una muestra proporcional de ${n}, y el estrato A tiene ${m} en la muestra. ¿Cuántos miembros tiene el estrato A?`, `من مجتمع من ${population} تؤخذ عيّنة تناسبية من ${n}، وللطبقة A في العيّنة ${m}. كم عضوًا في الطبقة A؟`, `From a population of ${population} a proportional sample of ${n} is taken, and stratum A has ${m} in the sample. How many members does stratum A have?`),
        options: shuffle(random, options),
        answer: options[0],
        work: `N_A=${m}\\cdot\\frac{${population}}{${n}}=${stratum}`
    }
}

/** Six rounds of one level, with no two the same */
export function createAllocateRounds(random: Random, level: number): AllocateRound[] {
    const make = [exactRound, remaindersRound, inverseRound][level] ?? exactRound
    const rounds: AllocateRound[] = []
    for (let attempt = 0; rounds.length < ALLOCATE_ROUNDS && attempt < 5000; attempt += 1) {
        const round = make(random)
        if (round && !rounds.some((other) => other.prompt.es === round.prompt.es)) rounds.push(round)
    }
    return rounds
}
