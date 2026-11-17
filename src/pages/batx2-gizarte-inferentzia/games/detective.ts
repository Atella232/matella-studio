import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { criticalZ, decimalLatex } from '../../batx2-gizarte-banaketak/critical.ts'

/* ==========================================================================
   I-J4 · Inferentziaren detektibea: a worked solution of three lines with
   one wrong line, with the mistakes of this unit. Level 1 (the interval
   for the mean): the critical value looked up at the level, the radius
   with σ instead of σ/√n, the error taken as the whole width. Level 2
   (the sample size): rounded down, not squared, E not squared. Level 3
   (proportions): √(p̂q̂/n) without the root, p̂ = 0,1 taken with no data
   instead of 0,5, the error written as a percentage (3 for 0,03).
   `right` and `reached` only tell the cases apart. Pure logic.
   ========================================================================== */

export type InferenceBatx2gDetectiveError =
    | 'level-as-phi'
    | 'radius-sigma'
    | 'whole-width'
    | 'round-down'
    | 'not-squared'
    | 'error-not-squared'
    | 'pq-no-root'
    | 'not-worst-case'
    | 'percent-error'

export const inferenceBatx2gDetectiveLevels: InferenceBatx2gDetectiveError[][] = [
    ['level-as-phi', 'radius-sigma', 'whole-width'],
    ['round-down', 'not-squared', 'error-not-squared'],
    ['pq-no-root', 'not-worst-case', 'percent-error']
]

