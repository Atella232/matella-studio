import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { lineChallenges, slopeChallenges } from '../../dbh2-funtzioak-v2/lab/labTools.ts'
import { interceptsChallenges } from '../../dbh4-aplikatuak-funtzioak/lab/labTools.ts'
import { hyperbolaChallenges, parabolaChallenges, pointSlopeChallenges } from '../../dbh4-aplikatuak-grafikoa/lab/labTools.ts'
import { say } from '../../dbh4-akademikoak-funtzioak/text.ts'
import type { PolynomialAkStageId } from '../lessons.tsx'

/* ==========================================================================
   Funtzio polinomikoak eta arrazionalak (4. DBH akademikoak) laboratory.
   The line y = mx + n and the slope meter come from 2. DBH, the
   intercepts of x² + bx + c from the 4. DBH aplikatuak functions unit,
   and the point-slope line, the parabola a(x − p)² + q and the hyperbola
   k/(x − a) + b from 4. DBH aplikatuak Gráfica, each with its own
   challenges. The new tools: a line against the parabola y = x² − 1
   (secant, tangent or exterior); a parabola a(x − r)(x − t) built from its
   roots; |mx + n| and |x² + bx + c| folded up; and (ax + b)/(x + d) with
   its asymptotes. Pure state logic; the components live next to this
   file. Tests in tests/polinomikoak-dbh4ak-lab.test.ts.
   ========================================================================== */

export type PolynomialAkLabToolId = 'line' | 'slope' | 'point-slope' | 'parabola' | 'intercepts' | 'fit' | 'secant' | 'absolute' | 'hyperbola' | 'rational'

export interface PolynomialAkLabTool extends LabToolInfo {
    id: PolynomialAkLabToolId
    stage: PolynomialAkStageId
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const clampHalf = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value * 2) / 2))
/** Skips 0 when a value must not vanish: one step down from +step goes to −step, and back */
const nonZero = (next: number, previous: number, step = 1) => (next === 0 ? (previous > 0 ? -step : step) : next)
/** Roots of x² + bx + c, smallest first */
function monicRoots(b: number, c: number): number[] {
    const delta = b * b - 4 * c
    if (delta < 0) return []
    if (delta === 0) return [-b / 2]
    const root = Math.sqrt(delta)
    return [(-b - root) / 2, (-b + root) / 2]
}

