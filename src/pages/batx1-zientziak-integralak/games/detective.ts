import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J5 · Integralen detektibea (Detective de integrales): a worked solution
   of three lines with one wrong line, the mistakes of this unit. Level 1,
   antiderivatives: xⁿ⁺¹ without dividing, the constant k forgotten, k
   taken as the y of the point, eˣ treated as a power; level 2, composite
   integrals: the factor multiplied instead of divided, the factor of u′
   forgotten, ln of the numerator, uⁿ⁺¹ without dividing; level 3,
   definite integrals and areas: F(a) − F(b), a negative area, a curve
   that crosses the axis not split, the bottom curve minus the top one.
   The lines carry no words and no sin or tan (they are shared by the four
   languages). `right` and `reached` only tell the cases apart.
   ========================================================================== */

export type BachIntegralsDetectiveError =
    | 'no-divide'
    | 'forgot-k'
    | 'k-is-y'
    | 'exp-as-power'
    | 'adjust-inverted'
    | 'adjust-missing'
    | 'log-numerator'
    | 'chain-no-divide'
    | 'barrow-swap'
    | 'negative-area'
    | 'no-split'
    | 'bottom-minus-top'

export const bachIntegralsDetectiveLevels: BachIntegralsDetectiveError[][] = [
    ['no-divide', 'forgot-k', 'k-is-y', 'exp-as-power'],
    ['adjust-inverted', 'adjust-missing', 'log-numerator', 'chain-no-divide'],
    ['barrow-swap', 'negative-area', 'no-split', 'bottom-minus-top']
]

