import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { equals, fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { relationChallenges, tableChallenges } from '../../dbh2-funtzioak-v2/lab/labTools.ts'
import { averageRate, reduceToPeriod, smoothThrough, studyKnots, type Point } from '../functions.ts'
import type { FunctionsStageId } from '../lessons.tsx'

/* ==========================================================================
   Funtzioak (4. DBH aplikatuak) laboratory. "Function or not" and "table
   and formula" come from 2. DBH with their own challenges. The new tools:
   the domain and range of a graph set with two pairs of bounds; a parabola
   y = x² + bx + c and its intercepts; a cursor that walks along a graph
   and says where it rises, falls, peaks or dips; the average rate of
   change as a chord; a periodic function read far away; and the box made
   from a 40 × 30 card. Pure state logic; the components live next to this
   file. Tests in tests/funtzioak-dbh4ap-lab.test.ts.
   ========================================================================== */

export type FunctionsLabToolId = 'relation' | 'table' | 'domain' | 'intercepts' | 'explorer' | 'rate' | 'periodic' | 'box'

export interface FunctionsLabTool extends LabToolInfo {
    id: FunctionsLabToolId
    stage: FunctionsStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const clampHalf = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value * 2) / 2))

export const functionsLabTools: FunctionsLabTool[] = [
    { id: 'relation', stage: 'concept', lessonTopic: 'what-is', title: say('Funtzioa ala ez?', '¿Función o no?', 'دالة أم لا؟'), observe: say('Mugitu zuzen bertikala. Puntu bat baino gehiago ebakitzen dituenean x berak bi irteera ditu: ez da funtzioa.', 'Mueve la recta vertical. Cuando corta más de un punto, una misma x tiene dos salidas: no es función.', 'حرّك الخط الرأسي. عندما يقطع أكثر من نقطة فلـ x نفسها مخرجان: ليست دالة.') },
    { id: 'table', stage: 'concept', lessonTopic: 'expressions', title: say('Taula eta formula', 'Tabla y fórmula', 'الجدول والصيغة'), observe: say('Formulak x bakoitzaren irudia ematen du; taulak probatutako bikoteak gordetzen ditu, eta grafikoak puntu gisa erakusten ditu.', 'La fórmula da la imagen de cada x; la tabla guarda las parejas probadas y la gráfica las enseña como puntos.', 'تعطي الصيغة صورة كل x، ويحفظ الجدول الأزواج المجرّبة، ويعرضها الرسم نقاطًا.') },
    { id: 'domain', stage: 'domain', lessonTopic: 'domain-graph', title: say('Izate-eremua eta ibiltartea', 'Dominio y recorrido', 'المجال والمدى'), observe: say('Izate-eremua kurbaren itzala da X ardatzean, eta ibiltartea Y ardatzean. Muturrak kurbaren hasiera eta amaiera eta punturik altuena eta baxuena dira.', 'El dominio es la sombra de la curva sobre el eje X, y el recorrido sobre el eje Y. Los extremos son el principio y el final de la curva y sus puntos más alto y más bajo.', 'المجال ظل المنحنى على محور X، والمدى ظله على محور Y. الأطراف بداية المنحنى ونهايته وأعلى نقطة وأدناها.') },
    { id: 'intercepts', stage: 'domain', lessonTopic: 'intercepts', title: say('Parabola baten ebakidurak', 'Cortes de una parábola', 'تقاطعات قطع مكافئ'), observe: say('c-k Y ardatzeko ebakidura mugitzen du. X ardatza 0, 1 edo 2 aldiz ebaki daiteke: b² − 4c zeinuaren araberakoa da.', 'c mueve el corte con el eje Y. El eje X se puede cortar 0, 1 o 2 veces: depende del signo de b² − 4c.', 'يحرّك c التقاطع مع محور Y. ويمكن قطع محور X مرة أو مرتين أو عدم قطعه: يتوقف ذلك على إشارة ⁦b² − 4c⁩.') },
    { id: 'explorer', stage: 'change', lessonTopic: 'monotony', title: say('Grafiko baten bidaia', 'Recorre una gráfica', 'تجوّل في رسم'), observe: say('Kurtsorea ezkerretik eskuinera mugitzean, joera aldatzen den puntuak maximoak eta minimoak dira. Absolutuak muturretan ere egon daitezke.', 'Al mover el cursor de izquierda a derecha, los puntos donde cambia la tendencia son máximos y mínimos. Los absolutos también pueden estar en los extremos.', 'عند تحريك المؤشر من اليسار إلى اليمين تكون النقاط التي يتغير فيها الاتجاه قيمًا عظمى وصغرى. ويمكن أن تقع المطلقة عند الأطراف أيضًا.') },
    { id: 'rate', stage: 'change', lessonTopic: 'rate', title: say('Batez besteko aldakuntza-tasa', 'Tasa de variación media', 'معدل التغير المتوسط'), observe: say('BAT bi puntuak lotzen dituen zuzenkiaren malda da: igotzen bada positiboa, jaisten bada negatiboa, eta horizontala bada 0.', 'La T.V.M. es la pendiente del segmento que une los dos puntos: positiva si sube, negativa si baja y 0 si es horizontal.', 'المعدل ميل القطعة الواصلة بين النقطتين: موجب إذا صعدت، وسالب إذا نزلت، و0 إذا كانت أفقية.') },
    { id: 'periodic', stage: 'properties', lessonTopic: 'periodicity', title: say('Funtzio periodikoak', 'Funciones periódicas', 'الدوال الدورية'), observe: say('Urruneko balio bat jakiteko, zatitu x periodoaz: hondarrak esaten du lehen periodoko zein puntutan zauden.', 'Para saber un valor lejano, divide x entre el periodo: el resto dice en qué punto del primer periodo estás.', 'لمعرفة قيمة بعيدة اقسم x على الدور: يدلك الباقي على موضعك في الدور الأول.') },
    { id: 'box', stage: 'study', lessonTopic: 'modelling', title: say('Kartulinazko kutxa', 'La caja de cartulina', 'علبة الورق المقوى'), observe: say('x handitzean kutxa altuagoa baina estuagoa da: bolumena hazi egiten da lehenik eta gero txikitu. Funtzioak maximo bat du.', 'Al aumentar x la caja es más alta pero más estrecha: el volumen primero crece y después decrece. La función tiene un máximo.', 'كلما زادت x صارت العلبة أعلى لكن أضيق: يزيد الحجم أولًا ثم ينقص. للدالة قيمة عظمى.') }
]

