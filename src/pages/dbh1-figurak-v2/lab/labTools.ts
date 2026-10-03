import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { FiguresStageId } from '../lessons.tsx'

/* ==========================================================================
   Irudi lauak (1. DBH) laboratory: the polygon with its diagonals, triangles
   and angles; regular tiles around a vertex; building a triangle from three
   sides; the notable points of a triangle whose top vertex moves; the
   quadrilateral built from its two diagonals; a line or a second circle
   moving against a circle; sectors and rings with π ≈ 3,14; and the L shape
   measured by completing or by splitting. Pure state logic; the components
   live next to this file. Tests in tests/figurak-dbh1-lab.test.ts.
   ========================================================================== */

export type FiguresLabToolId = 'polygon' | 'tiling' | 'triangle' | 'centers' | 'quad' | 'circles' | 'sector' | 'composite'

export interface FiguresLabTool extends LabToolInfo {
    id: FiguresLabToolId
    stage: FiguresStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string) => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const same = (value: FractionValue, other: FractionValue) => value.numerator * other.denominator === other.numerator * value.denominator

export const figuresLabTools: FiguresLabTool[] = [
    { id: 'polygon', stage: 'polygons', lessonTopic: 'diagonals', title: say('Poligonoaren barrua', 'El polígono por dentro', 'المضلع من الداخل'), observe: say('Alde bat gehitzean, erpin bakoitzetik diagonal bat gehiago ateratzen da eta triangelu bat gehiago sartzen da: batura 180° handitzen da.', 'Al añadir un lado, de cada vértice sale una diagonal más y cabe un triángulo más: la suma crece 180°.', 'عند إضافة ضلع يخرج من كل رأس قطر إضافي ويتسع المضلع لمثلث آخر: يزيد المجموع 180°.') },
    { id: 'tiling', stage: 'polygons', lessonTopic: 'regular-angles', title: say('Lauzak erpin baten inguruan', 'Baldosas alrededor de un vértice', 'بلاطات حول رأس'), observe: say('Lauzek hutsunerik gabe ixten dute erpina angeluek zehazki 360° egiten dutenean.', 'Las baldosas cierran el vértice sin huecos cuando sus ángulos suman justo 360°.', 'تُغلق البلاطات الرأس دون فراغات حين يكون مجموع زواياها 360° تمامًا.') },
    { id: 'triangle', stage: 'triangles', lessonTopic: 'triangle-exists', title: say('Eraiki triangelua', 'Construye el triángulo', 'أنشئ المثلث'), observe: say('Alde handiena beste bien batura bada edo handiagoa, aldeak ez dira elkartzen. Eta alde handienaren karratua beste bien karratuen baturarekin konparatuz, angelu handiena zuzena, zorrotza ala kamutsa den jakiten da.', 'Si el lado mayor es igual o mayor que la suma de los otros dos, los lados no se juntan. Y comparando el cuadrado del lado mayor con la suma de los cuadrados de los otros, se sabe si el ángulo mayor es recto, agudo u obtuso.', 'إذا كان الضلع الأكبر مساويًا لمجموع الآخرين أو أكبر فلا يلتقي الضلعان. وبمقارنة مربع الضلع الأكبر بمجموع مربعي الآخرين نعرف هل الزاوية الكبرى قائمة أم حادة أم منفرجة.') },
    { id: 'centers', stage: 'triangles', lessonTopic: 'centers', title: say('Puntu nabarmenak mugitzen', 'Puntos notables en movimiento', 'النقاط المهمة في حركة'), observe: say('Mugitu goiko erpina. Zirkunzentroa eta ortozentroa kanpora ateratzen dira triangelua angelu-kamutsa denean; barizentroa eta inzentroa beti barruan geratzen dira.', 'Mueve el vértice de arriba. El circuncentro y el ortocentro se salen cuando el triángulo es obtusángulo; el baricentro y el incentro siempre se quedan dentro.', 'حرّك الرأس العلوي. يخرج مركز الدائرة المحيطة وملتقى الارتفاعات حين يصبح المثلث منفرجًا؛ أما مركز الثقل ومركز الدائرة الداخلية فيبقيان داخله دائمًا.') },
    { id: 'quad', stage: 'quadrilaterals', lessonTopic: 'quad-diagonals', title: say('Laukia diagonaletatik', 'El cuadrilátero desde sus diagonales', 'الرباعي من قطريه'), observe: say('Diagonalek erabakitzen dute laukia: erdian ebakitzen badira, paralelogramoa; berdinak badira, laukizuzena; perpendikularrak badira, erronboa.', 'Las diagonales deciden el cuadrilátero: si se cortan por la mitad, paralelogramo; si son iguales, rectángulo; si son perpendiculares, rombo.', 'القطران يحددان الرباعي: إذا نصّف كلٌّ منهما الآخر فمتوازي أضلاع؛ وإذا تساويا فمستطيل؛ وإذا تعامدا فمعيّن.') },
    { id: 'circles', stage: 'circles', lessonTopic: 'two-circles', title: say('Zirkunferentzien posizioak', 'Posiciones de circunferencias', 'أوضاع الدوائر'), observe: say('Begiratu d zenbakiari eta konparatu erradioarekin (zuzena) edo erradioen batura eta kendurarekin (bi zirkunferentzia).', 'Mira el número d y compáralo con el radio (recta) o con la suma y la resta de los radios (dos circunferencias).', 'انظر إلى العدد d وقارنه بنصف القطر (مستقيم) أو بمجموع نصفي القطرين وفرقهما (دائرتان).') },
    { id: 'sector', stage: 'areas', lessonTopic: 'sector-ring', title: say('Sektorea eta koroa', 'Sector y corona', 'القطاع والحلقة'), observe: say('Angelua bikoiztean, arkua eta sektorearen azalera bikoizten dira. Erradioa bikoiztean, arkua bikoizten da, baina azalera laukoizten.', 'Al doblar el ángulo, el arco y el área del sector se doblan. Al doblar el radio, el arco se dobla, pero el área se multiplica por cuatro.', 'إذا ضاعفنا الزاوية تضاعف القوس ومساحة القطاع. وإذا ضاعفنا نصف القطر تضاعف القوس لكن المساحة تتضاعف أربع مرات.') },
    { id: 'composite', stage: 'areas', lessonTopic: 'composite', title: say('L formako irudia', 'La figura en L', 'الشكل L'), observe: say('Bi bideek emaitza bera ematen dute: laukizuzen osoa ken izkina, edo bi zatien batura.', 'Los dos caminos dan lo mismo: el rectángulo entero menos la esquina, o la suma de las dos piezas.', 'الطريقان يعطيان النتيجة نفسها: المستطيل كاملًا ناقص الركن، أو مجموع القطعتين.') }
]

