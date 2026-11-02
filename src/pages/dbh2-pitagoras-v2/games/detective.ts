import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Pitagorasen detektibea (2. DBH): a worked solution of three lines with
   one wrong line. Level 1: the hypotenuse (the legs added, the root
   forgotten, a square taken as a double, the square of the sum); level 2:
   legs and units (adding to find a leg, subtracting to find the
   hypotenuse, the root of a difference split, metres and centimetres
   mixed); level 3: inside figures (the whole base of an isosceles
   triangle, the whole diagonals of a rhombus, the base diagonal of a box
   not squared, the distance to the centre taken as a leg of the tangent).
   Lengths that are not whole are rounded to hundredths: `\approx`.
   ========================================================================== */

export type PythagorasDetectiveError =
    | 'legs-added'
    | 'root-forgotten'
    | 'square-as-double'
    | 'square-of-sum'
    | 'leg-by-adding'
    | 'hypotenuse-by-subtracting'
    | 'root-split'
    | 'mixed-units'
    | 'isosceles-whole-base'
    | 'rhombus-whole-diagonals'
    | 'box-diagonal-not-squared'
    | 'tangent-centre-as-leg'

export const pythagorasDetectiveLevels: PythagorasDetectiveError[][] = [
    ['legs-added', 'root-forgotten', 'square-as-double', 'square-of-sum'],
    ['leg-by-adding', 'hypotenuse-by-subtracting', 'root-split', 'mixed-units'],
    ['isosceles-whole-base', 'rhombus-whole-diagonals', 'box-diagonal-not-squared', 'tangent-centre-as-leg']
]

