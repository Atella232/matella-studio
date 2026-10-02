import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import {
    decimalsChallenges,
    generatrixChallenges,
    intervalsChallenges,
    realsLabTools as appliedTools,
    roundingChallenges,
    zoomChallenges
} from '../../dbh4-aplikatuak-errealak/lab/labTools.ts'
import { isPerfectSquare, simplifySqrt } from '../../dbh4-aplikatuak-errealak/reals.ts'
import type { RealsPercentStageId } from '../lessons.tsx'
import { applyChanges, chainedIndex, compoundFinal, simpleInterest } from '../percent.ts'

/* ==========================================================================
   Zenbaki errealak eta ehunekoak (4. DBH, akademikoak) laboratory. Five
   tools come from the applied unit (decimals, generating fraction, zoom,
   intervals, rounding) with their challenges; three are this unit's own:
   the Pythagoras builder for √n on the line, the chained-percentages
   machine and the simple-against-compound interest race. Pure state logic
   and challenges; the components live next to this file. Tests in
   tests/errealak-dbh4ak-lab.test.ts.
   ========================================================================== */

export type RealsPercentLabToolId = 'decimals' | 'generatrix' | 'pythagoras' | 'zoom' | 'intervals' | 'rounding' | 'percent' | 'interest'

export interface RealsPercentLabTool extends LabToolInfo {
    id: RealsPercentLabToolId
    stage: RealsPercentStageId
}

const say = (eu: string, es: string, ar: string) => ({ eu, es, ar })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const applied = (id: string) => appliedTools.find((tool) => tool.id === id)!

export const realsPercentLabTools: RealsPercentLabTool[] = [
    { ...applied('decimals'), id: 'decimals', stage: 'rational', lessonTopic: 'decimal-kinds' },
    { ...applied('generatrix'), id: 'generatrix', stage: 'rational', lessonTopic: 'generatrix' },
    { id: 'pythagoras', stage: 'reals', lessonTopic: 'represent', title: say('Pitagorasen eraikitzailea', 'El constructor de Pitágoras', 'باني فيثاغورس'), observe: say('Aukeratu bi katetoak: hipotenusa $\\sqrt{a^{2}+b^{2}}$ da, eta konpasak zuzenera eramaten du. Karratu perfektua ez bada, puntua irrazionala da.', 'Elige los dos catetos: la hipotenusa mide $\\sqrt{a^{2}+b^{2}}$ y el compás la lleva a la recta. Si no es un cuadrado perfecto, el punto es irracional.', 'اختر الضلعين: طول الوتر $\\sqrt{a^{2}+b^{2}}$ والفرجار ينقله إلى المستقيم. وإن لم يكن مربعًا كاملًا فالنقطة غير نسبية.') },
    { ...applied('zoom'), id: 'zoom', stage: 'reals', lessonTopic: 'successive' },
    { ...applied('intervals'), id: 'intervals', stage: 'approx', lessonTopic: 'intervals' },
    { ...applied('rounding'), id: 'rounding', stage: 'approx', lessonTopic: 'rounding' },
    { id: 'percent', stage: 'percent', lessonTopic: 'chained', title: say('Ehuneko kateatuen makina', 'La máquina de porcentajes encadenados', 'آلة النسب المتسلسلة'), observe: say('Gehitu aldaketak: bakoitza aurrekoaren emaitzaren gainean aplikatzen da. Begiratu indize osoari: indizeak biderkatzen dira, ehunekoak ez dira batzen.', 'Añade variaciones: cada una se aplica sobre el resultado de la anterior. Mira el índice total: los índices se multiplican, los porcentajes no se suman.', 'أضف تغيرات: يُطبَّق كل منها على نتيجة السابق. انظر إلى المؤشر الكلي: تُضرب المؤشرات ولا تُجمع النسب.') },
    { id: 'interest', stage: 'interest', lessonTopic: 'interest-compare', title: say('Interesen lasterketa', 'La carrera de los intereses', 'سباق الفوائد'), observe: say('Aldatu kapitala, interes-tasa eta urteak. Sinplea zuzen batean hazten da (urtero gauza bera batuz); konposatua kurba batean (urtero indizeaz biderkatuz).', 'Cambia el capital, el rédito y los años. El simple crece en línea recta (sumando lo mismo cada año); el compuesto en una curva (multiplicando cada año por el índice).', 'غيّر رأس المال والمعدل والأعوام. البسيطة تنمو على خط مستقيم (بإضافة القدر نفسه كل عام) والمركبة على منحنى (بالضرب في المؤشر كل عام).') }
]