export const figuresLabToolForTopic: Record<string, FiguresLabToolId | undefined> = {
    diagonals: 'polygon',
    'angle-sum': 'polygon',
    'regular-angles': 'tiling',
    'triangle-exists': 'triangle',
    'side-angle': 'triangle',
    centers: 'centers',
    'quad-diagonals': 'quad',
    'quad-angles': 'quad',
    symmetry: 'quad',
    'line-circle': 'circles',
    'two-circles': 'circles',
    'circle-angles': 'circles',
    composite: 'composite',
    'sector-ring': 'sector',
    'area-problems': 'composite'
}

/* ---------- 1. The polygon inside ---------- */

export type PolygonMode = 'diagonals' | 'triangles' | 'angles'

export const POLYGON_MIN = 3
export const POLYGON_MAX = 12

export interface PolygonState {
    sides: number
    mode: PolygonMode
}

export const initialPolygonState: PolygonState = { sides: 5, mode: 'diagonals' }

export const setPolygon = (state: PolygonState, patch: Partial<PolygonState>): PolygonState => ({
    sides: clamp(patch.sides ?? state.sides, POLYGON_MIN, POLYGON_MAX),
    mode: patch.mode ?? state.mode
})

export const diagonalCount = (sides: number) => (sides * (sides - 3)) / 2
export const angleSum = (sides: number) => (sides - 2) * 180
/** Interior angle of the regular polygon, exact */
export const interiorAngle = (sides: number) => fraction(angleSum(sides), sides)
export const centralAngle = (sides: number) => fraction(360, sides)

