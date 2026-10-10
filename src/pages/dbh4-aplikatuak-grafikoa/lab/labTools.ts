import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { lineChallenges, slopeChallenges } from '../../dbh2-funtzioak-v2/lab/labTools.ts'
import { interceptsChallenges } from '../../dbh4-aplikatuak-funtzioak/lab/labTools.ts'
import type { Point } from '../functions.ts'
import type { GraphsStageId } from '../lessons.tsx'

/* ==========================================================================
   Funtzio baten grafikoa (4. DBH aplikatuak) laboratory. The line y = mx + n
   and the slope meter come from 2. DBH and the intercepts of x² + bx + c
   from the 4. DBH functions unit, each with its own challenges. The new
   tools: a line through a point with a given slope; a second line against
   y = 2x + 1 (parallel, secant or the same); the parabola y = a(x − p)² + q
   with its vertex and roots; the hyperbola y = k/(x − a) + b with its
   asymptotes; square roots y = ±√(x − a) + b; the exponential y = k·aˣ;
   and the rectangle of fixed perimeter whose area is a parabola. Pure state
   logic; the components live next to this file. Tests in
   tests/grafikoa-dbh4ap-lab.test.ts.
   ========================================================================== */

export type GraphsLabToolId = 'line' | 'slope' | 'point-slope' | 'two-lines' | 'parabola' | 'intercepts' | 'hyperbola' | 'root' | 'exponential' | 'frame'

export interface GraphsLabTool extends LabToolInfo {
    id: GraphsLabToolId
    stage: GraphsStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const clampHalf = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value * 2) / 2))

