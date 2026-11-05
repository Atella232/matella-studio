import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../dbh4-akademikoak-trigonometria/text.ts'

/* ==========================================================================
   J4 · Triangeluen detektibea (Detective de triángulos): a worked solution
   of three lines with one wrong line, the mistakes of this unit. Lines
   write \sen and \tg; the game passes localize so each language reads its
   names. Level 1: any angle (the decimal part of the turns, sen for cos
   with 180° − α, the sign of the quadrant, the second angle forgotten);
   level 2: the sine rule (the wrong pair, the obtuse triangle forgotten,
   a sine over 1, the radius for the diameter); level 3: the cosine rule
   and areas (the cosine forgotten, the sign of an obtuse angle, Heron
   with the perimeter, forces added as numbers). `right` and `reached` are
   the values the right working and the wrong one end at.
   ========================================================================== */

export type TrianglesDetectiveError =
    | 'decimal-part'
    | 'cos-for-sen'
    | 'quadrant-sign'
    | 'second-angle'
    | 'wrong-pair'
    | 'obtuse-forgotten'
    | 'sine-over-one'
    | 'radius-diameter'
    | 'cosine-forgotten'
    | 'obtuse-sign'
    | 'heron-perimeter'
    | 'forces-added'

export const trianglesDetectiveLevels: TrianglesDetectiveError[][] = [
    ['decimal-part', 'cos-for-sen', 'quadrant-sign', 'second-angle'],
    ['wrong-pair', 'obtuse-forgotten', 'sine-over-one', 'radius-diameter'],
    ['cosine-forgotten', 'obtuse-sign', 'heron-perimeter', 'forces-added']
]

export const TRIANGLES_DETECTIVE_CASES = 6

const D = Math.PI / 180
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
/** A number in LaTeX, rounded, with the decimal comma */
const tex = (value: number, digits = 2) => String(Math.round(value * 10 ** digits) / 10 ** digits).replace('.', '{,}')
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    rule: say('Teorema', 'Teorema', 'المبرهنة', 'Rule'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    reduce: say('Bira osoak', 'Vueltas enteras', 'الدورات الكاملة', 'Whole turns'),
    quadrant: say('Koadrantea', 'Cuadrante', 'الربع', 'Quadrant')
}
const ask = (eu: string, es: string, ar: string, en: string) => say(eu, es, ar, en)

export const trianglesDetectiveNames: Record<TrianglesDetectiveError, LocalizedText> = {
    'decimal-part': say('Zatiketaren zati hamartarra hartu du angelutzat', 'Tomó la parte decimal de la división como ángulo', 'أخذ الجزء العشري من القسمة على أنه الزاوية', 'Took the decimal part of the division as the angle'),
    'cos-for-sen': say('180° − α angeluarekin sinua kosinu bihurtu du', 'Con 180° − α cambió el seno por el coseno', 'مع 180° − α بدّل الجيب بجيب التمام', 'With 180° − α swapped the sine for the cosine'),
    'quadrant-sign': say('Koadrantearen zeinua ahaztu du', 'Olvidó el signo del cuadrante', 'نسي إشارة الربع', 'Forgot the sign of the quadrant'),
    'second-angle': say('Sinu berarentzat 360° − α hartu du, eta hori kosinuarentzat da', 'Para el mismo seno usó 360° − α, que es para el coseno', 'استعمل 360° − α للجيب نفسه، وهذا لجيب التمام', 'Used 360° − α for the same sine, which is for the cosine'),
    'wrong-pair': say('Alde bat beste angelu baten sinuarekin parekatu du', 'Emparejó un lado con el seno de otro ángulo', 'قرن ضلعًا بجيب زاوية أخرى', 'Paired a side with the sine of another angle'),
    'obtuse-forgotten': say('B kamutsa duen triangelua ahaztu du', 'Olvidó el triángulo con B obtuso', 'نسي المثلث الذي فيه B منفرجة', 'Forgot the triangle with an obtuse B'),
    'sine-over-one': say('1 baino handiagoa den sinu batetik angelu bat atera du', 'Sacó un ángulo de un seno mayor que 1', 'أخرج زاوية من جيب أكبر من 1', 'Got an angle from a sine greater than 1'),
    'radius-diameter': say('Erradioa hartu du diametroaren ordez', 'Tomó el radio en vez del diámetro', 'أخذ نصف القطر بدل القطر', 'Took the radius instead of the diameter'),
    'cosine-forgotten': say('$-2bc$ gaiari kosinua kendu dio', 'Le quitó el coseno al término $-2bc$', 'حذف جيب التمام من الحد $-2bc$', 'Dropped the cosine from the term $-2bc$'),
    'obtuse-sign': say('Angelu kamuts baten kosinua positibotzat hartu du', 'Tomó positivo el coseno de un ángulo obtuso', 'عدّ جيب تمام زاوية منفرجة موجبًا', 'Took the cosine of an obtuse angle as positive'),
    'heron-perimeter': say('Heron perimetroarekin erabili du, ez perimetro-erdiarekin', 'Usó Herón con el perímetro, no con el semiperímetro', 'استعمل هيرون بالمحيط لا بنصف المحيط', 'Used Heron with the perimeter, not the semi-perimeter'),
    'forces-added': say('Indarrak zenbakiak bezala batu ditu', 'Sumó las fuerzas como números', 'جمع القوى كالأعداد', 'Added the forces like numbers')
}

