import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuen detektibea · Batxilergoa 2 · Gizarte Zientziak (Detective de
   derivadas de 2.º Sociales): a solved exercise with exactly one wrong
   line. Level 1, rate and point: the rate without dividing, f(a) taken
   for f'(a), the tangent with the slope f'(x), h left in the limit.
   Level 2, rules: (uv)' = u'v', the inside forgotten, (ln u)' = 1/u, the
   quotient with the subtraction the wrong way. Level 3, economy: the
   average taken for the next unit, a joint with one condition, f'' as
   (f')², the k of e^{kt} forgotten.
   ========================================================================== */

export type Bach2gDerivativesDetectiveError =
    | 'no-divide'
    | 'value-for-slope'
    | 'slope-in-x'
    | 'h-left'
    | 'product'
    | 'inside'
    | 'log-inside'
    | 'quotient-order'
    | 'average'
    | 'one-condition'
    | 'second-square'
    | 'exp-chain'

export const bach2gDerivativesDetectiveLevels: Bach2gDerivativesDetectiveError[][] = [
    ['no-divide', 'value-for-slope', 'slope-in-x', 'h-left'],
    ['product', 'inside', 'log-inside', 'quotient-order'],
    ['average', 'one-condition', 'second-square', 'exp-chain']
]

export const BACH2G_DERIVATIVES_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    substitute: say('Ordezkatu', 'Sustituye', 'عوّض', 'Substitute'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    derivative: say('Deribatua', 'Derivada', 'المشتقة', 'Derivative'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const derivAt = (formula: string, a: number) => say(`$f(x)=${formula}$. Kalkulatu $f'(${a})$.`, `$f(x)=${formula}$. Calcula $f'(${a})$.`, `$f(x)=${formula}$. احسب $f'(${a})$.`, `$f(x)=${formula}$. Work out $f'(${a})$.`)

type Built = Omit<WorkedCase<Bach2gDerivativesDetectiveError>, 'options'>

function build(random: Random, error: Bach2gDerivativesDetectiveError): Built | null {
    switch (error) {
        case 'no-divide': {
            const a = randomInt(random, 1, 3)
            const b = a + pick(random, [2, 3, 4])
            const change = b * b - a * a
            return {
                problem: say(`Kalkulatu $f(x)=x^2$ funtzioaren T.V.M. $[${a},${b}]$ tartean.`, `Calcula la T.V.M. de $f(x)=x^2$ en $[${a},${b}]$.`, `احسب معدل التغير المتوسط للدالة $f(x)=x^2$ في $[${a},${b}]$.`, `Work out the average rate of $f(x)=x^2$ on $[${a},${b}]$.`),
                lines: [line(LABELS.substitute, `f(${b})=${b * b}\\qquad f(${a})=${a * a}`), line(LABELS.step, `${b * b}-${a * a}=${change}`), line(LABELS.result, `${change}`)],
                wrong: 2, error, fix: `\\frac{${change}}{${b - a}}=${change / (b - a)}`, right: change / (b - a), reached: change
            }
        }
        case 'value-for-slope': {
            const a = randomInt(random, 2, 5)
            return {
                problem: say(`$f(x)=x^2+x$ kurbaren zuzen ukitzailearen malda $x=${a}$ puntuan.`, `La pendiente de la tangente a $f(x)=x^2+x$ en $x=${a}$.`, `ميل مماس $f(x)=x^2+x$ عند $x=${a}$.`, `The slope of the tangent to $f(x)=x^2+x$ at $x=${a}$.`),
                lines: [line(LABELS.derivative, "f'(x)=2x+1"), line(LABELS.step, `m=f(${a})=${a * a + a}`), line(LABELS.result, `${a * a + a}`)],
                wrong: 1, error, fix: `m=f'(${a})=${2 * a + 1}`, right: 2 * a + 1, reached: a * a + a
            }
        }
        case 'slope-in-x': {
            const a = randomInt(random, 1, 4)
            return {
                problem: say(`Idatzi $f(x)=x^2$ kurbaren zuzen ukitzailea $x=${a}$ puntuan.`, `Escribe la tangente a $f(x)=x^2$ en $x=${a}$.`, `اكتب مماس $f(x)=x^2$ عند $x=${a}$.`, `Write the tangent to $f(x)=x^2$ at $x=${a}$.`),
                lines: [line(LABELS.substitute, `f(${a})=${a * a}`), line(LABELS.derivative, "m=f'(x)=2x"), line(LABELS.result, `y-${a * a}=2x(x-${a})`)],
                wrong: 1, error, fix: `m=f'(${a})=${2 * a}\\ \\to\\ y=${2 * a}x-${a * a}`, right: 2 * a, reached: 0
            }
        }
        case 'h-left': {
            const a = randomInt(random, 1, 4)
            return {
                problem: say(`Kalkulatu $f'(${a})$ definizioaren bidez, $f(x)=x^2$ bada.`, `Calcula $f'(${a})$ con la definición si $f(x)=x^2$.`, `احسب $f'(${a})$ بالتعريف إذا كانت $f(x)=x^2$.`, `Work out $f'(${a})$ from the definition if $f(x)=x^2$.`),
                lines: [line(LABELS.step, `\\frac{(${a}+h)^2-${a * a}}{h}=${2 * a}+h`), line(LABELS.result, `f'(${a})=${2 * a}+h`), line(LABELS.result, `${2 * a}+h`)],
                wrong: 1, error, fix: `\\lim_{h\\to 0}(${2 * a}+h)=${2 * a}`, right: 2 * a, reached: 2 * a + 1
            }
        }
        case 'product': {
            const a = randomInt(random, 1, 3)
            const c = randomInt(random, 1, 5)
            const right = 2 * a * (a + c) + a * a
            const reached = 2 * a
            return {
                problem: derivAt(`x^2(x+${c})`, a),
                lines: [line(LABELS.derivative, "f'(x)=2x\\cdot 1"), line(LABELS.substitute, `f'(${a})=2\\cdot ${a}`), line(LABELS.result, `${reached}`)],
                wrong: 0, error, fix: `f'(x)=2x(x+${c})+x^2\\ \\to\\ ${right}`, right, reached
            }
        }
        case 'inside': {
            const k = randomInt(random, 2, 5)
            const a = randomInt(random, 1, 2)
            const inner = k * a + 1
            const right = 3 * inner * inner * k
            const reached = 3 * inner * inner
            return {
                problem: derivAt(`(${k}x+1)^3`, a),
                lines: [line(LABELS.derivative, `f'(x)=3(${k}x+1)^2`), line(LABELS.substitute, `3\\cdot ${inner}^2`), line(LABELS.result, `${reached}`)],
                wrong: 0, error, fix: `f'(x)=3(${k}x+1)^2\\cdot ${k}\\ \\to\\ ${right}`, right, reached
            }
        }
        case 'log-inside': {
            const c = randomInt(random, 1, 8)
            const a = randomInt(random, 1, 3)
            return {
                problem: derivAt(`\\ln(x^2+${c})`, a),
                lines: [line(LABELS.derivative, `f'(x)=\\frac{1}{x^2+${c}}`), line(LABELS.substitute, `\\frac{1}{${a * a + c}}`), line(LABELS.result, `\\frac{1}{${a * a + c}}`)],
                wrong: 0, error, fix: `f'(x)=\\frac{2x}{x^2+${c}}\\ \\to\\ \\frac{${2 * a}}{${a * a + c}}`, right: (2 * a) / (a * a + c), reached: 1 / (a * a + c)
            }
        }
        case 'quotient-order': {
            const c = randomInt(random, 1, 6)
            const a = randomInt(random, 0, 3)
            const square = (a + c) * (a + c)
            return {
                problem: derivAt(`\\frac{x}{x+${c}}`, a),
                lines: [line(LABELS.derivative, `f'(x)=\\frac{x\\cdot 1-1\\cdot(x+${c})}{(x+${c})^2}`), line(LABELS.step, `\\frac{-${c}}{(x+${c})^2}`), line(LABELS.result, `-\\frac{${c}}{${square}}`)],
                wrong: 0, error, fix: `\\frac{1\\cdot(x+${c})-x\\cdot 1}{(x+${c})^2}=\\frac{${c}}{(x+${c})^2}`, right: c / square, reached: -c / square
            }
        }
        case 'average': {
            const fixed = randomInt(random, 2, 9) * 100
            const c = randomInt(random, 3, 12)
            const x = pick(random, [10, 20, 50])
            return {
                problem: say(`$C(x)=${fixed}+${c}x$ euro. Zenbat kostatzen da gutxi gorabehera ${x + 1}. unitatea?`, `$C(x)=${fixed}+${c}x$ euros. ¿Cuánto cuesta más o menos la unidad ${x + 1}?`, `$C(x)=${fixed}+${c}x$ يورو. كم تكلّف تقريبًا الوحدة ${x + 1}؟`, `$C(x)=${fixed}+${c}x$ euros. Roughly what does unit ${x + 1} cost?`),
                lines: [line(LABELS.substitute, `C(${x})=${fixed + c * x}`), line(LABELS.step, `\\frac{C(${x})}{${x}}=${(fixed + c * x) / x}`), line(LABELS.result, `${(fixed + c * x) / x}`)],
                wrong: 1, error, fix: `C'(x)=${c}`, right: c, reached: (fixed + c * x) / x
            }
        }
        case 'one-condition': {
            const p = randomInt(random, 1, 3)
            const a = 2 * p
            return {
                problem: say(`Aurkitu $a$ eta $b$, $f(x)=\\begin{cases}x^2 & x\\le ${p}\\\\ ax+b & x>${p}\\end{cases}$ deribagarria izan dadin. Eman $a$.`, `Halla $a$ y $b$ para que $f(x)=\\begin{cases}x^2 & x\\le ${p}\\\\ ax+b & x>${p}\\end{cases}$ sea derivable. Da $a$.`, `أوجد $a$ و$b$ لتكون $f(x)=\\begin{cases}x^2 & x\\le ${p}\\\\ ax+b & x>${p}\\end{cases}$ قابلة للاشتقاق. اكتب $a$.`, `Find $a$ and $b$ so that $f(x)=\\begin{cases}x^2 & x\\le ${p}\\\\ ax+b & x>${p}\\end{cases}$ is differentiable. Give $a$.`),
                lines: [line(LABELS.step, `${p * p}=${p}a+b`), line(LABELS.step, 'b=0'), line(LABELS.result, `a=${p}`)],
                wrong: 1, error, fix: `a=2\\cdot ${p}=${a}\\ \\to\\ b=${p * p - a * p}`, right: a, reached: p
            }
        }
        case 'second-square': {
            const a = randomInt(random, 1, 3)
            const k = randomInt(random, 2, 4)
            return {
                problem: say(`$f(x)=x^3+${k}x$ bada, kalkulatu $f''(${a})$.`, `Si $f(x)=x^3+${k}x$, calcula $f''(${a})$.`, `إذا كانت $f(x)=x^3+${k}x$ فاحسب $f''(${a})$.`, `If $f(x)=x^3+${k}x$, work out $f''(${a})$.`),
                lines: [line(LABELS.derivative, `f'(x)=3x^2+${k}`), line(LABELS.step, `f''(x)=(3x^2+${k})^2`), line(LABELS.result, `${(3 * a * a + k) ** 2}`)],
                wrong: 1, error, fix: `f''(x)=6x\\ \\to\\ ${6 * a}`, right: 6 * a, reached: (3 * a * a + k) ** 2
            }
        }
        case 'exp-chain': {
            const p0 = randomInt(random, 2, 9) * 100
            const k = pick(random, [0.02, 0.05, 0.1])
            const kTex = String(k).replace('.', '{,}')
            return {
                problem: say(`Biztanleria $P(t)=${p0}e^{${kTex}t}$ da. Kalkulatu $P'(0)$.`, `La población es $P(t)=${p0}e^{${kTex}t}$. Calcula $P'(0)$.`, `السكان $P(t)=${p0}e^{${kTex}t}$. احسب $P'(0)$.`, `The population is $P(t)=${p0}e^{${kTex}t}$. Work out $P'(0)$.`),
                lines: [line(LABELS.derivative, `P'(t)=${p0}e^{${kTex}t}`), line(LABELS.substitute, `P'(0)=${p0}e^{0}`), line(LABELS.result, `${p0}`)],
                wrong: 0, error, fix: `P'(t)=${String(p0 * k).replace('.', '{,}')}e^{${kTex}t}\\ \\to\\ ${String(p0 * k).replace('.', '{,}')}`, right: p0 * k, reached: p0
            }
        }
    }
}

export const bach2gDerivativesDetectiveNames: Record<Bach2gDerivativesDetectiveError, LocalizedText> = {
    'no-divide': say('Ez du tartearen luzeraz zatitu', 'No dividió entre la longitud del intervalo', 'لم يقسم على طول الفترة', 'Did not divide by the length of the interval'),
    'value-for-slope': say('$f(a)$ hartu du $f\'(a)$ maldaren ordez', 'Tomó $f(a)$ en lugar de la pendiente $f\'(a)$', 'أخذ $f(a)$ بدل الميل $f\'(a)$', 'Took $f(a)$ instead of the slope $f\'(a)$'),
    'slope-in-x': say('Maldan $x$ utzi du, $a$ ordezkatu gabe', 'Dejó $x$ en la pendiente sin sustituir $a$', 'ترك $x$ في الميل دون تعويض $a$', 'Left $x$ in the slope without substituting $a$'),
    'h-left': say('Limitea hartu gabe utzi du $h$', 'Dejó la $h$ sin tomar el límite', 'ترك $h$ دون أخذ النهاية', 'Left $h$ without taking the limit'),
    product: say('Biderkaduraren deribatua deribatuen biderkadura dela uste du', 'Creyó que la derivada del producto es el producto de las derivadas', 'ظن أن مشتقة الجداء هي جداء المشتقتين', 'Thought the derivative of a product is the product of the derivatives'),
    inside: say('Barrukoaren deribatua ahaztu du', 'Olvidó la derivada de dentro', 'نسي مشتقة الداخل', 'Forgot the derivative of the inside'),
    'log-inside': say('$(\\ln u)\'=\\frac{1}{u}$ idatzi du', 'Escribió $(\\ln u)\'=\\frac{1}{u}$', 'كتب $(\\ln u)\'=\\frac{1}{u}$', 'Wrote $(\\ln u)\'=\\frac{1}{u}$'),
    'quotient-order': say('Zatiduran kenketa alderantziz egin du', 'En el cociente restó al revés', 'طرح بالعكس في خارج القسمة', 'Subtracted the wrong way round in the quotient'),
    average: say('Batez besteko kostua hartu du hurrengo unitatearen kostutzat', 'Tomó el coste medio por lo que cuesta la unidad siguiente', 'أخذ متوسط التكلفة على أنه تكلفة الوحدة التالية', 'Took the average cost for what the next unit costs'),
    'one-condition': say('Baldintza bakarra erabili du', 'Usó una sola condición', 'استعمل شرطًا واحدًا', 'Used only one condition'),
    'second-square': say('$f\'\'$ lortzeko $f\'$ karratura berretu du', 'Elevó $f\'$ al cuadrado para obtener $f\'\'$', 'ربّع $f\'$ للحصول على $f\'\'$', 'Squared $f\'$ to get $f\'\'$'),
    'exp-chain': say('$e^{kt}$ deribatzean $k$ ahaztu du', 'Olvidó la $k$ al derivar $e^{kt}$', 'نسي $k$ عند اشتقاق $e^{kt}$', 'Forgot the $k$ when differentiating $e^{kt}$')
}

export const bach2gDerivativesDetectiveTips: Record<Bach2gDerivativesDetectiveError, LocalizedText> = {
    'no-divide': say('T.V.M. $=\\frac{f(b)-f(a)}{b-a}$.', 'T.V.M. $=\\frac{f(b)-f(a)}{b-a}$.', 'معدل التغير المتوسط $=\\frac{f(b)-f(a)}{b-a}$.', 'Average rate $=\\frac{f(b)-f(a)}{b-a}$.'),
    'value-for-slope': say('Malda deribatua da puntuan: $f\'(a)$.', 'La pendiente es la derivada en el punto: $f\'(a)$.', 'الميل هو المشتقة عند النقطة: $f\'(a)$.', 'The slope is the derivative at the point: $f\'(a)$.'),
    'slope-in-x': say('Zuzen ukitzailearen malda zenbaki bat da: $f\'(a)$.', 'La pendiente de la tangente es un número: $f\'(a)$.', 'ميل المماس عدد: $f\'(a)$.', 'The slope of the tangent is a number: $f\'(a)$.'),
    'h-left': say('Sinplifikatu ondoren, $h\\to 0$.', 'Tras simplificar, $h\\to 0$.', 'بعد الاختصار $h\\to 0$.', 'After cancelling, $h\\to 0$.'),
    product: say("$(uv)'=u'v+uv'$.", "$(uv)'=u'v+uv'$.", "$(uv)'=u'v+uv'$.", "$(uv)'=u'v+uv'$."),
    inside: say("$(u^n)'=nu^{n-1}\\cdot u'$.", "$(u^n)'=nu^{n-1}\\cdot u'$.", "$(u^n)'=nu^{n-1}\\cdot u'$.", "$(u^n)'=nu^{n-1}\\cdot u'$."),
    'log-inside': say("$(\\ln u)'=\\frac{u'}{u}$.", "$(\\ln u)'=\\frac{u'}{u}$.", "$(\\ln u)'=\\frac{u'}{u}$.", "$(\\ln u)'=\\frac{u'}{u}$."),
    'quotient-order': say("$\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}$: goikoaren deribatua lehenik.", "$\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}$: primero la derivada de arriba.", "$\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}$: مشتقة البسط أولًا.", "$\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}$: the derivative of the top first."),
    average: say("Hurrengo unitatea: $C'(x)$, ez $\\frac{C(x)}{x}$.", "La unidad siguiente: $C'(x)$, no $\\frac{C(x)}{x}$.", "الوحدة التالية: $C'(x)$ لا $\\frac{C(x)}{x}$.", "The next unit: $C'(x)$, not $\\frac{C(x)}{x}$."),
    'one-condition': say('Bi baldintza: balio bera eta malda bera.', 'Dos condiciones: el mismo valor y la misma pendiente.', 'شرطان: القيمة نفسها والميل نفسه.', 'Two conditions: the same value and the same slope.'),
    'second-square': say("$f''$ deribatuaren deribatua da.", "$f''$ es la derivada de la derivada.", "$f''$ هي مشتقة المشتقة.", "$f''$ is the derivative of the derivative."),
    'exp-chain': say("$(e^{kt})'=ke^{kt}$.", "$(e^{kt})'=ke^{kt}$.", "$(e^{kt})'=ke^{kt}$.", "$(e^{kt})'=ke^{kt}$.")
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBach2gDerivativesDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bach2gDerivativesDetectiveLevels[levelIndex], BACH2G_DERIVATIVES_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH2G_DERIVATIVES_DETECTIVE_ERRORS = bach2gDerivativesDetectiveLevels.flat()
