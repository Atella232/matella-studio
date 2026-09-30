import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { linearLatex } from '../../dbh1-aljebra-v2/algebra.ts'

/* ==========================================================================
   Ekuazioen lasterketa (2. DBH): five circuits, one per stage. Every
   answer is the value of x (or of the unknown of a problem), so every
   question can be answered in writing at the pit stop. Wrong options come
   from typical mistakes: transposing without changing the sign, a bracket
   multiplied only on its first term, a number left without the lcm, the
   minus in front of a fraction, forgetting the square root…
   ========================================================================== */

export const EQUATIONS_RACE_CIRCUITS = 5

export type EquationsRaceError =
    | 'transpose-sign'
    | 'transpose-operation'
    | 'bracket'
    | 'not-all-terms'
    | 'minus-numerator'
    | 'wrong-equation'
    | 'no-root'
    | 'formula-sign'
    | 'calculation'

export type EquationsRaceQuestion = RaceQuestion<EquationsRaceError>

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const math = (latex: string) => `$${latex}$`
const signedRandom = (random: Random, min: number, max: number) => randomInt(random, min, max) * (random() < 0.5 ? -1 : 1)

interface Candidate {
    value: number
    error: EquationsRaceError
}

function options(random: Random, right: number, candidates: Candidate[]): RaceOption<EquationsRaceError>[] | null {
    const used = new Set([right])
    const wrong: Candidate[] = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (!Number.isInteger(candidate.value) || used.has(candidate.value)) continue
        used.add(candidate.value)
        wrong.push(candidate)
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: String(right), correct: true, error: null }, ...wrong.map((item) => ({ latex: String(item.value), correct: false, error: item.error }))])
}

const near = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value - 2, -value].map((item) => ({ value: item, error: 'calculation' }))

/** The equation and its solution: the tests check that the equation holds for it */
const worked = (equation: string, answer: number) => say(math(`${equation}\\ \\to\\ x=${answer}`), math(`${equation}\\ \\to\\ x=${answer}`), math(`${equation}\\ \\to\\ x=${answer}`))

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<EquationsRaceError>[], answer: number, equation: string): EquationsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer), answerForm: 'any', percentAnswer: false, writable: true, solution: worked(equation, answer) }
}

const solvePrompt = (equation: string) => say(`Ebatzi ${math(equation)}.`, `Resuelve ${math(equation)}.`, `حلّ ${math(equation)}.`)

/* ---------- Circuit 0: simple equations ---------- */

function simpleQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const x = tier === 0 ? randomInt(random, 1, 12) : signedRandom(random, 1, 12)
    const a = randomInt(random, 2, 9)
    const b = signedRandom(random, 1, 15)
    const c = a * x + b
    const equation = `${linearLatex({ a, b })}=${c}`
    const choices = options(random, x, [
        { value: (c + b) / a, error: 'transpose-sign' },
        { value: c - b - a, error: 'transpose-operation' },
        { value: (c - b) * a, error: 'transpose-operation' },
        ...near(x)
    ])
    return choices && question(0, 'simple', solvePrompt(equation), choices, x, equation)
}

/* ---------- Circuit 1: x on both sides and brackets ---------- */

function firstDegreeQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const x = signedRandom(random, 1, 9)
    if (tier === 0) {
        const a = randomInt(random, 3, 9)
        const c = randomInt(random, 1, a - 1)
        const b = signedRandom(random, 1, 12)
        const d = (a - c) * x + b
        const equation = `${linearLatex({ a, b })}=${linearLatex({ a: c, b: d })}`
        const choices = options(random, x, [
            { value: (d - b) / (a + c), error: 'transpose-sign' },
            { value: (d + b) / (a - c), error: 'transpose-sign' },
            ...near(x)
        ])
        return choices && question(1, 'both-sides', solvePrompt(equation), choices, x, equation)
    }
    // k(x + m) + n = c·x + d
    const k = randomInt(random, 2, 5) * (tier === 2 && random() < 0.5 ? -1 : 1)
    const m = signedRandom(random, 1, 6)
    const c = randomInt(random, 1, 4)
    if (k === c) return null
    const d = k * (x + m) - c * x
    const bracket = linearLatex({ a: 1, b: m })
    const left = k === -1 ? `-(${bracket})` : `${k}(${bracket})`
    const equation = `${left}=${linearLatex({ a: c, b: d })}`
    const choices = options(random, x, [
        { value: (d - m) / (k - c), error: 'bracket' },
        { value: (d - k * m) / (k + c), error: 'transpose-sign' },
        { value: (d + k * m) / (k - c), error: 'transpose-sign' },
        ...near(x)
    ])
    return choices && question(1, 'brackets', solvePrompt(equation), choices, x, equation)
}

