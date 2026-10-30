import { checkAnswer, fraction, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readTrigonometryAnswer } from '../answers.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   Trigonometriaren lasterketa (4. DBH akademikoak): five circuits, one per
   stage — the ratios (from three sides, the notable angles, the
   hypotenuse), the fundamental relations (one ratio from another, degrees
   and minutes, the angle from the calculator), right triangles (a side from
   the hypotenuse, elevation, depression, an angle from two legs), heights
   and areas (the double observation, the triangle and the parallelogram)
   and the unit circle (signs, the reduced angle, radians both ways).
   Wrong options are typical mistakes: the ratio upside down, another
   ratio, the complementary angle, the root or the ½ forgotten, the legs
   added, sen + cos = 1, minutes read as hundredths, another calculator
   key, multiplying instead of dividing, one triangle instead of two, x
   given for h, the sign of the wrong quadrant, the wrong reduction, the
   radian conversion upside down. Decimal answers are rounded to hundredths
   and angles to the degree; answers with roots or π are chosen, not
   written. Every question carries `meta`, the numbers of its prompt, so
   the test recomputes the answer. Prompts write \sen and \tg in each
   language's names (text.ts); options carry values only.
   ========================================================================== */

export const TRIGONOMETRY_RACE_CIRCUITS = 5

export type TrigonometryRaceError =
    | 'inverse'
    | 'other-ratio'
    | 'complement'
    | 'no-root'
    | 'sum-sides'
    | 'linear'
    | 'minutes'
    | 'wrong-key'
    | 'divide'
    | 'one-triangle'
    | 'x-not-h'
    | 'no-half'
    | 'half'
    | 'no-sine'
    | 'sign'
    | 'reduce'
    | 'radians'
    | 'calculation'

export type TrigonometryRaceQuestion = RaceQuestion<TrigonometryRaceError> & { meta: Record<string, number> }

const math = (latex: string) => `$${latex}$`
const deg = (degrees: number) => `${degrees}^{\\circ}`
const rad = (degrees: number) => (degrees * Math.PI) / 180
const toDeg = (radians: number) => (radians * 180) / Math.PI
const ROUND = say(' (biribildu ehunenetara)', ' (redondea a las centésimas)', ' (قرّب إلى أقرب جزء من مئة)', ' (round to the nearest hundredth)')
const NEAREST = say(', gradu osora biribilduta?', ', al grado más próximo?', ' مقرّبًا إلى أقرب درجة؟', ', to the nearest degree?')
const join = (first: LocalizedText, second: LocalizedText): LocalizedText => ({ eu: first.eu + second.eu, es: first.es + second.es, en: first.en + second.en, ar: first.ar + second.ar })

/** Right triangles with whole sides: [opposite, adjacent, hypotenuse] */
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [7, 24, 25], [24, 7, 25], [20, 21, 29], [21, 20, 29]]

/* ---------- Writing values ---------- */

