import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../text.ts'

/* ==========================================================================
   Deribatuen lasterketa (1.º Sociales · derivadas): five circuits, one per
   stage — rate of change (the average rate of a parabola, f′(a) of a
   parabola, the n of a tangent), rules (f′ of a polynomial at a point, of
   a product, of (bx + c)ⁿ), extremes (the x and the value of the vertex,
   the a that puts an extreme at a point), optimisation (the best
   production, the greatest profit, the greatest product) and graphs (the
   stationary points of a cubic, a vertical asymptote, the minimum read
   from f′). Every answer is a number; the wrong options are the typical
   mistakes. Every question carries `meta`, the numbers the tests check.
   ========================================================================== */

export const SOC_DERIV_RACE_CIRCUITS = 5

export type SocDerivRaceError =
    | 'length'
    | 'value'
    | 'point'
    | 'exponent'
    | 'product'
    | 'inside'
    | 'vertex'
    | 'height'
    | 'border'
    | 'break-even'
    | 'sign'
    | 'calculation'

export type SocDerivRaceQuestion = RaceQuestion<SocDerivRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const term = (value: number, body: string) => (value === 0 ? '' : `${value < 0 ? '-' : '+'}${Math.abs(value) === 1 && body ? '' : Math.abs(value)}${body}`)
const lead = (a: number, body: string) => `${a === 1 ? '' : a === -1 ? '-' : a}${body}`

interface Candidate {
    value: FractionValue
    error: SocDerivRaceError
}
const whole = (value: number, error: SocDerivRaceError): Candidate => ({ value: fraction(Math.round(value * 1000), 1000), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2, -value].map((item) => ({ value: fraction(Math.round(item * 1000), 1000), error: 'calculation' as const }))

function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<SocDerivRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SocDerivRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right.numerator / right.denominator)]) {
        if (wrong.length === 3) break
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SocDerivRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): SocDerivRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const derivativeAt = (latex: string, at: number) => say(`$f(x)=${latex}$ bada, zenbat da $f'(${at})$?`, `Si $f(x)=${latex}$, ¿cuánto vale $f'(${at})$?`, `إذا كانت $f(x)=${latex}$ فكم تساوي $f'(${at})$؟`, `If $f(x)=${latex}$, what is $f'(${at})$?`)

/* ---------- Circuit 0: rate of change ---------- */

function averageQuestion(random: Random): SocDerivRaceQuestion | null {
    const a = pick(random, [1, 2, 3, -1])
    const b = randomInt(random, -5, 8)
    const p = randomInt(random, 0, 3)
    const q = p + randomInt(random, 2, 4)
    const f = (x: number) => a * x * x + b * x
    const change = f(q) - f(p)
    const answer = fraction(change, q - p)
    const choices = options(random, answer, [whole(change, 'length'), { value: fraction(change, q), error: 'length' }, whole(2 * a * q + b, 'calculation')])
    return choices && build(0, 'average', say(`Zein da $f(x)=${lead(a, 'x^2')}${term(b, 'x')}$ funtzioaren T.V.M. $[${p},${q}]$ tartean?`, `¿Cuál es la T.V.M. de $f(x)=${lead(a, 'x^2')}${term(b, 'x')}$ en $[${p},${q}]$?`, `ما معدل التغير المتوسط لـ $f(x)=${lead(a, 'x^2')}${term(b, 'x')}$ في $[${p},${q}]$؟`, `What is the average rate of $f(x)=${lead(a, 'x^2')}${term(b, 'x')}$ on $[${p},${q}]$?`), choices, answer, same(`\\frac{${change}}{${q - p}}`), { a, b, p, q })
}

function slopeQuestion(random: Random): SocDerivRaceQuestion | null {
    const a = pick(random, [1, 2, 3, -2])
    const b = randomInt(random, -6, 6)
    const c = randomInt(random, -5, 5)
    const x = randomInt(random, -3, 4)
    const answer = fraction(2 * a * x + b)
    const value = a * x * x + b * x + c
    const choices = options(random, answer, [whole(value, 'value'), whole(a * x * x + b, 'exponent'), whole(2 * a * x, 'calculation')])
    return choices && build(0, 'slope', derivativeAt(`${lead(a, 'x^2')}${term(b, 'x')}${term(c, '')}`, x), choices, answer, same(`f'(x)=${2 * a}x${term(b, '')}\\qquad f'(${x})=${2 * a * x + b}`), { a, b, c, x })
}

