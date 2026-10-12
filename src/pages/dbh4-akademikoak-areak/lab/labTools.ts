import { fraction, toExactDecimal, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { sectorChallenges } from '../../dbh1-figurak-v2/lab/labTools.ts'
import { pyramidChallenges, roundChallenges, volumeChallenges } from '../../dbh2-gorputzak-v2/lab/labTools.ts'
import { compoundChallenges, hundredthsText, regularChallenges, thirdsToHundredths } from '../../dbh4-aplikatuak-areak/lab/labTools.ts'
import { growthChallenges, thalesChallenges } from '../../dbh4-aplikatuak-antzekotasuna/lab/labTools.ts'
import type { AreasSimilarityStageId } from '../lessons.tsx'

/* ==========================================================================
   Azalerak, bolumenak eta antzekotasuna (4. DBH akademikoak) laboratory.
   The regular polygon, the sector, the pyramid, the round bodies, the
   volumes, the compound solids, Thales and growing r times come from 1.,
   2. and 4. DBH aplikatuak, with their own challenges. The new tools: the
   circular segment (sector minus triangle), the projections of the legs
   on the hypotenuse (altitude and leg theorems), the frustum of a cone as
   a big cone minus a small one, and a box model at a scale 1:n with its
   real lengths, floor area and volume. π ≈ 3,14 throughout. Pure state
   logic; the components live next to this file. Tests in
   tests/areak-dbh4ak-lab.test.ts.
   ========================================================================== */

export type AreasSimilarityLabToolId = 'regular' | 'sector' | 'segment' | 'pyramid' | 'round' | 'volume' | 'compound' | 'thales' | 'projections' | 'growth' | 'frustum' | 'model'

export interface AreasSimilarityLabTool extends LabToolInfo {
    id: AreasSimilarityLabToolId
    stage: AreasSimilarityStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export const areasSimilarityLabTools: AreasSimilarityLabTool[] = [
    { id: 'regular', stage: 'plane-areas', lessonTopic: 'regular-polygons', title: say('Poligono erregularraren azalera', 'Área del polígono regular', 'مساحة المضلع المنتظم'), observe: say('Poligono erregularra n triangelu berdinetan banatzen da; haien altuera apotema da. Aldeak gehitzean, poligonoa zirkulu batera hurbiltzen da.', 'El polígono regular se divide en n triángulos iguales cuya altura es la apotema. Al añadir lados, el polígono se parece cada vez más a un círculo.', 'ينقسم المضلع المنتظم إلى n مثلثات متطابقة ارتفاعها العامد. وبزيادة الأضلاع يقترب المضلع من القرص.') },
    { id: 'sector', stage: 'plane-areas', lessonTopic: 'circle-parts', title: say('Sektorea eta koroa', 'Sector y corona', 'القطاع والحلقة'), observe: say('Sektorea zirkuluaren zati proportzionala da: angelua zati 360. Koroa bi zirkuluren kendura da.', 'El sector es la parte proporcional del círculo: el ángulo entre 360. La corona es la diferencia de dos círculos.', 'القطاع جزء متناسب من القرص: الزاوية على 360. والحلقة فرق قرصين.') },
    { id: 'segment', stage: 'plane-areas', lessonTopic: 'segments', title: say('Segmentu zirkularra', 'Segmento circular', 'القطعة الدائرية'), observe: say('Segmentua sektorea ken triangelua da. Triangelua 90°-an da handiena; 180°-an desagertzen da, eta segmentua zirkulu-erdia da.', 'El segmento es el sector menos el triángulo. El triángulo es máximo a 90°; a 180° desaparece y el segmento es medio círculo.', 'القطعة هي القطاع ناقص المثلث. يكون المثلث أكبر ما يمكن عند 90°، ويختفي عند 180° فتصير القطعة نصف قرص.') },
    { id: 'pyramid', stage: 'solid-areas', lessonTopic: 'polyhedra-area', title: say('Piramidearen apotema', 'Apotema de la pirámide', 'عامد الهرم'), observe: say('Altuera eta aldearen erdia katetoak dira; piramidearen apotema, hipotenusa. Azaleran apotema doa, ez altuera.', 'La altura y medio lado son los catetos; la apotema de la pirámide, la hipotenusa. En el área va la apotema, no la altura.', 'الارتفاع ونصف الضلع ضلعان قائمان؛ وعامد الهرم هو الوتر. في المساحة يدخل العامد لا الارتفاع.') },
    { id: 'round', stage: 'solid-areas', lessonTopic: 'round-area', title: say('Zilindroa, konoa eta esfera', 'Cilindro, cono y esfera', 'الأسطوانة والمخروط والكرة'), observe: say('Zilindroaren garapena laukizuzena eta bi zirkulu dira; konoarena, sektorea eta zirkulua. Esfera ezin da garatu: 4πr².', 'El desarrollo del cilindro es un rectángulo y dos círculos; el del cono, un sector y un círculo. La esfera no se desarrolla: 4πr².', 'نشر الأسطوانة مستطيل ودائرتان؛ ونشر المخروط قطاع ودائرة. والكرة لا تُنشر: 4πr².') },
    { id: 'volume', stage: 'volumes', lessonTopic: 'pyramid-cone-volume', title: say('Bolumenak konparatu', 'Comparar volúmenes', 'مقارنة الحجوم'), observe: say('Oinarri eta altuera berekin, piramidea prismaren herena da eta konoa zilindroaren herena.', 'Con la misma base y altura, la pirámide es un tercio del prisma y el cono un tercio del cilindro.', 'بالقاعدة والارتفاع نفسيهما الهرم ثلث المنشور والمخروط ثلث الأسطوانة.') },
    { id: 'compound', stage: 'volumes', lessonTopic: 'sphere-composite', title: say('Gorputz konposatuak', 'Cuerpos compuestos', 'الأجسام المركّبة'), observe: say('Gorputz konposatu baten bolumena zatien bolumenen batura da. Erradio bereko esfera-erdia 2r altuerako konoa bezain handia da.', 'El volumen de un cuerpo compuesto es la suma de los volúmenes de sus partes. Una semiesfera vale lo mismo que un cono del mismo radio y altura 2r.', 'حجم الجسم المركّب مجموع حجوم أجزائه. نصف الكرة يساوي مخروطًا له نصف القطر نفسه وارتفاعه 2r.') },
    { id: 'thales', stage: 'similarity', lessonTopic: 'similar-triangles', title: say('Tales posizioa', 'Posición de Tales', 'وضع طاليس'), observe: say('Paraleloa erpinera hurbiltzean, triangelu txikiaren alde guztiak proportzio berean txikitzen dira.', 'Al acercar la paralela al vértice, todos los lados del triángulo pequeño se reducen en la misma proporción.', 'عند تقريب الموازي من الرأس تصغر كل أضلاع المثلث الصغير بالنسبة نفسها.') },
    { id: 'projections', stage: 'similarity', lessonTopic: 'right-theorems', title: say('Katetoen proiekzioak', 'Proyecciones de los catetos', 'مسقطا الضلعين القائمين'), observe: say('Altuerak hipotenusa m eta n zatitan banatzen du. h² = m · n eta kateto bakoitzaren karratua hipotenusa bider bere proiekzioa da. m = n denean, triangelua isoszelea da.', 'La altura parte la hipotenusa en m y n. h² = m · n, y el cuadrado de cada cateto es la hipotenusa por su proyección. Cuando m = n, el triángulo es isósceles.', 'يقسم الارتفاع الوتر إلى m وn. h² = m · n، ومربع كل ضلع قائم يساوي الوتر في مسقطه. وعندما m = n يكون المثلث متساوي الساقين.') },
    { id: 'growth', stage: 'ratios', lessonTopic: 'ratio-powers', title: say('Hazi r bider', 'Crecer r veces', 'التكبير r مرة'), observe: say('Aldea bikoiztean, karratuan 4 karratu txiki sartzen dira eta kuboan 8 kubo: azalerak r², bolumenak r³.', 'Al duplicar el lado, en el cuadrado caben 4 cuadraditos y en el cubo 8 cubitos: áreas r², volúmenes r³.', 'عند مضاعفة الضلع يتسع المربع لأربعة مربعات صغيرة والمكعب لثمانية مكعبات: المساحات r² والحجوم r³.') },
    { id: 'frustum', stage: 'ratios', lessonTopic: 'frustums', title: say('Kono-enborra', 'Tronco de cono', 'جذع المخروط'), observe: say('Kono txikia handiaren antzekoa da: x / r = (x + h) / R. Goiko erradioa behekoaren erdia denean, kono txikiak osoaren 1/8 hartzen du eta enborrak 7/8.', 'El cono pequeño es semejante al grande: x / r = (x + h) / R. Cuando el radio de arriba es la mitad del de abajo, el cono pequeño ocupa 1/8 del total y el tronco 7/8.', 'المخروط الصغير يشابه الكبير: x / r = (x + h) / R. وعندما يكون نصف القطر العلوي نصف السفلي يشغل المخروط الصغير 1/8 من الكل والجذع 7/8.') },
    { id: 'model', stage: 'ratios', lessonTopic: 'models', title: say('Eskalako maketa', 'Maqueta a escala', 'مجسّم بمقياس'), observe: say('1:n eskalan neurri errealak n bider handiagoak dira, oinplanoaren azalera n² bider eta bolumena n³ bider. Eskala bikoiztean, bolumena 8 bider hazten da.', 'A escala 1:n las medidas reales son n veces mayores, el área de la planta n² veces y el volumen n³ veces. Al duplicar la escala, el volumen se multiplica por 8.', 'بالمقياس 1:n تكون الأطوال الحقيقية أكبر n مرة، ومساحة القاعدة n² مرة، والحجم n³ مرة. وبمضاعفة المقياس يتضاعف الحجم 8 مرات.') }
]

export const areasSimilarityLabToolForTopic: Record<string, AreasSimilarityLabToolId | undefined> = {
    'regular-polygons': 'regular',
    'circle-parts': 'sector',
    segments: 'segment',
    'polyhedra-area': 'pyramid',
    'round-area': 'round',
    'sphere-area': 'round',
    'prism-cylinder-volume': 'volume',
    'pyramid-cone-volume': 'volume',
    'sphere-composite': 'compound',
    thales: 'thales',
    'similar-triangles': 'thales',
    'right-theorems': 'projections',
    'ratio-powers': 'growth',
    frustums: 'frustum',
    models: 'model'
}

/** A value in hundredths rounded from a real number, and whether the rounding was exact */
function toHundredths(raw: number): { value: number; exact: boolean } {
    const value = Math.round(raw * 100)
    return { value, exact: Math.abs(raw * 100 - value) < 1e-6 }
}

/** A square root as hundredths: exact for perfect squares (and squares of tenths) */
export const rootHundredths = (square: number) => toHundredths(Math.sqrt(square))

export { hundredthsText }

/* ---------- 1. The circular segment ---------- */

export const SEGMENT_RADIUS_MAX = 12
export const SEGMENT_STEP = 30

export interface SegmentState {
    r: number
    /** Central angle in degrees, a multiple of 30 from 30 to 180 */
    angle: number
}

export const initialSegmentState: SegmentState = { r: 4, angle: 90 }

export const setSegment = (state: SegmentState, patch: Partial<SegmentState>): SegmentState => ({
    r: clamp(patch.r ?? state.r, 1, SEGMENT_RADIUS_MAX),
    angle: clamp((patch.angle ?? state.angle) / SEGMENT_STEP, 1, 180 / SEGMENT_STEP) * SEGMENT_STEP
})

/** The sector 3,14 · r² · angle / 360, in hundredths */
export const segmentSector = ({ r, angle }: SegmentState) => toHundredths((3.14 * r * r * angle) / 360)

/** The triangle of the two radii and the chord, r² · sin(angle) / 2, in hundredths */
export function segmentTriangle({ r, angle }: SegmentState): { value: number; exact: boolean } {
    // sin 30° and sin 150° are 1/2, sin 90° is 1 and sin 180° is 0: those are exact
    const sine = angle === 180 ? 0 : angle === 90 ? 1 : angle === 30 || angle === 150 ? 0.5 : Math.sin((angle * Math.PI) / 180)
    return toHundredths((r * r * sine) / 2)
}

/** Sector minus triangle, both rounded to hundredths first, as the textbook does */
export function segmentArea(state: SegmentState): { value: number; exact: boolean } {
    const sector = segmentSector(state)
    const triangle = segmentTriangle(state)
    return { value: sector.value - triangle.value, exact: sector.exact && triangle.exact }
}

export const segmentChallenges: LabChallenge<SegmentState>[] = [
    { id: 69101, prompt: say('Lortu 90°-ko segmentu bat, $10{,}26$ cm²-koa.', 'Consigue un segmento de 90° de $10{,}26$ cm².', 'احصل على قطعة 90° مساحتها $10{,}26$ سم².'), hint: say('Laurdena ken $\\frac{r^{2}}{2}$: probatu 6 cm-ko erradioarekin.', 'El cuarto menos $\\frac{r^{2}}{2}$: prueba con 6 cm de radio.', 'الربع ناقص $\\frac{r^{2}}{2}$: جرّب نصف قطر 6 سم.'), isSolved: (state) => state.angle === 90 && segmentArea(state).value === 1026 },
    { id: 69102, prompt: say('6 cm-ko erradioarekin, egin triangelua aldeberdina izan dadin.', 'Con 6 cm de radio, haz que el triángulo sea equilátero.', 'بنصف قطر 6 سم اجعل المثلث متساوي الأضلاع.'), hint: say('Bi erradioak eta korda berdinak dira angelua 60° denean.', 'Los dos radios y la cuerda son iguales cuando el ángulo es 60°.', 'يتساوى نصفا القطر والوتر عندما تكون الزاوية 60°.'), isSolved: (state) => state.r === 6 && state.angle === 60 },
    { id: 69103, prompt: say('Egin zirkulu-erdi bat den segmentu bat, $25{,}12$ cm²-koa.', 'Haz un segmento que sea medio círculo, de $25{,}12$ cm².', 'اصنع قطعة هي نصف قرص مساحتها $25{,}12$ سم².'), hint: say('180°-an triangelua desagertzen da.', 'A 180° el triángulo desaparece.', 'عند 180° يختفي المثلث.'), isSolved: (state) => state.angle === 180 && segmentArea(state).value === 2512 },
    { id: 69104, prompt: say('10 cm-ko erradioarekin, bilatu triangelurik handiena ematen duen angelua.', 'Con 10 cm de radio, busca el ángulo que da el triángulo más grande.', 'بنصف قطر 10 سم ابحث عن الزاوية التي تعطي أكبر مثلث.'), hint: say('Bi erradioak elkarzutak direnean.', 'Cuando los dos radios son perpendiculares.', 'عندما يتعامد نصفا القطر.'), isSolved: (state) => state.r === 10 && state.angle === 90 }
]

/* ---------- 2. The projections of the legs ---------- */

export const PROJECTION_MAX = 16

export interface ProjectionsState {
    /** Projection of the leg c on the hypotenuse */
    m: number
    /** Projection of the leg b on the hypotenuse */
    n: number
}

export const initialProjectionsState: ProjectionsState = { m: 2, n: 8 }

export const setProjections = (state: ProjectionsState, patch: Partial<ProjectionsState>): ProjectionsState => ({
    m: clamp(patch.m ?? state.m, 1, PROJECTION_MAX),
    n: clamp(patch.n ?? state.n, 1, PROJECTION_MAX)
})

/** a = m + n; h² = m · n; b² = a · n; c² = a · m */
export function projectionSquares({ m, n }: ProjectionsState) {
    const a = m + n
    return { a, h: m * n, b: a * n, c: a * m }
}

export function projectionLengths(state: ProjectionsState) {
    const squares = projectionSquares(state)
    return { a: squares.a, h: rootHundredths(squares.h), b: rootHundredths(squares.b), c: rootHundredths(squares.c) }
}

export const projectionsChallenges: LabChallenge<ProjectionsState>[] = [
    { id: 69201, prompt: say('Lortu 6-ko altuera, bi proiekzio desberdinekin.', 'Consigue una altura de 6 con dos proyecciones distintas.', 'احصل على ارتفاع 6 بمسقطين مختلفين.'), hint: say('$m\\cdot n=36$', '$m\\cdot n=36$', '$m\\cdot n=36$'), isSolved: (state) => state.m !== state.n && projectionSquares(state).h === 36 },
    { id: 69202, prompt: say('Egin 12-ko altuera eta 25-eko hipotenusa dituen triangelua.', 'Haz el triángulo de altura 12 e hipotenusa 25.', 'اصنع المثلث الذي ارتفاعه 12 ووتره 25.'), hint: say('$m\\cdot n=144$ eta $m+n=25$.', '$m\\cdot n=144$ y $m+n=25$.', '$m\\cdot n=144$ و$m+n=25$.'), isSolved: (state) => projectionSquares(state).h === 144 && projectionSquares(state).a === 25 },
    { id: 69203, prompt: say('Egin b katetoak 8 neur dezan.', 'Haz que el cateto b mida 8.', 'اجعل الضلع القائم b يساوي 8.'), hint: say('$b^{2}=(m+n)\\cdot n=64$: probatu $n=4$.', '$b^{2}=(m+n)\\cdot n=64$: prueba con $n=4$.', '$b^{2}=(m+n)\\cdot n=64$: جرّب $n=4$.'), isSolved: (state) => projectionSquares(state).b === 64 },
    { id: 69204, prompt: say('Egin triangelu angeluzuzen isoszele bat, 5-eko altuerakoa.', 'Haz un triángulo rectángulo isósceles de altura 5.', 'اصنع مثلثًا قائمًا متساوي الساقين ارتفاعه 5.'), hint: say('Isoszelean bi proiekzioak berdinak dira.', 'En el isósceles las dos proyecciones son iguales.', 'في المتساوي الساقين يتساوى المسقطان.'), isSolved: (state) => state.m === state.n && projectionSquares(state).h === 25 }
]

/* ---------- 3. The frustum of a cone ---------- */

export const FRUSTUM_RADIUS_MAX = 10
export const FRUSTUM_HEIGHT_MAX = 12

export interface FrustumState {
    /** Radius of the bottom base */
    R: number
    /** Radius of the top base, smaller than R */
    r: number
    h: number
}

export const initialFrustumState: FrustumState = { R: 5, r: 2, h: 3 }

export function setFrustum(state: FrustumState, patch: Partial<FrustumState>): FrustumState {
    const R = clamp(patch.R ?? state.R, 2, FRUSTUM_RADIUS_MAX)
    return { R, r: clamp(patch.r ?? state.r, 1, R - 1), h: clamp(patch.h ?? state.h, 1, FRUSTUM_HEIGHT_MAX) }
}

/** Height of the small cone cut off, from x / r = (x + h) / R */
export const frustumApex = ({ R, r, h }: FrustumState): FractionValue => fraction(r * h, R - r)

/** Volume in thirds of π: big cone minus small cone, h(R² + Rr + r²) */
export const frustumThirds = ({ R, r, h }: FrustumState) => h * (R * R + R * r + r * r)

/** The small cone in thirds of π: r² · x */
export const smallConeThirds = (state: FrustumState): FractionValue => fraction(state.r * state.r * state.r * state.h, state.R - state.r)

export const frustumHundredths = (state: FrustumState) => thirdsToHundredths(frustumThirds(state))

export const frustumChallenges: LabChallenge<FrustumState>[] = [
    { id: 69301, prompt: say('Egin $84\\pi$-ko bolumena duen enbor bat.', 'Haz un tronco de volumen $84\\pi$.', 'اصنع جذعًا حجمه $84\\pi$.'), hint: say('Ikasgaikoa: $R=6$, $r=3$, $h=4$.', 'El de la lección: $R=6$, $r=3$, $h=4$.', 'جذع الدرس: $R=6$ و$r=3$ و$h=4$.'), isSolved: (state) => frustumThirds(state) === 252 },
    { id: 69302, prompt: say('Egin kono txikiaren altuera eta enborrarena berdinak izan daitezen.', 'Haz que la altura del cono pequeño sea igual a la del tronco.', 'اجعل ارتفاع المخروط الصغير مساويًا لارتفاع الجذع.'), hint: say('$x=h$ denean, $R=2r$.', 'Si $x=h$, entonces $R=2r$.', 'إذا كان $x=h$ فإن $R=2r$.'), isSolved: (state) => state.R === 2 * state.r },
    { id: 69303, prompt: say('Lortu $87{,}92$ cm³-ko enbor bat.', 'Consigue un tronco de $87{,}92$ cm³.', 'احصل على جذع حجمه $87{,}92$ سم³.'), hint: say('$87{,}92=28\\pi$: probatu $R=4$ eta $r=2$.', '$87{,}92=28\\pi$: prueba con $R=4$ y $r=2$.', '$87{,}92=28\\pi$: جرّب $R=4$ و$r=2$.'), isSolved: (state) => frustumHundredths(state).value === 8792 },
    { id: 69304, prompt: say('Egin kono txikiaren altuera 12 izan dadin.', 'Haz que la altura del cono pequeño sea 12.', 'اجعل ارتفاع المخروط الصغير 12.'), hint: say('$x=\\frac{r\\cdot h}{R-r}$: $R-r=1$ bada, $x=r\\cdot h$.', '$x=\\frac{r\\cdot h}{R-r}$: si $R-r=1$, $x=r\\cdot h$.', '$x=\\frac{r\\cdot h}{R-r}$: إذا كان $R-r=1$ فإن $x=r\\cdot h$.'), isSolved: (state) => frustumApex(state).numerator === 12 && frustumApex(state).denominator === 1 }
]

/* ---------- 4. A box model at a scale ---------- */

export const MODEL_SCALES = [10, 20, 50, 100, 200, 500] as const
export const MODEL_SIDE_MAX = 12

export interface ModelState {
    /** The scale 1:n */
    n: number
    /** Length, width and height of the model in cm */
    length: number
    width: number
    height: number
}

export const initialModelState: ModelState = { n: 50, length: 4, width: 3, height: 2 }

export function setModel(state: ModelState, patch: Partial<ModelState>): ModelState {
    const n = patch.n ?? state.n
    return {
        n: (MODEL_SCALES as readonly number[]).includes(n) ? n : state.n,
        length: clamp(patch.length ?? state.length, 1, MODEL_SIDE_MAX),
        width: clamp(patch.width ?? state.width, 1, MODEL_SIDE_MAX),
        height: clamp(patch.height ?? state.height, 1, MODEL_SIDE_MAX)
    }
}

/** Real measures: lengths in m, floor area in m², volume in m³ (cm · n, cm² · n², cm³ · n³) */
export function modelReal({ n, length, width, height }: ModelState) {
    return {
        length: fraction(length * n, 100),
        width: fraction(width * n, 100),
        height: fraction(height * n, 100),
        floor: fraction(length * width * n * n, 10_000),
        volume: fraction(length * width * height * n * n * n, 1_000_000)
    }
}

/** An exact decimal with the comma: every real measure of the model is one */
export const decimalText = (value: FractionValue) => toExactDecimal(value) ?? `${value.numerator}/${value.denominator}`

const isWhole = (value: FractionValue, whole: number) => value.denominator === 1 && value.numerator === whole

export const modelChallenges: LabChallenge<ModelState>[] = [
    { id: 69401, prompt: say('1:200 eskalan, egin 60 m²-ko oinplanoa duen eraikin bat.', 'A escala 1:200, haz un edificio de 60 m² de planta.', 'بمقياس 1:200 اصنع مبنى مساحة قاعدته 60 م².'), hint: say('Azalera $200^{2}$ bider: maketan 15 cm².', 'El área, por $200^{2}$: en la maqueta, 15 cm².', 'المساحة في $200^{2}$: في المجسّم 15 سم².'), isSolved: (state) => state.n === 200 && isWhole(modelReal(state).floor, 60) },
    { id: 69402, prompt: say('1:100 eskalan, egin 50 m³-ko igerileku bat.', 'A escala 1:100, haz una piscina de 50 m³.', 'بمقياس 1:100 اصنع مسبحًا حجمه 50 م³.'), hint: say('1:100 eskalan, 1 cm³ maketan 1 m³ da.', 'A escala 1:100, 1 cm³ de maqueta es 1 m³.', 'بمقياس 1:100 يساوي 1 سم³ في المجسّم 1 م³.'), isSolved: (state) => state.n === 100 && isWhole(modelReal(state).volume, 50) },
    { id: 69403, prompt: say('1:50 eskalan, egin 5 m × 4 m × 2,5 m-ko gela baten maketa.', 'A escala 1:50, haz la maqueta de una habitación de 5 m × 4 m × 2,5 m.', 'بمقياس 1:50 اصنع مجسّم غرفة أبعادها 5 م × 4 م × 2.5 م.'), hint: say('Zatitu neurri bakoitza 50-z, cm-tan.', 'Divide cada medida entre 50, en cm.', 'اقسم كل بُعد على 50 بالسنتيمتر.'), isSolved: (state) => state.n === 50 && state.length === 10 && state.width === 8 && state.height === 5 },
    { id: 69404, prompt: say('Lortu bolumen erreala 1000 m³ izatea.', 'Consigue que el volumen real sea de 1000 m³.', 'اجعل الحجم الحقيقي 1000 م³.'), hint: say('1:100 eskalan $10\\cdot 10\\cdot 10$, edo 1:500 eskalan $2\\cdot 2\\cdot 2$…', 'A escala 1:100, $10\\cdot 10\\cdot 10$; o a 1:500, $2\\cdot 2\\cdot 2$…', 'بمقياس 1:100 $10\\cdot 10\\cdot 10$، أو بمقياس 1:500 $2\\cdot 2\\cdot 2$…'), isSolved: (state) => isWhole(modelReal(state).volume, 1000) }
]

export const areasSimilarityLabChallengeIds: number[] = [
    ...regularChallenges,
    ...sectorChallenges,
    ...segmentChallenges,
    ...pyramidChallenges,
    ...roundChallenges,
    ...volumeChallenges,
    ...compoundChallenges,
    ...thalesChallenges,
    ...projectionsChallenges,
    ...growthChallenges,
    ...frustumChallenges,
    ...modelChallenges
].map((challenge) => challenge.id)
