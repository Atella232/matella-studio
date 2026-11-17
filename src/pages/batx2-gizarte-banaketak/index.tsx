import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { distributionsBatx2gChallenges, distributionsBatx2gDiagnostic, distributionsBatx2gExerciseBank, distributionsBatx2gPractice } from './content'
import { DistributionsBatx2gHeroArt } from './figures'
import { distributionsBatx2gStages, distributionsBatx2gTopics } from './lessons'

const banaketakBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-banaketak-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Banaketa binomiala eta normala', es: 'Distribuciones binomial y normal', en: 'Binomial and normal distributions', ar: 'التوزيع الثنائي والتوزيع الطبيعي' },
    documentTitle: { eu: 'Banaketa binomiala eta normala · Batxilergoa 2 · Gizarte', es: 'Distribuciones binomial y normal · 2.º Bachillerato · Sociales', en: 'Binomial and normal distributions · 2nd Bachillerato · Social Sciences', ar: 'التوزيع الثنائي والطبيعي · البكالوريا الثانية · اجتماعية' },
    tagline: {
        eu: 'Aldagai aleatorio diskretuak eta espero den irabazia, banaketa binomiala inkestetan, banaketa normala bere taularekin, tipifikatuz konparatzea, alderantzizko bilaketa, tarte karakteristikoa eta binomiala normalarekin hurbiltzea.',
        es: 'Variables aleatorias discretas y ganancia esperada, la binomial en las encuestas, la normal con su tabla, comparar tipificando, la búsqueda inversa, el intervalo característico y la aproximación de la binomial por la normal.',
        en: 'Discrete random variables and expected gain, the binomial in polls, the normal with its table, comparing by standardising, the inverse search, the characteristic interval and the normal approximation of the binomial.',
        ar: 'المتغيرات العشوائية المتقطعة والربح المتوقع، والتوزيع الثنائي في الاستطلاعات، والتوزيع الطبيعي بجدوله، والمقارنة بالتوحيد، والبحث العكسي، والفترة المميزة، وتقريب الثنائي بالطبيعي.'
    },
    heroArt: <DistributionsBatx2gHeroArt />,
    pathSubtitle: { eu: 'Lau etapa, aldagaietik hurbilketara', es: 'Cuatro etapas, de la variable a la aproximación', en: 'Four stages, from the variable to the approximation', ar: 'أربع مراحل، من المتغير إلى التقريب' },
    stages: distributionsBatx2gStages,
    topics: distributionsBatx2gTopics,
    diagnostic: distributionsBatx2gDiagnostic,
    guidedPractice: distributionsBatx2gPractice,
    exerciseBank: distributionsBatx2gExerciseBank,
    challenges: distributionsBatx2gChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki zehatz bat edo zatiki bat: 0,8944, 3/8 edo 12. Normalaren probabilitateak, taulako lau hamartarrekin.', es: 'Escribe un número exacto o una fracción: 0,8944, 3/8 o 12. Las probabilidades de la normal, con los cuatro decimales de la tabla.', en: 'Write an exact number or a fraction: 0.8944, 3/8 or 12. Normal probabilities with the four decimals of the table.', ar: 'اكتب عددًا مضبوطًا أو كسرًا: 0.8944 أو 3/8 أو 12. احتمالات التوزيع الطبيعي بأربعة أرقام عشرية من الجدول.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 0,8944', es: 'Ej.: 0,8944', en: 'e.g. 0.8944', ar: 'مثال: 0.8944' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki edo zatiki gisa.', es: 'El valor es correcto, pero escríbelo como número o fracción.', en: 'The value is correct, but write it as a number or a fraction.', ar: 'القيمة صحيحة، لكن اكتبها عددًا أو كسرًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat: 0,8944, 3/8 edo 12.', es: 'No entiendo esa respuesta. Escribe un número o una fracción: 0,8944, 3/8 o 12.', en: 'I don\'t understand that answer. Write a number or a fraction: 0.8944, 3/8 or 12.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا: 0.8944 أو 3/8 أو 12.' }
    },
    errorByStage: {
        discrete: { eu: 'Probabilitateek 1 egiten dute batuta. μ = Σ x·p, ez balioen batez besteko hutsa. Irabazian, kendu prezioa.', es: 'Las probabilidades suman 1. μ = Σ x·p, no la media de los valores sin más. En la ganancia, resta el precio.', en: 'The probabilities add up to 1. μ = Σ x·p, not just the mean of the values. For the gain, subtract the price.', ar: 'مجموع الاحتمالات 1. μ = Σ x·p وليس متوسط القيم فقط. وفي الربح اطرح السعر.' },
        binomial: { eu: 'Ez ahaztu C(n, k) ordenak. «Gutxienez bat» = 1 − qⁿ. σ = √(npq), ez npq.', es: 'No olvides los C(n, k) órdenes. «Al menos uno» = 1 − qⁿ. σ = √(npq), no npq.', en: 'Do not forget the C(n, k) orders. ‘At least one’ = 1 − qⁿ. σ = √(npq), not npq.', ar: 'لا تنسَ الترتيبات C(n, k). «واحد على الأقل» = 1 − qⁿ. σ = √(npq) لا npq.' },
        normal: { eu: 'Taulak azpikoa ematen du. Gainetik: 1 − taula. Negatiboak simetriaz. Zatitu σ zenbakiaz.', es: 'La tabla da lo de debajo. Por encima: 1 − tabla. Los negativos, por simetría. Divide entre σ.', en: 'The table gives what lies below. Above: 1 − table. Negatives by symmetry. Divide by σ.', ar: 'يعطي الجدول ما تحت. فوق: 1 − الجدول. والسالب بالتماثل. اقسم على σ.' },
        approximation: { eu: 'Erradioa z·σ da. Egiaztatu np ≥ 5 eta nq ≥ 5, eta zuzendu puntu erdi.', es: 'El radio es z·σ. Comprueba np ≥ 5 y nq ≥ 5, y corrige medio punto.', en: 'The radius is z·σ. Check np ≥ 5 and nq ≥ 5, and correct by half a unit.', ar: 'نصف القطر z·σ. تحقق من np ≥ 5 وnq ≥ 5، وصحّح نصف وحدة.' }
    }
}

export function BanaketakBatx2gIntroPage() {
    return <UnitPage unit={banaketakBatx2gUnit} />
}
