import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { above, below, between, inverseTable, tableLatex, zLatex } from '../../batx2-zientziak-banaketak/normal.ts'

/* ==========================================================================
   J4 · Normalaren detektibea (Detective de la normal), 1.º Sociales: a
   worked solution of three lines with one wrong line. Level 1 (table and
   areas): P(Z > k) read straight from the table, −k taken as k, the half
   band μ to μ + σ taken as 68,26 %, and a triangle density without its ½.
   Level 2 (standardising and approximating): dividing by the variance,
   the inverse search with the area above, σ = npq for the approximating
   normal, and no half unit. Level 3 (fit): the plain mean of the class
   edges instead of the marks, the class mark standardised instead of the
   edges, the expected count left as a probability, and the difference
   compared with 5 instead of 5 % of the total. Every value comes from the
   table of normal.ts; `right` and `reached` tell the cases apart.
   ========================================================================== */

export type NormalBatx1gDetectiveError =
    | 'above-as-below'
    | 'negative-as-positive'
    | 'half-band'
    | 'triangle-no-half'
    | 'variance-standardize'
    | 'inverse-above'
    | 'approx-sd'
    | 'no-correction'
    | 'edges-mean'
    | 'mark-standardized'
    | 'expected-probability'
    | 'percent-raw'

export const normalBatx1gDetectiveLevels: NormalBatx1gDetectiveError[][] = [
    ['above-as-below', 'negative-as-positive', 'half-band', 'triangle-no-half'],
    ['variance-standardize', 'inverse-above', 'approx-sd', 'no-correction'],
    ['edges-mean', 'mark-standardized', 'expected-probability', 'percent-raw']
]

export const NORMAL_BATX1G_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    table: say('Taula', 'Tabla', 'الجدول', 'Table'),
    standardize: say('Tipifikatu', 'Tipificar', 'التوحيد المعياري', 'Standardise'),
    normal: say('Normala', 'Normal', 'الطبيعي', 'Normal'),
    correction: say('Zuzenketa', 'Corrección', 'التصحيح', 'Correction'),
    decision: say('Erabakia', 'Decisión', 'القرار', 'Decision')
}

export const normalBatx1gDetectiveNames: Record<NormalBatx1gDetectiveError, LocalizedText> = {
    'above-as-below': say('$P(Z>k)$ taulan zuzenean irakurri du', 'Leyó $P(Z>k)$ directamente en la tabla', 'قرأ $P(Z>k)$ من الجدول مباشرة', 'Read $P(Z>k)$ straight from the table'),
    'negative-as-positive': say('$-k$ eta $k$ berdintzat hartu ditu', 'Tomó $-k$ como si fuera $k$', 'اعتبر $-k$ كأنه $k$', 'Took $-k$ as if it were $k$'),
    'half-band': say('Alde bakarrari % 68,26 eman dio', 'Dio el 68,26 % a un solo lado', 'أعطى 68.26٪ لجهة واحدة', 'Gave 68.26% to one side only'),
    'triangle-no-half': say('Triangeluaren ½ ahaztu du', 'Olvidó el ½ del triángulo', 'نسي ½ في المثلث', 'Forgot the ½ of the triangle'),
    'variance-standardize': say('Bariantzaz zatitu du tipifikatzean', 'Dividió entre la varianza al tipificar', 'قسم على التباين عند التوحيد', 'Divided by the variance when standardising'),
    'inverse-above': say('Gaineko azalera bilatu du taulan', 'Buscó en la tabla el área de encima', 'بحث في الجدول عن المساحة فوق', 'Looked up the area above in the table'),
    'approx-sd': say('Normalaren $\\sigma$ gisa $npq$ hartu du', 'Tomó $npq$ como la $\\sigma$ de la normal', 'أخذ $npq$ على أنه $\\sigma$ للطبيعي', 'Took $npq$ as the $\\sigma$ of the normal'),
    'no-correction': say('Puntu erdia ahaztu du', 'Olvidó el medio punto', 'نسي نصف الوحدة', 'Forgot the half unit'),
    'edges-mean': say('Klase-muturrak erabili ditu, ez markak', 'Usó los extremos de clase, no las marcas', 'استعمل أطراف الفئات لا مراكزها', 'Used the class ends, not the marks'),
    'mark-standardized': say('Klase-marka tipifikatu du, ez muturrak', 'Tipificó la marca de clase, no los extremos', 'وحّد مركز الفئة لا طرفيها', 'Standardised the class mark, not the ends'),
    'expected-probability': say('Probabilitatea hartu du balio itxaron gisa', 'Tomó la probabilidad como valor esperado', 'أخذ الاحتمال على أنه القيمة المتوقعة', 'Took the probability as the expected value'),
    'percent-raw': say('Diferentzia 5 zenbakiarekin alderatu du, ez % 5 ehunekoarekin', 'Comparó la diferencia con 5, no con el 5 %', 'قارن الفرق بالعدد 5 لا بـ 5٪', 'Compared the difference with 5, not with 5%')
}

