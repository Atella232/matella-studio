import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { TrigonometryStageId } from '../lessons.tsx'
import { say } from '../text.ts'

/* ==========================================================================
   Trigonometria (4. DBH akademikoak) laboratory. Ten tools, two per stage:
   the right triangle built from its two legs (the three ratios, the same
   ratios at every size), the notable angles 30°, 45° and 60° inside the
   half square and the half equilateral triangle, the sine as a fraction
   with the cosine it forces (sen² + cos² = 1), the calculator with degrees
   and minutes, solving a right triangle from two sides, the angle of
   elevation, the double observation, the area ½ · b · c · sen A with its
   altitude, the unit circle with the signs and the reduced angle, and the
   radian with the arc it cuts. Inside formulas \sen and \tg are written in
   each language's names (text.ts). Pure state logic; the components live
   next to this file. Tests in tests/trigonometria-dbh4ak-lab.test.ts.
   ========================================================================== */

export type TrigonometryLabToolId = 'ratios' | 'notable' | 'fundamental' | 'calculator' | 'two-sides' | 'elevation' | 'double' | 'area' | 'circle' | 'radian'

export interface TrigonometryLabTool extends LabToolInfo {
    id: TrigonometryLabToolId
    stage: TrigonometryStageId
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
/** Rounded to a multiple of step inside [min, max] */
const snap = (value: number, step: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value / step) * step))
const EPSILON = 1e-9
const near = (left: number, right: number, tolerance = EPSILON) => Math.abs(left - right) < tolerance

export const toRadians = (degrees: number) => (degrees * Math.PI) / 180
export const toDegrees = (radians: number) => (radians * 180) / Math.PI
const isWhole = (value: number) => near(value, Math.round(value))

/** A decimal with the comma and a real minus sign: 0,6000, −0,8660 */
export function decimalText(value: number, digits: number): string {
    const rounded = Number(value.toFixed(digits))
    const text = Math.abs(rounded).toFixed(digits).replace('.', ',')
    return rounded < 0 ? `−${text}` : text
}

/** An angle in degrees written to the minute: 36° 52′ */
export function minutesText(degrees: number): string {
    const total = Math.round(degrees * 60)
    return `${Math.floor(total / 60)}° ${total % 60}′`
}

