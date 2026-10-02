import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { DecimalsStageId } from '../lessons.tsx'

/* ==========================================================================
   Zenbaki hamartarrak (1. DBH) laboratory: the hundredths grid, the
   place-value board, comparing digit by digit, zooming in on the line,
   rounding, the long division that does (or does not) end, the jumping
   comma, where the comma goes in a product, and taking the comma out of
   the divisor. Pure state logic with whole numbers (no floating point);
   the components live next to this file. Tests in
   tests/hamartarrak-dbh1-lab.test.ts.
   ========================================================================== */

export type DecimalsLabToolId = 'grid' | 'place' | 'compare' | 'zoom' | 'rounding' | 'division' | 'shift' | 'comma' | 'balance'

export interface DecimalsLabTool extends LabToolInfo {
    id: DecimalsLabToolId
    stage: DecimalsStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string) => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export const decimalsLabTools: DecimalsLabTool[] = [
    { id: 'grid', stage: 'structure', lessonTopic: 'decimal-units', title: say('Ehunenen sareta', 'La cuadrícula de centésimas', 'شبكة الأجزاء من مئة'), observe: say('Zutabe bat hamarren bat da, eta lauki bat ehunen bat. 10 lauki zutabe bat osatzen dute: 0,3 eta 0,30 marrazki bera dira.', 'Una columna es una décima y un cuadrito, una centésima. 10 cuadritos forman una columna: 0,3 y 0,30 son el mismo dibujo.', 'العمود عُشر والمربع الصغير جزء من مئة. عشرة مربعات تكوّن عمودًا: 0.3 و0.30 الرسم نفسه.') },
    { id: 'place', stage: 'structure', lessonTopic: 'place-value', title: say('Posizioen taula', 'El tablero de posiciones', 'لوحة المنازل'), observe: say('Aldatu zutabe bateko zifra: zenbakia zutabe horren balioaren adina aldatzen da. Ezkerrerago dagoen zutabeak 10 aldiz gehiago balio du.', 'Cambia la cifra de una columna: el número cambia tanto como vale esa columna. Una columna más a la izquierda vale 10 veces más.', 'غيّر رقم عمود: يتغيّر العدد بقدر قيمة ذلك العمود. والعمود الذي على اليسار يساوي عشرة أضعاف.') },
    { id: 'compare', stage: 'order', lessonTopic: 'compare', title: say('Zifraz zifra', 'Cifra a cifra', 'رقمًا رقمًا'), observe: say('Bi zenbakiak zifra hamartar kopuru berarekin idazten dira. Ezkerretik hasita, desberdina den lehen zifrak erabakitzen du.', 'Los dos números se escriben con las mismas cifras decimales. Empezando por la izquierda, decide la primera cifra distinta.', 'يُكتب العددان بالعدد نفسه من الأرقام العشرية. وبدءًا من اليسار يحسم أول رقم مختلف.') },
    { id: 'zoom', stage: 'order', lessonTopic: 'line', title: say('Zuzenean zoom', 'Zoom en la recta', 'التكبير على المستقيم'), observe: say('Sakatu zenbakia dagoen zatia: tartea 10 zatitan banatzen da berriro eta zifra hamartar bat gehiago agertzen da.', 'Pulsa el tramo donde está el número: el tramo se vuelve a dividir en 10 y aparece una cifra decimal más.', 'اضغط الجزء الذي فيه العدد: تُقسم القطعة إلى 10 من جديد ويظهر رقم عشري آخر.') },
    { id: 'rounding', stage: 'fractions', lessonTopic: 'rounding', title: say('Zein da hurbilena?', '¿Cuál está más cerca?', 'أيهما أقرب؟'), observe: say('Biribiltzea bi aukeren artean hurbilena aukeratzea da. Erdiko marra 5 da: hortik aurrera, handiena.', 'Redondear es elegir el más cercano de dos candidatos. La raya del medio es el 5: desde ahí, el mayor.', 'التقريب هو اختيار الأقرب من عددين. خط المنتصف هو 5: ومنه فما فوق نختار الأكبر.') },
    { id: 'division', stage: 'fractions', lessonTopic: 'fraction-division', title: say('Zero bat jaitsi', 'Bajar un cero', 'إنزال صفر'), observe: say('Jaitsi zeroak eta begiratu hondarrei: 0 bada, zatiketa amaitu da; bat errepikatzen bada, zifrak ere errepikatuko dira beti.', 'Baja ceros y mira los restos: si sale 0, la división termina; si uno se repite, las cifras se repetirán siempre.', 'أنزل أصفارًا وراقب البواقي: إذا ظهر 0 انتهت القسمة؛ وإذا تكرر باقٍ ستتكرر الأرقام دائمًا.') },
    { id: 'shift', stage: 'operations', lessonTopic: 'powers-of-ten', title: say('Koma jauzika', 'La coma que salta', 'الفاصلة القافزة'), observe: say('10ez biderkatzean koma toki bat eskuinera doa; 10ez zatitzean, ezkerrera. Zifrak ez dira aldatzen: haien tokia bai.', 'Al multiplicar por 10 la coma salta un lugar a la derecha; al dividir, a la izquierda. Las cifras no cambian: cambia su lugar.', 'عند الضرب في 10 تقفز الفاصلة منزلة إلى اليمين؛ وعند القسمة إلى اليسار. الأرقام لا تتغيّر: يتغيّر مكانها.') },
    { id: 'comma', stage: 'operations', lessonTopic: 'multiply', title: say('Non doa koma?', '¿Dónde va la coma?', 'أين توضع الفاصلة؟'), observe: say('Biderkadura komarik gabe egiten da; gero, emaitzak bi faktoreen zifra hamartar guztiak eramaten ditu. Zifrak falta badira, zeroak jartzen dira aurrean.', 'El producto se hace sin coma; después, el resultado lleva todas las cifras decimales de los dos factores. Si faltan cifras, se ponen ceros delante.', 'يُجرى الضرب بلا فاصلة؛ ثم يأخذ الناتج كل الأرقام العشرية للعاملين. وإذا نقصت الأرقام نضع أصفارًا في البداية.') },
    { id: 'balance', stage: 'division', lessonTopic: 'divide-decimal', title: say('Kendu koma zatitzaileari', 'Quita la coma al divisor', 'احذف فاصلة المقسوم عليه'), observe: say('Biak 10ez biderkatzean zatidura ez da aldatzen. Zatitzaileak komarik ez duenean, zatiketa erraza da.', 'Al multiplicar los dos por 10 el cociente no cambia. Cuando el divisor ya no tiene coma, la división es sencilla.', 'بضرب الاثنين في 10 لا يتغيّر الناتج. وحين يفقد المقسوم عليه فاصلته تصبح القسمة سهلة.') }
]