export const graphsLabTools: GraphsLabTool[] = [
    { id: 'line', stage: 'linear', lessonTopic: 'affine', title: say('Zuzenaren laborategia', 'El laboratorio de la recta', 'مختبر المستقيم'), observe: say('n aldatzean zuzena gora edo behera mugitzen da; m aldatzean, aldapa aldatzen da. n = 0 denean jatorritik pasatzen da, eta m = 0 denean horizontala da.', 'Al cambiar n la recta sube o baja; al cambiar m cambia la inclinación. Con n = 0 pasa por el origen y con m = 0 es horizontal.', 'عند تغيير n يصعد المستقيم أو يهبط، وعند تغيير m يتغير الانحدار. عندما n = 0 يمر بالأصل، وعندما m = 0 يكون أفقيًا.') },
    { id: 'slope', stage: 'lines', lessonTopic: 'slope', title: say('Maldaren neurgailua', 'El medidor de la pendiente', 'مقياس الميل'), observe: say('Mugitu A eta B: Δy zati Δx da malda. Zeinuak norabidea esaten du; Δx = 0 denean zuzena bertikala da.', 'Mueve A y B: la pendiente es Δy entre Δx. El signo dice la dirección; si Δx = 0 la recta es vertical.', 'حرّك A وB: الميل هو Δy ÷ Δx. تدل الإشارة على الاتجاه؛ وعندما Δx = 0 يكون المستقيم رأسيًا.') },
    { id: 'point-slope', stage: 'lines', lessonTopic: 'line-equation', title: say('Puntu bat eta malda bat', 'Un punto y una pendiente', 'نقطة وميل'), observe: say('Puntu batek eta malda batek zuzen bakarra ematen dute. n kalkulatzeko, ordeztu puntua: n = y₀ − m · x₀.', 'Un punto y una pendiente dan una sola recta. Para hallar n, sustituye el punto: n = y₀ − m · x₀.', 'النقطة والميل يحددان مستقيمًا واحدًا. لإيجاد n عوّض النقطة: n = y₀ − m · x₀.') },
    { id: 'two-lines', stage: 'lines', lessonTopic: 'parallel', title: say('Bi zuzen', 'Dos rectas', 'مستقيمان'), observe: say('Malda bera eta n desberdina: paraleloak. Malda desberdina: puntu bakarrean ebakitzen dira. Biak berdinak: zuzen bera.', 'Misma pendiente y distinta n: paralelas. Distinta pendiente: se cortan en un solo punto. Las dos iguales: la misma recta.', 'الميل نفسه وn مختلف: متوازيان. ميل مختلف: يتقاطعان في نقطة واحدة. كلاهما متساويان: المستقيم نفسه.') },
    { id: 'parabola', stage: 'quadratic', lessonTopic: 'shifts', title: say('Parabola eta bere erpina', 'La parábola y su vértice', 'القطع المكافئ ورأسه'), observe: say('a-k forma aldatzen du (zeinua eta irekiera); p eta q aldatzean parabola osoa mugitzen da, eta erpina beti (p, q) da.', 'a cambia la forma (el signo y la abertura); al cambiar p y q se mueve la parábola entera, y el vértice es siempre (p, q).', 'يغير a الشكل (الإشارة والانفتاح)، وعند تغيير p وq يتحرك القطع كله، ويبقى الرأس دائمًا (p, q).') },
    { id: 'intercepts', stage: 'quadratic', lessonTopic: 'vertex', title: say('Parabola baten ebakidurak', 'Cortes de una parábola', 'تقاطعات قطع مكافئ'), observe: say('c-k Y ardatzeko ebakidura mugitzen du. X ardatza 0, 1 edo 2 aldiz ebaki daiteke: b² − 4c zeinuaren araberakoa da.', 'c mueve el corte con el eje Y. El eje X se puede cortar 0, 1 o 2 veces: depende del signo de b² − 4c.', 'يحرّك c التقاطع مع محور Y. ويمكن قطع محور X مرة أو مرتين أو عدم قطعه: يتوقف ذلك على إشارة ⁦b² − 4c⁩.') },
    { id: 'hyperbola', stage: 'inverse', lessonTopic: 'asymptotes', title: say('Hiperbola eta asintotak', 'La hipérbola y sus asíntotas', 'القطع الزائد ومقارباه'), observe: say('k-ren zeinuak adarrak zein koadrantetan dauden esaten du. a eta b aldatzean asintotak mugitzen dira: x = a eta y = b.', 'El signo de k dice en qué cuadrantes están las ramas. Al cambiar a y b se mueven las asíntotas: x = a e y = b.', 'تدل إشارة k على الربعين اللذين فيهما الفرعان. وعند تغيير a وb يتحرك المقاربان: x = a وy = b.') },
    { id: 'root', stage: 'inverse', lessonTopic: 'radical', title: say('Erro karratuak', 'Raíces cuadradas', 'الجذور التربيعية'), observe: say('Grafikoa (a, b) puntuan hasten da, errokizuna 0 denean. Izate-eremua [a, +∞) da; zeinuak gora edo behera doan esaten du.', 'La gráfica empieza en (a, b), donde lo de dentro vale 0. El dominio es [a, +∞); el signo dice si va hacia arriba o hacia abajo.', 'يبدأ البيان من (a, b) حيث ينعدم ما تحت الجذر. المجال [a, +∞)، والإشارة تدل على اتجاهه إلى الأعلى أو الأسفل.') },
    { id: 'exponential', stage: 'exponential', lessonTopic: 'exponential', title: say('Funtzio esponentziala', 'La función exponencial', 'الدالة الأسية'), observe: say('k Y ardatzeko ebakidura da. a > 1 bada gorakorra da eta 0 < a < 1 bada beherakorra; x unitate bat aurreratzean, y a aldiz biderkatzen da.', 'k es el corte con el eje Y. Si a > 1 es creciente y si 0 < a < 1, decreciente; al avanzar x una unidad, y se multiplica por a.', 'k هو التقاطع مع محور Y. إذا كان a > 1 فهي متزايدة، وإذا كان 0 < a < 1 فمتناقصة؛ وعندما يتقدم x وحدة تُضرب y في a.') },
    { id: 'frame', stage: 'exponential', lessonTopic: 'models', title: say('Azalera handieneko laukizuzena', 'El rectángulo de área máxima', 'المستطيل ذو المساحة العظمى'), observe: say('Perimetroa finkoa da: oinarria handitzean altuera txikitzen da. Azalera parabola bat da, eta maximoa karratua denean lortzen da.', 'El perímetro es fijo: al crecer la base, la altura disminuye. El área es una parábola y el máximo se alcanza cuando es un cuadrado.', 'المحيط ثابت: كلما زادت القاعدة نقص الارتفاع. المساحة قطع مكافئ، وتبلغ أقصاها عندما يكون المستطيل مربعًا.') }
]

export const graphsLabToolForTopic: Record<string, GraphsLabToolId | undefined> = {
    proportional: 'line',
    affine: 'line',
    'linear-models': 'line',
    slope: 'slope',
    'line-equation': 'point-slope',
    parallel: 'two-lines',
    parabola: 'parabola',
    vertex: 'parabola',
    shifts: 'parabola',
    inverse: 'hyperbola',
    asymptotes: 'hyperbola',
    radical: 'root',
    exponential: 'exponential',
    growth: 'exponential',
    models: 'frame'
}

