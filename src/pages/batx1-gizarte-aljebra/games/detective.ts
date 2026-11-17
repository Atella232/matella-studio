import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J3 · Aljebraren detektibea (Detective del álgebra): a worked solution of
   three lines with one wrong line, the mistakes of this unit. Level 1,
   equations: the false solution of a radical equation kept, the logarithm
   of a negative number, a negative t in a biquadratic, the exponent of the
   base lost. Level 2, systems and inequalities: the constant term left out
   in Gauss, dividing by x, the inequality not turned round, the root of
   the denominator taken in. Level 3, economics: the break-even point with
   the price instead of the margin, the profit without the costs, a sign
   lost when equating supply and demand, only one constraint checked.
   ========================================================================== */

export type GizAlgebraDetectiveError =
    | 'radical-false'
    | 'log-negative'
    | 'negative-t'
    | 'exponent-lost'
    | 'gauss-constant'
    | 'divide-by-x'
    | 'no-flip'
    | 'denominator-root'
    | 'price-not-margin'
    | 'profit-no-costs'
    | 'equilibrium-sign'
    | 'one-constraint'

export const gizAlgebraDetectiveLevels: GizAlgebraDetectiveError[][] = [
    ['radical-false', 'log-negative', 'negative-t', 'exponent-lost'],
    ['gauss-constant', 'divide-by-x', 'no-flip', 'denominator-root'],
    ['price-not-margin', 'profit-no-costs', 'equilibrium-sign', 'one-constraint']
]

export const GIZ_ALGEBRA_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
/** A whole number for LaTeX: thousands with \\, from five digits (15\\,728), as the unit writes them */
const big = (value: number) => (Math.abs(value) >= 10000 ? `${value < 0 ? '-' : ''}${String(Math.abs(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,')}` : String(value))
/** A coefficient before a letter: +3x, −x, +x */
const term = (value: number, letter: string, first = false) => {
    const sign = value < 0 ? '-' : first ? '' : '+'
    const size = Math.abs(value) === 1 ? '' : String(Math.abs(value))
    return `${sign}${size}${letter}`
}
const constant = (value: number) => (value === 0 ? '' : value < 0 ? `-${-value}` : `+${value}`)
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    equation: say('Ekuazioa', 'Ecuación', 'المعادلة', 'Equation'),
    roots: say('Erroak', 'Raíces', 'الجذور', 'Roots'),
    solutions: say('Soluzioak', 'Soluciones', 'الحلول', 'Solutions'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    answer: say('Erantzuna', 'Respuesta', 'الجواب', 'Answer'),
    income: say('Diru-sarrerak', 'Ingresos', 'الإيرادات', 'Income'),
    profit: say('Mozkina', 'Beneficio', 'الربح', 'Profit')
}

