import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { RealsHeroArt } from '../dbh4-aplikatuak-errealak/figures'
import { powersChallenges, powersDiagnostic, powersExerciseBank, powersPractice } from './content'
import { PowersGames } from './games'
import { POWERS_GAME_RECORDS_KEY, powersGameProgressIds } from './games/info'
import { PowersLaboratory } from './lab'
import { powersLabChallengeIds, powersLabToolForTopic, powersLabTools } from './lab/labTools'
import { powersStages, powersTopics } from './lessons'
import '../dbh4-aplikatuak-errealak/Reals.css'

const berreturakUnit: UnitDefinition = {
    storagePrefix: 'matella-berreturak-dbh3',
    coursePath: '/matematika/dbh3',
    courseTitle: { eu: '3. DBH', es: '3.º ESO', en: '3rd ESO', ar: 'الصف الثالث' },
    title: { eu: 'Berreturak eta erroak', es: 'Potencias y raíces', en: 'Powers and roots', ar: 'القوى والجذور' },
    documentTitle: { eu: 'Berreturak eta erroak · 3. DBH', es: 'Potencias y raíces · 3.º ESO', en: 'Powers and roots · 3rd ESO', ar: 'القوى والجذور · الصف الثالث' },
    tagline: {
        eu: 'Berretzaile osoko berreturetatik zenbaki errealetara: idazkera zientifikoa, erroak eta erradikalak, irrazionalak eta tarteak, hurbilketak eta errorea.',
        es: 'De las potencias de exponente entero a los números reales: notación científica, raíces y radicales, irracionales e intervalos, aproximaciones y error.',
        en: 'From powers with integer exponents to real numbers: scientific notation, roots and radicals, irrational numbers and intervals, approximations and error.',
        ar: 'من القوى ذات الأس الصحيح إلى الأعداد الحقيقية: الترميز العلمي، والجذور والجذريات، وغير النسبية والفترات، والتقريب والخطأ.'
    },
    heroArt: <RealsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, berreturetatik errorera', es: 'Cinco etapas, de las potencias al error', en: 'Five stages, from powers to error.', ar: 'خمس مراحل، من القوى إلى الخطأ' },
    stages: powersStages,
    topics: powersTopics,
    diagnostic: powersDiagnostic,
    guidedPractice: powersPractice,
    exerciseBank: powersExerciseBank,
    challenges: powersChallenges,
    lab: {
        description: {
            eu: `${powersLabTools.length} tresna: faktore-fitxak, erroaren karratua, magnitude-eskala, erroen espirala, berreturen eskailera, komaren jauziak, tarteak eta biribiltzea, erronkekin.`,
            es: `${powersLabTools.length} herramientas: fichas de factores, el cuadrado de la raíz, la escala de magnitudes, la espiral de raíces, la escalera de potencias, los saltos de la coma, intervalos y redondeo, con retos.`,
            en: `${powersLabTools.length} tools: factor cards, the square of the root, the magnitude scale, the root spiral, the power staircase, the decimal point jumps, intervals and rounding, with challenges.`,
            ar: `${powersLabTools.length} أدوات: رقاقات العوامل ومربع الجذر وسُلّم المقادير وحلزون الجذور وسُلّم القوى وقفزات الفاصلة والفترات والتقريب، مع تحديات.`
        },
        progressIds: powersLabChallengeIds,
        toolForTopic: powersLabToolForTopic,
        render: (props) => <PowersLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Sei joko: lasterketa, eskala kosmikoa, atera errotik, zubiaren zaindaria, berreturen detektibea eta memoria.',
            es: 'Seis juegos: carrera, escala cósmica, saca de la raíz, el guardián del puente, detective de potencias y memoria.',
            en: 'Six games: race, cosmic scale, take out of the root, the bridge guardian, powers detective and memory.',
            ar: 'ست ألعاب: السباق والسُّلّم الكوني وأخرِج من الجذر وحارس الجسر ومخبر القوى والذاكرة.'
        },
        progressIds: powersGameProgressIds,
        recordsKey: POWERS_GAME_RECORDS_KEY,
        render: (props) => <PowersGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat edo zatiki bat: 5, −3, 1,5 edo 9/25. Emaitza erradikal edo 10en berretura bat bada, eskatzen den zenbakia bakarrik.', es: 'Escribe un número o una fracción: 5, −3, 1,5 o 9/25. Si el resultado es un radical o una potencia de 10, solo el número que se pide.', en: 'Write a number or a fraction: 5, −3, 1.5 or 9/25. If the answer is a radical or a power of 10, write only the number that is asked for.', ar: 'اكتب عددًا أو كسرًا: 5 أو ⁦−3⁩ أو 1.5 أو 9/25. وإذا كانت النتيجة جذرًا أو قوة للعدد 10 فاكتب العدد المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 9/25', es: 'Ej.: 9/25', en: 'e.g. 9/25', ar: 'مثال: 9/25' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        powers: { eu: 'Berretzaile negatiboa: alderantzizkoa. Oinarri negatiboa: bikoitia positibo, bakoitia negatibo. Oinarri bera: biderkatzean batu, zatitzean kendu.', es: 'Exponente negativo: el inverso. Base negativa: par positivo, impar negativo. Misma base: al multiplicar suma, al dividir resta.', en: 'Negative exponent: the reciprocal. Negative base: an even exponent gives a positive result, an odd one a negative result. Same base: when multiplying, add the exponents; when dividing, subtract them.', ar: 'الأس السالب: المقلوب. الأساس السالب: الزوجي موجب والفردي سالب. الأساس نفسه: في الضرب اجمع وفي القسمة اطرح.' },
        scientific: { eu: 'a · 10ⁿ, 1 ≤ a < 10. Handia: berretzaile positiboa; txikia: negatiboa. Biderkatzean berretzaileak batu, zatitzean kendu; batzeko, berretzaile bera.', es: 'a · 10ⁿ, 1 ≤ a < 10. Grande: exponente positivo; pequeño: negativo. Al multiplicar suma los exponentes, al dividir resta; para sumar, el mismo exponente.', en: 'a · 10ⁿ, 1 ≤ a < 10. Large numbers: positive exponent; small: negative. When multiplying, add the exponents; when dividing, subtract them. To add, use the same exponent.', ar: 'a · 10ⁿ مع 1 ≤ a < 10. الكبير: أس موجب والصغير: سالب. في الضرب اجمع الأسس وفي القسمة اطرح؛ وللجمع الأس نفسه.' },
        roots: { eu: 'Faktorizatu eta atera bikoteak. Antzekoak bakarrik batzen dira. Erroak ez dira errokizunak batuz batzen.', es: 'Factoriza y saca los pares. Solo se suman los semejantes. Las raíces no se suman sumando los radicandos.', en: 'Factorise and take out the pairs. Only like radicals can be added. Roots are not added by adding their radicands.', ar: 'حلّل وأخرج الأزواج. لا تُجمع إلا المتشابهة. ولا تُجمع الجذور بجمع ما تحتها.' },
        reals: { eu: 'Arrazionala: zatiki bat, hamartar zehatza edo periodikoa. Irrazionala: infinitua eta periodorik gabea. Kortxetea: muturra sartzen da.', es: 'Racional: una fracción, decimal exacto o periódico. Irracional: infinitas cifras sin periodo. Corchete: el extremo entra.', en: 'Rational: a fraction, terminating or recurring decimal. Irrational: infinitely many digits, with no repeating pattern. Square bracket: the endpoint is included.', ar: 'النسبي: كسر، عشري صحيح أو دوري. غير النسبي: أرقام لا نهائية بلا دور. القوس المربع: الطرف داخل.' },
        approx: { eu: 'Trunkatu: moztu. Biribildu: kendutako lehen zifra 5 edo handiagoa bada, gehitu 1. Errore erlatiboa: absolutua zatitu zehatzaz.', es: 'Truncar: cortar. Redondear: si la primera cifra suprimida es 5 o mayor, suma 1. Error relativo: el absoluto entre el exacto.', en: 'Truncate: cut off. Round: if the first digit removed is 5 or more, add 1. Relative error: the absolute error divided by the exact value.', ar: 'البتر: قطع. التقريب: إذا كان أول رقم محذوف 5 أو أكبر أضف 1. الخطأ النسبي: المطلق على الصحيح.' }
    }
}

export function BerreturakDBH3Page() {
    return <UnitPage unit={berreturakUnit} />
}