export const polygonChallenges: LabChallenge<PolygonState>[] = [
    { id: 17101, prompt: say('Aurkitu 20 diagonal dituen poligonoa.', 'Encuentra el polígono que tiene 20 diagonales.', 'أوجد المضلع الذي له 20 قطرًا.'), hint: say('$\\frac{n\\cdot(n-3)}{2}=20$: probatu 7, 8…', '$\\frac{n\\cdot(n-3)}{2}=20$: prueba 7, 8…', '$\\frac{n\\cdot(n-3)}{2}=20$: جرّب 7، 8…'), isSolved: (state) => diagonalCount(state.sides) === 20 },
    { id: 17102, prompt: say('Aurkitu barne-angeluek $900^{\\circ}$ egiten dituzten poligonoa.', 'Encuentra el polígono cuyos ángulos interiores suman $900^{\\circ}$.', 'أوجد المضلع الذي مجموع زواياه الداخلية $900^{\\circ}$.'), hint: say('$900\\mathbin{:}180=5$ triangelu.', '$900\\mathbin{:}180=5$ triángulos.', '$900\\mathbin{:}180=5$ مثلثات.'), isSolved: (state) => angleSum(state.sides) === 900 },
    { id: 17103, prompt: say('Aurkitu $140^{\\circ}$-ko barne-angelua duen poligono erregularra.', 'Encuentra el polígono regular con un ángulo interior de $140^{\\circ}$.', 'أوجد المضلع المنتظم الذي زاويته الداخلية $140^{\\circ}$.'), hint: say('Barne-angelua handitzen da aldeak gehitzean.', 'El ángulo interior crece al añadir lados.', 'تكبر الزاوية الداخلية بزيادة الأضلاع.'), isSolved: (state) => same(interiorAngle(state.sides), fraction(140)) },
    { id: 17104, prompt: say('Aurkitu $30^{\\circ}$-ko angelu zentrala duen poligono erregularra.', 'Encuentra el polígono regular con un ángulo central de $30^{\\circ}$.', 'أوجد المضلع المنتظم الذي زاويته المركزية $30^{\\circ}$.'), hint: say('$360\\mathbin{:}30$.', '$360\\mathbin{:}30$.', '$360\\mathbin{:}30$.'), isSolved: (state) => same(centralAngle(state.sides), fraction(30)) }
]

/* ---------- 2. Tiles around a vertex ---------- */

export const TILE_SIDES = [3, 4, 5, 6, 8] as const
export type TileSides = (typeof TILE_SIDES)[number]
export const TILE_COPIES_MAX = 6

export interface TilingState {
    sides: TileSides
    copies: number
}

export const initialTilingState: TilingState = { sides: 5, copies: 2 }

export const setTiling = (state: TilingState, patch: Partial<TilingState>): TilingState => ({
    sides: patch.sides ?? state.sides,
    copies: clamp(patch.copies ?? state.copies, 1, TILE_COPIES_MAX)
})

/** Total angle around the vertex, exact */
export const tilingTotal = (state: TilingState) => fraction(angleSum(state.sides) * state.copies, state.sides)

export type TilingStatus = 'gap' | 'closed' | 'overlap'

export function tilingStatus(state: TilingState): TilingStatus {
    const total = tilingTotal(state)
    const difference = total.numerator - 360 * total.denominator
    return difference === 0 ? 'closed' : difference < 0 ? 'gap' : 'overlap'
}

export const tilingChallenges: LabChallenge<TilingState>[] = [
    { id: 17201, prompt: say('Itxi erpina triangelu aldeberdinekin.', 'Cierra el vértice con triángulos equiláteros.', 'أغلق الرأس بمثلثات متساوية الأضلاع.'), hint: say('$60^{\\circ}$ bakoitza.', '$60^{\\circ}$ cada uno.', '$60^{\\circ}$ لكل واحد.'), isSolved: (state) => state.sides === 3 && tilingStatus(state) === 'closed' },
    { id: 17202, prompt: say('Itxi erpina hexagonoekin.', 'Cierra el vértice con hexágonos.', 'أغلق الرأس بمسدسات.'), hint: say('$120^{\\circ}$ bakoitza.', '$120^{\\circ}$ cada uno.', '$120^{\\circ}$ لكل واحد.'), isSolved: (state) => state.sides === 6 && tilingStatus(state) === 'closed' },
    { id: 17203, prompt: say('Erakutsi hiru pentagonok hutsune bat uzten dutela.', 'Muestra que tres pentágonos dejan un hueco.', 'بيّن أن ثلاثة مخمسات تترك فجوة.'), hint: say('$3\\cdot 108^{\\circ}=324^{\\circ}$.', '$3\\cdot 108^{\\circ}=324^{\\circ}$.', '$3\\cdot 108^{\\circ}=324^{\\circ}$.'), isSolved: (state) => state.sides === 5 && state.copies === 3 },
    { id: 17204, prompt: say('Erakutsi lau pentagono gainjartzen direla.', 'Muestra que cuatro pentágonos se solapan.', 'بيّن أن أربعة مخمسات تتراكب.'), hint: say('$4\\cdot 108^{\\circ}=432^{\\circ}$.', '$4\\cdot 108^{\\circ}=432^{\\circ}$.', '$4\\cdot 108^{\\circ}=432^{\\circ}$.'), isSolved: (state) => state.sides === 5 && state.copies === 4 }
]

