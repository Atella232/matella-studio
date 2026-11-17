import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { same as sameText, say } from '../text.ts'

/* ==========================================================================
   Funtzioen lasterketa (1.º Sociales · exponenciales y logaritmos): five
   circuits, one per stage — transformations (where x goes with f(x + c),
   the p of (x − m)² + p, the y of k·f(x)), composition and inverse
   (f ∘ g of two lines, f⁻¹ of a line, a discount then VAT), exponentials
   (k·aᵗ, the factor of a percentage, a from two data), logarithms (logₐ of
   a power, aᵗ = c, the smallest integer of a log domain) and models
   (2ⁿ doublings, what is left after half-lives, the start of a logistic).
   The wrong options are the typical mistakes. Every question carries
   `meta`, the numbers the tests check it against.
   ========================================================================== */

export const SOC_EXP_RACE_CIRCUITS = 5

export type SocExpRaceError =
    | 'direction'
    | 'square'
    | 'outside'
    | 'order'
    | 'reciprocal'
    | 'percent'
    | 'power-order'
    | 'root'
    | 'log-divide'
    | 'domain'
    | 'linear'
    | 'calculation'

export type SocExpRaceQuestion = RaceQuestion<SocExpRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => sameText(`$${latex}$`)
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const dec = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')

interface Candidate {
    value: FractionValue
    error: SocExpRaceError
}
const exact = (value: number): FractionValue => fraction(Math.round(value * 1000), 1000)
const whole = (value: number, error: SocExpRaceError): Candidate => ({ value: exact(value), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: exact(item), error: 'calculation' as const }))

function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<SocExpRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SocExpRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SocExpRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): SocExpRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/* ---------- Circuit 0: transformations ---------- */

function shiftQuestion(random: Random): SocExpRaceQuestion | null {
    const p = randomInt(random, -4, 5)
    const q = randomInt(random, -4, 5)
    const c = pick(random, [-5, -4, -3, -2, 2, 3, 4, 5])
    const answer = fraction(p - c)
    const choices = options(random, answer, [whole(p + c, 'direction'), whole(p, 'calculation'), whole(q, 'calculation')])
    return choices && build(0, 'shift', say(`$f$ funtzioa $(${p},${q})$ puntutik pasatzen da. Zein abzisa du $y=f(x${signed(c)})$ funtzioaren puntu baliokideak?`, `$f$ pasa por $(${p},${q})$. ¿Qué abscisa tiene el punto correspondiente de $y=f(x${signed(c)})$?`, `تمر $f$ بالنقطة $(${p},${q})$. ما فاصلة النقطة المقابلة على $y=f(x${signed(c)})$؟`, `$f$ passes through $(${p},${q})$. What is the x-coordinate of the matching point of $y=f(x${signed(c)})$?`), choices, answer, same(`x${signed(c)}=${p}\\ \\to\\ x=${p - c}`), { p, q, c })
}