export const functionsLabToolForTopic: Record<string, FunctionsLabToolId | undefined> = {
    'what-is': 'relation',
    expressions: 'table',
    evaluate: 'table',
    'domain-graph': 'domain',
    'domain-formula': 'domain',
    intercepts: 'intercepts',
    monotony: 'explorer',
    extrema: 'explorer',
    rate: 'rate',
    continuity: 'periodic',
    periodicity: 'periodic',
    tendency: 'explorer',
    reading: 'explorer',
    study: 'explorer',
    modelling: 'box'
}

/* ---------- 1. Domain and range of a graph ---------- */

export interface LabGraph {
    short: LocalizedText
    knots: Point[]
}

export const domainGraphs: LabGraph[] = [
    { short: say('A', 'A', 'A'), knots: [[-3, 1], [-1, 4], [2, -2], [4, 2]] },
    { short: say('B', 'B', 'B'), knots: [[-4, -1], [-2, 2], [1, 0], [3, 3], [5, 1]] },
    { short: say('C', 'C', 'C'), knots: [[0, 3], [2, -1], [4, 1], [6, -3]] }
]

export const DOMAIN_LIMIT = 6

export interface DomainState {
    graph: number
    from: number
    to: number
    low: number
    high: number
}

export const initialDomainState: DomainState = { graph: 0, from: -1, to: 1, low: -1, high: 1 }

