import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bach2IndefiniteChallenges, bach2IndefiniteDiagnostic, bach2IndefiniteExerciseBank, bach2IndefinitePractice } from './content'
import { Bach2IndefiniteHeroArt } from './figures'
import { Bach2IndefiniteLaboratory } from './lab'
import { bach2IndefiniteLabChallengeIds, bach2IndefiniteLabToolForTopic, bach2IndefiniteLabTools } from './lab/labTools'
import { bach2IndefiniteStages, bach2IndefiniteTopics } from './lessons'

const mugagabeakBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-mugagabeak-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Integral mugagabeak', es: 'Integrales indefinidas', en: 'Indefinite integrals', ar: 'التكاملات غير المحددة' },
    documentTitle: { eu: 'Integral mugagabeak · Batxilergoa 2', es: 'Integrales indefinidas · 2.º Bachillerato', en: 'Indefinite integrals · 2nd Bachillerato', ar: 'التكاملات غير المحددة · البكالوريا الثانية' },
    tagline: {
        eu: 'Integral berehalakoen eta konposatuen errepasoa, zatikako integrazioa, integral arrazionalak, aldagai-aldaketa, eta metodoa nola aukeratu eta baldintzak dituzten jatorrizkoak.',
        es: 'Repaso de integrales inmediatas y compuestas, integración por partes, integrales racionales, cambio de variable, y cómo elegir el método y hallar primitivas con condiciones.',
        en: 'A review of basic and composite integrals, integration by parts, rational integrals, substitution, and how to choose the method and find antiderivatives with conditions.',
        ar: 'مراجعة التكاملات المباشرة والمركّبة، والتكامل بالتجزئة، والتكاملات الكسرية، وتغيير المتغير، وكيفية اختيار الطريقة وإيجاد دوال أصلية بشروط.'
    },
    heroArt: <Bach2IndefiniteHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, taula errepasatzetik metodoa aukeratzeraino', es: 'Cinco etapas, del repaso de la tabla a elegir el método', en: 'Five stages, from reviewing the table to choosing the method', ar: 'خمس مراحل، من مراجعة الجدول إلى اختيار الطريقة' },
    stages: bach2IndefiniteStages,
    topics: bach2IndefiniteTopics,
    diagnostic: bach2IndefiniteDiagnostic,
    guidedPractice: bach2IndefinitePractice,
    exerciseBank: bach2IndefiniteExerciseBank,
    challenges: bach2IndefiniteChallenges,
    lab: {
        description: {
            eu: `${bach2IndefiniteLabTools.length} tresna, erronkekin: aukeratu u eta dv, zatiki sinpleak eta bi konstante, berriak; eta Deribatuetako f′ funtzioaren grafikoa eta makinen katea.`,
            es: `${bach2IndefiniteLabTools.length} herramientas con retos: elige u y dv, fracciones simples y dos constantes, nuevas; y la gráfica de f′ y la cadena de máquinas de Derivadas.`,
            en: `${bach2IndefiniteLabTools.length} tools with challenges: choose u and dv, partial fractions and two constants, new; and the graph of f′ and the chain of machines from Derivatives.`,
            ar: `${bach2IndefiniteLabTools.length} أدوات مع تحديات: اختر u و dv، والكسور البسيطة، والثابتان، وهي جديدة؛ ورسم f′ وسلسلة الآلات من المشتقات.`
        },
        progressIds: bach2IndefiniteLabChallengeIds,
        toolForTopic: bach2IndefiniteLabToolForTopic,
        render: (props) => <Bach2IndefiniteLaboratory {...props} />
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
        review: { eu: 'Egiaztatu deribatuz: F′ = f atera behar da. Barruan u badago, kanpoan u′ egon behar da; zenbaki bat falta bada, doitu.', es: 'Comprueba derivando: tiene que salir F′ = f. Si dentro hay u, fuera tiene que estar u′; si falta un número, ajústalo.', en: 'Check by differentiating: you must get F′ = f. If there is u inside, u′ must be outside; if a number is missing, adjust it.', ar: 'تحقق بالاشتقاق: يجب أن يخرج ⁦F′ = f⁩. وإذا كانت ⁦u⁩ في الداخل فيجب أن تكون ⁦u′⁩ في الخارج، وإذا نقص عدد فاضبطه.' },
        parts: { eu: 'Zatika: ∫ u dv = uv − ∫ v du. u gisa deribatzean sinplifikatzen dena hartu, eta kontuz minus zeinuarekin.', es: 'Por partes: ∫ u dv = uv − ∫ v du. Toma como u lo que se simplifica al derivar, y cuidado con el signo menos.', en: 'By parts: ∫ u dv = uv − ∫ v du. Take as u what gets simpler when differentiated, and watch the minus sign.', ar: 'بالتجزئة: ⁦∫ u dv = uv − ∫ v du⁩. خذ ⁦u⁩ ما يبسط بالاشتقاق، وانتبه لإشارة السالب.' },
        rational: { eu: 'Zenbakitzailearen maila handiagoa edo berdina bada, lehenik zatitu. Erro bikoitzak bi zatiki eskatzen ditu, eta erro errealik ez badago, arku tangente bat.', es: 'Si el grado del numerador es mayor o igual, primero divide. Una raíz doble pide dos fracciones, y sin raíces reales sale una arcotangente.', en: 'If the degree of the numerator is greater or equal, divide first. A double root needs two fractions, and with no real roots an arctangent appears.', ar: 'إذا كانت درجة البسط أكبر أو مساوية فاقسم أولًا. والجذر المضاعف يتطلب كسرين، وبلا جذور حقيقية يخرج قوس ظل.' },
        substitution: { eu: 'Aldaketan dx ere aldatzen da: ez da x bat ere geratu behar. Amaieran, desegin aldaketa.', es: 'En un cambio también cambia dx: no puede quedar ninguna x. Al final, deshaz el cambio.', en: 'In a substitution dx changes too: no x can be left. At the end, undo the change.', ar: 'في التعويض يتغير ⁦dx⁩ أيضًا: لا يبقى أي ⁦x⁩. وفي النهاية تراجع عن التعويض.' },
        strategy: { eu: 'Integratze bakoitzak konstante bat dakar: f″ emanda, bi datu behar dira. Malda f′ funtzioan erabiltzen da, eta puntua f funtzioan.', es: 'Cada integración trae una constante: con f″ hacen falta dos datos. La pendiente se usa en f′ y el punto en f.', en: 'Each integration brings a constant: with f″ you need two facts. The slope is used in f′ and the point in f.', ar: 'كل تكامل يجلب ثابتًا: مع ⁦f″⁩ تلزم معلومتان. يُستعمل الميل في ⁦f′⁩ والنقطة في ⁦f⁩.' }
    }
}

export function MugagabeakBatx2zIntroPage() {
    return <UnitPage unit={mugagabeakBatx2zUnit} />
}
