import { equals, fraction, toNumber } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { globalExtremes, graphValue, graphXRange, isFunctionRelation, pointsAtX, quadrantOf, slopeBetween, storyGraphs, trendIntervals, type Point } from '../functions.ts'
import type { FunctionsStageId } from '../lessons.tsx'

/* ==========================================================================
   Funtzioak (2. DBH) laboratory: the plane and its quadrants, the vertical
   line test, tables and formulas, reading a graph, the slope between two
   points and the straight line y = mx + n. Pure state logic and challenges;
   components live next to this file. Tests in tests/funtzioak-dbh2-lab.test.ts.
   ========================================================================== */

export type FunctionsLabToolId = 'plane' | 'relation' | 'table' | 'reading' | 'slope' | 'line'

export interface FunctionsLabTool extends LabToolInfo {
    id: FunctionsLabToolId
    stage: FunctionsStageId
}

export const functionsLabTools: FunctionsLabTool[] = [
    {
        id: 'plane',
        stage: 'idea',
        lessonTopic: 'coordinates',
        title: { eu: 'Planoa eta koordenatuak', es: 'El plano y las coordenadas', ar: 'المستوى والإحداثيات' },
        observe: {
            eu: 'Aldatu x eta y: puntua lehenengo horizontalki eta gero bertikalki mugitzen da. Koordenatuen zeinuek koadrantea esaten dute.',
            es: 'Cambia x e y: el punto se mueve primero en horizontal y luego en vertical. Los signos de las coordenadas dicen el cuadrante.',
            ar: 'غيّر x وy: تتحرك النقطة أفقيًا أولًا ثم رأسيًا. وتحدد إشارتا الإحداثيين الربع.'
        }
    },
    {
        id: 'relation',
        stage: 'idea',
        lessonTopic: 'function',
        title: { eu: 'Funtzioa ala ez?', es: '¿Función o no?', ar: 'دالة أم لا؟' },
        observe: {
            eu: 'Mugitu zuzen bertikala. Puntu bat baino gehiago ebakitzen dituenean x berak bi irteera ditu: ez da funtzioa.',
            es: 'Mueve la recta vertical. Cuando corta más de un punto, una misma x tiene dos salidas: no es función.',
            ar: 'حرّك الخط الرأسي. عندما يقطع أكثر من نقطة فلـ x نفسها مخرجان: ليست دالة.'
        }
    },
    {
        id: 'table',
        stage: 'representations',
        lessonTopic: 'tables',
        title: { eu: 'Taula, formula eta puntuak', es: 'Tabla, fórmula y puntos', ar: 'الجدول والصيغة والنقاط' },
        observe: {
            eu: 'Probatu x-ren balioak: bakoitzak taulan zutabe bat eta planoan puntu bat sortzen du. Ikusi nola ordezkatzen den formulan.',
            es: 'Prueba valores de x: cada uno crea una columna de la tabla y un punto del plano. Mira cómo se sustituye en la fórmula.',
            ar: 'جرّب قيم x: كل قيمة تنتج عمودًا في الجدول ونقطة في المستوى. لاحظ كيف يتم التعويض في الصيغة.'
        }
    },
    {
        id: 'reading',
        stage: 'reading',
        lessonTopic: 'graph-reading',
        title: { eu: 'Grafikoa irakurri', es: 'Leer una gráfica', ar: 'قراءة رسم بياني' },
        observe: {
            eu: 'Mugitu kurtsorea ezkerretik eskuinera: y-ren balioa, norabidea (gora, behera, berdin) eta maximoak eta minimoak ikusiko dituzu.',
            es: 'Mueve el cursor de izquierda a derecha: verás el valor de y, la tendencia (sube, baja, igual) y los máximos y mínimos.',
            ar: 'حرّك المؤشر من اليسار إلى اليمين: سترى قيمة y والاتجاه (يصعد أو يهبط أو ثابت) والقيم العظمى والصغرى.'
        }
    },
    {
        id: 'slope',
        stage: 'proportional',
        lessonTopic: 'slope',
        title: { eu: 'Maldaren neurgailua', es: 'El medidor de la pendiente', ar: 'مقياس الميل' },
        observe: {
            eu: 'Mugitu A eta B: Δy zati Δx da malda. Zeinuak norabidea esaten du; Δx = 0 denean zuzena bertikala da.',
            es: 'Mueve A y B: la pendiente es Δy entre Δx. El signo dice la dirección; si Δx = 0 la recta es vertical.',
            ar: 'حرّك A وB: الميل هو Δy ÷ Δx. تدل الإشارة على الاتجاه؛ وعندما Δx = 0 يكون الخط رأسيًا.'
        }
    },
    {
        id: 'line',
        stage: 'lines',
        lessonTopic: 'affine',
        title: { eu: 'Zuzenaren laborategia', es: 'El laboratorio de la recta', ar: 'مختبر الخط المستقيم' },
        observe: {
            eu: 'n aldatzean zuzena gora edo behera mugitzen da; m aldatzean, aldapa aldatzen da. m=0 denean zuzena horizontala da.',
            es: 'Al cambiar n la recta sube o baja; al cambiar m cambia la inclinación. Si m=0 la recta es horizontal.',
            ar: 'عند تغيير n يصعد الخط أو يهبط؛ وعند تغيير m يتغير الانحدار. وعندما m=0 يكون الخط أفقيًا.'
        }
    }
]