export function setDomain(state: DomainState, patch: Partial<DomainState>): DomainState {
    const next = { ...state, ...patch }
    const graph = clamp(next.graph, 0, domainGraphs.length - 1)
    let from = clamp(next.from, -DOMAIN_LIMIT, DOMAIN_LIMIT)
    let to = clamp(next.to, -DOMAIN_LIMIT, DOMAIN_LIMIT)
    let low = clamp(next.low, -DOMAIN_LIMIT, DOMAIN_LIMIT)
    let high = clamp(next.high, -DOMAIN_LIMIT, DOMAIN_LIMIT)
    // The left end never passes the right end: the one that moved pushes the other
    if (from > to) [from, to] = patch.from !== undefined ? [from, from] : [to, to]
    if (low > high) [low, high] = patch.low !== undefined ? [low, low] : [high, high]
    return { graph, from, to, low, high }
}

export const domainOf = (graph: LabGraph): [number, number] => [graph.knots[0][0], graph.knots[graph.knots.length - 1][0]]
export const rangeOf = (graph: LabGraph): [number, number] => [Math.min(...graph.knots.map((point) => point[1])), Math.max(...graph.knots.map((point) => point[1]))]
export const domainRight = (state: DomainState) => {
    const [from, to] = domainOf(domainGraphs[state.graph])
    return state.from === from && state.to === to
}
export const rangeRight = (state: DomainState) => {
    const [low, high] = rangeOf(domainGraphs[state.graph])
    return state.low === low && state.high === high
}

export const domainChallenges: LabChallenge<DomainState>[] = [
    { id: 53101, prompt: say('A grafikoan, jarri izate-eremua.', 'En la gráfica A, ajusta el dominio.', 'في الرسم A اضبط المجال.'), hint: say('Non hasten eta non amaitzen da kurba ezkerretik eskuinera?', '¿Dónde empieza y dónde acaba la curva de izquierda a derecha?', 'أين يبدأ المنحنى وأين ينتهي من اليسار إلى اليمين؟'), isSolved: (state) => state.graph === 0 && domainRight(state) },
    { id: 53102, prompt: say('A grafikoan, jarri ibiltartea.', 'En la gráfica A, ajusta el recorrido.', 'في الرسم A اضبط المدى.'), hint: say('Punturik baxuena eta altuena; kontuz, ez dira muturrak.', 'El punto más bajo y el más alto; ojo, no son los extremos.', 'أدنى نقطة وأعلاها؛ انتبه، ليستا الطرفين.'), isSolved: (state) => state.graph === 0 && rangeRight(state) },
    { id: 53103, prompt: say('B grafikoan, jarri izate-eremua eta ibiltartea.', 'En la gráfica B, ajusta el dominio y el recorrido.', 'في الرسم B اضبط المجال والمدى.'), hint: say('Lehenik X ardatza, gero Y ardatza.', 'Primero el eje X y después el eje Y.', 'أولًا محور X ثم محور Y.'), isSolved: (state) => state.graph === 1 && domainRight(state) && rangeRight(state) },
    { id: 53104, prompt: say('C grafikoan, jarri izate-eremua eta ibiltartea.', 'En la gráfica C, ajusta el dominio y el recorrido.', 'في الرسم C اضبط المجال والمدى.'), hint: say('Hemen punturik baxuena mutur batean dago.', 'Aquí el punto más bajo está en un extremo.', 'هنا أدنى نقطة عند أحد الطرفين.'), isSolved: (state) => state.graph === 2 && domainRight(state) && rangeRight(state) }
]

/* ---------- 2. Intercepts of y = x² + bx + c ---------- */

export const PARABOLA_LIMIT = 6

export interface InterceptsState {
    b: number
    c: number
}

export const initialInterceptsState: InterceptsState = { b: 0, c: 1 }