/** A fraction in LaTeX, simplified: 3, \frac{8}{17}, -\frac{1}{2} */
export function fractionLatex(value: FractionValue): string {
    if (value.denominator === 1) return String(value.numerator)
    return `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
}

/** A number of hundredths in LaTeX: 1732 → 17{,}32 */
export function hundredthsLatex(hundredths: number): string {
    return (toExactDecimal(fraction(hundredths, 100), ',') ?? String(hundredths / 100)).replace(',', '{,}')
}

/** A real value rounded to hundredths, as an integer */
const toHundredths = (value: number) => Math.round(value * 100)

interface Choice {
    latex: string
    value: number
}

interface Candidate extends Choice {
    error: TrigonometryRaceError
}

const ofFraction = (value: FractionValue): Choice => ({ latex: fractionLatex(value), value: value.numerator / value.denominator })
const ofHundredths = (hundredths: number): Choice => ({ latex: hundredthsLatex(hundredths), value: hundredths / 100 })
const ofWhole = (value: number): Choice => ({ latex: String(value), value })
const wrong = (choice: Choice, error: TrigonometryRaceError): Candidate => ({ ...choice, error })
const nearHundredths = (hundredths: number): Candidate[] => [hundredths + 100, hundredths - 100, hundredths + 10, hundredths - 10].map((value) => wrong(ofHundredths(value), 'calculation'))
const nearWhole = (value: number, step = 1): Candidate[] => [value + step, value - step, value + 2 * step, value - 2 * step].map((item) => wrong(ofWhole(item), 'calculation'))

/** The right option and three mistakes with different values; positive unless negatives are allowed */
function options(random: Random, right: Choice, candidates: Candidate[], allowNegative = false): RaceOption<TrigonometryRaceError>[] | null {
    const picked: Candidate[] = []
    for (const candidate of candidates) {
        if (picked.length === 3) break
        if (!Number.isFinite(candidate.value) || (!allowNegative && candidate.value <= 0)) continue
        if ([right, ...picked].some((other) => other.latex === candidate.latex || Math.abs(other.value - candidate.value) < 1e-9)) continue
        picked.push(candidate)
    }
    if (picked.length < 3) return null
    return shuffle(random, [{ latex: right.latex, correct: true, error: null }, ...picked.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<TrigonometryRaceError>[] | null, answer: FractionValue, writable: boolean, solution: string, meta: Record<string, number>): TrigonometryRaceQuestion | null {
    if (!choices) return null
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable, solution: same(math(solution)), meta }
}

/** An irrational value kept as an approximation: these questions are only chosen, never written */
const approximately = (value: number) => fraction(Math.round(value * 10000), 10000)

/* ---------- The notable values ---------- */

type Ratio = 'sin' | 'cos' | 'tan'
const RATIOS: Ratio[] = ['sin', 'cos', 'tan']
const ratioLatex: Record<Ratio, string> = { sin: '\\sen', cos: '\\cos', tan: '\\tg' }

/** Exact values written in LaTeX, with their numeric value */
const NOTABLE: Record<string, Choice> = {
    half: { latex: '\\frac{1}{2}', value: 0.5 },
    root2: { latex: '\\frac{\\sqrt{2}}{2}', value: Math.SQRT2 / 2 },
    root3: { latex: '\\frac{\\sqrt{3}}{2}', value: Math.sqrt(3) / 2 },
    one: { latex: '1', value: 1 },
    sqrt3: { latex: '\\sqrt{3}', value: Math.sqrt(3) },
    third: { latex: '\\frac{\\sqrt{3}}{3}', value: Math.sqrt(3) / 3 },
    two: { latex: '2', value: 2 },
    sqrt2: { latex: '\\sqrt{2}', value: Math.SQRT2 },
    twoThirds: { latex: '\\frac{2\\sqrt{3}}{3}', value: (2 * Math.sqrt(3)) / 3 }
}
const notableValue: Record<Ratio, Record<30 | 45 | 60, keyof typeof NOTABLE>> = {
    sin: { 30: 'half', 45: 'root2', 60: 'root3' },
    cos: { 30: 'root3', 45: 'root2', 60: 'half' },
    tan: { 30: 'third', 45: 'one', 60: 'sqrt3' }
}
const inverseOf: Record<string, keyof typeof NOTABLE> = { half: 'two', root2: 'sqrt2', root3: 'twoThirds', one: 'one', sqrt3: 'third', third: 'sqrt3' }
const signed = (choice: Choice, sign: number): Choice => (sign > 0 ? choice : { latex: `-${choice.latex}`, value: -choice.value })

/* ---------- Circuit 0: the ratios of an acute angle ---------- */

function ratioQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const [a, b, c] = pick(random, TRIPLES.slice(0, tier === 0 ? 2 : TRIPLES.length))
    const k = tier === 0 ? 1 : randomInt(random, 1, tier === 1 ? 2 : 3)
    const [opposite, adjacent, hypotenuse] = [a * k, b * k, c * k]
    const ask = randomInt(random, 0, 2)
    const ratio = RATIOS[ask]
    const values: Record<Ratio, FractionValue> = { sin: fraction(opposite, hypotenuse), cos: fraction(adjacent, hypotenuse), tan: fraction(opposite, adjacent) }
    const right = values[ratio]
    const others = RATIOS.filter((item) => item !== ratio).map((item) => wrong(ofFraction(values[item]), 'other-ratio'))
    // Tier 2 gives the two legs only: the hypotenuse comes from Pythagoras
    const sides = tier === 2
        ? say(`α angeluaren aurkako katetoa ${math(String(opposite))} da eta ondokoa ${math(String(adjacent))}.`, `El cateto opuesto a α mide ${math(String(opposite))} y el contiguo ${math(String(adjacent))}.`, `الضلع المقابل للزاوية α طوله ${math(String(opposite))} والمجاور ${math(String(adjacent))}.`, `The side opposite α is ${math(String(opposite))} and the adjacent side is ${math(String(adjacent))}.`)
        : say(`α angeluaren aurkako katetoa ${math(String(opposite))} da, ondokoa ${math(String(adjacent))} eta hipotenusa ${math(String(hypotenuse))}.`, `El cateto opuesto a α mide ${math(String(opposite))}, el contiguo ${math(String(adjacent))} y la hipotenusa ${math(String(hypotenuse))}.`, `الضلع المقابل للزاوية α طوله ${math(String(opposite))} والمجاور ${math(String(adjacent))} والوتر ${math(String(hypotenuse))}.`, `The side opposite α is ${math(String(opposite))}, the adjacent side is ${math(String(adjacent))} and the hypotenuse is ${math(String(hypotenuse))}.`)
    const question = say(` Zenbat da ${math(`${ratioLatex[ratio]}\\alpha`)}?`, ` ¿Cuánto vale ${math(`${ratioLatex[ratio]}\\alpha`)}?`, ` كم تساوي ${math(`${ratioLatex[ratio]}\\alpha`)}؟`, ` What is ${math(`${ratioLatex[ratio]}\\alpha`)}?`)
    const top = ratio === 'cos' ? adjacent : opposite
    const bottom = ratio === 'tan' ? adjacent : hypotenuse
    return build(0, 'ratio', join(sides, question), options(random, ofFraction(right), [
        wrong(ofFraction(fraction(bottom, top)), 'inverse'),
        ...others,
        wrong(ofFraction(fraction(adjacent, opposite)), 'inverse')
    ]), right, true, `${ratioLatex[ratio]}\\alpha=\\frac{${top}}{${bottom}}=${fractionLatex(right)}`, { opposite, adjacent, hypotenuse, ask })
}

function notableQuestion(random: Random): TrigonometryRaceQuestion | null {
    const angle = pick(random, [30, 45, 60] as const)
    const ratio = pick(random, RATIOS)
    const key = notableValue[ratio][angle]
    const right = NOTABLE[key]
    const complement = NOTABLE[notableValue[ratio][(90 - angle) as 30 | 45 | 60]]
    const fillers = Object.values(NOTABLE).filter((item) => item.value <= 2).map((item) => wrong(item, 'calculation'))
    return build(0, 'notable', say(`Zenbat da ${math(`${ratioLatex[ratio]} ${deg(angle)}`)}?`, `¿Cuánto vale ${math(`${ratioLatex[ratio]} ${deg(angle)}`)}?`, `كم تساوي ${math(`${ratioLatex[ratio]} ${deg(angle)}`)}؟`, `What is ${math(`${ratioLatex[ratio]} ${deg(angle)}`)}?`), options(random, right, [
        wrong(complement, 'complement'),
        wrong(NOTABLE[inverseOf[key]], 'inverse'),
        ...shuffle(random, fillers)
    ]), approximately(right.value), false, `${ratioLatex[ratio]} ${deg(angle)}=${right.latex}`, { angle, ask: RATIOS.indexOf(ratio) })
}

function hypotenuseQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const [a, b, c] = pick(random, TRIPLES)
    const k = randomInt(random, 1, tier === 0 ? 1 : 3)
    const [p, q, h] = [a * k, b * k, c * k]
    return build(0, 'hypotenuse', say(
        `Triangelu angeluzuzen baten katetoak ${math(String(p))} eta ${math(String(q))} dira. Zenbat da hipotenusa?`,
        `Los catetos de un triángulo rectángulo miden ${math(String(p))} y ${math(String(q))}. ¿Cuánto mide la hipotenusa?`,
        `ضلعا مثلث قائم ${math(String(p))} و${math(String(q))}. كم طول الوتر؟`, `The legs of a right-angled triangle measure ${math(String(p))} and ${math(String(q))}. How long is the hypotenuse?`
    ), options(random, ofWhole(h), [wrong(ofWhole(p + q), 'sum-sides'), wrong(ofWhole(p * p + q * q), 'no-root'), ...nearWhole(h)]), fraction(h), true, `\\sqrt{${p}^{2}+${q}^{2}}=\\sqrt{${p * p + q * q}}=${h}`, { a: p, b: q })
}

/* ---------- Circuit 1: the fundamental relations and the calculator ---------- */

function oneRatioQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const [a, b, c] = pick(random, TRIPLES)
    // Given the sine, ask the cosine (tier 0) or the tangent too
    const ask = tier === 0 ? 1 : pick(random, [1, 2])
    const right = ask === 1 ? fraction(b, c) : fraction(a, b)
    return build(1, 'one-ratio', say(
        `α zorrotza da eta ${math(`\\sen\\alpha=\\frac{${a}}{${c}}`)}. Zenbat da ${math(`${ask === 1 ? '\\cos' : '\\tg'}\\alpha`)}?`,
        `α es agudo y ${math(`\\sen\\alpha=\\frac{${a}}{${c}}`)}. ¿Cuánto vale ${math(`${ask === 1 ? '\\cos' : '\\tg'}\\alpha`)}?`,
        `α حادة و${math(`\\sen\\alpha=\\frac{${a}}{${c}}`)}. كم تساوي ${math(`${ask === 1 ? '\\cos' : '\\tg'}\\alpha`)}؟`, `α is acute and ${math(`\\sin\\alpha=\\frac{${a}}{${c}}`)}. What is ${math(`${ask === 1 ? '\\cos' : '\\tan'}\\alpha`)}?`
    ), options(random, ofFraction(right), [
        wrong(ofFraction(fraction(c - a, c)), 'linear'),
        wrong(ofFraction(ask === 1 ? fraction(c, b) : fraction(b, a)), 'inverse'),
        wrong(ofFraction(ask === 1 ? fraction(a, b) : fraction(b, c)), 'other-ratio'),
        wrong(ofFraction(ask === 1 ? fraction(a, c) : fraction(a, c)), 'other-ratio')
    ]), right, true, ask === 1 ? `\\cos\\alpha=\\sqrt{1-\\frac{${a * a}}{${c * c}}}=${fractionLatex(right)}` : `\\cos\\alpha=\\frac{${b}}{${c}}\\ \\to\\ \\tg\\alpha=\\frac{${a}}{${b}}`, { a, b, c, ask })
}

const MINUTE_STEPS = [6, 12, 15, 18, 24, 30, 36, 42, 45, 48, 54]

function minutesQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const degrees = randomInt(random, 1, 89)
    const minutes = pick(random, tier === 0 ? [15, 30, 45] : MINUTE_STEPS)
    const hundredths = degrees * 100 + (minutes * 100) / 60
    const direction = randomInt(random, 0, 1)
    if (direction === 0) {
        return build(1, 'to-decimal', say(
            `Idatzi ${math(`${deg(degrees)}\\,${minutes}'`)} gradutan, hamartarrekin.`,
            `Escribe ${math(`${deg(degrees)}\\,${minutes}'`)} en grados con decimales.`,
            `اكتب ${math(`${deg(degrees)}\\,${minutes}'`)} بالدرجات العشرية.`, `Write ${math(`${deg(degrees)}\\,${minutes}'`)} in decimal degrees.`
        ), options(random, ofHundredths(hundredths), [wrong(ofHundredths(degrees * 100 + minutes), 'minutes'), ...nearHundredths(hundredths)]), fraction(hundredths, 100), true, `${degrees}+\\frac{${minutes}}{60}=${hundredthsLatex(hundredths)}^{\\circ}`, { degrees, minutes, direction })
    }
    const decimals = hundredths - degrees * 100
    return build(1, 'to-minutes', say(
        `${math(`${hundredthsLatex(hundredths)}^{\\circ}=${deg(degrees)}\\,?'`)} Zenbat minutu?`,
        `${math(`${hundredthsLatex(hundredths)}^{\\circ}=${deg(degrees)}\\,?'`)} ¿Cuántos minutos?`,
        `${math(`${hundredthsLatex(hundredths)}^{\\circ}=${deg(degrees)}\\,?'`)} كم دقيقة؟`, `${math(`${hundredthsLatex(hundredths)}^{\\circ}=${deg(degrees)}\\,?'`)} How many minutes?`
    ), options(random, ofWhole(minutes), [wrong(ofWhole(decimals), 'minutes'), wrong(ofWhole(decimals % 10 === 0 ? decimals / 10 : minutes + 10), decimals % 10 === 0 ? 'minutes' : 'calculation'), ...nearWhole(minutes, 6)]), fraction(minutes), true, `0{,}${String(decimals).padStart(2, '0')}\\cdot 60=${minutes}'`, { degrees, minutes, direction })
}

