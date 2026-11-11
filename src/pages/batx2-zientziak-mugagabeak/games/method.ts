import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J1 · Zein metodo? / ¿Qué método?: an integral and four baskets (basic or
   composite, by parts, rational, substitution). Each round comes from a
   template of one method, so the right basket is the one the lesson's
   questions give in order: first «is the derivative of the inside
   outside?», then «a polynomial times eˣ, sin, cos or ln?», then «a
   quotient of polynomials?», then «a root or eˣ in sums, or a power of
   sin or cos?». Level 1, clean examples; level 2 adds the traps (a
   quotient whose top is the derivative of the bottom is composite, x·e^(x²)
   is not by parts); level 3 adds logarithms and arcs alone, powers of
   cosine and divisions. Every round keeps the integrand and its
   antiderivative as functions, so the tests can check them.
   ========================================================================== */

export type Method = 'composed' | 'parts' | 'rational' | 'substitution'

export const METHODS: Method[] = ['composed', 'parts', 'rational', 'substitution']

export const METHOD_NAMES: Record<Method, LocalizedText> = {
    composed: say('Berehalakoa edo konposatua', 'Inmediata o compuesta', 'مباشر أو مركّب', 'Basic or composite'),
    parts: say('Zatika', 'Por partes', 'بالتجزئة', 'By parts'),
    rational: say('Arrazionala', 'Racional', 'كسري', 'Rational'),
    substitution: say('Aldagai-aldaketa', 'Cambio de variable', 'تغيير المتغير', 'Substitution')
}

export const METHOD_ROUNDS = 8

export interface MethodRound {
    /** The integrand in LaTeX */
    integrand: string
    method: Method
    /** The index of the right basket in METHODS */
    answer: number
    /** The first idea of the method: u = …, t = …, the factorisation… */
    first: string
    /** The result, ∫ … dx = … + k */
    result: string
    why: LocalizedText
    fn: (x: number) => number
    F: (x: number) => number
}

type Template = (random: Random) => Omit<MethodRound, 'answer'>

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const minus = (value: number) => (value < 0 ? `+${-value}` : `-${value}`)

/* ---------- Basic or composite ---------- */

const WHY_COMPOSED = say('Kanpoan barrukoaren deribatua dago (zenbaki bat falta izan daiteke): konposatua da.', 'Fuera está la derivada de lo de dentro (puede faltar un número): es compuesta.', 'في الخارج مشتقة الداخل (قد ينقص عدد): إنه مركّب.', 'The derivative of the inside is outside (a number may be missing): it is composite.')

const composedPower: Template = (random) => {
    const b = pick(random, [1, 2, 3, 4, 5])
    const n = pick(random, [2, 3, 4])
    return {
        integrand: `x(x^2+${b})^${n}`,
        method: 'composed',
        first: `u=x^2+${b}\\qquad u'=2x`,
        result: `\\int x(x^2+${b})^${n}\\,dx=\\frac{(x^2+${b})^${n + 1}}{${2 * (n + 1)}}+k`,
        why: WHY_COMPOSED,
        fn: (x) => x * (x * x + b) ** n,
        F: (x) => (x * x + b) ** (n + 1) / (2 * (n + 1))
    }
}

const composedExp: Template = (random) => {
    const p = pick(random, [2, 3])
    const outside = p === 2 ? 'x' : 'x^2'
    return {
        integrand: `${outside}e^{x^${p}}`,
        method: 'composed',
        first: `u=x^${p}\\qquad u'=${p}${outside}`,
        result: `\\int ${outside}e^{x^${p}}\\,dx=\\frac{e^{x^${p}}}{${p}}+k`,
        why: WHY_COMPOSED,
        fn: (x) => x ** (p - 1) * Math.exp(x ** p),
        F: (x) => Math.exp(x ** p) / p
    }
}