/* ---------- 3. Building a triangle from three sides ---------- */

export const SIDE_MAX = 12

export interface TriangleState {
    a: number
    b: number
    c: number
}

export const initialTriangleState: TriangleState = { a: 3, b: 5, c: 7 }

export const setTriangle = (state: TriangleState, patch: Partial<TriangleState>): TriangleState => ({
    a: clamp(patch.a ?? state.a, 1, SIDE_MAX),
    b: clamp(patch.b ?? state.b, 1, SIDE_MAX),
    c: clamp(patch.c ?? state.c, 1, SIDE_MAX)
})

export type Closure = 'closes' | 'flat' | 'open'
export type SideKind = 'equilateral' | 'isosceles' | 'scalene'
export type AngleKind = 'acute' | 'right' | 'obtuse'

const sorted = (state: TriangleState) => [state.a, state.b, state.c].sort((x, y) => x - y)

export function closure(state: TriangleState): Closure {
    const [small, middle, large] = sorted(state)
    return large < small + middle ? 'closes' : large === small + middle ? 'flat' : 'open'
}

export function sideKind(state: TriangleState): SideKind {
    const distinct = new Set([state.a, state.b, state.c]).size
    return distinct === 1 ? 'equilateral' : distinct === 2 ? 'isosceles' : 'scalene'
}

/** Compares the square of the largest side with the sum of the other two squares */
export function angleKind(state: TriangleState): AngleKind {
    const [small, middle, large] = sorted(state)
    const difference = large * large - (small * small + middle * middle)
    return difference === 0 ? 'right' : difference < 0 ? 'acute' : 'obtuse'
}

/** Angles opposite a, b and c in whole degrees (only when the triangle closes) */
export function triangleAngles(state: TriangleState): [number, number, number] {
    const { a, b, c } = state
    const opposite = (x: number, y: number, z: number) => (Math.acos((y * y + z * z - x * x) / (2 * y * z)) * 180) / Math.PI
    return [opposite(a, b, c), opposite(b, c, a), opposite(c, a, b)].map((value) => Math.round(value)) as [number, number, number]
}

export const triangleChallenges: LabChallenge<TriangleState>[] = [
    { id: 17301, prompt: say('Aukeratu ixten ez den triangelu baten aldeak.', 'Elige los lados de un triángulo que no se cierra.', 'اختر أضلاع مثلث لا يُغلق.'), hint: say('Alde handiena beste biak baino luzeagoa.', 'El lado mayor, más largo que los otros dos juntos.', 'الضلع الأكبر أطول من الآخرين معًا.'), isSolved: (state) => closure(state) === 'open' },
    { id: 17302, prompt: say('Lortu aldeak zuzen baten gainean geratzea.', 'Consigue que los lados queden aplastados sobre una recta.', 'اجعل الأضلاع تنطبق على مستقيم.'), hint: say('Alde handiena = beste bien batura.', 'Lado mayor = suma de los otros dos.', 'الضلع الأكبر = مجموع الآخرين.'), isSolved: (state) => closure(state) === 'flat' },
    { id: 17303, prompt: say('Eraiki triangelu isoszele angelu-kamuts bat.', 'Construye un triángulo isósceles obtusángulo.', 'أنشئ مثلثًا متساوي الساقين منفرج الزاوية.'), hint: say('Bi alde berdin eta hirugarren luze bat: 4, 4, 7.', 'Dos lados iguales y un tercero largo: 4, 4, 7.', 'ضلعان متساويان وثالث طويل: 4، 4، 7.'), isSolved: (state) => closure(state) === 'closes' && sideKind(state) === 'isosceles' && angleKind(state) === 'obtuse' },
    { id: 17304, prompt: say('Eraiki triangelu angeluzuzen bat.', 'Construye un triángulo rectángulo.', 'أنشئ مثلثًا قائم الزاوية.'), hint: say('Pitagoras: $3^{2}+4^{2}=5^{2}$.', 'Pitágoras: $3^{2}+4^{2}=5^{2}$.', 'فيثاغورس: $3^{2}+4^{2}=5^{2}$.'), isSolved: (state) => closure(state) === 'closes' && angleKind(state) === 'right' }
]

/* ---------- 4. Notable points: A(0, 0), B(10, 0), C(x, h) ---------- */

export type CentrePoint = 'circum' | 'in' | 'centroid' | 'ortho'
export const BASE = 10
export const APEX_X_MIN = -3
export const APEX_X_MAX = 13
export const APEX_H_MAX = 8

