/* ==========================================================================
   Polinomioak eta zatiki aljebraikoak · 4. DBH akademikoak — pure helpers
   for polynomials written as coefficient lists, highest degree first
   ([1, -6, 11, -6] is x³ − 6x² + 11x − 6). Used by the lab, the games and
   the tests: values, products, long division, Ruffini, integer roots,
   Tartaglia's triangle and the LaTeX of a polynomial.
   ========================================================================== */

export type Poly = number[]

/** Drops the leading zeros (the zero polynomial stays [0]) */
export function trim(p: Poly): Poly {
    const first = p.findIndex((c) => c !== 0)
    return first === -1 ? [0] : p.slice(first)
}

export const degree = (p: Poly) => trim(p).length - 1

/** Horner: P(a) */
export const evaluate = (p: Poly, a: number) => p.reduce((value, c) => value * a + c, 0) + 0

export function add(p: Poly, q: Poly): Poly {
    const length = Math.max(p.length, q.length)
    const pad = (r: Poly) => [...Array(length - r.length).fill(0), ...r]
    const [a, b] = [pad(p), pad(q)]
    return trim(a.map((c, i) => c + b[i] + 0))
}

export const scale = (p: Poly, k: number): Poly => trim(p.map((c) => c * k + 0))

export function multiply(p: Poly, q: Poly): Poly {
    const result = Array(p.length + q.length - 1).fill(0)
    p.forEach((a, i) => q.forEach((b, j) => { result[i + j] += a * b }))
    return trim(result.map((c) => c + 0))
}

export const power = (p: Poly, n: number): Poly => Array.from({ length: n }).reduce<Poly>((acc) => multiply(acc, p), [1])

/** The product of (x − r) for every root */
export const fromRoots = (roots: number[], lead = 1): Poly => roots.reduce<Poly>((acc, r) => multiply(acc, [1, -r]), [lead])

/** Long division with integer or fractional steps: quotient and remainder */
export function divide(p: Poly, d: Poly): { quotient: Poly; remainder: Poly } {
    const divisor = trim(d)
    let rest = trim(p).slice()
    const quotient: number[] = []
    while (rest.length >= divisor.length && !(rest.length === 1 && rest[0] === 0)) {
        const factor = rest[0] / divisor[0]
        quotient.push(factor + 0)
        const product = [...divisor.map((c) => c * factor), ...Array(rest.length - divisor.length).fill(0)]
        rest = rest.map((c, i) => c - product[i]).slice(1)
        if (rest.length === 0) rest = [0]
    }
    return { quotient: quotient.length ? trim(quotient) : [0], remainder: trim(rest.map((c) => c + 0)) }
}

/** The Ruffini table for P(x) : (x − a): the middle row and the bottom row (last number = remainder) */
export function ruffini(p: Poly, a: number): { products: Array<number | null>; bottom: number[] } {
    const bottom: number[] = []
    const products: Array<number | null> = []
    p.forEach((c, i) => {
        const product = i === 0 ? null : bottom[i - 1] * a + 0
        products.push(product)
        bottom.push(c + (product ?? 0) + 0)
    })
    return { products, bottom }
}

/** Quotient of P(x) : (x − a) by Ruffini */
export const deflate = (p: Poly, a: number) => ruffini(p, a).bottom.slice(0, -1)

/** Positive and negative divisors of n (n ≠ 0), smallest absolute value first */
export function divisors(n: number): number[] {
    const m = Math.abs(n)
    const result: number[] = []
    for (let d = 1; d <= m; d += 1) if (m % d === 0) result.push(d, -d)
    return result
}

/** Integer roots with their multiplicity, found as a learner would: divisors of the constant term, then Ruffini */
export function integerRoots(p: Poly): number[] {
    let rest = trim(p)
    const roots: number[] = []
    while (rest.length > 1 && rest[rest.length - 1] === 0) {
        roots.push(0)
        rest = rest.slice(0, -1)
    }
    let found = true
    while (found && rest.length > 1) {
        found = false
        for (const candidate of divisors(rest[rest.length - 1])) {
            if (evaluate(rest, candidate) === 0) {
                roots.push(candidate)
                rest = deflate(rest, candidate)
                found = true
                break
            }
        }
    }
    return roots.sort((a, b) => a - b)
}

/** Row n of Tartaglia's triangle: the coefficients of (a + b)ⁿ */
export function tartaglia(n: number): number[] {
    let row = [1]
    for (let k = 0; k < n; k += 1) row = [1, ...row.slice(1).map((c, i) => c + row[i]), 1]
    return row
}

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))

/** LaTeX of a polynomial in the letter x: [1, 0, -5, 6] → x^{3}-5x+6 */
export function polyLatex(p: Poly, letter = 'x'): string {
    const terms = trim(p)
    const top = terms.length - 1
    let out = ''
    terms.forEach((c, i) => {
        if (c === 0) return
        const power = top - i
        const size = Math.abs(c)
        const body = power === 0 ? `${size}` : `${size === 1 ? '' : size}${letter}${power === 1 ? '' : `^{${power}}`}`
        out += c < 0 ? `-${body}` : out ? `+${body}` : body
    })
    return out || '0'
}

/** LaTeX of x − a: x-3, x+2, x */
export const binomialLatex = (a: number, letter = 'x') => (a === 0 ? letter : a > 0 ? `${letter}-${a}` : `${letter}+${-a}`)
