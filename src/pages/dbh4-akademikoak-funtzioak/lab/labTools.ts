import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { relationChallenges, tableChallenges } from '../../dbh2-funtzioak-v2/lab/labTools.ts'
import { domainChallenges, explorerChallenges, periodicChallenges, rateChallenges } from '../../dbh4-aplikatuak-funtzioak/lab/labTools.ts'
import type { FunctionsAkStageId } from '../lessons.tsx'
import { same, say } from '../text.ts'

/* ==========================================================================
   Funtzioak (4. DBH akademikoak) laboratory. "Function or not" and "table
   and formula" come from 2. DBH, and the domain and range of a graph, the
   walk along a graph, the T.V.M. and the periodic functions from 4. DBH
   aplikatuak, each with its own challenges. The new tools: the domain of
   1/P, √P and 1/√P built piece by piece on a number line; two pieces
   joined (or not) by a parameter k; a cubic built from its three roots,
   with its intercepts and its sign; and a polynomial whose parity shows
   in its mirror image. Pure state logic; the components live next to this
   file. Tests in tests/funtzioak-dbh4ak-lab.test.ts.
   ========================================================================== */

export type FunctionsAkLabToolId = 'relation' | 'table' | 'domain' | 'domains' | 'join' | 'roots' | 'parity' | 'explorer' | 'rate' | 'periodic'

export interface FunctionsAkLabTool extends LabToolInfo {
    id: FunctionsAkLabToolId
    stage: FunctionsAkStageId
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const clampHalf = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value * 2) / 2))

