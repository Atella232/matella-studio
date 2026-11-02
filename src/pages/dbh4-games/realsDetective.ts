import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../features/unit-v2/games/workedDetective.ts'
import { fraction, toLatex } from '../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki errealen detektibea (4. DBH, applied and academic): a worked
   calculation of three lines with one wrong line. Both tracks start with
   decimals and approximations (the generatrix over 10s instead of 9s, 99
   instead of 90 for a mixed decimal, truncating when asked to round, a
   relative error left as a decimal). The academic track goes on with
   percentages and interest; the applied one with radicals.
   ========================================================================== */

export type RealsDetectiveError =
    | 'pure-over-ten'
    | 'mixed-over-nines'
    | 'truncate-not-round'
    | 'relative-not-percent'
    | 'chained-added'
    | 'initial-by-subtracting'
    | 'change-over-final'
    | 'points-as-percent'
    | 'compound-as-simple'
    | 'rate-not-decimal'
    | 'monthly-rate'
    | 'interest-as-total'
    | 'root-of-sum'
    | 'unlike-radicals-added'
    | 'radicands-added'
    | 'product-adds-radicands'
    | 'factor-out-without-root'
    | 'coefficient-not-squared'
    | 'coefficient-inside'
    | 'root-of-negative-square'

export type RealsTrack = 'applied' | 'academic'

export const realsDetectiveLevels: Record<RealsTrack, RealsDetectiveError[][]> = {
    academic: [
        ['pure-over-ten', 'mixed-over-nines', 'truncate-not-round', 'relative-not-percent'],
        ['chained-added', 'initial-by-subtracting', 'change-over-final', 'points-as-percent'],
        ['compound-as-simple', 'rate-not-decimal', 'monthly-rate', 'interest-as-total']
    ],
    applied: [
        ['pure-over-ten', 'mixed-over-nines', 'truncate-not-round', 'relative-not-percent'],
        ['root-of-sum', 'unlike-radicals-added', 'radicands-added', 'product-adds-radicands'],
        ['factor-out-without-root', 'coefficient-not-squared', 'coefficient-inside', 'root-of-negative-square']
    ]
}

export const REALS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    numerator: say('Zenbakitzailea', 'Numerador', 'البسط', 'Numerator'),
    denominator: say('Izendatzailea', 'Denominador', 'المقام', 'Denominator'),
    fraction: say('Zatiki sortzailea', 'Fracción generatriz', 'الكسر المولّد', 'Generating fraction'),
    next: say('Hurrengo zifra', 'Cifra siguiente', 'الرقم التالي', 'Next digit'),
    rounded: say('Biribildu', 'Redondeo', 'التقريب', 'Rounded'),
    absolute: say('Errore absolutua', 'Error absoluto', 'الخطأ المطلق', 'Absolute error'),
    relative: say('Errore erlatiboa', 'Error relativo', 'الخطأ النسبي', 'Relative error'),
    multiplier: say('Indizea', 'Índice', 'المؤشر', 'Multiplier'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    change: say('Aldaketa', 'Variación', 'التغيّر', 'Change'),
    formula: say('Formula', 'Fórmula', 'القانون', 'Formula'),
    rate: say('Tasa', 'Tasa', 'المعدل', 'Rate'),
    capital: say('Azken kapitala', 'Capital final', 'رأس المال النهائي', 'Final capital'),
    interest: say('Interesak', 'Intereses', 'الفوائد', 'Interest'),
    roots: say('Erroak', 'Raíces', 'الجذور', 'Roots'),
    factor: say('Faktorizatu', 'Descompón', 'حلّل', 'Factorise'),
    extract: say('Atera faktoreak', 'Extrae factores', 'أخرج العوامل', 'Take factors out')
}