export const polynomialAkLabTools: PolynomialAkLabTool[] = [
    { id: 'line', stage: 'lines', lessonTopic: 'line-kinds', title: say('Zuzenaren laborategia', 'El laboratorio de la recta', 'مختبر المستقيم'), observe: say('n aldatzean zuzena gora edo behera mugitzen da; m aldatzean, aldapa aldatzen da. n = 0 denean jatorritik pasatzen da, eta m = 0 denean konstantea da.', 'Al cambiar n la recta sube o baja; al cambiar m cambia la inclinación. Con n = 0 pasa por el origen y con m = 0 es constante.', 'عند تغيير n يصعد المستقيم أو يهبط، وعند تغيير m يتغير الانحدار. عندما n = 0 يمر بالأصل، وعندما m = 0 يكون ثابتًا.') },
    { id: 'slope', stage: 'lines', lessonTopic: 'slope', title: say('Maldaren neurgailua', 'El medidor de la pendiente', 'مقياس الميل'), observe: say('Mugitu A eta B: Δy zati Δx da malda. Zeinuak norabidea esaten du; Δx = 0 denean zuzena bertikala da.', 'Mueve A y B: la pendiente es Δy entre Δx. El signo dice la dirección; si Δx = 0 la recta es vertical.', 'حرّك A وB: الميل هو Δy ÷ Δx. تدل الإشارة على الاتجاه؛ وعندما Δx = 0 يكون المستقيم رأسيًا.') },
    { id: 'point-slope', stage: 'lines', lessonTopic: 'line-equation', title: say('Puntu bat eta malda bat', 'Un punto y una pendiente', 'نقطة وميل'), observe: say('Puntu batek eta malda batek zuzen bakarra ematen dute. n kalkulatzeko, ordeztu puntua: n = y₀ − m · x₀.', 'Un punto y una pendiente dan una sola recta. Para hallar n, sustituye el punto: n = y₀ − m · x₀.', 'النقطة والميل يحددان مستقيمًا واحدًا. لإيجاد n عوّض النقطة: n = y₀ − m · x₀.') },
    { id: 'parabola', stage: 'parabolas', lessonTopic: 'vertex', title: say('Parabola eta bere erpina', 'La parábola y su vértice', 'القطع المكافئ ورأسه'), observe: say('a-k forma aldatzen du (zeinua eta irekiera); p eta q aldatzean parabola osoa mugitzen da, eta erpina beti (p, q) da.', 'a cambia la forma (el signo y la abertura); al cambiar p y q se mueve la parábola entera, y el vértice es siempre (p, q).', 'يغير a الشكل (الإشارة والانفتاح)، وعند تغيير p وq يتحرك القطع كله، ويبقى الرأس دائمًا (p, q).') },
    { id: 'intercepts', stage: 'parabolas', lessonTopic: 'parabola-cuts', title: say('Parabola baten ebakidurak', 'Cortes de una parábola', 'تقاطعات قطع مكافئ'), observe: say('c-k Y ardatzeko ebakidura mugitzen du. X ardatza 0, 1 edo 2 aldiz ebaki daiteke: b² − 4c zeinuaren araberakoa da.', 'c mueve el corte con el eje Y. El eje X se puede cortar 0, 1 o 2 veces: depende del signo de b² − 4c.', 'يحرّك c التقاطع مع محور Y. ويمكن قطع محور X مرة أو مرتين أو عدم قطعه: يتوقف ذلك على إشارة ⁦b² − 4c⁩.') },
    { id: 'fit', stage: 'shifts', lessonTopic: 'parabola-from', title: say('Parabola bere erroetatik', 'Una parábola desde sus raíces', 'قطع مكافئ من جذريه'), observe: say('Erroek X ardatzeko ebakidurak finkatzen dituzte, eta erpina haien erdian dago. a-k parabola luzatu edo itzuli egiten du, erroak mugitu gabe.', 'Las raíces fijan los cortes con el eje X, y el vértice queda en medio. a estira o da la vuelta a la parábola sin mover las raíces.', 'يثبّت الجذران نقطتي التقاطع مع محور X، ويقع الرأس في منتصفهما. ويمدّ a القطع أو يقلبه دون تحريك الجذرين.') },
    { id: 'secant', stage: 'shifts', lessonTopic: 'line-parabola', title: say('Zuzena eta parabola', 'Recta y parábola', 'المستقيم والقطع المكافئ'), observe: say('Berdintzean x² − mx − (n + 1) = 0 ateratzen da. Haren Δ-k esaten du zuzena ebakitzailea (2 puntu), ukitzailea (1) ala kanpokoa (0) den.', 'Al igualar sale x² − mx − (n + 1) = 0. Su Δ dice si la recta es secante (2 puntos), tangente (1) o exterior (0).', 'بالمساواة نحصل على ⁦x² − mx − (n + 1) = 0⁩. ومميزها Δ يحدد إن كان المستقيم قاطعًا (نقطتان) أو مماسًا (نقطة) أو خارجيًا (لا شيء).') },
    { id: 'absolute', stage: 'absolute', lessonTopic: 'absolute-linear', title: say('Balio absolutua tolestea', 'Dobla el valor absoluto', 'اطوِ القيمة المطلقة'), observe: say('Marratua barrukoa da. X ardatzaren azpian dagoen zatia gora islatzen da: zuzen batean V bat geratzen da, eta parabola batean erpina gora igotzen da.', 'La discontinua es lo de dentro. La parte que queda bajo el eje X se refleja hacia arriba: en una recta queda una V, y en una parábola el vértice sube.', 'الخط المتقطع هو ما بالداخل. الجزء الواقع تحت محور X ينعكس إلى الأعلى: في المستقيم يبقى شكل V، وفي القطع المكافئ يصعد الرأس.') },
    { id: 'hyperbola', stage: 'rational', lessonTopic: 'hyperbola-shift', title: say('Hiperbola eta asintotak', 'La hipérbola y sus asíntotas', 'القطع الزائد ومقارباه'), observe: say('k-ren zeinuak adarrak zein koadrantetan dauden esaten du. a eta b aldatzean asintotak mugitzen dira: x = a eta y = b.', 'El signo de k dice en qué cuadrantes están las ramas. Al cambiar a y b se mueven las asíntotas: x = a e y = b.', 'تدل إشارة k على الربعين اللذين فيهما الفرعان. وعند تغيير a وb يتحرك المقاربان: x = a وy = b.') },
    { id: 'rational', stage: 'rational', lessonTopic: 'rational-form', title: say('(ax + b) / (x + d) funtzioa', 'La función (ax + b) / (x + d)', 'الدالة (ax + b) / (x + d)'), observe: say('Zatitzean a + k / (x + d) geratzen da, k = b − a · d izanik. Asintotak x = −d eta y = a dira. k = 0 bada, ez dago hiperbolarik: zuzen zulatu bat da.', 'Al dividir queda a + k / (x + d), con k = b − a · d. Las asíntotas son x = −d e y = a. Si k = 0 no hay hipérbola: es una recta con un agujero.', 'بالقسمة يبقى ⁦a + k / (x + d)⁩ حيث ⁦k = b − a · d⁩. والمقاربان ⁦x = −d⁩ و⁦y = a⁩. وإذا كان k = 0 فلا قطع زائد: إنه مستقيم مثقوب.') }
]

