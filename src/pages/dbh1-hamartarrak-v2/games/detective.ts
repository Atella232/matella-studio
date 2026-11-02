import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Hamartarren detektibea (1. DBH decimals): a worked answer of three lines
   with one wrong line. Level 1: order, fractions and rounding (the longer
   decimal taken as the bigger, 3/4 written as 3,4, rounded by cutting);
   level 2: operations (decimals added aligned on the right, a decimal
   place lost in a product, a zero put after the comma when dividing by 10);
   level 3: divisions and problems (the comma moved only in the divisor,
   the comma of the quotient forgotten, the change worked out without
   borrowing).
   ========================================================================== */

export type DecimalsDetectiveError =
    | 'longer-is-bigger'
    | 'fraction-digits'
    | 'rounding-cut'
    | 'align-right'
    | 'product-places'
    | 'divide-ten-zero'
    | 'divisor-only'
    | 'quotient-comma'
    | 'change-no-borrow'

export const decimalsDetectiveLevels: DecimalsDetectiveError[][] = [
    ['longer-is-bigger', 'fraction-digits', 'rounding-cut'],
    ['align-right', 'product-places', 'divide-ten-zero'],
    ['divisor-only', 'quotient-comma', 'change-no-borrow']
]

export const DECIMALS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
/** A decimal in a formula, with the comma as {,} */
const d = (value: number) => String(Math.round(value * 10000) / 10000).replace('.', '{,}')
const LABELS = {
    step1: say('1. urratsa', 'Paso 1', 'الخطوة 1', 'Step 1'),
    step2: say('2. urratsa', 'Paso 2', 'الخطوة 2', 'Step 2'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    compare: say('Konparatu', 'Compara', 'قارن', 'Compare'),
    decimals: say('Zati hamartarrak', 'Partes decimales', 'الأجزاء العشرية', 'Decimal parts'),
    bigger: say('Handiena', 'El mayor', 'الأكبر', 'The bigger'),
    divide: say('Zatitu', 'Divide', 'اقسم', 'Divide'),
    between: say('Bi hamarrenen artean', 'Entre dos décimas', 'بين جزأين من عشرة', 'Between two tenths'),
    next: say('Hurrengo zifra', 'Cifra siguiente', 'الرقم التالي', 'Next digit'),
    rounded: say('Biribilketa', 'Redondeo', 'التقريب', 'Rounded'),
    whole: say('Komarik gabe', 'Sin comas', 'دون فاصلة', 'Without commas'),
    comma: say('Koma jarri', 'Pon la coma', 'ضع الفاصلة', 'Place the comma'),
    euros: say('Euroak', 'Euros', 'اليوروهات', 'Euros'),
    cents: say('Zentimoak', 'Céntimos', 'السنتات', 'Cents'),
    change: say('Itzulia', 'Cambio', 'الباقي', 'Change')
}

export const decimalsDetectiveNames: Record<DecimalsDetectiveError, LocalizedText> = {
    'longer-is-bigger': say('Zifra gehien dituena handiena dela uste du', 'Creyó mayor el que tiene más cifras', 'ظن أن صاحب الأرقام الأكثر هو الأكبر', 'Thought the one with more digits is bigger'),
    'fraction-digits': say('Zenbakitzailea eta izendatzailea komaz bereizi ditu', 'Separó numerador y denominador con una coma', 'فصل البسط والمقام بفاصلة', 'Split numerator and denominator with a decimal comma'),
    'rounding-cut': say('Moztu egin du, biribildu beharrean', 'Cortó en vez de redondear', 'قطع بدل أن يقرّب', 'Cut off instead of rounding'),
    'align-right': say('Zifrak eskuinean lerrokatu ditu, ez komaren arabera', 'Alineó las cifras a la derecha y no por la coma', 'صفّ الأرقام من اليمين لا حسب الفاصلة', 'Lined the digits up on the right, not by the comma'),
    'product-places': say('Biderkaduran zifra hamartar bat galdu du', 'Perdió una cifra decimal en el producto', 'أضاع رقمًا عشريًا في الضرب', 'Lost a decimal place in the product'),
    'divide-ten-zero': say('Hamarrez zatitzean, zero bat jarri du komaren ondoren', 'Al dividir entre 10 puso un cero tras la coma', 'وضع صفرًا بعد الفاصلة عند القسمة على 10', 'Put a zero after the comma when dividing by 10'),
    'divisor-only': say('Koma zatitzailean bakarrik mugitu du', 'Movió la coma solo en el divisor', 'حرّك الفاصلة في المقسوم عليه فقط', 'Moved the comma only in the divisor'),
    'quotient-comma': say('Zatiduraren koma ahaztu du', 'Olvidó la coma del cociente', 'نسي الفاصلة في ناتج القسمة', 'Forgot the comma of the quotient'),
    'change-no-borrow': say('Zentimoak kentzean ez du euro bat hartu', 'Al restar los céntimos no pidió un euro', 'لم يستلف يورو عند طرح السنتات', 'Did not borrow a euro when subtracting the cents')
}

export const decimalsDetectiveTips: Record<DecimalsDetectiveError, LocalizedText> = {
    'longer-is-bigger': say('Berdindu zifra hamartarrak zeroekin: $0{,}50>0{,}45$.', 'Iguala las cifras decimales con ceros: $0{,}50>0{,}45$.', 'ساوِ الأرقام العشرية بالأصفار: $0{,}50>0{,}45$.', 'Even out the decimal places with zeros: $0{,}50>0{,}45$.'),
    'fraction-digits': say('Zatiki bat zatiketa bat da: $\\frac{3}{4}=3\\div 4=0{,}75$.', 'Una fracción es una división: $\\frac{3}{4}=3\\div 4=0{,}75$.', 'الكسر قسمة: $\\frac{3}{4}=3\\div 4=0{,}75$.', 'A fraction is a division: $\\frac{3}{4}=3\\div 4=0{,}75$.'),
    'rounding-cut': say('Hurrengo zifra 5 edo handiagoa bada, gora biribildu.', 'Si la cifra siguiente es 5 o más, se redondea hacia arriba.', 'إذا كان الرقم التالي 5 أو أكثر نقرّب إلى الأعلى.', 'If the next digit is 5 or more, round up.'),
    'align-right': say('Batzeko, koma komaren azpian: $2{,}30+1{,}45$.', 'Para sumar, coma debajo de coma: $2{,}30+1{,}45$.', 'في الجمع: الفاصلة تحت الفاصلة، $2{,}30+1{,}45$.', 'To add, comma under comma: $2{,}30+1{,}45$.'),
    'product-places': say('Biderkaduran, bi faktoreen zifra hamartarrak batzen dira.', 'En el producto se suman las cifras decimales de los dos factores.', 'في الضرب نجمع عدد الأرقام العشرية للعاملين.', 'In a product, the decimal places of both factors add up.'),
    'divide-ten-zero': say('Hamarrez zatitzean, zifrak toki bat eskuinera: $3{,}2\\div 10=0{,}32$.', 'Al dividir entre 10, las cifras pasan un lugar a la derecha: $3{,}2\\div 10=0{,}32$.', 'عند القسمة على 10 تنتقل الأرقام خانة إلى اليمين: $3{,}2\\div 10=0{,}32$.', 'Dividing by 10 moves the digits one place to the right: $3{,}2\\div 10=0{,}32$.'),
    'divisor-only': say('Koma bi zenbakietan mugitu behar da, toki kopuru berean.', 'La coma se mueve en los dos números, los mismos lugares.', 'نحرّك الفاصلة في العددين بعدد الخانات نفسه.', 'Move the comma in both numbers by the same number of places.'),
    'quotient-comma': say('Zatikizunaren komara iristean, jarri koma zatiduran.', 'Al llegar a la coma del dividendo, se pone la coma en el cociente.', 'عند الوصول إلى فاصلة المقسوم نضع الفاصلة في الناتج.', 'When you reach the comma of the dividend, put the comma in the quotient.'),
    'change-no-borrow': say('$10$ euro $10{,}00$ dira: kendu zentimoak euro bat hartuta.', '$10$ € son $10{,}00$ €: para restar los céntimos se pide un euro.', '$10$ يورو هي $10{,}00$: نستلف يورو لطرح السنتات.', '€$10$ is €$10{,}00$: borrow a euro to subtract the cents.')
}

type Built = Omit<WorkedCase<DecimalsDetectiveError>, 'options'>

const calculate = (latex: string) => say(`Kalkulatu: $${latex}$`, `Calcula: $${latex}$`, `احسب: $${latex}$`, `Work out: $${latex}$`)

function build(random: Random, error: DecimalsDetectiveError): Built | null {
    switch (error) {
        case 'longer-is-bigger': {
            const tenth = randomInt(random, 2, 9)
            const longer = randomInt(random, 11, 10 * tenth - 1)
            if (longer % 10 === 0) return null
            const [short, long] = [tenth / 10, longer / 100]
            const [first, second] = pick(random, [[short, long], [long, short]])
            return {
                problem: say(`Zein da handiagoa: $${d(first)}$ ala $${d(second)}$?`, `¿Cuál es mayor: $${d(first)}$ o $${d(second)}$?`, `أيهما أكبر: $${d(first)}$ أم $${d(second)}$؟`, `Which is bigger: $${d(first)}$ or $${d(second)}$?`),
                lines: [line(LABELS.decimals, `${longer}>${tenth}`), line(LABELS.compare, `${d(long)}>${d(short)}`), line(LABELS.bigger, d(long))],
                wrong: 1, error, fix: `${d(short)}0>${d(long)}\\ \\to\\ ${d(short)}`, right: short, reached: long
            }
        }
        case 'fraction-digits': {
            const [n, den] = pick(random, [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 8], [3, 8]] as Array<[number, number]>)
            return {
                problem: say(`Idatzi zenbaki hamartar gisa: $\\frac{${n}}{${den}}$`, `Escribe como número decimal: $\\frac{${n}}{${den}}$`, `اكتب في صورة عدد عشري: $\\frac{${n}}{${den}}$`, `Write as a decimal: $\\frac{${n}}{${den}}$`),
                lines: [line(LABELS.divide, `\\frac{${n}}{${den}}=${n}\\div ${den}`), line(LABELS.step2, `${n}\\div ${den}=${n}{,}${den}`), line(LABELS.result, `${n}{,}${den}`)],
                wrong: 1, error, fix: `${n}\\div ${den}=${d(n / den)}`, right: n / den, reached: Number(`${n}.${den}`)
            }
        }
        case 'rounding-cut': {
            const low = randomInt(random, 11, 98) / 10
            const value = Math.round((low + randomInt(random, 50, 99) / 1000) * 1000) / 1000
            const next = Math.floor(Math.round(value * 1000) / 10) % 10
            if (next < 5) return null
            return {
                problem: say(`Biribildu hamarrenetara: $${d(value)}$`, `Redondea a las décimas: $${d(value)}$`, `قرّب إلى الأجزاء من عشرة: $${d(value)}$`, `Round to the nearest tenth: $${d(value)}$`),
                lines: [line(LABELS.between, `${d(low)}<${d(value)}<${d(low + 0.1)}`), line(LABELS.next, `${next}`), line(LABELS.rounded, `${d(value)}\\approx ${d(low)}`)],
                wrong: 2, error, fix: `${next}\\ge 5\\ \\to\\ ${d(value)}\\approx ${d(low + 0.1)}`, right: Math.round((low + 0.1) * 10) / 10, reached: low
            }
        }
        case 'align-right': {
            const [a, b] = [randomInt(random, 11, 59) / 10, randomInt(random, 101, 499) / 100]
            if (Math.round(a * 10) % 10 === 0 || Math.round(b * 100) % 10 === 0) return null
            const c = randomInt(random, 1, 9)
            // 2,3 + 1,45 read as 23 + 145 hundredths
            const wrongSum = (Math.round(a * 10) + Math.round(b * 100)) / 100
            return {
                problem: calculate(`${d(a)}+${d(b)}+${c}`),
                lines: [line(LABELS.step1, `${d(a)}+${d(b)}=${d(wrongSum)}`), line(LABELS.step2, `${d(wrongSum)}+${c}`), line(LABELS.result, d(wrongSum + c))],
                wrong: 0, error, fix: `${d(a)}0+${d(b)}=${d(a + b)}\\ \\to\\ ${d(a + b)}+${c}=${d(a + b + c)}`, right: a + b + c, reached: wrongSum + c
            }
        }
        case 'product-places': {
            const [x, y] = [randomInt(random, 11, 29), randomInt(random, 2, 9)]
            if (x % 10 === 0) return null
            const product = x * y
            if (product % 10 === 0) return null
            return {
                problem: calculate(`${d(x / 10)}\\cdot ${d(y / 10)}`),
                lines: [line(LABELS.whole, `${x}\\cdot ${y}=${product}`), line(LABELS.comma, `${product}\\ \\to\\ ${d(product / 10)}`), line(LABELS.result, `${d(x / 10)}\\cdot ${d(y / 10)}=${d(product / 10)}`)],
                wrong: 1, error, fix: `${product}\\ \\to\\ ${d(product / 100)}`, right: product / 100, reached: product / 10
            }
        }
        case 'divide-ten-zero': {
            const value = randomInt(random, 11, 99) / 10
            if (Math.round(value * 10) % 10 === 0) return null
            const c = randomInt(random, 1, 5)
            const [whole, tenth] = [Math.floor(value), Math.round(value * 10) % 10]
            const wrongValue = whole + tenth / 100
            return {
                problem: calculate(`${d(value)}\\div 10+${c}`),
                lines: [line(LABELS.step1, `${d(value)}\\div 10=${d(wrongValue)}`), line(LABELS.step2, `${d(wrongValue)}+${c}`), line(LABELS.result, d(wrongValue + c))],
                wrong: 0, error, fix: `${d(value)}\\div 10=${d(value / 10)}\\ \\to\\ ${d(value / 10)}+${c}=${d(value / 10 + c)}`, right: value / 10 + c, reached: wrongValue + c
            }
        }
        case 'divisor-only': {
            const [divisor, quotient] = [randomInt(random, 2, 9), randomInt(random, 2, 9)]
            const dividend = (divisor * quotient) / 10
            if (Math.round(dividend * 10) % 10 === 0) return null
            return {
                problem: calculate(`${d(dividend)}\\div ${d(divisor / 10)}`),
                lines: [line(LABELS.step1, `${d(dividend)}\\div ${d(divisor / 10)}\\ \\to\\ ${d(dividend)}\\div ${divisor}`), line(LABELS.divide, `${d(dividend)}\\div ${divisor}=${d(quotient / 10)}`), line(LABELS.result, d(quotient / 10))],
                wrong: 0, error, fix: `${divisor * quotient}\\div ${divisor}=${quotient}`, right: quotient, reached: quotient / 10
            }
        }
        case 'quotient-comma': {
            const [divisor, quotient] = [randomInt(random, 2, 9), randomInt(random, 11, 49)]
            if (quotient % 10 === 0) return null
            const dividend = divisor * quotient
            return {
                problem: calculate(`${d(dividend / 10)}\\div ${divisor}`),
                lines: [line(LABELS.whole, `${dividend}\\div ${divisor}=${quotient}`), line(LABELS.comma, `${quotient}`), line(LABELS.result, `${d(dividend / 10)}\\div ${divisor}=${quotient}`)],
                wrong: 1, error, fix: `${quotient}\\ \\to\\ ${d(quotient / 10)}`, right: quotient / 10, reached: quotient
            }
        }
        case 'change-no-borrow': {
            const pay = pick(random, [5, 10, 20])
            const cents = randomInt(random, 11, 89)
            const euros = randomInt(random, 1, pay - 2)
            if (cents % 10 === 0 || cents === 50) return null
            const price = euros + cents / 100
            const reached = pay - euros + cents / 100
            return {
                problem: say(`$${d(price)}$ € balio duen zerbait $${pay}$ €-ko billetearekin ordaindu duzu. Zenbat itzuliko dizute?`, `Pagas algo de $${d(price)}$ € con un billete de $${pay}$ €. ¿Cuánto te devuelven?`, `تدفع ثمن شيء قيمته $${d(price)}$ يورو بورقة من $${pay}$ يورو. كم يُرجَع لك؟`, `You pay for something that costs €$${d(price)}$ with a €$${pay}$ note. How much change do you get?`),
                lines: [line(LABELS.euros, `${pay}-${euros}=${pay - euros}`), line(LABELS.cents, `${cents}`), line(LABELS.change, d(reached))],
                wrong: 1, error, fix: `${pay}{,}00-${d(price)}=${d(pay - price)}`, right: pay - price, reached
            }
        }
    }
}

export const createDecimalsDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, decimalsDetectiveLevels[levelIndex], DECIMALS_DETECTIVE_CASES, build)
