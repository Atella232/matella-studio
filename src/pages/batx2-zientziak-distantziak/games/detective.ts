import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { add, cross, det3, dot, scale, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3.ts'
import { COS_ANGLE, fracLatex, isZero, lengthOf, niceQuarter, nonZeroCount, planeLatex, root, say, SIN_ANGLE, small, tidy, vec, WHOLE_NORMALS, WHOLE_OFFSETS, wrap } from './common.ts'

/* ==========================================================================
   J4 · Angelu eta distantzien detektibea (Detective de ángulos y
   distancias): a worked solution of three lines with one wrong line.
   Level 1 (angles and feet): the cosine without absolute value, the
   cosine instead of the sine, the point P forgotten in the foot, the
   foot taken as the symmetric point. Level 2 (from a point): no division
   by |n|, the D forgotten, parallel planes without the same normal, the
   point–line distance divided by |AP|. Level 3 (between lines): the
   volume divided by |u|·|v| or by |AB|, the formula of parallel lines
   for skew lines, the mediator plane through an end point. `right` and
   `reached` only tell the cases apart.
   ========================================================================== */

export type DistancesDetectiveError =
    | 'no-abs'
    | 'cos-for-sin'
    | 'forgot-point'
    | 'foot-as-symmetric'
    | 'no-norm'
    | 'no-d'
    | 'unequal-normals'
    | 'divide-ap'
    | 'product-norms'
    | 'divide-ab'
    | 'parallel-formula'
    | 'mediator-endpoint'

export const distancesDetectiveLevels: DistancesDetectiveError[][] = [
    ['no-abs', 'cos-for-sin', 'forgot-point', 'foot-as-symmetric'],
    ['no-norm', 'no-d', 'unequal-normals', 'divide-ap'],
    ['product-norms', 'divide-ab', 'parallel-formula', 'mediator-endpoint']
]

export const DISTANCES_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const distancesDetectiveNames: Record<DistancesDetectiveError, LocalizedText> = {
    'no-abs': say('Balio absoluturik gabe', 'Sin valor absoluto', 'دون قيمة مطلقة', 'No absolute value'),
    'cos-for-sin': say('Kosinua erabili du sinuaren ordez', 'Usó el coseno en vez del seno', 'استعمل جيب التمام بدل الجيب', 'Used the cosine instead of the sine'),
    'forgot-point': say('$P$ puntua batzea ahaztu du', 'Olvidó sumar el punto $P$', 'نسي إضافة النقطة $P$', 'Forgot to add the point $P$'),
    'foot-as-symmetric': say('Oina hartu du simetrikotzat', 'Tomó el pie como simétrico', 'أخذ المسقط على أنه النظيرة', 'Took the foot as the symmetric point'),
    'no-norm': say('Ez du normalaren moduluaz zatitu', 'No dividió entre el módulo del normal', 'لم يقسم على طول الناظم', 'Did not divide by the magnitude of the normal'),
    'no-d': say('$D$ ahaztu du', 'Olvidó la $D$', 'نسي $D$', 'Forgot $D$'),
    'unequal-normals': say('Normalak berdindu gabe', 'Sin igualar los normales', 'دون مساواة الناظمين', 'Without making the normals equal'),
    'divide-ap': say('$|\\overrightarrow{AP}|$ modulua erabili du zatitzailean', 'Dividió entre $|\\overrightarrow{AP}|$', 'قسم على $|\\overrightarrow{AP}|$', 'Divided by $|\\overrightarrow{AP}|$'),
    'product-norms': say('$|\\vec{u}|\\,|\\vec{v}|$ erabili du zatitzailean', 'Dividió entre $|\\vec{u}|\\,|\\vec{v}|$', 'قسم على $|\\vec{u}|\\,|\\vec{v}|$', 'Divided by $|\\vec{u}|\\,|\\vec{v}|$'),
    'divide-ab': say('$|\\overrightarrow{AB}|$ modulua erabili du zatitzailean', 'Dividió entre $|\\overrightarrow{AB}|$', 'قسم على $|\\overrightarrow{AB}|$', 'Divided by $|\\overrightarrow{AB}|$'),
    'parallel-formula': say('Zuzen paraleloen formula erabili du', 'Usó la fórmula de rectas paralelas', 'استعمل صيغة المستقيمين المتوازيين', 'Used the formula for parallel lines'),
    'mediator-endpoint': say('Plano erdikaria muturretik pasarazi du', 'Hizo pasar el mediador por un extremo', 'جعل المستوى المنصِّف يمر بطرف', 'Made the mediator plane pass through an end point')
}

export const distancesDetectiveTips: Record<DistancesDetectiveError, LocalizedText> = {
    'no-abs': say('Bi zuzenen angelua 0 eta 90 gradu artean dago: $\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$.', 'El ángulo de dos rectas está entre 0 y 90 grados: $\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$.', 'زاوية مستقيمين بين 0 و90 درجة: $\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$.', 'The angle of two lines is between 0 and 90 degrees: $\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$.'),
    'cos-for-sin': say('$\\vec{u}$ eta $\\vec{n}$ bektoreen angelua osagarria da: zuzenaren eta planoaren angeluak $\\sin\\alpha$ erabiltzen du.', 'El ángulo de $\\vec{u}$ y $\\vec{n}$ es el complementario: el de la recta y el plano usa $\\sin\\alpha$.', 'زاوية $\\vec{u}$ و$\\vec{n}$ هي المتممة: زاوية المستقيم والمستوى تستعمل $\\sin\\alpha$.', 'The angle of $\\vec{u}$ and $\\vec{n}$ is the complement: the angle of the line and the plane uses $\\sin\\alpha$.'),
    'forgot-point': say('Oina $M=P+t\\,\\vec{n}$ da, ez $t\\,\\vec{n}$.', 'El pie es $M=P+t\\,\\vec{n}$, no $t\\,\\vec{n}$.', 'المسقط $M=P+t\\,\\vec{n}$ لا $t\\,\\vec{n}$.', 'The foot is $M=P+t\\,\\vec{n}$, not $t\\,\\vec{n}$.'),
    'foot-as-symmetric': say('$M$ erdian dago: $P\'=2M-P$.', '$M$ está en medio: $P\'=2M-P$.', '$M$ في المنتصف: $P\'=2M-P$.', '$M$ is in the middle: $P\'=2M-P$.'),
    'no-norm': say('$d(P,\\pi)=\\frac{|\\vec{n}\\cdot P+D|}{|\\vec{n}|}$: zatitu normalaren moduluaz.', '$d(P,\\pi)=\\frac{|\\vec{n}\\cdot P+D|}{|\\vec{n}|}$: divide entre el módulo del normal.', '$d(P,\\pi)=\\frac{|\\vec{n}\\cdot P+D|}{|\\vec{n}|}$: اقسم على طول الناظم.', '$d(P,\\pi)=\\frac{|\\vec{n}\\cdot P+D|}{|\\vec{n}|}$: divide by the magnitude of the normal.'),
    'no-d': say('Zenbakitzailean planoaren ekuazio osoa: $Ax_0+By_0+C{z}_0+D$.', 'En el numerador va la ecuación entera: $Ax_0+By_0+C{z}_0+D$.', 'في البسط المعادلة كاملة: $Ax_0+By_0+C{z}_0+D$.', 'The numerator holds the whole equation: $Ax_0+By_0+C{z}_0+D$.'),
    'unequal-normals': say('Lehenik bi planoek normal bera izan behar dute; gero $\\frac{|D_2-D_1|}{|\\vec{n}|}$.', 'Primero los dos planos con el mismo normal; después $\\frac{|D_2-D_1|}{|\\vec{n}|}$.', 'أولًا المستويان بالناظم نفسه، ثم $\\frac{|D_2-D_1|}{|\\vec{n}|}$.', 'First both planes with the same normal; then $\\frac{|D_2-D_1|}{|\\vec{n}|}$.'),
    'divide-ap': say('Paralelogramoaren azalera zati oinarria: $\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$.', 'Área del paralelogramo entre la base: $\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$.', 'مساحة متوازي الأضلاع على القاعدة: $\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$.', 'The area of the parallelogram over the base: $\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$.'),
    'product-norms': say('Kutxaren oinarria $|\\vec{u}\\times\\vec{v}|$ da, ez $|\\vec{u}|\\,|\\vec{v}|$.', 'La base de la caja es $|\\vec{u}\\times\\vec{v}|$, no $|\\vec{u}|\\,|\\vec{v}|$.', 'قاعدة الصندوق $|\\vec{u}\\times\\vec{v}|$ لا $|\\vec{u}|\\,|\\vec{v}|$.', 'The base of the box is $|\\vec{u}\\times\\vec{v}|$, not $|\\vec{u}|\\,|\\vec{v}|$.'),
    'divide-ab': say('Bolumena zati oinarria: $\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}$.', 'Volumen entre la base: $\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}$.', 'الحجم على القاعدة: $\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}$.', 'Volume over the base: $\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}$.'),
    'parallel-formula': say('$\\vec{u}\\times\\vec{v}\\neq\\vec{0}$ bada, ez dira paraleloak: biderkadura mistoa zati $|\\vec{u}\\times\\vec{v}|$.', 'Si $\\vec{u}\\times\\vec{v}\\neq\\vec{0}$, no son paralelas: producto mixto entre $|\\vec{u}\\times\\vec{v}|$.', 'إذا $\\vec{u}\\times\\vec{v}\\neq\\vec{0}$ فليسا متوازيين: الجداء المختلط على $|\\vec{u}\\times\\vec{v}|$.', 'If $\\vec{u}\\times\\vec{v}\\neq\\vec{0}$, they are not parallel: triple product over $|\\vec{u}\\times\\vec{v}|$.'),
    'mediator-endpoint': say('Plano erdikaria $A$ eta $B$ puntuen erdiko puntutik pasatzen da.', 'El plano mediador pasa por el punto medio de $A$ y $B$.', 'المستوى المنصِّف يمر بمنتصف $A$ و$B$.', 'The mediator plane goes through the midpoint of $A$ and $B$.')
}

type Built = Omit<WorkedCase<DistancesDetectiveError>, 'options'>

/** Two vectors of a nice angle, two non-zero coordinates each */
function niceVectors(random: Random): [Vec3, Vec3, number] | null {
    const a = small(random, 2)
    const b = small(random, 2)
    if (nonZeroCount(a) < 2 || nonZeroCount(b) < 2) return null
    const quarter = niceQuarter(a, b)
    return quarter === null ? null : [a, b, quarter]
}

/** A whole point P, a normal of whole length and a step t, so that the foot M = P + t·n is whole */
function footData(random: Random) {
    const n = small(random, 2)
    const p = small(random, 2)
    const t = pick(random, [1, -1])
    if (nonZeroCount(n) < 2) return null
    const m = add(p, scale(t, n))
    return { n, p, t, m: tidy(m), D: -dot(n, m) + 0 }
}

/** Two skew lines, A at the origin side, with the box and its base */
function skewData(random: Random) {
    const a = small(random, 2)
    const b = small(random, 2)
    const u = small(random, 2)
    const v = small(random, 2)
    const w = cross(u, v)
    if (isZero(w) || nonZeroCount(u) < 2 || nonZeroCount(v) < 2) return null
    const ab = sub(b, a)
    const mixed = det3(ab, u, v) + 0
    if (mixed === 0) return null
    return { a, b, u, v, w: tidy(w), ab: tidy(ab), mixed, ww: dot(w, w) }
}

function build(random: Random, error: DistancesDetectiveError): Built | null {
    switch (error) {
        case 'no-abs': {
            const pair = niceVectors(random)
            if (!pair) return null
            const [u, v, quarter] = pair
            const product = dot(u, v)
            if (product >= 0) return null
            const angle = COS_ANGLE[quarter]
            const lengths = `${root(dot(u, u))}\\,${root(dot(v, v))}`
            return {
                problem: say(`Aurkitu $r$ eta $s$ zuzenen angelua: $\\vec{u}=${vec(u)}$ eta $\\vec{v}=${vec(v)}$.`, `Halla el ángulo de $r$ y $s$: $\\vec{u}=${vec(u)}$ y $\\vec{v}=${vec(v)}$.`, `أوجد زاوية $r$ و$s$: $\\vec{u}=${vec(u)}$ و$\\vec{v}=${vec(v)}$.`, `Find the angle of $r$ and $s$: $\\vec{u}=${vec(u)}$ and $\\vec{v}=${vec(v)}$.`),
                lines: [line(LABELS.step, `\\vec{u}\\cdot\\vec{v}=${product}`), line(LABELS.step, `\\cos\\alpha=\\frac{${product}}{${lengths}}`), line(LABELS.result, `\\alpha=${180 - angle}^\\circ`)],
                wrong: 1, error, fix: `\\cos\\alpha=\\frac{|${product}|}{${lengths}}\\ \\to\\ \\alpha=${angle}^\\circ`, right: angle, reached: 180 - angle
            }
        }
        case 'cos-for-sin': {
            const pair = niceVectors(random)
            if (!pair) return null
            const [u, n, quarter] = pair
            if (quarter === 2) return null
            const angle = SIN_ANGLE[quarter]
            const product = dot(u, n)
            const lengths = `${root(dot(u, u))}\\,${root(dot(n, n))}`
            return {
                problem: say(`Aurkitu $r$ zuzenaren eta $\\pi$ planoaren angelua: $\\vec{u}=${vec(u)}$ eta $\\vec{n}=${vec(n)}$.`, `Halla el ángulo de la recta $r$ y el plano $\\pi$: $\\vec{u}=${vec(u)}$ y $\\vec{n}=${vec(n)}$.`, `أوجد زاوية المستقيم $r$ والمستوى $\\pi$: $\\vec{u}=${vec(u)}$ و$\\vec{n}=${vec(n)}$.`, `Find the angle of the line $r$ and the plane $\\pi$: $\\vec{u}=${vec(u)}$ and $\\vec{n}=${vec(n)}$.`),
                lines: [line(LABELS.step, `\\vec{u}\\cdot\\vec{n}=${product}`), line(LABELS.step, `\\cos\\alpha=\\frac{|${product}|}{${lengths}}`), line(LABELS.result, `\\alpha=${90 - angle}^\\circ`)],
                wrong: 1, error, fix: `\\sin\\alpha=\\frac{|${product}|}{${lengths}}\\ \\to\\ \\alpha=${angle}^\\circ`, right: angle, reached: 90 - angle
            }
        }
        case 'forgot-point': {
            const data = footData(random)
            if (!data) return null
            const { n, p, t, m, D } = data
            const reached = tidy(scale(t, n))
            const index = [0, 1, 2].find((i) => m[i] !== reached[i])
            if (index === undefined) return null
            return {
                problem: say(`Aurkitu $P${vec(p)}$ puntuaren proiekzio ortogonala $${planeLatex({ normal: n, D })}$ planoan.`, `Halla la proyección ortogonal de $P${vec(p)}$ sobre $${planeLatex({ normal: n, D })}$.`, `أوجد المسقط العمودي لـ $P${vec(p)}$ على $${planeLatex({ normal: n, D })}$.`, `Find the orthogonal projection of $P${vec(p)}$ on $${planeLatex({ normal: n, D })}$.`),
                lines: [line(LABELS.data, `\\vec{n}=${vec(n)}`), line(LABELS.step, `t=${t}`), line(LABELS.result, `\\begin{gathered}M=t\\,\\vec{n}\\\\ =${vec(reached)}\\end{gathered}`)],
                wrong: 2, error, fix: `M=P+t\\,\\vec{n}\\ \\to\\ ${vec(m)}`, right: m[index], reached: reached[index]
            }
        }
        case 'foot-as-symmetric': {
            const data = footData(random)
            if (!data) return null
            const { n, p, t, m, D } = data
            const symmetric = tidy(sub(scale(2, m), p))
            const index = [0, 1, 2].find((i) => n[i] !== 0)!
            return {
                problem: say(`Aurkitu $P${vec(p)}$ puntuaren simetrikoa $${planeLatex({ normal: n, D })}$ planoarekiko.`, `Halla el simétrico de $P${vec(p)}$ respecto de $${planeLatex({ normal: n, D })}$.`, `أوجد نظيرة $P${vec(p)}$ بالنسبة إلى $${planeLatex({ normal: n, D })}$.`, `Find the symmetric point of $P${vec(p)}$ about $${planeLatex({ normal: n, D })}$.`),
                lines: [line(LABELS.step, `t=${t}`), line(LABELS.step, `\\begin{gathered}M=P+t\\,\\vec{n}\\\\ =${vec(m)}\\end{gathered}`), line(LABELS.result, `\\begin{gathered}P'=M\\\\ =${vec(m)}\\end{gathered}`)],
                wrong: 2, error, fix: `P'=2M-P\\ \\to\\ ${vec(symmetric)}`, right: symmetric[index], reached: m[index]
            }
        }
        case 'no-norm': {
            const n = pick(random, WHOLE_NORMALS.filter((item) => lengthOf(item) === 3))
            const p = small(random, 2)
            const D = randomInt(random, -5, 5)
            const value = dot(n, p) + D
            if (value === 0) return null
            return {
                problem: say(`Aurkitu $P${vec(p)}$ puntutik $${planeLatex({ normal: n, D })}$ planorainoko distantzia.`, `Halla la distancia de $P${vec(p)}$ a $${planeLatex({ normal: n, D })}$.`, `أوجد المسافة من $P${vec(p)}$ إلى $${planeLatex({ normal: n, D })}$.`, `Find the distance from $P${vec(p)}$ to $${planeLatex({ normal: n, D })}$.`),
                lines: [line(LABELS.step, `\\vec{n}\\cdot P+D=${value}`), line(LABELS.step, `d(P,\\pi)=|${value}|`), line(LABELS.result, `d(P,\\pi)=${Math.abs(value)}`)],
                wrong: 1, error, fix: `d(P,\\pi)=\\frac{|${value}|}{3}\\ \\to\\ ${fracLatex(Math.abs(value), 3)}`, right: Math.abs(value) / 3, reached: Math.abs(value)
            }
        }
        case 'no-d': {
            const n = pick(random, WHOLE_NORMALS.filter((item) => lengthOf(item) === 3))
            const p = small(random, 2)
            const D = pick(random, [-5, -4, -3, -2, 2, 3, 4, 5])
            const product = dot(n, p) + 0
            if (Math.abs(product + D) === Math.abs(product)) return null
            return {
                problem: say(`Aurkitu $P${vec(p)}$ puntutik $${planeLatex({ normal: n, D })}$ planorainoko distantzia.`, `Halla la distancia de $P${vec(p)}$ a $${planeLatex({ normal: n, D })}$.`, `أوجد المسافة من $P${vec(p)}$ إلى $${planeLatex({ normal: n, D })}$.`, `Find the distance from $P${vec(p)}$ to $${planeLatex({ normal: n, D })}$.`),
                lines: [line(LABELS.data, `|\\vec{n}|=3`), line(LABELS.step, `\\vec{n}\\cdot P=${product}`), line(LABELS.result, `d(P,\\pi)=\\frac{|${product}|}{3}`)],
                wrong: 2, error, fix: `d(P,\\pi)=\\frac{|${product}${D < 0 ? D : `+${D}`}|}{3}\\ \\to\\ ${fracLatex(Math.abs(product + D), 3)}`, right: Math.abs(product + D) / 3, reached: Math.abs(product) / 3
            }
        }
        case 'unequal-normals': {
            const n = pick(random, WHOLE_NORMALS.filter((item) => lengthOf(item) === 3 && item.filter((value) => value < 0).length <= 1))
            const D1 = randomInt(random, -4, 4)
            const D2 = pick(random, [-8, -6, -4, -2, 2, 4, 6, 8])
            const first = { normal: n, D: D1 }
            const second = { normal: tidy(scale(2, n)), D: D2 }
            const right = Math.abs(D2 / 2 - D1)
            if (right === 0) return null
            return {
                problem: say(`Aurkitu $${planeLatex(first)}$ eta $${planeLatex(second)}$ planoen arteko distantzia.`, `Halla la distancia entre $${planeLatex(first)}$ y $${planeLatex(second)}$.`, `أوجد المسافة بين $${planeLatex(first)}$ و$${planeLatex(second)}$.`, `Find the distance between $${planeLatex(first)}$ and $${planeLatex(second)}$.`),
                lines: [line(LABELS.step, `\\vec{n}_2=2\\,\\vec{n}_1`), line(LABELS.step, `d=\\frac{|${D2}-${wrap(D1)}|}{3}`), line(LABELS.result, `d=${fracLatex(Math.abs(D2 - D1), 3)}`)],
                wrong: 1, error, fix: `D_2\\to ${D2 / 2}\\ \\to\\ d=\\frac{|${D2 / 2}-${wrap(D1)}|}{3}\\ \\to\\ ${fracLatex(right, 3)}`, right: right / 3, reached: Math.abs(D2 - D1) / 3
            }
        }
        case 'divide-ap': {
            const u = pick(random, WHOLE_NORMALS.filter((item) => lengthOf(item) === 3))
            const offset = pick(random, WHOLE_OFFSETS.filter((item) => dot(item, u) === 0 && lengthOf(item) <= 3 && item.every((value) => Math.abs(value) <= 2)))
            if (!offset) return null
            const a = small(random, 2)
            const s = pick(random, [1, -1])
            const p = tidy(add(add(a, scale(s, u)), offset))
            const k = lengthOf(offset)
            const ap = sub(p, a)
            const crossSize = k * 3
            return {
                problem: say(`Aurkitu $P${vec(p)}$ puntutik $${vec(a)}+t\\,${vec(u)}$ zuzenerainoko distantzia.`, `Halla la distancia de $P${vec(p)}$ a la recta $${vec(a)}+t\\,${vec(u)}$.`, `أوجد المسافة من $P${vec(p)}$ إلى المستقيم $${vec(a)}+t\\,${vec(u)}$.`, `Find the distance from $P${vec(p)}$ to the line $${vec(a)}+t\\,${vec(u)}$.`),
                lines: [line(LABELS.step, `|\\overrightarrow{AP}\\times\\vec{u}|=${crossSize}`), line(LABELS.step, `d=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\overrightarrow{AP}|}`), line(LABELS.result, `d=\\frac{${crossSize}}{${root(dot(ap, ap))}}`)],
                wrong: 1, error, fix: `d=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}\\ \\to\\ d=\\frac{${crossSize}}{3}=${k}`, right: k, reached: crossSize / Math.sqrt(dot(ap, ap))
            }
        }
        case 'product-norms': {
            const data = skewData(random)
            if (!data) return null
            const { u, v, w, mixed, ww } = data
            const product = Math.sqrt(dot(u, u) * dot(v, v))
            if (Math.abs(product - Math.sqrt(ww)) < 1e-9) return null
            return {
                problem: say(`$r$ zuzena $A${vec(data.a)}$ puntutik, $\\vec{u}=${vec(u)}$ norabidearekin; $s$ zuzena $B${vec(data.b)}$ puntutik, $\\vec{v}=${vec(v)}$ norabidearekin. Aurkitu distantzia.`, `$r$ por $A${vec(data.a)}$ con $\\vec{u}=${vec(u)}$; $s$ por $B${vec(data.b)}$ con $\\vec{v}=${vec(v)}$. Halla la distancia.`, `$r$ يمر بـ $A${vec(data.a)}$ و$\\vec{u}=${vec(u)}$؛ $s$ يمر بـ $B${vec(data.b)}$ و$\\vec{v}=${vec(v)}$. أوجد المسافة.`, `$r$ through $A${vec(data.a)}$ with $\\vec{u}=${vec(u)}$; $s$ through $B${vec(data.b)}$ with $\\vec{v}=${vec(v)}$. Find the distance.`),
                lines: [line(LABELS.step, `[\\overrightarrow{AB},\\vec{u},\\vec{v}]=${mixed}`), line(LABELS.step, `\\vec{u}\\times\\vec{v}=${vec(w)}`), line(LABELS.result, `d=\\frac{${Math.abs(mixed)}}{${root(dot(u, u))}\\,${root(dot(v, v))}}`)],
                wrong: 2, error, fix: `d=\\frac{${Math.abs(mixed)}}{|\\vec{u}\\times\\vec{v}|}\\ \\to\\ \\frac{${Math.abs(mixed)}}{${root(ww)}}`, right: Math.abs(mixed) / Math.sqrt(ww), reached: Math.abs(mixed) / product
            }
        }
        case 'divide-ab': {
            const data = skewData(random)
            if (!data) return null
            const { u, v, w, ab, mixed, ww } = data
            if (Math.abs(dot(ab, ab) - ww) === 0) return null
            return {
                problem: say(`$r$ zuzena $A${vec(data.a)}$ puntutik, $\\vec{u}=${vec(u)}$ norabidearekin; $s$ zuzena $B${vec(data.b)}$ puntutik, $\\vec{v}=${vec(v)}$ norabidearekin. Aurkitu distantzia.`, `$r$ por $A${vec(data.a)}$ con $\\vec{u}=${vec(u)}$; $s$ por $B${vec(data.b)}$ con $\\vec{v}=${vec(v)}$. Halla la distancia.`, `$r$ يمر بـ $A${vec(data.a)}$ و$\\vec{u}=${vec(u)}$؛ $s$ يمر بـ $B${vec(data.b)}$ و$\\vec{v}=${vec(v)}$. أوجد المسافة.`, `$r$ through $A${vec(data.a)}$ with $\\vec{u}=${vec(u)}$; $s$ through $B${vec(data.b)}$ with $\\vec{v}=${vec(v)}$. Find the distance.`),
                lines: [line(LABELS.step, `\\vec{u}\\times\\vec{v}=${vec(w)}`), line(LABELS.step, `[\\overrightarrow{AB},\\vec{u},\\vec{v}]=${mixed}`), line(LABELS.result, `d=\\frac{${Math.abs(mixed)}}{|\\overrightarrow{AB}|}=\\frac{${Math.abs(mixed)}}{${root(dot(ab, ab))}}`)],
                wrong: 2, error, fix: `d=\\frac{${Math.abs(mixed)}}{|\\vec{u}\\times\\vec{v}|}\\ \\to\\ \\frac{${Math.abs(mixed)}}{${root(ww)}}`, right: Math.abs(mixed) / Math.sqrt(ww), reached: Math.abs(mixed) / Math.sqrt(dot(ab, ab))
            }
        }
        case 'parallel-formula': {
            const data = skewData(random)
            if (!data) return null
            const { u, v, w, ab, mixed, ww } = data
            const c = cross(ab, u)
            const reached = Math.sqrt(dot(c, c) / dot(u, u))
            return {
                problem: say(`$r$ zuzena $A${vec(data.a)}$ puntutik, $\\vec{u}=${vec(u)}$ norabidearekin; $s$ zuzena $B${vec(data.b)}$ puntutik, $\\vec{v}=${vec(v)}$ norabidearekin. Aurkitu distantzia.`, `$r$ por $A${vec(data.a)}$ con $\\vec{u}=${vec(u)}$; $s$ por $B${vec(data.b)}$ con $\\vec{v}=${vec(v)}$. Halla la distancia.`, `$r$ يمر بـ $A${vec(data.a)}$ و$\\vec{u}=${vec(u)}$؛ $s$ يمر بـ $B${vec(data.b)}$ و$\\vec{v}=${vec(v)}$. أوجد المسافة.`, `$r$ through $A${vec(data.a)}$ with $\\vec{u}=${vec(u)}$; $s$ through $B${vec(data.b)}$ with $\\vec{v}=${vec(v)}$. Find the distance.`),
                lines: [line(LABELS.step, `\\vec{u}\\times\\vec{v}=${vec(w)}`), line(LABELS.step, `d=\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}`), line(LABELS.result, `d=\\frac{${root(dot(c, c))}}{${root(dot(u, u))}}`)],
                wrong: 1, error, fix: `[\\overrightarrow{AB},\\vec{u},\\vec{v}]=${mixed}\\ \\to\\ d=\\frac{${Math.abs(mixed)}}{${root(ww)}}`, right: Math.abs(mixed) / Math.sqrt(ww), reached
            }
        }
        case 'mediator-endpoint': {
            const a = small(random, 2)
            const half = small(random, 1)
            if (nonZeroCount(half) < 2) return null
            const b = tidy(add(a, scale(2, half)))
            // The normal is half of AB, so that the plane stays short
            const n = half
            const middle = tidy(add(a, half))
            const right = -dot(n, middle) + 0
            const reached = -dot(n, a) + 0
            return {
                problem: say(`Aurkitu $A${vec(a)}$ eta $B${vec(b)}$ puntuen plano erdikaria.`, `Halla el plano mediador de $A${vec(a)}$ y $B${vec(b)}$.`, `أوجد المستوى المنصِّف لـ $A${vec(a)}$ و$B${vec(b)}$.`, `Find the mediator plane of $A${vec(a)}$ and $B${vec(b)}$.`),
                lines: [line(LABELS.step, `\\begin{gathered}\\overrightarrow{AB}=${vec(tidy(sub(b, a)))}\\\\ \\vec{n}=${vec(n)}\\end{gathered}`), line(LABELS.step, `D=-\\vec{n}\\cdot A=${reached}`), line(LABELS.result, planeLatex({ normal: n, D: reached }))],
                wrong: 1, error, fix: `M=${vec(middle)}\\ \\to\\ D=-\\vec{n}\\cdot M=${right}\\ \\to\\ ${planeLatex({ normal: n, D: right })}`, right, reached
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createDistancesDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, distancesDetectiveLevels[levelIndex], DISTANCES_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

/** For the tests: every mistake builds a case */
export const buildDistancesDetectiveCase = build