export const PYTHAGORAS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    theorem: say('Teorema', 'Teorema', 'النظرية', 'Theorem'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    root: say('Erro karratua', 'Raíz cuadrada', 'الجذر التربيعي', 'Square root'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    units: say('Unitateak', 'Unidades', 'الوحدات', 'Units'),
    triangle: say('Triangelu angeluzuzena', 'Triángulo rectángulo', 'المثلث القائم', 'Right-angled triangle'),
    base: say('Oinarriaren diagonala', 'Diagonal de la base', 'قطر القاعدة', 'Base diagonal'),
    big: say('Diagonal handia', 'Diagonal mayor', 'القطر الكبير', 'Long diagonal')
}

export const pythagorasDetectiveNames: Record<PythagorasDetectiveError, LocalizedText> = {
    'legs-added': say('Katetoak batu ditu, haien karratuak batu beharrean', 'Sumó los catetos en vez de sus cuadrados', 'جمع الضلعين القائمين بدل مربعيهما', 'Added the legs instead of their squares'),
    'root-forgotten': say('Erro karratua ahaztu du', 'Olvidó la raíz cuadrada', 'نسي الجذر التربيعي', 'Forgot the square root'),
    'square-as-double': say('Karratua bikoitza balitz bezala kalkulatu du', 'Calculó el cuadrado como si fuera el doble', 'حسب المربع كأنه الضعف', 'Worked out the square as if it were the double'),
    'square-of-sum': say('Baturaren karratua egin du, karratuen batura beharrean', 'Hizo el cuadrado de la suma, no la suma de los cuadrados', 'ربّع المجموع بدل جمع المربعات', 'Squared the sum instead of adding the squares'),
    'leg-by-adding': say('Katetoa kalkulatzeko karratuak batu ditu', 'Para el cateto sumó los cuadrados', 'جمع المربعين لإيجاد الضلع القائم', 'Added the squares to find a leg'),
    'hypotenuse-by-subtracting': say('Hipotenusa kalkulatzeko karratuak kendu ditu', 'Para la hipotenusa restó los cuadrados', 'طرح المربعين لإيجاد الوتر', 'Subtracted the squares to find the hypotenuse'),
    'root-split': say('Kendura baten erroa errotan banatu du', 'Partió la raíz de una resta en dos raíces', 'جزّأ جذر الفرق إلى جذرين', 'Split the root of a difference into two roots'),
    'mixed-units': say('Metroak eta zentimetroak nahastu ditu', 'Mezcló metros y centímetros', 'خلط الأمتار والسنتيمترات', 'Mixed metres and centimetres'),
    'isosceles-whole-base': say('Oinarri osoa hartu du, oinarri-erdia beharrean', 'Usó la base entera en vez de la mitad', 'استعمل القاعدة كلها بدل نصفها', 'Used the whole base instead of half of it'),
    'rhombus-whole-diagonals': say('Diagonal osoak hartu ditu, diagonal-erdiak beharrean', 'Usó las diagonales enteras en vez de las semidiagonales', 'استعمل القطرين كاملين بدل نصفيهما', 'Used the whole diagonals instead of the half-diagonals'),
    'box-diagonal-not-squared': say('Oinarriaren diagonala ez du ber bi egin', 'No elevó al cuadrado la diagonal de la base', 'لم يربّع قطر القاعدة', 'Did not square the base diagonal'),
    'tangent-centre-as-leg': say('Zentrorainoko distantzia katetotzat hartu du', 'Tomó la distancia al centro como si fuera un cateto', 'اعتبر البعد عن المركز ضلعًا قائمًا', 'Took the distance to the centre as a leg')
}

export const pythagorasDetectiveTips: Record<PythagorasDetectiveError, LocalizedText> = {
    'legs-added': say('$3+4\\ne 5$: karratuak batzen dira, $c^{2}=a^{2}+b^{2}$, eta gero erroa.', '$3+4\\ne 5$: se suman los cuadrados, $c^{2}=a^{2}+b^{2}$, y luego la raíz.', '$3+4\\ne 5$: تُجمع المربعات $c^{2}=a^{2}+b^{2}$ ثم نأخذ الجذر.', '$3+4\\ne 5$: add the squares, $c^{2}=a^{2}+b^{2}$, then take the root.'),
    'root-forgotten': say('$c^{2}=25$ bada, $c=\\sqrt{25}=5$: azken urratsa erroa da.', 'Si $c^{2}=25$, entonces $c=\\sqrt{25}=5$: el último paso es la raíz.', 'إذا كان $c^{2}=25$ فإن $c=\\sqrt{25}=5$: الخطوة الأخيرة هي الجذر.', 'If $c^{2}=25$, then $c=\\sqrt{25}=5$: the last step is the root.'),
    'square-as-double': say('$3^{2}=3\\cdot 3=9$, ez $2\\cdot 3$.', '$3^{2}=3\\cdot 3=9$, no $2\\cdot 3$.', '$3^{2}=3\\cdot 3=9$ وليس $2\\cdot 3$.', '$3^{2}=3\\cdot 3=9$, not $2\\cdot 3$.'),
    'square-of-sum': say('$(a+b)^{2}\\ne a^{2}+b^{2}$: aldeak banan-banan ber bi.', '$(a+b)^{2}\\ne a^{2}+b^{2}$: cada lado se eleva por separado.', '$(a+b)^{2}\\ne a^{2}+b^{2}$: يُربَّع كل ضلع وحده.', '$(a+b)^{2}\\ne a^{2}+b^{2}$: square each side on its own.'),
    'leg-by-adding': say('Hipotenusa da handiena: katetoa bilatzeko, $b^{2}=c^{2}-a^{2}$.', 'La hipotenusa es la mayor: para un cateto, $b^{2}=c^{2}-a^{2}$.', 'الوتر هو الأكبر: لإيجاد ضلع قائم $b^{2}=c^{2}-a^{2}$.', 'The hypotenuse is the longest: for a leg, $b^{2}=c^{2}-a^{2}$.'),
    'hypotenuse-by-subtracting': say('Hipotenusa bilatzeko karratuak batu: $c^{2}=a^{2}+b^{2}$.', 'Para la hipotenusa se suman los cuadrados: $c^{2}=a^{2}+b^{2}$.', 'لإيجاد الوتر نجمع المربعين: $c^{2}=a^{2}+b^{2}$.', 'For the hypotenuse, add the squares: $c^{2}=a^{2}+b^{2}$.'),
    'root-split': say('$\\sqrt{13^{2}-5^{2}}\\ne 13-5$: lehenik kendu, gero erroa.', '$\\sqrt{13^{2}-5^{2}}\\ne 13-5$: primero se resta y después la raíz.', '$\\sqrt{13^{2}-5^{2}}\\ne 13-5$: نطرح أولًا ثم نأخذ الجذر.', '$\\sqrt{13^{2}-5^{2}}\\ne 13-5$: subtract first, then take the root.'),
    'mixed-units': say('Aldeak unitate berean jarri behar dira teorema erabili aurretik.', 'Antes de usar el teorema, todos los lados en la misma unidad.', 'قبل استعمال النظرية تُكتب كل الأضلاع بالوحدة نفسها.', 'Before using the theorem, put every side in the same unit.'),
    'isosceles-whole-base': say('Altuerak oinarria erditik zatitzen du: triangelu angeluzuzenaren katetoa oinarri-erdia da.', 'La altura parte la base por la mitad: el cateto del triángulo rectángulo es media base.', 'الارتفاع ينصّف القاعدة: الضلع القائم هو نصف القاعدة.', 'The height cuts the base in half: the leg of the right-angled triangle is half the base.'),
    'rhombus-whole-diagonals': say('Diagonalak erditik mozten dira: katetoak $\\frac{D}{2}$ eta $\\frac{d}{2}$ dira.', 'Las diagonales se cortan por la mitad: los catetos son $\\frac{D}{2}$ y $\\frac{d}{2}$.', 'القطران ينصّف أحدهما الآخر: الضلعان القائمان $\\frac{D}{2}$ و$\\frac{d}{2}$.', 'The diagonals cut each other in half: the legs are $\\frac{D}{2}$ and $\\frac{d}{2}$.'),
    'box-diagonal-not-squared': say('Bigarren triangeluan, oinarriaren diagonala katetoa da: hura ere ber bi.', 'En el segundo triángulo, la diagonal de la base es un cateto: también va al cuadrado.', 'في المثلث الثاني قطر القاعدة ضلع قائم: يُربَّع أيضًا.', 'In the second triangle, the base diagonal is a leg: it is squared too.'),
    'tangent-centre-as-leg': say('Angelu zuzena ukitze-puntuan dago: zentrorainoko distantzia hipotenusa da.', 'El ángulo recto está en el punto de tangencia: la distancia al centro es la hipotenusa.', 'الزاوية القائمة عند نقطة التماس: البعد عن المركز هو الوتر.', 'The right angle is at the point of tangency: the distance to the centre is the hypotenuse.')
}

/** A length: whole, or rounded to hundredths with the decimal comma */
export const length = (value: number) => (Number.isInteger(Math.round(value * 1e6) / 1e6) ? String(Math.round(value)) : String(Math.round(value * 100) / 100).replace('.', '{,}'))
/** The square root of a number, exact when it is a square: \sqrt{69}\approx 8{,}31 */
const rootOf = (square: number) => {
    const root = Math.sqrt(square)
    return Number.isInteger(Math.round(root * 1e6) / 1e6) ? `\\sqrt{${length(square)}}=${length(root)}` : `\\sqrt{${length(square)}}\\approx ${length(root)}`
}
/** A decimal in a Basque or Spanish sentence */
const comma = (value: number) => String(value).replace('.', ',')
const rounded = (value: number) => Math.round(value * 100) / 100

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25]]