export const setIntercepts = (state: InterceptsState, patch: Partial<InterceptsState>): InterceptsState => ({
    b: clamp(patch.b ?? state.b, -PARABOLA_LIMIT, PARABOLA_LIMIT),
    c: clamp(patch.c ?? state.c, -PARABOLA_LIMIT, PARABOLA_LIMIT)
})

export const discriminant = ({ b, c }: InterceptsState) => b * b - 4 * c

/** Where the parabola meets the X axis, from left to right */
export function xIntercepts(state: InterceptsState): number[] {
    const delta = discriminant(state)
    if (delta < 0) return []
    if (delta === 0) return [-state.b / 2]
    const root = Math.sqrt(delta)
    return [(-state.b - root) / 2, (-state.b + root) / 2]
}

export const interceptsChallenges: LabChallenge<InterceptsState>[] = [
    { id: 53201, prompt: say('Egin parabolak Y ardatza $(0,\\,-3)$ puntuan ebaki dezan.', 'Haz que la parábola corte al eje Y en $(0,\\,-3)$.', 'اجعل القطع يقطع محور Y في $(0,\\,-3)$.'), hint: say('$x=0$ denean, $y=c$.', 'Cuando $x=0$, $y=c$.', 'عندما $x=0$ تكون $y=c$.'), isSolved: (state) => state.c === -3 },
    { id: 53202, prompt: say('Egin X ardatza $x=-1$ eta $x=3$ puntuetan ebaki dezan.', 'Haz que corte al eje X en $x=-1$ y en $x=3$.', 'اجعله يقطع محور X في $x=-1$ و$x=3$.'), hint: say('$(x+1)(x-3)=x^2-2x-3$.', '$(x+1)(x-3)=x^2-2x-3$.', '$(x+1)(x-3)=x^2-2x-3$.'), isSolved: (state) => state.b === -2 && state.c === -3 },
    { id: 53203, prompt: say('Egin X ardatza puntu bakar batean ukitu dezan, jatorritik kanpo.', 'Haz que toque al eje X en un solo punto, fuera del origen.', 'اجعله يمس محور X في نقطة واحدة خارج نقطة الأصل.'), hint: say('$b^2-4c=0$ izan behar da; adibidez, $(x-2)^2$.', 'Hace falta $b^2-4c=0$; por ejemplo, $(x-2)^2$.', 'يلزم $b^2-4c=0$؛ مثلًا $(x-2)^2$.'), isSolved: (state) => discriminant(state) === 0 && state.b !== 0 },
    { id: 53204, prompt: say('Egin X ardatza bi abzisa positibotan ebaki dezan.', 'Haz que corte al eje X en dos abscisas positivas.', 'اجعله يقطع محور X في فاصلتين موجبتين.'), hint: say('Erpina eskuinean ($b<0$) eta Y ardatzeko ebakidura gainean ($c>0$).', 'El vértice a la derecha ($b<0$) y el corte con el eje Y por encima ($c>0$).', 'الرأس إلى اليمين ($b<0$) والتقاطع مع محور Y في الأعلى ($c>0$).'), isSolved: (state) => { const xs = xIntercepts(state); return xs.length === 2 && xs[0] > 0 } }
]

/* ---------- 3. Walking along a graph ---------- */

export const explorerGraphs: Array<LabGraph & { title: LocalizedText }> = [
    { short: say('Azterketa', 'Estudio', 'الدراسة'), title: say('Lezioko grafikoa', 'La gráfica de la lección', 'رسم الدرس'), knots: studyKnots },
    { short: say('Tontorrak', 'Cimas', 'القمم'), title: say('Bi tontor eta haran bat', 'Dos cimas y un valle', 'قمتان وواد'), knots: [[0, 1], [2, 5], [4, 2], [6, 4], [8, 0]] },
    { short: say('Uhina', 'Onda', 'الموجة'), title: say('Gora, behera eta gora', 'Sube, baja y sube', 'تصعد وتنزل وتصعد'), knots: [[-4, -2], [-2, 2], [2, -2], [4, 2]] }
]

