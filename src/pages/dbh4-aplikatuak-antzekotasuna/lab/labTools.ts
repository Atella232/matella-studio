import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { equals, fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { SimilarityStageId } from '../lessons.tsx'
import { solveChallenges } from '../../dbh1-proportzionaltasuna-v2/lab/labTools.ts'

/* ==========================================================================
   Antzekotasuna (4. DBH aplikatuak) laboratory. The "find x" proportions
   come from 1. DBH with their own challenges. The new tools are: a segment
   divided into equal or proportional parts with Thales' parallels; two
   triangles in Thales position with a sliding parallel; a rectangle and a
   copy to make (or not make) similar; a homothety of a triangle; a square
   or a cube grown by r (lengths r, areas r², volumes r³); a map with its
   scale; and the shadows of a stick and a tree. Exact values are kept as
   fractions. Pure state logic; the components live next to this file.
   Tests in tests/antzekotasuna-dbh4ap-lab.test.ts.
   ========================================================================== */

export type SimilarityLabToolId = 'solve' | 'divide' | 'thales' | 'rectangles' | 'homothety' | 'growth' | 'map' | 'shadows'

export interface SimilarityLabTool extends LabToolInfo {
    id: SimilarityLabToolId
    stage: SimilarityStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string) => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
/** Clamp to a multiple of a half */
const clampHalf = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value * 2) / 2))
const n = (value: number) => fraction(value)
/** A number with at most one decimal (halves) as an exact fraction */
const half = (value: number) => fraction(Math.round(value * 2), 2)

export const similarityLabTools: SimilarityLabTool[] = [
    { id: 'solve', stage: 'thales', lessonTopic: 'thales', title: say('Aurkitu x', 'Encuentra x', 'أوجد x'), observe: say('Proportzio batean muturren biderkadura erdikoen biderkadura da. Horrela aurkitzen da Talesen zatirik ezezaguna.', 'En una proporción, el producto de los extremos es igual al de los medios. Así se halla el segmento desconocido de Tales.', 'في التناسب حاصل ضرب الطرفين يساوي حاصل ضرب الوسطين. هكذا نجد قطعة طاليس المجهولة.') },
    { id: 'divide', stage: 'thales', lessonTopic: 'divide', title: say('Zuzenki bat zatitu', 'Dividir un segmento', 'تقسيم قطعة'), observe: say('Erdizuzenean zati berdinak edo proportzionalak markatu eta paraleloak marraztean, zuzenkia proportzio berean zatitzen da.', 'Al marcar trozos iguales o proporcionales en la semirrecta y trazar paralelas, el segmento queda dividido en la misma proporción.', 'عند تعليم أجزاء متساوية أو متناسبة على نصف المستقيم ورسم المتوازيات تنقسم القطعة بالنسبة نفسها.') },
    { id: 'thales', stage: 'thales', lessonTopic: 'thales-position', title: say('Tales posizioa', 'Posición de Tales', 'وضع طاليس'), observe: say('Paraleloa erpinera hurbiltzean, triangelu txikiaren alde guztiak proportzio berean txikitzen dira.', 'Al acercar la paralela al vértice, todos los lados del triángulo pequeño se reducen en la misma proporción.', 'عند تقريب الموازي من الرأس تصغر كل أضلاع المثلث الصغير بالنسبة نفسها.') },
    { id: 'rectangles', stage: 'similarity', lessonTopic: 'similar-figures', title: say('Laukizuzen antzekoak', 'Rectángulos semejantes', 'مستطيلات متشابهة'), observe: say('Angeluak beti berdinak dira laukizuzenetan; antzekoak izateko, bi aldeen zatidurak berdina izan behar du.', 'En los rectángulos los ángulos siempre son iguales; para que sean semejantes, los dos cocientes de lados tienen que ser iguales.', 'زوايا المستطيلات متساوية دائمًا؛ ولكي تتشابه يجب أن تتساوى نسبتا الضلعين.') },
    { id: 'homothety', stage: 'similarity', lessonTopic: 'homothety', title: say('Homotezia', 'Homotecia', 'التحاكي'), observe: say('Arrazoia r bada, irudiaren perimetroa r bider handiagoa da, eta azalera r² bider.', 'Si la razón es r, el perímetro de la imagen es r veces mayor, y el área, r² veces.', 'إذا كانت النسبة r فمحيط الصورة أكبر r مرة ومساحتها r² مرة.') },
    { id: 'growth', stage: 'ratios', lessonTopic: 'area-ratio', title: say('Hazi r bider', 'Crecer r veces', 'التكبير r مرة'), observe: say('Aldea bikoiztean, karratuan 4 karratu txiki sartzen dira eta kuboan 8 kubo: azalerak r², bolumenak r³.', 'Al duplicar el lado, en el cuadrado caben 4 cuadraditos y en el cubo 8 cubitos: áreas r², volúmenes r³.', 'عند مضاعفة الضلع يتسع المربع لأربعة مربعات صغيرة والمكعب لثمانية مكعبات: المساحات r² والحجوم r³.') },
    { id: 'map', stage: 'scales', lessonTopic: 'scale', title: say('Mapa eta eskala', 'Mapa y escala', 'الخريطة والمقياس'), observe: say('Eskala 1:n bada, mapako zentimetro bakoitza errealitateko n zentimetro da. n handitzean, mapa txikiagoa da.', 'Si la escala es 1:n, cada centímetro del mapa son n centímetros reales. Cuanto mayor es n, más pequeño sale el mapa.', 'إذا كان المقياس 1:n فكل سنتيمتر في الخريطة يساوي n سنتيمترًا حقيقيًا. وكلما كبر n صغرت الخريطة.') },
    { id: 'shadows', stage: 'heights', lessonTopic: 'shadows', title: say('Itzalak', 'Sombras', 'الظلال'), observe: say('Une berean, itzala eta altueraren arteko zatidura berdina da makilarentzat eta zuhaitzarentzat.', 'En un mismo momento, el cociente entre sombra y altura es el mismo para el palo y para el árbol.', 'في اللحظة نفسها تكون نسبة الظل إلى الارتفاع واحدة للعصا والشجرة.') }
]

