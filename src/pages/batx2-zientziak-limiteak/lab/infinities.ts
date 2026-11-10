import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   L2 · Infinituen lasterketa (La carrera de infinitos): c·f(x) on top and
   g(x) below, chosen among a logarithm, five powers and three
   exponentials, raced at x = 10, 100, 1000 and 10 000. The values are far
   too big to write, so everything is done with their decimal logarithm
   (how many digits they have): the bars show it and the readout says
   f/g ≈ 10^m. Before the race the learner predicts whether the quotient
   tends to 0, to a number or to ∞. The trap: x¹⁰ is ahead of 1,1ˣ at
   x = 10 and 100, and far behind from 1000 on.
   ========================================================================== */

export type Growth = 'ln' | 'sqrt' | 'x' | 'x2' | 'x3' | 'x10' | 'exp11' | 'exp2' | 'expe'

export const GROWTHS: Growth[] = ['ln', 'sqrt', 'x', 'x2', 'x3', 'x10', 'exp11', 'exp2', 'expe']

/** Family (0 logarithm, 1 power, 2 exponential) and, inside it, the exponent or the base */
const ORDER: Record<Growth, [number, number]> = {
    ln: [0, 1],
    sqrt: [1, 0.5],
    x: [1, 1],
    x2: [1, 2],
    x3: [1, 3],
    x10: [1, 10],
    exp11: [2, 1.1],
    exp2: [2, 2],
    expe: [2, Math.E]
}

export const GROWTH_LATEX: Record<Growth, string> = {
    ln: '\\ln x',
    sqrt: '\\sqrt{x}',
    x: 'x',
    x2: 'x^2',
    x3: 'x^3',
    x10: 'x^{10}',
    exp11: '1{,}1^x',
    exp2: '2^x',
    expe: 'e^x'
}

/** The same, as plain text for the buttons and the board */
export const GROWTH_TEXT: Record<Growth, string> = {
    ln: 'ln x',
    sqrt: '√x',
    x: 'x',
    x2: 'x²',
    x3: 'x³',
    x10: 'x¹⁰',
    exp11: '1,1ˣ',
    exp2: '2ˣ',
    expe: 'eˣ'
}

export const RACE_LIMITS = { coef: { min: 1, max: 3 }, k: { min: 1, max: 4 } } as const

export interface RaceState {
    top: Growth
    bottom: Growth
    /** The coefficient of the top function */
    coef: number
    /** x = 10^k */
    k: number
    prediction: Prediction | null
}

export const initialRaceState: RaceState = { top: 'x2', bottom: 'x3', coef: 1, k: 1, prediction: null }

export function setRace(state: RaceState, patch: Partial<Omit<RaceState, 'prediction'>>): RaceState {
    const top = patch.top ?? state.top
    const bottom = patch.bottom ?? state.bottom
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
    const coef = clamp(patch.coef ?? state.coef, RACE_LIMITS.coef.min, RACE_LIMITS.coef.max)
    const same = top === state.top && bottom === state.bottom && coef === state.coef
    return { top, bottom, coef, k: clamp(patch.k ?? state.k, RACE_LIMITS.k.min, RACE_LIMITS.k.max), prediction: same ? state.prediction : null }
}

/** log10 of the function at x = 10^k: how many digits the value has */
export function digits(growth: Growth, k: number): number {
    const x = 10 ** k
    const [family, parameter] = ORDER[growth]
    if (family === 0) return Math.log10(Math.log(x))
    if (family === 1) return parameter * k
    return x * Math.log10(parameter)
}

/** log10 of c·f(x) / g(x) */
export function quotientDigits(state: RaceState): number {
    return Math.log10(state.coef) + digits(state.top, state.k) - digits(state.bottom, state.k)
}

/** −1: the bottom is an infinity of higher order; 0: the same; 1: the top is */
export function compareOrders(top: Growth, bottom: Growth): -1 | 0 | 1 {
    const [a, p] = ORDER[top]
    const [b, q] = ORDER[bottom]
    if (a !== b) return a < b ? -1 : 1
    if (p === q) return 0
    return p < q ? -1 : 1
}

