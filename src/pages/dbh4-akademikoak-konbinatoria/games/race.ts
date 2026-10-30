import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readCountAnswer } from '../answers.ts'

/* ==========================================================================
   Konbinatoriaren lasterketa (4. DBH akademikoak): five circuits, one per
   stage — counting (menus, a factorial, a quotient of factorials),
   variations (with repetition, without repetition, numbers that cannot
   start with 0), permutations (a row, two people together, words with
   repeated letters), combinations (C(n, k), handshakes, the symmetry of
   the combinatorial numbers) and problems (diagonals, paths on a grid,
   committees). Wrong options are typical mistakes: adding instead of
   multiplying, a factor forgotten, nᵏ turned into kⁿ, counting order when
   it does not matter (or the other way round), the 0 at the start, the
   block not ordered inside, the repeated letters not divided, the sides
   counted as diagonals… Every answer is a whole number, so every question
   can be written at the pit stop; every question carries `meta`, the
   numbers of its prompt, so the test recomputes the answer.
   ========================================================================== */

export const COMBINATORICS_AK_RACE_CIRCUITS = 5

export type CombinatoricsAkRaceError =
    | 'sum'
    | 'missing'
    | 'partial'
    | 'off-by-one'
    | 'subtract'
    | 'swap'
    | 'no-repeat'
    | 'product'
    | 'repeat'
    | 'no-order'
    | 'zero'
    | 'square'
    | 'block'
    | 'no-divide'
    | 'order'
    | 'sides'
    | 'double'
    | 'mix'
    | 'calculation'