function tangentQuestion(random: Random): SocDerivRaceQuestion | null {
    const x0 = randomInt(random, 1, 4)
    const k = randomInt(random, -4, 6)
    const m = 2 * x0
    const fa = x0 * x0 + k
    const n = fa - m * x0
    const answer = fraction(n)
    const choices = options(random, answer, [whole(-m * x0, 'point'), whole(fa, 'point'), whole(fa + m * x0, 'sign')])
    return choices && build(0, 'tangent', say(`$f(x)=x^2${term(k, '')}$ funtzioaren ukitzailea $x=${x0}$ puntuan $y=mx+n$ da. Zenbat da $n$?`, `La tangente a $f(x)=x^2${term(k, '')}$ en $x=${x0}$ es $y=mx+n$. ¿Cuánto vale $n$?`, `المماس لـ $f(x)=x^2${term(k, '')}$ عند $x=${x0}$ هو $y=mx+n$. كم تساوي $n$؟`, `The tangent to $f(x)=x^2${term(k, '')}$ at $x=${x0}$ is $y=mx+n$. What is $n$?`), choices, answer, same(`y-${fa < 0 ? `(${fa})` : fa}=${m}(x-${x0})\\ \\to\\ n=${n}`), { x0, k })
}

/* ---------- Circuit 1: rules ---------- */

function polynomialQuestion(random: Random): SocDerivRaceQuestion | null {
    const a = randomInt(random, 1, 4)
    const b = randomInt(random, -6, 6)
    const x = randomInt(random, -2, 3)
    const answer = fraction(3 * a * x * x + b)
    const choices = options(random, answer, [whole(3 * a * x ** 3 + b, 'exponent'), whole(a * x ** 3 + b * x, 'value'), whole(3 * a * x * x, 'calculation')])
    return choices && build(1, 'polynomial', derivativeAt(`${lead(a, 'x^3')}${term(b, 'x')}`, x), choices, answer, same(`f'(x)=${3 * a}x^2${term(b, '')}\\qquad f'(${x})=${3 * a * x * x + b}`), { a, b, x })
}

function productQuestion(random: Random): SocDerivRaceQuestion | null {
    const a = randomInt(random, 1, 6)
    const c = randomInt(random, 1, 5)
    const x = randomInt(random, 1, 3)
    // f = (x² + a)(x + c): f′ = 2x(x + c) + (x² + a)
    const answer = fraction(2 * x * (x + c) + x * x + a)
    const choices = options(random, answer, [whole(2 * x, 'product'), whole(2 * x * (x + c), 'product'), whole((x * x + a) * (x + c), 'value')])
    return choices && build(1, 'product', derivativeAt(`(x^2+${a})(x+${c})`, x), choices, answer, same(`2\\cdot ${x}\\cdot ${x + c}+${x * x + a}=${2 * x * (x + c) + x * x + a}`), { a, c, x })
}

function chainQuestion(random: Random): SocDerivRaceQuestion | null {
    const b = randomInt(random, 2, 4)
    const c = randomInt(random, -3, 3)
    const n = randomInt(random, 2, 3)
    const x = randomInt(random, 0, 2)
    const inner = b * x + c
    if (inner === 0) return null
    const answer = fraction(n * inner ** (n - 1) * b)
    const choices = options(random, answer, [whole(n * inner ** (n - 1), 'inside'), whole(inner ** n, 'value'), whole(n * b * inner ** n, 'exponent')])
    return choices && build(1, 'chain', derivativeAt(`(${b}x${term(c, '')})^${n}`, x), choices, answer, same(`${n}\\cdot ${inner < 0 ? `(${inner})` : inner}^{${n - 1}}\\cdot ${b}=${n * inner ** (n - 1) * b}`), { b, c, n, x })
}

/* ---------- Circuit 2: growth and extremes ---------- */

