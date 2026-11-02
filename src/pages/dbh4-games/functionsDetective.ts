import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../features/unit-v2/games/workedDetective.ts'
import { fraction, toLatex } from '../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'
import { setCode, setLatex, type Piece } from './equationsDetective.ts'
import { polyLatex, valueAt, type Coefficients } from './polynomials.ts'

/* ==========================================================================
   Funtzioen detektibea (4. DBH, applied and academic): a worked solution
   of three lines with one wrong line. Level 1: images and preimages (f(k)
   for f(x) = k, a negative squared without brackets, the wrong piece of a
   piecewise function, f(a + b) as f(a) + f(b)); level 2: domains (as
   sets, `setCode`); level 3: the mean rate of change.
   ========================================================================== */

export type FunctionsDetectiveError =
    | 'image-for-preimage'
    | 'negative-squared'
    | 'wrong-piece'
    | 'image-of-sum'
    | 'root-strict'
    | 'denominator-kept'
    | 'root-wrong-side'
    | 'radicand-between'
    | 'rate-not-divided'
    | 'rate-upside-down'
    | 'rate-order'
    | 'image-of-difference'

export const functionsDetectiveLevels: FunctionsDetectiveError[][] = [
    ['image-for-preimage', 'negative-squared', 'wrong-piece', 'image-of-sum'],
    ['root-strict', 'denominator-kept', 'root-wrong-side', 'radicand-between'],
    ['rate-not-divided', 'rate-upside-down', 'rate-order', 'image-of-difference']
]

export const FUNCTIONS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    piece: say('Adarra', 'Trozo', 'الفرع', 'Piece'),
    condition: say('Baldintza', 'Condición', 'الشرط', 'Condition'),
    solve: say('Ebatzi', 'Resuelve', 'حلّ', 'Solve'),
    domain: say('Eremua', 'Dominio', 'المجال', 'Domain'),
    values: say('Balioak', 'Valores', 'القيم', 'Values'),
    rate: say('Batez besteko aldakuntza-tasa', 'Tasa de variación media', 'معدل التغير المتوسط', 'Mean rate of change')
}

export const functionsDetectiveNames: Record<FunctionsDetectiveError, LocalizedText> = {
    'image-for-preimage': say('Irudia kalkulatu du, aurreirudia bilatu beharrean', 'Calculó una imagen en vez de buscar la antiimagen', 'حسب صورة بدل البحث عن الأصل', 'Worked out an image instead of finding the preimage'),
    'negative-squared': say('Negatiboa parentesirik gabe ber bi egin du', 'Elevó el negativo al cuadrado sin paréntesis', 'ربّع العدد السالب دون أقواس', 'Squared the negative number without brackets'),
    'wrong-piece': say('Zatikako funtzioaren adar okerra erabili du', 'Usó el trozo equivocado de la función a trozos', 'استعمل الفرع الخاطئ للدالة المعرّفة بفروع', 'Used the wrong piece of the piecewise function'),
    'image-of-sum': say('f(a + b) = f(a) + f(b) dela pentsatu du', 'Pensó que f(a + b) = f(a) + f(b)', 'ظن أن f(a + b) = f(a) + f(b)', 'Thought that f(a + b) = f(a) + f(b)'),
    'root-strict': say('Erro karratuan, errokizuna 0 izatea baztertu du', 'En la raíz cuadrada quitó el caso de radicando 0', 'في الجذر التربيعي استبعد حالة الصفر', 'In the square root, left out the radicand being 0'),
    'denominator-kept': say('Izendatzailea zero egiten duen puntua eremuan utzi du', 'Dejó en el dominio el punto que anula el denominador', 'أبقى في المجال النقطة التي تجعل المقام صفرًا', 'Kept in the domain the point that makes the denominator zero'),
    'root-wrong-side': say('Desberdintza alderantziz ebatzi du', 'Resolvió la desigualdad al revés', 'حلّ المتباينة بالعكس', 'Solved the inequality the wrong way round'),
    'radicand-between': say('Erroen artekoa hartu du, kanpokoa beharrean', 'Tomó lo de entre las raíces en vez de lo de fuera', 'أخذ ما بين الجذرين بدل ما خارجهما', 'Took what lies between the roots instead of outside'),
    'rate-not-divided': say('Ez du tartearen luzeraz zatitu', 'No dividió entre la longitud del intervalo', 'لم يقسم على طول الفترة', 'Did not divide by the length of the interval'),
    'rate-upside-down': say('Zatiketa alderantziz egin du: x-en aldea zati y-ena', 'Hizo el cociente al revés: diferencia de x entre la de y', 'قسم بالعكس: فرق x على فرق y', 'Did the quotient upside down: change in x over change in y'),
    'rate-order': say('Goian eta behean ordena desberdinean kendu du', 'Restó en distinto orden arriba y abajo', 'طرح بترتيب مختلف في البسط والمقام', 'Subtracted in a different order on top and underneath'),
    'image-of-difference': say('Kenduraren irudia kalkulatu du, irudien kendura beharrean', 'Calculó la imagen de la diferencia, no la diferencia de las imágenes', 'حسب صورة الفرق لا فرق الصورتين', 'Worked out the image of the difference, not the difference of the images')
}

