import { pick, randomInt, shuffle, type Random } from '../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'
import { tex } from './geometryDetective.ts'
import { percentilePlaces } from './statistics.ts'

/* ==========================================================================
   Estatistikaren detektibea (4. DBH applied and academic): a worked
   solution of three lines with one wrong line. Grouped data with the ends
   of the intervals, the mean of two groups without their sizes, quartiles
   and percentiles off by one place, the variance without − x̄², the
   variance given as σ, the coefficient of variation upside down, the mean
   deviation with signs, a stratified sample split in equal parts, and the
   regression line with the means swapped or a minus sign lost.
   ========================================================================== */

export type StatsTrack = 'applied' | 'academic'

export type StatsDetectiveError =
    | 'class-end-as-mark'
    | 'weighted-mean-plain'
    | 'quartile-position'
    | 'percentile-whole'
    | 'variance-not-subtracted'
    | 'variance-as-sigma'
    | 'cv-upside-down'
    | 'mean-deviation-signed'
    | 'strata-equal'
    | 'regression-point'
    | 'regression-sign'

export const statsDetectiveLevels: Record<StatsTrack, StatsDetectiveError[][]> = {
    applied: [
        ['class-end-as-mark', 'weighted-mean-plain', 'quartile-position', 'percentile-whole'],
        ['variance-not-subtracted', 'variance-as-sigma', 'cv-upside-down'],
        ['regression-point', 'regression-sign', 'strata-equal']
    ],
    academic: [
        ['class-end-as-mark', 'weighted-mean-plain', 'strata-equal'],
        ['quartile-position', 'percentile-whole', 'mean-deviation-signed'],
        ['variance-not-subtracted', 'cv-upside-down', 'regression-point', 'regression-sign']
    ]
}