/* ---------- 1. A point and a slope ---------- */

export const POINT_LIMIT = 5
export const SLOPE_STEP_LIMIT = 4

export interface PointSlopeState {
    x0: number
    y0: number
    /** Slope in half steps */
    m: number
}

export const initialPointSlopeState: PointSlopeState = { x0: 0, y0: 0, m: 1 }

export const setPointSlope = (state: PointSlopeState, patch: Partial<PointSlopeState>): PointSlopeState => ({
    x0: clamp(patch.x0 ?? state.x0, -POINT_LIMIT, POINT_LIMIT),
    y0: clamp(patch.y0 ?? state.y0, -POINT_LIMIT, POINT_LIMIT),
    m: clampHalf(patch.m ?? state.m, -SLOPE_STEP_LIMIT, SLOPE_STEP_LIMIT)
})

/** The ordinate at the origin: n = y₀ − m·x₀ */
export const interceptOf = ({ x0, y0, m }: PointSlopeState) => y0 - m * x0

export const pointSlopeChallenges: LabChallenge<PointSlopeState>[] = [
    { id: 57101, prompt: say('Lortu $(2,\\,-1)$ puntutik pasatzen den eta $m=-2$ malda duen zuzena.', 'Consigue la recta que pasa por $(2,\\,-1)$ con pendiente $m=-2$.', 'اصنع المستقيم المار بـ $(2,\\,-1)$ وميله $m=-2$.'), hint: say('Jarri puntua eta malda; $n=-1+4=3$.', 'Pon el punto y la pendiente; $n=-1+4=3$.', 'ضع النقطة والميل؛ $n=-1+4=3$.'), isSolved: (state) => state.m === -2 && interceptOf(state) === 3 },
    { id: 57102, prompt: say('Lortu $(1,\\,3)$ eta $(3,\\,7)$ puntuetatik pasatzen den zuzena.', 'Consigue la recta que pasa por $(1,\\,3)$ y $(3,\\,7)$.', 'اصنع المستقيم المار بـ $(1,\\,3)$ و$(3,\\,7)$.'), hint: say('Malda: $\\frac{7-3}{3-1}=2$. Jarri bi puntuetako bat.', 'Pendiente: $\\frac{7-3}{3-1}=2$. Pon uno de los dos puntos.', 'الميل: $\\frac{7-3}{3-1}=2$. ضع إحدى النقطتين.'), isSolved: (state) => state.m === 2 && interceptOf(state) === 1 },
    { id: 57103, prompt: say('Lortu $y=3x-1$ zuzenaren paraleloa, $(0,\\,2)$ puntutik pasatzen dena.', 'Consigue la paralela a $y=3x-1$ que pasa por $(0,\\,2)$.', 'اصنع الموازي لـ $y=3x-1$ المار بـ $(0,\\,2)$.'), hint: say('Paraleloek malda bera dute: $m=3$.', 'Las paralelas tienen la misma pendiente: $m=3$.', 'للمتوازيين الميل نفسه: $m=3$.'), isSolved: (state) => state.m === 3 && interceptOf(state) === 2 },
    { id: 57104, prompt: say('Lortu $(-2,\\,1)$ puntutik pasatzen den eta $m=\\frac{1}{2}$ malda duen zuzena.', 'Consigue la recta que pasa por $(-2,\\,1)$ con pendiente $m=\\frac{1}{2}$.', 'اصنع المستقيم المار بـ $(-2,\\,1)$ وميله $m=\\frac{1}{2}$.'), hint: say('$n=1-\\frac{1}{2}\\cdot(-2)=2$', '$n=1-\\frac{1}{2}\\cdot(-2)=2$', '$n=1-\\frac{1}{2}\\cdot(-2)=2$'), isSolved: (state) => state.m === 0.5 && interceptOf(state) === 2 }
]

/* ---------- 2. Two lines ---------- */

/** The fixed line r: y = 2x + 1 */
export const FIXED_LINE = { m: 2, n: 1 } as const
export const LINE_N_LIMIT = 6

export interface TwoLinesState {
    m: number
    n: number
}

export const initialTwoLinesState: TwoLinesState = { m: -1, n: -2 }

