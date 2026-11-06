import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bachApplicationsChallenges, bachApplicationsDiagnostic, bachApplicationsExerciseBank, bachApplicationsPractice } from './content'
import { BachApplicationsHeroArt } from './figures'
import { BachApplicationsLaboratory } from './lab'
import { bachApplicationsLabChallengeIds, bachApplicationsLabToolForTopic, bachApplicationsLabTools } from './lab/labTools'
import { bachApplicationsStages, bachApplicationsTopics } from './lessons'

const aplikazioakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-aplikazioak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Deribatuaren aplikazioak', es: 'Aplicaciones de la derivada', en: 'Applications of the derivative', ar: 'تطبيقات المشتقة' },
    documentTitle: { eu: 'Deribatuaren aplikazioak · Batxilergoa 1', es: 'Aplicaciones de la derivada · 1.º Bachillerato', en: 'Applications of the derivative · 1st Bachillerato', ar: 'تطبيقات المشتقة · البكالوريا الأولى' },
    tagline: {
        eu: 'Hazkundea eta beherakada deribatuaren zeinuarekin, maximo eta minimo erlatiboak, kurbadura eta inflexio-puntuak, maximo eta minimo absolutuak, optimizazio-problemak eta funtzio polinomiko, arrazional, esponentzial eta logaritmikoak irudikatzea.',
        es: 'El crecimiento con el signo de la derivada, los máximos y mínimos relativos, la curvatura y los puntos de inflexión, los extremos absolutos, los problemas de optimización y la representación de funciones polinómicas, racionales, exponenciales y logarítmicas.',
        en: 'Increase and decrease from the sign of the derivative, local maxima and minima, concavity and points of inflection, absolute extrema, optimisation problems and sketching polynomial, rational, exponential and logarithmic functions.',
        ar: 'التزايد والتناقص بإشارة المشتقة، والقيم العظمى والصغرى المحلية، والتقعّر ونقاط الانعطاف، والقيم القصوى المطلقة، ومسائل الاستمثال، ورسم الدوال الحدودية والكسرية والأسية واللوغاريتمية.'
    },
    heroArt: <BachApplicationsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, deribatuaren zeinutik grafiko osoraino', es: 'Cinco etapas, del signo de la derivada a la gráfica completa', en: 'Five stages, from the sign of the derivative to the whole graph', ar: 'خمس مراحل، من إشارة المشتقة إلى الرسم الكامل' },
    stages: bachApplicationsStages,
    topics: bachApplicationsTopics,
    diagnostic: bachApplicationsDiagnostic,
    guidedPractice: bachApplicationsPractice,
    exerciseBank: bachApplicationsExerciseBank,
    challenges: bachApplicationsChallenges,
    lab: {
        description: {
            eu: `${bachApplicationsLabTools.length} tresna, erronkekin: f′ deribatuaren semaforoa, kurbadura zuzen ukitzailearekin, estalkirik gabeko kutxa eta muntatu grafikoa, berriak; Deribatuetako f′ funtzioaren grafikoa; eta 4. DBHko grafiko baten bidaia.`,
            es: `${bachApplicationsLabTools.length} herramientas con retos: el semáforo de f′, curvatura con la tangente, la caja sin tapa y monta la gráfica, nuevas; la gráfica de f′ de Derivadas; y recorre una gráfica de 4.º ESO.`,
            en: `${bachApplicationsLabTools.length} tools with challenges: the traffic light of f′, concavity with the tangent, the box without a lid and build the graph, new; the graph of f′ from Derivatives; and travel along a graph from 4th ESO.`,
            ar: `${bachApplicationsLabTools.length} أدوات مع تحديات: إشارة f′ الضوئية، والتقعّر بالمماس، والعلبة بلا غطاء، وابنِ الرسم، وهي جديدة؛ ورسم f′ من المشتقات؛ والتجوّل في رسم من الصف الرابع.`
        },
        progressIds: bachApplicationsLabChallengeIds,
        toolForTopic: bachApplicationsLabToolForTopic,
        render: (props) => <BachApplicationsLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2.', es: 'Escribe un número: 5, −3, 1,5 o 3/2.', en: 'Write a number: 5, −3, 1.5 or 3/2.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        monotony: { eu: 'Hazkundea f′ deribatuaren zeinuak ematen du, ez f funtzioarenak. Zeinu-taulan sartu f′ deribatuaren zeroak eta izate-eremutik kanpoko puntuak.', es: 'El crecimiento lo da el signo de f′, no el de f. En la tabla de signos entran los ceros de f′ y los puntos fuera del dominio.', en: 'Increase and decrease come from the sign of f′, not of f. The sign chart takes in the zeros of f′ and the points outside the domain.', ar: 'يحدد التزايدَ إشارةُ ⁦f′⁩ لا إشارة ⁦f⁩. ويدخل جدول الإشارات أصفار ⁦f′⁩ والنقاط الواقعة خارج المجال.' },
        extremes: { eu: 'f′(a) = 0 ez da nahikoa: f′ deribatuak zeinua aldatu behar du. f″(a) < 0 maximoa da (∩) eta f″(a) > 0 minimoa (∪).', es: 'f′(a) = 0 no basta: f′ tiene que cambiar de signo. f″(a) < 0 es un máximo (∩) y f″(a) > 0, un mínimo (∪).', en: 'f′(a) = 0 is not enough: f′ has to change sign. f″(a) < 0 is a maximum (∩) and f″(a) > 0, a minimum (∪).', ar: 'لا يكفي ⁦f′(a) = 0⁩: يجب أن تغير ⁦f′⁩ إشارتها. ⁦f″(a) < 0⁩ قيمة عظمى (∩) و⁦f″(a) > 0⁩ قيمة صغرى (∪).' },
        curvature: { eu: 'Kurbadura f″ deribatuak ematen du: f″ > 0 ahurra (∪), f″ < 0 ganbila (∩). Inflexio batean f″ deribatuak zeinua aldatzen du; f″ = 0 ez da nahikoa.', es: 'La curvatura la da f″: f″ > 0 cóncava (∪), f″ < 0 convexa (∩). En una inflexión f″ cambia de signo; f″ = 0 no basta.', en: 'Concavity comes from f″: f″ > 0 concave up (∪), f″ < 0 concave down (∩). At an inflection f″ changes sign; f″ = 0 is not enough.', ar: 'يحدد التقعّرَ ⁦f″⁩: ⁦f″ > 0⁩ نحو الأعلى (∪) و⁦f″ < 0⁩ نحو الأسفل (∩). وعند الانعطاف تغير ⁦f″⁩ إشارتها، ولا يكفي ⁦f″ = 0⁩.' },
        optimization: { eu: 'Idatzi funtzioa aldagai bakarrarekin, baldintza erabilita. [a, b] tartean, kalkulatu f ertzetan ere. Erantzun eskatzen dena: x ala balioa.', es: 'Escribe la función con una sola variable usando la condición. En [a, b], calcula f también en los bordes. Responde lo que se pide: la x o el valor.', en: 'Write the function in one variable using the condition. On [a, b], work out f at the edges too. Answer what is asked: x or the value.', ar: 'اكتب الدالة بمتغير واحد مستعملًا الشرط. وفي ⁦[a, b]⁩ احسب ⁦f⁩ عند الطرفين أيضًا. وأجب عما يُطلب: ⁦x⁩ أو القيمة.' },
        graphs: { eu: 'Lehenik izate-eremua, ebaki-puntuak eta asintotak; gero muturrak f′ deribatuarekin eta inflexioak f″ deribatuarekin. Polinomio baten adarrak maila handieneko gaiak ematen ditu.', es: 'Primero dominio, cortes y asíntotas; después extremos con f′ e inflexiones con f″. Las ramas de un polinomio las da el término de mayor grado.', en: 'First the domain, intercepts and asymptotes; then extrema with f′ and inflections with f″. The branches of a polynomial come from its term of highest degree.', ar: 'أولًا المجال ونقاط التقاطع والمقاربات، ثم القيم القصوى بـ ⁦f′⁩ والانعطاف بـ ⁦f″⁩. ويحدد فروعَ الحدودية الحدُّ ذو الدرجة الكبرى.' }
    }
}

export function AplikazioakBatx1zIntroPage() {
    return <UnitPage unit={aplikazioakBatx1zUnit} />
}
