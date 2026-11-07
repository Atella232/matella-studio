import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { complexLatex, mul, type Complex } from '../lab/complex.ts'
import { say } from '../text.ts'

/* ==========================================================================
   J4 · Konplexuen detektibea (Detective de complejos): a worked solution
   of three lines with one wrong line, the mistakes of this unit. Level 1:
   the binomial form (i² taken as 1, the product of two roots of negative
   numbers, the square without the double product, the division part by
   part); level 2: the polar form (the modulus as a + b, the argument
   without its quadrant, the cosine and the sine swapped, the conjugate
   taken as the opposite); level 3: turns and roots (the arguments
   multiplied, De Moivre with n · r, a single root, the roots without
   + 360° · k). `right` and `reached` are the values the right working and
   the wrong one end at (a real part, a modulus, an argument or a count).
   ========================================================================== */

export type ComplexDetectiveError =
    | 'i-squared'
    | 'root-product'
    | 'no-double'
    | 'part-by-part'
    | 'modulus-sum'
    | 'quadrant'
    | 'cos-sin'
    | 'conjugate-opposite'
    | 'arguments-multiplied'
    | 'moivre-times'
    | 'single-root'
    | 'no-turns'

export const complexDetectiveLevels: ComplexDetectiveError[][] = [
    ['i-squared', 'root-product', 'no-double', 'part-by-part'],
    ['modulus-sum', 'quadrant', 'cos-sin', 'conjugate-opposite'],
    ['arguments-multiplied', 'moivre-times', 'single-root', 'no-turns']
]

export const COMPLEX_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    formula: say('Formula', 'Fórmula', 'الصيغة', 'Formula'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    solutions: say('Soluzioak', 'Soluciones', 'الحلول', 'Solutions')
}
const bracket = (value: Complex) => (value[0] !== 0 && value[1] !== 0) || value[0] < 0 || value[1] < 0 ? `(${complexLatex(value)})` : complexLatex(value)
const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)

export const complexDetectiveNames: Record<ComplexDetectiveError, LocalizedText> = {
    'i-squared': say('$i^2=1$ jarri du, eta $-1$ da', 'Puso $i^2=1$, y es $-1$', 'وضع $i^2=1$، وهو $-1$', 'Put $i^2=1$, and it is $-1$'),
    'root-product': say('Zenbaki negatiboen erroak batera biderkatu ditu', 'Multiplicó juntas las raíces de números negativos', 'ضرب جذري العددين السالبين معًا', 'Multiplied the roots of negative numbers together'),
    'no-double': say('Karratuan biderkadura bikoitza ahaztu du', 'Olvidó el doble producto en el cuadrado', 'نسي ضعف الجداء في المربع', 'Forgot the double product in the square'),
    'part-by-part': say('Zatiz zati zatitu du', 'Dividió parte a parte', 'قسم جزءًا على جزء', 'Divided part by part'),
    'modulus-sum': say('Modulua $a+b$ dela pentsatu du', 'Creyó que el módulo es $a+b$', 'ظن أن الطويلة $a+b$', 'Thought the modulus is $a+b$'),
    quadrant: say('Argumentuan koadrantea ez du begiratu', 'No miró el cuadrante en el argumento', 'لم ينظر إلى الربع في العمدة', 'Did not look at the quadrant for the argument'),
    'cos-sin': say('Kosinua eta sinua trukatu ditu', 'Cambió el coseno por el seno', 'بدّل جيب التمام بالجيب', 'Swapped the cosine and the sine'),
    'conjugate-opposite': say('Konjokatua aurkakotzat hartu du', 'Tomó el conjugado por el opuesto', 'عدّ المرافق هو المعاكس', 'Took the conjugate for the opposite'),
    'arguments-multiplied': say('Argumentuak biderkatu ditu, batu beharrean', 'Multiplicó los argumentos en vez de sumarlos', 'ضرب العمدتين بدل جمعهما', 'Multiplied the arguments instead of adding them'),
    'moivre-times': say('Modulua bider n egin du, berretu beharrean', 'Multiplicó el módulo por n en vez de elevarlo', 'ضرب الطويلة في n بدل رفعها إلى القوة', 'Multiplied the modulus by n instead of raising it'),
    'single-root': say('Erro bakarra eman du', 'Dio una sola raíz', 'أعطى جذرًا واحدًا', 'Gave a single root'),
    'no-turns': say('Birak $n$ zenbakiaz zatitu gabe batu ditu', 'Sumó las vueltas sin dividirlas entre $n$', 'أضاف الدورات دون قسمتها على $n$', 'Added the turns without dividing them by $n$')
}

