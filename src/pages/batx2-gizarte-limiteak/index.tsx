import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bach2gLimitsChallenges, bach2gLimitsDiagnostic, bach2gLimitsExerciseBank, bach2gLimitsPractice } from './content'
import { Bach2gLimitsHeroArt } from './figures'
import { Bach2gLimitsGames } from './games'
import { BACH2G_LIMITS_GAME_RECORDS_KEY, bach2gLimitsGameProgressIds } from './games/info'
import { Bach2gLimitsLaboratory } from './lab'
import { bach2gLimitsLabChallengeIds, bach2gLimitsLabToolForTopic, bach2gLimitsLabTools } from './lab/labTools'
import { bach2gLimitsStages, bach2gLimitsTopics } from './lessons'

const limiteakBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-limiteak-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Limiteak eta jarraitutasuna', es: 'Límites y continuidad', en: 'Limits and continuity', ar: 'النهايات والاتصال' },
    documentTitle: { eu: 'Limiteak eta jarraitutasuna · Batxilergoa 2 · Gizarte Zientziak', es: 'Límites y continuidad · 2.º Bachillerato · Ciencias Sociales', en: 'Limits and continuity · 2nd Bachillerato · Social Sciences', ar: 'النهايات والاتصال · البكالوريا الثانية · العلوم الاجتماعية' },
    tagline: {
        eu: 'Limiteak grafikoan irakurtzea eta kalkulatzea, infinituan eta puntu batean, funtzio zatikatuen jarraitutasuna parametroekin, eta ekonomia eta gizarteko ereduak: epe luzeko joera eta tarteka ordaintzen diren tarifak.',
        es: 'Leer y calcular límites, en el infinito y en un punto, la continuidad de las funciones a trozos con parámetros, y modelos de economía y sociedad: la tendencia a largo plazo y las tarifas por tramos.',
        en: 'Reading and working out limits, at infinity and at a point, the continuity of piecewise functions with parameters, and models of economy and society: the long-run trend and tariffs by brackets.',
        ar: 'قراءة النهايات وحسابها عند اللانهاية وعند نقطة، واتصال الدوال متعددة الأجزاء مع الوسطاء، ونماذج من الاقتصاد والمجتمع: الاتجاه على المدى الطويل والتعريفات حسب الشرائح.'
    },
    heroArt: <Bach2gLimitsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, grafikotik tarifa zuzenera', es: 'Cinco etapas, de la gráfica a la tarifa justa', en: 'Five stages, from the graph to the fair tariff', ar: 'خمس مراحل، من التمثيل البياني إلى التعريفة العادلة' },
    stages: bach2gLimitsStages,
    topics: bach2gLimitsTopics,
    diagnostic: bach2gLimitsDiagnostic,
    guidedPractice: bach2gLimitsPractice,
    exerciseBank: bach2gLimitsExerciseBank,
    challenges: bach2gLimitsChallenges,
    lab: {
        description: {
            eu: `${bach2gLimitsLabTools.length} tresna, erronkekin: batez besteko kostua epe luzera, tarifa tarteka eta interesa gero eta maizago, berriak; 1. mailako Limiteak unitateko lupa, maila handienak irabazten du, 0/0 zuloa eta bi zati lotu; eta 2. mailako Zientzietako doitu a eta b.`,
            es: `${bach2gLimitsLabTools.length} herramientas con retos: coste medio a largo plazo, la tarifa por tramos e interés cada vez más a menudo, nuevas; de Límites de 1.º, la lupa, gana el de mayor grado, el agujero del 0/0 y une dos trozos; y de 2.º Ciencias, ajusta a y b.`,
            en: `${bach2gLimitsLabTools.length} tools with challenges: average cost in the long run, the tariff by brackets and interest more and more often, new; from Limits of 1st year, the lens, the highest degree wins, the hole of 0/0 and join two pieces; and from 2nd year Sciences, adjust a and b.`,
            ar: `${bach2gLimitsLabTools.length} أدوات مع تحديات: متوسط التكلفة على المدى الطويل والتعريفة حسب الشرائح وفائدة بتكرار أكبر فأكبر، وهي جديدة؛ ومن نهايات السنة الأولى: العدسة وتفوز الدرجة الأكبر وثقب 0/0 وصِل جزأين؛ ومن علوم السنة الثانية: اضبط a وb.`
        },
        progressIds: bach2gLimitsLabChallengeIds,
        toolForTopic: bach2gLimitsLabToolForTopic,
        render: (props) => <Bach2gLimitsLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zazpi joko: lasterketa, epe luzera?, itxi tarifa, limiteen detektibea eta memoria, berriak; eta 1. mailako Limiteak unitateko indeterminazioa ala ez? eta zer etenune?',
            es: 'Siete juegos: carrera, ¿a largo plazo?, cierra la tarifa, detective de límites y memoria, nuevos; y de Límites de 1.º, ¿indeterminación o no? y ¿qué discontinuidad?',
            en: 'Seven games: race, in the long run?, close the tariff, limits detective and memory, new; and from Limits of 1st year, indeterminate or not? and which discontinuity?',
            ar: 'سبع ألعاب: السباق وعلى المدى الطويل؟ وأغلق التعريفة ومخبر النهايات والذاكرة، وهي جديدة؛ ومن نهايات السنة الأولى: عدم تعيين أم لا؟ وأي انقطاع؟'
        },
        progressIds: bach2gLimitsGameProgressIds,
        recordsKey: BACH2G_LIMITS_GAME_RECORDS_KEY,
        render: (props) => <Bach2gLimitsGames {...props} />
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
        graph: { eu: 'Limitea kurba hurbiltzen den altuera da, ez zertan lortu. ∞ + k = ∞, k/∞ = 0 eta ∞/k = ±∞. Zazpi indeterminazioak (∞ − ∞, 0 · ∞, 0/0, ∞/∞, 1^∞, ∞⁰, 0⁰) ez dira 0 ezta 1 ere.', es: 'El límite es la altura a la que se acerca la curva, aunque no llegue. ∞ + k = ∞, k/∞ = 0 y ∞/k = ±∞. Las siete indeterminaciones (∞ − ∞, 0 · ∞, 0/0, ∞/∞, 1^∞, ∞⁰, 0⁰) no valen 0 ni 1.', en: 'The limit is the height the curve approaches, even if it never gets there. ∞ + k = ∞, k/∞ = 0 and ∞/k = ±∞. The seven indeterminate forms (∞ − ∞, 0 · ∞, 0/0, ∞/∞, 1^∞, ∞⁰, 0⁰) are not 0 or 1.', ar: 'النهاية هي الارتفاع الذي يقترب منه المنحنى ولو لم يبلغه. ⁦∞ + k = ∞⁩ و⁦k/∞ = 0⁩ و⁦∞/k = ±∞⁩. وحالات عدم التعيين السبع (⁦∞ − ∞⁩، ⁦0 · ∞⁩، ⁦0/0⁩، ⁦∞/∞⁩، ⁦1^∞⁩، ⁦∞⁰⁩، ⁦0⁰⁩) لا تساوي 0 ولا 1.' },
        infinity: { eu: 'Maila handienak agintzen du: goian handiagoa, ±∞; behean, 0; bera, koefizienteen zatidura. ∞ − ∞ erroekin: konjokatua. 1^∞: e^(lim g·(f − 1)). x → −∞ denean, kontuz zeinuarekin.', es: 'Manda el mayor grado: más arriba, ±∞; abajo, 0; el mismo, el cociente de los coeficientes. ∞ − ∞ con raíces: conjugado. 1^∞: e^(lim g·(f − 1)). Si x → −∞, cuidado con el signo.', en: 'The highest degree rules: higher on top, ±∞; below, 0; the same, the quotient of the coefficients. ∞ − ∞ with roots: conjugate. 1^∞: e^(lim g·(f − 1)). If x → −∞, mind the sign.', ar: 'تتحكم الدرجة الأكبر: أكبر في البسط ⁦±∞⁩، وفي المقام 0، والدرجة نفسها خارج قسمة المعاملين. و⁦∞ − ∞⁩ مع الجذور: المرافق. و⁦1^∞⁩: ⁦e^(lim g·(f − 1))⁩. وإذا كان ⁦x → −∞⁩ فانتبه للإشارة.' },
        point: { eu: 'Lehenik ordezkatu. k/0 bada, zeinua alde bakoitzean; 0/0 bada, faktorizatu edo konjokatua. Funtzio zatikatuetan, alde bakoitza bere zatiarekin.', es: 'Primero sustituye. Si sale k/0, el signo a cada lado; si sale 0/0, factoriza o usa el conjugado. En las funciones a trozos, cada lado con su trozo.', en: 'Substitute first. If you get k/0, the sign on each side; if 0/0, factorise or use the conjugate. In piecewise functions, each side with its own piece.', ar: 'عوّض أولًا. إذا ظهر ⁦k/0⁩ فالإشارة على كل جانب؛ وإذا ظهر ⁦0/0⁩ فحلّل أو استعمل المرافق. وفي الدوال متعددة الأجزاء كل جانب بجزئه.' },
        continuity: { eu: 'Hiru baldintzak: f(a), limitea eta biak berdinak. Lotune bakoitzean, alboko limiteak alde bakoitzeko zatiarekin eta f(a) berdintza daraman zatiarekin.', es: 'Las tres condiciones: f(a), el límite y que coincidan. En cada unión, los laterales con el trozo de cada lado y f(a) con el trozo que lleva el igual.', en: 'The three conditions: f(a), the limit and that they agree. At each joint, the one-sided limits with the piece on each side and f(a) with the piece carrying the equals sign.', ar: 'الشروط الثلاثة: ⁦f(a)⁩ والنهاية وتساويهما. وعند كل نقطة التقاء: النهايتان الجانبيتان بجزء كل جانب، و⁦f(a)⁩ بالجزء الذي فيه المساواة.' },
        context: { eu: 'Epe luzera: t → +∞ limitea. Batez besteko kostua C(x)/x da. Jauzia alboko limiteen kenketa da; jauzirik ez egoteko, berdindu bi tarteak aldaketa-puntuan.', es: 'A largo plazo: el límite cuando t → +∞. El coste medio es C(x)/x. El salto es la diferencia de los laterales; para que no haya salto, iguala los dos tramos en el punto de cambio.', en: 'In the long run: the limit as t → +∞. The average cost is C(x)/x. The jump is the difference of the one-sided limits; for no jump, set both brackets equal at the point of change.', ar: 'على المدى الطويل: النهاية عندما ⁦t → +∞⁩. ومتوسط التكلفة ⁦C(x)/x⁩. والقفزة هي فرق النهايتين الجانبيتين؛ وكي لا توجد قفزة ساوِ الشريحتين عند نقطة التغيّر.' }
    }
}

export function LimiteakBatx2gIntroPage() {
    return <UnitPage unit={limiteakBatx2gUnit} />
}
