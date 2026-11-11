import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    AdjugateFigure,
    BorderFigure,
    ChainFigure,
    CheckerboardFigure,
    ExpansionFigure,
    FlatFigure,
    ParallelogramFigure,
    RootsCurveFigure,
    SarrusFigure,
    ScaleFigure,
    ShearFigure,
    SwapFigure
} from './figures'
import { determinanteakLessonChecks, type DeterminanteakTopicId } from './lessonChecks'
import { determinanteakLessonTexts } from './lessonTexts'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 · Zientziak — stages and lessons. The
   scope follows unit 2 of Santillana 2.º Bachillerato Ciencias (order 2
   and 3, Sarrus, the properties, minors and cofactors, expanding along a
   line, rank by minors, the inverse with the adjugate) and unit 2 of Anaya
   Matemáticas II (order 4 by making zeros, equations with determinants).
   Cramer and Rouché are left for Sistemas. Determinants are written |A| in
   every language. All the exercises and numbers are ours.
   ========================================================================== */

export type DeterminanteakStageId = 'orders' | 'properties' | 'expansion' | 'rank' | 'inverse'

export const determinanteakStages: UnitStage[] = [
    { id: 'orders', tone: 'blue', title: { eu: '2. eta 3. ordenakoak', es: 'Orden 2 y 3', en: 'Order 2 and 3', ar: 'الرتبتان 2 و3' } },
    { id: 'properties', tone: 'violet', title: { eu: 'Propietateak', es: 'Propiedades', en: 'Properties', ar: 'الخواص' } },
    { id: 'expansion', tone: 'mustard', title: { eu: 'Menoreak eta adjuntuak', es: 'Menores y adjuntos', en: 'Minors and cofactors', ar: 'المحددات الصغرى والمتممات' } },
    { id: 'rank', tone: 'coral', title: { eu: 'Heina menoreekin', es: 'El rango con menores', en: 'Rank with minors', ar: 'الرتبة بالمحددات الصغرى' } },
    { id: 'inverse', tone: 'green', title: { eu: 'Alderantzizkoa adjuntuekin', es: 'La inversa con adjuntos', en: 'The inverse with cofactors', ar: 'المعكوس بالمتممات' } }
]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** A lesson of Matrizeak (same course) to review first */
const matrices = (topic: string, title: LocalizedText) => ({ unit: 'batx2-zientziak/matrices', topic, title })

