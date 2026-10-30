import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Geometriaren lasterketa (1. DBH): five circuits, one per stage. Answers
   are numbers; every wrong option is a typical mistake (complementary and
   supplementary swapped, the triangle area without halving, the diameter
   instead of the radius, the sum of the legs as hypotenuse…).
   ========================================================================== */

export const GEOMETRY_RACE_CIRCUITS = 5

export type GeometryRaceError =
    | 'swapped-pair'
    | 'wrong-total'
    | 'no-half'
    | 'diameter'
    | 'perimeter-area'
    | 'added-legs'
    | 'no-root'
    | 'unit-step'
    | 'calculation'

export type GeometryRaceQuestion = RaceQuestion<GeometryRaceError>

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const math = (latex: string) => `$${latex}$`

/** A number as the options show it: decimal comma, since options are the same in every language */
const written = (value: number) => (Number.isInteger(value) ? String(value) : String(Math.round(value * 100) / 100).replace('.', '{,}'))

interface Candidate {
    value: number
    error: GeometryRaceError
}

function options(random: Random, right: number, candidates: Candidate[]): RaceOption<GeometryRaceError>[] | null {
    const used = new Set([written(right)])
    const wrong: Array<{ latex: string; error: GeometryRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        const latex = written(candidate.value)
        if (candidate.value <= 0 || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: written(right), correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

const near = (value: number, step = 1): Candidate[] => [value + step, value - step, value + 2 * step, value - 2 * step].map((item) => ({ value: item, error: 'calculation' }))

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<GeometryRaceError>[], answer: number, worked: string): GeometryRaceQuestion {
    const value: FractionValue = Number.isInteger(answer) ? fraction(answer) : fraction(Math.round(answer * 100), 100)
    return { circuit, kind, prompt, options: choices, answer: value, answerForm: 'any', percentAnswer: false, writable: true, solution: { eu: math(worked), es: math(worked), en: math(worked), ar: math(worked.replace(/\{,\}/g, '.')) } }
}

/* ---------- Circuit 0: angles ---------- */

function anglePairQuestion(random: Random): GeometryRaceQuestion | null {
    const kind = pick(random, ['complement', 'supplement', 'opposite'] as const)
    const angle = kind === 'complement' ? randomInt(random, 5, 85) : randomInt(random, 10, 170)
    if (kind === 'opposite') {
        const choices = options(random, angle, [{ value: 180 - angle, error: 'swapped-pair' }, { value: 90 - angle, error: 'wrong-total' }, ...near(angle, 10)])
        if (!choices) return null
        return question(0, kind, say(`Bi zuzen ebakitzen dira eta angelu bat ${angle}° da. Zenbat da erpinez aurkakoa?`, `Dos rectas se cortan y un ángulo mide ${angle}°. ¿Cuánto mide su opuesto por el vértice?`, `يتقاطع مستقيمان وإحدى الزوايا ${angle}°. كم قياس المقابلة لها بالرأس؟`, `Two straight lines cross, and one angle measures ${angle}°. How big is its vertically opposite angle?`), choices, angle, `${angle}^{\\circ}`)
    }
    const total = kind === 'complement' ? 90 : 180
    const answer = total - angle
    const choices = options(random, answer, [{ value: (kind === 'complement' ? 180 : 90) - angle, error: 'swapped-pair' }, { value: 360 - angle, error: 'wrong-total' }, ...near(answer, 10)])
    if (!choices) return null
    const name = kind === 'complement' ? say('osagarria', 'el complementario', 'المتممة', 'the complementary angle') : say('betegarria', 'el suplementario', 'المكملة', 'the supplementary angle')
    return question(0, kind, say(`Zein da ${angle}°-ko angeluaren ${name.eu}?`, `¿Cuál es ${name.es} de ${angle}°?`, `ما ${name.ar} لزاوية ${angle}°؟`, `What is ${name.en} of ${angle}°?`), choices, answer, `${total}^{\\circ}-${angle}^{\\circ}=${answer}^{\\circ}`)
}

/* ---------- Circuit 1: polygons ---------- */

function triangleQuestion(random: Random, tier: Tier): GeometryRaceQuestion | null {
    const quad = tier === 2 && random() < 0.5
    if (quad) {
        const angles = [randomInt(random, 60, 120), randomInt(random, 60, 120), randomInt(random, 60, 120)]
        const answer = 360 - angles.reduce((sum, value) => sum + value, 0)
        if (answer <= 0 || answer >= 180) return null
        const choices = options(random, answer, [{ value: 180 - angles[0] - angles[1] + 180 - angles[2], error: 'calculation' }, { value: answer - 180, error: 'wrong-total' }, ...near(answer, 10)])
        if (!choices) return null
        return question(1, 'quadrilateral', say(`Lauki baten hiru angelu ${angles.join('°, ')}° dira. Zenbat da laugarrena?`, `Tres ángulos de un cuadrilátero miden ${angles.join('°, ')}°. ¿Cuánto mide el cuarto?`, `ثلاث زوايا في رباعي ${angles.join('°، ')}°. كم الرابعة؟`, `Three angles of a quadrilateral measure ${angles.join('°, ')}°. How big is the fourth angle?`), choices, answer, `360^{\\circ}-${angles.join('^{\\circ}-')}^{\\circ}=${answer}^{\\circ}`)
    }
    const a = randomInt(random, 20, 100)
    const b = randomInt(random, 20, 150 - a)
    const answer = 180 - a - b
    if (answer <= 0) return null
    const choices = options(random, answer, [{ value: 360 - a - b, error: 'wrong-total' }, { value: 90 - Math.min(a, b), error: 'swapped-pair' }, ...near(answer, 10)])
    if (!choices) return null
    return question(1, 'triangle', say(`Triangelu baten bi angelu ${a}° eta ${b}° dira. Zenbat da hirugarrena?`, `Dos ángulos de un triángulo miden ${a}° y ${b}°. ¿Cuánto mide el tercero?`, `زاويتان في مثلث ${a}° و${b}°. كم الثالثة؟`, `Two angles of a triangle measure ${a}° and ${b}°. How big is the third angle?`), choices, answer, `180^{\\circ}-${a}^{\\circ}-${b}^{\\circ}=${answer}^{\\circ}`)
}

/* ---------- Circuit 2: Pythagoras ---------- */

const triples: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25]]

