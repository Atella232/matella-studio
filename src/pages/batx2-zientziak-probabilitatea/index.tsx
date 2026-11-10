import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { probabilityBatx2Challenges, probabilityBatx2Diagnostic, probabilityBatx2ExerciseBank, probabilityBatx2Practice } from './content'
import { ProbabilityBatx2HeroArt } from './figures'
import { ProbabilityBatx2Games } from './games'
import { PROBABILITY_BATX2_GAME_RECORDS_KEY, probabilityBatx2GameProgressIds } from './games/info'
import { ProbabilityBatx2Laboratory } from './lab'
import { probabilityBatx2LabChallengeIds, probabilityBatx2LabToolForTopic, probabilityBatx2LabTools } from './lab/labTools'
import { probabilityBatx2Stages, probabilityBatx2Topics } from './lessons'

const probabilitateaBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-probabilitatea-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمالات' },
    documentTitle: { eu: 'Probabilitatea · Batxilergoa 2', es: 'Probabilidad · 2.º Bachillerato', en: 'Probability · 2nd Bachillerato', ar: 'الاحتمالات · البكالوريا الثانية' },
    tagline: {
        eu: '4. DBHko errepaso labur bat, eta gero berria: gertaeren aljebra eta axiomak, probabilitate baldintzatua, biderkaduraren erregela eta independentzia, probabilitate osoa, Bayesen teorema eta proba diagnostikoak.',
        es: 'Un repaso corto de 4.º y después lo nuevo: el álgebra de sucesos y los axiomas, la probabilidad condicionada, la regla del producto y la independencia, la probabilidad total, el teorema de Bayes y las pruebas diagnósticas.',
        en: 'A short review of 4th ESO and then what is new: the algebra of events and the axioms, conditional probability, the multiplication rule and independence, total probability, Bayes\' theorem and diagnostic tests.',
        ar: 'مراجعة قصيرة للصف الرابع ثم الجديد: جبر الأحداث والبديهيات، والاحتمال المشروط، وقاعدة الضرب والاستقلال، والاحتمال الكلي، ومبرهنة بايز، والاختبارات التشخيصية.'
    },
    heroArt: <ProbabilityBatx2HeroArt />,
    pathSubtitle: { eu: 'Lau etapa, errepasotik Bayesera', es: 'Cuatro etapas, del repaso a Bayes', en: 'Four stages, from the review to Bayes', ar: 'أربع مراحل، من المراجعة إلى بايز' },
    stages: probabilityBatx2Stages,
    topics: probabilityBatx2Topics,
    diagnostic: probabilityBatx2Diagnostic,
    guidedPractice: probabilityBatx2Practice,
    exerciseBank: probabilityBatx2ExerciseBank,
    challenges: probabilityBatx2Challenges,
    lab: {
        description: {
            eu: `${probabilityBatx2LabTools.length} tresna, erronkekin: margotu gertaera, lau zonak, probabilitatearen karratua, kausak karratuan eta 10\u00a0000 pertsona, berriak; eta 4. DBHko gertaeren bildura, kutxa bateko bi atera, batera ateratzea, gutxienez behin, kontingentzia-taula eta kutxa aukeratzen duen dadoa.`,
            es: `${probabilityBatx2LabTools.length} herramientas con retos: pinta el suceso, las cuatro zonas, el cuadrado de probabilidad, las causas en el cuadrado y 10\u00a0000 personas, nuevas; y de 4.º ESO, la unión de sucesos, dos extracciones de una urna, sacar varias a la vez, al menos una vez, la tabla de contingencia y el dado que elige la urna.`,
            en: `${probabilityBatx2LabTools.length} tools with challenges: paint the event, the four zones, the probability square, the causes in the square and 10,000 people, new; and from 4th ESO, the union of events, two draws from an urn, drawing several at once, at least once, the contingency table and the die that chooses the urn.`,
            ar: `${probabilityBatx2LabTools.length} أداة مع تحديات: لوّن الحدث، والمناطق الأربع، ومربع الاحتمال، والأسباب في المربع، و10\u00a0000 شخص، وهي جديدة؛ ومن الصف الرابع: اتحاد الأحداث، وسحبتان من جرّة، والسحب معًا، ومرة واحدة على الأقل، وجدول التوافق، والنرد الذي يختار الجرّة.`
        },
        progressIds: probabilityBatx2LabChallengeIds,
        toolForTopic: probabilityBatx2LabToolForTopic,
        render: (props) => <ProbabilityBatx2Laboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zortzi joko: lasterketa, independenteak ala bateraezinak, bete Venn diagrama, nork egin du?, probabilitatearen detektibea eta memoria, berriak; eta 4. DBHko zuhaitzaren bideak eta kontingentzia-taula.',
            es: 'Ocho juegos: carrera, ¿independientes o incompatibles?, rellena el Venn, ¿quién fue?, detective de probabilidad y memoria, nuevos; y de 4.º ESO, los caminos del árbol y la tabla de contingencia.',
            en: 'Eight games: race, independent or mutually exclusive?, fill in the Venn diagram, who did it?, probability detective and memory, new; and from 4th ESO, the paths of the tree and the contingency table.',
            ar: 'ثماني ألعاب: السباق، ومستقلان أم متنافيان، واملأ مخطط فن، ومن الفاعل، ومخبر الاحتمالات، والذاكرة، وهي جديدة؛ ومن الصف الرابع: مسارات الشجرة وجدول التوافق.'
        },
        progressIds: probabilityBatx2GameProgressIds,
        recordsKey: PROBABILITY_BATX2_GAME_RECORDS_KEY,
        render: (props) => <ProbabilityBatx2Games {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zatiki bat edo zenbaki zehatz bat: 3/8, 0,375 edo 12. Probabilitate ez-zehatzak (1/6), zatiki gisa.', es: 'Escribe una fracción o un número exacto: 3/8, 0,375 o 12. Las probabilidades no exactas (1/6), como fracción.', en: 'Write a fraction or an exact number: 3/8, 0.375 or 12. Non-exact probabilities (1/6): write them as a fraction.', ar: 'اكتب كسرًا أو عددًا مضبوطًا: 3/8 أو 0.375 أو 12. والاحتمالات غير المنتهية (1/6) كسرًا.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 3/8', es: 'Ej.: 3/8', en: 'e.g. 3/8', ar: 'مثال: 3/8' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zatiki edo zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como fracción o número.', en: 'The value is correct, but write it as a fraction or a number.', ar: 'القيمة صحيحة، لكن اكتبها كسرًا أو عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zatiki bat edo zenbaki bat: 3/8, 0,375 edo 12.', es: 'No entiendo esa respuesta. Escribe una fracción o un número: 3/8, 0,375 o 12.', en: 'I don\'t understand that answer. Write a fraction or a number: 3/8, 0.375 or 12.', ar: 'لم أفهم هذه الإجابة. اكتب كسرًا أو عددًا: 3/8 أو 0.375 أو 12.' }
    },
    errorByStage: {
        review: { eu: 'Laplace kasu berdin probableekin bakarrik. Bide batean biderkatu, bideen artean batu. Itzuli gabe, izendatzailea jaitsi egiten da.', es: 'Laplace solo con casos igual de probables. En un camino multiplica, entre caminos suma. Sin devolver, el denominador baja.', en: 'Laplace\'s rule only with equally likely cases. Along a path multiply, between paths add. Without replacement, the denominator goes down.', ar: 'لابلاس مع الحالات المتساوية الاحتمال فقط. في المسار اضرب وبين المسارات اجمع. ودون إرجاع ينقص المقام.' },
        events: { eu: 'P(A − B) = P(A) − P(A ∩ B), ez P(A) − P(B). Ukatzean, bildura ebakidura bihurtzen da. Ez A ez B: 1 − P(A ∪ B).', es: 'P(A − B) = P(A) − P(A ∩ B), no P(A) − P(B). Al negar, la unión pasa a intersección. Ni A ni B: 1 − P(A ∪ B).', en: 'P(A − B) = P(A) − P(A ∩ B), not P(A) − P(B). When you negate, the union becomes an intersection. Neither A nor B: 1 − P(A ∪ B).', ar: 'P(A − B) = P(A) − P(A ∩ B) لا P(A) − P(B). عند النفي يصير الاتحاد تقاطعًا. لا A ولا B: 1 − P(A ∪ B).' },
        conditional: { eu: 'P(A/B): zati komuna zati P(B). Independenteak: P(A ∩ B) = P(A) · P(B); bateraezinak: P(A ∩ B) = 0. «… direnen» ehunekoak baldintzatuak dira.', es: 'P(A/B): la parte común entre P(B). Independientes: P(A ∩ B) = P(A) · P(B); incompatibles: P(A ∩ B) = 0. Los porcentajes «de los que…» son condicionadas.', en: 'P(A/B): the common part over P(B). Independent: P(A ∩ B) = P(A) · P(B); mutually exclusive: P(A ∩ B) = 0. Percentages «of those who…» are conditional.', ar: 'P(A/B): الجزء المشترك على P(B). المستقلان: P(A ∩ B) = P(A) · P(B)، والمتنافيان: P(A ∩ B) = 0. ونسب «من الذين…» مشروطة.' },
        bayes: { eu: 'Probabilitate osoa: batu bide guztiak. Bayes: kausaren bidea zati probabilitate osoa. Ez nahastu P(A/B) eta P(B/A).', es: 'Probabilidad total: suma todos los caminos. Bayes: el camino de la causa entre la probabilidad total. No confundas P(A/B) con P(B/A).', en: 'Total probability: add all the paths. Bayes: the path of the cause over the total probability. Do not mix up P(A/B) and P(B/A).', ar: 'الاحتمال الكلي: اجمع كل المسارات. بايز: مسار السبب على الاحتمال الكلي. لا تخلط بين P(A/B) وP(B/A).' }
    }
}

export function ProbabilitateaBatx2zIntroPage() {
    return <UnitPage unit={probabilitateaBatx2zUnit} />
}