export const functionsAkLabTools: FunctionsAkLabTool[] = [
    { id: 'relation', stage: 'concept', lessonTopic: 'what-is', title: say('Funtzioa ala ez?', '¿Función o no?', 'دالة أم لا؟', 'Function or not?'), observe: say('Mugitu zuzen bertikala. Puntu bat baino gehiago ebakitzen dituenean x berak bi irteera ditu: ez da funtzioa.', 'Mueve la recta vertical. Cuando corta más de un punto, una misma x tiene dos salidas: no es función.', 'حرّك الخط الرأسي. عندما يقطع أكثر من نقطة فلـ x نفسها مخرجان: ليست دالة.', 'Move the vertical line. When it crosses more than one point, the same x has two outputs: it is not a function.') },
    { id: 'table', stage: 'concept', lessonTopic: 'images', title: say('Taula eta formula', 'Tabla y fórmula', 'الجدول والصيغة', 'Table and formula'), observe: say('Formulak x bakoitzaren irudia ematen du; taulak probatutako bikoteak gordetzen ditu, eta grafikoak puntu gisa erakusten ditu.', 'La fórmula da la imagen de cada x; la tabla guarda las parejas probadas y la gráfica las enseña como puntos.', 'تعطي الصيغة صورة كل x، ويحفظ الجدول الأزواج المجرّبة، ويعرضها الرسم نقاطًا.', 'The formula gives the image of each x; the table keeps the pairs you have tested, and the graph shows them as points.') },
    { id: 'domain', stage: 'concept', lessonTopic: 'range-graph', title: say('Izate-eremua eta ibiltartea', 'Dominio y recorrido', 'المجال والمدى', 'Domain and range'), observe: say('Izate-eremua kurbaren itzala da X ardatzean, eta ibiltartea Y ardatzean. Muturrak kurbaren hasiera eta amaiera eta punturik altuena eta baxuena dira.', 'El dominio es la sombra de la curva sobre el eje X, y el recorrido sobre el eje Y. Los extremos son el principio y el final de la curva y sus puntos más alto y más bajo.', 'المجال ظل المنحنى على محور X، والمدى ظله على محور Y. الأطراف بداية المنحنى ونهايته وأعلى نقطة وأدناها.', 'The domain is the shadow of the curve on the x-axis, and the range is its shadow on the y-axis. The end points are the start and finish of the curve, and its highest and lowest points.') },
    { id: 'domains', stage: 'domain', lessonTopic: 'radical-domain', title: say('Izate-eremua eraikitzea', 'Construye el dominio', 'ابنِ المجال', 'Build the domain'), observe: say('Erroek zuzena hiru tartetan zatitzen dute, eta P-k zeinu bera du tarte bakoitzean. Zatikian erroak bakarrik kentzen dira; erroan P negatiboa den tartea; izendatzaileko erroan, biak.', 'Las raíces parten la recta en tres intervalos, y P tiene el mismo signo en cada uno. En la fracción solo se quitan las raíces; en la raíz, el intervalo donde P es negativo; en la raíz del denominador, las dos cosas.', 'يقسم الجذران المستقيم إلى ثلاث فترات، ولـ P الإشارة نفسها في كل فترة. في الكسر يُحذف الجذران فقط؛ وفي الجذر الفترة التي يكون فيها P سالبًا؛ وفي الجذر الذي في المقام الأمران معًا.', 'The roots split the line into three intervals, and P has the same sign in each one. In a fraction you only remove the roots; in a square root, you remove the interval where P is negative; in a square root in the denominator, you do both.') },
    { id: 'join', stage: 'continuity', lessonTopic: 'piecewise-continuity', title: say('Bi zati lotzea', 'Une dos trozos', 'صِل جزأين', 'Join two pieces'), observe: say('k-k zati bat gora edo behera mugitzen du. Bi zatiek lotunean balio bera ematen dutenean, jauzia desagertzen da eta funtzioa jarraitua da.', 'k sube o baja uno de los trozos. Cuando los dos trozos dan el mismo valor en la unión, el salto desaparece y la función es continua.', 'يرفع k أحد الجزأين أو يخفضه. عندما يعطي الجزءان القيمة نفسها عند نقطة الالتقاء تختفي القفزة وتصبح الدالة متصلة.', 'k moves one of the pieces up or down. When the two pieces give the same value at the join, the jump disappears and the function is continuous.') },
    { id: 'roots', stage: 'features', lessonTopic: 'intercepts', title: say('Kubikoa bere erroetatik', 'Una cúbica desde sus raíces', 'دالة تكعيبية من جذورها', 'A cubic from its roots'), observe: say('Erro bakoitza X ardatzarekiko ebaki bat da, eta funtzioak zeinua aldatzen du han. Erro bikoitz batean ardatza ukitu egiten du, zeharkatu gabe. Y ardatzarekiko ebakidura erroen biderkadura da, zeinua aldatuta.', 'Cada raíz es un corte con el eje X, y allí la función cambia de signo. En una raíz doble toca el eje sin atravesarlo. El corte con el eje Y es el producto de las raíces cambiado de signo.', 'كل جذر نقطة تقاطع مع محور X، وهناك تغيّر الدالة إشارتها. وعند الجذر المضاعف تمس المحور دون أن تعبره. والتقاطع مع محور Y هو حاصل ضرب الجذور مع تغيير الإشارة.', 'Each root is an x-intercept, and there the function changes sign. At a double root, it touches the axis without crossing it. The y-intercept is the product of the roots with the opposite sign.') },
    { id: 'parity', stage: 'features', lessonTopic: 'symmetry', title: say('Bikoitia ala bakoitia?', '¿Par o impar?', 'زوجية أم فردية؟', 'Even or odd?'), observe: say('Marratua grafikoaren ispilua da Y ardatzean. Bat badatoz, funtzioa bikoitia da; ispilua alderantzikatuta badator, bakoitia. Begiratu berretzaileei.', 'La discontinua es el reflejo de la gráfica en el eje Y. Si coinciden, la función es par; si coincide el reflejo dado la vuelta, impar. Mira los exponentes.', 'الخط المتقطع انعكاس الرسم في محور Y. إذا تطابقا فالدالة زوجية؛ وإذا تطابق الانعكاس مقلوبًا ففردية. انظر إلى الأسس.', 'The dashed line is the reflection of the graph in the y-axis. If they match, the function is even; if the reflection turned upside down matches, it is odd. Look at the exponents.') },
    { id: 'explorer', stage: 'change', lessonTopic: 'monotony', title: say('Grafiko baten bidaia', 'Recorre una gráfica', 'تجوّل في رسم', 'Travel along a graph'), observe: say('Kurtsorea ezkerretik eskuinera mugitzean, joera aldatzen den puntuak maximoak eta minimoak dira. Absolutuak muturretan ere egon daitezke.', 'Al mover el cursor de izquierda a derecha, los puntos donde cambia la tendencia son máximos y mínimos. Los absolutos también pueden estar en los extremos.', 'عند تحريك المؤشر من اليسار إلى اليمين تكون النقاط التي يتغير فيها الاتجاه قيمًا عظمى وصغرى. ويمكن أن تقع المطلقة عند الأطراف أيضًا.', 'As you move the cursor from left to right, the points where the trend changes are maximum and minimum points. Absolute maximum and minimum points can also be at the ends.') },
    { id: 'rate', stage: 'change', lessonTopic: 'rate', title: say('Batez besteko aldakuntza-tasa', 'Tasa de variación media', 'معدل التغير المتوسط', 'Average rate of change'), observe: say('T.V.M. bi puntuak lotzen dituen zuzenkiaren malda da: igotzen bada positiboa, jaisten bada negatiboa, eta horizontala bada 0.', 'La T.V.M. es la pendiente del segmento que une los dos puntos: positiva si sube, negativa si baja y 0 si es horizontal.', 'المعدل ميل القطعة الواصلة بين النقطتين: موجب إذا صعدت، وسالب إذا نزلت، و0 إذا كانت أفقية.', 'The average rate of change is the slope of the segment joining the two points: positive if it goes up, negative if it goes down, and 0 if it is horizontal.') },
    { id: 'periodic', stage: 'change', lessonTopic: 'periodic', title: say('Funtzio periodikoak', 'Funciones periódicas', 'الدوال الدورية', 'Periodic functions'), observe: say('Urruneko balio bat jakiteko, zatitu x periodoaz: hondarrak esaten du lehen periodoko zein puntutan zauden.', 'Para saber un valor lejano, divide x entre el periodo: el resto dice en qué punto del primer periodo estás.', 'لمعرفة قيمة بعيدة اقسم x على الدور: يدلك الباقي على موضعك في الدور الأول.', 'To find a distant value, divide x by the period: the remainder tells you where you are in the first period.') }
]