export const similarityLabToolForTopic: Record<string, SimilarityLabToolId | undefined> = {
    thales: 'solve',
    divide: 'divide',
    'thales-position': 'thales',
    'similar-figures': 'rectangles',
    criteria: 'thales',
    homothety: 'homothety',
    'perimeter-ratio': 'homothety',
    'area-ratio': 'growth',
    'volume-ratio': 'growth',
    scale: 'map',
    'find-scale': 'map',
    plans: 'map',
    shadows: 'shadows',
    mirror: 'shadows',
    sight: 'shadows'
}

/* ---------- 1. Dividing a segment ---------- */

export const DIVIDE_LENGTH_MAX = 30
export const DIVIDE_PARTS_MIN = 2
export const DIVIDE_PARTS_MAX = 5
export const WEIGHT_MAX = 6

export interface DivideState {
    length: number
    /** Weight of each part; equal weights give equal parts */
    weights: number[]
}

export const initialDivideState: DivideState = { length: 12, weights: [1, 1, 1] }

export function setDivide(state: DivideState, patch: { length?: number; count?: number; weight?: [number, number] }): DivideState {
    const count = clamp(patch.count ?? state.weights.length, DIVIDE_PARTS_MIN, DIVIDE_PARTS_MAX)
    const weights = Array.from({ length: count }, (_, index) => state.weights[index] ?? 1)
    if (patch.weight && patch.weight[0] < count) weights[patch.weight[0]] = clamp(patch.weight[1], 1, WEIGHT_MAX)
    return { length: clamp(patch.length ?? state.length, 1, DIVIDE_LENGTH_MAX), weights }
}

/** Each part: length · weight / sum of weights */
export function divideParts({ length, weights }: DivideState): FractionValue[] {
    const sum = weights.reduce((total, weight) => total + weight, 0)
    return weights.map((weight) => fraction(length * weight, sum))
}

const sameWeights = (state: DivideState, wanted: number[]) => state.weights.length === wanted.length && state.weights.every((weight, index) => weight === wanted[index])

