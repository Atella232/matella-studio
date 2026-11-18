import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../text.ts'

/* ==========================================================================
   Deribatuen detektibea (Detective, 1.º Sociales · derivadas): a worked
   solution of three lines with one wrong line, the mistakes of this unit.
   Level 1 (rate and tangent): the average rate divided by b, the point
   forgotten in the tangent, the normal with slope f′(a), f′(a) read off
   as f(a); level 2 (rules): (xⁿ)′ = n·xⁿ, the product of the derivatives,
   the order of the quotient rule, the inside of the chain forgotten;
   level 3 (applications): growth read from the sign of f, f′ = 0 taken
   as an extreme, the border of an interval forgotten, B(x) = 0 instead
   of B′(x) = 0. `right` and `reached` only tell the cases apart.
   ========================================================================== */

export type SocDerivDetectiveError =
    | 'rate-length'
    | 'tangent-point'
    | 'normal-slope'
    | 'value-slope'
    | 'power-exponent'
    | 'product-derivatives'
    | 'quotient-order'
    | 'chain-inside'
    | 'sign-of-f'
    | 'flat-extreme'
    | 'border-forgot'
    | 'profit-zero'

export const socDerivDetectiveLevels: SocDerivDetectiveError[][] = [
    ['rate-length', 'tangent-point', 'normal-slope', 'value-slope'],
    ['power-exponent', 'product-derivatives', 'quotient-order', 'chain-inside'],
    ['sign-of-f', 'flat-extreme', 'border-forgot', 'profit-zero']
]

export const SOC_DERIV_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const socDerivDetectiveNames: Record<SocDerivDetectiveError, LocalizedText> = {
    'rate-length': say('$b$ balioaz zatitu du, $b-a$ luzeraz beharrean', 'Dividió entre $b$ en vez de entre $b-a$', 'قسم على $b$ بدل $b-a$', 'Divided by $b$ instead of $b-a$'),
    'tangent-point': say('Ukitzailean puntua ahaztu du', 'Olvidó el punto en la tangente', 'نسي النقطة في المماس', 'Forgot the point in the tangent'),
    'normal-slope': say('Normalari $f\'(a)$ malda eman dio', 'Dio a la normal la pendiente $f\'(a)$', 'أعطى العمودي الميل $f\'(a)$', 'Gave the normal the slope $f\'(a)$'),
    'value-slope': say('$f(a)$ hartu du malda gisa', 'Tomó $f(a)$ como pendiente', 'أخذ $f(a)$ ميلًا', 'Took $f(a)$ as the slope'),
    'power-exponent': say('Berretzaileari ez dio bat kendu', 'No restó uno al exponente', 'لم يطرح واحدًا من الأس', 'Did not take one off the exponent'),
    'product-derivatives': say('Deribatuak biderkatu ditu', 'Multiplicó las derivadas', 'ضرب المشتقات', 'Multiplied the derivatives'),
    'quotient-order': say('Zatiduraren erregelan ordena aldatu du', 'Cambió el orden en la regla del cociente', 'غيّر الترتيب في قاعدة خارج القسمة', 'Swapped the order in the quotient rule'),
    'chain-inside': say('Barrukoaren deribatua ahaztu du', 'Olvidó la derivada de dentro', 'نسي مشتقة الداخل', 'Forgot the derivative of the inside'),
    'sign-of-f': say('$f$ funtzioaren zeinua begiratu du, ez $f\'$ deribatuarena', 'Miró el signo de $f$, no el de $f\'$', 'نظر إلى إشارة $f$ لا $f\'$', 'Looked at the sign of $f$, not of $f\'$'),
    'flat-extreme': say('$f\'=0$ beti muturra dela uste izan du', 'Creyó que $f\'=0$ siempre es extremo', 'ظن أن $f\'=0$ قيمة قصوى دائمًا', 'Thought $f\'=0$ is always an extreme'),
    'border-forgot': say('Tartearen ertza ahaztu du', 'Olvidó el borde del intervalo', 'نسي طرف المجال', 'Forgot the border of the interval'),
    'profit-zero': say('$B(x)=0$ ebatzi du, $B\'(x)=0$ beharrean', 'Resolvió $B(x)=0$ en vez de $B\'(x)=0$', 'حل $B(x)=0$ بدل $B\'(x)=0$', 'Solved $B(x)=0$ instead of $B\'(x)=0$')
}