export const decimalsLabToolForTopic: Record<string, DecimalsLabToolId | undefined> = {
    'decimal-units': 'grid',
    'place-value': 'place',
    'read-write': 'place',
    compare: 'compare',
    line: 'zoom',
    between: 'zoom',
    'decimal-fraction': 'grid',
    'fraction-division': 'division',
    rounding: 'rounding',
    'add-sub': 'place',
    multiply: 'comma',
    'powers-of-ten': 'shift',
    'divide-natural': 'division',
    'divide-decimal': 'balance',
    problems: 'balance'
}

/* ---------- Written decimals as whole numbers ---------- */

/** A decimal kept exact: `units` divided by 10^`places` */
export interface Exact {
    units: number
    places: number
}

/** Reads "2,35" or "2.35" */
export function exact(text: string): Exact {
    const [whole, decimals = ''] = text.replace(',', '.').split('.')
    return { units: Number(whole + decimals), places: decimals.length }
}

/** Written with the comma; keeps the trailing zeros of its places */
export function writeExact(value: Exact): string {
    const digits = String(value.units).padStart(value.places + 1, '0')
    return value.places === 0 ? digits : `${digits.slice(0, -value.places)},${digits.slice(-value.places)}`
}

/** The same value with `places` decimal places (only adds zeros) */
const widen = (value: Exact, places: number): Exact => ({ units: value.units * 10 ** (places - value.places), places })

export function compareExact(left: Exact, right: Exact): -1 | 0 | 1 {
    const places = Math.max(left.places, right.places)
    const a = widen(left, places).units
    const b = widen(right, places).units
    return a < b ? -1 : a > b ? 1 : 0
}

/* ---------- 1. The hundredths grid ---------- */

export interface GridState {
    tenths: number
    hundredths: number
}

export const initialGridState: GridState = { tenths: 2, hundredths: 0 }

/** Columns and loose squares; a full column of squares becomes one more column */
export function setGrid(state: GridState, patch: Partial<GridState>): GridState {
    let tenths = clamp(patch.tenths ?? state.tenths, 0, 10)
    let hundredths = clamp(patch.hundredths ?? state.hundredths, 0, 10)
    if (hundredths === 10 && tenths < 10) {
        tenths += 1
        hundredths = 0
    }
    if (tenths === 10) hundredths = 0
    return { tenths, hundredths: Math.min(hundredths, 9) }
}

/** The value in hundredths */
export const gridValue = (state: GridState) => state.tenths * 10 + state.hundredths

