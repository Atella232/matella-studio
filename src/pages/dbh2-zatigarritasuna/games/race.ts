import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { ren, rekin } from '../basque.ts'
import { digitSum, divisors, factorize, factorLatex, gcd, lcm } from '../math.ts'
import { notation } from '../notation.ts'

/* ==========================================================================
   Carrera de divisibilidad: question generators for the five circuits.
   Every wrong option comes from a typical mistake (ZKH and MKT swapped,
   the product instead of the MKT, 51 looking prime…) and explains it.
   ========================================================================== */

export const DIVISIBILITY_RACE_CIRCUITS = 5

export type DivisibilityRaceError =
    | 'not-multiple'
    | 'is-divisor'
    | 'forgot-ends'
    | 'counted-pairs'
    | 'last-digit'
    | 'digit-sum'
    | 'three-not-nine'
    | 'eleven'
    | 'looks-prime'
    | 'not-prime-factor'
    | 'wrong-exponent'
    | 'power-times'
    | 'swapped'
    | 'product'
    | 'not-greatest'
    | 'not-least'
    | 'calculation'

export type DivisibilityRaceQuestion = RaceQuestion<DivisibilityRaceError>

/** Text per language; formulas may use the @GCD/@LCM/@DIV notation */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu: notation(eu).eu, es: notation(es).es, ar: notation(ar).ar })

interface Candidate {
    latex: string
    error: DivisibilityRaceError
}

/** The right option and three different wrong ones, in order of preference; null when there are not enough */
function buildOptions(random: Random, right: string, mistakes: Candidate[]): RaceOption<DivisibilityRaceError>[] | null {
    const used = new Set([right])
    const wrong: Candidate[] = []
    for (const mistake of mistakes) {
        if (wrong.length === 3) break
        if (used.has(mistake.latex)) continue
        used.add(mistake.latex)
        wrong.push(mistake)
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: right, correct: true, error: null }, ...wrong.map((mistake) => ({ latex: mistake.latex, correct: false, error: mistake.error }))])
}

const numberCandidates = (values: number[], error: DivisibilityRaceError): Candidate[] => values.filter((value) => Number.isInteger(value) && value > 0).map((value) => ({ latex: String(value), error }))

const nearMisses = (answer: number): Candidate[] => numberCandidates([answer + 1, answer - 1, answer + 2, answer - 2], 'calculation')

function question(circuit: number, kind: string, prompt: LocalizedText, options: RaceOption<DivisibilityRaceError>[], answer: number, solution: LocalizedText, writable: boolean): DivisibilityRaceQuestion {
    return { circuit, kind, prompt, options, answer: fraction(answer), answerForm: 'any', percentAnswer: false, writable, solution }
}

const interesting = [12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48, 54, 60, 63, 72, 80, 84, 90, 96, 100]

/* ---------- Circuit 0: multiples and divisors ---------- */

function multipleQuestion(random: Random, tier: Tier): DivisibilityRaceQuestion | null {
    const n = randomInt(random, 3, [9, 13, 19][tier])
    const answer = n * randomInt(random, 3, 12)
    const tempting = [answer + 1, answer - 1, answer + 2, answer - 2, answer + n - 1, 10 * randomInt(random, 2, 9) + (n % 10)]
    const options = buildOptions(random, String(answer), numberCandidates(tempting.filter((value) => value % n !== 0), 'not-multiple'))
    if (!options) return null
    return question(0, 'multiple', say(`Zein da ${ren(n)} multiploa?`, `¿Cuál es múltiplo de ${n}?`, `أي عدد مضاعف لـ ${n}؟`), options, answer, say(`$${answer}=${n}\\cdot ${answer / n}$`, `$${answer}=${n}\\cdot ${answer / n}$`, `$${answer}=${n}\\cdot ${answer / n}$`), false)
}

function divisorCountQuestion(random: Random, tier: Tier): DivisibilityRaceQuestion | null {
    const n = pick(random, tier === 0 ? interesting.slice(0, 10) : interesting)
    const all = divisors(n)
    const count = all.length
    const options = buildOptions(random, String(count), [
        ...numberCandidates([count - 2], 'forgot-ends'),
        ...numberCandidates([Math.ceil(count / 2)], 'counted-pairs'),
        ...nearMisses(count)
    ])
    if (!options) return null
    return question(0, 'divisor-count', say(`Zenbat zatitzaile ditu ${n}k?`, `¿Cuántos divisores tiene ${n}?`, `كم قاسمًا للعدد ${n}؟`), options, count, say(`$@DIV(${n})=\\{${all.join(',')}\\}$`, `$@DIV(${n})=\\{${all.join(',')}\\}$`, `$@DIV(${n})=\\{${all.join(',')}\\}$`), true)
}

