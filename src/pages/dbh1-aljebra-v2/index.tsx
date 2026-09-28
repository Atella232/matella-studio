import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { algebraIntroChallenges, algebraIntroDiagnostic, algebraIntroExerciseBank, algebraIntroPractice } from './content'
import { AlgebraIntroHeroArt } from './figures'
import { algebraIntroStages, algebraIntroTopics } from './lessons'

const aljebraIntroUnit: UnitDefinition = {
    storagePrefix: 'matella-aljebra-dbh1',
    coursePath: '/matematika/dbh1',
    courseTitle: { eu: '1. DBH', es: '1.º ESO', ar: 'الصف الأول' },
    title: { eu: 'Aljebra', es: 'Álgebra', ar: 'الجبر' },
    documentTitle: { eu: 'Aljebra · 1. DBH', es: 'Álgebra · 1.º ESO', ar: 'الجبر · الصف الأول' },
    tagline: {
        eu: 'Letrak zenbakien ordez, monomioak, balantzak eta ezezagunak: ikasi hizkuntza aljebraikoa erabiltzen eta ekuazioekin buruketak ebazten.',
        es: 'Letras en lugar de números, monomios, balanzas e incógnitas: aprende a usar el lenguaje algebraico y a resolver problemas con ecuaciones.',
        ar: 'حروف بدل الأعداد، ووحيدات حد، وموازين، ومجاهيل: تعلّم استعمال اللغة الجبرية وحل المسائل بالمعادلات.'
    },
    heroArt: <AlgebraIntroHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, letretatik ekuazioekin ebatzitako buruketetara', es: 'Cinco etapas, de las letras a los problemas resueltos con ecuaciones', ar: 'خمس مراحل، من الحروف إلى المسائل المحلولة بالمعادلات' },
    stages: algebraIntroStages,
    topics: algebraIntroTopics,
    diagnostic: algebraIntroDiagnostic,
    guidedPractice: algebraIntroPractice,
    exerciseBank: algebraIntroExerciseBank,
    challenges: algebraIntroChallenges,
    answers: {
        note: { eu: 'Idatzi emaitza zenbaki gisa: 7, −3 edo 5/2.', es: 'Escribe el resultado como número: 7, −3 o 5/2.', ar: 'اكتب النتيجة عددًا: 7 أو ⁦−3⁩ أو 5/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 7', es: 'Ej.: 7', ar: 'مثال: 7' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina sinplifikatu.', es: 'El valor es correcto, pero simplifícalo.', ar: 'القيمة صحيحة، لكن بسّطها.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 7 edo −3.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 7 o −3.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 7 أو ⁦−3⁩.' }
    },
    errorByStage: {
        language: { eu: 'Erabaki zer den ezezaguna eta idatzi eragiketak ordenan; ordezkatzean, errespetatu hierarkia.', es: 'Decide cuál es la incógnita y escribe las operaciones en orden; al sustituir, respeta la jerarquía.', ar: 'حدّد المجهول واكتب العمليات بالترتيب؛ وعند التعويض احترم الأولويات.' },
        monomials: { eu: 'Koefizientea: zenbakia. Zati literala: letrak. Maila: berretzaileen batura.', es: 'Coeficiente: el número. Parte literal: las letras. Grado: suma de exponentes.', ar: 'المعامل: العدد. الجزء الحرفي: الحروف. الدرجة: مجموع الأسس.' },
        operations: { eu: 'Antzekoak bakarrik batzen dira; biderkatzean berretzaileak batzen dira.', es: 'Solo se suman los semejantes; al multiplicar se suman los exponentes.', ar: 'نجمع المتشابهة فقط؛ وعند الضرب نجمع الأسس.' },
        equations: { eu: 'Atalez aldatzean, gaiak kontrako eragiketa egiten du. Egiaztatu ebazpena.', es: 'Al cambiar de miembro, el término hace la operación contraria. Comprueba la solución.', ar: 'عند تغيير الطرف يقوم الحد بالعملية العكسية. تحقّق من الحل.' },
        problems: { eu: 'Ezezaguna → ekuazioa → ebatzi → egiaztatu eta erantzun esaldi batez.', es: 'Incógnita → ecuación → resolver → comprobar y responder con una frase.', ar: 'المجهول ← المعادلة ← الحل ← التحقق والجواب بجملة.' }
    }
}

export function AljebraIntroPage() {
    return <UnitPage unit={aljebraIntroUnit} />
}
