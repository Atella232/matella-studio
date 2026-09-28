import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import '../dbh2-zatigarritasuna/Zatigarritasuna.css'
import { fractionsIntroChallenges, fractionsIntroDiagnostic, fractionsIntroExerciseBank, fractionsIntroPractice } from './content'
import { FractionsIntroHeroArt } from './figures'
import { FractionsIntroLaboratory } from './lab'
import { fractionsIntroLabChallengeIds, fractionsIntroLabToolForTopic, fractionsIntroLabTools } from './lab/labTools'
import { fractionsIntroStages, fractionsIntroTopics } from './lessons'

const zatikiakIntroUnit: UnitDefinition = {
    storagePrefix: 'matella-zatikiak-dbh1',
    coursePath: '/matematika/dbh1',
    courseTitle: { eu: '1. DBH', es: '1.º ESO', ar: 'الصف الأول' },
    title: { eu: 'Zatikiak', es: 'Fracciones', ar: 'الكسور' },
    documentTitle: { eu: 'Zatikiak · 1. DBH', es: 'Fracciones · 1.º ESO', ar: 'الكسور · الصف الأول' },
    tagline: {
        eu: 'Gazta-kutxak, bizkotxoak eta kromoak: ikasi zatikiak irakurtzen, marrazten, zuzenean kokatzen, alderatzen eta haiekin kalkulatzen.',
        es: 'Cajas de quesitos, bizcochos y cromos: aprende a leer, dibujar, situar en la recta, comparar y calcular con fracciones.',
        ar: 'علب الجبن والكعك والصور اللاصقة: تعلّم قراءة الكسور ورسمها ووضعها على المستقيم ومقارنتها والحساب بها.'
    },
    heroArt: <FractionsIntroHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, zatikiaren ideiatik buruketetara', es: 'Cinco etapas, de la idea de fracción a los problemas', ar: 'خمس مراحل، من فكرة الكسر إلى المسائل' },
    stages: fractionsIntroStages,
    topics: fractionsIntroTopics,
    diagnostic: fractionsIntroDiagnostic,
    guidedPractice: fractionsIntroPractice,
    exerciseBank: fractionsIntroExerciseBank,
    challenges: fractionsIntroChallenges,
    lab: {
        description: { eu: `${fractionsIntroLabTools.length} tresna zatikiak ukitzeko: zatiak, zuzena, horma, baliokidetasuna, alderaketa, eragiketak eta kopuruak, erronkekin.`, es: `${fractionsIntroLabTools.length} herramientas para tocar las fracciones: partes, recta, muro, equivalencia, comparación, operaciones y cantidades, con retos.`, ar: `${fractionsIntroLabTools.length} أدوات للمس الكسور: الأجزاء والمستقيم والجدار والتكافؤ والمقارنة والعمليات والكميات، مع تحديات.` },
        progressIds: fractionsIntroLabChallengeIds,
        toolForTopic: fractionsIntroLabToolForTopic,
        render: (props) => <FractionsIntroLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Enuntziatuak forma zehatzik eskatzen ez badu, zatiki baliokideak eta koma edo puntua duten hamartarrak onartzen dira.', es: 'Si el enunciado no pide una forma concreta, se aceptan fracciones equivalentes y decimales con coma o punto.', ar: 'إذا لم يطلب السؤال صيغة محددة، تُقبل الكسور المكافئة والأعداد العشرية بالفاصلة أو النقطة.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        placeholder: (form) => form === 'mixed'
            ? { eu: 'Adib.: 2 1/3', es: 'Ej.: 2 1/3', ar: 'مثال: 2 1/3' }
            : form === 'simplified'
                ? { eu: 'Adib.: 3/4', es: 'Ej.: 3/4', ar: 'مثال: 3/4' }
                : { eu: 'Adib.: 3/4 edo 0,75', es: 'Ej.: 3/4 o 0,75', ar: 'مثال: 3/4 أو 0.75' },
        wrongForm: (form) => form === 'mixed'
            ? { eu: 'Balioa zuzena da, baina idatzi zenbaki misto gisa: oso bat eta zatiki propio laburtezin bat, adibidez 2 1/3.', es: 'El valor es correcto, pero escríbelo como número mixto: un entero y una fracción propia irreducible, por ejemplo 2 1/3.', ar: 'القيمة صحيحة، لكن اكتبها عددًا كسريًا: عدد صحيح وكسر حقيقي في أبسط صورة، مثل 2 1/3.' }
            : { eu: 'Balioa zuzena da, baina oraindik sinplifika daiteke. Idatzi zatiki laburtezina.', es: 'El valor es correcto, pero todavía se puede simplificar. Escribe la fracción irreducible.', ar: 'القيمة صحيحة، لكن يمكن تبسيطها أكثر. اكتب الكسر في أبسط صورة.' },
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zatiki bat (3/4), zenbaki misto bat (2 1/3) edo hamartar bat (0,75).', es: 'No entiendo esa respuesta. Escribe una fracción (3/4), un número mixto (2 1/3) o un decimal (0,75).', ar: 'لم أفهم هذه الإجابة. اكتب كسرًا (3/4) أو عددًا كسريًا (2 1/3) أو عددًا عشريًا (0.75).' }
    },
    errorByStage: {
        meaning: { eu: 'Izendatzailea: zenbat zati berdin guztira. Zenbakitzailea: zenbat hartzen diren.', es: 'Denominador: cuántas partes iguales en total. Numerador: cuántas se toman.', ar: 'المقام: كم جزءًا متساويًا في المجموع. البسط: كم جزءًا نأخذ.' },
        types: { eu: 'Alderatu zenbakitzailea eta izendatzailea; zenbaki mistorako, zatitu zenbakitzailea izendatzaileaz.', es: 'Compara numerador y denominador; para el número mixto, divide el numerador entre el denominador.', ar: 'قارن البسط بالمقام؛ وللعدد الكسري اقسم البسط على المقام.' },
        equivalence: { eu: 'Bi gaiei eragiketa bera egin; alderatzeko, eraman izendatzaile berera.', es: 'Haz la misma operación a los dos términos; para comparar, pasa a común denominador.', ar: 'أجرِ العملية نفسها على الحدّين؛ وللمقارنة وحّد المقامات.' },
        operations: { eu: 'Batu eta kendu: izendatzaile bera behar da. Biderkatu: zuzenean. Zatitu: gurutzean.', es: 'Sumar y restar: hace falta el mismo denominador. Multiplicar: en línea. Dividir: en cruz.', ar: 'الجمع والطرح: نحتاج المقام نفسه. الضرب: مباشرة. القسمة: تبادليًا.' },
        problems: { eu: 'Kopuru baten zatikia: zatitu izendatzaileaz eta biderkatu zenbakitzaileaz. Geratzen dena: 1 ken erabilitakoa.', es: 'Fracción de una cantidad: divide entre el denominador y multiplica por el numerador. Lo que queda: 1 menos lo usado.', ar: 'كسر من كمية: اقسم على المقام واضرب في البسط. المتبقي: 1 ناقص المستعمل.' }
    }
}

export function ZatikiakIntroPage() {
    return <UnitPage unit={zatikiakIntroUnit} />
}
