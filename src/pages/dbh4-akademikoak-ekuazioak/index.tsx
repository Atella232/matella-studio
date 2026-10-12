import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { equationsInequalitiesChallenges, equationsInequalitiesDiagnostic, equationsInequalitiesExerciseBank, equationsInequalitiesPractice } from './content'
import { EquationsInequalitiesHeroArt } from './figures'
import { equationsInequalitiesStages, equationsInequalitiesTopics } from './lessons'

const ekuazioakUnit: UnitDefinition = {
    storagePrefix: 'matella-ekuazioak-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Ekuazioak eta inekuazioak', es: 'Ecuaciones e inecuaciones', ar: 'المعادلات والمتراجحات' },
    documentTitle: { eu: 'Ekuazioak eta inekuazioak · 4. DBH', es: 'Ecuaciones e inecuaciones · 4.º ESO', ar: 'المعادلات والمتراجحات · الصف الرابع' },
    tagline: {
        eu: 'Bigarren mailako ekuazioak eta haien erroak, ekuazio bikarratuak, arrazionalak, irrazionalak, esponentzialak eta logaritmikoak, eta lehen eta bigarren mailako inekuazioak eta sistemak.',
        es: 'Ecuaciones de segundo grado y sus raíces, bicuadradas, racionales, irracionales, exponenciales y logarítmicas, e inecuaciones de primer y segundo grado y sus sistemas.',
        ar: 'معادلات الدرجة الثانية وجذورها، والثنائية التربيع والكسرية والجذرية والأسية واللوغاريتمية، ومتراجحات الدرجتين الأولى والثانية وأنظمتها.'
    },
    heroArt: <EquationsInequalitiesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, ekuazioetatik inekuazioetara', es: 'Cinco etapas, de las ecuaciones a las inecuaciones', ar: 'خمس مراحل، من المعادلات إلى المتراجحات' },
    stages: equationsInequalitiesStages,
    topics: equationsInequalitiesTopics,
    diagnostic: equationsInequalitiesDiagnostic,
    guidedPractice: equationsInequalitiesPractice,
    exerciseBank: equationsInequalitiesExerciseBank,
    challenges: equationsInequalitiesChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Ebazpen bat, zenbat diren, tarte baten muturra… eskatzen dena bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Una solución, cuántas hay, el extremo de un intervalo… solo lo que se pide.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. حلًا أو عدد الحلول أو طرف مجال… المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −4', es: 'Ej.: −4', ar: 'مثال: ⁦−4⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        quadratic: { eu: 'Δ = b² − 4ac: negatiboa bada, ebazpenik ez. Erroen batura −b/a eta biderkadura c/a. Egiaztatu ebazpenek zentzua duten.', es: 'Δ = b² − 4ac: si es negativo, no hay solución. Las raíces suman −b/a y multiplican c/a. Mira si las soluciones tienen sentido.', ar: 'Δ = b² − 4ac: إذا كان سالبًا فلا حل. مجموع الجذرين −b/a وجداؤهما c/a. وانظر هل للحلول معنى.' },
        other: { eu: 't = x²: t negatiboak ez du x-rik ematen. Faktorizatu, ez zatitu x-z. Izendatzailea 0 egiten duena ez da ebazpena.', es: 't = x²: una t negativa no da x. Factoriza, no dividas entre x. Lo que anula un denominador no es solución.', ar: 't = x²: لا يعطي t السالب قيمة x. حلّل ولا تقسم على x. وما يعدم المقام ليس حلًا.' },
        exponential: { eu: 'Karratura jasotakoan, egiaztatu. Esponentzialak: oinarri bera. Logaritmoak: argumentu positiboak.', es: 'Tras elevar al cuadrado, comprueba. Exponenciales: misma base. Logaritmos: argumentos positivos.', ar: 'بعد التربيع تحقّق. الأسية: الأساس نفسه. اللوغاريتمات: ما بداخلها موجب.' },
        inequalities: { eu: 'Negatibo batez biderkatu edo zatitzean, zentzua aldatu. [ ] muturra sartzen da, ( ) ez.', es: 'Al multiplicar o dividir por un negativo, cambia el sentido. [ ] el extremo entra, ( ) no.', ar: 'عند الضرب أو القسمة على سالب اقلب الاتجاه. [ ] الطرف داخل، ( ) خارج.' },
        'quadratic-inequalities': { eu: 'Erroak, zatiak eta zeinuak. Sistemetan, zati komuna.', es: 'Raíces, trozos y signos. En los sistemas, la parte común.', ar: 'الجذور والأجزاء والإشارات. وفي الأنظمة الجزء المشترك.' }
    }
}

export function EkuazioakDbh4AkIntroPage() {
    return <UnitPage unit={ekuazioakUnit} />
}
