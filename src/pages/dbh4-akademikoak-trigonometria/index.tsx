import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readTrigonometryAnswer } from './answers'
import { trigonometryChallenges, trigonometryDiagnostic, trigonometryExerciseBank, trigonometryPractice } from './content'
import { TrigonometryHeroArt } from './figures'
import { trigonometryStages, trigonometryTopics } from './lessons'

const trigonometriaUnit: UnitDefinition = {
    storagePrefix: 'matella-trigonometria-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Trigonometria', es: 'Trigonometría', ar: 'حساب المثلثات' },
    documentTitle: { eu: 'Trigonometria · 4. DBH', es: 'Trigonometría · 4.º ESO', ar: 'حساب المثلثات · الصف الرابع' },
    tagline: {
        eu: 'Sinua, kosinua eta tangentea, 30°, 45° eta 60°, oinarrizko erlazioak eta kalkulagailua, triangeluak ebaztea, altuerak eta distantziak behaketa bikoitzarekin, azalerak, zirkunferentzia goniometrikoa eta radiana.',
        es: 'Seno, coseno y tangente, 30°, 45° y 60°, las relaciones fundamentales y la calculadora, resolución de triángulos, alturas y distancias con la doble observación, áreas, la circunferencia goniométrica y el radián.',
        ar: 'الجيب وجيب التمام والظل، و30° و45° و60°، والعلاقات الأساسية والآلة الحاسبة، وحل المثلثات، والارتفاعات والمسافات بالرصد المزدوج، والمساحات، والدائرة المثلثية والراديان.'
    },
    heroArt: <TrigonometryHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, katetoetatik radianera', es: 'Cinco etapas, de los catetos al radián', ar: 'خمس مراحل، من الأضلاع القائمة إلى الراديان' },
    stages: trigonometryStages,
    topics: trigonometryTopics,
    diagnostic: trigonometryDiagnostic,
    guidedPractice: trigonometryPractice,
    exerciseBank: trigonometryExerciseBank,
    challenges: trigonometryChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bat, komarekin edo puntuarekin (0,75 edo 0.75), unitaterik gabe; angeluak gradutan. Negatiboak minus ikurrarekin.', es: 'Escribe un número, con coma o con punto (0,75 o 0.75), sin la unidad; los ángulos, en grados. Los negativos, con signo menos.', ar: 'اكتب عددًا بالنقطة أو بالفاصلة (0.75) دون الوحدة؛ والزوايا بالدرجات. والسالب بإشارة الناقص.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readTrigonometryAnswer,
        placeholder: () => ({ eu: 'Adib.: 0,75', es: 'Ej.: 0,75', ar: 'مثال: 0.75' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 0,6, −0,8 edo 36,9.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 0,6, −0,8 o 36,9.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 0.6 أو −0.8 أو 36.9.' }
    },
    errorByStage: {
        ratios: { eu: 'Aurkakoa angeluaren parean dago, ondokoa alboan. Hipotenusa beti zatitzailean sinuan eta kosinuan.', es: 'El opuesto está enfrente del ángulo y el contiguo a su lado. La hipotenusa va siempre debajo en el seno y el coseno.', ar: 'المقابل أمام الزاوية والمجاور بجانبها. والوتر دائمًا في المقام في الجيب وجيب التمام.' },
        identities: { eu: 'sin² + cos² = 1, ez sin + cos = 1. Angelu zorrotzean erro positiboa. Kalkulagailua DEG moduan.', es: 'sen² + cos² = 1, no sen + cos = 1. En un ángulo agudo, la raíz positiva. La calculadora, en modo DEG.', ar: 'sin² + cos² = 1 وليس sin + cos = 1. في الزاوية الحادة الجذر الموجب. والآلة الحاسبة بوضع DEG.' },
        solving: { eu: 'Aukeratu datua eta ezezaguna lotzen dituen arrazoia. Ezezaguna izendatzailean badago, zatitu.', es: 'Elige la razón que une el dato y la incógnita. Si la incógnita está en el denominador, divide.', ar: 'اختر النسبة التي تربط المعطى بالمجهول. وإذا كان المجهول في المقام فاقسم.' },
        problems: { eu: 'Angelu zuzenik ez badago, marraztu altuera. Bi angelu: bi ekuazio. Azalera: ½ · b · c · sin A.', es: 'Si no hay ángulo recto, traza una altura. Dos ángulos: dos ecuaciones. Área: ½ · b · c · sen A.', ar: 'إذا لم توجد زاوية قائمة فارسم ارتفاعًا. زاويتان: معادلتان. المساحة: ½ · b · c · sin A.' },
        circle: { eu: 'Zeinua koadranteak ematen du: II, sinua +; III, tangentea +; IV, kosinua +. 180° = π rad.', es: 'El signo lo da el cuadrante: II, seno +; III, tangente +; IV, coseno +. 180° = π rad.', ar: 'الربع يحدد الإشارة: الثاني الجيب +؛ الثالث الظل +؛ الرابع جيب التمام +. 180° = π rad.' }
    }
}

export function TrigonometriaDbh4AkIntroPage() {
    return <UnitPage unit={trigonometriaUnit} />
}