export const setTwoLines = (state: TwoLinesState, patch: Partial<TwoLinesState>): TwoLinesState => ({
    m: clampHalf(patch.m ?? state.m, -SLOPE_STEP_LIMIT, SLOPE_STEP_LIMIT),
    n: clamp(patch.n ?? state.n, -LINE_N_LIMIT, LINE_N_LIMIT)
})

export type LinesRelation = { kind: 'secant'; at: Point } | { kind: 'parallel' } | { kind: 'same' }

export function linesRelation({ m, n }: TwoLinesState): LinesRelation {
    if (m === FIXED_LINE.m) return n === FIXED_LINE.n ? { kind: 'same' } : { kind: 'parallel' }
    const x = (n - FIXED_LINE.n) / (FIXED_LINE.m - m)
    return { kind: 'secant', at: [x, FIXED_LINE.m * x + FIXED_LINE.n] }
}

const meetsAt = (state: TwoLinesState, [x, y]: Point) => {
    const relation = linesRelation(state)
    return relation.kind === 'secant' && relation.at[0] === x && relation.at[1] === y
}

export const twoLinesChallenges: LabChallenge<TwoLinesState>[] = [
    { id: 57201, prompt: say('Egin $s$ zuzena $r$-ren paraleloa izan dadin.', 'Haz que la recta $s$ sea paralela a $r$.', 'اجعل المستقيم $s$ موازيًا لـ $r$.'), hint: say('Malda bera, baina beste $n$ bat.', 'La misma pendiente, pero otra $n$.', 'الميل نفسه لكن $n$ أخرى.'), isSolved: (state) => linesRelation(state).kind === 'parallel' },
    { id: 57202, prompt: say('Egin bi zuzenak $(1,\\,3)$ puntuan ebaki daitezen.', 'Haz que las dos rectas se corten en $(1,\\,3)$.', 'اجعل المستقيمين يتقاطعان في $(1,\\,3)$.'), hint: say('$s$-k $(1,\\,3)$ puntutik pasatu behar du: $m+n=3$, $m\\ne 2$ izanik.', '$s$ debe pasar por $(1,\\,3)$: $m+n=3$, con $m\\ne 2$.', 'يجب أن يمر $s$ بـ $(1,\\,3)$: $m+n=3$ مع $m\\ne 2$.'), isSolved: (state) => meetsAt(state, [1, 3]) },
    { id: 57203, prompt: say('Egin bi zuzenak Y ardatzean ebaki daitezen, $s$ beherakorra izanik.', 'Haz que se corten en el eje Y, con $s$ decreciente.', 'اجعلهما يتقاطعان على محور Y، و$s$ متناقص.'), hint: say('$r$-k Y ardatza $(0,\\,1)$ puntuan ebakitzen du.', '$r$ corta al eje Y en $(0,\\,1)$.', 'يقطع $r$ محور Y في $(0,\\,1)$.'), isSolved: (state) => state.m < 0 && meetsAt(state, [0, 1]) },
    { id: 57204, prompt: say('Egin bi zuzenak zuzen bera izan daitezen.', 'Haz que las dos rectas sean la misma.', 'اجعل المستقيمين مستقيمًا واحدًا.'), hint: say('Malda bera eta $n$ bera.', 'La misma pendiente y la misma $n$.', 'الميل نفسه و$n$ نفسها.'), isSolved: (state) => linesRelation(state).kind === 'same' }
]

/* ---------- 3. The parabola y = a(x − p)² + q ---------- */

export const VERTEX_LIMIT = 4
export const A_LIMIT = 2

export interface ParabolaState {
    /** Never 0, in half steps */
    a: number
    p: number
    q: number
}

export const initialParabolaState: ParabolaState = { a: 1, p: 0, q: 0 }

export function setParabola(state: ParabolaState, patch: Partial<ParabolaState>): ParabolaState {
    let a = clampHalf(patch.a ?? state.a, -A_LIMIT, A_LIMIT)
    // a = 0 is not a parabola: skip it in the direction of the change
    if (a === 0) a = state.a > 0 ? -0.5 : 0.5
    return { a, p: clamp(patch.p ?? state.p, -VERTEX_LIMIT, VERTEX_LIMIT), q: clamp(patch.q ?? state.q, -VERTEX_LIMIT, VERTEX_LIMIT) }
}

export const parabolaValue = ({ a, p, q }: ParabolaState, x: number) => a * (x - p) ** 2 + q

/** y = ax² + bx + c, from the vertex form */
export const expandedOf = ({ a, p, q }: ParabolaState) => ({ a, b: -2 * a * p, c: a * p * p + q })

