import { add, divide, equals, fraction, gcd, multiply, subtract, toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import type { ProportionDbh4ApStageId } from '../lessons.tsx'
import { classifyChallenges } from '../../dbh1-proportzionaltasuna-v2/lab/labTools.ts'
import { chainChallenges, compoundChallenges, interestChallenges, shareChallenges } from '../../dbh2-proportzionaltasuna-v2/lab/labTools.ts'
import { percentBarChallenges } from './percentBar.ts'
import { receiptChallenges } from './receipt.ts'
import { roadGraphChallenges } from './roadGraph.ts'
import { ruleChallenges } from './ruleOfThree.ts'

/* ==========================================================================
   Proportzionaltasuna (4. DBH aplikatuak) laboratory. The magnitude sorter
   comes from 1. DBH, and the compound machine, the shares, the chained
   percentages and simple interest from 2. DBH, with their own challenges.
   The new tools are compound interest with capitalisation periods (side by
   side with simple interest), a two-ingredient mixture, two vehicles on a
   road with a clock, and taps filling a tank. Each new tool asks for a
   prediction before it shows its result, and makes endless challenges
   once the fixed ones are done. Pure state logic; the components live
   next to this file. Tests in tests/proportzionaltasuna-dbh4ap-lab.test.ts
   and tests/proportzionaltasuna-dbh4ap-extra.test.ts.
   ========================================================================== */

export type ProportionDbh4ApLabToolId = 'classify' | 'rule' | 'compound' | 'share' | 'percentbar' | 'chain' | 'receipt' | 'interest' | 'growth' | 'mixture' | 'motion' | 'graph' | 'taps'

export interface ProportionDbh4ApLabTool extends LabToolInfo {
    id: ProportionDbh4ApLabToolId
    stage: ProportionDbh4ApStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string) => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const n = (value: number) => fraction(value)

/* ---------- Predictions and endless challenges, shared by the new tools ---------- */

/** A guess made before seeing the result: below, equal to or above a reference */
export type Prediction = '<' | '=' | '>'

const compareTo = (value: number, reference: number): Prediction => (Math.abs(value - reference) < 1e-9 ? '=' : value < reference ? '<' : '>')

/** The first guess stays: a prediction is not changed after seeing whether it was right */
export const setPrediction = <State extends { prediction: Prediction | null }>(state: State, prediction: Prediction): State =>
    state.prediction === null ? { ...state, prediction } : state

/** An endless challenge is never already solved by the tool's first state */
function freshFrom<State>(start: State, maker: LabChallengeMaker<State>): LabChallengeMaker<State> {
    return (random) => {
        for (;;) {
            const challenge = maker(random)
            if (!challenge.isSolved(start)) return challenge
        }
    }
}

/** A number for a sentence: 10 000 with a space in Basque and Spanish, plain in Arabic */
const big = (value: number) => (value >= 10000 ? String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(value))
/** Cents as euros for a sentence: 12,40 (12.40 in Arabic) */
const euros = (cents: number, point = false) => {
    const text = cents % 100 === 0 ? String(cents / 100) : (cents / 100).toFixed(2)
    return point ? text : text.replace('.', ',')
}
/** Cents as euros inside LaTeX: 12{,}40 */
const eurosLatex = (cents: number) => euros(cents).replace(',', '{,}')
/** An exact decimal inside LaTeX: 1{,}05 */
const decimalLatex = (value: FractionValue) => (toExactDecimal(value, ',') ?? String(toNumber(value))).replace(',', '{,}')
const fracLatex = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`)
const sameSet = (values: readonly number[], wanted: number[]) => [...values].sort((a, b) => a - b).join() === [...wanted].sort((a, b) => a - b).join()

export const proportionDbh4ApLabTools: ProportionDbh4ApLabTool[] = [
    { id: 'classify', stage: 'simple', lessonTopic: 'relations', title: say('Zuzena, alderantzizkoa ala bat ere ez', 'Directa, inversa o ninguna', 'طردي أم عكسي أم لا شيء'), observe: say('Bikoitza → bikoitza: zuzena. Bikoitza → erdia: alderantzizkoa. Handitzea bakarrik ez da nahikoa: proportzio berean handitu behar du.', 'Doble → doble: directa. Doble → mitad: inversa. No basta con crecer: tiene que crecer en la misma proporción.', 'الضعف ← الضعف: طردي. الضعف ← النصف: عكسي. ولا تكفي الزيادة: يجب أن تكون بالنسبة نفسها.') },
    { id: 'rule', stage: 'simple', lessonTopic: 'direct-rule', title: say('Gezidun hiruko erregela', 'Regla de tres con flechas', 'قاعدة الثلاثة بالأسهم'), observe: say('Goian, lehen magnitudea zenbaki batez biderkatzen da. Erlazioa zuzena bada, behean zenbaki beraz biderkatzen da; alderantzizkoa bada, behean zatitu egiten da. Unitatera laburtuz: lehenik unitate baten balioa, gero eskatzen dena.', 'Arriba, la primera magnitud se multiplica por un número. Si la relación es directa, abajo se multiplica por el mismo; si es inversa, abajo se divide. Por la unidad: primero el valor de 1, luego el que se pide.', 'في الأعلى يُضرب المقدار الأول في عدد. إذا كانت العلاقة طردية نضرب في الأسفل في العدد نفسه، وإذا كانت عكسية نقسم في الأسفل. وبالإرجاع إلى الوحدة: أولًا قيمة الواحد ثم المطلوب.') },
    { id: 'compound', stage: 'compound', lessonTopic: 'compound', title: say('Proportzionaltasun konposatuaren makina', 'La máquina de proporcionalidad compuesta', 'آلة التناسب المركّب'), observe: say('Magnitude bakoitzeko erabaki: zuzena (berria/zaharra) ala alderantzizkoa (zaharra/berria). Ezezaguna zatiki guztiez biderkatzen da.', 'Para cada magnitud decide: directa (nuevo/viejo) o inversa (viejo/nuevo). La incógnita se multiplica por todas las fracciones.', 'قرّر لكل مقدار: طردي (الجديد/القديم) أم عكسي (القديم/الجديد). ويُضرب المجهول في كل الكسور.') },
    { id: 'share', stage: 'compound', lessonTopic: 'direct-share', title: say('Banaketak', 'Repartos', 'التوزيعات'), observe: say('Zuzenean zenbaki handienak zati handiena hartzen du; alderantzizkoan, txikiena. Zatien batura beti kantitate osoa da.', 'En el directo el número mayor se lleva la parte mayor; en el inverso, la menor. Las partes siempre suman la cantidad entera.', 'في الطردي يأخذ العدد الأكبر الجزء الأكبر؛ وفي العكسي الأصغر. ومجموع الأجزاء يساوي الكمية كلها دائمًا.') },
    { id: 'percentbar', stage: 'percent', lessonTopic: 'percent-calc', title: say('Ehunekoen barra', 'La barra del 100 %', 'شريط 100٪'), observe: say('Goiko barra % 100 da; behekoa, ehunekoa, eskala berean. % 21 igotzean barra % 121 arte luzatzen da; % 25 merketzean % 75 geratzen da. Atzera egiteko, indizeaz zatitzen da.', 'La barra de arriba es el 100 %; la de abajo, el porcentaje, en la misma escala. Subir un 21 % alarga la barra hasta el 121 %; rebajar un 25 % la deja en el 75 %. Hacia atrás se divide entre el índice.', 'الشريط العلوي هو 100٪، والسفلي هو النسبة بالمقياس نفسه. رفع 21٪ يمدّ الشريط إلى 121٪، وتخفيض 25٪ يتركه عند 75٪. وللرجوع نقسم على المؤشر.') },
    { id: 'chain', stage: 'percent', lessonTopic: 'chained', title: say('Ehuneko kateatuak', 'Porcentajes encadenados', 'النسب المتتالية'), observe: say('Aldaketa bakoitza bere indizeaz biderkatzen da. % 10 igo eta % 10 jaitsiz gero, ez da hasierara itzultzen.', 'Cada cambio multiplica por su índice. Si subes un 10 % y bajas un 10 %, no vuelves al principio.', 'كل تغيّر يضرب في مؤشره. إذا زدت 10٪ ثم خفّضت 10٪ فلن تعود إلى البداية.') },
    { id: 'receipt', stage: 'percent', lessonTopic: 'chained', title: say('Erosketaren tiketa', 'El tique de la compra', 'إيصال الشراء'), observe: say('Deskontuak eta BEZak beren indizeaz biderkatzen dute; beraz, haien ordenak ez du axola. Kupoiak euro finkoak kentzen ditu, eta aurrezten duena atzetik datozen indizeez biderkatzen da: BEZaren aurretik, haren BEZa ere aurrezten duzu.', 'El descuento y el IVA multiplican por su índice, así que su orden da igual. El cupón resta euros fijos, y lo que ahorra se multiplica por los índices que vienen detrás: antes del IVA, te ahorras también su IVA.', 'الخصم والضريبة يضربان في مؤشريهما، فلا يهمّ ترتيبهما. أما القسيمة فتطرح يوروهات ثابتة، ويُضرب ما توفّره في المؤشرات التي تأتي بعدها: قبل الضريبة توفّر ضريبتها أيضًا.') },
    { id: 'interest', stage: 'interest', lessonTopic: 'simple-interest', title: say('Interes bakuna', 'Interés simple', 'الفائدة البسيطة'), observe: say('Urtero interes bera gehitzen da, hasierako kapitalaren % r. Urte bikoitza edo tasa bikoitza → interes bikoitza.', 'Cada año se suma el mismo interés, el r % del capital inicial. El doble de años o el doble de tipo → el doble de interés.', 'تُضاف كل سنة الفائدة نفسها، r٪ من رأس المال الأصلي. ضعف السنوات أو ضعف السعر ← ضعف الفائدة.') },
    { id: 'growth', stage: 'interest', lessonTopic: 'compound-interest', title: say('Bakuna ala konposatua', 'Simple o compuesto', 'بسيطة أم مركّبة'), observe: say('Lehen urtean biak berdinak dira; gero konposatua aurrera doa, interesak ere interesa sortzen duelako. Aldi gehiago (k) → apur bat gehiago.', 'El primer año los dos coinciden; después el compuesto se adelanta, porque el interés también produce interés. Más periodos (k) → algo más.', 'في السنة الأولى يتساويان؛ ثم تتقدم المركّبة لأن الفائدة تُنتج فائدة. فترات أكثر (k) ← أكثر قليلًا.') },
    { id: 'mixture', stage: 'problems', lessonTopic: 'mixtures', title: say('Nahasketa', 'La mezcla', 'الخليط'), observe: say('Prezio ertaina beti bi prezioen artean dago, eta kantitate handiena duenetik hurbilago. Kantitate berdinekin, erdian.', 'El precio medio siempre queda entre los dos precios, y más cerca del que tiene más cantidad. Con cantidades iguales, justo en medio.', 'يقع السعر المتوسط دائمًا بين السعرين، وأقرب إلى الأكثر كمية. وبكميتين متساويتين في المنتصف تمامًا.') },
    { id: 'motion', stage: 'problems', lessonTopic: 'motion', title: say('Bi ibilgailu errepidean', 'Dos vehículos en la carretera', 'مركبتان على الطريق'), observe: say('Elkarrengana doazenean tartea abiaduren baturan txikitzen da; atzetik doazenean, abiaduren kenduran. Azkarrena atzean ez badago, ez dira inoiz elkartzen.', 'Al encuentro, la distancia se acorta a la suma de las velocidades; en una persecución, a su diferencia. Si el rápido no va detrás, no se encuentran nunca.', 'في التلاقي تقصر المسافة بمجموع السرعتين، وفي المطاردة بفرقهما. وإذا لم يكن الأسرع في الخلف فلن يلتقيا أبدًا.') },
    { id: 'graph', stage: 'problems', lessonTopic: 'motion', title: say('Distantzia-denbora grafikoa', 'Gráfica distancia–tiempo', 'منحنى المسافة والزمن'), observe: say('Ibilgailu bakoitza zuzen bat da: zenbat eta inklinatuagoa, orduan eta azkarrago. Bata zain dagoen bitartean, bere zuzena horizontala da. Zuzenak ebakitzen diren puntuan elkartzen dira: puntu horrek minutua eta kilometroa ematen ditu.', 'Cada vehículo es una recta: cuanto más inclinada, más rápido va. Mientras uno espera, su recta es horizontal. Donde se cortan las rectas se encuentran: ese punto da el minuto y el kilómetro.', 'كل مركبة مستقيم: كلما كان أشدّ ميلًا كانت أسرع. وما دامت تنتظر يكون مستقيمها أفقيًا. وحيث يتقاطع المستقيمان تلتقيان: تلك النقطة تعطي الدقيقة والكيلومتر.') },
    { id: 'taps', stage: 'problems', lessonTopic: 'taps', title: say('Txorrotak eta hustubidea', 'Grifos y desagüe', 'الصنابير والمصرف'), observe: say('Ordu bateko zatiak batzen dira (eta hustubidearena kendu). Denbora osoa zati horren alderantzizkoa da.', 'Se suman las partes de una hora (y se resta la del desagüe). El tiempo total es el inverso de esa parte.', 'نجمع أجزاء الساعة (ونطرح جزء المصرف). والزمن الكلي مقلوب ذلك الجزء.') }
]

export const proportionDbh4ApLabToolForTopic: Record<string, ProportionDbh4ApLabToolId | undefined> = {
    relations: 'classify',
    'direct-rule': 'rule',
    'inverse-rule': 'rule',
    compound: 'compound',
    'direct-share': 'share',
    'inverse-share': 'share',
    'percent-calc': 'percentbar',
    index: 'percentbar',
    chained: 'receipt',
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
    /** The learner's guess before seeing the result; asked again whenever the case changes */
    prediction: Prediction | null
}

/** Not the lesson's example, so that its challenge is not solved on arrival */
export const initialGrowthState: GrowthState = { capital: 2000, rate: 5, years: 2, periods: 1, prediction: null }

export function setGrowth(state: GrowthState, patch: Partial<Omit<GrowthState, 'prediction'>>): GrowthState {
    const capital = patch.capital ?? state.capital
    const rate = clamp(patch.rate ?? state.rate, 1, GROWTH_RATE_MAX)
    const years = clamp(patch.years ?? state.years, 1, GROWTH_YEARS_MAX)
    const periods = patch.periods ?? state.periods
    const same = capital === state.capital && rate === state.rate && years === state.years && periods === state.periods
    return { capital, rate, years, periods, prediction: same ? state.prediction : null }
}

/** Simple interest after `year` years: C · (1 + r · t / 100), exact */
export const simpleAfter = (state: GrowthState, year: number) => fraction(state.capital * (100 + state.rate * year), 100)
/** Compound after `year` years with k periods: C · (1 + r / 100k)^(k t); the powers are too big for exact fractions */
export const compoundAfter = (state: GrowthState, year: number) => state.capital * (1 + state.rate / (100 * state.periods)) ** (state.periods * year)
/** Money is shown rounded to the cent */
export const cents = (value: number) => Math.round(value * 100) / 100
/** The prediction: will the compound amount stay below double the capital, reach it exactly or pass it? */
export const growthPrediction = (state: GrowthState): Prediction => compareTo(cents(compoundAfter(state, state.years)), 2 * state.capital)

export const growthChallenges: LabChallenge<GrowthState>[] = [
    { id: 43101, prompt: say('Ikusi lezioaren adibidea: 1000 € % 10ean 3 urtez, urtean behin. Zenbat konposatuan?', 'Mira el ejemplo de la lección: 1000 € al 10 % durante 3 años, anual. ¿Cuánto en compuesto?', 'شاهد مثال الدرس: 1000 € بفائدة 10٪ مدة 3 سنوات سنويًا. كم في المركّبة؟'), hint: say('$1000\\cdot 1{,}1^{3}=1331$.', '$1000\\cdot 1{,}1^{3}=1331$.', '$1000\\cdot 1{,}1^{3}=1331$.'), isSolved: (state) => state.capital === 1000 && state.rate === 10 && state.years === 3 && state.periods === 1 },
    { id: 43102, prompt: say('Lortu konposatuak bakunari 5000 € baino gehiago ateratzea.', 'Consigue que el compuesto saque más de 5000 € al simple.', 'اجعل المركّبة تزيد على البسيطة بأكثر من 5000 €.'), hint: say('Kapital handia, tasa handia eta urte asko.', 'Capital grande, tipo alto y muchos años.', 'رأس مال كبير وسعر مرتفع وسنوات كثيرة.'), isSolved: (state) => compoundAfter(state, state.years) - toNumber(simpleAfter(state, state.years)) > 5000 },
    { id: 43103, prompt: say('% 12an, urtean behin: zenbat urtetan bikoizten da kapitala lehen aldiz?', 'Al 12 %, anual: ¿en cuántos años se dobla el capital por primera vez?', 'بفائدة 12٪ سنويًا: بعد كم سنة يتضاعف رأس المال أول مرة؟'), hint: say('$1{,}12^{6}<2<1{,}12^{7}$.', '$1{,}12^{6}<2<1{,}12^{7}$.', '$1{,}12^{6}<2<1{,}12^{7}$.'), isSolved: (state) => state.rate === 12 && state.periods === 1 && compoundAfter(state, state.years) >= 2 * state.capital && compoundAfter(state, state.years - 1) < 2 * state.capital },
    { id: 43104, prompt: say('10 000 € % 12an urtebetez, interesak hilero. Zenbat?', '10 000 € al 12 % durante un año, con intereses mensuales. ¿Cuánto?', '10000 € بفائدة 12٪ سنة واحدة مع فوائد شهرية. كم؟'), hint: say('$k=12$: % 1 hilero.', '$k=12$: un 1 % cada mes.', '$k=12$: 1٪ كل شهر.'), isSolved: (state) => state.capital === 10000 && state.rate === 12 && state.years === 1 && state.periods === 12 }
]

/* ---------- 2. A mixture of two ingredients, or an alloy of two pieces of gold ---------- */

/** Prices in cents per kilo, from the textbook problems */
export const MIXTURE_PRICES = [520, 600, 740, 950, 1000, 1240, 1500] as const
/** The fineness («ley») of gold, in thousandths: 0,75 is 18 carats, 1 is pure gold */
export const ALLOY_PURITIES = [750, 800, 850, 900, 950, 1000] as const
export const MIXTURE_KILOS_MAX = 30

/** Coffee mixed by price, or gold melted by fineness: the same weighted mean */
export type MixtureKind = 'coffee' | 'alloy'

export interface MixtureState {
    kind: MixtureKind
    kilos: [number, number]
    /** Cents per kilo (coffee) or thousandths of fineness (alloy) */
    prices: [number, number]
    /** The learner's guess before seeing the result; asked again whenever the case changes */
    prediction: Prediction | null
}

/** Not the lesson's coffee, so that its challenge is not solved on arrival */
export const initialMixtureState: MixtureState = { kind: 'coffee', kilos: [10, 5], prices: [950, 600], prediction: null }

/** Changing between coffee and gold starts from two values of that kind */
const firstValues: Record<MixtureKind, [number, number]> = { coffee: [950, 600], alloy: [850, 950] }

export function setMixture(state: MixtureState, patch: { kind?: MixtureKind; kilos?: [0 | 1, number]; price?: [0 | 1, number] }): MixtureState {
    const kind = patch.kind ?? state.kind
    const kilos: [number, number] = [...state.kilos]
    const prices: [number, number] = kind === state.kind ? [...state.prices] : [...firstValues[kind]]
    if (patch.kilos) kilos[patch.kilos[0]] = clamp(patch.kilos[1], 1, MIXTURE_KILOS_MAX)
    if (patch.price) prices[patch.price[0]] = patch.price[1]
    const same = kind === state.kind && kilos[0] === state.kilos[0] && kilos[1] === state.kilos[1] && prices[0] === state.prices[0] && prices[1] === state.prices[1]
    return { kind, kilos, prices, prediction: same ? state.prediction : null }
}

/** The weighted mean in the state's own units (cents per kilo, or thousandths of fineness), exact */
export const mixtureMean = (state: MixtureState) => fraction(state.kilos[0] * state.prices[0] + state.kilos[1] * state.prices[1], state.kilos[0] + state.kilos[1])
/** The seesaw: kilos times the distance to the mean are the same on both sides */
export const mixtureMoments = (state: MixtureState): [FractionValue, FractionValue] => {
    const mean = mixtureMean(state)
    return [0, 1].map((side) => multiply(n(state.kilos[side]), subtract(mean, n(state.prices[side])))).map((moment) => (moment.numerator < 0 ? fraction(-moment.numerator, moment.denominator) : moment)) as [FractionValue, FractionValue]
}

/** Total cost in euros, exact */
export const mixtureCost = (state: MixtureState) => fraction(state.kilos[0] * state.prices[0] + state.kilos[1] * state.prices[1], 100)
/** Mean price in euros per kilo, exact */
export const mixturePrice = (state: MixtureState) => divide(mixtureCost(state), n(state.kilos[0] + state.kilos[1]))
/** The prediction: the mean price below the midpoint of the two prices (nearer the cheaper one), on it, or above it */
export const mixturePrediction = (state: MixtureState): Prediction => compareTo(toNumber(mixtureMean(state)), (state.prices[0] + state.prices[1]) / 2)

const coffee = (state: MixtureState) => state.kind === 'coffee'

export const mixtureChallenges: LabChallenge<MixtureState>[] = [
    { id: 43201, prompt: say('Egin lezioaren kafea: 12 kg 12,40 €-an eta 8 kg 7,40 €-an.', 'Haz el café de la lección: 12 kg a 12,40 € y 8 kg a 7,40 €.', 'اصنع بن الدرس: 12 كغ بـ12.40 € و8 كغ بـ7.40 €.'), hint: say('Prezio ertaina 10,40 €/kg.', 'El precio medio es 10,40 €/kg.', 'السعر المتوسط 10.40 €/كغ.'), isSolved: (state) => coffee(state) && equals(mixturePrice(state), fraction(1040, 100)) && state.kilos.includes(12) && state.kilos.includes(8) },
    { id: 43202, prompt: say('Lortu prezio ertaina bi prezioen erdian geratzea, prezio desberdinekin.', 'Consigue que el precio medio quede justo en medio de los dos, con precios distintos.', 'اجعل السعر المتوسط في منتصف السعرين تمامًا، بسعرين مختلفين.'), hint: say('Kantitate berdinak.', 'Cantidades iguales.', 'كميتان متساويتان.'), isSolved: (state) => coffee(state) && state.prices[0] !== state.prices[1] && equals(mixturePrice(state), fraction(state.prices[0] + state.prices[1], 200)) },
    { id: 43203, prompt: say('10 kg kafe 9,50 €-an daude. Zenbat kg 15 €-ko kafe gehitu behar dira 12,50 €/kg lortzeko?', 'Hay 10 kg de café a 9,50 €. ¿Cuántos kg de café a 15 € hay que añadir para que salga a 12,50 €/kg?', 'لدينا 10 كغ من البن بـ9.50 €. كم كيلوغرامًا من البن بـ15 € نضيف ليصير السعر 12.50 €/كغ؟'), hint: say('$15x+95=12{,}5\\cdot(10+x)$.', '$15x+95=12{,}5\\cdot(10+x)$.', '$15x+95=12{,}5\\cdot(10+x)$.'), isSolved: (state) => coffee(state) && equals(mixturePrice(state), fraction(1250, 100)) && state.prices.includes(1500) && state.prices.includes(950) },
    { id: 43204, prompt: say('Egin 5,75 €-an saltzeko nahasketa: 7,40 €-ko ardoa eta 5,20 €-koa.', 'Haz una mezcla que salga a 5,75 €: vino de 7,40 € y de 5,20 €.', 'اصنع خليطًا سعره 5.75 €: نبيذ بـ7.40 € وآخر بـ5.20 €.'), hint: say('1 eta 3 arteko proportzioa.', 'En proporción 1 a 3.', 'بنسبة 1 إلى 3.'), isSolved: (state) => coffee(state) && equals(mixturePrice(state), fraction(575, 100)) && state.prices.includes(740) && state.prices.includes(520) },
    {
        id: 43205,
        prompt: say(
            'Urtu 4 kg urre (purutasuna: 0,85) eta 3 kg urre (purutasuna: 0,9). Ikasgaiko lingotea da, bi aldiz handiagoa. Zer purutasun ateratzen da?',
            'Funde 4 kg de oro de ley 0,85 con 3 kg de ley 0,9: es el lingote de la lección, el doble de grande. ¿Qué ley sale?',
            'اصهر 4 كغ من الذهب عياره 0.85 مع 3 كغ عياره 0.9: إنها سبيكة الدرس بضعف الحجم. ما العيار الناتج؟'
        ),
        hint: say('Urre garbia: $4\\cdot 0{,}85+3\\cdot 0{,}9=6{,}1$ kg, 7 kilotan.', 'Oro puro: $4\\cdot 0{,}85+3\\cdot 0{,}9=6{,}1$ kg en 7 kg.', 'الذهب الخالص: $4\\cdot 0{,}85+3\\cdot 0{,}9=6{,}1$ كغ من 7 كغ.'),
        isSolved: (state) => state.kind === 'alloy' && ([0, 1] as const).some((slot) => state.kilos[slot] === 4 && state.prices[slot] === 850 && state.kilos[1 - slot] === 3 && state.prices[1 - slot] === 900)
    }
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
    /** The learner's guess before seeing the result; asked again when the road or the speeds change, not the clock */
    prediction: Prediction | null
}

/** Not the lesson's example, so that its challenge is not solved on arrival */
export const initialMotionState: MotionState = { mode: 'meet', distance: 300, speeds: [60, 90], minutes: 0, prediction: null }

export function setMotion(state: MotionState, patch: { mode?: MotionMode; distance?: number; speed?: [0 | 1, number]; minutes?: number }): MotionState {
    const speeds: [number, number] = [...state.speeds]
    if (patch.speed) speeds[patch.speed[0]] = clamp(Math.round(patch.speed[1] / SPEED_STEP) * SPEED_STEP, SPEED_MIN, SPEED_MAX)
    const mode = patch.mode ?? state.mode
    const distance = patch.distance ?? state.distance
    const same = mode === state.mode && distance === state.distance && speeds[0] === state.speeds[0] && speeds[1] === state.speeds[1]
    return {
        mode,
        distance,
        speeds,
        minutes: clamp(Math.round((patch.minutes ?? state.minutes) / CLOCK_STEP) * CLOCK_STEP, 0, CLOCK_MAX),
        prediction: same ? state.prediction : null
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
/** The prediction: do they meet before one hour, at one hour or after it? null when they never meet */
export function motionPrediction(state: MotionState): Prediction | null {
    const meeting = meetingMinutes(state)
    return meeting === null ? null : compareTo(toNumber(meeting), 60)
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
    /** The learner's guess before seeing the result; asked again whenever a tap or the drain changes */
    prediction: Prediction | null
}

/** Not the lesson's tank, so that its challenge is not solved on arrival */
export const initialTapsState: TapsState = { taps: [4, 6], drain: 0, prediction: null }

export function setTaps(state: TapsState, patch: { tap?: [0 | 1, number]; drain?: number }): TapsState {
    const taps: [number, number] = [...state.taps]
    if (patch.tap) taps[patch.tap[0]] = clamp(patch.tap[1], patch.tap[0] === 0 ? 1 : 0, TAP_HOURS_MAX)
    const drain = clamp(patch.drain ?? state.drain, 0, TAP_HOURS_MAX)
    const same = taps[0] === state.taps[0] && taps[1] === state.taps[1] && drain === state.drain
    return { taps, drain, prediction: same ? state.prediction : null }
}

const perHour = (hours: number) => (hours > 0 ? fraction(1, hours) : n(0))
/** Part of the tank filled in one hour (negative if the drain wins) */
export const fillRate = (state: TapsState) => subtract(add(perHour(state.taps[0]), perHour(state.taps[1])), perHour(state.drain))
/** Hours to fill the empty tank, or null if it never fills */
export const fillHours = (state: TapsState): FractionValue | null => {
    const rate = fillRate(state)
    return rate.numerator > 0 ? divide(n(1), rate) : null
}

/** The fastest open tap alone, in hours */
export const fastestTap = (state: TapsState) => Math.min(...state.taps.filter((hours) => hours > 0))
/** The prediction: does the tank fill sooner than with the fastest tap alone, just as soon, or later (or never)? */
export function tapsPrediction(state: TapsState): Prediction {
    const hours = fillHours(state)
    return hours === null ? '>' : compareTo(toNumber(hours), fastestTap(state))
}

export const tapsChallenges: LabChallenge<TapsState>[] = [
    { id: 43401, prompt: say('Lezioaren biltegia: A 5 h-tan eta B 7 h-tan. Zenbat biak batera?', 'El depósito de la lección: A en 5 h y B en 7 h. ¿Cuánto los dos juntos?', 'خزان الدرس: أ في 5 س وب في 7 س. كم معًا؟'), hint: say('$\\frac{35}{12}$ h.', '$\\frac{35}{12}$ h.', '$\\frac{35}{12}$ س.'), isSolved: (state) => [...state.taps].sort((a, b) => a - b).join() === '5,7' && state.drain === 0 },
    { id: 43402, prompt: say('Bi txorrotarekin, bete biltegia zehazki 2 orduan.', 'Con dos grifos, llena el depósito en 2 horas justas.', 'بصنبورين، املأ الخزان في ساعتين تمامًا.'), hint: say('$\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$.', '$\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$.', '$\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$.'), isSolved: (state) => state.taps[1] > 0 && state.drain === 0 && equals(fillHours(state) ?? n(0), n(2)) },
    { id: 43403, prompt: say('Ireki hustubidea eta lortu biltegia inoiz ez betetzea.', 'Abre el desagüe y consigue que el depósito no se llene nunca.', 'افتح المصرف واجعل الخزان لا يمتلئ أبدًا.'), hint: say('Hustubideak txorrotek baino gehiago atera behar du.', 'El desagüe tiene que sacar más de lo que entra.', 'يجب أن يُخرج المصرف أكثر مما يدخل.'), isSolved: (state) => state.drain > 0 && fillHours(state) === null },
    { id: 43404, prompt: say('Hustubidea irekita, bete biltegia zehazki ordu eta erdian.', 'Con el desagüe abierto, llena el depósito en hora y media justa.', 'والمصرف مفتوح، املأ الخزان في ساعة ونصف تمامًا.'), hint: say('$\\frac{1}{2}+\\frac{1}{3}-\\frac{1}{6}=\\frac{2}{3}$.', '$\\frac{1}{2}+\\frac{1}{3}-\\frac{1}{6}=\\frac{2}{3}$.', '$\\frac{1}{2}+\\frac{1}{3}-\\frac{1}{6}=\\frac{2}{3}$.'), isSolved: (state) => state.drain > 0 && equals(fillHours(state) ?? n(0), fraction(3, 2)) }
]

/* ---------- Endless challenges for the new tools ---------- */

const text = (eu: string, es: string, ar: string): LocalizedText => say(eu, es, ar)

/** Growth: the first year past an amount, the gap over simple interest, doubling, or a setting with periods */
export const growthExtra: LabChallengeMaker<GrowthState> = freshFrom(initialGrowthState, (random) => {
    const kind = random()
    if (kind < 0.4) {
        for (;;) {
            const solution: GrowthState = { capital: pick(random, GROWTH_CAPITALS), rate: randomInt(random, 3, GROWTH_RATE_MAX), years: randomInt(random, 2, 8), periods: 1, prediction: null }
            const step = solution.capital / 100
            const target = Math.ceil((compoundAfter(solution, solution.years - 1) + 0.005) / step) * step
            if (target >= compoundAfter(solution, solution.years) - 0.005) continue
            const { capital, rate, years } = solution
            const index = decimalLatex(fraction(100 + rate, 100))
            return {
                prompt: text(
                    `Kapitala: ${big(capital)} €; interes konposatua, urtekoa: % ${rate}. Zenbat urteren buruan izango da lehen aldiz ${big(target)} € baino gehiago? Jarri urte horiek tresnan.`,
                    `Con ${big(capital)} € al ${rate} % de interés compuesto anual, ¿al cabo de cuántos años habrá por primera vez más de ${big(target)} €? Pon esos años en la herramienta.`,
                    `رأس المال ${capital} € بفائدة مركّبة سنوية ${rate}٪. بعد كم سنة يصبح المبلغ أكثر من ${target} € أول مرة؟ ضع عدد السنوات في الأداة.`
                ),
                hint: text(
                    `Urtero dirua $${index}$ zenbakiaz biderkatzen da: begiratu barra berdeak urtez urte.`,
                    `Cada año el dinero se multiplica por $${index}$: mira las barras verdes año a año.`,
                    `كل سنة يُضرب المال في $${index}$: انظر إلى الأعمدة الخضراء سنة بعد سنة.`
                ),
                isSolved: (state) => state.capital === capital && state.rate === rate && state.periods === 1 && state.years === years,
                solution
            }
        }
    }
    if (kind < 0.6) {
        for (;;) {
            const solution: GrowthState = { capital: pick(random, GROWTH_CAPITALS), rate: randomInt(random, 6, GROWTH_RATE_MAX), years: randomInt(random, 5, GROWTH_YEARS_MAX), periods: pick(random, [1, 1, 2, 4, 12]), prediction: null }
            const gap = compoundAfter(solution, solution.years) - toNumber(simpleAfter(solution, solution.years))
            const step = solution.capital / 20
            const target = Math.floor((gap * 0.85) / step) * step
            if (target <= 0) continue
            const { capital } = solution
            return {
                prompt: text(
                    `Kapitala: ${big(capital)} €. Lortu konposatuak bakunari ${big(target)} € baino gehiago ateratzea.`,
                    `Con ${big(capital)} €, consigue que el interés compuesto saque más de ${big(target)} € al simple.`,
                    `برأس مال ${capital} €، اجعل المركّبة تزيد على البسيطة بأكثر من ${target} €.`
                ),
                hint: text(
                    'Tasa handia, urte asko eta, nahi baduzu, kapitalizazio maizagoa: aldea urtez urte hazten da.',
                    'Tipo alto, muchos años y, si quieres, capitalización más frecuente: la diferencia crece cada año.',
                    'سعر مرتفع وسنوات كثيرة، وإن شئت رسملة أكثر تكرارًا: الفرق يكبر كل سنة.'
                ),
                isSolved: (state) => state.capital === capital && compoundAfter(state, state.years) - toNumber(simpleAfter(state, state.years)) > target,
                solution
            }
        }
    }
    if (kind < 0.75) {
        const rate = randomInt(random, 8, GROWTH_RATE_MAX)
        let years = 1
        while ((1 + rate / 100) ** years < 2) years += 1
        const rule = decimalLatex(fraction(Math.round((72 / rate) * 10), 10))
        return {
            prompt: text(
                `Interes konposatua, urtekoa: % ${rate}. Zenbat urtetan bikoizten da kapitala lehen aldiz?`,
                `Al ${rate} % de interés compuesto anual, ¿en cuántos años se dobla el capital por primera vez?`,
                `بفائدة مركّبة سنوية ${rate}٪: بعد كم سنة يتضاعف رأس المال أول مرة؟`
            ),
            hint: text(
                `Arau erabilgarria: $72\\mathbin{:}${rate}\\approx ${rule}$ urte inguru. Egiaztatu barrekin.`,
                `Una regla útil: unos $72\\mathbin{:}${rate}\\approx ${rule}$ años. Compruébalo con las barras.`,
                `قاعدة مفيدة: نحو $72\\mathbin{:}${rate}\\approx ${rule}$ سنة. تحقّق منها بالأعمدة.`
            ),
            isSolved: (state) => state.rate === rate && state.periods === 1 && compoundAfter(state, state.years) >= 2 * state.capital && compoundAfter(state, state.years - 1) < 2 * state.capital,
            solution: { capital: pick(random, GROWTH_CAPITALS), rate, years, periods: 1, prediction: null }
        }
    }
    const solution: GrowthState = { capital: pick(random, GROWTH_CAPITALS), rate: pick(random, [4, 6, 8, 12]), years: randomInt(random, 1, 5), periods: pick(random, [2, 4, 12]), prediction: null }
    const { capital, rate, years, periods } = solution
    const names: Record<number, LocalizedText> = {
        2: text('sei hilabetez behin', 'semestrales', 'نصف سنوية'),
        4: text('hiru hilabetez behin', 'trimestrales', 'ربع سنوية'),
        12: text('hilero', 'mensuales', 'شهرية')
    }
    return {
        prompt: text(
            `Prestatu: ${big(capital)} €, % ${rate}, ${years} urte, interesak ${names[periods].eu}. Zenbat irabazten da gehiago urteko kapitalizazioarekin baino?`,
            `Prepara ${big(capital)} € al ${rate} % durante ${years} ${years === 1 ? 'año' : 'años'}, con intereses ${names[periods].es}. ¿Cuánto ganas de más que con capitalización anual?`,
            `جهّز: رأس المال ${capital} €، الفائدة ${rate}٪، عدد السنوات ${years}، والفوائد ${names[periods].ar}. كم تربح أكثر من الرسملة السنوية؟`
        ),
        hint: text(
            `Aldi bakoitzean $\\frac{${rate}}{${periods}}$ ehuneko aplikatzen da, eta $${periods}\\cdot ${years}$ aldi daude.`,
            `En cada periodo se aplica $\\frac{${rate}}{${periods}}$ por ciento, y hay $${periods}\\cdot ${years}$ periodos.`,
            `في كل فترة تُطبَّق $\\frac{${rate}}{${periods}}$ بالمئة، وعدد الفترات $${periods}\\cdot ${years}$.`
        ),
        isSolved: (state) => state.capital === capital && state.rate === rate && state.years === years && state.periods === periods,
        solution
    }
})

/** Two different prices from the tool's list, cheaper first */
function twoPrices(random: () => number): [number, number] {
    for (;;) {
        const a = pick(random, MIXTURE_PRICES)
        const b = pick(random, MIXTURE_PRICES)
        if (a !== b) return a < b ? [a, b] : [b, a]
    }
}

/** Mixture: a target price from two given prices, or the kilos to add to reach it */
export const mixtureExtra: LabChallengeMaker<MixtureState> = freshFrom(initialMixtureState, (random) => {
    const kind = random()
    if (kind < 0.25) {
        for (;;) {
            const low = pick(random, ALLOY_PURITIES)
            const high = pick(random, ALLOY_PURITIES)
            const a = randomInt(random, 1, 6)
            const b = randomInt(random, 1, 6)
            const total = a * low + b * high
            if (low >= high || gcd(a, b) !== 1 || total % (a + b) !== 0) continue
            const mean = total / (a + b)
            const fineness = (thousandths: number, point = false) => { const text = String(thousandths / 1000); return point ? text : text.replace('.', ',') }
            return {
                prompt: text(
                    `Urtu urrea (purutasuna: ${fineness(low)}) eta urrea (purutasuna: ${fineness(high)}), ${fineness(mean)} purutasuneko lingote bat lortzeko.`,
                    `Funde oro de ley ${fineness(low)} con oro de ley ${fineness(high)} para conseguir un lingote de ley ${fineness(mean)}.`,
                    `اصهر ذهبًا عياره ${fineness(low, true)} مع ذهب عياره ${fineness(high, true)} لتحصل على سبيكة عيارها ${fineness(mean, true)}.`
                ),
                hint: text(
                    'Pisu handiena duen zatiaren purutasunetik hurbilago geratzen da: probatu kilo kopuru desberdinak.',
                    'La ley queda más cerca de la del trozo que pesa más: prueba con distintos kilos.',
                    'يقترب العيار من عيار القطعة الأثقل: جرّب أوزانًا مختلفة.'
                ),
                isSolved: (state) => state.kind === 'alloy' && sameSet(state.prices, [low, high]) && equals(mixtureMean(state), n(mean)),
                solution: { kind: 'alloy', kilos: [a, b], prices: [low, high], prediction: null }
            }
        }
    }
    if (kind < 0.6) {
        for (;;) {
            const [cheap, dear] = twoPrices(random)
            const a = randomInt(random, 1, 6)
            const b = randomInt(random, 1, 6)
            const total = a * cheap + b * dear
            if (gcd(a, b) !== 1 || total % (a + b) !== 0) continue
            const mean = total / (a + b)
            return {
                prompt: text(
                    `Bi kafe: bat ${euros(cheap)} €/kg, bestea ${euros(dear)} €/kg. Nahastu, nahasketa ${euros(mean)} €/kg atera dadin.`,
                    `Mezcla café de ${euros(cheap)} €/kg con café de ${euros(dear)} €/kg para que la mezcla salga a ${euros(mean)} €/kg.`,
                    `بنّان: الأول ${euros(cheap, true)} €/كغ والثاني ${euros(dear, true)} €/كغ. اخلطهما ليصبح سعر الخليط ${euros(mean, true)} €/كغ.`
                ),
                hint: text(
                    `Kilo merke bakoitza prezio ertainetik $${eurosLatex(mean - cheap)}$ € beherago dago, eta garesti bakoitza $${eurosLatex(dear - mean)}$ € gorago: orekatu behar dira.`,
                    `Cada kilo del barato queda $${eurosLatex(mean - cheap)}$ € por debajo del precio medio, y cada kilo del caro, $${eurosLatex(dear - mean)}$ € por encima: tienen que compensarse.`,
                    `كل كيلو من الرخيص أقل من السعر المتوسط بمقدار $${eurosLatex(mean - cheap)}$ €، وكل كيلو من الغالي أعلى منه بمقدار $${eurosLatex(dear - mean)}$ €: يجب أن يتوازنا.`
                ),
                isSolved: (state) => coffee(state) && sameSet(state.prices, [cheap, dear]) && equals(mixturePrice(state), fraction(mean, 100)),
                solution: { kind: 'coffee', kilos: [a, b], prices: [cheap, dear], prediction: null }
            }
        }
    }
    for (;;) {
        const prices = twoPrices(random)
        const [first, second] = random() < 0.5 ? prices : [prices[1], prices[0]]
        const kilos = randomInt(random, 4, 15)
        const added = randomInt(random, 1, 20)
        const total = kilos * first + added * second
        if (total % (kilos + added) !== 0) continue
        const mean = total / (kilos + added)
        return {
            prompt: text(
                `A kafea: ${kilos} kg, ${euros(first)} €/kg. B kafea: ${euros(second)} €/kg. Zenbat kg B gehitu behar dira, nahasketa ${euros(mean)} €/kg atera dadin?`,
                `Café A: ${kilos} kg a ${euros(first)} €/kg. Café B: ${euros(second)} €/kg. ¿Cuántos kg de B hay que añadir para que la mezcla salga a ${euros(mean)} €/kg?`,
                `البن أ: ${kilos} كغ بسعر ${euros(first, true)} €/كغ. البن ب: ${euros(second, true)} €/كغ. كم كيلوغرامًا من ب يجب إضافتها ليصبح سعر الخليط ${euros(mean, true)} €/كغ؟`
            ),
            hint: text(
                `Kostu osoa zati kilo guztiak: $\\frac{${kilos}\\cdot ${eurosLatex(first)}+${eurosLatex(second)}\\cdot x}{${kilos}+x}=${eurosLatex(mean)}$.`,
                `Coste total entre kilos totales: $\\frac{${kilos}\\cdot ${eurosLatex(first)}+${eurosLatex(second)}\\cdot x}{${kilos}+x}=${eurosLatex(mean)}$.`,
                `الكلفة الكلية على عدد الكيلوغرامات: $\\frac{${kilos}\\cdot ${eurosLatex(first)}+${eurosLatex(second)}\\cdot x}{${kilos}+x}=${eurosLatex(mean)}$.`
            ),
            isSolved: (state) => coffee(state) && ([0, 1] as const).some((slot) => state.kilos[slot] === kilos && state.prices[slot] === first && state.prices[1 - slot] === second) && equals(mixturePrice(state), fraction(mean, 100)),
            solution: { kind: 'coffee', kilos: [kilos, added], prices: [first, second], prediction: null }
        }
    }
})

/** A speed of the tool: 20–150 km/h in tens */
const speed = (random: () => number) => SPEED_STEP * randomInt(random, 2, SPEED_MAX / SPEED_STEP)
/** Minutes that the clock can show: whole, in steps of five, within its range */
const onClock = (minutes: number) => Number.isInteger(minutes) && minutes % CLOCK_STEP === 0 && minutes >= 15 && minutes <= CLOCK_MAX

/** Vehicles: set the clock at the meeting or the catch-up, or choose the speeds for a given time */
export const motionExtra: LabChallengeMaker<MotionState> = freshFrom(initialMotionState, (random) => {
    const kind = random()
    for (;;) {
        const distance = pick(random, MOTION_DISTANCES)
        const fast = speed(random)
        const slow = speed(random)
        if (kind < 0.4) {
            const sum = fast + slow
            const minutes = (60 * distance) / sum
            if (!onClock(minutes)) continue
            return {
                prompt: text(
                    `Elkarrengana: ${distance} km daude artean. A: ${fast} km/h; B: ${slow} km/h. Jarri erlojua gurutzatzen diren unean.`,
                    `Al encuentro: los separan ${distance} km; A va a ${fast} km/h y B, a ${slow} km/h. Pon el reloj en el momento en que se cruzan.`,
                    `تلاقٍ: المسافة بينهما ${distance} كم؛ أ بسرعة ${fast} كم/س وب بسرعة ${slow} كم/س. ضع الساعة لحظة التقاطع.`
                ),
                hint: text(
                    `Abiadura honetan hurbiltzen dira: $${fast}+${slow}=${sum}$ km/h. Denbora: $${distance}\\mathbin{:}${sum}$ h. Pasatu minututara.`,
                    `Se acercan a $${fast}+${slow}=${sum}$ km/h. Tiempo: $${distance}\\mathbin{:}${sum}$ h. Pásalo a minutos.`,
                    `يقتربان بسرعة $${fast}+${slow}=${sum}$ كم/س. الزمن: $${distance}\\mathbin{:}${sum}$ س. حوّله إلى دقائق.`
                ),
                isSolved: (state) => state.mode === 'meet' && state.distance === distance && state.speeds[0] === fast && state.speeds[1] === slow && atMeeting(state),
                solution: { mode: 'meet', distance, speeds: [fast, slow], minutes, prediction: null }
            }
        }
        if (kind < 0.75) {
            const difference = fast - slow
            const minutes = difference > 0 ? (60 * distance) / difference : NaN
            if (!onClock(minutes)) continue
            return {
                prompt: text(
                    `Atzetik: A ${fast} km/h abiaduran; B ${distance} km aurrerago, ${slow} km/h abiaduran. Jarri erlojua A-k B harrapatzen duen unean.`,
                    `Persecución: A va a ${fast} km/h y B, ${distance} km por delante, a ${slow} km/h. Pon el reloj cuando A alcanza a B.`,
                    `مطاردة: أ بسرعة ${fast} كم/س، وب أمامه بمسافة ${distance} كم بسرعة ${slow} كم/س. ضع الساعة لحظة لحاق أ بالمركبة ب.`
                ),
                hint: text(
                    `A-k orduko hainbeste kilometro murrizten ditu: $${fast}-${slow}=${difference}$. Denbora: $${distance}\\mathbin{:}${difference}$ h.`,
                    `A recorta $${fast}-${slow}=${difference}$ km cada hora. Tiempo: $${distance}\\mathbin{:}${difference}$ h.`,
                    `يقلّص أ المسافة $${fast}-${slow}=${difference}$ كم كل ساعة. الزمن: $${distance}\\mathbin{:}${difference}$ س.`
                ),
                isSolved: (state) => state.mode === 'chase' && state.distance === distance && state.speeds[0] === fast && state.speeds[1] === slow && atMeeting(state),
                solution: { mode: 'chase', distance, speeds: [fast, slow], minutes, prediction: null }
            }
        }
        const minutes = (60 * distance) / (fast + slow)
        if (!onClock(minutes)) continue
        return {
            prompt: text(
                `Elkarrengana, ${distance} km artean: aukeratu abiadurak, zehazki ${minutes} minutu igarotzean gurutza daitezen.`,
                `Al encuentro, con ${distance} km entre los dos: elige las velocidades para que se crucen justo a los ${minutes} minutos.`,
                `في التلاقي، والمسافة بينهما ${distance} كم: اختر السرعتين ليتقاطعا بعد ${minutes} دقيقة تمامًا.`
            ),
            hint: text(
                `Abiaduren batura: $${distance}\\mathbin{:}\\frac{${minutes}}{60}$ km/h.`,
                `La suma de las velocidades: $${distance}\\mathbin{:}\\frac{${minutes}}{60}$ km/h.`,
                `مجموع السرعتين: $${distance}\\mathbin{:}\\frac{${minutes}}{60}$ كم/س.`
            ),
            isSolved: (state) => state.mode === 'meet' && state.distance === distance && equals(meetingMinutes(state) ?? n(-1), n(minutes)),
            solution: { mode: 'meet', distance, speeds: [fast, slow], minutes: 0, prediction: null }
        }
    }
})

/** A time in hours as «2 h 24 min» («2 س 24 د» in Arabic); whole minutes only */
function duration(hours: FractionValue): LocalizedText {
    const minutes = toNumber(multiply(hours, n(60)))
    const whole = Math.floor(minutes / 60)
    const rest = minutes % 60
    const latin = whole === 0 ? `${rest} min` : rest === 0 ? `${whole} h` : `${whole} h ${rest} min`
    const arabic = whole === 0 ? `${rest} د` : rest === 0 ? `${whole} س` : `${whole} س ${rest} د`
    return { eu: latin, es: latin, ar: arabic }
}
const wholeMinutes = (hours: FractionValue) => multiply(hours, n(60)).denominator === 1

/** Taps: choose the second tap for a time together, or open the drain for a slower fill */
export const tapsExtra: LabChallengeMaker<TapsState> = freshFrom(initialTapsState, (random) => {
    for (;;) {
        const a = randomInt(random, 2, TAP_HOURS_MAX)
        const b = randomInt(random, 1, TAP_HOURS_MAX)
        if (random() < 0.55) {
            const solution: TapsState = { taps: [a, b], drain: 0, prediction: null }
            const hours = fillHours(solution)!
            if (!wholeMinutes(hours)) continue
            const time = duration(hours)
            const rate = fillRate(solution)
            return {
                prompt: text(
                    `A txorrotak ${a} h behar ditu biltegia betetzeko. Aukeratu B txorrota, biek batera ${time.eu} behar izan dezaten.`,
                    `El grifo A llena el depósito en ${a} h. Elige el grifo B para que los dos juntos lo llenen en ${time.es}.`,
                    `يملأ الصنبور أ الخزان في ${a} س. اختر الصنبور ب ليملآه معًا في ${time.ar}.`
                ),
                hint: text(
                    `Biek batera $${fracLatex(rate)}$ betetzen dute orduko, eta A-k $\\frac{1}{${a}}$. Falta dena B-ren zatia da.`,
                    `Juntos llenan $${fracLatex(rate)}$ por hora, y A, $\\frac{1}{${a}}$. Lo que falta es la parte de B.`,
                    `معًا يملآن $${fracLatex(rate)}$ في الساعة، وأ يملأ $\\frac{1}{${a}}$. الباقي هو جزء ب.`
                ),
                isSolved: (state) => state.drain === 0 && state.taps[1] > 0 && state.taps.includes(a) && equals(fillHours(state) ?? n(0), hours),
                solution
            }
        }
        const drain = randomInt(random, 1, TAP_HOURS_MAX)
        const solution: TapsState = { taps: [a, b], drain, prediction: null }
        const hours = fillHours(solution)
        if (hours === null || !wholeMinutes(hours) || toNumber(hours) > 24) continue
        const time = duration(hours)
        const rate = fillRate(solution)
        return {
            prompt: text(
                `Txorrotak: ${a} h eta ${b} h. Ireki hustubidea, biltegia betetzeko zehazki ${time.eu} behar izan daitezen.`,
                `Grifos de ${a} h y de ${b} h. Abre el desagüe para que el depósito tarde justo ${time.es} en llenarse.`,
                `صنبوران: ${a} س و${b} س. افتح المصرف ليستغرق ملء الخزان ${time.ar} تمامًا.`
            ),
            hint: text(
                `Orduko: $\\frac{1}{${a}}+\\frac{1}{${b}}-\\frac{1}{x}=${fracLatex(rate)}$.`,
                `Por hora: $\\frac{1}{${a}}+\\frac{1}{${b}}-\\frac{1}{x}=${fracLatex(rate)}$.`,
                `في الساعة: $\\frac{1}{${a}}+\\frac{1}{${b}}-\\frac{1}{x}=${fracLatex(rate)}$.`
            ),
            isSolved: (state) => sameSet(state.taps, [a, b]) && state.drain > 0 && equals(fillHours(state) ?? n(0), hours),
            solution
        }
    }
})

/* ---------- Progress ids: the reused tools' challenges, then the new ones ---------- */

export const proportionDbh4ApLabChallengeIds = [
    ...classifyChallenges,
    ...ruleChallenges,
    ...compoundChallenges,
    ...shareChallenges,
    ...percentBarChallenges,
    ...chainChallenges,
    ...receiptChallenges,
    ...interestChallenges,
    ...growthChallenges,
    ...mixtureChallenges,
    ...motionChallenges,
    ...roadGraphChallenges,
    ...tapsChallenges
].map((challenge) => challenge.id)
