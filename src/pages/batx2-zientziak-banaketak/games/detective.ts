import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { above, below, tableLatex, zLatex } from '../normal.ts'

/* ==========================================================================
   J4 · Banaketen detektibea (Detective de distribuciones): a worked
   solution of three lines with one wrong line, the typical mistakes of
   this unit. Level 1 (binomial): the binomial coefficient left out, p and
   q swapped, σ = npq without the root, «at least one» as 1 − pⁿ. Level 2
   (normal): P(Z > k) read as P(Z ≤ k), P(Z ≤ −k) read as P(Z ≤ k),
   dividing by σ² to standardise, and the inverse search done with the
   area above. Level 3 (approximation): no continuity correction, the half
   unit on the wrong side, σ = npq, and «fewer than k» taken as «at most
   k». Every value comes from the table of normal.ts; `right` and
   `reached` tell the cases apart.
   ========================================================================== */

export type DistributionsBatx2DetectiveError =
    | 'no-coefficient'
    | 'p-q-swapped'
    | 'sd-no-root'
    | 'at-least-one'
    | 'above-as-below'
    | 'negative-as-positive'
    | 'variance-standardize'
    | 'inverse-above'
    | 'no-correction'
    | 'wrong-side'
    | 'approx-sd'
    | 'fewer-as-at-most'

export const distributionsBatx2DetectiveLevels: DistributionsBatx2DetectiveError[][] = [
    ['no-coefficient', 'p-q-swapped', 'sd-no-root', 'at-least-one'],
    ['above-as-below', 'negative-as-positive', 'variance-standardize', 'inverse-above'],
    ['no-correction', 'wrong-side', 'approx-sd', 'fewer-as-at-most']
]

export const DISTRIBUTIONS_BATX2_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    formula: say('Formula', 'Fórmula', 'الصيغة', 'Formula'),
    standardize: say('Tipifikatu', 'Tipificar', 'التوحيد المعياري', 'Standardise'),
    table: say('Taula', 'Tabla', 'الجدول', 'Table'),
    normal: say('Normala', 'Normal', 'الطبيعي', 'Normal'),
    correction: say('Zuzenketa', 'Corrección', 'التصحيح', 'Correction')
}

export const distributionsBatx2DetectiveNames: Record<DistributionsBatx2DetectiveError, LocalizedText> = {
    'no-coefficient': say('Zenbaki konbinatorioa ahaztu du', 'Olvidó el número combinatorio', 'نسي العدد التوافقي', 'Forgot the binomial coefficient'),
    'p-q-swapped': say('$p$ eta $q$ trukatu ditu', 'Cambió $p$ por $q$', 'بدّل $p$ و$q$', 'Swapped $p$ and $q$'),
    'sd-no-root': say('$\\sigma=npq$ egin du, erroa atera gabe', 'Hizo $\\sigma=npq$, sin la raíz', 'كتب $\\sigma=npq$ دون جذر', 'Wrote $\\sigma=npq$, without the root'),
    'at-least-one': say('«Gutxienez bat» $1-p^n$ dela uste izan du', 'Creyó que «al menos uno» es $1-p^n$', 'ظن أن «واحد على الأقل» هو $1-p^n$', 'Thought ‘at least one’ is $1-p^n$'),
    'above-as-below': say('$P(Z>k)$ taulan zuzenean irakurri du', 'Leyó $P(Z>k)$ directamente en la tabla', 'قرأ $P(Z>k)$ من الجدول مباشرة', 'Read $P(Z>k)$ straight from the table'),
    'negative-as-positive': say('$-k$ eta $k$ berdintzat hartu ditu', 'Tomó $-k$ como si fuera $k$', 'اعتبر $-k$ كأنه $k$', 'Took $-k$ as if it were $k$'),
    'variance-standardize': say('Bariantzaz zatitu du tipifikatzean', 'Dividió entre la varianza al tipificar', 'قسم على التباين عند التوحيد', 'Divided by the variance when standardising'),
    'inverse-above': say('Gaineko azalera bilatu du taulan', 'Buscó en la tabla el área de encima', 'بحث في الجدول عن المساحة فوق', 'Looked up the area above in the table'),
    'no-correction': say('Jarraitutasun-zuzenketa ahaztu du', 'Olvidó la corrección de continuidad', 'نسي تصحيح الاتصال', 'Forgot the continuity correction'),
    'wrong-side': say('Puntu erdia alde okerrera jarri du', 'Puso el medio punto en el lado equivocado', 'وضع نصف الوحدة في الجهة الخطأ', 'Put the half unit on the wrong side'),
    'approx-sd': say('Normalaren $\\sigma$ gisa $npq$ hartu du', 'Tomó $npq$ como la $\\sigma$ de la normal', 'أخذ $npq$ على أنه $\\sigma$ للطبيعي', 'Took $npq$ as the $\\sigma$ of the normal'),
    'fewer-as-at-most': say('«$k$ baino gutxiago» «gehienez $k$» bezala hartu du', 'Tomó «menos de $k$» como «como mucho $k$»', 'اعتبر «أقل من $k$» مثل «$k$ على الأكثر»', 'Took ‘fewer than $k$’ as ‘at most $k$’')
}