export interface ExplorerState {
    graph: number
    x: number
}

export const initialExplorerState: ExplorerState = { graph: 0, x: 0 }

export const explorerCurve = (graph: number) => smoothThrough(explorerGraphs[graph].knots)

export function setExplorer(state: ExplorerState, patch: Partial<ExplorerState>): ExplorerState {
    const graph = clamp(patch.graph ?? state.graph, 0, explorerGraphs.length - 1)
    const [from, to] = domainOf(explorerGraphs[graph])
    const x = patch.graph !== undefined && patch.graph !== state.graph ? from : clamp(patch.x ?? state.x, from, to)
    return { graph, x }
}

/** Value of the smooth curve at x (one of its sample points) */
export function explorerValue(graph: number, x: number): number {
    const curve = explorerCurve(graph)
    return curve.reduce((best, point) => (Math.abs(point[0] - x) < Math.abs(best[0] - x) ? point : best))[1]
}

export type ExplorerKind = 'max' | 'min' | null

export interface ExplorerInfo {
    y: number
    /** Tendency just after x (just before, at the right end) */
    trend: 'up' | 'down' | 'flat'
    relative: ExplorerKind
    absolute: ExplorerKind
}

export function explorerInfo(state: ExplorerState): ExplorerInfo {
    const { knots } = explorerGraphs[state.graph]
    const [, to] = domainOf(explorerGraphs[state.graph])
    const y = explorerValue(state.graph, state.x)
    const probe = state.x < to ? explorerValue(state.graph, state.x + 0.5) - y : y - explorerValue(state.graph, state.x - 0.5)
    const index = knots.findIndex((point) => point[0] === state.x)
    let relative: ExplorerKind = null
    if (index > 0 && index < knots.length - 1) {
        if (knots[index][1] > knots[index - 1][1] && knots[index][1] > knots[index + 1][1]) relative = 'max'
        if (knots[index][1] < knots[index - 1][1] && knots[index][1] < knots[index + 1][1]) relative = 'min'
    }
    const [low, high] = rangeOf(explorerGraphs[state.graph])
    const absolute: ExplorerKind = Math.abs(y - high) < 1e-9 ? 'max' : Math.abs(y - low) < 1e-9 ? 'min' : null
    return { y, trend: Math.abs(probe) < 1e-9 ? 'flat' : probe > 0 ? 'up' : 'down', relative, absolute }
}

export const explorerChallenges: LabChallenge<ExplorerState>[] = [
    { id: 53301, prompt: say('Lezioko grafikoan, jarri kurtsorea absolutua ez den maximo erlatibo batean.', 'En la gráfica de la lección, pon el cursor en un máximo relativo que no sea absoluto.', 'في رسم الدرس ضع المؤشر عند قيمة عظمى نسبية ليست مطلقة.'), hint: say('Hiru tontor daude; bat besteak baino baxuagoa da.', 'Hay tres cimas; una es más baja que las otras.', 'هناك ثلاث قمم؛ إحداها أخفض من الأخريين.'), isSolved: (state) => state.graph === 0 && explorerInfo(state).relative === 'max' && explorerInfo(state).absolute === null },
    { id: 53302, prompt: say('Tontorren grafikoan, jarri kurtsorea minimo absolutuan.', 'En la gráfica de las cimas, pon el cursor en el mínimo absoluto.', 'في رسم القمم ضع المؤشر عند القيمة الصغرى المطلقة.'), hint: say('Ez dago haranean: begiratu muturrak.', 'No está en el valle: mira los extremos.', 'ليست في الوادي: انظر إلى الطرفين.'), isSolved: (state) => state.graph === 1 && explorerInfo(state).absolute === 'min' },
    { id: 53303, prompt: say('Uhinean, jarri kurtsorea minimo erlatiboan.', 'En la onda, pon el cursor en el mínimo relativo.', 'في الموجة ضع المؤشر عند القيمة الصغرى النسبية.'), hint: say('Jaistetik igotzera pasatzen den lekua.', 'Donde pasa de bajar a subir.', 'حيث تنتقل من النزول إلى الصعود.'), isSolved: (state) => state.graph === 2 && explorerInfo(state).relative === 'min' },
    { id: 53304, prompt: say('Uhinean, aurkitu maximoaren eta minimoaren artean X ardatza ebakitzen duen puntua.', 'En la onda, encuentra el punto entre el máximo y el mínimo donde corta al eje X.', 'في الموجة جد النقطة بين العظمى والصغرى التي يقطع فيها محور X.'), hint: say('Bilatu $f(x)=0$.', 'Busca $f(x)=0$.', 'ابحث عن $f(x)=0$.'), isSolved: (state) => state.graph === 2 && state.x > -2 && state.x < 2 && Math.abs(explorerInfo(state).y) < 1e-9 }
]