/** Ratios that the calculator turns into an angle, with one or two decimals */
const CALCULATOR_VALUES = [0.1, 0.2, 0.25, 0.3, 0.4, 0.45, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9]

function calculatorQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const ask = randomInt(random, 0, tier === 0 ? 0 : 2)
    const x = tier === 2 && ask === 2 ? pick(random, [1.2, 1.5, 2, 2.5, 3]) : pick(random, CALCULATOR_VALUES)
    const angles = [toDeg(Math.asin(x)), toDeg(Math.acos(x)), toDeg(Math.atan(x))]
    const right = Math.round(angles[ask])
    const others = angles.filter((_, index) => index !== ask).map((value) => wrong(ofWhole(Math.round(value)), 'wrong-key'))
    const key = ['sin', 'cos', 'tan'][ask]
    const xLatex = hundredthsLatex(Math.round(x * 100))
    return build(1, 'calculator', join(say(
        `Kalkulagailuarekin: ${math(`${ratioLatex[RATIOS[ask]]}\\alpha=${xLatex}`)}. Zenbat da α`,
        `Con la calculadora: ${math(`${ratioLatex[RATIOS[ask]]}\\alpha=${xLatex}`)}. ¿Cuánto mide α`,
        `بالآلة الحاسبة: ${math(`${ratioLatex[RATIOS[ask]]}\\alpha=${xLatex}`)}. كم قياس α`, `With the calculator: ${math(`${ratioLatex[RATIOS[ask]]}\\alpha=${xLatex}`)}. What is the size of α`
    ), NEAREST), options(random, ofWhole(right), [...others, wrong(ofWhole(90 - right), 'complement'), ...nearWhole(right)]), fraction(right), true, `\\text{SHIFT ${key} } ${xLatex}\\approx ${hundredthsLatex(Math.round(angles[ask] * 100))}^{\\circ}\\approx ${deg(right)}`, { x100: Math.round(x * 100), ask })
}

