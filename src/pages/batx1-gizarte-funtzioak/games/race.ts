import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../text.ts'

/* ==========================================================================
   Funtzioen lasterketa (Batxilergoa 1 · Gizarte Zientziak): five circuits,
   one per stage — functions and domain (integers in a domain, the value a
   fraction leaves out, the top price of a demand), linear functions (a
   slope, an interpolation, where two tariffs cross), quadratic functions
   (the x of the vertex, the greatest profit, the best price), inverse
   proportion and roots (k·x = constant, an average cost, a horizontal
   asymptote) and piecewise functions (the value at a threshold, a bill in
   two stretches, |x² − ax|). The wrong options are the typical mistakes.
   Every question carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const SOC_FUNCTIONS_RACE_CIRCUITS = 5

export type SocFunctionsRaceError =
    | 'ends'
    | 'numerator'
    | 'context'
    | 'slope-flip'
    | 'extrapolate'
    | 'fixed'
    | 'vertex-sign'
    | 'x-not-value'
    | 'forgot-k'
    | 'direct'
    | 'asymptote'
    | 'piece'
    | 'all-units'
    | 'sign'
    | 'calculation'

export type SocFunctionsRaceQuestion = RaceQuestion<SocFunctionsRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const math = (latex: string) => `$${latex}$`
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const binomial = (root: number) => (root === 0 ? 'x' : `x${signed(-root)}`)
/** A decimal for LaTeX with the comma */
const dec = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
/** A decimal in words: the comma in Basque and Spanish, the point in Arabic and English */
const comma = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', ',')
const point = (value: number) => String(Math.round(value * 1000) / 1000)

interface Candidate {
    value: FractionValue
    error: SocFunctionsRaceError
}
const exact = (value: number): FractionValue => fraction(Math.round(value * 1000), 1000)
const whole = (value: number, error: SocFunctionsRaceError): Candidate => ({ value: exact(value), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: exact(item), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<SocFunctionsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SocFunctionsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SocFunctionsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): SocFunctionsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/* ---------- Circuit 0: functions and domain ---------- */

/** How many integers in the domain of √(x − a) + √(b − x): b − a + 1 */
function domainCountQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const a = randomInt(random, -4, 3)
    const b = a + randomInt(random, 2, 6)
    const answer = fraction(b - a + 1)
    const choices = options(random, answer, [whole(b - a, 'ends'), whole(b - a - 1, 'ends'), whole(a + b, 'calculation')])
    const formula = `\\sqrt{${binomial(a)}}+\\sqrt{${b}-x}`
    return choices && build(0, 'domain-count', say(`Zenbat zenbaki oso daude ${math(formula)} funtzioaren izate-eremuan?`, `¿Cuántos enteros hay en el dominio de ${math(formula)}?`, `كم عددًا صحيحًا في مجال ${math(formula)}؟`, `How many integers are there in the domain of ${math(formula)}?`), choices, answer, same(`[${a},${b}]\\ \\to\\ ${b - a + 1}`), { a, b })
}

/** (x − a)/(x − b) leaves out b, not a */
function excludedQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const a = randomInt(random, -6, 6)
    const b = randomInt(random, -6, 6)
    if (a === b || b === 0 || a === -b) return null
    const answer = fraction(b)
    const choices = options(random, answer, [whole(a, 'numerator'), whole(-b, 'sign'), whole(0, 'calculation')])
    const formula = `\\frac{${binomial(a)}}{${binomial(b)}}`
    return choices && build(0, 'excluded', say(`Zein zenbaki ez dago ${math(formula)} funtzioaren izate-eremuan?`, `¿Qué número no está en el dominio de ${math(formula)}?`, `أي عدد ليس في مجال ${math(formula)}؟`, `Which number is not in the domain of ${math(formula)}?`), choices, answer, same(`${binomial(b)}=0\\ \\to\\ x=${b}`), { a, b })
}