export const functionsAkLabToolForTopic: Record<string, FunctionsAkLabToolId | undefined> = {
    'what-is': 'relation',
    images: 'table',
    'range-graph': 'domain',
    'rational-domain': 'domains',
    'radical-domain': 'domains',
    'mixed-domain': 'domains',
    discontinuities: 'join',
    piecewise: 'join',
    'piecewise-continuity': 'join',
    intercepts: 'roots',
    sign: 'roots',
    symmetry: 'parity',
    monotony: 'explorer',
    rate: 'rate',
    periodic: 'periodic'
}

/* ---------- 1. Building a domain: 1/P, √P and 1/√P with P = s(x − r)(x − t) ---------- */

export type DomainKind = 'fraction' | 'root' | 'rootDenominator'
export const ROOT_LIMIT = 5

/**
 * The line split by the two roots: [left interval, first root, middle interval,
 * second root, right interval]. With a double root the middle interval and the
 * second root do not exist.
 */
export interface DomainsState {
    kind: DomainKind
    /** Sign of the leading coefficient of P */
    sign: 1 | -1
    r: number
    t: number
    picks: [boolean, boolean, boolean, boolean, boolean]
}

export const initialDomainsState: DomainsState = { kind: 'fraction', sign: 1, r: -1, t: 1, picks: [false, false, false, false, false] }

export function setDomains(state: DomainsState, patch: Partial<Omit<DomainsState, 'picks'>>): DomainsState {
    const next = { ...state, ...patch }
    let r = clamp(next.r, -ROOT_LIMIT, ROOT_LIMIT)
    let t = clamp(next.t, -ROOT_LIMIT, ROOT_LIMIT)
    // The first root never passes the second: the one that moved pushes the other
    if (r > t) [r, t] = patch.r !== undefined ? [r, r] : [t, t]
    // A new function starts with nothing marked
    const changed = next.kind !== state.kind || next.sign !== state.sign || r !== state.r || t !== state.t
    return { kind: next.kind, sign: next.sign === -1 ? -1 : 1, r, t, picks: changed ? [false, false, false, false, false] : state.picks }
}

export function togglePiece(state: DomainsState, piece: number): DomainsState {
    const picks = [...state.picks] as DomainsState['picks']
    picks[piece] = !picks[piece]
    return { ...state, picks }
}

/** Sign of P on each piece: the outer intervals have the sign of s, the middle one the opposite, the roots 0 */
export function pieceSigns({ sign }: DomainsState): [number, number, number, number, number] {
    return [sign, 0, -sign, 0, sign]
}

/** Which pieces belong to the domain */
export function domainPieces(state: DomainsState): [boolean, boolean, boolean, boolean, boolean] {
    const keep = (value: number) => (state.kind === 'fraction' ? value !== 0 : state.kind === 'root' ? value >= 0 : value > 0)
    const pieces = pieceSigns(state).map(keep) as [boolean, boolean, boolean, boolean, boolean]
    // A double root: s(x − r)² has the sign of s on both sides
    if (state.r === state.t) return [pieces[0], pieces[1], false, false, pieces[4]]
    return pieces
}