export const divideChallenges: LabChallenge<DivideState>[] = [
    { id: 51101, prompt: say('Banatu 10 cm-ko zuzenki bat 5 zati berdinetan.', 'Divide un segmento de 10 cm en 5 partes iguales.', 'قسّم قطعة طولها 10 سم إلى 5 أجزاء متساوية.'), hint: say('Bost zati, pisu guztiak berdinak.', 'Cinco partes, todos los pesos iguales.', 'خمسة أجزاء، كل الأوزان متساوية.'), isSolved: (state) => state.length === 10 && state.weights.length === 5 && new Set(state.weights).size === 1 },
    { id: 51102, prompt: say('Banatu 18 cm 4 zati berdinetan: $4{,}5$ cm-ko zatiak.', 'Divide 18 cm en 4 partes iguales: trozos de $4{,}5$ cm.', 'قسّم 18 سم إلى 4 أجزاء متساوية: قطع طولها $4{,}5$ سم.'), hint: say('Luzera 18, lau zati.', 'Longitud 18, cuatro partes.', 'الطول 18، أربعة أجزاء.'), isSolved: (state) => state.weights.length === 4 && divideParts(state).every((part) => equals(part, fraction(9, 2))) },
    { id: 51103, prompt: say('Banatu 22 cm 2, 4 eta 5 zenbakien zati proportzionaletan.', 'Divide 22 cm en partes proporcionales a 2, 4 y 5.', 'قسّم 22 سم إلى أجزاء متناسبة مع 2 و4 و5.'), hint: say('Zatiak 4, 8 eta 10 izango dira.', 'Las partes serán 4, 8 y 10.', 'ستكون الأجزاء 4 و8 و10.'), isSolved: (state) => state.length === 22 && sameWeights(state, [2, 4, 5]) },
    { id: 51104, prompt: say('Lortu 5, 10 eta 15 cm-ko zatiak.', 'Consigue partes de 5, 10 y 15 cm.', 'احصل على أجزاء 5 و10 و15 سم.'), hint: say('30 cm eta 1, 2, 3 pisuak.', '30 cm y pesos 1, 2, 3.', '30 سم والأوزان 1 و2 و3.'), isSolved: (state) => { const parts = divideParts(state); return parts.length === 3 && [5, 10, 15].every((value, index) => equals(parts[index], n(value))) } }
]

/* ---------- 2. Thales position ---------- */

export const THALES_SIDE_MAX = 15

export interface ThalesState {
    /** AB, the whole side */
    ab: number
    /** BC, the side opposite to A */
    bc: number
    /** AB', where the parallel cuts AB */
    cut: number
}

export const initialThalesState: ThalesState = { ab: 12, bc: 10, cut: 9 }

export function setThales(state: ThalesState, patch: Partial<ThalesState>): ThalesState {
    const ab = clamp(patch.ab ?? state.ab, 2, THALES_SIDE_MAX)
    return { ab, bc: clamp(patch.bc ?? state.bc, 1, THALES_SIDE_MAX), cut: clamp(patch.cut ?? state.cut, 1, ab - 1) }
}

/** B'C' = BC · AB' / AB */
export const smallSide = ({ ab, bc, cut }: ThalesState) => fraction(bc * cut, ab)
/** Ratio of the small triangle to the big one */
export const thalesRatio = ({ ab, cut }: ThalesState) => fraction(cut, ab)

export const thalesChallenges: LabChallenge<ThalesState>[] = [
    { id: 51201, prompt: say("AB = 12 eta BC = 10 direla, lortu $B'C'=5$.", "Con AB = 12 y BC = 10, consigue $B'C'=5$.", "مع AB = 12 وBC = 10 احصل على $B'C'=5$."), hint: say('Paraleloa erdian.', 'La paralela, en el medio.', 'الموازي في المنتصف.'), isSolved: (state) => state.ab === 12 && state.bc === 10 && equals(smallSide(state), n(5)) },
    { id: 51202, prompt: say("AB = 8 eta BC = 6 direla, lortu $B'C'=4{,}5$.", "Con AB = 8 y BC = 6, consigue $B'C'=4{,}5$.", "مع AB = 8 وBC = 6 احصل على $B'C'=4{,}5$."), hint: same3("$\\frac{AB'}{8}=\\frac{4{,}5}{6}$"), isSolved: (state) => state.ab === 8 && state.bc === 6 && equals(smallSide(state), fraction(9, 2)) },
    { id: 51203, prompt: say('Egin handiaren laurdena den triangelu txiki bat (arrazoia 0,25).', 'Haz un triángulo pequeño que sea la cuarta parte del grande (razón 0,25).', 'اصنع مثلثًا صغيرًا ربع الكبير (النسبة 0.25).'), hint: say("AB 4ren multiploa izan behar da.", "AB tiene que ser múltiplo de 4.", 'يجب أن يكون AB من مضاعفات 4.'), isSolved: (state) => equals(thalesRatio(state), fraction(1, 4)) }
]

