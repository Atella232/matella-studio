import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { areaChallenges, identityChallenges } from '../../dbh2-aljebra-v2/lab/labTools.ts'
import { rootsChallenges, ruffiniChallenges } from '../../dbh4-aplikatuak-polinomioak/lab/labTools.ts'
import type { PolynomialsFractionsStageId } from '../lessons.tsx'
import { add, binomialLatex, evaluate, fromRoots, power, scale, trim, type Poly } from '../polynomials.ts'

/* ==========================================================================
   Polinomioak eta zatiki aljebraikoak (4. DBH akademikoak) laboratory. The
   area of a product and the identities come from 2. DBH, and the Ruffini
   table and the root hunter from 4. DBH aplikatuak, all with their own
   challenges. The new tools: Tartaglia's triangle for (x + b)ⁿ, a remainder
   that depends on a parameter m, factorising ax² + bx + c with its
   discriminant, the m.c.d. and m.c.m. of two polynomials built from
   factors, a fraction built from factors that simplifies, the value of a
   fraction and where it does not exist, the sum of two fractions with
   their common denominator, and two taps that fill one tank. Pure state
   logic; the components live next to this file. Tests in
   tests/polinomioak-dbh4ak-lab.test.ts.
   ========================================================================== */

export type PolynomialsFractionsLabToolId = 'area' | 'identities' | 'binomial' | 'ruffini' | 'parameter' | 'roots' | 'quadratic' | 'gcd' | 'domain' | 'simplify' | 'common' | 'taps'

