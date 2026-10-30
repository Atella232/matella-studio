import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { exponentialChallenges } from '../../dbh4-aplikatuak-grafikoa/lab/labTools.ts'
import { ladderChallenges } from '../../dbh4-akademikoak-potentziak/lab/labTools.ts'
import { circleChallenges } from '../../dbh4-akademikoak-trigonometria/lab/labTools.ts'
import { say } from '../../dbh4-akademikoak-trigonometria/text.ts'
import type { ExponentialAkStageId } from '../lessons.tsx'

/* ==========================================================================
   Funtzio esponentzialak, logaritmikoak eta trigonometrikoak (4. DBH
   akademikoak) laboratory. The exponential y = k·aˣ comes from 4. DBH
   aplikatuak Gráfica, the ladder of logarithms from Potencias and the
   unit circle from Trigonometría, each with its own challenges. The new
   tools: y = aˣ⁻ᵖ + q with its asymptote; growth and decay k·(1 + r/100)ᵗ;
   y = log_b(x − p) + q with its domain; and the wave A·sen kx + d (or
   cos) with its range and period. Pure state logic; the components live
   next to this file. Tests in tests/esponentzialak-dbh4ak-lab.test.ts.
   ========================================================================== */

export type ExponentialAkLabToolId = 'exponential' | 'shift' | 'growth' | 'ladder' | 'log-shift' | 'circle' | 'wave'

