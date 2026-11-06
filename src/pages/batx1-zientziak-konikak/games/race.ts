import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { ELLIPSE_TRIPLES, ellipseLatex, HYPERBOLA_TRIPLES, hyperbolaLatex, overOf, polynomial, squareOf } from './conicLatex.ts'

/* ==========================================================================
   Konika lasterketa (Batxilergoa 1 · Zientziak): five circuits, one per
   stage — loci (the distance from a point to a line, the C of a parallel
   at a given distance, the point of the X axis equidistant from two
   points), the circle (the radius and a coordinate of the centre of a
   general equation, the k of a tangent line), the ellipse (c, the
   eccentricity, a focus of a shifted ellipse), the hyperbola (c, the
   slope of the asymptotes, the eccentricity) and the parabola (the
   focus, the directrix, the distance from a point to the focus). The
   wrong options are the typical mistakes. Every question carries `meta`,
   the numbers the tests check it against.
   ========================================================================== */

export const BACH_CONICS_RACE_CIRCUITS = 5

export type BachConicsRaceError =
    | 'no-root'
    | 'coefficient-sum'
    | 'forgot-c'
    | 'no-norm'
    | 'other-side'
    | 'midpoint'
    | 'sign'
    | 'not-halved'
    | 'square'
    | 'diameter'
    | 'not-half'
    | 'vertex'
    | 'minor'
    | 'inverted'
    | 'wrong-ratio'
    | 'not-moved'
    | 'other-focus'
    | 'sum'
    | 'squares'
    | 'slope'
    | 'two-p'
    | 'forgot-p'
    | 'calculation'

export type BachConicsRaceQuestion = RaceQuestion<BachConicsRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value))
const pair = ([x, y]: [number, number]) => `(${x},${y})`
const nonZero = (random: Random, limit: number) => pick(random, Array.from({ length: 2 * limit }, (_, index) => (index < limit ? index - limit : index - limit + 1)))

