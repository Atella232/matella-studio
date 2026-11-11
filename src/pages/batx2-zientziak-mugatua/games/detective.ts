import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { frac, shift } from './latex.ts'

/* ==========================================================================
   J5 · Integral mugatuaren detektibea / Detective de la integral definida:
   a worked solution of three lines with one wrong line. Only mistakes of
   2.º, none of those of the detective of 1.º: level 1, sums and theorems
   (the lower sum taken with the maxima, the mean value not divided by
   b − a, Barrow over an asymptote); level 2, working out (the old limits
   after t = g(x), uv evaluated only at the top limit, |x − c| not split);
   level 3, the integral function and volumes (g′ forgotten, the square of
   the radius forgotten, π forgotten). The lines carry no words. `right`
   and `reached` only tell the cases apart.
   ========================================================================== */

export type Bach2DefiniteDetectiveError =
    | 'sums-swapped'
    | 'mean-undivided'
    | 'barrow-asymptote'
    | 'old-limits'
    | 'uv-top'
    | 'abs-unsplit'
    | 'missing-chain'
    | 'volume-square'
    | 'volume-pi'

export const bach2DefiniteDetectiveLevels: Bach2DefiniteDetectiveError[][] = [
    ['sums-swapped', 'mean-undivided', 'barrow-asymptote'],
    ['old-limits', 'uv-top', 'abs-unsplit'],
    ['missing-chain', 'volume-square', 'volume-pi']
]

export const BACH2_DEFINITE_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const work = (latex: string) => say(`Kalkulatu $${latex}$.`, `Calcula $${latex}$.`, `احسب $${latex}$.`, `Work out $${latex}$.`)

