import { checkAnswer, fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { freshAnswer, type LabChallenge, type LabToolInfo, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { ProportionState } from '../../dbh2-zatikiak-prototype/lab/labTools.ts'
import type { ProportionStageId } from '../lessons.tsx'

/* ==========================================================================
   Proportzionaltasuna (1. DBH) laboratory: the ratio machine, solving a
   proportion, sorting pairs of magnitudes (direct, inverse or neither), the
   table and its graph, the two steps of the reduction to the unit, the
   2. DBH percentage tool with first-year challenges, and discounts and
   increases. Pure state logic; the components live next to this file.
   Tests in tests/proportzionaltasuna-dbh1-lab.test.ts.
   ========================================================================== */

export type ProportionLabToolId = 'ratio' | 'proportion' | 'classify' | 'table' | 'unit' | 'percent' | 'change'

export interface ProportionLabTool extends LabToolInfo {
    id: ProportionLabToolId
    stage: ProportionStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string) => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const same = (value: FractionValue, other: FractionValue) => value.numerator * other.denominator === other.numerator * value.denominator

export const proportionLabTools: ProportionLabTool[] = [
    { id: 'ratio', stage: 'ratios', lessonTopic: 'ratio', title: say('Arrazoien makina', 'La máquina de razones', 'آلة النسب'), observe: say('Aldatu aurrekaria eta ondorengoa: zenbaki desberdinekin arrazoi bera lor daiteke. Biak zenbaki beraz biderkatzean, arrazoia ez da aldatzen.', 'Cambia el antecedente y el consecuente: con números distintos se puede obtener la misma razón. Al multiplicar los dos por el mismo número, la razón no cambia.', 'غيّر المقدَّم والتالي: يمكن الحصول على النسبة نفسها بأعداد مختلفة. وإذا ضربنا الاثنين في العدد نفسه لا تتغيّر النسبة.') },
    { id: 'proportion', stage: 'ratios', lessonTopic: 'proportion', title: say('Aurkitu x', 'Encuentra x', 'أوجد x'), observe: say('Proportzio batean muturren biderkadura eta erdikoena berdinak dira. Horregatik $x$ bat bakarrik dago.', 'En una proporción el producto de extremos y el de medios son iguales. Por eso solo hay una $x$.', 'في التناسب يتساوى حاصل ضرب الطرفين وحاصل ضرب الوسطين. لذلك توجد قيمة واحدة لـ $x$.') },
    { id: 'classify', stage: 'direct', lessonTopic: 'direct', title: say('Zuzena, alderantzizkoa ala ezer ez?', '¿Directa, inversa o ninguna?', 'طردي أم عكسي أم لا شيء؟'), observe: say('Galdetu: bat bikoiztean, bestea bikoiztu egiten da (zuzena), erdia (alderantzizkoa) ala ez dago araurik?', 'Pregúntate: al doblar una, ¿la otra se dobla (directa), se hace la mitad (inversa) o no hay regla?', 'اسأل: إذا تضاعف أحدهما، هل يتضاعف الآخر (طردي) أم ينقص إلى النصف (عكسي) أم لا قاعدة؟') },
    { id: 'table', stage: 'direct', lessonTopic: 'direct', title: say('Taula eta grafikoa', 'La tabla y su gráfica', 'الجدول والرسم البياني'), observe: say('Zuzenean puntuak zuzen batean daude eta jatorritik pasatzen dira; alderantzizkoan, kurba batean, eta bat handitzean bestea txikitzen da.', 'En la directa los puntos están en una recta que pasa por el origen; en la inversa, en una curva, y al crecer una la otra decrece.', 'في الطردي تقع النقاط على مستقيم يمر بالأصل؛ وفي العكسي على منحنى، وحين يزيد أحدهما ينقص الآخر.') },
    { id: 'unit', stage: 'inverse', lessonTopic: 'inverse-unit', title: say('Bi urratsetan', 'En dos pasos', 'في خطوتين'), observe: say('Lehenik bat bakarra kalkulatzen da. Zuzenean zatitu egiten da; alderantzizkoan, biderkatu, bakar batek denbora gehiago behar duelako.', 'Primero se calcula para uno solo. En la directa se divide; en la inversa se multiplica, porque uno solo tarda más.', 'نحسب أولًا للواحد. في الطردي نقسم؛ وفي العكسي نضرب لأن الواحد يحتاج وقتًا أطول.') },
    { id: 'percent', stage: 'percent', lessonTopic: 'percent-of', title: say('Ehunekoak', 'Porcentajes', 'النسب المئوية'), observe: say('Kantitate baten % $p$ zatiki bat bezala kalkulatzen da: $\\frac{p}{100}$. «Hiru forma» moduan, zatiki bera hamartar eta ehuneko gisa ikusten da.', 'El $p$ % de una cantidad se calcula como una fracción: $\\frac{p}{100}$. En el modo «Tres formas» se ve la misma fracción como decimal y porcentaje.', 'تُحسب $p$٪ من كمية ككسر: $\\frac{p}{100}$. وفي وضع «ثلاث صيغ» يظهر الكسر نفسه عددًا عشريًا ونسبة مئوية.') },
    { id: 'change', stage: 'changes', lessonTopic: 'discount', title: say('Beherapenak eta igoerak', 'Rebajas y subidas', 'التخفيضات والزيادات'), observe: say('Beherapen batean % $(100-p)$ ordaintzen da; igoera batean, % $(100+p)$. Barrak erakusten du prezio osoa % 100 dela.', 'En una rebaja se paga el $(100-p)$ %; en una subida, el $(100+p)$ %. La barra muestra que el precio entero es el 100 %.', 'في التخفيض ندفع $(100-p)$٪؛ وفي الزيادة $(100+p)$٪. ويُظهر الشريط أن السعر الكامل هو 100٪.') }
]

export const proportionLabToolForTopic: Record<string, ProportionLabToolId | undefined> = {
    magnitude: 'classify',
    ratio: 'ratio',
    proportion: 'proportion',
    direct: 'table',
    'direct-unit': 'unit',
    'rule-of-three': 'proportion',
    inverse: 'table',
    'inverse-unit': 'unit',
    'inverse-rule': 'unit',
    'percent-meaning': 'percent',
    'percent-of': 'percent',
    'which-percent': 'percent',
    discount: 'change',
    increase: 'change',
    problems: 'classify'
}

/* ---------- 1. The ratio machine ---------- */

export const RATIO_LIMIT = 30

export interface RatioState {
    antecedent: number
    consequent: number
}

export const initialRatioState: RatioState = { antecedent: 3, consequent: 6 }

export const setRatio = (state: RatioState, patch: Partial<RatioState>): RatioState => ({
    antecedent: clamp(patch.antecedent ?? state.antecedent, 1, RATIO_LIMIT),
    consequent: clamp(patch.consequent ?? state.consequent, 1, RATIO_LIMIT)
})

export const ratioValue = (state: RatioState) => fraction(state.antecedent, state.consequent)

export const ratioChallenges: LabChallenge<RatioState>[] = [
    { id: 15101, prompt: say('Lortu $0{,}5$ balio duen arrazoi bat 2 eta 1 erabili gabe.', 'Consigue una razón que valga $0{,}5$ sin usar 1 ni 2.', 'احصل على نسبة تساوي $0{,}5$ دون استعمال 1 أو 2.'), hint: say('Ondorengoa aurrekariaren bikoitza.', 'El consecuente, el doble del antecedente.', 'التالي ضعف المقدَّم.'), isSolved: (state) => same(ratioValue(state), fraction(1, 2)) && state.antecedent > 2 },
    { id: 15102, prompt: say('Lortu $\\frac{6}{10}$ arrazoiaren berdina, 20 ondorengoarekin.', 'Consigue una razón igual a $\\frac{6}{10}$ con consecuente 20.', 'احصل على نسبة تساوي $\\frac{6}{10}$ تاليها 20.'), hint: say('$6\\cdot 2$ eta $10\\cdot 2$.', '$6\\cdot 2$ y $10\\cdot 2$.', '$6\\cdot 2$ و$10\\cdot 2$.'), isSolved: (state) => state.consequent === 20 && same(ratioValue(state), fraction(3, 5)) },
    { id: 15103, prompt: say('Lortu $2{,}5$ balio duen arrazoi bat.', 'Consigue una razón que valga $2{,}5$.', 'احصل على نسبة تساوي $2{,}5$.'), hint: say('$2{,}5=\\frac{5}{2}$.', '$2{,}5=\\frac{5}{2}$.', '$2{,}5=\\frac{5}{2}$.'), isSolved: (state) => same(ratioValue(state), fraction(5, 2)) }
]

/* ---------- 2. Solving a proportion: a/b = c/x ---------- */

export const proportionProblems: Array<[number, number, number]> = [
    [3, 6, 7],
    [2, 9, 4],
    [5, 15, 3],
    [2, 5, 3]
]

export interface SolveState extends OperationAnswer {
    problem: number
    /** Problems answered right without revealing the result */
    solved: number[]
}

export const initialSolveState: SolveState = { problem: 0, solved: [], ...freshAnswer }

/** x in a/b = c/x: x = b · c / a */
export function solveX(problem: number): FractionValue {
    const [a, b, c] = proportionProblems[problem]
    return fraction(b * c, a)
}

export const chooseProportion = (state: SolveState, problem: number): SolveState => ({ ...state, problem: clamp(problem, 0, proportionProblems.length - 1), ...freshAnswer })

export function updateSolve(state: SolveState, patch: Partial<OperationAnswer>, readInput: (input: string) => string = (input) => input): SolveState {
    const next = { ...state, ...patch }
    const right = next.checked && !next.revealed && checkAnswer(readInput(next.answer), solveX(next.problem)) === 'correct'
    return right && !next.solved.includes(next.problem) ? { ...next, solved: [...next.solved, next.problem] } : next
}

export const solveChallenges: LabChallenge<SolveState>[] = [
    { id: 15201, prompt: say('Ebatzi $\\frac{3}{6}=\\frac{7}{x}$.', 'Resuelve $\\frac{3}{6}=\\frac{7}{x}$.', 'حلّ $\\frac{3}{6}=\\frac{7}{x}$.'), hint: say('$3\\cdot x=6\\cdot 7$.', '$3\\cdot x=6\\cdot 7$.', '$3\\cdot x=6\\cdot 7$.'), isSolved: (state) => state.solved.includes(0) },
    { id: 15202, prompt: say('Ebatzi $x$ hamartarra den proportzio bat.', 'Resuelve una proporción en la que $x$ sea decimal.', 'حلّ تناسبًا تكون فيه $x$ عددًا عشريًا.'), hint: say('Probatu $\\frac{2}{5}=\\frac{3}{x}$.', 'Prueba $\\frac{2}{5}=\\frac{3}{x}$.', 'جرّب $\\frac{2}{5}=\\frac{3}{x}$.'), isSolved: (state) => state.solved.some((problem) => solveX(problem).denominator !== 1) },
    { id: 15203, prompt: say('Ebatzi lau proportzioak.', 'Resuelve las cuatro proporciones.', 'حلّ التناسبات الأربعة.'), hint: say('Beti: $x=\\frac{b\\cdot c}{a}$.', 'Siempre: $x=\\frac{b\\cdot c}{a}$.', 'دائمًا: $x=\\frac{b\\cdot c}{a}$.'), isSolved: (state) => proportionProblems.every((_, problem) => state.solved.includes(problem)) }
]

/* ---------- 3. Direct, inverse or neither? ---------- */

export type PairKind = 'direct' | 'inverse' | 'none'

export const magnitudePairs: Array<{ text: { eu: string; es: string; ar: string }; kind: PairKind }> = [
    { text: say('Laranja-kiloak eta haien prezioa', 'Los kilos de naranjas y su precio', 'كيلوغرامات البرتقال وثمنها'), kind: 'direct' },
    { text: say('Langileak eta obra amaitzeko egunak', 'Los obreros y los días que tardan en la obra', 'العمال والأيام اللازمة لإنهاء الورشة'), kind: 'inverse' },
    { text: say('Pertsona baten adina eta altuera', 'La edad de una persona y su altura', 'عمر شخص وطوله'), kind: 'none' },
    { text: say('Liburu baten orri kopurua eta pisua', 'Las hojas de un libro y su peso', 'عدد أوراق كتاب ووزنه'), kind: 'direct' },
    { text: say('Auto baten abiadura eta bidaiaren denbora', 'La velocidad de un coche y el tiempo del viaje', 'سرعة سيارة وزمن الرحلة'), kind: 'inverse' },
    { text: say('Sarreraren prezioa eta filmaren iraupena', 'El precio de la entrada y la duración de la película', 'سعر التذكرة ومدة الفيلم'), kind: 'none' },
    { text: say('Txorrota irekita dagoen segundoak eta litroak', 'Los segundos que está abierto un grifo y los litros', 'ثواني فتح الصنبور واللترات'), kind: 'direct' },
    { text: say('Txorrota kopurua eta biltegia betetzeko denbora', 'El número de grifos y el tiempo de llenado', 'عدد الصنابير وزمن الملء'), kind: 'inverse' },
    { text: say('Zaldi kopurua eta belarrak irauten dituen egunak', 'Los caballos y los días que dura el heno', 'عدد الخيول والأيام التي يكفيها التبن'), kind: 'inverse' },
    { text: say('Gurpil batek egiten dituen itzuliak eta distantzia', 'Las vueltas de una rueda y la distancia recorrida', 'دورات عجلة والمسافة المقطوعة'), kind: 'direct' },
    { text: say('Oinetakoaren zenbakia eta matematikako nota', 'El número de pie y la nota de matemáticas', 'مقاس الحذاء وعلامة الرياضيات'), kind: 'none' }
]

export interface ClassifyState {
    card: number
    answers: Record<number, PairKind>
}

export const initialClassifyState: ClassifyState = { card: 0, answers: {} }

export const chooseCard = (state: ClassifyState, card: number): ClassifyState => ({ ...state, card: clamp(card, 0, magnitudePairs.length - 1) })
export const classifyCard = (state: ClassifyState, kind: PairKind): ClassifyState => ({ ...state, answers: { ...state.answers, [state.card]: kind } })
export const cardRight = (state: ClassifyState, card: number) => state.answers[card] === magnitudePairs[card].kind
const allOf = (state: ClassifyState, kind: PairKind) => magnitudePairs.every((pair, card) => pair.kind !== kind || cardRight(state, card))

export const classifyChallenges: LabChallenge<ClassifyState>[] = [
    { id: 15301, prompt: say('Aurkitu zuzenki proportzionalak diren lau bikoteak.', 'Encuentra las cuatro parejas directamente proporcionales.', 'جد الأزواج الأربعة المتناسبة طرديًا.'), hint: say('Bikoitza → bikoitza.', 'Doble → doble.', 'الضعف ← الضعف.'), isSolved: (state) => allOf(state, 'direct') },
    { id: 15302, prompt: say('Aurkitu alderantziz proportzionalak diren lau bikoteak.', 'Encuentra las cuatro parejas inversamente proporcionales.', 'جد الأزواج الأربعة المتناسبة عكسيًا.'), hint: say('Bikoitza → erdia.', 'Doble → mitad.', 'الضعف ← النصف.'), isSolved: (state) => allOf(state, 'inverse') },
    { id: 15303, prompt: say('Sailkatu ondo hamaika bikoteak.', 'Clasifica bien las once parejas.', 'صنّف الأزواج الأحد عشر تصنيفًا صحيحًا.'), hint: say('Batzuk ez dira proportzionalak: handitzen dira, baina ez proportzio berean.', 'Algunas no son proporcionales: crecen, pero no en la misma proporción.', 'بعضها غير متناسب: يزيد، لكن ليس بالنسبة نفسها.'), isSolved: (state) => magnitudePairs.every((_, card) => cardRight(state, card)) }
]

/* ---------- 4. The table and its graph ---------- */

export const TABLE_XS = [1, 2, 3, 4, 6] as const
export const tableConstants = {
    direct: ['0,5', '0,6', '1,5', '2', '3', '3,5'],
    inverse: ['12', '24', '36', '45', '60']
} as const

export interface TableState {
    kind: 'direct' | 'inverse'
    constant: number
}

export const initialTableState: TableState = { kind: 'direct', constant: 3 }

export const setTableKind = (kind: TableState['kind']): TableState => ({ kind, constant: 0 })
export const setTableConstant = (state: TableState, constant: number): TableState => ({ ...state, constant: clamp(constant, 0, tableConstants[state.kind].length - 1) })

/** The constant as an exact fraction */
export function tableK(state: TableState): FractionValue {
    const [whole, decimals = ''] = tableConstants[state.kind][state.constant].split(',')
    return fraction(Number(whole + decimals), 10 ** decimals.length)
}

/** y for each x: k · x (direct) or k / x (inverse) */
export const tableValues = (state: TableState) => TABLE_XS.map((x) => {
    const k = tableK(state)
    return state.kind === 'direct' ? fraction(k.numerator * x, k.denominator) : fraction(k.numerator, k.denominator * x)
})

const kIs = (state: TableState, kind: TableState['kind'], text: string) => state.kind === kind && tableConstants[kind][state.constant] === text

export const tableChallenges: LabChallenge<TableState>[] = [
    { id: 15401, prompt: say('Eraiki ikasleen eta kroketen taula: ikasle bakoitzak 2.', 'Construye la tabla de alumnos y croquetas: 2 cada alumno.', 'كوّن جدول التلاميذ والكروكيت: قطعتان لكل تلميذ.'), hint: say('Zuzena, konstantea 2.', 'Directa, constante 2.', 'طردي، الثابت 2.'), isSolved: (state) => kIs(state, 'direct', '2') },
    { id: 15402, prompt: say('Upela: 3 l/min-rekin 15 minutu. Eraiki taula.', 'El tonel: con 3 l/min, 15 minutos. Construye la tabla.', 'البرميل: بتدفق 3 ل/د يلزم 15 دقيقة. كوّن الجدول.'), hint: say('Alderantzizkoa, biderkadura $3\\cdot 15$.', 'Inversa, producto $3\\cdot 15$.', 'عكسي، حاصل الضرب $3\\cdot 15$.'), isSolved: (state) => kIs(state, 'inverse', '45') },
    { id: 15403, prompt: say('Eraiki zuzeneko taula bat non 4 → 6 den.', 'Construye una tabla directa en la que 4 → 6.', 'كوّن جدولًا طرديًا فيه 4 ← 6.'), hint: say('Konstantea: $6\\mathbin{:}4$.', 'Constante: $6\\mathbin{:}4$.', 'الثابت: $6\\mathbin{:}4$.'), isSolved: (state) => kIs(state, 'direct', '1,5') },
    { id: 15404, prompt: say('Eraiki alderantzizko taula bat non 6 → 2 den.', 'Construye una tabla inversa en la que 6 → 2.', 'كوّن جدولًا عكسيًا فيه 6 ← 2.'), hint: say('Biderkadura: $6\\cdot 2$.', 'Producto: $6\\cdot 2$.', 'حاصل الضرب: $6\\cdot 2$.'), isSolved: (state) => kIs(state, 'inverse', '12') }
]

/* ---------- 5. Two steps: reduction to the unit ---------- */

export type Step = 'times' | 'divide'

/** Known count, known amount, wanted count, and whether it is direct */
export const unitProblems: Array<{ known: number; amount: number; wanted: number; direct: boolean; text: { eu: string; es: string; ar: string }; unit: string }> = [
    { known: 3, amount: 90, wanted: 2, direct: true, text: say('3 txokolatinak 90 g pisatzen dute. Zenbat 2k?', '3 chocolatinas pesan 90 g. ¿Cuánto pesan 2?', '3 قطع شوكولاتة تزن 90 غ. كم تزن قطعتان؟'), unit: 'g' },
    { known: 4, amount: 12, wanted: 10, direct: true, text: say('Kangurua: 4 jauzitan 12 m. Zenbat 10 jauzitan?', 'El canguro: 12 m en 4 saltos. ¿Cuánto en 10 saltos?', 'الكنغر: 12 م في 4 قفزات. كم في 10 قفزات؟'), unit: 'm' },
    { known: 2, amount: 9, wanted: 3, direct: false, text: say('2 margolarik 9 ordu. Zenbat 3 margolarik?', '2 pintores tardan 9 horas. ¿Cuánto tardan 3?', 'رسّامان يحتاجان 9 ساعات. كم يحتاج 3؟'), unit: 'h' },
    { known: 3, amount: 6, wanted: 2, direct: false, text: say('Belarra: 3 zaldirentzat 6 egun. Zenbat 2 zaldirentzat?', 'El heno: 6 días para 3 caballos. ¿Cuántos para 2 caballos?', 'التبن: 6 أيام لـ3 خيول. كم يومًا لحصانين؟'), unit: '' }
]

export interface UnitState {
    problem: number
    first: Step | null
    second: Step | null
    /** Problems done with both steps right */
    solved: number[]
}

export const initialUnitState: UnitState = { problem: 0, first: null, second: null, solved: [] }

/** The right operation for each step */
export const rightSteps = (problem: number): [Step, Step] => (unitProblems[problem].direct ? ['divide', 'times'] : ['times', 'divide'])

/** The amount for one, and for the wanted count, with the steps chosen */
export function unitResults(state: Pick<UnitState, 'problem' | 'first' | 'second'>): { one: FractionValue | null; wanted: FractionValue | null } {
    const { known, amount, wanted } = unitProblems[state.problem]
    if (!state.first) return { one: null, wanted: null }
    const one = state.first === 'divide' ? fraction(amount, known) : fraction(amount * known)
    if (!state.second) return { one, wanted: null }
    const result = state.second === 'times' ? fraction(one.numerator * wanted, one.denominator) : fraction(one.numerator, one.denominator * wanted)
    return { one, wanted: result }
}

export const chooseUnitProblem = (state: UnitState, problem: number): UnitState => ({ ...state, problem: clamp(problem, 0, unitProblems.length - 1), first: null, second: null })

export function chooseStep(state: UnitState, which: 'first' | 'second', step: Step): UnitState {
    const next = which === 'first' ? { ...state, first: step, second: null } : { ...state, second: step }
    const [first, second] = rightSteps(next.problem)
    const right = next.first === first && next.second === second
    return right && !next.solved.includes(next.problem) ? { ...next, solved: [...next.solved, next.problem] } : next
}

export const unitChallenges: LabChallenge<UnitState>[] = [
    { id: 15501, prompt: say('Ebatzi txokolatinen problema.', 'Resuelve el problema de las chocolatinas.', 'حلّ مسألة الشوكولاتة.'), hint: say('Zuzena: lehenik zatitu.', 'Directa: primero divide.', 'طردي: اقسم أولًا.'), isSolved: (state) => state.solved.includes(0) },
    { id: 15502, prompt: say('Ebatzi alderantzizko problema bat.', 'Resuelve un problema inverso.', 'حلّ مسألة عكسية.'), hint: say('Bakar batek denbora gehiago: lehenik biderkatu.', 'Uno solo tarda más: primero multiplica.', 'الواحد يحتاج وقتًا أطول: اضرب أولًا.'), isSolved: (state) => state.solved.some((problem) => !unitProblems[problem].direct) },
    { id: 15503, prompt: say('Ebatzi lau problemak.', 'Resuelve los cuatro problemas.', 'حلّ المسائل الأربع.'), hint: say('Galdetu beti: zuzena ala alderantzizkoa?', 'Pregúntate siempre: ¿directa o inversa?', 'اسأل دائمًا: طردي أم عكسي؟'), isSolved: (state) => unitProblems.every((_, problem) => state.solved.includes(problem)) }
]

/* ---------- 6. Percentages: the 2. DBH tool with first-year challenges ---------- */

export const PERCENT_MODES: Array<ProportionState['mode']> = ['percent', 'forms']

const answeredPercent = (state: ProportionState, percent: number, quantity: number, expected: number) =>
    state.mode === 'percent' && state.percent === percent && state.quantity === quantity && checkAnswer(state.answer, fraction(expected)) === 'correct'

export const percentChallenges: LabChallenge<ProportionState>[] = [
    { id: 15601, prompt: say('Kalkulatu 80ren % 25 eta idatzi emaitza.', 'Calcula el 25 % de 80 y escribe el resultado.', 'احسب 25٪ من 80 واكتب النتيجة.'), hint: say('% 25 laurdena da.', 'El 25 % es la cuarta parte.', '25٪ هي الربع.'), isSolved: (state) => answeredPercent(state, 25, 80, 20) },
    { id: 15602, prompt: say('Kalkulatu 60ren % 15 eta idatzi emaitza.', 'Calcula el 15 % de 60 y escribe el resultado.', 'احسب 15٪ من 60 واكتب النتيجة.'), hint: say('$60\\cdot 15\\mathbin{:}100$.', '$60\\cdot 15\\mathbin{:}100$.', '$60\\cdot 15\\mathbin{:}100$.'), isSolved: (state) => answeredPercent(state, 15, 60, 9) },
    { id: 15603, prompt: say('«Hiru forma» moduan, eraiki % 75 balio duen zatiki bat.', 'En el modo «Tres formas», construye una fracción que valga el 75 %.', 'في وضع «ثلاث صيغ» كوّن كسرًا يساوي 75٪.'), hint: say('100etik 75… 4tik zenbat?', '75 de cada 100… ¿cuántos de cada 4?', '75 من كل 100… كم من كل 4؟'), isSolved: (state) => state.mode === 'forms' && same(fraction(state.numerator, state.denominator), fraction(3, 4)) },
    { id: 15604, prompt: say('«Hiru forma» moduan, eraiki % 20 balio duen zatiki bat.', 'En el modo «Tres formas», construye una fracción que valga el 20 %.', 'في وضع «ثلاث صيغ» كوّن كسرًا يساوي 20٪.'), hint: say('% 20 bosten bat da.', 'El 20 % es la quinta parte.', '20٪ هي الخُمس.'), isSolved: (state) => state.mode === 'forms' && same(fraction(state.numerator, state.denominator), fraction(1, 5)) }
]

/* ---------- 7. Discounts and increases ---------- */

export const CHANGE_LIMITS = { price: { min: 10, max: 300, step: 5 }, percent: { min: 0, max: 50, step: 5 } } as const

export interface ChangeState {
    kind: 'discount' | 'increase'
    price: number
    percent: number
}

export const initialChangeState: ChangeState = { kind: 'discount', price: 60, percent: 10 }

export const setChange = (state: ChangeState, patch: Partial<ChangeState>): ChangeState => ({
    kind: patch.kind ?? state.kind,
    price: clamp(patch.price ?? state.price, CHANGE_LIMITS.price.min, CHANGE_LIMITS.price.max),
    percent: clamp(patch.percent ?? state.percent, CHANGE_LIMITS.percent.min, CHANGE_LIMITS.percent.max)
})

/** What changes (the discount or the rise) and the final price */
export function changeResult(state: ChangeState): { change: FractionValue; final: FractionValue; paid: number } {
    const change = fraction(state.price * state.percent, 100)
    const paid = state.kind === 'discount' ? 100 - state.percent : 100 + state.percent
    return { change, final: fraction(state.price * paid, 100), paid }
}

const ends = (state: ChangeState, kind: ChangeState['kind'], price: number, final: FractionValue) => state.kind === kind && state.price === price && same(changeResult(state).final, final)

export const changeChallenges: LabChallenge<ChangeState>[] = [
    { id: 15701, prompt: say('Enrikeren zapatilak: 60 €, % 15eko beherapena.', 'Las zapatillas de Enrique: 60 €, descuento del 15 %.', 'حذاء إنريكي: 60 €، خصم 15٪.'), hint: say('Beherapena, prezioa 60, % 15.', 'Rebaja, precio 60, 15 %.', 'تخفيض، السعر 60، 15٪.'), isSolved: (state) => ends(state, 'discount', 60, fraction(51)) },
    { id: 15702, prompt: say('75 €-ko isuna % 15eko errekarguarekin.', 'Una multa de 75 € con un recargo del 15 %.', 'مخالفة 75 € برسم إضافي 15٪.'), hint: say('Igoera, prezioa 75, % 15.', 'Subida, precio 75, 15 %.', 'زيادة، السعر 75، 15٪.'), isSolved: (state) => ends(state, 'increase', 75, fraction(8625, 100)) },
    { id: 15703, prompt: say('80 €-ko beroki bat 72 €-an geratu da. Zenbateko beherapena?', 'Un abrigo de 80 € se queda en 72 €. ¿Qué rebaja es?', 'معطف ثمنه 80 € صار 72 €. كم التخفيض؟'), hint: say('Beherapena 8 € da: 80ren zer ehuneko?', 'La rebaja es de 8 €: ¿qué porcentaje de 80?', 'الخصم 8 €: أي نسبة من 80؟'), isSolved: (state) => ends(state, 'discount', 80, fraction(72)) },
    { id: 15704, prompt: say('200 €-ko bizikleta bat 210 €-an jarri da. Zenbateko igoera?', 'Una bici de 200 € pasa a costar 210 €. ¿Qué subida es?', 'دراجة ثمنها 200 € صار 210 €. كم الزيادة؟'), hint: say('Igoera 10 € da: 200en zer ehuneko?', 'La subida es de 10 €: ¿qué porcentaje de 200?', 'الزيادة 10 €: أي نسبة من 200؟'), isSolved: (state) => ends(state, 'increase', 200, fraction(210)) }
]

export const proportionLabChallengeIds = [
    ...ratioChallenges,
    ...solveChallenges,
    ...classifyChallenges,
    ...tableChallenges,
    ...unitChallenges,
    ...percentChallenges,
    ...changeChallenges
].map((challenge) => challenge.id)
