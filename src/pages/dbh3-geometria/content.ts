import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Planoko geometria · 3. DBH — diagnostic, guided practice, exercise bank
   and challenges, after Santillana 3.º ESO unit 8 and Anaya 3.º ESO unit
   10 (the books fix the scope and the order; every number here is
   original). Every closed answer also has an entry in `geometry3Checks`:
   the formula it comes from and its data, so that the tests can work the
   answer out again and check that the data are in the question. π is
   taken as 3,14 and the question says so.
   ========================================================================== */

/** An exact value from a decimal number (up to four decimals) */
const n = (value: number): FractionValue => fraction(Math.round(value * 10000), 10000)

export type GeometryCheckKind =
    | 'polygon-sum' | 'missing-angle' | 'regular-interior' | 'regular-exterior' | 'sides-from-exterior' | 'inscribed' | 'central'
    | 'half' | 'two-thirds' | 'one-third' | 'midpoint' | 'hypotenuse' | 'leg' | 'isosceles-height' | 'rhombus-side' | 'distance'
    | 'triangle' | 'parallelogram' | 'trapezium' | 'rhombus' | 'regular-area' | 'circle-area' | 'circumference' | 'sector' | 'arc' | 'ring'
    | 'thales' | 'scale-side' | 'area-ratio' | 'map' | 'shadow'

export interface GeometryCheck {
    kind: GeometryCheckKind
    args: number[]
}

const PI = 3.14
const sq = (value: number) => value * value

/** The formula of every kind of check, with π = 3,14 */
export function geometryAnswer({ kind, args }: GeometryCheck): number {
    const [a, b, c] = args
    switch (kind) {
        case 'polygon-sum': return (a - 2) * 180
        case 'missing-angle': return (a - 2) * 180 - args.slice(1).reduce((total, angle) => total + angle, 0)
        case 'regular-interior': return 180 - 360 / a
        case 'regular-exterior': return 360 / a
        case 'sides-from-exterior': return 360 / a
        case 'inscribed': return a / 2
        case 'central': return 2 * a
        case 'half': return a / 2
        case 'two-thirds': return (2 * a) / 3
        case 'one-third': return a / 3
        case 'midpoint': return (a + b) / 2
        case 'hypotenuse': return Math.sqrt(sq(a) + sq(b))
        case 'leg': return Math.sqrt(sq(a) - sq(b))
        case 'isosceles-height': return Math.sqrt(sq(a) - sq(b / 2))
        case 'rhombus-side': return Math.sqrt(sq(a / 2) + sq(b / 2))
        case 'distance': return Math.sqrt(sq(c - a) + sq(args[3] - b))
        case 'triangle': return (a * b) / 2
        case 'parallelogram': return a * b
        case 'trapezium': return ((a + b) * c) / 2
        case 'rhombus': return (a * b) / 2
        case 'regular-area': return (a * b * c) / 2
        case 'circle-area': return PI * sq(a)
        case 'circumference': return 2 * PI * a
        case 'sector': return (PI * sq(a) * b) / 360
        case 'arc': return (2 * PI * a * b) / 360
        case 'ring': return PI * (sq(a) - sq(b))
        case 'thales': return (b * c) / a
        case 'scale-side': return a * b
        case 'area-ratio': return a * sq(b)
        case 'map': return (a * b) / 100
        case 'shadow': return (a * c) / b
    }
}

const check = (kind: GeometryCheckKind, ...args: number[]): GeometryCheck => ({ kind, args })

/** p: practice, c: challenge, b: bank */
export const geometry3Checks: Record<string, GeometryCheck> = {
    p1: check('missing-angle', 4, 85, 110, 70), p2: check('regular-interior', 10), p3: check('sides-from-exterior', 40), p4: check('inscribed', 150),
    p5: check('half', 124), p6: check('two-thirds', 18), p7: check('midpoint', 2, 14), p8: check('hypotenuse', 12, 16),
    p9: check('hypotenuse', 9, 12), p10: check('leg', 17, 15), p11: check('isosceles-height', 13, 10), p12: check('distance', 1, 2, 7, 10),
    p13: check('trapezium', 12, 8, 5), p14: check('rhombus', 10, 7), p15: check('regular-area', 6, 10, 8.66), p16: check('sector', 10, 90),
    p17: check('thales', 5, 8, 15), p18: check('scale-side', 3, 7), p19: check('area-ratio', 15, 2), p20: check('shadow', 2, 3, 12),
    c101: check('polygon-sum', 12), c102: check('missing-angle', 6, 130, 120, 110, 140, 125), c103: check('central', 35),
    c104: check('one-third', 21), c105: check('half', 26), c106: check('midpoint', -3, 11),
    c107: check('rhombus-side', 24, 10), c108: check('distance', -2, 1, 4, 9), c109: check('leg', 25, 7),
    c110: check('ring', 10, 6), c111: check('arc', 15, 120), c112: check('regular-area', 8, 5, 6.04),
    c113: check('map', 7, 50000), c114: check('area-ratio', 48, 0.5), c115: check('shadow', 1.6, 2, 15),
    b1: check('polygon-sum', 7), b2: check('regular-exterior', 9), b3: check('regular-interior', 6), b4: check('inscribed', 88), b5: check('polygon-sum', 10),
    b6: check('missing-angle', 3, 47, 68), b7: check('regular-interior', 12), b8: check('sides-from-exterior', 24), b9: check('central', 72), b10: check('missing-angle', 5, 100, 108, 112, 96),
    b11: check('half', 90), b12: check('midpoint', 3, 9), b13: check('two-thirds', 27), b14: check('one-third', 15), b15: check('half', 150),
    b16: check('midpoint', -4, 6), b17: check('half', 26), b18: check('two-thirds', 30), b19: check('half', 50), b20: check('one-third', 36),
    b21: check('hypotenuse', 6, 8), b22: check('leg', 10, 6), b23: check('hypotenuse', 5, 12), b24: check('leg', 25, 24), b25: check('isosceles-height', 5, 6),
    b26: check('hypotenuse', 15, 20), b27: check('rhombus-side', 16, 12), b28: check('distance', 0, 0, 8, 6), b29: check('leg', 26, 10), b30: check('isosceles-height', 17, 16),
    b31: check('triangle', 9, 6), b32: check('parallelogram', 12, 5), b33: check('rhombus', 8, 5), b34: check('circle-area', 10), b35: check('circumference', 5),
    b36: check('trapezium', 9, 5, 4), b37: check('regular-area', 6, 4, 3.46), b38: check('sector', 6, 120), b39: check('ring', 5, 3), b40: check('arc', 9, 40),
    b41: check('thales', 3, 4, 9), b42: check('scale-side', 2, 6), b43: check('area-ratio', 12, 3), b44: check('map', 4, 25000), b45: check('shadow', 3, 2, 10),
    b46: check('thales', 6, 9, 10), b47: check('scale-side', 2.5, 4), b48: check('area-ratio', 50, 0.2), b49: check('map', 12, 100000), b50: check('shadow', 1.8, 1.2, 8)
}

const answer = (key: string) => n(geometryAnswer(geometry3Checks[key]))

