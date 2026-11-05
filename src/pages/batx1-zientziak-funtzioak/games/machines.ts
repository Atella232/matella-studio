/* ==========================================================================
   Machines shared by «Ordena las máquinas» and «Deshaz la máquina»: one
   operation each (add n, multiply by n, divide by n, square, change the
   sign, cube, cube root, 2ˣ, log₂). A chain of machines is a composition:
   the first machine of the list acts first. The formula of a chain is
   built step by step, with brackets only where they are needed.
   ========================================================================== */

export type MachineOp = 'add' | 'mul' | 'div' | 'square' | 'neg' | 'cube' | 'cbrt' | 'exp2' | 'log2'

export interface Machine {
    op: MachineOp
    /** The number of add, mul and div */
    n?: number
}

/** The machine applied to a number; NaN where it does not exist (log₂ of a number ≤ 0) */
export function applyMachine(machine: Machine, x: number): number {
    switch (machine.op) {
        case 'add': return x + (machine.n ?? 0)
        case 'mul': return x * (machine.n ?? 1)
        case 'div': return x / (machine.n ?? 1)
        case 'square': return x * x
        case 'neg': return -x
        case 'cube': return x ** 3
        case 'cbrt': return Math.cbrt(x)
        case 'exp2': return 2 ** x
        case 'log2': return x > 0 ? Math.log2(x) : Number.NaN
    }
}

/** A chain of machines applied in order */
export const applyChain = (chain: Machine[], x: number) => chain.reduce((value, machine) => applyMachine(machine, value), x)

/** The label on the machine card: + 3, − 2, · 2, ÷ 2, x², · (−1), x³, ∛x, 2ˣ, log₂ x */
export function machineLabel(machine: Machine): string {
    const n = machine.n ?? 0
    switch (machine.op) {
        case 'add': return n < 0 ? `− ${-n}` : `+ ${n}`
        case 'mul': return n < 0 ? `· (−${-n})` : `· ${n}`
        case 'div': return `÷ ${n}`
        case 'square': return 'x²'
        case 'neg': return '· (−1)'
        case 'cube': return 'x³'
        case 'cbrt': return '∛x'
        case 'exp2': return '2ˣ'
        case 'log2': return 'log₂ x'
    }
}

/** The machine that undoes this one */
export function inverseMachine(machine: Machine): Machine {
    switch (machine.op) {
        case 'add': return { op: 'add', n: -(machine.n ?? 0) }
        case 'mul': return { op: 'div', n: machine.n }
        case 'div': return { op: 'mul', n: machine.n }
        case 'neg': return { op: 'neg' }
        case 'cube': return { op: 'cbrt' }
        case 'cbrt': return { op: 'cube' }
        case 'exp2': return { op: 'log2' }
        case 'log2': return { op: 'exp2' }
        case 'square': return { op: 'square' }
    }
}

/** The machines that undo a chain: the inverses, in reverse order */
export const inverseChain = (chain: Machine[]) => [...chain].reverse().map(inverseMachine)

export const sameMachine = (a: Machine, b: Machine) => a.op === b.op && (a.n ?? 0) === (b.n ?? 0)

/** How an expression is built, to know when it needs brackets */
type Shape = 'x' | 'sum' | 'product' | 'power' | 'negative' | 'root'

/** The formula of a chain applied to x, in LaTeX: 2x+4, (x+1)^2, \frac{x-4}{2}, \log_2(x-3) */
export function chainLatex(chain: Machine[]): string {
    let expr = 'x'
    let shape: Shape = 'x'
    for (const machine of chain) {
        const n = machine.n ?? 0
        switch (machine.op) {
            case 'add':
                expr = `${expr}${n < 0 ? `-${-n}` : `+${n}`}`
                shape = 'sum'
                break
            case 'mul':
                expr = shape === 'x' || shape === 'power' || shape === 'root' ? `${n}${expr}` : `${n}(${expr})`
                shape = 'product'
                break
            case 'div':
                expr = `\\frac{${expr}}{${n}}`
                shape = 'product'
                break
            case 'square':
            case 'cube':
                expr = shape === 'x' ? `x^${machine.op === 'square' ? 2 : 3}` : `(${expr})^${machine.op === 'square' ? 2 : 3}`
                shape = 'power'
                break
            case 'neg':
                expr = shape === 'sum' || shape === 'negative' ? `-(${expr})` : `-${expr}`
                shape = 'negative'
                break
            case 'cbrt':
                expr = `\\sqrt[3]{${expr}}`
                shape = 'root'
                break
            case 'exp2':
                expr = `2^{${expr}}`
                shape = 'power'
                break
            case 'log2':
                expr = shape === 'x' ? '\\log_2 x' : `\\log_2(${expr})`
                shape = 'product'
                break
        }
    }
    return expr
}
