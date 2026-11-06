import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J4 · Estatistikaren detektibea (Detective de estadística): a worked
   solution of three lines with one wrong line, the mistakes of this unit.
   Level 1 (tables and centre): the lower limit taken as the class mark,
   the median of unsorted data, a table mean divided by the number of
   values, the missing datum taken as the mean. Level 2 (position and
   spread): a percentile position that is not whole rounded down, the
   fence without the 1,5, the variance without − x̄², the CV upside down.
   Level 3 (interpret): z divided by σ², the band x̄ ± 3σ², adding a number
   that changes σ, and with times the larger z taken as the better one.
   Percentiles are only asked where the web and textbook rules agree.
   `right` and `reached` only tell the cases apart.
   ========================================================================== */

export type BachStatsDetectiveError =
    | 'class-mark'
    | 'median-unsorted'
    | 'mean-count'
    | 'missing-mean'
    | 'position-floor'
    | 'fence-factor'
    | 'variance-square'
    | 'cv-inverse'
    | 'z-variance'
    | 'band-variance'
    | 'shift-sigma'
    | 'times-sign'

export const bachStatsDetectiveLevels: BachStatsDetectiveError[][] = [
    ['class-mark', 'median-unsorted', 'mean-count', 'missing-mean'],
    ['position-floor', 'fence-factor', 'variance-square', 'cv-inverse'],
    ['z-variance', 'band-variance', 'shift-sigma', 'times-sign']
]

export const BACH_STATS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
/** A decimal for LaTeX: 2{,}5, 12, -0{,}5 */
const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
const list = (values: number[]) => values.join(',\\ ')
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    data: say('Datuak', 'Datos', 'البيانات', 'Data'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    compare: say('Konparatu', 'Compara', 'قارن', 'Compare')
}

export const bachStatsDetectiveNames: Record<BachStatsDetectiveError, LocalizedText> = {
    'class-mark': say('Tartearen beheko muga hartu du klase-markatzat', 'Tomó el extremo inferior como marca de clase', 'أخذ الحد الأدنى للفئة مركزًا لها', 'Took the lower limit as the class mark'),
    'median-unsorted': say('Mediana bilatu du datuak ordenatu gabe', 'Buscó la mediana sin ordenar los datos', 'بحث عن الوسيط دون ترتيب البيانات', 'Looked for the median without sorting the data'),
    'mean-count': say('Balio kopuruaz zatitu du, ez datu kopuruaz', 'Dividió entre el número de valores, no de datos', 'قسم على عدد القيم لا على عدد البيانات', 'Divided by the number of values, not of data'),
    'missing-mean': say('Falta den datua batez bestekoa dela uste izan du', 'Creyó que el dato que falta es la media', 'ظن أن البيان الناقص هو المتوسط', 'Thought the missing datum is the mean'),
    'position-floor': say('Posizio ez-osoa behera biribildu du', 'Redondeó hacia abajo una posición no entera', 'قرّب موضعًا غير صحيح إلى الأسفل', 'Rounded a non-whole position down'),
    'fence-factor': say('Muga kalkulatzean 1,5 ahaztu du', 'Olvidó el 1,5 al calcular el límite', 'نسي 1.5 عند حساب الحد', 'Forgot the 1.5 when working out the limit'),
    'variance-square': say('Bariantzan ez du $\\bar{x}^2$ kendu', 'En la varianza no restó $\\bar{x}^2$', 'لم يطرح $\\bar{x}^2$ في التباين', 'Did not subtract $\\bar{x}^2$ in the variance'),
    'cv-inverse': say('$CV$ alderantziz idatzi du', 'Escribió el $CV$ al revés', 'كتب $CV$ مقلوبًا', 'Wrote the $CV$ upside down'),
    'z-variance': say('Bariantzaz zatitu du, ez $\\sigma$ zenbakiaz', 'Dividió entre la varianza, no entre $\\sigma$', 'قسم على التباين لا على $\\sigma$', 'Divided by the variance, not by $\\sigma$'),
    'band-variance': say('Banda $\\sigma^2$ erabilita kalkulatu du', 'Calculó la banda con $\\sigma^2$', 'حسب النطاق باستعمال $\\sigma^2$', 'Worked out the band with $\\sigma^2$'),
    'shift-sigma': say('Zenbaki bat batzeak $\\sigma$ aldatzen duela uste izan du', 'Creyó que sumar un número cambia $\\sigma$', 'ظن أن إضافة عدد تغيّر $\\sigma$', 'Thought adding a number changes $\\sigma$'),
    'times-sign': say('Denboretan, $z$ handiena hartu du onentzat', 'En tiempos tomó la $z$ más alta como la mejor', 'في الأزمنة اعتبر $z$ الأكبر هي الأفضل', 'With times, took the larger $z$ as the better one')
}