export const realsPercentLabToolForTopic: Record<string, RealsPercentLabToolId | undefined> = {
    'decimal-kinds': 'decimals',
    generatrix: 'generatrix',
    'order-density': 'zoom',
    irrational: 'zoom',
    'number-sets': 'zoom',
    represent: 'pythagoras',
    successive: 'zoom',
    intervals: 'intervals',
    'interval-ops': 'intervals',
    rounding: 'rounding',
    errors: 'rounding',
    'percent-basics': 'percent',
    'percent-change': 'percent',
    chained: 'percent',
    'percent-inverse': 'percent',
    'simple-interest': 'interest',
    'compound-interest': 'interest',
    'interest-compare': 'interest'
}

/* ---------- The Pythagoras builder ---------- */

export const LEG_LIMITS = { min: 1, max: 7 } as const

export interface PythagorasState {
    a: number
    b: number
}

export const initialPythagorasState: PythagorasState = { a: 1, b: 1 }

export const setLegs = (state: PythagorasState, patch: Partial<PythagorasState>): PythagorasState => ({
    a: clamp(patch.a ?? state.a, LEG_LIMITS.min, LEG_LIMITS.max),
    b: clamp(patch.b ?? state.b, LEG_LIMITS.min, LEG_LIMITS.max)
})

/** a² + b²: the number whose square root is drawn */
export const hypotenuseSquare = ({ a, b }: PythagorasState) => a * a + b * b

export const pythagorasChallenges: LabChallenge<PythagorasState>[] = [
    { id: 40901, prompt: say('Eraiki $\\sqrt{13}$.', 'Construye $\\sqrt{13}$.', 'ابنِ $\\sqrt{13}$.'), hint: say('$13=2^{2}+3^{2}$', '$13=2^{2}+3^{2}$', '$13=2^{2}+3^{2}$'), isSolved: (state) => hypotenuseSquare(state) === 13 },
    { id: 40902, prompt: say('Lortu hipotenusa oso bat: puntua arrazionala da.', 'Consigue una hipotenusa entera: el punto es racional.', 'احصل على وتر صحيح: النقطة نسبية.'), hint: say('Probatu 3 eta 4 katetoekin.', 'Prueba con catetos 3 y 4.', 'جرّب الضلعين 3 و4.'), isSolved: (state) => isPerfectSquare(hypotenuseSquare(state)) },
    { id: 40903, prompt: say('Eraiki $\\sqrt{50}$ (bi modu daude).', 'Construye $\\sqrt{50}$ (hay dos maneras).', 'ابنِ $\\sqrt{50}$ (توجد طريقتان).'), hint: say('$50=1^{2}+7^{2}=5^{2}+5^{2}$', '$50=1^{2}+7^{2}=5^{2}+5^{2}$', '$50=1^{2}+7^{2}=5^{2}+5^{2}$'), isSolved: (state) => hypotenuseSquare(state) === 50 },
    { id: 40904, prompt: say('Eraiki $2\\sqrt{2}$.', 'Construye $2\\sqrt{2}$.', 'ابنِ $2\\sqrt{2}$.'), hint: say('$2\\sqrt{2}=\\sqrt{8}=\\sqrt{2^{2}+2^{2}}$', '$2\\sqrt{2}=\\sqrt{8}=\\sqrt{2^{2}+2^{2}}$', '$2\\sqrt{2}=\\sqrt{8}=\\sqrt{2^{2}+2^{2}}$'), isSolved: (state) => { const { outside, inside } = simplifySqrt(hypotenuseSquare(state)); return outside === 2 && inside === 2 } }
]

/* ---------- The chained-percentages machine ---------- */

export const percentAmounts = [100, 200, 45, 94, 18000]
/** The changes the machine offers, in % (negative: decrease) */
export const percentSteps = [-50, -40, -30, -25, -20, -15, -12.5, -10, -5, 0, 5, 10, 12.5, 15, 20, 21, 25, 30, 40, 50, 100]
export const MAX_CHANGES = 3

