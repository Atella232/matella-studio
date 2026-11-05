import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readTrigonometryAnswer } from '../dbh4-akademikoak-trigonometria/answers'
import { trigonometryChallenges, trigonometryDiagnostic, trigonometryExerciseBank, trigonometryPractice } from './content'
import { TrigonometryHeroArt } from './figures'
import { TrigonometryBatx1zGames } from './games'
import { TRIGONOMETRY_BATX1Z_GAME_RECORDS_KEY, trigonometryBatx1zGameProgressIds } from './games/info'
import { TrigonometryBatx1zLaboratory } from './lab'
import { trigonometryBatx1zLabChallengeIds, trigonometryBatx1zLabToolForTopic, trigonometryBatx1zLabTools } from './lab/labTools'
import { trigonometryStages, trigonometryTopics } from './lessons'

const trigonometriaBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-trigonometria-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Formula eta funtzio trigonometrikoak', es: 'Fórmulas y funciones trigonométricas', en: 'Trigonometric formulas and functions', ar: 'الصيغ والدوال المثلثية' },
    documentTitle: { eu: 'Formula eta funtzio trigonometrikoak · Batxilergoa 1', es: 'Fórmulas y funciones trigonométricas · 1.º Bachillerato', en: 'Trigonometric formulas and functions · 1st Bachillerato', ar: 'الصيغ والدوال المثلثية · البكالوريا الأولى' },
    tagline: {
        eu: 'Radianak eta sei arrazoiak, identitateak, batuketaren eta kenketaren formulak, angelu bikoitza eta erdia, baturak biderkadura bihurtzea, ekuazio trigonometrikoak eta uhinak: anplitudea, periodoa eta desfasea.',
        es: 'Los radianes y las seis razones, las identidades, las fórmulas de la suma y la resta, el ángulo doble y mitad, las sumas en productos, las ecuaciones trigonométricas y las ondas: amplitud, periodo y desfase.',
        en: 'Radians and the six ratios, identities, the sum and difference formulas, the double and half angle, sums into products, trigonometric equations and waves: amplitude, period and phase shift.',
        ar: 'الراديان والنسب الست، والمتطابقات، وصيغ المجموع والفرق، وضعف الزاوية ونصفها، وتحويل المجاميع إلى جداءات، والمعادلات المثلثية والموجات: السعة والدور وانزياح الطور.'
    },
    heroArt: <TrigonometryHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, sei arrazoietatik uhinetara', es: 'Cinco etapas, de las seis razones a las ondas', en: 'Five stages, from the six ratios to waves', ar: 'خمس مراحل، من النسب الست إلى الموجات' },
    stages: trigonometryStages,
    topics: trigonometryTopics,
    diagnostic: trigonometryDiagnostic,
    guidedPractice: trigonometryPractice,
    exerciseBank: trigonometryExerciseBank,
    challenges: trigonometryChallenges,
    lab: {
        description: {
            eu: `${trigonometryBatx1zLabTools.length} tresna, erronkekin: sei arrazoiak zirkunferentzian, batzen diren bi angelu eta birak ematen dituzten soluzioak, berriak; eta 4. DBHko radiana eta arkua, zirkunferentzia goniometrikoa eta uhinen laborategia.`,
            es: `${trigonometryBatx1zLabTools.length} herramientas con retos: las seis razones en la circunferencia, dos ángulos que se suman y las soluciones que dan vueltas, nuevas; y de 4.º ESO, el radián y el arco, la circunferencia goniométrica y el laboratorio de las ondas.`,
            en: `${trigonometryBatx1zLabTools.length} tools with challenges: the six ratios on the circle, two angles that add up and the solutions that go round, new; and from 4th ESO, the radian and the arc, the unit circle and the wave lab.`,
            ar: `${trigonometryBatx1zLabTools.length} أدوات مع تحديات: النسب الست على الدائرة وزاويتان تُجمعان والحلول التي تدور، وهي جديدة؛ ومن الصف الرابع: الراديان والقوس والدائرة المثلثية ومختبر الموجات.`
        },
        progressIds: trigonometryBatx1zLabChallengeIds,
        toolForTopic: trigonometryBatx1zLabToolForTopic,
        render: (props) => <TrigonometryBatx1zLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zazpi joko: lasterketa, muntatu formula, ehizatu soluzioak, balio zehatza, trigonometriaren detektibea eta memoria, berriak; eta 4. DBHko zirkunferentzia goniometrikoa, radianen mailarekin.',
            es: 'Siete juegos: carrera, monta la fórmula, caza las soluciones, valor exacto, detective de trigonometría y memoria, nuevos; y de 4.º ESO, la circunferencia goniométrica, con su nivel de radianes.',
            en: 'Seven games: race, build the formula, hunt the solutions, exact value, trigonometry detective and memory, new; and from 4th ESO, the unit circle, with its radian level.',
            ar: 'سبع ألعاب: السباق وركّب الصيغة واصطد الحلول والقيمة الدقيقة ومخبر حساب المثلثات والذاكرة، وهي جديدة؛ ومن الصف الرابع: الدائرة المثلثية بمستوى الراديان.'
        },
        progressIds: trigonometryBatx1zGameProgressIds,
        recordsKey: TRIGONOMETRY_BATX1Z_GAME_RECORDS_KEY,
        render: (props) => <TrigonometryBatx1zGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat edo zatiki bat (3/4), komarekin edo puntuarekin (0,75 edo 0.75); angeluak gradutan. Negatiboak minus ikurrarekin.', es: 'Escribe un número o una fracción (3/4), con coma o con punto (0,75 o 0.75); los ángulos, en grados. Los negativos, con signo menos.', en: 'Write a number or a fraction (3/4); a decimal point or a comma both work (0.75); angles in degrees. Negatives with a minus sign.', ar: 'اكتب عددًا أو كسرًا (3/4) بالنقطة أو بالفاصلة (0.75)؛ والزوايا بالدرجات. والسالب بإشارة الناقص.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readTrigonometryAnswer,
        placeholder: () => ({ eu: 'Adib.: 3/4 edo 120', es: 'Ej.: 3/4 o 120', en: 'e.g. 3/4 or 120', ar: 'مثال: 3/4 أو 120' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki edo zatiki gisa.', es: 'El valor es correcto, pero escríbelo como número o fracción.', en: 'The value is correct, but write it as a number or a fraction.', ar: 'القيمة صحيحة، لكن اكتبها عددًا أو كسرًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat, adibidez 0,259, −3/4 edo 240.', es: 'No entiendo esa respuesta. Escribe un número o una fracción, por ejemplo 0,259, −3/4 o 240.', en: 'I don\'t understand that answer. Write a number or a fraction, for example 0.259, −3/4 or 240.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا، مثل 0.259 أو ⁦−3/4⁩ أو 240.' }
    },
    errorByStage: {
        ratios: { eu: 'Radianetara: bider π/180. sec = 1/cos, cosec = 1/sin eta cotg = 1/tg; zeinua, arrazoiarena. Identitate bat ez da ebazten: alde batetik bestera iristen da.', es: 'A radianes: por π/180. sec = 1/cos, cosec = 1/sen y cotg = 1/tg; el signo, el de su razón. Una identidad no se resuelve: se va de un lado al otro.', en: 'To radians: times π/180. sec = 1/cos, csc = 1/sin and cot = 1/tan; the sign is that of its ratio. An identity is not solved: you go from one side to the other.', ar: 'إلى الراديان: في π/180. sec = 1/cos وcsc = 1/sin وcot = 1/tan، والإشارة إشارة نسبتها. والمتطابقة لا تُحل: ننتقل من طرف إلى الآخر.' },
        sums: { eu: 'Batuketaren sinua ez da sinuen batuketa. sin(α ± β): zeinu bera; cos(α ± β): kontrako zeinua. Lehenik osatu bi angeluen sinua eta kosinua.', es: 'El seno de una suma no es la suma de los senos. sen(α ± β): mismo signo; cos(α ± β): signo contrario. Primero completa el seno y el coseno de los dos ángulos.', en: 'The sine of a sum is not the sum of the sines. sin(α ± β): same sign; cos(α ± β): opposite sign. First complete the sine and cosine of both angles.', ar: 'جيب المجموع ليس مجموع الجيبين. sin(α ± β): الإشارة نفسها؛ cos(α ± β): الإشارة المعاكسة. أكمل أولًا جيب الزاويتين وجيبي تمامهما.' },
        double: { eu: 'sin 2α = 2 sin α cos α, ez 2 sin α. Angelu erdian, zeinua α/2 angeluaren koadranteak ematen du. Baturak biderkadura: batura-erdia eta kendura-erdia.', es: 'sen 2α = 2 sen α cos α, no 2 sen α. En el ángulo mitad, el signo lo da el cuadrante de α/2. Sumas en productos: semisuma y semidiferencia.', en: 'sin 2α = 2 sin α cos α, not 2 sin α. In the half angle, the sign comes from the quadrant of α/2. Sums into products: half-sum and half-difference.', ar: 'sin 2α = 2 sin α cos α لا 2 sin α. وفي نصف الزاوية تعطي ربعُ α/2 الإشارة. وتحويل المجموع إلى جداء: نصف المجموع ونصف الفرق.' },
        equations: { eu: 'Bira batean bi soluzio daude: sinuarentzat α eta 180° − α, kosinuarentzat α eta 360° − α. Baztertu [−1, 1] tartetik kanpokoak. Ez zatitu cos x adierazpenaz: atera faktore komuna.', es: 'En cada vuelta hay dos soluciones: α y 180° − α para el seno, α y 360° − α para el coseno. Descarta lo que quede fuera de [−1, 1]. No dividas entre cos x: saca factor común.', en: 'Each turn has two solutions: α and 180° − α for the sine, α and 360° − α for the cosine. Discard what falls outside [−1, 1]. Do not divide by cos x: take out a common factor.', ar: 'في كل دورة حلان: α و180° − α للجيب، وα و360° − α لجيب التمام. استبعد ما يقع خارج [−1, 1]. ولا تقسم على cos x: أخرج عاملًا مشتركًا.' },
        functions: { eu: 'Periodoa 2π/B da, eta tangentearena π. Anplitudea |A| da, ez diametroa. Desfasea barrukoa 0 egiten duen x da, ez C.', es: 'El periodo es 2π/B, y el de la tangente, π. La amplitud es |A|, no el diámetro. El desfase es la x que hace 0 lo de dentro, no C.', en: 'The period is 2π/B, and that of the tangent π. The amplitude is |A|, not the diameter. The phase shift is the x that makes the inside 0, not C.', ar: 'الدور 2π/B ودور الظل π. والسعة |A| لا القطر. وانزياح الطور هو x الذي يجعل ما في الداخل 0، لا C.' }
    }
}

export function TrigonometriaBatx1zIntroPage() {
    return <UnitPage unit={trigonometriaBatx1zUnit} />
}