interface Candidate {
    value: FractionValue
    error: BachConicsRaceError
}
const ratio = (p: number, q: number, error: BachConicsRaceError): Candidate => ({ value: fraction(p, q), error })
const whole = (value: number, error: BachConicsRaceError): Candidate => ratio(value, 1, error)
const nearby = (value: FractionValue): Candidate[] => [1, -1, 2, -2].map((step) => ({ value: fraction(value.numerator + step * value.denominator, value.denominator), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachConicsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachConicsRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right)]) {
        if (wrong.length === 3) break
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachConicsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachConicsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const NORMALS: Array<[number, number, number]> = [[3, 4, 5], [4, 3, 5], [3, -4, 5], [4, -3, 5], [6, 8, 10], [5, 12, 13], [12, 5, 13]]

/* ---------- 1. Loci ---------- */

/** d(P, r) = |Ax₀ + By₀ + C| / √(A² + B²); the mistakes are dividing by A² + B² or by A + B, and forgetting C */
function pointLineQuestion(random: Random): BachConicsRaceQuestion | null {
    const [A, B, length] = pick(random, NORMALS)
    const p: [number, number] = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
    const d = randomInt(random, 1, 5)
    const C = pick(random, [1, -1]) * d * length - (A * p[0] + B * p[1])
    if (Math.abs(C) > 40 || C === 0 || A + B === 0) return null
    const answer = fraction(d)
    const choices = options(random, answer, [ratio(d, length, 'no-root'), ratio(d * length, A + B, 'coefficient-sum'), ratio(Math.abs(A * p[0] + B * p[1]), length, 'forgot-c')])
    const lineLatex = `${polynomial([[A, 'x'], [B, 'y'], [C, '']])}=0`
    const prompt = say(`$P${pair(p)}$ puntutik $${lineLatex}$ zuzenerako distantzia.`, `Distancia de $P${pair(p)}$ a la recta $${lineLatex}$.`, `المسافة من $P${pair(p)}$ إلى المستقيم $${lineLatex}$.`, `Distance from $P${pair(p)}$ to the line $${lineLatex}$.`)
    return choices && build(0, 'point-line', prompt, choices, answer, same(`\\frac{|${A * p[0] + B * p[1] + C}|}{${length}}=${d}`), { A, B, C, x: p[0], y: p[1], d })
}

/** The lines at distance d from Ax + By + C₀ = 0 are Ax + By + C₀ ± d·√(A² + B²) = 0; the greater C */
function parallelQuestion(random: Random): BachConicsRaceQuestion | null {
    const [A, B, length] = pick(random, NORMALS)
    const c0 = randomInt(random, -9, 9)
    const d = randomInt(random, 1, 4)
    const value = c0 + d * length
    const answer = fraction(value)
    const choices = options(random, answer, [whole(c0 + d, 'no-norm'), whole(c0 - d * length, 'other-side'), whole(d * length, 'forgot-c')])
    const lineLatex = `${polynomial([[A, 'x'], [B, 'y'], [c0, '']])}=0`
    const prompt = say(`$${lineLatex}$ zuzenetik $${d}$ distantziara dauden puntuek $${polynomial([[A, 'x'], [B, 'y']])}+C=0$ motako bi zuzen osatzen dituzte. Zein da $C$ handiena?`, `Los puntos a distancia $${d}$ de $${lineLatex}$ forman dos rectas $${polynomial([[A, 'x'], [B, 'y']])}+C=0$. ¿Cuál es el $C$ mayor?`, `النقاط التي تبعد $${d}$ عن $${lineLatex}$ تكوّن مستقيمين $${polynomial([[A, 'x'], [B, 'y']])}+C=0$. ما أكبر $C$؟`, `The points at distance $${d}$ from $${lineLatex}$ form two lines $${polynomial([[A, 'x'], [B, 'y']])}+C=0$. What is the greater $C$?`)
    return choices && build(0, 'parallel', prompt, choices, answer, same(`C=${c0}+${d}\\cdot ${length}=${value}`), { A, B, c0, d })
}

/** The point (x, 0) at the same distance from A and B: x = (|B|² − |A|²) / (2(b₁ − a₁)) */
function equidistantQuestion(random: Random): BachConicsRaceQuestion | null {
    const a: [number, number] = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
    const b: [number, number] = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
    if (a[0] === b[0]) return null
    const top = b[0] ** 2 + b[1] ** 2 - a[0] ** 2 - a[1] ** 2
    const bottom = 2 * (b[0] - a[0])
    const answer = fraction(top, bottom)
    if (answer.denominator > 2 || Math.abs(top / bottom) > 12 || a[1] === b[1]) return null
    const choices = options(random, answer, [ratio(a[0] + b[0], 2, 'midpoint'), ratio(-top, bottom, 'sign'), ratio(top, bottom / 2, 'not-halved')])
    const prompt = say(`$X$ ardatzeko puntu bat $A${pair(a)}$ eta $B${pair(b)}$ puntuetatik distantzia berera dago. Zein da haren abzisa?`, `Un punto del eje $X$ está a la misma distancia de $A${pair(a)}$ y de $B${pair(b)}$. ¿Cuál es su abscisa?`, `نقطة على المحور $X$ تبعد المسافة نفسها عن $A${pair(a)}$ و$B${pair(b)}$. ما إحداثيها السيني؟`, `A point of the $X$ axis is the same distance from $A${pair(a)}$ and from $B${pair(b)}$. What is its $x$-coordinate?`)
    return choices && build(0, 'equidistant', prompt, choices, answer, same(`x=\\frac{${top}}{${bottom}}`), { a1: a[0], a2: a[1], b1: b[0], b2: b[1] })
}

/* ---------- 2. The circle ---------- */

const generalCircle = (h: number, k: number, r: number) => `${polynomial([[1, 'x^2'], [1, 'y^2'], [-2 * h, 'x'], [-2 * k, 'y'], [h * h + k * k - r * r, '']])}=0`

/** The radius of x² + y² + Dx + Ey + F = 0; the mistakes are r², the diameter and a slip */
function radiusQuestion(random: Random): BachConicsRaceQuestion | null {
    const h = randomInt(random, -5, 5)
    const k = randomInt(random, -5, 5)
    const r = randomInt(random, 2, 7)
    if (h === 0 && k === 0) return null
    const answer = fraction(r)
    const choices = options(random, answer, [whole(r * r, 'square'), whole(2 * r, 'diameter')])
    const equation = generalCircle(h, k, r)
    const prompt = say(`$${equation}$ zirkunferentziaren erradioa.`, `El radio de la circunferencia $${equation}$.`, `نصف قطر الدائرة $${equation}$.`, `The radius of the circle $${equation}$.`)
    return choices && build(1, 'radius', prompt, choices, answer, same(`${squareOf('x', h)}+${squareOf('y', k)}=${r * r}`), { h, k, r })
}

/** A coordinate of the centre: −D/2; the mistakes are D/2 and D */
function centreQuestion(random: Random): BachConicsRaceQuestion | null {
    const h = nonZero(random, 6)
    const k = nonZero(random, 6)
    const r = randomInt(random, 1, 6)
    const index = pick(random, [0, 1])
    const value = index === 0 ? h : k
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'sign'), whole(-2 * value, 'not-half'), whole(2 * value, 'calculation')])
    const equation = generalCircle(h, k, r)
    const which = index === 0 ? say('lehen', 'primera', 'الأول', 'first') : say('bigarren', 'segunda', 'الثاني', 'second')
    const prompt = say(`$${equation}$ zirkunferentziaren zentroaren ${which.eu} koordenatua.`, `La ${which.es} coordenada del centro de $${equation}$.`, `الإحداثي ${which.ar} لمركز $${equation}$.`, `The ${which.en} coordinate of the centre of $${equation}$.`)
    return choices && build(1, 'centre', prompt, choices, answer, same(`-\\frac{${-2 * value}}{2}=${value}`), { h, k, r, index })
}

