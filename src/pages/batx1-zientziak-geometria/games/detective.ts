import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import { fraction, toLatex } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { continuousLatex, explicitLatex, generalLatex, lineThrough, parametricLatex, type Line, type Point } from './lines.ts'

/* ==========================================================================
   J4 · Zuzenen detektibea (Detective de rectas): a worked solution of
   three lines with one wrong line, the mistakes of this unit. Level 1,
   the equations: the normal taken as the direction, the slope without
   its minus, the point with its signs changed and the slope upside down.
   Level 2, positions and angles: A and B swapped without a sign, the
   coincident lines taken as parallel, the obtuse angle and −m as the
   perpendicular slope. Level 3, distances and triangles: no square root,
   two parallels not made equal, the centroid divided by 2 and the foot
   taken as the reflection. `right` and `reached` only tell the cases
   apart.
   ========================================================================== */

export type BachGeometryDetectiveError =
    | 'normal-direction'
    | 'slope-sign'
    | 'point-sign'
    | 'slope-inverted'
    | 'perpendicular-swap'
    | 'coincident-missed'
    | 'obtuse-angle'
    | 'slope-opposite'
    | 'no-root'
    | 'not-equalised'
    | 'centroid-half'
    | 'foot-as-image'

export const bachGeometryDetectiveLevels: BachGeometryDetectiveError[][] = [
    ['normal-direction', 'slope-sign', 'point-sign', 'slope-inverted'],
    ['perpendicular-swap', 'coincident-missed', 'obtuse-angle', 'slope-opposite'],
    ['no-root', 'not-equalised', 'centroid-half', 'foot-as-image']
]

export const BACH_GEOMETRY_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value))
const pair = ([x, y]: Point) => `(${x},${y})`
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const bachGeometryDetectiveNames: Record<BachGeometryDetectiveError, LocalizedText> = {
    'normal-direction': say('Bektore normala norabide-bektoretzat hartu du', 'Tomó el vector normal como director', 'أخذ المتجه الناظمي متجه توجيه', 'Took the normal vector as the direction vector'),
    'slope-sign': say('Maldaren minus zeinua ahaztu du', 'Olvidó el signo menos de la pendiente', 'نسي إشارة السالب في الميل', 'Forgot the minus sign of the slope'),
    'point-sign': say('Puntuaren koordenatuak zeinu okerrarekin jarri ditu', 'Puso las coordenadas del punto con el signo cambiado', 'وضع إحداثيي النقطة بإشارة معكوسة', 'Wrote the coordinates of the point with the wrong sign'),
    'slope-inverted': say('Malda alderantziz kalkulatu du', 'Calculó la pendiente al revés', 'حسب الميل مقلوبًا', 'Worked out the slope upside down'),
    'perpendicular-swap': say('A eta B trukatu ditu zeinurik aldatu gabe', 'Intercambió A y B sin cambiar ningún signo', 'بدّل A وB دون تغيير أي إشارة', 'Swapped A and B without changing a sign'),
    'coincident-missed': say('Gai askeak ez ditu konparatu: zuzenak bat datoz', 'No comparó los términos independientes: las rectas coinciden', 'لم يقارن الحدين الثابتين: المستقيمان منطبقان', 'Did not compare the constant terms: the lines coincide'),
    'obtuse-angle': say('Balio absolutua ahaztu du, eta angelu kamutsa hartu du', 'Olvidó el valor absoluto y tomó el ángulo obtuso', 'نسي القيمة المطلقة فأخذ الزاوية المنفرجة', 'Forgot the absolute value and took the obtuse angle'),
    'slope-opposite': say('Malda perpendikularra −m dela uste du', 'Tomó −m como pendiente perpendicular', 'أخذ −m ميلًا للعمودي', 'Took −m as the perpendicular slope'),
    'no-root': say('A² + B² zenbakiaz zatitu du, erroa atera gabe', 'Dividió entre A² + B² sin sacar la raíz', 'قسم على A² + B² دون الجذر', 'Divided by A² + B² without the square root'),
    'not-equalised': say('C eta C′ kendu ditu, koefizienteak lehenik berdindu gabe', 'Restó C y C′ sin igualar antes los coeficientes', 'طرح C وC′ دون مساواة المعاملات أولًا', 'Subtracted C and C′ without making the coefficients equal first'),
    'centroid-half': say('Erpinen batura bitan zatitu du, ez hirutan', 'Dividió la suma de los vértices entre 2, no entre 3', 'قسم مجموع الرؤوس على 2 لا على 3', 'Divided the sum of the vertices by 2, not by 3'),
    'foot-as-image': say('Perpendikularraren oina simetrikotzat hartu du', 'Tomó el pie de la perpendicular como simétrico', 'أخذ موقع العمود على أنه النظير', 'Took the foot of the perpendicular as the reflection')
}

