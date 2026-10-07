import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { SolidsStageId } from '../lessons.tsx'

/* ==========================================================================
   Gorputz geometrikoak (2. DBH) laboratory: prisms, pyramids and frustums
   with any number of sides (faces, edges, vertices and Euler); the five
   regular polyhedra; a box and its net; a square pyramid and its apothem;
   cylinder, cone and sphere with π ≈ 3,14; a tank measured in litres; and
   the volume of prisms, pyramids, cylinders, cones and spheres. Areas and
   volumes with π are kept as a whole coefficient times π, so challenges
   never compare floating numbers. Pure state logic; the components live
   next to this file. Tests in tests/gorputzak-dbh2-lab.test.ts.
   ========================================================================== */

export type SolidsLabToolId = 'polyhedron' | 'platonic' | 'box' | 'pyramid' | 'round' | 'tank' | 'volume'

export interface SolidsLabTool extends LabToolInfo {
    id: SolidsLabToolId
    stage: SolidsStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string) => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** The square root of a whole number when it is whole, otherwise null */
export const exactRoot = (square: number): number | null => {
    if (square < 0) return null
    const root = Math.round(Math.sqrt(square))
    return root * root === square ? root : null
}

/** A value given in hundredths, written with the decimal comma: 18840 → 188,4 */
export const fromHundredths = (hundredths: number) => {
    const sign = hundredths < 0 ? '-' : ''
    const whole = Math.floor(Math.abs(hundredths) / 100)
    const rest = Math.abs(hundredths) % 100
    if (rest === 0) return `${sign}${whole}`
    return `${sign}${whole},${String(rest).padStart(2, '0').replace(/0$/, '')}`
}
/** k · 3,14 written with the comma (k whole) */
export const timesPi = (k: number) => fromHundredths(k * 314)

export const solidsLabTools: SolidsLabTool[] = [
    { id: 'polyhedron', stage: 'polyhedra', lessonTopic: 'elements', title: say('Prismak eta piramideak', 'Prismas y pirámides', 'المناشير والأهرامات'), observe: say('Oinarriari alde bat gehitzean, prismak aurpegi 1, 3 ertz eta 2 erpin irabazten ditu; piramideak aurpegi 1, 2 ertz eta erpin 1. Eulerren formula beti betetzen da.', 'Al añadir un lado a la base, el prisma gana 1 cara, 3 aristas y 2 vértices; la pirámide, 1 cara, 2 aristas y 1 vértice. La fórmula de Euler se cumple siempre.', 'عند إضافة ضلع إلى القاعدة يكسب المنشور وجهًا و3 أحرف ورأسين؛ ويكسب الهرم وجهًا وحرفين ورأسًا. وتتحقق صيغة أويلر دائمًا.') },
    { id: 'platonic', stage: 'polyhedra', lessonTopic: 'regular', title: say('Bost poliedro erregularrak', 'Los cinco poliedros regulares', 'متعددات الأوجه المنتظمة الخمسة'), observe: say('Biratu poliedroa eta zenbatu: erpin bakoitzean aurpegi kopuru bera dago, eta angeluen batura 360° baino txikiagoa da beti.', 'Gira el poliedro y cuenta: en cada vértice hay el mismo número de caras, y la suma de ángulos siempre es menor que 360°.', 'أدر متعدد الأوجه وعُدّ: عند كل رأس العدد نفسه من الأوجه، ومجموع الزوايا دائمًا أقل من 360°.') },
    { id: 'box', stage: 'areas', lessonTopic: 'prism-area', title: say('Kaxa eta haren garapena', 'La caja y su desarrollo', 'الصندوق ونشره'), observe: say('Garapenean laukizuzenak binaka berdinak dira. Kuboan sei karratu berdin daude.', 'En el desarrollo los rectángulos son iguales dos a dos. En el cubo hay seis cuadrados iguales.', 'في النشر المستطيلات متطابقة مثنى مثنى. وفي المكعب ستة مربعات متطابقة.') },
    { id: 'pyramid', stage: 'areas', lessonTopic: 'pyramid-area', title: say('Piramidearen apotema', 'La apotema de la pirámide', 'عامد الهرم'), observe: say('Altuera eta aldearen erdia katetoak dira; apotema hipotenusa da, beraz beti altuera baino luzeagoa.', 'La altura y medio lado son los catetos; la apotema es la hipotenusa, así que siempre es más larga que la altura.', 'الارتفاع ونصف الضلع ضلعان قائمان؛ والعامد هو الوتر، فهو دائمًا أطول من الارتفاع.') },
    { id: 'round', stage: 'round', lessonTopic: 'cylinder', title: say('Zilindroa, konoa eta esfera', 'Cilindro, cono y esfera', 'الأسطوانة والمخروط والكرة'), observe: say('Zilindroaren garapena laukizuzen bat da, konoarena sektore bat. Esferaren azalera erradio bereko zilindroaren alboko azalera da, altuera diametroa izanik.', 'El desarrollo del cilindro es un rectángulo y el del cono un sector. El área de la esfera es la lateral del cilindro del mismo radio y de altura el diámetro.', 'نشر الأسطوانة مستطيل ونشر المخروط قطاع. ومساحة الكرة هي المساحة الجانبية لأسطوانة لها نصف القطر نفسه وارتفاعها القطر.') },
    { id: 'tank', stage: 'units', lessonTopic: 'capacity', title: say('Depositua litrotan', 'El depósito en litros', 'الخزان باللترات'), observe: say('Dezimetrotan neurtzen bada, dezimetro kubiko bakoitza litro bat da. 1000 litro metro kubiko bat dira.', 'Si se mide en decímetros, cada decímetro cúbico es un litro. 1000 litros son un metro cúbico.', 'إذا قيس بالديسيمتر فكل ديسيمتر مكعب لتر. و1000 لتر متر مكعب.') },
    { id: 'volume', stage: 'volume', lessonTopic: 'prism-volume', title: say('Bolumenak konparatu', 'Comparar volúmenes', 'مقارنة الحجوم'), observe: say('Oinarri eta altuera berekin, piramideak prismaren herena du eta konoak zilindroarena. Esferak zilindro zirkunskribatuaren bi heren.', 'Con igual base y altura, la pirámide tiene un tercio del prisma y el cono un tercio del cilindro. La esfera, dos tercios del cilindro circunscrito.', 'بالقاعدة والارتفاع نفسيهما للهرم ثلث المنشور وللمخروط ثلث الأسطوانة. وللكرة ثلثا الأسطوانة المحيطة.') }
]

