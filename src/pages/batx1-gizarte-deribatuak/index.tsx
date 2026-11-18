import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { socDerivChallenges, socDerivDiagnostic, socDerivExerciseBank, socDerivPractice } from './content'
import { SocDerivHeroArt } from './figures'
import { SocDerivGames } from './games'
import { SOC_DERIV_GAME_RECORDS_KEY, socDerivGameProgressIds } from './games/info'
import { SocDerivLaboratory } from './lab'
import { socDerivLabChallengeIds, socDerivLabToolForTopic, socDerivLabTools } from './lab/labTools'
import { socDerivStages, socDerivTopics } from './lessons'

const deribatuakBatx1gUnit: UnitDefinition = {
    storagePrefix: 'matella-deribatuak-batx1g',
    coursePath: '/matematika/batx1-gizarte',
    courseTitle: { eu: 'Batxilergoa 1 · Gizarte Zientziak', es: '1.º Bachillerato · Ciencias Sociales', en: '1st Bachillerato · Social Sciences', ar: 'البكالوريا الأولى · العلوم الاجتماعية' },
    title: { eu: 'Deribatuak eta haien aplikazioak', es: 'Derivadas y sus aplicaciones', en: 'Derivatives and their applications', ar: 'المشتقات وتطبيقاتها' },
    documentTitle: { eu: 'Deribatuak eta haien aplikazioak · Batxilergoa 1 · Gizarte Zientziak', es: 'Derivadas y sus aplicaciones · 1.º Bachillerato · Ciencias Sociales', en: 'Derivatives and their applications · 1st Bachillerato · Social Sciences', ar: 'المشتقات وتطبيقاتها · البكالوريا الأولى · العلوم الاجتماعية' },
    tagline: {
        eu: 'Batez besteko aldakuntza-tasa eta berehalakoa, zuzen ukitzailea, deribazio-erregelak esponentzial eta logaritmoekin, hazkundea eta muturrak, mozkin maximoa eta optimizazioa, eta funtzioen grafikoak.',
        es: 'Tasa de variación media e instantánea, recta tangente, reglas de derivación con exponenciales y logaritmos, crecimiento y extremos, beneficio máximo y optimización, y gráficas de funciones.',
        en: 'Average and instantaneous rate of change, the tangent line, differentiation rules with exponentials and logarithms, growth and extremes, greatest profit and optimisation, and graphs of functions.',
        ar: 'معدل التغير المتوسط واللحظي، والمستقيم المماس، وقواعد الاشتقاق مع الأسيات واللوغاريتمات، والتزايد والقيم القصوى، والربح الأعظم والاستمثال، ورسوم الدوال.'
    },
    heroArt: <SocDerivHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, tasatik grafikoetara', es: 'Cinco etapas, de la tasa a las gráficas', en: 'Five stages, from the rate to graphs', ar: 'خمس مراحل، من المعدل إلى الرسوم' },
    stages: socDerivStages,
    topics: socDerivTopics,
    diagnostic: socDerivDiagnostic,
    guidedPractice: socDerivPractice,
    exerciseBank: socDerivExerciseBank,
    challenges: socDerivChallenges,
    lab: {
        description: {
            eu: `${socDerivLabTools.length} tresna, erronkekin: kostu marjinala eta mozkin maximoa, berriak; 4. DBHko batez besteko aldakuntza-tasa; eta Zientzietako f′ deribatuaren semaforoa eta tapa gabeko kutxa.`,
            es: `${socDerivLabTools.length} herramientas con retos: el coste marginal y el beneficio máximo, nuevas; la tasa de variación media de 4.º ESO; y de Ciencias, el semáforo de f′ y la caja sin tapa.`,
            en: `${socDerivLabTools.length} tools with challenges: the marginal cost and the greatest profit, new; the average rate of change from 4th ESO; and from Sciences, the traffic light of f′ and the open box.`,
            ar: `${socDerivLabTools.length} أدوات مع تحديات: التكلفة الحدية والربح الأعظم، وهما جديدتان؛ ومعدل التغير المتوسط من الصف الرابع؛ ومن العلوم: إشارة f′ الضوئية والصندوق دون غطاء.`
        },
        progressIds: socDerivLabChallengeIds,
        toolForTopic: socDerivLabToolForTopic,
        render: (props) => <SocDerivLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Bederatzi joko: lasterketa, zenbat ekoiztu?, batez bestekoa ala berehalakoa?, deribatuen detektibea eta memoria, berriak; eta Zientzietako zer malda?, lotu f eta f′, gora ala behera? eta ehizatu muturrak.',
            es: 'Nueve juegos: carrera, ¿cuánto producir?, ¿media o instantánea?, detective de derivadas y memoria, nuevos; y de Ciencias, ¿qué pendiente?, empareja f y f′, ¿sube o baja? y caza los extremos.',
            en: 'Nine games: race, how much to produce?, average or instantaneous?, derivatives detective and memory, new; and from Sciences, which slope?, match f and f′, up or down? and hunt the extremes.',
            ar: 'تسع ألعاب: السباق وكم ننتج؟ ومتوسط أم لحظي؟ ومخبر المشتقات والذاكرة، وهي جديدة؛ ومن العلوم: أي ميل؟ وطابق f وf′ وتصعد أم تنزل؟ واصطد القيم القصوى.'
        },
        progressIds: socDerivGameProgressIds,
        recordsKey: SOC_DERIV_GAME_RECORDS_KEY,
        render: (props) => <SocDerivGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 2,5 edo 2/3.', es: 'Escribe un número: 5, −3, 2,5 o 2/3.', en: 'Write a number: 5, −3, 2.5 or 2/3.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 2.5 أو 2/3.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 2/3', es: 'Ej.: 2/3', en: 'e.g. 2/3', ar: 'مثال: 2/3' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 2/3.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 2/3.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 2/3.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 2/3.' }
    },
    errorByStage: {
        rate: { eu: 'T.V.M.: zatitu b − a luzeraz. f′(a) ukitzailearen malda da; ukitzailea: y − f(a) = f′(a)(x − a).', es: 'T.V.M.: divide entre la longitud b − a. f′(a) es la pendiente de la tangente; tangente: y − f(a) = f′(a)(x − a).', en: 'Average rate: divide by the length b − a. f′(a) is the slope of the tangent; tangent: y − f(a) = f′(a)(x − a).', ar: 'معدل التغير المتوسط: اقسم على الطول b − a. وf′(a) ميل المماس؛ والمماس: y − f(a) = f′(a)(x − a).' },
        rules: { eu: '(xⁿ)′ = n·xⁿ⁻¹. Biderkadura baten deribatua ez da deribatuen biderkadura. Katea: bider barrukoaren deribatua.', es: '(xⁿ)′ = n·xⁿ⁻¹. La derivada de un producto no es el producto de las derivadas. Cadena: por la derivada de dentro.', en: '(xⁿ)′ = n·xⁿ⁻¹. The derivative of a product is not the product of the derivatives. Chain: times the derivative of the inside.', ar: '(xⁿ)′ = n·xⁿ⁻¹. مشتقة الجداء ليست جداء المشتقات. السلسلة: في مشتقة الداخل.' },
        monotony: { eu: 'Hazkundea f′ deribatuaren zeinuak ematen du. f′(a) = 0 izateak ez du beti muturra esan nahi: begiratu zeinua.', es: 'El crecimiento lo da el signo de f′. f′(a) = 0 no siempre es extremo: mira el signo.', en: 'Growth is given by the sign of f′. f′(a) = 0 is not always an extreme: look at the sign.', ar: 'يحدد التزايدَ إشارةُ f′. وf′(a) = 0 لا تعني دائمًا قيمة قصوى: انظر إلى الإشارة.' },
        optimization: { eu: 'B = I − C deribatu. Tarte itxi batean, begiratu ertzak ere.', es: 'Deriva B = I − C. En un intervalo cerrado, mira también los bordes.', en: 'Differentiate B = I − C. On a closed interval, look at the borders too.', ar: 'اشتق B = I − C. وفي مجال مغلق انظر إلى الطرفين أيضًا.' },
        graphs: { eu: 'f′ deribatuak ardatza ebakitzen duen lekuan daude f funtzioaren muturrak, ez f′ maximoa den lekuan.', es: 'Los extremos de f están donde f′ corta el eje, no donde f′ es máxima.', en: 'The extremes of f are where f′ cuts the axis, not where f′ is greatest.', ar: 'القيم القصوى لـ f حيث تقطع f′ المحور لا حيث تكون f′ أعظمية.' }
    }
}

export function DeribatuakBatx1gIntroPage() {
    return <UnitPage unit={deribatuakBatx1gUnit} />
}