function pythagorasQuestion(random: Random, tier: Tier): GeometryRaceQuestion | null {
    const [a, b, c] = pick(random, tier === 0 ? triples.slice(0, 3) : triples)
    if (tier > 0 && random() < 0.5) {
        const choices = options(random, a, [{ value: c - b, error: 'calculation' }, { value: c * c - b * b, error: 'no-root' }, { value: Math.round(Math.sqrt(c * c + b * b) * 100) / 100, error: 'added-legs' }, ...near(a)])
        if (!choices) return null
        return question(2, 'leg', say(`Hipotenusa ${c} da eta kateto bat ${b}. Zenbat da beste katetoa?`, `La hipotenusa mide ${c} y un cateto ${b}. ¿Cuánto mide el otro cateto?`, `الوتر ${c} وأحد الضلعين القائمين ${b}. كم الآخر؟`, `The hypotenuse measures ${c} and one leg measures ${b}. How long is the other leg?`), choices, a, `\\sqrt{${c}^{2}-${b}^{2}}=\\sqrt{${c * c - b * b}}=${a}`)
    }
    const choices = options(random, c, [{ value: a + b, error: 'added-legs' }, { value: a * a + b * b, error: 'no-root' }, ...near(c)])
    if (!choices) return null
    return question(2, 'hypotenuse', say(`Katetoak ${a} eta ${b} dira. Zenbat da hipotenusa?`, `Los catetos miden ${a} y ${b}. ¿Cuánto mide la hipotenusa?`, `الضلعان القائمان ${a} و${b}. كم الوتر؟`, `The legs measure ${a} and ${b}. How long is the hypotenuse?`), choices, c, `\\sqrt{${a}^{2}+${b}^{2}}=\\sqrt{${a * a + b * b}}=${c}`)
}