/** The demand q = Q − k·p only makes sense for p < Q/k */
function topPriceQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const k = randomInt(random, 2, 6)
    const top = 5 * randomInt(random, 2, 8)
    const Q = k * top
    const answer = fraction(top)
    const choices = options(random, answer, [whole(Q, 'context'), whole(Q - k, 'calculation'), whole(top / 2, 'calculation')])
    return choices && build(0, 'top-price', say(`$q=${Q}-${k}p$ unitate saltzen dira $p$ euroan. Zein da zentzua duen preziorik handiena?`, `Se venden $q=${Q}-${k}p$ unidades a $p$ euros. ¿Cuál es el mayor precio con sentido?`, `تُباع $q=${Q}-${k}p$ وحدة بسعر $p$ يورو. ما أكبر سعر له معنى؟`, `$q=${Q}-${k}p$ units sell at $p$ euros. What is the highest price that makes sense?`), choices, answer, same(`${Q}-${k}p>0\\ \\to\\ p<${top}`), { Q, k })
}

/* ---------- Circuit 1: linear functions and interpolation ---------- */

/** The slope through two points */
function slopeQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const x1 = randomInt(random, -3, 3)
    const run = randomInt(random, 1, 4)
    const m = pick(random, [-3, -2, -1, 2, 3, 4])
    const y1 = randomInt(random, -5, 5)
    const x2 = x1 + run
    const y2 = y1 + m * run
    const answer = fraction(m)
    const choices = options(random, answer, [{ value: fraction(run, m * run), error: 'slope-flip' }, whole(-m, 'sign'), whole(y2 - y1, 'calculation')])
    return choices && build(1, 'slope', say(`Zein da $(${x1},${y1})$ eta $(${x2},${y2})$ puntuetatik pasatzen den zuzenaren malda?`, `¿Cuál es la pendiente de la recta por $(${x1},${y1})$ y $(${x2},${y2})$?`, `ما ميل المستقيم المار بـ $(${x1},${y1})$ و$(${x2},${y2})$؟`, `What is the slope of the line through $(${x1},${y1})$ and $(${x2},${y2})$?`), choices, answer, same(`m=\\frac{${y2}-(${y1})}{${x2}-(${x1})}=${m}`), { x1, y1, x2, y2 })
}

/** A linear estimate between two data */
function interpolationQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const x1 = 10 * randomInt(random, 0, 3)
    const step = 10 * randomInt(random, 1, 2)
    const m = randomInt(random, 1, 5)
    const y1 = 10 * randomInt(random, 2, 9)
    const x2 = x1 + step
    const y2 = y1 + m * step
    const x = x1 + randomInt(random, 1, step - 1)
    const answer = fraction(y1 + m * (x - x1))
    const choices = options(random, answer, [whole(y1 + m * x, 'fixed'), whole(y2 + m * (x - x1), 'extrapolate'), whole((y1 + y2) / 2, 'calculation')])
    return choices && build(1, 'interpolation', say(`$x=${x1}$ denean $y=${y1}$, eta $x=${x2}$ denean $y=${y2}$. Interpolatu $y$, $x=${x}$ denean.`, `Con $x=${x1}$ es $y=${y1}$, y con $x=${x2}$, $y=${y2}$. Interpola $y$ en $x=${x}$.`, `عند $x=${x1}$ تكون $y=${y1}$، وعند $x=${x2}$ تكون $y=${y2}$. استوفِ $y$ عند $x=${x}$.`, `At $x=${x1}$, $y=${y1}$, and at $x=${x2}$, $y=${y2}$. Interpolate $y$ at $x=${x}$.`), choices, answer, same(`m=${m}\\qquad ${y1}+${m}\\cdot ${x - x1}=${y1 + m * (x - x1)}`), { x1, y1, x2, y2, x })
}