function squareQuestion(random: Random): SocExpRaceQuestion | null {
    const m = pick(random, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
    const c = randomInt(random, -6, 12)
    const answer = fraction(c - m * m)
    const choices = options(random, answer, [whole(c, 'square'), whole(c + m * m, 'square'), whole(m, 'calculation')])
    const b = -2 * m
    return choices && build(0, 'square', say(`$x^2${signed(b)}x${c === 0 ? '' : signed(c)}=(x${signed(-m)})^2+p$ bada, zenbat da $p$?`, `Si $x^2${signed(b)}x${c === 0 ? '' : signed(c)}=(x${signed(-m)})^2+p$, ¿cuánto vale $p$?`, `إذا كان $x^2${signed(b)}x${c === 0 ? '' : signed(c)}=(x${signed(-m)})^2+p$ فكم تساوي $p$؟`, `If $x^2${signed(b)}x${c === 0 ? '' : signed(c)}=(x${signed(-m)})^2+p$, what is $p$?`), choices, answer, same(`(x${signed(-m)})^2=x^2${signed(b)}x+${m * m}\\ \\to\\ p=${c - m * m}`), { m, c })
}

function outsideQuestion(random: Random): SocExpRaceQuestion | null {
    const p = randomInt(random, -4, 5)
    const q = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const k = pick(random, [-3, -2, 2, 3])
    const answer = fraction(k * q)
    const choices = options(random, answer, [whole(q + k, 'outside'), whole(q, 'calculation'), whole(-k * q, 'calculation')])
    return choices && build(0, 'outside', say(`$f$ funtzioa $(${p},${q})$ puntutik pasatzen da. Zein ordenatu du $y=${k}f(x)$ funtzioaren puntu baliokideak?`, `$f$ pasa por $(${p},${q})$. ¿Qué ordenada tiene el punto correspondiente de $y=${k}f(x)$?`, `تمر $f$ بالنقطة $(${p},${q})$. ما ترتيب النقطة المقابلة على $y=${k}f(x)$؟`, `$f$ passes through $(${p},${q})$. What is the y-coordinate of the matching point of $y=${k}f(x)$?`), choices, answer, same(`${k}\\cdot ${q < 0 ? `(${q})` : q}=${k * q}`), { p, q, k })
}

/* ---------- Circuit 1: composition and inverse ---------- */

function composeQuestion(random: Random): SocExpRaceQuestion | null {
    const a = randomInt(random, 2, 4)
    const b = randomInt(random, 1, 6)
    const c = randomInt(random, 1, 6)
    const r = randomInt(random, 1, 4)
    // f(x) = a·x, g(x) = x + c
    const answer = fraction(a * (r + c))
    const choices = options(random, answer, [whole(a * r + c, 'order'), whole(a + r + c, 'calculation'), whole(a * r * c, 'calculation')])
    return choices && build(1, 'compose', say(`$f(x)=${a}x$ eta $g(x)=x+${c}$ badira, zenbat da $(f\\circ g)(${r})$?`, `Si $f(x)=${a}x$ y $g(x)=x+${c}$, ¿cuánto vale $(f\\circ g)(${r})$?`, `إذا كانت $f(x)=${a}x$ و$g(x)=x+${c}$ فكم تساوي $(f\\circ g)(${r})$؟`, `If $f(x)=${a}x$ and $g(x)=x+${c}$, what is $(f\\circ g)(${r})$?`), choices, answer, same(`g(${r})=${r + c}\\qquad f(${r + c})=${a * (r + c)}`), { a, b, c, r })
}

function inverseQuestion(random: Random): SocExpRaceQuestion | null {
    const a = randomInt(random, 2, 5)
    const b = randomInt(random, -6, 6)
    const x = randomInt(random, -3, 5)
    const v = a * x + b
    const answer = fraction(x)
    const choices = options(random, answer, [whole(a * v + b, 'reciprocal'), { value: fraction(1, a * v + b === 0 ? 1 : a * v + b), error: 'reciprocal' }, whole(v - b, 'calculation')])
    return choices && build(1, 'inverse', say(`$f(x)=${a}x${b === 0 ? '' : signed(b)}$ bada, zenbat da $f^{-1}(${v})$?`, `Si $f(x)=${a}x${b === 0 ? '' : signed(b)}$, ¿cuánto vale $f^{-1}(${v})$?`, `إذا كانت $f(x)=${a}x${b === 0 ? '' : signed(b)}$ فكم تساوي $f^{-1}(${v})$؟`, `If $f(x)=${a}x${b === 0 ? '' : signed(b)}$, what is $f^{-1}(${v})$?`), choices, answer, same(`${a}x${b === 0 ? '' : signed(b)}=${v}\\ \\to\\ x=${x}`), { a, b, v })
}

function priceQuestion(random: Random): SocExpRaceQuestion | null {
    const price = 100 * randomInt(random, 1, 6)
    const off = pick(random, [10, 20, 50])
    // Discount first (g), then VAT (f): f(g(x)) = 1,21(x − off)
    const answer = exact(1.21 * (price - off))
    const choices = options(random, answer, [whole(1.21 * price - off, 'order'), whole(price - off, 'calculation'), whole(1.21 * price, 'calculation')])
    return choices && build(1, 'price', say(`$g(x)=x-${off}$ deskontua eta $f(x)=1{,}21x$ BEZa dira. Zenbat da $(f\\circ g)(${price})$?`, `$g(x)=x-${off}$ es un descuento y $f(x)=1{,}21x$, el IVA. ¿Cuánto vale $(f\\circ g)(${price})$?`, `$g(x)=x-${off}$ خصم و$f(x)=1{,}21x$ الضريبة. كم تساوي $(f\\circ g)(${price})$؟`, `$g(x)=x-${off}$ is a discount and $f(x)=1{,}21x$ the VAT. What is $(f\\circ g)(${price})$?`), choices, answer, same(`1{,}21\\cdot ${price - off}=${dec(1.21 * (price - off))}`), { price, off })
}

/* ---------- Circuit 2: exponential functions ---------- */

function powerQuestion(random: Random): SocExpRaceQuestion | null {
    const k = randomInt(random, 2, 5)
    const a = pick(random, [2, 3])
    const t = randomInt(random, 2, 4)
    const answer = fraction(k * a ** t)
    const choices = options(random, answer, [whole((k * a) ** t, 'power-order'), whole(k * a * t, 'calculation'), whole(k + a ** t, 'calculation')])
    return choices && build(2, 'power', say(`Zenbat da $${k}\\cdot ${a}^{${t}}$?`, `¿Cuánto vale $${k}\\cdot ${a}^{${t}}$?`, `كم تساوي $${k}\\cdot ${a}^{${t}}$؟`, `What is $${k}\\cdot ${a}^{${t}}$?`), choices, answer, same(`${a}^{${t}}=${a ** t}\\qquad ${k}\\cdot ${a ** t}=${k * a ** t}`), { k, a, t })
}

function percentQuestion(random: Random): SocExpRaceQuestion | null {
    const r = pick(random, [3, 5, 8, 10, 12, 15, 20, 25])
    const down = random() < 0.5
    const answer = exact(down ? 1 - r / 100 : 1 + r / 100)
    const choices = options(random, answer, [whole(r / 100, 'percent'), whole(down ? 1 + r / 100 : 1 - r / 100, 'percent'), whole(r, 'percent')])
    const verb = down ? say('jaisten', 'baja', 'تنقص', 'falls') : say('igotzen', 'sube', 'تزيد', 'rises')
    return choices && build(2, 'percent', say(`Kopuru bat % ${r} ${verb.eu} da urtero. Zein zenbakiz biderkatzen da?`, `Una cantidad ${verb.es} un ${r} % al año. ¿Por qué número se multiplica?`, `كمية ${verb.ar} ${r} % سنويًّا. في أي عدد تُضرب؟`, `An amount ${verb.en} ${r} % a year. What number is it multiplied by?`), choices, answer, same(`1${down ? '-' : '+'}${dec(r / 100)}=${dec(down ? 1 - r / 100 : 1 + r / 100)}`), { r, down: down ? 1 : 0 })
}

function twoPointsQuestion(random: Random): SocExpRaceQuestion | null {
    const k = randomInt(random, 2, 6)
    const a = randomInt(random, 2, 5)
    const y = k * a * a
    const answer = fraction(a)
    const choices = options(random, answer, [whole(a * a, 'root'), whole(y / k / 2, 'root'), whole(y - k, 'calculation')])
    return choices && build(2, 'two-points', say(`$y=k\\cdot a^x$ funtzioa $(0,${k})$ eta $(2,${y})$ puntuetatik pasatzen da. Zenbat da $a$?`, `La función $y=k\\cdot a^x$ pasa por $(0,${k})$ y $(2,${y})$. ¿Cuánto vale $a$?`, `تمر $y=k\\cdot a^x$ بـ $(0,${k})$ و$(2,${y})$. كم تساوي $a$؟`, `The function $y=k\\cdot a^x$ passes through $(0,${k})$ and $(2,${y})$. What is $a$?`), choices, answer, same(`a^2=\\frac{${y}}{${k}}=${a * a}\\ \\to\\ a=${a}`), { k, a, y })
}

/* ---------- Circuit 3: logarithms ---------- */

function logQuestion(random: Random): SocExpRaceQuestion | null {
    const a = pick(random, [2, 3, 5, 10])
    const e = randomInt(random, -2, a === 2 ? 6 : 3)
    if (e === 0) return null
    const argument = e > 0 ? String(a ** e) : `\\frac{1}{${a ** -e}}`
    const answer = fraction(e)
    const choices = options(random, answer, [whole(-e, 'calculation'), whole(e > 0 ? a ** e / a : a, 'log-divide'), whole(e + 1, 'calculation')])
    const name = a === 10 ? '\\log' : `\\log_{${a}}`
    return choices && build(3, 'log', say(`Zenbat da $${name} ${argument}$?`, `¿Cuánto vale $${name} ${argument}$?`, `كم تساوي $${name} ${argument}$؟`, `What is $${name} ${argument}$?`), choices, answer, same(`${a}^{${e}}=${argument}`), { a, e })
}

function equationQuestion(random: Random): SocExpRaceQuestion | null {
    const a = pick(random, [2, 3, 4, 5])
    const t = randomInt(random, 2, a === 2 ? 6 : 4)
    const k = pick(random, [1, 2, 3])
    const c = k * a ** t
    const answer = fraction(t)
    const choices = options(random, answer, [{ value: fraction(c, a), error: 'log-divide' }, whole(t + 1, 'calculation'), whole(a ** t, 'calculation')])
    const left = k === 1 ? `${a}^t` : `${k}\\cdot ${a}^t`
    return choices && build(3, 'equation', say(`Ebatzi $${left}=${c}$.`, `Resuelve $${left}=${c}$.`, `حُلّ $${left}=${c}$.`, `Solve $${left}=${c}$.`), choices, answer, same(`${a}^t=${a ** t}=${a}^{${t}}\\ \\to\\ t=${t}`), { a, t, k })
}

function domainQuestion(random: Random): SocExpRaceQuestion | null {
    const a = randomInt(random, -8, 8)
    if (a === 0) return null
    const answer = fraction(-a + 1)
    const choices = options(random, answer, [whole(a + 1, 'domain'), whole(-a, 'domain'), whole(a, 'domain')])
    return choices && build(3, 'domain', say(`Zein da $y=\\log(x${signed(a)})$ funtzioaren izate-eremuko zenbaki oso txikiena?`, `¿Cuál es el menor entero del dominio de $y=\\log(x${signed(a)})$?`, `ما أصغر عدد صحيح في مجال $y=\\log(x${signed(a)})$؟`, `What is the smallest integer in the domain of $y=\\log(x${signed(a)})$?`), choices, answer, same(`x${signed(a)}>0\\ \\to\\ x>${-a}`), { a })
}

/* ---------- Circuit 4: models ---------- */

function doublingQuestion(random: Random): SocExpRaceQuestion | null {
    const T = randomInt(random, 2, 12)
    const n = randomInt(random, 2, 5)
    const answer = fraction(2 ** n)
    const choices = options(random, answer, [whole(2 * n, 'linear'), whole(n, 'calculation'), whole(2 ** (n + 1), 'calculation')])
    return choices && build(4, 'doubling', say(`Kopuru bat ${T} urtean behin bikoizten da. Zenbat aldiz handiagoa da ${n * T} urteren buruan?`, `Una cantidad se duplica cada ${T} años. ¿Por cuánto queda multiplicada a los ${n * T} años?`, `تتضاعف كمية كل ${T} سنوات. في كم تُضرب بعد ${n * T} سنة؟`, `An amount doubles every ${T} years. What is it multiplied by after ${n * T} years?`), choices, answer, same(`\\frac{${n * T}}{${T}}=${n}\\qquad 2^{${n}}=${2 ** n}`), { T, n })
}

function halfLifeQuestion(random: Random): SocExpRaceQuestion | null {
    const n = randomInt(random, 1, 4)
    const left = randomInt(random, 5, 50)
    const start = left * 2 ** n
    const T = randomInt(random, 2, 10)
    const answer = fraction(left)
    const choices = options(random, answer, [whole(start / (2 * n), 'linear'), whole(start - n * left, 'calculation'), whole(left * 2, 'calculation')])
    return choices && build(4, 'half-life', say(`${start} g substantzia dago, eta haren erdibizitza ${T} urte da. Zenbat gramo geratzen dira ${n * T} urteren buruan?`, `Hay ${start} g de una sustancia con semivida de ${T} años. ¿Cuántos gramos quedan a los ${n * T} años?`, `يوجد ${start} غ من مادة عمر نصفها ${T} سنوات. كم غرامًا يبقى بعد ${n * T} سنة؟`, `There are ${start} g of a substance with a half-life of ${T} years. How many grams are left after ${n * T} years?`), choices, answer, same(`${start}\\cdot\\left(\\frac{1}{2}\\right)^{${n}}=${left}`), { start, n, T })
}

function logisticQuestion(random: Random): SocExpRaceQuestion | null {
    const b = pick(random, [1, 3, 4, 9, 19, 24, 49])
    const start = randomInt(random, 2, 20)
    const M = start * (1 + b)
    const answer = fraction(start)
    const choices = options(random, answer, [whole(M, 'calculation'), whole(M / b, 'calculation'), whole(M / 2, 'calculation')])
    return choices && build(4, 'logistic', say(`$f(x)=\\frac{${M}}{1+${b}\\cdot 2^{-x}}$ bada, zenbat da $f(0)$?`, `Si $f(x)=\\frac{${M}}{1+${b}\\cdot 2^{-x}}$, ¿cuánto vale $f(0)$?`, `إذا كانت $f(x)=\\frac{${M}}{1+${b}\\cdot 2^{-x}}$ فكم تساوي $f(0)$؟`, `If $f(x)=\\frac{${M}}{1+${b}\\cdot 2^{-x}}$, what is $f(0)$?`), choices, answer, same(`\\frac{${M}}{1+${b}}=${start}`), { M, b })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => SocExpRaceQuestion | null>> = [
    [shiftQuestion, squareQuestion, outsideQuestion],
    [composeQuestion, inverseQuestion, priceQuestion],
    [powerQuestion, percentQuestion, twoPointsQuestion],
    [logQuestion, equationQuestion, domainQuestion],
    [doublingQuestion, halfLifeQuestion, logisticQuestion]
]

export function generateSocExpRaceQuestion(random: Random, circuit: number, tier: Tier): SocExpRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSocExpPitAnswer(question: RaceQuestion<SocExpRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function socExpParTime(circuit: number): number {
    return parTimeFor([13, 13, 12, 12, 13][circuit] ?? 13)
}

export const socExpRaceErrorTips: Record<SocExpRaceError, LocalizedText> = {
    direction: say('f(x + c) ezkerrera doa: x + c = p, beraz x = p − c.', 'f(x + c) va a la izquierda: x + c = p, así que x = p − c.', 'f(x + c) تذهب إلى اليسار: x + c = p إذن x = p − c.', 'f(x + c) goes left: x + c = p, so x = p − c.'),
    square: say('(x − m)² garatzean m² ateratzen da: kendu egin behar da.', 'Al desarrollar (x − m)² sale m²: hay que restarlo.', 'نشر (x − m)² يعطي m²: يجب طرحه.', 'Expanding (x − m)² gives m²: it must be taken away.'),
    outside: say('k·f(x): y biderkatzen da, ez batu.', 'k·f(x): la y se multiplica, no se suma.', 'k·f(x): تُضرب y ولا تُجمع.', 'k·f(x): y is multiplied, not added.'),
    order: say('f ∘ g: lehenik g, gero f.', 'f ∘ g: primero g y después f.', 'f ∘ g: أولًا g ثم f.', 'f ∘ g: g first, then f.'),
    reciprocal: say('f⁻¹ desegin egiten du: ebatzi f(x) = v.', 'f⁻¹ deshace: resuelve f(x) = v.', 'f⁻¹ تلغي: حُلّ f(x) = v.', 'f⁻¹ undoes: solve f(x) = v.'),
    percent: say('% r igo: 1 + r; % r jaitsi: 1 − r.', 'Subir un r %: 1 + r; bajar un r %: 1 − r.', 'الزيادة r %: 1 + r؛ والنقص r %: 1 − r.', 'Rising r %: 1 + r; falling r %: 1 − r.'),
    'power-order': say('Lehenik berretura, gero biderketa.', 'Primero la potencia y después el producto.', 'أولًا القوة ثم الضرب.', 'The power first, then the product.'),
    root: say('Bi urratsetan a² da: atera erroa.', 'En dos pasos es a²: saca la raíz.', 'في خطوتين هي a²: خذ الجذر.', 'Over two steps it is a²: take the root.'),
    'log-divide': say('Logaritmoa berretzailea da, ez zatidura.', 'El logaritmo es el exponente, no un cociente.', 'اللوغاريتم هو الأس لا خارج قسمة.', 'The logarithm is the exponent, not a quotient.'),
    domain: say('x + a > 0 bada, x > −a.', 'Si x + a > 0, x > −a.', 'إذا x + a > 0 فإن x > −a.', 'If x + a > 0, x > −a.'),
    linear: say('Bikoizketak biderkatu egiten dira: 2ⁿ.', 'Las duplicaciones se multiplican: 2ⁿ.', 'المضاعفات تُضرب: 2ⁿ.', 'Doublings multiply: 2ⁿ.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