export const functionsLabToolForTopic: Record<string, FunctionsLabToolId | undefined> = {
    coordinates: 'plane',
    function: 'relation',
    variables: 'table',
    tables: 'table',
    formula: 'table',
    plot: 'table',
    continuity: 'table',
    'graph-reading': 'reading',
    intercepts: 'reading',
    variation: 'reading',
    extremes: 'reading',
    'direct-proportion': 'slope',
    slope: 'slope',
    'slope-sign': 'slope',
    affine: 'line',
    constant: 'line',
    'line-equation': 'line'
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const say = (eu: string, es: string, ar: string) => ({ eu, es, ar })

/* ---------- The plane and its quadrants ---------- */

export const PLANE_LIMIT = 6

export interface PlaneState {
    x: number
    y: number
}

export const initialPlaneState: PlaneState = { x: 2, y: 3 }

export const setPlanePoint = (state: PlaneState, patch: Partial<PlaneState>): PlaneState => ({
    x: clamp(patch.x ?? state.x, -PLANE_LIMIT, PLANE_LIMIT),
    y: clamp(patch.y ?? state.y, -PLANE_LIMIT, PLANE_LIMIT)
})

export const planeQuadrant = (state: PlaneState) => quadrantOf([state.x, state.y])

export const planeChallenges: LabChallenge<PlaneState>[] = [
    { id: 30101, prompt: say('Kokatu $A(-3,\\,2)$ puntua.', 'Sitúa el punto $A(-3,\\,2)$.', 'ضع النقطة $A(-3,\\,2)$.'), hint: say('Lehen koordenatua −3: ezkerrera. Bigarrena 2: gora.', 'Primera coordenada −3: a la izquierda. Segunda 2: arriba.', 'الإحداثي الأول −3: يسارًا. الثاني 2: إلى أعلى.'), isSolved: (state) => state.x === -3 && state.y === 2 },
    { id: 30102, prompt: say('Jarri puntua III. koadrantean.', 'Pon el punto en el III cuadrante.', 'ضع النقطة في الربع III.'), hint: say('Bi koordenatuak negatiboak izan behar dute.', 'Las dos coordenadas deben ser negativas.', 'يجب أن يكون الإحداثيان سالبين.'), isSolved: (state) => planeQuadrant(state) === 3 },
    { id: 30103, prompt: say('Jarri puntua Y ardatzean, jatorritik 4 unitatera behera: $(0,\\,-4)$.', 'Pon el punto en el eje Y, 4 unidades por debajo del origen: $(0,\\,-4)$.', 'ضع النقطة على محور Y أسفل نقطة الأصل بـ 4 وحدات: $(0,\\,-4)$.'), hint: say('Y ardatzean $x=0$ da.', 'En el eje Y, $x=0$.', 'على محور Y تكون $x=0$.'), isSolved: (state) => state.x === 0 && state.y === -4 },
    { id: 30104, prompt: say('Jarri puntu bat IV. koadrantean, bi koordenatuen balio absolutua berdina izanik.', 'Pon un punto del IV cuadrante cuyas dos coordenadas tengan el mismo valor absoluto.', 'ضع نقطة في الربع IV يكون للإحداثيين فيها القيمة المطلقة نفسها.'), hint: say('Adibidez $(3,\\,-3)$.', 'Por ejemplo $(3,\\,-3)$.', 'مثلًا $(3,\\,-3)$.'), isSolved: (state) => state.x > 0 && state.y < 0 && state.x === -state.y },
    { id: 30105, prompt: say('Jarri puntua X ardatzean, jatorritik 5 unitatera ezkerrera: $(-5,\\,0)$.', 'Pon el punto en el eje X, 5 unidades a la izquierda del origen: $(-5,\\,0)$.', 'ضع النقطة على محور X يسار نقطة الأصل بـ 5 وحدات: $(-5,\\,0)$.'), hint: say('X ardatzean $y=0$ da.', 'En el eje X, $y=0$.', 'على محور X تكون $y=0$.'), isSolved: (state) => state.x === -5 && state.y === 0 }
]

/* ---------- Function or not: the vertical line ---------- */

export interface Relation {
    points: Point[]
    isFunction: boolean
}

const relation = (points: Point[]): Relation => ({ points, isFunction: isFunctionRelation(points) })

export const relations: Relation[] = [
    relation([[-3, -1], [-1, 2], [1, 2], [3, 4]]),
    relation([[2, -2], [2, 1], [2, 3], [-2, 0]]),
    relation([[-4, -2], [-2, 0], [0, 2], [2, 4], [4, 5]]),
    relation([[-3, 4], [-2, 1], [0, 0], [2, 1], [3, 4]]),
    relation([[-3, 0], [0, 3], [0, -3], [3, 0], [-2, 2]]),
    relation([[-4, 1], [-2, 1], [0, 1], [2, 1], [4, 1]])
]

export const RELATION_LIMIT = 5

export type Verdict = 'yes' | 'no'

export interface RelationState {
    relation: number
    /** Abscissa of the vertical line */
    k: number
    /** Relations where the line has met two different points over the same x */
    found: number[]
    verdicts: Record<number, Verdict>
}

export const initialRelationState: RelationState = { relation: 0, k: -4, found: [], verdicts: {} }

/** Points of the relation on the vertical line x = k */
export const lineHits = (state: Pick<RelationState, 'relation' | 'k'>): Point[] => pointsAtX(relations[state.relation].points, state.k)

export const hitsTwice = (state: Pick<RelationState, 'relation' | 'k'>) => new Set(lineHits(state).map((point) => point[1])).size > 1

function withFound(state: RelationState): RelationState {
    return hitsTwice(state) && !state.found.includes(state.relation) ? { ...state, found: [...state.found, state.relation] } : state
}

export const setRelation = (state: RelationState, index: number): RelationState => withFound({ ...state, relation: clamp(index, 0, relations.length - 1) })
export const setLine = (state: RelationState, k: number): RelationState => withFound({ ...state, k: clamp(k, -RELATION_LIMIT, RELATION_LIMIT) })
export const setVerdict = (state: RelationState, verdict: Verdict | null): RelationState => {
    const verdicts = { ...state.verdicts }
    if (verdict === null) delete verdicts[state.relation]
    else verdicts[state.relation] = verdict
    return { ...state, verdicts }
}

const verdictsRight = (state: RelationState, indexes: number[]) => indexes.every((index) => state.verdicts[index] === (relations[index].isFunction ? 'yes' : 'no'))

export const relationChallenges: LabChallenge<RelationState>[] = [
    { id: 30201, prompt: say('Aurkitu zuzen bertikalak bi puntu ezberdin ebakitzen dituen erlazio bat.', 'Encuentra una relación en la que la recta vertical corte dos puntos distintos.', 'جد علاقة يقطع فيها الخط الرأسي نقطتين مختلفتين.'), hint: say('Mugitu zuzena erlazio ezberdinetan zehar.', 'Mueve la recta por distintas relaciones.', 'حرّك الخط في علاقات مختلفة.'), isSolved: (state) => state.found.length >= 1 },
    { id: 30202, prompt: say('Sailkatu lehen hiru erlazioak (1, 2 eta 3): funtzioa ala ez.', 'Clasifica las tres primeras relaciones (1, 2 y 3): función o no.', 'صنّف العلاقات الثلاث الأولى (1 و2 و3): دالة أم لا.'), hint: say('Zuzen bertikalak puntu bat baino gehiago ebakitzen badu, ez da funtzioa.', 'Si la recta vertical corta más de un punto, no es función.', 'إذا قطع الخط الرأسي أكثر من نقطة فليست دالة.'), isSolved: (state) => verdictsRight(state, [0, 1, 2]) },
    { id: 30203, prompt: say('Sailkatu sei erlazioak ondo.', 'Clasifica bien las seis relaciones.', 'صنّف العلاقات الست بشكل صحيح.'), hint: say('Kontuz: $x$ batek $y$ bera errepikatzea onartzen da.', 'Ojo: que una $y$ se repita en distintas $x$ está permitido.', 'انتبه: يجوز أن تتكرر $y$ لقيم مختلفة من $x$.'), isSolved: (state) => verdictsRight(state, [0, 1, 2, 3, 4, 5]) }
]

/* ---------- Table, formula and points ---------- */

export interface TableFormula {
    latex: string
    /** Plain text of the rule, for the step shown for each x */
    apply: (x: number) => number
    /** How the substitution is written: 2·(−2)+1 */
    steps: (x: number) => string
}

const bracket = (x: number) => (x < 0 ? `(${x})` : String(x))

export const tableFormulas: TableFormula[] = [
    { latex: 'y=2x+1', apply: (x) => 2 * x + 1, steps: (x) => `2\\cdot ${bracket(x)}+1` },
    { latex: 'y=-x+3', apply: (x) => -x + 3, steps: (x) => `-${bracket(x)}+3` },
    { latex: 'y=x^{2}-2', apply: (x) => x * x - 2, steps: (x) => `${bracket(x)}^{2}-2` },
    { latex: 'y=-2x', apply: (x) => -2 * x, steps: (x) => `-2\\cdot ${bracket(x)}` },
    { latex: 'y=4', apply: () => 4, steps: () => '4' }
]

export const TABLE_LIMIT = 3

export interface TableState {
    formula: number
    x: number
    /** Values of x tried for each formula, in the order tried */
    tried: Record<number, number[]>
}

export const initialTableState: TableState = { formula: 0, x: 0, tried: { 0: [0] } }

export const tableValue = (state: Pick<TableState, 'formula' | 'x'>) => tableFormulas[state.formula].apply(state.x)

export function tryX(state: TableState, x: number): TableState {
    const next = clamp(x, -TABLE_LIMIT, TABLE_LIMIT)
    const tried = state.tried[state.formula] ?? []
    return { ...state, x: next, tried: { ...state.tried, [state.formula]: tried.includes(next) ? tried : [...tried, next] } }
}

export function setFormula(state: TableState, formula: number): TableState {
    const next = clamp(formula, 0, tableFormulas.length - 1)
    return tryX({ ...state, formula: next }, state.x)
}

export const triedValues = (state: TableState, formula = state.formula): number[] => [...(state.tried[formula] ?? [])].sort((a, b) => a - b)

export const tableChallenges: LabChallenge<TableState>[] = [
    { id: 30301, prompt: say('$y=2x+1$ funtzioan, probatu gutxienez bost $x$ balio ezberdin.', 'En $y=2x+1$, prueba al menos cinco valores distintos de $x$.', 'في $y=2x+1$ جرّب خمس قيم مختلفة على الأقل لـ $x$.'), hint: say('Erabili + eta − botoiak.', 'Usa los botones + y −.', 'استعمل الزرين + و−.'), isSolved: (state) => (state.tried[0] ?? []).length >= 5 },
    { id: 30302, prompt: say('$y=2x+1$ funtzioan, aurkitu zein $x$-rentzat den $y=7$.', 'En $y=2x+1$, encuentra la $x$ para la que $y=7$.', 'في $y=2x+1$ جد قيمة $x$ التي تعطي $y=7$.'), hint: say('$2x+1=7$.', '$2x+1=7$.', '$2x+1=7$.'), isSolved: (state) => state.formula === 0 && state.x === 3 },
    { id: 30303, prompt: say('$y=x^{2}-2$ funtzioan, aurkitu bi $x$ ezberdin $y=2$ ematen dutenak.', 'En $y=x^{2}-2$, encuentra dos valores distintos de $x$ con $y=2$.', 'في $y=x^{2}-2$ جد قيمتين مختلفتين لـ $x$ تعطيان $y=2$.'), hint: say('$x$ eta $-x$ probatu.', 'Prueba $x$ y $-x$.', 'جرّب $x$ و$-x$.'), isSolved: (state) => (state.tried[2] ?? []).includes(2) && (state.tried[2] ?? []).includes(-2) },
    { id: 30304, prompt: say('$y=-x+3$ funtzioan, aurkitu zein $x$-rentzat den $y=0$ (X ardatzeko ebakidura).', 'En $y=-x+3$, encuentra la $x$ para la que $y=0$ (corte con el eje X).', 'في $y=-x+3$ جد قيمة $x$ التي تعطي $y=0$ (تقاطع محور X).'), hint: say('$-x+3=0$.', '$-x+3=0$.', '$-x+3=0$.'), isSolved: (state) => state.formula === 1 && state.x === 3 },
    { id: 30305, prompt: say('$y=4$ funtzioan, probatu hiru $x$ ezberdin: zer gertatzen da $y$-rekin?', 'En $y=4$, prueba tres valores distintos de $x$: ¿qué pasa con $y$?', 'في $y=4$ جرّب ثلاث قيم مختلفة لـ $x$: ماذا يحدث لـ $y$؟'), hint: say('Emaitza beti berdina da.', 'El resultado es siempre el mismo.', 'النتيجة دائمًا نفسها.'), isSolved: (state) => (state.tried[4] ?? []).length >= 3 }
]

/* ---------- Reading a graph ---------- */

export interface ReadingState {
    graph: number
    x: number
}

export const initialReadingState: ReadingState = { graph: 0, x: 0 }

export function setReadingGraph(graph: number): ReadingState {
    const next = clamp(graph, 0, storyGraphs.length - 1)
    const [from] = graphXRange(storyGraphs[next])
    return { graph: next, x: from }
}

export function setReadingX(state: ReadingState, x: number): ReadingState {
    const [from, to] = graphXRange(storyGraphs[state.graph])
    return { ...state, x: clamp(x, from, to) }
}

export interface ReadingInfo {
    y: number
    /** Tendency of the graph just after x (or just before, at the end) */
    trend: 'up' | 'down' | 'flat'
    isMax: boolean
    isMin: boolean
    isZero: boolean
}

export function readingInfo(state: ReadingState): ReadingInfo {
    const { points } = storyGraphs[state.graph]
    const y = graphValue(storyGraphs[state.graph], state.x)!
    const index = points.findIndex((point) => point[0] === state.x)
    const around = index < points.length - 1 ? [points[index], points[index + 1]] : [points[index - 1], points[index]]
    const trend = around[1][1] > around[0][1] ? 'up' : around[1][1] < around[0][1] ? 'down' : 'flat'
    const before = points[index - 1]?.[1]
    const after = points[index + 1]?.[1]
    return {
        y,
        trend,
        isMax: before !== undefined && after !== undefined && y > before && y > after,
        isMin: before !== undefined && after !== undefined && y < before && y < after,
        isZero: y === 0
    }
}

/** The stretch (x range) of the graph where it is flat around the cursor, when it is */
export const flatStretch = (state: ReadingState) => trendIntervals(storyGraphs[state.graph].points).find((interval) => interval.trend === 'flat' && state.x >= interval.from && state.x <= interval.to) ?? null

export const readingChallenges: LabChallenge<ReadingState>[] = [
    { id: 30401, prompt: say('Tenperatura-grafikoan, aurkitu zein ordutan den tenperatura 11 °C.', 'En la gráfica de la temperatura, encuentra a qué hora hay 11 °C.', 'في رسم الحرارة جد في أي ساعة تكون الحرارة 11 °م.'), hint: say('Begiratu $y=11$ duen puntua.', 'Busca el punto con $y=11$.', 'ابحث عن النقطة ذات $y=11$.'), isSolved: (state) => state.graph === 0 && state.x === 5 },
    { id: 30402, prompt: say('Hegazkinaren grafikoan, jarri kurtsorea maximo absolutuan.', 'En la gráfica de la avioneta, pon el cursor en el máximo absoluto.', 'في رسم الطائرة ضع المؤشر عند القيمة العظمى المطلقة.'), hint: say('Punturik altuena.', 'El punto más alto.', 'أعلى نقطة.'), isSolved: (state) => state.graph === 1 && state.x === globalExtremes(storyGraphs[1].points).max[0] },
    { id: 30403, prompt: say('Hegazkinaren grafikoan, jarri kurtsorea tarte konstantearen erdian.', 'En la gráfica de la avioneta, pon el cursor en medio del tramo constante.', 'في رسم الطائرة ضع المؤشر في منتصف الفترة الثابتة.'), hint: say('Altuera berean dagoen tartea 2 eta 4 artean dago.', 'El tramo a altura constante va de 2 a 4.', 'الفترة ذات الارتفاع الثابت من 2 إلى 4.'), isSolved: (state) => state.graph === 1 && state.x === 3 },
    { id: 30404, prompt: say('Abiaduraren grafikoan, jarri kurtsorea minimoan.', 'En la gráfica de la velocidad, pon el cursor en el mínimo.', 'في رسم السرعة ضع المؤشر عند القيمة الصغرى.'), hint: say('Beherakorra gorakor bihurtzen den lekua.', 'Donde pasa de decreciente a creciente.', 'حيث ينتقل من التناقص إلى التزايد.'), isSolved: (state) => state.graph === 2 && readingInfo(state).isMin },
    { id: 30405, prompt: say('Depositua hustutzen: aurkitu zein minututan dago hutsik ($y=0$).', 'Depósito que se vacía: encuentra en qué minuto está vacío ($y=0$).', 'خزان يفرغ: جد في أي دقيقة يصبح فارغًا ($y=0$).'), hint: say('Kurba X ardatzera iristen den lekua.', 'Donde la curva llega al eje X.', 'حيث يصل المنحنى إلى محور X.'), isSolved: (state) => state.graph === 3 && state.x === 5 },
    { id: 30406, prompt: say('Azken funtzioan, aurkitu X ardatzeko ebakidura ezkerreneko ($y=0$).', 'En la última función, encuentra el corte con el eje X situado más a la izquierda ($y=0$).', 'في الدالة الأخيرة جد نقطة التقاطع مع محور X الأبعد يسارًا ($y=0$).'), hint: say('Hasi ezkerretik eta bilatu $y=0$.', 'Empieza por la izquierda y busca $y=0$.', 'ابدأ من اليسار وابحث عن $y=0$.'), isSolved: (state) => state.graph === 4 && state.x === -3 }
]

/* ---------- Slope between two points ---------- */

export const SLOPE_LIMIT = 5

export interface SlopeState {
    a: Point
    b: Point
}

export const initialSlopeState: SlopeState = { a: [-2, -1], b: [1, 3] }

export function setSlopePoint(state: SlopeState, which: 'a' | 'b', axis: 0 | 1, value: number): SlopeState {
    const point: [number, number] = [state[which][0], state[which][1]]
    point[axis] = clamp(value, -SLOPE_LIMIT, SLOPE_LIMIT)
    return { ...state, [which]: point }
}

export const slopeOf = (state: SlopeState) => slopeBetween(state.a, state.b)
export const isSamePoint = (state: SlopeState) => state.a[0] === state.b[0] && state.a[1] === state.b[1]

const slopeIs = (state: SlopeState, numerator: number, denominator = 1) => {
    const slope = slopeOf(state)
    return slope !== null && !isSamePoint(state) && equals(slope, fraction(numerator, denominator))
}

export const slopeChallenges: LabChallenge<SlopeState>[] = [
    { id: 30501, prompt: say('Lortu malda $m=2$ duen zuzena.', 'Consigue una recta de pendiente $m=2$.', 'اصنع خطًا ميله $m=2$.'), hint: say('$\\Delta y$ bi aldiz $\\Delta x$ izan behar da.', '$\\Delta y$ debe ser el doble de $\\Delta x$.', 'يجب أن يكون $\\Delta y$ ضعف $\\Delta x$.'), isSolved: (state) => slopeIs(state, 2) },
    { id: 30502, prompt: say('Lortu malda negatiboa duen zuzena.', 'Consigue una recta de pendiente negativa.', 'اصنع خطًا ميله سالب.'), hint: say('Eskuinera joanda, zuzenak behera egin behar du.', 'Al ir a la derecha, la recta debe bajar.', 'عند الذهاب يمينًا يجب أن يهبط الخط.'), isSolved: (state) => { const slope = slopeOf(state); return slope !== null && toNumber(slope) < 0 } },
    { id: 30503, prompt: say('Lortu zuzen horizontala ($m=0$) bi puntu ezberdinekin.', 'Consigue una recta horizontal ($m=0$) con dos puntos distintos.', 'اصنع خطًا أفقيًا ($m=0$) بنقطتين مختلفتين.'), hint: say('Bi puntuek $y$ bera izan behar dute.', 'Los dos puntos deben tener la misma $y$.', 'يجب أن يكون للنقطتين $y$ نفسها.'), isSolved: (state) => state.a[1] === state.b[1] && state.a[0] !== state.b[0] },
    { id: 30504, prompt: say('Lortu malda $m=\\frac{1}{2}$ duen zuzena.', 'Consigue una recta de pendiente $m=\\frac{1}{2}$.', 'اصنع خطًا ميله $m=\\frac{1}{2}$.'), hint: say('$\\Delta x=2$ eta $\\Delta y=1$.', '$\\Delta x=2$ y $\\Delta y=1$.', '$\\Delta x=2$ و$\\Delta y=1$.'), isSolved: (state) => slopeIs(state, 1, 2) },
    { id: 30505, prompt: say('Lortu zuzen bertikala: ez du maldarik eta ez da funtzioa.', 'Consigue una recta vertical: no tiene pendiente y no es función.', 'اصنع خطًا رأسيًا: لا ميل له وليس دالة.'), hint: say('Bi puntuek $x$ bera izan behar dute.', 'Los dos puntos deben tener la misma $x$.', 'يجب أن يكون للنقطتين $x$ نفسها.'), isSolved: (state) => state.a[0] === state.b[0] && state.a[1] !== state.b[1] },
    { id: 30506, prompt: say('Lortu jatorritik pasatzen den zuzena, $m=-1$ maldarekin.', 'Consigue una recta que pase por el origen con pendiente $m=-1$.', 'اصنع خطًا يمر بنقطة الأصل وميله $m=-1$.'), hint: say('Adibidez $(0,\\,0)$ eta $(2,\\,-2)$.', 'Por ejemplo $(0,\\,0)$ y $(2,\\,-2)$.', 'مثلًا $(0,\\,0)$ و$(2,\\,-2)$.'), isSolved: (state) => slopeIs(state, -1) && state.a[1] === -state.a[0] }
]

/* ---------- The line y = mx + n ---------- */

export const LINE_LIMITS = { m: { min: -5, max: 5 }, n: { min: -6, max: 6 } } as const

export interface LineState {
    m: number
    n: number
}

export const initialLineState: LineState = { m: 1, n: 0 }

export const setLineParams = (state: LineState, patch: Partial<LineState>): LineState => ({
    m: Math.min(LINE_LIMITS.m.max, Math.max(LINE_LIMITS.m.min, Math.round((patch.m ?? state.m) * 2) / 2)),
    n: clamp(patch.n ?? state.n, LINE_LIMITS.n.min, LINE_LIMITS.n.max)
})

export const lineChallenges: LabChallenge<LineState>[] = [
    { id: 30601, prompt: say('Lortu $y=2x-1$ zuzena.', 'Consigue la recta $y=2x-1$.', 'اصنع الخط $y=2x-1$.'), hint: say('$m=2$ eta $n=-1$.', '$m=2$ y $n=-1$.', '$m=2$ و$n=-1$.'), isSolved: (state) => state.m === 2 && state.n === -1 },
    { id: 30602, prompt: say('Lortu $(0,\\,4)$ eta $(2,\\,0)$ puntuetatik pasatzen den zuzena.', 'Consigue la recta que pasa por $(0,\\,4)$ y $(2,\\,0)$.', 'اصنع الخط المار بالنقطتين $(0,\\,4)$ و$(2,\\,0)$.'), hint: say('$n=4$ da; malda: $\\frac{0-4}{2-0}$.', '$n=4$; la pendiente: $\\frac{0-4}{2-0}$.', '$n=4$؛ والميل: $\\frac{0-4}{2-0}$.'), isSolved: (state) => state.m === -2 && state.n === 4 },
    { id: 30603, prompt: say('Lortu funtzio konstantea $y=3$.', 'Consigue la función constante $y=3$.', 'اصنع الدالة الثابتة $y=3$.'), hint: say('Malda 0 izan behar da.', 'La pendiente debe ser 0.', 'يجب أن يكون الميل 0.'), isSolved: (state) => state.m === 0 && state.n === 3 },
    { id: 30604, prompt: say('Lortu proportzionaltasun zuzeneko funtzio beherakorra.', 'Consigue una función de proporcionalidad directa decreciente.', 'اصنع دالة تناسب طردي متناقصة.'), hint: say('$n=0$ eta $m<0$.', '$n=0$ y $m<0$.', '$n=0$ و$m<0$.'), isSolved: (state) => state.n === 0 && state.m < 0 },
    { id: 30605, prompt: say('Lortu $y=\\frac{1}{2}x+1$ zuzena.', 'Consigue la recta $y=\\frac{1}{2}x+1$.', 'اصنع الخط $y=\\frac{1}{2}x+1$.'), hint: say('$m=0{,}5$ eta $n=1$.', '$m=0{,}5$ y $n=1$.', '$m=0.5$ و$n=1$.'), isSolved: (state) => state.m === 0.5 && state.n === 1 },
    { id: 30606, prompt: say('Lortu X ardatza $x=3$ puntuan ebakitzen duen zuzen bat.', 'Consigue una recta que corte al eje X en $x=3$.', 'اصنع خطًا يقطع محور X عند $x=3$.'), hint: say('Ordeztu $y=0$ eta $x=3$: $0=3m+n$.', 'Sustituye $y=0$ y $x=3$: $0=3m+n$.', 'عوّض $y=0$ و$x=3$: $0=3m+n$.'), isSolved: (state) => state.m !== 0 && state.n === -3 * state.m }
]

export const functionsLabChallengeIds: number[] = [planeChallenges, relationChallenges, tableChallenges, readingChallenges, slopeChallenges, lineChallenges].flatMap((list) => list.map((challenge) => challenge.id))
