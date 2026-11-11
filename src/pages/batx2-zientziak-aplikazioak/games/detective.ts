import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Aplikazioen detektibea · Batxilergoa 2 (Detective de aplicaciones de
   2.º): a solved exercise with exactly one wrong line, and the mistake to
   name. Level 1, the review and the theorems: an extremum where f′ does
   not change sign, an inflection where f″ does not change sign, the ends
   of the interval forgotten, f(c) instead of f′(c). Level 2, L'Hôpital:
   no indeterminate form, the quotient rule instead of the rule, ∞·0 read
   as 0, ln L given as the limit. Level 3, conditions and optimisation:
   an extremum read as f = 0, f′ = 0 at an inflection, the x of the
   optimum given as its value, D = d² given as the distance. The lines
   carry formulas only.
   ========================================================================== */

export type Bach2ApplicationsDetectiveError =
    | 'extremum-sign'
    | 'inflection-sign'
    | 'interval-ends'
    | 'mean-height'
    | 'no-indeterminate'
    | 'quotient-rule'
    | 'zero-infinity'
    | 'log-limit'
    | 'extremum-zero'
    | 'inflection-slope'
    | 'optimum-x'
    | 'distance-root'

export const bach2ApplicationsDetectiveLevels: Bach2ApplicationsDetectiveError[][] = [
    ['extremum-sign', 'inflection-sign', 'interval-ends', 'mean-height'],
    ['no-indeterminate', 'quotient-rule', 'zero-infinity', 'log-limit'],
    ['extremum-zero', 'inflection-slope', 'optimum-x', 'distance-root']
]