export interface PercentState {
    amount: number
    /** Index into percentSteps of each change */
    steps: number[]
    /** How many of them are used */
    count: number
}

export const initialPercentState: PercentState = { amount: 0, steps: [percentSteps.indexOf(21), percentSteps.indexOf(0), percentSteps.indexOf(0)], count: 1 }

export function setPercent(state: PercentState, patch: { amount?: number; count?: number; step?: { index: number; value: number } }): PercentState {
    const steps = [...state.steps]
    if (patch.step) steps[patch.step.index] = clamp(patch.step.value, 0, percentSteps.length - 1)
    return {
        amount: clamp(patch.amount ?? state.amount, 0, percentAmounts.length - 1),
        steps,
        count: clamp(patch.count ?? state.count, 1, MAX_CHANGES)
    }
}

export const percentChanges = (state: PercentState) => state.steps.slice(0, state.count).map((index) => percentSteps[index])
export const percentStart = (state: PercentState) => percentAmounts[state.amount]
export const percentFinal = (state: PercentState) => applyChanges(percentStart(state), percentChanges(state))
export const percentIndex = (state: PercentState) => chainedIndex(percentChanges(state))

export const percentChallenges: LabChallenge<PercentState>[] = [
    { id: 41001, prompt: say('Bihurtu 200 zenbakia 242, aldaketa bakar batekin.', 'Convierte 200 en 242 con una sola variación.', 'حوّل 200 إلى 242 بتغير واحد.'), hint: say('$242:200=1{,}21$', '$242:200=1{,}21$', '$242:200=1.21$'), isSolved: (state) => state.count === 1 && percentStart(state) === 200 && percentFinal(state) === 242 },
    { id: 41002, prompt: say('Bi aldaketa (zero ez direnak) kantitatea berdin uzteko.', 'Dos variaciones (no nulas) que dejen la cantidad igual.', 'تغيران (غير صفريين) يُبقيان الكمية كما هي.'), hint: say('Igo % 25 eta jaitsi % 20: $1{,}25\\cdot 0{,}8=1$.', 'Sube un 25 % y baja un 20 %: $1{,}25\\cdot 0{,}8=1$.', 'زد 25 % وأنقص 20 %: $1.25\\cdot 0.8=1$.'), isSolved: (state) => state.count === 2 && percentChanges(state).every((change) => change !== 0) && percentIndex(state) === 1 },
    { id: 41003, prompt: say('Igo % 10 eta jaitsi % 10. Hasierara itzultzen zara?', 'Sube un 10 % y baja un 10 %. ¿Vuelves al principio?', 'زد 10 % ثم أنقص 10 %. هل تعود إلى البداية؟'), hint: say('Begiratu indize osoari: $1{,}1\\cdot 0{,}9$.', 'Mira el índice total: $1{,}1\\cdot 0{,}9$.', 'انظر إلى المؤشر الكلي: $1.1\\cdot 0.9$.'), isSolved: (state) => state.count === 2 && percentChanges(state)[0] === 10 && percentChanges(state)[1] === -10 },
    { id: 41004, prompt: say('Lortu 1,69 indizea bi igoera berdinekin.', 'Consigue el índice 1,69 con dos subidas iguales.', 'احصل على المؤشر 1.69 بزيادتين متساويتين.'), hint: say('$1{,}3^{2}=1{,}69$', '$1{,}3^{2}=1{,}69$', '$1.3^{2}=1.69$'), isSolved: (state) => state.count === 2 && percentChanges(state)[0] === percentChanges(state)[1] && percentIndex(state) === 1.69 },
    { id: 41005, prompt: say('Autoa: 18 000 €, % 20ko deskontua eta % 21 BEZ. Ordena aldatuta, prezioa aldatzen da?', 'El coche: 18 000 €, descuento del 20 % y 21 % de IVA. Si cambias el orden, ¿cambia el precio?', 'السيارة: 18 000 €، خصم 20 % وضريبة 21 %. إذا غيّرت الترتيب هل يتغير السعر؟'), hint: say('Biderketa trukakorra da: 17 424 € bi ordenetan.', 'La multiplicación es conmutativa: 17 424 € en los dos órdenes.', 'الضرب تبديلي: 17 424 € في الترتيبين.'), isSolved: (state) => percentStart(state) === 18000 && state.count === 2 && percentFinal(state) === 17424 }
]

