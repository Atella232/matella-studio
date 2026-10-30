import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { statisticsChallenges, statisticsDiagnostic, statisticsExerciseBank, statisticsPractice } from './content'
import { StatisticsHeroArt } from './figures'
import { StatisticsGames } from './games'
import { STATISTICS_GAME_RECORDS_KEY, statisticsGameProgressIds } from './games/info'
import { StatisticsLaboratory } from './lab'
import { statisticsLabChallengeIds, statisticsLabToolForTopic, statisticsLabTools } from './lab/labTools'
import { statisticsStages, statisticsTopics } from './lessons'

const estatistikaUnit: UnitDefinition = {
    storagePrefix: 'matella-estatistika-dbh4ap',
    coursePath: '/matematika/dbh4-aplikatuak',
    courseTitle: { eu: '4. DBH · Aplikatuak', es: '4.º ESO · Aplicadas', en: '4th ESO · Applied', ar: 'الصف الرابع · التطبيقية' },
    title: { eu: 'Estatistika eta probabilitatea', es: 'Estadística y probabilidad', en: 'Statistics and probability', ar: 'الإحصاء والاحتمال' },
    documentTitle: { eu: 'Estatistika eta probabilitatea · 4. DBH', es: 'Estadística y probabilidad · 4.º ESO', en: 'Statistics and probability · 4th ESO', ar: 'الإحصاء والاحتمال · الصف الرابع' },
    tagline: {
        eu: 'Laginak eta tarteetako taulak, batez bestekoa eta pertzentilak, kutxa-diagramak eta datu atipikoak, desbideratze tipikoa eta aldakuntza-koefizientea, korrelazioa eta erregresio-zuzena, eta probabilitatea zuhaitz eta kontingentzia-taulekin.',
        es: 'Muestras y tablas con intervalos, media y percentiles, diagramas de caja y datos atípicos, desviación típica y coeficiente de variación, correlación y recta de regresión, y probabilidad con árboles y tablas de contingencia.',
        en: 'Samples and tables with intervals, mean and percentiles, box plots and outliers, standard deviation and coefficient of variation, correlation and regression line, and probability with tree diagrams and contingency tables.',
        ar: 'العيّنات والجداول بالفئات، والمتوسط والمئينات، ومخططات الصندوق والبيانات الشاذة، والانحراف المعياري ومعامل الاختلاف، والارتباط ومستقيم الانحدار، والاحتمال بالأشجار وجداول التوافق.'
    },
    heroArt: <StatisticsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, laginetik probabilitatera', es: 'Cinco etapas, de la muestra a la probabilidad', en: 'Five stages, from sample to probability.', ar: 'خمس مراحل، من العيّنة إلى الاحتمال' },
    stages: statisticsStages,
    topics: statisticsTopics,
    diagnostic: statisticsDiagnostic,
    guidedPractice: statisticsPractice,
    exerciseBank: statisticsExerciseBank,
    challenges: statisticsChallenges,
    lab: {
        description: {
            eu: `${statisticsLabTools.length} tresna, erronkekin: tarteak, histograma, pertzentilak, biboteak eta atipikoak, bost datuen sakabanaketa, taula baten desbideratze tipikoa, hodeia eta erregresio-zuzena, gertaeren bildura, kutxa bateko bi atera eta kontingentzia-taula.`,
            es: `${statisticsLabTools.length} herramientas con retos: intervalos, histograma, percentiles, bigotes y atípicos, la dispersión de cinco datos, la desviación típica de una tabla, la nube y la recta de regresión, la unión de sucesos, dos extracciones de una urna y la tabla de contingencia.`,
            en: `${statisticsLabTools.length} tools with challenges: intervals, histogram, percentiles, whiskers and outliers, the five-number summary, the standard deviation from a table, the scatter plot and the regression line, the union of events, two draws from an urn and the contingency table.`,
            ar: `${statisticsLabTools.length} أدوات مع تحديات: الفئات، والمدرّج، والمئينات، والشاربان والشواذ، وتشتت خمسة بيانات، والانحراف المعياري لجدول، والسحابة ومستقيم الانحدار، واتحاد الأحداث، وسحبتان من جرّة، وجدول التوافق.`
        },
        progressIds: statisticsLabChallengeIds,
        toolForTopic: statisticsLabToolForTopic,
        render: (props) => <StatisticsLaboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', en: 'Two games to train speed and accuracy: race and memory.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: statisticsGameProgressIds,
        recordsKey: STATISTICS_GAME_RECORDS_KEY,
        render: (props) => <StatisticsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat edo zatiki bat: 18, 1,57 edo 3/8. Ehunekoetan eta graduetan, zenbakia bakarrik.', es: 'Escribe un número o una fracción: 18, 1,57 o 3/8. En porcentajes y grados, solo el número.', en: 'Write a number or a fraction: 18, 1.57 or 3/8. For percentages and degrees, write only the number.', ar: 'اكتب عددًا أو كسرًا: 18 أو 1.57 أو 3/8. وفي النسب المئوية والدرجات اكتب العدد فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 1,57', es: 'Ej.: 1,57', en: 'e.g. 1.57', ar: 'مثال: 1.57' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat: 18, 1,57 edo 3/8.', es: 'No entiendo esa respuesta. Escribe un número o una fracción: 18, 1,57 o 3/8.', en: 'I don\'t understand that answer. Write a number or a fraction: 18, 1.57 or 3/8.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا: 18 أو 1.57 أو 3/8.' }
    },
    errorByStage: {
        data: { eu: 'Ibiltartea: handiena − txikiena. Zabalera: r′ zati tarte kopurua. Klase-marka: tartearen erdia. Sektorea: hᵢ · 360°.', es: 'Recorrido: mayor − menor. Amplitud: r′ entre el número de intervalos. Marca de clase: el centro del intervalo. Sector: hᵢ · 360°.', en: 'Range: largest − smallest. Class width: r′ divided by the number of intervals. Class mark: the centre of the interval. Sector: hᵢ · 360°.', ar: 'المدى: الأكبر − الأصغر. طول الفئة: r′ على عدد الفئات. مركز الفئة: منتصفها. القطاع: hᵢ · 360°.' },
        centre: { eu: 'Batez bestekoa: Σ fᵢ·xᵢ zati N. Pertzentila: ehuneko metatuak k lehen aldiz gainditzen duen balioa. Biboteak gehienez kutxa bider 1,5.', es: 'Media: Σ fᵢ·xᵢ entre N. Percentil: el primer valor cuyo % acumulado supera k. Bigotes: como mucho 1,5 veces la caja.', en: 'Mean: Σ fᵢ·xᵢ divided by N. Percentile: the first value whose cumulative % exceeds k. Whiskers: at most 1.5 times the box.', ar: 'المتوسط: Σ fᵢ·xᵢ على N. المئين: أول قيمة تتجاوز نسبتها المتجمّعة k. الشاربان: على الأكثر 1.5 مرة الصندوق.' },
        spread: { eu: 'σ² = Σ fᵢ·xᵢ² : N − x̄²; σ haren erroa da. CV = σ : x̄.', es: 'σ² = Σ fᵢ·xᵢ² : N − x̄²; σ es su raíz. CV = σ : x̄.', en: 'σ² = Σ fᵢ·xᵢ² : N − x̄²; σ is its square root. CV = σ : x̄.', ar: 'σ² = Σ fᵢ·xᵢ² : N − x̄²؛ وσ جذره. CV = σ : x̄.' },
        two: { eu: 'Estimatzeko, ordeztu x zuzenean. Zuzena (x̄, ȳ) puntutik pasatzen da. r: zeinua noranzkoa, |r| indarra.', es: 'Para estimar, sustituye x en la recta. La recta pasa por (x̄, ȳ). r: el signo es el sentido y |r| la fuerza.', en: 'To estimate, substitute x into the straight line. The straight line passes through (x̄, ȳ). r: the sign gives the direction and |r| the strength.', ar: 'للتقدير عوّض x في المستقيم. يمرّ المستقيم بـ(x̄, ȳ). r: الإشارة للاتجاه و|r| للقوة.' },
        chance: { eu: 'Bide batean biderkatu, bideen artean batu. Itzuli gabe, bigarren adarra aldatu egiten da. Baldintzatuan, kasu posibleak baldintzarenak bakarrik.', es: 'En un camino multiplica, entre caminos suma. Sin devolver, la segunda rama cambia. En la condicionada, los casos posibles son solo los de la condición.', en: 'On one path, multiply; between paths, add. Without replacement, the second branch changes. In conditional probability, the possible cases are only those of the condition.', ar: 'في المسار اضرب، وبين المسارات اجمع. دون إرجاع يتغيّر الفرع الثاني. وفي المشروط الحالات الممكنة هي حالات الشرط فقط.' }
    }
}

export function EstatistikaDbh4ApIntroPage() {
    return <UnitPage unit={estatistikaUnit} />
}