export const gridChallenges: LabChallenge<GridState>[] = [
    { id: 13101, prompt: say('Marraztu $0{,}3$.', 'Dibuja $0{,}3$.', 'ارسم $0{,}3$.'), hint: say('Hiru zutabe: hiru hamarren.', 'Tres columnas: tres décimas.', 'ثلاثة أعمدة: ثلاثة أعشار.'), isSolved: (state) => gridValue(state) === 30 },
    { id: 13102, prompt: say('Marraztu $0{,}47$.', 'Dibuja $0{,}47$.', 'ارسم $0{,}47$.'), hint: say('4 zutabe eta 7 lauki solte.', '4 columnas y 7 cuadritos sueltos.', '4 أعمدة و7 مربعات منفردة.'), isSolved: (state) => gridValue(state) === 47 },
    { id: 13103, prompt: say('Marraztu $0{,}05$.', 'Dibuja $0{,}05$.', 'ارسم $0{,}05$.'), hint: say('Zutaberik ez: 5 ehunen soilik.', 'Ninguna columna: solo 5 centésimas.', 'لا أعمدة: خمسة أجزاء من مئة فقط.'), isSolved: (state) => gridValue(state) === 5 },
    { id: 13104, prompt: say('Marraztu $\\frac{3}{4}$ hamartar gisa.', 'Dibuja $\\frac{3}{4}$ como decimal.', 'ارسم $\\frac{3}{4}$ عددًا عشريًا.'), hint: say('$\\frac{3}{4}=\\frac{75}{100}$.', '$\\frac{3}{4}=\\frac{75}{100}$.', '$\\frac{3}{4}=\\frac{75}{100}$.'), isSolved: (state) => gridValue(state) === 75 }
]

/* ---------- 2. The place-value board: hundreds to thousandths ---------- */

/** Place values in thousandths, from the hundreds to the thousandths */
export const PLACE_WEIGHTS = [100000, 10000, 1000, 100, 10, 1] as const

export interface PlaceState {
    digits: number[]
}

export const initialPlaceState: PlaceState = { digits: [0, 3, 4, 2, 0, 5] }

export function setPlaceDigit(state: PlaceState, place: number, digit: number): PlaceState {
    if (place < 0 || place >= PLACE_WEIGHTS.length) return state
    return { digits: state.digits.map((current, index) => (index === place ? ((Math.round(digit) % 10) + 10) % 10 : current)) }
}

/** The value in thousandths */
export const placeValue = (state: PlaceState) => state.digits.reduce((total, digit, index) => total + digit * PLACE_WEIGHTS[index], 0)

/** Written with the comma, without the zeros that change nothing */
export function placeText(state: PlaceState): string {
    const text = writeExact({ units: placeValue(state), places: 3 })
    return text.replace(/0+$/, '').replace(/,$/, '')
}

export const placeChallenges: LabChallenge<PlaceState>[] = [
    { id: 13201, prompt: say('Eraiki $52{,}347$.', 'Construye $52{,}347$.', 'كوّن $52{,}347$.'), hint: say('5 hamarrekoetan, 2 unitateetan, 3 hamarrenetan…', '5 en las decenas, 2 en las unidades, 3 en las décimas…', '5 في العشرات و2 في الآحاد و3 في الأعشار…'), isSolved: (state) => placeValue(state) === 52347 },
    { id: 13202, prompt: say('Eraiki «hamabi unitate eta bost milaren».', 'Construye «doce unidades y cinco milésimas».', 'كوّن «اثنتا عشرة وحدة وخمسة أجزاء من ألف».'), hint: say('Hamarrenak eta ehunenak 0: $12{,}005$.', 'Décimas y centésimas a 0: $12{,}005$.', 'الأعشار والأجزاء من مئة صفر: $12{,}005$.'), isSolved: (state) => placeValue(state) === 12005 },
    { id: 13203, prompt: say('Jarri 7 bat $0{,}07$ balio duen tokian.', 'Pon un 7 donde valga $0{,}07$.', 'ضع 7 حيث يساوي $0{,}07$.'), hint: say('$0{,}07$ zazpi ehunen dira.', '$0{,}07$ son siete centésimas.', '$0{,}07$ سبعة أجزاء من مئة.'), isSolved: (state) => state.digits[4] === 7 },
    { id: 13204, prompt: say('Eraiki $3{,}4$ eta $3{,}5$ arteko zenbaki bat.', 'Construye un número entre $3{,}4$ y $3{,}5$.', 'كوّن عددًا بين $3{,}4$ و$3{,}5$.'), hint: say('3 unitate, 4 hamarren eta ehunen edo milaren batzuk.', '3 unidades, 4 décimas y algunas centésimas o milésimas.', '3 وحدات و4 أعشار وبعض الأجزاء من مئة أو من ألف.'), isSolved: (state) => placeValue(state) > 3400 && placeValue(state) < 3500 }
]

/* ---------- 3. Comparing digit by digit ---------- */

export type Sign = '<' | '=' | '>'

export const comparePairs: Array<[string, string]> = [
    ['13,56', '13,65'],
    ['11,8', '11,80'],
    ['0,5', '0,355'],
    ['2,03', '2,3'],
    ['34,908', '34,91'],
    ['6,08', '6,07']
]

export interface CompareState {
    pair: number
    /** The sign chosen for each pair */
    answers: Record<number, Sign>
}

export const initialCompareState: CompareState = { pair: 0, answers: {} }

export const rightSign = (pair: number): Sign => {
    const [left, right] = comparePairs[pair]
    return ({ '-1': '<', '0': '=', '1': '>' } as const)[String(compareExact(exact(left), exact(right))) as '-1' | '0' | '1']
}