export const solidsLabToolForTopic: Record<string, SolidsLabToolId | undefined> = {
    elements: 'polyhedron',
    euler: 'polyhedron',
    regular: 'platonic',
    'prism-area': 'box',
    'pyramid-area': 'pyramid',
    'frustum-area': 'pyramid',
    cylinder: 'round',
    cone: 'round',
    sphere: 'round',
    'volume-units': 'tank',
    capacity: 'tank',
    cavalieri: 'tank',
    'prism-volume': 'volume',
    'pyramid-volume': 'volume',
    'sphere-volume': 'volume'
}

/* ---------- 1. Prisms and pyramids ---------- */

export type PolyhedronKind = 'prism' | 'pyramid' | 'frustum'
export const BASE_MIN = 3
export const BASE_MAX = 10

export interface PolyhedronState {
    kind: PolyhedronKind
    n: number
}

export const initialPolyhedronState: PolyhedronState = { kind: 'prism', n: 5 }

export const setPolyhedron = (state: PolyhedronState, patch: Partial<PolyhedronState>): PolyhedronState => ({
    kind: patch.kind ?? state.kind,
    n: clamp(patch.n ?? state.n, BASE_MIN, BASE_MAX)
})

export function polyhedronCounts({ kind, n }: PolyhedronState) {
    if (kind === 'pyramid') return { faces: n + 1, edges: 2 * n, vertices: n + 1 }
    return { faces: n + 2, edges: 3 * n, vertices: 2 * n }
}

