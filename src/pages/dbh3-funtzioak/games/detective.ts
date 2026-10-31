import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { lin, quad } from '../content.ts'

/* ==========================================================================
   Funtzioen detektibea (3. DBH): a worked solution of three lines where
   exactly one line has a mistake, and the lines after it carry it on. The
   learner taps the wrong line and says which mistake it is, among three.
   Level 1: graphs and their features (−3² for (−3)², x = 0 to meet the
   X axis, the x of the maximum given as its value, a lost sign when
   substituting); level 2: lines (the slope upside down, the points in a
   different order above and below, n taken as the y of any point, a term
   moved without changing its sign); level 3: parabolas (b/2a without the
   minus, −b/a without the 2, the sign of c lost in the discriminant,
   −p² for (−p)² in the vertex). Every case carries the right number and
   the number reached.
   ========================================================================== */

export type DetectiveError =
    | 'negative-square'
    | 'axis-swap'
    | 'max-as-x'
    | 'substitute-sign'
    | 'slope-upside-down'
    | 'slope-order'
    | 'n-as-y'
    | 'cross-sign'
    | 'vertex-sign'
    | 'vertex-no-2'
    | 'discriminant-sign'
    | 'vertex-square'

export interface DetectiveLine {
    label: LocalizedText
    latex: string
}

export interface DetectiveCase {
    problem: LocalizedText
    lines: DetectiveLine[]
    wrong: number
    error: DetectiveError
    fix: string
    options: DetectiveError[]
    right: number
    reached: number
}

export const detectiveLevels: DetectiveError[][] = [
    ['negative-square', 'axis-swap', 'max-as-x', 'substitute-sign'],
    ['slope-upside-down', 'slope-order', 'n-as-y', 'cross-sign'],
    ['vertex-sign', 'vertex-no-2', 'discriminant-sign', 'vertex-square']
]