export const bachStatsDetectiveTips: Record<BachStatsDetectiveError, LocalizedText> = {
    'class-mark': say('Klase-marka tartearen erdiko puntua da: $\\frac{a+b}{2}$.', 'La marca de clase es el punto medio del intervalo: $\\frac{a+b}{2}$.', 'مركز الفئة منتصفها: $\\frac{a+b}{2}$.', 'The class mark is the midpoint of the interval: $\\frac{a+b}{2}$.'),
    'median-unsorted': say('Lehenik ordenatu, gero hartu erdikoa.', 'Primero ordena; después toma el central.', 'رتّب أولًا ثم خذ الأوسط.', 'Sort first; then take the middle one.'),
    'mean-count': say('$N$ datu kopurua da, maiztasunen batura: $\\sum f_i$.', '$N$ es el número de datos, la suma de las frecuencias: $\\sum f_i$.', '$N$ عدد البيانات، أي مجموع التكرارات $\\sum f_i$.', '$N$ is the number of data, the sum of the frequencies: $\\sum f_i$.'),
    'missing-mean': say('Batez bestekoak batura ematen du: $N\\cdot\\bar{x}$; kendu ezagunak.', 'La media da la suma: $N\\cdot\\bar{x}$; resta los conocidos.', 'المتوسط يعطي المجموع $N\\cdot\\bar{x}$؛ اطرح المعروفة.', 'The mean gives the sum: $N\\cdot\\bar{x}$; subtract the known ones.'),
    'position-floor': say('Posizioa osoa ez denean, hurrengo datua hartzen da.', 'Si la posición no es entera, se toma el dato siguiente.', 'إذا لم يكن الموضع صحيحًا نأخذ البيان التالي.', 'If the position is not whole, take the next datum.'),
    'fence-factor': say('Muga $Q_3+1{,}5\\cdot(Q_3-Q_1)$ da.', 'El límite es $Q_3+1{,}5\\cdot(Q_3-Q_1)$.', 'الحد هو $Q_3+1{,}5\\cdot(Q_3-Q_1)$.', 'The limit is $Q_3+1{,}5\\cdot(Q_3-Q_1)$.'),
    'variance-square': say('$\\sigma^2$ karratuen batez bestekoa ken $\\bar{x}^2$ da.', '$\\sigma^2$ es la media de los cuadrados menos $\\bar{x}^2$.', '$\\sigma^2$ هو متوسط المربعات ناقص $\\bar{x}^2$.', '$\\sigma^2$ is the mean of the squares minus $\\bar{x}^2$.'),
    'cv-inverse': say('$CV=\\frac{\\sigma}{\\bar{x}}$: $\\sigma$ goian.', '$CV=\\frac{\\sigma}{\\bar{x}}$: $\\sigma$ arriba.', '$CV=\\frac{\\sigma}{\\bar{x}}$: $\\sigma$ في الأعلى.', '$CV=\\frac{\\sigma}{\\bar{x}}$: $\\sigma$ on top.'),
    'z-variance': say('Puntuazio tipikoa desbideratze tipikotan neurtzen da: zatitu $\\sigma$ zenbakiaz.', 'La puntuación típica se mide en desviaciones típicas: divide entre $\\sigma$.', 'تُقاس الدرجة المعيارية بالانحرافات المعيارية: اقسم على $\\sigma$.', 'The standard score is measured in standard deviations: divide by $\\sigma$.'),
    'band-variance': say('Banda $\\bar{x}\\pm 3\\sigma$ da, datuen unitateetan.', 'La banda es $\\bar{x}\\pm 3\\sigma$, en las unidades de los datos.', 'النطاق هو $\\bar{x}\\pm 3\\sigma$ بوحدات البيانات.', 'The band is $\\bar{x}\\pm 3\\sigma$, in the units of the data.'),
    'shift-sigma': say('Zenbaki bat batzean datuak batera mugitzen dira: $\\sigma$ ez da aldatzen.', 'Al sumar un número los datos se mueven juntos: $\\sigma$ no cambia.', 'عند إضافة عدد تتحرك البيانات معًا: $\\sigma$ لا يتغيّر.', 'Adding a number moves the data together: $\\sigma$ does not change.'),
    'times-sign': say('Denboretan gutxiago hobe da: $z$ negatiboena da nabarmenena.', 'En tiempos, menos es mejor: destaca la $z$ más negativa.', 'في الأزمنة الأقل أفضل: تتميّز $z$ الأكثر سلبية.', 'With times, less is better: the most negative $z$ stands out.')
}