/* ---------- 4. Average rate of change ---------- */

export interface RateFunction {
    latex: string
    label: string
    from: number
    to: number
    yUnit: number
    apply: (x: number) => number
}

export const rateFunctions: RateFunction[] = [
    { latex: 'f(x)=x^{2}-4x+5', label: 'x² − 4x + 5', from: 0, to: 5, yUnit: 1, apply: (x) => x * x - 4 * x + 5 },
    { latex: 'f(x)=x^{3}', label: 'x³', from: -2, to: 2, yUnit: 1, apply: (x) => x * x * x },
    { latex: 'h(t)=40t-5t^{2}', label: '40t − 5t²', from: 0, to: 8, yUnit: 10, apply: (x) => 40 * x - 5 * x * x }
]

export interface RateState {
    fn: number
    a: number
    b: number
}

export const initialRateState: RateState = { fn: 0, a: 0, b: 1 }

export function setRate(state: RateState, patch: Partial<RateState>): RateState {
    const fn = clamp(patch.fn ?? state.fn, 0, rateFunctions.length - 1)
    const { from, to } = rateFunctions[fn]
    const changed = fn !== state.fn
    return { fn, a: changed ? from : clamp(patch.a ?? state.a, from, to), b: changed ? from + 1 : clamp(patch.b ?? state.b, from, to) }
}

/** T.V.M. [a, b]; null when the two ends are the same */
export function rateOf(state: RateState): FractionValue | null {
    if (state.a === state.b) return null
    const { apply } = rateFunctions[state.fn]
    const [a, b] = state.a < state.b ? [state.a, state.b] : [state.b, state.a]
    return averageRate(a, apply(a), b, apply(b))
}

const rateIs = (state: RateState, value: number) => {
    const rate = rateOf(state)
    return rate !== null && equals(rate, fraction(value))
}