export const trigonometryLabTools: TrigonometryLabTool[] = [
    { id: 'ratios', stage: 'ratios', lessonTopic: 'right-ratios', title: say('Katetoetatik arrazoietara', 'De los catetos a las razones', 'من الضلعين القائمين إلى النسب'), observe: say('Bi katetoak aukeratzean triangelua erabat zehazten da: Pitagorasek hipotenusa ematen du eta zatiketek hiru arrazoiak. Bi katetoak bider zenbaki bera egitean, triangelua handitzen da baina angelua eta arrazoiak ez dira aldatzen.', 'Al elegir los dos catetos, el triángulo queda determinado: Pitágoras da la hipotenusa y los cocientes, las tres razones. Si multiplicas los dos catetos por el mismo número, el triángulo crece pero el ángulo y las razones no cambian.', 'باختيار الضلعين القائمين يتحدد المثلث: فيثاغورس يعطي الوتر والقسمات تعطي النسب الثلاث. وإذا ضربت الضلعين في العدد نفسه كبر المثلث ولم تتغير الزاوية ولا النسب.') },
    { id: 'notable', stage: 'ratios', lessonTopic: 'notable-angles', title: say('30°, 45° eta 60°', '30°, 45° y 60°', '30° و45° و60°'), observe: say('45° karratu erdia da: bi katetoak berdinak. 30° eta 60° triangelu aldeberdin erdia dira: katetoetako bat hipotenusaren erdia da. Horregatik agertzen dira √2 eta √3.', '45° es medio cuadrado: los dos catetos son iguales. 30° y 60° son medio triángulo equilátero: uno de los catetos es la mitad de la hipotenusa. Por eso aparecen √2 y √3.', '45° نصف مربع: الضلعان القائمان متساويان. و30° و60° نصف مثلث متساوي الأضلاع: أحد الضلعين القائمين نصف الوتر. ولذلك يظهر √2 و√3.') },
    { id: 'fundamental', stage: 'identities', lessonTopic: 'fundamental', title: say('Sinutik besteetara', 'Del seno a las demás', 'من الجيب إلى البقية'), observe: say('Sinua ezaguna bada, kosinua sin² + cos² = 1 erlaziotik ateratzen da, eta tangentea sinua zati kosinua da. Puntua erradio bateko zirkunferentzian dago beti: bere koordenatuak kosinua eta sinua dira.', 'Si conoces el seno, el coseno sale de sen² + cos² = 1, y la tangente es el seno entre el coseno. El punto está siempre en la circunferencia de radio 1: sus coordenadas son el coseno y el seno.', 'إذا عرفت الجيب خرج جيب التمام من sin² + cos² = 1، والظل هو الجيب على جيب التمام. والنقطة دائمًا على دائرة نصف قطرها 1: إحداثياها جيب التمام والجيب.') },
    { id: 'calculator', stage: 'identities', lessonTopic: 'calculator', title: say('Kalkulagailua: graduak eta minutuak', 'La calculadora: grados y minutos', 'الآلة الحاسبة: الدرجات والدقائق'), observe: say('Minutu bat graduaren 1/60 da. Angelu txiki bat aldatzean, arrazoiak ere apur bat aldatzen dira: horregatik ematen ditu kalkulagailuak hainbeste hamartar. Arrazoi batetik angelura joateko, SHIFT.', 'Un minuto es 1/60 de grado. Al cambiar un poco el ángulo, las razones también cambian un poco: por eso la calculadora da tantos decimales. Para ir de la razón al ángulo, SHIFT.', 'الدقيقة 1/60 من الدرجة. وعند تغيير الزاوية قليلًا تتغير النسب قليلًا أيضًا: لذلك تعطي الآلة الحاسبة أرقامًا عشرية كثيرة. وللانتقال من النسبة إلى الزاوية: SHIFT.') },
    { id: 'two-sides', stage: 'solving', lessonTopic: 'two-sides', title: say('Bi alde ezagututa', 'Conociendo dos lados', 'بمعرفة ضلعين'), observe: say('Bi katetoekin, tangentea; kateto batekin eta hipotenusarekin, sinua. SHIFT-ek angelua ematen du, beste angelu zorrotza 90° ken hura da eta hirugarren aldea Pitagorasekin ateratzen da.', 'Con los dos catetos, la tangente; con un cateto y la hipotenusa, el seno. SHIFT da el ángulo, el otro ángulo agudo es 90° menos ese y el tercer lado sale con Pitágoras.', 'مع الضلعين القائمين: الظل؛ ومع ضلع قائم والوتر: الجيب. SHIFT يعطي الزاوية، والزاوية الحادة الأخرى 90° ناقصها، والضلع الثالث بفيثاغورس.') },
    { id: 'elevation', stage: 'solving', lessonTopic: 'elevation', title: say('Goratze-angelua', 'Ángulo de elevación', 'زاوية الارتفاع'), observe: say('Altuera distantzia bider goratze-angeluaren tangentea da. 45°-an altuera eta distantzia berdinak dira; angelua 90°-ra hurbiltzean, altuera oso azkar hazten da.', 'La altura es la distancia por la tangente del ángulo de elevación. A 45°, altura y distancia son iguales; cuando el ángulo se acerca a 90°, la altura crece muy deprisa.', 'الارتفاع يساوي المسافة في ظل زاوية الارتفاع. عند 45° يتساوى الارتفاع والمسافة؛ وعندما تقترب الزاوية من 90° يزداد الارتفاع بسرعة كبيرة.') },
    { id: 'double', stage: 'problems', lessonTopic: 'double-observation', title: say('Behaketa bikoitza', 'La doble observación', 'الرصد المزدوج'), observe: say('Oinera iritsi ezin bada, bi puntutatik neurtzen da. Bi triangelu angeluzuzenek altuera bera partekatzen dute: h = x · tg β eta h = (d + x) · tg α. Angeluak hurbiltzean, x eta h asko hazten dira.', 'Si no se puede llegar al pie, se mide desde dos puntos. Los dos triángulos rectángulos comparten la altura: h = x · tg β y h = (d + x) · tg α. Cuando los ángulos se acercan, x y h crecen mucho.', 'إذا تعذّر بلوغ القاعدة نقيس من نقطتين. يشترك المثلثان القائمان في الارتفاع: h = x · tan β وh = (d + x) · tan α. وعندما تتقارب الزاويتان يكبر x وh كثيرًا.') },
    { id: 'area', stage: 'problems', lessonTopic: 'trig-area', title: say('Azalera ½ · b · c · sin A', 'Área ½ · b · c · sen A', 'المساحة ½ · b · c · sin A'), observe: say('B-tik ateratako altuera c · sin A da, beraz azalera ½ · b · c · sin A. 90°-an azalera handiena da; A eta 180° − A angeluek azalera bera ematen dute, sinu bera baitute.', 'La altura que sale de B mide c · sen A, así que el área es ½ · b · c · sen A. A 90° el área es máxima; A y 180° − A dan la misma área porque tienen el mismo seno.', 'الارتفاع النازل من B يساوي c · sin A، فالمساحة ½ · b · c · sin A. وعند 90° تكون المساحة أكبر ما يمكن؛ وA و180° − A تعطيان المساحة نفسها لأن لهما الجيب نفسه.') },
    { id: 'circle', stage: 'circle', lessonTopic: 'unit-circle', title: say('Zirkunferentzia goniometrikoa', 'La circunferencia goniométrica', 'الدائرة المثلثية'), observe: say('Puntuaren abzisa kosinua da eta ordenatua sinua. Koadranteak zeinua ematen du, eta balio absolutua lehen koadranteko angelu batena da: 180° − α, 180° + α edo 360° − α.', 'La abscisa del punto es el coseno y la ordenada el seno. El cuadrante da el signo, y el valor absoluto es el de un ángulo del primer cuadrante: 180° − α, 180° + α o 360° − α.', 'إحداثي النقطة السيني هو جيب التمام والصادي هو الجيب. الربع يعطي الإشارة، والقيمة المطلقة هي قيمة زاوية من الربع الأول: 180° − α أو 180° + α أو 360° − α.') },
    { id: 'radian', stage: 'circle', lessonTopic: 'radians', title: say('Radiana eta arkua', 'El radián y el arco', 'الراديان والقوس'), observe: say('Radian bat erradioaren luzera bera duen arkuaren angelua da. Buelta osoa 2π rad da, eta arkuaren luzera erradioa bider angelua radianetan.', 'Un radián es el ángulo de un arco tan largo como el radio. La vuelta completa son 2π rad, y la longitud del arco es el radio por el ángulo en radianes.', 'الراديان زاوية قوس طوله يساوي نصف القطر. والدورة الكاملة 2π rad، وطول القوس يساوي نصف القطر في الزاوية بالراديان.') }
]

export const trigonometryLabToolForTopic: Record<string, TrigonometryLabToolId | undefined> = {
    'right-ratios': 'ratios',
    'ratio-properties': 'ratios',
    'notable-angles': 'notable',
    fundamental: 'fundamental',
    'one-ratio': 'fundamental',
    calculator: 'calculator',
    'two-sides': 'two-sides',
    'side-angle': 'elevation',
    elevation: 'elevation',
    'double-observation': 'double',
    oblique: 'area',
    'trig-area': 'area',
    'unit-circle': 'circle',
    reduction: 'circle',
    radians: 'radian'
}

/* ---------- 1. From the legs to the ratios ---------- */

export const LEG_MAX = 12

export interface RatiosState {
    opposite: number
    adjacent: number
}

export const initialRatiosState: RatiosState = { opposite: 2, adjacent: 3 }

export const setRatios = (state: RatiosState, patch: Partial<RatiosState>): RatiosState => ({
    opposite: clamp(patch.opposite ?? state.opposite, 1, LEG_MAX),
    adjacent: clamp(patch.adjacent ?? state.adjacent, 1, LEG_MAX)
})

export const hypotenuseSquare = ({ opposite, adjacent }: RatiosState) => opposite * opposite + adjacent * adjacent
export const hypotenuse = (state: RatiosState) => Math.sqrt(hypotenuseSquare(state))
export const ratiosAngle = ({ opposite, adjacent }: RatiosState) => toDegrees(Math.atan2(opposite, adjacent))
/** The tangent, always a fraction: opposite / adjacent */
export const ratiosTangent = ({ opposite, adjacent }: RatiosState): FractionValue => fraction(opposite, adjacent)
/** Sine and cosine as fractions when the hypotenuse is whole, otherwise null */
export function ratiosExact(state: RatiosState): { sin: FractionValue; cos: FractionValue } | null {
    const h = hypotenuse(state)
    if (!isWhole(h)) return null
    return { sin: fraction(state.opposite, Math.round(h)), cos: fraction(state.adjacent, Math.round(h)) }
}
const exactRatio = (value: FractionValue | undefined, numerator: number, denominator: number) => value !== undefined && value.numerator === numerator && value.denominator === denominator

