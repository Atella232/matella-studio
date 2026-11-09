import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    CombinationFigure,
    CommuteFigure,
    GaussJordanFigure,
    GraphFigure,
    InverseFigure,
    MatrixAnatomyFigure,
    MatrixSystemFigure,
    MatrixTypesFigure,
    OrderFigure,
    PowerCycleFigure,
    RankLineFigure,
    RankStairsFigure,
    RowColumnFigure,
    SidesFigure,
    SumFigure,
    TransposeFigure
} from './figures'
import { matrizeakLessonChecks, type MatrizeakTopicId } from './lessonChecks'
import { matrizeakLessonTexts } from './lessonTexts'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 · Zientziak — stages and lessons. The scope
   follows unit 1 of Santillana 2.º Bachillerato Ciencias (matrices and
   their kinds, the transpose, operations, the product, rank by Gauss, the
   inverse by Gauss–Jordan, matrix equations, powers) and unit 1 of Anaya
   Matemáticas II (linear dependence of rows, graphs, commuting matrices).
   The inverse is found here only by Gauss–Jordan and the rank only by
   Gauss: determinants come in the next unit. Rows are E₁, E₂… in every
   language, as in 1.º Bachillerato. All the exercises and numbers are ours.
   ========================================================================== */

export type MatrizeakStageId = 'basics' | 'operations' | 'rank' | 'inverse' | 'equations'

