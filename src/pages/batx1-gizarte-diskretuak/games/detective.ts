import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { binomialPmfDecimal, choose } from '../../batx2-zientziak-banaketak/binomial.ts'

/* ==========================================================================
   J4 · Banaketen detektibea (Detective de distribuciones), 1.º Sociales: a
   worked solution of three lines with one wrong line. Level 1 (the
   table): the mean as the plain mean of the values, σ without taking off
   μ², σ left as the variance, and the gain without the price. Level 2
   (binomial): the binomial coefficient left out, «more than k» taken with
   k inside, «at least one» as 1 − pⁿ, and σ = npq. Level 3 (fit): p over
   the number of data, the expected values left as probabilities, the
   signed differences adding up to 0, and the difference compared with 5
   instead of 5 % of the total. `right` and `reached` tell the cases apart.
   ========================================================================== */

export type DiscreteBatx1gDetectiveError =
    | 'mean-plain'
    | 'sd-no-square'
    | 'sd-is-variance'
    | 'gain-no-price'
    | 'no-coefficient'
    | 'more-than-includes'
    | 'at-least-one'
    | 'sd-no-root'
    | 'p-over-data'
    | 'expected-probability'
    | 'signed-sum'
    | 'percent-raw'

export const discreteBatx1gDetectiveLevels: DiscreteBatx1gDetectiveError[][] = [
    ['mean-plain', 'sd-no-square', 'sd-is-variance', 'gain-no-price'],
    ['no-coefficient', 'more-than-includes', 'at-least-one', 'sd-no-root'],
    ['p-over-data', 'expected-probability', 'signed-sum', 'percent-raw']
]

export const DISCRETE_BATX1G_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    formula: say('Formula', 'Fórmula', 'الصيغة', 'Formula'),
    decision: say('Erabakia', 'Decisión', 'القرار', 'Decision')
}

export const discreteBatx1gDetectiveNames: Record<DiscreteBatx1gDetectiveError, LocalizedText> = {
    'mean-plain': say('Balioen batez besteko hutsa egin du, probabilitaterik gabe', 'Hizo la media de los valores sin las probabilidades', 'حسب متوسط القيم دون الاحتمالات', 'Took the plain mean of the values, without the probabilities'),
    'sd-no-square': say('Ez dio $\\mu^2$ kendu', 'No restó $\\mu^2$', 'لم يطرح $\\mu^2$', 'Did not subtract $\\mu^2$'),
    'sd-is-variance': say('Bariantza eman du $\\sigma$ gisa, erroa egin gabe', 'Dio la varianza como $\\sigma$, sin la raíz', 'أعطى التباين على أنه $\\sigma$ دون جذر', 'Gave the variance as $\\sigma$, without the root'),
    'gain-no-price': say('Ez du jokatzearen prezioa kendu', 'No restó el precio de jugar', 'لم يطرح ثمن اللعب', 'Did not subtract the price of playing'),
    'no-coefficient': say('Zenbaki konbinatorioa ahaztu du', 'Olvidó el número combinatorio', 'نسي العدد التوافقي', 'Forgot the binomial coefficient'),
    'more-than-includes': say('«$k$ baino gehiago» kalkulatzean $k$ sartu du', 'Metió $k$ en «más de $k$»', 'أدخل $k$ في «أكثر من $k$»', 'Put $k$ into ‘more than $k$’'),
    'at-least-one': say('«Gutxienez bat» $1-p^n$ dela uste izan du', 'Creyó que «al menos uno» es $1-p^n$', 'ظن أن «واحد على الأقل» هو $1-p^n$', 'Thought ‘at least one’ is $1-p^n$'),
    'sd-no-root': say('$\\sigma=npq$ egin du, erroa atera gabe', 'Hizo $\\sigma=npq$, sin la raíz', 'كتب $\\sigma=npq$ دون جذر', 'Wrote $\\sigma=npq$, without the root'),
    'p-over-data': say('Datu kopuruaz zatitu du, ez proba kopuruaz', 'Dividió entre el número de datos, no de pruebas', 'قسم على عدد المعطيات لا عدد المحاولات', 'Divided by the number of data, not of trials'),
    'expected-probability': say('Probabilitatea hartu du balio itxaron gisa', 'Tomó la probabilidad como valor esperado', 'أخذ الاحتمال على أنه القيمة المتوقعة', 'Took the probability as the expected value'),
    'signed-sum': say('Diferentziak zeinuarekin batu ditu', 'Sumó las diferencias con su signo', 'جمع الفروق بإشاراتها', 'Added the differences with their signs'),
    'percent-raw': say('Diferentzia 5 zenbakiarekin alderatu du, ez % 5 ehunekoarekin', 'Comparó la diferencia con 5, no con el 5 %', 'قارن الفرق بالعدد 5 لا بـ 5٪', 'Compared the difference with 5, not with 5%')
}