export const socDerivDetectiveTips: Record<SocDerivDetectiveError, LocalizedText> = {
    'rate-length': say('T.V.M.: zatitu tartearen luzeraz, $b-a$.', 'T.V.M.: divide entre la longitud del intervalo, $b-a$.', 'معدل التغير المتوسط: اقسم على طول المجال $b-a$.', 'Average rate: divide by the length of the interval, $b-a$.'),
    'tangent-point': same('$y-f(a)=f\'(a)(x-a)$'),
    'normal-slope': say('Normalaren malda $-\\frac{1}{f\'(a)}$ da.', 'La pendiente de la normal es $-\\frac{1}{f\'(a)}$.', 'ميل العمودي $-\\frac{1}{f\'(a)}$.', 'The slope of the normal is $-\\frac{1}{f\'(a)}$.'),
    'value-slope': say('Malda deribatua da, $f\'(a)$; $f(a)$ altuera da.', 'La pendiente es la derivada, $f\'(a)$; $f(a)$ es la altura.', 'الميل هو المشتقة $f\'(a)$؛ و$f(a)$ هو الارتفاع.', 'The slope is the derivative, $f\'(a)$; $f(a)$ is the height.'),
    'power-exponent': same('$(x^n)\'=n\\cdot x^{n-1}$'),
    'product-derivatives': same('$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$'),
    'quotient-order': say('Goian, goikoaren deribatua lehenik: $f\'\\cdot g-f\\cdot g\'$.', 'Arriba, primero la derivada del numerador: $f\'\\cdot g-f\\cdot g\'$.', 'في البسط مشتقة البسط أولًا: $f\'\\cdot g-f\\cdot g\'$.', 'On top, the derivative of the numerator first: $f\'\\cdot g-f\\cdot g\'$.'),
    'chain-inside': same('$(e^{u})\'=e^{u}\\cdot u\'$'),
    'sign-of-f': say('Hazkundea $f\'$ deribatuaren zeinuak ematen du.', 'El crecimiento lo da el signo de $f\'$.', 'يحدد التزايدَ إشارةُ $f\'$.', 'Growth is given by the sign of $f\'$.'),
    'flat-extreme': say('Begiratu $f\'$ deribatuak zeinua aldatzen duen.', 'Mira si $f\'$ cambia de signo.', 'انظر هل تتغير إشارة $f\'$.', 'Check whether $f\'$ changes sign.'),
    'border-forgot': say('Ertzak ere hautagaiak dira.', 'Los bordes también son candidatos.', 'الطرفان مرشحان أيضًا.', 'The borders are candidates too.'),
    'profit-zero': say('$B(x)=0$ dela, ez dago ez irabazirik ez galerarik; maximoa $B\'(x)=0$ den lekuan dago.', '$B(x)=0$ es no ganar ni perder; el máximo está donde $B\'(x)=0$.', '$B(x)=0$ يعني لا ربح ولا خسارة؛ والقيمة العظمى حيث $B\'(x)=0$.', '$B(x)=0$ is breaking even; the maximum is where $B\'(x)=0$.')
}

function same(value: string): LocalizedText {
    return say(value, value, value, value)
}

type Built = Omit<WorkedCase<SocDerivDetectiveError>, 'options'>

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

