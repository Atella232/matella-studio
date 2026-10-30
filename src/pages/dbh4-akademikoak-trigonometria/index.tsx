import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readTrigonometryAnswer } from './answers'
import { trigonometryChallenges, trigonometryDiagnostic, trigonometryExerciseBank, trigonometryPractice } from './content'
import { TrigonometryHeroArt } from './figures'
import { TrigonometryGames } from './games'
import { TRIGONOMETRY_GAME_RECORDS_KEY, trigonometryGameProgressIds } from './games/info'
import { TrigonometryLaboratory } from './lab'
import { trigonometryLabChallengeIds, trigonometryLabToolForTopic, trigonometryLabTools } from './lab/labTools'
import { trigonometryStages, trigonometryTopics } from './lessons'

const trigonometriaUnit: UnitDefinition = {
    storagePrefix: 'matella-trigonometria-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', en: '4th ESO · Academic', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Trigonometria', es: 'Trigonometría', en: 'Trigonometry', ar: 'حساب المثلثات' },
    documentTitle: { eu: 'Trigonometria · 4. DBH', es: 'Trigonometría · 4.º ESO', en: 'Trigonometry · 4th ESO', ar: 'حساب المثلثات · الصف الرابع' },
    tagline: {
        eu: 'Sinua, kosinua eta tangentea, 30°, 45° eta 60°, oinarrizko erlazioak eta kalkulagailua, triangeluak ebaztea, altuerak eta distantziak behaketa bikoitzarekin, azalerak, zirkunferentzia goniometrikoa eta radiana.',
        es: 'Seno, coseno y tangente, 30°, 45° y 60°, las relaciones fundamentales y la calculadora, resolución de triángulos, alturas y distancias con la doble observación, áreas, la circunferencia goniométrica y el radián.',
        en: 'Sine, cosine and tangent, 30°, 45° and 60°, the fundamental relationships and the calculator, solving triangles, heights and distances with double sighting, areas, the unit circle and the radian.',
        ar: 'الجيب وجيب التمام والظل، و30° و45° و60°، والعلاقات الأساسية والآلة الحاسبة، وحل المثلثات، والارتفاعات والمسافات بالرصد المزدوج، والمساحات، والدائرة المثلثية والراديان.'
    },
    heroArt: <TrigonometryHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, katetoetatik radianera', es: 'Cinco etapas, de los catetos al radián', en: 'Five stages, from the legs to the radian', ar: 'خمس مراحل، من الأضلاع القائمة إلى الراديان' },
    stages: trigonometryStages,
    topics: trigonometryTopics,
    diagnostic: trigonometryDiagnostic,
    guidedPractice: trigonometryPractice,
    exerciseBank: trigonometryExerciseBank,
    challenges: trigonometryChallenges,
    lab: {
        description: {
            eu: `${trigonometryLabTools.length} tresna, erronkekin: katetoetatik arrazoietara, 30°, 45° eta 60°, sinutik besteetara, kalkulagailua gradu eta minututan, bi alde ezagututa, goratze-angelua, behaketa bikoitza, azalera ½ · b · c · sin A, zirkunferentzia goniometrikoa, eta radiana eta arkua.`,
            es: `${trigonometryLabTools.length} herramientas con retos: de los catetos a las razones, 30°, 45° y 60°, del seno a las demás, la calculadora en grados y minutos, conociendo dos lados, el ángulo de elevación, la doble observación, el área ½ · b · c · sen A, la circunferencia goniométrica, y el radián y el arco.`,
            en: `${trigonometryLabTools.length} tools with challenges: from the legs to the ratios, 30°, 45° and 60°, from sine to the others, the calculator in degrees and minutes, knowing two sides, the angle of elevation, double sighting, the area ½ · b · c · sin A, the unit circle, and the radian and the arc.`,
            ar: `${trigonometryLabTools.length} أدوات مع تحديات: من الضلعين القائمين إلى النسب، و30° و45° و60°، ومن الجيب إلى البقية، والآلة الحاسبة بالدرجات والدقائق، وبمعرفة ضلعين، وزاوية الارتفاع، والرصد المزدوج، والمساحة ½ · b · c · sin A، والدائرة المثلثية، والراديان والقوس.`
        },
        progressIds: trigonometryLabChallengeIds,
        toolForTopic: trigonometryLabToolForTopic,
        render: (props) => <TrigonometryLaboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', en: 'Two games to train speed and accuracy: race and memory.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: trigonometryGameProgressIds,
        recordsKey: TRIGONOMETRY_GAME_RECORDS_KEY,
        render: (props) => <TrigonometryGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat, komarekin edo puntuarekin (0,75 edo 0.75), unitaterik gabe; angeluak gradutan. Negatiboak minus ikurrarekin.', es: 'Escribe un número, con coma o con punto (0,75 o 0.75), sin la unidad; los ángulos, en grados. Los negativos, con signo menos.', en: 'Write a number (a decimal point or a comma both work, e.g. 0.75), without the unit; angles in degrees. Negatives with a minus sign.', ar: 'اكتب عددًا بالنقطة أو بالفاصلة (0.75) دون الوحدة؛ والزوايا بالدرجات. والسالب بإشارة الناقص.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readTrigonometryAnswer,
        placeholder: () => ({ eu: 'Adib.: 0,75', es: 'Ej.: 0,75', en: 'e.g. 0.75', ar: 'مثال: 0.75' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 0,6, −0,8 edo 36,9.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 0,6, −0,8 o 36,9.', en: 'I don\'t understand that answer. Write a number, for example 0.6, −0.8 or 36.9.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 0.6 أو −0.8 أو 36.9.' }
    },
    errorByStage: {
        ratios: { eu: 'Aurkakoa angeluaren parean dago, ondokoa alboan. Hipotenusa beti zatitzailean sinuan eta kosinuan.', es: 'El opuesto está enfrente del ángulo y el contiguo a su lado. La hipotenusa va siempre debajo en el seno y el coseno.', en: 'The opposite side is across from the angle and the adjacent side is next to it. The hypotenuse always goes on the bottom for sine and cosine.', ar: 'المقابل أمام الزاوية والمجاور بجانبها. والوتر دائمًا في المقام في الجيب وجيب التمام.' },
        identities: { eu: 'sin² + cos² = 1, ez sin + cos = 1. Angelu zorrotzean erro positiboa. Kalkulagailua DEG moduan.', es: 'sen² + cos² = 1, no sen + cos = 1. En un ángulo agudo, la raíz positiva. La calculadora, en modo DEG.', en: 'sin² + cos² = 1, not sin + cos = 1. For an acute angle, the positive root. The calculator in DEG mode.', ar: 'sin² + cos² = 1 وليس sin + cos = 1. في الزاوية الحادة الجذر الموجب. والآلة الحاسبة بوضع DEG.' },
        solving: { eu: 'Aukeratu datua eta ezezaguna lotzen dituen arrazoia. Ezezaguna izendatzailean badago, zatitu.', es: 'Elige la razón que une el dato y la incógnita. Si la incógnita está en el denominador, divide.', en: 'Choose the ratio that links the given value and the unknown. If the unknown is in the denominator, divide.', ar: 'اختر النسبة التي تربط المعطى بالمجهول. وإذا كان المجهول في المقام فاقسم.' },
        problems: { eu: 'Angelu zuzenik ez badago, marraztu altuera. Bi angelu: bi ekuazio. Azalera: ½ · b · c · sin A.', es: 'Si no hay ángulo recto, traza una altura. Dos ángulos: dos ecuaciones. Área: ½ · b · c · sen A.', en: 'If there is no right angle, draw a height. Two angles: two equations. Area: ½ · b · c · sin A.', ar: 'إذا لم توجد زاوية قائمة فارسم ارتفاعًا. زاويتان: معادلتان. المساحة: ½ · b · c · sin A.' },
        circle: { eu: 'Zeinua koadranteak ematen du: II, sinua +; III, tangentea +; IV, kosinua +. 180° = π rad.', es: 'El signo lo da el cuadrante: II, seno +; III, tangente +; IV, coseno +. 180° = π rad.', en: 'The quadrant gives the sign: II, sine +; III, tangent +; IV, cosine +. 180° = π rad.', ar: 'الربع يحدد الإشارة: الثاني الجيب +؛ الثالث الظل +؛ الرابع جيب التمام +. 180° = π rad.' }
    }
}

export function TrigonometriaDbh4AkIntroPage() {
    return <UnitPage unit={trigonometriaUnit} />
}
