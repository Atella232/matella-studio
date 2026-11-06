import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bachDerivativesChallenges, bachDerivativesDiagnostic, bachDerivativesExerciseBank, bachDerivativesPractice } from './content'
import { BachDerivativesHeroArt } from './figures'
import { BachDerivativesLaboratory } from './lab'
import { bachDerivativesLabChallengeIds, bachDerivativesLabToolForTopic, bachDerivativesLabTools } from './lab/labTools'
import { bachDerivativesStages, bachDerivativesTopics } from './lessons'

const deribatuakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-deribatuak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Deribatuak', es: 'Derivadas', en: 'Derivatives', ar: 'المشتقات' },
    documentTitle: { eu: 'Deribatuak · Batxilergoa 1', es: 'Derivadas · 1.º Bachillerato', en: 'Derivatives · 1st Bachillerato', ar: 'المشتقات · البكالوريا الأولى' },
    tagline: {
        eu: 'Batez besteko aldakuntza-tasa eta deribatua puntu batean, zuzen ukitzailea eta normala, deribagarritasuna, funtzio deribatua, deribazio-erregelak eta katearena, eta funtzio elementalen deribatuak.',
        es: 'La tasa de variación media y la derivada en un punto, la recta tangente y la normal, la derivabilidad, la función derivada, las reglas de derivación con la regla de la cadena y las derivadas de las funciones elementales.',
        en: 'The average rate of change and the derivative at a point, the tangent and normal lines, differentiability, the derivative function, the rules of differentiation with the chain rule, and the derivatives of the elementary functions.',
        ar: 'معدل التغير المتوسط والمشتقة عند نقطة، والمماس والمستقيم العمودي، وقابلية الاشتقاق، والدالة المشتقة، وقواعد الاشتقاق مع قاعدة السلسلة، ومشتقات الدوال الأساسية.'
    },
    heroArt: <BachDerivativesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, T.V.M.-tik funtzio elementaletaraino', es: 'Cinco etapas, de la T.V.M. a las funciones elementales', en: 'Five stages, from the average rate to the elementary functions', ar: 'خمس مراحل، من معدل التغير المتوسط إلى الدوال الأساسية' },
    stages: bachDerivativesStages,
    topics: bachDerivativesTopics,
    diagnostic: bachDerivativesDiagnostic,
    guidedPractice: bachDerivativesPractice,
    exerciseBank: bachDerivativesExerciseBank,
    challenges: bachDerivativesChallenges,
    lab: {
        description: {
            eu: `${bachDerivativesLabTools.length} tresna, erronkekin: ebakitzailetik zuzen ukitzailera, deribagarria hemen?, f′ funtzioaren grafikoa eta makinen katea, berriak; 4. DBHko batez besteko aldakuntza-tasa; eta Funtzio elementaletako bi makina segidan.`,
            es: `${bachDerivativesLabTools.length} herramientas con retos: de la secante a la tangente, ¿derivable aquí?, la gráfica de f′ y la cadena de máquinas, nuevas; la tasa de variación media de 4.º ESO; y las dos máquinas en cadena de Funciones elementales.`,
            en: `${bachDerivativesLabTools.length} tools with challenges: from the secant to the tangent, differentiable here?, the graph of f′ and the chain of machines, new; the average rate of change from 4th ESO; and the two machines in a row from Elementary functions.`,
            ar: `${bachDerivativesLabTools.length} أدوات مع تحديات: من القاطع إلى المماس، وقابلة للاشتقاق هنا؟، ورسم f′، وسلسلة الآلات، وهي جديدة؛ ومعدل التغير المتوسط من الصف الرابع؛ والآلتان المتتاليتان من الدوال الأساسية.`
        },
        progressIds: bachDerivativesLabChallengeIds,
        toolForTopic: bachDerivativesLabToolForTopic,
        render: (props) => <BachDerivativesLaboratory {...props} />
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
        rate: { eu: 'T.V.M.: zatitu f(b) − f(a) kendura b − a kenduraz. Deribatua definizioaren bidez: sinplifikatu h lehenik, eta gero h → 0. Zuzen ukitzailea: y − f(a) = f′(a)(x − a).', es: 'T.V.M.: divide f(b) − f(a) entre b − a. Derivada con la definición: simplifica la h antes de hacer h → 0. Tangente: y − f(a) = f′(a)(x − a).', en: 'Average rate: divide f(b) − f(a) by b − a. Derivative from the definition: cancel the h before letting h → 0. Tangent: y − f(a) = f′(a)(x − a).', ar: 'معدل التغير المتوسط: اقسم ⁦f(b) − f(a)⁩ على ⁦b − a⁩. المشتقة بالتعريف: بسّط h قبل أن تجعل ⁦h → 0⁩. المماس: ⁦y − f(a) = f′(a)(x − a)⁩.' },
        derivability: { eu: 'Lehenik jarraitutasuna: zatiek lotunean balio bera. Gero maldak: alboko deribatuak berdinak. Desberdinak badira, punta bat dago.', es: 'Primero la continuidad: los trozos valen lo mismo en la unión. Después las pendientes: derivadas laterales iguales. Si son distintas, hay un pico.', en: 'First continuity: the pieces have the same value at the join. Then the slopes: equal one-sided derivatives. If they differ, there is a corner.', ar: 'أولًا الاتصال: للجزأين القيمة نفسها عند نقطة الالتقاء. ثم الميلان: مشتقتان جانبيتان متساويتان. وإذا اختلفتا فهناك زاوية.' },
        function: { eu: 'Idatzi erroak eta zatikiak berretura gisa, eta erabili (xⁿ)′ = n·xⁿ⁻¹. Konstante baten deribatua 0 da. Kalkulatu f′(x) eta gero ordezkatu.', es: 'Escribe raíces y fracciones como potencias y usa (xⁿ)′ = n·xⁿ⁻¹. La derivada de una constante es 0. Halla f′(x) y después sustituye.', en: 'Write roots and fractions as powers and use (xⁿ)′ = n·xⁿ⁻¹. The derivative of a constant is 0. Find f′(x) and then substitute.', ar: 'اكتب الجذور والكسور على صورة قوى واستعمل ⁦(xⁿ)′ = n·xⁿ⁻¹⁩. مشتقة الثابت 0. أوجد ⁦f′(x)⁩ ثم عوّض.' },
        rules: { eu: 'Biderkadura: f′g + fg′. Zatidura: (f′g − fg′)/g², ordena horretan. Katea: kanpokoaren deribatua bider barrukoarena.', es: 'Producto: f′g + fg′. Cociente: (f′g − fg′)/g², en ese orden. Cadena: la derivada de fuera por la de dentro.', en: 'Product: f′g + fg′. Quotient: (f′g − fg′)/g², in that order. Chain: the derivative of the outside times that of the inside.', ar: 'الجداء: ⁦f′g + fg′⁩. خارج القسمة: ⁦(f′g − fg′)/g²⁩ بهذا الترتيب. السلسلة: مشتقة الخارجية في مشتقة الداخلية.' },
        elementary: { eu: '(eᵘ)′ = eᵘ·u′ eta (ln u)′ = u′/u. Kosinuaren deribatuak minus zeinua darama. Zuzen ukitzaile paraleloa edo horizontala: ebatzi f′(x) = m.', es: '(eᵘ)′ = eᵘ·u′ y (ln u)′ = u′/u. La derivada del coseno lleva un signo menos. Tangente paralela u horizontal: resuelve f′(x) = m.', en: '(eᵘ)′ = eᵘ·u′ and (ln u)′ = u′/u. The derivative of cosine has a minus sign. Parallel or horizontal tangent: solve f′(x) = m.', ar: '⁦(eᵘ)′ = eᵘ·u′⁩ و⁦(ln u)′ = u′/u⁩. مشتقة جيب التمام فيها إشارة سالب. المماس الموازي أو الأفقي: حلّ ⁦f′(x) = m⁩.' }
    }
}

export function DeribatuakBatx1zIntroPage() {
    return <UnitPage unit={deribatuakBatx1zUnit} />
}
