import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../text.ts'

/* ==========================================================================
   Limiteen detektibea (Detective, 1.º Sociales · límites): a worked
   solution of three lines with one wrong line, the mistakes of this unit.
   Level 1 (at infinity): ∞/∞ read as 1, the top coefficient alone, (−x)²
   taken as negative, √(a²x²) read as a²x; level 2 (at a point): 0/0 read
   as «no limit», the limit taken as f(a), k/0 = 0, a wrong factorisation;
   level 3 (continuity and asymptotes): the parameter worked out with the
   wrong piece, an asymptote where there is a hole, an oblique asymptote
   with two degrees more, the average cost tending to the fixed cost.
   `right` and `reached` only tell the cases apart (±∞ is ±1000, «no
   limit» is −999).
   ========================================================================== */

export type SocLimitsDetectiveError =
    | 'infinity-one'
    | 'top-only'
    | 'minus-square'
    | 'root-coefficient'
    | 'zero-zero-none'
    | 'limit-value'
    | 'k-over-zero'
    | 'factor-sign'
    | 'wrong-piece'
    | 'hole-asymptote'
    | 'oblique-degree'
    | 'fixed-cost'

export const socLimitsDetectiveLevels: SocLimitsDetectiveError[][] = [
    ['infinity-one', 'top-only', 'minus-square', 'root-coefficient'],
    ['zero-zero-none', 'limit-value', 'k-over-zero', 'factor-sign'],
    ['wrong-piece', 'hole-asymptote', 'oblique-degree', 'fixed-cost']
]

export const SOC_LIMITS_DETECTIVE_CASES = 6

const INFINITY = 1000
const NONE = -999

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const lead = (a: number, n: number) => `${a === 1 ? '' : a}x${n === 1 ? '' : `^${n}`}`

export const socLimitsDetectiveNames: Record<SocLimitsDetectiveError, LocalizedText> = {
    'infinity-one': say('$\\frac{\\infty}{\\infty}=1$ egin du', 'Hizo $\\frac{\\infty}{\\infty}=1$', 'جعل $\\frac{\\infty}{\\infty}=1$', 'Made $\\frac{\\infty}{\\infty}=1$'),
    'top-only': say('Goiko koefizientea bakarrik hartu du', 'Tomó solo el coeficiente de arriba', 'أخذ معامل البسط وحده', 'Took only the top coefficient'),
    'minus-square': say('Negatibo baten karratua negatiboa dela uste izan du', 'Creyó que un negativo al cuadrado es negativo', 'ظن أن مربع السالب سالب', 'Thought a negative squared is negative'),
    'root-coefficient': say('Erroa zenbakiari aplikatzea ahaztu du', 'Olvidó aplicar la raíz al número', 'نسي تطبيق الجذر على العدد', 'Forgot to take the root of the number'),
    'zero-zero-none': say('$\\frac{0}{0}$ «ez dago» gisa irakurri du', 'Leyó $\\frac{0}{0}$ como «no existe»', 'قرأ $\\frac{0}{0}$ على أنها «غير موجودة»', 'Read $\\frac{0}{0}$ as «does not exist»'),
    'limit-value': say('Limitea $f(a)$ dela uste izan du', 'Tomó el límite por $f(a)$', 'ظن أن النهاية هي $f(a)$', 'Took the limit to be $f(a)$'),
    'k-over-zero': say('$\\frac{k}{0}=0$ egin du', 'Hizo $\\frac{k}{0}=0$', 'جعل $\\frac{k}{0}=0$', 'Made $\\frac{k}{0}=0$'),
    'factor-sign': say('Zeinuak gaizki jarri ditu faktorizatzean', 'Puso mal los signos al factorizar', 'أخطأ في الإشارات عند التحليل', 'Got the signs wrong when factorising'),
    'wrong-piece': say('Lotura-puntuan zati okerra erabili du', 'Usó el trozo equivocado en el punto de unión', 'استعمل الجزء الخطأ عند نقطة الوصل', 'Used the wrong piece at the joining point'),
    'hole-asymptote': say('Zulo bat asintota bertikaltzat hartu du', 'Tomó un agujero por una asíntota vertical', 'ظن الثقب مقاربًا رأسيًّا', 'Took a hole for a vertical asymptote'),
    'oblique-degree': say('Bi maila gehiagorekin asintota zeiharra jarri du', 'Puso asíntota oblicua con dos grados más', 'وضع مقاربًا مائلًا مع درجتين زائدتين', 'Gave an oblique asymptote with two degrees more'),
    'fixed-cost': say('Batez besteko kostua gastu finkora doala esan du', 'Dijo que el coste medio tiende al gasto fijo', 'قال إن التكلفة المتوسطة تتجه إلى التكلفة الثابتة', 'Said the average cost tends to the fixed cost')
}

