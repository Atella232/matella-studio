import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../features/unit-v2/games/workedDetective.ts'
import { fraction, toLatex } from '../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Bektoreen detektibea (4. DBH academic vectors and lines): a worked
   solution of three lines with one wrong line. Level 1: vectors (A − B,
   the midpoint as half the difference, the modulus without the root, a
   number times only one coordinate); level 2: lines (the slope upside
   down, the normal vector taken as the direction, the sign of the point in
   y − y₀ = m(x − x₀), the perpendicular slope without the minus); level 3:
   parallel lines with the proportion upside down, the radius of a circle
   without the root, a distance as the sum of the differences. A point or
   a vector is coded as x·1000 + y (`pointCode`).
   ========================================================================== */

export type VectorsDetectiveError =
    | 'vector-reversed'
    | 'midpoint-difference'
    | 'modulus-no-root'
    | 'scalar-one-coordinate'
    | 'slope-inverted'
    | 'normal-as-direction'
    | 'point-slope-sign'
    | 'perpendicular-no-minus'
    | 'parallel-proportion'
    | 'circle-radius'
    | 'distance-sum'

export const vectorsDetectiveLevels: VectorsDetectiveError[][] = [
    ['vector-reversed', 'midpoint-difference', 'modulus-no-root', 'scalar-one-coordinate'],
    ['slope-inverted', 'normal-as-direction', 'point-slope-sign', 'perpendicular-no-minus'],
    ['parallel-proportion', 'circle-radius', 'distance-sum']
]

export const VECTORS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    direction: say('Norabide-bektorea', 'Vector director', 'متجه الاتجاه', 'Direction vector'),
    slope: say('Malda', 'Pendiente', 'الميل', 'Slope'),
    line: say('Zuzena', 'Recta', 'المستقيم', 'Line'),
    intercept: say('Jatorriko ordenatua', 'Ordenada en el origen', 'الجزء المقطوع', 'y-intercept'),
    proportion: say('Proportzioa', 'Proporción', 'التناسب', 'Proportion'),
    centre: say('Zentroa', 'Centro', 'المركز', 'Centre'),
    radius: say('Erradioa', 'Radio', 'نصف القطر', 'Radius'),
    differences: say('Kendurak', 'Diferencias', 'الفروق', 'Differences')
}

export const vectorsDetectiveNames: Record<VectorsDetectiveError, LocalizedText> = {
    'vector-reversed': say('Jatorria ken muturra egin du', 'Restó origen menos extremo', 'طرح البداية ناقص النهاية', 'Did start minus end'),
    'midpoint-difference': say('Kendura erdibitu du, batura beharrean', 'Hizo la mitad de la resta en vez de la suma', 'أخذ نصف الفرق بدل نصف المجموع', 'Halved the difference instead of the sum'),
    'modulus-no-root': say('Moduluan erro karratua ahaztu du', 'Olvidó la raíz cuadrada en el módulo', 'نسي الجذر التربيعي في الطول', 'Forgot the square root in the length'),
    'scalar-one-coordinate': say('Zenbakiaz koordenatu bat bakarrik biderkatu du', 'Multiplicó por el número solo una coordenada', 'ضرب العدد في إحداثية واحدة فقط', 'Multiplied only one coordinate by the number'),
    'slope-inverted': say('Malda alderantziz egin du: x-en aldea zati y-ena', 'Hizo la pendiente al revés: diferencia de x entre la de y', 'حسب الميل مقلوبًا: فرق x على فرق y', 'Did the slope upside down: change in x over change in y'),
    'normal-as-direction': say('Bektore normala norabide-bektoretzat hartu du', 'Tomó el vector normal como vector director', 'اعتبر المتجه الناظم متجهَ الاتجاه', 'Took the normal vector as the direction vector'),
    'point-slope-sign': say('Puntuaren zeinua gaizki jarri du', 'Puso mal el signo del punto', 'أخطأ في إشارة النقطة', 'Got the sign of the point wrong'),
    'perpendicular-no-minus': say('Malda perpendikularrean minus zeinua ahaztu du', 'Olvidó el signo menos en la pendiente perpendicular', 'نسي إشارة الناقص في الميل العمودي', 'Forgot the minus in the perpendicular slope'),
    'parallel-proportion': say('Proportzioa alderantziz idatzi du', 'Escribió la proporción al revés', 'كتب التناسب مقلوبًا', 'Wrote the proportion upside down'),
    'circle-radius': say('Erradioa $r^{2}$ dela pentsatu du', 'Pensó que el radio es $r^{2}$', 'ظن أن نصف القطر هو $r^{2}$', 'Thought the radius is $r^{2}$'),
    'distance-sum': say('Distantzia kenduren batura dela pentsatu du', 'Pensó que la distancia es la suma de las diferencias', 'ظن أن المسافة مجموع الفروق', 'Thought the distance is the sum of the differences')
}

