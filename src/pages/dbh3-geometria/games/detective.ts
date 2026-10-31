import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Geometriaren detektibea (3. DBH): a worked solution of three lines where
   exactly one line has a mistake, and the lines after it carry it on. The
   learner taps the wrong line and says which mistake it is, among three.
   Level 1: angles (n triangles instead of n − 2, 360° for a triangle, the
   exterior angle given as the interior one, the inscribed angle doubled);
   level 2: Pythagoras (√ of a sum split, squares added for a leg, the
   whole base in an isosceles triangle, the root forgotten); level 3: areas
   and similarity (a triangle not halved, the diameter used as the radius,
   the area ratio k instead of k², a Thales ratio turned round). Every case
   carries the right number and the number reached.
   ========================================================================== */

export type DetectiveError =
    | 'n-triangles'
    | 'triangle-360'
    | 'exterior-interior'
    | 'inscribed-double'
    | 'root-split'
    | 'leg-add'
    | 'whole-base'
    | 'no-root'
    | 'triangle-half'
    | 'diameter-radius'
    | 'area-k'
    | 'thales-swap'

export interface DetectiveLine {
    label: LocalizedText
    latex: string
}

export interface DetectiveCase {
    problem: LocalizedText
    lines: DetectiveLine[]
    wrong: number
    error: DetectiveError
    fix: string
    options: DetectiveError[]
    right: number
    reached: number
}

export const detectiveLevels: DetectiveError[][] = [
    ['n-triangles', 'triangle-360', 'exterior-interior', 'inscribed-double'],
    ['root-split', 'leg-add', 'whole-base', 'no-root'],
    ['triangle-half', 'diameter-radius', 'area-k', 'thales-swap']
]

