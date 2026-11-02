import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import { fraction, toLatex } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Ekuazioen detektibea (2. DBH): a solved equation of three lines with one
   wrong line. Level 1: first degree (a term moved without changing its
   sign, the coefficient subtracted instead of divided, the division upside
   down, a minus before a bracket); level 2: denominators (the whole number
   not multiplied by the LCM, the sign of a numerator after a minus, every
   numerator multiplied by the LCM, a cross product with only the first
   term multiplied); level 3: second degree (only the positive root,
   dividing by x and losing x = 0, b instead of −b in the formula, a
   product equal to a number that is not zero). The value of a line with
   two solutions is `solutionsValue`, so that two lists compare as numbers.
   ========================================================================== */

export type EquationDetectiveError =
    | 'transpose-sign'
    | 'subtract-coefficient'
    | 'divide-upside-down'
    | 'minus-bracket'
    | 'lcm-not-all'
    | 'minus-numerator'
    | 'numerators-times-lcm'
    | 'cross-first-term'
    | 'one-root'
    | 'divide-by-x'
    | 'formula-sign'
    | 'product-not-zero'

export const equationDetectiveLevels: EquationDetectiveError[][] = [
    ['transpose-sign', 'subtract-coefficient', 'divide-upside-down', 'minus-bracket'],
    ['lcm-not-all', 'minus-numerator', 'numerators-times-lcm', 'cross-first-term'],
    ['one-root', 'divide-by-x', 'formula-sign', 'product-not-zero']
]

export const EQUATION_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    transpose: say('Gaiak lekuz aldatu', 'Transpón términos', 'انقل الحدود', 'Move the terms'),
    reduce: say('Laburtu', 'Reduce', 'بسّط', 'Simplify'),
    isolate: say('Askatu x', 'Despeja x', 'اعزل x', 'Solve for x'),
    bracket: say('Kendu parentesia', 'Quita el paréntesis', 'احذف القوسين', 'Remove the bracket'),
    lcm: say('Biderkatu MKTz', 'Multiplica por el m.c.m.', 'اضرب في المضاعف المشترك الأصغر', 'Multiply by the LCM'),
    cross: say('Gurutzean biderkatu', 'Multiplica en cruz', 'اضرب تبادليًا', 'Cross-multiply'),
    root: say('Erro karratua', 'Raíz cuadrada', 'الجذر التربيعي', 'Square root'),
    formula: say('Formula', 'Fórmula', 'القانون العام', 'Formula'),
    factor: say('Faktorizatu', 'Factoriza', 'حلّل', 'Factorise'),
    solution: say('Soluzioa', 'Solución', 'الحل', 'Solution'),
    solutions: say('Soluzioak', 'Soluciones', 'الحلول', 'Solutions')
}