export const polynomialAkLabToolForTopic: Record<string, PolynomialAkLabToolId | undefined> = {
    'line-kinds': 'line',
    slope: 'slope',
    'line-equation': 'point-slope',
    'parabola-a': 'parabola',
    vertex: 'parabola',
    'parabola-cuts': 'intercepts',
    'vertex-form': 'parabola',
    'parabola-from': 'fit',
    'line-parabola': 'secant',
    'absolute-linear': 'absolute',
    'absolute-pieces': 'absolute',
    'absolute-quadratic': 'absolute',
    inverse: 'hyperbola',
    'hyperbola-shift': 'hyperbola',
    'rational-form': 'rational'
}

/* ---------- 1. A parabola from its roots: y = a(x − r)(x − t) ---------- */

export const FIT_ROOT_LIMIT = 5
export const FIT_A_LIMIT = 3

export interface FitState {
    a: number
    r: number
    t: number
}

export const initialFitState: FitState = { a: 1, r: -2, t: 2 }

export const setFit = (state: FitState, patch: Partial<FitState>): FitState => ({
    a: nonZero(clampHalf(patch.a ?? state.a, -FIT_A_LIMIT, FIT_A_LIMIT), state.a, 0.5),
    r: clamp(patch.r ?? state.r, -FIT_ROOT_LIMIT, FIT_ROOT_LIMIT),
    t: clamp(patch.t ?? state.t, -FIT_ROOT_LIMIT, FIT_ROOT_LIMIT)
})

export const fitValue = ({ a, r, t }: FitState, x: number) => a * (x - r) * (x - t)
/** The vertex sits halfway between the roots */
export const fitVertex = (state: FitState): [number, number] => {
    const x = (state.r + state.t) / 2
    return [x, fitValue(state, x)]
}
/** a, b and c of the expanded form ax² + bx + c */
export const fitExpanded = ({ a, r, t }: FitState) => ({ a, b: -a * (r + t), c: a * r * t })
const sameRoots = (state: FitState, one: number, two: number) => (state.r === one && state.t === two) || (state.r === two && state.t === one)

