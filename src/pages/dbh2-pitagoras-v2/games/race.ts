import { checkAnswer, fraction, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readFiguresAnswer } from '../../dbh1-figurak-v2/answers.ts'

/* ==========================================================================
   Pitagorasen lasterketa (2. DBH): five circuits — the theorem, finding
   sides, plane figures, the circle, and space and problems. Every length
   comes from a Pythagorean triple (sometimes halved), so every answer is
   exact. Every wrong option is a typical mistake: adding the sides instead
   of their squares, forgetting the root, adding when a leg needs a
   subtraction, using the whole base or chord instead of half, giving half
   the chord, stopping at the diagonal of the base… Prompts never put a
   Basque suffix after a generated number.
   ========================================================================== */

export const PYTHAGORAS_RACE_CIRCUITS = 5

export type PythagorasRaceError =
    | 'added-sides'
    | 'no-root'
    | 'wrong-operation'
    | 'no-half'
    | 'no-double'
    | 'base-only'
    | 'calculation'

export type PythagorasRaceQuestion = RaceQuestion<PythagorasRaceError>

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`

/** An exact decimal in LaTeX with the comma ({,}); only values that end with at most two decimals */
export function written(value: FractionValue): string | null {
    const text = toExactDecimal(value, ',')
    if (text === null || (text.split(',')[1] ?? '').length > 2 || text.length > 8) return null
    return text.replace(',', '{,}')
}
/** A number in LaTeX (the generated lengths always have at most two decimals) */
const w = (value: number) => written(n(value)) ?? String(value)

interface Candidate {
    value: FractionValue
    error: PythagorasRaceError
}

/** A number as an exact value; a mistake that is not whole keeps three decimals and is then left out if it does not end soon */
const n = (value: number) => (Number.isInteger(value) ? fraction(value) : fraction(Math.round(value * 1000), 1000))
/** The root of a mistake, only when it is a whole number or ends soon; a negative square gives no option */
const root = (square: number) => (square > 0 ? n(Math.sqrt(square)) : fraction(-1))
const near = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: n(item), error: 'calculation' }))

/** The right option and three different mistakes, all positive and written as exact decimals */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<PythagorasRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: PythagorasRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (candidate.value.numerator <= 0) continue
        const latex = written(candidate.value)
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<PythagorasRaceError>[], answer: FractionValue, solution: LocalizedText): PythagorasRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution }
}

/* ---------- Right triangles with exact sides ---------- */

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [12, 35, 37], [9, 40, 41]]

/** Legs and hypotenuse of a right triangle: a triple, scaled, sometimes halved; legs in random order */
function rightTriangle(random: Random, tier: Tier): { p: number; q: number; h: number } {
    const [a, b, c] = tier === 0 ? pick(random, TRIPLES.slice(0, 3)) : pick(random, TRIPLES)
    const scale = tier === 0 ? (a === 3 ? pick(random, [1, 2, 3, 4]) : 1) : pick(random, a === 3 ? [0.5, 1, 2, 3, 5, 6, 10] : a < 9 ? [0.5, 1, 2, 3] : [1, 2])
    const [p, q] = random() < 0.5 ? [a, b] : [b, a]
    return { p: p * scale, q: q * scale, h: c * scale }
}

/* ---------- Circuit 0: the theorem ---------- */

function squaresQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const { p, q, h } = rightTriangle(random, tier)
    if (!Number.isInteger(p * p) || !Number.isInteger(q * q)) return null
    const big = random() < 0.5
    const answer = big ? h * h : q * q
    const choices = options(random, n(answer), big
        ? [{ value: n(Math.abs(q * q - p * p)), error: 'wrong-operation' }, { value: n(h), error: 'no-root' }, ...near(answer)]
        : [{ value: n(h * h + p * p), error: 'wrong-operation' }, { value: n(q), error: 'no-root' }, ...near(answer)])
    if (!choices) return null
    return question(0, big ? 'square-hypotenuse' : 'square-leg', big
        ? say(`Katetoen gaineko karratuen azalerak ${math(w(p * p))} eta ${math(w(q * q))} dira. Zein da hipotenusaren gaineko karratuaren azalera?`, `Los cuadrados sobre los catetos tienen áreas ${math(w(p * p))} y ${math(w(q * q))}. ¿Qué área tiene el cuadrado sobre la hipotenusa?`, `مساحتا المربعين على الضلعين القائمين ${math(w(p * p))} و${math(w(q * q))}. ما مساحة المربع على الوتر؟`)
        : say(`Hipotenusaren gaineko karratuaren azalera ${math(w(h * h))} da, eta kateto baten gainekoarena ${math(w(p * p))}. Zein da beste katetoaren gainekoarena?`, `El cuadrado sobre la hipotenusa tiene área ${math(w(h * h))} y el de un cateto ${math(w(p * p))}. ¿Qué área tiene el del otro cateto?`, `مساحة المربع على الوتر ${math(w(h * h))} ومساحة المربع على أحد الضلعين القائمين ${math(w(p * p))}. ما مساحة المربع على الآخر؟`),
    choices, n(answer), same(math(big ? `${w(p * p)}+${w(q * q)}=${w(answer)}` : `${w(h * h)}-${w(p * p)}=${w(answer)}`)))
}

function tripleQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const [a, b, c] = pick(random, tier === 0 ? TRIPLES.slice(0, 4) : TRIPLES)
    const k = tier === 0 ? pick(random, [1, 1, 2]) : pick(random, [1, 2, 3])
    const [x, y, z] = [a * k, b * k, c * k]
    const missingHyp = random() < 0.6
    const answer = missingHyp ? z : y
    const choices = options(random, n(answer), missingHyp
        ? [{ value: n(x + y), error: 'added-sides' }, { value: n(x * x + y * y), error: 'no-root' }, ...near(answer)]
        : [{ value: n(z - x), error: 'added-sides' }, { value: n(z * z - x * x), error: 'no-root' }, { value: root(z * z + x * x), error: 'wrong-operation' }, ...near(answer)])
    if (!choices) return null
    return question(0, missingHyp ? 'triple-hypotenuse' : 'triple-leg', missingHyp
        ? say(`Zein zenbakik osatzen du hirukote pitagorikoa? ${math(`${x},\\ ${y},\\ ?`)}`, `¿Qué número completa la terna pitagórica? ${math(`${x},\\ ${y},\\ ?`)}`, `أي عدد يكمل الثلاثية الفيثاغورية؟ ${math(`${x},\\ ${y},\\ ?`)}`)
        : say(`Zein zenbakik osatzen du hirukote pitagorikoa? ${math(`${x},\\ ?,\\ ${z}`)}`, `¿Qué número completa la terna pitagórica? ${math(`${x},\\ ?,\\ ${z}`)}`, `أي عدد يكمل الثلاثية الفيثاغورية؟ ${math(`${x},\\ ?,\\ ${z}`)}`),
    choices, n(answer), same(math(missingHyp ? `\\sqrt{${x * x}+${y * y}}=\\sqrt{${z * z}}=${z}` : `\\sqrt{${z * z}-${x * x}}=\\sqrt{${y * y}}=${y}`)))
}

/* ---------- Circuit 1: finding sides ---------- */

function hypotenuseQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const { p, q, h } = rightTriangle(random, tier)
    const choices = options(random, n(h), [
        { value: n(p + q), error: 'added-sides' },
        { value: n(p * p + q * q), error: 'no-root' },
        { value: root(Math.abs(q * q - p * p)), error: 'wrong-operation' },
        ...near(h)
    ])
    if (!choices) return null
    return question(1, 'hypotenuse', say(
        `Triangelu angeluzuzen baten katetoak ${math(w(p))} cm eta ${math(w(q))} cm dira. Zenbat da hipotenusa?`,
        `Los catetos de un triángulo rectángulo miden ${math(w(p))} cm y ${math(w(q))} cm. ¿Cuánto mide la hipotenusa?`,
        `الضلعان القائمان في مثلث قائم ${math(w(p))} سم و${math(w(q))} سم. كم طول الوتر؟`
    ), choices, n(h), same(math(`\\sqrt{${w(p)}^{2}+${w(q)}^{2}}=\\sqrt{${w(h * h)}}=${w(h)}`)))
}

function legQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const { p, q, h } = rightTriangle(random, tier)
    const choices = options(random, n(q), [
        { value: root(h * h + p * p), error: 'wrong-operation' },
        { value: n(h * h - p * p), error: 'no-root' },
        { value: n(h - p), error: 'added-sides' },
        ...near(q)
    ])
    if (!choices) return null
    return question(1, 'leg', say(
        `Hipotenusa ${math(w(h))} cm da eta kateto bat ${math(w(p))} cm. Zenbat da beste katetoa?`,
        `La hipotenusa mide ${math(w(h))} cm y un cateto ${math(w(p))} cm. ¿Cuánto mide el otro cateto?`,
        `الوتر ${math(w(h))} سم وأحد الضلعين القائمين ${math(w(p))} سم. كم طول الضلع الآخر؟`
    ), choices, n(q), same(math(`\\sqrt{${w(h)}^{2}-${w(p)}^{2}}=\\sqrt{${w(q * q)}}=${w(q)}`)))
}

/* ---------- Circuit 2: plane figures ---------- */

function isoscelesQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const { p, q, h } = rightTriangle(random, tier)
    const base = 2 * p
    const choices = options(random, n(q), [
        { value: root(h * h - base * base), error: 'no-half' },
        { value: n(q * q), error: 'no-root' },
        { value: root(h * h + p * p), error: 'wrong-operation' },
        { value: n(h - p), error: 'added-sides' },
        ...near(q)
    ])
    if (!choices) return null
    return question(2, 'isosceles', say(
        `Triangelu isoszele baten alde berdinak ${math(w(h))} cm dira eta oinarria ${math(w(base))} cm. Zenbat da altuera?`,
        `Los lados iguales de un triángulo isósceles miden ${math(w(h))} cm y la base ${math(w(base))} cm. ¿Cuánto mide la altura?`,
        `الساقان في مثلث متساوي الساقين ${math(w(h))} سم والقاعدة ${math(w(base))} سم. كم الارتفاع؟`
    ), choices, n(q), same(math(`\\sqrt{${w(h)}^{2}-${w(p)}^{2}}=${w(q)}`)))
}

function rectangleQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const { p, q, h } = rightTriangle(random, tier)
    const choices = options(random, n(h), [
        { value: n(p + q), error: 'added-sides' },
        { value: n(p * p + q * q), error: 'no-root' },
        { value: n(2 * (p + q)), error: 'calculation' },
        ...near(h)
    ])
    if (!choices) return null
    return question(2, 'rectangle', say(
        `Laukizuzen baten aldeak ${math(w(p))} cm eta ${math(w(q))} cm dira. Zenbat da diagonala?`,
        `Los lados de un rectángulo miden ${math(w(p))} cm y ${math(w(q))} cm. ¿Cuánto mide la diagonal?`,
        `ضلعا مستطيل ${math(w(p))} سم و${math(w(q))} سم. كم طول قطره؟`
    ), choices, n(h), same(math(`\\sqrt{${w(p)}^{2}+${w(q)}^{2}}=${w(h)}`)))
}

function rhombusQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const { p, q, h } = rightTriangle(random, tier)
    const choices = options(random, n(h), [
        { value: n(2 * h), error: 'no-half' },
        { value: n(p + q), error: 'added-sides' },
        { value: n(p * p + q * q), error: 'no-root' },
        ...near(h)
    ])
    if (!choices) return null
    return question(2, 'rhombus', say(
        `Erronbo baten diagonalak ${math(w(2 * p))} cm eta ${math(w(2 * q))} cm dira. Zenbat da aldea?`,
        `Las diagonales de un rombo miden ${math(w(2 * p))} cm y ${math(w(2 * q))} cm. ¿Cuánto mide el lado?`,
        `قطرا معيّن ${math(w(2 * p))} سم و${math(w(2 * q))} سم. كم طول ضلعه؟`
    ), choices, n(h), same(math(`\\sqrt{${w(p)}^{2}+${w(q)}^{2}}=${w(h)}`)))
}

function trapezoidQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const { p, q, h } = rightTriangle(random, tier)
    const small = randomInt(random, 2, tier === 0 ? 10 : 30)
    const isosceles = random() < 0.5
    const big = small + (isosceles ? 2 * p : p)
    const choices = options(random, n(q), [
        ...(isosceles ? [{ value: root(h * h - 4 * p * p), error: 'no-half' as const }] : []),
        { value: n(h - p), error: 'added-sides' },
        { value: n(q * q), error: 'no-root' },
        { value: root(h * h + p * p), error: 'wrong-operation' },
        ...near(q)
    ])
    if (!choices) return null
    return question(2, isosceles ? 'trapezoid-isosceles' : 'trapezoid-right', isosceles
        ? say(`Trapezio isoszele baten oinarriak ${math(w(big))} cm eta ${math(w(small))} cm dira, eta alde zeiharrak ${math(w(h))} cm. Zenbat da altuera?`, `Las bases de un trapecio isósceles miden ${math(w(big))} cm y ${math(w(small))} cm, y los lados oblicuos ${math(w(h))} cm. ¿Cuánto mide la altura?`, `قاعدتا شبه منحرف متساوي الساقين ${math(w(big))} سم و${math(w(small))} سم وضلعاه المائلان ${math(w(h))} سم. كم الارتفاع؟`)
        : say(`Trapezio angeluzuzen baten oinarriak ${math(w(big))} cm eta ${math(w(small))} cm dira, eta alde zeiharra ${math(w(h))} cm. Zenbat da altuera?`, `Las bases de un trapecio rectángulo miden ${math(w(big))} cm y ${math(w(small))} cm, y el lado oblicuo ${math(w(h))} cm. ¿Cuánto mide la altura?`, `قاعدتا شبه منحرف قائم ${math(w(big))} سم و${math(w(small))} سم وضلعه المائل ${math(w(h))} سم. كم الارتفاع؟`),
    choices, n(q), same(math(isosceles
        ? `(${w(big)}-${w(small)})\\mathbin{:}2=${w(p)}\\ \\to\\ \\sqrt{${w(h)}^{2}-${w(p)}^{2}}=${w(q)}`
        : `${w(big)}-${w(small)}=${w(p)}\\ \\to\\ \\sqrt{${w(h)}^{2}-${w(p)}^{2}}=${w(q)}`)))
}

/* ---------- Circuit 3: the circle ---------- */

function chordQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const { p, q, h } = rightTriangle(random, tier)
    const findChord = random() < 0.6
    if (findChord) {
        const answer = 2 * q
        const choices = options(random, n(answer), [
            { value: n(q), error: 'no-double' },
            { value: n(2 * q * q), error: 'no-root' },
            { value: root(4 * (h * h + p * p)), error: 'wrong-operation' },
            ...near(answer)
        ])
        if (!choices) return null
        return question(3, 'chord', say(
            `Zirkunferentzia baten erradioa ${math(w(h))} cm da, eta korda bat zentrotik ${math(w(p))} cm-ra dago. Zenbat da korda?`,
            `Una circunferencia tiene ${math(w(h))} cm de radio y una cuerda está a ${math(w(p))} cm del centro. ¿Cuánto mide la cuerda?`,
            `نصف قطر دائرة ${math(w(h))} سم ووتر يبعد ${math(w(p))} سم عن المركز. كم طول الوتر؟`
        ), choices, n(answer), same(math(`\\sqrt{${w(h)}^{2}-${w(p)}^{2}}=${w(q)}\\ \\to\\ 2\\cdot ${w(q)}=${w(answer)}`)))
    }
    const chord = 2 * q
    const choices = options(random, n(p), [
        { value: root(h * h - chord * chord), error: 'no-half' },
        { value: n(p * p), error: 'no-root' },
        { value: root(h * h + q * q), error: 'wrong-operation' },
        ...near(p)
    ])
    if (!choices) return null
    return question(3, 'chord-distance', say(
        `${math(w(h))} cm-ko erradioko zirkunferentzia batean ${math(w(chord))} cm-ko korda bat dago. Zer distantziara dago zentrotik?`,
        `En una circunferencia de ${math(w(h))} cm de radio hay una cuerda de ${math(w(chord))} cm. ¿A qué distancia está del centro?`,
        `في دائرة نصف قطرها ${math(w(h))} سم وتر طوله ${math(w(chord))} سم. كم يبعد عن المركز؟`
    ), choices, n(p), same(math(`\\sqrt{${w(h)}^{2}-${w(q)}^{2}}=${w(p)}`)))
}

function tangentQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const { p, q, h } = rightTriangle(random, tier)
    const findDistance = random() < 0.5
    const answer = findDistance ? h : p
    const choices = options(random, n(answer), findDistance
        ? [{ value: n(p + q), error: 'added-sides' }, { value: n(h * h), error: 'no-root' }, { value: root(Math.abs(q * q - p * p)), error: 'wrong-operation' }, ...near(answer)]
        : [{ value: root(h * h + q * q), error: 'wrong-operation' }, { value: n(p * p), error: 'no-root' }, { value: n(h - q), error: 'added-sides' }, ...near(answer)])
    if (!choices) return null
    return question(3, findDistance ? 'tangent-distance' : 'tangent-radius', findDistance
        ? say(`Erradioa ${math(w(p))} cm da eta $PT$ zuzenki ukitzailea ${math(w(q))} cm. Zer distantziara dago $P$ zentrotik?`, `El radio mide ${math(w(p))} cm y el segmento tangente $PT$ ${math(w(q))} cm. ¿A qué distancia está $P$ del centro?`, `نصف القطر ${math(w(p))} سم وقطعة المماس $PT$ طولها ${math(w(q))} سم. كم تبعد $P$ عن المركز؟`)
        : say(`$P$ puntua zentrotik ${math(w(h))} cm-ra dago eta $PT$ zuzenki ukitzailea ${math(w(q))} cm da. Zenbat da erradioa?`, `El punto $P$ está a ${math(w(h))} cm del centro y el segmento tangente $PT$ mide ${math(w(q))} cm. ¿Cuánto mide el radio?`, `النقطة $P$ تبعد ${math(w(h))} سم عن المركز وقطعة المماس $PT$ طولها ${math(w(q))} سم. كم نصف القطر؟`),
    choices, n(answer), same(math(findDistance ? `\\sqrt{${w(p)}^{2}+${w(q)}^{2}}=${w(h)}` : `\\sqrt{${w(h)}^{2}-${w(q)}^{2}}=${w(p)}`)))
}

/* ---------- Circuit 4: space and problems ---------- */

/** Boxes with a whole diagonal: a, b, c, D */
const BOXES: Array<[number, number, number, number]> = [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [6, 6, 7, 11], [3, 4, 12, 13], [2, 10, 11, 15], [4, 8, 8, 12], [2, 5, 14, 15], [3, 6, 6, 9]]

function boxQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const [a, b, c, d] = pick(random, tier === 0 ? BOXES.slice(0, 4).concat([BOXES[6]]) : BOXES)
    const k = tier === 0 ? 1 : pick(random, [1, 1, 2])
    const [x, y, z, answer] = shuffle(random, [a, b, c]).map((value) => value * k).concat(d * k)
    const choices = options(random, n(answer), [
        { value: root(x * x + y * y), error: 'base-only' },
        { value: n(x + y + z), error: 'added-sides' },
        { value: n(answer * answer), error: 'no-root' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(4, 'box', say(
        `Ortoedro baten dimentsioak ${math(`${x}`)} cm, ${math(`${y}`)} cm eta ${math(`${z}`)} cm dira. Zenbat da diagonala?`,
        `Un ortoedro mide ${math(`${x}`)} cm, ${math(`${y}`)} cm y ${math(`${z}`)} cm. ¿Cuánto mide su diagonal?`,
        `أبعاد متوازي مستطيلات ${math(`${x}`)} سم و${math(`${y}`)} سم و${math(`${z}`)} سم. كم طول قطره؟`
    ), choices, n(answer), same(math(`\\sqrt{${x * x}+${y * y}+${z * z}}=\\sqrt{${answer * answer}}=${answer}`)))
}

function gridQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const [a, b, c] = pick(random, tier === 0 ? TRIPLES.slice(0, 2) : TRIPLES.slice(0, 4))
    const k = a === 3 ? pick(random, tier === 0 ? [1, 2] : [1, 2, 3]) : 1
    const [dx, dy] = random() < 0.5 ? [a * k, b * k] : [b * k, a * k]
    const answer = c * k
    const x1 = randomInt(random, -5, 5)
    const y1 = randomInt(random, -5, 5)
    const x2 = x1 + (random() < 0.5 ? dx : -dx)
    const y2 = y1 + (random() < 0.5 ? dy : -dy)
    const choices = options(random, n(answer), [
        { value: n(dx + dy), error: 'added-sides' },
        { value: n(answer * answer), error: 'no-root' },
        { value: root(x2 * x2 + y2 * y2), error: 'calculation' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(4, 'grid', say(
        `Kalkulatu ${math(`A(${x1},${y1})`)} eta ${math(`B(${x2},${y2})`)} puntuen arteko distantzia.`,
        `Calcula la distancia entre ${math(`A(${x1},${y1})`)} y ${math(`B(${x2},${y2})`)}.`,
        `احسب المسافة بين ${math(`A(${x1},${y1})`)} و${math(`B(${x2},${y2})`)}.`
    ), choices, n(answer), same(math(`\\sqrt{${dx}^{2}+${dy}^{2}}=\\sqrt{${answer * answer}}=${answer}`)))
}

function ladderQuestion(random: Random, tier: Tier): PythagorasRaceQuestion | null {
    const { p, q, h } = rightTriangle(random, tier)
    if (h > 30) return null
    const choices = options(random, n(q), [
        { value: root(h * h + p * p), error: 'wrong-operation' },
        { value: n(h - p), error: 'added-sides' },
        { value: n(q * q), error: 'no-root' },
        ...near(q)
    ])
    if (!choices) return null
    return question(4, 'ladder', say(
        `${math(w(h))} m-ko eskailera baten oina hormatik ${math(w(p))} m-ra dago. Zer altueratara iristen da?`,
        `El pie de una escalera de ${math(w(h))} m está a ${math(w(p))} m de la pared. ¿Hasta qué altura llega?`,
        `قاعدة سلّم طوله ${math(w(h))} م تبعد ${math(w(p))} م عن الجدار. إلى أي ارتفاع يصل؟`
    ), choices, n(q), same(math(`\\sqrt{${w(h)}^{2}-${w(p)}^{2}}=\\sqrt{${w(q * q)}}=${w(q)}`)))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => PythagorasRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [squaresQuestion, tripleQuestion],
    [hypotenuseQuestion, legQuestion],
    [isoscelesQuestion, rectangleQuestion, rhombusQuestion, trapezoidQuestion],
    [chordQuestion, tangentQuestion],
    [boxQuestion, gridQuestion, ladderQuestion]
]

export function generatePythagorasRaceQuestion(random: Random, circuit: number, tier: Tier): PythagorasRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkPythagorasPitAnswer(question: PythagorasRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(readFiguresAnswer(input), question.answer, question.answerForm)
}

export function pythagorasParTime(circuit: number): number {
    return parTimeFor([10, 11, 12, 12, 12][circuit] ?? 11)
}

export const pythagorasRaceErrorTips: Record<PythagorasRaceError, LocalizedText> = {
    'added-sides': say('Ez batu edo kendu aldeak: batu edo kendu haien karratuak, eta gero erroa.', 'No sumes ni restes los lados: suma o resta sus cuadrados y después saca la raíz.', 'لا تجمع الأضلاع ولا تطرحها: اجمع مربعاتها أو اطرحها ثم خذ الجذر.'),
    'no-root': say('Hori karratua da: falta da erro karratua ateratzea.', 'Eso es el cuadrado: falta sacar la raíz cuadrada.', 'هذا هو المربع: بقي أخذ الجذر التربيعي.'),
    'wrong-operation': say('Hipotenusarako karratuak batu; katetorako, hipotenusaren karratuari kendu.', 'Para la hipotenusa se suman los cuadrados; para un cateto, se restan del cuadrado de la hipotenusa.', 'للوتر نجمع المربعات؛ وللضلع القائم نطرح من مربع الوتر.'),
    'no-half': say('Triangelu angeluzuzenaren katetoa erdia da: oinarri-erdia, diagonal-erdia, korda-erdia edo oinarrien kenduraren erdia.', 'El cateto del triángulo rectángulo es la mitad: media base, media diagonal, media cuerda o la mitad de la diferencia de las bases.', 'الضلع القائم في المثلث هو النصف: نصف القاعدة أو نصف القطر أو نصف الوتر أو نصف فرق القاعدتين.'),
    'no-double': say('Hori korda-erdia da: bikoiztu korda osoa lortzeko.', 'Eso es media cuerda: duplícala para tener la cuerda entera.', 'هذا نصف الوتر: ضاعفه لتحصل على الوتر كله.'),
    'base-only': say('Hori oinarriaren diagonala da; orain altuerarekin Pitagoras berriro.', 'Esa es la diagonal de la base; ahora, Pitágoras otra vez con la altura.', 'هذا قطر القاعدة؛ الآن طبّق فيثاغورس مرة أخرى مع الارتفاع.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