/** The same text in every language (a formula) */
function same3(value: string) {
    return say(value, value, value)
}

/* ---------- 3. Similar rectangles ---------- */

export const RECTANGLES: Array<[number, number]> = [[4, 6], [2, 5], [3, 4]]
export const COPY_MAX = 20

export interface RectanglesState {
    original: number
    width: number
    height: number
}

export const initialRectanglesState: RectanglesState = { original: 0, width: 6, height: 8 }

export const setRectangles = (state: RectanglesState, patch: Partial<RectanglesState>): RectanglesState => ({
    original: clamp(patch.original ?? state.original, 0, RECTANGLES.length - 1),
    width: clamp(patch.width ?? state.width, 1, COPY_MAX),
    height: clamp(patch.height ?? state.height, 1, COPY_MAX)
})

/** The copy is similar when width : a = height : b */
export const isSimilar = ({ original, width, height }: RectanglesState) => {
    const [a, b] = RECTANGLES[original]
    return width * b === height * a
}

export const rectanglesRatio = ({ original, width }: RectanglesState) => fraction(width, RECTANGLES[original][0])

const perimeterOf = (a: number, b: number) => 2 * (a + b)

export const rectanglesChallenges: LabChallenge<RectanglesState>[] = [
    { id: 51301, prompt: say('Egin 4 × 6 laukizuzenaren antzeko bat, alde laburra 10 duela.', 'Haz un rectángulo semejante al de 4 × 6 con el lado corto de 10.', 'اصنع مستطيلًا مشابهًا للمستطيل 4 × 6 ضلعه القصير 10.'), hint: say('Arrazoia $10\\mathbin{:}4=2{,}5$.', 'Razón $10\\mathbin{:}4=2{,}5$.', 'النسبة $10\\mathbin{:}4=2{,}5$.'), isSolved: (state) => state.original === 0 && state.width === 10 && isSimilar(state) },
    { id: 51302, prompt: say('Egin 2 × 5 laukizuzenaren antzeko bat, 3 arrazoiarekin.', 'Haz un rectángulo semejante al de 2 × 5 con razón 3.', 'اصنع مستطيلًا مشابهًا للمستطيل 2 × 5 بنسبة 3.'), hint: say('Biderkatu bi aldeak 3z.', 'Multiplica los dos lados por 3.', 'اضرب الضلعين في 3.'), isSolved: (state) => state.original === 1 && state.width === 6 && state.height === 15 },
    { id: 51303, prompt: say('Egin 4 × 6 laukizuzenaren perimetro bera duen baina antzekoa ez den laukizuzen bat.', 'Haz un rectángulo con el mismo perímetro que el de 4 × 6 pero que no sea semejante.', 'اصنع مستطيلًا له محيط المستطيل 4 × 6 لكنه غير مشابه له.'), hint: say('Perimetroa 20: probatu 3 × 7.', 'Perímetro 20: prueba 3 × 7.', 'المحيط 20: جرّب 3 × 7.'), isSolved: (state) => state.original === 0 && perimeterOf(state.width, state.height) === 20 && !isSimilar(state) },
    { id: 51304, prompt: say('Egin 3 × 4 laukizuzenaren antzekoa den eta taulan sartzen den handiena.', 'Haz el rectángulo semejante al de 3 × 4 más grande que quepa en el tablero.', 'اصنع أكبر مستطيل مشابه للمستطيل 3 × 4 يتسع له اللوح.'), hint: say('Alde luzea 20 baino txikiagoa: 15 × 20.', 'El lado largo, como mucho 20: 15 × 20.', 'الضلع الطويل 20 على الأكثر: 15 × 20.'), isSolved: (state) => state.original === 2 && state.width === 15 && state.height === 20 }
]

