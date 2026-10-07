import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { AreasVolumesStageId } from '../lessons.tsx'
import { polygonChallenges, sectorChallenges } from '../../dbh1-figurak-v2/lab/labTools.ts'
import { classifyChallenges, figureChallenges, solveChallenges } from '../../dbh2-pitagoras-v2/lab/labTools.ts'
import { boxChallenges, pyramidChallenges, roundChallenges, volumeChallenges } from '../../dbh2-gorputzak-v2/lab/labTools.ts'

/* ==========================================================================
   Perimetroak, azalerak eta bolumenak (4. DBH aplikatuak) laboratory. The
   polygon angles and the sector come from 1. DBH, the triangle classifier,
   the Pythagoras solver and the hidden triangles from 2. DBH Pythagoras,
   and the box, pyramid, round bodies and volumes from 2. DBH solids, all
   with their own challenges. The new tools are the circle and its arcs
   (radius and central angle), the area of a regular polygon split into
   triangles, and compound solids (a cylinder with a cone or a hemisphere
   at each end). π ≈ 3,14 throughout: lengths, areas and volumes are kept
   as exact hundredths when they are whole hundredths. Pure state logic;
   the components live next to this file. Tests in
   tests/areak-dbh4ap-lab.test.ts.
   ========================================================================== */

export type AreasVolumesLabToolId = 'polygon' | 'classify' | 'circle' | 'solve' | 'figure' | 'regular' | 'sector' | 'box' | 'pyramid' | 'round' | 'volume' | 'compound'

