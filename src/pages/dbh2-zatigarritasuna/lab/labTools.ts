import { checkAnswer, fraction } from '../../../features/unit-v2/math/fraction.ts'
import { freshAnswer, type LabChallenge, type LabToolInfo as UnitLabToolInfo, type LabToolProps, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import type { DivisibilityStageId } from '../lessons.tsx'
import { digitSum, divisors, elevenSums, factorize, gcd, isPrime, lcm, sevenSteps } from '../math.ts'

/* ==========================================================================
   Zatigarritasuna laboratory: tool list, pure state logic and challenges.
   Components live next to this file; tests in tests/zatigarritasuna-lab.test.ts.
   ========================================================================== */

export type DivisibilityLabToolId = 'rectangles' | 'jumps' | 'criteria' | 'sieve' | 'ladder' | 'venn' | 'sort'

export interface DivisibilityLabTool extends UnitLabToolInfo {
    id: DivisibilityLabToolId
    stage: DivisibilityStageId
}

/** Loose on purpose: the 1. DBH unit reuses these tools with its own tool list and challenges */
export type DivisibilityToolProps = LabToolProps<UnitLabToolInfo>

export const divisibilityLabTools: DivisibilityLabTool[] = [
    {
        id: 'rectangles',
        stage: 'multiples',
        lessonTopic: 'divisors',
        title: { eu: 'Laukizuzenak', es: 'Rectángulos', ar: 'المستطيلات' },
        observe: {
            eu: 'Karratuak ilaretan jartzean, laukizuzen osoa ixten bada, ilarako kopurua zenbakiaren zatitzailea da. Zerbait soberan geratzen bada, hori da zatiketaren hondarra.',
            es: 'Al colocar los cuadrados en filas, si se cierra un rectángulo completo, el número de cada fila es divisor del número. Si sobra algo, eso es el resto de la división.',
            ar: 'عند ترتيب المربعات في صفوف، إذا اكتمل مستطيل فعدد المربعات في كل صف قاسم للعدد. وإذا بقي شيء فهو باقي القسمة.'
        }
    },
    {
        id: 'jumps',
        stage: 'multiples',
        lessonTopic: 'multiples',
        title: { eu: 'Igel-jauziak', es: 'Saltos de ranas', ar: 'قفزات الضفادع' },
        observe: {
            eu: 'Igel bakoitzak bere zenbakiaren multiploetan zapaltzen du. Biek zapaltzen dituzten lekuak multiplo komunak dira, eta lehenengoa MKT da.',
            es: 'Cada rana pisa los múltiplos de su número. Los lugares que pisan las dos son múltiplos comunes, y el primero es el m.c.m.',
            ar: 'كل ضفدع يقف على مضاعفات عدده. والأماكن التي يقف عليها الاثنان مضاعفات مشتركة، وأولها م.م.أ.'
        }
    },
    {
        id: 'criteria',
        stage: 'criteria',
        lessonTopic: 'criteria-digit',
        title: { eu: 'Irizpide-makina', es: 'Máquina de criterios', ar: 'آلة القواعد' },
        observe: {
            eu: 'Irizpide bakoitzak zatiketa egin gabe erantzuten du. Begiratu zein zifratan oinarritzen den bakoitza: azkena, guztien batura edo posizioak.',
            es: 'Cada criterio responde sin hacer la división. Fíjate en qué cifras se basa cada uno: la última, la suma de todas o sus posiciones.',
            ar: 'كل قاعدة تجيب دون إجراء القسمة. لاحظ على أي أرقام تعتمد كل قاعدة: الأخير أو مجموعها كلها أو مواقعها.'
        }
    },
    {
        id: 'sieve',
        stage: 'primes',
        lessonTopic: 'primes',
        title: { eu: 'Eratostenesen bahea', es: 'Criba de Eratóstenes', ar: 'غربال إراتوستينس' },
        observe: {
            eu: 'Zenbaki lehen bat aukeratzean, haren multiplo guztiak ratatzen dira: ez dira lehenak. 7 ondoren ez da ezer berririk ratatzen, 11 · 11 = 121 100 baino handiagoa delako.',
            es: 'Al elegir un primo, se tachan todos sus múltiplos: no son primos. Después del 7 ya no se tacha nada nuevo, porque 11 · 11 = 121 es mayor que 100.',
            ar: 'عند اختيار عدد أولي تُشطب كل مضاعفاته لأنها ليست أولية. وبعد 7 لا يُشطب شيء جديد لأن 11 · 11 = 121 أكبر من 100.'
        }
    },
    {
        id: 'ladder',
        stage: 'primes',
        lessonTopic: 'factorization',
        title: { eu: 'Faktoreen eskailera', es: 'Escalera de factores', ar: 'سلّم العوامل' },
        observe: {
            eu: 'Lehen bakoitza zatiketa zehatza denean bakarrik onartzen da. 1era iristean, eskuineko zutabea deskonposizioa da, eta ordena ez du axola: emaitza beti bera da.',
            es: 'Cada primo solo se acepta si la división es exacta. Al llegar a 1, la columna de la derecha es la descomposición, y el orden no importa: el resultado siempre es el mismo.',
            ar: 'لا يُقبل العدد الأولي إلا إذا كانت القسمة تامة. وعند الوصول إلى 1 يكون العمود الأيمن هو التحليل، والترتيب لا يهم: النتيجة واحدة دائمًا.'
        }
    },
    {
        id: 'venn',
        stage: 'gcd-lcm',
        lessonTopic: 'gcd',
        title: { eu: 'ZKH eta MKT Venn diagraman', es: 'm.c.d. y m.c.m. en un diagrama de Venn', ar: 'ق.م.أ وم.م.أ في مخطط فن' },
        observe: {
            eu: 'Bi zenbakiek partekatzen dituzten biderkagai lehenak erdian daude: horien biderkadura ZKH da. Diagramako biderkagai guztien biderkadura MKT da.',
            es: 'Los factores primos que comparten los dos números están en el centro: su producto es el m.c.d. El producto de todos los factores del diagrama es el m.c.m.',
            ar: 'العوامل الأولية المشتركة بين العددين في الوسط: حاصل ضربها هو ق.م.أ. وحاصل ضرب كل عوامل المخطط هو م.م.أ.'
        }
    },
    {
        id: 'sort',
        stage: 'problems',
        lessonTopic: 'which',
        title: { eu: 'ZKH ala MKT?', es: '¿m.c.d. o m.c.m.?', ar: 'ق.م.أ أم م.م.أ؟' },
        observe: {
            eu: 'Zati berdinetan banatu eta zati handiena bilatzen bada → ZKH. Zerbait berriro batera noiz gertatuko den bilatzen bada → MKT.',
            es: 'Si hay que repartir en partes iguales y buscar la parte más grande → m.c.d. Si se busca cuándo algo vuelve a coincidir → m.c.m.',
            ar: 'إذا كان المطلوب التقسيم إلى أجزاء متساوية وإيجاد أكبر جزء ← ق.م.أ. وإذا كان المطلوب متى يتزامن حدث ما مجددًا ← م.م.أ.'
        }
    }
]

export const divisibilityLabToolForTopic: Record<string, DivisibilityLabToolId | undefined> = {
    relation: 'rectangles',
    multiples: 'jumps',
    divisors: 'rectangles',
    'criteria-digit': 'criteria',
    'criteria-sum': 'criteria',
    'criteria-11-7': 'criteria',
    primes: 'sieve',
    factorization: 'ladder',
    gcd: 'venn',
    lcm: 'jumps',
    which: 'sort',
    method: 'sort'
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const answered = (state: OperationAnswer, expected: number) => checkAnswer(state.answer, fraction(expected)) === 'correct'

export function resultVisible(state: OperationAnswer, expected: number): boolean {
    return state.revealed || (state.checked && answered(state, expected))
}

/* ---------- Rectangles: divisors and remainders ---------- */

export const RECTANGLE_LIMITS = { min: 2, max: 48 } as const

export interface RectanglesState {
    total: number
    perRow: number
    /** Divisors found so far, per number */
    found: Record<number, number[]>
}

export function rectangleSplit(state: Pick<RectanglesState, 'total' | 'perRow'>): { rows: number; rest: number } {
    return { rows: Math.floor(state.total / state.perRow), rest: state.total % state.perRow }
}

/** Every exact rectangle reveals a pair of divisors */
function withFound(state: RectanglesState): RectanglesState {
    if (state.total % state.perRow !== 0) return state
    const known = state.found[state.total] ?? []
    const pair = [state.perRow, state.total / state.perRow].filter((value) => !known.includes(value))
    if (pair.length === 0) return state
    return { ...state, found: { ...state.found, [state.total]: [...known, ...pair].sort((a, b) => a - b) } }
}

export const initialRectanglesState: RectanglesState = { total: 12, perRow: 5, found: {} }

export function setRectangles(state: RectanglesState, patch: Partial<Pick<RectanglesState, 'total' | 'perRow'>>): RectanglesState {
    const total = clamp(patch.total ?? state.total, RECTANGLE_LIMITS.min, RECTANGLE_LIMITS.max)
    const perRow = clamp(patch.perRow ?? state.perRow, 1, total)
    return withFound({ ...state, total, perRow })
}

const foundAll = (state: RectanglesState, value: number) => divisors(value).every((divisor) => (state.found[value] ?? []).includes(divisor))

export const rectanglesChallenges: LabChallenge<RectanglesState>[] = [
    {
        id: 1101,
        prompt: { eu: 'Erakutsi 7 28ren zatitzailea dela: jarri 28 karratu 7ko ilaretan.', es: 'Demuestra que 7 es divisor de 28: coloca 28 cuadrados en filas de 7.', ar: 'بيّن أن 7 قاسم لـ 28: رتّب 28 مربعًا في صفوف من 7.' },
        hint: { eu: 'Aukeratu 28 karratu eta 7 ilarako.', es: 'Elige 28 cuadrados y 7 por fila.', ar: 'اختر 28 مربعًا و7 في كل صف.' },
        isSolved: (state) => state.total === 28 && state.perRow === 7
    },
    {
        id: 1102,
        prompt: { eu: 'Aurkitu 12ren zatitzaile guztiak laukizuzenekin.', es: 'Encuentra todos los divisores de 12 con rectángulos.', ar: 'جد جميع قواسم 12 بالمستطيلات.' },
        hint: { eu: 'Probatu 1, 2, 3… ilarako. Laukizuzen bakoitzak bi zatitzaile ematen ditu.', es: 'Prueba 1, 2, 3… por fila. Cada rectángulo da dos divisores.', ar: 'جرّب 1، 2، 3… في الصف. كل مستطيل يعطي قاسمين.' },
        isSolved: (state) => foundAll(state, 12)
    },
    {
        id: 1103,
        prompt: { eu: 'Jarri 25 karratu 4ko ilaretan. Zenbat soberan geratzen dira? Hori da 25 : 4 zatiketaren hondarra.', es: 'Coloca 25 cuadrados en filas de 4. ¿Cuántos sobran? Ese es el resto de 25 : 4.', ar: 'رتّب 25 مربعًا في صفوف من 4. كم يبقى؟ هذا هو باقي القسمة 25 : 4.' },
        hint: { eu: '6 ilara osatzen dira: 6 · 4 = 24.', es: 'Se completan 6 filas: 6 · 4 = 24.', ar: 'تكتمل 6 صفوف: 6 · 4 = 24.' },
        isSolved: (state) => state.total === 25 && state.perRow === 4
    },
    {
        id: 1104,
        prompt: { eu: 'Aurkitu 20 eta 30 arteko zenbaki bat, laukizuzen bakar bat duena (lerro bakarra), eta erakutsi bere bi zatitzaileak.', es: 'Encuentra un número entre 20 y 30 que solo forme un rectángulo (una sola fila) y muestra sus dos divisores.', ar: 'جد عددًا بين 20 و30 لا يكوّن إلا مستطيلًا واحدًا (صفًا واحدًا) واعرض قاسميه.' },
        hint: { eu: 'Zenbaki lehenek bi zatitzaile bakarrik dituzte: 1 eta zenbakia bera.', es: 'Los números primos solo tienen dos divisores: 1 y el propio número.', ar: 'للأعداد الأولية قاسمان فقط: 1 والعدد نفسه.' },
        isSolved: (state) => state.total > 20 && state.total < 30 && isPrime(state.total) && foundAll(state, state.total)
    }
]

/* ---------- Frog jumps: multiples and the MKT ---------- */

export const JUMP_LIMITS = { min: 2, max: 12 } as const
export const JUMP_TRACK = 60

export interface JumpsState extends OperationAnswer {
    first: number
    second: number
}

export const initialJumpsState: JumpsState = { first: 3, second: 5, ...freshAnswer }

export function setJumps(state: JumpsState, patch: Partial<Pick<JumpsState, 'first' | 'second'>>): JumpsState {
    return {
        ...state,
        first: clamp(patch.first ?? state.first, JUMP_LIMITS.min, JUMP_LIMITS.max),
        second: clamp(patch.second ?? state.second, JUMP_LIMITS.min, JUMP_LIMITS.max),
        ...freshAnswer
    }
}

export const jumpsLcm = (state: Pick<JumpsState, 'first' | 'second'>) => lcm(state.first, state.second)

export function commonLandings(state: Pick<JumpsState, 'first' | 'second'>, track = JUMP_TRACK): number[] {
    const step = jumpsLcm(state)
    return Array.from({ length: Math.floor(track / step) }, (_, index) => (index + 1) * step)
}

export const jumpsChallenges: LabChallenge<JumpsState>[] = [
    {
        id: 1201,
        prompt: { eu: 'Igel batek 4 salto egiten ditu eta besteak 6. Noiz zapalduko dute lehen aldiz leku berean? Idatzi.', es: 'Una rana salta de 4 en 4 y otra de 6 en 6. ¿Dónde coinciden por primera vez? Escríbelo.', ar: 'ضفدع يقفز 4 و4 وآخر 6 و6. أين يلتقيان لأول مرة؟ اكتب الجواب.' },
        hint: { eu: '4ren multiploak: 4, 8, 12… 6renak: 6, 12…', es: 'Múltiplos de 4: 4, 8, 12… De 6: 6, 12…', ar: 'مضاعفات 4: 4، 8، 12… ومضاعفات 6: 6، 12…' },
        isSolved: (state) => [state.first, state.second].sort((a, b) => a - b).join() === '4,6' && answered(state, 12)
    },
    {
        id: 1202,
        prompt: { eu: 'Aurkitu 30ean lehen aldiz bat egiten duten bi jauzi desberdin, eta idatzi MKT.', es: 'Encuentra dos saltos distintos que coincidan por primera vez en 30 y escribe el m.c.m.', ar: 'جد قفزتين مختلفتين تلتقيان لأول مرة عند 30 واكتب م.م.أ.' },
        hint: { eu: '30 = 2 · 3 · 5. Probatu 5 eta 6, edo 6 eta 10.', es: '30 = 2 · 3 · 5. Prueba 5 y 6, o 6 y 10.', ar: '30 = 2 · 3 · 5. جرّب 5 و6 أو 6 و10.' },
        isSolved: (state) => state.first !== state.second && jumpsLcm(state) === 30 && answered(state, 30)
    },
    {
        id: 1203,
        prompt: { eu: 'Aurkitu bi jauzi (biak 3 edo handiagoak), zeinen MKT haien biderkadura den. Idatzi MKT.', es: 'Encuentra dos saltos (los dos de 3 o más) cuyo m.c.m. sea su producto. Escribe el m.c.m.', ar: 'جد قفزتين (كلتاهما 3 أو أكثر) يكون م.م.أ لهما حاصل ضربهما. اكتب م.م.أ.' },
        hint: { eu: 'Ez dute zatitzaile komunik izan behar (1 izan ezik): elkarren arteko lehenak.', es: 'No deben tener divisores comunes (salvo el 1): primos entre sí.', ar: 'يجب ألا يكون لهما قاسم مشترك غير 1: أوليان فيما بينهما.' },
        isSolved: (state) => state.first >= 3 && state.second >= 3 && gcd(state.first, state.second) === 1 && answered(state, state.first * state.second)
    },
    {
        id: 1204,
        prompt: { eu: 'Aurkitu bi jauzi desberdin, MKT jauzi handiena bera izan dadin. Idatzi MKT.', es: 'Encuentra dos saltos distintos cuyo m.c.m. sea el salto mayor. Escribe el m.c.m.', ar: 'جد قفزتين مختلفتين يكون م.م.أ لهما هو القفزة الكبرى. اكتب م.م.أ.' },
        hint: { eu: 'Jauzi handia txikiaren multiploa bada…', es: 'Si el salto grande es múltiplo del pequeño…', ar: 'إذا كانت القفزة الكبرى مضاعفًا للصغرى…' },
        isSolved: (state) => state.first !== state.second && jumpsLcm(state) === Math.max(state.first, state.second) && answered(state, jumpsLcm(state))
    }
]

/* ---------- Criteria machine ---------- */

export const CRITERIA_LIMITS = { min: 10, max: 99999 } as const
export const CRITERIA = [2, 3, 5, 7, 9, 10, 11] as const
export type Criterion = (typeof CRITERIA)[number]

export interface CriteriaState {
    value: number
    /** Numbers already analysed, so challenges can look at the history */
    history: number[]
}

export const initialCriteriaState: CriteriaState = { value: 3232, history: [3232] }

export function setCriteriaValue(state: CriteriaState, value: number): CriteriaState {
    const next = clamp(value, CRITERIA_LIMITS.min, CRITERIA_LIMITS.max)
    return { value: next, history: state.history.includes(next) ? state.history : [...state.history, next] }
}

export const divides = (divisor: number, value: number) => value % divisor === 0

/** What each rule looks at, so the machine can show its working */
export function criterionWorking(criterion: Criterion, value: number): { applies: boolean; detail: string } {
    const last = value % 10
    switch (criterion) {
        case 2: return { applies: last % 2 === 0, detail: String(last) }
        case 5: return { applies: last === 0 || last === 5, detail: String(last) }
        case 10: return { applies: last === 0, detail: String(last) }
        case 3:
        case 9: {
            const sum = digitSum(value)
            return { applies: sum % criterion === 0, detail: `${String(value).split('').join('+')}=${sum}` }
        }
        case 11: {
            const { even, odd } = elevenSums(value)
            return { applies: (even - odd) % 11 === 0, detail: `${even}-${odd}=${even - odd}` }
        }
        case 7: {
            const steps = sevenSteps(value)
            const final = steps.length ? steps[steps.length - 1].result : value
            return { applies: final % 7 === 0, detail: steps.length ? steps.map((step) => `${step.rest}-${2 * step.units}=${step.result}`).join(';\\ ') : String(value) }
        }
    }
}

const inHistory = (state: CriteriaState, rule: (value: number) => boolean) => state.history.some(rule)

export const criteriaChallenges: LabChallenge<CriteriaState>[] = [
    {
        id: 1301,
        prompt: { eu: 'Aurkitu 3rekin zatigarria den baina 9rekin ez den zenbaki bat.', es: 'Encuentra un número divisible por 3 pero no por 9.', ar: 'جد عددًا يقبل القسمة على 3 ولا يقبلها على 9.' },
        hint: { eu: 'Zifren batura 3ren multiploa izan behar da, baina ez 9rena: 12, 15, 21…', es: 'La suma de las cifras tiene que ser múltiplo de 3 pero no de 9: 12, 15, 21…', ar: 'يجب أن يكون مجموع الأرقام مضاعفًا لـ 3 لا لـ 9: 12، 15، 21…' },
        isSolved: (state) => inHistory(state, (value) => divides(3, value) && !divides(9, value))
    },
    {
        id: 1302,
        prompt: { eu: 'Aurkitu 2rekin, 3rekin eta 5ekin aldi berean zatigarria den zenbaki bat.', es: 'Encuentra un número divisible a la vez por 2, por 3 y por 5.', ar: 'جد عددًا يقبل القسمة على 2 و3 و5 في آن واحد.' },
        hint: { eu: '0an amaitu behar da, eta zifren batura 3ren multiploa izan.', es: 'Tiene que acabar en 0 y la suma de sus cifras ser múltiplo de 3.', ar: 'يجب أن ينتهي بـ 0 وأن يكون مجموع أرقامه مضاعفًا لـ 3.' },
        isSolved: (state) => inHistory(state, (value) => divides(30, value))
    },
    {
        id: 1303,
        prompt: { eu: 'Aurkitu 11rekin zatigarria den lau zifrako zenbaki bat.', es: 'Encuentra un número de cuatro cifras divisible por 11.', ar: 'جد عددًا من أربعة أرقام يقبل القسمة على 11.' },
        hint: { eu: 'Posizio bikoitietako batura eta bakoitietakoa berdinak izan daitezke: 1 221, 3 234…', es: 'La suma de los lugares pares y la de los impares pueden ser iguales: 1 221, 3 234…', ar: 'يمكن أن يتساوى مجموع المواقع الزوجية والفردية: 1 221، 3 234…' },
        isSolved: (state) => inHistory(state, (value) => value >= 1000 && value <= 9999 && divides(11, value))
    },
    {
        id: 1304,
        prompt: { eu: 'Aurkitu 7rekin zatigarria den hiru zifrako zenbaki bat, eta ikusi 7ren irizpidea urratsez urrats.', es: 'Encuentra un número de tres cifras divisible por 7 y mira el criterio del 7 paso a paso.', ar: 'جد عددًا من ثلاثة أرقام يقبل القسمة على 7 وشاهد قاعدة 7 خطوة بخطوة.' },
        hint: { eu: 'Biderkatu 7 bider zerbait: 7 · 23 = 161…', es: 'Multiplica 7 por algo: 7 · 23 = 161…', ar: 'اضرب 7 في عدد ما: 7 · 23 = 161…' },
        isSolved: (state) => inHistory(state, (value) => value >= 100 && value <= 999 && divides(7, value))
    }
]

/* ---------- Sieve of Eratosthenes ---------- */

export const SIEVE_MAX = 100

export interface SieveState extends OperationAnswer {
    /** Numbers chosen as primes (their multiples are crossed out) */
    circled: number[]
}

export const initialSieveState: SieveState = { circled: [], ...freshAnswer }

/** Numbers crossed out: the multiples (bigger than itself) of every circled number, and 1 */
export function crossedOut(state: Pick<SieveState, 'circled'>): Set<number> {
    const crossed = new Set<number>([1])
    for (const value of state.circled) for (let multiple = value * 2; multiple <= SIEVE_MAX; multiple += value) crossed.add(multiple)
    return crossed
}

/** Only numbers not yet crossed out can be circled, as in the real sieve */
export function circleNumber(state: SieveState, value: number): SieveState {
    if (value < 2 || value > SIEVE_MAX || state.circled.includes(value) || crossedOut(state).has(value)) return state
    return { ...state, circled: [...state.circled, value].sort((a, b) => a - b) }
}

export const sieveComplete = (state: Pick<SieveState, 'circled'>) => {
    const crossed = crossedOut(state)
    return Array.from({ length: SIEVE_MAX - 1 }, (_, index) => index + 2).every((value) => isPrime(value) || crossed.has(value))
}

export const PRIMES_UP_TO_100 = Array.from({ length: SIEVE_MAX }, (_, index) => index + 1).filter(isPrime).length

export const sieveChallenges: LabChallenge<SieveState>[] = [
    {
        id: 1401,
        prompt: { eu: 'Hasi bahea: aukeratu 2 eta 3, eta ratatu haien multiploak.', es: 'Empieza la criba: elige el 2 y el 3 y tacha sus múltiplos.', ar: 'ابدأ الغربال: اختر 2 و3 واشطب مضاعفاتهما.' },
        hint: { eu: 'Sakatu 2, eta gero 3.', es: 'Pulsa el 2 y después el 3.', ar: 'اضغط 2 ثم 3.' },
        isSolved: (state) => state.circled.includes(2) && state.circled.includes(3)
    },
    {
        id: 1402,
        prompt: { eu: 'Osatu bahea: 100 arteko konposatu guztiak ratatuta geratu behar dira.', es: 'Completa la criba: tienen que quedar tachados todos los compuestos hasta 100.', ar: 'أكمل الغربال: يجب شطب كل الأعداد المؤلفة حتى 100.' },
        hint: { eu: '2, 3, 5 eta 7rekin nahikoa da.', es: 'Basta con el 2, el 3, el 5 y el 7.', ar: 'تكفي الأعداد 2 و3 و5 و7.' },
        isSolved: (state) => sieveComplete(state)
    },
    {
        id: 1403,
        prompt: { eu: 'Bahea osatu ondoren, zenbat zenbaki lehen daude 100 arte? Idatzi.', es: 'Con la criba completa, ¿cuántos números primos hay hasta 100? Escríbelo.', ar: 'بعد إكمال الغربال، كم عددًا أوليًا حتى 100؟ اكتب الجواب.' },
        hint: { eu: 'Zenbatu ratatu gabe geratu direnak (1 ez da lehena).', es: 'Cuenta los que han quedado sin tachar (el 1 no es primo).', ar: 'عدّ الأعداد غير المشطوبة (1 ليس أوليًا).' },
        isSolved: (state) => sieveComplete(state) && answered(state, PRIMES_UP_TO_100)
    },
    {
        id: 1404,
        prompt: { eu: 'Bahea osatuta dagoenean, aukeratu 11. Zergatik ez da ezer berririk ratatzen?', es: 'Con la criba completa, elige el 11. ¿Por qué no se tacha nada nuevo?', ar: 'بعد إكمال الغربال اختر 11. لماذا لا يُشطب شيء جديد؟' },
        hint: { eu: '11ren multiplo txikiak (22, 33…) beste lehen batzuen multiploak dira jada.', es: 'Los múltiplos pequeños de 11 (22, 33…) ya son múltiplos de otros primos.', ar: 'مضاعفات 11 الصغيرة (22، 33…) هي أصلًا مضاعفات لأعداد أولية أخرى.' },
        isSolved: (state) => state.circled.includes(11) && sieveComplete({ circled: state.circled.filter((value) => value !== 11) })
    }
]

/* ---------- Factor ladder ---------- */

export const LADDER_PRIMES = [2, 3, 5, 7, 11, 13] as const
export const LADDER_LIMITS = { min: 4, max: 9999 } as const

export interface LadderState {
    value: number
    /** Primes already divided, in order */
    steps: number[]
    /** Last prime that did not divide, to explain why */
    rejected: number | null
    /** Numbers fully factorized */
    finished: number[]
}

export const initialLadderState: LadderState = { value: 360, steps: [], rejected: null, finished: [] }

export function ladderRest(state: Pick<LadderState, 'value' | 'steps'>): number {
    return state.steps.reduce((rest, prime) => rest / prime, state.value)
}

export function setLadderValue(state: LadderState, value: number): LadderState {
    return { ...state, value: clamp(value, LADDER_LIMITS.min, LADDER_LIMITS.max), steps: [], rejected: null }
}

export function divideLadder(state: LadderState, prime: number): LadderState {
    const rest = ladderRest(state)
    if (rest === 1) return state
    if (rest % prime !== 0) return { ...state, rejected: prime }
    const steps = [...state.steps, prime]
    const done = rest / prime === 1
    return { ...state, steps, rejected: null, finished: done && !state.finished.includes(state.value) ? [...state.finished, state.value] : state.finished }
}

/** The rest has a prime factor bigger than the buttons (e.g. 17): it is written as it is */
export function ladderStuck(state: Pick<LadderState, 'value' | 'steps'>): boolean {
    const rest = ladderRest(state)
    return rest > 1 && LADDER_PRIMES.every((prime) => rest % prime !== 0)
}

export const ladderChallenges: LabChallenge<LadderState>[] = [
    {
        id: 1501,
        prompt: { eu: 'Deskonposatu 360 biderkagai lehenetan.', es: 'Descompón 360 en factores primos.', ar: 'حلّل 360 إلى عوامل أولية.' },
        hint: { eu: 'Hasi 2rekin, bikoitia den bitartean.', es: 'Empieza por el 2 mientras sea par.', ar: 'ابدأ بـ 2 ما دام العدد زوجيًا.' },
        isSolved: (state) => state.finished.includes(360)
    },
    {
        id: 1502,
        prompt: { eu: 'Deskonposatu 1 001. Zein lehen behar dira?', es: 'Descompón 1 001. ¿Qué primos hacen falta?', ar: 'حلّل 1 001. ما الأعداد الأولية اللازمة؟' },
        hint: { eu: 'Ez da 2, 3 edo 5ekin zatigarria. Probatu 7ren irizpidea.', es: 'No es divisible por 2, 3 ni 5. Prueba el criterio del 7.', ar: 'لا يقبل القسمة على 2 أو 3 أو 5. جرّب قاعدة 7.' },
        isSolved: (state) => state.finished.includes(1001)
    },
    {
        id: 1503,
        prompt: { eu: 'Aurkitu 100 arteko zenbaki bat, hiru lehen desberdinekin deskonposatzen dena, eta deskonposatu.', es: 'Encuentra un número hasta 100 que se descomponga con tres primos distintos y descomponlo.', ar: 'جد عددًا حتى 100 يتحلل إلى ثلاثة أعداد أولية مختلفة وحلّله.' },
        hint: { eu: 'Adibidez 2 · 3 · 5 edo 2 · 3 · 7.', es: 'Por ejemplo 2 · 3 · 5 o 2 · 3 · 7.', ar: 'مثلًا 2 · 3 · 5 أو 2 · 3 · 7.' },
        isSolved: (state) => state.finished.some((value) => value <= 100 && factorize(value).length === 3)
    },
    {
        id: 1504,
        prompt: { eu: 'Deskonposatu 2 000 eta lortu 2 eta 5 bakarrik dituen deskonposizioa.', es: 'Descompón 2 000: su descomposición solo tiene doses y cincos.', ar: 'حلّل 2 000: لا يحتوي تحليله إلا على العددين 2 و5.' },
        hint: { eu: '2 000 = 2 · 1 000 eta 1 000 = 10 · 10 · 10.', es: '2 000 = 2 · 1 000 y 1 000 = 10 · 10 · 10.', ar: '2 000 = 2 · 1 000 و1 000 = 10 · 10 · 10.' },
        isSolved: (state) => state.finished.includes(2000)
    }
]

/* ---------- Venn diagram: ZKH and MKT ---------- */

export const VENN_LIMITS = { min: 2, max: 200 } as const

export interface VennState extends OperationAnswer {
    first: number
    second: number
    ask: 'gcd' | 'lcm'
}

export const initialVennState: VennState = { first: 12, second: 18, ask: 'gcd', ...freshAnswer }

export function setVenn(state: VennState, patch: Partial<Pick<VennState, 'first' | 'second' | 'ask'>>): VennState {
    return {
        ...state,
        first: clamp(patch.first ?? state.first, VENN_LIMITS.min, VENN_LIMITS.max),
        second: clamp(patch.second ?? state.second, VENN_LIMITS.min, VENN_LIMITS.max),
        ask: patch.ask ?? state.ask,
        ...freshAnswer
    }
}

/** Prime factors split into the three regions of the diagram, repeated as many times as their exponent */
export function vennRegions(first: number, second: number): { onlyFirst: number[]; shared: number[]; onlySecond: number[] } {
    const a = new Map(factorize(first))
    const b = new Map(factorize(second))
    const primes = [...new Set([...a.keys(), ...b.keys()])].sort((x, y) => x - y)
    const repeat = (prime: number, times: number) => Array.from({ length: Math.max(0, times) }, () => prime)
    return {
        onlyFirst: primes.flatMap((prime) => repeat(prime, (a.get(prime) ?? 0) - Math.min(a.get(prime) ?? 0, b.get(prime) ?? 0))),
        shared: primes.flatMap((prime) => repeat(prime, Math.min(a.get(prime) ?? 0, b.get(prime) ?? 0))),
        onlySecond: primes.flatMap((prime) => repeat(prime, (b.get(prime) ?? 0) - Math.min(a.get(prime) ?? 0, b.get(prime) ?? 0)))
    }
}

export const vennExpected = (state: Pick<VennState, 'first' | 'second' | 'ask'>) => (state.ask === 'gcd' ? gcd(state.first, state.second) : lcm(state.first, state.second))

const vennPair = (state: VennState, a: number, b: number) => [state.first, state.second].sort((x, y) => x - y).join() === [a, b].sort((x, y) => x - y).join()

export const vennChallenges: LabChallenge<VennState>[] = [
    {
        id: 1601,
        prompt: { eu: 'Kalkulatu ZKH(24, 36) eta idatzi.', es: 'Calcula el m.c.d.(24, 36) y escríbelo.', ar: 'احسب ق.م.أ(24، 36) واكتبه.' },
        hint: { eu: 'Biderkatu erdiko biderkagaiak.', es: 'Multiplica los factores del centro.', ar: 'اضرب العوامل التي في الوسط.' },
        isSolved: (state) => vennPair(state, 24, 36) && state.ask === 'gcd' && answered(state, 12)
    },
    {
        id: 1602,
        prompt: { eu: 'Kalkulatu MKT(12, 18) eta idatzi.', es: 'Calcula el m.c.m.(12, 18) y escríbelo.', ar: 'احسب م.م.أ(12، 18) واكتبه.' },
        hint: { eu: 'Biderkatu diagramako biderkagai guztiak.', es: 'Multiplica todos los factores del diagrama.', ar: 'اضرب كل عوامل المخطط.' },
        isSolved: (state) => vennPair(state, 12, 18) && state.ask === 'lcm' && answered(state, 36)
    },
    {
        id: 1603,
        prompt: { eu: 'Aurkitu 10 baino handiagoak diren bi zenbaki, erdian ezer ez dutenak (elkarren arteko lehenak), eta idatzi haien MKT.', es: 'Encuentra dos números mayores que 10 que no tengan nada en el centro (primos entre sí) y escribe su m.c.m.', ar: 'جد عددين أكبر من 10 ليس في وسطهما شيء (أوليين فيما بينهما) واكتب م.م.أ لهما.' },
        hint: { eu: 'Adibidez 15 eta 22: ez dute lehen komunik.', es: 'Por ejemplo 15 y 22: no tienen primos comunes.', ar: 'مثلًا 15 و22: لا أعداد أولية مشتركة بينهما.' },
        isSolved: (state) => state.first > 10 && state.second > 10 && gcd(state.first, state.second) === 1 && state.ask === 'lcm' && answered(state, state.first * state.second)
    },
    {
        id: 1604,
        prompt: { eu: 'Aurkitu bi zenbaki: ZKH 6 eta MKT 60.', es: 'Encuentra dos números con m.c.d. 6 y m.c.m. 60.', ar: 'جد عددين ق.م.أ لهما 6 وم.م.أ لهما 60.' },
        hint: { eu: 'Erdian 2 eta 3 egon behar dute; guztira 2 · 2 · 3 · 5.', es: 'En el centro tienen que estar el 2 y el 3; en total, 2 · 2 · 3 · 5.', ar: 'يجب أن يكون في الوسط 2 و3، والمجموع 2 · 2 · 3 · 5.' },
        isSolved: (state) => gcd(state.first, state.second) === 6 && lcm(state.first, state.second) === 60
    }
]

/* ---------- Sorting problems: ZKH or MKT ---------- */

export interface ProblemCard {
    id: string
    kind: 'gcd' | 'lcm'
    text: LocalizedText
}

export const problemCards: ProblemCard[] = [
    { id: 'tiles', kind: 'gcd', text: { eu: 'Gela bat lauza karratu handienekin estali, bat ere moztu gabe.', es: 'Cubrir una sala con las baldosas cuadradas más grandes posible, sin cortar ninguna.', ar: 'تغطية غرفة بأكبر بلاط مربع ممكن دون قص أي بلاطة.' } },
    { id: 'buses', kind: 'lcm', text: { eu: 'Bi autobus 12 eta 18 minuturo irteten dira. Noiz irtengo dira berriro batera?', es: 'Dos autobuses salen cada 12 y 18 minutos. ¿Cuándo volverán a salir juntos?', ar: 'حافلتان تنطلقان كل 12 و18 دقيقة. متى تنطلقان معًا مجددًا؟' } },
    { id: 'lights', kind: 'lcm', text: { eu: 'Argi batek 6 segundoro keinu egiten du eta beste batek 8ro. Noiz egingo dute keinu batera?', es: 'Una luz parpadea cada 6 segundos y otra cada 8. ¿Cuándo parpadearán a la vez?', ar: 'ضوء يومض كل 6 ثوانٍ وآخر كل 8. متى يومضان معًا؟' } },
    { id: 'bags', kind: 'gcd', text: { eu: '24 sagar eta 36 udare poltsa berdinetan banatu, ahalik eta poltsa gehienetan.', es: 'Repartir 24 manzanas y 36 peras en bolsas iguales, en el mayor número de bolsas posible.', ar: 'توزيع 24 تفاحة و36 إجاصة على أكياس متساوية بأكبر عدد ممكن من الأكياس.' } },
    { id: 'ribbons', kind: 'gcd', text: { eu: '45 cm eta 75 cm-ko zintak zati berdin luzeenetan moztu, ezer soberan gabe.', es: 'Cortar cintas de 45 cm y 75 cm en los trozos iguales más largos posible, sin que sobre nada.', ar: 'قص شريطين بطول 45 سم و75 سم إلى أطول قطع متساوية دون أن يبقى شيء.' } },
    { id: 'books', kind: 'lcm', text: { eu: 'Liburuak 4ka, 6ka edo 9ka taldekatu daitezke soberakinik gabe. Gutxienez zenbat liburu?', es: 'Unos libros se pueden agrupar de 4 en 4, de 6 en 6 o de 9 en 9 sin que sobre ninguno. ¿Cuántos libros hay como mínimo?', ar: 'يمكن تجميع كتب 4 و4 أو 6 و6 أو 9 و9 دون باقٍ. ما أقل عدد ممكن من الكتب؟' } },
    { id: 'cubes', kind: 'lcm', text: { eu: '4 cm eta 6 cm-ko kuboekin bi dorre: noiz izango dute altuera bera lehen aldiz?', es: 'Dos torres con cubos de 4 cm y de 6 cm: ¿cuándo tendrán por primera vez la misma altura?', ar: 'برجان من مكعبات 4 سم و6 سم: متى يتساوى ارتفاعهما لأول مرة؟' } },
    { id: 'necklaces', kind: 'gcd', text: { eu: '9 bola gorri, 12 berde eta 15 urdin: kolore bakarreko lepokoak, denak bola kopuru berarekin.', es: '9 bolas rojas, 12 verdes y 15 azules: collares de un solo color, todos con el mismo número de bolas.', ar: '9 كرات حمراء و12 خضراء و15 زرقاء: عقود بلون واحد وكلها بعدد الكرات نفسه.' } }
]

export interface SortState {
    answers: Record<string, 'gcd' | 'lcm'>
    /** Wrong choices since the last restart */
    mistakes: number
}

export const initialSortState: SortState = { answers: {}, mistakes: 0 }

export function classifyCard(state: SortState, id: string, kind: 'gcd' | 'lcm'): SortState {
    const card = problemCards.find((item) => item.id === id)
    if (!card || state.answers[id] === card.kind) return state
    return { answers: { ...state.answers, [id]: kind }, mistakes: state.mistakes + (card.kind === kind ? 0 : 1) }
}

const rightOf = (state: SortState, kind: 'gcd' | 'lcm') => problemCards.filter((card) => card.kind === kind && state.answers[card.id] === kind).length

export const sortChallenges: LabChallenge<SortState>[] = [
    {
        id: 1701,
        prompt: { eu: 'Sailkatu ondo ZKHko hiru buruketa.', es: 'Clasifica bien tres problemas de m.c.d.', ar: 'صنّف بشكل صحيح ثلاث مسائل ق.م.أ.' },
        hint: { eu: 'Banatu, zatitu, handiena…', es: 'Repartir, dividir, lo más grande…', ar: 'توزيع، تقسيم، الأكبر…' },
        isSolved: (state) => rightOf(state, 'gcd') >= 3
    },
    {
        id: 1702,
        prompt: { eu: 'Sailkatu ondo MKTko hiru buruketa.', es: 'Clasifica bien tres problemas de m.c.m.', ar: 'صنّف بشكل صحيح ثلاث مسائل م.م.أ.' },
        hint: { eu: 'Berriro batera, lehen aldiz, gutxienez…', es: 'Volver a coincidir, por primera vez, como mínimo…', ar: 'التزامن مجددًا، لأول مرة، على الأقل…' },
        isSolved: (state) => rightOf(state, 'lcm') >= 3
    },
    {
        id: 1703,
        prompt: { eu: 'Sailkatu zortzi txartelak akatsik gabe (hasi berriro behar izanez gero).', es: 'Clasifica las ocho tarjetas sin ningún error (vuelve a empezar si hace falta).', ar: 'صنّف البطاقات الثماني دون أي خطأ (ابدأ من جديد إن لزم).' },
        hint: { eu: 'Irakurri galdera amaierara arte: zer bilatzen da, zati bat ala bat-etortze bat?', es: 'Lee la pregunta hasta el final: ¿se busca una parte o una coincidencia?', ar: 'اقرأ السؤال حتى النهاية: هل المطلوب جزء أم تزامن؟' },
        isSolved: (state) => state.mistakes === 0 && problemCards.every((card) => state.answers[card.id] === card.kind)
    }
]

export const divisibilityLabChallengeIds: number[] = [
    ...rectanglesChallenges,
    ...jumpsChallenges,
    ...criteriaChallenges,
    ...sieveChallenges,
    ...ladderChallenges,
    ...vennChallenges,
    ...sortChallenges
].map((challenge) => challenge.id)
