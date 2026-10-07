import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { PythagorasStageId } from '../lessons.tsx'

/* ==========================================================================
   Pitagorasen teorema (2. DBH) laboratory: the squares on the sides of a
   right triangle; three sides that close (or not) into an acute, right or
   obtuse triangle; finding the hypotenuse or a leg; the right triangle
   hidden in isosceles triangles, rectangles, rhombi, trapezoids and
   hexagons; chords and tangents; the diagonal of a box; and distances on a
   grid. Every length is a whole number, so every square is exact and a
   root is either whole or written as √n ≈ …. Pure state logic; the
   components live next to this file. Tests in tests/pitagoras-dbh2-lab.test.ts.
   ========================================================================== */

export type PythagorasLabToolId = 'squares' | 'classify' | 'solve' | 'figure' | 'circle' | 'box' | 'grid'

export interface PythagorasLabTool extends LabToolInfo {
    id: PythagorasLabToolId
    stage: PythagorasStageId
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

export const pythagorasLabTools: PythagorasLabTool[] = [
    { id: 'squares', stage: 'theorem', lessonTopic: 'squares', title: say('Karratuak aldeetan', 'Cuadrados sobre los lados', 'مربعات على الأضلاع'), observe: say('Aldatu katetoak: karratu handiaren laukiak beti dira beste bien laukien batura. Hipotenusa zenbaki osoa denean, hirukote pitagoriko bat aurkitu duzu.', 'Cambia los catetos: los cuadraditos del cuadrado grande siempre son la suma de los de los otros dos. Cuando la hipotenusa sale entera, has encontrado una terna pitagórica.', 'غيّر الضلعين القائمين: مربعات المربع الكبير الصغيرة تساوي دائمًا مجموع مربعات الآخرين. وحين يخرج الوتر عددًا صحيحًا تكون قد وجدت ثلاثية فيثاغورية.') },
    { id: 'classify', stage: 'sides', lessonTopic: 'classify', title: say('Hiru alde, zer triangelu?', 'Tres lados, ¿qué triángulo?', 'ثلاثة أضلاع، أي مثلث؟'), observe: say('Konparatu alde handienaren karratua beste bien karratuen baturarekin: txikiagoa bada angelu-zorrotza, berdina bada angeluzuzena, handiagoa bada angelu-kamutsa.', 'Compara el cuadrado del lado mayor con la suma de los cuadrados de los otros dos: si es menor, acutángulo; si es igual, rectángulo; si es mayor, obtusángulo.', 'قارن مربع الضلع الأكبر بمجموع مربعي الآخرين: إن كان أصغر فحاد، وإن ساواه فقائم، وإن كان أكبر فمنفرج.') },
    { id: 'solve', stage: 'sides', lessonTopic: 'hypotenuse', title: say('Hipotenusa ala katetoa', 'Hipotenusa o cateto', 'الوتر أو الضلع القائم'), observe: say('Hipotenusa bilatzeko karratuak batu; katetoa bilatzeko kendu. Katetoa beti da hipotenusa baino laburragoa.', 'Para la hipotenusa se suman los cuadrados; para un cateto se restan. El cateto siempre es más corto que la hipotenusa.', 'للوتر نجمع المربعين؛ وللضلع القائم نطرح. الضلع القائم أقصر دائمًا من الوتر.') },
    { id: 'figure', stage: 'plane', lessonTopic: 'diagonals', title: say('Triangelu ezkutatua', 'El triángulo escondido', 'المثلث المخفي'), observe: say('Irudi bakoitzean triangelu angeluzuzen bat dago ezkutatuta: oinarri-erdia, diagonal-erdiak, oinarrien kenduraren erdia edo alde-erdia dira haren katetoetako bat.', 'En cada figura hay un triángulo rectángulo escondido: la media base, las semidiagonales, la mitad de la diferencia de las bases o medio lado son uno de sus catetos.', 'في كل شكل مثلث قائم مخفي: نصف القاعدة أو نصفا القطرين أو نصف فرق القاعدتين أو نصف الضلع أحد ضلعيه القائمين.') },
    { id: 'circle', stage: 'circle', lessonTopic: 'chord', title: say('Kordak eta ukitzaileak', 'Cuerdas y tangentes', 'الأوتار والمماسات'), observe: say('Korda zentrotik urrundu ahala laburtzen da. Ukitzailean, angelu zuzena ukitze-puntuan dago eta zentrorako distantzia hipotenusa da.', 'La cuerda se acorta al alejarse del centro. En la tangente, el ángulo recto está en el punto de tangencia y la distancia al centro es la hipotenusa.', 'يقصر الوتر كلما ابتعد عن المركز. وفي المماس تكون الزاوية القائمة عند نقطة التماس والبعد عن المركز هو الوتر.') },
    { id: 'box', stage: 'space', lessonTopic: 'box', title: say('Kaxaren diagonala', 'La diagonal de la caja', 'قطر الصندوق'), observe: say('Lehenik oinarriaren diagonala, gero diagonal handia: hiru dimentsioen karratuak batzea bezala da.', 'Primero la diagonal de la base, luego la grande: es como sumar los cuadrados de las tres dimensiones.', 'أولًا قطر القاعدة ثم القطر الكبير: كأننا نجمع مربعات الأبعاد الثلاثة.') },
    { id: 'grid', stage: 'space', lessonTopic: 'grid', title: say('Distantziak sarean', 'Distancias en la cuadrícula', 'المسافات على الشبكة'), observe: say('Zenbatu laukiak horizontalean eta bertikalean: katetoak dira, eta zuzenkia hipotenusa.', 'Cuenta los cuadros en horizontal y en vertical: son los catetos, y el segmento es la hipotenusa.', 'عُدّ المربعات أفقيًا وعموديًا: إنها الضلعان القائمان، والقطعة هي الوتر.') }
]

export const pythagorasLabToolForTopic: Record<string, PythagorasLabToolId | undefined> = {
    squares: 'squares',
    formula: 'squares',
    triples: 'squares',
    hypotenuse: 'solve',
    leg: 'solve',
    classify: 'classify',
    'triangle-height': 'figure',
    diagonals: 'figure',
    trapezoid: 'figure',
    apothem: 'figure',
    chord: 'circle',
    tangent: 'circle',
    box: 'box',
    grid: 'grid',
    problems: 'solve'
}

/* ---------- 1. Squares on the sides ---------- */

export const LEG_MAX = 12

export interface SquaresState {
    b: number
    c: number
}

export const initialSquaresState: SquaresState = { b: 3, c: 2 }

export const setSquares = (state: SquaresState, patch: Partial<SquaresState>): SquaresState => ({
    b: clamp(patch.b ?? state.b, 1, LEG_MAX),
    c: clamp(patch.c ?? state.c, 1, LEG_MAX)
})

export const hypotenuseSquare = (state: SquaresState) => state.b * state.b + state.c * state.c

export const squaresChallenges: LabChallenge<SquaresState>[] = [
    { id: 23101, prompt: say('Lortu 25 laukiko karratu handi bat.', 'Consigue un cuadrado grande de 25 cuadraditos.', 'احصل على مربع كبير من 25 مربعًا صغيرًا.'), hint: say('$9+16=25$.', '$9+16=25$.', '$9+16=25$.'), isSolved: (state) => hypotenuseSquare(state) === 25 },
    { id: 23102, prompt: say('Bi kateto berdinekin, lortu 50 laukiko karratu handia.', 'Con los dos catetos iguales, consigue un cuadrado grande de 50.', 'بضلعين قائمين متساويين، احصل على مربع كبير من 50.'), hint: say('$25+25$.', '$25+25$.', '$25+25$.'), isSolved: (state) => state.b === state.c && hypotenuseSquare(state) === 50 },
    { id: 23103, prompt: say('Aurkitu 13 hipotenusa zehatza ematen duten katetoak.', 'Encuentra los catetos que dan una hipotenusa exacta de 13.', 'أوجد الضلعين القائمين اللذين يعطيان وترًا دقيقًا 13.'), hint: say('$169=25+144$.', '$169=25+144$.', '$169=25+144$.'), isSolved: (state) => hypotenuseSquare(state) === 169 },
    { id: 23104, prompt: say('Aurkitu 15 hipotenusa zehatza ematen duten katetoak.', 'Encuentra los catetos que dan una hipotenusa exacta de 15.', 'أوجد الضلعين القائمين اللذين يعطيان وترًا دقيقًا 15.'), hint: say('3, 4, 5 hirukotea bider 3.', 'La terna 3, 4, 5 por 3.', 'الثلاثية 3، 4، 5 مضروبة في 3.'), isSolved: (state) => hypotenuseSquare(state) === 225 }
]

/* ---------- 2. Three sides: what triangle? ---------- */

export const SIDE_MAX = 30

export interface ClassifyState {
    a: number
    b: number
    c: number
}

export const initialClassifyState: ClassifyState = { a: 6, b: 8, c: 9 }

export const setClassify = (state: ClassifyState, patch: Partial<ClassifyState>): ClassifyState => ({
    a: clamp(patch.a ?? state.a, 1, SIDE_MAX),
    b: clamp(patch.b ?? state.b, 1, SIDE_MAX),
    c: clamp(patch.c ?? state.c, 1, SIDE_MAX)
})

/** The sides sorted from the largest down */
export const sortedSides = (state: ClassifyState): [number, number, number] => {
    const [big, middle, small] = [state.a, state.b, state.c].sort((x, y) => y - x)
    return [big, middle, small]
}

export type TriangleKind = 'impossible' | 'acute' | 'right' | 'obtuse'

export function triangleKind(state: ClassifyState): TriangleKind {
    const [big, middle, small] = sortedSides(state)
    if (big >= middle + small) return 'impossible'
    const difference = big * big - (middle * middle + small * small)
    return difference === 0 ? 'right' : difference < 0 ? 'acute' : 'obtuse'
}

export const classifyChallenges: LabChallenge<ClassifyState>[] = [
    { id: 23201, prompt: say('Eraiki triangelu angeluzuzen bat, alde handiena 17 duena.', 'Construye un triángulo rectángulo cuyo lado mayor sea 17.', 'أنشئ مثلثًا قائمًا أكبر أضلاعه 17.'), hint: say('$289=64+225$.', '$289=64+225$.', '$289=64+225$.'), isSolved: (state) => triangleKind(state) === 'right' && sortedSides(state)[0] === 17 },
    { id: 23202, prompt: say('Eraiki triangelu angeluzuzen bat, alde bat 24 duena.', 'Construye un triángulo rectángulo con un lado de 24.', 'أنشئ مثلثًا قائمًا أحد أضلاعه 24.'), hint: say('Probatu 7, 24, 25 edo 3, 4, 5 bider 6.', 'Prueba 7, 24, 25 o 3, 4, 5 por 6.', 'جرّب 7، 24، 25 أو 3، 4، 5 مضروبة في 6.'), isSolved: (state) => triangleKind(state) === 'right' && [state.a, state.b, state.c].includes(24) },
    { id: 23203, prompt: say('Eraiki triangelu angelu-kamuts bat, alde handiena 10 duena.', 'Construye un triángulo obtusángulo cuyo lado mayor sea 10.', 'أنشئ مثلثًا منفرج الزاوية أكبر أضلاعه 10.'), hint: say('Beste bien karratuek 100 baino gutxiago batu behar dute, baina aldeek 10 baino gehiago.', 'Los cuadrados de los otros dos tienen que sumar menos de 100, pero los lados más de 10.', 'يجب أن يكون مجموع مربعي الآخرين أقل من 100، ومجموع الضلعين أكثر من 10.'), isSolved: (state) => triangleKind(state) === 'obtuse' && sortedSides(state)[0] === 10 },
    { id: 23204, prompt: say('Aukeratu itxi ezin diren hiru alde.', 'Elige tres lados que no se pueden cerrar.', 'اختر ثلاثة أضلاع لا يمكن أن تنغلق.'), hint: say('Alde handiena beste bien batura edo handiagoa.', 'El lado mayor igual o mayor que la suma de los otros dos.', 'الضلع الأكبر يساوي مجموع الآخرين أو أكبر.'), isSolved: (state) => triangleKind(state) === 'impossible' }
]

/* ---------- 3. Hypotenuse or leg ---------- */

export type Unknown = 'hypotenuse' | 'leg'
export const SOLVE_MAX = 30

export interface SolveState {
    unknown: Unknown
    /** A leg in both modes */
    first: number
    /** The other leg, or the hypotenuse when a leg is unknown */
    second: number
}

export const initialSolveState: SolveState = { unknown: 'hypotenuse', first: 6, second: 8 }

export function setSolve(state: SolveState, patch: Partial<SolveState>): SolveState {
    const unknown = patch.unknown ?? state.unknown
    let first = clamp(patch.first ?? state.first, 1, unknown === 'leg' ? SOLVE_MAX - 1 : SOLVE_MAX)
    let second = clamp(patch.second ?? state.second, unknown === 'leg' ? 2 : 1, SOLVE_MAX)
    // The hypotenuse is always longer than the known leg: the side just moved wins
    if (unknown === 'leg' && second <= first) {
        if (patch.second !== undefined && patch.first === undefined) first = second - 1
        else second = first + 1
    }
    return { unknown, first, second }
}

/** The square of the unknown side */
export const unknownSquare = (state: SolveState) =>
    state.unknown === 'hypotenuse' ? state.first * state.first + state.second * state.second : state.second * state.second - state.first * state.first

export const solveChallenges: LabChallenge<SolveState>[] = [
    { id: 23301, prompt: say('Lortu 25 hipotenusa zehatza.', 'Consigue una hipotenusa exacta de 25.', 'احصل على وتر دقيق 25.'), hint: say('$625=225+400$ edo $49+576$.', '$625=225+400$ o $49+576$.', '$625=225+400$ أو $49+576$.'), isSolved: (state) => state.unknown === 'hypotenuse' && unknownSquare(state) === 625 },
    { id: 23302, prompt: say('Hipotenusa 13 dela, lortu 12 katetoa.', 'Con hipotenusa 13, consigue un cateto de 12.', 'مع وتر 13، احصل على ضلع قائم 12.'), hint: say('$169-25=144$.', '$169-25=144$.', '$169-25=144$.'), isSolved: (state) => state.unknown === 'leg' && state.second === 13 && unknownSquare(state) === 144 },
    { id: 23303, prompt: say('Lortu 24 kateto zehatza.', 'Consigue un cateto exacto de 24.', 'احصل على ضلع قائم دقيق 24.'), hint: say('Hipotenusa 25 eta kateto bat 7.', 'Hipotenusa 25 y un cateto de 7.', 'الوتر 25 وضلع قائم 7.'), isSolved: (state) => state.unknown === 'leg' && unknownSquare(state) === 576 },
    { id: 23304, prompt: say('Lortu 7 eta 8 arteko hipotenusa (ez zehatza).', 'Consigue una hipotenusa entre 7 y 8 (no exacta).', 'احصل على وتر بين 7 و8 (غير دقيق).'), hint: say('Karratuen batura 49 eta 64 artean.', 'La suma de cuadrados entre 49 y 64.', 'مجموع المربعين بين 49 و64.'), isSolved: (state) => state.unknown === 'hypotenuse' && unknownSquare(state) > 49 && unknownSquare(state) < 64 }
]

/* ---------- 4. The hidden right triangle ---------- */

export type FigureShape = 'isosceles' | 'rectangle' | 'rhombus' | 'trapezoid' | 'hexagon'
export const FIGURE_SHAPES: FigureShape[] = ['isosceles', 'rectangle', 'rhombus', 'trapezoid', 'hexagon']

export interface FigureParam {
    key: 'p' | 'q' | 'r'
    min: number
    max: number
    step: number
}

/** Which measures each figure uses; halves are always whole because those measures go in steps of 2 */
export const figureParams: Record<FigureShape, FigureParam[]> = {
    // base, equal side
    isosceles: [{ key: 'p', min: 2, max: 24, step: 2 }, { key: 'q', min: 2, max: 20, step: 1 }],
    // base, height
    rectangle: [{ key: 'p', min: 1, max: 16, step: 1 }, { key: 'q', min: 1, max: 12, step: 1 }],
    // the two diagonals
    rhombus: [{ key: 'p', min: 2, max: 30, step: 2 }, { key: 'q', min: 2, max: 24, step: 2 }],
    // big base, small base, slanted side
    trapezoid: [{ key: 'p', min: 4, max: 30, step: 2 }, { key: 'q', min: 2, max: 28, step: 2 }, { key: 'r', min: 2, max: 20, step: 1 }],
    // side
    hexagon: [{ key: 'p', min: 2, max: 20, step: 2 }]
}

const figureStart: Record<FigureShape, { p: number; q: number; r: number }> = {
    isosceles: { p: 10, q: 8, r: 0 },
    rectangle: { p: 8, q: 4, r: 0 },
    rhombus: { p: 16, q: 8, r: 0 },
    trapezoid: { p: 20, q: 8, r: 9 },
    hexagon: { p: 8, q: 0, r: 0 }
}

export interface FigureState {
    shape: FigureShape
    p: number
    q: number
    r: number
}

export const initialFigureState: FigureState = { shape: 'rectangle', ...figureStart.rectangle }

const stepped = (value: number, param: FigureParam) => Math.min(param.max, Math.max(param.min, param.min + Math.round((value - param.min) / param.step) * param.step))

export function setFigure(state: FigureState, patch: Partial<FigureState>): FigureState {
    const shape = patch.shape ?? state.shape
    const base = patch.shape && patch.shape !== state.shape ? { shape, ...figureStart[shape] } : { ...state, ...patch, shape }
    const next = { ...base }
    for (const param of figureParams[shape]) next[param.key] = stepped(next[param.key], param)
    // The small base of a trapezoid stays below the big one
    if (shape === 'trapezoid' && next.q >= next.p) next.q = next.p - 2
    return next
}

export interface HiddenTriangle {
    /** The two legs and the hypotenuse of the right triangle inside; one of them is unknown */
    legs: [number | null, number | null]
    hypotenuse: number | null
    /** Square of the unknown side (it may be ≤ 0 when the figure cannot be built) */
    unknownSquare: number
}

export function hiddenTriangle(state: FigureState): HiddenTriangle {
    const { p, q, r } = state
    switch (state.shape) {
        case 'isosceles':
            return { legs: [p / 2, null], hypotenuse: q, unknownSquare: q * q - (p / 2) ** 2 }
        case 'rectangle':
            return { legs: [p, q], hypotenuse: null, unknownSquare: p * p + q * q }
        case 'rhombus':
            return { legs: [p / 2, q / 2], hypotenuse: null, unknownSquare: (p / 2) ** 2 + (q / 2) ** 2 }
        case 'trapezoid':
            return { legs: [(p - q) / 2, null], hypotenuse: r, unknownSquare: r * r - ((p - q) / 2) ** 2 }
        case 'hexagon':
            return { legs: [p / 2, null], hypotenuse: p, unknownSquare: p * p - (p / 2) ** 2 }
    }
}

export const figureBuilds = (state: FigureState) => hiddenTriangle(state).unknownSquare > 0

export const figureChallenges: LabChallenge<FigureState>[] = [
    { id: 23401, prompt: say('Lortu 13 diagonala duen laukizuzena.', 'Consigue un rectángulo de diagonal 13.', 'احصل على مستطيل قطره 13.'), hint: say('12 eta 5.', '12 y 5.', '12 و5.'), isSolved: (state) => state.shape === 'rectangle' && hiddenTriangle(state).unknownSquare === 169 },
    { id: 23402, prompt: say('Lortu 13 aldea duen erronboa.', 'Consigue un rombo de lado 13.', 'احصل على معيّن ضلعه 13.'), hint: say('Diagonalak 24 eta 10.', 'Diagonales de 24 y 10.', 'قطران 24 و10.'), isSolved: (state) => state.shape === 'rhombus' && hiddenTriangle(state).unknownSquare === 169 },
    { id: 23403, prompt: say('Lortu 12 altuera duen triangelu isoszelea.', 'Consigue un triángulo isósceles de altura 12.', 'احصل على مثلث متساوي الساقين ارتفاعه 12.'), hint: say('Alde berdinak 13 eta oinarria 10.', 'Lados iguales de 13 y base de 10.', 'ساقان 13 وقاعدة 10.'), isSolved: (state) => state.shape === 'isosceles' && hiddenTriangle(state).unknownSquare === 144 },
    { id: 23404, prompt: say('Lortu 8 altuera duen trapezio isoszelea.', 'Consigue un trapecio isósceles de altura 8.', 'احصل على شبه منحرف متساوي الساقين ارتفاعه 8.'), hint: say('Oinarriak 22 eta 10, alde zeiharra 10.', 'Bases de 22 y 10, lado oblicuo de 10.', 'قاعدتان 22 و10 وضلع مائل 10.'), isSolved: (state) => state.shape === 'trapezoid' && hiddenTriangle(state).unknownSquare === 64 },
    { id: 23405, prompt: say('Lortu $\\sqrt{75}$ apotema duen hexagonoa.', 'Consigue el hexágono de apotema $\\sqrt{75}$.', 'احصل على المسدس الذي عامده $\\sqrt{75}$.'), hint: say('$l^{2}-\\left(\\frac{l}{2}\\right)^{2}=75$.', '$l^{2}-\\left(\\frac{l}{2}\\right)^{2}=75$.', '$l^{2}-\\left(\\frac{l}{2}\\right)^{2}=75$.'), isSolved: (state) => state.shape === 'hexagon' && hiddenTriangle(state).unknownSquare === 75 }
]

/* ---------- 5. Chords and tangents ---------- */

export type CircleMode = 'chord' | 'tangent'
export const CIRCLE_RADIUS_MAX = 15
export const TANGENT_MAX = 30

export interface CircleState {
    mode: CircleMode
    r: number
    /** Distance from the centre to the chord, or length of the tangent segment */
    d: number
}

export const initialCircleState: CircleState = { mode: 'chord', r: 10, d: 4 }

export function setCircle(state: CircleState, patch: Partial<CircleState>): CircleState {
    const mode = patch.mode ?? state.mode
    const r = clamp(patch.r ?? state.r, 1, CIRCLE_RADIUS_MAX)
    const d = clamp(patch.d ?? state.d, mode === 'chord' ? 0 : 1, mode === 'chord' ? r - 1 : TANGENT_MAX)
    return { mode, r, d }
}

/** Square of half the chord, or square of the distance OP */
export const circleSquare = (state: CircleState) => (state.mode === 'chord' ? state.r * state.r - state.d * state.d : state.r * state.r + state.d * state.d)

/** The chord, when the half chord is whole */
export const chordLength = (state: CircleState) => {
    const half = exactRoot(circleSquare(state))
    return half === null ? null : 2 * half
}

export const circleChallenges: LabChallenge<CircleState>[] = [
    { id: 23501, prompt: say('Lortu 16 kordako zuzena, zentrotik pasatu gabe.', 'Consigue una cuerda de 16 que no pase por el centro.', 'احصل على وتر طوله 16 لا يمر بالمركز.'), hint: say('Korda-erdia 8: $10^{2}-6^{2}=64$.', 'Media cuerda 8: $10^{2}-6^{2}=64$.', 'نصف الوتر 8: $10^{2}-6^{2}=64$.'), isSolved: (state) => state.mode === 'chord' && state.d > 0 && chordLength(state) === 16 },
    { id: 23502, prompt: say('Lortu 24 kordako zuzena.', 'Consigue una cuerda de 24.', 'احصل على وتر طوله 24.'), hint: say('Korda-erdia 12: $13^{2}-5^{2}$ edo $15^{2}-9^{2}$.', 'Media cuerda 12: $13^{2}-5^{2}$ o $15^{2}-9^{2}$.', 'نصف الوتر 12: $13^{2}-5^{2}$ أو $15^{2}-9^{2}$.'), isSolved: (state) => state.mode === 'chord' && chordLength(state) === 24 },
    { id: 23503, prompt: say('Zuzenki ukitzailearekin, jarri $P$ zentrotik 13ra.', 'Con el segmento tangente, pon $P$ a 13 del centro.', 'بقطعة المماس، ضع $P$ على بعد 13 من المركز.'), hint: say('$5^{2}+12^{2}=169$.', '$5^{2}+12^{2}=169$.', '$5^{2}+12^{2}=169$.'), isSolved: (state) => state.mode === 'tangent' && circleSquare(state) === 169 },
    { id: 23504, prompt: say('10 erradioarekin, jarri $P$ zentrotik 26ra.', 'Con radio 10, pon $P$ a 26 del centro.', 'مع نصف قطر 10، ضع $P$ على بعد 26 من المركز.'), hint: say('$26^{2}-10^{2}=576$.', '$26^{2}-10^{2}=576$.', '$26^{2}-10^{2}=576$.'), isSolved: (state) => state.mode === 'tangent' && state.r === 10 && circleSquare(state) === 676 }
]

/* ---------- 6. The diagonal of a box ---------- */

export const BOX_MAX = 12

export interface BoxState {
    a: number
    b: number
    c: number
}

export const initialBoxState: BoxState = { a: 4, b: 3, c: 2 }

export const setBox = (state: BoxState, patch: Partial<BoxState>): BoxState => ({
    a: clamp(patch.a ?? state.a, 1, BOX_MAX),
    b: clamp(patch.b ?? state.b, 1, BOX_MAX),
    c: clamp(patch.c ?? state.c, 1, BOX_MAX)
})

export const baseSquare = (state: BoxState) => state.a * state.a + state.b * state.b
export const spaceSquare = (state: BoxState) => baseSquare(state) + state.c * state.c

export const boxChallenges: LabChallenge<BoxState>[] = [
    { id: 23601, prompt: say('Lortu 7 diagonala duen kaxa.', 'Consigue una caja de diagonal 7.', 'احصل على صندوق قطره 7.'), hint: say('$4+9+36=49$.', '$4+9+36=49$.', '$4+9+36=49$.'), isSolved: (state) => spaceSquare(state) === 49 },
    { id: 23602, prompt: say('Lortu 13 diagonala duen kaxa.', 'Consigue una caja de diagonal 13.', 'احصل على صندوق قطره 13.'), hint: say('Oinarria 3 × 4 eta altuera 12.', 'Base de 3 × 4 y altura 12.', 'قاعدة 3 × 4 وارتفاع 12.'), isSolved: (state) => spaceSquare(state) === 169 },
    { id: 23603, prompt: say('Lortu 9 diagonala duen kaxa.', 'Consigue una caja de diagonal 9.', 'احصل على صندوق قطره 9.'), hint: say('$1+16+64$ edo $16+16+49$.', '$1+16+64$ o $16+16+49$.', '$1+16+64$ أو $16+16+49$.'), isSolved: (state) => spaceSquare(state) === 81 },
    { id: 23604, prompt: say('Eraiki 10eko ertza duen kuboa.', 'Construye un cubo de arista 10.', 'أنشئ مكعبًا طول حرفه 10.'), hint: say('Hiru dimentsioak berdinak.', 'Las tres dimensiones iguales.', 'الأبعاد الثلاثة متساوية.'), isSolved: (state) => state.a === 10 && state.b === 10 && state.c === 10 }
]

/* ---------- 7. Distances on a grid ---------- */

export const GRID_MAX = 12

export interface GridState {
    x1: number
    y1: number
    x2: number
    y2: number
}

export const initialGridState: GridState = { x1: 1, y1: 1, x2: 5, y2: 3 }

export const setGrid = (state: GridState, patch: Partial<GridState>): GridState => ({
    x1: clamp(patch.x1 ?? state.x1, 0, GRID_MAX),
    y1: clamp(patch.y1 ?? state.y1, 0, GRID_MAX),
    x2: clamp(patch.x2 ?? state.x2, 0, GRID_MAX),
    y2: clamp(patch.y2 ?? state.y2, 0, GRID_MAX)
})

export const gridSteps = (state: GridState) => ({ dx: Math.abs(state.x2 - state.x1), dy: Math.abs(state.y2 - state.y1) })
export const gridSquare = (state: GridState) => {
    const { dx, dy } = gridSteps(state)
    return dx * dx + dy * dy
}
const slanted = (state: GridState) => {
    const { dx, dy } = gridSteps(state)
    return dx > 0 && dy > 0
}

export const gridChallenges: LabChallenge<GridState>[] = [
    { id: 23701, prompt: say('Jarri $A$ eta $B$ 5era, zuzenki zeiharrarekin.', 'Pon $A$ y $B$ a distancia 5, con un segmento inclinado.', 'ضع $A$ و$B$ على مسافة 5 بقطعة مائلة.'), hint: say('3 eta 4 lauki.', '3 y 4 cuadros.', '3 و4 مربعات.'), isSolved: (state) => slanted(state) && gridSquare(state) === 25 },
    { id: 23702, prompt: say('Jarri $A$ eta $B$ 10era, zuzenki zeiharrarekin.', 'Pon $A$ y $B$ a distancia 10, con un segmento inclinado.', 'ضع $A$ و$B$ على مسافة 10 بقطعة مائلة.'), hint: say('6 eta 8 lauki.', '6 y 8 cuadros.', '6 و8 مربعات.'), isSolved: (state) => slanted(state) && gridSquare(state) === 100 },
    { id: 23703, prompt: say('Jarri $A$ eta $B$ 13ra, zuzenki zeiharrarekin.', 'Pon $A$ y $B$ a distancia 13, con un segmento inclinado.', 'ضع $A$ و$B$ على مسافة 13 بقطعة مائلة.'), hint: say('5 eta 12 lauki.', '5 y 12 cuadros.', '5 و12 مربعًا.'), isSolved: (state) => slanted(state) && gridSquare(state) === 169 },
    { id: 23704, prompt: say('Lortu $\\sqrt{50}$ distantzia.', 'Consigue una distancia de $\\sqrt{50}$.', 'احصل على مسافة $\\sqrt{50}$.'), hint: say('$1+49$ edo $25+25$.', '$1+49$ o $25+25$.', '$1+49$ أو $25+25$.'), isSolved: (state) => gridSquare(state) === 50 }
]

export const pythagorasLabChallengeIds = [
    ...squaresChallenges,
    ...classifyChallenges,
    ...solveChallenges,
    ...figureChallenges,
    ...circleChallenges,
    ...boxChallenges,
    ...gridChallenges
].map((challenge) => challenge.id)