export const ratiosChallenges: LabChallenge<RatiosState>[] = [
    { id: 71101, prompt: say('Egin tangenteak 1 balio izatea. Zenbat da α?', 'Haz que la tangente valga 1. ¿Cuánto mide α?', 'اجعل الظل يساوي 1. كم قياس α؟'), hint: say('$\\tg\\alpha=\\frac{\\text{aurkakoa}}{\\text{ondokoa}}$: bi katetoak berdinak.', '$\\tg\\alpha=\\frac{\\text{opuesto}}{\\text{contiguo}}$: los dos catetos iguales.', '$\\tg\\alpha=\\frac{\\text{opp}}{\\text{adj}}$: الضلعان القائمان متساويان.'), isSolved: (state) => state.opposite === state.adjacent },
    { id: 71102, prompt: say('Lortu $\\sen\\alpha=\\frac{3}{5}$ zehazki.', 'Consigue exactamente $\\sen\\alpha=\\frac{3}{5}$.', 'احصل بالضبط على $\\sen\\alpha=\\frac{3}{5}$.'), hint: say('3, 4 eta 5eko triangelua, edo haren antzeko bat.', 'El triángulo 3, 4, 5 o uno semejante.', 'المثلث 3 و4 و5 أو مثلث يشابهه.'), isSolved: (state) => exactRatio(ratiosExact(state)?.sin, 3, 5) },
    { id: 71103, prompt: say('Lortu $\\cos\\alpha=\\frac{12}{13}$.', 'Consigue $\\cos\\alpha=\\frac{12}{13}$.', 'احصل على $\\cos\\alpha=\\frac{12}{13}$.'), hint: say('$5^{2}+12^{2}=13^{2}$: zein da ondoko katetoa?', '$5^{2}+12^{2}=13^{2}$: ¿cuál es el cateto contiguo?', '$5^{2}+12^{2}=13^{2}$: ما الضلع المجاور؟'), isSolved: (state) => exactRatio(ratiosExact(state)?.cos, 12, 13) },
    { id: 71104, prompt: say('Eraiki 3, 4 eta 5eko triangeluaren angelu bera duen triangelu bat, hipotenusa 15 duena.', 'Construye un triángulo con el mismo ángulo que el 3, 4, 5 pero con hipotenusa 15.', 'ابنِ مثلثًا له زاوية المثلث 3 و4 و5 نفسها ووتره 15.'), hint: say('Bider 3: katetoak 9 eta 12.', 'Por 3: catetos 9 y 12.', 'في 3: الضلعان 9 و12.'), isSolved: (state) => state.opposite === 9 && state.adjacent === 12 }
]

/* ---------- 2. The notable angles 30°, 45° and 60° ---------- */

export const NOTABLE_ANGLES = [30, 45, 60] as const
export type NotableAngle = (typeof NOTABLE_ANGLES)[number]
export const NOTABLE_HYPOTENUSE_MAX = 12

export interface NotableState {
    angle: NotableAngle
    hypotenuse: number
}

export const initialNotableState: NotableState = { angle: 30, hypotenuse: 6 }

export const setNotable = (state: NotableState, patch: Partial<NotableState>): NotableState => ({
    angle: patch.angle ?? state.angle,
    hypotenuse: clamp(patch.hypotenuse ?? state.hypotenuse, 1, NOTABLE_HYPOTENUSE_MAX)
})

/** A leg as k · √root / 2 of the hypotenuse: root 1 is the half, 2 and 3 the roots */
export type HalfRoot = 1 | 2 | 3
const notableLegs: Record<NotableAngle, { opposite: HalfRoot; adjacent: HalfRoot }> = {
    30: { opposite: 1, adjacent: 3 },
    45: { opposite: 2, adjacent: 2 },
    60: { opposite: 3, adjacent: 1 }
}

export const notableLegRoots = (angle: NotableAngle) => notableLegs[angle]
/** The leg h · √root / 2 as a number */
export const halfRootValue = (h: number, root: HalfRoot) => (h * Math.sqrt(root)) / 2

/** The leg h · √root / 2 in LaTeX: 3, 3\sqrt{3}, \frac{5\sqrt{2}}{2} */
export function halfRootLatex(h: number, root: HalfRoot): string {
    const radical = root === 1 ? '' : `\\sqrt{${root}}`
    if (h % 2 === 0) {
        const k = h / 2
        return root === 1 ? String(k) : `${k === 1 ? '' : k}${radical}`
    }
    return `\\frac{${h === 1 && root !== 1 ? '' : h}${radical}}{2}`
}

export const notableChallenges: LabChallenge<NotableState>[] = [
    { id: 71201, prompt: say('Aukeratu sinua eta kosinua berdinak dituen angelua.', 'Elige el ángulo cuyo seno y coseno son iguales.', 'اختر الزاوية التي يتساوى جيبها وجيب تمامها.'), hint: say('Bi katetoak berdinak: karratu erdia.', 'Los dos catetos iguales: medio cuadrado.', 'الضلعان القائمان متساويان: نصف مربع.'), isSolved: (state) => state.angle === 45 },
    { id: 71202, prompt: say('Hipotenusa 8 izanik, egin ondoko katetoak 4 neurtzea.', 'Con hipotenusa 8, haz que el cateto contiguo mida 4.', 'مع وتر 8 اجعل الضلع المجاور 4.'), hint: say('$\\cos\\alpha=\\frac{1}{2}$: zein angelu?', '$\\cos\\alpha=\\frac{1}{2}$: ¿qué ángulo?', '$\\cos\\alpha=\\frac{1}{2}$: أي زاوية؟'), isSolved: (state) => state.hypotenuse === 8 && state.angle === 60 },
    { id: 71203, prompt: say('Egin aurkako katetoak zehazki 5 neurtzea.', 'Haz que el cateto opuesto mida exactamente 5.', 'اجعل الضلع المقابل 5 بالضبط.'), hint: say('$\\sen 30^{\\circ}=\\frac{1}{2}$: hipotenusa bikoitza.', '$\\sen 30^{\\circ}=\\frac{1}{2}$: la hipotenusa, el doble.', '$\\sen 30^{\\circ}=\\frac{1}{2}$: الوتر ضعفه.'), isSolved: (state) => state.angle === 30 && state.hypotenuse === 10 },
    { id: 71204, prompt: say('Egin bi katetoek $3\\sqrt{2}$ neurtzea.', 'Haz que los dos catetos midan $3\\sqrt{2}$.', 'اجعل كلا الضلعين القائمين $3\\sqrt{2}$.'), hint: say('45°: katetoa $\\frac{h\\sqrt{2}}{2}$ da.', '45°: el cateto es $\\frac{h\\sqrt{2}}{2}$.', '45°: الضلع القائم $\\frac{h\\sqrt{2}}{2}$.'), isSolved: (state) => state.angle === 45 && state.hypotenuse === 6 }
]