export const fitChallenges: LabChallenge<FitState>[] = [
    { id: 77201, prompt: say('Lortu erpina $(1,\\,-4)$ puntuan duen eta $(3,\\,0)$ puntutik pasatzen den parabola.', 'Consigue la parábola de vértice $(1,\\,-4)$ que pasa por $(3,\\,0)$.', 'اصنع القطع الذي رأسه $(1,\\,-4)$ ويمر بـ $(3,\\,0)$.'), hint: say('Simetria: $(3,\\,0)$ puntuaren bikia $(-1,\\,0)$ da.', 'Simetría: la pareja de $(3,\\,0)$ es $(-1,\\,0)$.', 'التماثل: نظيرة $(3,\\,0)$ هي $(-1,\\,0)$.'), isSolved: (state) => sameRoots(state, -1, 3) && state.a === 1 },
    { id: 77202, prompt: say('Lortu X ardatza $-1$ eta $3$ puntuetan ebakitzen duen eta $(0,\\,6)$ puntutik pasatzen den parabola.', 'Consigue la parábola que corta al eje X en $-1$ y $3$ y pasa por $(0,\\,6)$.', 'اصنع القطع الذي يقطع محور X عند $-1$ و$3$ ويمر بـ $(0,\\,6)$.'), hint: say('$6=a\\cdot(0+1)(0-3)$', '$6=a\\cdot(0+1)(0-3)$', '$6=a\\cdot(0+1)(0-3)$'), isSolved: (state) => sameRoots(state, -1, 3) && state.a === -2 },
    { id: 77203, prompt: say('Lortu X ardatza $2$ eta $4$ puntuetan ebakitzen duen eta maximoa $y=2$ duen parabola.', 'Consigue la parábola que corta al eje X en $2$ y $4$ y tiene el máximo en $y=2$.', 'اصنع القطع الذي يقطع محور X عند $2$ و$4$ وقيمته العظمى $y=2$.'), hint: say('Erpina $x=3$ puntuan dago: $a\\cdot(1)(-1)=2$.', 'El vértice está en $x=3$: $a\\cdot(1)(-1)=2$.', 'الرأس عند $x=3$: $a\\cdot(1)(-1)=2$.'), isSolved: (state) => sameRoots(state, 2, 4) && state.a === -2 },
    { id: 77204, prompt: say('Lortu X ardatza $x=-2$ puntuan bakarrik ukitzen duen eta $(0,\\,2)$ puntutik pasatzen den parabola.', 'Consigue la parábola que solo toca al eje X en $x=-2$ y pasa por $(0,\\,2)$.', 'اصنع القطع الذي يمس محور X عند $x=-2$ فقط ويمر بـ $(0,\\,2)$.'), hint: say('Erro bikoitza: $y=a(x+2)^{2}$, eta $4a=2$.', 'Raíz doble: $y=a(x+2)^{2}$, y $4a=2$.', 'جذر مضاعف: $y=a(x+2)^{2}$ و$4a=2$.'), isSolved: (state) => state.r === -2 && state.t === -2 && state.a === 0.5 },
    { id: 77205, prompt: say('Lortu $x=2$ eta $x=-3$ erroak dituen eta Y ardatza $-6$ puntuan ebakitzen duen parabola.', 'Consigue la parábola con raíces $x=2$ y $x=-3$ que corta al eje Y en $-6$.', 'اصنع القطع الذي جذراه $x=2$ و$x=-3$ ويقطع محور Y عند $-6$.'), hint: say('$f(0)=a\\cdot(-2)\\cdot 3=-6a$', '$f(0)=a\\cdot(-2)\\cdot 3=-6a$', '$f(0)=a\\cdot(-2)\\cdot 3=-6a$'), isSolved: (state) => sameRoots(state, 2, -3) && state.a === 1 }
]

/* ---------- 2. A line against the parabola y = x² − 1 ---------- */

export const SECANT_M_LIMIT = 4
export const SECANT_N_LIMIT = 6

export interface SecantState {
    m: number
    n: number
}

export const initialSecantState: SecantState = { m: -1, n: 3 }

export const setSecant = (state: SecantState, patch: Partial<SecantState>): SecantState => ({
    m: clamp(patch.m ?? state.m, -SECANT_M_LIMIT, SECANT_M_LIMIT),
    n: clamp(patch.n ?? state.n, -SECANT_N_LIMIT, SECANT_N_LIMIT)
})

export const parabolaAt = (x: number) => x * x - 1
/** Δ of x² − mx − (n + 1) = 0 */
export const secantDelta = ({ m, n }: SecantState) => m * m + 4 * (n + 1)
/** The x of the common points, smallest first */
export const secantXs = (state: SecantState): number[] => monicRoots(-state.m, -(state.n + 1))
export type SecantKind = 'secant' | 'tangent' | 'exterior'
export const secantKind = (state: SecantState): SecantKind => {
    const delta = secantDelta(state)
    return delta > 0 ? 'secant' : delta === 0 ? 'tangent' : 'exterior'
}

