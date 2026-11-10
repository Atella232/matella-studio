import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuen lasterketa · Batxilergoa 2 (Carrera de derivadas de 2.º):
   five circuits, one per stage — the review (the slope of a tangent, the
   slope of a normal, f′(1) of a product), differentiability (the k that
   joins two pieces, how many corners an absolute value has, a one-sided
   derivative), the chain rule (three layers at 0, ln(x² + c) at 1, the
   nth derivative of e^{kx} at 0), special derivatives (the inverse, a
   circle and an ellipse) and tangent problems (a horizontal tangent, a
   coefficient from a slope, the tangents from (0, −k²)). The wrong
   options are the typical mistakes; every question carries `meta`, the
   numbers the tests check it against.
   ========================================================================== */

export const BACH2_DERIVATIVES_RACE_CIRCUITS = 5

export type Bach2DerivativesRaceError =
    | 'value'
    | 'square'
    | 'normal'
    | 'sign'
    | 'product'
    | 'joint'
    | 'corner'
    | 'side'
    | 'inside'
    | 'uprime'
    | 'power'
    | 'reciprocal'
    | 'point'
    | 'swap'
    | 'half'
    | 'exterior'
    | 'calculation'

export type Bach2DerivativesRaceQuestion = RaceQuestion<Bach2DerivativesRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
/** A term c·letters after another one: nothing for 0, +x or −x for ±1 */
const plusTerm = (coefficient: number, letters: string) => (coefficient === 0 ? '' : `${coefficient < 0 ? '-' : '+'}${Math.abs(coefficient) === 1 ? '' : Math.abs(coefficient)}${letters}`)
/** A positive coefficient in front of letters: x, not 1x */
const times = (coefficient: number, letters: string) => `${coefficient === 1 ? '' : coefficient}${letters}`

interface Candidate {
    value: FractionValue
    error: Bach2DerivativesRaceError
}
const whole = (value: number, error: Bach2DerivativesRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: Bach2DerivativesRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<Bach2DerivativesRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: Bach2DerivativesRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Bach2DerivativesRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): Bach2DerivativesRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const valueAt = (fn: string, ask: string) => say(`${math(fn)}. Zenbat da ${math(ask)}?`, `${math(fn)}. ¿Cuánto vale ${math(ask)}?`, `${math(fn)}. كم تساوي ${math(ask)}؟`, `${math(fn)}. What is ${math(ask)}?`)

/* ---------- Circuit 0: review of 1.º ---------- */

/** The slope of the tangent to x³ + px at a: 3a² + p */
function tangentQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const a = randomInt(random, 1, 3)
    const p = randomInt(random, -4, 4)
    const answer = fraction(3 * a * a + p)
    const choices = options(random, answer, [whole(a ** 3 + p * a, 'value'), whole(3 * a + p, 'square'), whole(3 * a * a, 'calculation')])
    return choices && build(0, 'tangent', say(`Zein da ${math(`f(x)=x^3${plusTerm(p, 'x')}`)} funtzioaren zuzen ukitzailearen malda ${math(`x=${a}`)} puntuan?`, `¿Cuál es la pendiente de la tangente a ${math(`f(x)=x^3${plusTerm(p, 'x')}`)} en ${math(`x=${a}`)}?`, `ما ميل مماس ${math(`f(x)=x^3${plusTerm(p, 'x')}`)} عند ${math(`x=${a}`)}؟`, `What is the slope of the tangent to ${math(`f(x)=x^3${plusTerm(p, 'x')}`)} at ${math(`x=${a}`)}?`), choices, answer, same(`f'(${a})=3\\cdot ${a * a}${p === 0 ? '' : signed(p)}=${3 * a * a + p}`), { a, p })
}