/* ---------- 3. From the sine to the cosine and the tangent ---------- */

export const SINE_DENOMINATOR_MAX = 13

export interface FundamentalState {
    p: number
    q: number
}

export const initialFundamentalState: FundamentalState = { p: 1, q: 3 }

/** The sine p/q stays between 0 and 1: 1 ≤ p < q */
export function setFundamental(state: FundamentalState, patch: Partial<FundamentalState>): FundamentalState {
    const q = clamp(patch.q ?? state.q, 2, SINE_DENOMINATOR_MAX)
    const p = clamp(patch.p ?? state.p, 1, q - 1)
    return { p, q }
}

/** q² − p²: the cosine is √(q² − p²) / q */
export const cosineRadicand = ({ p, q }: FundamentalState) => q * q - p * p
export const fundamentalValues = (state: FundamentalState) => {
    const sin = state.p / state.q
    const cos = Math.sqrt(cosineRadicand(state)) / state.q
    return { sin, cos, tan: sin / cos, angle: toDegrees(Math.asin(sin)) }
}
/** The cosine as a fraction when q² − p² is a perfect square, otherwise null */
export function fundamentalCosine(state: FundamentalState): FractionValue | null {
    const root = Math.sqrt(cosineRadicand(state))
    return isWhole(root) ? fraction(Math.round(root), state.q) : null
}

/** √n simplified: [k, m] with √n = k√m */
export function simplifyRoot(n: number): [number, number] {
    let outside = 1
    let inside = n
    for (let factor = 2; factor * factor <= inside; factor += 1) {
        while (inside % (factor * factor) === 0) {
            outside *= factor
            inside /= factor * factor
        }
    }
    return [outside, inside]
}

/** √n in LaTeX, simplified: 4, 2\sqrt{2}, \sqrt{7} */
export function rootLatex(n: number): string {
    const [outside, inside] = simplifyRoot(n)
    if (inside === 1) return String(outside)
    return `${outside === 1 ? '' : outside}\\sqrt{${inside}}`
}

export const fundamentalChallenges: LabChallenge<FundamentalState>[] = [
    { id: 71301, prompt: say('Aurkitu kosinua $\\frac{4}{5}$ duen sinu bat.', 'Encuentra un seno cuyo coseno sea $\\frac{4}{5}$.', 'جد جيبًا يكون جيب تمامه $\\frac{4}{5}$.'), hint: say('$\\sen^{2}\\alpha=1-\\frac{16}{25}$', '$\\sen^{2}\\alpha=1-\\frac{16}{25}$', '$\\sen^{2}\\alpha=1-\\frac{16}{25}$'), isSolved: (state) => { const cos = fundamentalCosine(state); return cos !== null && cos.numerator === 4 && cos.denominator === 5 } },
    { id: 71302, prompt: say('Lortu 30°-ko angelua.', 'Consigue un ángulo de 30°.', 'احصل على زاوية 30°.'), hint: say('$\\sen 30^{\\circ}=\\frac{1}{2}$', '$\\sen 30^{\\circ}=\\frac{1}{2}$', '$\\sen 30^{\\circ}=\\frac{1}{2}$'), isSolved: (state) => state.q === 2 * state.p },
    { id: 71303, prompt: say('Egin tangenteak $\\frac{12}{5}$ balio izatea.', 'Haz que la tangente valga $\\frac{12}{5}$.', 'اجعل الظل يساوي $\\frac{12}{5}$.'), hint: say('Katetoak 12 eta 5: hipotenusa 13.', 'Catetos 12 y 5: hipotenusa 13.', 'الضلعان 12 و5: الوتر 13.'), isSolved: (state) => near(fundamentalValues(state).tan, 12 / 5, 1e-9) },
    { id: 71304, prompt: say('$q=10$ izanik, lortu sinua kosinua baino handiagoa eta kosinu zehatza (erro gabe).', 'Con $q=10$, consigue un seno mayor que el coseno y un coseno exacto (sin raíz).', 'مع $q=10$ اجعل الجيب أكبر من جيب التمام وجيب التمام دقيقًا (بلا جذر).'), hint: say('$10^{2}-p^{2}$ karratu perfektua: $p=6$ edo $p=8$.', '$10^{2}-p^{2}$ cuadrado perfecto: $p=6$ o $p=8$.', '$10^{2}-p^{2}$ مربع كامل: $p=6$ أو $p=8$.'), isSolved: (state) => { const { sin, cos } = fundamentalValues(state); return state.q === 10 && sin > cos && fundamentalCosine(state) !== null } }
]

/* ---------- 4. The calculator, in degrees and minutes ---------- */

export interface CalculatorState {
    degrees: number
    minutes: number
}

export const initialCalculatorState: CalculatorState = { degrees: 20, minutes: 0 }

export const setCalculator = (state: CalculatorState, patch: Partial<CalculatorState>): CalculatorState => ({
    degrees: clamp(patch.degrees ?? state.degrees, 0, 89),
    minutes: clamp(patch.minutes ?? state.minutes, 0, 59)
})

export const calculatorDecimal = ({ degrees, minutes }: CalculatorState) => degrees + minutes / 60
export function calculatorValues(state: CalculatorState) {
    const angle = toRadians(calculatorDecimal(state))
    return { sin: Math.sin(angle), cos: Math.cos(angle), tan: Math.tan(angle) }
}
/** The value as the calculator screen shows it to some decimals */
export const roundedTo = (value: number, digits: number) => Number(value.toFixed(digits))

