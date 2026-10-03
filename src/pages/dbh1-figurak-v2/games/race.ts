import { checkAnswer, fraction, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readFiguresAnswer } from '../answers.ts'

/* ==========================================================================
   Irudi lauen lasterketa (1. DBH): five circuits — polygons, triangles,
   quadrilaterals and symmetry, circles, and areas. Every wrong option is a
   typical mistake: counting each diagonal twice, n · 180° instead of
   (n − 2) · 180°, the central angle for the interior one, forgetting to
   halve the isosceles base, the flat triangle, 180° in a quadrilateral,
   r₁ + r₂ for r₁ − r₂, the inscribed angle doubled, π · r instead of π · r²,
   (R − r)² for R² − r²… Answers are plain numbers (degrees without °).
   Prompts never put a Basque suffix after a generated number.
   ========================================================================== */

export const FIGURES_RACE_CIRCUITS = 5

export type FiguresRaceError =
    | 'counted-twice'
    | 'from-vertex'
    | 'n-times'
    | 'central-interior'
    | 'sum-not-each'
    | 'no-half'
    | 'one-angle'
    | 'flat-allowed'
    | 'diameter'
    | 'opposite'
    | 'triangle-sum'
    | 'axes-360'
    | 'sum-difference'
    | 'double-half'
    | 'no-square'
    | 'arc-area'
    | 'whole'
    | 'subtract-first'
    | 'calculation'