export const trianglesDetectiveTips: Record<TrianglesDetectiveError, LocalizedText> = {
    'decimal-part': say('Kendu bira osoak: $1000°-2\\cdot 360°=280°$. Hondarra da axola duena, ez zati hamartarra.', 'Quita vueltas enteras: $1000°-2\\cdot 360°=280°$. Importa el resto, no la parte decimal.', 'احذف الدورات الكاملة: $1000°-2\\cdot 360°=280°$. المهم الباقي لا الجزء العشري.', 'Take away whole turns: $1000°-2\\cdot 360°=280°$. What matters is the remainder, not the decimal part.'),
    'cos-for-sen': say('180° ± α eta 360° − α angeluekin izena ez da aldatzen: $\\sen(180°-\\alpha)=\\sen\\alpha$.', 'Con 180° ± α y 360° − α el nombre no cambia: $\\sen(180°-\\alpha)=\\sen\\alpha$.', 'مع 180° ± α و360° − α لا يتغير الاسم: $\\sen(180°-\\alpha)=\\sen\\alpha$.', 'With 180° ± α and 360° − α the name does not change: $\\sin(180°-\\alpha)=\\sin\\alpha$.'),
    'quadrant-sign': say('Bigarren koadrantean kosinua eta tangentea negatiboak dira.', 'En el segundo cuadrante el coseno y la tangente son negativos.', 'في الربع الثاني جيب التمام والظل سالبان.', 'In the second quadrant the cosine and the tangent are negative.'),
    'second-angle': say('Sinu bera: α eta 180° − α. Kosinu bera: α eta 360° − α.', 'Mismo seno: α y 180° − α. Mismo coseno: α y 360° − α.', 'الجيب نفسه: α و180° − α. وجيب التمام نفسه: α و360° − α.', 'Same sine: α and 180° − α. Same cosine: α and 360° − α.'),
    'wrong-pair': say('Alde bakoitza bere aurkako angeluarekin doa: $\\frac{a}{\\sen A}=\\frac{b}{\\sen B}$.', 'Cada lado va con su ángulo opuesto: $\\frac{a}{\\sen A}=\\frac{b}{\\sen B}$.', 'كل ضلع مع الزاوية المقابلة له: $\\frac{a}{\\sen A}=\\frac{b}{\\sen B}$.', 'Each side goes with its opposite angle: $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$.'),
    'obtuse-forgotten': say('Kasu zalantzazkoan, begiratu $180°-B$ ere A-rekin sartzen den.', 'En el caso dudoso, mira si $180°-B$ también cabe con A.', 'في الحالة الملتبسة انظر هل تتسع $180°-B$ أيضًا مع A.', 'In the ambiguous case, check whether $180°-B$ also fits with A.'),
    'sine-over-one': say('Sinua ez da inoiz 1 baino handiagoa: ez dago triangelurik.', 'Un seno nunca pasa de 1: no hay triángulo.', 'الجيب لا يتجاوز 1 أبدًا: لا مثلث.', 'A sine is never more than 1: there is no triangle.'),
    'radius-diameter': say('$\\frac{a}{\\sen A}=2R$: diametroa da.', '$\\frac{a}{\\sen A}=2R$: es el diámetro.', '$\\frac{a}{\\sen A}=2R$: إنه القطر.', '$\\frac{a}{\\sin A}=2R$: it is the diameter.'),
    'cosine-forgotten': say('$a^2=b^2+c^2-2bc\\cdot\\cos A$: kosinurik gabe, ez da teorema.', '$a^2=b^2+c^2-2bc\\cdot\\cos A$: sin el coseno no es el teorema.', '$a^2=b^2+c^2-2bc\\cdot\\cos A$: بلا جيب التمام ليست المبرهنة.', '$a^2=b^2+c^2-2bc\\cdot\\cos A$: without the cosine it is not the rule.'),
    'obtuse-sign': say('Angelu kamuts baten kosinua negatiboa da: zuzenketak batu egiten du.', 'El coseno de un ángulo obtuso es negativo: la corrección suma.', 'جيب تمام الزاوية المنفرجة سالب: التصحيح يضيف.', 'The cosine of an obtuse angle is negative: the correction adds.'),
    'heron-perimeter': say('$s$ perimetroaren erdia da: $s=\\frac{a+b+c}{2}$.', '$s$ es la mitad del perímetro: $s=\\frac{a+b+c}{2}$.', '$s$ نصف المحيط: $s=\\frac{a+b+c}{2}$.', '$s$ is half the perimeter: $s=\\frac{a+b+c}{2}$.'),
    'forces-added': say('Erresultantea paralelogramoaren diagonala da: kosinuaren teorema, 180° − θ angeluarekin.', 'La resultante es la diagonal del paralelogramo: teorema del coseno con 180° − θ.', 'المحصلة قطر متوازي الأضلاع: مبرهنة جيب التمام بالزاوية 180° − θ.', 'The resultant is the diagonal of the parallelogram: the cosine rule with 180° − θ.')
}