function vertexXQuestion(random: Random): SocDerivRaceQuestion | null {
    const h = randomInt(random, -5, 8)
    const a = pick(random, [1, -1, 2])
    const b = -2 * a * h
    const c = randomInt(random, -9, 9)
    if (b === 0) return null
    const answer = fraction(h)
    const choices = options(random, answer, [whole(-h, 'sign'), whole(b, 'calculation'), whole(c, 'height')])
    return choices && build(2, 'vertex-x', say(`Zein $x$ baliotan du muturra $f(x)=${lead(a, 'x^2')}${term(b, 'x')}${term(c, '')}$ funtzioak?`, `¿En qué $x$ tiene su extremo $f(x)=${lead(a, 'x^2')}${term(b, 'x')}${term(c, '')}$?`, `عند أي $x$ تكون القيمة القصوى لـ $f(x)=${lead(a, 'x^2')}${term(b, 'x')}${term(c, '')}$؟`, `At which $x$ does $f(x)=${lead(a, 'x^2')}${term(b, 'x')}${term(c, '')}$ have its extreme?`), choices, answer, same(`${2 * a}x${term(b, '')}=0\\ \\to\\ x=${h}`), { a, b, c })
}

function vertexValueQuestion(random: Random): SocDerivRaceQuestion | null {
    const h = randomInt(random, 1, 6)
    const k = randomInt(random, -9, 9)
    // (x − h)² + k = x² − 2hx + h² + k
    const c = h * h + k
    const answer = fraction(k)
    const choices = options(random, answer, [whole(h, 'vertex'), whole(c, 'height'), whole(-k, 'sign')])
    return choices && build(2, 'vertex-value', say(`Zenbat balio du $f(x)=x^2-${2 * h}x${term(c, '')}$ funtzioaren minimoak?`, `¿Cuánto vale el mínimo de $f(x)=x^2-${2 * h}x${term(c, '')}$?`, `كم تساوي القيمة الصغرى لـ $f(x)=x^2-${2 * h}x${term(c, '')}$؟`, `What is the minimum value of $f(x)=x^2-${2 * h}x${term(c, '')}$?`), choices, answer, same(`x=${h}\\qquad ${h * h}-${2 * h * h}${term(c, '')}=${k}`), { h, k })
}

function parameterQuestion(random: Random): SocDerivRaceQuestion | null {
    const x0 = pick(random, [-3, -2, 2, 3, 4, 5])
    const answer = fraction(-2 * x0)
    const choices = options(random, answer, [whole(2 * x0, 'sign'), whole(-x0, 'calculation'), whole(-x0 * x0, 'value')])
    return choices && build(2, 'parameter', say(`Zer $a$ baliok ematen dio mutur bat $f(x)=x^2+ax$ funtzioari $x=${x0}$ puntuan?`, `¿Qué $a$ da a $f(x)=x^2+ax$ un extremo en $x=${x0}$?`, `ما قيمة $a$ التي تجعل لـ $f(x)=x^2+ax$ قيمة قصوى عند $x=${x0}$؟`, `Which $a$ gives $f(x)=x^2+ax$ an extreme at $x=${x0}$?`), choices, answer, same(`${2 * x0}+a=0\\ \\to\\ a=${-2 * x0}`), { x0 })
}

/* ---------- Circuit 3: optimisation ---------- */

function productionQuestion(random: Random): SocDerivRaceQuestion | null {
    const best = randomInt(random, 5, 30)
    const F = pick(random, [0, 100, 200])
    const answer = fraction(best)
    const choices = options(random, answer, [whole(2 * best, 'calculation'), whole(best * best - F > 0 ? Math.round(best - Math.sqrt(best * best - F)) : best + 3, 'break-even'), whole(best + 1, 'calculation')])
    return choices && build(3, 'production', say(`$B(x)=-x^2+${2 * best}x${term(-F, '')}$. Zenbat unitatek ematen dute mozkin maximoa?`, `$B(x)=-x^2+${2 * best}x${term(-F, '')}$. ¿Cuántas unidades dan el beneficio máximo?`, `$B(x)=-x^2+${2 * best}x${term(-F, '')}$. كم وحدة تعطي الربح الأعظم؟`, `$B(x)=-x^2+${2 * best}x${term(-F, '')}$. How many units give the greatest profit?`), choices, answer, same(`-2x+${2 * best}=0\\ \\to\\ x=${best}`), { best, F })
}