export const realsDetectiveNames: Record<RealsDetectiveError, LocalizedText> = {
    'pure-over-ten': say('Periodiko hutsari 10, 100… jarri dio izendatzailetzat, ez 9, 99…', 'Puso 10, 100… de denominador a un periódico puro, no 9, 99…', 'وضع 10 أو 100… مقامًا للدوري المحض لا 9 أو 99…', 'Used 10, 100… as the denominator of a pure recurring decimal, not 9, 99…'),
    'mixed-over-nines': say('Periodiko mistoan bederatziak bakarrik jarri ditu, zerorik gabe', 'En el periódico mixto puso solo nueves, sin los ceros', 'في الدوري المختلط وضع تسعات فقط دون أصفار', 'Used only nines for a mixed recurring decimal, with no zeros'),
    'truncate-not-round': say('Moztu du, biribildu beharrean', 'Truncó en vez de redondear', 'بتر بدل أن يقرّب', 'Truncated instead of rounding'),
    'relative-not-percent': say('Errore erlatiboa ez du ehunekotan jarri', 'No pasó el error relativo a porcentaje', 'لم يحوّل الخطأ النسبي إلى نسبة مئوية', 'Did not turn the relative error into a percentage'),
    'chained-added': say('Ehuneko kateatuak batu ditu', 'Sumó porcentajes encadenados', 'جمع نسبًا متتالية', 'Added chained percentages'),
    'initial-by-subtracting': say('Hasierako kopurua ehunekoa kenduz kalkulatu du', 'Calculó la cantidad inicial restando el porcentaje', 'حسب المقدار الأصلي بطرح النسبة', 'Worked out the starting amount by taking the percentage off'),
    'change-over-final': say('Aldaketa azken balioaren gainean kalkulatu du', 'Calculó la variación sobre el valor final', 'حسب التغيّر بالنسبة إلى القيمة النهائية', 'Worked out the change over the final value'),
    'points-as-percent': say('Puntu-aldea ehunekotzat hartu du', 'Tomó la diferencia de puntos como porcentaje', 'اعتبر فرق النقاط نسبة مئوية', 'Took the difference in points as a percentage'),
    'compound-as-simple': say('Interes konposatua sinplea balitz bezala kalkulatu du', 'Calculó el interés compuesto como si fuera simple', 'حسب الفائدة المركّبة كأنها بسيطة', 'Worked out compound interest as if it were simple'),
    'rate-not-decimal': say('Tasa ez du ehunez zatitu', 'No dividió la tasa entre 100', 'لم يقسم المعدل على 100', 'Did not divide the rate by 100'),
    'monthly-rate': say('Urteko tasa hilabeteka erabili du, hamabiz zatitu gabe', 'Usó la tasa anual cada mes sin dividir entre 12', 'استعمل المعدل السنوي كل شهر دون القسمة على 12', 'Used the yearly rate every month without dividing by 12'),
    'interest-as-total': say('Azken kapitala eman du, interesen ordez', 'Dio el capital final en vez de los intereses', 'أعطى رأس المال النهائي بدل الفوائد', 'Gave the final capital instead of the interest'),
    'root-of-sum': say('Batura baten erroa erroen batura dela pentsatu du', 'Pensó que la raíz de una suma es la suma de raíces', 'ظن أن جذر المجموع هو مجموع الجذور', 'Thought that the root of a sum is the sum of the roots'),
    'unlike-radicals-added': say('Antzekoak ez diren erroak batu ditu', 'Sumó radicales que no son semejantes', 'جمع جذورًا غير متشابهة', 'Added radicals that are not alike'),
    'radicands-added': say('Erro antzekoak batzean errokizunak batu ditu', 'Al sumar radicales semejantes sumó los radicandos', 'عند جمع جذور متشابهة جمع ما تحت الجذر', 'Added the radicands when adding like radicals'),
    'product-adds-radicands': say('Erroak biderkatzean errokizunak batu ditu', 'Al multiplicar raíces sumó los radicandos', 'عند ضرب الجذور جمع ما تحتها', 'Added the radicands when multiplying roots'),
    'factor-out-without-root': say('Faktorea errotik atera du erroa kalkulatu gabe', 'Sacó el factor de la raíz sin hacerle la raíz', 'أخرج العامل من الجذر دون جذره', 'Took the factor out of the root without taking its root'),
    'coefficient-not-squared': say('Koefizientea ez du ber bi egin', 'No elevó al cuadrado el coeficiente', 'لم يربّع المعامل', 'Did not square the coefficient'),
    'coefficient-inside': say('Koefizientea errora sartu du ber bi egin gabe', 'Metió el coeficiente en la raíz sin elevarlo al cuadrado', 'أدخل المعامل تحت الجذر دون تربيعه', 'Put the coefficient inside the root without squaring it'),
    'root-of-negative-square': say('Negatibo baten karratuaren erroa negatiboa dela esan du', 'Dijo que la raíz del cuadrado de un negativo es negativa', 'قال إن جذر مربع عدد سالب سالب', 'Said the root of the square of a negative is negative')
}