export const DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): DetectiveLine => ({ label, latex })
const LABELS = {
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const detectiveErrorNames: Record<DetectiveError, LocalizedText> = {
    'n-triangles': say('$n$ triangelu zenbatu ditu, $n-2$ beharrean', 'Contó $n$ triángulos en vez de $n-2$', 'عدّ $n$ مثلثًا بدل $n-2$', 'Counted $n$ triangles instead of $n-2$'),
    'triangle-360': say('Triangeluaren angeluek 360° batzen dutela uste du', 'Cree que los ángulos de un triángulo suman 360°', 'يظن أن مجموع زوايا المثلث 360°', 'Thinks the angles of a triangle add up to 360°'),
    'exterior-interior': say('Kanpo-angelua barnekoa balitz bezala hartu du', 'Tomó el ángulo exterior como si fuera el interior', 'أخذ الزاوية الخارجية على أنها الداخلية', 'Took the exterior angle as the interior one'),
    'inscribed-double': say('Inskribatua zentralaren bikoitza egin du', 'Hizo el inscrito el doble del central', 'جعل المحيطية ضعف المركزية', 'Made the inscribed angle twice the central one'),
    'root-split': say('Erroa batugaietan banatu du', 'Repartió la raíz entre los sumandos', 'وزّع الجذر على الحدود', 'Split the root over the terms of a sum'),
    'leg-add': say('Katetoa kalkulatzeko karratuak batu ditu', 'Sumó los cuadrados para hallar un cateto', 'جمع المربعين لإيجاد ضلع قائم', 'Added the squares to find a leg'),
    'whole-base': say('Oinarri osoa erabili du, erdia beharrean', 'Usó la base entera en vez de la mitad', 'استعمل القاعدة كاملة بدل نصفها', 'Used the whole base instead of half'),
    'no-root': say('Erro karratua atera gabe utzi du', 'No sacó la raíz cuadrada', 'لم يأخذ الجذر التربيعي', 'Forgot to take the square root'),
    'triangle-half': say('Triangeluaren azalera ez du erdibitu', 'No dividió entre 2 el área del triángulo', 'لم يقسم مساحة المثلث على 2', 'Did not halve the area of the triangle'),
    'diameter-radius': say('Diametroa erabili du erradioaren lekuan', 'Usó el diámetro en lugar del radio', 'استعمل القطر مكان نصف القطر', 'Used the diameter instead of the radius'),
    'area-k': say('Azalerak $k$ aldiz handitu ditu, $k^{2}$ beharrean', 'Multiplicó el área por $k$ en vez de por $k^{2}$', 'ضرب المساحة في $k$ بدل $k^{2}$', 'Multiplied the area by $k$ instead of $k^{2}$'),
    'thales-swap': say('Talesen proportzioa alderantziz idatzi du', 'Escribió la proporción de Tales al revés', 'كتب تناسب طاليس معكوسًا', 'Wrote the Thales proportion the wrong way round')
}

export const detectiveErrorTips: Record<DetectiveError, LocalizedText> = {
    'n-triangles': say('$n$ aldeko poligonoa $n-2$ triangelutan banatzen da: $(n-2)\\cdot 180°$.', 'Un polígono de $n$ lados se divide en $n-2$ triángulos: $(n-2)\\cdot 180°$.', 'المضلع ذو $n$ ضلعًا ينقسم إلى $n-2$ مثلثًا: $(n-2)\\cdot 180°$.', 'A polygon with $n$ sides splits into $n-2$ triangles: $(n-2)\\cdot 180°$.'),
    'triangle-360': say('Triangelu batean: $180°$. Laukian: $360°$.', 'En un triángulo: $180°$. En un cuadrilátero: $360°$.', 'في المثلث: $180°$. وفي الرباعي: $360°$.', 'In a triangle: $180°$. In a quadrilateral: $360°$.'),
    'exterior-interior': say('$\\frac{360°}{n}$ kanpokoa da; barnekoa $180°$ ken hori.', '$\\frac{360°}{n}$ es el exterior; el interior es $180°$ menos eso.', '$\\frac{360°}{n}$ هي الخارجية؛ والداخلية $180°$ ناقصها.', '$\\frac{360°}{n}$ is the exterior angle; the interior is $180°$ minus that.'),
    'inscribed-double': say('Inskribatua zentralaren ERDIA da.', 'El inscrito es la MITAD del central.', 'المحيطية نصف المركزية.', 'The inscribed angle is HALF the central one.'),
    'root-split': say('$\\sqrt{9+16}=\\sqrt{25}=5$, ez $3+4$.', '$\\sqrt{9+16}=\\sqrt{25}=5$, no $3+4$.', '$\\sqrt{9+16}=\\sqrt{25}=5$ وليس $3+4$.', '$\\sqrt{9+16}=\\sqrt{25}=5$, not $3+4$.'),
    'leg-add': say('Katetoa: hipotenusaren karratuari kendu: $b^{2}=a^{2}-c^{2}$.', 'Cateto: resta al cuadrado de la hipotenusa: $b^{2}=a^{2}-c^{2}$.', 'الضلع القائم: اطرح من مربع الوتر: $b^{2}=a^{2}-c^{2}$.', 'A leg: subtract from the square of the hypotenuse: $b^{2}=a^{2}-c^{2}$.'),
    'whole-base': say('Altuerak oinarria erditik banatzen du: oinarriaren ERDIA.', 'La altura parte la base por la mitad: se usa la MITAD.', 'يقسم الارتفاع القاعدة نصفين: نستعمل النصف.', 'The height cuts the base in half: use HALF.'),
    'no-root': say('$a^{2}=100$ bada, $a=\\sqrt{100}=10$.', 'Si $a^{2}=100$, $a=\\sqrt{100}=10$.', 'إذا $a^{2}=100$ فإن $a=\\sqrt{100}=10$.', 'If $a^{2}=100$, $a=\\sqrt{100}=10$.'),
    'triangle-half': say('Triangelua: $\\frac{b\\cdot h}{2}$.', 'Triángulo: $\\frac{b\\cdot h}{2}$.', 'المثلث: $\\frac{b\\cdot h}{2}$.', 'Triangle: $\\frac{b\\cdot h}{2}$.'),
    'diameter-radius': say('$\\pi r^{2}$ formulak erradioa du: diametroaren erdia.', '$\\pi r^{2}$ lleva el radio: la mitad del diámetro.', 'في $\\pi r^{2}$ نصف القطر: نصف القطر الكامل.', '$\\pi r^{2}$ uses the radius: half the diameter.'),
    'area-k': say('Luzerak bider $k$; azalerak bider $k^{2}$.', 'Longitudes por $k$; áreas por $k^{2}$.', 'الأطوال في $k$؛ والمساحات في $k^{2}$.', 'Lengths times $k$; areas times $k^{2}$.'),
    'thales-swap': say('Ordena bera bi zuzenetan: $\\frac{AB}{BC}=\\frac{A_{1}B_{1}}{B_{1}C_{1}}$.', 'El mismo orden en las dos rectas: $\\frac{AB}{BC}=\\frac{A_{1}B_{1}}{B_{1}C_{1}}$.', 'الترتيب نفسه على المستقيمين: $\\frac{AB}{BC}=\\frac{A_{1}B_{1}}{B_{1}C_{1}}$.', 'The same order on both lines: $\\frac{AB}{BC}=\\frac{A_{1}B_{1}}{B_{1}C_{1}}$.')
}

type Built = Omit<DetectiveCase, 'options'>
type Builder = (random: Random) => Built | null

const askSum = (sides: number) => say(`Zenbat batzen dute ${sides} aldeko poligono baten angeluek?`, `¿Cuánto suman los ángulos de un polígono de ${sides} lados?`, `كم مجموع زوايا مضلع ذي ${sides} أضلاع؟`, `What do the angles of a polygon with ${sides} sides add up to?`)

function nTriangles(random: Random): Built {
    const n = randomInt(random, 5, 10)
    return {
        problem: askSum(n),
        lines: [line(LABELS.rule, `n=${n}`), line(LABELS.step, `${n}\\cdot 180°`), line(LABELS.result, `${n * 180}°`)],
        wrong: 1, error: 'n-triangles', fix: `(${n}-2)\\cdot 180°=${(n - 2) * 180}°`, right: (n - 2) * 180, reached: n * 180
    }
}

function triangle360(random: Random): Built {
    const a = randomInt(random, 6, 14) * 5
    const b = randomInt(random, 4, 10) * 5
    return {
        problem: say(`Triangelu baten bi angeluk ${a}° eta ${b}° neurtzen dute. Zenbat hirugarrenak?`, `Dos ángulos de un triángulo miden ${a}° y ${b}°. ¿Cuánto mide el tercero?`, `زاويتان في مثلث ${a}° و${b}°. كم الثالثة؟`, `Two angles of a triangle are ${a}° and ${b}°. How big is the third?`),
        lines: [line(LABELS.rule, '360°'), line(LABELS.step, `360°-${a}°-${b}°`), line(LABELS.result, `${360 - a - b}°`)],
        wrong: 0, error: 'triangle-360', fix: `180°-${a}°-${b}°=${180 - a - b}°`, right: 180 - a - b, reached: 360 - a - b
    }
}

function exteriorInterior(random: Random): Built {
    const n = pick(random, [5, 6, 9, 10, 12])
    return {
        problem: say(`Zenbat neurtzen du ${n} aldeko poligono erregular baten barne-angeluak?`, `¿Cuánto mide el ángulo interior de un polígono regular de ${n} lados?`, `كم الزاوية الداخلية لمضلع منتظم ذي ${n} أضلاع؟`, `How big is the interior angle of a regular polygon with ${n} sides?`),
        lines: [line(LABELS.step, `360°\\div ${n}=${360 / n}°`), line(LABELS.step, `${360 / n}°`), line(LABELS.result, `${360 / n}°`)],
        wrong: 1, error: 'exterior-interior', fix: `180°-${360 / n}°=${180 - 360 / n}°`, right: 180 - 360 / n, reached: 360 / n
    }
}

function inscribedDouble(random: Random): Built {
    const central = randomInt(random, 3, 8) * 10
    return {
        problem: say(`Angelu zentral batek ${central}° neurtzen du. Zenbat arku bera hartzen duen inskribatuak?`, `Un ángulo central mide ${central}°. ¿Cuánto mide el inscrito sobre el mismo arco?`, `زاوية مركزية ${central}°. كم المحيطية على القوس نفسه؟`, `A central angle is ${central}°. How big is the inscribed angle on the same arc?`),
        lines: [line(LABELS.rule, `\\beta=2\\alpha`), line(LABELS.step, `2\\cdot ${central}°`), line(LABELS.result, `${2 * central}°`)],
        wrong: 0, error: 'inscribed-double', fix: `\\frac{${central}°}{2}=${central / 2}°`, right: central / 2, reached: 2 * central
    }
}

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25]]

