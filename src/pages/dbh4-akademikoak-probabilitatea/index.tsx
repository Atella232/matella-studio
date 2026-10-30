import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { probabilityAkChallenges, probabilityAkDiagnostic, probabilityAkExerciseBank, probabilityAkPractice } from './content'
import { ProbabilityAkHeroArt } from './figures'
import { ProbabilityAkGames } from './games'
import { PROBABILITY_AK_GAME_RECORDS_KEY, probabilityAkGameProgressIds } from './games/info'
import { ProbabilityAkLaboratory } from './lab'
import { probabilityAkLabChallengeIds, probabilityAkLabToolForTopic, probabilityAkLabTools } from './lab/labTools'
import { probabilityAkStages, probabilityAkTopics } from './lessons'

const probabilitateaUnit: UnitDefinition = {
    storagePrefix: 'matella-probabilitatea-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', en: '4th ESO · Academic', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمالات' },
    documentTitle: { eu: 'Probabilitatea · 4. DBH', es: 'Probabilidad · 4.º ESO', en: 'Probability · 4th ESO', ar: 'الاحتمالات · الصف الرابع' },
    tagline: {
        eu: 'Gertaerak eta haien eragiketak, maiztasun erlatiboa eta Laplaceren erregela, esperientzia konposatuak eta zuhaitzak, kontingentzia-taulak, probabilitate baldintzatua eta osoa, konbinatoria eta joko bidezkoak.',
        es: 'Sucesos y sus operaciones, frecuencia relativa y regla de Laplace, experiencias compuestas y árboles, tablas de contingencia, probabilidad condicionada y total, combinatoria y juegos equitativos.',
        en: 'Events and their operations, relative frequency and Laplace\'s rule, compound experiments and tree diagrams, contingency tables, conditional and total probability, combinatorics and fair games.',
        ar: 'الأحداث وعملياتها، والتكرار النسبي وقاعدة لابلاس، والتجارب المركّبة والأشجار، وجداول التوافق، والاحتمال المشروط والكلي، والتوافيق والألعاب العادلة.'
    },
    heroArt: <ProbabilityAkHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, gertaeretik joko bidezkoetara', es: 'Cinco etapas, del suceso al juego equitativo', en: 'Five stages, from the event to the fair game', ar: 'خمس مراحل، من الحدث إلى اللعبة العادلة' },
    stages: probabilityAkStages,
    topics: probabilityAkTopics,
    diagnostic: probabilityAkDiagnostic,
    guidedPractice: probabilityAkPractice,
    exerciseBank: probabilityAkExerciseBank,
    challenges: probabilityAkChallenges,
    lab: {
        description: {
            eu: `${probabilityAkLabTools.length} tresna, erronkekin: gertaeren bildura, milaka jaurtiketa, bi dadoren taula, gutxienez behin, kutxa bateko bi atera, kontingentzia-taula, kutxa aukeratzen duen dadoa, batera ateratzea, hiru dado eta joko bidezkoa.`,
            es: `${probabilityAkLabTools.length} herramientas con retos: la unión de sucesos, miles de lanzamientos, la tabla de dos dados, al menos una vez, dos extracciones de una urna, la tabla de contingencia, el dado que elige la urna, sacar varias a la vez, tres dados y el juego equitativo.`,
            en: `${probabilityAkLabTools.length} tools with challenges: the union of events, thousands of rolls, the two-dice table, at least once, two draws from an urn, the contingency table, the die that chooses the urn, drawing several at once, three dice and the fair game.`,
            ar: `${probabilityAkLabTools.length} أدوات مع تحديات: اتحاد الأحداث، وآلاف الرميات، وجدول نردين، ومرة واحدة على الأقل، وسحبتان من جرّة، وجدول التوافق، والنرد الذي يختار الجرّة، والسحب معًا، وثلاثة نرود، واللعبة العادلة.`
        },
        progressIds: probabilityAkLabChallengeIds,
        toolForTopic: probabilityAkLabToolForTopic,
        render: (props) => <ProbabilityAkLaboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', en: 'Two games to train speed and accuracy: race and memory.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: probabilityAkGameProgressIds,
        recordsKey: PROBABILITY_AK_GAME_RECORDS_KEY,
        render: (props) => <ProbabilityAkGames {...props} />
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
        events: { eu: 'Bildura: «edo», ebakidura: «eta», aurkakoa: «ez». Bateragarriak: emaitza komunen bat dute.', es: 'Unión: «o»; intersección: «y»; contrario: «no». Compatibles: tienen algún resultado común.', en: 'Union: ‘or’; intersection: ‘and’; complement: ‘not’. Compatible: they share some outcome.', ar: 'الاتحاد: «أو»، التقاطع: «و»، المعاكس: «لا». المتوافقان يشتركان في نتيجة.' },
        probability: { eu: 'Laplace kasu ekiprobableekin bakarrik. P(Ā) = 1 − P(A). Bateragarriak: kendu ebakidura behin.', es: 'Laplace solo con casos equiprobables. P(Ā) = 1 − P(A). Compatibles: resta una vez la intersección.', en: 'Laplace\'s rule only works with equally likely cases. P(Ā) = 1 − P(A). Compatible: subtract the intersection once.', ar: 'لابلاس مع الحالات المتساوية الاحتمال فقط. P(Ā) = 1 − P(A). المتوافقان: اطرح التقاطع مرة.' },
        compound: { eu: 'Bide batean biderkatu, bideen artean batu. Itzuli gabe, izendatzailea jaitsi egiten da.', es: 'En un camino multiplica, entre caminos suma. Sin devolver, el denominador baja.', en: 'Along a branch, multiply; between branches, add. Without replacement, the denominator goes down.', ar: 'في المسار اضرب وبين المسارات اجمع. ودون إرجاع ينقص المقام.' },
        conditional: { eu: 'P(A/B): kasu posibleak B-renak bakarrik. Probabilitate osoa: batu emaitzara daramaten bide guztiak.', es: 'P(A/B): los casos posibles son solo los de B. Probabilidad total: suma todos los caminos al resultado.', en: 'P(A/B): the possible cases are only those of B. Total probability: add all the branches that lead to the outcome.', ar: 'P(A/B): الحالات الممكنة هي حالات B فقط. الاحتمال الكلي: اجمع كل المسارات إلى النتيجة.' },
        counting: { eu: 'Aldekoak eta posibleak irizpide berarekin zenbatu. Itxaropena: irabazia bider probabilitatea, batuta.', es: 'Cuenta favorables y posibles con el mismo criterio. Esperanza: suma de ganancia por probabilidad.', en: 'Count the favourable and possible outcomes using the same method. Expected value: add up each gain times its probability.', ar: 'عُدّ الملائمة والممكنة بالمعيار نفسه. الأمل: مجموع الربح في الاحتمال.' }
    }
}

export function ProbabilitateaDbh4AkIntroPage() {
    return <UnitPage unit={probabilitateaUnit} />
}
