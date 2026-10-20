import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { statisticsAkChallenges, statisticsAkDiagnostic, statisticsAkExerciseBank, statisticsAkPractice } from './content'
import { StatisticsAkHeroArt } from './figures'
import { StatisticsAkLaboratory } from './lab'
import { statisticsAkLabChallengeIds, statisticsAkLabToolForTopic, statisticsAkLabTools } from './lab/labTools'
import { statisticsAkStages, statisticsAkTopics } from './lessons'

const estatistikaUnit: UnitDefinition = {
    storagePrefix: 'matella-estatistika-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Estatistika', es: 'Estadística', ar: 'الإحصاء' },
    documentTitle: { eu: 'Estatistika · 4. DBH', es: 'Estadística · 4.º ESO', ar: 'الإحصاء · الصف الرابع' },
    tagline: {
        eu: 'Laginketa motak eta maiztasun-taulak, batez besteko haztatua, mediana eta moda, kuartilak, pertzentilak eta kutxa-diagramak, batez besteko desbideratzea, σ eta CV, puntu-hodeiak, korrelazioa eta erregresio-zuzena.',
        es: 'Tipos de muestreo y tablas de frecuencias, media ponderada, mediana y moda, cuartiles, percentiles y diagramas de caja, desviación media, σ y CV, nubes de puntos, correlación y recta de regresión.',
        ar: 'أنواع المعاينة وجداول التكرارات، والمتوسط المرجّح والوسيط والمنوال، والربيعيات والمئينات ومخططات الصندوق، والانحراف المتوسط وσ وCV، وسحب النقاط والارتباط ومستقيم الانحدار.'
    },
    heroArt: <StatisticsAkHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, laginetik erregresio-zuzenera', es: 'Cinco etapas, de la muestra a la recta de regresión', ar: 'خمس مراحل، من العيّنة إلى مستقيم الانحدار' },
    stages: statisticsAkStages,
    topics: statisticsAkTopics,
    diagnostic: statisticsAkDiagnostic,
    guidedPractice: statisticsAkPractice,
    exerciseBank: statisticsAkExerciseBank,
    challenges: statisticsAkChallenges,
    lab: {
        description: {
            eu: `${statisticsAkLabTools.length} tresna, erronkekin: lagin geruzatua, maiztasun metatuak, tarteak, bi taldeen balantza, batez bestekoa, mediana eta moda, histograma, pertzentilak, kuartilak eta biboteak, distantziak eta karratuak, taula baten σ, a · x + b datuak eta hodeia erregresio-zuzenarekin.`,
            es: `${statisticsAkLabTools.length} herramientas con retos: la muestra estratificada, frecuencias acumuladas, intervalos, la balanza de dos grupos, media, mediana y moda, histograma, percentiles, cuartiles y bigotes, distancias y cuadrados, la σ de una tabla, los datos a · x + b y la nube con la recta de regresión.`,
            ar: `${statisticsAkLabTools.length} أدوات مع تحديات: العيّنة الطبقية، والتكرارات المتجمّعة، والفئات، وميزان المجموعتين، والمتوسط والوسيط والمنوال، والمدرّج، والمئينات، والربيعيات والشاربان، والمسافات والمربعات، وσ لجدول، والبيانات a · x + b، والسحابة مع مستقيم الانحدار.`
        },
        progressIds: statisticsAkLabChallengeIds,
        toolForTopic: statisticsAkLabToolForTopic,
        render: (props) => <StatisticsAkLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat edo zatiki bat: 18, 1,76 edo 13/18. Ehunekoetan eta graduetan, zenbakia bakarrik.', es: 'Escribe un número o una fracción: 18, 1,76 o 13/18. En porcentajes y grados, solo el número.', ar: 'اكتب عددًا أو كسرًا: 18 أو 1.76 أو 13/18. وفي النسب المئوية والدرجات اكتب العدد فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 1,76', es: 'Ej.: 1,76', ar: 'مثال: 1.76' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat: 18, 1,76 edo 13/18.', es: 'No entiendo esa respuesta. Escribe un número o una fracción: 18, 1,76 o 13/18.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا: 18 أو 1.76 أو 13/18.' }
    },
    errorByStage: {
        data: { eu: 'Geruzakakoan: n · Nᵢ : N. hᵢ = fᵢ : N; F eta H metatu egiten dira. Klase-marka: tartearen erdia.', es: 'En el estratificado: n · Nᵢ : N. hᵢ = fᵢ : N; F y H se acumulan. Marca de clase: el centro del intervalo.', ar: 'في الطبقية: n · Nᵢ : N. وhᵢ = fᵢ : N؛ وF وH تتراكمان. مركز الفئة: منتصفها.' },
        centre: { eu: 'Taldeak batzean, haztatu: Σ nᵢ·x̄ᵢ : Σ nᵢ. Batura = N · x̄. Mediana metatuetan bilatzen da.', es: 'Al juntar grupos, pondera: Σ nᵢ·x̄ᵢ : Σ nᵢ. Suma = N · x̄. La mediana se busca en las acumuladas.', ar: 'عند دمج المجموعات رجّح: Σ nᵢ·x̄ᵢ : Σ nᵢ. المجموع = N · x̄. ويُبحث عن الوسيط في المتجمّعة.' },
        position: { eu: 'Postua N·k/100: osoa bada, bi daturen erdia; hamartarra bada, hurrengoa. Biboteak gehienez 1,5 · RIC.', es: 'Posición N·k/100: si es entera, la media de dos datos; si es decimal, el siguiente. Bigotes como mucho 1,5 · RIC.', ar: 'الموقع N·k/100: إذا كان صحيحًا فمتوسط بيانين، وإذا كان عشريًا فالتالي. الشاربان على الأكثر 1.5 · RIC.' },
        spread: { eu: 'DM: distantziak balio absolutuan. σ² = Σ fᵢ·xᵢ² : N − x̄²; σ haren erroa da. CV = σ : x̄.', es: 'DM: distancias en valor absoluto. σ² = Σ fᵢ·xᵢ² : N − x̄²; σ es su raíz. CV = σ : x̄.', ar: 'DM: المسافات بالقيمة المطلقة. σ² = Σ fᵢ·xᵢ² : N − x̄²؛ وσ جذره. CV = σ : x̄.' },
        two: { eu: 'Zuzena (x̄, ȳ) puntutik pasatzen da. Estimatzeko, ordeztu x. r: zeinua noranzkoa, |r| indarra.', es: 'La recta pasa por (x̄, ȳ). Para estimar, sustituye x. r: el signo es el sentido y |r| la fuerza.', ar: 'يمرّ المستقيم بـ(x̄, ȳ). للتقدير عوّض x. r: الإشارة للاتجاه و|r| للقوة.' }
    }
}

export function EstatistikaDbh4AkIntroPage() {
    return <UnitPage unit={estatistikaUnit} />
}