export interface PolynomialsFractionsLabTool extends LabToolInfo {
    id: PolynomialsFractionsLabToolId
    stage: PolynomialsFractionsStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const samePoly = (p: Poly, q: Poly) => trim(p).join() === trim(q).join()
const sameList = (p: Array<number | string>, q: Array<number | string>) => p.join() === q.join()

export const polynomialsFractionsLabTools: PolynomialsFractionsLabTool[] = [
    { id: 'area', stage: 'operations', lessonTopic: 'polynomials', title: say('Biderketaren azalera', 'El área del producto', 'مساحة الجداء'), observe: say('(x + a)(x + b) laukizuzenak lau zati ditu: x², ax, bx eta ab. Erdiko bi zatiek x-ren koefizientea osatzen dute.', 'El rectángulo (x + a)(x + b) tiene cuatro partes: x², ax, bx y ab. Las dos del medio forman el coeficiente de x.', 'للمستطيل (x + a)(x + b) أربعة أجزاء: x² وax وbx وab. والجزآن الأوسطان يكوّنان معامل x.') },
    { id: 'identities', stage: 'operations', lessonTopic: 'identities', title: say('Identitateak zenbakiekin', 'Identidades con números', 'المتطابقات بالأعداد'), observe: say('Aukeratu a eta b: identitatearen bi aldeek beti ematen dute gauza bera. a² + b² ez, ordea: 2ab falta zaio.', 'Elige a y b: los dos lados de la identidad siempre dan lo mismo. a² + b² no: le falta 2ab.', 'اختر a وb: طرفا المتطابقة يعطيان دائمًا الشيء نفسه. أما a² + b² فلا: ينقصه 2ab.') },
    { id: 'binomial', stage: 'operations', lessonTopic: 'binomial', title: say('Tartagliaren triangelua', 'El triángulo de Tartaglia', 'مثلث تارتاليا'), observe: say('Triangeluaren errenkadak koefizienteak ematen ditu, eta b-ren berreturek biderkatzen dituzte. b negatiboa bada, zeinuak txandakatzen dira. Koefizienteen batura (1 + b)ⁿ da.', 'La fila del triángulo da los coeficientes, y las potencias de b los multiplican. Si b es negativo, los signos se alternan. Los coeficientes suman (1 + b)ⁿ.', 'يعطي صف المثلث المعاملات، وتضربها قوى b. وإذا كان b سالبًا تتناوب الإشارات. ومجموع المعاملات (1 + b)ⁿ.') },
    { id: 'ruffini', stage: 'division', lessonTopic: 'ruffini', title: say('Ruffiniren taula', 'La tabla de Ruffini', 'جدول روفيني'), observe: say('Urrats bakoitza berdina da: bider a eta batu. Azken zenbakia hondarra da, eta P(a) ere bai.', 'Cada paso es igual: por a y suma. El último número es el resto, y también P(a).', 'كل خطوة متماثلة: في a ثم اجمع. والعدد الأخير هو الباقي وهو أيضًا P(a).') },
    { id: 'parameter', stage: 'division', lessonTopic: 'remainder', title: say('Parametroa duen hondarra', 'El resto con parámetro', 'الباقي بوسيط'), observe: say('m aldatzean hondarra aldatzen da, beti kantitate berean: hondarra m-ren lehen mailako adierazpena da. Hondarra 0 bada, x − a faktorea da.', 'Al cambiar m, el resto cambia siempre en la misma cantidad: el resto es una expresión de primer grado en m. Si el resto es 0, x − a es un factor.', 'عند تغيير m يتغيّر الباقي دائمًا بالمقدار نفسه: الباقي عبارة من الدرجة الأولى في m. وإذا كان الباقي 0 فإن x − a عامل.') },
    { id: 'roots', stage: 'factor', lessonTopic: 'roots', title: say('Erroen bila', 'A la caza de raíces', 'البحث عن الجذور'), observe: say('Erro osoak gai askearen zatitzaileen artean daude. Erro bakoitzak faktore bat ematen du, eta zatidurarekin jarraitzen da.', 'Las raíces enteras están entre los divisores del término independiente. Cada raíz da un factor, y se sigue con el cociente.', 'الجذور الصحيحة بين قواسم الحد الثابت. وكل جذر يعطي عاملًا، ونتابع مع خارج القسمة.') },
    { id: 'quadratic', stage: 'factor', lessonTopic: 'factorize', title: say('ax² + bx + c faktorizatzea', 'Factorizar ax² + bx + c', 'تحليل ax² + bx + c'), observe: say('Diskriminatzaileak erabakitzen du: negatiboa bada, polinomioa irreduziblea da; 0 bada, erro bikoitza; karratu perfektua bada, erro arrazionalak eta faktore osoak.', 'El discriminante decide: si es negativo, el polinomio es irreducible; si es 0, raíz doble; si es un cuadrado perfecto, raíces racionales y factores enteros.', 'المميّز هو الذي يقرّر: إذا كان سالبًا فالحدودية غير قابلة للتحليل؛ وإذا كان 0 فجذر مضاعف؛ وإذا كان مربعًا تامًا فجذور كسرية وعوامل صحيحة.') },
    { id: 'gcd', stage: 'factor', lessonTopic: 'gcd-lcm', title: say('Z.k.h. eta m.k.t.', 'M.c.d. y m.c.m.', 'القاسم والمضاعف المشترك'), observe: say('Faktorizatuta, z.k.h.-ak faktore bakoitzaren berretzaile txikiena hartzen du eta m.k.t.-ak handiena. P-k Q zatitzen du bere berretzaile guztiak txikiagoak edo berdinak badira.', 'Factorizados, el m.c.d. toma el menor exponente de cada factor y el m.c.m. el mayor. P divide a Q si todos sus exponentes son menores o iguales.', 'بعد التحليل يأخذ القاسم أصغر أس لكل عامل ويأخذ المضاعف أكبره. وتقسم P الحدوديةَ Q إذا كانت كل أسسها أصغر أو مساوية.') },
    { id: 'domain', stage: 'fractions', lessonTopic: 'algebraic-fractions', title: say('Zatikiaren balioa', 'El valor de la fracción', 'قيمة الكسر'), observe: say('Izendatzailea 0 egiten duten balioetan zatikia ez dago. Zenbakitzailea 0 bada (eta izendatzailea ez), zatikiak 0 balio du.', 'En los valores que anulan el denominador la fracción no existe. Si se anula el numerador (y no el denominador), vale 0.', 'عند القيم التي تعدم المقام لا يكون الكسر معرّفًا. وإذا انعدم البسط (دون المقام) فقيمته 0.') },
    { id: 'simplify', stage: 'fractions', lessonTopic: 'simplify', title: say('Faktoreak ezabatzen', 'Eliminar factores', 'حذف العوامل'), observe: say('Garatuta ez da ezer ikusten; faktorizatuta, faktore komunak goian eta behean daude. Zatikia sinplifikatzea bietan z.k.h.-az zatitzea da.', 'Desarrollada no se ve nada; factorizada, los factores comunes están arriba y abajo. Simplificar es dividir los dos entre su m.c.d.', 'بعد النشر لا يظهر شيء؛ وبعد التحليل تظهر العوامل المشتركة في البسط والمقام. والتبسيط هو قسمتهما على قاسمهما المشترك الأكبر.') },
    { id: 'common', stage: 'operate', lessonTopic: 'add-fractions', title: say('Izendatzaile komuna', 'El denominador común', 'المقام المشترك'), observe: say('Izendatzaile komuna m.k.t.-a da, ez beti biderkadura. Zenbakitzaile bakoitza izendatzaileari falta zaionaz biderkatzen da.', 'El denominador común es el m.c.m., no siempre el producto. Cada numerador se multiplica por lo que le falta a su denominador.', 'المقام المشترك هو المضاعف المشترك الأصغر، لا الجداء دائمًا. ويُضرب كل بسط فيما ينقص مقامه.') },
    { id: 'taps', stage: 'operate', lessonTopic: 'combined', title: say('Bi txorrota', 'Dos grifos', 'صنبوران'), observe: say('Minutu batean, txorrota bakoitzak 1/a eta 1/b betetzen ditu. Batera (a + b)/(a · b), beraz a · b/(a + b) minutu behar dituzte: bakoitzak bakarrik baino gutxiago.', 'En un minuto, cada grifo llena 1/a y 1/b. Juntos, (a + b)/(a · b), así que tardan a · b/(a + b) minutos: menos que cada uno solo.', 'في دقيقة يملأ كل صنبور 1/a و1/b. ومعًا (a + b)/(a · b)، فيحتاجان a · b/(a + b) دقيقة: أقل من كل واحد وحده.') }
]

export const polynomialsFractionsLabToolForTopic: Record<string, PolynomialsFractionsLabToolId | undefined> = {
    polynomials: 'area',
    identities: 'identities',
    binomial: 'binomial',
    'long-division': 'ruffini',
    ruffini: 'ruffini',
    remainder: 'parameter',
    roots: 'roots',
    factorize: 'quadratic',
    'gcd-lcm': 'gcd',
    'algebraic-fractions': 'domain',
    simplify: 'simplify',
    equivalent: 'simplify',
    'add-fractions': 'common',
    'multiply-fractions': 'simplify',
    combined: 'taps'
}

/* ---------- Factors: polynomials built as x^a (x − 1)^b (x + 1)^c (x + 2)^d ---------- */

/** The roots of the four factors x, x − 1, x + 1, x + 2 */
export const FACTOR_ROOTS = [0, 1, -1, -2]
export const FACTOR_LIMIT = 2
export type Exponents = number[]

export const expandFactors = (exponents: Exponents): Poly => fromRoots(exponents.flatMap((count, index) => Array<number>(count).fill(FACTOR_ROOTS[index])))
export const factorsDegree = (exponents: Exponents) => exponents.reduce((sum, count) => sum + count, 0)

/** x^{2}(x-1)(x+2); a lone factor goes without brackets; no factors is 1 */
export function factorsLatex(exponents: Exponents): string {
    const used = exponents.map((count, index) => ({ count, index })).filter((item) => item.count > 0)
    if (!used.length) return '1'
    if (used.length === 1 && used[0].count === 1) return binomialLatex(FACTOR_ROOTS[used[0].index])
    return used.map(({ count, index }) => {
        const base = FACTOR_ROOTS[index] === 0 ? 'x' : `(${binomialLatex(FACTOR_ROOTS[index])})`
        return count > 1 ? `${base}^{${count}}` : base
    }).join('')
}

export const gcdOf = (p: Exponents, q: Exponents) => p.map((count, index) => Math.min(count, q[index]))
export const lcmOf = (p: Exponents, q: Exponents) => p.map((count, index) => Math.max(count, q[index]))
export const divides = (p: Exponents, q: Exponents) => p.every((count, index) => count <= q[index])

const setExponent = (exponents: Exponents, index: number, value: number) => exponents.map((count, position) => (position === index ? clamp(value, 0, FACTOR_LIMIT) : count))

/* ---------- 1. Tartaglia's triangle: (x + b)ⁿ ---------- */

export const BINOMIAL_LIMITS = { n: { min: 1, max: 7 }, b: { min: -3, max: 3 } } as const

export interface BinomialState {
    n: number
    b: number
}

export const initialBinomialState: BinomialState = { n: 2, b: 1 }

export function setBinomial(state: BinomialState, patch: Partial<BinomialState>): BinomialState {
    const n = clamp(patch.n ?? state.n, BINOMIAL_LIMITS.n.min, BINOMIAL_LIMITS.n.max)
    let b = clamp(patch.b ?? state.b, BINOMIAL_LIMITS.b.min, BINOMIAL_LIMITS.b.max)
    // b = 0 would leave xⁿ alone: jump over it
    if (b === 0) b = (patch.b ?? state.b) < state.b ? -1 : 1
    return { n, b }
}

export const binomialExpansion = (state: BinomialState): Poly => power([1, state.b], state.n)
/** The coefficient of x^k */
export const binomialCoefficient = (state: BinomialState, k: number) => (k < 0 || k > state.n ? 0 : binomialExpansion(state)[state.n - k])
export const binomialSum = (state: BinomialState) => binomialExpansion(state).reduce((sum, c) => sum + c, 0)

export const binomialChallenges: LabChallenge<BinomialState>[] = [
    { id: 63101, prompt: say('Garatu $(x-2)^{4}$.', 'Desarrolla $(x-2)^{4}$.', 'انشر $(x-2)^{4}$.'), hint: say('$n=4$ eta $b=-2$.', '$n=4$ y $b=-2$.', '$n=4$ و$b=-2$.'), isSolved: (state) => state.n === 4 && state.b === -2 },
    { id: 63102, prompt: say('Lortu garapen bat, non $x^{2}$-ren koefizientea 24 den.', 'Consigue un desarrollo en el que el coeficiente de $x^{2}$ sea 24.', 'احصل على نشر يكون فيه معامل $x^{2}$ هو 24.'), hint: say('4. errenkadan, $x^{2}$-ren aurrean 6 dago: $6\\cdot b^{2}=24$.', 'En la fila 4, delante de $x^{2}$ hay un 6: $6\\cdot b^{2}=24$.', 'في الصف 4 أمام $x^{2}$ العدد 6: $6\\cdot b^{2}=24$.'), isSolved: (state) => binomialCoefficient(state, 2) === 24 },
    { id: 63103, prompt: say('Egin koefizienteen batura 0 izatea.', 'Haz que los coeficientes sumen 0.', 'اجعل مجموع المعاملات 0.'), hint: say('Batura $(1+b)^{n}$ da.', 'La suma es $(1+b)^{n}$.', 'المجموع هو $(1+b)^{n}$.'), isSolved: (state) => binomialSum(state) === 0 },
    { id: 63104, prompt: say('Lortu koefizienteen batura 64 izatea.', 'Consigue que los coeficientes sumen 64.', 'اجعل مجموع المعاملات 64.'), hint: say('$64=2^{6}=4^{3}$.', '$64=2^{6}=4^{3}$.', '$64=2^{6}=4^{3}$.'), isSolved: (state) => binomialSum(state) === 64 }
]

/* ---------- 2. A remainder with a parameter m ---------- */

/** Families of polynomials whose coefficients depend on m */
export const parameterFamilies: Array<{ coefficients: (m: number) => Poly; latex: string }> = [
    { coefficients: (m) => [7, 0, -5 * m, -2], latex: '7x^{3}-5mx-2' },
    { coefficients: (m) => [1, -m, 5, -2], latex: 'x^{3}-mx^{2}+5x-2' },
    { coefficients: (m) => [2, 7, m, -3], latex: '2x^{3}+7x^{2}+mx-3' }
]

export const PARAMETER_LIMITS = { m: { min: -6, max: 6 }, a: { min: -4, max: 4 } } as const

export interface ParameterState {
    family: number
    m: number
    a: number
}

export const initialParameterState: ParameterState = { family: 0, m: 0, a: 1 }

export function setParameter(state: ParameterState, patch: Partial<ParameterState>): ParameterState {
    return {
        family: clamp(patch.family ?? state.family, 0, parameterFamilies.length - 1),
        m: clamp(patch.m ?? state.m, PARAMETER_LIMITS.m.min, PARAMETER_LIMITS.m.max),
        a: clamp(patch.a ?? state.a, PARAMETER_LIMITS.a.min, PARAMETER_LIMITS.a.max)
    }
}

export const parameterPolynomial = (state: ParameterState) => parameterFamilies[state.family].coefficients(state.m)
export const parameterRemainder = (state: ParameterState) => evaluate(parameterPolynomial(state), state.a)
/** The remainder as an expression in m: [slope, constant] */
export function remainderInM(state: Pick<ParameterState, 'family' | 'a'>): [number, number] {
    const at = (m: number) => evaluate(parameterFamilies[state.family].coefficients(m), state.a)
    return [at(1) - at(0), at(0)]
}

export const parameterChallenges: LabChallenge<ParameterState>[] = [
    { id: 63201, prompt: say('$7x^{3}-5mx-2$ eta $x+1$: aurkitu m, hondarra $-4$ izan dadin.', '$7x^{3}-5mx-2$ entre $x+1$: encuentra m para que el resto sea $-4$.', '$7x^{3}-5mx-2$ على $x+1$: جد m ليكون الباقي $-4$.'), hint: say('$a=-1$; hondarra $5m-9$ da.', '$a=-1$; el resto es $5m-9$.', '$a=-1$؛ الباقي $5m-9$.'), isSolved: (state) => state.family === 0 && state.a === -1 && parameterRemainder(state) === -4 },
    { id: 63202, prompt: say('Egin $x^{3}-mx^{2}+5x-2$ zatigarria $x-2$-z.', 'Haz que $x^{3}-mx^{2}+5x-2$ sea divisible entre $x-2$.', 'اجعل $x^{3}-mx^{2}+5x-2$ تقبل القسمة على $x-2$.'), hint: say('$a=2$ eta hondarra 0: $16-4m=0$.', '$a=2$ y resto 0: $16-4m=0$.', '$a=2$ والباقي 0: $16-4m=0$.'), isSolved: (state) => state.family === 1 && state.a === 2 && parameterRemainder(state) === 0 },
    { id: 63203, prompt: say('Egin $2x^{3}+7x^{2}+mx-3$ zatigarria $x+3$-z.', 'Haz que $2x^{3}+7x^{2}+mx-3$ sea divisible entre $x+3$.', 'اجعل $2x^{3}+7x^{2}+mx-3$ تقبل القسمة على $x+3$.'), hint: say('$a=-3$: $6-3m=0$.', '$a=-3$: $6-3m=0$.', '$a=-3$: $6-3m=0$.'), isSolved: (state) => state.family === 2 && state.a === -3 && parameterRemainder(state) === 0 },
    { id: 63204, prompt: say('$m=4$ denean, $x^{3}-mx^{2}+5x-2$ polinomioak beste erro bat ere badu. Aurkitu.', 'Con $m=4$, $x^{3}-mx^{2}+5x-2$ tiene otra raíz además de 2. Encuéntrala.', 'عندما $m=4$ يكون للحدودية $x^{3}-mx^{2}+5x-2$ جذر آخر غير 2. جده.'), hint: say('Probatu 2ren beste zatitzaileak: 1, $-1$, $-2$.', 'Prueba los otros divisores de 2: 1, $-1$, $-2$.', 'جرّب قواسم 2 الأخرى: 1 و$-1$ و$-2$.'), isSolved: (state) => state.family === 1 && state.m === 4 && state.a !== 2 && parameterRemainder(state) === 0 }
]

/* ---------- 3. Factorising ax² + bx + c ---------- */

export const QUADRATIC_LIMITS = { a: { min: 1, max: 6 }, b: { min: -9, max: 9 }, c: { min: -9, max: 9 } } as const

export interface QuadraticState {
    a: number
    b: number
    c: number
}

export const initialQuadraticState: QuadraticState = { a: 1, b: -5, c: 6 }

export function setQuadratic(state: QuadraticState, patch: Partial<QuadraticState>): QuadraticState {
    return {
        a: clamp(patch.a ?? state.a, QUADRATIC_LIMITS.a.min, QUADRATIC_LIMITS.a.max),
        b: clamp(patch.b ?? state.b, QUADRATIC_LIMITS.b.min, QUADRATIC_LIMITS.b.max),
        c: clamp(patch.c ?? state.c, QUADRATIC_LIMITS.c.min, QUADRATIC_LIMITS.c.max)
    }
}

export const discriminant = (state: QuadraticState) => state.b * state.b - 4 * state.a * state.c

export type QuadraticKind = 'irreducible' | 'irrational' | 'double' | 'rational'

export interface QuadraticFactors {
    kind: QuadraticKind
    /** Rational roots, smallest first (one for a double root) */
    roots: FractionValue[]
    /** The factorisation in LaTeX when the roots are rational */
    latex: string | null
}

/** qx − p for the root p/q */
const rootFactor = (root: FractionValue) => (root.denominator === 1 ? binomialLatex(root.numerator) : `${root.denominator}x${root.numerator < 0 ? '+' : '-'}${Math.abs(root.numerator)}`)

export function quadraticFactors(state: QuadraticState): QuadraticFactors {
    const delta = discriminant(state)
    if (delta < 0) return { kind: 'irreducible', roots: [], latex: null }
    const root = Math.round(Math.sqrt(delta))
    if (root * root !== delta) return { kind: 'irrational', roots: [], latex: null }
    const roots = [fraction(-state.b - root, 2 * state.a), fraction(-state.b + root, 2 * state.a)].sort((p, q) => p.numerator * q.denominator - q.numerator * p.denominator)
    // a(x − p₁/q₁)(x − p₂/q₂) = a/(q₁q₂) · (q₁x − p₁)(q₂x − p₂), and a/(q₁q₂) is a whole number
    const k = state.a / (roots[0].denominator * roots[1].denominator)
    const lead = k === 1 ? '' : String(k)
    if (delta === 0) return { kind: 'double', roots: [roots[0]], latex: roots[0].numerator === 0 ? `${lead}x^{2}` : `${lead}(${rootFactor(roots[0])})^{2}` }
    // x alone (root 0) goes without brackets and first
    const factors = roots.map((item) => (item.numerator === 0 ? 'x' : `(${rootFactor(item)})`)).sort((p, q) => (p === 'x' ? -1 : q === 'x' ? 1 : 0))
    return { kind: 'rational', roots, latex: `${lead}${factors.join('')}` }
}

export const quadraticChallenges: LabChallenge<QuadraticState>[] = [
    { id: 63301, prompt: say('Faktorizatu $3x^{2}+2x-8$.', 'Factoriza $3x^{2}+2x-8$.', 'حلّل $3x^{2}+2x-8$.'), hint: say('$a=3$, $b=2$, $c=-8$.', '$a=3$, $b=2$, $c=-8$.', '$a=3$، $b=2$، $c=-8$.'), isSolved: (state) => state.a === 3 && state.b === 2 && state.c === -8 },
    { id: 63302, prompt: say('Lortu erro bikoitza duen polinomio bat.', 'Consigue un polinomio con una raíz doble.', 'احصل على حدودية لها جذر مضاعف.'), hint: say('Diskriminatzailea 0: $b^{2}=4ac$.', 'Discriminante 0: $b^{2}=4ac$.', 'المميّز 0: $b^{2}=4ac$.'), isSolved: (state) => discriminant(state) === 0 },
    { id: 63303, prompt: say('Lortu polinomio irreduzible bat, erro errealik gabea.', 'Consigue un polinomio irreducible, sin raíces reales.', 'احصل على حدودية غير قابلة للتحليل، بلا جذور حقيقية.'), hint: say('Diskriminatzaile negatiboa.', 'Discriminante negativo.', 'مميّز سالب.'), isSolved: (state) => discriminant(state) < 0 },
    { id: 63304, prompt: say('Lortu $\\frac{1}{2}$ eta $-3$ erroak dituen polinomio bat.', 'Consigue un polinomio de raíces $\\frac{1}{2}$ y $-3$.', 'احصل على حدودية جذراها $\\frac{1}{2}$ و$-3$.'), hint: say('$(2x-1)(x+3)$ garatu.', 'Desarrolla $(2x-1)(x+3)$.', 'انشر $(2x-1)(x+3)$.'), isSolved: (state) => sameList(quadraticFactors(state).roots.map((root) => `${root.numerator}/${root.denominator}`), ['-3/1', '1/2']) }
]

/* ---------- 4. m.c.d. and m.c.m. ---------- */

export interface GcdState {
    p: Exponents
    q: Exponents
}

export const initialGcdState: GcdState = { p: [1, 1, 0, 0], q: [0, 1, 1, 0] }

export const setGcd = (state: GcdState, which: 'p' | 'q', index: number, value: number): GcdState => ({ ...state, [which]: setExponent(state[which], index, value) })

export const gcdChallenges: LabChallenge<GcdState>[] = [
    { id: 63401, prompt: say('Egin P-k Q zatitzea (P ez dela konstantea).', 'Haz que P divida a Q (sin que P sea constante).', 'اجعل P تقسم Q (دون أن تكون P ثابتة).'), hint: say('P-ren berretzaile guztiak Q-renak baino txikiagoak edo berdinak.', 'Todos los exponentes de P menores o iguales que los de Q.', 'كل أسس P أصغر من أسس Q أو مساوية لها.'), isSolved: (state) => factorsDegree(state.p) > 0 && divides(state.p, state.q) },
    { id: 63402, prompt: say('Lortu faktore komunik gabeko bi polinomio (z.k.h. = 1), biak 2. mailakoak edo handiagoak.', 'Consigue dos polinomios sin factores comunes (m.c.d. = 1), los dos de grado 2 o más.', 'احصل على حدوديتين بلا عوامل مشتركة (القاسم = 1)، كلتاهما من الدرجة 2 أو أكثر.'), hint: say('Faktore bakoitza bakarrean.', 'Cada factor en uno solo.', 'كل عامل في واحدة فقط.'), isSolved: (state) => factorsDegree(gcdOf(state.p, state.q)) === 0 && factorsDegree(state.p) >= 2 && factorsDegree(state.q) >= 2 },
    { id: 63403, prompt: say('Lortu z.k.h. $=x(x-1)$ eta m.k.t. $=x^{2}(x-1)(x+1)$.', 'Consigue m.c.d. $=x(x-1)$ y m.c.m. $=x^{2}(x-1)(x+1)$.', 'احصل على القاسم $=x(x-1)$ والمضاعف $=x^{2}(x-1)(x+1)$.'), hint: say('Biek x eta $x-1$; batek $x^{2}$, besteak $x+1$.', 'Los dos con x y $x-1$; uno con $x^{2}$ y el otro con $x+1$.', 'كلتاهما فيها x و$x-1$؛ وإحداهما $x^{2}$ والأخرى $x+1$.'), isSolved: (state) => sameList(gcdOf(state.p, state.q), [1, 1, 0, 0]) && sameList(lcmOf(state.p, state.q), [2, 1, 1, 0]) },
    { id: 63404, prompt: say('Lortu 5. mailako m.k.t. bat eta 2. mailako z.k.h. bat.', 'Consigue un m.c.m. de grado 5 y un m.c.d. de grado 2.', 'احصل على مضاعف من الدرجة 5 وقاسم من الدرجة 2.'), hint: say('Bi faktore komun, eta beste hiru batean edo bestean.', 'Dos factores comunes, y otros tres en uno u otro.', 'عاملان مشتركان وثلاثة أخرى في إحداهما.'), isSolved: (state) => factorsDegree(lcmOf(state.p, state.q)) === 5 && factorsDegree(gcdOf(state.p, state.q)) === 2 }
]

/* ---------- 5. Simplifying a fraction built from factors ---------- */

export interface SimplifyState {
    numerator: Exponents
    denominator: Exponents
}

export const initialSimplifyState: SimplifyState = { numerator: [1, 0, 0, 0], denominator: [0, 1, 0, 0] }

/** Numerator and denominator stay at degree 4 or less, so the expanded fraction fits the readout */
export const SIMPLIFY_DEGREE = 4

export function setSimplify(state: SimplifyState, which: 'numerator' | 'denominator', index: number, value: number): SimplifyState {
    const next = setExponent(state[which], index, value)
    return factorsDegree(next) > SIMPLIFY_DEGREE ? state : { ...state, [which]: next }
}

/** The fraction once every common factor is removed */
export function simplified(state: SimplifyState): SimplifyState {
    const common = gcdOf(state.numerator, state.denominator)
    return { numerator: state.numerator.map((count, index) => count - common[index]), denominator: state.denominator.map((count, index) => count - common[index]) }
}

export const simplifyChallenges: LabChallenge<SimplifyState>[] = [
    { id: 63501, prompt: say('Eraiki $\\frac{x^{2}-1}{x+1}$ eta begiratu zertan geratzen den.', 'Construye $\\frac{x^{2}-1}{x+1}$ y mira en qué queda.', 'ابنِ $\\frac{x^{2}-1}{x+1}$ وانظر إلامَ يؤول.'), hint: say('$x^{2}-1=(x-1)(x+1)$.', '$x^{2}-1=(x-1)(x+1)$.', '$x^{2}-1=(x-1)(x+1)$.'), isSolved: (state) => sameList(state.numerator, [0, 1, 1, 0]) && sameList(state.denominator, [0, 0, 1, 0]) },
    { id: 63502, prompt: say('Lortu x-raino sinplifikatzen den zatiki bat.', 'Consigue una fracción que se simplifique hasta x.', 'احصل على كسر يُبسَّط إلى x.'), hint: say('Zenbakitzaileak izendatzailearen faktore guztiak gehi x izan behar ditu.', 'El numerador debe tener todos los factores del denominador y una x más.', 'يجب أن يحوي البسط كل عوامل المقام وx إضافية.'), isSolved: (state) => factorsDegree(state.denominator) > 0 && sameList(simplified(state).numerator, [1, 0, 0, 0]) && factorsDegree(simplified(state).denominator) === 0 },
    { id: 63503, prompt: say('Eraiki zatiki irreduzible bat, zenbakitzailea eta izendatzailea 2. mailakoak.', 'Construye una fracción irreducible con numerador y denominador de grado 2.', 'ابنِ كسرًا غير قابل للتبسيط بسطه ومقامه من الدرجة 2.'), hint: say('Faktore komunik ez.', 'Ningún factor común.', 'لا عامل مشترك.'), isSolved: (state) => factorsDegree(state.numerator) === 2 && factorsDegree(state.denominator) === 2 && factorsDegree(gcdOf(state.numerator, state.denominator)) === 0 },
    { id: 63504, prompt: say('Lortu $\\frac{1}{x+2}$-raino sinplifikatzen den zatiki bat, izendatzailea 3. mailakoa izanik.', 'Consigue una fracción de denominador de grado 3 que se simplifique hasta $\\frac{1}{x+2}$.', 'احصل على كسر مقامه من الدرجة 3 يُبسَّط إلى $\\frac{1}{x+2}$.'), hint: say('Izendatzaileak $x+2$ eta zenbakitzailearen bi faktoreak.', 'El denominador lleva $x+2$ y los dos factores del numerador.', 'يحوي المقام $x+2$ وعاملي البسط.'), isSolved: (state) => factorsDegree(state.denominator) === 3 && factorsDegree(simplified(state).numerator) === 0 && sameList(simplified(state).denominator, [0, 0, 0, 1]) }
]

/* ---------- 6. The value of a fraction ---------- */

export const domainFractions: Array<{ numerator: Poly; denominator: Poly }> = [
    { numerator: [1, 1], denominator: [1, 0, -4] },
    { numerator: [1, 0, -1], denominator: [2, 1] },
    { numerator: [1, 0, 1], denominator: [1, -3] },
    { numerator: [1, -2], denominator: [1, -1, 0] }
]

export const DOMAIN_LIMIT = 5

export interface DomainState {
    fraction: number
    x: number
}

export const initialDomainState: DomainState = { fraction: 0, x: 0 }

export const setDomain = (state: DomainState, patch: Partial<DomainState>): DomainState => ({
    fraction: clamp(patch.fraction ?? state.fraction, 0, domainFractions.length - 1),
    x: clamp(patch.x ?? state.x, -DOMAIN_LIMIT, DOMAIN_LIMIT)
})

/** The value at x, or null where the denominator is 0 */
export function domainValue(state: DomainState): FractionValue | null {
    const { numerator, denominator } = domainFractions[state.fraction]
    const bottom = evaluate(denominator, state.x)
    return bottom === 0 ? null : fraction(evaluate(numerator, state.x), bottom)
}

/** The whole x in range where the fraction does not exist */
export const domainHoles = (index: number) => Array.from({ length: 2 * DOMAIN_LIMIT + 1 }, (_, k) => k - DOMAIN_LIMIT).filter((x) => evaluate(domainFractions[index].denominator, x) === 0)

const valueIs = (state: DomainState, numerator: number, denominator = 1) => {
    const value = domainValue(state)
    return value !== null && value.numerator * denominator === numerator * value.denominator
}

export const domainChallenges: LabChallenge<DomainState>[] = [
    { id: 63601, prompt: say('Aurkitu x bat non $\\frac{x+1}{x^{2}-4}$ ez dagoen.', 'Encuentra un x en el que $\\frac{x+1}{x^{2}-4}$ no exista.', 'جد x لا يكون عنده $\\frac{x+1}{x^{2}-4}$ معرّفًا.'), hint: say('$x^{2}-4=0$.', '$x^{2}-4=0$.', '$x^{2}-4=0$.'), isSolved: (state) => state.fraction === 0 && domainValue(state) === null },
    { id: 63602, prompt: say('Egin $\\frac{x+1}{x^{2}-4}$ zatikiak 0 balio dezala.', 'Haz que $\\frac{x+1}{x^{2}-4}$ valga 0.', 'اجعل $\\frac{x+1}{x^{2}-4}$ يساوي 0.'), hint: say('Zenbakitzailea 0.', 'Numerador igual a 0.', 'البسط يساوي 0.'), isSolved: (state) => state.fraction === 0 && valueIs(state, 0) },
    { id: 63603, prompt: say('Egin $\\frac{x^{2}+1}{x-3}$ zatikiak 13 balio dezala.', 'Haz que $\\frac{x^{2}+1}{x-3}$ valga 13.', 'اجعل $\\frac{x^{2}+1}{x-3}$ يساوي 13.'), hint: say('Probatu 3tik gorako balioak.', 'Prueba valores mayores que 3.', 'جرّب قيمًا أكبر من 3.'), isSolved: (state) => state.fraction === 2 && valueIs(state, 13) },
    { id: 63604, prompt: say('Egin $\\frac{x^{2}-1}{2x+1}$ zatikiak $-1$ balio dezala.', 'Haz que $\\frac{x^{2}-1}{2x+1}$ valga $-1$.', 'اجعل $\\frac{x^{2}-1}{2x+1}$ يساوي $-1$.'), hint: say('Zenbakitzailea eta izendatzailea aurkakoak.', 'Numerador y denominador opuestos.', 'البسط والمقام متعاكسان.'), isSolved: (state) => state.fraction === 1 && valueIs(state, -1) }
]

/* ---------- 7. Adding two fractions ---------- */

/** Denominators as factor exponents: x, x + 1, x − 1, x² − 1, x², x² + x */
export const commonDenominators: Exponents[] = [[1, 0, 0, 0], [0, 0, 1, 0], [0, 1, 0, 0], [0, 1, 1, 0], [2, 0, 0, 0], [1, 0, 1, 0]]
export const NUMERATOR_LIMIT = 3

export interface CommonState {
    first: number
    second: number
    k1: number
    k2: number
}

export const initialCommonState: CommonState = { first: 0, second: 0, k1: 1, k2: 1 }

export const setCommon = (state: CommonState, patch: Partial<CommonState>): CommonState => ({
    first: clamp(patch.first ?? state.first, 0, commonDenominators.length - 1),
    second: clamp(patch.second ?? state.second, 0, commonDenominators.length - 1),
    k1: clamp(patch.k1 ?? state.k1, -NUMERATOR_LIMIT, NUMERATOR_LIMIT),
    k2: clamp(patch.k2 ?? state.k2, -NUMERATOR_LIMIT, NUMERATOR_LIMIT)
})

/** k₁/A + k₂/B: the m.c.m., what each denominator lacks, and the numerator */
export function commonSum(state: CommonState) {
    const first = commonDenominators[state.first]
    const second = commonDenominators[state.second]
    const lcm = lcmOf(first, second)
    const missingFirst = lcm.map((count, index) => count - first[index])
    const missingSecond = lcm.map((count, index) => count - second[index])
    const numerator = add(scale(expandFactors(missingFirst), state.k1), scale(expandFactors(missingSecond), state.k2))
    return { lcm, missingFirst, missingSecond, numerator }
}

export const commonChallenges: LabChallenge<CommonState>[] = [
    { id: 63701, prompt: say('Kalkulatu $\\frac{2}{x}+\\frac{1}{x+1}$.', 'Calcula $\\frac{2}{x}+\\frac{1}{x+1}$.', 'احسب $\\frac{2}{x}+\\frac{1}{x+1}$.'), hint: say('Izendatzaileak x eta $x+1$; zenbakitzaileak 2 eta 1.', 'Denominadores x y $x+1$; numeradores 2 y 1.', 'المقامان x و$x+1$؛ والبسطان 2 و1.'), isSolved: (state) => samePoly(commonSum(state).numerator, [3, 2]) && sameList(commonSum(state).lcm, [1, 0, 1, 0]) },
    { id: 63702, prompt: say('Lortu $\\frac{2}{x^{2}-1}$ bi zatiki batuz edo kenduz.', 'Consigue $\\frac{2}{x^{2}-1}$ sumando o restando dos fracciones.', 'احصل على $\\frac{2}{x^{2}-1}$ بجمع كسرين أو طرحهما.'), hint: say('$\\frac{1}{x-1}-\\frac{1}{x+1}$', '$\\frac{1}{x-1}-\\frac{1}{x+1}$', '$\\frac{1}{x-1}-\\frac{1}{x+1}$'), isSolved: (state) => samePoly(commonSum(state).numerator, [2]) && sameList(commonSum(state).lcm, [0, 1, 1, 0]) },
    { id: 63703, prompt: say('Batu izendatzaile desberdineko bi zatiki, izendatzaile komuna haietako bat izanik.', 'Suma dos fracciones de denominadores distintos cuyo denominador común sea uno de ellos.', 'اجمع كسرين مختلفي المقام يكون مقامهما المشترك أحدهما.'), hint: say('Izendatzaile batek bestea zatitu behar du: $x-1$ eta $x^{2}-1$.', 'Un denominador debe dividir al otro: $x-1$ y $x^{2}-1$.', 'يجب أن يقسم أحد المقامين الآخر: $x-1$ و$x^{2}-1$.'), isSolved: (state) => state.first !== state.second && state.k1 !== 0 && state.k2 !== 0 && (sameList(commonSum(state).lcm, commonDenominators[state.first]) || sameList(commonSum(state).lcm, commonDenominators[state.second])) },
    { id: 63704, prompt: say('Lortu $\\frac{x-2}{x(x-1)}$.', 'Consigue $\\frac{x-2}{x(x-1)}$.', 'احصل على $\\frac{x-2}{x(x-1)}$.'), hint: say('Kenketa bat: $\\frac{2}{x}-\\frac{1}{x-1}$.', 'Una resta: $\\frac{2}{x}-\\frac{1}{x-1}$.', 'طرح: $\\frac{2}{x}-\\frac{1}{x-1}$.'), isSolved: (state) => samePoly(commonSum(state).numerator, [1, -2]) && sameList(commonSum(state).lcm, [1, 1, 0, 0]) }
]

/* ---------- 8. Two taps ---------- */

export const TAPS_LIMITS = { min: 1, max: 40 } as const

export interface TapsState {
    a: number
    b: number
}

export const initialTapsState: TapsState = { a: 10, b: 15 }

export const setTaps = (state: TapsState, patch: Partial<TapsState>): TapsState => ({
    a: clamp(patch.a ?? state.a, TAPS_LIMITS.min, TAPS_LIMITS.max),
    b: clamp(patch.b ?? state.b, TAPS_LIMITS.min, TAPS_LIMITS.max)
})

/** Minutes the two taps take together: a·b/(a + b) */
export const tapsTogether = (state: TapsState) => fraction(state.a * state.b, state.a + state.b)
const together = (state: TapsState, minutes: number) => tapsTogether(state).denominator === 1 && tapsTogether(state).numerator === minutes

export const tapsChallenges: LabChallenge<TapsState>[] = [
    { id: 63801, prompt: say('Egin biek batera txorrota bakarrak behar duenaren erdia behar izatea.', 'Haz que juntos tarden la mitad que uno solo.', 'اجعلهما معًا يحتاجان نصف ما يحتاجه صنبور واحد.'), hint: say('Bi txorrota berdinak.', 'Dos grifos iguales.', 'صنبوران متماثلان.'), isSolved: (state) => state.a === state.b },
    { id: 63802, prompt: say('Txorrota batek bestearen bikoitza behar du, eta batera 12 minutu. Aurkitu biak.', 'Un grifo tarda el doble que el otro y juntos tardan 12 minutos. Encuéntralos.', 'يحتاج صنبور ضعف الآخر ومعًا يحتاجان 12 دقيقة. جدهما.'), hint: say('$\\frac{1}{x}+\\frac{1}{2x}=\\frac{3}{2x}=\\frac{1}{12}$', '$\\frac{1}{x}+\\frac{1}{2x}=\\frac{3}{2x}=\\frac{1}{12}$', '$\\frac{1}{x}+\\frac{1}{2x}=\\frac{3}{2x}=\\frac{1}{12}$'), isSolved: (state) => (state.a === 2 * state.b || state.b === 2 * state.a) && together(state, 12) },
    { id: 63803, prompt: say('Txorrota batek besteak baino 3 minutu gutxiago behar ditu, eta batera 2 minutu.', 'Un grifo tarda 3 minutos menos que el otro y juntos tardan 2 minutos.', 'يحتاج صنبور 3 دقائق أقل من الآخر ومعًا يحتاجان دقيقتين.'), hint: say('$\\frac{1}{x}+\\frac{1}{x-3}$ probatu x txikiekin.', 'Prueba $\\frac{1}{x}+\\frac{1}{x-3}$ con x pequeños.', 'جرّب $\\frac{1}{x}+\\frac{1}{x-3}$ بقيم صغيرة لـ x.'), isSolved: (state) => Math.abs(state.a - state.b) === 3 && together(state, 2) },
    { id: 63804, prompt: say('Batera 4 minutu behar dituzte, eta batek 12. Zenbat besteak?', 'Juntos tardan 4 minutos y uno de ellos 12. ¿Cuánto el otro?', 'معًا يحتاجان 4 دقائق وأحدهما 12. كم الآخر؟'), hint: say('$\\frac{1}{4}-\\frac{1}{12}$', '$\\frac{1}{4}-\\frac{1}{12}$', '$\\frac{1}{4}-\\frac{1}{12}$'), isSolved: (state) => (state.a === 12 || state.b === 12) && together(state, 4) }
]

/* ---------- Progress ids: the borrowed tools' challenges, then the new ones ---------- */

export const polynomialsFractionsLabChallengeIds = [
    ...areaChallenges,
    ...identityChallenges,
    ...binomialChallenges,
    ...ruffiniChallenges,
    ...parameterChallenges,
    ...rootsChallenges,
    ...quadraticChallenges,
    ...gcdChallenges,
    ...domainChallenges,
    ...simplifyChallenges,
    ...commonChallenges,
    ...tapsChallenges
].map((challenge) => challenge.id)