/** The slope of the normal to x² + px at a: −1/(2a + p) */
function normalQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const a = randomInt(random, 1, 3)
    const p = randomInt(random, -2, 3)
    const m = 2 * a + p
    if (Math.abs(m) < 2) return null
    const answer = fraction(-1, m)
    const choices = options(random, answer, [whole(-m, 'normal'), ratio(1, m, 'sign'), whole(m, 'calculation')])
    return choices && build(0, 'normal', say(`Zein da ${math(`f(x)=x^2${plusTerm(p, 'x')}`)} funtzioaren normalaren malda ${math(`x=${a}`)} puntuan?`, `¿Cuál es la pendiente de la normal a ${math(`f(x)=x^2${plusTerm(p, 'x')}`)} en ${math(`x=${a}`)}?`, `ما ميل العمودي على ${math(`f(x)=x^2${plusTerm(p, 'x')}`)} عند ${math(`x=${a}`)}؟`, `What is the slope of the normal to ${math(`f(x)=x^2${plusTerm(p, 'x')}`)} at ${math(`x=${a}`)}?`), choices, answer, same(`f'(${a})=${m}\\ \\to\\ -\\frac{1}{${m}}`), { a, p })
}

/** f′(1) of (x + p)(x² + q): (1 + q) + 2(1 + p) */
function productQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const p = randomInt(random, 1, 5)
    const q = randomInt(random, 1, 5)
    const answer = fraction(1 + q + 2 * (1 + p))
    const choices = options(random, answer, [whole(2, 'product'), whole(1 + q, 'product'), whole(2 * (1 + p), 'calculation')])
    return choices && build(0, 'product', valueAt(`f(x)=(x+${p})(x^2+${q})`, "f'(1)"), choices, answer, same(`f'(1)=${1 + q}+${1 + p}\\cdot 2=${1 + q + 2 * (1 + p)}`), { p, q })
}

/* ---------- Circuit 1: differentiability ---------- */

/** {x² + k, x < a; 2a·x + b, x ≥ a}: the slopes match; continuity gives k = a² + b */
function joinQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const a = randomInt(random, 1, 3)
    const b = randomInt(random, -4, 4)
    const k = a * a + b
    const answer = fraction(k)
    const choices = options(random, answer, [whole(b, 'joint'), whole(2 * a * a + b, 'joint'), whole(a * a, 'calculation')])
    const formula = `f(x)=\\begin{cases}x^2+k & x<${a}\\\\ ${2 * a}x${b === 0 ? '' : signed(b)} & x\\ge ${a}\\end{cases}`
    return choices && build(1, 'join', say(`Funtzio hau deribagarria da ${math(`x=${a}`)} puntuan: ${math(formula)} Zenbat da $k$?`, `Esta función es derivable en ${math(`x=${a}`)}: ${math(formula)} ¿Cuánto vale $k$?`, `هذه الدالة قابلة للاشتقاق عند ${math(`x=${a}`)}: ${math(formula)} كم تساوي $k$؟`, `This function is differentiable at ${math(`x=${a}`)}: ${math(formula)} What is $k$?`), choices, answer, same(`${a * a}+k=${2 * a * a}${signed(b)}\\ \\to\\ k=${k}`), { a, b })
}

/** How many corners: |x² − c²| (2), |(x − c)²| (0), |x² − cx| (2), |x³ − c²x| (3) */
function cornersQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const c = randomInt(random, 1, 4)
    const kind = pick(random, ['difference', 'square', 'factor', 'cubic'] as const)
    const [latex, count, zeros] = kind === 'difference'
        ? [`|x^2-${c * c}|`, 2, `x=\\pm ${c}`]
        : kind === 'square'
            ? [`|x^2-${2 * c}x+${c * c}|`, 0, `(x-${c})^2\\ge 0`]
            : kind === 'factor'
                ? [`|x^2-${c === 1 ? '' : c}x|`, 2, `x=0,\\ x=${c}`]
                : [`|x^3-${times(c * c, 'x')}|`, 3, `x=0,\\ x=\\pm ${c}`]
    const answer = fraction(count)
    const choices = options(random, answer, [whole(count === 0 ? 1 : count - 1, 'corner'), whole(count + 1, 'corner'), whole(0, 'corner')])
    return choices && build(1, 'corners', say(`Zenbat puntutan ez da deribagarria ${math(`f(x)=${latex}`)}?`, `¿En cuántos puntos no es derivable ${math(`f(x)=${latex}`)}?`, `في كم نقطة تكون ${math(`f(x)=${latex}`)} غير قابلة للاشتقاق؟`, `At how many points is ${math(`f(x)=${latex}`)} not differentiable?`), choices, answer, same(zeros), { c, count })
}