export const bachGeometryDetectiveTips: Record<BachGeometryDetectiveError, LocalizedText> = {
    'normal-direction': say('$Ax+By+C=0$ zuzenean, normala $(A,B)$ da eta norabidea $(-B,A)$.', 'En $Ax+By+C=0$, el normal es $(A,B)$ y el director $(-B,A)$.', 'في $Ax+By+C=0$ الناظمي $(A,B)$ والتوجيه $(-B,A)$.', 'In $Ax+By+C=0$, the normal is $(A,B)$ and the direction $(-B,A)$.'),
    'slope-sign': say('Askatu $y$: $m=-\\frac{A}{B}$.', 'Despeja $y$: $m=-\\frac{A}{B}$.', 'اعزل $y$: ‏$m=-\\frac{A}{B}$.', 'Solve for $y$: $m=-\\frac{A}{B}$.'),
    'point-sign': say('$\\frac{x-x_0}{a}=\\frac{y-y_0}{b}$: puntua minus zeinuarekin doa.', '$\\frac{x-x_0}{a}=\\frac{y-y_0}{b}$: el punto va restando.', '$\\frac{x-x_0}{a}=\\frac{y-y_0}{b}$: النقطة تُطرح.', '$\\frac{x-x_0}{a}=\\frac{y-y_0}{b}$: the point is subtracted.'),
    'slope-inverted': say('$m=\\frac{y_2-y_1}{x_2-x_1}$: $y$ goian, $x$ behean.', '$m=\\frac{y_2-y_1}{x_2-x_1}$: la $y$ arriba y la $x$ abajo.', '$m=\\frac{y_2-y_1}{x_2-x_1}$: ‏$y$ في البسط و$x$ في المقام.', '$m=\\frac{y_2-y_1}{x_2-x_1}$: $y$ on top and $x$ below.'),
    'perpendicular-swap': say('Perpendikularra: $Bx-Ay+k=0$, trukatu eta zeinu bat aldatu.', 'Perpendicular: $Bx-Ay+k=0$, se intercambian y cambia un signo.', 'العمودي: $Bx-Ay+k=0$ بالتبديل وتغيير إشارة.', 'Perpendicular: $Bx-Ay+k=0$, swap them and change one sign.'),
    'coincident-missed': say('Hiru arrazoiak berdinak badira, zuzenak bat datoz.', 'Si las tres razones son iguales, las rectas coinciden.', 'إذا تساوت النسب الثلاث فالمستقيمان منطبقان.', 'If the three ratios are equal, the lines coincide.'),
    'obtuse-angle': say('$\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$: bi zuzenen angelua zorrotza da.', '$\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$: el ángulo de dos rectas es agudo.', '$\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$: زاوية مستقيمين حادة.', '$\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$: the angle of two lines is acute.'),
    'slope-opposite': say('Perpendikularrak: $m\\cdot m\'=-1$, beraz $m\'=-\\frac{1}{m}$.', 'Perpendiculares: $m\\cdot m\'=-1$, así que $m\'=-\\frac{1}{m}$.', 'متعامدان: $m\\cdot m\'=-1$ إذن $m\'=-\\frac{1}{m}$.', 'Perpendicular: $m\\cdot m\'=-1$, so $m\'=-\\frac{1}{m}$.'),
    'no-root': say('$d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$: erroarekin.', '$d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$: con la raíz.', '$d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$: مع الجذر.', '$d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$: with the root.'),
    'not-equalised': say('Lehenik, idatzi bi zuzenak $A$ eta $B$ berberekin.', 'Primero escribe las dos rectas con los mismos $A$ y $B$.', 'اكتب المستقيمين أولًا بـ $A$ و$B$ نفسيهما.', 'First write both lines with the same $A$ and $B$.'),
    'centroid-half': say('$G=\\frac{A+B+C}{3}$: hiru erpinen batez bestekoa.', '$G=\\frac{A+B+C}{3}$: la media de los tres vértices.', '$G=\\frac{A+B+C}{3}$: متوسط الرؤوس الثلاثة.', '$G=\\frac{A+B+C}{3}$: the mean of the three vertices.'),
    'foot-as-image': say('Oina, $M$, erdiko puntua da: $P\'=2M-P$.', 'El pie $M$ es el punto medio: $P\'=2M-P$.', 'الموقع $M$ هو المنتصف: $P\'=2M-P$.', 'The foot $M$ is the midpoint: $P\'=2M-P$.')
}

