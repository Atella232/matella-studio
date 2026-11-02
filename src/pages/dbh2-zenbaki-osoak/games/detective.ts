import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki osoen detektibea (2. DBH): a calculation of three lines with one
   wrong line. Level 1: absolute value, order and addition (|−7| = −7,
   the larger number by its absolute value, subtracting a negative as if
   it were positive, −5 + 3 = −8); level 2: signs (minus by minus gives
   minus, three negatives make a positive, −3² = 9, minus over plus gives
   plus); level 3: order of operations (adding before multiplying, a minus
   before a bracket changing only the first sign, ÷ and · from right to
   left, the product before the power).
   ========================================================================== */

export type IntegerDetectiveError =
    | 'absolute-negative'
    | 'order-by-absolute'
    | 'minus-negative'
    | 'sum-of-signs'
    | 'minus-times-minus'
    | 'three-negatives'
    | 'square-without-brackets'
    | 'quotient-sign'
    | 'add-before-multiply'
    | 'minus-bracket'
    | 'divide-right-to-left'
    | 'product-before-power'

export const integerDetectiveLevels: IntegerDetectiveError[][] = [
    ['absolute-negative', 'order-by-absolute', 'minus-negative', 'sum-of-signs'],
    ['minus-times-minus', 'three-negatives', 'square-without-brackets', 'quotient-sign'],
    ['add-before-multiply', 'minus-bracket', 'divide-right-to-left', 'product-before-power']
]

export const INTEGER_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    compare: say('Konparatu', 'Compara', 'قارن', 'Compare'),
    signs: say('Zeinuak', 'Signos', 'الإشارات', 'Signs'),
    power: say('Berretura', 'Potencia', 'القوة', 'Power'),
    product: say('Biderketa', 'Producto', 'الجداء', 'Product'),
    bracket: say('Parentesia', 'Paréntesis', 'القوسان', 'Bracket')
}

export const integerDetectiveNames: Record<IntegerDetectiveError, LocalizedText> = {
    'absolute-negative': say('Balio absolutua negatibo utzi du', 'Dejó negativo el valor absoluto', 'ترك القيمة المطلقة سالبة', 'Left the absolute value negative'),
    'order-by-absolute': say('Negatiboak balio absolutuaren arabera ordenatu ditu', 'Ordenó los negativos por su valor absoluto', 'رتّب السالبة حسب قيمتها المطلقة', 'Ordered the negatives by their absolute value'),
    'minus-negative': say('Negatibo bat kentzean ez du zeinua aldatu', 'Al restar un negativo no cambió el signo', 'عند طرح عدد سالب لم يغيّر الإشارة', 'Did not change the sign when subtracting a negative'),
    'sum-of-signs': say('Zeinu desberdinak izanik balio absolutuak batu ditu', 'Con signos distintos sumó los valores absolutos', 'مع اختلاف الإشارتين جمع القيمتين المطلقتين', 'With different signs, added the absolute values'),
    'minus-times-minus': say('Minus bider minus negatiboa dela pentsatu du', 'Pensó que menos por menos da menos', 'ظن أن سالبًا في سالب يعطي سالبًا', 'Thought that minus times minus is minus'),
    'three-negatives': say('Hiru faktore negatiboren biderkadura positibotzat hartu du', 'Dio positivo el producto de tres factores negativos', 'جعل جداء ثلاثة عوامل سالبة موجبًا', 'Made the product of three negative factors positive'),
    'square-without-brackets': say('Parentesirik gabe, minusa ere ber bi egin du', 'Sin paréntesis, elevó también el signo menos', 'دون أقواس ربّع إشارة السالب أيضًا', 'With no brackets, squared the minus sign too'),
    'quotient-sign': say('Zatiketan zeinuen araua ez du aplikatu', 'En la división no aplicó la regla de los signos', 'لم يطبّق قاعدة الإشارات في القسمة', 'Did not apply the rule of signs in the division'),
    'add-before-multiply': say('Biderkatu aurretik batu du', 'Sumó antes de multiplicar', 'جمع قبل أن يضرب', 'Added before multiplying'),
    'minus-bracket': say('Parentesiaren aurreko minusak lehen gaiari bakarrik eragin dio', 'El menos del paréntesis solo afectó al primer término', 'الناقص قبل القوس أثّر في الحد الأول فقط', 'The minus before the bracket changed only the first term'),
    'divide-right-to-left': say('Zatiketa eta biderketa eskuinetik ezkerrera egin ditu', 'Hizo la división y el producto de derecha a izquierda', 'أجرى القسمة والضرب من اليمين إلى اليسار', 'Did the division and the product from right to left'),
    'product-before-power': say('Berretura baino lehen biderkatu du', 'Multiplicó antes de hacer la potencia', 'ضرب قبل حساب القوة', 'Multiplied before working out the power')
}