export const matrizeakStages: UnitStage[] = [
    { id: 'basics', tone: 'blue', title: { eu: 'Matrizeak eta motak', es: 'Matrices y sus tipos', en: 'Matrices and their kinds', ar: 'المصفوفات وأنواعها' } },
    { id: 'operations', tone: 'violet', title: { eu: 'Eragiketak matrizeekin', es: 'Operaciones con matrices', en: 'Operations with matrices', ar: 'العمليات على المصفوفات' } },
    { id: 'rank', tone: 'mustard', title: { eu: 'Matrize baten heina', es: 'El rango de una matriz', en: 'The rank of a matrix', ar: 'رتبة المصفوفة' } },
    { id: 'inverse', tone: 'coral', title: { eu: 'Alderantzizkoa eta berreturak', es: 'Inversa y potencias', en: 'Inverse and powers', ar: 'المعكوس والقوى' } },
    { id: 'equations', tone: 'green', title: { eu: 'Matrize-ekuazioak', es: 'Ecuaciones matriciales', en: 'Matrix equations', ar: 'المعادلات المصفوفية' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Matrices and their kinds ---------- */
    {
        id: 'what-is-a-matrix',
        stage: 'basics',
        title: say('Matrizeak: errenkadak eta zutabeak', 'Matrices: filas y columnas', 'المصفوفات: الصفوف والأعمدة', 'Matrices: rows and columns'),
        goal: say('Zenbaki-taula bat matrize gisa irakurtzea, haren dimentsioa ematea eta elementu bat errenkadaren eta zutabearen bidez aurkitzea.', 'Leer una tabla de números como una matriz, dar su dimensión y encontrar un elemento por su fila y su columna.', 'قراءة جدول أعداد على أنه مصفوفة، وإعطاء أبعادها، وإيجاد عنصر بصفه وعموده.', 'Read a table of numbers as a matrix, give its size and find an entry by its row and its column.'),
        needs: [
            { unit: 'batx1-zientziak/sistemas', topic: 'augmented-matrix', title: { eu: 'Matrize zabaldua', es: 'La matriz ampliada', en: 'The augmented matrix', ar: 'المصفوفة الموسعة' } }
        ],
        problem: say(
            'Eman $A=\\begin{pmatrix}2&-1&0\\\\5&3&7\\end{pmatrix}$ matrizearen dimentsioa eta $a_{23}$ elementua.',
            'Da la dimensión de $A=\\begin{pmatrix}2&-1&0\\\\5&3&7\\end{pmatrix}$ y su elemento $a_{23}$.',
            'أعطِ أبعاد $A=\\begin{pmatrix}2&-1&0\\\\5&3&7\\end{pmatrix}$ وعنصرها $a_{23}$.',
            'Give the size of $A=\\begin{pmatrix}2&-1&0\\\\5&3&7\\end{pmatrix}$ and its entry $a_{23}$.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbatu errenkadak (horizontalak) eta zutabeak (bertikalak): 2 eta 3.', 'Cuenta las filas (horizontales) y las columnas (verticales): 2 y 3.', 'عُدّ الصفوف (الأفقية) والأعمدة (الرأسية): 2 و3.', 'Count the rows (across) and the columns (down): 2 and 3.'), math: same('$2\\times 3$') },
            { text: say('$a_{23}$ elementua bigarren errenkadan eta hirugarren zutabean dago.', '$a_{23}$ está en la fila 2 y la columna 3.', '$a_{23}$ في الصف 2 والعمود 3.', '$a_{23}$ is in row 2 and column 3.'), math: same('$a_{23}=7$') },
            { text: say('$a_{32}$ elementua ez dago: $A$ matrizeak ez du hirugarren errenkadarik.', '$a_{32}$ no existe: $A$ no tiene fila 3.', '$a_{32}$ غير موجود: ليس لـ $A$ صف ثالث.', '$a_{32}$ does not exist: $A$ has no row 3.') }
        ],
        takeaway: say(
            '$m\\times n$ matrize batek $m$ errenkada eta $n$ zutabe ditu. $a_{ij}$ elementua $i$ errenkadan eta $j$ zutabean dago: lehenik errenkada, gero zutabea.',
            'Una matriz $m\\times n$ tiene $m$ filas y $n$ columnas. El elemento $a_{ij}$ está en la fila $i$ y la columna $j$: primero la fila, después la columna.',
            'للمصفوفة $m\\times n$ عدد $m$ من الصفوف و$n$ من الأعمدة. والعنصر $a_{ij}$ في الصف $i$ والعمود $j$: الصف أولًا ثم العمود.',
            'An $m\\times n$ matrix has $m$ rows and $n$ columns. The entry $a_{ij}$ is in row $i$ and column $j$: row first, then column.'
        ),
        figure: (language) => <MatrixAnatomyFigure language={language} />
    },
    {
        id: 'matrix-types',
        stage: 'basics',
        title: say('Matrize motak', 'Tipos de matrices', 'أنواع المصفوفات', 'Kinds of matrices'),
        goal: say('Errenkada-, zutabe-, matrize karratu, nulu, triangeluar, diagonal, eskalar eta identitate-matrizeak ezagutzea.', 'Reconocer las matrices fila, columna, cuadrada, nula, triangular, diagonal, escalar e identidad.', 'تمييز مصفوفات الصف والعمود والمربعة والصفرية والمثلثية والقطرية والسلمية والمحايدة.', 'Recognise row, column, square, zero, triangular, diagonal, scalar and identity matrices.'),
        problem: say('Nolakoa da $\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&2\\end{pmatrix}$?', '¿De qué tipo es $\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&2\\end{pmatrix}$?', 'ما نوع $\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&2\\end{pmatrix}$؟', 'What kind of matrix is $\\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&2\\end{pmatrix}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Karratua da, $3\\times 3$; beraz, diagonal nagusia du.', 'Es cuadrada, $3\\times 3$, así que tiene diagonal principal.', 'إنها مربعة $3\\times 3$، إذن لها قطر رئيسي.', 'It is square, $3\\times 3$, so it has a main diagonal.'), math: same('$a_{11},\\ a_{22},\\ a_{33}$') },
            { text: say('Diagonaletik kanpo dena 0 da: diagonala da.', 'Fuera de la diagonal todo es 0: es diagonal.', 'كل ما خارج القطر 0: إنها قطرية.', 'Everything off the diagonal is 0: it is diagonal.') },
            { text: say('Diagonaleko hiru zenbakiak berdinak dira: eskalarra da, $2I$.', 'Los tres números de la diagonal son iguales: es escalar, $2I$.', 'أعداد القطر الثلاثة متساوية: إنها سلمية، $2I$.', 'The three numbers on the diagonal are equal: it is scalar, $2I$.') }
        ],
        takeaway: say(
            'Matrize karratu batean, begiratu diagonal nagusiari: triangeluarra, alde batean zeroak badaude; diagonala, bi aldeetan badaude; eskalarra, gainera diagonala berdina bada; $I$, diagonala batekoz osatuta badago.',
            'En una matriz cuadrada mira la diagonal principal: triangular si hay ceros a un lado, diagonal si los hay a los dos, escalar si además la diagonal es igual e $I$ si la diagonal es de unos.',
            'في المصفوفة المربعة انظر إلى القطر الرئيسي: مثلثية إذا كانت الأصفار في جانب، وقطرية إذا كانت في الجانبين، وسلمية إذا تساوى القطر أيضًا، و$I$ إذا كان القطر آحادًا.',
            'In a square matrix look at the main diagonal: triangular if there are zeros on one side, diagonal if on both, scalar if the diagonal is also constant, and $I$ if the diagonal is all ones.'
        ),
        figure: (language) => <MatrixTypesFigure language={language} />
    },
    {
        id: 'transpose-symmetric',
        stage: 'basics',
        title: say('Iraulia eta matrize simetrikoak', 'Traspuesta y matrices simétricas', 'المنقول والمصفوفات المتماثلة', 'The transpose and symmetric matrices'),
        goal: say('Matrize bat iraultzea (errenkadak zutabe bihurtuz) eta matrize simetrikoak eta antisimetrikoak ezagutzea.', 'Trasponer una matriz (las filas pasan a columnas) y reconocer las matrices simétricas y antisimétricas.', 'نقل مصفوفة (تصير الصفوف أعمدة) وتمييز المصفوفات المتماثلة والمتماثلة تخالفيًا.', 'Transpose a matrix (rows become columns) and recognise symmetric and skew-symmetric matrices.'),
        problem: say('Kalkulatu $A=\\begin{pmatrix}1&4&0\\\\-2&3&5\\end{pmatrix}$ matrizearen iraulia.', 'Halla la traspuesta de $A=\\begin{pmatrix}1&4&0\\\\-2&3&5\\end{pmatrix}$.', 'أوجد منقول $A=\\begin{pmatrix}1&4&0\\\\-2&3&5\\end{pmatrix}$.', 'Find the transpose of $A=\\begin{pmatrix}1&4&0\\\\-2&3&5\\end{pmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$A$ matrizearen lehen errenkada $A^t$ matrizearen lehen zutabea da.', 'La primera fila de $A$ es la primera columna de $A^t$.', 'الصف الأول من $A$ هو العمود الأول من $A^t$.', 'The first row of $A$ is the first column of $A^t$.'), math: same('$(1,\\ 4,\\ 0)$') },
            { text: say('Bigarren errenkada bigarren zutabea da.', 'La segunda fila es la segunda columna.', 'الصف الثاني هو العمود الثاني.', 'The second row is the second column.'), math: same('$(-2,\\ 3,\\ 5)$') },
            { text: say('$A$ matrizea $2\\times 3$ zen; $A^t$ matrizea $3\\times 2$ da.', '$A$ era $2\\times 3$; $A^t$ es $3\\times 2$.', 'كانت $A$ من الأبعاد $2\\times 3$؛ و$A^t$ من الأبعاد $3\\times 2$.', '$A$ was $2\\times 3$; $A^t$ is $3\\times 2$.'), math: same('$A^t=\\begin{pmatrix}1&-2\\\\4&3\\\\0&5\\end{pmatrix}$') }
        ],
        takeaway: say(
            '$A^t$ matrizeak errenkadak eta zutabeak trukatzen ditu: $A$ matrizea $m\\times n$ bada, $A^t$ matrizea $n\\times m$ da. $A$ simetrikoa da $A^t=A$ bada, eta antisimetrikoa $A^t=-A$ bada (diagonala zeroz beteta).',
            '$A^t$ cambia filas por columnas: si $A$ es $m\\times n$, $A^t$ es $n\\times m$. $A$ es simétrica si $A^t=A$ y antisimétrica si $A^t=-A$ (con la diagonal de ceros).',
            '$A^t$ يبادل الصفوف والأعمدة: إذا كانت $A$ من الأبعاد $m\\times n$ كانت $A^t$ من الأبعاد $n\\times m$. و$A$ متماثلة إذا كان $A^t=A$، ومتماثلة تخالفيًا إذا كان $A^t=-A$ (وقطرها أصفار).',
            '$A^t$ swaps rows and columns: if $A$ is $m\\times n$, $A^t$ is $n\\times m$. $A$ is symmetric if $A^t=A$ and skew-symmetric if $A^t=-A$ (with zeros on the diagonal).'
        ),
        figure: (language) => <TransposeFigure language={language} />
    },

    /* ---------- 2. Operations with matrices ---------- */
    {
        id: 'sum-scalar',
        stage: 'operations',
        title: say('Batuketa eta zenbaki batez biderkatzea', 'Suma y producto por un número', 'الجمع والضرب في عدد', 'Adding and multiplying by a number'),
        goal: say('Dimentsio bereko matrizeak batzea eta kentzea, eta matrize bat zenbaki batez biderkatzea.', 'Sumar y restar matrices de la misma dimensión y multiplicar una matriz por un número.', 'جمع مصفوفات لها الأبعاد نفسها وطرحها، وضرب مصفوفة في عدد.', 'Add and subtract matrices of the same size and multiply a matrix by a number.'),
        problem: say('Kalkulatu $2A-B$, $A=\\begin{pmatrix}1&3\\\\0&-2\\end{pmatrix}$ eta $B=\\begin{pmatrix}4&1\\\\-3&5\\end{pmatrix}$ badira.', 'Calcula $2A-B$ con $A=\\begin{pmatrix}1&3\\\\0&-2\\end{pmatrix}$ y $B=\\begin{pmatrix}4&1\\\\-3&5\\end{pmatrix}$.', 'احسب $2A-B$ مع $A=\\begin{pmatrix}1&3\\\\0&-2\\end{pmatrix}$ و$B=\\begin{pmatrix}4&1\\\\-3&5\\end{pmatrix}$.', 'Work out $2A-B$ with $A=\\begin{pmatrix}1&3\\\\0&-2\\end{pmatrix}$ and $B=\\begin{pmatrix}4&1\\\\-3&5\\end{pmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu $A$ matrizearen elementu guztiak 2 zenbakiaz.', 'Multiplica por 2 todos los elementos de $A$.', 'اضرب كل عناصر $A$ في 2.', 'Multiply every entry of $A$ by 2.'), math: same('$2A=\\begin{pmatrix}2&6\\\\0&-4\\end{pmatrix}$') },
            { text: say('Kendu elementuz elementu.', 'Resta elemento a elemento.', 'اطرح عنصرًا عنصرًا.', 'Subtract entry by entry.'), math: same('$\\begin{pmatrix}2-4&6-1\\\\0+3&-4-5\\end{pmatrix}$') },
            { text: say('Hau da emaitza.', 'Este es el resultado.', 'هذا هو الناتج.', 'This is the result.'), math: same('$2A-B=\\begin{pmatrix}-2&5\\\\3&-9\\end{pmatrix}$') }
        ],
        takeaway: say(
            'Matrizeak elementuz elementu batu eta kentzen dira, eta dimentsio berekoak badira bakarrik. $kA$ matrizean, $k$ zenbakiak elementu guztiak biderkatzen ditu.',
            'Las matrices se suman y se restan elemento a elemento, y solo si tienen la misma dimensión. En $kA$, el número $k$ multiplica todos los elementos.',
            'تُجمع المصفوفات وتُطرح عنصرًا عنصرًا، وبشرط أن تكون لها الأبعاد نفسها. وفي $kA$ يضرب العدد $k$ كل العناصر.',
            'Matrices are added and subtracted entry by entry, and only if they have the same size. In $kA$, the number $k$ multiplies every entry.'
        ),
        figure: (language) => <SumFigure language={language} />
    },
    {
        id: 'matrix-product',
        stage: 'operations',
        title: say('Matrizeen biderkadura', 'El producto de matrices', 'ضرب المصفوفات', 'Multiplying matrices'),
        goal: say('Matrizeak errenkada bider zutabe biderkatzea, noiz egin daitekeen eta emaitzaren dimentsioa zein den jakinda.', 'Multiplicar matrices fila por columna, sabiendo cuándo se puede y qué dimensión tiene el resultado.', 'ضرب المصفوفات صفًّا في عمود، مع معرفة متى يمكن ذلك وما أبعاد الناتج.', 'Multiply matrices row by column, knowing when it can be done and what size the result is.'),
        problem: say('Kalkulatu $AB$, $A=\\begin{pmatrix}1&2&0\\\\3&-1&4\\end{pmatrix}$ eta $B=\\begin{pmatrix}2&1\\\\0&3\\\\1&-2\\end{pmatrix}$ badira.', 'Calcula $AB$ con $A=\\begin{pmatrix}1&2&0\\\\3&-1&4\\end{pmatrix}$ y $B=\\begin{pmatrix}2&1\\\\0&3\\\\1&-2\\end{pmatrix}$.', 'احسب $AB$ مع $A=\\begin{pmatrix}1&2&0\\\\3&-1&4\\end{pmatrix}$ و$B=\\begin{pmatrix}2&1\\\\0&3\\\\1&-2\\end{pmatrix}$.', 'Work out $AB$ with $A=\\begin{pmatrix}1&2&0\\\\3&-1&4\\end{pmatrix}$ and $B=\\begin{pmatrix}2&1\\\\0&3\\\\1&-2\\end{pmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Begiratu dimentsioei: $A$ matrizeak 3 zutabe ditu, eta $B$ matrizeak 3 errenkada. Emaitza $2\\times 2$ da.', 'Mira las dimensiones: $A$ tiene 3 columnas y $B$, 3 filas. El resultado es $2\\times 2$.', 'انظر إلى الأبعاد: لـ $A$ ثلاثة أعمدة ولـ $B$ ثلاثة صفوف. والناتج $2\\times 2$.', 'Look at the sizes: $A$ has 3 columns and $B$ has 3 rows. The result is $2\\times 2$.'), math: same('$(2\\times 3)(3\\times 2)\\ \\to\\ 2\\times 2$') },
            { text: say('$c_{21}$: $A$ matrizearen 2. errenkada bider $B$ matrizearen 1. zutabea.', '$c_{21}$: fila 2 de $A$ por columna 1 de $B$.', '$c_{21}$: الصف 2 من $A$ في العمود 1 من $B$.', '$c_{21}$: row 2 of $A$ times column 1 of $B$.'), math: same('$c_{21}=3\\cdot 2+(-1)\\cdot 0+4\\cdot 1=10$') },
            { text: say('Gauza bera beste hiru elementuekin.', 'Lo mismo con los otros tres elementos.', 'وكذلك مع العناصر الثلاثة الأخرى.', 'The same with the other three entries.'), math: same('$AB=\\begin{pmatrix}2&7\\\\10&-8\\end{pmatrix}$') }
        ],
        takeaway: say(
            '$c_{ij}$ elementua $A$ matrizearen $i$ errenkada bider $B$ matrizearen $j$ zutabea da: banan-banan biderkatu eta batu. $(m\\times n)(n\\times p)$ biderkadurak $m\\times p$ ematen du; erdiko zenbakiak berdinak ez badira, ezin da biderkatu.',
            '$c_{ij}$ es la fila $i$ de $A$ por la columna $j$ de $B$: se multiplican uno a uno y se suman. $(m\\times n)(n\\times p)$ da $m\\times p$; si los números del medio no coinciden, no se puede multiplicar.',
            '$c_{ij}$ هو الصف $i$ من $A$ في العمود $j$ من $B$: نضرب واحدًا في واحد ثم نجمع. و$(m\\times n)(n\\times p)$ يعطي $m\\times p$؛ وإذا لم يتساوَ العددان في الوسط فلا يمكن الضرب.',
            '$c_{ij}$ is row $i$ of $A$ times column $j$ of $B$: multiply them one by one and add. $(m\\times n)(n\\times p)$ gives $m\\times p$; if the middle numbers do not match, you cannot multiply.'
        ),
        figure: (language) => <RowColumnFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'product-properties',
        stage: 'operations',
        title: say('Biderkaduraren propietateak', 'Propiedades del producto', 'خواص الضرب', 'Properties of the product'),
        goal: say('Biderkaduraren zein propietate betetzen diren (elkarkorra, banatzailea, $I$) eta zein ez (trukakorra) jakitea.', 'Saber qué propiedades cumple el producto (asociativa, distributiva, $I$) y cuál no (conmutativa).', 'معرفة الخواص التي يحققها الضرب (التجميع والتوزيع و$I$) والتي لا يحققها (التبديل).', 'Know which properties the product has (associative, distributive, $I$) and which it lacks (commutative).'),
        problem: say('Egiaztatu $AB=BA$ den, $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ eta $B=\\begin{pmatrix}2&0\\\\1&3\\end{pmatrix}$ badira.', 'Comprueba si $AB=BA$ con $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ y $B=\\begin{pmatrix}2&0\\\\1&3\\end{pmatrix}$.', 'تحقق هل $AB=BA$ مع $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ و$B=\\begin{pmatrix}2&0\\\\1&3\\end{pmatrix}$.', 'Check whether $AB=BA$ with $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ and $B=\\begin{pmatrix}2&0\\\\1&3\\end{pmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kalkulatu $AB$, errenkada bider zutabe.', 'Calcula $AB$, fila por columna.', 'احسب $AB$ صفًّا في عمود.', 'Work out $AB$, row by column.'), math: same('$AB=\\begin{pmatrix}3&3\\\\1&3\\end{pmatrix}$') },
            { text: say('Kalkulatu $BA$, beste ordenan.', 'Calcula $BA$, en el otro orden.', 'احسب $BA$ بالترتيب الآخر.', 'Work out $BA$, in the other order.'), math: same('$BA=\\begin{pmatrix}2&2\\\\1&4\\end{pmatrix}$') },
            { text: say('Desberdinak dira: $AB\\neq BA$. Ordenak garrantzia du.', 'Son distintas: $AB\\neq BA$. El orden importa.', 'هما مختلفتان: $AB\\neq BA$. الترتيب مهم.', 'They are different: $AB\\neq BA$. The order matters.') }
        ],
        takeaway: say(
            'Matrizeen biderkadura ez da trukakorra: oro har, $AB\\neq BA$. Hauek bai, betetzen dira: $A(BC)=(AB)C$, $A(B+C)=AB+AC$ eta $AI=IA=A$.',
            'El producto de matrices no es conmutativo: en general, $AB\\neq BA$. Sí se cumplen $A(BC)=(AB)C$, $A(B+C)=AB+AC$ y $AI=IA=A$.',
            'ضرب المصفوفات ليس تبديليًا: عمومًا $AB\\neq BA$. لكن تتحقق $A(BC)=(AB)C$ و$A(B+C)=AB+AC$ و$AI=IA=A$.',
            'The matrix product is not commutative: in general, $AB\\neq BA$. These do hold: $A(BC)=(AB)C$, $A(B+C)=AB+AC$ and $AI=IA=A$.'
        ),
        figure: (language) => <OrderFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'matrix-applications',
        stage: 'operations',
        title: say('Matrizeak problemetan', 'Matrices en los problemas', 'المصفوفات في المسائل', 'Matrices in problems'),
        goal: say('Problema baten datuak matrize gisa idaztea eta biderkadura interpretatzea: kostu-taulak eta grafoak.', 'Escribir los datos de un problema como matrices e interpretar el producto: tablas de costes y grafos.', 'كتابة معطيات مسألة على شكل مصفوفات وتفسير الجداء: جداول التكاليف والبيانات.', 'Write the data of a problem as matrices and read the product: cost tables and graphs.'),
        problem: say(
            'Bi dendak ogi-barrak eta pastelak erosten dituzte: lehenak 20 eta 5, bigarrenak 30 eta 10. M hornitzaileak barra 1 € eta pastela 3 € saltzen ditu; N hornitzaileak, 2 € eta 2 €. Zenbat ordaintzen du denda bakoitzak hornitzaile bakoitzarekin?',
            'Dos tiendas compran barras de pan y pasteles: la primera, 20 y 5; la segunda, 30 y 10. El proveedor M cobra 1 € la barra y 3 € el pastel; el proveedor N, 2 € y 2 €. ¿Cuánto paga cada tienda con cada proveedor?',
            'يشتري متجران أرغفة خبز وكعكات: الأول 20 و5، والثاني 30 و10. يبيع المورد M الرغيف بـ 1 € والكعكة بـ 3 €، والمورد N بـ 2 € و2 €. كم يدفع كل متجر مع كل مورد؟',
            'Two shops buy loaves and cakes: the first, 20 and 5; the second, 30 and 10. Supplier M charges €1 a loaf and €3 a cake; supplier N, €2 and €2. How much does each shop pay with each supplier?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('$Q$: dendak × produktuak. $P$: produktuak × hornitzaileak. $Q$ matrizearen zutabeak eta $P$ matrizearen errenkadak produktuak dira.', '$Q$: tiendas × productos. $P$: productos × proveedores. Las columnas de $Q$ y las filas de $P$ son los productos.', '$Q$: المتاجر × المنتجات. $P$: المنتجات × الموردون. أعمدة $Q$ وصفوف $P$ هي المنتجات.', '$Q$: shops × products. $P$: products × suppliers. The columns of $Q$ and the rows of $P$ are the products.'), math: same('$Q=\\begin{pmatrix}20&5\\\\30&10\\end{pmatrix}\\qquad P=\\begin{pmatrix}1&2\\\\3&2\\end{pmatrix}$') },
            { text: say('Biderkatu: $QP$ biderkadurak dendak × hornitzaileak ematen ditu.', 'Multiplica: $QP$ da tiendas × proveedores.', 'اضرب: $QP$ يعطي المتاجر × الموردين.', 'Multiply: $QP$ gives shops × suppliers.'), math: same('$QP=\\begin{pmatrix}35&50\\\\60&80\\end{pmatrix}$') },
            { text: say('Irakurri: lehen dendak 35 € ordaintzen ditu M hornitzailearekin eta 50 € N hornitzailearekin; M merkeagoa da.', 'Lee: la primera tienda paga 35 € con M y 50 € con N; le sale más barato M.', 'اقرأ: يدفع المتجر الأول 35 € مع M و50 € مع N؛ فـ M أرخص له.', 'Read it: the first shop pays €35 with M and €50 with N; M is cheaper for it.') }
        ],
        takeaway: say(
            'Biderkadurak zentzua izan dezan, lehen matrizearen zutabeek eta bigarrenaren errenkadek gauza bera izendatu behar dute. Grafo batean, $a_{ij}=1$ $i$ erpinetik $j$ erpinera gezi bat badago, eta $A^2$ matrizeak bi urratseko bideak zenbatzen ditu.',
            'Para que el producto tenga sentido, las columnas de la primera matriz y las filas de la segunda tienen que nombrar lo mismo. En un grafo, $a_{ij}=1$ si hay flecha del vértice $i$ al $j$, y $A^2$ cuenta los caminos de dos pasos.',
            'لكي يكون للجداء معنى يجب أن تسمّي أعمدة المصفوفة الأولى وصفوف الثانية الشيء نفسه. وفي البيان $a_{ij}=1$ إذا وُجد سهم من الرأس $i$ إلى $j$، و$A^2$ تعدّ المسارات ذات الخطوتين.',
            'For the product to make sense, the columns of the first matrix and the rows of the second must name the same things. In a graph, $a_{ij}=1$ if there is an arrow from vertex $i$ to $j$, and $A^2$ counts the two-step paths.'
        ),
        figure: (language) => <GraphFigure language={language} />
    },

    /* ---------- 3. The rank of a matrix ---------- */
    {
        id: 'linear-dependence',
        stage: 'rank',
        title: say('Beste batzuen menpeko errenkadak', 'Filas que dependen de otras', 'صفوف تعتمد على غيرها', 'Rows that depend on others'),
        goal: say('Errenkada bat beste batzuen konbinazio lineala den (menpekoa) edo ez den (independentea) erabakitzea.', 'Decidir si una fila es combinación lineal de otras (dependiente) o no (independiente).', 'تقرير هل صفّ تركيب خطي من صفوف أخرى (مرتبط) أو لا (مستقل).', 'Decide whether a row is a linear combination of others (dependent) or not (independent).'),
        needs: [
            { unit: 'batx1-zientziak/vectores', topic: 'linear-combination', title: { eu: 'Konbinazio lineala', es: 'Combinación lineal', en: 'Linear combinations', ar: 'التركيب الخطي' } }
        ],
        problem: say('$\\begin{pmatrix}1&2&-1\\\\3&0&2\\\\5&4&0\\end{pmatrix}$ matrizean, hirugarren errenkada beste bien konbinazio lineala al da?', 'En $\\begin{pmatrix}1&2&-1\\\\3&0&2\\\\5&4&0\\end{pmatrix}$, ¿es la tercera fila combinación lineal de las otras dos?', 'في $\\begin{pmatrix}1&2&-1\\\\3&0&2\\\\5&4&0\\end{pmatrix}$ هل الصف الثالث تركيب خطي من الصفين الآخرين؟', 'In $\\begin{pmatrix}1&2&-1\\\\3&0&2\\\\5&4&0\\end{pmatrix}$, is the third row a linear combination of the other two?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bilatu $a$ eta $b$, $E_3=aE_1+bE_2$ izan dadin. Bigarren zutabean, $E_2$ errenkadak 0 du: $4=2a$.', 'Busca $a$ y $b$ con $E_3=aE_1+bE_2$. En la segunda columna $E_2$ tiene un 0: $4=2a$.', 'ابحث عن $a$ و$b$ بحيث $E_3=aE_1+bE_2$. في العمود الثاني لـ $E_2$ صفر: $4=2a$.', 'Look for $a$ and $b$ with $E_3=aE_1+bE_2$. In the second column $E_2$ has a 0: $4=2a$.'), math: same('$a=2$') },
            { text: say('Lehen zutabean: $5=2\\cdot 1+3b$.', 'En la primera columna: $5=2\\cdot 1+3b$.', 'في العمود الأول: $5=2\\cdot 1+3b$.', 'In the first column: $5=2\\cdot 1+3b$.'), math: same('$b=1$') },
            { text: say('Egiaztatu hirugarren zutabean. Betetzen da: $E_3$ menpekoa da.', 'Comprueba en la tercera columna. Se cumple: $E_3$ es dependiente.', 'تحقق في العمود الثالث. يتحقق: $E_3$ مرتبط خطيًا.', 'Check in the third column. It holds: $E_3$ is dependent.'), math: same('$2\\cdot(-1)+1\\cdot 2=0$') }
        ],
        takeaway: say(
            'Errenkada batzuk linealki menpekoak dira bat besteen konbinazio lineala bada ($E_3=aE_1+bE_2$); bat ere ez bada, independenteak dira. Zeroko errenkada bat beti da menpekoa.',
            'Unas filas son linealmente dependientes si una es combinación lineal de las otras ($E_3=aE_1+bE_2$); si ninguna lo es, son independientes. Una fila de ceros siempre es dependiente.',
            'تكون صفوف مرتبطة خطيًا إذا كان أحدها تركيبًا خطيًا من الأخرى ($E_3=aE_1+bE_2$)؛ وإذا لم يكن أي منها كذلك فهي مستقلة. وصف الأصفار مرتبط دائمًا.',
            'Some rows are linearly dependent if one is a linear combination of the others ($E_3=aE_1+bE_2$); if none is, they are independent. A row of zeros is always dependent.'
        ),
        figure: (language) => <CombinationFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'rank-gauss',
        stage: 'rank',
        title: say('Heina Gaussen metodoaz', 'El rango por el método de Gauss', 'الرتبة بطريقة غاوس', 'Rank by Gaussian elimination'),
        goal: say('Matrize baten heina kalkulatzea, diagonalaren azpian zeroak eginez eta zeroz osatuta ez dauden errenkadak zenbatuz.', 'Calcular el rango de una matriz haciendo ceros debajo de la diagonal y contando las filas que no son de ceros.', 'حساب رتبة مصفوفة بجعل أصفار تحت القطر وعدّ الصفوف التي ليست أصفارًا.', 'Find the rank of a matrix by making zeros below the diagonal and counting the rows that are not all zeros.'),
        needs: [
            { unit: 'batx1-zientziak/sistemas', topic: 'gauss-method', title: { eu: 'Gaussen metodoa', es: 'El método de Gauss', en: 'Gaussian elimination', ar: 'طريقة غاوس' } }
        ],
        problem: say('Kalkulatu $\\begin{pmatrix}1&2&1\\\\2&3&4\\\\3&5&5\\end{pmatrix}$ matrizearen heina.', 'Calcula el rango de $\\begin{pmatrix}1&2&1\\\\2&3&4\\\\3&5&5\\end{pmatrix}$.', 'احسب رتبة $\\begin{pmatrix}1&2&1\\\\2&3&4\\\\3&5&5\\end{pmatrix}$.', 'Find the rank of $\\begin{pmatrix}1&2&1\\\\2&3&4\\\\3&5&5\\end{pmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Egin zeroak lehen zutabean: $E_2-2E_1$ eta $E_3-3E_1$.', 'Haz ceros en la primera columna: $E_2-2E_1$ y $E_3-3E_1$.', 'اجعل أصفارًا في العمود الأول: $E_2-2E_1$ و$E_3-3E_1$.', 'Make zeros in the first column: $E_2-2E_1$ and $E_3-3E_1$.'), math: same('$\\begin{pmatrix}1&2&1\\\\0&-1&2\\\\0&-1&2\\end{pmatrix}$') },
            { text: say('Eta bigarrenean: $E_3-E_2$.', 'Y en la segunda: $E_3-E_2$.', 'ثم في الثاني: $E_3-E_2$.', 'And in the second: $E_3-E_2$.'), math: same('$\\begin{pmatrix}1&2&1\\\\0&-1&2\\\\0&0&0\\end{pmatrix}$') },
            { text: say('Bi errenkadak ez daude zeroz osatuta: heina 2 da.', 'Quedan dos filas que no son de ceros: el rango es 2.', 'يبقى صفّان ليسا أصفارًا: الرتبة 2.', 'Two rows are not all zeros: the rank is 2.'), math: same('$\\operatorname{rg}=2$') }
        ],
        takeaway: say(
            'Heina linealki independenteak diren errenkaden kopurua da. Gaussen metodoaz mailakatzean (eragiketek ez dute heina aldatzen), zeroz osatuta ez dauden errenkaden kopurua da.',
            'El rango es el número de filas linealmente independientes. Al escalonar por Gauss (las operaciones no cambian el rango), es el número de filas que no son de ceros.',
            'الرتبة عدد الصفوف المستقلة خطيًا. وعند التحويل إلى الشكل الدرجي بطريقة غاوس (لا تغيّر العمليات الرتبة) هي عدد الصفوف التي ليست أصفارًا.',
            'The rank is the number of linearly independent rows. When you reduce by Gaussian elimination (the operations do not change the rank), it is the number of rows that are not all zeros.'
        ),
        figure: (language) => <RankStairsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'rank-parameter',
        stage: 'rank',
        title: say('Heina parametro baten arabera', 'El rango según un parámetro', 'الرتبة حسب وسيط', 'Rank depending on a parameter'),
        goal: say('Matrizearen barruko letra baten arabera heina nola aldatzen den aztertzea: mailakatu, eta begiratu zein balioek deuseztatzen duten errenkada bat.', 'Estudiar cómo cambia el rango según una letra de la matriz: escalonar y ver qué valores anulan una fila.', 'دراسة كيف تتغير الرتبة حسب حرف في المصفوفة: التحويل إلى الشكل الدرجي ورؤية القيم التي تُعدم صفًّا.', 'Study how the rank changes with a letter in the matrix: reduce it and see which values wipe out a row.'),
        needs: [
            { unit: 'batx1-zientziak/sistemas', topic: 'parameter-discussion', title: { eu: 'Parametro baten araberako eztabaida', es: 'Discutir según un parámetro', en: 'Analysing a system with a parameter', ar: 'مناقشة نظام حسب وسيط' } }
        ],
        problem: say('Aztertu $\\begin{pmatrix}1&1&2\\\\2&3&5\\\\1&2&m\\end{pmatrix}$ matrizearen heina, $m$ parametroaren arabera.', 'Estudia el rango de $\\begin{pmatrix}1&1&2\\\\2&3&5\\\\1&2&m\\end{pmatrix}$ según $m$.', 'ادرس رتبة $\\begin{pmatrix}1&1&2\\\\2&3&5\\\\1&2&m\\end{pmatrix}$ حسب $m$.', 'Study the rank of $\\begin{pmatrix}1&1&2\\\\2&3&5\\\\1&2&m\\end{pmatrix}$ for the values of $m$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$E_2-2E_1$ eta $E_3-E_1$.', '$E_2-2E_1$ y $E_3-E_1$.', '$E_2-2E_1$ و$E_3-E_1$.', '$E_2-2E_1$ and $E_3-E_1$.'), math: same('$\\begin{pmatrix}1&1&2\\\\0&1&1\\\\0&1&m-2\\end{pmatrix}$') },
            { text: say('$E_3-E_2$: $m$ azken elementuan bakarrik geratzen da.', '$E_3-E_2$: la $m$ queda solo en el último elemento.', '$E_3-E_2$: يبقى $m$ في العنصر الأخير فقط.', '$E_3-E_2$: $m$ is left only in the last entry.'), math: same('$\\begin{pmatrix}1&1&2\\\\0&1&1\\\\0&0&m-3\\end{pmatrix}$') },
            { text: say('Berdindu zerora: $m=3$ denean, azken errenkada zero da.', 'Iguala a cero: con $m=3$ la última fila se anula.', 'ساوِ بالصفر: مع $m=3$ ينعدم الصف الأخير.', 'Set it to zero: with $m=3$ the last row vanishes.'), math: same('$m=3\\ \\to\\ \\operatorname{rg}=2\\qquad m\\neq 3\\ \\to\\ \\operatorname{rg}=3$') }
        ],
        takeaway: say(
            'Mailakatu letra barruan dela, eta begiratu zein balioek deuseztatzen duten errenkada bat: balio horietarako heina jaitsi egiten da. Ez zatitu inoiz $m-3$ adierazpenaz, $m=3$ aparte aztertu gabe.',
            'Escalona con la letra dentro y mira qué valores anulan una fila: para esos valores el rango baja. Nunca dividas entre $m-3$ sin estudiar aparte $m=3$.',
            'حوّل إلى الشكل الدرجي والحرف داخل المصفوفة، وانظر أي القيم تُعدم صفًّا: لهذه القيم تنقص الرتبة. ولا تقسم أبدًا على $m-3$ قبل دراسة $m=3$ على حدة.',
            'Reduce with the letter inside and see which values wipe out a row: for those values the rank goes down. Never divide by $m-3$ without studying $m=3$ separately.'
        ),
        figure: (language) => <RankLineFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Inverse and powers ---------- */
    {
        id: 'inverse-definition',
        stage: 'inverse',
        title: say('Alderantzizko matrizea', 'La matriz inversa', 'المصفوفة المعكوسة', 'The inverse matrix'),
        goal: say('$A^{-1}$ zer den jakitea ($AA^{-1}=A^{-1}A=I$), biderkatuz egiaztatzea eta $2\\times 2$ matrize batean sistema batekin aurkitzea.', 'Saber qué es $A^{-1}$ ($AA^{-1}=A^{-1}A=I$), comprobarla multiplicando y hallarla con un sistema en una $2\\times 2$.', 'معرفة ما هو $A^{-1}$ ($AA^{-1}=A^{-1}A=I$)، والتحقق منه بالضرب، وإيجاده بنظام في مصفوفة $2\\times 2$.', 'Know what $A^{-1}$ is ($AA^{-1}=A^{-1}A=I$), check it by multiplying and find it with a system in a $2\\times 2$.'),
        problem: say('Aurkitu $A=\\begin{pmatrix}2&1\\\\5&3\\end{pmatrix}$ matrizearen alderantzizkoa sistema batekin.', 'Halla la inversa de $A=\\begin{pmatrix}2&1\\\\5&3\\end{pmatrix}$ con un sistema.', 'أوجد معكوس $A=\\begin{pmatrix}2&1\\\\5&3\\end{pmatrix}$ بنظام.', 'Find the inverse of $A=\\begin{pmatrix}2&1\\\\5&3\\end{pmatrix}$ with a system.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $A^{-1}$ ezezagunekin, eta eskatu $AA^{-1}=I$.', 'Escribe $A^{-1}$ con incógnitas y pide $AA^{-1}=I$.', 'اكتب $A^{-1}$ بمجاهيل واطلب $AA^{-1}=I$.', 'Write $A^{-1}$ with unknowns and ask for $AA^{-1}=I$.'), math: same('$\\begin{pmatrix}2&1\\\\5&3\\end{pmatrix}\\begin{pmatrix}x&y\\\\z&t\\end{pmatrix}=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$') },
            { text: say('Lehen zutabeak sistema bat ematen du, eta bigarrenak beste bat.', 'La primera columna da un sistema y la segunda, otro.', 'العمود الأول يعطي نظامًا والثاني نظامًا آخر.', 'The first column gives one system and the second another.'), math: same('$\\begin{cases}2x+z=1\\\\ 5x+3z=0\\end{cases}\\qquad \\begin{cases}2y+t=0\\\\ 5y+3t=1\\end{cases}$') },
            { text: say('Ebatzi: $x=3$, $z=-5$, $y=-1$, $t=2$.', 'Resuelve: $x=3$, $z=-5$, $y=-1$, $t=2$.', 'حُلّ: $x=3$ و$z=-5$ و$y=-1$ و$t=2$.', 'Solve: $x=3$, $z=-5$, $y=-1$, $t=2$.'), math: same('$A^{-1}=\\begin{pmatrix}3&-1\\\\-5&2\\end{pmatrix}$') }
        ],
        takeaway: say(
            '$A^{-1}$ matrizeak $AA^{-1}=A^{-1}A=I$ betetzen du. Matrize karratuek bakarrik izan dezakete, eta haien heina maximoa denean bakarrik: orduan $A$ erregularra da.',
            '$A^{-1}$ cumple $AA^{-1}=A^{-1}A=I$. Solo pueden tenerla las matrices cuadradas, y solo si su rango es máximo: entonces $A$ es regular.',
            '$A^{-1}$ يحقق $AA^{-1}=A^{-1}A=I$. ولا يكون إلا للمصفوفات المربعة، وفقط إذا كانت رتبتها عظمى: عندئذ تكون $A$ قابلة للعكس.',
            '$A^{-1}$ satisfies $AA^{-1}=A^{-1}A=I$. Only square matrices can have one, and only if their rank is full: then $A$ is invertible.'
        ),
        figure: (language) => <InverseFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'gauss-jordan',
        stage: 'inverse',
        title: say('Alderantzizkoa Gauss-Jordan metodoaz', 'La inversa por Gauss-Jordan', 'المعكوس بطريقة غاوس-جوردان', 'The inverse by Gauss–Jordan'),
        goal: say('$A^{-1}$ kalkulatzea: $(A\\mid I)$ idatzi eta errenkada-eragiketak egin $(I\\mid A^{-1})$ lortu arte, edo alderantzizkorik ez dagoela ikusi arte.', 'Calcular $A^{-1}$ escribiendo $(A\\mid I)$ y haciendo operaciones de fila hasta tener $(I\\mid A^{-1})$, o ver que no la hay.', 'حساب $A^{-1}$ بكتابة $(A\\mid I)$ وإجراء عمليات على الصفوف حتى $(I\\mid A^{-1})$، أو رؤية أنه غير موجود.', 'Find $A^{-1}$ by writing $(A\\mid I)$ and doing row operations until you have $(I\\mid A^{-1})$, or see that there is none.'),
        needs: [
            { unit: 'batx1-zientziak/sistemas', topic: 'augmented-matrix', title: { eu: 'Matrize zabaldua', es: 'La matriz ampliada', en: 'The augmented matrix', ar: 'المصفوفة الموسعة' } }
        ],
        problem: say('Kalkulatu $\\begin{pmatrix}1&2\\\\3&7\\end{pmatrix}$ matrizearen alderantzizkoa Gauss-Jordan metodoaz.', 'Halla la inversa de $\\begin{pmatrix}1&2\\\\3&7\\end{pmatrix}$ por Gauss-Jordan.', 'أوجد معكوس $\\begin{pmatrix}1&2\\\\3&7\\end{pmatrix}$ بطريقة غاوس-جوردان.', 'Find the inverse of $\\begin{pmatrix}1&2\\\\3&7\\end{pmatrix}$ by Gauss–Jordan.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $A$ eta, marraren ondoren, $I$.', 'Escribe $A$ y, tras la barra, $I$.', 'اكتب $A$ ثم $I$ بعد الخط.', 'Write $A$ and, after the bar, $I$.'), math: same('$\\left(\\begin{array}{cc|cc}1&2&1&0\\\\3&7&0&1\\end{array}\\right)$') },
            { text: say('Zeroa diagonalaren azpian: $E_2-3E_1$, errenkada osoan.', 'Cero debajo de la diagonal: $E_2-3E_1$, en la fila entera.', 'صفر تحت القطر: $E_2-3E_1$ على الصف كله.', 'Zero below the diagonal: $E_2-3E_1$, on the whole row.'), math: same('$\\left(\\begin{array}{cc|cc}1&2&1&0\\\\0&1&-3&1\\end{array}\\right)$') },
            { text: say('Zeroa diagonalaren gainean: $E_1-2E_2$. Ezkerrean $I$ dago.', 'Cero encima de la diagonal: $E_1-2E_2$. A la izquierda queda $I$.', 'صفر فوق القطر: $E_1-2E_2$. يبقى $I$ في اليسار.', 'Zero above the diagonal: $E_1-2E_2$. $I$ is left on the left.'), math: same('$\\left(\\begin{array}{cc|cc}1&0&7&-2\\\\0&1&-3&1\\end{array}\\right)\\ \\to\\ A^{-1}=\\begin{pmatrix}7&-2\\\\-3&1\\end{pmatrix}$') }
        ],
        takeaway: say(
            'Idatzi $(A\\mid I)$ eta egin errenkada-eragiketak, errenkada osoan, $(I\\mid A^{-1})$ lortu arte. Ezkerreko zatian zeroko errenkada bat ateratzen bada, $A$ matrizeak ez du alderantzizkorik.',
            'Escribe $(A\\mid I)$ y haz operaciones de fila, en la fila entera, hasta tener $(I\\mid A^{-1})$. Si a la izquierda sale una fila de ceros, $A$ no tiene inversa.',
            'اكتب $(A\\mid I)$ وأجرِ عمليات على الصفوف كلها حتى تحصل على $(I\\mid A^{-1})$. وإذا ظهر في اليسار صف أصفار فليس لـ $A$ معكوس.',
            'Write $(A\\mid I)$ and do row operations, on whole rows, until you have $(I\\mid A^{-1})$. If a row of zeros appears on the left, $A$ has no inverse.'
        ),
        figure: (language) => <GaussJordanFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'matrix-powers',
        stage: 'inverse',
        title: say('Matrize baten berreturak', 'Potencias de una matriz', 'قوى المصفوفة', 'Powers of a matrix'),
        goal: say('$A^2$, $A^3$… kalkulatzea eta eredua aurkitzea $A^n$ emateko, errepikatzen denean edo $n$ barruan duenean.', 'Calcular $A^2$, $A^3$… y encontrar el patrón para dar $A^n$, cuando se repite o cuando lleva $n$ dentro.', 'حساب $A^2$ و$A^3$… وإيجاد النمط لإعطاء $A^n$، عندما يتكرر أو عندما يحتوي على $n$.', 'Work out $A^2$, $A^3$… and find the pattern to give $A^n$, when it repeats or when it has $n$ inside.'),
        problem: say('Kalkulatu $A^n$, $A=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$ bada.', 'Calcula $A^n$ para $A=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$.', 'احسب $A^n$ لـ $A=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$.', 'Work out $A^n$ for $A=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu $A$ bider $A$.', 'Multiplica $A$ por $A$.', 'اضرب $A$ في $A$.', 'Multiply $A$ by $A$.'), math: same('$A^2=\\begin{pmatrix}1&4\\\\0&1\\end{pmatrix}$') },
            { text: say('Biderkatu berriro $A$ matrizeaz.', 'Multiplica otra vez por $A$.', 'اضرب مرة أخرى في $A$.', 'Multiply by $A$ again.'), math: same('$A^3=A^2A=\\begin{pmatrix}1&6\\\\0&1\\end{pmatrix}$') },
            { text: say('Goiko eskuineko elementuak 2 egiten du gora urrats bakoitzean.', 'El elemento de arriba a la derecha sube 2 en cada paso.', 'العنصر في أعلى اليمين يزيد 2 في كل خطوة.', 'The top-right entry goes up by 2 at each step.'), math: same('$A^n=\\begin{pmatrix}1&2n\\\\0&1\\end{pmatrix}$') }
        ],
        takeaway: say(
            '$A^n=A\\cdot A\\cdots A$. Kalkulatu $A^2$, $A^3$… eredua ikusi arte: batzuetan errepikatu egiten da ($A^k=I$ eta berriro hasten da), eta beste batzuetan zenbaki bat $n$ berretzailearekin hazten da.',
            '$A^n=A\\cdot A\\cdots A$. Calcula $A^2$, $A^3$… hasta ver el patrón: unas veces se repite ($A^k=I$ y vuelve a empezar) y otras un número crece con $n$.',
            '$A^n=A\\cdot A\\cdots A$. احسب $A^2$ و$A^3$… حتى ترى النمط: أحيانًا يتكرر ($A^k=I$ ثم يبدأ من جديد)، وأحيانًا يكبر عدد مع $n$.',
            '$A^n=A\\cdot A\\cdots A$. Work out $A^2$, $A^3$… until you see the pattern: sometimes it repeats ($A^k=I$ and it starts again) and sometimes a number grows with $n$.'
        ),
        figure: (language) => <PowerCycleFigure language={language} />
    },

    /* ---------- 5. Matrix equations ---------- */
    {
        id: 'matrix-equations',
        stage: 'equations',
        title: say('Matrize bat askatzea', 'Despejar una matriz', 'استخراج مصفوفة مجهولة', 'Solving for a matrix'),
        goal: say('$AX=B$, $XA=B$ edo $AX+B=C$ bezalako ekuazioak ebaztea, $A^{-1}$ matrizeaz alde egokitik biderkatuz.', 'Resolver ecuaciones como $AX=B$, $XA=B$ o $AX+B=C$ multiplicando por $A^{-1}$ por el lado correcto.', 'حل معادلات مثل $AX=B$ و$XA=B$ و$AX+B=C$ بالضرب في $A^{-1}$ من الجهة الصحيحة.', 'Solve equations such as $AX=B$, $XA=B$ or $AX+B=C$ by multiplying by $A^{-1}$ on the right side.'),
        problem: say('Ebatzi $AX=B$, $A=\\begin{pmatrix}3&1\\\\2&1\\end{pmatrix}$ eta $B=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$ badira.', 'Resuelve $AX=B$ con $A=\\begin{pmatrix}3&1\\\\2&1\\end{pmatrix}$ y $B=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$.', 'حُلّ $AX=B$ مع $A=\\begin{pmatrix}3&1\\\\2&1\\end{pmatrix}$ و$B=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$.', 'Solve $AX=B$ with $A=\\begin{pmatrix}3&1\\\\2&1\\end{pmatrix}$ and $B=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu bi aldeak $A^{-1}$ matrizeaz ezkerretik.', 'Multiplica los dos miembros por $A^{-1}$ por la izquierda.', 'اضرب الطرفين في $A^{-1}$ من اليسار.', 'Multiply both sides by $A^{-1}$ on the left.'), math: same('$A^{-1}AX=A^{-1}B\\ \\to\\ X=A^{-1}B$') },
            { text: say('Kalkulatu $A^{-1}$.', 'Calcula $A^{-1}$.', 'احسب $A^{-1}$.', 'Work out $A^{-1}$.'), math: same('$A^{-1}=\\begin{pmatrix}1&-1\\\\-2&3\\end{pmatrix}$') },
            { text: say('Biderkatu ordena horretan.', 'Multiplica en ese orden.', 'اضرب بهذا الترتيب.', 'Multiply in that order.'), math: same('$X=\\begin{pmatrix}1&-1\\\\-2&3\\end{pmatrix}\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}=\\begin{pmatrix}1&1\\\\-2&-1\\end{pmatrix}$') }
        ],
        takeaway: say(
            'Matrizeak ez dira zatitzen: $A^{-1}$ matrizeaz biderkatzen da bi aldeetan, alde berean. $AX=B\\ \\to\\ X=A^{-1}B$; $XA=B\\ \\to\\ X=BA^{-1}$.',
            'Las matrices no se dividen: se multiplica por $A^{-1}$ en los dos miembros, por el mismo lado. $AX=B\\ \\to\\ X=A^{-1}B$; $XA=B\\ \\to\\ X=BA^{-1}$.',
            'المصفوفات لا تُقسم: نضرب في $A^{-1}$ في الطرفين من الجهة نفسها. $AX=B\\ \\to\\ X=A^{-1}B$؛ $XA=B\\ \\to\\ X=BA^{-1}$.',
            'Matrices are not divided: you multiply both sides by $A^{-1}$, on the same side. $AX=B\\ \\to\\ X=A^{-1}B$; $XA=B\\ \\to\\ X=BA^{-1}$.'
        ),
        figure: (language) => <SidesFigure language={language} />
    },
    {
        id: 'equation-systems',
        stage: 'equations',
        title: say('Matrize-ekuazioen sistemak', 'Sistemas de ecuaciones matriciales', 'أنظمة المعادلات المصفوفية', 'Systems of matrix equations'),
        goal: say('Bi matrize ezezaguneko ($X$ eta $Y$) bi ekuazio ebaztea laburketaz, zenbakiekin bezala.', 'Resolver dos ecuaciones con dos matrices incógnita, $X$ e $Y$, por reducción, como con números.', 'حل معادلتين بمصفوفتين مجهولتين $X$ و$Y$ بالحذف كما في الأعداد.', 'Solve two equations in two unknown matrices, $X$ and $Y$, by elimination, as with numbers.'),
        needs: [
            { unit: 'batx1-zientziak/sistemas', topic: 'equivalent-systems', title: { eu: 'Sistema baliokideak', es: 'Sistemas equivalentes', en: 'Equivalent systems', ar: 'الأنظمة المتكافئة' } }
        ],
        problem: say('Aurkitu $X$ eta $Y$: $X+Y=\\begin{pmatrix}3&1\\\\2&5\\end{pmatrix}$ eta $X-Y=\\begin{pmatrix}1&-1\\\\0&3\\end{pmatrix}$.', 'Halla $X$ e $Y$: $X+Y=\\begin{pmatrix}3&1\\\\2&5\\end{pmatrix}$ y $X-Y=\\begin{pmatrix}1&-1\\\\0&3\\end{pmatrix}$.', 'أوجد $X$ و$Y$: $X+Y=\\begin{pmatrix}3&1\\\\2&5\\end{pmatrix}$ و$X-Y=\\begin{pmatrix}1&-1\\\\0&3\\end{pmatrix}$.', 'Find $X$ and $Y$: $X+Y=\\begin{pmatrix}3&1\\\\2&5\\end{pmatrix}$ and $X-Y=\\begin{pmatrix}1&-1\\\\0&3\\end{pmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu bi ekuazioak: $Y$ desagertzen da.', 'Suma las dos ecuaciones: $Y$ desaparece.', 'اجمع المعادلتين: يختفي $Y$.', 'Add the two equations: $Y$ disappears.'), math: same('$2X=\\begin{pmatrix}4&0\\\\2&8\\end{pmatrix}$') },
            { text: say('Zatitu 2 zenbakiaz (biderkatu $\\frac{1}{2}$ zenbakiaz).', 'Divide entre 2 (multiplica por $\\frac{1}{2}$).', 'اقسم على 2 (اضرب في $\\frac{1}{2}$).', 'Divide by 2 (multiply by $\\frac{1}{2}$).'), math: same('$X=\\begin{pmatrix}2&0\\\\1&4\\end{pmatrix}$') },
            { text: say('Ordeztu lehen ekuazioan.', 'Sustituye en la primera ecuación.', 'عوّض في المعادلة الأولى.', 'Substitute into the first equation.'), math: same('$Y=\\begin{pmatrix}3&1\\\\2&5\\end{pmatrix}-\\begin{pmatrix}2&0\\\\1&4\\end{pmatrix}=\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$') }
        ],
        takeaway: say(
            'Batuketak eta zenbakiak bakarrik badaude, bi ekuazioko sistema bat bezala ebazten da: laburketaz matrize bat desagerrarazi, askatu eta ordeztu. Egiaztatu bi ekuazioetan.',
            'Si solo hay sumas y números, se resuelve como un sistema de dos ecuaciones: elimina una matriz por reducción, despeja y sustituye. Comprueba en las dos ecuaciones.',
            'إذا لم يكن فيها إلا جمع وأعداد فإنها تُحل مثل نظام معادلتين: احذف مصفوفة، واستخرج، ثم عوّض. وتحقق في المعادلتين.',
            'If there are only sums and numbers, it is solved like a system of two equations: eliminate one matrix, solve for the other and substitute. Check in both equations.'
        ),
        figure: (language) => <MatrixSystemFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'commuting-matrices',
        stage: 'equations',
        title: say('Matrize trukakorrak', 'Matrices que conmutan', 'المصفوفات المتبادلة', 'Matrices that commute'),
        goal: say('Matrize batekin trukatzen diren matrize guztiak aurkitzea: $X$ letrekin idatzi, eta $AX$ eta $XA$ berdindu.', 'Hallar todas las matrices que conmutan con una dada: escribir $X$ con letras e igualar $AX$ y $XA$.', 'إيجاد كل المصفوفات التي تتبادل مع مصفوفة معطاة: كتابة $X$ بحروف ومساواة $AX$ و$XA$.', 'Find all the matrices that commute with a given one: write $X$ with letters and match $AX$ and $XA$.'),
        problem: say('Aurkitu $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ matrizearekin trukatzen diren matrizeak.', 'Halla las matrices que conmutan con $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$.', 'أوجد المصفوفات التي تتبادل مع $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$.', 'Find the matrices that commute with $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $X=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$ eta kalkulatu bi biderkadurak.', 'Escribe $X=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$ y calcula los dos productos.', 'اكتب $X=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$ واحسب الجداءين.', 'Write $X=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$ and work out both products.'), math: same('$AX=\\begin{pmatrix}a+c&b+d\\\\c&d\\end{pmatrix}\\qquad XA=\\begin{pmatrix}a&a+b\\\\c&c+d\\end{pmatrix}$') },
            { text: say('Berdindu elementuz elementu.', 'Iguala casilla a casilla.', 'ساوِ عنصرًا عنصرًا.', 'Match them entry by entry.'), math: same('$a+c=a,\\quad b+d=a+b,\\quad d=c+d$') },
            { text: say('Hortik $c=0$ eta $d=a$; $a$ eta $b$ libre geratzen dira.', 'De ahí $c=0$ y $d=a$; $a$ y $b$ quedan libres.', 'ومن ذلك $c=0$ و$d=a$؛ ويبقى $a$ و$b$ حرّين.', 'So $c=0$ and $d=a$; $a$ and $b$ stay free.'), math: same('$X=\\begin{pmatrix}a&b\\\\0&a\\end{pmatrix}$') }
        ],
        takeaway: say(
            'Bi matrize trukatzen dira $AB=BA$ betetzen badute. Denak aurkitzeko, idatzi $X$ letrekin, berdindu $AX$ eta $XA$ elementuz elementu, eta ebatzi: normalean infinitu dira.',
            'Dos matrices conmutan si $AB=BA$. Para hallarlas todas, escribe $X$ con letras, iguala $AX$ y $XA$ casilla a casilla y resuelve: suelen ser infinitas.',
            'تتبادل مصفوفتان إذا كان $AB=BA$. ولإيجادها كلها اكتب $X$ بحروف، وساوِ $AX$ و$XA$ عنصرًا عنصرًا، ثم حُلّ: عادةً تكون لا نهائية.',
            'Two matrices commute if $AB=BA$. To find them all, write $X$ with letters, match $AX$ and $XA$ entry by entry and solve: there are usually infinitely many.'
        ),
        figure: (language) => <CommuteFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const matrizeakTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...matrizeakLessonTexts[topic.id as MatrizeakTopicId], ...matrizeakLessonChecks[topic.id as MatrizeakTopicId] }))