function build(random: Random, error: SocDerivDetectiveError): Built | null {
    switch (error) {
        case 'rate-length': {
            const p = randomInt(random, 1, 3)
            const q = p + randomInt(random, 2, 4)
            const change = q * q - p * p
            return {
                problem: say(`Aurkitu $f(x)=x^2$ funtzioaren T.V.M. $[${p},${q}]$ tartean.`, `Halla la T.V.M. de $f(x)=x^2$ en $[${p},${q}]$.`, `أوجد معدل التغير المتوسط لـ $f(x)=x^2$ في $[${p},${q}]$.`, `Find the average rate of $f(x)=x^2$ on $[${p},${q}]$.`),
                lines: [line(LABELS.step, `f(${q})-f(${p})=${change}`), line(LABELS.step, `\\frac{${change}}{${q}}`), line(LABELS.result, `${Math.round((change / q) * 100) / 100}`.replace('.', '{,}'))],
                wrong: 1, error, fix: `\\frac{${change}}{${q - p}}=${change / (q - p)}`, right: change / (q - p), reached: change / q
            }
        }
        case 'tangent-point': {
            const a = randomInt(random, 1, 4)
            const m = 2 * a
            const fa = a * a + 1
            return {
                problem: say(`Aurkitu $f(x)=x^2+1$ funtzioaren ukitzailea $x=${a}$ puntuan.`, `Halla la tangente a $f(x)=x^2+1$ en $x=${a}$.`, `أوجد المماس لـ $f(x)=x^2+1$ عند $x=${a}$.`, `Find the tangent to $f(x)=x^2+1$ at $x=${a}$.`),
                lines: [line(LABELS.step, `f'(${a})=${m}`), line(LABELS.step, `y=${m}(x-${a})`), line(LABELS.result, `y=${m}x-${m * a}`)],
                wrong: 1, error, fix: `y-${fa}=${m}(x-${a})\\ \\to\\ y=${m}x${signed(fa - m * a)}`, right: fa - m * a, reached: -m * a
            }
        }
        case 'normal-slope': {
            const a = randomInt(random, 1, 3)
            const m = 2 * a
            return {
                problem: say(`Zein da $f(x)=x^2$ funtzioaren normalaren malda $x=${a}$ puntuan?`, `¿Cuál es la pendiente de la normal a $f(x)=x^2$ en $x=${a}$?`, `ما ميل العمودي على $f(x)=x^2$ عند $x=${a}$؟`, `What is the slope of the normal to $f(x)=x^2$ at $x=${a}$?`),
                lines: [line(LABELS.step, `f'(x)=2x`), line(LABELS.step, `f'(${a})=${m}`), line(LABELS.result, `m=${m}`)],
                wrong: 2, error, fix: `m=-\\frac{1}{${m}}`, right: -1 / m, reached: m
            }
        }
        case 'value-slope': {
            const a = randomInt(random, 2, 4)
            const k = randomInt(random, 1, 5)
            return {
                problem: say(`Zein da $f(x)=x^2+${k}$ funtzioaren ukitzailearen malda $x=${a}$ puntuan?`, `¿Cuál es la pendiente de la tangente a $f(x)=x^2+${k}$ en $x=${a}$?`, `ما ميل المماس لـ $f(x)=x^2+${k}$ عند $x=${a}$؟`, `What is the slope of the tangent to $f(x)=x^2+${k}$ at $x=${a}$?`),
                lines: [line(LABELS.step, `f(${a})=${a * a + k}`), line(LABELS.step, `m=f(${a})`), line(LABELS.result, `m=${a * a + k}`)],
                wrong: 1, error, fix: `m=f'(${a})=2\\cdot ${a}=${2 * a}`, right: 2 * a, reached: a * a + k
            }
        }
        case 'power-exponent': {
            const n = randomInt(random, 3, 5)
            const k = randomInt(random, 1, 3)
            return {
                problem: say(`Kalkulatu $f'(2)$, $f(x)=${k}x^${n}$ bada.`, `Calcula $f'(2)$ si $f(x)=${k}x^${n}$.`, `احسب $f'(2)$ إذا كانت $f(x)=${k}x^${n}$.`, `Work out $f'(2)$ if $f(x)=${k}x^${n}$.`),
                lines: [line(LABELS.step, `f'(x)=${k * n}x^${n}`), line(LABELS.step, `f'(2)=${k * n}\\cdot 2^${n}`), line(LABELS.result, `${k * n * 2 ** n}`)],
                wrong: 0, error, fix: `f'(x)=${k * n}x^${n - 1}\\ \\to\\ f'(2)=${k * n * 2 ** (n - 1)}`, right: k * n * 2 ** (n - 1), reached: k * n * 2 ** n
            }
        }
        case 'product-derivatives': {
            const a = randomInt(random, 1, 5)
            const x = randomInt(random, 1, 3)
            // (x² + a)(x + 1): the slip multiplies 2x by 1
            const right = 2 * x * (x + 1) + (x * x + a)
            return {
                problem: say(`Kalkulatu $f'(${x})$, $f(x)=(x^2+${a})(x+1)$ bada.`, `Calcula $f'(${x})$ si $f(x)=(x^2+${a})(x+1)$.`, `احسب $f'(${x})$ إذا كانت $f(x)=(x^2+${a})(x+1)$.`, `Work out $f'(${x})$ if $f(x)=(x^2+${a})(x+1)$.`),
                lines: [line(LABELS.step, `f'(x)=2x\\cdot 1`), line(LABELS.step, `f'(${x})=2\\cdot ${x}`), line(LABELS.result, `${2 * x}`)],
                wrong: 0, error, fix: `f'(x)=2x(x+1)+(x^2+${a})\\ \\to\\ ${right}`, right, reached: 2 * x
            }
        }
        case 'quotient-order': {
            const a = randomInt(random, 1, 5)
            // f = x/(x + a): f′ = a/(x + a)²; the slip writes (x − (x + a))/(x + a)² = −a/(x + a)²
            return {
                problem: say(`Deribatu $f(x)=\\frac{x}{x+${a}}$, eta kalkulatu $f'(0)$.`, `Deriva $f(x)=\\frac{x}{x+${a}}$ y calcula $f'(0)$.`, `اشتق $f(x)=\\frac{x}{x+${a}}$ واحسب $f'(0)$.`, `Differentiate $f(x)=\\frac{x}{x+${a}}$ and work out $f'(0)$.`),
                lines: [line(LABELS.step, `f'(x)=\\frac{x\\cdot 1-1\\cdot(x+${a})}{(x+${a})^2}`), line(LABELS.step, `f'(x)=\\frac{-${a}}{(x+${a})^2}`), line(LABELS.result, `f'(0)=-\\frac{1}{${a}}`)],
                wrong: 0, error, fix: `\\frac{1\\cdot(x+${a})-x\\cdot 1}{(x+${a})^2}=\\frac{${a}}{(x+${a})^2}`, right: 1 / a, reached: -1 / a
            }
        }
        case 'chain-inside': {
            const k = randomInt(random, 2, 6)
            return {
                problem: say(`Kalkulatu $f'(0)$, $f(x)=e^{${k}x}$ bada.`, `Calcula $f'(0)$ si $f(x)=e^{${k}x}$.`, `احسب $f'(0)$ إذا كانت $f(x)=e^{${k}x}$.`, `Work out $f'(0)$ if $f(x)=e^{${k}x}$.`),
                lines: [line(LABELS.step, `f'(x)=e^{${k}x}`), line(LABELS.step, `f'(0)=e^{0}`), line(LABELS.result, '1')],
                wrong: 0, error, fix: `f'(x)=${k}e^{${k}x}\\ \\to\\ f'(0)=${k}`, right: k, reached: 1
            }
        }
        case 'sign-of-f': {
            const a = randomInt(random, 2, 5)
            // f(x) = x² − a² at x = −1: f < 0 but f′ = −2 < 0 decreasing; try x = 1: f < 0, f′ = 2 > 0 increasing
            return {
                problem: say(`Gorakorra ala beherakorra da $f(x)=x^2-${a * a}$ funtzioa $x=1$ puntuan?`, `¿Crece o decrece $f(x)=x^2-${a * a}$ en $x=1$?`, `هل تتزايد $f(x)=x^2-${a * a}$ أم تتناقص عند $x=1$؟`, `Does $f(x)=x^2-${a * a}$ rise or fall at $x=1$?`),
                lines: [line(LABELS.step, `f(1)=${1 - a * a}`), line(LABELS.step, `f(1)<0\\ \\to\\ \\searrow`), line(LABELS.result, '\\searrow')],
                wrong: 1, error, fix: `f'(1)=2>0\\ \\to\\ \\nearrow`, right: 1, reached: -1
            }
        }
        case 'flat-extreme': {
            const h = randomInt(random, 1, 4)
            const k = randomInt(random, 1, 6)
            return {
                problem: say(`Ba al du muturrik $f(x)=(x-${h})^3+${k}$ funtzioak?`, `¿Tiene extremos $f(x)=(x-${h})^3+${k}$?`, `هل لـ $f(x)=(x-${h})^3+${k}$ قيم قصوى؟`, `Does $f(x)=(x-${h})^3+${k}$ have extremes?`),
                lines: [line(LABELS.step, `f'(x)=3(x-${h})^2=0\\ \\to\\ x=${h}`), line(LABELS.step, `f'(${h})=0\\ \\to\\ \\min`), line(LABELS.result, `(${h},${k})`)],
                wrong: 1, error, fix: `f'(x)\\ge 0\\ \\to\\ \\nearrow`, right: 0, reached: 1
            }
        }
        case 'border-forgot': {
            const b = randomInt(random, 4, 7)
            // f = x² − 2x on [0, b]: the minimum is at 1, the maximum at the border b
            const value = b * b - 2 * b
            return {
                problem: say(`Aurkitu $f(x)=x^2-2x$ funtzioaren maximoa $[0,${b}]$ tartean.`, `Halla el máximo de $f(x)=x^2-2x$ en $[0,${b}]$.`, `أوجد القيمة العظمى لـ $f(x)=x^2-2x$ في $[0,${b}]$.`, `Find the maximum of $f(x)=x^2-2x$ on $[0,${b}]$.`),
                lines: [line(LABELS.step, `f'(x)=2x-2=0\\ \\to\\ x=1`), line(LABELS.step, `f(1)=-1`), line(LABELS.result, `\\max=-1`)],
                wrong: 2, error, fix: `f(0)=0\\qquad f(${b})=${value}\\ \\to\\ \\max=${value}`, right: value, reached: -1
            }
        }
        case 'profit-zero': {
            const r = pick(random, [10, 20, 30])
            const s = r + pick(random, [10, 20, 30])
            // B(x) = −(x − r)(x − s) = −x² + (r + s)x − rs: the slip takes the root r
            const best = (r + s) / 2
            return {
                problem: say(`$B(x)=-x^2+${r + s}x-${r * s}$ bada, zenbat unitatek ematen dute mozkin maximoa?`, `Si $B(x)=-x^2+${r + s}x-${r * s}$, ¿cuántas unidades dan el beneficio máximo?`, `إذا كان $B(x)=-x^2+${r + s}x-${r * s}$ فكم وحدة تعطي الربح الأعظم؟`, `If $B(x)=-x^2+${r + s}x-${r * s}$, how many units give the greatest profit?`),
                lines: [line(LABELS.step, `B(x)=0`), line(LABELS.step, `x=${r},\\ x=${s}`), line(LABELS.result, `x=${r}`)],
                wrong: 0, error, fix: `B'(x)=-2x+${r + s}=0\\ \\to\\ x=${best}`, right: best, reached: r
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createSocDerivDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, socDerivDetectiveLevels[levelIndex], SOC_DERIV_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}