export const calculatorChallenges: LabChallenge<CalculatorState>[] = [
    { id: 71401, prompt: say('Idatzi $12{,}25^{\\circ}$ gradu eta minututan.', 'Escribe $12{,}25^{\\circ}$ en grados y minutos.', 'اكتب $12{,}25^{\\circ}$ بالدرجات والدقائق.'), hint: say('$0{,}25\\cdot 60=15$ minutu.', '$0{,}25\\cdot 60=15$ minutos.', '$0{,}25\\cdot 60=15$ دقيقة.'), isSolved: (state) => state.degrees === 12 && state.minutes === 15 },
    { id: 71402, prompt: say('Aurkitu tangentea 1 duen angelua.', 'Encuentra el ángulo cuya tangente es 1.', 'جد الزاوية التي ظلها 1.'), hint: say('Bi katetoak berdinak: angelu ospetsu bat.', 'Los dos catetos iguales: un ángulo notable.', 'الضلعان القائمان متساويان: زاوية شهيرة.'), isSolved: (state) => state.degrees === 45 && state.minutes === 0 },
    { id: 71403, prompt: say('Aurkitu, minutura arte, $\\sen\\alpha=0{,}600$ duen angelua (hiru hamartarrekin).', 'Encuentra, al minuto, el ángulo con $\\sen\\alpha=0{,}600$ (con tres decimales).', 'جد الزاوية مقرّبة إلى الدقيقة التي فيها $\\sen\\alpha=0{,}600$ (بثلاثة أرقام عشرية).'), hint: say('SHIFT sin 0,6 ≈ 36,87°: 0,87 · 60 ≈ 52′.', 'SHIFT sin 0,6 ≈ 36,87°: 0,87 · 60 ≈ 52′.', 'SHIFT sin 0.6 ≈ 36.87°: 0.87 · 60 ≈ 52′.'), isSolved: (state) => roundedTo(calculatorValues(state).sin, 3) === 0.6 },
    { id: 71404, prompt: say('Aurkitu, minutura arte, $\\cos\\alpha=0{,}250$ duen angelua (hiru hamartarrekin).', 'Encuentra, al minuto, el ángulo con $\\cos\\alpha=0{,}250$ (con tres decimales).', 'جد الزاوية مقرّبة إلى الدقيقة التي فيها $\\cos\\alpha=0{,}250$ (بثلاثة أرقام عشرية).'), hint: say('SHIFT cos 0,25 ≈ 75,52°.', 'SHIFT cos 0,25 ≈ 75,52°.', 'SHIFT cos 0.25 ≈ 75.52°.'), isSolved: (state) => roundedTo(calculatorValues(state).cos, 3) === 0.25 }
]

/* ---------- 5. Solving a right triangle from two sides ---------- */

export type TwoSidesMode = 'legs' | 'leg-hypotenuse'
export const TWO_SIDES_MAX = 15

export interface TwoSidesState {
    mode: TwoSidesMode
    /** The leg opposite α */
    a: number
    /** The leg next to α, or the hypotenuse */
    b: number
}

export const initialTwoSidesState: TwoSidesState = { mode: 'legs', a: 3, b: 4 }

/** With the hypotenuse, it stays longer than the leg */
export function setTwoSides(state: TwoSidesState, patch: Partial<TwoSidesState>): TwoSidesState {
    const mode = patch.mode ?? state.mode
    if (mode === 'legs') return { mode, a: clamp(patch.a ?? state.a, 1, TWO_SIDES_MAX), b: clamp(patch.b ?? state.b, 1, TWO_SIDES_MAX) }
    const a = clamp(patch.a ?? state.a, 1, TWO_SIDES_MAX - 1)
    return { mode, a, b: clamp(patch.b ?? state.b, a + 1, TWO_SIDES_MAX) }
}

/** α, β = 90° − α and the third side */
export function twoSidesSolution({ mode, a, b }: TwoSidesState): { alpha: number; beta: number; third: number; thirdSquare: number } {
    const alpha = mode === 'legs' ? toDegrees(Math.atan2(a, b)) : toDegrees(Math.asin(a / b))
    const thirdSquare = mode === 'legs' ? a * a + b * b : b * b - a * a
    return { alpha, beta: 90 - alpha, third: Math.sqrt(thirdSquare), thirdSquare }
}

export const twoSidesChallenges: LabChallenge<TwoSidesState>[] = [
    { id: 71501, prompt: say('Kateto batekin eta hipotenusarekin, lortu zehazki $\\alpha=30^{\\circ}$.', 'Con un cateto y la hipotenusa, consigue exactamente $\\alpha=30^{\\circ}$.', 'بضلع قائم والوتر احصل بالضبط على $\\alpha=30^{\\circ}$.'), hint: say('$\\sen\\alpha=\\frac{1}{2}$: hipotenusa katetoaren bikoitza.', '$\\sen\\alpha=\\frac{1}{2}$: la hipotenusa, el doble del cateto.', '$\\sen\\alpha=\\frac{1}{2}$: الوتر ضعف الضلع.'), isSolved: (state) => state.mode === 'leg-hypotenuse' && state.b === 2 * state.a },
    { id: 71502, prompt: say('Bi katetoekin, lortu $\\alpha=45^{\\circ}$.', 'Con los dos catetos, consigue $\\alpha=45^{\\circ}$.', 'بالضلعين القائمين احصل على $\\alpha=45^{\\circ}$.'), hint: say('$\\tg\\alpha=1$', '$\\tg\\alpha=1$', '$\\tg\\alpha=1$'), isSolved: (state) => state.mode === 'legs' && state.a === state.b },
    { id: 71503, prompt: say('Hipotenusa 13 izanik, lortu hirugarren alde oso bat.', 'Con hipotenusa 13, consigue un tercer lado entero.', 'مع وتر 13 احصل على ضلع ثالث صحيح.'), hint: say('$13^{2}-a^{2}$ karratu perfektua izan behar da.', '$13^{2}-a^{2}$ tiene que ser un cuadrado perfecto.', 'يجب أن يكون $13^{2}-a^{2}$ مربعًا كاملًا.'), isSolved: (state) => state.mode === 'leg-hypotenuse' && state.b === 13 && isWhole(twoSidesSolution(state).third) },
    { id: 71504, prompt: say('Bi katetoekin, lortu 60° eta 61° arteko $\\alpha$ angelua.', 'Con los dos catetos, consigue un ángulo $\\alpha$ entre 60° y 61°.', 'بالضلعين القائمين احصل على زاوية $\\alpha$ بين 60° و61°.'), hint: say('$\\tg 60^{\\circ}\\approx 1{,}73$: aurkakoa ondokoaren 1,75 aldiz.', '$\\tg 60^{\\circ}\\approx 1{,}73$: el opuesto, unas 1,75 veces el contiguo.', '$\\tg 60^{\\circ}\\approx 1{,}73$: المقابل نحو 1.75 مرة المجاور.'), isSolved: (state) => { const { alpha } = twoSidesSolution(state); return state.mode === 'legs' && alpha > 60 && alpha < 61 } }
]