function notDivisorQuestion(random: Random, tier: Tier): DivisibilityRaceQuestion | null {
    const n = pick(random, tier === 0 ? interesting.slice(0, 12) : interesting)
    const middle = divisors(n).filter((value) => value > 1 && value < n)
    if (middle.length < 3) return null
    const chosen = shuffle(random, middle).slice(0, 3)
    const impostors = chosen.map((value) => value + 1).concat(chosen.map((value) => value - 1)).filter((value) => value > 1 && n % value !== 0)
    if (impostors.length === 0) return null
    const answer = pick(random, impostors)
    const options = buildOptions(random, String(answer), numberCandidates(chosen, 'is-divisor'))
    if (!options) return null
    const rest = n % answer
    return question(0, 'not-divisor', say(`Zein EZ da ${ren(n)} zatitzailea?`, `¿Cuál NO es divisor de ${n}?`, `أي عدد ليس قاسمًا لـ ${n}؟`), options, answer, say(`$${n}=${answer}\\cdot ${Math.floor(n / answer)}+${rest}$: hondarra ez da 0.`, `$${n}=${answer}\\cdot ${Math.floor(n / answer)}+${rest}$: el resto no es 0.`, `$${n}=${answer}\\cdot ${Math.floor(n / answer)}+${rest}$: الباقي ليس 0.`), false)
}

/* ---------- Circuit 1: divisibility rules ---------- */

function divisibleQuestion(random: Random, tier: Tier): DivisibilityRaceQuestion | null {
    const d = pick(random, [[2, 5, 10, 3], [3, 9, 5, 10], [3, 9, 11]][tier])
    const low = tier === 2 ? 1000 : 100
    const high = tier === 2 ? 9999 : 999
    const answer = d * randomInt(random, Math.ceil(low / d), Math.floor(high / d))
    const tries = Array.from({ length: 60 }, () => randomInt(random, low, high)).filter((value) => value % d !== 0)
    const mistakes: Candidate[] = []
    if (d === 9) mistakes.push(...numberCandidates(tries.filter((value) => value % 3 === 0), 'three-not-nine'))
    if (d === 3) mistakes.push(...numberCandidates(tries.filter((value) => [3, 6, 9].includes(value % 10)), 'last-digit'))
    if (d === 10) mistakes.push(...numberCandidates(tries.filter((value) => value % 5 === 0), 'last-digit'))
    if (d === 11) mistakes.push(...numberCandidates(tries.filter((value) => String(value)[0] === String(value).slice(-1)), 'eleven'))
    const rest: DivisibilityRaceError = d === 3 || d === 9 ? 'digit-sum' : d === 11 ? 'eleven' : 'last-digit'
    mistakes.push(...numberCandidates(tries, rest))
    const options = buildOptions(random, String(answer), mistakes)
    if (!options) return null
    const why = d === 3 || d === 9
        ? `$${String(answer).split('').join('+')}=${digitSum(answer)}$`
        : d === 11 ? `$${answer}=11\\cdot ${answer / 11}$` : `$${answer}=${d}\\cdot ${answer / d}$`
    return question(1, `divisible-${d}`, say(`Zein da ${rekin(d)} zatigarria?`, `¿Cuál es divisible por ${d}?`, `أي عدد يقبل القسمة على ${d}؟`), options, answer, say(why, why, why), false)
}