export const socLimitsDetectiveTips: Record<SocLimitsDetectiveError, LocalizedText> = {
    'infinity-one': say('$\\frac{\\infty}{\\infty}$ indeterminazioa da: maila bera bada, koefiziente nagusien zatidura.', '$\\frac{\\infty}{\\infty}$ es una indeterminación: con el mismo grado, el cociente de los coeficientes principales.', '$\\frac{\\infty}{\\infty}$ حالة عدم تعيين: مع الدرجة نفسها خارج قسمة المعاملين الرئيسيين.', '$\\frac{\\infty}{\\infty}$ is indeterminate: with the same degree, the quotient of the leading coefficients.'),
    'top-only': say('Goikoa eta behekoa zatitu behar dira.', 'Hay que dividir el de arriba entre el de abajo.', 'يجب قسمة معامل البسط على معامل المقام.', 'Divide the top coefficient by the bottom one.'),
    'minus-square': say('$(-x)^2=x^2$: maila bikoitiak ez du zeinua aldatzen.', '$(-x)^2=x^2$: el grado par no cambia el signo.', '$(-x)^2=x^2$: الدرجة الزوجية لا تغيّر الإشارة.', '$(-x)^2=x^2$: an even degree does not change the sign.'),
    'root-coefficient': say('$\\sqrt{a^2x^2}=a\\cdot x$: erroa zenbakiari ere bai.', '$\\sqrt{a^2x^2}=a\\cdot x$: la raíz también al número.', '$\\sqrt{a^2x^2}=a\\cdot x$: الجذر على العدد أيضًا.', '$\\sqrt{a^2x^2}=a\\cdot x$: the root of the number too.'),
    'zero-zero-none': say('Faktorizatu, sinplifikatu eta ordezkatu berriro.', 'Factoriza, simplifica y vuelve a sustituir.', 'حلّل واختصر ثم عوّض من جديد.', 'Factorise, cancel and substitute again.'),
    'limit-value': say('Limiteak bi aldeak begiratzen ditu, ez puntua bera.', 'El límite mira los dos lados, no el punto.', 'تنظر النهاية إلى الجانبين لا إلى النقطة نفسها.', 'The limit looks at both sides, not at the point.'),
    'k-over-zero': say('$\\frac{k}{0}$ infinitua da: begiratu izendatzailearen zeinua.', '$\\frac{k}{0}$ es infinito: mira el signo del denominador.', '$\\frac{k}{0}$ لانهائي: انظر إلى إشارة المقام.', '$\\frac{k}{0}$ is infinite: look at the sign of the denominator.'),
    'factor-sign': say('Egiaztatu faktorizazioa biderkatuz.', 'Comprueba la factorización multiplicando.', 'تحقق من التحليل بالضرب.', 'Check the factorisation by multiplying.'),
    'wrong-piece': say('Ezkerretik, lehen zatia; eskuinetik, bigarrena. Biak $x=a$ puntuan.', 'Por la izquierda, el primer trozo; por la derecha, el segundo. Los dos en $x=a$.', 'من اليسار الجزء الأول ومن اليمين الثاني، وكلاهما عند $x=a$.', 'From the left, the first piece; from the right, the second. Both at $x=a$.'),
    'hole-asymptote': say('Zenbakitzailea ere 0 bada, sinplifikatu: zulo bat izan daiteke.', 'Si el numerador también es 0, simplifica: puede ser un agujero.', 'إذا انعدم البسط أيضًا فاختصر: قد يكون ثقبًا.', 'If the numerator is also 0, cancel: it can be a hole.'),
    'oblique-degree': say('Zeiharra goian maila bat gehiago dagoenean bakarrik.', 'Oblicua solo con un grado más arriba.', 'المائل فقط مع درجة زائدة واحدة في البسط.', 'Oblique only with one degree more on top.'),
    'fixed-cost': say('$\\frac{F}{x}\\to 0$: unitateko kostua geratzen da.', '$\\frac{F}{x}\\to 0$: queda el coste por unidad.', '$\\frac{F}{x}\\to 0$: تبقى تكلفة الوحدة.', '$\\frac{F}{x}\\to 0$: the cost per unit is left.')
}