const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Order 2 and 3 ---------- */
    {
        id: 'det-two',
        stage: 'orders',
        title: say('2. ordenako determinantea', 'El determinante de orden 2', 'محدد الرتبة 2', 'The determinant of order 2'),
        goal: say('$2\\times 2$ matrize baten determinantea kalkulatzea, $ad-bc$, eta haren zutabeek osatzen duten paralelogramoaren azalera gisa ikustea.', 'Calcular el determinante de una matriz $2\\times 2$, $ad-bc$, y verlo como el área del paralelogramo de sus columnas.', 'حساب محدد مصفوفة $2\\times 2$، أي $ad-bc$، ورؤيته على أنه مساحة متوازي الأضلاع لعموديها.', 'Work out the determinant of a $2\\times 2$ matrix, $ad-bc$, and see it as the area of the parallelogram of its columns.'),
        needs: [matrices('what-is-a-matrix', { eu: 'Matrizeak: errenkadak eta zutabeak', es: 'Matrices: filas y columnas', en: 'Matrices: rows and columns', ar: 'المصفوفات: الصفوف والأعمدة' })],
        problem: say('Kalkulatu $\\begin{vmatrix}3&5\\\\2&4\\end{vmatrix}$.', 'Calcula $\\begin{vmatrix}3&5\\\\2&4\\end{vmatrix}$.', 'احسب $\\begin{vmatrix}3&5\\\\2&4\\end{vmatrix}$.', 'Work out $\\begin{vmatrix}3&5\\\\2&4\\end{vmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Diagonal nagusia: biderkatu goiko ezkerreko zenbakia eta beheko eskuinekoa.', 'Diagonal principal: multiplica el de arriba a la izquierda por el de abajo a la derecha.', 'القطر الرئيسي: اضرب العدد العلوي الأيسر في السفلي الأيمن.', 'Main diagonal: multiply the top-left number by the bottom-right one.'), math: same('$3\\cdot 4=12$') },
            { text: say('Bigarren diagonala: beste biak.', 'Diagonal secundaria: los otros dos.', 'القطر الثانوي: العددان الآخران.', 'Other diagonal: the other two.'), math: same('$5\\cdot 2=10$') },
            { text: say('Kendu: lehena ken bigarrena.', 'Resta: la primera menos la segunda.', 'اطرح: الأول ناقص الثاني.', 'Subtract: the first minus the second.'), math: same('$12-10=2$') }
        ],
        takeaway: say(
            '$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$: diagonal nagusiaren biderkadura ken bigarren diagonalarena. Haren balio absolutua zutabeek osatzen duten paralelogramoaren azalera da.',
            '$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$: el producto de la diagonal principal menos el de la secundaria. Su valor absoluto es el área del paralelogramo de las columnas.',
            '$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$: حاصل القطر الرئيسي ناقص حاصل الثانوي. وقيمته المطلقة مساحة متوازي الأضلاع الذي يكوّنه العمودان.',
            '$\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc$: the product of the main diagonal minus that of the other one. Its absolute value is the area of the parallelogram of the columns.'
        ),
        figure: (language) => <ParallelogramFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'sarrus',
        stage: 'orders',
        title: say('Sarrusen erregela', 'La regla de Sarrus', 'قاعدة ساروس', 'Sarrus\' rule'),
        goal: say('3. ordenako determinanteak Sarrusen erregelaz kalkulatzea: hiru biderkadura batzen eta hiru kentzen.', 'Calcular determinantes de orden 3 con la regla de Sarrus: tres productos que suman y tres que restan.', 'حساب محددات الرتبة 3 بقاعدة ساروس: ثلاثة حواصل تُجمع وثلاثة تُطرح.', 'Work out determinants of order 3 with Sarrus\' rule: three products added and three subtracted.'),
        problem: say('Kalkulatu $\\begin{vmatrix}1&2&0\\\\3&1&2\\\\1&0&4\\end{vmatrix}$.', 'Calcula $\\begin{vmatrix}1&2&0\\\\3&1&2\\\\1&0&4\\end{vmatrix}$.', 'احسب $\\begin{vmatrix}1&2&0\\\\3&1&2\\\\1&0&4\\end{vmatrix}$.', 'Work out $\\begin{vmatrix}1&2&0\\\\3&1&2\\\\1&0&4\\end{vmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Diagonal nagusia eta haren bi triangeluak: batzen dira.', 'La diagonal principal y sus dos triángulos: suman.', 'القطر الرئيسي ومثلثاه: تُجمع.', 'The main diagonal and its two triangles: they add.'), math: same('$1\\cdot 1\\cdot 4+2\\cdot 2\\cdot 1+0\\cdot 3\\cdot 0=8$') },
            { text: say('Beste diagonala eta haren bi triangeluak: kentzen dira.', 'La otra diagonal y sus dos triángulos: restan.', 'القطر الآخر ومثلثاه: تُطرح.', 'The other diagonal and its two triangles: they subtract.'), math: same('$0\\cdot 1\\cdot 1+2\\cdot 3\\cdot 4+1\\cdot 2\\cdot 0=24$') },
            { text: say('Kendu bata bestetik.', 'Resta una de otra.', 'اطرح أحدهما من الآخر.', 'Subtract one from the other.'), math: same('$8-24=-16$') }
        ],
        takeaway: say(
            'Sarrus: diagonal nagusiaren eta haren bi triangeluen biderkadurak batzen dira; beste diagonalarenak eta haren triangeluenak kentzen dira. 3. ordenarako bakarrik balio du.',
            'Sarrus: suman los productos de la diagonal principal y de sus dos triángulos; restan los de la otra diagonal y sus triángulos. Solo sirve para orden 3.',
            'ساروس: تُجمع حواصل القطر الرئيسي ومثلثيه، وتُطرح حواصل القطر الآخر ومثلثيه. ولا تصلح إلا للرتبة 3.',
            'Sarrus: the products of the main diagonal and its two triangles are added; those of the other diagonal and its triangles are subtracted. It only works for order 3.'
        ),
        figure: (language) => <SarrusFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'zero-det',
        stage: 'orders',
        title: say('Noiz da zero', 'Cuándo vale cero', 'متى يساوي صفرًا', 'When it is zero'),
        goal: say('Determinante bat 0 dela kalkulatu gabe ikustea: zeroko lerroa, lerro berdinak edo proportzionalak, edo konbinazio lineala.', 'Ver sin calcular que un determinante vale 0: línea de ceros, líneas iguales o proporcionales, o una combinación lineal.', 'رؤية أن محددًا يساوي صفرًا دون حساب: خط أصفار، أو خطان متساويان أو متناسبان، أو تركيب خطي.', 'See without working it out that a determinant is 0: a line of zeros, equal or proportional lines, or a linear combination.'),
        needs: [matrices('linear-dependence', { eu: 'Beste batzuen menpeko errenkadak', es: 'Filas que dependen de otras', en: 'Rows that depend on others', ar: 'صفوف تعتمد على غيرها' })],
        problem: say('Zenbat da $\\begin{vmatrix}1&2&3\\\\2&4&6\\\\5&1&0\\end{vmatrix}$, kalkulatu gabe?', '¿Cuánto vale $\\begin{vmatrix}1&2&3\\\\2&4&6\\\\5&1&0\\end{vmatrix}$ sin calcular?', 'كم يساوي $\\begin{vmatrix}1&2&3\\\\2&4&6\\\\5&1&0\\end{vmatrix}$ دون حساب؟', 'What is $\\begin{vmatrix}1&2&3\\\\2&4&6\\\\5&1&0\\end{vmatrix}$ without working it out?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konparatu errenkadak: bigarrena lehenaren bikoitza da.', 'Compara las filas: la segunda es el doble de la primera.', 'قارن الصفوف: الثاني ضعف الأول.', 'Compare the rows: the second is twice the first.'), math: same('$E_2=2E_1$') },
            { text: say('Errenkada proportzionalak: determinantea 0 da.', 'Filas proporcionales: el determinante es 0.', 'صفان متناسبان: المحدد صفر.', 'Proportional rows: the determinant is 0.'), math: same('$|A|=0$') },
            { text: say('Sarrusekin egiaztatzen da: bi zatiak berdinak dira.', 'Con Sarrus se comprueba: las dos partes son iguales.', 'يُتحقق بساروس: الجزآن متساويان.', 'Sarrus confirms it: the two parts are equal.'), math: same('$66-66=0$') }
        ],
        takeaway: say(
            '$|A|=0$ da lerro bat zeroz beteta dagoenean, bi berdinak edo proportzionalak direnean, edo bat besteen konbinazio lineala denean: hau da, heina maximoa ez denean.',
            '$|A|=0$ si una línea es de ceros, si dos son iguales o proporcionales o si una es combinación lineal de las otras: es decir, si el rango no es máximo.',
            '$|A|=0$ إذا كان خط أصفارًا، أو كان خطان متساويين أو متناسبين، أو كان أحدها تركيبًا خطيًا من الأخرى: أي إذا لم تكن الرتبة عظمى.',
            '$|A|=0$ if a line is all zeros, if two are equal or proportional, or if one is a linear combination of the others: that is, if the rank is not full.'
        ),
        figure: (language) => <FlatFigure language={language} />
    },

    /* ---------- 2. Properties ---------- */
    {
        id: 'transpose-swap',
        stage: 'properties',
        title: say('Iraulia eta errenkaden trukea', 'Traspuesta y cambio de filas', 'المنقول وتبديل الصفوف', 'Transpose and swapping rows'),
        goal: say('$|A^t|=|A|$ dela jakitea, eta bi lerro trukatzeak determinantearen zeinua aldatzen duela.', 'Saber que $|A^t|=|A|$ y que cambiar dos líneas cambia el signo del determinante.', 'معرفة أن $|A^t|=|A|$ وأن تبديل خطين يغيّر إشارة المحدد.', 'Know that $|A^t|=|A|$ and that swapping two lines changes the sign of the determinant.'),
        problem: say('$\\begin{vmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{vmatrix}=4$ bada, kalkulatu $\\begin{vmatrix}d&e&f\\\\a&b&c\\\\g&h&i\\end{vmatrix}$ eta $\\begin{vmatrix}a&d&g\\\\b&e&h\\\\c&f&i\\end{vmatrix}$.', 'Si $\\begin{vmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{vmatrix}=4$, calcula $\\begin{vmatrix}d&e&f\\\\a&b&c\\\\g&h&i\\end{vmatrix}$ y $\\begin{vmatrix}a&d&g\\\\b&e&h\\\\c&f&i\\end{vmatrix}$.', 'إذا كان $\\begin{vmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{vmatrix}=4$ فاحسب $\\begin{vmatrix}d&e&f\\\\a&b&c\\\\g&h&i\\end{vmatrix}$ و$\\begin{vmatrix}a&d&g\\\\b&e&h\\\\c&f&i\\end{vmatrix}$.', 'If $\\begin{vmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{vmatrix}=4$, work out $\\begin{vmatrix}d&e&f\\\\a&b&c\\\\g&h&i\\end{vmatrix}$ and $\\begin{vmatrix}a&d&g\\\\b&e&h\\\\c&f&i\\end{vmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenak $E_1$ eta $E_2$ trukatzen ditu: zeinua aldatzen da.', 'El primero cambia $E_1$ y $E_2$: cambia el signo.', 'الأول يبادل $E_1$ و$E_2$: تتغير الإشارة.', 'The first swaps $E_1$ and $E_2$: the sign changes.'), math: same('$-4$') },
            { text: say('Bigarrena iraulia da: ez da aldatzen.', 'El segundo es la traspuesta: no cambia.', 'الثاني هو المنقول: لا يتغير.', 'The second is the transpose: it does not change.'), math: same('$4$') },
            { text: say('Bi truke egiten badira, zeinua bi aldiz aldatzen da, eta hasierakoa itzultzen da.', 'Con dos cambios de filas, el signo cambia dos veces y vuelve.', 'مع تبديلين للصفوف تتغير الإشارة مرتين وتعود.', 'With two swaps of rows, the sign changes twice and comes back.'), math: same('$(-1)\\cdot(-1)\\cdot 4=4$') }
        ],
        takeaway: say(
            '$|A^t|=|A|$: errenkadetarako balio duena zutabeetarako ere balio du. Bi errenkada (edo bi zutabe) trukatzeak determinantearen zeinua aldatzen du.',
            '$|A^t|=|A|$: lo que vale para filas vale para columnas. Cambiar dos filas (o dos columnas) entre sí cambia el signo del determinante.',
            '$|A^t|=|A|$: ما يصح للصفوف يصح للأعمدة. وتبديل صفين (أو عمودين) يغيّر إشارة المحدد.',
            '$|A^t|=|A|$: what holds for rows holds for columns. Swapping two rows (or two columns) changes the sign of the determinant.'
        ),
        figure: (language) => <SwapFigure language={language} />
    },
    {
        id: 'scale-row',
        stage: 'properties',
        title: say('Lerro bat zenbaki batez biderkatzea', 'Multiplicar una línea por un número', 'ضرب خط في عدد', 'Multiplying a line by a number'),
        goal: say('Lerro bat $k$ zenbakiaz biderkatzeak determinantea $k$ zenbakiaz biderkatzen duela jakitea, eta $|kA|=k^n|A|$ erabiltzea.', 'Saber que multiplicar una línea por $k$ multiplica el determinante por $k$, y usar $|kA|=k^n|A|$.', 'معرفة أن ضرب خط في $k$ يضرب المحدد في $k$، واستعمال $|kA|=k^n|A|$.', 'Know that multiplying a line by $k$ multiplies the determinant by $k$, and use $|kA|=k^n|A|$.'),
        problem: say('$A$ matrizea $3\\times 3$ da, eta $|A|=2$. Kalkulatu $|3A|$.', '$A$ es $3\\times 3$ y $|A|=2$. Calcula $|3A|$.', '$A$ من الأبعاد $3\\times 3$ و$|A|=2$. احسب $|3A|$.', '$A$ is $3\\times 3$ and $|A|=2$. Work out $|3A|$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$3A$ matrizeak hiru errenkadak 3 zenbakiaz biderkatzen ditu.', '$3A$ multiplica por 3 las tres filas.', '$3A$ تضرب الصفوف الثلاثة في 3.', '$3A$ multiplies the three rows by 3.') },
            { text: say('Errenkada bakoitzetik 3 bat ateratzen da.', 'De cada fila sale un 3.', 'يخرج 3 من كل صف.', 'A 3 comes out of each row.'), math: same('$|3A|=3\\cdot 3\\cdot 3\\cdot|A|$') },
            { text: say('Hau da emaitza.', 'Este es el resultado.', 'هذا هو الناتج.', 'This is the result.'), math: same('$3^3\\cdot 2=54$') }
        ],
        takeaway: say(
            'Lerro bat $k$ zenbakiaz biderkatzean, determinantea $k$ zenbakiaz biderkatzen da; horregatik, lerro baten faktore komuna kanpora atera daiteke. $n$ ordenan, $|kA|=k^n|A|$.',
            'Si se multiplica una línea por $k$, el determinante queda multiplicado por $k$; por eso el factor común de una línea puede salir fuera. En orden $n$, $|kA|=k^n|A|$.',
            'إذا ضُرب خط في $k$ ضُرب المحدد في $k$؛ ولذلك يمكن إخراج العامل المشترك لخط. وفي الرتبة $n$ يكون $|kA|=k^n|A|$.',
            'If a line is multiplied by $k$, the determinant is multiplied by $k$; that is why the common factor of a line can come out. In order $n$, $|kA|=k^n|A|$.'
        ),
        figure: (language) => <ScaleFigure language={language} />
    },
    {
        id: 'add-multiple',
        stage: 'properties',
        title: say('Lerro bati beste baten multiplo bat batzea', 'Sumar a una línea un múltiplo de otra', 'إضافة مضاعف خط إلى آخر', 'Adding a multiple of another line'),
        goal: say('Determinanteak zeroak eginez kalkulatzea, haren balioa aldatzen ez duen eragiketarekin, eta matrize triangeluar baten determinantea diagonala dela erabiltzea.', 'Calcular determinantes haciendo ceros con la operación que no cambia su valor, y usar que el de una matriz triangular es el producto de la diagonal.', 'حساب المحددات بجعل أصفار بالعملية التي لا تغيّر قيمتها، واستعمال أن محدد المصفوفة المثلثية حاصل ضرب قطرها.', 'Work out determinants by making zeros with the operation that does not change their value, and use that a triangular one is the product of its diagonal.'),
        needs: [matrices('rank-gauss', { eu: 'Heina Gaussen metodoaz', es: 'El rango por el método de Gauss', en: 'Rank by Gaussian elimination', ar: 'الرتبة بطريقة غاوس' })],
        problem: say('Kalkulatu $\\begin{vmatrix}1&2&1\\\\2&5&3\\\\-1&1&4\\end{vmatrix}$, zeroak eginez.', 'Calcula $\\begin{vmatrix}1&2&1\\\\2&5&3\\\\-1&1&4\\end{vmatrix}$ haciendo ceros.', 'احسب $\\begin{vmatrix}1&2&1\\\\2&5&3\\\\-1&1&4\\end{vmatrix}$ بجعل أصفار.', 'Work out $\\begin{vmatrix}1&2&1\\\\2&5&3\\\\-1&1&4\\end{vmatrix}$ by making zeros.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$E_2-2E_1$ eta $E_3+E_1$: zeroak lehen zutabean.', '$E_2-2E_1$ y $E_3+E_1$: ceros en la primera columna.', '$E_2-2E_1$ و$E_3+E_1$: أصفار في العمود الأول.', '$E_2-2E_1$ and $E_3+E_1$: zeros in the first column.'), math: same('$\\begin{vmatrix}1&2&1\\\\0&1&1\\\\0&3&5\\end{vmatrix}$') },
            { text: say('$E_3-3E_2$: triangeluarra da.', '$E_3-3E_2$: queda triangular.', '$E_3-3E_2$: تصير مثلثية.', '$E_3-3E_2$: it becomes triangular.'), math: same('$\\begin{vmatrix}1&2&1\\\\0&1&1\\\\0&0&2\\end{vmatrix}$') },
            { text: say('Biderkatu diagonala.', 'Multiplica la diagonal.', 'اضرب القطر.', 'Multiply the diagonal.'), math: same('$1\\cdot 1\\cdot 2=2$') }
        ],
        takeaway: say(
            'Lerro bati beste baten multiplo bat batzeak ez du determinantea aldatzen. Horrela egiten dira zeroak, Gaussen metodoan bezala, eta matrize triangeluar baten determinantea diagonaleko biderkadura da.',
            'Sumar a una línea un múltiplo de otra no cambia el determinante. Así se hacen ceros, como en Gauss, y el determinante de una matriz triangular es el producto de su diagonal.',
            'إضافة مضاعف خط إلى آخر لا تغيّر المحدد. هكذا نجعل أصفارًا كما في غاوس، ومحدد المصفوفة المثلثية حاصل ضرب قطرها.',
            'Adding a multiple of one line to another does not change the determinant. That is how you make zeros, as in Gauss, and the determinant of a triangular matrix is the product of its diagonal.'
        ),
        figure: (language) => <ShearFigure language={language} />
    },
    {
        id: 'product-det',
        stage: 'properties',
        title: say('Biderkaduraren determinantea', 'El determinante del producto', 'محدد الجداء', 'The determinant of a product'),
        goal: say('$|AB|=|A||B|$, $|A^{-1}|=\\frac{1}{|A|}$ eta $|A^n|=|A|^n$ erabiltzea, eta $|A+B|\\neq|A|+|B|$ dela jakitea.', 'Usar $|AB|=|A||B|$, $|A^{-1}|=\\frac{1}{|A|}$ y $|A^n|=|A|^n$, y saber que $|A+B|\\neq|A|+|B|$.', 'استعمال $|AB|=|A||B|$ و$|A^{-1}|=\\frac{1}{|A|}$ و$|A^n|=|A|^n$، ومعرفة أن $|A+B|\\neq|A|+|B|$.', 'Use $|AB|=|A||B|$, $|A^{-1}|=\\frac{1}{|A|}$ and $|A^n|=|A|^n$, and know that $|A+B|\\neq|A|+|B|$.'),
        needs: [matrices('matrix-product', { eu: 'Matrizeen biderkadura', es: 'El producto de matrices', en: 'Multiplying matrices', ar: 'ضرب المصفوفات' })],
        problem: say('$|A|=3$ eta $|B|=-2$ dira, 3. ordenakoak. Kalkulatu $|AB|$, $|A^{-1}|$ eta $|2B^t|$.', 'Si $|A|=3$ y $|B|=-2$ (orden 3), calcula $|AB|$, $|A^{-1}|$ y $|2B^t|$.', 'إذا كان $|A|=3$ و$|B|=-2$ (الرتبة 3) فاحسب $|AB|$ و$|A^{-1}|$ و$|2B^t|$.', 'If $|A|=3$ and $|B|=-2$ (order 3), work out $|AB|$, $|A^{-1}|$ and $|2B^t|$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkaduraren determinantea.', 'El determinante del producto.', 'محدد الجداء.', 'The determinant of the product.'), math: same('$|AB|=3\\cdot(-2)=-6$') },
            { text: say('Alderantzizkoarena: $|A|\\cdot|A^{-1}|=1$.', 'El de la inversa: $|A|\\cdot|A^{-1}|=1$.', 'محدد المعكوس: $|A|\\cdot|A^{-1}|=1$.', 'That of the inverse: $|A|\\cdot|A^{-1}|=1$.'), math: same('$|A^{-1}|=\\frac{1}{3}$') },
            { text: say('Irauliak ez du aldatzen, eta 2 zenbakia hiru errenkadetatik ateratzen da.', 'La traspuesta no lo cambia y el 2 sale de las tres filas.', 'النقل لا يغيّره، و2 يخرج من الصفوف الثلاثة.', 'The transpose does not change it and the 2 comes out of the three rows.'), math: same('$|2B^t|=2^3\\cdot(-2)=-16$') }
        ],
        takeaway: say(
            '$|AB|=|A|\\cdot|B|$, $|A^{-1}|=\\frac{1}{|A|}$ eta $|A^n|=|A|^n$. Baturarekin ez: oro har, $|A+B|\\neq|A|+|B|$.',
            '$|AB|=|A|\\cdot|B|$, $|A^{-1}|=\\frac{1}{|A|}$ y $|A^n|=|A|^n$. Con la suma no: en general, $|A+B|\\neq|A|+|B|$.',
            '$|AB|=|A|\\cdot|B|$ و$|A^{-1}|=\\frac{1}{|A|}$ و$|A^n|=|A|^n$. أما مع المجموع فلا: عمومًا $|A+B|\\neq|A|+|B|$.',
            '$|AB|=|A|\\cdot|B|$, $|A^{-1}|=\\frac{1}{|A|}$ and $|A^n|=|A|^n$. Not with the sum: in general, $|A+B|\\neq|A|+|B|$.'
        ),
        figure: (language) => <ChainFigure language={language} />
    },

    /* ---------- 3. Minors and cofactors ---------- */
    {
        id: 'minors-cofactors',
        stage: 'expansion',
        title: say('Menore osagarria eta adjuntua', 'Menor complementario y adjunto', 'المحدد الأصغر والمتمم الجبري', 'Minors and cofactors'),
        goal: say('Elementu baten menorea (haren errenkada eta zutabea kenduta) eta adjuntua (menorea bere zeinuarekin) kalkulatzea.', 'Calcular el menor de un elemento (sin su fila ni su columna) y su adjunto (el menor con su signo).', 'حساب المحدد الأصغر لعنصر (دون صفه وعموده) ومتممه الجبري (المحدد الأصغر بإشارته).', 'Work out the minor of an entry (without its row and column) and its cofactor (the minor with its sign).'),
        problem: say('$A=\\begin{pmatrix}2&1&3\\\\0&4&1\\\\5&2&1\\end{pmatrix}$ matrizean, aurkitu $a_{12}$ elementuaren menorea eta adjuntua.', 'En $A=\\begin{pmatrix}2&1&3\\\\0&4&1\\\\5&2&1\\end{pmatrix}$, halla el menor y el adjunto de $a_{12}$.', 'في $A=\\begin{pmatrix}2&1&3\\\\0&4&1\\\\5&2&1\\end{pmatrix}$ أوجد المحدد الأصغر والمتمم الجبري لـ $a_{12}$.', 'In $A=\\begin{pmatrix}2&1&3\\\\0&4&1\\\\5&2&1\\end{pmatrix}$, find the minor and the cofactor of $a_{12}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezabatu 1. errenkada eta 2. zutabea.', 'Tacha la fila 1 y la columna 2.', 'احذف الصف 1 والعمود 2.', 'Strike out row 1 and column 2.'), math: same('$M_{12}=\\begin{vmatrix}0&1\\\\5&1\\end{vmatrix}=-5$') },
            { text: say('Zeinua: $1+2=3$ bakoitia da.', 'Signo: $1+2=3$ es impar.', 'الإشارة: $1+2=3$ فردي.', 'Sign: $1+2=3$ is odd.'), math: same('$(-1)^{1+2}=-1$') },
            { text: say('Adjuntua menorea da, zeinuarekin.', 'El adjunto es el menor con su signo.', 'المتمم الجبري هو المحدد الأصغر بإشارته.', 'The cofactor is the minor with its sign.'), math: same('$A_{12}=(-1)\\cdot(-5)=5$') }
        ],
        takeaway: say(
            '$a_{ij}$ elementuaren menore osagarria, $M_{ij}$, haren errenkada eta zutabea kenduta geratzen den determinantea da. Adjuntua $A_{ij}=(-1)^{i+j}M_{ij}$ da: zeinuak xake-taula batean bezala txandakatzen dira.',
            'El menor complementario $M_{ij}$ de $a_{ij}$ es el determinante sin su fila y su columna. El adjunto es $A_{ij}=(-1)^{i+j}M_{ij}$: los signos se alternan como en un tablero de ajedrez.',
            'المحدد الأصغر $M_{ij}$ لـ $a_{ij}$ هو المحدد دون صفه وعموده. والمتمم الجبري هو $A_{ij}=(-1)^{i+j}M_{ij}$: تتناوب الإشارات كما في رقعة الشطرنج.',
            'The minor $M_{ij}$ of $a_{ij}$ is the determinant without its row and column. The cofactor is $A_{ij}=(-1)^{i+j}M_{ij}$: the signs alternate as on a chessboard.'
        ),
        figure: (language) => <CheckerboardFigure language={language} />
    },
    {
        id: 'laplace',
        stage: 'expansion',
        title: say('Errenkada edo zutabe baten araberako garapena', 'Desarrollo por una fila o una columna', 'النشر حسب صف أو عمود', 'Expanding along a row or a column'),
        goal: say('Determinante bat lerro baten arabera garatzea, haren elementuak bider adjuntuak batuz, eta zero gehien dituen lerroa aukeratzea.', 'Desarrollar un determinante por una línea, sumando sus elementos por sus adjuntos, y elegir la línea con más ceros.', 'نشر محدد حسب خط بجمع عناصره مضروبة في متمماتها الجبرية، واختيار الخط الذي فيه أكثر الأصفار.', 'Expand a determinant along a line, adding its entries times their cofactors, and choose the line with the most zeros.'),
        problem: say('Kalkulatu $\\begin{vmatrix}3&0&1\\\\2&0&4\\\\1&5&2\\end{vmatrix}$ 2. zutabearen arabera.', 'Calcula $\\begin{vmatrix}3&0&1\\\\2&0&4\\\\1&5&2\\end{vmatrix}$ desarrollando por la columna 2.', 'احسب $\\begin{vmatrix}3&0&1\\\\2&0&4\\\\1&5&2\\end{vmatrix}$ بالنشر حسب العمود 2.', 'Work out $\\begin{vmatrix}3&0&1\\\\2&0&4\\\\1&5&2\\end{vmatrix}$ by expanding along column 2.'),
        stepsKind: 'steps',
        steps: [
            { text: say('2. zutabeak bi zero ditu: $a_{32}=5$ elementuak bakarrik balio du.', 'La columna 2 tiene dos ceros: solo cuenta $a_{32}=5$.', 'العمود 2 فيه صفران: لا يُحسب إلا $a_{32}=5$.', 'Column 2 has two zeros: only $a_{32}=5$ counts.'), math: same('$|A|=0\\cdot A_{12}+0\\cdot A_{22}+5\\cdot A_{32}$') },
            { text: say('$3+2$ bakoitia: adjuntua, menorea zeinua aldatuta.', '$3+2$ es impar: el adjunto es el menor cambiado de signo.', '$3+2$ فردي: المتمم الجبري هو المحدد الأصغر بإشارة معاكسة.', '$3+2$ is odd: the cofactor is the minor with its sign changed.'), math: same('$A_{32}=-\\begin{vmatrix}3&1\\\\2&4\\end{vmatrix}=-10$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$|A|=5\\cdot(-10)=-50$') }
        ],
        takeaway: say(
            '$|A|$ lerro bateko (errenkada edo zutabe) elementuak bider haien adjuntuen batura da. Aukeratu zero gehien dituen lerroa: zero bakoitzak determinante bat aurrezten du.',
            '$|A|$ es la suma de los elementos de una línea (fila o columna) por sus adjuntos. Elige la línea con más ceros: cada cero ahorra un determinante.',
            '$|A|$ هو مجموع عناصر خط (صف أو عمود) مضروبة في متمماتها الجبرية. اختر الخط الذي فيه أكثر الأصفار: كل صفر يوفّر محددًا.',
            '$|A|$ is the sum of the entries of a line (row or column) times their cofactors. Choose the line with the most zeros: each zero saves a determinant.'
        ),
        figure: (language) => <ExpansionFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'order-four',
        stage: 'expansion',
        title: say('4. ordenako determinanteak', 'Determinantes de orden 4', 'محددات الرتبة 4', 'Determinants of order 4'),
        goal: say('4. ordenako determinanteak kalkulatzea: zeroak egin lerro batean, eta haren arabera garatu.', 'Calcular determinantes de orden 4: hacer ceros en una línea y desarrollar por ella.', 'حساب محددات الرتبة 4: جعل أصفار في خط ثم النشر حسبه.', 'Work out determinants of order 4: make zeros in a line and expand along it.'),
        problem: say('Kalkulatu $\\begin{vmatrix}1&2&0&1\\\\0&1&2&0\\\\2&4&1&3\\\\0&3&0&1\\end{vmatrix}$.', 'Calcula $\\begin{vmatrix}1&2&0&1\\\\0&1&2&0\\\\2&4&1&3\\\\0&3&0&1\\end{vmatrix}$.', 'احسب $\\begin{vmatrix}1&2&0&1\\\\0&1&2&0\\\\2&4&1&3\\\\0&3&0&1\\end{vmatrix}$.', 'Work out $\\begin{vmatrix}1&2&0&1\\\\0&1&2&0\\\\2&4&1&3\\\\0&3&0&1\\end{vmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$E_3-2E_1$: lehen zutabea $(1,0,0,0)$ bihurtzen da.', '$E_3-2E_1$: la primera columna queda $(1,0,0,0)$.', '$E_3-2E_1$: يصير العمود الأول $(1,0,0,0)$.', '$E_3-2E_1$: the first column becomes $(1,0,0,0)$.'), math: same('$\\begin{vmatrix}1&2&0&1\\\\0&1&2&0\\\\0&0&1&1\\\\0&3&0&1\\end{vmatrix}$') },
            { text: say('Garatu 1. zutabearen arabera: 3. ordenako bakarra geratzen da.', 'Desarrolla por la columna 1: queda uno solo de orden 3.', 'انشر حسب العمود 1: يبقى محدد واحد من الرتبة 3.', 'Expand along column 1: a single one of order 3 is left.'), math: same('$|A|=1\\cdot\\begin{vmatrix}1&2&0\\\\0&1&1\\\\3&0&1\\end{vmatrix}$') },
            { text: say('Sarrus.', 'Sarrus.', 'ساروس.', 'Sarrus.'), math: same('$|A|=(1+6+0)-(0+0+0)=7$') }
        ],
        takeaway: say(
            '4. ordenan edo gehiagoan, egin zeroak lerro batean ($|A|$ aldatu gabe), eta garatu lerro horren arabera: urrats bakoitzak ordena bat jaisten du. Sarrusek 3. ordenarako bakarrik balio du.',
            'En orden 4 o más, haz ceros en una línea (sin cambiar $|A|$) y desarrolla por ella: cada paso baja un orden. Sarrus solo vale para orden 3.',
            'في الرتبة 4 أو أكثر اجعل أصفارًا في خط (دون تغيير $|A|$) وانشر حسبه: كل خطوة تُنقص الرتبة واحدًا. ولا يصلح ساروس إلا للرتبة 3.',
            'In order 4 or more, make zeros in a line (without changing $|A|$) and expand along it: each step lowers the order by one. Sarrus only works for order 3.'
        )
    },
    {
        id: 'det-equations',
        stage: 'expansion',
        title: say('Ekuazioak determinanteekin', 'Ecuaciones con determinantes', 'معادلات بالمحددات', 'Equations with determinants'),
        goal: say('$x$ barruan duen determinante bat zerora berdinduz ebaztea, erro nabariak lehenik bilatuz.', 'Resolver una ecuación igualando a cero un determinante con $x$ dentro, buscando antes las raíces evidentes.', 'حل معادلة بمساواة محدد فيه $x$ بالصفر، مع البحث أولًا عن الجذور الواضحة.', 'Solve an equation by setting a determinant with $x$ inside equal to zero, looking for the obvious roots first.'),
        problem: say('Ebatzi $\\begin{vmatrix}x&1&1\\\\1&x&1\\\\1&1&x\\end{vmatrix}=0$.', 'Resuelve $\\begin{vmatrix}x&1&1\\\\1&x&1\\\\1&1&x\\end{vmatrix}=0$.', 'حُلّ $\\begin{vmatrix}x&1&1\\\\1&x&1\\\\1&1&x\\end{vmatrix}=0$.', 'Solve $\\begin{vmatrix}x&1&1\\\\1&x&1\\\\1&1&x\\end{vmatrix}=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x=1$ denean, hiru errenkadak berdinak dira: $x=1$ erroa da.', 'Con $x=1$ las tres filas son iguales: $x=1$ es raíz.', 'مع $x=1$ تتساوى الصفوف الثلاثة: $x=1$ جذر.', 'With $x=1$ the three rows are equal: $x=1$ is a root.') },
            { text: say('Sarrus erabili.', 'Aplica Sarrus.', 'طبّق ساروس.', 'Apply Sarrus.'), math: same('$x^3+1+1-x-x-x=x^3-3x+2$') },
            { text: say('Faktorizatu, $x=1$ erroa jakinda.', 'Factoriza sabiendo que $x=1$ es raíz.', 'حلّل مع العلم أن $x=1$ جذر.', 'Factorise, knowing that $x=1$ is a root.'), math: same('$(x-1)^2(x+2)=0\\ \\to\\ x=1,\\ x=-2$') }
        ],
        takeaway: say(
            'Determinanteak $x$ badu, polinomio bat ateratzen da: berdindu zerora. Bilatu lehenik bi lerro berdin edo proportzional egiten dituzten balioak: erro seguruak dira.',
            'Si el determinante tiene una $x$, sale un polinomio: iguálalo a cero. Busca primero los valores que hacen dos líneas iguales o proporcionales: son raíces seguras.',
            'إذا كان في المحدد $x$ ينتج كثير حدود: ساوِه بالصفر. وابحث أولًا عن القيم التي تجعل خطين متساويين أو متناسبين: إنها جذور مؤكدة.',
            'If the determinant has an $x$, you get a polynomial: set it equal to zero. First look for the values that make two lines equal or proportional: they are sure roots.'
        ),
        figure: (language) => <RootsCurveFigure language={language} kind="cubic" />,
        figureAfterSteps: true
    },

    /* ---------- 4. Rank by minors ---------- */
    {
        id: 'rank-by-minors',
        stage: 'rank',
        title: say('Heina menoreekin', 'El rango con menores', 'الرتبة بالمحددات الصغرى', 'Rank with minors'),
        goal: say('Matrize baten heina 0 ez den menorerik handienaren ordena dela erabiltzea, menoreak orlatuz.', 'Hallar el rango como el orden del mayor menor distinto de 0, orlando menores.', 'إيجاد الرتبة على أنها رتبة أكبر محدد أصغر غير صفري، بتطويق المحددات الصغرى.', 'Find the rank as the order of the largest minor that is not 0, by bordering minors.'),
        needs: [matrices('rank-gauss', { eu: 'Heina Gaussen metodoaz', es: 'El rango por el método de Gauss', en: 'Rank by Gaussian elimination', ar: 'الرتبة بطريقة غاوس' })],
        problem: say('Kalkulatu $\\begin{pmatrix}1&2&3\\\\2&4&1\\\\3&6&4\\end{pmatrix}$ matrizearen heina menoreekin.', 'Calcula el rango de $\\begin{pmatrix}1&2&3\\\\2&4&1\\\\3&6&4\\end{pmatrix}$ con menores.', 'احسب رتبة $\\begin{pmatrix}1&2&3\\\\2&4&1\\\\3&6&4\\end{pmatrix}$ بالمحددات الصغرى.', 'Find the rank of $\\begin{pmatrix}1&2&3\\\\2&4&1\\\\3&6&4\\end{pmatrix}$ with minors.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bilatu 0 ez den 2. ordenako menore bat.', 'Busca un menor de orden 2 distinto de 0.', 'ابحث عن محدد أصغر من الرتبة 2 غير صفري.', 'Find a minor of order 2 that is not 0.'), math: same('$\\begin{vmatrix}2&3\\\\4&1\\end{vmatrix}=-10\\neq 0$') },
            { text: say('Orlatu: 3. ordenako menore bakarra dago, $|A|$, eta 0 da ($E_3=E_1+E_2$).', 'Órlalo: solo hay un menor de orden 3, $|A|$, y vale 0 ($E_3=E_1+E_2$).', 'طوّقه: يوجد محدد أصغر واحد من الرتبة 3 هو $|A|$، وقيمته 0 ($E_3=E_1+E_2$).', 'Border it: there is only one minor of order 3, $|A|$, and it is 0 ($E_3=E_1+E_2$).'), math: same('$|A|=0$') },
            { text: say('Heina 2 da.', 'El rango es 2.', 'الرتبة 2.', 'The rank is 2.'), math: same('$\\operatorname{rg}(A)=2$') }
        ],
        takeaway: say(
            'Heina 0 ez den menorerik handienaren ordena da. Aurkitu 0 ez den 2. ordenako menore bat, eta orlatu: hura duten 3. ordenako menore guztiak 0 badira, heina 2 da.',
            'El rango es el orden del mayor menor distinto de 0. Busca un menor de orden 2 que no sea 0 y órlalo: si todos los de orden 3 que lo contienen valen 0, el rango es 2.',
            'الرتبة هي رتبة أكبر محدد أصغر غير صفري. ابحث عن محدد أصغر من الرتبة 2 غير صفري وطوّقه: إذا كانت كل المحددات من الرتبة 3 التي تحتويه أصفارًا فالرتبة 2.',
            'The rank is the order of the largest minor that is not 0. Find a minor of order 2 that is not 0 and border it: if all those of order 3 containing it are 0, the rank is 2.'
        ),
        figure: (language) => <BorderFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'rank-parameter-minors',
        stage: 'rank',
        title: say('Heina parametro baten arabera, menoreekin', 'El rango según un parámetro, con menores', 'الرتبة حسب وسيط بالمحددات الصغرى', 'Rank with a parameter, using minors'),
        goal: say('Parametro bat duen matrize baten heina aztertzea, $|A|=0$ ekuaziotik balio kritikoak aterata.', 'Estudiar el rango de una matriz con un parámetro sacando los valores críticos de $|A|=0$.', 'دراسة رتبة مصفوفة فيها وسيط باستخراج القيم الحرجة من $|A|=0$.', 'Study the rank of a matrix with a parameter by finding the critical values from $|A|=0$.'),
        needs: [matrices('rank-parameter', { eu: 'Heina parametro baten arabera', es: 'El rango según un parámetro', en: 'Rank depending on a parameter', ar: 'الرتبة حسب وسيط' })],
        problem: say('Aztertu $\\begin{pmatrix}1&1&1\\\\1&a&1\\\\1&1&a\\end{pmatrix}$ matrizearen heina, $a$ parametroaren arabera.', 'Estudia el rango de $\\begin{pmatrix}1&1&1\\\\1&a&1\\\\1&1&a\\end{pmatrix}$ según $a$.', 'ادرس رتبة $\\begin{pmatrix}1&1&1\\\\1&a&1\\\\1&1&a\\end{pmatrix}$ حسب $a$.', 'Study the rank of $\\begin{pmatrix}1&1&1\\\\1&a&1\\\\1&1&a\\end{pmatrix}$ for the values of $a$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kalkulatu $|A|$, parametroa barruan dela.', 'Calcula $|A|$ con el parámetro dentro.', 'احسب $|A|$ والوسيط في الداخل.', 'Work out $|A|$ with the parameter inside.'), math: same('$|A|=a^2-2a+1=(a-1)^2$') },
            { text: say('$a\\neq 1$ denean, $|A|\\neq 0$: heina 3 da.', 'Si $a\\neq 1$, $|A|\\neq 0$: el rango es 3.', 'إذا كان $a\\neq 1$ فإن $|A|\\neq 0$: الرتبة 3.', 'If $a\\neq 1$, $|A|\\neq 0$: the rank is 3.'), math: same('$a\\neq 1\\ \\to\\ \\operatorname{rg}=3$') },
            { text: say('$a=1$ denean, hiru errenkadak berdinak dira: heina 1 da.', 'Con $a=1$ las tres filas son iguales: el rango es 1.', 'مع $a=1$ تتساوى الصفوف الثلاثة: الرتبة 1.', 'With $a=1$ the three rows are equal: the rank is 1.'), math: same('$a=1\\ \\to\\ \\operatorname{rg}=1$') }
        ],
        takeaway: say(
            'Kalkulatu $|A|$, parametroa barruan dela, eta berdindu zerora. Parametroa erroa ez denean, heina maximoa da; erro bakoitzerako, aztertu matrizea aparte.',
            'Calcula $|A|$ con el parámetro dentro e iguálalo a 0. Si el parámetro no es una raíz, el rango es máximo; para cada raíz, estudia la matriz aparte.',
            'احسب $|A|$ والوسيط في الداخل وساوِه بالصفر. إذا لم يكن الوسيط جذرًا فالرتبة عظمى؛ ولكل جذر ادرس المصفوفة على حدة.',
            'Work out $|A|$ with the parameter inside and set it equal to 0. If the parameter is not a root, the rank is full; for each root, study the matrix separately.'
        ),
        figure: (language) => <RootsCurveFigure language={language} kind="square" />
    },

    /* ---------- 5. The inverse with cofactors ---------- */
    {
        id: 'adjugate-inverse',
        stage: 'inverse',
        title: say('Alderantzizkoa matrize adjuntuarekin', 'La inversa con la matriz adjunta', 'المعكوس بالمصفوفة المرافقة', 'The inverse with the adjugate'),
        goal: say('Alderantzizko matrizea kalkulatzea $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$ formularekin.', 'Calcular la matriz inversa con $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$.', 'حساب المصفوفة المعكوسة بالصيغة $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$.', 'Find the inverse matrix with $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$.'),
        needs: [matrices('gauss-jordan', { eu: 'Alderantzizkoa Gauss-Jordan metodoaz', es: 'La inversa por Gauss-Jordan', en: 'The inverse by Gauss–Jordan', ar: 'المعكوس بطريقة غاوس-جوردان' })],
        problem: say('Kalkulatu $A=\\begin{pmatrix}1&2&0\\\\0&1&1\\\\1&0&1\\end{pmatrix}$ matrizearen alderantzizkoa.', 'Halla la inversa de $A=\\begin{pmatrix}1&2&0\\\\0&1&1\\\\1&0&1\\end{pmatrix}$.', 'أوجد معكوس $A=\\begin{pmatrix}1&2&0\\\\0&1&1\\\\1&0&1\\end{pmatrix}$.', 'Find the inverse of $A=\\begin{pmatrix}1&2&0\\\\0&1&1\\\\1&0&1\\end{pmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Determinantea: 0 ez bada, alderantzizkoa dago.', 'El determinante: si no es 0, hay inversa.', 'المحدد: إذا لم يكن صفرًا يوجد معكوس.', 'The determinant: if it is not 0, there is an inverse.'), math: same('$|A|=3\\neq 0$') },
            { text: say('Adjuntu guztiak, bakoitza bere lekuan.', 'Todos los adjuntos, cada uno en su sitio.', 'كل المتممات الجبرية، كل في موضعه.', 'All the cofactors, each in its place.'), math: same('$\\operatorname{Adj}(A)=\\begin{pmatrix}1&1&-1\\\\-2&1&2\\\\2&-1&1\\end{pmatrix}$') },
            { text: say('Irauli eta zatitu $|A|=3$ zenbakiaz.', 'Traspón y divide entre $|A|=3$.', 'انقل واقسم على $|A|=3$.', 'Transpose and divide by $|A|=3$.'), math: same('$A^{-1}=\\frac{1}{3}\\begin{pmatrix}1&-2&2\\\\1&1&-1\\\\-1&2&1\\end{pmatrix}$') }
        ],
        takeaway: say(
            '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: adjuntuen matrizea, irauli eta $|A|$ zenbakiaz zatitu. $|A|\\neq 0$ denean bakarrik dago.',
            '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: matriz de adjuntos, traspuesta y dividida entre $|A|$. Solo existe si $|A|\\neq 0$.',
            '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: مصفوفة المتممات الجبرية، منقولة ومقسومة على $|A|$. ولا يوجد إلا إذا كان $|A|\\neq 0$.',
            '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: the matrix of cofactors, transposed and divided by $|A|$. It exists only if $|A|\\neq 0$.'
        ),
        figure: (language) => <AdjugateFigure language={language} />
    },
    {
        id: 'inverse-parameter',
        stage: 'inverse',
        title: say('Alderantzizkoa parametro baten arabera', 'La inversa según un parámetro', 'المعكوس حسب وسيط', 'The inverse with a parameter'),
        goal: say('Parametro bat duen matrize batek noiz duen alderantzizkoa erabakitzea, $|A|\\neq 0$ baldintzarekin.', 'Decidir para qué valores de un parámetro tiene inversa una matriz, con la condición $|A|\\neq 0$.', 'تقرير قيم الوسيط التي يكون فيها لمصفوفة معكوس، بالشرط $|A|\\neq 0$.', 'Decide for which values of a parameter a matrix has an inverse, with the condition $|A|\\neq 0$.'),
        needs: [matrices('inverse-definition', { eu: 'Alderantzizko matrizea', es: 'La matriz inversa', en: 'The inverse matrix', ar: 'المصفوفة المعكوسة' })],
        problem: say('Zein $m$ baliotarako du alderantzizkoa $A=\\begin{pmatrix}m&1&1\\\\1&m&1\\\\0&0&1\\end{pmatrix}$ matrizeak?', '¿Para qué valores de $m$ tiene inversa $A=\\begin{pmatrix}m&1&1\\\\1&m&1\\\\0&0&1\\end{pmatrix}$?', 'لأي قيم لـ $m$ يكون لـ $A=\\begin{pmatrix}m&1&1\\\\1&m&1\\\\0&0&1\\end{pmatrix}$ معكوس؟', 'For which values of $m$ does $A=\\begin{pmatrix}m&1&1\\\\1&m&1\\\\0&0&1\\end{pmatrix}$ have an inverse?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Garatu 3. errenkadaren arabera: bi zero ditu.', 'Desarrolla por la fila 3: tiene dos ceros.', 'انشر حسب الصف 3: فيه صفران.', 'Expand along row 3: it has two zeros.'), math: same('$|A|=1\\cdot\\begin{vmatrix}m&1\\\\1&m\\end{vmatrix}=m^2-1$') },
            { text: say('Berdindu zerora.', 'Iguala a cero.', 'ساوِ بالصفر.', 'Set it equal to zero.'), math: same('$m^2-1=0\\ \\to\\ m=\\pm 1$') },
            { text: say('Alderantzizkoa du $m$ zenbakia ez denean ez 1 ez $-1$.', 'Tiene inversa cuando $m$ no es ni 1 ni $-1$.', 'لها معكوس عندما لا يكون $m$ مساويًا 1 ولا $-1$.', 'It has an inverse when $m$ is neither 1 nor $-1$.'), math: same('$m\\neq 1,\\ m\\neq -1$') }
        ],
        takeaway: say(
            '$A$ matrizeak alderantzizkoa du, baldin eta $|A|\\neq 0$ bada bakarrik. Parametro batekin: kalkulatu $|A|$, berdindu zerora, eta ateratzen diren balioak dira alderantzizkorik gabeko bakarrak.',
            '$A$ tiene inversa si y solo si $|A|\\neq 0$. Con un parámetro: calcula $|A|$, iguálalo a cero, y los valores que salen son los únicos sin inversa.',
            'لـ $A$ معكوس إذا وفقط إذا كان $|A|\\neq 0$. ومع وسيط: احسب $|A|$ وساوِه بالصفر، فالقيم الناتجة هي الوحيدة دون معكوس.',
            '$A$ has an inverse if and only if $|A|\\neq 0$. With a parameter: work out $|A|$, set it equal to zero, and the values you get are the only ones with no inverse.'
        ),
        figure: (language) => <RootsCurveFigure language={language} kind="parabola" />,
        figureAfterSteps: true
    },
    {
        id: 'det-matrix-equations',
        stage: 'inverse',
        title: say('Determinanteak eta matrize-ekuazioak', 'Determinantes y ecuaciones matriciales', 'المحددات والمعادلات المصفوفية', 'Determinants and matrix equations'),
        goal: say('$X$ matrize ezezagunaren determinantea aurkitzea, matrize-ekuazio baten bi aldeetan determinanteak hartuta.', 'Hallar el determinante de una matriz incógnita $X$ tomando determinantes en los dos miembros de una ecuación matricial.', 'إيجاد محدد مصفوفة مجهولة $X$ بأخذ المحددات في طرفي معادلة مصفوفية.', 'Find the determinant of an unknown matrix $X$ by taking determinants on both sides of a matrix equation.'),
        needs: [matrices('matrix-equations', { eu: 'Matrize bat askatzea', es: 'Despejar una matriz', en: 'Solving for a matrix', ar: 'استخراج مصفوفة مجهولة' })],
        problem: say('$AXB=C$ da, $|A|=2$, $|B|=-3$ eta $|C|=12$ izanik (2. ordena). Zenbat da $|X|$?', 'Si $AXB=C$ con $|A|=2$, $|B|=-3$ y $|C|=12$ (orden 2), ¿cuánto vale $|X|$?', 'إذا كان $AXB=C$ مع $|A|=2$ و$|B|=-3$ و$|C|=12$ (الرتبة 2) فكم يساوي $|X|$؟', 'If $AXB=C$ with $|A|=2$, $|B|=-3$ and $|C|=12$ (order 2), what is $|X|$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hartu determinanteak bi aldeetan.', 'Toma determinantes en los dos miembros.', 'خذ المحددات في الطرفين.', 'Take determinants on both sides.'), math: same('$|A|\\cdot|X|\\cdot|B|=|C|$') },
            { text: say('Ordeztu zenbakiak.', 'Sustituye los números.', 'عوّض الأعداد.', 'Put in the numbers.'), math: same('$2\\cdot|X|\\cdot(-3)=12$') },
            { text: say('Askatu.', 'Despeja.', 'استخرج.', 'Solve.'), math: same('$|X|=\\frac{12}{-6}=-2$') }
        ],
        takeaway: say(
            '$|X|$ aurkitzeko ez dago $X$ kalkulatu beharrik: hartu determinanteak bi aldeetan, eta erabili $|AB|=|A||B|$ eta $|kA|=k^n|A|$.',
            'Para hallar $|X|$ no hace falta $X$: toma determinantes en los dos miembros y usa $|AB|=|A||B|$ y $|kA|=k^n|A|$.',
            'لإيجاد $|X|$ لا حاجة إلى $X$: خذ المحددات في الطرفين واستعمل $|AB|=|A||B|$ و$|kA|=k^n|A|$.',
            'To find $|X|$ you do not need $X$: take determinants on both sides and use $|AB|=|A||B|$ and $|kA|=k^n|A|$.'
        )
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const determinanteakTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...determinanteakLessonTexts[topic.id as DeterminanteakTopicId], ...determinanteakLessonChecks[topic.id as DeterminanteakTopicId] }))
