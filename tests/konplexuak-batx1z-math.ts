/* ==========================================================================
   Zenbaki konplexuak · Batxilergoa 1 · Zientziak — complex arithmetic and a
   reader of LaTeX with complex numbers, shared by the unit's tests (this
   file is not a test). Numbers are [real part, imaginary part]; angles are
   in degrees.
   ========================================================================== */

export type C = [number, number]
export const D = Math.PI / 180
export const I: C = [0, 1]
export const real = (x: number): C => [x, 0]
export const add = (a: C, b: C): C => [a[0] + b[0], a[1] + b[1]]
export const sub = (a: C, b: C): C => [a[0] - b[0], a[1] - b[1]]
export const mul = (a: C, b: C): C => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]
export const div = (a: C, b: C): C => {
    const d = b[0] ** 2 + b[1] ** 2
    return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]
}
export const conj = (a: C): C => [a[0], -a[1]]
export const neg = (a: C): C => [-a[0], -a[1]]
export const abs = (a: C) => Math.hypot(a[0], a[1])
/** The argument between 0° and 360° (a turn that is almost whole counts as 0°) */
export const arg = (a: C) => {
    let angle = Math.atan2(a[1], a[0]) / D
    if (angle < -1e-9) angle += 360
    if (Math.abs(angle - 360) < 1e-9 || Math.abs(angle) < 1e-9) angle = 0
    return angle
}
export const polar = (r: number, degrees: number): C => [r * Math.cos(degrees * D), r * Math.sin(degrees * D)]
export const pow = (a: C, n: number): C => (n === 0 ? [1, 0] : n < 0 ? div([1, 0], pow(a, -n)) : mul(a, pow(a, n - 1)))
/** The n n-th roots of w, from the smallest argument */
export const roots = (w: C, n: number): C[] => Array.from({ length: n }, (_, k) => polar(abs(w) ** (1 / n), (arg(w) + 360 * k) / n))
export const sqrt = (a: C): C => roots(a, 2)[0]
export const near = (a: C, b: C) => abs(sub(a, b)) < 1e-9 * Math.max(1, abs(b))
export const sum = (list: number[]) => list.reduce((total, value) => total + value, 0)
/** The x that makes a straight-line function of x equal to 0 */
export const zeroOf = (f: (x: number) => number) => -f(0) / (f(1) - f(0))
export const firstQuadrant = (list: C[]) => list.find(([a, b]) => a > 1e-9 && b > 1e-9)!

/**
 * Complex arithmetic in LaTeX: numbers with decimal commas, i, + − · ÷, \frac, powers, square and n-th roots,
 * conjugates (\overline), moduli |…|, cos, sin and tan of angles in degrees and the polar form r_{α}. A degree
 * sign is dropped. Null when there is any other letter or command.
 */
export function evaluate(latex: string): C | null {
    const source = latex
        .replace(/\\left|\\right/g, '')
        .replace(/\\operatorname\{(sen|tg)\}/g, '\\$1')
        .replace(/\{,\}/g, '.')
        .replace(/\\[,;! ]/g, ' ')
        .replace(/\\dfrac/g, '\\frac')
    let at = 0
    class Unreadable extends Error {}
    const fail = (): never => {
        throw new Unreadable()
    }
    const skip = () => {
        while (source[at] === ' ') at++
    }
    const peek = () => {
        skip()
        return source[at]
    }
    const command = () => {
        skip()
        const match = /^\\[a-zA-Z]+/.exec(source.slice(at))
        return match ? match[0] : null
    }
    const expect = (char: string) => {
        if (peek() !== char) fail()
        at++
    }
    const group = (): C => {
        expect('{')
        const value = expression()
        expect('}')
        return value
    }
    const realOf = (value: C) => (Math.abs(value[1]) < 1e-12 ? value[0] : fail())
    const startsAtom = () => {
        const next = peek()
        if (next === undefined) return false
        if (/[\d.(i{]/.test(next)) return true
        return ['\\frac', '\\sqrt', '\\overline', '\\cos', '\\sin', '\\sen', '\\tan', '\\tg'].includes(command() ?? '')
    }
    function atom(): C {
        const next = peek()
        if (next === undefined) return fail()
        if (/[\d.]/.test(next)) {
            const match = /^\d*\.?\d+/.exec(source.slice(at))!
            at += match[0].length
            if (source[at] === '°') at++
            return real(Number(match[0]))
        }
        if (next === 'i') {
            at++
            if (/[a-zA-Z]/.test(source[at] ?? '')) fail()
            return I
        }
        if (next === '(') {
            at++
            const value = expression()
            expect(')')
            return value
        }
        if (next === '{') return group()
        if (next === '|') {
            at++
            const value = expression()
            expect('|')
            return real(abs(value))
        }
        const name = command()
        if (name === '\\frac') {
            at += name.length
            const top = group()
            return div(top, group())
        }
        if (name === '\\sqrt') {
            at += name.length
            if (peek() === '[') {
                at++
                const index = realOf(expression())
                expect(']')
                const radicand = realOf(group())
                if (radicand < 0) fail()
                return real(radicand ** (1 / index))
            }
            return sqrt(group())
        }
        if (name === '\\overline') {
            at += name.length
            return conj(group())
        }
        if (name && ['\\cos', '\\sin', '\\sen', '\\tan', '\\tg'].includes(name)) {
            at += name.length
            const angle = realOf(peek() === '(' ? atom() : power())
            const radians = angle * D
            return real(name === '\\cos' ? Math.cos(radians) : name === '\\tan' || name === '\\tg' ? Math.tan(radians) : Math.sin(radians))
        }
        return fail()
    }
    function power(): C {
        let value = atom()
        for (;;) {
            const next = peek()
            if (next === '^') {
                at++
                const exponent = realOf(peek() === '{' ? group() : atom())
                if (!Number.isInteger(exponent)) fail()
                value = pow(value, exponent)
            } else if (next === '_') {
                at++
                value = polar(realOf(value), realOf(peek() === '{' ? group() : atom()))
            } else if (next === '°') at++
            else return value
        }
    }
    function unary(): C {
        const next = peek()
        if (next === '-') {
            at++
            return neg(unary())
        }
        if (next === '+') {
            at++
            return unary()
        }
        return power()
    }
    function term(): C {
        let value = unary()
        for (;;) {
            const name = command()
            if (name === '\\cdot') {
                at += name.length
                value = mul(value, unary())
            } else if (name === '\\div') {
                at += name.length
                value = div(value, unary())
            } else if (startsAtom()) value = mul(value, power())
            else return value
        }
    }
    function expression(): C {
        let value = term()
        for (;;) {
            const next = peek()
            if (next === '+') {
                at++
                value = add(value, term())
            } else if (next === '-') {
                at++
                value = sub(value, term())
            } else return value
        }
    }
    try {
        if (!source.trim()) return null
        const value = expression()
        skip()
        return at === source.length && value.every(Number.isFinite) ? value : null
    } catch (error) {
        if (error instanceof Unreadable || error instanceof RangeError) return null
        throw error
    }
}
