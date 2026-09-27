import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { checkAnswer, fraction } from '../../../features/unit-v2/math/fraction.ts'
import { freshAnswer, type LabChallenge, type LabToolInfo as UnitLabToolInfo, type LabToolProps, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { IntegerStageId } from '../lessons.tsx'
import { bin, finishedWith, num, square, startExercise, type HierarchyExercise, type HierarchyState } from '../../../features/unit-v2/math/expression.ts'

/* ==========================================================================
   Zenbaki osoak laboratory: tool list, pure state logic and challenges.
   Components live next to this file; tests in tests/zenbaki-osoak-lab.test.ts.
   ========================================================================== */

export type IntegerLabToolId = 'line' | 'mirror' | 'compare' | 'counters' | 'jumps' | 'signs' | 'hierarchy'

export interface IntegerLabTool extends UnitLabToolInfo {
    id: IntegerLabToolId
    stage: IntegerStageId
}

/** Loose on purpose: the 1. DBH unit reuses these tools with its own tool list and challenges */
export type IntegerToolProps = LabToolProps<UnitLabToolInfo>

export const integerLabTools: IntegerLabTool[] = [
    {
        id: 'line',
        stage: 'integers',
        lessonTopic: 'negatives',
        title: { eu: 'Zuzena eta egoerak', es: 'Recta y situaciones', ar: 'الخط والمواقف' },
        observe: {
            eu: 'Zeroa erreferentzia da: zerotik gora (eskuinera) positiboak daude eta zerotik behera (ezkerrera) negatiboak. Egoera bakoitzak bere zeroa du: 0 °C, behe solairua edo itsas maila.',
            es: 'El cero es la referencia: por encima (a la derecha) están los positivos y por debajo (a la izquierda) los negativos. Cada situación tiene su cero: 0 °C, la planta baja o el nivel del mar.',
            ar: 'الصفر هو المرجع: فوقه (إلى اليمين) الأعداد الموجبة وتحته (إلى اليسار) الأعداد السالبة. لكل موقف صفره: ‏0 °م أو الطابق الأرضي أو مستوى سطح البحر.'
        }
    },
    {
        id: 'mirror',
        stage: 'absolute',
        lessonTopic: 'opposite',
        title: { eu: 'Ispilua: balio absolutua eta aurkakoa', es: 'Espejo: valor absoluto y opuesto', ar: 'المرآة: القيمة المطلقة والمعاكس' },
        observe: {
            eu: 'Balio absolutua zerora arteko distantzia da. Aurkakoa zeroaren beste aldean dago, distantzia berera: zeroa ispilu bat balitz bezala.',
            es: 'El valor absoluto es la distancia hasta el cero. El opuesto está al otro lado del cero, a la misma distancia: como si el cero fuera un espejo.',
            ar: 'القيمة المطلقة هي المسافة حتى الصفر. والمعاكس يقع في الجهة الأخرى من الصفر على المسافة نفسها، كأن الصفر مرآة.'
        }
    },
    {
        id: 'compare',
        stage: 'ordering',
        lessonTopic: 'compare',
        title: { eu: 'Konparatu', es: 'Comparar', ar: 'قارن' },
        observe: {
            eu: 'Aurreikusi lehenik ikurra eta gero begiratu zuzenari: eskuinean dagoena da beti handiena, baita bi zenbakiak negatiboak direnean ere.',
            es: 'Predice primero el signo y después mira la recta: el que está más a la derecha es siempre el mayor, también cuando los dos son negativos.',
            ar: 'توقّع الرمز أولًا ثم انظر إلى الخط: العدد الواقع إلى اليمين هو الأكبر دائمًا، حتى عندما يكون العددان سالبين.'
        }
    },
    {
        id: 'counters',
        stage: 'addsub',
        lessonTopic: 'shorthand',
        title: { eu: 'Fitxa positiboak eta negatiboak', es: 'Fichas positivas y negativas', ar: 'بطاقات موجبة وسالبة' },
        observe: {
            eu: 'Fitxa positibo batek eta negatibo batek elkar deuseztatzen dute: batera 0 dira. Bikoteak kendu ondoren geratzen diren fitxek ematen dute emaitza. Horixe da modu laburtua: batu positiboak, batu negatiboak eta kendu.',
            es: 'Una ficha positiva y una negativa se anulan: juntas valen 0. Las fichas que quedan al quitar las parejas dan el resultado. Eso es la forma abreviada: suma positivos, suma negativos y resta.',
            ar: 'البطاقة الموجبة والبطاقة السالبة تلغي إحداهما الأخرى: معًا تساويان 0. البطاقات التي تبقى بعد حذف الأزواج تعطي النتيجة. هذه هي الصيغة المختصرة: اجمع الموجبة واجمع السالبة ثم اطرح.'
        }
    },
    {
        id: 'jumps',
        stage: 'addsub',
        lessonTopic: 'subtract',
        title: { eu: 'Jauziak zuzenean', es: 'Saltos en la recta', ar: 'قفزات على الخط' },
        observe: {
            eu: 'Positibo bat batzea eskuinera joatea da, eta negatibo bat batzea ezkerrera. Kentzea aurkakoa batzea da: horregatik, negatibo bat kentzean eskuinera goaz.',
            es: 'Sumar un positivo es ir a la derecha y sumar un negativo, a la izquierda. Restar es sumar el opuesto: por eso, al restar un negativo vamos a la derecha.',
            ar: 'جمع عدد موجب يعني التحرك يمينًا، وجمع عدد سالب يعني التحرك يسارًا. والطرح هو جمع المعاكس: لذلك عند طرح عدد سالب نتحرك يمينًا.'
        }
    },
    {
        id: 'signs',
        stage: 'muldiv',
        lessonTopic: 'multiply-divide',
        title: { eu: 'Zeinuen araua', es: 'Regla de los signos', ar: 'قاعدة الإشارات' },
        observe: {
            eu: 'Biderkatzea jauzi berdinak errepikatzea da. Lehen faktorea negatiboa bada, emaitza zeroaren beste aldera islatzen da: horregatik (−)·(−) positiboa da. Zatiketak galdera bera egiten du alderantziz.',
            es: 'Multiplicar es repetir saltos iguales. Si el primer factor es negativo, el resultado se refleja al otro lado del cero: por eso (−)·(−) es positivo. La división hace la misma pregunta al revés.',
            ar: 'الضرب تكرار لقفزات متساوية. إذا كان العامل الأول سالبًا انعكست النتيجة إلى الجهة الأخرى من الصفر: لذلك (−)·(−) موجب. والقسمة تطرح السؤال نفسه بالعكس.'
        }
    },
    {
        id: 'hierarchy',
        stage: 'muldiv',
        lessonTopic: 'combined',
        title: { eu: 'Hierarkia urratsez urrats', es: 'Jerarquía paso a paso', ar: 'أولوية العمليات خطوة بخطوة' },
        observe: {
            eu: 'Sakatu lehenik egin behar den eragiketa eta kalkulatu. Parentesien barrukoa lehenik; gero biderketak eta zatiketak; azkenik batuketak eta kenketak, ezkerretik eskuinera.',
            es: 'Pulsa la operación que hay que hacer primero y calcúlala. Primero lo de dentro de los paréntesis; después productos y cocientes; al final sumas y restas, de izquierda a derecha.',
            ar: 'اضغط العملية التي يجب إجراؤها أولًا واحسبها. ما داخل الأقواس أولًا، ثم الضرب والقسمة، وأخيرًا الجمع والطرح من اليسار إلى اليمين.'
        }
    }
]

/** Lab tool that best illustrates each lesson */
export const integerLabToolForTopic: Record<string, IntegerLabToolId | undefined> = {
    negatives: 'line',
    'integer-set': 'line',
    absolute: 'mirror',
    opposite: 'mirror',
    compare: 'compare',
    order: 'compare',
    add: 'jumps',
    subtract: 'jumps',
    shorthand: 'counters',
    brackets: 'counters',
    'multiply-divide': 'signs',
    combined: 'hierarchy'
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const answered = (state: OperationAnswer, expected: number) => checkAnswer(state.answer, fraction(expected)) === 'correct'

/** Whether a tool should show its worked result: the learner got it right or asked to see it */
export function integerResultVisible(state: OperationAnswer, expected: number): boolean {
    return state.revealed || (state.checked && answered(state, expected))
}

/* ---------- Number line and situations ---------- */

export const LINE_LIMITS = { min: -10, max: 10 } as const

export type LineContext = 'plain' | 'temperature' | 'floors' | 'sea'

export interface LineState {
    context: LineContext
    value: number
}

export const initialLineState: LineState = { context: 'plain', value: 3 }

export function setLineValue(state: LineState, value: number): LineState {
    return { ...state, value: clamp(value, LINE_LIMITS.min, LINE_LIMITS.max) }
}

/** The value read in everyday words for the chosen situation */
export function describeLineValue(context: LineContext, value: number): LocalizedText {
    const size = Math.abs(value)
    if (context === 'temperature') {
        if (value === 0) return { eu: '0 °C: izozte-puntua', es: '0 °C: el punto de congelación', ar: '0 °م: درجة التجمّد' }
        return value > 0
            ? { eu: `Zero gainetik ${size} gradu`, es: `${size} grados sobre cero`, ar: `${size} درجات فوق الصفر` }
            : { eu: `Zero azpitik ${size} gradu`, es: `${size} grados bajo cero`, ar: `${size} درجات تحت الصفر` }
    }
    if (context === 'floors') {
        if (value === 0) return { eu: 'Behe solairua', es: 'La planta baja', ar: 'الطابق الأرضي' }
        return value > 0
            ? { eu: `${size}. solairua`, es: `La planta ${size}`, ar: `الطابق ${size}` }
            : { eu: `${size}. sotoa`, es: `El sótano ${size}`, ar: `الطابق ${size} تحت الأرض` }
    }
    if (context === 'sea') {
        if (value === 0) return { eu: 'Itsas mailan', es: 'Al nivel del mar', ar: 'عند مستوى سطح البحر' }
        return value > 0
            ? { eu: `Itsas mailatik ${size} m gora`, es: `${size} m sobre el nivel del mar`, ar: `${size} م فوق سطح البحر` }
            : { eu: `Itsas mailatik ${size} m behera`, es: `${size} m bajo el nivel del mar`, ar: `${size} م تحت سطح البحر` }
    }
    if (value === 0) return { eu: 'Zeroa: ez positiboa ez negatiboa', es: 'El cero: ni positivo ni negativo', ar: 'الصفر: ليس موجبًا ولا سالبًا' }
    return value > 0
        ? { eu: 'Zenbaki oso positiboa', es: 'Número entero positivo', ar: 'عدد صحيح موجب' }
        : { eu: 'Zenbaki oso negatiboa', es: 'Número entero negativo', ar: 'عدد صحيح سالب' }
}

export const lineChallenges: LabChallenge<LineState>[] = [
    {
        id: 1101,
        prompt: { eu: 'Kokatu −4 zuzenean.', es: 'Coloca el −4 en la recta.', ar: 'ضع ⁦−4⁩ على الخط.' },
        hint: { eu: 'Negatiboak zeroaren ezkerrean daude: 4 urrats ezkerrera.', es: 'Los negativos están a la izquierda del cero: 4 pasos a la izquierda.', ar: 'الأعداد السالبة يسار الصفر: 4 خطوات إلى اليسار.' },
        isSolved: (state) => state.value === -4
    },
    {
        id: 1102,
        prompt: { eu: 'Termometroa: markatu zero azpitik 6 gradu.', es: 'Termómetro: marca 6 grados bajo cero.', ar: 'ميزان الحرارة: حدّد 6 درجات تحت الصفر.' },
        hint: { eu: 'Aukeratu termometroa. Zero azpitik = zeinu negatiboa.', es: 'Elige el termómetro. Bajo cero = signo negativo.', ar: 'اختر ميزان الحرارة. تحت الصفر = إشارة سالبة.' },
        isSolved: (state) => state.context === 'temperature' && state.value === -6
    },
    {
        id: 1103,
        prompt: { eu: 'Eraikina: joan 2. sotora.', es: 'Edificio: baja al sótano 2.', ar: 'المبنى: انزل إلى الطابق الثاني تحت الأرض.' },
        hint: { eu: 'Aukeratu eraikina. Behe solairua 0 da; sotoak negatiboak dira.', es: 'Elige el edificio. La planta baja es el 0; los sótanos son negativos.', ar: 'اختر المبنى. الطابق الأرضي هو 0، والطوابق تحت الأرض سالبة.' },
        isSolved: (state) => state.context === 'floors' && state.value === -2
    },
    {
        id: 1104,
        prompt: { eu: 'Itsasoa: urpekari bat itsas mailatik 8 m behera dago. Kokatu.', es: 'Mar: un buzo está 8 m bajo el nivel del mar. Colócalo.', ar: 'البحر: غوّاص على عمق 8 م تحت سطح البحر. ضعه على الخط.' },
        hint: { eu: 'Aukeratu itsasoa. Itsas maila da zeroa.', es: 'Elige el mar. El nivel del mar es el cero.', ar: 'اختر البحر. مستوى سطح البحر هو الصفر.' },
        isSolved: (state) => state.context === 'sea' && state.value === -8
    }
]

/* ---------- Mirror: absolute value and opposite ---------- */

export interface MirrorState {
    value: number
    showOpposite: boolean
}

export const initialMirrorState: MirrorState = { value: -3, showOpposite: false }

export function setMirrorValue(state: MirrorState, value: number): MirrorState {
    return { ...state, value: clamp(value, LINE_LIMITS.min, LINE_LIMITS.max) }
}

export const mirrorChallenges: LabChallenge<MirrorState>[] = [
    {
        id: 1201,
        prompt: { eu: 'Aukeratu balio absolutua 6 duen zenbaki negatiboa.', es: 'Elige el número negativo cuyo valor absoluto es 6.', ar: 'اختر العدد السالب الذي قيمته المطلقة 6.' },
        hint: { eu: 'Zerotik 6 unitatera, ezkerraldean.', es: 'A 6 unidades del cero, por la izquierda.', ar: 'على بعد 6 وحدات من الصفر، جهة اليسار.' },
        isSolved: (state) => state.value === -6
    },
    {
        id: 1202,
        prompt: { eu: 'Erakutsi +4ren aurkakoa zuzenean.', es: 'Muestra en la recta el opuesto de +4.', ar: 'اعرض على الخط معاكس ⁦+4⁩.' },
        hint: { eu: 'Aukeratu +4 eta aktibatu «Aurkakoa erakutsi».', es: 'Elige el +4 y activa «Mostrar el opuesto».', ar: 'اختر ⁦+4⁩ وفعّل «اعرض المعاكس».' },
        isSolved: (state) => state.value === 4 && state.showOpposite
    },
    {
        id: 1203,
        prompt: { eu: 'Aurkitu zenbaki bat bere aurkakotik 10 unitatera dagoena, eta erakutsi biak.', es: 'Encuentra un número que esté a 10 unidades de su opuesto y muestra los dos.', ar: 'جد عددًا يبعد 10 وحدات عن معاكسه واعرض الاثنين.' },
        hint: { eu: 'Zenbakia eta bere aurkakoa zerotik distantzia berera daude: 10en erdia.', es: 'El número y su opuesto están a la misma distancia del cero: la mitad de 10.', ar: 'العدد ومعاكسه على المسافة نفسها من الصفر: نصف 10.' },
        isSolved: (state) => Math.abs(state.value) === 5 && state.showOpposite
    },
    {
        id: 1204,
        prompt: { eu: 'Zein zenbaki da bere buruaren aurkakoa? Aukeratu.', es: '¿Qué número es su propio opuesto? Elígelo.', ar: 'أي عدد هو معاكس نفسه؟ اختره.' },
        hint: { eu: 'Bere aurkakoa leku berean egon behar da: ispiluaren gainean.', es: 'Su opuesto tiene que estar en el mismo sitio: sobre el espejo.', ar: 'يجب أن يكون معاكسه في المكان نفسه: فوق المرآة.' },
        isSolved: (state) => state.value === 0
    }
]

/* ---------- Compare ---------- */

export type Relation = '<' | '=' | '>'

export interface CompareState {
    first: number
    second: number
    guess: Relation | null
}

export const initialCompareState: CompareState = { first: -2, second: -6, guess: null }

export function relationOf(first: number, second: number): Relation {
    return first < second ? '<' : first > second ? '>' : '='
}

/** Changing a number asks for a new prediction */
export function setCompareValue(state: CompareState, which: 'first' | 'second', value: number): CompareState {
    return { ...state, [which]: clamp(value, LINE_LIMITS.min, LINE_LIMITS.max), guess: null }
}

const guessedRight = (state: CompareState) => state.guess === relationOf(state.first, state.second)

export const compareChallenges: LabChallenge<CompareState>[] = [
    {
        id: 1301,
        prompt: { eu: 'Alderatu −3 eta −8, eta asmatu ikurra.', es: 'Compara −3 y −8 y acierta el signo.', ar: 'قارن ⁦−3⁩ و⁦−8⁩ وأصب الرمز.' },
        hint: { eu: 'Bi negatiboetan, zerotik hurbilen dagoena da handiena.', es: 'Entre dos negativos, el más cercano al cero es el mayor.', ar: 'بين عددين سالبين، الأقرب إلى الصفر هو الأكبر.' },
        isSolved: (state) => guessedRight(state) && [state.first, state.second].sort((a, b) => a - b).join() === '-8,-3'
    },
    {
        id: 1302,
        prompt: { eu: 'Aukeratu bi zenbaki aurkako (zero ez) eta asmatu ikurra.', es: 'Elige dos números opuestos (que no sean cero) y acierta el signo.', ar: 'اختر عددين متعاكسين (غير الصفر) وأصب الرمز.' },
        hint: { eu: 'Balio absolutu bera eta zeinu desberdina: adibidez −5 eta +5.', es: 'Mismo valor absoluto y distinto signo: por ejemplo −5 y +5.', ar: 'القيمة المطلقة نفسها والإشارة مختلفة: مثل ⁦−5⁩ و⁦+5⁩.' },
        isSolved: (state) => guessedRight(state) && state.first !== 0 && state.first === -state.second
    },
    {
        id: 1303,
        prompt: { eu: 'Aurkitu bi zenbaki non balio absolutu handiena duena txikiena den, eta asmatu ikurra.', es: 'Busca dos números en los que el de mayor valor absoluto sea el menor, y acierta el signo.', ar: 'جد عددين يكون فيهما صاحب القيمة المطلقة الأكبر هو الأصغر، وأصب الرمز.' },
        hint: { eu: 'Probatu bi zenbaki negatiborekin.', es: 'Prueba con dos números negativos.', ar: 'جرّب عددين سالبين.' },
        isSolved: (state) => guessedRight(state) && (
            (Math.abs(state.first) > Math.abs(state.second) && state.first < state.second)
            || (Math.abs(state.second) > Math.abs(state.first) && state.second < state.first)
        )
    },
    {
        id: 1304,
        prompt: { eu: 'Alderatu 0 eta zenbaki negatibo bat, eta asmatu ikurra.', es: 'Compara el 0 con un número negativo y acierta el signo.', ar: 'قارن الصفر بعدد سالب وأصب الرمز.' },
        hint: { eu: 'Zeroa negatibo guztiak baino handiagoa da.', es: 'El cero es mayor que todos los negativos.', ar: 'الصفر أكبر من جميع الأعداد السالبة.' },
        isSolved: (state) => guessedRight(state) && ((state.first === 0 && state.second < 0) || (state.second === 0 && state.first < 0))
    }
]

/* ---------- Positive and negative counters ---------- */

export const COUNTER_LIMITS = { min: 0, max: 15 } as const

export interface CountersState {
    positive: number
    negative: number
}

export const initialCountersState: CountersState = { positive: 3, negative: 5 }

export function setCounters(state: CountersState, which: 'positive' | 'negative', value: number): CountersState {
    return { ...state, [which]: clamp(value, COUNTER_LIMITS.min, COUNTER_LIMITS.max) }
}

export function countersSummary(state: CountersState): { pairs: number; result: number } {
    return { pairs: Math.min(state.positive, state.negative), result: state.positive - state.negative }
}

export const countersChallenges: LabChallenge<CountersState>[] = [
    {
        id: 1401,
        prompt: { eu: 'Irudikatu −3 zehazki 5 fitxarekin.', es: 'Representa −3 con exactamente 5 fichas.', ar: 'مثّل ⁦−3⁩ بخمس بطاقات بالضبط.' },
        hint: { eu: 'Bikote batek 0 balio du. Zenbat negatibo geratu behar dira bikoteak kendu ondoren?', es: 'Una pareja vale 0. ¿Cuántos negativos deben quedar al quitar las parejas?', ar: 'الزوج يساوي 0. كم بطاقة سالبة يجب أن تبقى بعد حذف الأزواج؟' },
        isSolved: (state) => state.positive + state.negative === 5 && state.positive - state.negative === -3
    },
    {
        id: 1402,
        prompt: { eu: 'Irudikatu 0 8 fitxarekin.', es: 'Representa 0 con 8 fichas.', ar: 'مثّل 0 بثماني بطاقات.' },
        hint: { eu: 'Bikote guztiak: positibo adina negatibo.', es: 'Todo parejas: tantos positivos como negativos.', ar: 'كلها أزواج: عدد الموجبة يساوي عدد السالبة.' },
        isSolved: (state) => state.positive === 4 && state.negative === 4
    },
    {
        id: 1403,
        prompt: { eu: 'Irudikatu +2, gutxienez 3 fitxa negatibo erabiliz.', es: 'Representa +2 usando al menos 3 fichas negativas.', ar: 'مثّل ⁦+2⁩ باستعمال 3 بطاقات سالبة على الأقل.' },
        hint: { eu: 'Negatibo bakoitzak positibo bat deuseztatzen du: jarri beste 2 positibo gehiago.', es: 'Cada negativo anula un positivo: pon 2 positivos más que negativos.', ar: 'كل بطاقة سالبة تلغي بطاقة موجبة: ضع بطاقتين موجبتين زيادة على السالبة.' },
        isSolved: (state) => state.negative >= 3 && state.positive - state.negative === 2
    },
    {
        id: 1404,
        prompt: { eu: 'Irudikatu $-6+10-7$ fitxekin (zenbaki bakoitza bere fitxekin).', es: 'Representa $-6+10-7$ con fichas (cada número con sus fichas).', ar: 'مثّل $-6+10-7$ بالبطاقات (كل عدد ببطاقاته).' },
        hint: { eu: 'Positiboak: 10. Negatiboak: 6 + 7.', es: 'Positivas: 10. Negativas: 6 + 7.', ar: 'الموجبة: 10. السالبة: 6 + 7.' },
        isSolved: (state) => state.positive === 10 && state.negative === 13
    }
]

/* ---------- Jumps on the line: addition and subtraction ---------- */

export const JUMP_LIMITS = { min: -9, max: 9 } as const

export interface JumpsState extends OperationAnswer {
    start: number
    op: 'add' | 'subtract'
    amount: number
}

export const initialJumpsState: JumpsState = { start: -5, op: 'add', amount: 8, ...freshAnswer }

export function setJumps(state: JumpsState, patch: Partial<Pick<JumpsState, 'start' | 'op' | 'amount'>>): JumpsState {
    const next = { ...state, ...patch }
    return { ...next, start: clamp(next.start, JUMP_LIMITS.min, JUMP_LIMITS.max), amount: clamp(next.amount, JUMP_LIMITS.min, JUMP_LIMITS.max), ...freshAnswer }
}

/** The movement actually made on the line: subtracting b is adding its opposite */
export function jumpMove(state: Pick<JumpsState, 'op' | 'amount'>): number {
    return state.op === 'add' ? state.amount : -state.amount
}

export function jumpsResult(state: Pick<JumpsState, 'start' | 'op' | 'amount'>): number {
    return state.start + jumpMove(state)
}

export const jumpsChallenges: LabChallenge<JumpsState>[] = [
    {
        id: 1501,
        prompt: { eu: 'Egin $(-5)+(+8)$ eta idatzi emaitza.', es: 'Haz $(-5)+(+8)$ y escribe el resultado.', ar: 'نفّذ $(-5)+(+8)$ واكتب الناتج.' },
        hint: { eu: 'Hasi −5ean eta egin 8 urrats eskuinera.', es: 'Empieza en −5 y da 8 pasos a la derecha.', ar: 'ابدأ من ⁦−5⁩ وتقدّم 8 خطوات إلى اليمين.' },
        isSolved: (state) => state.start === -5 && state.op === 'add' && state.amount === 8 && answered(state, 3)
    },
    {
        id: 1502,
        prompt: { eu: 'Kendu zenbaki negatibo bat eta idatzi emaitza. Zein norabidetan mugitu zara?', es: 'Resta un número negativo y escribe el resultado. ¿Hacia dónde te has movido?', ar: 'اطرح عددًا سالبًا واكتب الناتج. في أي اتجاه تحركت؟' },
        hint: { eu: 'Aukeratu «−» eta bigarren zenbaki negatibo bat. Kentzea aurkakoa batzea da.', es: 'Elige «−» y un segundo número negativo. Restar es sumar el opuesto.', ar: 'اختر «−» وعددًا ثانيًا سالبًا. الطرح هو جمع المعاكس.' },
        isSolved: (state) => state.op === 'subtract' && state.amount < 0 && answered(state, jumpsResult(state))
    },
    {
        id: 1503,
        prompt: { eu: 'Lortu 0 bi zenbaki aurkako batuz, eta idatzi emaitza.', es: 'Consigue 0 sumando dos números opuestos y escribe el resultado.', ar: 'احصل على 0 بجمع عددين متعاكسين واكتب الناتج.' },
        hint: { eu: 'Adibidez $(+6)+(-6)$.', es: 'Por ejemplo $(+6)+(-6)$.', ar: 'مثلًا $(+6)+(-6)$.' },
        isSolved: (state) => state.op === 'add' && state.start !== 0 && state.start === -state.amount && answered(state, 0)
    },
    {
        id: 1504,
        prompt: { eu: 'Lortu −7 bi zenbaki negatibo batuz, eta idatzi emaitza.', es: 'Consigue −7 sumando dos números negativos y escribe el resultado.', ar: 'احصل على ⁦−7⁩ بجمع عددين سالبين واكتب الناتج.' },
        hint: { eu: 'Zeinu bera: batu balio absolutuak. Zein bi zenbakik ematen dute 7?', es: 'Mismo signo: suma los valores absolutos. ¿Qué dos números suman 7?', ar: 'الإشارة نفسها: اجمع القيمتين المطلقتين. أي عددين مجموعهما 7؟' },
        isSolved: (state) => state.op === 'add' && state.start < 0 && state.amount < 0 && jumpsResult(state) === -7 && answered(state, -7)
    }
]

/* ---------- Sign rule: products and quotients as repeated jumps ---------- */

export const SIGN_LIMITS = { min: -5, max: 5 } as const

export interface SignsState extends OperationAnswer {
    op: 'multiply' | 'divide'
    /** Number of jumps (the quotient when dividing); its sign says whether to reflect */
    groups: number
    /** Size of each jump (the divisor when dividing); never zero */
    size: number
}

export const initialSignsState: SignsState = { op: 'multiply', groups: -3, size: 4, ...freshAnswer }

/** Jump sizes skip 0: there is no jump of size zero, and nobody divides by zero */
export function setSignsSize(state: SignsState, size: number): SignsState {
    let next = clamp(size, SIGN_LIMITS.min, SIGN_LIMITS.max)
    if (next === 0) next = size > state.size ? 1 : -1
    return { ...state, size: next, ...freshAnswer }
}

export function setSignsGroups(state: SignsState, groups: number): SignsState {
    return { ...state, groups: clamp(groups, SIGN_LIMITS.min, SIGN_LIMITS.max), ...freshAnswer }
}

/** When dividing the learner chooses the dividend, always a multiple of the divisor */
export function setSignsDividend(state: SignsState, dividend: number): SignsState {
    return setSignsGroups(state, Math.round(dividend / state.size))
}

export function setSignsOp(state: SignsState, op: SignsState['op']): SignsState {
    return state.op === op ? state : { ...state, op, ...freshAnswer }
}

export const signsProduct = (state: Pick<SignsState, 'groups' | 'size'>) => state.groups * state.size

/** The value the learner has to find: the product, or the quotient when dividing */
export function signsResult(state: SignsState): number {
    return state.op === 'multiply' ? signsProduct(state) : state.groups
}

export const signsChallenges: LabChallenge<SignsState>[] = [
    {
        id: 1601,
        prompt: { eu: 'Kalkulatu $(-3)\\cdot(+4)$ eta idatzi emaitza.', es: 'Calcula $(-3)\\cdot(+4)$ y escribe el resultado.', ar: 'احسب $(-3)\\cdot(+4)$ واكتب الناتج.' },
        hint: { eu: '3 jauzi +4koak, eta gero islatu: lehen faktorea negatiboa da.', es: '3 saltos de +4 y luego refleja: el primer factor es negativo.', ar: '3 قفزات مقدار كل منها ⁦+4⁩ ثم اعكس: العامل الأول سالب.' },
        isSolved: (state) => state.op === 'multiply' && state.groups === -3 && state.size === 4 && answered(state, -12)
    },
    {
        id: 1602,
        prompt: { eu: 'Lortu biderkadura positibo bat bi faktore negatiborekin, eta idatzi emaitza.', es: 'Consigue un producto positivo con dos factores negativos y escribe el resultado.', ar: 'احصل على ناتج ضرب موجب بعاملين سالبين واكتب الناتج.' },
        hint: { eu: 'Jauzi negatiboak ezkerrera doaz; islatzean eskuinera pasatzen dira.', es: 'Los saltos negativos van a la izquierda; al reflejarlos pasan a la derecha.', ar: 'القفزات السالبة تتجه يسارًا، وعند عكسها تنتقل إلى اليمين.' },
        isSolved: (state) => state.op === 'multiply' && state.groups < 0 && state.size < 0 && answered(state, signsProduct(state))
    },
    {
        id: 1603,
        prompt: { eu: 'Kalkulatu $(-20)\\mathbin{:}(+5)$ eta idatzi emaitza.', es: 'Calcula $(-20)\\mathbin{:}(+5)$ y escribe el resultado.', ar: 'احسب $(-20)\\mathbin{:}(+5)$ واكتب الناتج.' },
        hint: { eu: 'Aukeratu zatiketa, zatitzailea +5 eta zatikizuna −20.', es: 'Elige la división, divisor +5 y dividendo −20.', ar: 'اختر القسمة، والمقسوم عليه ⁦+5⁩ والمقسوم ⁦−20⁩.' },
        isSolved: (state) => state.op === 'divide' && state.size === 5 && signsProduct(state) === -20 && answered(state, -4)
    },
    {
        id: 1604,
        prompt: { eu: 'Aurkitu −12 ematen duen biderketa bat, lehen faktorea negatiboa izanda, eta idatzi emaitza.', es: 'Encuentra una multiplicación que dé −12 con el primer factor negativo y escribe el resultado.', ar: 'جد عملية ضرب ناتجها ⁦−12⁩ عاملها الأول سالب، واكتب الناتج.' },
        hint: { eu: 'Lehen faktorea negatiboa bada, bigarrenak positiboa izan behar du.', es: 'Si el primer factor es negativo, el segundo tiene que ser positivo.', ar: 'إذا كان العامل الأول سالبًا فيجب أن يكون الثاني موجبًا.' },
        isSolved: (state) => state.op === 'multiply' && state.groups < 0 && signsProduct(state) === -12 && answered(state, -12)
    }
]

/* ---------- Order of operations, step by step (logic shared in features/unit-v2/math/expression.ts) ---------- */

export {
    applyOp,
    checkStep,
    chooseOperation,
    evaluateExpr,
    nodeAt,
    operationPaths,
    reduceStep,
    submitStep,
    type Expr,
    type ExprPath,
    type HierarchyExercise,
    type HierarchyOp,
    type HierarchyState,
    type StepCheck
} from '../../../features/unit-v2/math/expression.ts'

const n = num

/** The trees follow the usual reading: products before sums, left to right */
export const hierarchyExercises: HierarchyExercise[] = [
    // 20 − 3·(−4) + (−18):(−6)
    { id: 1, expr: bin(bin(n(20, false), '-', bin(n(3, false), '·', n(-4))), '+', bin(n(-18), ':', n(-6))) },
    // (−5) − [(+3) − (−4)]·(−2)
    { id: 2, expr: bin(n(-5), '-', bin(square(bin(n(3), '-', n(-4))), '·', n(-2))) },
    // (−4) − [(−8) − (+2)]:(−5) + (−6):[(+1) − (−2)]
    { id: 3, expr: bin(bin(n(-4), '-', bin(square(bin(n(-8), '-', n(2))), ':', n(-5))), '+', bin(n(-6), ':', square(bin(n(1), '-', n(-2))))) },
    // [(−3)·(+4) − (−6)]:(−2) + (−5)·(−1)
    { id: 4, expr: bin(bin(square(bin(bin(n(-3), '·', n(4)), '-', n(-6))), ':', n(-2)), '+', bin(n(-5), '·', n(-1))) }
]

export const startHierarchy = (exercise: number, finished: HierarchyState['finished'] = {}): HierarchyState => startExercise(hierarchyExercises, exercise, finished)

export const initialHierarchyState: HierarchyState = startHierarchy(1)

export const hierarchyChallenges: LabChallenge<HierarchyState>[] = [
    {
        id: 1701,
        prompt: { eu: 'Amaitu 1. eragiketa.', es: 'Termina la operación 1.', ar: 'أكمل العملية 1.' },
        hint: { eu: 'Biderketa bat eta zatiketa bat daude: horiek lehenik, edozein ordenatan.', es: 'Hay un producto y un cociente: primero esos, en cualquier orden.', ar: 'هناك ضرب وقسمة: ابدأ بهما بأي ترتيب.' },
        isSolved: (state) => finishedWith(state, 1, () => true)
    },
    {
        id: 1702,
        prompt: { eu: 'Amaitu 2. eragiketa ordenan hutsik egin gabe.', es: 'Termina la operación 2 sin equivocarte de orden.', ar: 'أكمل العملية 2 دون خطأ في الترتيب.' },
        hint: { eu: 'Kako zuzena lehenik, gero biderketa, azkenik kenketa.', es: 'Primero el corchete, luego el producto y al final la resta.', ar: 'القوس المعقوف أولًا، ثم الضرب، وأخيرًا الطرح.' },
        isSolved: (state) => finishedWith(state, 2, (mistakes) => mistakes.order === 0)
    },
    {
        id: 1703,
        prompt: { eu: 'Amaitu 3. eragiketa (liburuko adibidea).', es: 'Termina la operación 3 (el ejemplo del libro).', ar: 'أكمل العملية 3 (مثال الكتاب).' },
        hint: { eu: 'Bi kako daude: egin biak lehenik, gero zatiketak.', es: 'Hay dos corchetes: haz los dos primero y después los cocientes.', ar: 'هناك قوسان معقوفان: احسبهما أولًا ثم القسمتين.' },
        isSolved: (state) => finishedWith(state, 3, () => true)
    },
    {
        id: 1704,
        prompt: { eu: 'Amaitu 4. eragiketa akatsik gabe: ez ordenan, ez kalkuluetan.', es: 'Termina la operación 4 sin ningún error: ni de orden ni de cálculo.', ar: 'أكمل العملية 4 دون أي خطأ: لا في الترتيب ولا في الحساب.' },
        hint: { eu: 'Kako barruan ere biderketa kenketa baino lehen doa.', es: 'Dentro del corchete también va el producto antes que la resta.', ar: 'داخل القوس المعقوف أيضًا يأتي الضرب قبل الطرح.' },
        isSolved: (state) => finishedWith(state, 4, (mistakes) => mistakes.order === 0 && mistakes.calc === 0)
    }
]

export const integerLabChallengeIds: number[] = [
    ...lineChallenges,
    ...mirrorChallenges,
    ...compareChallenges,
    ...countersChallenges,
    ...jumpsChallenges,
    ...signsChallenges,
    ...hierarchyChallenges
].map((challenge) => challenge.id)