function rootSplit(random: Random): Built {
    const [b, c, a] = pick(random, TRIPLES)
    return {
        problem: say(`Katetoak ${b} eta ${c}. Zenbat da hipotenusa?`, `Catetos ${b} y ${c}. ¿Cuánto mide la hipotenusa?`, `ضلعان قائمان ${b} و${c}. كم الوتر؟`, `Legs ${b} and ${c}. How long is the hypotenuse?`),
        lines: [line(LABELS.rule, `a=\\sqrt{${b}^{2}+${c}^{2}}`), line(LABELS.step, `a=\\sqrt{${b}^{2}}+\\sqrt{${c}^{2}}`), line(LABELS.result, `a=${b + c}`)],
        wrong: 1, error: 'root-split', fix: `\\sqrt{${b * b + c * c}}=${a}`, right: a, reached: b + c
    }
}

function legAdd(random: Random): Built {
    const [b, c, a] = pick(random, TRIPLES)
    return {
        problem: say(`Hipotenusa ${a} eta kateto bat ${c}. Zenbat da bestea?`, `Hipotenusa ${a} y un cateto ${c}. ¿Cuánto mide el otro?`, `الوتر ${a} وضلع قائم ${c}. كم الآخر؟`, `Hypotenuse ${a} and one leg ${c}. How long is the other?`),
        lines: [line(LABELS.step, `b^{2}=${a}^{2}+${c}^{2}`), line(LABELS.step, `b^{2}=${a * a + c * c}`), line(LABELS.result, `b=\\sqrt{${a * a + c * c}}`)],
        wrong: 0, error: 'leg-add', fix: `b^{2}=${a * a}-${c * c}=${b * b}\\ \\to\\ b=${b}`, right: b, reached: a * a + c * c
    }
}

