import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { diceChallenges } from '../../dbh2-estatistika-v2/lab/labTools.ts'
import { contingencyChallenges, unionChallenges, urnChallenges } from '../../dbh4-aplikatuak-estatistika/lab/labTools.ts'
import type { ProbabilityAkStageId } from '../lessons.tsx'

/* ==========================================================================
   Probabilitatea (4. DBH akademikoak) laboratory. The union of two events
   of a die and the urn with two draws come from 4. DBH aplikatuak, the
   table of two dice from 2. DBH and the contingency table from aplikatuak,
   each with its own challenges. The new tools: thousands of throws of a
   die, a coin and a drawing pin (a fixed pseudo-random sequence, so every
   learner sees the same results); «at least once» in n repetitions; a die
   that chooses one of two urns; drawing k at once with combinations;
   three dice with their maximum, minimum, median or sum; and a die game
   made fair. Pure state logic; the components live next to this file.
   Tests in tests/probabilitatea-dbh4ak-lab.test.ts.
   ========================================================================== */

export type ProbabilityAkLabToolId = 'union' | 'simulate' | 'dice' | 'repeat' | 'urn' | 'contingency' | 'total' | 'draw' | 'three-dice' | 'fair'

export interface ProbabilityAkLabTool extends LabToolInfo {
    id: ProbabilityAkLabToolId
    stage: ProbabilityAkStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const equals = (value: FractionValue | null, numerator: number, denominator = 1) => value !== null && value.numerator * denominator === numerator * value.denominator

/** C(n, k), exact for the sizes used here */
export function choose(n: number, k: number): number {
    if (k < 0 || k > n) return 0
    let value = 1
    for (let i = 1; i <= k; i += 1) value = (value * (n - k + i)) / i
    return Math.round(value)
}

export const probabilityAkLabTools: ProbabilityAkLabTool[] = [
    { id: 'union', stage: 'events', lessonTopic: 'operations', title: say('Gertaeren bildura', 'La unión de sucesos', 'اتحاد الأحداث'), observe: say('Zati komuna hutsik badago, gertaerak bateraezinak dira eta probabilitateak batu besterik ez da egin behar. Bestela, komuna behin kendu behar da.', 'Si la parte común está vacía, los sucesos son incompatibles y basta sumar las probabilidades. Si no, hay que restar una vez la parte común.', 'إذا كان الجزء المشترك فارغًا فالحدثان متنافيان ويكفي جمع الاحتمالين. وإلا وجب طرح الجزء المشترك مرة.') },
    { id: 'simulate', stage: 'probability', lessonTopic: 'frequency', title: say('Milaka jaurtiketa', 'Miles de lanzamientos', 'آلاف الرميات'), observe: say('Jaurtiketa gutxirekin maiztasun erlatiboak salto handiak egiten ditu. Jaurtiketak gehitu ahala, zenbaki baten inguruan geratzen da: probabilitatea. Txintxetan zenbaki hori ez dakigu aldez aurretik: maiztasunak estimatzen du.', 'Con pocos lanzamientos la frecuencia relativa da grandes saltos. Al aumentar los lanzamientos se queda alrededor de un número: la probabilidad. En la chincheta ese número no se sabe de antemano: la frecuencia lo estima.', 'مع رميات قليلة يقفز التكرار النسبي كثيرًا. ومع زيادة الرميات يستقر حول عدد: الاحتمال. وفي الدبوس لا نعرف هذا العدد مسبقًا: التكرار يقدّره.') },
    { id: 'dice', stage: 'probability', lessonTopic: 'laplace', title: say('Bi dadoren taula', 'La tabla de dos dados', 'جدول نردين'), observe: say('36 laukiak aukera berekoak dira: probabilitatea aldeko laukiak zati 36 da. Baturek ez dute aukera bera: 7a diagonal luzeenean dago.', 'Las 36 casillas son equiprobables: la probabilidad son las casillas favorables entre 36. Las sumas no son equiprobables: el 7 está en la diagonal más larga.', 'الخانات الـ36 متساوية الاحتمال: الاحتمال هو الخانات الملائمة على 36. والمجاميع ليست متساوية الاحتمال: 7 على أطول قطر.') },
    { id: 'repeat', stage: 'compound', lessonTopic: 'independent', title: say('Gutxienez behin', 'Al menos una vez', 'مرة واحدة على الأقل'), observe: say('Behin ere ez gertatzeko probabilitatea (1 − p)ⁿ da, eta txikiagotu egiten da errepikatu ahala. Gutxienez behin gertatzekoa 1 ken hori da. Gertaera arraroa bada, errepikapen asko behar dira 1/2 gainditzeko.', 'La probabilidad de que no ocurra ninguna vez es (1 − p)ⁿ, y se hace pequeña al repetir. La de que ocurra al menos una vez es 1 menos eso. Si el suceso es raro, hacen falta muchas repeticiones para pasar de 1/2.', 'احتمال ألا يقع الحدث أبدًا هو (1 − p)ⁿ، ويصغر مع التكرار. واحتمال وقوعه مرة على الأقل هو 1 ناقص ذلك. وإذا كان الحدث نادرًا لزمت تكرارات كثيرة لتجاوز 1/2.') },
    { id: 'urn', stage: 'compound', lessonTopic: 'dependent', title: say('Bi atera kutxa batetik', 'Dos extracciones de una urna', 'سحبتان من جرّة'), observe: say('Itzulita, bigarren adarrak lehenengoaren berdinak dira (independenteak). Itzuli gabe, bigarren adarrak aldatu egiten dira: bola bat gutxiago dago.', 'Devolviendo, las ramas de la segunda son iguales que las de la primera (independientes). Sin devolver, cambian: hay una bola menos.', 'مع الإرجاع تكون فروع السحبة الثانية مثل الأولى (مستقلتان). ودون إرجاع تتغيّر: هناك كرة أقل.') },
    { id: 'contingency', stage: 'conditional', lessonTopic: 'conditional', title: say('Kontingentzia-taula', 'Tabla de contingencia', 'جدول التوافق'), observe: say('Baldintzatuan, izendatzailea errenkada edo zutabe baten guztizkoa da. Baldintzatua eta soila berdinak badira, bi ezaugarriak independenteak dira.', 'En la condicionada, el denominador es el total de una fila o columna. Si la condicionada y la simple coinciden, las dos características son independientes.', 'في المشروط يكون المقام مجموع سطر أو عمود. وإذا تساوى المشروط والبسيط فالخاصيتان مستقلتان.') },
    { id: 'total', stage: 'conditional', lessonTopic: 'total', title: say('Dadoak kutxa aukeratzen du', 'El dado elige la urna', 'النرد يختار الجرّة'), observe: say('Bola gorria bi bidetatik irits daiteke; probabilitate osoa bien batura da. Gorria atera bada, I kutxaren probabilitatea haren bidea zati batura da: bide pisutsuenak irabazten du.', 'A la bola roja se llega por dos caminos; la probabilidad total es la suma de los dos. Si ha salido roja, la probabilidad de la urna I es su camino entre la suma: gana el camino que más pesa.', 'نصل إلى الكرة الحمراء عبر مسارين، والاحتمال الكلي مجموعهما. وإذا خرجت حمراء فاحتمال الجرّة I هو مسارها على المجموع: يغلب المسار الأثقل.') },
    { id: 'draw', stage: 'counting', lessonTopic: 'with-combinations', title: say('Batera ateratzea', 'Sacar varias a la vez', 'السحب معًا'), observe: say('Kasu posibleak C(N, k) dira. Justu j on ateratzeko, j on aukeratzen dira g-tik eta gainerakoak txarren artetik: C(g, j) · C(N − g, k − j). j guztien probabilitateak batuta 1 dira.', 'Los casos posibles son C(N, k). Para sacar exactamente j buenas se eligen j de las g buenas y el resto entre las malas: C(g, j) · C(N − g, k − j). Las probabilidades de todos los j suman 1.', 'الحالات الممكنة C(N, k). ولسحب j جيدة بالضبط نختار j من g الجيدة والباقي من غير الجيدة: C(g, j) · C(N − g, k − j). ومجموع احتمالات كل قيم j هو 1.') },
    { id: 'three-dice', stage: 'counting', lessonTopic: 'several-dice', title: say('Hiru dado', 'Tres dados', 'ثلاثة نرود'), observe: say('216 kasuak sei taulatan daude, hirugarren dadoaren balio bakoitzeko bat. Handiena 6 izatea da ohikoena; batura erdikoak (10 eta 11) dira probableenak, muturrak (3 eta 18) gutxien.', 'Los 216 casos están en seis tablas, una por cada valor del tercer dado. Lo más frecuente es que el mayor sea 6; las sumas centrales (10 y 11) son las más probables y las de los extremos (3 y 18), las que menos.', 'الحالات الـ216 في ستة جداول، جدول لكل قيمة للنرد الثالث. الأكثر شيوعًا أن يكون الأكبر 6؛ والمجاميع الوسطى (10 و11) هي الأكثر احتمالًا، والطرفان (3 و18) الأقل.') },
    { id: 'fair', stage: 'counting', lessonTopic: 'fair-games', title: say('Joko bidezkoa', 'El juego equitativo', 'اللعبة العادلة'), observe: say('Itxaropena irabaziak bider probabilitateak da. Saria igotzean edo irabazten duten aurpegiak gehitzean, jokalariaren alde egiten du; galera igotzean, kontra. 0 denean, jokoa bidezkoa da.', 'La esperanza es la suma de cada ganancia por su probabilidad. Al subir el premio o las caras ganadoras se inclina a favor del jugador; al subir la pérdida, en contra. Cuando vale 0, el juego es equitativo.', 'الأمل مجموع كل ربح في احتماله. عند رفع الجائزة أو زيادة الأوجه الرابحة يميل لصالح اللاعب، وعند رفع الخسارة يميل ضده. وعندما يساوي 0 تكون اللعبة عادلة.') }
]

export const probabilityAkLabToolForTopic: Record<string, ProbabilityAkLabToolId | undefined> = {
    experiments: 'dice',
    operations: 'union',
    compatible: 'union',
    frequency: 'simulate',
    laplace: 'dice',
    properties: 'union',
    independent: 'repeat',
    dependent: 'urn',
    trees: 'urn',
    contingency: 'contingency',
    conditional: 'contingency',
    total: 'total',
    'with-combinations': 'draw',
    'several-dice': 'three-dice',
    'fair-games': 'fair'
}

/* ---------- 1. Thousands of throws ---------- */

export const THROW_COUNTS = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000] as const
export type SimulationId = 'coin' | 'die' | 'pin'

