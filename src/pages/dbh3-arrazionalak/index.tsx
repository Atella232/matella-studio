import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { rationalsChallenges, rationalsDiagnostic, rationalsExerciseBank, rationalsPractice } from './content'
import { RationalsHeroArt } from './figures'
import { RationalsGames } from './games'
import { RATIONALS_GAME_RECORDS_KEY, rationalsGameProgressIds } from './games/info'
import { RationalsLaboratory } from './lab'
import { rationalsLabChallengeIds, rationalsLabToolForTopic, rationalsLabTools } from './lab/labTools'
import { rationalsStages, rationalsTopics } from './lessons'
import '../dbh4-aplikatuak-errealak/Reals.css'
import './Rationals.css'

const arrazionalakUnit: UnitDefinition = {
    storagePrefix: 'matella-arrazionalak-dbh3',
    coursePath: '/matematika/dbh3',
    courseTitle: { eu: '3. DBH', es: '3.º ESO', en: '3rd ESO', ar: 'الصف الثالث' },
    title: { eu: 'Zenbaki arrazionalak', es: 'Números racionales', en: 'Rational numbers', ar: 'الأعداد النسبية' },
    documentTitle: { eu: 'Zenbaki arrazionalak · 3. DBH', es: 'Números racionales · 3.º ESO', en: 'Rational numbers · 3rd ESO', ar: 'الأعداد النسبية · الصف الثالث' },
    tagline: {
        eu: 'Zatikietatik zenbaki arrazionaletara: baliokidetasuna, ordena eta zuzena, eragiketa konbinatuak, adierazpen hamartarra eta zatiki sortzailea, eta problemak.',
        es: 'De las fracciones a los números racionales: equivalencia, orden y recta, operaciones combinadas, expresión decimal y fracción generatriz, y problemas.',
        en: 'From fractions to rational numbers: equivalence, order and the number line, combined operations, decimal form and generating fraction, and problems.',
        ar: 'من الكسور إلى الأعداد النسبية: التكافؤ، والترتيب والمستقيم، والعمليات المركبة، والصورة العشرية والكسر المولّد، والمسائل.'
    },
    heroArt: <RationalsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, baliokidetasunetik problemetara', es: 'Cinco etapas, de la equivalencia a los problemas', en: 'Five stages, from equivalence to problems', ar: 'خمس مراحل، من التكافؤ إلى المسائل' },
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
            en: `${rationalsLabTools.length} tools: equivalence, number line, comparing, adding and subtracting, multiplying and dividing, order of operations, from fraction to decimal and generating fraction, with challenges.`,
            ar: `${rationalsLabTools.length} أدوات: التكافؤ والمستقيم والمقارنة والجمع والطرح والضرب والقسمة وترتيب العمليات ومن الكسر إلى العشري والكسر المولّد، مع تحديات.`
        },
        progressIds: rationalsLabChallengeIds,
        toolForTopic: rationalsLabToolForTopic,
        render: (props) => <RationalsLaboratory {...props} />
    },
    games: {
        description: { eu: 'Hiru joko: lasterketa, zatikiak zuzenean kokatu eta memoria.', es: 'Tres juegos: carrera, situar fracciones en la recta y memoria.', en: 'Three games: race, placing fractions on the number line and memory.', ar: 'ثلاث ألعاب: السباق ووضع الكسور على المستقيم والذاكرة.' },
        progressIds: rationalsGameProgressIds,
        recordsKey: RATIONALS_GAME_RECORDS_KEY,
        render: (props) => <RationalsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat edo zatiki bat: 5, −3, 1,5 edo −7/2. "Laburtezina" eskatzen bada, sinplifikatu.', es: 'Escribe un número o una fracción: 5, −3, 1,5 o −7/2. Si se pide "irreducible", simplifica.', en: 'Write a number or a fraction: 5, −3, 1.5 or −7/2. If it asks for "simplest form", simplify.', ar: 'اكتب عددًا أو كسرًا: 5 أو ⁦−3⁩ أو 1.5 أو ⁦−7/2⁩. وإذا طُلب "غير قابل للاختزال" فبسّط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −7/2', es: 'Ej.: −7/2', en: 'Example: −7/2', ar: 'مثال: ⁦−7/2⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina oraindik sinplifika daiteke. Idatzi zatiki laburtezina.', es: 'El valor es correcto, pero todavía se puede simplificar. Escribe la fracción irreducible.', en: 'The value is correct, but it can still be simplified. Write the fraction in its simplest form.', ar: 'القيمة صحيحة، لكن يمكن اختزالها أكثر. اكتب الكسر غير القابل للاختزال.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número o una fracción, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number or a fraction, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        fractions: { eu: 'Baliokideak dira gurutzeko biderkadurak berdinak badira. Sinplifikatzeko, zatitu bi gaiak z.k.h.-z.', es: 'Son equivalentes si los productos cruzados son iguales. Para simplificar, divide los dos términos entre el m.c.d.', en: 'They are equivalent if the cross products are equal. To simplify, divide both terms by the GCD.', ar: 'يتكافأ الكسران إذا تساوى الضربان التبادليان. وللاختزال اقسم الحدين على ق.م.أ.' },
        order: { eu: 'Jarri izendatzaile komuna eta konparatu zenbakitzaileak. Negatiboetan, balio absolutu handiena duena da txikiena.', es: 'Pon denominador común y compara los numeradores. En los negativos, la de mayor valor absoluto es la menor.', en: 'Use a common denominator and compare the numerators. For negatives, the one with the greater absolute value is the smaller.', ar: 'وحّد المقامات وقارن البسوط. وفي السالبة صاحب القيمة المطلقة الأكبر هو الأصغر.' },
        operations: { eu: 'Hierarkia: parentesiak, biderketak eta zatiketak, batuketak eta kenketak. Zatitzeko, gurutzean biderkatu.', es: 'Jerarquía: paréntesis, multiplicaciones y divisiones, sumas y restas. Para dividir, multiplica en cruz.', en: 'Order of operations: brackets, multiplications and divisions, additions and subtractions. To divide, cross-multiply.', ar: 'الأولويات: الأقواس ثم الضرب والقسمة ثم الجمع والطرح. وللقسمة اضرب تبادليًا.' },
        decimals: { eu: 'Zatiki sortzailea: zifra guztiak ken periodoaren aurrekoak; 9 bat periodoko zifra bakoitzeko eta 0 bat aurreperiodoko bakoitzeko.', es: 'Fracción generatriz: todas las cifras menos las anteriores al periodo; un 9 por cifra del periodo y un 0 por cifra del anteperiodo.', en: 'Generating fraction: all the digits except the ones before the repeating part; a 9 for each digit of the repeating part and a 0 for each digit of the non-repeating part.', ar: 'الكسر المولّد: كل الأرقام ناقص ما قبل الدور؛ 9 لكل رقم في الدور و0 لكل رقم قبله.' },
        problems: { eu: '"-ren" zatikia: biderkatu. "Gainerakoaren" zatikia: biderkatu geratzen den zatiaz. Osoa: zatitu zatikiaz.', es: 'Fracción "de": multiplica. Fracción "de lo que queda": multiplica por la parte que queda. El total: divide entre la fracción.', en: 'Fraction "of": multiply. Fraction "of what is left": multiply by the part that is left. The total: divide by the fraction.', ar: 'كسر "من": اضرب. كسر "من الباقي": اضرب في الجزء الباقي. الكل: اقسم على الكسر.' }
    }
}

export function ArrazionalakDBH3Page() {
    return <UnitPage unit={arrazionalakUnit} />
}