export const complexDetectiveTips: Record<ComplexDetectiveError, LocalizedText> = {
    'i-squared': say('$i=\\sqrt{-1}$; beraz, $i^2=-1$.', '$i=\\sqrt{-1}$, así que $i^2=-1$.', '$i=\\sqrt{-1}$، لذلك $i^2=-1$.', '$i=\\sqrt{-1}$, so $i^2=-1$.'),
    'root-product': say('Lehenik idatzi erro bakoitza $i$ unitatearekin: $\\sqrt{-a}=\\sqrt{a}\\,i$.', 'Primero escribe cada raíz con $i$: $\\sqrt{-a}=\\sqrt{a}\\,i$.', 'اكتب أولًا كل جذر بالوحدة $i$: $\\sqrt{-a}=\\sqrt{a}\\,i$.', 'First write each root with $i$: $\\sqrt{-a}=\\sqrt{a}\\,i$.'),
    'no-double': say('$(a+bi)^2=a^2+2abi+b^2i^2$: hiru gai.', '$(a+bi)^2=a^2+2abi+b^2i^2$: tres términos.', '$(a+bi)^2=a^2+2abi+b^2i^2$: ثلاثة حدود.', '$(a+bi)^2=a^2+2abi+b^2i^2$: three terms.'),
    'part-by-part': say('Biderkatu goian eta behean izendatzailearen konjokatuaz.', 'Multiplica arriba y abajo por el conjugado del denominador.', 'اضرب البسط والمقام في مرافق المقام.', 'Multiply top and bottom by the conjugate of the denominator.'),
    'modulus-sum': say('$|a+bi|=\\sqrt{a^2+b^2}$: Pitagoras.', '$|a+bi|=\\sqrt{a^2+b^2}$: Pitágoras.', '$|a+bi|=\\sqrt{a^2+b^2}$: فيثاغورس.', '$|a+bi|=\\sqrt{a^2+b^2}$: Pythagoras.'),
    quadrant: say('Kalkulagailuak −90° eta 90° arteko angelua ematen du; begiratu afixua non dagoen.', 'La calculadora da un ángulo entre −90° y 90°; mira dónde está el afijo.', 'تعطي الآلة الحاسبة زاوية بين −90° و90°؛ انظر أين تقع الصورة.', 'The calculator gives an angle between −90° and 90°; look where the affix is.'),
    'cos-sin': say('$r_\\alpha=r\\cos\\alpha+i\\,r\\sen\\alpha$: kosinua zati errealean.', '$r_\\alpha=r\\cos\\alpha+i\\,r\\sen\\alpha$: el coseno, en la parte real.', '$r_\\alpha=r\\cos\\alpha+i\\,r\\sen\\alpha$: جيب التمام في الجزء الحقيقي.', '$r_\\alpha=r\\cos\\alpha+i\\,r\\sen\\alpha$: the cosine in the real part.'),
    'conjugate-opposite': say('Konjokatuaren argumentua $360°-\\alpha$ da; aurkakoarena, $\\alpha+180°$.', 'El argumento del conjugado es $360°-\\alpha$; el del opuesto, $\\alpha+180°$.', 'عمدة المرافق $360°-\\alpha$، وعمدة المعاكس $\\alpha+180°$.', 'The argument of the conjugate is $360°-\\alpha$; that of the opposite, $\\alpha+180°$.'),
    'arguments-multiplied': say('$r_\\alpha\\cdot s_\\beta=(r\\cdot s)_{\\alpha+\\beta}$.', '$r_\\alpha\\cdot s_\\beta=(r\\cdot s)_{\\alpha+\\beta}$.', '$r_\\alpha\\cdot s_\\beta=(r\\cdot s)_{\\alpha+\\beta}$.', '$r_\\alpha\\cdot s_\\beta=(r\\cdot s)_{\\alpha+\\beta}$.'),
    'moivre-times': say('$(r_\\alpha)^n=(r^n)_{n\\alpha}$.', '$(r_\\alpha)^n=(r^n)_{n\\alpha}$.', '$(r_\\alpha)^n=(r^n)_{n\\alpha}$.', '$(r_\\alpha)^n=(r^n)_{n\\alpha}$.'),
    'single-root': say('0 ez den zenbaki batek $n$ erro $n$-garren ditu.', 'Un número distinto de 0 tiene $n$ raíces $n$-ésimas.', 'للعدد غير المعدوم عدد $n$ من الجذور من الرتبة $n$.', 'A number other than 0 has $n$ $n$-th roots.'),
    'no-turns': say('Argumentuak: $\\frac{\\alpha+360°\\cdot k}{n}$; erroak $\\frac{360°}{n}$ banatzen dira.', 'Argumentos: $\\frac{\\alpha+360°\\cdot k}{n}$; las raíces se separan $\\frac{360°}{n}$.', 'العُمَد: $\\frac{\\alpha+360°\\cdot k}{n}$؛ وتفصل بين الجذور $\\frac{360°}{n}$.', 'Arguments: $\\frac{\\alpha+360°\\cdot k}{n}$; the roots are $\\frac{360°}{n}$ apart.')
}