type Built = Omit<WorkedCase<BachStatsDetectiveError>, 'options'>

function build(random: Random, error: BachStatsDetectiveError): Built | null {
    switch (error) {
        case 'class-mark': {
            const start = pick(random, [10, 20, 30])
            const p = randomInt(random, 1, 6)
            const q = randomInt(random, 1, 6)
            const total = p + q
            if (![2, 4, 5, 10].includes(total)) return null
            const wrongSum = p * start + q * (start + 10)
            const reached = wrongSum / total
            const right = reached + 5
            return {
                problem: say(`Kalkulatu batez bestekoa: $[${start},${start + 10})$ tartean ${p} datu, $[${start + 10},${start + 20})$ tartean ${q}.`, `Calcula la media: en $[${start},${start + 10})$ hay ${p} datos y en $[${start + 10},${start + 20})$, ${q}.`, `احسب المتوسط: في $[${start},${start + 10})$ ${p} بيانات وفي $[${start + 10},${start + 20})$ ${q}.`, `Work out the mean: $[${start},${start + 10})$ has ${p} data and $[${start + 10},${start + 20})$ has ${q}.`),
                lines: [line(LABELS.data, `x_1=${start},\\ x_2=${start + 10}`), line(LABELS.step, `${p}\\cdot ${start}+${q}\\cdot ${start + 10}=${wrongSum}`), line(LABELS.result, `\\bar{x}=\\frac{${wrongSum}}{${total}}=${tex(reached)}`)],
                wrong: 0, error, fix: `x_1=${start + 5},\\ x_2=${start + 15}\\ \\to\\ \\bar{x}=${tex(right)}`, right, reached
            }
        }
        case 'median-unsorted': {
            const data = Array.from({ length: 5 }, () => randomInt(random, 1, 15))
            const sum = data.reduce((total, value) => total + value, 0)
            if (sum % 5 !== 0 || new Set(data).size < 5) return null
            const sorted = [...data].sort((a, b) => a - b)
            if (sorted[2] === data[2]) return null
            const mean = sum / 5
            return {
                problem: say(`Aurkitu $${list(data)}$ datuen mediana, eta konparatu batez bestekoarekin.`, `Halla la mediana de $${list(data)}$ y compárala con la media.`, `أوجد وسيط $${list(data)}$ وقارنه بالمتوسط.`, `Find the median of $${list(data)}$ and compare it with the mean.`),
                lines: [line(LABELS.step, `\\frac{5+1}{2}=3`), line(LABELS.result, `Me=${data[2]}`), line(LABELS.compare, `\\bar{x}-Me=${mean}-${data[2]}=${mean - data[2]}`)],
                wrong: 1, error, fix: `${list(sorted)}\\ \\to\\ Me=${sorted[2]}`, right: sorted[2], reached: data[2]
            }
        }
        case 'mean-count': {
            const counts = Array.from({ length: 4 }, () => randomInt(random, 1, 6))
            const total = counts.reduce((acc, count) => acc + count, 0)
            const sum = counts.reduce((acc, count, index) => acc + count * (index + 1), 0)
            const right = sum / total
            const reached = sum / 4
            if (Math.round(right * 100) !== right * 100) return null
            return {
                problem: say(`1, 2, 3 eta 4 balioen maiztasunak $${list(counts)}$ dira. Kalkulatu batez bestekoa.`, `Los valores 1, 2, 3 y 4 tienen frecuencias $${list(counts)}$. Calcula la media.`, `للقيم 1 و2 و3 و4 التكرارات $${list(counts)}$. احسب المتوسط.`, `The values 1, 2, 3 and 4 have frequencies $${list(counts)}$. Work out the mean.`),
                lines: [line(LABELS.step, `\\sum f_i x_i=${sum}`), line(LABELS.data, 'N=4'), line(LABELS.result, `\\bar{x}=\\frac{${sum}}{4}=${tex(reached)}`)],
                wrong: 1, error, fix: `N=${total}\\ \\to\\ \\bar{x}=\\frac{${sum}}{${total}}=${tex(right)}`, right, reached
            }
        }
        case 'missing-mean': {
            const known = Array.from({ length: 3 }, () => randomInt(random, 2, 9))
            const mean = randomInt(random, 4, 8)
            const sum = known.reduce((acc, value) => acc + value, 0)
            const right = 4 * mean - sum
            if (right < 0 || right > 12 || right === mean) return null
            return {
                problem: say(`Lau datuen batez bestekoa ${mean} da; hiru $${list(known)}$ dira. Zein da laugarrena?`, `Cuatro datos tienen media ${mean}; tres son $${list(known)}$. ¿Cuál es el cuarto?`, `لأربعة بيانات متوسط ${mean}؛ ثلاثة منها $${list(known)}$. ما الرابع؟`, `Four data have a mean of ${mean}; three are $${list(known)}$. What is the fourth?`),
                lines: [line(LABELS.step, `4\\cdot ${mean}=${4 * mean}`), line(LABELS.result, `x=${mean}`), line(LABELS.compare, `${known.join('+')}+${mean}=${sum + mean}`)],
                wrong: 1, error, fix: `x=${4 * mean}-${sum}=${right}`, right, reached: mean
            }
        }
        case 'position-floor': {
            // Q₁ of N = 30, 50 or 70 data: the position 7,5, 12,5 or 17,5 falls between the last 1 and the first 2
            const total = pick(random, [30, 50, 70])
            const position = total / 4
            const ones = Math.floor(position)
            const rest = total - ones
            const twos = randomInt(random, 3, rest - 6)
            const threes = randomInt(random, 2, rest - twos - 2)
            const fours = rest - twos - threes
            if (fours < 1) return null
            const counts = [ones, twos, threes, fours]
            return {
                problem: say(`1, 2, 3 eta 4 balioen maiztasunak $${list(counts)}$ dira. Aurkitu $Q_1$.`, `Los valores 1, 2, 3 y 4 tienen frecuencias $${list(counts)}$. Halla $Q_1$.`, `للقيم 1 و2 و3 و4 التكرارات $${list(counts)}$. أوجد $Q_1$.`, `The values 1, 2, 3 and 4 have frequencies $${list(counts)}$. Find $Q_1$.`),
                lines: [line(LABELS.step, `${total}\\cdot 0{,}25=${tex(position)}`), line(LABELS.step, `${tex(position)}\\ \\to\\ ${ones}`), line(LABELS.result, 'Q_1=1')],
                wrong: 1, error, fix: `${tex(position)}\\ \\to\\ ${ones + 1}\\ \\to\\ Q_1=2`, right: 2, reached: 1
            }
        }
        case 'fence-factor': {
            const q1 = randomInt(random, 5, 20)
            const range = 2 * randomInt(random, 2, 5)
            const q3 = q1 + range
            const datum = q3 + range + randomInt(random, 1, range / 2 - 1)
            const right = q3 + 1.5 * range
            if (datum >= right) return null
            return {
                problem: say(`$Q_1=${q1}$ eta $Q_3=${q3}$. Atipikoa al da ${datum} datua?`, `$Q_1=${q1}$ y $Q_3=${q3}$. ¿Es atípico el dato ${datum}?`, `$Q_1=${q1}$ و$Q_3=${q3}$. هل البيان ${datum} شاذ؟`, `$Q_1=${q1}$ and $Q_3=${q3}$. Is the datum ${datum} an outlier?`),
                lines: [line(LABELS.step, `Q_3-Q_1=${range}`), line(LABELS.step, `${q3}+${range}=${q3 + range}`), line(LABELS.result, `${datum}>${q3 + range}`)],
                wrong: 1, error, fix: `${q3}+1{,}5\\cdot ${range}=${tex(right)}\\ \\to\\ ${datum}<${tex(right)}`, right, reached: q3 + range
            }
        }
        case 'variance-square': {
            const centre = randomInt(random, 3, 9)
            const d = randomInt(random, 1, 3)
            const data = [centre - d, centre - d, centre + d, centre + d]
            const reached = centre * centre + d * d
            return {
                problem: say(`Kalkulatu $${list(data)}$ datuen bariantza.`, `Calcula la varianza de $${list(data)}$.`, `احسب تباين $${list(data)}$.`, `Work out the variance of $${list(data)}$.`),
                lines: [line(LABELS.step, `\\bar{x}=${centre}`), line(LABELS.step, `\\frac{\\sum x_i^2}{4}=${reached}`), line(LABELS.result, `\\sigma^2=${reached}`)],
                wrong: 2, error, fix: `\\sigma^2=${reached}-${centre}^2=${d * d}`, right: d * d, reached
            }
        }
        case 'cv-inverse': {
            const mean = pick(random, [20, 25, 40, 50])
            const sigma = pick(random, [2, 4, 5, 10].filter((value) => mean % value === 0))
            return {
                problem: say(`$\\bar{x}=${mean}$ eta $\\sigma=${sigma}$. Kalkulatu aldakuntza-koefizientea.`, `$\\bar{x}=${mean}$ y $\\sigma=${sigma}$. Calcula el coeficiente de variación.`, `$\\bar{x}=${mean}$ و$\\sigma=${sigma}$. احسب معامل الاختلاف.`, `$\\bar{x}=${mean}$ and $\\sigma=${sigma}$. Work out the coefficient of variation.`),
                lines: [line(LABELS.data, `\\bar{x}=${mean}`), line(LABELS.data, `\\sigma=${sigma}`), line(LABELS.result, `CV=\\frac{${mean}}{${sigma}}=${mean / sigma}`)],
                wrong: 2, error, fix: `CV=\\frac{${sigma}}{${mean}}=${tex(sigma / mean)}`, right: sigma / mean, reached: mean / sigma
            }
        }
        case 'z-variance': {
            const mean = randomInt(random, 40, 70)
            const sigma = pick(random, [2, 4, 5])
            const z = pick(random, [1, 1.5, 2, -1, -2])
            const datum = mean + z * sigma
            if (!Number.isInteger(datum)) return null
            const diff = datum - mean
            const reached = diff / (sigma * sigma)
            return {
                problem: say(`$\\bar{x}=${mean}$ eta $\\sigma=${sigma}$. Kalkulatu ${datum} datuaren puntuazio tipikoa.`, `$\\bar{x}=${mean}$ y $\\sigma=${sigma}$. Calcula la puntuación típica del dato ${datum}.`, `$\\bar{x}=${mean}$ و$\\sigma=${sigma}$. احسب الدرجة المعيارية للبيان ${datum}.`, `$\\bar{x}=${mean}$ and $\\sigma=${sigma}$. Work out the standard score of the datum ${datum}.`),
                lines: [line(LABELS.step, `x-\\bar{x}=${datum}-${mean}=${diff}`), line(LABELS.step, `\\sigma^2=${sigma * sigma}`), line(LABELS.result, `z=\\frac{${diff}}{${sigma * sigma}}=${tex(reached)}`)],
                wrong: 2, error, fix: `z=\\frac{${diff}}{${sigma}}=${tex(z)}`, right: z, reached
            }
        }
        case 'band-variance': {
            const mean = randomInt(random, 20, 50)
            const sigma = randomInt(random, 2, 4)
            const right = mean + 3 * sigma
            const wrongLimit = mean + 3 * sigma * sigma
            const datum = right + randomInt(random, 1, wrongLimit - right - 1)
            if (datum >= wrongLimit) return null
            return {
                problem: say(`$\\bar{x}=${mean}$ eta $\\sigma=${sigma}$. Atipikoa al da ${datum} datua $\\bar{x}\\pm 3\\sigma$ arauarekin?`, `$\\bar{x}=${mean}$ y $\\sigma=${sigma}$. ¿Es atípico el dato ${datum} con la regla $\\bar{x}\\pm 3\\sigma$?`, `$\\bar{x}=${mean}$ و$\\sigma=${sigma}$. هل البيان ${datum} شاذ بقاعدة $\\bar{x}\\pm 3\\sigma$؟`, `$\\bar{x}=${mean}$ and $\\sigma=${sigma}$. Is the datum ${datum} an outlier with the $\\bar{x}\\pm 3\\sigma$ rule?`),
                lines: [line(LABELS.step, `\\sigma^2=${sigma * sigma}`), line(LABELS.step, `${mean}+3\\cdot ${sigma * sigma}=${wrongLimit}`), line(LABELS.result, `${datum}<${wrongLimit}`)],
                wrong: 1, error, fix: `${mean}+3\\cdot ${sigma}=${right}\\ \\to\\ ${datum}>${right}`, right, reached: wrongLimit
            }
        }
        case 'shift-sigma': {
            const mean = randomInt(random, 5, 20)
            const sigma = randomInt(random, 2, 6)
            const b = randomInt(random, 2, 10)
            return {
                problem: say(`Datu batzuek $\\bar{x}=${mean}$ eta $\\sigma=${sigma}$ dituzte. Guztiei ${b} batzen zaie. Nola geratzen dira?`, `Unos datos tienen $\\bar{x}=${mean}$ y $\\sigma=${sigma}$. A todos se les suma ${b}. ¿Cómo quedan?`, `لبيانات $\\bar{x}=${mean}$ و$\\sigma=${sigma}$. أُضيف ${b} إلى كل منها. كيف تصبح؟`, `Some data have $\\bar{x}=${mean}$ and $\\sigma=${sigma}$. ${b} is added to all of them. What are they like now?`),
                lines: [line(LABELS.step, `\\bar{y}=${mean}+${b}=${mean + b}`), line(LABELS.step, `\\sigma_y=${sigma}+${b}=${sigma + b}`), line(LABELS.result, `CV_y=\\frac{${sigma + b}}{${mean + b}}`)],
                wrong: 1, error, fix: `\\sigma_y=\\sigma=${sigma}`, right: sigma, reached: sigma + b
            }
        }
        case 'times-sign': {
            // Two runners: A is two deviations under the mean, B one; with times, A stands out
            const meanA = 10 * randomInt(random, 12, 15)
            const meanB = meanA + 10 * randomInt(random, 1, 3)
            const sdA = 2 * randomInt(random, 1, 2)
            const sdB = 2 * randomInt(random, 2, 3)
            const [zA, zB] = shuffle(random, [[-2, -1], [-1.5, -0.5], [-2, -0.5]])[0]
            const timeA = meanA + zA * sdA
            const timeB = meanB + zB * sdB
            if (!Number.isInteger(timeA) || !Number.isInteger(timeB)) return null
            const t = (value: number) => tex(value / 10)
            return {
                problem: say(`Korrikalari batek $${t(timeA)}$ s egin ditu (batez bestekoa $${t(meanA)}$, $\\sigma=${t(sdA)}$), eta beste batek $${t(timeB)}$ s ($${t(meanB)}$, $\\sigma=${t(sdB)}$). Nork nabarmentzen du gehiago?`, `Un corredor hace $${t(timeA)}$ s (media $${t(meanA)}$, $\\sigma=${t(sdA)}$) y otro $${t(timeB)}$ s ($${t(meanB)}$, $\\sigma=${t(sdB)}$). ¿Quién destaca más?`, `عدّاء سجّل $${t(timeA)}$ ث (المتوسط $${t(meanA)}$، $\\sigma=${t(sdA)}$) وآخر $${t(timeB)}$ ث ($${t(meanB)}$، $\\sigma=${t(sdB)}$). من يتميّز أكثر؟`, `One runner takes $${t(timeA)}$ s (mean $${t(meanA)}$, $\\sigma=${t(sdA)}$) and another $${t(timeB)}$ s ($${t(meanB)}$, $\\sigma=${t(sdB)}$). Who stands out more?`),
                lines: [line(LABELS.step, `z_A=\\frac{${t(timeA)}-${t(meanA)}}{${t(sdA)}}=${tex(zA)}`), line(LABELS.step, `z_B=\\frac{${t(timeB)}-${t(meanB)}}{${t(sdB)}}=${tex(zB)}`), line(LABELS.result, `${tex(zB)}>${tex(zA)}\\ \\to\\ B`)],
                wrong: 2, error, fix: `${tex(zA)}<${tex(zB)}\\ \\to\\ A`, right: zA, reached: zB
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBachStatsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bachStatsDetectiveLevels[levelIndex], BACH_STATS_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