export interface CentersState {
    x: number
    h: number
    point: CentrePoint
}

export const initialCentersState: CentersState = { x: 4, h: 6, point: 'circum' }

export const setCenters = (state: CentersState, patch: Partial<CentersState>): CentersState => ({
    x: clamp(patch.x ?? state.x, APEX_X_MIN, APEX_X_MAX),
    h: clamp(patch.h ?? state.h, 1, APEX_H_MAX),
    point: patch.point ?? state.point
})

export type Vertex = 'A' | 'B' | 'C'

/** Kind of the triangle by its largest angle, and the vertex where that angle is */
export function apexKind(state: CentersState): { kind: AngleKind; vertex: Vertex } {
    // Dot products of the two sides at each vertex: zero for a right angle, negative for an obtuse one
    const dots: Array<[Vertex, number]> = [
        ['A', BASE * state.x],
        ['B', BASE * (BASE - state.x)],
        ['C', -state.x * (BASE - state.x) + state.h * state.h]
    ]
    const [vertex, dot] = dots.reduce((low, item) => (item[1] < low[1] ? item : low))
    return { kind: dot === 0 ? 'right' : dot < 0 ? 'obtuse' : 'acute', vertex }
}

export function centrePoint(state: CentersState, point: CentrePoint = state.point): [number, number] {
    const { x, h } = state
    if (point === 'circum') return [BASE / 2, (x * x - BASE * x + h * h) / (2 * h)]
    if (point === 'ortho') return [x, (x * (BASE - x)) / h]
    if (point === 'centroid') return [(BASE + x) / 3, h / 3]
    const a = Math.hypot(x - BASE, h)
    const b = Math.hypot(x, h)
    const c = BASE
    return [(b * BASE + c * x) / (a + b + c), (c * h) / (a + b + c)]
}

export type Placement = 'inside' | 'side' | 'vertex' | 'outside'

/** Where the chosen point falls: inside, on a side (circumcentre of a right triangle), on a vertex (orthocentre) or outside */
export function placement(state: CentersState, point: CentrePoint = state.point): Placement {
    if (point === 'centroid' || point === 'in') return 'inside'
    const { kind } = apexKind(state)
    if (kind === 'acute') return 'inside'
    if (kind === 'obtuse') return 'outside'
    return point === 'circum' ? 'side' : 'vertex'
}

export const centersChallenges: LabChallenge<CentersState>[] = [
    { id: 17401, prompt: say('Atera zirkunzentroa triangelutik.', 'Saca el circuncentro fuera del triángulo.', 'أخرج مركز الدائرة المحيطة من المثلث.'), hint: say('Triangelu angelu-kamutsa behar da.', 'Hace falta un triángulo obtusángulo.', 'نحتاج مثلثًا منفرج الزاوية.'), isSolved: (state) => state.point === 'circum' && placement(state) === 'outside' },
    { id: 17402, prompt: say('Jarri zirkunzentroa alde baten gainean.', 'Pon el circuncentro justo sobre un lado.', 'ضع مركز الدائرة المحيطة على ضلع تمامًا.'), hint: say('Triangelu angeluzuzena: probatu C erpina A-ren gainean.', 'Triángulo rectángulo: prueba el vértice C encima de A.', 'مثلث قائم: جرّب الرأس C فوق A.'), isSolved: (state) => state.point === 'circum' && placement(state) === 'side' },
    { id: 17403, prompt: say('Lortu ortozentroa erpin batean egotea.', 'Consigue que el ortocentro esté en un vértice.', 'اجعل ملتقى الارتفاعات عند رأس.'), hint: say('Angeluzuzenean, angelu zuzeneko erpinean dago.', 'En el rectángulo está en el vértice del ángulo recto.', 'في المثلث القائم يقع عند رأس الزاوية القائمة.'), isSolved: (state) => state.point === 'ortho' && placement(state) === 'vertex' },
    { id: 17404, prompt: say('Egiaztatu barizentroa barruan geratzen dela triangelu angelu-kamuts batean ere.', 'Comprueba que el baricentro se queda dentro también en un obtusángulo.', 'تحقّق من أن مركز الثقل يبقى داخل المثلث المنفرج أيضًا.'), hint: say('Aukeratu barizentroa eta eraman C oso alde batera.', 'Elige el baricentro y lleva C muy a un lado.', 'اختر مركز الثقل وحرّك C بعيدًا إلى جانب.'), isSolved: (state) => state.point === 'centroid' && apexKind(state).kind === 'obtuse' }
]