/** (2x + b)/(x² + bx + c), with no real roots: the top is the derivative of the bottom */
const composedLog: Template = (random) => {
    const b = pick(random, [1, 2, 3, 4])
    const c = pick(random, [5, 6, 7, 8, 9].filter((value) => value * 4 > b * b))
    const bottom = `x^2+${b === 1 ? '' : b}x+${c}`
    return {
        integrand: `\\frac{2x+${b}}{${bottom}}`,
        method: 'composed',
        first: `u=${bottom}\\qquad u'=2x+${b}`,
        result: `\\int\\frac{2x+${b}}{${bottom}}\\,dx=\\ln(${bottom})+k`,
        why: say('Zatidura bat da, baina goian behekoaren deribatua dago: $\\frac{u\'}{u}$, logaritmo bat.', 'Es un cociente, pero arriba está la derivada de abajo: $\\frac{u\'}{u}$, un logaritmo.', 'إنه خارج قسمة، لكن في الأعلى مشتقة الأسفل: $\\frac{u\'}{u}$، لوغاريتم.', 'It is a quotient, but the top is the derivative of the bottom: $\\frac{u\'}{u}$, a logarithm.'),
        fn: (x) => (2 * x + b) / (x * x + b * x + c),
        F: (x) => Math.log(x * x + b * x + c)
    }
}

const composedHalfLog: Template = (random) => {
    const a = pick(random, [1, 2, 4, 9])
    return {
        integrand: `\\frac{x}{x^2+${a}}`,
        method: 'composed',
        first: `u=x^2+${a}\\qquad u'=2x`,
        result: `\\int\\frac{x}{x^2+${a}}\\,dx=\\frac{1}{2}\\ln(x^2+${a})+k`,
        why: say('Goian $x$ dago, behekoaren deribatuaren erdia: 2 bat doitu eta logaritmoa.', 'Arriba está $x$, la mitad de la derivada de abajo: se ajusta un 2 y sale un logaritmo.', 'في الأعلى $x$، نصف مشتقة الأسفل: نضبط 2 فيخرج لوغاريتم.', 'The top is $x$, half the derivative of the bottom: adjust a 2 and a logarithm comes out.'),
        fn: (x) => x / (x * x + a),
        F: (x) => Math.log(x * x + a) / 2
    }
}

const composedTrig: Template = () => ({
    integrand: '\\cos x\\,e^{\\sin x}',
    method: 'composed',
    first: "u=\\sin x\\qquad u'=\\cos x",
    result: '\\int\\cos x\\,e^{\\sin x}\\,dx=e^{\\sin x}+k',
    why: WHY_COMPOSED,
    fn: (x) => Math.cos(x) * Math.exp(Math.sin(x)),
    F: (x) => Math.exp(Math.sin(x))
})

/* ---------- By parts ---------- */

const WHY_PARTS = say('Polinomio bat bider esponentzial bat edo kosinu bat da, barrukoaren deribaturik gabe: zatika, polinomioa $u$ dela.', 'Es un polinomio por una exponencial o un coseno, sin la derivada de dentro: por partes, con el polinomio como $u$.', 'إنه كثير حدود في دالة أسية أو جيب تمام دون مشتقة الداخل: بالتجزئة، وكثير الحدود هو $u$.', 'It is a polynomial times an exponential or a cosine, without the derivative of the inside: by parts, with the polynomial as $u$.')

const partsExp: Template = (random) => {
    const k = pick(random, [1, 2, 3, -1])
    const exp = k === 1 ? 'e^x' : k === -1 ? 'e^{-x}' : `e^{${k}x}`
    const result = k === 1 ? 'e^x(x-1)' : k === -1 ? '-e^{-x}(x+1)' : `${exp}\\left(\\frac{x}{${k}}-\\frac{1}{${k * k}}\\right)`
    return {
        integrand: `x${exp}`,
        method: 'parts',
        first: `u=x\\qquad dv=${exp}\\,dx`,
        result: `\\int x${exp}\\,dx=${result}+k`,
        why: WHY_PARTS,
        fn: (x) => x * Math.exp(k * x),
        F: (x) => Math.exp(k * x) * (x / k - 1 / (k * k))
    }
}

const partsCos: Template = (random) => {
    const k = pick(random, [1, 2, 3])
    const inside = k === 1 ? 'x' : `${k}x`
    const result = k === 1 ? 'x\\sin x+\\cos x' : `\\frac{x\\sin ${inside}}{${k}}+\\frac{\\cos ${inside}}{${k * k}}`
    return {
        integrand: `x\\cos ${inside}`,
        method: 'parts',
        first: `u=x\\qquad dv=\\cos ${inside}\\,dx`,
        result: `\\int x\\cos ${inside}\\,dx=${result}+k`,
        why: WHY_PARTS,
        fn: (x) => x * Math.cos(k * x),
        F: (x) => (x * Math.sin(k * x)) / k + Math.cos(k * x) / (k * k)
    }
}