export interface AreasVolumesLabTool extends LabToolInfo {
    id: AreasVolumesLabToolId
    stage: AreasVolumesStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string) => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export const areasVolumesLabTools: AreasVolumesLabTool[] = [
    { id: 'polygon', stage: 'polygons', lessonTopic: 'angles', title: say('Poligonoaren angeluak', 'Ángulos del polígono', 'زوايا المضلع'), observe: say('Erpin batetik diagonalak marraztean, n aldeko poligonoa n − 2 triangelutan banatzen da: horregatik batura 180° · (n − 2) da.', 'Al trazar las diagonales desde un vértice, el polígono de n lados queda en n − 2 triángulos: por eso la suma es 180° · (n − 2).', 'برسم الأقطار من رأس واحد ينقسم المضلع ذو n أضلاع إلى n − 2 مثلثًا: لذلك المجموع 180° · (n − 2).') },
    { id: 'classify', stage: 'polygons', lessonTopic: 'triangles', title: say('Triangeluak sailkatu', 'Clasificar triángulos', 'تصنيف المثلثات'), observe: say('Alde handienaren karratua beste bien karratuen batura baino handiagoa bada, angelua kamutsa da; berdina bada, zuzena; txikiagoa bada, zorrotza.', 'Si el cuadrado del lado mayor es mayor que la suma de los otros dos cuadrados, el ángulo es obtuso; si es igual, recto; si es menor, agudo.', 'إذا كان مربع الضلع الأكبر أكبر من مجموع المربعين الآخرين فالزاوية منفرجة؛ وإن ساواه فقائمة؛ وإن صغر عنه فحادّة.') },
    { id: 'circle', stage: 'polygons', lessonTopic: 'perimeters', title: say('Zirkunferentzia eta arkuak', 'Circunferencia y arcos', 'الدائرة والأقواس'), observe: say('Arkuaren luzera angeluaren proportzionala da: angelua bikoizten bada, arkua ere bai. Zirkunferentzia osoa 360°-ko arkua da.', 'La longitud del arco es proporcional al ángulo: si el ángulo se duplica, el arco también. La circunferencia entera es el arco de 360°.', 'طول القوس متناسب مع الزاوية: إذا تضاعفت الزاوية تضاعف القوس. والدائرة كاملة قوس 360°.') },
    { id: 'solve', stage: 'pythagoras', lessonTopic: 'right-triangles', title: say('Pitagoras ebatzi', 'Resolver con Pitágoras', 'الحل بفيثاغورس'), observe: say('Hipotenusa bilatzeko karratuak batzen dira; katetoa bilatzeko, kendu. Hipotenusa beti da alderik luzeena.', 'Para la hipotenusa se suman los cuadrados; para un cateto, se restan. La hipotenusa siempre es el lado más largo.', 'للوتر نجمع المربعين؛ وللضلع القائم نطرحهما. الوتر دائمًا أطول الأضلاع.') },
    { id: 'figure', stage: 'pythagoras', lessonTopic: 'heights', title: say('Triangelu ezkutuak', 'Triángulos escondidos', 'المثلثات المخفية'), observe: say('Irudi bakoitzean triangelu angeluzuzen bat dago: altuera, apotema edo diagonala bilatzeko, aurkitu haren hipotenusa eta katetoak.', 'En cada figura hay un triángulo rectángulo: para hallar la altura, la apotema o la diagonal, encuentra su hipotenusa y sus catetos.', 'في كل شكل مثلث قائم: لإيجاد الارتفاع أو العامد أو القطر جد وتره وضلعيه القائمين.') },
    { id: 'regular', stage: 'plane-areas', lessonTopic: 'polygon-areas', title: say('Poligono erregularraren azalera', 'Área del polígono regular', 'مساحة المضلع المنتظم'), observe: say('Poligono erregularra n triangelu berdinetan banatzen da; haien altuera apotema da. Aldeak gehitzean, poligonoa zirkulu batera hurbiltzen da.', 'El polígono regular se divide en n triángulos iguales cuya altura es la apotema. Al añadir lados, el polígono se parece cada vez más a un círculo.', 'ينقسم المضلع المنتظم إلى n مثلثات متطابقة ارتفاعها العامد. وبزيادة الأضلاع يقترب المضلع من القرص.') },
    { id: 'sector', stage: 'plane-areas', lessonTopic: 'circle-areas', title: say('Sektorea eta koroa', 'Sector y corona', 'القطاع والحلقة'), observe: say('Sektorea zirkuluaren zati proportzionala da: angelua zati 360. Koroa bi zirkuluren kendura da.', 'El sector es la parte proporcional del círculo: el ángulo entre 360. La corona es la diferencia de dos círculos.', 'القطاع جزء متناسب من القرص: الزاوية على 360. والحلقة فرق قرصين.') },
    { id: 'box', stage: 'solid-areas', lessonTopic: 'prism-area', title: say('Kaxa eta haren garapena', 'La caja y su desarrollo', 'الصندوق ونشره'), observe: say('Garapenean alboko aurpegiek laukizuzen bakarra osatzen dute: oinarria perimetroa da eta altuera kaxarena.', 'En el desarrollo, las caras laterales forman un solo rectángulo: su base es el perímetro y su altura la de la caja.', 'في النشر تكوّن الأوجه الجانبية مستطيلًا واحدًا: قاعدته المحيط وارتفاعه ارتفاع الصندوق.') },
    { id: 'pyramid', stage: 'solid-areas', lessonTopic: 'pyramid-area', title: say('Piramidearen apotema', 'Apotema de la pirámide', 'عامد الهرم'), observe: say('Altuera eta aldearen erdia katetoak dira; piramidearen apotema, hipotenusa. Azaleran apotema doa, ez altuera.', 'La altura y medio lado son los catetos; la apotema de la pirámide, la hipotenusa. En el área va la apotema, no la altura.', 'الارتفاع ونصف الضلع ضلعان قائمان؛ وعامد الهرم هو الوتر. في المساحة يدخل العامد لا الارتفاع.') },
    { id: 'round', stage: 'solid-areas', lessonTopic: 'round-area', title: say('Zilindroa, konoa eta esfera', 'Cilindro, cono y esfera', 'الأسطوانة والمخروط والكرة'), observe: say('Zilindroaren garapena laukizuzena eta bi zirkulu dira; konoarena, sektorea eta zirkulua. Esfera ezin da garatu: 4πr².', 'El desarrollo del cilindro es un rectángulo y dos círculos; el del cono, un sector y un círculo. La esfera no se desarrolla: 4πr².', 'نشر الأسطوانة مستطيل ودائرتان؛ ونشر المخروط قطاع ودائرة. والكرة لا تُنشر: 4πr².') },
    { id: 'volume', stage: 'volumes', lessonTopic: 'prism-volume', title: say('Bolumenak konparatu', 'Comparar volúmenes', 'مقارنة الحجوم'), observe: say('Oinarri eta altuera berekin, piramidea prismaren herena da eta konoa zilindroaren herena.', 'Con la misma base y altura, la pirámide es un tercio del prisma y el cono un tercio del cilindro.', 'بالقاعدة والارتفاع نفسيهما الهرم ثلث المنشور والمخروط ثلث الأسطوانة.') },
    { id: 'compound', stage: 'volumes', lessonTopic: 'compound', title: say('Gorputz konposatuak', 'Cuerpos compuestos', 'الأجسام المركّبة'), observe: say('Gorputz konposatu baten bolumena zatien bolumenen batura da. Erradio bereko esfera-erdia 2r altuerako konoa bezain handia da.', 'El volumen de un cuerpo compuesto es la suma de los volúmenes de sus partes. Una semiesfera vale lo mismo que un cono del mismo radio y altura 2r.', 'حجم الجسم المركّب مجموع حجوم أجزائه. نصف الكرة يساوي مخروطًا له نصف القطر نفسه وارتفاعه 2r.') }
]

