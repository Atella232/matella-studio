import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { below, tableLatex } from '../../batx2-zientziak-banaketak/normal.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { criticalZ, decimalLatex } from '../../batx2-gizarte-banaketak/critical.ts'
import { largestRemainders } from './allocate.ts'

/* ==========================================================================
   M-J4 · Laginketaren detektibea: a worked solution of three lines with
   one wrong line, with the mistakes of this unit. Level 1 (sampling): the
   step written n/N, an equal split where a proportional one was asked,
   the shares rounded down so the sample falls short. Level 2 (the sample
   mean): σ not divided by √n, divided by n, the deviation of a sum as nσ.
   Level 3 (proportions and intervals): √(pq/n) without the root, the 95 %
   critical value looked up at 0,95, the radius with σ instead of σ/√n.
   `right` and `reached` only tell the cases apart. Pure logic.
   ========================================================================== */

export type SamplingBatx2gDetectiveError =
    | 'step-inverted'
    | 'equal-instead'
    | 'remainders-lost'
    | 'sigma-not-divided'
    | 'divide-by-n'
    | 'sum-sd'
    | 'pq-no-root'
    | 'level-as-phi'
    | 'radius-sigma'

export const samplingBatx2gDetectiveLevels: SamplingBatx2gDetectiveError[][] = [
    ['step-inverted', 'equal-instead', 'remainders-lost'],
    ['sigma-not-divided', 'divide-by-n', 'sum-sd'],
    ['pq-no-root', 'level-as-phi', 'radius-sigma']
]