export const choosePair = (state: CompareState, pair: number): CompareState => ({ ...state, pair: clamp(pair, 0, comparePairs.length - 1) })
export const answerPair = (state: CompareState, sign: Sign): CompareState => ({ ...state, answers: { ...state.answers, [state.pair]: sign } })
export const pairRight = (state: CompareState, pair: number) => state.answers[pair] === rightSign(pair)

/** Both numbers with the same decimal places, and the first column where they differ (or null) */
export function alignPair(pair: number): { left: string; right: string; differs: number | null } {
    const [a, b] = comparePairs[pair].map(exact)
    const places = Math.max(a.places, b.places)
    const left = writeExact(widen(a, places))
    const right = writeExact(widen(b, places))
    const width = Math.max(left.length, right.length)
    const l = left.padStart(width, ' ')
    const r = right.padStart(width, ' ')
    const index = [...l].findIndex((char, position) => char !== r[position])
    return { left: l, right: r, differs: index === -1 ? null : index }
}

export const compareChallenges: LabChallenge<CompareState>[] = [
    { id: 13301, prompt: say('Asmatu $0{,}5$ eta $0{,}355$ bikotearen zeinua.', 'Acierta el signo entre $0{,}5$ y $0{,}355$.', 'أصب الإشارة بين $0{,}5$ و$0{,}355$.'), hint: say('Konparatu hamarrenak: 5 eta 3.', 'Compara las décimas: 5 y 3.', 'قارن الأعشار: 5 و3.'), isSolved: (state) => pairRight(state, 2) },
    { id: 13302, prompt: say('Asmatu $11{,}8$ eta $11{,}80$ bikotearena.', 'Acierta el de $11{,}8$ y $11{,}80$.', 'أصب إشارة $11{,}8$ و$11{,}80$.'), hint: say('Eskuineko zero batek ez du balioa aldatzen.', 'Un cero a la derecha no cambia el valor.', 'الصفر على اليمين لا يغيّر القيمة.'), isSolved: (state) => pairRight(state, 1) },
    { id: 13303, prompt: say('Asmatu sei bikoteak.', 'Acierta las seis parejas.', 'أصب الأزواج الستة.'), hint: say('Begiratu bikote bakoitzean desberdina den lehen zifra.', 'Mira en cada pareja la primera cifra distinta.', 'انظر في كل زوج إلى أول رقم مختلف.'), isSolved: (state) => comparePairs.every((_, pair) => pairRight(state, pair)) }
]

/* ---------- 4. Zooming in on the line ---------- */

export const zoomTargets = ['2,35', '0,408', '6,27', '1,9'] as const

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

/** How many zooms each target needs: one per decimal digit */
export const zoomDepth = (target: number) => exact(zoomTargets[target]).places

/** The decimal digit `index` (0 = tenths) of the target */
export function targetDigit(target: number, index: number): number {
    const value = exact(zoomTargets[target])
    if (index >= value.places) return 0
    return Math.floor(value.units / 10 ** (value.places - index - 1)) % 10
}

/** The window shown: from `low` (as an exact decimal) to low + one unit of its last place */
export function zoomWindow(state: Pick<ZoomState, 'target' | 'digits'>): { low: Exact; places: number } {
    const value = exact(zoomTargets[state.target])
    const whole = Math.floor(value.units / 10 ** value.places)
    const places = state.digits.length
    const units = state.digits.reduce((total, digit) => total * 10 + digit, whole)
    return { low: { units, places }, places }
}

export function tapSegment(state: ZoomState, segment: number): ZoomState {
    if (state.digits.length >= zoomDepth(state.target)) return state
    if (segment !== targetDigit(state.target, state.digits.length)) return { ...state, miss: segment }
    const digits = [...state.digits, segment]
    return { ...state, digits, miss: null, best: { ...state.best, [state.target]: Math.max(state.best[state.target] ?? 0, digits.length) } }
}

export const zoomOut = (state: ZoomState): ZoomState => ({ ...state, digits: state.digits.slice(0, -1), miss: null })
export const setZoomTarget = (state: ZoomState, target: number): ZoomState => ({ ...state, target: clamp(target, 0, zoomTargets.length - 1), digits: [], miss: null })
export const zoomFound = (state: ZoomState, target: number) => (state.best[target] ?? 0) >= zoomDepth(target)

export const zoomChallenges: LabChallenge<ZoomState>[] = [
    { id: 13401, prompt: say('Aurkitu $2{,}35$ zuzenean.', 'Encuentra $2{,}35$ en la recta.', 'جد $2{,}35$ على المستقيم.'), hint: say('Lehenik $2{,}3$ eta $2{,}4$ artean.', 'Primero entre $2{,}3$ y $2{,}4$.', 'أولًا بين $2{,}3$ و$2{,}4$.'), isSolved: (state) => zoomFound(state, 0) },
    { id: 13402, prompt: say('Aurkitu $0{,}408$: hiru zoom.', 'Encuentra $0{,}408$: tres zooms.', 'جد $0{,}408$: ثلاثة تكبيرات.'), hint: say('Ehunenen zifra 0 da: lehen zatia.', 'La cifra de las centésimas es 0: el primer tramo.', 'رقم الأجزاء من مئة صفر: القطعة الأولى.'), isSolved: (state) => zoomFound(state, 1) },
    { id: 13403, prompt: say('Aurkitu lau zenbakiak.', 'Encuentra los cuatro números.', 'جد الأعداد الأربعة.'), hint: say('Aldatu zenbakia goiko botoiekin.', 'Cambia de número con los botones de arriba.', 'غيّر العدد بالأزرار في الأعلى.'), isSolved: (state) => zoomTargets.every((_, target) => zoomFound(state, target)) }
]

