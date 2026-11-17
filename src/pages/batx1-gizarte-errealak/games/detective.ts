import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J3 · Errealen detektibea (Detective de los reales, Gizarte Zientziak): a
   worked calculation of three lines with one wrong line, the mistakes of
   this unit. Level 1, sets and the line: the endpoint of «<» counted, one
   solution of |x − a| = r forgotten, |a + b| taken as |a| + |b| and the
   radius taken as the whole length. Level 2, roots and logarithms: the
   index and the exponent swapped, the root of a sum, the logarithm of a
   sum and the digits taken as the whole-number part. Level 3, errors and
   scientific notation: the relative error upside down, the zeros on the
   left counted, the exponent moved the wrong way and the exponents
   multiplied.
   ========================================================================== */

export type GizRealsDetectiveError =
    | 'strict-endpoint'
    | 'abs-one-side'
    | 'abs-sum'
    | 'radius-length'
    | 'index-upside-down'
    | 'root-of-sum'
    | 'log-of-sum'
    | 'digits-whole-part'
    | 'relative-upside-down'
    | 'left-zeros'
    | 'comma-exponent'
    | 'exponents-multiplied'

export const gizRealsDetectiveLevels: GizRealsDetectiveError[][] = [
    ['strict-endpoint', 'abs-one-side', 'abs-sum', 'radius-length'],
    ['index-upside-down', 'root-of-sum', 'log-of-sum', 'digits-whole-part'],
    ['relative-upside-down', 'left-zeros', 'comma-exponent', 'exponents-multiplied']
]

