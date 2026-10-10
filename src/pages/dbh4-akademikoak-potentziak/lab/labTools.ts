import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { powersChallenges, scientificChallenges } from '../../dbh4-aplikatuak-errealak/lab/labTools.ts'
import type { PowersStageId } from '../lessons.tsx'
import { commonIndex, exactLog, extractFactors, gcd, rationalPower } from '../radicals.ts'

/* ==========================================================================
   Berreturak, erroak eta logaritmoak (4. DBH akademikoak) laboratory. The
   ladder of powers and the jumps of the comma come from 4. DBH aplikatuak
   with their own challenges. The new tools: the factorizing machine for
   12ᵐ : 6ⁿ, a fractional exponent on a perfect power, two radicals taken
   to a common index, factors out of a root of any index, the factor that
   rationalizes a / ⁿ√bᵐ, the conjugate of √a − √b, the ladder of powers
   read as logarithms and the change of base. Pure state logic; the
   components live next to this file. Tests in
   tests/potentziak-dbh4ak-lab.test.ts.
   ========================================================================== */

export type PowersLabToolId = 'powers' | 'rules' | 'scientific' | 'fractional' | 'common' | 'extract' | 'rationalize' | 'conjugate' | 'ladder' | 'change-base'

export interface PowersLabTool extends LabToolInfo {
    id: PowersLabToolId
    stage: PowersStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const equals = (value: FractionValue | null, numerator: number, denominator = 1) => value !== null && value.numerator * denominator === numerator * value.denominator

export const powersLabTools: PowersLabTool[] = [
    { id: 'powers', stage: 'powers', lessonTopic: 'integer-powers', title: say('Berreturen eskailera', 'La escalera de potencias', 'سُلّم القوى'), observe: say('Jaitsi berretzailea: maila bakoitzean oinarriaz zatitzen da. Horregatik da 1 berretzaile 0 eta alderantzizkoa berretzaile negatiboa.', 'Baja el exponente: en cada escalón se divide entre la base. Por eso el exponente 0 da 1 y el negativo, el inverso.', 'أنزل الأس: في كل درجة نقسم على الأساس. لذلك يعطي الأس 0 العدد 1 ويعطي الأس السالب المقلوب.') },
    { id: 'rules', stage: 'powers', lessonTopic: 'power-rules', title: say('Faktorizatzeko makina', 'La máquina de factorizar', 'آلة التحليل'), observe: say('12 = 2² · 3 eta 6 = 2 · 3. Berretzean berretzaileak biderkatzen dira, eta zatitzean kendu: 2-renak eta 3-renak bakoitza bere aldetik.', '12 = 2² · 3 y 6 = 2 · 3. Al elevar se multiplican los exponentes y al dividir se restan: los del 2 y los del 3, cada uno por su lado.', '12 = 2² · 3 و6 = 2 · 3. عند الرفع تُضرب الأسس وعند القسمة تُطرح: أسس 2 وأسس 3 كلٌّ على حدة.') },
    { id: 'scientific', stage: 'powers', lessonTopic: 'scientific', title: say('Komaren jauziak', 'Los saltos de la coma', 'قفزات الفاصلة'), observe: say('Aldatu berretzailea: koma mugitzen da. Idazkera zientifikoa lortzen da komaren aurretik zero ez den zifra bakarra geratzen denean.', 'Cambia el exponente: la coma se desplaza. Se llega a la notación científica cuando queda una sola cifra, distinta de cero, delante de la coma.', 'غيّر الأس: تتحرك الفاصلة. ونصل إلى الترميز العلمي عندما يبقى رقم واحد غير الصفر قبل الفاصلة.') },
    { id: 'fractional', stage: 'radicals', lessonTopic: 'fractional', title: say('Berretzaile zatikia', 'El exponente fraccionario', 'الأس الكسري'), observe: say('Izendatzaileak erroa adierazten du eta zenbakitzaileak berretura. Oinarria berretura perfektua denean, emaitza zehatza da.', 'El denominador indica la raíz y el numerador la potencia. Cuando la base es una potencia perfecta, el resultado es exacto.', 'يدل المقام على الجذر والبسط على القوة. وعندما يكون الأساس قوة تامة تكون النتيجة دقيقة.') },
    { id: 'common', stage: 'radicals', lessonTopic: 'equivalent', title: say('Indize komuna', 'El índice común', 'الدليل المشترك'), observe: say('Indize komuna m.k.t.-a da. Errokizun bakoitza indizea zenbat aldiz handitu den hainbeste aldiz berretzen da; gero konparatu besterik ez dago.', 'El índice común es el m.c.m. Cada radicando se eleva a las veces que ha crecido su índice; después basta con comparar.', 'الدليل المشترك هو المضاعف المشترك الأصغر. ويُرفع كل ما تحت جذر بعدد مرات زيادة دليله، ثم تكفي المقارنة.') },
    { id: 'extract', stage: 'operations', lessonTopic: 'extract', title: say('Errotik faktoreak ateratzen', 'Sacar factores de la raíz', 'إخراج العوامل من الجذر'), observe: say('Zenbaki lehen bakoitzaren berretzailea indizeaz zatitzen da: zatidura kanpora ateratzen da, eta hondarra barruan geratzen da.', 'El exponente de cada primo se divide entre el índice: el cociente sale fuera y el resto se queda dentro.', 'يُقسم أس كل عدد أولي على الدليل: يخرج خارج القسمة ويبقى الباقي في الداخل.') },
    { id: 'rationalize', stage: 'rationalize', lessonTopic: 'rationalize-index', title: say('Arrazionalizatzeko faktorea', 'El factor que racionaliza', 'عامل الإنطاق'), observe: say('ⁿ√bᵐ arrazionalizatzeko, ⁿ√bⁿ⁻ᵐ-z biderkatzen da: berretzaileak indizeraino osatzen dira eta erroa desagertzen da.', 'Para racionalizar ⁿ√bᵐ se multiplica por ⁿ√bⁿ⁻ᵐ: los exponentes se completan hasta el índice y la raíz desaparece.', 'لإنطاق ⁿ√bᵐ نضرب في ⁿ√bⁿ⁻ᵐ: تكتمل الأسس حتى الدليل ويختفي الجذر.') },
    { id: 'conjugate', stage: 'rationalize', lessonTopic: 'conjugate', title: say('Konjokatua', 'El conjugado', 'المرافق'), observe: say('√a − √b bider √a + √b: a − b. Erroak desagertzen dira, eta izendatzailea errokizunen kenketa da.', '√a − √b por √a + √b: a − b. Las raíces desaparecen y el denominador es la resta de los radicandos.', '√a − √b في √a + √b: a − b. تختفي الجذور ويصبح المقام فرق ما تحت الجذرين.') },
    { id: 'ladder', stage: 'logarithms', lessonTopic: 'log-definition', title: say('Logaritmoen eskailera', 'La escalera de los logaritmos', 'سُلّم اللوغاريتمات'), observe: say('Igotako maila bakoitzak oinarriaz biderkatzen du. Logaritmoa zenbat maila igo edo jaitsi diren da: 1etik beheko balioek logaritmo negatiboa dute.', 'Cada escalón que sube multiplica por la base. El logaritmo es cuántos escalones se suben o bajan: los valores menores que 1 tienen logaritmo negativo.', 'كل درجة نصعدها تضرب في الأساس. واللوغاريتم هو عدد الدرجات صعودًا أو نزولًا: القيم الأصغر من 1 لها لوغاريتم سالب.') },
    { id: 'change-base', stage: 'logarithms', lessonTopic: 'change-base', title: say('Oinarri-aldaketa', 'Cambio de base', 'تغيير الأساس'), observe: say('logₐ b = log b : log a. Emaitza beti oinarriaren bi berretura jarraituren artean dago; berretura zehatza bada, logaritmoa osoa da.', 'logₐ b = log b : log a. El resultado siempre está entre dos potencias seguidas de la base; si es una potencia exacta, el logaritmo es entero.', 'logₐ b = log b : log a. النتيجة دائمًا بين قوتين متتاليتين للأساس، وإذا كانت قوة تامة فاللوغاريتم صحيح.') }
]

export const powersLabToolForTopic: Record<string, PowersLabToolId | undefined> = {
    'integer-powers': 'powers',
    'power-rules': 'rules',
    scientific: 'scientific',
    roots: 'fractional',
    fractional: 'fractional',
    equivalent: 'common',
    extract: 'extract',
    'add-radicals': 'extract',
    'multiply-radicals': 'common',
    'rationalize-square': 'rationalize',
    'rationalize-index': 'rationalize',
    conjugate: 'conjugate',
    'log-definition': 'ladder',
    'log-properties': 'ladder',
    'change-base': 'change-base'
}

/* ---------- 1. The factorizing machine: 12ᵐ : 6ⁿ = 2^(2m − n) · 3^(m − n) ---------- */

export const RULES_LIMIT = 5

export interface RulesState {
    m: number
    n: number
}

export const initialRulesState: RulesState = { m: 2, n: 1 }

export const setRules = (state: RulesState, patch: Partial<RulesState>): RulesState => ({
    m: clamp(patch.m ?? state.m, -RULES_LIMIT, RULES_LIMIT),
    n: clamp(patch.n ?? state.n, -RULES_LIMIT, RULES_LIMIT)
})

/** Exponents of 2 and 3 in 12ᵐ : 6ⁿ */
export const rulesExponents = ({ m, n }: RulesState) => ({ two: 2 * m - n, three: m - n })

export function rulesValue(state: RulesState): FractionValue {
    const { two, three } = rulesExponents(state)
    const top = 2 ** Math.max(two, 0) * 3 ** Math.max(three, 0)
    const bottom = 2 ** Math.max(-two, 0) * 3 ** Math.max(-three, 0)
    return fraction(top, bottom)
}

export const rulesChallenges: LabChallenge<RulesState>[] = [
    { id: 61101, prompt: say('Lortu $48=2^{4}\\cdot 3$.', 'Consigue $48=2^{4}\\cdot 3$.', 'احصل على $48=2^{4}\\cdot 3$.'), hint: say('$2m-n=4$ eta $m-n=1$.', '$2m-n=4$ y $m-n=1$.', '$2m-n=4$ و$m-n=1$.'), isSolved: (state) => equals(rulesValue(state), 48) },
    { id: 61102, prompt: say('Lortu $\\frac{1}{3}$.', 'Consigue $\\frac{1}{3}$.', 'احصل على $\\frac{1}{3}$.'), hint: say('2-ren berretzailea 0 eta 3-rena −1.', 'El exponente del 2, 0, y el del 3, −1.', 'أس 2 يساوي 0 وأس 3 يساوي −1.'), isSolved: (state) => equals(rulesValue(state), 1, 3) },
    { id: 61103, prompt: say('Lortu 2ren berretura bat (3rik gabe), 1 ez dena eta zatiki bat dena.', 'Consigue una potencia de 2 (sin 3) distinta de 1 que sea una fracción.', 'احصل على قوة للعدد 2 (دون 3) لا تساوي 1 وتكون كسرًا.'), hint: say('$m=n$ denean 3a desagertzen da; $m$ negatiboa izan behar da.', 'Cuando $m=n$ desaparece el 3; $m$ tiene que ser negativo.', 'عندما $m=n$ يختفي 3؛ ويجب أن يكون $m$ سالبًا.'), isSolved: (state) => rulesExponents(state).three === 0 && rulesExponents(state).two < 0 }
]

/* ---------- 2. A fractional exponent on a perfect power ---------- */

export const FRACTIONAL_BASES = [4, 8, 9, 16, 25, 27, 32, 64, 81] as const
export const FRACTIONAL_LIMITS = { numerator: 5, denominator: 6 } as const

export interface FractionalState {
    base: number
    p: number
    q: number
}

export const initialFractionalState: FractionalState = { base: 1, p: 1, q: 2 }

export const setFractional = (state: FractionalState, patch: Partial<FractionalState>): FractionalState => ({
    base: clamp(patch.base ?? state.base, 0, FRACTIONAL_BASES.length - 1),
    p: clamp(patch.p ?? state.p, -FRACTIONAL_LIMITS.numerator, FRACTIONAL_LIMITS.numerator),
    q: clamp(patch.q ?? state.q, 1, FRACTIONAL_LIMITS.denominator)
})

/** a^(p/q) exactly, or null when the root is not exact */
export const fractionalValue = (state: FractionalState) => rationalPower(FRACTIONAL_BASES[state.base], fraction(state.p, state.q))

const baseIs = (state: FractionalState, base: number) => FRACTIONAL_BASES[state.base] === base

export const fractionalChallenges: LabChallenge<FractionalState>[] = [
    { id: 61201, prompt: say('8 oinarriarekin, lortu 4.', 'Con base 8, consigue 4.', 'بالأساس 8 احصل على 4.'), hint: say('$\\sqrt[3]{8}=2$ eta $2^{2}=4$.', '$\\sqrt[3]{8}=2$ y $2^{2}=4$.', '$\\sqrt[3]{8}=2$ و$2^{2}=4$.'), isSolved: (state) => baseIs(state, 8) && equals(fractionalValue(state), 4) },
    { id: 61202, prompt: say('16 oinarriarekin, lortu $\\frac{1}{8}$.', 'Con base 16, consigue $\\frac{1}{8}$.', 'بالأساس 16 احصل على $\\frac{1}{8}$.'), hint: say('$\\sqrt[4]{16}=2$, $2^{3}=8$ eta berretzaile negatiboa.', '$\\sqrt[4]{16}=2$, $2^{3}=8$ y exponente negativo.', '$\\sqrt[4]{16}=2$ و$2^{3}=8$ وأس سالب.'), isSolved: (state) => baseIs(state, 16) && equals(fractionalValue(state), 1, 8) },
    { id: 61203, prompt: say('9 oinarriarekin, lortu 27.', 'Con base 9, consigue 27.', 'بالأساس 9 احصل على 27.'), hint: say('$\\sqrt{9}=3$ eta $3^{3}=27$.', '$\\sqrt{9}=3$ y $3^{3}=27$.', '$\\sqrt{9}=3$ و$3^{3}=27$.'), isSolved: (state) => baseIs(state, 9) && equals(fractionalValue(state), 27) },
    { id: 61204, prompt: say('64 oinarriarekin, lortu 32, berretzailearen izendatzailea 6 izanik.', 'Con base 64, consigue 32 con un exponente de denominador 6.', 'بالأساس 64 احصل على 32 بأس مقامه 6.'), hint: say('$\\sqrt[6]{64}=2$ eta $2^{5}=32$.', '$\\sqrt[6]{64}=2$ y $2^{5}=32$.', '$\\sqrt[6]{64}=2$ و$2^{5}=32$.'), isSolved: (state) => baseIs(state, 64) && state.q === 6 && equals(fractionalValue(state), 32) }
]

/* ---------- 3. Two radicals with a common index ---------- */

export const COMMON_LIMITS = { index: { min: 2, max: 6 }, radicand: { min: 2, max: 12 } } as const

export interface CommonState {
    firstIndex: number
    firstRadicand: number
    secondIndex: number
    secondRadicand: number
}

export const initialCommonState: CommonState = { firstIndex: 2, firstRadicand: 2, secondIndex: 3, secondRadicand: 2 }

export const setCommon = (state: CommonState, patch: Partial<CommonState>): CommonState => ({
    firstIndex: clamp(patch.firstIndex ?? state.firstIndex, COMMON_LIMITS.index.min, COMMON_LIMITS.index.max),
    firstRadicand: clamp(patch.firstRadicand ?? state.firstRadicand, COMMON_LIMITS.radicand.min, COMMON_LIMITS.radicand.max),
    secondIndex: clamp(patch.secondIndex ?? state.secondIndex, COMMON_LIMITS.index.min, COMMON_LIMITS.index.max),
    secondRadicand: clamp(patch.secondRadicand ?? state.secondRadicand, COMMON_LIMITS.radicand.min, COMMON_LIMITS.radicand.max)
})

export const commonOf = (state: CommonState) => commonIndex(state.firstIndex, state.firstRadicand, state.secondIndex, state.secondRadicand)

/** −1, 0 or 1: how the first radical compares with the second */
export function compareRadicals(state: CommonState) {
    const { first, second } = commonOf(state)
    return Math.sign(first - second)
}

export const commonChallenges: LabChallenge<CommonState>[] = [
    { id: 61301, prompt: say('Konparatu $\\sqrt{2}$ eta $\\sqrt[3]{3}$: idatzi biak indize komunarekin.', 'Compara $\\sqrt{2}$ y $\\sqrt[3]{3}$: escríbelos con índice común.', 'قارن $\\sqrt{2}$ و$\\sqrt[3]{3}$: اكتبهما بدليل مشترك.'), hint: say('Lehena $\\sqrt{2}$, bigarrena $\\sqrt[3]{3}$.', 'El primero $\\sqrt{2}$, el segundo $\\sqrt[3]{3}$.', 'الأول $\\sqrt{2}$ والثاني $\\sqrt[3]{3}$.'), isSolved: (state) => state.firstIndex === 2 && state.firstRadicand === 2 && state.secondIndex === 3 && state.secondRadicand === 3 },
    { id: 61302, prompt: say('Lortu 12ko indize komuna, bigarren erradikala handiagoa izanik.', 'Consigue un índice común 12 con el segundo radical mayor.', 'احصل على دليل مشترك 12 والجذر الثاني أكبر.'), hint: say('Indizeak 3 eta 4, edo 4 eta 6.', 'Índices 3 y 4, o 4 y 6.', 'الدليلان 3 و4، أو 4 و6.'), isSolved: (state) => commonOf(state).index === 12 && compareRadicals(state) < 0 },
    { id: 61303, prompt: say('Lortu bi erradikal berdin, errokizun desberdinekin.', 'Consigue dos radicales iguales con radicandos distintos.', 'احصل على جذرين متساويين بما تحت جذر مختلف.'), hint: say('Adibidez, $\\sqrt{2}=\\sqrt[4]{4}$.', 'Por ejemplo, $\\sqrt{2}=\\sqrt[4]{4}$.', 'مثلًا $\\sqrt{2}=\\sqrt[4]{4}$.'), isSolved: (state) => compareRadicals(state) === 0 && state.firstRadicand !== state.secondRadicand }
]

/* ---------- 4. Factors out of a root of any index: 2ᵃ · 3ᵇ · 5ᶜ ---------- */

export const EXTRACT_LIMITS = { exponent: 8, index: { min: 2, max: 5 } } as const

export interface ExtractState {
    /** Exponents of 2, 3 and 5 in the radicand */
    exponents: number[]
    index: number
}

export const initialExtractState: ExtractState = { exponents: [3, 2, 0], index: 2 }

export function setExtract(state: ExtractState, patch: { prime?: number; exponent?: number; index?: number }): ExtractState {
    const exponents = patch.prime === undefined || patch.exponent === undefined ? state.exponents : state.exponents.map((value, position) => (position === patch.prime ? clamp(patch.exponent!, 0, EXTRACT_LIMITS.exponent) : value))
    return { exponents, index: clamp(patch.index ?? state.index, EXTRACT_LIMITS.index.min, EXTRACT_LIMITS.index.max) }
}

export const EXTRACT_PRIMES = [2, 3, 5]
export const extractRadicand = (state: ExtractState) => EXTRACT_PRIMES.reduce((product, prime, index) => product * prime ** state.exponents[index], 1)
export const extractOf = (state: ExtractState) => extractFactors(extractRadicand(state), state.index)

export const extractChallenges: LabChallenge<ExtractState>[] = [
    { id: 61401, prompt: say('Lortu $\\sqrt[3]{3240}=6\\sqrt[3]{15}$.', 'Consigue $\\sqrt[3]{3240}=6\\sqrt[3]{15}$.', 'احصل على $\\sqrt[3]{3240}=6\\sqrt[3]{15}$.'), hint: say('$3240=2^{3}\\cdot 3^{4}\\cdot 5$ eta indizea 3.', '$3240=2^{3}\\cdot 3^{4}\\cdot 5$ e índice 3.', '$3240=2^{3}\\cdot 3^{4}\\cdot 5$ والدليل 3.'), isSolved: (state) => state.index === 3 && extractRadicand(state) === 3240 },
    { id: 61402, prompt: say('Lortu $3\\sqrt[4]{5}$.', 'Consigue $3\\sqrt[4]{5}$.', 'احصل على $3\\sqrt[4]{5}$.'), hint: say('Indizea 4: $3^{4}\\cdot 5=405$.', 'Índice 4: $3^{4}\\cdot 5=405$.', 'الدليل 4: $3^{4}\\cdot 5=405$.'), isSolved: (state) => state.index === 4 && extractOf(state).outside === 3 && extractOf(state).inside === 5 },
    { id: 61403, prompt: say('Lortu erro bat osorik ateratzen dena, 5. indizearekin.', 'Consigue una raíz que salga entera, con índice 5.', 'احصل على جذر يخرج كله بالدليل 5.'), hint: say('Berretzaile guztiak 5en multiploak.', 'Todos los exponentes, múltiplos de 5.', 'كل الأسس مضاعفات للعدد 5.'), isSolved: (state) => state.index === 5 && extractRadicand(state) > 1 && extractOf(state).inside === 1 },
    { id: 61404, prompt: say('Lortu $2\\sqrt[3]{6}$.', 'Consigue $2\\sqrt[3]{6}$.', 'احصل على $2\\sqrt[3]{6}$.'), hint: say('$2^{3}\\cdot 6=2^{4}\\cdot 3=48$.', '$2^{3}\\cdot 6=2^{4}\\cdot 3=48$.', '$2^{3}\\cdot 6=2^{4}\\cdot 3=48$.'), isSolved: (state) => state.index === 3 && extractOf(state).outside === 2 && extractOf(state).inside === 6 }
]

/* ---------- 5. Rationalizing a / ⁿ√bᵐ ---------- */

export const RATIONALIZE_BASES = [2, 3, 5] as const
export const RATIONALIZE_LIMITS = { numerator: { min: 1, max: 20 }, index: { min: 2, max: 5 } } as const

export interface RationalizeState {
    numerator: number
    base: number
    index: number
    exponent: number
}

export const initialRationalizeState: RationalizeState = { numerator: 1, base: 0, index: 2, exponent: 1 }

export function setRationalize(state: RationalizeState, patch: Partial<RationalizeState>): RationalizeState {
    const index = clamp(patch.index ?? state.index, RATIONALIZE_LIMITS.index.min, RATIONALIZE_LIMITS.index.max)
    return {
        numerator: clamp(patch.numerator ?? state.numerator, RATIONALIZE_LIMITS.numerator.min, RATIONALIZE_LIMITS.numerator.max),
        base: clamp(patch.base ?? state.base, 0, RATIONALIZE_BASES.length - 1),
        index,
        exponent: clamp(patch.exponent ?? state.exponent, 1, index - 1)
    }
}

/** a / ⁿ√bᵐ = a · ⁿ√bⁿ⁻ᵐ / b, with the whole numbers a / b simplified */
export function rationalizeOf(state: RationalizeState) {
    const b = RATIONALIZE_BASES[state.base]
    const missing = state.index - state.exponent
    const divisor = gcd(state.numerator, b)
    return { b, missing, factorRadicand: b ** missing, coefficient: state.numerator / divisor, denominator: b / divisor }
}

export const rationalizeChallenges: LabChallenge<RationalizeState>[] = [
    { id: 61501, prompt: say('Arrazionalizatu $\\frac{5}{\\sqrt[3]{2}}$.', 'Racionaliza $\\frac{5}{\\sqrt[3]{2}}$.', 'أنطِق $\\frac{5}{\\sqrt[3]{2}}$.'), hint: say('Indizea 3, berretzailea 1: biderkatu $\\sqrt[3]{2^{2}}$-z.', 'Índice 3, exponente 1: multiplica por $\\sqrt[3]{2^{2}}$.', 'الدليل 3 والأس 1: اضرب في $\\sqrt[3]{2^{2}}$.'), isSolved: (state) => state.numerator === 5 && rationalizeOf(state).b === 2 && state.index === 3 && state.exponent === 1 },
    { id: 61502, prompt: say('Lortu $\\sqrt[5]{27}$ biderkatzailea.', 'Consigue el factor $\\sqrt[5]{27}$.', 'احصل على العامل $\\sqrt[5]{27}$.'), hint: say('$27=3^{3}$: izendatzailea $\\sqrt[5]{3^{2}}$.', '$27=3^{3}$: el denominador es $\\sqrt[5]{3^{2}}$.', '$27=3^{3}$: المقام $\\sqrt[5]{3^{2}}$.'), isSolved: (state) => state.index === 5 && rationalizeOf(state).b === 3 && rationalizeOf(state).missing === 3 },
    { id: 61503, prompt: say('Arrazionalizatu eta lortu izendatzailerik gabeko emaitza: $a\\sqrt[n]{\\ldots}$, 4. indizearekin.', 'Racionaliza y consigue un resultado sin denominador: $a\\sqrt[n]{\\ldots}$, con índice 4.', 'أنطِق واحصل على نتيجة بلا مقام: $a\\sqrt[n]{\\ldots}$ بالدليل 4.'), hint: say('Zenbakitzailea $b$-ren multiploa izan behar da.', 'El numerador tiene que ser múltiplo de $b$.', 'يجب أن يكون البسط مضاعفًا لـ $b$.'), isSolved: (state) => state.index === 4 && rationalizeOf(state).denominator === 1 }
]

/* ---------- 6. The conjugate: k / (√a − √b) ---------- */

export const CONJUGATE_LIMITS = { radicand: { min: 1, max: 12 }, numerator: { min: 1, max: 12 } } as const

export interface ConjugateState {
    numerator: number
    a: number
    b: number
}

export const initialConjugateState: ConjugateState = { numerator: 2, a: 5, b: 1 }

export const setConjugate = (state: ConjugateState, patch: Partial<ConjugateState>): ConjugateState => ({
    numerator: clamp(patch.numerator ?? state.numerator, CONJUGATE_LIMITS.numerator.min, CONJUGATE_LIMITS.numerator.max),
    a: clamp(patch.a ?? state.a, CONJUGATE_LIMITS.radicand.min, CONJUGATE_LIMITS.radicand.max),
    b: clamp(patch.b ?? state.b, CONJUGATE_LIMITS.radicand.min, CONJUGATE_LIMITS.radicand.max)
})

/** k(√a + √b) / (a − b): the denominator and the simplified coefficient k / (a − b) (null when a = b) */
export function conjugateOf({ numerator, a, b }: ConjugateState) {
    const denominator = a - b
    return { denominator, coefficient: denominator === 0 ? null : fraction(numerator, denominator) }
}

export const conjugateChallenges: LabChallenge<ConjugateState>[] = [
    { id: 61601, prompt: say('Egin izendatzailea 1: $\\sqrt{3}-\\sqrt{2}$ motakoa.', 'Haz que el denominador sea 1: del tipo $\\sqrt{3}-\\sqrt{2}$.', 'اجعل المقام 1: من نوع $\\sqrt{3}-\\sqrt{2}$.'), hint: say('$a-b=1$.', '$a-b=1$.', '$a-b=1$.'), isSolved: (state) => conjugateOf(state).denominator === 1 },
    { id: 61602, prompt: say('Arrazionalizatu $\\frac{4}{\\sqrt{5}-1}$: emaitza $\\sqrt{5}+1$ da.', 'Racionaliza $\\frac{4}{\\sqrt{5}-1}$: el resultado es $\\sqrt{5}+1$.', 'أنطِق $\\frac{4}{\\sqrt{5}-1}$: النتيجة $\\sqrt{5}+1$.'), hint: say('$1=\\sqrt{1}$.', '$1=\\sqrt{1}$.', '$1=\\sqrt{1}$.'), isSolved: (state) => state.numerator === 4 && state.a === 5 && state.b === 1 },
    { id: 61603, prompt: say('Lortu izendatzaile negatiboa eta koefizientea $-1$.', 'Consigue un denominador negativo y coeficiente $-1$.', 'احصل على مقام سالب ومعامل $-1$.'), hint: say('$a<b$ eta zenbakitzailea $b-a$.', '$a<b$ y el numerador, $b-a$.', '$a<b$ والبسط $b-a$.'), isSolved: (state) => equals(conjugateOf(state).coefficient, -1) }
]

/* ---------- 7. The ladder of logarithms ---------- */

export const LADDER_BASES: FractionValue[] = [fraction(2), fraction(3), fraction(5), fraction(10), fraction(1, 2)]
export const LADDER_LIMITS = { min: -4, max: 6 } as const

export interface LadderState {
    base: number
    exponent: number
}

export const initialLadderState: LadderState = { base: 0, exponent: 0 }

export const setLadder = (state: LadderState, patch: Partial<LadderState>): LadderState => ({
    base: clamp(patch.base ?? state.base, 0, LADDER_BASES.length - 1),
    exponent: clamp(patch.exponent ?? state.exponent, LADDER_LIMITS.min, LADDER_LIMITS.max)
})

/** a^x exactly */
export function ladderValue({ base, exponent }: LadderState): FractionValue {
    const a = LADDER_BASES[base]
    const [top, bottom] = exponent >= 0 ? [a.numerator ** exponent, a.denominator ** exponent] : [a.denominator ** -exponent, a.numerator ** -exponent]
    return fraction(top, bottom)
}

/** The logarithm read back from the value: always the exponent */
export const ladderLog = (state: LadderState) => exactLog(LADDER_BASES[state.base], ladderValue(state))

export const ladderChallenges: LabChallenge<LadderState>[] = [
    { id: 61701, prompt: say('Aurkitu $\\log_2 32$.', 'Encuentra $\\log_2 32$.', 'جد $\\log_2 32$.'), hint: say('Igo 2ren eskaileran 32 agertu arte.', 'Sube por la escalera del 2 hasta que aparezca 32.', 'اصعد سلّم 2 حتى يظهر 32.'), isSolved: (state) => state.base === 0 && equals(ladderValue(state), 32) },
    { id: 61702, prompt: say('Aurkitu $\\log_5 0{,}04$.', 'Encuentra $\\log_5 0{,}04$.', 'جد $\\log_5 0{,}04$.'), hint: say('$0{,}04=\\frac{1}{25}$: jaitsi 1etik behera.', '$0{,}04=\\frac{1}{25}$: baja por debajo de 1.', '$0{,}04=\\frac{1}{25}$: انزل تحت 1.'), isSolved: (state) => state.base === 2 && equals(ladderValue(state), 1, 25) },
    { id: 61703, prompt: say('Aurkitu $\\log_{1/2} 8$.', 'Encuentra $\\log_{1/2} 8$.', 'جد $\\log_{1/2} 8$.'), hint: say('$\\frac{1}{2}$ oinarriarekin, balioak handitzen dira jaistean.', 'Con base $\\frac{1}{2}$, los valores crecen al bajar.', 'بالأساس $\\frac{1}{2}$ تكبر القيم عند النزول.'), isSolved: (state) => state.base === 4 && equals(ladderValue(state), 8) },
    { id: 61704, prompt: say('Aurkitu $\\log 0{,}001$.', 'Encuentra $\\log 0{,}001$.', 'جد $\\log 0{,}001$.'), hint: say('Logaritmo hamartarra: 10 oinarria.', 'Logaritmo decimal: base 10.', 'اللوغاريتم العشري: الأساس 10.'), isSolved: (state) => state.base === 3 && equals(ladderValue(state), 1, 1000) }
]

/* ---------- 8. Change of base ---------- */

export const CHANGE_BASES = [2, 3, 5, 10] as const
export const CHANGE_VALUE_LIMITS = { min: 2, max: 100 } as const

export interface ChangeState {
    base: number
    value: number
}

export const initialChangeState: ChangeState = { base: 0, value: 20 }

export const setChange = (state: ChangeState, patch: Partial<ChangeState>): ChangeState => ({
    base: clamp(patch.base ?? state.base, 0, CHANGE_BASES.length - 1),
    value: clamp(patch.value ?? state.value, CHANGE_VALUE_LIMITS.min, CHANGE_VALUE_LIMITS.max)
})

/** log b / log a */
export const changeLog = ({ base, value }: ChangeState) => Math.log10(value) / Math.log10(CHANGE_BASES[base])

/** The two consecutive whole exponents around the logarithm */
export const changeBracket = (state: ChangeState) => { const low = Math.floor(changeLog(state) + 1e-9); return [low, low + 1] as const }

export const changeChallenges: LabChallenge<ChangeState>[] = [
    { id: 61801, prompt: say('Kalkulatu $\\log_5 20$.', 'Calcula $\\log_5 20$.', 'احسب $\\log_5 20$.'), hint: say('Oinarria 5 eta zenbakia 20.', 'Base 5 y número 20.', 'الأساس 5 والعدد 20.'), isSolved: (state) => CHANGE_BASES[state.base] === 5 && state.value === 20 },
    { id: 61802, prompt: say('Lortu 2 oinarriko logaritmo bat, 5 eta 6 artean.', 'Consigue un logaritmo en base 2 entre 5 y 6.', 'احصل على لوغاريتم بالأساس 2 بين 5 و6.'), hint: say('$2^{5}=32$ eta $2^{6}=64$.', '$2^{5}=32$ y $2^{6}=64$.', '$2^{5}=32$ و$2^{6}=64$.'), isSolved: (state) => CHANGE_BASES[state.base] === 2 && changeLog(state) > 5 && changeLog(state) < 6 },
    { id: 61803, prompt: say('Lortu 3 oinarriko logaritmo zehatz bat, 3 baino handiagoa.', 'Consigue un logaritmo exacto en base 3 mayor que 3.', 'احصل على لوغاريتم دقيق بالأساس 3 أكبر من 3.'), hint: say('3ren berretura bat: $3^{4}=81$.', 'Una potencia de 3: $3^{4}=81$.', 'قوة للعدد 3: $3^{4}=81$.'), isSolved: (state) => CHANGE_BASES[state.base] === 3 && Math.abs(changeLog(state) - Math.round(changeLog(state))) < 1e-9 && changeLog(state) > 3 }
]

export const powersLabChallengeIds: number[] = [
    powersChallenges,
    rulesChallenges,
    scientificChallenges,
    fractionalChallenges,
    commonChallenges,
    extractChallenges,
    rationalizeChallenges,
    conjugateChallenges,
    ladderChallenges,
    changeChallenges
].flatMap((list) => list.map((challenge) => challenge.id))