/** k > 0 with Ax + By + k = 0 tangent to x² + y² = r²: k = r·√(A² + B²) */
function tangentQuestion(random: Random): BachConicsRaceQuestion | null {
    const [A, B, length] = pick(random, NORMALS.filter(([a, b]) => a > 0 && b > 0))
    const r = randomInt(random, 1, 5)
    const answer = fraction(r * length)
    const choices = options(random, answer, [whole(r, 'no-norm'), whole(r * r * length, 'square'), whole(r * (A + B), 'coefficient-sum')])
    const lineLatex = `${polynomial([[A, 'x'], [B, 'y']])}+k=0`
    const prompt = say(`$k>0$ izanik, $${lineLatex}$ zuzena $x^2+y^2=${r * r}$ zirkunferentziaren ukitzailea da. Aurkitu $k$.`, `Con $k>0$, la recta $${lineLatex}$ es tangente a $x^2+y^2=${r * r}$. Halla $k$.`, `مع $k>0$ المستقيم $${lineLatex}$ مماس للدائرة $x^2+y^2=${r * r}$. أوجد $k$.`, `With $k>0$, the line $${lineLatex}$ is tangent to $x^2+y^2=${r * r}$. Find $k$.`)
    return choices && build(1, 'tangent', prompt, choices, answer, same(`\\frac{k}{${length}}=${r}\\ \\to\\ k=${r * length}`), { A, B, r })
}

/* ---------- 3. The ellipse ---------- */

/** c from a and b; the mistakes are a, b and a − b */
function ellipseCQuestion(random: Random): BachConicsRaceQuestion | null {
    const [a, b, c] = pick(random, ELLIPSE_TRIPLES)
    const vertical = pick(random, [false, true])
    const answer = fraction(c)
    const choices = options(random, answer, [whole(a, 'vertex'), whole(b, 'minor'), whole(a - b, 'calculation')])
    const equation = ellipseLatex(a, b, vertical)
    const prompt = say(`$${equation}$ elipsean, zenbat da $c$?`, `En la elipse $${equation}$, ¿cuánto vale $c$?`, `في القطع الناقص $${equation}$ كم قيمة $c$؟`, `In the ellipse $${equation}$, what is $c$?`)
    return choices && build(2, 'ellipse-c', prompt, choices, answer, same(`c=\\sqrt{${a * a}-${b * b}}=${c}`), { a, b, c, vertical: vertical ? 1 : 0 })
}

/** e = c / a; the mistakes are b / a, a / c and c / b */
function ellipseEQuestion(random: Random): BachConicsRaceQuestion | null {
    const [a, b, c] = pick(random, ELLIPSE_TRIPLES)
    const answer = fraction(c, a)
    const choices = options(random, answer, [ratio(b, a, 'minor'), ratio(a, c, 'inverted'), ratio(c, b, 'wrong-ratio')])
    const equation = ellipseLatex(a, b, false)
    const prompt = say(`$${equation}$ elipsearen eszentrikotasuna.`, `La excentricidad de la elipse $${equation}$.`, `الاختلاف المركزي للقطع الناقص $${equation}$.`, `The eccentricity of the ellipse $${equation}$.`)
    return choices && build(2, 'ellipse-e', prompt, choices, answer, same(`e=\\frac{${c}}{${a}}`), { a, b, c })
}