function wholeBase(random: Random): Built {
    const [half, h, side] = pick(random, [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]] as Array<[number, number, number]>)
    const base = 2 * half
    return {
        problem: say(`Triangelu isoszele baten alde berdinak ${side} dira eta oinarria ${base}. Zenbat da altuera?`, `Un triángulo isósceles tiene lados iguales de ${side} y base ${base}. ¿Cuánto mide la altura?`, `مثلث متساوي الساقين ساقاه ${side} وقاعدته ${base}. كم ارتفاعه؟`, `An isosceles triangle has equal sides of ${side} and a base of ${base}. How tall is it?`),
        lines: [line(LABELS.step, `h^{2}=${side}^{2}-${base}^{2}`), line(LABELS.step, `h^{2}=${side * side - base * base}`), line(LABELS.result, `h^{2}=${side * side - base * base}`)],
        wrong: 0, error: 'whole-base', fix: `h=\\sqrt{${side}^{2}-${half}^{2}}=${h}`, right: h, reached: side * side - base * base
    }
}

function noRoot(random: Random): Built {
    const [b, c, a] = pick(random, TRIPLES)
    return {
        problem: say(`Katetoak ${b} eta ${c}. Zenbat da hipotenusa?`, `Catetos ${b} y ${c}. ¿Cuánto mide la hipotenusa?`, `ضلعان قائمان ${b} و${c}. كم الوتر؟`, `Legs ${b} and ${c}. How long is the hypotenuse?`),
        lines: [line(LABELS.step, `a^{2}=${b * b}+${c * c}`), line(LABELS.step, `a^{2}=${a * a}`), line(LABELS.result, `a=${a * a}`)],
        wrong: 2, error: 'no-root', fix: `a=\\sqrt{${a * a}}=${a}`, right: a, reached: a * a
    }
}

function triangleHalf(random: Random): Built {
    const base = randomInt(random, 4, 14)
    const height = 2 * randomInt(random, 2, 6)
    return {
        problem: say(`Zein da oinarria ${base} eta altuera ${height} dituen triangeluaren azalera?`, `¿Cuál es el área de un triángulo de base ${base} y altura ${height}?`, `ما مساحة مثلث قاعدته ${base} وارتفاعه ${height}؟`, `What is the area of a triangle with base ${base} and height ${height}?`),
        lines: [line(LABELS.rule, `A=b\\cdot h`), line(LABELS.step, `A=${base}\\cdot ${height}`), line(LABELS.result, `A=${base * height}`)],
        wrong: 0, error: 'triangle-half', fix: `A=\\frac{${base}\\cdot ${height}}{2}=${(base * height) / 2}`, right: (base * height) / 2, reached: base * height
    }
}

function diameterRadius(random: Random): Built {
    const r = randomInt(random, 2, 9)
    return {
        problem: say(`Zirkulu baten diametroa ${2 * r} cm da. Zein da azalera, $\\pi$ zenbakiaren funtzioan?`, `Un círculo tiene ${2 * r} cm de diámetro. ¿Cuál es su área en función de $\\pi$?`, `قطر دائرة ${2 * r} سم. ما مساحتها بدلالة $\\pi$؟`, `A circle has a diameter of ${2 * r} cm. What is its area in terms of $\\pi$?`),
        lines: [line(LABELS.step, `r=${2 * r}`), line(LABELS.step, `A=\\pi\\cdot ${2 * r}^{2}`), line(LABELS.result, `A=${4 * r * r}\\pi`)],
        wrong: 0, error: 'diameter-radius', fix: `r=${r}\\ \\to\\ A=${r * r}\\pi`, right: r * r, reached: 4 * r * r
    }
}