export const integerDetectiveTips: Record<IntegerDetectiveError, LocalizedText> = {
    'absolute-negative': say('Balio absolutua distantzia da: beti positiboa. $|-7|=7$.', 'El valor absoluto es una distancia: siempre positivo. $|-7|=7$.', 'القيمة المطلقة مسافة: موجبة دائمًا. $|-7|=7$.', 'The absolute value is a distance: always positive. $|-7|=7$.'),
    'order-by-absolute': say('Negatiboen artean, zerotik hurbilena da handiena: $-3>-8$.', 'Entre negativos, el más cercano a 0 es el mayor: $-3>-8$.', 'بين الأعداد السالبة، الأقرب إلى 0 هو الأكبر: $-3>-8$.', 'Among negatives, the one closest to 0 is the greatest: $-3>-8$.'),
    'minus-negative': say('Negatibo bat kentzea positiboa batzea da: $5-(-3)=5+3$.', 'Restar un negativo es sumar un positivo: $5-(-3)=5+3$.', 'طرح عدد سالب هو جمع موجب: $5-(-3)=5+3$.', 'Subtracting a negative is adding a positive: $5-(-3)=5+3$.'),
    'sum-of-signs': say('Zeinu desberdinak: kendu balio absolutuak eta jarri handienaren zeinua. $-5+3=-2$.', 'Signos distintos: se restan los valores absolutos y se pone el signo del mayor. $-5+3=-2$.', 'إشارتان مختلفتان: نطرح القيمتين المطلقتين ونضع إشارة الأكبر. $-5+3=-2$.', 'Different signs: subtract the absolute values and keep the sign of the larger one. $-5+3=-2$.'),
    'minus-times-minus': say('Zeinuen araua: $(-)\\cdot(-)=(+)$.', 'Regla de los signos: $(-)\\cdot(-)=(+)$.', 'قاعدة الإشارات: $(-)\\cdot(-)=(+)$.', 'Rule of signs: $(-)\\cdot(-)=(+)$.'),
    'three-negatives': say('Faktore negatibo kopurua bakoitia bada, emaitza negatiboa da.', 'Si el número de factores negativos es impar, el resultado es negativo.', 'إذا كان عدد العوامل السالبة فرديًا فالنتيجة سالبة.', 'With an odd number of negative factors, the result is negative.'),
    'square-without-brackets': say('$-3^{2}=-(3\\cdot 3)=-9$, baina $(-3)^{2}=9$.', '$-3^{2}=-(3\\cdot 3)=-9$, pero $(-3)^{2}=9$.', '$-3^{2}=-(3\\cdot 3)=-9$ لكن $(-3)^{2}=9$.', '$-3^{2}=-(3\\cdot 3)=-9$, but $(-3)^{2}=9$.'),
    'quotient-sign': say('Zatiketan ere bai: $(-)\\div(+)=(-)$.', 'También en la división: $(-)\\div(+)=(-)$.', 'في القسمة أيضًا: $(-)\\div(+)=(-)$.', 'In division too: $(-)\\div(+)=(-)$.'),
    'add-before-multiply': say('Hierarkia: lehenik biderketak eta zatiketak, gero batuketak.', 'Jerarquía: primero productos y cocientes, después sumas y restas.', 'الأولوية: الضرب والقسمة أولًا ثم الجمع والطرح.', 'Order: first multiplication and division, then addition and subtraction.'),
    'minus-bracket': say('$-(5-9)=-5+9$: parentesiko zeinu guztiak aldatzen dira.', '$-(5-9)=-5+9$: cambian todos los signos del paréntesis.', '$-(5-9)=-5+9$: تتغيّر كل إشارات القوس.', '$-(5-9)=-5+9$: every sign in the bracket changes.'),
    'divide-right-to-left': say('Zatiketak eta biderketak ezkerretik eskuinera egiten dira.', 'Divisiones y productos se hacen de izquierda a derecha.', 'تُجرى القسمة والضرب من اليسار إلى اليمين.', 'Divisions and products are done from left to right.'),
    'product-before-power': say('Berreturak biderketak baino lehen: $2\\cdot(-3)^{2}=2\\cdot 9$.', 'Las potencias antes que los productos: $2\\cdot(-3)^{2}=2\\cdot 9$.', 'القوى قبل الضرب: $2\\cdot(-3)^{2}=2\\cdot 9$.', 'Powers before products: $2\\cdot(-3)^{2}=2\\cdot 9$.')
}