export const areasVolumesLabToolForTopic: Record<string, AreasVolumesLabToolId | undefined> = {
    angles: 'polygon',
    triangles: 'classify',
    perimeters: 'circle',
    'right-triangles': 'solve',
    heights: 'figure',
    applications: 'solve',
    'polygon-areas': 'regular',
    'circle-areas': 'sector',
    composite: 'sector',
    'prism-area': 'box',
    'pyramid-area': 'pyramid',
    'round-area': 'round',
    'prism-volume': 'volume',
    'pyramid-volume': 'volume',
    compound: 'compound'
}

/** Hundredths as a decimal with the comma: 3768 → "37,68" */
export function hundredthsText(hundredths: number): string {
    const sign = hundredths < 0 ? '-' : ''
    const size = Math.abs(hundredths)
    const whole = Math.floor(size / 100)
    const rest = size % 100
    if (rest === 0) return `${sign}${whole}`
    return `${sign}${whole},${String(rest).padStart(2, '0').replace(/0$/, '')}`
}

/* ---------- 1. The circle and its arcs ---------- */

export const CIRCLE_RADIUS_MAX = 20
export const ARC_STEP = 15

export interface CircleState {
    r: number
    /** Central angle in degrees, a multiple of 15 from 15 to 360 */
    angle: number
}

export const initialCircleState: CircleState = { r: 4, angle: 90 }

export const setCircle = (state: CircleState, patch: Partial<CircleState>): CircleState => ({
    r: clamp(patch.r ?? state.r, 1, CIRCLE_RADIUS_MAX),
    angle: clamp((patch.angle ?? state.angle) / ARC_STEP, 1, 360 / ARC_STEP) * ARC_STEP
})

/** Length of the whole circle in hundredths: 2 · 3,14 · r */
export const circleHundredths = ({ r }: CircleState) => 628 * r

/** Arc length in hundredths and whether it is a whole number of hundredths */
export function arcHundredths({ r, angle }: CircleState): { value: number; exact: boolean } {
    const exact = (628 * r * angle) % 360 === 0
    return { value: Math.round((628 * r * angle) / 360), exact }
}

