import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { realsChallenges, realsDiagnostic, realsExerciseBank, realsPractice } from './content'
import { RealsHeroArt } from './figures'
import { RealsGames } from './games'
import { REALS_GAME_RECORDS_KEY, realsGameProgressIds } from './games/info'
import { RealsLaboratory } from './lab'
import { realsLabChallengeIds, realsLabToolForTopic, realsLabTools } from './lab/labTools'
import { realsStages, realsTopics } from './lessons'
import { withLines } from './withLines'
import './Reals.css'

const errealakUnit: UnitDefinition = {
    storagePrefix: 'matella-errealak-dbh4ap',
    coursePath: '/matematika/dbh4-aplikatuak',
    courseTitle: { eu: '4. DBH · Aplikatuak', es: '4.º ESO · Aplicadas', ar: 'الصف الرابع · التطبيقية' },
    title: { eu: 'Zenbaki errealak', es: 'Números reales', ar: 'الأعداد الحقيقية' },
    documentTitle: { eu: 'Zenbaki errealak · 4. DBH', es: 'Números reales · 4.º ESO', ar: 'الأعداد الحقيقية · الصف الرابع' },
    tagline: {
        eu: 'Zatikietatik zuzen errealera: hamartar periodikoak eta haien zatikia, irrazionalak, tarteak, hurbilketak eta erroreak, idazkera zientifikoa eta erradikalak.',
        es: 'De las fracciones a la recta real: decimales periódicos y su fracción, irracionales, intervalos, aproximaciones y errores, notación científica y radicales.',
        ar: 'من الكسور إلى المستقيم الحقيقي: الأعداد العشرية الدورية وكسرها، غير النسبية، الفترات، التقريب والأخطاء، الترميز العلمي والجذريات.'
    },
    heroArt: <RealsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, zatikietatik erradikaletara', es: 'Cinco etapas, de las fracciones a los radicales', ar: 'خمس مراحل، من الكسور إلى الجذريات' },
    stages: realsStages,
    topics: realsTopics,
    diagnostic: withLines(realsDiagnostic),
    guidedPractice: withLines(realsPractice),
    exerciseBank: realsExerciseBank.map((section) => ({ ...section, items: withLines(section.items) })),
    challenges: withLines(realsChallenges),
    lab: {
        description: {
            eu: `${realsLabTools.length} tresna: berreturen eskailera, zatikitik hamartarrera, zatiki sortzailea, zuzen errealean zoom, tarteak, biribiltzea, idazkera zientifikoa eta erradikalak, erronkekin.`,
            es: `${realsLabTools.length} herramientas: escalera de potencias, de fracción a decimal, fracción generatriz, zoom en la recta real, intervalos, redondeo, notación científica y radicales, con retos.`,
            ar: `${realsLabTools.length} أدوات: سُلّم القوى، من الكسر إلى العشري، الكسر المولّد، التكبير على المستقيم الحقيقي، الفترات، التقريب، الترميز العلمي والجذريات، مع تحديات.`
        },
        progressIds: realsLabChallengeIds,
        toolForTopic: realsLabToolForTopic,
        render: (props) => <RealsLaboratory {...props} />
    },
    games: {
        description: { eu: 'Hiru joko: lasterketa, zenbakiak zuzenean kokatu eta memoria.', es: 'Tres juegos: carrera, situar números en la recta y memoria.', ar: 'ثلاث ألعاب: السباق ووضع الأعداد على المستقيم والذاكرة.' },
        progressIds: realsGameProgressIds,
        recordsKey: REALS_GAME_RECORDS_KEY,
        render: (props) => <RealsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2.', es: 'Escribe un número: 5, −3, 1,5 o 3/2.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        rational: { eu: 'Batu eta kentzeko, izendatzaile komuna. Zatitzeko, gurutzean biderkatu. Berretzaile negatiboa: alderantzizkoa.', es: 'Para sumar y restar, denominador común. Para dividir, multiplica en cruz. Exponente negativo: el inverso.', ar: 'للجمع والطرح مقام مشترك. وللقسمة اضرب تبادليًا. الأس السالب: المقلوب.' },
        decimals: { eu: 'Zatiki sortzailea: zifra guztiak ken periodoaren aurrekoak; 9 bat periodoko zifra bakoitzeko eta 0 bat aurreperiodoko bakoitzeko.', es: 'Fracción generatriz: todas las cifras menos las anteriores al periodo; un 9 por cifra del periodo y un 0 por cifra del anteperiodo.', ar: 'الكسر المولّد: كل الأرقام ناقص ما قبل الدور؛ 9 لكل رقم في الدور و0 لكل رقم قبله.' },
        reals: { eu: 'Irrazionala: hamartar infinituak periodorik gabe. Tarteetan, kortxeteak muturra barne; parentesiak, kanpo.', es: 'Irracional: infinitos decimales sin periodo. En los intervalos, el corchete incluye el extremo y el paréntesis no.', ar: 'غير النسبي: منازل عشرية لا نهائية بلا دور. وفي الفترات القوس المعقوف يضم الطرف والعادي لا يضمه.' },
        approx: { eu: 'Biribiltzean, kentzen den lehen zifra 5 edo handiagoa bada, gehitu 1. Idazkera zientifikoan, 1 ≤ a < 10.', es: 'Al redondear, si la primera cifra suprimida es 5 o mayor, suma 1. En notación científica, 1 ≤ a < 10.', ar: 'عند التقريب إذا كان أول رقم محذوف 5 أو أكثر أضف 1. وفي الترميز العلمي 1 ≤ a < 10.' },
        radicals: { eu: 'Deskonposatu errokizuna eta atera bikote bakoitzetik faktore bat. Erradikal antzekoak bakarrik batzen dira.', es: 'Descompón el radicando y saca un factor por cada pareja. Solo se suman los radicales semejantes.', ar: 'حلّل ما تحت الجذر وأخرج عاملًا من كل زوج. ولا تُجمع إلا الجذريات المتشابهة.' }
    }
}

export function ErrealakDBH4ApPage() {
    return <UnitPage unit={errealakUnit} />
}