export const distributionsBatx2DetectiveTips: Record<DistributionsBatx2DetectiveError, LocalizedText> = {
    'no-coefficient': say('$k$ arrakastak $\\binom{n}{k}$ ordenatan atera daitezke: $P(X=k)=\\binom{n}{k}p^k q^{n-k}$.', 'Los $k$ éxitos pueden salir en $\\binom{n}{k}$ órdenes: $P(X=k)=\\binom{n}{k}p^k q^{n-k}$.', 'قد تأتي النجاحات $k$ بـ $\\binom{n}{k}$ ترتيبًا: $P(X=k)=\\binom{n}{k}p^k q^{n-k}$.', 'The $k$ successes can come in $\\binom{n}{k}$ orders: $P(X=k)=\\binom{n}{k}p^k q^{n-k}$.'),
    'p-q-swapped': say('$p$ arrakastaren probabilitatea da, eta $k$ berretzailea darama.', '$p$ es la probabilidad del éxito, y lleva el exponente $k$.', '$p$ احتمال النجاح، وله الأس $k$.', '$p$ is the probability of success, and it takes the exponent $k$.'),
    'sd-no-root': say('$npq$ bariantza da; $\\sigma=\\sqrt{npq}$.', '$npq$ es la varianza; $\\sigma=\\sqrt{npq}$.', '$npq$ هو التباين؛ و$\\sigma=\\sqrt{npq}$.', '$npq$ is the variance; $\\sigma=\\sqrt{npq}$.'),
    'at-least-one': say('«Bat ere ez» porrot guztiak dira: $P(X=0)=q^n$.', '«Ninguno» son todo fracasos: $P(X=0)=q^n$.', '«ولا واحد» يعني فشلًا في الكل: $P(X=0)=q^n$.', '‘None’ is all failures: $P(X=0)=q^n$.'),
    'above-as-below': say('Taulak azpikoa ematen du: $P(Z>k)=1-P(Z\\le k)$.', 'La tabla da lo de debajo: $P(Z>k)=1-P(Z\\le k)$.', 'يعطي الجدول ما تحت: $P(Z>k)=1-P(Z\\le k)$.', 'The table gives what lies below: $P(Z>k)=1-P(Z\\le k)$.'),
    'negative-as-positive': say('Simetriagatik, $P(Z\\le -k)=1-P(Z\\le k)$.', 'Por simetría, $P(Z\\le -k)=1-P(Z\\le k)$.', 'بالتماثل $P(Z\\le -k)=1-P(Z\\le k)$.', 'By symmetry, $P(Z\\le -k)=1-P(Z\\le k)$.'),
    'variance-standardize': say('$z=\\frac{x-\\mu}{\\sigma}$: desbideratzeaz zatitzen da.', '$z=\\frac{x-\\mu}{\\sigma}$: se divide entre la desviación.', '$z=\\frac{x-\\mu}{\\sigma}$: نقسم على الانحراف.', '$z=\\frac{x-\\mu}{\\sigma}$: divide by the deviation.'),
    'inverse-above': say('Gainetik $p$ badago, azpitik $1-p$ dago: hori bilatzen da.', 'Si por encima hay $p$, por debajo hay $1-p$: eso se busca.', 'إذا كان فوقها $p$ فتحتها $1-p$: وهذا ما نبحث عنه.', 'If $p$ lies above, $1-p$ lies below: that is what you look for.'),
    'no-correction': say('$k$ balioaren barra $k+0{,}5$ arte iristen da.', 'La barra de $k$ llega hasta $k+0{,}5$.', 'يصل عمود $k$ إلى $k+0{,}5$.', 'The bar of $k$ reaches $k+0{,}5$.'),
    'wrong-side': say('«Gutxienez $k$» $k$ barraren ezkerreko ertzean hasten da: $k-0{,}5$.', '«Al menos $k$» empieza en el borde izquierdo de la barra $k$: $k-0{,}5$.', '«$k$ على الأقل» يبدأ عند الحافة اليسرى للعمود $k$: $k-0{,}5$.', '‘At least $k$’ starts at the left edge of bar $k$: $k-0{,}5$.'),
    'approx-sd': say('Normalak binomialaren $\\sigma$ bera du: $\\sqrt{npq}$.', 'La normal tiene la misma $\\sigma$ que la binomial: $\\sqrt{npq}$.', 'للطبيعي $\\sigma$ الثنائي نفسه: $\\sqrt{npq}$.', 'The normal has the same $\\sigma$ as the binomial: $\\sqrt{npq}$.'),
    'fewer-as-at-most': say('$X<k$ eta $X\\le k-1$ gauza bera dira: $Y\\le k-0{,}5$.', '$X<k$ es $X\\le k-1$: $Y\\le k-0{,}5$.', '$X<k$ هو $X\\le k-1$: $Y\\le k-0{,}5$.', '$X<k$ is $X\\le k-1$: $Y\\le k-0{,}5$.')
}