/** Two tariffs F + a·x and b·x cross at x = F/(b − a) */
function tariffQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const a = randomInt(random, 1, 4)
    const b = a + randomInt(random, 1, 4)
    const x = 10 * randomInt(random, 2, 12)
    const F = (b - a) * x / 10
    if (!Number.isInteger(F)) return null
    const answer = fraction(x)
    const choices = options(random, answer, [whole(10 * F / b, 'fixed'), whole(10 * F / (a + b), 'sign'), whole(F, 'calculation')])
    return choices && build(1, 'tariff', say(`A tarifa: $${F}+${dec(a / 10)}x$ euro. B tarifa: $${dec(b / 10)}x$ euro. Zenbat minututan kostatzen dira berdin?`, `Tarifa A: $${F}+${dec(a / 10)}x$ euros. Tarifa B: $${dec(b / 10)}x$ euros. ¿Con cuántos minutos cuestan lo mismo?`, `التعرفة A: ‏$${F}+${dec(a / 10)}x$ يورو. التعرفة B: ‏$${dec(b / 10)}x$ يورو. عند كم دقيقة تتساويان؟`, `Tariff A: $${F}+${dec(a / 10)}x$ euros. Tariff B: $${dec(b / 10)}x$ euros. For how many minutes do they cost the same?`), choices, answer, same(`${dec((b - a) / 10)}x=${F}\\ \\to\\ x=${x}`), { a, b, F })
}

/* ---------- Circuit 2: quadratic functions ---------- */

/** x of the vertex of ax² + bx + c */
function vertexQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const a = pick(random, [-3, -2, -1, 1, 2, 3])
    const h = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const b = -2 * a * h
    const c = randomInt(random, -6, 6)
    const answer = fraction(h)
    const choices = options(random, answer, [whole(-h, 'vertex-sign'), whole(b, 'calculation'), whole(a * h * h + b * h + c, 'x-not-value')])
    const formula = `y=${a === 1 ? '' : a === -1 ? '-' : a}x^2${signed(b)}x${c === 0 ? '' : signed(c)}`
    return choices && build(2, 'vertex', say(`Zein $x$ baliotan dago ${math(formula)} parabolaren erpina?`, `¿En qué $x$ está el vértice de ${math(formula)}?`, `عند أي $x$ يقع رأس ${math(formula)}؟`, `At which $x$ is the vertex of ${math(formula)}?`), choices, answer, same(`x=-\\frac{${b}}{2\\cdot ${a < 0 ? `(${a})` : a}}=${h}`), { a, b, c })
}

/** The greatest profit of −x² + bx − c: the value, not the x */
function profitQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const h = 5 * randomInt(random, 2, 8)
    const c = 50 * randomInt(random, 1, 8)
    const top = h * h - c
    if (top <= 0) return null
    const answer = fraction(top)
    const choices = options(random, answer, [whole(h, 'x-not-value'), whole(2 * h, 'vertex-sign'), whole(h * h, 'calculation')])
    return choices && build(2, 'profit', say(`Mozkina $B(x)=-x^2+${2 * h}x-${c}$ euro da. Zein da mozkinik handiena?`, `El beneficio es $B(x)=-x^2+${2 * h}x-${c}$ euros. ¿Cuál es el beneficio máximo?`, `الربح $B(x)=-x^2+${2 * h}x-${c}$ يورو. ما أكبر ربح؟`, `The profit is $B(x)=-x^2+${2 * h}x-${c}$ euros. What is the greatest profit?`), choices, answer, same(`x=${h}\\qquad -${h * h}+${2 * h * h}-${c}=${top}`), { h, c })
}

/** Revenue p(Q − kp): best price Q/(2k) */
function bestPriceQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const k = randomInt(random, 2, 6)
    const best = randomInt(random, 3, 15)
    const Q = 2 * k * best
    const answer = fraction(best)
    const choices = options(random, answer, [whole(Q / k, 'context'), whole(Q / 2, 'forgot-k'), whole(best * (Q - k * best), 'x-not-value')])
    return choices && build(2, 'best-price', say(`Diru-sarrerak $I(p)=p(${Q}-${k}p)$ dira. Zein preziok ematen ditu handienak?`, `Los ingresos son $I(p)=p(${Q}-${k}p)$. ¿Qué precio da los mayores?`, `الإيرادات $I(p)=p(${Q}-${k}p)$. أي سعر يعطي أكبرها؟`, `Revenue is $I(p)=p(${Q}-${k}p)$. Which price gives the greatest?`), choices, answer, same(`p=\\frac{${Q}}{2\\cdot ${k}}=${best}`), { Q, k })
}