/** The right-hand focus of a shifted ellipse: h + c; the mistakes are c, h − c and c − h */
function ellipseFocusQuestion(random: Random): BachConicsRaceQuestion | null {
    const [a, b, c] = pick(random, ELLIPSE_TRIPLES.slice(0, 2))
    const h = nonZero(random, 5)
    const k = randomInt(random, -4, 4)
    const answer = fraction(h + c)
    const choices = options(random, answer, [whole(c, 'not-moved'), whole(h - c, 'other-focus'), whole(c - h, 'sign')])
    const equation = `${overOf(squareOf('x', h), a * a)}+${overOf(squareOf('y', k), b * b)}=1`
    const prompt = say(`$${equation}$ elipsearen eskuineko fokuaren lehen koordenatua.`, `La primera coordenada del foco derecho de $${equation}$.`, `الإحداثي الأول للبؤرة اليمنى لـ $${equation}$.`, `The first coordinate of the right-hand focus of $${equation}$.`)
    return choices && build(2, 'ellipse-focus', prompt, choices, answer, same(`${wrap(h)}+${c}=${h + c}`), { a, b, c, h, k })
}

/* ---------- 4. The hyperbola ---------- */

/** c from a and b: c² = a² + b²; the mistakes are a, b and a + b */
function hyperbolaCQuestion(random: Random): BachConicsRaceQuestion | null {
    const [a, b, c] = pick(random, HYPERBOLA_TRIPLES)
    const answer = fraction(c)
    const choices = options(random, answer, [whole(a, 'vertex'), whole(b, 'minor'), whole(a + b, 'sum')])
    const equation = hyperbolaLatex(a, b)
    const prompt = say(`$${equation}$ hiperbolan, zenbat da $c$?`, `En la hipérbola $${equation}$, ¿cuánto vale $c$?`, `في القطع الزائد $${equation}$ كم قيمة $c$؟`, `In the hyperbola $${equation}$, what is $c$?`)
    return choices && build(3, 'hyperbola-c', prompt, choices, answer, same(`c=\\sqrt{${a * a}+${b * b}}=${c}`), { a, b, c })
}

/** The positive slope b / a of the asymptotes; the mistakes are a / b and the squares */
function asymptoteQuestion(random: Random): BachConicsRaceQuestion | null {
    const a = randomInt(random, 2, 6)
    const b = randomInt(random, 2, 6)
    if (a === b) return null
    const answer = fraction(b, a)
    const choices = options(random, answer, [ratio(a, b, 'inverted'), ratio(b * b, a * a, 'squares'), ratio(a * a, b * b, 'squares')])
    const equation = hyperbolaLatex(a, b)
    const prompt = say(`$${equation}$ hiperbolaren asintoten malda positiboa.`, `La pendiente positiva de las asíntotas de $${equation}$.`, `الميل الموجب لمقاربي $${equation}$.`, `The positive slope of the asymptotes of $${equation}$.`)
    return choices && build(3, 'asymptote', prompt, choices, answer, same(`\\frac{b}{a}=\\frac{${b}}{${a}}`), { a, b })
}

/** e = c / a; the mistakes are a / c, b / a and c / b */
function hyperbolaEQuestion(random: Random): BachConicsRaceQuestion | null {
    const [a, b, c] = pick(random, HYPERBOLA_TRIPLES)
    const answer = fraction(c, a)
    const choices = options(random, answer, [ratio(a, c, 'inverted'), ratio(b, a, 'slope'), ratio(c, b, 'wrong-ratio')])
    const equation = hyperbolaLatex(a, b)
    const prompt = say(`$${equation}$ hiperbolaren eszentrikotasuna.`, `La excentricidad de la hipérbola $${equation}$.`, `الاختلاف المركزي للقطع الزائد $${equation}$.`, `The eccentricity of the hyperbola $${equation}$.`)
    return choices && build(3, 'hyperbola-e', prompt, choices, answer, same(`e=\\frac{${c}}{${a}}`), { a, b, c })
}

/* ---------- 5. The parabola ---------- */

const PARAMETERS = [2, 4, 6, 8, 10, 12, 16, 20]