export const secantChallenges: LabChallenge<SecantState>[] = [
    { id: 77101, prompt: say('Lortu parabola $(2,\\,3)$ eta $(-1,\\,0)$ puntuetan ebakitzen duen zuzena.', 'Consigue la recta que corta a la parábola en $(2,\\,3)$ y $(-1,\\,0)$.', 'اصنع المستقيم الذي يقطع القطع في $(2,\\,3)$ و$(-1,\\,0)$.'), hint: say('Bi puntuen malda: $\\frac{3-0}{2+1}=1$.', 'La pendiente de los dos puntos: $\\frac{3-0}{2+1}=1$.', 'ميل النقطتين: $\\frac{3-0}{2+1}=1$.'), isSolved: (state) => state.m === 1 && state.n === 1 },
    { id: 77102, prompt: say('Lortu parabolaren ukitzailea den zuzen horizontala.', 'Consigue la recta horizontal tangente a la parábola.', 'اصنع المستقيم الأفقي المماس للقطع.'), hint: say('Erpinetik pasatu behar da.', 'Tiene que pasar por el vértice.', 'يجب أن يمر بالرأس.'), isSolved: (state) => state.m === 0 && secantKind(state) === 'tangent' },
    { id: 77103, prompt: say('Lortu 2 malda duen eta parabola ukitzen duen zuzena.', 'Consigue la recta de pendiente 2 tangente a la parábola.', 'اصنع المستقيم الذي ميله 2 ويمس القطع.'), hint: say('$\\Delta=4+4(n+1)=0$', '$\\Delta=4+4(n+1)=0$', '$\\Delta=4+4(n+1)=0$'), isSolved: (state) => state.m === 2 && secantKind(state) === 'tangent' },
    { id: 77104, prompt: say('Lortu 1 malda duen eta parabola ebakitzen ez duen zuzen bat.', 'Consigue una recta de pendiente 1 que no corte a la parábola.', 'اصنع مستقيمًا ميله 1 لا يقطع القطع.'), hint: say('Jaitsi zuzena $\\Delta<0$ izan arte.', 'Baja la recta hasta que $\\Delta<0$.', 'أنزل المستقيم حتى يصبح $\\Delta<0$.'), isSolved: (state) => state.m === 1 && secantKind(state) === 'exterior' },
    { id: 77105, prompt: say('Lortu parabola $x=1$ eta $x=3$ puntuetan ebakitzen duen zuzena.', 'Consigue la recta que corta a la parábola en $x=1$ y $x=3$.', 'اصنع المستقيم الذي يقطع القطع عند $x=1$ و$x=3$.'), hint: say('Puntuak: $(1,\\,0)$ eta $(3,\\,8)$.', 'Los puntos: $(1,\\,0)$ y $(3,\\,8)$.', 'النقطتان: $(1,\\,0)$ و$(3,\\,8)$.'), isSolved: (state) => state.m === 4 && state.n === -4 }
]

/* ---------- 3. Absolute values: |mx + n| and |x² + bx + c| ---------- */

export type AbsoluteKind = 'line' | 'parabola'
export const ABS_M_LIMIT = 3
export const ABS_N_LIMIT = 6
export const ABS_B_LIMIT = 6
export const ABS_C_LIMIT = 6

export interface AbsoluteState {
    kind: AbsoluteKind
    m: number
    n: number
    b: number
    c: number
}

export const initialAbsoluteState: AbsoluteState = { kind: 'line', m: 1, n: 1, b: 0, c: -1 }

export const setAbsolute = (state: AbsoluteState, patch: Partial<AbsoluteState>): AbsoluteState => ({
    kind: patch.kind ?? state.kind,
    m: nonZero(clamp(patch.m ?? state.m, -ABS_M_LIMIT, ABS_M_LIMIT), state.m),
    n: clamp(patch.n ?? state.n, -ABS_N_LIMIT, ABS_N_LIMIT),
    b: clamp(patch.b ?? state.b, -ABS_B_LIMIT, ABS_B_LIMIT),
    c: clamp(patch.c ?? state.c, -ABS_C_LIMIT, ABS_C_LIMIT)
})

/** What is inside the bars */
export const insideAt = (state: AbsoluteState, x: number) => (state.kind === 'line' ? state.m * x + state.n : x * x + state.b * x + state.c)
export const absoluteAt = (state: AbsoluteState, x: number) => Math.abs(insideAt(state, x))
/** Where the inside vanishes: the peak of the V, or the folds of the parabola */
export const absoluteZeros = (state: AbsoluteState): number[] => (state.kind === 'line' ? [-state.n / state.m] : monicRoots(state.b, state.c))
/** The vertex of the inner parabola, reflected up when it was below the axis */
export const foldedVertex = (state: AbsoluteState): [number, number] => {
    const x = -state.b / 2
    return [x, absoluteAt(state, x)]
}