export const vectorsDetectiveTips: Record<VectorsDetectiveError, LocalizedText> = {
    'vector-reversed': say('$\\overrightarrow{AB}=B-A$: muturra ken jatorria.', '$\\overrightarrow{AB}=B-A$: extremo menos origen.', '$\\overrightarrow{AB}=B-A$: النهاية ناقص البداية.', '$\\overrightarrow{AB}=B-A$: end minus start.'),
    'midpoint-difference': say('$M=\\left(\\frac{x_{1}+x_{2}}{2},\\frac{y_{1}+y_{2}}{2}\\right)$.', '$M=\\left(\\frac{x_{1}+x_{2}}{2},\\frac{y_{1}+y_{2}}{2}\\right)$.', '$M=\\left(\\frac{x_{1}+x_{2}}{2},\\frac{y_{1}+y_{2}}{2}\\right)$.', '$M=\\left(\\frac{x_{1}+x_{2}}{2},\\frac{y_{1}+y_{2}}{2}\\right)$.'),
    'modulus-no-root': say('$|\\vec{v}|=\\sqrt{x^{2}+y^{2}}$.', '$|\\vec{v}|=\\sqrt{x^{2}+y^{2}}$.', '$|\\vec{v}|=\\sqrt{x^{2}+y^{2}}$.', '$|\\vec{v}|=\\sqrt{x^{2}+y^{2}}$.'),
    'scalar-one-coordinate': say('$k\\cdot(x,y)=(kx,ky)$: bi koordenatuak.', '$k\\cdot(x,y)=(kx,ky)$: las dos coordenadas.', '$k\\cdot(x,y)=(kx,ky)$: الإحداثيتان معًا.', '$k\\cdot(x,y)=(kx,ky)$: both coordinates.'),
    'slope-inverted': say('$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.', '$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.', '$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.', '$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$.'),
    'normal-as-direction': say('$ax+by+c=0$: norabidea $(-b,a)$, malda $-\\frac{a}{b}$.', '$ax+by+c=0$: dirección $(-b,a)$, pendiente $-\\frac{a}{b}$.', '$ax+by+c=0$: الاتجاه $(-b,a)$ والميل $-\\frac{a}{b}$.', '$ax+by+c=0$: direction $(-b,a)$, slope $-\\frac{a}{b}$.'),
    'point-slope-sign': say('$y-y_{0}=m(x-x_{0})$: puntuaren koordenatuak kenduz.', '$y-y_{0}=m(x-x_{0})$: las coordenadas del punto, restando.', '$y-y_{0}=m(x-x_{0})$: إحداثيات النقطة مطروحة.', '$y-y_{0}=m(x-x_{0})$: the point\'s coordinates are subtracted.'),
    'perpendicular-no-minus': say('Perpendikularrak: $m\\cdot m\'=-1$.', 'Perpendiculares: $m\\cdot m\'=-1$.', 'متعامدان: $m\\cdot m\'=-1$.', 'Perpendicular: $m\\cdot m\'=-1$.'),
    'parallel-proportion': say('x-en koefizienteak elkarrekin eta y-renak elkarrekin: $\\frac{k}{a}=\\frac{b\'}{b}$.', 'Los de x entre sí y los de y entre sí: $\\frac{k}{a}=\\frac{b\'}{b}$.', 'معاملا x معًا ومعاملا y معًا: $\\frac{k}{a}=\\frac{b\'}{b}$.', 'The x coefficients together and the y ones together: $\\frac{k}{a}=\\frac{b\'}{b}$.'),
    'circle-radius': say('$(x-a)^{2}+(y-b)^{2}=r^{2}$: erradioa eskuineko atalaren erroa da.', '$(x-a)^{2}+(y-b)^{2}=r^{2}$: el radio es la raíz del segundo miembro.', '$(x-a)^{2}+(y-b)^{2}=r^{2}$: نصف القطر جذر الطرف الثاني.', '$(x-a)^{2}+(y-b)^{2}=r^{2}$: the radius is the root of the right-hand side.'),
    'distance-sum': say('$d(A,B)=\\sqrt{(x_{2}-x_{1})^{2}+(y_{2}-y_{1})^{2}}$.', '$d(A,B)=\\sqrt{(x_{2}-x_{1})^{2}+(y_{2}-y_{1})^{2}}$.', '$d(A,B)=\\sqrt{(x_{2}-x_{1})^{2}+(y_{2}-y_{1})^{2}}$.', '$d(A,B)=\\sqrt{(x_{2}-x_{1})^{2}+(y_{2}-y_{1})^{2}}$.')
}

