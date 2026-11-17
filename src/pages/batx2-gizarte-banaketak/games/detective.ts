import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { below, tableLatex } from '../../batx2-zientziak-banaketak/normal.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { criticalZ, decimalLatex, inverseZ } from '../critical.ts'

/* ==========================================================================
   B-J3 · Banaketen detektibea (Gizarte Zientziak): a worked solution of
   three lines with one wrong line, with the mistakes of this unit in its
   contexts. Level 1 (binomial): the C(n, k) orders left out, σ given as
   npq, «at least one» as 1 − pⁿ. Level 2 (normal): P(Z > k) read as the
   table, dividing by the variance, P(Z ≤ −k) read as P(Z ≤ k), the best
   k % cut with Φ = k. Level 3 (intervals and approximation): the radius
   without σ, the critical value of 95 % read at 0,95, the continuity
   correction the wrong way. `right` and `reached` only tell the cases
   apart. Pure logic.
   ========================================================================== */

export type DistributionsBatx2gDetectiveError =
    | 'no-coefficient'
    | 'variance-as-sd'
    | 'at-least-one'
    | 'table-above'
    | 'divide-variance'
    | 'negative-sign'
    | 'wrong-tail'
    | 'radius-without-sd'
    | 'level-as-phi'
    | 'correction-wrong-way'

export const distributionsBatx2gDetectiveLevels: DistributionsBatx2gDetectiveError[][] = [
    ['no-coefficient', 'variance-as-sd', 'at-least-one'],
    ['table-above', 'divide-variance', 'negative-sign', 'wrong-tail'],
    ['radius-without-sd', 'level-as-phi', 'correction-wrong-way']
]