export const GIZ_REALS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
/** A number in LaTeX, with the decimal comma */
const tex = (value: number) => String(Math.round(value * 10000) / 10000).replace('.', '{,}')
/** x − a written well: x − 3, x + 2 or x */
const xMinus = (a: number) => (a === 0 ? 'x' : a > 0 ? `x-${a}` : `x+${-a}`)
const LABELS = {
    equation: say('Ekuazioa', 'Ecuación', 'المعادلة', 'Equation'),
    solve: say('Askatu', 'Despeja', 'حلّ', 'Solve'),
    answer: say('Erantzuna', 'Respuesta', 'الجواب', 'Answer'),
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    values: say('Balioak', 'Valores', 'القيم', 'Values'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    centre: say('Erdigunea', 'Centro', 'المركز', 'Centre'),
    radius: say('Erradioa', 'Radio', 'نصف القطر', 'Radius'),
    count: say('Zenbatu', 'Cuenta', 'عُدّ', 'Count'),
    power: say('Berretura', 'Potencia', 'القوة', 'Power'),
    mantissa: say('Mantisak', 'Mantisas', 'الأجزاء العشرية', 'Mantissas'),
    exponent: say('Berretzaileak', 'Exponentes', 'الأسس', 'Exponents')
}

export const gizRealsDetectiveNames: Record<GizRealsDetectiveError, LocalizedText> = {
    'strict-endpoint': say('$<$ ikurraren muturra zenbatu du', 'Contó el extremo del signo $<$', 'عدّ طرف الرمز $<$', 'Counted the endpoint of the sign $<$'),
    'abs-one-side': say('Soluzio bakarra hartu du; bi daude', 'Tomó una sola solución; hay dos', 'أخذ حلًّا واحدًا، والحلّان اثنان', 'Took only one solution; there are two'),
    'abs-sum': say('$|a+b|$ eta $|a|+|b|$ berdintzat hartu ditu', 'Tomó $|a+b|$ como $|a|+|b|$', 'اعتبر $|a+b|$ مساويًا $|a|+|b|$', 'Took $|a+b|$ as $|a|+|b|$'),
    'radius-length': say('Erradiotzat tartearen luzera osoa hartu du', 'Tomó como radio la longitud entera del intervalo', 'أخذ طول الفترة كله نصفَ قطر', 'Took the whole length of the interval as the radius'),
    'index-upside-down': say('Indizea eta berretzailea trukatu ditu', 'Cambió el índice por el exponente', 'بدّل الدليل والأس', 'Swapped the index and the exponent'),
    'root-of-sum': say('Batura baten erroa erroen batura dela pentsatu du', 'Pensó que la raíz de una suma es la suma de las raíces', 'ظن أن جذر المجموع مجموع الجذرين', 'Thought the root of a sum is the sum of the roots'),
    'log-of-sum': say('Batura baten logaritmoa logaritmoen batura dela pentsatu du', 'Pensó que el logaritmo de una suma es la suma de logaritmos', 'ظن أن لوغاريتم المجموع مجموع اللوغاريتمات', 'Thought the logarithm of a sum is the sum of the logarithms'),
    'digits-whole-part': say('Zifra kopurutzat zati osoa hartu du', 'Tomó la parte entera como número de cifras', 'اعتبر الجزء الصحيح عدد الأرقام', 'Took the whole-number part as the number of digits'),
    'relative-upside-down': say('Errore erlatiboa alderantziz zatitu du', 'Dividió al revés el error relativo', 'قسم الخطأ النسبي بالعكس', 'Divided the relative error upside down'),
    'left-zeros': say('Ezkerreko zeroak zifra esanguratsutzat hartu ditu', 'Contó los ceros de la izquierda como significativos', 'عدّ الأصفار على اليسار أرقامًا معنوية', 'Counted the zeros on the left as significant'),
    'comma-exponent': say('Koma ezkerrera eraman eta berretzailea jaitsi du', 'Movió la coma a la izquierda y bajó el exponente', 'حرّك الفاصلة إلى اليسار وأنقص الأس', 'Moved the point left and lowered the exponent'),
    'exponents-multiplied': say('Berretzaileak biderkatu ditu, batu beharrean', 'Multiplicó los exponentes en vez de sumarlos', 'ضرب الأسس بدل أن يجمعها', 'Multiplied the exponents instead of adding them')
}

export const gizRealsDetectiveTips: Record<GizRealsDetectiveError, LocalizedText> = {
    'strict-endpoint': say('$a<x\\le b$: $a$ kanpoan dago, $b$ barruan; $b-a$ elementu.', '$a<x\\le b$: el $a$ queda fuera y el $b$ dentro; son $b-a$ elementos.', '$a<x\\le b$: ‏$a$ خارج و$b$ داخل، فالعناصر $b-a$.', '$a<x\\le b$: $a$ is out and $b$ is in; there are $b-a$ elements.'),
    'abs-one-side': say('$|x-a|=r$: $x=a+r$ edo $x=a-r$.', '$|x-a|=r$: $x=a+r$ o $x=a-r$.', '$|x-a|=r$: ‏$x=a+r$ أو $x=a-r$.', '$|x-a|=r$: $x=a+r$ or $x=a-r$.'),
    'abs-sum': say('Zeinu desberdinekin, $|a+b|<|a|+|b|$: $|-7+3|=4$.', 'Con signos distintos, $|a+b|<|a|+|b|$: $|-7+3|=4$.', 'مع إشارتين مختلفتين $|a+b|<|a|+|b|$: ‏$|-7+3|=4$.', 'With different signs, $|a+b|<|a|+|b|$: $|-7+3|=4$.'),
    'radius-length': say('Erradioa luzeraren erdia da: $r=\\frac{q-p}{2}$.', 'El radio es la mitad de la longitud: $r=\\frac{q-p}{2}$.', 'نصف القطر نصف الطول: $r=\\frac{q-p}{2}$.', 'The radius is half the length: $r=\\frac{q-p}{2}$.'),
    'index-upside-down': say('$\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$: indizea behean.', '$\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$: el índice abajo.', '$\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$: الدليل في المقام.', '$\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$: the index goes below.'),
    'root-of-sum': say('$\\sqrt{a^2+b^2}\\ne a+b$: $\\sqrt{9+16}=5$.', '$\\sqrt{a^2+b^2}\\ne a+b$: $\\sqrt{9+16}=5$.', '$\\sqrt{a^2+b^2}\\ne a+b$: ‏$\\sqrt{9+16}=5$.', '$\\sqrt{a^2+b^2}\\ne a+b$: $\\sqrt{9+16}=5$.'),
    'log-of-sum': say('$\\log(a\\cdot b)=\\log a+\\log b$; baturarentzat ez dago araurik: lehenik batu.', '$\\log(a\\cdot b)=\\log a+\\log b$; para la suma no hay regla: suma primero.', '$\\log(a\\cdot b)=\\log a+\\log b$، ولا قاعدة للمجموع: اجمع أولًا.', '$\\log(a\\cdot b)=\\log a+\\log b$; there is no rule for a sum: add first.'),
    'digits-whole-part': say('Zifrak = zati osoa + 1: $10^{5}$ zenbakiak sei zifra ditu.', 'Cifras = parte entera + 1: $10^{5}$ tiene seis cifras.', 'عدد الأرقام = الجزء الصحيح + 1: ‏$10^{5}$ فيه ستة أرقام.', 'Digits = whole-number part + 1: $10^{5}$ has six digits.'),
    'relative-upside-down': say('$E_r=\\frac{E_a}{x}$: errorea gainean, balioa behean.', '$E_r=\\frac{E_a}{x}$: el error arriba, el valor abajo.', '$E_r=\\frac{E_a}{x}$: الخطأ في البسط والقيمة في المقام.', '$E_r=\\frac{E_a}{x}$: the error on top, the value below.'),
    'left-zeros': say('Lehen zifra ez-nulutik hasten da zenbatzen.', 'Se cuenta desde la primera cifra distinta de cero.', 'نعدّ بدءًا من أول رقم غير صفري.', 'You count from the first non-zero figure.'),
    'comma-exponent': say('Koma ezkerrera: mantisa txikiagoa, berretzailea handiagoa.', 'Coma a la izquierda: mantisa menor, exponente mayor.', 'الفاصلة إلى اليسار: جزء عشري أصغر وأس أكبر.', 'Point to the left: smaller mantissa, bigger exponent.'),
    'exponents-multiplied': say('$10^{p}\\cdot 10^{q}=10^{p+q}$: berretzaileak batu.', '$10^{p}\\cdot 10^{q}=10^{p+q}$: los exponentes se suman.', '$10^{p}\\cdot 10^{q}=10^{p+q}$: تُجمع الأسس.', '$10^{p}\\cdot 10^{q}=10^{p+q}$: the exponents add.')
}

type Built = Omit<WorkedCase<GizRealsDetectiveError>, 'options'>

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]]