export const gizAlgebraDetectiveNames: Record<GizAlgebraDetectiveError, LocalizedText> = {
    'radical-false': say('Ez ditu soluzioak egiaztatu: faltsu bat utzi du', 'No comprobó las soluciones: se quedó con una falsa', 'لم يتحقق من الحلول فأبقى حلًّا زائفًا', 'Did not check the solutions: kept a false one'),
    'log-negative': say('Zenbaki negatibo baten logaritmoa onartu du', 'Aceptó el logaritmo de un número negativo', 'قبل لوغاريتم عدد سالب', 'Accepted the logarithm of a negative number'),
    'negative-t': say('$t$ negatibo batetik $x$ balioak atera ditu', 'Sacó valores de $x$ de una $t$ negativa', 'استخرج قيمًا لـ $x$ من $t$ سالبة', 'Took values of $x$ from a negative $t$'),
    'exponent-lost': say('Oinarria aldatzean berretzailea galdu du', 'Al cambiar la base perdió el exponente', 'عند تغيير الأساس أضاع الأس', 'Lost the exponent when changing the base'),
    'gauss-constant': say('Gai askea ez du aldatu', 'No cambió el término independiente', 'لم يغيّر الحد الثابت', 'Did not change the constant term'),
    'divide-by-x': say('$x$ zenbakiaz zatitu du, eta soluzio bat galdu', 'Dividió entre $x$ y perdió una solución', 'قسم على $x$ فأضاع حلًّا', 'Divided by $x$ and lost a solution'),
    'no-flip': say('Negatibo batez zatitzean, ez du desberdintza biratu', 'Al dividir entre un negativo no dio la vuelta a la desigualdad', 'عند القسمة على سالب لم يقلب المتراجحة', 'Did not flip the inequality when dividing by a negative'),
    'denominator-root': say('Izendatzailearen erroa soluzioan sartu du', 'Metió la raíz del denominador en la solución', 'أدخل جذر المقام في الحل', 'Put the root of the denominator in the solution'),
    'price-not-margin': say('Kostu finkoak prezioaz zatitu ditu, ez marjinaz', 'Dividió los costes fijos entre el precio, no entre el margen', 'قسم التكاليف الثابتة على السعر لا على الهامش', 'Divided the fixed costs by the price, not by the margin'),
    'profit-no-costs': say('Mozkina diru-sarrerak direla pentsatu du, kosturik gabe', 'Tomó los ingresos como beneficio, sin los costes', 'اعتبر الإيرادات ربحًا دون التكاليف', 'Took the income as profit, without the costs'),
    'equilibrium-sign': say('Gai bat aldez aldatzean zeinua ez du aldatu', 'Al cambiar un término de lado no cambió el signo', 'عند نقل حدٍّ إلى الطرف الآخر لم يغيّر إشارته', 'Moved a term across without changing its sign'),
    'one-constraint': say('Murrizketa bakarra egiaztatu du', 'Comprobó una sola restricción', 'تحقق من قيد واحد فقط', 'Checked only one constraint')
}

export const gizAlgebraDetectiveTips: Record<GizAlgebraDetectiveError, LocalizedText> = {
    'radical-false': say('Karratura jasotakoan, egiaztatu soluzio bakoitza hasierako ekuazioan.', 'Tras elevar al cuadrado, comprueba cada solución en la ecuación de partida.', 'بعد التربيع تحقق من كل حل في المعادلة الأصلية.', 'After squaring, check each solution in the starting equation.'),
    'log-negative': say('Logaritmoa zenbaki positiboena bakarrik da: egiaztatu soluzioak.', 'Solo hay logaritmo de números positivos: comprueba las soluciones.', 'لا لوغاريتم إلا للأعداد الموجبة: تحقق من الحلول.', 'Only positive numbers have a logarithm: check the solutions.'),
    'negative-t': say('$t=x^{2}$ ezin da negatiboa izan: $t$ negatiboak ez du $x$ ematen.', '$t=x^{2}$ no puede ser negativa: una $t$ negativa no da $x$.', '$t=x^{2}$ لا يمكن أن تكون سالبة: $t$ السالبة لا تعطي $x$.', '$t=x^{2}$ cannot be negative: a negative $t$ gives no $x$.'),
    'exponent-lost': say('$\\left(b^{k}\\right)^{x}=b^{kx}$: berretzaileak biderkatzen dira.', '$\\left(b^{k}\\right)^{x}=b^{kx}$: los exponentes se multiplican.', '$\\left(b^{k}\\right)^{x}=b^{kx}$: الأسس تُضرب.', '$\\left(b^{k}\\right)^{x}=b^{kx}$: the exponents multiply.'),
    'gauss-constant': say('Errenkada osoa aldatzen da, gai askea ere bai.', 'Cambia la fila entera, también el término independiente.', 'يتغير الصف كله، والحد الثابت أيضًا.', 'The whole row changes, the constant term too.'),
    'divide-by-x': say('Ez zatitu $x$ zenbakiaz: atera faktore komuna, $x(x-k)=0$.', 'No dividas entre $x$: saca factor común, $x(x-k)=0$.', 'لا تقسم على $x$: أخرج عاملًا مشتركًا $x(x-k)=0$.', 'Do not divide by $x$: take out the common factor, $x(x-k)=0$.'),
    'no-flip': say('Negatibo batez biderkatzean edo zatitzean, $<$ bihurtzen da $>$.', 'Al multiplicar o dividir por un negativo, $<$ pasa a ser $>$.', 'عند الضرب أو القسمة على سالب يصبح $<$ هو $>$.', 'Multiplying or dividing by a negative turns $<$ into $>$.'),
    'denominator-root': say('Izendatzailea ezin da 0 izan: bere erroa beti kanpoan.', 'El denominador no puede ser 0: su raíz siempre fuera.', 'لا يمكن أن يكون المقام 0: جذره دائمًا خارج الحل.', 'The denominator cannot be 0: its root is always left out.'),
    'price-not-margin': say('Unitate bakoitzak $p-c$ uzten du: $x=\\frac{F}{p-c}$.', 'Cada unidad deja $p-c$: $x=\\frac{F}{p-c}$.', 'كل وحدة تترك $p-c$: ‏$x=\\frac{F}{p-c}$.', 'Each unit leaves $p-c$: $x=\\frac{F}{p-c}$.'),
    'profit-no-costs': say('Mozkina = diru-sarrerak ken kostuak.', 'Beneficio = ingresos menos costes.', 'الربح = الإيرادات ناقص التكاليف.', 'Profit = income minus costs.'),
    'equilibrium-sign': say('Aldez aldatzean, gaiak zeinua aldatzen du.', 'Al pasar de lado, el término cambia de signo.', 'عند النقل إلى الطرف الآخر يغيّر الحد إشارته.', 'When a term moves across, its sign changes.'),
    'one-constraint': say('Plan batek murrizketa guztiak bete behar ditu: txikiena da muga.', 'Un plan tiene que cumplir todas las restricciones: manda la más pequeña.', 'يجب أن تحقق الخطة كل القيود: الأصغر هو الحد.', 'A plan has to meet every constraint: the smallest one rules.')
}