export const discreteBatx1gDetectiveTips: Record<DiscreteBatx1gDetectiveError, LocalizedText> = {
    'mean-plain': say('Balio bakoitzak bere probabilitatearen pisua du: $\\mu=\\sum p_i\\,x_i$.', 'Cada valor pesa su probabilidad: $\\mu=\\sum p_i\\,x_i$.', 'تُوزن كل قيمة باحتمالها: $\\mu=\\sum p_i\\,x_i$.', 'Each value is weighted by its probability: $\\mu=\\sum p_i\\,x_i$.'),
    'sd-no-square': say('$\\sigma=\\sqrt{\\sum p_i\\,x_i^2-\\mu^2}$: kendu batez bestekoaren karratua.', '$\\sigma=\\sqrt{\\sum p_i\\,x_i^2-\\mu^2}$: resta el cuadrado de la media.', '$\\sigma=\\sqrt{\\sum p_i\\,x_i^2-\\mu^2}$: اطرح مربع المتوسط.', '$\\sigma=\\sqrt{\\sum p_i\\,x_i^2-\\mu^2}$: subtract the square of the mean.'),
    'sd-is-variance': say('$\\sum p_i\\,x_i^2-\\mu^2$ bariantza da; $\\sigma$ haren erroa da.', '$\\sum p_i\\,x_i^2-\\mu^2$ es la varianza; $\\sigma$ es su raíz.', '$\\sum p_i\\,x_i^2-\\mu^2$ هو التباين؛ و$\\sigma$ جذره.', '$\\sum p_i\\,x_i^2-\\mu^2$ is the variance; $\\sigma$ is its root.'),
    'gain-no-price': say('Irabazia = batez besteko saria ken jokatzeak balio duena.', 'Ganancia = premio medio menos lo que cuesta jugar.', 'الربح = الجائزة المتوسطة ناقص كلفة اللعب.', 'Gain = mean prize minus what it costs to play.'),
    'no-coefficient': say('$k$ arrakastak $\\binom{n}{k}$ ordenatan atera daitezke: $P(X=k)=\\binom{n}{k}p^k q^{n-k}$.', 'Los $k$ éxitos pueden salir en $\\binom{n}{k}$ órdenes: $P(X=k)=\\binom{n}{k}p^k q^{n-k}$.', 'قد تأتي النجاحات $k$ بـ $\\binom{n}{k}$ ترتيبًا: $P(X=k)=\\binom{n}{k}p^k q^{n-k}$.', 'The $k$ successes can come in $\\binom{n}{k}$ orders: $P(X=k)=\\binom{n}{k}p^k q^{n-k}$.'),
    'more-than-includes': say('«$k$ baino gehiago» $k+1$ zenbakitik hasten da: $P(X>k)=P(X\\ge k+1)$.', '«Más de $k$» empieza en $k+1$: $P(X>k)=P(X\\ge k+1)$.', '«أكثر من $k$» يبدأ من $k+1$: $P(X>k)=P(X\\ge k+1)$.', '‘More than $k$’ starts at $k+1$: $P(X>k)=P(X\\ge k+1)$.'),
    'at-least-one': say('«Bat ere ez» porrot guztiak dira: $P(X=0)=q^n$.', '«Ninguno» son todo fracasos: $P(X=0)=q^n$.', '«ولا واحد» يعني فشلًا في الكل: $P(X=0)=q^n$.', '‘None’ is all failures: $P(X=0)=q^n$.'),
    'sd-no-root': say('$npq$ bariantza da; $\\sigma=\\sqrt{npq}$.', '$npq$ es la varianza; $\\sigma=\\sqrt{npq}$.', '$npq$ هو التباين؛ و$\\sigma=\\sqrt{npq}$.', '$npq$ is the variance; $\\sigma=\\sqrt{npq}$.'),
    'p-over-data': say('$p=\\frac{\\bar{x}}{n}$, $n$ datu bakoitzeko proba kopurua dela.', '$p=\\frac{\\bar{x}}{n}$, con $n$ el número de pruebas de cada dato.', '$p=\\frac{\\bar{x}}{n}$ حيث $n$ عدد المحاولات في كل معطى.', '$p=\\frac{\\bar{x}}{n}$, where $n$ is the number of trials in each datum.'),
    'expected-probability': say('Balio itxarona $N\\cdot P(X=k)$ da: biderkatu datu kopuruaz.', 'El valor esperado es $N\\cdot P(X=k)$: multiplica por el número de datos.', 'القيمة المتوقعة $N\\cdot P(X=k)$: اضرب في عدد المعطيات.', 'The expected value is $N\\cdot P(X=k)$: multiply by the number of data.'),
    'signed-sum': say('Zeinudun diferentziek beti 0 egiten dute: hartu balio absolutuak eta handiena.', 'Las diferencias con signo siempre suman 0: toma los valores absolutos y el mayor.', 'مجموع الفروق بإشاراتها دائمًا 0: خذ القيم المطلقة وأكبرها.', 'Signed differences always add up to 0: take the absolute values and the largest.'),
    'percent-raw': say('Diferentziarik handiena guztizkoarekin zatitu, eta alderatu $0{,}05$ zenbakiarekin.', 'Divide la mayor diferencia entre el total y compárala con $0{,}05$.', 'اقسم أكبر فرق على الكل وقارنه بـ $0{,}05$.', 'Divide the largest difference by the total and compare it with $0{,}05$.')
}

