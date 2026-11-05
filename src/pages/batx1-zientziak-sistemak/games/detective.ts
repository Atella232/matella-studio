import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J4 · Sistemen detektibea (Detective de sistemas): a worked solution of
   three lines with one wrong line, the mistakes of this unit. Level 1
   (Gauss): the constant term left out of a row operation, a sign lost when
   subtracting rows, a sign lost when substituting back, an equation
   multiplied on one side only. Level 2 (analysing): 0z = 0 read as «no
   solution», 0z = 5 read as z = 0, dividing by a − k for every a, one
   particular solution given as the answer. Level 3 (non-linear and
   inequalities): dividing by x, x² = 16 with one root, a logarithm of a
   negative kept, a half-plane not turned when dividing by a negative.
   `right` and `reached` only tell the cases apart.
   ========================================================================== */

export type BachSystemsDetectiveError =
    | 'constant-forgotten'
    | 'row-sign'
    | 'back-sign'
    | 'one-side'
    | 'zero-row-none'
    | 'none-as-zero'
    | 'divide-parameter'
    | 'one-particular'
    | 'divide-by-x'
    | 'one-root'
    | 'log-kept'
    | 'flip-forgotten'

export const bachSystemsDetectiveLevels: BachSystemsDetectiveError[][] = [
    ['constant-forgotten', 'row-sign', 'back-sign', 'one-side'],
    ['zero-row-none', 'none-as-zero', 'divide-parameter', 'one-particular'],
    ['divide-by-x', 'one-root', 'log-kept', 'flip-forgotten']
]

export const BACH_SYSTEMS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    solve: say('Askatu', 'Despeja', 'حلّ', 'Solve'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    discuss: say('Mota', 'Tipo', 'النوع', 'Type')
}
const solveIt = (formula: string) => say(`Ebatzi $${formula}$.`, `Resuelve $${formula}$.`, `حُلّ $${formula}$.`, `Solve $${formula}$.`)
const discussIt = (formula: string) => say(`Eztabaidatu $${formula}$.`, `Discute $${formula}$.`, `ناقش $${formula}$.`, `Analyse $${formula}$.`)
const cases = (...rows: string[]) => `\\begin{cases}${rows.join('\\\\ ')}\\end{cases}`
/** A term c·v in LaTeX: 3y, -y, +2z (with the sign when it is not first) */
const term = (value: number, name: string, first = false) => (value === 0 ? '' : `${value < 0 ? '-' : first ? '' : '+'}${Math.abs(value) === 1 ? '' : Math.abs(value)}${name}`)