function missingDigitQuestion(random: Random): DivisibilityRaceQuestion | null {
    const first = randomInt(random, 1, 9)
    const last = randomInt(random, 0, 9)
    const valid = Array.from({ length: 10 }, (_, digit) => digit).filter((digit) => (first + digit + last) % 9 === 0)
    if (valid.length !== 1) return null
    const answer = valid[0]
    const byThree = Array.from({ length: 10 }, (_, digit) => digit).filter((digit) => digit !== answer && (first + digit + last) % 3 === 0)
    const options = buildOptions(random, String(answer), [...numberCandidates(byThree, 'three-not-nine'), ...numberCandidates([answer + 1, answer - 1, answer + 2].filter((digit) => digit <= 9), 'digit-sum'), ...numberCandidates([0].filter((digit) => digit !== answer), 'digit-sum')])
    if (!options) return null
    const shape = `${first}\\square ${last}`
    return question(1, 'missing-digit', say(`Zein zifra falta da $${shape}$ 9rekin zatigarria izateko?`, `¿Qué cifra falta en $${shape}$ para que sea divisible por 9?`, `ما الرقم الناقص في $${shape}$ ليقبل القسمة على 9؟`), options, answer, say(`$${first}+${answer}+${last}=${first + answer + last}$`, `$${first}+${answer}+${last}=${first + answer + last}$`, `$${first}+${answer}+${last}=${first + answer + last}$`), true)
}

/* ---------- Circuit 2: primes and factorization ---------- */