/** The pieces that exist (with a double root there are only three) */
export const livePieces = (state: DomainsState) => (state.r === state.t ? [0, 1, 4] : [0, 1, 2, 3, 4])

export const domainsRight = (state: DomainsState) => {
    const truth = domainPieces(state)
    return livePieces(state).every((piece) => state.picks[piece] === truth[piece])
}

/** P(x) expanded, as LaTeX: s(x² − (r + t)x + rt) */
export function polynomialLatex({ sign, r, t }: Pick<DomainsState, 'sign' | 'r' | 't'>): string {
    const b = -sign * (r + t)
    const c = sign * r * t
    const lead = sign === 1 ? 'x^{2}' : '-x^{2}'
    const linear = b === 0 ? '' : `${b > 0 ? '+' : '-'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x`
    const constant = c === 0 ? '' : `${c > 0 ? '+' : '-'}${Math.abs(c)}`
    return `${lead}${linear}${constant}`
}

/** The whole function, as LaTeX */
export function domainFunctionLatex(state: Pick<DomainsState, 'kind' | 'sign' | 'r' | 't'>): string {
    const p = polynomialLatex(state)
    if (state.kind === 'fraction') return `y=\\frac{1}{${p}}`
    if (state.kind === 'root') return `y=\\sqrt{${p}}`
    return `y=\\frac{1}{\\sqrt{${p}}}`
}

const sameFunction = (state: DomainsState, kind: DomainKind, sign: 1 | -1, r: number, t: number) => state.kind === kind && state.sign === sign && state.r === Math.min(r, t) && state.t === Math.max(r, t)

export const domainsChallenges: LabChallenge<DomainsState>[] = [
    { id: 75101, prompt: say('Eraiki $y=\\frac{1}{x^{2}+2x-8}$ funtzioaren izate-eremua.', 'Construye el dominio de $y=\\frac{1}{x^{2}+2x-8}$.', 'ابنِ مجال $y=\\frac{1}{x^{2}+2x-8}$.', 'Build the domain of $y=\\frac{1}{x^{2}+2x-8}$.'), hint: say('Erroak $-4$ eta $2$ dira; zatikian erroak bakarrik kentzen dira.', 'Las raíces son $-4$ y $2$; en una fracción solo se quitan las raíces.', 'الجذران $-4$ و$2$؛ في الكسر يُحذف الجذران فقط.', 'The roots are $-4$ and $2$; in a fraction, you only remove the roots.'), isSolved: (state) => sameFunction(state, 'fraction', 1, -4, 2) && domainsRight(state) },
    { id: 75102, prompt: say('Eraiki $y=\\sqrt{x^{2}-9}$ funtzioaren izate-eremua.', 'Construye el dominio de $y=\\sqrt{x^{2}-9}$.', 'ابنِ مجال $y=\\sqrt{x^{2}-9}$.', 'Build the domain of $y=\\sqrt{x^{2}-9}$.'), hint: say('Errokizuna ≥ 0: kanpoko tarteak eta erroak.', 'Radicando ≥ 0: los intervalos de fuera y las raíces.', 'ما تحت الجذر ≥ 0: الفترتان الخارجيتان والجذران.', 'Radicand ≥ 0: the intervals outside the roots, and the roots themselves.'), isSolved: (state) => sameFunction(state, 'root', 1, -3, 3) && domainsRight(state) },
    { id: 75103, prompt: say('Eraiki $y=\\sqrt{4-x^{2}}$ funtzioaren izate-eremua.', 'Construye el dominio de $y=\\sqrt{4-x^{2}}$.', 'ابنِ مجال $y=\\sqrt{4-x^{2}}$.', 'Build the domain of $y=\\sqrt{4-x^{2}}$.'), hint: say('Koefiziente nagusia negatiboa da: P positiboa da erdian.', 'El coeficiente principal es negativo: P es positivo en el centro.', 'المعامل الرئيسي سالب: P موجب في الوسط.', 'The leading coefficient is negative: P is positive in the middle.'), isSolved: (state) => sameFunction(state, 'root', -1, -2, 2) && domainsRight(state) },
    { id: 75104, prompt: say('Eraiki $y=\\frac{1}{\\sqrt{x^{2}-4x}}$ funtzioaren izate-eremua.', 'Construye el dominio de $y=\\frac{1}{\\sqrt{x^{2}-4x}}$.', 'ابنِ مجال $y=\\frac{1}{\\sqrt{x^{2}-4x}}$.', 'Build the domain of $y=\\frac{1}{\\sqrt{x^{2}-4x}}$.'), hint: say('$x^{2}-4x=x(x-4)$; izendatzaileko erroan, > 0 hertsia.', '$x^{2}-4x=x(x-4)$; raíz en el denominador: > 0 estricto.', '$x^{2}-4x=x(x-4)$؛ الجذر في المقام: > 0 تمامًا.', '$x^{2}-4x=x(x-4)$; square root in the denominator: strictly > 0.'), isSolved: (state) => sameFunction(state, 'rootDenominator', 1, 0, 4) && domainsRight(state) },
    { id: 75105, prompt: say('Eraiki $y=\\sqrt{x^{2}-6x+9}$ funtzioaren izate-eremua.', 'Construye el dominio de $y=\\sqrt{x^{2}-6x+9}$.', 'ابنِ مجال $y=\\sqrt{x^{2}-6x+9}$.', 'Build the domain of $y=\\sqrt{x^{2}-6x+9}$.'), hint: say('$x^{2}-6x+9=(x-3)^{2}$: erro bikoitza, eta ez da inoiz negatiboa.', '$x^{2}-6x+9=(x-3)^{2}$: raíz doble, y nunca es negativo.', '$x^{2}-6x+9=(x-3)^{2}$: جذر مضاعف ولا يكون سالبًا أبدًا.', '$x^{2}-6x+9=(x-3)^{2}$: double root, and it is never negative.'), isSolved: (state) => sameFunction(state, 'root', 1, 3, 3) && domainsRight(state) }
]