type Built = Omit<WorkedCase<SocLimitsDetectiveError>, 'options'>

const atInfinity = (latex: string) => say(`Kalkulatu $\\lim_{x\\to+\\infty}${latex}$.`, `Calcula $\\lim_{x\\to+\\infty}${latex}$.`, `احسب $\\lim_{x\\to+\\infty}${latex}$.`, `Work out $\\lim_{x\\to+\\infty}${latex}$.`)

function build(random: Random, error: SocLimitsDetectiveError): Built | null {
    switch (error) {
        case 'infinity-one': {
            const a = pick(random, [2, 4, 6, 8, 9])
            const b = pick(random, [1, 2, 3])
            const n = randomInt(random, 1, 3)
            const c = randomInt(random, 1, 9)
            if (a % b !== 0 || a === b) return null
            return {
                problem: atInfinity(`\\frac{${lead(a, n)}+${c}}{${lead(b, n)}-1}`),
                lines: [line(LABELS.step, '\\frac{\\infty}{\\infty}'), line(LABELS.step, '\\frac{\\infty}{\\infty}=1'), line(LABELS.result, '1')],
                wrong: 1, error, fix: `\\frac{${lead(a, n)}}{${lead(b, n)}}=${a / b}`, right: a / b, reached: 1
            }
        }
        case 'top-only': {
            const b = pick(random, [2, 3, 4, 5])
            const q = randomInt(random, 2, 4)
            const a = b * q
            const n = randomInt(random, 1, 3)
            return {
                problem: atInfinity(`\\frac{${lead(a, n)}-1}{${lead(b, n)}+2}`),
                lines: [line(LABELS.step, `\\frac{${lead(a, n)}}{${lead(b, n)}}`), line(LABELS.step, `${a}`), line(LABELS.result, `${a}`)],
                wrong: 1, error, fix: `\\frac{${a}}{${b}}=${q}`, right: q, reached: a
            }
        }
        case 'minus-square': {
            const a = randomInt(random, 2, 6)
            const b = randomInt(random, 1, 9)
            return {
                problem: say(`Kalkulatu $\\lim_{x\\to-\\infty}(${a}x^2+${b}x)$.`, `Calcula $\\lim_{x\\to-\\infty}(${a}x^2+${b}x)$.`, `احسب $\\lim_{x\\to-\\infty}(${a}x^2+${b}x)$.`, `Work out $\\lim_{x\\to-\\infty}(${a}x^2+${b}x)$.`),
                lines: [line(LABELS.step, `${a}x^2`), line(LABELS.step, `(-x)^2<0`), line(LABELS.result, '-\\infty')],
                wrong: 1, error, fix: `(-x)^2=x^2\\ \\to\\ +\\infty`, right: INFINITY, reached: -INFINITY
            }
        }
        case 'root-coefficient': {
            const r = randomInt(random, 2, 5)
            const m = pick(random, [1, 2])
            const c = randomInt(random, 1, 9)
            return {
                problem: atInfinity(`\\frac{\\sqrt{${r * r}x^2+${c}}}{${m === 1 ? '' : m}x}`),
                lines: [line(LABELS.step, `\\sqrt{${r * r}x^2+${c}}\\approx ${r * r}x`), line(LABELS.step, `\\frac{${r * r}x}{${m === 1 ? '' : m}x}`), line(LABELS.result, `${r * r / m}`.replace('.', '{,}'))],
                wrong: 0, error, fix: `\\sqrt{${r * r}x^2}=${r}x\\ \\to\\ \\frac{${r}}{${m}}`, right: r / m, reached: (r * r) / m
            }
        }
        case 'zero-zero-none': {
            const a = randomInt(random, 2, 7)
            return {
                problem: say(`Kalkulatu $\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}$.`, `Calcula $\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}$.`, `احسب $\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}$.`, `Work out $\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}$.`),
                lines: [line(LABELS.step, `\\frac{${a * a}-${a * a}}{${a}-${a}}=\\frac{0}{0}`), line(LABELS.step, '\\frac{0}{0}\\ \\to\\ \\nexists'), line(LABELS.result, '\\nexists')],
                wrong: 1, error, fix: `\\frac{(x-${a})(x+${a})}{x-${a}}=x+${a}\\ \\to\\ ${2 * a}`, right: 2 * a, reached: NONE
            }
        }
        case 'limit-value': {
            const a = randomInt(random, 1, 4)
            const left = randomInt(random, 2, 6)
            const value = left + randomInt(random, 1, 5)
            return {
                problem: say(`$f(x)=\\begin{cases}x+${left - a} & x\\neq ${a}\\\\ ${value} & x=${a}\\end{cases}$. Kalkulatu $\\lim_{x\\to ${a}}f(x)$.`, `Sea $f(x)=\\begin{cases}x+${left - a} & x\\neq ${a}\\\\ ${value} & x=${a}\\end{cases}$. Calcula $\\lim_{x\\to ${a}}f(x)$.`, `لتكن $f(x)=\\begin{cases}x+${left - a} & x\\neq ${a}\\\\ ${value} & x=${a}\\end{cases}$. احسب $\\lim_{x\\to ${a}}f(x)$.`, `Let $f(x)=\\begin{cases}x+${left - a} & x\\neq ${a}\\\\ ${value} & x=${a}\\end{cases}$. Work out $\\lim_{x\\to ${a}}f(x)$.`),
                lines: [line(LABELS.step, `f(${a})=${value}`), line(LABELS.step, `\\lim_{x\\to ${a}}f(x)=f(${a})`), line(LABELS.result, `${value}`)],
                wrong: 1, error, fix: `x+${left - a}\\ \\to\\ ${left}`, right: left, reached: value
            }
        }
        case 'k-over-zero': {
            const a = randomInt(random, 1, 6)
            const k = randomInt(random, 2, 9)
            return {
                problem: say(`Kalkulatu $\\lim_{x\\to ${a}^+}\\frac{${k}}{x-${a}}$.`, `Calcula $\\lim_{x\\to ${a}^+}\\frac{${k}}{x-${a}}$.`, `احسب $\\lim_{x\\to ${a}^+}\\frac{${k}}{x-${a}}$.`, `Work out $\\lim_{x\\to ${a}^+}\\frac{${k}}{x-${a}}$.`),
                lines: [line(LABELS.step, `\\frac{${k}}{${a}-${a}}=\\frac{${k}}{0}`), line(LABELS.step, `\\frac{${k}}{0}=0`), line(LABELS.result, '0')],
                wrong: 1, error, fix: `x-${a}>0\\ \\to\\ +\\infty`, right: INFINITY, reached: 0
            }
        }
        case 'factor-sign': {
            const r = randomInt(random, 2, 5)
            const s = randomInt(random, 1, 6)
            if (r === s) return null
            // x² + (s − r)x − rs = (x − r)(x + s); the slip writes (x + r)(x − s)
            const b = s - r
            const middle = b === 0 ? '' : `${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x`
            return {
                problem: say(`Kalkulatu $\\lim_{x\\to ${r}}\\frac{x^2${middle}-${r * s}}{x-${r}}$.`, `Calcula $\\lim_{x\\to ${r}}\\frac{x^2${middle}-${r * s}}{x-${r}}$.`, `احسب $\\lim_{x\\to ${r}}\\frac{x^2${middle}-${r * s}}{x-${r}}$.`, `Work out $\\lim_{x\\to ${r}}\\frac{x^2${middle}-${r * s}}{x-${r}}$.`),
                lines: [line(LABELS.step, `x^2${middle}-${r * s}=(x+${r})(x-${s})`), line(LABELS.step, `x-${s}`), line(LABELS.result, `${r - s}`)],
                wrong: 0, error, fix: `(x-${r})(x+${s})\\ \\to\\ ${r}+${s}=${r + s}`, right: r + s, reached: r - s
            }
        }
        case 'wrong-piece': {
            const a = randomInt(random, 1, 4)
            const k = a * a + 1 - a
            // x² + 1 for x < a and x + k for x ≥ a; the slip evaluates the second piece at 0
            return {
                problem: say(`Aurkitu $k$, $f(x)=\\begin{cases}x^2+1 & x<${a}\\\\ x+k & x\\ge ${a}\\end{cases}$ jarraitua izan dadin.`, `Halla $k$ para que $f(x)=\\begin{cases}x^2+1 & x<${a}\\\\ x+k & x\\ge ${a}\\end{cases}$ sea continua.`, `أوجد $k$ لتكون $f(x)=\\begin{cases}x^2+1 & x<${a}\\\\ x+k & x\\ge ${a}\\end{cases}$ متصلة.`, `Find $k$ so that $f(x)=\\begin{cases}x^2+1 & x<${a}\\\\ x+k & x\\ge ${a}\\end{cases}$ is continuous.`),
                lines: [line(LABELS.step, `${a}^2+1=${a * a + 1}`), line(LABELS.step, `0+k=${a * a + 1}`), line(LABELS.result, `k=${a * a + 1}`)],
                wrong: 1, error, fix: `${a}+k=${a * a + 1}\\ \\to\\ k=${k}`, right: k, reached: a * a + 1
            }
        }
        case 'hole-asymptote': {
            const a = randomInt(random, 1, 6)
            const b = randomInt(random, 1, 6)
            if (a === b) return null
            return {
                problem: say(`Ba al du $f(x)=\\frac{x^2-${a * a}}{x-${a}}$ funtzioak asintota bertikalik $x=${a}$ zuzenean?`, `¿Tiene $f(x)=\\frac{x^2-${a * a}}{x-${a}}$ asíntota vertical en $x=${a}$?`, `هل لـ $f(x)=\\frac{x^2-${a * a}}{x-${a}}$ مقارب رأسي عند $x=${a}$؟`, `Does $f(x)=\\frac{x^2-${a * a}}{x-${a}}$ have a vertical asymptote at $x=${a}$?`),
                lines: [line(LABELS.step, `x-${a}=0\\ \\to\\ x=${a}`), line(LABELS.step, `x=${a}\\ \\to\\ \\pm\\infty`), line(LABELS.result, `x=${a}`)],
                wrong: 1, error, fix: `\\frac{(x-${a})(x+${a})}{x-${a}}=x+${a}\\ \\to\\ ${2 * a}`, right: 2 * a, reached: INFINITY + b
            }
        }
        case 'oblique-degree': {
            const c = randomInt(random, 1, 9)
            const d = randomInt(random, 1, 3)
            const remainder = c - d ** 3
            const rest = remainder === 0 ? '' : `${remainder < 0 ? '-' : '+'}${Math.abs(remainder)}`
            const dx = d === 1 ? 'x' : `${d}x`
            return {
                problem: say(`Aurkitu $f(x)=\\frac{x^3+${c}}{x+${d}}$ funtzioaren adarra, $x\\to+\\infty$ denean.`, `Halla la rama de $f(x)=\\frac{x^3+${c}}{x+${d}}$ cuando $x\\to+\\infty$.`, `أوجد فرع $f(x)=\\frac{x^3+${c}}{x+${d}}$ عندما $x\\to+\\infty$.`, `Find the branch of $f(x)=\\frac{x^3+${c}}{x+${d}}$ as $x\\to+\\infty$.`),
                lines: [line(LABELS.step, `x^3+${c}=(x+${d})(x^2-${dx}+${d * d})${rest}`), line(LABELS.step, `y=x^2-${dx}+${d * d}\\ \\to\\ y=mx+n`), line(LABELS.result, `y=x^2-${dx}+${d * d}`)],
                wrong: 1, error, fix: `x^2-${dx}+${d * d}\\ \\to\\ +\\infty`, right: INFINITY, reached: 1
            }
        }
        case 'fixed-cost': {
            const fixed = pick(random, [500, 800, 1500, 2400, 4000])
            const unit = randomInt(random, 4, 30)
            return {
                problem: say(`$x$ unitate egiteak $C(x)=${fixed}+${unit}x$ euro balio du. Zein baliotara doa batez besteko kostua?`, `Fabricar $x$ unidades cuesta $C(x)=${fixed}+${unit}x$ euros. ¿Hacia qué valor va el coste medio?`, `صنع $x$ وحدة يكلّف $C(x)=${fixed}+${unit}x$ يورو. إلى أي قيمة تتجه التكلفة المتوسطة؟`, `Making $x$ units costs $C(x)=${fixed}+${unit}x$ euros. What value does the average cost tend to?`),
                lines: [line(LABELS.step, `\\frac{${fixed}+${unit}x}{x}`), line(LABELS.step, `\\frac{${fixed}}{x}+${unit}\\ \\to\\ ${fixed}`), line(LABELS.result, `${fixed}`)],
                wrong: 1, error, fix: `\\frac{${fixed}}{x}\\ \\to\\ 0\\qquad 0+${unit}=${unit}`, right: unit, reached: fixed
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createSocLimitsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, socLimitsDetectiveLevels[levelIndex], SOC_LIMITS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const SOC_LIMITS_DETECTIVE_ERRORS = socLimitsDetectiveLevels.flat()