type Built = Omit<WorkedCase<VectorsDetectiveError>, 'options'>
type Pair = [number, number]

/** A point or a vector as one number, for the checks: x·1000 + y */
export const pointCode = ([x, y]: Pair) => x * 1000 + y
const p = (value: number) => (value < 0 ? `(${value})` : String(value))
const pair = ([x, y]: Pair) => `(${x},${y})`
const point = (random: Random, limit = 6): Pair => [randomInt(random, -limit, limit), randomInt(random, -limit, limit)]
const value = (numerator: number, denominator = 1) => toLatex(fraction(numerator, denominator))
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13]]

function build(random: Random, error: VectorsDetectiveError): Built | null {
    switch (error) {
        case 'vector-reversed': {
            const [a, b] = [point(random), point(random)]
            const right: Pair = [b[0] - a[0], b[1] - a[1]]
            if (right[0] === 0 || right[1] === 0) return null
            return {
                problem: say(`$A${pair(a)}$ eta $B${pair(b)}$. Kalkulatu $\\overrightarrow{AB}$.`, `$A${pair(a)}$ y $B${pair(b)}$. Calcula $\\overrightarrow{AB}$.`, `$A${pair(a)}$ و$B${pair(b)}$. احسب $\\overrightarrow{AB}$.`, `$A${pair(a)}$ and $B${pair(b)}$. Work out $\\overrightarrow{AB}$.`),
                lines: [line(LABELS.rule, `\\overrightarrow{AB}=A-B`), line(LABELS.substitute, `x=${a[0]}-${p(b[0])}=${-right[0]}`), line(LABELS.result, `\\overrightarrow{AB}=${pair([-right[0], -right[1]])}`)],
                wrong: 0, error, fix: `\\overrightarrow{AB}=B-A\\ \\to\\ ${pair(right)}`, right: pointCode(right), reached: pointCode([-right[0], -right[1]])
            }
        }
        case 'midpoint-difference': {
            const [a, b] = [point(random), point(random)]
            if ((a[0] + b[0]) % 2 !== 0 || (a[1] + b[1]) % 2 !== 0) return null
            const right: Pair = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
            const reached: Pair = [(b[0] - a[0]) / 2, (b[1] - a[1]) / 2]
            if (right[0] === reached[0] && right[1] === reached[1]) return null
            return {
                problem: say(`Aurkitu $A${pair(a)}$ eta $B${pair(b)}$ puntuen erdiko puntua.`, `Halla el punto medio de $A${pair(a)}$ y $B${pair(b)}$.`, `أوجد منتصف $A${pair(a)}$ و$B${pair(b)}$.`, `Find the midpoint of $A${pair(a)}$ and $B${pair(b)}$.`),
                lines: [line(LABELS.rule, `M=\\frac{B-A}{2}`), line(LABELS.substitute, `x_{M}=\\frac{${b[0]}-${p(a[0])}}{2}=${reached[0]}`), line(LABELS.result, `M=${pair(reached)}`)],
                wrong: 0, error, fix: `M=\\frac{A+B}{2}=${pair(right)}`, right: pointCode(right), reached: pointCode(reached)
            }
        }
        case 'modulus-no-root': {
            const [x, y, r] = pick(random, TRIPLES)
            const [sx, sy] = [pick(random, [1, -1]) * x, pick(random, [1, -1]) * y]
            return {
                problem: say(`Kalkulatu $\\vec{v}=${pair([sx, sy])}$ bektorearen modulua.`, `Calcula el módulo de $\\vec{v}=${pair([sx, sy])}$.`, `احسب طول المتجه $\\vec{v}=${pair([sx, sy])}$.`, `Work out the length of $\\vec{v}=${pair([sx, sy])}$.`),
                lines: [line(LABELS.rule, `|\\vec{v}|=${p(sx)}^{2}+${p(sy)}^{2}`), line(LABELS.substitute, `|\\vec{v}|=${x * x}+${y * y}`), line(LABELS.result, `|\\vec{v}|=${r * r}`)],
                wrong: 0, error, fix: `|\\vec{v}|=\\sqrt{${x * x}+${y * y}}=${r}`, right: r, reached: r * r
            }
        }
        case 'scalar-one-coordinate': {
            const k = pick(random, [2, 3, -2])
            const [u, v] = [point(random, 4), point(random, 4)]
            const right: Pair = [k * u[0] - v[0], k * u[1] - v[1]]
            const reached: Pair = [k * u[0] - v[0], u[1] - v[1]]
            if (u[1] === 0 || right[1] === reached[1]) return null
            return {
                problem: say(`$\\vec{u}=${pair(u)}$ eta $\\vec{v}=${pair(v)}$. Kalkulatu $${k}\\vec{u}-\\vec{v}$.`, `$\\vec{u}=${pair(u)}$ y $\\vec{v}=${pair(v)}$. Calcula $${k}\\vec{u}-\\vec{v}$.`, `$\\vec{u}=${pair(u)}$ و$\\vec{v}=${pair(v)}$. احسب $${k}\\vec{u}-\\vec{v}$.`, `$\\vec{u}=${pair(u)}$ and $\\vec{v}=${pair(v)}$. Work out $${k}\\vec{u}-\\vec{v}$.`),
                lines: [line(LABELS.rule, `${k}\\vec{u}=${pair([k * u[0], u[1]])}`), line(LABELS.substitute, `\\vec{v}=${pair(v)}`), line(LABELS.result, `${k}\\vec{u}-\\vec{v}=${pair(reached)}`)],
                wrong: 0, error, fix: `${k}\\vec{u}=${pair([k * u[0], k * u[1]])}\\ \\to\\ ${pair(right)}`, right: pointCode(right), reached: pointCode(reached)
            }
        }
        case 'slope-inverted': {
            const [a, b] = [point(random), point(random)]
            const [dx, dy] = [b[0] - a[0], b[1] - a[1]]
            if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) return null
            return {
                problem: say(`Kalkulatu $A${pair(a)}$ eta $B${pair(b)}$ puntuetatik pasatzen den zuzenaren malda.`, `Calcula la pendiente de la recta que pasa por $A${pair(a)}$ y $B${pair(b)}$.`, `احسب ميل المستقيم المارّ بـ$A${pair(a)}$ و$B${pair(b)}$.`, `Work out the slope of the line through $A${pair(a)}$ and $B${pair(b)}$.`),
                lines: [line(LABELS.slope, `m=\\frac{${b[0]}-${p(a[0])}}{${b[1]}-${p(a[1])}}`), line(LABELS.substitute, `m=\\frac{${dx}}{${dy}}`), line(LABELS.result, `m=${value(dx, dy)}`)],
                wrong: 0, error, fix: `m=\\frac{${b[1]}-${p(a[1])}}{${b[0]}-${p(a[0])}}=${value(dy, dx)}`, right: dy / dx, reached: dx / dy
            }
        }
        case 'normal-as-direction': {
            const [a, b] = [pick(random, [1, 2, 3, 4, -2, -3]), pick(random, [1, 2, 3, 5, -1, -4])]
            const c = randomInt(random, -6, 6)
            if (Math.abs(a) === Math.abs(b)) return null
            const equation = `${a === 1 ? '' : a === -1 ? '-' : a}x${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}y${c === 0 ? '' : c < 0 ? c : `+${c}`}=0`
            return {
                problem: say(`Kalkulatu zuzen honen malda: $${equation}$`, `Calcula la pendiente de la recta $${equation}$.`, `احسب ميل المستقيم $${equation}$.`, `Work out the slope of the line $${equation}$.`),
                lines: [line(LABELS.direction, `\\vec{d}=${pair([a, b])}`), line(LABELS.slope, `m=\\frac{${b}}{${a}}`), line(LABELS.result, `m=${value(b, a)}`)],
                wrong: 0, error, fix: `\\vec{d}=${pair([-b, a])}\\ \\to\\ m=${value(-a, b)}`, right: -a / b, reached: b / a
            }
        }
        case 'point-slope-sign': {
            const [x0, y0] = point(random, 5)
            const m = pick(random, [2, 3, -2, -1, 4])
            if (x0 === 0 || y0 === 0) return null
            const right = y0 - m * x0
            const reached = y0 + m * x0
            return {
                problem: say(`$P${pair([x0, y0])}$ puntutik pasatzen den eta $m=${m}$ malda duen zuzena. Zein da jatorriko ordenatua?`, `Recta que pasa por $P${pair([x0, y0])}$ con pendiente $m=${m}$. ¿Cuál es su ordenada en el origen?`, `مستقيم يمرّ بـ$P${pair([x0, y0])}$ وميله $m=${m}$. ما الجزء المقطوع من محور y؟`, `The line through $P${pair([x0, y0])}$ with slope $m=${m}$. What is its y-intercept?`),
                lines: [line(LABELS.line, `y${y0 < 0 ? '+' : '-'}${Math.abs(y0)}=${m}(x${x0 < 0 ? '-' : '+'}${Math.abs(x0)})`), line(LABELS.substitute, `y=${m}x${m * x0 + y0 < 0 ? '' : '+'}${m * x0 + y0}`), line(LABELS.intercept, `n=${reached}`)],
                wrong: 0, error, fix: `y${y0 < 0 ? '+' : '-'}${Math.abs(y0)}=${m}(x${x0 < 0 ? '+' : '-'}${Math.abs(x0)})\\ \\to\\ n=${right}`, right, reached
            }
        }
        case 'perpendicular-no-minus': {
            const [n, d] = pick(random, [[2, 1], [3, 1], [1, 2], [2, 3], [3, 2], [-2, 1], [-1, 3], [4, 1]] as Array<[number, number]>)
            return {
                problem: say(`Zuzen baten malda $m=${value(n, d)}$ da. Zein da zuzen perpendikular baten malda?`, `Una recta tiene pendiente $m=${value(n, d)}$. ¿Qué pendiente tiene una perpendicular?`, `ميل مستقيم $m=${value(n, d)}$. ما ميل مستقيم عمودي عليه؟`, `A line has slope $m=${value(n, d)}$. What is the slope of a perpendicular line?`),
                lines: [line(LABELS.slope, `m=${value(n, d)}`), line(LABELS.rule, `m'=\\frac{1}{m}`), line(LABELS.result, `m'=${value(d, n)}`)],
                wrong: 1, error, fix: `m'=-\\frac{1}{m}=${value(-d, n)}`, right: -d / n, reached: d / n
            }
        }
        case 'parallel-proportion': {
            const a = pick(random, [1, 2, 3, -2])
            const b = pick(random, [2, 3, 4, -1])
            const factor = pick(random, [2, 3])
            const bPrime = b * factor
            const right = a * factor
            const reached = (a * b) / bPrime
            if (right === reached || Math.abs(a) === Math.abs(b)) return null
            return {
                problem: say(`Aurkitu k, $${a}x${b < 0 ? '-' : '+'}${Math.abs(b)}y+1=0$ eta $kx${bPrime < 0 ? '-' : '+'}${Math.abs(bPrime)}y-5=0$ paraleloak izan daitezen.`, `Halla k para que $${a}x${b < 0 ? '-' : '+'}${Math.abs(b)}y+1=0$ y $kx${bPrime < 0 ? '-' : '+'}${Math.abs(bPrime)}y-5=0$ sean paralelas.`, `أوجد k ليكون $${a}x${b < 0 ? '-' : '+'}${Math.abs(b)}y+1=0$ و$kx${bPrime < 0 ? '-' : '+'}${Math.abs(bPrime)}y-5=0$ متوازيين.`, `Find k so that $${a}x${b < 0 ? '-' : '+'}${Math.abs(b)}y+1=0$ and $kx${bPrime < 0 ? '-' : '+'}${Math.abs(bPrime)}y-5=0$ are parallel.`),
                lines: [line(LABELS.proportion, `\\frac{k}{${a}}=\\frac{${b}}{${bPrime}}`), line(LABELS.substitute, `k=\\frac{${a}\\cdot ${p(b)}}{${bPrime}}`), line(LABELS.result, `k=${value(a * b, bPrime)}`)],
                wrong: 0, error, fix: `\\frac{k}{${a}}=\\frac{${bPrime}}{${b}}\\ \\to\\ k=${right}`, right, reached
            }
        }
        case 'circle-radius': {
            const [a, b] = point(random, 5)
            const r = randomInt(random, 2, 7)
            const equation = `(x${a < 0 ? '+' : '-'}${Math.abs(a)})^{2}+(y${b < 0 ? '+' : '-'}${Math.abs(b)})^{2}=${r * r}`
            if (a === 0 || b === 0) return null
            return {
                problem: say(`Zein da zirkunferentzia honen erradioa? $${equation}$`, `¿Cuál es el radio de la circunferencia $${equation}$?`, `ما نصف قطر الدائرة $${equation}$؟`, `What is the radius of the circle $${equation}$?`),
                lines: [line(LABELS.centre, `C${pair([a, b])}`), line(LABELS.rule, `r^{2}=${r * r}`), line(LABELS.radius, `r=${r * r}`)],
                wrong: 2, error, fix: `r=\\sqrt{${r * r}}=${r}`, right: r, reached: r * r
            }
        }
        case 'distance-sum': {
            const [dx, dy, d] = pick(random, TRIPLES)
            const a = point(random, 4)
            const b: Pair = [a[0] + pick(random, [1, -1]) * dx, a[1] + pick(random, [1, -1]) * dy]
            if (Math.abs(b[0]) > 9 || Math.abs(b[1]) > 9) return null
            return {
                problem: say(`Kalkulatu $A${pair(a)}$ eta $B${pair(b)}$ puntuen arteko distantzia.`, `Calcula la distancia entre $A${pair(a)}$ y $B${pair(b)}$.`, `احسب المسافة بين $A${pair(a)}$ و$B${pair(b)}$.`, `Work out the distance between $A${pair(a)}$ and $B${pair(b)}$.`),
                lines: [line(LABELS.differences, `\\Delta x=${dx},\\ \\Delta y=${dy}`), line(LABELS.rule, `d=${dx}+${dy}`), line(LABELS.result, `d=${dx + dy}`)],
                wrong: 1, error, fix: `d=\\sqrt{${dx}^{2}+${dy}^{2}}=${d}`, right: d, reached: dx + dy
            }
        }
    }
}

export const createVectorsDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, vectorsDetectiveLevels[levelIndex], VECTORS_DETECTIVE_CASES, build)
