import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../features/unit-v2/games/workedDetective.ts'
import { fraction, toLatex } from '../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'
import { polyLatex } from './polynomials.ts'

/* ==========================================================================
   Grafikoen detektibea (4. DBH: applied graphs, academic polynomial and
   rational functions, academic exponentials): a worked solution of three
   lines with one wrong line, every line ending on a number. Lines,
   parabolas, shifts and absolute values, hyperbolas, exponentials and
   logarithms; each unit takes its own three levels.
   ========================================================================== */

export type GraphsDetectiveError =
    | 'slope-upside-down'
    | 'intercept-from-x-cut'
    | 'perpendicular-same-slope'
    | 'point-slope-sign'
    | 'vertex-sign'
    | 'vertex-form-sign'
    | 'vertex-y-wrong'
    | 'y-cut-as-a'
    | 'shift-direction'
    | 'stretch-as-shift'
    | 'abs-vertex-sign'
    | 'asymptote-sign'
    | 'horizontal-asymptote-zero'
    | 'negative-exponent'
    | 'coefficient-into-base'
    | 'zero-power'
    | 'log-of-product'
    | 'log-of-sum'
    | 'log-as-division'
    | 'log-of-power'

export type GraphsTrack = 'graphs' | 'polynomial' | 'exponential'

export const graphsDetectiveLevels: Record<GraphsTrack, GraphsDetectiveError[][]> = {
    graphs: [
        ['slope-upside-down', 'intercept-from-x-cut', 'perpendicular-same-slope', 'point-slope-sign'],
        ['vertex-sign', 'vertex-form-sign', 'vertex-y-wrong', 'y-cut-as-a'],
        ['asymptote-sign', 'horizontal-asymptote-zero', 'negative-exponent', 'coefficient-into-base']
    ],
    polynomial: [
        ['vertex-sign', 'vertex-form-sign', 'vertex-y-wrong', 'y-cut-as-a'],
        ['shift-direction', 'stretch-as-shift', 'abs-vertex-sign', 'point-slope-sign'],
        ['asymptote-sign', 'horizontal-asymptote-zero', 'perpendicular-same-slope', 'intercept-from-x-cut']
    ],
    exponential: [
        ['negative-exponent', 'coefficient-into-base', 'zero-power', 'horizontal-asymptote-zero'],
        ['log-of-product', 'log-of-sum', 'log-as-division', 'log-of-power'],
        ['shift-direction', 'stretch-as-shift', 'asymptote-sign', 'negative-exponent']
    ]
}