/* ---------- 5. Rounding: which candidate is closer? ---------- */

export const roundingNumbers = ['6,27', '3,84', '2,99', '1,278', '5,099', '0,094'] as const
export const ROUNDING_PLACES = ['units', 'tenths', 'hundredths'] as const

export interface RoundingState {
    number: number
    /** 0 units, 1 tenths, 2 hundredths */
    places: number
    /** The candidate chosen for each number and place: "number-places" */
    picks: Record<string, 'low' | 'high'>
}

export const initialRoundingState: RoundingState = { number: 0, places: 1, picks: {} }

/** Places a number can be rounded to (fewer than it has) */
export const roundingPlaces = (number: number) => Array.from({ length: Math.min(3, exact(roundingNumbers[number]).places) }, (_, index) => index)

export const setRoundingNumber = (state: RoundingState, number: number): RoundingState => {
    const next = clamp(number, 0, roundingNumbers.length - 1)
    return { ...state, number: next, places: Math.min(state.places, roundingPlaces(next).length - 1) }
}
export const setRoundingPlaces = (state: RoundingState, places: number): RoundingState => ({ ...state, places: clamp(places, 0, roundingPlaces(state.number).length - 1) })

/** The two candidates around the number at the chosen place, and the right one */
export function roundingCandidates(number: number, places: number): { low: Exact; high: Exact; right: 'low' | 'high' } {
    const value = exact(roundingNumbers[number])
    const drop = 10 ** (value.places - places)
    const lowUnits = Math.floor(value.units / drop)
    const rest = value.units - lowUnits * drop
    return { low: { units: lowUnits, places }, high: { units: lowUnits + 1, places }, right: rest * 2 >= drop ? 'high' : 'low' }
}

export const pickCandidate = (state: RoundingState, side: 'low' | 'high'): RoundingState => ({ ...state, picks: { ...state.picks, [`${state.number}-${state.places}`]: side } })
export const roundedRight = (state: RoundingState, number: number, places: number) => state.picks[`${number}-${places}`] === roundingCandidates(number, places).right

export const roundingChallenges: LabChallenge<RoundingState>[] = [
    { id: 13501, prompt: say('Biribildu $6{,}27$ hamarrenetara.', 'Redondea $6{,}27$ a las décimas.', 'قرّب $6{,}27$ إلى الأعشار.'), hint: say('$6{,}2$ ala $6{,}3$? Ehunena 7 da.', '¿$6{,}2$ o $6{,}3$? La centésima es 7.', '$6{,}2$ أم $6{,}3$؟ الجزء من مئة 7.'), isSolved: (state) => roundedRight(state, 0, 1) },
    { id: 13502, prompt: say('Biribildu $2{,}99$ hamarrenetara.', 'Redondea $2{,}99$ a las décimas.', 'قرّب $2{,}99$ إلى الأعشار.'), hint: say('Hautagaiak $2{,}9$ eta $3{,}0$ dira.', 'Los candidatos son $2{,}9$ y $3{,}0$.', 'المرشحان $2{,}9$ و$3{,}0$.'), isSolved: (state) => roundedRight(state, 2, 1) },
    { id: 13503, prompt: say('Biribildu $1{,}278$ ehunenetara.', 'Redondea $1{,}278$ a las centésimas.', 'قرّب $1{,}278$ إلى الأجزاء من مئة.'), hint: say('Begiratu milarenei.', 'Mira las milésimas.', 'انظر إلى الأجزاء من ألف.'), isSolved: (state) => roundedRight(state, 3, 2) },
    { id: 13504, prompt: say('Biribildu $5{,}099$ ehunenetara.', 'Redondea $5{,}099$ a las centésimas.', 'قرّب $5{,}099$ إلى الأجزاء من مئة.'), hint: say('$5{,}09$ ala $5{,}10$?', '¿$5{,}09$ o $5{,}10$?', '$5{,}09$ أم $5{,}10$؟'), isSolved: (state) => roundedRight(state, 4, 2) }
]

/* ---------- 6. The long division, one zero at a time ---------- */

export const DIVISION_LIMITS = { dividend: { min: 1, max: 60 }, divisor: { min: 2, max: 12 }, steps: 8 } as const

export interface DivisionState {
    dividend: number
    divisor: number
    /** Zeros brought down so far */
    steps: number
}

export const initialDivisionState: DivisionState = { dividend: 7, divisor: 2, steps: 0 }