export const BACH_INTEGRALS_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
/** A fraction p/q in lowest terms, as LaTeX */
function frac(p: number, q: number): string {
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
    const g = gcd(p, q)
    const [n, d] = [p / g, q / g]
    if (d === 1) return String(n)
    return `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`
}
const LABELS = {
    rule: say('Erregela', 'Regla', 'القاعدة', 'Rule'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    substitute: say('Ordezkatu', 'Sustituye', 'عوّض', 'Substitute'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const bachIntegralsDetectiveNames: Record<BachIntegralsDetectiveError, LocalizedText> = {
    'no-divide': say('Berretzailea igo du, baina ez du zatitu', 'Subió el exponente pero no dividió', 'رفع الأس لكنه لم يقسم', 'Raised the exponent but did not divide'),
    'forgot-k': say('$k$ konstantea ahaztu du', 'Olvidó la constante $k$', 'نسي الثابت $k$', 'Forgot the constant $k$'),
    'k-is-y': say('$k$ puntuaren $y$ dela hartu du', 'Tomó $k$ como la $y$ del punto', 'أخذ $k$ على أنه $y$ النقطة', 'Took $k$ as the $y$ of the point'),
    'exp-as-power': say('$e^x$ berredura bat balitz bezala integratu du', 'Integró $e^x$ como si fuera una potencia', 'كامَل $e^x$ كأنها قوة', 'Integrated $e^x$ as if it were a power'),
    'adjust-inverted': say('Zenbakiaz biderkatu du, zatitu beharrean', 'Multiplicó por el número en vez de dividir', 'ضرب في العدد بدل القسمة عليه', 'Multiplied by the number instead of dividing'),
    'adjust-missing': say('$u\'$ deribatuaren zenbakia ez du doitu', 'No ajustó el número de $u\'$', 'لم يضبط عدد $u\'$', 'Did not adjust the number of $u\'$'),
    'log-numerator': say('Zenbakitzailearen logaritmoa hartu du', 'Tomó el logaritmo del numerador', 'أخذ لوغاريتم البسط', 'Took the logarithm of the numerator'),
    'chain-no-divide': say('$u^{n+1}$ idatzi du, $n+1$ zenbakiaz zatitu gabe', 'Escribió $u^{n+1}$ sin dividir entre $n+1$', 'كتب $u^{n+1}$ دون القسمة على $n+1$', 'Wrote $u^{n+1}$ without dividing by $n+1$'),
    'barrow-swap': say('$F(a)-F(b)$ egin du', 'Hizo $F(a)-F(b)$', 'حسب $F(a)-F(b)$', 'Worked out $F(a)-F(b)$'),
    'negative-area': say('Azalera negatibo bat eman du', 'Dio un área negativa', 'أعطى مساحة سالبة', 'Gave a negative area'),
    'no-split': say('Ez du ebaki-puntuan zatitu', 'No partió en el corte', 'لم يقسم عند نقطة التقاطع', 'Did not split at the crossing'),
    'bottom-minus-top': say('Behekoa ken goikoa egin du', 'Restó la de abajo menos la de arriba', 'طرح الأدنى ناقص الأعلى', 'Did the bottom one minus the top one')
}

export const bachIntegralsDetectiveTips: Record<BachIntegralsDetectiveError, LocalizedText> = {
    'no-divide': say('$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+k$: deribatu emaitza egiaztatzeko.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+k$: deriva el resultado para comprobarlo.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+k$: اشتق النتيجة لتتحقق.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+k$: differentiate the result to check it.'),
    'forgot-k': say('Jatorrizko guztiak $F(x)+k$ dira; puntuak $k$ finkatzen du.', 'Todas las primitivas son $F(x)+k$; el punto fija $k$.', 'كل الدوال الأصلية $F(x)+k$، والنقطة تحدد $k$.', 'All the antiderivatives are $F(x)+k$; the point fixes $k$.'),
    'k-is-y': say('Ordezkatu puntua: $F(a)+k=b$.', 'Sustituye el punto: $F(a)+k=b$.', 'عوّض النقطة: $F(a)+k=b$.', 'Substitute the point: $F(a)+k=b$.'),
    'exp-as-power': say('$\\int e^x\\,dx=e^x+k$: aldagaia berretzailean dago.', '$\\int e^x\\,dx=e^x+k$: la variable está en el exponente.', '$\\int e^x\\,dx=e^x+k$: المتغير في الأس.', '$\\int e^x\\,dx=e^x+k$: the variable is in the exponent.'),
    'adjust-inverted': say('$\\int e^{ax}\\,dx=\\frac{1}{a}e^{ax}+k$: zatitu egiten da.', '$\\int e^{ax}\\,dx=\\frac{1}{a}e^{ax}+k$: se divide.', '$\\int e^{ax}\\,dx=\\frac{1}{a}e^{ax}+k$: نقسم.', '$\\int e^{ax}\\,dx=\\frac{1}{a}e^{ax}+k$: you divide.'),
    'adjust-missing': say('Kanpoan $u\'$ osoa behar da: falta den zenbakiaz zatitu.', 'Fuera hace falta $u\'$ entera: divide entre el número que falta.', 'يلزم $u\'$ كاملًا في الخارج: اقسم على العدد الناقص.', 'The whole of $u\'$ is needed outside: divide by the missing number.'),
    'log-numerator': say('$\\int\\frac{u\'}{u}\\,dx=\\ln|u|+k$: izendatzailearen logaritmoa.', '$\\int\\frac{u\'}{u}\\,dx=\\ln|u|+k$: el logaritmo del denominador.', '$\\int\\frac{u\'}{u}\\,dx=\\ln|u|+k$: لوغاريتم المقام.', '$\\int\\frac{u\'}{u}\\,dx=\\ln|u|+k$: the logarithm of the denominator.'),
    'chain-no-divide': say('$\\int u\'u^n\\,dx=\\frac{u^{n+1}}{n+1}+k$.', '$\\int u\'u^n\\,dx=\\frac{u^{n+1}}{n+1}+k$.', '$\\int u\'u^n\\,dx=\\frac{u^{n+1}}{n+1}+k$.', '$\\int u\'u^n\\,dx=\\frac{u^{n+1}}{n+1}+k$.'),
    'barrow-swap': say('Barrow: goiko muga ken behekoa, $F(b)-F(a)$.', 'Barrow: límite de arriba menos el de abajo, $F(b)-F(a)$.', 'بارو: الحد الأعلى ناقص الأدنى، $F(b)-F(a)$.', 'Barrow: the top limit minus the bottom one, $F(b)-F(a)$.'),
    'negative-area': say('Ardatzaren azpian integrala negatiboa da, baina azalera haren balio absolutua da.', 'Bajo el eje la integral es negativa, pero el área es su valor absoluto.', 'تحت المحور يكون التكامل سالبًا، لكن المساحة قيمته المطلقة.', 'Below the axis the integral is negative, but the area is its absolute value.'),
    'no-split': say('Kurbak ardatza mozten badu, zatitu ebaki-puntuan eta batu balio absolutuak.', 'Si la curva corta el eje, parte en el corte y suma los valores absolutos.', 'إذا قطع المنحنى المحور فقسّم عند نقطة التقاطع واجمع القيم المطلقة.', 'If the curve crosses the axis, split at the crossing and add the absolute values.'),
    'bottom-minus-top': say('Bi kurben artean, goikoa ken behekoa integratzen da.', 'Entre dos curvas se integra la de arriba menos la de abajo.', 'بين منحنيين نكامل الأعلى ناقص الأدنى.', 'Between two curves you integrate the top one minus the bottom one.')
}

type Built = Omit<WorkedCase<BachIntegralsDetectiveError>, 'options'>

function build(random: Random, error: BachIntegralsDetectiveError): Built | null {
    switch (error) {
        case 'no-divide': {
            const n = randomInt(random, 2, 5)
            const c = (n + 1) * pick(random, [1, 2, 3])
            return {
                problem: say(`Kalkulatu $\\int ${c}x^${n}\\,dx$.`, `Calcula $\\int ${c}x^${n}\\,dx$.`, `احسب $\\int ${c}x^${n}\\,dx$.`, `Work out $\\int ${c}x^${n}\\,dx$.`),
                lines: [line(LABELS.rule, `x^${n}\\ \\to\\ x^${n + 1}`), line(LABELS.step, `\\int ${c}x^${n}\\,dx=${c}x^${n + 1}`), line(LABELS.result, `${c}x^${n + 1}+k`)],
                wrong: 1, error, fix: `${c}\\cdot\\frac{x^${n + 1}}{${n + 1}}=${c / (n + 1) === 1 ? '' : c / (n + 1)}x^${n + 1}`, right: c / (n + 1), reached: c
            }
        }
        case 'forgot-k': {
            const b = pick(random, [-5, -3, -1, 2, 4, 6])
            const q = pick(random, [-2, 1, 3, 5, 7])
            return {
                problem: say(`Aurkitu $f(x)=2x${signed(b)}$ funtzioaren jatorrizkoa, $(0,\\,${q})$ puntutik pasatzen dena.`, `Halla la primitiva de $f(x)=2x${signed(b)}$ que pasa por $(0,\\,${q})$.`, `أوجد الدالة الأصلية لـ $f(x)=2x${signed(b)}$ التي تمر بالنقطة $(0,\\,${q})$.`, `Find the antiderivative of $f(x)=2x${signed(b)}$ through $(0,\\,${q})$.`),
                lines: [line(LABELS.step, `F(x)=x^2${signed(b)}x`), line(LABELS.substitute, `F(0)=0`), line(LABELS.result, `F(x)=x^2${signed(b)}x`)],
                wrong: 0, error, fix: `F(x)=x^2${signed(b)}x+k`, right: q, reached: 0
            }
        }
        case 'k-is-y': {
            const p = pick(random, [1, 2, 3])
            const q = pick(random, [5, 7, 10, 12])
            return {
                problem: say(`Aurkitu $f(x)=2x$ funtzioaren jatorrizkoa, $(${p},\\,${q})$ puntutik pasatzen dena.`, `Halla la primitiva de $f(x)=2x$ que pasa por $(${p},\\,${q})$.`, `أوجد الدالة الأصلية لـ $f(x)=2x$ التي تمر بالنقطة $(${p},\\,${q})$.`, `Find the antiderivative of $f(x)=2x$ through $(${p},\\,${q})$.`),
                lines: [line(LABELS.step, 'F(x)=x^2+k'), line(LABELS.substitute, `k=${q}`), line(LABELS.result, `F(x)=x^2+${q}`)],
                wrong: 1, error, fix: `${p * p}+k=${q}\\ \\to\\ k=${q - p * p}`, right: q - p * p, reached: q
            }
        }
        case 'exp-as-power': {
            const a = pick(random, [2, 3, 4, 5, 6])
            return {
                problem: say(`Kalkulatu $\\int(e^x+${2 * a}x)\\,dx$.`, `Calcula $\\int(e^x+${2 * a}x)\\,dx$.`, `احسب $\\int(e^x+${2 * a}x)\\,dx$.`, `Work out $\\int(e^x+${2 * a}x)\\,dx$.`),
                lines: [line(LABELS.step, '\\int e^x\\,dx=\\frac{e^{x+1}}{x+1}'), line(LABELS.step, `\\int ${2 * a}x\\,dx=${a}x^2`), line(LABELS.result, `\\frac{e^{x+1}}{x+1}+${a}x^2+k`)],
                wrong: 0, error, fix: '\\int e^x\\,dx=e^x', right: a, reached: a + 1
            }
        }
        case 'adjust-inverted': {
            const a = pick(random, [2, 3, 4, 5])
            return {
                problem: say(`Kalkulatu $\\int e^{${a}x}\\,dx$.`, `Calcula $\\int e^{${a}x}\\,dx$.`, `احسب $\\int e^{${a}x}\\,dx$.`, `Work out $\\int e^{${a}x}\\,dx$.`),
                lines: [line(LABELS.step, `u=${a}x,\\ u'=${a}`), line(LABELS.rule, `\\int e^{${a}x}\\,dx=${a}e^{${a}x}`), line(LABELS.result, `${a}e^{${a}x}+k`)],
                wrong: 1, error, fix: `\\int e^{${a}x}\\,dx=\\frac{1}{${a}}e^{${a}x}`, right: 1 / a, reached: a
            }
        }
        case 'adjust-missing': {
            const p = pick(random, [2, 3])
            const b = pick(random, [1, 2, 3, 4, 5])
            const outside = p === 2 ? 'x' : 'x^2'
            return {
                problem: say(`Kalkulatu $\\int\\frac{${outside}}{x^${p}+${b}}\\,dx$.`, `Calcula $\\int\\frac{${outside}}{x^${p}+${b}}\\,dx$.`, `احسب $\\int\\frac{${outside}}{x^${p}+${b}}\\,dx$.`, `Work out $\\int\\frac{${outside}}{x^${p}+${b}}\\,dx$.`),
                lines: [line(LABELS.step, `u=x^${p}+${b},\\ u'=${p}${outside}`), line(LABELS.rule, `\\int\\frac{${outside}}{x^${p}+${b}}\\,dx=\\ln(x^${p}+${b})`), line(LABELS.result, `\\ln(x^${p}+${b})+k`)],
                wrong: 1, error, fix: `\\frac{1}{${p}}\\ln(x^${p}+${b})`, right: 1 / p, reached: b
            }
        }
        case 'log-numerator': {
            const b = pick(random, [1, 2, 3, 4, 5])
            const c = pick(random, [1, 2, 3, 5])
            const denominator = `x^2${b === 1 ? '+x' : `+${b}x`}+${c}`
            return {
                problem: say(`Kalkulatu $\\int\\frac{2x+${b}}{${denominator}}\\,dx$.`, `Calcula $\\int\\frac{2x+${b}}{${denominator}}\\,dx$.`, `احسب $\\int\\frac{2x+${b}}{${denominator}}\\,dx$.`, `Work out $\\int\\frac{2x+${b}}{${denominator}}\\,dx$.`),
                lines: [line(LABELS.step, `u'=2x+${b}`), line(LABELS.rule, "\\int\\frac{u'}{u}\\,dx=\\ln|u'|"), line(LABELS.result, `\\ln|2x+${b}|+k`)],
                wrong: 1, error, fix: "\\int\\frac{u'}{u}\\,dx=\\ln|u|", right: b, reached: c
            }
        }
        case 'chain-no-divide': {
            const b = pick(random, [-3, -1, 1, 2, 4])
            const n = randomInt(random, 2, 5)
            return {
                problem: say(`Kalkulatu $\\int 2x(x^2${signed(b)})^${n}\\,dx$.`, `Calcula $\\int 2x(x^2${signed(b)})^${n}\\,dx$.`, `احسب $\\int 2x(x^2${signed(b)})^${n}\\,dx$.`, `Work out $\\int 2x(x^2${signed(b)})^${n}\\,dx$.`),
                lines: [line(LABELS.step, `u=x^2${signed(b)},\\ u'=2x`), line(LABELS.rule, `\\int u'u^${n}\\,dx=u^${n + 1}`), line(LABELS.result, `(x^2${signed(b)})^${n + 1}+k`)],
                wrong: 1, error, fix: `\\int u'u^${n}\\,dx=\\frac{u^${n + 1}}{${n + 1}}`, right: n + 1, reached: n
            }
        }
        case 'barrow-swap': {
            const [a, b] = pick(random, [[0, 2], [1, 3], [0, 3], [1, 2]])
            const value = b ** 3 - a ** 3
            return {
                problem: say(`Kalkulatu $\\int_${a}^${b} 3x^2\\,dx$.`, `Calcula $\\int_${a}^${b} 3x^2\\,dx$.`, `احسب $\\int_${a}^${b} 3x^2\\,dx$.`, `Work out $\\int_${a}^${b} 3x^2\\,dx$.`),
                lines: [line(LABELS.step, 'F(x)=x^3'), line(LABELS.rule, `F(${a})-F(${b})=${a ** 3}-${b ** 3}`), line(LABELS.result, `${-value}`)],
                wrong: 1, error, fix: `F(${b})-F(${a})=${value}`, right: value, reached: -value
            }
        }
        case 'negative-area': {
            const c = pick(random, [1, 2, 3])
            const value = frac(4 * c ** 3, 3)
            return {
                problem: say(`Aurkitu $f(x)=x^2-${c * c}$ kurbaren eta X ardatzaren arteko azalera.`, `Halla el área entre $f(x)=x^2-${c * c}$ y el eje X.`, `أوجد المساحة بين $f(x)=x^2-${c * c}$ ومحور X.`, `Find the area between $f(x)=x^2-${c * c}$ and the x-axis.`),
                lines: [line(LABELS.step, `x^2=${c * c}\\ \\to\\ x=\\pm ${c}`), line(LABELS.step, `\\int_{-${c}}^{${c}}(x^2-${c * c})\\,dx=-${value}`), line(LABELS.result, `A=-${value}`)],
                wrong: 2, error, fix: `A=${value}`, right: (4 * c ** 3) / 3, reached: -(4 * c ** 3) / 3
            }
        }
        case 'no-split': {
            const p = pick(random, [1, 2, 3, 4])
            return {
                problem: say(`Aurkitu $f(x)=x-${p}$ zuzenaren eta X ardatzaren arteko azalera $[0,\\,${2 * p}]$ tartean.`, `Halla el área entre $f(x)=x-${p}$ y el eje X en $[0,\\,${2 * p}]$.`, `أوجد المساحة بين $f(x)=x-${p}$ ومحور X في $[0,\\,${2 * p}]$.`, `Find the area between $f(x)=x-${p}$ and the x-axis on $[0,\\,${2 * p}]$.`),
                lines: [line(LABELS.step, `x-${p}=0\\ \\to\\ x=${p}`), line(LABELS.step, `\\int_0^{${2 * p}}(x-${p})\\,dx=0`), line(LABELS.result, 'A=0')],
                wrong: 2, error, fix: `A=${frac(p * p, 2)}+${frac(p * p, 2)}=${p * p}`, right: p * p, reached: 0
            }
        }
        case 'bottom-minus-top': {
            const p = pick(random, [1, 2, 3])
            const value = frac(p ** 3, 6)
            return {
                problem: say(`Aurkitu $y=x^2$ eta $y=${p === 1 ? '' : p}x$ kurben arteko azalera.`, `Halla el área entre $y=x^2$ e $y=${p === 1 ? '' : p}x$.`, `أوجد المساحة بين $y=x^2$ و$y=${p === 1 ? '' : p}x$.`, `Find the area between $y=x^2$ and $y=${p === 1 ? '' : p}x$.`),
                lines: [line(LABELS.step, `x=0,\\ x=${p}`), line(LABELS.rule, `\\int_0^{${p}}(x^2-${p === 1 ? '' : p}x)\\,dx`), line(LABELS.result, `A=-${value}`)],
                wrong: 1, error, fix: `\\int_0^{${p}}(${p === 1 ? '' : p}x-x^2)\\,dx=${value}`, right: p ** 3 / 6, reached: -(p ** 3) / 6
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBachIntegralsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bachIntegralsDetectiveLevels[levelIndex], BACH_INTEGRALS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH_INTEGRALS_DETECTIVE_ERRORS = bachIntegralsDetectiveLevels.flat()
