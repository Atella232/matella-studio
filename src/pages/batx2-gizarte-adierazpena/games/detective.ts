import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Adierazpenaren detektibea · Batxilergoa 2 · Gizarte Zientziak (Detective
   de gráficas de 2.º Sociales): a solved exercise with exactly one wrong
   line. Level 1, first sight and asymptotes: x² + a² taken as zero, a hole
   counted as an asymptote, the horizontal asymptote with the bottom degree
   bigger, the y-intercept worked at x = 1. Level 2, derivatives: x⁴ given
   an inflection, the value of the extremum left as its x, f'' > 0 read
   as ∩, the sign chart without the point out of the domain. Level 3,
   graphs and reading: the oblique asymptote copied from the numerator,
   ln(x + a) with x > a, a minimum of |f| below zero, the asymptotes of
   the model swapped.
   ========================================================================== */

export type Bach2gSketchDetectiveError =
    | 'never-zero'
    | 'hole'
    | 'degrees'
    | 'y-cut'
    | 'flat-inflection'
    | 'value'
    | 'second-sign'
    | 'domain-point'
    | 'oblique-copy'
    | 'ln-domain'
    | 'abs-negative'
    | 'swap'

export const bach2gSketchDetectiveLevels: Bach2gSketchDetectiveError[][] = [
    ['never-zero', 'hole', 'degrees', 'y-cut'],
    ['flat-inflection', 'value', 'second-sign', 'domain-point'],
    ['oblique-copy', 'ln-domain', 'abs-negative', 'swap']
]

