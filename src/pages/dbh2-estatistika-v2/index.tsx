import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from './answers'
import { statisticsChallenges, statisticsDiagnostic, statisticsExerciseBank, statisticsPractice } from './content'
import { StatisticsHeroArt } from './figures'
import { StatisticsGames } from './games'
import { STATISTICS_GAME_RECORDS_KEY, statisticsGameProgressIds } from './games/info'
import { StatisticsLaboratory } from './lab'
import { statisticsLabChallengeIds, statisticsLabToolForTopic, statisticsLabTools } from './lab/labTools'
import { statisticsStages, statisticsTopics } from './lessons'

const estatistikaUnit: UnitDefinition = {
    storagePrefix: 'matella-estatistika-dbh2',
    coursePath: '/matematika/dbh2',
    courseTitle: { eu: '2. DBH', es: '2.º ESO', ar: 'الصف الثاني' },
    title: { eu: 'Estatistika eta probabilitatea', es: 'Estadística y probabilidad', ar: 'الإحصاء والاحتمال' },
    documentTitle: { eu: 'Estatistika eta probabilitatea · 2. DBH', es: 'Estadística y probabilidad · 2.º ESO', ar: 'الإحصاء والاحتمال · الصف الثاني' },
    tagline: {
        eu: 'Maiztasun metatuak eta datu multzokatuak, histogramak, batez bestekoa eta mediana tauletatik, desbideratzea, kuartilak eta kutxa-diagramak; eta probabilitatea zuhaitz eta taulekin.',
        es: 'Frecuencias acumuladas y datos agrupados, histogramas, media y mediana desde tablas, desviación, cuartiles y diagramas de caja; y la probabilidad con árboles y tablas.',
        ar: 'التكرارات المتجمّعة والبيانات المبوّبة، والمدرّجات التكرارية، والمتوسط والوسيط من الجداول، والانحراف والربيعيات ومخططات الصندوق، والاحتمال بالأشجار والجداول.'
    },
    heroArt: <StatisticsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, tauletatik probabilitatera', es: 'Cinco etapas, de las tablas a la probabilidad', ar: 'خمس مراحل، من الجداول إلى الاحتمال' },
    stages: statisticsStages,
    topics: statisticsTopics,
    diagnostic: statisticsDiagnostic,
    guidedPractice: statisticsPractice,
    exerciseBank: statisticsExerciseBank,
    challenges: statisticsChallenges,
    lab: {
        description: { eu: `${statisticsLabTools.length} tresna datuekin jolasteko: maiztasun metatuak, histograma eta poligonoak, ehunekoetatik sektoreetara, taula baten batez bestekoa, mediana eta moda, kutxa-diagrama eta bi dadoren taula, erronkekin.`, es: `${statisticsLabTools.length} herramientas para jugar con los datos: frecuencias acumuladas, histograma y polígonos, de porcentajes a sectores, media, mediana y moda de una tabla, diagrama de caja y la tabla de dos dados, con retos.`, ar: `${statisticsLabTools.length} أدوات للعب بالبيانات: التكرارات المتجمّعة، والمدرّج والمضلّعات، ومن النسب إلى القطاعات، ومتوسط الجدول ووسيطه ومنواله، ومخطط الصندوق، وجدول النردين، مع تحديات.` },
        progressIds: statisticsLabChallengeIds,
        toolForTopic: statisticsLabToolForTopic,
        render: (props) => <StatisticsLaboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: statisticsGameProgressIds,
        recordsKey: STATISTICS_GAME_RECORDS_KEY,
        render: (props) => <StatisticsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat edo zatiki bat: 18, 1,8 edo 3/8. Ehunekoetan eta graduetan, zenbakia bakarrik.', es: 'Escribe un número o una fracción: 18, 1,8 o 3/8. En porcentajes y grados, solo el número.', ar: 'اكتب عددًا أو كسرًا: 18 أو 1.8 أو 3/8. وفي النسب المئوية والدرجات اكتب العدد فقط.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 1,8', es: 'Ej.: 1,8', ar: 'مثال: 1.8' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat: 18, 1,8 edo 3/8.', es: 'No entiendo esa respuesta. Escribe un número o una fracción: 18, 1,8 o 3/8.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا: 18 أو 1.8 أو 3/8.' }
    },
    errorByStage: {
        tables: { eu: 'Fᵢ: aurreko metatua gehi fᵢ; azkena N. Klase-marka: tartearen muturren erdia.', es: 'Fᵢ: la acumulada anterior más fᵢ; la última es N. Marca de clase: la mitad de los extremos del intervalo.', ar: 'Fᵢ: المتجمّع السابق زائد fᵢ؛ والأخير N. مركز الفئة: نصف مجموع طرفيها.' },
        graphs: { eu: '% 1 = 3,6°. Angelua zati 360 maiztasun erlatiboa da. Begiratu ardatzak zerotik hasten diren.', es: '1 % = 3,6°. El ángulo entre 360 es la frecuencia relativa. Mira si los ejes empiezan en cero.', ar: '1 % = 3.6°. الزاوية على 360 هي التكرار النسبي. تحقّق من أن المحاور تبدأ من الصفر.' },
        centre: { eu: 'Batez bestekoa: Σ xᵢ·fᵢ zati N. Mediana: N : 2 kalkulatu eta Fᵢ-n bilatu. Moda: fᵢ handiena.', es: 'Media: Σ xᵢ·fᵢ entre N. Mediana: calcula N : 2 y búscalo en las Fᵢ. Moda: la mayor fᵢ.', ar: 'المتوسط: Σ xᵢ·fᵢ على N. الوسيط: احسب N : 2 وابحث عنه في Fᵢ. المنوال: أكبر fᵢ.' },
        spread: { eu: 'Ibiltartea: handiena − txikiena. DM: batez bestekoarekiko distantzien batez bestekoa. Kuartilak: ordenatu eta erdi bakoitzaren mediana.', es: 'Recorrido: mayor − menor. DM: media de las distancias a la media. Cuartiles: ordena y halla la mediana de cada mitad.', ar: 'المدى: الأكبر − الأصغر. DM: متوسط المسافات عن المتوسط. الربيعيات: رتّب وأوجد وسيط كل نصف.' },
        chance: { eu: 'P(Ā) = 1 − P(A). Zuhaitz edo taula batekin zenbatu emaitza guztiak, eta begiratu zein diren kasu posibleak.', es: 'P(Ā) = 1 − P(A). Cuenta todos los resultados con un árbol o una tabla y mira cuáles son los casos posibles.', ar: 'P(Ā) = 1 − P(A). عُدّ كل النتائج بشجرة أو جدول وانتبه إلى الحالات الممكنة.' }
    }
}

export function EstatistikaDBH2Page() {
    return <UnitPage unit={estatistikaUnit} />
}