export const normalBatx1gDetectiveTips: Record<NormalBatx1gDetectiveError, LocalizedText> = {
    'above-as-below': say('Taulak azpikoa ematen du: $P(Z>k)=1-P(Z\\le k)$.', 'La tabla da lo de debajo: $P(Z>k)=1-P(Z\\le k)$.', 'يعطي الجدول ما تحت: $P(Z>k)=1-P(Z\\le k)$.', 'The table gives what lies below: $P(Z>k)=1-P(Z\\le k)$.'),
    'negative-as-positive': say('Simetriagatik, $P(Z\\le -k)=1-P(Z\\le k)$.', 'Por simetría, $P(Z\\le -k)=1-P(Z\\le k)$.', 'بالتماثل $P(Z\\le -k)=1-P(Z\\le k)$.', 'By symmetry, $P(Z\\le -k)=1-P(Z\\le k)$.'),
    'half-band': say('% 68,26 $\\mu-\\sigma$ eta $\\mu+\\sigma$ artean dago; alde batean, erdia.', 'El 68,26 % está entre $\\mu-\\sigma$ y $\\mu+\\sigma$; a un lado, la mitad.', '68.26٪ بين $\\mu-\\sigma$ و$\\mu+\\sigma$؛ وفي جهة واحدة النصف.', '68.26% lies between $\\mu-\\sigma$ and $\\mu+\\sigma$; on one side, half of it.'),
    'triangle-no-half': say('Triangeluaren azalera $\\frac{b\\cdot h}{2}$ da.', 'El área del triángulo es $\\frac{b\\cdot h}{2}$.', 'مساحة المثلث $\\frac{b\\cdot h}{2}$.', 'The area of the triangle is $\\frac{b\\cdot h}{2}$.'),
    'variance-standardize': say('${z}=\\frac{x-\\mu}{\\sigma}$: desbideratzeaz zatitzen da.', '${z}=\\frac{x-\\mu}{\\sigma}$: se divide entre la desviación.', '${z}=\\frac{x-\\mu}{\\sigma}$: نقسم على الانحراف.', '${z}=\\frac{x-\\mu}{\\sigma}$: divide by the deviation.'),
    'inverse-above': say('Gainetik $p$ badago, azpitik $1-p$ dago: hori bilatzen da.', 'Si por encima hay $p$, por debajo hay $1-p$: eso se busca.', 'إذا كان فوقها $p$ فتحتها $1-p$: وهذا ما نبحث عنه.', 'If $p$ lies above, $1-p$ lies below: that is what you look for.'),
    'approx-sd': say('Normalak binomialaren $\\sigma$ bera du: $\\sqrt{npq}$.', 'La normal tiene la misma $\\sigma$ que la binomial: $\\sqrt{npq}$.', 'للطبيعي $\\sigma$ الثنائي نفسه: $\\sqrt{npq}$.', 'The normal has the same $\\sigma$ as the binomial: $\\sqrt{npq}$.'),
    'no-correction': say('$k$ balioaren barra $k+0{,}5$ arte iristen da.', 'La barra de $k$ llega hasta $k+0{,}5$.', 'يصل عمود $k$ إلى $k+0{,}5$.', 'The bar of $k$ reaches $k+0{,}5$.'),
    'edges-mean': say('Klase bakoitzak bere marka du: muturren erdiko puntua.', 'Cada clase tiene su marca: el punto medio de sus extremos.', 'لكل فئة مركزها: منتصف طرفيها.', 'Each class has its mark: the midpoint of its ends.'),
    'mark-standardized': say('Klasearen probabilitatea muturren artekoa da: tipifikatu biak.', 'La probabilidad de la clase está entre sus extremos: tipifica los dos.', 'احتمال الفئة بين طرفيها: وحّد الطرفين.', 'The probability of the class lies between its ends: standardise both.'),
    'expected-probability': say('Balio itxarona $N\\cdot p$ da: biderkatu datu kopuruaz.', 'El valor esperado es $N\\cdot p$: multiplica por el número de datos.', 'القيمة المتوقعة $N\\cdot p$: اضرب في عدد المعطيات.', 'The expected value is $N\\cdot p$: multiply by the number of data.'),
    'percent-raw': say('Zatitu diferentzia guztizkoaz, eta alderatu $0{,}05$ zenbakiarekin.', 'Divide la diferencia entre el total y compárala con $0{,}05$.', 'اقسم الفرق على الكل وقارنه بـ $0{,}05$.', 'Divide the difference by the total and compare it with $0{,}05$.')
}