export const bachSystemsDetectiveNames: Record<BachSystemsDetectiveError, LocalizedText> = {
    'constant-forgotten': say('Gai askea ahaztu du eragiketan', 'Olvidó el término independiente en la operación', 'نسي الحد الثابت في العملية', 'Left the constant term out of the operation'),
    'row-sign': say('Zeinu bat galdu du errenkadak kentzean', 'Perdió un signo al restar las filas', 'أضاع إشارة عند طرح الصفين', 'Lost a sign when subtracting the rows'),
    'back-sign': say('Zeinua gaizki pasatu du ordeztean', 'Pasó mal el signo al sustituir', 'أخطأ في نقل الإشارة عند التعويض', 'Moved a sign wrongly when substituting'),
    'one-side': say('Ekuazioaren alde bat bakarrik biderkatu du', 'Multiplicó solo un lado de la ecuación', 'ضرب طرفًا واحدًا فقط من المعادلة', 'Multiplied only one side of the equation'),
    'zero-row-none': say('$0z=0$ soluziorik gabe bezala irakurri du', 'Leyó $0z=0$ como «sin solución»', 'قرأ $0z=0$ على أنها «لا حل»', 'Read $0z=0$ as «no solution»'),
    'none-as-zero': say('$0z=k$ ekuaziotik $z=0$ atera du', 'De $0z=k$ sacó $z=0$', 'استنتج $z=0$ من $0z=k$', 'Got $z=0$ from $0z=k$'),
    'divide-parameter': say('$a-k$ adierazpenaz zatitu du, $a=k$ aztertu gabe', 'Dividió entre $a-k$ sin estudiar $a=k$', 'قسم على $a-k$ دون دراسة $a=k$', 'Divided by $a-k$ without studying $a=k$'),
    'one-particular': say('Soluzio partikular bat bakarrik eman du', 'Dio una sola solución particular', 'أعطى حلًّا خاصًّا واحدًا فقط', 'Gave only one particular solution'),
    'divide-by-x': say('$x$ ezezagunaz zatitu du, eta $x=0$ galdu du', 'Dividió entre $x$ y perdió $x=0$', 'قسم على $x$ فأضاع $x=0$', 'Divided by $x$ and lost $x=0$'),
    'one-root': say('$x^2=c$ ekuazioaren erro positiboa bakarrik hartu du', 'Tomó solo la raíz positiva de $x^2=c$', 'أخذ الجذر الموجب فقط لـ $x^2=c$', 'Took only the positive root of $x^2=c$'),
    'log-kept': say('Negatibo baten logaritmoa ematen duen bikotea utzi du', 'Dejó un par que da el logaritmo de un negativo', 'أبقى زوجًا يعطي لوغاريتم عدد سالب', 'Kept a pair that gives the logarithm of a negative'),
    'flip-forgotten': say('Negatibo batez zatitzean ez du desberdintza biratu', 'Al dividir entre un negativo no giró la desigualdad', 'لم يقلب المتراجحة عند القسمة على سالب', 'Did not turn the inequality round when dividing by a negative')
}

export const bachSystemsDetectiveTips: Record<BachSystemsDetectiveError, LocalizedText> = {
    'constant-forgotten': say('Eragiketa errenkada osoarekin egiten da: $E_2-aE_1$ eskuinean ere bai.', 'La operación se hace con toda la fila: $E_2-aE_1$ también a la derecha.', 'تُجرى العملية على الصف كله: $E_2-aE_1$ في اليمين أيضًا.', 'The operation is done on the whole row: $E_2-aE_1$ on the right too.'),
    'row-sign': say('Kentzean, zeinu guztiak aldatzen dira: $b-(-1)=b+1$.', 'Al restar, cambian todos los signos: $b-(-1)=b+1$.', 'عند الطرح تتغير كل الإشارات: $b-(-1)=b+1$.', 'When subtracting, every sign changes: $b-(-1)=b+1$.'),
    'back-sign': say('$y-cz=r$ bada, $y=r+cz$.', 'Si $y-cz=r$, entonces $y=r+cz$.', 'إذا كان $y-cz=r$ فإن $y=r+cz$.', 'If $y-cz=r$, then $y=r+cz$.'),
    'one-side': say('Ekuazio bat biderkatzean, bi aldeak biderkatzen dira.', 'Al multiplicar una ecuación se multiplican los dos lados.', 'عند ضرب معادلة يُضرب طرفاها.', 'Multiplying an equation multiplies both sides.'),
    'zero-row-none': say('$0z=0$ beti betetzen da: infinitu soluzio daude, $z=\\lambda$.', '$0z=0$ se cumple siempre: hay infinitas soluciones, $z=\\lambda$.', '$0z=0$ تتحقق دائمًا: ما لا نهاية من الحلول، $z=\\lambda$.', '$0z=0$ always holds: there are infinitely many solutions, $z=\\lambda$.'),
    'none-as-zero': say('$0z=5$ ez da inoiz betetzen: ez dago soluziorik.', '$0z=5$ no se cumple nunca: no hay solución.', '$0z=5$ لا تتحقق أبدًا: لا حل.', '$0z=5$ never holds: there is no solution.'),
    'divide-parameter': say('Lehenik, aztertu aparte $a-k=0$ egiten duen balioa.', 'Estudia aparte el valor que hace $a-k=0$.', 'ادرس على حدة القيمة التي تجعل $a-k=0$.', 'Study separately the value that makes $a-k=0$.'),
    'one-particular': say('Infinitu soluzio daude: eman denak $\\lambda$ parametroarekin.', 'Hay infinitas soluciones: da todas con el parámetro $\\lambda$.', 'الحلول لا نهائية: أعطها كلها بالوسيط $\\lambda$.', 'There are infinitely many solutions: give them all with the parameter $\\lambda$.'),
    'divide-by-x': say('Atera $x$ faktore komun gisa: $x=0$ ere soluzioa da.', 'Saca $x$ factor común: $x=0$ también es solución.', 'أخرج $x$ عاملًا مشتركًا: $x=0$ حل أيضًا.', 'Take $x$ out as a common factor: $x=0$ is a solution too.'),
    'one-root': say('$x^2=c$ ekuazioak bi erro ditu: $x=\\pm\\sqrt{c}$.', '$x^2=c$ tiene dos raíces: $x=\\pm\\sqrt{c}$.', 'للمعادلة $x^2=c$ جذران: $x=\\pm\\sqrt{c}$.', '$x^2=c$ has two roots: $x=\\pm\\sqrt{c}$.'),
    'log-kept': say('Egiaztatu hasierako sisteman: zenbaki negatiboen logaritmorik ez dago.', 'Comprueba en el sistema de partida: no hay logaritmos de negativos.', 'تحقق في النظام الأصلي: لا لوغاريتمات للأعداد السالبة.', 'Check in the starting system: negatives have no logarithm.'),
    'flip-forgotten': say('Negatibo batez zatitzean, $\\le$ ikurra $\\ge$ bihurtzen da.', 'Al dividir entre un negativo, $\\le$ pasa a $\\ge$.', 'عند القسمة على سالب تصير $\\le$ إلى $\\ge$.', 'Dividing by a negative turns $\\le$ into $\\ge$.')
}