/* ---------- Circuit 2: denominators ---------- */

const pairs: Array<[number, number]> = [[2, 3], [2, 4], [3, 4], [2, 5], [3, 6], [4, 6]]
const lcm = (p: number, q: number) => { let [a, b] = [p, q]; while (b) [a, b] = [b, a % b]; return (p * q) / a }

function denominatorQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    if (tier === 0) {
        // (x + k) / p = r
        const p = randomInt(random, 2, 6)
        const r = signedRandom(random, 1, 6)
        const k = signedRandom(random, 1, 9)
        const x = p * r - k
        const equation = `\\frac{${linearLatex({ a: 1, b: k })}}{${p}}=${r}`
        const choices = options(random, x, [{ value: r - k, error: 'not-all-terms' }, { value: p * r + k, error: 'transpose-sign' }, { value: p * (r - k), error: 'not-all-terms' }, ...near(x)])
        return choices && question(2, 'one', solvePrompt(equation), choices, x, equation)
    }
    const [p, q] = pick(random, pairs)
    const m = lcm(p, q)
    if (tier === 1) {
        // x/p + x/q = r, with x a multiple of the lcm
        const x = m * signedRandom(random, 1, 3)
        const r = x / p + x / q
        const equation = `\\frac{x}{${p}}+\\frac{x}{${q}}=${r}`
        const coefficient = m / p + m / q
        const choices = options(random, x, [{ value: r / coefficient, error: 'not-all-terms' }, { value: r * (p + q), error: 'calculation' }, { value: (r * m) / (p + q), error: 'calculation' }, ...near(x)])
        return choices && question(2, 'two', solvePrompt(equation), choices, x, equation)
    }
    // (x + a)/p − (x + b)/q = r
    const a = signedRandom(random, 1, 5)
    const b = signedRandom(random, 1, 5)
    const u = m / p
    const v = m / q
    if (u === v) return null
    // u(x + a) − v(x + b) = m·r → (u − v)x = m·r − u·a + v·b
    const x = signedRandom(random, 1, 9)
    const mr = (u - v) * x + u * a - v * b
    if (mr % m !== 0) return null
    const r = mr / m
    const equation = `\\frac{${linearLatex({ a: 1, b: a })}}{${p}}-\\frac{${linearLatex({ a: 1, b })}}{${q}}=${r}`
    const choices = options(random, x, [
        { value: (mr - u * a - v * b) / (u - v), error: 'minus-numerator' },
        { value: (r - u * a + v * b) / (u - v), error: 'not-all-terms' },
        ...near(x)
    ])
    return choices && question(2, 'minus', solvePrompt(equation), choices, x, equation)
}

/* ---------- Circuit 3: problems ---------- */

function problemQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const kind = pick(random, tier === 0 ? ['number', 'consecutive'] as const : ['number', 'consecutive', 'ages', 'rectangle'] as const)
    if (kind === 'number') {
        const x = randomInt(random, 2, 20)
        const k = randomInt(random, 2, 5)
        const n = randomInt(random, 1, 20)
        const result = k * x - n
        const choices = options(random, x, [{ value: (result - n) / k, error: 'transpose-sign' }, { value: result + n, error: 'wrong-equation' }, { value: (result + n) * k, error: 'transpose-operation' }, ...near(x)])
        const times = [say('bikoitzari', 'doble', 'ضعف'), say('hirukoitzari', 'triple', 'ثلاثة أضعاف'), say('laukoitzari', 'cuádruple', 'أربعة أضعاف'), say('bostekoitzari', 'quíntuple', 'خمسة أضعاف')][k - 2]
        return choices && question(3, kind, say(`Zenbaki baten ${times.eu} ${n} kenduta, ${result} lortzen da. Zein da zenbakia?`, `Si al ${times.es} de un número le restas ${n}, obtienes ${result}. ¿Qué número es?`, `إذا طرحت ${n} من ${times.ar} عدد تحصل على ${result}. ما العدد؟`), choices, x, `${k}x-${n}=${result}`)
    }
    if (kind === 'consecutive') {
        const count = tier === 0 ? 2 : 3
        const x = randomInt(random, 5, 40)
        const sum = count === 2 ? 2 * x + 1 : 3 * x + 3
        const choices = options(random, x, [{ value: Math.round(sum / count), error: 'wrong-equation' }, { value: x + 1, error: 'wrong-equation' }, { value: (sum - 1) / count, error: 'calculation' }, ...near(x)])
        const equation = count === 2 ? `x+(x+1)=${sum}` : `x+(x+1)+(x+2)=${sum}`
        return choices && question(3, kind, say(`${count} zenbaki jarraituren batura ${sum} da. Zein da txikiena?`, `La suma de ${count} números consecutivos es ${sum}. ¿Cuál es el menor?`, `مجموع ${count} أعداد متتالية ${sum}. ما أصغرها؟`), choices, x, equation)
    }
    if (kind === 'ages') {
        const x = randomInt(random, 4, 15)
        const times = randomInt(random, 2, 4)
        const years = randomInt(random, 2, 8)
        const gap = (times - 1) * (x + years)
        const equation = `x+${gap + years}=${times}(x+${years})`
        const choices = options(random, x, [{ value: gap / times, error: 'wrong-equation' }, { value: x + years, error: 'wrong-equation' }, { value: gap / (times - 1), error: 'calculation' }, ...near(x)])
        return choices && question(3, kind, say(`Aitak semeak baino ${gap} urte gehiago ditu, eta ${years} urte barru semearen adinaren ${times} halako izango du. Zenbat urte ditu semeak?`, `Un padre tiene ${gap} años más que su hijo y dentro de ${years} años tendrá ${times} veces su edad. ¿Cuántos años tiene el hijo?`, `الأب أكبر من ابنه بـ ${gap} سنة، وبعد ${years} سنوات سيكون عمره ${times} أضعاف عمر الابن. كم عمر الابن؟`), choices, x, equation)
    }
    const x = randomInt(random, 2, 15)
    const extra = randomInt(random, 1, 8)
    const perimeter = 4 * x + 2 * extra
    const choices = options(random, x, [{ value: (perimeter - extra) / 2, error: 'wrong-equation' }, { value: x + extra, error: 'wrong-equation' }, { value: (perimeter - 2 * extra) / 2, error: 'wrong-equation' }, ...near(x)])
    return choices && question(3, kind, say(`Laukizuzen bat zabalera baino ${extra} m luzeagoa da eta perimetroa ${perimeter} m da. Zenbat metro ditu zabalerak?`, `Un rectángulo es ${extra} m más largo que ancho y su perímetro mide ${perimeter} m. ¿Cuántos metros mide el ancho?`, `مستطيل طوله أكبر من عرضه بـ ${extra} م ومحيطه ${perimeter} م. كم مترًا عرضه؟`), choices, x, `2x+2(x+${extra})=${perimeter}`)
}

/* ---------- Circuit 4: second-degree equations ---------- */

function quadraticQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const kind = pick(random, tier === 0 ? ['pure', 'factor'] as const : ['pure', 'factor', 'complete'] as const)
    const larger = say('Idatzi ebazpen handiena.', 'Escribe la solución mayor.', 'اكتب الحل الأكبر.')
    const withLarger = (equation: string) => say(`Ebatzi ${math(equation)}. ${larger.eu}`, `Resuelve ${math(equation)}. ${larger.es}`, `حلّ ${math(equation)}. ${larger.ar}`)
    if (kind === 'pure') {
        const root = randomInt(random, 2, 12)
        const a = tier === 0 ? 1 : randomInt(random, 1, 3)
        const c = a * root * root
        const equation = a === 1 ? `x^{2}-${c}=0` : `${a}x^{2}-${c}=0`
        const choices = options(random, root, [{ value: root * root, error: 'no-root' }, { value: c / 2, error: 'no-root' }, { value: root + 1, error: 'calculation' }, { value: root - 1, error: 'calculation' }])
        return choices && question(4, kind, withLarger(equation), choices, root, equation)
    }
    if (kind === 'factor') {
        const root = signedRandom(random, 2, 12)
        const equation = `x^{2}${root < 0 ? '+' : '-'}${Math.abs(root)}x=0`
        const answer = Math.max(0, root)
        // Both 0 and the other root solve it: neither may appear as a wrong option
        const candidates: Candidate[] = [{ value: -root, error: 'formula-sign' }, { value: root * root, error: 'no-root' }, { value: Math.abs(root) + 1, error: 'calculation' }, { value: Math.abs(root) + 2, error: 'calculation' }]
        const choices = options(random, answer, candidates.filter((item) => item.value !== 0 && item.value !== root))
        return choices && question(4, kind, withLarger(equation), choices, answer, equation)
    }
    const r1 = signedRandom(random, 1, 8)
    const r2 = signedRandom(random, 1, 8)
    if (r1 === r2) return null
    const b = -(r1 + r2)
    const c = r1 * r2
    const equation = `x^{2}${b === 0 ? '' : linearLatex({ a: b, b: 0 }).startsWith('-') ? linearLatex({ a: b, b: 0 }) : `+${linearLatex({ a: b, b: 0 })}`}${c < 0 ? c : `+${c}`}=0`
    const answer = Math.max(r1, r2)
    const other = Math.min(r1, r2)
    const candidates: Candidate[] = [{ value: -other, error: 'formula-sign' }, { value: -answer, error: 'formula-sign' }, { value: b * b - 4 * c, error: 'no-root' }, ...near(answer)]
    const choices = options(random, answer, candidates.filter((item) => item.value !== other))
    return choices && question(4, kind, withLarger(equation), choices, answer, equation)
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => EquationsRaceQuestion | null

