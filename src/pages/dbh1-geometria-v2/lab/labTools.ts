import { checkAnswer, fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { freshAnswer, type LabChallenge, type LabToolInfo, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { GeometryIntroStageId } from '../lessons.tsx'

/* ==========================================================================
   Geometria (1. DBH) laboratory: protractor, triangle builder, Pythagoras'
   squares, area grid and the circle. Pure state logic and challenges;
   components live next to this file. Tests in tests/geometria-dbh1-lab.test.ts.
   ========================================================================== */

export type GeometryLabToolId = 'protractor' | 'triangle' | 'pythagoras' | 'area' | 'circle'

export interface GeometryLabTool extends LabToolInfo {
    id: GeometryLabToolId
    stage: GeometryIntroStageId
}

export const geometryLabTools: GeometryLabTool[] = [
    {
        id: 'protractor',
        stage: 'angles',
        lessonTopic: 'angles',
        title: { eu: 'Garraiagailua', es: 'Transportador', ar: 'المنقلة' },
        observe: {
            eu: 'Ireki angelua eta begiratu nola aldatzen den izena 90°-an eta 180°-an. Osagarriak 90° osatzen du, eta betegarriak 180°.',
            es: 'Abre el ángulo y mira cómo cambia su nombre en 90° y en 180°. El complementario completa 90° y el suplementario, 180°.',
            ar: 'افتح الزاوية ولاحظ كيف يتغيّر اسمها عند 90° و180°. المتممة تكمل 90° والمكملة 180°.'
        }
    },
    {
        id: 'triangle',
        stage: 'polygons',
        lessonTopic: 'triangles',
        title: { eu: 'Triangelu-sortzailea', es: 'Constructor de triángulos', ar: 'باني المثلثات' },
        observe: {
            eu: 'Aukeratu bi angelu: hirugarrena beti da falta dena 180° osatzeko. Bi angeluak 180° edo gehiago badira, ezin da triangelurik egin.',
            es: 'Elige dos ángulos: el tercero siempre es lo que falta para 180°. Si los dos suman 180° o más, no hay triángulo.',
            ar: 'اختر زاويتين: الثالثة دائمًا ما ينقص لإكمال 180°. وإذا كان مجموع الاثنتين 180° أو أكثر فلا يوجد مثلث.'
        }
    },
    {
        id: 'pythagoras',
        stage: 'pythagoras',
        lessonTopic: 'pythagoras-use',
        title: { eu: 'Pitagorasen karratuak', es: 'Los cuadrados de Pitágoras', ar: 'مربعات فيثاغورس' },
        observe: {
            eu: 'Katetoen gaineko bi karratu txikien azalerak batuta, hipotenusaren gaineko karratuaren azalera ematen dute. Haren aldea erro karratua da.',
            es: 'Las áreas de los dos cuadrados pequeños sobre los catetos suman el área del cuadrado sobre la hipotenusa. Su lado es la raíz cuadrada.',
            ar: 'مساحتا المربعين الصغيرين على الضلعين القائمين مجموعهما مساحة المربع على الوتر. وضلعه هو الجذر التربيعي.'
        }
    },
    {
        id: 'area',
        stage: 'areas',
        lessonTopic: 'area-triangle',
        title: { eu: 'Azalera-sarea', es: 'Cuadrícula de áreas', ar: 'شبكة المساحات' },
        observe: {
            eu: 'Zenbatu laukitxoak. Paralelogramoak bere laukizuzenaren azalera bera du; triangeluak, erdia.',
            es: 'Cuenta los cuadraditos. El paralelogramo tiene la misma área que su rectángulo; el triángulo, la mitad.',
            ar: 'عُدّ المربعات الصغيرة. لمتوازي الأضلاع مساحة مستطيله نفسها، وللمثلث نصفها.'
        }
    },
    {
        id: 'circle',
        stage: 'perimeters',
        lessonTopic: 'circumference',
        title: { eu: 'Zirkulua eta π', es: 'El círculo y π', ar: 'الدائرة وπ' },
        observe: {
            eu: 'Erradioa bikoizten baduzu, luzera bikoizten da, baina azalera lau aldiz handiagoa da: r karratu egiten baita.',
            es: 'Si duplicas el radio, la longitud se duplica, pero el área se hace cuatro veces mayor: el radio va al cuadrado.',
            ar: 'إذا ضاعفت نصف القطر تضاعف الطول، لكن المساحة تصبح أربعة أضعاف: لأن نصف القطر مربّع.'
        }
    }
]

export const geometryLabToolForTopic: Record<string, GeometryLabToolId | undefined> = {
    lines: 'protractor',
    angles: 'protractor',
    'angle-pairs': 'protractor',
    polygons: 'triangle',
    triangles: 'triangle',
    'triangle-lines': 'triangle',
    quadrilaterals: 'area',
    circle: 'circle',
    pythagoras: 'pythagoras',
    'pythagoras-use': 'pythagoras',
    units: 'area',
    perimeter: 'area',
    circumference: 'circle',
    'area-rectangles': 'area',
    'area-triangle': 'area',
    'area-circle': 'circle'
}

const answered = (state: OperationAnswer, expected: FractionValue) => checkAnswer(state.answer, expected) === 'correct'
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/* ---------- Protractor ---------- */

export type AngleKind = 'null' | 'acute' | 'right' | 'obtuse' | 'straight' | 'reflex' | 'full'

export function angleKind(degrees: number): AngleKind {
    if (degrees === 0) return 'null'
    if (degrees < 90) return 'acute'
    if (degrees === 90) return 'right'
    if (degrees < 180) return 'obtuse'
    if (degrees === 180) return 'straight'
    if (degrees < 360) return 'reflex'
    return 'full'
}

export interface ProtractorState {
    angle: number
    /** Angles already built, so challenges can ask for several */
    history: number[]
}

export const initialProtractorState: ProtractorState = { angle: 40, history: [40] }

export function setAngle(state: ProtractorState, angle: number): ProtractorState {
    const next = clamp(angle, 0, 360)
    return { angle: next, history: state.history.includes(next) ? state.history : [...state.history, next] }
}

export const protractorChallenges: LabChallenge<ProtractorState>[] = [
    {
        id: 9101,
        prompt: { eu: 'Egin angelu zuzen bat.', es: 'Construye un ángulo recto.', ar: 'ابنِ زاوية قائمة.' },
        hint: { eu: 'Angelu zuzena: 90°.', es: 'Ángulo recto: 90°.', ar: 'الزاوية القائمة: 90°.' },
        isSolved: (state) => state.angle === 90
    },
    {
        id: 9102,
        prompt: { eu: 'Egin 35°-ko angeluaren osagarria.', es: 'Construye el complementario de 35°.', ar: 'ابنِ متممة 35°.' },
        hint: { eu: '$90^{\\circ}-35^{\\circ}$', es: '$90^{\\circ}-35^{\\circ}$', ar: '$90^{\\circ}-35^{\\circ}$' },
        isSolved: (state) => state.angle === 55
    },
    {
        id: 9103,
        prompt: { eu: 'Egin 72°-ko angeluaren betegarria.', es: 'Construye el suplementario de 72°.', ar: 'ابنِ مكملة 72°.' },
        hint: { eu: '$180^{\\circ}-72^{\\circ}$', es: '$180^{\\circ}-72^{\\circ}$', ar: '$180^{\\circ}-72^{\\circ}$' },
        isSolved: (state) => state.angle === 108
    },
    {
        id: 9104,
        prompt: { eu: 'Egin angelu zorrotz bat, kamuts bat eta laua bat.', es: 'Construye un ángulo agudo, uno obtuso y uno llano.', ar: 'ابنِ زاوية حادة وأخرى منفرجة وأخرى مستقيمة.' },
        hint: { eu: '90°-tik behera, 90° eta 180° artean, eta 180°.', es: 'Por debajo de 90°, entre 90° y 180°, y 180°.', ar: 'أقل من 90°، وبين 90° و180°، و180°.' },
        isSolved: (state) => state.history.some((angle) => angleKind(angle) === 'acute') && state.history.some((angle) => angleKind(angle) === 'obtuse') && state.history.includes(180)
    }
]

/* ---------- Triangle builder ---------- */

export interface TriangleState {
    a: number
    b: number
}

export const initialTriangleState: TriangleState = { a: 60, b: 50 }

export const setTriangle = (state: TriangleState, patch: Partial<TriangleState>): TriangleState => ({ a: clamp(patch.a ?? state.a, 1, 179), b: clamp(patch.b ?? state.b, 1, 179) })

/** The third angle, or null when no triangle has those two angles */
export const thirdAngle = (state: TriangleState): number | null => (state.a + state.b < 180 ? 180 - state.a - state.b : null)

export type TriangleByAngles = 'acute' | 'right' | 'obtuse'
export type TriangleBySides = 'equilateral' | 'isosceles' | 'scalene'

export function classifyTriangle(state: TriangleState): { angles: TriangleByAngles; sides: TriangleBySides } | null {
    const c = thirdAngle(state)
    if (c === null) return null
    const angles = [state.a, state.b, c]
    const largest = Math.max(...angles)
    const distinct = new Set(angles).size
    return {
        angles: largest === 90 ? 'right' : largest > 90 ? 'obtuse' : 'acute',
        sides: distinct === 1 ? 'equilateral' : distinct === 2 ? 'isosceles' : 'scalene'
    }
}

export const triangleChallenges: LabChallenge<TriangleState>[] = [
    {
        id: 9201,
        prompt: { eu: 'Egin triangelu angeluzuzen bat.', es: 'Construye un triángulo rectángulo.', ar: 'ابنِ مثلثًا قائم الزاوية.' },
        hint: { eu: 'Angeluetako batek 90° izan behar du.', es: 'Uno de los ángulos tiene que medir 90°.', ar: 'يجب أن تكون إحدى الزوايا 90°.' },
        isSolved: (state) => classifyTriangle(state)?.angles === 'right'
    },
    {
        id: 9202,
        prompt: { eu: 'Egin triangelu aldeberdin bat.', es: 'Construye un triángulo equilátero.', ar: 'ابنِ مثلثًا متساوي الأضلاع.' },
        hint: { eu: 'Hiru angelu berdin: $180\\mathbin{:}3$.', es: 'Tres ángulos iguales: $180\\mathbin{:}3$.', ar: 'ثلاث زوايا متساوية: $180\\mathbin{:}3$.' },
        isSolved: (state) => classifyTriangle(state)?.sides === 'equilateral'
    },
    {
        id: 9203,
        prompt: { eu: 'Egin triangelu isoszele bat, angelu desberdina 40° duena.', es: 'Construye un triángulo isósceles con el ángulo desigual de 40°.', ar: 'ابنِ مثلثًا متساوي الساقين زاويته المختلفة 40°.' },
        hint: { eu: 'Beste biak berdinak: $(180-40)\\mathbin{:}2$.', es: 'Los otros dos iguales: $(180-40)\\mathbin{:}2$.', ar: 'الأخريان متساويتان: $(180-40)\\mathbin{:}2$.' },
        isSolved: (state) => [state.a, state.b, thirdAngle(state) ?? 0].sort((x, y) => x - y).join() === '40,70,70'
    },
    {
        id: 9204,
        prompt: { eu: 'Egin triangelu angelu-kamuts eta eskaleno bat.', es: 'Construye un triángulo obtusángulo y escaleno.', ar: 'ابنِ مثلثًا منفرج الزاوية ومختلف الأضلاع.' },
        hint: { eu: 'Angelu bat 90° baino handiagoa eta hiruak desberdinak.', es: 'Un ángulo de más de 90° y los tres distintos.', ar: 'زاوية أكبر من 90° والثلاث مختلفة.' },
        isSolved: (state) => { const kind = classifyTriangle(state); return kind?.angles === 'obtuse' && kind.sides === 'scalene' }
    }
]

/* ---------- Pythagoras' squares ---------- */

export const LEG_LIMITS = { min: 1, max: 15 } as const

export interface PythagorasState extends OperationAnswer {
    legA: number
    legB: number
    /** Leg pairs whose hypotenuse was written right */
    solved: string[]
}

export const initialPythagorasState: PythagorasState = { legA: 3, legB: 4, solved: [], ...freshAnswer }

export const hypotenuseSquare = (state: Pick<PythagorasState, 'legA' | 'legB'>) => state.legA ** 2 + state.legB ** 2
export const hypotenuse = (state: Pick<PythagorasState, 'legA' | 'legB'>) => Math.sqrt(hypotenuseSquare(state))
export const isWholeHypotenuse = (state: Pick<PythagorasState, 'legA' | 'legB'>) => Number.isInteger(hypotenuse(state))

export function setLegs(state: PythagorasState, patch: Partial<Pick<PythagorasState, 'legA' | 'legB'>>): PythagorasState {
    return { ...state, legA: clamp(patch.legA ?? state.legA, LEG_LIMITS.min, LEG_LIMITS.max), legB: clamp(patch.legB ?? state.legB, LEG_LIMITS.min, LEG_LIMITS.max), ...freshAnswer }
}

const pairKey = (state: Pick<PythagorasState, 'legA' | 'legB'>) => [state.legA, state.legB].sort((x, y) => x - y).join('-')

/** Only whole hypotenuses are asked: the learner writes it and it is recorded */
export function answerHypotenuse(state: PythagorasState, patch: Partial<OperationAnswer>): PythagorasState {
    const next = { ...state, ...patch }
    if (next.checked && !next.revealed && isWholeHypotenuse(next) && answered(next, fraction(hypotenuse(next))) && !next.solved.includes(pairKey(next))) {
        return { ...next, solved: [...next.solved, pairKey(next)] }
    }
    return next
}

export const pythagorasChallenges: LabChallenge<PythagorasState>[] = [
    {
        id: 9301,
        prompt: { eu: 'Katetoak 3 eta 4: idatzi hipotenusa.', es: 'Catetos 3 y 4: escribe la hipotenusa.', ar: 'الضلعان القائمان 3 و4: اكتب الوتر.' },
        hint: { eu: '$9+16=25$', es: '$9+16=25$', ar: '$9+16=25$' },
        isSolved: (state) => state.solved.includes('3-4')
    },
    {
        id: 9302,
        prompt: { eu: 'Katetoak 6 eta 8: idatzi hipotenusa.', es: 'Catetos 6 y 8: escribe la hipotenusa.', ar: 'الضلعان القائمان 6 و8: اكتب الوتر.' },
        hint: { eu: '$36+64=100$', es: '$36+64=100$', ar: '$36+64=100$' },
        isSolved: (state) => state.solved.includes('6-8')
    },
    {
        id: 9303,
        prompt: { eu: 'Katetoak 5 eta 12: idatzi hipotenusa.', es: 'Catetos 5 y 12: escribe la hipotenusa.', ar: 'الضلعان القائمان 5 و12: اكتب الوتر.' },
        hint: { eu: '$25+144=169$', es: '$25+144=169$', ar: '$25+144=169$' },
        isSolved: (state) => state.solved.includes('5-12')
    },
    {
        id: 9304,
        prompt: { eu: 'Aurkitu hipotenusa osoa duten beste bi kateto-bikote (ez 3-4, 6-8 edo 5-12) eta idatzi hipotenusak.', es: 'Encuentra otras dos parejas de catetos con hipotenusa entera (no 3-4, 6-8 ni 5-12) y escribe sus hipotenusas.', ar: 'جد زوجين آخرين من الضلعين القائمين وترهما عدد صحيح (غير 3-4 و6-8 و5-12) واكتب الوترين.' },
        hint: { eu: 'Probatu 9 eta 12, edo 8 eta 15.', es: 'Prueba 9 y 12, u 8 y 15.', ar: 'جرّب 9 و12، أو 8 و15.' },
        isSolved: (state) => state.solved.filter((key) => !['3-4', '6-8', '5-12'].includes(key)).length >= 2
    }
]

/* ---------- Area grid ---------- */

export type AreaShape = 'rectangle' | 'parallelogram' | 'triangle'

export const AREA_LIMITS = { min: 1, max: 10 } as const

export interface AreaState extends OperationAnswer {
    shape: AreaShape
    base: number
    height: number
    /** "shape-base-height" of areas written right */
    solved: string[]
}

export const initialAreaState: AreaState = { shape: 'rectangle', base: 6, height: 3, solved: [], ...freshAnswer }

export const areaOf = (state: Pick<AreaState, 'shape' | 'base' | 'height'>): FractionValue => (state.shape === 'triangle' ? fraction(state.base * state.height, 2) : fraction(state.base * state.height))

export function setArea(state: AreaState, patch: Partial<Pick<AreaState, 'shape' | 'base' | 'height'>>): AreaState {
    return { ...state, shape: patch.shape ?? state.shape, base: clamp(patch.base ?? state.base, AREA_LIMITS.min, AREA_LIMITS.max), height: clamp(patch.height ?? state.height, AREA_LIMITS.min, AREA_LIMITS.max), ...freshAnswer }
}

const areaKey = (state: Pick<AreaState, 'shape' | 'base' | 'height'>) => `${state.shape}-${state.base}-${state.height}`

export function answerArea(state: AreaState, patch: Partial<OperationAnswer>): AreaState {
    const next = { ...state, ...patch }
    if (next.checked && !next.revealed && answered(next, areaOf(next)) && !next.solved.includes(areaKey(next))) return { ...next, solved: [...next.solved, areaKey(next)] }
    return next
}

export const areaChallenges: LabChallenge<AreaState>[] = [
    {
        id: 9401,
        prompt: { eu: 'Laukizuzena: oinarria 6 eta altuera 3. Idatzi azalera.', es: 'Rectángulo de base 6 y altura 3. Escribe su área.', ar: 'مستطيل قاعدته 6 وارتفاعه 3. اكتب مساحته.' },
        hint: { eu: 'Zenbatu laukitxoak: 3 ilara 6ko.', es: 'Cuenta los cuadraditos: 3 filas de 6.', ar: 'عُدّ المربعات: 3 صفوف من 6.' },
        isSolved: (state) => state.solved.includes('rectangle-6-3')
    },
    {
        id: 9402,
        prompt: { eu: 'Paralelogramoa: oinarria 5 eta altuera 4. Idatzi azalera.', es: 'Paralelogramo de base 5 y altura 4. Escribe su área.', ar: 'متوازي أضلاع قاعدته 5 وارتفاعه 4. اكتب مساحته.' },
        hint: { eu: 'Laukizuzen bera bezala: oinarria · altuera.', es: 'Como su rectángulo: base · altura.', ar: 'مثل مستطيله: القاعدة · الارتفاع.' },
        isSolved: (state) => state.solved.includes('parallelogram-5-4')
    },
    {
        id: 9403,
        prompt: { eu: 'Triangelua: oinarria 6 eta altuera 3. Idatzi azalera.', es: 'Triángulo de base 6 y altura 3. Escribe su área.', ar: 'مثلث قاعدته 6 وارتفاعه 3. اكتب مساحته.' },
        hint: { eu: 'Laukizuzenaren erdia.', es: 'La mitad del rectángulo.', ar: 'نصف المستطيل.' },
        isSolved: (state) => state.solved.includes('triangle-6-3')
    },
    {
        id: 9404,
        prompt: { eu: 'Egin 12ko azalera duen triangelu bat eta idatzi azalera.', es: 'Construye un triángulo de área 12 y escribe su área.', ar: 'ابنِ مثلثًا مساحته 12 واكتب مساحته.' },
        hint: { eu: 'Oinarria · altuera 24 izan behar da.', es: 'Base · altura tiene que dar 24.', ar: 'يجب أن يكون القاعدة · الارتفاع = 24.' },
        isSolved: (state) => state.solved.some((key) => key.startsWith('triangle-') && Number(key.split('-')[1]) * Number(key.split('-')[2]) === 24)
    }
]

/* ---------- Circle ---------- */

export const PI = fraction(314, 100)
export const RADIUS_LIMITS = { min: 1, max: 30 } as const

export interface CircleState extends OperationAnswer {
    radius: number
    ask: 'length' | 'area'
}

export const initialCircleState: CircleState = { radius: 5, ask: 'length', ...freshAnswer }

export const circleLength = (radius: number): FractionValue => fraction(2 * 314 * radius, 100)
export const circleArea = (radius: number): FractionValue => fraction(314 * radius * radius, 100)
export const circleExpected = (state: Pick<CircleState, 'radius' | 'ask'>) => (state.ask === 'length' ? circleLength(state.radius) : circleArea(state.radius))

export function setCircle(state: CircleState, patch: Partial<Pick<CircleState, 'radius' | 'ask'>>): CircleState {
    return { ...state, radius: clamp(patch.radius ?? state.radius, RADIUS_LIMITS.min, RADIUS_LIMITS.max), ask: patch.ask ?? state.ask, ...freshAnswer }
}

export const circleChallenges: LabChallenge<CircleState>[] = [
    {
        id: 9501,
        prompt: { eu: 'Erradioa 5: idatzi zirkunferentziaren luzera.', es: 'Radio 5: escribe la longitud de la circunferencia.', ar: 'نصف القطر 5: اكتب طول الدائرة.' },
        hint: { eu: '$2\\cdot 3{,}14\\cdot 5$', es: '$2\\cdot 3{,}14\\cdot 5$', ar: '$2\\cdot 3.14\\cdot 5$' },
        isSolved: (state) => state.radius === 5 && state.ask === 'length' && answered(state, circleLength(5))
    },
    {
        id: 9502,
        prompt: { eu: 'Erradioa 10: idatzi zirkuluaren azalera.', es: 'Radio 10: escribe el área del círculo.', ar: 'نصف القطر 10: اكتب مساحة القرص.' },
        hint: { eu: '$3{,}14\\cdot 10^{2}$', es: '$3{,}14\\cdot 10^{2}$', ar: '$3.14\\cdot 10^{2}$' },
        isSolved: (state) => state.radius === 10 && state.ask === 'area' && answered(state, circleArea(10))
    },
    {
        id: 9503,
        prompt: { eu: 'Diametroa 60 (bizikleta-gurpila): idatzi luzera.', es: 'Diámetro 60 (rueda de bici): escribe la longitud.', ar: 'القطر 60 (عجلة دراجة): اكتب الطول.' },
        hint: { eu: 'Erradioa diametroaren erdia da.', es: 'El radio es la mitad del diámetro.', ar: 'نصف القطر نصف القطر الكامل.' },
        isSolved: (state) => state.radius === 30 && state.ask === 'length' && answered(state, circleLength(30))
    },
    {
        id: 9504,
        prompt: { eu: 'Erradioa 2: idatzi azalera. Gero bikoiztu erradioa eta idatzi berriro. Zenbat aldiz handitu da?', es: 'Radio 2: escribe el área. Después duplica el radio y escríbela otra vez. ¿Cuántas veces ha crecido?', ar: 'نصف القطر 2: اكتب المساحة. ثم ضاعف نصف القطر واكتبها مجددًا. كم مرة كبرت؟' },
        hint: { eu: '$3{,}14\\cdot 4$ eta $3{,}14\\cdot 16$.', es: '$3{,}14\\cdot 4$ y $3{,}14\\cdot 16$.', ar: '$3.14\\cdot 4$ و$3.14\\cdot 16$.' },
        isSolved: (state) => state.radius === 4 && state.ask === 'area' && answered(state, circleArea(4))
    }
]

export const geometryLabChallengeIds: number[] = [
    ...protractorChallenges,
    ...triangleChallenges,
    ...pythagorasChallenges,
    ...areaChallenges,
    ...circleChallenges
].map((challenge) => challenge.id)
