import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J4 · Bektoreen detektibea (Detective de vectores): a worked solution of
   three lines with one wrong line, the mistakes of this unit. Level 1:
   AB as A − B, a number that multiplies one coordinate only, the
   magnitude as a sum, the coordinates in a basis copied from the vector;
   level 2: the dot product written as a vector, |u + v|² without 2u·v,
   the inner angle for two vectors that follow each other, the cosine
   divided by one magnitude only; level 3: the unit vector divided by the
   sum, (a, b) ⟂ (b, a), the acute angle for a negative cosine and the
   projection divided by the wrong magnitude. `right` and `reached` only
   tell the cases apart.
   ========================================================================== */

export type BachVectorsDetectiveError =
    | 'reversed'
    | 'one-coordinate'
    | 'modulus-sum'
    | 'basis-copied'
    | 'dot-vector'
    | 'square-sum'
    | 'inner-angle'
    | 'one-magnitude'
    | 'unit-sum'
    | 'perpendicular-swap'
    | 'acute-taken'
    | 'projection-modulus'

export const bachVectorsDetectiveLevels: BachVectorsDetectiveError[][] = [
    ['reversed', 'one-coordinate', 'modulus-sum', 'basis-copied'],
    ['dot-vector', 'square-sum', 'inner-angle', 'one-magnitude'],
    ['unit-sum', 'perpendicular-swap', 'acute-taken', 'projection-modulus']
]

export const BACH_VECTORS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value))
const pair = ([x, y]: [number, number]) => `(${x},${y})`
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
/** «Work out …» with one formula */
const work = (formula: string) => say(`Kalkulatu $${formula}$.`, `Calcula $${formula}$.`, `احسب $${formula}$.`, `Work out $${formula}$.`)

export const bachVectorsDetectiveNames: Record<BachVectorsDetectiveError, LocalizedText> = {
    reversed: say('Jatorria ken muturra egin du', 'Restó origen menos extremo', 'طرح الأصل ناقص الطرف', 'Did start point minus end point'),
    'one-coordinate': say('Zenbakiak koordenatu bat bakarrik biderkatu du', 'El número multiplicó una sola coordenada', 'ضرب العدد مركّبة واحدة فقط', 'The number multiplied one coordinate only'),
    'modulus-sum': say('Modulua koordenatuen batura da, haren ustez', 'Tomó el módulo como la suma de las coordenadas', 'أخذ الطول مجموع المركّبتين', 'Took the magnitude as the sum of the coordinates'),
    'basis-copied': say('Oinarriko koordenatuak bektorearenak direla uste du', 'Copió las coordenadas del vector como si fueran las de la base', 'نسخ مركّبتي المتجه كأنهما في الأساس', 'Copied the vector\'s coordinates as the ones in the basis'),
    'dot-vector': say('Biderkadura eskalarra bektore gisa idatzi du', 'Escribió el producto escalar como un vector', 'كتب الجداء السلمي متجهًا', 'Wrote the dot product as a vector'),
    'square-sum': say('$2\\vec{u}\\cdot\\vec{v}$ ahaztu du', 'Olvidó $2\\vec{u}\\cdot\\vec{v}$', 'نسي $2\\vec{u}\\cdot\\vec{v}$', 'Forgot $2\\vec{u}\\cdot\\vec{v}$'),
    'inner-angle': say('Poligonoaren barneko angelua hartu du', 'Tomó el ángulo interior del polígono', 'أخذ الزاوية الداخلية للمضلع', 'Took the inner angle of the polygon'),
    'one-magnitude': say('Modulu bakar batez zatitu du', 'Dividió entre un solo módulo', 'قسم على طول واحد فقط', 'Divided by one magnitude only'),
    'unit-sum': say('Koordenatuen baturaz zatitu du, ez moduluaz', 'Dividió entre la suma de coordenadas, no entre el módulo', 'قسم على مجموع المركّبتين لا على الطول', 'Divided by the sum of the coordinates, not by the magnitude'),
    'perpendicular-swap': say('Koordenatuak trukatu ditu zeinua aldatu gabe', 'Cambió el orden sin cambiar un signo', 'بدّل الترتيب دون تغيير إشارة', 'Swapped the order without changing a sign'),
    'acute-taken': say('Kosinu negatibo batekin angelu zorrotza hartu du', 'Con un coseno negativo tomó el ángulo agudo', 'أخذ الزاوية الحادة مع جيب تمام سالب', 'Took the acute angle for a negative cosine'),
    'projection-modulus': say('Bektore okerraren moduluaz zatitu du', 'Dividió entre el módulo del vector equivocado', 'قسم على طول المتجه الخطأ', 'Divided by the magnitude of the wrong vector')
}