const circuitGenerators: Generator[] = [simpleQuestion, firstDegreeQuestion, denominatorQuestion, problemQuestion, quadraticQuestion]

export function generateEquationsRaceQuestion(random: Random, circuit: number, tier: Tier): EquationsRaceQuestion {
    const generator = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 400; attempt += 1) {
        const next = generator(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkEquationsPitAnswer(question: EquationsRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function equationsParTime(circuit: number): number {
    return parTimeFor([9, 11, 13, 13, 12][circuit] ?? 11)
}

export const equationsRaceErrorTips: Record<EquationsRaceError, LocalizedText> = {
    'transpose-sign': say('Atal batetik bestera pasatzean, gaiak zeinua aldatzen du.', 'Al pasar de un miembro a otro, el término cambia de signo.', 'عند النقل من طرف إلى آخر تتغيّر إشارة الحد.'),
    'transpose-operation': say('Batzen ari dena kentzen pasatzen da; biderkatzen ari dena, zatitzen. Ordena: lehenik batugaiak, gero koefizientea.', 'Lo que suma pasa restando; lo que multiplica, dividiendo. Orden: primero los sumandos, después el coeficiente.', 'ما يُجمع ينتقل مطروحًا وما يَضرب ينتقل قاسمًا. الترتيب: المجاميع أولًا ثم المعامل.'),
    bracket: say('Parentesiaren aurreko zenbakiak barruko gai GUZTIAK biderkatzen ditu.', 'El número delante del paréntesis multiplica a TODOS los términos de dentro.', 'العدد قبل القوس يضرب كل الحدود داخله.'),
    'not-all-terms': say('MKTaz gai GUZTIAK biderkatu behar dira, zatikirik gabeko zenbakiak ere bai.', 'Hay que multiplicar TODOS los términos por el m.c.m., también los números sin fracción.', 'يجب ضرب كل الحدود في م.م.أ حتى الأعداد بلا كسور.'),
    'minus-numerator': say('Zatikiaren aurreko minusak zenbakitzaile osoaren zeinua aldatzen du: $-(x-3)=-x+3$.', 'El menos delante de la fracción cambia el signo de todo el numerador: $-(x-3)=-x+3$.', 'الناقص قبل الكسر يغيّر إشارة البسط كله: $-(x-3)=-x+3$.'),
    'wrong-equation': say('Irakurri berriro enuntziatua eta egiaztatu emaitza hartan.', 'Vuelve a leer el enunciado y comprueba el resultado en él.', 'أعد قراءة النص وتحقّق من النتيجة فيه.'),
    'no-root': say('$x^{2}$-ren balioa aurkitu ondoren, erro karratua atera behar da.', 'Después de hallar $x^{2}$ hay que hacer la raíz cuadrada.', 'بعد إيجاد $x^{2}$ يجب أخذ الجذر التربيعي.'),
    'formula-sign': say('Formulan $-b$ dago: b-ren zeinua aldatu.', 'En la fórmula aparece $-b$: cambia el signo de b.', 'في الصيغة يظهر $-b$: غيّر إشارة b.'),
    calculation: say('Berrikusi kalkulua eta egiaztatu ebazpena ordeztuz.', 'Revisa el cálculo y comprueba la solución sustituyendo.', 'راجع الحساب وتحقّق من الحل بالتعويض.')
}
