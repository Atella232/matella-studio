import { checkAnswer, fraction, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readSolidsAnswer } from '../answers.ts'

/* ==========================================================================
   Gorputzen lasterketa (2. DBH): five circuits — polyhedra, areas of
   polyhedra, bodies of revolution, volume and capacity, and volumes. With
   π ≈ 3,14 every value is a whole number of hundredths, so every answer is
   exact. Every wrong option is a typical mistake: the pyramid's count for a
   prism, forgetting the bases or the 2 of Euler, one face instead of six,
   the height instead of the apothem or the generatrix, the diameter as the
   radius, 10 or 100 instead of 1000 between units, forgetting the third…
   Prompts never put a Basque suffix after a generated number.
   ========================================================================== */

export const SOLIDS_RACE_CIRCUITS = 5

export type SolidsRaceError =
    | 'formula-mix'
    | 'missing-bases'
    | 'euler'
    | 'one-face'
    | 'no-double'
    | 'no-half'
    | 'height-apothem'
    | 'diameter'
    | 'no-square'
    | 'volume-area'
    | 'step-ten'
    | 'step-hundred'
    | 'direction'
    | 'no-third'
    | 'calculation'

export type SolidsRaceQuestion = RaceQuestion<SolidsRaceError>

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`

/** An exact decimal in LaTeX with the comma ({,}); only values that end with at most two decimals */
export function written(value: FractionValue): string | null {
    const text = toExactDecimal(value, ',')
    if (text === null || (text.split(',')[1] ?? '').length > 2 || text.length > 9) return null
    const [whole, decimals] = text.split(',')
    // Five digits or more are grouped in thousands with thin spaces: 12\,000
    const grouped = whole.length > 4 ? whole.replace(/\B(?=(\d{3})+$)/g, '\\,') : whole
    return decimals === undefined ? grouped : `${grouped}{,}${decimals}`
}
const n = (value: number) => (Number.isInteger(value) ? fraction(value) : fraction(Math.round(value * 10000), 10000))
/** k · 3,14 as an exact value */
const pi = (k: number) => fraction(Math.round(k * 314), 100)
const w = (value: FractionValue) => written(value) ?? '?'
const wn = (value: number) => w(n(value))

interface Candidate {
    value: FractionValue
    error: SolidsRaceError
}

const near = (value: FractionValue): Candidate[] => {
    const x = value.numerator / value.denominator
    return [x + 1, x - 1, x + 2, x * 2].map((item) => ({ value: n(item), error: 'calculation' as const }))
}

/** The right option and three different mistakes, all positive and written as exact decimals */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<SolidsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SolidsRaceError }> = []
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

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SolidsRaceError>[], answer: FractionValue, solution: LocalizedText): SolidsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution }
}

/* ---------- Circuit 0: polyhedra ---------- */

type Element = 'faces' | 'edges' | 'vertices'
const elementName: Record<Element, LocalizedText> = {
    faces: say('aurpegi', 'caras', 'وجهًا'),
    edges: say('ertz', 'aristas', 'حرفًا'),
    vertices: say('erpin', 'vértices', 'رأسًا')
}
const counts = (prism: boolean, sides: number): Record<Element, number> => (prism ? { faces: sides + 2, edges: 3 * sides, vertices: 2 * sides } : { faces: sides + 1, edges: 2 * sides, vertices: sides + 1 })

function countQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    const sides = randomInt(random, 3, tier === 0 ? 8 : 12)
    const prism = random() < 0.5
    const element = pick(random, ['faces', 'edges', 'vertices'] as const)
    const right = counts(prism, sides)[element]
    const other = counts(!prism, sides)[element]
    // Forgetting the bases (or the apex): n faces, only the edges of the bases, one ring of vertices
    const missing = element === 'edges' && prism ? 2 * sides : sides
    const choices = options(random, n(right), [{ value: n(other), error: 'formula-mix' }, { value: n(missing), error: 'missing-bases' }, ...near(n(right))])
    if (!choices) return null
    const formula = element === 'faces' ? (prism ? `${sides}+2=${right}` : `${sides}+1=${right}`) : element === 'edges' ? (prism ? `3\\cdot ${sides}=${right}` : `2\\cdot ${sides}=${right}`) : prism ? `2\\cdot ${sides}=${right}` : `${sides}+1=${right}`
    const many = element === 'vertices' ? 'Cuántos' : 'Cuántas'
    return question(0, `count-${element}`, say(
        `${prism ? 'Prisma' : 'Piramide'} baten oinarriak ${math(String(sides))} alde ditu. Zenbat ${elementName[element].eu} ditu?`,
        `${prism ? 'Un prisma' : 'Una pirámide'} tiene una base de ${math(String(sides))} lados. ¿${many} ${elementName[element].es} tiene?`,
        `لقاعدة ${prism ? 'منشور' : 'هرم'} ${math(String(sides))} أضلاع. كم ${elementName[element].ar} له؟`
    ), choices, n(right), same(math(formula)))
}

function eulerQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    const sides = randomInt(random, 3, tier === 0 ? 8 : 12)
    const prism = random() < 0.5
    const { faces, edges, vertices } = counts(prism, sides)
    const unknown = pick(random, tier === 0 ? (['vertices', 'edges'] as const) : (['faces', 'vertices', 'edges'] as const))
    const right = { faces, edges, vertices }[unknown]
    const wrongEuler = unknown === 'edges' ? faces + vertices + 2 : unknown === 'faces' ? edges - vertices - 2 : edges - faces - 2
    const noTwo = unknown === 'edges' ? faces + vertices : unknown === 'faces' ? edges - vertices : edges - faces
    const choices = options(random, n(right), [{ value: n(wrongEuler), error: 'euler' }, { value: n(noTwo), error: 'euler' }, ...near(n(right))])
    if (!choices) return null
    const known = unknown === 'edges'
        ? say(`${math(String(faces))} aurpegi eta ${math(String(vertices))} erpin`, `${math(String(faces))} caras y ${math(String(vertices))} vértices`, `${math(String(faces))} وجهًا و${math(String(vertices))} رأسًا`)
        : unknown === 'faces'
            ? say(`${math(String(vertices))} erpin eta ${math(String(edges))} ertz`, `${math(String(vertices))} vértices y ${math(String(edges))} aristas`, `${math(String(vertices))} رأسًا و${math(String(edges))} حرفًا`)
            : say(`${math(String(faces))} aurpegi eta ${math(String(edges))} ertz`, `${math(String(faces))} caras y ${math(String(edges))} aristas`, `${math(String(faces))} وجهًا و${math(String(edges))} حرفًا`)
    const solution = unknown === 'edges' ? `${faces}+${vertices}-2=${right}` : unknown === 'faces' ? `${edges}+2-${vertices}=${right}` : `${edges}+2-${faces}=${right}`
    return question(0, `euler-${unknown}`, say(
        `Poliedro ganbil batek ${known.eu} ditu. Zenbat ${elementName[unknown].eu} ditu?`,
        `Un poliedro convexo tiene ${known.es}. ¿Cuántas ${elementName[unknown].es} tiene?`.replace('Cuántas vértices', 'Cuántos vértices'),
        `لمتعدد أوجه محدّب ${known.ar}. كم ${elementName[unknown].ar} له؟`
    ), choices, n(right), same(math(solution)))
}

/* ---------- Circuit 1: areas of polyhedra ---------- */

function cubeQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    const edge = tier === 0 ? randomInt(random, 2, 10) : pick(random, [1.5, 2.5, 3, 4, 6, 7, 8, 11, 12, 15])
    const right = n(6 * edge * edge)
    const choices = options(random, right, [{ value: n(edge * edge), error: 'one-face' }, { value: n(edge * edge * edge), error: 'volume-area' }, { value: n(4 * edge * edge), error: 'missing-bases' }, ...near(right)])
    if (!choices) return null
    return question(1, 'cube', say(
        `Kubo baten ertza ${math(wn(edge))} cm da. Zein da azalera osoa (cm²)?`,
        `La arista de un cubo mide ${math(wn(edge))} cm. ¿Cuál es su área total (cm²)?`,
        `طول حرف مكعب ${math(wn(edge))} سم. ما مساحته الكلية (سم²)؟`
    ), choices, right, same(math(`6\\cdot ${wn(edge)}^{2}=${w(right)}`)))
}

function cuboidQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    const max = tier === 0 ? 8 : 15
    const [a, b, c] = [randomInt(random, 2, max), randomInt(random, 2, max), randomInt(random, 1, max)]
    if (a === b && b === c) return null
    const half = a * b + a * c + b * c
    const right = n(2 * half)
    const choices = options(random, right, [{ value: n(half), error: 'no-double' }, { value: n(a * b * c), error: 'volume-area' }, { value: n(2 * (a + b) * c), error: 'missing-bases' }, ...near(right)])
    if (!choices) return null
    return question(1, 'cuboid', say(
        `Ortoedro baten neurriak ${math(`${a}`)} cm, ${math(`${b}`)} cm eta ${math(`${c}`)} cm dira. Zein da azalera osoa (cm²)?`,
        `Un ortoedro mide ${math(`${a}`)} cm, ${math(`${b}`)} cm y ${math(`${c}`)} cm. ¿Cuál es su área total (cm²)?`,
        `أبعاد متوازي مستطيلات ${math(`${a}`)} سم و${math(`${b}`)} سم و${math(`${c}`)} سم. ما مساحته الكلية (سم²)؟`
    ), choices, right, same(math(`2\\cdot (${a}\\cdot ${b}+${a}\\cdot ${c}+${b}\\cdot ${c})=${w(right)}`)))
}

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25]]

function pyramidQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    // Half the side and the height are the legs of a triple; the apothem is its hypotenuse
    const [p, q, apothem] = pick(random, tier === 0 ? TRIPLES.slice(0, 3) : TRIPLES)
    const [half, height] = random() < 0.5 ? [p, q] : [q, p]
    const side = 2 * half
    const given = tier === 0 || random() < 0.4 ? 'apothem' : 'height'
    const lateral = 2 * side * apothem
    const right = n(lateral)
    const choices = options(random, right, [
        { value: n(4 * side * apothem), error: 'no-half' },
        { value: n(2 * side * height), error: 'height-apothem' },
        { value: n(lateral + side * side), error: 'calculation' },
        ...near(right)
    ])
    if (!choices) return null
    const data = given === 'apothem'
        ? say(`oinarria ${math(String(side))} cm-ko aldeko karratua da eta apotema ${math(String(apothem))} cm`, `la base es un cuadrado de ${math(String(side))} cm de lado y la apotema mide ${math(String(apothem))} cm`, `قاعدته مربع طول ضلعه ${math(String(side))} سم وعامده ${math(String(apothem))} سم`)
        : say(`oinarria ${math(String(side))} cm-ko aldeko karratua da eta altuera ${math(String(height))} cm`, `la base es un cuadrado de ${math(String(side))} cm de lado y la altura mide ${math(String(height))} cm`, `قاعدته مربع طول ضلعه ${math(String(side))} سم وارتفاعه ${math(String(height))} سم`)
    const solution = given === 'apothem'
        ? `4\\cdot \\frac{${side}\\cdot ${apothem}}{2}=${lateral}`
        : `\\sqrt{${height}^{2}+${half}^{2}}=${apothem}\\ \\to\\ 4\\cdot \\frac{${side}\\cdot ${apothem}}{2}=${lateral}`
    return question(1, `pyramid-${given}`, say(
        `Piramide erregular batean, ${data.eu}. Zein da alboko azalera (cm²)?`,
        `En una pirámide regular, ${data.es}. ¿Cuál es su área lateral (cm²)?`,
        `في هرم منتظم ${data.ar}. ما مساحته الجانبية (سم²)؟`
    ), choices, right, same(math(solution)))
}

/* ---------- Circuit 2: bodies of revolution (π ≈ 3,14) ---------- */

const PI_NOTE = say('($\\pi\\approx 3{,}14$)', '($\\pi\\approx 3{,}14$)', '($\\pi\\approx 3{,}14$)')

function cylinderQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    const r = randomInt(random, 1, tier === 0 ? 5 : 10)
    const h = randomInt(random, 2, tier === 0 ? 10 : 20)
    const byDiameter = tier > 0 && random() < 0.4
    const right = pi(2 * r * h)
    const choices = options(random, right, [
        { value: pi(r * h), error: 'no-double' },
        { value: pi(r * r * h), error: 'volume-area' },
        { value: pi(4 * r * h), error: 'diameter' },
        { value: pi(2 * r * h + 2 * r * r), error: 'missing-bases' },
        ...near(right)
    ])
    if (!choices) return null
    const size = byDiameter
        ? say(`${math(String(2 * r))} cm-ko diametroa`, `${math(String(2 * r))} cm de diámetro`, `قطره ${math(String(2 * r))} سم`)
        : say(`${math(String(r))} cm-ko erradioa`, `${math(String(r))} cm de radio`, `نصف قطره ${math(String(r))} سم`)
    return question(2, byDiameter ? 'cylinder-diameter' : 'cylinder', say(
        `Zilindro batek ${size.eu} eta ${math(String(h))} cm-ko altuera ditu. Zein da alboko azalera (cm²)? ${PI_NOTE.eu}`,
        `Un cilindro tiene ${size.es} y ${math(String(h))} cm de altura. ¿Cuál es su área lateral (cm²)? ${PI_NOTE.es}`,
        `أسطوانة ${size.ar} وارتفاعها ${math(String(h))} سم. ما مساحتها الجانبية (سم²)؟ ${PI_NOTE.ar}`
    ), choices, right, same(math(`2\\cdot 3{,}14\\cdot ${r}\\cdot ${h}=${w(right)}`)))
}

function coneQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    const [p, q, g] = pick(random, tier === 0 ? TRIPLES.slice(0, 3) : TRIPLES.slice(0, 5))
    const [r, h] = random() < 0.5 ? [p, q] : [q, p]
    const givenG = tier === 0 || random() < 0.5
    const right = pi(r * g)
    const choices = options(random, right, [
        { value: pi(r * h), error: 'height-apothem' },
        { value: pi(2 * r * g), error: 'no-double' },
        { value: pi(r * g + r * r), error: 'missing-bases' },
        { value: pi(r * r), error: 'volume-area' },
        ...near(right)
    ])
    if (!choices) return null
    const data = givenG
        ? say(`erradioa ${math(String(r))} cm da eta sortzailea ${math(String(g))} cm`, `el radio mide ${math(String(r))} cm y la generatriz ${math(String(g))} cm`, `نصف قطره ${math(String(r))} سم وراسمه ${math(String(g))} سم`)
        : say(`erradioa ${math(String(r))} cm da eta altuera ${math(String(h))} cm`, `el radio mide ${math(String(r))} cm y la altura ${math(String(h))} cm`, `نصف قطره ${math(String(r))} سم وارتفاعه ${math(String(h))} سم`)
    const solution = givenG ? `3{,}14\\cdot ${r}\\cdot ${g}=${w(right)}` : `\\sqrt{${h}^{2}+${r}^{2}}=${g}\\ \\to\\ 3{,}14\\cdot ${r}\\cdot ${g}=${w(right)}`
    return question(2, givenG ? 'cone' : 'cone-height', say(
        `Kono batean ${data.eu}. Zein da alboko azalera (cm²)? ${PI_NOTE.eu}`,
        `En un cono ${data.es}. ¿Cuál es su área lateral (cm²)? ${PI_NOTE.es}`,
        `في مخروط ${data.ar}. ما مساحته الجانبية (سم²)؟ ${PI_NOTE.ar}`
    ), choices, right, same(math(solution)))
}

function sphereQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    const r = randomInt(random, 1, tier === 0 ? 6 : 12)
    const byDiameter = tier > 0 && random() < 0.4
    const right = pi(4 * r * r)
    const choices = options(random, right, [
        { value: pi(r * r), error: 'one-face' },
        { value: pi(16 * r * r), error: 'diameter' },
        { value: pi(2 * r * r), error: 'no-double' },
        { value: pi(4 * r), error: 'no-square' },
        ...near(right)
    ])
    if (!choices) return null
    const size = byDiameter ? say(`${math(String(2 * r))} cm-ko diametroko`, `de ${math(String(2 * r))} cm de diámetro`, `قطرها ${math(String(2 * r))} سم`) : say(`${math(String(r))} cm-ko erradioko`, `de ${math(String(r))} cm de radio`, `نصف قطرها ${math(String(r))} سم`)
    return question(2, byDiameter ? 'sphere-diameter' : 'sphere', say(
        `Zein da ${size.eu} esfera baten azalera (cm²)? ${PI_NOTE.eu}`,
        `¿Cuál es el área de una esfera ${size.es} (cm²)? ${PI_NOTE.es}`,
        `ما مساحة كرة ${size.ar} (سم²)؟ ${PI_NOTE.ar}`
    ), choices, right, same(math(`4\\cdot 3{,}14\\cdot ${r}^{2}=${w(right)}`)))
}

/* ---------- Circuit 3: volume and capacity ---------- */

const UNITS = ['m³', 'dm³', 'cm³'] as const
const unitLatex: Record<(typeof UNITS)[number] | 'L' | 'mL', string> = { 'm³': '\\text{m}^{3}', 'dm³': '\\text{dm}^{3}', 'cm³': '\\text{cm}^{3}', L: '\\text{L}', mL: '\\text{mL}' }

function convertQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    // Units: 0 m³, 1 dm³ (= L), 2 cm³ (= mL); one or two steps of 1000
    const from = randomInt(random, 0, 2)
    let to = randomInt(random, 0, 2)
    if (to === from) to = (from + 1) % 3
    const steps = to - from
    if (tier === 0 && Math.abs(steps) > 1) return null
    const factor = 1000 ** Math.abs(steps)
    const value = steps > 0
        ? pick(random, tier === 0 ? [1, 2, 3, 4, 5, 7, 2.5, 1.5] : [0.3, 0.25, 1.2, 2.5, 4.75, 0.08, 3.4, 6])
        : pick(random, tier === 0 ? [1000, 2000, 3500, 4000, 7500, 12000] : [2500, 300, 45000, 125, 80000, 6400])
    const right = steps > 0 ? value * factor : value / factor
    if (Math.abs(steps) === 2 && steps > 0 && right > 9999999) return null
    const ten = steps > 0 ? value * 10 ** Math.abs(steps) : value / 10 ** Math.abs(steps)
    const hundred = steps > 0 ? value * 100 ** Math.abs(steps) : value / 100 ** Math.abs(steps)
    const reverse = steps > 0 ? value / factor : value * factor
    const choices = options(random, n(right), [
        { value: n(hundred), error: 'step-hundred' },
        { value: n(ten), error: 'step-ten' },
        { value: n(reverse), error: 'direction' },
        ...near(n(right))
    ])
    if (!choices) return null
    const litres = random() < 0.4 && from > 0
    const fromUnit = litres ? (from === 1 ? 'L' : 'mL') : UNITS[from]
    const toUnit = UNITS[to]
    const operation = steps > 0 ? `${wn(value)}\\cdot ${factor}=${wn(right)}` : `${wn(value)}\\mathbin{:}${factor}=${wn(right)}`
    return question(3, litres ? 'litres' : 'units', say(
        `Adierazi ${math(`${wn(value)}\\ ${unitLatex[fromUnit]}`)} ${math(unitLatex[toUnit])} unitatetan.`,
        `Expresa ${math(`${wn(value)}\\ ${unitLatex[fromUnit]}`)} en ${math(unitLatex[toUnit])}.`,
        `عبّر عن ${math(`${wn(value)}\\ ${unitLatex[fromUnit]}`)} بوحدة ${math(unitLatex[toUnit])}.`
    ), choices, n(right), same(math(operation)))
}

function tankQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    // A box measured in cm or dm; the answer in litres
    const inCm = tier > 0 && random() < 0.5
    const [a, b, c] = inCm ? [pick(random, [10, 20, 25, 30, 40, 50]), pick(random, [10, 20, 30, 40]), pick(random, [10, 15, 20, 30])] : [randomInt(random, 2, 12), randomInt(random, 2, 10), randomInt(random, 2, 10)]
    const cubic = a * b * c
    const right = inCm ? cubic / 1000 : cubic
    const choices = options(random, n(right), [
        inCm ? { value: n(cubic / 100), error: 'step-hundred' } : { value: n(cubic / 1000), error: 'direction' },
        inCm ? { value: n(cubic / 10), error: 'step-ten' } : { value: n(cubic * 10), error: 'step-ten' },
        { value: n(2 * (a * b + a * c + b * c)), error: 'volume-area' },
        ...near(n(right))
    ])
    if (!choices) return null
    const unit = inCm ? 'cm' : 'dm'
    return question(3, inCm ? 'tank-cm' : 'tank-dm', say(
        `Depositu ortoedriko batek ${math(`${a}\\ \\text{${unit}}\\times ${b}\\ \\text{${unit}}\\times ${c}\\ \\text{${unit}}`)} neurtzen ditu. Zenbat litro sartzen dira?`,
        `Un depósito ortoédrico mide ${math(`${a}\\ \\text{${unit}}\\times ${b}\\ \\text{${unit}}\\times ${c}\\ \\text{${unit}}`)}. ¿Cuántos litros caben?`,
        `خزان على شكل متوازي مستطيلات أبعاده ${math(`${a}\\ \\text{${unit}}\\times ${b}\\ \\text{${unit}}\\times ${c}\\ \\text{${unit}}`)}. كم لترًا يسع؟`
    ), choices, n(right), same(math(inCm ? `${a}\\cdot ${b}\\cdot ${c}=${cubic}\\ \\to\\ ${cubic}\\mathbin{:}1000=${wn(right)}` : `${a}\\cdot ${b}\\cdot ${c}=${cubic}`)))
}

/* ---------- Circuit 4: volumes ---------- */

function prismVolumeQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    const cylinder = random() < 0.5
    if (cylinder) {
        const r = randomInt(random, 1, tier === 0 ? 5 : 10)
        const h = randomInt(random, 2, tier === 0 ? 10 : 20)
        const right = pi(r * r * h)
        const choices = options(random, right, [{ value: pi(2 * r * h), error: 'volume-area' }, { value: pi(4 * r * r * h), error: 'diameter' }, { value: pi(r * h), error: 'no-square' }, { value: pi((r * r * h) / 3), error: 'no-third' }, ...near(right)])
        if (!choices) return null
        return question(4, 'cylinder-volume', say(
            `Zilindro batek ${math(String(r))} cm-ko erradioa eta ${math(String(h))} cm-ko altuera ditu. Zein da bolumena (cm³)? ${PI_NOTE.eu}`,
            `Un cilindro tiene ${math(String(r))} cm de radio y ${math(String(h))} cm de altura. ¿Cuál es su volumen (cm³)? ${PI_NOTE.es}`,
            `أسطوانة نصف قطرها ${math(String(r))} سم وارتفاعها ${math(String(h))} سم. ما حجمها (سم³)؟ ${PI_NOTE.ar}`
        ), choices, right, same(math(`3{,}14\\cdot ${r}^{2}\\cdot ${h}=${w(right)}`)))
    }
    const [p, q] = [randomInt(random, 2, tier === 0 ? 8 : 14), randomInt(random, 2, tier === 0 ? 8 : 14)]
    const h = randomInt(random, 2, tier === 0 ? 10 : 20)
    const base = (p * q) / 2
    const right = n(base * h)
    const choices = options(random, right, [{ value: n(p * q * h), error: 'no-half' }, { value: n((base * h) / 3), error: 'no-third' }, { value: n(base + h), error: 'calculation' }, ...near(right)])
    if (!choices) return null
    return question(4, 'prism-volume', say(
        `Prisma baten oinarria ${math(String(p))} cm eta ${math(String(q))} cm-ko katetoak dituen triangelu angeluzuzena da, eta altuera ${math(String(h))} cm. Zein da bolumena (cm³)?`,
        `La base de un prisma es un triángulo rectángulo de catetos ${math(String(p))} cm y ${math(String(q))} cm, y su altura mide ${math(String(h))} cm. ¿Cuál es su volumen (cm³)?`,
        `قاعدة منشور مثلث قائم ضلعاه القائمان ${math(String(p))} سم و${math(String(q))} سم، وارتفاعه ${math(String(h))} سم. ما حجمه (سم³)؟`
    ), choices, right, same(math(`\\frac{${p}\\cdot ${q}}{2}\\cdot ${h}=${w(right)}`)))
}

function pyramidVolumeQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    const cone = random() < 0.5
    const r = randomInt(random, 1, tier === 0 ? 6 : 12)
    const h = 3 * randomInt(random, 1, tier === 0 ? 4 : 8)
    if (cone) {
        const right = pi((r * r * h) / 3)
        const choices = options(random, right, [{ value: pi(r * r * h), error: 'no-third' }, { value: pi((4 * r * r * h) / 3), error: 'diameter' }, { value: pi((r * h) / 3), error: 'no-square' }, ...near(right)])
        if (!choices) return null
        return question(4, 'cone-volume', say(
            `Kono batek ${math(String(r))} cm-ko erradioa eta ${math(String(h))} cm-ko altuera ditu. Zein da bolumena (cm³)? ${PI_NOTE.eu}`,
            `Un cono tiene ${math(String(r))} cm de radio y ${math(String(h))} cm de altura. ¿Cuál es su volumen (cm³)? ${PI_NOTE.es}`,
            `مخروط نصف قطره ${math(String(r))} سم وارتفاعه ${math(String(h))} سم. ما حجمه (سم³)؟ ${PI_NOTE.ar}`
        ), choices, right, same(math(`\\frac{3{,}14\\cdot ${r}^{2}\\cdot ${h}}{3}=${w(right)}`)))
    }
    const right = n((r * r * h) / 3)
    const choices = options(random, right, [{ value: n(r * r * h), error: 'no-third' }, { value: n((r * h) / 3), error: 'no-square' }, { value: n((r * r * h) / 2), error: 'calculation' }, ...near(right)])
    if (!choices) return null
    return question(4, 'pyramid-volume', say(
        `Piramide baten oinarria ${math(String(r))} cm-ko aldeko karratua da eta altuera ${math(String(h))} cm. Zein da bolumena (cm³)?`,
        `La base de una pirámide es un cuadrado de ${math(String(r))} cm de lado y su altura mide ${math(String(h))} cm. ¿Cuál es su volumen (cm³)?`,
        `قاعدة هرم مربع طول ضلعه ${math(String(r))} سم وارتفاعه ${math(String(h))} سم. ما حجمه (سم³)؟`
    ), choices, right, same(math(`\\frac{${r}^{2}\\cdot ${h}}{3}=${w(right)}`)))
}

function sphereVolumeQuestion(random: Random, tier: Tier): SolidsRaceQuestion | null {
    const r = pick(random, tier === 0 ? [3, 6] : [3, 6, 9, 1.5, 12])
    const cube = r * r * r
    const right = pi((4 * cube) / 3)
    const choices = options(random, right, [
        { value: pi(4 * cube), error: 'no-third' },
        { value: pi(4 * r * r), error: 'volume-area' },
        { value: pi((32 * cube) / 3), error: 'diameter' },
        ...near(right)
    ])
    if (!choices) return null
    return question(4, 'sphere-volume', say(
        `Zein da ${math(wn(r))} cm-ko erradioko esfera baten bolumena (cm³)? ${PI_NOTE.eu}`,
        `¿Cuál es el volumen de una esfera de ${math(wn(r))} cm de radio (cm³)? ${PI_NOTE.es}`,
        `ما حجم كرة نصف قطرها ${math(wn(r))} سم (سم³)؟ ${PI_NOTE.ar}`
    ), choices, right, same(math(`\\frac{4\\cdot 3{,}14\\cdot ${wn(r)}^{3}}{3}=${w(right)}`)))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => SolidsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [countQuestion, eulerQuestion],
    [cubeQuestion, cuboidQuestion, pyramidQuestion],
    [cylinderQuestion, coneQuestion, sphereQuestion],
    [convertQuestion, tankQuestion],
    [prismVolumeQuestion, pyramidVolumeQuestion, sphereVolumeQuestion]
]

export function generateSolidsRaceQuestion(random: Random, circuit: number, tier: Tier): SolidsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSolidsPitAnswer(question: SolidsRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(readSolidsAnswer(input), question.answer, question.answerForm)
}

export function solidsParTime(circuit: number): number {
    return parTimeFor([9, 11, 13, 11, 13][circuit] ?? 11)
}

export const solidsRaceErrorTips: Record<SolidsRaceError, LocalizedText> = {
    'formula-mix': say('Hori beste gorputzarena da: prismak bi oinarri ditu ($n+2$, $3n$, $2n$), piramideak bat ($n+1$, $2n$, $n+1$).', 'Eso es del otro cuerpo: el prisma tiene dos bases ($n+2$, $3n$, $2n$) y la pirámide una ($n+1$, $2n$, $n+1$).', 'هذا للجسم الآخر: للمنشور قاعدتان ($n+2$، $3n$، $2n$) وللهرم قاعدة واحدة ($n+1$، $2n$، $n+1$).'),
    'missing-bases': say('Oinarriak ahaztu dituzu.', 'Te has olvidado de las bases.', 'نسيت القاعدتين.'),
    euler: say('Euler: aurpegiak + erpinak = ertzak + 2. Begiratu 2 non dagoen.', 'Euler: caras + vértices = aristas + 2. Mira dónde va el 2.', 'أويلر: الأوجه + الرؤوس = الأحرف + 2. انتبه أين يوضع العدد 2.'),
    'one-face': say('Hori aurpegi bakarra (edo zirkulu bakarra) da.', 'Eso es una sola cara (o un solo círculo).', 'هذا وجه واحد (أو دائرة واحدة).'),
    'no-double': say('Bider 2 falta da (aurpegiak binaka, edo $2\\pi r$).', 'Falta multiplicar por 2 (caras dos a dos, o $2\\pi r$).', 'ينقص الضرب في 2 (الأوجه مثنى مثنى، أو $2\\pi r$).'),
    'no-half': say('Triangeluaren azalera zati 2 da.', 'El área del triángulo se divide entre 2.', 'مساحة المثلث تُقسم على 2.'),
    'height-apothem': say('Altuera erabili duzu: azalerarako apotema edo sortzailea behar da, Pitagorasekin.', 'Has usado la altura: para el área hace falta la apotema o la generatriz, con Pitágoras.', 'استعملت الارتفاع: للمساحة نحتاج العامد أو الراسم بفيثاغورس.'),
    diameter: say('Diametroa erabili duzu erradioaren ordez: erdia hartu.', 'Has usado el diámetro en lugar del radio: toma la mitad.', 'استعملت القطر بدل نصف القطر: خذ النصف.'),
    'no-square': say('Erradioa karratura jaso behar da.', 'El radio va al cuadrado.', 'يجب تربيع نصف القطر.'),
    'volume-area': say('Azalera eta bolumena nahastu dituzu.', 'Has confundido área y volumen.', 'خلطت بين المساحة والحجم.'),
    'step-ten': say('Bolumenean maila bakoitza 1000 da, ez 10.', 'En volumen cada escalón es 1000, no 10.', 'في الحجم كل درجة 1000 لا 10.'),
    'step-hundred': say('100 azalerarako da; bolumenean 1000.', '100 es para el área; en volumen, 1000.', '100 للمساحة؛ وفي الحجم 1000.'),
    direction: say('Unitate txikiagora jaistean biderkatu; handiagora igotzean zatitu.', 'Para bajar a una unidad menor se multiplica; para subir, se divide.', 'للنزول إلى وحدة أصغر نضرب؛ وللصعود نقسم.'),
    'no-third': say('Piramidea eta konoa prismaren eta zilindroaren herena dira; esfera $\\frac{4}{3}\\pi r^{3}$.', 'Pirámide y cono son un tercio del prisma y del cilindro; la esfera, $\\frac{4}{3}\\pi r^{3}$.', 'الهرم والمخروط ثلث المنشور والأسطوانة؛ والكرة $\\frac{4}{3}\\pi r^{3}$.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