/** Where c·f/g goes: to 0 (<), to the number c (=) or to ∞ (>) */
export function racePrediction(state: Pick<RaceState, 'top' | 'bottom'>): Prediction {
    const order = compareOrders(state.top, state.bottom)
    return order < 0 ? '<' : order === 0 ? '=' : '>'
}

export const isPower = (growth: Growth) => ORDER[growth][0] === 1

export const raceChallenges: LabChallenge<RaceState>[] = [
    {
        id: 122201,
        prompt: say('Jarri $x^3$ goian eta $e^x$ behean, eta eraman $x$ 1000 baliora gutxienez.', 'Pon $x^3$ arriba y $e^x$ abajo, y lleva $x$ hasta 1000 por lo menos.', 'ضع $x^3$ في البسط و$e^x$ في المقام، واصعد بـ $x$ إلى 1000 على الأقل.', 'Put $x^3$ on top and $e^x$ below, and take $x$ up to 1000 at least.'),
        hint: say('Kontrolak: goian $x^3$, behean $e^x$, $x=1000$.', 'Controles: arriba $x^3$, abajo $e^x$, $x=1000$.', 'الأزرار: في البسط $x^3$ وفي المقام $e^x$ ثم $x=1000$.', 'Controls: top $x^3$, bottom $e^x$, $x=1000$.'),
        isSolved: (state) => state.top === 'x3' && state.bottom === 'expe' && state.k >= 3
    },
    {
        id: 122202,
        prompt: say('$x^{10}$ goian eta $1{,}1^x$ behean: aurkitu zerrendako $x$ handiena, berreketa oraindik aurretik doan tokia.', '$x^{10}$ arriba y $1{,}1^x$ abajo: encuentra el mayor $x$ de la lista en que la potencia aún va por delante.', '$x^{10}$ في البسط و$1{,}1^x$ في المقام: أوجد أكبر $x$ في القائمة ما زالت القوة فيه متقدمة.', '$x^{10}$ on top and $1{,}1^x$ below: find the largest $x$ of the list where the power is still ahead.'),
        hint: say('Begiratu zatidura: 1 baino handiagoa bada, goikoa aurretik doa.', 'Mira el cociente: si es mayor que 1, va delante la de arriba.', 'انظر إلى خارج القسمة: إذا كان أكبر من 1 فالبسط متقدم.', 'Look at the quotient: if it is above 1, the top one is ahead.'),
        isSolved: (state) => state.top === 'x10' && state.bottom === 'exp11' && state.coef === 1 && state.k === 2
    },
    {
        id: 122203,
        prompt: say('Egin $\\frac{c\\cdot f}{g}\\to 3$ izatea.', 'Haz que $\\frac{c\\cdot f}{g}\\to 3$.', 'اجعل $\\frac{c\\cdot f}{g}\\to 3$.', 'Make $\\frac{c\\cdot f}{g}\\to 3$.'),
        hint: say('Funtzio bera goian eta behean, eta $c=3$.', 'La misma función arriba y abajo, y $c=3$.', 'الدالة نفسها في البسط والمقام، و$c=3$.', 'The same function on top and below, and $c=3$.'),
        isSolved: (state) => state.top === state.bottom && state.coef === 3
    },
    {
        id: 122204,
        prompt: say('Jarri $\\ln x$ goian eta $\\sqrt{x}$ behean, eta eraman $x$ $10\\,000$ baliora.', 'Pon $\\ln x$ arriba y $\\sqrt{x}$ abajo, y lleva $x$ hasta $10\\,000$.', 'ضع $\\ln x$ في البسط و$\\sqrt{x}$ في المقام، واصعد بـ $x$ إلى $10\\,000$.', 'Put $\\ln x$ on top and $\\sqrt{x}$ below, and take $x$ up to $10\\,000$.'),
        hint: say('Erro txiki batek ere irabazten dio logaritmoari.', 'Hasta una raíz gana al logaritmo.', 'حتى الجذر يتفوق على اللوغاريتم.', 'Even a root beats the logarithm.'),
        isSolved: (state) => state.top === 'ln' && state.bottom === 'sqrt' && state.k === 4
    },
    {
        id: 122205,
        prompt: say('Aukeratu goian berreketa bat eta behean beste funtzio bat, zatidura $\\infty$ aldera joan dadin; eraman $x$ 1000 baliora gutxienez.', 'Elige arriba una potencia y abajo otra función para que el cociente vaya a $\\infty$; lleva $x$ hasta 1000 por lo menos.', 'اختر في البسط قوة وفي المقام دالة أخرى ليؤول خارج القسمة إلى $\\infty$؛ واصعد بـ $x$ إلى 1000 على الأقل.', 'Choose a power on top and another function below so that the quotient goes to $\\infty$; take $x$ up to 1000 at least.'),
        hint: say('Behean logaritmoa edo berretzaile txikiagoko berreketa.', 'Abajo, el logaritmo o una potencia de exponente menor.', 'في المقام اللوغاريتم أو قوة ذات أس أصغر.', 'Below, the logarithm or a power with a smaller exponent.'),
        isSolved: (state) => isPower(state.top) && racePrediction(state) === '>' && state.k >= 3
    }
]

