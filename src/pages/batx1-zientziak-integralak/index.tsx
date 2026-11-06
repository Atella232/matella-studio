import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bachIntegralsChallenges, bachIntegralsDiagnostic, bachIntegralsExerciseBank, bachIntegralsPractice } from './content'
import { BachIntegralsHeroArt } from './figures'
import { BachIntegralsLaboratory } from './lab'
import { bachIntegralsLabChallengeIds, bachIntegralsLabToolForTopic, bachIntegralsLabTools } from './lab/labTools'
import { bachIntegralsStages, bachIntegralsTopics } from './lessons'

const integralakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-integralak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Integralak', es: 'Integrales', en: 'Integrals', ar: 'التكاملات' },
    documentTitle: { eu: 'Integralak · Batxilergoa 1', es: 'Integrales · 1.º Bachillerato', en: 'Integrals · 1st Bachillerato', ar: 'التكاملات · البكالوريا الأولى' },
    tagline: {
        eu: 'Jatorrizkoak eta integral mugagabea, integral berehalakoak eta konposatuak, laukizuzenen batura eta integral mugatua, Barrow-ren erregela, eta kurba baten azpiko eta bi kurben arteko azalerak.',
        es: 'Las primitivas y la integral indefinida, las integrales inmediatas y compuestas, las sumas de rectángulos y la integral definida, la regla de Barrow, y las áreas bajo una curva y entre dos curvas.',
        en: 'Antiderivatives and the indefinite integral, basic and composite integrals, sums of rectangles and the definite integral, Barrow\'s rule, and the areas under a curve and between two curves.',
        ar: 'الدوال الأصلية والتكامل غير المحدد، والتكاملات المباشرة والمركّبة، ومجاميع المستطيلات والتكامل المحدد، وقاعدة بارو، والمساحة تحت منحنى وبين منحنيين.'
    },
    heroArt: <BachIntegralsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, deribatua alderantziz egitetik azalerak neurtzeraino', es: 'Cinco etapas, de deshacer la derivada a medir áreas', en: 'Five stages, from undoing the derivative to measuring areas', ar: 'خمس مراحل، من عكس الاشتقاق إلى قياس المساحات' },
    stages: bachIntegralsStages,
    topics: bachIntegralsTopics,
    diagnostic: bachIntegralsDiagnostic,
    guidedPractice: bachIntegralsPractice,
    exerciseBank: bachIntegralsExerciseBank,
    challenges: bachIntegralsChallenges,
    lab: {
        description: {
            eu: `${bachIntegralsLabTools.length} tresna, erronkekin: laukizuzenak kurbaren azpian, azalera-funtzioa, zeinudun azalera eta bi kurben arteko azalera, berriak; eta Deribatuetako f′ funtzioaren grafikoa eta makinen katea.`,
            es: `${bachIntegralsLabTools.length} herramientas con retos: rectángulos bajo la curva, la función área, área con signo y área entre dos curvas, nuevas; y la gráfica de f′ y la cadena de máquinas de Derivadas.`,
            en: `${bachIntegralsLabTools.length} tools with challenges: rectangles under the curve, the area function, signed area and the area between two curves, new; and the graph of f′ and the chain of machines from Derivatives.`,
            ar: `${bachIntegralsLabTools.length} أدوات مع تحديات: مستطيلات تحت المنحنى، ودالة المساحة، والمساحة ذات الإشارة، والمساحة بين منحنيين، وهي جديدة؛ ورسم f′ وسلسلة الآلات من المشتقات.`
        },
        progressIds: bachIntegralsLabChallengeIds,
        toolForTopic: bachIntegralsLabToolForTopic,
        render: (props) => <BachIntegralsLaboratory {...props} />
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
        primitives: { eu: 'Integratzean egiaztatu deribatuz: F′ = f atera behar da. Ez ahaztu + k, eta xⁿ⁺¹ berretzaile berriaz zatitu.', es: 'Al integrar, comprueba derivando: tiene que salir F′ = f. No olvides la + k, y divide xⁿ⁺¹ entre el exponente nuevo.', en: 'When integrating, check by differentiating: you must get F′ = f. Do not forget the + k, and divide xⁿ⁺¹ by the new exponent.', ar: 'عند التكامل تحقق بالاشتقاق: يجب أن يخرج ⁦F′ = f⁩. لا تنسَ ⁦+ k⁩، واقسم ⁦xⁿ⁺¹⁩ على الأس الجديد.' },
        immediate: { eu: '1/x funtzioaren integrala ln |x| da, ez berreturaren erregela. Sinuaren integrala −cos x da, minus zeinuarekin.', es: 'La integral de 1/x es ln |x|, no la regla de la potencia. La integral del seno es −cos x, con el signo menos.', en: 'The integral of 1/x is ln |x|, not the power rule. The integral of sine is −cos x, with the minus sign.', ar: 'تكامل ⁦1/x⁩ هو ⁦ln |x|⁩ وليس قاعدة القوة. وتكامل الجيب ⁦−cos x⁩ بإشارة السالب.' },
        compound: { eu: 'Bilatu barruko u eta egiaztatu kanpoan u′ dagoen. Zenbaki bat falta bada, barruan biderkatu eta kanpoan zatitu; letra bat falta bada, ezin da doitu.', es: 'Busca la u de dentro y comprueba que fuera está u′. Si falta un número, multiplica dentro y divide fuera; si falta una letra, no se puede ajustar.', en: 'Find the u inside and check that u′ is outside. If a number is missing, multiply inside and divide outside; if a letter is missing, it cannot be adjusted.', ar: 'ابحث عن ⁦u⁩ في الداخل وتحقق أن ⁦u′⁩ في الخارج. وإذا نقص عدد فاضرب في الداخل واقسم في الخارج، وإذا نقص حرف فلا يمكن الضبط.' },
        definite: { eu: 'Barrow: F(b) − F(a), goiko muga ken behekoa. Mugak alderantzikatzean zeinua aldatzen da, eta k konstantea ez da behar.', es: 'Barrow: F(b) − F(a), el límite de arriba menos el de abajo. Al invertir los límites cambia el signo, y la constante k no hace falta.', en: 'Barrow: F(b) − F(a), the top limit minus the bottom one. Swapping the limits changes the sign, and the constant k is not needed.', ar: 'بارو: ⁦F(b) − F(a)⁩، الحد الأعلى ناقص الأدنى. وعند قلب الحدّين تتغير الإشارة، ولا حاجة إلى الثابت ⁦k⁩.' },
        areas: { eu: 'Lehenik ebaki-puntuak. Ardatzaren azpiko zatiak integral negatiboa ematen du: zatitu eta balio absolutuak batu. Bi kurben artean, goikoa ken behekoa.', es: 'Primero los cortes. La parte bajo el eje da una integral negativa: parte y suma los valores absolutos. Entre dos curvas, la de arriba menos la de abajo.', en: 'First the crossings. The part below the axis gives a negative integral: split and add the absolute values. Between two curves, the top one minus the bottom one.', ar: 'أولًا نقاط التقاطع. الجزء تحت المحور يعطي تكاملًا سالبًا: قسّم واجمع القيم المطلقة. وبين منحنيين الأعلى ناقص الأدنى.' }
    }
}

export function IntegralakBatx1zIntroPage() {
    return <UnitPage unit={integralakBatx1zUnit} />
}