/* ---------- 5. The quadrilateral from its diagonals ---------- */

export type DiagonalCut = 'both' | 'one'
export type QuadName = 'square' | 'rectangle' | 'rhombus' | 'romboid' | 'kite' | 'trapezoid'
export const DIAGONAL_MIN = 2
export const DIAGONAL_MAX = 10

export interface QuadState {
    first: number
    second: number
    angle: 90 | 60
    cut: DiagonalCut
}

export const initialQuadState: QuadState = { first: 8, second: 5, angle: 60, cut: 'both' }

export const setQuad = (state: QuadState, patch: Partial<QuadState>): QuadState => ({
    first: clamp(patch.first ?? state.first, DIAGONAL_MIN, DIAGONAL_MAX),
    second: clamp(patch.second ?? state.second, DIAGONAL_MIN, DIAGONAL_MAX),
    angle: patch.angle ?? state.angle,
    cut: patch.cut ?? state.cut
})

export function quadName(state: QuadState): QuadName {
    const perpendicular = state.angle === 90
    if (state.cut === 'one') return perpendicular ? 'kite' : 'trapezoid'
    if (state.first === state.second) return perpendicular ? 'square' : 'rectangle'
    return perpendicular ? 'rhombus' : 'romboid'
}

export const symmetryAxes: Record<QuadName, number> = { square: 4, rectangle: 2, rhombus: 2, romboid: 0, kite: 1, trapezoid: 0 }

export const quadChallenges: LabChallenge<QuadState>[] = [
    { id: 17501, prompt: say('Eraiki karratu bat.', 'Construye un cuadrado.', 'أنشئ مربعًا.'), hint: say('Diagonal berdinak, perpendikularrak, erdian ebakita.', 'Diagonales iguales, perpendiculares y cortadas por la mitad.', 'قطران متساويان متعامدان ينصّف كلٌّ منهما الآخر.'), isSolved: (state) => quadName(state) === 'square' },
    { id: 17502, prompt: say('Eraiki karratua ez den erronbo bat.', 'Construye un rombo que no sea cuadrado.', 'أنشئ معيّنًا ليس مربعًا.'), hint: say('Perpendikularrak, baina luzera desberdinekoak.', 'Perpendiculares, pero de distinta longitud.', 'متعامدان لكن بطولين مختلفين.'), isSolved: (state) => quadName(state) === 'rhombus' },
    { id: 17503, prompt: say('Eraiki karratua ez den laukizuzen bat.', 'Construye un rectángulo que no sea cuadrado.', 'أنشئ مستطيلًا ليس مربعًا.'), hint: say('Diagonal berdinak, $60^{\\circ}$-ko angeluan.', 'Diagonales iguales, con un ángulo de $60^{\\circ}$.', 'قطران متساويان بزاوية $60^{\\circ}$.'), isSolved: (state) => quadName(state) === 'rectangle' },
    { id: 17504, prompt: say('Eraiki kometa bat.', 'Construye una cometa.', 'أنشئ طائرة ورقية.'), hint: say('Perpendikularrak, baina bakarra erdian ebakita.', 'Perpendiculares, pero solo una cortada por la mitad.', 'متعامدان، لكن واحدًا فقط يُنصَّف.'), isSolved: (state) => quadName(state) === 'kite' }
]

/* ---------- 6. Positions of a line or a second circle ---------- */

export type CirclesMode = 'line' | 'two'
export const RADIUS_MAX = 10
export const DISTANCE_MAX = 20

export interface CirclesState {
    mode: CirclesMode
    first: number
    second: number
    distance: number
}

export const initialCirclesState: CirclesState = { mode: 'two', first: 5, second: 3, distance: 10 }

export const setCircles = (state: CirclesState, patch: Partial<CirclesState>): CirclesState => ({
    mode: patch.mode ?? state.mode,
    first: clamp(patch.first ?? state.first, 1, RADIUS_MAX),
    second: clamp(patch.second ?? state.second, 1, RADIUS_MAX),
    distance: clamp(patch.distance ?? state.distance, 0, DISTANCE_MAX)
})

export type CirclePosition = 'secant' | 'tangent' | 'exterior' | 'tangent-exterior' | 'tangent-interior' | 'interior' | 'concentric' | 'coincident'

export function circlePosition(state: CirclesState): CirclePosition {
    const d = state.distance
    if (state.mode === 'line') return d < state.first ? 'secant' : d === state.first ? 'tangent' : 'exterior'
    const big = Math.max(state.first, state.second)
    const small = Math.min(state.first, state.second)
    if (d === 0) return big === small ? 'coincident' : 'concentric'
    if (d > big + small) return 'exterior'
    if (d === big + small) return 'tangent-exterior'
    if (d > big - small) return 'secant'
    return d === big - small ? 'tangent-interior' : 'interior'
}