/** The focus of y² = nx is (n/4, 0); the mistakes are n/2, n and −n/4 */
function focusQuestion(random: Random): BachConicsRaceQuestion | null {
    const n = pick(random, PARAMETERS) * pick(random, [1, -1])
    const answer = fraction(n, 4)
    const choices = options(random, answer, [ratio(n, 2, 'not-half'), whole(n, 'two-p'), ratio(-n, 4, 'sign')])
    const equation = `y^2=${n}x`
    const prompt = say(`$${equation}$ parabolaren fokuaren lehen koordenatua.`, `La primera coordenada del foco de $${equation}$.`, `الإحداثي الأول لبؤرة $${equation}$.`, `The first coordinate of the focus of $${equation}$.`)
    return choices && build(4, 'focus', prompt, choices, answer, same(`2p=${n}\\ \\to\\ \\frac{p}{2}=\\frac{${n}}{4}`), { n })
}

/** The directrix of y² = nx is x = −n/4; the mistakes are n/4, −n/2 and −n */
function directrixQuestion(random: Random): BachConicsRaceQuestion | null {
    const n = pick(random, PARAMETERS) * pick(random, [1, -1])
    const answer = fraction(-n, 4)
    const choices = options(random, answer, [ratio(n, 4, 'sign'), ratio(-n, 2, 'not-half'), whole(-n, 'two-p')])
    const equation = `y^2=${n}x`
    const prompt = say(`$${equation}$ parabolaren zuzentzailea $x=k$ da. Zenbat da $k$?`, `La directriz de $${equation}$ es $x=k$. ¿Cuánto vale $k$?`, `دليل $${equation}$ هو $x=k$. كم قيمة $k$؟`, `The directrix of $${equation}$ is $x=k$. What is $k$?`)
    return choices && build(4, 'directrix', prompt, choices, answer, same(`k=-\\frac{${n}}{4}`), { n })
}