export const polyhedronChallenges: LabChallenge<PolyhedronState>[] = [
    { id: 25101, prompt: say('Bilatu 18 ertzeko prisma bat.', 'Busca un prisma de 18 aristas.', 'ابحث عن منشور له 18 حرفًا.'), hint: say('Prismak $3n$ ertz ditu.', 'Un prisma tiene $3n$ aristas.', 'للمنشور $3n$ حرفًا.'), isSolved: (state) => state.kind === 'prism' && polyhedronCounts(state).edges === 18 },
    { id: 25102, prompt: say('Bilatu 7 erpineko piramide bat.', 'Busca una pirámide de 7 vértices.', 'ابحث عن هرم له 7 رؤوس.'), hint: say('Oinarriko erpinak gehi bat.', 'Los vértices de la base más uno.', 'رؤوس القاعدة زائد واحد.'), isSolved: (state) => state.kind === 'pyramid' && polyhedronCounts(state).vertices === 7 },
    { id: 25103, prompt: say('Bilatu 20 ertzeko piramide bat.', 'Busca una pirámide de 20 aristas.', 'ابحث عن هرم له 20 حرفًا.'), hint: say('Piramideak $2n$ ertz ditu.', 'Una pirámide tiene $2n$ aristas.', 'للهرم $2n$ حرفًا.'), isSolved: (state) => state.kind === 'pyramid' && polyhedronCounts(state).edges === 20 },
    { id: 25104, prompt: say('Bilatu 9 aurpegiko piramide-enbor bat.', 'Busca un tronco de pirámide de 9 caras.', 'ابحث عن جذع هرم له 9 أوجه.'), hint: say('Enborrak prismak bezainbeste aurpegi ditu: $n+2$.', 'Un tronco tiene tantas caras como un prisma: $n+2$.', 'للجذع عدد أوجه المنشور: $n+2$.'), isSolved: (state) => state.kind === 'frustum' && polyhedronCounts(state).faces === 9 }
]

/* ---------- 2. The five regular polyhedra ---------- */

export type PlatonicId = 'tetra' | 'cube' | 'octa' | 'dodeca' | 'icosa'
export const PLATONIC_IDS: PlatonicId[] = ['tetra', 'cube', 'octa', 'dodeca', 'icosa']

export const platonicData: Record<PlatonicId, { faces: number; edges: number; vertices: number; sides: number; perVertex: number }> = {
    tetra: { faces: 4, edges: 6, vertices: 4, sides: 3, perVertex: 3 },
    cube: { faces: 6, edges: 12, vertices: 8, sides: 4, perVertex: 3 },
    octa: { faces: 8, edges: 12, vertices: 6, sides: 3, perVertex: 4 },
    dodeca: { faces: 12, edges: 30, vertices: 20, sides: 5, perVertex: 3 },
    icosa: { faces: 20, edges: 30, vertices: 12, sides: 3, perVertex: 5 }
}

/** Interior angle of the regular polygon of the faces */
export const faceAngle = (id: PlatonicId) => ((platonicData[id].sides - 2) * 180) / platonicData[id].sides
export const vertexAngleSum = (id: PlatonicId) => platonicData[id].perVertex * faceAngle(id)

export interface PlatonicState {
    solid: PlatonicId
    /** Turn around the vertical axis, in steps of 15° */
    turn: number
}

export const initialPlatonicState: PlatonicState = { solid: 'cube', turn: 0 }

export const setPlatonic = (state: PlatonicState, patch: Partial<PlatonicState>): PlatonicState => ({
    solid: patch.solid ?? state.solid,
    turn: ((Math.round(patch.turn ?? state.turn) % 24) + 24) % 24
})

export const platonicChallenges: LabChallenge<PlatonicState>[] = [
    { id: 25201, prompt: say('Aukeratu aurpegi pentagonalak dituen poliedroa.', 'Elige el poliedro de caras pentagonales.', 'اختر متعدد الأوجه ذا الأوجه الخماسية.'), hint: say('12 aurpegi ditu.', 'Tiene 12 caras.', 'له 12 وجهًا.'), isSolved: (state) => state.solid === 'dodeca' },
    { id: 25202, prompt: say('Aukeratu erpin bakoitzean 4 triangelu elkartzen dituen poliedroa.', 'Elige el poliedro con 4 triángulos en cada vértice.', 'اختر متعدد الأوجه الذي يلتقي عند كل رأس منه 4 مثلثات.'), hint: say('$4\\cdot 60°=240°$.', '$4\\cdot 60°=240°$.', '$4\\cdot 60°=240°$.'), isSolved: (state) => state.solid === 'octa' },
    { id: 25203, prompt: say('Aukeratu 30 ertz eta 12 erpin dituen poliedroa.', 'Elige el poliedro de 30 aristas y 12 vértices.', 'اختر متعدد الأوجه ذا 30 حرفًا و12 رأسًا.'), hint: say('Euler: $20+12=30+2$.', 'Euler: $20+12=30+2$.', 'أويلر: $20+12=30+2$.'), isSolved: (state) => state.solid === 'icosa' },
    { id: 25204, prompt: say('Aukeratu erpinetan 300° batzen dituen poliedroa eta biratu erdi bira.', 'Elige el poliedro que suma 300° en cada vértice y gíralo media vuelta.', 'اختر متعدد الأوجه الذي مجموع زواياه عند كل رأس 300° وأدره نصف دورة.'), hint: say('Bost triangelu; erdi bira 180° da.', 'Cinco triángulos; media vuelta son 180°.', 'خمسة مثلثات؛ نصف الدورة 180°.'), isSolved: (state) => vertexAngleSum(state.solid) === 300 && state.turn === 12 }
]