export const realsDetectiveTips: Record<RealsDetectiveError, LocalizedText> = {
    'pure-over-ten': say('Periodiko hutsa: periodoko zifra adina 9: $0{,}\\overline{36}=\\frac{36}{99}$.', 'Periódico puro: tantos 9 como cifras tiene el periodo: $0{,}\\overline{36}=\\frac{36}{99}$.', 'الدوري المحض: عدد التسعات بعدد أرقام الدور: $0{,}\\overline{36}=\\frac{36}{99}$.', 'Pure recurring: as many 9s as digits in the period: $0{,}\\overline{36}=\\frac{36}{99}$.'),
    'mixed-over-nines': say('Mistoa: periodoko adina 9 eta aurreperiodoko adina 0: $1{,}2\\overline{3}=\\frac{123-12}{90}$.', 'Mixto: un 9 por cifra del periodo y un 0 por cifra del anteperiodo: $1{,}2\\overline{3}=\\frac{123-12}{90}$.', 'المختلط: 9 لكل رقم في الدور و0 لكل رقم قبله: $1{,}2\\overline{3}=\\frac{123-12}{90}$.', 'Mixed: a 9 for each digit of the period and a 0 for each digit before it: $1{,}2\\overline{3}=\\frac{123-12}{90}$.'),
    'truncate-not-round': say('Biribiltzean, hurrengo zifra 5 edo handiagoa bada, aurrekoari 1 gehitzen zaio.', 'Al redondear, si la cifra siguiente es 5 o más, la anterior sube 1.', 'عند التقريب، إذا كان الرقم التالي 5 أو أكثر يزيد السابق 1.', 'When rounding, if the next digit is 5 or more, the one before goes up by 1.'),
    'relative-not-percent': say('Ehunekotan: errore erlatiboa bider 100.', 'En porcentaje: el error relativo por 100.', 'بالنسبة المئوية: الخطأ النسبي في 100.', 'As a percentage: the relative error times 100.'),
    'chained-added': say('Ehunekoak ez dira batzen: indizeak biderkatzen dira. $1{,}2\\cdot 0{,}8=0{,}96$.', 'Los porcentajes no se suman: se multiplican los índices. $1{,}2\\cdot 0{,}8=0{,}96$.', 'النسب لا تُجمع: تُضرب المؤشرات. $1{,}2\\cdot 0{,}8=0{,}96$.', 'Percentages do not add: the multipliers multiply. $1{,}2\\cdot 0{,}8=0{,}96$.'),
    'initial-by-subtracting': say('Hasierakoa: azkena zati indizea. $\\frac{121}{1{,}21}=100$.', 'La inicial: la final entre el índice. $\\frac{121}{1{,}21}=100$.', 'الأصلية: النهائية على المؤشر. $\\frac{121}{1{,}21}=100$.', 'The starting amount: the final one over the multiplier. $\\frac{121}{1{,}21}=100$.'),
    'change-over-final': say('Aldaketa beti hasierako balioaren gainean: $\\frac{\\text{aldaketa}}{\\text{hasierakoa}}$.', 'La variación siempre sobre el valor inicial: $\\frac{\\text{variación}}{\\text{inicial}}$.', 'التغيّر دائمًا بالنسبة إلى القيمة الأصلية.', 'The change is always over the starting value: $\\frac{\\text{change}}{\\text{start}}$.'),
    'points-as-percent': say('4 %-tik 5 %-ra: puntu 1 igo da, baina % 25 handitu da.', 'Del 4 % al 5 %: sube 1 punto, pero aumenta un 25 %.', 'من 4٪ إلى 5٪: ترتفع نقطة واحدة لكنها تزيد بنسبة 25٪.', 'From 4% to 5%: up 1 point, but an increase of 25%.'),
    'compound-as-simple': say('Konposatua: $C=C_{0}(1+r)^{t}$; interesek ere interesa sortzen dute.', 'Compuesto: $C=C_{0}(1+r)^{t}$; los intereses también generan intereses.', 'المركّبة: $C=C_{0}(1+r)^{t}$؛ الفوائد تولّد فوائد أيضًا.', 'Compound: $C=C_{0}(1+r)^{t}$; the interest earns interest too.'),
    'rate-not-decimal': say('$5\\,\\%=0{,}05$: indizea $1{,}05$ da, ez 6.', '$5\\,\\%=0{,}05$: el índice es $1{,}05$, no 6.', '$5\\,\\%=0.05$: المؤشر $1.05$ وليس 6.', '$5\\,\\%=0{,}05$: the multiplier is $1{,}05$, not 6.'),
    'monthly-rate': say('Hileko tasa = urteko tasa zati 12.', 'Tasa mensual = tasa anual entre 12.', 'المعدل الشهري = المعدل السنوي ÷ 12.', 'Monthly rate = yearly rate divided by 12.'),
    'interest-as-total': say('Interesak = azken kapitala − hasierakoa.', 'Intereses = capital final − capital inicial.', 'الفوائد = رأس المال النهائي − الأصلي.', 'Interest = final capital − starting capital.'),
    'root-of-sum': say('$\\sqrt{9+16}=\\sqrt{25}=5$, baina $\\sqrt{9}+\\sqrt{16}=7$.', '$\\sqrt{9+16}=\\sqrt{25}=5$, pero $\\sqrt{9}+\\sqrt{16}=7$.', '$\\sqrt{9+16}=\\sqrt{25}=5$ لكن $\\sqrt{9}+\\sqrt{16}=7$.', '$\\sqrt{9+16}=\\sqrt{25}=5$, but $\\sqrt{9}+\\sqrt{16}=7$.'),
    'unlike-radicals-added': say('Errokizun bera dutenak bakarrik batzen dira: $2\\sqrt{3}+5\\sqrt{3}=7\\sqrt{3}$.', 'Solo se suman los de igual radicando: $2\\sqrt{3}+5\\sqrt{3}=7\\sqrt{3}$.', 'لا يُجمع إلا ما تحت الجذر نفسه: $2\\sqrt{3}+5\\sqrt{3}=7\\sqrt{3}$.', 'Only roots of the same number add up: $2\\sqrt{3}+5\\sqrt{3}=7\\sqrt{3}$.'),
    'radicands-added': say('Erro antzekoak koefizienteak batuz: $\\sqrt{2}+\\sqrt{2}=2\\sqrt{2}$.', 'Los semejantes se suman por sus coeficientes: $\\sqrt{2}+\\sqrt{2}=2\\sqrt{2}$.', 'المتشابهة تُجمع بمعاملاتها: $\\sqrt{2}+\\sqrt{2}=2\\sqrt{2}$.', 'Like radicals add by their coefficients: $\\sqrt{2}+\\sqrt{2}=2\\sqrt{2}$.'),
    'product-adds-radicands': say('$\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{a\\cdot b}$: errokizunak biderkatzen dira.', '$\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{a\\cdot b}$: los radicandos se multiplican.', '$\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{a\\cdot b}$: ما تحت الجذر يُضرب.', '$\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{a\\cdot b}$: the radicands multiply.'),
    'factor-out-without-root': say('$\\sqrt{4\\cdot 3}=2\\sqrt{3}$: 4 ateratzean bere erroa ateratzen da.', '$\\sqrt{4\\cdot 3}=2\\sqrt{3}$: al sacar el 4 sale su raíz.', '$\\sqrt{4\\cdot 3}=2\\sqrt{3}$: عند إخراج 4 يخرج جذره.', '$\\sqrt{4\\cdot 3}=2\\sqrt{3}$: taking 4 out brings out its root.'),
    'coefficient-not-squared': say('$(2\\sqrt{3})^{2}=4\\cdot 3=12$: bi faktoreak ber bi.', '$(2\\sqrt{3})^{2}=4\\cdot 3=12$: se elevan los dos factores.', '$(2\\sqrt{3})^{2}=4\\cdot 3=12$: يُربَّع العاملان.', '$(2\\sqrt{3})^{2}=4\\cdot 3=12$: both factors are squared.'),
    'coefficient-inside': say('$2\\sqrt{3}=\\sqrt{4\\cdot 3}=\\sqrt{12}$: sartzeko, ber bi.', '$2\\sqrt{3}=\\sqrt{4\\cdot 3}=\\sqrt{12}$: para meterlo, al cuadrado.', '$2\\sqrt{3}=\\sqrt{4\\cdot 3}=\\sqrt{12}$: لإدخاله نربّعه.', '$2\\sqrt{3}=\\sqrt{4\\cdot 3}=\\sqrt{12}$: to put it inside, square it.'),
    'root-of-negative-square': say('$\\sqrt{(-3)^{2}}=\\sqrt{9}=3$: erro karratua ez da inoiz negatiboa.', '$\\sqrt{(-3)^{2}}=\\sqrt{9}=3$: la raíz cuadrada nunca es negativa.', '$\\sqrt{(-3)^{2}}=\\sqrt{9}=3$: الجذر التربيعي لا يكون سالبًا.', '$\\sqrt{(-3)^{2}}=\\sqrt{9}=3$: a square root is never negative.')
}

