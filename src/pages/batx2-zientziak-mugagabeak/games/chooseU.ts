import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'

/* ==========================================================================
   J2 · Aukeratu u / Elige la u: an integral of a product and three ways to
   split it into u and dv. Only one makes the new integral ∫ v du easier:
   the polynomial (or the logarithm, or the arc) as u. The other two are
   the reversed split, where the degree goes up or ∫ ln x would be needed,
   and the whole product as u with dv = dx. Level 1, x times e^(kx), sin kx
   or cos kx; level 2, x², x³ and xⁿ ln x; level 3, a single factor with
   dv = dx (ln x, arctan x) and x·arctan x. eˣ·sin x is left out: there
   both splits work. Every round keeps the integrand and its
   antiderivative, and the first step of the good split.
   ========================================================================== */

export const CHOOSE_U_ROUNDS = 6

export interface ChooseUOption {
    u: string
    dv: string
}

export interface ChooseURound {
    integrand: string
    options: ChooseUOption[]
    answer: number
    /** du and v of the good split */
    duv: string
    /** The first step of the good split: = uv − ∫ v du */
    step: string
    /** The kind of each wrong option, for the explanation: 'reversed' or 'whole' */
    kinds: Array<'right' | 'reversed' | 'whole'>
    fn: (x: number) => number
    F: (x: number) => number
}

interface Made {
    integrand: string
    u: string
    dv: string
    /** u of the reversed split and its dv, when the integrand is a product of two factors */
    reversed: ChooseUOption
    duv: string
    step: string
    fn: (x: number) => number
    F: (x: number) => number
}

const inside = (k: number) => (k === 1 ? 'x' : `${k}x`)
const exp = (k: number) => (k === 1 ? 'e^x' : k === -1 ? 'e^{-x}' : `e^{${k}x}`)
/** 1/k as LaTeX in front of something: '' for 1, '-' for −1, \frac{1}{k} otherwise */
const over = (k: number) => (k === 1 ? '' : k === -1 ? '-' : `${k < 0 ? '-' : ''}\\frac{1}{${Math.abs(k)}}`)

function xTimesExp(random: Random): Made {
    const k = pick(random, [1, 2, 3, -1])
    const e = exp(k)
    return {
        integrand: `x${e}`, u: 'x', dv: `${e}\\,dx`, reversed: { u: e, dv: 'x\\,dx' },
        duv: `du=dx\\qquad v=${over(k)}${e}`,
        step: `=${over(k)}x${e}-${over(k)}\\int ${e}\\,dx`.replace('--', '+'),
        fn: (x) => x * Math.exp(k * x),
        F: (x) => Math.exp(k * x) * (x / k - 1 / (k * k))
    }
}

function xTimesTrig(random: Random): Made {
    const k = pick(random, [1, 2, 3])
    const t = inside(k)
    if (random() < 0.5) {
        return {
            integrand: `x\\cos ${t}`, u: 'x', dv: `\\cos ${t}\\,dx`, reversed: { u: `\\cos ${t}`, dv: 'x\\,dx' },
            duv: `du=dx\\qquad v=${over(k)}\\sin ${t}`,
            step: `=${over(k)}x\\sin ${t}-${over(k)}\\int\\sin ${t}\\,dx`,
            fn: (x) => x * Math.cos(k * x),
            F: (x) => (x * Math.sin(k * x)) / k + Math.cos(k * x) / (k * k)
        }
    }
    return {
        integrand: `x\\sin ${t}`, u: 'x', dv: `\\sin ${t}\\,dx`, reversed: { u: `\\sin ${t}`, dv: 'x\\,dx' },
        duv: `du=dx\\qquad v=-${over(k)}\\cos ${t}`,
        step: `=-${over(k)}x\\cos ${t}+${over(k)}\\int\\cos ${t}\\,dx`,
        fn: (x) => x * Math.sin(k * x),
        F: (x) => (-x * Math.cos(k * x)) / k + Math.sin(k * x) / (k * k)
    }
}