/* ---------- Circuit 2: right triangles ---------- */

function sideQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const h = randomInt(random, 4, tier === 0 ? 10 : 20)
    const angle = randomInt(random, 2, 14) * 5
    const ask = randomInt(random, 0, 1)
    const value = ask === 0 ? h * Math.sin(rad(angle)) : h * Math.cos(rad(angle))
    const right = toHundredths(value)
    const side = ask === 0 ? say('aurkako', 'opuesto', 'المقابل', 'opposite') : say('ondoko', 'contiguo', 'المجاور', 'adjacent')
    return build(2, 'side', join(say(
        `Triangelu angeluzuzen baten hipotenusa ${math(String(h))} da eta angelu zorrotzetako bat ${math(deg(angle))}. Zenbat da angelu horren ${side.eu} katetoa?`,
        `La hipotenusa de un triángulo rectángulo mide ${math(String(h))} y uno de sus ángulos agudos ${math(deg(angle))}. ¿Cuánto mide el cateto ${side.es} a ese ángulo?`,
        `وتر مثلث قائم ${math(String(h))} وإحدى زاويتيه الحادتين ${math(deg(angle))}. كم طول الضلع ${side.ar} لهذه الزاوية؟`, `The hypotenuse of a right-angled triangle is ${math(String(h))} and one of its acute angles is ${math(deg(angle))}. How long is the ${side.en} side relative to that angle?`
    ), ROUND), options(random, ofHundredths(right), [
        wrong(ofHundredths(toHundredths(ask === 0 ? h * Math.cos(rad(angle)) : h * Math.sin(rad(angle)))), 'other-ratio'),
        wrong(ofHundredths(toHundredths(ask === 0 ? h / Math.sin(rad(angle)) : h / Math.cos(rad(angle)))), 'divide'),
        wrong(ofHundredths(toHundredths(h * Math.tan(rad(angle)))), 'other-ratio'),
        ...nearHundredths(right)
    ]), fraction(right, 100), true, `${h}\\cdot${ask === 0 ? '\\sen' : '\\cos'} ${deg(angle)}\\approx ${hundredthsLatex(right)}`, { h, angle, ask })
}

function elevationQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const d = randomInt(random, 2, tier === 0 ? 6 : 12) * 5
    const angle = randomInt(random, 3, 15) * 5
    const right = toHundredths(d * Math.tan(rad(angle)))
    return build(2, 'elevation', join(say(
        `Zuhaitz baten oinetik ${math(String(d))} metrora gaude, eta gailurra ikusteko goratze-angelua ${math(deg(angle))} da. Zenbat neurtzen du zuhaitzak?`,
        `Desde ${math(String(d))} m del pie de un árbol se ve la copa con un ángulo de elevación de ${math(deg(angle))}. ¿Cuánto mide el árbol?`,
        `من مسافة ${math(String(d))} م من قاعدة شجرة تُرى قمتها بزاوية ارتفاع ${math(deg(angle))}. كم ارتفاع الشجرة؟`, `From a point ${math(String(d))} m from the foot of a tree, the top is seen at an angle of elevation of ${math(deg(angle))}. How tall is the tree?`
    ), ROUND), options(random, ofHundredths(right), [
        wrong(ofHundredths(toHundredths(d / Math.tan(rad(angle)))), 'divide'),
        wrong(ofHundredths(toHundredths(d * Math.sin(rad(angle)))), 'other-ratio'),
        wrong(ofHundredths(toHundredths(d * Math.cos(rad(angle)))), 'other-ratio'),
        ...nearHundredths(right)
    ]), fraction(right, 100), true, `h=${d}\\cdot\\tg ${deg(angle)}\\approx ${hundredthsLatex(right)}`, { d, angle })
}

function depressionQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const h = randomInt(random, 2, tier === 0 ? 6 : 12) * 5
    const angle = randomInt(random, 3, 15) * 5
    const right = toHundredths(h / Math.tan(rad(angle)))
    return build(2, 'depression', join(say(
        `${math(String(h))} metroko itsasargi baten goialdetik txalupa bat ikusten da, eta beheratze-angelua ${math(deg(angle))} da. Zer distantziatara dago txalupa itsasargiaren oinetik?`,
        `Desde lo alto de un faro de ${math(String(h))} m se ve un barco con un ángulo de depresión de ${math(deg(angle))}. ¿A qué distancia del pie del faro está el barco?`,
        `من قمة منارة ارتفاعها ${math(String(h))} م يُرى قارب بزاوية انخفاض ${math(deg(angle))}. كم يبعد القارب عن قاعدة المنارة؟`, `From the top of a ${math(String(h))} m lighthouse, a boat is seen at an angle of depression of ${math(deg(angle))}. How far is the boat from the foot of the lighthouse?`
    ), ROUND), options(random, ofHundredths(right), [
        wrong(ofHundredths(toHundredths(h * Math.tan(rad(angle)))), 'divide'),
        wrong(ofHundredths(toHundredths(h / Math.sin(rad(angle)))), 'other-ratio'),
        wrong(ofHundredths(toHundredths(h * Math.cos(rad(angle)))), 'other-ratio'),
        ...nearHundredths(right)
    ]), fraction(right, 100), true, `d=\\frac{${h}}{\\tg ${deg(angle)}}\\approx ${hundredthsLatex(right)}`, { h, angle })
}

function angleQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const [a, b] = pick(random, TRIPLES)
    const k = randomInt(random, 1, tier === 0 ? 1 : 2)
    const [p, q] = [a * k, b * k]
    const exact = toDeg(Math.atan(p / q))
    const right = Math.round(exact)
    return build(2, 'angle', join(say(
        `Triangelu angeluzuzen baten katetoak ${math(String(p))} eta ${math(String(q))} dira. Zenbat da ${math(String(p))} katetoaren aurkako angelua`,
        `Los catetos de un triángulo rectángulo miden ${math(String(p))} y ${math(String(q))}. ¿Cuánto mide el ángulo opuesto al cateto ${math(String(p))}`,
        `ضلعا مثلث قائم ${math(String(p))} و${math(String(q))}. كم قياس الزاوية المقابلة للضلع ${math(String(p))}`, `The legs of a right-angled triangle measure ${math(String(p))} and ${math(String(q))}. What is the angle opposite the ${math(String(p))} leg`
    ), NEAREST), options(random, ofWhole(right), [
        wrong(ofWhole(90 - right), 'complement'),
        ...(p < q ? [wrong(ofWhole(Math.round(toDeg(Math.asin(p / q)))), 'wrong-key')] : []),
        ...nearWhole(right)
    ]), fraction(right), true, `\\tg\\alpha=\\frac{${p}}{${q}}\\ \\to\\ \\alpha\\approx ${hundredthsLatex(Math.round(exact * 100))}^{\\circ}\\approx ${deg(right)}`, { p, q })
}

/* ---------- Circuit 3: heights and areas ---------- */

const DOUBLE_PAIRS: Array<[number, number]> = [[30, 60], [30, 45], [45, 60], [20, 40], [25, 50], [35, 55], [40, 70], [15, 30]]

/** x from the near point to the foot, and the height h */
export function doubleObservation(d: number, far: number, near: number): { x: number; h: number } {
    const x = (d * Math.tan(rad(far))) / (Math.tan(rad(near)) - Math.tan(rad(far)))
    return { x, h: x * Math.tan(rad(near)) }
}

function doubleQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const [far, near] = pick(random, DOUBLE_PAIRS.slice(0, tier === 0 ? 3 : DOUBLE_PAIRS.length))
    const d = randomInt(random, 1, 6) * 10
    const { x, h } = doubleObservation(d, far, near)
    const right = toHundredths(h)
    return build(3, 'double', join(say(
        `Puntu batetik dorrearen goialdea ikusteko angelua ${math(deg(far))} da; ${math(String(d))} metro hurbildu ondoren, ${math(deg(near))}. Zenbat neurtzen du dorreak?`,
        `Desde un punto se ve lo alto de una torre con un ángulo de ${math(deg(far))}; al acercarse ${math(String(d))} m, con ${math(deg(near))}. ¿Cuánto mide la torre?`,
        `من نقطة تُرى قمة برج بزاوية ${math(deg(far))}؛ وبعد الاقتراب ${math(String(d))} م تصير ${math(deg(near))}. كم ارتفاع البرج؟`, `From a point, the top of a tower is seen at an angle of ${math(deg(far))}; after moving ${math(String(d))} m closer, the angle is ${math(deg(near))}. How tall is the tower?`
    ), ROUND), options(random, ofHundredths(right), [
        wrong(ofHundredths(toHundredths(x)), 'x-not-h'),
        wrong(ofHundredths(toHundredths(d * Math.tan(rad(near)))), 'one-triangle'),
        wrong(ofHundredths(toHundredths(d * Math.tan(rad(far)))), 'one-triangle'),
        ...nearHundredths(right)
    ]), fraction(right, 100), true, `h=x\\cdot\\tg ${deg(near)}=(${d}+x)\\cdot\\tg ${deg(far)}\\ \\to\\ h\\approx ${hundredthsLatex(right)}`, { d, far, near })
}

const AREA_ANGLES = [30, 45, 60, 90, 120, 135, 150]

function triangleAreaQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const b = randomInt(random, 2, 12)
    const c = randomInt(random, 2, 12)
    const angle = tier === 0 ? pick(random, [30, 90, 150]) : tier === 1 ? pick(random, AREA_ANGLES) : randomInt(random, 2, 16) * 10
    const right = toHundredths((b * c * Math.sin(rad(angle))) / 2)
    return build(3, 'triangle-area', join(say(
        `Triangelu baten bi aldeak ${math(String(b))} eta ${math(String(c))} dira, eta haien arteko angelua ${math(deg(angle))}. Zein da haren azalera?`,
        `Un triángulo tiene dos lados de ${math(String(b))} y ${math(String(c))} que forman un ángulo de ${math(deg(angle))}. ¿Cuál es su área?`,
        `ضلعان في مثلث طولاهما ${math(String(b))} و${math(String(c))} والزاوية بينهما ${math(deg(angle))}. ما مساحته؟`, `A triangle has two sides of ${math(String(b))} and ${math(String(c))} that form an angle of ${math(deg(angle))}. What is its area?`
    ), ROUND), options(random, ofHundredths(right), [
        wrong(ofHundredths(toHundredths(b * c * Math.sin(rad(angle)))), 'no-half'),
        wrong(ofHundredths(toHundredths((b * c) / 2)), 'no-sine'),
        wrong(ofHundredths(toHundredths((b * c * Math.cos(rad(angle))) / 2)), 'other-ratio'),
        ...nearHundredths(right)
    ]), fraction(right, 100), true, `S=\\frac{1}{2}\\cdot ${b}\\cdot ${c}\\cdot\\sen ${deg(angle)}\\approx ${hundredthsLatex(right)}`, { b, c, angle })
}

function parallelogramQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const a = randomInt(random, 2, 12)
    const b = randomInt(random, 2, 12)
    const angle = tier === 0 ? pick(random, [30, 60, 45]) : randomInt(random, 2, 8) * 10
    const right = toHundredths(a * b * Math.sin(rad(angle)))
    return build(3, 'parallelogram', join(say(
        `Paralelogramo baten aldeak ${math(String(a))} eta ${math(String(b))} dira eta angelu bat ${math(deg(angle))}. Zein da haren azalera?`,
        `Un paralelogramo tiene lados de ${math(String(a))} y ${math(String(b))} y un ángulo de ${math(deg(angle))}. ¿Cuál es su área?`,
        `متوازي أضلاع ضلعاه ${math(String(a))} و${math(String(b))} وإحدى زواياه ${math(deg(angle))}. ما مساحته؟`, `A parallelogram has sides of ${math(String(a))} and ${math(String(b))} and an angle of ${math(deg(angle))}. What is its area?`
    ), ROUND), options(random, ofHundredths(right), [
        wrong(ofHundredths(toHundredths((a * b * Math.sin(rad(angle))) / 2)), 'half'),
        wrong(ofHundredths(a * b * 100), 'no-sine'),
        wrong(ofHundredths(toHundredths(a * b * Math.cos(rad(angle)))), 'other-ratio'),
        ...nearHundredths(right)
    ]), fraction(right, 100), true, `S=${a}\\cdot ${b}\\cdot\\sen ${deg(angle)}\\approx ${hundredthsLatex(right)}`, { a, b, angle })
}

/* ---------- Circuit 4: the unit circle ---------- */

const QUADRANT_ANGLES = [120, 135, 150, 210, 225, 240, 300, 315, 330]

/** The first-quadrant angle with the same absolute values */
export function reduced(angle: number): number {
    if (angle <= 90) return angle
    if (angle <= 180) return 180 - angle
    if (angle <= 270) return angle - 180
    return 360 - angle
}

function signQuestion(random: Random): TrigonometryRaceQuestion | null {
    const angle = pick(random, QUADRANT_ANGLES)
    const ratio = pick(random, RATIOS)
    const base = reduced(angle) as 30 | 45 | 60
    const sign = Math.sign(ratio === 'sin' ? Math.sin(rad(angle)) : ratio === 'cos' ? Math.cos(rad(angle)) : Math.tan(rad(angle)))
    const value = NOTABLE[notableValue[ratio][base]]
    const right = signed(value, sign)
    const complement = NOTABLE[notableValue[ratio][(90 - base) as 30 | 45 | 60]]
    const fillers = [NOTABLE.half, NOTABLE.root2, NOTABLE.root3, NOTABLE.one, NOTABLE.sqrt3, NOTABLE.third].flatMap((item) => [wrong(signed(item, sign), 'calculation'), wrong(signed(item, -sign), 'sign')])
    return build(4, 'sign', say(`Zenbat da ${math(`${ratioLatex[ratio]} ${deg(angle)}`)}?`, `¿Cuánto vale ${math(`${ratioLatex[ratio]} ${deg(angle)}`)}?`, `كم تساوي ${math(`${ratioLatex[ratio]} ${deg(angle)}`)}؟`, `What is ${math(`${ratioLatex[ratio]} ${deg(angle)}`)}?`), options(random, right, [
        wrong(signed(value, -sign), 'sign'),
        wrong(signed(complement, sign), 'complement'),
        wrong(signed(complement, -sign), 'sign'),
        ...shuffle(random, fillers)
    ], true), approximately(right.value), false, `${ratioLatex[ratio]} ${deg(angle)}=${sign < 0 ? '-' : ''}${ratioLatex[ratio]} ${deg(base)}=${right.latex}`, { angle, ask: RATIOS.indexOf(ratio) })
}

function reduceQuestion(random: Random, tier: Tier): TrigonometryRaceQuestion | null {
    const angle = tier === 0 ? pick(random, QUADRANT_ANGLES) : randomInt(random, 19, 71) * 5
    if (angle % 90 === 0) return null
    const right = reduced(angle)
    const wrongReductions = [Math.abs(180 - angle), angle - 90, 360 - angle, angle - 180].filter((value) => value > 0 && value < 90 && value !== right)
    return build(4, 'reduce', say(
        `Lehen koadranteko zein angeluk ditu ${math(deg(angle))} angeluaren arrazoi berak, zeinua izan ezik?`,
        `¿Qué ángulo del primer cuadrante tiene las mismas razones que ${math(deg(angle))}, salvo el signo?`,
        `أي زاوية في الربع الأول لها نسب الزاوية ${math(deg(angle))} نفسها ما عدا الإشارة؟`, `Which first-quadrant angle has the same trigonometric ratios as ${math(deg(angle))}, apart from the sign?`
    ), options(random, ofWhole(right), [
        ...wrongReductions.map((value) => wrong(ofWhole(value), 'reduce')),
        wrong(ofWhole(90 - right), 'complement'),
        ...nearWhole(right, 5)
    ]), fraction(right), true, `${deg(angle)}\\ \\to\\ ${deg(right)}`, { angle })
}

/** k·π in LaTeX from a fraction of π */
export function piLatex(value: FractionValue): string {
    const top = value.numerator === 1 ? '\\pi' : `${value.numerator}\\pi`
    return value.denominator === 1 ? top : `\\frac{${top}}{${value.denominator}}`
}
const ofPi = (value: FractionValue): Choice => ({ latex: piLatex(value), value: (value.numerator / value.denominator) * Math.PI })