export const setDivision = (state: DivisionState, patch: Partial<Pick<DivisionState, 'dividend' | 'divisor'>>): DivisionState => ({
    dividend: clamp(patch.dividend ?? state.dividend, DIVISION_LIMITS.dividend.min, DIVISION_LIMITS.dividend.max),
    divisor: clamp(patch.divisor ?? state.divisor, DIVISION_LIMITS.divisor.min, DIVISION_LIMITS.divisor.max),
    steps: 0
})

/** The whole quotient, the decimal digits and the remainder after each step */
export function divisionSteps(dividend: number, divisor: number, steps: number): { whole: number; digits: number[]; remainders: number[] } {
    const whole = Math.floor(dividend / divisor)
    const remainders = [dividend % divisor]
    const digits: number[] = []
    for (let step = 0; step < steps && remainders[remainders.length - 1] !== 0; step += 1) {
        const carried = remainders[remainders.length - 1] * 10
        digits.push(Math.floor(carried / divisor))
        remainders.push(carried % divisor)
    }
    return { whole, digits, remainders }
}

/** 'exact' once a remainder 0 shows, 'periodic' once a remainder repeats, otherwise still open */
export function divisionStatus(state: DivisionState): 'exact' | 'periodic' | 'open' {
    const { remainders } = divisionSteps(state.dividend, state.divisor, state.steps)
    const last = remainders[remainders.length - 1]
    if (last === 0) return 'exact'
    return remainders.indexOf(last) < remainders.length - 1 ? 'periodic' : 'open'
}

export const bringZero = (state: DivisionState): DivisionState => (divisionStatus(state) === 'open' && state.steps < DIVISION_LIMITS.steps ? { ...state, steps: state.steps + 1 } : state)

export const divisionChallenges: LabChallenge<DivisionState>[] = [
    { id: 13601, prompt: say('Lortu hiru zifra hamartar dituen zatiketa zehatz bat.', 'Consigue una división exacta con tres cifras decimales.', 'احصل على قسمة منتهية بثلاثة أرقام عشرية.'), hint: say('Probatu 8 zatitzailearekin.', 'Prueba con el divisor 8.', 'جرّب المقسوم عليه 8.'), isSolved: (state) => divisionStatus(state) === 'exact' && divisionSteps(state.dividend, state.divisor, state.steps).digits.length === 3 },
    { id: 13602, prompt: say('Aurkitu inoiz amaitzen ez den zatiketa bat.', 'Encuentra una división que no termine nunca.', 'جد قسمة لا تنتهي أبدًا.'), hint: say('Probatu 3, 7 edo 9 zatitzaileekin, eta jaitsi zeroak hondar bat errepikatu arte.', 'Prueba con divisores 3, 7 o 9 y baja ceros hasta que se repita un resto.', 'جرّب المقسوم عليه 3 أو 7 أو 9 وأنزل أصفارًا حتى يتكرر باقٍ.'), isSolved: (state) => divisionStatus(state) === 'periodic' },
    { id: 13603, prompt: say('Lortu $2{,}333\\ldots$', 'Consigue $2{,}333\\ldots$', 'احصل على $2{,}333\\ldots$'), hint: say('$\\frac{7}{3}$', '$\\frac{7}{3}$', '$\\frac{7}{3}$'), isSolved: (state) => state.dividend * 3 === state.divisor * 7 && divisionStatus(state) === 'periodic' },
    { id: 13604, prompt: say('Lortu $6{,}25$.', 'Consigue $6{,}25$.', 'احصل على $6{,}25$.'), hint: say('$6{,}25=\\frac{25}{4}$', '$6{,}25=\\frac{25}{4}$', '$6{,}25=\\frac{25}{4}$'), isSolved: (state) => state.dividend * 4 === state.divisor * 25 && divisionStatus(state) === 'exact' }
]

/* ---------- 7. The jumping comma: · 10 and : 10 ---------- */

export const shiftBases = ['4,739', '834,7', '0,78', '12,5'] as const
export const SHIFT_LIMIT = 3

export interface ShiftState {
    base: number
    /** Powers of ten: 2 is · 100, −1 is : 10 */
    shift: number
    /** Shifts reached with each base */
    seen: Record<number, number[]>
}

export const initialShiftState: ShiftState = { base: 0, shift: 0, seen: { 0: [0] } }

function remember(state: ShiftState): ShiftState {
    const seen = state.seen[state.base] ?? []
    return seen.includes(state.shift) ? state : { ...state, seen: { ...state.seen, [state.base]: [...seen, state.shift] } }
}

export const setShiftBase = (state: ShiftState, base: number) => remember({ ...state, base: clamp(base, 0, shiftBases.length - 1), shift: 0 })
export const moveShift = (state: ShiftState, by: number) => remember({ ...state, shift: clamp(state.shift + by, -SHIFT_LIMIT, SHIFT_LIMIT) })

/** The number after the shift, without zeros that change nothing */
export function shiftedText(base: number, shift: number): string {
    const value = exact(shiftBases[base])
    const places = value.places - shift
    const result = places >= 0 ? { units: value.units, places } : { units: value.units * 10 ** -places, places: 0 }
    const text = writeExact(result)
    return result.places > 0 ? text.replace(/0+$/, '').replace(/,$/, '') : text
}

