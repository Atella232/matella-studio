import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bach2DefiniteChallenges, bach2DefiniteDiagnostic, bach2DefiniteExerciseBank, bach2DefinitePractice } from './content'
import { Bach2DefiniteHeroArt } from './figures'
import { Bach2DefiniteGames } from './games'
import { BACH2_DEFINITE_GAME_RECORDS_KEY, bach2DefiniteGameProgressIds } from './games/info'
import { Bach2DefiniteLaboratory } from './lab'
import { bach2DefiniteLabChallengeIds, bach2DefiniteLabToolForTopic, bach2DefiniteLabTools } from './lab/labTools'
import { bach2DefiniteStages, bach2DefiniteTopics } from './lessons'

const mugatuaBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-mugatua-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Integral mugatua', es: 'Integral definida', en: 'The definite integral', ar: 'التكامل المحدد' },
    documentTitle: { eu: 'Integral mugatua · Batxilergoa 2', es: 'Integral definida · 2.º Bachillerato', en: 'The definite integral · 2nd Bachillerato', ar: 'التكامل المحدد · البكالوريا الثانية' },
    tagline: {
        eu: '1. mailako Barrow-ren eta azaleren errepasoa, behe- eta goi-baturak, batez besteko balioa, oinarrizko teorema, aldaketa eta zatikakoa integral mugatuetan, eta barrutiak, parametroak eta bira-gorputzak.',
        es: 'Repaso de Barrow y las áreas de 1.º, sumas inferiores y superiores, valor medio, teorema fundamental, cambio de variable y partes en integrales definidas, y recintos, parámetros y volúmenes de revolución.',
        en: 'A review of Barrow and the areas from 1.º, lower and upper sums, mean value, the fundamental theorem, substitution and parts in definite integrals, and regions, parameters and volumes of revolution.',
        ar: 'مراجعة قاعدة بارو ومساحات السنة الأولى، والمجاميع الدنيا والعليا، والقيمة المتوسطة، والمبرهنة الأساسية، وتغيير المتغير والتجزئة في التكاملات المحددة، والمناطق والوسائط وأحجام الدوران.'
    },
    heroArt: <Bach2DefiniteHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, Barrow errepasatzetik bira-gorputzeraino', es: 'Cinco etapas, del repaso de Barrow a los volúmenes de revolución', en: 'Five stages, from reviewing Barrow to volumes of revolution', ar: 'خمس مراحل، من مراجعة قاعدة بارو إلى أحجام الدوران' },
    stages: bach2DefiniteStages,
    topics: bach2DefiniteTopics,
    diagnostic: bach2DefiniteDiagnostic,
    guidedPractice: bach2DefinitePractice,
    exerciseBank: bach2DefiniteExerciseBank,
    challenges: bach2DefiniteChallenges,
    lab: {
        description: {
            eu: `${bach2DefiniteLabTools.length} tresna, erronkekin: azalera behe- eta goi-baturen artean estutu, batez besteko balioaren laukizuzena eta barrutia zerrendatan zatitu, berriak; eta 1. mailako Integraletako zeinudun azalera eta azalera-funtzioa.`,
            es: `${bach2DefiniteLabTools.length} herramientas con retos: encaja el área entre la suma inferior y la superior, el rectángulo del valor medio y parte el recinto en tiras, nuevas; y el área con signo y la función área de Integrales de 1.º.`,
            en: `${bach2DefiniteLabTools.length} tools with challenges: trap the area between the lower and the upper sum, the mean value rectangle and split the region into strips, new; and signed area and the area function from Integrals of 1.º.`,
            ar: `${bach2DefiniteLabTools.length} أدوات مع تحديات: احصر المساحة بين المجموع الأدنى والأعلى، ومستطيل القيمة المتوسطة، وقسّم المنطقة إلى شرائح، وهي جديدة؛ والمساحة ذات الإشارة ودالة المساحة من تكاملات السنة الأولى.`
        },
        progressIds: bach2DefiniteLabChallengeIds,
        toolForTopic: bach2DefiniteLabToolForTopic,
        render: (props) => <Bach2DefiniteLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Sei joko: lasterketa, Barrow-k balio du?, aldatu mugak, deribatu funtzio integrala, integral mugatuaren detektibea eta memoria.',
            es: 'Seis juegos: carrera, ¿vale Barrow?, cambia los límites, deriva la función integral, detective de la integral definida y memoria.',
            en: 'Six games: race, does Barrow work?, change the limits, differentiate the integral function, definite integral detective and memory.',
            ar: 'ست ألعاب: السباق، وهل تصح قاعدة بارو؟، وغيّر الحدود، واشتق الدالة التكاملية، ومخبر التكامل المحدد، والذاكرة.'
        },
        progressIds: bach2DefiniteGameProgressIds,
        recordsKey: BACH2_DEFINITE_GAME_RECORDS_KEY,
        render: (props) => <Bach2DefiniteGames {...props} />
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
        review: { eu: 'Barrow: goiko muga ken behekoa, F(b) − F(a). Azalera bat bada, lehenik ebaki-puntuak, eta ardatzaren azpiko zatiak balio absolutuan.', es: 'Barrow: el de arriba menos el de abajo, F(b) − F(a). Si es un área, primero los cortes, y las partes bajo el eje en valor absoluto.', en: 'Barrow: the top limit minus the bottom one, F(b) − F(a). For an area, first the crossings, and the parts below the axis as absolute values.', ar: 'بارو: الأعلى ناقص الأدنى ⁦F(b) − F(a)⁩. وإذا كانت مساحة فأولًا نقاط التقاطع، والأجزاء تحت المحور بالقيمة المطلقة.' },
        sums: { eu: 'Behe-baturak zati bakoitzeko minimoa erabiltzen du, eta goi-baturak maximoa. Batez besteko balioa: integrala zati b − a.', es: 'La suma inferior usa el mínimo de cada tramo y la superior, el máximo. El valor medio: la integral entre b − a.', en: 'The lower sum uses the minimum of each piece and the upper sum the maximum. The mean value: the integral divided by b − a.', ar: 'المجموع الأدنى يستعمل أصغر قيمة في كل جزء والأعلى أكبرها. والقيمة المتوسطة: التكامل مقسومًا على ⁦b − a⁩.' },
        fundamental: { eu: 'F(x) = ∫ₐˣ f(t) dt bada, F′(x) = f(x). Muga g(x) bada, biderkatu g′(x) deribatuaz. Barrow-k f jarraitua behar du tarte osoan.', es: 'Si F(x) = ∫ₐˣ f(t) dt, F′(x) = f(x). Si el límite es g(x), multiplica por g′(x). Barrow necesita f continua en todo el intervalo.', en: 'If F(x) = ∫ₐˣ f(t) dt, F′(x) = f(x). If the limit is g(x), multiply by g′(x). Barrow needs f continuous on the whole interval.', ar: 'إذا كانت ⁦F(x) = ∫ₐˣ f(t) dt⁩ فإن ⁦F′(x) = f(x)⁩. وإذا كان الحد ⁦g(x)⁩ فاضرب في ⁦g′(x)⁩. وتحتاج قاعدة بارو إلى ⁦f⁩ متصلة في الفترة كلها.' },
        techniques: { eu: 'Aldaketan, aldatu mugak ere. Zatika, uv zatia a eta b artean kalkulatzen da. Balio absolutuarekin edo zatika, zatitu formula aldatzen den tokian.', es: 'En un cambio, cambia también los límites. Por partes, uv se evalúa entre a y b. Con valor absoluto o a trozos, parte donde cambia la fórmula.', en: 'In a substitution, change the limits too. By parts, uv is worked out between a and b. With an absolute value or a piecewise function, split where the formula changes.', ar: 'في التعويض غيّر الحدود أيضًا. وبالتجزئة يُحسب ⁦uv⁩ بين ⁦a⁩ و⁦b⁩. ومع القيمة المطلقة أو الدالة المعرّفة على أجزاء قسّم حيث تتغير الصيغة.' },
        problems: { eu: 'Marraztu barrutia eta aurkitu ebaki-puntu guztiak; zerrenda bakoitzean, goikoa ken behekoa. Bolumenean, π eta karratua: V = π ∫ f² dx.', es: 'Dibuja el recinto y halla todos los cortes; en cada tira, arriba menos abajo. En un volumen, π y el cuadrado: V = π ∫ f² dx.', en: 'Draw the region and find all the crossings; on each strip, top minus bottom. In a volume, π and the square: V = π ∫ f² dx.', ar: 'ارسم المنطقة وأوجد كل نقاط التقاطع؛ وفي كل شريحة الأعلى ناقص الأدنى. وفي الحجم ⁦π⁩ والتربيع: ⁦V = π ∫ f² dx⁩.' }
    }
}

export function MugatuaBatx2zIntroPage() {
    return <UnitPage unit={mugatuaBatx2zUnit} />
}
