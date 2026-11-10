import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bach2DerivativesChallenges, bach2DerivativesDiagnostic, bach2DerivativesExerciseBank, bach2DerivativesPractice } from './content'
import { Bach2DerivativesHeroArt } from './figures'
import { Bach2DerivativesGames } from './games'
import { BACH2_DERIVATIVES_GAME_RECORDS_KEY, bach2DerivativesGameProgressIds } from './games/info'
import { Bach2DerivativesLaboratory } from './lab'
import { bach2DerivativesLabChallengeIds, bach2DerivativesLabToolForTopic, bach2DerivativesLabTools } from './lab/labTools'
import { bach2DerivativesStages, bach2DerivativesTopics } from './lessons'

const deribatuakBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-deribatuak-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Deribatuak', es: 'Derivadas', en: 'Derivatives', ar: 'المشتقات' },
    documentTitle: { eu: 'Deribatuak · Batxilergoa 2', es: 'Derivadas · 2.º Bachillerato', en: 'Derivatives · 2nd Bachillerato', ar: 'المشتقات · البكالوريا الثانية' },
    tagline: {
        eu: '1. mailako deribatuen errepaso laburra, deribagarritasuna zatiekin, balio absolutuarekin eta parametroekin, katearen erregela sakonago eta n ordenako deribatuak, alderantzizkoaren deribatua, deribazio inplizitua eta logaritmikoa, eta zuzen ukitzaileen problemak.',
        es: 'Un repaso corto de las derivadas de 1.º, la derivabilidad con trozos, valor absoluto y parámetros, la regla de la cadena a fondo y las derivadas de orden n, la derivada de la inversa, la derivación implícita y la logarítmica, y los problemas de tangentes.',
        en: 'A short review of the derivatives of 1st year, differentiability with pieces, absolute values and parameters, the chain rule in depth and nth derivatives, the derivative of the inverse, implicit and logarithmic differentiation, and tangent problems.',
        ar: 'مراجعة قصيرة لمشتقات السنة الأولى، وقابلية الاشتقاق مع الأجزاء والقيمة المطلقة والوسيطات، وقاعدة السلسلة بعمق والمشتقات من الرتبة n، ومشتقة الدالة العكسية، والاشتقاق الضمني واللوغاريتمي، ومسائل المماسات.'
    },
    heroArt: <Bach2DerivativesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, errepasotik bi kurba ukitzaileetaraino', es: 'Cinco etapas, del repaso a las curvas tangentes', en: 'Five stages, from the review to tangent curves', ar: 'خمس مراحل، من المراجعة إلى المنحنيات المتماسّة' },
    stages: bach2DerivativesStages,
    topics: bach2DerivativesTopics,
    diagnostic: bach2DerivativesDiagnostic,
    guidedPractice: bach2DerivativesPractice,
    exerciseBank: bach2DerivativesExerciseBank,
    challenges: bach2DerivativesChallenges,
    lab: {
        description: {
            eu: `${bach2DerivativesLabTools.length} tresna, erronkekin: deribagarritasunaren lupa, doitu a eta b puntarik gabe, alderantzizkoaren ispilua eta kurba inplizituaren zuzen ukitzailea, berriak; eta 1. mailako Deribatuak unitateko ebakitzailetik zuzen ukitzailera, deribagarria hemen? eta f′ funtzioaren grafikoa.`,
            es: `${bach2DerivativesLabTools.length} herramientas con retos: la lupa de la derivabilidad, ajusta a y b sin pico, el espejo de la inversa y la tangente a la curva implícita, nuevas; y de Derivadas de 1.º, de la secante a la tangente, ¿derivable aquí? y la gráfica de f′.`,
            en: `${bach2DerivativesLabTools.length} tools with challenges: the lens of differentiability, adjust a and b with no corner, the mirror of the inverse and the tangent to an implicit curve, new; and from Derivatives of 1st year, from the secant to the tangent, differentiable here? and the graph of f′.`,
            ar: `${bach2DerivativesLabTools.length} أدوات مع تحديات: عدسة قابلية الاشتقاق، واضبط a وb بلا زاوية، ومرآة الدالة العكسية، ومماس المنحنى الضمني، وهي جديدة؛ ومن مشتقات السنة الأولى: من القاطع إلى المماس، وقابلة للاشتقاق هنا؟، ورسم f′.`
        },
        progressIds: bach2DerivativesLabChallengeIds,
        toolForTopic: bach2DerivativesLabToolForTopic,
        render: (props) => <Bach2DerivativesLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zortzi joko: lasterketa, deribagarria?, zuritu tipula, malda ezkutua, deribatuen detektibea eta memoria, berriak; eta 1. mailako Deribatuak unitateko parekatu f eta f′ eta zuzen ukitzaile zehatza.',
            es: 'Ocho juegos: carrera, ¿derivable?, pela la cebolla, pendiente escondida, detective de derivadas y memoria, nuevos; y de Derivadas de 1.º, empareja f y f′ y tangente exacta.',
            en: 'Eight games: race, differentiable?, peel the onion, the hidden slope, derivatives detective and memory, new; and from Derivatives of 1st year, match f and f′ and the exact tangent.',
            ar: 'ثماني ألعاب: السباق، وقابلة للاشتقاق؟، وقشّر البصلة، والميل المخفي، ومخبر المشتقات، والذاكرة، وهي جديدة؛ ومن مشتقات السنة الأولى: طابِق f وf′ والمماس الدقيق.'
        },
        progressIds: bach2DerivativesGameProgressIds,
        recordsKey: BACH2_DERIVATIVES_GAME_RECORDS_KEY,
        render: (props) => <Bach2DerivativesGames {...props} />
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
        review: { eu: 'Zuzen ukitzailea: y − f(a) = f′(a)(x − a). Normalaren malda −1/f′(a) da. Biderkadura: f′g + fg′; zatidura: (f′g − fg′)/g²; katea: kanpokoaren deribatua bider barrukoarena.', es: 'Tangente: y − f(a) = f′(a)(x − a). La normal tiene pendiente −1/f′(a). Producto: f′g + fg′; cociente: (f′g − fg′)/g²; cadena: la derivada de fuera por la de dentro.', en: 'Tangent: y − f(a) = f′(a)(x − a). The normal has slope −1/f′(a). Product: f′g + fg′; quotient: (f′g − fg′)/g²; chain: the derivative of the outside times that of the inside.', ar: 'المماس: ⁦y − f(a) = f′(a)(x − a)⁩. ميل العمودي ⁦−1/f′(a)⁩. الجداء: ⁦f′g + fg′⁩؛ خارج القسمة: ⁦(f′g − fg′)/g²⁩؛ السلسلة: مشتقة الخارجية في مشتقة الداخلية.' },
        derivability: { eu: 'Lehenik jarraitutasuna (balio bera lotunean), gero maldak (alboko deribatu berdinak). |g| funtzioan, begiratu g zero den puntuak. Bi parametro: bi ekuazio.', es: 'Primero la continuidad (el mismo valor en la unión), después las pendientes (derivadas laterales iguales). En |g|, mira los puntos donde g se anula. Dos parámetros: dos ecuaciones.', en: 'First continuity (the same value at the joint), then the slopes (equal one-sided derivatives). In |g|, look at the points where g is 0. Two parameters: two equations.', ar: 'أولًا الاتصال (القيمة نفسها عند الالتقاء)، ثم الميول (مشتقتان جانبيتان متساويتان). في ⁦|g|⁩ انظر إلى النقاط التي تنعدم فيها g. وسيطان: معادلتان.' },
        chain: { eu: 'Geruza bakoitzak faktore bat ematen du, kanpotik barrura: ez ahaztu barrukoaren deribatua. (ln u)′ = u′/u eta (arctg u)′ = u′/(1 + u²). n ordenakoan, begiratu zeinua eta faktoriala.', es: 'Cada capa da un factor, de fuera adentro: no olvides la derivada de dentro. (ln u)′ = u′/u y (arctg u)′ = u′/(1 + u²). En la de orden n, mira el signo y el factorial.', en: 'Each layer gives a factor, from outside in: do not forget the derivative of the inside. (ln u)′ = u′/u and (arctan u)′ = u′/(1 + u²). For the nth one, watch the sign and the factorial.', ar: 'كل طبقة تعطي عاملًا من الخارج إلى الداخل: لا تنسَ مشتقة الداخلية. ⁦(ln u)′ = u′/u⁩ و⁦(arctan u)′ = u′/(1 + u²)⁩. وفي المشتقة من الرتبة n انتبه إلى الإشارة والعاملي.' },
        special: { eu: 'Alderantzizkoa: (f⁻¹)′(b) = 1/f′(a), f(a) = b izanik. Inplizitua: y duen gai bakoitzak y′ darama. Logaritmikoa: hartu ln, deribatu eta biderkatu y aldagaiaz.', es: 'Inversa: (f⁻¹)′(b) = 1/f′(a), con f(a) = b. Implícita: cada término con y lleva y′. Logarítmica: toma ln, deriva y multiplica por y.', en: 'Inverse: (f⁻¹)′(b) = 1/f′(a), with f(a) = b. Implicit: each term with y carries y′. Logarithmic: take ln, differentiate and multiply by y.', ar: 'العكسية: ⁦(f⁻¹)′(b) = 1/f′(a)⁩ حيث ⁦f(a) = b⁩. الضمني: كل حد فيه y يحمل ⁦y′⁩. اللوغاريتمي: خذ ln واشتق ثم اضرب في y.' },
        tangents: { eu: 'Ukitze-puntuan bi datu: balioa f(x₀) eta malda f′(x₀). Kanpoko puntu batetik, ukitze-puntua ezezaguna da (c). Bi kurba ukitzaileak: altuera bera eta malda bera.', es: 'En el punto de tangencia, dos datos: el valor f(x₀) y la pendiente f′(x₀). Desde un punto exterior, el punto de tangencia es una incógnita (c). Dos curvas tangentes: misma altura y misma pendiente.', en: 'At the point of tangency, two facts: the value f(x₀) and the slope f′(x₀). From an exterior point, the point of tangency is an unknown (c). Two tangent curves: same height and same slope.', ar: 'عند نقطة التماس معلومتان: القيمة ⁦f(x₀)⁩ والميل ⁦f′(x₀)⁩. ومن نقطة خارجية تكون نقطة التماس مجهولًا (c). منحنيان متماسّان: الارتفاع نفسه والميل نفسه.' }
    }
}

export function DeribatuakBatx2zIntroPage() {
    return <UnitPage unit={deribatuakBatx2zUnit} />
}
