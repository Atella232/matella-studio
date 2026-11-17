import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Integralen detektibea · Batxilergoa 2 · Gizarte Zientziak (Detective de
   integrales de 2.º Sociales): a solved exercise with exactly one wrong
   line. Level 1, antiderivatives: the exponent raised without dividing,
   the derivative taken instead, C copied instead of worked out, e^{kx}
   without the 1/k. Level 2, the definite integral: Barrow the wrong way
   round, the inside derivative left in, the width of the rectangles, two
   intervals subtracted instead of added. Level 3, areas and economy: a
   negative area, the bottom curve on top, the fixed cost left out, the
   rate read instead of what piles up.
   ========================================================================== */

export type Bach2gIntegralsDetectiveError =
    | 'no-divide'
    | 'derivative'
    | 'copied-c'
    | 'exp-k'
    | 'barrow-order'
    | 'inside-left'
    | 'width'
    | 'intervals'
    | 'negative-area'
    | 'bottom-top'
    | 'fixed-cost'
    | 'rate-value'

export const bach2gIntegralsDetectiveLevels: Bach2gIntegralsDetectiveError[][] = [
    ['no-divide', 'derivative', 'copied-c', 'exp-k'],
    ['barrow-order', 'inside-left', 'width', 'intervals'],
    ['negative-area', 'bottom-top', 'fixed-cost', 'rate-value']
]