/** A negative number in brackets, for products and powers */
const p = (value: number) => (value < 0 ? `(${value})` : String(value))
/** A number after a plus or minus: 5+(-3) is written 5-3 */
const plus = (value: number) => (value < 0 ? `${value}` : `+${value}`)

type Built = Omit<WorkedCase<IntegerDetectiveError>, 'options'>

function build(random: Random, error: IntegerDetectiveError): Built | null {
    const problem = (latex: string) => say(`Kalkulatu: $${latex}$`, `Calcula: $${latex}$`, `احسب: $${latex}$`, `Work out: $${latex}$`)
    switch (error) {
        case 'absolute-negative': {
            const a = randomInt(random, 3, 9)
            const b = randomInt(random, 2, 6)
            return {
                problem: problem(`${b}\\cdot 2+|-${a}|`),
                lines: [line(LABELS.product, `${b}\\cdot 2=${2 * b}`), line(LABELS.step, `|-${a}|=-${a}`), line(LABELS.result, `${2 * b}-${a}=${2 * b - a}`)],
                wrong: 1,
                error,
                fix: `|-${a}|=${a}\\ \\to\\ ${2 * b}+${a}=${2 * b + a}`,
                right: 2 * b + a,
                reached: 2 * b - a
            }
        }
        case 'order-by-absolute': {
            const [small, big] = [randomInt(random, 1, 5), randomInt(random, 6, 12)]
            return {
                problem: say(`$-${small}$ eta $-${big}$: kalkulatu handiena ken txikiena.`, `$-${small}$ y $-${big}$: calcula el mayor menos el menor.`, `$-${small}$ و$-${big}$: احسب الأكبر ناقص الأصغر.`, `$-${small}$ and $-${big}$: work out the greater minus the smaller.`),
                lines: [line(LABELS.compare, `-${big}>-${small}`), line(LABELS.step, `-${big}-(-${small})`), line(LABELS.result, `${small - big}`)],
                wrong: 0,
                error,
                fix: `-${small}>-${big}\\ \\to\\ -${small}-(-${big})=${big - small}`,
                right: big - small,
                reached: small - big
            }
        }
        case 'minus-negative': {
            const a = randomInt(random, 2, 9)
            const b = randomInt(random, 2, 9)
            const c = randomInt(random, 2, 6)
            return {
                problem: problem(`${c}\\cdot 3+${a}-(-${b})`),
                lines: [line(LABELS.product, `${c}\\cdot 3=${3 * c}`), line(LABELS.signs, `${3 * c}+${a}-${b}`), line(LABELS.result, `${3 * c + a - b}`)],
                wrong: 1,
                error,
                fix: `${3 * c}+${a}+${b}=${3 * c + a + b}`,
                right: 3 * c + a + b,
                reached: 3 * c + a - b
            }
        }
        case 'sum-of-signs': {
            const a = randomInt(random, 4, 12)
            const b = randomInt(random, 2, a - 1)
            const c = randomInt(random, 2, 9)
            return {
                problem: problem(`-${a}+${b}-${c}`),
                lines: [line(LABELS.step, `-${a}+${b}=-${a + b}`), line(LABELS.step, `-${a + b}-${c}`), line(LABELS.result, `${-(a + b) - c}`)],
                wrong: 0,
                error,
                fix: `-${a}+${b}=${b - a}\\ \\to\\ ${b - a}-${c}=${b - a - c}`,
                right: b - a - c,
                reached: -(a + b) - c
            }
        }
        case 'minus-times-minus': {
            const a = randomInt(random, 2, 9)
            const b = randomInt(random, 2, 9)
            const c = randomInt(random, 2, 20)
            return {
                problem: problem(`(-${a})\\cdot(-${b})+${c}`),
                lines: [line(LABELS.product, `(-${a})\\cdot(-${b})=-${a * b}`), line(LABELS.step, `-${a * b}+${c}`), line(LABELS.result, `${c - a * b}`)],
                wrong: 0,
                error,
                fix: `(-${a})\\cdot(-${b})=${a * b}\\ \\to\\ ${a * b}+${c}=${a * b + c}`,
                right: a * b + c,
                reached: c - a * b
            }
        }
        case 'three-negatives': {
            const [a, b, c] = [randomInt(random, 2, 5), randomInt(random, 2, 5), randomInt(random, 1, 4)]
            const d = randomInt(random, 2, 15)
            const product = a * b * c
            return {
                problem: problem(`(-${a})\\cdot(-${b})\\cdot(-${c})+${d}`),
                lines: [line(LABELS.product, `${a}\\cdot ${b}\\cdot ${c}=${product}`), line(LABELS.signs, `(-)\\cdot(-)\\cdot(-)=(+)`), line(LABELS.result, `${product}+${d}=${product + d}`)],
                wrong: 1,
                error,
                fix: `(-)\\cdot(-)\\cdot(-)=(-)\\ \\to\\ -${product}+${d}=${d - product}`,
                right: d - product,
                reached: product + d
            }
        }
        case 'square-without-brackets': {
            const a = randomInt(random, 2, 6)
            const b = randomInt(random, 5, 30)
            return {
                problem: problem(`-${a}^{2}+${b}`),
                lines: [line(LABELS.power, `-${a}^{2}=${a * a}`), line(LABELS.step, `${a * a}+${b}`), line(LABELS.result, `${a * a + b}`)],
                wrong: 0,
                error,
                fix: `-${a}^{2}=-${a * a}\\ \\to\\ -${a * a}+${b}=${b - a * a}`,
                right: b - a * a,
                reached: a * a + b
            }
        }
        case 'quotient-sign': {
            const b = randomInt(random, 2, 6)
            const q = randomInt(random, 2, 7)
            const c = randomInt(random, 2, 12)
            return {
                problem: problem(`(-${b * q})\\div ${b}-${c}`),
                lines: [line(LABELS.step, `${b * q}\\div ${b}=${q}`), line(LABELS.signs, `(-)\\div(+)=(+)`), line(LABELS.result, `${q}-${c}=${q - c}`)],
                wrong: 1,
                error,
                fix: `(-${b * q})\\div ${b}=-${q}\\ \\to\\ -${q}-${c}=${-q - c}`,
                right: -q - c,
                reached: q - c
            }
        }
        case 'add-before-multiply': {
            const a = randomInt(random, 2, 9)
            const b = randomInt(random, 2, 6)
            const c = pick(random, [-2, -3, -4, -5])
            return {
                problem: problem(`-${a}+${b}\\cdot${p(c)}`),
                lines: [line(LABELS.step, `-${a}+${b}=${b - a}`), line(LABELS.product, `${p(b - a)}\\cdot${p(c)}`), line(LABELS.result, `${(b - a) * c}`)],
                wrong: 0,
                error,
                fix: `${b}\\cdot${p(c)}=${b * c}\\ \\to\\ -${a}${plus(b * c)}=${b * c - a}`,
                right: b * c - a,
                reached: (b - a) * c
            }
        }
        case 'minus-bracket': {
            const a = randomInt(random, 3, 12)
            const b = randomInt(random, 2, 8)
            const c = randomInt(random, b + 1, 15)
            return {
                problem: problem(`${a}-(${b}-${c})`),
                lines: [line(LABELS.bracket, `${a}-${b}-${c}`), line(LABELS.step, `${a - b}-${c}`), line(LABELS.result, `${a - b - c}`)],
                wrong: 0,
                error,
                fix: `${a}-${b}+${c}=${a - b + c}`,
                right: a - b + c,
                reached: a - b - c
            }
        }
        case 'divide-right-to-left': {
            const b = pick(random, [2, 3])
            const c = pick(random, [2, 4, 3])
            const a = -b * c * randomInt(random, 2, 4)
            if ((a / b) * c === a / (b * c)) return null
            return {
                problem: problem(`${p(a)}\\div ${b}\\cdot ${c}`),
                lines: [line(LABELS.signs, `(-)\\div(+)\\cdot(+)=(-)`), line(LABELS.product, `${b}\\cdot ${c}=${b * c}`), line(LABELS.result, `${p(a)}\\div ${b * c}=${a / (b * c)}`)],
                wrong: 1,
                error,
                fix: `${p(a)}\\div ${b}=${a / b}\\ \\to\\ ${p(a / b)}\\cdot ${c}=${(a / b) * c}`,
                right: (a / b) * c,
                reached: a / (b * c)
            }
        }
        case 'product-before-power': {
            const a = randomInt(random, 2, 4)
            const b = pick(random, [-2, -3])
            const c = randomInt(random, 2, 20)
            return {
                problem: problem(`${a}\\cdot${p(b)}^{2}-${c}`),
                lines: [line(LABELS.product, `${a}\\cdot${p(b)}=${a * b}`), line(LABELS.power, `${p(a * b)}^{2}=${(a * b) ** 2}`), line(LABELS.result, `${(a * b) ** 2}-${c}=${(a * b) ** 2 - c}`)],
                wrong: 0,
                error,
                fix: `${p(b)}^{2}=${b * b}\\ \\to\\ ${a}\\cdot ${b * b}-${c}=${a * b * b - c}`,
                right: a * b * b - c,
                reached: (a * b) ** 2 - c
            }
        }
    }
}

export const createIntegerDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, integerDetectiveLevels[levelIndex], INTEGER_DETECTIVE_CASES, build)