export const INFERENCE_BATX2G_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    table: say('Taula', 'Tabla', 'الجدول', 'Table'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const d = decimalLatex
const up = (value: number) => Math.ceil(value - 1e-9)

export const inferenceBatx2gDetectiveNames: Record<InferenceBatx2gDetectiveError, LocalizedText> = {
    'level-as-phi': say('Balio kritikoa mailan bilatu du, ez $1-\\frac{\\alpha}{2}$ zenbakian', 'Buscó el valor crítico en el nivel, no en $1-\\frac{\\alpha}{2}$', 'بحث عن القيمة الحرجة عند المستوى لا عند $1-\\frac{\\alpha}{2}$', 'Looked up the critical value at the level, not at $1-\\frac{\\alpha}{2}$'),
    'radius-sigma': say('Erradioan $\\sigma$ erabili du, ez $\\frac{\\sigma}{\\sqrt{n}}$', 'En el radio usó $\\sigma$, no $\\frac{\\sigma}{\\sqrt{n}}$', 'استعمل $\\sigma$ في نصف القطر لا $\\frac{\\sigma}{\\sqrt{n}}$', 'Used $\\sigma$ in the radius, not $\\frac{\\sigma}{\\sqrt{n}}$'),
    'whole-width': say('Errorea zabalera osoa dela uste izan du', 'Tomó como error toda la anchura', 'أخذ العرض كله خطأً', 'Took the whole width as the error'),
    'round-down': say('Beherantz biribildu du', 'Redondeó hacia abajo', 'قرّب إلى الأسفل', 'Rounded down'),
    'not-squared': say('Ez du karratura jaso', 'No elevó al cuadrado', 'لم يربّع', 'Did not square it'),
    'error-not-squared': say('$E$ ez du karratura jaso', 'No elevó $E$ al cuadrado', 'لم يربّع $E$', 'Did not square $E$'),
    'pq-no-root': say('Erroa ahaztu du: $\\frac{\\hat{p}\\hat{q}}{n}$ bariantza da', 'Olvidó la raíz: $\\frac{\\hat{p}\\hat{q}}{n}$ es la varianza', 'نسي الجذر: $\\frac{\\hat{p}\\hat{q}}{n}$ هو التباين', 'Forgot the root: $\\frac{\\hat{p}\\hat{q}}{n}$ is the variance'),
    'not-worst-case': say('Daturik gabe, ez du $\\hat{p}=0{,}5$ hartu', 'Sin datos, no tomó $\\hat{p}=0{,}5$', 'بلا بيانات لم يأخذ $\\hat{p}=0{,}5$', 'With no data, did not take $\\hat{p}=0{,}5$'),
    'percent-error': say('Errorea ehunekotan sartu du, ez proportzio gisa', 'Metió el error en porcentaje, no como proporción', 'أدخل الخطأ بالنسبة المئوية لا كنسبة', 'Put the error in as a percentage, not as a proportion')
}

export const inferenceBatx2gDetectiveTips: Record<InferenceBatx2gDetectiveError, LocalizedText> = {
    'level-as-phi': say('Buztan bakoitzean $\\frac{\\alpha}{2}$: % 95 mailan, bilatu $0{,}975$.', 'En cada cola $\\frac{\\alpha}{2}$: al 95 %, busca $0{,}975$.', 'في كل ذيل $\\frac{\\alpha}{2}$: عند 95 % ابحث عن $0{,}975$.', 'Each tail holds $\\frac{\\alpha}{2}$: at 95%, look up $0{,}975$.'),
    'radius-sigma': say('$E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$', '$E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$', '$E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$', '$E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$'),
    'whole-width': say('Errorea zabaleraren erdia da: $E=\\frac{b-a}{2}$.', 'El error es la mitad de la anchura: $E=\\frac{b-a}{2}$.', 'الخطأ نصف العرض: $E=\\frac{b-a}{2}$.', 'The error is half the width: $E=\\frac{b-a}{2}$.'),
    'round-down': say('Gorantz biribildu: bestela errorea muga baino handiagoa da.', 'Redondea hacia arriba: si no, el error se pasa del límite.', 'قرّب إلى الأعلى: وإلا تجاوز الخطأ الحد.', 'Round up: otherwise the error goes past the limit.'),
    'not-squared': say('$\\sqrt{n}$ askatzen da lehenengo: gero karratua.', 'Primero sale $\\sqrt{n}$: después, al cuadrado.', 'يخرج $\\sqrt{n}$ أولًا: ثم نربّع.', 'First you get $\\sqrt{n}$: then square it.'),
    'error-not-squared': say('$n\\ge\\left(\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}\\right)^2$: dena karratura.', '$n\\ge\\left(\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}\\right)^2$: todo al cuadrado.', '$n\\ge\\left(\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}\\right)^2$: الكل مربّع.', '$n\\ge\\left(\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}\\right)^2$: all of it squared.'),
    'pq-no-root': say('$\\sigma_{\\hat{p}}=\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$', '$\\sigma_{\\hat{p}}=\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$', '$\\sigma_{\\hat{p}}=\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$', '$\\sigma_{\\hat{p}}=\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$'),
    'not-worst-case': say('Daturik gabe, kasurik txarrena: $\\hat{p}\\hat{q}=0{,}25$.', 'Sin datos, el caso más desfavorable: $\\hat{p}\\hat{q}=0{,}25$.', 'بلا بيانات، أسوأ حالة: $\\hat{p}\\hat{q}=0{,}25$.', 'With no data, the worst case: $\\hat{p}\\hat{q}=0{,}25$.'),
    'percent-error': say('% 3 errorea $E=0{,}03$ da.', 'Un error del 3 % es $E=0{,}03$.', 'خطأ 3 % هو $E=0{,}03$.', 'An error of 3% is $E=0{,}03$.')
}

type Built = Omit<WorkedCase<InferenceBatx2gDetectiveError>, 'options'>

function build(random: Random, error: InferenceBatx2gDetectiveError): Built | null {
    switch (error) {
        case 'level-as-phi': {
            const root = pick(random, [4, 5, 10])
            const s = pick(random, [1, 2, 3])
            const mean = 10 * randomInt(random, 4, 20)
            const wrong = criticalZ(90)
            const z = criticalZ(95)
            return {
                problem: say(`$\\bar{x}=${mean}$, $\\sigma=${root * s}$ eta $n=${root * root}$. Tartea, %\u00a095 mailan.`, `$\\bar{x}=${mean}$, $\\sigma=${root * s}$ y $n=${root * root}$. Intervalo al 95\u00a0%.`, `$\\bar{x}=${mean}$ و$\\sigma=${root * s}$ و$n=${root * root}$. الفترة عند 95\u00a0%.`, `$\\bar{x}=${mean}$, $\\sigma=${root * s}$ and $n=${root * root}$. The interval at 95%.`),
                lines: [line(LABELS.table, `P(Z\\le z)=0{,}95`), line(LABELS.step, `E=${d(wrong)}\\cdot ${s}=${d(wrong * s)}`), line(LABELS.result, `${mean}\\pm ${d(wrong * s)}`)],
                wrong: 0, error, fix: `P(Z\\le z)=0{,}975\\ \\to\\ E=${d(z)}\\cdot ${s}=${d(z * s)}`, right: z * s, reached: wrong * s
            }
        }
        case 'radius-sigma': {
            const level = pick(random, [90, 95, 99])
            const z = criticalZ(level)
            const root = pick(random, [4, 5, 10])
            const sd = root * pick(random, [1, 2])
            const mean = 10 * randomInt(random, 4, 20)
            return {
                problem: say(`$\\bar{x}=${mean}$, $\\sigma=${sd}$ eta $n=${root * root}$. Errorea, %\u00a0${level} mailan.`, `$\\bar{x}=${mean}$, $\\sigma=${sd}$ y $n=${root * root}$. El error al ${level}\u00a0%.`, `$\\bar{x}=${mean}$ و$\\sigma=${sd}$ و$n=${root * root}$. الخطأ عند ${level}\u00a0%.`, `$\\bar{x}=${mean}$, $\\sigma=${sd}$ and $n=${root * root}$. The error at ${level}%.`),
                lines: [line(LABELS.data, `{z}_{\\alpha/2}=${d(z)}`), line(LABELS.step, `E=${d(z)}\\cdot ${sd}=${d(z * sd)}`), line(LABELS.result, `${mean}\\pm ${d(z * sd)}`)],
                wrong: 1, error, fix: `E=${d(z)}\\cdot\\frac{${sd}}{${root}}=${d((z * sd) / root)}`, right: (z * sd) / root, reached: z * sd
            }
        }
        case 'whole-width': {
            const mean = 10 * randomInt(random, 3, 20)
            const e = pick(random, [1.96, 3.29, 2.575, 3.92, 5.15])
            return {
                problem: say(`Tartea $(${d(mean - e)};\\ ${d(mean + e)})$ da. Zenbat dira $\\bar{x}$ eta $E$?`, `El intervalo es $(${d(mean - e)};\\ ${d(mean + e)})$. ¿Cuánto valen $\\bar{x}$ y $E$?`, `الفترة $(${d(mean - e)};\\ ${d(mean + e)})$. كم يساوي $\\bar{x}$ و$E$؟`, `The interval is $(${d(mean - e)};\\ ${d(mean + e)})$. What are $\\bar{x}$ and $E$?`),
                lines: [line(LABELS.step, `\\bar{x}=\\frac{a+b}{2}=${mean}`), line(LABELS.step, `E=b-a=${d(2 * e)}`), line(LABELS.result, `\\bar{x}=${mean},\\ E=${d(2 * e)}`)],
                wrong: 1, error, fix: `E=\\frac{b-a}{2}=${d(e)}`, right: e, reached: 2 * e
            }
        }
        case 'round-down': {
            const [level, sd, e] = pick(random, [[95, 15, 2], [90, 10, 1], [95, 10, 2], [99, 10, 2], [95, 20, 5], [90, 12, 2]] as const)
            const z = criticalZ(level)
            const exact = ((z * sd) / e) ** 2
            if (Number.isInteger(Math.round(exact * 1e6) / 1e6)) return null
            return {
                problem: say(`$\\sigma=${sd}$. Zenbat pertsona behar dira $E\\le ${e}$ izateko, %\u00a0${level} mailan?`, `$\\sigma=${sd}$. ¿Cuántas personas hacen falta para $E\\le ${e}$ al ${level}\u00a0%?`, `$\\sigma=${sd}$. كم شخصًا نحتاج لـ $E\\le ${e}$ عند ${level}\u00a0%؟`, `$\\sigma=${sd}$. How many people are needed for $E\\le ${e}$ at ${level}%?`),
                lines: [line(LABELS.step, `n\\ge\\left(\\frac{${d(z)}\\cdot ${sd}}{${e}}\\right)^2`), line(LABELS.step, `n\\ge ${d(Math.round(exact * 1000) / 1000)}`), line(LABELS.result, `n=${Math.floor(exact)}`)],
                wrong: 2, error, fix: `n=${up(exact)}`, right: up(exact), reached: Math.floor(exact)
            }
        }
        case 'not-squared': {
            const [level, sd, e] = pick(random, [[95, 15, 2], [90, 10, 1], [95, 10, 2], [99, 10, 2], [95, 20, 5], [90, 12, 2]] as const)
            const z = criticalZ(level)
            const root = (z * sd) / e
            return {
                problem: say(`$\\sigma=${sd}$. Zenbat pertsona behar dira $E\\le ${e}$ izateko, %\u00a0${level} mailan?`, `$\\sigma=${sd}$. ¿Cuántas personas hacen falta para $E\\le ${e}$ al ${level}\u00a0%?`, `$\\sigma=${sd}$. كم شخصًا نحتاج لـ $E\\le ${e}$ عند ${level}\u00a0%؟`, `$\\sigma=${sd}$. How many people are needed for $E\\le ${e}$ at ${level}%?`),
                lines: [line(LABELS.step, `${d(z)}\\cdot\\frac{${sd}}{\\sqrt{n}}\\le ${e}`), line(LABELS.step, `n\\ge\\frac{${d(z)}\\cdot ${sd}}{${e}}=${d(Math.round(root * 1000) / 1000)}`), line(LABELS.result, `n=${up(root)}`)],
                wrong: 1, error, fix: `\\sqrt{n}\\ge ${d(Math.round(root * 1000) / 1000)}\\ \\to\\ n=${up(root ** 2)}`, right: up(root ** 2), reached: up(root)
            }
        }
        case 'error-not-squared': {
            const [level, sd, e] = pick(random, [[95, 15, 2], [95, 10, 2], [99, 10, 2], [95, 20, 5], [90, 12, 2], [99, 25, 5]] as const)
            const z = criticalZ(level)
            const right = up(((z * sd) / e) ** 2)
            const reached = up((z * sd) ** 2 / e)
            return {
                problem: say(`$\\sigma=${sd}$. Zenbat pertsona behar dira $E\\le ${e}$ izateko, %\u00a0${level} mailan?`, `$\\sigma=${sd}$. ¿Cuántas personas hacen falta para $E\\le ${e}$ al ${level}\u00a0%?`, `$\\sigma=${sd}$. كم شخصًا نحتاج لـ $E\\le ${e}$ عند ${level}\u00a0%؟`, `$\\sigma=${sd}$. How many people are needed for $E\\le ${e}$ at ${level}%?`),
                lines: [line(LABELS.data, `{z}_{\\alpha/2}=${d(z)}`), line(LABELS.step, `n\\ge\\frac{(${d(z)}\\cdot ${sd})^2}{${e}}`), line(LABELS.result, `n=${reached}`)],
                wrong: 1, error, fix: `n\\ge\\frac{(${d(z)}\\cdot ${sd})^2}{${e}^2}\\ \\to\\ n=${right}`, right, reached
            }
        }
        case 'pq-no-root': {
            const [p, n] = pick(random, [[0.5, 100], [0.2, 400], [0.1, 900], [0.5, 400], [0.2, 100], [0.4, 600]] as const)
            const level = pick(random, [90, 95, 99])
            const z = criticalZ(level)
            const variance = (p * (1 - p)) / n
            const sd = Math.sqrt(variance)
            const small = (value: number) => String(Math.round(value * 1e6) / 1e6).replace('.', '{,}')
            return {
                problem: say(`$\\hat{p}=${d(p)}$ eta $n=${n}$. Errorea, %\u00a0${level} mailan.`, `$\\hat{p}=${d(p)}$ y $n=${n}$. El error al ${level}\u00a0%.`, `$\\hat{p}=${d(p)}$ و$n=${n}$. الخطأ عند ${level}\u00a0%.`, `$\\hat{p}=${d(p)}$ and $n=${n}$. The error at ${level}%.`),
                lines: [line(LABELS.data, `\\hat{p}\\hat{q}=${d(p * (1 - p))}`), line(LABELS.step, `\\sigma_{\\hat{p}}=\\frac{${d(p * (1 - p))}}{${n}}=${small(variance)}`), line(LABELS.result, `E=${d(z)}\\cdot ${small(variance)}`)],
                wrong: 1, error, fix: `E=${d(z)}\\cdot\\sqrt{\\frac{${d(p * (1 - p))}}{${n}}}=${small(z * sd)}`, right: z * sd, reached: z * variance
            }
        }
        case 'not-worst-case': {
            const e = pick(random, [0.02, 0.03, 0.04, 0.05])
            const level = pick(random, [90, 95])
            const z = criticalZ(level)
            const right = up((z * z * 0.25) / (e * e))
            const reached = up((z * z * 0.09) / (e * e))
            return {
                problem: say(`Aurretiko daturik gabe, zenbat pertsona behar dira $E\\le ${d(e)}$ izateko, %\u00a0${level} mailan?`, `Sin datos previos, ¿cuántas personas hacen falta para $E\\le ${d(e)}$ al ${level}\u00a0%?`, `بلا بيانات سابقة، كم شخصًا نحتاج لـ $E\\le ${d(e)}$ عند ${level}\u00a0%؟`, `With no previous data, how many people are needed for $E\\le ${d(e)}$ at ${level}%?`),
                lines: [line(LABELS.data, `\\hat{p}=0{,}1\\qquad\\hat{q}=0{,}9`), line(LABELS.step, `n\\ge\\frac{${d(z)}^2\\cdot 0{,}09}{${d(e)}^2}`), line(LABELS.result, `n=${reached}`)],
                wrong: 0, error, fix: `\\hat{p}=0{,}5\\ \\to\\ n=${right}`, right, reached
            }
        }
        case 'percent-error': {
            const e = pick(random, [2, 3, 4, 5])
            const z = criticalZ(95)
            const right = up((z * z * 0.25) / (e / 100) ** 2)
            const reached = up((z * z * 0.25) / (e * e))
            return {
                problem: say(`Daturik gabe, zenbat pertsona behar dira errorea %\u00a0${e} baino handiagoa ez izateko, %\u00a095 mailan?`, `Sin datos, ¿cuántas personas hacen falta para que el error no pase del ${e}\u00a0%, al 95\u00a0%?`, `بلا بيانات، كم شخصًا نحتاج كي لا يتجاوز الخطأ ${e}\u00a0% عند 95\u00a0%؟`, `With no data, how many people are needed for the error not to exceed ${e}%, at 95%?`),
                lines: [line(LABELS.data, `\\hat{p}\\hat{q}=0{,}25\\qquad E=${e}`), line(LABELS.step, `n\\ge\\frac{1{,}96^2\\cdot 0{,}25}{${e}^2}`), line(LABELS.result, `n=${reached}`)],
                wrong: 0, error, fix: `E=${d(e / 100)}\\ \\to\\ n=${right}`, right, reached
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createInferenceBatx2gDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, inferenceBatx2gDetectiveLevels[levelIndex], INFERENCE_BATX2G_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