/* ---------- The interest race ---------- */

export const interestCapitals = [1000, 2000, 5000, 600]
export const RATE_LIMITS = { min: 0.5, max: 12, step: 0.5 } as const
export const YEAR_LIMITS = { min: 1, max: 20 } as const

export interface InterestState {
    capital: number
    rate: number
    years: number
}

export const initialInterestState: InterestState = { capital: 0, rate: 2, years: 5 }

export function setInterest(state: InterestState, patch: Partial<InterestState>): InterestState {
    const rate = Math.min(RATE_LIMITS.max, Math.max(RATE_LIMITS.min, Math.round((patch.rate ?? state.rate) * 2) / 2))
    return {
        capital: clamp(patch.capital ?? state.capital, 0, interestCapitals.length - 1),
        rate,
        years: clamp(patch.years ?? state.years, YEAR_LIMITS.min, YEAR_LIMITS.max)
    }
}

export function interestInfo(state: InterestState) {
    const capital = interestCapitals[state.capital]
    const simple = Math.round((capital + simpleInterest(capital, state.rate, state.years)) * 100) / 100
    const compound = compoundFinal(capital, state.rate, state.years)
    return { capital, simple, compound, difference: Math.round((compound - simple) * 100) / 100 }
}

export const interestChallenges: LabChallenge<InterestState>[] = [
    { id: 41101, prompt: say('Egin konposatuak sinpleak baino gutxienez 100 € gehiago eman ditzan.', 'Haz que el compuesto dé al menos 100 € más que el simple.', 'اجعل المركبة تعطي 100 € على الأقل أكثر من البسيطة.'), hint: say('Igo tasa edo urteak: diferentzia azkar hazten da.', 'Sube el rédito o los años: la diferencia crece deprisa.', 'ارفع المعدل أو الأعوام: يكبر الفرق بسرعة.'), isSolved: (state) => interestInfo(state).difference >= 100 },
    { id: 41102, prompt: say('Bikoiztu kapitala interes konposatuarekin 8 urtean edo gutxiagoan.', 'Duplica el capital con interés compuesto en 8 años o menos.', 'ضاعف رأس المال بالفائدة المركبة في 8 أعوام أو أقل.'), hint: say('% 9an, $1{,}09^{8}\\approx 1{,}99$: ia. Probatu % 9,5 edo % 10.', 'Al 9 %, $1{,}09^{8}\\approx 1{,}99$: casi. Prueba el 9,5 % o el 10 %.', 'بنسبة 9 %: $1.09^{8}\\approx 1.99$: تقريبًا. جرّب 9.5 % أو 10 %.'), isSolved: (state) => state.years <= 8 && interestInfo(state).compound >= 2 * interestInfo(state).capital },
    { id: 41103, prompt: say('Aurkitu bi interesek zenbateko bera noiz ematen duten.', 'Encuentra cuándo los dos intereses dan lo mismo.', 'جد متى تعطي الفائدتان القدر نفسه.'), hint: say('Lehen urteko interesak oraindik ez du interesik sortu.', 'El interés del primer año todavía no ha generado intereses.', 'فائدة العام الأول لم تولّد بعد فوائد.'), isSolved: (state) => state.years === 1 },
    { id: 41104, prompt: say('Bikoiztu kapitala interes sinplearekin.', 'Duplica el capital con interés simple.', 'ضاعف رأس المال بالفائدة البسيطة.'), hint: say('$\\frac{C\\cdot r\\cdot t}{100}=C$ denean: $r\\cdot t=100$, adibidez % 10 10 urtez.', 'Cuando $\\frac{C\\cdot r\\cdot t}{100}=C$: $r\\cdot t=100$, por ejemplo el 10 % durante 10 años.', 'عندما $\\frac{C\\cdot r\\cdot t}{100}=C$: $r\\cdot t=100$ مثلًا 10 % لمدة 10 أعوام.'), isSolved: (state) => interestInfo(state).simple === 2 * interestInfo(state).capital }
]

export const realsPercentLabChallengeIds: number[] = [decimalsChallenges, generatrixChallenges, pythagorasChallenges, zoomChallenges, intervalsChallenges, roundingChallenges, percentChallenges, interestChallenges].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