/** f′(a⁺) of |x − a| + px: 1 + p */
function sideQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const a = randomInt(random, 1, 4)
    const p = randomInt(random, -3, 3)
    if (p === 0) return null
    const answer = fraction(1 + p)
    const choices = options(random, answer, [whole(p - 1, 'side'), whole(p, 'calculation'), whole(1 - p, 'sign')])
    return choices && build(1, 'side', valueAt(`f(x)=|x-${a}|${plusTerm(p, 'x')}`, `f'(${a}^+)`), choices, answer, same(`f(x)=x-${a}${plusTerm(p, 'x')}\\ \\to\\ 1${signed(p)}=${1 + p}`), { a, p })
}

/* ---------- Circuit 2: the chain rule ---------- */

/** f′(0) of e^{p·sin(qx)}: pq */
function threeQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const p = randomInt(random, 1, 4)
    const q = randomInt(random, 2, 5)
    const answer = fraction(p * q)
    const choices = options(random, answer, [whole(p, 'inside'), whole(q, 'inside'), whole(p + q, 'calculation')])
    const fn = p === 1 ? `f(x)=e^{\\sin(${q}x)}` : `f(x)=e^{${p}\\sin(${q}x)}`
    return choices && build(2, 'three', valueAt(fn, "f'(0)"), choices, answer, same(`f'(0)=e^{0}\\cdot ${p}\\cos 0\\cdot ${q}=${p * q}`), { p, q })
}

/** f′(1) of ln(x² + c): 2/(1 + c) */
function tableQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const c = randomInt(random, 1, 7)
    const answer = fraction(2, 1 + c)
    const choices = options(random, answer, [ratio(1, 1 + c, 'uprime'), ratio(2, c, 'calculation'), whole(2, 'uprime')])
    return choices && build(2, 'table', valueAt(`f(x)=\\ln(x^2+${c})`, "f'(1)"), choices, answer, same(`f'(1)=\\frac{2\\cdot 1}{1+${c}}=\\frac{2}{${1 + c}}`), { c })
}

/** f⁽ⁿ⁾(0) of e^{kx}: kⁿ */
function nthQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const k = pick(random, [-2, 2, 3])
    const n = randomInt(random, 2, 4)
    const answer = fraction(k ** n)
    const choices = options(random, answer, [whole(n * k, 'power'), whole(k ** (n - 1), 'power'), whole(-(k ** n), 'sign')])
    return choices && build(2, 'nth', valueAt(`f(x)=e^{${k}x}`, `f^{(${n})}(0)`), choices, answer, same(`f^{(${n})}(x)=(${k})^{${n}}e^{${k}x}\\ \\to\\ ${k ** n}`), { k, n })
}

/* ---------- Circuit 3: special derivatives ---------- */

