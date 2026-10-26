import { add, divide, equals, fraction, multiply, toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { ProportionDbh2StageId } from '../lessons.tsx'
import { percentChallenges, tableChallenges } from '../../dbh1-proportzionaltasuna-v2/lab/labTools.ts'

/* ==========================================================================
   Proportzionaltasuna eta ehunekoak (2. DBH) laboratory. The table and the
   percentage tool come from the first-year unit; the new tools are the
   compound-proportionality machine (choose direct or inverse for each
   magnitude of the textbook problems), proportional shares drawn as bars,
   chained percentages with their indices, and simple interest year by
   year. The shares, chained percentages and interest also make endless
   challenges (4. DBH aplikatuak uses these tools too). Pure state logic;
   the components live next to this file. Tests in
   tests/proportzionaltasuna-dbh2-lab.test.ts.
   ========================================================================== */

export type ProportionDbh2LabToolId = 'table' | 'compound' | 'share' | 'percent' | 'chain' | 'interest'

export interface ProportionDbh2LabTool extends LabToolInfo {
    id: ProportionDbh2LabToolId
    stage: ProportionDbh2StageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string) => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const n = (value: number) => fraction(value)

export const proportionDbh2LabTools: ProportionDbh2LabTool[] = [
    { id: 'table', stage: 'proportions', lessonTopic: 'direct-review', title: say('Taula eta grafikoa', 'La tabla y su gráfica', 'الجدول والرسم البياني'), observe: say('Zuzenean zatidura konstantea da eta puntuak zuzen batean daude; alderantzizkoan biderkadura konstantea da eta puntuak kurba batean.', 'En la directa el cociente es constante y los puntos están en una recta; en la inversa el producto es constante y los puntos, en una curva.', 'في الطردي حاصل القسمة ثابت والنقاط على مستقيم؛ وفي العكسي حاصل الضرب ثابت والنقاط على منحنى.') },
    { id: 'compound', stage: 'compound', lessonTopic: 'compound-mixed', title: say('Proportzionaltasun konposatuaren makina', 'La máquina de proporcionalidad compuesta', 'آلة التناسب المركّب'), observe: say('Magnitude bakoitzeko erabaki: zuzena (berria/zaharra) ala alderantzizkoa (zaharra/berria). Ezezaguna zatiki guztiez biderkatzen da.', 'Para cada magnitud decide: directa (nuevo/viejo) o inversa (viejo/nuevo). La incógnita se multiplica por todas las fracciones.', 'قرّر لكل مقدار: طردي (الجديد/القديم) أم عكسي (القديم/الجديد). ويُضرب المجهول في كل الكسور.') },
    { id: 'share', stage: 'shares', lessonTopic: 'direct-share', title: say('Banaketak', 'Repartos', 'التوزيعات'), observe: say('Zuzenean zenbaki handienak zati handiena hartzen du; alderantzizkoan, txikiena. Zatien batura beti kantitate osoa da.', 'En el directo el número mayor se lleva la parte mayor; en el inverso, la menor. Las partes siempre suman la cantidad entera.', 'في الطردي يأخذ العدد الأكبر الجزء الأكبر؛ وفي العكسي الأصغر. ومجموع الأجزاء يساوي الكمية كلها دائمًا.') },
    { id: 'percent', stage: 'percent', lessonTopic: 'percent-forms', title: say('Ehunekoak', 'Porcentajes', 'النسب المئوية'), observe: say('Kantitate baten % p kalkulatzeko, biderkatu p : 100 hamartarraz. «Hiru forma» moduan zatiki bera hamartar eta ehuneko gisa ikusten da.', 'Para el p % de una cantidad, multiplica por el decimal p : 100. En «Tres formas» se ve la misma fracción como decimal y como porcentaje.', 'لحساب p٪ من كمية اضرب في العدد العشري p : 100. وفي «ثلاث صيغ» يظهر الكسر نفسه عددًا عشريًا ونسبة مئوية.') },
    { id: 'chain', stage: 'changes', lessonTopic: 'chained', title: say('Ehuneko kateatuak', 'Porcentajes encadenados', 'النسب المتتالية'), observe: say('Aldaketa bakoitza bere indizeaz biderkatzen da. % 10 igo eta % 10 jaitsiz gero, ez da hasierara itzultzen.', 'Cada cambio multiplica por su índice. Si subes un 10 % y bajas un 10 %, no vuelves al principio.', 'كل تغيّر يضرب في مؤشره. إذا زدت 10٪ ثم خفّضت 10٪ فلن تعود إلى البداية.') },
    { id: 'interest', stage: 'changes', lessonTopic: 'interest', title: say('Interes bakuna', 'Interés simple', 'الفائدة البسيطة'), observe: say('Urtero interes bera gehitzen da, hasierako kapitalaren % r. Urte bikoitza edo tasa bikoitza → interes bikoitza.', 'Cada año se suma el mismo interés, el r % del capital inicial. El doble de años o el doble de tipo → el doble de interés.', 'تُضاف كل سنة الفائدة نفسها، r٪ من رأس المال الأصلي. ضعف السنوات أو ضعف السعر ← ضعف الفائدة.') }
]

export const proportionDbh2LabToolForTopic: Record<string, ProportionDbh2LabToolId | undefined> = {
    'proportion-review': 'table',
    'direct-review': 'table',
    'inverse-review': 'table',
    'compound-direct': 'compound',
    'compound-mixed': 'compound',
    'compound-unit': 'compound',
    'direct-share': 'share',
    'share-problems': 'share',
    'inverse-share': 'share',
    'percent-forms': 'percent',
    'percent-total': 'percent',
    'percent-which': 'percent',
    index: 'chain',
    chained: 'chain',
    interest: 'interest'
}

/* ---------- 1. The compound-proportionality machine ---------- */

export type Relation = 'direct' | 'inverse'

interface Magnitude {
    name: { eu: string; es: string; ar: string }
    old: FractionValue
    next: FractionValue
    relation: Relation
}

export interface CompoundProblem {
    text: { eu: string; es: string; ar: string }
    unknown: { eu: string; es: string; ar: string }
    known: FractionValue
    magnitudes: [Magnitude, Magnitude]
}

const decimal = (whole: number, tenths: number) => fraction(whole * 10 + tenths, 10)

export const compoundProblems: CompoundProblem[] = [
    {
        text: say('Igeltseroak: egunean 10 h, 18 egun → 600 m². Egunean 8 h, 15 egun → ?', 'Albañiles: 10 h/día, 18 días → 600 m². 8 h/día, 15 días → ?', 'بنّاؤون: 10 س/يوم، 18 يومًا ← 600 م². 8 س/يوم، 15 يومًا ← ؟'),
        unknown: say('m²', 'm²', 'م²'),
        known: n(600),
        magnitudes: [
            { name: say('h/egun', 'h/día', 'س/يوم'), old: n(10), next: n(8), relation: 'direct' },
            { name: say('Egunak', 'Días', 'الأيام'), old: n(18), next: n(15), relation: 'direct' }
        ]
    },
    {
        text: say('Pentsua: 294 kg, 15 behi → 7 egun. 840 kg, 10 behi → ?', 'Pienso: 294 kg, 15 vacas → 7 días. 840 kg, 10 vacas → ?', 'العلف: 294 كغ، 15 بقرة ← 7 أيام. 840 كغ، 10 أبقار ← ؟'),
        unknown: say('Egunak', 'Días', 'الأيام'),
        known: n(7),
        magnitudes: [
            { name: say('Pentsua (kg)', 'Pienso (kg)', 'العلف (كغ)'), old: n(294), next: n(840), relation: 'direct' },
            { name: say('Behiak', 'Vacas', 'الأبقار'), old: n(15), next: n(10), relation: 'inverse' }
        ]
    },
    {
        text: say('Hondeamakina: 1000 m, egunean 10 h → 8 egun. 600 m, egunean 12 h → ?', 'Excavadora: 1000 m, 10 h/día → 8 días. 600 m, 12 h/día → ?', 'حفّارة: 1000 م، 10 س/يوم ← 8 أيام. 600 م، 12 س/يوم ← ؟'),
        unknown: say('Egunak', 'Días', 'الأيام'),
        known: n(8),
        magnitudes: [
            { name: say('Metroak', 'Metros', 'الأمتار'), old: n(1000), next: n(600), relation: 'direct' },
            { name: say('h/egun', 'h/día', 'س/يوم'), old: n(10), next: n(12), relation: 'inverse' }
        ]
    },
    {
        text: say('Aspertsoreak: 3, 1,5 l/s → 8 h. 4, 0,9 l/s → ?', 'Aspersores: 3, 1,5 l/s → 8 h. 4, 0,9 l/s → ?', 'رشّاشات: 3، 1.5 ل/ث ← 8 س. 4، 0.9 ل/ث ← ؟'),
        unknown: say('Orduak', 'Horas', 'الساعات'),
        known: n(8),
        magnitudes: [
            { name: say('Aspertsoreak', 'Aspersores', 'الرشّاشات'), old: n(3), next: n(4), relation: 'inverse' },
            { name: say('Emaria (l/s)', 'Caudal (l/s)', 'التدفق (ل/ث)'), old: decimal(1, 5), next: decimal(0, 9), relation: 'inverse' }
        ]
    }
]

export interface CompoundState {
    problem: number
    relations: [Relation | null, Relation | null]
    /** Problems solved with the right relations */
    solved: number[]
}

export const initialCompoundState: CompoundState = { problem: 0, relations: [null, null], solved: [] }

/** The factor each magnitude adds: new/old if direct, old/new if inverse */
export const factor = (magnitude: Magnitude, relation: Relation) => (relation === 'direct' ? divide(magnitude.next, magnitude.old) : divide(magnitude.old, magnitude.next))

/** The result with the chosen relations, or null while one is missing */
export function compoundResult(state: Pick<CompoundState, 'problem' | 'relations'>): FractionValue | null {
    const problem = compoundProblems[state.problem]
    if (state.relations.some((relation) => relation === null)) return null
    return problem.magnitudes.reduce((value, magnitude, index) => multiply(value, factor(magnitude, state.relations[index]!)), problem.known)
}

export const rightRelations = (problem: number): [Relation, Relation] => [compoundProblems[problem].magnitudes[0].relation, compoundProblems[problem].magnitudes[1].relation]

export const chooseCompoundProblem = (state: CompoundState, problem: number): CompoundState => ({ ...state, problem: clamp(problem, 0, compoundProblems.length - 1), relations: [null, null] })

export function chooseRelation(state: CompoundState, index: 0 | 1, relation: Relation): CompoundState {
    const relations: [Relation | null, Relation | null] = [...state.relations]
    relations[index] = relation
    const right = rightRelations(state.problem)
    const solved = relations[0] === right[0] && relations[1] === right[1] && !state.solved.includes(state.problem) ? [...state.solved, state.problem] : state.solved
    return { ...state, relations, solved }
}

export const compoundChallenges: LabChallenge<CompoundState>[] = [
    { id: 21201, prompt: say('Ebatzi igeltseroen problema.', 'Resuelve el problema de los albañiles.', 'حلّ مسألة البنّائين.'), hint: say('Ordu gehiago eta egun gehiago → m² gehiago.', 'Más horas y más días → más m².', 'ساعات أكثر وأيام أكثر ← م² أكثر.'), isSolved: (state) => state.solved.includes(0) },
    { id: 21202, prompt: say('Ebatzi zuzena eta alderantzizkoa nahasten dituen problema bat.', 'Resuelve un problema que mezcle directa e inversa.', 'حلّ مسألة تمزج الطردي والعكسي.'), hint: say('Pentsua edo hondeamakina.', 'El pienso o la excavadora.', 'العلف أو الحفّارة.'), isSolved: (state) => state.solved.includes(1) || state.solved.includes(2) },
    { id: 21203, prompt: say('Ebatzi bi erlazioak alderantzizkoak dituen problema.', 'Resuelve el problema con las dos relaciones inversas.', 'حلّ المسألة التي علاقتاها عكسيتان.'), hint: say('Aspertsore gehiago edo emari handiagoa → ordu gutxiago.', 'Más aspersores o más caudal → menos horas.', 'رشّاشات أكثر أو تدفق أكبر ← ساعات أقل.'), isSolved: (state) => state.solved.includes(3) },
    { id: 21204, prompt: say('Ebatzi lau problemak.', 'Resuelve los cuatro problemas.', 'حلّ المسائل الأربع.'), hint: say('Galdetu beti: hau handitzean, ezezaguna handitu ala txikitu?', 'Pregúntate siempre: al crecer esta, ¿la incógnita crece o decrece?', 'اسأل دائمًا: حين يزيد هذا هل يزيد المجهول أم ينقص؟'), isSolved: (state) => compoundProblems.every((_, problem) => state.solved.includes(problem)) }
]

/* ---------- 2. Proportional shares ---------- */

export const SHARE_TOTALS = [120, 180, 360, 620, 1200, 22000] as const
export const SHARE_NUMBER_MAX = 10

export interface ShareState {
    total: number
    numbers: [number, number, number]
    relation: Relation
}

/** Not the first challenge's numbers, so that it is not solved on arrival */
export const initialShareState: ShareState = { total: 120, numbers: [1, 2, 3], relation: 'direct' }

export function setShare(state: ShareState, patch: Partial<Omit<ShareState, 'numbers'>> & { number?: [0 | 1 | 2, number] }): ShareState {
    const numbers: [number, number, number] = [...state.numbers]
    if (patch.number) numbers[patch.number[0]] = clamp(patch.number[1], 1, SHARE_NUMBER_MAX)
    return { total: patch.total ?? state.total, numbers, relation: patch.relation ?? state.relation }
}

/** The weight of each number: itself (direct) or its inverse */
const weights = (state: ShareState) => state.numbers.map((value) => (state.relation === 'direct' ? n(value) : fraction(1, value)))

export function shareParts(state: ShareState): FractionValue[] {
    const list = weights(state)
    const sum = list.reduce((total, weight) => add(total, weight), n(0))
    return list.map((weight) => divide(multiply(n(state.total), weight), sum))
}

const hasParts = (state: ShareState, wanted: number[]) => {
    const parts = shareParts(state)
    return wanted.every((value, index) => equals(parts[index], n(value)))
}
const sortedMatch = (state: ShareState, numbers: number[]) => [...state.numbers].sort((a, b) => a - b).join() === [...numbers].sort((a, b) => a - b).join()

export const shareChallenges: LabChallenge<ShareState>[] = [
    { id: 21301, prompt: say('Banatu 180 zuzenki 2, 5 eta 8rekiko.', 'Reparte 180 directamente a 2, 5 y 8.', 'وزّع 180 طرديًا على 2 و5 و8.'), hint: say('Aukeratu 180, «Zuzena» eta zenbakiak.', 'Elige 180, «Directo» y los números.', 'اختر 180 و«طردي» والأعداد.'), isSolved: (state) => state.total === 180 && state.relation === 'direct' && sortedMatch(state, [2, 5, 8]) },
    { id: 21302, prompt: say('Banatu 620 alderantziz 2, 3 eta 5ekiko.', 'Reparte 620 inversamente a 2, 3 y 5.', 'وزّع 620 عكسيًا على 2 و3 و5.'), hint: say('Zatiak: 300, 200 eta 120.', 'Las partes: 300, 200 y 120.', 'الأجزاء: 300 و200 و120.'), isSolved: (state) => state.total === 620 && state.relation === 'inverse' && sortedMatch(state, [2, 3, 5]) },
    { id: 21303, prompt: say('Egin hiru zatiak berdinak diren banaketa bat.', 'Haz un reparto en el que las tres partes sean iguales.', 'أنشئ توزيعًا تتساوى فيه الأجزاء الثلاثة.'), hint: say('Zenbaki berdinak.', 'Números iguales.', 'أعداد متساوية.'), isSolved: (state) => { const parts = shareParts(state); return equals(parts[0], parts[1]) && equals(parts[1], parts[2]) } },
    { id: 21304, prompt: say('Banatu 22 000 € saria: 12 000, 6000 eta 4000.', 'Reparte el premio de 22 000 €: 12 000, 6000 y 4000.', 'وزّع جائزة 22000 €: 12000 و6000 و4000.'), hint: say('Postuarekiko alderantziz: 1, 2 eta 3.', 'Inversamente al puesto: 1, 2 y 3.', 'عكسيًا مع الترتيب: 1 و2 و3.'), isSolved: (state) => state.total === 22000 && hasParts(state, [12000, 6000, 4000]) }
]

/* ---------- 3. Chained percentages ---------- */

export const CHAIN_STARTS = [80, 100, 200, 500] as const
export const CHANGE_LIMIT = 50
export const CHANGE_STEP = 5

export interface ChainState {
    start: number
    changes: [number, number, number]
}

export const initialChainState: ChainState = { start: 100, changes: [10, 0, 0] }

export function setChain(state: ChainState, patch: { start?: number; change?: [0 | 1 | 2, number] }): ChainState {
    const changes: [number, number, number] = [...state.changes]
    if (patch.change) changes[patch.change[0]] = clamp(Math.round(patch.change[1] / CHANGE_STEP) * CHANGE_STEP, -CHANGE_LIMIT, CHANGE_LIMIT)
    return { start: patch.start ?? state.start, changes }
}

/** The index of a change of p %: (100 + p) / 100 */
export const changeIndex = (percent: number) => fraction(100 + percent, 100)
export const chainIndex = (state: ChainState) => state.changes.reduce((value, percent) => multiply(value, changeIndex(percent)), n(1))
export const chainFinal = (state: ChainState) => multiply(n(state.start), chainIndex(state))
const activeChanges = (state: ChainState) => state.changes.filter((percent) => percent !== 0)

export const chainChallenges: LabChallenge<ChainState>[] = [
    { id: 21401, prompt: say('100etik abiatuta, igo % 10 eta jaitsi % 10.', 'Desde 100, sube un 10 % y baja un 10 %.', 'من 100، زِد 10٪ ثم خفّض 10٪.'), hint: say('Ez da 100 izango.', 'No dará 100.', 'لن تكون 100.'), isSolved: (state) => state.start === 100 && activeChanges(state).length === 2 && activeChanges(state).includes(10) && activeChanges(state).includes(-10) },
    { id: 21402, prompt: say('Lortu $0{,}72$ indize osoa.', 'Consigue un índice total de $0{,}72$.', 'احصل على مؤشر كلي $0{,}72$.'), hint: say('$0{,}8\\cdot 0{,}9$.', '$0{,}8\\cdot 0{,}9$.', '$0{,}8\\cdot 0{,}9$.'), isSolved: (state) => equals(chainIndex(state), fraction(72, 100)) },
    { id: 21403, prompt: say('Bi aldaketarekin, itzuli hasierako prezio berera.', 'Con dos cambios, vuelve exactamente al precio inicial.', 'بتغيّرين، عُد إلى السعر الأصلي تمامًا.'), hint: say('Probatu % 25 igo eta % 20 jaitsi.', 'Prueba a subir un 25 % y bajar un 20 %.', 'جرّب زيادة 25٪ ثم تخفيض 20٪.'), isSolved: (state) => activeChanges(state).length === 2 && equals(chainIndex(state), n(1)) },
    { id: 21404, prompt: say('200etik abiatuta, iritsi 180ra bi aldaketarekin.', 'Desde 200, llega a 180 con dos cambios.', 'من 200، صِل إلى 180 بتغيّرين.'), hint: say('% 20 igo eta % 25 jaitsi.', 'Sube un 20 % y baja un 25 %.', 'زِد 20٪ ثم خفّض 25٪.'), isSolved: (state) => state.start === 200 && activeChanges(state).length === 2 && equals(chainFinal(state), n(180)) }
]

/* ---------- 4. Simple interest ---------- */

export const CAPITALS = [1000, 2000, 3000, 5000, 8000] as const
export const RATE_MAX = 10
export const YEARS_MAX = 10

export interface InterestState {
    capital: number
    rate: number
    years: number
}

export const initialInterestState: InterestState = { capital: 2000, rate: 3, years: 2 }

export const setInterest = (state: InterestState, patch: Partial<InterestState>): InterestState => ({
    capital: patch.capital ?? state.capital,
    rate: clamp(patch.rate ?? state.rate, 1, RATE_MAX),
    years: clamp(patch.years ?? state.years, 1, YEARS_MAX)
})

export const interestOf = (state: InterestState) => fraction(state.capital * state.rate * state.years, 100)

export const interestChallenges: LabChallenge<InterestState>[] = [
    { id: 21501, prompt: say('Kalkulatu 8000 €-ren interesa % 5ean 3 urtez.', 'Calcula el interés de 8000 € al 5 % durante 3 años.', 'احسب فائدة 8000 € بنسبة 5٪ مدة 3 سنوات.'), hint: say('Aukeratu datuak.', 'Elige los datos.', 'اختر المعطيات.'), isSolved: (state) => state.capital === 8000 && state.rate === 5 && state.years === 3 },
    { id: 21502, prompt: say('3000 €-rekin, lortu zehazki 600 € interes.', 'Con 3000 €, consigue exactamente 600 € de interés.', 'بـ3000 € احصل على فائدة 600 € تمامًا.'), hint: say('$r\\cdot t=20$.', '$r\\cdot t=20$.', '$r\\cdot t=20$.'), isSolved: (state) => state.capital === 3000 && equals(interestOf(state), n(600)) },
    { id: 21503, prompt: say('Bikoiztu kapitala: interesa kapitalaren berdina izan dadila.', 'Dobla el capital: que el interés sea igual al capital.', 'ضاعف رأس المال: لتكن الفائدة مساوية لرأس المال.'), hint: say('$r\\cdot t=100$.', '$r\\cdot t=100$.', '$r\\cdot t=100$.'), isSolved: (state) => equals(interestOf(state), n(state.capital)) },
    { id: 21504, prompt: say('5000 €-rekin, lortu 1000 € interes.', 'Con 5000 €, consigue 1000 € de interés.', 'بـ5000 € احصل على فائدة 1000 €.'), hint: say('Urteko 250 € → % 5, 4 urte.', '250 € al año → 5 %, 4 años.', '250 € سنويًا ← 5٪، 4 سنوات.'), isSolved: (state) => state.capital === 5000 && equals(interestOf(state), n(1000)) }
]

/* ---------- Endless challenges: shares, chained percentages and interest ---------- */

/** An endless challenge is never already solved by the tool's first state */
function freshFrom<State>(start: State, maker: LabChallengeMaker<State>): LabChallengeMaker<State> {
    return (random) => {
        for (;;) {
            const challenge = maker(random)
            if (!challenge.isSolved(start)) return challenge
        }
    }
}

/** 22 000 with a space in Basque and Spanish; Arabic keeps the plain digits */
const big = (value: number) => (value >= 10000 ? String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(value))
/** An exact decimal for a sentence (comma, or the point in Arabic) and inside LaTeX */
const decimalText = (value: FractionValue, point = false) => (toExactDecimal(value, point ? '.' : ',') ?? String(toNumber(value)))
const decimalLatex = (value: FractionValue) => decimalText(value).replace(',', '{,}')
const sameParts = (state: ShareState, wanted: number[]) => {
    const parts = shareParts(state).map(toNumber).sort((a, b) => a - b)
    const sorted = [...wanted].sort((a, b) => a - b)
    return parts.every((part, index) => Math.abs(part - sorted[index]) < 1e-9)
}

/** Shares: find the numbers that give some parts, or share a total and read the parts */
export const shareExtra: LabChallengeMaker<ShareState> = freshFrom(initialShareState, (random) => {
    for (;;) {
        const relation: Relation = random() < 0.5 ? 'direct' : 'inverse'
        const numbers: [number, number, number] = [randomInt(random, 1, SHARE_NUMBER_MAX), randomInt(random, 1, SHARE_NUMBER_MAX), randomInt(random, 1, SHARE_NUMBER_MAX)]
        const total = pick(random, SHARE_TOTALS)
        const solution: ShareState = { total, numbers, relation }
        const parts = shareParts(solution)
        if (parts.some((part) => part.denominator !== 1) || new Set(numbers).size === 1) continue
        const values = parts.map(toNumber)
        if (random() < 0.5) {
            const [p1, p2, p3] = [...values].sort((a, b) => b - a)
            return {
                prompt: say(
                    `Banatu ${big(total)}, zatiak ${big(p1)}, ${big(p2)} eta ${big(p3)} izan daitezen.`,
                    `Reparte ${big(total)} de forma que las partes sean ${big(p1)}, ${big(p2)} y ${big(p3)}.`,
                    `وزّع ${total} بحيث تكون الأجزاء ${p1} و${p2} و${p3}.`
                ),
                hint: say(
                    'Zatitu hiru zatiak beren ZKH-az. 10 baino handiagoak ateratzen badira, probatu alderantzizko banaketa.',
                    'Divide las tres partes entre su m.c.d. Si salen números mayores que 10, prueba el reparto inverso.',
                    'اقسم الأجزاء الثلاثة على قاسمها المشترك الأكبر. إذا خرجت أعداد أكبر من 10، جرّب التوزيع العكسي.'
                ),
                isSolved: (state) => state.total === total && sameParts(state, values),
                solution
            }
        }
        const [a, b, c] = numbers
        const sum = a + b + c
        return {
            prompt: relation === 'direct'
                ? say(`Banatu ${big(total)} zuzenki ${a}, ${b} eta ${c} zenbakiekiko. Zenbat dagokio bakoitzari?`, `Reparte ${big(total)} directamente a ${a}, ${b} y ${c}. ¿Cuánto le toca a cada uno?`, `وزّع ${total} طرديًا على ${a} و${b} و${c}. كم نصيب كل واحد؟`)
                : say(`Banatu ${big(total)} alderantziz ${a}, ${b} eta ${c} zenbakiekiko. Zenbat dagokio bakoitzari?`, `Reparte ${big(total)} inversamente a ${a}, ${b} y ${c}. ¿Cuánto le toca a cada uno?`, `وزّع ${total} عكسيًا على ${a} و${b} و${c}. كم نصيب كل واحد؟`),
            hint: relation === 'direct'
                ? say(`Batu zenbakiak eta zatitu: zati bakoitzak $${total}\\mathbin{:}${sum}$ balio du.`, `Suma los números y divide: cada parte vale $${total}\\mathbin{:}${sum}$.`, `اجمع الأعداد واقسم: كل جزء يساوي $${total}\\mathbin{:}${sum}$.`)
                : say(`Banatu zuzenki alderantzizkoekiko: $\\frac{1}{${a}},\\ \\frac{1}{${b}},\\ \\frac{1}{${c}}$.`, `Reparte directamente a los inversos: $\\frac{1}{${a}},\\ \\frac{1}{${b}},\\ \\frac{1}{${c}}$.`, `وزّع طرديًا على المقلوبات: $\\frac{1}{${a}},\\ \\frac{1}{${b}},\\ \\frac{1}{${c}}$.`),
            isSolved: (state) => state.total === total && state.relation === relation && sortedMatch(state, numbers),
            solution
        }
    }
})

/** A change of the tool: −50 % to +50 % in fives, never 0 */
const change = (random: () => number) => {
    for (;;) {
        const percent = CHANGE_STEP * randomInt(random, -CHANGE_LIMIT / CHANGE_STEP, CHANGE_LIMIT / CHANGE_STEP)
        if (percent !== 0) return percent
    }
}

/** Chained percentages: reach a final price, a total index, or go up and down by the same percentage */
export const chainExtra: LabChallengeMaker<ChainState> = freshFrom(initialChainState, (random) => {
    const kind = random()
    for (;;) {
        const start = pick(random, CHAIN_STARTS)
        const first = change(random)
        const second = kind < 0.75 ? change(random) : -first
        const solution: ChainState = { start, changes: [first, second, 0] }
        const index = chainIndex(solution)
        const final = chainFinal(solution)
        if (kind < 0.4) {
            if (equals(final, n(start)) || toExactDecimal(final, ',') === null || (toExactDecimal(final, ',')!.split(',')[1] ?? '').length > 2) continue
            return {
                prompt: say(
                    `Hasierako prezioa: ${start} €. Bi aldaketarekin, lortu azken prezioa ${decimalText(final)} € izatea.`,
                    `Precio inicial: ${start} €. Con dos cambios, consigue que el precio final sea ${decimalText(final)} €.`,
                    `السعر الأصلي ${start} €. بتغيّرين اجعل السعر النهائي ${decimalText(final, true)} €.`
                ),
                hint: say(
                    `Indize osoa: $${decimalLatex(final)}\\mathbin{:}${start}=${decimalLatex(index)}$. Bilatu biderkatuta hori ematen duten bi indize.`,
                    `Índice total: $${decimalLatex(final)}\\mathbin{:}${start}=${decimalLatex(index)}$. Busca dos índices que multiplicados den eso.`,
                    `المؤشر الكلي: $${decimalLatex(final)}\\mathbin{:}${start}=${decimalLatex(index)}$. ابحث عن مؤشرين حاصل ضربهما هذا.`
                ),
                isSolved: (state) => state.start === start && activeChanges(state).length === 2 && equals(chainFinal(state), final),
                solution
            }
        }
        if (kind < 0.75) {
            if (equals(index, n(1))) continue
            return {
                prompt: say(`Lortu $${decimalLatex(index)}$ indize osoa.`, `Consigue un índice total de $${decimalLatex(index)}$.`, `احصل على مؤشر كلي $${decimalLatex(index)}$.`),
                hint: say(
                    `Aldaketa bakoitzaren indizea $1+\\frac{p}{100}$ da, eta indizeak biderkatzen dira.`,
                    `Cada cambio tiene índice $1+\\frac{p}{100}$, y los índices se multiplican.`,
                    `لكل تغيّر مؤشر $1+\\frac{p}{100}$، والمؤشرات تُضرب.`
                ),
                isSolved: (state) => equals(chainIndex(state), index),
                solution
            }
        }
        const up = Math.abs(first)
        return {
            prompt: say(
                `Hasierako prezioa: ${start} €. Igo % ${up} eta gero jaitsi % ${up}. Hasierako preziora itzultzen zara?`,
                `Desde ${start} €, sube un ${up} % y después baja un ${up} %. ¿Vuelves al precio inicial?`,
                `السعر الأصلي ${start} €. زِده ${up}٪ ثم خفّضه ${up}٪. هل تعود إلى السعر الأصلي؟`
            ),
            hint: say(
                `Biderkatu indizeak: $${decimalLatex(changeIndex(up))}\\cdot ${decimalLatex(changeIndex(-up))}$.`,
                `Multiplica los índices: $${decimalLatex(changeIndex(up))}\\cdot ${decimalLatex(changeIndex(-up))}$.`,
                `اضرب المؤشرين: $${decimalLatex(changeIndex(up))}\\cdot ${decimalLatex(changeIndex(-up))}$.`
            ),
            isSolved: (state) => state.start === start && activeChanges(state).join() === `${up},${-up}`,
            solution: { start, changes: [up, -up, 0] }
        }
    }
})

/** Simple interest: an exact interest from a capital, the years for a rate, or the rate for some years */
export const interestExtra: LabChallengeMaker<InterestState> = freshFrom(initialInterestState, (random) => {
    const solution: InterestState = { capital: pick(random, CAPITALS), rate: randomInt(random, 1, RATE_MAX), years: randomInt(random, 1, YEARS_MAX) }
    const { capital, rate, years } = solution
    const interest = toNumber(interestOf(solution))
    const kind = random()
    if (kind < 0.4) {
        return {
            prompt: say(`Kapitala: ${capital} €. Lortu zehazki ${interest} € interes.`, `Con ${capital} €, consigue exactamente ${interest} € de interés.`, `برأس مال ${capital} € احصل على فائدة ${interest} € تمامًا.`),
            hint: say(
                `$I=\\frac{${capital}\\cdot r\\cdot t}{100}$: behar duzu $r\\cdot t=${rate * years}$.`,
                `$I=\\frac{${capital}\\cdot r\\cdot t}{100}$: necesitas $r\\cdot t=${rate * years}$.`,
                `$I=\\frac{${capital}\\cdot r\\cdot t}{100}$: تحتاج إلى $r\\cdot t=${rate * years}$.`
            ),
            isSolved: (state) => state.capital === capital && equals(interestOf(state), n(interest)),
            solution
        }
    }
    const yearly = (capital * rate) / 100
    if (kind < 0.7) {
        return {
            prompt: say(
                `Kapitala: ${capital} €; interes-tasa: % ${rate}. Zenbat urte behar dira ${interest} € interes lortzeko?`,
                `¿Cuántos años tienen que estar ${capital} € al ${rate} % para producir ${interest} € de interés?`,
                `رأس المال ${capital} € بفائدة ${rate}٪. كم سنة يلزم للحصول على فائدة ${interest} €؟`
            ),
            hint: say(
                `Urtero $\\frac{${capital}\\cdot ${rate}}{100}=${decimalLatex(fraction(capital * rate, 100))}$ € sortzen ditu.`,
                `Cada año produce $\\frac{${capital}\\cdot ${rate}}{100}=${decimalLatex(fraction(capital * rate, 100))}$ €.`,
                `ينتج كل سنة $\\frac{${capital}\\cdot ${rate}}{100}=${decimalLatex(fraction(capital * rate, 100))}$ €.`
            ),
            isSolved: (state) => state.capital === capital && state.rate === rate && equals(interestOf(state), n(interest)),
            solution
        }
    }
    return {
        prompt: say(
            `Kapitala: ${capital} €; ${years} urte. Zer interes-tasarekin lortzen da ${interest} € interes?`,
            `¿A qué tipo de interés producen ${capital} € en ${years} ${years === 1 ? 'año' : 'años'} un interés de ${interest} €?`,
            `رأس المال ${capital} € وعدد السنوات ${years}. بأي سعر فائدة نحصل على فائدة ${interest} €؟`
        ),
        hint: say(
            `Urtero $${interest}\\mathbin{:}${years}=${yearly}$ € sortu behar ditu.`,
            `Cada año tiene que producir $${interest}\\mathbin{:}${years}=${yearly}$ €.`,
            `يجب أن ينتج كل سنة $${interest}\\mathbin{:}${years}=${yearly}$ €.`
        ),
        isSolved: (state) => state.capital === capital && state.years === years && equals(interestOf(state), n(interest)),
        solution
    }
})

/* ---------- Progress ids: the first-year table and percentage challenges, then the new tools ---------- */

export const proportionDbh2LabChallengeIds = [
    ...tableChallenges,
    ...compoundChallenges,
    ...shareChallenges,
    ...percentChallenges,
    ...chainChallenges,
    ...interestChallenges
].map((challenge) => challenge.id)