export const rateChallenges: LabChallenge<RateState>[] = [
    { id: 53401, prompt: say('$x^2-4x+5$ funtzioan, aurkitu BAT $=0$ duen tarte bat.', 'En $x^2-4x+5$, encuentra un intervalo con T.V.M. $=0$.', 'في $x^2-4x+5$ جد فترة معدلها $=0$.'), hint: say('Bi muturretan balio bera: zuzenkia horizontala.', 'El mismo valor en los dos extremos: segmento horizontal.', 'القيمة نفسها عند الطرفين: قطعة أفقية.'), isSolved: (state) => state.fn === 0 && rateIs(state, 0) },
    { id: 53402, prompt: say('$x^2-4x+5$ funtzioan, aurkitu BAT $=1$ duen tarte bat.', 'En $x^2-4x+5$, encuentra un intervalo con T.V.M. $=1$.', 'في $x^2-4x+5$ جد فترة معدلها $=1$.'), hint: say('Probatu $[1,\\,4]$ edo $[0,\\,5]$.', 'Prueba $[1,\\,4]$ o $[0,\\,5]$.', 'جرّب $[1,\\,4]$ أو $[0,\\,5]$.'), isSolved: (state) => state.fn === 0 && rateIs(state, 1) },
    { id: 53403, prompt: say('$x^3$ funtzioan, aurkitu BAT $=7$ duen tarte bat.', 'En $x^3$, encuentra un intervalo con T.V.M. $=7$.', 'في $x^3$ جد فترة معدلها $=7$.'), hint: say('$\\frac{8-1}{2-1}$', '$\\frac{8-1}{2-1}$', '$\\frac{8-1}{2-1}$'), isSolved: (state) => state.fn === 1 && rateIs(state, 7) },
    { id: 53404, prompt: say('Harriaren altueran, aurkitu batez besteko abiadura negatiboa duen tarte bat: harria jaisten ari da.', 'En la altura de la piedra, encuentra un intervalo con velocidad media negativa: la piedra está bajando.', 'في ارتفاع الحجر جد فترة سرعتها المتوسطة سالبة: الحجر ينزل.'), hint: say('Altuera maximoa $t=4$ denean da.', 'La altura máxima es en $t=4$.', 'الارتفاع الأقصى عند $t=4$.'), isSolved: (state) => { const rate = rateOf(state); return state.fn === 2 && rate !== null && rate.numerator < 0 } }
]

/* ---------- 5. Periodic functions ---------- */

export interface PeriodicPattern {
    short: LocalizedText
    period: number
    /** x moves in steps of this size */
    step: number
    yUnit: number
    /** Value inside the first period, 0 ≤ r < period */
    first: (r: number) => number
}

export const periodicPatterns: PeriodicPattern[] = [
    { short: say('Zisterna', 'Cisterna', 'الخزان'), period: 2, step: 0.5, yUnit: 10, first: (r) => 20 * r },
    { short: say('Mendiak', 'Montañas', 'الجبال'), period: 4, step: 1, yUnit: 1, first: (r) => [1, 2, 3, 3][r] }
]

export const PERIODIC_MAX = 60

export interface PeriodicState {
    pattern: number
    x: number
}

export const initialPeriodicState: PeriodicState = { pattern: 0, x: 0 }

export function setPeriodic(state: PeriodicState, patch: Partial<PeriodicState>): PeriodicState {
    const pattern = clamp(patch.pattern ?? state.pattern, 0, periodicPatterns.length - 1)
    if (pattern !== state.pattern) return { pattern, x: 0 }
    const x = periodicPatterns[pattern].step === 1 ? clamp(patch.x ?? state.x, 0, PERIODIC_MAX) : clampHalf(patch.x ?? state.x, 0, PERIODIC_MAX)
    return { pattern, x }
}

export function periodicValue(state: PeriodicState): { q: number; r: number; y: number } {
    const { period, first } = periodicPatterns[state.pattern]
    const r = reduceToPeriod(state.x, period)
    return { q: Math.round((state.x - r) / period), r, y: first(r) }
}