function profitQuestion(random: Random): SocDerivRaceQuestion | null {
    const p = pick(random, [30, 40, 50, 60])
    const v = pick(random, [0, 10, 20])
    const F = pick(random, [0, 50, 100])
    // I = p·x and C = x² + v·x + F: x = (p − v)/2
    const x = (p - v) / 2
    const answer = fraction(x * x - F)
    const choices = options(random, answer, [whole(x, 'calculation'), whole(x * x, 'calculation'), whole(p * x - F, 'calculation')])
    return choices && build(3, 'profit', say(`$I(x)=${p}x$ eta $C(x)=x^2${term(v, 'x')}${term(F, '')}$. Zenbat da mozkin maximoa?`, `$I(x)=${p}x$ y $C(x)=x^2${term(v, 'x')}${term(F, '')}$. ¿Cuánto es el beneficio máximo?`, `$I(x)=${p}x$ و$C(x)=x^2${term(v, 'x')}${term(F, '')}$. كم الربح الأعظم؟`, `$I(x)=${p}x$ and $C(x)=x^2${term(v, 'x')}${term(F, '')}$. What is the greatest profit?`), choices, answer, same(`x=${x}\\qquad ${p}\\cdot ${x}-${x * x + v * x + F}=${x * x - F}`), { p, v, F })
}

function numbersQuestion(random: Random): SocDerivRaceQuestion | null {
    const S = 2 * randomInt(random, 4, 15)
    const answer = fraction((S / 2) ** 2)
    const choices = options(random, answer, [whole(S / 2, 'calculation'), whole(S * S, 'calculation'), whole((S / 2) * (S / 2 + 1), 'calculation')])
    return choices && build(3, 'numbers', say(`Bi zenbaki positiboren batura ${S} da. Zein da haien biderkadurarik handiena?`, `Dos números positivos suman ${S}. ¿Cuál es su producto máximo?`, `عددان موجبان مجموعهما ${S}. ما أكبر جداء لهما؟`, `Two positive numbers add up to ${S}. What is their greatest product?`), choices, answer, same(`${S / 2}\\cdot ${S / 2}=${(S / 2) ** 2}`), { S })
}

/* ---------- Circuit 4: graphs ---------- */

function countQuestion(random: Random): SocDerivRaceQuestion | null {
    const a = randomInt(random, 1, 9)
    const sign = pick(random, [1, -1])
    // x³ − 3a·x has two stationary points; x³ + 3a·x has none
    const answer = fraction(sign < 0 ? 2 : 0)
    const choices = options(random, answer, [whole(sign < 0 ? 0 : 2, 'sign'), whole(1, 'calculation'), whole(3, 'calculation')])
    return choices && build(4, 'count', say(`Zenbat puntu singular ditu $f(x)=x^3${signed(sign * 3 * a)}x$ funtzioak?`, `¿Cuántos puntos singulares tiene $f(x)=x^3${signed(sign * 3 * a)}x$?`, `كم نقطة حرجة لـ $f(x)=x^3${signed(sign * 3 * a)}x$؟`, `How many stationary points does $f(x)=x^3${signed(sign * 3 * a)}x$ have?`), choices, answer, same(`3x^2${signed(sign * 3 * a)}=0`), { a, sign })
}

function asymptoteQuestion(random: Random): SocDerivRaceQuestion | null {
    const a = pick(random, [-5, -4, -3, -2, 2, 3, 4, 5, 6])
    const answer = fraction(a)
    const choices = options(random, answer, [whole(-a, 'sign'), whole(0, 'calculation'), whole(a * a, 'calculation')])
    return choices && build(4, 'asymptote', say(`$f(x)=\\frac{x^2}{x${signed(-a)}}$ funtzioaren asintota bertikala $x=k$ da. Zenbat da $k$?`, `La asíntota vertical de $f(x)=\\frac{x^2}{x${signed(-a)}}$ es $x=k$. ¿Cuánto vale $k$?`, `المقارب الرأسي لـ $f(x)=\\frac{x^2}{x${signed(-a)}}$ هو $x=k$. كم تساوي $k$؟`, `The vertical asymptote of $f(x)=\\frac{x^2}{x${signed(-a)}}$ is $x=k$. What is $k$?`), choices, answer, same(`x${signed(-a)}=0\\ \\to\\ x=${a}`), { a })
}

