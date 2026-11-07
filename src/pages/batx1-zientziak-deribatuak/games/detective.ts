import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J5 · Deribatuen detektibea (Detective de derivadas): a worked solution
   of three lines with one wrong line, the mistakes of this unit. Level 1:
   the average rate without dividing, h = 0 read as 0, f′(x) left in the
   tangent, −f′(a) as the slope of the normal; level 2: (f·g)′ = f′·g′, the
   quotient with the order swapped, the chain without the inside
   derivative, the power rule on a negative exponent; level 3: (eᵏˣ)′ =
   eᵏˣ, the power rule on aˣ, (ln u)′ = 1/u, «continuous, so
   differentiable». No line carries sin or tan, whose name changes with
   the language. `right` and `reached` only tell the cases apart.
   ========================================================================== */

export type BachDerivativesDetectiveError =
    | 'no-divide'
    | 'h-zero'
    | 'tangent-x'
    | 'normal-sign'
    | 'product'
    | 'quotient-order'
    | 'chain-inner'
    | 'negative-power'
    | 'exp-inner'
    | 'exp-power'
    | 'ln-inner'
    | 'continuous-derivable'

export const bachDerivativesDetectiveLevels: BachDerivativesDetectiveError[][] = [
    ['no-divide', 'h-zero', 'tangent-x', 'normal-sign'],
    ['product', 'quotient-order', 'chain-inner', 'negative-power'],
    ['exp-inner', 'exp-power', 'ln-inner', 'continuous-derivable']
]

