import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { matrizeakChallenges, matrizeakDiagnostic, matrizeakExerciseBank, matrizeakPractice } from './content'
import { MatricesHeroArt } from './figures'
import { MatrizeakLaboratory } from './lab'
import { matrizeakLabChallengeIds, matrizeakLabToolForTopic, matrizeakLabTools } from './lab/labTools'
import { matrizeakStages, matrizeakTopics } from './lessons'

const matrizeakBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-matrizeak-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Matrizeak', es: 'Matrices', en: 'Matrices', ar: 'المصفوفات' },
    documentTitle: { eu: 'Matrizeak · Batxilergoa 2', es: 'Matrices · 2.º Bachillerato', en: 'Matrices · 2nd Bachillerato', ar: 'المصفوفات · البكالوريا الثانية' },
    tagline: {
        eu: 'Matrizeak eta motak, iraulia, eragiketak eta errenkada bider zutabe biderkadura, Gaussen metodoaz kalkulatutako heina, alderantzizko matrizea, berreturak eta matrize-ekuazioak.',
        es: 'Matrices y sus tipos, la traspuesta, las operaciones y el producto fila por columna, el rango por Gauss, la matriz inversa, las potencias y las ecuaciones matriciales.',
        en: 'Matrices and their kinds, the transpose, operations and the row-by-column product, rank by Gaussian elimination, the inverse matrix, powers and matrix equations.',
        ar: 'المصفوفات وأنواعها، والمنقول، والعمليات والضرب صفًّا في عمود، والرتبة بطريقة غاوس، والمصفوفة المعكوسة، والقوى، والمعادلات المصفوفية.'
    },
    heroArt: <MatricesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, taulatik matrize-ekuazioetara', es: 'Cinco etapas, de la tabla a las ecuaciones matriciales', en: 'Five stages, from a table to matrix equations', ar: 'خمس مراحل، من الجدول إلى المعادلات المصفوفية' },
    stages: matrizeakStages,
    topics: matrizeakTopics,
    diagnostic: matrizeakDiagnostic,
    guidedPractice: matrizeakPractice,
    exerciseBank: matrizeakExerciseBank,
    challenges: matrizeakChallenges,
    lab: {
        description: {
            eu: `${matrizeakLabTools.length} tresna, erronkekin: errenkada bider zutabe, bideen mapa, Gauss-Jordanen makina eta heinaren graduatzailea, berriak; eta 1. Batxilergoko Gaussen makina.`,
            es: `${matrizeakLabTools.length} herramientas con retos: fila por columna, el mapa de rutas, la máquina de Gauss-Jordan y el deslizador del rango, nuevas; y la máquina de Gauss de 1.º de Bachillerato.`,
            en: `${matrizeakLabTools.length} tools with challenges: row by column, the route map, the Gauss–Jordan machine and the rank slider, new; and the Gauss machine from 1st Bachillerato.`,
            ar: `${matrizeakLabTools.length} أدوات مع تحديات: صفّ في عمود وخريطة الطرق وآلة غاوس-جوردان ومنزلقة الرتبة، وهي جديدة؛ وآلة غاوس من البكالوريا الأولى.`
        },
        progressIds: matrizeakLabChallengeIds,
        toolForTopic: matrizeakLabToolForTopic,
        render: (props) => <MatrizeakLaboratory {...props} />
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
        basics: { eu: 'Lehenik errenkada, gero zutabea: $a_{23}$ elementua 2. errenkadan eta 3. zutabean dago. Iraultzean, errenkadak zutabe bihurtzen dira.', es: 'Primero la fila, después la columna: $a_{23}$ está en la fila 2 y la columna 3. Al trasponer, las filas pasan a columnas.', en: 'Row first, then column: $a_{23}$ is in row 2 and column 3. When you transpose, rows become columns.', ar: 'الصف أولًا ثم العمود: $a_{23}$ في الصف 2 والعمود 3. وعند النقل تصير الصفوف أعمدة.' },
        operations: { eu: 'Batuketa elementuz elementu egiten da; biderkadura, ordea, errenkada bider zutabe. Begiratu dimentsioei, eta ez trukatu ordena: $AB\\neq BA$.', es: 'La suma va elemento a elemento; el producto, fila por columna. Mira las dimensiones y no cambies el orden: $AB\\neq BA$.', en: 'Addition goes entry by entry; the product, row by column. Look at the sizes and do not swap the order: $AB\\neq BA$.', ar: 'الجمع عنصرًا عنصرًا، والضرب صفًّا في عمود. انظر إلى الأبعاد ولا تبدّل الترتيب: $AB\\neq BA$.' },
        rank: { eu: 'Mailakatu zenbatu aurretik. Parametro bat badago, ez zatitu $m-3$ bezalako adierazpen batez, balio hori aparte aztertu gabe.', es: 'Escalona antes de contar. Si hay un parámetro, no dividas entre una expresión como $m-3$ sin estudiar aparte ese valor.', en: 'Reduce before you count. If there is a parameter, do not divide by an expression like $m-3$ without studying that value separately.', ar: 'حوّل إلى الشكل الدرجي قبل العدّ. وإذا وُجد وسيط فلا تقسم على عبارة مثل $m-3$ قبل دراسة تلك القيمة على حدة.' },
        inverse: { eu: 'Alderantzizkoa ez da zenbaki bakoitzaren alderantzizkoa. Gauss-Jordan metodoan, eragiketak errenkada osoan egiten dira. Egiaztatu $AA^{-1}=I$.', es: 'La inversa no es el inverso de cada número. En Gauss-Jordan, las operaciones van en la fila entera. Comprueba $AA^{-1}=I$.', en: 'The inverse is not the reciprocal of each number. In Gauss–Jordan, the operations go on the whole row. Check $AA^{-1}=I$.', ar: 'المعكوس ليس مقلوب كل عدد. وفي غاوس-جوردان تُجرى العمليات على الصف كله. وتحقق من $AA^{-1}=I$.' },
        equations: { eu: 'Ez zatitu matrizeen artean: biderkatu $A^{-1}$ matrizeaz, $A$ dagoen aldetik, bi aldeetan. $X=IX$ idatz dezakezu faktore komuna ateratzeko.', es: 'No dividas entre matrices: multiplica por $A^{-1}$ por el lado donde está $A$, en los dos miembros. Puedes escribir $X=IX$ para sacar factor común.', en: 'Do not divide by matrices: multiply by $A^{-1}$ on the side where $A$ is, on both sides. You can write $X=IX$ to take out a common factor.', ar: 'لا تقسم على مصفوفات: اضرب في $A^{-1}$ من الجهة التي فيها $A$ في الطرفين. ويمكنك كتابة $X=IX$ لإخراج عامل مشترك.' }
    }
}

export function MatrizeakBatx2zIntroPage() {
    return <UnitPage unit={matrizeakBatx2zUnit} />
}