export interface ExponentialAkLabTool extends LabToolInfo {
    id: ExponentialAkLabToolId
    stage: ExponentialAkStageId
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export const exponentialAkLabTools: ExponentialAkLabTool[] = [
    { id: 'exponential', stage: 'exponential', lessonTopic: 'exp-graph', title: say('Funtzio esponentziala', 'La función exponencial', 'الدالة الأسية', 'The exponential function'), observe: say('k Y ardatzeko ebakidura da. a > 1 bada gorakorra da eta 0 < a < 1 bada beherakorra; x unitate bat aurreratzean, y a aldiz biderkatzen da.', 'k es el corte con el eje Y. Si a > 1 es creciente y si 0 < a < 1, decreciente; al avanzar x una unidad, y se multiplica por a.', 'k هو التقاطع مع محور Y. إذا كان a > 1 فهي متزايدة، وإذا كان 0 < a < 1 فمتناقصة؛ وعندما يتقدم x وحدة تُضرب y في a.', 'k is where the curve crosses the y-axis. If a > 1 it is increasing, and if 0 < a < 1 it is decreasing; each time x goes up by one unit, y is multiplied by a.') },
    { id: 'shift', stage: 'exponential', lessonTopic: 'exp-shifts', title: say('Esponentziala mugitzen', 'Mueve la exponencial', 'حرّك الدالة الأسية', 'Move the exponential'), observe: say('p-k kurba ezkerrera edo eskuinera eramaten du eta q-k gora edo behera. (0, 1) puntua (p, 1 + q) puntura doa, eta asintota y = q zuzenera.', 'p lleva la curva a la izquierda o a la derecha y q arriba o abajo. El punto (0, 1) va a (p, 1 + q) y la asíntota a y = q.', 'ينقل p المنحنى يمينًا أو يسارًا وq أعلى أو أسفل. تنتقل النقطة (0, 1) إلى (p, 1 + q) والمقارب إلى y = q.', 'p moves the curve left or right, and q moves it up or down. The point (0, 1) moves to (p, 1 + q) and the asymptote moves to y = q.') },
    { id: 'growth', stage: 'growth', lessonTopic: 'growth', title: say('Hazkundea eta beherakuntza', 'Crecimiento y decrecimiento', 'النمو والتناقص', 'Growth and decay'), observe: say('Urrats bakoitzean ehuneko bera: balioa faktore berarekin biderkatzen da. r positiboa bada hazten da, negatiboa bada txikitzen; % −50 erdira jaistea da.', 'En cada paso, el mismo porcentaje: el valor se multiplica por el mismo factor. Con r positivo crece, con r negativo decrece; un −50 % es quedarse con la mitad.', 'في كل خطوة النسبة نفسها: تُضرب القيمة في المعامل نفسه. إذا كان r موجبًا تنمو، وإذا كان سالبًا تتناقص؛ و−50 % هو البقاء على النصف.', 'At each step, the same percentage: the value is multiplied by the same factor. With a positive r it grows; with a negative r it decreases. A −50% change means keeping half.') },
    { id: 'ladder', stage: 'logarithmic', lessonTopic: 'log-values', title: say('Logaritmoen eskailera', 'La escalera de los logaritmos', 'سُلّم اللوغاريتمات', 'The logarithm ladder'), observe: say('Maila bakoitza oinarriaren berretura bat da. Logaritmoa zenbat maila igo edo jaitsi behar diren da; 1etik behera, negatiboa.', 'Cada peldaño es una potencia de la base. El logaritmo es cuántos peldaños hay que subir o bajar; por debajo de 1, negativo.', 'كل درجة قوة للأساس. اللوغاريتم هو عدد الدرجات صعودًا أو نزولًا؛ وتحت 1 يكون سالبًا.', 'Each step is a power of the base. The logarithm is how many steps you have to go up or down; below 1, it is negative.') },
    { id: 'log-shift', stage: 'logarithmic', lessonTopic: 'log-shifts', title: say('Logaritmoa mugitzen', 'Mueve el logaritmo', 'حرّك اللوغاريتم', 'Move the logarithm'), observe: say('Barrukoak positiboa izan behar du: izate-eremua (p, +∞) da eta asintota x = p. (1, 0) puntua (p + 1, q) puntura doa. Oinarria 1 baino txikiagoa bada, beherakorra da.', 'Lo de dentro tiene que ser positivo: el dominio es (p, +∞) y la asíntota x = p. El punto (1, 0) va a (p + 1, q). Si la base es menor que 1, es decreciente.', 'يجب أن يكون ما بالداخل موجبًا: المجال (p, +∞) والمقارب x = p. تنتقل النقطة (1, 0) إلى (p + 1, q). وإذا كان الأساس أصغر من 1 فهي متناقصة.', 'What is inside must be positive: the domain is (p, +∞) and the asymptote is x = p. The point (1, 0) moves to (p + 1, q). If the base is less than 1, it is decreasing.') },
    { id: 'circle', stage: 'trigonometric', lessonTopic: 'trig-values', title: say('Zirkunferentzia goniometrikoa', 'La circunferencia goniométrica', 'الدائرة المثلثية', 'The unit circle'), observe: say('Puntuaren abzisa kosinua da eta ordenatua sinua. Koadranteak zeinuak esaten ditu; buelta bat gehitzean, puntu bera.', 'La abscisa del punto es el coseno y la ordenada el seno. El cuadrante dice los signos; al sumar una vuelta, el mismo punto.', 'الإحداثي السيني للنقطة هو جيب التمام والصادي هو الجيب. يحدد الربع الإشارات؛ وبإضافة دورة نعود إلى النقطة نفسها.', 'The x-coordinate of the point is the cosine and the y-coordinate is the sine. The quadrant tells you the signs; adding a full turn gives the same point.') },
    { id: 'wave', stage: 'transforms', lessonTopic: 'period', title: say('Uhinen laborategia', 'El laboratorio de las ondas', 'مختبر الموجات', 'The wave lab'), observe: say('A-k uhina luzatzen du (anplitudea |A|), d-k gora edo behera eramaten du, eta k-k estutzen du: periodoa 2π / k. Ibiltartea [d − |A|, d + |A|] da.', 'A estira la onda (amplitud |A|), d la sube o la baja y k la aprieta: el periodo es 2π / k. El recorrido es [d − |A|, d + |A|].', 'يمدّ A الموجة (السعة |A|)، ويرفعها d أو ينزلها، ويضغطها k: الدور 2π / k. والمدى [d − |A|, d + |A|].', 'A stretches the wave (amplitude |A|), d moves it up or down and k squeezes it: the period is 2π / k. The range is [d − |A|, d + |A|].') }
]

export const exponentialAkLabToolForTopic: Record<string, ExponentialAkLabToolId | undefined> = {
    'exp-graph': 'exponential',
    'exp-values': 'exponential',
    'exp-shifts': 'shift',
    growth: 'growth',
    decay: 'growth',
    'exp-equations': 'ladder',
    'log-values': 'ladder',
    'log-graph': 'log-shift',
    'log-shifts': 'log-shift',
    'trig-values': 'circle',
    sine: 'wave',
    cosine: 'wave',
    amplitude: 'wave',
    period: 'wave',
    tangent: 'wave'
}

/* ---------- 1. y = a^(x − p) + q ---------- */

/** The bases offered: 2, 3 and 1/2 */
export const SHIFT_BASES = [2, 3, 0.5] as const
export const SHIFT_P_LIMIT = 3
export const SHIFT_Q_LIMIT = 4

export interface ShiftState {
    /** Index into SHIFT_BASES */
    base: number
    p: number
    q: number
}

export const initialShiftState: ShiftState = { base: 0, p: 0, q: 0 }

export const setShift = (state: ShiftState, patch: Partial<ShiftState>): ShiftState => ({
    base: clamp(patch.base ?? state.base, 0, SHIFT_BASES.length - 1),
    p: clamp(patch.p ?? state.p, -SHIFT_P_LIMIT, SHIFT_P_LIMIT),
    q: clamp(patch.q ?? state.q, -SHIFT_Q_LIMIT, SHIFT_Q_LIMIT)
})

export const shiftAt = (state: ShiftState, x: number) => SHIFT_BASES[state.base] ** (x - state.p) + state.q
/** Where y = 0, if the curve goes below the axis */
export const shiftZero = (state: ShiftState): number | null => (state.q >= 0 ? null : state.p + Math.log(-state.q) / Math.log(SHIFT_BASES[state.base]))

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9

export const shiftChallenges: LabChallenge<ShiftState>[] = [
    { id: 79101, prompt: say('Lortu $y=2^{x-3}$.', 'Consigue $y=2^{x-3}$.', 'اصنع $y=2^{x-3}$.', 'Make $y=2^{x-3}$.'), hint: say('3 eskuinera, ez gora.', '3 a la derecha, nada hacia arriba.', '3 إلى اليمين ولا شيء إلى الأعلى.', '3 to the right, no move up.'), isSolved: (state) => state.base === 0 && state.p === 3 && state.q === 0 },
    { id: 79102, prompt: say('Lortu beherakorra den eta $y=2$ asintota duen esponentzial bat.', 'Consigue una exponencial decreciente con asíntota $y=2$.', 'اصنع دالة أسية متناقصة مقاربها $y=2$.', 'Make a decreasing exponential with asymptote $y=2$.'), hint: say('Oinarria 1 baino txikiagoa.', 'La base, menor que 1.', 'الأساس أصغر من 1.', 'The base: less than 1.'), isSolved: (state) => state.base === 2 && state.q === 2 },
    { id: 79103, prompt: say('Lortu $2$ oinarriko esponentzial bat, $y=1$ asintota duena eta $(1,\\,3)$ puntutik pasatzen dena.', 'Consigue una exponencial de base $2$ con asíntota $y=1$ que pase por $(1,\\,3)$.', 'اصنع دالة أسية أساسها $2$ ومقاربها $y=1$ وتمر بـ $(1,\\,3)$.', 'Make an exponential with base $2$ and asymptote $y=1$ that passes through $(1,\\,3)$.'), hint: say('$2^{1-p}+1=3$', '$2^{1-p}+1=3$', '$2^{1-p}+1=3$', '$2^{1-p}+1=3$'), isSolved: (state) => state.base === 0 && state.q === 1 && close(shiftAt(state, 1), 3) },
    { id: 79104, prompt: say('Lortu X ardatza $x=2$ puntuan ebakitzen duen $y=2^{x-p}-4$.', 'Consigue una $y=2^{x-p}-4$ que corte al eje X en $x=2$.', 'اصنع $y=2^{x-p}-4$ تقطع محور X عند $x=2$.', 'Make $y=2^{x-p}-4$ cross the x-axis at $x=2$.'), hint: say('$2^{2-p}=4$', '$2^{2-p}=4$', '$2^{2-p}=4$', '$2^{2-p}=4$'), isSolved: (state) => state.base === 0 && state.q === -4 && close(shiftAt(state, 2), 0) },
    { id: 79105, prompt: say('Lortu jatorritik pasatzen den $y=3^{x+1}-3$.', 'Consigue $y=3^{x+1}-3$, que pasa por el origen.', 'اصنع $y=3^{x+1}-3$ المارة بالأصل.', 'Make $y=3^{x+1}-3$, which passes through the origin.'), hint: say('$x+1=x-(-1)$', '$x+1=x-(-1)$', '$x+1=x-(-1)$', '$x+1=x-(-1)$'), isSolved: (state) => state.base === 1 && state.p === -1 && state.q === -3 }
]

/* ---------- 2. Growth and decay k · (1 + r/100)ᵗ ---------- */

export const GROWTH_STARTS = [100, 200, 500, 1000, 2000] as const
export const GROWTH_RATE = { min: -50, max: 200, step: 5 } as const
export const GROWTH_T_MAX = 10

export interface GrowthState {
    /** Index into GROWTH_STARTS */
    k: number
    /** Percentage per step */
    r: number
    t: number
}

export const initialGrowthState: GrowthState = { k: 3, r: 0, t: 0 }

export const setGrowth = (state: GrowthState, patch: Partial<GrowthState>): GrowthState => ({
    k: clamp(patch.k ?? state.k, 0, GROWTH_STARTS.length - 1),
    r: Math.min(GROWTH_RATE.max, Math.max(GROWTH_RATE.min, Math.round((patch.r ?? state.r) / GROWTH_RATE.step) * GROWTH_RATE.step)),
    t: clamp(patch.t ?? state.t, 0, GROWTH_T_MAX)
})

/** The factor 1 + r/100, kept exact as a ratio of whole numbers */
export const growthFactor = (state: GrowthState) => (100 + state.r) / 100
/** The value after t steps, rounded to hundredths */
export const growthValue = (state: GrowthState, t = state.t) => Math.round(GROWTH_STARTS[state.k] * growthFactor(state) ** t * 100) / 100

export const growthChallenges: LabChallenge<GrowthState>[] = [
    { id: 79201, prompt: say('1 000 € % 10ean: zenbat 2 urtean? Erakutsi $t=2$.', '1 000 € al 10 %: ¿cuánto en 2 años? Muéstralo en $t=2$.', '1000 € بنسبة 10 %: كم بعد سنتين؟ اعرضه عند $t=2$.', '€1,000 at 10%: how much after 2 years? Show it at $t=2$.'), hint: say('$1\\,000\\cdot 1{,}1^{2}$', '$1\\,000\\cdot 1{,}1^{2}$', '$1\\,000\\cdot 1{,}1^{2}$', '$1\\,000\\cdot 1{,}1^{2}$'), isSolved: (state) => GROWTH_STARTS[state.k] === 1000 && state.r === 10 && state.t === 2 },
    { id: 79202, prompt: say('500 bakterio, urrats bakoitzean bikoizten: zenbat urratsetan iristen dira 4 000ra?', '500 bacterias que se duplican en cada paso: ¿en cuántos pasos llegan a 4 000?', '500 بكتيريا تتضاعف في كل خطوة: في كم خطوة تبلغ 4000؟', '500 bacteria that double at each step: in how many steps do they reach 4,000?'), hint: say('Bikoiztea % 100 igotzea da.', 'Duplicar es subir un 100 %.', 'المضاعفة زيادة 100 %.', 'Doubling is a 100% increase.'), isSolved: (state) => GROWTH_STARTS[state.k] === 500 && state.r === 100 && growthValue(state) === 4000 },
    { id: 79203, prompt: say('2 000 g-tik 250 g-ra jaitsi, urrats bakoitzean erdia galduta.', 'Baja de 2 000 g a 250 g perdiendo la mitad en cada paso.', 'انزل من 2000 غ إلى 250 غ بفقدان النصف في كل خطوة.', 'It falls from 2,000 g to 250 g, losing half at each step.'), hint: say('Erdia galtzea % −50 da.', 'Perder la mitad es un −50 %.', 'فقدان النصف هو −50 %.', 'Losing half is a −50% change.'), isSolved: (state) => GROWTH_STARTS[state.k] === 2000 && state.r === -50 && growthValue(state) === 250 },
    { id: 79204, prompt: say('2 000 €-tik 1 620 €-ra 2 urtean, urtero ehuneko bera jaitsita.', 'De 2 000 € a 1 620 € en 2 años, bajando cada año el mismo porcentaje.', 'من 2000 € إلى 1620 € في سنتين، بنقص النسبة نفسها كل سنة.', 'From €2,000 to €1,620 in 2 years, going down by the same percentage each year.'), hint: say('$\\frac{1\\,620}{2\\,000}=0{,}81=0{,}9^{2}$', '$\\frac{1\\,620}{2\\,000}=0{,}81=0{,}9^{2}$', '$\\frac{1\\,620}{2\\,000}=0{,}81=0{,}9^{2}$', '$\\frac{1\\,620}{2\\,000}=0{,}81=0{,}9^{2}$'), isSolved: (state) => GROWTH_STARTS[state.k] === 2000 && state.r === -10 && state.t === 2 },
    { id: 79205, prompt: say('200tik abiatuta, orduro hirukoiztuz: erakutsi 5 400.', 'Desde 200, triplicándose cada hora: muestra 5 400.', 'ابدأ من 200 مع التضاعف ثلاث مرات كل ساعة: اعرض 5400.', 'Starting from 200, tripling every hour: show 5,400.'), hint: say('Hirukoiztea % 200 igotzea da.', 'Triplicar es subir un 200 %.', 'التضاعف ثلاث مرات زيادة 200 %.', 'Tripling is a 200% increase.'), isSolved: (state) => GROWTH_STARTS[state.k] === 200 && state.r === 200 && growthValue(state) === 5400 }
]

/* ---------- 3. y = log_b(x − p) + q ---------- */

/** The bases offered: 2, 3, 10 and 1/2 */
export const LOG_BASES = [2, 3, 10, 0.5] as const
export const LOG_P_LIMIT = 4
export const LOG_Q_LIMIT = 3

export interface LogShiftState {
    /** Index into LOG_BASES */
    base: number
    p: number
    q: number
}

export const initialLogShiftState: LogShiftState = { base: 0, p: 0, q: 0 }

export const setLogShift = (state: LogShiftState, patch: Partial<LogShiftState>): LogShiftState => ({
    base: clamp(patch.base ?? state.base, 0, LOG_BASES.length - 1),
    p: clamp(patch.p ?? state.p, -LOG_P_LIMIT, LOG_P_LIMIT),
    q: clamp(patch.q ?? state.q, -LOG_Q_LIMIT, LOG_Q_LIMIT)
})

export const logShiftAt = (state: LogShiftState, x: number): number | null => (x <= state.p ? null : Math.log(x - state.p) / Math.log(LOG_BASES[state.base]) + state.q)
/** Where it cuts the X axis: log_b(x − p) = −q */
export const logShiftZero = (state: LogShiftState) => state.p + LOG_BASES[state.base] ** -state.q

export const logShiftChallenges: LabChallenge<LogShiftState>[] = [
    { id: 79301, prompt: say('Lortu $y=\\log_2(x+2)$.', 'Consigue $y=\\log_2(x+2)$.', 'اصنع $y=\\log_2(x+2)$.', 'Make $y=\\log_2(x+2)$.'), hint: say('2 ezkerrera.', '2 a la izquierda.', 'وحدتان إلى اليسار.', '2 to the left.'), isSolved: (state) => state.base === 0 && state.p === -2 && state.q === 0 },
    { id: 79302, prompt: say('Lortu $(1,\\,+\\infty)$ izate-eremua duen eta $(2,\\,3)$ puntutik pasatzen den logaritmo bat.', 'Consigue un logaritmo con dominio $(1,\\,+\\infty)$ que pase por $(2,\\,3)$.', 'اصنع لوغاريتمًا مجاله $(1,\\,+\\infty)$ ويمر بـ $(2,\\,3)$.', 'Make a logarithm with domain $(1,\\,+\\infty)$ that passes through $(2,\\,3)$.'), hint: say('$x=2$ denean barrukoa 1 da, eta $\\log 1=0$.', 'Con $x=2$ lo de dentro vale 1, y $\\log 1=0$.', 'عندما $x=2$ يساوي ما بالداخل 1، و$\\log 1=0$.', 'When $x=2$, what is inside is 1, and $\\log 1=0$.'), isSolved: (state) => state.p === 1 && state.q === 3 },
    { id: 79303, prompt: say('Lortu $(1,\\,0)$ puntutik pasatzen den logaritmo beherakor bat.', 'Consigue un logaritmo decreciente que pase por $(1,\\,0)$.', 'اصنع لوغاريتمًا متناقصًا يمر بـ $(1,\\,0)$.', 'Make a decreasing logarithm that passes through $(1,\\,0)$.'), hint: say('Oinarria 1 baino txikiagoa, mugitu gabe.', 'La base, menor que 1, sin moverlo.', 'الأساس أصغر من 1، دون نقل.', 'The base: less than 1, without moving it.'), isSolved: (state) => state.base === 3 && state.p === 0 && state.q === 0 },
    { id: 79304, prompt: say('Lortu $y=\\log x+3$.', 'Consigue $y=\\log x+3$.', 'اصنع $y=\\log x+3$.', 'Make $y=\\log x+3$.'), hint: say('Logaritmo hamartarra: 10 oinarria.', 'Logaritmo decimal: base 10.', 'اللوغاريتم العشري: الأساس 10.', 'Decimal logarithm: base 10.'), isSolved: (state) => state.base === 2 && state.p === 0 && state.q === 3 },
    { id: 79305, prompt: say('Lortu $3$ oinarriko logaritmo bat, $x=-3$ asintota duena eta $(0,\\,2)$ puntutik pasatzen dena.', 'Consigue un logaritmo de base $3$ con asíntota $x=-3$ que pase por $(0,\\,2)$.', 'اصنع لوغاريتمًا أساسه $3$ ومقاربه $x=-3$ ويمر بـ $(0,\\,2)$.', 'Make a logarithm with base $3$ and asymptote $x=-3$ that passes through $(0,\\,2)$.'), hint: say('$\\log_3 3=1$', '$\\log_3 3=1$', '$\\log_3 3=1$', '$\\log_3 3=1$'), isSolved: (state) => state.base === 1 && state.p === -3 && state.q === 1 }
]

/* ---------- 4. The wave A · sen kx + d ---------- */

export type WaveFunction = 'sin' | 'cos'
/** The k offered: 1/2, 1, 2 and 3 */
export const WAVE_KS = [0.5, 1, 2, 3] as const
export const WAVE_A_LIMIT = 3
export const WAVE_D_LIMIT = 3

export interface WaveState {
    fn: WaveFunction
    a: number
    /** Index into WAVE_KS */
    k: number
    d: number
}

export const initialWaveState: WaveState = { fn: 'sin', a: 1, k: 1, d: 0 }

export function setWave(state: WaveState, patch: Partial<WaveState>): WaveState {
    let a = clamp(patch.a ?? state.a, -WAVE_A_LIMIT, WAVE_A_LIMIT)
    // A never vanishes: one step down from 1 is −1, and back
    if (a === 0) a = state.a > 0 ? -1 : 1
    return { fn: patch.fn ?? state.fn, a, k: clamp(patch.k ?? state.k, 0, WAVE_KS.length - 1), d: clamp(patch.d ?? state.d, -WAVE_D_LIMIT, WAVE_D_LIMIT) }
}

export const waveAt = (state: WaveState, x: number) => state.a * (state.fn === 'sin' ? Math.sin : Math.cos)(WAVE_KS[state.k] * x) + state.d
/** The period as a multiple of π: 2/k */
export const wavePeriodPi = (state: WaveState) => 2 / WAVE_KS[state.k]
export const waveRange = (state: WaveState): [number, number] => [state.d - Math.abs(state.a), state.d + Math.abs(state.a)]

export const waveChallenges: LabChallenge<WaveState>[] = [
    { id: 79401, prompt: say('Lortu $[0,\\,2]$ ibiltartea duen uhin bat.', 'Consigue una onda con recorrido $[0,\\,2]$.', 'اصنع موجة مداها $[0,\\,2]$.', 'Make a wave with range $[0,\\,2]$.'), hint: say('Erdiko maila 1 eta anplitudea 1.', 'Nivel medio 1 y amplitud 1.', 'المستوى الأوسط 1 والسعة 1.', 'Midline 1 and amplitude 1.'), isSolved: (state) => waveRange(state).join() === '0,2' },
    { id: 79402, prompt: say('Lortu $\\pi$ periodoa eta 3 anplitudea dituen uhin bat.', 'Consigue una onda de periodo $\\pi$ y amplitud 3.', 'اصنع موجة دورها $\\pi$ وسعتها 3.', 'Make a wave with period $\\pi$ and amplitude 3.'), hint: say('$\\frac{2\\pi}{k}=\\pi$', '$\\frac{2\\pi}{k}=\\pi$', '$\\frac{2\\pi}{k}=\\pi$', '$\\frac{2\\pi}{k}=\\pi$'), isSolved: (state) => wavePeriodPi(state) === 1 && Math.abs(state.a) === 3 },
    { id: 79403, prompt: say('Lortu 5 maximoa eta 1 minimoa dituen uhin bat.', 'Consigue una onda con máximo 5 y mínimo 1.', 'اصنع موجة عظماها 5 وصغراها 1.', 'Make a wave with maximum 5 and minimum 1.'), hint: say('$d=\\frac{5+1}{2}$ eta $|A|=\\frac{5-1}{2}$.', '$d=\\frac{5+1}{2}$ y $|A|=\\frac{5-1}{2}$.', '$d=\\frac{5+1}{2}$ و$|A|=\\frac{5-1}{2}$.', '$d=\\frac{5+1}{2}$ and $|A|=\\frac{5-1}{2}$.'), isSolved: (state) => waveRange(state).join() === '1,5' },
    { id: 79404, prompt: say('Lortu $4\\pi$ periodoa duen uhin bat.', 'Consigue una onda de periodo $4\\pi$.', 'اصنع موجة دورها $4\\pi$.', 'Make a wave with period $4\\pi$.'), hint: say('Motelago: $k<1$.', 'Más despacio: $k<1$.', 'أبطأ: $k<1$.', 'Slower: $k<1$.'), isSolved: (state) => wavePeriodPi(state) === 4 },
    { id: 79405, prompt: say('Lortu $y=-\\cos x$: kosinua buruz behera.', 'Consigue $y=-\\cos x$: el coseno boca abajo.', 'اصنع $y=-\\cos x$: جيب التمام مقلوبًا.', 'Make $y=-\\cos x$: the cosine upside down.'), hint: say('$A=-1$', '$A=-1$', '$A=-1$', '$A=-1$'), isSolved: (state) => state.fn === 'cos' && state.a === -1 && WAVE_KS[state.k] === 1 && state.d === 0 }
]

export const exponentialAkLabChallengeIds: number[] = [exponentialChallenges, shiftChallenges, growthChallenges, ladderChallenges, logShiftChallenges, circleChallenges, waveChallenges].flatMap((list) => list.map((challenge) => challenge.id))