export const geometry3Diagnostic: DiagnosticQuestion[] = [
    {
        id: 6801,
        prompt: say('Zenbat batzen dute pentagono baten barne-angeluek?', '¿Cuánto suman los ángulos interiores de un pentágono?', 'كم مجموع الزوايا الداخلية لخماسي؟', 'What do the interior angles of a pentagon add up to?'),
        options: [same('$900°$'), same('$540°$'), same('$360°$')],
        correctIndex: 1,
        explanation: same('$(5-2)\\cdot 180°=540°$'),
        topic: 'polygon-angles'
    },
    {
        id: 6802,
        prompt: say('Angelu zentral batek 100° neurtzen du. Zenbat arku bera hartzen duen inskribatuak?', 'Un ángulo central mide 100°. ¿Cuánto mide el inscrito que abarca el mismo arco?', 'زاوية مركزية قياسها 100°. كم المحيطية على القوس نفسه؟', 'A central angle is 100°. How big is the inscribed angle on the same arc?'),
        options: [same('$50°$'), same('$100°$'), same('$200°$')],
        correctIndex: 0,
        explanation: same('$100°\\div 2=50°$'),
        topic: 'circle-angles'
    },
    {
        id: 6803,
        prompt: say('Zein puntu dago triangeluaren hiru erpinetatik distantzia berera?', '¿Qué punto está a la misma distancia de los tres vértices del triángulo?', 'أي نقطة على البعد نفسه من رؤوس المثلث الثلاثة؟', 'Which point is the same distance from the three vertices of a triangle?'),
        options: [say('Barizentroa', 'El baricentro', 'مركز الثقل', 'The centroid'), say('Inzentroa', 'El incentro', 'مركز الدائرة المحاطة', 'The incentre'), say('Zirkunzentroa', 'El circuncentro', 'مركز الدائرة المحيطة', 'The circumcentre')],
        correctIndex: 2,
        explanation: say('Erdibitzaileen puntua: bi erpinetatik distantzia berera dago erdibitzaile bakoitzean.', 'El punto de las mediatrices: en cada mediatriz está a la misma distancia de dos vértices.', 'نقطة المنصّفات العمودية: على كل منصّف تكون على البعد نفسه من رأسين.', 'The point of the perpendicular bisectors: on each one it is the same distance from two vertices.'),
        topic: 'notable-points'
    },
    {
        id: 6804,
        prompt: say('Triangelu zuzen baten katetoak 6 eta 8 dira. Zenbat da hipotenusa?', 'Los catetos de un triángulo rectángulo miden 6 y 8. ¿Cuánto mide la hipotenusa?', 'ضلعا مثلث قائم 6 و8. كم الوتر؟', 'The legs of a right triangle are 6 and 8. How long is the hypotenuse?'),
        options: [same('$14$'), same('$10$'), same('$\\sqrt{28}$')],
        correctIndex: 1,
        explanation: same('$\\sqrt{36+64}=\\sqrt{100}=10$'),
        topic: 'pythagoras'
    },
    {
        id: 6805,
        prompt: say('Zein da oinarria 10 eta altuera 4 dituen triangeluaren azalera?', '¿Cuál es el área de un triángulo de base 10 y altura 4?', 'ما مساحة مثلث قاعدته 10 وارتفاعه 4؟', 'What is the area of a triangle with base 10 and height 4?'),
        options: [same('$40$'), same('$14$'), same('$20$')],
        correctIndex: 2,
        explanation: same('$\\frac{10\\cdot 4}{2}=20$'),
        topic: 'polygon-areas'
    },
    {
        id: 6806,
        prompt: say('Zirkulu baten diametroa 10 cm da. Zein da haren azalera?', 'Un círculo tiene 10 cm de diámetro. ¿Cuál es su área?', 'قطر دائرة 10 سم. ما مساحتها؟', 'A circle has a diameter of 10 cm. What is its area?'),
        options: [same('$25\\pi$'), same('$100\\pi$'), same('$10\\pi$')],
        correctIndex: 0,
        explanation: same('$r=5\\ \\to\\ \\pi\\cdot 5^{2}=25\\pi$'),
        topic: 'circle-areas'
    },
    {
        id: 6807,
        prompt: say('$\\frac{4}{6}=\\frac{10}{x}$. Zenbat da $x$?', '$\\frac{4}{6}=\\frac{10}{x}$. ¿Cuánto vale $x$?', '$\\frac{4}{6}=\\frac{10}{x}$. كم يساوي $x$؟', '$\\frac{4}{6}=\\frac{10}{x}$. What is $x$?'),
        options: [same('$15$'), same('$12$'), same('$\\frac{20}{3}$')],
        correctIndex: 0,
        explanation: same('$x=\\frac{6\\cdot 10}{4}=15$'),
        topic: 'thales'
    },
    {
        id: 6808,
        prompt: say('Laukizuzen baten aldeak bikoiztu egiten dira. Nola aldatzen da azalera?', 'Se doblan los lados de un rectángulo. ¿Cómo cambia el área?', 'تتضاعف أضلاع مستطيل. كيف تتغيّر المساحة؟', 'The sides of a rectangle are doubled. How does the area change?'),
        options: [say('Bikoiztu', 'Se dobla', 'تتضاعف', 'It doubles'), say('Laukoiztu', 'Se multiplica por 4', 'تُضرب في 4', 'It is multiplied by 4'), say('Ez da aldatzen', 'No cambia', 'لا تتغيّر', 'It does not change')],
        correctIndex: 1,
        explanation: same('$k=2\\ \\to\\ k^{2}=4$'),
        topic: 'scale-areas'
    }
]