export const circlesChallenges: LabChallenge<CirclesState>[] = [
    { id: 17601, prompt: say('Jarri zuzena ukitzaile.', 'Pon la recta tangente.', 'اجعل المستقيم مماسًا.'), hint: say('$d=r$.', '$d=r$.', '$d=r$.'), isSolved: (state) => state.mode === 'line' && circlePosition(state) === 'tangent' },
    { id: 17602, prompt: say('Jarri bi zirkunferentziak kanpotik ukitzaile.', 'Pon las dos circunferencias tangentes exteriores.', 'اجعل الدائرتين متماستين من الخارج.'), hint: say('$d=r_1+r_2$.', '$d=r_1+r_2$.', '$d=r_1+r_2$.'), isSolved: (state) => circlePosition(state) === 'tangent-exterior' },
    { id: 17603, prompt: say('Jarri bi zirkunferentziak barrutik ukitzaile.', 'Pon las dos circunferencias tangentes interiores.', 'اجعل الدائرتين متماستين من الداخل.'), hint: say('$d=r_1-r_2$, eta erradio desberdinak.', '$d=r_1-r_2$, con radios distintos.', '$d=r_1-r_2$، بنصفي قطرين مختلفين.'), isSolved: (state) => circlePosition(state) === 'tangent-interior' },
    { id: 17604, prompt: say('Egin bi zirkunferentzia zentrokide.', 'Haz dos circunferencias concéntricas.', 'ارسم دائرتين متحدتي المركز.'), hint: say('$d=0$ eta erradio desberdinak.', '$d=0$ y radios distintos.', '$d=0$ ونصفا قطرين مختلفان.'), isSolved: (state) => circlePosition(state) === 'concentric' }
]

/* ---------- 7. Sector and ring with π ≈ 3,14 ---------- */

export type SectorMode = 'sector' | 'ring'
export const SECTOR_RADIUS_MAX = 10
export const ANGLE_STEP = 15

export interface SectorState {
    mode: SectorMode
    radius: number
    angle: number
    outer: number
    inner: number
}

export const initialSectorState: SectorState = { mode: 'sector', radius: 4, angle: 60, outer: 6, inner: 2 }

export function setSector(state: SectorState, patch: Partial<SectorState>): SectorState {
    const outer = clamp(patch.outer ?? state.outer, 2, SECTOR_RADIUS_MAX)
    return {
        mode: patch.mode ?? state.mode,
        radius: clamp(patch.radius ?? state.radius, 1, SECTOR_RADIUS_MAX),
        angle: clamp(Math.round((patch.angle ?? state.angle) / ANGLE_STEP) * ANGLE_STEP, ANGLE_STEP, 360),
        outer,
        inner: clamp(patch.inner ?? state.inner, 1, outer - 1)
    }
}

/** 3,14 · r² · α / 360, exact */
export const sectorArea = (state: SectorState) => fraction(314 * state.radius * state.radius * state.angle, 100 * 360)
/** 2 · 3,14 · r · α / 360, exact */
export const arcLength = (state: SectorState) => fraction(2 * 314 * state.radius * state.angle, 100 * 360)
/** 3,14 · (R² − r²), exact */
export const ringArea = (state: SectorState) => fraction(314 * (state.outer * state.outer - state.inner * state.inner), 100)

