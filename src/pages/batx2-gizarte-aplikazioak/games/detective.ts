import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Aplikazioen detektibea · Batxilergoa 2 · Gizarte Zientziak (Detective de
   aplicaciones de 2.º Sociales): a solved exercise with exactly one wrong
   line. Level 1, tangent and growth: the slope left as f′(x), the
   intercept of the line taken for its slope, the sign of f read instead
   of f′, the interval of the model forgotten. Level 2, extrema: f′ = 0
   with no change of sign taken for an extremum, the ends of the interval
   left out, f″ read the wrong way round, one condition for two
   parameters. Level 3, optimisation: a term of the cost lost, c/x
   differentiated as c, the rise given for the price, (x(S − x))′ = S − x.
   ========================================================================== */

export type Bach2gApplicationsDetectiveError =
    | 'slope-in-x'
    | 'intercept'
    | 'sign-of-f'
    | 'model-interval'
    | 'flat-point'
    | 'ends'
    | 'second-reversed'
    | 'one-equation'
    | 'cost-term'
    | 'average-derivative'
    | 'rise-for-price'
    | 'product'

export const bach2gApplicationsDetectiveLevels: Bach2gApplicationsDetectiveError[][] = [
    ['slope-in-x', 'intercept', 'sign-of-f', 'model-interval'],
    ['flat-point', 'ends', 'second-reversed', 'one-equation'],
    ['cost-term', 'average-derivative', 'rise-for-price', 'product']
]