export const BACH2G_INTEGRALS_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    primitive: say('Jatorrizkoa', 'Primitiva', 'الدالة الأصلية', 'Antiderivative'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    barrow: say('Barrow', 'Barrow', 'بارو', 'Barrow'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

type Built = Omit<WorkedCase<Bach2gIntegralsDetectiveError>, 'options'>

function build(random: Random, error: Bach2gIntegralsDetectiveError): Built | null {
    switch (error) {
        case 'no-divide': {
            const k = randomInt(random, 1, 4)
            const n = randomInt(random, 2, 3)
            const a = k * (n + 1)
            return {
                problem: say(`$F$ funtzioa $${a}x^{${n}}$ funtzioaren jatorrizkoa da eta $F(0)=0$. Kalkulatu $F(1)$.`, `$F$ es la primitiva de $${a}x^{${n}}$ con $F(0)=0$. Calcula $F(1)$.`, `$F$ الدالة الأصلية لـ $${a}x^{${n}}$ مع $F(0)=0$. احسب $F(1)$.`, `$F$ is the antiderivative of $${a}x^{${n}}$ with $F(0)=0$. Work out $F(1)$.`),
                lines: [line(LABELS.primitive, `F(x)=${a}x^{${n + 1}}`), line(LABELS.step, `F(1)=${a}\\cdot 1`), line(LABELS.result, `${a}`)],
                wrong: 0, error, fix: `F(x)=\\frac{${a}x^{${n + 1}}}{${n + 1}}=${k === 1 ? '' : k}x^{${n + 1}}\\ \\to\\ ${k}`, right: k, reached: a
            }
        }
        case 'derivative': {
            const n = randomInt(random, 2, 4)
            const b = randomInt(random, 2, 3)
            // ∫₀ᵇ xⁿ dx = bⁿ⁺¹/(n + 1); the slip differentiates: n bⁿ⁻¹
            return {
                problem: say(`Kalkulatu $\\int_0^{${b}} x^{${n}}\\,dx$.`, `Calcula $\\int_0^{${b}} x^{${n}}\\,dx$.`, `احسب $\\int_0^{${b}} x^{${n}}\\,dx$.`, `Work out $\\int_0^{${b}} x^{${n}}\\,dx$.`),
                lines: [line(LABELS.primitive, `F(x)=${n}x^{${n - 1}}`), line(LABELS.barrow, `F(${b})-F(0)=${n * b ** (n - 1)}-0`), line(LABELS.result, `${n * b ** (n - 1)}`)],
                wrong: 0, error, fix: `F(x)=\\frac{x^{${n + 1}}}{${n + 1}}\\ \\to\\ \\frac{${b ** (n + 1)}}{${n + 1}}`, right: b ** (n + 1) / (n + 1), reached: n * b ** (n - 1)
            }
        }
        case 'copied-c': {
            const a = randomInt(random, 1, 3)
            const v = randomInt(random, 4, 9)
            // F′ = 2a x, F(1) = v: F = a x² + (v − a)
            return {
                problem: say(`$F'(x)=${2 * a}x$ eta $F(1)=${v}$. Kalkulatu $F(2)$.`, `$F'(x)=${2 * a}x$ y $F(1)=${v}$. Calcula $F(2)$.`, `$F'(x)=${2 * a}x$ و$F(1)=${v}$. احسب $F(2)$.`, `$F'(x)=${2 * a}x$ and $F(1)=${v}$. Work out $F(2)$.`),
                lines: [line(LABELS.primitive, `F(x)=${a === 1 ? '' : a}x^2+C`), line(LABELS.step, `C=${v}`), line(LABELS.result, `F(2)=${4 * a + v}`)],
                wrong: 1, error, fix: `${a}+C=${v}\\ \\to\\ C=${v - a}\\ \\to\\ F(2)=${4 * a + v - a}`, right: 4 * a + v - a, reached: 4 * a + v
            }
        }
        case 'exp-k': {
            const m = pick(random, [2, 3, 4])
            const k = m * randomInt(random, 1, 3)
            return {
                problem: say(`$F$ funtzioa $${k}e^{${m}x}$ funtzioaren jatorrizkoa da, $C=0$ izanik. Kalkulatu $F(0)$.`, `$F$ es la primitiva de $${k}e^{${m}x}$ con $C=0$. Calcula $F(0)$.`, `$F$ الدالة الأصلية لـ $${k}e^{${m}x}$ مع $C=0$. احسب $F(0)$.`, `$F$ is the antiderivative of $${k}e^{${m}x}$ with $C=0$. Work out $F(0)$.`),
                lines: [line(LABELS.primitive, `F(x)=${k}e^{${m}x}`), line(LABELS.step, `F(0)=${k}e^{0}`), line(LABELS.result, `${k}`)],
                wrong: 0, error, fix: `F(x)=\\frac{${k}}{${m}}e^{${m}x}\\ \\to\\ ${k / m}`, right: k / m, reached: k
            }
        }
        case 'barrow-order': {
            const a = randomInt(random, 1, 3)
            const b = a + randomInt(random, 1, 3)
            return {
                problem: say(`Kalkulatu $\\int_{${a}}^{${b}} 2x\\,dx$.`, `Calcula $\\int_{${a}}^{${b}} 2x\\,dx$.`, `احسب $\\int_{${a}}^{${b}} 2x\\,dx$.`, `Work out $\\int_{${a}}^{${b}} 2x\\,dx$.`),
                lines: [line(LABELS.primitive, 'F(x)=x^2'), line(LABELS.barrow, `F(${a})-F(${b})=${a * a}-${b * b}`), line(LABELS.result, `${a * a - b * b}`)],
                wrong: 1, error, fix: `F(${b})-F(${a})=${b * b - a * a}`, right: b * b - a * a, reached: a * a - b * b
            }
        }
        case 'inside-left': {
            const c = randomInt(random, 1, 3)
            // ∫₀¹ 2x(x² + c) dx = [(x² + c)²/2]₀¹ = ((1 + c)² − c²)/2
            const right = ((1 + c) ** 2 - c * c) / 2
            const reached = 2 * right
            return {
                problem: say(`Kalkulatu $\\int_0^1 2x(x^2+${c})\\,dx$.`, `Calcula $\\int_0^1 2x(x^2+${c})\\,dx$.`, `احسب $\\int_0^1 2x(x^2+${c})\\,dx$.`, `Work out $\\int_0^1 2x(x^2+${c})\\,dx$.`),
                lines: [line(LABELS.primitive, `F(x)=2x\\cdot\\frac{(x^2+${c})^2}{2}`), line(LABELS.barrow, `F(1)-F(0)=${(1 + c) ** 2}-0`), line(LABELS.result, `${reached}`)],
                wrong: 0, error, fix: `F(x)=\\frac{(x^2+${c})^2}{2}\\ \\to\\ \\frac{${(1 + c) ** 2}-${c * c}}{2}=${right}`, right, reached
            }
        }
        case 'width': {
            const b = pick(random, [4, 6, 8])
            const r = b / 2
            // ∫₀ᵇ x dx with 2 right rectangles: width b/2, heights r and b
            const right = r * (r + b)
            return {
                problem: say(`Hurbildu $\\int_0^{${b}} x\\,dx$ eskuineko altuera duten 2 laukizuzenekin.`, `Aproxima $\\int_0^{${b}} x\\,dx$ con 2 rectángulos de altura por la derecha.`, `قرّب $\\int_0^{${b}} x\\,dx$ بمستطيلين بارتفاع الطرف الأيمن.`, `Approximate $\\int_0^{${b}} x\\,dx$ with 2 rectangles of right-hand height.`),
                lines: [line(LABELS.step, `\\Delta x=${r}\\qquad ${r},\\ ${b}`), line(LABELS.step, `2\\cdot(${r}+${b})`), line(LABELS.result, `${2 * (r + b)}`)],
                wrong: 1, error, fix: `${r}\\cdot(${r}+${b})=${right}`, right, reached: 2 * (r + b)
            }
        }
        case 'intervals': {
            const p = randomInt(random, 3, 9)
            const q = randomInt(random, 1, 6)
            return {
                problem: say(`$\\int_0^2 f=${p}$ eta $\\int_2^5 f=${q}$. Kalkulatu $\\int_0^5 f$.`, `$\\int_0^2 f=${p}$ y $\\int_2^5 f=${q}$. Calcula $\\int_0^5 f$.`, `$\\int_0^2 f=${p}$ و$\\int_2^5 f=${q}$. احسب $\\int_0^5 f$.`, `$\\int_0^2 f=${p}$ and $\\int_2^5 f=${q}$. Work out $\\int_0^5 f$.`),
                lines: [line(LABELS.step, '[0,5]=[0,2]\\cup[2,5]'), line(LABELS.step, `${p}-${q}`), line(LABELS.result, `${p - q}`)],
                wrong: 1, error, fix: `${p}+${q}=${p + q}`, right: p + q, reached: p - q
            }
        }
        case 'negative-area': {
            const k = randomInt(random, 1, 3)
            // y = x² − k² on [−k, k]: ∫ = −4k³/3
            const value = (4 * k ** 3) / 3
            return {
                problem: say(`Kalkulatu $y=x^2-${k * k}$ kurbaren eta $X$ ardatzaren arteko azalera.`, `Calcula el área entre $y=x^2-${k * k}$ y el eje $X$.`, `احسب المساحة بين $y=x^2-${k * k}$ ومحور $X$.`, `Work out the area between $y=x^2-${k * k}$ and the $X$ axis.`),
                lines: [line(LABELS.step, `x=\\pm ${k}`), line(LABELS.barrow, `\\int_{-${k}}^{${k}}(x^2-${k * k})\\,dx=-\\frac{${4 * k ** 3}}{3}`), line(LABELS.result, `A=-\\frac{${4 * k ** 3}}{3}`)],
                wrong: 2, error, fix: `A=\\left|-\\frac{${4 * k ** 3}}{3}\\right|=\\frac{${4 * k ** 3}}{3}`, right: value, reached: -value
            }
        }
        case 'bottom-top': {
            const a = randomInt(random, 1, 3)
            // y = a x and y = x² meet at 0 and a: area a³/6
            const value = a ** 3 / 6
            return {
                problem: say(`Kalkulatu $y=${a === 1 ? '' : a}x$ eta $y=x^2$ kurben arteko azalera.`, `Calcula el área entre $y=${a === 1 ? '' : a}x$ e $y=x^2$.`, `احسب المساحة بين $y=${a === 1 ? '' : a}x$ و$y=x^2$.`, `Work out the area between $y=${a === 1 ? '' : a}x$ and $y=x^2$.`),
                lines: [line(LABELS.step, `x=0\\qquad x=${a}`), line(LABELS.step, `\\int_0^{${a}}(x^2-${a === 1 ? '' : a}x)\\,dx`), line(LABELS.result, `-\\frac{${a ** 3}}{6}`)],
                wrong: 1, error, fix: `\\int_0^{${a}}(${a === 1 ? '' : a}x-x^2)\\,dx=\\frac{${a ** 3}}{6}`, right: value, reached: -value
            }
        }
        case 'fixed-cost': {
            const b = randomInt(random, 2, 9)
            const K = randomInt(random, 1, 5) * 100
            const x = pick(random, [10, 20])
            return {
                problem: say(`$C'(x)=2x+${b}$ eta kostu finkoa ${K} euro. Kalkulatu $C(${x})$.`, `$C'(x)=2x+${b}$ y el coste fijo es ${K} €. Calcula $C(${x})$.`, `$C'(x)=2x+${b}$ والتكلفة الثابتة ${K} €. احسب $C(${x})$.`, `$C'(x)=2x+${b}$ and the fixed cost is €${K}. Work out $C(${x})$.`),
                lines: [line(LABELS.primitive, `C(x)=x^2+${b}x`), line(LABELS.step, `C(${x})=${x * x}+${b * x}`), line(LABELS.result, `${x * x + b * x}`)],
                wrong: 0, error, fix: `C(x)=x^2+${b}x+${K}\\ \\to\\ ${x * x + b * x + K}`, right: x * x + b * x + K, reached: x * x + b * x
            }
        }
        case 'rate-value': {
            const m = randomInt(random, 1, 3)
            const T = randomInt(random, 2, 5)
            // v(t) = 2m t, sold in [0, T] = m T²; the slip reads v(T) = 2mT
            return {
                problem: say(`Salmentak $v(t)=${2 * m}t$ mila dira hilean. Zenbat saltzen da lehen ${T} hilabeteetan?`, `Las ventas son $v(t)=${2 * m}t$ miles al mes. ¿Cuánto se vende en los ${T} primeros meses?`, `المبيعات $v(t)=${2 * m}t$ ألف في الشهر. كم يُباع في الأشهر الـ${T} الأولى؟`, `Sales are $v(t)=${2 * m}t$ thousand a month. How much is sold in the first ${T} months?`),
                lines: [line(LABELS.step, `t=${T}`), line(LABELS.step, `v(${T})=${2 * m * T}`), line(LABELS.result, `${2 * m * T}`)],
                wrong: 1, error, fix: `\\int_0^{${T}}${2 * m}t\\,dt=${m * T * T}`, right: m * T * T, reached: 2 * m * T
            }
        }
    }
}

export const bach2gIntegralsDetectiveNames: Record<Bach2gIntegralsDetectiveError, LocalizedText> = {
    'no-divide': say('Berretzailea igo du baina ez du zatitu', 'Subió el exponente pero no dividió', 'رفع الأس لكنه لم يقسم', 'Raised the exponent but did not divide'),
    derivative: say('Deribatu egin du, integratu beharrean', 'Derivó en lugar de integrar', 'اشتق بدل أن يكامل', 'Differentiated instead of integrating'),
    'copied-c': say('$C$ kopiatu du, ebatzi gabe', 'Copió la $C$ sin despejarla', 'نسخ $C$ دون استخراجها', 'Copied $C$ without solving for it'),
    'exp-k': say('$e^{kx}$ integratzean $\\frac{1}{k}$ ahaztu du', 'Olvidó el $\\frac{1}{k}$ al integrar $e^{kx}$', 'نسي $\\frac{1}{k}$ عند تكامل $e^{kx}$', 'Forgot the $\\frac{1}{k}$ when integrating $e^{kx}$'),
    'barrow-order': say('Barrow alderantziz egin du', 'Hizo Barrow al revés', 'طبّق بارو بالعكس', "Did Barrow's rule the wrong way round"),
    'inside-left': say('Barrukoaren deribatua utzi du jatorrizkoan', 'Dejó la derivada de dentro en la primitiva', 'ترك مشتقة الداخل في الدالة الأصلية', 'Left the inside derivative in the antiderivative'),
    width: say('Laukizuzenen zabalera gaizki hartu du', 'Tomó mal la anchura de los rectángulos', 'أخطأ في عرض المستطيلات', 'Took the width of the rectangles wrong'),
    intervals: say('Tarteak kendu ditu, batu beharrean', 'Restó los intervalos en lugar de sumarlos', 'طرح الفترتين بدل جمعهما', 'Subtracted the intervals instead of adding them'),
    'negative-area': say('Azalera negatiboa eman du', 'Dio un área negativa', 'أعطى مساحة سالبة', 'Gave a negative area'),
    'bottom-top': say('Behekoa ken goikoa egin du', 'Restó la de abajo menos la de arriba', 'طرح الأدنى ناقص الأعلى', 'Did bottom minus top'),
    'fixed-cost': say('Kostu finkoa ahaztu du', 'Olvidó el coste fijo', 'نسي التكلفة الثابتة', 'Forgot the fixed cost'),
    'rate-value': say('Erritmoa irakurri du, pilatutakoa kalkulatu beharrean', 'Leyó el ritmo en vez de calcular lo acumulado', 'قرأ الوتيرة بدل حساب المتراكم', 'Read the rate instead of working out what piles up')
}

export const bach2gIntegralsDetectiveTips: Record<Bach2gIntegralsDetectiveError, LocalizedText> = {
    'no-divide': say('$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}$.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}$.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}$.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}$.'),
    derivative: say('Integratzean berretzailea igo egiten da.', 'Al integrar, el exponente sube.', 'عند التكامل يزيد الأس.', 'Integrating raises the exponent.'),
    'copied-c': say('Ordezkatu puntua eta ebatzi $C$.', 'Sustituye el punto y despeja $C$.', 'عوّض النقطة واستخرج $C$.', 'Substitute the point and solve for $C$.'),
    'exp-k': say('$\\int e^{kx}\\,dx=\\frac{1}{k}e^{kx}$.', '$\\int e^{kx}\\,dx=\\frac{1}{k}e^{kx}$.', '$\\int e^{kx}\\,dx=\\frac{1}{k}e^{kx}$.', '$\\int e^{kx}\\,dx=\\frac{1}{k}e^{kx}$.'),
    'barrow-order': say('$F(b)-F(a)$: goikoa ken behekoa.', '$F(b)-F(a)$: arriba menos abajo.', '$F(b)-F(a)$: العلوي ناقص السفلي.', '$F(b)-F(a)$: top minus bottom.'),
    'inside-left': say("$\\int u'u^n=\\frac{u^{n+1}}{n+1}$: $u'$ desagertzen da.", "$\\int u'u^n=\\frac{u^{n+1}}{n+1}$: $u'$ desaparece.", "$\\int u'u^n=\\frac{u^{n+1}}{n+1}$: تختفي $u'$.", "$\\int u'u^n=\\frac{u^{n+1}}{n+1}$: $u'$ disappears."),
    width: say('Zabalera: tartearen luzera zati laukizuzenen kopurua.', 'Anchura: longitud del intervalo entre el número de rectángulos.', 'العرض: طول الفترة على عدد المستطيلات.', 'Width: the length of the interval over the number of rectangles.'),
    intervals: say('$\\int_a^b f=\\int_a^c f+\\int_c^b f$.', '$\\int_a^b f=\\int_a^c f+\\int_c^b f$.', '$\\int_a^b f=\\int_a^c f+\\int_c^b f$.', '$\\int_a^b f=\\int_a^c f+\\int_c^b f$.'),
    'negative-area': say('Azalera beti positiboa da: balio absolutua.', 'Un área siempre es positiva: valor absoluto.', 'المساحة موجبة دائمًا: القيمة المطلقة.', 'An area is always positive: absolute value.'),
    'bottom-top': say('Goikoa ken behekoa.', 'La de arriba menos la de abajo.', 'الأعلى ناقص الأدنى.', 'Top minus bottom.'),
    'fixed-cost': say('$C(0)$ kostu finkoa da.', '$C(0)$ es el coste fijo.', '$C(0)$ هي التكلفة الثابتة.', '$C(0)$ is the fixed cost.'),
    'rate-value': say('Pilatutakoa: erritmoaren integrala.', 'Lo acumulado: la integral del ritmo.', 'المتراكم: تكامل الوتيرة.', 'What piles up: the integral of the rate.')
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBach2gIntegralsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bach2gIntegralsDetectiveLevels[levelIndex], BACH2G_INTEGRALS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH2G_INTEGRALS_DETECTIVE_ERRORS = bach2gIntegralsDetectiveLevels.flat()