function minimumQuestion(random: Random): SocDerivRaceQuestion | null {
    const r = randomInt(random, -4, 2)
    const s = r + randomInt(random, 2, 5)
    // f′ = (x − r)(x − s): + − + so the minimum is at s
    const answer = fraction(s)
    const choices = options(random, answer, [whole(r, 'sign'), whole((r + s) / 2, 'calculation'), whole(-s, 'sign')])
    const factor = (value: number) => (value === 0 ? 'x' : `(x${signed(-value)})`)
    return choices && build(4, 'minimum', say(`$f'(x)=${factor(r)}${factor(s)}$ bada, zein $x$ baliotan du minimoa $f$ funtzioak?`, `Si $f'(x)=${factor(r)}${factor(s)}$, ¿en qué $x$ tiene $f$ su mínimo?`, `إذا كانت $f'(x)=${factor(r)}${factor(s)}$ فعند أي $x$ تكون القيمة الصغرى لـ $f$؟`, `If $f'(x)=${factor(r)}${factor(s)}$, at which $x$ does $f$ have its minimum?`), choices, answer, same(`x=${s}`), { r, s })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => SocDerivRaceQuestion | null>> = [
    [averageQuestion, slopeQuestion, tangentQuestion],
    [polynomialQuestion, productQuestion, chainQuestion],
    [vertexXQuestion, vertexValueQuestion, parameterQuestion],
    [productionQuestion, profitQuestion, numbersQuestion],
    [countQuestion, asymptoteQuestion, minimumQuestion]
]

export function generateSocDerivRaceQuestion(random: Random, circuit: number, tier: Tier): SocDerivRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSocDerivPitAnswer(question: RaceQuestion<SocDerivRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function socDerivParTime(circuit: number): number {
    return parTimeFor([13, 14, 13, 13, 12][circuit] ?? 13)
}

export const socDerivRaceErrorTips: Record<SocDerivRaceError, LocalizedText> = {
    length: say('T.V.M.: zatitu tartearen luzeraz, b − a.', 'T.V.M.: divide entre la longitud del intervalo, b − a.', 'معدل التغير المتوسط: اقسم على طول المجال b − a.', 'Average rate: divide by the length of the interval, b − a.'),
    value: say('Hori f(a) da; deribatua malda da.', 'Eso es f(a); la derivada es la pendiente.', 'هذا f(a)؛ والمشتقة هي الميل.', 'That is f(a); the derivative is the slope.'),
    point: say('Ukitzailea: y − f(a) = f′(a)(x − a).', 'Tangente: y − f(a) = f′(a)(x − a).', 'المماس: y − f(a) = f′(a)(x − a).', 'Tangent: y − f(a) = f′(a)(x − a).'),
    exponent: say('(xⁿ)′ = n·xⁿ⁻¹: kendu bat berretzaileari.', '(xⁿ)′ = n·xⁿ⁻¹: resta uno al exponente.', '(xⁿ)′ = n·xⁿ⁻¹: اطرح واحدًا من الأس.', '(xⁿ)′ = n·xⁿ⁻¹: take one off the exponent.'),
    product: say('(f·g)′ = f′·g + f·g′.', '(f·g)′ = f′·g + f·g′.', '(f·g)′ = f′·g + f·g′.', '(f·g)′ = f′·g + f·g′.'),
    inside: say('Katea: biderkatu barrukoaren deribatuaz.', 'Cadena: multiplica por la derivada de dentro.', 'السلسلة: اضرب في مشتقة الداخل.', 'Chain: multiply by the derivative of the inside.'),
    vertex: say('Hori x da; galdera f funtzioaren balioa da.', 'Eso es la x; se pregunta el valor de f.', 'هذا x؛ والسؤال عن قيمة f.', 'That is x; the question asks for the value of f.'),
    height: say('Ordezkatu x funtzioan.', 'Sustituye la x en la función.', 'عوّض x في الدالة.', 'Substitute x into the function.'),
    border: say('Begiratu ertzak ere.', 'Mira también los bordes.', 'انظر إلى الطرفين أيضًا.', 'Look at the borders too.'),
    'break-even': say('B(x) = 0 ez da maximoa: ebatzi B′(x) = 0.', 'B(x) = 0 no es el máximo: resuelve B′(x) = 0.', 'B(x) = 0 ليست القيمة العظمى: حُلّ B′(x) = 0.', 'B(x) = 0 is not the maximum: solve B′(x) = 0.'),
    sign: say('Begiratu zeinua berriro.', 'Revisa el signo.', 'راجع الإشارة.', 'Check the sign.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
