import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import { fraction, toLatex } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { lineLatex, signed } from '../functions.ts'

/* ==========================================================================
   Funtzioen detektibea (2. DBH): a worked solution of three lines with
   one wrong line. Level 1: points and slope (the point substituted the
   wrong way round, the slope upside down, the differences in mixed
   order, the cut with the x-axis taken as the intercept); level 2:
   proportion and tables (adding the difference instead of multiplying,
   the constant upside down, the rise not divided by the run, the
   intercept read at a point that is not x = 0); level 3: lines in
   context (the fixed charge forgotten, charge and rate swapped, a loss
   added, hours mixed with minutes).
   ========================================================================== */

export type FunctionsDetectiveError =
    | 'point-swapped'
    | 'slope-upside-down'
    | 'slope-mixed-order'
    | 'x-cut-as-intercept'
    | 'difference-added'
    | 'constant-upside-down'
    | 'rise-not-divided'
    | 'intercept-not-at-zero'
    | 'fixed-charge-forgotten'
    | 'charge-and-rate-swapped'
    | 'loss-added'
    | 'units-mixed'

export const functionsDetectiveLevels: FunctionsDetectiveError[][] = [
    ['point-swapped', 'slope-upside-down', 'slope-mixed-order', 'x-cut-as-intercept'],
    ['difference-added', 'constant-upside-down', 'rise-not-divided', 'intercept-not-at-zero'],
    ['fixed-charge-forgotten', 'charge-and-rate-swapped', 'loss-added', 'units-mixed']
]

export const FUNCTIONS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    solve: say('Askatu', 'Despeja', 'اعزل', 'Solve'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    differences: say('Kendurak', 'Diferencias', 'الفروق', 'Differences'),
    slope: say('Malda', 'Pendiente', 'الميل', 'Slope'),
    intercept: say('Jatorriko ordenatua', 'Ordenada en el origen', 'الجزء المقطوع من محور y', 'y-intercept'),
    cut: say('Y ardatzarekiko ebakidura', 'Corte con el eje Y', 'التقاطع مع محور y', 'Cut with the y-axis'),
    constant: say('Konstantea', 'Constante', 'الثابت', 'Constant'),
    formula: say('Formula', 'Fórmula', 'الصيغة', 'Formula'),
    rise: say('y-ren igoera', 'Subida de y', 'زيادة y', 'Rise of y')
}