/* ---------- 3. A box and its net ---------- */

export const BOX_MAX = 10

export interface BoxState {
    a: number
    b: number
    c: number
}

export const initialBoxState: BoxState = { a: 5, b: 2, c: 2 }

export const setBox = (state: BoxState, patch: Partial<BoxState>): BoxState => ({
    a: clamp(patch.a ?? state.a, 1, BOX_MAX),
    b: clamp(patch.b ?? state.b, 1, BOX_MAX),
    c: clamp(patch.c ?? state.c, 1, BOX_MAX)
})

/** Lateral area (the four faces round the height c) and total area */
export const boxLateral = ({ a, b, c }: BoxState) => 2 * (a + b) * c
export const boxTotal = ({ a, b, c }: BoxState) => 2 * (a * b + a * c + b * c)

export const boxChallenges: LabChallenge<BoxState>[] = [
    { id: 25301, prompt: say('Egin 94 cm²-ko azalera osoko kaxa bat.', 'Haz una caja de 94 cm² de área total.', 'اصنع صندوقًا مساحته الكلية 94 سم².'), hint: say('Probatu 5, 4 eta 3.', 'Prueba 5, 4 y 3.', 'جرّب 5 و4 و3.'), isSolved: (state) => boxTotal(state) === 94 },
    { id: 25302, prompt: say('Egin 150 cm²-ko kubo bat.', 'Haz un cubo de 150 cm².', 'اصنع مكعبًا مساحته 150 سم².'), hint: say('$6\\cdot l^{2}=150$.', '$6\\cdot l^{2}=150$.', '$6\\cdot l^{2}=150$.'), isSolved: (state) => state.a === state.b && state.b === state.c && boxTotal(state) === 150 },
    { id: 25303, prompt: say('Egin 52 cm²-ko kaxa bat, hiru neurri desberdinekin.', 'Haz una caja de 52 cm² con las tres medidas distintas.', 'اصنع صندوقًا مساحته 52 سم² بثلاثة أبعاد مختلفة.'), hint: say('$2\\cdot (6+8+12)=52$.', '$2\\cdot (6+8+12)=52$.', '$2\\cdot (6+8+12)=52$.'), isSolved: (state) => new Set([state.a, state.b, state.c]).size === 3 && boxTotal(state) === 52 },
    { id: 25304, prompt: say('Egin kaxa bat non alboko azalera 2 oinarrien azalera bezainbestekoa den.', 'Haz una caja cuya área lateral sea igual a la de las 2 bases.', 'اصنع صندوقًا مساحته الجانبية تساوي مساحة القاعدتين.'), hint: say('$2(a+b)c=2ab$; probatu $a=b=4$ eta $c=2$.', '$2(a+b)c=2ab$; prueba $a=b=4$ y $c=2$.', '$2(a+b)c=2ab$؛ جرّب $a=b=4$ و$c=2$.'), isSolved: (state) => boxLateral(state) === 2 * state.a * state.b }
]

/* ---------- 4. A square pyramid and its apothem ---------- */

export const PYRAMID_SIDE_MAX = 20
export const PYRAMID_HEIGHT_MAX = 16

export interface PyramidState {
    /** Side of the square base; always even so that half the side is whole */
    side: number
    height: number
}

