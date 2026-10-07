import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readSimilarityAnswer } from './answers'
import { similarityChallenges, similarityDiagnostic, similarityExerciseBank, similarityPractice } from './content'
import { SimilarityHeroArt } from './figures'
import { SimilarityLaboratory } from './lab'
import { similarityLabChallengeIds, similarityLabToolForTopic, similarityLabTools } from './lab/labTools'
import { similarityStages, similarityTopics } from './lessons'

const antzekotasunaUnit: UnitDefinition = {
    storagePrefix: 'matella-antzekotasuna-dbh4ap',
    coursePath: '/matematika/dbh4-aplikatuak',
    courseTitle: { eu: '4. DBH · Aplikatuak', es: '4.º ESO · Aplicadas', ar: 'الصف الرابع · التطبيقية' },
    title: { eu: 'Antzekotasuna', es: 'Semejanza', ar: 'التشابه' },
    documentTitle: { eu: 'Antzekotasuna · 4. DBH', es: 'Semejanza · 4.º ESO', ar: 'التشابه · الصف الرابع' },
    tagline: {
        eu: 'Talesen teorematik eskaletara: zuzenki proportzionalak, irudi eta triangelu antzekoak, homotezia, perimetro, azalera eta bolumenen arrazoiak, mapak eta planoak, eta altuerak itzalekin, ispiluekin eta ikus-lerroekin.',
        es: 'Del teorema de Tales a las escalas: segmentos proporcionales, figuras y triángulos semejantes, homotecia, razones de perímetros, áreas y volúmenes, mapas y planos, y alturas con sombras, espejos y líneas de visión.',
        ar: 'من مبرهنة طاليس إلى المقاييس: القطع المتناسبة، والأشكال والمثلثات المتشابهة، والتحاكي، ونسب المحيطات والمساحات والحجوم، والخرائط والمخططات، والارتفاعات بالظلال والمرايا وخطوط النظر.'
    },
    heroArt: <SimilarityHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, Talesetik altuerak neurtzera', es: 'Cinco etapas, de Tales a medir alturas', ar: 'خمس مراحل، من طاليس إلى قياس الارتفاعات' },
    stages: similarityStages,
    topics: similarityTopics,
    diagnostic: similarityDiagnostic,
    guidedPractice: similarityPractice,
    exerciseBank: similarityExerciseBank,
    challenges: similarityChallenges,
    lab: {
        description: { eu: `${similarityLabTools.length} tresna: proportzioak, zuzenki bat zatitzea, Tales posizioa, laukizuzen antzekoak, homotezia, karratuak eta kuboak haztea, mapak eta itzalak, erronkekin.`, es: `${similarityLabTools.length} herramientas: proporciones, dividir un segmento, posición de Tales, rectángulos semejantes, homotecia, hacer crecer cuadrados y cubos, mapas y sombras, con retos.`, ar: `${similarityLabTools.length} أدوات: التناسبات، وتقسيم قطعة، ووضع طاليس، والمستطيلات المتشابهة، والتحاكي، وتكبير المربعات والمكعبات، والخرائط، والظلال، مع تحديات.` },
        progressIds: similarityLabChallengeIds,
        toolForTopic: similarityLabToolForTopic,
        render: (props) => <SimilarityLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat, komarekin edo puntuarekin (7,5 edo 7.5), unitaterik gabe. Eskala batean, idatzi n (1:n).', es: 'Escribe un número, con coma o con punto (7,5 o 7.5), sin la unidad. En una escala, escribe n (1:n).', ar: 'اكتب عددًا بالنقطة أو بالفاصلة (7.5) دون الوحدة. وفي المقياس اكتب n من ‎1:n.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        normalizeInput: readSimilarityAnswer,
        placeholder: () => ({ eu: 'Adib.: 7,5', es: 'Ej.: 7,5', ar: 'مثال: 7.5' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 7,5.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 7,5.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 7.5.' }
    },
    errorByStage: {
        thales: { eu: 'Parekatu zatiak ordena berean. Tales posizioan, erabili alde osoak.', es: 'Empareja los segmentos en el mismo orden. En posición de Tales, usa los lados enteros.', ar: 'قابل القطع بالترتيب نفسه. وفي وضع طاليس استعمل الأضلاع كاملة.' },
        similarity: { eu: 'Antzekoak: alde homologoak proportzionalak eta angeluak berdinak. Ordenatu aldeak txikienetik handienera.', es: 'Semejantes: lados homólogos proporcionales y ángulos iguales. Ordena los lados de menor a mayor.', ar: 'متشابهان: أضلاع متناظرة متناسبة وزوايا متساوية. رتّب الأضلاع من الأصغر إلى الأكبر.' },
        ratios: { eu: 'Luzerak r bider, azalerak r² bider eta bolumenak r³ bider.', es: 'Longitudes por r, áreas por r² y volúmenes por r³.', ar: 'الأطوال في r، والمساحات في r²، والحجوم في r³.' },
        scales: { eu: 'Errealitatea = mapa · n. Jarri bi distantziak unitate berean. 1 km = 100 000 cm.', es: 'Realidad = mapa · n. Pon las dos distancias en la misma unidad. 1 km = 100 000 cm.', ar: 'الواقع = الخريطة · n. ضع المسافتين بالوحدة نفسها. 1 كم = 100 000 سم.' },
        heights: { eu: 'Bi triangelu antzeko bilatu eta parekatu altuerak eta oinarriak. Ikus-lerroan, kendu eta gehitu begien altuera.', es: 'Busca dos triángulos semejantes y empareja alturas y bases. En la línea de visión, resta y suma la altura de los ojos.', ar: 'ابحث عن مثلثين متشابهين وقابل الارتفاعات والقواعد. وفي خط النظر اطرح ارتفاع العينين ثم أضفه.' }
    }
}

export function AntzekotasunaDbh4ApIntroPage() {
    return <UnitPage unit={antzekotasunaUnit} />
}
