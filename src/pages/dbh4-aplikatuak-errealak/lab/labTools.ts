import { equals, fraction, power, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { RealsStageId } from '../lessons.tsx'
import { contains, decimalKind, expand, generatrix, interval, roundDecimal, simplifySqrt, truncateDecimal, type DecimalExpansion, type Interval } from '../reals.ts'

/* ==========================================================================
   Zenbaki errealak (4. DBH, aplikatuak) laboratory: the ladder of powers,
   from a fraction to its decimal, the generating fraction, zooming in on the
   real line, intervals, truncating and rounding, scientific notation and
   simplifying radicals. Pure state logic and challenges; the components live
   next to this file. Tests in tests/errealak-dbh4ap-lab.test.ts.
   ========================================================================== */

export type RealsLabToolId = 'powers' | 'decimals' | 'generatrix' | 'zoom' | 'intervals' | 'rounding' | 'scientific' | 'radicals'

export interface RealsLabTool extends LabToolInfo {
    id: RealsLabToolId
    stage: RealsStageId
}

const say = (eu: string, es: string, ar: string) => ({ eu, es, ar })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export const realsLabTools: RealsLabTool[] = [
    { id: 'powers', stage: 'rational', lessonTopic: 'powers', title: say('Berreturen eskailera', 'La escalera de potencias', 'سُلّم القوى'), observe: say('Jaitsi berretzailea: maila bakoitzean oinarriaz zatitzen da. Horregatik da 1 berretzaile 0 eta alderantzizkoa berretzaile negatiboa.', 'Baja el exponente: en cada escalón se divide entre la base. Por eso el exponente 0 da 1 y el negativo, el inverso.', 'أنزل الأس: في كل درجة نقسم على الأساس. لذلك يعطي الأس 0 العدد 1 ويعطي الأس السالب المقلوب.') },
    { id: 'decimals', stage: 'decimals', lessonTopic: 'decimal-kinds', title: say('Zatikitik hamartarrera', 'De fracción a decimal', 'من الكسر إلى العشري'), observe: say('Begiratu hondarrei: 0 bada, zatiketa amaitzen da; bat errepikatzen bada, zifrak ere errepikatzen dira. Izendatzailearen faktoreek aurretik esaten dute zer gertatuko den.', 'Mira los restos: si llega un 0, la división termina; si uno se repite, las cifras también. Los factores del denominador anuncian qué pasará.', 'راقب البواقي: إذا ظهر 0 انتهت القسمة؛ وإذا تكرر باقٍ تكررت الأرقام. وعوامل المقام تخبر مسبقًا بما سيحدث.') },
    { id: 'generatrix', stage: 'decimals', lessonTopic: 'periodic-to-fraction', title: say('Zatiki sortzailearen makina', 'La máquina de la fracción generatriz', 'آلة الكسر المولّد'), observe: say('Aldatu periodoa eta aurreperiodoa: periodoko zifra bakoitzak 9 bat gehitzen dio izendatzaileari, eta aurreperiodoko bakoitzak 0 bat.', 'Cambia el periodo y el anteperiodo: cada cifra del periodo añade un 9 al denominador y cada cifra del anteperiodo, un 0.', 'غيّر الدور وما قبله: كل رقم في الدور يضيف 9 إلى المقام وكل رقم قبله يضيف 0.') },
    { id: 'zoom', stage: 'reals', lessonTopic: 'real-line', title: say('Zuzen errealean zoom', 'Zoom en la recta real', 'التكبير على المستقيم الحقيقي'), observe: say('Sakatu zenbakia dagoen zatia: tartea 10 aldiz txikiagoa bihurtzen da eta hamartar berri bat agertzen da. Irrazional batek ez du inoiz amaitzen.', 'Pulsa el tramo donde está el número: el intervalo se hace 10 veces más pequeño y aparece un decimal nuevo. Un irracional no se acaba nunca.', 'اضغط الجزء الذي فيه العدد: تصبح الفترة أصغر 10 مرات ويظهر رقم عشري جديد. والعدد غير النسبي لا ينتهي أبدًا.') },
    { id: 'intervals', stage: 'reals', lessonTopic: 'intervals', title: say('Tarteen eraikitzailea', 'El constructor de intervalos', 'باني الفترات'), observe: say('Aldatu muturrak eta aukeratu barne ala kanpo dauden. Mugitu x zenbakia eta ikusi noiz dagoen tartearen barruan.', 'Cambia los extremos y elige si están incluidos o no. Mueve el número x y mira cuándo está dentro del intervalo.', 'غيّر الطرفين واختر هل هما داخلان أم لا. حرّك العدد x وانظر متى يكون داخل الفترة.') },
    { id: 'rounding', stage: 'approx', lessonTopic: 'rounding', title: say('Trunkatu ala biribildu', '¿Truncar o redondear?', 'البتر أم التقريب؟'), observe: say('Aldatu hamartar kopurua: konparatu bi hurbilketak eta haien erroreak. Biribiltzearen errorea ez da inoiz trunkatzearena baino handiagoa.', 'Cambia el número de decimales: compara las dos aproximaciones y sus errores. El error del redondeo nunca es mayor que el del truncamiento.', 'غيّر عدد المنازل العشرية: قارن التقريبين وخطأيهما. خطأ التقريب لا يزيد أبدًا على خطأ البتر.') },
    { id: 'scientific', stage: 'approx', lessonTopic: 'scientific', title: say('Komaren jauziak', 'Los saltos de la coma', 'قفزات الفاصلة'), observe: say('Aldatu berretzailea: koma mugitzen da. Idazkera zientifikoa lortzen da komaren aurretik zero ez den zifra bakarra geratzen denean.', 'Cambia el exponente: la coma se desplaza. Se llega a la notación científica cuando queda una sola cifra, distinta de cero, delante de la coma.', 'غيّر الأس: تتحرك الفاصلة. ونصل إلى الترميز العلمي عندما يبقى رقم واحد غير الصفر قبل الفاصلة.') },
    { id: 'radicals', stage: 'radicals', lessonTopic: 'radical-simplify', title: say('Erroaren barruko bikoteak', 'Las parejas dentro de la raíz', 'الأزواج داخل الجذر'), observe: say('Aldatu errokizuna: faktore lehenak bikoteka biltzen dira, eta bikote bakoitza errotik ateratzen da. Bikoterik gabe geratzen direnak barruan geratzen dira.', 'Cambia el radicando: los factores primos se juntan por parejas y cada pareja sale de la raíz. Los que quedan sin pareja se quedan dentro.', 'غيّر ما تحت الجذر: تُجمع العوامل الأولية أزواجًا ويخرج كل زوج من الجذر. وما بقي بلا زوج يبقى داخله.') }
]

export const realsLabToolForTopic: Record<string, RealsLabToolId | undefined> = {
    'fraction-amount': 'powers',
    'fraction-ops': 'powers',
    powers: 'powers',
    'decimal-kinds': 'decimals',
    'exact-to-fraction': 'generatrix',
    'periodic-to-fraction': 'generatrix',
    irrational: 'zoom',
    'number-sets': 'zoom',
    'real-line': 'zoom',
    intervals: 'intervals',
    rounding: 'rounding',
    errors: 'rounding',
    scientific: 'scientific',
    'scientific-ops': 'scientific',
    roots: 'radicals',
    'radical-simplify': 'radicals',
    'radical-ops': 'radicals'
}

/* ---------- The ladder of powers ---------- */

export const powerBases: Array<{ value: FractionValue; label: string; latex: string }> = [
    { value: fraction(2), label: '2', latex: '2' },
    { value: fraction(3), label: '3', latex: '3' },
    { value: fraction(10), label: '10', latex: '10' },
    { value: fraction(-2), label: '−2', latex: '(-2)' },
    { value: fraction(1, 2), label: '1/2', latex: '\\left(\\frac{1}{2}\\right)' },
    { value: fraction(2, 3), label: '2/3', latex: '\\left(\\frac{2}{3}\\right)' }
]

export const POWER_LIMITS = { min: -4, max: 5 } as const

export interface PowersState {
    base: number
    exponent: number
    /** Exponents visited with each base */
    seen: Record<number, number[]>
}

export const initialPowersState: PowersState = { base: 0, exponent: 3, seen: { 0: [3] } }

function visit(state: PowersState): PowersState {
    const seen = state.seen[state.base] ?? []
    return seen.includes(state.exponent) ? state : { ...state, seen: { ...state.seen, [state.base]: [...seen, state.exponent] } }
}

export const setPowerBase = (state: PowersState, base: number) => visit({ ...state, base: clamp(base, 0, powerBases.length - 1) })
export const setPowerExponent = (state: PowersState, exponent: number) => visit({ ...state, exponent: clamp(exponent, POWER_LIMITS.min, POWER_LIMITS.max) })
export const powerValue = (state: Pick<PowersState, 'base' | 'exponent'>) => power(powerBases[state.base].value, state.exponent)

export const powersChallenges: LabChallenge<PowersState>[] = [
    { id: 40101, prompt: say('2 oinarriarekin, jaitsi berretzailea 3tik −3ra, mailaz maila.', 'Con base 2, baja el exponente de 3 a −3, escalón a escalón.', 'بالأساس 2 أنزل الأس من 3 إلى −3 درجة درجة.'), hint: say('Sakatu − behin eta berriz: 8, 4, 2, 1, 1/2…', 'Pulsa − una y otra vez: 8, 4, 2, 1, 1/2…', 'اضغط − مرة بعد مرة: 8، 4، 2، 1، 1/2…'), isSolved: (state) => [3, 2, 1, 0, -1, -2, -3].every((exponent) => (state.seen[0] ?? []).includes(exponent)) },
    { id: 40102, prompt: say('Lortu $\\frac{9}{4}$ zatiki baten berretzaile negatiboarekin.', 'Consigue $\\frac{9}{4}$ con una fracción y un exponente negativo.', 'احصل على $\\frac{9}{4}$ بكسر وأس سالب.'), hint: say('$\\frac{9}{4}=\\left(\\frac{3}{2}\\right)^{2}$; zein zatiki da $\\frac{3}{2}$-ren alderantzizkoa?', '$\\frac{9}{4}=\\left(\\frac{3}{2}\\right)^{2}$; ¿qué fracción es la inversa de $\\frac{3}{2}$?', '$\\frac{9}{4}=\\left(\\frac{3}{2}\\right)^{2}$؛ ما الكسر المقلوب لـ $\\frac{3}{2}$؟'), isSolved: (state) => state.exponent < 0 && equals(powerValue(state), fraction(9, 4)) },
    { id: 40103, prompt: say('Lortu emaitza negatibo bat.', 'Consigue un resultado negativo.', 'احصل على نتيجة سالبة.'), hint: say('Oinarri negatiboa eta berretzaile bakoitia.', 'Base negativa y exponente impar.', 'أساس سالب وأس فردي.'), isSolved: (state) => powerValue(state).numerator < 0 },
    { id: 40104, prompt: say('Lortu $0{,}001$ 10 oinarriarekin.', 'Consigue $0{,}001$ con base 10.', 'احصل على $0.001$ بالأساس 10.'), hint: say('$0{,}001=\\frac{1}{1000}=10^{?}$', '$0{,}001=\\frac{1}{1000}=10^{?}$', '$0.001=\\frac{1}{1000}=10^{?}$'), isSolved: (state) => state.base === 2 && state.exponent === -3 }
]

/* ---------- From a fraction to its decimal ---------- */

export const DECIMAL_LIMITS = { numerator: { min: 1, max: 99 }, denominator: { min: 2, max: 40 } } as const

export interface DecimalsState {
    numerator: number
    denominator: number
}

export const initialDecimalsState: DecimalsState = { numerator: 11, denominator: 6 }

export const setDecimals = (state: DecimalsState, patch: Partial<DecimalsState>): DecimalsState => ({
    numerator: clamp(patch.numerator ?? state.numerator, DECIMAL_LIMITS.numerator.min, DECIMAL_LIMITS.numerator.max),
    denominator: clamp(patch.denominator ?? state.denominator, DECIMAL_LIMITS.denominator.min, DECIMAL_LIMITS.denominator.max)
})

export const decimalsExpansion = (state: DecimalsState) => expand(fraction(state.numerator, state.denominator))

export const decimalsChallenges: LabChallenge<DecimalsState>[] = [
    { id: 40201, prompt: say('Lortu hamartar periodiko huts bat.', 'Consigue un decimal periódico puro.', 'احصل على عدد عشري دوري بحت.'), hint: say('Izendatzailean ez 2, ez 5: 3, 7, 9, 11…', 'En el denominador, ni 2 ni 5: 3, 7, 9, 11…', 'في المقام لا 2 ولا 5: 3، 7، 9، 11…'), isSolved: (state) => decimalKind(decimalsExpansion(state)) === 'pure' },
    { id: 40202, prompt: say('Lortu hiru hamartar dituen hamartar zehatz bat.', 'Consigue un decimal exacto con tres decimales.', 'احصل على عدد عشري منتهٍ بثلاث منازل.'), hint: say('Probatu 8 edo 40 izendatzailearekin.', 'Prueba con denominador 8 o 40.', 'جرّب المقام 8 أو 40.'), isSolved: (state) => { const expansion = decimalsExpansion(state); return expansion.period === '' && expansion.preperiod.length === 3 } },
    { id: 40203, prompt: say('Lortu $0{,}8\\overline{3}$.', 'Consigue $0{,}8\\overline{3}$.', 'احصل على $0.8\\overline{3}$.'), hint: say('$0{,}8\\overline{3}=\\frac{75}{90}$: sinplifikatu.', '$0{,}8\\overline{3}=\\frac{75}{90}$: simplifica.', '$0.8\\overline{3}=\\frac{75}{90}$: بسّط.'), isSolved: (state) => { const expansion = decimalsExpansion(state); return expansion.integer === '0' && expansion.preperiod === '8' && expansion.period === '3' } },
    { id: 40204, prompt: say('Aurkitu 6 zifrako periodoa duen zatiki bat.', 'Encuentra una fracción cuyo periodo tenga 6 cifras.', 'جد كسرًا دوره من 6 أرقام.'), hint: say('Probatu 7 izendatzailearekin.', 'Prueba con denominador 7.', 'جرّب المقام 7.'), isSolved: (state) => decimalsExpansion(state).period.length === 6 },
    { id: 40205, prompt: say('Lortu periodiko misto bat 25 baino handiagoa den izendatzailearekin.', 'Consigue un periódico mixto con un denominador mayor que 25.', 'احصل على دوري مختلط بمقام أكبر من 25.'), hint: say('Izendatzaileak 2 edo 5 eta beste faktore bat: 28, 30, 36…', 'El denominador necesita un 2 o un 5 y otro factor: 28, 30, 36…', 'يحتاج المقام إلى 2 أو 5 وعامل آخر: 28، 30، 36…'), isSolved: (state) => fraction(state.numerator, state.denominator).denominator > 25 && decimalKind(decimalsExpansion(state)) === 'mixed' }
]

/* ---------- The generating fraction ---------- */

export interface GeneratrixState {
    integer: number
    preLength: 0 | 1 | 2
    pre: number
    periodLength: 1 | 2
    period: number
}

export const initialGeneratrixState: GeneratrixState = { integer: 1, preLength: 1, pre: 8, periodLength: 1, period: 3 }

const digitsMax = (length: number) => 10 ** length - 1

export function setGeneratrix(state: GeneratrixState, patch: Partial<GeneratrixState>): GeneratrixState {
    const next = { ...state, ...patch }
    return {
        integer: clamp(next.integer, 0, 9),
        preLength: next.preLength,
        pre: next.preLength === 0 ? 0 : clamp(next.pre, 0, digitsMax(next.preLength)),
        periodLength: next.periodLength,
        // A period of only zeros would be an exact decimal written strangely
        period: clamp(next.period, 1, digitsMax(next.periodLength))
    }
}

export const generatrixExpansion = (state: GeneratrixState): DecimalExpansion => ({
    negative: false,
    integer: String(state.integer),
    preperiod: state.preLength === 0 ? '' : String(state.pre).padStart(state.preLength, '0'),
    period: String(state.period).padStart(state.periodLength, '0')
})

export const generatrixValue = (state: GeneratrixState) => generatrix(generatrixExpansion(state))

export const generatrixChallenges: LabChallenge<GeneratrixState>[] = [
    { id: 40301, prompt: say('Lortu $\\frac{1}{3}$ zatiki sortzailea duen hamartarra.', 'Consigue el decimal cuya fracción generatriz es $\\frac{1}{3}$.', 'احصل على العدد العشري الذي كسره المولّد $\\frac{1}{3}$.'), hint: say('$\\frac{1}{3}=\\frac{3}{9}$: periodo hutsa, zifra bat.', '$\\frac{1}{3}=\\frac{3}{9}$: periódico puro de una cifra.', '$\\frac{1}{3}=\\frac{3}{9}$: دوري بحت من رقم واحد.'), isSolved: (state) => equals(generatrixValue(state), fraction(1, 3)) },
    { id: 40302, prompt: say('Lortu $\\frac{7}{90}$ ematen duen hamartarra.', 'Consigue el decimal que da $\\frac{7}{90}$.', 'احصل على العدد العشري الذي يعطي $\\frac{7}{90}$.'), hint: say('90: periodoko zifra bat eta aurreperiodoko bat.', '90: una cifra en el periodo y una en el anteperiodo.', '90: رقم في الدور ورقم قبله.'), isSolved: (state) => equals(generatrixValue(state), fraction(7, 90)) },
    { id: 40303, prompt: say('Bilatu zenbaki oso bat ematen duen hamartar periodiko bat.', 'Busca un decimal periódico que dé un número entero.', 'ابحث عن عدد عشري دوري يعطي عددًا صحيحًا.'), hint: say('Probatu 9 periodoarekin: $0{,}\\overline{9}=\\frac{9}{9}$.', 'Prueba con periodo 9: $0{,}\\overline{9}=\\frac{9}{9}$.', 'جرّب الدور 9: $0.\\overline{9}=\\frac{9}{9}$.'), isSolved: (state) => generatrixValue(state).denominator === 1 },
    { id: 40304, prompt: say('Lortu $\\frac{25}{99}$ zatiki laburtezina.', 'Consigue la fracción irreducible $\\frac{25}{99}$.', 'احصل على الكسر غير القابل للاختزال $\\frac{25}{99}$.'), hint: say('Periodo hutsa, bi zifra: 99.', 'Periódico puro de dos cifras: 99.', 'دوري بحت من رقمين: 99.'), isSolved: (state) => equals(generatrixValue(state), fraction(25, 99)) }
]

/* ---------- Zooming in on the real line ---------- */

export const zoomTargets: Array<{ label: string; latex: string; value: number }> = [
    { label: '√2', latex: '\\sqrt{2}', value: Math.SQRT2 },
    { label: 'π', latex: '\\pi', value: Math.PI },
    { label: '√5', latex: '\\sqrt{5}', value: Math.sqrt(5) },
    { label: '2/3', latex: '\\frac{2}{3}', value: 2 / 3 },
    { label: '16/9', latex: '\\frac{16}{9}', value: 16 / 9 }
]

export const ZOOM_LEVELS = 4

export interface ZoomState {
    target: number
    /** Decimal digits found so far */
    digits: number[]
    /** The last segment tapped that did not contain the number */
    miss: number | null
    /** Deepest level reached with each target */
    best: Record<number, number>
}

export const initialZoomState: ZoomState = { target: 0, digits: [], miss: null, best: {} }

/** The window shown: [low, low + width] */
export function zoomWindow(state: Pick<ZoomState, 'target' | 'digits'>): { low: number; width: number } {
    const whole = Math.floor(zoomTargets[state.target].value)
    const width = 10 ** -state.digits.length
    const low = state.digits.reduce((total, digit, index) => total + digit * 10 ** -(index + 1), whole)
    return { low: Math.round(low * 1e9) / 1e9, width }
}

/** The next decimal digit of the target */
export const nextDigit = (state: Pick<ZoomState, 'target' | 'digits'>) => Math.floor(zoomTargets[state.target].value * 10 ** (state.digits.length + 1) + 1e-9) % 10

export function tapSegment(state: ZoomState, segment: number): ZoomState {
    if (state.digits.length >= ZOOM_LEVELS) return state
    if (segment !== nextDigit(state)) return { ...state, miss: segment }
    const digits = [...state.digits, segment]
    return { ...state, digits, miss: null, best: { ...state.best, [state.target]: Math.max(state.best[state.target] ?? 0, digits.length) } }
}

export const zoomOut = (state: ZoomState): ZoomState => ({ ...state, digits: state.digits.slice(0, -1), miss: null })
export const setZoomTarget = (state: ZoomState, target: number): ZoomState => ({ ...state, target: clamp(target, 0, zoomTargets.length - 1), digits: [], miss: null })

export const zoomChallenges: LabChallenge<ZoomState>[] = [
    { id: 40401, prompt: say('Kokatu $\\sqrt{2}$ ehunenetara: bi zoom.', 'Sitúa $\\sqrt{2}$ hasta las centésimas: dos zooms.', 'حدّد موضع $\\sqrt{2}$ حتى الأجزاء من مئة: تكبيران.'), hint: say('Lehenik 1,4 eta 1,5 artean dago.', 'Primero está entre 1,4 y 1,5.', 'أولًا هو بين 1.4 و1.5.'), isSolved: (state) => (state.best[0] ?? 0) >= 2 },
    { id: 40402, prompt: say('Kokatu $\\pi$ milarenetara: hiru zoom.', 'Sitúa $\\pi$ hasta las milésimas: tres zooms.', 'حدّد موضع $\\pi$ حتى الأجزاء من ألف: ثلاثة تكبيرات.'), hint: say('$\\pi=3{,}14\\ldots$', '$\\pi=3{,}14\\ldots$', '$\\pi=3.14\\ldots$'), isSolved: (state) => (state.best[1] ?? 0) >= 3 },
    { id: 40403, prompt: say('Egin lau zoom $\\frac{2}{3}$-rekin: zer gertatzen da beti?', 'Haz cuatro zooms con $\\frac{2}{3}$: ¿qué pasa siempre?', 'كبّر أربع مرات مع $\\frac{2}{3}$: ماذا يحدث دائمًا؟'), hint: say('Periodiko hutsa da: 6 behin eta berriz.', 'Es periódico puro: 6 una y otra vez.', 'إنه دوري بحت: 6 مرة بعد مرة.'), isSolved: (state) => (state.best[3] ?? 0) >= 4 },
    { id: 40404, prompt: say('Kokatu $\\sqrt{5}$ ehunenetara.', 'Sitúa $\\sqrt{5}$ hasta las centésimas.', 'حدّد موضع $\\sqrt{5}$ حتى الأجزاء من مئة.'), hint: say('$2^{2}=4$ eta $3^{2}=9$: 2 eta 3 artean.', '$2^{2}=4$ y $3^{2}=9$: entre 2 y 3.', '$2^{2}=4$ و$3^{2}=9$: بين 2 و3.'), isSolved: (state) => (state.best[2] ?? 0) >= 2 }
]

/* ---------- Intervals ---------- */

export const INTERVAL_LIMIT = 6

export interface IntervalsState {
    from: number
    to: number
    closedFrom: boolean
    closedTo: boolean
    infiniteFrom: boolean
    infiniteTo: boolean
    /** A number to test against the interval */
    probe: number
}

export const initialIntervalsState: IntervalsState = { from: -2, to: 3, closedFrom: true, closedTo: false, infiniteFrom: false, infiniteTo: false, probe: 0 }

export function setIntervals(state: IntervalsState, patch: Partial<IntervalsState>): IntervalsState {
    const next = { ...state, ...patch }
    let from = clamp(next.from, -INTERVAL_LIMIT, INTERVAL_LIMIT)
    let to = clamp(next.to, -INTERVAL_LIMIT, INTERVAL_LIMIT)
    // The ends never cross: the one that moved pushes the other
    if (from >= to) {
        if (patch.from !== undefined) to = Math.min(INTERVAL_LIMIT, from + 1)
        else from = Math.max(-INTERVAL_LIMIT, to - 1)
        if (from >= to) from = to - 1
    }
    return { ...next, from, to, probe: Math.min(INTERVAL_LIMIT + 1, Math.max(-INTERVAL_LIMIT - 1, Math.round(next.probe * 2) / 2)) }
}

export const intervalOf = (state: IntervalsState): Interval => interval(state.infiniteFrom ? null : state.from, state.infiniteTo ? null : state.to, state.closedFrom, state.closedTo)

/** How many whole numbers the interval holds (null when infinitely many) */
export function integersIn(value: Interval): number | null {
    if (value.from === null || value.to === null) return null
    let count = 0
    for (let x = Math.ceil(value.from); x <= Math.floor(value.to); x += 1) if (contains(value, x)) count += 1
    return count
}

const isInterval = (state: IntervalsState, wanted: Interval) => JSON.stringify(intervalOf(state)) === JSON.stringify(wanted)

export const intervalsChallenges: LabChallenge<IntervalsState>[] = [
    { id: 40501, prompt: say('Eraiki $[-2,\\,4)$ tartea.', 'Construye el intervalo $[-2,\\,4)$.', 'ابنِ الفترة $[-2,\\,4)$.'), hint: say('−2 barne (kortxetea), 4 kanpo (parentesia).', '−2 incluido (corchete) y 4 excluido (paréntesis).', '−2 داخل (قوس معقوف) و4 خارج (قوس عادي).'), isSolved: (state) => isInterval(state, interval(-2, 4, true, false)) },
    { id: 40502, prompt: say('Eraiki $x\\le 3$ zuzenerdia.', 'Construye la semirrecta $x\\le 3$.', 'ابنِ نصف المستقيم $x\\le 3$.'), hint: say('Ezkerretik infinitura; 3 barne.', 'Infinito por la izquierda; 3 incluido.', 'لانهاية من اليسار؛ و3 داخل.'), isSolved: (state) => isInterval(state, interval(null, 3, false, true)) },
    { id: 40503, prompt: say('Eraiki tarte ireki bat, zehazki 3 zenbaki oso dituena.', 'Construye un intervalo abierto que contenga exactamente 3 números enteros.', 'ابنِ فترة مفتوحة تضم 3 أعداد صحيحة بالضبط.'), hint: say('Adibidez $(-1,\\,3)$: 0, 1 eta 2.', 'Por ejemplo $(-1,\\,3)$: 0, 1 y 2.', 'مثلًا $(-1,\\,3)$: 0 و1 و2.'), isSolved: (state) => { const value = intervalOf(state); return value.from !== null && value.to !== null && !value.closedFrom && !value.closedTo && integersIn(value) === 3 } },
    { id: 40504, prompt: say('Eraiki $[5,\\,+\\infty)$ eta jarri $x$ muturrean: barruan dago?', 'Construye $[5,\\,+\\infty)$ y pon $x$ en el extremo: ¿está dentro?', 'ابنِ $[5,\\,+\\infty)$ وضع $x$ عند الطرف: هل هو داخل؟'), hint: say('Kortxetea: 5 barne dago.', 'Corchete: el 5 está incluido.', 'قوس معقوف: 5 داخل.'), isSolved: (state) => isInterval(state, interval(5, null, true, false)) && state.probe === 5 }
]

/* ---------- Truncating and rounding ---------- */

export const roundingNumbers: Array<{ label: string; latex: string; text: string }> = [
    { label: 'π', latex: '\\pi', text: '3.14159265358979' },
    { label: '√2', latex: '\\sqrt{2}', text: '1.41421356237310' },
    { label: '2/3', latex: '\\frac{2}{3}', text: '0.66666666666667' },
    { label: '82,745', latex: '82{,}745', text: '82.745' },
    { label: '3,555', latex: '3{,}555', text: '3.555' },
    { label: '15,107', latex: '15{,}107', text: '15.107' }
]

export interface RoundingState {
    number: number
    places: number
}

export const initialRoundingState: RoundingState = { number: 0, places: 2 }

export const setRounding = (state: RoundingState, patch: Partial<RoundingState>): RoundingState => ({
    number: clamp(patch.number ?? state.number, 0, roundingNumbers.length - 1),
    places: clamp(patch.places ?? state.places, 0, 4)
})

export function roundingInfo(state: RoundingState) {
    const text = roundingNumbers[state.number].text
    const real = Number(text)
    const truncated = truncateDecimal(text, state.places)
    const rounded = roundDecimal(text, state.places)
    return {
        truncated,
        rounded,
        truncatedError: Math.abs(real - Number(truncated)),
        roundedError: Math.abs(real - Number(rounded)),
        real
    }
}

export const roundingChallenges: LabChallenge<RoundingState>[] = [
    { id: 40601, prompt: say('Aurkitu trunkatzeak eta biribiltzeak emaitza desberdina ematen duten kasu bat.', 'Encuentra un caso en el que truncar y redondear den resultados distintos.', 'جد حالة يعطي فيها البتر والتقريب نتيجتين مختلفتين.'), hint: say('Kentzen den lehen zifrak 5 edo gehiago izan behar du.', 'La primera cifra suprimida tiene que ser 5 o más.', 'يجب أن يكون أول رقم محذوف 5 أو أكثر.'), isSolved: (state) => { const info = roundingInfo(state); return info.truncated !== info.rounded } },
    { id: 40602, prompt: say('Biribildu $\\pi$ errore absolutua 0,001 baino txikiagoa izan dadin.', 'Redondea $\\pi$ de modo que el error absoluto sea menor que 0,001.', 'قرّب $\\pi$ بحيث يكون الخطأ المطلق أصغر من 0.001.'), hint: say('Probatu hamartar kopuru desberdinekin.', 'Prueba con distinto número de decimales.', 'جرّب عددًا مختلفًا من المنازل العشرية.'), isSolved: (state) => state.number === 0 && roundingInfo(state).roundedError < 0.001 },
    { id: 40603, prompt: say('$\\frac{2}{3}$ hamarrenetara: konparatu bi erroreak.', '$\\frac{2}{3}$ a las décimas: compara los dos errores.', '$\\frac{2}{3}$ إلى الأعشار: قارن الخطأين.'), hint: say('Trunkatuta 0,6 eta biribilduta 0,7.', 'Truncado 0,6 y redondeado 0,7.', 'مبتورًا 0.6 ومقرّبًا 0.7.'), isSolved: (state) => state.number === 2 && state.places === 1 },
    { id: 40604, prompt: say('Biribildu $3{,}555$ ehunenetara.', 'Redondea $3{,}555$ a las centésimas.', 'قرّب $3.555$ إلى الأجزاء من مئة.'), hint: say('Kentzen den zifra 5 da: gora.', 'La cifra suprimida es 5: hacia arriba.', 'الرقم المحذوف 5: إلى الأعلى.'), isSolved: (state) => state.number === 4 && state.places === 2 }
]

/* ---------- Scientific notation ---------- */

export const scientificNumbers: Array<{ text: string; what: { eu: string; es: string; ar: string } }> = [
    { text: '83400000', what: say('Biztanleak (Alemania)', 'Habitantes (Alemania)', 'السكان (ألمانيا)') },
    { text: '0.00052', what: say('Erlojuaren pieza (m)', 'Pieza de reloj (m)', 'قطعة ساعة (م)') },
    { text: '149600000', what: say('Lurra–Eguzkia (km)', 'Tierra–Sol (km)', 'الأرض–الشمس (كم)') },
    { text: '0.0000000001846', what: say('Atomo baten tamaina (m)', 'Tamaño de un átomo (m)', 'حجم ذرة (م)') },
    { text: '9170000000', what: say('Datuak (byte)', 'Datos (bytes)', 'بيانات (بايت)') }
]

export interface ScientificState {
    number: number
    exponent: number
    /** Numbers already written correctly */
    done: number[]
}

export const SCIENTIFIC_LIMIT = 12

export const initialScientificState: ScientificState = { number: 0, exponent: 0, done: [] }

/** The number divided by 10^exponent, as a decimal string with a point */
export function shiftDecimal(text: string, exponent: number): string {
    const [whole, decimals = ''] = text.split('.')
    const digits = whole + decimals
    const point = whole.length - exponent
    let result: string
    if (point <= 0) result = `0.${'0'.repeat(-point)}${digits}`
    else if (point >= digits.length) result = digits + '0'.repeat(point - digits.length)
    else result = `${digits.slice(0, point)}.${digits.slice(point)}`
    const [integerPart, decimalPart = ''] = result.split('.')
    const cleanInteger = integerPart.replace(/^0+(?=\d)/, '')
    const cleanDecimals = decimalPart.replace(/0+$/, '')
    return cleanDecimals ? `${cleanInteger}.${cleanDecimals}` : cleanInteger
}

export const scientificMantissa = (state: Pick<ScientificState, 'number' | 'exponent'>) => shiftDecimal(scientificNumbers[state.number].text, state.exponent)

export function isScientific(state: Pick<ScientificState, 'number' | 'exponent'>): boolean {
    const mantissa = Number(scientificMantissa(state))
    return mantissa >= 1 && mantissa < 10
}

function withDone(state: ScientificState): ScientificState {
    return isScientific(state) && !state.done.includes(state.number) ? { ...state, done: [...state.done, state.number] } : state
}

export const setScientificNumber = (state: ScientificState, number: number) => withDone({ ...state, number: clamp(number, 0, scientificNumbers.length - 1), exponent: 0 })
export const setScientificExponent = (state: ScientificState, exponent: number) => withDone({ ...state, exponent: clamp(exponent, -SCIENTIFIC_LIMIT, SCIENTIFIC_LIMIT) })

export const scientificChallenges: LabChallenge<ScientificState>[] = [
    { id: 40701, prompt: say('Idatzi 83 400 000 idazkera zientifikoan.', 'Escribe 83 400 000 en notación científica.', 'اكتب 83 400 000 بالترميز العلمي.'), hint: say('Koma 8aren ondoren geratu behar da.', 'La coma tiene que quedar detrás del 8.', 'يجب أن تبقى الفاصلة بعد 8.'), isSolved: (state) => state.done.includes(0) },
    { id: 40702, prompt: say('Idatzi 0,00052 idazkera zientifikoan.', 'Escribe 0,00052 en notación científica.', 'اكتب 0.00052 بالترميز العلمي.'), hint: say('Zenbaki txikia: berretzaile negatiboa.', 'Número pequeño: exponente negativo.', 'عدد صغير: أس سالب.'), isSolved: (state) => state.done.includes(1) },
    { id: 40703, prompt: say('Idatzi bost zenbakiak idazkera zientifikoan.', 'Escribe los cinco números en notación científica.', 'اكتب الأعداد الخمسة بالترميز العلمي.'), hint: say('Zenbatu komaren jauziak.', 'Cuenta los saltos de la coma.', 'عُدّ قفزات الفاصلة.'), isSolved: (state) => scientificNumbers.every((_, index) => state.done.includes(index)) }
]

/* ---------- Radicals ---------- */

export const RADICAND_LIMITS = { min: 2, max: 400 } as const

export interface RadicalsState {
    n: number
    /** Radicands already tried */
    seen: number[]
}

export const initialRadicalsState: RadicalsState = { n: 72, seen: [72] }

export const setRadicand = (state: RadicalsState, n: number): RadicalsState => {
    const next = clamp(n, RADICAND_LIMITS.min, RADICAND_LIMITS.max)
    return { n: next, seen: state.seen.includes(next) ? state.seen : [...state.seen, next] }
}

export const radicalsChallenges: LabChallenge<RadicalsState>[] = [
    { id: 40801, prompt: say('Aurkitu $5\\sqrt{2}$ ematen duen errokizuna.', 'Encuentra el radicando que da $5\\sqrt{2}$.', 'جد ما تحت الجذر الذي يعطي $5\\sqrt{2}$.'), hint: say('$5^{2}\\cdot 2$', '$5^{2}\\cdot 2$', '$5^{2}\\cdot 2$'), isSolved: (state) => { const { outside, inside } = simplifySqrt(state.n); return outside === 5 && inside === 2 } },
    { id: 40802, prompt: say('Aurkitu 100 baino handiagoa den karratu perfektu bat: erroa osorik ateratzen da.', 'Encuentra un cuadrado perfecto mayor que 100: la raíz sale entera.', 'جد مربعًا كاملًا أكبر من 100: يخرج الجذر كله.'), hint: say('$11^{2}$, $12^{2}$…', '$11^{2}$, $12^{2}$…', '$11^{2}$، $12^{2}$…'), isSolved: (state) => state.n > 100 && simplifySqrt(state.n).inside === 1 },
    { id: 40803, prompt: say('Aurkitu $4\\sqrt{3}$ ematen duen errokizuna.', 'Encuentra el radicando que da $4\\sqrt{3}$.', 'جد ما تحت الجذر الذي يعطي $4\\sqrt{3}$.'), hint: say('$4^{2}\\cdot 3$', '$4^{2}\\cdot 3$', '$4^{2}\\cdot 3$'), isSolved: (state) => { const { outside, inside } = simplifySqrt(state.n); return outside === 4 && inside === 3 } },
    { id: 40804, prompt: say('Aurkitu 100 baino handiagoa den errokizun bat, ezin dena sinplifikatu.', 'Encuentra un radicando mayor que 100 que no se pueda simplificar.', 'جد ما تحت جذر أكبر من 100 لا يمكن تبسيطه.'), hint: say('Faktore lehenak bikoterik gabe: 101, 105…', 'Factores primos sin pareja: 101, 105…', 'عوامل أولية بلا أزواج: 101، 105…'), isSolved: (state) => state.n > 100 && simplifySqrt(state.n).outside === 1 }
]

export const realsLabChallengeIds: number[] = [powersChallenges, decimalsChallenges, generatrixChallenges, zoomChallenges, intervalsChallenges, roundingChallenges, scientificChallenges, radicalsChallenges].flatMap((list) => list.map((challenge) => challenge.id))
