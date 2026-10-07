import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { figuresRaceErrorTips, generateFiguresRaceQuestion, type FiguresRaceError } from '../../dbh1-figurak-v2/games/race.ts'
import { generatePythagorasRaceQuestion, pythagorasRaceErrorTips, type PythagorasRaceError } from '../../dbh2-pitagoras-v2/games/race.ts'
import { generateSolidsRaceQuestion, solidsRaceErrorTips, written, type SolidsRaceError } from '../../dbh2-gorputzak-v2/games/race.ts'
import { readSolidsAnswer } from '../../dbh2-gorputzak-v2/answers.ts'

/* ==========================================================================
   Perimetroen, azaleren eta bolumenen lasterketa (4. DBH aplikatuak): five
   circuits, one per stage. Each circuit mixes questions borrowed from the
   1. DBH plane figures race, the 2. DBH Pythagoras race and the 2. DBH
   solids race (renumbered, their mistakes kept under a prefix so each
   keeps its own tip) with new ones: the length of a circle or an arc, the
   area of a triangle, rhombus, trapezoid or regular polygon, and the
   volume of compound solids (ice cream cone, capsule, tower). π ≈ 3,14;
   every answer is an exact decimal with at most two decimals, so every
   question can be written at the pit stop.
   ========================================================================== */

export const AREAS_VOLUMES_RACE_CIRCUITS = 5

type OwnError = 'circle-area' | 'circle-half' | 'circle-diameter' | 'arc-whole' | 'area-no-half' | 'perimeter-only' | 'trapezoid-one-base' | 'missing-part' | 'whole-sphere' | 'cone-third' | 'calculation'

export type AreasVolumesRaceError = OwnError | `fig:${FiguresRaceError}` | `pyt:${PythagorasRaceError}` | `sol:${SolidsRaceError}`

