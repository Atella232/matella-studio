import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import { fraction, toLatex } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistikaren detektibea (2. DBH): a worked solution of three lines
   with one wrong line. Level 1: tables and charts (the relative frequency
   over the number of categories, the cumulative frequency not added, a
   sector of the pie out of 100 instead of 360, the percentage not
   multiplied by 100); level 2: centre (the mean of a table divided by the
   number of values, the median of unsorted data, the mode given as its
   frequency, the median of an even count taken as one middle value);
   level 3: spread and chance (the range of unsorted data, favourable
   over unfavourable cases, the complement as 1 over the probability,
   eleven equally likely sums of two dice).
   ========================================================================== */

export type StatisticsDetectiveError =
    | 'relative-over-categories'
    | 'cumulative-not-added'
    | 'sector-out-of-100'
    | 'percent-not-scaled'
    | 'mean-over-values'
    | 'median-unsorted'
    | 'mode-as-frequency'
    | 'median-even-one'
    | 'range-unsorted'
    | 'favourable-over-unfavourable'
    | 'complement-inverse'
    | 'dice-sums-equal'

export const statisticsDetectiveLevels: StatisticsDetectiveError[][] = [
    ['relative-over-categories', 'cumulative-not-added', 'sector-out-of-100', 'percent-not-scaled'],
    ['mean-over-values', 'median-unsorted', 'mode-as-frequency', 'median-even-one'],
    ['range-unsorted', 'favourable-over-unfavourable', 'complement-inverse', 'dice-sums-equal']
]

export const STATISTICS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    total: say('Guztira', 'Total', 'المجموع', 'Total'),
    relative: say('Maiztasun erlatiboa', 'Frecuencia relativa', 'التكرار النسبي', 'Relative frequency'),
    cumulative: say('Maiztasun metatua', 'Frecuencia acumulada', 'التكرار المتجمع', 'Cumulative frequency'),
    angle: say('Angelua', 'Ángulo', 'الزاوية', 'Angle'),
    percent: say('Ehunekoa', 'Porcentaje', 'النسبة المئوية', 'Percentage'),
    sum: say('Batura', 'Suma', 'المجموع', 'Sum'),
    mean: say('Batez bestekoa', 'Media', 'المتوسط', 'Mean'),
    median: say('Mediana', 'Mediana', 'الوسيط', 'Median'),
    mode: say('Moda', 'Moda', 'المنوال', 'Mode'),
    count: say('Kasuak', 'Casos', 'الحالات', 'Cases'),
    range: say('Ibiltartea', 'Recorrido', 'المدى', 'Range'),
    probability: say('Probabilitatea', 'Probabilidad', 'الاحتمال', 'Probability'),
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const statisticsDetectiveNames: Record<StatisticsDetectiveError, LocalizedText> = {
    'relative-over-categories': say('Kategoria kopuruaz zatitu du, datu guztien kopuruaz beharrean', 'Dividió entre el número de categorías, no entre el total de datos', 'قسم على عدد الفئات لا على مجموع البيانات', 'Divided by the number of categories, not by the total number of data'),
    'cumulative-not-added': say('Maiztasun metatua aurrekoak batu gabe idatzi du', 'Escribió la frecuencia acumulada sin sumar las anteriores', 'كتب التكرار المتجمع دون جمع السابقة', 'Wrote the cumulative frequency without adding the earlier ones'),
    'sector-out-of-100': say('Sektorearen angelua kalkulatzeko 100 erabili du, 360 beharrean', 'Calculó el ángulo del sector sobre 100 y no sobre 360', 'حسب زاوية القطاع من 100 لا من 360', 'Worked out the angle of the sector out of 100, not 360'),
    'percent-not-scaled': say('Maiztasun erlatiboa ez du bider 100 egin', 'No multiplicó la frecuencia relativa por 100', 'لم يضرب التكرار النسبي في 100', 'Did not multiply the relative frequency by 100'),
    'mean-over-values': say('Balio desberdinen kopuruaz zatitu du, datu guztienaz beharrean', 'Dividió entre el número de valores distintos, no entre el total de datos', 'قسم على عدد القيم المختلفة لا على مجموع البيانات', 'Divided by the number of different values, not by the total number of data'),
    'median-unsorted': say('Mediana datuak ordenatu gabe hartu du', 'Tomó la mediana sin ordenar los datos', 'أخذ الوسيط دون ترتيب البيانات', 'Took the median without sorting the data'),
    'mode-as-frequency': say('Modaren ordez haren maiztasuna eman du', 'Dio la frecuencia de la moda en vez de la moda', 'أعطى تكرار المنوال بدل المنوال', 'Gave the frequency of the mode instead of the mode'),
    'median-even-one': say('Datu kopurua bikoitia da, eta erdiko bietako bat bakarrik hartu du', 'Con un número par de datos tomó solo uno de los dos centrales', 'مع عدد زوجي من البيانات أخذ واحدة فقط من القيمتين الوسطيين', 'With an even number of data, took only one of the two middle values'),
    'range-unsorted': say('Ibiltartea azken datua ken lehena eginez kalkulatu du, ordenatu gabe', 'Calculó el recorrido como último menos primero, sin ordenar', 'حسب المدى بطرح الأول من الأخير دون ترتيب', 'Worked out the range as last minus first, without sorting'),
    'favourable-over-unfavourable': say('Aldeko kasuak kontrako kasuez zatitu ditu', 'Dividió los casos favorables entre los desfavorables', 'قسم الحالات الملائمة على غير الملائمة', 'Divided the favourable cases by the unfavourable ones'),
    'complement-inverse': say('Aurkakoaren probabilitatea alderantzizkoa balitz bezala kalkulatu du', 'Calculó la probabilidad del contrario como si fuera la inversa', 'حسب احتمال الحدث المعاكس كأنه المقلوب', 'Worked out the probability of the opposite as if it were the reciprocal'),
    'dice-sums-equal': say('Bi dadoren 11 baturak berdin probableak direla pentsatu du', 'Pensó que las 11 sumas de dos dados son igual de probables', 'ظن أن مجاميع النردين الـ11 متساوية الاحتمال', 'Thought that the 11 sums of two dice are equally likely')
}