export const SAMPLING_BATX2G_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    table: say('Taula', 'Tabla', 'الجدول', 'Table'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const d = decimalLatex
const t = (z: number) => tableLatex(below(z))
const up = (z: number) => tableLatex(10_000 - below(z))

export const samplingBatx2gDetectiveNames: Record<SamplingBatx2gDetectiveError, LocalizedText> = {
    'step-inverted': say('Jauzia alderantziz kalkulatu du: $\\frac{n}{N}$', 'Calculó el salto al revés: $\\frac{n}{N}$', 'حسب القفزة معكوسة: $\\frac{n}{N}$', 'Worked out the step upside down: $\\frac{n}{N}$'),
    'equal-instead': say('Berdin banatu du, proportzionala eskatzen bazen ere', 'Repartió a partes iguales aunque se pedía proporcional', 'وزّع بالتساوي مع أن المطلوب تناسبي', 'Split it equally though a proportional split was asked'),
    'remainders-lost': say('Beherantz biribildu du, eta lagina laburra geratu da', 'Redondeó hacia abajo y la muestra se quedó corta', 'قرّب إلى الأسفل فنقصت العيّنة', 'Rounded down and the sample fell short'),
    'sigma-not-divided': say('Ez du $\\sigma$ zenbakia $\\sqrt{n}$ zenbakiaz zatitu', 'No dividió $\\sigma$ entre $\\sqrt{n}$', 'لم يقسم $\\sigma$ على $\\sqrt{n}$', 'Did not divide $\\sigma$ by $\\sqrt{n}$'),
    'divide-by-n': say('$n$ zenbakiaz zatitu du, ez $\\sqrt{n}$ zenbakiaz', 'Dividió entre $n$, no entre $\\sqrt{n}$', 'قسم على $n$ لا على $\\sqrt{n}$', 'Divided by $n$, not by $\\sqrt{n}$'),
    'sum-sd': say('Baturaren desbideratzea $n\\sigma$ dela uste izan du', 'Creyó que la desviación de la suma es $n\\sigma$', 'ظن أن انحراف المجموع $n\\sigma$', 'Thought the deviation of the sum is $n\\sigma$'),
    'pq-no-root': say('Erroa ahaztu du: $\\frac{pq}{n}$ bariantza da', 'Olvidó la raíz: $\\frac{pq}{n}$ es la varianza', 'نسي الجذر: $\\frac{pq}{n}$ هو التباين', 'Forgot the root: $\\frac{pq}{n}$ is the variance'),
    'level-as-phi': say('Balio kritikoa mailan bilatu du, ez $1-\\frac{\\alpha}{2}$ zenbakian', 'Buscó el valor crítico en el nivel, no en $1-\\frac{\\alpha}{2}$', 'بحث عن القيمة الحرجة عند المستوى لا عند $1-\\frac{\\alpha}{2}$', 'Looked up the critical value at the level, not at $1-\\frac{\\alpha}{2}$'),
    'radius-sigma': say('Erradioan $\\sigma$ erabili du, ez $\\frac{\\sigma}{\\sqrt{n}}$', 'En el radio usó $\\sigma$, no $\\frac{\\sigma}{\\sqrt{n}}$', 'استعمل $\\sigma$ في نصف القطر لا $\\frac{\\sigma}{\\sqrt{n}}$', 'Used $\\sigma$ in the radius, not $\\frac{\\sigma}{\\sqrt{n}}$')
}

export const samplingBatx2gDetectiveTips: Record<SamplingBatx2gDetectiveError, LocalizedText> = {
    'step-inverted': say('Jauzia handia da: $h=\\frac{N}{n}$.', 'El salto es grande: $h=\\frac{N}{n}$.', 'القفزة كبيرة: $h=\\frac{N}{n}$.', 'The step is big: $h=\\frac{N}{n}$.'),
    'equal-instead': say('Proportzionalean, $n_i=n\\cdot\\frac{N_i}{N}$.', 'En la proporcional, $n_i=n\\cdot\\frac{N_i}{N}$.', 'في التناسبي $n_i=n\\cdot\\frac{N_i}{N}$.', 'In a proportional split, $n_i=n\\cdot\\frac{N_i}{N}$.'),
    'remainders-lost': say('Falta direnak hondar handienei: batuketak $n$ eman behar du.', 'Los que faltan, a los mayores restos: la suma debe dar $n$.', 'الناقصون لأكبر البواقي: يجب أن يكون المجموع $n$.', 'The missing ones go to the largest remainders: the sum must be $n$.'),
    'sigma-not-divided': say('Batez bestekoak: $\\sigma_{\\bar{X}}=\\frac{\\sigma}{\\sqrt{n}}$.', 'Para las medias: $\\sigma_{\\bar{X}}=\\frac{\\sigma}{\\sqrt{n}}$.', 'للمتوسطات: $\\sigma_{\\bar{X}}=\\frac{\\sigma}{\\sqrt{n}}$.', 'For the means: $\\sigma_{\\bar{X}}=\\frac{\\sigma}{\\sqrt{n}}$.'),
    'divide-by-n': say('Bariantza da $n$ zenbakiaz zatitzen dena: desbideratzea, $\\sqrt{n}$ zenbakiaz.', 'Es la varianza la que se divide entre $n$: la desviación, entre $\\sqrt{n}$.', 'التباين هو الذي يُقسم على $n$: والانحراف على $\\sqrt{n}$.', 'It is the variance that is divided by $n$: the deviation, by $\\sqrt{n}$.'),
    'sum-sd': say('Baturan, bariantzak batzen dira: $\\sigma\\sqrt{n}$.', 'En la suma se suman las varianzas: $\\sigma\\sqrt{n}$.', 'في المجموع تُجمع التباينات: $\\sigma\\sqrt{n}$.', 'In a sum the variances add up: $\\sigma\\sqrt{n}$.'),
    'pq-no-root': say('$\\sigma_{\\hat{p}}=\\sqrt{\\frac{pq}{n}}$, erroarekin.', '$\\sigma_{\\hat{p}}=\\sqrt{\\frac{pq}{n}}$, con la raíz.', '$\\sigma_{\\hat{p}}=\\sqrt{\\frac{pq}{n}}$ مع الجذر.', '$\\sigma_{\\hat{p}}=\\sqrt{\\frac{pq}{n}}$, with the root.'),
    'level-as-phi': say('Buztan bakoitzean $\\frac{\\alpha}{2}$: % 95 probabilitatearekin, bilatu $0{,}975$.', 'En cada cola $\\frac{\\alpha}{2}$: para el 95 %, busca $0{,}975$.', 'في كل ذيل $\\frac{\\alpha}{2}$: لـ 95 % ابحث عن $0{,}975$.', 'Each tail holds $\\frac{\\alpha}{2}$: for 95%, look up $0{,}975$.'),
    'radius-sigma': say('Batez bestekoen tartean, erradioa $z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$ da.', 'En el intervalo de las medias, el radio es $z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'في فترة المتوسطات نصف القطر $z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'In the interval of the means, the radius is $z_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.')
}

type Built = Omit<WorkedCase<SamplingBatx2gDetectiveError>, 'options'>
const strata = (sizes: number[]) => `N_A=${sizes[0]},\\ N_B=${sizes[1]},\\ N_C=${sizes[2]}`
const row = (values: number[]) => values.map((value) => d(value)).join(';\\ ')

function build(random: Random, error: SamplingBatx2gDetectiveError): Built | null {
    switch (error) {
        case 'step-inverted': {
            const n = pick(random, [20, 25, 40, 50])
            const h = pick(random, [12, 15, 20, 30])
            const population = n * h
            return {
                problem: say(`${population} pertsonatik ${n} laguneko lagin sistematikoa. Zein da jauzia?`, `Muestra sistemática de ${n} entre ${population} personas. ¿Cuál es el salto?`, `عيّنة منتظمة من ${n} بين ${population} شخصًا. ما القفزة؟`, `A systematic sample of ${n} among ${population} people. What is the step?`),
                lines: [line(LABELS.data, `N=${population},\\ n=${n}`), line(LABELS.step, `h=\\frac{${n}}{${population}}`), line(LABELS.result, `h=\\frac{1}{${h}}`)],
                wrong: 1, error, fix: `h=\\frac{${population}}{${n}}=${h}`, right: h, reached: 1 / h
            }
        }
        case 'equal-instead': {
            const n = pick(random, [30, 60])
            const unit = pick(random, [10, 20])
            const parts = [randomInt(random, 2, 6), randomInt(random, 2, 6), randomInt(random, 1, 4)]
            const sizes = parts.map((part) => part * unit)
            const total = sizes.reduce((a, b) => a + b, 0)
            const shares = sizes.map((size) => (n * size) / total)
            if (!shares.every(Number.isInteger) || shares[0] === n / 3) return null
            return {
                problem: say(`Geruzak: $${strata(sizes)}$. ${n} laguneko lagin proportzionala.`, `Estratos: $${strata(sizes)}$. Muestra proporcional de ${n}.`, `الطبقات: $${strata(sizes)}$. عيّنة تناسبية من ${n}.`, `Strata: $${strata(sizes)}$. A proportional sample of ${n}.`),
                lines: [line(LABELS.data, `N=${total},\\ n=${n}`), line(LABELS.step, `\\frac{${n}}{3}=${n / 3}`), line(LABELS.result, `${n / 3};\\ ${n / 3};\\ ${n / 3}`)],
                wrong: 1, error, fix: `\\frac{${n}}{${total}}\\cdot N_i\\ \\to\\ ${row(shares)}`, right: shares[0], reached: n / 3
            }
        }
        case 'remainders-lost': {
            const n = pick(random, [20, 30, 40])
            const sizes = [randomInt(random, 20, 60) * 10, randomInt(random, 15, 45) * 10, randomInt(random, 8, 30) * 10]
            const total = sizes.reduce((a, b) => a + b, 0)
            const raw = sizes.map((size) => (n * size) / total)
            if (raw.some((value) => Math.abs(value * 10 - Math.round(value * 10)) > 1e-9) || raw.some(Number.isInteger)) return null
            const floors = raw.map(Math.floor)
            const kept = floors.reduce((a, b) => a + b, 0)
            if (kept === n) return null
            return {
                problem: say(`Geruzak: $${strata(sizes)}$. ${n} laguneko lagin proportzionala.`, `Estratos: $${strata(sizes)}$. Muestra proporcional de ${n}.`, `الطبقات: $${strata(sizes)}$. عيّنة تناسبية من ${n}.`, `Strata: $${strata(sizes)}$. A proportional sample of ${n}.`),
                lines: [line(LABELS.step, row(raw)), line(LABELS.step, row(floors)), line(LABELS.result, `${floors.join('+')}=${kept}`)],
                wrong: 1, error, fix: `${row(largestRemainders(sizes, n))}\\ \\to\\ ${n}`, right: n, reached: kept
            }
        }
        case 'sigma-not-divided': {
            const root = pick(random, [3, 4, 5])
            const sd = root * pick(random, [2, 4])
            const mean = 10 * randomInt(random, 5, 12)
            const z = pick(random, [1, 1.5, 2])
            const x = mean + (z * sd) / root
            const wrongZ = Math.round(((x - mean) / sd) * 100) / 100
            return {
                problem: say(`$X\\sim N(${mean};\\,${sd})$ eta $n=${root * root}$. Kalkulatu $P(\\bar{X}>${d(x)})$.`, `$X\\sim N(${mean};\\,${sd})$ y $n=${root * root}$. Calcula $P(\\bar{X}>${d(x)})$.`, `$X\\sim N(${mean};\\,${sd})$ و$n=${root * root}$. احسب $P(\\bar{X}>${d(x)})$.`, `$X\\sim N(${mean};\\,${sd})$ and $n=${root * root}$. Work out $P(\\bar{X}>${d(x)})$.`),
                lines: [line(LABELS.step, `z=\\frac{${d(x)}-${mean}}{${sd}}=${d(wrongZ)}`), line(LABELS.table, `P(Z\\le ${d(wrongZ)})=${t(wrongZ)}`), line(LABELS.result, `1-${t(wrongZ)}=${up(wrongZ)}`)],
                wrong: 0, error, fix: `z=\\frac{${d(x)}-${mean}}{${sd}/${root}}=${d(z)}\\ \\to\\ 1-${t(z)}=${up(z)}`, right: 1 - below(z) / 10_000, reached: 1 - below(wrongZ) / 10_000
            }
        }
        case 'divide-by-n': {
            const root = pick(random, [4, 5, 10])
            const sd = root * pick(random, [1, 2, 3])
            const mean = 10 * randomInt(random, 2, 9)
            return {
                problem: say(`$X\\sim N(${mean};\\,${sd})$ eta $n=${root * root}$. Nola banatzen da $\\bar{X}$?`, `$X\\sim N(${mean};\\,${sd})$ y $n=${root * root}$. ¿Cómo se distribuye $\\bar{X}$?`, `$X\\sim N(${mean};\\,${sd})$ و$n=${root * root}$. كيف يتوزع $\\bar{X}$؟`, `$X\\sim N(${mean};\\,${sd})$ and $n=${root * root}$. How is $\\bar{X}$ distributed?`),
                lines: [line(LABELS.data, `\\mu_{\\bar{X}}=${mean}`), line(LABELS.step, `\\sigma_{\\bar{X}}=\\frac{${sd}}{${root * root}}=${d(sd / (root * root))}`), line(LABELS.result, `\\bar{X}\\sim N(${mean};\\,${d(sd / (root * root))})`)],
                wrong: 1, error, fix: `\\sigma_{\\bar{X}}=\\frac{${sd}}{\\sqrt{${root * root}}}=${d(sd / root)}`, right: sd / root, reached: sd / (root * root)
            }
        }
        case 'sum-sd': {
            const root = pick(random, [3, 4, 5, 6])
            const sd = pick(random, [2, 3, 5])
            const mean = randomInt(random, 4, 20)
            const n = root * root
            return {
                problem: say(`${n} balioren batura, bakoitza $N(${mean};\\,${sd})$. Nola banatzen da batura?`, `La suma de ${n} valores, cada uno $N(${mean};\\,${sd})$. ¿Cómo se distribuye la suma?`, `مجموع ${n} قيمة، كل منها $N(${mean};\\,${sd})$. كيف يتوزع المجموع؟`, `The sum of ${n} values, each $N(${mean};\\,${sd})$. How is the sum distributed?`),
                lines: [line(LABELS.data, `\\mu_S=${n}\\cdot ${mean}=${n * mean}`), line(LABELS.step, `\\sigma_S=${n}\\cdot ${sd}=${n * sd}`), line(LABELS.result, `S\\sim N(${n * mean};\\,${n * sd})`)],
                wrong: 1, error, fix: `\\sigma_S=${sd}\\cdot\\sqrt{${n}}=${sd * root}`, right: sd * root, reached: n * sd
            }
        }
        case 'pq-no-root': {
            const [p, n] = pick(random, [[0.5, 100], [0.2, 400], [0.1, 900], [0.5, 400], [0.2, 100]] as const)
            const variance = (p * (1 - p)) / n
            const sd = Math.sqrt(variance)
            return {
                problem: say(`$p=${d(p)}$ eta $n=${n}$. Nola banatzen da $\\hat{p}$?`, `$p=${d(p)}$ y $n=${n}$. ¿Cómo se distribuye $\\hat{p}$?`, `$p=${d(p)}$ و$n=${n}$. كيف يتوزع $\\hat{p}$؟`, `$p=${d(p)}$ and $n=${n}$. How is $\\hat{p}$ distributed?`),
                lines: [line(LABELS.data, `pq=${d(p * (1 - p))}`), line(LABELS.step, `\\sigma_{\\hat{p}}=\\frac{${d(p * (1 - p))}}{${n}}=${String(Math.round(variance * 1e6) / 1e6).replace('.', '{,}')}`), line(LABELS.result, `\\hat{p}\\sim N(${d(p)};\\,${String(Math.round(variance * 1e6) / 1e6).replace('.', '{,}')})`)],
                wrong: 1, error, fix: `\\sigma_{\\hat{p}}=\\sqrt{\\frac{${d(p * (1 - p))}}{${n}}}=${d(Math.round(sd * 1000) / 1000)}`, right: sd, reached: variance
            }
        }
        case 'level-as-phi': {
            const root = pick(random, [4, 5, 10])
            const sd = root * pick(random, [1, 2])
            const mean = 10 * randomInt(random, 5, 15)
            const s = sd / root
            const wrongZ = criticalZ(90)
            const z = criticalZ(95)
            return {
                problem: say(`$N(${mean};\\,${sd})$ eta $n=${root * root}$. Batez bestekoen tartea, %\u00a095 probabilitatearekin.`, `$N(${mean};\\,${sd})$ y $n=${root * root}$. Intervalo del 95\u00a0% de las medias.`, `$N(${mean};\\,${sd})$ و$n=${root * root}$. فترة 95\u00a0% للمتوسطات.`, `$N(${mean};\\,${sd})$ and $n=${root * root}$. The 95% interval of the means.`),
                lines: [line(LABELS.table, `P(Z\\le z)=0{,}95`), line(LABELS.step, `${d(wrongZ)}\\cdot ${d(s)}=${d(wrongZ * s)}`), line(LABELS.result, `${mean}\\pm ${d(wrongZ * s)}`)],
                wrong: 0, error, fix: `P(Z\\le z)=0{,}975\\ \\to\\ ${d(z)}\\cdot ${d(s)}=${d(z * s)}`, right: z * s, reached: wrongZ * s
            }
        }
        case 'radius-sigma': {
            const level = pick(random, [90, 95, 99])
            const z = criticalZ(level)
            const root = pick(random, [4, 5, 10])
            const sd = root * pick(random, [1, 2])
            const mean = 10 * randomInt(random, 5, 15)
            return {
                problem: say(`$N(${mean};\\,${sd})$ eta $n=${root * root}$. Batez bestekoen tartea, %\u00a0${level} probabilitatearekin.`, `$N(${mean};\\,${sd})$ y $n=${root * root}$. Intervalo del ${level}\u00a0% de las medias.`, `$N(${mean};\\,${sd})$ و$n=${root * root}$. فترة ${level}\u00a0% للمتوسطات.`, `$N(${mean};\\,${sd})$ and $n=${root * root}$. The ${level}% interval of the means.`),
                lines: [line(LABELS.data, `z_{\\alpha/2}=${d(z)}`), line(LABELS.step, `${d(z)}\\cdot ${sd}=${d(z * sd)}`), line(LABELS.result, `${mean}\\pm ${d(z * sd)}`)],
                wrong: 1, error, fix: `${d(z)}\\cdot\\frac{${sd}}{${root}}=${d((z * sd) / root)}`, right: (z * sd) / root, reached: z * sd
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createSamplingBatx2gDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, samplingBatx2gDetectiveLevels[levelIndex], SAMPLING_BATX2G_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
