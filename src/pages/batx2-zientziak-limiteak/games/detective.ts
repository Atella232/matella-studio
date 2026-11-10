import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Limiteen detektibea · Batxilergoa 2 (Detective de límites de 2.º): a
   solved exercise with exactly one wrong line, and the mistake to name.
   The mistakes are the typical ones of this unit. Level 1, the definition
   and the infinities: δ = ε whatever the slope, a power beating an
   exponential, 1^∞ = 1, √x² = x when x → −∞. Level 2, notable limits and
   continuity: sin px / qx → 1/q, one joint for two parameters, a limit
   that exists taken as continuity, the end of a domain taken as a break.
   Level 3, the theorems: the same sign read as «no root», h = f − g with
   the wrong sign, the intermediate values outside f(a) and f(b), a
   maximum on an open interval. The lines carry formulas only; \sin goes
   through the language's names.
   ========================================================================== */

export type Bach2LimitsDetectiveError =
    | 'delta-epsilon'
    | 'power-exponential'
    | 'one-infinity'
    | 'root-negative'
    | 'sine-coefficient'
    | 'one-joint'
    | 'continuity-value'
    | 'interval-end'
    | 'same-sign'
    | 'difference-sign'
    | 'value-outside'
    | 'open-maximum'

export const bach2LimitsDetectiveLevels: Bach2LimitsDetectiveError[][] = [
    ['delta-epsilon', 'power-exponential', 'one-infinity', 'root-negative'],
    ['sine-coefficient', 'one-joint', 'continuity-value', 'interval-end'],
    ['same-sign', 'difference-sign', 'value-outside', 'open-maximum']
]