export const functionsDetectiveTips: Record<FunctionsDetectiveError, LocalizedText> = {
    'image-for-preimage': say('$f(x)=k$: x da ezezaguna; ebatzi ekuazioa.', '$f(x)=k$: la incógnita es x; resuelve la ecuación.', '$f(x)=k$: المجهول هو x؛ حلّ المعادلة.', '$f(x)=k$: x is the unknown; solve the equation.'),
    'negative-squared': say('$f(-2)$: ordeztu parentesiarekin, $(-2)^{2}=4$.', '$f(-2)$: sustituye con paréntesis, $(-2)^{2}=4$.', '$f(-2)$: عوّض مع الأقواس، $(-2)^{2}=4$.', '$f(-2)$: substitute with brackets, $(-2)^{2}=4$.'),
    'wrong-piece': say('Begiratu baldintza: zein adarretan dago x?', 'Mira la condición: ¿en qué trozo está x?', 'انظر إلى الشرط: في أي فرع تقع x؟', 'Look at the condition: which piece is x in?'),
    'image-of-sum': say('$f(x)=x^{2}$ bada, $f(2+3)=25$, ez $4+9$.', 'Si $f(x)=x^{2}$, $f(2+3)=25$, no $4+9$.', 'إذا كان $f(x)=x^{2}$ فإن $f(2+3)=25$ وليس $4+9$.', 'If $f(x)=x^{2}$, $f(2+3)=25$, not $4+9$.'),
    'root-strict': say('$\\sqrt{0}=0$ badago: $x-a\\ge 0$.', '$\\sqrt{0}=0$ existe: $x-a\\ge 0$.', '$\\sqrt{0}=0$ موجود: $x-a\\ge 0$.', '$\\sqrt{0}=0$ exists: $x-a\\ge 0$.'),
    'denominator-kept': say('Ezin da zeroz zatitu: kendu izendatzailearen erroak.', 'No se puede dividir entre 0: quita las raíces del denominador.', 'لا تجوز القسمة على 0: احذف جذور المقام.', 'You cannot divide by 0: remove the roots of the denominator.'),
    'root-wrong-side': say('$a-x\\ge 0$ bada, $x\\le a$.', 'Si $a-x\\ge 0$, entonces $x\\le a$.', 'إذا كان $a-x\\ge 0$ فإن $x\\le a$.', 'If $a-x\\ge 0$, then $x\\le a$.'),
    'radicand-between': say('$x^{2}-9\\ge 0$ erroetatik kanpo betetzen da.', '$x^{2}-9\\ge 0$ se cumple fuera de las raíces.', '$x^{2}-9\\ge 0$ يتحقق خارج الجذرين.', '$x^{2}-9\\ge 0$ holds outside the roots.'),
    'rate-not-divided': say('Tasa: $\\frac{f(b)-f(a)}{b-a}$; tartearen luzeraz zatitzen da.', 'La tasa: $\\frac{f(b)-f(a)}{b-a}$; se divide entre la longitud del intervalo.', 'المعدل: $\\frac{f(b)-f(a)}{b-a}$؛ نقسم على طول الفترة.', 'The rate: $\\frac{f(b)-f(a)}{b-a}$; divide by the length of the interval.'),
    'rate-upside-down': say('Irudien aldaketa goian, x-ena behean.', 'El cambio de las imágenes arriba; el de x, abajo.', 'تغيّر الصور في البسط وتغيّر x في المقام.', 'The change of the images on top; the change of x underneath.'),
    'rate-order': say('Goian eta behean ordena bera: $f(b)-f(a)$ eta $b-a$.', 'Arriba y abajo el mismo orden: $f(b)-f(a)$ y $b-a$.', 'الترتيب نفسه في البسط والمقام: $f(b)-f(a)$ و$b-a$.', 'The same order on top and underneath: $f(b)-f(a)$ and $b-a$.'),
    'image-of-difference': say('$f(b)-f(a)\\ne f(b-a)$.', '$f(b)-f(a)\\ne f(b-a)$.', '$f(b)-f(a)\\ne f(b-a)$.', '$f(b)-f(a)\\ne f(b-a)$.')
}