/* ---------- Circuit 3: inverse proportion and roots ---------- */

/** x·y stays constant */
function inverseQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const x1 = randomInt(random, 2, 6)
    const y1 = randomInt(random, 2, 12)
    const k = x1 * y1
    const x2 = pick(random, [2, 3, 4, 5, 6, 8, 10, 12].filter((value) => value !== x1 && k % value === 0))
    if (x2 === undefined) return null
    const answer = fraction(k / x2)
    const choices = options(random, answer, [{ value: fraction(y1 * x2, x1), error: 'direct' }, whole(k, 'calculation'), whole(y1 + x1 - x2, 'calculation')])
    return choices && build(3, 'inverse', say(`${x1} langilek ${y1} egun behar dituzte lan bat egiteko. Zenbat egun beharko dituzte ${x2} langilek?`, `${x1} trabajadores tardan ${y1} días en hacer un trabajo. ¿Cuántos días tardarán ${x2} trabajadores?`, `يحتاج ${x1} عمال إلى ${y1} يومًا لإنجاز عمل. كم يومًا يحتاج ${x2} عمال؟`, `${x1} workers take ${y1} days to do a job. How many days will ${x2} workers take?`), choices, answer, same(`${x1}\\cdot ${y1}=${k}\\qquad\\frac{${k}}{${x2}}=${k / x2}`), { x1, y1, x2 })
}

/** Average cost v + F/x */
function averageQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const x = pick(random, [20, 25, 40, 50, 100, 200])
    const share = randomInt(random, 2, 12)
    const F = share * x
    const v = randomInt(random, 2, 15)
    const answer = fraction(v + share)
    const choices = options(random, answer, [whole(F + v * x, 'calculation'), whole(share, 'fixed'), whole(v, 'asymptote')])
    return choices && build(3, 'average', say(`$C(x)=${F}+${v}x$ euro kostatzen da $x$ unitate egitea. Zein da batez besteko kostua ${x} unitaterekin?`, `Hacer $x$ unidades cuesta $C(x)=${F}+${v}x$ euros. ¿Cuál es el coste medio con ${x} unidades?`, `تكلفة صنع $x$ وحدة $C(x)=${F}+${v}x$ يورو. ما التكلفة المتوسطة لـ ${x} وحدة؟`, `Making $x$ units costs $C(x)=${F}+${v}x$ euros. What is the average cost for ${x} units?`), choices, answer, same(`${v}+\\frac{${F}}{${x}}=${v}+${share}=${v + share}`), { F, v, x })
}

/** The horizontal asymptote of (ax + b)/(x − c) is y = a */
function asymptoteQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const a = pick(random, [-4, -3, -2, 2, 3, 4, 5])
    const c = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const b = randomInt(random, -6, 6)
    if (b === -a * c || Math.abs(a) === Math.abs(c)) return null
    const answer = fraction(a)
    const choices = options(random, answer, [whole(c, 'asymptote'), whole(-c, 'asymptote'), whole(b, 'calculation')])
    const formula = `y=\\frac{${a}x${b === 0 ? '' : signed(b)}}{${binomial(c)}}`
    return choices && build(3, 'asymptote', say(`${math(formula)} funtzioaren asintota horizontala $y=k$ da. Zenbat da $k$?`, `La asíntota horizontal de ${math(formula)} es $y=k$. ¿Cuánto vale $k$?`, `الخط المقارب الأفقي لـ ${math(formula)} هو $y=k$. كم تساوي $k$؟`, `The horizontal asymptote of ${math(formula)} is $y=k$. What is $k$?`), choices, answer, same(`${a}x${b === 0 ? '' : signed(b)}=${a}(${binomial(c)})${signed(b + a * c)}\\ \\to\\ y=${a}`), { a, b, c })
}

/* ---------- Circuit 4: piecewise functions ---------- */