type Built = Omit<WorkedCase<PythagorasDetectiveError>, 'options'>

const legsProblem = (a: number, b: number) => say(
    `Triangelu angeluzuzen baten katetoek ${a} cm eta ${b} cm neurtzen dute. Kalkulatu hipotenusa.`,
    `Los catetos de un triángulo rectángulo miden ${a} cm y ${b} cm. Calcula la hipotenusa.`,
    `ضلعا مثلث قائم ${a} سم و${b} سم. احسب الوتر.`,
    `The legs of a right-angled triangle are ${a} cm and ${b} cm. Work out the hypotenuse.`
)
const legProblem = (c: number, a: number) => say(
    `Triangelu angeluzuzen baten hipotenusak ${c} cm neurtzen du eta katetoetako batek ${a} cm. Kalkulatu beste katetoa.`,
    `La hipotenusa de un triángulo rectángulo mide ${c} cm y un cateto ${a} cm. Calcula el otro cateto.`,
    `وتر مثلث قائم ${c} سم وأحد ضلعيه القائمين ${a} سم. احسب الضلع الآخر.`,
    `The hypotenuse of a right-angled triangle is ${c} cm and one leg is ${a} cm. Work out the other leg.`
)

function build(random: Random, error: PythagorasDetectiveError): Built | null {
    switch (error) {
        case 'legs-added': {
            const [a, b, c] = pick(random, TRIPLES)
            return {
                problem: legsProblem(a, b),
                lines: [
                    line(LABELS.theorem, 'c=a+b'),
                    line(LABELS.substitute, `c=${a}+${b}`),
                    line(LABELS.result, `c=${a + b}`)
                ],
                wrong: 0,
                error,
                fix: `c^{2}=${a}^{2}+${b}^{2}=${c * c}\\ \\to\\ c=${c}`,
                right: c,
                reached: a + b
            }
        }
        case 'root-forgotten': {
            const [a, b, c] = pick(random, TRIPLES)
            return {
                problem: legsProblem(a, b),
                lines: [
                    line(LABELS.theorem, 'c^{2}=a^{2}+b^{2}'),
                    line(LABELS.substitute, `c^{2}=${a * a}+${b * b}=${c * c}`),
                    line(LABELS.result, `c=${c * c}`)
                ],
                wrong: 2,
                error,
                fix: `c=\\sqrt{${c * c}}=${c}`,
                right: c,
                reached: c * c
            }
        }
        case 'square-as-double': {
            const [a, b, c] = pick(random, TRIPLES)
            return {
                problem: legsProblem(a, b),
                lines: [
                    line(LABELS.theorem, 'c^{2}=a^{2}+b^{2}'),
                    line(LABELS.substitute, `c^{2}=2\\cdot ${a}+2\\cdot ${b}=${2 * a + 2 * b}`),
                    line(LABELS.root, `c=${rootOf(2 * a + 2 * b)}`)
                ],
                wrong: 1,
                error,
                fix: `c^{2}=${a * a}+${b * b}=${c * c}\\ \\to\\ c=${c}`,
                right: c,
                reached: rounded(Math.sqrt(2 * a + 2 * b))
            }
        }
        case 'square-of-sum': {
            const [a, b, c] = pick(random, TRIPLES)
            return {
                problem: legsProblem(a, b),
                lines: [
                    line(LABELS.theorem, `c^{2}=(${a}+${b})^{2}`),
                    line(LABELS.substitute, `c^{2}=${a + b}^{2}=${(a + b) ** 2}`),
                    line(LABELS.root, `c=${rootOf((a + b) ** 2)}`)
                ],
                wrong: 0,
                error,
                fix: `c^{2}=${a}^{2}+${b}^{2}=${c * c}\\ \\to\\ c=${c}`,
                right: c,
                reached: a + b
            }
        }
        case 'leg-by-adding': {
            const [a, b, c] = pick(random, TRIPLES)
            return {
                problem: legProblem(c, a),
                lines: [
                    line(LABELS.theorem, `b^{2}=${c}^{2}+${a}^{2}`),
                    line(LABELS.substitute, `b^{2}=${c * c}+${a * a}=${c * c + a * a}`),
                    line(LABELS.root, `b=${rootOf(c * c + a * a)}`)
                ],
                wrong: 0,
                error,
                fix: `b^{2}=${c}^{2}-${a}^{2}=${b * b}\\ \\to\\ b=${b}`,
                right: b,
                reached: rounded(Math.sqrt(c * c + a * a))
            }
        }
        case 'hypotenuse-by-subtracting': {
            const [a, b, c] = pick(random, TRIPLES)
            return {
                problem: legsProblem(a, b),
                lines: [
                    line(LABELS.theorem, 'c^{2}=a^{2}+b^{2}'),
                    line(LABELS.substitute, `c^{2}=${b}^{2}-${a}^{2}=${b * b - a * a}`),
                    line(LABELS.root, `c=${rootOf(b * b - a * a)}`)
                ],
                wrong: 1,
                error,
                fix: `c^{2}=${b}^{2}+${a}^{2}=${c * c}\\ \\to\\ c=${c}`,
                right: c,
                reached: rounded(Math.sqrt(b * b - a * a))
            }
        }
        case 'root-split': {
            const [a, b, c] = pick(random, TRIPLES)
            return {
                problem: legProblem(c, a),
                lines: [
                    line(LABELS.theorem, `b^{2}=${c}^{2}-${a}^{2}`),
                    line(LABELS.root, `\\sqrt{${c}^{2}-${a}^{2}}=${c}-${a}`),
                    line(LABELS.result, `b=${c - a}`)
                ],
                wrong: 1,
                error,
                fix: `b=\\sqrt{${c * c}-${a * a}}=\\sqrt{${b * b}}=${b}`,
                right: b,
                reached: c - a
            }
        }
        case 'mixed-units': {
            // One leg in metres and the other in centimetres; the hypotenuse in metres
            const [metres, centimetres, hypotenuse] = pick(random, [[1.2, 50, 1.3], [0.9, 120, 1.5], [1.6, 120, 2], [2.4, 70, 2.5], [0.6, 80, 1], [1.5, 80, 1.7]] as const)
            const reachedSquare = metres * metres + centimetres * centimetres
            return {
                problem: say(
                    `Triangelu angeluzuzen baten katetoetako batek ${comma(metres)} m neurtzen du, eta besteak ${centimetres} cm. Kalkulatu hipotenusa metrotan.`,
                    `Un cateto de un triángulo rectángulo mide ${comma(metres)} m y el otro ${centimetres} cm. Calcula la hipotenusa en metros.`,
                    `أحد ضلعي مثلث قائم ${metres} م والآخر ${centimetres} سم. احسب الوتر بالأمتار.`,
                    `One leg of a right-angled triangle is ${metres} m and the other is ${centimetres} cm. Work out the hypotenuse in metres.`
                ),
                lines: [
                    line(LABELS.theorem, `c^{2}=${length(metres)}^{2}+${centimetres}^{2}`),
                    line(LABELS.substitute, `c^{2}=${length(reachedSquare)}`),
                    line(LABELS.root, `c\\approx ${length(Math.sqrt(reachedSquare))}`)
                ],
                wrong: 0,
                error,
                fix: `c^{2}=${length(metres)}^{2}+${length(centimetres / 100)}^{2}=${length(hypotenuse * hypotenuse)}\\ \\to\\ c=${length(hypotenuse)}`,
                right: hypotenuse,
                reached: rounded(Math.sqrt(reachedSquare))
            }
        }
        case 'isosceles-whole-base': {
            // Half the base and the height are the legs; only triples with the side longer than the whole base
            const [half, h, side] = pick(random, [[5, 12, 13], [8, 15, 17], [7, 24, 25], [10, 24, 26]] as const)
            const base = 2 * half
            const reachedSquare = side * side - base * base
            return {
                problem: say(
                    `Triangelu isoszele baten alde berdinek ${side} cm neurtzen dute eta oinarriak ${base} cm. Kalkulatu altuera.`,
                    `Los lados iguales de un triángulo isósceles miden ${side} cm y la base ${base} cm. Calcula la altura.`,
                    `الضلعان المتساويان في مثلث متساوي الساقين ${side} سم والقاعدة ${base} سم. احسب الارتفاع.`,
                    `The equal sides of an isosceles triangle are ${side} cm and the base is ${base} cm. Work out the height.`
                ),
                lines: [
                    line(LABELS.triangle, `h^{2}=${side}^{2}-${base}^{2}`),
                    line(LABELS.substitute, `h^{2}=${side * side}-${base * base}=${reachedSquare}`),
                    line(LABELS.root, `h=${rootOf(reachedSquare)}`)
                ],
                wrong: 0,
                error,
                fix: `h^{2}=${side}^{2}-${half}^{2}=${h * h}\\ \\to\\ h=${h}`,
                right: h,
                reached: rounded(Math.sqrt(reachedSquare))
            }
        }
        case 'rhombus-whole-diagonals': {
            const [a, b, c] = pick(random, TRIPLES.slice(0, 6))
            const [big, small] = [2 * b, 2 * a]
            return {
                problem: say(
                    `Erronbo baten diagonalek ${big} cm eta ${small} cm neurtzen dute. Kalkulatu aldea.`,
                    `Las diagonales de un rombo miden ${big} cm y ${small} cm. Calcula el lado.`,
                    `قطرا معيّن ${big} سم و${small} سم. احسب الضلع.`,
                    `The diagonals of a rhombus are ${big} cm and ${small} cm. Work out the side.`
                ),
                lines: [
                    line(LABELS.triangle, `l^{2}=${big}^{2}+${small}^{2}`),
                    line(LABELS.substitute, `l^{2}=${big * big}+${small * small}=${big * big + small * small}`),
                    line(LABELS.root, `l=${rootOf(big * big + small * small)}`)
                ],
                wrong: 0,
                error,
                fix: `l^{2}=${b}^{2}+${a}^{2}=${c * c}\\ \\to\\ l=${c}`,
                right: c,
                reached: 2 * c
            }
        }
        case 'box-diagonal-not-squared': {
            const [a, b, height, base, diagonal] = pick(random, [[3, 4, 12, 5, 13], [6, 8, 24, 10, 26], [9, 12, 20, 15, 25], [12, 16, 21, 20, 29]] as Array<[number, number, number, number, number]>)
            const reachedSquare = base + height * height
            return {
                problem: say(
                    `Kaxa baten neurriak ${a} cm, ${b} cm eta ${height} cm dira. Kalkulatu diagonal handia.`,
                    `Una caja mide ${a} cm, ${b} cm y ${height} cm. Calcula su diagonal mayor.`,
                    `أبعاد صندوق ${a} سم و${b} سم و${height} سم. احسب قطره الكبير.`,
                    `A box measures ${a} cm, ${b} cm and ${height} cm. Work out its long diagonal.`
                ),
                lines: [
                    line(LABELS.base, `d=\\sqrt{${a}^{2}+${b}^{2}}=${base}`),
                    line(LABELS.big, `D^{2}=${base}+${height}^{2}=${reachedSquare}`),
                    line(LABELS.root, `D=${rootOf(reachedSquare)}`)
                ],
                wrong: 1,
                error,
                fix: `D^{2}=${base}^{2}+${height}^{2}=${diagonal * diagonal}\\ \\to\\ D=${diagonal}`,
                right: diagonal,
                reached: rounded(Math.sqrt(reachedSquare))
            }
        }
        case 'tangent-centre-as-leg': {
            const [a, b, c] = pick(random, TRIPLES)
            const radius = randomInt(random, 0, 1) === 0 ? a : b
            const tangent = radius === a ? b : a
            return {
                problem: say(
                    `Zirkunferentzia baten erradioa ${radius} cm da. Zentrotik ${c} cm-ra dagoen puntu batetik ukitzaile bat marraztu dugu. Zenbat neurtzen du ukitzaile-zatiak?`,
                    `Una circunferencia tiene ${radius} cm de radio. Desde un punto a ${c} cm del centro trazamos una tangente. ¿Cuánto mide el segmento de tangente?`,
                    `دائرة نصف قطرها ${radius} سم. من نقطة تبعد ${c} سم عن المركز رسمنا مماسًا. كم طول قطعة المماس؟`,
                    `A circle has a radius of ${radius} cm. From a point ${c} cm from the centre we draw a tangent. How long is the tangent segment?`
                ),
                lines: [
                    line(LABELS.triangle, `t^{2}=${c}^{2}+${radius}^{2}`),
                    line(LABELS.substitute, `t^{2}=${c * c}+${radius * radius}=${c * c + radius * radius}`),
                    line(LABELS.root, `t=${rootOf(c * c + radius * radius)}`)
                ],
                wrong: 0,
                error,
                fix: `t^{2}=${c}^{2}-${radius}^{2}=${tangent * tangent}\\ \\to\\ t=${tangent}`,
                right: tangent,
                reached: rounded(Math.sqrt(c * c + radius * radius))
            }
        }
    }
}

export const createPythagorasDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, pythagorasDetectiveLevels[levelIndex], PYTHAGORAS_DETECTIVE_CASES, build)
