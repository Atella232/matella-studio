import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Geometriaren detektibea (1. DBH plane geometry): a worked answer of three
   lines with one wrong line. Level 1: angles (the complement taken from
   180°, the supplement from 90°, the angles of a triangle adding up to
   360°); level 2: Pythagoras (the legs added without squares, the squares
   added to find a leg, the square root forgotten); level 3: areas and
   lengths (a triangle without the half, the circumference with r², square
   units converted like lengths).
   ========================================================================== */

export type GeometryDetectiveError =
    | 'complement-180'
    | 'supplement-90'
    | 'triangle-360'
    | 'pythagoras-no-squares'
    | 'pythagoras-leg-add'
    | 'pythagoras-no-root'
    | 'triangle-no-half'
    | 'circumference-square'
    | 'square-units'

export const geometryDetectiveLevels: GeometryDetectiveError[][] = [
    ['complement-180', 'supplement-90', 'triangle-360'],
    ['pythagoras-no-squares', 'pythagoras-leg-add', 'pythagoras-no-root'],
    ['triangle-no-half', 'circumference-square', 'square-units']
]

export const GEOMETRY_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const deg = (value: number) => `${value}^{\\circ}`
const n = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
const LABELS = {
    sum: say('Batura', 'Suma', 'المجموع', 'Sum'),
    isolate: say('Bakandu', 'Despeja', 'اعزل', 'Isolate'),
    angle: say('Angelua', 'Ángulo', 'الزاوية', 'Angle'),
    pythagoras: say('Pitagoras', 'Pitágoras', 'فيثاغورس', 'Pythagoras'),
    work: say('Kalkulatu', 'Calcula', 'احسب', 'Work out'),
    root: say('Erro karratua', 'Raíz cuadrada', 'الجذر التربيعي', 'Square root'),
    formula: say('Formula', 'Fórmula', 'الصيغة', 'Formula'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    length: say('Luzera-unitateak', 'Unidades de longitud', 'وحدات الطول', 'Length units'),
    area: say('Azalera-unitateak', 'Unidades de superficie', 'وحدات المساحة', 'Area units'),
    convert: say('Bihurtu', 'Convierte', 'حوّل', 'Convert')
}

export const geometryDetectiveNames: Record<GeometryDetectiveError, LocalizedText> = {
    'complement-180': say('Osagarria 180°-tik kendu du', 'Restó de 180° para el complementario', 'طرح من 180° لإيجاد المتممة', 'Subtracted from 180° for the complement'),
    'supplement-90': say('Betegarria 90°-tik kendu du', 'Restó de 90° para el suplementario', 'طرح من 90° لإيجاد المكملة', 'Subtracted from 90° for the supplement'),
    'triangle-360': say('Triangeluaren angeluek 360° batzen dutela uste du', 'Creyó que los ángulos del triángulo suman 360°', 'ظن أن زوايا المثلث مجموعها 360°', 'Thought the angles of a triangle add up to 360°'),
    'pythagoras-no-squares': say('Katetoak karratura jaso gabe batu ditu', 'Sumó los catetos sin elevarlos al cuadrado', 'جمع ضلعي القائمة دون تربيعهما', 'Added the legs without squaring them'),
    'pythagoras-leg-add': say('Katetoa kalkulatzeko karratuak batu ditu', 'Para el cateto sumó los cuadrados', 'جمع المربعين لإيجاد ضلع القائمة', 'Added the squares to find a leg'),
    'pythagoras-no-root': say('Erro karratua ahaztu du', 'Olvidó la raíz cuadrada', 'نسي الجذر التربيعي', 'Forgot the square root'),
    'triangle-no-half': say('Triangeluaren azaleran ez du bitan zatitu', 'No dividió entre 2 el área del triángulo', 'لم يقسم مساحة المثلث على 2', 'Did not halve the area of the triangle'),
    'circumference-square': say('Zirkunferentziaren luzerarako zirkuluaren azalera erabili du', 'Usó el área del círculo para la longitud', 'استعمل مساحة الدائرة لحساب المحيط', 'Used the area of the circle for the length'),
    'square-units': say('Azalera-unitateak luzerakoak bezala bihurtu ditu', 'Convirtió unidades de superficie como si fueran de longitud', 'حوّل وحدات المساحة كأنها وحدات طول', 'Converted area units as if they were length units')
}

export const geometryDetectiveTips: Record<GeometryDetectiveError, LocalizedText> = {
    'complement-180': say('Angelu osagarriek $90^{\\circ}$ batzen dute.', 'Los complementarios suman $90^{\\circ}$.', 'الزاويتان المتتامتان مجموعهما $90^{\\circ}$.', 'Complementary angles add up to $90^{\\circ}$.'),
    'supplement-90': say('Angelu betegarriek $180^{\\circ}$ batzen dute.', 'Los suplementarios suman $180^{\\circ}$.', 'الزاويتان المتكاملتان مجموعهما $180^{\\circ}$.', 'Supplementary angles add up to $180^{\\circ}$.'),
    'triangle-360': say('Triangelu baten angeluek $180^{\\circ}$ batzen dute.', 'Los ángulos de un triángulo suman $180^{\\circ}$.', 'مجموع زوايا المثلث $180^{\\circ}$.', 'The angles of a triangle add up to $180^{\\circ}$.'),
    'pythagoras-no-squares': say('$c^{2}=a^{2}+b^{2}$: lehenik karratuak.', '$c^{2}=a^{2}+b^{2}$: primero los cuadrados.', '$c^{2}=a^{2}+b^{2}$: المربعات أولًا.', '$c^{2}=a^{2}+b^{2}$: squares first.'),
    'pythagoras-leg-add': say('Katetoa: $b^{2}=c^{2}-a^{2}$, kendu.', 'Para un cateto se resta: $b^{2}=c^{2}-a^{2}$.', 'لضلع القائمة نطرح: $b^{2}=c^{2}-a^{2}$.', 'For a leg, subtract: $b^{2}=c^{2}-a^{2}$.'),
    'pythagoras-no-root': say('$c^{2}$ lortu ondoren, atera erro karratua.', 'Tras obtener $c^{2}$, haz la raíz cuadrada.', 'بعد إيجاد $c^{2}$ نأخذ الجذر التربيعي.', 'After finding $c^{2}$, take the square root.'),
    'triangle-no-half': say('Triangelua laukizuzenaren erdia da: $A=\\frac{b\\cdot h}{2}$.', 'El triángulo es medio rectángulo: $A=\\frac{b\\cdot h}{2}$.', 'المثلث نصف مستطيل: $A=\\frac{b\\cdot h}{2}$.', 'A triangle is half a rectangle: $A=\\frac{b\\cdot h}{2}$.'),
    'circumference-square': say('Luzera: $L=2\\pi r$. Azalera: $A=\\pi r^{2}$.', 'Longitud: $L=2\\pi r$. Área: $A=\\pi r^{2}$.', 'المحيط: $L=2\\pi r$. المساحة: $A=\\pi r^{2}$.', 'Length: $L=2\\pi r$. Area: $A=\\pi r^{2}$.'),
    'square-units': say('Azalera-unitateetan, maila bakoitza $\\cdot 100$ da.', 'En unidades de superficie, cada escalón es $\\cdot 100$.', 'في وحدات المساحة كل درجة $\\cdot 100$.', 'In area units, each step is $\\cdot 100$.')
}

type Built = Omit<WorkedCase<GeometryDetectiveError>, 'options'>

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20]]