export type FiguresRaceQuestion = RaceQuestion<FiguresRaceError>

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`
const deg = (value: number | string) => `${value}^{\\circ}`

/** An exact decimal in LaTeX with the comma ({,}); only values that end with at most two decimals */
export function written(value: FractionValue): string | null {
    const text = toExactDecimal(value, ',')
    if (text === null || (text.split(',')[1] ?? '').length > 2 || text.length > 8) return null
    return text.replace(',', '{,}')
}

interface Candidate {
    value: FractionValue
    error: FiguresRaceError
}

/** A number as an exact value; a mistake that is not whole keeps three decimals and is then left out if it does not end soon */
const n = (value: number) => (Number.isInteger(value) ? fraction(value) : fraction(Math.round(value * 1000), 1000))
const near = (value: number): Candidate[] => [value + 1, value - 1, value + 10, value - 10, value * 2].map((item) => ({ value: n(item), error: 'calculation' }))

/** The right option and three different mistakes, all positive and written as exact decimals */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<FiguresRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: FiguresRaceError }> = []
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

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<FiguresRaceError>[], answer: FractionValue, solution: LocalizedText): FiguresRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution }
}

/* ---------- Circuit 0: polygons ---------- */

function diagonalsQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const sides = randomInt(random, 4, tier === 0 ? 8 : 15)
    const answer = (sides * (sides - 3)) / 2
    const choices = options(random, n(answer), [
        { value: n(sides * (sides - 3)), error: 'counted-twice' },
        { value: n(sides - 3), error: 'from-vertex' },
        { value: n((sides * (sides - 2)) / 2), error: 'calculation' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(0, 'diagonals', say(
        `Zenbat diagonal ditu ${math(`${sides}`)} aldeko poligono batek?`,
        `¿Cuántas diagonales tiene un polígono de ${math(`${sides}`)} lados?`,
        `كم قطرًا لمضلع له ${math(`${sides}`)} ضلعًا؟`
    ), choices, n(answer), same(math(`\\frac{${sides}\\cdot ${sides - 3}}{2}=\\frac{${sides * (sides - 3)}}{2}=${answer}`)))
}

function angleSumQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const sides = randomInt(random, 4, tier === 0 ? 8 : 14)
    const answer = (sides - 2) * 180
    const choices = options(random, n(answer), [
        { value: n(sides * 180), error: 'n-times' },
        { value: n((sides - 3) * 180), error: 'from-vertex' },
        { value: n(answer / sides), error: 'sum-not-each' },
        { value: n(answer + 180), error: 'calculation' }
    ])
    if (!choices) return null
    return question(0, 'angle-sum', say(
        `Zenbat egiten dute ${math(`${sides}`)} aldeko poligono baten barne-angeluek? (graduak)`,
        `¿Cuánto suman los ángulos interiores de un polígono de ${math(`${sides}`)} lados? (grados)`,
        `كم مجموع الزوايا الداخلية لمضلع له ${math(`${sides}`)} ضلعًا؟ (بالدرجات)`
    ), choices, n(answer), same(math(`(${sides}-2)\\cdot 180=${sides - 2}\\cdot 180=${answer}`)))
}

function regularQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const sides = pick(random, tier === 0 ? [3, 4, 6, 8] : [5, 6, 8, 9, 10, 12, 15, 18, 20])
    const interior = ((sides - 2) * 180) / sides
    const central = 360 / sides
    const askCentral = random() < 0.4
    const answer = askCentral ? central : interior
    const choices = options(random, n(answer), [
        { value: n(askCentral ? interior : central), error: 'central-interior' },
        { value: n(askCentral ? 180 / sides : (sides - 2) * 180), error: askCentral ? 'axes-360' : 'sum-not-each' },
        { value: n(askCentral ? 360 * sides : 180 - interior / 2), error: 'calculation' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(0, askCentral ? 'central' : 'interior', askCentral
        ? say(`Zenbat da ${math(`${sides}`)} aldeko poligono erregular baten angelu zentrala? (graduak)`, `¿Cuánto mide el ángulo central de un polígono regular de ${math(`${sides}`)} lados? (grados)`, `كم قياس الزاوية المركزية لمضلع منتظم له ${math(`${sides}`)} ضلعًا؟ (بالدرجات)`)
        : say(`Zenbat da ${math(`${sides}`)} aldeko poligono erregular baten barne-angelua? (graduak)`, `¿Cuánto mide el ángulo interior de un polígono regular de ${math(`${sides}`)} lados? (grados)`, `كم قياس الزاوية الداخلية لمضلع منتظم له ${math(`${sides}`)} ضلعًا؟ (بالدرجات)`),
    choices, n(answer), same(math(askCentral ? `360\\mathbin{:}${sides}=${central}` : `(${sides}-2)\\cdot 180\\mathbin{:}${sides}=${(sides - 2) * 180}\\mathbin{:}${sides}=${interior}`)))
}

/* ---------- Circuit 1: triangles ---------- */

function isoscelesQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const fromApex = random() < 0.6
    if (fromApex) {
        const apex = 2 * randomInt(random, tier === 0 ? 10 : 5, tier === 0 ? 40 : 85)
        const answer = (180 - apex) / 2
        const choices = options(random, n(answer), [
            { value: n(180 - apex), error: 'no-half' },
            { value: n(apex / 2), error: 'calculation' },
            { value: n(apex), error: 'calculation' },
            ...near(answer)
        ])
        if (!choices) return null
        return question(1, 'isosceles-base', say(
            `Triangelu isoszele baten angelu desberdina ${math(deg(apex))} da. Zenbat da oinarriko angelu bakoitza?`,
            `El ángulo desigual de un isósceles mide ${math(deg(apex))}. ¿Cuánto mide cada ángulo de la base?`,
            `زاوية الرأس في مثلث متساوي الساقين ${math(deg(apex))}. كم قياس كل زاوية من زاويتي القاعدة؟`
        ), choices, n(answer), same(math(`(180-${apex})\\mathbin{:}2=${180 - apex}\\mathbin{:}2=${answer}`)))
    }
    const base = randomInt(random, tier === 0 ? 50 : 20, 85)
    const answer = 180 - 2 * base
    const choices = options(random, n(answer), [
        { value: n(180 - base), error: 'one-angle' },
        { value: n((180 - base) / 2), error: 'calculation' },
        { value: n(base), error: 'calculation' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(1, 'isosceles-apex', say(
        `Triangelu isoszele baten oinarriko angelu bakoitza ${math(deg(base))} da. Zenbat da angelu desberdina?`,
        `Cada ángulo de la base de un isósceles mide ${math(deg(base))}. ¿Cuánto mide el ángulo desigual?`,
        `كل زاوية من زاويتي القاعدة في مثلث متساوي الساقين ${math(deg(base))}. كم قياس زاوية الرأس؟`
    ), choices, n(answer), same(math(`180-2\\cdot ${base}=180-${2 * base}=${answer}`)))
}

function sideQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const a = randomInt(random, 2, tier === 0 ? 8 : 15)
    const b = randomInt(random, 2, tier === 0 ? 8 : 15)
    const largest = random() < 0.6
    const answer = largest ? a + b - 1 : Math.abs(a - b) + 1
    const choices = options(random, n(answer), largest
        ? [{ value: n(a + b), error: 'flat-allowed' }, { value: n(Math.abs(a - b) + 1), error: 'calculation' }, { value: n(a * b), error: 'calculation' }, ...near(answer)]
        : [{ value: n(Math.abs(a - b)), error: 'flat-allowed' }, { value: n(a + b - 1), error: 'calculation' }, { value: n(a + b), error: 'calculation' }, ...near(answer)])
    if (!choices) return null
    return question(1, largest ? 'side-max' : 'side-min', largest
        ? say(`Triangelu baten bi aldeak ${math(`${a}`)} cm eta ${math(`${b}`)} cm dira. Zein da hirugarrenaren luzera osorik handiena?`, `Dos lados de un triángulo miden ${math(`${a}`)} cm y ${math(`${b}`)} cm. ¿Cuál es la mayor longitud entera del tercero?`, `ضلعان في مثلث ${math(`${a}`)} سم و${math(`${b}`)} سم. ما أكبر طول صحيح للضلع الثالث؟`)
        : say(`Triangelu baten bi aldeak ${math(`${a}`)} cm eta ${math(`${b}`)} cm dira. Zein da hirugarrenaren luzera osorik txikiena?`, `Dos lados de un triángulo miden ${math(`${a}`)} cm y ${math(`${b}`)} cm. ¿Cuál es la menor longitud entera del tercero?`, `ضلعان في مثلث ${math(`${a}`)} سم و${math(`${b}`)} سم. ما أصغر طول صحيح للضلع الثالث؟`),
    choices, n(answer), same(math(largest ? `x<${a}+${b}=${a + b}\\ \\to\\ x=${answer}` : `x>${Math.max(a, b)}-${Math.min(a, b)}=${Math.abs(a - b)}\\ \\to\\ x=${answer}`)))
}

function circumradiusQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const [p, q, h] = pick(random, tier === 0 ? [[6, 8, 10], [3, 4, 5], [12, 16, 20]] : [[5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [20, 21, 29]])
    const answer = fraction(h, 2)
    const choices = options(random, answer, [
        { value: n(h), error: 'diameter' },
        { value: fraction(p + q, 2), error: 'calculation' },
        { value: fraction(p, 2), error: 'calculation' },
        { value: n(2 * h), error: 'calculation' }
    ])
    if (!choices) return null
    return question(1, 'circumradius', say(
        `Triangelu angeluzuzen baten hipotenusa ${math(`${h}`)} cm da. Zenbat da zirkunferentzia zirkunskribatuaren erradioa?`,
        `La hipotenusa de un triángulo rectángulo mide ${math(`${h}`)} cm. ¿Cuánto mide el radio de la circunferencia circunscrita?`,
        `وتر مثلث قائم ${math(`${h}`)} سم. كم نصف قطر الدائرة المحيطة؟`
    ), choices, answer, same(math(`${h}\\mathbin{:}2=${written(answer)}`)))
}

/* ---------- Circuit 2: quadrilaterals and symmetry ---------- */

function parallelogramQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const angle = randomInt(random, tier === 0 ? 50 : 20, tier === 0 ? 85 : 160)
    if (angle === 90) return null
    const answer = 180 - angle
    const choices = options(random, n(answer), [
        { value: n(angle), error: 'opposite' },
        { value: n(360 - angle), error: 'calculation' },
        { value: n(90 - angle), error: 'calculation' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(2, 'parallelogram', say(
        `Paralelogramo baten angelu bat ${math(deg(angle))} da. Zenbat da ondoko angelua?`,
        `Un ángulo de un paralelogramo mide ${math(deg(angle))}. ¿Cuánto mide el consecutivo?`,
        `زاوية في متوازي أضلاع ${math(deg(angle))}. كم قياس المتتالية معها؟`
    ), choices, n(answer), same(math(`180-${angle}=${answer}`)))
}

function quadMissingQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const a = randomInt(random, 6, 14) * 5
    const b = randomInt(random, 6, 24) * 5
    const c = randomInt(random, 6, tier === 0 ? 20 : 30) * 5
    const answer = 360 - a - b - c
    if (answer < 20 || answer > 200) return null
    const choices = options(random, n(answer), [
        { value: n(180 - a - b - c), error: 'triangle-sum' },
        { value: n(540 - a - b - c), error: 'calculation' },
        { value: n(360 - a - b), error: 'calculation' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(2, 'quad-missing', say(
        `Lauki baten hiru angeluak ${math(deg(a))}, ${math(deg(b))} eta ${math(deg(c))} dira. Zenbat da laugarrena?`,
        `Tres ángulos de un cuadrilátero miden ${math(deg(a))}, ${math(deg(b))} y ${math(deg(c))}. ¿Cuánto mide el cuarto?`,
        `ثلاث زوايا في رباعي ${math(deg(a))} و${math(deg(b))} و${math(deg(c))}. كم قياس الرابعة؟`
    ), choices, n(answer), same(math(`360-(${a}+${b}+${c})=360-${a + b + c}=${answer}`)))
}

function axesQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const sides = pick(random, tier === 0 ? [3, 4, 6, 9, 10] : [5, 6, 8, 9, 10, 12, 15, 18, 20])
    const answer = fraction(180, sides)
    const choices = options(random, answer, [
        { value: fraction(360, sides), error: 'axes-360' },
        { value: n(sides), error: 'calculation' },
        { value: fraction(90, sides), error: 'calculation' },
        { value: n(2 * sides), error: 'calculation' }
    ])
    if (!choices) return null
    return question(2, 'axes', say(
        `Zer angelu eratzen dute ${math(`${sides}`)} aldeko poligono erregular baten ondoz ondoko bi simetria-ardatzek? (graduak)`,
        `¿Qué ángulo forman dos ejes de simetría contiguos de un polígono regular de ${math(`${sides}`)} lados? (grados)`,
        `ما الزاوية بين محوري تناظر متجاورين في مضلع منتظم له ${math(`${sides}`)} ضلعًا؟ (بالدرجات)`
    ), choices, answer, same(math(`180\\mathbin{:}${sides}=${written(answer)}`)))
}

/* ---------- Circuit 3: circles ---------- */

function tangentQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const big = randomInt(random, 3, tier === 0 ? 10 : 20)
    const small = randomInt(random, 1, big - 1)
    const exterior = random() < 0.5
    const answer = exterior ? big + small : big - small
    const choices = options(random, n(answer), [
        { value: n(exterior ? big - small : big + small), error: 'sum-difference' },
        { value: n(big * small), error: 'calculation' },
        { value: n(big), error: 'calculation' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(3, exterior ? 'tangent-exterior' : 'tangent-interior', exterior
        ? say(`${math(`${big}`)} cm eta ${math(`${small}`)} cm-ko erradioak dituzten bi zirkunferentzia kanpotik ukitzaileak dira. Zer distantziara daude zentroak?`, `Dos circunferencias de radios ${math(`${big}`)} cm y ${math(`${small}`)} cm son tangentes exteriores. ¿A qué distancia están sus centros?`, `دائرتان نصفا قطريهما ${math(`${big}`)} سم و${math(`${small}`)} سم متماستان من الخارج. كم البعد بين المركزين؟`)
        : say(`${math(`${big}`)} cm eta ${math(`${small}`)} cm-ko erradioak dituzten bi zirkunferentzia barrutik ukitzaileak dira. Zer distantziara daude zentroak?`, `Dos circunferencias de radios ${math(`${big}`)} cm y ${math(`${small}`)} cm son tangentes interiores. ¿A qué distancia están sus centros?`, `دائرتان نصفا قطريهما ${math(`${big}`)} سم و${math(`${small}`)} سم متماستان من الداخل. كم البعد بين المركزين؟`),
    choices, n(answer), same(math(`${big}${exterior ? '+' : '-'}${small}=${answer}`)))
}

function inscribedQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const fromCentral = random() < 0.55
    const central = 2 * randomInt(random, tier === 0 ? 20 : 8, tier === 0 ? 60 : 89)
    const inscribed = central / 2
    const answer = fromCentral ? inscribed : central
    const choices = options(random, n(answer), [
        { value: n(fromCentral ? 2 * central : inscribed / 2), error: 'double-half' },
        { value: n(180 - answer), error: 'calculation' },
        { value: n(360 - answer), error: 'calculation' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(3, fromCentral ? 'inscribed' : 'central', fromCentral
        ? say(`Angelu zentral bat ${math(deg(central))} da. Zenbat da arku bera hartzen duen angelu inskribatua?`, `Un ángulo central mide ${math(deg(central))}. ¿Cuánto mide el inscrito que abarca el mismo arco?`, `زاوية مركزية ${math(deg(central))}. كم قياس المحيطية التي تحصر القوس نفسه؟`)
        : say(`Angelu inskribatu bat ${math(deg(inscribed))} da. Zenbat da arku bera hartzen duen angelu zentrala?`, `Un ángulo inscrito mide ${math(deg(inscribed))}. ¿Cuánto mide el central que abarca el mismo arco?`, `زاوية محيطية ${math(deg(inscribed))}. كم قياس المركزية التي تحصر القوس نفسه؟`),
    choices, n(answer), same(math(fromCentral ? `${central}\\mathbin{:}2=${inscribed}` : `2\\cdot ${inscribed}=${central}`)))
}

/* ---------- Circuit 4: areas ---------- */

/** 3,14 · value, exact */
const pi = (value: number) => fraction(314 * value, 100)

function sectorQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const radius = randomInt(random, 2, tier === 0 ? 10 : 20)
    const angle = pick(random, tier === 0 ? [90, 180] : [30, 45, 60, 90, 120, 180, 270])
    const answer = fraction(314 * radius * radius * angle, 36000)
    if (!written(answer)) return null
    const choices = options(random, answer, [
        { value: fraction(314 * radius * angle, 36000), error: 'no-square' },
        { value: fraction(2 * 314 * radius * angle, 36000), error: 'arc-area' },
        { value: pi(radius * radius), error: 'whole' },
        { value: fraction(314 * radius * radius * angle, 3600), error: 'calculation' }
    ])
    if (!choices) return null
    return question(4, 'sector', say(
        `Sektore baten erradioa ${math(`${radius}`)} cm da, eta angelua ${math(deg(angle))}. Kalkulatu haren azalera (${math('\\pi\\approx 3{,}14')}).`,
        `Calcula el área de un sector de ${math(`${radius}`)} cm de radio y ${math(deg(angle))} (${math('\\pi\\approx 3{,}14')}).`,
        `احسب مساحة قطاع نصف قطره ${math(`${radius}`)} سم وزاويته ${math(deg(angle))} (${math('\\pi\\approx 3{,}14')}).`
    ), choices, answer, same(math(`\\frac{3{,}14\\cdot ${radius}^{2}\\cdot ${angle}}{360}=${written(answer)}`)))
}

function ringQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const outer = randomInt(random, 3, tier === 0 ? 8 : 15)
    const inner = randomInt(random, 1, outer - 1)
    const answer = pi(outer * outer - inner * inner)
    const choices = options(random, answer, [
        { value: pi((outer - inner) * (outer - inner)), error: 'subtract-first' },
        { value: pi(outer * outer), error: 'whole' },
        { value: pi(outer - inner), error: 'no-square' },
        { value: pi(outer * outer + inner * inner), error: 'calculation' }
    ])
    if (!choices) return null
    return question(4, 'ring', say(
        `Kalkulatu ${math(`${outer}`)} cm eta ${math(`${inner}`)} cm-ko erradioak dituen koroa zirkularraren azalera (${math('\\pi\\approx 3{,}14')}).`,
        `Calcula el área de la corona circular de radios ${math(`${outer}`)} cm y ${math(`${inner}`)} cm (${math('\\pi\\approx 3{,}14')}).`,
        `احسب مساحة الحلقة الدائرية التي نصفا قطريها ${math(`${outer}`)} سم و${math(`${inner}`)} سم (${math('\\pi\\approx 3{,}14')}).`
    ), choices, answer, same(math(`3{,}14\\cdot(${outer * outer}-${inner * inner})=3{,}14\\cdot ${outer * outer - inner * inner}=${written(answer)}`)))
}

function lShapeQuestion(random: Random, tier: Tier): FiguresRaceQuestion | null {
    const width = randomInt(random, 5, tier === 0 ? 10 : 20)
    const height = randomInt(random, 4, tier === 0 ? 8 : 15)
    const cutWidth = randomInt(random, 1, width - 2)
    const cutHeight = randomInt(random, 1, height - 2)
    const answer = width * height - cutWidth * cutHeight
    const choices = options(random, n(answer), [
        { value: n(width * height), error: 'whole' },
        { value: n(width * height + cutWidth * cutHeight), error: 'calculation' },
        { value: n(2 * (width + height)), error: 'calculation' },
        ...near(answer)
    ])
    if (!choices) return null
    return question(4, 'l-shape', say(
        `${math(`${width}\\times ${height}`)} cm-ko laukizuzen bati ${math(`${cutWidth}\\times ${cutHeight}`)} cm-ko izkina bat kendu zaio. Zein da azalera (cm²)?`,
        `A un rectángulo de ${math(`${width}\\times ${height}`)} cm se le quita una esquina de ${math(`${cutWidth}\\times ${cutHeight}`)} cm. ¿Cuál es el área (cm²)?`,
        `أُزيل من مستطيل ${math(`${width}\\times ${height}`)} سم ركن ${math(`${cutWidth}\\times ${cutHeight}`)} سم. ما المساحة (سم²)؟`
    ), choices, n(answer), same(math(`${width}\\cdot ${height}-${cutWidth}\\cdot ${cutHeight}=${width * height}-${cutWidth * cutHeight}=${answer}`)))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => FiguresRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [diagonalsQuestion, angleSumQuestion, regularQuestion],
    [isoscelesQuestion, sideQuestion, circumradiusQuestion],
    [parallelogramQuestion, quadMissingQuestion, axesQuestion],
    [tangentQuestion, inscribedQuestion],
    [sectorQuestion, ringQuestion, lShapeQuestion]
]

export function generateFiguresRaceQuestion(random: Random, circuit: number, tier: Tier): FiguresRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkFiguresPitAnswer(question: FiguresRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(readFiguresAnswer(input), question.answer, question.answerForm)
}

export function figuresParTime(circuit: number): number {
    return parTimeFor([10, 10, 10, 9, 13][circuit] ?? 11)
}

export const figuresRaceErrorTips: Record<FiguresRaceError, LocalizedText> = {
    'counted-twice': say('Diagonal bakoitza bi aldiz zenbatu duzu (mutur bakoitzetik): zatitu bitan.', 'Has contado cada diagonal dos veces (una desde cada extremo): divide entre dos.', 'حسبت كل قطر مرتين (من كل طرف): اقسم على اثنين.'),
    'from-vertex': say('Hori erpin bakar batetik da. Poligono osoan: $\\frac{n\\cdot(n-3)}{2}$ diagonal eta $n-2$ triangelu.', 'Eso es desde un solo vértice. En todo el polígono: $\\frac{n\\cdot(n-3)}{2}$ diagonales y $n-2$ triángulos.', 'هذا من رأس واحد فقط. في المضلع كله: $\\frac{n\\cdot(n-3)}{2}$ قطرًا و$n-2$ مثلثات.'),
    'n-times': say('Ez dira $n$ triangelu, $n-2$ baizik: $(n-2)\\cdot 180^{\\circ}$.', 'No son $n$ triángulos, sino $n-2$: $(n-2)\\cdot 180^{\\circ}$.', 'ليست $n$ مثلثات بل $n-2$: $(n-2)\\cdot 180^{\\circ}$.'),
    'central-interior': say('Nahastu dituzu: zentrala $\\frac{360^{\\circ}}{n}$ da, eta barnekoa $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$.', 'Los has confundido: el central es $\\frac{360^{\\circ}}{n}$ y el interior $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$.', 'خلطت بينهما: المركزية $\\frac{360^{\\circ}}{n}$ والداخلية $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$.'),
    'sum-not-each': say('Batura eta angelu bakoitza bereizi: poligono erregularrean, bakoitza = batura : $n$.', 'Distingue la suma y cada ángulo: en el polígono regular, cada uno = suma : $n$.', 'ميّز بين المجموع وكل زاوية: في المضلع المنتظم كل زاوية = المجموع : $n$.'),
    'no-half': say('Oinarriko bi angelu daude: kendu ondoren, zatitu bitan.', 'Hay dos ángulos en la base: después de restar, divide entre dos.', 'هناك زاويتان في القاعدة: بعد الطرح اقسم على اثنين.'),
    'one-angle': say('Oinarriko bi angeluak kendu behar dira: $180^{\\circ}-2\\cdot\\hat{B}$.', 'Hay que restar los dos ángulos de la base: $180^{\\circ}-2\\cdot\\hat{B}$.', 'يجب طرح زاويتي القاعدة كلتيهما: $180^{\\circ}-2\\cdot\\hat{B}$.'),
    'flat-allowed': say('Berdina bada, aldeak zuzen baten gainean geratzen dira: hirugarrena batura baino txikiagoa (eta kendura baino handiagoa) izan behar da.', 'Si es igual, los lados quedan sobre una recta: el tercero tiene que ser menor que la suma (y mayor que la diferencia).', 'إذا تساوى انطبقت الأضلاع على مستقيم: يجب أن يكون الثالث أصغر من المجموع (وأكبر من الفرق).'),
    diameter: say('Hipotenusa diametroa da; erradioa haren erdia.', 'La hipotenusa es el diámetro; el radio es la mitad.', 'الوتر هو القطر؛ ونصف القطر نصفه.'),
    opposite: say('Aurkakoa berdina da; ondokoak $180^{\\circ}$ osatzen du.', 'El opuesto es igual; el consecutivo completa $180^{\\circ}$.', 'المقابلة مساوية؛ والمتتالية تكمل $180^{\\circ}$.'),
    'triangle-sum': say('Laukian angeluek $360^{\\circ}$ egiten dute, ez $180^{\\circ}$.', 'En un cuadrilátero los ángulos suman $360^{\\circ}$, no $180^{\\circ}$.', 'في الرباعي مجموع الزوايا $360^{\\circ}$ لا $180^{\\circ}$.'),
    'axes-360': say('$n$ ardatzek $180^{\\circ}$ banatzen dute (ardatz bakoitza zuzen oso bat da): $\\frac{180^{\\circ}}{n}$.', 'Los $n$ ejes se reparten $180^{\\circ}$ (cada eje es una recta entera): $\\frac{180^{\\circ}}{n}$.', 'تتقاسم المحاور الـ$n$ زاوية $180^{\\circ}$ (كل محور مستقيم كامل): $\\frac{180^{\\circ}}{n}$.'),
    'sum-difference': say('Kanpotik ukitzaileak: $r_1+r_2$. Barrutik: $r_1-r_2$.', 'Tangentes exteriores: $r_1+r_2$. Interiores: $r_1-r_2$.', 'التماس من الخارج: $r_1+r_2$. ومن الداخل: $r_1-r_2$.'),
    'double-half': say('Inskribatua zentralaren erdia da; zentrala, inskribatuaren bikoitza.', 'El inscrito es la mitad del central; el central, el doble del inscrito.', 'المحيطية نصف المركزية؛ والمركزية ضعف المحيطية.'),
    'no-square': say('Azaleran erradioa karratura: $\\pi\\cdot r^{2}$.', 'En el área el radio va al cuadrado: $\\pi\\cdot r^{2}$.', 'في المساحة يُربَّع نصف القطر: $\\pi\\cdot r^{2}$.'),
    'arc-area': say('Hori arkuaren luzera da ($2\\pi r$-ren zatia); azalerarako $\\pi r^{2}$-ren zatia.', 'Eso es la longitud del arco (parte de $2\\pi r$); para el área, parte de $\\pi r^{2}$.', 'هذا طول القوس (جزء من $2\\pi r$)؛ وللمساحة جزء من $\\pi r^{2}$.'),
    whole: say('Hori irudi osoa da; kendu edo hartu dagokion zatia bakarrik.', 'Eso es la figura entera; quita o toma solo la parte que corresponde.', 'هذا الشكل كاملًا؛ اطرح أو خذ الجزء المطلوب فقط.'),
    'subtract-first': say('Lehenik karratuak, gero kendu: $R^{2}-r^{2}$, ez $(R-r)^{2}$.', 'Primero los cuadrados, luego la resta: $R^{2}-r^{2}$, no $(R-r)^{2}$.', 'المربعات أولًا ثم الطرح: $R^{2}-r^{2}$ لا $(R-r)^{2}$.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