/* ---------- 2. Joining two pieces with a parameter k ---------- */

export interface JoinPreset {
    /** Where the pieces meet */
    at: number
    /** Whether the left piece includes the meeting point (≤) or the right one does (≥) */
    leftCloses: boolean
    left: (x: number, k: number) => number
    right: (x: number, k: number) => number
    /** LaTeX of each piece, with k */
    leftLatex: string
    rightLatex: string
}

export const joinPresets: JoinPreset[] = [
    { at: 2, leftCloses: true, left: (x) => x * x - 1, right: (x, k) => x + k, leftLatex: 'x^{2}-1', rightLatex: 'x+k' },
    { at: 1, leftCloses: false, left: (x, k) => 2 * x + k, right: (x) => x * x + 3, leftLatex: '2x+k', rightLatex: 'x^{2}+3' },
    { at: 3, leftCloses: true, left: (x, k) => k * x - 1, right: (x, k) => x * x - k, leftLatex: 'kx-1', rightLatex: 'x^{2}-k' }
]

export const K_LIMIT = 6

export interface JoinState {
    preset: number
    k: number
}

export const initialJoinState: JoinState = { preset: 0, k: 0 }

export function setJoin(state: JoinState, patch: Partial<JoinState>): JoinState {
    const next = { ...state, ...patch }
    return { preset: clamp(next.preset, 0, joinPresets.length - 1), k: clampHalf(next.k, -K_LIMIT, K_LIMIT) }
}

/** The values of both pieces at the meeting point, and the jump (right minus left) */
export function joinValues({ preset, k }: JoinState): { left: number; right: number; jump: number } {
    const piece = joinPresets[preset]
    const left = piece.left(piece.at, k)
    const right = piece.right(piece.at, k)
    return { left, right, jump: Math.round((right - left) * 1000) / 1000 }
}

export const isContinuous = (state: JoinState) => joinValues(state).jump === 0