const reached = (state: ShiftState, base: number, shift: number) => (state.seen[base] ?? []).includes(shift)

export const shiftChallenges: LabChallenge<ShiftState>[] = [
    { id: 13701, prompt: say('$4{,}739$-tik abiatuta, lortu $4739$.', 'Desde $4{,}739$, consigue $4739$.', 'ابدأ من $4{,}739$ واحصل على $4739$.'), hint: say('Koma hiru toki eskuinera: $\\cdot 1000$.', 'La coma tres lugares a la derecha: $\\cdot 1000$.', 'الفاصلة ثلاث منازل يمينًا: $\\cdot 1000$.'), isSolved: (state) => reached(state, 0, 3) },
    { id: 13702, prompt: say('$834{,}7$-tik abiatuta, lortu $8{,}347$.', 'Desde $834{,}7$, consigue $8{,}347$.', 'ابدأ من $834{,}7$ واحصل على $8{,}347$.'), hint: say('Koma bi toki ezkerrera: $\\mathbin{:}100$.', 'La coma dos lugares a la izquierda: $\\mathbin{:}100$.', 'الفاصلة منزلتين يسارًا: $\\mathbin{:}100$.'), isSolved: (state) => reached(state, 1, -2) },
    { id: 13703, prompt: say('$0{,}78$-tik abiatuta, lortu $78$.', 'Desde $0{,}78$, consigue $78$.', 'ابدأ من $0{,}78$ واحصل على $78$.'), hint: say('Zenbat toki behar ditu komak?', '¿Cuántos lugares tiene que saltar la coma?', 'كم منزلة يجب أن تقفز الفاصلة؟'), isSolved: (state) => reached(state, 2, 2) },
    { id: 13704, prompt: say('$12{,}5$-etik abiatuta, lortu $0{,}0125$.', 'Desde $12{,}5$, consigue $0{,}0125$.', 'ابدأ من $12{,}5$ واحصل على $0{,}0125$.'), hint: say('Zatitu 1000ez: zeroak sartu behar dira aurrean.', 'Divide entre 1000: hay que poner ceros delante.', 'اقسم على 1000: يجب وضع أصفار في البداية.'), isSolved: (state) => reached(state, 3, -3) }
]

/* ---------- 8. Where does the comma go in a product? ---------- */

export const commaProducts: Array<[string, string]> = [
    ['2,7', '1,5'],
    ['3,8', '12'],
    ['2,75', '1,3'],
    ['3,64', '1,23'],
    ['0,3', '0,02']
]

export interface CommaState {
    product: number
    /** Decimal places the learner gives the result */
    places: number
    /** Products placed right after pressing "check" */
    solved: number[]
    /** The last check was wrong */
    wrong: boolean
}

export const initialCommaState: CommaState = { product: 0, places: 0, solved: [], wrong: false }

/** The product without commas, and how many decimal places it needs */
export function commaProduct(product: number): { digits: number; places: number } {
    const [a, b] = commaProducts[product].map(exact)
    return { digits: a.units * b.units, places: a.places + b.places }
}

export const setCommaProduct = (state: CommaState, product: number): CommaState => ({ ...state, product: clamp(product, 0, commaProducts.length - 1), places: 0, wrong: false })
export const setCommaPlaces = (state: CommaState, places: number): CommaState => ({ ...state, places: clamp(places, 0, 5), wrong: false })

/** The result as the learner placed it (zeros in front when needed) */
export const placedText = (state: Pick<CommaState, 'product' | 'places'>) => writeExact({ units: commaProduct(state.product).digits, places: state.places })

export function checkComma(state: CommaState): CommaState {
    const right = state.places === commaProduct(state.product).places
    return { ...state, wrong: !right, solved: right && !state.solved.includes(state.product) ? [...state.solved, state.product] : state.solved }
}

export const commaChallenges: LabChallenge<CommaState>[] = [
    { id: 13801, prompt: say('Jarri koma ondo $2{,}7\\cdot 1{,}5$ biderkaduran.', 'Coloca bien la coma en $2{,}7\\cdot 1{,}5$.', 'ضع الفاصلة في مكانها في $2{,}7\\cdot 1{,}5$.'), hint: say('Zifra hamartar bat gehi bat.', 'Una cifra decimal más una.', 'رقم عشري زائد رقم.'), isSolved: (state) => state.solved.includes(0) },
    { id: 13802, prompt: say('Jarri koma ondo $0{,}3\\cdot 0{,}02$ biderkaduran.', 'Coloca bien la coma en $0{,}3\\cdot 0{,}02$.', 'ضع الفاصلة في مكانها في $0{,}3\\cdot 0{,}02$.'), hint: say('Hiru zifra hamartar behar dira, eta 6 bakarrik dago: zeroak aurrean.', 'Hacen falta tres cifras decimales y solo hay un 6: ceros delante.', 'نحتاج ثلاثة أرقام عشرية وليس عندنا إلا 6: أصفار في البداية.'), isSolved: (state) => state.solved.includes(4) },
    { id: 13803, prompt: say('Jarri koma ondo bost biderkaduretan.', 'Coloca bien la coma en los cinco productos.', 'ضع الفاصلة في مكانها في الضربات الخمس.'), hint: say('Zenbatu bi faktoreen zifra hamartarrak.', 'Cuenta las cifras decimales de los dos factores.', 'عُدّ الأرقام العشرية في العاملين.'), isSolved: (state) => commaProducts.every((_, product) => state.solved.includes(product)) }
]

