import { add, divide, equals, fraction, multiply, subtract, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { ProportionDbh4ApStageId } from '../lessons.tsx'
import { classifyChallenges } from '../../dbh1-proportzionaltasuna-v2/lab/labTools.ts'
import { chainChallenges, compoundChallenges, interestChallenges, shareChallenges } from '../../dbh2-proportzionaltasuna-v2/lab/labTools.ts'

/* ==========================================================================
   Proportzionaltasuna (4. DBH aplikatuak) laboratory. The magnitude sorter
   comes from 1. DBH, and the compound machine, the shares, the chained
   percentages and simple interest from 2. DBH, with their own challenges.
   The new tools are compound interest with capitalisation periods (side by
   side with simple interest), a two-ingredient mixture, two vehicles on a
   road with a clock, and taps filling a tank. Pure state logic; the
   components live next to this file. Tests in
   tests/proportzionaltasuna-dbh4ap-lab.test.ts.
   ========================================================================== */

export type ProportionDbh4ApLabToolId = 'classify' | 'compound' | 'share' | 'chain' | 'interest' | 'growth' | 'mixture' | 'motion' | 'taps'

export interface ProportionDbh4ApLabTool extends LabToolInfo {
    id: ProportionDbh4ApLabToolId
    stage: ProportionDbh4ApStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string) => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const n = (value: number) => fraction(value)

export const proportionDbh4ApLabTools: ProportionDbh4ApLabTool[] = [
    { id: 'classify', stage: 'simple', lessonTopic: 'relations', title: say('Zuzena, alderantzizkoa ala bat ere ez', 'Directa, inversa o ninguna', 'طردي أم عكسي أم لا شيء'), observe: say('Bikoitza → bikoitza: zuzena. Bikoitza → erdia: alderantzizkoa. Handitzea bakarrik ez da nahikoa: proportzio berean handitu behar du.', 'Doble → doble: directa. Doble → mitad: inversa. No basta con crecer: tiene que crecer en la misma proporción.', 'الضعف ← الضعف: طردي. الضعف ← النصف: عكسي. ولا تكفي الزيادة: يجب أن تكون بالنسبة نفسها.') },
    { id: 'compound', stage: 'compound', lessonTopic: 'compound', title: say('Proportzionaltasun konposatuaren makina', 'La máquina de proporcionalidad compuesta', 'آلة التناسب المركّب'), observe: say('Magnitude bakoitzeko erabaki: zuzena (berria/zaharra) ala alderantzizkoa (zaharra/berria). Ezezaguna zatiki guztiez biderkatzen da.', 'Para cada magnitud decide: directa (nuevo/viejo) o inversa (viejo/nuevo). La incógnita se multiplica por todas las fracciones.', 'قرّر لكل مقدار: طردي (الجديد/القديم) أم عكسي (القديم/الجديد). ويُضرب المجهول في كل الكسور.') },
    { id: 'share', stage: 'compound', lessonTopic: 'direct-share', title: say('Banaketak', 'Repartos', 'التوزيعات'), observe: say('Zuzenean zenbaki handienak zati handiena hartzen du; alderantzizkoan, txikiena. Zatien batura beti kantitate osoa da.', 'En el directo el número mayor se lleva la parte mayor; en el inverso, la menor. Las partes siempre suman la cantidad entera.', 'في الطردي يأخذ العدد الأكبر الجزء الأكبر؛ وفي العكسي الأصغر. ومجموع الأجزاء يساوي الكمية كلها دائمًا.') },
    { id: 'chain', stage: 'percent', lessonTopic: 'chained', title: say('Ehuneko kateatuak', 'Porcentajes encadenados', 'النسب المتتالية'), observe: say('Aldaketa bakoitza bere indizeaz biderkatzen da. % 10 igo eta % 10 jaitsiz gero, ez da hasierara itzultzen.', 'Cada cambio multiplica por su índice. Si subes un 10 % y bajas un 10 %, no vuelves al principio.', 'كل تغيّر يضرب في مؤشره. إذا زدت 10٪ ثم خفّضت 10٪ فلن تعود إلى البداية.') },
    { id: 'interest', stage: 'interest', lessonTopic: 'simple-interest', title: say('Interes bakuna', 'Interés simple', 'الفائدة البسيطة'), observe: say('Urtero interes bera gehitzen da, hasierako kapitalaren % r. Urte bikoitza edo tasa bikoitza → interes bikoitza.', 'Cada año se suma el mismo interés, el r % del capital inicial. El doble de años o el doble de tipo → el doble de interés.', 'تُضاف كل سنة الفائدة نفسها، r٪ من رأس المال الأصلي. ضعف السنوات أو ضعف السعر ← ضعف الفائدة.') },
    { id: 'growth', stage: 'interest', lessonTopic: 'compound-interest', title: say('Bakuna ala konposatua', 'Simple o compuesto', 'بسيطة أم مركّبة'), observe: say('Lehen urtean biak berdinak dira; gero konposatua aurrera doa, interesak ere interesa sortzen duelako. Aldi gehiago (k) → apur bat gehiago.', 'El primer año los dos coinciden; después el compuesto se adelanta, porque el interés también produce interés. Más periodos (k) → algo más.', 'في السنة الأولى يتساويان؛ ثم تتقدم المركّبة لأن الفائدة تُنتج فائدة. فترات أكثر (k) ← أكثر قليلًا.') },
    { id: 'mixture', stage: 'problems', lessonTopic: 'mixtures', title: say('Nahasketa', 'La mezcla', 'الخليط'), observe: say('Prezio ertaina beti bi prezioen artean dago, eta kantitate handiena duenetik hurbilago. Kantitate berdinekin, erdian.', 'El precio medio siempre queda entre los dos precios, y más cerca del que tiene más cantidad. Con cantidades iguales, justo en medio.', 'يقع السعر المتوسط دائمًا بين السعرين، وأقرب إلى الأكثر كمية. وبكميتين متساويتين في المنتصف تمامًا.') },
    { id: 'motion', stage: 'problems', lessonTopic: 'motion', title: say('Bi ibilgailu errepidean', 'Dos vehículos en la carretera', 'مركبتان على الطريق'), observe: say('Elkarrengana doazenean tartea abiaduren baturan txikitzen da; atzetik doazenean, abiaduren kenduran. Azkarrena atzean ez badago, ez dira inoiz elkartzen.', 'Al encuentro, la distancia se acorta a la suma de las velocidades; en una persecución, a su diferencia. Si el rápido no va detrás, no se encuentran nunca.', 'في التلاقي تقصر المسافة بمجموع السرعتين، وفي المطاردة بفرقهما. وإذا لم يكن الأسرع في الخلف فلن يلتقيا أبدًا.') },
    { id: 'taps', stage: 'problems', lessonTopic: 'taps', title: say('Txorrotak eta hustubidea', 'Grifos y desagüe', 'الصنابير والمصرف'), observe: say('Ordu bateko zatiak batzen dira (eta hustubidearena kendu). Denbora osoa zati horren alderantzizkoa da.', 'Se suman las partes de una hora (y se resta la del desagüe). El tiempo total es el inverso de esa parte.', 'نجمع أجزاء الساعة (ونطرح جزء المصرف). والزمن الكلي مقلوب ذلك الجزء.') }
]

export const proportionDbh4ApLabToolForTopic: Record<string, ProportionDbh4ApLabToolId | undefined> = {
    relations: 'classify',
    'direct-rule': 'classify',
    'inverse-rule': 'classify',
    compound: 'compound',
    'direct-share': 'share',
    'inverse-share': 'share',
    'percent-calc': 'chain',
    index: 'chain',
    chained: 'chain',
    'simple-interest': 'interest',
    'compound-interest': 'growth',
    periods: 'growth',
    mixtures: 'mixture',
    motion: 'motion',
    taps: 'taps'
}

/* ---------- 1. Simple or compound interest ---------- */

export const GROWTH_CAPITALS = [1000, 2000, 5000, 10000] as const
export const GROWTH_PERIODS = [1, 2, 4, 12] as const
export const GROWTH_RATE_MAX = 12
export const GROWTH_YEARS_MAX = 10

export interface GrowthState {
    capital: number
    rate: number
    years: number
    /** Capitalisation periods per year */
    periods: number
}

export const initialGrowthState: GrowthState = { capital: 1000, rate: 10, years: 3, periods: 1 }

export const setGrowth = (state: GrowthState, patch: Partial<GrowthState>): GrowthState => ({
    capital: patch.capital ?? state.capital,
    rate: clamp(patch.rate ?? state.rate, 1, GROWTH_RATE_MAX),
    years: clamp(patch.years ?? state.years, 1, GROWTH_YEARS_MAX),
    periods: patch.periods ?? state.periods
})

/** Simple interest after `year` years: C · (1 + r · t / 100), exact */
export const simpleAfter = (state: GrowthState, year: number) => fraction(state.capital * (100 + state.rate * year), 100)
/** Compound after `year` years with k periods: C · (1 + r / 100k)^(k t); the powers are too big for exact fractions */
export const compoundAfter = (state: GrowthState, year: number) => state.capital * (1 + state.rate / (100 * state.periods)) ** (state.periods * year)
/** Money is shown rounded to the cent */
export const cents = (value: number) => Math.round(value * 100) / 100

export const growthChallenges: LabChallenge<GrowthState>[] = [
    { id: 43101, prompt: say('Ikusi lezioaren adibidea: 1000 € % 10ean 3 urtez, urtean behin. Zenbat konposatuan?', 'Mira el ejemplo de la lección: 1000 € al 10 % durante 3 años, anual. ¿Cuánto en compuesto?', 'شاهد مثال الدرس: 1000 € بفائدة 10٪ مدة 3 سنوات سنويًا. كم في المركّبة؟'), hint: say('$1000\\cdot 1{,}1^{3}=1331$.', '$1000\\cdot 1{,}1^{3}=1331$.', '$1000\\cdot 1{,}1^{3}=1331$.'), isSolved: (state) => state.capital === 1000 && state.rate === 10 && state.years === 3 && state.periods === 1 },
    { id: 43102, prompt: say('Lortu konposatuak bakunari 5000 € baino gehiago ateratzea.', 'Consigue que el compuesto saque más de 5000 € al simple.', 'اجعل المركّبة تزيد على البسيطة بأكثر من 5000 €.'), hint: say('Kapital handia, tasa handia eta urte asko.', 'Capital grande, tipo alto y muchos años.', 'رأس مال كبير وسعر مرتفع وسنوات كثيرة.'), isSolved: (state) => compoundAfter(state, state.years) - toNumber(simpleAfter(state, state.years)) > 5000 },
    { id: 43103, prompt: say('% 12an, urtean behin: zenbat urtetan bikoizten da kapitala lehen aldiz?', 'Al 12 %, anual: ¿en cuántos años se dobla el capital por primera vez?', 'بفائدة 12٪ سنويًا: بعد كم سنة يتضاعف رأس المال أول مرة؟'), hint: say('$1{,}12^{6}<2<1{,}12^{7}$.', '$1{,}12^{6}<2<1{,}12^{7}$.', '$1{,}12^{6}<2<1{,}12^{7}$.'), isSolved: (state) => state.rate === 12 && state.periods === 1 && compoundAfter(state, state.years) >= 2 * state.capital && compoundAfter(state, state.years - 1) < 2 * state.capital },
    { id: 43104, prompt: say('10 000 € % 12an urtebetez, interesak hilero. Zenbat?', '10 000 € al 12 % durante un año, con intereses mensuales. ¿Cuánto?', '10000 € بفائدة 12٪ سنة واحدة مع فوائد شهرية. كم؟'), hint: say('$k=12$: % 1 hilero.', '$k=12$: un 1 % cada mes.', '$k=12$: 1٪ كل شهر.'), isSolved: (state) => state.capital === 10000 && state.rate === 12 && state.years === 1 && state.periods === 12 }
]

/* ---------- 2. A mixture of two ingredients ---------- */

/** Prices in cents per kilo, from the textbook problems */
export const MIXTURE_PRICES = [520, 600, 740, 950, 1000, 1240, 1500] as const
export const MIXTURE_KILOS_MAX = 30

export interface MixtureState {
    kilos: [number, number]
    /** Cents per kilo */
    prices: [number, number]
}

export const initialMixtureState: MixtureState = { kilos: [12, 8], prices: [1240, 740] }

export function setMixture(state: MixtureState, patch: { kilos?: [0 | 1, number]; price?: [0 | 1, number] }): MixtureState {
    const kilos: [number, number] = [...state.kilos]
    const prices: [number, number] = [...state.prices]
    if (patch.kilos) kilos[patch.kilos[0]] = clamp(patch.kilos[1], 1, MIXTURE_KILOS_MAX)
    if (patch.price) prices[patch.price[0]] = patch.price[1]
    return { kilos, prices }
}

/** Total cost in euros, exact */
export const mixtureCost = (state: MixtureState) => fraction(state.kilos[0] * state.prices[0] + state.kilos[1] * state.prices[1], 100)
/** Mean price in euros per kilo, exact */
export const mixturePrice = (state: MixtureState) => divide(mixtureCost(state), n(state.kilos[0] + state.kilos[1]))

export const mixtureChallenges: LabChallenge<MixtureState>[] = [
    { id: 43201, prompt: say('Egin lezioaren kafea: 12 kg 12,40 €-an eta 8 kg 7,40 €-an.', 'Haz el café de la lección: 12 kg a 12,40 € y 8 kg a 7,40 €.', 'اصنع بن الدرس: 12 كغ بـ12.40 € و8 كغ بـ7.40 €.'), hint: say('Prezio ertaina 10,40 €/kg.', 'El precio medio es 10,40 €/kg.', 'السعر المتوسط 10.40 €/كغ.'), isSolved: (state) => equals(mixturePrice(state), fraction(1040, 100)) && state.kilos.includes(12) && state.kilos.includes(8) },
    { id: 43202, prompt: say('Lortu prezio ertaina bi prezioen erdian geratzea, prezio desberdinekin.', 'Consigue que el precio medio quede justo en medio de los dos, con precios distintos.', 'اجعل السعر المتوسط في منتصف السعرين تمامًا، بسعرين مختلفين.'), hint: say('Kantitate berdinak.', 'Cantidades iguales.', 'كميتان متساويتان.'), isSolved: (state) => state.prices[0] !== state.prices[1] && equals(mixturePrice(state), fraction(state.prices[0] + state.prices[1], 200)) },
    { id: 43203, prompt: say('10 kg kafe 9,50 €-an daude. Zenbat kg 15 €-ko kafe gehitu behar dira 12,50 €/kg lortzeko?', 'Hay 10 kg de café a 9,50 €. ¿Cuántos kg de café a 15 € hay que añadir para que salga a 12,50 €/kg?', 'لدينا 10 كغ من البن بـ9.50 €. كم كيلوغرامًا من البن بـ15 € نضيف ليصير السعر 12.50 €/كغ؟'), hint: say('$15x+95=12{,}5\\cdot(10+x)$.', '$15x+95=12{,}5\\cdot(10+x)$.', '$15x+95=12{,}5\\cdot(10+x)$.'), isSolved: (state) => equals(mixturePrice(state), fraction(1250, 100)) && state.prices.includes(1500) && state.prices.includes(950) },
    { id: 43204, prompt: say('Egin 5,75 €-an saltzeko nahasketa: 7,40 €-ko ardoa eta 5,20 €-koa.', 'Haz una mezcla que salga a 5,75 €: vino de 7,40 € y de 5,20 €.', 'اصنع خليطًا سعره 5.75 €: نبيذ بـ7.40 € وآخر بـ5.20 €.'), hint: say('1 eta 3 arteko proportzioa.', 'En proporción 1 a 3.', 'بنسبة 1 إلى 3.'), isSolved: (state) => equals(mixturePrice(state), fraction(575, 100)) && state.prices.includes(740) && state.prices.includes(520) }
]

/* ---------- 3. Two vehicles on a road ---------- */

export type MotionMode = 'meet' | 'chase'
export const MOTION_DISTANCES = [60, 75, 120, 240, 300] as const
export const SPEED_MIN = 10
export const SPEED_MAX = 150
export const SPEED_STEP = 10
export const CLOCK_MAX = 300
export const CLOCK_STEP = 5

export interface MotionState {
    mode: MotionMode
    /** Kilometres between them at the start */
    distance: number
    /** km/h of the vehicle on the left (A) and on the right (B) */
    speeds: [number, number]
    /** Minutes since they set off */
    minutes: number
}

export const initialMotionState: MotionState = { mode: 'meet', distance: 240, speeds: [70, 110], minutes: 0 }

export function setMotion(state: MotionState, patch: { mode?: MotionMode; distance?: number; speed?: [0 | 1, number]; minutes?: number }): MotionState {
    const speeds: [number, number] = [...state.speeds]
    if (patch.speed) speeds[patch.speed[0]] = clamp(Math.round(patch.speed[1] / SPEED_STEP) * SPEED_STEP, SPEED_MIN, SPEED_MAX)
    return {
        mode: patch.mode ?? state.mode,
        distance: patch.distance ?? state.distance,
        speeds,
        minutes: clamp(Math.round((patch.minutes ?? state.minutes) / CLOCK_STEP) * CLOCK_STEP, 0, CLOCK_MAX)
    }
}

/** How fast the gap closes, km/h: the sum when meeting, the difference when chasing (negative: it grows) */
export const closingSpeed = (state: MotionState) => (state.mode === 'meet' ? state.speeds[0] + state.speeds[1] : state.speeds[0] - state.speeds[1])
/** Minutes until they meet, exact, or null if they never do */
export const meetingMinutes = (state: MotionState): FractionValue | null => (closingSpeed(state) > 0 ? fraction(60 * state.distance, closingSpeed(state)) : null)
/** Kilometres from A's start to each vehicle after the chosen minutes; B starts at the distance */
export function positions(state: MotionState): [FractionValue, FractionValue] {
    const hours = fraction(state.minutes, 60)
    const a = multiply(n(state.speeds[0]), hours)
    const bTravel = multiply(n(state.speeds[1]), hours)
    return [a, state.mode === 'meet' ? subtract(n(state.distance), bTravel) : add(n(state.distance), bTravel)]
}
/** The clock stands exactly at the meeting */
export const atMeeting = (state: MotionState) => {
    const meeting = meetingMinutes(state)
    return meeting !== null && equals(meeting, n(state.minutes))
}

export const motionChallenges: LabChallenge<MotionState>[] = [
    { id: 43301, prompt: say('240 km, 70 eta 110 km/h, elkarrengana: jarri erlojua gurutzatzen diren unean.', '240 km, a 70 y 110 km/h, al encuentro: pon el reloj en el momento en que se cruzan.', '240 كم، بسرعة 70 و110 كم/س، تلاقٍ: ضع الساعة لحظة التقاطع.'), hint: say('$240\\mathbin{:}180$ h = 80 min.', '$240\\mathbin{:}180$ h = 80 min.', '$240\\mathbin{:}180$ س = 80 د.'), isSolved: (state) => state.mode === 'meet' && state.distance === 240 && state.speeds[0] === 70 && state.speeds[1] === 110 && atMeeting(state) },
    { id: 43302, prompt: say('Jazarpena: autoa 120 km/h-ra, kamioia 90 km/h-ra 75 km aurrerago. Jarri erlojua harrapatzen duen unean.', 'Persecución: coche a 120 km/h, camión a 90 km/h 75 km por delante. Pon el reloj cuando lo alcanza.', 'مطاردة: سيارة بسرعة 120 كم/س وشاحنة بسرعة 90 كم/س أمامها بـ75 كم. ضع الساعة لحظة اللحاق.'), hint: say('$75\\mathbin{:}30=2{,}5$ h.', '$75\\mathbin{:}30=2{,}5$ h.', '$75\\mathbin{:}30=2{,}5$ س.'), isSolved: (state) => state.mode === 'chase' && state.distance === 75 && state.speeds[0] === 120 && state.speeds[1] === 90 && atMeeting(state) },
    { id: 43303, prompt: say('Elkarrengana, lortu zehazki ordu betean elkartzea.', 'Al encuentro, consigue que se crucen justo en una hora.', 'في التلاقي، اجعلهما يتقاطعان بعد ساعة تمامًا.'), hint: say('Abiaduren batura = distantzia.', 'La suma de las velocidades = la distancia.', 'مجموع السرعتين = المسافة.'), isSolved: (state) => state.mode === 'meet' && equals(meetingMinutes(state) ?? n(-1), n(60)) },
    { id: 43304, prompt: say('Jazarpenean, prestatu inoiz elkartzen ez diren kasu bat.', 'En la persecución, prepara un caso en el que no se encuentren nunca.', 'في المطاردة، جهّز حالة لا يلتقيان فيها أبدًا.'), hint: say('Atzekoa ez da azkarragoa.', 'El de atrás no es más rápido.', 'الخلفي ليس أسرع.'), isSolved: (state) => state.mode === 'chase' && meetingMinutes(state) === null }
]

/* ---------- 4. Taps and a drain ---------- */

export const TAP_HOURS_MAX = 12

export interface TapsState {
    /** Hours each tap takes alone; 0 = closed */
    taps: [number, number]
    /** Hours the drain takes to empty the full tank; 0 = plugged */
    drain: number
}

export const initialTapsState: TapsState = { taps: [5, 7], drain: 0 }

export function setTaps(state: TapsState, patch: { tap?: [0 | 1, number]; drain?: number }): TapsState {
    const taps: [number, number] = [...state.taps]
    if (patch.tap) taps[patch.tap[0]] = clamp(patch.tap[1], patch.tap[0] === 0 ? 1 : 0, TAP_HOURS_MAX)
    return { taps, drain: clamp(patch.drain ?? state.drain, 0, TAP_HOURS_MAX) }
}

const perHour = (hours: number) => (hours > 0 ? fraction(1, hours) : n(0))
/** Part of the tank filled in one hour (negative if the drain wins) */
export const fillRate = (state: TapsState) => subtract(add(perHour(state.taps[0]), perHour(state.taps[1])), perHour(state.drain))
/** Hours to fill the empty tank, or null if it never fills */
export const fillHours = (state: TapsState): FractionValue | null => {
    const rate = fillRate(state)
    return rate.numerator > 0 ? divide(n(1), rate) : null
}

export const tapsChallenges: LabChallenge<TapsState>[] = [
    { id: 43401, prompt: say('Lezioaren biltegia: A 5 h-tan eta B 7 h-tan. Zenbat biak batera?', 'El depósito de la lección: A en 5 h y B en 7 h. ¿Cuánto los dos juntos?', 'خزان الدرس: أ في 5 س وب في 7 س. كم معًا؟'), hint: say('$\\frac{35}{12}$ h.', '$\\frac{35}{12}$ h.', '$\\frac{35}{12}$ س.'), isSolved: (state) => [...state.taps].sort((a, b) => a - b).join() === '5,7' && state.drain === 0 },
    { id: 43402, prompt: say('Bi txorrotarekin, bete biltegia zehazki 2 orduan.', 'Con dos grifos, llena el depósito en 2 horas justas.', 'بصنبورين، املأ الخزان في ساعتين تمامًا.'), hint: say('$\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$.', '$\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$.', '$\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$.'), isSolved: (state) => state.taps[1] > 0 && state.drain === 0 && equals(fillHours(state) ?? n(0), n(2)) },
    { id: 43403, prompt: say('Ireki hustubidea eta lortu biltegia inoiz ez betetzea.', 'Abre el desagüe y consigue que el depósito no se llene nunca.', 'افتح المصرف واجعل الخزان لا يمتلئ أبدًا.'), hint: say('Hustubideak txorrotek baino gehiago atera behar du.', 'El desagüe tiene que sacar más de lo que entra.', 'يجب أن يُخرج المصرف أكثر مما يدخل.'), isSolved: (state) => state.drain > 0 && fillHours(state) === null },
    { id: 43404, prompt: say('Hustubidea irekita, bete biltegia zehazki ordu eta erdian.', 'Con el desagüe abierto, llena el depósito en hora y media justa.', 'والمصرف مفتوح، املأ الخزان في ساعة ونصف تمامًا.'), hint: say('$\\frac{1}{2}+\\frac{1}{3}-\\frac{1}{6}=\\frac{2}{3}$.', '$\\frac{1}{2}+\\frac{1}{3}-\\frac{1}{6}=\\frac{2}{3}$.', '$\\frac{1}{2}+\\frac{1}{3}-\\frac{1}{6}=\\frac{2}{3}$.'), isSolved: (state) => state.drain > 0 && equals(fillHours(state) ?? n(0), fraction(3, 2)) }
]

/* ---------- Progress ids: the reused tools' challenges, then the new ones ---------- */

export const proportionDbh4ApLabChallengeIds = [
    ...classifyChallenges,
    ...compoundChallenges,
    ...shareChallenges,
    ...chainChallenges,
    ...interestChallenges,
    ...growthChallenges,
    ...mixtureChallenges,
    ...motionChallenges,
    ...tapsChallenges
].map((challenge) => challenge.id)