export const BACH2G_SKETCH_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    derivative: say('Deribatua', 'Derivada', 'المشتقة', 'Derivative'),
    limit: say('Limitea', 'Límite', 'النهاية', 'Limit'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const count = say('Zenbat', '¿Cuántos?', 'كم', 'How many')

type Built = Omit<WorkedCase<Bach2gSketchDetectiveError>, 'options'>

function build(random: Random, error: Bach2gSketchDetectiveError): Built | null {
    switch (error) {
        case 'never-zero': {
            const a = randomInt(random, 1, 4)
            return {
                problem: say(`Zenbat puntu geratzen dira $f(x)=\\frac{x}{x^2+${a * a}}$ funtzioaren izate-eremutik kanpo?`, `¿Cuántos puntos quedan fuera del dominio de $f(x)=\\frac{x}{x^2+${a * a}}$?`, `كم نقطة تبقى خارج مجال $f(x)=\\frac{x}{x^2+${a * a}}$؟`, `How many points are left out of the domain of $f(x)=\\frac{x}{x^2+${a * a}}$?`),
                lines: [line(LABELS.step, `x^2+${a * a}=0`), line(LABELS.step, `x=\\pm ${a}`), line(count, '2')],
                wrong: 1, error, fix: `x^2=-${a * a}\\ \\to\\ 0`, right: 0, reached: 2
            }
        }
        case 'hole': {
            const a = randomInt(random, 1, 5)
            return {
                problem: say(`Zenbat asintota bertikal ditu $f(x)=\\frac{x^2-${a * a}}{x-${a}}$ funtzioak?`, `¿Cuántas asíntotas verticales tiene $f(x)=\\frac{x^2-${a * a}}{x-${a}}$?`, `كم مقاربًا عموديًا للدالة $f(x)=\\frac{x^2-${a * a}}{x-${a}}$؟`, `How many vertical asymptotes does $f(x)=\\frac{x^2-${a * a}}{x-${a}}$ have?`),
                lines: [line(LABELS.step, `x-${a}=0\\ \\to\\ x=${a}`), line(LABELS.limit, `x=${a}`), line(count, '1')],
                wrong: 1, error, fix: `\\frac{0}{0}\\ \\to\\ x+${a}\\ \\to\\ 0`, right: 0, reached: 1
            }
        }
        case 'degrees': {
            const b = randomInt(random, 2, 7)
            return {
                problem: say(`Zein da $f(x)=\\frac{${b}x+1}{x^2+1}$ funtzioaren asintota horizontala?`, `¿Cuál es la asíntota horizontal de $f(x)=\\frac{${b}x+1}{x^2+1}$?`, `ما المقارب الأفقي للدالة $f(x)=\\frac{${b}x+1}{x^2+1}$؟`, `What is the horizontal asymptote of $f(x)=\\frac{${b}x+1}{x^2+1}$?`),
                lines: [line(LABELS.step, 'x\\to\\pm\\infty'), line(LABELS.limit, `\\frac{${b}}{1}=${b}`), line(LABELS.result, `y=${b}`)],
                wrong: 1, error, fix: '\\frac{1}{x}\\to 0\\ \\to\\ y=0', right: 0, reached: b
            }
        }
        case 'y-cut': {
            const p = randomInt(random, 2, 6)
            const a = randomInt(random, 2, 6)
            if (p === a || (1 + p) / (1 + a) === p / a) return null
            return {
                problem: say(`Non mozten du $f(x)=\\frac{x+${p}}{x+${a}}$ funtzioak $Y$ ardatza?`, `¿Dónde corta $f(x)=\\frac{x+${p}}{x+${a}}$ al eje $Y$?`, `أين تقطع $f(x)=\\frac{x+${p}}{x+${a}}$ محور $Y$؟`, `Where does $f(x)=\\frac{x+${p}}{x+${a}}$ cut the $Y$ axis?`),
                lines: [line(LABELS.step, `f(1)=\\frac{${1 + p}}{${1 + a}}`), line(LABELS.step, `y=\\frac{${1 + p}}{${1 + a}}`), line(LABELS.result, `\\left(0,\\frac{${1 + p}}{${1 + a}}\\right)`)],
                wrong: 0, error, fix: `f(0)=\\frac{${p}}{${a}}`, right: p / a, reached: (1 + p) / (1 + a)
            }
        }
        case 'flat-inflection': {
            const c = randomInt(random, 1, 9)
            return {
                problem: say(`Zenbat inflexio-puntu ditu $f(x)=x^4+${c}$ funtzioak?`, `¿Cuántos puntos de inflexión tiene $f(x)=x^4+${c}$?`, `كم نقطة انعطاف للدالة $f(x)=x^4+${c}$؟`, `How many points of inflection does $f(x)=x^4+${c}$ have?`),
                lines: [line(LABELS.derivative, "f''(x)=12x^2"), line(LABELS.step, "f''(0)=0"), line(count, '1')],
                wrong: 2, error, fix: "f''(x)\\ge 0\\ \\to\\ 0", right: 0, reached: 1
            }
        }
        case 'value': {
            const k = randomInt(random, 2, 4)
            const c = randomInt(random, 1, 6)
            const bottom = -2 * k ** 3 + c
            return {
                problem: say(`Zein da $f(x)=x^3-${3 * k * k}x+${c}$ funtzioaren minimo erlatiboaren balioa?`, `¿Cuánto vale el mínimo relativo de $f(x)=x^3-${3 * k * k}x+${c}$?`, `كم تساوي القيمة الصغرى المحلية للدالة $f(x)=x^3-${3 * k * k}x+${c}$؟`, `What is the relative minimum value of $f(x)=x^3-${3 * k * k}x+${c}$?`),
                lines: [line(LABELS.derivative, `3x^2-${3 * k * k}=0\\ \\to\\ x=\\pm ${k}`), line(LABELS.step, `f''(${k})=${6 * k}>0`), line(LABELS.result, `${k}`)],
                wrong: 2, error, fix: `f(${k})=${bottom}`, right: bottom, reached: k
            }
        }
        case 'second-sign': {
            const p = randomInt(random, 1, 4)
            return {
                problem: say(`Non da ganbila (∩) $f(x)=x^3-${3 * p}x^2$?`, `¿Dónde es convexa (∩) $f(x)=x^3-${3 * p}x^2$?`, `أين تكون $f(x)=x^3-${3 * p}x^2$ مقعّرة نحو الأسفل (∩)؟`, `Where is $f(x)=x^3-${3 * p}x^2$ concave down (∩)?`),
                lines: [line(LABELS.derivative, `f''(x)=6x-${6 * p}`), line(LABELS.step, `f''>0\\ \\to\\ \\cap`), line(LABELS.result, `x>${p}`)],
                wrong: 1, error, fix: `f''<0\\ \\to\\ x<${p}`, right: -1, reached: 1
            }
        }
        case 'domain-point': {
            const a = randomInt(random, 1, 4)
            return {
                problem: say(`Beherakorra al da $f(x)=\\frac{1}{x-${a}}$ funtzioa $\\mathbb{R}-\\{${a}\\}$ osoan, tarte bakar gisa?`, `¿Es $f(x)=\\frac{1}{x-${a}}$ decreciente en todo $\\mathbb{R}-\\{${a}\\}$ como un solo intervalo?`, `هل $f(x)=\\frac{1}{x-${a}}$ متناقصة على $\\mathbb{R}-\\{${a}\\}$ كلها كفترة واحدة؟`, `Is $f(x)=\\frac{1}{x-${a}}$ decreasing on all of $\\mathbb{R}-\\{${a}\\}$ as one interval?`),
                lines: [line(LABELS.derivative, `f'(x)=-\\frac{1}{(x-${a})^2}<0`), line(LABELS.step, `f(${a - 1})<f(${a + 1})`), line(count, '1')],
                wrong: 2, error, fix: `(-\\infty,${a})\\qquad (${a},+\\infty)\\ \\to\\ 2`, right: 2, reached: 1
            }
        }
        case 'oblique-copy': {
            const b = randomInt(random, 1, 5)
            const r = pick(random, [1, 2, 3])
            // (x² + b x + r)/x = x + b + r/x
            return {
                problem: say(`$f(x)=\\frac{x^2+${b}x+${r}}{x}$ funtzioaren asintota zeiharra $y=mx+n$ da. Zenbat da $n$?`, `La asíntota oblicua de $f(x)=\\frac{x^2+${b}x+${r}}{x}$ es $y=mx+n$. ¿Cuánto vale $n$?`, `المقارب المائل للدالة $f(x)=\\frac{x^2+${b}x+${r}}{x}$ هو $y=mx+n$. كم تساوي $n$؟`, `The oblique asymptote of $f(x)=\\frac{x^2+${b}x+${r}}{x}$ is $y=mx+n$. What is $n$?`),
                lines: [line(LABELS.step, `f(x)=x+${b}+\\frac{${r}}{x}`), line(LABELS.step, `n=${r}`), line(LABELS.result, `y=x+${r}`)],
                wrong: 1, error, fix: `n=${b}\\ \\to\\ y=x+${b}`, right: b, reached: r
            }
        }
        case 'ln-domain': {
            const a = randomInt(random, 1, 6)
            return {
                problem: say(`$f(x)=\\ln(x+${a})$ funtzioaren asintota bertikala $x=c$ da. Zenbat da $c$?`, `La asíntota vertical de $f(x)=\\ln(x+${a})$ es $x=c$. ¿Cuánto vale $c$?`, `المقارب العمودي للدالة $f(x)=\\ln(x+${a})$ هو $x=c$. كم تساوي $c$؟`, `The vertical asymptote of $f(x)=\\ln(x+${a})$ is $x=c$. What is $c$?`),
                lines: [line(LABELS.step, `x+${a}>0`), line(LABELS.step, `x>${a}`), line(LABELS.result, `c=${a}`)],
                wrong: 1, error, fix: `x>-${a}\\ \\to\\ c=-${a}`, right: -a, reached: a
            }
        }
        case 'abs-negative': {
            const a = randomInt(random, 2, 6)
            return {
                problem: say(`Zein da $f(x)=|x^2-${a * a}|$ funtzioaren balio txikiena?`, `¿Cuál es el menor valor de $f(x)=|x^2-${a * a}|$?`, `ما أصغر قيمة للدالة $f(x)=|x^2-${a * a}|$؟`, `What is the smallest value of $f(x)=|x^2-${a * a}|$?`),
                lines: [line(LABELS.step, `x^2-${a * a}\\ \\to\\ \\min(0,-${a * a})`), line(LABELS.step, `|x^2-${a * a}|\\ \\to\\ \\min(0,-${a * a})`), line(LABELS.result, `-${a * a}`)],
                wrong: 1, error, fix: `|x^2-${a * a}|\\ge 0\\ \\to\\ (\\pm ${a},0)\\ \\to\\ 0`, right: 0, reached: -a * a
            }
        }
        case 'swap': {
            const a = randomInt(random, 1, 4)
            const b = -randomInt(random, 1, 4)
            const k = pick(random, [1, 2, 3])
            return {
                problem: say(`Asintotak $x=${a}$ eta $y=${b}$ dira, eta $f(x)=b+\\frac{${k}}{x-a}$. Kalkulatu $f(${a + 1})$.`, `Las asíntotas son $x=${a}$ e $y=${b}$, y $f(x)=b+\\frac{${k}}{x-a}$. Calcula $f(${a + 1})$.`, `المقاربان $x=${a}$ و$y=${b}$، و$f(x)=b+\\frac{${k}}{x-a}$. احسب $f(${a + 1})$.`, `The asymptotes are $x=${a}$ and $y=${b}$, and $f(x)=b+\\frac{${k}}{x-a}$. Work out $f(${a + 1})$.`),
                lines: [line(LABELS.step, `f(x)=${a}+\\frac{${k}}{x${signed(-b)}}`), line(LABELS.step, `f(${a + 1})=${a}+\\frac{${k}}{${a + 1 - b}}`), line(LABELS.result, `${a}+\\frac{${k}}{${a + 1 - b}}`)],
                wrong: 0, error, fix: `f(x)=${b}+\\frac{${k}}{x-${a}}\\ \\to\\ ${b + k}`, right: b + k, reached: a + k / (a + 1 - b)
            }
        }
    }
}

export const bach2gSketchDetectiveNames: Record<Bach2gSketchDetectiveError, LocalizedText> = {
    'never-zero': say('Inoiz zero ez den izendatzailea ebatzi du', 'Resolvió un denominador que nunca vale cero', 'حلّ مقامًا لا ينعدم أبدًا', 'Solved a denominator that is never zero'),
    hole: say('Zuloa asintota gisa hartu du', 'Tomó un agujero por una asíntota', 'عدّ الثغرة مقاربًا', 'Took a hole for an asymptote'),
    degrees: say('Mailak alderatu gabe zatitu ditu koefizienteak', 'Dividió coeficientes sin comparar los grados', 'قسم المعاملات دون مقارنة الدرجات', 'Divided coefficients without comparing the degrees'),
    'y-cut': say('$Y$ ardatzerako $x=1$ ordezkatu du', 'Para el eje $Y$ sustituyó $x=1$', 'عوّض $x=1$ لمحور $Y$', 'Substituted $x=1$ for the $Y$ axis'),
    'flat-inflection': say('$f\'\'=0$ inflexiotzat hartu du, zeinua aldatu gabe', 'Tomó $f\'\'=0$ por inflexión sin cambio de signo', 'عدّ $f\'\'=0$ انعطافًا دون تغيّر الإشارة', 'Took $f\'\'=0$ for an inflection with no change of sign'),
    value: say('Muturraren $x$ eman du, ez balioa', 'Dio la $x$ del extremo, no su valor', 'أعطى $x$ القيمة القصوى لا قيمتها', 'Gave the $x$ of the extremum, not its value'),
    'second-sign': say('$f\'\'$ deribatuaren zeinua alderantziz irakurri du', 'Leyó al revés el signo de $f\'\'$', 'قرأ إشارة $f\'\'$ بالعكس', 'Read the sign of $f\'\'$ the wrong way round'),
    'domain-point': say('Izate-eremutik kanpoko puntua ahaztu du', 'Olvidó el punto fuera del dominio', 'نسي النقطة خارج المجال', 'Forgot the point out of the domain'),
    'oblique-copy': say('Hondarra hartu du $n$ gisa', 'Tomó el resto como $n$', 'أخذ الباقي على أنه $n$', 'Took the remainder as $n$'),
    'ln-domain': say('$\\ln(x+a)$ funtzioan $x>a$ idatzi du', 'En $\\ln(x+a)$ escribió $x>a$', 'كتب $x>a$ في $\\ln(x+a)$', 'Wrote $x>a$ for $\\ln(x+a)$'),
    'abs-negative': say('Balio absolutuari balio negatibo bat eman dio', 'Dio un valor negativo al valor absoluto', 'أعطى القيمة المطلقة قيمة سالبة', 'Gave the absolute value a negative value'),
    swap: say('Asintotak lekuz aldatu ditu ereduan', 'Cambió de sitio las asíntotas en el modelo', 'بدّل موضعي المقاربين في النموذج', 'Swapped the asymptotes in the model')
}

export const bach2gSketchDetectiveTips: Record<Bach2gSketchDetectiveError, LocalizedText> = {
    'never-zero': say('$x^2+a^2>0$ beti: ez du zerorik.', '$x^2+a^2>0$ siempre: no tiene ceros.', '$x^2+a^2>0$ دائمًا: لا أصفار له.', '$x^2+a^2>0$ always: it has no zeros.'),
    hole: say('Zero zati zero: sinplifikatu lehenik.', 'Cero entre cero: simplifica primero.', 'صفر على صفر: اختصر أولًا.', 'Zero over zero: simplify first.'),
    degrees: say('Behekoaren maila handiagoa: $y=0$.', 'El grado de abajo es mayor: $y=0$.', 'درجة المقام أكبر: $y=0$.', 'The bottom degree is bigger: $y=0$.'),
    'y-cut': say('$Y$ ardatza: $x=0$.', 'Eje $Y$: $x=0$.', 'محور $Y$: $x=0$.', '$Y$ axis: $x=0$.'),
    'flat-inflection': say('Inflexioa: $f\'\'$ zeinuz aldatu behar da.', 'Inflexión: $f\'\'$ tiene que cambiar de signo.', 'الانعطاف: يجب أن تتغير إشارة $f\'\'$.', 'Inflection: $f\'\'$ must change sign.'),
    value: say('Balioa: $f$ kalkulatu muturrean.', 'El valor: calcula $f$ en el extremo.', 'القيمة: احسب $f$ عند النقطة.', 'The value: work out $f$ at the point.'),
    'second-sign': say('$f\'\'>0$: ∪; $f\'\'<0$: ∩.', '$f\'\'>0$: ∪; $f\'\'<0$: ∩.', '$f\'\'>0$: ∪؛ $f\'\'<0$: ∩.', '$f\'\'>0$: ∪; $f\'\'<0$: ∩.'),
    'domain-point': say('Izate-eremutik kanpoko puntuek tarteak banatzen dituzte.', 'Los puntos fuera del dominio parten los intervalos.', 'النقاط خارج المجال تفصل الفترات.', 'Points out of the domain split the intervals.'),
    'oblique-copy': say('Asintota zeiharra zatidura da, ez hondarra.', 'La oblicua es el cociente, no el resto.', 'المائل هو خارج القسمة لا الباقي.', 'The oblique one is the quotient, not the remainder.'),
    'ln-domain': say('$\\ln u$: $u>0$.', '$\\ln u$: $u>0$.', '$\\ln u$: $u>0$.', '$\\ln u$: $u>0$.'),
    'abs-negative': say('$|u|\\ge 0$ beti.', '$|u|\\ge 0$ siempre.', '$|u|\\ge 0$ دائمًا.', '$|u|\\ge 0$ always.'),
    swap: say('Bertikala izendatzailean, horizontala batugai gisa.', 'La vertical en el denominador, la horizontal sumando.', 'العمودي في المقام والأفقي حدًّا مضافًا.', 'The vertical one in the denominator, the horizontal one added.')
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBach2gSketchDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bach2gSketchDetectiveLevels[levelIndex], BACH2G_SKETCH_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH2G_SKETCH_DETECTIVE_ERRORS = bach2gSketchDetectiveLevels.flat()