export const STATS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    marks: say('Klase-markak', 'Marcas de clase', 'مراكز الفئات', 'Class marks'),
    mean: say('Batez bestekoa', 'Media', 'المتوسط', 'Mean'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    position: say('Posizioa', 'Posición', 'الموقع', 'Position'),
    datum: say('Datua', 'Dato', 'القيمة', 'Datum'),
    variance: say('Bariantza', 'Varianza', 'التباين', 'Variance'),
    sigma: say('Desbideratze tipikoa', 'Desviación típica', 'الانحراف المعياري', 'Standard deviation'),
    cv: say('Aldakuntza-koefizientea', 'Coeficiente de variación', 'معامل الاختلاف', 'Coefficient of variation'),
    deviations: say('Desbideratzeak', 'Desviaciones', 'الانحرافات', 'Deviations'),
    meanDeviation: say('Batez besteko desbideratzea', 'Desviación media', 'الانحراف المتوسط', 'Mean deviation'),
    share: say('Banaketa', 'Reparto', 'التوزيع', 'Share'),
    sample: say('Lagina', 'Muestra', 'العينة', 'Sample'),
    line: say('Erregresio-zuzena', 'Recta de regresión', 'مستقيم الانحدار', 'Regression line'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    estimate: say('Estimazioa', 'Estimación', 'التقدير', 'Estimate')
}

export const statsDetectiveNames: Record<StatsDetectiveError, LocalizedText> = {
    'class-end-as-mark': say('Tartearen muturra hartu du klase-markatzat', 'Tomó el extremo del intervalo como marca de clase', 'اعتبر طرف الفئة مركزًا لها', 'Took the end of the interval as the class mark'),
    'weighted-mean-plain': say('Batez bestekoen batez bestekoa egin du, taldeen tamainak kontuan hartu gabe', 'Hizo la media de las medias sin tener en cuenta el tamaño de los grupos', 'حسب متوسط المتوسطين دون مراعاة حجم المجموعتين', 'Took the mean of the means without the sizes of the groups'),
    'quartile-position': say('Posizioa beherantz biribildu du', 'Redondeó la posición hacia abajo', 'قرّب الموقع إلى الأسفل', 'Rounded the position down'),
    'percentile-whole': say('Posizioa zenbaki osoa denean, ez du hurrengoarekin batez bestekoa egin', 'Con posición entera, no hizo la media con el dato siguiente', 'عندما كان الموقع عددًا صحيحًا لم يأخذ المتوسط مع القيمة التالية', 'With a whole position, did not take the mean with the next datum'),
    'variance-not-subtracted': say('Bariantzan ez du $\\bar{x}^{2}$ kendu', 'En la varianza no restó $\\bar{x}^{2}$', 'لم يطرح $\\bar{x}^{2}$ في التباين', 'Did not subtract $\\bar{x}^{2}$ in the variance'),
    'variance-as-sigma': say('Bariantza eman du desbideratze tipikotzat', 'Dio la varianza como desviación típica', 'أعطى التباين على أنه الانحراف المعياري', 'Gave the variance as the standard deviation'),
    'cv-upside-down': say('Koefizientea alderantziz egin du', 'Hizo el coeficiente al revés', 'حسب المعامل مقلوبًا', 'Worked out the coefficient upside down'),
    'mean-deviation-signed': say('Desbideratzeak zeinuarekin batu ditu, balio absoluturik gabe', 'Sumó las desviaciones con su signo, sin valor absoluto', 'جمع الانحرافات بإشاراتها دون القيمة المطلقة', 'Added the deviations with their signs, without absolute values'),
    'strata-equal': say('Lagina zati berdinetan banatu du, ez proportzionalki', 'Repartió la muestra en partes iguales, no proporcionales', 'وزّع العينة بالتساوي لا بالتناسب', 'Split the sample equally, not in proportion'),
    'regression-point': say('Batez bestekoen puntuan x eta y trukatu ditu', 'Cambió x e y en el punto de las medias', 'بدّل x وy في نقطة المتوسطين', 'Swapped x and y in the mean point'),
    'regression-sign': say('Kendura negatiboaren zeinua galdu du', 'Perdió el signo de la diferencia negativa', 'أضاع إشارة الفرق السالب', 'Lost the sign of the negative difference')
}

export const statsDetectiveTips: Record<StatsDetectiveError, LocalizedText> = {
    'class-end-as-mark': say('Klase-marka tartearen erdiko puntua da: $[10,20)\\to 15$.', 'La marca de clase es el punto medio del intervalo: $[10,20)\\to 15$.', 'مركز الفئة هو منتصفها: $[10,20)\\to 15$.', 'The class mark is the midpoint of the interval: $[10,20)\\to 15$.'),
    'weighted-mean-plain': say('Talde bakoitzaren batez bestekoa bider bere tamaina, eta zati guztiak.', 'Cada media por el tamaño de su grupo, y entre el total.', 'كل متوسط في حجم مجموعته، ثم على المجموع.', 'Each mean times the size of its group, then divide by the total.'),
    'quartile-position': say('$\\frac{N}{4}$ osoa ez bada, hurrengo datua hartzen da.', 'Si $\\frac{N}{4}$ no es entero, se toma el dato siguiente.', 'إذا لم يكن $\\frac{N}{4}$ صحيحًا نأخذ القيمة التالية.', 'If $\\frac{N}{4}$ is not whole, take the next datum.'),
    'percentile-whole': say('Posizioa k osoa bada: $\\frac{x_{k}+x_{k+1}}{2}$.', 'Si la posición k es entera: $\\frac{x_{k}+x_{k+1}}{2}$.', 'إذا كان الموقع k صحيحًا: $\\frac{x_{k}+x_{k+1}}{2}$.', 'If the position k is whole: $\\frac{x_{k}+x_{k+1}}{2}$.'),
    'variance-not-subtracted': say('$\\sigma^{2}=\\frac{\\sum x_{i}^{2}}{N}-\\bar{x}^{2}$.', '$\\sigma^{2}=\\frac{\\sum x_{i}^{2}}{N}-\\bar{x}^{2}$.', '$\\sigma^{2}=\\frac{\\sum x_{i}^{2}}{N}-\\bar{x}^{2}$.', '$\\sigma^{2}=\\frac{\\sum x_{i}^{2}}{N}-\\bar{x}^{2}$.'),
    'variance-as-sigma': say('Desbideratze tipikoa bariantzaren erro karratua da.', 'La desviación típica es la raíz cuadrada de la varianza.', 'الانحراف المعياري هو الجذر التربيعي للتباين.', 'The standard deviation is the square root of the variance.'),
    'cv-upside-down': say('$\\text{CV}=\\frac{\\sigma}{\\bar{x}}$: sakabanatzea batez bestekoaren aldean.', '$\\text{CV}=\\frac{\\sigma}{\\bar{x}}$: la dispersión comparada con la media.', '$\\text{CV}=\\frac{\\sigma}{\\bar{x}}$: التشتت مقارنة بالمتوسط.', '$\\text{CV}=\\frac{\\sigma}{\\bar{x}}$: the spread compared with the mean.'),
    'mean-deviation-signed': say('Zeinuarekin beti 0 ematen du: hartu $|x_{i}-\\bar{x}|$.', 'Con signo siempre da 0: toma $|x_{i}-\\bar{x}|$.', 'مع الإشارة يكون المجموع 0 دائمًا: خذ $|x_{i}-\\bar{x}|$.', 'With signs it always gives 0: take $|x_{i}-\\bar{x}|$.'),
    'strata-equal': say('Geruza bakoitzak bere tamainaren araberako zatia: $n\\cdot\\frac{N_{i}}{N}$.', 'Cada estrato, en proporción a su tamaño: $n\\cdot\\frac{N_{i}}{N}$.', 'كل طبقة بنسبة حجمها: $n\\cdot\\frac{N_{i}}{N}$.', 'Each stratum in proportion to its size: $n\\cdot\\frac{N_{i}}{N}$.'),
    'regression-point': say('Zuzena $(\\bar{x},\\bar{y})$ puntutik pasatzen da: $\\hat{y}-\\bar{y}=m(x-\\bar{x})$.', 'La recta pasa por $(\\bar{x},\\bar{y})$: $\\hat{y}-\\bar{y}=m(x-\\bar{x})$.', 'يمرّ المستقيم بـ$(\\bar{x},\\bar{y})$: $\\hat{y}-\\bar{y}=m(x-\\bar{x})$.', 'The line passes through $(\\bar{x},\\bar{y})$: $\\hat{y}-\\bar{y}=m(x-\\bar{x})$.'),
    'regression-sign': say('x batez bestekoa baino txikiagoa bada, $x-\\bar{x}$ negatiboa da.', 'Si x es menor que la media, $x-\\bar{x}$ es negativo.', 'إذا كان x أصغر من المتوسط فإن $x-\\bar{x}$ سالب.', 'If x is less than the mean, $x-\\bar{x}$ is negative.')
}

type Built = Omit<WorkedCase<StatsDetectiveError>, 'options'>

const hundredths = (value: number) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-9
/** A data list for the text, one formula per datum so long lists can wrap */
const listed = (data: number[]) => data.map((value) => `$${tex(value)}$`).join(', ')
const list = (data: number[]) => data.map(tex).join(',\\ ')
const sum = (data: number[]) => data.reduce((total, value) => total + value, 0)

/** Deviations from the mean that add up to 0 and whose variance is a perfect square (4, 9 or 16) */
const SQUARE_SPREADS = [[-2, -2, 2, 2], [-3, -3, 3, 3], [-3, -1, -1, 5], [-5, 1, 1, 3], [-4, -4, 4, 4], [-3, -1, 0, 1, 3], [-6, -2, 0, 2, 6], [-1, -1, -1, -1, 4]]

/** Small data sets with a whole mean; with `perfect`, a variance that is a perfect square */
function smallData(random: Random, perfect: boolean): { data: number[]; mean: number; squares: number; variance: number } | null {
    let data: number[]
    if (perfect) {
        const spread = pick(random, SQUARE_SPREADS)
        const mean = randomInt(random, 1 - Math.min(...spread), 14 - Math.max(...spread))
        data = spread.map((deviation) => mean + deviation).sort((a, b) => a - b)
    } else {
        data = Array.from({ length: pick(random, [4, 5]) }, () => randomInt(random, 1, 12)).sort((a, b) => a - b)
    }
    const n = data.length
    const mean = sum(data) / n
    const squares = sum(data.map((value) => value * value))
    const variance = squares / n - mean * mean
    if (!Number.isInteger(mean) || !hundredths(squares / n) || variance <= 1) return null
    return { data, mean, squares, variance }
}

function build(random: Random, error: StatsDetectiveError): Built | null {
    switch (error) {
        case 'class-end-as-mark': {
            const width = pick(random, [10, 20])
            const counts = Array.from({ length: 3 }, () => randomInt(random, 1, 8))
            const n = sum(counts)
            if (n !== 10 && n !== 20) return null
            const ends = [1, 2, 3].map((index) => index * width)
            const marks = ends.map((end) => end - width / 2)
            const terms = (values: number[]) => values.map((value, index) => `${value}\\cdot ${counts[index]}`).join('+')
            const right = sum(marks.map((value, index) => value * counts[index])) / n
            const reached = sum(ends.map((value, index) => value * counts[index])) / n
            const table = ends.map((end, index) => `$[${end - width},${end})\\to ${counts[index]}$`).join(', ')
            return {
                problem: say(`Datu taldekatuak: ${table}. Kalkulatu batez bestekoa.`, `Datos agrupados: ${table}. Halla la media.`, `بيانات مجمّعة: ${table}. احسب المتوسط.`, `Grouped data: ${table}. Find the mean.`),
                lines: [line(LABELS.marks, `x_{i}=${ends.join(',\\ ')}`), line(LABELS.mean, `\\bar{x}=\\frac{${terms(ends)}}{${n}}`), line(LABELS.result, `\\bar{x}=${tex(reached)}`)],
                wrong: 0, error, fix: `x_{i}=${marks.join(',\\ ')}\\ \\to\\ \\bar{x}=${tex(right)}`, right, reached
            }
        }
        case 'weighted-mean-plain': {
            const [n1, n2] = shuffle(random, [pick(random, [10, 20]), pick(random, [15, 25, 30])])
            const a = pick(random, [5.5, 6, 6.5, 7, 7.5])
            const b = pick(random, [5, 6.2, 7.2, 8, 8.4])
            const right = (n1 * a + n2 * b) / (n1 + n2)
            const reached = (a + b) / 2
            if (a === b || !hundredths(right) || !hundredths(reached)) return null
            return {
                problem: say(`$${n1}$ ikasleko talde baten batez bestekoa $${tex(a)}$ da, eta $${n2}$ ikaslekoarena, $${tex(b)}$. Zein da guztien batez bestekoa?`, `Un grupo de $${n1}$ alumnos tiene media $${tex(a)}$, y otro de $${n2}$, media $${tex(b)}$. ¿Cuál es la media de todos?`, `مجموعة من $${n1}$ تلميذًا متوسطها $${tex(a)}$، وأخرى من $${n2}$ متوسطها $${tex(b)}$. ما متوسط الجميع؟`, `A group of $${n1}$ students has a mean of $${tex(a)}$, and another of $${n2}$ a mean of $${tex(b)}$. What is the mean of them all?`),
                lines: [line(LABELS.mean, `\\bar{x}=\\frac{${tex(a)}+${tex(b)}}{2}`), line(LABELS.substitute, `\\bar{x}=\\frac{${tex(a + b)}}{2}`), line(LABELS.result, `\\bar{x}=${tex(reached)}`)],
                wrong: 0, error, fix: `\\bar{x}=\\frac{${n1}\\cdot ${tex(a)}+${n2}\\cdot ${tex(b)}}{${n1 + n2}}=${tex(right)}`, right, reached
            }
        }
        case 'quartile-position': {
            const n = pick(random, [9, 10, 11, 13, 14, 15])
            const data = Array.from({ length: n }, () => randomInt(random, 1, 20)).sort((a, b) => a - b)
            const low = Math.floor(n / 4)
            const [place] = percentilePlaces(n, 25)
            if (data[low - 1] === data[place - 1]) return null
            return {
                problem: say(`Datu ordenatuak: ${listed(data)}. Kalkulatu $Q_{1}$.`, `Datos ordenados: ${listed(data)}. Halla $Q_{1}$.`, `بيانات مرتّبة: ${listed(data)}. أوجد $Q_{1}$.`, `Sorted data: ${listed(data)}. Find $Q_{1}$.`),
                lines: [line(LABELS.position, `\\frac{N}{4}=\\frac{${n}}{4}=${tex(n / 4)}`), line(LABELS.datum, `Q_{1}=x_{${low}}`), line(LABELS.result, `Q_{1}=${data[low - 1]}`)],
                wrong: 1, error, fix: `Q_{1}=x_{${place}}=${data[place - 1]}`, right: data[place - 1], reached: data[low - 1]
            }
        }
        case 'percentile-whole': {
            const n = pick(random, [8, 12, 16, 20])
            const data = Array.from({ length: n }, () => randomInt(random, 1, 20)).sort((a, b) => a - b)
            const [k, next] = percentilePlaces(n, 75)
            const right = (data[k - 1] + data[next - 1]) / 2
            if (data[k - 1] === data[next - 1]) return null
            return {
                problem: say(`Datu ordenatuak: ${listed(data)}. Kalkulatu $Q_{3}$.`, `Datos ordenados: ${listed(data)}. Halla $Q_{3}$.`, `بيانات مرتّبة: ${listed(data)}. أوجد $Q_{3}$.`, `Sorted data: ${listed(data)}. Find $Q_{3}$.`),
                lines: [line(LABELS.position, `\\frac{3N}{4}=\\frac{3\\cdot ${n}}{4}=${k}`), line(LABELS.datum, `Q_{3}=x_{${k}}`), line(LABELS.result, `Q_{3}=${data[k - 1]}`)],
                wrong: 1, error, fix: `Q_{3}=\\frac{x_{${k}}+x_{${next}}}{2}=${tex(right)}`, right, reached: data[k - 1]
            }
        }
        case 'variance-not-subtracted':
        case 'variance-as-sigma': {
            const made = smallData(random, true)
            if (!made) return null
            const { data, mean, squares, variance } = made
            const sigma = Math.sqrt(variance)
            const problem = say(`Datuak: $${list(data)}$. Kalkulatu desbideratze tipikoa, $\\sigma$.`, `Datos: $${list(data)}$. Halla la desviación típica $\\sigma$.`, `البيانات: $${list(data)}$. أوجد الانحراف المعياري $\\sigma$.`, `Data: $${list(data)}$. Find the standard deviation $\\sigma$.`)
            const meanLine = line(LABELS.mean, `\\bar{x}=\\frac{${sum(data)}}{${data.length}}=${mean}`)
            if (error === 'variance-not-subtracted') {
                const wrongVariance = squares / data.length
                const reached = Math.round(Math.sqrt(wrongVariance) * 100) / 100
                return {
                    problem,
                    lines: [meanLine, line(LABELS.variance, `\\sigma^{2}=\\frac{${squares}}{${data.length}}=${tex(wrongVariance)}`), line(LABELS.sigma, `\\sigma=\\sqrt{${tex(wrongVariance)}}\\approx ${tex(reached)}`)],
                    wrong: 1, error, fix: `\\sigma^{2}=${tex(wrongVariance)}-${mean}^{2}=${variance}\\ \\to\\ \\sigma=${sigma}`, right: sigma, reached
                }
            }
            return {
                problem,
                lines: [meanLine, line(LABELS.variance, `\\sigma^{2}=\\frac{${squares}}{${data.length}}-${mean}^{2}=${variance}`), line(LABELS.sigma, `\\sigma=${variance}`)],
                wrong: 2, error, fix: `\\sigma=\\sqrt{${variance}}=${sigma}`, right: sigma, reached: variance
            }
        }
        case 'cv-upside-down': {
            const mean = pick(random, [20, 25, 40, 50, 80])
            const sigma = pick(random, [2, 4, 5, 8, 10])
            if (!hundredths(sigma / mean) || !hundredths(mean / sigma)) return null
            return {
                problem: say(`Talde batean $\\bar{x}=${mean}$ eta $\\sigma=${sigma}$. Kalkulatu aldakuntza-koefizientea.`, `En un grupo, $\\bar{x}=${mean}$ y $\\sigma=${sigma}$. Halla el coeficiente de variación.`, `في مجموعة $\\bar{x}=${mean}$ و$\\sigma=${sigma}$. احسب معامل الاختلاف.`, `In a group, $\\bar{x}=${mean}$ and $\\sigma=${sigma}$. Find the coefficient of variation.`),
                lines: [line(LABELS.mean, `\\bar{x}=${mean}`), line(LABELS.sigma, `\\sigma=${sigma}`), line(LABELS.cv, `\\text{CV}=\\frac{${mean}}{${sigma}}=${tex(mean / sigma)}`)],
                wrong: 2, error, fix: `\\text{CV}=\\frac{${sigma}}{${mean}}=${tex(sigma / mean)}`, right: sigma / mean, reached: mean / sigma
            }
        }
        case 'mean-deviation-signed': {
            const made = smallData(random, false)
            if (!made) return null
            const { data, mean } = made
            const absolute = sum(data.map((value) => Math.abs(value - mean)))
            const right = absolute / data.length
            if (!hundredths(right)) return null
            return {
                problem: say(`Datuak: $${list(data)}$. Kalkulatu batez besteko desbideratzea.`, `Datos: $${list(data)}$. Halla la desviación media.`, `البيانات: $${list(data)}$. أوجد الانحراف المتوسط.`, `Data: $${list(data)}$. Find the mean deviation.`),
                lines: [line(LABELS.mean, `\\bar{x}=${mean}`), line(LABELS.deviations, `\\sum(x_{i}-\\bar{x})=0`), line(LABELS.meanDeviation, `\\text{DM}=\\frac{0}{${data.length}}=0`)],
                wrong: 1, error, fix: `\\text{DM}=\\frac{${absolute}}{${data.length}}=${tex(right)}`, right, reached: 0
            }
        }
        case 'strata-equal': {
            const sizes = Array.from({ length: 4 }, () => pick(random, [100, 150, 200, 250, 300]))
            const total = sum(sizes)
            const n = pick(random, [40, 60, 80, 100])
            const index = randomInt(random, 0, 3)
            const right = (n * sizes[index]) / total
            const letter = 'ABCD'[index]
            if (!Number.isInteger(right) || right === n / 4 || !Number.isInteger(n / 4)) return null
            const courses = sizes.map((size, position) => `${'ABCD'[position]} ($${size}$)`)
            return {
                problem: say(`Institutu batek lau maila ditu: ${courses.slice(0, 3).join(', ')} eta ${courses[3]}. $${n}$ ikasleko lagin geruzatua hartu da. Zenbat ikasle ${letter} mailatik?`, `Un instituto tiene cuatro cursos: ${courses.slice(0, 3).join(', ')} y ${courses[3]}. Se toma una muestra estratificada de $${n}$. ¿Cuántos alumnos de ${letter}?`, `في معهد أربعة صفوف: ${courses.slice(0, 3).join(' و')} و${courses[3]}. أُخذت عينة طبقية من $${n}$. كم تلميذًا من ${letter}؟`, `A school has four year groups: ${courses.slice(0, 3).join(', ')} and ${courses[3]}. A stratified sample of $${n}$ is taken. How many students from ${letter}?`),
                lines: [line(LABELS.share, `\\frac{${n}}{4}=${n / 4}`), line(LABELS.sample, `n_{i}=${n / 4}`), line(LABELS.result, `n_{${letter}}=${n / 4}`)],
                wrong: 0, error, fix: `n_{${letter}}=${n}\\cdot\\frac{${sizes[index]}}{${total}}=${right}`, right, reached: n / 4
            }
        }
        case 'regression-point':
        case 'regression-sign': {
            const xm = randomInt(random, 4, 8)
            const ym = randomInt(random, 10, 30)
            const m = error === 'regression-sign' ? pick(random, [0.5, 1.5, 2, 2.5]) : pick(random, [0.5, 1.5, 2, -0.5, -1.5])
            const x = error === 'regression-sign' ? randomInt(random, 1, xm - 1) : randomInt(random, 1, 10)
            if (x === xm) return null
            const right = ym + m * (x - xm)
            const signed = (value: number) => (value < 0 ? `-${tex(-value)}` : `+${tex(value)}`)
            const problem = say(`Erregresio-zuzenaren malda $m=${tex(m)}$ da, eta batez bestekoen puntua $(${xm},\\ ${ym})$. Estimatu $y$, $x=${x}$ denean.`, `La recta de regresión tiene pendiente $m=${tex(m)}$ y el punto de las medias es $(${xm},\\ ${ym})$. Estima $y$ para $x=${x}$.`, `ميل مستقيم الانحدار $m=${tex(m)}$ ونقطة المتوسطين $(${xm},\\ ${ym})$. قدّر $y$ عندما $x=${x}$.`, `The regression line has slope $m=${tex(m)}$ and the mean point is $(${xm},\\ ${ym})$. Estimate $y$ for $x=${x}$.`)
            if (error === 'regression-point') {
                const reached = xm + m * (x - ym)
                return {
                    problem,
                    lines: [line(LABELS.line, `\\hat{y}-${xm}=${tex(m)}(x-${ym})`), line(LABELS.substitute, `\\hat{y}=${xm}${signed(m)}(${x}-${ym})`), line(LABELS.estimate, `\\hat{y}=${tex(reached)}`)],
                    wrong: 0, error, fix: `\\hat{y}=${ym}${signed(m)}(${x}-${xm})\\ \\to\\ \\hat{y}=${tex(right)}`, right, reached
                }
            }
            const reached = ym + m * (xm - x)
            return {
                problem,
                lines: [line(LABELS.line, `\\hat{y}=${ym}+${tex(m)}(${x}-${xm})`), line(LABELS.substitute, `\\hat{y}=${ym}+${tex(m)}\\cdot ${xm - x}`), line(LABELS.estimate, `\\hat{y}=${tex(reached)}`)],
                wrong: 1, error, fix: `\\hat{y}=${ym}-${tex(m)}\\cdot ${xm - x}=${tex(right)}`, right, reached
            }
        }
    }
}

export const createStatsDetectiveCases = (track: StatsTrack) => (random: Random, levelIndex: number) => createWorkedCases(random, statsDetectiveLevels[track][levelIndex], STATS_DETECTIVE_CASES, build)
