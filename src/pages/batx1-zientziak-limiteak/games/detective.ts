import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J5 · Limiteen detektibea (Detective de límites): a worked solution of
   three lines with one wrong line, the mistakes of this unit. Level 1:
   0/0 read as 0, k/0 read as 0, the limit taken as f(a), a² − b² written
   as (a − b)²; level 2: ∞ − ∞ read as 0, 1^∞ read as 1, the quotient of
   the wrong coefficients, √(x²) = x when x → −∞; level 3: a hole taken
   for an asymptote, y = 0 with equal degrees, the sign of the oblique
   asymptote, Bolzano on a function with a jump. `right` and `reached`
   only tell the cases apart.
   ========================================================================== */

export type BachLimitsDetectiveError =
    | 'zero-over-zero'
    | 'k-over-zero'
    | 'limit-is-value'
    | 'square-difference'
    | 'infinity-minus'
    | 'one-to-infinity'
    | 'wrong-coefficients'
    | 'root-sign'
    | 'hole-asymptote'
    | 'horizontal-zero'
    | 'oblique-sign'
    | 'bolzano-jump'

export const bachLimitsDetectiveLevels: BachLimitsDetectiveError[][] = [
    ['zero-over-zero', 'k-over-zero', 'limit-is-value', 'square-difference'],
    ['infinity-minus', 'one-to-infinity', 'wrong-coefficients', 'root-sign'],
    ['hole-asymptote', 'horizontal-zero', 'oblique-sign', 'bolzano-jump']
]

