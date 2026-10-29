import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { RealsHeroArt } from '../dbh4-aplikatuak-errealak/figures'
import { powersChallenges, powersDiagnostic, powersExerciseBank, powersPractice } from './content'
import { powersStages, powersTopics } from './lessons'
import '../dbh4-aplikatuak-errealak/Reals.css'

const berreturakUnit: UnitDefinition = {
    storagePrefix: 'matella-berreturak-dbh3',
    coursePath: '/matematika/dbh3',
    courseTitle: { eu: '3. DBH', es: '3.º ESO', ar: 'الصف الثالث' },
    title: { eu: 'Berreturak eta erroak', es: 'Potencias y raíces', ar: 'القوى والجذور' },
    documentTitle: { eu: 'Berreturak eta erroak · 3. DBH', es: 'Potencias y raíces · 3.º ESO', ar: 'القوى والجذور · الصف الثالث' },
    tagline: {
        eu: 'Berretzaile osoko berreturetatik zenbaki errealetara: idazkera zientifikoa, erroak eta erradikalak, irrazionalak eta tarteak, hurbilketak eta errorea.',
        es: 'De las potencias de exponente entero a los números reales: notación científica, raíces y radicales, irracionales e intervalos, aproximaciones y error.',
        ar: 'من القوى ذات الأس الصحيح إلى الأعداد الحقيقية: الترميز العلمي، والجذور والجذريات، وغير النسبية والفترات، والتقريب والخطأ.'
    },
    heroArt: <RealsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, berreturetatik errorera', es: 'Cinco etapas, de las potencias al error', ar: 'خمس مراحل، من القوى إلى الخطأ' },
    stages: powersStages,
    topics: powersTopics,
    diagnostic: powersDiagnostic,
    guidedPractice: powersPractice,
    exerciseBank: powersExerciseBank,
    challenges: powersChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bat edo zatiki bat: 5, −3, 1,5 edo 9/25. Emaitza erradikal edo 10en berretura bat bada, eskatzen den zenbakia bakarrik.', es: 'Escribe un número o una fracción: 5, −3, 1,5 o 9/25. Si el resultado es un radical o una potencia de 10, solo el número que se pide.', ar: 'اكتب عددًا أو كسرًا: 5 أو ⁦−3⁩ أو 1.5 أو 9/25. وإذا كانت النتيجة جذرًا أو قوة للعدد 10 فاكتب العدد المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 9/25', es: 'Ej.: 9/25', ar: 'مثال: 9/25' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        powers: { eu: 'Berretzaile negatiboa: alderantzizkoa. Oinarri negatiboa: bikoitia positibo, bakoitia negatibo. Oinarri bera: biderkatzean batu, zatitzean kendu.', es: 'Exponente negativo: el inverso. Base negativa: par positivo, impar negativo. Misma base: al multiplicar suma, al dividir resta.', ar: 'الأس السالب: المقلوب. الأساس السالب: الزوجي موجب والفردي سالب. الأساس نفسه: في الضرب اجمع وفي القسمة اطرح.' },
        scientific: { eu: 'a · 10ⁿ, 1 ≤ a < 10. Handia: berretzaile positiboa; txikia: negatiboa. Biderkatzean berretzaileak batu, zatitzean kendu; batzeko, berretzaile bera.', es: 'a · 10ⁿ, 1 ≤ a < 10. Grande: exponente positivo; pequeño: negativo. Al multiplicar suma los exponentes, al dividir resta; para sumar, el mismo exponente.', ar: 'a · 10ⁿ مع 1 ≤ a < 10. الكبير: أس موجب والصغير: سالب. في الضرب اجمع الأسس وفي القسمة اطرح؛ وللجمع الأس نفسه.' },
        roots: { eu: 'Faktorizatu eta atera bikoteak. Antzekoak bakarrik batzen dira. Erroak ez dira errokizunak batuz batzen.', es: 'Factoriza y saca los pares. Solo se suman los semejantes. Las raíces no se suman sumando los radicandos.', ar: 'حلّل وأخرج الأزواج. لا تُجمع إلا المتشابهة. ولا تُجمع الجذور بجمع ما تحتها.' },
        reals: { eu: 'Arrazionala: zatiki bat, hamartar zehatza edo periodikoa. Irrazionala: infinitua eta periodorik gabea. Kortxetea: muturra sartzen da.', es: 'Racional: una fracción, decimal exacto o periódico. Irracional: infinitas cifras sin periodo. Corchete: el extremo entra.', ar: 'النسبي: كسر، عشري صحيح أو دوري. غير النسبي: أرقام لا نهائية بلا دور. القوس المربع: الطرف داخل.' },
        approx: { eu: 'Trunkatu: moztu. Biribildu: kendutako lehen zifra 5 edo handiagoa bada, gehitu 1. Errore erlatiboa: absolutua zatitu zehatzaz.', es: 'Truncar: cortar. Redondear: si la primera cifra suprimida es 5 o mayor, suma 1. Error relativo: el absoluto entre el exacto.', ar: 'البتر: قطع. التقريب: إذا كان أول رقم محذوف 5 أو أكبر أضف 1. الخطأ النسبي: المطلق على الصحيح.' }
    }
}

export function BerreturakDBH3Page() {
    return <UnitPage unit={berreturakUnit} />
}