type Built = Omit<WorkedCase<BachGeometryDetectiveError>, 'options'>

/** «… of r: Ax + By + C = 0» problems */
const named = (name: string, latex: string) => `$${name}$: $${latex}$`
const DIRECTIONS: Point[] = [[1, 2], [2, 1], [1, -2], [2, -1], [1, 3], [3, 1], [3, -1], [1, -3], [2, 3], [3, 2], [2, -3], [3, -2]]
const randomPoint = (random: Random, limit = 4): Point => [randomInt(random, -limit, limit), randomInt(random, -limit, limit)]
/** Normal vectors with a whole length */
const PYTHAGOREAN: Array<[number, number, number]> = [[3, 4, 5], [4, 3, 5], [3, -4, 5], [4, -3, 5], [5, 12, 13], [12, -5, 13]]

function build(random: Random, error: BachGeometryDetectiveError): Built | null {
    switch (error) {
        case 'normal-direction': {
            const point = randomPoint(random)
            const [a, b] = pick(random, DIRECTIONS)
            const r = lineThrough(point, [a, b])
            if (-r.B === r.A) return null
            const wrongDirection: Point = [r.A, r.B]
            return {
                problem: say(`Idatzi ${named('r', generalLatex(r))} zuzenaren ekuazio parametrikoak.`, `Escribe las ecuaciones paramétricas de ${named('r', generalLatex(r))}.`, `اكتب المعادلتين الوسيطيتين لـ ${named('r', generalLatex(r))}.`, `Write the parametric equations of ${named('r', generalLatex(r))}.`),
                lines: [line(LABELS.step, `\\vec{d}=${pair(wrongDirection)}`), line(LABELS.step, `P${pair(point)}`), line(LABELS.result, parametricLatex(point, wrongDirection))],
                wrong: 0, error, fix: `\\vec{d}=(-B,A)=${pair([-r.B, r.A])}`, right: -r.B, reached: r.A
            }
        }
        case 'slope-sign': {
            const [a, b] = pick(random, DIRECTIONS)
            const r = lineThrough(randomPoint(random), [a, b])
            const right = fraction(-r.A, r.B)
            const reached = fraction(r.A, r.B)
            return {
                problem: say(`Aurkitu ${named('r', generalLatex(r))} zuzenaren malda.`, `Halla la pendiente de ${named('r', generalLatex(r))}.`, `أوجد ميل ${named('r', generalLatex(r))}.`, `Find the slope of ${named('r', generalLatex(r))}.`),
                lines: [line(LABELS.data, `A=${r.A}\\qquad B=${r.B}`), line(LABELS.step, `m=\\frac{A}{B}=\\frac{${r.A}}{${r.B}}`), line(LABELS.result, `m=${toLatex(reached)}`)],
                wrong: 1, error, fix: `m=-\\frac{A}{B}=${toLatex(right)}`, right: right.numerator / right.denominator, reached: reached.numerator / reached.denominator
            }
        }
        case 'point-sign': {
            const point = randomPoint(random)
            const direction = pick(random, DIRECTIONS)
            if (point[0] === 0 || point[1] === 0) return null
            const right = lineThrough(point, direction)
            const reached = lineThrough([-point[0], -point[1]], direction)
            if (right.C === reached.C) return null
            return {
                problem: say(`Idatzi $P${pair(point)}$ puntutik $\\vec{d}=${pair(direction)}$ norabidean doan zuzenaren ekuazio orokorra.`, `Escribe la ecuación general de la recta que pasa por $P${pair(point)}$ con vector director $\\vec{d}=${pair(direction)}$.`, `اكتب المعادلة العامة للمستقيم المار بـ $P${pair(point)}$ بمتجه التوجيه $\\vec{d}=${pair(direction)}$.`, `Write the general equation of the line through $P${pair(point)}$ with direction vector $\\vec{d}=${pair(direction)}$.`),
                lines: [line(LABELS.data, `P${pair(point)}\\qquad\\vec{d}=${pair(direction)}`), line(LABELS.step, continuousLatex([-point[0], -point[1]], direction)), line(LABELS.result, generalLatex(reached))],
                wrong: 1, error, fix: `${continuousLatex(point, direction)}\\ \\to\\ ${generalLatex(right)}`, right: right.C, reached: reached.C
            }
        }
        case 'slope-inverted': {
            const a = randomPoint(random)
            const dx = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
            const dy = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
            if (Math.abs(dx) === Math.abs(dy)) return null
            const b: Point = [a[0] + dx, a[1] + dy]
            const right = fraction(dy, dx)
            const reached = fraction(dx, dy)
            return {
                problem: say(`Aurkitu $A${pair(a)}$ eta $B${pair(b)}$ puntuetatik pasatzen den zuzenaren malda.`, `Halla la pendiente de la recta que pasa por $A${pair(a)}$ y $B${pair(b)}$.`, `أوجد ميل المستقيم المار بـ $A${pair(a)}$ و$B${pair(b)}$.`, `Find the slope of the line through $A${pair(a)}$ and $B${pair(b)}$.`),
                lines: [line(LABELS.step, `\\overrightarrow{AB}=${pair([dx, dy])}`), line(LABELS.step, `m=\\frac{${dx}}{${dy}}`), line(LABELS.result, `m=${toLatex(reached)}`)],
                wrong: 1, error, fix: `m=\\frac{${dy}}{${dx}}=${toLatex(right)}`, right: right.numerator / right.denominator, reached: reached.numerator / reached.denominator
            }
        }
        case 'perpendicular-swap': {
            const direction = pick(random, DIRECTIONS)
            const r = lineThrough(randomPoint(random, 3), direction)
            const p = randomPoint(random, 3)
            const reached = -(r.B * p[0] + r.A * p[1])
            const right = -(r.B * p[0] - r.A * p[1])
            if (reached === right) return null
            const swapped = generalLatex({ A: r.B, B: r.A, C: 0 }).replace('=0', '')
            return {
                problem: say(`Aurkitu $P${pair(p)}$ puntutik pasatzen den ${named('r', generalLatex(r))} zuzenaren perpendikularra.`, `Halla la perpendicular a ${named('r', generalLatex(r))} que pasa por $P${pair(p)}$.`, `أوجد العمودي على ${named('r', generalLatex(r))} المار بـ $P${pair(p)}$.`, `Find the perpendicular to ${named('r', generalLatex(r))} through $P${pair(p)}$.`),
                lines: [line(LABELS.step, `${swapped}+k=0`), line(LABELS.step, `k=${reached}`), line(LABELS.result, generalLatex({ A: r.B, B: r.A, C: reached }))],
                wrong: 0, error, fix: `${generalLatex({ A: r.B, B: -r.A, C: 0 }).replace('=0', '')}+k=0\\ \\to\\ k=${right}`, right, reached
            }
        }
        case 'coincident-missed': {
            const r = lineThrough(randomPoint(random, 3), pick(random, DIRECTIONS))
            if (r.C === 0) return null
            const k = pick(random, [2, 3, -2])
            const s: Line = { A: k * r.A, B: k * r.B, C: k * r.C }
            const ratio = toLatex(fraction(1, k))
            return {
                problem: say(`Aztertu ${named('r', generalLatex(r))} eta ${named('s', generalLatex(s))} zuzenen posizio erlatiboa.`, `Estudia la posición relativa de ${named('r', generalLatex(r))} y ${named('s', generalLatex(s))}.`, `ادرس الوضع النسبي لـ ${named('r', generalLatex(r))} و${named('s', generalLatex(s))}.`, `Study the relative position of ${named('r', generalLatex(r))} and ${named('s', generalLatex(s))}.`),
                lines: [line(LABELS.step, `\\frac{${r.A}}{${s.A}}=\\frac{${r.B}}{${s.B}}=${ratio}`), line(LABELS.step, `\\frac{${r.C}}{${s.C}}=${ratio}`), line(LABELS.result, 'r\\parallel s')],
                wrong: 2, error, fix: `\\frac{${r.A}}{${s.A}}=\\frac{${r.B}}{${s.B}}=\\frac{${r.C}}{${s.C}}\\ \\to\\ r=s`, right: 0, reached: 1
            }
        }
        case 'obtuse-angle': {
            const [a, b] = pick(random, [[1, 0], [0, 1], [1, 2], [2, 1], [1, -2], [2, -1], [1, 1], [1, -1]] as Point[])
            const n2: Point = [-a - b, a - b]
            const r: Line = { A: a, B: b, C: randomInt(random, -5, 5) }
            const s: Line = { A: n2[0], B: n2[1], C: randomInt(random, -5, 5) }
            const dot = a * n2[0] + b * n2[1]
            if (dot >= 0) return null
            const square = (p: Point) => p[0] * p[0] + p[1] * p[1]
            return {
                problem: say(`Aurkitu ${named('r', generalLatex(r))} eta ${named('s', generalLatex(s))} zuzenen angelua.`, `Halla el ángulo de ${named('r', generalLatex(r))} y ${named('s', generalLatex(s))}.`, `أوجد الزاوية بين ${named('r', generalLatex(r))} و${named('s', generalLatex(s))}.`, `Find the angle between ${named('r', generalLatex(r))} and ${named('s', generalLatex(s))}.`),
                lines: [line(LABELS.step, `\\vec{n}_r\\cdot\\vec{n}_s=${dot}`), line(LABELS.step, `\\cos\\alpha=\\frac{${dot}}{\\sqrt{${square([a, b])}}\\cdot\\sqrt{${square(n2)}}}=-\\frac{\\sqrt{2}}{2}`), line(LABELS.result, '\\alpha=135^\\circ')],
                wrong: 1, error, fix: `\\cos\\alpha=\\frac{|${dot}|}{\\sqrt{${square([a, b])}}\\cdot\\sqrt{${square(n2)}}}=\\frac{\\sqrt{2}}{2}\\ \\to\\ \\alpha=45^\\circ`, right: 45, reached: 135
            }
        }
        case 'slope-opposite': {
            const m = pick(random, [fraction(2), fraction(3), fraction(-2), fraction(-3), fraction(1, 2), fraction(-1, 3), fraction(2, 3), fraction(-3, 4)])
            const n = randomInt(random, -5, 5)
            const opposite = fraction(-m.numerator, m.denominator)
            const right = fraction(-m.denominator, m.numerator)
            const given = explicitLatex({ A: -m.numerator, B: m.denominator, C: -n * m.denominator })
            const perpendicular = explicitLatex({ A: -opposite.numerator, B: opposite.denominator, C: 0 })
            return {
                problem: say(`Aurkitu jatorritik pasatzen den $${given}$ zuzenaren perpendikularra.`, `Halla la perpendicular a $${given}$ que pasa por el origen.`, `أوجد العمودي على $${given}$ المار بالأصل.`, `Find the perpendicular to $${given}$ through the origin.`),
                lines: [line(LABELS.data, `m=${toLatex(m)}`), line(LABELS.step, `m'=${toLatex(opposite)}`), line(LABELS.result, perpendicular)],
                wrong: 1, error, fix: `m'=-\\frac{1}{m}=${toLatex(right)}`, right: right.numerator / right.denominator, reached: opposite.numerator / opposite.denominator
            }
        }
        case 'no-root': {
            const [A, B, length] = pick(random, PYTHAGOREAN)
            const p = randomPoint(random, 3)
            const k = randomInt(random, 1, 3)
            const value = pick(random, [1, -1]) * k * length
            const C = value - (A * p[0] + B * p[1])
            if (C === 0 || Math.abs(C) > 40) return null
            const r: Line = { A, B, C }
            const constant = C < 0 ? `${C}` : `+${C}`
            return {
                problem: say(`Aurkitu $P${pair(p)}$ puntutik ${named('r', generalLatex(r))} zuzenerako distantzia.`, `Halla la distancia de $P${pair(p)}$ a ${named('r', generalLatex(r))}.`, `أوجد المسافة من $P${pair(p)}$ إلى ${named('r', generalLatex(r))}.`, `Find the distance from $P${pair(p)}$ to ${named('r', generalLatex(r))}.`),
                lines: [line(LABELS.step, `${A}\\cdot ${wrap(p[0])}${B < 0 ? '' : '+'}${B}\\cdot ${wrap(p[1])}${constant}=${value}`), line(LABELS.step, `d=\\frac{|${value}|}{${A * A}+${B * B}}`), line(LABELS.result, `d=${toLatex(fraction(Math.abs(value), length * length))}`)],
                wrong: 1, error, fix: `d=\\frac{|${value}|}{\\sqrt{${A * A}+${B * B}}}=\\frac{${Math.abs(value)}}{${length}}=${k}`, right: k, reached: Math.abs(value) / (length * length)
            }
        }
        case 'not-equalised': {
            const [A, B, length] = pick(random, PYTHAGOREAN)
            const c1 = randomInt(random, -8, 8)
            const c2 = randomInt(random, -16, 16)
            const right = Math.abs(2 * c1 - c2) / (2 * length)
            const reached = Math.abs(c1 - c2) / length
            if (2 * c1 === c2 || Math.abs(right - reached) < 1e-9) return null
            const r: Line = { A, B, C: c1 }
            const s: Line = { A: 2 * A, B: 2 * B, C: c2 }
            const half = toLatex(fraction(c2, 2))
            return {
                problem: say(`Aurkitu ${named('r', generalLatex(r))} eta ${named('s', generalLatex(s))} zuzen paraleloen arteko distantzia.`, `Halla la distancia entre las paralelas ${named('r', generalLatex(r))} y ${named('s', generalLatex(s))}.`, `أوجد المسافة بين المتوازيين ${named('r', generalLatex(r))} و${named('s', generalLatex(s))}.`, `Find the distance between the parallels ${named('r', generalLatex(r))} and ${named('s', generalLatex(s))}.`),
                lines: [line(LABELS.step, `d=\\frac{|C-C'|}{\\sqrt{A^2+B^2}}`), line(LABELS.step, `d=\\frac{|${c1}-${wrap(c2)}|}{${length}}`), line(LABELS.result, `d=${toLatex(fraction(Math.abs(c1 - c2), length))}`)],
                wrong: 0, error, fix: `C'=${half}\\ \\to\\ d=\\frac{|${c1}-${c2 < 0 ? `(${half})` : half}|}{${length}}=${toLatex(fraction(Math.abs(2 * c1 - c2), 2 * length))}`, right, reached
            }
        }
        case 'centroid-half': {
            const a = randomPoint(random)
            const b = randomPoint(random)
            const c = randomPoint(random)
            const sum: Point = [a[0] + b[0] + c[0], a[1] + b[1] + c[1]]
            if (sum[0] % 3 !== 0 || sum[1] % 3 !== 0 || sum[0] === 0) return null
            const half = `\\left(${toLatex(fraction(sum[0], 2))},${toLatex(fraction(sum[1], 2))}\\right)`
            return {
                problem: say(`Aurkitu $A${pair(a)}$, $B${pair(b)}$ eta $C${pair(c)}$ triangeluaren barizentroa.`, `Halla el baricentro del triángulo $A${pair(a)}$, $B${pair(b)}$, $C${pair(c)}$.`, `أوجد مركز ثقل المثلث $A${pair(a)}$ و$B${pair(b)}$ و$C${pair(c)}$.`, `Find the centroid of the triangle $A${pair(a)}$, $B${pair(b)}$, $C${pair(c)}$.`),
                lines: [line(LABELS.step, `A+B+C=${pair(sum)}`), line(LABELS.step, `G=\\frac{1}{2}${pair(sum)}`), line(LABELS.result, `G=${half}`)],
                wrong: 1, error, fix: `G=\\frac{1}{3}${pair(sum)}=${pair([sum[0] / 3, sum[1] / 3])}`, right: sum[0] / 3, reached: sum[0] / 2
            }
        }
        case 'foot-as-image': {
            const [A, B] = pick(random, [[1, 1], [1, -1], [1, 2], [2, 1], [1, -2], [2, -1]] as Point[])
            const foot = randomPoint(random, 3)
            const C = -(A * foot[0] + B * foot[1])
            const k = pick(random, [1, -1])
            const p: Point = [foot[0] + k * A, foot[1] + k * B]
            const image: Point = [foot[0] - k * A, foot[1] - k * B]
            const r: Line = { A, B, C }
            return {
                problem: say(`Aurkitu $P${pair(p)}$ puntuaren simetrikoa ${named('r', generalLatex(r))} zuzenarekiko.`, `Halla el simétrico de $P${pair(p)}$ respecto de ${named('r', generalLatex(r))}.`, `أوجد نظير $P${pair(p)}$ بالنسبة إلى ${named('r', generalLatex(r))}.`, `Find the reflection of $P${pair(p)}$ in ${named('r', generalLatex(r))}.`),
                lines: [line(LABELS.step, `(x,y)=${pair(p)}+t${pair([A, B])}`), line(LABELS.step, `t=${-k}\\ \\to\\ M${pair(foot)}`), line(LABELS.result, `P'=M=${pair(foot)}`)],
                wrong: 2, error, fix: `P'=2M-P=${pair(image)}`, right: image[0] * 100 + image[1], reached: foot[0] * 100 + foot[1]
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBachGeometryDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bachGeometryDetectiveLevels[levelIndex], BACH_GEOMETRY_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}