export const geometry3Practice: PracticeItem[] = [
    /* ---------- Angles ---------- */
    { id: 1, stage: 'angles', prompt: say('Lauki baten hiru angeluk 85°, 110° eta 70° neurtzen dute. Zenbat laugarrenak?', 'Tres ángulos de un cuadrilátero miden 85°, 110° y 70°. ¿Cuánto mide el cuarto?', 'ثلاث زوايا لرباعي 85° و110° و70°. كم الرابعة؟', 'Three angles of a quadrilateral are 85°, 110° and 70°. How big is the fourth?'), expected: answer('p1'), hint: say('Laukiaren angeluek 360° batzen dute.', 'Los ángulos de un cuadrilátero suman 360°.', 'مجموع زوايا الرباعي 360°.', 'The angles of a quadrilateral add up to 360°.'), explanation: same('$360°-265°=95°$') },
    { id: 2, stage: 'angles', prompt: say('Zenbat neurtzen du dekagono erregular baten (10 alde) barne-angeluak?', '¿Cuánto mide el ángulo interior de un decágono regular (10 lados)?', 'كم قياس الزاوية الداخلية لعشاري منتظم (10 أضلاع)؟', 'How big is the interior angle of a regular decagon (10 sides)?'), expected: answer('p2'), hint: say('Kanpokoa: $360°\\div 10$.', 'El exterior: $360°\\div 10$.', 'الخارجية: $360°\\div 10$.', 'The exterior one: $360°\\div 10$.'), explanation: same('$180°-36°=144°$') },
    { id: 3, stage: 'angles', prompt: say('Poligono erregular baten kanpo-angeluak 40° neurtzen du. Zenbat alde ditu?', 'El ángulo exterior de un polígono regular mide 40°. ¿Cuántos lados tiene?', 'الزاوية الخارجية لمضلع منتظم 40°. كم ضلعًا له؟', 'The exterior angle of a regular polygon is 40°. How many sides does it have?'), expected: answer('p3'), hint: say('Kanpo-angeluek 360° batzen dute.', 'Los ángulos exteriores suman 360°.', 'مجموع الزوايا الخارجية 360°.', 'The exterior angles add up to 360°.'), explanation: same('$360°\\div 40°=9$') },
    { id: 4, stage: 'angles', prompt: say('Angelu zentral batek 150° neurtzen du. Zenbat arku bera hartzen duen inskribatuak?', 'Un ángulo central mide 150°. ¿Cuánto mide el inscrito que abarca el mismo arco?', 'زاوية مركزية 150°. كم المحيطية على القوس نفسه؟', 'A central angle is 150°. How big is the inscribed angle on the same arc?'), expected: answer('p4'), hint: say('Inskribatua zentralaren erdia da.', 'El inscrito es la mitad del central.', 'المحيطية نصف المركزية.', 'The inscribed angle is half the central one.'), explanation: same('$150°\\div 2=75°$') },

    /* ---------- Loci ---------- */
    { id: 5, stage: 'loci', prompt: say('124°-ko angelu baten erdikariak bi angelu sortzen ditu. Zenbat neurtzen du bakoitzak?', 'La bisectriz de un ángulo de 124° forma dos ángulos. ¿Cuánto mide cada uno?', 'يكوّن منصّف زاوية 124° زاويتين. كم كل منهما؟', 'The bisector of a 124° angle makes two angles. How big is each?'), expected: answer('p5'), hint: say('Erdikariak erditik banatzen du.', 'La bisectriz lo parte por la mitad.', 'المنصّف يقسمها نصفين.', 'The bisector halves it.'), explanation: same('$124°\\div 2=62°$') },
    { id: 6, stage: 'loci', prompt: say('Triangelu baten mediana batek 18 cm neurtzen du. Zein distantziatara dago barizentroa erpinetik?', 'Una mediana de un triángulo mide 18 cm. ¿A qué distancia del vértice está el baricentro?', 'متوسط مثلث طوله 18 سم. على أي بعد من الرأس يقع مركز الثقل؟', 'A median of a triangle is 18 cm. How far from the vertex is the centroid?'), expected: answer('p6'), hint: say('Medianaren bi heren.', 'Dos tercios de la mediana.', 'ثلثا المتوسط.', 'Two thirds of the median.'), explanation: same('$\\frac{2}{3}\\cdot 18=12$') },
    { id: 7, stage: 'loci', prompt: say('$A=(2,5)$ eta $B=(14,5)$. Haien erdibitzailea $x=k$ zuzena da. Zenbat da $k$?', '$A=(2,5)$ y $B=(14,5)$. Su mediatriz es la recta $x=k$. ¿Cuánto vale $k$?', '$A=(2,5)$ و$B=(14,5)$. منصّفهما العمودي المستقيم $x=k$. كم يساوي $k$؟', '$A=(2,5)$ and $B=(14,5)$. Their perpendicular bisector is the line $x=k$. What is $k$?'), expected: answer('p7'), hint: say('Erdiko puntutik igarotzen da.', 'Pasa por el punto medio.', 'يمرّ بالمنتصف.', 'It goes through the midpoint.'), explanation: same('$\\frac{2+14}{2}=8$') },
    { id: 8, stage: 'loci', prompt: say('Triangelu zuzen baten katetoak 12 eta 16 cm dira. Zirkunzentroa hipotenusaren erdian dago. Zenbat da zirkunferentzia zirkunskribatuaren diametroa?', 'Un triángulo rectángulo tiene catetos de 12 y 16 cm. El circuncentro está en el punto medio de la hipotenusa. ¿Cuánto mide el diámetro de la circunferencia circunscrita?', 'مثلث قائم ضلعاه 12 و16 سم. مركز الدائرة المحيطة في منتصف الوتر. كم قطر الدائرة المحيطة؟', 'A right triangle has legs of 12 and 16 cm. The circumcentre is at the midpoint of the hypotenuse. How long is the diameter of the circumscribed circle?'), expected: answer('p8'), hint: say('Diametroa hipotenusa bera da.', 'El diámetro es la propia hipotenusa.', 'القطر هو الوتر نفسه.', 'The diameter is the hypotenuse itself.'), explanation: same('$\\sqrt{144+256}=\\sqrt{400}=20$') },

    /* ---------- Pythagoras ---------- */
    { id: 9, stage: 'pythagoras', prompt: say('Katetoak 9 eta 12 cm. Zenbat da hipotenusa?', 'Catetos de 9 y 12 cm. ¿Cuánto mide la hipotenusa?', 'ضلعان قائمان 9 و12 سم. كم الوتر؟', 'Legs of 9 and 12 cm. How long is the hypotenuse?'), expected: answer('p9'), hint: same('$a^{2}=b^{2}+c^{2}$'), explanation: same('$\\sqrt{81+144}=\\sqrt{225}=15$') },
    { id: 10, stage: 'pythagoras', prompt: say('Hipotenusa 17 cm eta kateto bat 15 cm. Zenbat da bestea?', 'Hipotenusa de 17 cm y un cateto de 15 cm. ¿Cuánto mide el otro?', 'وتر 17 سم وضلع قائم 15 سم. كم الآخر؟', 'Hypotenuse 17 cm and one leg 15 cm. How long is the other?'), expected: answer('p10'), hint: say('Katetoa: kendu karratuak.', 'Cateto: resta los cuadrados.', 'الضلع القائم: اطرح المربعين.', 'A leg: subtract the squares.'), explanation: same('$\\sqrt{289-225}=\\sqrt{64}=8$') },
    { id: 11, stage: 'pythagoras', prompt: say('Triangelu isoszele baten alde berdinak 13 cm dira eta oinarria 10 cm. Zenbat da altuera?', 'Un triángulo isósceles tiene los lados iguales de 13 cm y la base de 10 cm. ¿Cuánto mide la altura?', 'مثلث متساوي الساقين ساقاه 13 سم وقاعدته 10 سم. كم ارتفاعه؟', 'An isosceles triangle has equal sides of 13 cm and a base of 10 cm. How tall is it?'), expected: answer('p11'), hint: say('Oinarriaren erdia: 5.', 'Media base: 5.', 'نصف القاعدة: 5.', 'Half the base: 5.'), explanation: same('$\\sqrt{169-25}=\\sqrt{144}=12$') },
    { id: 12, stage: 'pythagoras', prompt: say('Zein da $A=(1,2)$ eta $B=(7,10)$ puntuen arteko distantzia?', '¿Cuál es la distancia entre $A=(1,2)$ y $B=(7,10)$?', 'ما المسافة بين $A=(1,2)$ و$B=(7,10)$؟', 'What is the distance between $A=(1,2)$ and $B=(7,10)$?'), expected: answer('p12'), hint: say('Katetoak: 6 eta 8.', 'Catetos: 6 y 8.', 'الضلعان: 6 و8.', 'Legs: 6 and 8.'), explanation: same('$\\sqrt{6^{2}+8^{2}}=10$') },

    /* ---------- Areas ---------- */
    { id: 13, stage: 'areas', prompt: say('Trapezio baten oinarriak 12 eta 8 cm dira, eta altuera 5 cm. Zein da azalera (cm²)?', 'Un trapecio tiene bases de 12 y 8 cm y altura de 5 cm. ¿Cuál es su área (cm²)?', 'شبه منحرف قاعدتاه 12 و8 سم وارتفاعه 5 سم. ما مساحته (سم²)؟', 'A trapezium has bases of 12 and 8 cm and a height of 5 cm. What is its area (cm²)?'), expected: answer('p13'), hint: same('$\\frac{(B+b)\\cdot h}{2}$'), explanation: same('$\\frac{(12+8)\\cdot 5}{2}=50$') },
    { id: 14, stage: 'areas', prompt: say('Erronbo baten diagonalak 10 eta 7 cm dira. Zein da azalera (cm²)?', 'Un rombo tiene diagonales de 10 y 7 cm. ¿Cuál es su área (cm²)?', 'قطرا معيّن 10 و7 سم. ما مساحته (سم²)؟', 'A rhombus has diagonals of 10 and 7 cm. What is its area (cm²)?'), expected: answer('p14'), hint: same('$\\frac{D\\cdot d}{2}$'), explanation: same('$\\frac{10\\cdot 7}{2}=35$') },
    { id: 15, stage: 'areas', prompt: say('Hexagono erregular baten aldea 10 cm da eta apotema 8,66 cm. Zein da azalera (cm²)?', 'Un hexágono regular tiene lado 10 cm y apotema 8,66 cm. ¿Cuál es su área (cm²)?', 'سداسي منتظم ضلعه 10 سم وعامده 8.66 سم. ما مساحته (سم²)؟', 'A regular hexagon has side 10 cm and apothem 8.66 cm. What is its area (cm²)?'), expected: answer('p15'), hint: say('Perimetroa: 60.', 'Perímetro: 60.', 'المحيط: 60.', 'Perimeter: 60.'), explanation: same('$\\frac{60\\cdot 8{,}66}{2}=259{,}8$') },
    { id: 16, stage: 'areas', prompt: say('Hartu $\\pi=3{,}14$. Zein da 10 cm-ko erradioa eta 90°-ko angelua dituen sektorearen azalera?', 'Toma $\\pi=3{,}14$. ¿Cuál es el área de un sector de 10 cm de radio y 90°?', 'خذ $\\pi=3{,}14$. ما مساحة قطاع نصف قطره 10 سم وزاويته 90°؟', 'Take $\\pi=3{,}14$. What is the area of a sector of radius 10 cm and 90°?'), expected: answer('p16'), hint: say('Laurden bat.', 'Un cuarto.', 'ربع.', 'A quarter.'), explanation: same('$\\frac{3{,}14\\cdot 100}{4}=78{,}5$') },

    /* ---------- Similarity ---------- */
    { id: 17, stage: 'similarity', prompt: say('$\\frac{5}{8}=\\frac{15}{x}$ (Tales). Zenbat da $x$?', '$\\frac{5}{8}=\\frac{15}{x}$ (Tales). ¿Cuánto vale $x$?', '$\\frac{5}{8}=\\frac{15}{x}$ (طاليس). كم يساوي $x$؟', '$\\frac{5}{8}=\\frac{15}{x}$ (Thales). What is $x$?'), expected: answer('p17'), hint: say('Biderketa gurutzatua.', 'Producto cruzado.', 'الضرب التبادلي.', 'Cross-multiply.'), explanation: same('$x=\\frac{8\\cdot 15}{5}=24$') },
    { id: 18, stage: 'similarity', prompt: say('Bi triangelu antzekoak dira, $k=3$ arrazoiarekin. Txikiaren alde batek 7 cm neurtzen du. Zenbat handiaren alde homologoak?', 'Dos triángulos son semejantes con razón $k=3$. Un lado del pequeño mide 7 cm. ¿Cuánto mide el homólogo del grande?', 'مثلثان متشابهان نسبتهما $k=3$. ضلع الصغير 7 سم. كم الضلع المناظر في الكبير؟', 'Two triangles are similar with factor $k=3$. A side of the small one is 7 cm. How long is the matching side of the big one?'), expected: answer('p18'), hint: say('Biderkatu $k$ zenbakiaz.', 'Multiplica por $k$.', 'اضرب في $k$.', 'Multiply by $k$.'), explanation: same('$3\\cdot 7=21$') },
    { id: 19, stage: 'similarity', prompt: say('Irudi batek 15 cm² ditu. Aldeak bider 2 egiten dira. Zein da azalera berria (cm²)?', 'Una figura tiene 15 cm². Sus lados se multiplican por 2. ¿Cuál es el área nueva (cm²)?', 'مساحة شكل 15 سم². تُضرب أضلاعه في 2. ما المساحة الجديدة (سم²)؟', 'A shape has an area of 15 cm². Its sides are multiplied by 2. What is the new area (cm²)?'), expected: answer('p19'), hint: say('Azalerak $k^{2}$ aldiz.', 'Las áreas, por $k^{2}$.', 'المساحات في $k^{2}$.', 'Areas go by $k^{2}$.'), explanation: same('$15\\cdot 2^{2}=60$') },
    { id: 20, stage: 'similarity', prompt: say('2 m-ko makil batek 3 m-ko itzala du. Aldi berean, zuhaitz batek 12 m-ko itzala du. Zenbat neurtzen du zuhaitzak?', 'Un palo de 2 m da una sombra de 3 m. A la vez, un árbol da una sombra de 12 m. ¿Cuánto mide el árbol?', 'عصا طولها 2 م ظلها 3 م. وفي الوقت نفسه ظل شجرة 12 م. كم طول الشجرة؟', 'A 2 m stick casts a 3 m shadow. At the same time, a tree casts a 12 m shadow. How tall is the tree?'), expected: answer('p20'), hint: same('$\\frac{2}{3}=\\frac{h}{12}$'), explanation: same('$h=\\frac{2\\cdot 12}{3}=8$') }
]