export const joinChallenges: LabChallenge<JoinState>[] = [
    { id: 75201, prompt: say('Lehen funtzioan, egin funtzioa jarraitua.', 'En la primera función, haz que sea continua.', 'في الدالة الأولى اجعلها متصلة.', 'For the first function, make it continuous.'), hint: say('$x=2$ puntuan: $2^{2}-1=3$ eta $2+k$.', 'En $x=2$: $2^{2}-1=3$ y $2+k$.', 'عند $x=2$: $2^{2}-1=3$ و$2+k$.', 'At $x=2$: $2^{2}-1=3$ and $2+k$.'), isSolved: (state) => state.preset === 0 && isContinuous(state) },
    { id: 75202, prompt: say('Lehen funtzioan, egin 2ko jauzia gorantz.', 'En la primera función, haz un salto de 2 hacia arriba.', 'في الدالة الأولى اصنع قفزة مقدارها 2 إلى أعلى.', 'In the first function, make a jump of 2 upwards.'), hint: say('Eskuineko zatiak 5 eman behar du.', 'El trozo derecho tiene que dar 5.', 'يجب أن يعطي الجزء الأيمن 5.', 'The right-hand piece must give 5.'), isSolved: (state) => state.preset === 0 && joinValues(state).jump === 2 },
    { id: 75203, prompt: say('Bigarren funtzioan, egin funtzioa jarraitua.', 'En la segunda función, haz que sea continua.', 'في الدالة الثانية اجعلها متصلة.', 'For the second function, make it continuous.'), hint: say('$x=1$ puntuan: $2+k$ eta $1+3=4$.', 'En $x=1$: $2+k$ y $1+3=4$.', 'عند $x=1$: $2+k$ و$1+3=4$.', 'At $x=1$: $2+k$ and $1+3=4$.'), isSolved: (state) => state.preset === 1 && isContinuous(state) },
    { id: 75204, prompt: say('Bigarren funtzioan, egin 3ko jauzia gorantz.', 'En la segunda función, haz un salto de 3 hacia arriba.', 'في الدالة الثانية اصنع قفزة مقدارها 3 إلى أعلى.', 'In the second function, make a jump of 3 upwards.'), hint: say('Ezkerreko zatiak $4-3=1$ eman behar du.', 'El trozo izquierdo tiene que dar $4-3=1$.', 'يجب أن يعطي الجزء الأيسر $4-3=1$.', 'The left-hand piece must give $4-3=1$.'), isSolved: (state) => state.preset === 1 && joinValues(state).jump === 3 },
    { id: 75205, prompt: say('Hirugarren funtzioan, k bi zatietan dago: egin funtzioa jarraitua.', 'En la tercera función k está en los dos trozos: haz que sea continua.', 'في الدالة الثالثة يوجد k في الجزأين: اجعلها متصلة.', 'In the third function, $k$ is in both pieces: make it continuous.'), hint: same('$3k-1=9-k$'), isSolved: (state) => state.preset === 2 && isContinuous(state) }
]

/* ---------- 3. A cubic from its roots ---------- */

export const CUBIC_LIMIT = 4

export interface RootsState {
    roots: [number, number, number]
}

export const initialRootsState: RootsState = { roots: [-1, 0, 1] }

export function setRoot(state: RootsState, index: number, value: number): RootsState {
    const roots = [...state.roots] as RootsState['roots']
    roots[index] = clamp(value, -CUBIC_LIMIT, CUBIC_LIMIT)
    return { roots }
}

/** Coefficients of (x − r)(x − s)(x − t) from the highest degree: [1, b, c, d] */
export function cubicCoefficients({ roots: [r, s, t] }: RootsState): [number, number, number, number] {
    return [1, -(r + s + t), r * s + r * t + s * t, -r * s * t] as [number, number, number, number]
}

export const cubicValue = (state: RootsState, x: number) => state.roots.reduce((product, root) => product * (x - root), 1)

/** The polynomial expanded, as LaTeX */
export function cubicLatex(state: RootsState): string {
    const [, b, c, d] = cubicCoefficients(state)
    const term = (value: number, power: string) => (value === 0 ? '' : `${value > 0 ? '+' : '-'}${Math.abs(value) === 1 && power ? '' : Math.abs(value)}${power}`)
    return `y=x^{3}${term(b, 'x^{2}')}${term(c, 'x')}${term(d, '')}`
}

/** The different roots in order */
export const distinctRoots = (state: RootsState) => [...new Set(state.roots)].sort((a, b) => a - b)

/** Intervals between the roots, with the sign of the function on each one */
export function signIntervals(state: RootsState): Array<{ from: number | null; to: number | null; sign: 1 | -1 }> {
    const cuts = distinctRoots(state)
    const bounds: Array<number | null> = [null, ...cuts, null]
    return bounds.slice(0, -1).map((from, index) => {
        const to = bounds[index + 1]
        const probe = from === null ? (to as number) - 1 : to === null ? from + 1 : (from + to) / 2
        return { from, to, sign: cubicValue(state, probe) > 0 ? 1 : -1 }
    })
}