/** f(t) at the threshold uses the piece with ≥ */
function thresholdQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const t = randomInt(random, 1, 5)
    const a = randomInt(random, 1, 6)
    const m = randomInt(random, 2, 4)
    const b = randomInt(random, 1, 9)
    const left = t + a
    const right = m * t - b
    if (left === right) return null
    const answer = fraction(right)
    const choices = options(random, answer, [whole(left, 'piece'), whole(m * t + b, 'sign'), whole(left + right, 'calculation')])
    const formula = `f(x)=\\begin{cases}x+${a} & x<${t}\\\\ ${m}x-${b} & x\\ge ${t}\\end{cases}`
    return choices && build(4, 'threshold', say(`${math(formula)} bada, zenbat da $f(${t})$?`, `Si ${math(formula)}, ¿cuánto vale $f(${t})$?`, `إذا كانت ${math(formula)} فكم تساوي $f(${t})$؟`, `If ${math(formula)}, what is $f(${t})$?`), choices, answer, same(`${t}\\ge ${t}\\ \\to\\ ${m}\\cdot ${t}-${b}=${right}`), { t, a, m, b })
}

/** A bill: the first L units at r1, the rest at r2 */
function billQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const L = 10 * randomInt(random, 2, 10)
    const r1 = randomInt(random, 2, 6)
    const r2 = r1 + randomInt(random, 1, 4)
    const x = L + 10 * randomInt(random, 1, 5)
    const cents = r1 * L + r2 * (x - L)
    const answer = exact(cents / 10)
    const choices = options(random, answer, [whole(r2 * x / 10, 'all-units'), whole(r1 * x / 10, 'piece'), whole(r2 * (x - L) / 10, 'fixed')])
    return choices && build(4, 'bill', say(`Lehen ${L} unitateak ${comma(r1 / 10)} € dira bakoitza, eta gainerakoak ${comma(r2 / 10)} €. Zenbat kostatzen dira ${x} unitate, eurotan?`, `Las ${L} primeras unidades cuestan ${comma(r1 / 10)} € cada una, y las demás, ${comma(r2 / 10)} €. ¿Cuánto cuestan ${x} unidades, en euros?`, `أول ${L} وحدة سعر الواحدة ${point(r1 / 10)} € والباقي ${point(r2 / 10)} €. كم تكلّف ${x} وحدة باليورو؟`, `The first ${L} units cost €${point(r1 / 10)} each, and the rest €${point(r2 / 10)}. How much do ${x} units cost, in euros?`), choices, answer, same(`${dec(r1 / 10)}\\cdot ${L}+${dec(r2 / 10)}\\cdot ${x - L}=${dec(cents / 10)}`), { L, r1, r2, x })
}