function build(random: Random, error: GizRealsDetectiveError): Built | null {
    switch (error) {
        case 'strict-endpoint': {
            const a = randomInt(random, -5, 2)
            const b = a + randomInt(random, 3, 7)
            return {
                problem: say(`Zenbat elementu ditu $\\{x\\in\\mathbb{Z}\\mid ${a}<x\\le ${b}\\}$ multzoak?`, `¿Cuántos elementos tiene $\\{x\\in\\mathbb{Z}\\mid ${a}<x\\le ${b}\\}$?`, `كم عنصرًا في $\\{x\\in\\mathbb{Z}\\mid ${a}<x\\le ${b}\\}$؟`, `How many elements does $\\{x\\in\\mathbb{Z}\\mid ${a}<x\\le ${b}\\}$ have?`),
                lines: [line(LABELS.count, `${b}-(${a})+1`), line(LABELS.values, `${b - a}+1`), line(LABELS.result, `${b - a + 1}`)],
                wrong: 0, error, fix: `\\{${a + 1},\\ldots,${b}\\}\\ \\to\\ ${b}-(${a})=${b - a}`, right: b - a, reached: b - a + 1
            }
        }
        case 'abs-one-side': {
            const a = randomInt(random, -4, 5)
            const r = randomInt(random, 2, 7)
            return {
                problem: say(`Aurkitu $|${xMinus(a)}|=${r}$ ekuazioaren soluzio txikiena.`, `Halla la menor solución de $|${xMinus(a)}|=${r}$.`, `أوجد أصغر حلّ للمعادلة $|${xMinus(a)}|=${r}$.`, `Find the smallest solution of $|${xMinus(a)}|=${r}$.`),
                lines: [line(LABELS.equation, `${xMinus(a)}=${r}`), line(LABELS.solve, `x=${a + r}`), line(LABELS.answer, `${a + r}`)],
                wrong: 0, error, fix: `${xMinus(a)}=\\pm ${r}\\ \\to\\ x=${a - r}`, right: a - r, reached: a + r
            }
        }
        case 'abs-sum': {
            const p = randomInt(random, 5, 12)
            const q = randomInt(random, 2, p - 1)
            return {
                problem: say(`Kalkulatu $|-${p}+${q}|$.`, `Calcula $|-${p}+${q}|$.`, `احسب $|-${p}+${q}|$.`, `Work out $|-${p}+${q}|$.`),
                lines: [line(LABELS.rule, `|-${p}|+|${q}|`), line(LABELS.values, `${p}+${q}`), line(LABELS.result, `${p + q}`)],
                wrong: 0, error, fix: `|-${p}+${q}|=|-${p - q}|=${p - q}`, right: p - q, reached: p + q
            }
        }
        case 'radius-length': {
            const centre = randomInt(random, -4, 5)
            const r = randomInt(random, 2, 5)
            const [p, q] = [centre - r, centre + r]
            return {
                problem: say(`Idatzi $(${p},${q})$ ingurune gisa: zein da erradioa?`, `Escribe $(${p},${q})$ como entorno: ¿cuál es el radio?`, `اكتب $(${p},${q})$ على صورة جوار: ما نصف القطر؟`, `Write $(${p},${q})$ as a neighbourhood: what is the radius?`),
                lines: [line(LABELS.centre, `\\frac{${p}+(${q})}{2}=${centre}`), line(LABELS.radius, `${q}-(${p})=${2 * r}`), line(LABELS.answer, `E(${centre},${2 * r})`)],
                wrong: 1, error, fix: `r=\\frac{${q}-(${p})}{2}=${r}`, right: r, reached: 2 * r
            }
        }
        case 'index-upside-down': {
            const n = randomInt(random, 3, 7)
            const m = randomInt(random, 2, 6)
            if (m === n || gcd(m, n) !== 1) return null
            return {
                problem: say(`Idatzi $\\sqrt[${n}]{a^{${m}}}$ berretura gisa: zein da berretzailea?`, `Escribe $\\sqrt[${n}]{a^{${m}}}$ como potencia: ¿cuál es el exponente?`, `اكتب $\\sqrt[${n}]{a^{${m}}}$ على صورة قوة: ما الأس؟`, `Write $\\sqrt[${n}]{a^{${m}}}$ as a power: what is the exponent?`),
                lines: [line(LABELS.power, `\\sqrt[${n}]{a^{${m}}}=a^{\\frac{${n}}{${m}}}`), line(LABELS.values, `\\frac{${n}}{${m}}=${tex(n / m)}`), line(LABELS.answer, `\\frac{${n}}{${m}}`)],
                wrong: 0, error, fix: `\\sqrt[${n}]{a^{${m}}}=a^{\\frac{${m}}{${n}}}`, right: m / n, reached: n / m
            }
        }
        case 'root-of-sum': {
            const [p, q, r] = pick(random, TRIPLES)
            return {
                problem: say(`Kalkulatu $\\sqrt{${p}^{2}+${q}^{2}}$.`, `Calcula $\\sqrt{${p}^{2}+${q}^{2}}$.`, `احسب $\\sqrt{${p}^{2}+${q}^{2}}$.`, `Work out $\\sqrt{${p}^{2}+${q}^{2}}$.`),
                lines: [line(LABELS.rule, `\\sqrt{${p}^{2}}+\\sqrt{${q}^{2}}`), line(LABELS.values, `${p}+${q}`), line(LABELS.result, `${p + q}`)],
                wrong: 0, error, fix: `\\sqrt{${p * p}+${q * q}}=\\sqrt{${r * r}}=${r}`, right: r, reached: p + q
            }
        }
        case 'log-of-sum': {
            const p = randomInt(random, 2, 6)
            return {
                problem: say(`Kalkulatu $\\log_2 (2^{${p}}+2^{${p}})$.`, `Calcula $\\log_2 (2^{${p}}+2^{${p}})$.`, `احسب $\\log_2 (2^{${p}}+2^{${p}})$.`, `Work out $\\log_2 (2^{${p}}+2^{${p}})$.`),
                lines: [line(LABELS.rule, `\\log_2 2^{${p}}+\\log_2 2^{${p}}`), line(LABELS.values, `${p}+${p}`), line(LABELS.result, `${2 * p}`)],
                wrong: 0, error, fix: `2^{${p}}+2^{${p}}=2^{${p + 1}}\\ \\to\\ \\log_2 2^{${p + 1}}=${p + 1}`, right: p + 1, reached: 2 * p
            }
        }
        case 'digits-whole-part': {
            const n = randomInt(random, 12, 40)
            const log = n * 0.301
            const part = Math.floor(log)
            // Far from a whole number, so 0,301 for log 2 gives the right digits
            if (log - part < 0.05 || log - part > 0.95) return null
            return {
                problem: say(`$\\log 2\\approx 0{,}301$ dela jakinda, zenbat zifra ditu $2^{${n}}$ zenbakiak?`, `Sabiendo que $\\log 2\\approx 0{,}301$, ¿cuántas cifras tiene $2^{${n}}$?`, `إذا علمت أن $\\log 2\\approx 0{,}301$ فكم رقمًا في $2^{${n}}$؟`, `Given that $\\log 2\\approx 0{,}301$, how many digits does $2^{${n}}$ have?`),
                lines: [line(LABELS.rule, `\\log 2^{${n}}=${n}\\cdot\\log 2`), line(LABELS.values, `${n}\\cdot 0{,}301=${tex(log)}`), line(LABELS.answer, `${part}`)],
                wrong: 2, error, fix: `${part}+1=${part + 1}`, right: part + 1, reached: part
            }
        }
        case 'relative-upside-down': {
            const value = pick(random, [200, 250, 400, 500, 800])
            const err = pick(random, [2, 4, 5, 10].filter((item) => value % item === 0))
            return {
                problem: say(`${value} euroko prezio batean ${err} euroko errorea dago. Zein da errore erlatiboa, ehunekotan?`, `Un precio de ${value} euros tiene un error de ${err} euros. ¿Cuál es el error relativo, en porcentaje?`, `في سعر قدره ${value} يورو خطأ قدره ${err} يورو. ما الخطأ النسبي بالنسبة المئوية؟`, `A price of ${value} euros has an error of ${err} euros. What is the relative error, as a percentage?`),
                lines: [line(LABELS.rule, `E_r=\\frac{${value}}{${err}}`), line(LABELS.values, `${tex(value / err)}`), line(LABELS.result, `${tex((value / err) * 100)}\\,\\%`)],
                wrong: 0, error, fix: `E_r=\\frac{${err}}{${value}}=${tex(err / value)}=${tex((err / value) * 100)}\\,\\%`, right: (err / value) * 100, reached: (value / err) * 100
            }
        }
        case 'left-zeros': {
            const zeros = randomInt(random, 1, 3)
            const digits = String(randomInt(random, 11, 99)) + (random() < 0.5 ? String(randomInt(random, 1, 9)) : '')
            if (digits.endsWith('0')) return null
            const number = `0{,}${'0'.repeat(zeros)}${digits}`
            const all = zeros + digits.length
            return {
                problem: say(`Zenbat zifra esanguratsu ditu $${number}$ zenbakiak?`, `¿Cuántas cifras significativas tiene $${number}$?`, `كم رقمًا معنويًا في $${number}$؟`, `How many significant figures does $${number}$ have?`),
                lines: [line(LABELS.count, `${'0,'.repeat(zeros)}${digits.split('').join(',')}`), line(LABELS.values, `${zeros}+${digits.length}`), line(LABELS.result, `${all}`)],
                wrong: 0, error, fix: `${digits.split('').join(',')}\\ \\to\\ ${digits.length}`, right: digits.length, reached: all
            }
        }
        case 'comma-exponent': {
            const digits = randomInt(random, 11, 99)
            if (digits % 10 === 0) return null
            const n = randomInt(random, 3, 9)
            const mantissa = tex(digits / 10)
            return {
                problem: say(`Idatzi $${digits}\\cdot 10^{${n}}$ idazkera zientifikoan.`, `Escribe $${digits}\\cdot 10^{${n}}$ en notación científica.`, `اكتب $${digits}\\cdot 10^{${n}}$ بالترميز العلمي.`, `Write $${digits}\\cdot 10^{${n}}$ in scientific notation.`),
                lines: [line(LABELS.mantissa, `${digits}\\ \\to\\ ${mantissa}`), line(LABELS.exponent, `${n}-1=${n - 1}`), line(LABELS.result, `${mantissa}\\cdot 10^{${n - 1}}`)],
                wrong: 1, error, fix: `${n}+1=${n + 1}\\ \\to\\ ${mantissa}\\cdot 10^{${n + 1}}`, right: n + 1, reached: n - 1
            }
        }
        case 'exponents-multiplied': {
            const a = randomInt(random, 2, 4)
            const b = randomInt(random, 2, 4)
            const p = randomInt(random, 2, 6)
            const q = randomInt(random, 3, 7)
            if (p * q === p + q) return null
            return {
                problem: say(`Kalkulatu $(${a}\\cdot 10^{${p}})\\cdot(${b}\\cdot 10^{${q}})$.`, `Calcula $(${a}\\cdot 10^{${p}})\\cdot(${b}\\cdot 10^{${q}})$.`, `احسب $(${a}\\cdot 10^{${p}})\\cdot(${b}\\cdot 10^{${q}})$.`, `Work out $(${a}\\cdot 10^{${p}})\\cdot(${b}\\cdot 10^{${q}})$.`),
                lines: [line(LABELS.mantissa, `${a}\\cdot ${b}=${a * b}`), line(LABELS.exponent, `10^{${p}}\\cdot 10^{${q}}=10^{${p * q}}`), line(LABELS.result, `${a * b}\\cdot 10^{${p * q}}`)],
                wrong: 1, error, fix: `10^{${p}+${q}}=10^{${p + q}}\\ \\to\\ ${a * b}\\cdot 10^{${p + q}}`, right: p + q, reached: p * q
            }
        }
    }
}

export const createGizRealsDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, gizRealsDetectiveLevels[levelIndex], GIZ_REALS_DETECTIVE_CASES, build)