export const circleChallenges: LabChallenge<CircleState>[] = [
    { id: 49101, prompt: say('Egin $31{,}4$ cm-ko zirkunferentzia oso bat.', 'Haz una circunferencia entera de $31{,}4$ cm.', 'اصنع دائرة كاملة طولها $31{,}4$ سم.'), hint: say('$2\\cdot 3{,}14\\cdot r=31{,}4$', '$2\\cdot 3{,}14\\cdot r=31{,}4$', '$2\\cdot 3{,}14\\cdot r=31{,}4$'), isSolved: (state) => state.angle === 360 && circleHundredths(state) === 3140 },
    { id: 49102, prompt: say('Lortu 90°-ko arku bat, $6{,}28$ cm-koa.', 'Consigue un arco de 90° que mida $6{,}28$ cm.', 'احصل على قوس 90° طوله $6{,}28$ سم.'), hint: say('Zirkunferentzia osoa lau aldiz luzeagoa da: $25{,}12$.', 'La circunferencia entera es cuatro veces más larga: $25{,}12$.', 'الدائرة كاملة أطول بأربع مرات: $25{,}12$.'), isSolved: (state) => state.angle === 90 && arcHundredths(state).value === 628 },
    { id: 49103, prompt: say('Erloju baten minutu-orratzak 12 cm ditu. Erakutsi puntak 20 minututan egiten duen arkua.', 'El minutero de un reloj mide 12 cm. Muestra el arco que recorre la punta en 20 minutos.', 'عقرب الدقائق طوله 12 سم. اعرض القوس الذي يقطعه طرفه في 20 دقيقة.'), hint: say('Ordu bat 360° da; 20 minutu, herena.', 'Una hora son 360°; 20 minutos, un tercio.', 'الساعة 360°؛ و20 دقيقة ثلثها.'), isSolved: (state) => state.r === 12 && state.angle === 120 },
    { id: 49104, prompt: say('Bilatu zirkunferentzia-erdi bat 30 cm baino luzeagoa, erradiorik txikienarekin.', 'Busca una semicircunferencia de más de 30 cm con el menor radio posible.', 'ابحث عن نصف دائرة طولها أكثر من 30 سم بأصغر نصف قطر ممكن.'), hint: say('Zirkunferentzia-erdia $3{,}14\\cdot r$ da.', 'La semicircunferencia mide $3{,}14\\cdot r$.', 'نصف الدائرة طوله $3{,}14\\cdot r$.'), isSolved: (state) => state.angle === 180 && state.r === 10 }
]

/* ---------- 2. The area of a regular polygon ---------- */

export const REGULAR_MIN = 3
export const REGULAR_MAX = 10
export const REGULAR_SIDE_MAX = 12

export interface RegularState {
    n: number
    side: number
}

export const initialRegularState: RegularState = { n: 6, side: 4 }

export const setRegular = (state: RegularState, patch: Partial<RegularState>): RegularState => ({
    n: clamp(patch.n ?? state.n, REGULAR_MIN, REGULAR_MAX),
    side: clamp(patch.side ?? state.side, 1, REGULAR_SIDE_MAX)
})

/** The exact apothem: half the side over the tangent of half the central angle */
export const apothem = ({ n, side }: RegularState) => side / (2 * Math.tan(Math.PI / n))

/** Apothem rounded to hundredths, and whether that is exact (the square: half the side) */
export function apothemHundredths(state: RegularState): { value: number; exact: boolean } {
    const raw = apothem(state) * 100
    const value = Math.round(raw)
    return { value, exact: Math.abs(raw - value) < 1e-6 }
}

export const regularPerimeter = ({ n, side }: RegularState) => n * side

/**
 * Area P · a / 2 with the apothem rounded to hundredths, as the textbook does. `exact` says
 * whether P · a / 2 is a whole number of hundredths (the area itself is only exact when the
 * apothem is).
 */
export function regularAreaHundredths(state: RegularState): { value: number; exact: boolean } {
    const twice = regularPerimeter(state) * apothemHundredths(state).value
    return { value: Math.round(twice / 2), exact: twice % 2 === 0 }
}