export const GRAPHS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    slope: say('Malda', 'Pendiente', 'الميل', 'Slope'),
    intercept: say('Jatorriko ordenatua', 'Ordenada en el origen', 'الجزء المقطوع من محور y', 'y-intercept'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    vertex: say('Erpina', 'Vértice', 'الرأس', 'Vertex'),
    formula: say('Formula', 'Fórmula', 'القانون', 'Formula'),
    shift: say('Lekualdaketa', 'Traslación', 'الإزاحة', 'Shift'),
    asymptote: say('Asintota', 'Asíntota', 'المقارب', 'Asymptote'),
    power: say('Berretura', 'Potencia', 'القوة', 'Power'),
    property: say('Propietatea', 'Propiedad', 'الخاصية', 'Property'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute')
}

export const graphsDetectiveNames: Record<GraphsDetectiveError, LocalizedText> = {
    'slope-upside-down': say('Malda alderantziz kalkulatu du', 'Calculó la pendiente al revés', 'حسب الميل بالعكس', 'Worked out the slope upside down'),
    'intercept-from-x-cut': say('X ardatzarekiko ebakidura hartu du ordenatutzat', 'Tomó el corte con el eje X como ordenada en el origen', 'اعتبر التقاطع مع محور x جزءًا مقطوعًا من y', 'Took the cut with the x-axis as the y-intercept'),
    'perpendicular-same-slope': say('Zuzen perpendikularrari malda bera jarri dio', 'A la perpendicular le puso la misma pendiente', 'جعل للعمودي الميل نفسه', 'Gave the perpendicular line the same slope'),
    'point-slope-sign': say('Puntu-malda ekuazioan zeinua aldatu du', 'Cambió el signo en la ecuación punto-pendiente', 'غيّر الإشارة في معادلة النقطة والميل', 'Changed the sign in the point-slope equation'),
    'vertex-sign': say('Erpina $\\frac{b}{2a}$-n jarri du, ez $-\\frac{b}{2a}$-n', 'Puso el vértice en $\\frac{b}{2a}$ en vez de $-\\frac{b}{2a}$', 'وضع الرأس عند $\\frac{b}{2a}$ بدل $-\\frac{b}{2a}$', 'Put the vertex at $\\frac{b}{2a}$ instead of $-\\frac{b}{2a}$'),
    'vertex-form-sign': say('$(x+h)^{2}$ formatik erpina $x=h$-n dagoela esan du', 'De $(x+h)^{2}$ dedujo el vértice en $x=h$', 'استنتج من $(x+h)^{2}$ أن الرأس عند $x=h$', 'From $(x+h)^{2}$ said the vertex is at $x=h$'),
    'vertex-y-wrong': say('Erpinaren y kalkulatzean ordezkatzean huts egin du', 'Al sustituir para la y del vértice se equivocó', 'أخطأ في التعويض لإيجاد y الرأس', 'Substituted wrongly to find the y of the vertex'),
    'y-cut-as-a': say('Y ardatzarekiko ebakidura a dela esan du, ez c', 'Dijo que el corte con el eje Y es a y no c', 'قال إن التقاطع مع محور y هو a لا c', 'Said the cut with the y-axis is a, not c'),
    'shift-direction': say('$f(x-a)$ ezkerrera mugitzen dela esan du', 'Dijo que $f(x-a)$ se mueve a la izquierda', 'قال إن $f(x-a)$ تتحرك إلى اليسار', 'Said $f(x-a)$ moves to the left'),
    'stretch-as-shift': say('$2f(x)$ eta $f(x)+2$ nahastu ditu', 'Confundió $2f(x)$ con $f(x)+2$', 'خلط بين $2f(x)$ و$f(x)+2$', 'Mixed up $2f(x)$ and $f(x)+2$'),
    'abs-vertex-sign': say('Balio absolutuaren erpinaren zeinua aldatu du', 'Cambió el signo del vértice del valor absoluto', 'غيّر إشارة رأس القيمة المطلقة', 'Changed the sign of the vertex of the absolute value'),
    'asymptote-sign': say('Asintota bertikala zeinu okerrarekin jarri du', 'Puso la asíntota vertical con el signo cambiado', 'وضع المقارب العمودي بإشارة معكوسة', 'Put the vertical asymptote with the wrong sign'),
    'horizontal-asymptote-zero': say('Asintota horizontala beti $y=0$ dela pentsatu du', 'Pensó que la asíntota horizontal siempre es $y=0$', 'ظن أن المقارب الأفقي دائمًا $y=0$', 'Thought the horizontal asymptote is always $y=0$'),
    'negative-exponent': say('Berretzaile negatiboak emaitza negatiboa ematen duela pentsatu du', 'Pensó que un exponente negativo da un resultado negativo', 'ظن أن الأس السالب يعطي نتيجة سالبة', 'Thought that a negative exponent gives a negative result'),
    'coefficient-into-base': say('Koefizientea oinarrian sartu du: $2\\cdot 3^{x}=6^{x}$', 'Metió el coeficiente en la base: $2\\cdot 3^{x}=6^{x}$', 'أدخل المعامل في الأساس: $2\\cdot 3^{x}=6^{x}$', 'Put the coefficient into the base: $2\\cdot 3^{x}=6^{x}$'),
    'zero-power': say('$b^{0}=0$ dela pentsatu du', 'Pensó que $b^{0}=0$', 'ظن أن $b^{0}=0$', 'Thought that $b^{0}=0$'),
    'log-of-product': say('Biderkadura baten logaritmoa logaritmoen biderkadura dela pentsatu du', 'Pensó que el logaritmo de un producto es el producto de logaritmos', 'ظن أن لوغاريتم الجداء جداء اللوغاريتمات', 'Thought the log of a product is the product of the logs'),
    'log-of-sum': say('Batura baten logaritmoa logaritmoen batura dela pentsatu du', 'Pensó que el logaritmo de una suma es la suma de logaritmos', 'ظن أن لوغاريتم المجموع مجموع اللوغاريتمات', 'Thought the log of a sum is the sum of the logs'),
    'log-as-division': say('Logaritmoa zatiketa balitz bezala kalkulatu du', 'Calculó el logaritmo como si fuera una división', 'حسب اللوغاريتم كأنه قسمة', 'Worked out the logarithm as if it were a division'),
    'log-of-power': say('$\\log(a^{n})=(\\log a)^{n}$ egin du', 'Hizo $\\log(a^{n})=(\\log a)^{n}$', 'كتب $\\log(a^{n})=(\\log a)^{n}$', 'Wrote $\\log(a^{n})=(\\log a)^{n}$')
}

export const graphsDetectiveTips: Record<GraphsDetectiveError, LocalizedText> = {
    'slope-upside-down': say('$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.', '$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.', '$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.', '$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.'),
    'intercept-from-x-cut': say('Ordenatua: $x=0$ denean y-ren balioa.', 'La ordenada en el origen: el valor de y cuando $x=0$.', 'الجزء المقطوع: قيمة y عندما $x=0$.', 'The y-intercept: the value of y when $x=0$.'),
    'perpendicular-same-slope': say('Perpendikularrak: $m_{2}=-\\frac{1}{m_{1}}$.', 'Perpendiculares: $m_{2}=-\\frac{1}{m_{1}}$.', 'المتعامدان: $m_{2}=-\\frac{1}{m_{1}}$.', 'Perpendicular: $m_{2}=-\\frac{1}{m_{1}}$.'),
    'point-slope-sign': say('$y-y_{0}=m(x-x_{0})$: puntuaren koordenatuak kenduz.', '$y-y_{0}=m(x-x_{0})$: se restan las coordenadas del punto.', '$y-y_{0}=m(x-x_{0})$: نطرح إحداثيي النقطة.', '$y-y_{0}=m(x-x_{0})$: subtract the coordinates of the point.'),
    'vertex-sign': say('$x_{v}=-\\frac{b}{2a}$.', '$x_{v}=-\\frac{b}{2a}$.', '$x_{v}=-\\frac{b}{2a}$.', '$x_{v}=-\\frac{b}{2a}$.'),
    'vertex-form-sign': say('$y=(x+3)^{2}$: erpina $x=-3$ puntuan.', '$y=(x+3)^{2}$: el vértice está en $x=-3$.', '$y=(x+3)^{2}$: الرأس عند $x=-3$.', '$y=(x+3)^{2}$: the vertex is at $x=-3$.'),
    'vertex-y-wrong': say('$y_{v}=f(x_{v})$: ordeztu kontu handiz, negatiboak parentesi artean.', '$y_{v}=f(x_{v})$: sustituye con cuidado, los negativos entre paréntesis.', '$y_{v}=f(x_{v})$: عوّض بعناية والسالب بين قوسين.', '$y_{v}=f(x_{v})$: substitute carefully, negatives in brackets.'),
    'y-cut-as-a': say('$y=ax^{2}+bx+c$: $x=0$ denean $y=c$.', '$y=ax^{2}+bx+c$: si $x=0$, $y=c$.', '$y=ax^{2}+bx+c$: إذا $x=0$ فإن $y=c$.', '$y=ax^{2}+bx+c$: when $x=0$, $y=c$.'),
    'shift-direction': say('$f(x-3)$ eskuinera mugitzen da 3 unitate.', '$f(x-3)$ se traslada 3 unidades a la derecha.', '$f(x-3)$ تُزاح 3 وحدات إلى اليمين.', '$f(x-3)$ moves 3 units to the right.'),
    'stretch-as-shift': say('$2f(x)$ luzatu egiten du; $f(x)+2$ gora mugitzen du.', '$2f(x)$ estira; $f(x)+2$ sube.', '$2f(x)$ تمدّد؛ $f(x)+2$ ترفع.', '$2f(x)$ stretches; $f(x)+2$ moves up.'),
    'abs-vertex-sign': say('$y=|x+2|$: erpina $x=-2$ puntuan.', '$y=|x+2|$: el vértice está en $x=-2$.', '$y=|x+2|$: الرأس عند $x=-2$.', '$y=|x+2|$: the vertex is at $x=-2$.'),
    'asymptote-sign': say('$y=\\frac{k}{x+2}$: asintota bertikala $x=-2$.', '$y=\\frac{k}{x+2}$: asíntota vertical $x=-2$.', '$y=\\frac{k}{x+2}$: المقارب العمودي $x=-2$.', '$y=\\frac{k}{x+2}$: vertical asymptote $x=-2$.'),
    'horizontal-asymptote-zero': say('Gora edo behera mugitzean asintota ere mugitzen da: $y=k$.', 'Al subir o bajar la gráfica, la asíntota también se mueve: $y=k$.', 'عند إزاحة التمثيل يتحرك المقارب أيضًا: $y=k$.', 'Moving the graph up or down moves the asymptote too: $y=k$.'),
    'negative-exponent': say('$2^{-3}=\\frac{1}{2^{3}}=\\frac{1}{8}$: positiboa.', '$2^{-3}=\\frac{1}{2^{3}}=\\frac{1}{8}$: positivo.', '$2^{-3}=\\frac{1}{2^{3}}=\\frac{1}{8}$: موجب.', '$2^{-3}=\\frac{1}{2^{3}}=\\frac{1}{8}$: positive.'),
    'coefficient-into-base': say('Lehenik berretura, gero biderketa: $2\\cdot 3^{2}=18$.', 'Primero la potencia y después el producto: $2\\cdot 3^{2}=18$.', 'القوة أولًا ثم الضرب: $2\\cdot 3^{2}=18$.', 'First the power, then the product: $2\\cdot 3^{2}=18$.'),
    'zero-power': say('Zeroz besteko edozein zenbaki ber zero: 1.', 'Cualquier número distinto de 0 elevado a 0 es 1.', 'أي عدد غير الصفر أسّه 0 يساوي 1.', 'Any number other than 0 to the power 0 is 1.'),
    'log-of-product': say('$\\log(a\\cdot b)=\\log a+\\log b$.', '$\\log(a\\cdot b)=\\log a+\\log b$.', '$\\log(a\\cdot b)=\\log a+\\log b$.', '$\\log(a\\cdot b)=\\log a+\\log b$.'),
    'log-of-sum': say('Batura baten logaritmoak ez du araurik: kalkulatu barrukoa lehenik.', 'El logaritmo de una suma no tiene regla: calcula primero lo de dentro.', 'لوغاريتم المجموع بلا قاعدة: احسب ما بالداخل أولًا.', 'The log of a sum has no rule: work out the inside first.'),
    'log-as-division': say('$\\log_{2}8=3$, $2^{3}=8$ delako; ez $8\\div 2$.', '$\\log_{2}8=3$ porque $2^{3}=8$; no $8\\div 2$.', '$\\log_{2}8=3$ لأن $2^{3}=8$؛ وليس $8\\div 2$.', '$\\log_{2}8=3$ because $2^{3}=8$; not $8\\div 2$.'),
    'log-of-power': say('$\\log(a^{n})=n\\cdot\\log a$.', '$\\log(a^{n})=n\\cdot\\log a$.', '$\\log(a^{n})=n\\cdot\\log a$.', '$\\log(a^{n})=n\\cdot\\log a$.')
}

const nonzero = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => index + min).filter((value) => value !== 0)
const p = (value: number) => (value < 0 ? `(${value})` : String(value))
const v = (numerator: number, denominator = 1) => toLatex(fraction(numerator, denominator))
const inside = (h: number) => (h === 0 ? 'x' : h > 0 ? `x-${h}` : `x+${-h}`)