function higherDegree(random: Random): Made {
    return pick(random, [
        {
            integrand: 'x^2e^x', u: 'x^2', dv: 'e^x\\,dx', reversed: { u: 'e^x', dv: 'x^2\\,dx' },
            duv: 'du=2x\\,dx\\qquad v=e^x', step: '=x^2e^x-\\int 2xe^x\\,dx',
            fn: (x: number) => x * x * Math.exp(x), F: (x: number) => Math.exp(x) * (x * x - 2 * x + 2)
        },
        {
            integrand: 'x^3e^x', u: 'x^3', dv: 'e^x\\,dx', reversed: { u: 'e^x', dv: 'x^3\\,dx' },
            duv: 'du=3x^2\\,dx\\qquad v=e^x', step: '=x^3e^x-\\int 3x^2e^x\\,dx',
            fn: (x: number) => x ** 3 * Math.exp(x), F: (x: number) => Math.exp(x) * (x ** 3 - 3 * x * x + 6 * x - 6)
        },
        {
            integrand: 'x^2\\cos x', u: 'x^2', dv: '\\cos x\\,dx', reversed: { u: '\\cos x', dv: 'x^2\\,dx' },
            duv: 'du=2x\\,dx\\qquad v=\\sin x', step: '=x^2\\sin x-\\int 2x\\sin x\\,dx',
            fn: (x: number) => x * x * Math.cos(x), F: (x: number) => x * x * Math.sin(x) + 2 * x * Math.cos(x) - 2 * Math.sin(x)
        },
        {
            integrand: 'x\\ln x', u: '\\ln x', dv: 'x\\,dx', reversed: { u: 'x', dv: '\\ln x\\,dx' },
            duv: 'du=\\frac{dx}{x}\\qquad v=\\frac{x^2}{2}', step: '=\\frac{x^2}{2}\\ln x-\\int\\frac{x}{2}\\,dx',
            fn: (x: number) => x * Math.log(x), F: (x: number) => (x * x / 2) * Math.log(x) - x * x / 4
        },
        {
            integrand: 'x^2\\ln x', u: '\\ln x', dv: 'x^2\\,dx', reversed: { u: 'x^2', dv: '\\ln x\\,dx' },
            duv: 'du=\\frac{dx}{x}\\qquad v=\\frac{x^3}{3}', step: '=\\frac{x^3}{3}\\ln x-\\int\\frac{x^2}{3}\\,dx',
            fn: (x: number) => x * x * Math.log(x), F: (x: number) => (x ** 3 / 3) * Math.log(x) - x ** 3 / 9
        }
    ])
}

function singleFactor(random: Random): Made {
    return pick(random, [
        {
            integrand: '\\ln x', u: '\\ln x', dv: 'dx', reversed: { u: '1', dv: '\\ln x\\,dx' },
            duv: 'du=\\frac{dx}{x}\\qquad v=x', step: '=x\\ln x-\\int dx',
            fn: (x: number) => Math.log(x), F: (x: number) => x * Math.log(x) - x
        },
        {
            integrand: '\\arctan x', u: '\\arctan x', dv: 'dx', reversed: { u: '1', dv: '\\arctan x\\,dx' },
            duv: 'du=\\frac{dx}{1+x^2}\\qquad v=x', step: '=x\\arctan x-\\int\\frac{x}{1+x^2}\\,dx',
            fn: (x: number) => Math.atan(x), F: (x: number) => x * Math.atan(x) - Math.log(1 + x * x) / 2
        },
        {
            integrand: 'x\\arctan x', u: '\\arctan x', dv: 'x\\,dx', reversed: { u: 'x', dv: '\\arctan x\\,dx' },
            duv: 'du=\\frac{dx}{1+x^2}\\qquad v=\\frac{x^2}{2}', step: '=\\frac{x^2}{2}\\arctan x-\\int\\frac{x^2}{2(1+x^2)}\\,dx',
            fn: (x: number) => x * Math.atan(x), F: (x: number) => ((x * x + 1) / 2) * Math.atan(x) - x / 2
        },
        {
            integrand: '\\ln(x+1)', u: '\\ln(x+1)', dv: 'dx', reversed: { u: '1', dv: '\\ln(x+1)\\,dx' },
            duv: 'du=\\frac{dx}{x+1}\\qquad v=x', step: '=x\\ln(x+1)-\\int\\frac{x}{x+1}\\,dx',
            fn: (x: number) => Math.log(x + 1), F: (x: number) => (x + 1) * Math.log(x + 1) - x
        }
    ])
}

const MAKERS: Array<Array<(random: Random) => Made>> = [[xTimesExp, xTimesTrig], [higherDegree, xTimesExp], [singleFactor, higherDegree]]

/** Six rounds, never the same integral twice: the good split, the reversed one and the whole product as u */
export function createChooseURounds(random: Random, level: number): ChooseURound[] {
    const makers = MAKERS[Math.min(2, Math.max(0, level))]
    const rounds: ChooseURound[] = []
    for (let attempt = 0; rounds.length < CHOOSE_U_ROUNDS && attempt < 400; attempt += 1) {
        const made = pick(random, makers)(random)
        if (attempt < 399 && rounds.some((round) => round.integrand === made.integrand)) continue
        const entries: Array<{ option: ChooseUOption; kind: 'right' | 'reversed' | 'whole' }> = shuffle(random, [
            { option: { u: made.u, dv: made.dv }, kind: 'right' as const },
            { option: made.reversed, kind: 'reversed' as const },
            { option: { u: made.integrand, dv: 'dx' }, kind: 'whole' as const }
        ])
        // With a single factor, «u = the whole, dv = dx» is the good split: use u = x, dv = the integrand / x instead
        const options = entries.map((entry) => entry.kind === 'whole' && made.dv === 'dx' ? { u: 'x', dv: `\\frac{${made.integrand}}{x}\\,dx` } : entry.option)
        rounds.push({
            integrand: made.integrand,
            options,
            answer: entries.findIndex((entry) => entry.kind === 'right'),
            duv: made.duv,
            step: made.step,
            kinds: entries.map((entry) => entry.kind),
            fn: made.fn,
            F: made.F
        })
    }
    return rounds
}

/** An option as LaTeX: u = …,  dv = … */
export const optionLatex = (option: ChooseUOption) => `u=${option.u},\\quad dv=${option.dv}`