export const bachVectorsDetectiveTips: Record<BachVectorsDetectiveError, LocalizedText> = {
    reversed: say('$\\overrightarrow{AB}=B-A$: muturra ken jatorria.', '$\\overrightarrow{AB}=B-A$: extremo menos origen.', '$\\overrightarrow{AB}=B-A$: الطرف ناقص الأصل.', '$\\overrightarrow{AB}=B-A$: end point minus start point.'),
    'one-coordinate': say('$k(a,b)=(ka,kb)$: bi koordenatuak.', '$k(a,b)=(ka,kb)$: las dos coordenadas.', '$k(a,b)=(ka,kb)$: المركّبتان معًا.', '$k(a,b)=(ka,kb)$: both coordinates.'),
    'modulus-sum': say('$|(a,b)|=\\sqrt{a^2+b^2}$: Pitagoras.', '$|(a,b)|=\\sqrt{a^2+b^2}$: Pitágoras.', '$|(a,b)|=\\sqrt{a^2+b^2}$: فيثاغورس.', '$|(a,b)|=\\sqrt{a^2+b^2}$: Pythagoras.'),
    'basis-copied': say('Oinarri batean, $\\vec{w}=a\\vec{u}+b\\vec{v}$ ebatzi behar da.', 'En una base hay que resolver $\\vec{w}=a\\vec{u}+b\\vec{v}$.', 'في أساس يجب حل $\\vec{w}=a\\vec{u}+b\\vec{v}$.', 'In a basis you have to solve $\\vec{w}=a\\vec{u}+b\\vec{v}$.'),
    'dot-vector': say('$\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$: zenbaki bat.', '$\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$: un número.', '$\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$: عدد.', '$\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$: a number.'),
    'square-sum': say('$|\\vec{u}+\\vec{v}|^2=|\\vec{u}|^2+2\\,\\vec{u}\\cdot\\vec{v}+|\\vec{v}|^2$.', '$|\\vec{u}+\\vec{v}|^2=|\\vec{u}|^2+2\\,\\vec{u}\\cdot\\vec{v}+|\\vec{v}|^2$.', '$|\\vec{u}+\\vec{v}|^2=|\\vec{u}|^2+2\\,\\vec{u}\\cdot\\vec{v}+|\\vec{v}|^2$.', '$|\\vec{u}+\\vec{v}|^2=|\\vec{u}|^2+2\\,\\vec{u}\\cdot\\vec{v}+|\\vec{v}|^2$.'),
    'inner-angle': say('Bata bestearen ondoren datozen bektoreak: kanpoko angelua, $180^\\circ$ ken barnekoa.', 'Vectores seguidos: el ángulo exterior, $180^\\circ$ menos el interior.', 'متجهان متتاليان: الزاوية الخارجية، $180^\\circ$ ناقص الداخلية.', 'Vectors that follow each other: the outer angle, $180^\\circ$ minus the inner one.'),
    'one-magnitude': say('$\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$: bi moduluak.', '$\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$: los dos módulos.', '$\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$: الطولان معًا.', '$\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$: both magnitudes.'),
    'unit-sum': say('Unitarioa: $\\frac{\\vec{v}}{|\\vec{v}|}$.', 'Unitario: $\\frac{\\vec{v}}{|\\vec{v}|}$.', 'متجه الوحدة: $\\frac{\\vec{v}}{|\\vec{v}|}$.', 'Unit vector: $\\frac{\\vec{v}}{|\\vec{v}|}$.'),
    'perpendicular-swap': say('$(a,b)\\perp(-b,a)$: ordena eta zeinu bat.', '$(a,b)\\perp(-b,a)$: el orden y un signo.', '$(a,b)\\perp(-b,a)$: الترتيب وإشارة.', '$(a,b)\\perp(-b,a)$: the order and a sign.'),
    'acute-taken': say('Bi bektoreren angelua $0^\\circ$ eta $180^\\circ$ artekoa da.', 'El ángulo de dos vectores va de $0^\\circ$ a $180^\\circ$.', 'زاوية متجهين بين $0^\\circ$ و$180^\\circ$.', 'The angle of two vectors goes from $0^\\circ$ to $180^\\circ$.'),
    'projection-modulus': say('$\\vec{u}$ bektorearen proiekzioa $\\vec{v}$ bektorearen gainean: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$.', 'Proyección de $\\vec{u}$ sobre $\\vec{v}$: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$.', 'إسقاط $\\vec{u}$ على $\\vec{v}$: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$.', 'Projection of $\\vec{u}$ onto $\\vec{v}$: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$.')
}

