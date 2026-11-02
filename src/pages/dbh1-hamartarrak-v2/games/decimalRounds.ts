import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   The own games of 1. DBH decimals:
   · Move the comma: the digits sit in a place-value table with the comma
     fixed; the learner shifts them with ×10 and ÷10. Level 1: × and ÷ by
     10, 100, 1000; level 2: a product of decimals (the digits of the whole
     product are given, the comma has to be placed); level 3: × and ÷ by
     0,1, 0,01, 0,001.
   · The podium: tap the numbers from the smallest to the biggest. Level 1:
     the same number of decimals; level 2: different lengths (0,5 and 0,45);
     level 3: five numbers with zeros (0,7, 0,07, 0,705…). They are placed
     on a number line after answering.
   ========================================================================== */

/** The exponents of the columns of the table: thousands to thousandths */
export const PLACES = [3, 2, 1, 0, -1, -2, -3]
export const [TOP, BOTTOM] = [3, -3]

/** The digits written with the last one in the place 10^exponent: '345', -2 → '3,45'; '6', -2 → '0,06'; '35', 1 → '350' */
export function placed(digits: string, exponent: number): string {
    if (exponent >= 0) return digits + '0'.repeat(exponent)
    const padded = digits.padStart(-exponent + 1, '0')
    return `${padded.slice(0, exponent)},${padded.slice(exponent)}`
}

/** The same number in a formula (the comma as {,}) */
export const placedLatex = (digits: string, exponent: number) => placed(digits, exponent).replace(',', '{,}')

/** The digit in each column of the table, or null where nothing is written; the zeros the number needs are '0' */
export function columns(digits: string, exponent: number): Array<string | null> {
    const top = exponent + digits.length - 1
    return PLACES.map((place) => {
        if (place <= top && place >= exponent) return digits[top - place]
        // Zeros between the digits and the comma (or the units)
        if (place > top && place <= 0 && top < 0) return '0'
        if (place < exponent && place >= 0) return '0'
        return null
    })
}

export const fits = (digits: string, exponent: number) => exponent >= BOTTOM && exponent + digits.length - 1 <= TOP

/* ---------- Move the comma ---------- */

export const COMMA_ROUNDS = 5

export interface CommaRound {
    kind: 'power' | 'product' | 'tenth'
    digits: string
    /** The place of the last digit at the start and in the answer */
    start: number
    answer: number
    /** The question as a formula */
    question: string
    /** Level 2: the product of the whole numbers, e.g. 3\\cdot 2=6 */
    hint?: string
}

/** Digits with no zero at either end */
function someDigits(random: Random, length: number): string {
    return Array.from({ length }, (_, index) => String(index === 0 || index === length - 1 ? randomInt(random, 1, 9) : randomInt(random, 0, 9))).join('')
}

export function createCommaRound(random: Random, levelIndex: number): CommaRound {
    for (;;) {
        if (levelIndex === 1) {
            const [x, y] = [pick(random, [2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 25]), randomInt(random, 2, 9)]
            const [i, j] = [randomInt(random, 1, 2), randomInt(random, 1, 2)]
            if (i + j > 3) continue
            let product = x * y
            let start = 0
            while (product % 10 === 0) {
                product /= 10
                start += 1
            }
            const digits = String(product)
            const answer = start - i - j
            if (!fits(digits, answer) || !fits(digits, start)) continue
            return { kind: 'product', digits, start, answer, question: `${placedLatex(String(x), -i)}\\cdot ${placedLatex(String(y), -j)}`, hint: `${x}\\cdot ${y}=${x * y}` }
        }
        const digits = someDigits(random, randomInt(random, 2, 3))
        const start = randomInt(random, -3, 0)
        const k = randomInt(random, 1, 3)
        const up = random() < 0.5
        const answer = start + (up ? k : -k)
        if (!fits(digits, start) || !fits(digits, answer)) continue
        const number = placedLatex(digits, start)
        if (levelIndex === 0) return { kind: 'power', digits, start, answer, question: `${number}${up ? '\\cdot ' : '\\div '}${10 ** k}` }
        // ×0,1 moves to the right, ÷0,1 to the left
        const tenth = placedLatex('1', -k)
        return { kind: 'tenth', digits, start, answer, question: `${number}${up ? '\\div ' : '\\cdot '}${tenth}` }
    }
}

export const createCommaRounds = (random: Random, levelIndex: number) => Array.from({ length: COMMA_ROUNDS }, () => createCommaRound(random, levelIndex))

/* ---------- The podium ---------- */

export const PODIUM_ROUNDS = 5

/** A decimal as written ('2.5') and its value */
export interface Entry { text: string; value: number }
export interface PodiumRound { entries: Entry[] }

const entry = (whole: number, decimals: string): Entry => ({ text: `${whole}.${decimals}`, value: Number(`${whole}.${decimals}`) })

/** The order a learner gets reading the decimals as whole numbers (0,45 > 0,5) */
export const wrongOrder = (entries: Entry[]) => [...entries].sort((p, q) => Number(p.text.split('.')[0]) - Number(q.text.split('.')[0]) || Number(p.text.split('.')[1]) - Number(q.text.split('.')[1]))
export const rightOrder = (entries: Entry[]) => [...entries].sort((p, q) => p.value - q.value)

export function createPodiumRound(random: Random, levelIndex: number): PodiumRound {
    for (;;) {
        let entries: Entry[]
        if (levelIndex === 0) {
            const whole = randomInt(random, 0, 9)
            entries = Array.from({ length: 4 }, () => entry(whole + (random() < 0.25 ? 1 : 0), String(randomInt(random, 11, 99))))
            if (entries.some((item) => item.text.endsWith('0'))) continue
        } else if (levelIndex === 1) {
            const whole = randomInt(random, 0, 9)
            entries = [entry(whole, String(randomInt(random, 1, 9))), entry(whole, String(randomInt(random, 11, 99))), entry(whole, String(randomInt(random, 11, 99))), entry(whole, String(randomInt(random, 101, 999)))]
            if (entries.some((item) => item.text.endsWith('0'))) continue
            // The trap must bite: reading the decimals as whole numbers gives another order
            if (wrongOrder(entries).every((item, index) => item === rightOrder(entries)[index])) continue
        } else {
            const [a, b] = [randomInt(random, 1, 9), randomInt(random, 1, 9)]
            if (a === b) continue
            const whole = randomInt(random, 0, 2)
            const pool = [`${a}`, `0${a}`, `${a}${b}`, `${a}0${b}`, `0${a}${b}`, `${b}${a}`, `00${a}`].map((decimals) => entry(whole, decimals))
            entries = shuffle(random, pool).slice(0, 5)
        }
        if (new Set(entries.map((item) => item.value)).size < entries.length) continue
        return { entries: shuffle(random, entries) }
    }
}

export const createPodiumRounds = (random: Random, levelIndex: number) => Array.from({ length: PODIUM_ROUNDS }, () => createPodiumRound(random, levelIndex))