/** Probability of success in each experiment; the pin's is unknown to the learner */
export const SIMULATION_P: Record<SimulationId, number> = { coin: 1 / 2, die: 1 / 6, pin: 0.38 }
/** Seeds of the fixed pseudo-random sequences */
const SIMULATION_SEEDS: Record<SimulationId, number> = { coin: 11, die: 59, pin: 3 }

/** A small seeded generator (mulberry32): the same sequence on every device */
function generator(seed: number) {
    let state = seed >>> 0
    return () => {
        state = (state + 0x6d2b79f5) >>> 0
        let t = state
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

/** Successes after each count in THROW_COUNTS */
export const simulationSuccesses: Record<SimulationId, number[]> = (() => {
    const result = {} as Record<SimulationId, number[]>
    for (const id of Object.keys(SIMULATION_P) as SimulationId[]) {
        const next = generator(SIMULATION_SEEDS[id])
        const counts: number[] = []
        let successes = 0
        for (let throwNumber = 1; throwNumber <= THROW_COUNTS[THROW_COUNTS.length - 1]; throwNumber += 1) {
            if (next() < SIMULATION_P[id]) successes += 1
            if ((THROW_COUNTS as readonly number[]).includes(throwNumber)) counts.push(successes)
        }
        result[id] = counts
    }
    return result
})()

export interface SimulateState {
    experiment: SimulationId
    /** Index in THROW_COUNTS */
    step: number
}

export const initialSimulateState: SimulateState = { experiment: 'coin', step: 0 }

export const setSimulate = (state: SimulateState, patch: Partial<SimulateState>): SimulateState => ({
    experiment: patch.experiment ?? state.experiment,
    step: clamp(patch.step ?? state.step, 0, THROW_COUNTS.length - 1)
})

export const simulationThrows = (state: SimulateState) => THROW_COUNTS[state.step]
export const simulationCount = (state: SimulateState) => simulationSuccesses[state.experiment][state.step]
export const simulationFrequency = (state: SimulateState) => simulationCount(state) / simulationThrows(state)

export const simulateChallenges: LabChallenge<SimulateState>[] = [
    { id: 85101, prompt: say('Dadoarekin eta jaurtiketa gutxirekin (50 edo gutxiago), aurkitu 6aren maiztasun erlatibo bat $\\frac{1}{6}$-tik 0,1 baino gehiago urruntzen dena.', 'Con el dado y pocos lanzamientos (50 o menos), encuentra una frecuencia relativa del 6 que se aleje de $\\frac{1}{6}$ más de 0,1.', 'بالنرد ورميات قليلة (50 أو أقل)، أوجد تكرارًا نسبيًا للعدد 6 يبتعد عن $\\frac{1}{6}$ أكثر من 0.1.'), hint: say('Jaurtiketa gutxirekin, zortea nabaritzen da. Probatu 10 eta 20.', 'Con pocos lanzamientos se nota la suerte. Prueba con 10 y con 20.', 'مع رميات قليلة يظهر أثر الحظ. جرّب 10 و20.'), isSolved: (state) => state.experiment === 'die' && simulationThrows(state) <= 50 && Math.abs(simulationFrequency(state) - 1 / 6) > 0.1 },
    { id: 85102, prompt: say('Txanponarekin, lortu aurpegiaren maiztasun erlatiboa 0,49 eta 0,51 artean.', 'Con la moneda, consigue una frecuencia relativa de cara entre 0,49 y 0,51.', 'بقطعة النقود، احصل على تكرار نسبي للوجه بين 0.49 و0.51.'), hint: say('Gehitu jaurtiketak: maiztasuna $\\frac{1}{2}$-ra hurbiltzen da.', 'Aumenta los lanzamientos: la frecuencia se acerca a $\\frac{1}{2}$.', 'زِد الرميات: يقترب التكرار من $\\frac{1}{2}$.'), isSolved: (state) => state.experiment === 'coin' && Math.abs(simulationFrequency(state) - 1 / 2) <= 0.01 },
    { id: 85103, prompt: say('Txintxetarekin, egin 1000 jaurtiketa edo gehiago eta irakurri punta goraren probabilitatearen estimazioa.', 'Con la chincheta, haz 1000 lanzamientos o más y lee la estimación de la probabilidad de punta arriba.', 'بالدبوس، نفّذ 1000 رمية أو أكثر واقرأ تقدير احتمال سقوطه ورأسه إلى الأعلى.'), hint: say('Txintxeta ez da simetrikoa: probabilitatea maiztasunarekin estimatzen da, jaurtiketa askorekin.', 'La chincheta no es simétrica: la probabilidad se estima con la frecuencia, con muchos lanzamientos.', 'الدبوس غير متماثل: يُقدَّر الاحتمال بالتكرار مع رميات كثيرة.'), isSolved: (state) => state.experiment === 'pin' && simulationThrows(state) >= 1000 }
]

/* ---------- 2. At least once in n repetitions ---------- */

export type RepeatEventId = 'six' | 'heads' | 'double-six' | 'ace'
/** Probability of the event in one try */
export const REPEAT_P: Record<RepeatEventId, FractionValue> = { six: fraction(1, 6), heads: fraction(1, 2), 'double-six': fraction(1, 36), ace: fraction(1, 10) }
export const REPEAT_MAX = 30

export interface RepeatState {
    event: RepeatEventId
    times: number
}

export const initialRepeatState: RepeatState = { event: 'six', times: 1 }

export const setRepeat = (state: RepeatState, patch: Partial<RepeatState>): RepeatState => ({
    event: patch.event ?? state.event,
    times: clamp(patch.times ?? state.times, 1, REPEAT_MAX)
})

/** P(never) = (1 − p)ⁿ and P(at least once) = 1 − (1 − p)ⁿ, as decimals */
export function repeatProbabilities({ event, times }: RepeatState) {
    const p = REPEAT_P[event].numerator / REPEAT_P[event].denominator
    const never = (1 - p) ** times
    return { never, atLeastOnce: 1 - never }
}

export const repeatChallenges: LabChallenge<RepeatState>[] = [
    { id: 85201, prompt: say('Dadoarekin, aurkitu «gutxienez 6 bat» $\\frac{1}{2}$ gainditzeko behar den jaurtiketa kopuru txikiena.', 'Con el dado, encuentra el menor número de lanzamientos para que «al menos un 6» pase de $\\frac{1}{2}$.', 'بالنرد، أوجد أصغر عدد من الرميات ليتجاوز احتمال «6 مرة على الأقل» $\\frac{1}{2}$.'), hint: say('$1-\\left(\\frac{5}{6}\\right)^{n}$: probatu $n=3$ eta $n=4$.', '$1-\\left(\\frac{5}{6}\\right)^{n}$: prueba $n=3$ y $n=4$.', '$1-\\left(\\frac{5}{6}\\right)^{n}$: جرّب $n=3$ و$n=4$.'), isSolved: (state) => state.event === 'six' && state.times === 4 },
    { id: 85202, prompt: say('De Méréren arazoa: bi dadorekin, aurkitu «gutxienez sei bikoitz bat» $\\frac{1}{2}$ gainditzeko behar den jaurtiketa kopuru txikiena.', 'El problema de De Méré: con dos dados, encuentra el menor número de tiradas para que «al menos un doble seis» pase de $\\frac{1}{2}$.', 'مسألة دي ميري: بنردين، أوجد أصغر عدد من الرميات ليتجاوز احتمال «ستّتان مرة على الأقل» $\\frac{1}{2}$.'), hint: say('$p=\\frac{1}{36}$: 20 eta 30 artean dago.', '$p=\\frac{1}{36}$: está entre 20 y 30.', '$p=\\frac{1}{36}$: بين 20 و30.'), isSolved: (state) => state.event === 'double-six' && state.times === 25 },
    { id: 85203, prompt: say('Txanponarekin, lortu «gutxienez aurpegi bat» 0,99 baino handiagoa izatea.', 'Con la moneda, consigue que «al menos una cara» supere 0,99.', 'بقطعة النقود، اجعل احتمال «وجه مرة على الأقل» أكبر من 0.99.'), hint: say('$\\left(\\frac{1}{2}\\right)^{n}$ 0,01 baino txikiagoa izan behar da.', '$\\left(\\frac{1}{2}\\right)^{n}$ tiene que bajar de 0,01.', 'يجب أن يصبح $\\left(\\frac{1}{2}\\right)^{n}$ أصغر من 0.01.'), isSolved: (state) => state.event === 'heads' && repeatProbabilities(state).atLeastOnce > 0.99 }
]

/* ---------- 3. A die chooses the urn ---------- */

/** Balls in each urn */
export const URN_SIZE = 5

export interface TotalState {
    /** Faces 1, …, faces send the draw to urn I; the rest, to urn II */
    faces: number
    redI: number
    redII: number
}

export const initialTotalState: TotalState = { faces: 2, redI: 2, redII: 2 }

export const setTotal = (state: TotalState, patch: Partial<TotalState>): TotalState => ({
    faces: clamp(patch.faces ?? state.faces, 1, 5),
    redI: clamp(patch.redI ?? state.redI, 0, URN_SIZE),
    redII: clamp(patch.redII ?? state.redII, 0, URN_SIZE)
})

/** The two paths to red, out of 30, and the total */
export function totalOf({ faces, redI, redII }: TotalState) {
    const pathI = faces * redI
    const pathII = (6 - faces) * redII
    return { pathI, pathII, red: fraction(pathI + pathII, 30), fromI: pathI + pathII === 0 ? null : fraction(pathI, pathI + pathII) }
}

export const totalChallenges: LabChallenge<TotalState>[] = [
    { id: 85301, prompt: say('Lortu $P(\\text{gorria})=\\frac{2}{3}$.', 'Consigue $P(\\text{roja})=\\frac{2}{3}$.', 'اجعل احتمال الحمراء $\\frac{2}{3}$.'), hint: say('$\\frac{2}{3}=\\frac{20}{30}$: bi bideen zenbakitzaileak batuta 20.', '$\\frac{2}{3}=\\frac{20}{30}$: los numeradores de los dos caminos suman 20.', '$\\frac{2}{3}=\\frac{20}{30}$: مجموع بسطَي المسارين 20.'), isSolved: (state) => equals(totalOf(state).red, 2, 3) },
    { id: 85302, prompt: say('Lortu $P(\\text{gorria})=\\frac{1}{2}$, bi kutxek gorri kopuru desberdina dutela.', 'Consigue $P(\\text{roja})=\\frac{1}{2}$ con un número distinto de rojas en cada urna.', 'اجعل احتمال الحمراء $\\frac{1}{2}$ مع عدد مختلف من الكرات الحمراء في كل جرّة.'), hint: say('Dadoak 3 aurpegi eta 3 bana ematen baditu, bi kutxetako gorriak batuta 5 izan behar dira.', 'Si el dado reparte 3 y 3 caras, las rojas de las dos urnas tienen que sumar 5.', 'إذا وزّع النرد الأوجه 3 و3 فيجب أن يكون مجموع الحمراء في الجرّتين 5.'), isSolved: (state) => state.redI !== state.redII && equals(totalOf(state).red, 1, 2) },
    { id: 85303, prompt: say('Gorria atera da. Lortu I kutxatik etortzeko probabilitatea $\\frac{1}{2}$ izatea.', 'Ha salido roja. Consigue que la probabilidad de que viniera de la urna I sea $\\frac{1}{2}$.', 'خرجت كرة حمراء. اجعل احتمال أنها من الجرّة I يساوي $\\frac{1}{2}$.'), hint: say('Bi bideek pisu bera izan behar dute: aurpegiak bider gorriak berdin bi aldeetan.', 'Los dos caminos tienen que pesar lo mismo: caras por rojas, igual en los dos lados.', 'يجب أن يتساوى وزن المسارين: الأوجه في الحمراء متساويان في الجهتين.'), isSolved: (state) => equals(totalOf(state).fromI, 1, 2) }
]

/* ---------- 4. Drawing k at once ---------- */

export const DRAW_TOTAL_MAX = 40
export const DRAW_K_MAX = 5

export interface DrawState {
    /** Cards or balls in all */
    total: number
    /** The good ones among them */
    good: number
    /** Drawn at once */
    k: number
    /** Good ones wanted among the drawn */
    j: number
}

export const initialDrawState: DrawState = { total: 10, good: 4, k: 2, j: 1 }

export function setDraw(state: DrawState, patch: Partial<DrawState>): DrawState {
    const total = clamp(patch.total ?? state.total, 2, DRAW_TOTAL_MAX)
    const good = clamp(patch.good ?? state.good, 0, total)
    const k = clamp(patch.k ?? state.k, 1, Math.min(DRAW_K_MAX, total))
    return { total, good, k, j: clamp(patch.j ?? state.j, 0, k) }
}

/** Favourable and possible cases, and the probability of exactly j good ones */
export function drawOf({ total, good, k, j }: DrawState) {
    const favourable = choose(good, j) * choose(total - good, k - j)
    const possible = choose(total, k)
    return { favourable, possible, probability: fraction(favourable, possible) }
}

/** P(j) for every j from 0 to k */
export const drawDistribution = (state: DrawState) => Array.from({ length: state.k + 1 }, (_, j) => drawOf({ ...state, j }).probability)

export const drawChallenges: LabChallenge<DrawState>[] = [
    { id: 85401, prompt: say('40 kartako sorta bat, 10 urre: hiru karta batera ateratzean, hirurak urreak izateko probabilitatea.', 'Una baraja de 40 con 10 oros: la probabilidad de que, al sacar tres cartas a la vez, las tres sean oros.', 'مجموعة 40 ورقة فيها 10 ذهب: احتمال أن تكون الأوراق الثلاث المسحوبة معًا كلها ذهبًا.'), hint: say('$N=40$, $g=10$, $k=3$ eta $j=3$.', '$N=40$, $g=10$, $k=3$ y $j=3$.', '$N=40$ و$g=10$ و$k=3$ و$j=3$.'), isSolved: (state) => state.total === 40 && state.good === 10 && state.k === 3 && state.j === 3 },
    { id: 85402, prompt: say('10 bola, 4 gorri, eta 3 ateratzen dira: aurkitu gorri kopuru probableena.', '10 bolas, 4 rojas, y se sacan 3: encuentra el número de rojas más probable.', '10 كرات منها 4 حمراء وتُسحب 3: أوجد عدد الحمراء الأكثر احتمالًا.'), hint: say('Begiratu barra altuena.', 'Mira la barra más alta.', 'انظر إلى أطول عمود.'), isSolved: (state) => state.total === 10 && state.good === 4 && state.k === 3 && state.j === 1 },
    { id: 85403, prompt: say('Bi ateratzean, lortu biak onak izateko probabilitatea $\\frac{1}{3}$ izatea.', 'Sacando dos, consigue que la probabilidad de que las dos sean buenas sea $\\frac{1}{3}$.', 'عند سحب اثنتين، اجعل احتمال أن تكون كلتاهما جيدة $\\frac{1}{3}$.'), hint: say('$\\frac{g(g-1)}{N(N-1)}=\\frac{1}{3}$: probatu $N=10$.', '$\\frac{g(g-1)}{N(N-1)}=\\frac{1}{3}$: prueba $N=10$.', '$\\frac{g(g-1)}{N(N-1)}=\\frac{1}{3}$: جرّب $N=10$.'), isSolved: (state) => state.k === 2 && state.j === 2 && equals(drawOf(state).probability, 1, 3) }
]

/* ---------- 5. Three dice ---------- */

export type DiceStatistic = 'max' | 'min' | 'median' | 'sum'

export interface ThreeDiceState {
    statistic: DiceStatistic
    value: number
}

export const initialThreeDiceState: ThreeDiceState = { statistic: 'max', value: 4 }

export const statisticRange = (statistic: DiceStatistic): [number, number] => (statistic === 'sum' ? [3, 18] : [1, 6])

export function setThreeDice(state: ThreeDiceState, patch: Partial<ThreeDiceState>): ThreeDiceState {
    const statistic = patch.statistic ?? state.statistic
    const [min, max] = statisticRange(statistic)
    return { statistic, value: clamp(patch.value ?? state.value, min, max) }
}

/** The statistic of one throw of three dice */
export function statisticOf(statistic: DiceStatistic, dice: number[]): number {
    const sorted = [...dice].sort((a, b) => a - b)
    return statistic === 'max' ? sorted[2] : statistic === 'min' ? sorted[0] : statistic === 'median' ? sorted[1] : sorted[0] + sorted[1] + sorted[2]
}

/** Ordered throws (out of 216) whose statistic is the value */
export function threeDiceCount({ statistic, value }: ThreeDiceState): number {
    let count = 0
    for (let a = 1; a <= 6; a += 1) for (let b = 1; b <= 6; b += 1) for (let c = 1; c <= 6; c += 1) if (statisticOf(statistic, [a, b, c]) === value) count += 1
    return count
}

export const threeDiceChallenges: LabChallenge<ThreeDiceState>[] = [
    { id: 85501, prompt: say('Aurkitu puntuazio handienaren baliorik probableena.', 'Encuentra el valor más probable de la mayor puntuación.', 'أوجد القيمة الأكثر احتمالًا لأكبر نتيجة.'), hint: say('Handiena 6 ez izateko, hiru daduek 5 edo gutxiago: $5^{3}=125$.', 'Para que el mayor no sea 6, los tres dados deben ser 5 o menos: $5^{3}=125$.', 'لكي لا يكون الأكبر 6 يجب أن تكون النرود الثلاثة 5 أو أقل: $5^{3}=125$.'), isSolved: (state) => state.statistic === 'max' && state.value === 6 },
    { id: 85502, prompt: say('Aurkitu batura probableenetako bat (bi daude).', 'Encuentra una de las sumas más probables (hay dos).', 'أوجد أحد المجموعين الأكثر احتمالًا (هناك اثنان).'), hint: say('Baturak simetrikoak dira 10,5aren inguruan.', 'Las sumas son simétricas alrededor de 10,5.', 'المجاميع متماثلة حول 10.5.'), isSolved: (state) => state.statistic === 'sum' && (state.value === 10 || state.value === 11) },
    { id: 85503, prompt: say('Aurkitu 216tik justu 40 kasu dituen mediana bat.', 'Encuentra una mediana con exactamente 40 casos de 216.', 'أوجد وسيطًا له 40 حالة بالضبط من 216.'), hint: say('Mediana baxuak eta altuak simetrikoak dira: 2 eta 5 berdinak.', 'Las medianas bajas y altas son simétricas: el 2 y el 5 tienen los mismos casos.', 'الوسيطات المنخفضة والمرتفعة متماثلة: 2 و5 لهما الحالات نفسها.'), isSolved: (state) => state.statistic === 'median' && threeDiceCount(state) === 40 }
]

/* ---------- 6. A fair game ---------- */

export const PRIZE_MAX = 12
export const LOSS_MAX = 6

export interface FairState {
    /** Faces 1, …, winning win the prize; the rest lose */
    winning: number
    prize: number
    loss: number
}

export const initialFairState: FairState = { winning: 2, prize: 4, loss: 3 }

export const setFair = (state: FairState, patch: Partial<FairState>): FairState => ({
    winning: clamp(patch.winning ?? state.winning, 1, 5),
    prize: clamp(patch.prize ?? state.prize, 1, PRIZE_MAX),
    loss: clamp(patch.loss ?? state.loss, 1, LOSS_MAX)
})

/** The expected gain per game, in euros */
export const fairExpectation = ({ winning, prize, loss }: FairState) => fraction(prize * winning - loss * (6 - winning), 6)

export const fairChallenges: LabChallenge<FairState>[] = [
    { id: 85601, prompt: say('2 aurpegi irabazle eta 3 €-ko galerarekin, egin jokoa bidezkoa.', 'Con 2 caras ganadoras y 3 € de pérdida, haz el juego equitativo.', 'مع وجهين رابحين وخسارة 3 €، اجعل اللعبة عادلة.'), hint: say('$x\\cdot\\frac{2}{6}=3\\cdot\\frac{4}{6}$', '$x\\cdot\\frac{2}{6}=3\\cdot\\frac{4}{6}$', '$x\\cdot\\frac{2}{6}=3\\cdot\\frac{4}{6}$'), isSolved: (state) => state.winning === 2 && state.loss === 3 && equals(fairExpectation(state), 0) },
    { id: 85602, prompt: say('Egin joko bidezko bat aurpegi irabazle bakarrarekin.', 'Haz un juego equitativo con una sola cara ganadora.', 'اصنع لعبة عادلة بوجه رابح واحد.'), hint: say('Saria galeraren 5 halako izan behar da.', 'El premio tiene que ser 5 veces la pérdida.', 'يجب أن تكون الجائزة 5 أضعاف الخسارة.'), isSolved: (state) => state.winning === 1 && equals(fairExpectation(state), 0) },
    { id: 85603, prompt: say('Lortu partida bakoitzeko +1 €-ko itxaropena.', 'Consigue una esperanza de +1 € por partida.', 'احصل على أمل +1 € لكل جولة.'), hint: say('Saria bider aurpegi irabazleak ken galera bider galtzaileak: 6.', 'Premio por caras ganadoras menos pérdida por perdedoras: 6.', 'الجائزة في الأوجه الرابحة ناقص الخسارة في الخاسرة: 6.'), isSolved: (state) => equals(fairExpectation(state), 1) }
]

export const probabilityAkLabChallengeIds: number[] = [
    unionChallenges,
    simulateChallenges,
    diceChallenges,
    repeatChallenges,
    urnChallenges,
    contingencyChallenges,
    totalChallenges,
    drawChallenges,
    threeDiceChallenges,
    fairChallenges
].flatMap((challenges: Array<{ id: number }>) => challenges.map((challenge) => challenge.id))