/** Where it meets the X axis, from left to right */
export function parabolaRoots({ a, p, q }: ParabolaState): number[] {
    const square = -q / a
    if (square < 0) return []
    if (square === 0) return [p]
    const root = Math.sqrt(square)
    return [p - root, p + root]
}

export const parabolaChallenges: LabChallenge<ParabolaState>[] = [
    { id: 57301, prompt: say('Lortu $y=x^2-4x+3$ parabola.', 'Consigue la parábola $y=x^2-4x+3$.', 'اصنع القطع $y=x^2-4x+3$.'), hint: say('Erpina: $x=\\frac{4}{2}=2$ eta $y=4-8+3=-1$.', 'Vértice: $x=\\frac{4}{2}=2$ e $y=4-8+3=-1$.', 'الرأس: $x=\\frac{4}{2}=2$ و$y=4-8+3=-1$.'), isSolved: (state) => state.a === 1 && state.p === 2 && state.q === -1 },
    { id: 57302, prompt: say('Lortu maximoa $(-1,\\,3)$ puntuan duen parabola bat.', 'Consigue una parábola con el máximo en $(-1,\\,3)$.', 'اصنع قطعًا قيمته العظمى في $(-1,\\,3)$.'), hint: say('Maximoa: $a<0$.', 'Máximo: $a<0$.', 'قيمة عظمى: $a<0$.'), isSolved: (state) => state.a < 0 && state.p === -1 && state.q === 3 },
    { id: 57303, prompt: say('Lortu $y=x^2$ baino itxiagoa den eta X ardatza ebakitzen ez duen parabola bat.', 'Consigue una parábola más cerrada que $y=x^2$ que no corte al eje X.', 'اصنع قطعًا أضيق من $y=x^2$ لا يقطع محور X.'), hint: say('$|a|>1$, eta erpina ardatzaren alde «okerrean».', '$|a|>1$, y el vértice en el lado «equivocado» del eje.', '$|a|>1$ والرأس في الجهة «الخاطئة» من المحور.'), isSolved: (state) => Math.abs(state.a) > 1 && parabolaRoots(state).length === 0 },
    { id: 57304, prompt: say('Lortu X ardatza $x=3$ puntuan bakarrik ukitzen duen parabola bat.', 'Consigue una parábola que solo toque al eje X en $x=3$.', 'اصنع قطعًا يمس محور X عند $x=3$ فقط.'), hint: say('Erpina X ardatzean egon behar da.', 'El vértice tiene que estar en el eje X.', 'يجب أن يكون الرأس على محور X.'), isSolved: (state) => state.p === 3 && state.q === 0 },
    { id: 57305, prompt: say('Lortu $a=-1$ duen eta X ardatza $x=-1$ eta $x=3$ puntuetan ebakitzen duen parabola.', 'Consigue la parábola con $a=-1$ que corta al eje X en $x=-1$ y $x=3$.', 'اصنع القطع الذي فيه $a=-1$ ويقطع محور X عند $x=-1$ و$x=3$.'), hint: say('Ardatza erdian dago: $x=1$.', 'El eje está en medio: $x=1$.', 'المحور في المنتصف: $x=1$.'), isSolved: (state) => state.a === -1 && parabolaRoots(state).join() === '-1,3' }
]

/* ---------- 4. The hyperbola y = k/(x − a) + b ---------- */

export const K_LIMIT = 8
export const SHIFT_LIMIT = 4

export interface HyperbolaState {
    k: number
    a: number
    b: number
}

export const initialHyperbolaState: HyperbolaState = { k: 1, a: 0, b: 0 }

export function setHyperbola(state: HyperbolaState, patch: Partial<HyperbolaState>): HyperbolaState {
    let k = clamp(patch.k ?? state.k, -K_LIMIT, K_LIMIT)
    if (k === 0) k = state.k > 0 ? -1 : 1
    return { k, a: clamp(patch.a ?? state.a, -SHIFT_LIMIT, SHIFT_LIMIT), b: clamp(patch.b ?? state.b, -SHIFT_LIMIT, SHIFT_LIMIT) }
}

export const hyperbolaAt = ({ k, a, b }: HyperbolaState, x: number): number | null => (x === a ? null : k / (x - a) + b)