export const DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): DetectiveLine => ({ label, latex })
const LABELS = {
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const par = (value: number) => (value < 0 ? `(${value})` : String(value))

export const detectiveErrorNames: Record<DetectiveError, LocalizedText> = {
    'negative-square': say('$(-3)^{2}$ beharrean $-3^{2}$ egin du', 'Hizo $-3^{2}$ en vez de $(-3)^{2}$', 'حسب $-3^{2}$ بدل $(-3)^{2}$', 'Did $-3^{2}$ instead of $(-3)^{2}$'),
    'axis-swap': say('X ardatza mozteko $x=0$ ordezkatu du', 'Para cortar el eje X sustituyó $x=0$', 'لقطع محور X عوّض $x=0$', 'Substituted $x=0$ to meet the X axis'),
    'max-as-x': say('Maximoaren $x$ eman du, haren balioa beharrean', 'Dio la $x$ del máximo en vez de su valor', 'أعطى $x$ للعظمى بدل قيمتها', 'Gave the $x$ of the maximum instead of its value'),
    'substitute-sign': say('Ordezkatzean zeinu bat galdu du', 'Perdió un signo al sustituir', 'أضاع إشارة عند التعويض', 'Lost a sign when substituting'),
    'slope-upside-down': say('Malda alderantziz: $x$ zati $y$', 'La pendiente al revés: $x$ entre $y$', 'الميل بالعكس: $x$ على $y$', 'The slope upside down: $x$ over $y$'),
    'slope-order': say('Puntuen ordena aldatu du goian eta behean', 'Cambió el orden de los puntos arriba y abajo', 'غيّر ترتيب النقطتين في الأعلى والأسفل', 'Used a different order of the points above and below'),
    'n-as-y': say('$n$ puntuaren $y$ dela pentsatu du', 'Creyó que $n$ es la $y$ del punto', 'ظنّ أن $n$ هو $y$ للنقطة', 'Took $n$ to be the $y$ of the point'),
    'cross-sign': say('Gai bat aldatu du zeinua aldatu gabe', 'Pasó un término sin cambiarle el signo', 'نقل حدًّا دون تغيير إشارته', 'Moved a term across without changing its sign'),
    'vertex-sign': say('$\\frac{b}{2a}$ egin du, $\\frac{-b}{2a}$ beharrean', 'Hizo $\\frac{b}{2a}$ en vez de $\\frac{-b}{2a}$', 'حسب $\\frac{b}{2a}$ بدل $\\frac{-b}{2a}$', 'Did $\\frac{b}{2a}$ instead of $\\frac{-b}{2a}$'),
    'vertex-no-2': say('$\\frac{-b}{a}$ egin du, 2 gabe', 'Hizo $\\frac{-b}{a}$, sin el 2', 'حسب $\\frac{-b}{a}$ دون $2$', 'Did $\\frac{-b}{a}$, without the 2'),
    'discriminant-sign': say('$-4ac$ gaian $c$ zenbakiaren zeinua galdu du', 'En $-4ac$ perdió el signo de $c$', 'أضاع إشارة $c$ في $-4ac$', 'Lost the sign of $c$ in $-4ac$'),
    'vertex-square': say('Erpinean $(-p)^{2}$ negatibo egin du', 'En el vértice hizo negativo $(-p)^{2}$', 'جعل $(-p)^{2}$ سالبًا عند الرأس', 'Made $(-p)^{2}$ negative at the vertex')
}

export const detectiveErrorTips: Record<DetectiveError, LocalizedText> = {
    'negative-square': say('Negatiboa parentesi artean karratura: $(-3)^{2}=9$.', 'El negativo entre paréntesis al cuadrado: $(-3)^{2}=9$.', 'السالب بين قوسين ثم التربيع: $(-3)^{2}=9$.', 'Square the negative in brackets: $(-3)^{2}=9$.'),
    'axis-swap': say('X ardatzean $y=0$ da: ebatzi $f(x)=0$.', 'En el eje X es $y=0$: resuelve $f(x)=0$.', 'على محور X يكون $y=0$: حلّ $f(x)=0$.', 'On the X axis $y=0$: solve $f(x)=0$.'),
    'max-as-x': say('Maximoaren balioa $y$ da; $x$ non dagoen esaten du.', 'El valor del máximo es la $y$; la $x$ dice dónde está.', 'قيمة العظمى هي $y$؛ و$x$ يقول أين تقع.', 'The value of the maximum is its $y$; the $x$ says where it is.'),
    'substitute-sign': say('Ordezkatu negatiboak parentesi artean.', 'Sustituye los negativos entre paréntesis.', 'عوّض السالبة بين قوسين.', 'Substitute negative numbers in brackets.'),
    'slope-upside-down': same('m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}'),
    'slope-order': say('Ordena bera goian eta behean: $\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.', 'El mismo orden arriba y abajo: $\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.', 'الترتيب نفسه في الأعلى والأسفل: $\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.', 'The same order above and below: $\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.'),
    'n-as-y': say('Ordezkatu puntua: $y_{0}=mx_{0}+n$ eta bakandu $n$.', 'Sustituye el punto: $y_{0}=mx_{0}+n$ y despeja $n$.', 'عوّض النقطة: $y_{0}=mx_{0}+n$ واعزل $n$.', 'Substitute the point: $y_{0}=mx_{0}+n$ and isolate $n$.'),
    'cross-sign': say('Gai bat beste aldera pasatzean, zeinua aldatzen da.', 'Al pasar un término al otro lado, cambia de signo.', 'عند نقل حدّ إلى الطرف الآخر تتغيّر إشارته.', 'A term that moves to the other side changes its sign.'),
    'vertex-sign': same('x_{v}=\\frac{-b}{2a}'),
    'vertex-no-2': same('x_{v}=\\frac{-b}{2a}'),
    'discriminant-sign': say('$c$ negatiboa bada, $-4ac$ positiboa da.', 'Si $c$ es negativo, $-4ac$ es positivo.', 'إذا كان $c$ سالبًا فإن $-4ac$ موجب.', 'If $c$ is negative, $-4ac$ is positive.'),
    'vertex-square': say('$(-p)^{2}=p^{2}$, beti positiboa.', '$(-p)^{2}=p^{2}$, siempre positivo.', '$(-p)^{2}=p^{2}$ موجب دائمًا.', '$(-p)^{2}=p^{2}$, always positive.')
}

function same(latex: string): LocalizedText {
    return say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
}

type Built = Omit<DetectiveCase, 'options'>
type Builder = (random: Random) => Built | null

const valueAt = (fx: string, x: number) => say(`$f(x)=${fx}$. Zenbat da $f(${x})$?`, `$f(x)=${fx}$. ¿Cuánto vale $f(${x})$?`, `$f(x)=${fx}$. كم يساوي $f(${x})$؟`, `$f(x)=${fx}$. What is $f(${x})$?`)

/* ---------- Level 1: graphs and features ---------- */

function negativeSquare(random: Random): Built {
    const k = randomInt(random, 2, 5)
    const b = randomInt(random, 1, 4)
    const square = k * k
    return {
        problem: valueAt(quad(1, b, 0), -k),
        lines: [line(LABELS.rule, `f(${-k})=(${-k})^{2}+${b}\\cdot(${-k})`), line(LABELS.step, `-${square}-${b * k}`), line(LABELS.result, `${-square - b * k}`)],
        wrong: 1, error: 'negative-square', fix: `(${-k})^{2}-${b * k}=${square}-${b * k}=${square - b * k}`, right: square - b * k, reached: -square - b * k
    }
}

function axisSwap(random: Random): Built {
    const m = pick(random, [2, 3, 4])
    const root = pick(random, [-3, -2, -1, 1, 2, 3])
    const n = -m * root
    return {
        problem: say(`Zein da $y=${lin(m, n)}$ zuzenak X ardatza mozten duen puntuaren $x$?`, `¿Cuál es la $x$ del punto donde $y=${lin(m, n)}$ corta al eje X?`, `ما $x$ للنقطة التي يقطع فيها $y=${lin(m, n)}$ محور X؟`, `What is the $x$ of the point where $y=${lin(m, n)}$ meets the X axis?`),
        lines: [line(LABELS.rule, 'x=0'), line(LABELS.step, `y=${m}\\cdot 0${n > 0 ? '+' : ''}${n}`), line(LABELS.result, `${n}`)],
        wrong: 0, error: 'axis-swap', fix: `${lin(m, n)}=0\\ \\to\\ x=${root}`, right: root, reached: n
    }
}

function maxAsX(random: Random): Built | null {
    const ys = Array.from({ length: 5 }, () => randomInt(random, -3, 9))
    const top = Math.max(...ys)
    const at = ys.indexOf(top)
    if (ys.filter((y) => y === top).length > 1 || at === top) return null
    const table = ys.join(',')
    return {
        problem: say(`Taula: $x=0,1,2,3,4$ eta $y=${table}$. Zein da maximoaren balioa?`, `Tabla: $x=0,1,2,3,4$ e $y=${table}$. ¿Cuál es el valor del máximo?`, `الجدول: $x=0,1,2,3,4$ و$y=${table}$. ما قيمة العظمى؟`, `Table: $x=0,1,2,3,4$ and $y=${table}$. What is the value of the maximum?`),
        lines: [line(LABELS.rule, `y_{max}=${top}`), line(LABELS.step, `x=${at}`), line(LABELS.result, `${at}`)],
        wrong: 1, error: 'max-as-x', fix: `(${at},${top})\\ \\to\\ ${top}`, right: top, reached: at
    }
}

function substituteSign(random: Random): Built {
    const m = randomInt(random, 2, 5)
    const n = randomInt(random, -4, 4)
    const x = -randomInt(random, 1, 4)
    return {
        problem: valueAt(lin(m, n), x),
        lines: [line(LABELS.rule, `f(${x})=${m}\\cdot(${x})${n === 0 ? '' : n > 0 ? `+${n}` : n}`), line(LABELS.step, `${-m * x}${n === 0 ? '' : n > 0 ? `+${n}` : n}`), line(LABELS.result, `${-m * x + n}`)],
        wrong: 1, error: 'substitute-sign', fix: `${m}\\cdot(${x})=${m * x}\\ \\to\\ ${m * x + n}`, right: m * x + n, reached: -m * x + n
    }
}

/* ---------- Level 2: lines ---------- */

function slopePoints(random: Random) {
    const x1 = randomInt(random, -3, 2)
    const x2 = x1 + pick(random, [1, 2])
    const m = pick(random, [-4, -3, -2, 2, 3, 4])
    const y1 = randomInt(random, -3, 3)
    return { x1, y1, x2, y2: y1 + m * (x2 - x1), m }
}

const slopeProblem = (x1: number, y1: number, x2: number, y2: number) => say(`$A=(${x1},${y1})$ eta $B=(${x2},${y2})$. Zein da malda?`, `$A=(${x1},${y1})$ y $B=(${x2},${y2})$. ¿Cuál es la pendiente?`, `$A=(${x1},${y1})$ و$B=(${x2},${y2})$. ما الميل؟`, `$A=(${x1},${y1})$ and $B=(${x2},${y2})$. What is the slope?`)

function slopeUpsideDown(random: Random): Built {
    const { x1, y1, x2, y2, m } = slopePoints(random)
    const reached = (x2 - x1) / (y2 - y1)
    return {
        problem: slopeProblem(x1, y1, x2, y2),
        lines: [line(LABELS.rule, 'm=\\frac{x_{2}-x_{1}}{y_{2}-y_{1}}'), line(LABELS.step, `\\frac{${x2}-${par(x1)}}{${y2}-${par(y1)}}`), line(LABELS.result, `m=${reached < 0 ? '-' : ''}\\frac{${Math.abs(x2 - x1)}}{${Math.abs(y2 - y1)}}`)],
        wrong: 0, error: 'slope-upside-down', fix: `\\frac{${y2}-${par(y1)}}{${x2}-${par(x1)}}=${m}`, right: m, reached
    }
}

function slopeOrder(random: Random): Built {
    const { x1, y1, x2, y2, m } = slopePoints(random)
    return {
        problem: slopeProblem(x1, y1, x2, y2),
        lines: [line(LABELS.rule, 'm=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}'), line(LABELS.step, `\\frac{${y2}-${par(y1)}}{${x1}-${par(x2)}}`), line(LABELS.result, `m=${-m}`)],
        wrong: 1, error: 'slope-order', fix: `\\frac{${y2}-${par(y1)}}{${x2}-${par(x1)}}=${m}`, right: m, reached: -m
    }
}

function nAsY(random: Random): Built | null {
    const m = pick(random, [-3, -2, 2, 3])
    const x0 = randomInt(random, 1, 4)
    const y0 = randomInt(random, -5, 9)
    if (y0 === 0) return null
    const n = y0 - m * x0
    return {
        problem: say(`Zuzen batek $m=${m}$ malda du eta $(${x0},${y0})$ puntutik igarotzen da. Zenbat da $n$?`, `Una recta tiene pendiente $m=${m}$ y pasa por $(${x0},${y0})$. ¿Cuánto vale $n$?`, `مستقيم ميله $m=${m}$ ويمر بـ$(${x0},${y0})$. كم يساوي $n$؟`, `A line has slope $m=${m}$ and goes through $(${x0},${y0})$. What is $n$?`),
        lines: [line(LABELS.rule, 'y=mx+n'), line(LABELS.step, `n=${y0}`), line(LABELS.result, `y=${lin(m, y0)}`)],
        wrong: 1, error: 'n-as-y', fix: `${y0}=${m}\\cdot ${x0}+n\\ \\to\\ n=${n}`, right: n, reached: y0
    }
}

function crossSign(random: Random): Built | null {
    const m1 = randomInt(random, 2, 5)
    const m2 = randomInt(random, -2, 1)
    const x = randomInt(random, -3, 4)
    const n1 = randomInt(random, -6, 6)
    const n2 = (m1 - m2) * x + n1
    const reached = (n2 + n1) / (m1 - m2)
    if (n1 === 0 || !Number.isInteger(reached) || m2 === 0) return null
    return {
        problem: say(`Non ebakitzen dira $y=${lin(m1, n1)}$ eta $y=${lin(m2, n2)}$? Eman $x$.`, `¿Dónde se cortan $y=${lin(m1, n1)}$ e $y=${lin(m2, n2)}$? Da la $x$.`, `أين يتقاطع $y=${lin(m1, n1)}$ و$y=${lin(m2, n2)}$؟ أعطِ $x$.`, `Where do $y=${lin(m1, n1)}$ and $y=${lin(m2, n2)}$ cross? Give $x$.`),
        lines: [line(LABELS.rule, `${lin(m1, n1)}=${lin(m2, n2)}`), line(LABELS.step, `${lin(m1 - m2, 0)}=${n2}+${par(n1)}`), line(LABELS.result, `x=${reached}`)],
        wrong: 1, error: 'cross-sign', fix: `${lin(m1 - m2, 0)}=${n2}-${par(n1)}\\ \\to\\ x=${x}`, right: x, reached
    }
}

/* ---------- Level 3: parabolas ---------- */

function vertexPoints(random: Random) {
    const a = pick(random, [1, 2, -1])
    const p = pick(random, [-3, -2, -1, 1, 2, 3])
    const c = randomInt(random, -5, 5)
    return { a, b: -2 * a * p, c, p }
}

const vertexProblem = (a: number, b: number, c: number) => say(`Zein da $y=${quad(a, b, c)}$ parabolaren erpinaren $x$?`, `¿Cuál es la $x$ del vértice de $y=${quad(a, b, c)}$?`, `ما $x$ لرأس $y=${quad(a, b, c)}$؟`, `What is the $x$ of the vertex of $y=${quad(a, b, c)}$?`)

function vertexSign(random: Random): Built {
    const { a, b, c, p } = vertexPoints(random)
    return {
        problem: vertexProblem(a, b, c),
        lines: [line(LABELS.rule, 'x_{v}=\\frac{b}{2a}'), line(LABELS.step, `\\frac{${b}}{${2 * a}}`), line(LABELS.result, `x_{v}=${-p}`)],
        wrong: 0, error: 'vertex-sign', fix: `x_{v}=\\frac{${-b}}{${2 * a}}=${p}`, right: p, reached: -p
    }
}

function vertexNoTwo(random: Random): Built {
    const { a, b, c, p } = vertexPoints(random)
    return {
        problem: vertexProblem(a, b, c),
        lines: [line(LABELS.rule, 'x_{v}=\\frac{-b}{a}'), line(LABELS.step, `\\frac{${-b}}{${a}}`), line(LABELS.result, `x_{v}=${2 * p}`)],
        wrong: 0, error: 'vertex-no-2', fix: `x_{v}=\\frac{${-b}}{${2 * a}}=${p}`, right: p, reached: 2 * p
    }
}

function discriminantSign(random: Random): Built {
    const b = randomInt(random, -5, 5)
    const k = randomInt(random, 1, 6)
    const right = b * b + 4 * k
    return {
        problem: say(`Kalkulatu $x^{2}${b === 0 ? '' : `${b > 0 ? '+' : ''}${b}x`}-${k}=0$ ekuazioaren $\\Delta$.`, `Calcula el $\\Delta$ de $x^{2}${b === 0 ? '' : `${b > 0 ? '+' : ''}${b}x`}-${k}=0$.`, `احسب $\\Delta$ لـ$x^{2}${b === 0 ? '' : `${b > 0 ? '+' : ''}${b}x`}-${k}=0$.`, `Work out $\\Delta$ for $x^{2}${b === 0 ? '' : `${b > 0 ? '+' : ''}${b}x`}-${k}=0$.`),
        lines: [line(LABELS.rule, '\\Delta=b^{2}-4ac'), line(LABELS.step, `${par(b)}^{2}-4\\cdot 1\\cdot ${k}`), line(LABELS.result, `\\Delta=${b * b - 4 * k}`)],
        wrong: 1, error: 'discriminant-sign', fix: `${par(b)}^{2}-4\\cdot 1\\cdot(-${k})=${right}`, right, reached: b * b - 4 * k
    }
}

function vertexSquare(random: Random): Built {
    const p = randomInt(random, 1, 4)
    const c = randomInt(random, -3, 6)
    // y = x² + 2px + c has its vertex at x = −p
    const right = p * p - 2 * p * p + c
    const reached = -p * p - 2 * p * p + c
    return {
        problem: say(`Zein da $y=${quad(1, 2 * p, c)}$ parabolaren erpinaren $y$? ($x_{v}=${-p}$)`, `¿Cuál es la $y$ del vértice de $y=${quad(1, 2 * p, c)}$? ($x_{v}=${-p}$)`, `ما $y$ لرأس $y=${quad(1, 2 * p, c)}$؟ ($x_{v}=${-p}$)`, `What is the $y$ of the vertex of $y=${quad(1, 2 * p, c)}$? ($x_{v}=${-p}$)`),
        lines: [line(LABELS.rule, `y_{v}=(${-p})^{2}+${2 * p}\\cdot(${-p})${c === 0 ? '' : c > 0 ? `+${c}` : c}`), line(LABELS.step, `-${p * p}-${2 * p * p}${c === 0 ? '' : c > 0 ? `+${c}` : c}`), line(LABELS.result, `y_{v}=${reached}`)],
        wrong: 1, error: 'vertex-square', fix: `${p * p}-${2 * p * p}${c === 0 ? '' : c > 0 ? `+${c}` : c}=${right}`, right, reached
    }
}

const builders: Record<DetectiveError, Builder> = {
    'negative-square': negativeSquare,
    'axis-swap': axisSwap,
    'max-as-x': maxAsX,
    'substitute-sign': substituteSign,
    'slope-upside-down': slopeUpsideDown,
    'slope-order': slopeOrder,
    'n-as-y': nAsY,
    'cross-sign': crossSign,
    'vertex-sign': vertexSign,
    'vertex-no-2': vertexNoTwo,
    'discriminant-sign': discriminantSign,
    'vertex-square': vertexSquare
}

export function createDetectiveCase(random: Random, levelIndex: number, error: DetectiveError): DetectiveCase {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    for (let attempt = 0; attempt < 500; attempt += 1) {
        const made = builders[error](random)
        if (!made || made.right === made.reached) continue
        const others = shuffle(random, pool.filter((item) => item !== error)).slice(0, 2)
        return { ...made, options: shuffle(random, [error, ...others]) }
    }
    throw new Error(`No detective case for ${error}`)
}

export function createDetectiveCases(random: Random, levelIndex: number): DetectiveCase[] {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    const order = shuffle(random, pool)
    const errors = Array.from({ length: DETECTIVE_CASES }, (_, index) => order[index % order.length])
    return shuffle(random, errors).map((error) => createDetectiveCase(random, levelIndex, error))
}

export function detectiveStars(score: number): Stars {
    if (score >= 11) return 3
    if (score >= 9) return 2
    if (score >= 6) return 1
    return 0
}

