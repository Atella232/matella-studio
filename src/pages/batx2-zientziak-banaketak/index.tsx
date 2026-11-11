import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { distributionsBatx2Challenges, distributionsBatx2Diagnostic, distributionsBatx2ExerciseBank, distributionsBatx2Practice } from './content'
import { DistributionsBatx2HeroArt } from './figures'
import { DistributionsBatx2Laboratory } from './lab'
import { distributionsBatx2LabChallengeIds, distributionsBatx2LabToolForTopic, distributionsBatx2LabTools } from './lab/labTools'
import { distributionsBatx2Stages, distributionsBatx2Topics } from './lessons'

const banaketakBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-banaketak-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Banaketa binomiala eta normala', es: 'Distribuciones binomial y normal', en: 'Binomial and normal distributions', ar: 'التوزيع الثنائي والتوزيع الطبيعي' },
    documentTitle: { eu: 'Banaketa binomiala eta normala · Batxilergoa 2', es: 'Distribuciones binomial y normal · 2.º Bachillerato', en: 'Binomial and normal distributions · 2nd Bachillerato', ar: 'التوزيع الثنائي والتوزيع الطبيعي · البكالوريا الثانية' },
    tagline: {
        eu: 'Errepaso labur bat, eta gero berria: aldagai aleatorio diskretuak eta haien batez bestekoa, banaketa binomiala, aldagai jarraituak eta dentsitatea, banaketa normala bere taularekin eta tipifikazioarekin, eta binomiala normalarekin hurbiltzea.',
        es: 'Un repaso corto y después lo nuevo: las variables aleatorias discretas y su media, la distribución binomial, las variables continuas y la densidad, la normal con su tabla y la tipificación, y la aproximación de la binomial por la normal.',
        en: 'A short review and then what is new: discrete random variables and their mean, the binomial distribution, continuous variables and density, the normal with its table and standardising, and the normal approximation of the binomial.',
        ar: 'مراجعة قصيرة ثم الجديد: المتغيرات العشوائية المتقطعة ومتوسطها، والتوزيع الثنائي، والمتغيرات المتصلة والكثافة، والتوزيع الطبيعي بجدوله والتوحيد المعياري، وتقريب التوزيع الثنائي بالطبيعي.'
    },
    heroArt: <DistributionsBatx2HeroArt />,
    pathSubtitle: { eu: 'Bost etapa, errepasotik hurbilketara', es: 'Cinco etapas, del repaso a la aproximación', en: 'Five stages, from the review to the approximation', ar: 'خمس مراحل، من المراجعة إلى التقريب' },
    stages: distributionsBatx2Stages,
    topics: distributionsBatx2Topics,
    diagnostic: distributionsBatx2Diagnostic,
    guidedPractice: distributionsBatx2Practice,
    exerciseBank: distributionsBatx2ExerciseBank,
    challenges: distributionsBatx2Challenges,
    lab: {
        description: {
            eu: `${distributionsBatx2LabTools.length} tresna, erronkekin: eraiki banaketa, makina binomiala, kanpaiaren azpian, normalaren taula eta binomiala kanpaiaren azpian, berriak; eta 4. DBHko Tartagliaren triangelua eta 1. Batxilergoko puntuazio tipikoa.`,
            es: `${distributionsBatx2LabTools.length} herramientas con retos: construye la distribución, la máquina binomial, bajo la campana, la tabla de la normal y la binomial bajo la campana, nuevas; y el triángulo de Tartaglia de 4.º ESO y la puntuación típica de 1.º de Bachillerato.`,
            en: `${distributionsBatx2LabTools.length} tools with challenges: build the distribution, the binomial machine, under the bell, the normal table and the binomial under the bell, new; and Tartaglia's triangle from 4th ESO and the standard score from 1st Bachillerato.`,
            ar: `${distributionsBatx2LabTools.length} أدوات مع تحديات: ابنِ التوزيع، والآلة الثنائية، وتحت الجرس، وجدول التوزيع الطبيعي، والتوزيع الثنائي تحت الجرس، وهي جديدة؛ ومثلث تارتاليا من الصف الرابع والدرجة المعيارية من البكالوريا الأولى.`
        },
        progressIds: distributionsBatx2LabChallengeIds,
        toolForTopic: distributionsBatx2LabToolForTopic,
        render: (props) => <DistributionsBatx2Laboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki zehatz bat edo zatiki bat: 0,8944, 3/8 edo 12. Normalaren probabilitateak, taulako lau hamartarrekin; ehunekoak, % ikurrik gabe.', es: 'Escribe un número exacto o una fracción: 0,8944, 3/8 o 12. Las probabilidades de la normal, con los cuatro decimales de la tabla; los porcentajes, sin el signo %.', en: 'Write an exact number or a fraction: 0.8944, 3/8 or 12. Normal probabilities with the four decimals of the table; percentages without the % sign.', ar: 'اكتب عددًا مضبوطًا أو كسرًا: 0.8944 أو 3/8 أو 12. احتمالات التوزيع الطبيعي بأربعة أرقام عشرية من الجدول، والنسب دون الرمز ٪.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 0,8944', es: 'Ej.: 0,8944', en: 'e.g. 0.8944', ar: 'مثال: 0.8944' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki edo zatiki gisa.', es: 'El valor es correcto, pero escríbelo como número o fracción.', en: 'The value is correct, but write it as a number or a fraction.', ar: 'القيمة صحيحة، لكن اكتبها عددًا أو كسرًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat: 0,8944, 3/8 edo 12.', es: 'No entiendo esa respuesta. Escribe un número o una fracción: 0,8944, 3/8 o 12.', en: 'I don\'t understand that answer. Write a number or a fraction: 0.8944, 3/8 or 12.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا: 0.8944 أو 3/8 أو 12.' }
    },
    errorByStage: {
        review: { eu: 'Ordenarik gabe, k! zenbakiaz zatitu. Bariantza: karratuen batez bestekoa ken batez bestekoaren karratua.', es: 'Sin orden, divide entre k!. Varianza: media de los cuadrados menos el cuadrado de la media.', en: 'With no order, divide by k!. Variance: the mean of the squares minus the square of the mean.', ar: 'دون ترتيب اقسم على k!. التباين: متوسط المربعات ناقص مربع المتوسط.' },
        discrete: { eu: 'Probabilitateek 1 egiten dute batuta. μ = Σ x·p, ez balioen batez besteko hutsa. < ikurrarekin, muga ez da sartzen.', es: 'Las probabilidades suman 1. μ = Σ x·p, no la media de los valores sin más. Con <, el extremo no entra.', en: 'The probabilities add up to 1. μ = Σ x·p, not just the mean of the values. With <, the end value is left out.', ar: 'مجموع الاحتمالات 1. μ = Σ x·p وليس متوسط القيم فقط. ومع < لا يدخل الطرف.' },
        binomial: { eu: 'Ez ahaztu C(n, k) ordenak. Itzuli gabe ez da binomiala. σ = √(npq), ez npq.', es: 'No olvides los C(n, k) órdenes. Sin devolución no es binomial. σ = √(npq), no npq.', en: 'Do not forget the C(n, k) orders. Without replacement it is not binomial. σ = √(npq), not npq.', ar: 'لا تنسَ الترتيبات C(n, k). دون إرجاع ليس ثنائيًّا. σ = √(npq) لا npq.' },
        normal: { eu: 'Taulak azpikoa ematen du. Gainetik: 1 − taula. Negatiboak simetriaz. Tipifikatzean, zatitu σ zenbakiaz, ez bariantzaz.', es: 'La tabla da lo de debajo. Por encima: 1 − tabla. Los negativos, por simetría. Al tipificar, divide entre σ, no entre la varianza.', en: 'The table gives what lies below. Above: 1 − table. Negatives by symmetry. When standardising, divide by σ, not by the variance.', ar: 'يعطي الجدول ما تحت. فوق: 1 − الجدول. والسالب بالتماثل. وعند التوحيد اقسم على σ لا على التباين.' },
        approximation: { eu: 'Egiaztatu np ≥ 5 eta nq ≥ 5. Zuzendu puntu erdi: X ≤ k → Y ≤ k + 0,5; X ≥ k → Y ≥ k − 0,5.', es: 'Comprueba np ≥ 5 y nq ≥ 5. Corrige medio punto: X ≤ k → Y ≤ k + 0,5; X ≥ k → Y ≥ k − 0,5.', en: 'Check np ≥ 5 and nq ≥ 5. Correct by half a unit: X ≤ k → Y ≤ k + 0.5; X ≥ k → Y ≥ k − 0.5.', ar: 'تحقق من np ≥ 5 وnq ≥ 5. صحّح نصف وحدة: X ≤ k → Y ≤ k + 0.5؛ X ≥ k → Y ≥ k − 0.5.' }
    }
}

export function BanaketakBatx2zIntroPage() {
    return <UnitPage unit={banaketakBatx2zUnit} />
}