export const absoluteChallenges: LabChallenge<AbsoluteState>[] = [
    { id: 77301, prompt: say('Lortu $y=|x-3|$: erpina $(3,\\,0)$ puntuan, adarren malda 1 eta $-1$.', 'Consigue $y=|x-3|$: el pico en $(3,\\,0)$ y las ramas con pendiente 1 y $-1$.', 'اصنع $y=|x-3|$: الرأس في $(3,\\,0)$ وميلا الفرعين 1 و$-1$.'), hint: say('Barrukoa $x-3$ edo $-x+3$ izan daiteke.', 'Lo de dentro puede ser $x-3$ o $-x+3$.', 'ما بالداخل قد يكون $x-3$ أو $-x+3$.'), isSolved: (state) => state.kind === 'line' && Math.abs(state.m) === 1 && -state.n / state.m === 3 },
    { id: 77302, prompt: say('Lortu erpina $x=2$ puntuan duen eta Y ardatza $(0,\\,4)$ puntuan ebakitzen duen V bat.', 'Consigue una V con el pico en $x=2$ que corte al eje Y en $(0,\\,4)$.', 'اصنع شكل V رأسه عند $x=2$ ويقطع محور Y في $(0,\\,4)$.'), hint: say('$|n|=4$ eta $-\\frac{n}{m}=2$.', '$|n|=4$ y $-\\frac{n}{m}=2$.', '$|n|=4$ و$-\\frac{n}{m}=2$.'), isSolved: (state) => state.kind === 'line' && Math.abs(state.n) === 4 && -state.n / state.m === 2 },
    { id: 77303, prompt: say('Lortu $y=|x^{2}-4|$.', 'Consigue $y=|x^{2}-4|$.', 'اصنع $y=|x^{2}-4|$.'), hint: say('$b=0$ eta $c=-4$.', '$b=0$ y $c=-4$.', '$b=0$ و$c=-4$.'), isSolved: (state) => state.kind === 'parabola' && state.b === 0 && state.c === -4 },
    { id: 77304, prompt: say('Lortu maximo erlatiboa $(1,\\,4)$ puntuan duen $y=|x^{2}+bx+c|$ bat.', 'Consigue una $y=|x^{2}+bx+c|$ con el máximo relativo en $(1,\\,4)$.', 'اصنع $y=|x^{2}+bx+c|$ قيمتها العظمى النسبية في $(1,\\,4)$.'), hint: say('Barruko erpina $(1,\\,-4)$ da: $(x-1)^{2}-4$.', 'El vértice de dentro es $(1,\\,-4)$: $(x-1)^{2}-4$.', 'الرأس الداخلي $(1,\\,-4)$: $(x-1)^{2}-4$.'), isSolved: (state) => state.kind === 'parabola' && state.b === -2 && state.c === -3 },
    { id: 77305, prompt: say('Lortu X ardatza $x=2$ puntuan bakarrik ukitzen duen $y=|x^{2}+bx+c|$ bat: ez dago ezer islatzeko.', 'Consigue una $y=|x^{2}+bx+c|$ que solo toque al eje X en $x=2$: no hay nada que reflejar.', 'اصنع $y=|x^{2}+bx+c|$ تمس محور X عند $x=2$ فقط: لا شيء يُعكس.'), hint: say('$(x-2)^{2}$ garatu.', 'Desarrolla $(x-2)^{2}$.', 'انشر $(x-2)^{2}$.'), isSolved: (state) => state.kind === 'parabola' && state.b === -4 && state.c === 4 }
]

/* ---------- 4. The function (ax + b)/(x + d) = a + k/(x + d) ---------- */

export const RATIONAL_A_LIMIT = 4
export const RATIONAL_B_LIMIT = 6
export const RATIONAL_D_LIMIT = 4

export interface RationalState {
    a: number
    b: number
    d: number
}

export const initialRationalState: RationalState = { a: 1, b: 1, d: 0 }