export type AreasVolumesRaceQuestion = RaceQuestion<AreasVolumesRaceError>

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`
/** Hundredths as an exact value */
const h = (hundredths: number) => fraction(hundredths, 100)
const w = (hundredths: number) => written(h(hundredths)) ?? '?'

interface Candidate {
    hundredths: number
    error: OwnError
}

/** The right option and three different positive mistakes, all written as exact decimals */
function options(random: Random, right: number, candidates: Candidate[]): RaceOption<AreasVolumesRaceError>[] | null {
    const rightLatex = written(h(right))
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: OwnError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (candidate.hundredths <= 0 || !Number.isInteger(candidate.hundredths)) continue
        const latex = written(h(candidate.hundredths))
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

const near = (hundredths: number): Candidate[] => [hundredths + 100, hundredths - 100, hundredths + 314, hundredths * 2].map((value) => ({ hundredths: value, error: 'calculation' as const }))

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<AreasVolumesRaceError>[], answer: number, solution: LocalizedText): AreasVolumesRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: h(answer), answerForm: 'any', percentAnswer: false, writable: true, solution }
}

/** A question from another race, renumbered, with its mistakes under a prefix */
function borrowed<Error extends string>(source: RaceQuestion<Error>, circuit: number, prefix: 'fig' | 'pyt' | 'sol'): AreasVolumesRaceQuestion {
    return {
        ...source,
        circuit,
        kind: `${prefix}:${source.kind}`,
        options: source.options.map((option) => ({ ...option, error: option.error === null ? null : (`${prefix}:${option.error}` as AreasVolumesRaceError) }))
    }
}

/* ---------- Circuit 0: the circle and its arcs ---------- */

function circleQuestion(random: Random, tier: Tier): AreasVolumesRaceQuestion | null {
    const r = randomInt(random, 1, tier === 0 ? 10 : 20)
    const fromDiameter = tier > 0 && random() < 0.4
    const shown = fromDiameter ? 2 * r : r
    const whole = 628 * r
    const data = fromDiameter ? say(`${math(String(shown))} cm-ko diametroa`, `${math(String(shown))} cm de diámetro`, `قطرها ${math(String(shown))} سم`) : say(`${math(String(shown))} cm-ko erradioa`, `${math(String(shown))} cm de radio`, `نصف قطرها ${math(String(shown))} سم`)
    if (tier === 2 || (tier === 1 && random() < 0.5)) {
        const angle = pick(random, [30, 45, 60, 90, 120, 180, 270])
        if ((whole * angle) % 360 !== 0) return null
        const answer = (whole * angle) / 360
        const choices = options(random, answer, [
            { hundredths: whole, error: 'arc-whole' },
            { hundredths: (314 * r * r * angle) / 360, error: 'circle-area' },
            { hundredths: answer / 2, error: 'circle-half' },
            ...(fromDiameter ? [{ hundredths: answer * 2, error: 'circle-diameter' as const }] : []),
            ...near(answer)
        ])
        return choices && question(0, 'arc', say(
            `Zirkunferentzia batek ${data.eu} du. Zenbat neurtzen du ${math(`${angle}^{\\circ}`)}-ko arkuak? (${math('\\pi\\approx 3{,}14')})`,
            `Una circunferencia tiene ${data.es}. ¿Cuánto mide un arco de ${math(`${angle}^{\\circ}`)}? (${math('\\pi\\approx 3{,}14')})`,
            `دائرة ${data.ar}. كم طول قوس ${math(`${angle}^{\\circ}`)}؟ (${math('\\pi\\approx 3{,}14')})`
        ), choices, answer, same(math(`\\frac{2\\cdot 3{,}14\\cdot ${r}\\cdot ${angle}}{360}=${w(answer)}`)))
    }
    const choices = options(random, whole, [
        { hundredths: 314 * r * r, error: 'circle-area' },
        { hundredths: 314 * r, error: 'circle-half' },
        ...(fromDiameter ? [{ hundredths: 2 * whole, error: 'circle-diameter' as const }] : []),
        ...near(whole)
    ])
    return choices && question(0, 'circumference', say(
        `Zenbat neurtzen du ${data.eu} duen zirkunferentziak? (${math('\\pi\\approx 3{,}14')})`,
        `¿Cuánto mide una circunferencia de ${data.es}? (${math('\\pi\\approx 3{,}14')})`,
        `كم طول دائرة ${data.ar}؟ (${math('\\pi\\approx 3{,}14')})`
    ), choices, whole, same(math(`2\\cdot 3{,}14\\cdot ${r}=${w(whole)}`)))
}

/* ---------- Circuit 2: areas of polygons ---------- */

type Shape = 'triangle' | 'rhombus' | 'trapezoid' | 'regular'
const regularNames: Record<number, LocalizedText> = {
    5: say('pentagono', 'pentágono', 'مخمس'),
    6: say('hexagono', 'hexágono', 'مسدس'),
    8: say('oktogono', 'octógono', 'مثمن')
}

function polygonAreaQuestion(random: Random, tier: Tier): AreasVolumesRaceQuestion | null {
    const shape = pick(random, (tier === 0 ? ['triangle', 'rhombus', 'trapezoid'] : ['triangle', 'rhombus', 'trapezoid', 'regular', 'regular']) as Shape[])
    if (shape === 'triangle') {
        const b = randomInt(random, 3, tier === 0 ? 12 : 20)
        const height = randomInt(random, 2, tier === 0 ? 10 : 15)
        const answer = (100 * b * height) / 2
        const choices = options(random, answer, [{ hundredths: 100 * b * height, error: 'area-no-half' }, { hundredths: 100 * (b + height), error: 'perimeter-only' }, ...near(answer)])
        return choices && question(2, 'triangle', say(
            `Triangelu baten oinarria ${math(String(b))} cm da eta altuera ${math(String(height))} cm. Zein da azalera?`,
            `Un triángulo tiene ${math(String(b))} cm de base y ${math(String(height))} cm de altura. ¿Cuál es su área?`,
            `مثلث قاعدته ${math(String(b))} سم وارتفاعه ${math(String(height))} سم. ما مساحته؟`
        ), choices, answer, same(math(`\\frac{${b}\\cdot ${height}}{2}=${w(answer)}`)))
    }
    if (shape === 'rhombus') {
        const D = randomInt(random, 4, tier === 0 ? 12 : 20)
        const d = randomInt(random, 2, D - 1)
        const answer = (100 * D * d) / 2
        const choices = options(random, answer, [{ hundredths: 100 * D * d, error: 'area-no-half' }, { hundredths: 100 * (D + d), error: 'perimeter-only' }, ...near(answer)])
        return choices && question(2, 'rhombus', say(
            `Erronbo baten diagonalak ${math(String(D))} cm eta ${math(String(d))} cm dira. Zein da azalera?`,
            `Las diagonales de un rombo miden ${math(String(D))} cm y ${math(String(d))} cm. ¿Cuál es su área?`,
            `قطرا معيّن ${math(String(D))} سم و${math(String(d))} سم. ما مساحته؟`
        ), choices, answer, same(math(`\\frac{${D}\\cdot ${d}}{2}=${w(answer)}`)))
    }
    if (shape === 'trapezoid') {
        const B = randomInt(random, 5, tier === 0 ? 12 : 20)
        const b = randomInt(random, 2, B - 1)
        const height = randomInt(random, 2, 10)
        const answer = (100 * (B + b) * height) / 2
        const choices = options(random, answer, [{ hundredths: 100 * (B + b) * height, error: 'area-no-half' }, { hundredths: 100 * B * height, error: 'trapezoid-one-base' }, { hundredths: (100 * B * b * height) / 2, error: 'calculation' }, ...near(answer)])
        return choices && question(2, 'trapezoid', say(
            `Trapezio baten oinarriak ${math(String(B))} cm eta ${math(String(b))} cm dira, eta altuera ${math(String(height))} cm. Zein da azalera?`,
            `Un trapecio tiene bases de ${math(String(B))} cm y ${math(String(b))} cm y ${math(String(height))} cm de altura. ¿Cuál es su área?`,
            `شبه منحرف قاعدتاه ${math(String(B))} سم و${math(String(b))} سم وارتفاعه ${math(String(height))} سم. ما مساحته؟`
        ), choices, answer, same(math(`\\frac{(${B}+${b})\\cdot ${height}}{2}=${w(answer)}`)))
    }
    // Regular polygon with an apothem of one decimal, as the textbook gives it
    const sides = pick(random, [5, 6, 8])
    const side = randomInt(random, 2, 12)
    const apothemTenths = Math.round((side / (2 * Math.tan(Math.PI / sides))) * 10)
    const perimeter = sides * side
    const answer = (perimeter * apothemTenths * 10) / 2
    if (!Number.isInteger(answer)) return null
    const a = (apothemTenths / 10).toString().replace('.', '{,}')
    const choices = options(random, answer, [{ hundredths: perimeter * apothemTenths * 10, error: 'area-no-half' }, { hundredths: (side * apothemTenths * 10) / 2, error: 'perimeter-only' }, ...near(answer)])
    return choices && question(2, 'regular', say(
        `${regularNames[sides].eu.replace(/^./, (letter) => letter.toUpperCase())} erregular baten aldea ${math(String(side))} cm da eta apotema ${math(a)} cm. Zein da azalera?`,
        `Un ${regularNames[sides].es} regular tiene ${math(String(side))} cm de lado y ${math(a)} cm de apotema. ¿Cuál es su área?`,
        `${regularNames[sides].ar} منتظم طول ضلعه ${math(String(side))} سم وعامده ${math(a)} سم. ما مساحته؟`
    ), choices, answer, same(math(`\\frac{${perimeter}\\cdot ${a}}{2}=${w(answer)}`)))
}

/* ---------- Circuit 4: compound solids ---------- */

type Compound = 'ice-cream' | 'capsule' | 'tower'

/** Thirds of π to hundredths with π ≈ 3,14, only when exact */
const fromThirds = (thirds: number) => (thirds % 3 === 0 ? (314 * thirds) / 3 : null)

function compoundQuestion(random: Random, tier: Tier): AreasVolumesRaceQuestion | null {
    const kind = pick(random, ['ice-cream', 'capsule', 'tower'] as Compound[])
    const r = randomInt(random, 1, tier === 0 ? 4 : 6)
    const height = randomInt(random, 2, tier === 0 ? 10 : 15)
    const cylinder = 3 * r * r * height
    const cone = r * r * height
    const hemisphere = 2 * r * r * r
    let parts: [number, number]
    let candidates: Candidate[]
    let prompt: LocalizedText
    let solution: string
    if (kind === 'ice-cream') {
        parts = [cone, hemisphere]
        const answer = fromThirds(cone + hemisphere)
        if (answer === null) return null
        candidates = [
            { hundredths: fromThirds(cone) ?? 0, error: 'missing-part' },
            { hundredths: fromThirds(cone + 2 * hemisphere) ?? 0, error: 'whole-sphere' },
            { hundredths: fromThirds(3 * cone + hemisphere) ?? 0, error: 'cone-third' }
        ]
        prompt = say(
            `Izozki-kono batek ${math(String(r))} cm-ko erradioa eta ${math(String(height))} cm-ko altuera ditu, eta gainean esfera-erdi bat. Zenbat cm³ izozki dauzka?`,
            `Un cucurucho tiene ${math(String(r))} cm de radio y ${math(String(height))} cm de altura, con una semiesfera encima. ¿Cuántos cm³ de helado contiene?`,
            `مخروط مثلّجة نصف قطره ${math(String(r))} سم وارتفاعه ${math(String(height))} سم وفوقه نصف كرة. كم سم³ من المثلّجات فيه؟`
        )
        solution = `\\frac{3{,}14\\cdot ${r * r}\\cdot ${height}}{3}+\\frac{2\\cdot 3{,}14\\cdot ${r ** 3}}{3}=${w(answer)}`
    } else if (kind === 'capsule') {
        parts = [cylinder, 2 * hemisphere]
        const answer = fromThirds(cylinder + 2 * hemisphere)
        if (answer === null) return null
        candidates = [
            { hundredths: fromThirds(cylinder) ?? 0, error: 'missing-part' },
            { hundredths: fromThirds(cylinder + hemisphere) ?? 0, error: 'whole-sphere' },
            { hundredths: fromThirds(cylinder + 4 * hemisphere) ?? 0, error: 'whole-sphere' }
        ]
        prompt = say(
            `Kapsula bat ${math(String(r))} m-ko erradioko eta ${math(String(height))} m-ko zilindroa da, muturretan esfera-erdi banarekin. Zein da bolumena m³-tan?`,
            `Una cápsula es un cilindro de ${math(String(r))} m de radio y ${math(String(height))} m de largo con una semiesfera en cada extremo. ¿Cuál es su volumen en m³?`,
            `كبسولة أسطوانة نصف قطرها ${math(String(r))} م وطولها ${math(String(height))} م مع نصف كرة في كل طرف. ما حجمها بالمتر المكعب؟`
        )
        solution = `3{,}14\\cdot ${r * r}\\cdot ${height}+\\frac{4\\cdot 3{,}14\\cdot ${r ** 3}}{3}=${w(answer)}`
    } else {
        const roof = randomInt(random, 1, 4) * 3
        const roofCone = r * r * roof
        parts = [cylinder, roofCone]
        const answer = fromThirds(cylinder + roofCone)
        if (answer === null) return null
        candidates = [
            { hundredths: fromThirds(cylinder) ?? 0, error: 'missing-part' },
            { hundredths: fromThirds(cylinder + 3 * roofCone) ?? 0, error: 'cone-third' }
        ]
        prompt = say(
            `Dorre bat ${math(String(r))} m-ko erradioko eta ${math(String(height))} m-ko altuerako zilindroa da, gainean ${math(String(roof))} m-ko altuerako teilatu konikoa duela. Zein da bolumena m³-tan?`,
            `Una torre es un cilindro de ${math(String(r))} m de radio y ${math(String(height))} m de altura con un tejado cónico de ${math(String(roof))} m de altura. ¿Cuál es su volumen en m³?`,
            `برج أسطوانة نصف قطرها ${math(String(r))} م وارتفاعها ${math(String(height))} م فوقها سقف مخروطي ارتفاعه ${math(String(roof))} م. ما حجمه بالمتر المكعب؟`
        )
        solution = `3{,}14\\cdot ${r * r}\\cdot ${height}+\\frac{3{,}14\\cdot ${r * r}\\cdot ${roof}}{3}=${w(answer)}`
    }
    const answer = fromThirds(parts[0] + parts[1])!
    const choices = options(random, answer, [...candidates, ...near(answer)])
    const piNote = ` (${math('\\pi\\approx 3{,}14')})`
    const withPi = say(prompt.eu + piNote, prompt.es + piNote, prompt.ar + piNote)
    return choices && question(4, kind, withPi, choices, answer, same(math(solution)))
}

/* ---------- Circuits ---------- */

type Generator = (random: Random, tier: Tier) => AreasVolumesRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [(random, tier) => borrowed(generateFiguresRaceQuestion(random, 0, tier), 0, 'fig'), circleQuestion, circleQuestion],
    [(random, tier) => borrowed(generatePythagorasRaceQuestion(random, pick(random, [1, 2, 4]), tier), 1, 'pyt')],
    [(random, tier) => borrowed(generateFiguresRaceQuestion(random, 4, tier), 2, 'fig'), polygonAreaQuestion, polygonAreaQuestion],
    [(random, tier) => borrowed(generateSolidsRaceQuestion(random, pick(random, [1, 2]), tier), 3, 'sol')],
    [(random, tier) => borrowed(generateSolidsRaceQuestion(random, 4, tier), 4, 'sol'), compoundQuestion]
]

export function generateAreasVolumesRaceQuestion(random: Random, circuit: number, tier: Tier): AreasVolumesRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkAreasVolumesPitAnswer(question: AreasVolumesRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(readSolidsAnswer(input), question.answer as FractionValue, question.answerForm)
}

export function areasVolumesParTime(circuit: number): number {
    return parTimeFor([11, 12, 12, 12, 14][circuit] ?? 12)
}

const prefixed = <Error extends string>(prefix: string, tips: Record<Error, LocalizedText>) =>
    Object.fromEntries(Object.entries(tips).map(([key, tip]) => [`${prefix}:${key}`, tip])) as Record<string, LocalizedText>

export const areasVolumesRaceErrorTips: Record<AreasVolumesRaceError, LocalizedText> = {
    ...(prefixed('fig', figuresRaceErrorTips) as Record<`fig:${FiguresRaceError}`, LocalizedText>),
    ...(prefixed('pyt', pythagorasRaceErrorTips) as Record<`pyt:${PythagorasRaceError}`, LocalizedText>),
    ...(prefixed('sol', solidsRaceErrorTips) as Record<`sol:${SolidsRaceError}`, LocalizedText>),
    'circle-area': say('Hori azalera da ($\\pi r^{2}$); luzerarako $2\\pi r$.', 'Eso es el área ($\\pi r^{2}$); para la longitud, $2\\pi r$.', 'هذه المساحة ($\\pi r^{2}$)؛ وللطول $2\\pi r$.'),
    'circle-half': say('Bider 2 falta da: $2\\pi r$.', 'Falta multiplicar por 2: $2\\pi r$.', 'ينقص الضرب في 2: $2\\pi r$.'),
    'circle-diameter': say('Diametroa erabili duzu erradioaren ordez: erdia hartu.', 'Has usado el diámetro como radio: toma la mitad.', 'استعملت القطر مكان نصف القطر: خذ النصف.'),
    'arc-whole': say('Hori zirkunferentzia osoa da: hartu angelua zati 360.', 'Esa es la circunferencia entera: toma el ángulo entre 360.', 'هذه الدائرة كاملة: خذ الزاوية على 360.'),
    'area-no-half': say('Formula honetan zati 2 egin behar da.', 'En esta fórmula hay que dividir entre 2.', 'في هذه الصيغة يجب القسمة على 2.'),
    'perimeter-only': say('Hori ez da azalera: biderkatu altuerarekin edo apotemarekin.', 'Eso no es el área: multiplica por la altura o la apotema.', 'هذه ليست المساحة: اضرب في الارتفاع أو العامد.'),
    'trapezoid-one-base': say('Trapezioan bi oinarriak batu behar dira: $(B+b)$.', 'En el trapecio se suman las dos bases: $(B+b)$.', 'في شبه المنحرف تُجمع القاعدتان: $(B+b)$.'),
    'missing-part': say('Zati bat ahaztu duzu: batu gorputzaren zati guztiak.', 'Has olvidado una parte: suma todas las partes del cuerpo.', 'نسيت جزءًا: اجمع كل أجزاء الجسم.'),
    'whole-sphere': say('Begiratu zenbat esfera-erdi dauden: bi esfera-erdi esfera oso bat dira.', 'Mira cuántas semiesferas hay: dos semiesferas son una esfera entera.', 'انظر كم نصف كرة هناك: نصفا الكرة كرة كاملة.'),
    'cone-third': say('Konoaren bolumena zati 3 da.', 'El volumen del cono se divide entre 3.', 'حجم المخروط يُقسم على 3.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