export const geometry3Challenges: ChallengeItem[] = [
    { id: 101, stage: 'angles', points: 10, context: 'starter', prompt: say('Zenbat batzen dute dodekagono baten (12 alde) barne-angeluek?', '¿Cuánto suman los ángulos interiores de un dodecágono (12 lados)?', 'كم مجموع الزوايا الداخلية لمضلع ذي 12 ضلعًا؟', 'What do the interior angles of a dodecagon (12 sides) add up to?'), expected: answer('c101'), hint: same('$(n-2)\\cdot 180°$'), explanation: same('$10\\cdot 180°=1800°$') },
    { id: 102, stage: 'angles', points: 20, context: 'advanced', prompt: say('Hexagono baten bost angeluk 130°, 120°, 110°, 140° eta 125° neurtzen dute. Zenbat seigarrenak?', 'Cinco ángulos de un hexágono miden 130°, 120°, 110°, 140° y 125°. ¿Cuánto mide el sexto?', 'خمس زوايا لسداسي 130° و120° و110° و140° و125°. كم السادسة؟', 'Five angles of a hexagon are 130°, 120°, 110°, 140° and 125°. How big is the sixth?'), expected: answer('c102'), hint: say('Hexagonoa: 720°.', 'Hexágono: 720°.', 'السداسي: 720°.', 'Hexagon: 720°.'), explanation: same('$720°-625°=95°$') },
    { id: 103, stage: 'angles', points: 30, context: 'master', prompt: say('Angelu inskribatu batek 35° neurtzen du. Zenbat arku bera hartzen duen zentralak?', 'Un ángulo inscrito mide 35°. ¿Cuánto mide el central que abarca el mismo arco?', 'زاوية محيطية 35°. كم المركزية على القوس نفسه؟', 'An inscribed angle is 35°. How big is the central angle on the same arc?'), expected: answer('c103'), hint: say('Zentrala bikoitza da.', 'El central es el doble.', 'المركزية ضعفها.', 'The central one is double.'), explanation: same('$2\\cdot 35°=70°$') },
    { id: 104, stage: 'loci', points: 10, context: 'starter', prompt: say('Mediana batek 21 cm neurtzen du. Zein distantziatara dago barizentroa aldearen erdiko puntutik?', 'Una mediana mide 21 cm. ¿A qué distancia del punto medio del lado está el baricentro?', 'متوسط طوله 21 سم. على أي بعد من منتصف الضلع يقع مركز الثقل؟', 'A median is 21 cm long. How far from the midpoint of the side is the centroid?'), expected: answer('c104'), hint: say('Heren bat geratzen da.', 'Queda un tercio.', 'يبقى الثلث.', 'One third is left.'), explanation: same('$\\frac{21}{3}=7$') },
    { id: 105, stage: 'loci', points: 20, context: 'advanced', prompt: say('Triangelu zuzen baten hipotenusak 26 cm neurtzen du. Zein da zirkunferentzia zirkunskribatuaren erradioa?', 'La hipotenusa de un triángulo rectángulo mide 26 cm. ¿Cuál es el radio de la circunferencia circunscrita?', 'وتر مثلث قائم 26 سم. ما نصف قطر الدائرة المحيطة؟', 'The hypotenuse of a right triangle is 26 cm. What is the radius of the circumscribed circle?'), expected: answer('c105'), hint: say('Zirkunzentroa hipotenusaren erdian dago.', 'El circuncentro está en el punto medio de la hipotenusa.', 'مركز الدائرة المحيطة في منتصف الوتر.', 'The circumcentre is at the midpoint of the hypotenuse.'), explanation: same('$26\\div 2=13$') },
    { id: 106, stage: 'loci', points: 30, context: 'master', prompt: say('$A=(-3,4)$ eta $B=(11,4)$. Erdibitzailea $x=k$ da. Zenbat da $k$?', '$A=(-3,4)$ y $B=(11,4)$. La mediatriz es $x=k$. ¿Cuánto vale $k$?', '$A=(-3,4)$ و$B=(11,4)$. المنصّف العمودي $x=k$. كم يساوي $k$؟', '$A=(-3,4)$ and $B=(11,4)$. The perpendicular bisector is $x=k$. What is $k$?'), expected: answer('c106'), hint: say('Erdiko puntua.', 'El punto medio.', 'المنتصف.', 'The midpoint.'), explanation: same('$\\frac{-3+11}{2}=4$') },
    { id: 107, stage: 'pythagoras', points: 10, context: 'starter', prompt: say('Erronbo baten diagonalak 24 eta 10 cm dira. Zenbat da aldea?', 'Un rombo tiene diagonales de 24 y 10 cm. ¿Cuánto mide el lado?', 'قطرا معيّن 24 و10 سم. كم ضلعه؟', 'A rhombus has diagonals of 24 and 10 cm. How long is its side?'), expected: answer('c107'), hint: say('Diagonalen erdiak: 12 eta 5.', 'Semidiagonales: 12 y 5.', 'نصفا القطرين: 12 و5.', 'Half diagonals: 12 and 5.'), explanation: same('$\\sqrt{144+25}=\\sqrt{169}=13$') },
    { id: 108, stage: 'pythagoras', points: 20, context: 'advanced', prompt: say('Zein da $A=(-2,1)$ eta $B=(4,9)$ puntuen arteko distantzia?', '¿Cuál es la distancia entre $A=(-2,1)$ y $B=(4,9)$?', 'ما المسافة بين $A=(-2,1)$ و$B=(4,9)$؟', 'What is the distance between $A=(-2,1)$ and $B=(4,9)$?'), expected: answer('c108'), hint: say('Katetoak: 6 eta 8.', 'Catetos: 6 y 8.', 'الضلعان: 6 و8.', 'Legs: 6 and 8.'), explanation: same('$\\sqrt{36+64}=10$') },
    { id: 109, stage: 'pythagoras', points: 30, context: 'master', prompt: say('25 m-ko eskailera batek hormatik 7 m-ra du oina. Zein altueratara iristen da?', 'Una escalera de 25 m tiene el pie a 7 m de la pared. ¿A qué altura llega?', 'سلّم طوله 25 م قدمه على بعد 7 م من الجدار. إلى أي ارتفاع يصل؟', 'A 25 m ladder has its foot 7 m from the wall. How high does it reach?'), expected: answer('c109'), hint: say('Eskailera hipotenusa da.', 'La escalera es la hipotenusa.', 'السلّم هو الوتر.', 'The ladder is the hypotenuse.'), explanation: same('$\\sqrt{625-49}=\\sqrt{576}=24$') },
    { id: 110, stage: 'areas', points: 10, context: 'starter', prompt: say('Hartu $\\pi=3{,}14$. Zein da 10 eta 6 cm-ko erradioak dituen koroaren azalera (cm²)?', 'Toma $\\pi=3{,}14$. ¿Cuál es el área de la corona de radios 10 y 6 cm (cm²)?', 'خذ $\\pi=3{,}14$. ما مساحة الحلقة بنصفي القطرين 10 و6 سم (سم²)؟', 'Take $\\pi=3{,}14$. What is the area of the annulus with radii 10 and 6 cm (cm²)?'), expected: answer('c110'), hint: same('$\\pi(R^{2}-r^{2})$'), explanation: same('$3{,}14\\cdot(100-36)=200{,}96$') },
    { id: 111, stage: 'areas', points: 20, context: 'advanced', prompt: say('Hartu $\\pi=3{,}14$. Zein da 15 cm-ko erradioa eta 120°-ko angelua dituen arkuaren luzera?', 'Toma $\\pi=3{,}14$. ¿Cuánto mide un arco de 15 cm de radio y 120°?', 'خذ $\\pi=3{,}14$. كم طول قوس نصف قطره 15 سم وزاويته 120°؟', 'Take $\\pi=3{,}14$. How long is an arc of radius 15 cm and 120°?'), expected: answer('c111'), hint: say('Zirkunferentziaren heren bat.', 'Un tercio de la circunferencia.', 'ثلث المحيط.', 'A third of the circumference.'), explanation: same('$\\frac{2\\cdot 3{,}14\\cdot 15}{3}=31{,}4$') },
    { id: 112, stage: 'areas', points: 30, context: 'master', prompt: say('Oktogono erregular baten aldea 5 cm da eta apotema 6,04 cm. Zein da azalera (cm²)?', 'Un octógono regular tiene lado 5 cm y apotema 6,04 cm. ¿Cuál es su área (cm²)?', 'مثمن منتظم ضلعه 5 سم وعامده 6.04 سم. ما مساحته (سم²)؟', 'A regular octagon has side 5 cm and apothem 6.04 cm. What is its area (cm²)?'), expected: answer('c112'), hint: say('Perimetroa: 40.', 'Perímetro: 40.', 'المحيط: 40.', 'Perimeter: 40.'), explanation: same('$\\frac{40\\cdot 6{,}04}{2}=120{,}8$') },
    { id: 113, stage: 'similarity', points: 10, context: 'starter', prompt: say('$1\\mathbin{:}50\\,000$ eskalako mapa batean bi herri 7 cm-ra daude. Zenbat metro dira benetan?', 'En un mapa a escala $1\\mathbin{:}50\\,000$ dos pueblos están a 7 cm. ¿Cuántos metros son en la realidad?', 'في خريطة بمقياس $1\\mathbin{:}50\\,000$ قريتان على بعد 7 سم. كم مترًا في الواقع؟', 'On a $1\\mathbin{:}50\\,000$ map two villages are 7 cm apart. How many metres is that in reality?'), expected: answer('c113'), hint: say('$7\\cdot 50\\,000$ cm, gero metrotara.', '$7\\cdot 50\\,000$ cm y después a metros.', '$7\\cdot 50\\,000$ سم ثم إلى أمتار.', '$7\\cdot 50\\,000$ cm, then into metres.'), explanation: same('$7\\cdot 50\\,000=350\\,000\\ cm=3500\\ m$') },
    { id: 114, stage: 'similarity', points: 20, context: 'advanced', prompt: say('48 cm²-ko irudi baten aldeak erdira murrizten dira ($k=0{,}5$). Zein da azalera berria (cm²)?', 'Los lados de una figura de 48 cm² se reducen a la mitad ($k=0{,}5$). ¿Cuál es el área nueva (cm²)?', 'تُختصر أضلاع شكل مساحته 48 سم² إلى النصف ($k=0{,}5$). ما المساحة الجديدة (سم²)؟', 'The sides of a 48 cm² shape are halved ($k=0{,}5$). What is the new area (cm²)?'), expected: answer('c114'), hint: same('$k^{2}=0{,}25$'), explanation: same('$48\\cdot 0{,}25=12$') },
    { id: 115, stage: 'similarity', points: 30, context: 'master', prompt: say('1,6 m-ko pertsona batek 2 m-ko itzala du. Aldi berean, dorre batek 15 m-ko itzala du. Zenbat neurtzen du dorreak?', 'Una persona de 1,6 m da una sombra de 2 m. A la vez, una torre da una sombra de 15 m. ¿Cuánto mide la torre?', 'شخص طوله 1.6 م ظله 2 م. وفي الوقت نفسه ظل برج 15 م. كم طول البرج؟', 'A 1.6 m person casts a 2 m shadow. At the same time, a tower casts a 15 m shadow. How tall is the tower?'), expected: answer('c115'), hint: same('$\\frac{1{,}6}{2}=\\frac{h}{15}$'), explanation: same('$h=\\frac{1{,}6\\cdot 15}{2}=12$') }
]