type Built = Omit<WorkedCase<BachSystemsDetectiveError>, 'options'>

function build(random: Random, error: BachSystemsDetectiveError): Built | null {
    switch (error) {
        case 'constant-forgotten': {
            // x + y = s, ax + by = t; E2 − aE1 gives (b − a)y = t − as, not (b − a)y = t
            const x = randomInt(random, 1, 4)
            const y = randomInt(random, 1, 4)
            const a = pick(random, [2, 3])
            const b = pick(random, [a + 1, a + 2, a - 1, a - 2].filter((value) => value !== 0))
            const d = b - a
            const s = x + y
            const t = a * x + b * y
            if (t % d !== 0) return null
            const reached = t / d
            return {
                problem: solveIt(cases(`x+y=${s}`, `${a}x${term(b, 'y')}=${t}`)),
                lines: [line(LABELS.step, `E_2-${a}E_1\\ \\to\\ ${term(d, 'y', true)}=${t}`), line(LABELS.solve, `y=${reached}`), line(LABELS.result, `x=${s - reached}`)],
                wrong: 0, error, fix: `${term(d, 'y', true)}=${t}-${a}\\cdot ${s}=${t - a * s}\\ \\to\\ y=${y}`, right: y, reached
            }
        }
        case 'row-sign': {
            // x − y = s, x + by = t; E2 − E1 gives (b + 1)y = t − s
            const x = randomInt(random, 1, 5)
            const y = randomInt(random, 1, 4)
            const b = pick(random, [2, 3, 4])
            const s = x - y
            const t = x + b * y
            if ((t - s) % (b - 1) !== 0) return null
            const reached = (t - s) / (b - 1)
            return {
                problem: solveIt(cases(`x-y=${s}`, `x+${b}y=${t}`)),
                lines: [line(LABELS.step, `E_2-E_1\\ \\to\\ ${term(b - 1, 'y', true)}=${t - s}`), line(LABELS.solve, `y=${reached}`), line(LABELS.result, `x=${s + reached}`)],
                wrong: 0, error, fix: `${b}-(-1)=${b + 1}\\ \\to\\ ${b + 1}y=${t - s},\\ y=${y}`, right: y, reached
            }
        }
        case 'back-sign': {
            const z = randomInt(random, 1, 4)
            const c = randomInt(random, 2, 3)
            const y = randomInt(random, 1, 5)
            const x = randomInt(random, -2, 3)
            const r = y - c * z
            const s = x + y + z
            const wrongY = r - c * z
            return {
                problem: solveIt(cases(`x+y+z=${s}`, `y-${c}z=${r}`, `z=${z}`)),
                lines: [line(LABELS.solve, `z=${z}`), line(LABELS.step, `y=${r}-${c}\\cdot ${z}=${wrongY}`), line(LABELS.result, `x=${s - wrongY - z}`)],
                wrong: 1, error, fix: `y=${r}+${c}\\cdot ${z}=${y}`, right: y, reached: wrongY
            }
        }
        case 'one-side': {
            // 2E1 written as 2x + 2y = s instead of 2s; then E2 − 2E1
            const x = randomInt(random, 1, 4)
            const y = randomInt(random, 1, 4)
            const b = pick(random, [3, 4, 5])
            const s = x + y
            const t = 2 * x + b * y
            const d = b - 2
            if ((t - s) % d !== 0) return null
            const reached = (t - s) / d
            return {
                problem: solveIt(cases(`x+y=${s}`, `2x+${b}y=${t}`)),
                lines: [line(LABELS.step, `2E_1\\ \\to\\ 2x+2y=${s}`), line(LABELS.step, `E_2-2E_1\\ \\to\\ ${term(d, 'y', true)}=${t - s}`), line(LABELS.result, `y=${reached}`)],
                wrong: 0, error, fix: `2x+2y=${2 * s}\\ \\to\\ ${term(d, 'y', true)}=${t - 2 * s},\\ y=${y}`, right: y, reached
            }
        }
        case 'zero-row-none': {
            const p = randomInt(random, 1, 3)
            const q = randomInt(random, 2, 6)
            return {
                problem: discussIt(cases(`x+y+z=${q}`, `y+${p}z=${q - 1}`, `2y+${2 * p}z=${2 * q - 2}`)),
                lines: [line(LABELS.step, `E_3-2E_2\\ \\to\\ 0z=0`), line(LABELS.solve, `y=${q - 1}${term(-p, 'z')}`), line(LABELS.result, `\\varnothing`)],
                wrong: 2, error, fix: `0z=0\\ \\to\\ z=\\lambda,\\ y=${q - 1}${term(-p, '\\lambda')}`, right: 2, reached: 0
            }
        }
        case 'none-as-zero': {
            const k = pick(random, [2, 3, 4, 5])
            const q = randomInt(random, 2, 6)
            return {
                problem: discussIt(cases(`x+y+z=${q}`, `y+z=1`, `y+z=${1 + k}`)),
                lines: [line(LABELS.step, `E_3-E_2\\ \\to\\ 0z=${k}`), line(LABELS.solve, `z=0`), line(LABELS.result, `y=1,\\ x=${q - 1}`)],
                wrong: 1, error, fix: `0z=${k}\\ \\to\\ \\varnothing`, right: 0, reached: 1
            }
        }
        case 'divide-parameter': {
            const c = pick(random, [-3, -2, 2, 3, 5])
            const r = randomInt(random, 1, 5)
            return {
                problem: discussIt(cases(`x+y=${r}`, `x+ay=${r + c}`)),
                lines: [line(LABELS.step, `E_2-E_1\\ \\to\\ (a-1)y=${c}`), line(LABELS.solve, `y=\\frac{${c}}{a-1}`), line(LABELS.discuss, `a\\in\\mathbb{R}`)],
                wrong: 2, error, fix: `a=1\\ \\to\\ 0y=${c}\\ \\to\\ \\varnothing`, right: 1, reached: 0
            }
        }
        case 'one-particular': {
            const y = randomInt(random, 1, 4)
            const c = randomInt(random, 3, 7)
            return {
                problem: solveIt(cases(`x+y+z=${c + y}`, `x-y+z=${c - y}`)),
                lines: [line(LABELS.step, `E_2-E_1\\ \\to\\ -2y=${-2 * y}`), line(LABELS.solve, `y=${y},\\ x+z=${c}`), line(LABELS.result, `(${c - 1},\\ ${y},\\ 1)`)],
                wrong: 2, error, fix: `(${c}-\\lambda,\\ ${y},\\ \\lambda)`, right: 2, reached: 1
            }
        }
        case 'divide-by-x': {
            const k = randomInt(random, 2, 4)
            return {
                problem: solveIt(cases('y=x^3', `y=${k * k}x`)),
                lines: [line(LABELS.step, `x^3=${k * k}x`), line(LABELS.solve, `x^2=${k * k}\\ \\to\\ x=\\pm ${k}`), line(LABELS.result, `(${k},${k ** 3}),\\ (-${k},-${k ** 3})`)],
                wrong: 1, error, fix: `x(x^2-${k * k})=0\\ \\to\\ x=0,\\ \\pm ${k}`, right: 3, reached: 2
            }
        }
        case 'one-root': {
            const x = randomInt(random, 2, 5)
            const y = randomInt(random, 1, 4)
            if (x === y) return null
            return {
                problem: solveIt(cases(`x^2+y^2=${x * x + y * y}`, `x^2-y^2=${x * x - y * y}`)),
                lines: [line(LABELS.step, `2x^2=${2 * x * x}\\ \\to\\ x^2=${x * x}`), line(LABELS.solve, `x=${x},\\ y=${y}`), line(LABELS.result, `(${x},${y})`)],
                wrong: 1, error, fix: `x=\\pm ${x},\\ y=\\pm ${y}`, right: 4, reached: 1
            }
        }
        case 'log-kept': {
            const y = pick(random, [1, 2, 5])
            const x = 10 / y
            const d = x - y
            if (d <= 0) return null
            // The other root of y² + dy − 10 = 0 is −x, which gives log of a negative
            return {
                problem: solveIt(cases('\\log x+\\log y=1', `x-y=${d}`)),
                lines: [line(LABELS.step, `y(y+${d})=10`), line(LABELS.solve, `y=${y},\\ y=-${x}`), line(LABELS.result, `(${x},${y}),\\ (-${y},-${x})`)],
                wrong: 2, error, fix: `(${x},${y})`, right: 1, reached: 2
            }
        }
        case 'flip-forgotten': {
            const a = pick(random, [1, 2, 4])
            const b = pick(random, [2, 3])
            const c = b * randomInt(random, 1, 3)
            return {
                problem: say(`Askatu $y$ hemen: $${a === 1 ? '' : a}x-${b}y\\le ${c}$.`, `Despeja $y$ en $${a === 1 ? '' : a}x-${b}y\\le ${c}$.`, `اعزل $y$ في $${a === 1 ? '' : a}x-${b}y\\le ${c}$.`, `Solve $${a === 1 ? '' : a}x-${b}y\\le ${c}$ for $y$.`),
                lines: [line(LABELS.step, `-${b}y\\le ${c}-${a === 1 ? '' : a}x`), line(LABELS.solve, `y\\le\\frac{${a === 1 ? '' : a}x-${c}}{${b}}`), line(LABELS.result, `(0,0)\\ \\to\\ 0\\le -${c / b}`)],
                wrong: 1, error, fix: `y\\ge\\frac{${a === 1 ? '' : a}x-${c}}{${b}}`, right: 1, reached: -1
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBachSystemsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bachSystemsDetectiveLevels[levelIndex], BACH_SYSTEMS_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}

