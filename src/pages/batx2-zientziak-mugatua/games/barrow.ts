import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { frac, shift } from './latex.ts'

/* ==========================================================================
   J1 · ¿Vale Barrow? / Barrow-k balio du?: a definite integral and three
   answers. Barrow works when f is continuous on [a, b]: then the answer is
   its value (and a wrong option gives F(a) − F(b)); with an asymptote
   inside it does not (and a wrong option gives the number Barrow would
   produce blindly, or puts the asymptote at −c). An absolute value or a
   jump does not break the integral: it is split there (the wrong options
   forget the split or claim Barrow cannot be used). Level 1, polynomials
   and k/(x − c)²; level 2, also k/(x − c), whose value is a logarithm;
   level 3, |x − c|, a jump and k/(x − c)². Every round keeps its function
   and limits, and the value when there is one, for the tests.
   ========================================================================== */

export const BARROW_ROUNDS = 6

export type BarrowKind = 'poly' | 'inverseSquare' | 'inverse' | 'abs' | 'jump'

export interface BarrowRound {
    kind: BarrowKind
    integral: string
    /** f given in two pieces, for a jump */
    definition?: string
    options: LocalizedText[]
    answer: number
    why: LocalizedText
    worked: string
    fn: (x: number) => number
    a: number
    b: number
    /** The value of the integral; null when Barrow does not work (an asymptote inside) */
    value: number | null
    /** Where f is not defined, when it matters */
    pole?: number
}

const yes = (latex: string) => say(`Bai: $${latex}$`, `Sí: $${latex}$`, `نعم: $${latex}$`, `Yes: $${latex}$`)
const split = (c: number, latex: string) => say(`Bai, $x=${c}$ puntuan zatituz: $${latex}$`, `Sí, partiendo en $x=${c}$: $${latex}$`, `نعم، بالتقسيم عند $x=${c}$: $${latex}$`, `Yes, splitting at $x=${c}$: $${latex}$`)
const asymptote = (c: number) => say(`Ez: asintota $x=${c}$ puntuan`, `No: asíntota en $x=${c}$`, `لا: مقارب عند $x=${c}$`, `No: asymptote at $x=${c}$`)
const notDifferentiable = (c: number) => say(`Ez: ez da deribagarria $x=${c}$ puntuan`, `No: no es derivable en $x=${c}$`, `لا: ليست قابلة للاشتقاق عند $x=${c}$`, `No: not differentiable at $x=${c}$`)
const hasJump = (c: number) => say(`Ez: jauzi bat du $x=${c}$ puntuan`, `No: tiene un salto en $x=${c}$`, `لا: فيها قفزة عند $x=${c}$`, `No: it jumps at $x=${c}$`)

interface Made extends Omit<BarrowRound, 'options' | 'answer'> {
    right: LocalizedText
    wrong: LocalizedText[]
}

/** ∫ₐᵇ 3x² dx or ∫ₐᵇ 2x dx: continuous, Barrow works */
function poly(random: Random): Made | null {
    const square = random() < 0.5
    const a = randomInt(random, -2, 1)
    const b = randomInt(random, a + 1, 3)
    const value = square ? b ** 3 - a ** 3 : b * b - a * a
    if (value === 0) return null
    const F = square ? 'x^3' : 'x^2'
    const at = (x: number) => (x < 0 ? `(${x})` : String(x))
    return {
        kind: 'poly',
        integral: `\\int_{${a}}^{${b}}${square ? '3x^2' : '2x'}\\,dx`,
        right: yes(String(value)),
        wrong: [yes(String(-value)), asymptote(0)],
        why: say('Polinomio bat jarraitua da toki guztietan: Barrow-k balio du, goikoa ken behekoa.', 'Un polinomio es continuo en todas partes: Barrow vale, el de arriba menos el de abajo.', 'كثير الحدود متصل في كل مكان: تصح قاعدة بارو، الأعلى ناقص الأدنى.', 'A polynomial is continuous everywhere: Barrow works, the top limit minus the bottom one.'),
        worked: `\\left[${F}\\right]_{${a}}^{${b}}=${at(b)}^${square ? 3 : 2}-${at(a)}^${square ? 3 : 2}=${value}`,
        fn: square ? (x) => 3 * x * x : (x) => 2 * x,
        a, b, value
    }
}