type Built = Omit<WorkedCase<NormalBatx1gDetectiveError>, 'options'>

const decimalLatex = (value: number) => {
    for (let places = 0; places <= 6; places += 1) if (Math.abs(Math.round(value * 10 ** places) - value * 10 ** places) < 1e-7) return value.toFixed(places).replace('.', '{,}')
    return value.toFixed(4).replace('.', '{,}')
}
const T = (tenThousandths: number) => tableLatex(tenThousandths)
const Z = '{z}'

function build(random: Random, error: NormalBatx1gDetectiveError): Built | null {
    switch (error) {
        case 'above-as-below': {
            const k = randomInt(random, 30, 220) / 100
            return {
                problem: say(`Kalkulatu $P(Z>${zLatex(k)})$.`, `Calcula $P(Z>${zLatex(k)})$.`, `احسب $P(Z>${zLatex(k)})$.`, `Work out $P(Z>${zLatex(k)})$.`),
                lines: [line(LABELS.table, `P(Z\\le ${zLatex(k)})=${T(below(k))}`), line(LABELS.step, `P(Z>${zLatex(k)})=P(Z\\le ${zLatex(k)})`), line(LABELS.result, `P(Z>${zLatex(k)})=${T(below(k))}`)],
                wrong: 1, error, fix: `P(Z>${zLatex(k)})=1-${T(below(k))}=${T(above(k))}`, right: above(k) / 10_000, reached: below(k) / 10_000
            }
        }
        case 'negative-as-positive': {
            const k = randomInt(random, 30, 220) / 100
            return {
                problem: say(`Kalkulatu $P(Z\\le -${zLatex(k)})$.`, `Calcula $P(Z\\le -${zLatex(k)})$.`, `احسب $P(Z\\le -${zLatex(k)})$.`, `Work out $P(Z\\le -${zLatex(k)})$.`),
                lines: [line(LABELS.table, `P(Z\\le ${zLatex(k)})=${T(below(k))}`), line(LABELS.step, `P(Z\\le -${zLatex(k)})=P(Z\\le ${zLatex(k)})`), line(LABELS.result, `P(Z\\le -${zLatex(k)})=${T(below(k))}`)],
                wrong: 1, error, fix: `P(Z\\le -${zLatex(k)})=1-${T(below(k))}=${T(below(-k))}`, right: below(-k) / 10_000, reached: below(k) / 10_000
            }
        }
        case 'half-band': {
            const sd = pick(random, [2, 4, 5, 10])
            const mean = 10 * randomInt(random, 5, 20)
            return {
                problem: say(`$X\\sim N(${mean};\\,${sd})$. Kalkulatu $P(${mean}\\le X\\le ${mean + sd})$.`, `$X\\sim N(${mean};\\,${sd})$. Calcula $P(${mean}\\le X\\le ${mean + sd})$.`, `$X\\sim N(${mean};\\,${sd})$. احسب $P(${mean}\\le X\\le ${mean + sd})$.`, `$X\\sim N(${mean};\\,${sd})$. Work out $P(${mean}\\le X\\le ${mean + sd})$.`),
                lines: [line(LABELS.step, `${mean + sd}=\\mu+\\sigma`), line(LABELS.step, `P(\\mu\\le X\\le\\mu+\\sigma)=${T(between(-1, 1))}`), line(LABELS.result, `P(${mean}\\le X\\le ${mean + sd})=${T(between(-1, 1))}`)],
                wrong: 1, error, fix: `\\frac{${T(between(-1, 1))}}{2}=${T(between(0, 1))}`, right: between(0, 1) / 10_000, reached: between(-1, 1) / 10_000
            }
        }
        case 'triangle-no-half': {
            const base = pick(random, [2, 4, 5, 10])
            const height = 2 / base
            return {
                problem: say(`$f(x)=kx$ 0 eta ${base} artean. Zein $k$ balioak egiten du dentsitate?`, `$f(x)=kx$ entre 0 y ${base}. ¿Qué $k$ la hace densidad?`, `$f(x)=kx$ بين 0 و${base}. أي $k$ يجعلها كثافة؟`, `$f(x)=kx$ between 0 and ${base}. Which $k$ makes it a density?`),
                lines: [line(LABELS.step, `f(${base})=${base}k`), line(LABELS.step, `${base}\\cdot ${base}k=1`), line(LABELS.result, `k=${decimalLatex(1 / (base * base))}`)],
                wrong: 1, error, fix: `\\frac{${base}\\cdot ${base}k}{2}=1\\ \\to\\ k=${decimalLatex(height / base)}`, right: height / base, reached: 1 / (base * base)
            }
        }
        case 'variance-standardize': {
            const sd = pick(random, [2, 4, 5])
            const mean = 10 * randomInt(random, 3, 10)
            const steps = pick(random, [1, 2, 3])
            const x = mean + steps * sd
            const wrongZ = (x - mean) / (sd * sd)
            const rounded = Math.round(wrongZ * 100) / 100
            if (Math.abs(rounded - wrongZ) > 1e-9) return null
            return {
                problem: say(`$X\\sim N(${mean};\\,${sd})$. Kalkulatu $P(X\\le ${x})$.`, `$X\\sim N(${mean};\\,${sd})$. Calcula $P(X\\le ${x})$.`, `$X\\sim N(${mean};\\,${sd})$. احسب $P(X\\le ${x})$.`, `$X\\sim N(${mean};\\,${sd})$. Work out $P(X\\le ${x})$.`),
                lines: [line(LABELS.standardize, `${Z}=\\frac{${x}-${mean}}{${sd * sd}}=${zLatex(rounded)}`), line(LABELS.table, `P(Z\\le ${zLatex(rounded)})=${T(below(rounded))}`), line(LABELS.result, `P(X\\le ${x})=${T(below(rounded))}`)],
                wrong: 0, error, fix: `${Z}=\\frac{${x}-${mean}}{${sd}}=${steps}\\ \\to\\ ${T(below(steps))}`, right: below(steps) / 10_000, reached: below(rounded) / 10_000
            }
        }
        case 'inverse-above': {
            const [percent, tenThousandths] = pick(random, [[10, 9000], [20, 8000], [25, 7500], [15, 8500]])
            const k = inverseTable(tenThousandths)!
            const sd = pick(random, [2, 5, 10])
            const mean = 10 * randomInt(random, 4, 10)
            return {
                problem: say(`$X\\sim N(${mean};\\,${sd})$. Zein balio uzten du gainetik % ${percent}?`, `$X\\sim N(${mean};\\,${sd})$. ¿Qué valor deja por encima el ${percent} %?`, `$X\\sim N(${mean};\\,${sd})$. أي قيمة تترك فوقها ${percent}٪؟`, `$X\\sim N(${mean};\\,${sd})$. Which value has ${percent}% above it?`),
                lines: [line(LABELS.table, `P(Z\\le k)=${decimalLatex(percent / 100)}`), line(LABELS.step, `x=${mean}-${zLatex(k)}\\cdot ${sd}`), line(LABELS.result, `x=${decimalLatex(mean - k * sd)}`)],
                wrong: 0, error, fix: `P(Z\\le k)=${decimalLatex(1 - percent / 100)}\\ \\to\\ x=${decimalLatex(mean + k * sd)}`, right: mean + k * sd, reached: mean - k * sd
            }
        }
        case 'approx-sd': {
            const [n, p, sd] = pick(random, [[16, 5, 2], [100, 5, 5], [400, 5, 10], [25, 2, 2]])
            const mean = (n * p) / 10
            const variance = sd * sd
            const k = mean + pick(random, [1, 2]) * sd
            const rightZ = (k + 0.5 - mean) / sd
            const wrongZ = (k + 0.5 - mean) / variance
            const rounded = Math.round(wrongZ * 100) / 100
            if (Math.abs(rounded - wrongZ) > 1e-9 || Math.abs(Math.round(rightZ * 100) / 100 - rightZ) > 1e-9) return null
            return {
                problem: say(`$X\\sim B(${n};\\,${decimalLatex(p / 10)})$. Normalarekin, kalkulatu $P(X\\le ${k})$.`, `$X\\sim B(${n};\\,${decimalLatex(p / 10)})$. Con la normal, calcula $P(X\\le ${k})$.`, `$X\\sim B(${n};\\,${decimalLatex(p / 10)})$. بالتوزيع الطبيعي احسب $P(X\\le ${k})$.`, `$X\\sim B(${n};\\,${decimalLatex(p / 10)})$. Using the normal, work out $P(X\\le ${k})$.`),
                lines: [line(LABELS.normal, `N(${mean};\\,${variance})`), line(LABELS.correction, `P(X\\le ${k})\\approx P(Y\\le ${decimalLatex(k + 0.5)})`), line(LABELS.result, `P(Z\\le ${zLatex(rounded)})=${T(below(rounded))}`)],
                wrong: 0, error, fix: `N(${mean};\\,\\sqrt{${variance}})=N(${mean};\\,${sd})\\ \\to\\ ${T(below(rightZ))}`, right: below(rightZ) / 10_000, reached: below(rounded) / 10_000
            }
        }
        case 'no-correction': {
            const [n, p, sd] = pick(random, [[16, 5, 2], [100, 5, 5], [400, 5, 10]])
            const mean = (n * p) / 10
            const k = mean + pick(random, [1, 2, 3]) * sd
            const rightZ = (k + 0.5 - mean) / sd
            if (Math.abs(Math.round(rightZ * 100) / 100 - rightZ) > 1e-9) return null
            const plainZ = (k - mean) / sd
            return {
                problem: say(`$X\\sim B(${n};\\,${decimalLatex(p / 10)})$. Normalarekin, kalkulatu $P(X\\le ${k})$.`, `$X\\sim B(${n};\\,${decimalLatex(p / 10)})$. Con la normal, calcula $P(X\\le ${k})$.`, `$X\\sim B(${n};\\,${decimalLatex(p / 10)})$. بالتوزيع الطبيعي احسب $P(X\\le ${k})$.`, `$X\\sim B(${n};\\,${decimalLatex(p / 10)})$. Using the normal, work out $P(X\\le ${k})$.`),
                lines: [line(LABELS.normal, `N(${mean};\\,${sd})`), line(LABELS.correction, `P(X\\le ${k})\\approx P(Y\\le ${k})`), line(LABELS.result, `P(Z\\le ${zLatex(plainZ)})=${T(below(plainZ))}`)],
                wrong: 1, error, fix: `P(Y\\le ${decimalLatex(k + 0.5)})\\ \\to\\ ${T(below(rightZ))}`, right: below(rightZ) / 10_000, reached: below(plainZ) / 10_000
            }
        }
        case 'edges-mean': {
            const width = pick(random, [2, 10])
            const start = width * randomInt(random, 1, 10)
            const a = randomInt(random, 2, 9)
            const b = randomInt(random, 2, 9)
            if (a === b) return null
            const total = a + b
            const right = ((start + width / 2) * a + (start + 1.5 * width) * b) / total
            const reached = (start * a + (start + width) * b) / total
            const mark = (value: number) => decimalLatex(value)
            return {
                problem: say(`Bi klase: ${start}–${start + width} (${a} datu) eta ${start + width}–${start + 2 * width} (${b} datu). Kalkulatu $\\bar{x}$.`, `Dos clases: ${start}–${start + width} (${a} datos) y ${start + width}–${start + 2 * width} (${b} datos). Calcula $\\bar{x}$.`, `فئتان: ${start}–${start + width} (${a} معطيات) و${start + width}–${start + 2 * width} (${b} معطيات). احسب $\\bar{x}$.`, `Two classes: ${start}–${start + width} (${a} data) and ${start + width}–${start + 2 * width} (${b} data). Work out $\\bar{x}$.`),
                lines: [line(LABELS.data, `N=${total}`), line(LABELS.step, `\\bar{x}=\\frac{${start}\\cdot ${a}+${start + width}\\cdot ${b}}{${total}}`), line(LABELS.result, `\\bar{x}=${decimalLatex(Math.round(reached * 1000) / 1000)}`)],
                wrong: 1, error, fix: `\\bar{x}=\\frac{${mark(start + width / 2)}\\cdot ${a}+${mark(start + 1.5 * width)}\\cdot ${b}}{${total}}`, right, reached
            }
        }
        case 'mark-standardized': {
            const sd = pick(random, [2, 4, 5, 10])
            const mean = 10 * randomInt(random, 5, 20)
            const total = pick(random, [100, 200, 400])
            const wrongZ = -0.5
            return {
                problem: say(`${total} datu $N(${mean};\\,${sd})$ banaketarekin alderatzen dira. Zein da ${mean - sd}–${mean} klasearen probabilitatea?`, `Se comparan ${total} datos con una $N(${mean};\\,${sd})$. ¿Qué probabilidad tiene la clase ${mean - sd}–${mean}?`, `تُقارن ${total} معطى بـ $N(${mean};\\,${sd})$. ما احتمال الفئة ${mean - sd}–${mean}؟`, `${total} data are compared with a $N(${mean};\\,${sd})$. What is the probability of the class ${mean - sd}–${mean}?`),
                lines: [line(LABELS.step, `c=${decimalLatex(mean - sd / 2)}`), line(LABELS.standardize, `${Z}=\\frac{${decimalLatex(mean - sd / 2)}-${mean}}{${sd}}=${zLatex(wrongZ)}`), line(LABELS.result, `P(Z\\le ${zLatex(wrongZ)})=${T(below(wrongZ))}`)],
                wrong: 1, error, fix: `P(-1\\le Z\\le 0)=${T(between(-1, 0))}`, right: between(-1, 0) / 10_000, reached: below(wrongZ) / 10_000
            }
        }
        case 'expected-probability': {
            const total = pick(random, [80, 100, 200, 400])
            const observed = Math.round((total * between(0, 1)) / 10_000) + pick(random, [-3, 2, 4])
            const expected = (total * between(0, 1)) / 10_000
            return {
                problem: say(`${total} datu $N(\\mu;\\,\\sigma)$ batekin; $\\mu$ eta $\\mu+\\sigma$ artean ${observed} behatu dira. Zein da diferentzia?`, `${total} datos y una $N(\\mu;\\,\\sigma)$; entre $\\mu$ y $\\mu+\\sigma$ se han observado ${observed}. ¿Cuál es la diferencia?`, `${total} معطى و$N(\\mu;\\,\\sigma)$؛ لوحظ ${observed} بين $\\mu$ و$\\mu+\\sigma$. ما الفرق؟`, `${total} data and a $N(\\mu;\\,\\sigma)$; ${observed} were observed between $\\mu$ and $\\mu+\\sigma$. What is the difference?`),
                lines: [line(LABELS.table, `P(0\\le Z\\le 1)=${T(between(0, 1))}`), line(LABELS.step, `E=${T(between(0, 1))}`), line(LABELS.result, `|${observed}-${T(between(0, 1))}|=${decimalLatex(Math.round((observed - between(0, 1) / 10_000) * 10_000) / 10_000)}`)],
                wrong: 1, error, fix: `E=${total}\\cdot ${T(between(0, 1))}=${decimalLatex(expected)}`, right: Math.abs(observed - expected), reached: Math.abs(observed - between(0, 1) / 10_000)
            }
        }
        case 'percent-raw': {
            const total = pick(random, [200, 300, 400, 500])
            const largest = randomInt(random, 6, 9)
            return {
                problem: say(`${total} datutan, diferentziarik handiena ${largest} da. Normalak balio du?`, `En ${total} datos, la mayor diferencia es ${largest}. ¿Sirve la normal?`, `في ${total} معطى أكبر فرق ${largest}. هل يصلح التوزيع الطبيعي؟`, `In ${total} data, the largest difference is ${largest}. Does the normal work?`),
                lines: [line(LABELS.data, `N=${total},\\ d_{\\max}=${largest}`), line(LABELS.step, `${largest}>5`), line(LABELS.decision, '\\times')],
                wrong: 1, error, fix: `\\frac{${largest}}{${total}}=${decimalLatex(largest / total)}<0{,}05`, right: largest / total, reached: largest
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createNormalBatx1gDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, normalBatx1gDetectiveLevels[levelIndex], NORMAL_BATX1G_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