export const regularChallenges: LabChallenge<RegularState>[] = [
    { id: 49201, prompt: say('Egin 36 cm-ko perimetroko hexagono erregular bat.', 'Haz un hexágono regular de 36 cm de perímetro.', 'اصنع مسدسًا منتظمًا محيطه 36 سم.'), hint: say('Sei alde berdin.', 'Seis lados iguales.', 'ستة أضلاع متساوية.'), isSolved: (state) => state.n === 6 && regularPerimeter(state) === 36 },
    { id: 49202, prompt: say('Egin 49 cm²-ko poligono erregular bat.', 'Haz un polígono regular de 49 cm².', 'اصنع مضلعًا منتظمًا مساحته 49 سم².'), hint: say('Karratuan apotema aldearen erdia da: $A=l^{2}$.', 'En el cuadrado la apotema es medio lado: $A=l^{2}$.', 'في المربع العامد نصف الضلع: $A=l^{2}$.'), isSolved: (state) => regularAreaHundredths(state).value === 4900 },
    { id: 49203, prompt: say('4 cm-ko aldearekin, bilatu 100 cm² baino gehiagoko poligono erregular bat.', 'Con 4 cm de lado, busca un polígono regular de más de 100 cm².', 'بضلع 4 سم ابحث عن مضلع منتظم مساحته أكثر من 100 سم².'), hint: say('Gehitu aldeak: apotema ere hazten da.', 'Añade lados: la apotema también crece.', 'زد الأضلاع: العامد يكبر أيضًا.'), isSolved: (state) => state.side === 4 && regularAreaHundredths(state).value > 10000 },
    { id: 49204, prompt: say('Egin $15{,}57$ cm² inguruko triangelu aldeberdin bat.', 'Haz un triángulo equilátero de unos $15{,}57$ cm².', 'اصنع مثلثًا متساوي الأضلاع مساحته نحو $15{,}57$ سم².'), hint: say('Probatu 6 cm-ko aldearekin.', 'Prueba con 6 cm de lado.', 'جرّب ضلعًا طوله 6 سم.'), isSolved: (state) => state.n === 3 && regularAreaHundredths(state).value === 1557 }
]

/* ---------- 3. Compound solids ---------- */

export type Cap = 'none' | 'cone' | 'hemisphere'
export const CAPS: Cap[] = ['none', 'cone', 'hemisphere']
export const COMPOUND_RADIUS_MAX = 10
export const COMPOUND_HEIGHT_MAX = 20
export const CONE_HEIGHT_MAX = 15

export interface CompoundState {
    r: number
    /** Height of the cylinder in the middle; 0 means no cylinder */
    h: number
    top: Cap
    bottom: Cap
    /** Height of the cones at the ends */
    k: number
}

export const initialCompoundState: CompoundState = { r: 3, h: 6, top: 'hemisphere', bottom: 'none', k: 6 }

export function setCompound(state: CompoundState, patch: Partial<CompoundState>): CompoundState {
    const next = { ...state, ...patch }
    return {
        r: clamp(next.r, 1, COMPOUND_RADIUS_MAX),
        h: clamp(next.h, 0, COMPOUND_HEIGHT_MAX),
        top: next.top,
        bottom: next.bottom,
        k: clamp(next.k, 1, CONE_HEIGHT_MAX)
    }
}

/** A body needs some volume: a bare cylinder of height 0 is nothing */
export const compoundIsEmpty = (state: CompoundState) => state.h === 0 && state.top === 'none' && state.bottom === 'none'

/** Volume of each part in thirds of π: cylinder 3r²h, cone r²k, hemisphere 2r³ */
export function partThirds({ r, h, k }: CompoundState, part: 'cylinder' | Cap): number {
    if (part === 'cylinder') return 3 * r * r * h
    if (part === 'cone') return r * r * k
    if (part === 'hemisphere') return 2 * r * r * r
    return 0
}

export const compoundThirds = (state: CompoundState) => partThirds(state, 'cylinder') + partThirds(state, state.top) + partThirds(state, state.bottom)

/** Thirds of π to hundredths with π ≈ 3,14: 314 · thirds / 3 */
export function thirdsToHundredths(thirds: number): { value: number; exact: boolean } {
    return { value: Math.round((314 * thirds) / 3), exact: thirds % 3 === 0 }
}

