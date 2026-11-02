import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki osoen detektibea (1. DBH integers): a worked calculation of three
   lines with one wrong line. Level 1: order, absolute value and opposite
   (the bigger absolute value taken as the higher temperature, |−7| = −7,
   −(−5) = −5); level 2: additions and subtractions (−3 − 5 done as 5 − 3,
   −9 + 4 with the absolute values added, a − (−b) written a − b); level 3:
   products and quotients (the sign rule forgotten in a product or in a
   quotient, an addition done before a product).
   ========================================================================== */

export type IntegersDetectiveError =
    | 'bigger-absolute'
    | 'absolute-negative'
    | 'opposite-sign'
    | 'same-sign-subtract'
    | 'different-sign-add'
    | 'subtract-negative'
    | 'product-signs'
    | 'division-sign'
    | 'add-before-multiply'

export const integersDetectiveLevels: IntegersDetectiveError[][] = [
    ['bigger-absolute', 'absolute-negative', 'opposite-sign'],
    ['same-sign-subtract', 'different-sign-add', 'subtract-negative'],
    ['product-signs', 'division-sign', 'add-before-multiply']
]

export const INTEGERS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step1: say('1. urratsa', 'Paso 1', 'الخطوة 1', 'Step 1'),
    step2: say('2. urratsa', 'Paso 2', 'الخطوة 2', 'Step 2'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    absolute: say('Balio absolutuak', 'Valores absolutos', 'القيم المطلقة', 'Absolute values'),
    compare: say('Konparatu', 'Compara', 'قارن', 'Compare'),
    highest: say('Altuena', 'La más alta', 'الأعلى', 'The highest'),
    opposite: say('Aurkakoa', 'El opuesto', 'المعاكس', 'The opposite'),
    signs: say('Zeinuen araua', 'Regla de los signos', 'قاعدة الإشارات', 'Sign rule')
}

export const integersDetectiveNames: Record<IntegersDetectiveError, LocalizedText> = {
    'bigger-absolute': say('Balio absolutu handiena duena handiena dela uste du', 'Creyó mayor el de mayor valor absoluto', 'ظن أن صاحب القيمة المطلقة الأكبر هو الأكبر', 'Thought the bigger absolute value is the greater number'),
    'absolute-negative': say('Balio absolutua negatibo utzi du', 'Dejó negativo el valor absoluto', 'ترك القيمة المطلقة سالبة', 'Left the absolute value negative'),
    'opposite-sign': say('Negatibo baten aurkakoa negatibo utzi du', 'Dejó negativo el opuesto de un negativo', 'ترك معاكس العدد السالب سالبًا', 'Left the opposite of a negative negative'),
    'same-sign-subtract': say('Bi negatibo kendu ditu, batu beharrean', 'Restó dos negativos en vez de juntarlos', 'طرح عددين سالبين بدل جمعهما', 'Subtracted two negatives instead of putting them together'),
    'different-sign-add': say('Zeinu desberdinekin balio absolutuak batu ditu', 'Con signos distintos sumó los valores absolutos', 'جمع القيم المطلقة مع أن الإشارتين مختلفتان', 'Added the absolute values although the signs differ'),
    'subtract-negative': say('Negatibo bat kentzean ez du zeinua aldatu', 'Al restar un negativo no cambió el signo', 'لم يغيّر الإشارة عند طرح عدد سالب', 'Did not change the sign when subtracting a negative'),
    'product-signs': say('Bi negatiboren biderkadura negatibo jarri du', 'Puso negativo el producto de dos negativos', 'جعل حاصل ضرب سالبين سالبًا', 'Made the product of two negatives negative'),
    'division-sign': say('Zatiketan zeinua galdu du', 'Perdió el signo en la división', 'أضاع الإشارة في القسمة', 'Lost the sign in the division'),
    'add-before-multiply': say('Batu egin du biderkatu baino lehen', 'Sumó antes de multiplicar', 'جمع قبل أن يضرب', 'Added before multiplying')
}