/** The distance from a point of y² = nx to the focus is its distance to the directrix: x₀ + n/4 */
function focalQuestion(random: Random): BachConicsRaceQuestion | null {
    const n = pick(random, PARAMETERS)
    const x = randomInt(random, 1, 9)
    const answer = fraction(4 * x + n, 4)
    const choices = options(random, answer, [whole(x, 'forgot-p'), ratio(4 * x - n, 4, 'sign'), ratio(2 * x + n, 2, 'not-half')])
    const equation = `y^2=${n}x`
    const prompt = say(`$${equation}$ parabolako puntu batek $${x}$ abzisa du. Zein da haren fokurako distantzia?`, `Un punto de $${equation}$ tiene abscisa $${x}$. ¿Cuál es su distancia al foco?`, `نقطة من $${equation}$ إحداثيها السيني $${x}$. ما بعدها عن البؤرة؟`, `A point of $${equation}$ has $x$-coordinate $${x}$. What is its distance from the focus?`)
    return choices && build(4, 'focal', prompt, choices, answer, same(`${x}+\\frac{${n}}{4}`), { n, x })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BachConicsRaceQuestion | null>> = [
    [pointLineQuestion, parallelQuestion, equidistantQuestion],
    [radiusQuestion, centreQuestion, tangentQuestion],
    [ellipseCQuestion, ellipseEQuestion, ellipseFocusQuestion],
    [hyperbolaCQuestion, asymptoteQuestion, hyperbolaEQuestion],
    [focusQuestion, directrixQuestion, focalQuestion]
]

export function generateBachConicsRaceQuestion(random: Random, circuit: number, tier: Tier): BachConicsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachConicsPitAnswer(question: RaceQuestion<BachConicsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function bachConicsParTime(circuit: number): number {
    return parTimeFor([14, 13, 12, 12, 12][circuit] ?? 13)
}

export const bachConicsRaceErrorTips: Record<BachConicsRaceError, LocalizedText> = {
    'no-root': say('Zatitu √(A² + B²) zenbakiaz, ez A² + B² zenbakiaz.', 'Divide entre √(A² + B²), no entre A² + B².', 'اقسم على √(A² + B²) لا على A² + B².', 'Divide by √(A² + B²), not by A² + B².'),
    'coefficient-sum': say('Izendatzailea normalaren modulua da, ez A + B.', 'El denominador es el módulo del normal, no A + B.', 'المقام طول الناظمي لا A + B.', 'The denominator is the length of the normal, not A + B.'),
    'forgot-c': say('Ordezkatu ekuazio osoan, C barne.', 'Sustituye en toda la ecuación, con la C.', 'عوّض في المعادلة كلها ومعها C.', 'Substitute into the whole equation, C included.'),
    'no-norm': say('Distantzia bider √(A² + B²) da.', 'Es la distancia por √(A² + B²).', 'إنها المسافة في √(A² + B²).', 'It is the distance times √(A² + B²).'),
    'other-side': say('Bi zuzen daude: handiena + zeinuarekin.', 'Hay dos rectas: la mayor, con el signo +.', 'هناك مستقيمان: الأكبر بالإشارة +.', 'There are two lines: the greater one, with the + sign.'),
    midpoint: say('Hori erdiko puntua da; berdindu distantzien karratuak.', 'Eso es el punto medio; iguala los cuadrados de las distancias.', 'هذا المنتصف؛ ساوِ مربعي المسافتين.', 'That is the midpoint; equate the squared distances.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    'not-halved': say('Garatzean, x-ren koefizientea bikoitza da: zatitu bi.', 'Al desarrollar, el coeficiente de x es doble: divide entre 2.', 'عند النشر يكون معامل x مضاعفًا: اقسم على 2.', 'When you expand, the coefficient of x is doubled: divide by 2.'),
    square: say('Hori r² da: erradioa haren erroa da.', 'Eso es r²: el radio es su raíz.', 'هذا r²: ونصف القطر جذره.', 'That is r²: the radius is its root.'),
    diameter: say('Hori diametroa da: erradioa erdia da.', 'Eso es el diámetro: el radio es la mitad.', 'هذا القطر: ونصف القطر نصفه.', 'That is the diameter: the radius is half of it.'),
    'not-half': say('Zentroa: −D/2. Parabolan, fokua p/2 distantziara.', 'Centro: −D/2. En la parábola, el foco está en p/2.', 'المركز: ‏−D/2. وفي القطع المكافئ البؤرة عند p/2.', 'Centre: −D/2. In a parabola, the focus is at p/2.'),
    vertex: say('Hori erpin bat da; fokuak zentrotik c distantziara daude.', 'Eso es un vértice; los focos están a c del centro.', 'هذا رأس؛ البؤرتان على بعد c من المركز.', 'That is a vertex; the foci are c from the centre.'),
    minor: say('Hori b da, beste ardatzerdia.', 'Eso es b, el otro semieje.', 'هذا b، نصف المحور الآخر.', 'That is b, the other semi-axis.'),
    inverted: say('Zatidura alderantziz dago.', 'El cociente está al revés.', 'النسبة مقلوبة.', 'The ratio is upside down.'),
    'wrong-ratio': say('Eszentrikotasuna: e = c / a.', 'Excentricidad: e = c / a.', 'الاختلاف المركزي: e = c / a.', 'Eccentricity: e = c / a.'),
    'not-moved': say('Fokuak zentroarekin batera lekualdatzen dira.', 'Los focos se trasladan con el centro.', 'تنتقل البؤرتان مع المركز.', 'The foci move with the centre.'),
    'other-focus': say('Hori ezkerreko fokua da.', 'Ese es el foco de la izquierda.', 'هذه البؤرة اليسرى.', 'That is the left-hand focus.'),
    sum: say('Hiperbolan c² = a² + b², ez c = a + b.', 'En la hipérbola c² = a² + b², no c = a + b.', 'في القطع الزائد c² = a² + b² لا c = a + b.', 'In a hyperbola c² = a² + b², not c = a + b.'),
    squares: say('Asintotak a eta b erabiltzen ditu, ez haien karratuak.', 'Las asíntotas usan a y b, no sus cuadrados.', 'المقاربان يستعملان a وb لا مربعيهما.', 'The asymptotes use a and b, not their squares.'),
    slope: say('Hori asintoten malda da, ez eszentrikotasuna.', 'Eso es la pendiente de las asíntotas, no la excentricidad.', 'هذا ميل المقاربين لا الاختلاف المركزي.', 'That is the slope of the asymptotes, not the eccentricity.'),
    'two-p': say('Hori 2p da; fokua p/2 distantziara dago.', 'Eso es 2p; el foco está a p/2.', 'هذا 2p؛ والبؤرة على بعد p/2.', 'That is 2p; the focus is p/2 away.'),
    'forgot-p': say('Gehitu p/2: zuzentzailerako distantzia x₀ + p/2 da.', 'Suma p/2: la distancia a la directriz es x₀ + p/2.', 'أضف p/2: المسافة إلى الدليل x₀ + p/2.', 'Add p/2: the distance to the directrix is x₀ + p/2.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