export const equationDetectiveNames: Record<EquationDetectiveError, LocalizedText> = {
    'transpose-sign': say('Gai bat beste atalera eraman du zeinua aldatu gabe', 'Pasó un término al otro miembro sin cambiarle el signo', 'نقل حدًا إلى الطرف الآخر دون تغيير إشارته', 'Moved a term to the other side without changing its sign'),
    'subtract-coefficient': say('Koefizientea kendu du, zatitu beharrean', 'Restó el coeficiente en vez de dividir', 'طرح المعامل بدل القسمة', 'Subtracted the coefficient instead of dividing'),
    'divide-upside-down': say('Zatiketa alderantziz egin du', 'Hizo la división al revés', 'أجرى القسمة بالعكس', 'Did the division upside down'),
    'minus-bracket': say('Minusaren atzeko parentesian zeinu bat ez du aldatu', 'Tras el menos, no cambió un signo del paréntesis', 'بعد الناقص لم يغيّر إشارة في القوس', 'After the minus, did not change a sign in the bracket'),
    'lcm-not-all': say('Zenbaki osoa ez du MKTz biderkatu', 'No multiplicó el número entero por el m.c.m.', 'لم يضرب العدد الصحيح في المضاعف المشترك', 'Did not multiply the whole number by the LCM'),
    'minus-numerator': say('Zatiki baten aurreko minusak zenbakitzaile osoari eragiten diola ahaztu du', 'Olvidó que el menos delante de una fracción afecta a todo el numerador', 'نسي أن الناقص قبل الكسر يشمل البسط كله', 'Forgot that a minus before a fraction applies to the whole numerator'),
    'numerators-times-lcm': say('Zenbakitzaileak MKTz biderkatu ditu, ez MKT zati izendatzaileaz', 'Multiplicó los numeradores por el m.c.m. y no por m.c.m. entre denominador', 'ضرب البسوط في المضاعف المشترك لا في ناتج قسمته على المقام', 'Multiplied the numerators by the LCM, not by the LCM over the denominator'),
    'cross-first-term': say('Gurutzean biderkatzean lehen gaia bakarrik biderkatu du', 'Al multiplicar en cruz, multiplicó solo el primer término', 'عند الضرب التبادلي ضرب الحد الأول فقط', 'When cross-multiplying, multiplied only the first term'),
    'one-root': say('Soluzio positiboa bakarrik hartu du', 'Solo tomó la solución positiva', 'أخذ الحل الموجب فقط', 'Took only the positive solution'),
    'divide-by-x': say('x-z zatitu du eta x = 0 soluzioa galdu du', 'Dividió entre x y perdió la solución x = 0', 'قسم على x فأضاع الحل x = 0', 'Divided by x and lost the solution x = 0'),
    'formula-sign': say('Formulan b jarri du, −b beharrean', 'En la fórmula puso b en vez de −b', 'وضع b في القانون بدل −b', 'Used b in the formula instead of −b'),
    'product-not-zero': say('Biderkadura zero ez den zenbaki bat da, eta faktore bakoitza berdindu du', 'Igualó cada factor al número, pero el producto no es cero', 'ساوى كل عامل بالعدد، لكن الجداء ليس صفرًا', 'Set each factor equal to the number, but the product is not zero')
}

export const equationDetectiveTips: Record<EquationDetectiveError, LocalizedText> = {
    'transpose-sign': say('Batzen ari dena kenduz pasatzen da beste atalera, eta alderantziz.', 'Lo que suma pasa restando al otro miembro, y lo que resta pasa sumando.', 'ما يُجمع ينتقل طارحًا إلى الطرف الآخر، وما يُطرح ينتقل جامعًا.', 'What is added moves to the other side subtracting, and what is subtracted moves adding.'),
    'subtract-coefficient': say('$3x=12$: 3 biderkatzen ari da, beraz zatituz pasatzen da: $x=4$.', '$3x=12$: el 3 multiplica, así que pasa dividiendo: $x=4$.', '$3x=12$: العدد 3 يضرب، فينتقل قاسمًا: $x=4$.', '$3x=12$: the 3 multiplies, so it moves dividing: $x=4$.'),
    'divide-upside-down': say('$ax=b$ bada, $x=\\frac{b}{a}$: x-ren koefizientea izendatzailean doa.', 'Si $ax=b$, entonces $x=\\frac{b}{a}$: el coeficiente de x va abajo.', 'إذا كان $ax=b$ فإن $x=\\frac{b}{a}$: معامل x في المقام.', 'If $ax=b$, then $x=\\frac{b}{a}$: the coefficient of x goes underneath.'),
    'minus-bracket': say('$-(x-5)=-x+5$: parentesiko zeinu guztiak aldatzen dira.', '$-(x-5)=-x+5$: cambian todos los signos del paréntesis.', '$-(x-5)=-x+5$: تتغيّر كل إشارات القوس.', '$-(x-5)=-x+5$: every sign in the bracket changes.'),
    'lcm-not-all': say('Gai guztiak biderkatzen dira MKTz, zatikirik ez dutenak ere bai.', 'Se multiplican todos los términos por el m.c.m., también los que no tienen fracción.', 'تُضرب كل الحدود في المضاعف المشترك، حتى التي بلا كسر.', 'Every term is multiplied by the LCM, also the ones with no fraction.'),
    'minus-numerator': say('$-\\frac{x-2}{3}$: MKTz biderkatzean, $-(x-2)=-x+2$.', '$-\\frac{x-2}{3}$: al multiplicar por el m.c.m., $-(x-2)=-x+2$.', '$-\\frac{x-2}{3}$: عند الضرب في المضاعف المشترك يصبح $-(x-2)=-x+2$.', '$-\\frac{x-2}{3}$: multiplying by the LCM gives $-(x-2)=-x+2$.'),
    'numerators-times-lcm': say('$6\\cdot\\frac{x}{2}=3x$: MKT zati izendatzailea, bider zenbakitzailea.', '$6\\cdot\\frac{x}{2}=3x$: m.c.m. entre denominador, por numerador.', '$6\\cdot\\frac{x}{2}=3x$: المضاعف المشترك على المقام، في البسط.', '$6\\cdot\\frac{x}{2}=3x$: LCM over the denominator, times the numerator.'),
    'cross-first-term': say('$3(x-2)=3x-6$: zenbakiak parentesiko gai guztiak biderkatzen ditu.', '$3(x-2)=3x-6$: el número multiplica a todos los términos del paréntesis.', '$3(x-2)=3x-6$: العدد يضرب كل حدود القوس.', '$3(x-2)=3x-6$: the number multiplies every term in the bracket.'),
    'one-root': say('$x^{2}=9$ ekuazioak bi soluzio ditu: $x=3$ eta $x=-3$.', '$x^{2}=9$ tiene dos soluciones: $x=3$ y $x=-3$.', 'للمعادلة $x^{2}=9$ حلان: $x=3$ و$x=-3$.', '$x^{2}=9$ has two solutions: $x=3$ and $x=-3$.'),
    'divide-by-x': say('Ez zatitu x-z: atera faktore komuna. $x(ax-b)=0$ bada, $x=0$ ere soluzioa da.', 'No dividas entre x: saca factor común. Si $x(ax-b)=0$, también $x=0$ es solución.', 'لا تقسم على x بل أخرج العامل المشترك. إذا كان $x(ax-b)=0$ فإن $x=0$ حل أيضًا.', 'Do not divide by x: take out the common factor. If $x(ax-b)=0$, then $x=0$ is a solution too.'),
    'formula-sign': say('$x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$: b-ren aurkakoa hasieran.', '$x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$: delante va el opuesto de b.', '$x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$: في البداية معاكس b.', '$x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$: the opposite of b goes first.'),
    'product-not-zero': say('Faktoreak bakarrik berdintzen dira zerora biderkadura zero denean. Bestela, berdindu zero eta erabili formula.', 'Solo se igualan los factores a cero si el producto es cero. Si no, iguala a cero y usa la fórmula.', 'لا نساوي العوامل بالصفر إلا إذا كان الجداء صفرًا. وإلا اجعل الطرف صفرًا واستعمل القانون.', 'Factors are set to zero only when the product is zero. Otherwise, make one side zero and use the formula.')
}

