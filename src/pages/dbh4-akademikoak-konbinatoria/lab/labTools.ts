import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import type { CombinatoricsAkStageId } from '../lessons.tsx'

/* ==========================================================================
   Konbinatoria (4. DBH akademikoak) laboratory: a tree with up to three
   levels, slots filled with or without repetition, a quotient of
   factorials, the orders of letters with repetitions, choosing k of n
   points, the triangle of Tartaglia and paths on a grid. Every count is a
   whole number computed exactly. Pure state logic; the components live
   next to this file. Tests in tests/konbinatoria-dbh4ak-lab.test.ts.
   ========================================================================== */

export type CombinatoricsAkLabToolId = 'tree' | 'factorial' | 'slots' | 'letters' | 'choose' | 'pascal' | 'grid'

export interface CombinatoricsAkLabTool extends LabToolInfo {
    id: CombinatoricsAkLabToolId
    stage: CombinatoricsAkStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const setAt = <T,>(list: T[], index: number, value: T) => list.map((item, position) => (position === index ? value : item))

/** n! for small n */
export const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
/** C(n, k), exact for the sizes used here */
export function choose(n: number, k: number): number {
    if (k < 0 || k > n) return 0
    let value = 1
    for (let i = 1; i <= k; i += 1) value = (value * (n - k + i)) / i
    return Math.round(value)
}

export const combinatoricsAkLabTools: CombinatoricsAkLabTool[] = [
    { id: 'tree', stage: 'counting', lessonTopic: 'tree', title: say('Zuhaitza eraikitzen', 'Construye el árbol', 'ابنِ الشجرة'), observe: say('Maila bakoitzean adar kopurua biderkatu egiten da: amaierak kopuru horien biderkadura dira. Maila baten adarrak bikoiztuz gero, amaierak ere bikoizten dira.', 'En cada nivel se multiplica el número de ramas: los extremos son el producto de esos números. Si se duplican las ramas de un nivel, también se duplican los extremos.', 'في كل مستوى يُضرب عدد الفروع: النهايات جداء تلك الأعداد. وإذا ضوعفت فروع مستوى تضاعفت النهايات أيضًا.') },
    { id: 'factorial', stage: 'counting', lessonTopic: 'factorial', title: say('Faktorialak sinplifikatzen', 'Simplifica factoriales', 'اختصر المضاريب'), observe: say('a! zati b! egitean, b!-ren faktore guztiak desagertzen dira, eta b + 1-etik a-ra artekoak geratzen dira: a − b faktore.', 'Al dividir a! entre b!, desaparecen todos los factores de b!, y quedan los de b + 1 a a: a − b factores.', 'عند قسمة a! على b! تختفي كل عوامل b! وتبقى العوامل من b + 1 إلى a: أي a − b عاملًا.') },
    { id: 'slots', stage: 'variations', lessonTopic: 'variations', title: say('Laukiak betetzen', 'Llena las casillas', 'املأ الخانات'), observe: say('Errepikatuz, lauki guztiek n aukera dituzte: nᵏ. Errepikatu gabe, lauki bakoitzak aurrekoak baino bat gutxiago; lauki gehiago badaude elementuak baino, ez dago erarik.', 'Repitiendo, todas las casillas tienen n opciones: nᵏ. Sin repetir, cada casilla tiene una menos que la anterior; si hay más casillas que elementos, no hay ninguna forma.', 'مع التكرار لكل الخانات n خيارًا: nᵏ. ودون تكرار لكل خانة خيار أقل من السابقة؛ وإذا زادت الخانات على العناصر فلا طريقة.') },
    { id: 'letters', stage: 'permutations', lessonTopic: 'repeated', title: say('Letren ordenak', 'Órdenes de letras', 'ترتيبات الأحرف'), observe: say('Letra guztiak desberdinak badira, n! ordena. Letra bat errepikatzean, haren kopien arteko trukeek ez dute ordena berririk ematen: zatitu haien faktorialez.', 'Si todas las letras son distintas, n! órdenes. Al repetir una letra, cambiar sus copias entre sí no da órdenes nuevos: divide entre sus factoriales.', 'إذا كانت الأحرف كلها مختلفة فهناك n! ترتيبًا. وعند تكرار حرف لا يعطي تبديل نسخه ترتيبًا جديدًا: اقسم على مضاريبها.') },
    { id: 'choose', stage: 'combinations', lessonTopic: 'combinations', title: say('n-tik k aukeratzen', 'Elige k de n', 'اختر k من n'), observe: say('Aldakuntzek talde bakoitza k! aldiz zenbatzen dute; konbinazioek behin. k aukeratzea n − k uztea da: C(n, k) = C(n, n − k).', 'Las variaciones cuentan cada grupo k! veces; las combinaciones, una. Elegir k es dejar n − k: C(n, k) = C(n, n − k).', 'التراتيب تعدّ كل مجموعة k! مرة، والتوافيق مرة واحدة. اختيار k هو ترك n − k: C(n, k) = C(n, n − k).') },
    { id: 'pascal', stage: 'combinations', lessonTopic: 'pascal', title: say('Tartagliaren triangelua', 'El triángulo de Tartaglia', 'مثلث تارتاليا'), observe: say('Zenbaki bakoitza gaineko bien batura da, eta n. lerroaren k. lekua C(n, k) da. Lerroa simetrikoa da eta 2ⁿ batzen du.', 'Cada número es la suma de los dos de encima, y el lugar k de la fila n es C(n, k). La fila es simétrica y suma 2ⁿ.', 'كل عدد مجموع العددين فوقه، والموضع k من الصف n هو C(n, k). والصف متماثل ومجموعه 2ⁿ.') },
    { id: 'grid', stage: 'problems', lessonTopic: 'geometry', title: say('Sareko bideak', 'Caminos en la cuadrícula', 'المسارات في الشبكة'), observe: say('Bide bakoitzak w urrats eskuinera eta h gora ditu. Bide bat aukeratzea w + h urratsetatik zeintzuk diren gora aukeratzea da: C(w + h, h).', 'Cada camino tiene w pasos a la derecha y h hacia arriba. Elegir un camino es elegir cuáles de los w + h pasos son hacia arriba: C(w + h, h).', 'لكل مسار w خطوة يمينًا وh خطوة أعلى. اختيار مسار هو اختيار أي الخطوات w + h إلى الأعلى: C(w + h, h).') }
]

export const combinatoricsAkLabToolForTopic: Record<string, CombinatoricsAkLabToolId | undefined> = {
    tree: 'tree',
    product: 'tree',
    factorial: 'factorial',
    'with-repetition': 'slots',
    variations: 'slots',
    conditions: 'slots',
    permutations: 'letters',
    restricted: 'letters',
    repeated: 'letters',
    combinations: 'choose',
    binomial: 'choose',
    pascal: 'pascal',
    'which-model': 'slots',
    geometry: 'grid',
    committees: 'choose'
}

/* ---------- 1. A tree with up to three levels ---------- */

export const TREE_LEVELS_MAX = 3
export const BRANCHES_MAX = 4

export interface TreeState {
    levels: number
    branches: number[]
}

export const initialTreeState: TreeState = { levels: 2, branches: [3, 2, 2] }

export function setTree(state: TreeState, patch: { levels?: number; index?: number; branches?: number }): TreeState {
    const branches = patch.index === undefined || patch.branches === undefined ? state.branches : setAt(state.branches, patch.index, clamp(patch.branches, 1, BRANCHES_MAX))
    return { levels: patch.levels === undefined ? state.levels : clamp(patch.levels, 1, TREE_LEVELS_MAX), branches }
}

export const treeLeaves = (state: TreeState) => state.branches.slice(0, state.levels).reduce((product, value) => product * value, 1)

export const treeChallenges: LabChallenge<TreeState>[] = [
    { id: 83101, prompt: say('Bi mailarekin, lortu 12 amaiera.', 'Con dos niveles, consigue 12 extremos.', 'بمستويين، احصل على 12 نهاية.'), hint: say('$3\\cdot 4=12$', '$3\\cdot 4=12$', '$3\\cdot 4=12$'), isSolved: (state) => state.levels === 2 && treeLeaves(state) === 12 },
    { id: 83102, prompt: say('Hiru mailarekin, lortu 24 amaiera.', 'Con tres niveles, consigue 24 extremos.', 'بثلاثة مستويات، احصل على 24 نهاية.'), hint: say('$2\\cdot 3\\cdot 4=24$', '$2\\cdot 3\\cdot 4=24$', '$2\\cdot 3\\cdot 4=24$'), isSolved: (state) => state.levels === 3 && treeLeaves(state) === 24 },
    { id: 83103, prompt: say('Hiru txanpon: hiru mailak berdinak eta 8 amaiera.', 'Tres monedas: los tres niveles iguales y 8 extremos.', 'ثلاث قطع نقود: المستويات الثلاثة متساوية و8 نهايات.'), hint: say('Txanpon bakoitzak 2 aukera: $2^{3}=8$.', 'Cada moneda, 2 opciones: $2^{3}=8$.', 'لكل قطعة خياران: $2^{3}=8$.'), isSolved: (state) => state.levels === 3 && state.branches.every((value) => value === 2) }
]

/* ---------- 2. A quotient of factorials ---------- */

export const FACTORIAL_MAX = 12

export interface FactorialState {
    top: number
    bottom: number
}

export const initialFactorialState: FactorialState = { top: 8, bottom: 5 }

export const setFactorial = (state: FactorialState, patch: Partial<FactorialState>): FactorialState => ({
    top: clamp(patch.top ?? state.top, 0, FACTORIAL_MAX),
    bottom: clamp(patch.bottom ?? state.bottom, 0, FACTORIAL_MAX)
})

/** The factors that remain: b + 1, …, a (empty when a ≤ b) */
export const remainingFactors = (state: FactorialState) => Array.from({ length: Math.max(0, state.top - state.bottom) }, (_, index) => state.top - index)
/** a! / b! as numerator and denominator */
export function factorialQuotient(state: FactorialState): { numerator: number; denominator: number } {
    if (state.top >= state.bottom) return { numerator: remainingFactors(state).reduce((product, value) => product * value, 1), denominator: 1 }
    return { numerator: 1, denominator: remainingFactors({ top: state.bottom, bottom: state.top }).reduce((product, value) => product * value, 1) }
}

export const factorialChallenges: LabChallenge<FactorialState>[] = [
    { id: 83301, prompt: say('Lortu $\\frac{a!}{b!}=72$.', 'Consigue $\\frac{a!}{b!}=72$.', 'احصل على $\\frac{a!}{b!}=72$.'), hint: say('$72=9\\cdot 8$: bi faktore jarraian.', '$72=9\\cdot 8$: dos factores seguidos.', '$72=9\\cdot 8$: عاملان متتاليان.'), isSolved: (state) => factorialQuotient(state).denominator === 1 && factorialQuotient(state).numerator === 72 },
    { id: 83302, prompt: say('Lortu 720, hiru faktore geratzen direla.', 'Consigue 720 con tres factores restantes.', 'احصل على 720 مع بقاء ثلاثة عوامل.'), hint: say('$720=10\\cdot 9\\cdot 8$', '$720=10\\cdot 9\\cdot 8$', '$720=10\\cdot 9\\cdot 8$'), isSolved: (state) => state.top - state.bottom === 3 && factorialQuotient(state).numerator === 720 },
    { id: 83303, prompt: say('Lortu $\\frac{a!}{b!}=30$.', 'Consigue $\\frac{a!}{b!}=30$.', 'احصل على $\\frac{a!}{b!}=30$.'), hint: say('$30=6\\cdot 5$', '$30=6\\cdot 5$', '$30=6\\cdot 5$'), isSolved: (state) => factorialQuotient(state).denominator === 1 && factorialQuotient(state).numerator === 30 }
]

/* ---------- 3. Slots with or without repetition ---------- */

export const ELEMENTS_MAX = 10
export const SLOTS_MAX = 6

export interface SlotsState {
    elements: number
    slots: number
    repeat: boolean
}

export const initialSlotsState: SlotsState = { elements: 5, slots: 3, repeat: false }

export const setSlots = (state: SlotsState, patch: Partial<SlotsState>): SlotsState => ({
    elements: clamp(patch.elements ?? state.elements, 1, ELEMENTS_MAX),
    slots: clamp(patch.slots ?? state.slots, 1, SLOTS_MAX),
    repeat: patch.repeat ?? state.repeat
})

/** The options of each slot: n every time, or n, n − 1, … (0 once the elements run out) */
export const slotOptions = (state: SlotsState) => Array.from({ length: state.slots }, (_, index) => (state.repeat ? state.elements : Math.max(0, state.elements - index)))
export const slotsCount = (state: SlotsState) => slotOptions(state).reduce((product, value) => product * value, 1)

export const slotsChallenges: LabChallenge<SlotsState>[] = [
    { id: 83201, prompt: say('Errepikatu gabe, lortu 120.', 'Sin repetir, consigue 120.', 'دون تكرار، احصل على 120.'), hint: say('$6\\cdot 5\\cdot 4$ edo $5\\cdot 4\\cdot 3\\cdot 2$.', '$6\\cdot 5\\cdot 4$ o $5\\cdot 4\\cdot 3\\cdot 2$.', '$6\\cdot 5\\cdot 4$ أو $5\\cdot 4\\cdot 3\\cdot 2$.'), isSolved: (state) => !state.repeat && slotsCount(state) === 120 },
    { id: 83202, prompt: say('Errepikatuz, lortu 64.', 'Repitiendo, consigue 64.', 'مع التكرار، احصل على 64.'), hint: say('$4^{3}$, $8^{2}$ edo $2^{6}$.', '$4^{3}$, $8^{2}$ o $2^{6}$.', '$4^{3}$ أو $8^{2}$ أو $2^{6}$.'), isSolved: (state) => state.repeat && slotsCount(state) === 64 },
    { id: 83203, prompt: say('Errepikatu gabe, egin erarik ez egotea.', 'Sin repetir, haz que no haya ninguna forma.', 'دون تكرار، اجعل عدد الطرق صفرًا.'), hint: say('Jarri elementuak baino lauki gehiago.', 'Pon más casillas que elementos.', 'ضع خانات أكثر من العناصر.'), isSolved: (state) => !state.repeat && state.slots > state.elements }
]

/* ---------- 4. Orders of letters with repetitions ---------- */

export const LETTERS = ['A', 'B', 'C', 'D'] as const
export const COPIES_MAX = 4

export interface LettersState {
    counts: number[]
}

export const initialLettersState: LettersState = { counts: [1, 1, 1, 0] }

export const setLetters = (state: LettersState, index: number, count: number): LettersState => ({ counts: setAt(state.counts, index, clamp(count, 0, COPIES_MAX)) })

export const lettersTotal = (state: LettersState) => state.counts.reduce((sum, value) => sum + value, 0)
/** n! / (a! · b! · …) */
export const lettersOrders = (state: LettersState) => factorial(lettersTotal(state)) / state.counts.reduce((product, value) => product * factorial(value), 1)

export const lettersChallenges: LabChallenge<LettersState>[] = [
    { id: 83401, prompt: say('Lau letra desberdin: zenbat ordena?', 'Cuatro letras distintas: ¿cuántos órdenes?', 'أربعة أحرف مختلفة: كم ترتيبًا؟'), hint: say('Letra bakoitza behin: $4!=24$.', 'Cada letra una vez: $4!=24$.', 'كل حرف مرة: $4!=24$.'), isSolved: (state) => state.counts.every((value) => value === 1) },
    { id: 83402, prompt: say('Lau letrarekin, lortu 6 ordena.', 'Con cuatro letras, consigue 6 órdenes.', 'بأربعة أحرف، احصل على 6 ترتيبات.'), hint: say('Bi letra, bakoitza bi aldiz (PAPA): $\\frac{4!}{2!\\cdot 2!}=6$.', 'Dos letras, cada una dos veces (PAPA): $\\frac{4!}{2!\\cdot 2!}=6$.', 'حرفان، كل منهما مرتين (PAPA): $\\frac{4!}{2!\\cdot 2!}=6$.'), isSolved: (state) => lettersTotal(state) === 4 && lettersOrders(state) === 6 },
    { id: 83403, prompt: say('Sei letrarekin, lortu 60 ordena.', 'Con seis letras, consigue 60 órdenes.', 'بستة أحرف، احصل على 60 ترتيبًا.'), hint: say('PAPAYA bezala: $\\frac{6!}{3!\\cdot 2!}=60$.', 'Como PAPAYA: $\\frac{6!}{3!\\cdot 2!}=60$.', 'مثل PAPAYA: $\\frac{6!}{3!\\cdot 2!}=60$.'), isSolved: (state) => lettersTotal(state) === 6 && lettersOrders(state) === 60 }
]

/* ---------- 5. Choose k of n ---------- */

export const POINTS_MIN = 2
export const POINTS_MAX = 10

export interface ChooseState {
    n: number
    k: number
}

export const initialChooseState: ChooseState = { n: 5, k: 2 }

export function setChoose(state: ChooseState, patch: Partial<ChooseState>): ChooseState {
    const n = clamp(patch.n ?? state.n, POINTS_MIN, POINTS_MAX)
    return { n, k: clamp(patch.k ?? state.k, 0, n) }
}

export const chooseChallenges: LabChallenge<ChooseState>[] = [
    { id: 83501, prompt: say('Lortu 35 talde.', 'Consigue 35 grupos.', 'احصل على 35 مجموعة.'), hint: say('$\\text{C}_{7,3}=\\text{C}_{7,4}=35$', '$\\text{C}_{7,3}=\\text{C}_{7,4}=35$', '$\\text{C}_{7,3}=\\text{C}_{7,4}=35$'), isSolved: (state) => choose(state.n, state.k) === 35 },
    { id: 83502, prompt: say('Bikoteak aukeratuz, lortu 28.', 'Eligiendo parejas, consigue 28.', 'باختيار أزواج، احصل على 28.'), hint: say('$\\frac{n(n-1)}{2}=28$, beraz $n=8$.', '$\\frac{n(n-1)}{2}=28$, luego $n=8$.', '$\\frac{n(n-1)}{2}=28$، إذن $n=8$.'), isSolved: (state) => state.k === 2 && choose(state.n, 2) === 28 },
    { id: 83503, prompt: say('Gutxienez bat aukeratuz, egin talde bakarra egotea.', 'Eligiendo al menos uno, haz que haya un solo grupo.', 'باختيار واحد على الأقل، اجعل هناك مجموعة واحدة فقط.'), hint: say('Denak aukeratzeko era bakarra dago: $k=n$.', 'Solo hay una forma de elegirlos todos: $k=n$.', 'هناك طريقة واحدة لاختيار الكل: $k=n$.'), isSolved: (state) => state.k >= 1 && choose(state.n, state.k) === 1 }
]

/* ---------- 6. The triangle of Tartaglia ---------- */

export const PASCAL_ROWS_MAX = 12

export interface PascalState {
    row: number
    place: number
}

export const initialPascalState: PascalState = { row: 5, place: 2 }

export function setPascal(state: PascalState, patch: Partial<PascalState>): PascalState {
    const row = clamp(patch.row ?? state.row, 0, PASCAL_ROWS_MAX)
    return { row, place: clamp(patch.place ?? state.place, 0, row) }
}

export const pascalChallenges: LabChallenge<PascalState>[] = [
    { id: 83601, prompt: say('Aurkitu 56 triangeluan.', 'Encuentra el 56 en el triángulo.', 'جد العدد 56 في المثلث.'), hint: say('8. lerroan dago: $\\binom{8}{3}=56$.', 'Está en la fila 8: $\\binom{8}{3}=56$.', 'هو في الصف 8: $\\binom{8}{3}=56$.'), isSolved: (state) => choose(state.row, state.place) === 56 },
    { id: 83602, prompt: say('Joan 512 batzen duen lerrora.', 'Ve a la fila que suma 512.', 'انتقل إلى الصف الذي مجموعه 512.'), hint: say('$2^{9}=512$', '$2^{9}=512$', '$2^{9}=512$'), isSolved: (state) => 2 ** state.row === 512 },
    { id: 83603, prompt: say('Aurkitu 252 triangeluan.', 'Encuentra el 252 en el triángulo.', 'جد العدد 252 في المثلث.'), hint: say('10. lerroaren erdian: $\\binom{10}{5}=252$.', 'En el centro de la fila 10: $\\binom{10}{5}=252$.', 'في وسط الصف 10: $\\binom{10}{5}=252$.'), isSolved: (state) => choose(state.row, state.place) === 252 }
]

/* ---------- 7. Paths on a grid ---------- */

export const GRID_WIDTH_MAX = 7
export const GRID_HEIGHT_MAX = 5

export interface GridState {
    width: number
    height: number
}

export const initialGridState: GridState = { width: 5, height: 3 }

export const setGrid = (state: GridState, patch: Partial<GridState>): GridState => ({
    width: clamp(patch.width ?? state.width, 1, GRID_WIDTH_MAX),
    height: clamp(patch.height ?? state.height, 1, GRID_HEIGHT_MAX)
})

export const gridPaths = (state: GridState) => choose(state.width + state.height, state.height)

export const gridChallenges: LabChallenge<GridState>[] = [
    { id: 83701, prompt: say('Lortu 35 bide.', 'Consigue 35 caminos.', 'احصل على 35 مسارًا.'), hint: say('7 urrats, 3 gora: $\\binom{7}{3}=35$.', '7 pasos, 3 hacia arriba: $\\binom{7}{3}=35$.', '7 خطوات، 3 إلى الأعلى: $\\binom{7}{3}=35$.'), isSolved: (state) => gridPaths(state) === 35 },
    { id: 83702, prompt: say('Sare karratu batean, lortu 70 bide.', 'En una cuadrícula cuadrada, consigue 70 caminos.', 'في شبكة مربعة، احصل على 70 مسارًا.'), hint: say('$\\binom{8}{4}=70$', '$\\binom{8}{4}=70$', '$\\binom{8}{4}=70$'), isSolved: (state) => state.width === state.height && gridPaths(state) === 70 },
    { id: 83703, prompt: say('Lortu 84 bide.', 'Consigue 84 caminos.', 'احصل على 84 مسارًا.'), hint: say('9 urrats, 3 gora: $\\binom{9}{3}=84$.', '9 pasos, 3 hacia arriba: $\\binom{9}{3}=84$.', '9 خطوات، 3 إلى الأعلى: $\\binom{9}{3}=84$.'), isSolved: (state) => gridPaths(state) === 84 }
]

export const combinatoricsAkLabChallengeIds: number[] = [treeChallenges, factorialChallenges, slotsChallenges, lettersChallenges, chooseChallenges, pascalChallenges, gridChallenges].flatMap((challenges) =>
    (challenges as Array<{ id: number }>).map((challenge) => challenge.id)
)
