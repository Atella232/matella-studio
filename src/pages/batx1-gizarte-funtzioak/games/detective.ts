import { randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../text.ts'

/* ==========================================================================
   Funtzioen detektibea (Detective de funciones, 1.º Sociales): a worked
   solution of three lines with one wrong line, the mistakes of this unit.
   Level 1: a root domain with > instead of ≥, a domain that forgets the
   denominator, a slope upside down, a tariff without its fixed part;
   level 2: the vertex without its minus sign, the x of the vertex given as
   the greatest profit, the cost left out of the profit, an interpolation
   started from the wrong datum; level 3: inverse proportion done as
   direct, the vertical asymptote with the wrong sign, the wrong piece at a
   threshold, the second price applied to every unit. `right` and
   `reached` only tell the cases apart.
   ========================================================================== */

export type SocFunctionsDetectiveError =
    | 'root-open'
    | 'denominator-forgotten'
    | 'slope-flip'
    | 'fixed-forgotten'
    | 'vertex-sign'
    | 'x-not-value'
    | 'cost-ignored'
    | 'interp-base'
    | 'inverse-direct'
    | 'asymptote-sign'
    | 'piece-boundary'
    | 'all-units'

export const socFunctionsDetectiveLevels: SocFunctionsDetectiveError[][] = [
    ['root-open', 'denominator-forgotten', 'slope-flip', 'fixed-forgotten'],
    ['vertex-sign', 'x-not-value', 'cost-ignored', 'interp-base'],
    ['inverse-direct', 'asymptote-sign', 'piece-boundary', 'all-units']
]

export const SOC_FUNCTIONS_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
const LABELS = {
    condition: say('Baldintza', 'Condición', 'الشرط', 'Condition'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    piece: say('Zatia', 'Trozo', 'الجزء', 'Piece'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const domainOf = (formula: string) => say(`Aurkitu $${formula}$ funtzioaren izate-eremua.`, `Halla el dominio de $${formula}$.`, `أوجد مجال $${formula}$.`, `Find the domain of $${formula}$.`)

export const socFunctionsDetectiveNames: Record<SocFunctionsDetectiveError, LocalizedText> = {
    'root-open': say('Erroari $>0$ jarri dio, eta $\\ge 0$ behar da', 'Puso $>0$ en la raíz, y basta $\\ge 0$', 'وضع $>0$ في الجذر ويكفي $\\ge 0$', 'Used $>0$ for the root, and $\\ge 0$ is enough'),
    'denominator-forgotten': say('Izendatzailearen zeroa ahaztu du', 'Olvidó el cero del denominador', 'نسي صفر المقام', 'Forgot the zero of the denominator'),
    'slope-flip': say('Malda alderantziz kalkulatu du', 'Calculó la pendiente al revés', 'حسب الميل بالعكس', 'Worked out the slope upside down'),
    'fixed-forgotten': say('Zati finkoa ahaztu du', 'Olvidó la parte fija', 'نسي الجزء الثابت', 'Forgot the fixed part'),
    'vertex-sign': say('Erpinean minus zeinua ahaztu du', 'Olvidó el signo menos del vértice', 'نسي إشارة السالب في الرأس', 'Forgot the minus sign of the vertex'),
    'x-not-value': say('Erpinaren $x$ eman du mozkin gisa', 'Dio la $x$ del vértice como beneficio', 'أعطى $x$ الرأس على أنه الربح', 'Gave the $x$ of the vertex as the profit'),
    'cost-ignored': say('Mozkinean kostua ahaztu du', 'Olvidó el coste en el beneficio', 'نسي التكلفة في الربح', 'Left the cost out of the profit'),
    'interp-base': say('Datu okerretik hasi da', 'Empezó desde el dato equivocado', 'بدأ من البيانة الخاطئة', 'Started from the wrong datum'),
    'inverse-direct': say('Proportzionaltasun zuzena erabili du', 'Usó proporcionalidad directa', 'استعمل التناسب الطردي', 'Used direct proportion'),
    'asymptote-sign': say('Asintota bertikalaren zeinua aldatu du', 'Cambió el signo de la asíntota vertical', 'غيّر إشارة الخط المقارب الرأسي', 'Changed the sign of the vertical asymptote'),
    'piece-boundary': say('Mugan ez dagokion zatia erabili du', 'Usó en el límite el trozo que no toca', 'استعمل عند الحدّ الجزء غير المناسب', 'Used the wrong piece at the threshold'),
    'all-units': say('Bigarren prezioa unitate guztiei aplikatu die', 'Aplicó el segundo precio a todas las unidades', 'طبّق السعر الثاني على كل الوحدات', 'Applied the second price to every unit')
}

export const socFunctionsDetectiveTips: Record<SocFunctionsDetectiveError, LocalizedText> = {
    'root-open': say('$\\sqrt{0}=0$ badago: erroak $\\ge 0$ eskatzen du.', '$\\sqrt{0}=0$ existe: la raíz pide $\\ge 0$.', '$\\sqrt{0}=0$ موجود: الجذر يشترط $\\ge 0$.', '$\\sqrt{0}=0$ exists: the root needs $\\ge 0$.'),
    'denominator-forgotten': say('Baldintza guztiak batera: erroa $\\ge 0$ eta izendatzailea $\\neq 0$.', 'Todas las condiciones a la vez: raíz $\\ge 0$ y denominador $\\neq 0$.', 'كل الشروط معًا: الجذر $\\ge 0$ والمقام $\\neq 0$.', 'Every condition at once: root $\\ge 0$ and denominator $\\neq 0$.'),
    'slope-flip': say('Goian $y$ aldagaiaren aldaketa, eta behean $x$ aldagaiarena.', 'Arriba lo que cambia la $y$ y abajo lo que cambia la $x$.', 'في البسط تغيّر $y$ وفي المقام تغيّر $x$.', 'The change in $y$ on top and the change in $x$ below.'),
    'fixed-forgotten': say('$C(x)=F+vx$: zati finkoa beti ordaintzen da.', '$C(x)=F+vx$: la parte fija se paga siempre.', '$C(x)=F+vx$: الجزء الثابت يُدفع دائمًا.', '$C(x)=F+vx$: the fixed part is always paid.'),
    'vertex-sign': say('Erpina $x=-\\frac{b}{2a}$ zuzenean dago.', 'El vértice está en $x=-\\frac{b}{2a}$.', 'الرأس عند $x=-\\frac{b}{2a}$.', 'The vertex is at $x=-\\frac{b}{2a}$.'),
    'x-not-value': say('Erpinaren $x$ unitateak dira; mozkina $B(x)$ da.', 'La $x$ del vértice son las unidades; el beneficio es $B(x)$.', '$x$ الرأس هو عدد الوحدات؛ والربح $B(x)$.', 'The $x$ of the vertex is the units; the profit is $B(x)$.'),
    'cost-ignored': say('Mozkina = diru-sarrerak − kostuak: kostua kendu, gero erpina.', 'Beneficio = ingresos − costes: resta el coste y después busca el vértice.', 'الربح = الإيرادات − التكاليف: اطرح التكلفة ثم ابحث عن الرأس.', 'Profit = revenue − costs: take the cost away, then find the vertex.'),
    'interp-base': say('Zuzena $y=y_1+m(x-x_1)$ da: $x_1$ eta $y_1$ puntu berekoak.', 'La recta es $y=y_1+m(x-x_1)$: $x_1$ e $y_1$ del mismo punto.', 'المستقيم $y=y_1+m(x-x_1)$: ‏$x_1$ و$y_1$ من النقطة نفسها.', 'The line is $y=y_1+m(x-x_1)$: $x_1$ and $y_1$ from the same point.'),
    'inverse-direct': say('Langile gehiagorekin, egun gutxiago: biderkadura konstantea da.', 'Con más trabajadores, menos días: el producto es constante.', 'مع عمال أكثر أيام أقل: الجداء ثابت.', 'More workers, fewer days: the product is constant.'),
    'asymptote-sign': say('Asintota bertikala izendatzailea 0 den lekuan dago.', 'La asíntota vertical está donde el denominador vale 0.', 'الخط المقارب الرأسي حيث يساوي المقام 0.', 'The vertical asymptote is where the denominator is 0.'),
    'piece-boundary': say('Begiratu mugako ikurrari: $\\le$ daramanak barne hartzen du muga.', 'Mira el signo del límite: el que lleva $\\le$ incluye el límite.', 'انظر إلى رمز الحدّ: الذي فيه $\\le$ يشمل الحدّ.', 'Look at the sign at the threshold: the one with $\\le$ includes it.'),
    'all-units': say('Lehen unitateek lehen prezioa dute; bigarrena gainditzen dutenei bakarrik.', 'Las primeras unidades van al primer precio; el segundo solo para las que pasan del límite.', 'الوحدات الأولى بالسعر الأول، والثاني لما يتجاوز الحدّ فقط.', 'The first units keep the first price; the second one is only for those beyond the limit.')
}

type Built = Omit<WorkedCase<SocFunctionsDetectiveError>, 'options'>

function build(random: Random, error: SocFunctionsDetectiveError): Built | null {
    switch (error) {
        case 'root-open': {
            const a = randomInt(random, 1, 9)
            return {
                problem: domainOf(`f(x)=\\sqrt{x-${a}}`),
                lines: [line(LABELS.condition, `x-${a}>0`), line(LABELS.step, `x>${a}`), line(LABELS.result, `(${a},+\\infty)`)],
                wrong: 0, error, fix: `x-${a}\\ge 0\\ \\to\\ [${a},+\\infty)`, right: a, reached: a + 0.5
            }
        }
        case 'denominator-forgotten': {
            const a = randomInt(random, 1, 4)
            const b = a + randomInt(random, 1, 4)
            return {
                problem: domainOf(`f(x)=\\frac{\\sqrt{x-${a}}}{x-${b}}`),
                lines: [line(LABELS.condition, `x-${a}\\ge 0`), line(LABELS.step, `x\\ge ${a}`), line(LABELS.result, `[${a},+\\infty)`)],
                wrong: 0, error, fix: `x\\ge ${a},\\ x\\neq ${b}\\ \\to\\ [${a},${b})\\cup(${b},+\\infty)`, right: b, reached: a
            }
        }
        case 'slope-flip': {
            const x1 = randomInt(random, 0, 3)
            const run = randomInt(random, 2, 4)
            const m = randomInt(random, 2, 5)
            const y1 = randomInt(random, 0, 6)
            const x2 = x1 + run
            const y2 = y1 + m * run
            return {
                problem: say(`Aurkitu $(${x1},${y1})$ eta $(${x2},${y2})$ puntuetatik pasatzen den zuzenaren malda.`, `Halla la pendiente de la recta por $(${x1},${y1})$ y $(${x2},${y2})$.`, `أوجد ميل المستقيم المار بـ $(${x1},${y1})$ و$(${x2},${y2})$.`, `Find the slope of the line through $(${x1},${y1})$ and $(${x2},${y2})$.`),
                lines: [line(LABELS.step, `m=\\frac{${x2}-${x1}}{${y2}-${y1}}`), line(LABELS.step, `m=\\frac{${run}}{${m * run}}`), line(LABELS.result, `m=\\frac{1}{${m}}`)],
                wrong: 0, error, fix: `m=\\frac{${y2}-${y1}}{${x2}-${x1}}=${m}`, right: m, reached: 1 / m
            }
        }
        case 'fixed-forgotten': {
            const F = 5 * randomInt(random, 1, 6)
            const v = randomInt(random, 2, 9)
            const x = randomInt(random, 3, 12)
            return {
                problem: say(`Zerbitzu batek ${F} € finko eta ${v} € unitateko kobratzen ditu. Zenbat kostatzen dira ${x} unitate?`, `Un servicio cobra ${F} € fijos y ${v} € por unidad. ¿Cuánto cuestan ${x} unidades?`, `تتقاضى خدمة ${F} € ثابتة و${v} € لكل وحدة. كم تكلّف ${x} وحدة؟`, `A service charges a fixed €${F} and €${v} per unit. How much do ${x} units cost?`),
                lines: [line(LABELS.step, `C(x)=${F}+${v}x`), line(LABELS.step, `C(${x})=${v}\\cdot ${x}`), line(LABELS.result, `${v * x}`)],
                wrong: 1, error, fix: `C(${x})=${F}+${v}\\cdot ${x}=${F + v * x}`, right: F + v * x, reached: v * x
            }
        }
        case 'vertex-sign': {
            const h = randomInt(random, 2, 7)
            const c = randomInt(random, 1, 9)
            return {
                problem: say(`Aurkitu $y=x^2+${2 * h}x+${c}$ parabolaren erpina.`, `Halla el vértice de $y=x^2+${2 * h}x+${c}$.`, `أوجد رأس $y=x^2+${2 * h}x+${c}$.`, `Find the vertex of $y=x^2+${2 * h}x+${c}$.`),
                lines: [line(LABELS.step, `x=\\frac{${2 * h}}{2\\cdot 1}=${h}`), line(LABELS.step, `y=${h * h}+${2 * h * h}+${c}`), line(LABELS.result, `(${h},${3 * h * h + c})`)],
                wrong: 0, error, fix: `x=-\\frac{${2 * h}}{2}=-${h}\\ \\to\\ (-${h},${c - h * h})`, right: -h, reached: h
            }
        }
        case 'x-not-value': {
            const h = 5 * randomInt(random, 2, 8)
            const c = 50 * randomInt(random, 1, 6)
            if (h * h <= c) return null
            return {
                problem: say(`Mozkina $B(x)=-x^2+${2 * h}x-${c}$ da. Zein da mozkinik handiena?`, `El beneficio es $B(x)=-x^2+${2 * h}x-${c}$. ¿Cuál es el beneficio máximo?`, `الربح $B(x)=-x^2+${2 * h}x-${c}$. ما أكبر ربح؟`, `The profit is $B(x)=-x^2+${2 * h}x-${c}$. What is the greatest profit?`),
                lines: [line(LABELS.step, `x=-\\frac{${2 * h}}{2\\cdot(-1)}=${h}`), line(LABELS.step, `B_{\\max}=${h}`), line(LABELS.result, `${h}`)],
                wrong: 1, error, fix: `B(${h})=-${h * h}+${2 * h * h}-${c}=${h * h - c}`, right: h * h - c, reached: h
            }
        }
        case 'cost-ignored': {
            const k = randomInt(random, 2, 5)
            const top = 2 * randomInt(random, 5, 15)
            const v = 2 * randomInt(random, 1, top / 2 - 2)
            const Q = k * top
            return {
                problem: say(`$q=${Q}-${k}p$ saltzen da, eta unitate bakoitzak ${v} € kostatzen ditu. Zein preziok ematen du mozkinik handiena?`, `Se venden $q=${Q}-${k}p$ unidades y cada una cuesta ${v} €. ¿Qué precio da el beneficio máximo?`, `تُباع $q=${Q}-${k}p$ وحدة وتكلّف كل وحدة ${v} €. أي سعر يعطي أكبر ربح؟`, `$q=${Q}-${k}p$ units sell and each costs €${v}. Which price gives the greatest profit?`),
                lines: [line(LABELS.step, `B(p)=p(${Q}-${k}p)`), line(LABELS.step, `p=\\frac{${Q}}{2\\cdot ${k}}`), line(LABELS.result, `p=${top / 2}`)],
                wrong: 0, error, fix: `B(p)=(p-${v})(${Q}-${k}p)\\ \\to\\ p=\\frac{${top}+${v}}{2}=${(top + v) / 2}`, right: (top + v) / 2, reached: top / 2
            }
        }
        case 'interp-base': {
            const x1 = 10 * randomInt(random, 0, 2)
            const m = randomInt(random, 2, 6)
            const y1 = 10 * randomInt(random, 2, 8)
            const x2 = x1 + 20
            const y2 = y1 + 20 * m
            const x = x1 + 10
            return {
                problem: say(`$x=${x1}$ denean $y=${y1}$, eta $x=${x2}$ denean $y=${y2}$. Interpolatu $y$, $x=${x}$ denean.`, `Con $x=${x1}$, $y=${y1}$, y con $x=${x2}$, $y=${y2}$. Interpola $y$ en $x=${x}$.`, `عند $x=${x1}$ تكون $y=${y1}$، وعند $x=${x2}$ تكون $y=${y2}$. استوفِ $y$ عند $x=${x}$.`, `At $x=${x1}$, $y=${y1}$, and at $x=${x2}$, $y=${y2}$. Interpolate $y$ at $x=${x}$.`),
                lines: [line(LABELS.step, `m=\\frac{${y2}-${y1}}{${x2}-${x1}}=${m}`), line(LABELS.step, `y=${y2}+${m}(x-${x1})`), line(LABELS.result, `${y2 + m * 10}`)],
                wrong: 1, error, fix: `y=${y1}+${m}(x${signed(-x1)})\\ \\to\\ ${y1 + m * 10}`, right: y1 + 10 * m, reached: y2 + 10 * m
            }
        }
        case 'inverse-direct': {
            const workers = randomInt(random, 2, 6)
            const days = 2 * randomInt(random, 3, 9)
            const more = workers * 2
            return {
                problem: say(`${workers} langilek ${days} egun behar dituzte. Zenbat egun beharko dituzte ${more} langilek?`, `${workers} trabajadores tardan ${days} días. ¿Cuántos días tardarán ${more} trabajadores?`, `يحتاج ${workers} عمال إلى ${days} يومًا. كم يومًا يحتاج ${more} عاملًا؟`, `${workers} workers take ${days} days. How many days will ${more} workers take?`),
                lines: [line(LABELS.step, `\\frac{${more}}{${workers}}=2`), line(LABELS.step, `${days}\\cdot 2`), line(LABELS.result, `${days * 2}`)],
                wrong: 1, error, fix: `${workers}\\cdot ${days}=${workers * days}\\ \\to\\ \\frac{${workers * days}}{${more}}=${days / 2}`, right: days / 2, reached: days * 2
            }
        }
        case 'asymptote-sign': {
            const b = randomInt(random, 1, 6)
            const a = randomInt(random, 1, 6)
            const k = randomInt(random, 1, 9)
            return {
                problem: say(`Aurkitu $y=${a}+\\frac{${k}}{x-${b}}$ funtzioaren asintotak.`, `Halla las asíntotas de $y=${a}+\\frac{${k}}{x-${b}}$.`, `أوجد الخطين المقاربين لـ $y=${a}+\\frac{${k}}{x-${b}}$.`, `Find the asymptotes of $y=${a}+\\frac{${k}}{x-${b}}$.`),
                lines: [line(LABELS.step, `x=-${b}`), line(LABELS.step, `y=${a}`), line(LABELS.result, `x=-${b},\\ y=${a}`)],
                wrong: 0, error, fix: `x-${b}=0\\ \\to\\ x=${b}`, right: b, reached: -b
            }
        }
        case 'piece-boundary': {
            const t = 10 * randomInt(random, 1, 5)
            const base = randomInt(random, 3, 9)
            const rate = randomInt(random, 1, 3)
            const left = base
            const right = base + rate * t / 10 + 2
            const formula = `f(x)=\\begin{cases}${base} & x\\le ${t}\\\\ ${base + 2}+${dec(rate / 10)}x & x>${t}\\end{cases}`
            return {
                problem: say(`$${formula}$ bada, kalkulatu $f(${t})$.`, `Si $${formula}$, calcula $f(${t})$.`, `إذا كانت $${formula}$ فاحسب $f(${t})$.`, `If $${formula}$, work out $f(${t})$.`),
                lines: [line(LABELS.piece, `x>${t}`), line(LABELS.step, `f(${t})=${base + 2}+${dec(rate / 10)}\\cdot ${t}`), line(LABELS.result, `${right}`)],
                wrong: 0, error, fix: `${t}\\le ${t}\\ \\to\\ f(${t})=${left}`, right: left, reached: right
            }
        }
        case 'all-units': {
            const L = 20 * randomInt(random, 2, 6)
            const r1 = 10 * randomInt(random, 1, 3)
            const r2 = r1 + 10
            const x = L + 20 * randomInt(random, 1, 4)
            const right = (r1 * L + r2 * (x - L)) / 100
            const reached = (r2 * x) / 100
            return {
                problem: say(`Lehen ${L} kopiek ${dec2(r1)} € balio dute bakoitzak, eta gainerakoek ${dec2(r2)} €. Zenbat kostatzen dira ${x} kopia?`, `Las ${L} primeras copias valen ${dec2(r1)} € cada una, y las demás, ${dec2(r2)} €. ¿Cuánto cuestan ${x} copias?`, `أول ${L} نسخة بسعر ${point2(r1)} € للنسخة والباقي بـ ${point2(r2)} €. كم تكلّف ${x} نسخة؟`, `The first ${L} copies cost €${point2(r1)} each, and the rest €${point2(r2)}. How much do ${x} copies cost?`),
                lines: [line(LABELS.step, `${x}>${L}`), line(LABELS.step, `${dec(r2 / 100)}\\cdot ${x}`), line(LABELS.result, `${dec(reached)}`)],
                wrong: 1, error, fix: `${dec(r1 / 100)}\\cdot ${L}+${dec(r2 / 100)}\\cdot ${x - L}=${dec(right)}`, right, reached
            }
        }
    }
}

/** A decimal for LaTeX, with the comma */
function dec(value: number): string {
    return String(Math.round(value * 1000) / 1000).replace('.', '{,}')
}
/** Cents as euros in words: 0,1 or 0.1 */
const dec2 = (cents: number) => String(cents / 100).replace('.', ',')
const point2 = (cents: number) => String(cents / 100)

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createSocFunctionsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, socFunctionsDetectiveLevels[levelIndex], SOC_FUNCTIONS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

/** Every case of a level, for the tests */
export const SOC_FUNCTIONS_DETECTIVE_ERRORS = socFunctionsDetectiveLevels.flat()