type Built = Omit<WorkedCase<ComplexDetectiveError>, 'options'>

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]
const SQUARES = [4, 9, 16, 25]

/** A modulus and a notable angle: the real and the imaginary part, written exactly */
const NOTABLE: Record<number, { cos: string; sin: string; c: number; s: number }> = {
    30: { cos: '\\frac{\\sqrt{3}}{2}', sin: '\\frac{1}{2}', c: Math.sqrt(3) / 2, s: 0.5 },
    60: { cos: '\\frac{1}{2}', sin: '\\frac{\\sqrt{3}}{2}', c: 0.5, s: Math.sqrt(3) / 2 },
    120: { cos: '-\\frac{1}{2}', sin: '\\frac{\\sqrt{3}}{2}', c: -0.5, s: Math.sqrt(3) / 2 },
    150: { cos: '-\\frac{\\sqrt{3}}{2}', sin: '\\frac{1}{2}', c: -Math.sqrt(3) / 2, s: 0.5 },
    210: { cos: '-\\frac{\\sqrt{3}}{2}', sin: '-\\frac{1}{2}', c: -Math.sqrt(3) / 2, s: -0.5 },
    300: { cos: '\\frac{1}{2}', sin: '-\\frac{\\sqrt{3}}{2}', c: 0.5, s: -Math.sqrt(3) / 2 }
}
/** r times a ratio written for LaTeX: 4 · √3/2 = 2√3 */
function times(r: number, ratio: number): string {
    const sign = ratio < 0 ? '-' : ''
    const size = Math.abs(ratio)
    if (Math.abs(size - 0.5) < 1e-9) return `${sign}${r / 2}`
    const half = r / 2
    return `${sign}${half === 1 ? '' : half}\\sqrt{3}`
}

