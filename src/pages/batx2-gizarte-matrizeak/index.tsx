import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { MatricesHeroArt } from '../batx2-zientziak-matrizeak/figures'
import { gizarteMatrizeakChallenges, gizarteMatrizeakDiagnostic, gizarteMatrizeakExerciseBank, gizarteMatrizeakPractice } from './content'
import { GizarteMatrizeakLaboratory } from './lab'
import { gizarteMatrizeakLabChallengeIds, gizarteMatrizeakLabToolForTopic, gizarteMatrizeakLabTools } from './lab/labTools'
import { gizarteMatrizeakStages, gizarteMatrizeakTopics } from './lessons'

const matrizeakBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-matrizeak-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Matrizeak', es: 'Matrices', en: 'Matrices', ar: 'المصفوفات' },
    documentTitle: { eu: 'Matrizeak · Batxilergoa 2 · Gizarte', es: 'Matrices · 2.º Bachillerato CCSS', en: 'Matrices · 2nd Bachillerato Social Sciences', ar: 'المصفوفات · البكالوريا الثانية · العلوم الاجتماعية' },
    tagline: {
        eu: 'Taulak matrize gisa, eragiketak, kostuak eta irabaziak, ekoizpen-kateak, Gaussen metodoaz kalkulatutako heina, alderantzizko matrizea, berreturak eta matrize-ekuazioak.',
        es: 'Tablas como matrices, operaciones, costes y beneficios, cadenas de producción, el rango por Gauss, la matriz inversa, las potencias y las ecuaciones matriciales.',
        en: 'Tables as matrices, operations, costs and profit, production chains, rank by Gaussian elimination, the inverse matrix, powers and matrix equations.',
        ar: 'الجداول على شكل مصفوفات، والعمليات، والتكاليف والأرباح، وسلاسل الإنتاج، والرتبة بطريقة غاوس، والمصفوفة المعكوسة، والقوى، والمعادلات المصفوفية.'
    },
    heroArt: <MatricesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, datu-taulatik sistema baten forma matrizialera', es: 'Cinco etapas, de la tabla de datos a la forma matricial de un sistema', en: 'Five stages, from a table of data to the matrix form of a system', ar: 'خمس مراحل، من جدول المعطيات إلى الشكل المصفوفي للنظام' },
    stages: gizarteMatrizeakStages,
    topics: gizarteMatrizeakTopics,
    diagnostic: gizarteMatrizeakDiagnostic,
    guidedPractice: gizarteMatrizeakPractice,
    exerciseBank: gizarteMatrizeakExerciseBank,
    challenges: gizarteMatrizeakChallenges,
    lab: {
        description: {
            eu: `${gizarteMatrizeakLabTools.length} tresna, erronkekin: tiketa eta ekoizpen-katea, berriak; eta Zientzietako heinaren graduatzailea eta Gauss-Jordanen makina.`,
            es: `${gizarteMatrizeakLabTools.length} herramientas con retos: el ticket y la cadena de producción, nuevas; y el deslizador del rango y la máquina de Gauss-Jordan de Ciencias.`,
            en: `${gizarteMatrizeakLabTools.length} tools with challenges: the receipt and the production chain, new; and the rank slider and the Gauss–Jordan machine from Sciences.`,
            ar: `${gizarteMatrizeakLabTools.length} أدوات مع تحديات: الفاتورة وسلسلة الإنتاج، وهما جديدتان؛ ومنزلقة الرتبة وآلة غاوس-جوردان من العلوم.`
        },
        progressIds: gizarteMatrizeakLabChallengeIds,
        toolForTopic: gizarteMatrizeakLabToolForTopic,
        render: (props) => <GizarteMatrizeakLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Matrize bat eskatzen bada, eskatzen den elementua bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si se pide una matriz, solo el elemento que se pide.', en: 'Write a number: 5, −3, 1.5 or 3/2. If a matrix is involved, only the entry that is asked for.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا كان المطلوب من مصفوفة فاكتب العنصر المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        basics: { eu: 'Lehenik errenkada, gero zutabea. Problema batean, esan zer doan errenkadetan (dendak, hilabeteak) eta zer zutabeetan (produktuak).', es: 'Primero la fila, después la columna. En un problema, di qué va en las filas (tiendas, meses) y qué en las columnas (productos).', en: 'Row first, then column. In a problem, say what goes in the rows (shops, months) and what in the columns (products).', ar: 'الصف أولًا ثم العمود. وفي المسألة قل ما في الصفوف (المتاجر، الأشهر) وما في الأعمدة (المنتجات).' },
        operations: { eu: 'Biderkadura errenkada bider zutabe da. Kopuruak lehenik eta prezioak gero ($QP$); kate batean, katearen ordena. Ez trukatu ordena: $AB\\neq BA$.', es: 'El producto es fila por columna. Primero las cantidades y luego los precios ($QP$); en una cadena, el orden de la cadena. No cambies el orden: $AB\\neq BA$.', en: 'The product is row by column. Quantities first and prices after ($QP$); in a chain, the order of the chain. Do not swap the order: $AB\\neq BA$.', ar: 'الضرب صفّ في عمود. الكميات أولًا ثم الأسعار ($QP$)؛ وفي السلسلة ترتيب السلسلة. لا تبدّل الترتيب: $AB\\neq BA$.' },
        rank: { eu: 'Mailakatu zenbatu aurretik. Parametro bat badago, ez zatitu $m-3$ bezalako adierazpen batez, balio hori aparte aztertu gabe.', es: 'Escalona antes de contar. Si hay un parámetro, no dividas entre una expresión como $m-3$ sin estudiar aparte ese valor.', en: 'Reduce before you count. If there is a parameter, do not divide by an expression like $m-3$ without studying that value separately.', ar: 'حوّل إلى الشكل الدرجي قبل العدّ. وإذا وُجد وسيط فلا تقسم على عبارة مثل $m-3$ قبل دراسة تلك القيمة على حدة.' },
        inverse: { eu: 'Alderantzizkoa ez da zenbaki bakoitzaren alderantzizkoa. Gauss-Jordan metodoan, eragiketak errenkada osoan egiten dira. Egiaztatu $AA^{-1}=I$.', es: 'La inversa no es el inverso de cada número. En Gauss-Jordan, las operaciones van en la fila entera. Comprueba $AA^{-1}=I$.', en: 'The inverse is not the reciprocal of each number. In Gauss–Jordan, the operations go on the whole row. Check $AA^{-1}=I$.', ar: 'المعكوس ليس مقلوب كل عدد. وفي غاوس-جوردان تُجرى العمليات على الصف كله. وتحقق من $AA^{-1}=I$.' },
        equations: { eu: 'Ez zatitu matrizeen artean: biderkatu $A^{-1}$ matrizeaz, $A$ dagoen aldetik, bi aldeetan. $AX=B$ sisteman, $X=A^{-1}B$.', es: 'No dividas entre matrices: multiplica por $A^{-1}$ por el lado donde está $A$, en los dos miembros. En el sistema $AX=B$, $X=A^{-1}B$.', en: 'Do not divide by matrices: multiply by $A^{-1}$ on the side where $A$ is, on both sides. In the system $AX=B$, $X=A^{-1}B$.', ar: 'لا تقسم على مصفوفات: اضرب في $A^{-1}$ من الجهة التي فيها $A$ في الطرفين. وفي النظام $AX=B$ يكون $X=A^{-1}B$.' }
    }
}

export function MatrizeakBatx2gIntroPage() {
    return <UnitPage unit={matrizeakBatx2gUnit} />
}