type Built = Omit<WorkedCase<DiscreteBatx1gDetectiveError>, 'options'>

/** An exact decimal, for LaTeX */
const decimalLatex = (value: number) => {
    for (let places = 0; places <= 8; places += 1) {
        if (Math.abs(Math.round(value * 10 ** places) - value * 10 ** places) < 1e-7) return value.toFixed(places).replace('.', '{,}')
    }
    return value.toFixed(4).replace('.', '{,}')
}
const tenths = (value: number) => decimalLatex(value / 10)
/** Tables of 0, 1, 2, 3 with tenths whose σ is exact (σ ≠ 1, so σ and σ² differ) */
const TABLES = [[2, 2, 3, 3], [1, 3, 4, 2], [1, 3, 5, 1], [1, 5, 3, 1], [2, 4, 3, 1], [3, 1, 3, 3], [3, 3, 1, 3], [3, 3, 2, 2]]
const stats = (table: number[]) => {
    const mean = table.reduce((sum, p, x) => sum + (p / 10) * x, 0)
    const square = table.reduce((sum, p, x) => sum + (p / 10) * x * x, 0)
    return { mean, square, sd: Math.sqrt(square - mean * mean) }
}
const tableLatex = (table: number[]) => `p_i=${table.map(tenths).join(';\\ ')}`