type Built = Omit<WorkedCase<BachVectorsDetectiveError>, 'options'>

const PYTHAGOREAN: Array<[number, number]> = [[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5]]
const signs = (random: Random, [x, y]: [number, number]): [number, number] => [x * pick(random, [1, -1]), y * pick(random, [1, -1])]

function build(random: Random, error: BachVectorsDetectiveError): Built | null {
    switch (error) {
        case 'reversed': {
            const a: [number, number] = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
            const b: [number, number] = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
            const v: [number, number] = [b[0] - a[0], b[1] - a[1]]
            if (v[0] === 0 || v[1] === 0) return null
            return {
                problem: say(`$A${pair(a)}$ eta $B${pair(b)}$: kalkulatu $\\overrightarrow{AB}$ eta $3\\overrightarrow{AB}$.`, `$A${pair(a)}$ y $B${pair(b)}$: calcula $\\overrightarrow{AB}$ y $3\\overrightarrow{AB}$.`, `$A${pair(a)}$ و$B${pair(b)}$: احسب $\\overrightarrow{AB}$ و$3\\overrightarrow{AB}$.`, `$A${pair(a)}$ and $B${pair(b)}$: work out $\\overrightarrow{AB}$ and $3\\overrightarrow{AB}$.`),
                lines: [line(LABELS.step, `\\overrightarrow{AB}=${pair([-v[0], -v[1]])}`), line(LABELS.step, `3\\overrightarrow{AB}=${pair([-3 * v[0], -3 * v[1]])}`), line(LABELS.result, `${pair([-3 * v[0], -3 * v[1]])}`)],
                wrong: 0, error, fix: `\\overrightarrow{AB}=B-A=${pair(v)}`, right: v[0], reached: -v[0]
            }
        }
        case 'one-coordinate': {
            const k = randomInt(random, 2, 5)
            const u: [number, number] = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
            const v: [number, number] = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
            if (u.includes(0) || v.includes(0)) return null
            const wrongKu: [number, number] = [k * u[0], u[1]]
            return {
                problem: work(`${k}${pair(u)}+${pair(v)}`),
                lines: [line(LABELS.step, `${k}${pair(u)}=${pair(wrongKu)}`), line(LABELS.step, `${pair(wrongKu)}+${pair(v)}`), line(LABELS.result, pair([wrongKu[0] + v[0], wrongKu[1] + v[1]]))],
                wrong: 0, error, fix: `${k}${pair(u)}=${pair([k * u[0], k * u[1]])}\\ \\to\\ ${pair([k * u[0] + v[0], k * u[1] + v[1]])}`, right: k * u[1] + v[1], reached: u[1] + v[1]
            }
        }
        case 'modulus-sum': {
            const [x, y] = signs(random, pick(random, PYTHAGOREAN))
            const length = Math.sqrt(x * x + y * y)
            return {
                problem: say(`Aurkitu $${pair([x, y])}$ bektorearen norabide bereko bektore unitarioa.`, `Halla el vector unitario con la dirección de $${pair([x, y])}$.`, `أوجد متجه الوحدة في اتجاه $${pair([x, y])}$.`, `Find the unit vector in the direction of $${pair([x, y])}$.`),
                lines: [line(LABELS.step, `|${pair([x, y])}|=${Math.abs(x) + Math.abs(y)}`), line(LABELS.step, `\\frac{1}{${Math.abs(x) + Math.abs(y)}}${pair([x, y])}`), line(LABELS.result, `\\left(\\frac{${x}}{${Math.abs(x) + Math.abs(y)}},\\frac{${y}}{${Math.abs(x) + Math.abs(y)}}\\right)`)],
                wrong: 0, error, fix: `|${pair([x, y])}|=\\sqrt{${x * x}+${y * y}}=${length}`, right: length, reached: Math.abs(x) + Math.abs(y)
            }
        }
        case 'basis-copied': {
            const a = pick(random, [-2, -1, 2, 3])
            const b = pick(random, [-2, -1, 2, 3])
            const u: [number, number] = [1, 1]
            const v: [number, number] = [1, -1]
            const w: [number, number] = [a + b, a - b]
            if (w[0] === a || w.includes(0)) return null
            return {
                problem: say(`Aurkitu $\\vec{w}=${pair(w)}$ bektorearen koordenatuak $B=(${pair(u)},${pair(v)})$ oinarrian.`, `Halla las coordenadas de $\\vec{w}=${pair(w)}$ en la base $B=(${pair(u)},${pair(v)})$.`, `أوجد مركّبتي $\\vec{w}=${pair(w)}$ في الأساس $B=(${pair(u)},${pair(v)})$.`, `Find the coordinates of $\\vec{w}=${pair(w)}$ in the basis $B=(${pair(u)},${pair(v)})$.`),
                lines: [line(LABELS.data, `\\vec{w}=${pair(w)}`), line(LABELS.step, `\\vec{w}=(${w[0]},${w[1]})_B`), line(LABELS.result, `a=${w[0]},\\ b=${w[1]}`)],
                wrong: 1, error, fix: `a+b=${w[0]},\\ a-b=${w[1]}\\ \\to\\ (${a},${b})_B`, right: a, reached: w[0]
            }
        }
        case 'dot-vector': {
            const u: [number, number] = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
            const v: [number, number] = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
            if (u.includes(0) || v.includes(0)) return null
            const products: [number, number] = [u[0] * v[0], u[1] * v[1]]
            return {
                problem: work(`${pair(u)}\\cdot ${pair(v)}`),
                lines: [line(LABELS.step, `${pair(u)}\\cdot ${pair(v)}=${pair(products)}`), line(LABELS.step, `${pair(products)}`), line(LABELS.result, pair(products))],
                wrong: 0, error, fix: `${u[0]}\\cdot ${wrap(v[0])}+${wrap(u[1])}\\cdot ${wrap(v[1])}=${products[0] + products[1]}`, right: products[0] + products[1], reached: products[0]
            }
        }
        case 'square-sum': {
            const p = randomInt(random, 2, 6)
            const q = randomInt(random, 2, 6)
            const k = pick(random, [-6, -4, -3, 3, 4, 5, 6])
            const value = p * p + 2 * k + q * q
            if (value <= 0) return null
            return {
                problem: say(`$|\\vec{u}|=${p}$, $|\\vec{v}|=${q}$ eta $\\vec{u}\\cdot\\vec{v}=${k}$: kalkulatu $|\\vec{u}+\\vec{v}|^2$.`, `$|\\vec{u}|=${p}$, $|\\vec{v}|=${q}$ y $\\vec{u}\\cdot\\vec{v}=${k}$: calcula $|\\vec{u}+\\vec{v}|^2$.`, `$|\\vec{u}|=${p}$ و$|\\vec{v}|=${q}$ و$\\vec{u}\\cdot\\vec{v}=${k}$: احسب $|\\vec{u}+\\vec{v}|^2$.`, `$|\\vec{u}|=${p}$, $|\\vec{v}|=${q}$ and $\\vec{u}\\cdot\\vec{v}=${k}$: work out $|\\vec{u}+\\vec{v}|^2$.`),
                lines: [line(LABELS.step, `|\\vec{u}+\\vec{v}|^2=|\\vec{u}|^2+|\\vec{v}|^2`), line(LABELS.step, `${p * p}+${q * q}`), line(LABELS.result, String(p * p + q * q))],
                wrong: 0, error, fix: `${p * p}+2\\cdot ${wrap(k)}+${q * q}=${value}`, right: value, reached: p * p + q * q
            }
        }
        case 'inner-angle': {
            const s = randomInt(random, 2, 6)
            const triangle = pick(random, [true, false])
            const inner = triangle ? 60 : 120
            const sign = triangle ? 1 : -1
            const shape = triangle
                ? say(`Alde ${s} duen $ABC$ triangelu aldeberdinean, kalkulatu $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.`, `En el triángulo equilátero $ABC$ de lado ${s}, calcula $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.`, `في المثلث المتساوي الأضلاع $ABC$ الذي طول ضلعه ${s}، احسب $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.`, `In the equilateral triangle $ABC$ with side ${s}, work out $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.`)
                : say(`Alde ${s} duen hexagono erregular batean, $A$, $B$ eta $C$ ondoz ondokoak dira: kalkulatu $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.`, `En un hexágono regular de lado ${s}, $A$, $B$ y $C$ son vértices seguidos: calcula $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.`, `في سداسي منتظم طول ضلعه ${s}، ‏$A$ و$B$ و$C$ رؤوس متتالية: احسب $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.`, `In a regular hexagon with side ${s}, $A$, $B$ and $C$ are consecutive vertices: work out $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.`)
            const half = (s * s) / 2
            return {
                problem: shape,
                lines: [line(LABELS.step, `\\alpha=\\widehat{B}=${inner}^\\circ`), line(LABELS.step, `${s}\\cdot ${s}\\cdot\\cos ${inner}^\\circ`), line(LABELS.result, `${sign * half}`.replace('.', '{,}'))],
                wrong: 0, error, fix: `\\alpha=180^\\circ-${inner}^\\circ=${180 - inner}^\\circ\\ \\to\\ ${-sign * half}`.replace('.', '{,}'), right: -sign * half, reached: sign * half
            }
        }
        case 'one-magnitude': {
            const [x, y] = pick(random, [[3, 4], [4, 3], [0, 5], [5, 0]] as Array<[number, number]>)
            const t = randomInt(random, 2, 3)
            const v: [number, number] = [t * x, t * y]
            const dot = x * v[0] + y * v[1]
            return {
                problem: say(`Aurkitu $\\vec{u}=${pair([x, y])}$ eta $\\vec{v}=${pair(v)}$ bektoreen angelua.`, `Halla el ángulo de $\\vec{u}=${pair([x, y])}$ y $\\vec{v}=${pair(v)}$.`, `أوجد الزاوية بين $\\vec{u}=${pair([x, y])}$ و$\\vec{v}=${pair(v)}$.`, `Find the angle between $\\vec{u}=${pair([x, y])}$ and $\\vec{v}=${pair(v)}$.`),
                lines: [line(LABELS.step, `\\vec{u}\\cdot\\vec{v}=${dot}`), line(LABELS.step, `\\cos\\alpha=\\frac{${dot}}{5}=${dot / 5}`), line(LABELS.result, `\\cos\\alpha=${dot / 5}>1`)],
                wrong: 1, error, fix: `\\cos\\alpha=\\frac{${dot}}{5\\cdot ${5 * t}}=1\\ \\to\\ \\alpha=0^\\circ`, right: 1, reached: dot / 5
            }
        }
        case 'unit-sum': {
            const [x, y] = pick(random, PYTHAGOREAN)
            const length = Math.sqrt(x * x + y * y)
            return {
                problem: say(`Aurkitu $${pair([x, y])}$ bektorearen norabide eta noranzko bereko bektore unitarioa.`, `Halla el vector unitario con la dirección y el sentido de $${pair([x, y])}$.`, `أوجد متجه الوحدة الذي له اتجاه $${pair([x, y])}$ ومنحاه.`, `Find the unit vector with the direction and sense of $${pair([x, y])}$.`),
                lines: [line(LABELS.step, `${x}+${y}=${x + y}`), line(LABELS.step, `\\frac{1}{${x + y}}${pair([x, y])}`), line(LABELS.result, `\\left(\\frac{${x}}{${x + y}},\\frac{${y}}{${x + y}}\\right)`)],
                wrong: 0, error, fix: `|${pair([x, y])}|=${length}\\ \\to\\ \\left(\\frac{${x}}{${length}},\\frac{${y}}{${length}}\\right)`, right: length, reached: x + y
            }
        }
        case 'perpendicular-swap': {
            const a = randomInt(random, 1, 6)
            const b = randomInt(random, 1, 6)
            if (a === b) return null
            return {
                problem: say(`Eman $${pair([a, b])}$ bektorearen perpendikular bat, eta egiaztatu.`, `Da un vector perpendicular a $${pair([a, b])}$ y compruébalo.`, `أعطِ متجهًا عموديًا على $${pair([a, b])}$ وتحقق منه.`, `Give a vector perpendicular to $${pair([a, b])}$ and check it.`),
                lines: [line(LABELS.step, `${pair([a, b])}\\perp${pair([b, a])}`), line(LABELS.step, `${a}\\cdot ${b}+${b}\\cdot ${a}=${2 * a * b}`), line(LABELS.result, pair([b, a]))],
                wrong: 0, error, fix: `${pair([a, b])}\\perp${pair([-b, a])}\\qquad ${a}\\cdot(-${b})+${b}\\cdot ${a}=0`, right: 0, reached: 2 * a * b
            }
        }
        case 'acute-taken': {
            const k = randomInt(random, 1, 3)
            const u: [number, number] = [k, 0]
            const v: [number, number] = pick(random, [[-1, 1], [-2, 2], [-1, -1]] as Array<[number, number]>)
            const dot = u[0] * v[0]
            return {
                problem: say(`Aurkitu $${pair(u)}$ eta $${pair(v)}$ bektoreen angelua.`, `Halla el ángulo de $${pair(u)}$ y $${pair(v)}$.`, `أوجد الزاوية بين $${pair(u)}$ و$${pair(v)}$.`, `Find the angle between $${pair(u)}$ and $${pair(v)}$.`),
                lines: [line(LABELS.step, `\\vec{u}\\cdot\\vec{v}=${dot}`), line(LABELS.step, `\\cos\\alpha=-\\frac{\\sqrt{2}}{2}`), line(LABELS.result, `\\alpha=45^\\circ`)],
                wrong: 2, error, fix: `\\cos\\alpha<0\\ \\to\\ \\alpha=135^\\circ`, right: 135, reached: 45
            }
        }
        case 'projection-modulus': {
            const v = pick(random, [[3, 4], [4, 3], [0, 5], [5, 0]] as Array<[number, number]>)
            const u: [number, number] = [randomInt(random, 1, 6), randomInt(random, 1, 6)]
            const dot = u[0] * v[0] + u[1] * v[1]
            const uSquare = u[0] * u[0] + u[1] * u[1]
            if (Number.isInteger(Math.sqrt(uSquare))) return null
            return {
                problem: say(`Kalkulatu $${pair(u)}$ bektorearen proiekzioa $${pair(v)}$ bektorearen gainean.`, `Calcula la proyección de $${pair(u)}$ sobre $${pair(v)}$.`, `احسب إسقاط $${pair(u)}$ على $${pair(v)}$.`, `Work out the projection of $${pair(u)}$ onto $${pair(v)}$.`),
                lines: [line(LABELS.step, `${pair(u)}\\cdot ${pair(v)}=${dot}`), line(LABELS.step, `\\frac{${dot}}{\\sqrt{${uSquare}}}`), line(LABELS.result, `\\frac{${dot}}{\\sqrt{${uSquare}}}`)],
                wrong: 1, error, fix: `\\frac{${dot}}{|${pair(v)}|}=\\frac{${dot}}{5}`, right: dot / 5, reached: dot / Math.sqrt(uSquare)
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBachVectorsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bachVectorsDetectiveLevels[levelIndex], BACH_VECTORS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}