type Built = Omit<WorkedCase<TrianglesDetectiveError>, 'options'>

function build(random: Random, error: TrianglesDetectiveError): Built | null {
    switch (error) {
        case 'decimal-part': {
            const turns = randomInt(random, 2, 4)
            const rest = pick(random, [40, 80, 100, 130, 200, 250, 280, 310])
            const angle = turns * 360 + rest
            const quotient = Math.floor((angle / 360) * 100) / 100
            const decimals = Math.round((quotient - turns) * 100)
            if (decimals === rest) return null
            return {
                problem: ask(`Eraman ${angle}° 0°-tik 360°-rako tartera.`, `Lleva ${angle}° al intervalo de 0° a 360°.`, `أرجع ${angle}° إلى المجال من 0° إلى 360°.`, `Bring ${angle}° into the range 0° to 360°.`),
                lines: [line(LABELS.step, `${angle}\\div 360\\approx ${tex(quotient)}`), line(LABELS.reduce, `${turns}\\cdot 360°=${turns * 360}°`), line(LABELS.result, `0{,}${String(decimals).padStart(2, '0')}\\ \\to\\ ${decimals}°`)],
                wrong: 2, error, fix: `${angle}°-${turns * 360}°=${rest}°`, right: rest, reached: decimals
            }
        }
        case 'cos-for-sen': {
            const alpha = pick(random, [20, 25, 35, 40, 55, 65, 70])
            return {
                problem: ask(`Kalkulatu $\\sen ${180 - alpha}°$ lehen koadranteko angelu batekin.`, `Calcula $\\sen ${180 - alpha}°$ con un ángulo del primer cuadrante.`, `احسب $\\sen ${180 - alpha}°$ بزاوية من الربع الأول.`, `Work out $\\sin ${180 - alpha}°$ using an angle in the first quadrant.`),
                lines: [line(LABELS.step, `${180 - alpha}°=180°-${alpha}°`), line(LABELS.quadrant, `\\sen ${180 - alpha}°=\\cos ${alpha}°`), line(LABELS.result, `\\approx ${tex(Math.cos(alpha * D))}`)],
                wrong: 1, error, fix: `\\sen ${180 - alpha}°=\\sen ${alpha}°\\approx ${tex(Math.sin(alpha * D))}`, right: Math.sin(alpha * D), reached: Math.cos(alpha * D)
            }
        }
        case 'quadrant-sign': {
            const [p, q, h] = pick(random, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]])
            return {
                problem: ask(`$\\sen\\alpha=\\frac{${p}}{${h}}$ da, eta α bigarren koadrantean dago. Kalkulatu $\\tg\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${h}}$ y α está en el segundo cuadrante. Halla $\\tg\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${h}}$ وα في الربع الثاني. أوجد $\\tg\\alpha$.`, `$\\sin\\alpha=\\frac{${p}}{${h}}$ and α is in the second quadrant. Find $\\tan\\alpha$.`),
                lines: [line(LABELS.step, `\\cos^2\\alpha=1-\\frac{${p * p}}{${h * h}}=\\frac{${q * q}}{${h * h}}`), line(LABELS.quadrant, `\\cos\\alpha=\\frac{${q}}{${h}}`), line(LABELS.result, `\\tg\\alpha=\\frac{${p}}{${q}}`)],
                wrong: 1, error, fix: `\\cos\\alpha=-\\frac{${q}}{${h}}\\ \\to\\ \\tg\\alpha=-\\frac{${p}}{${q}}`, right: -p / q, reached: p / q
            }
        }
        case 'second-angle': {
            const k = pick(random, [2, 3, 4, 6, 7, 8, 9])
            const alpha = Math.round((Math.asin(k / 10) / D) * 10) / 10
            const other = Math.round((180 - alpha) * 10) / 10
            const wrongOther = Math.round((360 - alpha) * 10) / 10
            return {
                problem: ask(`0°-tik 360°-ra, zein angeluk dute $\\sen\\alpha=0{,}${k}$? Eman haien batura.`, `¿Qué ángulos entre 0° y 360° cumplen $\\sen\\alpha=0{,}${k}$? Da su suma.`, `ما الزوايا بين 0° و360° التي تحقق $\\sen\\alpha=0{,}${k}$؟ أعطِ مجموعها.`, `Which angles between 0° and 360° have $\\sin\\alpha=0{,}${k}$? Give their sum.`),
                lines: [line(LABELS.step, `\\alpha_1\\approx ${tex(alpha, 1)}°`), line(LABELS.quadrant, `\\alpha_2\\approx 360°-${tex(alpha, 1)}°=${tex(wrongOther, 1)}°`), line(LABELS.result, '360°')],
                wrong: 1, error, fix: `\\alpha_2\\approx 180°-${tex(alpha, 1)}°=${tex(other, 1)}°\\ \\to\\ 180°`, right: 180, reached: 360
            }
        }
        case 'wrong-pair': {
            const a = randomInt(random, 6, 12)
            const A = pick(random, [40, 50, 60, 70])
            const B = pick(random, [35, 45, 55, 65])
            if (A === B || A + B >= 150) return null
            const rightValue = (a * Math.sin(B * D)) / Math.sin(A * D)
            const wrongValue = (a * Math.sin(A * D)) / Math.sin(B * D)
            return {
                problem: ask(`ABC triangeluan $a=${a}$, $A=${A}°$ eta $B=${B}°$ dira. Kalkulatu $b$.`, `En el triángulo ABC, $a=${a}$, $A=${A}°$ y $B=${B}°$. Halla $b$.`, `في المثلث ABC: $a=${a}$ و$A=${A}°$ و$B=${B}°$. أوجد $b$.`, `In triangle ABC, $a=${a}$, $A=${A}°$ and $B=${B}°$. Find $b$.`),
                lines: [line(LABELS.rule, `\\frac{${a}}{\\sen ${B}°}=\\frac{b}{\\sen ${A}°}`), line(LABELS.step, `b=\\frac{${a}\\cdot\\sen ${A}°}{\\sen ${B}°}`), line(LABELS.result, `b\\approx ${tex(wrongValue)}`)],
                wrong: 0, error, fix: `\\frac{${a}}{\\sen ${A}°}=\\frac{b}{\\sen ${B}°}\\ \\to\\ b\\approx ${tex(rightValue)}`, right: rightValue, reached: wrongValue
            }
        }
        case 'obtuse-forgotten': {
            const a = randomInt(random, 5, 8)
            const b = a + randomInt(random, 1, 3)
            const A = pick(random, [30, 35, 40, 45])
            const sine = (b * Math.sin(A * D)) / a
            if (sine >= 0.97) return null
            const B = Math.asin(sine) / D
            if (A + 180 - B >= 180) return null
            return {
                problem: ask(`ABC triangeluan $a=${a}$, $b=${b}$ eta $A=${A}°$ dira. Aurkitu B-ren balio guztiak.`, `En el triángulo ABC, $a=${a}$, $b=${b}$ y $A=${A}°$. Halla todos los valores de B.`, `في المثلث ABC: $a=${a}$ و$b=${b}$ و$A=${A}°$. أوجد كل قيم B.`, `In triangle ABC, $a=${a}$, $b=${b}$ and $A=${A}°$. Find every value of B.`),
                lines: [line(LABELS.rule, `\\sen B=\\frac{${b}\\cdot\\sen ${A}°}{${a}}\\approx ${tex(sine, 3)}`), line(LABELS.step, `B\\approx ${tex(B, 1)}°\\qquad A+B\\approx ${tex(A + B, 1)}°`), line(LABELS.result, `B\\approx ${tex(B, 1)}°`)],
                wrong: 2, error, fix: `B\\approx ${tex(B, 1)}°\\qquad B\\approx ${tex(180 - B, 1)}°`, right: 2, reached: 1
            }
        }
        case 'sine-over-one': {
            const a = randomInt(random, 3, 5)
            const b = randomInt(random, 9, 12)
            const A = pick(random, [35, 40, 45, 50])
            const sine = (b * Math.sin(A * D)) / a
            if (sine <= 1.1) return null
            return {
                problem: ask(`ABC triangeluan $a=${a}$, $b=${b}$ eta $A=${A}°$ dira. Zenbat triangelu daude?`, `En el triángulo ABC, $a=${a}$, $b=${b}$ y $A=${A}°$. ¿Cuántos triángulos hay?`, `في المثلث ABC: $a=${a}$ و$b=${b}$ و$A=${A}°$. كم مثلثًا يوجد؟`, `In triangle ABC, $a=${a}$, $b=${b}$ and $A=${A}°$. How many triangles are there?`),
                lines: [line(LABELS.rule, `\\sen B=\\frac{${b}\\cdot\\sen ${A}°}{${a}}\\approx ${tex(sine)}`), line(LABELS.step, `B\\approx 90°`), line(LABELS.result, '1')],
                wrong: 1, error, fix: `${tex(sine)}>1\\ \\to\\ 0`, right: 0, reached: 1
            }
        }
        case 'radius-diameter': {
            const a = randomInt(random, 4, 12)
            const A = pick(random, [30, 40, 50, 60, 70])
            const diameter = a / Math.sin(A * D)
            return {
                problem: ask(`Triangelu batean $a=${a}$ eta $A=${A}°$ dira. Kalkulatu zirkunferentzia zirkunskribatuaren erradioa.`, `En un triángulo, $a=${a}$ y $A=${A}°$. Halla el radio de la circunferencia circunscrita.`, `في مثلث: $a=${a}$ و$A=${A}°$. أوجد نصف قطر الدائرة المحيطة.`, `In a triangle, $a=${a}$ and $A=${A}°$. Find the radius of the circumscribed circle.`),
                lines: [line(LABELS.rule, `\\frac{a}{\\sen A}=\\frac{${a}}{\\sen ${A}°}`), line(LABELS.step, `R=\\frac{${a}}{\\sen ${A}°}`), line(LABELS.result, `R\\approx ${tex(diameter)}`)],
                wrong: 1, error, fix: `2R=\\frac{${a}}{\\sen ${A}°}\\ \\to\\ R\\approx ${tex(diameter / 2)}`, right: diameter / 2, reached: diameter
            }
        }
        case 'cosine-forgotten': {
            const b = randomInt(random, 4, 9)
            const c = randomInt(random, 4, 9)
            const A = pick(random, [40, 50, 70, 80])
            const square = b * b + c * c - 2 * b * c * Math.cos(A * D)
            const wrongSquare = (b - c) ** 2
            if (wrongSquare === 0) return null
            return {
                problem: ask(`ABC triangeluan $b=${b}$, $c=${c}$ eta $A=${A}°$ dira. Kalkulatu $a$.`, `En el triángulo ABC, $b=${b}$, $c=${c}$ y $A=${A}°$. Halla $a$.`, `في المثلث ABC: $b=${b}$ و$c=${c}$ و$A=${A}°$. أوجد $a$.`, `In triangle ABC, $b=${b}$, $c=${c}$ and $A=${A}°$. Find $a$.`),
                lines: [line(LABELS.rule, `a^2=${b * b}+${c * c}-${2 * b * c}`), line(LABELS.step, `a^2=${wrongSquare}`), line(LABELS.result, `a=${Math.abs(b - c)}`)],
                wrong: 0, error, fix: `a^2=${b * b}+${c * c}-${2 * b * c}\\cdot\\cos ${A}°\\ \\to\\ a\\approx ${tex(Math.sqrt(square))}`, right: Math.sqrt(square), reached: Math.abs(b - c)
            }
        }
        case 'obtuse-sign': {
            const b = randomInt(random, 3, 8)
            const c = randomInt(random, 3, 8)
            const square = b * b + c * c + b * c
            const wrongSquare = b * b + c * c - b * c
            return {
                problem: ask(`ABC triangeluan $b=${b}$, $c=${c}$ eta $A=120°$ dira. Kalkulatu $a^2$.`, `En el triángulo ABC, $b=${b}$, $c=${c}$ y $A=120°$. Halla $a^2$.`, `في المثلث ABC: $b=${b}$ و$c=${c}$ و$A=120°$. أوجد $a^2$.`, `In triangle ABC, $b=${b}$, $c=${c}$ and $A=120°$. Find $a^2$.`),
                lines: [line(LABELS.rule, `a^2=${b * b}+${c * c}-${2 * b * c}\\cdot\\cos 120°`), line(LABELS.step, `\\cos 120°=0{,}5`), line(LABELS.result, `a^2=${wrongSquare}`)],
                wrong: 1, error, fix: `\\cos 120°=-0{,}5\\ \\to\\ a^2=${square}`, right: square, reached: wrongSquare
            }
        }
        case 'heron-perimeter': {
            const [x, y, z] = pick(random, [[5, 12, 13], [6, 8, 10], [13, 14, 15], [9, 10, 17], [7, 15, 20]])
            const s = (x + y + z) / 2
            const area = Math.sqrt(s * (s - x) * (s - y) * (s - z))
            const p = x + y + z
            const wrongArea = Math.sqrt(p * (p - x) * (p - y) * (p - z))
            return {
                problem: ask(`Kalkulatu aldeak ${x}, ${y} eta ${z} dituen triangeluaren azalera.`, `Halla el área del triángulo de lados ${x}, ${y} y ${z}.`, `أوجد مساحة المثلث الذي أضلاعه ${x} و${y} و${z}.`, `Find the area of the triangle with sides ${x}, ${y} and ${z}.`),
                lines: [line(LABELS.step, `s=${x}+${y}+${z}=${p}`), line(LABELS.rule, `S=\\sqrt{${p}\\cdot ${p - x}\\cdot ${p - y}\\cdot ${p - z}}`), line(LABELS.result, `S\\approx ${tex(wrongArea)}`)],
                wrong: 0, error, fix: `s=\\frac{${p}}{2}=${s}\\ \\to\\ S=${tex(area)}`, right: area, reached: wrongArea
            }
        }
        case 'forces-added': {
            const f1 = pick(random, [10, 20, 30, 40])
            const f2 = pick(random, [15, 25, 35, 50])
            const theta = pick(random, [40, 60, 90, 120])
            const resultant = Math.sqrt(f1 * f1 + f2 * f2 + 2 * f1 * f2 * Math.cos(theta * D))
            return {
                problem: ask(`${f1} N eta ${f2} N-eko bi indarrek ${theta}° osatzen dute. Kalkulatu erresultantea.`, `Dos fuerzas de ${f1} N y ${f2} N forman ${theta}°. Halla la resultante.`, `قوتان ${f1} N و${f2} N بينهما ${theta}°. أوجد المحصلة.`, `Two forces of ${f1} N and ${f2} N make ${theta}°. Find the resultant.`),
                lines: [line(LABELS.data, `F_1=${f1},\\ F_2=${f2},\\ \\theta=${theta}°`), line(LABELS.step, `R=${f1}+${f2}`), line(LABELS.result, `R=${f1 + f2}`)],
                wrong: 1, error, fix: `R^2=${f1}^2+${f2}^2+2\\cdot ${f1}\\cdot ${f2}\\cdot\\cos ${theta}°\\ \\to\\ R\\approx ${tex(resultant)}`, right: resultant, reached: f1 + f2
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createTrianglesDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, trianglesDetectiveLevels[levelIndex], TRIANGLES_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}