/* ---------- 6. The angle of elevation ---------- */

export const ELEVATION_LIMITS = { distance: { min: 5, max: 60, step: 5 }, angle: { min: 5, max: 85, step: 5 } } as const

export interface ElevationState {
    distance: number
    angle: number
}

export const initialElevationState: ElevationState = { distance: 40, angle: 25 }

export const setElevation = (state: ElevationState, patch: Partial<ElevationState>): ElevationState => ({
    distance: snap(patch.distance ?? state.distance, ELEVATION_LIMITS.distance.step, ELEVATION_LIMITS.distance.min, ELEVATION_LIMITS.distance.max),
    angle: snap(patch.angle ?? state.angle, ELEVATION_LIMITS.angle.step, ELEVATION_LIMITS.angle.min, ELEVATION_LIMITS.angle.max)
})

/** The height d · tg α and the line of sight d / cos α */
export const elevationHeight = ({ distance, angle }: ElevationState) => distance * Math.tan(toRadians(angle))
export const elevationSight = ({ distance, angle }: ElevationState) => distance / Math.cos(toRadians(angle))

export const elevationChallenges: LabChallenge<ElevationState>[] = [
    { id: 71601, prompt: say('Egin dorreak distantziaren altuera bera izatea.', 'Haz que la torre mida lo mismo que la distancia.', 'اجعل ارتفاع البرج يساوي المسافة.'), hint: say('$\\tg\\alpha=1$', '$\\tg\\alpha=1$', '$\\tg\\alpha=1$'), isSolved: (state) => state.angle === 45 },
    { id: 71602, prompt: say('$\\alpha=30^{\\circ}$ izanik, lortu $17{,}32$ m inguruko altuera.', 'Con $\\alpha=30^{\\circ}$, consigue una altura de unos $17{,}32$ m.', 'مع $\\alpha=30^{\\circ}$ احصل على ارتفاع نحو $17{,}32$ م.'), hint: say('$d=\\frac{17{,}32}{\\tg 30^{\\circ}}$', '$d=\\frac{17{,}32}{\\tg 30^{\\circ}}$', '$d=\\frac{17{,}32}{\\tg 30^{\\circ}}$'), isSolved: (state) => state.angle === 30 && near(elevationHeight(state), 17.32, 0.005) },
    { id: 71603, prompt: say('20 m-tik, lortu 50 m baino altuago den dorrea, ahalik eta angelu txikienarekin.', 'Desde 20 m, consigue una torre de más de 50 m con el menor ángulo posible.', 'من 20 م احصل على برج أعلى من 50 م بأصغر زاوية ممكنة.'), hint: say('$\\tg\\alpha>\\frac{50}{20}=2{,}5$', '$\\tg\\alpha>\\frac{50}{20}=2{,}5$', '$\\tg\\alpha>\\frac{50}{20}=2{,}5$'), isSolved: (state) => state.distance === 20 && state.angle === 70 },
    { id: 71604, prompt: say('Egin bisualak distantziaren bikoitza neurtzea.', 'Haz que la visual mida el doble que la distancia.', 'اجعل خط النظر ضعف المسافة.'), hint: say('$\\cos\\alpha=\\frac{1}{2}$', '$\\cos\\alpha=\\frac{1}{2}$', '$\\cos\\alpha=\\frac{1}{2}$'), isSolved: (state) => state.angle === 60 }
]

/* ---------- 7. The double observation ---------- */

export const DOUBLE_LIMITS = { d: { min: 10, max: 60, step: 10 }, far: { min: 10, max: 80 }, near: { min: 15, max: 85 }, step: 5 } as const

export interface DoubleState {
    /** The distance between the two observation points */
    d: number
    /** The angle α from the far point */
    far: number
    /** The angle β from the near point, always larger */
    near: number
}

export const initialDoubleState: DoubleState = { d: 30, far: 20, near: 40 }

export function setDouble(state: DoubleState, patch: Partial<DoubleState>): DoubleState {
    const step = DOUBLE_LIMITS.step
    const d = snap(patch.d ?? state.d, DOUBLE_LIMITS.d.step, DOUBLE_LIMITS.d.min, DOUBLE_LIMITS.d.max)
    let far = snap(patch.far ?? state.far, step, DOUBLE_LIMITS.far.min, DOUBLE_LIMITS.far.max)
    let nearAngle = snap(patch.near ?? state.near, step, DOUBLE_LIMITS.near.min, DOUBLE_LIMITS.near.max)
    // The near angle is always the larger one: the one being moved pushes the other
    if (nearAngle <= far) {
        if (patch.far !== undefined) nearAngle = far + step
        else far = nearAngle - step
    }
    return { d, far, near: nearAngle }
}

/** x from the near point to the foot, and the height h */
export function doubleSolution({ d, far, near: nearAngle }: DoubleState): { x: number; h: number } {
    const tanFar = Math.tan(toRadians(far))
    const tanNear = Math.tan(toRadians(nearAngle))
    const x = (d * tanFar) / (tanNear - tanFar)
    return { x, h: x * tanNear }
}

