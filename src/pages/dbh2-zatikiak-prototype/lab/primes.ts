import type { LocalizedText } from '../content.ts'
import { gcd } from '../math/fraction.ts'
import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'

/* ==========================================================================
   Simplifying with prime factors: the numerator and the denominator as rows
   of prime tiles. Crossing out a pair of equal tiles, one above and one
   below, divides both terms by that prime. What is crossed out is the
   greatest common divisor; crossed out once, times what is left above and
   below, is the least common multiple.
   ========================================================================== */

export type FactorRow = 'top' | 'bottom'

export interface PrimesState {
    numerator: number
    denominator: number
    /** Crossed-out pairs: index of a tile in the top row, and of the equal tile in the bottom row */
    pairs: Array<[number, number]>
    selected: { row: FactorRow; index: number } | null
    /** The last tap tried to pair two different primes */
    mismatch: boolean
}

export const PRIMES_LIMITS = { minNumerator: 1, minDenominator: 2, max: 999 } as const

export const initialPrimesState: PrimesState = { numerator: 12, denominator: 18, pairs: [], selected: null, mismatch: false }

/** The prime factors of n, smallest first: 84 → [2, 2, 3, 7]; 1 has none */
export function primeFactors(n: number): number[] {
    const factors: number[] = []
    let rest = n
    for (let factor = 2; factor * factor <= rest; factor += 1) {
        while (rest % factor === 0) {
            factors.push(factor)
            rest /= factor
        }
    }
    if (rest > 1) factors.push(rest)
    return factors
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** New numbers start with nothing crossed out */
export function setPrimesNumbers(state: PrimesState, patch: { numerator?: number; denominator?: number }): PrimesState {
    return {
        numerator: clamp(patch.numerator ?? state.numerator, PRIMES_LIMITS.minNumerator, PRIMES_LIMITS.max),
        denominator: clamp(patch.denominator ?? state.denominator, PRIMES_LIMITS.minDenominator, PRIMES_LIMITS.max),
        pairs: [],
        selected: null,
        mismatch: false
    }
}

export const clearPrimes = (state: PrimesState): PrimesState => ({ ...state, pairs: [], selected: null, mismatch: false })

/**
 * A tap on a tile: tapping a crossed-out tile brings its pair back; a first
 * tap selects; a tap on the other row crosses out both tiles when they are
 * the same prime, and is a mismatch otherwise.
 */
export function tapFactor(state: PrimesState, row: FactorRow, index: number): PrimesState {
    const top = primeFactors(state.numerator)
    const bottom = primeFactors(state.denominator)
    if (index < 0 || index >= (row === 'top' ? top : bottom).length) return state
    const side = row === 'top' ? 0 : 1
    if (state.pairs.some((pair) => pair[side] === index)) {
        return { ...state, pairs: state.pairs.filter((pair) => pair[side] !== index), selected: null, mismatch: false }
    }
    const { selected } = state
    if (selected === null || selected.row === row) {
        const same = selected?.row === row && selected.index === index
        return { ...state, selected: same ? null : { row, index }, mismatch: false }
    }
    const [topIndex, bottomIndex] = row === 'top' ? [index, selected.index] : [selected.index, index]
    if (top[topIndex] !== bottom[bottomIndex]) return { ...state, selected: null, mismatch: true }
    return { ...state, pairs: [...state.pairs, [topIndex, bottomIndex]], selected: null, mismatch: false }
}

/** Crosses out every common pair: the worked solution */
export function pairAll(state: PrimesState): PrimesState {
    const top = primeFactors(state.numerator)
    const bottom = primeFactors(state.denominator)
    const usedBottom = new Set<number>()
    const pairs: Array<[number, number]> = []
    top.forEach((prime, topIndex) => {
        const bottomIndex = bottom.findIndex((other, index) => other === prime && !usedBottom.has(index))
        if (bottomIndex >= 0) {
            usedBottom.add(bottomIndex)
            pairs.push([topIndex, bottomIndex])
        }
    })
    return { ...state, pairs, selected: null, mismatch: false }
}

const product = (values: number[]) => values.reduce((total, value) => total * value, 1)

export interface PrimesSummary {
    top: number[]
    bottom: number[]
    /** Which tiles of each row are crossed out */
    crossedTop: boolean[]
    crossedBottom: boolean[]
    /** The crossed-out primes, one per pair */
    crossed: number[]
    /** What is left above and below */
    leftTop: number[]
    leftBottom: number[]
    /** No pair is left to cross out: the fraction left is irreducible */
    complete: boolean
    /** Product of the crossed-out primes: the gcd once complete */
    divisor: number
    /** Crossed out once, times what is left above and below: the lcm once complete */
    multiple: number
}

export function primesSummary(state: PrimesState): PrimesSummary {
    const top = primeFactors(state.numerator)
    const bottom = primeFactors(state.denominator)
    const crossedTop = top.map((_, index) => state.pairs.some((pair) => pair[0] === index))
    const crossedBottom = bottom.map((_, index) => state.pairs.some((pair) => pair[1] === index))
    const crossed = state.pairs.map(([topIndex]) => top[topIndex])
    const leftTop = top.filter((_, index) => !crossedTop[index])
    const leftBottom = bottom.filter((_, index) => !crossedBottom[index])
    return {
        top,
        bottom,
        crossedTop,
        crossedBottom,
        crossed,
        leftTop,
        leftBottom,
        complete: gcd(product(leftTop), product(leftBottom)) === 1,
        divisor: product(crossed),
        multiple: product(crossed) * product(leftTop) * product(leftBottom)
    }
}

/* ---------- Challenges ---------- */

/** In Arabic, a piece of arithmetic keeps its left-to-right order (LRI … PDI) */
const ltr = (text: string) => `\u2066${text}\u2069`

const numbersAre = (state: PrimesState, a: number, b: number, either = false) =>
    (state.numerator === a && state.denominator === b) || (either && state.numerator === b && state.denominator === a)

const done = (state: PrimesState) => primesSummary(state).complete && state.pairs.length > 0

export const primesChallenges: LabChallenge<PrimesState>[] = [
    {
        id: 1701,
        prompt: {
            eu: 'Sinplifikatu 84/126: marratu faktore komunak, bat ere geratzen ez den arte.',
            es: 'Simplifica 84/126: tacha los factores comunes hasta que no quede ninguno.',
            en: 'Simplify 84/126: cross out the common factors until none is left.',
            ar: 'اختزل 84/126: اشطب العوامل المشتركة حتى لا يبقى أيّ منها.'
        },
        hint: {
            eu: '84 = 2·2·3·7 eta 126 = 2·3·3·7: marratu 2 bat, 3 bat eta 7 bat alde bakoitzean.',
            es: '84 = 2·2·3·7 y 126 = 2·3·3·7: tacha un 2, un 3 y un 7 de cada lado.',
            en: '84 = 2·2·3·7 and 126 = 2·3·3·7: cross out one 2, one 3 and one 7 on each side.',
            ar: `${ltr('84 = 2·2·3·7')} و${ltr('126 = 2·3·3·7')}: اشطب 2 و3 و7 من كل جهة.`
        },
        isSolved: (state) => numbersAre(state, 84, 126) && done(state)
    },
    {
        id: 1702,
        prompt: {
            eu: 'Aurkitu 60 eta 90 zenbakien ZKH, faktore komunak marratuz.',
            es: 'Halla el m.c.d. de 60 y 90 tachando sus factores comunes.',
            en: 'Find the GCD of 60 and 90 by crossing out their common factors.',
            ar: 'جد ق.م.أ للعددين 60 و90 بشطب عواملهما المشتركة.'
        },
        hint: {
            eu: 'Idatzi 60 goian eta 90 behean. ZKH marratutakoen biderkadura da.',
            es: 'Escribe 60 arriba y 90 abajo. El m.c.d. es el producto de lo tachado.',
            en: 'Write 60 on top and 90 below. The GCD is the product of what you crossed out.',
            ar: 'اكتب 60 في الأعلى و90 في الأسفل. ق.م.أ هو حاصل ضرب المشطوب.'
        },
        isSolved: (state) => numbersAre(state, 60, 90, true) && done(state)
    },
    {
        id: 1703,
        prompt: {
            eu: '5/12 + 7/18 batzeko, 12 eta 18 zenbakien MKT behar duzu: idatzi biak, marratu komunak eta begiratu MKT.',
            es: 'Para sumar 5/12 + 7/18 necesitas el m.c.m. de 12 y 18: escríbelos, tacha los comunes y mira el m.c.m.',
            en: 'To add 5/12 + 7/18 you need the LCM of 12 and 18: write them down, cross out the common factors and look at the LCM.',
            ar: `لجمع ${ltr('5/12 + 7/18')} تحتاج إلى م.م.أ للعددين 12 و18: اكتبهما واشطب المشتركة وانظر إلى م.م.أ.`
        },
        hint: {
            eu: 'MKT = marratutakoak (behin) bider goian eta behean geratzen dena.',
            es: 'El m.c.m. es lo tachado (una vez) por todo lo que queda arriba y abajo.',
            en: 'The LCM is what gets crossed out (once) by everything left on the top and bottom.',
            ar: 'م.م.أ = المشطوب (مرة واحدة) مضروبًا في كل ما يبقى في الأعلى والأسفل.'
        },
        isSolved: (state) => numbersAre(state, 12, 18, true) && done(state)
    },
    {
        id: 1704,
        prompt: {
            eu: 'Idatzi hiru faktore-bikote marratzeko aukera ematen duen zatiki bat, eta marratu guztiak.',
            es: 'Escribe una fracción en la que puedas tachar tres parejas de factores, y táchalas todas.',
            en: 'Write a fraction in which you can cross out three pairs of factors, and cross them all out.',
            ar: 'اكتب كسرًا يمكنك فيه شطب ثلاثة أزواج من العوامل، واشطبها كلها.'
        },
        hint: {
            eu: 'Biderkatu zatiki baten bi gaiak 2·3·5 = 30 zenbakiaz: adibidez, 1/2 → 30/60.',
            es: 'Multiplica los dos términos de una fracción por 2·3·5 = 30: por ejemplo, 1/2 → 30/60.',
            en: 'Multiply both terms of a fraction by 2·3·5 = 30: for example, 1/2 → 30/60.',
            ar: `اضرب حدّي كسر في ${ltr('2·3·5 = 30')}: مثلًا ${ltr('1/2 → 30/60')}.`
        },
        isSolved: (state) => done(state) && state.pairs.length >= 3
    }
]

/* ---------- New fractions and endless practice ---------- */

const SMALL_PRIMES = [2, 2, 2, 3, 3, 5, 7]

/** A fraction worth simplifying: a common part of 2–3 small primes times two coprime numbers, all within 999 */
export function randomPrimesFraction(random: () => number): { numerator: number; denominator: number } {
    for (;;) {
        const common = product(Array.from({ length: randomInt(random, 2, 3) }, () => pick(random, SMALL_PRIMES)))
        const a = randomInt(random, 1, 12)
        const b = randomInt(random, 2, 15)
        if (a === b || gcd(a, b) !== 1) continue
        const numerator = a * common
        const denominator = b * common
        if (denominator <= PRIMES_LIMITS.max && numerator <= PRIMES_LIMITS.max) return { numerator, denominator }
    }
}

export const primesExtra: LabChallengeMaker<PrimesState> = (random) => {
    const { numerator, denominator } = randomPrimesFraction(random)
    const text = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
    return {
        prompt: text(
            `Sinplifikatu ${numerator}/${denominator}: marratu faktore komun guztiak.`,
            `Simplifica ${numerator}/${denominator}: tacha todos los factores comunes.`,
            `اختزل ${numerator}/${denominator}: اشطب كل العوامل المشتركة.`, `Simplify ${numerator}/${denominator}: cross out all the common factors.`
        ),
        hint: text(
            `${numerator} = ${primeFactors(numerator).join('·')} eta ${denominator} = ${primeFactors(denominator).join('·')}.`,
            `${numerator} = ${primeFactors(numerator).join('·')} y ${denominator} = ${primeFactors(denominator).join('·')}.`,
            `${ltr(`${numerator} = ${primeFactors(numerator).join('·')}`)} و${ltr(`${denominator} = ${primeFactors(denominator).join('·')}`)}.`, `${numerator} = ${primeFactors(numerator).join('·')} and ${denominator} = ${primeFactors(denominator).join('·')}.`
        ),
        isSolved: (state) => numbersAre(state, numerator, denominator) && done(state),
        solution: pairAll(setPrimesNumbers(initialPrimesState, { numerator, denominator }))
    }
}