export const periodicChallenges: LabChallenge<PeriodicState>[] = [
    { id: 53501, prompt: say('Zisternan, zenbat litro daude 17 minututan? Jarri kurtsorea.', 'En la cisterna, ¿cuántos litros hay a los 17 minutos? Pon el cursor.', 'في الخزان، كم لترًا بعد 17 دقيقة؟ ضع المؤشر.'), hint: say('$17=8\\cdot 2+1$', '$17=8\\cdot 2+1$', '$17=8\\cdot 2+1$'), isSolved: (state) => state.pattern === 0 && state.x === 17 },
    { id: 53502, prompt: say('Zisternan, aurkitu 30 minutuaren ondoren 30 litro dituen une bat.', 'En la cisterna, encuentra un momento después del minuto 30 con 30 litros.', 'في الخزان جد لحظة بعد الدقيقة 30 فيها 30 لترًا.'), hint: say('Lehen periodoan, 30 L 1,5 minututan daude.', 'En el primer periodo, hay 30 L a los 1,5 minutos.', 'في الدور الأول يوجد 30 لترًا بعد 1.5 دقيقة.'), isSolved: (state) => state.pattern === 0 && state.x > 30 && periodicValue(state).y === 30 },
    { id: 53503, prompt: say('Mendietan, aurkitu 20 baino handiagoa den $x$ bat $f(x)=1$ duena.', 'En las montañas, encuentra una $x$ mayor que 20 con $f(x)=1$.', 'في الجبال جد $x$ أكبر من 20 حيث $f(x)=1$.'), hint: say('$f(0)=1$ eta periodoa 4 da.', '$f(0)=1$ y el periodo es 4.', '$f(0)=1$ والدور 4.'), isSolved: (state) => state.pattern === 1 && state.x > 20 && periodicValue(state).y === 1 },
    { id: 53504, prompt: say('Mendietan, egiaztatu $f(42)$.', 'En las montañas, comprueba $f(42)$.', 'في الجبال تحقّق من $f(42)$.'), hint: say('$42=10\\cdot 4+2$', '$42=10\\cdot 4+2$', '$42=10\\cdot 4+2$'), isSolved: (state) => state.pattern === 1 && state.x === 42 }
]

/* ---------- 6. The box made from a card ---------- */

export const BOX_WIDTH = 40
export const BOX_HEIGHT = 30

export interface BoxState {
    x: number
}

export const initialBoxState: BoxState = { x: 1 }

export const setBox = (_state: BoxState, x: number): BoxState => ({ x: clampHalf(x, 0.5, BOX_HEIGHT / 2 - 0.5) })

export const boxVolume = ({ x }: BoxState) => (BOX_WIDTH - 2 * x) * (BOX_HEIGHT - 2 * x) * x

export const boxChallenges: LabChallenge<BoxState>[] = [
    { id: 53601, prompt: say('Lortu 3000 cm³-ko kutxa bat.', 'Consigue una caja de 3000 cm³.', 'احصل على علبة حجمها 3000 سم³.'), hint: say('Probatu $x=5$.', 'Prueba $x=5$.', 'جرّب $x=5$.'), isSolved: (state) => boxVolume(state) === 3000 },
    { id: 53602, prompt: say('Aurkitu bolumenik handieneko kutxa (0,5 cm-ko urratsekin).', 'Encuentra la caja de mayor volumen (con pasos de 0,5 cm).', 'جد العلبة ذات الحجم الأكبر (بخطوات 0.5 سم).'), hint: say('Bolumena hazten da eta gero txikitu: bilatu biraketa.', 'El volumen crece y luego decrece: busca dónde gira.', 'يزيد الحجم ثم ينقص: ابحث عن موضع الانعطاف.'), isSolved: (state) => state.x === 5.5 },
    { id: 53603, prompt: say('Lortu 2000 cm³-ko kutxa bat, $x>5$ izanik.', 'Consigue una caja de 2000 cm³ con $x>5$.', 'احصل على علبة حجمها 2000 سم³ مع $x>5$.'), hint: say('$20\\cdot 10\\cdot 10$', '$20\\cdot 10\\cdot 10$', '$20\\cdot 10\\cdot 10$'), isSolved: (state) => state.x > 5 && boxVolume(state) === 2000 },
    { id: 53604, prompt: say('Lortu 500 cm³ baino gutxiagoko kutxa bat.', 'Consigue una caja de menos de 500 cm³.', 'احصل على علبة حجمها أقل من 500 سم³.'), hint: say('Kutxa oso altua eta estua.', 'Una caja muy alta y estrecha.', 'علبة عالية وضيقة جدًا.'), isSolved: (state) => boxVolume(state) < 500 }
]

export const functionsLabChallengeIds: number[] = [relationChallenges, tableChallenges, domainChallenges, interceptsChallenges, explorerChallenges, rateChallenges, periodicChallenges, boxChallenges].flatMap((list) => list.map((challenge) => challenge.id))