const nonzero = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => index + min).filter((value) => value !== 0)
const p = (value: number) => (value < 0 ? `(${value})` : String(value))
const value = (numerator: number, denominator = 1) => toLatex(fraction(numerator, denominator))

type Built = Omit<WorkedCase<FunctionsDetectiveError>, 'options'>

function build(random: Random, error: FunctionsDetectiveError): Built | null {
    const f = (coefficients: Coefficients) => `f(x)=${polyLatex(coefficients)}`
    switch (error) {
        case 'image-for-preimage': {
            const a = pick(random, [2, 3, 4, -2])
            const x = randomInt(random, -4, 6)
            const b = pick(random, nonzero(-7, 7))
            const k = a * x + b
            const reached = a * k + b
            return {
                problem: say(`$${f([a, b])}$. Aurkitu x, $f(x)=${k}$ izan dadin.`, `$${f([a, b])}$. Halla x para que $f(x)=${k}$.`, `$${f([a, b])}$. أوجد x بحيث $f(x)=${k}$.`, `$${f([a, b])}$. Find x so that $f(x)=${k}$.`),
                lines: [line(LABELS.substitute, `f(${k})=${a}\\cdot ${p(k)}${b < 0 ? '' : '+'}${b}`), line(LABELS.result, `f(${k})=${reached}`), line(LABELS.result, `x=${reached}`)],
                wrong: 0, error, fix: `${polyLatex([a, b])}=${k}\\ \\to\\ x=${x}`, right: x, reached
            }
        }
        case 'negative-squared': {
            const b = pick(random, nonzero(-5, 5))
            const k = randomInt(random, 2, 5)
            const right = k * k - b * k
            const reached = -k * k - b * k
            return {
                problem: say(`$${f([1, b, 0])}$. Kalkulatu $f(-${k})$.`, `$${f([1, b, 0])}$. Calcula $f(-${k})$.`, `$${f([1, b, 0])}$. احسب $f(-${k})$.`, `$${f([1, b, 0])}$. Work out $f(-${k})$.`),
                lines: [line(LABELS.substitute, `-${k}^{2}${b < 0 ? '-' : '+'}${Math.abs(b)}\\cdot(-${k})`), line(LABELS.result, `-${k * k}${-b * k < 0 ? '' : '+'}${-b * k}`), line(LABELS.result, `f(-${k})=${reached}`)],
                wrong: 0, error, fix: `(-${k})^{2}=${k * k}\\ \\to\\ f(-${k})=${right}`, right, reached
            }
        }
        case 'wrong-piece': {
            const edge = randomInt(random, -2, 3)
            const m = pick(random, [2, 3, -1])
            const n = randomInt(random, -4, 4)
            const right = m * edge + n
            const reached = edge * edge
            if (right === reached) return null
            const system = `f(x)=\\begin{cases}x^{2} & x<${edge}\\\\${polyLatex([m, n])} & x\\ge ${edge}\\end{cases}`
            return {
                problem: say(`$${system}$. Kalkulatu $f(${edge})$.`, `$${system}$. Calcula $f(${edge})$.`, `$${system}$. احسب $f(${edge})$.`, `$${system}$. Work out $f(${edge})$.`),
                lines: [line(LABELS.piece, `x^{2}`), line(LABELS.substitute, `${p(edge)}^{2}`), line(LABELS.result, `f(${edge})=${reached}`)],
                wrong: 0, error, fix: `${edge}\\ge ${edge}\\ \\to\\ f(${edge})=${right}`, right, reached
            }
        }
        case 'image-of-sum': {
            const a = randomInt(random, 1, 4)
            const b = randomInt(random, 2, 5)
            const c = randomInt(random, 1, 6)
            const right = (a + b) ** 2 + c
            const reached = a * a + c + b * b + c
            return {
                problem: say(`$${f([1, 0, c])}$. Kalkulatu $f(${a}+${b})$.`, `$${f([1, 0, c])}$. Calcula $f(${a}+${b})$.`, `$${f([1, 0, c])}$. احسب $f(${a}+${b})$.`, `$${f([1, 0, c])}$. Work out $f(${a}+${b})$.`),
                lines: [line(LABELS.substitute, `f(${a}+${b})=f(${a})+f(${b})`), line(LABELS.values, `${a * a + c}+${b * b + c}`), line(LABELS.result, `${reached}`)],
                wrong: 0, error, fix: `f(${a + b})=${a + b}^{2}+${c}=${right}`, right, reached
            }
        }
        case 'root-strict': {
            const a = randomInt(random, -5, 5)
            const right: Piece[] = [[a, null, true, false]]
            const reached: Piece[] = [[a, null, false, false]]
            return {
                problem: say(`Aurkitu eremua: $f(x)=\\sqrt{x${a > 0 ? '-' : '+'}${Math.abs(a)}}$`, `Halla el dominio: $f(x)=\\sqrt{x${a > 0 ? '-' : '+'}${Math.abs(a)}}$`, `أوجد المجال: $f(x)=\\sqrt{x${a > 0 ? '-' : '+'}${Math.abs(a)}}$`, `Find the domain: $f(x)=\\sqrt{x${a > 0 ? '-' : '+'}${Math.abs(a)}}$`),
                lines: [line(LABELS.condition, `x${a > 0 ? '-' : '+'}${Math.abs(a)}>0`), line(LABELS.solve, `x>${a}`), line(LABELS.domain, setLatex(reached))],
                wrong: 0, error, fix: `x\\ge ${a}\\ \\to\\ ${setLatex(right)}`, right: setCode(right), reached: setCode(reached)
            }
        }
        case 'denominator-kept': {
            const a = pick(random, nonzero(-5, 5))
            const right: Piece[] = [[null, a, false, false], [a, null, false, false]]
            const reached: Piece[] = [[null, null, false, false]]
            return {
                problem: say(`Aurkitu eremua: $f(x)=\\frac{x}{x${a > 0 ? '-' : '+'}${Math.abs(a)}}$`, `Halla el dominio: $f(x)=\\frac{x}{x${a > 0 ? '-' : '+'}${Math.abs(a)}}$`, `أوجد المجال: $f(x)=\\frac{x}{x${a > 0 ? '-' : '+'}${Math.abs(a)}}$`, `Find the domain: $f(x)=\\frac{x}{x${a > 0 ? '-' : '+'}${Math.abs(a)}}$`),
                lines: [line(LABELS.condition, `x\\in\\mathbb{R}`), line(LABELS.solve, `x\\in\\mathbb{R}`), line(LABELS.domain, setLatex(reached))],
                wrong: 0, error, fix: `x\\ne ${a}\\ \\to\\ ${setLatex(right)}`, right: setCode(right), reached: setCode(reached)
            }
        }
        case 'root-wrong-side': {
            const a = randomInt(random, -5, 5)
            const right: Piece[] = [[null, a, false, true]]
            const reached: Piece[] = [[a, null, true, false]]
            return {
                problem: say(`Aurkitu eremua: $f(x)=\\sqrt{${a}-x}$`, `Halla el dominio: $f(x)=\\sqrt{${a}-x}$`, `أوجد المجال: $f(x)=\\sqrt{${a}-x}$`, `Find the domain: $f(x)=\\sqrt{${a}-x}$`),
                lines: [line(LABELS.condition, `${a}-x\\ge 0`), line(LABELS.solve, `x\\ge ${a}`), line(LABELS.domain, setLatex(reached))],
                wrong: 1, error, fix: `x\\le ${a}\\ \\to\\ ${setLatex(right)}`, right: setCode(right), reached: setCode(reached)
            }
        }
        case 'radicand-between': {
            const b = randomInt(random, 2, 7)
            const right: Piece[] = [[null, -b, false, true], [b, null, true, false]]
            const reached: Piece[] = [[-b, b, true, true]]
            return {
                problem: say(`Aurkitu eremua: $f(x)=\\sqrt{x^{2}-${b * b}}$`, `Halla el dominio: $f(x)=\\sqrt{x^{2}-${b * b}}$`, `أوجد المجال: $f(x)=\\sqrt{x^{2}-${b * b}}$`, `Find the domain: $f(x)=\\sqrt{x^{2}-${b * b}}$`),
                lines: [line(LABELS.condition, `x^{2}-${b * b}\\ge 0`), line(LABELS.solve, `-${b}\\le x\\le ${b}`), line(LABELS.domain, setLatex(reached))],
                wrong: 1, error, fix: setLatex(right), right: setCode(right), reached: setCode(reached)
            }
        }
        case 'rate-not-divided':
        case 'rate-upside-down':
        case 'rate-order':
        case 'image-of-difference': {
            const coefficients: Coefficients = [1, pick(random, nonzero(-3, 3)), randomInt(random, -5, 5)]
            const a = randomInt(random, -2, 1)
            const b = randomInt(random, a + 2, 4)
            const [fa, fb] = [valueAt(coefficients, a), valueAt(coefficients, b)]
            if (fb === fa) return null
            const rate = (fb - fa) / (b - a)
            const problem = say(`$${f(coefficients)}$. Kalkulatu batez besteko aldakuntza-tasa $[${a},\\,${b}]$ tartean.`, `$${f(coefficients)}$. Calcula la tasa de variación media en $[${a},\\,${b}]$.`, `$${f(coefficients)}$. احسب معدل التغير المتوسط في $[${a},\\,${b}]$.`, `$${f(coefficients)}$. Work out the mean rate of change on $[${a},\\,${b}]$.`)
            const values = line(LABELS.values, `f(${a})=${fa},\\ f(${b})=${fb}`)
            const fix = `\\frac{${fb}-${p(fa)}}{${b}-${p(a)}}=${value(fb - fa, b - a)}`
            if (error === 'rate-not-divided') return { problem, lines: [values, line(LABELS.rate, `${fb}-${p(fa)}`), line(LABELS.result, `${fb - fa}`)], wrong: 1, error, fix, right: rate, reached: fb - fa }
            if (error === 'rate-upside-down') return { problem, lines: [values, line(LABELS.rate, `\\frac{${b}-${p(a)}}{${fb}-${p(fa)}}`), line(LABELS.result, value(b - a, fb - fa))], wrong: 1, error, fix, right: rate, reached: (b - a) / (fb - fa) }
            if (error === 'rate-order') return { problem, lines: [values, line(LABELS.rate, `\\frac{${fb}-${p(fa)}}{${a}-${b}}`), line(LABELS.result, value(fb - fa, a - b))], wrong: 1, error, fix, right: rate, reached: -rate }
            const fd = valueAt(coefficients, b - a)
            if (fd === fb - fa) return null
            return { problem, lines: [line(LABELS.values, `b-a=${b - a}`), line(LABELS.rate, `\\frac{f(${b - a})}{${b - a}}`), line(LABELS.result, value(fd, b - a))], wrong: 1, error, fix, right: rate, reached: fd / (b - a) }
        }
    }
}

export const createFunctionsDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, functionsDetectiveLevels[levelIndex], FUNCTIONS_DETECTIVE_CASES, build)
