import { fraction, gcd, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { VectorsStageId } from '../lessons.tsx'
import { say } from '../text.ts'

/* ==========================================================================
   Bektoreak eta zuzenak (4. DBH akademikoak) laboratory. Ten tools, two per
   stage, four challenges each: a vector from A to B with its coordinates
   and modulus, a combination a·u + b·v of two fixed vectors, a segment
   with its length and midpoint, a third point against a fixed segment
   (aligned or at a right angle), a line traced by a point, a direction and
   the parameter t, the same line written in every form, the slope between
   two points, a second line against a fixed one (parallel, perpendicular,
   secant, coincident), the bisector of a segment and a circumference with
   a point. Lines are kept as Ax + By + C = 0 with whole numbers. Pure
   state logic; the components live next to this file. Tests in
   tests/bektoreak-dbh4ak-lab.test.ts.
   ========================================================================== */

export type VectorsLabToolId = 'vector' | 'combination' | 'segment' | 'align' | 'parametric' | 'forms' | 'slope' | 'two-lines' | 'bisector' | 'circle'

export interface VectorsLabTool extends LabToolInfo {
    id: VectorsLabToolId
    stage: VectorsStageId
}

export type Point = [number, number]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const same = (p: Point, q: Point) => p[0] === q[0] && p[1] === q[1]
/** The cross product of two vectors: 0 when they are parallel */
export const cross = ([a, b]: Point, [c, d]: Point) => a * d - b * c
/** The dot product of two vectors: 0 when they are perpendicular */
export const dot = ([a, b]: Point, [c, d]: Point) => a * c + b * d
export const minus = ([a, b]: Point, [c, d]: Point): Point => [a - c, b - d]
export const squaredLength = ([a, b]: Point) => a * a + b * b

export const vectorsLabTools: VectorsLabTool[] = [
    { id: 'vector', stage: 'vectors', lessonTopic: 'vector-coordinates', title: say('A-tik B-rako bektorea', 'El vector de A a B', 'المتجه من A إلى B', 'The vector from A to B'), observe: say('Koordenatuak muturra ken jatorria dira. A eta B batera mugitzen badira, bektorea ez da aldatzen: bektore aske bera da beste leku batean. Modulua kateto horizontal eta bertikalaren hipotenusa da.', 'Las coordenadas son extremo menos origen. Si mueves A y B a la vez, el vector no cambia: es el mismo vector libre en otro sitio. El módulo es la hipotenusa de los catetos horizontal y vertical.', 'المركّبتان هما الطرف ناقص الأصل. وإذا حرّكت A وB معًا لا يتغير المتجه: إنه المتجه الحر نفسه في مكان آخر. والطول وتر الضلعين الأفقي والرأسي.', 'The coordinates are end point minus start point. If you move A and B at the same time, the vector does not change: it is the same free vector in another place. The magnitude is the hypotenuse of the horizontal and vertical legs.') },
    { id: 'combination', stage: 'vectors', lessonTopic: 'vector-operations', title: say('a · u + b · v konbinazioa', 'La combinación a · u + b · v', 'التركيب a · u + b · v', 'The combination a · u + b · v'), observe: say('a-k u bektorea luzatzen edo laburtzen du, eta noranzkoa aldatzen du negatiboa bada. b = 0 denean emaitza u-ren paraleloa da. Bi bektore hauekin planoko puntu oso guztietara irits daiteke?', 'a estira o encoge el vector u y le da la vuelta si es negativo. Cuando b = 0, el resultado es paralelo a u. ¿Se llega con estos dos vectores a todos los puntos enteros del plano?', 'يمدّ a المتجه u أو يقصّره ويعكس منحاه إذا كان سالبًا. وعندما b = 0 يكون الناتج موازيًا لـ u. هل نصل بهذين المتجهين إلى كل النقاط الصحيحة في المستوى؟', 'a stretches or shrinks the vector u and reverses it if it is negative. When b = 0, the result is parallel to u. Can you reach all the points with whole-number coordinates on the plane with these two vectors?') },
    { id: 'segment', stage: 'points', lessonTopic: 'distance', title: say('Zuzenkia: luzera eta erdiko puntua', 'Segmento: longitud y punto medio', 'القطعة: الطول والمنتصف', 'Segment: length and midpoint'), observe: say('Erdiko puntuaren koordenatuak muturrenen batez bestekoa dira; A eta B bikoiti-bakoitiak ez badira, M-k zati erdiak ditu. Luzera Pitagoras da: 3 eta 4, 5 eta 12… koordenatuen kendurak zenbaki osoak emateko.', 'Las coordenadas del punto medio son la media de las de los extremos; si las sumas son impares, M tiene medios. La longitud es Pitágoras: 3 y 4, 5 y 12… dan distancias enteras.', 'إحداثيا المنتصف متوسطا إحداثيي الطرفين؛ وإذا كان المجموع فرديًا ظهرت أنصاف. والطول فيثاغورس: 3 و4، و5 و12… تعطي مسافات صحيحة.', 'The coordinates of the midpoint are the mean of those of the endpoints; if the sums are odd, M has coordinates that are halves. The length comes from Pythagoras\' theorem: 3 and 4, 5 and 12… give whole-number distances.') },
    { id: 'align', stage: 'points', lessonTopic: 'collinear', title: say('Hirugarren puntua', 'El tercer punto', 'النقطة الثالثة', 'The third point'), observe: say('C lerrokatuta dago AC eta AB proportzionalak direnean. AC eta AB perpendikularrak direnean, triangeluak angelu zuzena du A-n. Bi kasuetan zeinuek garrantzia dute: C B-tik harago, A eta B artean edo A-ren atzean egon daiteke.', 'C está alineado cuando AC y AB son proporcionales. Cuando AC y AB son perpendiculares, el triángulo tiene un ángulo recto en A. Los signos importan: C puede quedar más allá de B, entre A y B o detrás de A.', 'تكون C على استقامة واحدة عندما يتناسب AC وAB. وعندما يتعامد AC وAB يكون للمثلث زاوية قائمة في A. والإشارات مهمة: قد تقع C بعد B أو بين A وB أو خلف A.', 'C is collinear when AC and AB are proportional. When AC and AB are perpendicular, the triangle has a right angle at A. The signs matter: C can be beyond B, between A and B, or behind A.') },
    { id: 'parametric', stage: 'equations', lessonTopic: 'parametric', title: say('Puntua, norabidea eta t', 'Punto, dirección y t', 'نقطة واتجاه وt', 'Point, direction and t'), observe: say('t-k esaten du zenbat aldiz batzen den d bektorea P puntuari. t aldatzean puntua zuzenean zehar mugitzen da; d bikoiztean zuzena ez da aldatzen, baina puntuak bi aldiz azkarrago doaz.', 't dice cuántas veces se suma el vector d al punto P. Al cambiar t, el punto recorre la recta; si duplicas d, la recta no cambia, pero los puntos van el doble de rápido.', 'يخبر t بعدد مرات إضافة المتجه d إلى النقطة P. وعند تغيير t تتحرك النقطة على المستقيم؛ وإذا ضاعفت d لا يتغير المستقيم لكن النقاط تتحرك بضعف السرعة.', 't tells how many times the vector d is added to the point P. When you change t, the point moves along the straight line; if you double d, the line does not change, but the points move twice as fast.') },
    { id: 'forms', stage: 'equations', lessonTopic: 'continuous', title: say('Zuzen bera, forma guztietan', 'La misma recta, en todas sus formas', 'المستقيم نفسه بكل صيغه', 'The same straight line, in all its forms'), observe: say('Puntu bat eta norabide-bektore bat aukeratzean, ekuazio jarraitua, puntu-malda, orokorra eta esplizitua batera aldatzen dira. Zuzen bertikal batek ez du esplizitorik, eta horizontal batek ez du jarraiturik.', 'Al elegir un punto y un vector director cambian a la vez la continua, la punto-pendiente, la general y la explícita. Una recta vertical no tiene explícita, y una horizontal no tiene continua.', 'عند اختيار نقطة ومتجه توجيه تتغير معًا المعادلة المتصلة ومعادلة النقطة والميل والعامة والصريحة. والمستقيم الرأسي لا صريحة له، والأفقي لا متصلة له.', 'When you choose a point and a direction vector, the continuous, point-slope, general and explicit forms change at the same time. A vertical straight line has no explicit form, and a horizontal one has no continuous form.') },
    { id: 'slope', stage: 'positions', lessonTopic: 'slope', title: say('Bi punturen arteko malda', 'La pendiente entre dos puntos', 'الميل بين نقطتين', 'The slope between two points'), observe: say('Malda igoera zati aurrerapena da. Puntuak trukatzean bi kendurek zeinua aldatzen dute eta malda ez da aldatzen. Aurrerapena 0 denean zuzena bertikala da eta ez du maldarik.', 'La pendiente es lo que sube entre lo que avanza. Si intercambias los puntos, las dos diferencias cambian de signo y la pendiente no cambia. Cuando el avance es 0, la recta es vertical y no tiene pendiente.', 'الميل هو الصعود على التقدّم. وإذا بدّلت النقطتين تغيّرت إشارتا الفرقين ولم يتغير الميل. وعندما يكون التقدّم 0 يكون المستقيم رأسيًا ولا ميل له.', 'The slope is how much it goes up or down, divided by how far it goes across. If you swap the points, both differences change sign and the slope does not change. When the across distance is 0, the straight line is vertical and has no slope.') },
    { id: 'two-lines', stage: 'positions', lessonTopic: 'parallel-perpendicular', title: say('Bigarren zuzena', 'La segunda recta', 'المستقيم الثاني', 'The second straight line'), observe: say('Malda berarekin zuzenak paraleloak dira, n berdina ez bada; n ere berdina bada, bat datoz. Malda desberdinekin puntu batean ebakitzen dira, eta malden biderkadura −1 denean perpendikularrak dira.', 'Con la misma pendiente las rectas son paralelas, salvo que n también coincida: entonces son la misma. Con pendientes distintas se cortan en un punto, y cuando el producto de pendientes es −1 son perpendiculares.', 'بالميل نفسه يتوازى المستقيمان إلا إذا تساوى n أيضًا فينطبقان. وبميلين مختلفين يتقاطعان في نقطة، ويتعامدان عندما يكون جداء الميلين −1.', 'With the same slope, the straight lines are parallel, unless n is also the same: then they are the same line. With different slopes, they meet at one point, and when the product of the slopes is −1, they are perpendicular.') },
    { id: 'bisector', stage: 'applications', lessonTopic: 'bisector', title: say('Zuzenkiaren erdibitzailea', 'La mediatriz del segmento', 'محور القطعة', 'The perpendicular bisector of the segment'), observe: say('Erdibitzaileak erdiko puntutik pasatzen da eta AB-ren perpendikularra da. Haren edozein puntu A-tik eta B-tik distantzia berera dago: horregatik pasatzen da jatorritik A eta B jatorritik distantzia berera daudenean.', 'La mediatriz pasa por el punto medio y es perpendicular a AB. Cualquiera de sus puntos está a la misma distancia de A y de B: por eso pasa por el origen cuando A y B están a la misma distancia del origen.', 'يمر المحور بالمنتصف ويعامد AB. وكل نقطة منه على المسافة نفسها من A ومن B: لذلك يمر بالأصل عندما يكون A وB على المسافة نفسها من الأصل.', 'The perpendicular bisector passes through the midpoint and is perpendicular to AB. Each of its points is the same distance from A and from B: that is why it passes through the origin when A and B are the same distance from the origin.') },
    { id: 'circle', stage: 'applications', lessonTopic: 'circle', title: say('Zirkunferentzia eta puntu bat', 'Una circunferencia y un punto', 'دائرة ونقطة', 'A circumference and a point'), observe: say('Ekuazioan zentroaren koordenatuak zeinua aldatuta agertzen dira: (x − a)² eta (y − b)². P puntua zirkunferentzian dago zentrorako distantzia erradioa bada; txikiagoa bada, barruan; handiagoa bada, kanpoan.', 'En la ecuación, las coordenadas del centro aparecen con el signo cambiado: (x − a)² e (y − b)². El punto P está sobre la circunferencia si su distancia al centro es el radio; si es menor, dentro; si es mayor, fuera.', 'تظهر إحداثيات المركز في المعادلة بإشارة معكوسة: (x − a)² و(y − b)². وتكون النقطة P على الدائرة إذا كان بعدها عن المركز يساوي نصف القطر؛ وإذا كان أصغر فهي داخلها؛ وإذا كان أكبر فخارجها.', 'In the equation, the coordinates of the centre appear with the sign changed: (x − a)² and (y − b)². The point P is on the circumference if its distance from the centre is the radius; if it is smaller, it is inside; if it is greater, it is outside.') }
]

export const vectorsLabToolForTopic: Record<string, VectorsLabToolId | undefined> = {
    'vector-coordinates': 'vector',
    'vector-operations': 'combination',
    'parallel-vectors': 'combination',
    distance: 'segment',
    midpoint: 'segment',
    collinear: 'align',
    parametric: 'parametric',
    continuous: 'forms',
    'general-explicit': 'forms',
    slope: 'slope',
    'parallel-perpendicular': 'two-lines',
    'relative-position': 'two-lines',
    bisector: 'bisector',
    circle: 'circle',
    polygons: 'bisector'
}

/* ---------- Lines as Ax + By + C = 0 ---------- */

export interface Line {
    A: number
    B: number
    C: number
}

/** The line through P with direction d, with whole coefficients in lowest terms, A > 0 (or B > 0 if A = 0) */
export function lineFrom([px, py]: Point, [dx, dy]: Point): Line {
    let A = dy
    let B = -dx
    let C = dx * py - dy * px
    const common = gcd(gcd(Math.abs(A), Math.abs(B)), Math.abs(C)) || 1
    A /= common
    B /= common
    C /= common
    if (A < 0 || (A === 0 && B < 0)) [A, B, C] = [-A, -B, -C]
    return { A: A + 0, B: B + 0, C: C + 0 }
}

export const onLine = (line: Line, [x, y]: Point) => line.A * x + line.B * y + line.C === 0
export const sameLine = (r: Line, s: Line) => r.A * s.B === s.A * r.B && r.A * s.C === s.A * r.C && r.B * s.C === s.B * r.C
/** Slope −A/B, or null for a vertical line */
export const lineSlope = (line: Line): FractionValue | null => (line.B === 0 ? null : fraction(-line.A, line.B))
/** Y-intercept −C/B, or null for a vertical line */
export const lineIntercept = (line: Line): FractionValue | null => (line.B === 0 ? null : fraction(-line.C, line.B))
const isFraction = (value: FractionValue | null, numerator: number, denominator = 1) => value !== null && value.numerator === numerator && value.denominator === denominator

/* ---------- Writing numbers and equations ---------- */

/** A fraction as plain text with a real minus sign: 3, −3/4 */
export function fractionText({ numerator, denominator }: FractionValue): string {
    const body = denominator === 1 ? String(Math.abs(numerator)) : `${Math.abs(numerator)}/${denominator}`
    return numerator < 0 ? `−${body}` : body
}

/** k·letter inside a sum: first term or with its sign; 1 and −1 are not written */
function term(k: number, letter: string, first: boolean): string {
    if (k === 0) return ''
    const size = Math.abs(k) === 1 && letter ? '' : String(Math.abs(k))
    if (first) return `${k < 0 ? '−' : ''}${size}${letter}`
    return ` ${k < 0 ? '−' : '+'} ${size}${letter}`
}

/** Ax + By + C = 0 as text */
export function generalText({ A, B, C }: Line): string {
    const x = term(A, 'x', true)
    const y = term(B, 'y', x === '')
    const c = term(C, '', x === '' && y === '')
    return `${x}${y}${c} = 0`
}

/** y = mx + n, or x = k for a vertical line */
export function explicitText(line: Line): string {
    if (line.B === 0) return `x = ${fractionText(fraction(-line.C, line.A))}`
    const m = fraction(-line.A, line.B)
    const n = fraction(-line.C, line.B)
    const slope = m.numerator === 0 ? '' : `${m.numerator < 0 ? '−' : ''}${Math.abs(m.numerator) === 1 && m.denominator === 1 ? '' : fractionText(fraction(Math.abs(m.numerator), m.denominator))}${m.denominator === 1 ? '' : '·'}x`
    if (slope === '') return `y = ${fractionText(n)}`
    const tail = n.numerator === 0 ? '' : ` ${n.numerator < 0 ? '−' : '+'} ${fractionText(fraction(Math.abs(n.numerator), n.denominator))}`
    return `y = ${slope}${tail}`
}

/** x − p written as x − 2, x + 3 or x */
const shifted = (letter: string, p: number) => (p === 0 ? letter : `${letter} ${p > 0 ? '−' : '+'} ${Math.abs(p)}`)
const signed = (k: number) => (k < 0 ? `−${Math.abs(k)}` : String(k))

/** (x − p₁)/d₁ = (y − p₂)/d₂, or null when a coordinate of d is 0 */
export function continuousText([px, py]: Point, [dx, dy]: Point): string | null {
    if (dx === 0 || dy === 0) return null
    const side = (letter: string, p: number) => (p === 0 ? letter : `(${shifted(letter, p)})`)
    return `${side('x', px)} / ${signed(dx)} = ${side('y', py)} / ${signed(dy)}`
}

/** x = p₁ + t·d₁, y = p₂ + t·d₂ */
export function parametricText([px, py]: Point, [dx, dy]: Point): string {
    const part = (p: number, d: number) => (d === 0 ? String(signed(p)) : `${p === 0 ? '' : `${signed(p)} ${d < 0 ? '−' : '+'} `}${p === 0 && d < 0 ? '−' : ''}${Math.abs(d) === 1 ? '' : Math.abs(d)}t`)
    return `x = ${part(px, dx)},  y = ${part(py, dy)}`
}

/* ---------- 1. The vector from A to B ---------- */

export const POINT_LIMIT = 6

export interface VectorState {
    a: Point
    b: Point
}

export const initialVectorState: VectorState = { a: [0, 0], b: [2, 1] }

const clampPoint = ([x, y]: Point, limit = POINT_LIMIT): Point => [clamp(x, -limit, limit), clamp(y, -limit, limit)]
export const setVector = (state: VectorState, patch: Partial<VectorState>): VectorState => ({ a: clampPoint(patch.a ?? state.a), b: clampPoint(patch.b ?? state.b) })
export const vectorOf = ({ a, b }: VectorState): Point => minus(b, a)

export const vectorChallenges: LabChallenge<VectorState>[] = [
    { id: 73101, prompt: say('$A(-1,2)$ puntutik hasita, lortu $\\overrightarrow{AB}=(3,-2)$.', 'Empezando en $A(-1,2)$, consigue $\\overrightarrow{AB}=(3,-2)$.', 'انطلاقًا من $A(-1,2)$ احصل على $\\overrightarrow{AB}=(3,-2)$.', 'Starting from $A(-1,2)$, make $\\overrightarrow{AB}=(3,-2)$.'), hint: same_('$B=A+\\overrightarrow{AB}=(2,0)$'), isSolved: (state) => same(state.a, [-1, 2]) && same(vectorOf(state), [3, -2]) },
    { id: 73102, prompt: say('Lortu 5eko moduluko bektore bat, ez horizontala ez bertikala.', 'Consigue un vector de módulo 5 que no sea horizontal ni vertical.', 'احصل على متجه طوله 5 ليس أفقيًا ولا رأسيًا.', 'Make a vector with magnitude 5 that is neither horizontal nor vertical.'), hint: same_('$3^{2}+4^{2}=5^{2}$'), isSolved: (state) => { const [x, y] = vectorOf(state); return x !== 0 && y !== 0 && x * x + y * y === 25 } },
    { id: 73103, prompt: say('Lortu 10eko moduluko bektore bat.', 'Consigue un vector de módulo 10.', 'احصل على متجه طوله 10.', 'Make a vector with magnitude 10.'), hint: same_('$6^{2}+8^{2}=10^{2}$'), isSolved: (state) => squaredLength(vectorOf(state)) === 100 },
    { id: 73104, prompt: say('Jarri B jatorrian, eta lortu $\\overrightarrow{AB}=(-4,1)$.', 'Pon B en el origen y consigue $\\overrightarrow{AB}=(-4,1)$.', 'ضع B في الأصل واحصل على $\\overrightarrow{AB}=(-4,1)$.', 'Put B at the origin and make $\\overrightarrow{AB}=(-4,1)$.'), hint: same_('$A=B-\\overrightarrow{AB}$'), isSolved: (state) => same(state.b, [0, 0]) && same(vectorOf(state), [-4, 1]) }
]

/** The same hint in every language */
function same_(latex: string) {
    return say(latex, latex, latex, latex)
}

/* ---------- 2. The combination a·u + b·v ---------- */

export const COMBINATION_U: Point = [2, 1]
export const COMBINATION_V: Point = [-1, 2]
export const COMBINATION_LIMIT = 3

export interface CombinationState {
    a: number
    b: number
}

export const initialCombinationState: CombinationState = { a: 1, b: 0 }

export const setCombination = (state: CombinationState, patch: Partial<CombinationState>): CombinationState => ({
    a: clamp(patch.a ?? state.a, -COMBINATION_LIMIT, COMBINATION_LIMIT),
    b: clamp(patch.b ?? state.b, -COMBINATION_LIMIT, COMBINATION_LIMIT)
})

export const combination = ({ a, b }: CombinationState): Point => [a * COMBINATION_U[0] + b * COMBINATION_V[0], a * COMBINATION_U[1] + b * COMBINATION_V[1]]

export const combinationChallenges: LabChallenge<CombinationState>[] = [
    { id: 73201, prompt: say('Lortu $\\vec{u}$-ren paraleloa den bektore bat, $\\vec{u}$ ez dena eta noranzko aurkakoa duena.', 'Consigue un vector paralelo a $\\vec{u}$, distinto de $\\vec{u}$ y de sentido contrario.', 'احصل على متجه موازٍ لـ $\\vec{u}$ مختلف عنه ومعاكس له في المنحى.', 'Make a vector parallel to $\\vec{u}$, different from $\\vec{u}$ and in the opposite sense.'), hint: say('b = 0 eta a negatiboa.', 'b = 0 y a negativo.', 'b = 0 وa سالب.', 'b = 0 and a negative.'), isSolved: (state) => state.b === 0 && state.a < 0 },
    { id: 73202, prompt: say('Lortu $a\\vec{u}+b\\vec{v}=(5,0)$.', 'Consigue $a\\vec{u}+b\\vec{v}=(5,0)$.', 'احصل على $a\\vec{u}+b\\vec{v}=(5,0)$.', 'Make $a\\vec{u}+b\\vec{v}=(5,0)$.'), hint: same_('$2a-b=5,\\quad a+2b=0$'), isSolved: (state) => same(combination(state), [5, 0]) },
    { id: 73203, prompt: say('Lortu $a\\vec{u}+b\\vec{v}=(0,5)$.', 'Consigue $a\\vec{u}+b\\vec{v}=(0,5)$.', 'احصل على $a\\vec{u}+b\\vec{v}=(0,5)$.', 'Make $a\\vec{u}+b\\vec{v}=(0,5)$.'), hint: same_('$2a-b=0,\\quad a+2b=5$'), isSolved: (state) => same(combination(state), [0, 5]) },
    { id: 73204, prompt: say('Lortu $a\\vec{u}+b\\vec{v}=(-4,-7)$.', 'Consigue $a\\vec{u}+b\\vec{v}=(-4,-7)$.', 'احصل على $a\\vec{u}+b\\vec{v}=(-4,-7)$.', 'Make $a\\vec{u}+b\\vec{v}=(-4,-7)$.'), hint: say('Bi koefizienteak negatiboak dira.', 'Los dos coeficientes son negativos.', 'المعاملان كلاهما سالب.', 'Both coefficients are negative.'), isSolved: (state) => same(combination(state), [-4, -7]) }
]

/* ---------- 3. A segment: length and midpoint ---------- */

export interface SegmentState {
    a: Point
    b: Point
}

export const initialSegmentState: SegmentState = { a: [-2, 1], b: [4, 3] }
export const setSegment = (state: SegmentState, patch: Partial<SegmentState>): SegmentState => ({ a: clampPoint(patch.a ?? state.a), b: clampPoint(patch.b ?? state.b) })
/** The midpoint as two fractions */
export const midpoint = ({ a, b }: SegmentState): [FractionValue, FractionValue] => [fraction(a[0] + b[0], 2), fraction(a[1] + b[1], 2)]
export const segmentSquare = ({ a, b }: SegmentState) => squaredLength(minus(b, a))

export const segmentChallenges: LabChallenge<SegmentState>[] = [
    { id: 73301, prompt: say('$A(-3,0)$ izanik, lortu $M(1,2)$ erdiko puntua.', 'Con $A(-3,0)$, consigue que el punto medio sea $M(1,2)$.', 'مع $A(-3,0)$ اجعل المنتصف $M(1,2)$.', 'With $A(-3,0)$, make the midpoint $M(1,2)$.'), hint: same_('$B=2M-A$'), isSolved: (state) => same(state.a, [-3, 0]) && isFraction(midpoint(state)[0], 1) && isFraction(midpoint(state)[1], 2) },
    { id: 73302, prompt: say('Egin erdiko puntua jatorria izatea, A eta B desberdinak izanik.', 'Haz que el punto medio sea el origen, con A y B distintos.', 'اجعل المنتصف هو الأصل مع اختلاف A وB.', 'Make the midpoint the origin, with A and B different.'), hint: say('B, A-ren aurkakoa.', 'B, el opuesto de A.', 'B معاكس A.', 'B, the opposite of A.'), isSolved: (state) => !same(state.a, state.b) && midpoint(state)[0].numerator === 0 && midpoint(state)[1].numerator === 0 },
    { id: 73303, prompt: say('$A(2,-1)$ izanik, jarri B A-ren simetrikoa izan dadin $(0,1)$ puntuarekiko.', 'Con $A(2,-1)$, coloca B en el simétrico de A respecto de $(0,1)$.', 'مع $A(2,-1)$ ضع B في نظيرة A بالنسبة إلى $(0,1)$.', 'With $A(2,-1)$, place B at the point symmetric to A with respect to $(0,1)$.'), hint: same_('$B=2\\cdot(0,1)-(2,-1)$'), isSolved: (state) => same(state.a, [2, -1]) && same(state.b, [-2, 3]) },
    { id: 73304, prompt: say('Lortu zehazki 13ko luzera duen zuzenkia.', 'Consigue un segmento de longitud exactamente 13.', 'احصل على قطعة طولها 13 بالضبط.', 'Make a segment with a length of exactly 13.'), hint: same_('$5^{2}+12^{2}=13^{2}$'), isSolved: (state) => segmentSquare(state) === 169 }
]

/* ---------- 4. The third point ---------- */

export const ALIGN_A: Point = [-3, -1]
export const ALIGN_B: Point = [1, 1]

export interface AlignState {
    c: Point
}

export const initialAlignState: AlignState = { c: [2, -2] }
export const setAlign = (_state: AlignState, patch: Partial<AlignState>): AlignState => ({ c: clampPoint(patch.c ?? _state.c) })
const AB = minus(ALIGN_B, ALIGN_A)
export const alignVector = ({ c }: AlignState): Point => minus(c, ALIGN_A)
export const isAligned = (state: AlignState) => cross(AB, alignVector(state)) === 0
/** Where C sits along AB: AC = t·AB (only meaningful when aligned) */
export const alignParameter = (state: AlignState) => dot(alignVector(state), AB) / squaredLength(AB)

export const alignChallenges: LabChallenge<AlignState>[] = [
    { id: 73401, prompt: say('Jarri C, A eta B-rekin lerrokatuta, B-tik harago.', 'Coloca C alineado con A y B, más allá de B.', 'ضع C على استقامة A وB بعد B.', 'Place C so that it is collinear with A and B, beyond B.'), hint: same_('$\\overrightarrow{AC}=t\\cdot(4,2),\\ t>1$'), isSolved: (state) => isAligned(state) && alignParameter(state) > 1 },
    { id: 73402, prompt: say('Jarri C X ardatzean, A eta B-rekin lerrokatuta.', 'Coloca C en el eje X, alineado con A y B.', 'ضع C على محور X وعلى استقامة A وB.', 'Place C on the x-axis, collinear with A and B.'), hint: say('A-tik, igo 1 eta aurreratu 2.', 'Desde A, sube 1 y avanza 2.', 'من A اصعد 1 وتقدّم 2.', 'From A, go up 1 and move 2 to the right.'), isSolved: (state) => isAligned(state) && state.c[1] === 0 },
    { id: 73403, prompt: say('Jarri C lerrokatuta, baina A-ren atzean (A, C eta B artean).', 'Coloca C alineado, pero detrás de A (A queda entre C y B).', 'ضع C على الاستقامة نفسها ولكن خلف A (تقع A بين C وB).', 'Place C collinear with them, but behind A (A ends up between C and B).'), hint: same_('$\\overrightarrow{AC}=t\\cdot(4,2),\\ t<0$'), isSolved: (state) => isAligned(state) && alignParameter(state) < 0 },
    { id: 73404, prompt: say('Jarri C ABC triangeluak angelu zuzena izan dezan A-n.', 'Coloca C para que el triángulo ABC sea rectángulo en A.', 'ضع C ليكون المثلث ABC قائمًا في A.', 'Place C so that triangle ABC is right-angled at A.'), hint: say('$\\overrightarrow{AC}$, $(4,2)$-ren perpendikularra: $(-1,2)$-ren multiploa.', '$\\overrightarrow{AC}$, perpendicular a $(4,2)$: múltiplo de $(-1,2)$.', '$\\overrightarrow{AC}$ عمودي على $(4,2)$: مضاعف لـ $(-1,2)$.', '$\\overrightarrow{AC}$, perpendicular to $(4,2)$: a multiple of $(-1,2)$.'), isSolved: (state) => !same(state.c, ALIGN_A) && dot(AB, alignVector(state)) === 0 }
]

/* ---------- 5. A point, a direction and t ---------- */

export const DIRECTION_LIMIT = 6
export const T_LIMIT = 3

export interface ParametricState {
    p: Point
    d: Point
    t: number
}

export const initialParametricState: ParametricState = { p: [0, 0], d: [1, 1], t: 0 }

/** The direction never becomes (0, 0): a step into it is skipped */
function clampDirection(previous: Point, next: Point): Point {
    const d = clampPoint(next, DIRECTION_LIMIT)
    if (d[0] !== 0 || d[1] !== 0) return d
    const changed = next[0] !== previous[0] ? 0 : 1
    const result: Point = [...d]
    result[changed] = next[changed] < previous[changed] ? -1 : 1
    return result
}

export const setParametric = (state: ParametricState, patch: Partial<ParametricState>): ParametricState => ({
    p: clampPoint(patch.p ?? state.p),
    d: patch.d ? clampDirection(state.d, patch.d) : state.d,
    t: clamp(patch.t ?? state.t, -T_LIMIT, T_LIMIT)
})

export const parametricPoint = ({ p, d, t }: ParametricState): Point => [p[0] + t * d[0], p[1] + t * d[1]]
export const parametricLine = ({ p, d }: { p: Point; d: Point }) => lineFrom(p, d)

export const parametricChallenges: LabChallenge<ParametricState>[] = [
    { id: 73501, prompt: say('Egin zuzena $(1,2)$ eta $(4,-4)$ puntuetatik pasatzea.', 'Haz que la recta pase por $(1,2)$ y $(4,-4)$.', 'اجعل المستقيم يمر بـ $(1,2)$ و$(4,-4)$.', 'Make the straight line pass through $(1,2)$ and $(4,-4)$.'), hint: say('Norabidea: $(3,-6)$-ren paraleloa.', 'Dirección: paralela a $(3,-6)$.', 'الاتجاه: موازٍ لـ $(3,-6)$.', 'Direction: parallel to $(3,-6)$.'), isSolved: (state) => onLine(parametricLine(state), [1, 2]) && onLine(parametricLine(state), [4, -4]) },
    { id: 73502, prompt: say('Lortu $(0,3)$ puntutik pasatzen den zuzen horizontala.', 'Consigue la recta horizontal que pasa por $(0,3)$.', 'احصل على المستقيم الأفقي المار بـ $(0,3)$.', 'Make the horizontal straight line through $(0,3)$.'), hint: same_('$d_2=0$'), isSolved: (state) => state.d[1] === 0 && onLine(parametricLine(state), [0, 3]) },
    { id: 73503, prompt: say('$P(2,1)$ eta $t=2$ izanik, iritsi $(6,-3)$ puntura.', 'Con $P(2,1)$ y $t=2$, llega al punto $(6,-3)$.', 'مع $P(2,1)$ و$t=2$ صِل إلى النقطة $(6,-3)$.', 'With $P(2,1)$ and $t=2$, reach the point $(6,-3)$.'), hint: same_('$(2,1)+2\\vec{d}=(6,-3)$'), isSolved: (state) => same(state.p, [2, 1]) && state.t === 2 && same(parametricPoint(state), [6, -3]) },
    { id: 73504, prompt: say('Lortu jatorritik pasatzen den eta −3 malda duen zuzena.', 'Consigue la recta que pasa por el origen con pendiente −3.', 'احصل على المستقيم المار بالأصل وميله −3.', 'Make the straight line through the origin with slope −3.'), hint: same_('$\\vec{d}=(1,-3)$'), isSolved: (state) => onLine(parametricLine(state), [0, 0]) && isFraction(lineSlope(parametricLine(state)), -3) }
]

/* ---------- 6. The same line in every form ---------- */

export interface FormsState {
    p: Point
    d: Point
}

export const initialFormsState: FormsState = { p: [0, 0], d: [1, 2] }
export const setForms = (state: FormsState, patch: Partial<FormsState>): FormsState => ({ p: clampPoint(patch.p ?? state.p), d: patch.d ? clampDirection(state.d, patch.d) : state.d })
export const formsLine = (state: FormsState) => lineFrom(state.p, state.d)

export const formsChallenges: LabChallenge<FormsState>[] = [
    { id: 73601, prompt: say('Lortu $2x-3y+6=0$ zuzena.', 'Consigue la recta $2x-3y+6=0$.', 'احصل على المستقيم $2x-3y+6=0$.', 'Make the straight line $2x-3y+6=0$.'), hint: say('Norabidea $(3,2)$ eta puntua $(0,2)$, adibidez.', 'Dirección $(3,2)$ y punto $(0,2)$, por ejemplo.', 'الاتجاه $(3,2)$ والنقطة $(0,2)$ مثلًا.', 'Direction $(3,2)$ and point $(0,2)$, for example.'), isSolved: (state) => sameLine(formsLine(state), { A: 2, B: -3, C: 6 }) },
    { id: 73602, prompt: say('Lortu $\\frac{1}{2}$ malda eta $-2$ jatorriko ordenatua dituen zuzena.', 'Consigue la recta de pendiente $\\frac{1}{2}$ y ordenada en el origen $-2$.', 'احصل على المستقيم الذي ميله $\\frac{1}{2}$ ومقطعه الصادي $-2$.', 'Make the straight line with slope $\\frac{1}{2}$ and y-intercept $-2$.'), hint: same_('$\\vec{d}=(2,1),\\quad P(0,-2)$'), isSolved: (state) => isFraction(lineSlope(formsLine(state)), 1, 2) && isFraction(lineIntercept(formsLine(state)), -2) },
    { id: 73603, prompt: say('Lortu $(-3,0)$ puntutik pasatzen den zuzen bertikala.', 'Consigue la recta vertical que pasa por $(-3,0)$.', 'احصل على المستقيم الرأسي المار بـ $(-3,0)$.', 'Make the vertical straight line through $(-3,0)$.'), hint: same_('$x=-3$'), isSolved: (state) => sameLine(formsLine(state), { A: 1, B: 0, C: 3 }) },
    { id: 73604, prompt: say('Lortu ardatzak $(4,0)$ eta $(0,2)$ puntuetan ebakitzen dituen zuzena.', 'Consigue la recta que corta a los ejes en $(4,0)$ y $(0,2)$.', 'احصل على المستقيم الذي يقطع المحورين في $(4,0)$ و$(0,2)$.', 'Make the straight line that crosses the axes at $(4,0)$ and $(0,2)$.'), hint: same_('$\\vec{d}=(4,-2)$'), isSolved: (state) => onLine(formsLine(state), [4, 0]) && onLine(formsLine(state), [0, 2]) }
]

/* ---------- 7. The slope between two points ---------- */

export interface SlopeState {
    a: Point
    b: Point
}

export const initialSlopeState: SlopeState = { a: [-2, -1], b: [2, 1] }
export const setSlope = (state: SlopeState, patch: Partial<SlopeState>): SlopeState => ({ a: clampPoint(patch.a ?? state.a), b: clampPoint(patch.b ?? state.b) })
/** The slope as a fraction, or null when the run is 0 */
export const slopeOf = ({ a, b }: SlopeState): FractionValue | null => (b[0] === a[0] ? null : fraction(b[1] - a[1], b[0] - a[0]))

export const slopeChallenges: LabChallenge<SlopeState>[] = [
    { id: 73701, prompt: say('Lortu $-2$ malda.', 'Consigue una pendiente de $-2$.', 'احصل على ميل $-2$.', 'Make a slope of $-2$.'), hint: say('Aurreratu 1, jaitsi 2.', 'Avanza 1 y baja 2.', 'تقدّم 1 وانزل 2.', 'Move 1 to the right and 2 down.'), isSolved: (state) => isFraction(slopeOf(state), -2) },
    { id: 73702, prompt: say('Lortu zuzen horizontal bat, A eta B desberdinak izanik.', 'Consigue una recta horizontal, con A y B distintos.', 'احصل على مستقيم أفقي مع اختلاف A وB.', 'Make a horizontal straight line, with A and B different.'), hint: say('Ordenatu bera.', 'La misma ordenada.', 'الإحداثي الصادي نفسه.', 'The same y-coordinate.'), isSolved: (state) => !same(state.a, state.b) && isFraction(slopeOf(state), 0) },
    { id: 73703, prompt: say('Lortu $\\frac{3}{4}$ malda, A eta B 5eko distantziara daudela.', 'Consigue pendiente $\\frac{3}{4}$ con A y B a distancia 5.', 'احصل على ميل $\\frac{3}{4}$ مع بعد 5 بين A وB.', 'Make a slope of $\\frac{3}{4}$ with A and B at a distance of 5.'), hint: say('Aurreratu 4, igo 3.', 'Avanza 4 y sube 3.', 'تقدّم 4 واصعد 3.', 'Move 4 to the right and 3 up.'), isSolved: (state) => isFraction(slopeOf(state), 3, 4) && squaredLength(minus(state.b, state.a)) === 25 },
    { id: 73704, prompt: say('Lortu maldarik ez duen zuzen bat.', 'Consigue una recta sin pendiente.', 'احصل على مستقيم لا ميل له.', 'Make a straight line with no slope.'), hint: say('Bertikala: abzisa bera.', 'Vertical: la misma abscisa.', 'رأسي: الإحداثي السيني نفسه.', 'Vertical: the same x-coordinate.'), isSolved: (state) => !same(state.a, state.b) && slopeOf(state) === null }
]

/* ---------- 8. A second line against y = 2x − 1 ---------- */

export const FIXED_LINE = { m: fraction(2), n: -1 }
export const SLOPES: FractionValue[] = [-3, -2, -1, -1 / 2, -1 / 3, 0, 1 / 3, 1 / 2, 1, 2, 3].map((value) => (Number.isInteger(value) ? fraction(value) : fraction(Math.sign(value), Math.round(1 / Math.abs(value)))))
export const INTERCEPT_LIMIT = 6

export interface TwoLinesState {
    slope: number
    n: number
}

export const initialTwoLinesState: TwoLinesState = { slope: 2, n: 3 }

export const setTwoLines = (state: TwoLinesState, patch: Partial<TwoLinesState>): TwoLinesState => ({
    slope: clamp(patch.slope ?? state.slope, 0, SLOPES.length - 1),
    n: clamp(patch.n ?? state.n, -INTERCEPT_LIMIT, INTERCEPT_LIMIT)
})

export type Position = 'secant' | 'parallel' | 'coincident'
const value = (f: FractionValue) => f.numerator / f.denominator
export const secondSlope = (state: TwoLinesState) => SLOPES[state.slope]
export function positionOf(state: TwoLinesState): Position {
    const m = secondSlope(state)
    if (value(m) !== value(FIXED_LINE.m)) return 'secant'
    return state.n === FIXED_LINE.n ? 'coincident' : 'parallel'
}
/** The crossing point of two secant lines */
export function crossing(state: TwoLinesState): Point | null {
    if (positionOf(state) !== 'secant') return null
    const x = (state.n - FIXED_LINE.n) / (value(FIXED_LINE.m) - value(secondSlope(state)))
    return [x, value(FIXED_LINE.m) * x + FIXED_LINE.n]
}
const passes = (state: TwoLinesState, [x, y]: Point) => Math.abs(value(secondSlope(state)) * x + state.n - y) < 1e-9

export const twoLinesChallenges: LabChallenge<TwoLinesState>[] = [
    { id: 73801, prompt: say('Egin s zuzena $r\\colon y=2x-1$ zuzenaren paraleloa izatea.', 'Haz que s sea paralela a $r\\colon y=2x-1$.', 'اجعل s موازيًا لـ $r\\colon y=2x-1$.', 'Make s parallel to $r\\colon y=2x-1$.'), hint: say('Malda bera, n desberdina.', 'Misma pendiente, distinta n.', 'الميل نفسه وn مختلف.', 'Same slope, different n.'), isSolved: (state) => positionOf(state) === 'parallel' },
    { id: 73802, prompt: say('Egin s zuzena r-ren perpendikularra eta $(2,3)$ puntutik pasatzea.', 'Haz que s sea perpendicular a r y pase por $(2,3)$.', 'اجعل s عموديًا على r ويمر بـ $(2,3)$.', 'Make s perpendicular to r and pass through $(2,3)$.'), hint: same_('$m\'=-\\frac{1}{2}$'), isSolved: (state) => Math.abs(value(secondSlope(state)) * value(FIXED_LINE.m) + 1) < 1e-9 && passes(state, [2, 3]) },
    { id: 73803, prompt: say('Egin s zuzenak r $(1,1)$ puntuan ebakitzea.', 'Haz que s corte a r en $(1,1)$.', 'اجعل s يقطع r في $(1,1)$.', 'Make s cross r at $(1,1)$.'), hint: say('s $(1,1)$ puntutik, beste malda batekin.', 's por $(1,1)$, con otra pendiente.', 's يمر بـ $(1,1)$ بميل آخر.', 's through $(1,1)$, with a different slope.'), isSolved: (state) => positionOf(state) === 'secant' && passes(state, [1, 1]) },
    { id: 73804, prompt: say('Egin s eta r bat etortzea.', 'Haz que s y r sean coincidentes.', 'اجعل s وr منطبقين.', 'Make s and r coincident.'), hint: say('Malda bera eta n bera.', 'Misma pendiente y misma n.', 'الميل نفسه وn نفسه.', 'Same slope and same n.'), isSolved: (state) => positionOf(state) === 'coincident' }
]

/* ---------- 9. The bisector of a segment ---------- */

export interface BisectorState {
    a: Point
    b: Point
}

export const initialBisectorState: BisectorState = { a: [-2, 0], b: [2, 2] }
export const setBisector = (state: BisectorState, patch: Partial<BisectorState>): BisectorState => ({ a: clampPoint(patch.a ?? state.a), b: clampPoint(patch.b ?? state.b) })
/** The bisector with whole coefficients: 2(bx − ax)·x + 2(by − ay)·y − (|B|² − |A|²) = 0; null when A = B */
export function bisectorLine({ a, b }: BisectorState): Line | null {
    if (same(a, b)) return null
    const [dx, dy] = minus(b, a)
    const A = 2 * dx
    const B = 2 * dy
    const C = -(squaredLength(b) - squaredLength(a))
    const common = gcd(gcd(Math.abs(A), Math.abs(B)), Math.abs(C)) || 1
    const sign = A < 0 || (A === 0 && B < 0) ? -1 : 1
    return { A: (sign * A) / common + 0, B: (sign * B) / common + 0, C: (sign * C) / common + 0 }
}

export const bisectorChallenges: LabChallenge<BisectorState>[] = [
    { id: 73901, prompt: say('Egin erdibitzailea $y=x$ zuzena izatea.', 'Haz que la mediatriz sea la recta $y=x$.', 'اجعل المحور هو المستقيم $y=x$.', 'Make the perpendicular bisector the straight line $y=x$.'), hint: say('B, A-ren koordenatuak trukatuta.', 'B, con las coordenadas de A intercambiadas.', 'B بإحداثيي A متبادلين.', 'B, with the coordinates of A swapped.'), isSolved: (state) => { const line = bisectorLine(state); return line !== null && sameLine(line, { A: 1, B: -1, C: 0 }) } },
    { id: 73902, prompt: say('Egin erdibitzailea $x=1$ zuzen bertikala izatea.', 'Haz que la mediatriz sea la recta vertical $x=1$.', 'اجعل المحور المستقيم الرأسي $x=1$.', 'Make the perpendicular bisector the vertical straight line $x=1$.'), hint: say('A eta B ordenatu berean, eta abzisen batura 2.', 'A y B a la misma altura, y las abscisas suman 2.', 'A وB على الارتفاع نفسه ومجموع السينين 2.', 'A and B at the same height, and the x-coordinates add up to 2.'), isSolved: (state) => { const line = bisectorLine(state); return line !== null && sameLine(line, { A: 1, B: 0, C: -1 }) } },
    { id: 73903, prompt: say('Egin erdibitzailea jatorritik pasatzea.', 'Haz que la mediatriz pase por el origen.', 'اجعل المحور يمر بالأصل.', 'Make the perpendicular bisector pass through the origin.'), hint: say('A eta B jatorritik distantzia berera.', 'A y B a la misma distancia del origen.', 'A وB على المسافة نفسها من الأصل.', 'A and B at the same distance from the origin.'), isSolved: (state) => { const line = bisectorLine(state); return line !== null && onLine(line, [0, 0]) } },
    { id: 73904, prompt: say('Lortu $y=-2x+8$ erdibitzailea.', 'Consigue la mediatriz $y=-2x+8$.', 'احصل على المحور $y=-2x+8$.', 'Make the perpendicular bisector $y=-2x+8$.'), hint: say('Ikasgaiko adibidea: $A(1,1)$ eta $B(5,3)$.', 'El ejemplo de la lección: $A(1,1)$ y $B(5,3)$.', 'مثال الدرس: $A(1,1)$ و$B(5,3)$.', 'The example from the lesson: $A(1,1)$ and $B(5,3)$.'), isSolved: (state) => { const line = bisectorLine(state); return line !== null && sameLine(line, { A: 2, B: 1, C: -8 }) } }
]

/* ---------- 10. A circumference and a point ---------- */

export const RADIUS_MAX = 7
export const CENTER_LIMIT = 5

export interface CircleState {
    center: Point
    r: number
    p: Point
}

export const initialCircleState: CircleState = { center: [0, 0], r: 3, p: [1, 1] }
export const setCircle = (state: CircleState, patch: Partial<CircleState>): CircleState => ({
    center: clampPoint(patch.center ?? state.center, CENTER_LIMIT),
    r: clamp(patch.r ?? state.r, 1, RADIUS_MAX),
    p: clampPoint(patch.p ?? state.p, POINT_LIMIT + 2)
})
export type PointPlace = 'inside' | 'on' | 'outside'
export function placeOf({ center, r, p }: CircleState): PointPlace {
    const d = squaredLength(minus(p, center))
    return d === r * r ? 'on' : d < r * r ? 'inside' : 'outside'
}

export const circleChallenges: LabChallenge<CircleState>[] = [
    { id: 73001, prompt: say('Lortu $(x-2)^{2}+(y+1)^{2}=25$.', 'Consigue $(x-2)^{2}+(y+1)^{2}=25$.', 'احصل على $(x-2)^{2}+(y+1)^{2}=25$.', 'Make $(x-2)^{2}+(y+1)^{2}=25$.'), hint: say('Zentroa $(2,-1)$ eta erradioa 5.', 'Centro $(2,-1)$ y radio 5.', 'المركز $(2,-1)$ ونصف القطر 5.', 'Centre $(2,-1)$ and radius 5.'), isSolved: (state) => same(state.center, [2, -1]) && state.r === 5 },
    { id: 73002, prompt: say('Lortu jatorrian zentroa duen eta $(3,4)$ puntutik pasatzen den zirkunferentzia.', 'Consigue la circunferencia de centro el origen que pasa por $(3,4)$.', 'احصل على الدائرة التي مركزها الأصل وتمر بـ $(3,4)$.', 'Make the circumference with centre at the origin that passes through $(3,4)$.'), hint: same_('$r=\\sqrt{3^{2}+4^{2}}$'), isSolved: (state) => same(state.center, [0, 0]) && state.r === 5 },
    { id: 73003, prompt: say('Jarri P zirkunferentziaren gainean, zentroaren horizontal eta bertikal berean egon gabe.', 'Coloca P sobre la circunferencia, sin estar a la misma altura ni en la misma vertical que el centro.', 'ضع P على الدائرة دون أن تكون على ارتفاع المركز ولا على الرأسي نفسه.', 'Place P on the circumference, not at the same height as the centre or on the same vertical line as it.'), hint: say('Erradioa 5 eta P zentrotik $(3,4)$ urrats.', 'Radio 5 y P a $(3,4)$ pasos del centro.', 'نصف القطر 5 وP على بعد $(3,4)$ من المركز.', 'Radius 5 and P at $(3,4)$ steps from the centre.'), isSolved: (state) => placeOf(state) === 'on' && state.p[0] !== state.center[0] && state.p[1] !== state.center[1] },
    { id: 73004, prompt: say('Lortu bi ardatzak ukitzen dituen zirkunferentzia bat.', 'Consigue una circunferencia tangente a los dos ejes.', 'احصل على دائرة تمسّ المحورين.', 'Make a circumference that is tangent to both axes.'), hint: same_('$|a|=|b|=r$'), isSolved: (state) => Math.abs(state.center[0]) === state.r && Math.abs(state.center[1]) === state.r }
]

/* ---------- Progress ids ---------- */

export const vectorsLabChallengeIds = [
    ...vectorChallenges,
    ...combinationChallenges,
    ...segmentChallenges,
    ...alignChallenges,
    ...parametricChallenges,
    ...formsChallenges,
    ...slopeChallenges,
    ...twoLinesChallenges,
    ...bisectorChallenges,
    ...circleChallenges
].map((challenge) => challenge.id)