/** ∫ₐᵇ k/(x − c)² dx: Barrow works only if c is outside [a, b] */
function inverseSquare(random: Random): Made | null {
    const k = pick(random, [1, 2, 3])
    const c = pick(random, [-1, 1, 2])
    const inside = random() < 0.5
    const a = inside ? c - randomInt(random, 1, 2) : pick(random, [c + 1, c - 3])
    const b = inside ? c + randomInt(random, 1, 2) : a + randomInt(random, 1, 2)
    if (!inside && a <= c && b >= c) return null
    const top = k === 1 ? '' : String(k)
    // Barrow, blindly: [−k/(x − c)]ₐᵇ = k/(a − c) − k/(b − c)
    const blind = { p: k * (b - c) - k * (a - c), q: (a - c) * (b - c) }
    const integral = `\\int_{${a}}^{${b}}\\frac{${top || '1'}}{(${shift(c)})^2}\\,dx`
    if (inside) {
        return {
            kind: 'inverseSquare', integral,
            right: asymptote(c),
            wrong: [yes(frac(blind.p, blind.q)), asymptote(-c)],
            why: say(`$${shift(c)}=0$ puntuan, $x=${c}$, asintota bat dago $[${a},\\,${b}]$ tartearen barruan: Barrow-k ez du balio. Itsu-itsuan aplikatuta zenbaki negatibo bat ateratzen da, funtzioa positiboa izan arren.`, `En $x=${c}$, donde $${shift(c)}=0$, hay una asíntota dentro de $[${a},\\,${b}]$: Barrow no vale. A ciegas daría un número negativo, aunque la función es positiva.`, `عند $x=${c}$ حيث $${shift(c)}=0$ يوجد مقارب داخل $[${a},\\,${b}]$: لا تصح قاعدة بارو. وتطبيقها دون انتباه يعطي عددًا سالبًا مع أن الدالة موجبة.`, `At $x=${c}$, where $${shift(c)}=0$, there is an asymptote inside $[${a},\\,${b}]$: Barrow does not work. Applied blindly it would give a negative number, though the function is positive.`),
            worked: `${a}<${c}<${b}`,
            fn: (x) => k / (x - c) ** 2, a, b, value: null, pole: c
        }
    }
    const value = frac(blind.p, blind.q)
    return {
        kind: 'inverseSquare', integral,
        right: yes(value),
        wrong: [yes(frac(-blind.p, blind.q)), asymptote(c)],
        why: say(`Asintota $x=${c}$ puntuan dago, $[${a},\\,${b}]$ tartetik kanpo: funtzioa jarraitua da tartean, eta Barrow-k balio du.`, `La asíntota $x=${c}$ queda fuera de $[${a},\\,${b}]$: la función es continua en el intervalo y Barrow vale.`, `المقارب $x=${c}$ خارج $[${a},\\,${b}]$: الدالة متصلة في الفترة وتصح قاعدة بارو.`, `The asymptote $x=${c}$ is outside $[${a},\\,${b}]$: the function is continuous on the interval and Barrow works.`),
        worked: `\\left[-\\frac{${top || '1'}}{${shift(c)}}\\right]_{${a}}^{${b}}=${value}`,
        fn: (x) => k / (x - c) ** 2, a, b, value: blind.p / blind.q, pole: c
    }
}

/** ∫ₐᵇ k/(x − c) dx: a logarithm when c is outside, no value when it is inside */
function inverse(random: Random): Made | null {
    const k = pick(random, [1, 2, 3])
    const c = pick(random, [-2, 1, 2])
    const inside = random() < 0.5
    const a = inside ? c - randomInt(random, 1, 2) : c + randomInt(random, 1, 2)
    const b = inside ? c + randomInt(random, 1, 3) : a + randomInt(random, 1, 3)
    const top = k === 1 ? '' : String(k)
    const integral = `\\int_{${a}}^{${b}}\\frac{${top || '1'}}{${shift(c)}}\\,dx`
    if (inside) {
        return {
            kind: 'inverse', integral,
            right: asymptote(c),
            wrong: [yes(`${top}\\ln ${Math.abs(b - c)}-${top}\\ln ${Math.abs(a - c)}`), asymptote(-c)],
            why: say(`Asintota bat dago $x=${c}$ puntuan, $[${a},\\,${b}]$ tartearen barruan: Barrow-k ez du balio.`, `Hay una asíntota en $x=${c}$, dentro de $[${a},\\,${b}]$: Barrow no vale.`, `يوجد مقارب عند $x=${c}$ داخل $[${a},\\,${b}]$: لا تصح قاعدة بارو.`, `There is an asymptote at $x=${c}$, inside $[${a},\\,${b}]$: Barrow does not work.`),
            worked: `${a}<${c}<${b}`,
            fn: (x) => k / (x - c), a, b, value: null, pole: c
        }
    }
    const p = b - c
    const q = a - c
    // k ln(p/q), with p > q ≥ 1
    const value = `${top}\\ln ${frac(p, q)}`
    return {
        kind: 'inverse', integral,
        right: yes(value),
        wrong: [yes(`-${value}`), asymptote(c)],
        why: say(`$x=${c}$ asintota $[${a},\\,${b}]$ tartetik kanpo dago: Barrow-k balio du.`, `La asíntota $x=${c}$ queda fuera de $[${a},\\,${b}]$: Barrow vale.`, `المقارب $x=${c}$ خارج $[${a},\\,${b}]$: تصح قاعدة بارو.`, `The asymptote $x=${c}$ is outside $[${a},\\,${b}]$: Barrow works.`),
        worked: `\\left[${top}\\ln|${shift(c)}|\\right]_{${a}}^{${b}}=${value}`,
        fn: (x) => k / (x - c), a, b, value: k * Math.log(p / q), pole: c
    }
}