export const initialPyramidState: PyramidState = { side: 8, height: 5 }

export const setPyramid = (state: PyramidState, patch: Partial<PyramidState>): PyramidState => ({
    side: clamp((patch.side ?? state.side) / 2, 1, PYRAMID_SIDE_MAX / 2) * 2,
    height: clamp(patch.height ?? state.height, 1, PYRAMID_HEIGHT_MAX)
})

export const apothemSquare = ({ side, height }: PyramidState) => height * height + (side / 2) * (side / 2)
/** Lateral area when the apothem is whole, otherwise null */
export const pyramidLateral = (state: PyramidState) => {
    const apothem = exactRoot(apothemSquare(state))
    return apothem === null ? null : 2 * state.side * apothem
}
export const pyramidTotal = (state: PyramidState) => {
    const lateral = pyramidLateral(state)
    return lateral === null ? null : lateral + state.side * state.side
}

export const pyramidChallenges: LabChallenge<PyramidState>[] = [
    { id: 25401, prompt: say('Lortu 13 cm-ko apotema zehatza.', 'Consigue una apotema exacta de 13 cm.', 'احصل على عامد دقيق طوله 13 سم.'), hint: say('$13^{2}=12^{2}+5^{2}$.', '$13^{2}=12^{2}+5^{2}$.', '$13^{2}=12^{2}+5^{2}$.'), isSolved: (state) => apothemSquare(state) === 169 },
    { id: 25402, prompt: say('Egin 96 cm²-ko azalera osoko piramide bat.', 'Haz una pirámide de 96 cm² de área total.', 'اصنع هرمًا مساحته الكلية 96 سم².'), hint: say('6 cm-ko oinarria eta 4 cm-ko altuera.', 'Base de 6 cm y altura de 4 cm.', 'قاعدة 6 سم وارتفاع 4 سم.'), isSolved: (state) => pyramidTotal(state) === 96 },
    { id: 25403, prompt: say('Egin 360 cm²-ko azalera osoko piramide bat.', 'Haz una pirámide de 360 cm² de área total.', 'اصنع هرمًا مساحته الكلية 360 سم².'), hint: say('$100+260$.', '$100+260$.', '$100+260$.'), isSolved: (state) => pyramidTotal(state) === 360 },
    { id: 25404, prompt: say('Lortu 17 cm-ko apotema zehatza, 16 cm-ko oinarriarekin.', 'Consigue una apotema exacta de 17 cm con una base de 16 cm.', 'احصل على عامد دقيق 17 سم بقاعدة 16 سم.'), hint: say('$17^{2}-8^{2}=225$.', '$17^{2}-8^{2}=225$.', '$17^{2}-8^{2}=225$.'), isSolved: (state) => state.side === 16 && apothemSquare(state) === 289 }
]

/* ---------- 5. Cylinder, cone and sphere ---------- */

export type RoundBody = 'cylinder' | 'cone' | 'sphere'
export const ROUND_MAX = 12

export interface RoundState {
    body: RoundBody
    r: number
    h: number
}

export const initialRoundState: RoundState = { body: 'cylinder', r: 3, h: 5 }

export const setRound = (state: RoundState, patch: Partial<RoundState>): RoundState => ({
    body: patch.body ?? state.body,
    r: clamp(patch.r ?? state.r, 1, ROUND_MAX),
    h: clamp(patch.h ?? state.h, 1, ROUND_MAX)
})

export const generatrixSquare = ({ r, h }: RoundState) => r * r + h * h

/** Lateral area as a multiple of π (null when the cone's generatrix is not whole) */
export function roundLateralPi(state: RoundState): number | null {
    if (state.body === 'cylinder') return 2 * state.r * state.h
    if (state.body === 'sphere') return 4 * state.r * state.r
    const g = exactRoot(generatrixSquare(state))
    return g === null ? null : state.r * g
}
/** Total area as a multiple of π */
export function roundTotalPi(state: RoundState): number | null {
    const lateral = roundLateralPi(state)
    if (lateral === null) return null
    if (state.body === 'cylinder') return lateral + 2 * state.r * state.r
    if (state.body === 'cone') return lateral + state.r * state.r
    return lateral
}