export const statisticsDetectiveTips: Record<StatisticsDetectiveError, LocalizedText> = {
    'relative-over-categories': say('$h_{i}=\\frac{f_{i}}{N}$: N datu guztien kopurua da.', '$h_{i}=\\frac{f_{i}}{N}$: N es el número total de datos.', '$h_{i}=\\frac{f_{i}}{N}$: N هو العدد الكلي للبيانات.', '$h_{i}=\\frac{f_{i}}{N}$: N is the total number of data.'),
    'cumulative-not-added': say('$F_{i}$ = balio horretaraino maiztasun guztien batura.', '$F_{i}$ = suma de todas las frecuencias hasta ese valor.', '$F_{i}$ = مجموع كل التكرارات حتى تلك القيمة.', '$F_{i}$ = the sum of all the frequencies up to that value.'),
    'sector-out-of-100': say('Zirkulu osoak 360° ditu: angelua $=\\frac{f_{i}}{N}\\cdot 360$.', 'El círculo entero son 360°: ángulo $=\\frac{f_{i}}{N}\\cdot 360$.', 'الدائرة كلها 360°: الزاوية $=\\frac{f_{i}}{N}\\cdot 360$.', 'The whole circle is 360°: angle $=\\frac{f_{i}}{N}\\cdot 360$.'),
    'percent-not-scaled': say('$0{,}25$ maiztasun erlatiboa $25\\,\\%$ da: bider 100.', 'Una frecuencia relativa de $0{,}25$ es un $25\\,\\%$: por 100.', 'التكرار النسبي $0.25$ يساوي $25\\,\\%$: نضرب في 100.', 'A relative frequency of $0{,}25$ is $25\\,\\%$: times 100.'),
    'mean-over-values': say('$\\bar{x}=\\frac{\\sum x_{i}f_{i}}{N}$: zatitu datu guztien kopuruaz.', '$\\bar{x}=\\frac{\\sum x_{i}f_{i}}{N}$: se divide entre el total de datos.', '$\\bar{x}=\\frac{\\sum x_{i}f_{i}}{N}$: نقسم على العدد الكلي للبيانات.', '$\\bar{x}=\\frac{\\sum x_{i}f_{i}}{N}$: divide by the total number of data.'),
    'median-unsorted': say('Lehenik ordenatu: mediana erdian geratzen den datua da.', 'Primero se ordena: la mediana es el dato que queda en el centro.', 'نرتّب أولًا: الوسيط هو القيمة في الوسط.', 'Sort first: the median is the value left in the middle.'),
    'mode-as-frequency': say('Moda datua da, ez zenbat aldiz agertzen den.', 'La moda es el dato, no cuántas veces aparece.', 'المنوال هو القيمة لا عدد مرات ظهورها.', 'The mode is the value, not how many times it appears.'),
    'median-even-one': say('Datu kopurua bikoitia bada, mediana erdiko bien batez bestekoa da.', 'Si el número de datos es par, la mediana es la media de los dos centrales.', 'إذا كان عدد البيانات زوجيًا فالوسيط متوسط القيمتين الوسطيين.', 'With an even number of data, the median is the mean of the two middle ones.'),
    'range-unsorted': say('Ibiltartea = datu handiena − txikiena.', 'Recorrido = dato mayor − dato menor.', 'المدى = أكبر قيمة − أصغر قيمة.', 'Range = largest value − smallest value.'),
    'favourable-over-unfavourable': say('Laplace: $P=\\frac{\\text{aldekoak}}{\\text{posibleak}}$.', 'Laplace: $P=\\frac{\\text{favorables}}{\\text{posibles}}$.', 'لابلاس: الاحتمال = الحالات الملائمة ÷ الحالات الممكنة.', 'Laplace: $P=\\frac{\\text{favourable}}{\\text{possible}}$.'),
    'complement-inverse': say('$P(\\text{ez }A)=1-P(A)$.', '$P(\\text{no }A)=1-P(A)$.', 'احتمال عكس A يساوي $1-P(A)$.', '$P(\\text{not }A)=1-P(A)$.'),
    'dice-sums-equal': say('36 emaitza berdin probable daude; 7 batzeko 6 modu daude.', 'Hay 36 resultados igual de probables; el 7 sale de 6 maneras.', 'هناك 36 نتيجة متساوية الاحتمال؛ والمجموع 7 يأتي بست طرق.', 'There are 36 equally likely outcomes; 7 comes up in 6 ways.')
}