/** ∫ₐᵇ |x − c| dx with c inside: continuous, split at c */
function abs(random: Random): Made | null {
    const c = randomInt(random, 1, 2)
    const a = c - randomInt(random, 1, 2)
    const b = c + randomInt(random, 1, 3)
    const value = ((c - a) ** 2 + (b - c) ** 2) / 2
    const unsplit = ((b - c) ** 2 - (a - c) ** 2) / 2
    if (unsplit === value) return null
    return {
        kind: 'abs',
        integral: `\\int_{${a}}^{${b}}|${shift(c)}|\\,dx`,
        right: split(c, frac(2 * value, 2)),
        wrong: [yes(frac(2 * unsplit, 2)), notDifferentiable(c)],
        why: say(`$|${shift(c)}|$ funtzioa jarraitua da (ez du asintotarik ez jauzirik): Barrow-k balio du, baina formula aldatzen den $x=${c}$ puntuan zatitu behar da.`, `$|${shift(c)}|$ es continua (sin asíntotas ni saltos): Barrow vale, pero hay que partir en $x=${c}$, donde cambia la fórmula.`, `$|${shift(c)}|$ متصلة (بلا مقاربات ولا قفزات): تصح قاعدة بارو لكن يجب التقسيم عند $x=${c}$ حيث تتغير الصيغة.`, `$|${shift(c)}|$ is continuous (no asymptotes or jumps): Barrow works, but you must split at $x=${c}$, where the formula changes.`),
        worked: `\\frac{${(c - a) ** 2}}{2}+\\frac{${(b - c) ** 2}}{2}=${frac(2 * value, 2)}`,
        fn: (x) => Math.abs(x - c), a, b, value
    }
}

/** f = p for x < c and q for x ≥ c: a jump, split at c */
function jump(random: Random): Made | null {
    const c = randomInt(random, 1, 2)
    const a = 0
    const b = c + randomInt(random, 1, 2)
    const p = randomInt(random, 1, 4)
    const q = randomInt(random, 1, 5)
    if (p === q) return null
    const value = p * (c - a) + q * (b - c)
    return {
        kind: 'jump',
        integral: `\\int_{${a}}^{${b}}f(x)\\,dx`,
        definition: `f(x)=\\begin{cases}${p} & x<${c}\\\\ ${q} & x\\ge ${c}\\end{cases}`,
        right: split(c, String(value)),
        wrong: [yes(String(p * (b - a))), hasJump(c)],
        why: say(`Jauzi batek ez du integrala hausten: $x=${c}$ puntuan zatitu, eta zati bakoitzean Barrow aplikatu bere formularekin.`, `Un salto no rompe la integral: se parte en $x=${c}$ y se aplica Barrow en cada trozo con su fórmula.`, `القفزة لا تُبطل التكامل: نقسم عند $x=${c}$ ونطبق بارو في كل جزء بصيغته.`, `A jump does not break the integral: split at $x=${c}$ and apply Barrow on each piece with its formula.`),
        worked: `${p}\\cdot ${c - a}+${q}\\cdot ${b - c}=${value}`,
        fn: (x) => (x < c ? p : q), a, b, value
    }
}

const LEVELS: Array<Array<(random: Random) => Made | null>> = [[poly, inverseSquare], [inverseSquare, inverse], [abs, jump, inverseSquare]]

/** Six rounds of one level, never the same integral twice */
export function createBarrowRounds(random: Random, level: number): BarrowRound[] {
    const makers = LEVELS[Math.min(2, Math.max(0, level))]
    const rounds: BarrowRound[] = []
    for (let attempt = 0; rounds.length < BARROW_ROUNDS && attempt < 600; attempt += 1) {
        const made = pick(random, makers)(random)
        if (!made) continue
        if (attempt < 599 && rounds.some((round) => round.integral === made.integral && round.definition === made.definition)) continue
        const options = shuffle(random, [made.right, ...made.wrong])
        const { right, wrong, ...round } = made
        void wrong
        rounds.push({ ...round, options, answer: options.indexOf(right) })
    }
    return rounds
}
