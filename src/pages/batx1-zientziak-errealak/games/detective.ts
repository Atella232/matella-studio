import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { binomial, xMinus } from './coefficient.ts'

/* ==========================================================================
   J4 · Errealen detektibea (Detective de los reales): a worked calculation
   of three lines with one wrong line, the mistakes of this unit. Level 1:
   one solution of |x − a| = r forgotten, |a + b| taken as |a| + |b|, a
   distance worked without the sign and the radius taken as the whole
   length; level 2: the relative error upside down, the zeros on the left
   counted, the root of a sum, the conjugate that gives a sum; level 3: the
   logarithm of a sum, of a power, the square of a binomial without its
   middle term and the term k + 1 read as b^(k+1).
   ========================================================================== */

export type BachRealsDetectiveError =
    | 'abs-one-side'
    | 'abs-sum'
    | 'distance-sign'
    | 'radius-length'
    | 'relative-upside-down'
    | 'left-zeros'
    | 'root-of-sum'
    | 'conjugate-plus'
    | 'log-of-sum'
    | 'log-power'
    | 'square-no-middle'
    | 'term-index'

export const bachRealsDetectiveLevels: BachRealsDetectiveError[][] = [
    ['abs-one-side', 'abs-sum', 'distance-sign', 'radius-length'],
    ['relative-upside-down', 'left-zeros', 'root-of-sum', 'conjugate-plus'],
    ['log-of-sum', 'log-power', 'square-no-middle', 'term-index']
]

export const BACH_REALS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
/** A number in LaTeX, with the decimal comma */
const tex = (value: number) => String(Math.round(value * 10000) / 10000).replace('.', '{,}')
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
    multiply: say('Biderkatu', 'Multiplica', 'اضرب', 'Multiply'),
    term: say('Gaia', 'Término', 'الحد', 'Term')
}

export const bachRealsDetectiveNames: Record<BachRealsDetectiveError, LocalizedText> = {
    'abs-one-side': say('Soluzio bakarra hartu du; bi daude', 'Tomó una sola solución; hay dos', 'أخذ حلًّا واحدًا، والحلّان اثنان', 'Took only one solution; there are two'),
    'abs-sum': say('$|a+b|$ eta $|a|+|b|$ berdintzat hartu ditu', 'Tomó $|a+b|$ como $|a|+|b|$', 'اعتبر $|a+b|$ مساويًا $|a|+|b|$', 'Took $|a+b|$ as $|a|+|b|$'),
    'distance-sign': say('Zeinua kendu du, kenketa egin aurretik', 'Quitó el signo antes de restar', 'حذف الإشارة قبل الطرح', 'Dropped the sign before subtracting'),
    'radius-length': say('Erradiotzat tartearen luzera osoa hartu du', 'Tomó como radio la longitud entera del intervalo', 'أخذ طول الفترة كله نصفَ قطر', 'Took the whole length of the interval as the radius'),
    'relative-upside-down': say('Errore erlatiboa alderantziz zatitu du', 'Dividió al revés el error relativo', 'قسم الخطأ النسبي بالعكس', 'Divided the relative error upside down'),
    'left-zeros': say('Ezkerreko zeroak zifra esanguratsutzat hartu ditu', 'Contó los ceros de la izquierda como significativos', 'عدّ الأصفار على اليسار أرقامًا معنوية', 'Counted the zeros on the left as significant'),
    'root-of-sum': say('Batura baten erroa erroen batura dela pentsatu du', 'Pensó que la raíz de una suma es la suma de las raíces', 'ظن أن جذر المجموع مجموع الجذرين', 'Thought the root of a sum is the sum of the roots'),
    'conjugate-plus': say('Konjokatuekin, karratuak batu ditu', 'Con el conjugado, sumó los cuadrados', 'مع المرافق جمع المربعين', 'With the conjugate, added the squares'),
    'log-of-sum': say('Batura baten logaritmoa logaritmoen batura dela pentsatu du', 'Pensó que el logaritmo de una suma es la suma de logaritmos', 'ظن أن لوغاريتم المجموع مجموع اللوغاريتمات', 'Thought the logarithm of a sum is the sum of the logarithms'),
    'log-power': say('Berretzailea logaritmoaren berretzaile utzi du', 'Dejó el exponente elevando al logaritmo', 'ترك الأس قوةً للوغاريتم', 'Left the exponent as a power of the logarithm'),
    'square-no-middle': say('Erdiko gaia ahaztu du karratuan', 'Olvidó el término del medio del cuadrado', 'نسي الحد الأوسط في المربع', 'Forgot the middle term of the square'),
    'term-index': say('$k+1$ gaian $b^{k+1}$ jarri du', 'En el término $k+1$ puso $b^{k+1}$', 'وضع $b^{k+1}$ في الحد ذي الرتبة $k+1$', 'Put $b^{k+1}$ in term $k+1$')
}

