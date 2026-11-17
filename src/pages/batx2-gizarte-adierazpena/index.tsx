import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bach2gSketchChallenges, bach2gSketchDiagnostic, bach2gSketchExerciseBank, bach2gSketchPractice } from './content'
import { Bach2gSketchHeroArt } from './figures'
import { Bach2gSketchGames } from './games'
import { BACH2G_SKETCH_GAME_RECORDS_KEY, bach2gSketchGameProgressIds } from './games/info'
import { Bach2gSketchLaboratory } from './lab'
import { bach2gSketchLabChallengeIds, bach2gSketchLabToolForTopic, bach2gSketchLabTools } from './lab/labTools'
import { bach2gSketchStages, bach2gSketchTopics } from './lessons'

const adierazpenaBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-adierazpena-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Funtzioen adierazpen grafikoa', es: 'Representación de funciones', en: 'Curve sketching', ar: 'التمثيل البياني للدوال' },
    documentTitle: { eu: 'Funtzioen adierazpen grafikoa · Batxilergoa 2 · Gizarte Zientziak', es: 'Representación de funciones · 2.º Bachillerato · Ciencias Sociales', en: 'Curve sketching · 2nd Bachillerato · Social Sciences', ar: 'التمثيل البياني للدوال · البكالوريا الثانية · العلوم الاجتماعية' },
    tagline: {
        eu: 'Izate-eremua, simetriak eta ebaki-puntuak, hiru asintota motak, hazkundea eta kurbadura, funtzio polinomiko, arrazional, esponentzial eta logaritmikoen grafiko osoak, eta grafikoak irakurri eta datuetatik marraztu.',
        es: 'Dominio, simetrías y cortes, los tres tipos de asíntota, crecimiento y curvatura, las gráficas completas de funciones polinómicas, racionales, exponenciales y logarítmicas, y leer gráficas y dibujarlas desde los datos.',
        en: 'Domain, symmetry and intercepts, the three kinds of asymptote, increase and curvature, the complete graphs of polynomial, rational, exponential and logarithmic functions, and reading graphs and drawing them from data.',
        ar: 'المجال والتناظر ونقاط التقاطع، وأنواع المقاربات الثلاثة، والتزايد والتقعّر، والتمثيلات الكاملة للدوال الحدودية والكسرية والأسية واللوغاريتمية، وقراءة التمثيلات ورسمها من المعطيات.'
    },
    heroArt: <Bach2gSketchHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, izate-eremutik datuetatik marrazteraino', es: 'Cinco etapas, del dominio a dibujar desde los datos', en: 'Five stages, from the domain to drawing from data', ar: 'خمس مراحل، من المجال إلى الرسم من المعطيات' },
    stages: bach2gSketchStages,
    topics: bach2gSketchTopics,
    diagnostic: bach2gSketchDiagnostic,
    guidedPractice: bach2gSketchPractice,
    exerciseBank: bach2gSketchExerciseBank,
    challenges: bach2gSketchChallenges,
    lab: {
        description: {
            eu: `${bach2gSketchLabTools.length} tresna, erronkekin: zatiketak ematen du zeiharra eta datuetatik marraztu, berriak; eta 1. mailako Aplikazioak unitateko grafikoaren geruzak, eta 2. mailako Zientzietako balio absolutuaren ispilua eta f′ grafikotik f grafikora.`,
            es: `${bach2gSketchLabTools.length} herramientas con retos: la división da la oblicua y dibuja desde los datos, nuevas; y las capas de la gráfica de Aplicaciones de 1.º, y el espejo del valor absoluto y de f′ a f de 2.º Ciencias.`,
            en: `${bach2gSketchLabTools.length} tools with challenges: the division gives the oblique and draw from the data, new; and the layers of the graph from Applications of 1st year, and the mirror of the absolute value and from f′ to f from 2nd Sciences.`,
            ar: `${bach2gSketchLabTools.length} أدوات مع تحديات: القسمة تعطي المقارب المائل والرسم من المعطيات، وهي جديدة؛ وطبقات التمثيل من تطبيقات السنة الأولى، ومرآة القيمة المطلقة ومن f′ إلى f من الثانية علوم.`
        },
        progressIds: bach2gSketchLabChallengeIds,
        toolForTopic: bach2gSketchLabToolForTopic,
        render: (props) => <Bach2gSketchLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Bost joko: lasterketa, zein grafiko da?, osatu fitxa, grafikoen detektibea eta asintoten memoria.',
            es: 'Cinco juegos: carrera, ¿qué gráfica es?, completa la ficha, detective de gráficas y memoria de asíntotas.',
            en: 'Five games: race, which graph is it?, fill in the card, graphs detective and asymptotes memory.',
            ar: 'خمس ألعاب: السباق وأي تمثيل هو؟ وأكمل البطاقة ومخبر التمثيلات وذاكرة المقاربات.'
        },
        progressIds: bach2gSketchGameProgressIds,
        recordsKey: BACH2G_SKETCH_GAME_RECORDS_KEY,
        render: (props) => <Bach2gSketchGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 0,25 edo 3/2.', es: 'Escribe un número: 5, −3, 0,25 o 3/2.', en: 'Write a number: 5, −3, 0.25 or 3/2.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 0.25 أو 3/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        first: { eu: 'Izate-eremua: izendatzailea ≠ 0, √u: u ≥ 0, ln u: u > 0. Y ardatza: x = 0. X ardatza: f(x) = 0.', es: 'Dominio: denominador ≠ 0, √u: u ≥ 0, ln u: u > 0. Eje Y: x = 0. Eje X: f(x) = 0.', en: 'Domain: denominator ≠ 0, √u: u ≥ 0, ln u: u > 0. Y axis: x = 0. X axis: f(x) = 0.', ar: 'المجال: المقام ≠ 0، ⁦√u: u ≥ 0⁩، ⁦ln u: u > 0⁩. محور Y: ⁦x = 0⁩. محور X: ⁦f(x) = 0⁩.' },
        asymptotes: { eu: 'Bertikala: izendatzailea zero (0/0 bada, zuloa izan daiteke). Horizontala: alderatu mailak. Zeiharra: goiko maila bat gehiago, zatitu.', es: 'Vertical: denominador cero (si es 0/0, puede ser un agujero). Horizontal: compara grados. Oblicua: arriba un grado más, divide.', en: 'Vertical: denominator zero (if 0/0, it may be a hole). Horizontal: compare degrees. Oblique: top one degree more, divide.', ar: 'العمودي: المقام صفر (وإذا كان 0/0 فقد تكون ثغرة). الأفقي: قارن الدرجات. المائل: البسط أعلى بدرجة، اقسم.' },
        derivatives: { eu: "f' > 0: gora; f' < 0: behera. f'' > 0: ∪; f'' < 0: ∩. Muturraren balioa: kalkulatu f.", es: "f' > 0: sube; f' < 0: baja. f'' > 0: ∪; f'' < 0: ∩. El valor del extremo: calcula f.", en: "f' > 0: rises; f' < 0: falls. f'' > 0: ∪; f'' < 0: ∩. The value of the extremum: work out f.", ar: "⁦f' > 0⁩: يصعد؛ ⁦f' < 0⁩: ينزل. ⁦f'' > 0⁩: ∪؛ ⁦f'' < 0⁩: ∩. قيمة القيمة القصوى: احسب f." },
        graphs: { eu: 'Lehenik asintotak eta puntuak, gero kurba. Polinomioek ez dute asintotarik; e^x funtzioak horizontal bat du; ln x: x > 0.', es: 'Primero asíntotas y puntos, después la curva. Los polinomios no tienen asíntotas; e^x tiene una horizontal; ln x: x > 0.', en: 'First asymptotes and points, then the curve. Polynomials have no asymptotes; e^x has a horizontal one; ln x: x > 0.', ar: 'المقاربات والنقاط أولًا ثم المنحنى. لا مقاربات للحدوديات؛ ولـ e^x مقارب أفقي؛ ⁦ln x: x > 0⁩.' },
        reading: { eu: '|f|: azpiko zatia gora isladatu. Ereduak: ordezkatu puntu bat eta ebatzi parametroa.', es: '|f|: refleja hacia arriba la parte de abajo. Modelos: sustituye un punto y resuelve el parámetro.', en: '|f|: reflect the lower part upwards. Models: substitute a point and solve for the parameter.', ar: '|f|: اعكس الجزء السفلي إلى الأعلى. النماذج: عوّض نقطة وحلّ الوسيط.' }
    }
}

export function AdierazpenaBatx2gIntroPage() {
    return <UnitPage unit={adierazpenaBatx2gUnit} />
}