export const integersDetectiveTips: Record<IntegersDetectiveError, LocalizedText> = {
    'bigger-absolute': say('Negatiboen artean, zerotik hurbilen dagoena da handiena: $-3>-8$.', 'Entre negativos, el más cercano al cero es el mayor: $-3>-8$.', 'بين الأعداد السالبة الأقرب إلى الصفر هو الأكبر: $-3>-8$.', 'Among negatives, the one closest to zero is the greater: $-3>-8$.'),
    'absolute-negative': say('Balio absolutua zerorainoko distantzia da: beti positiboa, $|-7|=7$.', 'El valor absoluto es la distancia al cero: siempre positivo, $|-7|=7$.', 'القيمة المطلقة هي المسافة إلى الصفر، وهي موجبة دائمًا: $|-7|=7$.', 'The absolute value is the distance to zero: always positive, $|-7|=7$.'),
    'opposite-sign': say('Negatibo baten aurkakoa positiboa da: $-(-5)=5$.', 'El opuesto de un negativo es positivo: $-(-5)=5$.', 'معاكس العدد السالب موجب: $-(-5)=5$.', 'The opposite of a negative is positive: $-(-5)=5$.'),
    'same-sign-subtract': say('Zeinu berekoak: batu balio absolutuak eta jarri zeinu bera, $-3-5=-8$.', 'Del mismo signo: se suman los valores absolutos y se deja el signo, $-3-5=-8$.', 'إشارة واحدة: نجمع القيم المطلقة ونبقي الإشارة، $-3-5=-8$.', 'Same sign: add the absolute values and keep the sign, $-3-5=-8$.'),
    'different-sign-add': say('Zeinu desberdinekoak: handitik txikia kendu, eta handiaren zeinua, $-9+4=-5$.', 'De distinto signo: se resta el pequeño del grande y se pone el signo del grande, $-9+4=-5$.', 'إشارتان مختلفتان: نطرح الأصغر من الأكبر ونضع إشارة الأكبر، $-9+4=-5$.', 'Different signs: subtract the smaller from the bigger and keep the sign of the bigger, $-9+4=-5$.'),
    'subtract-negative': say('Kentzea aurkakoa batzea da: $4-(-6)=4+6$.', 'Restar es sumar el opuesto: $4-(-6)=4+6$.', 'الطرح هو جمع المعاكس: $4-(-6)=4+6$.', 'Subtracting is adding the opposite: $4-(-6)=4+6$.'),
    'product-signs': say('Zeinu berekoak biderkatuta, positiboa: $(-2)\\cdot (-3)=6$.', 'Signos iguales dan positivo: $(-2)\\cdot (-3)=6$.', 'الإشارتان المتشابهتان تعطيان موجبًا: $(-2)\\cdot (-3)=6$.', 'Equal signs give a positive: $(-2)\\cdot (-3)=6$.'),
    'division-sign': say('Zeinu desberdinak zatituta, negatiboa: $(-12)\\div 3=-4$.', 'Signos distintos dan negativo: $(-12)\\div 3=-4$.', 'الإشارتان المختلفتان تعطيان سالبًا: $(-12)\\div 3=-4$.', 'Different signs give a negative: $(-12)\\div 3=-4$.'),
    'add-before-multiply': say('Lehenik biderketak eta zatiketak; gero batuketak eta kenketak.', 'Primero multiplicaciones y divisiones; después sumas y restas.', 'أولًا الضرب والقسمة ثم الجمع والطرح.', 'First multiplications and divisions, then additions and subtractions.')
}

type Built = Omit<WorkedCase<IntegersDetectiveError>, 'options'>

const calculate = (latex: string) => say(`Kalkulatu: $${latex}$`, `Calcula: $${latex}$`, `احسب: $${latex}$`, `Work out: $${latex}$`)