export const BACH2_LIMITS_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
const dec = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
const LABELS = {
    substitute: say('Ordezkatu', 'Sustituye', 'عوّض', 'Substitute'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    left: say('Ezkerretik', 'Por la izquierda', 'من اليسار', 'From the left'),
    joint: say('Lotunea', 'Unión', 'الالتقاء', 'Joint'),
    breaks: say('Etenuneak', 'Discontinuidades', 'الانقطاعات', 'Discontinuities'),
    roots: say('Erroak', 'Raíces', 'الجذور', 'Roots'),
    conclusion: say('Ondorioa', 'Conclusión', 'الاستنتاج', 'Conclusion')
}
const work = (formula: string) => say(`Kalkulatu $${formula}$.`, `Calcula $${formula}$.`, `احسب $${formula}$.`, `Work out $${formula}$.`)

type Built = Omit<WorkedCase<Bach2LimitsDetectiveError>, 'options'>

function build(random: Random, error: Bach2LimitsDetectiveError): Built | null {
    switch (error) {
        case 'delta-epsilon': {
            const m = pick(random, [2, 3, 4])
            const a = randomInt(random, 1, 3)
            const c = randomInt(random, -3, 3)
            const epsilon = pick(random, [0.4, 0.8, 1.2])
            const limit = m * a + c
            return {
                problem: say(`$\\lim_{x\\to ${a}}(${m}x${signed(c)})=${limit}$ limitean, aurkitu $\\varepsilon=${dec(epsilon)}$ baliorako $\\delta$ bat.`, `Para $\\lim_{x\\to ${a}}(${m}x${signed(c)})=${limit}$, halla un $\\delta$ para $\\varepsilon=${dec(epsilon)}$.`, `في $\\lim_{x\\to ${a}}(${m}x${signed(c)})=${limit}$ أوجد $\\delta$ لـ $\\varepsilon=${dec(epsilon)}$.`, `For $\\lim_{x\\to ${a}}(${m}x${signed(c)})=${limit}$, find a $\\delta$ for $\\varepsilon=${dec(epsilon)}$.`),
                lines: [line(LABELS.step, `|${m}x${signed(c)}-${limit}|=${m}|x-${a}|`), line(LABELS.step, '\\delta=\\varepsilon'), line(LABELS.result, `\\delta=${dec(epsilon)}`)],
                wrong: 1, error, fix: `${m}|x-${a}|<${dec(epsilon)}\\ \\to\\ \\delta=${dec(epsilon / m)}`, right: epsilon / m, reached: epsilon
            }
        }
        case 'power-exponential': {
            const p = randomInt(random, 3, 8)
            const base = pick(random, [2, 3])
            return {
                problem: work(`\\lim_{x\\to+\\infty}\\frac{x^{${p}}}{${base}^x}`),
                lines: [line(LABELS.substitute, '\\frac{\\infty}{\\infty}'), line(LABELS.step, `x^{${p}}\\gg ${base}^x`), line(LABELS.result, '+\\infty')],
                wrong: 1, error, fix: `${base}^x\\gg x^{${p}}\\ \\to\\ 0`, right: 0, reached: 1000
            }
        }
        case 'one-infinity': {
            const p = randomInt(random, 2, 4)
            const q = randomInt(random, 2, 3)
            return {
                problem: work(`\\lim_{x\\to 0}(1+${p}x)^{\\frac{${q}}{x}}`),
                lines: [line(LABELS.substitute, '1^{\\infty}'), line(LABELS.step, '1^{\\infty}=1'), line(LABELS.result, '1')],
                wrong: 1, error, fix: `\\frac{${q}}{x}\\cdot ${p}x=${p * q}\\ \\to\\ e^{${p * q}}`, right: p * q, reached: 0
            }
        }
        case 'root-negative': {
            const p = randomInt(random, 2, 5)
            const q = randomInt(random, 1, 9)
            return {
                problem: work(`\\lim_{x\\to-\\infty}\\frac{\\sqrt{x^2+${q}}}{${p}x}`),
                lines: [line(LABELS.step, '\\sqrt{x^2}=x'), line(LABELS.step, `\\frac{x}{${p}x}=\\frac{1}{${p}}`), line(LABELS.result, `\\frac{1}{${p}}`)],
                wrong: 0, error, fix: `\\sqrt{x^2}=|x|=-x\\ \\to\\ -\\frac{1}{${p}}`, right: -1 / p, reached: 1 / p
            }
        }
        case 'sine-coefficient': {
            const p = randomInt(random, 2, 7)
            const q = randomInt(random, 2, 5)
            if (p === q) return null
            return {
                problem: work(`\\lim_{x\\to 0}\\frac{\\sin ${p}x}{${q}x}`),
                lines: [line(LABELS.substitute, '\\frac{0}{0}'), line(LABELS.step, `\\frac{\\sin ${p}x}{${q}x}=\\frac{1}{${q}}\\cdot\\frac{\\sin ${p}x}{x}`), line(LABELS.result, `\\frac{1}{${q}}`)],
                wrong: 2, error, fix: `\\frac{${p}}{${q}}\\cdot\\frac{\\sin ${p}x}{${p}x}\\ \\to\\ \\frac{${p}}{${q}}`, right: p / q, reached: 1 / q
            }
        }
        case 'one-joint': {
            const p = pick(random, [0, 2, 4])
            const a = (p + 8) / 2
            const b = 3 * a - 9
            return {
                problem: say(`Aurkitu $a+b$, funtzio hau jarraitua izan dadin: $f(x)=\\begin{cases}ax${signed(p)} & x<1\\\\ x^2+b & 1\\le x<3\\\\ ax & x\\ge 3\\end{cases}$`, `Halla $a+b$ para que sea continua: $f(x)=\\begin{cases}ax${signed(p)} & x<1\\\\ x^2+b & 1\\le x<3\\\\ ax & x\\ge 3\\end{cases}$`, `أوجد $a+b$ لتكون متصلة: $f(x)=\\begin{cases}ax${signed(p)} & x<1\\\\ x^2+b & 1\\le x<3\\\\ ax & x\\ge 3\\end{cases}$`, `Find $a+b$ so that it is continuous: $f(x)=\\begin{cases}ax${signed(p)} & x<1\\\\ x^2+b & 1\\le x<3\\\\ ax & x\\ge 3\\end{cases}$`),
                lines: [line(LABELS.joint, `a${signed(p)}=1+b`), line(LABELS.step, `b=0\\ \\to\\ a=${1 - p}`), line(LABELS.result, `a+b=${1 - p}`)],
                wrong: 1, error, fix: `9+b=3a\\ \\to\\ a=${a},\\ b=${b}`, right: a + b, reached: 1 - p
            }
        }
        case 'continuity-value': {
            const a = randomInt(random, 1, 4)
            const v = 2 * a + pick(random, [-2, -1, 1, 2])
            return {
                problem: say(`$f(x)=\\frac{x^2-${a * a}}{x-${a}}$ da $x\\neq ${a}$ denean, eta $f(${a})=${v}$. Zenbat etenune ditu?`, `$f(x)=\\frac{x^2-${a * a}}{x-${a}}$ si $x\\neq ${a}$, y $f(${a})=${v}$. ¿Cuántas discontinuidades tiene?`, `$f(x)=\\frac{x^2-${a * a}}{x-${a}}$ عندما $x\\neq ${a}$، و$f(${a})=${v}$. كم انقطاعًا لها؟`, `$f(x)=\\frac{x^2-${a * a}}{x-${a}}$ for $x\\neq ${a}$, and $f(${a})=${v}$. How many discontinuities does it have?`),
                lines: [line(LABELS.step, `\\lim_{x\\to ${a}}f(x)=${2 * a}`), line(LABELS.step, `\\exists\\lim_{x\\to ${a}}f(x)\\ \\Rightarrow\\ \\checkmark`), line(LABELS.breaks, '0')],
                wrong: 1, error, fix: `\\lim_{x\\to ${a}}f(x)=${2 * a}\\neq f(${a})=${v}`, right: 1, reached: 0
            }
        }
        case 'interval-end': {
            const c = randomInt(random, -2, 3)
            const d = randomInt(random, 2, 5)
            return {
                problem: say(`Zenbat etenune ditu $f(x)=\\sqrt{x${signed(-c)}}$ funtzioak $[${c},${c + d}]$ tartean?`, `¿Cuántas discontinuidades tiene $f(x)=\\sqrt{x${signed(-c)}}$ en $[${c},${c + d}]$?`, `كم انقطاعًا للدالة $f(x)=\\sqrt{x${signed(-c)}}$ على $[${c},${c + d}]$؟`, `How many discontinuities does $f(x)=\\sqrt{x${signed(-c)}}$ have on $[${c},${c + d}]$?`),
                lines: [line(LABELS.left, `\\nexists\\lim_{x\\to ${c}^-}f(x)`), line(LABELS.step, `\\nexists\\lim_{x\\to ${c}}f(x)\\ \\Rightarrow\\ x=${c}`), line(LABELS.breaks, '1')],
                wrong: 1, error, fix: `\\lim_{x\\to ${c}^+}\\sqrt{x${signed(-c)}}=0=f(${c})`, right: 0, reached: 1
            }
        }
        case 'same-sign': {
            const r = randomInt(random, -2, 1)
            const s = r + randomInt(random, 1, 3)
            const a = r - 1
            const b = s + 1
            const f = (x: number) => (x - r) * (x - s)
            const poly = `x^2${signed(-(r + s)) === '' ? '' : `${-(r + s) < 0 ? '-' : '+'}${Math.abs(r + s) === 1 ? '' : Math.abs(r + s)}x`}${signed(r * s)}`
            return {
                problem: say(`Zenbat erro ditu $${poly}$ funtzioak $[${a},${b}]$ tartean?`, `¿Cuántas raíces tiene $${poly}$ en $[${a},${b}]$?`, `كم جذرًا للدالة $${poly}$ في $[${a},${b}]$؟`, `How many roots does $${poly}$ have in $[${a},${b}]$?`),
                lines: [line(LABELS.substitute, `f(${a})=${f(a)}\\qquad f(${b})=${f(b)}`), line(LABELS.step, `f(${a})\\cdot f(${b})>0\\ \\to\\ \\nexists`), line(LABELS.roots, '0')],
                wrong: 1, error, fix: `${poly}=(x${signed(-r)})(x${signed(-s)})\\ \\to\\ x=${r},\\ x=${s}`, right: 2, reached: 0
            }
        }
        case 'difference-sign': {
            const c = randomInt(random, 1, 6)
            const h = (x: number) => x ** 3 - x - c
            const n = [0, 1, 2].find((k) => h(k) < 0 && h(k + 1) > 0)
            const wrongH = (x: number) => x ** 3 + x + c
            const m = [-3, -2, -1].find((k) => wrongH(k) < 0 && wrongH(k + 1) > 0)
            if (n === undefined || m === undefined) return null
            return {
                problem: say(`$y=x^3$ eta $y=x+${c}$ ebakitzen dira. Zein bi zenbaki osoren artean? Eman txikiena.`, `$y=x^3$ e $y=x+${c}$ se cortan. ¿Entre qué dos enteros? Da el menor.`, `يتقاطع $y=x^3$ و$y=x+${c}$. بين أي عددين صحيحين؟ اكتب الأصغر.`, `$y=x^3$ and $y=x+${c}$ cross. Between which two integers? Give the smaller.`),
                lines: [line(LABELS.step, `h(x)=x^3+x+${c}`), line(LABELS.substitute, `h(${m})=${wrongH(m)}\\qquad h(${m + 1})=${wrongH(m + 1)}`), line(LABELS.result, String(m))],
                wrong: 0, error, fix: `h(x)=x^3-x-${c}\\ \\to\\ h(${n})<0<h(${n + 1})`, right: n, reached: m
            }
        }
        case 'value-outside': {
            const p = randomInt(random, -2, 2)
            const q = p + randomInt(random, 2, 5)
            const k = q + randomInt(random, 1, 3)
            const a = randomInt(random, 0, 2)
            const b = a + randomInt(random, 2, 4)
            return {
                problem: say(`$f$ jarraitua da $[${a},${b}]$ tartean, $f(${a})=${p}$ eta $f(${b})=${q}$. Ziurtatzen al da $f(c)=${k}$ dela?`, `$f$ es continua en $[${a},${b}]$, $f(${a})=${p}$ y $f(${b})=${q}$. ¿Se asegura que $f(c)=${k}$?`, `$f$ متصلة على $[${a},${b}]$ و$f(${a})=${p}$ و$f(${b})=${q}$. هل نضمن أن $f(c)=${k}$؟`, `$f$ is continuous on $[${a},${b}]$, $f(${a})=${p}$ and $f(${b})=${q}$. Is $f(c)=${k}$ ensured?`),
                lines: [line(LABELS.substitute, `f(${a})=${p}\\qquad f(${b})=${q}`), line(LABELS.step, `${p}<${q}<${k}\\ \\Rightarrow\\ f(c)=${k}`), line(LABELS.conclusion, '\\checkmark')],
                wrong: 1, error, fix: `${k}\\notin(${p},${q})`, right: 0, reached: 1
            }
        }
        case 'open-maximum': {
            const b = randomInt(random, 2, 4)
            return {
                problem: say(`Zein da $f(x)=x^2$ funtzioaren maximo absolutua $(0,${b})$ tartean?`, `¿Cuál es el máximo absoluto de $f(x)=x^2$ en $(0,${b})$?`, `ما القيمة العظمى المطلقة لـ $f(x)=x^2$ على $(0,${b})$؟`, `What is the absolute maximum of $f(x)=x^2$ on $(0,${b})$?`),
                lines: [line(LABELS.step, `f\\ \\nearrow`), line(LABELS.step, `\\max=f(${b})`), line(LABELS.result, String(b * b))],
                wrong: 1, error, fix: `${b}\\notin(0,${b})\\ \\to\\ \\nexists\\max`, right: -1, reached: b * b
            }
        }
    }
}

export const bach2LimitsDetectiveNames: Record<Bach2LimitsDetectiveError, LocalizedText> = {
    'delta-epsilon': say('$\\delta=\\varepsilon$ hartu du, malda kontuan hartu gabe', 'Tomó $\\delta=\\varepsilon$ sin mirar la pendiente', 'أخذ $\\delta=\\varepsilon$ دون النظر إلى الميل', 'Took $\\delta=\\varepsilon$ without looking at the slope'),
    'power-exponential': say('Berreketak esponentzialari irabazten diola esan du', 'Dijo que la potencia gana a la exponencial', 'قال إن القوة تتفوق على الأسية', 'Said that the power beats the exponential'),
    'one-infinity': say('$1^{\\infty}$ bat dela esan du', 'Dijo que $1^{\\infty}$ es uno', 'قال إن $1^{\\infty}$ واحد', 'Said that $1^{\\infty}$ is one'),
    'root-negative': say('$\\sqrt{x^2}=x$ hartu du $x<0$ izanik', 'Tomó $\\sqrt{x^2}=x$ con $x<0$', 'أخذ $\\sqrt{x^2}=x$ مع $x<0$', 'Took $\\sqrt{x^2}=x$ with $x<0$'),
    'sine-coefficient': say('Sinuaren barruko zenbakia ahaztu du', 'Olvidó el número de dentro del seno', 'نسي العدد داخل الجيب', 'Forgot the number inside the sine'),
    'one-joint': say('Lotune bakarra erabili du bi parametrorako', 'Usó una sola unión para dos parámetros', 'استعمل نقطة التقاء واحدة لوسيطين', 'Used one joint for two parameters'),
    'continuity-value': say('Limitea egotea jarraitutasuntzat hartu du', 'Tomó que exista el límite por continuidad', 'اعتبر وجود النهاية اتصالًا', 'Took the existence of the limit for continuity'),
    'interval-end': say('Izate-eremuaren muturra etenunetzat hartu du', 'Tomó el extremo del dominio por una discontinuidad', 'اعتبر طرف المجال انقطاعًا', 'Took the end of the domain for a discontinuity'),
    'same-sign': say('Zeinu berak errorik ez dagoela esan nahi duela uste du', 'Creyó que el mismo signo quiere decir que no hay raíz', 'ظن أن الإشارة نفسها تعني عدم وجود جذر', 'Thought the same sign means there is no root'),
    'difference-sign': say('$h=f-g$ zeinu okerrarekin idatzi du', 'Escribió $h=f-g$ con el signo mal', 'كتب $h=f-g$ بإشارة خاطئة', 'Wrote $h=f-g$ with the wrong sign'),
    'value-outside': say('$f(a)$ eta $f(b)$ artean ez dagoen balio bat ziurtatu du', 'Aseguró un valor que no está entre $f(a)$ y $f(b)$', 'ضمن قيمة ليست بين $f(a)$ و$f(b)$', 'Ensured a value that is not between $f(a)$ and $f(b)$'),
    'open-maximum': say('Maximoa tarte irekiaren muturrean jarri du', 'Puso el máximo en el extremo de un intervalo abierto', 'وضع القيمة العظمى عند طرف فترة مفتوحة', 'Put the maximum at the end of an open interval')
}

export const bach2LimitsDetectiveTips: Record<Bach2LimitsDetectiveError, LocalizedText> = {
    'delta-epsilon': say('Zatitu $\\varepsilon$ maldaz: $\\delta=\\frac{\\varepsilon}{m}$.', 'Divide $\\varepsilon$ entre la pendiente: $\\delta=\\frac{\\varepsilon}{m}$.', 'اقسم $\\varepsilon$ على الميل: $\\delta=\\frac{\\varepsilon}{m}$.', 'Divide $\\varepsilon$ by the slope: $\\delta=\\frac{\\varepsilon}{m}$.'),
    'power-exponential': say('$a^x$ esponentzialak ($a>1$) beti irabazten dio edozein berreketari.', 'La exponencial $a^x$ ($a>1$) siempre gana a cualquier potencia.', 'الأسية $a^x$ ‏($a>1$) تتفوق دائمًا على أي قوة.', 'The exponential $a^x$ ($a>1$) always beats any power.'),
    'one-infinity': say('$1^{\\infty}$ indeterminazioa da: $e^{\\lim g\\,(f-1)}$.', '$1^{\\infty}$ es una indeterminación: $e^{\\lim g\\,(f-1)}$.', '$1^{\\infty}$ حالة عدم تعيين: $e^{\\lim g\\,(f-1)}$.', '$1^{\\infty}$ is indeterminate: $e^{\\lim g\\,(f-1)}$.'),
    'root-negative': say('$\\sqrt{x^2}=|x|$, eta $-x$ da $x<0$ denean.', '$\\sqrt{x^2}=|x|$, que es $-x$ si $x<0$.', '$\\sqrt{x^2}=|x|$ وتساوي $-x$ إذا كان $x<0$.', '$\\sqrt{x^2}=|x|$, which is $-x$ if $x<0$.'),
    'sine-coefficient': say('$\\frac{\\sin px}{x}\\to p$: barruko zenbakia kanpora ateratzen da.', '$\\frac{\\sin px}{x}\\to p$: el número de dentro sale fuera.', '$\\frac{\\sin px}{x}\\to p$: العدد في الداخل يخرج.', '$\\frac{\\sin px}{x}\\to p$: the number inside comes out.'),
    'one-joint': say('Bi parametro: bi lotune, bi ekuazio.', 'Dos parámetros: dos uniones, dos ecuaciones.', 'وسيطان: نقطتا التقاء ومعادلتان.', 'Two parameters: two joints, two equations.'),
    'continuity-value': say('Jarraitua izateko, limiteak $f(a)$ balio behar du.', 'Para ser continua, el límite tiene que valer $f(a)$.', 'لتكون متصلة يجب أن تساوي النهاية $f(a)$.', 'To be continuous, the limit must equal $f(a)$.'),
    'interval-end': say('Muturrean nahikoa da dagoen alboko limitea.', 'En un extremo basta el límite lateral que existe.', 'عند الطرف تكفي النهاية الجانبية الموجودة.', 'At an end, the one-sided limit that exists is enough.'),
    'same-sign': say('Bolzanok ez du ezer esaten zeinua aldatzen ez bada: erroak egon daitezke.', 'Bolzano no dice nada si no cambia el signo: puede haber raíces.', 'لا تقول بولتسانو شيئًا إذا لم تتغير الإشارة: قد توجد جذور.', 'Bolzano says nothing if the sign does not change: there may be roots.'),
    'difference-sign': say('$h(x)=f(x)-g(x)$: kendu $g$ osorik.', '$h(x)=f(x)-g(x)$: resta $g$ entera.', '$h(x)=f(x)-g(x)$: اطرح $g$ كلها.', '$h(x)=f(x)-g(x)$: subtract all of $g$.'),
    'value-outside': say('Teoremak $f(a)$ eta $f(b)$ arteko balioak bakarrik ziurtatzen ditu.', 'El teorema solo asegura los valores entre $f(a)$ y $f(b)$.', 'لا تضمن المبرهنة إلا القيم بين $f(a)$ و$f(b)$.', 'The theorem only ensures the values between $f(a)$ and $f(b)$.'),
    'open-maximum': say('Tarte irekian muturra ez dago: Weierstrassek tarte itxia eskatzen du.', 'En un intervalo abierto el extremo no está: Weierstrass pide intervalo cerrado.', 'في الفترة المفتوحة لا يوجد الطرف: يشترط فايرشتراس فترة مغلقة.', 'In an open interval the end is not there: Weierstrass needs a closed interval.')
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBach2LimitsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bach2LimitsDetectiveLevels[levelIndex], BACH2_LIMITS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH2_LIMITS_DETECTIVE_ERRORS = bach2LimitsDetectiveLevels.flat()