export const bachRealsDetectiveTips: Record<BachRealsDetectiveError, LocalizedText> = {
    'abs-one-side': say('$|x-a|=r$: $x=a+r$ edo $x=a-r$.', '$|x-a|=r$: $x=a+r$ o $x=a-r$.', '$|x-a|=r$: ‏$x=a+r$ أو $x=a-r$.', '$|x-a|=r$: $x=a+r$ or $x=a-r$.'),
    'abs-sum': say('Zeinu desberdinekin, $|a+b|<|a|+|b|$: $|-7+3|=4$.', 'Con signos distintos, $|a+b|<|a|+|b|$: $|-7+3|=4$.', 'مع إشارتين مختلفتين $|a+b|<|a|+|b|$: ‏$|-7+3|=4$.', 'With different signs, $|a+b|<|a|+|b|$: $|-7+3|=4$.'),
    'distance-sign': say('Distantzia $|b-a|$ da: lehenik kendu, gero zeinua kendu.', 'La distancia es $|b-a|$: primero resta, después quita el signo.', 'المسافة $|b-a|$: اطرح أولًا ثم احذف الإشارة.', 'The distance is $|b-a|$: subtract first, then drop the sign.'),
    'radius-length': say('Erradioa luzeraren erdia da: $r=\\frac{q-p}{2}$.', 'El radio es la mitad de la longitud: $r=\\frac{q-p}{2}$.', 'نصف القطر نصف الطول: $r=\\frac{q-p}{2}$.', 'The radius is half the length: $r=\\frac{q-p}{2}$.'),
    'relative-upside-down': say('$E_r=\\frac{E_a}{x}$: errorea neurriaren gainean.', '$E_r=\\frac{E_a}{x}$: el error arriba, la medida abajo.', '$E_r=\\frac{E_a}{x}$: الخطأ في البسط والقياس في المقام.', '$E_r=\\frac{E_a}{x}$: the error on top, the measurement below.'),
    'left-zeros': say('Lehen zifra ez-nulutik hasten da zenbatzen.', 'Se cuenta desde la primera cifra distinta de cero.', 'نعدّ بدءًا من أول رقم غير صفري.', 'You count from the first non-zero figure.'),
    'root-of-sum': say('$\\sqrt{a^2+b^2}\\ne a+b$: $\\sqrt{9+16}=5$.', '$\\sqrt{a^2+b^2}\\ne a+b$: $\\sqrt{9+16}=5$.', '$\\sqrt{a^2+b^2}\\ne a+b$: ‏$\\sqrt{9+16}=5$.', '$\\sqrt{a^2+b^2}\\ne a+b$: $\\sqrt{9+16}=5$.'),
    'conjugate-plus': say('$(\\sqrt{a}-\\sqrt{b})(\\sqrt{a}+\\sqrt{b})=a-b$.', '$(\\sqrt{a}-\\sqrt{b})(\\sqrt{a}+\\sqrt{b})=a-b$.', '$(\\sqrt{a}-\\sqrt{b})(\\sqrt{a}+\\sqrt{b})=a-b$.', '$(\\sqrt{a}-\\sqrt{b})(\\sqrt{a}+\\sqrt{b})=a-b$.'),
    'log-of-sum': say('$\\log(a\\cdot b)=\\log a+\\log b$; baturarentzat ez dago araurik.', '$\\log(a\\cdot b)=\\log a+\\log b$; para la suma no hay regla.', '$\\log(a\\cdot b)=\\log a+\\log b$، ولا قاعدة للمجموع.', '$\\log(a\\cdot b)=\\log a+\\log b$; there is no rule for a sum.'),
    'log-power': say('$\\log a^{n}=n\\cdot\\log a$.', '$\\log a^{n}=n\\cdot\\log a$.', '$\\log a^{n}=n\\cdot\\log a$.', '$\\log a^{n}=n\\cdot\\log a$.'),
    'square-no-middle': say('$(a+b)^2=a^2+2ab+b^2$.', '$(a+b)^2=a^2+2ab+b^2$.', '$(a+b)^2=a^2+2ab+b^2$.', '$(a+b)^2=a^2+2ab+b^2$.'),
    'term-index': say('$k+1$ gaiak $\\binom{n}{k}a^{n-k}b^{k}$ du: hirugarrenean, $k=2$.', 'El término $k+1$ lleva $\\binom{n}{k}a^{n-k}b^{k}$: en el tercero, $k=2$.', 'الحد ذو الرتبة $k+1$ فيه $\\binom{n}{k}a^{n-k}b^{k}$: في الثالث $k=2$.', 'Term $k+1$ has $\\binom{n}{k}a^{n-k}b^{k}$: in the third one, $k=2$.')
}