export const sectorChallenges: LabChallenge<SectorState>[] = [
    { id: 17701, prompt: say('Lortu $78{,}5$ cm²-ko sektore bat.', 'Consigue un sector de $78{,}5$ cm².', 'احصل على قطاع مساحته $78{,}5$ سم².'), hint: say('10 cm-ko zirkuluaren laurdena.', 'Un cuarto del círculo de 10 cm.', 'ربع قرص نصف قطره 10 سم.'), isSolved: (state) => state.mode === 'sector' && same(sectorArea(state), fraction(785, 10)) },
    { id: 17702, prompt: say('Lortu $31{,}4$ cm-ko arku bat.', 'Consigue un arco de $31{,}4$ cm.', 'احصل على قوس طوله $31{,}4$ سم.'), hint: say('10 cm-ko zirkunferentziaren erdia.', 'La mitad de la circunferencia de 10 cm.', 'نصف دائرة نصف قطرها 10 سم.'), isSolved: (state) => state.mode === 'sector' && same(arcLength(state), fraction(314, 10)) },
    { id: 17703, prompt: say('Lortu $50{,}24$ cm²-ko koroa bat.', 'Consigue una corona de $50{,}24$ cm².', 'احصل على حلقة مساحتها $50{,}24$ سم².'), hint: say('$R^{2}-r^{2}=16$.', '$R^{2}-r^{2}=16$.', '$R^{2}-r^{2}=16$.'), isSolved: (state) => state.mode === 'ring' && same(ringArea(state), fraction(5024, 100)) },
    { id: 17704, prompt: say('Lortu $120^{\\circ}$-ko eta $37{,}68$ cm²-ko sektore bat.', 'Consigue un sector de $120^{\\circ}$ y $37{,}68$ cm².', 'احصل على قطاع زاويته $120^{\\circ}$ ومساحته $37{,}68$ سم².'), hint: say('$120^{\\circ}$ herena da: zirkulu osoa $113{,}04$.', '$120^{\\circ}$ es un tercio: el círculo entero, $113{,}04$.', '$120^{\\circ}$ ثلث: القرص كاملًا $113{,}04$.'), isSolved: (state) => state.mode === 'sector' && state.angle === 120 && same(sectorArea(state), fraction(3768, 100)) }
]

/* ---------- 8. The L shape ---------- */

export type CompositeMethod = 'subtract' | 'split'
export const WIDTH_MAX = 12
export const HEIGHT_MAX = 10

export interface CompositeState {
    width: number
    height: number
    cutWidth: number
    cutHeight: number
    method: CompositeMethod
}

export const initialCompositeState: CompositeState = { width: 10, height: 6, cutWidth: 4, cutHeight: 3, method: 'subtract' }

export function setComposite(state: CompositeState, patch: Partial<CompositeState>): CompositeState {
    const width = clamp(patch.width ?? state.width, 3, WIDTH_MAX)
    const height = clamp(patch.height ?? state.height, 2, HEIGHT_MAX)
    return {
        width,
        height,
        cutWidth: clamp(patch.cutWidth ?? state.cutWidth, 1, width - 1),
        cutHeight: clamp(patch.cutHeight ?? state.cutHeight, 1, height - 1),
        method: patch.method ?? state.method
    }
}

export const compositeArea = (state: CompositeState) => state.width * state.height - state.cutWidth * state.cutHeight
/** The two pieces when the L is split by a vertical line: the tall one and the short one */
export const compositePieces = (state: CompositeState): [number, number] => [(state.width - state.cutWidth) * state.height, state.cutWidth * (state.height - state.cutHeight)]
/** Cutting a corner keeps the perimeter of the rectangle */
export const compositePerimeter = (state: CompositeState) => 2 * (state.width + state.height)

export const compositeChallenges: LabChallenge<CompositeState>[] = [
    { id: 17801, prompt: say('Egin 48 cm²-ko L bat.', 'Haz una L de 48 cm².', 'اصنع شكل L مساحته 48 سم².'), hint: say('Adibidez, $10\\cdot 6-4\\cdot 3$.', 'Por ejemplo, $10\\cdot 6-4\\cdot 3$.', 'مثلًا $10\\cdot 6-4\\cdot 3$.'), isSolved: (state) => compositeArea(state) === 48 },
    { id: 17802, prompt: say('Kendu laukizuzenaren erdia izkinan.', 'Quita la mitad del rectángulo en la esquina.', 'أزل نصف المستطيل من الركن.'), hint: say('Izkinaren azalera = osoaren erdia.', 'El área de la esquina = la mitad del total.', 'مساحة الركن = نصف الكل.'), isSolved: (state) => 2 * state.cutWidth * state.cutHeight === state.width * state.height },
    { id: 17803, prompt: say('Egin L bat, bi zatiak berdinak izan daitezen.', 'Haz una L cuyas dos piezas midan lo mismo.', 'اصنع شكل L تتساوى قطعتاه.'), hint: say('Probatu 10 × 6 eta 6 × 2-ko izkina.', 'Prueba 10 × 6 con una esquina de 6 × 2.', 'جرّب 10 × 6 مع ركن 6 × 2.'), isSolved: (state) => compositePieces(state)[0] === compositePieces(state)[1] }
]

export const figuresLabChallengeIds = [
    ...polygonChallenges,
    ...tilingChallenges,
    ...triangleChallenges,
    ...centersChallenges,
    ...quadChallenges,
    ...circlesChallenges,
    ...sectorChallenges,
    ...compositeChallenges
].map((challenge) => challenge.id)