export const functionsDetectiveNames: Record<FunctionsDetectiveError, LocalizedText> = {
    'point-swapped': say('Puntuaren koordenatuak alderantziz ordeztu ditu', 'Sustituyó las coordenadas del punto al revés', 'عوّض إحداثيي النقطة بالعكس', 'Substituted the coordinates of the point the wrong way round'),
    'slope-upside-down': say('Malda alderantziz kalkulatu du: x-ren kendura zati y-rena', 'Calculó la pendiente al revés: diferencia de x entre la de y', 'حسب الميل بالعكس: فرق x على فرق y', 'Worked out the slope upside down: change in x over change in y'),
    'slope-mixed-order': say('Kendurak ordena desberdinean egin ditu', 'Restó en distinto orden arriba y abajo', 'طرح بترتيب مختلف في البسط والمقام', 'Subtracted in a different order on top and underneath'),
    'x-cut-as-intercept': say('X ardatzarekiko ebakidura kalkulatu du, Y ardatzarekikoa beharrean', 'Calculó el corte con el eje X en vez del eje Y', 'حسب التقاطع مع محور x بدل محور y', 'Worked out the cut with the x-axis instead of the y-axis'),
    'difference-added': say('Kendura batu du, konstanteaz biderkatu beharrean', 'Sumó la diferencia en vez de multiplicar por la constante', 'جمع الفرق بدل الضرب في الثابت', 'Added the difference instead of multiplying by the constant'),
    'constant-upside-down': say('Konstantea alderantziz kalkulatu du: x zati y', 'Calculó la constante al revés: x entre y', 'حسب الثابت بالعكس: x على y', 'Worked out the constant upside down: x over y'),
    'rise-not-divided': say('y-ren igoera ez du x-renaz zatitu', 'No dividió la subida de y entre el avance de x', 'لم يقسم زيادة y على تقدّم x', 'Did not divide the rise of y by the run of x'),
    'intercept-not-at-zero': say('x = 0 ez den puntu bateko y hartu du ordenatutzat', 'Tomó como ordenada en el origen la y de un punto con x distinto de 0', 'اعتبر y لنقطة ليست فيها x = 0 هو الجزء المقطوع', 'Took the y of a point where x is not 0 as the intercept'),
    'fixed-charge-forgotten': say('Kopuru finkoa ahaztu du', 'Olvidó la cantidad fija', 'نسي المبلغ الثابت', 'Forgot the fixed charge'),
    'charge-and-rate-swapped': say('Kopuru finkoa eta unitateko prezioa trukatu ditu', 'Intercambió la cantidad fija y el precio por unidad', 'بادل المبلغ الثابت وسعر الوحدة', 'Swapped the fixed charge and the price per unit'),
    'loss-added': say('Galera bat batu du, kendu beharrean', 'Sumó una pérdida en vez de restarla', 'جمع النقصان بدل طرحه', 'Added a loss instead of subtracting it'),
    'units-mixed': say('Orduak eta minutuak nahastu ditu', 'Mezcló horas y minutos', 'خلط الساعات والدقائق', 'Mixed hours and minutes')
}

export const functionsDetectiveTips: Record<FunctionsDetectiveError, LocalizedText> = {
    'point-swapped': say('$(a,b)$ puntuan, lehena x da eta bigarrena y.', 'En el punto $(a,b)$, el primero es x y el segundo es y.', 'في النقطة $(a,b)$ الأول x والثاني y.', 'In the point $(a,b)$, the first number is x and the second is y.'),
    'slope-upside-down': say('$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$: y-ren aldaketa goian.', '$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$: el cambio de y va arriba.', '$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$: تغيّر y في البسط.', '$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$: the change in y goes on top.'),
    'slope-mixed-order': say('Goian eta behean puntu bera lehenik: $\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.', 'Arriba y abajo, el mismo punto primero: $\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.', 'النقطة نفسها أولًا في البسط والمقام: $\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.', 'On top and underneath, the same point first: $\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.'),
    'x-cut-as-intercept': say('Y ardatzean $x=0$: ordenatua $n$ da.', 'En el eje Y, $x=0$: la ordenada es $n$.', 'على محور y يكون $x=0$: والجزء المقطوع هو $n$.', 'On the y-axis $x=0$: the intercept is $n$.'),
    'difference-added': say('Proportzionaltasunean $y=k\\cdot x$: biderkatu, ez batu.', 'En la proporcionalidad $y=k\\cdot x$: se multiplica, no se suma.', 'في التناسب $y=k\\cdot x$: نضرب ولا نجمع.', 'In a proportion $y=k\\cdot x$: multiply, do not add.'),
    'constant-upside-down': say('$k=\\frac{y}{x}$: x bakoitzeko zenbat y.', '$k=\\frac{y}{x}$: cuánta y por cada x.', '$k=\\frac{y}{x}$: كم y لكل x.', '$k=\\frac{y}{x}$: how much y for each x.'),
    'rise-not-divided': say('x 2 aurrera egiten badu, malda igoeraren erdia da.', 'Si x avanza 2, la pendiente es la mitad de la subida.', 'إذا تقدّمت x بمقدار 2 فالميل نصف الزيادة.', 'If x moves on by 2, the slope is half the rise.'),
    'intercept-not-at-zero': say('$n$ zuzenaren balioa da $x=0$ denean: $n=y-m\\cdot x$.', '$n$ es el valor de la recta en $x=0$: $n=y-m\\cdot x$.', '$n$ قيمة المستقيم عند $x=0$: $n=y-m\\cdot x$.', '$n$ is the value of the line at $x=0$: $n=y-m\\cdot x$.'),
    'fixed-charge-forgotten': say('Kopuru finkoa jatorriko ordenatua da: $y=mx+n$.', 'La cantidad fija es la ordenada en el origen: $y=mx+n$.', 'المبلغ الثابت هو الجزء المقطوع: $y=mx+n$.', 'The fixed charge is the intercept: $y=mx+n$.'),
    'charge-and-rate-swapped': say('Unitateko prezioak x biderkatzen du; finkoa bakarrik batzen da.', 'El precio por unidad multiplica a x; la cantidad fija solo se suma.', 'سعر الوحدة يضرب x؛ والمبلغ الثابت يُجمع فقط.', 'The price per unit multiplies x; the fixed charge is only added.'),
    'loss-added': say('Galtzen bada, malda negatiboa da: $y=n-mx$.', 'Si se pierde, la pendiente es negativa: $y=n-mx$.', 'إذا كان نقصانًا فالميل سالب: $y=n-mx$.', 'If something is lost, the slope is negative: $y=n-mx$.'),
    'units-mixed': say('Prezioa minutuko bada, x minututan jarri: $1\\ \\text{h}=60\\ \\text{min}$.', 'Si el precio es por minuto, x va en minutos: $1\\ \\text{h}=60\\ \\text{min}$.', 'إذا كان السعر للدقيقة فإن x بالدقائق: $1\\ \\text{h}=60\\ \\text{min}$.', 'If the price is per minute, x goes in minutes: $1\\ \\text{h}=60\\ \\text{min}$.')
}

