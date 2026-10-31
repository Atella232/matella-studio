import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Geometriaren lasterketa (3. DBH): five circuits, one per stage — angles
   of polygons and circles; bisectors, medians and the circumcircle;
   Pythagoras with whole-number triples; areas of polygons; Thales, scale
   factors and areas of similar shapes. Every answer is a whole number and
   every question carries `meta`, so that the tests can work it out again.
   ========================================================================== */

export const GEOMETRY3_RACE_CIRCUITS = 5

export type Geometry3RaceError = 'n-triangles' | 'exterior-interior' | 'inscribed-double' | 'root-split' | 'leg-add' | 'triangle-half' | 'area-k' | 'thales-swap' | 'sign' | 'calculation'

export type Geometry3RaceQuestion = RaceQuestion<Geometry3RaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })

interface Candidate {
    value: number
    error: Geometry3RaceError
}
const wrong = (value: number, error: Geometry3RaceError): Candidate => ({ value, error })

function options(random: Random, right: number, candidates: Candidate[]): RaceOption<Geometry3RaceError>[] | null {
    const used = new Set([right])
    const chosen: Candidate[] = []
    for (const candidate of [...candidates, wrong(right + 10, 'calculation'), wrong(right * 2, 'calculation'), wrong(right + 1, 'calculation')]) {
        if (chosen.length === 3) break
        if (!Number.isInteger(candidate.value) || candidate.value <= 0 || used.has(candidate.value)) continue
        used.add(candidate.value)
        chosen.push(candidate)
    }
    if (chosen.length < 3) return null
    return shuffle(random, [{ latex: String(right), correct: true, error: null }, ...chosen.map((item) => ({ latex: String(item.value), correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Geometry3RaceError>[], answer: number, solution: LocalizedText, meta: Record<string, number>): Geometry3RaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer), answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25], [10, 24, 26], [20, 21, 29]]

/* ---------- Circuit 0: angles ---------- */

function polygonSum(random: Random): Geometry3RaceQuestion | null {
    const n = randomInt(random, 4, 12)
    const answer = (n - 2) * 180
    const choices = options(random, answer, [wrong(n * 180, 'n-triangles'), wrong((n - 1) * 180, 'n-triangles'), wrong(360, 'calculation')])
    return choices && build(0, 'polygon-sum', say(`${n} aldeko poligono: barne-angeluen batura (°)?`, `Polígono de ${n} lados: ¿suma de los ángulos interiores (°)?`, `مضلع ذو ${n} أضلاع: مجموع الزوايا الداخلية (°)؟`, `Polygon with ${n} sides: sum of the interior angles (°)?`), choices, answer, same(`(${n}-2)\\cdot 180°=${answer}°`), { n })
}

function regularInterior(random: Random): Geometry3RaceQuestion | null {
    const n = pick(random, [3, 4, 5, 6, 8, 9, 10, 12, 18, 20])
    const answer = 180 - 360 / n
    const choices = options(random, answer, [wrong(360 / n, 'exterior-interior'), wrong(180 / n, 'calculation'), wrong(answer + 10, 'calculation')])
    return choices && build(0, 'regular-interior', say(`${n} aldeko poligono erregularra: barne-angelua (°)?`, `Polígono regular de ${n} lados: ¿ángulo interior (°)?`, `مضلع منتظم ذو ${n} أضلاع: الزاوية الداخلية (°)؟`, `Regular polygon with ${n} sides: interior angle (°)?`), choices, answer, same(`180°-\\frac{360°}{${n}}=${answer}°`), { n })
}

function inscribed(random: Random): Geometry3RaceQuestion | null {
    const central = randomInt(random, 2, 17) * 10
    const answer = central / 2
    const choices = options(random, answer, [wrong(2 * central, 'inscribed-double'), wrong(central, 'calculation'), wrong(180 - answer, 'calculation')])
    return choices && build(0, 'inscribed', say(`Angelu zentrala ${central}°. Inskribatua (°)?`, `Ángulo central ${central}°. ¿Inscrito (°)?`, `زاوية مركزية ${central}°. المحيطية (°)؟`, `Central angle ${central}°. Inscribed (°)?`), choices, answer, same(`\\frac{${central}°}{2}=${answer}°`), { central })
}

/* ---------- Circuit 1: loci and notable points ---------- */

function bisector(random: Random): Geometry3RaceQuestion | null {
    const angle = randomInt(random, 5, 34) * 2
    const answer = angle / 2
    const choices = options(random, answer, [wrong(angle, 'calculation'), wrong(2 * angle, 'calculation'), wrong(90 - answer, 'calculation')])
    return choices && build(1, 'bisector', say(`${angle}°-ko angelu baten erdikariak sortzen duen angelu bakoitza (°)?`, `¿Cada ángulo que forma la bisectriz de un ángulo de ${angle}° (°)?`, `كل زاوية يكوّنها منصّف زاوية ${angle}° (°)؟`, `Each angle made by the bisector of a ${angle}° angle (°)?`), choices, answer, same(`\\frac{${angle}°}{2}=${answer}°`), { angle })
}

function centroid(random: Random): Geometry3RaceQuestion | null {
    const median = randomInt(random, 2, 15) * 3
    const fromVertex = random() < 0.6
    const answer = fromVertex ? (2 * median) / 3 : median / 3
    const choices = options(random, answer, [wrong(fromVertex ? median / 3 : (2 * median) / 3, 'calculation'), wrong(median / 2, 'calculation'), wrong(median, 'calculation')])
    return choices && build(1, fromVertex ? 'centroid-vertex' : 'centroid-side', fromVertex
        ? say(`Mediana: ${median} cm. Barizentrotik erpinera (cm)?`, `Mediana: ${median} cm. ¿Del baricentro al vértice (cm)?`, `المتوسط: ${median} سم. من مركز الثقل إلى الرأس (سم)؟`, `Median: ${median} cm. From the centroid to the vertex (cm)?`)
        : say(`Mediana: ${median} cm. Barizentrotik aldearen erdira (cm)?`, `Mediana: ${median} cm. ¿Del baricentro al punto medio del lado (cm)?`, `المتوسط: ${median} سم. من مركز الثقل إلى منتصف الضلع (سم)؟`, `Median: ${median} cm. From the centroid to the midpoint of the side (cm)?`), choices, answer, same(fromVertex ? `\\frac{2}{3}\\cdot ${median}=${answer}` : `\\frac{${median}}{3}=${answer}`), { median, fromVertex: fromVertex ? 1 : 0 })
}

function midpoint(random: Random): Geometry3RaceQuestion | null {
    const a = randomInt(random, -8, 6)
    const b = a + 2 * randomInt(random, 2, 8)
    const answer = (a + b) / 2
    const choices = options(random, answer, [wrong(b - a, 'calculation'), wrong((b - a) / 2, 'calculation'), wrong(a + b, 'calculation')])
    return choices && build(1, 'midpoint', say(`$A=(${a},0)$ eta $B=(${b},0)$. Erdibitzailea: $x=k$. Zenbat da $k$?`, `$A=(${a},0)$ y $B=(${b},0)$. Mediatriz: $x=k$. ¿Cuánto vale $k$?`, `$A=(${a},0)$ و$B=(${b},0)$. المنصّف العمودي: $x=k$. كم يساوي $k$؟`, `$A=(${a},0)$ and $B=(${b},0)$. Perpendicular bisector: $x=k$. What is $k$?`), choices, answer, same(`\\frac{${a}+${b}}{2}=${answer}`), { a, b })
}

/* ---------- Circuit 2: Pythagoras ---------- */

function hypotenuse(random: Random): Geometry3RaceQuestion | null {
    const [b, c, a] = pick(random, TRIPLES)
    const choices = options(random, a, [wrong(b + c, 'root-split'), wrong(c, 'calculation'), wrong(a + 1, 'calculation')])
    return choices && build(2, 'hypotenuse', say(`Katetoak ${b} eta ${c}. Hipotenusa?`, `Catetos ${b} y ${c}. ¿Hipotenusa?`, `ضلعان قائمان ${b} و${c}. الوتر؟`, `Legs ${b} and ${c}. Hypotenuse?`), choices, a, same(`\\sqrt{${b * b}+${c * c}}=${a}`), { b, c })
}

function leg(random: Random): Geometry3RaceQuestion | null {
    const [b, c, a] = pick(random, TRIPLES)
    const choices = options(random, b, [wrong(a - c, 'calculation'), wrong(a + c, 'leg-add'), wrong(c, 'calculation')])
    return choices && build(2, 'leg', say(`Hipotenusa ${a} eta kateto bat ${c}. Bestea?`, `Hipotenusa ${a} y un cateto ${c}. ¿El otro?`, `الوتر ${a} وضلع قائم ${c}. الآخر؟`, `Hypotenuse ${a} and one leg ${c}. The other?`), choices, b, same(`\\sqrt{${a * a}-${c * c}}=${b}`), { a, c })
}

function distance(random: Random): Geometry3RaceQuestion | null {
    const [dx, dy, d] = pick(random, TRIPLES.slice(0, 6))
    const x = randomInt(random, -4, 4)
    const y = randomInt(random, -4, 4)
    const choices = options(random, d, [wrong(dx + dy, 'root-split'), wrong(d * d, 'calculation'), wrong(dy, 'calculation')])
    return choices && build(2, 'distance', say(`Distantzia $(${x},${y})$ eta $(${x + dx},${y + dy})$ artean?`, `¿Distancia entre $(${x},${y})$ y $(${x + dx},${y + dy})$?`, `المسافة بين $(${x},${y})$ و$(${x + dx},${y + dy})$؟`, `Distance between $(${x},${y})$ and $(${x + dx},${y + dy})$?`), choices, d, same(`\\sqrt{${dx}^{2}+${dy}^{2}}=${d}`), { x, y, x2: x + dx, y2: y + dy })
}

/* ---------- Circuit 3: areas ---------- */

function triangleArea(random: Random): Geometry3RaceQuestion | null {
    const base = randomInt(random, 3, 16)
    const height = 2 * randomInt(random, 2, 8)
    const answer = (base * height) / 2
    const choices = options(random, answer, [wrong(base * height, 'triangle-half'), wrong(base + height, 'calculation'), wrong(answer + base, 'calculation')])
    return choices && build(3, 'triangle', say(`Triangelua: oinarria ${base}, altuera ${height}. Azalera?`, `Triángulo: base ${base}, altura ${height}. ¿Área?`, `مثلث: القاعدة ${base} والارتفاع ${height}. المساحة؟`, `Triangle: base ${base}, height ${height}. Area?`), choices, answer, same(`\\frac{${base}\\cdot ${height}}{2}=${answer}`), { base, height })
}

function trapezium(random: Random): Geometry3RaceQuestion | null {
    const big = randomInt(random, 6, 16)
    const small = randomInt(random, 2, big - 2)
    const height = 2 * randomInt(random, 1, 6)
    const answer = ((big + small) * height) / 2
    const choices = options(random, answer, [wrong((big + small) * height, 'triangle-half'), wrong(big * small * height, 'calculation'), wrong(big * height, 'calculation')])
    return choices && build(3, 'trapezium', say(`Trapezioa: oinarriak ${big} eta ${small}, altuera ${height}. Azalera?`, `Trapecio: bases ${big} y ${small}, altura ${height}. ¿Área?`, `شبه منحرف: القاعدتان ${big} و${small} والارتفاع ${height}. المساحة؟`, `Trapezium: bases ${big} and ${small}, height ${height}. Area?`), choices, answer, same(`\\frac{(${big}+${small})\\cdot ${height}}{2}=${answer}`), { big, small, height })
}

function rhombus(random: Random): Geometry3RaceQuestion | null {
    const long = 2 * randomInt(random, 3, 10)
    const short = randomInt(random, 2, long - 1)
    const answer = (long * short) / 2
    const choices = options(random, answer, [wrong(long * short, 'triangle-half'), wrong(long + short, 'calculation'), wrong(2 * (long + short), 'calculation')])
    return choices && build(3, 'rhombus', say(`Erronboa: diagonalak ${long} eta ${short}. Azalera?`, `Rombo: diagonales ${long} y ${short}. ¿Área?`, `معيّن: القطران ${long} و${short}. المساحة؟`, `Rhombus: diagonals ${long} and ${short}. Area?`), choices, answer, same(`\\frac{${long}\\cdot ${short}}{2}=${answer}`), { long, short })
}

/* ---------- Circuit 4: similarity ---------- */

function thales(random: Random): Geometry3RaceQuestion | null {
    const a = randomInt(random, 2, 8)
    const b = randomInt(random, 2, 9)
    const k = randomInt(random, 2, 4)
    const c = a * k
    const answer = b * k
    const choices = options(random, answer, [wrong((a * c) / b, 'thales-swap'), wrong(b + (c - a), 'calculation'), wrong(c, 'calculation')])
    return choices && build(4, 'thales', say(`$\\frac{${a}}{${b}}=\\frac{${c}}{x}$. Zenbat da $x$?`, `$\\frac{${a}}{${b}}=\\frac{${c}}{x}$. ¿Cuánto vale $x$?`, `$\\frac{${a}}{${b}}=\\frac{${c}}{x}$. كم يساوي $x$؟`, `$\\frac{${a}}{${b}}=\\frac{${c}}{x}$. What is $x$?`), choices, answer, same(`x=\\frac{${b}\\cdot ${c}}{${a}}=${answer}`), { a, b, c })
}

function areaRatio(random: Random): Geometry3RaceQuestion | null {
    const area = randomInt(random, 2, 15)
    const k = randomInt(random, 2, 4)
    const answer = area * k * k
    const choices = options(random, answer, [wrong(area * k, 'area-k'), wrong(area * 2 * k, 'calculation'), wrong(area + k * k, 'calculation')])
    return choices && build(4, 'area-ratio', say(`Azalera ${area}. Aldeak bider ${k}. Azalera berria?`, `Área ${area}. Lados por ${k}. ¿Área nueva?`, `المساحة ${area}. الأضلاع في ${k}. المساحة الجديدة؟`, `Area ${area}. Sides times ${k}. New area?`), choices, answer, same(`${area}\\cdot ${k}^{2}=${answer}`), { area, k })
}

function shadow(random: Random): Geometry3RaceQuestion | null {
    const stick = randomInt(random, 1, 4)
    const stickShadow = randomInt(random, 1, 5)
    const k = randomInt(random, 2, 6)
    const shadowLength = stickShadow * k
    const answer = stick * k
    const choices = options(random, answer, [wrong((stickShadow * shadowLength) / stick, 'thales-swap'), wrong(shadowLength, 'calculation'), wrong(answer + stick, 'calculation')])
    return choices && build(4, 'shadow', say(`${stick} m-ko makilak ${stickShadow} m-ko itzala; zuhaitzak ${shadowLength} m-koa. Zuhaitza (m)?`, `Un palo de ${stick} m da ${stickShadow} m de sombra; un árbol, ${shadowLength} m. ¿Árbol (m)?`, `عصا ${stick} م ظلها ${stickShadow} م؛ وظل شجرة ${shadowLength} م. الشجرة (م)؟`, `A ${stick} m stick casts ${stickShadow} m of shadow; a tree, ${shadowLength} m. The tree (m)?`), choices, answer, same(`\\frac{${stick}\\cdot ${shadowLength}}{${stickShadow}}=${answer}`), { stick, stickShadow, shadowLength })
}

type Generator = (random: Random, tier: Tier) => Geometry3RaceQuestion | null

const circuitGenerators: Generator[][] = [
    [polygonSum, regularInterior, inscribed],
    [bisector, centroid, midpoint],
    [hypotenuse, leg, distance],
    [triangleArea, trapezium, rhombus],
    [thales, areaRatio, shadow]
]

export function generateGeometry3RaceQuestion(random: Random, circuit: number, tier: Tier): Geometry3RaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkGeometry3PitAnswer(question: RaceQuestion<Geometry3RaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function geometry3ParTime(circuit: number): number {
    return parTimeFor([13, 13, 14, 14, 15][circuit] ?? 13)
}

export const geometry3RaceErrorTips: Record<Geometry3RaceError, LocalizedText> = {
    'n-triangles': say('$n$ aldeko poligonoa: $n-2$ triangelu.', 'Polígono de $n$ lados: $n-2$ triángulos.', 'المضلع ذو $n$ ضلعًا: $n-2$ مثلثًا.', 'A polygon with $n$ sides: $n-2$ triangles.'),
    'exterior-interior': say('$\\frac{360°}{n}$ kanpokoa da.', '$\\frac{360°}{n}$ es el exterior.', '$\\frac{360°}{n}$ هي الخارجية.', '$\\frac{360°}{n}$ is the exterior angle.'),
    'inscribed-double': say('Inskribatua: zentralaren erdia.', 'Inscrito: la mitad del central.', 'المحيطية: نصف المركزية.', 'Inscribed: half the central angle.'),
    'root-split': say('Erroa ez da batugaietan banatzen.', 'La raíz no se reparte en la suma.', 'لا يتوزع الجذر على الجمع.', 'A root does not split over a sum.'),
    'leg-add': say('Katetoa: kendu karratuak.', 'Cateto: resta los cuadrados.', 'الضلع القائم: اطرح المربعين.', 'A leg: subtract the squares.'),
    'triangle-half': say('Triangeluan, erronboan eta trapezioan zati 2.', 'En el triángulo, el rombo y el trapecio, entre 2.', 'في المثلث والمعيّن وشبه المنحرف على 2.', 'For triangles, rhombuses and trapeziums, divide by 2.'),
    'area-k': say('Azalerak bider $k^{2}$.', 'Áreas por $k^{2}$.', 'المساحات في $k^{2}$.', 'Areas times $k^{2}$.'),
    'thales-swap': say('Ordena bera bi aldeetan.', 'El mismo orden en los dos lados.', 'الترتيب نفسه في الطرفين.', 'The same order on both sides.'),
    sign: say('Kontuz zeinuekin.', 'Cuidado con los signos.', 'انتبه للإشارات.', 'Watch the signs.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