const LABELS = {
    rule: say('Erregela', 'Regla', 'القاعدة', 'Rule'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const bach2DefiniteDetectiveNames: Record<Bach2DefiniteDetectiveError, LocalizedText> = {
    'sums-swapped': say('Behe-baturan maximoak hartu ditu', 'Tomó los máximos en la suma inferior', 'أخذ القيم العظمى في المجموع الأدنى', 'Used the maxima in the lower sum'),
    'mean-undivided': say('Ez du $b-a$ luzeraz zatitu', 'No dividió entre $b-a$', 'لم يقسم على $b-a$', 'Did not divide by $b-a$'),
    'barrow-asymptote': say('Barrow aplikatu du asintota bat barruan dagoela', 'Aplicó Barrow con una asíntota dentro', 'طبّق بارو مع وجود مقارب في الداخل', 'Applied Barrow with an asymptote inside'),
    'old-limits': say('Muga zaharrak utzi ditu aldaketaren ondoren', 'Dejó los límites viejos tras el cambio', 'أبقى الحدود القديمة بعد التعويض', 'Kept the old limits after the change'),
    'uv-top': say('$uv$ goiko mugan bakarrik kalkulatu du', 'Evaluó $uv$ solo en el límite de arriba', 'حسب $uv$ عند الحد الأعلى فقط', 'Evaluated $uv$ only at the top limit'),
    'abs-unsplit': say('Ez du balio absolutua zatitu', 'No partió el valor absoluto', 'لم يقسم القيمة المطلقة', 'Did not split the absolute value'),
    'missing-chain': say('Mugaren deribatua ahaztu du', 'Olvidó la derivada del límite', 'نسي مشتقة الحد', 'Forgot the derivative of the limit'),
    'volume-square': say('Erradioa ez du karratu', 'No elevó el radio al cuadrado', 'لم يربّع نصف القطر', 'Did not square the radius'),
    'volume-pi': say('$\\pi$ ahaztu du', 'Olvidó $\\pi$', 'نسي $\\pi$', 'Forgot $\\pi$')
}

export const bach2DefiniteDetectiveTips: Record<Bach2DefiniteDetectiveError, LocalizedText> = {
    'sums-swapped': say('Behe-baturak zati bakoitzeko minimoa erabiltzen du; $f$ gorakorra bada, ezkerrean dago.', 'La suma inferior usa el mínimo de cada tramo; si $f$ crece, está a la izquierda.', 'يستعمل المجموع الأدنى أصغر قيمة في كل جزء؛ وإذا كانت $f$ متزايدة فهي عند اليسار.', 'The lower sum uses the minimum of each piece; if $f$ increases, it is on the left.'),
    'mean-undivided': say('Batez besteko balioa: $f(c)=\\frac{1}{b-a}\\int_a^b f(x)\\,dx$.', 'Valor medio: $f(c)=\\frac{1}{b-a}\\int_a^b f(x)\\,dx$.', 'القيمة المتوسطة: $f(c)=\\frac{1}{b-a}\\int_a^b f(x)\\,dx$.', 'Mean value: $f(c)=\\frac{1}{b-a}\\int_a^b f(x)\\,dx$.'),
    'barrow-asymptote': say('Barrow-k $f$ jarraitua behar du $[a,b]$ tartean: begiratu non egiten den zero izendatzailea.', 'Barrow necesita $f$ continua en $[a,b]$: mira dónde se anula el denominador.', 'تحتاج قاعدة بارو إلى $f$ متصلة في $[a,b]$: انظر أين ينعدم المقام.', 'Barrow needs $f$ continuous on $[a,b]$: look where the denominator becomes zero.'),
    'old-limits': say('$t=g(x)$ aldaketan, mugak ere aldatzen dira: $g(a)$ eta $g(b)$.', 'Con $t=g(x)$ también cambian los límites: $g(a)$ y $g(b)$.', 'مع $t=g(x)$ تتغير الحدود أيضًا: $g(a)$ و$g(b)$.', 'With $t=g(x)$ the limits change too: $g(a)$ and $g(b)$.'),
    'uv-top': say('$\\left[uv\\right]_a^b=u(b)v(b)-u(a)v(a)$: beheko muga ere kentzen da.', '$\\left[uv\\right]_a^b=u(b)v(b)-u(a)v(a)$: también se resta el de abajo.', '$\\left[uv\\right]_a^b=u(b)v(b)-u(a)v(a)$: يُطرح الحد الأدنى أيضًا.', '$\\left[uv\\right]_a^b=u(b)v(b)-u(a)v(a)$: the bottom limit is subtracted too.'),
    'abs-unsplit': say('$|x-c|$ funtzioak formula aldatzen du $x=c$ puntuan: zatitu bertan.', '$|x-c|$ cambia de fórmula en $x=c$: parte ahí.', 'تتغير صيغة $|x-c|$ عند $x=c$: قسّم هناك.', '$|x-c|$ changes formula at $x=c$: split there.'),
    'missing-chain': say('$\\left(\\int_a^{g(x)}f(t)\\,dt\\right)\'=f(g(x))\\cdot g\'(x)$.', '$\\left(\\int_a^{g(x)}f(t)\\,dt\\right)\'=f(g(x))\\cdot g\'(x)$.', '$\\left(\\int_a^{g(x)}f(t)\\,dt\\right)\'=f(g(x))\\cdot g\'(x)$.', '$\\left(\\int_a^{g(x)}f(t)\\,dt\\right)\'=f(g(x))\\cdot g\'(x)$.'),
    'volume-square': say('Disko bakoitzaren azalera $\\pi r^2$ da, $r=f(x)$ izanik: $V=\\pi\\int_a^b f(x)^2\\,dx$.', 'Cada disco tiene área $\\pi r^2$, con $r=f(x)$: $V=\\pi\\int_a^b f(x)^2\\,dx$.', 'مساحة كل قرص $\\pi r^2$ حيث $r=f(x)$: $V=\\pi\\int_a^b f(x)^2\\,dx$.', 'Each disc has area $\\pi r^2$, with $r=f(x)$: $V=\\pi\\int_a^b f(x)^2\\,dx$.'),
    'volume-pi': say('Disko baten azalera $\\pi r^2$ da: $\\pi$ integralaren aurrean geratzen da.', 'El área de un disco es $\\pi r^2$: $\\pi$ queda delante de la integral.', 'مساحة القرص $\\pi r^2$: يبقى $\\pi$ أمام التكامل.', 'The area of a disc is $\\pi r^2$: $\\pi$ stays in front of the integral.')
}

type Built = Omit<WorkedCase<Bach2DefiniteDetectiveError>, 'options'>

function build(random: Random, error: Bach2DefiniteDetectiveError): Built | null {
    switch (error) {
        case 'sums-swapped': {
            const k = pick(random, [0, 1, 2, 3])
            const f = k === 0 ? 'x^2' : `x^2+${k}`
            return {
                problem: say(`$\\{0,\\,1,\\,2\\}$ zatiketarekin, aurkitu $f(x)=${f}$ funtzioaren behe-batura.`, `Con $\\{0,\\,1,\\,2\\}$, halla la suma inferior de $f(x)=${f}$.`, `باستعمال $\\{0,\\,1,\\,2\\}$ أوجد المجموع الأدنى لـ $f(x)=${f}$.`, `With $\\{0,\\,1,\\,2\\}$, find the lower sum of $f(x)=${f}$.`),
                lines: [
                    line(LABELS.step, 'm_1=f(1)\\quad m_2=f(2)'),
                    line(LABELS.step, `s=1\\cdot ${1 + k}+1\\cdot ${4 + k}`),
                    line(LABELS.result, `s=${5 + 2 * k}`)
                ],
                wrong: 0, error, fix: 'm_1=f(0)\\quad m_2=f(1)', right: 1 + 2 * k, reached: 5 + 2 * k
            }
        }
        case 'mean-undivided': {
            const b = pick(random, [2, 3, 4])
            return {
                problem: say(`Aurkitu $f(x)=3x^2$ funtzioaren batez besteko balioa $[0,\\,${b}]$ tartean.`, `Halla el valor medio de $f(x)=3x^2$ en $[0,\\,${b}]$.`, `أوجد القيمة المتوسطة لـ $f(x)=3x^2$ في $[0,\\,${b}]$.`, `Find the mean value of $f(x)=3x^2$ on $[0,\\,${b}]$.`),
                lines: [
                    line(LABELS.step, `\\int_0^{${b}}3x^2\\,dx=${b ** 3}`),
                    line(LABELS.step, `f(c)=${b ** 3}`),
                    line(LABELS.result, `3c^2=${b ** 3}`)
                ],
                wrong: 1, error, fix: `f(c)=\\frac{${b ** 3}}{${b}}=${b * b}`, right: b * b, reached: b ** 3
            }
        }
        case 'barrow-asymptote': {
            const c = pick(random, [1, 2])
            const a = c - randomInt(random, 1, 2)
            const b = c + randomInt(random, 1, 2)
            // [−1/(x − c)]ₐᵇ, blindly
            const blind = (b - a) / ((a - c) * (b - c))
            return {
                problem: work(`\\int_{${a}}^{${b}}\\frac{dx}{(${shift(c)})^2}`),
                lines: [
                    line(LABELS.rule, `F(x)=-\\frac{1}{${shift(c)}}`),
                    line(LABELS.step, `F(${b})-F(${a})`),
                    line(LABELS.result, `=${frac(b - a, (a - c) * (b - c))}`)
                ],
                wrong: 1, error, fix: `${a}<${c}<${b}`, right: Number.POSITIVE_INFINITY, reached: blind
            }
        }
        case 'old-limits': {
            const b = pick(random, [2, 3])
            return {
                problem: work(`\\int_0^{${b}}2xe^{x^2}\\,dx`),
                lines: [
                    line(LABELS.rule, 't=x^2\\quad dt=2x\\,dx'),
                    line(LABELS.step, `=\\int_0^{${b}}e^t\\,dt`),
                    line(LABELS.result, `=e^{${b}}-1`)
                ],
                wrong: 1, error, fix: `=\\int_0^{${b * b}}e^t\\,dt`, right: Math.exp(b * b) - 1, reached: Math.exp(b) - 1
            }
        }
        case 'uv-top': {
            const a = pick(random, [1, 2])
            const top = a + 1
            const e = (power: number) => (power === 1 ? 'e' : `e^{${power}}`)
            return {
                problem: work(`\\int_{${a}}^{${top}}xe^x\\,dx`),
                lines: [
                    line(LABELS.rule, 'u=x\\quad v=e^x'),
                    line(LABELS.step, `=${top}${e(top)}-\\int_{${a}}^{${top}}e^x\\,dx`),
                    line(LABELS.result, `=${top}${e(top)}-(${e(top)}-${e(a)})`)
                ],
                wrong: 1, error, fix: `=${top}${e(top)}-${a === 1 ? '' : a}${e(a)}-\\int_{${a}}^{${top}}e^x\\,dx`, right: a * Math.exp(top) - (a - 1) * Math.exp(a), reached: a * Math.exp(top) + Math.exp(a)
            }
        }
        case 'abs-unsplit': {
            const c = pick(random, [1, 2])
            const b = c + randomInt(random, 1, 2)
            const right = (c * c + (b - c) ** 2) / 2
            const reached = (b * b) / 2 - c * b
            return {
                problem: work(`\\int_0^{${b}}|${shift(c)}|\\,dx`),
                lines: [
                    line(LABELS.step, `=\\left[\\frac{x^2}{2}-${c === 1 ? '' : c}x\\right]_0^{${b}}`),
                    line(LABELS.step, `=\\frac{${b * b}}{2}-${c * b}`),
                    line(LABELS.result, `=${frac(b * b - 2 * c * b, 2)}`)
                ],
                wrong: 0, error, fix: `\\int_0^{${b}}=\\int_0^{${c}}+\\int_{${c}}^{${b}}`, right, reached
            }
        }
        case 'missing-chain': {
            const g = pick(random, [{ latex: 'x^2', d: '2x', at1: 1, d1: 2 }, { latex: 'x^3', d: '3x^2', at1: 1, d1: 3 }, { latex: '2x', d: '2', at1: 2, d1: 2 }])
            const f = pick(random, [
                { t: '\\sqrt{1+t}', at: (u: string) => `\\sqrt{1+${u}}`, value: (v: number) => `\\sqrt{${1 + v}}`, fn: (v: number) => Math.sqrt(1 + v) },
                { t: '\\frac{1}{1+t}', at: (u: string) => `\\frac{1}{1+${u}}`, value: (v: number) => `\\frac{1}{${1 + v}}`, fn: (v: number) => 1 / (1 + v) },
                { t: 'e^t', at: (u: string) => `e^{${u}}`, value: (v: number) => (v === 1 ? 'e' : `e^{${v}}`), fn: (v: number) => Math.exp(v) }
            ])
            return {
                problem: say(`Deribatu $F(x)=\\int_0^{${g.latex}}${f.t}\\,dt$, eta kalkulatu $F'(1)$.`, `Deriva $F(x)=\\int_0^{${g.latex}}${f.t}\\,dt$ y calcula $F'(1)$.`, `اشتق $F(x)=\\int_0^{${g.latex}}${f.t}\\,dt$ واحسب $F'(1)$.`, `Differentiate $F(x)=\\int_0^{${g.latex}}${f.t}\\,dt$ and work out $F'(1)$.`),
                lines: [
                    line(LABELS.rule, `g(x)=${g.latex}\\quad g'(x)=${g.d}`),
                    line(LABELS.step, `F'(x)=${f.at(g.latex)}`),
                    line(LABELS.result, `F'(1)=${f.value(g.at1)}`)
                ],
                wrong: 1, error, fix: `F'(x)=${f.at(g.latex)}\\cdot ${g.d}`, right: f.fn(g.at1) * g.d1, reached: f.fn(g.at1)
            }
        }
        case 'volume-square': {
            const b = pick(random, [2, 3, 4])
            return {
                problem: say(`Aurkitu $y=x$ zuzena X ardatzaren inguruan 0 eta $${b}$ artean biratzean lortzen den bolumena.`, `Halla el volumen al girar $y=x$ alrededor del eje X entre 0 y $${b}$.`, `أوجد الحجم الناتج عن دوران $y=x$ حول محور X بين 0 و$${b}$.`, `Find the volume when $y=x$ is turned about the x-axis between 0 and $${b}$.`),
                lines: [
                    line(LABELS.rule, 'V=\\pi\\int_a^b f(x)^2\\,dx'),
                    line(LABELS.step, `V=\\pi\\int_0^{${b}}x\\,dx`),
                    line(LABELS.result, `V=${frac(b * b, 2)}\\pi`)
                ],
                wrong: 1, error, fix: `V=\\pi\\int_0^{${b}}x^2\\,dx`, right: (Math.PI * b ** 3) / 3, reached: (Math.PI * b * b) / 2
            }
        }
        case 'volume-pi': {
            const b = pick(random, [1, 2])
            return {
                problem: say(`Aurkitu $y=x^2$ kurba X ardatzaren inguruan 0 eta $${b}$ artean biratzean lortzen den bolumena.`, `Halla el volumen al girar $y=x^2$ alrededor del eje X entre 0 y $${b}$.`, `أوجد الحجم الناتج عن دوران $y=x^2$ حول محور X بين 0 و$${b}$.`, `Find the volume when $y=x^2$ is turned about the x-axis between 0 and $${b}$.`),
                lines: [
                    line(LABELS.rule, 'f(x)^2=x^4'),
                    line(LABELS.step, `V=\\int_0^{${b}}x^4\\,dx`),
                    line(LABELS.result, `V=${frac(b ** 5, 5)}`)
                ],
                wrong: 1, error, fix: `V=\\pi\\int_0^{${b}}x^4\\,dx`, right: (Math.PI * b ** 5) / 5, reached: b ** 5 / 5
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBach2DefiniteDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bach2DefiniteDetectiveLevels[levelIndex], BACH2_DEFINITE_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH2_DEFINITE_DETECTIVE_ERRORS = bach2DefiniteDetectiveLevels.flat()
