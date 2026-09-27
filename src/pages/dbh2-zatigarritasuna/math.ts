/* ==========================================================================
   Zatigarritasuna · number theory used by the lab, the games and the tests
   ========================================================================== */

export function gcd(left: number, right: number): number {
    let a = Math.abs(left)
    let b = Math.abs(right)
    while (b !== 0) [a, b] = [b, a % b]
    return a
}

export function lcm(left: number, right: number): number {
    if (left === 0 || right === 0) return 0
    return Math.abs(left / gcd(left, right) * right)
}

export const gcdOf = (numbers: number[]) => numbers.reduce(gcd)
export const lcmOf = (numbers: number[]) => numbers.reduce(lcm)

export function divisors(value: number): number[] {
    const small: number[] = []
    const large: number[] = []
    for (let divisor = 1; divisor * divisor <= value; divisor += 1) {
        if (value % divisor !== 0) continue
        small.push(divisor)
        if (divisor !== value / divisor) large.unshift(value / divisor)
    }
    return [...small, ...large]
}

export function isPrime(value: number): boolean {
    if (value < 2) return false
    for (let divisor = 2; divisor * divisor <= value; divisor += 1) if (value % divisor === 0) return false
    return true
}

/** Prime factors with their exponents, smallest prime first: 360 → [[2,3],[3,2],[5,1]] */
export function factorize(value: number): Array<[number, number]> {
    const factors: Array<[number, number]> = []
    let rest = value
    for (let prime = 2; prime * prime <= rest; prime += 1) {
        let exponent = 0
        while (rest % prime === 0) {
            rest /= prime
            exponent += 1
        }
        if (exponent > 0) factors.push([prime, exponent])
    }
    if (rest > 1) factors.push([rest, 1])
    return factors
}

/** LaTeX of a factorization: 2^{3}\cdot 3^{2}\cdot 5 */
export function factorLatex(factors: Array<[number, number]>): string {
    if (factors.length === 0) return '1'
    return factors.map(([prime, exponent]) => (exponent > 1 ? `${prime}^{${exponent}}` : String(prime))).join('\\cdot ')
}

export const digitsOf = (value: number) => String(Math.abs(value)).split('').map(Number)

export const digitSum = (value: number) => digitsOf(value).reduce((sum, digit) => sum + digit, 0)

/** Rule of 11: sums of the digits in even and odd places, counted from the units */
export function elevenSums(value: number): { even: number; odd: number } {
    const digits = digitsOf(value).reverse()
    return digits.reduce((sums, digit, index) => (index % 2 === 0 ? { ...sums, odd: sums.odd + digit } : { ...sums, even: sums.even + digit }), { even: 0, odd: 0 })
}

/**
 * Rule of 7 from the class handout: remove the units digit and subtract its
 * double from what is left, until the number is small. Returns every step.
 */
export function sevenSteps(value: number): Array<{ rest: number; units: number; result: number }> {
    const steps: Array<{ rest: number; units: number; result: number }> = []
    let current = Math.abs(value)
    while (current >= 70 && steps.length < 12) {
        const rest = Math.floor(current / 10)
        const units = current % 10
        const result = Math.abs(rest - 2 * units)
        steps.push({ rest, units, result })
        current = result
    }
    return steps
}
