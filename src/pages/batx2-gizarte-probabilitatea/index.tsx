import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { probabilityBatx2gChallenges, probabilityBatx2gDiagnostic, probabilityBatx2gExerciseBank, probabilityBatx2gPractice } from './content'
import { ProbabilityBatx2gHeroArt } from './figures'
import { ProbabilityBatx2gLaboratory } from './lab'
import { probabilityBatx2gLabChallengeIds, probabilityBatx2gLabToolForTopic, probabilityBatx2gLabTools } from './lab/labTools'
import { probabilityBatx2gStages, probabilityBatx2gTopics } from './lessons'

const probabilitateaBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-probabilitatea-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمالات' },
    documentTitle: { eu: 'Probabilitatea · Batxilergoa 2 · Gizarte', es: 'Probabilidad · 2.º Bachillerato · Sociales', en: 'Probability · 2nd Bachillerato · Social Sciences', ar: 'الاحتمالات · البكالوريا الثانية · اجتماعية' },
    tagline: {
        eu: 'Zenbatzen ikasi (aldakuntzak, permutazioak eta konbinazioak), gertaerak eta Laplace, inkesten taulak eta probabilitate baldintzatua, independentzia, probabilitate osoa eta Bayes, gizarteko adibideekin: inkestak, dendak, osasuna eta garraioa.',
        es: 'Aprender a contar (variaciones, permutaciones y combinaciones), sucesos y Laplace, tablas de encuestas y probabilidad condicionada, independencia, probabilidad total y Bayes, con ejemplos de la sociedad: encuestas, tiendas, salud y transporte.',
        en: 'Learning to count (arrangements, permutations and combinations), events and Laplace, poll tables and conditional probability, independence, total probability and Bayes, with examples from society: polls, shops, health and transport.',
        ar: 'تعلّم العدّ (التراتيب والتباديل والتوافيق)، والأحداث ولابلاس، وجداول الاستطلاعات والاحتمال المشروط، والاستقلال، والاحتمال الكلي وبايز، مع أمثلة من المجتمع: الاستطلاعات والمتاجر والصحة والنقل.'
    },
    heroArt: <ProbabilityBatx2gHeroArt />,
    pathSubtitle: { eu: 'Lau etapa, zenbatzetik Bayesera', es: 'Cuatro etapas, de contar a Bayes', en: 'Four stages, from counting to Bayes', ar: 'أربع مراحل، من العدّ إلى بايز' },
    stages: probabilityBatx2gStages,
    topics: probabilityBatx2gTopics,
    diagnostic: probabilityBatx2gDiagnostic,
    guidedPractice: probabilityBatx2gPractice,
    exerciseBank: probabilityBatx2gExerciseBank,
    challenges: probabilityBatx2gChallenges,
    lab: {
        description: {
            eu: `${probabilityBatx2gLabTools.length} tresna, erronkekin: inkesta eta hodien zuhaitza, berriak; 4. DBHko laukiak, n-tik k aukeratzea eta batera ateratzea; eta Zientzietako lau zonak, probabilitatearen karratua, kausak eta 10\u00a0000 pertsona.`,
            es: `${probabilityBatx2gLabTools.length} herramientas con retos: la encuesta y el árbol de tuberías, nuevas; las casillas, elegir k de n y sacar varias a la vez de 4.º ESO; y las cuatro zonas, el cuadrado de probabilidad, las causas y las 10\u00a0000 personas de Ciencias.`,
            en: `${probabilityBatx2gLabTools.length} tools with challenges: the poll and the tree of pipes, new; the slots, choosing k of n and drawing several at once from 4th ESO; and the four zones, the probability square, the causes and the 10,000 people from Sciences.`,
            ar: `${probabilityBatx2gLabTools.length} أدوات مع تحديات: الاستطلاع وشجرة الأنابيب، وهما جديدتان؛ والخانات واختيار k من n والسحب دفعة واحدة من الصف الرابع؛ والمناطق الأربع ومربع الاحتمال والأسباب و\u206610\u00a0000\u2069 شخص من العلوم.`
        },
        progressIds: probabilityBatx2gLabChallengeIds,
        toolForTopic: probabilityBatx2gLabToolForTopic,
        render: (props) => <ProbabilityBatx2gLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki zehatz bat edo zatiki bat: 0,25, 3/7 edo 120.', es: 'Escribe un número exacto o una fracción: 0,25, 3/7 o 120.', en: 'Write an exact number or a fraction: 0.25, 3/7 or 120.', ar: 'اكتب عددًا مضبوطًا أو كسرًا: 0.25 أو 3/7 أو 120.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 0,25', es: 'Ej.: 0,25', en: 'e.g. 0.25', ar: 'مثال: 0.25' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki edo zatiki gisa.', es: 'El valor es correcto, pero escríbelo como número o fracción.', en: 'The value is correct, but write it as a number or a fraction.', ar: 'القيمة صحيحة، لكن اكتبها عددًا أو كسرًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat: 0,25, 3/7 edo 120.', es: 'No entiendo esa respuesta. Escribe un número o una fracción: 0,25, 3/7 o 120.', en: 'I don\'t understand that answer. Write a number or a fraction: 0.25, 3/7 or 120.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا: 0.25 أو 3/7 أو 120.' }
    },
    errorByStage: {
        counting: { eu: 'Galdetu: ordenak axola du? Errepika daiteke? Ordenarik gabe, zati k!.', es: 'Pregúntate: ¿importa el orden? ¿Se puede repetir? Sin orden, divide entre k!.', en: 'Ask yourself: does the order matter? Can things repeat? With no order, divide by k!.', ar: 'اسأل: هل يهم الترتيب؟ هل يجوز التكرار؟ دون ترتيب اقسم على k!.' },
        events: { eu: 'Bateragarriak badira, kendu ebakidura. «Bat ere ez» bilduraren aurkakoa da.', es: 'Si son compatibles, resta la intersección. «Ninguno» es el contrario de la unión.', en: 'If they are compatible, take away the intersection. ‘Neither’ is the complement of the union.', ar: 'إذا كانا متوافقين فاطرح التقاطع. «لا شيء» هو معاكس الاتحاد.' },
        conditional: { eu: 'Baldintza osoko berria da: zatitu haren probabilitateaz. Itzuli gabe, bigarren adarra aldatzen da.', es: 'La condición es el nuevo total: divide entre su probabilidad. Sin devolución, la segunda rama cambia.', en: 'The condition is the new total: divide by its probability. Without replacement, the second branch changes.', ar: 'الشرط هو الكل الجديد: اقسم على احتماله. ودون إرجاع يتغيّر الفرع الثاني.' },
        bayes: { eu: 'Osoa: bide guztiak batu. Bayes: bide bat zati osoa. Ez nahastu P(D/A) eta P(A/D).', es: 'Total: suma todos los caminos. Bayes: un camino entre el total. No confundas P(D/A) con P(A/D).', en: 'Total: add all the paths. Bayes: one path over the total. Do not mix up P(D/A) and P(A/D).', ar: 'الكلي: اجمع كل المسارات. بايز: مسار على الكلي. لا تخلط بين P(D/A) وP(A/D).' }
    }
}

export function ProbabilitateaBatx2gIntroPage() {
    return <UnitPage unit={probabilitateaBatx2gUnit} />
}
