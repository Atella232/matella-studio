import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bach2LimitsChallenges, bach2LimitsDiagnostic, bach2LimitsExerciseBank, bach2LimitsPractice } from './content'
import { Bach2LimitsHeroArt } from './figures'
import { Bach2LimitsGames } from './games'
import { BACH2_LIMITS_GAME_RECORDS_KEY, bach2LimitsGameProgressIds } from './games/info'
import { Bach2LimitsLaboratory } from './lab'
import { bach2LimitsLabChallengeIds, bach2LimitsLabToolForTopic, bach2LimitsLabTools } from './lab/labTools'
import { bach2LimitsStages, bach2LimitsTopics } from './lessons'

const limiteakBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-limiteak-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Limiteak eta jarraitutasuna', es: 'Límites y continuidad', en: 'Limits and continuity', ar: 'النهايات والاتصال' },
    documentTitle: { eu: 'Limiteak eta jarraitutasuna · Batxilergoa 2', es: 'Límites y continuidad · 2.º Bachillerato', en: 'Limits and continuity · 2nd Bachillerato', ar: 'النهايات والاتصال · البكالوريا الثانية' },
    tagline: {
        eu: '1. mailako limiteen errepaso laburra, limitearen definizio zehatza ε eta δ erabiliz, infinituak alderatzea eta limite nabarmenak, parametrodun jarraitutasuna, eta Bolzano, tarteko balioen eta Weierstrassen teoremak.',
        es: 'Un repaso corto de los límites de 1.º, la definición exacta de límite con ε y δ, comparar infinitos y los límites notables, la continuidad con parámetros, y los teoremas de Bolzano, de los valores intermedios y de Weierstrass.',
        en: 'A short review of the limits of 1st year, the exact definition of a limit with ε and δ, comparing infinities and the notable limits, continuity with parameters, and the theorems of Bolzano, of intermediate values and of Weierstrass.',
        ar: 'مراجعة قصيرة لنهايات السنة الأولى، والتعريف الدقيق للنهاية بـ ε وδ، ومقارنة اللانهايات والنهايات الشهيرة، والاتصال مع الوسطاء، ومبرهنات بولتسانو والقيم الوسيطة وفايرشتراس.'
    },
    heroArt: <Bach2LimitsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, errepasotik Weierstrassen teoremaraino', es: 'Cinco etapas, del repaso al teorema de Weierstrass', en: 'Five stages, from the review to the Weierstrass theorem', ar: 'خمس مراحل، من المراجعة إلى مبرهنة فايرشتراس' },
    stages: bach2LimitsStages,
    topics: bach2LimitsTopics,
    diagnostic: bach2LimitsDiagnostic,
    guidedPractice: bach2LimitsPractice,
    exerciseBank: bach2LimitsExerciseBank,
    challenges: bach2LimitsChallenges,
    lab: {
        description: {
            eu: `${bach2LimitsLabTools.length} tresna, erronkekin: epsilon eta delta, infinituen lasterketa, doitu a eta b eta teorema egokia, berriak; eta 1. mailako Limiteak unitateko lupa, 0/0 zuloa, maila handienak irabazten du, e zenbakiaren makina eta Bolzanok erroa harrapatzen du.`,
            es: `${bach2LimitsLabTools.length} herramientas con retos: épsilon y delta, la carrera de infinitos, ajusta a y b y el teorema justo, nuevas; y de Límites de 1.º, la lupa, el agujero del 0/0, gana el de mayor grado, la máquina de e y Bolzano encierra la raíz.`,
            en: `${bach2LimitsLabTools.length} tools with challenges: epsilon and delta, the race of infinities, adjust a and b and the right theorem, new; and from Limits of 1st year, the lens, the hole of 0/0, the highest degree wins, the e machine and Bolzano traps the root.`,
            ar: `${bach2LimitsLabTools.length} أدوات مع تحديات: إبسيلون ودلتا وسباق اللانهايات واضبط a وb والمبرهنة المناسبة، وهي جديدة؛ ومن نهايات السنة الأولى: العدسة وثقب 0/0 وتفوز الدرجة الأكبر وآلة العدد e وبولتسانو يحصر الجذر.`
        },
        progressIds: bach2LimitsLabChallengeIds,
        toolForTopic: bach2LimitsLabToolForTopic,
        render: (props) => <Bach2LimitsLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zortzi joko: lasterketa, nork irabazten du?, teoremak ziurtatzen al du?, ehizatu erroak, limiteen detektibea eta memoria, berriak; eta 1. mailako Limiteak unitateko indeterminazioa ala ez? eta zer etenune?',
            es: 'Ocho juegos: carrera, ¿quién gana?, ¿lo asegura el teorema?, caza raíces, detective de límites y memoria, nuevos; y de Límites de 1.º, ¿indeterminación o no? y ¿qué discontinuidad?',
            en: 'Eight games: race, who wins?, does the theorem ensure it?, hunt the roots, limits detective and memory, new; and from Limits of 1st year, indeterminate or not? and which discontinuity?',
            ar: 'ثماني ألعاب: السباق ومن يفوز؟ وهل تضمنه المبرهنة؟ واصطد الجذور ومخبر النهايات والذاكرة، وهي جديدة؛ ومن نهايات السنة الأولى: عدم تعيين أم لا؟ وأي انقطاع؟'
        },
        progressIds: bach2LimitsGameProgressIds,
        recordsKey: BACH2_LIMITS_GAME_RECORDS_KEY,
        render: (props) => <Bach2LimitsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 0,25 edo 3/2. Emaitza eᵃ bada, a bakarrik.', es: 'Escribe un número: 5, −3, 0,25 o 3/2. Si el resultado es eᵃ, solo a.', en: 'Write a number: 5, −3, 0.25 or 3/2. If the result is eᵃ, only a.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 0.25 أو 3/2. وإذا كانت النتيجة eᵃ فاكتب a وحدها.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        review: { eu: 'Lehenik ordezkatu. 0/0 bada, faktorizatu edo konjokatua; k/0 bada, zeinua alde bakoitzean; ∞/∞ bada, mailak; ∞ − ∞ bada, zatidura bihurtu.', es: 'Primero sustituye. Si sale 0/0, factoriza o usa el conjugado; si sale k/0, el signo a cada lado; en ∞/∞, los grados; en ∞ − ∞, pásalo a un cociente.', en: 'Substitute first. If you get 0/0, factorise or use the conjugate; if k/0, the sign on each side; for ∞/∞, the degrees; for ∞ − ∞, turn it into a quotient.', ar: 'عوّض أولًا. إذا ظهر 0/0 فحلّل أو استعمل المرافق؛ وإذا ظهر k/0 فالإشارة على كل جانب؛ وفي ∞/∞ الدرجات؛ وفي ∞ − ∞ حوّلها إلى خارج قسمة.' },
        definition: { eu: 'Idatzi |f(x) − L| distantzia |x − a| erabiliz eta zatitu maldaz: δ ateratzen da. Infinituan, K bat bilatzen da. x → −∞ denean, aldatu x = −t eta gogoratu √x² = −x dela x < 0 denean.', es: 'Escribe la distancia |f(x) − L| en función de |x − a| y divide entre la pendiente: sale δ. En el infinito se busca un K. Si x → −∞, cambia x = −t y recuerda que √x² = −x cuando x < 0.', en: 'Write the distance |f(x) − L| in terms of |x − a| and divide by the slope: you get δ. At infinity you look for a K. If x → −∞, change x = −t and remember that √x² = −x when x < 0.', ar: 'اكتب المسافة ⁦|f(x) − L|⁩ بدلالة ⁦|x − a|⁩ واقسم على الميل: تنتج δ. وعند اللانهاية نبحث عن K. وإذا كان ⁦x → −∞⁩ فضع ⁦x = −t⁩ وتذكّر أن ⁦√x² = −x⁩ عندما ⁦x < 0⁩.' },
        notable: { eu: 'ln x ≪ xⁿ ≪ aˣ: esponentzialak beti irabazten du azkenean. 1^∞ ez da 1: e^(lim g·(f − 1)). sin kx / x → k, x radianetan.', es: 'ln x ≪ xⁿ ≪ aˣ: la exponencial siempre acaba ganando. 1^∞ no es 1: e^(lim g·(f − 1)). sen kx / x → k, con x en radianes.', en: 'ln x ≪ xⁿ ≪ aˣ: the exponential always wins in the end. 1^∞ is not 1: e^(lim g·(f − 1)). sin kx / x → k, with x in radians.', ar: '⁦ln x ≪ xⁿ ≪ aˣ⁩: تتفوق الأسية دائمًا في النهاية. و⁦1^∞⁩ ليست 1: ⁦e^(lim g·(f − 1))⁩. و⁦sin kx / x → k⁩ مع x بالراديان.' },
        continuity: { eu: 'Lotune bakoitzean, alboko limiteak alde bakoitzeko zatiarekin eta f(a) berdintza daraman zatiarekin. Bi parametro: bi lotune, bi ekuazio.', es: 'En cada unión, los límites laterales con el trozo de cada lado y f(a) con el trozo que lleva el igual. Dos parámetros: dos uniones, dos ecuaciones.', en: 'At each joint, the one-sided limits with the piece on each side and f(a) with the piece carrying the equals sign. Two parameters: two joints, two equations.', ar: 'عند كل نقطة التقاء: النهايتان الجانبيتان بجزء كل جانب، و⁦f(a)⁩ بالجزء الذي فيه المساواة. وسيطان: نقطتا التقاء ومعادلتان.' },
        theorems: { eu: 'Teoremek baldintza guztiak eskatzen dituzte: jarraitua [a, b] tarte itxian. Bolzano: zeinu-aldaketa h = f − g funtzioan. Erroa badagoela esaten dute, ez non.', es: 'Los teoremas piden todas sus condiciones: continua en el intervalo cerrado [a, b]. Bolzano: cambio de signo en h = f − g. Dicen que la raíz existe, no dónde.', en: 'The theorems need all their conditions: continuous on the closed interval [a, b]. Bolzano: a change of sign in h = f − g. They say the root exists, not where.', ar: 'تشترط المبرهنات كل شروطها: متصلة على الفترة المغلقة ⁦[a, b]⁩. بولتسانو: تغيّر الإشارة في ⁦h = f − g⁩. وهي تقول إن الجذر موجود، لا أين هو.' }
    }
}

export function LimiteakBatx2zIntroPage() {
    return <UnitPage unit={limiteakBatx2zUnit} />
}
