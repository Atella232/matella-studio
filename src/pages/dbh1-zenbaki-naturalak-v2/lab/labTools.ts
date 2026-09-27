import { checkAnswer, fraction } from '../../../features/unit-v2/math/fraction.ts'
import { bin, finishedWith, num, round, square, startExercise, type HierarchyExercise, type HierarchyState } from '../../../features/unit-v2/math/expression.ts'
import { freshAnswer, type LabChallenge, type LabToolInfo as UnitLabToolInfo, type LabToolProps, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import type { NaturalsStageId } from '../lessons.tsx'
import { fromRoman, readNaturalAnswer, toRoman } from '../numbers.ts'

/* ==========================================================================
   Zenbaki naturalak laboratory: tool list, pure state logic and challenges.
   Components live next to this file; tests in tests/zenbaki-naturalak-lab.test.ts.
   ========================================================================== */

export type NaturalsLabToolId = 'abacus' | 'line' | 'roman' | 'rounding' | 'distributive' | 'division' | 'semaphore' | 'powers'

export interface NaturalsLabTool extends UnitLabToolInfo {
    id: NaturalsLabToolId
    stage: NaturalsStageId
}

export type NaturalsToolProps = LabToolProps<NaturalsLabTool>

export const naturalsLabTools: NaturalsLabTool[] = [
    {
        id: 'abacus',
        stage: 'numbering',
        lessonTopic: 'place-value',
        title: { eu: 'Posizio-taula', es: 'Tabla de posiciones', ar: 'جدول المراتب' },
        observe: {
            eu: 'Zutabe bakoitzak eskuinekoak baino 10 aldiz gehiago balio du. Zutabe bat 9tik pasatzen denean, 10 unitate hurrengo zutabeko unitate 1 bihurtzen dira.',
            es: 'Cada columna vale 10 veces más que la de su derecha. Cuando una columna pasa de 9, 10 unidades se cambian por 1 unidad de la columna siguiente.',
            ar: 'كل عمود يساوي 10 أضعاف العمود الذي على يمينه. وعندما يتجاوز عمود الرقم 9 تُستبدل 10 وحدات بوحدة واحدة من العمود التالي.'
        }
    },
    {
        id: 'line',
        stage: 'numbering',
        lessonTopic: 'order',
        title: { eu: 'Zuzeneko saltoak', es: 'Saltos en la recta', ar: 'القفزات على المستقيم' },
        observe: {
            eu: 'Salto guztiak berdinak dira: bi muturren arteko distantzia zati salto kopurua. Marka bakoitza aurrekoa gehi salto bat da.',
            es: 'Todos los saltos son iguales: la distancia entre los extremos entre el número de saltos. Cada marca es la anterior más un salto.',
            ar: 'كل القفزات متساوية: المسافة بين الطرفين مقسومة على عدد القفزات. وكل علامة هي السابقة زائد قفزة.'
        }
    },
    {
        id: 'roman',
        stage: 'numbering',
        lessonTopic: 'roman',
        title: { eu: 'Erromatar zenbakiak idazten', es: 'Escribir números romanos', ar: 'كتابة الأرقام الرومانية' },
        observe: {
            eu: 'Ikurrak ezkerretik eskuinera irakurtzen dira eta batu egiten dira; txiki bat handiago baten aurretik badago, kendu egiten da. Ikur bera ezin da lau aldiz jarraian idatzi.',
            es: 'Los símbolos se leen de izquierda a derecha y se suman; si uno pequeño va delante de uno mayor, se resta. El mismo símbolo no puede ir cuatro veces seguidas.',
            ar: 'تُقرأ الرموز من اليسار إلى اليمين وتُجمع؛ وإذا جاء رمز صغير قبل رمز أكبر يُطرح. ولا يتكرر الرمز نفسه أربع مرات متتالية.'
        }
    },
    {
        id: 'rounding',
        stage: 'rounding',
        lessonTopic: 'rounding',
        title: { eu: 'Biribiltze-zuzena', es: 'La recta del redondeo', ar: 'مستقيم التقريب' },
        observe: {
            eu: 'Zenbakia bi zenbaki biribilen artean dago. Erdia gainditzen badu (edo erdian badago), handienera doa; bestela, txikienera.',
            es: 'El número está entre dos números redondos. Si pasa de la mitad (o está justo en ella), va al mayor; si no, al menor.',
            ar: 'يقع العدد بين عددين مدوَّرين. إذا تجاوز المنتصف (أو كان عليه تمامًا) يذهب إلى الأكبر، وإلا فإلى الأصغر.'
        }
    },
    {
        id: 'distributive',
        stage: 'operations',
        lessonTopic: 'multiply',
        title: { eu: 'Laukizuzena zatitzen', es: 'Partir el rectángulo', ar: 'تقسيم المستطيل' },
        observe: {
            eu: 'Laukizuzen osoa bi zatitan banatzean, karratu kopurua ez da aldatzen: a · (b + c) = a · b + a · c. Hori da 9z edo 11z buruz biderkatzeko trikimailua.',
            es: 'Al partir el rectángulo en dos trozos, el número de cuadrados no cambia: a · (b + c) = a · b + a · c. Es el truco para multiplicar mentalmente.',
            ar: 'عند تقسيم المستطيل إلى جزأين لا يتغير عدد المربعات: a · (b + c) = a · b + a · c. هذه حيلة الضرب الذهني.'
        }
    },
    {
        id: 'division',
        stage: 'operations',
        lessonTopic: 'divide',
        title: { eu: 'Banaketak', es: 'Repartos', ar: 'التوزيع' },
        observe: {
            eu: 'Fitxak zatitzailearen tamainako taldetan jartzen dira. Talde osoak zatidura dira, eta soberan geratzen direnak hondarra, beti zatitzailea baino gutxiago.',
            es: 'Las fichas se colocan en grupos del tamaño del divisor. Los grupos completos son el cociente y las que sobran, el resto, siempre menos que el divisor.',
            ar: 'تُرتّب القطع في مجموعات بحجم المقسوم عليه. المجموعات الكاملة هي خارج القسمة، وما يبقى هو الباقي، وهو دائمًا أقل من المقسوم عليه.'
        }
    },
    {
        id: 'semaphore',
        stage: 'combined',
        lessonTopic: 'hierarchy',
        title: { eu: 'Semaforoa', es: 'El semáforo', ar: 'إشارة المرور' },
        observe: {
            eu: 'Gorria (parentesiak) lehenik, gero horia (· eta :) eta azkenik berdea (+ eta −). Maila bereko eragiketak ezkerretik eskuinera egiten dira.',
            es: 'Primero el rojo (paréntesis), luego el amarillo (· y :) y al final el verde (+ y −). Las operaciones del mismo nivel, de izquierda a derecha.',
            ar: 'الأحمر (الأقواس) أولًا، ثم الأصفر (· و:) وأخيرًا الأخضر (+ و−). والعمليات من المستوى نفسه من اليسار إلى اليمين.'
        }
    },
    {
        id: 'powers',
        stage: 'powers',
        lessonTopic: 'powers',
        title: { eu: 'Berretura-makina', es: 'La máquina de potencias', ar: 'آلة القوى' },
        observe: {
            eu: 'Berretzailea 1 handitzean, emaitza oinarriarekin biderkatzen da. Oinarria 10 denean, berretzaileak zero kopurua ematen du.',
            es: 'Al subir el exponente en 1, el resultado se multiplica por la base. Con base 10, el exponente da el número de ceros.',
            ar: 'عند زيادة الأس بواحد تُضرب النتيجة في الأساس. وعندما يكون الأساس 10 يعطي الأس عدد الأصفار.'
        }
    }
]

export const naturalsLabToolForTopic: Record<string, NaturalsLabToolId | undefined> = {
    'place-value': 'abacus',
    'big-numbers': 'abacus',
    order: 'line',
    roman: 'roman',
    rounding: 'rounding',
    estimation: 'rounding',
    'add-subtract': 'abacus',
    multiply: 'distributive',
    divide: 'division',
    hierarchy: 'semaphore',
    brackets: 'semaphore',
    problems: 'semaphore',
    powers: 'powers',
    'powers-of-ten': 'powers'
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

/** Whether the typed result is right; 15.000 is read as fifteen thousand */
export const answered = (state: OperationAnswer, expected: number) => checkAnswer(readNaturalAnswer(state.answer), fraction(expected)) === 'correct'

export function resultVisible(state: OperationAnswer, expected: number): boolean {
    return state.revealed || (state.checked && answered(state, expected))
}

/* ---------- Place value table ---------- */

export const PLACES = 7
export const ABACUS_MAX = 10 ** PLACES - 1

export interface AbacusState {
    value: number
    /** Place (0 = units) of the last change, to see the carry of +1 */
    lastPlace: number | null
}

export const initialAbacusState: AbacusState = { value: 8706265, lastPlace: null }

/** Digits from the millions down to the units */
export function abacusDigits(value: number): number[] {
    return String(value).padStart(PLACES, '0').split('').map(Number)
}

/** Adds or removes one unit of a place, exchanging ten for one like the real table */
export function stepPlace(state: AbacusState, place: number, delta: 1 | -1): AbacusState {
    const next = state.value + delta * 10 ** place
    if (next < 0 || next > ABACUS_MAX) return state
    return { value: next, lastPlace: place }
}

export const setAbacus = (value: number): AbacusState => ({ value: clamp(value, 0, ABACUS_MAX), lastPlace: null })

export const abacusChallenges: LabChallenge<AbacusState>[] = [
    {
        id: 2101,
        prompt: { eu: 'Osatu 40.001 zenbakia taulan.', es: 'Forma el número 40.001 en la tabla.', ar: 'كوّن العدد 40.001 في الجدول.' },
        hint: { eu: '4 hamar milakoetan eta 1 unitateetan; beste guztiak 0.', es: 'Un 4 en las decenas de millar y un 1 en las unidades; el resto, 0.', ar: '4 في عشرات الآلاف و1 في الآحاد؛ والباقي 0.' },
        isSolved: (state) => state.value === 40001
    },
    {
        id: 2102,
        prompt: { eu: 'Osatu zenbaki bat non 7 zifrak 70.000 balio duen.', es: 'Forma un número en el que la cifra 7 valga 70.000.', ar: 'كوّن عددًا تكون فيه قيمة الرقم 7 هي 70.000.' },
        hint: { eu: '70.000 = 7 hamar milako.', es: '70.000 = 7 decenas de millar.', ar: '70.000 = 7 عشرات آلاف.' },
        isSolved: (state) => abacusDigits(state.value)[PLACES - 5] === 7
    },
    {
        id: 2103,
        prompt: { eu: 'Osatu bost zifrako zenbakirik handiena, zifren batura 5 izanik.', es: 'Forma el mayor número de cinco cifras cuyas cifras sumen 5.', ar: 'كوّن أكبر عدد من خمسة أرقام مجموع أرقامه 5.' },
        hint: { eu: 'Zifra handiena ezkerrean jarri behar da.', es: 'La cifra grande tiene que ir lo más a la izquierda posible.', ar: 'يجب وضع الرقم الكبير أقصى اليسار.' },
        isSolved: (state) => state.value === 50000
    },
    {
        id: 2104,
        prompt: { eu: 'Osatu 99.999 eta gehitu unitate bat unitateen ▲ botoiarekin. Zer gertatzen da?', es: 'Forma 99.999 y suma una unidad con el ▲ de las unidades. ¿Qué pasa?', ar: 'كوّن 99.999 وأضف وحدة بزر ▲ في الآحاد. ماذا يحدث؟' },
        hint: { eu: 'Lehenik 9 bat zutabe bakoitzean, bosgarrenetik unitateetara.', es: 'Primero un 9 en cada columna, de las decenas de millar a las unidades.', ar: 'أولًا 9 في كل عمود، من عشرات الآلاف إلى الآحاد.' },
        isSolved: (state) => state.value === 100000 && state.lastPlace === 0
    }
]

/* ---------- Jumps on the number line ---------- */

export const LINE_MAX = 10000000

export interface LineState extends OperationAnswer {
    from: number
    to: number
    parts: number
    /** Mark whose value is asked, from 1 to parts − 1 */
    mark: number
}

export const initialLineState: LineState = { from: 430, to: 830, parts: 4, mark: 1, ...freshAnswer }

export function setLine(state: LineState, patch: Partial<Pick<LineState, 'from' | 'to' | 'parts' | 'mark'>>): LineState {
    const from = clamp(patch.from ?? state.from, 0, LINE_MAX - 1)
    const to = clamp(patch.to ?? state.to, from + 1, LINE_MAX)
    const parts = clamp(patch.parts ?? state.parts, 2, 10)
    const mark = clamp(patch.mark ?? state.mark, 1, parts - 1)
    return { ...state, from, to, parts, mark, ...freshAnswer }
}

/** Size of each jump, or null when the distance cannot be shared exactly */
export function lineJump(state: Pick<LineState, 'from' | 'to' | 'parts'>): number | null {
    const distance = state.to - state.from
    return distance % state.parts === 0 ? distance / state.parts : null
}

export const markValue = (state: Pick<LineState, 'from' | 'to' | 'parts'>, mark: number) => {
    const jump = lineJump(state)
    return jump === null ? null : state.from + mark * jump
}

const lineIs = (state: LineState, from: number, to: number, parts: number) => state.from === from && state.to === to && state.parts === parts

export const lineChallenges: LabChallenge<LineState>[] = [
    {
        id: 2201,
        prompt: { eu: '430etik 830era 4 salto: zein zenbaki dago 3. markan? Idatzi.', es: 'De 430 a 830 en 4 saltos: ¿qué número hay en la 3.ª marca? Escríbelo.', ar: 'من 430 إلى 830 في 4 قفزات: ما العدد عند العلامة الثالثة؟ اكتبه.' },
        hint: { eu: '(830 − 430) : 4 = 100. Hiru salto 430etik.', es: '(830 − 430) : 4 = 100. Tres saltos desde 430.', ar: '(830 − 430) : 4 = 100. ثلاث قفزات من 430.' },
        isSolved: (state) => lineIs(state, 430, 830, 4) && state.mark === 3 && answered(state, 730)
    },
    {
        id: 2202,
        prompt: { eu: '5.000tik 6.000ra 4 zatitan: zein zenbaki dago lehen markan? Idatzi.', es: 'De 5.000 a 6.000 en 4 partes: ¿qué número hay en la primera marca? Escríbelo.', ar: 'من 5.000 إلى 6.000 في 4 أجزاء: ما العدد عند العلامة الأولى؟ اكتبه.' },
        hint: { eu: '1.000 : 4 = 250.', es: '1.000 : 4 = 250.', ar: '1.000 : 4 = 250.' },
        isSolved: (state) => lineIs(state, 5000, 6000, 4) && state.mark === 1 && answered(state, 5250)
    },
    {
        id: 2203,
        prompt: { eu: 'Egin 0tik 1.000ra doan zuzen bat, salto bakoitza 125 izan dadin.', es: 'Haz una recta de 0 a 1.000 en la que cada salto valga 125.', ar: 'ارسم مستقيمًا من 0 إلى 1.000 تكون فيه كل قفزة 125.' },
        hint: { eu: 'Zenbat aldiz sartzen da 125 1.000n?', es: '¿Cuántas veces cabe 125 en 1.000?', ar: 'كم مرة يدخل 125 في 1.000؟' },
        isSolved: (state) => state.from === 0 && state.to === 1000 && lineJump(state) === 125
    },
    {
        id: 2204,
        prompt: { eu: '2.000.000tik 3.000.000ra 5 salto: zein zenbaki dago 2. markan? Idatzi.', es: 'De 2.000.000 a 3.000.000 en 5 saltos: ¿qué número hay en la 2.ª marca? Escríbelo.', ar: 'من 2.000.000 إلى 3.000.000 في 5 قفزات: ما العدد عند العلامة الثانية؟ اكتبه.' },
        hint: { eu: 'Salto bakoitza 200.000 da.', es: 'Cada salto vale 200.000.', ar: 'كل قفزة تساوي 200.000.' },
        isSolved: (state) => lineIs(state, 2000000, 3000000, 5) && state.mark === 2 && answered(state, 2400000)
    }
]

/* ---------- Roman numerals ---------- */

export const ROMAN_SYMBOLS = ['I', 'V', 'X', 'L', 'C', 'D', 'M'] as const
export const ROMAN_VALUES: Record<(typeof ROMAN_SYMBOLS)[number], number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
export const ROMAN_MAX_LENGTH = 15

export interface RomanState {
    written: string
}

export const initialRomanState: RomanState = { written: 'XIV' }

export function addRomanSymbol(state: RomanState, symbol: (typeof ROMAN_SYMBOLS)[number]): RomanState {
    return state.written.length >= ROMAN_MAX_LENGTH ? state : { written: state.written + symbol }
}

export const removeRomanSymbol = (state: RomanState): RomanState => ({ written: state.written.slice(0, -1) })

/** What the symbols add up to when read with the add-or-subtract rule, even if badly written */
export function romanReading(written: string): number {
    const values = written.split('').map((symbol) => ROMAN_VALUES[symbol as keyof typeof ROMAN_VALUES] ?? 0)
    return values.reduce((total, value, index) => total + (value < (values[index + 1] ?? 0) ? -value : value), 0)
}

/** Whether the writing is correct, and if not, how that amount is written */
export function romanVerdict(written: string): { value: number | null; suggestion: string | null } {
    if (written === '') return { value: null, suggestion: null }
    const value = fromRoman(written)
    if (value !== null) return { value, suggestion: null }
    const reading = romanReading(written)
    return { value: null, suggestion: reading >= 1 && reading <= 3999 ? toRoman(reading) : null }
}

export const romanChallenges: LabChallenge<RomanState>[] = [
    {
        id: 2301,
        prompt: { eu: 'Idatzi aurtengo urtea, 2026, erromatar zenbakiz.', es: 'Escribe el año 2026 en números romanos.', ar: 'اكتب السنة 2026 بالأرقام الرومانية.' },
        hint: { eu: '2.000 = MM, 20 = XX, 6 = VI.', es: '2.000 = MM, 20 = XX, 6 = VI.', ar: '2.000 = MM، 20 = XX، 6 = VI.' },
        isSolved: (state) => fromRoman(state.written) === 2026
    },
    {
        id: 2302,
        prompt: { eu: 'Idatzi 49. Kontuz: ez da IL.', es: 'Escribe el 49. Cuidado: no es IL.', ar: 'اكتب 49. انتبه: ليس IL.' },
        hint: { eu: '49 = 40 + 9 = XL + IX.', es: '49 = 40 + 9 = XL + IX.', ar: '49 = 40 + 9 = XL + IX.' },
        isSolved: (state) => fromRoman(state.written) === 49
    },
    {
        id: 2303,
        prompt: { eu: 'Idatzi 944: hiru kenketa behar dira.', es: 'Escribe el 944: hacen falta tres restas.', ar: 'اكتب 944: تحتاج ثلاث عمليات طرح.' },
        hint: { eu: '900 = CM, 40 = XL, 4 = IV.', es: '900 = CM, 40 = XL, 4 = IV.', ar: '900 = CM، 40 = XL، 4 = IV.' },
        isSolved: (state) => fromRoman(state.written) === 944
    },
    {
        id: 2304,
        prompt: { eu: 'Idatzi ikur gehien behar dituen 100 baino txikiagoa den zenbakia.', es: 'Escribe el número menor que 100 que necesita más símbolos.', ar: 'اكتب العدد الأصغر من 100 الذي يحتاج أكبر عدد من الرموز.' },
        hint: { eu: 'Hamarrekoetan eta unitateetan ahalik eta ikur gehien: LXXX eta VIII.', es: 'Los máximos símbolos en decenas y unidades: LXXX y VIII.', ar: 'أكبر عدد من الرموز في العشرات والآحاد: LXXX وVIII.' },
        isSolved: (state) => fromRoman(state.written) === 88
    }
]

/* ---------- Rounding ---------- */

export const ROUNDING_PLACES = [10, 100, 1000, 10000, 100000, 1000000] as const
export type RoundingPlace = (typeof ROUNDING_PLACES)[number]
export const ROUNDING_MAX = 99999999

export interface RoundingState extends OperationAnswer {
    value: number
    place: RoundingPlace
}

export const initialRoundingState: RoundingState = { value: 14823, place: 1000, ...freshAnswer }

export function setRounding(state: RoundingState, patch: Partial<Pick<RoundingState, 'value' | 'place'>>): RoundingState {
    return { ...state, value: clamp(patch.value ?? state.value, 0, ROUNDING_MAX), place: patch.place ?? state.place, ...freshAnswer }
}

/** Rounds to the nearest multiple of `place`; the exact half goes up, as in class */
export function roundTo(value: number, place: number): number {
    const lower = Math.floor(value / place) * place
    return value - lower >= place / 2 ? lower + place : lower
}

export const roundingChallenges: LabChallenge<RoundingState>[] = [
    {
        id: 2401,
        prompt: { eu: 'Biribildu 26.421 milakoetara eta idatzi emaitza.', es: 'Redondea 26.421 a los millares y escribe el resultado.', ar: 'قرّب 26.421 إلى الآلاف واكتب النتيجة.' },
        hint: { eu: 'Milakoen eskuinean 4 dago.', es: 'A la derecha de los millares hay un 4.', ar: 'على يمين الآلاف يوجد 4.' },
        isSolved: (state) => state.value === 26421 && state.place === 1000 && answered(state, 26000)
    },
    {
        id: 2402,
        prompt: { eu: 'Biribildu 359.481 hamar milakoetara eta idatzi emaitza.', es: 'Redondea 359.481 a las decenas de millar y escribe el resultado.', ar: 'قرّب 359.481 إلى عشرات الآلاف واكتب النتيجة.' },
        hint: { eu: 'Hamar milakoak: 5. Eskuinean 9.', es: 'Decenas de millar: 5. A su derecha, 9.', ar: 'عشرات الآلاف: 5. وعلى يمينها 9.' },
        isSolved: (state) => state.value === 359481 && state.place === 10000 && answered(state, 360000)
    },
    {
        id: 2403,
        prompt: { eu: 'Jarri zenbaki bat erdi-erdian (adibidez, 3.500 milakoetara) eta idatzi nola biribiltzen den.', es: 'Pon un número justo en la mitad (por ejemplo, 3.500 a los millares) y escribe cómo se redondea.', ar: 'ضع عددًا في المنتصف تمامًا (مثل 3.500 إلى الآلاف) واكتب كيف يُقرَّب.' },
        hint: { eu: 'Eskuineko zifra 5 da: gora.', es: 'La cifra de la derecha es 5: hacia arriba.', ar: 'الرقم الذي على اليمين 5: نرفع.' },
        isSolved: (state) => state.value % state.place === state.place / 2 && answered(state, roundTo(state.value, state.place))
    },
    {
        id: 2404,
        prompt: { eu: 'Aurkitu zenbaki bat (100en multiploa ez dena), ehunekoetara eta milakoetara biribiltzean emaitza bera ematen duena. Idatzi.', es: 'Encuentra un número (que no sea múltiplo de 100) que al redondearlo a las centenas y a los millares dé lo mismo. Escríbelo.', ar: 'جد عددًا (ليس مضاعفًا لـ 100) يعطي النتيجة نفسها عند تقريبه إلى المئات وإلى الآلاف. اكتبها.' },
        hint: { eu: 'Probatu 7.980: ehunekoetara 8.000, milakoetara ere bai.', es: 'Prueba con 7.980: a las centenas da 8.000, y a los millares también.', ar: 'جرّب 7.980: إلى المئات 8.000، وإلى الآلاف أيضًا.' },
        isSolved: (state) => state.value % 100 !== 0 && roundTo(state.value, 100) === roundTo(state.value, 1000) && answered(state, roundTo(state.value, state.place))
    }
]

/* ---------- Distributive property ---------- */

export interface DistributiveState extends OperationAnswer {
    factor: number
    first: number
    second: number
}

export const DISTRIBUTIVE_LIMITS = { factor: 10, part: 12 } as const

export const initialDistributiveState: DistributiveState = { factor: 6, first: 8, second: 2, ...freshAnswer }

export function setDistributive(state: DistributiveState, patch: Partial<Pick<DistributiveState, 'factor' | 'first' | 'second'>>): DistributiveState {
    return {
        ...state,
        factor: clamp(patch.factor ?? state.factor, 1, DISTRIBUTIVE_LIMITS.factor),
        first: clamp(patch.first ?? state.first, 1, DISTRIBUTIVE_LIMITS.part),
        second: clamp(patch.second ?? state.second, 1, DISTRIBUTIVE_LIMITS.part),
        ...freshAnswer
    }
}

export const distributiveTotal = (state: Pick<DistributiveState, 'factor' | 'first' | 'second'>) => state.factor * (state.first + state.second)

const splitIs = (state: DistributiveState, factor: number, first: number, second: number) => state.factor === factor && state.first === first && state.second === second

export const distributiveChallenges: LabChallenge<DistributiveState>[] = [
    {
        id: 2501,
        prompt: { eu: 'Egin 6 · (8 + 2) eta idatzi karratu kopurua.', es: 'Haz 6 · (8 + 2) y escribe cuántos cuadrados hay.', ar: 'كوّن 6 · (8 + 2) واكتب عدد المربعات.' },
        hint: { eu: '6 · 8 + 6 · 2.', es: '6 · 8 + 6 · 2.', ar: '6 · 8 + 6 · 2.' },
        isSolved: (state) => splitIs(state, 6, 8, 2) && answered(state, 60)
    },
    {
        id: 2502,
        prompt: { eu: 'Kalkulatu 7 · 12, 12 = 10 + 2 banatuta. Idatzi emaitza.', es: 'Calcula 7 · 12 partiendo 12 = 10 + 2. Escribe el resultado.', ar: 'احسب 7 · 12 بتقسيم 12 = 10 + 2. اكتب النتيجة.' },
        hint: { eu: '7 · 10 + 7 · 2 = 70 + 14.', es: '7 · 10 + 7 · 2 = 70 + 14.', ar: '7 · 10 + 7 · 2 = 70 + 14.' },
        isSolved: (state) => splitIs(state, 7, 10, 2) && answered(state, 84)
    },
    {
        id: 2503,
        prompt: { eu: 'Kalkulatu 8 · 15, 15 = 10 + 5 banatuta. Idatzi emaitza.', es: 'Calcula 8 · 15 partiendo 15 = 10 + 5. Escribe el resultado.', ar: 'احسب 8 · 15 بتقسيم 15 = 10 + 5. اكتب النتيجة.' },
        hint: { eu: '8 · 10 + 8 · 5 = 80 + 40.', es: '8 · 10 + 8 · 5 = 80 + 40.', ar: '8 · 10 + 8 · 5 = 80 + 40.' },
        isSolved: (state) => splitIs(state, 8, 10, 5) && answered(state, 120)
    },
    {
        id: 2504,
        prompt: { eu: 'Egin laukizuzen bat: zati urdinean 40 karratu eta gorrian 12. Idatzi guztira zenbat diren.', es: 'Haz un rectángulo con 40 cuadrados en la parte azul y 12 en la roja. Escribe cuántos hay en total.', ar: 'كوّن مستطيلًا فيه 40 مربعًا في الجزء الأزرق و12 في الأحمر. اكتب المجموع.' },
        hint: { eu: 'Bi zatiek ilara kopuru bera dute: 40 eta 12ren zatitzaile komun bat.', es: 'Las dos partes tienen el mismo número de filas: un divisor común de 40 y 12.', ar: 'للجزأين عدد الصفوف نفسه: قاسم مشترك لـ 40 و12.' },
        isSolved: (state) => state.factor * state.first === 40 && state.factor * state.second === 12 && answered(state, 52)
    }
]

/* ---------- Sharing: dividend, divisor, quotient and remainder ---------- */

export const DIVISION_LIMITS = { dividend: 60, divisor: 12 } as const

export interface DivisionState extends OperationAnswer {
    dividend: number
    divisor: number
}

export const initialDivisionState: DivisionState = { dividend: 17, divisor: 5, ...freshAnswer }

export function setDivision(state: DivisionState, patch: Partial<Pick<DivisionState, 'dividend' | 'divisor'>>): DivisionState {
    return {
        ...state,
        dividend: clamp(patch.dividend ?? state.dividend, 1, DIVISION_LIMITS.dividend),
        divisor: clamp(patch.divisor ?? state.divisor, 1, DIVISION_LIMITS.divisor),
        ...freshAnswer
    }
}

export const divisionParts = (state: Pick<DivisionState, 'dividend' | 'divisor'>) => ({ quotient: Math.floor(state.dividend / state.divisor), remainder: state.dividend % state.divisor })

export const divisionChallenges: LabChallenge<DivisionState>[] = [
    {
        id: 2601,
        prompt: { eu: 'Banatu 17 fitxa 5eko taldetan. Idatzi zatidura.', es: 'Reparte 17 fichas en grupos de 5. Escribe el cociente.', ar: 'وزّع 17 قطعة في مجموعات من 5. اكتب خارج القسمة.' },
        hint: { eu: 'Zenbat talde oso osatzen dira?', es: '¿Cuántos grupos completos se forman?', ar: 'كم مجموعة كاملة تتكوّن؟' },
        isSolved: (state) => state.dividend === 17 && state.divisor === 5 && answered(state, 3)
    },
    {
        id: 2602,
        prompt: { eu: '7ko taldeekin, lortu ahalik eta hondar handiena.', es: 'Con grupos de 7, consigue el mayor resto posible.', ar: 'بمجموعات من 7، احصل على أكبر باقٍ ممكن.' },
        hint: { eu: 'Hondarra beti da zatitzailea baino txikiagoa.', es: 'El resto siempre es menor que el divisor.', ar: 'الباقي دائمًا أصغر من المقسوم عليه.' },
        isSolved: (state) => state.divisor === 7 && divisionParts(state).remainder === 6
    },
    {
        id: 2603,
        prompt: { eu: 'Banatu 48 fitxa, 6 talde oso gera daitezen eta ezer soberan ez.', es: 'Reparte 48 fichas de forma que salgan 6 grupos completos y no sobre nada.', ar: 'وزّع 48 قطعة بحيث تتكوّن 6 مجموعات كاملة ولا يبقى شيء.' },
        hint: { eu: '48 = ? · 6.', es: '48 = ? · 6.', ar: '48 = ? · 6.' },
        isSolved: (state) => state.dividend === 48 && divisionParts(state).quotient === 6 && divisionParts(state).remainder === 0
    },
    {
        id: 2604,
        prompt: { eu: '38 fitxarekin, aurkitu 3 hondarra uzten duen talde-tamaina bat (3 baino handiagoa). Idatzi zatidura.', es: 'Con 38 fichas, encuentra un tamaño de grupo (mayor que 3) que deje resto 3. Escribe el cociente.', ar: 'بـ 38 قطعة، جد حجم مجموعة (أكبر من 3) يترك باقيًا 3. اكتب خارج القسمة.' },
        hint: { eu: '38 − 3 = 35: zein zenbakik zatitzen du 35 zehazki?', es: '38 − 3 = 35: ¿qué números dividen exactamente a 35?', ar: '38 − 3 = 35: ما الأعداد التي تقسم 35 قسمة تامة؟' },
        isSolved: (state) => state.dividend === 38 && state.divisor > 3 && divisionParts(state).remainder === 3 && answered(state, divisionParts(state).quotient)
    }
]

/* ---------- Semaphore: order of operations step by step ---------- */

const n = (value: number) => num(value, false)

/** Trees read products before sums and same-level operations from left to right */
export const semaphoreExercises: HierarchyExercise[] = [
    // 75 : 3 + 4 · 6 − 45 : 9 = 44
    { id: 1, expr: bin(bin(bin(n(75), ':', n(3)), '+', bin(n(4), '·', n(6))), '-', bin(n(45), ':', n(9))) },
    // 20 − (3 + 5) · 2 + 12 : 4 = 7
    { id: 2, expr: bin(bin(n(20), '-', bin(round(bin(n(3), '+', n(5))), '·', n(2))), '+', bin(n(12), ':', n(4))) },
    // 3 · [13 − 3 · (5 − 2)] = 12
    { id: 3, expr: bin(n(3), '·', square(bin(n(13), '-', bin(n(3), '·', round(bin(n(5), '-', n(2))))))) },
    // 10 · [7 · 5 − (4 + 6 · 3)] = 130
    { id: 4, expr: bin(n(10), '·', square(bin(bin(n(7), '·', n(5)), '-', round(bin(n(4), '+', bin(n(6), '·', n(3))))))) }
]

export const startSemaphore = (exercise: number, finished: HierarchyState['finished'] = {}): HierarchyState => startExercise(semaphoreExercises, exercise, finished)

export const initialSemaphoreState: HierarchyState = startSemaphore(1)

export const semaphoreChallenges: LabChallenge<HierarchyState>[] = [
    {
        id: 2701,
        prompt: { eu: 'Amaitu 1. eragiketa (klaseko gidaren adibidea).', es: 'Termina la operación 1 (el ejemplo de la guía de clase).', ar: 'أكمل العملية 1 (مثال دليل القسم).' },
        hint: { eu: 'Hiru eragiketa horiak daude: horiek lehenik.', es: 'Hay tres operaciones amarillas: esas primero.', ar: 'هناك ثلاث عمليات صفراء: ابدأ بها.' },
        isSolved: (state) => finishedWith(state, 1, () => true)
    },
    {
        id: 2702,
        prompt: { eu: 'Amaitu 2. eragiketa ordenan hutsik egin gabe.', es: 'Termina la operación 2 sin equivocarte de orden.', ar: 'أكمل العملية 2 دون خطأ في الترتيب.' },
        hint: { eu: 'Gorria (parentesia), gero bi horiak, azkenik berdeak ezkerretik.', es: 'Rojo (el paréntesis), luego los dos amarillos y al final los verdes de izquierda a derecha.', ar: 'الأحمر (القوس)، ثم الأصفران، وأخيرًا الأخضران من اليسار.' },
        isSolved: (state) => finishedWith(state, 2, (mistakes) => mistakes.order === 0)
    },
    {
        id: 2703,
        prompt: { eu: 'Amaitu 3. eragiketa: parentesia kako zuzen baten barruan.', es: 'Termina la operación 3: un paréntesis dentro de un corchete.', ar: 'أكمل العملية 3: قوس داخل قوس معقوف.' },
        hint: { eu: 'Barrutik kanpora: ( ), gero [ ] barruko biderketa, gero kenketa.', es: 'De dentro hacia fuera: ( ), luego la multiplicación del [ ] y después la resta.', ar: 'من الداخل إلى الخارج: ( )، ثم الضرب داخل [ ]، ثم الطرح.' },
        isSolved: (state) => finishedWith(state, 3, () => true)
    },
    {
        id: 2704,
        prompt: { eu: 'Amaitu 4. eragiketa akatsik gabe: ez ordenan, ez kalkuluetan.', es: 'Termina la operación 4 sin ningún error: ni de orden ni de cálculo.', ar: 'أكمل العملية 4 دون أي خطأ: لا في الترتيب ولا في الحساب.' },
        hint: { eu: 'Parentesi barruan ere biderketa batuketa baino lehen.', es: 'Dentro del paréntesis también va la multiplicación antes que la suma.', ar: 'داخل القوس أيضًا يأتي الضرب قبل الجمع.' },
        isSolved: (state) => finishedWith(state, 4, (mistakes) => mistakes.order === 0 && mistakes.calc === 0)
    }
]

/* ---------- Powers ---------- */

export const POWER_LIMITS = { base: 10, exponent: 6 } as const

export interface PowersState extends OperationAnswer {
    base: number
    exponent: number
    /** Powers whose value the learner has typed correctly, as "base^exponent" */
    solved: string[]
}

export const initialPowersState: PowersState = { base: 2, exponent: 3, solved: [], ...freshAnswer }

export const powerValue = (state: Pick<PowersState, 'base' | 'exponent'>) => state.base ** state.exponent

export function setPowers(state: PowersState, patch: Partial<Pick<PowersState, 'base' | 'exponent'>>): PowersState {
    return {
        ...state,
        base: clamp(patch.base ?? state.base, 1, POWER_LIMITS.base),
        exponent: clamp(patch.exponent ?? state.exponent, 1, POWER_LIMITS.exponent),
        ...freshAnswer
    }
}

/** Applies a change of the typed result and remembers the powers worked out */
export function updatePowersAnswer(state: PowersState, patch: Partial<OperationAnswer>): PowersState {
    const next = { ...state, ...patch }
    const key = `${next.base}^${next.exponent}`
    if (next.checked && !next.revealed && answered(next, powerValue(next)) && !next.solved.includes(key)) {
        return { ...next, solved: [...next.solved, key] }
    }
    return next
}

const powerIs = (state: PowersState, base: number, exponent: number) => state.base === base && state.exponent === exponent

export const powersChallenges: LabChallenge<PowersState>[] = [
    {
        id: 2801,
        prompt: { eu: 'Kalkulatu $2^5$ eta idatzi emaitza.', es: 'Calcula $2^5$ y escribe el resultado.', ar: 'احسب $2^5$ واكتب النتيجة.' },
        hint: { eu: '2 · 2 · 2 · 2 · 2: bikoiztu bost aldiz 1etik.', es: '2 · 2 · 2 · 2 · 2: dobla cinco veces empezando en 1.', ar: '2 · 2 · 2 · 2 · 2: ضاعف خمس مرات بدءًا من 1.' },
        isSolved: (state) => powerIs(state, 2, 5) && answered(state, 32)
    },
    {
        id: 2802,
        prompt: { eu: 'Zenbat kubo txiki ditu 5eko kubo handi batek? Egin $5^3$ eta idatzi.', es: '¿Cuántos cubitos tiene un cubo de lado 5? Haz $5^3$ y escríbelo.', ar: 'كم مكعبًا صغيرًا في مكعب ضلعه 5؟ كوّن $5^3$ واكتبه.' },
        hint: { eu: '5 · 5 = 25 geruza bakoitzean, eta 5 geruza.', es: '5 · 5 = 25 en cada capa, y hay 5 capas.', ar: '5 · 5 = 25 في كل طبقة، وهناك 5 طبقات.' },
        isSolved: (state) => powerIs(state, 5, 3) && answered(state, 125)
    },
    {
        id: 2803,
        prompt: { eu: 'Idatzi $10^6$ zenbaki gisa. Zenbat zero ditu?', es: 'Escribe $10^6$ como número. ¿Cuántos ceros tiene?', ar: 'اكتب $10^6$ عددًا. كم صفرًا فيه؟' },
        hint: { eu: '1 eta sei zero: milioi bat.', es: 'Un 1 y seis ceros: un millón.', ar: '1 وستة أصفار: مليون.' },
        isSolved: (state) => powerIs(state, 10, 6) && answered(state, 1000000)
    },
    {
        id: 2804,
        prompt: { eu: 'Idatzi 64 berretura gisa bi modu desberdinetan (kalkulatu biak).', es: 'Escribe 64 como potencia de dos formas distintas (calcula las dos).', ar: 'اكتب 64 على صورة قوة بطريقتين مختلفتين (احسب الاثنتين).' },
        hint: { eu: '64 = 8 · 8, eta 64 = 4 · 4 · 4…', es: '64 = 8 · 8, y 64 = 4 · 4 · 4…', ar: '64 = 8 · 8، و64 = 4 · 4 · 4…' },
        isSolved: (state) => state.solved.filter((key) => {
            const [base, exponent] = key.split('^').map(Number)
            return base ** exponent === 64
        }).length >= 2
    }
]

export const naturalsLabChallengeIds: number[] = [
    ...abacusChallenges,
    ...lineChallenges,
    ...romanChallenges,
    ...roundingChallenges,
    ...distributiveChallenges,
    ...divisionChallenges,
    ...semaphoreChallenges,
    ...powersChallenges
].map((challenge) => challenge.id)