export const setRational = (state: RationalState, patch: Partial<RationalState>): RationalState => ({
    a: clamp(patch.a ?? state.a, -RATIONAL_A_LIMIT, RATIONAL_A_LIMIT),
    b: clamp(patch.b ?? state.b, -RATIONAL_B_LIMIT, RATIONAL_B_LIMIT),
    d: clamp(patch.d ?? state.d, -RATIONAL_D_LIMIT, RATIONAL_D_LIMIT)
})

/** The remainder of the division: (ax + b)/(x + d) = a + k/(x + d) */
export const rationalK = ({ a, b, d }: RationalState) => b - a * d
export const rationalAt = (state: RationalState, x: number): number | null => (x === -state.d ? null : (state.a * x + state.b) / (x + state.d))
/** Where it cuts the X axis: the root of the numerator, if it is in the domain */
export const rationalZero = (state: RationalState): number | null => {
    if (state.a === 0 || rationalK(state) === 0) return null
    return -state.b / state.a
}

export const rationalChallenges: LabChallenge<RationalState>[] = [
    { id: 77401, prompt: say('Lortu $x=1$ eta $y=2$ asintotak dituen hiperbola bat.', 'Consigue una hipérbola con asíntotas $x=1$ e $y=2$.', 'اصنع قطعًا زائدًا مقارباه $x=1$ و$y=2$.'), hint: say('Bertikala: $x=-d$. Horizontala: $y=a$.', 'Vertical: $x=-d$. Horizontal: $y=a$.', 'الرأسي: $x=-d$. الأفقي: $y=a$.'), isSolved: (state) => state.d === -1 && state.a === 2 && rationalK(state) !== 0 },
    { id: 77402, prompt: say('Lortu $y=\\frac{2x+1}{x-1}$.', 'Consigue $y=\\frac{2x+1}{x-1}$.', 'اصنع $y=\\frac{2x+1}{x-1}$.'), hint: say('$a=2$, $b=1$ eta $d=-1$.', '$a=2$, $b=1$ y $d=-1$.', '$a=2$ و$b=1$ و$d=-1$.'), isSolved: (state) => state.a === 2 && state.b === 1 && state.d === -1 },
    { id: 77403, prompt: say('Lortu X ardatza $x=3$ puntuan ebakitzen duen eta $x=-1$ asintota bertikala duen hiperbola bat.', 'Consigue una hipérbola que corte al eje X en $x=3$ y tenga la asíntota vertical $x=-1$.', 'اصنع قطعًا زائدًا يقطع محور X عند $x=3$ ومقاربه الرأسي $x=-1$.'), hint: say('Zenbakitzailea 0 $x=3$ puntuan: $3a+b=0$.', 'El numerador se anula en $x=3$: $3a+b=0$.', 'ينعدم البسط عند $x=3$: $3a+b=0$.'), isSolved: (state) => state.d === 1 && rationalZero(state) === 3 },
    { id: 77404, prompt: say('Lortu jatorritik pasatzen den eta $x=-2$ eta $y=1$ asintotak dituen hiperbola.', 'Consigue la hipérbola que pasa por el origen y tiene asíntotas $x=-2$ e $y=1$.', 'اصنع القطع الزائد المار بالأصل ومقارباه $x=-2$ و$y=1$.'), hint: say('Jatorritik: $b=0$.', 'Por el origen: $b=0$.', 'بالأصل: $b=0$.'), isSolved: (state) => state.a === 1 && state.b === 0 && state.d === 2 },
    { id: 77405, prompt: say('Lortu hiperbola EZ den funtzio bat: $k=0$.', 'Consigue una función que NO sea una hipérbola: $k=0$.', 'اصنع دالة ليست قطعًا زائدًا: $k=0$.'), hint: say('$b=a\\cdot d$ bada, zatiketa zehatza da.', 'Si $b=a\\cdot d$, la división es exacta.', 'إذا كان $b=a\\cdot d$ فالقسمة تامة.'), isSolved: (state) => rationalK(state) === 0 }
]

export const polynomialAkLabChallengeIds: number[] = [lineChallenges, slopeChallenges, pointSlopeChallenges, parabolaChallenges, interceptsChallenges, fitChallenges, secantChallenges, absoluteChallenges, hyperbolaChallenges, rationalChallenges].flatMap((list) => list.map((challenge) => challenge.id))