const primesToChoose = [23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
const lookPrime = [21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93, 99]

function primeQuestion(random: Random, tier: Tier): DivisibilityRaceQuestion | null {
    const limit = [50, 80, 100][tier]
    const answer = pick(random, primesToChoose.filter((value) => value < limit))
    const options = buildOptions(random, String(answer), numberCandidates(shuffle(random, lookPrime.filter((value) => value < limit + 10)), 'looks-prime'))
    if (!options) return null
    const others = options.filter((option) => !option.correct).map((option) => `${option.latex}=${factorLatex(factorize(Number(option.latex)))}`).join(',\\ ')
    return question(2, 'prime', say('Zein da zenbaki lehena?', '¿Cuál es un número primo?', 'أي عدد أولي؟'), options, answer, say(`$${others}$`, `$${others}$`, `$${others}$`), false)
}

const toFactorize = [24, 36, 40, 48, 54, 60, 72, 84, 90, 96, 108, 120, 126, 150, 180, 200, 240, 252, 280, 300, 360]

function factorizationQuestion(random: Random, tier: Tier): DivisibilityRaceQuestion | null {
    const n = pick(random, tier === 0 ? toFactorize.slice(0, 10) : toFactorize)
    const factors = factorize(n)
    const right = factorLatex(factors)
    const expanded = factors.flatMap(([prime, exponent]) => Array.from({ length: exponent }, () => prime))
    // Two primes merged into a composite number: correct product, wrong factors
    const merged = [expanded[0] * expanded[1], ...expanded.slice(2)].sort((a, b) => a - b).join('\\cdot ')
    const bumped = factorLatex(factors.map(([prime, exponent], index) => [prime, index === 0 ? exponent + 1 : exponent]))
    const dropped = factorLatex(factors.map(([prime, exponent], index) => [prime, index === factors.length - 1 && exponent > 1 ? exponent - 1 : exponent]).filter(([, exponent]) => exponent > 0) as Array<[number, number]>)
    const swapped = factors.length > 1 && factors[0][1] !== factors[1][1]
        ? factorLatex([[factors[0][0], factors[1][1]], [factors[1][0], factors[0][1]], ...factors.slice(2)])
        : factorLatex(factors.map(([prime, exponent], index) => [prime, index === factors.length - 1 ? exponent + 1 : exponent]))
    const options = buildOptions(random, right, [
        { latex: merged, error: 'not-prime-factor' },
        { latex: bumped, error: 'wrong-exponent' },
        { latex: swapped, error: 'wrong-exponent' },
        { latex: dropped, error: 'wrong-exponent' }
    ])
    if (!options) return null
    return question(2, 'factorization', say(`Zein da ${ren(n)} deskonposizioa biderkagai lehenetan?`, `¿Cuál es la descomposición de ${n} en factores primos?`, `ما تحليل ${n} إلى عوامل أولية؟`), options, n, say(`$${n}=${right}$`, `$${n}=${right}$`, `$${n}=${right}$`), false)
}

function powerValueQuestion(random: Random, tier: Tier): DivisibilityRaceQuestion | null {
    const primes = tier === 2 ? [2, 3, 5, 7] : [2, 3, 5]
    const exponents = primes.map(() => randomInt(random, 0, tier === 0 ? 2 : 3))
    const factors = primes.map((prime, index) => [prime, exponents[index]] as [number, number]).filter(([, exponent]) => exponent > 0)
    if (factors.length < 2) return null
    const answer = factors.reduce((value, [prime, exponent]) => value * prime ** exponent, 1)
    if (answer > 1000 || answer < 12) return null
    const times = factors.reduce((value, [prime, exponent]) => value * prime * exponent, 1)
    const options = buildOptions(random, String(answer), [
        ...numberCandidates([times], 'power-times'),
        ...numberCandidates([answer * factors[0][0], answer / factors[0][0]], 'wrong-exponent'),
        ...nearMisses(answer)
    ])
    if (!options) return null
    const latex = factorLatex(factors)
    const worked = factors.map(([prime, exponent]) => String(prime ** exponent)).join('\\cdot ')
    return question(2, 'power-value', say(`Zein zenbaki da $${latex}$?`, `¿Qué número es $${latex}$?`, `ما العدد $${latex}$؟`), options, answer, say(`$${latex}=${worked}=${answer}$`, `$${latex}=${worked}=${answer}$`, `$${latex}=${worked}=${answer}$`), true)
}

/* ---------- Circuit 3: ZKH and MKT ---------- */

/** Two numbers with a common factor: a = g·x, b = g·y with x and y coprime */
function pairWithCommonFactor(random: Random, tier: Tier): [number, number] | null {
    const g = pick(random, [[2, 3, 4, 5], [2, 3, 4, 5, 6, 8], [4, 6, 8, 9, 10, 12]][tier])
    const x = randomInt(random, 1, 5)
    const y = randomInt(random, 2, [5, 7, 9][tier])
    if (x === y || gcd(x, y) !== 1) return null
    return [g * x, g * y]
}

function gcdLcmQuestion(random: Random, tier: Tier, kind: 'gcd' | 'lcm'): DivisibilityRaceQuestion | null {
    const pair = pairWithCommonFactor(random, tier)
    if (!pair) return null
    const [a, b] = pair
    const g = gcd(a, b)
    const m = lcm(a, b)
    const common = divisors(g).filter((value) => value < g)
    const answer = kind === 'gcd' ? g : m
    const options = buildOptions(random, String(answer), kind === 'gcd'
        ? [...numberCandidates([m], 'swapped'), ...numberCandidates([a * b], 'product'), ...numberCandidates(common.slice(-1), 'not-greatest'), ...nearMisses(answer)]
        : [...numberCandidates([g], 'swapped'), ...numberCandidates([a * b].filter((value) => value !== m), 'product'), ...numberCandidates([2 * m], 'not-least'), ...nearMisses(answer)])
    if (!options) return null
    const token = kind === 'gcd' ? '@GCD' : '@LCM'
    const worked = `$${a}=${factorLatex(factorize(a))},\\ ${b}=${factorLatex(factorize(b))}\\ \\Rightarrow\\ ${token}(${a},${b})=${factorLatex(factorize(answer))}=${answer}$`
    return question(3, kind, say(`Kalkulatu: $${token}(${a},${b})$`, `Calcula: $${token}(${a},${b})$`, `احسب: $${token}(${a},${b})$`), options, answer, say(worked, worked, worked), true)
}

/* ---------- Circuit 4: problems ---------- */

function problemQuestion(random: Random, tier: Tier): DivisibilityRaceQuestion | null {
    const pair = pairWithCommonFactor(random, tier)
    if (!pair) return null
    const [a, b] = pair
    const g = gcd(a, b)
    const m = lcm(a, b)
    const kind = pick(random, ['tiles', 'bags', 'buses', 'lights'] as const)
    const usesGcd = kind === 'tiles' || kind === 'bags'
    const answer = usesGcd ? g : m
    const scale = kind === 'tiles' ? 10 : 1
    const A = a * scale
    const B = b * scale
    const shown = answer * scale
    const prompts = {
        tiles: say(`${A} cm × ${B} cm-ko gela bat ahalik eta handienak diren lauza karratuekin estali nahi da, bat ere moztu gabe. Zenbat cm izango ditu lauzaren aldeak?`, `Se quiere cubrir una sala de ${A} cm × ${B} cm con las baldosas cuadradas más grandes posible, sin cortar ninguna. ¿Cuántos cm medirá el lado de cada baldosa?`, `نريد تغطية غرفة ${A} سم × ${B} سم بأكبر بلاط مربع ممكن دون قص. كم سنتيمترًا طول ضلع البلاطة؟`),
        bags: say(`${A} sagar eta ${B} udare ditugu. Poltsa berdinak egin nahi ditugu, fruta bakarrekoak eta ahalik eta pieza gehienekin. Zenbat pieza poltsa bakoitzean?`, `Tenemos ${A} manzanas y ${B} peras. Queremos bolsas iguales, de una sola fruta y con el mayor número de piezas. ¿Cuántas piezas por bolsa?`, `لدينا ${A} تفاحة و${B} إجاصة. نريد أكياسًا متساوية من نوع واحد وبأكبر عدد ممكن. كم قطعة في كل كيس؟`),
        buses: say(`Bi autobus ${A} eta ${B} minuturo irteten dira, eta orain batera irten dira. Zenbat minutu barru irtengo dira berriro batera?`, `Dos autobuses salen cada ${A} y ${B} minutos, y ahora han salido juntos. ¿Dentro de cuántos minutos volverán a salir juntos?`, `حافلتان تنطلقان كل ${A} و${B} دقيقة، وقد انطلقتا معًا الآن. بعد كم دقيقة تنطلقان معًا مجددًا؟`),
        lights: say(`Argi batek ${A} segundoro keinu egiten du eta beste batek ${B}ro. Batera egin dute. Zenbat segundo barru egingo dute berriro batera?`, `Una luz parpadea cada ${A} segundos y otra cada ${B}. Acaban de coincidir. ¿Dentro de cuántos segundos volverán a coincidir?`, `ضوء يومض كل ${A} ثانية وآخر كل ${B}. تزامنا الآن. بعد كم ثانية يتزامنان مجددًا؟`)
    }
    const other = (usesGcd ? m : g) * scale
    const options = buildOptions(random, String(shown), [
        ...numberCandidates([other], 'swapped'),
        ...numberCandidates([usesGcd ? (A / shown) * (B / shown) : A * B].filter((value) => value !== shown), usesGcd ? 'calculation' : 'product'),
        ...numberCandidates([A + B], 'calculation'),
        ...nearMisses(shown)
    ])
    if (!options) return null
    const token = usesGcd ? '@GCD' : '@LCM'
    const worked = `$${token}(${A},${B})=${shown}$`
    return question(4, kind, prompts[kind], options, shown, say(worked, worked, worked), true)
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => DivisibilityRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [multipleQuestion, divisorCountQuestion, notDivisorQuestion],
    [divisibleQuestion, divisibleQuestion, (random) => missingDigitQuestion(random)],
    [primeQuestion, factorizationQuestion, powerValueQuestion],
    [(random, tier) => gcdLcmQuestion(random, tier, 'gcd'), (random, tier) => gcdLcmQuestion(random, tier, 'lcm')],
    [problemQuestion]
]

export function generateDivisibilityRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): DivisibilityRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 400; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkDivisibilityPitAnswer(question: DivisibilityRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function divisibilityParTime(circuit: number): number {
    return parTimeFor([8, 9, 10, 13, 16][circuit] ?? 10)
}

const text = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })

export const divisibilityRaceErrorTips: Record<DivisibilityRaceError, LocalizedText> = {
    'not-multiple': text('Zatiketa ez da zehatza: hondarra ez da 0. Multiploak zenbakia bider 1, 2, 3… dira.', 'La división no es exacta: el resto no es 0. Los múltiplos son el número por 1, 2, 3…', 'القسمة ليست تامة: الباقي ليس 0. المضاعفات هي العدد مضروبًا في 1، 2، 3…'),
    'is-divisor': text('Hori zatitzailea da: zatiketa zehatza da. Bilatu hondarra ematen duena.', 'Ese sí es divisor: la división es exacta. Busca el que deja resto.', 'هذا قاسم: القسمة تامة. ابحث عن العدد الذي يترك باقيًا.'),
    'forgot-ends': text('Ez ahaztu 1 eta zenbakia bera: beti dira zatitzaileak.', 'No olvides el 1 y el propio número: siempre son divisores.', 'لا تنسَ 1 والعدد نفسه: هما قاسمان دائمًا.'),
    'counted-pairs': text('Bikoteak zenbatu dituzu, ez zatitzaileak: bikote bakoitzak bi zatitzaile ditu (edo bat, 6 · 6 bezala).', 'Has contado parejas, no divisores: cada pareja son dos divisores (o uno, como 6 · 6).', 'عددت الأزواج لا القواسم: كل زوج فيه قاسمان (أو واحد مثل 6 · 6).'),
    'last-digit': text('Irizpide horretan azken zifrari begiratu behar zaio: 2 (bikoitia), 5 (0 edo 5), 10 (0).', 'En ese criterio hay que mirar la última cifra: 2 (par), 5 (0 o 5), 10 (0).', 'في هذه القاعدة ننظر إلى الرقم الأخير: 2 (زوجي)، 5 (0 أو 5)، 10 (0).'),
    'digit-sum': text('3 eta 9rako batu zifra guztiak; azken zifrak ez du balio.', 'Para el 3 y el 9 suma todas las cifras; la última cifra no sirve.', 'لـ 3 و9 اجمع كل الأرقام؛ الرقم الأخير لا يكفي.'),
    'three-not-nine': text('3rekin zatigarria da, baina 9rekin ez: zifren batura 3ren multiploa da, ez 9rena.', 'Es divisible por 3 pero no por 9: la suma de cifras es múltiplo de 3, no de 9.', 'يقبل القسمة على 3 لا على 9: مجموع الأرقام مضاعف لـ 3 لا لـ 9.'),
    eleven: text('11rentzat kendu posizio bikoitien eta bakoitien baturak: 0 edo 11ren multiploa izan behar du.', 'Para el 11 resta las sumas de los lugares pares e impares: tiene que dar 0 o múltiplo de 11.', 'لـ 11 اطرح مجموعي المواقع الزوجية والفردية: يجب أن يكون 0 أو مضاعفًا لـ 11.'),
    'looks-prime': text('Lehena dirudi, baina ez da: probatu 3, 7 edo 11ren irizpideak.', 'Parece primo, pero no lo es: prueba los criterios del 3, del 7 o del 11.', 'يبدو أوليًا لكنه ليس كذلك: جرّب قواعد 3 أو 7 أو 11.'),
    'not-prime-factor': text('Biderkadura zuzena da, baina biderkagai guztiak lehenak izan behar dira.', 'El producto es correcto, pero todos los factores tienen que ser primos.', 'الناتج صحيح، لكن يجب أن تكون كل العوامل أولية.'),
    'wrong-exponent': text('Berretzaileren bat ez dago ondo: zenbatu zenbat aldiz zatitu duzun lehen bakoitzarekin.', 'Algún exponente no está bien: cuenta cuántas veces has dividido entre cada primo.', 'أحد الأسس غير صحيح: عدّ كم مرة قسمت على كل عدد أولي.'),
    'power-times': text('Berretura ez da biderketa: $2^{3}=2\\cdot 2\\cdot 2=8$, ez $2\\cdot 3$.', 'Una potencia no es una multiplicación: $2^{3}=2\\cdot 2\\cdot 2=8$, no $2\\cdot 3$.', 'القوة ليست ضربًا: $2^{3}=2\\cdot 2\\cdot 2=8$ وليست $2\\cdot 3$.'),
    swapped: text('ZKH eta MKT nahastu dituzu. ZKH: komunak, txikienak. MKT: guztiak, handienak.', 'Has confundido el m.c.d. y el m.c.m. m.c.d.: comunes, menor exponente. m.c.m.: todos, mayor exponente.', 'خلطت بين ق.م.أ وم.م.أ. ق.م.أ: المشتركة بأصغر أس. م.م.أ: الكل بأكبر أس.'),
    product: text('Biderkadura multiplo komuna da, baina ez beti txikiena: faktore komunak behin bakarrik hartzen dira.', 'El producto es múltiplo común, pero no siempre el menor: los factores comunes se toman una sola vez.', 'حاصل الضرب مضاعف مشترك لكنه ليس دائمًا الأصغر: العوامل المشتركة تُؤخذ مرة واحدة.'),
    'not-greatest': text('Zatitzaile komuna da, baina ez handiena.', 'Es un divisor común, pero no el mayor.', 'إنه قاسم مشترك لكنه ليس الأكبر.'),
    'not-least': text('Multiplo komuna da, baina ez txikiena.', 'Es un múltiplo común, pero no el menor.', 'إنه مضاعف مشترك لكنه ليس الأصغر.'),
    calculation: text('Metodoa ondo dago, baina kalkuluan akats bat dago. Egin berriro poliki.', 'El método está bien, pero hay un error de cálculo. Hazlo otra vez despacio.', 'الطريقة صحيحة لكن في الحساب خطأ. أعده ببطء.')
}