const partsSquare: Template = () => ({
    integrand: 'x^2e^x',
    method: 'parts',
    first: 'u=x^2\\qquad dv=e^x\\,dx',
    result: '\\int x^2e^x\\,dx=e^x(x^2-2x+2)+k',
    why: say('Polinomioa bider $e^x$: zatika, bi aldiz.', 'Polinomio por $e^x$: por partes, dos veces.', 'كثير حدود في $e^x$: بالتجزئة مرتين.', 'A polynomial times $e^x$: by parts, twice.'),
    fn: (x) => x * x * Math.exp(x),
    F: (x) => Math.exp(x) * (x * x - 2 * x + 2)
})

const partsAlone: Template = (random) => pick(random, [
    {
        integrand: '\\ln x',
        method: 'parts' as const,
        first: 'u=\\ln x\\qquad dv=dx',
        result: '\\int\\ln x\\,dx=x\\ln x-x+k',
        why: say('Logaritmoa ez dago taulan, baina haren deribatua bai: zatika, $dv=dx$ dela.', 'El logaritmo no está en la tabla, pero su derivada sí: por partes, con $dv=dx$.', 'اللوغاريتم ليس في الجدول لكن مشتقته فيه: بالتجزئة مع $dv=dx$.', 'The logarithm is not in the table, but its derivative is: by parts, with $dv=dx$.'),
        fn: (x: number) => Math.log(x),
        F: (x: number) => x * Math.log(x) - x
    },
    {
        integrand: '\\arctan x',
        method: 'parts' as const,
        first: 'u=\\arctan x\\qquad dv=dx',
        result: '\\int\\arctan x\\,dx=x\\arctan x-\\frac{1}{2}\\ln(1+x^2)+k',
        why: say('Arku tangentea ez dago taulan, baina haren deribatua bai: zatika, $dv=dx$ dela.', 'La arcotangente no está en la tabla, pero su derivada sí: por partes, con $dv=dx$.', 'قوس الظل ليس في الجدول لكن مشتقته فيه: بالتجزئة مع $dv=dx$.', 'The arctangent is not in the table, but its derivative is: by parts, with $dv=dx$.'),
        fn: (x: number) => Math.atan(x),
        F: (x: number) => x * Math.atan(x) - Math.log(1 + x * x) / 2
    },
    {
        integrand: 'x\\ln x',
        method: 'parts' as const,
        first: 'u=\\ln x\\qquad dv=x\\,dx',
        result: '\\int x\\ln x\\,dx=\\frac{x^2}{2}\\ln x-\\frac{x^2}{4}+k',
        why: say('Polinomioa bider logaritmoa: zatika, oraingoan logaritmoa $u$ dela.', 'Polinomio por logaritmo: por partes, esta vez con el logaritmo como $u$.', 'كثير حدود في لوغاريتم: بالتجزئة، وهذه المرة اللوغاريتم هو $u$.', 'A polynomial times a logarithm: by parts, this time with the logarithm as $u$.'),
        fn: (x: number) => x * Math.log(x),
        F: (x: number) => (x * x / 2) * Math.log(x) - x * x / 4
    }
])

/* ---------- Rational ---------- */

const WHY_RATIONAL = say('Polinomioen zatidura da, eta goian ez dago behekoaren deribatua: zatiki sinpleak.', 'Es un cociente de polinomios y arriba no está la derivada de abajo: fracciones simples.', 'إنه خارج قسمة كثيرَي حدود وليس في الأعلى مشتقة الأسفل: كسور بسيطة.', 'It is a quotient of polynomials and the top is not the derivative of the bottom: partial fractions.')

/** x² + px + q from its roots a and b */
const quadratic = (a: number, b: number) => {
    const p = -(a + b)
    const q = a * b
    return `x^2${p === 0 ? '' : p === 1 ? '+x' : p === -1 ? '-x' : `${signed(p)}x`}${q === 0 ? '' : signed(q)}`
}
const linear = (a: number) => `x${minus(a)}`