const f = (numerator: number, denominator = 1) => toLatex(fraction(numerator, denominator))
/** A number for LaTeX with at most `places` decimals and the decimal comma */
/** A number with exactly `places` decimals, for rounding */
const fixed = (value: number, places = 2) => value.toFixed(places).replace('.', '{,}')
const dec = (value: number, places = 2) => String(Number(value.toFixed(places))).replace('.', '{,}')
/** k·√n, written as a radical */
const rad = (outside: number, inside: number) => `${outside === 1 ? '' : outside}\\sqrt{${inside}}`
const squareFree = [2, 3, 5, 6, 7]

type Built = Omit<WorkedCase<RealsDetectiveError>, 'options'>

function build(random: Random, error: RealsDetectiveError): Built | null {
    switch (error) {
        case 'pure-over-ten': {
            const period = randomInt(random, 12, 98)
            if (period % 11 === 0) return null
            return {
                problem: say(`Kalkulatu $0{,}\\overline{${period}}$ zenbakiaren zatiki sortzailea.`, `Halla la fracción generatriz de $0{,}\\overline{${period}}$.`, `أوجد الكسر المولّد للعدد $0.\\overline{${period}}$.`, `Find the fraction that gives $0{,}\\overline{${period}}$.`),
                lines: [line(LABELS.numerator, `${period}`), line(LABELS.denominator, '100'), line(LABELS.fraction, `\\frac{${period}}{100}=${f(period, 100)}`)],
                wrong: 1,
                error,
                fix: `\\frac{${period}}{99}=${f(period, 99)}`,
                right: period / 99,
                reached: period / 100
            }
        }
        case 'mixed-over-nines': {
            const whole = randomInt(random, 1, 4)
            const before = randomInt(random, 1, 9)
            const period = randomInt(random, 1, 9)
            if (period === before) return null
            const all = whole * 100 + before * 10 + period
            const without = whole * 10 + before
            return {
                problem: say(`Kalkulatu $${whole}{,}${before}\\overline{${period}}$ zenbakiaren zatiki sortzailea.`, `Halla la fracción generatriz de $${whole}{,}${before}\\overline{${period}}$.`, `أوجد الكسر المولّد للعدد $${whole}.${before}\\overline{${period}}$.`, `Find the fraction that gives $${whole}{,}${before}\\overline{${period}}$.`),
                lines: [line(LABELS.numerator, `${all}-${without}=${all - without}`), line(LABELS.denominator, '99'), line(LABELS.fraction, `\\frac{${all - without}}{99}=${f(all - without, 99)}`)],
                wrong: 1,
                error,
                fix: `\\frac{${all - without}}{90}=${f(all - without, 90)}`,
                right: (all - without) / 90,
                reached: (all - without) / 99
            }
        }
        case 'truncate-not-round': {
            const integer = randomInt(random, 1, 9)
            const two = randomInt(random, 10, 98)
            const next = randomInt(random, 5, 9)
            const tail = randomInt(random, 1, 9)
            const exact = Number(`${integer}.${two}${next}${tail}`)
            const truncated = Number(`${integer}.${two}`)
            const rounded = Math.round((truncated + 0.01) * 100) / 100
            return {
                problem: say(`Biribildu $${dec(exact, 4)}$ ehunenetara eta kalkulatu errore absolutua.`, `Redondea $${dec(exact, 4)}$ a las centésimas y calcula el error absoluto.`, `قرّب $${dec(exact, 4)}$ إلى أقرب جزء من مئة واحسب الخطأ المطلق.`, `Round $${dec(exact, 4)}$ to hundredths and work out the absolute error.`),
                lines: [line(LABELS.next, `${next}`), line(LABELS.rounded, fixed(truncated)), line(LABELS.absolute, `|${dec(exact, 4)}-${fixed(truncated)}|=${dec(exact - truncated, 4)}`)],
                wrong: 1,
                error,
                fix: `${fixed(rounded)}\\ \\to\\ |${dec(exact, 4)}-${fixed(rounded)}|=${dec(rounded - exact, 4)}`,
                right: Number((rounded - exact).toFixed(4)),
                reached: Number((exact - truncated).toFixed(4))
            }
        }
        case 'relative-not-percent': {
            const [exact, approx] = pick(random, [[50, 49], [200, 196], [25, 24], [80, 78], [40, 39]] as const)
            const relative = Math.abs(exact - approx) / exact
            return {
                problem: say(`Neurri zehatza ${exact} cm da eta hurbilketa ${approx} cm. Kalkulatu errore erlatiboa ehunekotan.`, `La medida exacta es ${exact} cm y la aproximación ${approx} cm. Calcula el error relativo en porcentaje.`, `القياس الدقيق ${exact} سم والتقريب ${approx} سم. احسب الخطأ النسبي بالنسبة المئوية.`, `The exact length is ${exact} cm and the approximation ${approx} cm. Work out the relative error as a percentage.`),
                lines: [line(LABELS.absolute, `${exact}-${approx}=${exact - approx}`), line(LABELS.relative, `\\frac{${exact - approx}}{${exact}}=${dec(relative, 3)}`), line(LABELS.result, `${dec(relative, 3)}\\,\\%`)],
                wrong: 2,
                error,
                fix: `${dec(relative, 3)}\\cdot 100=${dec(relative * 100, 1)}\\,\\%`,
                right: Number((relative * 100).toFixed(1)),
                reached: Number(relative.toFixed(3))
            }
        }
        case 'chained-added': {
            const price = pick(random, [80, 120, 200, 250])
            const up = pick(random, [10, 20, 25])
            const down = pick(random, [10, 20])
            if (up === down) return null
            const right = price * (1 + up / 100) * (1 - down / 100)
            const reached = price * (1 + (up - down) / 100)
            const net = up - down
            return {
                problem: say(`${price} euroko prezio bat % ${up} igo eta gero % ${down} jaitsi da. Zenbat da orain?`, `Un precio de ${price} € sube un ${up} % y luego baja un ${down} %. ¿Cuánto vale ahora?`, `سعر ${price} يورو ارتفع ${up}٪ ثم انخفض ${down}٪. كم أصبح؟`, `A price of ${price} € goes up ${up}% and then down ${down}%. What is it now?`),
                lines: [line(LABELS.change, `+${up}\\,\\%-${down}\\,\\%=${net > 0 ? '+' : ''}${net}\\,\\%`), line(LABELS.multiplier, dec(1 + (up - down) / 100)), line(LABELS.result, `${price}\\cdot ${dec(1 + (up - down) / 100)}=${dec(reached)}`)],
                wrong: 0,
                error,
                fix: `${price}\\cdot ${dec(1 + up / 100)}\\cdot ${dec(1 - down / 100)}=${dec(right)}`,
                right,
                reached
            }
        }
        case 'initial-by-subtracting': {
            const base = pick(random, [100, 200, 300, 400])
            const rate = pick(random, [21, 10, 25])
            const final = base * (1 + rate / 100)
            const reached = final * (1 - rate / 100)
            return {
                problem: say(`BEZa barne (% ${rate}), zerbait ${dec(final)} euro da. Zenbat zen BEZik gabe?`, `Con el IVA incluido (${rate} %), algo cuesta ${dec(final)} €. ¿Cuánto costaba sin IVA?`, `مع الضريبة (${rate}٪) يكلّف شيء ${dec(final)} يورو. كم كان ثمنه دون الضريبة؟`, `With VAT included (${rate}%), something costs ${dec(final)} €. How much was it without VAT?`),
                lines: [line(LABELS.multiplier, dec(1 - rate / 100)), line(LABELS.result, `${dec(final)}\\cdot ${dec(1 - rate / 100)}`), line(LABELS.result, dec(reached))],
                wrong: 0,
                error,
                fix: `\\frac{${dec(final)}}{${dec(1 + rate / 100)}}=${dec(base)}`,
                right: base,
                reached: Number(reached.toFixed(2))
            }
        }
        case 'change-over-final': {
            const [start, end] = pick(random, [[40, 50], [80, 100], [20, 25], [60, 75], [50, 40]] as const)
            const change = end - start
            return {
                problem: say(`Prezio bat ${start} eurotik ${end} eurora pasatu da. Zer ehuneko aldatu da?`, `Un precio pasa de ${start} € a ${end} €. ¿En qué porcentaje ha variado?`, `انتقل سعر من ${start} يورو إلى ${end} يورو. بأي نسبة تغيّر؟`, `A price goes from ${start} € to ${end} €. By what percentage has it changed?`),
                lines: [line(LABELS.change, `${end}-${start}=${change}`), line(LABELS.relative, `\\frac{${change}}{${end}}=${dec(change / end, 2)}`), line(LABELS.result, `${dec((change / end) * 100, 1)}\\,\\%`)],
                wrong: 1,
                error,
                fix: `\\frac{${change}}{${start}}=${dec(change / start, 2)}\\ \\to\\ ${dec((change / start) * 100, 1)}\\,\\%`,
                right: Number(((change / start) * 100).toFixed(1)),
                reached: Number(((change / end) * 100).toFixed(1))
            }
        }
        case 'points-as-percent': {
            const [before, after] = pick(random, [[4, 5], [10, 12], [5, 6], [8, 10], [20, 25]] as const)
            return {
                problem: say(`Langabezia % ${before} izatetik % ${after} izatera pasatu da. Zer ehuneko handitu da?`, `El paro pasa del ${before} % al ${after} %. ¿En qué porcentaje ha aumentado?`, `انتقلت البطالة من ${before}٪ إلى ${after}٪. بأي نسبة زادت؟`, `Unemployment goes from ${before}% to ${after}%. By what percentage has it gone up?`),
                lines: [line(LABELS.change, `${after}-${before}=${after - before}`), line(LABELS.result, `${after - before}\\,\\%`), line(LABELS.result, `${after - before}`)],
                wrong: 1,
                error,
                fix: `\\frac{${after - before}}{${before}}\\cdot 100=${dec(((after - before) / before) * 100, 1)}\\,\\%`,
                right: ((after - before) / before) * 100,
                reached: after - before
            }
        }
        case 'compound-as-simple': {
            const capital = pick(random, [1000, 2000, 5000])
            const rate = pick(random, [2, 3, 4, 5])
            const years = pick(random, [3, 4, 5])
            const right = capital * (1 + rate / 100) ** years
            const reached = capital * (1 + (rate / 100) * years)
            return {
                problem: say(`${capital} euro % ${rate} interes konposatuan, ${years} urtez. Zenbat izango da?`, `${capital} € al ${rate} % de interés compuesto durante ${years} años. ¿Cuánto habrá?`, `${capital} يورو بفائدة مركّبة ${rate}٪ لمدة ${years} سنوات. كم سيصبح؟`, `${capital} € at ${rate}% compound interest for ${years} years. How much will there be?`),
                lines: [line(LABELS.formula, `C=${capital}(1+${dec(rate / 100)}\\cdot ${years})`), line(LABELS.capital, `C=${capital}\\cdot ${dec(1 + (rate / 100) * years)}`), line(LABELS.result, `C=${dec(reached)}`)],
                wrong: 0,
                error,
                fix: `C=${capital}\\cdot ${dec(1 + rate / 100)}^{${years}}\\approx ${dec(right)}`,
                right: Number(right.toFixed(2)),
                reached
            }
        }
        case 'rate-not-decimal': {
            const capital = pick(random, [500, 1000, 2000])
            const rate = pick(random, [2, 3, 4])
            const years = 2
            const right = capital * (1 + rate / 100) ** years
            return {
                problem: say(`${capital} euro % ${rate} interes konposatuan, ${years} urtez. Zenbat izango da?`, `${capital} € al ${rate} % de interés compuesto durante ${years} años. ¿Cuánto habrá?`, `${capital} يورو بفائدة مركّبة ${rate}٪ لمدة سنتين. كم سيصبح؟`, `${capital} € at ${rate}% compound interest for ${years} years. How much will there be?`),
                lines: [line(LABELS.formula, `C=C_{0}(1+r)^{t}`), line(LABELS.multiplier, `1+${rate}=${1 + rate}`), line(LABELS.result, `C=${capital}\\cdot ${1 + rate}^{2}=${capital * (1 + rate) ** 2}`)],
                wrong: 1,
                error,
                fix: `1+${dec(rate / 100)}=${dec(1 + rate / 100)}\\ \\to\\ C=${capital}\\cdot ${dec(1 + rate / 100)}^{2}\\approx ${dec(right)}`,
                right: Number(right.toFixed(2)),
                reached: capital * (1 + rate) ** 2
            }
        }
        case 'monthly-rate': {
            const capital = pick(random, [1200, 2400, 6000])
            const rate = pick(random, [6, 12])
            const months = pick(random, [2, 3])
            const right = capital * (1 + rate / 1200) ** months
            const reached = capital * (1 + rate / 100) ** months
            return {
                problem: say(`${capital} euro urteko % ${rate}an, interesak hilero kapitalizatuta. Zenbat izango da ${months} hilabete barru?`, `${capital} € al ${rate} % anual, con los intereses capitalizados cada mes. ¿Cuánto habrá a los ${months} meses?`, `${capital} يورو بمعدل سنوي ${rate}٪ تُضاف فوائده شهريًا. كم سيصبح بعد ${months} أشهر؟`, `${capital} € at ${rate}% a year, with the interest added every month. How much will there be after ${months} months?`),
                lines: [line(LABELS.rate, `r=${dec(rate / 100)}`), line(LABELS.formula, `C=${capital}\\cdot ${dec(1 + rate / 100)}^{${months}}`), line(LABELS.result, `C\\approx ${dec(reached)}`)],
                wrong: 0,
                error,
                fix: `r=\\frac{${dec(rate / 100)}}{12}=${dec(rate / 1200, 3)}\\ \\to\\ C\\approx ${dec(right)}`,
                right: Number(right.toFixed(2)),
                reached: Number(reached.toFixed(2))
            }
        }
        case 'interest-as-total': {
            const capital = pick(random, [1000, 2000, 4000])
            const rate = pick(random, [5, 10])
            const years = 2
            const total = capital * (1 + rate / 100) ** years
            return {
                problem: say(`${capital} euro % ${rate} interes konposatuan, ${years} urtez. Zenbat interes sortu dira?`, `${capital} € al ${rate} % de interés compuesto durante ${years} años. ¿Cuántos intereses se generan?`, `${capital} يورو بفائدة مركّبة ${rate}٪ لمدة سنتين. كم فائدة تتولّد؟`, `${capital} € at ${rate}% compound interest for ${years} years. How much interest is earned?`),
                lines: [line(LABELS.formula, `C=${capital}\\cdot ${dec(1 + rate / 100)}^{2}`), line(LABELS.capital, `C=${dec(total)}`), line(LABELS.interest, dec(total))],
                wrong: 2,
                error,
                fix: `I=${dec(total)}-${capital}=${dec(total - capital)}`,
                right: Number((total - capital).toFixed(2)),
                reached: Number(total.toFixed(2))
            }
        }
        case 'root-of-sum': {
            const [a, b, c] = pick(random, [[9, 16, 25], [36, 64, 100], [64, 36, 100], [16, 9, 25]] as const)
            if (Math.sqrt(a) % 1 || Math.sqrt(b) % 1) return null
            return {
                problem: say(`Kalkulatu: $\\sqrt{${a}+${b}}$`, `Calcula: $\\sqrt{${a}+${b}}$`, `احسب: $\\sqrt{${a}+${b}}$`, `Work out: $\\sqrt{${a}+${b}}$`),
                lines: [line(LABELS.roots, `\\sqrt{${a}+${b}}=\\sqrt{${a}}+\\sqrt{${b}}`), line(LABELS.roots, `${Math.sqrt(a)}+${Math.sqrt(b)}`), line(LABELS.result, `${Math.sqrt(a) + Math.sqrt(b)}`)],
                wrong: 0,
                error,
                fix: `\\sqrt{${a + b}}=${Math.sqrt(c)}`,
                right: Math.sqrt(c),
                reached: Math.sqrt(a) + Math.sqrt(b)
            }
        }
        case 'unlike-radicals-added': {
            const [p, q] = pick(random, [[2, 3], [2, 5], [3, 5], [3, 7]] as const)
            const [a, b] = [randomInt(random, 2, 5), randomInt(random, 2, 5)]
            return {
                problem: say(`Kalkulatu: $${rad(a, p)}+${rad(b, q)}$`, `Calcula: $${rad(a, p)}+${rad(b, q)}$`, `احسب: $${rad(a, p)}+${rad(b, q)}$`, `Work out: $${rad(a, p)}+${rad(b, q)}$`),
                lines: [line(LABELS.roots, `${rad(a, p)}+${rad(b, q)}=${rad(a + b, p + q)}`), line(LABELS.result, rad(a + b, p + q)), line(LABELS.result, `${rad(a + b, p + q)}\\approx ${dec((a + b) * Math.sqrt(p + q))}`)],
                wrong: 0,
                error,
                fix: `${rad(a, p)}+${rad(b, q)}\\approx ${dec(a * Math.sqrt(p) + b * Math.sqrt(q))}`,
                right: Number((a * Math.sqrt(p) + b * Math.sqrt(q)).toFixed(2)),
                reached: Number(((a + b) * Math.sqrt(p + q)).toFixed(2))
            }
        }
        case 'radicands-added': {
            const n = pick(random, squareFree)
            const [a, b] = [randomInt(random, 2, 6), randomInt(random, 1, 5)]
            return {
                problem: say(`Kalkulatu: $${rad(a, n)}+${rad(b, n)}$`, `Calcula: $${rad(a, n)}+${rad(b, n)}$`, `احسب: $${rad(a, n)}+${rad(b, n)}$`, `Work out: $${rad(a, n)}+${rad(b, n)}$`),
                lines: [line(LABELS.roots, `${rad(a, n)}+${rad(b, n)}`), line(LABELS.roots, `${rad(a + b, 2 * n)}`), line(LABELS.result, `${rad(a + b, 2 * n)}\\approx ${dec((a + b) * Math.sqrt(2 * n))}`)],
                wrong: 1,
                error,
                fix: `${rad(a + b, n)}\\approx ${dec((a + b) * Math.sqrt(n))}`,
                right: Number(((a + b) * Math.sqrt(n)).toFixed(2)),
                reached: Number(((a + b) * Math.sqrt(2 * n)).toFixed(2))
            }
        }
        case 'product-adds-radicands': {
            const [p, q] = pick(random, [[2, 3], [2, 5], [3, 5], [2, 7], [3, 7]] as const)
            const c = randomInt(random, 2, 6)
            return {
                problem: say(`Kalkulatu: $\\sqrt{${p}}\\cdot\\sqrt{${q}}+${c}$`, `Calcula: $\\sqrt{${p}}\\cdot\\sqrt{${q}}+${c}$`, `احسب: $\\sqrt{${p}}\\cdot\\sqrt{${q}}+${c}$`, `Work out: $\\sqrt{${p}}\\cdot\\sqrt{${q}}+${c}$`),
                lines: [line(LABELS.roots, `\\sqrt{${p}}\\cdot\\sqrt{${q}}=\\sqrt{${p + q}}`), line(LABELS.result, `\\sqrt{${p + q}}+${c}`), line(LABELS.result, `\\sqrt{${p + q}}+${c}\\approx ${dec(Math.sqrt(p + q) + c)}`)],
                wrong: 0,
                error,
                fix: `\\sqrt{${p * q}}+${c}\\approx ${dec(Math.sqrt(p * q) + c)}`,
                right: Number((Math.sqrt(p * q) + c).toFixed(2)),
                reached: Number((Math.sqrt(p + q) + c).toFixed(2))
            }
        }
        case 'factor-out-without-root': {
            const square = pick(random, [4, 9, 16, 25])
            const n = pick(random, squareFree)
            return {
                problem: say(`Sinplifikatu: $\\sqrt{${square * n}}$`, `Simplifica: $\\sqrt{${square * n}}$`, `بسّط: $\\sqrt{${square * n}}$`, `Simplify: $\\sqrt{${square * n}}$`),
                lines: [line(LABELS.factor, `${square * n}=${square}\\cdot ${n}`), line(LABELS.extract, `\\sqrt{${square}\\cdot ${n}}=${rad(square, n)}`), line(LABELS.result, `${rad(square, n)}\\approx ${dec(square * Math.sqrt(n))}`)],
                wrong: 1,
                error,
                fix: `${rad(Math.sqrt(square), n)}\\approx ${dec(Math.sqrt(square) * Math.sqrt(n))}`,
                right: Number((Math.sqrt(square) * Math.sqrt(n)).toFixed(2)),
                reached: Number((square * Math.sqrt(n)).toFixed(2))
            }
        }
        case 'coefficient-not-squared': {
            const a = randomInt(random, 2, 5)
            const n = pick(random, squareFree)
            return {
                problem: say(`Kalkulatu: $(${rad(a, n)})^{2}$`, `Calcula: $(${rad(a, n)})^{2}$`, `احسب: $(${rad(a, n)})^{2}$`, `Work out: $(${rad(a, n)})^{2}$`),
                lines: [line(LABELS.roots, `(${rad(a, n)})^{2}=${a}\\cdot(\\sqrt{${n}})^{2}`), line(LABELS.roots, `${a}\\cdot ${n}`), line(LABELS.result, `${a * n}`)],
                wrong: 0,
                error,
                fix: `${a}^{2}\\cdot ${n}=${a * a * n}`,
                right: a * a * n,
                reached: a * n
            }
        }
        case 'coefficient-inside': {
            const a = randomInt(random, 2, 5)
            const n = pick(random, squareFree)
            return {
                problem: say(`Sartu koefizientea errora: $${rad(a, n)}$`, `Introduce el coeficiente en la raíz: $${rad(a, n)}$`, `أدخل المعامل تحت الجذر: $${rad(a, n)}$`, `Put the coefficient inside the root: $${rad(a, n)}$`),
                lines: [line(LABELS.roots, `${rad(a, n)}=\\sqrt{${a}\\cdot ${n}}`), line(LABELS.result, `\\sqrt{${a * n}}`), line(LABELS.result, `\\sqrt{${a * n}}\\approx ${dec(Math.sqrt(a * n))}`)],
                wrong: 0,
                error,
                fix: `\\sqrt{${a}^{2}\\cdot ${n}}=\\sqrt{${a * a * n}}\\approx ${dec(a * Math.sqrt(n))}`,
                right: Number((a * Math.sqrt(n)).toFixed(2)),
                reached: Number(Math.sqrt(a * n).toFixed(2))
            }
        }
        case 'root-of-negative-square': {
            const a = randomInt(random, 2, 9)
            const b = randomInt(random, 2, 9)
            return {
                problem: say(`Kalkulatu: $\\sqrt{(-${a})^{2}}+${b}$`, `Calcula: $\\sqrt{(-${a})^{2}}+${b}$`, `احسب: $\\sqrt{(-${a})^{2}}+${b}$`, `Work out: $\\sqrt{(-${a})^{2}}+${b}$`),
                lines: [line(LABELS.roots, `\\sqrt{(-${a})^{2}}=-${a}`), line(LABELS.result, `-${a}+${b}`), line(LABELS.result, `${b - a}`)],
                wrong: 0,
                error,
                fix: `\\sqrt{${a * a}}=${a}\\ \\to\\ ${a}+${b}=${a + b}`,
                right: a + b,
                reached: b - a
            }
        }
    }
}

export const createRealsDetectiveCases = (track: RealsTrack) => (random: Random, levelIndex: number) => createWorkedCases(random, realsDetectiveLevels[track][levelIndex], REALS_DETECTIVE_CASES, build)