export const hyperbolaChallenges: LabChallenge<HyperbolaState>[] = [
    { id: 57401, prompt: say('Lortu $(2,\\,3)$ puntutik pasatzen den $y=\\frac{k}{x}$ hiperbola.', 'Consigue la hipérbola $y=\\frac{k}{x}$ que pasa por $(2,\\,3)$.', 'اصنع القطع $y=\\frac{k}{x}$ المار بـ $(2,\\,3)$.'), hint: say('$k=x\\cdot y$', '$k=x\\cdot y$', '$k=x\\cdot y$'), isSolved: (state) => state.k === 6 && state.a === 0 && state.b === 0 },
    { id: 57402, prompt: say('Jarri adarrak II. eta IV. koadranteetan, ardatzak asintota direla.', 'Pon las ramas en los cuadrantes II y IV, con los ejes como asíntotas.', 'ضع الفرعين في الربعين الثاني والرابع، والمحوران مقاربان.'), hint: say('$k$ negatiboa da.', '$k$ es negativo.', '$k$ سالب.'), isSolved: (state) => state.k < 0 && state.a === 0 && state.b === 0 },
    { id: 57403, prompt: say('Eraman asintotak $x=2$ eta $y=1$ zuzenetara.', 'Lleva las asíntotas a $x=2$ e $y=1$.', 'انقل المقاربين إلى $x=2$ و$y=1$.'), hint: say('Asintota bertikala $x=a$; horizontala $y=b$.', 'Asíntota vertical $x=a$; horizontal $y=b$.', 'المقارب الرأسي $x=a$ والأفقي $y=b$.'), isSolved: (state) => state.a === 2 && state.b === 1 },
    { id: 57404, prompt: say('Lortu $x=1$ eta $y=0$ asintotak dituen eta $(3,\\,2)$ puntutik pasatzen den hiperbola.', 'Consigue la hipérbola con asíntotas $x=1$ e $y=0$ que pasa por $(3,\\,2)$.', 'اصنع القطع الذي مقارباه $x=1$ و$y=0$ ويمر بـ $(3,\\,2)$.'), hint: say('$2=\\frac{k}{3-1}$', '$2=\\frac{k}{3-1}$', '$2=\\frac{k}{3-1}$'), isSolved: (state) => state.a === 1 && state.b === 0 && hyperbolaAt(state, 3) === 2 }
]

/* ---------- 5. Square roots y = s·√(x − a) + b ---------- */

export interface RootState {
    /** +1 upwards, −1 downwards */
    s: 1 | -1
    a: number
    b: number
}

export const initialRootState: RootState = { s: 1, a: 2, b: -1 }

export const setRoot = (state: RootState, patch: Partial<RootState>): RootState => ({
    s: (patch.s ?? state.s) < 0 ? -1 : 1,
    a: clamp(patch.a ?? state.a, -SHIFT_LIMIT, SHIFT_LIMIT),
    b: clamp(patch.b ?? state.b, -SHIFT_LIMIT, SHIFT_LIMIT)
})

export const rootAt = ({ s, a, b }: RootState, x: number): number | null => (x < a ? null : s * Math.sqrt(x - a) + b)

export const rootChallenges: LabChallenge<RootState>[] = [
    { id: 57501, prompt: say('Lortu $(-3,\\,0)$ puntutik gora abiatzen den grafikoa.', 'Consigue una gráfica que salga de $(-3,\\,0)$ hacia arriba.', 'اصنع بيانًا يبدأ من $(-3,\\,0)$ متجهًا إلى الأعلى.'), hint: say('$y=\\sqrt{x+3}$', '$y=\\sqrt{x+3}$', '$y=\\sqrt{x+3}$'), isSolved: (state) => state.s === 1 && state.a === -3 && state.b === 0 },
    { id: 57502, prompt: say('Lortu $[2,\\,+\\infty)$ izate-eremua duen eta $(6,\\,3)$ puntutik pasatzen den grafikoa.', 'Consigue una gráfica con dominio $[2,\\,+\\infty)$ que pase por $(6,\\,3)$.', 'اصنع بيانًا مجاله $[2,\\,+\\infty)$ ويمر بـ $(6,\\,3)$.'), hint: say('$\\sqrt{6-2}=2$; zenbat falta da 3ra iristeko?', '$\\sqrt{6-2}=2$; ¿cuánto falta para llegar a 3?', '$\\sqrt{6-2}=2$؛ كم يلزم للوصول إلى 3؟'), isSolved: (state) => state.a === 2 && rootAt(state, 6) === 3 },
    { id: 57503, prompt: say('Lortu $(0,\\,2)$ puntutik behera abiatzen den grafikoa.', 'Consigue una gráfica que salga de $(0,\\,2)$ hacia abajo.', 'اصنع بيانًا يبدأ من $(0,\\,2)$ متجهًا إلى الأسفل.'), hint: say('$y=2-\\sqrt{x}$', '$y=2-\\sqrt{x}$', '$y=2-\\sqrt{x}$'), isSolved: (state) => state.s === -1 && state.a === 0 && state.b === 2 },
    { id: 57504, prompt: say('Lortu $(1,\\,1)$ eta $(4,\\,2)$ puntuetatik pasatzen den grafikoa.', 'Consigue una gráfica que pase por $(1,\\,1)$ y $(4,\\,2)$.', 'اصنع بيانًا يمر بـ $(1,\\,1)$ و$(4,\\,2)$.'), hint: say('Gogoratu: $\\sqrt{1}=1$ eta $\\sqrt{4}=2$.', 'Recuerda: $\\sqrt{1}=1$ y $\\sqrt{4}=2$.', 'تذكّر: $\\sqrt{1}=1$ و$\\sqrt{4}=2$.'), isSolved: (state) => rootAt(state, 1) === 1 && rootAt(state, 4) === 2 }
]