export const doubleChallenges: LabChallenge<DoubleState>[] = [
    { id: 71701, prompt: say('30° eta 60°-rekin, lortu $17{,}32$ m inguruko altuera.', 'Con 30° y 60°, consigue una altura de unos $17{,}32$ m.', 'مع 30° و60° احصل على ارتفاع نحو $17{,}32$ م.'), hint: say('Angelu horiekin $h=d\\cdot\\frac{\\sqrt{3}}{2}$.', 'Con esos ángulos, $h=d\\cdot\\frac{\\sqrt{3}}{2}$.', 'بهاتين الزاويتين $h=d\\cdot\\frac{\\sqrt{3}}{2}$.'), isSolved: (state) => state.far === 30 && state.near === 60 && near(doubleSolution(state).h, 17.32, 0.005) },
    { id: 71702, prompt: say('Egin puntu hurbiletik oinerako distantzia dorrearen altuera bera izatea.', 'Haz que la distancia del punto cercano al pie sea igual a la altura de la torre.', 'اجعل المسافة من النقطة القريبة إلى القاعدة تساوي ارتفاع البرج.'), hint: say('$h=x\\cdot\\tg\\beta$: $\\tg\\beta=1$.', '$h=x\\cdot\\tg\\beta$: $\\tg\\beta=1$.', '$h=x\\cdot\\tg\\beta$: $\\tg\\beta=1$.'), isSolved: (state) => state.near === 45 },
    { id: 71703, prompt: say('30° eta 60°-rekin, lortu $x=25$ m.', 'Con 30° y 60°, consigue $x=25$ m.', 'مع 30° و60° احصل على $x=25$ م.'), hint: say('Angelu horiekin $x=\\frac{d}{2}$.', 'Con esos ángulos, $x=\\frac{d}{2}$.', 'بهاتين الزاويتين $x=\\frac{d}{2}$.'), isSolved: (state) => state.far === 30 && state.near === 60 && near(doubleSolution(state).x, 25, 1e-6) },
    { id: 71704, prompt: say('$d=20$ m izanik, lortu 100 m baino altuagoa den dorrea.', 'Con $d=20$ m, consigue una torre de más de 100 m.', 'مع $d=20$ م احصل على برج أعلى من 100 م.'), hint: say('Bi angelu handi eta elkarrengandik hurbil.', 'Dos ángulos grandes y muy próximos.', 'زاويتان كبيرتان ومتقاربتان.'), isSolved: (state) => state.d === 20 && doubleSolution(state).h > 100 }
]

/* ---------- 8. The area ½ · b · c · sen A ---------- */

export const AREA_LIMITS = { side: { min: 1, max: 12 }, angle: { min: 15, max: 165, step: 15 } } as const

export interface AreaState {
    b: number
    c: number
    angle: number
}

export const initialAreaState: AreaState = { b: 5, c: 7, angle: 60 }

export const setArea = (state: AreaState, patch: Partial<AreaState>): AreaState => ({
    b: clamp(patch.b ?? state.b, AREA_LIMITS.side.min, AREA_LIMITS.side.max),
    c: clamp(patch.c ?? state.c, AREA_LIMITS.side.min, AREA_LIMITS.side.max),
    angle: snap(patch.angle ?? state.angle, AREA_LIMITS.angle.step, AREA_LIMITS.angle.min, AREA_LIMITS.angle.max)
})

/** The altitude from C, c · sen A, and the area ½ · b · c · sen A */
export const areaAltitude = ({ c, angle }: AreaState) => c * Math.sin(toRadians(angle))
export const triangleArea = (state: AreaState) => (state.b * areaAltitude(state)) / 2

export const areaChallenges: LabChallenge<AreaState>[] = [
    { id: 71801, prompt: say('$b=6$ eta $c=8$ izanik, lortu azalera handiena.', 'Con $b=6$ y $c=8$, consigue el área máxima.', 'مع $b=6$ و$c=8$ احصل على أكبر مساحة.'), hint: say('$\\sen A$ handiena: $A=90^{\\circ}$.', 'El mayor $\\sen A$: $A=90^{\\circ}$.', 'أكبر $\\sen A$: $A=90^{\\circ}$.'), isSolved: (state) => state.b === 6 && state.c === 8 && state.angle === 90 },
    { id: 71802, prompt: say('$A=30^{\\circ}$ izanik, lortu 12ko azalera.', 'Con $A=30^{\\circ}$, consigue un área de 12.', 'مع $A=30^{\\circ}$ احصل على مساحة 12.'), hint: say('$\\frac{1}{2}\\cdot b\\cdot c\\cdot\\frac{1}{2}=12$: $b\\cdot c=48$.', '$\\frac{1}{2}\\cdot b\\cdot c\\cdot\\frac{1}{2}=12$: $b\\cdot c=48$.', '$\\frac{1}{2}\\cdot b\\cdot c\\cdot\\frac{1}{2}=12$: $b\\cdot c=48$.'), isSolved: (state) => state.angle === 30 && state.b * state.c === 48 },
    { id: 71803, prompt: say('$b=6$ eta $c=8$ izanik, lortu 12ko azalera angelu kamuts batekin.', 'Con $b=6$ y $c=8$, consigue un área de 12 con un ángulo obtuso.', 'مع $b=6$ و$c=8$ احصل على مساحة 12 بزاوية منفرجة.'), hint: say('$\\sen(180^{\\circ}-A)=\\sen A$', '$\\sen(180^{\\circ}-A)=\\sen A$', '$\\sen(180^{\\circ}-A)=\\sen A$'), isSolved: (state) => state.b === 6 && state.c === 8 && state.angle === 150 },
    { id: 71804, prompt: say('$b=c$ izanik, lortu 9ko azalera.', 'Con $b=c$, consigue un área de 9.', 'مع $b=c$ احصل على مساحة 9.'), hint: say('$\\frac{1}{2}\\cdot 6\\cdot 6\\cdot\\sen A=9$', '$\\frac{1}{2}\\cdot 6\\cdot 6\\cdot\\sen A=9$', '$\\frac{1}{2}\\cdot 6\\cdot 6\\cdot\\sen A=9$'), isSolved: (state) => state.b === state.c && near(triangleArea(state), 9, 1e-9) }
]

/* ---------- 9. The unit circle ---------- */

export const CIRCLE_STEP = 15

export interface CircleState {
    angle: number
}

export const initialCircleState: CircleState = { angle: 30 }

export const setCircle = (state: CircleState, patch: Partial<CircleState>): CircleState => ({
    angle: snap(patch.angle ?? state.angle, CIRCLE_STEP, 0, 360)
})

/** 1–4 inside a quadrant, null on an axis */
export function quadrant(angle: number): 1 | 2 | 3 | 4 | null {
    const a = ((angle % 360) + 360) % 360
    if (a % 90 === 0) return null
    return (Math.floor(a / 90) + 1) as 1 | 2 | 3 | 4
}

/** The first-quadrant angle with the same absolute values, and the relation used */
export function reducedAngle(angle: number): { reduced: number; relation: 'same' | '180-a' | '180+a' | '360-a' } {
    const a = ((angle % 360) + 360) % 360
    if (a <= 90) return { reduced: a, relation: 'same' }
    if (a <= 180) return { reduced: 180 - a, relation: '180-a' }
    if (a <= 270) return { reduced: a - 180, relation: '180+a' }
    return { reduced: 360 - a, relation: '360-a' }
}