/** A number for LaTeX: whole, a simplified fraction, or a decimal with the comma */
const value = (numerator: number, denominator = 1) => toLatex(fraction(numerator, denominator))
const decimal = (number: number) => String(Math.round(number * 100) / 100).replace('.', '{,}')
/** A decimal in a Basque or Spanish sentence; English and Arabic keep the point */
const comma = (number: number) => String(number).replace('.', ',')
const signedRange = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => index + min).filter((item) => item !== 0)

type Built = Omit<WorkedCase<FunctionsDetectiveError>, 'options'>

function build(random: Random, error: FunctionsDetectiveError): Built | null {
    switch (error) {
        case 'point-swapped': {
            const m = pick(random, [2, 3, 4, 5])
            const n = pick(random, signedRange(-6, 6))
            const x = randomInt(random, 2, 6)
            const reached = (x - n) / m
            if (!Number.isInteger(reached)) return null
            return {
                problem: say(`$(${x},b)$ puntua $${lineLatex(m, n)}$ zuzenean dago. Kalkulatu b.`, `El punto $(${x},b)$ está en la recta $${lineLatex(m, n)}$. Halla b.`, `النقطة $(${x},b)$ تقع على المستقيم $${lineLatex(m, n)}$. أوجد b.`, `The point $(${x},b)$ lies on the line $${lineLatex(m, n)}$. Find b.`),
                lines: [
                    line(LABELS.substitute, `${x}=${m}b${n < 0 ? '-' : '+'}${Math.abs(n)}`),
                    line(LABELS.solve, `${m}b=${x - n}`),
                    line(LABELS.result, `b=${reached}`)
                ],
                wrong: 0,
                error,
                fix: `b=${m}\\cdot ${x}${n < 0 ? '-' : '+'}${Math.abs(n)}=${m * x + n}`,
                right: m * x + n,
                reached
            }
        }
        case 'slope-upside-down': {
            const x1 = randomInt(random, -3, 2)
            const run = pick(random, [1, 2, 3])
            const m = pick(random, [2, 3, -2, -3])
            const y1 = randomInt(random, -4, 4)
            const [x2, y2] = [x1 + run, y1 + m * run]
            return {
                problem: say(`Kalkulatu $A(${x1},${y1})$ eta $B(${x2},${y2})$ puntuetatik pasatzen den zuzenaren malda.`, `Calcula la pendiente de la recta que pasa por $A(${x1},${y1})$ y $B(${x2},${y2})$.`, `احسب ميل المستقيم المار بالنقطتين $A(${x1},${y1})$ و$B(${x2},${y2})$.`, `Work out the slope of the line through $A(${x1},${y1})$ and $B(${x2},${y2})$.`),
                lines: [
                    line(LABELS.differences, `\\Delta x=${run},\\ \\Delta y=${m * run}`),
                    line(LABELS.slope, `m=\\frac{${run}}{${m * run}}`),
                    line(LABELS.result, `m=${value(run, m * run)}`)
                ],
                wrong: 1,
                error,
                fix: `m=\\frac{${m * run}}{${run}}=${m}`,
                right: m,
                reached: run / (m * run)
            }
        }
        case 'slope-mixed-order': {
            const x1 = randomInt(random, -3, 1)
            const run = pick(random, [1, 2, 3])
            const m = pick(random, [1, 2, 3, -1, -2])
            const y1 = randomInt(random, -4, 4)
            const [x2, y2] = [x1 + run, y1 + m * run]
            const paren = (number: number) => (number < 0 ? `(${number})` : String(number))
            return {
                problem: say(`Kalkulatu $A(${x1},${y1})$ eta $B(${x2},${y2})$ puntuetatik pasatzen den zuzenaren malda.`, `Calcula la pendiente de la recta que pasa por $A(${x1},${y1})$ y $B(${x2},${y2})$.`, `احسب ميل المستقيم المار بالنقطتين $A(${x1},${y1})$ و$B(${x2},${y2})$.`, `Work out the slope of the line through $A(${x1},${y1})$ and $B(${x2},${y2})$.`),
                lines: [
                    line(LABELS.slope, `m=\\frac{${y2}-${paren(y1)}}{${x1}-${paren(x2)}}`),
                    line(LABELS.differences, `m=\\frac{${m * run}}{${-run}}`),
                    line(LABELS.result, `m=${-m}`)
                ],
                wrong: 0,
                error,
                fix: `m=\\frac{${y2}-${paren(y1)}}{${x2}-${paren(x1)}}=${m}`,
                right: m,
                reached: -m
            }
        }
        case 'x-cut-as-intercept': {
            const m = pick(random, [2, 3, 4, -2, -3])
            const root = pick(random, signedRange(-4, 4))
            const n = -m * root
            return {
                problem: say(`Non mozten du $${lineLatex(m, n)}$ zuzenak Y ardatza?`, `¿Dónde corta la recta $${lineLatex(m, n)}$ al eje Y?`, `أين يقطع المستقيم $${lineLatex(m, n)}$ محور y؟`, `Where does the line $${lineLatex(m, n)}$ cut the y-axis?`),
                lines: [
                    line(LABELS.cut, `${lineLatex(m, n).slice(2)}=0`),
                    line(LABELS.solve, `x=\\frac{${-n}}{${m}}=${root}`),
                    line(LABELS.result, `n=${root}`)
                ],
                wrong: 0,
                error,
                fix: `x=0\\ \\to\\ n=${n}`,
                right: n,
                reached: root
            }
        }
        case 'difference-added': {
            const k = pick(random, [1.5, 2, 2.5, 3, 4])
            const x1 = pick(random, [2, 4, 6])
            const x2 = x1 + pick(random, [2, 4, 6])
            const y1 = k * x1
            const reached = y1 + (x2 - x1)
            return {
                problem: say(`Proportzionaltasun zuzeneko funtzio batean, $x=${x1}$ denean $y=${decimal(y1)}$. Zenbat da y, $x=${x2}$ denean?`, `En una función de proporcionalidad directa, para $x=${x1}$ es $y=${decimal(y1)}$. ¿Cuánto vale y para $x=${x2}$?`, `في دالة تناسب طردي، عندما $x=${x1}$ يكون $y=${decimal(y1)}$. كم تساوي y عندما $x=${x2}$؟`, `In a direct proportion, for $x=${x1}$ we have $y=${decimal(y1)}$. What is y for $x=${x2}$?`),
                lines: [
                    line(LABELS.differences, `${x2}-${x1}=${x2 - x1}`),
                    line(LABELS.substitute, `y=${decimal(y1)}+${x2 - x1}`),
                    line(LABELS.result, `y=${decimal(reached)}`)
                ],
                wrong: 1,
                error,
                fix: `k=\\frac{${decimal(y1)}}{${x1}}=${decimal(k)}\\ \\to\\ y=${decimal(k)}\\cdot ${x2}=${decimal(k * x2)}`,
                right: k * x2,
                reached
            }
        }
        case 'constant-upside-down': {
            const k = pick(random, [2, 3, 4, 5])
            const x1 = pick(random, [2, 3, 4, 5])
            const x2 = pick(random, [6, 8, 10, 12].filter((item) => item !== x1))
            const y1 = k * x1
            return {
                problem: say(`Proportzionaltasun zuzeneko funtzio batean, $x=${x1}$ denean $y=${y1}$. Zenbat da y, $x=${x2}$ denean?`, `En una función de proporcionalidad directa, para $x=${x1}$ es $y=${y1}$. ¿Cuánto vale y para $x=${x2}$?`, `في دالة تناسب طردي، عندما $x=${x1}$ يكون $y=${y1}$. كم تساوي y عندما $x=${x2}$؟`, `In a direct proportion, for $x=${x1}$ we have $y=${y1}$. What is y for $x=${x2}$?`),
                lines: [
                    line(LABELS.constant, `k=\\frac{${x1}}{${y1}}=${value(x1, y1)}`),
                    line(LABELS.formula, `y=${value(x1, y1)}x`),
                    line(LABELS.result, `y=${value(x1, y1)}\\cdot ${x2}=${value(x1 * x2, y1)}`)
                ],
                wrong: 0,
                error,
                fix: `k=\\frac{${y1}}{${x1}}=${k}\\ \\to\\ y=${k}\\cdot ${x2}=${k * x2}`,
                right: k * x2,
                reached: (x1 * x2) / y1
            }
        }
        case 'rise-not-divided': {
            const m = pick(random, [2, 3, 4, -2])
            const n = pick(random, [1, 2, 3, -1, 5])
            const x = pick(random, [3, 5, 7])
            const rise = 2 * m
            const ys = [n, n + rise, n + 2 * rise].map(signed)
            return {
                problem: say(`Taula: $x$: 0, 2, 4; $y$: ${ys.join(', ')}. Zuzen bat da. Kalkulatu y, $x=${x}$ denean.`, `Tabla: $x$: 0, 2, 4; $y$: ${ys.join(', ')}. Es una recta. Calcula y para $x=${x}$.`, `جدول: $x$: 0، 2، 4؛ $y$: ${ys.join('، ')}. إنه مستقيم. احسب y عندما $x=${x}$.`, `Table: $x$: 0, 2, 4; $y$: ${ys.join(', ')}. It is a straight line. Work out y for $x=${x}$.`),
                lines: [
                    line(LABELS.rise, `${n + rise}-${n < 0 ? `(${n})` : n}=${rise}`),
                    line(LABELS.slope, `m=${rise}`),
                    line(LABELS.result, `y=${rise}\\cdot ${x}${n < 0 ? '-' : '+'}${Math.abs(n)}=${rise * x + n}`)
                ],
                wrong: 1,
                error,
                fix: `m=\\frac{${rise}}{2}=${m}\\ \\to\\ y=${m}\\cdot ${x}${n < 0 ? '-' : '+'}${Math.abs(n)}=${m * x + n}`,
                right: m * x + n,
                reached: rise * x + n
            }
        }
        case 'intercept-not-at-zero': {
            const m = pick(random, [2, 3, -2])
            const n = pick(random, [1, 3, -1, 4])
            const x1 = pick(random, [1, 2])
            const x2 = x1 + 2
            const [y1, y2] = [m * x1 + n, m * x2 + n]
            const x = pick(random, [5, 6])
            return {
                problem: say(`Zuzen bat $(${x1},${y1})$ eta $(${x2},${y2})$ puntuetatik pasatzen da. Kalkulatu y, $x=${x}$ denean.`, `Una recta pasa por $(${x1},${y1})$ y $(${x2},${y2})$. Calcula y para $x=${x}$.`, `مستقيم يمر بالنقطتين $(${x1},${y1})$ و$(${x2},${y2})$. احسب y عندما $x=${x}$.`, `A line passes through $(${x1},${y1})$ and $(${x2},${y2})$. Work out y for $x=${x}$.`),
                lines: [
                    line(LABELS.slope, `m=\\frac{${y2}-${y1 < 0 ? `(${y1})` : y1}}{${x2}-${x1}}=${m}`),
                    line(LABELS.intercept, `n=${y1}`),
                    line(LABELS.result, `y=${m}\\cdot ${x}${y1 < 0 ? '-' : '+'}${Math.abs(y1)}=${m * x + y1}`)
                ],
                wrong: 1,
                error,
                fix: `n=${y1}-${m < 0 ? `(${m})` : m}\\cdot ${x1}=${n}\\ \\to\\ y=${m * x + n}`,
                right: m * x + n,
                reached: m * x + y1
            }
        }
        case 'fixed-charge-forgotten': {
            const fee = pick(random, [2.5, 3, 3.5, 4])
            const rate = pick(random, [1.2, 1.5, 2])
            const km = pick(random, [5, 8, 10, 12])
            return {
                problem: say(`Taxi batek ${comma(fee)} € kobratzen ditu hasieran eta ${comma(rate)} € kilometroko. Zenbat balio dute ${km} kilometrok?`, `Un taxi cobra ${comma(fee)} € de bajada de bandera y ${comma(rate)} € por kilómetro. ¿Cuánto cuestan ${km} km?`, `تتقاضى سيارة أجرة ${fee} يورو عند الانطلاق و${rate} يورو لكل كيلومتر. كم تكلّف ${km} كم؟`, `A taxi charges €${fee} to start and €${rate} per kilometre. How much do ${km} km cost?`),
                lines: [
                    line(LABELS.formula, `y=${decimal(rate)}x`),
                    line(LABELS.substitute, `y=${decimal(rate)}\\cdot ${km}`),
                    line(LABELS.result, `y=${decimal(rate * km)}`)
                ],
                wrong: 0,
                error,
                fix: `y=${decimal(rate)}x+${decimal(fee)}\\ \\to\\ y=${decimal(rate * km + fee)}`,
                right: Math.round((rate * km + fee) * 100) / 100,
                reached: Math.round(rate * km * 100) / 100
            }
        }
        case 'charge-and-rate-swapped': {
            const fee = pick(random, [5, 6, 8, 10])
            const rate = pick(random, [2, 3, 4])
            const hours = pick(random, [3, 4, 5, 6])
            return {
                problem: say(`Bizikleta bat alokatzeko ${fee} € ordaintzen dira hasieran eta ${rate} € orduko. Zenbat ordaintzen da ${hours} ordurengatik?`, `Alquilar una bici cuesta ${fee} € fijos y ${rate} € por hora. ¿Cuánto se paga por ${hours} horas?`, `استئجار دراجة يكلّف ${fee} يورو ثابتة و${rate} يورو لكل ساعة. كم ندفع مقابل ${hours} ساعات؟`, `Renting a bike costs €${fee} fixed and €${rate} per hour. How much do you pay for ${hours} hours?`),
                lines: [
                    line(LABELS.formula, lineLatex(fee, rate)),
                    line(LABELS.substitute, `y=${fee}\\cdot ${hours}+${rate}`),
                    line(LABELS.result, `y=${fee * hours + rate}`)
                ],
                wrong: 0,
                error,
                fix: `${lineLatex(rate, fee)}\\ \\to\\ y=${rate}\\cdot ${hours}+${fee}=${rate * hours + fee}`,
                right: rate * hours + fee,
                reached: fee * hours + rate
            }
        }
        case 'loss-added': {
            const start = pick(random, [300, 400, 500, 600])
            const loss = pick(random, [15, 20, 25, 30])
            const hours = pick(random, [4, 6, 8])
            return {
                problem: say(`Depositu batek ${start} L ditu eta orduko ${loss} L galtzen ditu. Zenbat litro geratzen dira ${hours} ordu barru?`, `Un depósito tiene ${start} L y pierde ${loss} L cada hora. ¿Cuántos litros quedan a las ${hours} horas?`, `في خزان ${start} لتر ويفقد ${loss} لترًا كل ساعة. كم لترًا يبقى بعد ${hours} ساعات؟`, `A tank holds ${start} L and loses ${loss} L every hour. How many litres are left after ${hours} hours?`),
                lines: [
                    line(LABELS.formula, `y=${start}+${loss}x`),
                    line(LABELS.substitute, `y=${start}+${loss}\\cdot ${hours}`),
                    line(LABELS.result, `y=${start + loss * hours}`)
                ],
                wrong: 0,
                error,
                fix: `y=${start}-${loss}x\\ \\to\\ y=${start}-${loss}\\cdot ${hours}=${start - loss * hours}`,
                right: start - loss * hours,
                reached: start + loss * hours
            }
        }
        case 'units-mixed': {
            const fee = pick(random, [5, 6, 8])
            const cents = pick(random, [0.05, 0.1, 0.15])
            const hours = pick(random, [1, 2])
            const minutes = 60 * hours
            return {
                problem: say(`Telefono-tarifa batek ${fee} € ditu hilean eta ${comma(cents)} € minutuko. Zenbat ordainduko da ${hours === 1 ? 'ordu batengatik' : `${hours} ordurengatik`}?`, `Una tarifa de móvil cuesta ${fee} € al mes y ${comma(cents)} € por minuto. ¿Cuánto se paga por ${hours === 1 ? '1 hora' : `${hours} horas`}?`, `تعريفة هاتف تكلّف ${fee} يورو شهريًا و${cents} يورو للدقيقة. كم ندفع مقابل ${hours === 1 ? 'ساعة واحدة' : 'ساعتين'}؟`, `A phone plan costs €${fee} a month and €${cents} a minute. How much do you pay for ${hours === 1 ? '1 hour' : `${hours} hours`}?`),
                lines: [
                    line(LABELS.formula, `y=${decimal(cents)}x+${fee}`),
                    line(LABELS.substitute, `y=${decimal(cents)}\\cdot ${hours}+${fee}`),
                    line(LABELS.result, `y=${decimal(cents * hours + fee)}`)
                ],
                wrong: 1,
                error,
                fix: `${hours}\\ \\text{h}=${minutes}\\ \\text{min}\\ \\to\\ y=${decimal(cents)}\\cdot ${minutes}+${fee}=${decimal(cents * minutes + fee)}`,
                right: Math.round((cents * minutes + fee) * 100) / 100,
                reached: Math.round((cents * hours + fee) * 100) / 100
            }
        }
    }
}

export const createFunctionsDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, functionsDetectiveLevels[levelIndex], FUNCTIONS_DETECTIVE_CASES, build)
