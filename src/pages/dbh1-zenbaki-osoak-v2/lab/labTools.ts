import { checkAnswer, fraction } from '../../../features/unit-v2/math/fraction.ts'
import { freshAnswer, type LabChallenge, type LabToolInfo, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import {
    integerLabTools,
    jumpsResult,
    relationOf,
    signsProduct,
    type CompareState,
    type CountersState,
    type JumpsState,
    type LineState,
    type MirrorState,
    type SignsState
} from '../../dbh2-zenbaki-osoak/lab/labTools.ts'
import type { IntegerIntroStageId } from '../lessons.tsx'

/* ==========================================================================
   Zenbaki osoak (1. DBH) laboratory. Six tools are the 2. DBH ones with
   first-year challenges taken from Santillana (thermometers, lifts, debts);
   the brackets tool is new: choose the sign of every term when a bracket is
   removed, then calculate. Tests in tests/zenbaki-osoak-dbh1-lab.test.ts.
   ========================================================================== */

export type IntroLabToolId = 'line' | 'compare' | 'mirror' | 'counters' | 'jumps' | 'brackets' | 'signs'

export interface IntroLabTool extends LabToolInfo {
    id: IntroLabToolId
    stage: IntegerIntroStageId
}

const shared = (id: Exclude<IntroLabToolId, 'brackets'>) => integerLabTools.find((tool) => tool.id === id)!

export const introLabTools: IntroLabTool[] = [
    { ...shared('line'), id: 'line', stage: 'meaning', lessonTopic: 'negatives' },
    { ...shared('compare'), id: 'compare', stage: 'line', lessonTopic: 'compare' },
    { ...shared('mirror'), id: 'mirror', stage: 'absolute', lessonTopic: 'absolute' },
    { ...shared('counters'), id: 'counters', stage: 'addsub', lessonTopic: 'add-different' },
    { ...shared('jumps'), id: 'jumps', stage: 'addsub', lessonTopic: 'subtract' },
    {
        id: 'brackets',
        stage: 'addsub',
        lessonTopic: 'brackets',
        title: { eu: 'Parentesiak kentzen', es: 'Quitar paréntesis', ar: 'حذف الأقواس' },
        observe: {
            eu: 'Aurretik + duen parentesiak barruko zeinuak mantentzen ditu; aurretik − duenak zeinu guztiak aldatzen ditu. Parentesiak kendu ondoren, batu positiboak eta negatiboak bereiz.',
            es: 'Un paréntesis precedido de + mantiene los signos de dentro; uno precedido de − cambia todos los signos. Después de quitar los paréntesis, suma aparte positivos y negativos.',
            ar: 'القوس المسبوق بـ + يحافظ على الإشارات داخله؛ والمسبوق بـ − يغيّر كل الإشارات. بعد حذف الأقواس اجمع الموجبة والسالبة كلًّا على حدة.'
        }
    },
    { ...shared('signs'), id: 'signs', stage: 'muldiv', lessonTopic: 'multiply' }
]

export const introLabToolForTopic: Record<string, IntroLabToolId | undefined> = {
    negatives: 'line',
    'integer-set': 'line',
    'number-line': 'line',
    compare: 'compare',
    order: 'compare',
    absolute: 'mirror',
    opposite: 'mirror',
    'compare-absolute': 'compare',
    'add-same': 'counters',
    'add-different': 'counters',
    subtract: 'jumps',
    brackets: 'brackets',
    multiply: 'signs',
    divide: 'signs'
}

const answered = (state: OperationAnswer, expected: number) => checkAnswer(state.answer, fraction(expected)) === 'correct'
const guessedRight = (state: CompareState) => state.guess === relationOf(state.first, state.second)
const pairIs = (state: CompareState, a: number, b: number) => [state.first, state.second].sort((x, y) => x - y).join() === [a, b].sort((x, y) => x - y).join()

/* ---------- Shared tools, first-year challenges ---------- */

export const introLineChallenges: LabChallenge<LineState>[] = [
    {
        id: 2101,
        prompt: { eu: 'Kokatu −7 zuzenean.', es: 'Coloca el −7 en la recta.', ar: 'ضع ⁦−7⁩ على الخط.' },
        hint: { eu: 'Zerotik 7 urrats ezkerrera.', es: '7 pasos a la izquierda del cero.', ar: '7 خطوات إلى يسار الصفر.' },
        isSolved: (state) => state.value === -7
    },
    {
        id: 2102,
        prompt: { eu: 'Termometroa: «zero azpitik bost gradu».', es: 'Termómetro: «cinco grados bajo cero».', ar: 'ميزان الحرارة: «خمس درجات تحت الصفر».' },
        hint: { eu: 'Aukeratu termometroa. Zero azpitik = −.', es: 'Elige el termómetro. Bajo cero = −.', ar: 'اختر ميزان الحرارة. تحت الصفر = −.' },
        isSolved: (state) => state.context === 'temperature' && state.value === -5
    },
    {
        id: 2103,
        prompt: { eu: 'Eraikina: jostailu-saila hirugarren sotoan dago. Joan hara.', es: 'Edificio: la sección de juguetes está en el tercer sótano. Ve allí.', ar: 'المبنى: قسم الألعاب في القبو الثالث. اذهب إليه.' },
        hint: { eu: 'Aukeratu eraikina. Sotoak negatiboak dira.', es: 'Elige el edificio. Los sótanos son negativos.', ar: 'اختر المبنى. الأقبية سالبة.' },
        isSolved: (state) => state.context === 'floors' && state.value === -3
    },
    {
        id: 2104,
        prompt: { eu: 'Itsasoa: kaio bat itsas mailatik 9 metro gora dabil. Kokatu.', es: 'Mar: una gaviota vuela a 9 metros sobre el nivel del mar. Colócala.', ar: 'البحر: نورس يطير على ارتفاع 9 أمتار فوق سطح البحر. ضعه.' },
        hint: { eu: 'Itsas mailatik gora = +.', es: 'Sobre el nivel del mar = +.', ar: 'فوق سطح البحر = +.' },
        isSolved: (state) => state.context === 'sea' && state.value === 9
    }
]

export const introCompareChallenges: LabChallenge<CompareState>[] = [
    {
        id: 2201,
        prompt: { eu: 'Alderatu +5 eta −3, eta asmatu ikurra.', es: 'Compara +5 y −3 y acierta el signo.', ar: 'قارن ⁦+5⁩ و⁦−3⁩ وأصب الرمز.' },
        hint: { eu: 'Positibo bat beti da negatibo bat baino handiagoa.', es: 'Un positivo siempre es mayor que un negativo.', ar: 'الموجب دائمًا أكبر من السالب.' },
        isSolved: (state) => guessedRight(state) && pairIs(state, 5, -3)
    },
    {
        id: 2202,
        prompt: { eu: 'Alderatu −7 eta −4, eta asmatu ikurra.', es: 'Compara −7 y −4 y acierta el signo.', ar: 'قارن ⁦−7⁩ و⁦−4⁩ وأصب الرمز.' },
        hint: { eu: 'Zerotik hurbilen dagoena da handiena.', es: 'El más cercano al cero es el mayor.', ar: 'الأقرب إلى الصفر هو الأكبر.' },
        isSolved: (state) => guessedRight(state) && pairIs(state, -7, -4)
    },
    {
        id: 2203,
        prompt: { eu: 'Alderatu −10 eta −8, eta asmatu ikurra.', es: 'Compara −10 y −8 y acierta el signo.', ar: 'قارن ⁦−10⁩ و⁦−8⁩ وأصب الرمز.' },
        hint: { eu: '$\\lvert -10\\rvert >\\lvert -8\\rvert$, beraz −10 zerotik urrunago dago.', es: '$\\lvert -10\\rvert >\\lvert -8\\rvert$, así que −10 está más lejos del cero.', ar: '$\\lvert -10\\rvert >\\lvert -8\\rvert$، إذن ⁦−10⁩ أبعد عن الصفر.' },
        isSolved: (state) => guessedRight(state) && pairIs(state, -10, -8)
    },
    {
        id: 2204,
        prompt: { eu: 'Alderatu +3 eta −3, eta asmatu ikurra.', es: 'Compara +3 y −3 y acierta el signo.', ar: 'قارن ⁦+3⁩ و⁦−3⁩ وأصب الرمز.' },
        hint: { eu: 'Balio absolutu bera dute, baina bata positiboa da.', es: 'Tienen el mismo valor absoluto, pero uno es positivo.', ar: 'لهما القيمة المطلقة نفسها لكن أحدهما موجب.' },
        isSolved: (state) => guessedRight(state) && pairIs(state, 3, -3)
    }
]

export const introMirrorChallenges: LabChallenge<MirrorState>[] = [
    {
        id: 2301,
        prompt: { eu: 'Aukeratu balio absolutua 9 duen zenbaki positiboa.', es: 'Elige el número positivo cuyo valor absoluto es 9.', ar: 'اختر العدد الموجب الذي قيمته المطلقة 9.' },
        hint: { eu: 'Zerotik 9 unitatera, eskuinean.', es: 'A 9 unidades del cero, por la derecha.', ar: 'على بعد 9 وحدات من الصفر، جهة اليمين.' },
        isSolved: (state) => state.value === 9
    },
    {
        id: 2302,
        prompt: { eu: 'Erakutsi −7ren aurkakoa.', es: 'Muestra el opuesto de −7.', ar: 'اعرض معاكس ⁦−7⁩.' },
        hint: { eu: 'Aukeratu −7 eta aktibatu aurkakoa.', es: 'Elige el −7 y activa el opuesto.', ar: 'اختر ⁦−7⁩ وفعّل المعاكس.' },
        isSolved: (state) => state.value === -7 && state.showOpposite
    },
    {
        id: 2303,
        prompt: { eu: 'Aurkitu bere aurkakotik 8 unitatera dagoen zenbaki bat, eta erakutsi biak.', es: 'Encuentra un número que esté a 8 unidades de su opuesto y muestra los dos.', ar: 'جد عددًا يبعد 8 وحدات عن معاكسه واعرض الاثنين.' },
        hint: { eu: 'Bakoitza zerotik 8ren erdira.', es: 'Cada uno a la mitad de 8 del cero.', ar: 'كل منهما على بعد نصف 8 من الصفر.' },
        isSolved: (state) => Math.abs(state.value) === 4 && state.showOpposite
    },
    {
        id: 2304,
        prompt: { eu: 'Aukeratu zerotik hurbilen dagoen zenbaki negatiboa.', es: 'Elige el número negativo más cercano al cero.', ar: 'اختر العدد السالب الأقرب إلى الصفر.' },
        hint: { eu: 'Balio absolutu txikiena duen negatiboa.', es: 'El negativo de menor valor absoluto.', ar: 'السالب صاحب أصغر قيمة مطلقة.' },
        isSolved: (state) => state.value === -1
    }
]

export const introCountersChallenges: LabChallenge<CountersState>[] = [
    {
        id: 2401,
        prompt: { eu: 'Irudikatu $(+5)+(-3)$: 5 € ditut eta 3 € zor ditut.', es: 'Representa $(+5)+(-3)$: tengo 5 € y debo 3 €.', ar: 'مثّل $(+5)+(-3)$: لديّ 5 € وعليّ 3 €.' },
        hint: { eu: '5 fitxa positibo eta 3 negatibo.', es: '5 fichas positivas y 3 negativas.', ar: '5 بطاقات موجبة و3 سالبة.' },
        isSolved: (state) => state.positive === 5 && state.negative === 3
    },
    {
        id: 2402,
        prompt: { eu: 'Irudikatu $(-4)+(-1)$.', es: 'Representa $(-4)+(-1)$.', ar: 'مثّل $(-4)+(-1)$.' },
        hint: { eu: 'Bi zorrak batera: negatiboak bakarrik.', es: 'Dos deudas juntas: solo fichas negativas.', ar: 'دَينان معًا: بطاقات سالبة فقط.' },
        isSolved: (state) => state.positive === 0 && state.negative === 5
    },
    {
        id: 2403,
        prompt: { eu: '6 € ditut eta 6 € zor ditut. Irudikatu: zenbat daukat guztira?', es: 'Tengo 6 € y debo 6 €. Represéntalo: ¿cuánto tengo en total?', ar: 'لديّ 6 € وعليّ 6 €. مثّل ذلك: كم لديّ في المجموع؟' },
        hint: { eu: 'Aurkakoak: bikote guztiak.', es: 'Son opuestos: todo parejas.', ar: 'متعاكسان: كلها أزواج.' },
        isSolved: (state) => state.positive === 6 && state.negative === 6
    },
    {
        id: 2404,
        prompt: { eu: 'Irudikatu −2 zehazki 10 fitxarekin.', es: 'Representa −2 con exactamente 10 fichas.', ar: 'مثّل ⁦−2⁩ بعشر بطاقات بالضبط.' },
        hint: { eu: 'Bikoteak kentzean 2 negatibo geratu behar dira.', es: 'Al quitar las parejas tienen que quedar 2 negativas.', ar: 'بعد حذف الأزواج يجب أن تبقى بطاقتان سالبتان.' },
        isSolved: (state) => state.positive + state.negative === 10 && state.positive - state.negative === -2
    }
]

export const introJumpsChallenges: LabChallenge<JumpsState>[] = [
    {
        id: 2501,
        prompt: { eu: 'Egin $(+5)+(-3)$ eta idatzi emaitza.', es: 'Haz $(+5)+(-3)$ y escribe el resultado.', ar: 'نفّذ $(+5)+(-3)$ واكتب الناتج.' },
        hint: { eu: 'Hasi +5ean eta egin 3 urrats ezkerrera.', es: 'Empieza en +5 y da 3 pasos a la izquierda.', ar: 'ابدأ من ⁦+5⁩ وتقدّم 3 خطوات إلى اليسار.' },
        isSolved: (state) => state.start === 5 && state.op === 'add' && state.amount === -3 && answered(state, 2)
    },
    {
        id: 2502,
        prompt: { eu: 'Egin $(-3)+(+5)$ eta idatzi emaitza.', es: 'Haz $(-3)+(+5)$ y escribe el resultado.', ar: 'نفّذ $(-3)+(+5)$ واكتب الناتج.' },
        hint: { eu: 'Hasi −3an eta egin 5 urrats eskuinera.', es: 'Empieza en −3 y da 5 pasos a la derecha.', ar: 'ابدأ من ⁦−3⁩ وتقدّم 5 خطوات إلى اليمين.' },
        isSolved: (state) => state.start === -3 && state.op === 'add' && state.amount === 5 && answered(state, 2)
    },
    {
        id: 2503,
        prompt: { eu: 'Egin $(+5)-(+2)$ eta idatzi emaitza.', es: 'Haz $(+5)-(+2)$ y escribe el resultado.', ar: 'نفّذ $(+5)-(+2)$ واكتب الناتج.' },
        hint: { eu: 'Aukeratu «−». $+2$ kentzea $-2$ batzea da.', es: 'Elige «−». Restar +2 es sumar −2.', ar: 'اختر «−». طرح ⁦+2⁩ يساوي جمع ⁦−2⁩.' },
        isSolved: (state) => state.start === 5 && state.op === 'subtract' && state.amount === 2 && answered(state, 3)
    },
    {
        id: 2504,
        prompt: { eu: 'Egin $(-6)-(-1)$ eta idatzi emaitza.', es: 'Haz $(-6)-(-1)$ y escribe el resultado.', ar: 'نفّذ $(-6)-(-1)$ واكتب الناتج.' },
        hint: { eu: 'Negatibo bat kentzea gora egitea da: $(-6)+(+1)$.', es: 'Restar un negativo es subir: $(-6)+(+1)$.', ar: 'طرح سالب يعني الصعود: $(-6)+(+1)$.' },
        isSolved: (state) => state.start === -6 && state.op === 'subtract' && state.amount === -1 && answered(state, jumpsResult(state))
    }
]

export const introSignsChallenges: LabChallenge<SignsState>[] = [
    {
        id: 2701,
        prompt: { eu: 'Kalkulatu $(+5)\\cdot(-3)$ eta idatzi emaitza.', es: 'Calcula $(+5)\\cdot(-3)$ y escribe el resultado.', ar: 'احسب $(+5)\\cdot(-3)$ واكتب الناتج.' },
        hint: { eu: '5 jauzi −3koak.', es: '5 saltos de −3.', ar: '5 قفزات مقدار كل منها ⁦−3⁩.' },
        isSolved: (state) => state.op === 'multiply' && state.groups === 5 && state.size === -3 && answered(state, -15)
    },
    {
        id: 2702,
        prompt: { eu: 'Kalkulatu $(-5)\\cdot(-3)$ eta idatzi emaitza.', es: 'Calcula $(-5)\\cdot(-3)$ y escribe el resultado.', ar: 'احسب $(-5)\\cdot(-3)$ واكتب الناتج.' },
        hint: { eu: 'Zeinu bera → +.', es: 'Mismo signo → +.', ar: 'الإشارة نفسها ← +.' },
        isSolved: (state) => state.op === 'multiply' && state.groups === -5 && state.size === -3 && answered(state, 15)
    },
    {
        id: 2703,
        prompt: { eu: 'Kalkulatu $(+20)\\mathbin{:}(-4)$ eta idatzi emaitza.', es: 'Calcula $(+20)\\mathbin{:}(-4)$ y escribe el resultado.', ar: 'احسب $(+20)\\mathbin{:}(-4)$ واكتب الناتج.' },
        hint: { eu: 'Aukeratu zatiketa, zatitzailea −4 eta zatikizuna +20.', es: 'Elige la división, divisor −4 y dividendo +20.', ar: 'اختر القسمة، والمقسوم عليه ⁦−4⁩ والمقسوم ⁦+20⁩.' },
        isSolved: (state) => state.op === 'divide' && state.size === -4 && signsProduct(state) === 20 && answered(state, -5)
    },
    {
        id: 2704,
        prompt: { eu: 'Kalkulatu $(-20)\\mathbin{:}(-4)$ eta idatzi emaitza.', es: 'Calcula $(-20)\\mathbin{:}(-4)$ y escribe el resultado.', ar: 'احسب $(-20)\\mathbin{:}(-4)$ واكتب الناتج.' },
        hint: { eu: 'Zeinu bera → +.', es: 'Mismo signo → +.', ar: 'الإشارة نفسها ← +.' },
        isSolved: (state) => state.op === 'divide' && state.size === -4 && signsProduct(state) === -20 && answered(state, 5)
    }
]

/* ---------- Brackets: the sign of every term when a bracket goes away ---------- */

export type ExpressionPart = { kind: 'number'; value: number } | { kind: 'bracket'; sign: '+' | '-'; terms: number[] }

export interface BracketsExercise {
    id: number
    parts: ExpressionPart[]
}

const num = (value: number): ExpressionPart => ({ kind: 'number', value })
const bracket = (sign: '+' | '-', ...terms: number[]): ExpressionPart => ({ kind: 'bracket', sign, terms })

export const bracketsExercises: BracketsExercise[] = [
    // −(8 + 9 − 11) = −6
    { id: 1, parts: [bracket('-', 8, 9, -11)] },
    // 8 − (4 − 7) = 11
    { id: 2, parts: [num(8), bracket('-', 4, -7)] },
    // +(−5 + 3 − 2 + 7) = +3
    { id: 3, parts: [bracket('+', -5, 3, -2, 7)] },
    // −4 − (5 − 7) − (4 + 5) = −11
    { id: 4, parts: [num(-4), bracket('-', 5, -7), bracket('-', 4, 5)] }
]

/** Every term once the brackets are removed, with its right sign */
export function flattenParts(parts: ExpressionPart[]): number[] {
    return parts.flatMap((part) => (part.kind === 'number' ? [part.value] : part.terms.map((term) => (part.sign === '-' ? -term : term))))
}

export const bracketsValue = (parts: ExpressionPart[]) => flattenParts(parts).reduce((sum, term) => sum + term, 0)

/** Keys of the terms the learner has to sign: "part-term" for every term inside a bracket */
export function bracketSlots(parts: ExpressionPart[]): string[] {
    return parts.flatMap((part, index) => (part.kind === 'bracket' ? part.terms.map((_, term) => `${index}-${term}`) : []))
}

export interface BracketsState extends OperationAnswer {
    exercise: number
    /** The sign chosen for each bracket term, by slot */
    signs: Record<string, '+' | '-'>
    /** Exercises finished with the right signs and result */
    finished: number[]
}

export function startBrackets(exercise: number, finished: number[] = []): BracketsState {
    return { exercise, signs: {}, finished, ...freshAnswer }
}

export const initialBracketsState: BracketsState = startBrackets(1)

export const exerciseOf = (state: Pick<BracketsState, 'exercise'>) => bracketsExercises.find((item) => item.id === state.exercise) ?? bracketsExercises[0]

/** The right sign of a slot once its bracket is removed */
export function rightSign(parts: ExpressionPart[], slot: string): '+' | '-' {
    const [partIndex, termIndex] = slot.split('-').map(Number)
    const part = parts[partIndex]
    if (part.kind !== 'bracket') throw new Error('Not a bracket term')
    const value = part.sign === '-' ? -part.terms[termIndex] : part.terms[termIndex]
    return value < 0 ? '-' : '+'
}

export function setBracketSign(state: BracketsState, slot: string, sign: '+' | '-'): BracketsState {
    return { ...state, signs: { ...state.signs, [slot]: sign }, ...freshAnswer }
}

export function signsAllRight(state: BracketsState): boolean {
    const { parts } = exerciseOf(state)
    return bracketSlots(parts).every((slot) => state.signs[slot] === rightSign(parts, slot))
}

/** The worked result is shown once it is typed right or revealed */
export function resultIsVisible(state: BracketsState): boolean {
    return state.revealed || (state.checked && answered(state, bracketsValue(exerciseOf(state).parts)))
}

/** Applies a change of the typed result and records the exercise when all is right */
export function updateBracketsAnswer(state: BracketsState, patch: Partial<OperationAnswer>): BracketsState {
    const next = { ...state, ...patch }
    const { parts } = exerciseOf(next)
    if (next.checked && !next.revealed && signsAllRight(next) && answered(next, bracketsValue(parts)) && !next.finished.includes(next.exercise)) {
        return { ...next, finished: [...next.finished, next.exercise] }
    }
    return next
}

export const bracketsChallenges: LabChallenge<BracketsState>[] = bracketsExercises.map((exercise, index) => ({
    id: 2601 + index,
    prompt: {
        eu: `Kendu parentesiak eta kalkulatu ${exercise.id}. eragiketa (zeinu guztiak ondo eta emaitza idatzita).`,
        es: `Quita los paréntesis y calcula la operación ${exercise.id} (todos los signos bien y el resultado escrito).`,
        ar: `احذف الأقواس واحسب العملية ${exercise.id} (كل الإشارات صحيحة والنتيجة مكتوبة).`
    },
    hint: exercise.parts.some((part) => part.kind === 'bracket' && part.sign === '-')
        ? { eu: 'Aurretik − duen parentesian zeinu guztiak aldatzen dira.', es: 'En el paréntesis precedido de − cambian todos los signos.', ar: 'في القوس المسبوق بـ − تتغير كل الإشارات.' }
        : { eu: 'Aurretik + duenean, zeinuak ez dira aldatzen.', es: 'Si va precedido de +, los signos no cambian.', ar: 'إذا سبقه + لا تتغير الإشارات.' },
    isSolved: (state: BracketsState) => state.finished.includes(exercise.id)
}))

export const introLabChallengeIds: number[] = [
    ...introLineChallenges,
    ...introCompareChallenges,
    ...introMirrorChallenges,
    ...introCountersChallenges,
    ...introJumpsChallenges,
    ...bracketsChallenges,
    ...introSignsChallenges
].map((challenge) => challenge.id)
