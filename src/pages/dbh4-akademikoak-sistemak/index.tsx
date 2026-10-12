import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { systemsChallenges, systemsDiagnostic, systemsExerciseBank, systemsPractice } from './content'
import { SystemsHeroArt } from './figures'
import { systemsStages, systemsTopics } from './lessons'

const sistemakUnit: UnitDefinition = {
    storagePrefix: 'matella-sistemak-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Ekuazio-sistemak', es: 'Sistemas de ecuaciones', ar: 'أنظمة المعادلات' },
    documentTitle: { eu: 'Ekuazio-sistemak · 4. DBH', es: 'Sistemas de ecuaciones · 4.º ESO', ar: 'أنظمة المعادلات · الصف الرابع' },
    tagline: {
        eu: 'Sistema linealak grafikoki eta koefizienteekin sailkatuta, ordezkapena, berdinketa eta laburketa, sistema ez-linealak, bi ezezaguneko inekuazioak eta haien eskualdeak, eta problemak.',
        es: 'Sistemas lineales resueltos gráficamente y clasificados con los coeficientes, sustitución, igualación y reducción, sistemas no lineales, inecuaciones con dos incógnitas y sus regiones, y problemas.',
        ar: 'الأنظمة الخطية بالحل البياني وتصنيفها بالمعاملات، والتعويض والمساواة والحذف، والأنظمة غير الخطية، والمتراجحات بمجهولين ومناطقها، والمسائل.'
    },
    heroArt: <SystemsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, bi zuzenetatik eskualdeetara', es: 'Cinco etapas, de dos rectas a las regiones del plano', ar: 'خمس مراحل، من مستقيمين إلى مناطق المستوى' },
    stages: systemsStages,
    topics: systemsTopics,
    diagnostic: systemsDiagnostic,
    guidedPractice: systemsPractice,
    exerciseBank: systemsExerciseBank,
    challenges: systemsChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Ezezagun baten balioa, zenbat ebazpen edo puntu dauden, parametro bat… eskatzen dena bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. El valor de una incógnita, cuántas soluciones o puntos hay, un parámetro… solo lo que se pide.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. قيمة مجهول أو عدد الحلول أو النقاط أو وسيطًا… المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −4', es: 'Ej.: −4', ar: 'مثال: ⁦−4⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        linear: { eu: 'Ordeztu bikotea bi ekuazioetan. Paraleloak: ebazpenik ez; zuzen bera: infinitu. Alderatu a/a′, b/b′ eta c/c′.', es: 'Sustituye la pareja en las dos ecuaciones. Paralelas: sin solución; la misma recta: infinitas. Compara a/a′, b/b′ y c/c′.', ar: 'عوّض الزوج في المعادلتين. متوازيان: لا حل؛ مستقيم واحد: ما لا نهاية. قارن a/a′ وb/b′ وc/c′.' },
        methods: { eu: 'Kontuz zeinuekin parentesia kentzean eta ekuazio bat bider zenbaki egitean: gai guztiak biderkatu. Egiaztatu bi ekuazioetan.', es: 'Cuidado con los signos al quitar paréntesis y al multiplicar una ecuación: multiplica todos los términos. Comprueba en las dos ecuaciones.', ar: 'انتبه للإشارات عند إزالة الأقواس وعند ضرب معادلة: اضرب كل الحدود. وتحقّق في المعادلتين.' },
        nonlinear: { eu: 'x bakoitzarekin, kalkulatu bere y. x² = k: bi zeinuak. Erroekin eta zatikiekin, egiaztatu.', es: 'Con cada x, calcula su y. x² = k: los dos signos. Con raíces y fracciones, comprueba.', ar: 'مع كل x احسب y الخاص به. x² = k: الإشارتان. ومع الجذور والكسور تحقّق.' },
        'half-planes': { eu: 'Muga-zuzena eta proba-puntua. < edo >: ertza ez dago barruan. Sistema: zati komuna.', es: 'Recta frontera y punto de prueba. < o >: el borde no entra. Sistema: la parte común.', ar: 'المستقيم الحدّي ونقطة الاختبار. < أو >: الحد خارج الحل. النظام: الجزء المشترك.' },
        problems: { eu: 'Izendatu ezezagunak, idatzi bi baldintzak eta egiaztatu emaitzak zentzua duen.', es: 'Nombra las incógnitas, escribe las dos condiciones y comprueba que el resultado tiene sentido.', ar: 'سمِّ المجهولين واكتب الشرطين وتحقّق من أن للنتيجة معنى.' }
    }
}

export function SistemakDbh4AkIntroPage() {
    return <UnitPage unit={sistemakUnit} />
}
