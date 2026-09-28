import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { statisticsIntroChallenges, statisticsIntroDiagnostic, statisticsIntroExerciseBank, statisticsIntroPractice } from './content'
import { StatisticsIntroHeroArt } from './figures'
import { StatisticsIntroLaboratory } from './lab'
import { statisticsLabChallengeIds, statisticsLabToolForTopic, statisticsLabTools } from './lab/labTools'
import { statisticsIntroStages, statisticsIntroTopics } from './lessons'

const estatistikaIntroUnit: UnitDefinition = {
    storagePrefix: 'matella-estatistika-dbh1',
    coursePath: '/matematika/dbh1',
    courseTitle: { eu: '1. DBH', es: '1.º ESO', ar: 'الصف الأول' },
    title: { eu: 'Estatistika eta probabilitatea', es: 'Estadística y probabilidad', ar: 'الإحصاء والاحتمال' },
    documentTitle: { eu: 'Estatistika eta probabilitatea · 1. DBH', es: 'Estadística y probabilidad · 1.º ESO', ar: 'الإحصاء والاحتمال · الصف الأول' },
    tagline: {
        eu: 'Inkestak, maiztasun-taulak, grafikoak eta batez bestekoak; eta zoriaren matematika: ikasi datuak antolatzen eta probabilitateak kalkulatzen.',
        es: 'Encuestas, tablas de frecuencias, gráficos y medias; y las matemáticas del azar: aprende a organizar datos y a calcular probabilidades.',
        ar: 'استبيانات وجداول تكرارات ومخططات ومتوسطات، ورياضيات الصدفة: تعلّم تنظيم البيانات وحساب الاحتمالات.'
    },
    heroArt: <StatisticsIntroHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, inkestatik probabilitatera', es: 'Cinco etapas, de la encuesta a la probabilidad', ar: 'خمس مراحل، من الاستبيان إلى الاحتمال' },
    stages: statisticsIntroStages,
    topics: statisticsIntroTopics,
    diagnostic: statisticsIntroDiagnostic,
    guidedPractice: statisticsIntroPractice,
    exerciseBank: statisticsIntroExerciseBank,
    challenges: statisticsIntroChallenges,
    lab: {
        description: { eu: `${statisticsLabTools.length} tresna: aldagai-sailkatzailea, maiztasun-taula, grafiko-egilea, batez bestekoaren balantza eta dado-simulagailua, erronkekin.`, es: `${statisticsLabTools.length} herramientas: clasificador de variables, tabla de frecuencias, creador de gráficos, balanza de la media y simulador de dados, con retos.`, ar: `${statisticsLabTools.length} أدوات: مصنّف المتغيرات وجدول التكرارات وصانع المخططات وميزان المتوسط ومحاكي النرد، مع تحديات.` },
        progressIds: statisticsLabChallengeIds,
        toolForTopic: statisticsLabToolForTopic,
        render: (props) => <StatisticsIntroLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat edo zatiki bat: 7, 0,4 edo 3/8.', es: 'Escribe un número o una fracción: 7, 0,4 o 3/8.', ar: 'اكتب عددًا أو كسرًا: 7 أو 0.4 أو 3/8.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        placeholder: () => ({ eu: 'Adib.: 0,4', es: 'Ej.: 0,4', ar: 'مثال: 0.4' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat: 7, 0,4 edo 3/8.', es: 'No entiendo esa respuesta. Escribe un número o una fracción: 7, 0,4 o 3/8.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا: 7 أو 0.4 أو 3/8.' }
    },
    errorByStage: {
        data: { eu: 'Zenbatu → diskretua; neurtu → jarraitua; zenbakirik ez → kualitatiboa.', es: 'Se cuenta → discreta; se mide → continua; sin números → cualitativa.', ar: 'يُعَدّ ← منفصل؛ يُقاس ← متصل؛ بلا أعداد ← نوعي.' },
        tables: { eu: 'Maiztasun erlatiboa = maiztasun absolutua : N. Ehunekoa, bider 100.', es: 'Frecuencia relativa = frecuencia absoluta : N. El porcentaje, por 100.', ar: 'التكرار النسبي = التكرار المطلق : N. والنسبة المئوية في 100.' },
        graphs: { eu: 'Sektore baten angelua: hᵢ · 360°. Angelu guztiek 360° dute batuta.', es: 'Ángulo de un sector: hᵢ · 360°. Todos suman 360°.', ar: 'زاوية القطاع: hᵢ · 360°. ومجموع الزوايا 360°.' },
        parameters: { eu: 'Batez bestekoa: batura : N. Mediana: lehenik ordenatu. Moda: gehien errepikatzen dena.', es: 'Media: suma : N. Mediana: primero ordena. Moda: el que más se repite.', ar: 'المتوسط: المجموع : N. الوسيط: رتّب أولًا. المنوال: الأكثر تكرارًا.' },
        probability: { eu: 'P = aldeko kasuak : kasu posibleak. Beti 0 eta 1 artean.', es: 'P = casos favorables : casos posibles. Siempre entre 0 y 1.', ar: 'P = الحالات الملائمة : الحالات الممكنة. دائمًا بين 0 و1.' }
    }
}

export function EstatistikaIntroPage() {
    return <UnitPage unit={estatistikaIntroUnit} />
}
