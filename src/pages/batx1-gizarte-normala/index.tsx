import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { normalBatx1gChallenges, normalBatx1gDiagnostic, normalBatx1gExerciseBank, normalBatx1gPractice } from './content'
import { NormalBatx1gHeroArt } from './figures'
import { NormalBatx1gGames } from './games'
import { NORMAL_BATX1G_GAME_RECORDS_KEY, normalBatx1gGameProgressIds } from './games/info'
import { NormalBatx1gLaboratory } from './lab'
import { normalBatx1gLabChallengeIds, normalBatx1gLabToolForTopic, normalBatx1gLabTools } from './lab/labTools'
import { normalBatx1gStages, normalBatx1gTopics } from './lessons'

const normalaBatx1gUnit: UnitDefinition = {
    storagePrefix: 'matella-normala-batx1g',
    coursePath: '/matematika/batx1-gizarte',
    courseTitle: { eu: 'Batxilergoa 1 · Gizarte Zientziak', es: '1.º Bachillerato · Ciencias Sociales', en: '1st Bachillerato · Social Sciences', ar: 'البكالوريا الأولى · العلوم الاجتماعية' },
    title: { eu: 'Banaketa jarraituak: normala', es: 'Distribuciones continuas: la normal', en: 'Continuous distributions: the normal', ar: 'التوزيعات المتصلة: التوزيع الطبيعي' },
    documentTitle: { eu: 'Banaketa normala · Batxilergoa 1', es: 'La distribución normal · 1.º Bachillerato', en: 'The normal distribution · 1st Bachillerato', ar: 'التوزيع الطبيعي · البكالوريا الأولى' },
    tagline: {
        eu: 'Histogramatik dentsitatera, zati zuzeneko dentsitateak, banaketa normala bere 68–95–99,7 arauarekin, taularekin eta tipifikazioarekin, binomiala normalarekin hurbiltzea, eta datu taldekatuak normal batera doitzea.',
        es: 'Del histograma a la densidad, densidades de trozos rectos, la normal con su regla del 68–95–99,7, la tabla y la tipificación, la binomial aproximada por la normal, y el ajuste de datos agrupados a una normal.',
        en: 'From the histogram to the density, densities made of straight pieces, the normal with its 68–95–99.7 rule, the table and standardising, the binomial approximated by the normal, and fitting grouped data to a normal.',
        ar: 'من المدرج التكراري إلى الكثافة، والكثافات من قطع مستقيمة، والتوزيع الطبيعي بقاعدة 68–95–99.7 والجدول والتوحيد المعياري، وتقريب الثنائي بالطبيعي، ومطابقة البيانات المجمّعة مع توزيع طبيعي.'
    },
    heroArt: <NormalBatx1gHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, histogramatik doikuntzara', es: 'Cinco etapas, del histograma al ajuste', en: 'Five stages, from the histogram to the fit', ar: 'خمس مراحل، من المدرج إلى المطابقة' },
    stages: normalBatx1gStages,
    topics: normalBatx1gTopics,
    diagnostic: normalBatx1gDiagnostic,
    guidedPractice: normalBatx1gPractice,
    exerciseBank: normalBatx1gExerciseBank,
    challenges: normalBatx1gChallenges,
    lab: {
        description: {
            eu: `${normalBatx1gLabTools.length} tresna, erronkekin: histogramatik kanpaira, eraiki dentsitate bat eta doitu normal batera, berriak; 1. Batxilergoko puntuazio tipikoa; eta 2. Batxilergoko kanpaiaren azpian, normalaren taula eta binomiala kanpaiaren azpian.`,
            es: `${normalBatx1gLabTools.length} herramientas con retos: del histograma a la campana, construye una densidad y ajusta a una normal, nuevas; la puntuación típica de 1.º de Bachillerato; y bajo la campana, la tabla de la normal y la binomial bajo la campana, de 2.º de Bachillerato.`,
            en: `${normalBatx1gLabTools.length} tools with challenges: from the histogram to the bell, build a density and fit a normal, new; the standard score from 1st Bachillerato; and under the bell, the normal table and the binomial under the bell, from 2nd Bachillerato.`,
            ar: `${normalBatx1gLabTools.length} أدوات مع تحديات: من المدرج إلى الجرس، وابنِ كثافة، وطابق مع توزيع طبيعي، وهي جديدة؛ والدرجة المعيارية من البكالوريا الأولى؛ وتحت الجرس وجدول التوزيع الطبيعي والتوزيع الثنائي تحت الجرس من البكالوريا الثانية.`
        },
        progressIds: normalBatx1gLabChallengeIds,
        toolForTopic: normalBatx1gLabToolForTopic,
        render: (props) => <NormalBatx1gLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zortzi joko: lasterketa, zer ehuneko?, dentsitatea da?, ebaketa-nota eta normalaren detektibea, berriak; zein azalera da? eta bilatu taulan, 2. Batxilergotik; eta memoria.',
            es: 'Ocho juegos: carrera, ¿qué porcentaje?, ¿es una densidad?, nota de corte y detective de la normal, nuevos; ¿qué área es? y busca en la tabla, de 2.º de Bachillerato; y memoria.',
            en: 'Eight games: race, which percentage?, is it a density?, cut-off mark and the normal detective, new; which area is it? and find it in the table, from 2nd Bachillerato; and memory.',
            ar: 'ثماني ألعاب: السباق، وأي نسبة؟، وهل هي كثافة؟، والعلامة الدنيا، ومخبر التوزيع الطبيعي، وهي جديدة؛ وأي مساحة هي؟ وابحث في الجدول من البكالوريا الثانية؛ والذاكرة.'
        },
        progressIds: normalBatx1gGameProgressIds,
        recordsKey: NORMAL_BATX1G_GAME_RECORDS_KEY,
        render: (props) => <NormalBatx1gGames {...props} />
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
        review: { eu: 'Barraren altuera = proportzioa ÷ zabalera. z = (x − μ) / σ.', es: 'Altura de la barra = proporción ÷ anchura. z = (x − μ) / σ.', en: 'Height of the bar = proportion ÷ width. z = (x − μ) / σ.', ar: 'ارتفاع العمود = النسبة ÷ العرض. z = (x − μ) / σ.' },
        continuous: { eu: 'Azalera osoa 1 da. Triangelua: oinarria bider altuera zati 2. P(X = a) = 0.', es: 'El área total es 1. Triángulo: base por altura entre 2. P(X = a) = 0.', en: 'The total area is 1. Triangle: base times height over 2. P(X = a) = 0.', ar: 'المساحة الكلية 1. المثلث: القاعدة في الارتفاع على 2. P(X = a) = 0.' },
        normal: { eu: 'Taulak azpikoa ematen du. Gainetik: 1 − taula. Negatiboak simetriaz. Tipifikatzean, zatitu σ zenbakiaz.', es: 'La tabla da lo de debajo. Por encima: 1 − tabla. Los negativos, por simetría. Al tipificar, divide entre σ.', en: 'The table gives what lies below. Above: 1 − table. Negatives by symmetry. When standardising, divide by σ.', ar: 'يعطي الجدول ما تحت. فوق: 1 − الجدول. والسالب بالتماثل. وعند التوحيد اقسم على σ.' },
        approximation: { eu: 'Egiaztatu np ≥ 5 eta nq ≥ 5. σ = √(npq). Zuzendu puntu erdi.', es: 'Comprueba np ≥ 5 y nq ≥ 5. σ = √(npq). Corrige medio punto.', en: 'Check np ≥ 5 and nq ≥ 5. σ = √(npq). Correct by half a unit.', ar: 'تحقق من np ≥ 5 وnq ≥ 5. σ = √(npq). صحّح نصف وحدة.' },
        fit: { eu: 'Klase-markekin x̄ eta s. Tipifikatu muturrak. Itxaronak = N · p. Alderatu diferentziarik handiena guztizkoaren % 5 zenbakiarekin.', es: 'x̄ y s con las marcas de clase. Tipifica los extremos. Esperados = N · p. Compara la mayor diferencia con el 5 % del total.', en: 'x̄ and s with the class marks. Standardise the ends. Expected = N · p. Compare the largest difference with 5% of the total.', ar: 'x̄ وs بمراكز الفئات. وحّد الأطراف. المتوقعة = N · p. قارن أكبر فرق بـ 5٪ من الكل.' }
    }
}

export function NormalaBatx1gIntroPage() {
    return <UnitPage unit={normalaBatx1gUnit} />
}
