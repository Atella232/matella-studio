import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J4 · Ekuazioen detektibea (Detective de ecuaciones): a worked solution
   of three lines with one wrong line, the mistakes of this unit. Level 1:
   dividing by x, cancelling terms of a sum, keeping a negative t, keeping
   a value that makes the denominator zero; level 2: squaring a sum as two
   squares, one case of an absolute value, freeing an exponent by
   dividing, the logarithm of a difference; level 3: dividing an
   inequality by x, multiplying by the denominator, not turning the sign
   round, and |x − a| < c with one side only. `right` and `reached` only
   tell the cases apart.
   ========================================================================== */

export type BachEquationsDetectiveError =
    | 'divide-by-x'
    | 'cancel-terms'
    | 'negative-t'
    | 'denominator-kept'
    | 'square-two-terms'
    | 'abs-one-case'
    | 'exp-divide'
    | 'log-difference'
    | 'divide-unknown-sign'
    | 'multiply-denominator'
    | 'flip-forgotten'
    | 'abs-one-side'

export const bachEquationsDetectiveLevels: BachEquationsDetectiveError[][] = [
    ['divide-by-x', 'cancel-terms', 'negative-t', 'denominator-kept'],
    ['square-two-terms', 'abs-one-case', 'exp-divide', 'log-difference'],
    ['divide-unknown-sign', 'multiply-denominator', 'flip-forgotten', 'abs-one-side']
]

