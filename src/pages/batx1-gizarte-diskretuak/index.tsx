import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { discreteBatx1gChallenges, discreteBatx1gDiagnostic, discreteBatx1gExerciseBank, discreteBatx1gPractice } from './content'
import { DiscreteBatx1gHeroArt } from './figures'
import { DiscreteBatx1gGames } from './games'
import { DISCRETE_BATX1G_GAME_RECORDS_KEY, discreteBatx1gGameProgressIds } from './games/info'
import { DiscreteBatx1gLaboratory } from './lab'
import { discreteBatx1gLabChallengeIds, discreteBatx1gLabToolForTopic, discreteBatx1gLabTools } from './lab/labTools'
import { discreteBatx1gStages, discreteBatx1gTopics } from './lessons'

const diskretuakBatx1gUnit: UnitDefinition = {
    storagePrefix: 'matella-diskretuak-batx1g',
    coursePath: '/matematika/batx1-gizarte',
    courseTitle: { eu: 'Batxilergoa 1 · Gizarte Zientziak', es: '1.º Bachillerato · Ciencias Sociales', en: '1st Bachillerato · Social Sciences', ar: 'البكالوريا الأولى · العلوم الاجتماعية' },
    title: { eu: 'Probabilitate-banaketa diskretuak', es: 'Distribuciones de probabilidad discretas', en: 'Discrete probability distributions', ar: 'التوزيعات الاحتمالية المتقطعة' },
    documentTitle: { eu: 'Probabilitate-banaketa diskretuak · Batxilergoa 1', es: 'Distribuciones discretas · 1.º Bachillerato', en: 'Discrete distributions · 1st Bachillerato', ar: 'التوزيعات المتقطعة · البكالوريا الأولى' },
    tagline: {
        eu: 'Probabilitate konposatuaren errepasoa, eta gero berria: aldagai aleatorio diskretuak bere taularekin, batez bestekoarekin eta desbideratze tipikoarekin, zozketen irabazia, Galtonen tresna eta banaketa binomiala, eta datu errealak binomial batera doitzea.',
        es: 'Un repaso de la probabilidad compuesta y después lo nuevo: las variables aleatorias discretas con su tabla, su media y su desviación típica, la ganancia de una rifa, el aparato de Galton y la distribución binomial, y el ajuste de datos reales a una binomial.',
        en: 'A review of compound probability and then what is new: discrete random variables with their table, mean and standard deviation, the gain of a raffle, the Galton board and the binomial distribution, and fitting real data to a binomial.',
        ar: 'مراجعة للاحتمال المركّب ثم الجديد: المتغيرات العشوائية المتقطعة بجدولها ومتوسطها وانحرافها المعياري، وربح اليانصيب، وجهاز غالتون والتوزيع الثنائي، ومطابقة بيانات حقيقية مع توزيع ثنائي.'
    },
    heroArt: <DiscreteBatx1gHeroArt />,
    pathSubtitle: { eu: 'Lau etapa, errepasotik doikuntzara', es: 'Cuatro etapas, del repaso al ajuste', en: 'Four stages, from the review to the fit', ar: 'أربع مراحل، من المراجعة إلى المطابقة' },
    stages: discreteBatx1gStages,
    topics: discreteBatx1gTopics,
    diagnostic: discreteBatx1gDiagnostic,
    guidedPractice: discreteBatx1gPractice,
    exerciseBank: discreteBatx1gExerciseBank,
    challenges: discreteBatx1gChallenges,
    lab: {
        description: {
            eu: `${discreteBatx1gLabTools.length} tresna, erronkekin: Galtonen tresna, zozketa bidezkoa eta doitu datuak, berriak; eta 4. DBHko Tartagliaren triangelua, eta 2. Batxilergoko eraiki banaketa eta makina binomiala.`,
            es: `${discreteBatx1gLabTools.length} herramientas con retos: el aparato de Galton, la rifa justa y ajusta los datos, nuevas; y el triángulo de Tartaglia de 4.º ESO, y construye la distribución y la máquina binomial de 2.º de Bachillerato.`,
            en: `${discreteBatx1gLabTools.length} tools with challenges: the Galton board, the fair raffle and fit the data, new; and Tartaglia's triangle from 4th ESO, and build the distribution and the binomial machine from 2nd Bachillerato.`,
            ar: `${discreteBatx1gLabTools.length} أدوات مع تحديات: جهاز غالتون واليانصيب العادل وطابق البيانات، وهي جديدة؛ ومثلث تارتاليا من الصف الرابع، وابنِ التوزيع والآلة الثنائية من البكالوريا الثانية.`
        },
        progressIds: discreteBatx1gLabChallengeIds,
        toolForTopic: discreteBatx1gLabToolForTopic,
        render: (props) => <DiscreteBatx1gLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zazpi joko: lasterketa, zein kutxatilatara?, itzuli gertaera, merezi du? eta banaketen detektibea, berriak; binomiala da? 2. Batxilergotik; eta memoria.',
            es: 'Siete juegos: carrera, ¿a qué casilla?, traduce el suceso, ¿merece la pena? y detective de distribuciones, nuevos; ¿es binomial?, de 2.º de Bachillerato; y memoria.',
            en: 'Seven games: race, which bin?, translate the event, is it worth it? and distributions detective, new; is it binomial?, from 2nd Bachillerato; and memory.',
            ar: 'سبع ألعاب: السباق، وإلى أي خانة؟، وترجم الحدث، وهل يستحق؟، ومخبر التوزيعات، وهي جديدة؛ وهل هو ثنائي؟ من البكالوريا الثانية؛ والذاكرة.'
        },
        progressIds: discreteBatx1gGameProgressIds,
        recordsKey: DISCRETE_BATX1G_GAME_RECORDS_KEY,
        render: (props) => <DiscreteBatx1gGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki zehatz bat edo zatiki bat: 0,384, 3/8 edo −1. Ehunekoak, % ikurrik gabe.', es: 'Escribe un número exacto o una fracción: 0,384, 3/8 o −1. Los porcentajes, sin el signo %.', en: 'Write an exact number or a fraction: 0.384, 3/8 or −1. Percentages without the % sign.', ar: 'اكتب عددًا مضبوطًا أو كسرًا: 0.384 أو 3/8 أو −1. والنسب دون الرمز ٪.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 0,384', es: 'Ej.: 0,384', en: 'e.g. 0.384', ar: 'مثال: 0.384' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki edo zatiki gisa.', es: 'El valor es correcto, pero escríbelo como número o fracción.', en: 'The value is correct, but write it as a number or a fraction.', ar: 'القيمة صحيحة، لكن اكتبها عددًا أو كسرًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat: 0,384, 3/8 edo −1.', es: 'No entiendo esa respuesta. Escribe un número o una fracción: 0,384, 3/8 o −1.', en: 'I don\'t understand that answer. Write a number or a fraction: 0.384, 3/8 or −1.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا: 0.384 أو 3/8 أو −1.' }
    },
    errorByStage: {
        review: { eu: 'Itzuli gabe, bigarren ateraldia kutxan geratzen denarekin kalkulatzen da. Ez ahaztu ordena kopurua.', es: 'Sin devolución, la segunda extracción se calcula con lo que queda en la caja. No olvides el número de órdenes.', en: 'Without replacement, the second draw is worked out with what is left in the box. Do not forget the number of orders.', ar: 'دون إرجاع تُحسب السحبة الثانية بما بقي في الصندوق. لا تنسَ عدد الترتيبات.' },
        variable: { eu: 'Probabilitateek 1 egiten dute batuta. μ = Σ p·x, ez balioen batez besteko hutsa. σ kalkulatzean, kendu μ².', es: 'Las probabilidades suman 1. μ = Σ p·x, no la media de los valores sin más. Para σ, resta μ².', en: 'The probabilities add up to 1. μ = Σ p·x, not just the mean of the values. For σ, subtract μ².', ar: 'مجموع الاحتمالات 1. μ = Σ p·x وليس متوسط القيم فقط. ولحساب σ اطرح μ².' },
        binomial: { eu: 'Ez ahaztu C(n, k) ordenak. Itzuli gabe ez da binomiala. «k baino gehiago» k + 1 zenbakitik hasten da. σ = √(npq).', es: 'No olvides los C(n, k) órdenes. Sin devolución no es binomial. «Más de k» empieza en k + 1. σ = √(npq).', en: 'Do not forget the C(n, k) orders. Without replacement it is not binomial. ‘More than k’ starts at k + 1. σ = √(npq).', ar: 'لا تنسَ الترتيبات C(n, k). دون إرجاع ليس ثنائيًّا. «أكثر من k» يبدأ من k + 1. σ = √(npq).' },
        fit: { eu: 'p = x̄ / n, n datu bakoitzeko proba kopurua dela. Itxaronak = N · P(X = k). Alderatu diferentziarik handiena guztizkoaren % 5 zenbakiarekin.', es: 'p = x̄ / n, con n el número de pruebas de cada dato. Esperados = N · P(X = k). Compara la mayor diferencia con el 5 % del total.', en: 'p = x̄ / n, where n is the number of trials in each datum. Expected = N · P(X = k). Compare the largest difference with 5% of the total.', ar: 'p = x̄ / n حيث n عدد المحاولات في كل معطى. المتوقعة = N · P(X = k). قارن أكبر فرق بـ 5٪ من الكل.' }
    }
}

export function DiskretuakBatx1gIntroPage() {
    return <UnitPage unit={diskretuakBatx1gUnit} />
}