/** Two lists of solutions compared as one number each: a single solution is itself */
export const solutionsValue = (solutions: number[]) => (solutions.length === 1 ? solutions[0] : solutions.reduce((total, solution) => total + (solution + 1000) ** 2, 0))
/** x = 4, or x₁ = 3, x₂ = −3 */
export const solutionsLatex = (solutions: number[]) => (solutions.length === 1 ? `x=${solutions[0]}` : solutions.map((solution, index) => `x_{${index + 1}}=${solution}`).join(',\\ '))
const value = (numerator: number, denominator: number) => toLatex(fraction(numerator, denominator))
/** A first-degree expression a·x + b, written as it is */
const linear = (a: number, b: number) => `${a === 1 ? '' : a === -1 ? '-' : a}x${b === 0 ? '' : b > 0 ? `+${b}` : b}`
const signed = (values: number[]) => values.filter((item) => item !== 0)
const range = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => index + min)

type Built = Omit<WorkedCase<EquationDetectiveError>, 'options'>

function build(random: Random, error: EquationDetectiveError): Built | null {
    switch (error) {
        case 'transpose-sign': {
            const c = randomInt(random, 1, 4)
            const a = c + randomInt(random, 1, 4)
            const x = pick(random, signed(range(-6, 9)))
            const b = pick(random, signed(range(-9, 9)))
            const d = (a - c) * x + b
            const reached = (d + b) / (a - c)
            if (!Number.isInteger(reached) || d === 0) return null
            return {
                problem: say(`Ebatzi: $${linear(a, b)}=${linear(c, d)}$`, `Resuelve: $${linear(a, b)}=${linear(c, d)}$`, `حلّ: $${linear(a, b)}=${linear(c, d)}$`, `Solve: $${linear(a, b)}=${linear(c, d)}$`),
                lines: [
                    line(LABELS.transpose, `${a}x-${c === 1 ? '' : c}x=${d}${b < 0 ? '-' : '+'}${Math.abs(b)}`),
                    line(LABELS.reduce, `${a - c === 1 ? '' : a - c}x=${d + b}`),
                    line(LABELS.isolate, `x=${reached}`)
                ],
                wrong: 0,
                error,
                fix: `${a}x-${c === 1 ? '' : c}x=${d}${b < 0 ? '+' : '-'}${Math.abs(b)}\\ \\to\\ x=${x}`,
                right: x,
                reached
            }
        }
        case 'subtract-coefficient': {
            const a = randomInt(random, 2, 7)
            const x = pick(random, signed(range(-5, 9)))
            const b = pick(random, signed(range(-9, 9)))
            const c = a * x + b
            return {
                problem: say(`Ebatzi: $${linear(a, b)}=${c}$`, `Resuelve: $${linear(a, b)}=${c}$`, `حلّ: $${linear(a, b)}=${c}$`, `Solve: $${linear(a, b)}=${c}$`),
                lines: [
                    line(LABELS.transpose, `${a}x=${c}${b < 0 ? '+' : '-'}${Math.abs(b)}=${c - b}`),
                    line(LABELS.isolate, `x=${c - b}-${a}`),
                    line(LABELS.solution, `x=${c - b - a}`)
                ],
                wrong: 1,
                error,
                fix: `x=\\frac{${c - b}}{${a}}=${x}`,
                right: x,
                reached: c - b - a
            }
        }
        case 'divide-upside-down': {
            const a = randomInt(random, 2, 9)
            const x = pick(random, [2, 3, 4, 5, 6, -2, -3])
            const b = pick(random, signed(range(-9, 9)))
            const c = a * x + b
            if (Math.abs(c - b) === a) return null
            return {
                problem: say(`Ebatzi: $${linear(a, b)}=${c}$`, `Resuelve: $${linear(a, b)}=${c}$`, `حلّ: $${linear(a, b)}=${c}$`, `Solve: $${linear(a, b)}=${c}$`),
                lines: [
                    line(LABELS.transpose, `${a}x=${c - b}`),
                    line(LABELS.isolate, `x=\\frac{${a}}{${c - b}}`),
                    line(LABELS.solution, `x=${value(a, c - b)}`)
                ],
                wrong: 1,
                error,
                fix: `x=\\frac{${c - b}}{${a}}=${x}`,
                right: x,
                reached: a / (c - b)
            }
        }
        case 'minus-bracket': {
            const a = randomInt(random, 5, 15)
            const b = randomInt(random, 2, 9)
            const x = pick(random, signed(range(-6, 9)))
            const c = a - (x - b)
            const reached = a - b - c
            return {
                problem: say(`Ebatzi: $${a}-(x-${b})=${c}$`, `Resuelve: $${a}-(x-${b})=${c}$`, `حلّ: $${a}-(x-${b})=${c}$`, `Solve: $${a}-(x-${b})=${c}$`),
                lines: [
                    line(LABELS.bracket, `${a}-x-${b}=${c}`),
                    line(LABELS.transpose, `-x=${c}-${a}+${b}=${c - a + b}`),
                    line(LABELS.solution, `x=${reached}`)
                ],
                wrong: 0,
                error,
                fix: `${a}-x+${b}=${c}\\ \\to\\ x=${x}`,
                right: x,
                reached
            }
        }
        case 'lcm-not-all': {
            const [p, q] = pick(random, [[2, 3], [3, 4], [2, 5], [3, 6], [4, 6]] as const)
            const m = (p * q) / gcd(p, q)
            const s = m / p + m / q
            const k = randomInt(random, 1, 4)
            const c = s * k
            const right = (m * c) / s
            return {
                problem: say(`Ebatzi: $\\frac{x}{${p}}+\\frac{x}{${q}}=${c}$`, `Resuelve: $\\frac{x}{${p}}+\\frac{x}{${q}}=${c}$`, `حلّ: $\\frac{x}{${p}}+\\frac{x}{${q}}=${c}$`, `Solve: $\\frac{x}{${p}}+\\frac{x}{${q}}=${c}$`),
                lines: [
                    line(LABELS.lcm, `${m / p === 1 ? '' : m / p}x+${m / q === 1 ? '' : m / q}x=${c}`),
                    line(LABELS.reduce, `${s}x=${c}`),
                    line(LABELS.solution, `x=${k}`)
                ],
                wrong: 0,
                error,
                fix: `${m / p === 1 ? '' : m / p}x+${m / q === 1 ? '' : m / q}x=${m * c}\\ \\to\\ x=${right}`,
                right,
                reached: k
            }
        }
        case 'minus-numerator': {
            const a = randomInt(random, 1, 6)
            const b = randomInt(random, 1, 6)
            const c = randomInt(random, 1, 5)
            const right = 6 * c - 3 * a - 2 * b
            const reached = 6 * c - 3 * a + 2 * b
            return {
                problem: say(`Ebatzi: $\\frac{x+${a}}{2}-\\frac{x-${b}}{3}=${c}$`, `Resuelve: $\\frac{x+${a}}{2}-\\frac{x-${b}}{3}=${c}$`, `حلّ: $\\frac{x+${a}}{2}-\\frac{x-${b}}{3}=${c}$`, `Solve: $\\frac{x+${a}}{2}-\\frac{x-${b}}{3}=${c}$`),
                lines: [
                    line(LABELS.lcm, `3(x+${a})-2(x-${b})=${6 * c}`),
                    line(LABELS.bracket, `3x+${3 * a}-2x-${2 * b}=${6 * c}`),
                    line(LABELS.solution, `x=${reached}`)
                ],
                wrong: 1,
                error,
                fix: `3x+${3 * a}-2x+${2 * b}=${6 * c}\\ \\to\\ x=${right}`,
                right,
                reached
            }
        }
        case 'numerators-times-lcm': {
            const [p, q] = pick(random, [[2, 3], [3, 4], [2, 5], [3, 6], [4, 6]] as const)
            const m = (p * q) / gcd(p, q)
            const s = m / p + m / q
            const c = s * randomInt(random, 1, 3)
            const right = (m * c) / s
            const reached = c / 2
            return {
                problem: say(`Ebatzi: $\\frac{x}{${p}}+\\frac{x}{${q}}=${c}$`, `Resuelve: $\\frac{x}{${p}}+\\frac{x}{${q}}=${c}$`, `حلّ: $\\frac{x}{${p}}+\\frac{x}{${q}}=${c}$`, `Solve: $\\frac{x}{${p}}+\\frac{x}{${q}}=${c}$`),
                lines: [
                    line(LABELS.lcm, `${m}x+${m}x=${m * c}`),
                    line(LABELS.reduce, `${2 * m}x=${m * c}`),
                    line(LABELS.solution, `x=${value(c, 2)}`)
                ],
                wrong: 0,
                error,
                fix: `${m / p === 1 ? '' : m / p}x+${m / q === 1 ? '' : m / q}x=${m * c}\\ \\to\\ x=${right}`,
                right,
                reached
            }
        }
        case 'cross-first-term': {
            const p = randomInt(random, 2, 5)
            const q = p + 1
            const a = randomInt(random, 1, 7)
            const b = randomInt(random, 1, 7)
            const right = p * b + q * a
            const reached = b + a
            return {
                problem: say(`Ebatzi: $\\frac{x-${a}}{${p}}=\\frac{x+${b}}{${q}}$`, `Resuelve: $\\frac{x-${a}}{${p}}=\\frac{x+${b}}{${q}}$`, `حلّ: $\\frac{x-${a}}{${p}}=\\frac{x+${b}}{${q}}$`, `Solve: $\\frac{x-${a}}{${p}}=\\frac{x+${b}}{${q}}$`),
                lines: [
                    line(LABELS.cross, `${q}(x-${a})=${p}(x+${b})`),
                    line(LABELS.bracket, `${q}x-${a}=${p}x+${b}`),
                    line(LABELS.solution, `x=${reached}`)
                ],
                wrong: 1,
                error,
                fix: `${q}x-${q * a}=${p}x+${p * b}\\ \\to\\ x=${right}`,
                right,
                reached
            }
        }
        case 'one-root': {
            const a = randomInt(random, 2, 5)
            const k = randomInt(random, 2, 7)
            const b = randomInt(random, 2, 20)
            const total = a * k * k - b
            return {
                problem: say(`Ebatzi: $${a}x^{2}-${b}=${total}$`, `Resuelve: $${a}x^{2}-${b}=${total}$`, `حلّ: $${a}x^{2}-${b}=${total}$`, `Solve: $${a}x^{2}-${b}=${total}$`),
                lines: [
                    line(LABELS.transpose, `${a}x^{2}=${a * k * k}`),
                    line(LABELS.isolate, `x^{2}=${k * k}`),
                    line(LABELS.root, `x=${k}`)
                ],
                wrong: 2,
                error,
                fix: `x=\\pm\\sqrt{${k * k}}\\ \\to\\ ${solutionsLatex([k, -k])}`,
                right: solutionsValue([k, -k]),
                reached: k
            }
        }
        case 'divide-by-x': {
            const a = randomInt(random, 1, 5)
            const k = pick(random, signed(range(-6, 8)))
            const b = a * k
            return {
                problem: say(`Ebatzi: $${a === 1 ? '' : a}x^{2}=${b}x$`, `Resuelve: $${a === 1 ? '' : a}x^{2}=${b}x$`, `حلّ: $${a === 1 ? '' : a}x^{2}=${b}x$`, `Solve: $${a === 1 ? '' : a}x^{2}=${b}x$`),
                lines: [
                    line(LABELS.transpose, `${a === 1 ? '' : a}x^{2}${b < 0 ? '+' : '-'}${Math.abs(b)}x=0`),
                    line(LABELS.isolate, `${a === 1 ? '' : a}x=${b}`),
                    line(LABELS.solution, `x=${k}`)
                ],
                wrong: 1,
                error,
                fix: `x(${linear(a, -b)})=0\\ \\to\\ ${solutionsLatex([0, k])}`,
                right: solutionsValue([0, k]),
                reached: k
            }
        }
        case 'formula-sign': {
            const r = pick(random, signed(range(-6, 6)))
            const t = pick(random, signed(range(-6, 6)))
            const b = -(r + t)
            const c = r * t
            if (b === 0 || r === t) return null
            const discriminant = b * b - 4 * c
            const root = Math.sqrt(discriminant)
            const [big, small] = [Math.max(r, t), Math.min(r, t)]
            return {
                problem: say(`Ebatzi: $${linearQuadratic(b, c)}=0$`, `Resuelve: $${linearQuadratic(b, c)}=0$`, `حلّ: $${linearQuadratic(b, c)}=0$`, `Solve: $${linearQuadratic(b, c)}=0$`),
                lines: [
                    line(LABELS.formula, `x=\\frac{${b}\\pm\\sqrt{${discriminant}}}{2}`),
                    line(LABELS.root, `x=\\frac{${b}\\pm ${root}}{2}`),
                    line(LABELS.solutions, solutionsLatex([-small, -big]))
                ],
                wrong: 0,
                error,
                fix: `x=\\frac{${-b}\\pm ${root}}{2}\\ \\to\\ ${solutionsLatex([big, small])}`,
                right: solutionsValue([big, small]),
                reached: solutionsValue([-small, -big])
            }
        }
        case 'product-not-zero': {
            const r = randomInt(random, 1, 5)
            const t = -randomInt(random, 2, 8)
            const a = -(r + t)
            const k = -r * t
            if (a <= 0) return null
            return {
                problem: say(`Ebatzi: $x^{2}+${a === 1 ? '' : a}x=${k}$`, `Resuelve: $x^{2}+${a === 1 ? '' : a}x=${k}$`, `حلّ: $x^{2}+${a === 1 ? '' : a}x=${k}$`, `Solve: $x^{2}+${a === 1 ? '' : a}x=${k}$`),
                lines: [
                    line(LABELS.factor, `x(x+${a})=${k}`),
                    line(LABELS.isolate, `x=${k},\\ x+${a}=${k}`),
                    line(LABELS.solutions, solutionsLatex([k, k - a]))
                ],
                wrong: 1,
                error,
                fix: `x^{2}+${a === 1 ? '' : a}x-${k}=0\\ \\to\\ ${solutionsLatex([r, t])}`,
                right: solutionsValue([r, t]),
                reached: solutionsValue([k, k - a])
            }
        }
    }
}

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
/** x² + bx + c */
const linearQuadratic = (b: number, c: number) => `x^{2}${b === 0 ? '' : b === 1 ? '+x' : b === -1 ? '-x' : b > 0 ? `+${b}x` : `${b}x`}${c > 0 ? `+${c}` : c}`

export const createEquationDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, equationDetectiveLevels[levelIndex], EQUATION_DETECTIVE_CASES, build)