export const BACH_EQUATIONS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
/** A number in LaTeX, with the decimal comma */
const tex = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
const LABELS = {
    equation: say('Ekuazioa', 'Ecuación', 'المعادلة', 'Equation'),
    inequality: say('Inekuazioa', 'Inecuación', 'المتراجحة', 'Inequality'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    solve: say('Askatu', 'Despeja', 'حلّ', 'Solve'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    change: say('Aldaketa', 'Cambio', 'التغيير', 'Change'),
    square: say('Karratura', 'Al cuadrado', 'التربيع', 'Squared')
}
const solveIt = (formula: string) => say(`Ebatzi $${formula}$.`, `Resuelve $${formula}$.`, `حُلّ $${formula}$.`, `Solve $${formula}$.`)

export const bachEquationsDetectiveNames: Record<BachEquationsDetectiveError, LocalizedText> = {
    'divide-by-x': say('$x$ zenbakiaz zatitu du, eta $x=0$ galdu du', 'Dividió entre $x$ y perdió $x=0$', 'قسم على $x$ فأضاع $x=0$', 'Divided by $x$ and lost $x=0$'),
    'cancel-terms': say('Batugaiak ezabatu ditu, ez faktoreak', 'Tachó sumandos, no factores', 'حذف حدودًا مجموعة لا عوامل', 'Cancelled terms of a sum, not factors'),
    'negative-t': say('$t$ negatibo bati soluzioak eman dizkio', 'Sacó soluciones de un $t$ negativo', 'أخرج حلولًا من $t$ سالب', 'Took solutions from a negative $t$'),
    'denominator-kept': say('Izendatzailea anulatzen duen balioa utzi du', 'Dejó un valor que anula el denominador', 'أبقى قيمة تعدم المقام', 'Kept a value that makes the denominator zero'),
    'square-two-terms': say('Batura bat karratura jaso du karratuak batuz', 'Elevó una suma al cuadrado sumando cuadrados', 'ربّع مجموعًا بجمع المربعين', 'Squared a sum by adding the squares'),
    'abs-one-case': say('Balio absolutuaren kasu bat bakarrik hartu du', 'Tomó un solo caso del valor absoluto', 'أخذ حالة واحدة للقيمة المطلقة', 'Took only one case of the absolute value'),
    'exp-divide': say('Berretzailea zatituz askatu du', 'Despejó el exponente dividiendo', 'عزل الأس بالقسمة', 'Freed the exponent by dividing'),
    'log-difference': say('Kendura baten logaritmoa jarri du', 'Puso el logaritmo de una resta', 'وضع لوغاريتم فرق', 'Wrote the logarithm of a difference'),
    'divide-unknown-sign': say('Zeinua ezagutzen ez den $x$ zenbakiaz zatitu du', 'Dividió entre $x$ sin saber su signo', 'قسم على $x$ دون معرفة إشارته', 'Divided by $x$ without knowing its sign'),
    'multiply-denominator': say('Izendatzaileaz biderkatu du', 'Multiplicó por el denominador', 'ضرب في المقام', 'Multiplied by the denominator'),
    'flip-forgotten': say('Negatibo batez zatitzean ez du desberdintza biratu', 'Al dividir entre un negativo no giró la desigualdad', 'لم يقلب المتراجحة عند القسمة على سالب', 'Did not turn the inequality round when dividing by a negative'),
    'abs-one-side': say('Alde bat bakarrik hartu du: $-c<A<c$ behar zen', 'Tomó un solo lado: hacía falta $-c<A<c$', 'أخذ جانبًا واحدًا: كان يلزم $-c<A<c$', 'Took one side only: it needed $-c<A<c$')
}

export const bachEquationsDetectiveTips: Record<BachEquationsDetectiveError, LocalizedText> = {
    'divide-by-x': say('Atera $x$ faktore komun gisa: $x(x^2-a)=0$ ekuazioak $x=0$ ere ematen du.', 'Saca $x$ factor común: $x(x^2-a)=0$ también da $x=0$.', 'أخرج $x$ عاملًا مشتركًا: تعطي $x(x^2-a)=0$ الحل $x=0$ أيضًا.', 'Take $x$ out as a common factor: $x(x^2-a)=0$ also gives $x=0$.'),
    'cancel-terms': say('Faktoreak bakarrik ezabatzen dira: $\\frac{x+6}{x+3}$ ez da sinplifikatzen.', 'Solo se tachan factores: $\\frac{x+6}{x+3}$ no se simplifica.', 'لا يُحذف إلا العوامل: لا يُبسّط $\\frac{x+6}{x+3}$.', 'Only factors cancel: $\\frac{x+6}{x+3}$ does not simplify.'),
    'negative-t': say('$x^2=t$ ekuazioak ez du soluziorik $t<0$ bada.', '$x^2=t$ no tiene solución si $t<0$.', 'ليس للمعادلة $x^2=t$ حل إذا كان $t<0$.', '$x^2=t$ has no solution if $t<0$.'),
    'denominator-kept': say('Izendatzailea anulatzen duen balioa ez da soluzioa.', 'Un valor que anula el denominador no es solución.', 'القيمة التي تعدم المقام ليست حلًّا.', 'A value that makes the denominator zero is not a solution.'),
    'square-two-terms': say('Isolatu erroa lehenik; $(a+b)^2=a^2+2ab+b^2$.', 'Aísla primero el radical; $(a+b)^2=a^2+2ab+b^2$.', 'اعزل الجذر أولًا؛ $(a+b)^2=a^2+2ab+b^2$.', 'Isolate the radical first; $(a+b)^2=a^2+2ab+b^2$.'),
    'abs-one-case': say('$|A|=c$ ekuazioak bi kasu ditu: $A=c$ eta $A=-c$.', '$|A|=c$ tiene dos casos: $A=c$ y $A=-c$.', 'للمعادلة $|A|=c$ حالتان: $A=c$ و$A=-c$.', '$|A|=c$ has two cases: $A=c$ and $A=-c$.'),
    'exp-divide': say('Hartu logaritmoak: $x=\\frac{\\log n}{\\log a}$.', 'Toma logaritmos: $x=\\frac{\\log n}{\\log a}$.', 'خذ اللوغاريتم: $x=\\frac{\\log n}{\\log a}$.', 'Take logarithms: $x=\\frac{\\log n}{\\log a}$.'),
    'log-difference': say('$\\log a-\\log b=\\log\\frac{a}{b}$.', '$\\log a-\\log b=\\log\\frac{a}{b}$.', '$\\log a-\\log b=\\log\\frac{a}{b}$.', '$\\log a-\\log b=\\log\\frac{a}{b}$.'),
    'divide-unknown-sign': say('Eraman dena alde batera eta faktorizatu: $x(x-k)>0$.', 'Pasa todo a un lado y factoriza: $x(x-k)>0$.', 'انقل كل شيء إلى طرف وحلّل: $x(x-k)>0$.', 'Move everything to one side and factorise: $x(x-k)>0$.'),
    'multiply-denominator': say('Erabili zeinuen taula: izendatzailearen zeinua aldatu egiten da.', 'Usa una tabla de signos: el signo del denominador cambia.', 'استعمل جدول الإشارات: إشارة المقام تتغير.', 'Use a sign table: the sign of the denominator changes.'),
    'flip-forgotten': say('Negatibo batez zatitzean, desberdintza biratu egiten da.', 'Al dividir entre un negativo, la desigualdad se gira.', 'عند القسمة على سالب تنقلب المتراجحة.', 'Dividing by a negative turns the inequality round.'),
    'abs-one-side': say('$|A|<c$ inekuazioa $-c<A<c$ da: tarte bat.', '$|A|<c$ es $-c<A<c$: un intervalo.', '$|A|<c$ تعني $-c<A<c$: مجال واحد.', '$|A|<c$ is $-c<A<c$: an interval.')
}

type Built = Omit<WorkedCase<BachEquationsDetectiveError>, 'options'>

function build(random: Random, error: BachEquationsDetectiveError): Built | null {
    switch (error) {
        case 'divide-by-x': {
            const k = randomInt(random, 2, 5)
            return {
                problem: solveIt(`x^3=${k * k}x`),
                lines: [line(LABELS.step, `x^2=${k * k}`), line(LABELS.solve, `x=\\pm ${k}`), line(LABELS.result, `x=${k},\\ x=-${k}`)],
                wrong: 0, error, fix: `x(x^2-${k * k})=0\\ \\to\\ x=0,\\ x=\\pm ${k}`, right: 3, reached: 2
            }
        }
        case 'cancel-terms': {
            const a = randomInt(random, 2, 9)
            const b = randomInt(random, 2, 5)
            const c = randomInt(random, 1, 4)
            if (a === b || a % b !== 0) return null
            return {
                problem: say(`Kalkulatu $\\frac{x+${a}}{x+${b}}$ adierazpenaren balioa $x=${c}$ denean.`, `Calcula el valor de $\\frac{x+${a}}{x+${b}}$ en $x=${c}$.`, `احسب قيمة $\\frac{x+${a}}{x+${b}}$ عند $x=${c}$.`, `Work out the value of $\\frac{x+${a}}{x+${b}}$ at $x=${c}$.`),
                lines: [line(LABELS.step, `\\frac{x+${a}}{x+${b}}=\\frac{${a}}{${b}}`), line(LABELS.solve, `\\frac{${a}}{${b}}=${a / b}`), line(LABELS.result, `${a / b}`)],
                wrong: 0, error, fix: `\\frac{${c}+${a}}{${c}+${b}}=\\frac{${c + a}}{${c + b}}`, right: (c + a) / (c + b), reached: a / b
            }
        }
        case 'negative-t': {
            const s = randomInt(random, 1, 3)
            const m = randomInt(random, 1, 3)
            if (s === m) return null
            const middle = m * m - s * s
            return {
                problem: solveIt(`x^4${signed(middle)}x^2-${s * s * m * m}=0`),
                lines: [line(LABELS.change, `t^2${signed(middle)}t-${s * s * m * m}=0`), line(LABELS.solve, `t=${s * s},\\ t=-${m * m}`), line(LABELS.result, `x=\\pm ${s},\\ x=\\pm ${m}`)],
                wrong: 2, error, fix: `x^2=-${m * m}<0\\ \\to\\ x=\\pm ${s}`, right: 2, reached: 4
            }
        }
        case 'denominator-kept': {
            const a = randomInt(random, 2, 6)
            return {
                problem: solveIt(`\\frac{x^2}{x-${a}}=\\frac{${a * a}}{x-${a}}`),
                lines: [line(LABELS.step, `x^2=${a * a}`), line(LABELS.solve, `x=\\pm ${a}`), line(LABELS.result, `x=${a},\\ x=-${a}`)],
                wrong: 2, error, fix: `x=-${a}`, right: 1, reached: 2
            }
        }
        case 'square-two-terms': {
            const a = randomInt(random, 1, 4)
            const c = randomInt(random, 2, 5)
            const b = a + c
            return {
                problem: solveIt(`\\sqrt{x}+${a}=${b}`),
                lines: [line(LABELS.square, `x+${a * a}=${b * b}`), line(LABELS.solve, `x=${b * b}-${a * a}`), line(LABELS.result, `x=${b * b - a * a}`)],
                wrong: 0, error, fix: `\\sqrt{x}=${c}\\ \\to\\ x=${c * c}`, right: c * c, reached: b * b - a * a
            }
        }
        case 'abs-one-case': {
            const a = randomInt(random, -3, 4)
            const c = randomInt(random, 2, 6)
            return {
                problem: solveIt(`|x${signed(-a)}|=${c}`),
                lines: [line(LABELS.step, `x${signed(-a)}=${c}`), line(LABELS.solve, `x=${c}${signed(a)}`), line(LABELS.result, `x=${a + c}`)],
                wrong: 0, error, fix: `x${signed(-a)}=\\pm ${c}\\ \\to\\ x=${a + c},\\ x=${a - c}`, right: 2, reached: 1
            }
        }
        case 'exp-divide': {
            const base = pick(random, [2, 3, 5])
            const n = randomInt(random, 6, 30)
            if (Number.isInteger(Math.log(n) / Math.log(base)) || n % base === 0) return null
            return {
                problem: solveIt(`${base}^x=${n}`),
                lines: [line(LABELS.equation, `${base}^x=${n}`), line(LABELS.step, `x=\\frac{${n}}{${base}}`), line(LABELS.result, `x\\approx ${tex(n / base)}`)],
                wrong: 1, error, fix: `x=\\frac{\\log ${n}}{\\log ${base}}\\approx ${tex(Math.log(n) / Math.log(base))}`, right: Math.log(n) / Math.log(base), reached: n / base
            }
        }
        case 'log-difference': {
            const b = pick(random, [2, 3, 5])
            const k = randomInt(random, 3, 9)
            return {
                problem: solveIt(`\\log x-\\log ${b}=\\log ${k}`),
                lines: [line(LABELS.step, `\\log(x-${b})=\\log ${k}`), line(LABELS.solve, `x-${b}=${k}`), line(LABELS.result, `x=${k + b}`)],
                wrong: 0, error, fix: `\\log\\frac{x}{${b}}=\\log ${k}\\ \\to\\ x=${k * b}`, right: k * b, reached: k + b
            }
        }
        case 'divide-unknown-sign': {
            const k = randomInt(random, 2, 7)
            return {
                problem: solveIt(`x^2>${k}x`),
                lines: [line(LABELS.inequality, `x^2>${k}x`), line(LABELS.step, `x>${k}`), line(LABELS.result, `(${k},+\\infty)`)],
                wrong: 1, error, fix: `x(x-${k})>0\\ \\to\\ (-\\infty,0)\\cup(${k},+\\infty)`, right: 2, reached: 1
            }
        }
        case 'multiply-denominator': {
            const a = randomInt(random, 1, 5)
            const b = randomInt(random, 1, 5)
            return {
                problem: solveIt(`\\frac{x-${a}}{x+${b}}\\ge 0`),
                lines: [line(LABELS.inequality, `\\frac{x-${a}}{x+${b}}\\ge 0`), line(LABELS.step, `x-${a}\\ge 0`), line(LABELS.result, `[${a},+\\infty)`)],
                wrong: 1, error, fix: `(-\\infty,-${b})\\cup[${a},+\\infty)`, right: 2, reached: 1
            }
        }
        case 'flip-forgotten': {
            const k = randomInt(random, 2, 5)
            const j = randomInt(random, 1, 4)
            return {
                problem: solveIt(`-${k}x<${k * j}`),
                lines: [line(LABELS.inequality, `-${k}x<${k * j}`), line(LABELS.step, `x<-${j}`), line(LABELS.result, `(-\\infty,-${j})`)],
                wrong: 1, error, fix: `x>-${j}\\ \\to\\ (-${j},+\\infty)`, right: 1, reached: -1
            }
        }
        case 'abs-one-side': {
            const a = randomInt(random, 1, 4)
            const c = randomInt(random, 2, 5)
            return {
                problem: solveIt(`|x-${a}|<${c}`),
                lines: [line(LABELS.inequality, `|x-${a}|<${c}`), line(LABELS.step, `x-${a}<${c}`), line(LABELS.result, `x<${a + c}`)],
                wrong: 1, error, fix: `-${c}<x-${a}<${c}\\ \\to\\ (${a - c},${a + c})`, right: 2, reached: 1
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBachEquationsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bachEquationsDetectiveLevels[levelIndex], BACH_EQUATIONS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}