function build(random: Random, error: ComplexDetectiveError): Built | null {
    switch (error) {
        case 'i-squared': {
            const z: Complex = [randomInt(random, 1, 5), randomInt(random, 1, 5)]
            const w: Complex = [randomInt(random, 1, 5), pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])]
            const right = mul(z, w)
            const reached: Complex = [z[0] * w[0] + z[1] * w[1], right[1]]
            const bd = z[1] * w[1]
            return {
                problem: say(`Kalkulatu $${bracket(z)}${bracket(w)}$.`, `Calcula $${bracket(z)}${bracket(w)}$.`, `احسب $${bracket(z)}${bracket(w)}$.`, `Work out $${bracket(z)}${bracket(w)}$.`),
                lines: [line(LABELS.step, `${z[0] * w[0]}${signed(z[0] * w[1])}i${signed(z[1] * w[0])}i${signed(bd)}i^2`), line(LABELS.formula, 'i^2=1'), line(LABELS.result, complexLatex(reached))],
                wrong: 1, error, fix: `i^2=-1\\ \\to\\ ${complexLatex(right)}`, right: right[0], reached: reached[0]
            }
        }
        case 'root-product': {
            const [a, b] = [pick(random, SQUARES), pick(random, SQUARES)]
            if (a === b) return null
            const [p, q] = [Math.sqrt(a), Math.sqrt(b)]
            return {
                problem: say(`Kalkulatu $\\sqrt{-${a}}\\cdot\\sqrt{-${b}}$.`, `Calcula $\\sqrt{-${a}}\\cdot\\sqrt{-${b}}$.`, `احسب $\\sqrt{-${a}}\\cdot\\sqrt{-${b}}$.`, `Work out $\\sqrt{-${a}}\\cdot\\sqrt{-${b}}$.`),
                lines: [line(LABELS.data, `\\sqrt{-${a}}=${p}i\\qquad\\sqrt{-${b}}=${q}i`), line(LABELS.step, `\\sqrt{-${a}}\\cdot\\sqrt{-${b}}=\\sqrt{${a * b}}`), line(LABELS.result, `${p * q}`)],
                wrong: 1, error, fix: `${p}i\\cdot ${q}i=${p * q}i^2=-${p * q}`, right: -p * q, reached: p * q
            }
        }
        case 'no-double': {
            const z: Complex = [randomInt(random, 1, 5), pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])]
            const right = mul(z, z)
            return {
                problem: say(`Kalkulatu $${bracket(z)}^2$.`, `Calcula $${bracket(z)}^2$.`, `احسب $${bracket(z)}^2$.`, `Work out $${bracket(z)}^2$.`),
                lines: [line(LABELS.step, `${bracket(z)}^2=${z[0] ** 2}+${z[1] ** 2}i^2`), line(LABELS.formula, 'i^2=-1'), line(LABELS.result, `${z[0] ** 2 - z[1] ** 2}`)],
                wrong: 0, error, fix: `${bracket(z)}^2=${z[0] ** 2}${signed(2 * z[0] * z[1])}i${signed(z[1] ** 2)}i^2=${complexLatex(right)}`, right: right[1], reached: 0
            }
        }
        case 'part-by-part': {
            const w: Complex = [randomInt(random, 1, 3), pick(random, [-2, -1, 1, 2])]
            const d: Complex = pick(random, [[1, 1], [1, -1], [2, 1], [1, 2]] as Complex[])
            const top = mul(w, d)
            if (top[0] % d[0] !== 0 || top[1] % d[1] !== 0) return null
            const reached: Complex = [top[0] / d[0], top[1] / d[1]]
            const norm = d[0] ** 2 + d[1] ** 2
            return {
                problem: say(`Kalkulatu $\\frac{${complexLatex(top)}}{${complexLatex(d)}}$.`, `Calcula $\\frac{${complexLatex(top)}}{${complexLatex(d)}}$.`, `احسب $\\frac{${complexLatex(top)}}{${complexLatex(d)}}$.`, `Work out $\\frac{${complexLatex(top)}}{${complexLatex(d)}}$.`),
                lines: [line(LABELS.data, `${complexLatex(top)}\\quad ${complexLatex(d)}`), line(LABELS.step, `\\frac{${top[0]}}{${d[0]}}+\\frac{${top[1]}}{${d[1]}}i`), line(LABELS.result, complexLatex(reached))],
                wrong: 1, error, fix: `\\frac{${bracket(top)}${bracket([d[0], -d[1]])}}{${norm}}=${complexLatex(w)}`, right: w[0], reached: reached[0]
            }
        }
        case 'modulus-sum': {
            const [p, q, h] = pick(random, TRIPLES)
            const z: Complex = [pick(random, [-1, 1]) * p, pick(random, [-1, 1]) * q]
            return {
                problem: say(`Kalkulatu $${complexLatex(z)}$ zenbakiaren modulua.`, `Halla el módulo de $${complexLatex(z)}$.`, `أوجد طويلة $${complexLatex(z)}$.`, `Find the modulus of $${complexLatex(z)}$.`),
                lines: [line(LABELS.data, `a=${z[0]}\\qquad b=${z[1]}`), line(LABELS.formula, `|{z}|=|a|+|b|`), line(LABELS.result, `|{z}|=${p + q}`)],
                wrong: 1, error, fix: `|{z}|=\\sqrt{${p * p}+${q * q}}=${h}`, right: h, reached: p + q
            }
        }
        case 'quadrant': {
            const k = randomInt(random, 1, 4)
            const times = k === 1 ? '' : String(k)
            const { angle, calculator, tangent, latex } = pick(random, [
                { angle: 135, calculator: -45, tangent: '-1', latex: `-${k}+${times}i` },
                { angle: 225, calculator: 45, tangent: '1', latex: `-${k}-${times}i` },
                { angle: 120, calculator: -60, tangent: '-\\sqrt{3}', latex: `-${k}+${times}\\sqrt{3}\\,i` },
                { angle: 240, calculator: 60, tangent: '\\sqrt{3}', latex: `-${k}-${times}\\sqrt{3}\\,i` }
            ])
            const reached = calculator < 0 ? calculator + 360 : calculator
            return {
                problem: say(`Kalkulatu $${latex}$ zenbakiaren argumentua.`, `Halla el argumento de $${latex}$.`, `أوجد عمدة $${latex}$.`, `Find the argument of $${latex}$.`),
                lines: [line(LABELS.formula, `\\tg\\alpha=\\frac{b}{a}=${tangent}`), line(LABELS.step, `\\alpha=${calculator}°`), line(LABELS.result, `\\alpha=${reached}°`)],
                wrong: 1, error, fix: `a<0\\ \\to\\ \\alpha=${calculator}°+180°=${angle}°`, right: angle, reached
            }
        }
        case 'cos-sin': {
            const r = pick(random, [2, 4, 6, 8])
            const angle = pick(random, [30, 60, 120, 150, 210, 300])
            const ratios = NOTABLE[angle]
            const realPart = r * ratios.c
            const wrongReal = r * ratios.s
            return {
                problem: say(`Idatzi $${r}_{${angle}°}$ forma binomikoan.`, `Escribe $${r}_{${angle}°}$ en forma binómica.`, `اكتب $${r}_{${angle}°}$ بالشكل الجبري.`, `Write $${r}_{${angle}°}$ in binomial form.`),
                lines: [line(LABELS.formula, `\\begin{gathered}a=${r}\\sen ${angle}°\\\\ b=${r}\\cos ${angle}°\\end{gathered}`), line(LABELS.data, `\\begin{gathered}\\sen ${angle}°=${ratios.sin}\\\\ \\cos ${angle}°=${ratios.cos}\\end{gathered}`), line(LABELS.result, `\\begin{gathered}a=${times(r, ratios.s)}\\\\ b=${times(r, ratios.c)}\\end{gathered}`)],
                wrong: 0, error, fix: `\\begin{gathered}a=${r}\\cos ${angle}°=${times(r, ratios.c)}\\\\ b=${r}\\sen ${angle}°=${times(r, ratios.s)}\\end{gathered}`, right: realPart, reached: wrongReal
            }
        }
        case 'conjugate-opposite': {
            const r = randomInt(random, 2, 9)
            const angle = pick(random, [20, 40, 50, 70, 100, 110, 130, 160])
            return {
                problem: say(`Idatzi $${r}_{${angle}°}$ zenbakiaren konjokatua forma polarrean.`, `Escribe en forma polar el conjugado de $${r}_{${angle}°}$.`, `اكتب بالشكل القطبي مرافق $${r}_{${angle}°}$.`, `Write in polar form the conjugate of $${r}_{${angle}°}$.`),
                lines: [line(LABELS.data, `r=${r}\\qquad\\alpha=${angle}°`), line(LABELS.formula, `\\overline{z}=r_{\\alpha+180°}`), line(LABELS.result, `${r}_{${angle + 180}°}`)],
                wrong: 1, error, fix: `\\overline{z}=r_{360°-\\alpha}\\ \\to\\ ${r}_{${360 - angle}°}`, right: 360 - angle, reached: angle + 180
            }
        }
        case 'arguments-multiplied': {
            const [r, s] = [randomInt(random, 2, 5), randomInt(random, 2, 4)]
            const [alpha, beta] = [pick(random, [10, 15, 20, 30]), pick(random, [5, 6, 8, 9, 12])]
            return {
                problem: say(`Kalkulatu $${r}_{${alpha}°}\\cdot ${s}_{${beta}°}$.`, `Calcula $${r}_{${alpha}°}\\cdot ${s}_{${beta}°}$.`, `احسب $${r}_{${alpha}°}\\cdot ${s}_{${beta}°}$.`, `Work out $${r}_{${alpha}°}\\cdot ${s}_{${beta}°}$.`),
                lines: [line(LABELS.step, `${r}\\cdot ${s}=${r * s}`), line(LABELS.step, `${alpha}°\\cdot ${beta}°=${alpha * beta}°`), line(LABELS.result, `${r * s}_{${alpha * beta}°}`)],
                wrong: 1, error, fix: `${alpha}°+${beta}°=${alpha + beta}°\\ \\to\\ ${r * s}_{${alpha + beta}°}`, right: alpha + beta, reached: alpha * beta
            }
        }
        case 'moivre-times': {
            const r = randomInt(random, 2, 3)
            const n = randomInt(random, 3, 5)
            const alpha = pick(random, [10, 20, 30, 40, 50])
            return {
                problem: say(`Kalkulatu $(${r}_{${alpha}°})^{${n}}$.`, `Calcula $(${r}_{${alpha}°})^{${n}}$.`, `احسب $(${r}_{${alpha}°})^{${n}}$.`, `Work out $(${r}_{${alpha}°})^{${n}}$.`),
                lines: [line(LABELS.step, `${n}\\cdot ${r}=${n * r}`), line(LABELS.step, `${n}\\cdot ${alpha}°=${n * alpha}°`), line(LABELS.result, `${n * r}_{${n * alpha}°}`)],
                wrong: 0, error, fix: `${r}^{${n}}=${r ** n}\\ \\to\\ ${r ** n}_{${n * alpha}°}`, right: r ** n, reached: n * r
            }
        }
        case 'single-root': {
            const n = pick(random, [3, 4])
            const r = randomInt(random, 2, 3)
            const theta = pick(random, n === 3 ? [90, 180, 270] : [120, 240])
            const step = 360 / n
            const first = theta / n
            const all = Array.from({ length: n }, (_, k) => `${r}_{${first + step * k}°}`).join(',\\ ')
            return {
                problem: say(`Ebatzi ${'${z}'}^${n}=${r ** n}_{${theta}°}$ ekuazioa.`, `Resuelve ${'${z}'}^${n}=${r ** n}_{${theta}°}$.`, `حُلّ ${'${z}'}^${n}=${r ** n}_{${theta}°}$.`, `Solve ${'${z}'}^${n}=${r ** n}_{${theta}°}$.`),
                lines: [line(LABELS.step, `\\sqrt[${n}]{${r ** n}}=${r}`), line(LABELS.step, `\\frac{${theta}°}{${n}}=${first}°`), line(LABELS.solutions, `{z}=${r}_{${first}°}`)],
                wrong: 2, error, fix: all, right: n, reached: 1
            }
        }
        case 'no-turns': {
            const n = pick(random, [3, 4, 6])
            const theta = pick(random, n === 3 ? [30, 60, 90] : n === 4 ? [40, 80, 120] : [60, 120, 180])
            const first = theta / n
            const r = 2
            return {
                problem: say(`Aurkitu $${r ** n}_{${theta}°}$ zenbakiaren erroak, $n=${n}$ izanik.`, `Halla las raíces de orden $n=${n}$ de $${r ** n}_{${theta}°}$.`, `أوجد الجذور من الرتبة $n=${n}$ لـ $${r ** n}_{${theta}°}$.`, `Find the roots of order $n=${n}$ of $${r ** n}_{${theta}°}$.`),
                lines: [line(LABELS.step, `\\sqrt[${n}]{${r ** n}}=${r}`), line(LABELS.formula, `${first}°+360°\\cdot k`), line(LABELS.solutions, `{z}=${r}_{${first}°}`)],
                wrong: 1, error, fix: `\\begin{gathered}\\frac{${theta}°+360°\\cdot k}{${n}}\\\\ =${first}°+${360 / n}°\\cdot k\\end{gathered}`, right: 360 / n, reached: 360
            }
        }
    }
    return null
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createComplexDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, complexDetectiveLevels[levelIndex], COMPLEX_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}