function build(random: Random, error: IntegersDetectiveError): Built | null {
    switch (error) {
        case 'bigger-absolute': {
            const far = -randomInt(random, 4, 9)
            const near = randomInt(random, far + 1, -1)
            const [first, second] = pick(random, [[far, near], [near, far]])
            return {
                problem: say(`Bi hiritan $${first}$ °C eta $${second}$ °C daude. Zein da tenperatura altuena?`, `En dos ciudades hay $${first}$ °C y $${second}$ °C. ¿Cuál es la temperatura más alta?`, `في مدينتين $${first}$ °C و$${second}$ °C. ما أعلى درجة حرارة؟`, `Two cities are at $${first}$ °C and $${second}$ °C. Which is the higher temperature?`),
                lines: [line(LABELS.absolute, `|${far}|=${-far},\\ |${near}|=${-near}`), line(LABELS.compare, `${-far}>${-near}`), line(LABELS.highest, `${far}`)],
                wrong: 2, error, fix: `${near}>${far}\\ \\to\\ ${near}`, right: near, reached: far
            }
        }
        case 'absolute-negative': {
            const [a, b] = [randomInt(random, 2, 9), randomInt(random, 1, 9)]
            return {
                problem: calculate(`|-${a}|+|${b}|`),
                lines: [line(LABELS.absolute, `|-${a}|=-${a}`), line(LABELS.step2, `-${a}+${b}`), line(LABELS.result, `${b - a}`)],
                wrong: 0, error, fix: `|-${a}|=${a}\\ \\to\\ ${a}+${b}=${a + b}`, right: a + b, reached: b - a
            }
        }
        case 'opposite-sign': {
            const [a, b] = [randomInt(random, 2, 9), randomInt(random, 1, 9)]
            return {
                problem: calculate(`-(-${a})-${b}`),
                lines: [line(LABELS.opposite, `-(-${a})=-${a}`), line(LABELS.step2, `-${a}-${b}`), line(LABELS.result, `${-a - b}`)],
                wrong: 0, error, fix: `-(-${a})=${a}\\ \\to\\ ${a}-${b}=${a - b}`, right: a - b, reached: -a - b
            }
        }
        case 'same-sign-subtract': {
            const a = randomInt(random, 2, 9)
            const b = pick(random, [2, 3, 4, 5, 6, 7, 8, 9].filter((value) => value !== a))
            const c = randomInt(random, 1, 9)
            return {
                problem: calculate(`-${a}-${b}+${c}`),
                lines: [line(LABELS.step1, `-${a}-${b}=${b - a}`), line(LABELS.step2, `${b - a}+${c}`), line(LABELS.result, `${b - a + c}`)],
                wrong: 0, error, fix: `-${a}-${b}=-${a + b}\\ \\to\\ -${a + b}+${c}=${c - a - b}`, right: c - a - b, reached: b - a + c
            }
        }
        case 'different-sign-add': {
            const a = randomInt(random, 5, 12)
            const [b, c] = [randomInt(random, 1, a - 1), randomInt(random, 1, 9)]
            return {
                problem: calculate(`(-${a})+${b}-${c}`),
                lines: [line(LABELS.step1, `(-${a})+${b}=-${a + b}`), line(LABELS.step2, `-${a + b}-${c}`), line(LABELS.result, `${-(a + b + c)}`)],
                wrong: 0, error, fix: `(-${a})+${b}=-${a - b}\\ \\to\\ -${a - b}-${c}=${b - a - c}`, right: b - a - c, reached: -(a + b + c)
            }
        }
        case 'subtract-negative': {
            const [a, b, c] = [randomInt(random, 1, 9), randomInt(random, 2, 9), randomInt(random, 1, 9)]
            return {
                problem: calculate(`${a}-(-${b})+(-${c})`),
                lines: [line(LABELS.step1, `${a}-${b}+(-${c})`), line(LABELS.step2, `${a - b}+(-${c})`), line(LABELS.result, `${a - b - c}`)],
                wrong: 0, error, fix: `${a}+${b}+(-${c})=${a + b - c}`, right: a + b - c, reached: a - b - c
            }
        }
        case 'product-signs': {
            const [a, b, c] = [randomInt(random, 2, 9), randomInt(random, 2, 9), randomInt(random, 1, 20)]
            return {
                problem: calculate(`(-${a})\\cdot (-${b})+${c}`),
                lines: [line(LABELS.signs, `(-${a})\\cdot (-${b})=-${a * b}`), line(LABELS.step2, `-${a * b}+${c}`), line(LABELS.result, `${c - a * b}`)],
                wrong: 0, error, fix: `(-${a})\\cdot (-${b})=${a * b}\\ \\to\\ ${a * b}+${c}=${a * b + c}`, right: a * b + c, reached: c - a * b
            }
        }
        case 'division-sign': {
            const [a, b, c] = [randomInt(random, 2, 9), randomInt(random, 2, 6), randomInt(random, 1, 9)]
            return {
                problem: calculate(`(-${a * b})\\div ${b}-${c}`),
                lines: [line(LABELS.signs, `(-${a * b})\\div ${b}=${a}`), line(LABELS.step2, `${a}-${c}`), line(LABELS.result, `${a - c}`)],
                wrong: 0, error, fix: `(-${a * b})\\div ${b}=-${a}\\ \\to\\ -${a}-${c}=${-a - c}`, right: -a - c, reached: a - c
            }
        }
        case 'add-before-multiply': {
            const a = randomInt(random, 1, 5)
            const [b, d, e] = [randomInt(random, a + 1, 9), randomInt(random, 2, 5), randomInt(random, 1, 9)]
            return {
                problem: calculate(`-${a}+${b}\\cdot (-${d})+${e}`),
                lines: [line(LABELS.step1, `${b - a}\\cdot (-${d})+${e}`), line(LABELS.step2, `-${(b - a) * d}+${e}`), line(LABELS.result, `${e - (b - a) * d}`)],
                wrong: 0, error, fix: `-${a}+(-${b * d})+${e}=${e - a - b * d}`, right: e - a - b * d, reached: e - (b - a) * d
            }
        }
    }
}

export const createIntegersDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, integersDetectiveLevels[levelIndex], INTEGERS_DETECTIVE_CASES, build)