export const BACH_DERIVATIVES_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
const LABELS = {
    substitute: say('Ordezkatu', 'Sustituye', 'عوّض', 'Substitute'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    rule: say('Erregela', 'Regla', 'القاعدة', 'Rule'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const derive = (formula: string) => say(`Deribatu $${formula}$.`, `Deriva $${formula}$.`, `اشتق $${formula}$.`, `Differentiate $${formula}$.`)

export const bachDerivativesDetectiveNames: Record<BachDerivativesDetectiveError, LocalizedText> = {
    'no-divide': say('Ez du $b-a$ kenduraz zatitu', 'No dividió entre $b-a$', 'لم يقسم على $b-a$', 'Did not divide by $b-a$'),
    'h-zero': say('$h=0$ ordezkatu du sinplifikatu gabe', 'Sustituyó $h=0$ sin simplificar', 'عوّض $h=0$ دون تبسيط', 'Substituted $h=0$ without simplifying'),
    'tangent-x': say('Zuzen ukitzailean $f\'(x)$ utzi du, ez $f\'(a)$', 'Dejó $f\'(x)$ en la tangente, no $f\'(a)$', 'ترك $f\'(x)$ في المماس لا $f\'(a)$', 'Left $f\'(x)$ in the tangent, not $f\'(a)$'),
    'normal-sign': say('Normalaren malda $-f\'(a)$ dela hartu du', 'Tomó $-f\'(a)$ como pendiente de la normal', 'أخذ $-f\'(a)$ ميلًا للعمودي', 'Took $-f\'(a)$ as the slope of the normal'),
    product: say('$(f\\cdot g)\'=f\'\\cdot g\'$ egin du', 'Hizo $(f\\cdot g)\'=f\'\\cdot g\'$', 'أجرى $(f\\cdot g)\'=f\'\\cdot g\'$', 'Did $(f\\cdot g)\'=f\'\\cdot g\'$'),
    'quotient-order': say('Zatiduran ordena aldatu du', 'Cambió el orden en el cociente', 'غيّر الترتيب في خارج القسمة', 'Swapped the order in the quotient'),
    'chain-inner': say('Barrukoaren deribatua ahaztu du', 'Olvidó la derivada de dentro', 'نسي مشتقة الداخلية', 'Forgot the derivative of the inside'),
    'negative-power': say('Berretzaile negatiboari 1 gehitu dio', 'Al exponente negativo le sumó 1', 'أضاف 1 إلى الأس السالب', 'Added 1 to the negative exponent'),
    'exp-inner': say('Berretzailearen deribatua ahaztu du', 'Olvidó la derivada del exponente', 'نسي مشتقة الأس', 'Forgot the derivative of the exponent'),
    'exp-power': say('$a^x$ funtzioari berreturaren erregela aplikatu dio', 'Aplicó la regla de la potencia a $a^x$', 'طبّق قاعدة القوة على $a^x$', 'Applied the power rule to $a^x$'),
    'ln-inner': say('$(\\ln u)\'=\\frac{1}{u}$ egin du, $u\'$ gabe', 'Hizo $(\\ln u)\'=\\frac{1}{u}$, sin $u\'$', 'أجرى $(\\ln u)\'=\\frac{1}{u}$ دون $u\'$', 'Did $(\\ln u)\'=\\frac{1}{u}$, without $u\'$'),
    'continuous-derivable': say('Jarraitua denez, deribagarria dela esan du', 'Dijo que es derivable porque es continua', 'قال إنها قابلة للاشتقاق لأنها متصلة', 'Said it is differentiable because it is continuous')
}

export const bachDerivativesDetectiveTips: Record<BachDerivativesDetectiveError, LocalizedText> = {
    'no-divide': say('T.V.M. zatidura bat da: $\\frac{f(b)-f(a)}{b-a}$.', 'La T.V.M. es un cociente: $\\frac{f(b)-f(a)}{b-a}$.', 'معدل التغير المتوسط خارج قسمة: $\\frac{f(b)-f(a)}{b-a}$.', 'The average rate is a quotient: $\\frac{f(b)-f(a)}{b-a}$.'),
    'h-zero': say('$\\frac{0}{0}$ ateratzen bada, lehenik sinplifikatu $h$, eta gero $h\\to 0$.', 'Si sale $\\frac{0}{0}$, primero simplifica la $h$ y después $h\\to 0$.', 'إذا ظهر $\\frac{0}{0}$ فبسّط $h$ أولًا ثم $h\\to 0$.', 'If you get $\\frac{0}{0}$, cancel the $h$ first and then let $h\\to 0$.'),
    'tangent-x': say('Malda zenbaki bat da: ordezkatu $x=a$ deribatuan.', 'La pendiente es un número: sustituye $x=a$ en la derivada.', 'الميل عدد: عوّض $x=a$ في المشتقة.', 'The slope is a number: substitute $x=a$ in the derivative.'),
    'normal-sign': say('Normalaren malda $-\\frac{1}{f\'(a)}$ da.', 'La pendiente de la normal es $-\\frac{1}{f\'(a)}$.', 'ميل العمودي $-\\frac{1}{f\'(a)}$.', 'The slope of the normal is $-\\frac{1}{f\'(a)}$.'),
    product: say('$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$', '$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$', '$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$', '$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$'),
    'quotient-order': say('Lehenik goikoaren deribatua: $\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$.', 'Primero la derivada de arriba: $\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$.', 'مشتقة البسط أولًا: $\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$.', 'The derivative of the top first: $\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$.'),
    'chain-inner': say('Kateak barrukoaren deribatuaz biderkatzen du.', 'La cadena multiplica por la derivada de dentro.', 'تضرب السلسلة في مشتقة الداخلية.', 'The chain multiplies by the derivative of the inside.'),
    'negative-power': say('Berretzaileari 1 kentzen zaio: $-2-1=-3$.', 'Al exponente se le resta 1: $-2-1=-3$.', 'نطرح 1 من الأس: $-2-1=-3$.', 'You subtract 1 from the exponent: $-2-1=-3$.'),
    'exp-inner': say('$(e^{u})\'=e^{u}\\cdot u\'$', '$(e^{u})\'=e^{u}\\cdot u\'$', '$(e^{u})\'=e^{u}\\cdot u\'$', '$(e^{u})\'=e^{u}\\cdot u\'$'),
    'exp-power': say('Aldagaia berretzailean dago: $(a^x)\'=a^x\\ln a$.', 'La variable está en el exponente: $(a^x)\'=a^x\\ln a$.', 'المتغير في الأس: $(a^x)\'=a^x\\ln a$.', 'The variable is in the exponent: $(a^x)\'=a^x\\ln a$.'),
    'ln-inner': say('$(\\ln u)\'=\\frac{u\'}{u}$', '$(\\ln u)\'=\\frac{u\'}{u}$', '$(\\ln u)\'=\\frac{u\'}{u}$', '$(\\ln u)\'=\\frac{u\'}{u}$'),
    'continuous-derivable': say('Jarraitua izatea ez da nahikoa: alboko deribatuak berdinak izan behar dira.', 'Ser continua no basta: las derivadas laterales tienen que coincidir.', 'الاتصال لا يكفي: يجب أن تتساوى المشتقتان الجانبيتان.', 'Being continuous is not enough: the one-sided derivatives have to be equal.')
}

type Built = Omit<WorkedCase<BachDerivativesDetectiveError>, 'options'>

function build(random: Random, error: BachDerivativesDetectiveError): Built | null {
    switch (error) {
        case 'no-divide': {
            const a = randomInt(random, 1, 2)
            const b = randomInt(random, a + 2, 5)
            return {
                problem: say(`Kalkulatu $f(x)=x^2$ funtzioaren T.V.M. $[${a},${b}]$ tartean.`, `Halla la T.V.M. de $f(x)=x^2$ en $[${a},${b}]$.`, `أوجد معدل التغير المتوسط لـ $f(x)=x^2$ في $[${a},${b}]$.`, `Find the average rate of $f(x)=x^2$ on $[${a},${b}]$.`),
                lines: [line(LABELS.substitute, `f(${a})=${a * a}\\quad f(${b})=${b * b}`), line(LABELS.step, `${b * b}-${a * a}=${b * b - a * a}`), line(LABELS.result, String(b * b - a * a))],
                wrong: 2, error, fix: `\\frac{${b * b - a * a}}{${b}-${a}}=${a + b}`, right: a + b, reached: b * b - a * a
            }
        }
        case 'h-zero': {
            const a = randomInt(random, 1, 4)
            return {
                problem: say(`Kalkulatu $f'(${a})$ definizioaren bidez, $f(x)=x^2$ bada.`, `Calcula $f'(${a})$ con la definición para $f(x)=x^2$.`, `احسب $f'(${a})$ بالتعريف للدالة $f(x)=x^2$.`, `Work out $f'(${a})$ from the definition for $f(x)=x^2$.`),
                lines: [line(LABELS.step, `\\frac{(${a}+h)^2-${a * a}}{h}`), line(LABELS.substitute, 'h=0\\ \\to\\ \\frac{0}{0}=0'), line(LABELS.result, `f'(${a})=0`)],
                wrong: 1, error, fix: `\\frac{${2 * a}h+h^2}{h}=${2 * a}+h\\ \\to\\ ${2 * a}`, right: 2 * a, reached: 0
            }
        }
        case 'tangent-x': {
            const a = pick(random, [-2, -1, 1, 2, 3])
            return {
                problem: say(`Idatzi $f(x)=x^2$ funtzioaren zuzen ukitzailea $x=${a}$ puntuan.`, `Escribe la tangente a $f(x)=x^2$ en $x=${a}$.`, `اكتب مماس $f(x)=x^2$ عند $x=${a}$.`, `Write the tangent to $f(x)=x^2$ at $x=${a}$.`),
                lines: [line(LABELS.substitute, `f(${a})=${a * a}`), line(LABELS.step, `y-${a * a}=2x(x${signed(-a)})`), line(LABELS.result, `y=2x^2${signed(-2 * a)}x+${a * a}`)],
                wrong: 1, error, fix: `y=${2 * a}x${signed(-a * a)}`, right: 2 * a, reached: 0.5
            }
        }
        case 'normal-sign': {
            const a = pick(random, [1, 2, 3])
            return {
                problem: say(`Kalkulatu $f(x)=x^2$ funtzioaren normalaren malda $x=${a}$ puntuan.`, `Halla la pendiente de la normal a $f(x)=x^2$ en $x=${a}$.`, `أوجد ميل العمودي على $f(x)=x^2$ عند $x=${a}$.`, `Find the slope of the normal to $f(x)=x^2$ at $x=${a}$.`),
                lines: [line(LABELS.substitute, `f'(${a})=${2 * a}`), line(LABELS.rule, `m=-${2 * a}`), line(LABELS.result, `y-${a * a}=-${2 * a}(x-${a})`)],
                wrong: 1, error, fix: `m=-\\frac{1}{${2 * a}}`, right: -1 / (2 * a), reached: -2 * a
            }
        }
        case 'product': {
            const c = pick(random, [-3, -2, -1, 1, 2, 3])
            return {
                problem: derive(`f(x)=x^2(x${signed(c)})`),
                lines: [line(LABELS.step, "(x^2)'=2x"), line(LABELS.rule, "f'(x)=2x\\cdot 1"), line(LABELS.result, "f'(x)=2x")],
                wrong: 1, error, fix: `f'(x)=3x^2${signed(2 * c)}x`, right: 3 + 2 * c, reached: 2
            }
        }
        case 'quotient-order': {
            const p = randomInt(random, 1, 4)
            const q = randomInt(random, -3, 3)
            if (p === q) return null
            return {
                problem: derive(`f(x)=\\frac{x${signed(p)}}{x${signed(q)}}`),
                lines: [line(LABELS.step, `(x${signed(p)})'=(x${signed(q)})'=1`), line(LABELS.rule, `f'(x)=\\frac{(x${signed(p)})\\cdot 1-1\\cdot(x${signed(q)})}{(x${signed(q)})^2}`), line(LABELS.result, `f'(x)=\\frac{${p - q}}{(x${signed(q)})^2}`)],
                wrong: 1, error, fix: `\\frac{1\\cdot(x${signed(q)})-(x${signed(p)})\\cdot 1}{(x${signed(q)})^2}=\\frac{${q - p}}{(x${signed(q)})^2}`, right: q - p, reached: p - q
            }
        }
        case 'chain-inner': {
            const k = randomInt(random, 2, 5)
            const c = randomInt(random, 1, 3)
            const n = randomInt(random, 2, 4)
            const power = n - 1 === 1 ? '' : `^${n - 1}`
            return {
                problem: derive(`f(x)=(${k}x+${c})^${n}`),
                lines: [line(LABELS.rule, `(u^${n})'=${n}u${power}`), line(LABELS.step, `f'(x)=${n}(${k}x+${c})${power}`), line(LABELS.result, `f'(0)=${n * c ** (n - 1)}`)],
                wrong: 1, error, fix: `${n}(${k}x+${c})${power}\\cdot ${k}`, right: n * k * c ** (n - 1), reached: n * c ** (n - 1)
            }
        }
        case 'negative-power': {
            const k = pick(random, [2, 3, 4, 5])
            return {
                problem: derive(`f(x)=\\frac{${k}}{x^2}`),
                lines: [line(LABELS.step, `f(x)=${k}x^{-2}`), line(LABELS.rule, `f'(x)=-${2 * k}x^{-1}`), line(LABELS.result, `f'(x)=-\\frac{${2 * k}}{x}`)],
                wrong: 1, error, fix: `f'(x)=-\\frac{${2 * k}}{x^3}`, right: -3, reached: -1
            }
        }
        case 'exp-inner': {
            const k = randomInt(random, 2, 5)
            return {
                problem: derive(`f(x)=e^{${k}x}`),
                lines: [line(LABELS.rule, "(e^{u})'=e^{u}"), line(LABELS.step, `f'(x)=e^{${k}x}`), line(LABELS.result, "f'(0)=1")],
                wrong: 0, error, fix: `f'(x)=${k}e^{${k}x}`, right: k, reached: 1
            }
        }
        case 'exp-power': {
            const a = pick(random, [2, 3, 5, 10])
            return {
                problem: derive(`f(x)=${a}^x`),
                lines: [line(LABELS.rule, "(x^n)'=n\\,x^{n-1}"), line(LABELS.step, `f'(x)=x\\cdot ${a}^{x-1}`), line(LABELS.result, "f'(0)=0")],
                wrong: 1, error, fix: `f'(x)=${a}^x\\ln ${a}`, right: Math.log(a), reached: 0
            }
        }
        case 'ln-inner': {
            const c = randomInt(random, 1, 5)
            return {
                problem: derive(`f(x)=\\ln(x^2+${c})`),
                lines: [line(LABELS.rule, "(\\ln u)'=\\frac{1}{u}"), line(LABELS.step, `f'(x)=\\frac{1}{x^2+${c}}`), line(LABELS.result, `f'(1)=\\frac{1}{${1 + c}}`)],
                wrong: 0, error, fix: `f'(x)=\\frac{2x}{x^2+${c}}`, right: 2 / (1 + c), reached: 1 / (1 + c)
            }
        }
        case 'continuous-derivable': {
            const a = pick(random, [-2, -1, 1, 2, 3])
            return {
                problem: say(`Deribagarria al da $f(x)=|x${signed(-a)}|$ funtzioa $x=${a}$ puntuan?`, `¿Es derivable $f(x)=|x${signed(-a)}|$ en $x=${a}$?`, `هل $f(x)=|x${signed(-a)}|$ قابلة للاشتقاق عند $x=${a}$؟`, `Is $f(x)=|x${signed(-a)}|$ differentiable at $x=${a}$?`),
                lines: [line(LABELS.substitute, `\\lim_{x\\to ${a}}f(x)=f(${a})`), line(LABELS.step, `\\Rightarrow\\ \\exists\\,f'(${a})`), line(LABELS.result, `f'(${a})=0`)],
                wrong: 1, error, fix: "f'_-=-1\\neq f'_+=1", right: 1, reached: 0
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBachDerivativesDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bachDerivativesDetectiveLevels[levelIndex], BACH_DERIVATIVES_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH_DERIVATIVES_DETECTIVE_ERRORS = bachDerivativesDetectiveLevels.flat()