export const DISTRIBUTIONS_BATX2G_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    table: say('Taula', 'Tabla', 'الجدول', 'Table'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const d = decimalLatex
const t = (z: number) => tableLatex(below(z))

export const distributionsBatx2gDetectiveNames: Record<DistributionsBatx2gDetectiveError, LocalizedText> = {
    'no-coefficient': say('Ordenak ahaztu ditu: $\\binom{n}{k}$ falta da', 'Olvidó los órdenes: falta $\\binom{n}{k}$', 'نسي الترتيبات: ينقص $\\binom{n}{k}$', 'Forgot the orders: $\\binom{n}{k}$ is missing'),
    'variance-as-sd': say('$npq$ eman du $\\sigma$ gisa', 'Dio $npq$ como $\\sigma$', 'أعطى $npq$ على أنه $\\sigma$', 'Gave $npq$ as $\\sigma$'),
    'at-least-one': say('«Gutxienez bat» $1-p^n$ dela uste izan du', 'Creyó que «al menos uno» es $1-p^n$', 'ظن أن «واحد على الأقل» هو $1-p^n$', 'Thought ‘at least one’ is $1-p^n$'),
    'table-above': say('$P(Z>k)$ zuzenean taulan irakurri du', 'Leyó $P(Z>k)$ directamente en la tabla', 'قرأ $P(Z>k)$ مباشرة من الجدول', 'Read $P(Z>k)$ straight from the table'),
    'divide-variance': say('Bariantzaz zatitu du, ez $\\sigma$ zenbakiaz', 'Dividió entre la varianza, no entre $\\sigma$', 'قسم على التباين لا على $\\sigma$', 'Divided by the variance, not by $\\sigma$'),
    'negative-sign': say('Zeinu negatiboa ahaztu du taulan', 'Olvidó el signo negativo en la tabla', 'نسي الإشارة السالبة في الجدول', 'Forgot the minus sign in the table'),
    'wrong-tail': say('% k onenarentzat $P(Z\\le k)$ = k % hartu du', 'Para el k % mejor tomó $P(Z\\le k)$ = k %', 'لأفضل k % أخذ $P(Z\\le k)$ = k %', 'For the best k % took $P(Z\\le k)$ = k %'),
    'radius-without-sd': say('Erradioan ez du $\\sigma$ zenbakiaz biderkatu', 'En el radio no multiplicó por $\\sigma$', 'لم يضرب في $\\sigma$ في نصف القطر', 'Did not multiply by $\\sigma$ in the radius'),
    'level-as-phi': say('Balio kritikoa mailan bilatu du, ez $1-\\frac{\\alpha}{2}$ zenbakian', 'Buscó el valor crítico en el nivel, no en $1-\\frac{\\alpha}{2}$', 'بحث عن القيمة الحرجة عند المستوى لا عند $1-\\frac{\\alpha}{2}$', 'Looked up the critical value at the level, not at $1-\\frac{\\alpha}{2}$'),
    'correction-wrong-way': say('Zuzenketa kontrako aldera egin du', 'Hizo la corrección hacia el lado contrario', 'صحّح في الاتجاه المعاكس', 'Corrected the wrong way')
}

export const distributionsBatx2gDetectiveTips: Record<DistributionsBatx2gDetectiveError, LocalizedText> = {
    'no-coefficient': say('$P(X=k)=\\binom{n}{k}\\,p^k\\,q^{n-k}$: bide guztiak zenbatu.', '$P(X=k)=\\binom{n}{k}\\,p^k\\,q^{n-k}$: cuenta todos los caminos.', '$P(X=k)=\\binom{n}{k}\\,p^k\\,q^{n-k}$: عدّ كل المسارات.', '$P(X=k)=\\binom{n}{k}\\,p^k\\,q^{n-k}$: count every path.'),
    'variance-as-sd': say('$\\sigma=\\sqrt{npq}$; $npq$ bariantza da.', '$\\sigma=\\sqrt{npq}$; $npq$ es la varianza.', '$\\sigma=\\sqrt{npq}$؛ و$npq$ هو التباين.', '$\\sigma=\\sqrt{npq}$; $npq$ is the variance.'),
    'at-least-one': say('«Bat ere ez» $q^n$ da: $P(X\\ge 1)=1-q^n$.', '«Ninguno» es $q^n$: $P(X\\ge 1)=1-q^n$.', '«لا شيء» هو $q^n$: $P(X\\ge 1)=1-q^n$.', '‘None’ is $q^n$: $P(X\\ge 1)=1-q^n$.'),
    'table-above': say('Taulak azpikoa ematen du: $P(Z>k)=1-P(Z\\le k)$.', 'La tabla da lo de debajo: $P(Z>k)=1-P(Z\\le k)$.', 'يعطي الجدول ما تحت: $P(Z>k)=1-P(Z\\le k)$.', 'The table gives what lies below: $P(Z>k)=1-P(Z\\le k)$.'),
    'divide-variance': say('$z=\\frac{x-\\mu}{\\sigma}$.', '$z=\\frac{x-\\mu}{\\sigma}$.', '$z=\\frac{x-\\mu}{\\sigma}$.', '$z=\\frac{x-\\mu}{\\sigma}$.'),
    'negative-sign': say('Simetriaz: $P(Z\\le -k)=1-P(Z\\le k)$.', 'Por simetría: $P(Z\\le -k)=1-P(Z\\le k)$.', 'بالتماثل: $P(Z\\le -k)=1-P(Z\\le k)$.', 'By symmetry: $P(Z\\le -k)=1-P(Z\\le k)$.'),
    'wrong-tail': say('Mugaren azpian $1-\\frac{k}{100}$ geratzen da.', 'Por debajo del corte queda $1-\\frac{k}{100}$.', 'تحت الحد يبقى $1-\\frac{k}{100}$.', 'Below the cut lies $1-\\frac{k}{100}$.'),
    'radius-without-sd': say('Erradioa $z_{\\alpha/2}\\,\\sigma$ da.', 'El radio es $z_{\\alpha/2}\\,\\sigma$.', 'نصف القطر $z_{\\alpha/2}\\,\\sigma$.', 'The radius is $z_{\\alpha/2}\\,\\sigma$.'),
    'level-as-phi': say('Buztan bakoitzean $\\frac{\\alpha}{2}$: bilatu $1-\\frac{\\alpha}{2}$ taulan.', 'En cada cola $\\frac{\\alpha}{2}$: busca $1-\\frac{\\alpha}{2}$ en la tabla.', 'في كل ذيل $\\frac{\\alpha}{2}$: ابحث عن $1-\\frac{\\alpha}{2}$ في الجدول.', 'Each tail holds $\\frac{\\alpha}{2}$: look up $1-\\frac{\\alpha}{2}$ in the table.'),
    'correction-wrong-way': say('$X\\ge k$ denean, $k$ barra sartzen da: $k-0{,}5$ zenbakitik.', 'Con $X\\ge k$ entra la barra de $k$: desde $k-0{,}5$.', 'مع $X\\ge k$ يدخل عمود $k$: من $k-0{,}5$.', 'With $X\\ge k$ the bar of $k$ goes in: from $k-0{,}5$.')
}

type Built = Omit<WorkedCase<DistributionsBatx2gDetectiveError>, 'options'>
const choose = (n: number, k: number): number => (k === 0 ? 1 : (choose(n, k - 1) * (n - k + 1)) / k)

function build(random: Random, error: DistributionsBatx2gDetectiveError): Built | null {
    switch (error) {
        case 'no-coefficient': {
            const n = randomInt(random, 3, 5)
            const k = randomInt(random, 1, n - 1)
            const p = pick(random, [0.5])
            const path = p ** n
            const right = choose(n, k) * path
            return {
                problem: say(`$X\\sim B(${n};\\,0{,}5)$. Kalkulatu $P(X=${k})$.`, `$X\\sim B(${n};\\,0{,}5)$. Calcula $P(X=${k})$.`, `$X\\sim B(${n};\\,0{,}5)$. احسب $P(X=${k})$.`, `$X\\sim B(${n};\\,0{,}5)$. Work out $P(X=${k})$.`),
                lines: [line(LABELS.data, `n=${n},\\ p=0{,}5`), line(LABELS.step, `P(X=${k})=0{,}5^{${k}}\\cdot 0{,}5^{${n - k}}`), line(LABELS.result, `P(X=${k})=${d(path)}`)],
                wrong: 1, error, fix: `P(X=${k})=${choose(n, k)}\\cdot 0{,}5^{${n}}=${d(right)}`, right, reached: path
            }
        }
        case 'variance-as-sd': {
            const n = pick(random, [100, 400])
            const p = pick(random, [0.5, 0.2])
            const variance = n * p * (1 - p)
            if (!Number.isInteger(Math.sqrt(variance))) return null
            return {
                problem: say(`$X\\sim B(${n};\\,${d(p)})$. Kalkulatu $\\sigma$.`, `$X\\sim B(${n};\\,${d(p)})$. Calcula $\\sigma$.`, `$X\\sim B(${n};\\,${d(p)})$. احسب $\\sigma$.`, `$X\\sim B(${n};\\,${d(p)})$. Work out $\\sigma$.`),
                lines: [line(LABELS.data, `\\mu=${n * p}`), line(LABELS.step, `\\sigma=npq=${variance}`), line(LABELS.result, `\\sigma=${variance}`)],
                wrong: 1, error, fix: `\\sigma=\\sqrt{${variance}}=${Math.sqrt(variance)}`, right: Math.sqrt(variance), reached: variance
            }
        }
        case 'at-least-one': {
            const n = randomInt(random, 2, 4)
            const p = pick(random, [0.1, 0.2, 0.3])
            const q = Math.round((1 - p) * 10) / 10
            const right = 1 - q ** n
            const reached = 1 - p ** n
            return {
                problem: say(`$X\\sim B(${n};\\,${d(p)})$. Kalkulatu $P(X\\ge 1)$.`, `$X\\sim B(${n};\\,${d(p)})$. Calcula $P(X\\ge 1)$.`, `$X\\sim B(${n};\\,${d(p)})$. احسب $P(X\\ge 1)$.`, `$X\\sim B(${n};\\,${d(p)})$. Work out $P(X\\ge 1)$.`),
                lines: [line(LABELS.data, `p=${d(p)},\\ q=${d(q)}`), line(LABELS.step, `P(X\\ge 1)=1-${d(p)}^{${n}}`), line(LABELS.result, `P(X\\ge 1)=${d(Math.round(reached * 10000) / 10000)}`)],
                wrong: 1, error, fix: `P(X\\ge 1)=1-${d(q)}^{${n}}=${d(Math.round(right * 10000) / 10000)}`, right, reached
            }
        }
        case 'table-above': {
            const z = pick(random, [0.5, 1, 1.25, 1.5, 2])
            return {
                problem: say(`Kalkulatu $P(Z>${d(z)})$.`, `Calcula $P(Z>${d(z)})$.`, `احسب $P(Z>${d(z)})$.`, `Work out $P(Z>${d(z)})$.`),
                lines: [line(LABELS.table, `P(Z\\le ${d(z)})=${t(z)}`), line(LABELS.step, `P(Z>${d(z)})=P(Z\\le ${d(z)})`), line(LABELS.result, `P(Z>${d(z)})=${t(z)}`)],
                wrong: 1, error, fix: `P(Z>${d(z)})=1-${t(z)}=${tableLatex(10_000 - below(z))}`, right: 1 - below(z) / 10_000, reached: below(z) / 10_000
            }
        }
        case 'divide-variance': {
            const sd = pick(random, [2, 4, 5])
            const mean = 10 * randomInt(random, 3, 8)
            const x = mean + sd * pick(random, [1, 2])
            const z = (x - mean) / sd
            const wrongZ = (x - mean) / (sd * sd)
            return {
                problem: say(`$X\\sim N(${mean};\\,${sd})$. Kalkulatu $P(X\\le ${x})$.`, `$X\\sim N(${mean};\\,${sd})$. Calcula $P(X\\le ${x})$.`, `$X\\sim N(${mean};\\,${sd})$. احسب $P(X\\le ${x})$.`, `$X\\sim N(${mean};\\,${sd})$. Work out $P(X\\le ${x})$.`),
                lines: [line(LABELS.step, `z=\\frac{${x}-${mean}}{${sd * sd}}=${d(wrongZ)}`), line(LABELS.table, `P(Z\\le ${d(wrongZ)})`), line(LABELS.result, `${t(Math.round(wrongZ * 100) / 100)}`)],
                wrong: 0, error, fix: `z=\\frac{${x}-${mean}}{${sd}}=${z}\\ \\to\\ ${t(z)}`, right: below(z) / 10_000, reached: below(Math.round(wrongZ * 100) / 100) / 10_000
            }
        }
        case 'negative-sign': {
            const z = pick(random, [0.5, 1, 1.25, 1.5, 2])
            return {
                problem: say(`Kalkulatu $P(Z\\le -${d(z)})$.`, `Calcula $P(Z\\le -${d(z)})$.`, `احسب $P(Z\\le -${d(z)})$.`, `Work out $P(Z\\le -${d(z)})$.`),
                lines: [line(LABELS.table, `P(Z\\le ${d(z)})=${t(z)}`), line(LABELS.step, `P(Z\\le -${d(z)})=P(Z\\le ${d(z)})`), line(LABELS.result, `${t(z)}`)],
                wrong: 1, error, fix: `P(Z\\le -${d(z)})=1-${t(z)}=${tableLatex(10_000 - below(z))}`, right: 1 - below(z) / 10_000, reached: below(z) / 10_000
            }
        }
        case 'wrong-tail': {
            const k = pick(random, [10, 20, 30])
            const mean = 10 * randomInt(random, 5, 8)
            const sd = 10
            const z = inverseZ(10_000 - k * 100)
            const right = mean + z * sd
            return {
                problem: say(`$X\\sim N(${mean};\\,${sd})$. Zein baliotik gora dago %\u00a0${k} onena?`, `$X\\sim N(${mean};\\,${sd})$. ¿A partir de qué valor está el ${k}\u00a0% mejor?`, `$X\\sim N(${mean};\\,${sd})$. ابتداءً من أي قيمة يقع أفضل ${k}\u00a0%؟`, `$X\\sim N(${mean};\\,${sd})$. From what value on are the best ${k}%?`),
                lines: [line(LABELS.step, `P(Z\\le k)=${d(k / 100)}`), line(LABELS.table, `k=-${d(z)}`), line(LABELS.result, `x=${mean}-${d(z)}\\cdot ${sd}=${d(mean - z * sd)}`)],
                wrong: 0, error, fix: `P(Z\\le k)=${d(1 - k / 100)}\\ \\to\\ x=${mean}+${d(z)}\\cdot ${sd}=${d(right)}`, right, reached: mean - z * sd
            }
        }
        case 'radius-without-sd': {
            const level = pick(random, [90, 95, 99])
            const z = criticalZ(level)
            const mean = 10 * randomInt(random, 5, 15)
            const sd = pick(random, [4, 5, 10])
            return {
                problem: say(`Aurkitu $N(${mean};\\,${sd})$ banaketaren tarte karakteristikoa, %\u00a0${level} probabilitatearekin.`, `Halla el intervalo característico del ${level}\u00a0% de una $N(${mean};\\,${sd})$.`, `جد الفترة المميزة لـ ${level}\u00a0% في $N(${mean};\\,${sd})$.`, `Find the ${level}% characteristic interval of an $N(${mean};\\,${sd})$.`),
                lines: [line(LABELS.data, `z_{\\alpha/2}=${d(z)}`), line(LABELS.step, `${mean}\\pm ${d(z)}`), line(LABELS.result, `(${d(mean - z)};\\ ${d(mean + z)})`)],
                wrong: 1, error, fix: `${d(z)}\\cdot ${sd}=${d(z * sd)}\\ \\to\\ (${d(mean - z * sd)};\\ ${d(mean + z * sd)})`, right: z * sd, reached: z
            }
        }
        case 'level-as-phi': {
            const mean = 10 * randomInt(random, 5, 15)
            const sd = pick(random, [10, 20])
            const wrongZ = criticalZ(90)
            const z = criticalZ(95)
            return {
                problem: say(`Aurkitu $N(${mean};\\,${sd})$ banaketaren tarte karakteristikoa, %\u00a095 probabilitatearekin.`, `Halla el intervalo característico del 95\u00a0% de una $N(${mean};\\,${sd})$.`, `جد الفترة المميزة لـ 95\u00a0% في $N(${mean};\\,${sd})$.`, `Find the 95% characteristic interval of an $N(${mean};\\,${sd})$.`),
                lines: [line(LABELS.table, `P(Z\\le z)=0{,}95`), line(LABELS.step, `z_{\\alpha/2}=${d(wrongZ)}`), line(LABELS.result, `${d(wrongZ)}\\cdot ${sd}=${d(wrongZ * sd)}`)],
                wrong: 0, error, fix: `P(Z\\le z)=0{,}975\\ \\to\\ ${d(z)}\\cdot ${sd}=${d(z * sd)}`, right: z * sd, reached: wrongZ * sd
            }
        }
        case 'correction-wrong-way': {
            const k = 50 + randomInt(random, 3, 8)
            const right = (k - 0.5 - 50) / 5
            const reached = (k + 0.5 - 50) / 5
            return {
                problem: say(`$B(100;\\,0{,}5)\\approx N(50;\\,5)$. Kalkulatu $P(X\\ge ${k})$.`, `$B(100;\\,0{,}5)\\approx N(50;\\,5)$. Calcula $P(X\\ge ${k})$.`, `$B(100;\\,0{,}5)\\approx N(50;\\,5)$. احسب $P(X\\ge ${k})$.`, `$B(100;\\,0{,}5)\\approx N(50;\\,5)$. Work out $P(X\\ge ${k})$.`),
                lines: [line(LABELS.step, `P(Y\\ge ${d(k + 0.5)})`), line(LABELS.step, `z=\\frac{${d(k + 0.5)}-50}{5}=${d(reached)}`), line(LABELS.result, `1-${t(reached)}=${tableLatex(10_000 - below(reached))}`)],
                wrong: 0, error, fix: `P(Y\\ge ${d(k - 0.5)})\\ \\to\\ z=${d(right)}\\ \\to\\ 1-${t(right)}=${tableLatex(10_000 - below(right))}`, right: 1 - below(right) / 10_000, reached: 1 - below(reached) / 10_000
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createDistributionsBatx2gDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, distributionsBatx2gDetectiveLevels[levelIndex], DISTRIBUTIONS_BATX2G_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
