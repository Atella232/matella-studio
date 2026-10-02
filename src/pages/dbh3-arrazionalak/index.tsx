import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { rationalsChallenges, rationalsDiagnostic, rationalsExerciseBank, rationalsPractice } from './content'
import { RationalsHeroArt } from './figures'
import { RationalsLaboratory } from './lab'
import { rationalsLabChallengeIds, rationalsLabToolForTopic, rationalsLabTools } from './lab/labTools'
import { rationalsStages, rationalsTopics } from './lessons'
import '../dbh4-aplikatuak-errealak/Reals.css'
import './Rationals.css'

const arrazionalakUnit: UnitDefinition = {
    storagePrefix: 'matella-arrazionalak-dbh3',
    coursePath: '/matematika/dbh3',
    courseTitle: { eu: '3. DBH', es: '3.º ESO', ar: 'الصف الثالث' },
    title: { eu: 'Zenbaki arrazionalak', es: 'Números racionales', ar: 'الأعداد النسبية' },
    documentTitle: { eu: 'Zenbaki arrazionalak · 3. DBH', es: 'Números racionales · 3.º ESO', ar: 'الأعداد النسبية · الصف الثالث' },
    tagline: {
        eu: 'Zatikietatik zenbaki arrazionaletara: baliokidetasuna, ordena eta zuzena, eragiketa konbinatuak, adierazpen hamartarra eta zatiki sortzailea, eta problemak.',
        es: 'De las fracciones a los números racionales: equivalencia, orden y recta, operaciones combinadas, expresión decimal y fracción generatriz, y problemas.',
        ar: 'من الكسور إلى الأعداد النسبية: التكافؤ، والترتيب والمستقيم، والعمليات المركبة، والصورة العشرية والكسر المولّد، والمسائل.'
    },
    heroArt: <RationalsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, baliokidetasunetik problemetara', es: 'Cinco etapas, de la equivalencia a los problemas', ar: 'خمس مراحل، من التكافؤ إلى المسائل' },
    stages: rationalsStages,
    topics: rationalsTopics,
    diagnostic: rationalsDiagnostic,
    guidedPractice: rationalsPractice,
    exerciseBank: rationalsExerciseBank,
    challenges: rationalsChallenges,
    lab: {
        description: {
            eu: `${rationalsLabTools.length} tresna: baliokidetasuna, zuzena, konparatu, batu eta kendu, biderkatu eta zatitu, eragiketen ordena, zatikitik hamartarrera eta zatiki sortzailea, erronkekin.`,
            es: `${rationalsLabTools.length} herramientas: equivalencia, recta, comparar, sumar y restar, multiplicar y dividir, orden de las operaciones, de fracción a decimal y fracción generatriz, con retos.`,
            ar: `${rationalsLabTools.length} أدوات: التكافؤ والمستقيم والمقارنة والجمع والطرح والضرب والقسمة وترتيب العمليات ومن الكسر إلى العشري والكسر المولّد، مع تحديات.`
        },
        progressIds: rationalsLabChallengeIds,
        toolForTopic: rationalsLabToolForTopic,
        render: (props) => <RationalsLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat edo zatiki bat: 5, −3, 1,5 edo −7/2. "Laburtezina" eskatzen bada, sinplifikatu.', es: 'Escribe un número o una fracción: 5, −3, 1,5 o −7/2. Si se pide "irreducible", simplifica.', ar: 'اكتب عددًا أو كسرًا: 5 أو ⁦−3⁩ أو 1.5 أو ⁦−7/2⁩. وإذا طُلب "غير قابل للاختزال" فبسّط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −7/2', es: 'Ej.: −7/2', ar: 'مثال: ⁦−7/2⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina oraindik sinplifika daiteke. Idatzi zatiki laburtezina.', es: 'El valor es correcto, pero todavía se puede simplificar. Escribe la fracción irreducible.', ar: 'القيمة صحيحة، لكن يمكن اختزالها أكثر. اكتب الكسر غير القابل للاختزال.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número o una fracción, por ejemplo −3, 2,5 o 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        fractions: { eu: 'Baliokideak dira gurutzeko biderkadurak berdinak badira. Sinplifikatzeko, zatitu bi gaiak z.k.h.-z.', es: 'Son equivalentes si los productos cruzados son iguales. Para simplificar, divide los dos términos entre el m.c.d.', ar: 'يتكافأ الكسران إذا تساوى الضربان التبادليان. وللاختزال اقسم الحدين على ق.م.أ.' },
        order: { eu: 'Jarri izendatzaile komuna eta konparatu zenbakitzaileak. Negatiboetan, balio absolutu handiena duena da txikiena.', es: 'Pon denominador común y compara los numeradores. En los negativos, la de mayor valor absoluto es la menor.', ar: 'وحّد المقامات وقارن البسوط. وفي السالبة صاحب القيمة المطلقة الأكبر هو الأصغر.' },
        operations: { eu: 'Hierarkia: parentesiak, biderketak eta zatiketak, batuketak eta kenketak. Zatitzeko, gurutzean biderkatu.', es: 'Jerarquía: paréntesis, multiplicaciones y divisiones, sumas y restas. Para dividir, multiplica en cruz.', ar: 'الأولويات: الأقواس ثم الضرب والقسمة ثم الجمع والطرح. وللقسمة اضرب تبادليًا.' },
        decimals: { eu: 'Zatiki sortzailea: zifra guztiak ken periodoaren aurrekoak; 9 bat periodoko zifra bakoitzeko eta 0 bat aurreperiodoko bakoitzeko.', es: 'Fracción generatriz: todas las cifras menos las anteriores al periodo; un 9 por cifra del periodo y un 0 por cifra del anteperiodo.', ar: 'الكسر المولّد: كل الأرقام ناقص ما قبل الدور؛ 9 لكل رقم في الدور و0 لكل رقم قبله.' },
        problems: { eu: '"-ren" zatikia: biderkatu. "Gainerakoaren" zatikia: biderkatu geratzen den zatiaz. Osoa: zatitu zatikiaz.', es: 'Fracción "de": multiplica. Fracción "de lo que queda": multiplica por la parte que queda. El total: divide entre la fracción.', ar: 'كسر "من": اضرب. كسر "من الباقي": اضرب في الجزء الباقي. الكل: اقسم على الكسر.' }
    }
}

export function ArrazionalakDBH3Page() {
    return <UnitPage unit={arrazionalakUnit} />
}
