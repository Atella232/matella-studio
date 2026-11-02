import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Irudi lauen detektibea (1. DBH plane figures): a worked answer of three
   lines with one wrong line. Level 1: polygons (the diagonals without the
   half, the angles adding up to n · 180°, the central angle taken as the
   interior one); level 2: triangles and quadrilaterals (a third side as
   long as the other two together, consecutive angles of a parallelogram
   taken as equal, the base angles of an isosceles triangle not halved);
   level 3: circles and areas (the inscribed angle equal to the central
   one, the hole added, the ring worked out with R − r).
   ========================================================================== */

export type FiguresDetectiveError =
    | 'diagonals-no-half'
    | 'angle-sum-n'
    | 'central-as-interior'
    | 'third-side-equal'
    | 'consecutive-equal'
    | 'isosceles-no-half'
    | 'inscribed-as-central'
    | 'hole-added'
    | 'ring-difference'

export const figuresDetectiveLevels: FiguresDetectiveError[][] = [
    ['diagonals-no-half', 'angle-sum-n', 'central-as-interior'],
    ['third-side-equal', 'consecutive-equal', 'isosceles-no-half'],
    ['inscribed-as-central', 'hole-added', 'ring-difference']
]

export const FIGURES_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const deg = (value: number) => `${value}^{\\circ}`
const n = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
const LABELS = {
    formula: say('Formula', 'Fórmula', 'الصيغة', 'Formula'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    sum: say('Batura', 'Suma', 'المجموع', 'Sum'),
    each: say('Angelu bakoitza', 'Cada ángulo', 'كل زاوية', 'Each angle'),
    inequality: say('Desberdintza', 'Desigualdad', 'المتباينة', 'Inequality'),
    longest: say('Luzeena', 'El más largo', 'الأطول', 'The longest'),
    opposite: say('Aurkakoak', 'Opuestos', 'المتقابلة', 'Opposite'),
    consecutive: say('Ondokoak', 'Consecutivos', 'المتتالية', 'Consecutive'),
    isolate: say('Bakandu', 'Despeja', 'اعزل', 'Isolate'),
    central: say('Zentrala', 'Central', 'المركزية', 'Central'),
    inscribed: say('Inskribatua', 'Inscrito', 'المحيطية', 'Inscribed'),
    square: say('Karratua', 'Cuadrado', 'المربع', 'Square'),
    circle: say('Zirkulua', 'Círculo', 'الدائرة', 'Circle'),
    shape: say('Irudia', 'Figura', 'الشكل', 'Shape'),
    ring: say('Koroa', 'Corona', 'الحلقة', 'Ring')
}

export const figuresDetectiveNames: Record<FiguresDetectiveError, LocalizedText> = {
    'diagonals-no-half': say('Diagonalak kontatzean ez du bitan zatitu', 'No dividió entre 2 al contar diagonales', 'لم يقسم على 2 عند عدّ الأقطار', 'Did not divide by 2 when counting diagonals'),
    'angle-sum-n': say('Angeluen batura $n\\cdot 180^{\\circ}$ dela uste du', 'Creyó que la suma de ángulos es $n\\cdot 180^{\\circ}$', 'ظن أن مجموع الزوايا $n\\cdot 180^{\\circ}$', 'Thought the angles add up to $n\\cdot 180^{\\circ}$'),
    'central-as-interior': say('Angelu zentrala barne-angelua balitz bezala hartu du', 'Tomó el ángulo central como el interior', 'أخذ الزاوية المركزية على أنها الداخلية', 'Took the central angle as the interior one'),
    'third-side-equal': say('Hirugarren aldea beste bien batura bezain luzea izan daitekeela uste du', 'Creyó que el tercer lado puede medir lo que los otros dos juntos', 'ظن أن الضلع الثالث يمكن أن يساوي مجموع الآخرين', 'Thought the third side can be as long as the other two together'),
    'consecutive-equal': say('Ondoko angeluak berdinak direla uste du', 'Creyó que los ángulos consecutivos son iguales', 'ظن أن الزوايا المتتالية متساوية', 'Thought consecutive angles are equal'),
    'isosceles-no-half': say('Oinarriko bi angeluetarako ez du bitan zatitu', 'No repartió entre los dos ángulos de la base', 'لم يقسم على زاويتي القاعدة', 'Did not share it between the two base angles'),
    'inscribed-as-central': say('Angelu inskribatua zentralaren berdina dela uste du', 'Creyó que el inscrito es igual al central', 'ظن أن الزاوية المحيطية تساوي المركزية', 'Thought the inscribed angle equals the central one'),
    'hole-added': say('Zuloa batu du, kendu beharrean', 'Sumó el hueco en vez de restarlo', 'جمع الفراغ بدل طرحه', 'Added the hole instead of taking it away'),
    'ring-difference': say('Koroan erradioak kendu ditu karratura jaso aurretik', 'En la corona restó los radios antes de elevar al cuadrado', 'طرح نصفي القطرين قبل التربيع في الحلقة', 'Subtracted the radii before squaring for the ring')
}

export const figuresDetectiveTips: Record<FiguresDetectiveError, LocalizedText> = {
    'diagonals-no-half': say('Diagonal bakoitza bi aldiz kontatzen da: $D=\\frac{n\\cdot (n-3)}{2}$.', 'Cada diagonal se cuenta dos veces: $D=\\frac{n\\cdot (n-3)}{2}$.', 'كل قطر يُعدّ مرتين: $D=\\frac{n\\cdot (n-3)}{2}$.', 'Each diagonal is counted twice: $D=\\frac{n\\cdot (n-3)}{2}$.'),
    'angle-sum-n': say('Poligonoa $n-2$ triangelutan zatitzen da: $S=(n-2)\\cdot 180^{\\circ}$.', 'El polígono se parte en $n-2$ triángulos: $S=(n-2)\\cdot 180^{\\circ}$.', 'ينقسم المضلع إلى $n-2$ مثلثات: $S=(n-2)\\cdot 180^{\\circ}$.', 'The polygon splits into $n-2$ triangles: $S=(n-2)\\cdot 180^{\\circ}$.'),
    'central-as-interior': say('Barne-angelua: batura zati $n$. Zentrala: $360^{\\circ}\\div n$.', 'Interior: la suma entre $n$. Central: $360^{\\circ}\\div n$.', 'الداخلية: المجموع على $n$. المركزية: $360^{\\circ}\\div n$.', 'Interior: the sum divided by $n$. Central: $360^{\\circ}\\div n$.'),
    'third-side-equal': say('Alde handiena beste bien batura baino txikiagoa: $c<a+b$.', 'El lado mayor es menor que la suma de los otros dos: $c<a+b$.', 'الضلع الأكبر أصغر من مجموع الآخرين: $c<a+b$.', 'The longest side is shorter than the other two together: $c<a+b$.'),
    'consecutive-equal': say('Paralelogramoan ondoko angeluek $180^{\\circ}$ batzen dute.', 'En un paralelogramo los consecutivos suman $180^{\\circ}$.', 'في متوازي الأضلاع الزاويتان المتتاليتان مجموعهما $180^{\\circ}$.', 'In a parallelogram consecutive angles add up to $180^{\\circ}$.'),
    'isosceles-no-half': say('Oinarriko bi angeluak berdinak dira: zatitu bitan.', 'Los dos ángulos de la base son iguales: divide entre 2.', 'زاويتا القاعدة متساويتان: اقسم على 2.', 'The two base angles are equal: divide by 2.'),
    'inscribed-as-central': say('Inskribatua = zentrala $\\div 2$.', 'Inscrito = central $\\div 2$.', 'المحيطية = المركزية $\\div 2$.', 'Inscribed = central $\\div 2$.'),
    'hole-added': say('Zuloak azalera kentzen du: osoa ken zuloa.', 'El hueco quita área: total menos hueco.', 'الفراغ ينقص المساحة: الكل ناقص الفراغ.', 'A hole takes area away: the whole minus the hole.'),
    'ring-difference': say('Koroa: zirkulu handia ken txikia, $\\pi\\cdot (R^{2}-r^{2})$.', 'Corona: círculo grande menos pequeño, $\\pi\\cdot (R^{2}-r^{2})$.', 'الحلقة: الدائرة الكبيرة ناقص الصغيرة، $\\pi\\cdot (R^{2}-r^{2})$.', 'Ring: big circle minus small circle, $\\pi\\cdot (R^{2}-r^{2})$.')
}

type Built = Omit<WorkedCase<FiguresDetectiveError>, 'options'>

const POLYGON: Record<number, LocalizedText> = {
    5: say('pentagono', 'pentágono', 'مخمس', 'pentagon'),
    6: say('hexagono', 'hexágono', 'مسدس', 'hexagon'),
    8: say('oktogono', 'octógono', 'مثمن', 'octagon'),
    9: say('eneagono', 'eneágono', 'متساعي', 'nonagon'),
    10: say('dekagono', 'decágono', 'معشر', 'decagon'),
    12: say('dodekagono', 'dodecágono', 'مضلع ذو اثني عشر ضلعًا', 'dodecagon')
}

function build(random: Random, error: FiguresDetectiveError): Built | null {
    switch (error) {
        case 'diagonals-no-half': {
            const sides = pick(random, [5, 6, 8, 9, 10, 12])
            const name = POLYGON[sides]
            return {
                problem: say(`Zenbat diagonal ditu ${name.eu} batek?`, `¿Cuántas diagonales tiene un ${name.es}?`, `كم قطرًا في ${name.ar}؟`, `How many diagonals does a ${name.en} have?`),
                lines: [line(LABELS.formula, 'D=n\\cdot (n-3)'), line(LABELS.substitute, `D=${sides}\\cdot ${sides - 3}`), line(LABELS.result, `D=${sides * (sides - 3)}`)],
                wrong: 0, error, fix: `D=\\frac{${sides}\\cdot ${sides - 3}}{2}=${(sides * (sides - 3)) / 2}`, right: (sides * (sides - 3)) / 2, reached: sides * (sides - 3)
            }
        }
        case 'angle-sum-n': {
            const sides = pick(random, [5, 6, 8, 9, 10])
            const name = POLYGON[sides]
            return {
                problem: say(`Zenbat batzen dute ${name.eu} baten barne-angeluek?`, `¿Cuánto suman los ángulos interiores de un ${name.es}?`, `ما مجموع الزوايا الداخلية في ${name.ar}؟`, `What do the interior angles of a ${name.en} add up to?`),
                lines: [line(LABELS.formula, `S=n\\cdot ${deg(180)}`), line(LABELS.substitute, `S=${sides}\\cdot ${deg(180)}`), line(LABELS.result, `S=${deg(sides * 180)}`)],
                wrong: 0, error, fix: `S=(${sides}-2)\\cdot ${deg(180)}=${deg((sides - 2) * 180)}`, right: (sides - 2) * 180, reached: sides * 180
            }
        }
        case 'central-as-interior': {
            const sides = pick(random, [5, 6, 8, 9, 10, 12])
            const name = POLYGON[sides]
            const total = (sides - 2) * 180
            return {
                problem: say(`Zenbat neurtzen du ${name.eu} erregular baten barne-angelu bakoitzak?`, `¿Cuánto mide cada ángulo interior de un ${name.es} regular?`, `كم قياس كل زاوية داخلية في ${name.ar} منتظم؟`, `How big is each interior angle of a regular ${name.en}?`),
                lines: [line(LABELS.sum, `S=(${sides}-2)\\cdot ${deg(180)}=${deg(total)}`), line(LABELS.each, `\\alpha=${deg(360)}\\div ${sides}`), line(LABELS.result, `\\alpha=${deg(360 / sides)}`)],
                wrong: 1, error, fix: `\\alpha=${deg(total)}\\div ${sides}=${deg(total / sides)}`, right: total / sides, reached: 360 / sides
            }
        }
        case 'third-side-equal': {
            const [a, b] = [randomInt(random, 3, 9), randomInt(random, 3, 9)]
            return {
                problem: say(`Triangelu baten bi aldek $${a}$ cm eta $${b}$ cm neurtzen dute. Zein da hirugarren aldearen luzera handiena, cm osotan?`, `Dos lados de un triángulo miden $${a}$ cm y $${b}$ cm. ¿Cuál es la mayor longitud entera del tercer lado?`, `ضلعان في مثلث طولاهما $${a}$ سم و$${b}$ سم. ما أكبر طول صحيح للضلع الثالث؟`, `Two sides of a triangle are $${a}$ cm and $${b}$ cm. What is the longest whole length of the third side?`),
                lines: [line(LABELS.inequality, `c\\le ${a}+${b}`), line(LABELS.substitute, `c\\le ${a + b}`), line(LABELS.longest, `c=${a + b}`)],
                wrong: 0, error, fix: `c<${a + b}\\ \\to\\ c=${a + b - 1}`, right: a + b - 1, reached: a + b
            }
        }
        case 'consecutive-equal': {
            const a = 5 * randomInt(random, 10, 17)
            return {
                problem: say(`Paralelogramo baten angelu batek $${deg(a)}$ neurtzen du. Zenbat neurtzen du haren ondoko angeluak?`, `Un ángulo de un paralelogramo mide $${deg(a)}$. ¿Cuánto mide un ángulo consecutivo?`, `زاوية في متوازي أضلاع قياسها $${deg(a)}$. كم قياس الزاوية المتتالية لها؟`, `One angle of a parallelogram is $${deg(a)}$. How big is a consecutive angle?`),
                lines: [line(LABELS.opposite, `\\gamma=\\alpha=${deg(a)}`), line(LABELS.consecutive, `\\beta=\\alpha`), line(LABELS.result, `\\beta=${deg(a)}`)],
                wrong: 1, error, fix: `\\beta=${deg(180)}-${deg(a)}=${deg(180 - a)}`, right: 180 - a, reached: a
            }
        }
        case 'isosceles-no-half': {
            const a = 2 * randomInt(random, 10, 50)
            return {
                problem: say(`Triangelu isoszele batean angelu desberdinak $${deg(a)}$ neurtzen du. Zenbat neurtzen du oinarriko angelu bakoitzak?`, `En un triángulo isósceles el ángulo desigual mide $${deg(a)}$. ¿Cuánto mide cada ángulo de la base?`, `في مثلث متساوي الساقين الزاوية المختلفة $${deg(a)}$. كم قياس كل زاوية من زاويتي القاعدة؟`, `In an isosceles triangle the odd angle is $${deg(a)}$. How big is each base angle?`),
                lines: [line(LABELS.sum, `${deg(a)}+\\beta+\\beta=${deg(180)}`), line(LABELS.isolate, `\\beta=${deg(180)}-${deg(a)}`), line(LABELS.result, `\\beta=${deg(180 - a)}`)],
                wrong: 1, error, fix: `\\beta=(${deg(180)}-${deg(a)})\\div 2=${deg((180 - a) / 2)}`, right: (180 - a) / 2, reached: 180 - a
            }
        }
        case 'inscribed-as-central': {
            const c = 10 * randomInt(random, 4, 16)
            return {
                problem: say(`Angelu zentral batek $${deg(c)}$ neurtzen du. Zenbat neurtzen du arku bera hartzen duen angelu inskribatuak?`, `Un ángulo central mide $${deg(c)}$. ¿Cuánto mide un ángulo inscrito que abarca el mismo arco?`, `زاوية مركزية قياسها $${deg(c)}$. كم قياس الزاوية المحيطية المقابلة للقوس نفسه؟`, `A central angle is $${deg(c)}$. How big is an inscribed angle on the same arc?`),
                lines: [line(LABELS.central, `\\alpha=${deg(c)}`), line(LABELS.inscribed, '\\beta=\\alpha'), line(LABELS.result, `\\beta=${deg(c)}`)],
                wrong: 1, error, fix: `\\beta=\\alpha\\div 2=${deg(c / 2)}`, right: c / 2, reached: c
            }
        }
        case 'hole-added': {
            const [side, r] = [2 * randomInt(random, 4, 8), randomInt(random, 1, 3)]
            const [squareArea, hole] = [side * side, Math.round(3.14 * r * r * 100) / 100]
            return {
                problem: say(`$${side}$ cm-ko alde duen karratu bati $${r}$ cm-ko erradioko zulo biribila egin zaio. Zein da irudiaren azalera ($\\pi\\approx 3{,}14$)?`, `A un cuadrado de $${side}$ cm de lado se le hace un agujero redondo de $${r}$ cm de radio. ¿Cuál es el área de la figura ($\\pi\\approx 3{,}14$)?`, `في مربع طول ضلعه $${side}$ سم ثقب دائري نصف قطره $${r}$ سم. ما مساحة الشكل ($\\pi\\approx 3{,}14$)؟`, `A square with side $${side}$ cm has a round hole of radius $${r}$ cm. What is the area of the shape ($\\pi\\approx 3{,}14$)?`),
                lines: [line(LABELS.square, `${side}^{2}=${squareArea}`), line(LABELS.circle, `3{,}14\\cdot ${r}^{2}=${n(hole)}`), line(LABELS.shape, `${squareArea}+${n(hole)}=${n(squareArea + hole)}`)],
                wrong: 2, error, fix: `${squareArea}-${n(hole)}=${n(squareArea - hole)}`, right: Math.round((squareArea - hole) * 100) / 100, reached: Math.round((squareArea + hole) * 100) / 100
            }
        }
        case 'ring-difference': {
            const [big, small] = [randomInt(random, 4, 8), randomInt(random, 1, 3)]
            const [right, reached] = [Math.round(3.14 * (big * big - small * small) * 100) / 100, Math.round(3.14 * (big - small) ** 2 * 100) / 100]
            return {
                problem: say(`Kalkulatu $${big}$ cm eta $${small}$ cm-ko erradioak dituen koroa zirkularraren azalera ($\\pi\\approx 3{,}14$).`, `Halla el área de la corona circular de radios $${big}$ cm y $${small}$ cm ($\\pi\\approx 3{,}14$).`, `أوجد مساحة الحلقة الدائرية التي نصفا قطريها $${big}$ سم و$${small}$ سم ($\\pi\\approx 3{,}14$).`, `Find the area of the ring with radii $${big}$ cm and $${small}$ cm ($\\pi\\approx 3{,}14$).`),
                lines: [line(LABELS.ring, `\\pi\\cdot (${big}-${small})^{2}`), line(LABELS.substitute, `3{,}14\\cdot ${big - small}^{2}`), line(LABELS.result, n(reached))],
                wrong: 0, error, fix: `3{,}14\\cdot (${big * big}-${small * small})=${n(right)}`, right, reached
            }
        }
    }
}

export const createFiguresDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, figuresDetectiveLevels[levelIndex], FIGURES_DETECTIVE_CASES, build)