const sameRoots = (state: RootsState, roots: number[]) => [...state.roots].sort((a, b) => a - b).join() === [...roots].sort((a, b) => a - b).join()

export const rootsChallenges: LabChallenge<RootsState>[] = [
    { id: 75301, prompt: say('Eraiki $y=x^{3}-x^{2}-4x+4$.', 'Construye $y=x^{3}-x^{2}-4x+4$.', 'ابنِ $y=x^{3}-x^{2}-4x+4$.', 'Build $y=x^{3}-x^{2}-4x+4$.'), hint: say('$(x-1)(x-2)(x+2)$', '$(x-1)(x-2)(x+2)$', '$(x-1)(x-2)(x+2)$', '$(x-1)(x-2)(x+2)$'), isSolved: (state) => sameRoots(state, [1, 2, -2]) },
    { id: 75302, prompt: say('Eraiki $y=x^{3}-4x$.', 'Construye $y=x^{3}-4x$.', 'ابنِ $y=x^{3}-4x$.', 'Build $y=x^{3}-4x$.'), hint: say('Atera $x$ faktore komun gisa.', 'Saca $x$ factor común.', 'أخرج $x$ عاملًا مشتركًا.', 'Take $x$ out as a common factor.'), isSolved: (state) => sameRoots(state, [0, 2, -2]) },
    { id: 75303, prompt: say('Hiru erro desberdinekin, egin kubikoak Y ardatza $(0,\\,6)$ puntuan ebaki dezan.', 'Con tres raíces distintas, haz que la cúbica corte al eje Y en $(0,\\,6)$.', 'بثلاثة جذور مختلفة اجعل الدالة تقطع محور Y في $(0,\\,6)$.', 'With three different roots, make the cubic cross the y-axis at $(0,\\,6)$.'), hint: say('$f(0)=-r\\cdot s\\cdot t$: erroen biderkadura $-6$ izan behar da.', '$f(0)=-r\\cdot s\\cdot t$: el producto de las raíces tiene que ser $-6$.', '$f(0)=-r\\cdot s\\cdot t$: يجب أن يكون حاصل ضرب الجذور $-6$.', '$f(0)=-r\\cdot s\\cdot t$: the product of the roots must be $-6$.'), isSolved: (state) => distinctRoots(state).length === 3 && cubicCoefficients(state)[3] === 6 },
    { id: 75304, prompt: say('Egin funtzioa positiboa izan dadin $(-3,\\,1)\\cup(2,\\,+\\infty)$ tartean bakarrik.', 'Haz que la función sea positiva solo en $(-3,\\,1)\\cup(2,\\,+\\infty)$.', 'اجعل الدالة موجبة فقط في $(-3,\\,1)\\cup(2,\\,+\\infty)$.', 'Make the function positive only on $(-3,\\,1)\\cup(2,\\,+\\infty)$.'), hint: say('Zeinua erroetan aldatzen da: zein dira erroak?', 'El signo cambia en las raíces: ¿cuáles son?', 'تتغير الإشارة عند الجذور: ما هي؟', 'The sign changes at the roots: which are they?'), isSolved: (state) => sameRoots(state, [-3, 1, 2]) },
    { id: 75305, prompt: say('Egin kubikoak X ardatza $x=2$ puntuan ukitu (zeharkatu gabe) eta $x=-1$ puntuan ebaki dezan.', 'Haz que la cúbica toque al eje X en $x=2$ (sin atravesarlo) y lo corte en $x=-1$.', 'اجعل الدالة تمس محور X عند $x=2$ (دون أن تعبره) وتقطعه عند $x=-1$.', 'Make the cubic touch the x-axis at $x=2$ (without crossing it) and cross it at $x=-1$.'), hint: say('Erro bikoitza: 2 bi aldiz.', 'Raíz doble: el 2 dos veces.', 'جذر مضاعف: العدد 2 مرتين.', 'Double root: 2 appears twice.'), isSolved: (state) => sameRoots(state, [2, 2, -1]) }
]

/* ---------- 4. Even, odd or neither: y = ax³ + bx² + cx + d ---------- */

export const PARITY_LIMIT = 3

export interface ParityState {
    a: number
    b: number
    c: number
    d: number
}

export const initialParityState: ParityState = { a: 0, b: 0, c: 1, d: 1 }