/* ---------- 6. The exponential y = k·aˣ ---------- */

export const EXPONENTIAL_BASES = [0.25, 0.5, 0.8, 1.2, 1.5, 2, 3] as const
export const K_MAX = 5
export const X_RANGE = { min: -3, max: 4 } as const

export interface ExponentialState {
    k: number
    /** Index into EXPONENTIAL_BASES */
    base: number
    x: number
}

export const initialExponentialState: ExponentialState = { k: 1, base: 5, x: 0 }

export const setExponential = (state: ExponentialState, patch: Partial<ExponentialState>): ExponentialState => ({
    k: clamp(patch.k ?? state.k, 1, K_MAX),
    base: clamp(patch.base ?? state.base, 0, EXPONENTIAL_BASES.length - 1),
    x: clamp(patch.x ?? state.x, X_RANGE.min, X_RANGE.max)
})

export const baseOf = (state: ExponentialState) => EXPONENTIAL_BASES[state.base]
export const exponentialAt = (state: ExponentialState, x = state.x) => state.k * baseOf(state) ** x

export const exponentialChallenges: LabChallenge<ExponentialState>[] = [
    { id: 57601, prompt: say('Lortu $(0,\\,3)$ eta $(1;\\,3{,}6)$ puntuetatik pasatzen den funtzioa.', 'Consigue la función que pasa por $(0,\\,3)$ y $(1;\\,3{,}6)$.', 'اصنع الدالة المارة بـ $(0,\\,3)$ و$(1;\\,3{,}6)$.'), hint: say('$k=3$ eta $a=\\frac{3{,}6}{3}$.', '$k=3$ y $a=\\frac{3{,}6}{3}$.', '$k=3$ و$a=\\frac{3{,}6}{3}$.'), isSolved: (state) => state.k === 3 && baseOf(state) === 1.2 },
    { id: 57602, prompt: say('Lortu $(0,\\,4)$ eta $(1,\\,2)$ puntuetatik pasatzen den funtzio beherakorra.', 'Consigue la función decreciente que pasa por $(0,\\,4)$ y $(1,\\,2)$.', 'اصنع الدالة المتناقصة المارة بـ $(0,\\,4)$ و$(1,\\,2)$.'), hint: say('Urrats bakoitzean erdira.', 'En cada paso, a la mitad.', 'في كل خطوة إلى النصف.'), isSolved: (state) => state.k === 4 && baseOf(state) === 0.5 },
    { id: 57603, prompt: say('Lortu $y=2\\cdot 2^x$ eta irakurri bere balioa $x=3$ denean.', 'Consigue $y=2\\cdot 2^x$ y lee su valor en $x=3$.', 'اصنع $y=2\\cdot 2^x$ واقرأ قيمتها عند $x=3$.'), hint: say('Mugitu kurtsorea $x=3$ puntura: $2\\cdot 8$.', 'Lleva el cursor a $x=3$: $2\\cdot 8$.', 'حرّك المؤشر إلى $x=3$: $2\\cdot 8$.'), isSolved: (state) => state.k === 2 && baseOf(state) === 2 && state.x === 3 },
    { id: 57604, prompt: say('2tik abiatu eta urrats bakoitzean % 50 hazten den funtzioa lortu.', 'Consigue una función que empiece en 2 y crezca un 50 % en cada paso.', 'اصنع دالة تبدأ من 2 وتزيد 50 % في كل خطوة.'), hint: say('% 50 igotzea: bider $1{,}5$.', 'Subir un 50 %: por $1{,}5$.', 'الزيادة 50 %: الضرب في $1{,}5$.'), isSolved: (state) => state.k === 2 && baseOf(state) === 1.5 },
    { id: 57605, prompt: say('Lortu urrats bakoitzean % 20 galtzen duen funtzio bat.', 'Consigue una función que pierda un 20 % en cada paso.', 'اصنع دالة تفقد 20 % في كل خطوة.'), hint: say('% 20 jaistea: bider $0{,}8$.', 'Bajar un 20 %: por $0{,}8$.', 'النقصان 20 %: الضرب في $0{,}8$.'), isSolved: (state) => baseOf(state) === 0.8 }
]