export const compoundHundredths = (state: CompoundState) => thirdsToHundredths(compoundThirds(state))

export const compoundChallenges: LabChallenge<CompoundState>[] = [
    { id: 49301, prompt: say('Egin izozki-konoa: 3 cm-ko erradioa, 12 cm-ko konoa eta gainean esfera-erdia ($169{,}56$ cm³).', 'Haz el cucurucho: radio 3 cm, cono de 12 cm y una semiesfera encima ($169{,}56$ cm³).', 'اصنع المثلّجة: نصف القطر 3 سم، ومخروط 12 سم، ونصف كرة فوقه ($169{,}56$ سم³).'), hint: say('Zilindrorik ez: altuera 0.', 'Sin cilindro: altura 0.', 'دون أسطوانة: الارتفاع 0.'), isSolved: (state) => state.h === 0 && new Set([state.top, state.bottom]).size === 2 && [state.top, state.bottom].includes('cone') && [state.top, state.bottom].includes('hemisphere') && compoundHundredths(state).value === 16956 },
    { id: 49302, prompt: say('Egin kapsula: 3 m-ko erradioko eta 10 m-ko zilindroa, muturretan esfera-erdiekin ($395{,}64$ m³).', 'Haz la cápsula: cilindro de 3 m de radio y 10 m, con semiesferas en los extremos ($395{,}64$ m³).', 'اصنع الكبسولة: أسطوانة نصف قطرها 3 م وطولها 10 م مع نصفي كرة في الطرفين ($395{,}64$ م³).'), hint: say('Bi esfera-erdi esfera oso bat dira.', 'Dos semiesferas son una esfera entera.', 'نصفا الكرة كرة كاملة.'), isSolved: (state) => state.top === 'hemisphere' && state.bottom === 'hemisphere' && compoundHundredths(state).value === 39564 },
    { id: 49303, prompt: say('Egin 1099 m³-ko dorre bat: zilindroa eta gainean teilatu konikoa.', 'Haz una torre de 1099 m³: un cilindro con un tejado cónico encima.', 'اصنع برجًا حجمه 1099 م³: أسطوانة فوقها سقف مخروطي.'), hint: say('Probatu 5 m-ko erradioa eta 10 m-ko zilindroa.', 'Prueba radio 5 m y cilindro de 10 m.', 'جرّب نصف قطر 5 م وأسطوانة 10 م.'), isSolved: (state) => state.h > 0 && state.top === 'cone' && state.bottom === 'none' && compoundHundredths(state).value === 109900 },
    { id: 49304, prompt: say('Egin kono bakar bat, 3 cm-ko erradioko esfera-erdiaren bolumen berekoa ($56{,}52$ cm³).', 'Haz un cono solo con el mismo volumen que la semiesfera de 3 cm de radio ($56{,}52$ cm³).', 'اصنع مخروطًا وحده له حجم نصف الكرة التي نصف قطرها 3 سم ($56{,}52$ سم³).'), hint: say('$r^{2}k=2r^{3}$: konoaren altuera $2r$.', '$r^{2}k=2r^{3}$: la altura del cono es $2r$.', '$r^{2}k=2r^{3}$: ارتفاع المخروط $2r$.'), isSolved: (state) => state.h === 0 && [state.top, state.bottom].filter((cap) => cap === 'cone').length === 1 && [state.top, state.bottom].includes('none') && compoundHundredths(state).value === 5652 }
]

export const areasVolumesLabChallengeIds: number[] = [
    ...polygonChallenges,
    ...classifyChallenges,
    ...circleChallenges,
    ...solveChallenges,
    ...figureChallenges,
    ...regularChallenges,
    ...sectorChallenges,
    ...boxChallenges,
    ...pyramidChallenges,
    ...roundChallenges,
    ...volumeChallenges,
    ...compoundChallenges
].map((challenge) => challenge.id)