/** Sine and cosine with the tiny float errors removed; the tangent is null at 90° and 270° */
export function circleValues(angle: number): { sin: number; cos: number; tan: number | null } {
    const clean = (value: number) => (Math.abs(value) < 1e-12 ? 0 : value)
    const sin = clean(Math.sin(toRadians(angle)))
    const cos = clean(Math.cos(toRadians(angle)))
    return { sin, cos, tan: cos === 0 ? null : clean(sin / cos) }
}

export const circleChallenges: LabChallenge<CircleState>[] = [
    { id: 71901, prompt: say('Lortu II. koadranteko angelu bat, $\\sen\\alpha=\\frac{1}{2}$ duena.', 'Consigue un ángulo del II cuadrante con $\\sen\\alpha=\\frac{1}{2}$.', 'احصل على زاوية في الربع الثاني فيها $\\sen\\alpha=\\frac{1}{2}$.'), hint: say('$180^{\\circ}-30^{\\circ}$', '$180^{\\circ}-30^{\\circ}$', '$180^{\\circ}-30^{\\circ}$'), isSolved: (state) => state.angle === 150 },
    { id: 71902, prompt: say('Lortu 60°-ren kosinu bera eta sinu negatiboa dituen angelua.', 'Consigue el ángulo con el mismo coseno que 60° y el seno negativo.', 'احصل على الزاوية التي لها جيب تمام 60° نفسه وجيب سالب.'), hint: say('IV. koadrantea: $360^{\\circ}-60^{\\circ}$.', 'IV cuadrante: $360^{\\circ}-60^{\\circ}$.', 'الربع الرابع: $360^{\\circ}-60^{\\circ}$.'), isSolved: (state) => state.angle === 300 },
    { id: 71903, prompt: say('Lortu kosinu negatiboa eta tangente positiboa dituen angelua.', 'Consigue un ángulo con el coseno negativo y la tangente positiva.', 'احصل على زاوية جيب تمامها سالب وظلها موجب.'), hint: say('Zein koadrantetan da tangentea positiboa bakarrik?', '¿En qué cuadrante solo es positiva la tangente?', 'في أي ربع يكون الظل وحده موجبًا؟'), isSolved: (state) => quadrant(state.angle) === 3 },
    { id: 71904, prompt: say('Egin $\\sen\\alpha=-1$ izatea.', 'Haz que $\\sen\\alpha=-1$.', 'اجعل $\\sen\\alpha=-1$.'), hint: say('Zirkunferentziaren puntu baxuena.', 'El punto más bajo de la circunferencia.', 'أدنى نقطة في الدائرة.'), isSolved: (state) => state.angle === 270 }
]

/* ---------- 10. The radian and the arc ---------- */

export const RADIAN_RADIUS_MAX = 6

export interface RadianState {
    angle: number
    r: number
}

export const initialRadianState: RadianState = { angle: 60, r: 2 }

export const setRadian = (state: RadianState, patch: Partial<RadianState>): RadianState => ({
    angle: snap(patch.angle ?? state.angle, CIRCLE_STEP, 0, 360),
    r: clamp(patch.r ?? state.r, 1, RADIAN_RADIUS_MAX)
})

/** The angle in radians as a fraction of π: 60° → 1/3 */
export const radiansOverPi = (angle: number): FractionValue => fraction(angle, 180)
/** The arc r · θ as a fraction of π */
export const arcOverPi = ({ angle, r }: RadianState): FractionValue => fraction(angle * r, 180)

/** k·π in LaTeX: 0, \pi, \frac{\pi}{3}, \frac{5\pi}{3}, 2\pi */
export function piLatex(value: FractionValue): string {
    const { numerator, denominator } = value
    if (numerator === 0) return '0'
    const top = numerator === 1 ? '\\pi' : `${numerator}\\pi`
    return denominator === 1 ? top : `\\frac{${top}}{${denominator}}`
}

const isPiFraction = (value: FractionValue, numerator: number, denominator: number) => value.numerator === numerator && value.denominator === denominator

export const radianChallenges: LabChallenge<RadianState>[] = [
    { id: 71001, prompt: say('Lortu $\\frac{3\\pi}{4}$ rad.', 'Consigue $\\frac{3\\pi}{4}$ rad.', 'احصل على $\\frac{3\\pi}{4}$ rad.'), hint: say('$\\frac{3}{4}\\cdot 180^{\\circ}$', '$\\frac{3}{4}\\cdot 180^{\\circ}$', '$\\frac{3}{4}\\cdot 180^{\\circ}$'), isSolved: (state) => isPiFraction(radiansOverPi(state.angle), 3, 4) },
    { id: 71002, prompt: say('Lortu $\\pi$ rad.', 'Consigue $\\pi$ rad.', 'احصل على $\\pi$ rad.'), hint: say('Buelta erdia.', 'Media vuelta.', 'نصف دورة.'), isSolved: (state) => state.angle === 180 },
    { id: 71003, prompt: say('4ko erradioarekin, lortu $2\\pi$ luzerako arkua.', 'Con radio 4, consigue un arco de longitud $2\\pi$.', 'بنصف قطر 4 احصل على قوس طوله $2\\pi$.'), hint: say('$l=r\\cdot\\theta$: $\\theta=\\frac{2\\pi}{4}$.', '$l=r\\cdot\\theta$: $\\theta=\\frac{2\\pi}{4}$.', '$l=r\\cdot\\theta$: $\\theta=\\frac{2\\pi}{4}$.'), isSolved: (state) => state.r === 4 && isPiFraction(arcOverPi(state), 2, 1) },
    { id: 71004, prompt: say('Lortu $\\frac{5\\pi}{3}$ rad.', 'Consigue $\\frac{5\\pi}{3}$ rad.', 'احصل على $\\frac{5\\pi}{3}$ rad.'), hint: say('$\\frac{5}{3}\\cdot 180^{\\circ}$', '$\\frac{5}{3}\\cdot 180^{\\circ}$', '$\\frac{5}{3}\\cdot 180^{\\circ}$'), isSolved: (state) => isPiFraction(radiansOverPi(state.angle), 5, 3) }
]

/* ---------- Progress ids ---------- */

export const trigonometryLabChallengeIds = [
    ...ratiosChallenges,
    ...notableChallenges,
    ...fundamentalChallenges,
    ...calculatorChallenges,
    ...twoSidesChallenges,
    ...elevationChallenges,
    ...doubleChallenges,
    ...areaChallenges,
    ...circleChallenges,
    ...radianChallenges
].map((challenge) => challenge.id)