/** (f⁻¹)′(f(1)) for f = x³ + px: 1/(3 + p) */
function inverseQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const p = randomInt(random, 1, 6)
    const b = 1 + p
    const answer = fraction(1, 3 + p)
    const choices = options(random, answer, [whole(3 + p, 'reciprocal'), ratio(1, 3 * b * b + p, 'point'), ratio(-1, 3 + p, 'sign')])
    return choices && build(3, 'inverse', say(`${math(`f(x)=x^3+${times(p, 'x')}`)} funtzioak alderantzizkoa du, eta ${math(`f(1)=${b}`)}. Zenbat da ${math(`(f^{-1})'(${b})`)}?`, `${math(`f(x)=x^3+${times(p, 'x')}`)} tiene inversa y ${math(`f(1)=${b}`)}. ¿Cuánto vale ${math(`(f^{-1})'(${b})`)}?`, `للدالة ${math(`f(x)=x^3+${times(p, 'x')}`)} دالة عكسية و${math(`f(1)=${b}`)}. كم تساوي ${math(`(f^{-1})'(${b})`)}؟`, `${math(`f(x)=x^3+${times(p, 'x')}`)} has an inverse and ${math(`f(1)=${b}`)}. What is ${math(`(f^{-1})'(${b})`)}?`), choices, answer, same(`\\frac{1}{f'(1)}=\\frac{1}{${3 + p}}`), { p })
}

const CIRCLE_POINTS: Array<[number, number]> = [[3, 4], [4, 3], [-3, 4], [3, -4], [1, 2], [2, -1], [1, 3], [-3, 1], [2, 3], [-2, 3]]

/** The slope on x² + y² = r² at (a, b): −a/b */
function circleQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const [a, b] = pick(random, CIRCLE_POINTS)
    const r2 = a * a + b * b
    const answer = fraction(-a, b)
    const choices = options(random, answer, [ratio(-b, a, 'swap'), ratio(a, b, 'sign'), whole(-1, 'calculation')])
    return choices && build(3, 'circle', say(`${math(`x^2+y^2=${r2}`)} kurban, zenbat da ${math("y'")} deribatua ${math(`(${a},${b})`)} puntuan?`, `En ${math(`x^2+y^2=${r2}`)}, ¿cuánto vale ${math("y'")} en ${math(`(${a},${b})`)}?`, `على ${math(`x^2+y^2=${r2}`)}، كم تساوي ${math("y'")} عند ${math(`(${a},${b})`)}؟`, `On ${math(`x^2+y^2=${r2}`)}, what is ${math("y'")} at ${math(`(${a},${b})`)}?`), choices, answer, same(`y'=-\\frac{x}{y}=${written(answer)}`), { a, b })
}

/** The slope on x² + ky² = d at (a, b): −a/(kb) */
function ellipseQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const k = pick(random, [2, 3, 4])
    const a = pick(random, [-2, -1, 1, 2, 3])
    const b = pick(random, [-2, -1, 1, 2])
    const d = a * a + k * b * b
    const answer = fraction(-a, k * b)
    const choices = options(random, answer, [ratio(-a, b, 'half'), ratio(-k * b, a, 'swap'), ratio(a, k * b, 'sign')])
    return choices && build(3, 'ellipse', say(`${math(`x^2+${k}y^2=${d}`)} kurban, zenbat da ${math("y'")} deribatua ${math(`(${a},${b})`)} puntuan?`, `En ${math(`x^2+${k}y^2=${d}`)}, ¿cuánto vale ${math("y'")} en ${math(`(${a},${b})`)}?`, `على ${math(`x^2+${k}y^2=${d}`)}، كم تساوي ${math("y'")} عند ${math(`(${a},${b})`)}؟`, `On ${math(`x^2+${k}y^2=${d}`)}, what is ${math("y'")} at ${math(`(${a},${b})`)}?`), choices, answer, same(`y'=-\\frac{x}{${k}y}\\ \\to\\ ${written(answer)}`), { k, a, b })
}

/* ---------- Circuit 4: tangent problems ---------- */