export function setParity(state: ParityState, patch: Partial<ParityState>): ParityState {
    const next = { ...state, ...patch }
    return { a: clamp(next.a, -PARITY_LIMIT, PARITY_LIMIT), b: clamp(next.b, -PARITY_LIMIT, PARITY_LIMIT), c: clamp(next.c, -PARITY_LIMIT, PARITY_LIMIT), d: clamp(next.d, -PARITY_LIMIT, PARITY_LIMIT) }
}

export const parityValue = ({ a, b, c, d }: ParityState, x: number) => ((a * x + b) * x + c) * x + d

export type Parity = 'even' | 'odd' | 'both' | 'neither'

export function parityOf({ a, b, c, d }: ParityState): Parity {
    const even = a === 0 && c === 0
    const odd = b === 0 && d === 0
    return even && odd ? 'both' : even ? 'even' : odd ? 'odd' : 'neither'
}

/** The polynomial as LaTeX */
export function parityLatex({ a, b, c, d }: ParityState): string {
    const terms = [[a, 'x^{3}'], [b, 'x^{2}'], [c, 'x'], [d, '']] as const
    let text = ''
    for (const [value, power] of terms) {
        if (value === 0) continue
        const size = Math.abs(value) === 1 && power ? '' : String(Math.abs(value))
        text += `${value < 0 ? '-' : text ? '+' : ''}${size}${power}`
    }
    return `y=${text || '0'}`
}

export const parityChallenges: LabChallenge<ParityState>[] = [
    { id: 75401, prompt: say('Egin funtzio bikoiti bat $x^{2}$ gaiarekin.', 'Haz una función par con término en $x^{2}$.', 'اصنع دالة زوجية فيها حد $x^{2}$.', 'Make an even function with an $x^{2}$ term.'), hint: say('Berretzaile bikoitiak bakarrik: kendu $x^{3}$ eta $x$.', 'Solo exponentes pares: quita $x^{3}$ y $x$.', 'أسس زوجية فقط: احذف $x^{3}$ و$x$.', 'Even powers only: remove $x^{3}$ and $x$.'), isSolved: (state) => parityOf(state) === 'even' && state.b !== 0 },
    { id: 75402, prompt: say('Egin funtzio bakoiti bat $(1,\\,-2)$ puntutik pasatzen dena.', 'Haz una función impar que pase por $(1,\\,-2)$.', 'اصنع دالة فردية تمر بالنقطة $(1,\\,-2)$.', 'Make an odd function that passes through $(1,\\,-2)$.'), hint: say('$b=d=0$ eta $a+c=-2$.', '$b=d=0$ y $a+c=-2$.', '$b=d=0$ و$a+c=-2$.', '$b=d=0$ and $a+c=-2$.'), isSolved: (state) => parityOf(state) === 'odd' && parityValue(state, 1) === -2 },
    { id: 75403, prompt: say('Egin funtzio bikoiti bat $f(1)=0$ duena eta $x^{2}$ gaiarekin.', 'Haz una función par con $f(1)=0$ y término en $x^{2}$.', 'اصنع دالة زوجية فيها $f(1)=0$ وحد $x^{2}$.', 'Make an even function with $f(1)=0$ and an $x^{2}$ term.'), hint: say('$a=c=0$ eta $b+d=0$.', '$a=c=0$ y $b+d=0$.', '$a=c=0$ و$b+d=0$.', '$a=c=0$ and $b+d=0$.'), isSolved: (state) => parityOf(state) === 'even' && state.b !== 0 && parityValue(state, 1) === 0 },
    { id: 75404, prompt: say('Egin jatorritik pasatzen den funtzio bat, ez bikoitia ez bakoitia.', 'Haz una función que pase por el origen y no sea ni par ni impar.', 'اصنع دالة تمر بالأصل وليست زوجية ولا فردية.', 'Make a function that passes through the origin and is neither even nor odd.'), hint: say('$d=0$, eta nahastu berretzaile bikoiti bat eta bakoiti bat.', '$d=0$, y mezcla un exponente par y uno impar.', '$d=0$، واخلط أسًّا زوجيًا وأسًّا فرديًا.', '$d=0$, and mix one even exponent and one odd exponent.'), isSolved: (state) => state.d === 0 && parityOf(state) === 'neither' }
]

export const functionsAkLabChallengeIds: number[] = [relationChallenges, tableChallenges, domainChallenges, domainsChallenges, joinChallenges, rootsChallenges, parityChallenges, explorerChallenges, rateChallenges, periodicChallenges].flatMap((list) => list.map((challenge) => challenge.id))