/* ---------- 7. The rectangle of fixed perimeter ---------- */

export const PERIMETERS = [12, 20, 30] as const

export interface FrameState {
    /** Index into PERIMETERS */
    perimeter: number
    /** Base, in half steps */
    x: number
}

export const initialFrameState: FrameState = { perimeter: 1, x: 1 }

export const halfPerimeter = (state: Pick<FrameState, 'perimeter'>) => PERIMETERS[state.perimeter] / 2

export function setFrame(state: FrameState, patch: Partial<FrameState>): FrameState {
    const perimeter = clamp(patch.perimeter ?? state.perimeter, 0, PERIMETERS.length - 1)
    const half = PERIMETERS[perimeter] / 2
    return { perimeter, x: clampHalf(patch.x ?? state.x, 0.5, half - 0.5) }
}

export const frameHeight = (state: FrameState) => halfPerimeter(state) - state.x
export const frameArea = (state: FrameState) => state.x * frameHeight(state)

export const frameChallenges: LabChallenge<FrameState>[] = [
    { id: 57701, prompt: say('20 m-ko perimetroarekin, lortu azalera handiena.', 'Con 20 m de perímetro, consigue el área máxima.', 'بمحيط 20 م، احصل على أكبر مساحة.'), hint: say('Azalera hazten da eta gero txikitzen: bilatu biraketa.', 'El área crece y después decrece: busca dónde gira.', 'تزيد المساحة ثم تنقص: ابحث عن موضع الانعطاف.'), isSolved: (state) => PERIMETERS[state.perimeter] === 20 && state.x === 5 },
    { id: 57702, prompt: say('20 m-ko perimetroarekin, lortu 16 m²-ko laukizuzena.', 'Con 20 m de perímetro, consigue un rectángulo de 16 m².', 'بمحيط 20 م، احصل على مستطيل مساحته 16 م².'), hint: say('$x(10-x)=16$: $2\\cdot 8$.', '$x(10-x)=16$: $2\\cdot 8$.', '$x(10-x)=16$: $2\\cdot 8$.'), isSolved: (state) => PERIMETERS[state.perimeter] === 20 && frameArea(state) === 16 },
    { id: 57703, prompt: say('12 m-ko perimetroarekin, lortu azalera handiena.', 'Con 12 m de perímetro, consigue el área máxima.', 'بمحيط 12 م، احصل على أكبر مساحة.'), hint: say('Maximoa karratua da.', 'El máximo es un cuadrado.', 'القيمة العظمى مربع.'), isSolved: (state) => PERIMETERS[state.perimeter] === 12 && state.x === 3 },
    { id: 57704, prompt: say('30 m-ko perimetroarekin, lortu 50 m²-ko laukizuzena.', 'Con 30 m de perímetro, consigue un rectángulo de 50 m².', 'بمحيط 30 م، احصل على مستطيل مساحته 50 م².'), hint: say('$x(15-x)=50$', '$x(15-x)=50$', '$x(15-x)=50$'), isSolved: (state) => PERIMETERS[state.perimeter] === 30 && frameArea(state) === 50 }
]

export const graphsLabChallengeIds: number[] = [lineChallenges, slopeChallenges, pointSlopeChallenges, twoLinesChallenges, parabolaChallenges, interceptsChallenges, hyperbolaChallenges, rootChallenges, exponentialChallenges, frameChallenges].flatMap((list) => list.map((challenge) => challenge.id))