const item = (id: number, difficulty: 'easy' | 'medium' | 'hard', question: ReturnType<typeof say>, solution: ReturnType<typeof say>) => ({ id, difficulty, question, solution, answer: { expected: answer(`b${id}`) } })
const sumOf = (sides: number) => say(`Zenbat batzen dute ${sides} aldeko poligono baten barne-angeluek?`, `¿Cuánto suman los ángulos interiores de un polígono de ${sides} lados?`, `كم مجموع الزوايا الداخلية لمضلع ذي ${sides} أضلاع؟`, `What do the interior angles of a polygon with ${sides} sides add up to?`)
const regularInterior = (sides: number) => say(`Zenbat neurtzen du ${sides} aldeko poligono erregular baten barne-angeluak?`, `¿Cuánto mide el ángulo interior de un polígono regular de ${sides} lados?`, `كم قياس الزاوية الداخلية لمضلع منتظم ذي ${sides} أضلاع؟`, `How big is the interior angle of a regular polygon with ${sides} sides?`)
const hypotenuse = (b: number, c: number) => say(`Katetoak ${b} eta ${c}. Zenbat da hipotenusa?`, `Catetos ${b} y ${c}. ¿Cuánto mide la hipotenusa?`, `ضلعان قائمان ${b} و${c}. كم الوتر؟`, `Legs ${b} and ${c}. How long is the hypotenuse?`)
const leg = (a: number, b: number) => say(`Hipotenusa ${a} eta kateto bat ${b}. Zenbat da bestea?`, `Hipotenusa ${a} y un cateto ${b}. ¿Cuánto mide el otro?`, `الوتر ${a} وضلع قائم ${b}. كم الآخر؟`, `Hypotenuse ${a} and one leg ${b}. How long is the other?`)
const withPi = (eu: string, es: string, ar: string, en: string) => say(`Hartu $\\pi=3{,}14$. ${eu}`, `Toma $\\pi=3{,}14$. ${es}`, `خذ $\\pi=3{,}14$. ${ar}`, `Take $\\pi=3{,}14$. ${en}`)