const rationalConstant: Template = (random) => {
    const [a, b] = pick(random, [[1, -1], [2, -2], [3, -1], [1, -3], [2, -1], [3, 1]])
    const c = (a - b) * pick(random, [1, 2])
    const A = c / (a - b)
    return {
        integrand: `\\frac{${c}}{${quadratic(a, b)}}`,
        method: 'rational',
        first: `${quadratic(a, b)}=(${linear(a)})(${linear(b)})`,
        result: `\\int\\frac{${c}}{${quadratic(a, b)}}\\,dx=${A === 1 ? '' : A}\\ln|${linear(a)}|-${A === 1 ? '' : A}\\ln|${linear(b)}|+k`,
        why: WHY_RATIONAL,
        fn: (x) => c / ((x - a) * (x - b)),
        F: (x) => A * (Math.log(Math.abs(x - a)) - Math.log(Math.abs(x - b)))
    }
}

/** N = A(x − b) + B(x − a) with whole A and B, and N not a multiple of the derivative of the bottom */
const rationalLinear: Template = (random) => {
    for (;;) {
        const [a, b] = pick(random, [[1, -2], [2, -1], [3, -2], [1, -3], [2, -3], [-1, 3]])
        const A = pick(random, [1, 2, 3])
        const B = pick(random, [-2, -1, 1, 2])
        const p = A + B
        const q = -(A * b + B * a)
        // 2x − (a + b) is the derivative of the bottom: then it would be composite
        if (p * -(a + b) === 2 * q) continue
        if (p === 0) continue
        const top = `${p === 1 ? '' : p === -1 ? '-' : p}x${q === 0 ? '' : signed(q)}`
        const term = (value: number, root: number, first: boolean) => `${value < 0 ? '-' : first ? '' : '+'}${Math.abs(value) === 1 ? '' : Math.abs(value)}\\ln|${linear(root)}|`
        return {
            integrand: `\\frac{${top}}{${quadratic(a, b)}}`,
            method: 'rational',
            first: `\\frac{${A}}{${linear(a)}}${B < 0 ? '-' : '+'}\\frac{${Math.abs(B)}}{${linear(b)}}`,
            result: `\\int\\frac{${top}}{${quadratic(a, b)}}\\,dx=${term(A, a, true)}${term(B, b, false)}+k`,
            why: WHY_RATIONAL,
            fn: (x) => (p * x + q) / ((x - a) * (x - b)),
            F: (x) => A * Math.log(Math.abs(x - a)) + B * Math.log(Math.abs(x - b))
        }
    }
}

const rationalDivision: Template = (random) => {
    const a = pick(random, [1, 2, 3])
    const c = pick(random, [1, 2, 3, 5])
    const r = a * a + c
    return {
        integrand: `\\frac{x^2+${c}}{x-${a}}`,
        method: 'rational',
        first: `\\frac{x^2+${c}}{x-${a}}=x+${a}+\\frac{${r}}{x-${a}}`,
        result: `\\int\\frac{x^2+${c}}{x-${a}}\\,dx=\\frac{x^2}{2}+${a}x+${r}\\ln|x-${a}|+k`,
        why: say('Polinomioen zatidura da, eta goian maila handiagoa dago: lehenik zatitu.', 'Es un cociente de polinomios con más grado arriba: primero se divide.', 'إنه خارج قسمة كثيرَي حدود بدرجة أعلى في الأعلى: نقسم أولًا.', 'It is a quotient of polynomials with a higher degree on top: divide first.'),
        fn: (x) => (x * x + c) / (x - a),
        F: (x) => x * x / 2 + a * x + r * Math.log(Math.abs(x - a))
    }
}

/* ---------- Substitution ---------- */

const rootSubstitution: Template = (random) => {
    const a = pick(random, [1, 2, 3])
    return {
        integrand: `\\frac{1}{${a}+\\sqrt{x}}`,
        method: 'substitution',
        first: 't=\\sqrt{x}\\qquad dx=2t\\,dt',
        result: `\\int\\frac{dx}{${a}+\\sqrt{x}}=2\\sqrt{x}-${2 * a}\\ln(${a}+\\sqrt{x})+k`,
        why: say('$x$ aldagaiaren erro bat dago: $t=\\sqrt{x}$ aldaketak kentzen du, eta arrazional bat geratzen da.', 'Hay una raíz de $x$: el cambio $t=\\sqrt{x}$ la quita y queda una racional.', 'يوجد جذر لـ $x$: التعويض $t=\\sqrt{x}$ يزيله ويبقى تكامل كسري.', 'There is a root of $x$: the change $t=\\sqrt{x}$ removes it and a rational one is left.'),
        fn: (x) => 1 / (a + Math.sqrt(x)),
        F: (x) => 2 * Math.sqrt(x) - 2 * a * Math.log(a + Math.sqrt(x))
    }
}