const RADIAN_DEGREES = [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360]

function toRadiansQuestion(random: Random): TrigonometryRaceQuestion | null {
    const degrees = pick(random, RADIAN_DEGREES)
    const right = fraction(degrees, 180)
    return build(4, 'to-radians', say(`Pasatu ${math(deg(degrees))} radianetara.`, `Pasa ${math(deg(degrees))} a radianes.`, `حوّل ${math(deg(degrees))} إلى الراديان.`, `Convert ${math(deg(degrees))} to radians.`), options(random, ofPi(right), [
        wrong(ofPi(fraction(180, degrees)), 'radians'),
        wrong(ofPi(fraction(degrees, 360)), 'radians'),
        wrong(ofPi(fraction(degrees, 90)), 'radians'),
        ...[fraction(degrees + 30, 180), fraction(Math.max(15, degrees - 30), 180)].map((value) => wrong(ofPi(value), 'calculation'))
    ]), approximately((degrees * Math.PI) / 180), false, `${degrees}\\cdot\\frac{\\pi}{180}=${piLatex(right)}`, { degrees })
}

function toDegreesQuestion(random: Random): TrigonometryRaceQuestion | null {
    const degrees = pick(random, RADIAN_DEGREES)
    const value = fraction(degrees, 180)
    return build(4, 'to-degrees', say(`Pasatu ${math(`${piLatex(value)}\\ \\text{rad}`)} gradutara.`, `Pasa ${math(`${piLatex(value)}\\ \\text{rad}`)} a grados.`, `حوّل ${math(`${piLatex(value)}\\ \\text{rad}`)} إلى الدرجات.`, `Convert ${math(`${piLatex(value)}\\ \\text{rad}`)} to degrees.`), options(random, ofWhole(degrees), [
        wrong(ofWhole(2 * degrees), 'radians'),
        wrong(ofWhole(degrees / 2), 'radians'),
        ...nearWhole(degrees, 15)
    ]), fraction(degrees), true, `${piLatex(value)}\\cdot\\frac{180^{\\circ}}{\\pi}=${deg(degrees)}`, { degrees })
}

/* ---------- Circuits ---------- */

type Generator = (random: Random, tier: Tier) => TrigonometryRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [ratioQuestion, notableQuestion, hypotenuseQuestion, ratioQuestion],
    [oneRatioQuestion, minutesQuestion, calculatorQuestion],
    [sideQuestion, elevationQuestion, depressionQuestion, angleQuestion],
    [doubleQuestion, triangleAreaQuestion, parallelogramQuestion],
    [signQuestion, reduceQuestion, toRadiansQuestion, toDegreesQuestion]
]

export function generateTrigonometryRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): TrigonometryRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkTrigonometryPitAnswer(question: RaceQuestion<TrigonometryRaceError>, input: string): AnswerCheck {
    return checkAnswer(readTrigonometryAnswer(input), question.answer as FractionValue, question.answerForm)
}

export function trigonometryParTime(circuit: number): number {
    return parTimeFor([12, 13, 15, 16, 11][circuit] ?? 13)
}