/* ---------- 9. Taking the comma out of the divisor ---------- */

export const balancePairs: Array<[string, string]> = [
    ['1,28', '0,2'],
    ['9,5', '0,25'],
    ['7', '0,05'],
    ['158,75', '1,25']
]

export interface BalanceState {
    pair: number
    /** How many times both were multiplied by 10 */
    times: number
    /** Pairs whose divisor became a whole number, with the fewest steps */
    cleared: number[]
}

export const initialBalanceState: BalanceState = { pair: 0, times: 0, cleared: [] }

/** Dividend and divisor after multiplying both by 10 `times` times */
export function balanceTerms(pair: number, times: number): { dividend: Exact; divisor: Exact } {
    const move = (value: Exact): Exact => (times <= value.places ? { units: value.units, places: value.places - times } : { units: value.units * 10 ** (times - value.places), places: 0 })
    const [dividend, divisor] = balancePairs[pair].map(exact)
    return { dividend: move(dividend), divisor: move(divisor) }
}

/** The fewest steps that leave the divisor without a comma */
export const stepsNeeded = (pair: number) => exact(balancePairs[pair][1]).places

/** The quotient, which never changes */
export function balanceQuotient(pair: number): Exact {
    const [dividend, divisor] = balancePairs[pair].map(exact)
    // dividend / divisor with both scaled to the same places, written exactly with up to 4 decimals
    const places = Math.max(dividend.places, divisor.places)
    const top = widen(dividend, places).units * 10000
    const bottom = widen(divisor, places).units
    let units = top / bottom
    let resultPlaces = 4
    while (resultPlaces > 0 && units % 10 === 0) {
        units /= 10
        resultPlaces -= 1
    }
    return { units, places: resultPlaces }
}

export const setBalancePair = (state: BalanceState, pair: number): BalanceState => ({ ...state, pair: clamp(pair, 0, balancePairs.length - 1), times: 0 })

export function multiplyBoth(state: BalanceState): BalanceState {
    const times = Math.min(3, state.times + 1)
    const cleared = times === stepsNeeded(state.pair) && !state.cleared.includes(state.pair) ? [...state.cleared, state.pair] : state.cleared
    return { ...state, times, cleared }
}

export const resetBalance = (state: BalanceState): BalanceState => ({ ...state, times: 0 })

export const balanceChallenges: LabChallenge<BalanceState>[] = [
    { id: 13901, prompt: say('Kendu koma zatitzaileari $1{,}28\\mathbin{:}0{,}2$ zatiketan.', 'Quita la coma al divisor en $1{,}28\\mathbin{:}0{,}2$.', 'احذف فاصلة المقسوم عليه في $1{,}28\\mathbin{:}0{,}2$.'), hint: say('Zatitzaileak zifra hamartar bat du.', 'El divisor tiene una cifra decimal.', 'للمقسوم عليه رقم عشري واحد.'), isSolved: (state) => state.cleared.includes(0) },
    { id: 13902, prompt: say('Kendu koma $9{,}5\\mathbin{:}0{,}25$ zatiketan.', 'Quita la coma en $9{,}5\\mathbin{:}0{,}25$.', 'احذف الفاصلة في $9{,}5\\mathbin{:}0{,}25$.'), hint: say('Bi zifra hamartar: bi aldiz $\\cdot 10$.', 'Dos cifras decimales: dos veces $\\cdot 10$.', 'رقمان عشريان: مرتين $\\cdot 10$.'), isSolved: (state) => state.cleared.includes(1) },
    { id: 13903, prompt: say('Kendu koma zatitzaileari lau zatiketetan.', 'Quita la coma al divisor en las cuatro divisiones.', 'احذف فاصلة المقسوم عليه في القسمات الأربع.'), hint: say('Zatikizunari zifrak falta bazaizkio, zeroak gehitzen zaizkio: $7\\to 700$.', 'Si al dividendo le faltan cifras, se le añaden ceros: $7\\to 700$.', 'إذا نقصت المقسومَ أرقام نضيف أصفارًا: $7\\to 700$.'), isSolved: (state) => balancePairs.every((_, pair) => state.cleared.includes(pair)) }
]

export const decimalsLabChallengeIds = [
    ...gridChallenges,
    ...placeChallenges,
    ...compareChallenges,
    ...zoomChallenges,
    ...roundingChallenges,
    ...divisionChallenges,
    ...shiftChallenges,
    ...commaChallenges,
    ...balanceChallenges
].map((challenge) => challenge.id)