/* ---------- 4. Homothety ---------- */

export const HOMOTHETY_MIN = 0.5
export const HOMOTHETY_MAX = 3

export interface HomothetyState {
    /** Ratio, in halves */
    r: number
}

export const initialHomothetyState: HomothetyState = { r: 1.5 }

export const setHomothety = (_state: HomothetyState, patch: Partial<HomothetyState>): HomothetyState => ({ r: clampHalf(patch.r ?? _state.r, HOMOTHETY_MIN, HOMOTHETY_MAX) })

/** The triangle of the tool: sides 3, 4 and 5, perimeter 12 and area 6 */
export const BASE_TRIANGLE = { perimeter: 12, area: 6 }

export const homothetyPerimeter = ({ r }: HomothetyState) => fraction(Math.round(r * 2) * BASE_TRIANGLE.perimeter, 2)
export const homothetyArea = ({ r }: HomothetyState) => fraction(Math.round(r * 2) ** 2 * BASE_TRIANGLE.area, 4)

export const homothetyChallenges: LabChallenge<HomothetyState>[] = [
    { id: 51401, prompt: say('Lortu perimetroaren bikoitza duen irudi bat.', 'Consigue una imagen con el doble de perímetro.', 'احصل على صورة محيطها الضعف.'), hint: say('Perimetroa r bider.', 'El perímetro, por r.', 'المحيط في r.'), isSolved: (state) => equals(homothetyPerimeter(state), n(24)) },
    { id: 51402, prompt: say('Lortu azalera 9 bider handiagoa duen irudi bat.', 'Consigue una imagen con un área 9 veces mayor.', 'احصل على صورة مساحتها أكبر 9 مرات.'), hint: say('$r^{2}=9$', '$r^{2}=9$', '$r^{2}=9$'), isSolved: (state) => equals(homothetyArea(state), n(54)) },
    { id: 51403, prompt: say('Lortu azaleraren laurdena duen irudi bat.', 'Consigue una imagen con la cuarta parte del área.', 'احصل على صورة مساحتها الربع.'), hint: say('$r^{2}=0{,}25$', '$r^{2}=0{,}25$', '$r^{2}=0{,}25$'), isSolved: (state) => equals(homothetyArea(state), fraction(3, 2)) },
    { id: 51404, prompt: say('Lortu $37{,}5$ unitate karratuko irudi bat.', 'Consigue una imagen de $37{,}5$ unidades cuadradas.', 'احصل على صورة مساحتها $37{,}5$ وحدة مربعة.'), hint: say('$6\\cdot r^{2}=37{,}5$', '$6\\cdot r^{2}=37{,}5$', '$6\\cdot r^{2}=37{,}5$'), isSolved: (state) => equals(homothetyArea(state), fraction(75, 2)) }
]

/* ---------- 5. Growing a square or a cube ---------- */

export type GrowthShape = 'square' | 'cube'
export const GROWTH_MAX = 4

export interface GrowthState {
    shape: GrowthShape
    /** Ratio, in halves */
    r: number
}

export const initialGrowthState: GrowthState = { shape: 'square', r: 2 }

export const setGrowth = (state: GrowthState, patch: Partial<GrowthState>): GrowthState => ({ shape: patch.shape ?? state.shape, r: clampHalf(patch.r ?? state.r, 0.5, GROWTH_MAX) })

/** How many times the length, the area and the volume grow */
export function growthFactors({ r }: GrowthState): { length: FractionValue; area: FractionValue; volume: FractionValue } {
    const twice = Math.round(r * 2)
    return { length: half(r), area: fraction(twice ** 2, 4), volume: fraction(twice ** 3, 8) }
}