const value = (numerator: number, denominator = 1) => toLatex(fraction(numerator, denominator))
const decimal = (number: number) => String(Math.round(number * 100) / 100).replace('.', '{,}')
const sumOf = (values: number[]) => values.reduce((total, item) => total + item, 0)
/** Data as plain text in a sentence: 4, 7, 2 */
const list = (values: number[], language: 'ar' | 'other') => values.join(language === 'ar' ? '، ' : ', ')

type Built = Omit<WorkedCase<StatisticsDetectiveError>, 'options'>

/** Favourite sports in a class: three categories and their frequencies */
const SPORTS = [say('futbola', 'fútbol', 'كرة القدم', 'football'), say('saskibaloia', 'baloncesto', 'كرة السلة', 'basketball'), say('igeriketa', 'natación', 'السباحة', 'swimming')]

function build(random: Random, error: StatisticsDetectiveError): Built | null {
    switch (error) {
        case 'relative-over-categories': {
            const frequencies = [randomInt(random, 4, 12), randomInt(random, 3, 9), randomInt(random, 2, 8)]
            const total = sumOf(frequencies)
            const [f] = frequencies
            const sport = SPORTS[0]
            return {
                problem: say(`Gelako kirol gogokoenak: ${sport.eu} ${frequencies[0]}, ${SPORTS[1].eu} ${frequencies[1]}, ${SPORTS[2].eu} ${frequencies[2]}. Kalkulatu futbolaren maiztasun erlatiboa.`, `Deportes favoritos de una clase: ${sport.es} ${frequencies[0]}, ${SPORTS[1].es} ${frequencies[1]}, ${SPORTS[2].es} ${frequencies[2]}. Calcula la frecuencia relativa del fútbol.`, `الرياضات المفضلة في صف: ${sport.ar} ${frequencies[0]}، ${SPORTS[1].ar} ${frequencies[1]}، ${SPORTS[2].ar} ${frequencies[2]}. احسب التكرار النسبي لكرة القدم.`, `Favourite sports in a class: ${sport.en} ${frequencies[0]}, ${SPORTS[1].en} ${frequencies[1]}, ${SPORTS[2].en} ${frequencies[2]}. Work out the relative frequency of football.`),
                lines: [
                    line(LABELS.total, `N=${frequencies.join('+')}=${total}`),
                    line(LABELS.relative, `h=\\frac{${f}}{3}`),
                    line(LABELS.result, `h=${value(f, 3)}`)
                ],
                wrong: 1,
                error,
                fix: `h=\\frac{${f}}{${total}}=${value(f, total)}`,
                right: f / total,
                reached: f / 3
            }
        }
        case 'cumulative-not-added': {
            const frequencies = [randomInt(random, 2, 6), randomInt(random, 3, 8), randomInt(random, 4, 9), randomInt(random, 1, 5)]
            const index = pick(random, [2, 3])
            const cumulative = sumOf(frequencies.slice(0, index + 1))
            return {
                problem: say(`Anai-arreba kopurua: 0 → ${frequencies[0]}, 1 → ${frequencies[1]}, 2 → ${frequencies[2]}, 3 → ${frequencies[3]}. Zenbat ikaslek dituzte gehienez ${index} anai-arreba?`, `Número de hermanos: 0 → ${frequencies[0]}, 1 → ${frequencies[1]}, 2 → ${frequencies[2]}, 3 → ${frequencies[3]}. ¿Cuántos alumnos tienen ${index} hermanos o menos?`, `عدد الإخوة: 0 ← ${frequencies[0]}، 1 ← ${frequencies[1]}، 2 ← ${frequencies[2]}، 3 ← ${frequencies[3]}. كم طالبًا لديه ${index} إخوة أو أقل؟`, `Number of brothers and sisters: 0 → ${frequencies[0]}, 1 → ${frequencies[1]}, 2 → ${frequencies[2]}, 3 → ${frequencies[3]}. How many pupils have ${index} or fewer?`),
                lines: [
                    line(LABELS.data, `f_{${index}}=${frequencies[index]}`),
                    line(LABELS.cumulative, `F_{${index}}=${frequencies[index]}`),
                    line(LABELS.result, `${frequencies[index]}`)
                ],
                wrong: 1,
                error,
                fix: `F_{${index}}=${frequencies.slice(0, index + 1).join('+')}=${cumulative}`,
                right: cumulative,
                reached: frequencies[index]
            }
        }
        case 'sector-out-of-100': {
            const total = pick(random, [20, 24, 30, 36, 40])
            const f = pick(random, Array.from({ length: total - 1 }, (_, item) => item + 1).filter((item) => (item * 360) % total === 0 && (item * 100) % total === 0 && item < total / 2))
            if (!f) return null
            return {
                problem: say(`${total} ikaslegetik ${f} oinez etortzen dira eskolara. Zenbat gradu ditu sektore-diagramako sektore horrek?`, `De ${total} alumnos, ${f} vienen andando a clase. ¿Cuántos grados tiene ese sector en el diagrama de sectores?`, `من بين ${total} طالبًا يأتي ${f} مشيًا. كم درجة يبلغ هذا القطاع في المخطط الدائري؟`, `Of ${total} pupils, ${f} walk to school. How many degrees does that sector have in the pie chart?`),
                lines: [
                    line(LABELS.relative, `\\frac{${f}}{${total}}=${decimal(f / total)}`),
                    line(LABELS.angle, `${decimal(f / total)}\\cdot 100=${decimal((f / total) * 100)}`),
                    line(LABELS.result, `${decimal((f / total) * 100)}^{\\circ}`)
                ],
                wrong: 1,
                error,
                fix: `${decimal(f / total)}\\cdot 360=${decimal((f / total) * 360)}^{\\circ}`,
                right: (f / total) * 360,
                reached: (f / total) * 100
            }
        }
        case 'percent-not-scaled': {
            const total = pick(random, [20, 25, 40, 50])
            const f = pick(random, Array.from({ length: total - 1 }, (_, item) => item + 1).filter((item) => (item * 100) % total === 0 && item % 2 === 1 || item === total / 4))
            if (!f) return null
            return {
                problem: say(`${total} ikaslegetik ${f} bizikletaz etortzen dira. Zer ehuneko da?`, `De ${total} alumnos, ${f} vienen en bici. ¿Qué porcentaje es?`, `من بين ${total} طالبًا يأتي ${f} بالدراجة. ما النسبة المئوية؟`, `Of ${total} pupils, ${f} come by bike. What percentage is that?`),
                lines: [
                    line(LABELS.relative, `h=\\frac{${f}}{${total}}=${decimal(f / total)}`),
                    line(LABELS.percent, `${decimal(f / total)}\\,\\%`),
                    line(LABELS.result, decimal(f / total))
                ],
                wrong: 1,
                error,
                fix: `${decimal(f / total)}\\cdot 100=${decimal((f / total) * 100)}`,
                right: (f / total) * 100,
                reached: f / total
            }
        }
        case 'mean-over-values': {
            const values = [1, 2, 3, 4]
            const frequencies = values.map(() => randomInt(random, 1, 6))
            const products = values.map((item, index) => item * frequencies[index])
            const total = sumOf(frequencies)
            const weighted = sumOf(products)
            if (total === 4) return null
            return {
                problem: say(`Etxeko telebista kopurua: 1 → ${frequencies[0]}, 2 → ${frequencies[1]}, 3 → ${frequencies[2]}, 4 → ${frequencies[3]}. Kalkulatu batez bestekoa.`, `Televisores en casa: 1 → ${frequencies[0]}, 2 → ${frequencies[1]}, 3 → ${frequencies[2]}, 4 → ${frequencies[3]}. Calcula la media.`, `عدد أجهزة التلفاز في البيت: 1 ← ${frequencies[0]}، 2 ← ${frequencies[1]}، 3 ← ${frequencies[2]}، 4 ← ${frequencies[3]}. احسب المتوسط.`, `TVs at home: 1 → ${frequencies[0]}, 2 → ${frequencies[1]}, 3 → ${frequencies[2]}, 4 → ${frequencies[3]}. Work out the mean.`),
                lines: [
                    line(LABELS.sum, `${products.join('+')}=${weighted}`),
                    line(LABELS.mean, `\\bar{x}=\\frac{${weighted}}{4}`),
                    line(LABELS.result, `\\bar{x}=${decimal(weighted / 4)}`)
                ],
                wrong: 1,
                error,
                fix: `\\bar{x}=\\frac{${weighted}}{${total}}\\approx ${decimal(weighted / total)}`,
                right: Math.round((weighted / total) * 100) / 100,
                reached: weighted / 4
            }
        }
        case 'median-unsorted': {
            const data = Array.from({ length: 5 }, () => randomInt(random, 1, 10))
            const shown = shuffle(random, data)
            const sorted = [...data].sort((a, b) => a - b)
            if (shown[2] === sorted[2]) return null
            return {
                problem: say(`Notak: ${list(shown, 'other')}. Kalkulatu mediana.`, `Notas: ${list(shown, 'other')}. Calcula la mediana.`, `العلامات: ${list(shown, 'ar')}. احسب الوسيط.`, `Marks: ${list(shown, 'other')}. Work out the median.`),
                lines: [
                    line(LABELS.data, `N=5`),
                    line(LABELS.median, `\\text{Me}=x_{3}`),
                    line(LABELS.result, `\\text{Me}=${shown[2]}`)
                ],
                wrong: 2,
                error,
                fix: `${sorted.join('\\le ')}\\ \\to\\ \\text{Me}=${sorted[2]}`,
                right: sorted[2],
                reached: shown[2]
            }
        }
        case 'mode-as-frequency': {
            const values = [36, 37, 38, 39, 40]
            const frequencies = values.map(() => randomInt(random, 1, 7))
            const top = Math.max(...frequencies)
            if (frequencies.filter((item) => item === top).length > 1) return null
            const mode = values[frequencies.indexOf(top)]
            const table = values.map((size, index) => `${size} → ${frequencies[index]}`)
            const tableAr = values.map((size, index) => `${size} ← ${frequencies[index]}`)
            return {
                problem: say(`Gelako oinetakoen neurriak: ${table.join(', ')}. Zein da moda?`, `Tallas de calzado de una clase: ${table.join(', ')}. ¿Cuál es la moda?`, `مقاسات أحذية صف: ${tableAr.join('، ')}. ما المنوال؟`, `Shoe sizes in a class: ${table.join(', ')}. What is the mode?`),
                lines: [
                    line(LABELS.data, `f:\\ ${frequencies.join(',\\ ')}`),
                    line(LABELS.mode, `f_{\\max}=${top}`),
                    line(LABELS.result, `\\text{Mo}=${top}`)
                ],
                wrong: 2,
                error,
                fix: `f_{\\max}=${top}\\ \\to\\ \\text{Mo}=${mode}`,
                right: mode,
                reached: top
            }
        }
        case 'median-even-one': {
            const sorted = Array.from({ length: 6 }, () => randomInt(random, 1, 10)).sort((a, b) => a - b)
            if (sorted[2] === sorted[3]) return null
            return {
                problem: say(`Notak: ${list(sorted, 'other')}. Kalkulatu mediana.`, `Notas: ${list(sorted, 'other')}. Calcula la mediana.`, `العلامات: ${list(sorted, 'ar')}. احسب الوسيط.`, `Marks: ${list(sorted, 'other')}. Work out the median.`),
                lines: [
                    line(LABELS.data, `N=6`),
                    line(LABELS.median, `\\text{Me}=x_{3}`),
                    line(LABELS.result, `\\text{Me}=${sorted[2]}`)
                ],
                wrong: 1,
                error,
                fix: `\\text{Me}=\\frac{${sorted[2]}+${sorted[3]}}{2}=${decimal((sorted[2] + sorted[3]) / 2)}`,
                right: (sorted[2] + sorted[3]) / 2,
                reached: sorted[2]
            }
        }
        case 'range-unsorted': {
            const data = Array.from({ length: 6 }, () => randomInt(random, 2, 20))
            const shown = shuffle(random, data)
            const range = Math.max(...data) - Math.min(...data)
            const reached = shown[shown.length - 1] - shown[0]
            return {
                problem: say(`Tenperaturak (°C): ${list(shown, 'other')}. Kalkulatu ibiltartea.`, `Temperaturas (°C): ${list(shown, 'other')}. Calcula el recorrido.`, `درجات الحرارة (°C): ${list(shown, 'ar')}. احسب المدى.`, `Temperatures (°C): ${list(shown, 'other')}. Work out the range.`),
                lines: [
                    line(LABELS.data, `N=6`),
                    line(LABELS.range, `R=${shown[shown.length - 1]}-${shown[0]}`),
                    line(LABELS.result, `R=${reached}`)
                ],
                wrong: 1,
                error,
                fix: `R=${Math.max(...data)}-${Math.min(...data)}=${range}`,
                right: range,
                reached
            }
        }
        case 'favourable-over-unfavourable': {
            const red = randomInt(random, 2, 6)
            const others = randomInt(random, 3, 9)
            return {
                problem: say(`Poltsa batean ${red} bola gorri eta ${others} urdin daude. Zein da gorri bat ateratzeko probabilitatea?`, `En una bolsa hay ${red} bolas rojas y ${others} azules. ¿Qué probabilidad hay de sacar una roja?`, `في كيس ${red} كرات حمراء و${others} زرقاء. ما احتمال سحب كرة حمراء؟`, `A bag holds ${red} red balls and ${others} blue ones. What is the probability of drawing a red one?`),
                lines: [
                    line(LABELS.count, `N=${red}+${others}=${red + others}`),
                    line(LABELS.probability, `P=\\frac{${red}}{${others}}`),
                    line(LABELS.result, `P=${value(red, others)}`)
                ],
                wrong: 1,
                error,
                fix: `P=\\frac{${red}}{${red + others}}=${value(red, red + others)}`,
                right: red / (red + others),
                reached: red / others
            }
        }
        case 'complement-inverse': {
            const [numerator, denominator] = pick(random, [[1, 4], [2, 5], [3, 10], [1, 5], [3, 8]] as const)
            return {
                problem: say(`Euria egiteko probabilitatea $${value(numerator, denominator)}$ da. Zein da euririk ez egiteko probabilitatea?`, `La probabilidad de que llueva es $${value(numerator, denominator)}$. ¿Cuál es la probabilidad de que no llueva?`, `احتمال سقوط المطر $${value(numerator, denominator)}$. ما احتمال عدم سقوطه؟`, `The probability of rain is $${value(numerator, denominator)}$. What is the probability of no rain?`),
                lines: [
                    line(LABELS.probability, `P(A)=${value(numerator, denominator)}`),
                    line(LABELS.probability, `P(\\overline{A})=\\frac{1}{P(A)}`),
                    line(LABELS.result, `P(\\overline{A})=${value(denominator, numerator)}`)
                ],
                wrong: 1,
                error,
                fix: `P(\\overline{A})=1-${value(numerator, denominator)}=${value(denominator - numerator, denominator)}`,
                right: (denominator - numerator) / denominator,
                reached: denominator / numerator
            }
        }
        case 'dice-sums-equal': {
            const target = pick(random, [5, 6, 7, 8, 9])
            const ways = 6 - Math.abs(7 - target)
            return {
                problem: say(`Bi dado botatzen ditugu. Zein da ${target} batzeko probabilitatea?`, `Lanzamos dos dados. ¿Qué probabilidad hay de que sumen ${target}?`, `نرمي نردين. ما احتمال أن يكون مجموعهما ${target}؟`, `We roll two dice. What is the probability that they add up to ${target}?`),
                lines: [
                    line(LABELS.count, `2,\\ 3,\\ \\dots,\\ 12`),
                    line(LABELS.probability, `P=\\frac{1}{11}`),
                    line(LABELS.result, `P=\\frac{1}{11}`)
                ],
                wrong: 1,
                error,
                fix: `P=\\frac{${ways}}{36}=${value(ways, 36)}`,
                right: ways / 36,
                reached: 1 / 11
            }
        }
    }
}

export const createStatisticsDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, statisticsDetectiveLevels[levelIndex], STATISTICS_DETECTIVE_CASES, build)