/** |x² − ax| at r, inside the roots: the sign changes */
function absoluteQuestion(random: Random): SocFunctionsRaceQuestion | null {
    const a = randomInt(random, 3, 9)
    const r = randomInt(random, 1, a - 1)
    const inside = r * r - a * r
    const answer = fraction(-inside)
    const choices = options(random, answer, [whole(inside, 'sign'), whole(r * r + a * r, 'sign'), whole(a - r, 'calculation')])
    return choices && build(4, 'absolute', say(`Zenbat balio du $y=|x^2-${a}x|$ funtzioak $x=${r}$ denean?`, `¿Cuánto vale $y=|x^2-${a}x|$ en $x=${r}$?`, `كم تساوي $y=|x^2-${a}x|$ عند $x=${r}$؟`, `What is $y=|x^2-${a}x|$ at $x=${r}$?`), choices, answer, same(`${r * r}-${a * r}=${inside}\\ \\to\\ |${inside}|=${-inside}`), { a, r })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => SocFunctionsRaceQuestion | null>> = [
    [domainCountQuestion, excludedQuestion, topPriceQuestion],
    [slopeQuestion, interpolationQuestion, tariffQuestion],
    [vertexQuestion, profitQuestion, bestPriceQuestion],
    [inverseQuestion, averageQuestion, asymptoteQuestion],
    [thresholdQuestion, billQuestion, absoluteQuestion]
]

export function generateSocFunctionsRaceQuestion(random: Random, circuit: number, tier: Tier): SocFunctionsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSocFunctionsPitAnswer(question: RaceQuestion<SocFunctionsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function socFunctionsParTime(circuit: number): number {
    return parTimeFor([12, 13, 13, 13, 14][circuit] ?? 13)
}

export const socFunctionsRaceErrorTips: Record<SocFunctionsRaceError, LocalizedText> = {
    ends: say('Muturrak sartzen dira: zenbatu biak.', 'Los extremos entran: cuenta los dos.', 'الطرفان يدخلان: احسبهما.', 'The ends are included: count both.'),
    numerator: say('Izendatzailearen zeroak bakarrik kentzen dira.', 'Solo se quitan los ceros del denominador.', 'لا تُحذف إلا أصفار المقام.', 'Only the zeros of the denominator are removed.'),
    context: say('Kopurua 0 baino handiagoa izan behar da: begiratu $q$, ez $Q$.', 'La cantidad tiene que ser mayor que 0: mira $q$, no $Q$.', 'يجب أن تكون الكمية أكبر من 0: انظر إلى $q$ لا $Q$.', 'The amount must be above 0: look at $q$, not $Q$.'),
    'slope-flip': say('Malda: y-ren aldaketa zati x-renarena, ez alderantziz.', 'Pendiente: lo que cambia la y entre lo que cambia la x, no al revés.', 'الميل: تغيّر y على تغيّر x، لا العكس.', 'Slope: change in y over change in x, not the other way round.'),
    extrapolate: say('Hasi lehen datutik, ez bigarrenetik.', 'Empieza en el primer dato, no en el segundo.', 'ابدأ من البيانة الأولى لا الثانية.', 'Start from the first datum, not the second.'),
    fixed: say('Ez ahaztu zati finkoa edo hasierako datua.', 'No olvides la parte fija o el dato de partida.', 'لا تنسَ الجزء الثابت أو بيانة البداية.', 'Do not forget the fixed part or the starting datum.'),
    'vertex-sign': say('Erpina $x=-\\frac{b}{2a}$: minus zeinua.', 'El vértice es $x=-\\frac{b}{2a}$: con el signo menos.', 'الرأس $x=-\\frac{b}{2a}$: مع إشارة السالب.', 'The vertex is $x=-\\frac{b}{2a}$: with the minus sign.'),
    'x-not-value': say('Hori $x$ da; galdera funtzioaren balioa da (edo alderantziz).', 'Eso es la $x$; se pregunta el valor de la función (o al revés).', 'هذه $x$؛ والسؤال عن قيمة الدالة (أو العكس).', 'That is the $x$; the question asks for the value of the function (or the other way round).'),
    'forgot-k': say('Zatitu $2k$ zenbakiaz, ez 2 zenbakiaz bakarrik.', 'Divide entre $2k$, no solo entre 2.', 'اقسم على $2k$ لا على 2 فقط.', 'Divide by $2k$, not just by 2.'),
    direct: say('Langile gehiagorekin, egun gutxiago: alderantzizko proportzionaltasuna.', 'Con más trabajadores, menos días: es proporcionalidad inversa.', 'مع عمال أكثر أيام أقل: تناسب عكسي.', 'More workers, fewer days: it is inverse proportion.'),
    asymptote: say('$y=a+\\frac{k}{x-b}$: asintota horizontala $y=a$, eta bertikala $x=b$.', '$y=a+\\frac{k}{x-b}$: asíntota horizontal $y=a$ y vertical $x=b$.', '$y=a+\\frac{k}{x-b}$: الأفقي $y=a$ والرأسي $x=b$.', '$y=a+\\frac{k}{x-b}$: horizontal asymptote $y=a$ and vertical $x=b$.'),
    piece: say('Erabili $x$ dagoen zatia: $\\ge$ daramanak muturra barne hartzen du.', 'Usa el trozo en el que está $x$: el que lleva $\\ge$ incluye el extremo.', 'استعمل الجزء الذي فيه $x$: الذي فيه $\\ge$ يشمل الطرف.', 'Use the piece that $x$ is in: the one with $\\ge$ includes the end.'),
    'all-units': say('Lehen unitateek lehen prezioa dute oraindik.', 'Las primeras unidades siguen al primer precio.', 'تبقى الوحدات الأولى بالسعر الأول.', 'The first units keep the first price.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