export const BACH2G_APPLICATIONS_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    substitute: say('Ordezkatu', 'Sustituye', 'عوّض', 'Substitute'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    derivative: say('Deribatua', 'Derivada', 'المشتقة', 'Derivative'),
    function: say('Funtzioa', 'Función', 'الدالة', 'Function'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

type Built = Omit<WorkedCase<Bach2gApplicationsDetectiveError>, 'options'>

function build(random: Random, error: Bach2gApplicationsDetectiveError): Built | null {
    switch (error) {
        case 'slope-in-x': {
            const a = randomInt(random, 1, 4)
            const b = randomInt(random, 1, 5)
            const value = a * a + b * a
            return {
                problem: say(`Idatzi $f(x)=x^2+${b}x$ kurbaren zuzen ukitzailea $x=${a}$ puntuan.`, `Escribe la tangente a $f(x)=x^2+${b}x$ en $x=${a}$.`, `اكتب مماس $f(x)=x^2+${b}x$ عند $x=${a}$.`, `Write the tangent to $f(x)=x^2+${b}x$ at $x=${a}$.`),
                lines: [line(LABELS.substitute, `f(${a})=${value}`), line(LABELS.derivative, `m=f'(x)=2x+${b}`), line(LABELS.result, `y-${value}=(2x+${b})(x-${a})`)],
                wrong: 1, error, fix: `m=f'(${a})=${2 * a + b}\\ \\to\\ y=${2 * a + b}x-${a * a}`, right: 2 * a + b, reached: 0
            }
        }
        case 'intercept': {
            const x = randomInt(random, 1, 5)
            const b = randomInt(random, 1, 4)
            const m = 2 * x + b
            const n = m + 2 * pick(random, [1, 2, 3])
            return {
                problem: say(`Zein $x$ baliotan da $f(x)=x^2+${b}x$ kurbaren zuzen ukitzailea $y=${m}x+${n}$ zuzenaren paraleloa?`, `¿En qué $x$ la tangente a $f(x)=x^2+${b}x$ es paralela a $y=${m}x+${n}$?`, `عند أي $x$ يكون مماس $f(x)=x^2+${b}x$ موازيًا للمستقيم $y=${m}x+${n}$؟`, `At which $x$ is the tangent to $f(x)=x^2+${b}x$ parallel to $y=${m}x+${n}$?`),
                lines: [line(LABELS.derivative, `f'(x)=2x+${b}`), line(LABELS.step, `2x+${b}=${n}`), line(LABELS.result, `x=${(n - b) / 2}`)],
                wrong: 1, error, fix: `2x+${b}=${m}\\ \\to\\ x=${x}`, right: x, reached: (n - b) / 2
            }
        }
        case 'sign-of-f': {
            const a = randomInt(random, 1, 3)
            const c = a * a + randomInt(random, 2, 9)
            const value = a * a - c
            return {
                problem: say(`Gorakorra ala beherakorra da $f(x)=x^2-${c}$ funtzioa $x=${a}$ puntuan? Eman malda.`, `¿Crece o decrece $f(x)=x^2-${c}$ en $x=${a}$? Da la pendiente.`, `هل $f(x)=x^2-${c}$ متزايدة أم متناقصة عند $x=${a}$؟ اكتب الميل.`, `Does $f(x)=x^2-${c}$ increase or decrease at $x=${a}$? Give the slope.`),
                lines: [line(LABELS.substitute, `f(${a})=${value}`), line(LABELS.step, `${value}<0`), line(LABELS.result, 'f\\ \\searrow')],
                wrong: 0, error, fix: `f'(${a})=${2 * a}>0\\ \\to\\ f\\ \\nearrow`, right: 2 * a, reached: value
            }
        }
        case 'model-interval': {
            const end = randomInt(random, 3, 6)
            const a = end + randomInt(random, 2, 4)
            return {
                problem: say(`Irabaziak $B(t)=-t^2+${2 * a}t$ dira, $0\\le t\\le ${end}$. Zein urtera arte hazten dira?`, `Los beneficios son $B(t)=-t^2+${2 * a}t$, con $0\\le t\\le ${end}$. ¿Hasta qué año crecen?`, `الأرباح $B(t)=-t^2+${2 * a}t$ مع $0\\le t\\le ${end}$. حتى أي سنة تتزايد؟`, `The profits are $B(t)=-t^2+${2 * a}t$, with $0\\le t\\le ${end}$. Up to which year do they grow?`),
                lines: [line(LABELS.derivative, `B'(t)=-2t+${2 * a}`), line(LABELS.step, `-2t+${2 * a}>0\\ \\to\\ t<${a}`), line(LABELS.result, `${a}`)],
                wrong: 2, error, fix: `t\\le ${end}\\ \\to\\ ${end}`, right: end, reached: a
            }
        }
        case 'flat-point': {
            const a = randomInt(random, 1, 3)
            return {
                problem: say(`Zenbat mutur ditu $f(x)=x^3-${3 * a}x^2+${3 * a * a}x$ funtzioak?`, `¿Cuántos extremos tiene $f(x)=x^3-${3 * a}x^2+${3 * a * a}x$?`, `كم قيمة قصوى للدالة $f(x)=x^3-${3 * a}x^2+${3 * a * a}x$؟`, `How many extrema does $f(x)=x^3-${3 * a}x^2+${3 * a * a}x$ have?`),
                lines: [line(LABELS.derivative, `f'(x)=3(x-${a})^2`), line(LABELS.step, `f'(${a})=0`), line(LABELS.result, `1`)],
                wrong: 2, error, fix: `f'(x)\\ge 0\\ \\to\\ 0`, right: 0, reached: 1
            }
        }
        case 'ends': {
            const k = randomInt(random, 1, 2)
            const end = k === 1 ? pick(random, [3, 4]) : pick(random, [5, 6])
            const top = end ** 3 - 3 * k * k * end
            return {
                problem: say(`Zein da $f(x)=x^3-${3 * k * k}x$ funtzioaren maximo absolutua $[-${k},${end}]$ tartean?`, `¿Cuál es el máximo absoluto de $f(x)=x^3-${3 * k * k}x$ en $[-${k},${end}]$?`, `ما القيمة العظمى المطلقة للدالة $f(x)=x^3-${3 * k * k}x$ على $[-${k},${end}]$؟`, `What is the absolute maximum of $f(x)=x^3-${3 * k * k}x$ on $[-${k},${end}]$?`),
                lines: [line(LABELS.derivative, `f'(\\pm ${k})=0`), line(LABELS.substitute, `f(-${k})=${2 * k ** 3}`), line(LABELS.result, `${2 * k ** 3}`)],
                wrong: 2, error, fix: `f(${end})=${top}>${2 * k ** 3}\\ \\to\\ ${top}`, right: top, reached: 2 * k ** 3
            }
        }
        case 'second-reversed': {
            const k = randomInt(random, 1, 3)
            return {
                problem: say(`Zein da $f(x)=x^3-${3 * k * k}x$ funtzioaren maximo erlatiboaren balioa?`, `¿Cuánto vale el máximo relativo de $f(x)=x^3-${3 * k * k}x$?`, `كم تساوي القيمة العظمى المحلية للدالة $f(x)=x^3-${3 * k * k}x$؟`, `What is the relative maximum value of $f(x)=x^3-${3 * k * k}x$?`),
                lines: [line(LABELS.derivative, `x=\\pm ${k}`), line(LABELS.step, `f''(${k})=${6 * k}>0\\ \\to\\ \\max`), line(LABELS.result, `f(${k})=-${2 * k ** 3}`)],
                wrong: 1, error, fix: `f''(-${k})=-${6 * k}<0\\ \\to\\ f(-${k})=${2 * k ** 3}`, right: 2 * k ** 3, reached: -2 * k ** 3
            }
        }
        case 'one-equation': {
            const p = randomInt(random, 1, 4)
            const q = randomInt(random, -3, 5)
            return {
                problem: say(`$f(x)=x^2+ax+b$ funtzioak minimoa du $(${p},${q})$ puntuan. Zenbat da $b$?`, `$f(x)=x^2+ax+b$ tiene un mínimo en $(${p},${q})$. ¿Cuánto vale $b$?`, `للدالة $f(x)=x^2+ax+b$ قيمة صغرى عند $(${p},${q})$. كم تساوي $b$؟`, `$f(x)=x^2+ax+b$ has a minimum at $(${p},${q})$. What is $b$?`),
                lines: [line(LABELS.derivative, `f'(${p})=${2 * p}+a=0\\ \\to\\ a=-${2 * p}`), line(LABELS.step, `b=${q}`), line(LABELS.result, `${q}`)],
                wrong: 1, error, fix: `f(${p})=${p * p}-${2 * p * p}+b=${q}\\ \\to\\ b=${q + p * p}`, right: q + p * p, reached: q
            }
        }
        case 'cost-term': {
            const price = pick(random, [40, 50, 60, 80])
            const b = 2 * randomInt(random, 2, 8)
            const c = randomInt(random, 1, 5) * 100
            return {
                problem: say(`Unitate bakoitza ${price} euroan saltzen da eta $C(x)=x^2+${b}x+${c}$. Zenbat unitaterekin da irabazia handiena?`, `Cada unidad se vende a ${price} € y $C(x)=x^2+${b}x+${c}$. ¿Con cuántas unidades es máximo el beneficio?`, `تُباع كل وحدة بـ ${price} € و$C(x)=x^2+${b}x+${c}$. بكم وحدة يكون الربح أعظميًا؟`, `Each unit sells for €${price} and $C(x)=x^2+${b}x+${c}$. With how many units is the profit highest?`),
                lines: [line(LABELS.function, `B(x)=${price}x-x^2-${b}x-${c}`), line(LABELS.derivative, `B'(x)=${price}-2x`), line(LABELS.result, `x=${price / 2}`)],
                wrong: 1, error, fix: `B'(x)=${price - b}-2x\\ \\to\\ x=${(price - b) / 2}`, right: (price - b) / 2, reached: price / 2
            }
        }
        case 'average-derivative': {
            const r = pick(random, [5, 10, 20, 30])
            const b = randomInt(random, 2, 12)
            const c = r * r
            return {
                problem: say(`$C(x)=x^2+${b}x+${c}$ bada, zenbat unitaterekin da batez besteko kostua minimoa?`, `Si $C(x)=x^2+${b}x+${c}$, ¿con cuántas unidades es mínimo el coste medio?`, `إذا كانت $C(x)=x^2+${b}x+${c}$ فبكم وحدة يكون متوسط التكلفة أصغريًا؟`, `If $C(x)=x^2+${b}x+${c}$, with how many units is the average cost lowest?`),
                lines: [line(LABELS.function, `M(x)=x+${b}+\\frac{${c}}{x}`), line(LABELS.derivative, `M'(x)=1-\\frac{${c}}{x}`), line(LABELS.result, `x=${c}`)],
                wrong: 1, error, fix: `M'(x)=1-\\frac{${c}}{x^2}\\ \\to\\ x=${r}`, right: r, reached: c
            }
        }
        case 'rise-for-price': {
            const p = pick(random, [10, 20, 30])
            const k = pick(random, [2, 5, 10])
            const rise = randomInt(random, 2, 12)
            const q = k * (2 * rise + p)
            return {
                problem: say(`Negozio batek ${p} euro kobratzen ditu eta ${q} bezero ditu; euro bakoitzeko igoerak ${k} bezero galtzen ditu. Zein prezio da onena?`, `Un negocio cobra ${p} € y tiene ${q} clientes; cada euro de subida pierde ${k} clientes. ¿Qué precio es el mejor?`, `يتقاضى نشاط تجاري ${p} € وله ${q} زبونًا؛ وكل يورو زيادة يُفقده ${k} زبائن. ما أفضل سعر؟`, `A business charges €${p} and has ${q} customers; each euro of rise loses ${k} customers. Which price is best?`),
                lines: [line(LABELS.function, `I(x)=(${p}+x)(${q}-${k}x)`), line(LABELS.derivative, `I'(x)=0\\ \\to\\ x=${rise}`), line(LABELS.result, `${rise}`)],
                wrong: 2, error, fix: `${p}+${rise}=${p + rise}`, right: p + rise, reached: rise
            }
        }
        case 'product': {
            const s = 2 * randomInt(random, 5, 20)
            return {
                problem: say(`Bi zenbaki positiboren batura ${s} da. Zein da lehena, biderkadura handiena izan dadin?`, `Dos números positivos suman ${s}. ¿Cuál es el primero si su producto es máximo?`, `مجموع عددين موجبين ${s}. ما الأول إذا كان جداؤهما أعظميًا؟`, `Two positive numbers add up to ${s}. What is the first one if their product is highest?`),
                lines: [line(LABELS.function, `P(x)=x(${s}-x)`), line(LABELS.derivative, `P'(x)=${s}-x`), line(LABELS.result, `x=${s}`)],
                wrong: 1, error, fix: `P'(x)=${s}-2x\\ \\to\\ x=${s / 2}`, right: s / 2, reached: s
            }
        }
    }
}

export const bach2gApplicationsDetectiveNames: Record<Bach2gApplicationsDetectiveError, LocalizedText> = {
    'slope-in-x': say('Maldan $x$ utzi du, $a$ ordezkatu gabe', 'Dejó $x$ en la pendiente sin sustituir $a$', 'ترك $x$ في الميل دون تعويض $a$', 'Left $x$ in the slope without substituting $a$'),
    intercept: say('Zuzenaren $n$ hartu du malda gisa', 'Tomó la $n$ de la recta como pendiente', 'أخذ $n$ المستقيم على أنه الميل', 'Took the $n$ of the line as its slope'),
    'sign-of-f': say('$f$ funtzioaren zeinua begiratu du, ez $f\'$ deribatuarena', 'Miró el signo de $f$, no el de $f\'$', 'نظر إلى إشارة $f$ لا إشارة $f\'$', 'Looked at the sign of $f$, not of $f\'$'),
    'model-interval': say('Ereduaren tartea ahaztu du', 'Olvidó el intervalo del modelo', 'نسي فترة النموذج', 'Forgot the interval of the model'),
    'flat-point': say('$f\'=0$ hartu du mutur gisa, zeinua aldatzen ez bada ere', 'Tomó $f\'=0$ como extremo aunque no cambia de signo', 'عدّ $f\'=0$ قيمة قصوى رغم أن الإشارة لا تتغير', 'Took $f\'=0$ as an extremum though the sign does not change'),
    ends: say('Tartearen muturrak ahaztu ditu', 'Olvidó los extremos del intervalo', 'نسي طرفي الفترة', 'Forgot the ends of the interval'),
    'second-reversed': say('$f\'\'$ alderantziz irakurri du', 'Leyó $f\'\'$ al revés', 'قرأ $f\'\'$ بالعكس', 'Read $f\'\'$ the wrong way round'),
    'one-equation': say('Baldintza bakarra erabili du bi parametrorako', 'Usó una sola condición para dos parámetros', 'استعمل شرطًا واحدًا لوسيطين', 'Used one condition for two parameters'),
    'cost-term': say('Kostuaren gai bat galdu du deribatzean', 'Perdió un término del coste al derivar', 'أضاع حدًّا من التكلفة عند الاشتقاق', 'Lost a term of the cost when differentiating'),
    'average-derivative': say('$\\frac{c}{x}$ gaizki deribatu du', 'Derivó mal $\\frac{c}{x}$', 'اشتق $\\frac{c}{x}$ خطأً', 'Differentiated $\\frac{c}{x}$ wrongly'),
    'rise-for-price': say('Igoera eman du prezioaren ordez', 'Dio la subida en lugar del precio', 'أعطى الزيادة بدل السعر', 'Gave the rise instead of the price'),
    product: say('$x(S-x)$ gaizki deribatu du', 'Derivó mal $x(S-x)$', 'اشتق $x(S-x)$ خطأً', 'Differentiated $x(S-x)$ wrongly')
}

export const bach2gApplicationsDetectiveTips: Record<Bach2gApplicationsDetectiveError, LocalizedText> = {
    'slope-in-x': say('Zuzen ukitzailearen malda zenbaki bat da: $f\'(a)$.', 'La pendiente de la tangente es un número: $f\'(a)$.', 'ميل المماس عدد: $f\'(a)$.', 'The slope of the tangent is a number: $f\'(a)$.'),
    intercept: say('$y=mx+n$ zuzenaren malda $m$ da.', 'La pendiente de $y=mx+n$ es $m$.', 'ميل $y=mx+n$ هو $m$.', 'The slope of $y=mx+n$ is $m$.'),
    'sign-of-f': say('$f\'>0$: gorakorra; $f\'<0$: beherakorra.', '$f\'>0$: crece; $f\'<0$: decrece.', '$f\'>0$: متزايدة؛ $f\'<0$: متناقصة.', '$f\'>0$: increasing; $f\'<0$: decreasing.'),
    'model-interval': say('Erantzunak ereduaren tartean egon behar du.', 'La respuesta tiene que estar en el intervalo del modelo.', 'يجب أن تكون الإجابة في فترة النموذج.', 'The answer must lie in the interval of the model.'),
    'flat-point': say('Mutur bat egoteko $f\'$ zeinuz aldatu behar da.', 'Para que haya extremo, $f\'$ tiene que cambiar de signo.', 'لتوجد قيمة قصوى يجب أن تتغير إشارة $f\'$.', 'For an extremum, $f\'$ must change sign.'),
    ends: say('Alderatu puntu singularrak eta tartearen muturrak.', 'Compara los puntos singulares y los extremos del intervalo.', 'قارن النقاط الحرجة بطرفي الفترة.', 'Compare the stationary points and the ends of the interval.'),
    'second-reversed': say('$f\'\'<0$: maximoa (∩); $f\'\'>0$: minimoa (∪).', '$f\'\'<0$: máximo (∩); $f\'\'>0$: mínimo (∪).', '$f\'\'<0$: عظمى (∩)؛ $f\'\'>0$: صغرى (∪).', '$f\'\'<0$: maximum (∩); $f\'\'>0$: minimum (∪).'),
    'one-equation': say('«Minimoa $(p,q)$ puntuan»: $f\'(p)=0$ eta $f(p)=q$.', '«Mínimo en $(p,q)$»: $f\'(p)=0$ y $f(p)=q$.', '«صغرى عند $(p,q)$»: $f\'(p)=0$ و$f(p)=q$.', '«Minimum at $(p,q)$»: $f\'(p)=0$ and $f(p)=q$.'),
    'cost-term': say("$B'(x)=I'(x)-C'(x)$: kostuaren gai guztiak.", "$B'(x)=I'(x)-C'(x)$: todos los términos del coste.", "$B'(x)=I'(x)-C'(x)$: كل حدود التكلفة.", "$B'(x)=I'(x)-C'(x)$: every term of the cost."),
    'average-derivative': say("$\\left(\\frac{c}{x}\\right)'=-\\frac{c}{x^2}$.", "$\\left(\\frac{c}{x}\\right)'=-\\frac{c}{x^2}$.", "$\\left(\\frac{c}{x}\\right)'=-\\frac{c}{x^2}$.", "$\\left(\\frac{c}{x}\\right)'=-\\frac{c}{x^2}$."),
    'rise-for-price': say('Prezioa hasierakoa gehi igoera da.', 'El precio es el inicial más la subida.', 'السعر هو الأولي زائد الزيادة.', 'The price is the starting one plus the rise.'),
    product: say("$(Sx-x^2)'=S-2x$.", "$(Sx-x^2)'=S-2x$.", "$(Sx-x^2)'=S-2x$.", "$(Sx-x^2)'=S-2x$.")
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBach2gApplicationsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bach2gApplicationsDetectiveLevels[levelIndex], BACH2G_APPLICATIONS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH2G_APPLICATIONS_DETECTIVE_ERRORS = bach2gApplicationsDetectiveLevels.flat()