/** Endless practice: given f, choose g so that f/g goes to 0 or to ∞, or the same f with c */
const raceMaker: LabChallengeMaker<RaceState> = (random) => {
    const kind = randomInt(random, 0, 2)
    if (kind === 2) {
        const coef = randomInt(random, 2, 3)
        const growth = GROWTHS[randomInt(random, 0, GROWTHS.length - 1)]
        const g = `$${GROWTH_LATEX[growth]}$`
        return {
            prompt: say(`Behean ${g} dagoela, egin $\\frac{c\\cdot f}{g}\\to ${coef}$ izatea.`, `Con ${g} abajo, haz que $\\frac{c\\cdot f}{g}\\to ${coef}$.`, `مع ${g} في المقام اجعل $\\frac{c\\cdot f}{g}\\to ${coef}$.`, `With ${g} below, make $\\frac{c\\cdot f}{g}\\to ${coef}$.`),
            hint: say('Ordena bera: funtzio bera goian.', 'El mismo orden: la misma función arriba.', 'الرتبة نفسها: الدالة نفسها في البسط.', 'The same order: the same function on top.'),
            isSolved: (state) => state.bottom === growth && state.top === growth && state.coef === coef,
            solution: { top: growth, bottom: growth, coef, k: 1, prediction: null }
        }
    }
    // To 0: the top must lose; to ∞: it must win. Never the lowest (or highest) one, which has nobody to lose (win) to.
    const toZero = kind === 0
    const index = toZero ? randomInt(random, 0, GROWTHS.length - 2) : randomInt(random, 1, GROWTHS.length - 1)
    const top = GROWTHS[index]
    const solution = toZero ? GROWTHS[index + 1] : GROWTHS[index - 1]
    const t = `$${GROWTH_LATEX[top]}$`
    const target = toZero ? '0' : '\\infty'
    return {
        prompt: say(`Goian ${t} dagoela, aukeratu behean funtzio bat, $\\frac{f}{g}\\to ${target}$ izan dadin ($c=1$).`, `Con ${t} arriba, elige abajo una función para que $\\frac{f}{g}\\to ${target}$ ($c=1$).`, `مع ${t} في البسط اختر في المقام دالة ليكون $\\frac{f}{g}\\to ${target}$ ‏($c=1$).`, `With ${t} on top, choose a function below so that $\\frac{f}{g}\\to ${target}$ ($c=1$).`),
        hint: toZero
            ? say('Behean ordena handiagoko infinitu bat.', 'Abajo, un infinito de mayor orden.', 'في المقام لانهاية من رتبة أكبر.', 'Below, an infinity of higher order.')
            : say('Behean ordena txikiagoko infinitu bat.', 'Abajo, un infinito de menor orden.', 'في المقام لانهاية من رتبة أصغر.', 'Below, an infinity of lower order.'),
        isSolved: (state) => state.top === top && state.coef === 1 && racePrediction(state) === (toZero ? '<' : '>'),
        solution: { top, bottom: solution, coef: 1, k: 1, prediction: null }
    }
}

export const raceExtra = freshFrom(initialRaceState, raceMaker)
