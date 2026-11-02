import { randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { formatNaturalLatex as big } from '../format.ts'

/* ==========================================================================
   Zenbakien detektibea (1. DBH natural numbers): a worked calculation of
   three lines with one wrong line. Level 1: division and rounding (a zero
   forgotten in the quotient, a remainder as big as the divisor, rounded
   down with a 5 or more); level 2: the order of operations (added before
   multiplying, brackets ignored, multiplied before dividing); level 3:
   powers (base times exponent, multiplied before the power, a zero too few
   in a power of 10).
   ========================================================================== */

export type NaturalsDetectiveError =
    | 'zero-quotient'
    | 'remainder-too-big'
    | 'rounding-down'
    | 'left-to-right'
    | 'brackets-ignored'
    | 'multiply-before-divide'
    | 'power-times'
    | 'power-hierarchy'
    | 'power-ten-zeros'

export const naturalsDetectiveLevels: NaturalsDetectiveError[][] = [
    ['zero-quotient', 'remainder-too-big', 'rounding-down'],
    ['left-to-right', 'brackets-ignored', 'multiply-before-divide'],
    ['power-times', 'power-hierarchy', 'power-ten-zeros']
]

export const NATURALS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step1: say('1. urratsa', 'Paso 1', 'الخطوة 1', 'Step 1'),
    step2: say('2. urratsa', 'Paso 2', 'الخطوة 2', 'Step 2'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    hundreds: say('Ehunekoak', 'Centenas', 'المئات', 'Hundreds'),
    rest: say('Hamarrekoak eta unitateak', 'Decenas y unidades', 'العشرات والآحاد', 'Tens and units'),
    quotient: say('Zatidura', 'Cociente', 'ناتج القسمة', 'Quotient'),
    attempt: say('Proba', 'Prueba', 'نجرّب', 'Try'),
    subtract: say('Kenketa', 'Resta', 'الطرح', 'Subtract'),
    both: say('Zatidura eta hondarra', 'Cociente y resto', 'الناتج والباقي', 'Quotient and remainder'),
    between: say('Bi ehunekoen artean', 'Entre dos centenas', 'بين مئتين', 'Between two hundreds'),
    tens: say('Hamarrekoen zifra', 'Cifra de las decenas', 'رقم العشرات', 'Tens digit'),
    rounded: say('Biribilketa', 'Redondeo', 'التقريب', 'Rounded'),
    power: say('Berretura', 'Potencia', 'القوة', 'Power')
}

export const naturalsDetectiveNames: Record<NaturalsDetectiveError, LocalizedText> = {
    'zero-quotient': say('Zatiduran zero bat ahaztu du', 'Olvidó un cero en el cociente', 'نسي صفرًا في ناتج القسمة', 'Forgot a zero in the quotient'),
    'remainder-too-big': say('Hondarra zatitzailea baino handiagoa da', 'El resto es mayor que el divisor', 'الباقي أكبر من المقسوم عليه', 'The remainder is bigger than the divisor'),
    'rounding-down': say('Behera biribildu du, hurrengo zifra 5 edo handiagoa izanda', 'Redondeó hacia abajo con un 5 o más detrás', 'قرّب إلى الأسفل والرقم التالي 5 أو أكثر', 'Rounded down with a 5 or more after it'),
    'left-to-right': say('Batu egin du biderkatu baino lehen', 'Sumó antes de multiplicar', 'جمع قبل أن يضرب', 'Added before multiplying'),
    'brackets-ignored': say('Parentesia ez du errespetatu', 'No respetó el paréntesis', 'لم يحترم القوسين', 'Ignored the brackets'),
    'multiply-before-divide': say('Biderkatu egin du zatitu baino lehen', 'Multiplicó antes de dividir', 'ضرب قبل أن يقسم', 'Multiplied before dividing'),
    'power-times': say('Oinarria eta berretzailea biderkatu ditu', 'Multiplicó la base por el exponente', 'ضرب الأساس في الأس', 'Multiplied the base by the exponent'),
    'power-hierarchy': say('Biderkatu egin du berretura kalkulatu baino lehen', 'Multiplicó antes de hacer la potencia', 'ضرب قبل حساب القوة', 'Multiplied before working out the power'),
    'power-ten-zeros': say('Zero bat gutxiago jarri du', 'Puso un cero de menos', 'وضع صفرًا أقل من اللازم', 'Wrote one zero too few')
}

export const naturalsDetectiveTips: Record<NaturalsDetectiveError, LocalizedText> = {
    'zero-quotient': say('Zifra batek zatitzailea hartzen ez duenean, 0 bat zatiduran.', 'Cuando una cifra no llega al divisor, se pone un 0 en el cociente.', 'عندما لا يكفي الرقم للقسمة نضع 0 في ناتج القسمة.', 'When a digit is smaller than the divisor, a 0 goes in the quotient.'),
    'remainder-too-big': say('Hondarra beti zatitzailea baino txikiagoa: bestela, zatidurak bat gehiago hartzen du.', 'El resto siempre es menor que el divisor: si no, el cociente cabe una vez más.', 'الباقي دائمًا أصغر من المقسوم عليه، وإلا يزيد الناتج واحدًا.', 'The remainder is always smaller than the divisor; if not, the quotient goes up by one.'),
    'rounding-down': say('Hurrengo zifra 5 edo handiagoa bada, gora biribildu.', 'Si la cifra siguiente es 5 o más, se redondea hacia arriba.', 'إذا كان الرقم التالي 5 أو أكثر نقرّب إلى الأعلى.', 'If the next digit is 5 or more, round up.'),
    'left-to-right': say('Lehenik biderketak eta zatiketak; gero batuketak eta kenketak.', 'Primero multiplicaciones y divisiones; después sumas y restas.', 'أولًا الضرب والقسمة ثم الجمع والطرح.', 'First multiplications and divisions, then additions and subtractions.'),
    'brackets-ignored': say('Parentesiak lehenengo: $a\\cdot (b-c)$.', 'Los paréntesis, lo primero: $a\\cdot (b-c)$.', 'الأقواس أولًا: $a\\cdot (b-c)$.', 'Brackets first: $a\\cdot (b-c)$.'),
    'multiply-before-divide': say('Biderketak eta zatiketak, ezkerretik eskuinera.', 'Multiplicaciones y divisiones, de izquierda a derecha.', 'الضرب والقسمة من اليسار إلى اليمين.', 'Multiplications and divisions, from left to right.'),
    'power-times': say('$2^{3}=2\\cdot 2\\cdot 2$: oinarria, berretzaileak dioen adina aldiz.', '$2^{3}=2\\cdot 2\\cdot 2$: la base tantas veces como dice el exponente.', '$2^{3}=2\\cdot 2\\cdot 2$: الأساس مضروب في نفسه بعدد الأس.', '$2^{3}=2\\cdot 2\\cdot 2$: the base as many times as the exponent says.'),
    'power-hierarchy': say('Lehenik berreturak; gero biderketak.', 'Primero las potencias; después las multiplicaciones.', 'أولًا القوى ثم الضرب.', 'First powers, then multiplications.'),
    'power-ten-zeros': say('$10^{n}$: bat eta n zero.', '$10^{n}$: un 1 y n ceros.', '$10^{n}$: الرقم 1 ثم n أصفار.', '$10^{n}$: a 1 followed by n zeros.')
}

type Built = Omit<WorkedCase<NaturalsDetectiveError>, 'options'>

const calculate = (latex: string) => say(`Kalkulatu: $${latex}$`, `Calcula: $${latex}$`, `احسب: $${latex}$`, `Work out: $${latex}$`)

function build(random: Random, error: NaturalsDetectiveError): Built | null {
    switch (error) {
        case 'zero-quotient': {
            // d·(100a + c): the hundreds divide exactly, the tens are smaller than d
            const d = randomInt(random, 3, 9)
            const a = randomInt(random, 1, Math.floor(9 / d))
            const c = randomInt(random, Math.ceil(10 / d), 9)
            const quotient = 100 * a + c
            const dividend = d * quotient
            return {
                problem: say(`Egin zatiketa: $${dividend}\\div ${d}$`, `Haz la división: $${dividend}\\div ${d}$`, `أجرِ القسمة: $${dividend}\\div ${d}$`, `Do the division: $${dividend}\\div ${d}$`),
                lines: [line(LABELS.hundreds, `${d * a}\\div ${d}=${a}`), line(LABELS.rest, `${d * c}\\div ${d}=${c}`), line(LABELS.quotient, `${dividend}\\div ${d}=${10 * a + c}`)],
                wrong: 2, error, fix: `${Math.floor((d * c) / 10)}\\div ${d}=0\\ \\to\\ ${dividend}\\div ${d}=${quotient}`, right: quotient, reached: 10 * a + c
            }
        }
        case 'remainder-too-big': {
            const d = randomInt(random, 4, 9)
            const c = randomInt(random, 4, 9)
            const r = randomInt(random, 1, d - 1)
            const dividend = d * c + r
            return {
                problem: say(`Egin zatiketa eta eman hondarra: $${dividend}\\div ${d}$`, `Haz la división y da el resto: $${dividend}\\div ${d}$`, `أجرِ القسمة وأعطِ الباقي: $${dividend}\\div ${d}$`, `Do the division and give the remainder: $${dividend}\\div ${d}$`),
                lines: [line(LABELS.attempt, `${d}\\cdot ${c - 1}=${d * (c - 1)}`), line(LABELS.subtract, `${dividend}-${d * (c - 1)}=${r + d}`), line(LABELS.both, `c=${c - 1},\\ r=${r + d}`)],
                wrong: 2, error, fix: `${d}\\cdot ${c}=${d * c}\\ \\to\\ r=${dividend}-${d * c}=${r}`, right: r, reached: r + d
            }
        }
        case 'rounding-down': {
            const low = 100 * randomInt(random, 1, 9)
            const value = low + 10 * randomInt(random, 5, 9) + randomInt(random, 0, 9)
            return {
                problem: say(`Biribildu ehunekoetara: $${big(value)}$`, `Redondea a las centenas: $${big(value)}$`, `قرّب إلى المئات: $${big(value)}$`, `Round to the nearest hundred: $${big(value)}$`),
                lines: [line(LABELS.between, `${big(low)}<${big(value)}<${big(low + 100)}`), line(LABELS.tens, `${Math.floor((value % 100) / 10)}`), line(LABELS.rounded, `${big(value)}\\approx ${big(low)}`)],
                wrong: 2, error, fix: `${Math.floor((value % 100) / 10)}\\ge 5\\ \\to\\ ${big(value)}\\approx ${big(low + 100)}`, right: low + 100, reached: low
            }
        }
        case 'left-to-right': {
            const [a, b, c] = [randomInt(random, 2, 9), randomInt(random, 2, 9), randomInt(random, 2, 9)]
            const d = randomInt(random, 1, Math.min(9, a + b * c - 1))
            return {
                problem: calculate(`${a}+${b}\\cdot ${c}-${d}`),
                lines: [line(LABELS.step1, `${a + b}\\cdot ${c}-${d}`), line(LABELS.step2, `${(a + b) * c}-${d}`), line(LABELS.result, `${(a + b) * c - d}`)],
                wrong: 0, error, fix: `${a}+${b * c}-${d}=${a + b * c - d}`, right: a + b * c - d, reached: (a + b) * c - d
            }
        }
        case 'brackets-ignored': {
            const [a, c] = [randomInt(random, 2, 9), randomInt(random, 1, 6)]
            const b = randomInt(random, c + 1, 12)
            const d = randomInt(random, 1, 9)
            return {
                problem: calculate(`${a}\\cdot (${b}-${c})+${d}`),
                lines: [line(LABELS.step1, `${a * b}-${c}+${d}`), line(LABELS.step2, `${a * b - c}+${d}`), line(LABELS.result, `${a * b - c + d}`)],
                wrong: 0, error, fix: `${a}\\cdot ${b - c}+${d}=${a * (b - c) + d}`, right: a * (b - c) + d, reached: a * b - c + d
            }
        }
        case 'multiply-before-divide': {
            const [b, c, m] = [randomInt(random, 2, 6), randomInt(random, 2, 4), randomInt(random, 2, 5)]
            const a = b * c * m
            const e = randomInt(random, 2, 20)
            return {
                problem: calculate(`${e}+${a}\\div ${b}\\cdot ${c}`),
                lines: [line(LABELS.step1, `${e}+${a}\\div ${b * c}`), line(LABELS.step2, `${e}+${m}`), line(LABELS.result, `${e + m}`)],
                wrong: 0, error, fix: `${e}+${a / b}\\cdot ${c}=${e + (a / b) * c}`, right: e + (a / b) * c, reached: e + m
            }
        }
        case 'power-times': {
            const [a, n] = [randomInt(random, 2, 5), randomInt(random, 3, 4)]
            const b = randomInt(random, 1, 12)
            return {
                problem: calculate(`${a}^{${n}}+${b}`),
                lines: [line(LABELS.power, `${a}^{${n}}=${a}\\cdot ${n}`), line(LABELS.step2, `${a * n}+${b}`), line(LABELS.result, `${a * n + b}`)],
                wrong: 0, error, fix: `${a}^{${n}}=${a ** n}\\ \\to\\ ${a ** n}+${b}=${a ** n + b}`, right: a ** n + b, reached: a * n + b
            }
        }
        case 'power-hierarchy': {
            const [a, b] = [randomInt(random, 2, 5), randomInt(random, 2, 6)]
            const c = randomInt(random, 1, 20)
            return {
                problem: calculate(`${c}+${a}\\cdot ${b}^{2}`),
                lines: [line(LABELS.step1, `${c}+${a * b}^{2}`), line(LABELS.step2, `${c}+${(a * b) ** 2}`), line(LABELS.result, `${c + (a * b) ** 2}`)],
                wrong: 0, error, fix: `${b}^{2}=${b * b}\\ \\to\\ ${c}+${a}\\cdot ${b * b}=${c + a * b * b}`, right: c + a * b * b, reached: c + (a * b) ** 2
            }
        }
        case 'power-ten-zeros': {
            const [a, n] = [randomInt(random, 2, 9), randomInt(random, 3, 5)]
            return {
                problem: calculate(`${a}\\cdot 10^{${n}}`),
                lines: [line(LABELS.power, `10^{${n}}=${big(10 ** (n - 1))}`), line(LABELS.step2, `${a}\\cdot ${big(10 ** (n - 1))}`), line(LABELS.result, big(a * 10 ** (n - 1)))],
                wrong: 0, error, fix: `10^{${n}}=${big(10 ** n)}\\ \\to\\ ${a}\\cdot ${big(10 ** n)}=${big(a * 10 ** n)}`, right: a * 10 ** n, reached: a * 10 ** (n - 1)
            }
        }
    }
}

export const createNaturalsDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, naturalsDetectiveLevels[levelIndex], NATURALS_DETECTIVE_CASES, build)