export type CombinatoricsAkRaceQuestion = RaceQuestion<CombinatoricsAkRaceError> & { meta: Record<string, number> }

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex}$` })
const math = (latex: string) => `$${latex}$`

export const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
const arrange = (n: number, k: number) => (k > n ? 0 : factorial(n) / factorial(n - k))
const choose = (n: number, k: number) => (k < 0 || k > n ? 0 : arrange(n, k) / factorial(k))
/** A count in LaTeX, thousands grouped with a thin space */
export const big = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,')

interface Candidate {
    value: number
    error: CombinatoricsAkRaceError
}

const wrong = (value: number, error: CombinatoricsAkRaceError): Candidate => ({ value, error })
const near = (value: number): Candidate[] => [value + 1, value - 1, value * 2, value + 2].map((item) => wrong(item, 'calculation'))

/** The right option and three different mistakes (whole, positive, not too big) */
function options(random: Random, right: number, candidates: Candidate[]): RaceOption<CombinatoricsAkRaceError>[] | null {
    const used = new Set([right])
    const picked: Candidate[] = []
    for (const candidate of candidates) {
        if (picked.length === 3) break
        if (!Number.isInteger(candidate.value) || candidate.value <= 0 || candidate.value > 10_000_000 || used.has(candidate.value)) continue
        used.add(candidate.value)
        picked.push(candidate)
    }
    if (picked.length < 3) return null
    return shuffle(random, [{ latex: big(right), correct: true, error: null }, ...picked.map((item) => ({ latex: big(item.value), correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<CombinatoricsAkRaceError>[] | null, answer: number, solution: string, meta: Record<string, number>): CombinatoricsAkRaceQuestion | null {
    if (!choices) return null
    return { circuit, kind, prompt, options: choices, answer: fraction(answer), answerForm: 'any', percentAnswer: false, writable: true, solution: same(solution), meta }
}

/* ---------- Circuit 0: counting ---------- */

function productQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const a = randomInt(random, 2, 9)
    const b = randomInt(random, 2, 9)
    const c = tier === 0 ? 1 : randomInt(random, 2, 5)
    const right = a * b * c
    const prompt = c === 1
        ? say(`Jatetxe batean ${math(String(a))} lehen plater eta ${math(String(b))} bigarren plater daude. Zenbat menu?`, `En un restaurante hay ${math(String(a))} primeros y ${math(String(b))} segundos. ¿Cuántos menús hay?`, `في مطعم ${math(String(a))} أطباق أولى و${math(String(b))} أطباق ثانية. كم وجبة؟`, `A restaurant has ${math(String(a))} starters and ${math(String(b))} main courses. How many menus are there?`)
        : say(`Jatetxe batean ${math(String(a))} lehen plater, ${math(String(b))} bigarren plater eta ${math(String(c))} postre daude. Zenbat menu?`, `En un restaurante hay ${math(String(a))} primeros, ${math(String(b))} segundos y ${math(String(c))} postres. ¿Cuántos menús hay?`, `في مطعم ${math(String(a))} أطباق أولى و${math(String(b))} أطباق ثانية و${math(String(c))} حلويات. كم وجبة؟`, `A restaurant has ${math(String(a))} starters, ${math(String(b))} main courses and ${math(String(c))} desserts. How many menus are there?`)
    return build(0, 'product', prompt, options(random, right, [wrong(a + b + (c === 1 ? 0 : c), 'sum'), wrong(c === 1 ? a * a : a * b, c === 1 ? 'calculation' : 'missing'), ...near(right)]), right, `${c === 1 ? `${a}\\cdot ${b}` : `${a}\\cdot ${b}\\cdot ${c}`}=${big(right)}`, { a, b, c })
}

function factorialQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const n = randomInt(random, 3, tier === 0 ? 5 : 7)
    const right = factorial(n)
    return build(0, 'factorial', say(`Zenbat da ${math(`${n}!`)}?`, `¿Cuánto vale ${math(`${n}!`)}?`, `كم يساوي ${math(`${n}!`)}؟`, `What is ${math(`${n}!`)}?`), options(random, right, [wrong(n * (n - 1), 'partial'), wrong(factorial(n - 1), 'off-by-one'), wrong((n * (n + 1)) / 2, 'sum'), ...near(right)]), right, `${Array.from({ length: n }, (_, index) => n - index).join('\\cdot ')}=${big(right)}`, { n })
}

function quotientQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const b = randomInt(random, 3, 9)
    const a = b + randomInt(random, 2, tier === 0 ? 2 : 3)
    const right = factorial(a) / factorial(b)
    return build(0, 'quotient', say(`Kalkulatu ${math(`\\frac{${a}!}{${b}!}`)}.`, `Calcula ${math(`\\frac{${a}!}{${b}!}`)}.`, `احسب ${math(`\\frac{${a}!}{${b}!}`)}.`, `Calculate ${math(`\\frac{${a}!}{${b}!}`)}.`), options(random, right, [wrong(factorial(a - b), 'subtract'), wrong(right / a, 'off-by-one'), wrong(right * (b), 'off-by-one'), ...near(right)]), right, `${Array.from({ length: a - b }, (_, index) => a - index).join('\\cdot ')}=${big(right)}`, { a, b })
}

/* ---------- Circuit 1: variations ---------- */

function withRepetitionQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const n = randomInt(random, 2, tier === 0 ? 4 : 6)
    const k = randomInt(random, 2, 4)
    if (n === k) return null
    const right = n ** k
    return build(1, 'vr', say(
        `Zenbat ${math(String(k))} zifrako zenbaki egin daitezke ${math(String(n))} zifra desberdinekin (0 ez dago), errepikatuz?`,
        `¿Cuántos números de ${math(String(k))} cifras se pueden formar con ${math(String(n))} cifras distintas (sin el 0), repitiendo?`,
        `كم عددًا من ${math(String(k))} أرقام يمكن تكوينه بـ${math(String(n))} أرقام مختلفة (دون 0) مع التكرار؟`, `How many ${math(String(k))}-digit numbers can be made from ${math(String(n))} different digits (without the 0), with repetition allowed?`
    ), options(random, right, [wrong(k ** n, 'swap'), wrong(arrange(n, k), 'no-repeat'), wrong(n * k, 'product'), ...near(right)]), right, `\\text{VR}_{${n},${k}}=${n}^{${k}}=${big(right)}`, { n, k })
}

function variationsQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const n = randomInt(random, 4, tier === 0 ? 7 : 10)
    const k = randomInt(random, 2, 3)
    const right = arrange(n, k)
    return build(1, 'v', say(
        `${math(String(n))} korrikalaritatik, zenbat eratara bana daitezke lehen ${math(String(k))} postuak?`,
        `Entre ${math(String(n))} corredores, ¿de cuántas formas se pueden repartir los ${math(String(k))} primeros puestos?`,
        `بين ${math(String(n))} عدّائين، بكم طريقة يمكن توزيع المراكز الـ${math(String(k))} الأولى؟`, `Among ${math(String(n))} runners, in how many ways can the first ${math(String(k))} places be awarded?`
    ), options(random, right, [wrong(n ** k, 'repeat'), wrong(choose(n, k), 'no-order'), wrong(n * k, 'product'), ...near(right)]), right, `\\text{V}_{${n},${k}}=${Array.from({ length: k }, (_, index) => n - index).join('\\cdot ')}=${big(right)}`, { n, k })
}

function digitsQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const digits = randomInt(random, 2, tier === 0 ? 3 : 4)
    const repeat = random() < 0.5 ? 1 : 0
    const right = repeat ? 9 * 10 ** (digits - 1) : 9 * arrange(9, digits - 1)
    const withZero = repeat ? 10 ** digits : arrange(10, digits)
    const prompt = repeat
        ? say(`Zenbat ${math(String(digits))} zifrako zenbaki daude (zifrak errepika daitezke)?`, `¿Cuántos números de ${math(String(digits))} cifras hay (se pueden repetir cifras)?`, `كم عددًا من ${math(String(digits))} أرقام هناك (يجوز تكرار الأرقام)؟`, `How many ${math(String(digits))}-digit numbers are there (digits can be repeated)?`)
        : say(`Zenbat ${math(String(digits))} zifrako zenbaki daude zifrak errepikatu gabe?`, `¿Cuántos números de ${math(String(digits))} cifras hay sin repetir cifras?`, `كم عددًا من ${math(String(digits))} أرقام دون تكرار الأرقام؟`, `How many ${math(String(digits))}-digit numbers are there with no repeated digits?`)
    const first = repeat ? [9, ...Array.from({ length: digits - 1 }, () => 10)] : [9, ...Array.from({ length: digits - 1 }, (_, index) => 9 - index)]
    return build(1, 'digits', prompt, options(random, right, [wrong(withZero, 'zero'), wrong(repeat ? 9 ** digits : arrange(9, digits), repeat ? 'no-repeat' : 'zero'), wrong(repeat ? 9 * arrange(9, digits - 1) : 9 * 10 ** (digits - 1), repeat ? 'no-repeat' : 'repeat'), ...near(right)]), right, `${first.join('\\cdot ')}=${big(right)}`, { digits, repeat })
}

/* ---------- Circuit 2: permutations ---------- */

function rowQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const n = randomInt(random, 4, tier === 0 ? 6 : 8)
    const right = factorial(n)
    return build(2, 'row', say(`Zenbat eratara jar daitezke ${math(String(n))} lagun ilara batean?`, `¿De cuántas formas se pueden colocar ${math(String(n))} personas en fila?`, `بكم طريقة يمكن ترتيب ${math(String(n))} أشخاص في صف؟`, `In how many ways can ${math(String(n))} people be arranged in a line?`), options(random, right, [wrong(n * n, 'square'), wrong(factorial(n - 1), 'off-by-one'), wrong(n * (n - 1), 'partial'), ...near(right)]), right, `${n}!=${big(right)}`, { n })
}

function togetherQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const n = randomInt(random, 4, tier === 0 ? 5 : 7)
    const right = 2 * factorial(n - 1)
    return build(2, 'together', say(
        `${math(String(n))} lagun ilaran jartzen dira, eta bik elkarren ondoan egon nahi dute. Zenbat eratara?`,
        `${math(String(n))} amigos se ponen en fila, y dos quieren ir juntos. ¿De cuántas formas?`,
        `يقف ${math(String(n))} أصدقاء في صف، ويريد اثنان التجاور. بكم طريقة؟`, `${math(String(n))} friends line up, and two of them want to stand together. In how many ways?`
    ), options(random, right, [wrong(factorial(n - 1), 'block'), wrong(factorial(n), 'order'), wrong(2 * factorial(n), 'double'), ...near(right)]), right, `2\\cdot ${n - 1}!=${big(right)}`, { n })
}

function wordQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const a = randomInt(random, 2, tier === 0 ? 3 : 4)
    const b = randomInt(random, 1, 3)
    const c = tier === 0 ? 0 : randomInt(random, 0, 2)
    const total = a + b + c
    const right = factorial(total) / (factorial(a) * factorial(b) * factorial(c))
    const letters = [...Array(a).fill('A'), ...Array(b).fill('B'), ...Array(c).fill('C')].join(',\\,')
    const divisors = [a, b, c].filter((value) => value > 1).map((value) => `${value}!`).join('\\cdot ')
    return build(2, 'word', say(
        `Zenbat «hitz» (esanahirik gabe ere) egin daitezke letra hauek guztiak erabiliz: ${math(letters)}?`,
        `¿Cuántas «palabras» (aunque no tengan sentido) se pueden formar usando todas estas letras: ${math(letters)}?`,
        `كم «كلمة» (ولو بلا معنى) يمكن تكوينها باستعمال كل هذه الأحرف: ${math(letters)}؟`, `How many “words” (even if they make no sense) can be made using all these letters: ${math(letters)}?`
    ), options(random, right, [wrong(factorial(total), 'no-divide'), wrong(factorial(total) / factorial(a), 'no-divide'), ...near(right)]), right, `\\frac{${total}!}{${divisors}}=${big(right)}`, { a, b, c })
}

/* ---------- Circuit 3: combinations ---------- */

function combinationsQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const n = randomInt(random, 5, tier === 0 ? 8 : 12)
    const k = randomInt(random, 2, tier === 0 ? 3 : 4)
    const right = choose(n, k)
    return build(3, 'comb', say(
        `${math(String(n))} lagunetatik ${math(String(k))} aukeratu behar dira bidaia baterako. Zenbat talde?`,
        `De ${math(String(n))} amigos hay que elegir ${math(String(k))} para un viaje. ¿Cuántos grupos?`,
        `من ${math(String(n))} أصدقاء يجب اختيار ${math(String(k))} لرحلة. كم مجموعة؟`, `From ${math(String(n))} friends, ${math(String(k))} have to be chosen for a trip. How many groups are there?`
    ), options(random, right, [wrong(arrange(n, k), 'order'), wrong(n * k, 'product'), wrong(choose(n, k - 1), 'off-by-one'), ...near(right)]), right, `\\text{C}_{${n},${k}}=\\frac{${Array.from({ length: k }, (_, index) => n - index).join('\\cdot ')}}{${k}!}=${big(right)}`, { n, k })
}

function handshakesQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const n = randomInt(random, 5, tier === 0 ? 10 : 20)
    const right = choose(n, 2)
    return build(3, 'handshakes', say(
        `${math(String(n))} lagunek elkarri eskua ematen diote, bikote bakoitzak behin. Zenbat eskuemate?`,
        `${math(String(n))} personas se dan la mano, cada pareja una vez. ¿Cuántos apretones?`,
        `يتصافح ${math(String(n))} شخصًا، كل زوج مرة. كم مصافحة؟`, `${math(String(n))} people shake hands, each pair once. How many handshakes are there?`
    ), options(random, right, [wrong(n * (n - 1), 'order'), wrong(n * n, 'square'), wrong((n * n) / 2, 'square'), ...near(right)]), right, `\\frac{${n}\\cdot ${n - 1}}{2}=${big(right)}`, { n })
}

function symmetryQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const n = randomInt(random, 8, tier === 0 ? 12 : 20)
    const right = choose(n, 2)
    return build(3, 'symmetry', say(`Kalkulatu ${math(`\\binom{${n}}{${n - 2}}`)}.`, `Calcula ${math(`\\binom{${n}}{${n - 2}}`)}.`, `احسب ${math(`\\binom{${n}}{${n - 2}}`)}.`, `Calculate ${math(`\\binom{${n}}{${n - 2}}`)}.`), options(random, right, [wrong(n * (n - 1), 'order'), wrong(n - 2, 'subtract'), wrong(n * (n - 2), 'product'), ...near(right)]), right, `\\binom{${n}}{2}=\\frac{${n}\\cdot ${n - 1}}{2}=${big(right)}`, { n })
}

/* ---------- Circuit 4: problems ---------- */

function diagonalsQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const n = randomInt(random, 5, tier === 0 ? 10 : 15)
    const right = (n * (n - 3)) / 2
    return build(4, 'diagonals', say(`Zenbat diagonal ditu ${math(String(n))} aldeko poligono batek?`, `¿Cuántas diagonales tiene un polígono de ${math(String(n))} lados?`, `كم قطرًا لمضلع ذي ${math(String(n))} ضلعًا؟`, `How many diagonals does a polygon with ${math(String(n))} sides have?`), options(random, right, [wrong(choose(n, 2), 'sides'), wrong(n * (n - 3), 'double'), ...near(right)]), right, `\\frac{${n}\\cdot ${n - 3}}{2}=${big(right)}`, { n })
}

function gridQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const w = randomInt(random, 2, tier === 0 ? 4 : 6)
    const h = randomInt(random, 2, tier === 0 ? 3 : 4)
    const right = choose(w + h, h)
    return build(4, 'grid', say(
        `Sare batean, A-tik B-ra ${math(String(w))} urrats eskuinera eta ${math(String(h))} gora daude. Zenbat bide?`,
        `En una cuadrícula, de A a B hay ${math(String(w))} pasos a la derecha y ${math(String(h))} hacia arriba. ¿Cuántos caminos?`,
        `في شبكة، من A إلى B هناك ${math(String(w))} خطوات يمينًا و${math(String(h))} أعلى. كم مسارًا؟`, `On a grid, from A to B there are ${math(String(w))} steps to the right and ${math(String(h))} steps up. How many paths are there?`
    ), options(random, right, [wrong(w * h, 'product'), wrong(w + h, 'sum'), wrong(arrange(w + h, h), 'order'), ...near(right)]), right, `\\binom{${w + h}}{${h}}=${big(right)}`, { w, h })
}

function committeeQuestion(random: Random, tier: Tier): CombinatoricsAkRaceQuestion | null {
    const boys = randomInt(random, 4, 7)
    const girls = randomInt(random, 4, 6)
    const x = randomInt(random, 1, 2)
    const y = randomInt(random, 1, tier === 0 ? 2 : 3)
    const right = choose(boys, x) * choose(girls, y)
    return build(4, 'committee', say(
        `${math(String(boys))} mutil eta ${math(String(girls))} neska daude. ${math(String(x))} mutil eta ${math(String(y))} neska dituen batzordea egin nahi da. Zenbat eratara?`,
        `Hay ${math(String(boys))} chicos y ${math(String(girls))} chicas. Se quiere una comisión de ${math(String(x))} chicos y ${math(String(y))} chicas. ¿De cuántas formas?`,
        `هناك ${math(String(boys))} أولاد و${math(String(girls))} بنات. نريد لجنة فيها ${math(String(x))} من الأولاد و${math(String(y))} من البنات. بكم طريقة؟`, `There are ${math(String(boys))} boys and ${math(String(girls))} girls. A committee of ${math(String(x))} boys and ${math(String(y))} girls is wanted. In how many ways?`
    ), options(random, right, [wrong(choose(boys, x) + choose(girls, y), 'sum'), wrong(choose(boys + girls, x + y), 'mix'), ...near(right)]), right, `\\binom{${boys}}{${x}}\\cdot\\binom{${girls}}{${y}}=${choose(boys, x)}\\cdot ${choose(girls, y)}=${big(right)}`, { boys, girls, x, y })
}

/* ---------- Circuits ---------- */

type Generator = (random: Random, tier: Tier) => CombinatoricsAkRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [productQuestion, factorialQuestion, quotientQuestion],
    [withRepetitionQuestion, variationsQuestion, digitsQuestion],
    [rowQuestion, togetherQuestion, wordQuestion],
    [combinationsQuestion, handshakesQuestion, symmetryQuestion],
    [diagonalsQuestion, gridQuestion, committeeQuestion]
]

export function generateCombinatoricsAkRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): CombinatoricsAkRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 2000; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkCombinatoricsAkPitAnswer(question: RaceQuestion<CombinatoricsAkRaceError>, input: string): AnswerCheck {
    return checkAnswer(readCountAnswer(input), question.answer as FractionValue, question.answerForm)
}

export function combinatoricsAkParTime(circuit: number): number {
    return parTimeFor([13, 15, 15, 15, 16][circuit] ?? 15)
}

export const combinatoricsAkRaceErrorTips: Record<CombinatoricsAkRaceError, LocalizedText> = {
    sum: say('Erabakiak batera hartzen dira («eta»): biderkatu, ez batu.', 'Las decisiones se toman a la vez («y»): multiplica, no sumes.', 'القرارات تُتخذ معًا («و»): اضرب ولا تجمع.', 'The decisions are made at the same time (“and”): multiply, don\'t add.'),
    missing: say('Erabaki guztiek biderkatzen dute: ez ahaztu bat ere.', 'Todas las decisiones multiplican: no olvides ninguna.', 'كل القرارات تُضرب: لا تنسَ أيًا منها.', 'All the decisions multiply: don\'t forget any of them.'),
    partial: say('$n!$ $n$-tik 1era arteko faktore guztiak dira, ez bi bakarrik.', '$n!$ son todos los factores de $n$ a 1, no solo dos.', '$n!$ هو كل العوامل من $n$ إلى 1، لا عاملان فقط.', '$n!$ is every factor from $n$ down to 1, not just two.'),
    'off-by-one': say('Kontatu ondo faktoreak: $\\frac{a!}{b!}$-n $a-b$ faktore geratzen dira.', 'Cuenta bien los factores: en $\\frac{a!}{b!}$ quedan $a-b$ factores.', 'عُدّ العوامل جيدًا: في $\\frac{a!}{b!}$ يبقى $a-b$ عاملًا.', 'Count the factors carefully: in $\\frac{a!}{b!}$, $a-b$ factors are left.'),
    subtract: say('$\\frac{a!}{b!}$ ez da $(a-b)!$: sinplifikatu, ez kendu.', '$\\frac{a!}{b!}$ no es $(a-b)!$: simplifica, no restes.', '$\\frac{a!}{b!}$ ليس $(a-b)!$: اختصر ولا تطرح.', '$\\frac{a!}{b!}$ is not $(a-b)!$: simplify, don\'t subtract.'),
    swap: say('$\\text{VR}_{n,k}=n^{k}$: oinarria aukera kopurua da eta berretzailea lauki kopurua.', '$\\text{VR}_{n,k}=n^{k}$: la base es el número de opciones y el exponente, el de casillas.', '$\\text{VR}_{n,k}=n^{k}$: الأساس عدد الخيارات والأس عدد الخانات.', '$\\text{VR}_{n,k}=n^{k}$: the base is the number of options and the exponent is the number of slots.'),
    'no-repeat': say('Errepika badaiteke, lauki guztiek aukera kopuru bera dute.', 'Si se puede repetir, todas las casillas tienen las mismas opciones.', 'إذا جاز التكرار فلكل الخانات الخيارات نفسها.', 'If repetition is allowed, all the slots have the same options.'),
    product: say('Hori $n\\cdot k$ da; lauki bakoitzaren aukerak biderkatu behar dira.', 'Eso es $n\\cdot k$; hay que multiplicar las opciones de cada casilla.', 'هذا $n\\cdot k$؛ يجب ضرب خيارات كل خانة.', 'That is $n\\cdot k$: you must multiply the options in each slot.'),
    repeat: say('Ezin bada errepikatu, lauki bakoitzak aukera bat gutxiago du.', 'Si no se puede repetir, cada casilla tiene una opción menos.', 'إذا لم يجز التكرار فلكل خانة خيار أقل.', 'If repetition is not allowed, each slot has one option fewer.'),
    'no-order': say('Postuak desberdinak dira: ordenak axola du, ez zatitu $k!$-z.', 'Los puestos son distintos: importa el orden, no dividas entre $k!$.', 'المراكز مختلفة: الترتيب مهم، لا تقسم على $k!$.', 'The places are different: order matters, don\'t divide by $k!$.'),
    zero: say('Zenbaki bat ezin da 0z hasi: lehen zifrak 9 aukera ditu.', 'Un número no puede empezar por 0: la primera cifra tiene 9 opciones.', 'لا يبدأ العدد بـ0: للرقم الأول 9 خيارات.', 'A number cannot start with 0: the first digit has 9 options.'),
    square: say('Hori ez da formula: $n!$ edo $\\frac{n(n-1)}{2}$ erabili.', 'Esa no es la fórmula: usa $n!$ o $\\frac{n(n-1)}{2}$.', 'هذه ليست الصيغة: استعمل $n!$ أو $\\frac{n(n-1)}{2}$.', 'That is not the formula: use $n!$ or $\\frac{n(n-1)}{2}$.'),
    block: say('Blokea barrutik ere ordenatzen da: biderkatu $2!$-z.', 'El bloque también se ordena por dentro: multiplica por $2!$.', 'الكتلة تُرتَّب من الداخل أيضًا: اضرب في $2!$.', 'The block is also ordered inside: multiply by $2!$.'),
    'no-divide': say('Letra errepikatuen kopiak trukatzeak ez du ordena berririk ematen: zatitu talde bakoitzaren faktorialez.', 'Cambiar copias de una letra repetida no da órdenes nuevos: divide entre el factorial de cada grupo.', 'تبديل نسخ حرف مكرر لا يعطي ترتيبًا جديدًا: اقسم على مضروب كل مجموعة.', 'Swapping copies of a repeated letter does not create new orders: divide by the factorial of each group.'),
    order: say('Taldeetan ordenak ez du axola (edo baldintza ahaztu da): berrikusi eredua.', 'En los grupos no importa el orden (o se ha olvidado la condición): revisa el modelo.', 'في المجموعات لا يهم الترتيب (أو نُسي الشرط): راجع النموذج.', 'Order does not matter inside the groups (or you have forgotten a condition): check the model.'),
    sides: say('Erpin bikote batzuk aldeak dira, ez diagonalak: kendu $n$.', 'Algunas parejas de vértices son lados, no diagonales: resta $n$.', 'بعض أزواج الرؤوس أضلاع لا أقطار: اطرح $n$.', 'Some pairs of vertices are sides, not diagonals: subtract $n$.'),
    double: say('Diagonal bakoitza bi aldiz zenbatu duzu: zatitu 2z.', 'Has contado cada diagonal dos veces: divide entre 2.', 'عددت كل قطر مرتين: اقسم على 2.', 'You have counted each diagonal twice: divide by 2.'),
    mix: say('Mutilak eta neskak bereiz aukeratzen dira: biderkatu bi konbinazioak.', 'Chicos y chicas se eligen por separado: multiplica las dos combinaciones.', 'يُختار الأولاد والبنات منفصلين: اضرب التوفيقين.', 'Boys and girls are chosen separately: multiply the two combinations.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