export const growthChallenges: LabChallenge<GrowthState>[] = [
    { id: 51501, prompt: say('Hazi kubo bat bolumena 8 bider handiagoa izan dadin.', 'Haz crecer un cubo para que su volumen sea 8 veces mayor.', 'كبّر مكعبًا ليصبح حجمه أكبر 8 مرات.'), hint: same3('$r^{3}=8$'), isSolved: (state) => state.shape === 'cube' && equals(growthFactors(state).volume, n(8)) },
    { id: 51502, prompt: say('Hazi karratu bat azalera $6{,}25$ bider handiagoa izan dadin.', 'Haz crecer un cuadrado para que su área sea $6{,}25$ veces mayor.', 'كبّر مربعًا لتصبح مساحته أكبر $6{,}25$ مرة.'), hint: same3('$r^{2}=6{,}25$'), isSolved: (state) => state.shape === 'square' && equals(growthFactors(state).area, fraction(25, 4)) },
    { id: 51503, prompt: say('Txikitu kubo bat bolumena zortzirena izan dadin.', 'Reduce un cubo para que su volumen sea la octava parte.', 'صغّر مكعبًا ليصبح حجمه الثُّمن.'), hint: same3('$r^{3}=0{,}125$'), isSolved: (state) => state.shape === 'cube' && equals(growthFactors(state).volume, fraction(1, 8)) },
    { id: 51504, prompt: say('Bilatu arrazoi bat non bolumena 27 bider eta azalera 9 bider hazten diren.', 'Busca una razón con la que el volumen crezca 27 veces y el área 9 veces.', 'ابحث عن نسبة يكبر بها الحجم 27 مرة والمساحة 9 مرات.'), hint: say('Bi baldintzak arrazoi berarekin.', 'Las dos condiciones con la misma razón.', 'الشرطان بالنسبة نفسها.'), isSolved: (state) => equals(growthFactors(state).volume, n(27)) && equals(growthFactors(state).area, n(9)) }
]

/* ---------- 6. A map and its scale ---------- */

export const MAP_SCALES = [100, 1000, 25000, 50000, 100000, 250000, 300000, 500000, 1000000] as const
export const MAP_DISTANCE_MAX = 20

export interface MapState {
    /** n of the scale 1:n */
    scale: number
    /** Distance on the map, in cm */
    cm: number
}

export const initialMapState: MapState = { scale: 50000, cm: 3 }

export function setMap(state: MapState, patch: Partial<MapState>): MapState {
    const scale = (MAP_SCALES as readonly number[]).includes(patch.scale ?? state.scale) ? (patch.scale ?? state.scale) : state.scale
    return { scale, cm: clamp(patch.cm ?? state.cm, 1, MAP_DISTANCE_MAX) }
}

/** The real distance in cm, in m and in km */
export function realDistance({ scale, cm }: MapState) {
    const realCm = scale * cm
    return { cm: realCm, m: fraction(realCm, 100), km: fraction(realCm, 100000) }
}

export const mapChallenges: LabChallenge<MapState>[] = [
    { id: 51601, prompt: say('Mapan 4 cm 2 km izan daitezen, aukeratu eskala.', 'Elige la escala para que 4 cm del mapa sean 2 km.', 'اختر المقياس ليكون 4 سم في الخريطة 2 كم.'), hint: say('2 km = 200 000 cm, zati 4.', '2 km = 200 000 cm, entre 4.', '2 كم = 200 000 سم، على 4.'), isSolved: (state) => state.cm === 4 && equals(realDistance(state).km, n(2)) },
    { id: 51602, prompt: say('1:300 000 eskalan, erakutsi 12 km.', 'A escala 1:300 000, muestra 12 km.', 'بمقياس 1:300 000 اعرض 12 كم.'), hint: say('$12\\ \\text{km}=1\\,200\\,000$ cm.', '$12\\ \\text{km}=1\\,200\\,000$ cm.', '$12\\ \\text{km}=1\\,200\\,000$ سم.'), isSolved: (state) => state.scale === 300000 && equals(realDistance(state).km, n(12)) },
    { id: 51603, prompt: say('Bilatu 10 km 4 cm-tan sartzen dituen eskala.', 'Busca la escala con la que 10 km caben en 4 cm.', 'ابحث عن المقياس الذي تتسع به 10 كم في 4 سم.'), hint: say('$1\\,000\\,000\\mathbin{:}4$.', '$1\\,000\\,000\\mathbin{:}4$.', '$1\\,000\\,000\\mathbin{:}4$.'), isSolved: (state) => state.cm === 4 && equals(realDistance(state).km, n(10)) },
    { id: 51604, prompt: say('Plano batean, egin 5 cm-k 5 m adieraz ditzaten.', 'En un plano, haz que 5 cm representen 5 m.', 'في مخطط اجعل 5 سم تمثل 5 م.'), hint: say('Eskala 1:100.', 'Escala 1:100.', 'المقياس 1:100.'), isSolved: (state) => state.cm === 5 && equals(realDistance(state).m, n(5)) }
]