/** The abscissa of the horizontal tangent of x² + bx + c: −b/2 */
function horizontalQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const b = pick(random, [-8, -6, -4, -3, -2, 2, 3, 4, 6])
    const c = randomInt(random, -5, 5)
    const answer = fraction(-b, 2)
    const choices = options(random, answer, [ratio(b, 2, 'sign'), whole(-b, 'half'), whole(b, 'calculation')])
    return choices && build(4, 'horizontal', say(`Zein abzisatan da horizontala ${math(`f(x)=x^2${signed(b)}x${c === 0 ? '' : signed(c)}`)} funtzioaren zuzen ukitzailea?`, `¿En qué abscisa es horizontal la tangente a ${math(`f(x)=x^2${signed(b)}x${c === 0 ? '' : signed(c)}`)}?`, `عند أي فاصلة يكون مماس ${math(`f(x)=x^2${signed(b)}x${c === 0 ? '' : signed(c)}`)} أفقيًّا؟`, `At which abscissa is the tangent to ${math(`f(x)=x^2${signed(b)}x${c === 0 ? '' : signed(c)}`)} horizontal?`), choices, answer, same(`2x${signed(b)}=0\\ \\to\\ x=${written(answer)}`), { b, c })
}

/** The tangent to x² + bx at a has slope m: b = m − 2a */
function coefficientQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const a = randomInt(random, 1, 3)
    const m = randomInt(random, -3, 8)
    const b = m - 2 * a
    if (b === 0) return null
    const answer = fraction(b)
    const choices = options(random, answer, [whole(m - a, 'calculation'), whole(m, 'calculation'), whole(m + 2 * a, 'sign')])
    return choices && build(4, 'coefficient', say(`${math('f(x)=x^2+bx')} funtzioaren zuzen ukitzaileak ${math(`x=${a}`)} puntuan ${math(`${m}`)} malda du. Zenbat da $b$?`, `La tangente a ${math('f(x)=x^2+bx')} en ${math(`x=${a}`)} tiene pendiente ${math(`${m}`)}. ¿Cuánto vale $b$?`, `ميل مماس ${math('f(x)=x^2+bx')} عند ${math(`x=${a}`)} يساوي ${math(`${m}`)}. كم تساوي $b$؟`, `The tangent to ${math('f(x)=x^2+bx')} at ${math(`x=${a}`)} has slope ${math(`${m}`)}. What is $b$?`), choices, answer, same(`${2 * a}+b=${m}\\ \\to\\ b=${b}`), { a, m })
}