export const BACH2_APPLICATIONS_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
const frac = (p: number, q: number) => {
    const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y))
    const g = gcd(p, q)
    const [n, d] = [p / g, q / g]
    return d === 1 ? String(n) : `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`
}
const LABELS = {
    derive: say('Deribatu', 'Deriva', 'اشتق', 'Differentiate'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    values: say('Balioak', 'Valores', 'القيم', 'Values'),
    slope: say('Malda', 'Pendiente', 'الميل', 'Slope'),
    form: say('Forma', 'Forma', 'الصيغة', 'Form'),
    conclusion: say('Ondorioa', 'Conclusión', 'الاستنتاج', 'Conclusion')
}

type Built = Omit<WorkedCase<Bach2ApplicationsDetectiveError>, 'options'>

function build(random: Random, error: Bach2ApplicationsDetectiveError): Built | null {
    switch (error) {
        case 'extremum-sign': {
            const k = randomInt(random, 1, 3)
            const c = randomInt(random, 1, 5)
            return {
                problem: say(`Zenbat mutur erlatibo ditu $f(x)=(x-${k})^3${signed(c)}$ funtzioak?`, `¿Cuántos extremos relativos tiene $f(x)=(x-${k})^3${signed(c)}$?`, `كم قيمة قصوى محلية للدالة $f(x)=(x-${k})^3${signed(c)}$؟`, `How many local extrema does $f(x)=(x-${k})^3${signed(c)}$ have?`),
                lines: [line(LABELS.derive, `f'(x)=3(x-${k})^2`), line(LABELS.step, `f'(x)=0\\ \\to\\ x=${k}`), line(LABELS.conclusion, `x=${k}\\ \\to\\ \\min`)],
                wrong: 2, error, fix: `f'(x)=3(x-${k})^2\\ge 0\\ \\to\\ 0`, right: 0, reached: 1
            }
        }
        case 'inflection-sign': {
            const k = randomInt(random, 1, 3)
            return {
                problem: say(`Zenbat inflexio-puntu ditu $f(x)=(x-${k})^4$ funtzioak?`, `¿Cuántos puntos de inflexión tiene $f(x)=(x-${k})^4$?`, `كم نقطة انعطاف للدالة $f(x)=(x-${k})^4$؟`, `How many points of inflection does $f(x)=(x-${k})^4$ have?`),
                lines: [line(LABELS.derive, `f''(x)=12(x-${k})^2`), line(LABELS.step, `f''(x)=0\\ \\to\\ x=${k}`), line(LABELS.conclusion, `I(${k},\\ 0)`)],
                wrong: 2, error, fix: `f''(x)=12(x-${k})^2\\ge 0\\ \\to\\ 0`, right: 0, reached: 1
            }
        }
        case 'interval-ends': {
            const b = pick(random, [3, 4])
            const fb = b ** 3 - 3 * b
            return {
                problem: say(`Aurkitu $f(x)=x^3-3x$ funtzioaren maximo absolutua $[-2,\\,${b}]$ tartean.`, `Halla el máximo absoluto de $f(x)=x^3-3x$ en $[-2,\\,${b}]$.`, `أوجد القيمة العظمى المطلقة للدالة $f(x)=x^3-3x$ على $[-2,\\,${b}]$.`, `Find the absolute maximum of $f(x)=x^3-3x$ on $[-2,\\,${b}]$.`),
                lines: [line(LABELS.derive, "f'(x)=3x^2-3=0\\ \\to\\ x=\\pm 1"), line(LABELS.values, 'f(-1)=2\\qquad f(1)=-2'), line(LABELS.result, '\\max=2')],
                wrong: 2, error, fix: `f(${b})=${fb}\\ \\to\\ \\max=${fb}`, right: fb, reached: 2
            }
        }
        case 'mean-height': {
            const b = pick(random, [1, 9, 16])
            const root = Math.sqrt(b)
            return {
                problem: say(`Aurkitu batez besteko balioaren $c$, $f(x)=x^2$ funtziorako $[0,\\,${b}]$ tartean.`, `Halla el $c$ del valor medio de $f(x)=x^2$ en $[0,\\,${b}]$.`, `أوجد $c$ في مبرهنة القيمة المتوسطة للدالة $f(x)=x^2$ على $[0,\\,${b}]$.`, `Find the mean value $c$ of $f(x)=x^2$ on $[0,\\,${b}]$.`),
                lines: [line(LABELS.slope, `m=\\frac{${b * b}-0}{${b}-0}=${b}`), line(LABELS.step, `f(c)=${b}\\ \\to\\ c^2=${b}`), line(LABELS.result, `c=${root}`)],
                wrong: 1, error, fix: `f'(c)=2c=${b}\\ \\to\\ c=${frac(b, 2)}`, right: b / 2, reached: root
            }
        }
        case 'no-indeterminate': {
            const p = randomInt(random, 2, 5)
            const q = randomInt(random, 2, 6)
            if (p === q) return null
            return {
                problem: say(`Kalkulatu $\\lim_{x\\to 0}\\frac{x+${p}}{x+${q}}$.`, `Calcula $\\lim_{x\\to 0}\\frac{x+${p}}{x+${q}}$.`, `احسب $\\lim_{x\\to 0}\\frac{x+${p}}{x+${q}}$.`, `Work out $\\lim_{x\\to 0}\\frac{x+${p}}{x+${q}}$.`),
                lines: [line(LABELS.derive, "f'(x)=1\\qquad g'(x)=1"), line(LABELS.step, '\\lim_{x\\to 0}\\frac{1}{1}'), line(LABELS.result, '=1')],
                wrong: 0, error, fix: `\\frac{0+${p}}{0+${q}}=${frac(p, q)}`, right: p / q, reached: 1
            }
        }
        case 'quotient-rule': {
            const a = randomInt(random, 2, 4)
            return {
                problem: say(`Kalkulatu $\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}$ L'Hôpitalekin.`, `Calcula $\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}$ con L'Hôpital.`, `احسب $\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}$ بقاعدة لوبيتال.`, `Work out $\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}$ with L'Hôpital.`),
                lines: [line(LABELS.form, '\\frac{0}{0}'), line(LABELS.derive, `\\left(\\frac{f}{g}\\right)'=\\frac{2x(x-${a})-(x^2-${a * a})}{(x-${a})^2}=1`), line(LABELS.result, '\\lim=1')],
                wrong: 1, error, fix: `\\lim_{x\\to ${a}}\\frac{2x}{1}=${2 * a}`, right: 2 * a, reached: 1
            }
        }
        case 'zero-infinity': {
            const k = pick(random, [2, 3, 5])
            return {
                problem: say(`Kalkulatu $\\lim_{x\\to+\\infty}x\\left(e^{${k}/x}-1\\right)$.`, `Calcula $\\lim_{x\\to+\\infty}x\\left(e^{${k}/x}-1\\right)$.`, `احسب $\\lim_{x\\to+\\infty}x\\left(e^{${k}/x}-1\\right)$.`, `Work out $\\lim_{x\\to+\\infty}x\\left(e^{${k}/x}-1\\right)$.`),
                lines: [line(LABELS.form, '\\infty\\cdot 0'), line(LABELS.step, '\\infty\\cdot 0=0'), line(LABELS.result, '\\lim=0')],
                wrong: 1, error, fix: `t=\\frac{1}{x}\\ \\to\\ \\lim_{t\\to 0}\\frac{e^{${k}t}-1}{t}=${k}`, right: k, reached: 0
            }
        }
        case 'log-limit': {
            const k = randomInt(random, 2, 5)
            return {
                problem: say(`Kalkulatu $\\lim_{x\\to 0}(1+${k}x)^{1/x}$.`, `Calcula $\\lim_{x\\to 0}(1+${k}x)^{1/x}$.`, `احسب $\\lim_{x\\to 0}(1+${k}x)^{1/x}$.`, `Work out $\\lim_{x\\to 0}(1+${k}x)^{1/x}$.`),
                lines: [line(LABELS.step, `\\ln L=\\lim_{x\\to 0}\\frac{\\ln(1+${k}x)}{x}`), line(LABELS.step, `\\ln L=\\lim_{x\\to 0}\\frac{${k}}{1+${k}x}=${k}`), line(LABELS.result, `L=${k}`)],
                wrong: 2, error, fix: `L=e^{${k}}`, right: Math.exp(k), reached: k
            }
        }
        case 'extremum-zero': {
            const k = pick(random, [-2, 2, 3, 4])
            return {
                problem: say(`$f(x)=x^2+bx+c$ funtzioak minimo bat du $(1,\\,${k})$ puntuan. Aurkitu $c$.`, `$f(x)=x^2+bx+c$ tiene un mínimo en $(1,\\,${k})$. Halla $c$.`, `للدالة $f(x)=x^2+bx+c$ قيمة صغرى عند $(1,\\,${k})$. أوجد $c$.`, `$f(x)=x^2+bx+c$ has a minimum at $(1,\\,${k})$. Find $c$.`),
                lines: [line(LABELS.derive, "f'(1)=2+b=0\\ \\to\\ b=-2"), line(LABELS.step, 'f(1)=1-2+c=0'), line(LABELS.result, 'c=1')],
                wrong: 1, error, fix: `f(1)=1-2+c=${k}\\ \\to\\ c=${k + 1}`, right: k + 1, reached: 1
            }
        }
        case 'inflection-slope': {
            const k = randomInt(random, 1, 3)
            return {
                problem: say(`$f(x)=x^3+ax^2$ funtzioak inflexio bat du $x=${k}$ puntuan. Aurkitu $a$.`, `$f(x)=x^3+ax^2$ tiene una inflexión en $x=${k}$. Halla $a$.`, `للدالة $f(x)=x^3+ax^2$ نقطة انعطاف عند $x=${k}$. أوجد $a$.`, `$f(x)=x^3+ax^2$ has an inflection at $x=${k}$. Find $a$.`),
                lines: [line(LABELS.derive, "f'(x)=3x^2+2ax"), line(LABELS.step, `f'(${k})=${3 * k * k}+${2 * k}a=0`), line(LABELS.result, `a=${frac(-3 * k, 2)}`)],
                wrong: 1, error, fix: `f''(${k})=${6 * k}+2a=0\\ \\to\\ a=${-3 * k}`, right: -3 * k, reached: (-3 * k) / 2
            }
        }
        case 'optimum-x': {
            const s = pick(random, [8, 10, 12, 14])
            return {
                problem: say(`Bi zenbaki positiboren batura ${s} da. Zein da haien biderkaduraren balio handiena?`, `Dos números positivos suman ${s}. ¿Cuál es el mayor valor de su producto?`, `مجموع عددين موجبين ${s}. ما أكبر قيمة لجدائهما؟`, `Two positive numbers add up to ${s}. What is the largest value of their product?`),
                lines: [line(LABELS.step, `P(x)=x(${s}-x)`), line(LABELS.derive, `P'(x)=${s}-2x=0\\ \\to\\ x=${s / 2}`), line(LABELS.result, `P_{\\max}=${s / 2}`)],
                wrong: 2, error, fix: `P_{\\max}=P(${s / 2})=${(s * s) / 4}`, right: (s * s) / 4, reached: s / 2
            }
        }
        case 'distance-root': {
            const k = randomInt(random, 2, 4)
            return {
                problem: say(`Zein da $(0,\\,${k})$ puntutik $y=x^2$ parabolarainoko distantzia minimoa?`, `¿Cuál es la distancia mínima de $(0,\\,${k})$ a la parábola $y=x^2$?`, `ما المسافة الصغرى من $(0,\\,${k})$ إلى القطع المكافئ $y=x^2$؟`, `What is the minimum distance from $(0,\\,${k})$ to the parabola $y=x^2$?`),
                lines: [line(LABELS.step, `D(x)=x^2+(x^2-${k})^2`), line(LABELS.derive, `D'(x)=0\\ \\to\\ x^2=${frac(2 * k - 1, 2)}`), line(LABELS.result, `d_{\\min}=${frac(4 * k - 1, 4)}`)],
                wrong: 2, error, fix: `d_{\\min}=\\sqrt{${frac(4 * k - 1, 4)}}=\\frac{\\sqrt{${4 * k - 1}}}{2}`, right: Math.sqrt((4 * k - 1) / 4), reached: (4 * k - 1) / 4
            }
        }
    }
}

export const bach2ApplicationsDetectiveNames: Record<Bach2ApplicationsDetectiveError, LocalizedText> = {
    'extremum-sign': say('$f\'=0$ hartu du muturtzat', 'Tomar $f\'=0$ como extremo', 'اعتبار $f\'=0$ قيمة قصوى', 'Taking $f\'=0$ as an extremum'),
    'inflection-sign': say('$f\'\'=0$ hartu du inflexiotzat', 'Tomar $f\'\'=0$ como inflexión', 'اعتبار $f\'\'=0$ انعطافًا', 'Taking $f\'\'=0$ as an inflection'),
    'interval-ends': say('Tartearen muturrak ahaztu ditu', 'Olvidar los bordes del intervalo', 'نسيان طرفي الفترة', 'Forgetting the ends of the interval'),
    'mean-height': say('$f(c)$ berdindu du, ez $f\'(c)$', 'Igualar $f(c)$ y no $f\'(c)$', 'مساواة $f(c)$ بدل $f\'(c)$', 'Setting $f(c)$, not $f\'(c)$'),
    'no-indeterminate': say('L\'Hôpital indeterminaziorik gabe', 'L\'Hôpital sin indeterminación', 'لوبيتال دون عدم تعيين', 'L\'Hôpital with no indeterminate form'),
    'quotient-rule': say('Zatiduraren erregela erabili du', 'Usar la regla del cociente', 'استعمال قاعدة خارج القسمة', 'Using the quotient rule'),
    'zero-infinity': say('$\\infty\\cdot 0=0$ egin du', 'Hacer $\\infty\\cdot 0=0$', 'اعتبار $\\infty\\cdot 0=0$', 'Taking $\\infty\\cdot 0=0$'),
    'log-limit': say('$\\ln L$ eman du limitetzat', 'Dar $\\ln L$ como límite', 'إعطاء $\\ln L$ على أنها النهاية', 'Giving $\\ln L$ as the limit'),
    'extremum-zero': say('Muturra $f=0$ dela pentsatu du', 'Creer que en el extremo $f=0$', 'الظن أن $f=0$ عند القيمة القصوى', 'Thinking that $f=0$ at the extremum'),
    'inflection-slope': say('Inflexioan $f\'=0$ jarri du', 'Poner $f\'=0$ en la inflexión', 'وضع $f\'=0$ عند الانعطاف', 'Setting $f\'=0$ at the inflection'),
    'optimum-x': say('$x$ eman du optimotzat', 'Dar la $x$ como el óptimo', 'إعطاء $x$ على أنها القيمة المثلى', 'Giving $x$ as the optimum'),
    'distance-root': say('Erroa atera gabe utzi du', 'No sacar la raíz', 'عدم أخذ الجذر', 'Not taking the root')
}

export const bach2ApplicationsDetectiveTips: Record<Bach2ApplicationsDetectiveError, LocalizedText> = {
    'extremum-sign': say('Muturra egoteko $f\'$ deribatuak zeinua aldatu behar du.', 'Para que haya extremo, $f\'$ tiene que cambiar de signo.', 'لتوجد قيمة قصوى يجب أن تغيّر $f\'$ إشارتها.', 'For an extremum, $f\'$ has to change sign.'),
    'inflection-sign': say('Inflexioa egoteko $f\'\'$ deribatuak zeinua aldatu behar du.', 'Para que haya inflexión, $f\'\'$ tiene que cambiar de signo.', 'ليوجد انعطاف يجب أن تغيّر $f\'\'$ إشارتها.', 'For an inflection, $f\'\'$ has to change sign.'),
    'interval-ends': say('Tarte itxi batean, kalkulatu $f$ muturretan ere.', 'En un intervalo cerrado, calcula $f$ también en los bordes.', 'على فترة مغلقة، احسب $f$ عند الطرفين أيضًا.', 'On a closed interval, work out $f$ at the ends too.'),
    'mean-height': same('$f\'(c)=\\frac{f(b)-f(a)}{b-a}$'),
    'no-indeterminate': say('Ordezkatu lehenik: $\\frac{0}{0}$ ez bada, ez erabili L\'Hôpital.', 'Sustituye primero: si no es $\\frac{0}{0}$, no uses L\'Hôpital.', 'عوّض أولًا: إذا لم تكن $\\frac{0}{0}$ فلا تستعمل لوبيتال.', 'Substitute first: if it is not $\\frac{0}{0}$, do not use L\'Hôpital.'),
    'quotient-rule': say('L\'Hôpitalen, goikoa eta behekoa bakoitza bere aldetik deribatzen dira: $\\frac{f\'}{g\'}$.', 'En L\'Hôpital se deriva arriba y abajo por separado: $\\frac{f\'}{g\'}$.', 'في لوبيتال نشتق البسط والمقام كلًّا على حدة: $\\frac{f\'}{g\'}$.', 'In L\'Hôpital, the top and the bottom are differentiated separately: $\\frac{f\'}{g\'}$.'),
    'zero-infinity': say('$\\infty\\cdot 0$ indeterminazioa da: idatzi zatidura gisa.', '$\\infty\\cdot 0$ es una indeterminación: escríbelo como cociente.', '$\\infty\\cdot 0$ حالة عدم تعيين: اكتبها على صورة خارج قسمة.', '$\\infty\\cdot 0$ is an indeterminate form: write it as a quotient.'),
    'log-limit': say('Desegin logaritmoa: $L=e^{\\ln L}$.', 'Deshaz el logaritmo: $L=e^{\\ln L}$.', 'تخلّص من اللوغاريتم: $L=e^{\\ln L}$.', 'Undo the logarithm: $L=e^{\\ln L}$.'),
    'extremum-zero': say('Muturraren altuera puntuaren $y$ da, ez 0.', 'La altura del extremo es la $y$ del punto, no 0.', 'ارتفاع القيمة القصوى هو $y$ النقطة، لا 0.', 'The height of the extremum is the $y$ of the point, not 0.'),
    'inflection-slope': say('Inflexioan zero dena $f\'\'$ da.', 'En la inflexión, lo que se anula es $f\'\'$.', 'عند الانعطاف الذي ينعدم هو $f\'\'$.', 'At an inflection, what is 0 is $f\'\'$.'),
    'optimum-x': say('$x$ puntua aurkitu ondoren, kalkulatu funtzioaren balioa bertan.', 'Después de hallar $x$, calcula el valor de la función allí.', 'بعد إيجاد $x$ احسب قيمة الدالة عندها.', 'After finding $x$, work out the value of the function there.'),
    'distance-root': say('$D=d^2$ minimizatu da: amaieran, $d=\\sqrt{D}$.', 'Se ha minimizado $D=d^2$: al final, $d=\\sqrt{D}$.', 'صغّرنا $D=d^2$: وفي النهاية $d=\\sqrt{D}$.', 'We minimised $D=d^2$: at the end, $d=\\sqrt{D}$.')
}

function same(text: string): LocalizedText {
    return say(text, text, text, text)
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBach2ApplicationsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bach2ApplicationsDetectiveLevels[levelIndex], BACH2_APPLICATIONS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH2_APPLICATIONS_DETECTIVE_ERRORS = bach2ApplicationsDetectiveLevels.flat()