/* ---------- Circuit 3: perimeters and units ---------- */

function perimeterQuestion(random: Random, tier: Tier): GeometryRaceQuestion | null {
    const kind = pick(random, tier === 0 ? ['rectangle', 'regular', 'units'] as const : ['rectangle', 'regular', 'units', 'circle'] as const)
    if (kind === 'rectangle') {
        const b = randomInt(random, 3, 15)
        const h = randomInt(random, 2, 12)
        const answer = 2 * b + 2 * h
        const choices = options(random, answer, [{ value: b * h, error: 'perimeter-area' }, { value: b + h, error: 'calculation' }, ...near(answer, 2)])
        if (!choices) return null
        return question(3, kind, say(`Zenbat da ${b} cm eta ${h} cm-ko laukizuzenaren perimetroa?`, `¿Cuál es el perímetro de un rectángulo de ${b} cm y ${h} cm?`, `كم محيط مستطيل ${b} سم و${h} سم؟`, `What is the perimeter of a rectangle measuring ${b} cm by ${h} cm?`), choices, answer, `2\\cdot ${b}+2\\cdot ${h}=${answer}`)
    }
    if (kind === 'regular') {
        const sides = randomInt(random, 3, 8)
        const side = randomInt(random, 2, 12)
        const answer = sides * side
        const names = ['', '', '', say('triangelu aldeberdin', 'triángulo equilátero', 'مثلث متساوي الأضلاع', 'equilateral triangle'), say('karratu', 'cuadrado', 'مربع', 'square'), say('pentagono erregular', 'pentágono regular', 'مخمس منتظم', 'regular pentagon'), say('hexagono erregular', 'hexágono regular', 'مسدس منتظم', 'regular hexagon'), say('heptagono erregular', 'heptágono regular', 'مسبع منتظم', 'regular heptagon'), say('oktogono erregular', 'octógono regular', 'مثمن منتظم', 'regular octagon')]
        const name = names[sides] as LocalizedText
        const choices = options(random, answer, [{ value: side * side, error: 'perimeter-area' }, { value: (sides - 1) * side, error: 'calculation' }, ...near(answer, side)])
        if (!choices) return null
        return question(3, kind, say(`Zenbat da ${side} cm-ko aldea duen ${name.eu} baten perimetroa?`, `¿Cuál es el perímetro de un ${name.es} de ${side} cm de lado?`, `كم محيط ${name.ar} ضلعه ${side} سم؟`, `What is the perimeter of the ${name.en} with a side of ${side} cm?`), choices, answer, `${sides}\\cdot ${side}=${answer}`)
    }
    if (kind === 'units') {
        const meters = randomInt(random, 2, 90) / 10
        const answer = Math.round(meters * 100)
        const choices = options(random, answer, [{ value: Math.round(meters * 10), error: 'unit-step' }, { value: Math.round(meters * 1000), error: 'unit-step' }, ...near(answer, 10)])
        if (!choices) return null
        return question(3, kind, say(`Zenbat cm dira ${written(meters).replace('{,}', ',')} m?`, `¿Cuántos cm son ${written(meters).replace('{,}', ',')} m?`, `كم سنتيمترًا في ${String(meters)} م؟`, `How many cm are in ${String(meters)} m?`), choices, answer, `${written(meters)}\\cdot 100=${answer}`)
    }
    const radius = randomInt(random, 1, 10)
    const answer = Math.round(2 * 314 * radius) / 100
    const choices = options(random, answer, [{ value: Math.round(314 * radius) / 100, error: 'calculation' }, { value: Math.round(314 * radius * radius) / 100, error: 'perimeter-area' }, { value: Math.round(4 * 314 * radius) / 100, error: 'diameter' }, ...near(answer)])
    if (!choices) return null
    return question(3, 'circle', say(`Zenbat da ${radius} cm-ko erradioa duen zirkunferentziaren luzera (π ≈ 3,14)?`, `¿Cuánto mide una circunferencia de ${radius} cm de radio (π ≈ 3,14)?`, `كم طول دائرة نصف قطرها ${radius} سم (π ≈ 3.14)؟`, `How long is the circumference of a circle with radius ${radius} cm (π ≈ 3.14)?`), choices, answer, `2\\cdot 3{,}14\\cdot ${radius}=${written(answer)}`)
}