export const BACH_LIMITS_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
const factor = (a: number) => (a === 0 ? 'x' : `x${signed(-a)}`)
/** x² + bx + c */
const quadratic = (b: number, c: number) => `x^2${b === 0 ? '' : `${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x`}${signed(c)}`
const LABELS = {
    substitute: say('Ordezkatu', 'Sustituye', 'عوّض', 'Substitute'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    divide: say('Zatitu', 'Divide', 'اقسم', 'Divide')
}
const work = (formula: string) => say(`Kalkulatu $${formula}$.`, `Calcula $${formula}$.`, `احسب $${formula}$.`, `Work out $${formula}$.`)
const asymptotesOf = (formula: string) => say(`Aurkitu $${formula}$ funtzioaren asintotak.`, `Halla las asíntotas de $${formula}$.`, `أوجد مقاربات $${formula}$.`, `Find the asymptotes of $${formula}$.`)

export const bachLimitsDetectiveNames: Record<BachLimitsDetectiveError, LocalizedText> = {
    'zero-over-zero': say('$\\frac{0}{0}$ zero dela esan du', 'Dijo que $\\frac{0}{0}$ es cero', 'قال إن $\\frac{0}{0}$ صفر', 'Said that $\\frac{0}{0}$ is zero'),
    'k-over-zero': say('$\\frac{k}{0}$ zero dela esan du', 'Dijo que $\\frac{k}{0}$ es cero', 'قال إن $\\frac{k}{0}$ صفر', 'Said that $\\frac{k}{0}$ is zero'),
    'limit-is-value': say('Limitea $f(a)$ dela hartu du', 'Tomó el límite como $f(a)$', 'اعتبر النهاية $f(a)$', 'Took the limit to be $f(a)$'),
    'square-difference': say('$x^2-a^2$ gaizki faktorizatu du', 'Factorizó mal $x^2-a^2$', 'أخطأ في تحليل $x^2-a^2$', 'Factorised $x^2-a^2$ wrongly'),
    'infinity-minus': say('$\\infty-\\infty$ zero dela esan du', 'Dijo que $\\infty-\\infty$ es cero', 'قال إن $\\infty-\\infty$ صفر', 'Said that $\\infty-\\infty$ is zero'),
    'one-to-infinity': say('$1^{\\infty}$ bat dela esan du', 'Dijo que $1^{\\infty}$ es uno', 'قال إن $1^{\\infty}$ واحد', 'Said that $1^{\\infty}$ is one'),
    'wrong-coefficients': say('Ez ditu koefiziente nagusiak hartu', 'No tomó los coeficientes principales', 'لم يأخذ المعاملين الرئيسيين', 'Did not take the leading coefficients'),
    'root-sign': say('$\\sqrt{x^2}=x$ hartu du, $x$ negatiboa izanik', 'Tomó $\\sqrt{x^2}=x$ con $x$ negativo', 'أخذ $\\sqrt{x^2}=x$ و$x$ سالب', 'Took $\\sqrt{x^2}=x$ with $x$ negative'),
    'hole-asymptote': say('Zuloa asintotatzat hartu du', 'Tomó un agujero por una asíntota', 'اعتبر الثقب مقاربًا', 'Took a hole for an asymptote'),
    'horizontal-zero': say('Maila berarekin $y=0$ eman du', 'Dio $y=0$ con el mismo grado', 'أعطى $y=0$ مع الدرجة نفسها', 'Gave $y=0$ with the same degree'),
    'oblique-sign': say('Zatiketan zeinua aldatu du', 'Cambió un signo en la división', 'غيّر إشارة في القسمة', 'Changed a sign in the division'),
    'bolzano-jump': say('Bolzano jarraitua ez den funtzio bati aplikatu dio', 'Aplicó Bolzano a una función que no es continua', 'طبّق بولتسانو على دالة غير متصلة', 'Applied Bolzano to a function that is not continuous')
}

export const bachLimitsDetectiveTips: Record<BachLimitsDetectiveError, LocalizedText> = {
    'zero-over-zero': say('$\\frac{0}{0}$ indeterminazioa da: faktorizatu eta sinplifikatu.', '$\\frac{0}{0}$ es una indeterminación: factoriza y simplifica.', '$\\frac{0}{0}$ حالة عدم تعيين: حلّل واختصر.', '$\\frac{0}{0}$ is indeterminate: factorise and simplify.'),
    'k-over-zero': say('$\\frac{k}{0}$, $k\\neq 0$ izanik, infinitua da: aztertu zeinua alde bakoitzean.', '$\\frac{k}{0}$ con $k\\neq 0$ es infinito: estudia el signo a cada lado.', '$\\frac{k}{0}$ مع $k\\neq 0$ لانهائي: ادرس الإشارة على كل جانب.', '$\\frac{k}{0}$ with $k\\neq 0$ is infinite: study the sign on each side.'),
    'limit-is-value': say('Limiteak $a$ puntuaren ingurua begiratzen du, ez $f(a)$.', 'El límite mira cerca de $a$, no $f(a)$.', 'النهاية تنظر قرب $a$ لا إلى $f(a)$.', 'The limit looks near $a$, not at $f(a)$.'),
    'square-difference': say('$x^2-a^2=(x-a)(x+a)$, ez $(x-a)^2$.', '$x^2-a^2=(x-a)(x+a)$, no $(x-a)^2$.', '$x^2-a^2=(x-a)(x+a)$ لا $(x-a)^2$.', '$x^2-a^2=(x-a)(x+a)$, not $(x-a)^2$.'),
    'infinity-minus': say('$\\infty-\\infty$ indeterminazioa da: biderkatu eta zatitu konjokatuaz.', '$\\infty-\\infty$ es una indeterminación: multiplica y divide por el conjugado.', '$\\infty-\\infty$ حالة عدم تعيين: اضرب واقسم على المرافق.', '$\\infty-\\infty$ is indeterminate: multiply and divide by the conjugate.'),
    'one-to-infinity': say('$1^{\\infty}$ indeterminazioa da: $e^{\\lim g(x)\\,(f(x)-1)}$.', '$1^{\\infty}$ es una indeterminación: $e^{\\lim g(x)\\,(f(x)-1)}$.', '$1^{\\infty}$ حالة عدم تعيين: $e^{\\lim g(x)\\,(f(x)-1)}$.', '$1^{\\infty}$ is indeterminate: $e^{\\lim g(x)\\,(f(x)-1)}$.'),
    'wrong-coefficients': say('Maila bera denean, maila handieneko gaien koefizienteen zatidura.', 'Con el mismo grado, el cociente de los coeficientes de mayor grado.', 'مع الدرجة نفسها: خارج قسمة معاملي الحدين الأعلى درجة.', 'With the same degree, the quotient of the coefficients of the highest degree.'),
    'root-sign': say('$x<0$ denean, $\\sqrt{x^2}=|x|=-x$.', 'Con $x<0$, $\\sqrt{x^2}=|x|=-x$.', 'مع $x<0$: ‏$\\sqrt{x^2}=|x|=-x$.', 'With $x<0$, $\\sqrt{x^2}=|x|=-x$.'),
    'hole-asymptote': say('Sinplifikatu ondoren izendatzailea 0 ez bada, zuloa da, ez asintota.', 'Si al simplificar el denominador ya no se anula, es un agujero, no una asíntota.', 'إذا لم ينعدم المقام بعد الاختزال فهو ثقب لا مقارب.', 'If the denominator is no longer 0 after simplifying, it is a hole, not an asymptote.'),
    'horizontal-zero': say('Maila bera: $y$ koefiziente nagusien zatidura da.', 'Mismo grado: $y$ es el cociente de los coeficientes principales.', 'الدرجة نفسها: $y$ خارج قسمة المعاملين الرئيسيين.', 'Same degree: $y$ is the quotient of the leading coefficients.'),
    'oblique-sign': say('Zatitzean, $x-d$ bider $x$ kendu: $-(-dx)=+dx$.', 'Al dividir, se resta $x$ por $x-d$: $-(-dx)=+dx$.', 'عند القسمة نطرح $x$ مضروبًا في $x-d$: ‏$-(-dx)=+dx$.', 'When dividing, subtract $x$ times $x-d$: $-(-dx)=+dx$.'),
    'bolzano-jump': say('Bolzanok tarte osoan jarraitua den funtzioa behar du.', 'Bolzano necesita una función continua en todo el intervalo.', 'يحتاج بولتسانو إلى دالة متصلة على المجال كله.', 'Bolzano needs a function that is continuous on the whole interval.')
}

type Built = Omit<WorkedCase<BachLimitsDetectiveError>, 'options'>

function build(random: Random, error: BachLimitsDetectiveError): Built | null {
    switch (error) {
        case 'zero-over-zero': {
            const a = pick(random, [-3, -2, -1, 1, 2, 3])
            const b = randomInt(random, -3, 3)
            if (b === a) return null
            const top = quadratic(-(a + b), a * b)
            return {
                problem: work(`\\lim_{x\\to ${a}}\\frac{${top}}{${factor(a)}}`),
                lines: [line(LABELS.substitute, '\\frac{0}{0}'), line(LABELS.step, '\\frac{0}{0}=0'), line(LABELS.result, '0')],
                wrong: 1, error, fix: `\\frac{(${factor(a)})(${factor(b)})}{${factor(a)}}=${factor(b)}\\ \\to\\ ${a - b}`, right: a - b, reached: 0
            }
        }
        case 'k-over-zero': {
            const a = randomInt(random, 1, 4)
            const b = randomInt(random, 1, 4)
            return {
                problem: work(`\\lim_{x\\to ${a}^+}\\frac{x+${b}}{x-${a}}`),
                lines: [line(LABELS.substitute, `\\frac{${a + b}}{0}`), line(LABELS.step, `\\frac{${a + b}}{0}=0`), line(LABELS.result, '0')],
                wrong: 1, error, fix: `x-${a}\\to 0^+\\ \\to\\ +\\infty`, right: 1000, reached: 0
            }
        }
        case 'limit-is-value': {
            const a = randomInt(random, 1, 3)
            const m = randomInt(random, 2, 3)
            const c = randomInt(random, 1, 4)
            const v = m * a + c + pick(random, [2, 3, 4])
            return {
                problem: say(`$f(x)=${m}x+${c}$ da $x\\neq ${a}$ denean, eta $f(${a})=${v}$. Kalkulatu $\\lim_{x\\to ${a}}f(x)$.`, `$f(x)=${m}x+${c}$ si $x\\neq ${a}$, y $f(${a})=${v}$. Calcula $\\lim_{x\\to ${a}}f(x)$.`, `$f(x)=${m}x+${c}$ عندما $x\\neq ${a}$، و$f(${a})=${v}$. احسب $\\lim_{x\\to ${a}}f(x)$.`, `$f(x)=${m}x+${c}$ for $x\\neq ${a}$, and $f(${a})=${v}$. Work out $\\lim_{x\\to ${a}}f(x)$.`),
                lines: [line(LABELS.step, `x\\to ${a}`), line(LABELS.step, `\\lim_{x\\to ${a}}f(x)=f(${a})`), line(LABELS.result, String(v))],
                wrong: 1, error, fix: `\\lim_{x\\to ${a}}(${m}x+${c})=${m * a + c}`, right: m * a + c, reached: v
            }
        }
        case 'square-difference': {
            const a = randomInt(random, 2, 6)
            return {
                problem: work(`\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}`),
                lines: [line(LABELS.step, `x^2-${a * a}=(x-${a})^2`), line(LABELS.step, `\\frac{(x-${a})^2}{x-${a}}=x-${a}`), line(LABELS.result, '0')],
                wrong: 0, error, fix: `\\frac{(x-${a})(x+${a})}{x-${a}}=x+${a}\\ \\to\\ ${2 * a}`, right: 2 * a, reached: 0
            }
        }
        case 'infinity-minus': {
            const p = pick(random, [2, 4, 6, 8, 10])
            return {
                problem: work(`\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+${p}x}-x\\right)`),
                lines: [line(LABELS.substitute, '\\infty-\\infty'), line(LABELS.step, '\\infty-\\infty=0'), line(LABELS.result, '0')],
                wrong: 1, error, fix: `\\frac{${p}x}{\\sqrt{x^2+${p}x}+x}\\ \\to\\ \\frac{${p}}{2}=${p / 2}`, right: p / 2, reached: 0
            }
        }
        case 'one-to-infinity': {
            const p = randomInt(random, 2, 6)
            return {
                problem: work(`\\lim_{x\\to+\\infty}\\left(1+\\frac{${p}}{x}\\right)^{x}`),
                lines: [line(LABELS.substitute, '1^{\\infty}'), line(LABELS.step, '1^{\\infty}=1'), line(LABELS.result, '1')],
                wrong: 1, error, fix: `e^{\\lim x\\cdot\\frac{${p}}{x}}=e^{${p}}`, right: Math.exp(p), reached: 1
            }
        }
        case 'wrong-coefficients': {
            const a = randomInt(random, 2, 6)
            const b = randomInt(random, 1, 5)
            const c = randomInt(random, 2, 5)
            const d = randomInt(random, 1, 5)
            if (a * d === b * c || a === c) return null
            return {
                problem: work(`\\lim_{x\\to+\\infty}\\frac{${a}x^2+${b}x}{${c}x^2+${d}}`),
                lines: [line(LABELS.step, '\\frac{\\infty}{\\infty}'), line(LABELS.step, `\\frac{${b}x}{${d}}`), line(LABELS.result, `\\frac{${b}}{${d}}`)],
                wrong: 1, error, fix: `\\frac{${a}x^2}{${c}x^2}=\\frac{${a}}{${c}}`, right: a / c, reached: b / d
            }
        }
        case 'root-sign': {
            const p = randomInt(random, 1, 9)
            const k = randomInt(random, 1, 4)
            return {
                problem: work(`\\lim_{x\\to-\\infty}\\frac{\\sqrt{${k * k}x^2+${p}}}{x}`),
                lines: [line(LABELS.step, `\\sqrt{${k * k}x^2}=${k}x`), line(LABELS.step, `\\frac{${k}x}{x}=${k}`), line(LABELS.result, String(k))],
                wrong: 0, error, fix: `x<0\\ \\to\\ \\sqrt{${k * k}x^2}=-${k}x\\ \\to\\ -${k}`, right: -k, reached: k
            }
        }
        case 'hole-asymptote': {
            const a = pick(random, [-3, -2, -1, 1, 2, 3])
            const top = `x^2-${a * a}`
            return {
                problem: say(`Aztertu $f(x)=\\frac{${top}}{${factor(a)}}$ funtzioa $x=${a}$ puntuan.`, `Estudia $f(x)=\\frac{${top}}{${factor(a)}}$ en $x=${a}$.`, `ادرس $f(x)=\\frac{${top}}{${factor(a)}}$ عند $x=${a}$.`, `Study $f(x)=\\frac{${top}}{${factor(a)}}$ at $x=${a}$.`),
                lines: [line(LABELS.substitute, `${factor(a)}=0\\ \\to\\ x=${a}`), line(LABELS.step, '\\frac{0}{0}'), line(LABELS.result, `x=${a}`)],
                wrong: 2, error, fix: `\\frac{(${factor(a)})(${factor(-a)})}{${factor(a)}}=${factor(-a)}\\ \\to\\ (${a},${2 * a})`, right: 2 * a, reached: a
            }
        }
        case 'horizontal-zero': {
            const a = pick(random, [-3, -2, 2, 3, 4])
            const d = randomInt(random, 1, 5)
            return {
                problem: asymptotesOf(`f(x)=\\frac{${a}x+1}{x-${d}}`),
                lines: [line(LABELS.step, `x-${d}=0\\ \\to\\ x=${d}`), line(LABELS.step, `\\lim_{x\\to\\pm\\infty}f(x)=0`), line(LABELS.result, `x=${d}\\qquad y=0`)],
                wrong: 1, error, fix: `\\frac{${a}x}{x}=${a}\\ \\to\\ y=${a}`, right: a, reached: 0
            }
        }
        case 'oblique-sign': {
            const p = randomInt(random, 1, 4)
            const d = randomInt(random, 1, 4)
            return {
                problem: asymptotesOf(`f(x)=\\frac{x^2+${p}x}{x-${d}}`),
                lines: [line(LABELS.substitute, `x=${d}\\ \\to\\ \\frac{${d * d + p * d}}{0}`), line(LABELS.divide, `\\frac{x^2+${p}x}{x-${d}}=x+${p}-${d}+\\ldots`), line(LABELS.result, `x=${d}\\qquad y=x${signed(p - d)}`)],
                wrong: 1, error, fix: `x^2+${p}x=(x-${d})(x+${p + d})+${d * (p + d)}\\ \\to\\ y=x+${p + d}`, right: p + d, reached: p - d
            }
        }
        case 'bolzano-jump': {
            const a = randomInt(random, 1, 3)
            return {
                problem: say(`Ba al du $f(x)=\\frac{1}{x-${a}}$ funtzioak errorik $[${a - 1},${a + 1}]$ tartean?`, `¿Tiene $f(x)=\\frac{1}{x-${a}}$ alguna raíz en $[${a - 1},${a + 1}]$?`, `هل لـ $f(x)=\\frac{1}{x-${a}}$ جذر في $[${a - 1},${a + 1}]$؟`, `Does $f(x)=\\frac{1}{x-${a}}$ have a root in $[${a - 1},${a + 1}]$?`),
                lines: [line(LABELS.substitute, `f(${a - 1})=-1\\qquad f(${a + 1})=1`), line(LABELS.step, 'f(a)\\cdot f(b)<0'), line(LABELS.result, `c\\in(${a - 1},${a + 1})`)],
                wrong: 2, error, fix: `x=${a}\\ \\to\\ \\frac{1}{0}`, right: 0, reached: 1
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBachLimitsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bachLimitsDetectiveLevels[levelIndex], BACH_LIMITS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH_LIMITS_DETECTIVE_ERRORS = bachLimitsDetectiveLevels.flat()