export const roundChallenges: LabChallenge<RoundState>[] = [
    { id: 25501, prompt: say('Egin $188{,}4$ cm²-ko alboko azalerako zilindro bat.', 'Haz un cilindro de $188{,}4$ cm² de área lateral.', 'اصنع أسطوانة مساحتها الجانبية $188{,}4$ سم².'), hint: say('$2rh=60$.', '$2rh=60$.', '$2rh=60$.'), isSolved: (state) => state.body === 'cylinder' && roundLateralPi(state) === 60 },
    { id: 25502, prompt: say('Egin 10 cm-ko sortzaile zehatzeko kono bat.', 'Haz un cono de generatriz exacta 10 cm.', 'اصنع مخروطًا راسمه الدقيق 10 سم.'), hint: say('$6^{2}+8^{2}=100$.', '$6^{2}+8^{2}=100$.', '$6^{2}+8^{2}=100$.'), isSolved: (state) => state.body === 'cone' && generatrixSquare(state) === 100 },
    { id: 25503, prompt: say('Egin 314 cm²-ko esfera bat.', 'Haz una esfera de 314 cm².', 'اصنع كرة مساحتها 314 سم².'), hint: say('$4r^{2}=100$.', '$4r^{2}=100$.', '$4r^{2}=100$.'), isSolved: (state) => state.body === 'sphere' && roundLateralPi(state) === 100 },
    { id: 25504, prompt: say('Egin zilindro bat non alboko azalera bi oinarrien azalera bezainbestekoa den.', 'Haz un cilindro cuya área lateral sea igual a la de las dos bases.', 'اصنع أسطوانة مساحتها الجانبية تساوي مساحة القاعدتين.'), hint: say('$2\\pi r h=2\\pi r^{2}$.', '$2\\pi r h=2\\pi r^{2}$.', '$2\\pi r h=2\\pi r^{2}$.'), isSolved: (state) => state.body === 'cylinder' && state.r === state.h }
]

/* ---------- 6. The tank in litres ---------- */

export const TANK_MAX = 20

export interface TankState {
    /** Length, width and height in decimetres */
    a: number
    b: number
    c: number
}

export const initialTankState: TankState = { a: 6, b: 4, c: 5 }

export const setTank = (state: TankState, patch: Partial<TankState>): TankState => ({
    a: clamp(patch.a ?? state.a, 1, TANK_MAX),
    b: clamp(patch.b ?? state.b, 1, TANK_MAX),
    c: clamp(patch.c ?? state.c, 1, TANK_MAX)
})

/** Litres = cubic decimetres */
export const tankLitres = ({ a, b, c }: TankState) => a * b * c

export const tankChallenges: LabChallenge<TankState>[] = [
    { id: 25601, prompt: say('Egin metro kubiko bateko kubo bat.', 'Haz un cubo de un metro cúbico.', 'اصنع مكعبًا حجمه متر مكعب.'), hint: say('1 m = 10 dm.', '1 m = 10 dm.', '1 m = 10 dm.'), isSolved: (state) => state.a === state.b && state.b === state.c && tankLitres(state) === 1000 },
    { id: 25602, prompt: say('Egin 60 L-ko depositu bat, 5 dm-ko altuerarekin.', 'Haz un depósito de 60 L con 5 dm de altura.', 'اصنع خزانًا سعته 60 لترًا وارتفاعه 5 دسم.'), hint: say('Oinarriak 12 dm² behar ditu.', 'La base necesita 12 dm².', 'تحتاج القاعدة إلى 12 دسم².'), isSolved: (state) => state.c === 5 && tankLitres(state) === 60 },
    { id: 25603, prompt: say('Egin 1 m³-ko depositu bat, kuboa ez dena.', 'Haz un depósito de 1 m³ que no sea un cubo.', 'اصنع خزانًا حجمه 1 م³ ليس مكعبًا.'), hint: say('$20\\cdot 10\\cdot 5=1000$.', '$20\\cdot 10\\cdot 5=1000$.', '$20\\cdot 10\\cdot 5=1000$.'), isSolved: (state) => tankLitres(state) === 1000 && !(state.a === state.b && state.b === state.c) },
    { id: 25604, prompt: say('Egin $2{,}4$ m³-ko depositu bat.', 'Haz un depósito de $2{,}4$ m³.', 'اصنع خزانًا حجمه $2{,}4$ م³.'), hint: say('2400 L, adibidez $20\\cdot 12\\cdot 10$.', '2400 L, por ejemplo $20\\cdot 12\\cdot 10$.', '2400 L، مثلًا $20\\cdot 12\\cdot 10$.'), isSolved: (state) => tankLitres(state) === 2400 }
]