function areaK(random: Random): Built {
    const area = randomInt(random, 3, 12)
    const k = randomInt(random, 2, 4)
    return {
        problem: say(`${area} cm²-ko irudi baten aldeak bider ${k} egiten dira. Zein da azalera berria?`, `Los lados de una figura de ${area} cm² se multiplican por ${k}. ¿Cuál es el área nueva?`, `تُضرب أضلاع شكل مساحته ${area} سم² في ${k}. ما المساحة الجديدة؟`, `The sides of a ${area} cm² shape are multiplied by ${k}. What is the new area?`),
        lines: [line(LABELS.rule, `k=${k}`), line(LABELS.step, `A=${area}\\cdot ${k}`), line(LABELS.result, `A=${area * k}`)],
        wrong: 1, error: 'area-k', fix: `A=${area}\\cdot ${k}^{2}=${area * k * k}`, right: area * k * k, reached: area * k
    }
}

function thalesSwap(random: Random): Built | null {
    const ab = randomInt(random, 2, 6)
    const bc = randomInt(random, 2, 8)
    const k = randomInt(random, 2, 3)
    const a1b1 = ab * k
    const right = bc * k
    // Turned round: AB/BC = B1C1/A1B1 → x = AB·A1B1 / BC
    const reached = (ab * a1b1) / bc
    if (!Number.isInteger(reached) || reached === right) return null
    return {
        problem: say(`Tales: $AB=${ab}$, $BC=${bc}$ eta $A_{1}B_{1}=${a1b1}$. Zenbat da $B_{1}C_{1}$?`, `Tales: $AB=${ab}$, $BC=${bc}$ y $A_{1}B_{1}=${a1b1}$. ¿Cuánto mide $B_{1}C_{1}$?`, `طاليس: $AB=${ab}$ و$BC=${bc}$ و$A_{1}B_{1}=${a1b1}$. كم $B_{1}C_{1}$؟`, `Thales: $AB=${ab}$, $BC=${bc}$ and $A_{1}B_{1}=${a1b1}$. How long is $B_{1}C_{1}$?`),
        lines: [line(LABELS.rule, `\\frac{${ab}}{${bc}}=\\frac{x}{${a1b1}}`), line(LABELS.step, `x=\\frac{${ab}\\cdot ${a1b1}}{${bc}}`), line(LABELS.result, `x=${reached}`)],
        wrong: 0, error: 'thales-swap', fix: `\\frac{${ab}}{${bc}}=\\frac{${a1b1}}{x}\\ \\to\\ x=${right}`, right, reached
    }
}

const builders: Record<DetectiveError, Builder> = {
    'n-triangles': nTriangles,
    'triangle-360': triangle360,
    'exterior-interior': exteriorInterior,
    'inscribed-double': inscribedDouble,
    'root-split': rootSplit,
    'leg-add': legAdd,
    'whole-base': wholeBase,
    'no-root': noRoot,
    'triangle-half': triangleHalf,
    'diameter-radius': diameterRadius,
    'area-k': areaK,
    'thales-swap': thalesSwap
}

export function createDetectiveCase(random: Random, levelIndex: number, error: DetectiveError): DetectiveCase {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    for (let attempt = 0; attempt < 500; attempt += 1) {
        const made = builders[error](random)
        if (!made) continue
        const others = shuffle(random, pool.filter((item) => item !== error)).slice(0, 2)
        return { ...made, options: shuffle(random, [error, ...others]) }
    }
    throw new Error(`No detective case for ${error}`)
}

export function createDetectiveCases(random: Random, levelIndex: number): DetectiveCase[] {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    const order = shuffle(random, pool)
    const errors = Array.from({ length: DETECTIVE_CASES }, (_, index) => order[index % order.length])
    return shuffle(random, errors).map((error) => createDetectiveCase(random, levelIndex, error))
}

export function detectiveStars(score: number): Stars {
    if (score >= 11) return 3
    if (score >= 9) return 2
    if (score >= 6) return 1
    return 0
}