type Built = Omit<WorkedCase<GraphsDetectiveError>, 'options'>

function build(random: Random, error: GraphsDetectiveError): Built | null {
    switch (error) {
        case 'slope-upside-down': {
            const [x1, y1] = [randomInt(random, -3, 1), randomInt(random, -3, 3)]
            const run = pick(random, [1, 2, 3])
            const m = pick(random, [2, 3, -2, -3])
            const [x2, y2] = [x1 + run, y1 + m * run]
            return {
                problem: say(`Kalkulatu $(${x1},${y1})$ eta $(${x2},${y2})$ puntuetatik pasatzen den zuzenaren malda.`, `Calcula la pendiente de la recta que pasa por $(${x1},${y1})$ y $(${x2},${y2})$.`, `احسب ميل المستقيم المار بالنقطتين $(${x1},${y1})$ و$(${x2},${y2})$.`, `Work out the slope of the line through $(${x1},${y1})$ and $(${x2},${y2})$.`),
                lines: [line(LABELS.data, `\\Delta x=${run},\\ \\Delta y=${m * run}`), line(LABELS.slope, `m=\\frac{${run}}{${m * run}}`), line(LABELS.result, `m=${v(run, m * run)}`)],
                wrong: 1, error, fix: `m=\\frac{${m * run}}{${run}}=${m}`, right: m, reached: 1 / m
            }
        }
        case 'intercept-from-x-cut': {
            const m = pick(random, [2, 3, -2])
            const root = pick(random, nonzero(-4, 4))
            const n = -m * root
            return {
                problem: say(`Zuzen batek $${m}$ malda du eta X ardatza $x=${root}$ puntuan mozten du. Kalkulatu jatorriko ordenatua.`, `Una recta de pendiente $${m}$ corta al eje X en $x=${root}$. Halla su ordenada en el origen.`, `مستقيم ميله $${m}$ يقطع محور x عند $x=${root}$. أوجد الجزء المقطوع من محور y.`, `A line with slope $${m}$ cuts the x-axis at $x=${root}$. Find its y-intercept.`),
                lines: [line(LABELS.data, `m=${m},\\ (${root},0)`), line(LABELS.intercept, `n=${root}`), line(LABELS.result, `n=${root}`)],
                wrong: 1, error, fix: `0=${m}\\cdot ${p(root)}+n\\ \\to\\ n=${n}`, right: n, reached: root
            }
        }
        case 'perpendicular-same-slope': {
            const m = pick(random, [2, 3, -2, -4])
            const b = randomInt(random, -4, 4)
            return {
                problem: say(`Aurkitu $y=${polyLatex([m, b])}$ zuzenaren perpendikularraren malda.`, `Halla la pendiente de una recta perpendicular a $y=${polyLatex([m, b])}$.`, `أوجد ميل مستقيم عمودي على $y=${polyLatex([m, b])}$.`, `Find the slope of a line perpendicular to $y=${polyLatex([m, b])}$.`),
                lines: [line(LABELS.slope, `m_{1}=${m}`), line(LABELS.slope, `m_{2}=m_{1}`), line(LABELS.result, `m_{2}=${m}`)],
                wrong: 1, error, fix: `m_{2}=-\\frac{1}{${m}}=${v(-1, m)}`, right: -1 / m, reached: m
            }
        }
        case 'point-slope-sign': {
            const m = pick(random, [2, 3, -2])
            const [x0, y0] = [pick(random, nonzero(-4, 4)), pick(random, nonzero(-4, 4))]
            const right = y0 - m * x0
            const reached = y0 + m * x0
            if (right === reached) return null
            return {
                problem: say(`$(${x0},${y0})$ puntutik pasatzen den eta $${m}$ malda duen zuzena: kalkulatu jatorriko ordenatua.`, `La recta de pendiente $${m}$ que pasa por $(${x0},${y0})$: halla su ordenada en el origen.`, `المستقيم الذي ميله $${m}$ ويمر بـ $(${x0},${y0})$: أوجد الجزء المقطوع من محور y.`, `The line with slope $${m}$ through $(${x0},${y0})$: find its y-intercept.`),
                lines: [line(LABELS.formula, `y-${p(y0)}=${m}(x+${p(x0)})`), line(LABELS.substitute, `y(0)=${y0}${m < 0 ? '' : '+'}${m}\\cdot ${p(x0)}`), line(LABELS.result, `n=${reached}`)],
                wrong: 0, error, fix: `y-${p(y0)}=${m}(x-${p(x0)})\\ \\to\\ n=${right}`, right, reached
            }
        }
        case 'vertex-sign': {
            const xv = pick(random, nonzero(-4, 4))
            const c = randomInt(random, -5, 5)
            const b = -2 * xv
            return {
                problem: say(`Aurkitu $y=${polyLatex([1, b, c])}$ parabolaren erpinaren x.`, `Halla la x del vértice de $y=${polyLatex([1, b, c])}$.`, `أوجد x رأس القطع $y=${polyLatex([1, b, c])}$.`, `Find the x of the vertex of $y=${polyLatex([1, b, c])}$.`),
                lines: [line(LABELS.data, `a=1,\\ b=${b}`), line(LABELS.vertex, `x_{v}=\\frac{${b}}{2}`), line(LABELS.result, `x_{v}=${-xv}`)],
                wrong: 1, error, fix: `x_{v}=-\\frac{${b}}{2}=${xv}`, right: xv, reached: -xv
            }
        }
        case 'vertex-form-sign': {
            const h = pick(random, nonzero(-5, 5))
            const k = randomInt(random, -5, 5)
            return {
                problem: say(`Zein da $y=(${inside(h)})^{2}${k < 0 ? k : `+${k}`}$ parabolaren erpinaren x?`, `¿Cuál es la x del vértice de $y=(${inside(h)})^{2}${k < 0 ? k : `+${k}`}$?`, `ما x رأس القطع $y=(${inside(h)})^{2}${k < 0 ? k : `+${k}`}$؟`, `What is the x of the vertex of $y=(${inside(h)})^{2}${k < 0 ? k : `+${k}`}$?`),
                lines: [line(LABELS.formula, `y=(x-h)^{2}+k`), line(LABELS.vertex, `h=${-h}`), line(LABELS.result, `x_{v}=${-h}`)],
                wrong: 1, error, fix: `h=${h}\\ \\to\\ x_{v}=${h}`, right: h, reached: -h
            }
        }
        case 'vertex-y-wrong': {
            const xv = pick(random, [-3, -2, -1])
            const c = randomInt(random, -4, 6)
            const b = -2 * xv
            const right = xv * xv + b * xv + c
            const reached = -(xv * xv) + b * xv + c
            return {
                problem: say(`Aurkitu $y=${polyLatex([1, b, c])}$ parabolaren erpina.`, `Halla el vértice de $y=${polyLatex([1, b, c])}$.`, `أوجد رأس القطع $y=${polyLatex([1, b, c])}$.`, `Find the vertex of $y=${polyLatex([1, b, c])}$.`),
                lines: [line(LABELS.vertex, `x_{v}=-\\frac{${b}}{2}=${xv}`), line(LABELS.substitute, `y_{v}=${xv}^{2}+${b}\\cdot ${p(xv)}${c < 0 ? c : `+${c}`}`), line(LABELS.result, `y_{v}=${reached}`)],
                wrong: 1, error, fix: `(${xv})^{2}=${xv * xv}\\ \\to\\ y_{v}=${right}`, right, reached
            }
        }
        case 'y-cut-as-a': {
            const a = pick(random, [2, 3, -2, -1])
            const b = randomInt(random, -5, 5)
            const c = pick(random, nonzero(-6, 6))
            if (a === c) return null
            return {
                problem: say(`Non mozten du $y=${polyLatex([a, b, c])}$ parabolak Y ardatza?`, `¿Dónde corta $y=${polyLatex([a, b, c])}$ al eje Y?`, `أين يقطع $y=${polyLatex([a, b, c])}$ محور y؟`, `Where does $y=${polyLatex([a, b, c])}$ cut the y-axis?`),
                lines: [line(LABELS.data, `a=${a},\\ b=${b},\\ c=${c}`), line(LABELS.formula, `y=a`), line(LABELS.result, `y=${a}`)],
                wrong: 1, error, fix: `x=0\\ \\to\\ y=${c}`, right: c, reached: a
            }
        }
        case 'shift-direction': {
            const shift = randomInt(random, 2, 5)
            const vertex = randomInt(random, -2, 2)
            return {
                problem: say(`$f(x)$ funtzioaren erpina $x=${vertex}$ puntuan dago. Non dago $f(x-${shift})$ funtzioarena?`, `El vértice de $f(x)$ está en $x=${vertex}$. ¿Dónde está el de $f(x-${shift})$?`, `رأس $f(x)$ عند $x=${vertex}$. أين رأس $f(x-${shift})$؟`, `The vertex of $f(x)$ is at $x=${vertex}$. Where is the vertex of $f(x-${shift})$?`),
                lines: [line(LABELS.shift, `x-${shift}`), line(LABELS.shift, `\\leftarrow ${shift}`), line(LABELS.result, `x=${vertex - shift}`)],
                wrong: 1, error, fix: `\\rightarrow ${shift}\\ \\to\\ x=${vertex + shift}`, right: vertex + shift, reached: vertex - shift
            }
        }
        case 'stretch-as-shift': {
            const k = randomInt(random, 2, 4)
            const fx = pick(random, nonzero(-5, 5))
            return {
                problem: say(`$f(1)=${fx}$ bada, kalkulatu $g(1)$, $g(x)=${k}f(x)$ izanik.`, `Si $f(1)=${fx}$, calcula $g(1)$ siendo $g(x)=${k}f(x)$.`, `إذا كان $f(1)=${fx}$ فاحسب $g(1)$ حيث $g(x)=${k}f(x)$.`, `If $f(1)=${fx}$, work out $g(1)$ where $g(x)=${k}f(x)$.`),
                lines: [line(LABELS.formula, `g(x)=f(x)+${k}`), line(LABELS.substitute, `g(1)=${fx}+${k}`), line(LABELS.result, `g(1)=${fx + k}`)],
                wrong: 0, error, fix: `g(1)=${k}\\cdot ${p(fx)}=${k * fx}`, right: k * fx, reached: fx + k
            }
        }
        case 'abs-vertex-sign': {
            const h = pick(random, nonzero(-5, 5))
            const k = randomInt(random, -4, 4)
            return {
                problem: say(`Zein da $y=|${inside(h)}|${k < 0 ? k : `+${k}`}$ funtzioaren erpinaren x?`, `¿Cuál es la x del vértice de $y=|${inside(h)}|${k < 0 ? k : `+${k}`}$?`, `ما x رأس $y=|${inside(h)}|${k < 0 ? k : `+${k}`}$؟`, `What is the x of the vertex of $y=|${inside(h)}|${k < 0 ? k : `+${k}`}$?`),
                lines: [line(LABELS.vertex, `${inside(h)}=0`), line(LABELS.vertex, `x=${-h}`), line(LABELS.result, `x_{v}=${-h}`)],
                wrong: 1, error, fix: `x=${h}`, right: h, reached: -h
            }
        }
        case 'asymptote-sign': {
            const h = pick(random, nonzero(-5, 5))
            const k = pick(random, [-4, -3, 2, 3, 5])
            return {
                problem: say(`Aurkitu $y=\\frac{${k}}{${inside(h)}}$ funtzioaren asintota bertikala.`, `Halla la asíntota vertical de $y=\\frac{${k}}{${inside(h)}}$.`, `أوجد المقارب العمودي لـ $y=\\frac{${k}}{${inside(h)}}$.`, `Find the vertical asymptote of $y=\\frac{${k}}{${inside(h)}}$.`),
                lines: [line(LABELS.asymptote, `${inside(h)}=0`), line(LABELS.asymptote, `x=${-h}`), line(LABELS.result, `x=${-h}`)],
                wrong: 1, error, fix: `x=${h}`, right: h, reached: -h
            }
        }
        case 'horizontal-asymptote-zero': {
            const k = pick(random, nonzero(-5, 5))
            const exp = random() < 0.5
            const formula = exp ? `y=2^{x}${k < 0 ? k : `+${k}`}` : `y=\\frac{3}{x}${k < 0 ? k : `+${k}`}`
            return {
                problem: say(`Aurkitu $${formula}$ funtzioaren asintota horizontala.`, `Halla la asíntota horizontal de $${formula}$.`, `أوجد المقارب الأفقي لـ $${formula}$.`, `Find the horizontal asymptote of $${formula}$.`),
                lines: [line(LABELS.formula, formula), line(LABELS.asymptote, exp ? '2^{x}\\to 0' : '\\frac{3}{x}\\to 0'), line(LABELS.result, 'y=0')],
                wrong: 2, error, fix: `y=0${k < 0 ? k : `+${k}`}=${k}`, right: k, reached: 0
            }
        }
        case 'negative-exponent': {
            const base = pick(random, [2, 3, 4])
            const n = randomInt(random, 2, 3)
            return {
                problem: say(`$f(x)=${base}^{x}$. Kalkulatu $f(-${n})$.`, `$f(x)=${base}^{x}$. Calcula $f(-${n})$.`, `$f(x)=${base}^{x}$. احسب $f(-${n})$.`, `$f(x)=${base}^{x}$. Work out $f(-${n})$.`),
                lines: [line(LABELS.substitute, `f(-${n})=${base}^{-${n}}`), line(LABELS.power, `${base}^{-${n}}=-${base ** n}`), line(LABELS.result, `-${base ** n}`)],
                wrong: 1, error, fix: `${base}^{-${n}}=\\frac{1}{${base ** n}}`, right: 1 / base ** n, reached: -(base ** n)
            }
        }
        case 'coefficient-into-base': {
            const c = pick(random, [2, 3, 5])
            const base = pick(random, [2, 3])
            const x = randomInt(random, 2, 3)
            return {
                problem: say(`$f(x)=${c}\\cdot ${base}^{x}$. Kalkulatu $f(${x})$.`, `$f(x)=${c}\\cdot ${base}^{x}$. Calcula $f(${x})$.`, `$f(x)=${c}\\cdot ${base}^{x}$. احسب $f(${x})$.`, `$f(x)=${c}\\cdot ${base}^{x}$. Work out $f(${x})$.`),
                lines: [line(LABELS.formula, `${c}\\cdot ${base}^{x}=${c * base}^{x}`), line(LABELS.substitute, `${c * base}^{${x}}`), line(LABELS.result, `${(c * base) ** x}`)],
                wrong: 0, error, fix: `${c}\\cdot ${base}^{${x}}=${c}\\cdot ${base ** x}=${c * base ** x}`, right: c * base ** x, reached: (c * base) ** x
            }
        }
        case 'zero-power': {
            const c = pick(random, [2, 3, 4])
            const base = pick(random, [2, 5, 10])
            const k = randomInt(random, 1, 5)
            return {
                problem: say(`$f(x)=${c}\\cdot ${base}^{x}+${k}$. Non mozten du Y ardatza?`, `$f(x)=${c}\\cdot ${base}^{x}+${k}$. ¿Dónde corta al eje Y?`, `$f(x)=${c}\\cdot ${base}^{x}+${k}$. أين تقطع محور y؟`, `$f(x)=${c}\\cdot ${base}^{x}+${k}$. Where does it cut the y-axis?`),
                lines: [line(LABELS.substitute, `f(0)=${c}\\cdot ${base}^{0}+${k}`), line(LABELS.power, `${base}^{0}=0`), line(LABELS.result, `f(0)=${k}`)],
                wrong: 1, error, fix: `${base}^{0}=1\\ \\to\\ f(0)=${c + k}`, right: c + k, reached: k
            }
        }
        case 'log-of-product': {
            const [m, n] = pick(random, [[2, 3], [1, 4], [2, 2], [3, 2], [1, 3]] as const)
            return {
                problem: say(`Kalkulatu: $\\log_{2}(${2 ** m}\\cdot ${2 ** n})$`, `Calcula: $\\log_{2}(${2 ** m}\\cdot ${2 ** n})$`, `احسب: $\\log_{2}(${2 ** m}\\cdot ${2 ** n})$`, `Work out: $\\log_{2}(${2 ** m}\\cdot ${2 ** n})$`),
                lines: [line(LABELS.property, `\\log_{2}${2 ** m}\\cdot\\log_{2}${2 ** n}`), line(LABELS.substitute, `${m}\\cdot ${n}`), line(LABELS.result, `${m * n}`)],
                wrong: 0, error, fix: `${m}+${n}=${m + n}`, right: m + n, reached: m * n
            }
        }
        case 'log-of-sum': {
            // a + a = 2a, so log₂(2a) = log₂a + 1, never 2·log₂a unless a = 2
            const exponent = pick(random, [0, 2, 3, 4, 5])
            const a = 2 ** exponent
            return {
                problem: say(`Kalkulatu: $\\log_{2}(${a}+${a})$`, `Calcula: $\\log_{2}(${a}+${a})$`, `احسب: $\\log_{2}(${a}+${a})$`, `Work out: $\\log_{2}(${a}+${a})$`),
                lines: [line(LABELS.property, `\\log_{2}${a}+\\log_{2}${a}`), line(LABELS.substitute, `${exponent}+${exponent}`), line(LABELS.result, `${2 * exponent}`)],
                wrong: 0, error, fix: `\\log_{2}${2 * a}=${exponent + 1}`, right: exponent + 1, reached: 2 * exponent
            }
        }
        case 'log-as-division': {
            const base = pick(random, [2, 3, 5])
            const n = randomInt(random, 2, 4)
            if (base === 2 && n === 2) return null
            return {
                problem: say(`Kalkulatu: $\\log_{${base}}${base ** n}$`, `Calcula: $\\log_{${base}}${base ** n}$`, `احسب: $\\log_{${base}}${base ** n}$`, `Work out: $\\log_{${base}}${base ** n}$`),
                lines: [line(LABELS.formula, `\\log_{${base}}${base ** n}=x`), line(LABELS.substitute, `x=${base ** n}\\div ${base}`), line(LABELS.result, `x=${base ** (n - 1)}`)],
                wrong: 1, error, fix: `${base}^{x}=${base ** n}\\ \\to\\ x=${n}`, right: n, reached: base ** (n - 1)
            }
        }
        case 'log-of-power': {
            const base = pick(random, [2, 3])
            const m = randomInt(random, 2, 3)
            const n = randomInt(random, 2, 3)
            if (m * n === m ** n) return null
            return {
                problem: say(`Kalkulatu: $\\log_{${base}}(${base ** m})^{${n}}$`, `Calcula: $\\log_{${base}}(${base ** m})^{${n}}$`, `احسب: $\\log_{${base}}(${base ** m})^{${n}}$`, `Work out: $\\log_{${base}}(${base ** m})^{${n}}$`),
                lines: [line(LABELS.property, `(\\log_{${base}}${base ** m})^{${n}}`), line(LABELS.substitute, `${m}^{${n}}`), line(LABELS.result, `${m ** n}`)],
                wrong: 0, error, fix: `${n}\\cdot\\log_{${base}}${base ** m}=${n}\\cdot ${m}=${n * m}`, right: n * m, reached: m ** n
            }
        }
    }
}

export const createGraphsDetectiveCases = (track: GraphsTrack) => (random: Random, levelIndex: number) => createWorkedCases(random, graphsDetectiveLevels[track][levelIndex], GRAPHS_DETECTIVE_CASES, build)