/* ---------- 7. Comparing volumes ---------- */

export type VolumeBody = 'prism' | 'pyramid' | 'cylinder' | 'cone' | 'sphere'
export const VOLUME_MAX = 12

export interface VolumeState {
    body: VolumeBody
    /** Side of the square base, or radius */
    r: number
    h: number
}

export const initialVolumeState: VolumeState = { body: 'pyramid', r: 6, h: 5 }

export const setVolume = (state: VolumeState, patch: Partial<VolumeState>): VolumeState => ({
    body: patch.body ?? state.body,
    r: clamp(patch.r ?? state.r, 1, VOLUME_MAX),
    h: clamp(patch.h ?? state.h, 1, VOLUME_MAX)
})

/** Volume as a fraction num / 3, times π for round bodies */
export function volumeThirds(state: VolumeState): { thirds: number; pi: boolean } {
    const { r, h } = state
    switch (state.body) {
        case 'prism': return { thirds: 3 * r * r * h, pi: false }
        case 'pyramid': return { thirds: r * r * h, pi: false }
        case 'cylinder': return { thirds: 3 * r * r * h, pi: true }
        case 'cone': return { thirds: r * r * h, pi: true }
        case 'sphere': return { thirds: 4 * r * r * r, pi: true }
    }
}

/** Volume in hundredths of a unit, rounded (π ≈ 3,14), and whether it is exact */
export function volumeHundredths(state: VolumeState): { value: number; exact: boolean } {
    const { thirds, pi } = volumeThirds(state)
    const numerator = thirds * (pi ? 314 : 100)
    return { value: Math.round(numerator / 3), exact: numerator % 3 === 0 }
}

export const volumeChallenges: LabChallenge<VolumeState>[] = [
    { id: 25701, prompt: say('Egin 400 cm³-ko piramide bat.', 'Haz una pirámide de 400 cm³.', 'اصنع هرمًا حجمه 400 سم³.'), hint: say('$10^{2}\\cdot 12\\mathbin{:}3$.', '$10^{2}\\cdot 12\\mathbin{:}3$.', '$10^{2}\\cdot 12\\mathbin{:}3$.'), isSolved: (state) => state.body === 'pyramid' && volumeThirds(state).thirds === 1200 },
    { id: 25702, prompt: say('Egin $37{,}68$ cm³-ko kono bat.', 'Haz un cono de $37{,}68$ cm³.', 'اصنع مخروطًا حجمه $37{,}68$ سم³.'), hint: say('$r^{2}h=36$.', '$r^{2}h=36$.', '$r^{2}h=36$.'), isSolved: (state) => state.body === 'cone' && volumeThirds(state).thirds === 36 },
    { id: 25703, prompt: say('Egin $113{,}04$ cm³-ko esfera bat.', 'Haz una esfera de $113{,}04$ cm³.', 'اصنع كرة حجمها $113{,}04$ سم³.'), hint: say('$r^{3}=27$.', '$r^{3}=27$.', '$r^{3}=27$.'), isSolved: (state) => state.body === 'sphere' && state.r === 3 },
    { id: 25704, prompt: say('Egin 3 cm-ko erradioko esferaren bolumen bera duen zilindro bat.', 'Haz un cilindro con el mismo volumen que la esfera de 3 cm de radio.', 'اصنع أسطوانة لها حجم الكرة التي نصف قطرها 3 سم.'), hint: say('$\\pi r^{2}h=36\\pi$.', '$\\pi r^{2}h=36\\pi$.', '$\\pi r^{2}h=36\\pi$.'), isSolved: (state) => state.body === 'cylinder' && state.r * state.r * state.h === 36 }
]

export const solidsLabChallengeIds = [
    ...polyhedronChallenges,
    ...platonicChallenges,
    ...boxChallenges,
    ...pyramidChallenges,
    ...roundChallenges,
    ...tankChallenges,
    ...volumeChallenges
].map((challenge) => challenge.id)