function build(random: Random, error: DiscreteBatx1gDetectiveError): Built | null {
    switch (error) {
        case 'mean-plain': {
            const table = pick(random, TABLES)
            const { mean } = stats(table)
            const problem = say(`$X$ aldagaiak 0, 1, 2 eta 3 balio ditu, ${table.map((p) => tenths(p).replace('{,}', ',')).join('; ')} probabilitateekin. Kalkulatu $\\mu$.`, `$X$ vale 0, 1, 2 o 3 con probabilidades ${table.map((p) => tenths(p).replace('{,}', ',')).join('; ')}. Calcula $\\mu$.`, `يأخذ $X$ القيم 0 و1 و2 و3 باحتمالات ${table.map((p) => tenths(p).replace('{,}', '.')).join(' و')}. احسب $\\mu$.`, `$X$ is 0, 1, 2 or 3 with probabilities ${table.map((p) => tenths(p).replace('{,}', '.')).join(', ')}. Work out $\\mu$.`)
            return { problem, lines: [line(LABELS.data, tableLatex(table)), line(LABELS.step, '\\mu=\\frac{0+1+2+3}{4}=1{,}5'), line(LABELS.result, '\\mu=1{,}5')], wrong: 1, error, fix: `\\mu=${table.map((p, x) => `${x}\\cdot ${tenths(p)}`).join('+')}=${decimalLatex(mean)}`, right: mean, reached: 1.5 }
        }
        case 'sd-no-square':
        case 'sd-is-variance': {
            const table = pick(random, TABLES)
            const { mean, square, sd } = stats(table)
            const problem = say(`$X$ aldagaiak 0, 1, 2 eta 3 balio ditu, ${table.map((p) => tenths(p).replace('{,}', ',')).join('; ')} probabilitateekin. Kalkulatu $\\sigma$.`, `$X$ vale 0, 1, 2 o 3 con probabilidades ${table.map((p) => tenths(p).replace('{,}', ',')).join('; ')}. Calcula $\\sigma$.`, `يأخذ $X$ القيم 0 و1 و2 و3 باحتمالات ${table.map((p) => tenths(p).replace('{,}', '.')).join(' و')}. احسب $\\sigma$.`, `$X$ is 0, 1, 2 or 3 with probabilities ${table.map((p) => tenths(p).replace('{,}', '.')).join(', ')}. Work out $\\sigma$.`)
            const first = [line(LABELS.step, `\\mu=${decimalLatex(mean)}`), line(LABELS.step, `\\sum p_i\\,x_i^2=${decimalLatex(square)}`)]
            const fix = `\\sigma=\\sqrt{${decimalLatex(square)}-${decimalLatex(mean)}^2}=${decimalLatex(sd)}`
            if (error === 'sd-no-square') {
                const reached = Math.sqrt(square)
                return { problem, lines: [...first, line(LABELS.result, `\\sigma=\\sqrt{${decimalLatex(square)}}\\approx ${reached.toFixed(2).replace('.', '{,}')}`)], wrong: 2, error, fix, right: sd, reached }
            }
            const variance = square - mean * mean
            return { problem, lines: [...first, line(LABELS.result, `\\sigma=${decimalLatex(square)}-${decimalLatex(mean)}^2=${decimalLatex(variance)}`)], wrong: 2, error, fix, right: sd, reached: variance }
        }
        case 'gain-no-price': {
            const six = 6 * randomInt(random, 1, 3)
            const price = randomInt(random, 1, 5)
            const mean = six / 6
            if (mean === price) return null
            return {
                problem: say(`Jokatzeak ${price} € balio du. Dado bat botatzen da, eta 6 ateratzen bada, ${six} € ematen dira. Zein da batez besteko irabazia?`, `Jugar cuesta ${price} €. Se lanza un dado y, con un 6, te dan ${six} €. ¿Cuál es la ganancia media?`, `يكلّف اللعب ${price} €. يُرمى نرد، ومع 6 تأخذ ${six} €. ما الربح المتوسط؟`, `Playing costs €${price}. A die is rolled and a 6 pays €${six}. What is the mean gain?`),
                lines: [line(LABELS.step, `\\mu=${six}\\cdot\\frac{1}{6}=${mean}`), line(LABELS.step, `G=\\mu=${mean}`), line(LABELS.result, `G=${mean}>0`)],
                wrong: 1, error, fix: `G=\\mu-${price}=${mean - price}`, right: mean - price, reached: mean
            }
        }
        case 'no-coefficient': {
            const n = randomInt(random, 3, 5)
            const p = pick(random, [1, 2, 3, 4, 6, 7, 8, 9])
            const k = randomInt(random, 1, n - 1)
            const q = 10 - p
            const right = choose(n, k) * (p / 10) ** k * (q / 10) ** (n - k)
            const reached = (p / 10) ** k * (q / 10) ** (n - k)
            return {
                problem: say(`$X$ aldagaia $B(${n};\\,${tenths(p)})$ da. Kalkulatu $P(X=${k})$.`, `$X$ sigue una $B(${n};\\,${tenths(p)})$. Calcula $P(X=${k})$.`, `يتبع $X$ التوزيع $B(${n};\\,${tenths(p)})$. احسب $P(X=${k})$.`, `$X$ follows $B(${n};\\,${tenths(p)})$. Work out $P(X=${k})$.`),
                lines: [line(LABELS.data, `n=${n},\\ p=${tenths(p)},\\ q=${tenths(q)}`), line(LABELS.formula, `P(X=${k})=${tenths(p)}^{${k}}\\cdot ${tenths(q)}^{${n - k}}`), line(LABELS.result, `P(X=${k})=${decimalLatex(reached)}`)],
                wrong: 1, error, fix: `P(X=${k})=${choose(n, k)}\\cdot ${tenths(p)}^{${k}}\\cdot ${tenths(q)}^{${n - k}}`, right, reached
            }
        }
        case 'more-than-includes': {
            const n = randomInt(random, 3, 4)
            const p = pick(random, [2, 3, 4, 5, 6, 7, 8])
            const k = randomInt(random, 1, n - 1)
            const at = (j: number) => binomialPmfDecimal(n, p / 10, j)
            let right = 0
            for (let j = k + 1; j <= n; j += 1) right += at(j)
            const reached = right + at(k)
            return {
                problem: say(`$X$ aldagaia $B(${n};\\,${tenths(p)})$ da. Kalkulatu $P(X>${k})$.`, `$X$ sigue una $B(${n};\\,${tenths(p)})$. Calcula $P(X>${k})$.`, `يتبع $X$ التوزيع $B(${n};\\,${tenths(p)})$. احسب $P(X>${k})$.`, `$X$ follows $B(${n};\\,${tenths(p)})$. Work out $P(X>${k})$.`),
                lines: [line(LABELS.step, `P(X>${k})=P(X\\ge ${k})`), line(LABELS.step, `P(X\\ge ${k})=1-P(X\\le ${k - 1})`), line(LABELS.result, `P(X>${k})=${decimalLatex(reached)}`)],
                wrong: 0, error, fix: `P(X>${k})=P(X\\ge ${k + 1})=${decimalLatex(right)}`, right, reached
            }
        }
        case 'at-least-one': {
            const n = randomInt(random, 2, 4)
            const p = pick(random, [1, 2, 3, 4, 6, 7, 8, 9])
            const q = 10 - p
            const right = 1 - (q / 10) ** n
            const reached = 1 - (p / 10) ** n
            return {
                problem: say(`$X$ aldagaia $B(${n};\\,${tenths(p)})$ da. Kalkulatu $P(X\\ge 1)$.`, `$X$ sigue una $B(${n};\\,${tenths(p)})$. Calcula $P(X\\ge 1)$.`, `يتبع $X$ التوزيع $B(${n};\\,${tenths(p)})$. احسب $P(X\\ge 1)$.`, `$X$ follows $B(${n};\\,${tenths(p)})$. Work out $P(X\\ge 1)$.`),
                lines: [line(LABELS.step, 'P(X\\ge 1)=1-P(X=0)'), line(LABELS.step, `P(X=0)=${tenths(p)}^{${n}}=${decimalLatex((p / 10) ** n)}`), line(LABELS.result, `P(X\\ge 1)=${decimalLatex(reached)}`)],
                wrong: 1, error, fix: `P(X=0)=${tenths(q)}^{${n}}\\ \\to\\ ${decimalLatex(right)}`, right, reached
            }
        }
        case 'sd-no-root': {
            const [n, p, sd] = pick(random, [[100, 5, 5], [16, 5, 2], [25, 2, 2], [400, 5, 10], [100, 2, 4], [64, 5, 4], [36, 5, 3], [100, 1, 3]])
            const variance = sd * sd
            const mean = (n * p) / 10
            return {
                problem: say(`$X$ aldagaia $B(${n};\\,${tenths(p)})$ da. Kalkulatu haren batez bestekoa eta desbideratze tipikoa.`, `$X$ sigue una $B(${n};\\,${tenths(p)})$. Calcula su media y su desviación típica.`, `يتبع $X$ التوزيع $B(${n};\\,${tenths(p)})$. احسب متوسطه وانحرافه المعياري.`, `$X$ follows $B(${n};\\,${tenths(p)})$. Work out its mean and its standard deviation.`),
                lines: [line(LABELS.step, `\\mu=${n}\\cdot ${tenths(p)}=${decimalLatex(mean)}`), line(LABELS.step, `\\sigma=${n}\\cdot ${tenths(p)}\\cdot ${tenths(10 - p)}=${decimalLatex(variance)}`), line(LABELS.result, `\\mu=${decimalLatex(mean)},\\ \\sigma=${decimalLatex(variance)}`)],
                wrong: 1, error, fix: `\\sigma=\\sqrt{${decimalLatex(variance)}}=${sd}`, right: sd, reached: variance
            }
        }
        case 'p-over-data': {
            const data = pick(random, [40, 50, 80, 100])
            const trials = randomInt(random, 2, 5)
            const p = randomInt(random, 1, 9)
            const mean = (trials * p) / 10
            const reached = mean / data
            return {
                problem: say(`${data} datu dira, bakoitza ${trials} probatako arrakasta kopurua, eta batez bestekoa ${decimalLatex(mean).replace('{,}', ',')} da. Zein binomialekin alderatzen dira?`, `Son ${data} datos, cada uno el número de éxitos en ${trials} pruebas, y la media es ${decimalLatex(mean).replace('{,}', ',')}. ¿Con qué binomial se comparan?`, `هناك ${data} معطى، كل منها عدد النجاحات في ${trials} محاولات، والمتوسط ${decimalLatex(mean).replace('{,}', '.')}. بأي توزيع ثنائي تُقارن؟`, `There are ${data} data, each the number of successes in ${trials} trials, and the mean is ${decimalLatex(mean).replace('{,}', '.')}. Which binomial are they compared with?`),
                lines: [line(LABELS.data, `\\bar{x}=${decimalLatex(mean)}`), line(LABELS.step, `p=\\frac{${decimalLatex(mean)}}{${data}}=${decimalLatex(reached)}`), line(LABELS.result, `B(${trials};\\,${decimalLatex(reached)})`)],
                wrong: 1, error, fix: `p=\\frac{${decimalLatex(mean)}}{${trials}}=${tenths(p)}`, right: p / 10, reached
            }
        }
        case 'expected-probability': {
            const trials = randomInt(random, 2, 4)
            const data = 2 ** trials * randomInt(random, 2, 6)
            const k = randomInt(random, 0, trials)
            const probability = choose(trials, k) / 2 ** trials
            const observed = data * probability + pick(random, [-3, -2, 2, 3])
            if (observed < 0) return null
            return {
                problem: say(`${data} datu $B(${trials};\\,0{,}5)$ banaketarekin alderatzen dira. $X=${k}$ balioarekin ${observed} behatu dira. Zein da diferentzia?`, `Se comparan ${data} datos con una $B(${trials};\\,0{,}5)$. Con $X=${k}$ se han observado ${observed}. ¿Cuál es la diferencia?`, `تُقارن ${data} معطى بـ $B(${trials};\\,0{,}5)$. لوحظ ${observed} مع $X=${k}$. ما الفرق؟`, `${data} data are compared with a $B(${trials};\\,0{,}5)$. ${observed} were observed with $X=${k}$. What is the difference?`),
                lines: [line(LABELS.step, `P(X=${k})=\\frac{${choose(trials, k)}}{${2 ** trials}}=${decimalLatex(probability)}`), line(LABELS.step, `E=${decimalLatex(probability)}`), line(LABELS.result, `|${observed}-${decimalLatex(probability)}|=${decimalLatex(Math.abs(observed - probability))}`)],
                wrong: 1, error, fix: `E=${data}\\cdot ${decimalLatex(probability)}=${decimalLatex(data * probability)}`, right: Math.abs(observed - data * probability), reached: Math.abs(observed - probability)
            }
        }
        case 'signed-sum': {
            const [first, second] = pick(random, [[1, 3], [2, 1], [2, 3], [1, 2], [3, 1]])
            const total = 16 * randomInt(random, 3, 6)
            const largest = Math.max(first, second)
            const signs = random() < 0.5 ? 1 : -1
            const d = [first * signs, -second * signs, second * signs, -first * signs]
            const written = d.map((value) => (value > 0 ? `+${value}` : String(value))).join(',\\ ')
            return {
                problem: say(`${total} datutan, behatuak ken itxaronak hauek dira: ${d.join('; ')}. Doikuntza onartzen da?`, `En ${total} datos, observados menos esperados dan: ${d.join('; ')}. ¿Se acepta el ajuste?`, `في ${total} معطى، المشاهَدة ناقص المتوقعة: ${d.join('؛ ')}. هل تُقبل المطابقة؟`, `In ${total} data, observed minus expected gives: ${d.join(', ')}. Is the fit accepted?`),
                lines: [line(LABELS.data, written), line(LABELS.step, `${d.map((value, index) => (index && value > 0 ? `+${value}` : String(value))).join('')}=0`), line(LABELS.decision, '0<0{,}05')],
                wrong: 1, error, fix: `\\frac{${largest}}{${total}}=${decimalLatex(largest / total)}`, right: largest / total, reached: 0
            }
        }
        case 'percent-raw': {
            const total = pick(random, [200, 300, 400, 500])
            const largest = randomInt(random, 6, 9)
            return {
                problem: say(`${total} datutan, diferentziarik handiena ${largest} da. Doikuntza onartzen da?`, `En ${total} datos, la mayor diferencia es ${largest}. ¿Se acepta el ajuste?`, `في ${total} معطى أكبر فرق ${largest}. هل تُقبل المطابقة؟`, `In ${total} data, the largest difference is ${largest}. Is the fit accepted?`),
                lines: [line(LABELS.data, `N=${total},\\ d_{\\max}=${largest}`), line(LABELS.step, `${largest}>5`), line(LABELS.decision, '\\times')],
                wrong: 1, error, fix: `\\frac{${largest}}{${total}}=${decimalLatex(largest / total)}<0{,}05`, right: largest / total, reached: largest
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createDiscreteBatx1gDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, discreteBatx1gDetectiveLevels[levelIndex], DISCRETE_BATX1G_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
