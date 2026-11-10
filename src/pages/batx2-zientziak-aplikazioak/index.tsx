import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bach2ApplicationsChallenges, bach2ApplicationsDiagnostic, bach2ApplicationsExerciseBank, bach2ApplicationsPractice } from './content'
import { Bach2ApplicationsHeroArt } from './figures'
import { Bach2ApplicationsLaboratory } from './lab'
import { bach2ApplicationsLabChallengeIds, bach2ApplicationsLabToolForTopic, bach2ApplicationsLabTools } from './lab/labTools'
import { bach2ApplicationsStages, bach2ApplicationsTopics } from './lessons'

const aplikazioakBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-aplikazioak-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Deribatuaren aplikazioak', es: 'Aplicaciones de la derivada', en: 'Applications of the derivative', ar: 'تطبيقات المشتقة' },
    documentTitle: { eu: 'Deribatuaren aplikazioak · Batxilergoa 2', es: 'Aplicaciones de la derivada · 2.º Bachillerato', en: 'Applications of the derivative · 2nd Bachillerato', ar: 'تطبيقات المشتقة · البكالوريا الثانية' },
    tagline: {
        eu: '1. mailako hazkundearen, kurbaduraren eta mutur absolutuen errepaso laburra, Rolleren teorema eta batez besteko balioarena, erroak zenbatzea, L\'Hôpitalen erregela indeterminazio guztiekin, koefizienteak baldintzekin eta optimizazioa.',
        es: 'Un repaso corto del crecimiento, la curvatura y los extremos absolutos de 1.º, los teoremas de Rolle y del valor medio, contar raíces, la regla de L\'Hôpital con todas las indeterminaciones, los coeficientes con condiciones y la optimización.',
        en: 'A short review of increase, concavity and absolute extrema from 1st year, the theorems of Rolle and of the mean value, counting roots, L\'Hôpital\'s rule with every indeterminate form, coefficients with conditions and optimisation.',
        ar: 'مراجعة قصيرة للتزايد والتقعّر والقيم القصوى المطلقة من السنة الأولى، ومبرهنتا رول والقيمة المتوسطة، وعدّ الجذور، وقاعدة لوبيتال مع كل حالات عدم التعيين، والمعاملات بشروط، والاستمثال.'
    },
    heroArt: <Bach2ApplicationsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, errepasotik optimizazioraino', es: 'Cinco etapas, del repaso a la optimización', en: 'Five stages, from the review to optimisation', ar: 'خمس مراحل، من المراجعة إلى الاستمثال' },
    stages: bach2ApplicationsStages,
    topics: bach2ApplicationsTopics,
    diagnostic: bach2ApplicationsDiagnostic,
    guidedPractice: bach2ApplicationsPractice,
    exerciseBank: bach2ApplicationsExerciseBank,
    challenges: bach2ApplicationsChallenges,
    lab: {
        description: {
            eu: `${bach2ApplicationsLabTools.length} tresna, erronkekin: Rollek puntua bilatzen du, ebakitzailea eta haren zuzen ukitzaile paraleloa, L'Hôpital hurbiletik eta kurba baterainoko distantzia minimoa, berriak; eta 1. mailako Aplikazioak unitateko f′ deribatuaren semaforoa, kurbadura zuzen ukitzailearekin eta estalkirik gabeko kutxa.`,
            es: `${bach2ApplicationsLabTools.length} herramientas con retos: Rolle busca el punto, la secante y su tangente paralela, L'Hôpital de cerca y la distancia mínima a una curva, nuevas; y de Aplicaciones de 1.º, el semáforo de f′, la curvatura con la tangente y la caja sin tapa.`,
            en: `${bach2ApplicationsLabTools.length} tools with challenges: Rolle looks for the point, the secant and its parallel tangent, L'Hôpital up close and the shortest distance to a curve, new; and from Applications of 1st year, the traffic light of f′, concavity with the tangent and the box without a lid.`,
            ar: `${bach2ApplicationsLabTools.length} أدوات مع تحديات: رول يبحث عن النقطة، والقاطع ومماسه الموازي، ولوبيتال عن قرب، والمسافة الصغرى إلى منحنى، وهي جديدة؛ ومن تطبيقات السنة الأولى: إشارة f′ الضوئية، والتقعّر بالمماس، والعلبة بلا غطاء.`
        },
        progressIds: bach2ApplicationsLabChallengeIds,
        toolForTopic: bach2ApplicationsLabToolForTopic,
        render: (props) => <Bach2ApplicationsLaboratory {...props} />
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
        review: { eu: 'Mutur bat egoteko, f′ deribatuak zeinua aldatu behar du; inflexio bat egoteko, f″ deribatuak. Tarte itxi batean, alderatu puntu singularrak eta bi muturrak.', es: 'Para que haya extremo, f′ tiene que cambiar de signo; para que haya inflexión, f″. En un intervalo cerrado, compara los puntos singulares y los dos bordes.', en: 'For an extremum, f′ has to change sign; for an inflection, f″. On a closed interval, compare the stationary points and both ends.', ar: 'لتوجد قيمة قصوى يجب أن تغيّر ⁦f′⁩ إشارتها، وليوجد انعطاف يجب أن تغيّرها ⁦f″⁩. وعلى فترة مغلقة قارن النقاط الحرجة والطرفين.' },
        rolle: { eu: 'Rolle: jarraitua [a, b] tartean, deribagarria (a, b) tartean eta f(a) = f(b); orduan f′(c) = 0. Batez besteko balioa: f′(c) = (f(b) − f(a))/(b − a), ez f(c). Bolzanok erroa ematen du; Rollek zenbat dauden mugatzen du.', es: 'Rolle: continua en [a, b], derivable en (a, b) y f(a) = f(b); entonces f′(c) = 0. Valor medio: f′(c) = (f(b) − f(a))/(b − a), no f(c). Bolzano da la raíz; Rolle limita cuántas hay.', en: 'Rolle: continuous on [a, b], differentiable on (a, b) and f(a) = f(b); then f′(c) = 0. Mean value: f′(c) = (f(b) − f(a))/(b − a), not f(c). Bolzano gives the root; Rolle limits how many there are.', ar: 'رول: متصلة على ⁦[a, b]⁩ وقابلة للاشتقاق على ⁦(a, b)⁩ و⁦f(a) = f(b)⁩؛ عندئذ ⁦f′(c) = 0⁩. القيمة المتوسطة: ⁦f′(c) = (f(b) − f(a))/(b − a)⁩ لا ⁦f(c)⁩. بولتسانو يعطي الجذر، ورول يحدّ عدد الجذور.' },
        hopital: { eu: 'Lehenik egiaztatu 0/0 edo ∞/∞ dela. Deribatu goikoa eta behekoa bakoitza bere aldetik, zatiduraren erregelarik gabe. 0·∞ eta ∞ − ∞: lehenik zatidura. Berreturekin, kalkulatu ln L, eta amaieran L = e^(ln L).', es: 'Primero comprueba que es 0/0 o ∞/∞. Deriva arriba y abajo por separado, sin la regla del cociente. 0·∞ e ∞ − ∞: antes, un cociente. Con potencias, calcula ln L y al final L = e^(ln L).', en: 'First check that it is 0/0 or ∞/∞. Differentiate the top and the bottom separately, without the quotient rule. 0·∞ and ∞ − ∞: first a quotient. With powers, work out ln L and at the end L = e^(ln L).', ar: 'تحقّق أولًا من أنها ⁦0/0⁩ أو ⁦∞/∞⁩. اشتق البسط والمقام كلًّا على حدة، دون قاعدة خارج القسمة. ⁦0·∞⁩ و⁦∞ − ∞⁩: حوّلهما أولًا إلى خارج قسمة. ومع القوى احسب ⁦ln L⁩ وفي النهاية ⁦L = e^(ln L)⁩.' },
        conditions: { eu: 'Datu bakoitza ekuazio bat da: puntu batek f(x₀) = y₀ ematen du, mutur batek f′(x₀) = 0, inflexio batek f″(x₀) = 0, eta zuzen ukitzaile batek altuera eta malda. Muturra ez da f = 0.', es: 'Cada dato es una ecuación: un punto da f(x₀) = y₀, un extremo f′(x₀) = 0, una inflexión f″(x₀) = 0 y una tangente la altura y la pendiente. Un extremo no es f = 0.', en: 'Each fact is an equation: a point gives f(x₀) = y₀, an extremum f′(x₀) = 0, an inflection f″(x₀) = 0 and a tangent the height and the slope. An extremum is not f = 0.', ar: 'كل معطى معادلة: النقطة تعطي ⁦f(x₀) = y₀⁩، والقيمة القصوى ⁦f′(x₀) = 0⁩، والانعطاف ⁦f″(x₀) = 0⁩، والمماس الارتفاع والميل. والقيمة القصوى ليست ⁦f = 0⁩.' },
        optimization: { eu: 'Idatzi funtzioa aldagai bakarrarekin, baldintza erabiliz. Deribatua 0 den puntua egiaztatu: maximoa edo minimoa den, eta tartearen muturrak ere bai. Distantzian, minimizatu d²; amaieran, atera erroa.', es: 'Escribe la función con una sola variable usando la condición. Comprueba el punto con derivada 0: si es máximo o mínimo, y mira también los bordes del intervalo. En distancias, minimiza d²; al final, saca la raíz.', en: 'Write the function with a single variable using the condition. Check the point with derivative 0: whether it is a maximum or a minimum, and look at the ends of the interval too. With distances, minimise d²; at the end, take the root.', ar: 'اكتب الدالة بمتغير واحد مستعملًا الشرط. تحقّق من النقطة التي مشتقتها 0: أهي عظمى أم صغرى، وانظر أيضًا إلى طرفي الفترة. وفي المسافات صغّر ⁦d²⁩ ثم خذ الجذر في النهاية.' }
    }
}

export function AplikazioakBatx2zIntroPage() {
    return <UnitPage unit={aplikazioakBatx2zUnit} />
}