export const geometry3ExerciseBank: ExerciseSection[] = [
    {
        id: 'angles',
        title: say('Angeluak', 'Ángulos', 'الزوايا', 'Angles'),
        items: [
            item(1, 'easy', sumOf(7), same('$(7-2)\\cdot 180°=900°$')),
            item(2, 'easy', say('Zenbat neurtzen du eneagono erregular baten (9 alde) kanpo-angeluak?', '¿Cuánto mide el ángulo exterior de un eneágono regular (9 lados)?', 'كم قياس الزاوية الخارجية لمضلع منتظم ذي 9 أضلاع؟', 'How big is the exterior angle of a regular nonagon (9 sides)?'), same('$360°\\div 9=40°$')),
            item(3, 'easy', regularInterior(6), same('$180°-60°=120°$')),
            item(4, 'easy', say('Angelu zentral batek 88° neurtzen du. Zenbat inskribatuak?', 'Un ángulo central mide 88°. ¿Cuánto mide el inscrito?', 'زاوية مركزية 88°. كم المحيطية؟', 'A central angle is 88°. How big is the inscribed one?'), same('$88°\\div 2=44°$')),
            item(5, 'medium', sumOf(10), same('$8\\cdot 180°=1440°$')),
            item(6, 'medium', say('Triangelu baten bi angeluk 47° eta 68° neurtzen dute. Zenbat hirugarrenak?', 'Dos ángulos de un triángulo miden 47° y 68°. ¿Cuánto mide el tercero?', 'زاويتان في مثلث 47° و68°. كم الثالثة؟', 'Two angles of a triangle are 47° and 68°. How big is the third?'), same('$180°-115°=65°$')),
            item(7, 'medium', regularInterior(12), same('$180°-30°=150°$')),
            item(8, 'medium', say('Poligono erregular baten kanpo-angeluak 24° neurtzen du. Zenbat alde ditu?', 'El ángulo exterior de un polígono regular mide 24°. ¿Cuántos lados tiene?', 'الزاوية الخارجية لمضلع منتظم 24°. كم ضلعًا له؟', 'The exterior angle of a regular polygon is 24°. How many sides does it have?'), same('$360°\\div 24°=15$')),
            item(9, 'hard', say('Angelu inskribatu batek 72° neurtzen du. Zenbat zentralak?', 'Un ángulo inscrito mide 72°. ¿Cuánto mide el central?', 'زاوية محيطية 72°. كم المركزية؟', 'An inscribed angle is 72°. How big is the central one?'), same('$2\\cdot 72°=144°$')),
            item(10, 'hard', say('Pentagono baten lau angeluk 100°, 108°, 112° eta 96° neurtzen dute. Zenbat bosgarrenak?', 'Cuatro ángulos de un pentágono miden 100°, 108°, 112° y 96°. ¿Cuánto mide el quinto?', 'أربع زوايا لخماسي 100° و108° و112° و96°. كم الخامسة؟', 'Four angles of a pentagon are 100°, 108°, 112° and 96°. How big is the fifth?'), same('$540°-416°=124°$'))
        ]
    },
    {
        id: 'loci',
        title: say('Leku geometrikoak', 'Lugares geométricos', 'المحلات الهندسية', 'Loci'),
        items: [
            item(11, 'easy', say('Zenbat neurtzen du angelu zuzen baten (90°) erdikariak sortzen duen angelu bakoitzak?', '¿Cuánto mide cada ángulo que forma la bisectriz de un ángulo recto (90°)?', 'كم قياس كل زاوية يكوّنها منصّف زاوية قائمة (90°)؟', 'How big is each angle the bisector of a right angle (90°) makes?'), same('$90°\\div 2=45°$')),
            item(12, 'easy', say('$A=(3,1)$ eta $B=(9,1)$. Erdibitzailea $x=k$ da. Zenbat da $k$?', '$A=(3,1)$ y $B=(9,1)$. La mediatriz es $x=k$. ¿Cuánto vale $k$?', '$A=(3,1)$ و$B=(9,1)$. المنصّف العمودي $x=k$. كم يساوي $k$؟', '$A=(3,1)$ and $B=(9,1)$. The perpendicular bisector is $x=k$. What is $k$?'), same('$\\frac{3+9}{2}=6$')),
            item(13, 'easy', say('Mediana batek 27 cm neurtzen du. Zein distantziatara dago barizentroa erpinetik?', 'Una mediana mide 27 cm. ¿A qué distancia del vértice está el baricentro?', 'متوسط طوله 27 سم. على أي بعد من الرأس مركز الثقل؟', 'A median is 27 cm. How far from the vertex is the centroid?'), same('$\\frac{2}{3}\\cdot 27=18$')),
            item(14, 'easy', say('Mediana batek 15 cm neurtzen du. Zein distantziatara dago barizentroa aldearen erditik?', 'Una mediana mide 15 cm. ¿A qué distancia del punto medio del lado está el baricentro?', 'متوسط طوله 15 سم. على أي بعد من منتصف الضلع مركز الثقل؟', 'A median is 15 cm. How far from the midpoint of the side is the centroid?'), same('$\\frac{15}{3}=5$')),
            item(15, 'medium', say('150°-ko angelu baten erdikariak sortzen duen angelu bakoitza?', '¿Cada ángulo que forma la bisectriz de un ángulo de 150°?', 'كل زاوية يكوّنها منصّف زاوية 150°؟', 'Each angle the bisector of a 150° angle makes?'), same('$150°\\div 2=75°$')),
            item(16, 'medium', say('$A=(-4,2)$ eta $B=(6,2)$. Erdibitzailea $x=k$ da. Zenbat da $k$?', '$A=(-4,2)$ y $B=(6,2)$. La mediatriz es $x=k$. ¿Cuánto vale $k$?', '$A=(-4,2)$ و$B=(6,2)$. المنصّف العمودي $x=k$. كم يساوي $k$؟', '$A=(-4,2)$ and $B=(6,2)$. The perpendicular bisector is $x=k$. What is $k$?'), same('$\\frac{-4+6}{2}=1$')),
            item(17, 'medium', say('Triangelu zuzen baten hipotenusa 26 da. Zein da zirkunferentzia zirkunskribatuaren erradioa?', 'La hipotenusa de un triángulo rectángulo mide 26. ¿Cuál es el radio de la circunferencia circunscrita?', 'وتر مثلث قائم 26. ما نصف قطر الدائرة المحيطة؟', 'The hypotenuse of a right triangle is 26. What is the radius of the circumscribed circle?'), same('$26\\div 2=13$')),
            item(18, 'medium', say('Mediana batek 30 cm neurtzen du. Zein distantziatara dago barizentroa erpinetik?', 'Una mediana mide 30 cm. ¿A qué distancia del vértice está el baricentro?', 'متوسط طوله 30 سم. على أي بعد من الرأس مركز الثقل؟', 'A median is 30 cm. How far from the vertex is the centroid?'), same('$\\frac{2}{3}\\cdot 30=20$')),
            item(19, 'hard', say('Triangelu zuzen baten hipotenusa 50 da. Zein da zirkunzentrotik erpinetara dagoen distantzia?', 'La hipotenusa de un triángulo rectángulo mide 50. ¿A qué distancia de los vértices está el circuncentro?', 'وتر مثلث قائم 50. على أي بعد من الرؤوس مركز الدائرة المحيطة؟', 'The hypotenuse of a right triangle is 50. How far from the vertices is the circumcentre?'), same('$50\\div 2=25$')),
            item(20, 'hard', say('Mediana batek 36 cm neurtzen du. Zein distantziatara dago barizentroa aldearen erditik?', 'Una mediana mide 36 cm. ¿A qué distancia del punto medio del lado está el baricentro?', 'متوسط طوله 36 سم. على أي بعد من منتصف الضلع مركز الثقل؟', 'A median is 36 cm. How far from the midpoint of the side is the centroid?'), same('$\\frac{36}{3}=12$'))
        ]
    },
    {
        id: 'pythagoras',
        title: say('Pitagoras', 'Pitágoras', 'فيثاغورس', 'Pythagoras'),
        items: [
            item(21, 'easy', hypotenuse(6, 8), same('$\\sqrt{36+64}=10$')),
            item(22, 'easy', leg(10, 6), same('$\\sqrt{100-36}=8$')),
            item(23, 'easy', hypotenuse(5, 12), same('$\\sqrt{25+144}=13$')),
            item(24, 'easy', leg(25, 24), same('$\\sqrt{625-576}=7$')),
            item(25, 'medium', say('Triangelu isoszele baten alde berdinak 5 dira eta oinarria 6. Zenbat da altuera?', 'Un triángulo isósceles tiene lados iguales de 5 y base 6. ¿Cuánto mide la altura?', 'مثلث متساوي الساقين ساقاه 5 وقاعدته 6. كم ارتفاعه؟', 'An isosceles triangle has equal sides of 5 and a base of 6. How tall is it?'), same('$\\sqrt{25-9}=4$')),
            item(26, 'medium', say('Laukizuzen baten aldeak 15 eta 20 dira. Zenbat da diagonala?', 'Un rectángulo tiene lados 15 y 20. ¿Cuánto mide la diagonal?', 'ضلعا مستطيل 15 و20. كم قطره؟', 'A rectangle has sides 15 and 20. How long is the diagonal?'), same('$\\sqrt{225+400}=25$')),
            item(27, 'medium', say('Erronbo baten diagonalak 16 eta 12 dira. Zenbat da aldea?', 'Un rombo tiene diagonales 16 y 12. ¿Cuánto mide el lado?', 'قطرا معيّن 16 و12. كم ضلعه؟', 'A rhombus has diagonals 16 and 12. How long is its side?'), same('$\\sqrt{64+36}=10$')),
            item(28, 'medium', say('Zein da $(0,0)$ eta $(8,6)$ puntuen arteko distantzia?', '¿Cuál es la distancia entre $(0,0)$ y $(8,6)$?', 'ما المسافة بين $(0,0)$ و$(8,6)$؟', 'What is the distance between $(0,0)$ and $(8,6)$?'), same('$\\sqrt{64+36}=10$')),
            item(29, 'hard', say('26 m-ko kable batek 10 m-ra lotzen du zutoina lurrean. Zein altueratan dago lotuta zutoinean?', 'Un cable de 26 m se ata al suelo a 10 m del poste. ¿A qué altura está atado en el poste?', 'كابل طوله 26 م مربوط بالأرض على بعد 10 م من العمود. على أي ارتفاع مربوط بالعمود؟', 'A 26 m cable is tied to the ground 10 m from the post. How high up the post is it tied?'), same('$\\sqrt{676-100}=24$')),
            item(30, 'hard', say('Triangelu isoszele baten alde berdinak 17 dira eta oinarria 16. Zenbat da altuera?', 'Un triángulo isósceles tiene lados iguales de 17 y base 16. ¿Cuánto mide la altura?', 'مثلث متساوي الساقين ساقاه 17 وقاعدته 16. كم ارتفاعه؟', 'An isosceles triangle has equal sides of 17 and a base of 16. How tall is it?'), same('$\\sqrt{289-64}=15$'))
        ]
    },
    {
        id: 'areas',
        title: say('Azalerak', 'Áreas', 'المساحات', 'Areas'),
        items: [
            item(31, 'easy', say('Zein da oinarria 9 eta altuera 6 dituen triangeluaren azalera?', '¿Cuál es el área de un triángulo de base 9 y altura 6?', 'ما مساحة مثلث قاعدته 9 وارتفاعه 6؟', 'What is the area of a triangle with base 9 and height 6?'), same('$\\frac{9\\cdot 6}{2}=27$')),
            item(32, 'easy', say('Zein da oinarria 12 eta altuera 5 dituen paralelogramoaren azalera?', '¿Cuál es el área de un paralelogramo de base 12 y altura 5?', 'ما مساحة متوازي أضلاع قاعدته 12 وارتفاعه 5؟', 'What is the area of a parallelogram with base 12 and height 5?'), same('$12\\cdot 5=60$')),
            item(33, 'easy', say('Erronbo baten diagonalak 8 eta 5 dira. Zein da azalera?', 'Un rombo tiene diagonales de 8 y 5. ¿Cuál es su área?', 'قطرا معيّن 8 و5. ما مساحته؟', 'A rhombus has diagonals 8 and 5. What is its area?'), same('$\\frac{8\\cdot 5}{2}=20$')),
            item(34, 'easy', withPi('Zein da 10 cm-ko erradioko zirkuluaren azalera?', '¿Cuál es el área de un círculo de 10 cm de radio?', 'ما مساحة دائرة نصف قطرها 10 سم؟', 'What is the area of a circle of radius 10 cm?'), same('$3{,}14\\cdot 100=314$')),
            item(35, 'medium', withPi('Zenbat neurtzen du 5 cm-ko erradioko zirkunferentziak?', '¿Cuánto mide una circunferencia de 5 cm de radio?', 'كم محيط دائرة نصف قطرها 5 سم؟', 'How long is a circle of radius 5 cm?'), same('$2\\cdot 3{,}14\\cdot 5=31{,}4$')),
            item(36, 'medium', say('Trapezio baten oinarriak 9 eta 5 dira, eta altuera 4. Zein da azalera?', 'Un trapecio tiene bases 9 y 5 y altura 4. ¿Cuál es su área?', 'شبه منحرف قاعدتاه 9 و5 وارتفاعه 4. ما مساحته؟', 'A trapezium has bases 9 and 5 and height 4. What is its area?'), same('$\\frac{(9+5)\\cdot 4}{2}=28$')),
            item(37, 'medium', say('Hexagono erregular baten aldea 4 da eta apotema 3,46. Zein da azalera?', 'Un hexágono regular tiene lado 4 y apotema 3,46. ¿Cuál es su área?', 'سداسي منتظم ضلعه 4 وعامده 3.46. ما مساحته؟', 'A regular hexagon has side 4 and apothem 3.46. What is its area?'), same('$\\frac{24\\cdot 3{,}46}{2}=41{,}52$')),
            item(38, 'medium', withPi('Zein da 6 cm-ko erradioa eta 120°-ko angelua dituen sektorearen azalera?', '¿Cuál es el área de un sector de 6 cm de radio y 120°?', 'ما مساحة قطاع نصف قطره 6 سم وزاويته 120°؟', 'What is the area of a sector of radius 6 cm and 120°?'), same('$\\frac{3{,}14\\cdot 36}{3}=37{,}68$')),
            item(39, 'hard', withPi('Zein da 5 eta 3 cm-ko erradioak dituen koroaren azalera?', '¿Cuál es el área de la corona de radios 5 y 3 cm?', 'ما مساحة الحلقة بنصفي القطرين 5 و3 سم؟', 'What is the area of the annulus with radii 5 and 3 cm?'), same('$3{,}14\\cdot(25-9)=50{,}24$')),
            item(40, 'hard', withPi('Zenbat neurtzen du 9 cm-ko erradioa eta 40°-ko angelua dituen arkuak?', '¿Cuánto mide un arco de 9 cm de radio y 40°?', 'كم طول قوس نصف قطره 9 سم وزاويته 40°؟', 'How long is an arc of radius 9 cm and 40°?'), same('$\\frac{2\\cdot 3{,}14\\cdot 9}{9}=6{,}28$'))
        ]
    },
    {
        id: 'similarity',
        title: say('Antzekotasuna', 'Semejanza', 'التشابه', 'Similarity'),
        items: [
            item(41, 'easy', say('$\\frac{3}{4}=\\frac{9}{x}$. Zenbat da $x$?', '$\\frac{3}{4}=\\frac{9}{x}$. ¿Cuánto vale $x$?', '$\\frac{3}{4}=\\frac{9}{x}$. كم يساوي $x$؟', '$\\frac{3}{4}=\\frac{9}{x}$. What is $x$?'), same('$x=\\frac{4\\cdot 9}{3}=12$')),
            item(42, 'easy', say('Antzekotasun-arrazoia $k=2$ da eta alde bat 6. Zenbat da homologoa?', 'La razón de semejanza es $k=2$ y un lado mide 6. ¿Cuánto mide el homólogo?', 'نسبة التشابه $k=2$ وضلع 6. كم الضلع المناظر؟', 'The scale factor is $k=2$ and a side is 6. How long is the matching side?'), same('$2\\cdot 6=12$')),
            item(43, 'easy', say('12 cm²-ko irudi baten aldeak bider 3 egiten dira. Zein da azalera berria (cm²)?', 'Los lados de una figura de 12 cm² se multiplican por 3. ¿Cuál es el área nueva (cm²)?', 'تُضرب أضلاع شكل مساحته 12 سم² في 3. ما المساحة الجديدة (سم²)؟', 'The sides of a 12 cm² shape are multiplied by 3. What is the new area (cm²)?'), same('$12\\cdot 3^{2}=108$')),
            item(44, 'easy', say('$1\\mathbin{:}25\\,000$ eskalako mapa batean 4 cm daude. Zenbat metro dira?', 'En un mapa a escala $1\\mathbin{:}25\\,000$ hay 4 cm. ¿Cuántos metros son?', 'في خريطة بمقياس $1\\mathbin{:}25\\,000$ هناك 4 سم. كم مترًا؟', 'On a $1\\mathbin{:}25\\,000$ map there are 4 cm. How many metres is that?'), same('$4\\cdot 25\\,000=100\\,000\\ cm=1000\\ m$')),
            item(45, 'medium', say('3 m-ko makil batek 2 m-ko itzala du. Zuhaitz batek 10 m-koa. Zenbat neurtzen du zuhaitzak?', 'Un palo de 3 m da una sombra de 2 m; un árbol, de 10 m. ¿Cuánto mide el árbol?', 'عصا طولها 3 م ظلها 2 م؛ وظل شجرة 10 م. كم طول الشجرة؟', 'A 3 m pole casts a 2 m shadow; a tree, a 10 m one. How tall is the tree?'), same('$h=\\frac{3\\cdot 10}{2}=15$')),
            item(46, 'medium', say('$\\frac{6}{9}=\\frac{10}{x}$. Zenbat da $x$?', '$\\frac{6}{9}=\\frac{10}{x}$. ¿Cuánto vale $x$?', '$\\frac{6}{9}=\\frac{10}{x}$. كم يساوي $x$؟', '$\\frac{6}{9}=\\frac{10}{x}$. What is $x$?'), same('$x=\\frac{9\\cdot 10}{6}=15$')),
            item(47, 'medium', say('Antzekotasun-arrazoia $k=2{,}5$ da eta alde bat 4. Zenbat da homologoa?', 'La razón es $k=2{,}5$ y un lado mide 4. ¿Cuánto mide el homólogo?', 'النسبة $k=2{,}5$ وضلع 4. كم المناظر؟', 'The scale factor is $k=2{,}5$ and a side is 4. How long is the matching side?'), same('$2{,}5\\cdot 4=10$')),
            item(48, 'medium', say('50 cm²-ko irudi bat $k=0{,}2$ arrazoiarekin murrizten da. Zein da azalera berria (cm²)?', 'Una figura de 50 cm² se reduce con razón $k=0{,}2$. ¿Cuál es el área nueva (cm²)?', 'يُصغَّر شكل مساحته 50 سم² بنسبة $k=0{,}2$. ما المساحة الجديدة (سم²)؟', 'A 50 cm² shape is reduced with factor $k=0{,}2$. What is the new area (cm²)?'), same('$50\\cdot 0{,}04=2$')),
            item(49, 'hard', say('$1\\mathbin{:}100\\,000$ eskalako mapa batean 12 cm daude. Zenbat metro dira?', 'En un mapa a escala $1\\mathbin{:}100\\,000$ hay 12 cm. ¿Cuántos metros son?', 'في خريطة بمقياس $1\\mathbin{:}100\\,000$ هناك 12 سم. كم مترًا؟', 'On a $1\\mathbin{:}100\\,000$ map there are 12 cm. How many metres is that?'), same('$12\\cdot 100\\,000=1\\,200\\,000\\ cm=12\\,000\\ m$')),
            item(50, 'hard', say('1,8 m-ko pertsona batek 1,2 m-ko itzala du. Farola batek 8 m-koa. Zenbat neurtzen du farolak?', 'Una persona de 1,8 m da una sombra de 1,2 m; una farola, de 8 m. ¿Cuánto mide la farola?', 'شخص طوله 1.8 م ظله 1.2 م؛ وظل عمود إنارة 8 م. كم طول العمود؟', 'A 1.8 m person casts a 1.2 m shadow; a lamp post, an 8 m one. How tall is the lamp post?'), same('$h=\\frac{1{,}8\\cdot 8}{1{,}2}=12$'))
        ]
    }
]