/* ---------- 7. Shadows ---------- */

export const STICK_MAX = 3
export const STICK_SHADOW_MAX = 4
export const TREE_SHADOW_MAX = 24

export interface ShadowsState {
    /** Height of the stick, in halves of a metre */
    stick: number
    /** Shadow of the stick, in halves of a metre */
    stickShadow: number
    /** Shadow of the tree, in metres */
    treeShadow: number
}

export const initialShadowsState: ShadowsState = { stick: 1.5, stickShadow: 2, treeShadow: 8 }

export const setShadows = (state: ShadowsState, patch: Partial<ShadowsState>): ShadowsState => ({
    stick: clampHalf(patch.stick ?? state.stick, 0.5, STICK_MAX),
    stickShadow: clampHalf(patch.stickShadow ?? state.stickShadow, 0.5, STICK_SHADOW_MAX),
    treeShadow: clamp(patch.treeShadow ?? state.treeShadow, 1, TREE_SHADOW_MAX)
})

/** Height of the tree: stick · tree shadow / stick shadow */
export const treeHeight = ({ stick, stickShadow, treeShadow }: ShadowsState) => fraction(Math.round(stick * 2) * treeShadow, Math.round(stickShadow * 2))

export const shadowsChallenges: LabChallenge<ShadowsState>[] = [
    { id: 51701, prompt: say('1,5 m-ko makilak 2 m-ko itzala du. Bilatu 9 m-ko zuhaitzaren itzala.', 'El palo de 1,5 m da 2 m de sombra. Busca la sombra del árbol de 9 m.', 'ظل العصا 1.5 م هو 2 م. ابحث عن ظل الشجرة التي طولها 9 م.'), hint: same3('$\\frac{9}{x}=\\frac{1{,}5}{2}$'), isSolved: (state) => state.stick === 1.5 && state.stickShadow === 2 && equals(treeHeight(state), n(9)) },
    { id: 51702, prompt: say('Aurkitu itzalak altuerak bezain luzeak diren unea.', 'Encuentra el momento en que las sombras miden lo mismo que las alturas.', 'جد اللحظة التي تساوي فيها الظلال الارتفاعات.'), hint: say('Makilaren itzala = makila.', 'Sombra del palo = palo.', 'ظل العصا = العصا.'), isSolved: (state) => state.stick === state.stickShadow },
    { id: 51703, prompt: say('2 m-ko makilak 1,5 m-ko itzala du eta eraikinak 18 m-koa. Zenbat neurtzen du eraikinak? Erakutsi.', 'El palo de 2 m da 1,5 m de sombra y el edificio 18 m. ¿Cuánto mide el edificio? Muéstralo.', 'ظل العصا 2 م هو 1.5 م وظل المبنى 18 م. كم ارتفاع المبنى؟ اعرضه.'), hint: same3('$\\frac{18\\cdot 2}{1{,}5}$'), isSolved: (state) => state.stick === 2 && state.stickShadow === 1.5 && state.treeShadow === 18 },
    { id: 51704, prompt: say('Lortu 30 m-ko zuhaitz bat.', 'Consigue un árbol de 30 m.', 'احصل على شجرة طولها 30 م.'), hint: say('Probatu 1,5 m-ko makila 1 m-ko itzalarekin.', 'Prueba un palo de 1,5 m con sombra de 1 m.', 'جرّب عصا 1.5 م ظلها 1 م.'), isSolved: (state) => equals(treeHeight(state), n(30)) }
]

export const similarityLabChallengeIds: number[] = [
    ...solveChallenges,
    ...divideChallenges,
    ...thalesChallenges,
    ...rectanglesChallenges,
    ...homothetyChallenges,
    ...growthChallenges,
    ...mapChallenges,
    ...shadowsChallenges
].map((challenge) => challenge.id)