type Built = Omit<WorkedCase<BachRealsDetectiveError>, 'options'>
const ORDINALS = [
    say('lehen', 'primer', 'الأول', 'first'),
    say('bigarren', 'segundo', 'الثاني', 'second'),
    say('hirugarren', 'tercer', 'الثالث', 'third'),
    say('laugarren', 'cuarto', 'الرابع', 'fourth')
]

function build(random: Random, error: BachRealsDetectiveError): Built | null {
    switch (error) {
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
        case 'distance-sign': {
            const p = randomInt(random, 2, 9)
            const q = randomInt(random, 2, 9)
            if (p === q) return null
            return {
                problem: say(`Zer distantzia dago $-${p}$ eta $${q}$ artean?`, `¿Qué distancia hay entre $-${p}$ y $${q}$?`, `ما المسافة بين $-${p}$ و$${q}$؟`, `How far apart are $-${p}$ and $${q}$?`),
                lines: [line(LABELS.rule, `${q}-${p}`), line(LABELS.values, `|${q - p}|`), line(LABELS.result, `${Math.abs(q - p)}`)],
                wrong: 0, error, fix: `|${q}-(-${p})|=${q + p}`, right: q + p, reached: Math.abs(q - p)
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
        case 'relative-upside-down': {
            const measure = pick(random, [20, 25, 40, 50, 80])
            const err = pick(random, [1, 2, 4].filter((value) => measure % value === 0))
            return {
                problem: say(`${measure} cm neurtzean ${err} cm-ko errorea egin da. Zein da errore erlatiboa, ehunekotan?`, `Al medir ${measure} cm se comete un error de ${err} cm. ¿Cuál es el error relativo, en porcentaje?`, `عند قياس ${measure} سم نخطئ بمقدار ${err} سم. ما الخطأ النسبي بالنسبة المئوية؟`, `Measuring ${measure} cm, an error of ${err} cm is made. What is the relative error, as a percentage?`),
                lines: [line(LABELS.rule, `E_r=\\frac{${measure}}{${err}}`), line(LABELS.values, `${measure / err}`), line(LABELS.result, `${measure / err}\\cdot 100\\,\\%`)],
                wrong: 0, error, fix: `E_r=\\frac{${err}}{${measure}}=${tex(err / measure)}=${tex((100 * err) / measure)}\\,\\%`, right: (100 * err) / measure, reached: (100 * measure) / err
            }
        }
        case 'left-zeros': {
            const zeros = randomInt(random, 2, 3)
            const digits = pick(random, ['47', '305', '82', '6100'])
            const number = `0{,}${'0'.repeat(zeros - 1)}${digits}`
            return {
                problem: say(`Zenbat zifra esanguratsu ditu $${number}$ zenbakiak?`, `¿Cuántas cifras significativas tiene $${number}$?`, `كم رقمًا معنويًا في $${number}$؟`, `How many significant figures does $${number}$ have?`),
                lines: [line(LABELS.count, `${'0\\,'.repeat(zeros)}${digits.split('').join('\\,')}`), line(LABELS.values, `${zeros}+${digits.length}`), line(LABELS.result, `${zeros + digits.length}`)],
                wrong: 0, error, fix: `${digits.split('').join('\\,')}\\ \\to\\ ${digits.length}`, right: digits.length, reached: zeros + digits.length
            }
        }
        case 'root-of-sum': {
            const [a, b, c] = pick(random, [[6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]] as const)
            return {
                problem: say(`Kalkulatu $\\sqrt{${a * a}+${b * b}}$.`, `Calcula $\\sqrt{${a * a}+${b * b}}$.`, `احسب $\\sqrt{${a * a}+${b * b}}$.`, `Work out $\\sqrt{${a * a}+${b * b}}$.`),
                lines: [line(LABELS.rule, `\\sqrt{${a * a}}+\\sqrt{${b * b}}`), line(LABELS.values, `${a}+${b}`), line(LABELS.result, `${a + b}`)],
                wrong: 0, error, fix: `\\sqrt{${a * a + b * b}}=${c}`, right: c, reached: a + b
            }
        }
        case 'conjugate-plus': {
            const [p, q] = pick(random, [[7, 3], [6, 2], [11, 3], [10, 6], [13, 5]] as const)
            const k = pick(random, [2, 4, 6].filter((value) => value % (p - q) === 0 || (p - q) % value === 0))
            return {
                problem: say(`Arrazionalizatu $\\frac{${k}}{\\sqrt{${p}}-\\sqrt{${q}}}$: zein da izendatzailea?`, `Racionaliza $\\frac{${k}}{\\sqrt{${p}}-\\sqrt{${q}}}$: ¿cuál es el denominador?`, `أنطق مقام $\\frac{${k}}{\\sqrt{${p}}-\\sqrt{${q}}}$: ما المقام؟`, `Rationalise $\\frac{${k}}{\\sqrt{${p}}-\\sqrt{${q}}}$: what is the denominator?`),
                lines: [line(LABELS.multiply, `\\frac{${k}(\\sqrt{${p}}+\\sqrt{${q}})}{(\\sqrt{${p}}-\\sqrt{${q}})(\\sqrt{${p}}+\\sqrt{${q}})}`), line(LABELS.values, `${p}+${q}`), line(LABELS.result, `${p + q}`)],
                wrong: 1, error, fix: `(\\sqrt{${p}})^2-(\\sqrt{${q}})^2=${p}-${q}=${p - q}`, right: p - q, reached: p + q
            }
        }
        case 'log-of-sum': {
            const m = randomInt(random, 1, 4)
            const value = 2 ** m
            return {
                problem: say(`Kalkulatu $\\log_2(${value}+${value})$.`, `Calcula $\\log_2(${value}+${value})$.`, `احسب $\\log_2(${value}+${value})$.`, `Work out $\\log_2(${value}+${value})$.`),
                lines: [line(LABELS.rule, `\\log_2 ${value}+\\log_2 ${value}`), line(LABELS.values, `${m}+${m}`), line(LABELS.result, `${2 * m}`)],
                wrong: 0, error, fix: `\\log_2 ${2 * value}=${m + 1}`, right: m + 1, reached: 2 * m
            }
        }
        case 'log-power': {
            const base = pick(random, [2, 3])
            const e = randomInt(random, 2, base === 2 ? 4 : 3)
            const n = randomInt(random, 2, 3)
            if (e * n === e ** n) return null
            return {
                problem: say(`Kalkulatu $\\log_${base} ${base ** e}^{${n}}$.`, `Calcula $\\log_${base} ${base ** e}^{${n}}$.`, `احسب $\\log_${base} ${base ** e}^{${n}}$.`, `Work out $\\log_${base} ${base ** e}^{${n}}$.`),
                lines: [line(LABELS.rule, `(\\log_${base} ${base ** e})^{${n}}`), line(LABELS.values, `${e}^{${n}}`), line(LABELS.result, `${e ** n}`)],
                wrong: 0, error, fix: `${n}\\cdot\\log_${base} ${base ** e}=${n}\\cdot ${e}=${n * e}`, right: n * e, reached: e ** n
            }
        }
        case 'square-no-middle': {
            const a = randomInt(random, 2, 6)
            const b = randomInt(random, 2, 7)
            return {
                problem: say(`Kalkulatu $(${a}+${b})^2$ garatuz.`, `Calcula $(${a}+${b})^2$ desarrollando.`, `احسب $(${a}+${b})^2$ بالنشر.`, `Work out $(${a}+${b})^2$ by expanding.`),
                lines: [line(LABELS.rule, `${a}^2+${b}^2`), line(LABELS.values, `${a * a}+${b * b}`), line(LABELS.result, `${a * a + b * b}`)],
                wrong: 0, error, fix: `${a}^2+2\\cdot ${a}\\cdot ${b}+${b}^2=${(a + b) ** 2}`, right: (a + b) ** 2, reached: a * a + b * b
            }
        }
        case 'term-index': {
            const n = randomInt(random, 4, 6)
            const b = pick(random, [2, 3])
            const place = randomInt(random, 2, 4)
            const k = place - 1
            const right = binomial(n, k) * b ** k
            const reached = binomial(n, place) * b ** place
            if (place > n || right === reached) return null
            return {
                problem: say(`Zein da $(x+${b})^{${n}}$ garapenaren ${ORDINALS[place - 1].eu} gaiaren koefizientea?`, `¿Cuál es el coeficiente del ${ORDINALS[place - 1].es} término de $(x+${b})^{${n}}$?`, `ما معامل الحد ${ORDINALS[place - 1].ar} في نشر $(x+${b})^{${n}}$؟`, `What is the coefficient of the ${ORDINALS[place - 1].en} term of $(x+${b})^{${n}}$?`),
                lines: [line(LABELS.term, `k=${place}`), line(LABELS.values, `\\binom{${n}}{${place}}\\cdot ${b}^{${place}}`), line(LABELS.result, `${reached}`)],
                wrong: 0, error, fix: `k=${k}\\ \\to\\ \\binom{${n}}{${k}}\\cdot ${b}^{${k}}=${right}`, right, reached
            }
        }
    }
}

export const createBachRealsDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, bachRealsDetectiveLevels[levelIndex], BACH_REALS_DETECTIVE_CASES, build)