const shiftedRoot: Template = (random) => {
    const a = pick(random, [1, 2, 3])
    return {
        integrand: `x\\sqrt{x-${a}}`,
        method: 'substitution',
        first: `t^2=x-${a}\\qquad dx=2t\\,dt`,
        result: `\\int x\\sqrt{x-${a}}\\,dx=\\frac{2}{5}\\sqrt{(x-${a})^5}+\\frac{${2 * a}}{3}\\sqrt{(x-${a})^3}+k`,
        why: say('$x-a$ adierazpenaren erro bat dago, eta haren deribatua ez dago kanpoan: $t^2=x-a$ aldaketa.', 'Hay una raíz de $x-a$ y su derivada no está fuera: cambio $t^2=x-a$.', 'يوجد جذر لـ $x-a$ ومشتقته ليست في الخارج: التعويض $t^2=x-a$.', 'There is a root of $x-a$ and its derivative is not outside: the change $t^2=x-a$.'),
        fn: (x) => x * Math.sqrt(x - a),
        F: (x) => (2 / 5) * (x - a) ** 2.5 + ((2 * a) / 3) * (x - a) ** 1.5
    }
}

const expSubstitution: Template = (random) => {
    const a = pick(random, [1, 2, 3])
    return {
        integrand: `\\frac{1}{e^x+${a}}`,
        method: 'substitution',
        first: 't=e^x\\qquad dx=\\frac{dt}{t}',
        result: `\\int\\frac{dx}{e^x+${a}}=\\frac{x-\\ln(e^x+${a})}{${a}}+k`,
        why: say('Baturetan $e^x$ dago: $t=e^x$ aldaketak arrazional bihurtzen du.', 'Hay $e^x$ en sumas: el cambio $t=e^x$ la vuelve racional.', 'يوجد $e^x$ في مجاميع: التعويض $t=e^x$ يجعله كسريًّا.', 'There is $e^x$ in sums: the change $t=e^x$ makes it rational.'),
        fn: (x) => 1 / (Math.exp(x) + a),
        F: (x) => (x - Math.log(Math.exp(x) + a)) / a
    }
}

const cosinePower: Template = () => ({
    integrand: '\\cos^3 x',
    method: 'substitution',
    first: 't=\\sin x\\qquad dt=\\cos x\\,dx',
    result: '\\int\\cos^3 x\\,dx=\\sin x-\\frac{\\sin^3 x}{3}+k',
    why: say('Kosinuaren berretura bakoitia: bereizi $\\cos x$ bat, eta $t=\\sin x$ aldaketa.', 'Potencia impar del coseno: separa un $\\cos x$ y cambio $t=\\sin x$.', 'قوة فردية لجيب التمام: افصل $\\cos x$ وعوّض $t=\\sin x$.', 'An odd power of cosine: take one $\\cos x$ apart and change $t=\\sin x$.'),
    fn: (x) => Math.cos(x) ** 3,
    F: (x) => Math.sin(x) - Math.sin(x) ** 3 / 3
})

/** The templates each level may use, per method */
const LEVELS: Array<Record<Method, Template[]>> = [
    { composed: [composedPower, composedExp], parts: [partsExp, partsCos], rational: [rationalConstant], substitution: [rootSubstitution, shiftedRoot] },
    { composed: [composedLog, composedHalfLog, composedExp], parts: [partsExp, partsCos, partsSquare], rational: [rationalLinear, rationalConstant], substitution: [rootSubstitution, expSubstitution] },
    { composed: [composedLog, composedHalfLog, composedTrig], parts: [partsAlone, partsSquare], rational: [rationalLinear, rationalDivision], substitution: [shiftedRoot, expSubstitution, cosinePower] }
]

/** Eight rounds, two of each method, in a shuffled order and never the same integral twice */
export function createMethodRounds(random: Random, level: number): MethodRound[] {
    const templates = LEVELS[Math.min(2, Math.max(0, level))]
    const methods = shuffle(random, METHODS.flatMap((method) => [method, method]))
    const rounds: MethodRound[] = []
    for (const method of methods) {
        for (let attempt = 0; attempt < 50; attempt += 1) {
            const made = pick(random, templates[method])(random)
            if (attempt < 49 && rounds.some((round) => round.integrand === made.integrand)) continue
            rounds.push({ ...made, answer: METHODS.indexOf(made.method) })
            break
        }
    }
    return rounds
}