export const trigonometryRaceErrorTips: Record<TrigonometryRaceError, LocalizedText> = {
    inverse: say('Arrazoia alderantziz eman duzu: zenbakitzailea eta izendatzailea trukatuta daude.', 'Has dado la razón al revés: el numerador y el denominador están cambiados.', 'أعطيت النسبة مقلوبة: البسط والمقام متبادلان.', 'You have given the ratio the wrong way round: the numerator and the denominator are swapped.'),
    'other-ratio': say('Hori beste arrazoi bat da. Sinua: aurkakoa / hipotenusa; kosinua: ondokoa / hipotenusa; tangentea: aurkakoa / ondokoa.', 'Esa es otra razón. Seno: opuesto / hipotenusa; coseno: contiguo / hipotenusa; tangente: opuesto / contiguo.', 'هذه نسبة أخرى. الجيب: المقابل / الوتر؛ جيب التمام: المجاور / الوتر؛ الظل: المقابل / المجاور.', 'That is a different ratio. Sine: opposite / hypotenuse; cosine: adjacent / hypotenuse; tangent: opposite / adjacent.'),
    complement: say('Hori angelu osagarriarena da ($90^{\\circ}-\\alpha$): sinua eta kosinua trukatzen dira.', 'Ese es el del ángulo complementario ($90^{\\circ}-\\alpha$): seno y coseno se intercambian.', 'هذه قيمة الزاوية المتممة ($90^{\\circ}-\\alpha$): يتبادل الجيب وجيب التمام.', 'That is the one for the complementary angle ($90^{\\circ}-\\alpha$): sine and cosine swap.'),
    'no-root': say('Hori hipotenusaren karratua da: erro karratua falta da.', 'Eso es el cuadrado de la hipotenusa: falta la raíz cuadrada.', 'هذا مربع الوتر: ينقص الجذر التربيعي.', 'That is the square of the hypotenuse: you still need to take the square root.'),
    'sum-sides': say('Katetoak ez dira batzen: $c^{2}=a^{2}+b^{2}$.', 'Los catetos no se suman: $c^{2}=a^{2}+b^{2}$.', 'لا يُجمع الضلعان القائمان: $c^{2}=a^{2}+b^{2}$.', 'You do not just add the legs: $c^{2}=a^{2}+b^{2}$.'),
    linear: say('$\\sen\\alpha+\\cos\\alpha$ ez da 1: $\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ da.', '$\\sen\\alpha+\\cos\\alpha$ no vale 1: lo que vale 1 es $\\sen^{2}\\alpha+\\cos^{2}\\alpha$.', '$\\sen\\alpha+\\cos\\alpha$ لا يساوي 1: الذي يساوي 1 هو $\\sen^{2}\\alpha+\\cos^{2}\\alpha$.', '$\\sin\\alpha+\\cos\\alpha$ does not equal 1: what equals 1 is $\\sin^{2}\\alpha+\\cos^{2}\\alpha$.'),
    minutes: say('Minutuak hirurogeitarrak dira: $0{,}5^{\\circ}=30\'$, ez $50\'$.', 'Los minutos son sexagesimales: $0{,}5^{\\circ}=30\'$, no $50\'$.', 'الدقائق ستينية: $0{,}5^{\\circ}=30\'$ لا $50\'$.', 'Minutes are sexagesimal: $0{,}5^{\\circ}=30\'$, not $50\'$.'),
    'wrong-key': say('Hori beste tekla bat da: sinuarekin SHIFT sin, kosinuarekin SHIFT cos eta tangentearekin SHIFT tan.', 'Esa es otra tecla: con el seno, SHIFT sin; con el coseno, SHIFT cos; con la tangente, SHIFT tan.', 'هذا مفتاح آخر: مع الجيب SHIFT sin، ومع جيب التمام SHIFT cos، ومع الظل SHIFT tan.', 'That is a different key: for sine, SHIFT sin; for cosine, SHIFT cos; for tangent, SHIFT tan.'),
    divide: say('Ezezaguna zenbakitzailean badago, biderkatu; izendatzailean badago, zatitu.', 'Si la incógnita está en el numerador, multiplica; si está en el denominador, divide.', 'إذا كان المجهول في البسط فاضرب، وإذا كان في المقام فاقسم.', 'If the unknown is in the numerator, multiply; if it is in the denominator, divide.'),
    'one-triangle': say('Triangelu bakarrarekin ez da nahikoa: oinerako x distantzia falta da. Idatzi bi ekuazioak.', 'Con un solo triángulo no basta: falta la distancia x hasta el pie. Plantea las dos ecuaciones.', 'لا يكفي مثلث واحد: تنقص المسافة x إلى القاعدة. اكتب المعادلتين.', 'One triangle is not enough: the distance x to the foot is missing. Set up the two equations.'),
    'x-not-h': say('Hori oinerako x distantzia da, ez altuera: $h=x\\cdot\\tg\\beta$.', 'Eso es la distancia x hasta el pie, no la altura: $h=x\\cdot\\tg\\beta$.', 'هذه المسافة x إلى القاعدة لا الارتفاع: $h=x\\cdot\\tg\\beta$.', 'That is the distance x to the foot, not the height: $h=x\\cdot\\tan\\beta$.'),
    'no-half': say('Triangeluan ½ falta da: $S=\\frac{1}{2}\\cdot b\\cdot c\\cdot\\sen A$.', 'En el triángulo falta el ½: $S=\\frac{1}{2}\\cdot b\\cdot c\\cdot\\sen A$.', 'ينقص ½ في المثلث: $S=\\frac{1}{2}\\cdot b\\cdot c\\cdot\\sen A$.', 'You are missing the ½ in the triangle formula: $S=\\frac{1}{2}\\cdot b\\cdot c\\cdot\\sin A$.'),
    half: say('Paralelogramoa bi triangelu dira, beraz ez darama ½: $S=a\\cdot b\\cdot\\sen\\alpha$.', 'Un paralelogramo son dos triángulos, así que no lleva ½: $S=a\\cdot b\\cdot\\sen\\alpha$.', 'متوازي الأضلاع مثلثان، فلا يوجد ½: $S=a\\cdot b\\cdot\\sen\\alpha$.', 'A parallelogram is two triangles, so there is no ½ in the formula: $S=a\\cdot b\\cdot\\sin\\alpha$.'),
    'no-sine': say('Bi aldeak ez dira oinarria eta altuera: altuera $c\\cdot\\sen A$ da.', 'Los dos lados no son base y altura: la altura es $c\\cdot\\sen A$.', 'الضلعان ليسا قاعدة وارتفاعًا: الارتفاع $c\\cdot\\sen A$.', 'The two sides are not the base and height: the height is $c\\cdot\\sin A$.'),
    sign: say('Begiratu koadranteari: I, dena +; II, sinua +; III, tangentea +; IV, kosinua +.', 'Mira el cuadrante: I, todo +; II, seno +; III, tangente +; IV, coseno +.', 'انظر إلى الربع: الأول الكل +؛ الثاني الجيب +؛ الثالث الظل +؛ الرابع جيب التمام +.', 'Look at the quadrant: I, all +; II, sine +; III, tangent +; IV, cosine +.'),
    reduce: say('II. koadrantean, $180^{\\circ}-\\alpha$; III. koadrantean, $\\alpha-180^{\\circ}$; IV. koadrantean, $360^{\\circ}-\\alpha$.', 'En el II cuadrante, $180^{\\circ}-\\alpha$; en el III, $\\alpha-180^{\\circ}$; en el IV, $360^{\\circ}-\\alpha$.', 'في الربع الثاني $180^{\\circ}-\\alpha$، وفي الثالث $\\alpha-180^{\\circ}$، وفي الرابع $360^{\\circ}-\\alpha$.', 'In the second quadrant, $180^{\\circ}-\\alpha$; in the third, $\\alpha-180^{\\circ}$; in the fourth, $360^{\\circ}-\\alpha$.'),
    radians: say('$180^{\\circ}=\\pi$ rad: radianetara, bider $\\frac{\\pi}{180}$; gradutara, bider $\\frac{180}{\\pi}$.', '$180^{\\circ}=\\pi$ rad: a radianes, por $\\frac{\\pi}{180}$; a grados, por $\\frac{180}{\\pi}$.', '$180^{\\circ}=\\pi$ rad: إلى الراديان في $\\frac{\\pi}{180}$، وإلى الدرجات في $\\frac{180}{\\pi}$.', '$180^{\\circ}=\\pi$ rad: to radians, multiply by $\\frac{\\pi}{180}$; to degrees, multiply by $\\frac{180}{\\pi}$.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