type Built = Omit<WorkedCase<DistributionsBatx2DetectiveError>, 'options'>

/** An exact decimal of tenths to a power, for LaTeX */
const decimalLatex = (value: number) => {
    for (let places = 0; places <= 8; places += 1) {
        if (Math.abs(Math.round(value * 10 ** places) - value * 10 ** places) < 1e-7) return value.toFixed(places).replace('.', '{,}')
    }
    return value.toFixed(4).replace('.', '{,}')
}
const tenths = (value: number) => decimalLatex(value / 10)
const choose = (n: number, k: number) => {
    let value = 1
    for (let i = 1; i <= k; i += 1) value = (value * (n - k + i)) / i
    return Math.round(value)
}
/** The cases of the approximation: σ of 2, 5 or 10, so every z has two decimals */
const APPROX = [{ n: 16, p: 5, mean: 8, sd: 2, variance: 4 }, { n: 100, p: 5, mean: 50, sd: 5, variance: 25 }, { n: 400, p: 5, mean: 200, sd: 10, variance: 100 }, { n: 25, p: 2, mean: 5, sd: 2, variance: 4 }]
/** Standard deviations that standardise to two decimals */
const SDS = [2, 4, 5, 10]

function build(random: Random, error: DistributionsBatx2DetectiveError): Built | null {
    switch (error) {
        case 'no-coefficient':
        case 'p-q-swapped': {
            const n = randomInt(random, 3, 6)
            const p = pick(random, [1, 2, 3, 4, 6, 7, 8, 9])
            const k = randomInt(random, 1, n - 1)
            const q = 10 - p
            const right = choose(n, k) * (p / 10) ** k * (q / 10) ** (n - k)
            const problem = say(`$X$ aldagaia $B(${n};\\,${tenths(p)})$ da. Kalkulatu $P(X=${k})$.`, `$X$ sigue una $B(${n};\\,${tenths(p)})$. Calcula $P(X=${k})$.`, `يتبع $X$ التوزيع $B(${n};\\,${tenths(p)})$. احسب $P(X=${k})$.`, `$X$ follows $B(${n};\\,${tenths(p)})$. Work out $P(X=${k})$.`)
            const fix = `P(X=${k})=${choose(n, k)}\\cdot ${tenths(p)}^{${k}}\\cdot ${tenths(q)}^{${n - k}}`
            if (error === 'no-coefficient') {
                const reached = (p / 10) ** k * (q / 10) ** (n - k)
                return { problem, lines: [line(LABELS.data, `n=${n},\\ p=${tenths(p)},\\ q=${tenths(q)}`), line(LABELS.formula, `P(X=${k})=${tenths(p)}^{${k}}\\cdot ${tenths(q)}^{${n - k}}`), line(LABELS.result, `P(X=${k})=${decimalLatex(reached)}`)], wrong: 1, error, fix, right, reached }
            }
            const reached = choose(n, k) * (q / 10) ** k * (p / 10) ** (n - k)
            return { problem, lines: [line(LABELS.data, `n=${n},\\ p=${tenths(p)},\\ q=${tenths(q)}`), line(LABELS.formula, `P(X=${k})=${choose(n, k)}\\cdot ${tenths(q)}^{${k}}\\cdot ${tenths(p)}^{${n - k}}`), line(LABELS.result, `P(X=${k})=${decimalLatex(reached)}`)], wrong: 1, error, fix, right, reached }
        }
        case 'sd-no-root': {
            const [n, p, sd] = pick(random, [[100, 5, 5], [16, 5, 2], [25, 2, 2], [400, 5, 10], [225, 2, 6], [48, 2.5, 3], [100, 1, 3], [64, 5, 4], [36, 5, 3]])
            const variance = sd * sd
            const mean = (n * p) / 10
            return {
                problem: say(`$X$ aldagaia $B(${n};\\,${tenths(p)})$ da. Kalkulatu haren batez bestekoa eta desbideratze tipikoa.`, `$X$ sigue una $B(${n};\\,${tenths(p)})$. Calcula su media y su desviación típica.`, `يتبع $X$ التوزيع $B(${n};\\,${tenths(p)})$. احسب متوسطه وانحرافه المعياري.`, `$X$ follows $B(${n};\\,${tenths(p)})$. Work out its mean and its standard deviation.`),
                lines: [line(LABELS.step, `\\mu=${n}\\cdot ${tenths(p)}=${decimalLatex(mean)}`), line(LABELS.step, `\\sigma=${n}\\cdot ${tenths(p)}\\cdot ${tenths(10 - p)}=${decimalLatex(variance)}`), line(LABELS.result, `\\mu=${decimalLatex(mean)},\\ \\sigma=${decimalLatex(variance)}`)],
                wrong: 1, error, fix: `\\sigma=\\sqrt{${decimalLatex(variance)}}=${sd}`, right: sd, reached: variance
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
                wrong: 1, error, fix: `P(X=0)=${tenths(q)}^{${n}}=${decimalLatex((q / 10) ** n)}\\ \\to\\ ${decimalLatex(right)}`, right, reached
            }
        }
        case 'above-as-below':
        case 'negative-as-positive':
        case 'variance-standardize': {
            const sd = pick(random, SDS)
            const mean = 5 * randomInt(random, 4, 20)
            const steps = randomInt(random, 2, 10)
            const z = Math.round(((steps * (sd === 4 ? 0.25 : sd === 2 ? 0.5 : sd === 5 ? 0.2 : 0.1)) * 100)) / 100
            if (z > 2.5) return null
            const sign = error === 'negative-as-positive' ? -1 : 1
            const x = mean + sign * z * sd
            const n = `N(${mean};\\,${sd})`
            if (error === 'above-as-below') {
                const right = above(z)
                const reached = below(z)
                return {
                    problem: say(`$X$ aldagaia $${n}$ da. Kalkulatu $P(X>${decimalLatex(x)})$.`, `$X$ sigue una $${n}$. Calcula $P(X>${decimalLatex(x)})$.`, `يتبع $X$ التوزيع $${n}$. احسب $P(X>${decimalLatex(x)})$.`, `$X$ follows $${n}$. Work out $P(X>${decimalLatex(x)})$.`),
                    lines: [line(LABELS.standardize, `z=\\frac{${decimalLatex(x)}-${mean}}{${sd}}=${zLatex(z)}`), line(LABELS.table, `P(Z>${zLatex(z)})=${tableLatex(reached)}`), line(LABELS.result, `P(X>${decimalLatex(x)})=${tableLatex(reached)}`)],
                    wrong: 1, error, fix: `P(Z>${zLatex(z)})=1-${tableLatex(reached)}=${tableLatex(right)}`, right: right / 10_000, reached: reached / 10_000
                }
            }
            if (error === 'negative-as-positive') {
                const right = below(-z)
                const reached = below(z)
                return {
                    problem: say(`$X$ aldagaia $${n}$ da. Kalkulatu $P(X<${decimalLatex(x)})$.`, `$X$ sigue una $${n}$. Calcula $P(X<${decimalLatex(x)})$.`, `يتبع $X$ التوزيع $${n}$. احسب $P(X<${decimalLatex(x)})$.`, `$X$ follows $${n}$. Work out $P(X<${decimalLatex(x)})$.`),
                    lines: [line(LABELS.standardize, `z=\\frac{${decimalLatex(x)}-${mean}}{${sd}}=${zLatex(-z)}`), line(LABELS.table, `P(Z<${zLatex(-z)})=${tableLatex(reached)}`), line(LABELS.result, `P(X<${decimalLatex(x)})=${tableLatex(reached)}`)],
                    wrong: 1, error, fix: `P(Z<${zLatex(-z)})=1-${tableLatex(reached)}=${tableLatex(right)}`, right: right / 10_000, reached: reached / 10_000
                }
            }
            const wrongZ = Math.round(((x - mean) / (sd * sd)) * 100) / 100
            if (Math.abs((x - mean) / (sd * sd) - wrongZ) > 1e-9 || wrongZ === z) return null
            const right = below(z)
            const reached = below(wrongZ)
            return {
                problem: say(`$X$ aldagaia $${n}$ da. Kalkulatu $P(X\\le ${decimalLatex(x)})$.`, `$X$ sigue una $${n}$. Calcula $P(X\\le ${decimalLatex(x)})$.`, `يتبع $X$ التوزيع $${n}$. احسب $P(X\\le ${decimalLatex(x)})$.`, `$X$ follows $${n}$. Work out $P(X\\le ${decimalLatex(x)})$.`),
                lines: [line(LABELS.standardize, `z=\\frac{${decimalLatex(x)}-${mean}}{${sd * sd}}=${zLatex(wrongZ)}`), line(LABELS.table, `P(Z\\le ${zLatex(wrongZ)})=${tableLatex(reached)}`), line(LABELS.result, `P(X\\le ${decimalLatex(x)})=${tableLatex(reached)}`)],
                wrong: 0, error, fix: `z=\\frac{${decimalLatex(x)}-${mean}}{${sd}}=${zLatex(z)}\\ \\to\\ ${tableLatex(right)}`, right: right / 10_000, reached: reached / 10_000
            }
        }
        case 'inverse-above': {
            const z = pick(random, [0.84, 1.04, 1.28, 2.05, 2.33, 0.52, 0.67])
            const top = above(z)
            const sd = pick(random, SDS)
            const mean = 5 * randomInt(random, 4, 20)
            const right = mean + z * sd
            const reached = mean - z * sd
            return {
                problem: say(`$X$ aldagaia $${`N(${mean};\\,${sd})`}$ da. Zein $x$ balioak uzten du gainetik $${tableLatex(top)}$?`, `$X$ sigue una $${`N(${mean};\\,${sd})`}$. ¿Qué $x$ deja por encima $${tableLatex(top)}$?`, `يتبع $X$ التوزيع $${`N(${mean};\\,${sd})`}$. ما قيمة $x$ التي تترك فوقها $${tableLatex(top)}$؟`, `$X$ follows $${`N(${mean};\\,${sd})`}$. Which $x$ leaves $${tableLatex(top)}$ above it?`),
                lines: [line(LABELS.table, `P(Z\\le k)=${tableLatex(top)}`), line(LABELS.step, `k=-${zLatex(z)}`), line(LABELS.result, `x=${mean}-${zLatex(z)}\\cdot ${sd}=${decimalLatex(reached)}`)],
                wrong: 0, error, fix: `P(Z\\le k)=1-${tableLatex(top)}=${tableLatex(below(z))}\\ \\to\\ k=${zLatex(z)},\\ x=${decimalLatex(right)}`, right, reached
            }
        }
        case 'no-correction':
        case 'wrong-side':
        case 'fewer-as-at-most': {
            const item = pick(random, APPROX)
            const k = item.mean + pick(random, [-2, -1, 1, 2]) * item.sd + (error === 'fewer-as-at-most' ? 1 : 0)
            const bin = `B(${item.n};\\,${tenths(item.p)})`
            const n = `N(${item.mean};\\,${item.sd})`
            const z = (x: number) => Math.round(((x - item.mean) / item.sd) * 100) / 100
            if (error === 'no-correction') {
                const right = below(z(k + 0.5))
                const reached = below(z(k))
                return {
                    problem: say(`$X$ aldagaia $${bin}$ da. Normalarekin, kalkulatu $P(X\\le ${k})$.`, `$X$ sigue una $${bin}$. Con la normal, calcula $P(X\\le ${k})$.`, `يتبع $X$ التوزيع $${bin}$. بالتوزيع الطبيعي احسب $P(X\\le ${k})$.`, `$X$ follows $${bin}$. Using the normal, work out $P(X\\le ${k})$.`),
                    lines: [line(LABELS.normal, n), line(LABELS.correction, `P(X\\le ${k})\\approx P(Y\\le ${k})`), line(LABELS.result, `P(Z\\le ${zLatex(z(k))})=${tableLatex(reached)}`)],
                    wrong: 1, error, fix: `P(Y\\le ${decimalLatex(k + 0.5)})\\ \\to\\ ${tableLatex(right)}`, right: right / 10_000, reached: reached / 10_000
                }
            }
            if (error === 'wrong-side') {
                const right = above(z(k - 0.5))
                const reached = above(z(k + 0.5))
                return {
                    problem: say(`$X$ aldagaia $${bin}$ da. Normalarekin, kalkulatu $P(X\\ge ${k})$.`, `$X$ sigue una $${bin}$. Con la normal, calcula $P(X\\ge ${k})$.`, `يتبع $X$ التوزيع $${bin}$. بالتوزيع الطبيعي احسب $P(X\\ge ${k})$.`, `$X$ follows $${bin}$. Using the normal, work out $P(X\\ge ${k})$.`),
                    lines: [line(LABELS.normal, n), line(LABELS.correction, `P(X\\ge ${k})\\approx P(Y\\ge ${decimalLatex(k + 0.5)})`), line(LABELS.result, `P(Z\\ge ${zLatex(z(k + 0.5))})=${tableLatex(reached)}`)],
                    wrong: 1, error, fix: `P(Y\\ge ${decimalLatex(k - 0.5)})\\ \\to\\ ${tableLatex(right)}`, right: right / 10_000, reached: reached / 10_000
                }
            }
            const right = below(z(k - 0.5))
            const reached = below(z(k + 0.5))
            return {
                problem: say(`$X$ aldagaia $${bin}$ da. Normalarekin, kalkulatu $P(X<${k})$.`, `$X$ sigue una $${bin}$. Con la normal, calcula $P(X<${k})$.`, `يتبع $X$ التوزيع $${bin}$. بالتوزيع الطبيعي احسب $P(X<${k})$.`, `$X$ follows $${bin}$. Using the normal, work out $P(X<${k})$.`),
                lines: [line(LABELS.normal, n), line(LABELS.correction, `P(X<${k})\\approx P(Y\\le ${decimalLatex(k + 0.5)})`), line(LABELS.result, `P(Z\\le ${zLatex(z(k + 0.5))})=${tableLatex(reached)}`)],
                wrong: 1, error, fix: `P(Y\\le ${decimalLatex(k - 0.5)})\\ \\to\\ ${tableLatex(right)}`, right: right / 10_000, reached: reached / 10_000
            }
        }
        case 'approx-sd': {
            const item = pick(random, APPROX.filter((entry) => entry.sd !== entry.variance))
            const k = item.mean + pick(random, [1, 2]) * item.sd
            const bin = `B(${item.n};\\,${tenths(item.p)})`
            const right = below(Math.round(((k + 0.5 - item.mean) / item.sd) * 100) / 100)
            const wrongZ = (k + 0.5 - item.mean) / item.variance
            const rounded = Math.round(wrongZ * 100) / 100
            if (Math.abs(wrongZ - rounded) > 1e-9) return null
            const reached = below(rounded)
            return {
                problem: say(`$X$ aldagaia $${bin}$ da. Normalarekin, kalkulatu $P(X\\le ${k})$.`, `$X$ sigue una $${bin}$. Con la normal, calcula $P(X\\le ${k})$.`, `يتبع $X$ التوزيع $${bin}$. بالتوزيع الطبيعي احسب $P(X\\le ${k})$.`, `$X$ follows $${bin}$. Using the normal, work out $P(X\\le ${k})$.`),
                lines: [line(LABELS.normal, `N(${item.mean};\\,${item.variance})`), line(LABELS.correction, `P(X\\le ${k})\\approx P(Y\\le ${decimalLatex(k + 0.5)})`), line(LABELS.result, `P(Z\\le ${zLatex(rounded)})=${tableLatex(reached)}`)],
                wrong: 0, error, fix: `N(${item.mean};\\,\\sqrt{${item.variance}})=N(${item.mean};\\,${item.sd})\\ \\to\\ ${tableLatex(right)}`, right: right / 10_000, reached: reached / 10_000
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createDistributionsBatx2DetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, distributionsBatx2DetectiveLevels[levelIndex], DISTRIBUTIONS_BATX2_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
