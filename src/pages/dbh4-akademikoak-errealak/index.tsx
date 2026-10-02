import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { withLines } from '../dbh4-aplikatuak-errealak/withLines'
import { percentChallenges, percentDiagnostic, percentExerciseBank, percentPractice } from './content'
import { RealsPercentHeroArt } from './figures'
import { PercentGames } from './games'
import { PERCENT_GAME_RECORDS_KEY, percentGameProgressIds } from './games/info'
import { RealsPercentLaboratory } from './lab'
import { realsPercentLabChallengeIds, realsPercentLabToolForTopic, realsPercentLabTools } from './lab/labTools'
import { realsPercentStages, realsPercentTopics } from './lessons'
import '../dbh4-aplikatuak-errealak/Reals.css'

const errealakEhunekoakUnit: UnitDefinition = {
    storagePrefix: 'matella-errealak-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Zenbaki errealak eta ehunekoak', es: 'Números reales y porcentajes', ar: 'الأعداد الحقيقية والنسب المئوية' },
    documentTitle: { eu: 'Zenbaki errealak eta ehunekoak · 4. DBH', es: 'Números reales y porcentajes · 4.º ESO', ar: 'الأعداد الحقيقية والنسب المئوية · الصف الرابع' },
    tagline: {
        eu: 'Arrazionaletatik errealetara eta ehunekoetara: zatiki sortzailea, irrazionalak zuzenean, tarteak, hurbilketak eta erroreak, ehuneko kateatuak eta interes sinplea eta konposatua.',
        es: 'De los racionales a los reales y los porcentajes: fracción generatriz, irracionales en la recta, intervalos, aproximaciones y errores, porcentajes encadenados e interés simple y compuesto.',
        ar: 'من الأعداد النسبية إلى الحقيقية والنسب المئوية: الكسر المولّد، وغير النسبية على المستقيم، والفترات، والتقريب والأخطاء، والنسب المتسلسلة، والفائدة البسيطة والمركبة.'
    },
    heroArt: <RealsPercentHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, arrazionaletatik interes konposatura', es: 'Cinco etapas, de los racionales al interés compuesto', ar: 'خمس مراحل، من الأعداد النسبية إلى الفائدة المركبة' },
    stages: realsPercentStages,
    topics: realsPercentTopics,
    diagnostic: withLines(percentDiagnostic),
    guidedPractice: withLines(percentPractice),
    exerciseBank: percentExerciseBank.map((section) => ({ ...section, items: withLines(section.items) })),
    challenges: withLines(percentChallenges),
    lab: {
        description: {
            eu: `${realsPercentLabTools.length} tresna: zatikitik hamartarrera, zatiki sortzailea, Pitagorasen eraikitzailea, zuzenean zoom, tarteak, biribiltzea, ehuneko kateatuak eta interesen lasterketa, erronkekin.`,
            es: `${realsPercentLabTools.length} herramientas: de fracción a decimal, fracción generatriz, constructor de Pitágoras, zoom en la recta, intervalos, redondeo, porcentajes encadenados y la carrera de los intereses, con retos.`,
            ar: `${realsPercentLabTools.length} أدوات: من الكسر إلى العشري، والكسر المولّد، وباني فيثاغورس، والتكبير على المستقيم، والفترات، والتقريب، والنسب المتسلسلة، وسباق الفوائد، مع تحديات.`
        },
        progressIds: realsPercentLabChallengeIds,
        toolForTopic: realsPercentLabToolForTopic,
        render: (props) => <RealsPercentLaboratory {...props} />
    },
    games: {
        description: { eu: 'Hiru joko: lasterketa, zenbakiak zuzenean kokatu eta memoria.', es: 'Tres juegos: carrera, situar números en la recta y memoria.', ar: 'ثلاث ألعاب: السباق ووضع الأعداد على المستقيم والذاكرة.' },
        progressIds: percentGameProgressIds,
        recordsKey: PERCENT_GAME_RECORDS_KEY,
        render: (props) => <PercentGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Diruak, zentimoetara.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. El dinero, a los céntimos.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. والمال إلى السنت.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 17,5', es: 'Ej.: 17,5', ar: 'مثال: 17.5' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        rational: { eu: 'Zatiki sortzailea: zifra guztiak ken periodoaren aurrekoak; 9 bat periodoko zifra bakoitzeko eta 0 bat aurreperiodoko bakoitzeko.', es: 'Fracción generatriz: todas las cifras menos las anteriores al periodo; un 9 por cifra del periodo y un 0 por cifra del anteperiodo.', ar: 'الكسر المولّد: كل الأرقام ناقص ما قبل الدور؛ 9 لكل رقم في الدور و0 لكل رقم قبله.' },
        reals: { eu: 'Irrazionala: hamartar infinituak periodorik gabe. √n kokatzeko, idatzi n bi karraturen batura gisa.', es: 'Irracional: infinitos decimales sin periodo. Para situar √n, escribe n como suma de dos cuadrados.', ar: 'غير النسبي: منازل عشرية لا نهائية بلا دور. ولوضع √n اكتب n مجموع مربعين.' },
        approx: { eu: 'Kortxetea: muturra barne; parentesia: kanpo. Biribiltzean, kentzen den lehen zifra 5 edo handiagoa bada, gehitu 1.', es: 'Corchete: el extremo dentro; paréntesis: fuera. Al redondear, si la primera cifra suprimida es 5 o mayor, suma 1.', ar: 'القوس المعقوف: الطرف داخل؛ والعادي: خارج. عند التدوير إذا كان أول رقم محذوف 5 أو أكثر أضف 1.' },
        percent: { eu: 'Erabili indizea: igo % p → bider (1 + p/100); jaitsi → bider (1 − p/100). Kateatuak: biderkatu indizeak. Hasierakoa: zatitu indizeaz.', es: 'Usa el índice: subir un p % → por (1 + p/100); bajar → por (1 − p/100). Encadenados: multiplica los índices. Inicial: divide entre el índice.', ar: 'استعمل المؤشر: الزيادة p % ← الضرب في (1 + p/100)؛ النقصان ← في (1 − p/100). المتسلسلة: اضرب المؤشرات. الأولية: اقسم على المؤشر.' },
        interest: { eu: 'Sinplea: I = C · r · t / 100, t urtetan. Konposatua: Cf = Ci · (1 + r/100)ᵗ, zentimoetara.', es: 'Simple: I = C · r · t / 100, con t en años. Compuesto: Cf = Ci · (1 + r/100)ᵗ, a los céntimos.', ar: 'البسيطة: I = C · r · t / 100 وt بالأعوام. المركبة: Cf = Ci · (1 + r/100)ᵗ إلى السنت.' }
    }
}

export function ErrealakDBH4AkPage() {
    return <UnitPage unit={errealakEhunekoakUnit} />
}