/* ---------- Circuit 4: areas ---------- */

function areaQuestion(random: Random, tier: Tier): GeometryRaceQuestion | null {
    const kind = pick(random, tier === 0 ? ['rectangle', 'triangle'] as const : ['rectangle', 'triangle', 'rhombus', 'trapezoid', 'circle'] as const)
    const b = randomInt(random, 3, 14)
    const h = randomInt(random, 2, 10)
    switch (kind) {
        case 'rectangle': {
            const answer = b * h
            const choices = options(random, answer, [{ value: 2 * b + 2 * h, error: 'perimeter-area' }, { value: answer / 2, error: 'no-half' }, ...near(answer, h)])
            return choices && question(4, kind, say(`Zenbat da ${b} cm eta ${h} cm-ko laukizuzenaren azalera?`, `¿Cuál es el área de un rectángulo de ${b} cm y ${h} cm?`, `كم مساحة مستطيل ${b} سم و${h} سم؟`, `What is the area of a rectangle measuring ${b} cm by ${h} cm?`), choices, answer, `${b}\\cdot ${h}=${answer}`)
        }
        case 'triangle': {
            const answer = (b * h) / 2
            const choices = options(random, answer, [{ value: b * h, error: 'no-half' }, { value: b + h, error: 'calculation' }, ...near(answer, 2)])
            return choices && question(4, kind, say(`Zenbat da ${b} cm-ko oinarria eta ${h} cm-ko altuera dituen triangeluaren azalera?`, `¿Cuál es el área de un triángulo de ${b} cm de base y ${h} cm de altura?`, `كم مساحة مثلث قاعدته ${b} سم وارتفاعه ${h} سم؟`, `What is the area of a triangle with base ${b} cm and height ${h} cm?`), choices, answer, `\\frac{${b}\\cdot ${h}}{2}=${written(answer)}`)
        }
        case 'rhombus': {
            const answer = (b * h) / 2
            const choices = options(random, answer, [{ value: b * h, error: 'no-half' }, { value: 2 * b + 2 * h, error: 'perimeter-area' }, ...near(answer, 2)])
            return choices && question(4, kind, say(`Erronbo baten diagonalak ${b} cm eta ${h} cm dira. Zenbat da azalera?`, `Las diagonales de un rombo miden ${b} cm y ${h} cm. ¿Cuál es su área?`, `قطرا معيّن ${b} سم و${h} سم. كم مساحته؟`, `The diagonals of a rhombus measure ${b} cm and ${h} cm. What is its area?`), choices, answer, `\\frac{${b}\\cdot ${h}}{2}=${written(answer)}`)
        }
        case 'trapezoid': {
            const small = randomInt(random, 2, b - 1 > 2 ? b - 1 : 3)
            const answer = ((b + small) * h) / 2
            const choices = options(random, answer, [{ value: (b + small) * h, error: 'no-half' }, { value: (b * small * h) / 2, error: 'calculation' }, ...near(answer, 2)])
            return choices && question(4, kind, say(`Trapezio baten oinarriak ${b} cm eta ${small} cm dira eta altuera ${h} cm. Zenbat da azalera?`, `Las bases de un trapecio miden ${b} cm y ${small} cm y su altura ${h} cm. ¿Cuál es su área?`, `قاعدتا شبه منحرف ${b} سم و${small} سم وارتفاعه ${h} سم. كم مساحته؟`, `The bases of a trapezium measure ${b} cm and ${small} cm, and its height is ${h} cm. What is its area?`), choices, answer, `\\frac{(${b}+${small})\\cdot ${h}}{2}=${written(answer)}`)
        }
        default: {
            const radius = randomInt(random, 1, 10)
            const answer = Math.round(314 * radius * radius) / 100
            const choices = options(random, answer, [{ value: Math.round(2 * 314 * radius) / 100, error: 'perimeter-area' }, { value: Math.round(314 * 4 * radius * radius) / 100, error: 'diameter' }, { value: Math.round(314 * 2 * radius) / 100 + 1, error: 'calculation' }, ...near(answer)])
            return choices && question(4, 'circle', say(`Zenbat da ${radius} cm-ko erradioa duen zirkuluaren azalera (π ≈ 3,14)?`, `¿Cuál es el área de un círculo de ${radius} cm de radio (π ≈ 3,14)?`, `كم مساحة قرص نصف قطره ${radius} سم (π ≈ 3.14)؟`, `What is the area of a circle with radius ${radius} cm (π ≈ 3.14)?`), choices, answer, `3{,}14\\cdot ${radius}^{2}=${written(answer)}`)
        }
    }
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => GeometryRaceQuestion | null

const circuitGenerators: Generator[] = [(random) => anglePairQuestion(random), triangleQuestion, pythagorasQuestion, perimeterQuestion, areaQuestion]

export function generateGeometryRaceQuestion(random: Random, circuit: number, tier: Tier): GeometryRaceQuestion {
    const generator = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 400; attempt += 1) {
        const next = generator(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkGeometryPitAnswer(question: GeometryRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function geometryParTime(circuit: number): number {
    return parTimeFor([8, 9, 10, 10, 11][circuit] ?? 10)
}

export const geometryRaceErrorTips: Record<GeometryRaceError, LocalizedText> = {
    'swapped-pair': say('Osagarriak 90° dira batuta; betegarriak, 180°.', 'Los complementarios suman 90°; los suplementarios, 180°.', 'المتتامتان مجموعهما 90°، والمتكاملتان 180°.', 'Complementary angles add up to 90°; supplementary angles add up to 180°.'),
    'wrong-total': say('Triangelu baten angeluak 180° dira; lauki batenak, 360°.', 'Los ángulos de un triángulo suman 180°; los de un cuadrilátero, 360°.', 'زوايا المثلث مجموعها 180°، والرباعي 360°.', 'The angles of a triangle add up to 180°; those of a quadrilateral add up to 360°.'),
    'no-half': say('Triangeluaren, erronboaren eta trapezioaren azaleran zati bi egin behar da.', 'En el área del triángulo, del rombo y del trapecio hay que dividir entre dos.', 'في مساحة المثلث والمعيّن وشبه المنحرف يجب القسمة على اثنين.', 'For the area of a triangle, a rhombus and a trapezium, you have to divide by two.'),
    diameter: say('Formulak erradioa erabiltzen du, ez diametroa.', 'La fórmula usa el radio, no el diámetro.', 'الصيغة تستعمل نصف القطر لا القطر.', 'The formula uses the radius, not the diameter.'),
    'perimeter-area': say('Perimetroa aldeen batura da; azalera, gainazala (oinarria · altuera).', 'El perímetro es la suma de los lados; el área, la superficie (base · altura).', 'المحيط مجموع الأضلاع؛ والمساحة هي السطح (القاعدة · الارتفاع).', 'The perimeter is the sum of the sides; the area is the surface (base · height).'),
    'added-legs': say('Hipotenusa ez da katetoen batura: batu karratuak eta atera erroa.', 'La hipotenusa no es la suma de los catetos: suma los cuadrados y haz la raíz.', 'الوتر ليس مجموع الضلعين: اجمع المربعين وخذ الجذر.', 'The hypotenuse is not the sum of the legs: add the squares and take the square root.'),
    'no-root': say('Karratuen batura hipotenusaren karratua da: falta da erro karratua.', 'La suma de los cuadrados es el cuadrado de la hipotenusa: falta la raíz cuadrada.', 'مجموع المربعين هو مربع الوتر: ينقص الجذر التربيعي.', 'The sum of the squares is the square of the hypotenuse, so you still need the square root.'),
    'unit-step': say('m-tik cm-ra bi urrats dira: bider 100.', 'De m a cm hay dos escalones: por 100.', 'من م إلى سم درجتان: في 100.', 'From m to cm there are two steps: multiply by 100.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