type Built = Omit<WorkedCase<GizAlgebraDetectiveError>, 'options'>

function build(random: Random, error: GizAlgebraDetectiveError): Built | null {
    switch (error) {
        case 'radical-false': {
            // √(x + a) = x − b: the true root t > b, the false one f < b
            const b = randomInt(random, 1, 4)
            const t = b + randomInt(random, 2, 5)
            const f = 2 * b + 1 - t
            const a = b * b - t * f
            if (f >= b || f + a < 0 || a <= 0) return null
            const sum = 2 * b + 1
            const product = b * b - a
            return {
                problem: say(`Ebatzi $\\sqrt{x+${a}}=x-${b}$.`, `Resuelve $\\sqrt{x+${a}}=x-${b}$.`, `حل $\\sqrt{x+${a}}=x-${b}$.`, `Solve $\\sqrt{x+${a}}=x-${b}$.`),
                lines: [line(LABELS.step, `x+${a}=(x-${b})^{2}`), line(LABELS.equation, `x^{2}${term(-sum, 'x')}${constant(product)}=0`), line(LABELS.solutions, `x=${t},\\ x=${f}`)],
                wrong: 2, error, fix: `x=${f}:\\ \\sqrt{${f + a}}\\ne ${f - b}\\ \\to\\ x=${t}`, right: t, reached: f
            }
        }
        case 'log-negative': {
            // log x + log(x − k) = log m: x(x − k) = m, roots r > k and k − r < 0
            const k = randomInt(random, 1, 5)
            const r = k + randomInt(random, 1, 5)
            const other = k - r
            const m = -r * other
            return {
                problem: say(`Ebatzi $\\log x+\\log(x-${k})=\\log ${m}$.`, `Resuelve $\\log x+\\log(x-${k})=\\log ${m}$.`, `حل $\\log x+\\log(x-${k})=\\log ${m}$.`, `Solve $\\log x+\\log(x-${k})=\\log ${m}$.`),
                lines: [line(LABELS.step, `x(x-${k})=${m}`), line(LABELS.equation, `x^{2}${term(-k, 'x')}-${m}=0`), line(LABELS.solutions, `x=${r},\\ x=${other}`)],
                wrong: 2, error, fix: `x=${other}<0\\ \\to\\ x=${r}`, right: r, reached: other
            }
        }
        case 'negative-t': {
            // x⁴ + (n − m²)x² − m²n = 0: t = m² and t = −n
            const m = randomInt(random, 1, 3)
            const n = randomInt(random, 1, 9)
            if (n === m * m) return null
            const middle = n - m * m
            return {
                problem: say(`Zenbat soluzio ditu $x^{4}${term(middle, 'x^{2}')}-${m * m * n}=0$ ekuazioak?`, `¿Cuántas soluciones tiene $x^{4}${term(middle, 'x^{2}')}-${m * m * n}=0$?`, `كم حلًّا للمعادلة $x^{4}${term(middle, 'x^{2}')}-${m * m * n}=0$؟`, `How many solutions does $x^{4}${term(middle, 'x^{2}')}-${m * m * n}=0$ have?`),
                lines: [line(LABELS.step, `t^{2}${term(middle, 't')}-${m * m * n}=0`), line(LABELS.roots, `t=${m * m},\\ t=-${n}`), line(LABELS.solutions, `x=\\pm ${m},\\ x=\\pm\\sqrt{${n}}\\ \\to\\ 4`)],
                wrong: 2, error, fix: `t=-${n}<0\\ \\to\\ x=\\pm ${m}\\ \\to\\ 2`, right: 2, reached: 4
            }
        }
        case 'exponent-lost': {
            const base = pick(random, [2, 3])
            const power = pick(random, base === 2 ? [2, 3] : [2])
            const target = randomInt(random, 1, base === 2 ? 6 : 4)
            if (target % power === 0) return null
            const left = base ** power
            const right = base ** target
            return {
                problem: say(`Ebatzi $${left}^{x}=${right}$.`, `Resuelve $${left}^{x}=${right}$.`, `حل $${left}^{x}=${right}$.`, `Solve $${left}^{x}=${right}$.`),
                lines: [line(LABELS.step, `${left}=${base}^{${power}},\\ ${right}=${base}^{${target}}`), line(LABELS.equation, `${base}^{x}=${base}^{${target}}`), line(LABELS.result, `x=${target}`)],
                wrong: 1, error, fix: `${base}^{${power}x}=${base}^{${target}}\\ \\to\\ x=\\frac{${target}}{${power}}`, right: target / power, reached: target
            }
        }
        case 'gauss-constant': {
            const a = randomInt(random, 2, 5)
            const b = a + randomInt(random, 1, 3)
            const x = randomInt(random, 1, 8)
            const y = randomInt(random, 1, 8)
            const s = x + y
            const r = a * x + b * y
            const reached = r / (b - a)
            return {
                problem: say(`Ebatzi Gaussen metodoaz: $x+y=${s}$, $${a}x+${b}y=${r}$. Zenbat da $y$?`, `Resuelve por Gauss: $x+y=${s}$, $${a}x+${b}y=${r}$. ¿Cuánto vale $y$?`, `حل بطريقة غاوس: $x+y=${s}$ و$${a}x+${b}y=${r}$. كم قيمة $y$؟`, `Solve by Gauss: $x+y=${s}$, $${a}x+${b}y=${r}$. What is $y$?`),
                lines: [line(LABELS.step, `E_2-${a}E_1`), line(LABELS.equation, `${term(b - a, 'y', true)}=${r}`), line(LABELS.result, `y=\\frac{${r}}{${b - a}}`)],
                wrong: 1, error, fix: `${term(b - a, 'y', true)}=${r}-${a}\\cdot ${s}=${r - a * s}\\ \\to\\ y=${y}`, right: y, reached
            }
        }
        case 'divide-by-x': {
            const k = randomInt(random, 2, 9)
            const factor = randomInt(random, 1, 3)
            return {
                problem: say(`Zenbat soluzio ditu $${factor === 1 ? '' : factor}x^{2}=${factor * k}x$ ekuazioak?`, `¿Cuántas soluciones tiene $${factor === 1 ? '' : factor}x^{2}=${factor * k}x$?`, `كم حلًّا للمعادلة $${factor === 1 ? '' : factor}x^{2}=${factor * k}x$؟`, `How many solutions does $${factor === 1 ? '' : factor}x^{2}=${factor * k}x$ have?`),
                lines: [line(LABELS.step, `x^{2}=${k}x`), line(LABELS.equation, `x=${k}`), line(LABELS.answer, '1')],
                wrong: 1, error, fix: `x(x-${k})=0\\ \\to\\ x=0,\\ x=${k}\\ \\to\\ 2`, right: 2, reached: 1
            }
        }
        case 'no-flip': {
            // a − k·x > c, with k > 0: −k·x > c − a, so x < (a − c) ÷ k
            const k = randomInt(random, 2, 5)
            const bound = randomInt(random, -4, 6)
            const a = randomInt(random, 1, 9)
            const c = a - k * bound
            return {
                problem: say(`Ebatzi $${a}-${k}x>${c}$.`, `Resuelve $${a}-${k}x>${c}$.`, `حل $${a}-${k}x>${c}$.`, `Solve $${a}-${k}x>${c}$.`),
                lines: [line(LABELS.step, `-${k}x>${c - a}`), line(LABELS.equation, `x>\\frac{${c - a}}{-${k}}`), line(LABELS.result, `x>${bound}`)],
                wrong: 1, error, fix: `x<\\frac{${c - a}}{-${k}}=${bound}`, right: bound - 0.5, reached: bound + 0.5
            }
        }
        case 'denominator-root': {
            const a = randomInt(random, 1, 6)
            const b = randomInt(random, 1, 5)
            return {
                problem: say(`Zenbat zenbaki osok betetzen dute $\\frac{x-${a}}{x+${b}}\\le 0$?`, `¿Cuántos enteros cumplen $\\frac{x-${a}}{x+${b}}\\le 0$?`, `كم عددًا صحيحًا يحقق $\\frac{x-${a}}{x+${b}}\\le 0$؟`, `How many integers satisfy $\\frac{x-${a}}{x+${b}}\\le 0$?`),
                lines: [line(LABELS.roots, `x=${a},\\ x=-${b}`), line(LABELS.solutions, `[-${b},\\,${a}]`), line(LABELS.answer, String(a + b + 1))],
                wrong: 1, error, fix: `(-${b},\\,${a}]\\ \\to\\ ${a + b}`, right: a + b, reached: a + b + 1
            }
        }
        case 'price-not-margin': {
            const margin = randomInt(random, 2, 8)
            const cost = randomInt(random, 2, 10)
            const price = cost + margin
            const point = randomInt(random, 3, 30) * 10
            const fixed = margin * point
            const reached = fixed / price
            return {
                problem: say(`Kostu finkoak ${fixed} euro, unitateko kostua ${cost} euro eta prezioa ${price} euro. Zein da atalasea?`, `Costes fijos ${fixed} euros, coste por unidad ${cost} euros y precio ${price} euros. ¿Cuál es el punto muerto?`, `التكاليف الثابتة ${fixed} يورو، وتكلفة الوحدة ${cost} يورو، والسعر ${price} يورو. ما نقطة التعادل؟`, `Fixed costs ${fixed} euros, cost per unit ${cost} euros and price ${price} euros. What is the break-even point?`),
                lines: [line(LABELS.step, `I(x)=C(x)`), line(LABELS.equation, `x=\\frac{${fixed}}{${price}}`), line(LABELS.result, `x\\approx ${Number.isInteger(reached) ? reached : reached.toFixed(1).replace('.', '{,}')}`)],
                wrong: 1, error, fix: `x=\\frac{${fixed}}{${price}-${cost}}=${point}`, right: point, reached
            }
        }
        case 'profit-no-costs': {
            const price = randomInt(random, 6, 20)
            const cost = randomInt(random, 1, price - 2)
            const fixed = randomInt(random, 2, 20) * 100
            // At most 9 · 50 = 450 units, so no amount reaches five digits
    const units = randomInt(random, 2, 9) * 50
            const right = price * units - (fixed + cost * units)
            const reached = price * units
            return {
                problem: say(`$I(x)=${price}x$ eta $C(x)=${fixed}+${cost}x$ badira, zenbatekoa da mozkina ${units} unitaterekin?`, `Con $I(x)=${price}x$ y $C(x)=${fixed}+${cost}x$, ¿cuál es el beneficio con ${units} unidades?`, `مع $I(x)=${price}x$ و$C(x)=${fixed}+${cost}x$، ما الربح مع ${units} وحدة؟`, `With $I(x)=${price}x$ and $C(x)=${fixed}+${cost}x$, what is the profit with ${units} units?`),
                lines: [line(LABELS.income, `I(${units})=${price}\\cdot ${units}=${big(reached)}`), line(LABELS.profit, `I(${units})=${big(reached)}`), line(LABELS.result, big(reached))],
                wrong: 1, error, fix: `${big(reached)}-(${fixed}+${cost}\\cdot ${units})=${big(right)}`, right, reached
            }
        }
        case 'equilibrium-sign': {
            // a − b·p = c·p − d: (a + d) = (b + c)·p
            const b = randomInt(random, 1, 5)
            const c = randomInt(random, 1, 6)
            const price = randomInt(random, 4, 30)
            const d = randomInt(random, 2, 12) * 5
            const a = (b + c) * price - d
            // Both quantities positive at the equilibrium price
            if (c * price - d <= 0) return null
            const reached = (a - d) / (b + c)
            return {
                problem: say(`Eskaria $${a}-${b === 1 ? '' : b}p$ da, eta eskaintza $${c === 1 ? '' : c}p-${d}$. Zein da oreka-prezioa?`, `La demanda es $${a}-${b === 1 ? '' : b}p$ y la oferta, $${c === 1 ? '' : c}p-${d}$. ¿Cuál es el precio de equilibrio?`, `الطلب $${a}-${b === 1 ? '' : b}p$ والعرض $${c === 1 ? '' : c}p-${d}$. ما سعر التوازن؟`, `Demand is $${a}-${b === 1 ? '' : b}p$ and supply is $${c === 1 ? '' : c}p-${d}$. What is the equilibrium price?`),
                lines: [line(LABELS.equation, `${a}-${b === 1 ? '' : b}p=${c === 1 ? '' : c}p-${d}`), line(LABELS.step, `${a}-${d}=${b + c}p`), line(LABELS.result, `p=\\frac{${a - d}}{${b + c}}`)],
                wrong: 1, error, fix: `${a}+${d}=${b + c}p\\ \\to\\ p=${price}`, right: price, reached
            }
        }
        case 'one-constraint': {
            // Money a·x + b·y ≤ M and hours c·x + e·y ≤ H; y fixed; the hours are the tighter one
            const y = randomInt(random, 2, 8)
            const a = pick(random, [10, 20, 30])
            const b = pick(random, [40, 50, 60])
            const c = pick(random, [2, 3, 4])
            const e = pick(random, [3, 4, 5])
            const byMoney = randomInt(random, 20, 40)
            const byHours = byMoney - randomInt(random, 3, 10)
            const money = a * byMoney + b * y
            const hours = c * byHours + e * y
            return {
                problem: say(`Murrizketak $${a}x+${b}y\\le ${money}$ eta $${c}x+${e}y\\le ${hours}$ dira. $y=${y}$ bada, zenbat da $x$ gehienez?`, `Las restricciones son $${a}x+${b}y\\le ${money}$ y $${c}x+${e}y\\le ${hours}$. Si $y=${y}$, ¿cuánto vale $x$ como máximo?`, `القيدان $${a}x+${b}y\\le ${money}$ و$${c}x+${e}y\\le ${hours}$. إذا كان $y=${y}$ فما أكبر قيمة لـ $x$؟`, `The constraints are $${a}x+${b}y\\le ${money}$ and $${c}x+${e}y\\le ${hours}$. If $y=${y}$, what is the most $x$ can be?`),
                lines: [line(LABELS.step, `${a}x+${b * y}\\le ${money}`), line(LABELS.equation, `x\\le ${byMoney}`), line(LABELS.answer, `${byMoney}`)],
                wrong: 2, error, fix: `${c}x+${e * y}\\le ${hours}\\ \\to\\ x\\le ${byHours}`, right: byHours, reached: byMoney
            }
        }
    }
}

export const createGizAlgebraDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, gizAlgebraDetectiveLevels[levelIndex], GIZ_ALGEBRA_DETECTIVE_CASES, build)