/** The positive slope of the tangents to x² from (0, −k²): 2k */
function exteriorQuestion(random: Random): Bach2DerivativesRaceQuestion | null {
    const k = randomInt(random, 1, 5)
    const answer = fraction(2 * k)
    const choices = options(random, answer, [whole(0, 'exterior'), whole(k, 'calculation'), whole(k * k, 'calculation')])
    return choices && build(4, 'exterior', say(`${math(`(0,-${k * k})`)} puntutik ${math('y=x^2')} parabolaren bi zuzen ukitzaile igarotzen dira. Zein da malda positiboa?`, `Por ${math(`(0,-${k * k})`)} pasan dos tangentes a ${math('y=x^2')}. ¿Cuál es la pendiente positiva?`, `يمر بالنقطة ${math(`(0,-${k * k})`)} مماسان للقطع ${math('y=x^2')}. ما الميل الموجب؟`, `Two tangents to ${math('y=x^2')} pass through ${math(`(0,-${k * k})`)}. What is the positive slope?`), choices, answer, same(`-${k * k}=-c^2\\ \\to\\ c=${k}\\ \\to\\ ${2 * k}`), { k })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => Bach2DerivativesRaceQuestion | null>> = [
    [tangentQuestion, normalQuestion, productQuestion],
    [joinQuestion, cornersQuestion, sideQuestion],
    [threeQuestion, tableQuestion, nthQuestion],
    [inverseQuestion, circleQuestion, ellipseQuestion],
    [horizontalQuestion, coefficientQuestion, exteriorQuestion]
]

export function generateBach2DerivativesRaceQuestion(random: Random, circuit: number, tier: Tier): Bach2DerivativesRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBach2DerivativesPitAnswer(question: RaceQuestion<Bach2DerivativesRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bach2DerivativesParTime(circuit: number): number {
    return parTimeFor([12, 14, 14, 15, 13][circuit] ?? 13)
}

export const bach2DerivativesRaceErrorTips: Record<Bach2DerivativesRaceError, LocalizedText> = {
    value: say('Hori $f(a)$ da; malda $f\'(a)$ da.', 'Eso es $f(a)$; la pendiente es $f\'(a)$.', 'هذا $f(a)$؛ والميل $f\'(a)$.', 'That is $f(a)$; the slope is $f\'(a)$.'),
    square: say('$(x^3)\'=3x^2$: ez ahaztu karratua.', '$(x^3)\'=3x^2$: no olvides el cuadrado.', '$(x^3)\'=3x^2$: لا تنس المربع.', '$(x^3)\'=3x^2$: do not forget the square.'),
    normal: say('Normalaren malda $-\\frac{1}{m}$ da, ez $-m$.', 'La normal tiene pendiente $-\\frac{1}{m}$, no $-m$.', 'ميل العمودي $-\\frac{1}{m}$ لا $-m$.', 'The normal has slope $-\\frac{1}{m}$, not $-m$.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه إلى الإشارة.', 'Watch the sign.'),
    product: same('$(uv)\'=u\'v+uv\'$'),
    joint: say('Lotunean, bi zatien balioak berdinak.', 'En la unión, los valores de los dos trozos iguales.', 'عند الالتقاء تتساوى قيمتا الجزأين.', 'At the joint, the values of both pieces are equal.'),
    corner: say('Punta bat dago barrukoa zeinuz aldatzen den tokian; $(x-c)^2$ ez da aldatzen.', 'Hay pico donde lo de dentro cambia de signo; $(x-c)^2$ no cambia.', 'توجد زاوية حيث تتغير إشارة ما بالداخل؛ و$(x-c)^2$ لا تتغير.', 'There is a corner where the inside changes sign; $(x-c)^2$ does not.'),
    side: say('Eskuinean $|x-a|=x-a$, eta haren malda 1 da.', 'A la derecha $|x-a|=x-a$, de pendiente 1.', 'على اليمين $|x-a|=x-a$ وميلها 1.', 'On the right $|x-a|=x-a$, with slope 1.'),
    inside: say('Geruza bakoitzak faktore bat ematen du.', 'Cada capa da un factor.', 'كل طبقة تعطي عاملًا.', 'Each layer gives a factor.'),
    uprime: same('$(\\ln u)\'=\\frac{u\'}{u}$'),
    power: say('Deribatu bakoitzak $k$ biderkatzen du: $k^n$.', 'Cada derivada multiplica por $k$: $k^n$.', 'كل مشتقة تضرب في $k$: $k^n$.', 'Each derivative multiplies by $k$: $k^n$.'),
    reciprocal: say('Alderantzizkoaren malda $\\frac{1}{f\'(a)}$ da.', 'La pendiente de la inversa es $\\frac{1}{f\'(a)}$.', 'ميل الدالة العكسية $\\frac{1}{f\'(a)}$.', 'The slope of the inverse is $\\frac{1}{f\'(a)}$.'),
    point: say('$f\'$ deribatua $a=1$ puntuan, ez $f(1)$ puntuan.', 'La $f\'$ va en $a=1$, no en $f(1)$.', 'تُقيَّم $f\'$ عند $a=1$ لا عند $f(1)$.', '$f\'$ goes at $a=1$, not at $f(1)$.'),
    swap: say('$x$ eta $y$ trukatu dituzu.', 'Has cambiado $x$ por $y$.', 'بدّلت $x$ و$y$.', 'You swapped $x$ and $y$.'),
    half: say('$y^2$ gaiaren koefizientea ere deribatuan dago.', 'El coeficiente de $y^2$ también va en la derivada.', 'معامل $y^2$ يدخل أيضًا في المشتقة.', 'The coefficient of $y^2$ goes into the derivative too.'),
    exterior: say('Ukitze-puntua ez da $P$: $(c,c^2)$ da.', 'El punto de tangencia no es $P$: es $(c,c^2)$.', 'نقطة التماس ليست $P$: إنها $(c,c^2)$.', 'The point of tangency is not $P$: it is $(c,c^2)$.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