function build(random: Random, error: GeometryDetectiveError): Built | null {
    switch (error) {
        case 'complement-180': {
            const a = 5 * randomInt(random, 2, 16)
            return {
                problem: say(`Aurkitu $${deg(a)}$-ren angelu osagarria.`, `Halla el ángulo complementario de $${deg(a)}$.`, `أوجد الزاوية المتممة للزاوية $${deg(a)}$.`, `Find the complement of $${deg(a)}$.`),
                lines: [line(LABELS.sum, `\\alpha+${deg(a)}=${deg(180)}`), line(LABELS.isolate, `\\alpha=${deg(180)}-${deg(a)}`), line(LABELS.angle, `\\alpha=${deg(180 - a)}`)],
                wrong: 0, error, fix: `\\alpha=${deg(90)}-${deg(a)}=${deg(90 - a)}`, right: 90 - a, reached: 180 - a
            }
        }
        case 'supplement-90': {
            const a = 5 * randomInt(random, 2, 16)
            return {
                problem: say(`Aurkitu $${deg(a)}$-ren angelu betegarria.`, `Halla el ángulo suplementario de $${deg(a)}$.`, `أوجد الزاوية المكملة للزاوية $${deg(a)}$.`, `Find the supplement of $${deg(a)}$.`),
                lines: [line(LABELS.sum, `\\alpha+${deg(a)}=${deg(90)}`), line(LABELS.isolate, `\\alpha=${deg(90)}-${deg(a)}`), line(LABELS.angle, `\\alpha=${deg(90 - a)}`)],
                wrong: 0, error, fix: `\\alpha=${deg(180)}-${deg(a)}=${deg(180 - a)}`, right: 180 - a, reached: 90 - a
            }
        }
        case 'triangle-360': {
            const [a, b] = [5 * randomInt(random, 6, 16), 5 * randomInt(random, 4, 12)]
            if (a + b >= 170) return null
            return {
                problem: say(`Triangelu batek $${deg(a)}$ eta $${deg(b)}$ angeluak ditu. Zenbat neurtzen du hirugarrenak?`, `Un triángulo tiene ángulos de $${deg(a)}$ y $${deg(b)}$. ¿Cuánto mide el tercero?`, `مثلث فيه زاويتان $${deg(a)}$ و$${deg(b)}$. كم قياس الثالثة؟`, `A triangle has angles of $${deg(a)}$ and $${deg(b)}$. How big is the third one?`),
                lines: [line(LABELS.sum, `\\alpha+${deg(a)}+${deg(b)}=${deg(360)}`), line(LABELS.isolate, `\\alpha=${deg(360)}-${deg(a + b)}`), line(LABELS.angle, `\\alpha=${deg(360 - a - b)}`)],
                wrong: 0, error, fix: `\\alpha=${deg(180)}-${deg(a + b)}=${deg(180 - a - b)}`, right: 180 - a - b, reached: 360 - a - b
            }
        }
        case 'pythagoras-no-squares': {
            const [a, b, c] = pick(random, TRIPLES)
            return {
                problem: say(`Triangelu angeluzuzen baten katetoek $${a}$ cm eta $${b}$ cm neurtzen dute. Aurkitu hipotenusa.`, `Los catetos de un triángulo rectángulo miden $${a}$ cm y $${b}$ cm. Halla la hipotenusa.`, `ضلعا القائمة في مثلث قائم $${a}$ سم و$${b}$ سم. أوجد الوتر.`, `The legs of a right triangle are $${a}$ cm and $${b}$ cm. Find the hypotenuse.`),
                lines: [line(LABELS.pythagoras, `c^{2}=${a}+${b}`), line(LABELS.work, `c^{2}=${a + b}`), line(LABELS.root, `c=\\sqrt{${a + b}}`)],
                wrong: 0, error, fix: `c^{2}=${a * a}+${b * b}=${c * c}\\ \\to\\ c=${c}`, right: c, reached: Math.sqrt(a + b)
            }
        }
        case 'pythagoras-leg-add': {
            const [a, b, c] = pick(random, TRIPLES)
            return {
                problem: say(`Triangelu angeluzuzen baten hipotenusak $${c}$ cm neurtzen ditu eta kateto batek $${a}$ cm. Aurkitu beste katetoa.`, `La hipotenusa de un triángulo rectángulo mide $${c}$ cm y un cateto $${a}$ cm. Halla el otro cateto.`, `وتر مثلث قائم $${c}$ سم وأحد ضلعي القائمة $${a}$ سم. أوجد الضلع الآخر.`, `The hypotenuse of a right triangle is $${c}$ cm and one leg is $${a}$ cm. Find the other leg.`),
                lines: [line(LABELS.pythagoras, `b^{2}=${c}^{2}+${a}^{2}`), line(LABELS.work, `b^{2}=${c * c + a * a}`), line(LABELS.root, `b=\\sqrt{${c * c + a * a}}`)],
                wrong: 0, error, fix: `b^{2}=${c * c}-${a * a}=${b * b}\\ \\to\\ b=${b}`, right: b, reached: Math.sqrt(c * c + a * a)
            }
        }
        case 'pythagoras-no-root': {
            const [a, b, c] = pick(random, TRIPLES)
            return {
                problem: say(`Triangelu angeluzuzen baten katetoek $${a}$ cm eta $${b}$ cm neurtzen dute. Aurkitu hipotenusa.`, `Los catetos de un triángulo rectángulo miden $${a}$ cm y $${b}$ cm. Halla la hipotenusa.`, `ضلعا القائمة في مثلث قائم $${a}$ سم و$${b}$ سم. أوجد الوتر.`, `The legs of a right triangle are $${a}$ cm and $${b}$ cm. Find the hypotenuse.`),
                lines: [line(LABELS.pythagoras, `c^{2}=${a}^{2}+${b}^{2}`), line(LABELS.work, `c^{2}=${a * a}+${b * b}=${c * c}`), line(LABELS.result, `c=${c * c}`)],
                wrong: 2, error, fix: `c=\\sqrt{${c * c}}=${c}`, right: c, reached: c * c
            }
        }
        case 'triangle-no-half': {
            const [b, h] = [randomInt(random, 3, 12), randomInt(random, 2, 10)]
            if ((b * h) % 2 !== 0) return null
            return {
                problem: say(`Aurkitu oinarria $${b}$ cm eta altuera $${h}$ cm dituen triangeluaren azalera.`, `Halla el área de un triángulo de base $${b}$ cm y altura $${h}$ cm.`, `أوجد مساحة مثلث قاعدته $${b}$ سم وارتفاعه $${h}$ سم.`, `Find the area of a triangle with base $${b}$ cm and height $${h}$ cm.`),
                lines: [line(LABELS.formula, 'A=b\\cdot h'), line(LABELS.substitute, `A=${b}\\cdot ${h}`), line(LABELS.result, `A=${b * h}`)],
                wrong: 0, error, fix: `A=\\frac{${b}\\cdot ${h}}{2}=${(b * h) / 2}`, right: (b * h) / 2, reached: b * h
            }
        }
        case 'circumference-square': {
            const r = randomInt(random, 2, 9)
            return {
                problem: say(`Aurkitu $${r}$ cm-ko erradioa duen zirkunferentziaren luzera ($\\pi\\approx 3{,}14$).`, `Halla la longitud de una circunferencia de radio $${r}$ cm ($\\pi\\approx 3{,}14$).`, `أوجد محيط دائرة نصف قطرها $${r}$ سم ($\\pi\\approx 3{,}14$).`, `Find the length of a circle with radius $${r}$ cm ($\\pi\\approx 3{,}14$).`),
                lines: [line(LABELS.formula, 'L=\\pi\\cdot r^{2}'), line(LABELS.substitute, `L=3{,}14\\cdot ${r}^{2}`), line(LABELS.result, `L=${n(3.14 * r * r)}`)],
                wrong: 0, error, fix: `L=2\\cdot 3{,}14\\cdot ${r}=${n(2 * 3.14 * r)}`, right: Math.round(2 * 3.14 * r * 100) / 100, reached: Math.round(3.14 * r * r * 100) / 100
            }
        }
        case 'square-units': {
            const a = randomInt(random, 2, 9)
            return {
                problem: say(`Adierazi $${a}\\ \\text{m}^{2}$ $\\text{dm}^{2}$-tan.`, `Expresa $${a}\\ \\text{m}^{2}$ en $\\text{dm}^{2}$.`, `حوّل $${a}\\ \\text{m}^{2}$ إلى $\\text{dm}^{2}$.`, `Write $${a}\\ \\text{m}^{2}$ in $\\text{dm}^{2}$.`),
                lines: [line(LABELS.length, '1\\ \\text{m}=10\\ \\text{dm}'), line(LABELS.area, '1\\ \\text{m}^{2}=10\\ \\text{dm}^{2}'), line(LABELS.convert, `${a}\\ \\text{m}^{2}=${10 * a}\\ \\text{dm}^{2}`)],
                wrong: 1, error, fix: `1\\ \\text{m}^{2}=100\\ \\text{dm}^{2}\\ \\to\\ ${a}\\ \\text{m}^{2}=${100 * a}\\ \\text{dm}^{2}`, right: 100 * a, reached: 10 * a
            }
        }
    }
}

export const createGeometryDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, geometryDetectiveLevels[levelIndex], GEOMETRY_DETECTIVE_CASES, build)
