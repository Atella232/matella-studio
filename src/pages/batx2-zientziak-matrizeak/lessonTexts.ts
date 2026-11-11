import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { MatrizeakTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 · Zientziak — what each lesson tells: the new
   words (definitions), a short explanation, the example as an exercise
   («Another example»), the key words in four languages and, in five
   lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics. The example uses numbers of its
   own, never those of «Let's solve», of «Check it» or of the typical
   mistake. Rows are E₁, E₂… in every language, as in 1.º Bachillerato.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const matrizeakLessonTexts: Record<MatrizeakTopicId, LessonTexts> = {
    /* ---------- 1. Matrices and their types ---------- */
    'what-is-a-matrix': {
        definitions: [
            { term: say('Matrizea', 'Matriz', 'المصفوفة', 'Matrix'), meaning: say('Errenkadatan eta zutabetan ordenatutako zenbaki-taula bat, parentesi artean. Letra larriz izendatzen da: $A$.', 'Una tabla de números ordenados en filas y columnas, entre paréntesis. Se nombra con mayúscula: $A$.', 'جدول أعداد مرتبة في صفوف وأعمدة بين قوسين، ويُسمّى بحرف كبير: $A$.', 'A table of numbers in rows and columns, between brackets. It is named with a capital letter: $A$.') },
            { term: say('Dimentsioa', 'Dimensión', 'الأبعاد', 'Size'), meaning: say('$m\\times n$: $m$ errenkada eta $n$ zutabe; lehenik errenkadak.', '$m\\times n$: $m$ filas y $n$ columnas; primero las filas.', '$m\\times n$: $m$ صفًّا و$n$ عمودًا؛ الصفوف أولًا.', '$m\\times n$: $m$ rows and $n$ columns; rows first.') }
        ],
        vocabulary: [
            say('errenkada', 'fila', 'الصف', 'row'),
            say('zutabea', 'columna', 'العمود', 'column'),
            say('elementua', 'elemento', 'العنصر', 'entry')
        ],
        explanation: say(
            'Matrize batek zenbakiak errenkadatan (horizontalak) eta zutabetan (bertikalak) ordenatzen ditu. $i$ errenkadako eta $j$ zutabeko elementua $a_{ij}$ idazten da: lehenik errenkada, gero zutabea. Bi matrize berdinak dira dimentsio bera eta leku bakoitzean elementu bera badituzte.',
            'Una matriz ordena números en filas (horizontales) y columnas (verticales). El elemento de la fila $i$ y la columna $j$ se escribe $a_{ij}$: primero la fila, después la columna. Dos matrices son iguales si tienen la misma dimensión y el mismo elemento en cada sitio.',
            'ترتّب المصفوفة الأعداد في صفوف (أفقية) وأعمدة (رأسية). ويُكتب العنصر الواقع في الصف $i$ والعمود $j$ هكذا: $a_{ij}$، الصف أولًا ثم العمود. وتتساوى مصفوفتان إذا كانت لهما الأبعاد نفسها والعنصر نفسه في كل موضع.',
            'A matrix arranges numbers in rows (across) and columns (down). The entry in row $i$ and column $j$ is written $a_{ij}$: row first, then column. Two matrices are equal if they have the same size and the same entry in every place.'
        ),
        examplePrompt: say('Aurkitu $x$ eta $y$, $\\begin{pmatrix}x+1&3\\\\2&2y\\end{pmatrix}=\\begin{pmatrix}5&3\\\\2&8\\end{pmatrix}$ izan dadin.', 'Halla $x$ e $y$ para que $\\begin{pmatrix}x+1&3\\\\2&2y\\end{pmatrix}=\\begin{pmatrix}5&3\\\\2&8\\end{pmatrix}$.', 'أوجد $x$ و$y$ ليكون $\\begin{pmatrix}x+1&3\\\\2&2y\\end{pmatrix}=\\begin{pmatrix}5&3\\\\2&8\\end{pmatrix}$.', 'Find $x$ and $y$ so that $\\begin{pmatrix}x+1&3\\\\2&2y\\end{pmatrix}=\\begin{pmatrix}5&3\\\\2&8\\end{pmatrix}$.'),
        example: same('$x+1=5\\ \\to\\ x=4\\qquad 2y=8\\ \\to\\ y=4$'),
        exampleAnswer: say('$x=4$ eta $y=4$: leku bakoitzeko elementuak berdinak dira.', '$x=4$ e $y=4$: los elementos de cada sitio son iguales.', '$x=4$ و$y=4$: عناصر كل موضع متساوية.', '$x=4$ and $y=4$: the entries in each place are equal.')
    },
    'matrix-types': {
        definitions: [
            { term: say('Matrize karratua', 'Matriz cuadrada', 'المصفوفة المربعة', 'Square matrix'), meaning: say('Errenkada eta zutabe kopuru bera duena. Haren diagonal nagusia $a_{11}$ elementutik $a_{nn}$ elementura doa.', 'La que tiene tantas filas como columnas. Su diagonal principal va de $a_{11}$ a $a_{nn}$.', 'لها عدد الصفوف نفسه وعدد الأعمدة. وقطرها الرئيسي يمتد من $a_{11}$ إلى $a_{nn}$.', 'One with as many rows as columns. Its main diagonal runs from $a_{11}$ to $a_{nn}$.') },
            { term: say('Identitate-matrizea', 'Matriz identidad', 'المصفوفة المحايدة', 'Identity matrix'), meaning: say('$I$: diagonal nagusian batekoak eta beste guztia zeroak.', '$I$: unos en la diagonal principal y ceros en el resto.', '$I$: آحاد على القطر الرئيسي وأصفار في الباقي.', '$I$: ones on the main diagonal and zeros everywhere else.') }
        ],
        vocabulary: [
            say('diagonal nagusia', 'diagonal principal', 'القطر الرئيسي', 'main diagonal'),
            say('triangeluarra', 'triangular', 'مثلثية', 'triangular'),
            say('matrize nulua', 'matriz nula', 'المصفوفة الصفرية', 'zero matrix')
        ],
        explanation: say(
            'Errenkada-matrize batek errenkada bakarra du, eta zutabe-matrize batek zutabe bakarra. Matrize nulua zeroz beteta dago, eta $O$ idazten da. Matrize karratu batean diagonal nagusiari begiratzen zaio: haren alde bateko eta besteko zeroek ematen diote izena matrizeari.',
            'Una matriz fila tiene una sola fila, y una matriz columna, una sola columna. La matriz nula es toda de ceros y se escribe $O$. En una matriz cuadrada se mira la diagonal principal: los ceros que hay a un lado y a otro le dan nombre.',
            'مصفوفة الصف لها صف واحد، ومصفوفة العمود لها عمود واحد. والمصفوفة الصفرية كلها أصفار وتُكتب $O$. وفي المصفوفة المربعة ننظر إلى القطر الرئيسي: الأصفار على جانبيه تعطيها اسمها.',
            'A row matrix has a single row, and a column matrix a single column. The zero matrix is all zeros and is written $O$. In a square matrix you look at the main diagonal: the zeros on either side of it give the matrix its name.'
        ),
        cases: [
            { title: say('Triangeluarra', 'Triangular', 'مثلثية', 'Triangular'), text: say('Zeroak diagonalaren azpian (goi-triangeluarra) edo gainean (behe-triangeluarra).', 'Ceros debajo de la diagonal (triangular superior) o encima (triangular inferior).', 'أصفار تحت القطر (مثلثية عليا) أو فوقه (مثلثية سفلى).', 'Zeros below the diagonal (upper triangular) or above it (lower triangular).'), math: same('$\\begin{pmatrix}2&5\\\\0&3\\end{pmatrix}$') },
            { title: say('Diagonala', 'Diagonal', 'قطرية', 'Diagonal'), text: say('Zeroak diagonalaren bi aldeetan.', 'Ceros a los dos lados de la diagonal.', 'أصفار على جانبي القطر.', 'Zeros on both sides of the diagonal.'), math: same('$\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$') },
            { title: say('Eskalarra eta identitatea', 'Escalar e identidad', 'سلمية ومحايدة', 'Scalar and identity'), text: say('Diagonala, eta diagonaleko zenbakiak berdinak; denak 1 badira, $I$ da.', 'Diagonal y con los números de la diagonal iguales; si todos son 1, es $I$.', 'قطرية وأعداد قطرها متساوية؛ وإذا كانت كلها 1 فهي $I$.', 'Diagonal, with equal numbers on the diagonal; if they are all 1, it is $I$.'), math: same('$\\begin{pmatrix}3&0\\\\0&3\\end{pmatrix}$') }
        ],
        examplePrompt: say('Nolakoa da $\\begin{pmatrix}1&4&-3\\\\0&5&2\\\\0&0&6\\end{pmatrix}$?', '¿De qué tipo es $\\begin{pmatrix}1&4&-3\\\\0&5&2\\\\0&0&6\\end{pmatrix}$?', 'ما نوع $\\begin{pmatrix}1&4&-3\\\\0&5&2\\\\0&0&6\\end{pmatrix}$؟', 'What kind of matrix is $\\begin{pmatrix}1&4&-3\\\\0&5&2\\\\0&0&6\\end{pmatrix}$?'),
        example: same('$a_{21}=a_{31}=a_{32}=0$'),
        exampleAnswer: say('Goi-triangeluarra: zeroak diagonalaren azpian daude.', 'Triangular superior: los ceros están debajo de la diagonal.', 'مثلثية عليا: الأصفار تحت القطر.', 'Upper triangular: the zeros are below the diagonal.')
    },
    'transpose-symmetric': {
        definitions: [
            { term: say('Matrize iraulia', 'Matriz traspuesta', 'منقول المصفوفة', 'Transpose'), meaning: say('$A^t$: $A$ matrizearen errenkadak zutabe gisa idatzita. $A$ matrizea $m\\times n$ bada, $A^t$ matrizea $n\\times m$ da.', '$A^t$: las filas de $A$ escritas como columnas. Si $A$ es $m\\times n$, $A^t$ es $n\\times m$.', '$A^t$: صفوف $A$ مكتوبة أعمدةً. وإذا كانت $A$ من الأبعاد $m\\times n$ كانت $A^t$ من الأبعاد $n\\times m$.', '$A^t$: the rows of $A$ written as columns. If $A$ is $m\\times n$, $A^t$ is $n\\times m$.') },
            { term: say('Matrize simetrikoa', 'Matriz simétrica', 'المصفوفة المتماثلة', 'Symmetric matrix'), meaning: say('$A^t=A$ betetzen duen matrize karratua: diagonalaren alde banatan zenbaki berberak.', 'Una matriz cuadrada con $A^t=A$: a cada lado de la diagonal, los mismos números.', 'مصفوفة مربعة تحقق $A^t=A$: الأعداد نفسها على جانبي القطر.', 'A square matrix with $A^t=A$: the same numbers on each side of the diagonal.') },
            { term: say('Matrize antisimetrikoa', 'Matriz antisimétrica', 'المصفوفة المتماثلة تخالفيًا', 'Skew-symmetric matrix'), meaning: say('$A^t=-A$ betetzen duen matrize karratua.', 'Una matriz cuadrada con $A^t=-A$.', 'مصفوفة مربعة تحقق $A^t=-A$.', 'A square matrix with $A^t=-A$.') }
        ],
        vocabulary: [
            say('ispilua', 'espejo', 'المرآة', 'mirror'),
            say('diagonala', 'diagonal', 'القطر', 'diagonal')
        ],
        explanation: say(
            'Iraultzean, lehen errenkada lehen zutabe bihurtzen da, bigarrena bigarren zutabe, eta horrela. Matrize karratu batean, diagonala ispilu bat balitz bezala da: $a_{ij}$ elementua $a_{ji}$ lekura joaten da. Iraulia bera denean, simetrikoa da; aurkakoa denean, antisimetrikoa.',
            'Al trasponer, la primera fila pasa a ser la primera columna, la segunda, la segunda columna, y así. En una matriz cuadrada es como un espejo en la diagonal: $a_{ij}$ va al sitio de $a_{ji}$. Si la traspuesta es la misma, es simétrica; si es la opuesta, antisimétrica.',
            'عند النقل يصير الصف الأول العمود الأول، والثاني العمود الثاني، وهكذا. وفي المصفوفة المربعة يشبه ذلك مرآة على القطر: ينتقل $a_{ij}$ إلى موضع $a_{ji}$. وإذا كان المنقول هو نفسه فهي متماثلة، وإذا كان معاكسها فهي متماثلة تخالفيًا.',
            'When you transpose, the first row becomes the first column, the second the second column, and so on. In a square matrix it is like a mirror on the diagonal: $a_{ij}$ goes to the place of $a_{ji}$. If the transpose is the same, it is symmetric; if it is the opposite, skew-symmetric.'
        ),
        examplePrompt: say('Simetrikoa al da $\\begin{pmatrix}3&-1&7\\\\-1&0&2\\\\7&2&5\\end{pmatrix}$?', '¿Es simétrica $\\begin{pmatrix}3&-1&7\\\\-1&0&2\\\\7&2&5\\end{pmatrix}$?', 'هل $\\begin{pmatrix}3&-1&7\\\\-1&0&2\\\\7&2&5\\end{pmatrix}$ متماثلة؟', 'Is $\\begin{pmatrix}3&-1&7\\\\-1&0&2\\\\7&2&5\\end{pmatrix}$ symmetric?'),
        example: same('$a_{12}=a_{21}=-1,\\quad a_{13}=a_{31}=7,\\quad a_{23}=a_{32}=2$'),
        exampleAnswer: say('Bai: diagonalaren alde banatako elementuak berdinak dira.', 'Sí: los elementos a cada lado de la diagonal son iguales.', 'نعم: العناصر على جانبي القطر متساوية.', 'Yes: the entries on each side of the diagonal are equal.'),
        why: {
            text: say('Zergatik ditu zeroak diagonalean matrize antisimetriko batek? Diagonalean $a_{ii}=-a_{ii}$ bete behar da, eta bere aurkakoaren berdina den zenbaki bakarra 0 da.', '¿Por qué una antisimétrica tiene ceros en la diagonal? En la diagonal tiene que cumplirse $a_{ii}=-a_{ii}$, y el único número igual a su opuesto es el 0.', 'لماذا في قطر المصفوفة المتماثلة تخالفيًا أصفار؟ يجب أن يتحقق على القطر $a_{ii}=-a_{ii}$، والعدد الوحيد الذي يساوي معاكسه هو 0.', 'Why does a skew-symmetric matrix have zeros on its diagonal? On the diagonal $a_{ii}=-a_{ii}$ must hold, and the only number equal to its opposite is 0.'),
            math: same('$a_{ii}=-a_{ii}\\ \\to\\ 2a_{ii}=0\\ \\to\\ a_{ii}=0$')
        }
    },

    /* ---------- 2. Operations with matrices ---------- */
    'sum-scalar': {
        definitions: [
            { term: say('Aurkako matrizea', 'Matriz opuesta', 'المصفوفة المعاكسة', 'Opposite matrix'), meaning: say('$-A$: elementu bakoitzari zeinua aldatuta. $A+(-A)=O$.', '$-A$: cada elemento cambiado de signo. $A+(-A)=O$.', '$-A$: كل عنصر بإشارة معاكسة. $A+(-A)=O$.', '$-A$: every entry with its sign changed. $A+(-A)=O$.') }
        ],
        vocabulary: [
            say('batuketa', 'suma', 'الجمع', 'sum'),
            say('kentzea', 'resta', 'الطرح', 'subtract'),
            say('dimentsio bera', 'misma dimensión', 'الأبعاد نفسها', 'same size')
        ],
        explanation: say(
            'Bi matrize batzeko edo kentzeko, dimentsio bera izan behar dute, eta leku bakoitzeko elementuak batzen edo kentzen dira. $kA$ matrizea zenbaki batez biderkatzean, $k$ zenbakiak elementu guztiak biderkatzen ditu. Batuketak zenbakienak bezala jokatzen du: trukakorra eta elkarkorra da.',
            'Para sumar o restar dos matrices tienen que tener la misma dimensión, y se suman o se restan los elementos de cada sitio. Al multiplicar por un número, $kA$, el número $k$ multiplica todos los elementos. La suma se porta como la de números: es conmutativa y asociativa.',
            'لجمع مصفوفتين أو طرحهما يجب أن تكون لهما الأبعاد نفسها، ونجمع أو نطرح عناصر كل موضع. وعند الضرب في عدد $kA$ يضرب العدد $k$ كل العناصر. والجمع يتصرف مثل جمع الأعداد: تبديلي وتجميعي.',
            'To add or subtract two matrices they must have the same size, and you add or subtract the entries in each place. When you multiply by a number, $kA$, the number $k$ multiplies every entry. The sum behaves like that of numbers: it is commutative and associative.'
        ),
        examplePrompt: say('Aurkitu $X$, $X+\\begin{pmatrix}2&-1\\\\5&0\\end{pmatrix}=\\begin{pmatrix}7&3\\\\5&-4\\end{pmatrix}$ izan dadin.', 'Halla $X$ tal que $X+\\begin{pmatrix}2&-1\\\\5&0\\end{pmatrix}=\\begin{pmatrix}7&3\\\\5&-4\\end{pmatrix}$.', 'أوجد $X$ بحيث $X+\\begin{pmatrix}2&-1\\\\5&0\\end{pmatrix}=\\begin{pmatrix}7&3\\\\5&-4\\end{pmatrix}$.', 'Find $X$ such that $X+\\begin{pmatrix}2&-1\\\\5&0\\end{pmatrix}=\\begin{pmatrix}7&3\\\\5&-4\\end{pmatrix}$.'),
        example: same('$X=\\begin{pmatrix}7-2&3+1\\\\5-5&-4-0\\end{pmatrix}=\\begin{pmatrix}5&4\\\\0&-4\\end{pmatrix}$'),
        exampleAnswer: say('Kendu emandako matrizea bi aldeetan, elementuz elementu.', 'Resta la matriz dada en los dos miembros, elemento a elemento.', 'اطرح المصفوفة المعطاة من الطرفين، عنصرًا عنصرًا.', 'Subtract the given matrix from both sides, entry by entry.')
    },
    'matrix-product': {
        definitions: [
            { term: say('Matrizeen biderkadura', 'Producto de matrices', 'ضرب المصفوفات', 'Matrix product'), meaning: say('$c_{ij}$ elementua ($AB$ matrizean): $A$ matrizearen $i$ errenkada bider $B$ matrizearen $j$ zutabea, biderkadurak batuta.', 'El elemento $c_{ij}$ de $AB$: la fila $i$ de $A$ por la columna $j$ de $B$, sumando los productos.', 'العنصر $c_{ij}$ من $AB$: الصف $i$ من $A$ في العمود $j$ من $B$، مع جمع الحواصل.', 'The entry $c_{ij}$ of $AB$: row $i$ of $A$ times column $j$ of $B$, adding up the products.') }
        ],
        vocabulary: [
            say('errenkada bider zutabe', 'fila por columna', 'صف في عمود', 'row by column'),
            say('dimentsioa', 'dimensión', 'الأبعاد', 'size')
        ],
        explanation: say(
            '$c_{ij}$ kalkulatzeko, hartu $A$ matrizearen $i$ errenkada eta $B$ matrizearen $j$ zutabea, biderkatu banan-banan eta batu. Horretarako, $A$ matrizeak $B$ matrizeak errenkadak adina zutabe izan behar ditu: $(m\\times n)(n\\times p)$ biderkadurak $m\\times p$ dimentsioa du.',
            'Para hallar $c_{ij}$, toma la fila $i$ de $A$ y la columna $j$ de $B$, multiplica uno a uno y suma. Para eso, $A$ tiene que tener tantas columnas como filas tiene $B$: $(m\\times n)(n\\times p)$ da una matriz de dimensión $m\\times p$.',
            'لإيجاد $c_{ij}$ خذ الصف $i$ من $A$ والعمود $j$ من $B$، واضرب عنصرًا في عنصر ثم اجمع. ولهذا يجب أن يكون عدد أعمدة $A$ مساويًا لعدد صفوف $B$: $(m\\times n)(n\\times p)$ يعطي مصفوفة أبعادها $m\\times p$.',
            'To find $c_{ij}$, take row $i$ of $A$ and column $j$ of $B$, multiply them one by one and add. For that, $A$ must have as many columns as $B$ has rows: $(m\\times n)(n\\times p)$ gives a matrix of size $m\\times p$.'
        ),
        examplePrompt: say('Kalkulatu $\\begin{pmatrix}2&-1\\end{pmatrix}\\begin{pmatrix}3&1\\\\4&5\\end{pmatrix}$.', 'Calcula $\\begin{pmatrix}2&-1\\end{pmatrix}\\begin{pmatrix}3&1\\\\4&5\\end{pmatrix}$.', 'احسب $\\begin{pmatrix}2&-1\\end{pmatrix}\\begin{pmatrix}3&1\\\\4&5\\end{pmatrix}$.', 'Work out $\\begin{pmatrix}2&-1\\end{pmatrix}\\begin{pmatrix}3&1\\\\4&5\\end{pmatrix}$.'),
        example: same('$\\begin{pmatrix}2\\cdot 3-1\\cdot 4&2\\cdot 1-1\\cdot 5\\end{pmatrix}=\\begin{pmatrix}2&-3\\end{pmatrix}$'),
        exampleAnswer: say('$(1\\times 2)(2\\times 2)$ biderkadurak $1\\times 2$ ematen du: errenkada bat.', '$(1\\times 2)(2\\times 2)$ da $1\\times 2$: una fila.', '$(1\\times 2)(2\\times 2)$ يعطي $1\\times 2$: صفًّا واحدًا.', '$(1\\times 2)(2\\times 2)$ gives $1\\times 2$: one row.'),
        why: {
            text: say('Zergatik izan behar dute neurri bera errenkadak eta zutabeak? Errenkadako zenbaki bakoitza zutabeko batekin biderkatzen da, binaka; bat soberan badago, ez du bikoterik.', '¿Por qué tienen que medir lo mismo la fila y la columna? Cada número de la fila se multiplica con uno de la columna, por parejas; si sobra uno, se queda sin pareja.', 'لماذا يجب أن يتساوى طول الصف وطول العمود؟ كل عدد في الصف يُضرب في عدد من العمود زوجًا زوجًا؛ وإذا زاد عدد بقي بلا زوج.', 'Why must the row and the column have the same length? Each number of the row is multiplied by one of the column, in pairs; if one is left over, it has no partner.')
        }
    },
    'product-properties': {
        definitions: [
            { term: say('Trukakorra', 'Conmutativo', 'تبديلي', 'Commutative'), meaning: say('Ordenak ematen duena aldatzen ez duenean: $ab=ba$. Matrizeen biderkadura ez da trukakorra.', 'Cuando el orden no cambia el resultado: $ab=ba$. El producto de matrices no lo es.', 'عندما لا يغيّر الترتيب الناتج: $ab=ba$. وضرب المصفوفات ليس كذلك.', 'When the order does not change the result: $ab=ba$. The matrix product is not.') }
        ],
        vocabulary: [
            say('elkarkorra', 'asociativa', 'تجميعية', 'associative'),
            say('banatzailea', 'distributiva', 'توزيعية', 'distributive'),
            say('ordena', 'orden', 'الترتيب', 'order')
        ],
        explanation: say(
            'Biderkadurak zenbakienaren propietate batzuk ditu: elkarkorra eta banatzailea da, eta $I$ matrizeak ez du ezer aldatzen. Baina ordenak garrantzia du: oro har, $AB\\neq BA$. Gainera, $AB=O$ izan daiteke $A$ eta $B$ nuluak izan gabe.',
            'El producto cumple algunas propiedades de los números: es asociativo y distributivo, e $I$ no cambia nada. Pero el orden importa: en general, $AB\\neq BA$. Además, puede ser $AB=O$ sin que $A$ ni $B$ sean nulas.',
            'يحقق الضرب بعض خواص الأعداد: فهو تجميعي وتوزيعي، و$I$ لا تغيّر شيئًا. لكن الترتيب مهم: عمومًا $AB\\neq BA$. وقد يكون أيضًا $AB=O$ دون أن تكون $A$ أو $B$ صفرية.',
            'The product keeps some properties of numbers: it is associative and distributive, and $I$ changes nothing. But the order matters: in general, $AB\\neq BA$. Also, $AB=O$ can happen without $A$ or $B$ being zero.'
        ),
        cases: [
            { title: say('Betetzen dira', 'Se cumplen', 'تتحقق', 'They hold'), text: say('Elkarkorra, banatzailea eta identitatea.', 'Asociativa, distributiva e identidad.', 'التجميع والتوزيع والمحايد.', 'Associative, distributive and identity.'), math: same('$A(BC)=(AB)C\\quad A(B+C)=AB+AC\\quad AI=IA=A$') },
            { title: say('Ez dira betetzen', 'No se cumplen', 'لا تتحقق', 'They do not hold'), text: say('Biderkadura nulua: $AB=O$, eta ez $A$ ez $B$ ez dira nuluak.', 'Producto nulo: $AB=O$ sin que $A$ o $B$ sean nulas.', 'جداء صفري: $AB=O$ دون أن تكون $A$ أو $B$ صفرية.', 'Zero product: $AB=O$ with neither $A$ nor $B$ zero.'), math: same('$\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}\\begin{pmatrix}2&-4\\\\-1&2\\end{pmatrix}=\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$') }
        ],
        examplePrompt: say('Kalkulatu $AB$ eta $BA$, $A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$ eta $B=\\begin{pmatrix}0&0\\\\1&0\\end{pmatrix}$ badira.', 'Calcula $AB$ y $BA$ con $A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$ y $B=\\begin{pmatrix}0&0\\\\1&0\\end{pmatrix}$.', 'احسب $AB$ و$BA$ مع $A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$ و$B=\\begin{pmatrix}0&0\\\\1&0\\end{pmatrix}$.', 'Work out $AB$ and $BA$ with $A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$ and $B=\\begin{pmatrix}0&0\\\\1&0\\end{pmatrix}$.'),
        example: same('$AB=\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}\\qquad BA=\\begin{pmatrix}0&0\\\\0&1\\end{pmatrix}$'),
        exampleAnswer: say('Desberdinak dira: ordenak emaitza aldatzen du.', 'Son distintas: el orden cambia el resultado.', 'هما مختلفتان: الترتيب يغيّر الناتج.', 'They are different: the order changes the result.'),
        why: {
            text: say('Zergatik $(A+B)^2\\neq A^2+2AB+B^2$? $(A+B)(A+B)$ garatzean $AB$ eta $BA$ ateratzen dira, eta ezin dira bildu desberdinak badira.', '¿Por qué $(A+B)^2\\neq A^2+2AB+B^2$? Al desarrollar $(A+B)(A+B)$ salen $AB$ y $BA$, que no se pueden juntar si son distintas.', 'لماذا $(A+B)^2\\neq A^2+2AB+B^2$؟ عند فك $(A+B)(A+B)$ يظهر $AB$ و$BA$، ولا يجتمعان إذا كانا مختلفين.', 'Why is $(A+B)^2\\neq A^2+2AB+B^2$? Expanding $(A+B)(A+B)$ gives $AB$ and $BA$, which cannot be put together if they are different.'),
            math: same('$(A+B)^2=A^2+AB+BA+B^2$')
        }
    },
    'matrix-applications': {
        definitions: [
            { term: say('Grafo baten matrizea', 'Matriz de un grafo', 'مصفوفة البيان', 'Matrix of a graph'), meaning: say('$a_{ij}$ elementua $i$ erpinetik $j$ erpinera doazen gezien kopurua da.', '$a_{ij}$ es el número de flechas que van del vértice $i$ al $j$.', '$a_{ij}$ عدد الأسهم من الرأس $i$ إلى الرأس $j$.', '$a_{ij}$ is the number of arrows from vertex $i$ to vertex $j$.') }
        ],
        vocabulary: [
            say('taula', 'tabla', 'الجدول', 'table'),
            say('erpina', 'vértice', 'الرأس', 'vertex'),
            say('gezia', 'flecha', 'السهم', 'arrow')
        ],
        explanation: say(
            'Datuen taula bat matrize bat da. Bi taula biderkatzeak zentzua du lehenaren zutabeek bigarrenaren errenkadek bezala gauza berberak izendatzen dituztenean: produktuak, adibidez. Grafo batean, $A^2$ matrizeak bi urratseko bideak zenbatzen ditu: $i$ erpinetik $k$ erpinera eta $k$ erpinetik $j$ erpinera.',
            'Una tabla de datos es una matriz. Multiplicar dos tablas tiene sentido cuando las columnas de la primera nombran lo mismo que las filas de la segunda: los productos, por ejemplo. En un grafo, $A^2$ cuenta los caminos de dos pasos: del vértice $i$ al $k$ y del $k$ al $j$.',
            'جدول البيانات مصفوفة. ولضرب جدولين معنى عندما تسمّي أعمدة الأول ما تسمّيه صفوف الثاني: المنتجات مثلًا. وفي البيان تعدّ $A^2$ المسارات ذات الخطوتين: من الرأس $i$ إلى $k$ ومن $k$ إلى $j$.',
            'A table of data is a matrix. Multiplying two tables makes sense when the columns of the first name the same things as the rows of the second: the products, for example. In a graph, $A^2$ counts the two-step paths: from vertex $i$ to $k$ and from $k$ to $j$.'
        ),
        examplePrompt: say('Grafo baten matrizea $\\begin{pmatrix}0&1&1\\\\1&0&0\\\\0&1&0\\end{pmatrix}$ da. Zenbat bi urratseko bide doaz 1 erpinetik 2 erpinera?', 'La matriz de un grafo es $\\begin{pmatrix}0&1&1\\\\1&0&0\\\\0&1&0\\end{pmatrix}$. ¿Cuántos caminos de dos pasos van del vértice 1 al 2?', 'مصفوفة بيان هي $\\begin{pmatrix}0&1&1\\\\1&0&0\\\\0&1&0\\end{pmatrix}$. كم مسارًا بخطوتين يذهب من الرأس 1 إلى الرأس 2؟', 'The matrix of a graph is $\\begin{pmatrix}0&1&1\\\\1&0&0\\\\0&1&0\\end{pmatrix}$. How many two-step paths go from vertex 1 to vertex 2?'),
        example: same('$(A^2)_{12}=0\\cdot 1+1\\cdot 0+1\\cdot 1=1$'),
        exampleAnswer: say('Bide bat: 1 → 3 → 2.', 'Un camino: 1 → 3 → 2.', 'مسار واحد: 1 → 3 → 2.', 'One path: 1 → 3 → 2.')
    },

    /* ---------- 3. Rank ---------- */
    'linear-dependence': {
        definitions: [
            { term: say('Konbinazio lineala', 'Combinación lineal', 'التركيب الخطي', 'Linear combination'), meaning: say('Errenkadak zenbakiz biderkatuta eta batuta: $aE_1+bE_2$.', 'Filas multiplicadas por números y sumadas: $aE_1+bE_2$.', 'صفوف مضروبة في أعداد ثم مجموعة: $aE_1+bE_2$.', 'Rows multiplied by numbers and added: $aE_1+bE_2$.') },
            { term: say('Linealki independenteak', 'Linealmente independientes', 'مستقلة خطيًا', 'Linearly independent'), meaning: say('Errenkada bat ere ez da besteen konbinazio lineala. Bestela, linealki menpekoak dira.', 'Ninguna fila es combinación lineal de las otras. Si no, son linealmente dependientes.', 'لا يكون أي صف تركيبًا خطيًا من الأخرى. وإلا فهي مرتبطة خطيًا.', 'No row is a linear combination of the others. Otherwise, they are linearly dependent.') }
        ],
        vocabulary: [
            say('multiploa', 'múltiplo', 'المضاعف', 'multiple'),
            say('zeroko errenkada', 'fila de ceros', 'صف الأصفار', 'row of zeros')
        ],
        explanation: say(
            'Errenkada bat beste batzuen menpekoa da haien konbinazio lineala bada; bi errenkadarekin, bata bestearen multiploa bada. Errenkada menpeko batek ez du ezer berririk ematen: informazio bera errepikatzen du. Zeroko errenkada bat beti da menpekoa.',
            'Una fila depende de otras si es combinación lineal de ellas; con dos filas, si una es múltiplo de la otra. Una fila dependiente no aporta nada nuevo: repite información. Una fila de ceros siempre es dependiente.',
            'يعتمد صف على صفوف أخرى إذا كان تركيبًا خطيًا منها؛ ومع صفين إذا كان أحدهما مضاعفًا للآخر. والصف المرتبط لا يضيف جديدًا: يكرر المعلومات. وصف الأصفار مرتبط دائمًا.',
            'A row depends on others if it is a linear combination of them; with two rows, if one is a multiple of the other. A dependent row adds nothing new: it repeats information. A row of zeros is always dependent.'
        ),
        examplePrompt: say('Menpekoak al dira $(2,-1,3)$ eta $(-6,3,-9)$?', '¿Son dependientes $(2,-1,3)$ y $(-6,3,-9)$?', 'هل $(2,-1,3)$ و$(-6,3,-9)$ مرتبطان خطيًا؟', 'Are $(2,-1,3)$ and $(-6,3,-9)$ dependent?'),
        example: same('$(-6,3,-9)=-3\\cdot(2,-1,3)$'),
        exampleAnswer: say('Bai: bigarrena lehenaren $-3$ aldiz da.', 'Sí: la segunda es $-3$ veces la primera.', 'نعم: الثاني يساوي $-3$ مرة الأول.', 'Yes: the second is $-3$ times the first.'),
        why: {
            text: say('Zergatik da beti menpekoa zeroko errenkada bat? Edozein errenkada 0 zenbakiaz biderkatuta lortzen delako: beste baten konbinazio lineala da.', '¿Por qué una fila de ceros siempre es dependiente? Porque sale de multiplicar cualquier otra por 0: es combinación lineal de ella.', 'لماذا يكون صف الأصفار مرتبطًا دائمًا؟ لأنه ينتج من ضرب أي صف آخر في 0: فهو تركيب خطي منه.', 'Why is a row of zeros always dependent? Because it comes from multiplying any other row by 0: it is a linear combination of it.'),
            math: same('$(0,0,0)=0\\cdot(4,1,5)$')
        }
    },
    'rank-gauss': {
        definitions: [
            { term: say('Heina', 'Rango', 'الرتبة', 'Rank'), meaning: say('$\\operatorname{rg}(A)$: linealki independenteak diren errenkaden kopuru handiena. Zutabeekin ere bera ateratzen da.', '$\\operatorname{rg}(A)$: el mayor número de filas linealmente independientes. Con las columnas sale lo mismo.', '$\\operatorname{rg}(A)$: أكبر عدد من الصفوف المستقلة خطيًا. ومع الأعمدة نحصل على العدد نفسه.', '$\\operatorname{rg}(A)$: the largest number of linearly independent rows. Columns give the same number.') },
            { term: say('Matrize mailakatua', 'Matriz escalonada', 'المصفوفة الدرجية', 'Echelon form'), meaning: say('Errenkada bakoitzak aurrekoak baino zero gehiago ditu hasieran, eskailera bat bezala.', 'Cada fila empieza con más ceros que la anterior, como una escalera.', 'يبدأ كل صف بأصفار أكثر من الصف السابق، مثل الدرج.', 'Each row starts with more zeros than the one before, like a staircase.') }
        ],
        vocabulary: [
            say('mailakatu', 'escalonar', 'الشكل الدرجي', 'reduce'),
            say('Gaussen metodoa', 'método de Gauss', 'طريقة غاوس', 'Gaussian elimination')
        ],
        explanation: say(
            'Heina kalkulatzeko, mailakatu matrizea Gaussen metodoaz: egin zeroak pibot bakoitzaren azpian. Eragiketa horiek ez dute heina aldatzen. Amaieran, zenbatu zeroz osatuta ez dauden errenkadak: horixe da heina. Heina ezin da izan errenkada edo zutabe kopurua baino handiagoa.',
            'Para hallar el rango, escalona la matriz por el método de Gauss: haz ceros debajo de cada pivote. Esas operaciones no cambian el rango. Al final, cuenta las filas que no son de ceros: ese es el rango. Nunca puede pasar del número de filas ni del de columnas.',
            'لإيجاد الرتبة حوّل المصفوفة إلى الشكل الدرجي بطريقة غاوس: اجعل أصفارًا تحت كل محور. وهذه العمليات لا تغيّر الرتبة. وفي النهاية عُدّ الصفوف التي ليست أصفارًا: ذلك هو الرتبة. ولا تتجاوز الرتبة عدد الصفوف ولا عدد الأعمدة.',
            'To find the rank, reduce the matrix by Gaussian elimination: make zeros under each pivot. Those operations do not change the rank. At the end, count the rows that are not all zeros: that is the rank. It can never be more than the number of rows or of columns.'
        ),
        examplePrompt: say('Kalkulatu $\\begin{pmatrix}2&4\\\\-3&-6\\\\1&2\\end{pmatrix}$ matrizearen heina.', 'Calcula el rango de $\\begin{pmatrix}2&4\\\\-3&-6\\\\1&2\\end{pmatrix}$.', 'احسب رتبة $\\begin{pmatrix}2&4\\\\-3&-6\\\\1&2\\end{pmatrix}$.', 'Find the rank of $\\begin{pmatrix}2&4\\\\-3&-6\\\\1&2\\end{pmatrix}$.'),
        example: same('$E_1-2E_3,\\ E_2+3E_3\\ \\to\\ \\begin{pmatrix}0&0\\\\0&0\\\\1&2\\end{pmatrix}$'),
        exampleAnswer: say('$\\operatorname{rg}=1$: hiru errenkadak $(1,2)$ errenkadaren multiploak dira.', '$\\operatorname{rg}=1$: las tres filas son múltiplos de $(1,2)$.', '$\\operatorname{rg}=1$: الصفوف الثلاثة مضاعفات لـ $(1,2)$.', '$\\operatorname{rg}=1$: the three rows are multiples of $(1,2)$.'),
        why: {
            text: say('Zergatik ez dute heina aldatzen Gaussen eragiketek? Errenkada bati beste baten multiplo bat batzeak ez du menpekotasunik sortzen edo kentzen: errenkada berrien konbinazioak zaharrenak dira.', '¿Por qué las operaciones de Gauss no cambian el rango? Sumar a una fila un múltiplo de otra no crea ni quita dependencias: las combinaciones de las filas nuevas son las de las viejas.', 'لماذا لا تغيّر عمليات غاوس الرتبة؟ إضافة مضاعف صف إلى صف آخر لا تُنشئ ارتباطًا ولا تزيله: تراكيب الصفوف الجديدة هي تراكيب القديمة.', 'Why do the Gauss operations not change the rank? Adding a multiple of one row to another neither creates nor removes dependence: the combinations of the new rows are those of the old ones.')
        }
    },
    'rank-parameter': {
        definitions: [
            { term: say('Parametroa', 'Parámetro', 'الوسيط', 'Parameter'), meaning: say('Matrizearen barruko letra bat ($m$, $k$…); balio bakoitzak beste matrize bat ematen du.', 'Una letra dentro de la matriz ($m$, $k$…); cada valor da otra matriz.', 'حرف داخل المصفوفة ($m$ أو $k$…)؛ وكل قيمة تعطي مصفوفة أخرى.', 'A letter inside the matrix ($m$, $k$…); each value gives a different matrix.') }
        ],
        vocabulary: [
            say('balio kritikoa', 'valor crítico', 'القيمة الحرجة', 'critical value'),
            say('zatitu', 'dividir', 'القسمة', 'divide')
        ],
        explanation: say(
            'Mailakatu letra barruan dela, zenbakiekin bezala. Azken errenkadetan $m$ adierazpenak geratzen dira: berdindu zerora balio kritikoak aurkitzeko. Balio horietarako errenkada bat zero bihurtzen da eta heina jaitsi egiten da; gainerako guztietarako, heina handiagoa da.',
            'Escalona con la letra dentro, como si fuera un número. En las últimas filas quedan expresiones con $m$: iguálalas a cero para hallar los valores críticos. Para esos valores una fila se anula y el rango baja; para todos los demás, el rango es mayor.',
            'حوّل إلى الشكل الدرجي والحرف داخل المصفوفة كأنه عدد. تبقى في الصفوف الأخيرة عبارات فيها $m$: ساوِها بالصفر لتجد القيم الحرجة. ولهذه القيم ينعدم صف وتنقص الرتبة، ولكل القيم الأخرى تكون الرتبة أكبر.',
            'Reduce with the letter inside, as if it were a number. Expressions in $m$ are left in the last rows: set them equal to zero to find the critical values. For those values a row vanishes and the rank goes down; for all the others, the rank is larger.'
        ),
        cases: [
            { title: say('Balio kritikoa', 'El valor crítico', 'القيمة الحرجة', 'The critical value'), text: say('Errenkada bat zero bihurtzen da: heina jaitsi egiten da.', 'Una fila se hace de ceros: el rango baja.', 'يصير صف أصفارًا: تنقص الرتبة.', 'A row turns into zeros: the rank goes down.') },
            { title: say('Beste balioak', 'Los demás valores', 'القيم الأخرى', 'The other values'), text: say('Errenkada horrek pibot bat du: heina ez da jaisten.', 'Esa fila tiene pivote: el rango no baja.', 'لذلك الصف محور: لا تنقص الرتبة.', 'That row has a pivot: the rank does not go down.') }
        ],
        examplePrompt: say('Aztertu $\\begin{pmatrix}1&2\\\\3&k\\end{pmatrix}$ matrizearen heina, $k$ parametroaren arabera.', 'Estudia el rango de $\\begin{pmatrix}1&2\\\\3&k\\end{pmatrix}$ según $k$.', 'ادرس رتبة $\\begin{pmatrix}1&2\\\\3&k\\end{pmatrix}$ حسب $k$.', 'Study the rank of $\\begin{pmatrix}1&2\\\\3&k\\end{pmatrix}$ for the values of $k$.'),
        example: same('$E_2-3E_1\\ \\to\\ (0,\\ k-6)$'),
        exampleAnswer: say('$k=6$ denean, heina 1 da; bestela, 2.', 'Con $k=6$ el rango es 1; si no, 2.', 'مع $k=6$ تكون الرتبة 1، وإلا فهي 2.', 'With $k=6$ the rank is 1; otherwise, 2.')
    },

    /* ---------- 4. Inverse and powers ---------- */
    'inverse-definition': {
        definitions: [
            { term: say('Alderantzizko matrizea', 'Matriz inversa', 'المصفوفة المعكوسة', 'Inverse matrix'), meaning: say('$A^{-1}$: $AA^{-1}=A^{-1}A=I$ betetzen duen matrizea.', '$A^{-1}$: la matriz que cumple $AA^{-1}=A^{-1}A=I$.', '$A^{-1}$: المصفوفة التي تحقق $AA^{-1}=A^{-1}A=I$.', '$A^{-1}$: the matrix with $AA^{-1}=A^{-1}A=I$.') },
            { term: say('Matrize erregularra', 'Matriz regular', 'المصفوفة القابلة للعكس', 'Invertible matrix'), meaning: say('Alderantzizkoa duen matrize karratua. Ez badu, singularra da.', 'Una matriz cuadrada que tiene inversa. Si no la tiene, es singular.', 'مصفوفة مربعة لها معكوس. وإن لم يكن لها فهي منفردة.', 'A square matrix that has an inverse. If it has none, it is singular.') }
        ],
        vocabulary: [
            say('heina', 'rango', 'الرتبة', 'rank'),
            say('egiaztatu', 'comprobar', 'التحقق', 'check')
        ],
        explanation: say(
            'Zenbakietan $a\\cdot\\frac{1}{a}=1$ den bezala, matrizeetan $AA^{-1}=I$. Matrize karratuek bakarrik izan dezakete alderantzizkoa, eta haien heina maximoa denean bakarrik. $2\\times 2$ matrize batean, $A^{-1}$ ezezagunez idatz daiteke, eta $AA^{-1}=I$ berdintzak bi sistema ematen ditu.',
            'Igual que $a\\cdot\\frac{1}{a}=1$ con números, con matrices $AA^{-1}=I$. Solo las matrices cuadradas pueden tener inversa, y solo si su rango es máximo. En una $2\\times 2$ se puede escribir $A^{-1}$ con incógnitas: la igualdad $AA^{-1}=I$ da dos sistemas.',
            'كما أن $a\\cdot\\frac{1}{a}=1$ في الأعداد، يكون $AA^{-1}=I$ في المصفوفات. ولا يكون معكوس إلا للمصفوفات المربعة، وفقط إذا كانت رتبتها عظمى. وفي مصفوفة $2\\times 2$ يمكن كتابة $A^{-1}$ بمجاهيل: المساواة $AA^{-1}=I$ تعطي نظامين.',
            'Just as $a\\cdot\\frac{1}{a}=1$ with numbers, with matrices $AA^{-1}=I$. Only square matrices can have an inverse, and only if their rank is full. In a $2\\times 2$ you can write $A^{-1}$ with unknowns: the equality $AA^{-1}=I$ gives two systems.'
        ),
        examplePrompt: say('$\\begin{pmatrix}1&-2\\\\-1&3\\end{pmatrix}$ al da $\\begin{pmatrix}3&2\\\\1&1\\end{pmatrix}$ matrizearen alderantzizkoa?', '¿Es $\\begin{pmatrix}1&-2\\\\-1&3\\end{pmatrix}$ la inversa de $\\begin{pmatrix}3&2\\\\1&1\\end{pmatrix}$?', 'هل $\\begin{pmatrix}1&-2\\\\-1&3\\end{pmatrix}$ معكوس $\\begin{pmatrix}3&2\\\\1&1\\end{pmatrix}$؟', 'Is $\\begin{pmatrix}1&-2\\\\-1&3\\end{pmatrix}$ the inverse of $\\begin{pmatrix}3&2\\\\1&1\\end{pmatrix}$?'),
        example: same('$\\begin{pmatrix}3&2\\\\1&1\\end{pmatrix}\\begin{pmatrix}1&-2\\\\-1&3\\end{pmatrix}=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$'),
        exampleAnswer: say('Bai: biderkadura $I$ da.', 'Sí: el producto es $I$.', 'نعم: الجداء هو $I$.', 'Yes: the product is $I$.'),
        why: {
            text: say('Zergatik ez du alderantzizkorik heina maximoa ez denean? $A$ matrizeko errenkada bat besteen menpekoa bada, $AX$ biderkaduran ere menpekoa da, eta $I$ matrizeak ez du errenkada menpekorik.', '¿Por qué no hay inversa si el rango no es máximo? Si una fila de $A$ depende de las otras, en $AX$ esa fila también depende, y la identidad $I$ no tiene ninguna fila dependiente.', 'لماذا لا يوجد معكوس إذا لم تكن الرتبة عظمى؟ إذا ارتبط صف من $A$ بالصفوف الأخرى ارتبط أيضًا في $AX$، والمصفوفة المحايدة $I$ ليس فيها صف مرتبط.', 'Why is there no inverse if the rank is not full? If a row of $A$ depends on the others, that row also depends in $AX$, and the identity $I$ has no dependent row.')
        }
    },
    'gauss-jordan': {
        definitions: [
            { term: say('Pibota', 'Pivote', 'المحور', 'Pivot'), meaning: say('Errenkada mailakatu bateko 0 ez den lehen zenbakia; haren azpian eta gainean zeroak egiten dira.', 'El primer número distinto de 0 de una fila escalonada; debajo y encima de él se hacen ceros.', 'أول عدد غير 0 في صف درجي؛ نجعل تحته وفوقه أصفارًا.', 'The first number other than 0 in a reduced row; zeros are made below and above it.') }
        ],
        vocabulary: [
            say('ezkerreko zatia', 'parte izquierda', 'الجزء الأيسر', 'left part'),
            say('errenkada osoa', 'fila entera', 'الصف كله', 'whole row')
        ],
        explanation: say(
            'Idatzi $(A\\mid I)$ eta egin errenkada-eragiketak $(I\\mid A^{-1})$ lortu arte: lehenik zeroak diagonalaren azpian, gero gainean, eta azkenik zatitu errenkada bakoitza bere pibotaz. Eragiketak errenkada osoan egiten dira. Ezkerreko zatian zeroko errenkada bat ateratzen bada, $A$ matrizeak ez du alderantzizkorik.',
            'Escribe $(A\\mid I)$ y haz operaciones de fila hasta tener $(I\\mid A^{-1})$: primero ceros debajo de la diagonal, después encima, y al final divide cada fila por su pivote. Las operaciones se hacen en la fila entera. Si a la izquierda sale una fila de ceros, $A$ no tiene inversa.',
            'اكتب $(A\\mid I)$ وأجرِ عمليات على الصفوف حتى تحصل على $(I\\mid A^{-1})$: أولًا أصفار تحت القطر، ثم فوقه، وأخيرًا اقسم كل صف على محوره. وتُجرى العمليات على الصف كله. وإذا ظهر في الجزء الأيسر صف أصفار فليس لـ $A$ معكوس.',
            'Write $(A\\mid I)$ and do row operations until you have $(I\\mid A^{-1})$: first zeros below the diagonal, then above, and finally divide each row by its pivot. The operations are done on the whole row. If a row of zeros appears on the left part, $A$ has no inverse.'
        ),
        examplePrompt: say('Kalkulatu $\\begin{pmatrix}2&0\\\\1&1\\end{pmatrix}$ matrizearen alderantzizkoa Gauss-Jordan metodoaz.', 'Halla la inversa de $\\begin{pmatrix}2&0\\\\1&1\\end{pmatrix}$ por Gauss-Jordan.', 'أوجد معكوس $\\begin{pmatrix}2&0\\\\1&1\\end{pmatrix}$ بطريقة غاوس-جوردان.', 'Find the inverse of $\\begin{pmatrix}2&0\\\\1&1\\end{pmatrix}$ by Gauss–Jordan.'),
        example: same('$\\frac{1}{2}E_1,\\ E_2-E_1\\ \\to\\ \\left(\\begin{array}{cc|cc}1&0&\\frac{1}{2}&0\\\\0&1&-\\frac{1}{2}&1\\end{array}\\right)$'),
        exampleAnswer: say('$A^{-1}$ eskuineko zatia da.', '$A^{-1}$ es la parte de la derecha.', '$A^{-1}$ هو الجزء الأيمن.', '$A^{-1}$ is the right part.'),
        why: {
            text: say('Zergatik dabil? Errenkada-eragiketa bakoitza matrize batez ezkerretik biderkatzea da. Guztiek batera $A$ bihurtzen badute $I$, haien biderkadura $A^{-1}$ da, eta $I$ ere $A^{-1}$ bihurtzen dute.', '¿Por qué funciona? Cada operación de fila es multiplicar por una matriz a la izquierda. Si todas juntas convierten $A$ en $I$, su producto es $A^{-1}$, y convierten $I$ en $A^{-1}$.', 'لماذا تنجح؟ كل عملية على الصفوف ضربٌ في مصفوفة من اليسار. فإذا حوّلت كلها معًا $A$ إلى $I$ كان جداؤها $A^{-1}$، وتحوّل $I$ إلى $A^{-1}$.', 'Why does it work? Each row operation is a multiplication by a matrix on the left. If together they turn $A$ into $I$, their product is $A^{-1}$, and they turn $I$ into $A^{-1}$.')
        }
    },
    'matrix-powers': {
        definitions: [
            { term: say('Matrize baten berretura', 'Potencia de una matriz', 'قوة المصفوفة', 'Power of a matrix'), meaning: say('$A^n=A\\cdot A\\cdots A$, $n$ aldiz; matrize karratuek bakarrik dute.', '$A^n=A\\cdot A\\cdots A$, $n$ veces; solo existe para matrices cuadradas.', '$A^n=A\\cdot A\\cdots A$ عدد $n$ من المرات؛ ولا توجد إلا للمصفوفات المربعة.', '$A^n=A\\cdot A\\cdots A$, $n$ times; only square matrices have it.') }
        ],
        vocabulary: [
            say('eredua', 'patrón', 'النمط', 'pattern'),
            say('errepikatu', 'se repite', 'يتكرر', 'repeat')
        ],
        explanation: say(
            'Berretura handi bat kalkulatzeko, ez biderkatu ehun aldiz: kalkulatu $A^2$, $A^3$… eredua ikusi arte. Batzuetan berreturak errepikatu egiten dira ($A^k=I$ eta berriro hasten da); beste batzuetan, zenbaki bat $n$ berretzailearekin hazten da.',
            'Para una potencia grande no multipliques cien veces: calcula $A^2$, $A^3$… hasta ver el patrón. Unas veces las potencias se repiten ($A^k=I$ y vuelve a empezar); otras, un número crece con el exponente $n$.',
            'لحساب قوة كبيرة لا تضرب مئة مرة: احسب $A^2$ و$A^3$… حتى ترى النمط. أحيانًا تتكرر القوى ($A^k=I$ ثم تبدأ من جديد)، وأحيانًا يكبر عدد مع الأس $n$.',
            'For a large power, do not multiply a hundred times: work out $A^2$, $A^3$… until you see the pattern. Sometimes the powers repeat ($A^k=I$ and it starts again); other times a number grows with the exponent $n$.'
        ),
        cases: [
            { title: say('Errepikatzen dira', 'Se repiten', 'تتكرر', 'They repeat'), text: say('$A^4=I$ bada, zatitu $n$ zenbakia 4 zenbakiaz: hondarrak ematen du berretura.', 'Si $A^4=I$, divide $n$ entre 4: el resto da la potencia.', 'إذا كان $A^4=I$ فاقسم $n$ على 4: الباقي يعطي القوة.', 'If $A^4=I$, divide $n$ by 4: the remainder gives the power.'), math: same('$A^{4q+r}=(A^4)^qA^r=A^r$') },
            { title: say('Eredu bat dute', 'Siguen un patrón', 'تتبع نمطًا', 'They follow a pattern'), text: say('Elementu batek $n$ berretzailearekin hazten da: idatzi $A^n$ formula batekin.', 'Un elemento crece con $n$: escribe $A^n$ con una fórmula.', 'عنصر يكبر مع $n$: اكتب $A^n$ بصيغة.', 'An entry grows with $n$: write $A^n$ with a formula.'), math: same('$\\begin{pmatrix}1&0\\\\3&1\\end{pmatrix}^n=\\begin{pmatrix}1&0\\\\3n&1\\end{pmatrix}$') }
        ],
        examplePrompt: say('Kalkulatu $B^{50}$, $B=\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$ bada.', 'Calcula $B^{50}$ con $B=\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$.', 'احسب $B^{50}$ مع $B=\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$.', 'Work out $B^{50}$ with $B=\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$.'),
        example: same('$B^2=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}=I\\ \\to\\ B^{50}=(B^2)^{25}=I$'),
        exampleAnswer: say('$B^{50}=I$: berretzaile bikoiti guztiek $I$ ematen dute.', '$B^{50}=I$: todos los exponentes pares dan $I$.', '$B^{50}=I$: كل الأسس الزوجية تعطي $I$.', '$B^{50}=I$: every even exponent gives $I$.')
    },

    /* ---------- 5. Matrix equations ---------- */
    'matrix-equations': {
        definitions: [
            { term: say('Matrize-ekuazioa', 'Ecuación matricial', 'المعادلة المصفوفية', 'Matrix equation'), meaning: say('Ezezaguna $X$ matrize bat den ekuazioa.', 'Una ecuación cuya incógnita es una matriz $X$.', 'معادلة مجهولها مصفوفة $X$.', 'An equation whose unknown is a matrix $X$.') }
        ],
        vocabulary: [
            say('ezkerretik', 'por la izquierda', 'من اليسار', 'on the left'),
            say('eskuinetik', 'por la derecha', 'من اليمين', 'on the right'),
            say('askatu', 'despejar', 'الاستخراج', 'solve for')
        ],
        explanation: say(
            'Matrizeak ez dira zatitzen. $X$ askatzeko, biderkatu bi aldeak $A^{-1}$ matrizeaz, alde berean: $A$ matrizea $X$ matrizearen ezkerrean badago, ezkerretik; eskuinean badago, eskuinetik. Lehenik, pasatu beste batugaiak beste aldera, zenbakiekin bezala.',
            'Las matrices no se dividen. Para despejar $X$, multiplica los dos miembros por $A^{-1}$ por el mismo lado: por la izquierda si $A$ está a la izquierda de $X$, por la derecha si está a la derecha. Antes, pasa los otros sumandos al otro lado, como con números.',
            'المصفوفات لا تُقسم. لاستخراج $X$ اضرب الطرفين في $A^{-1}$ من الجهة نفسها: من اليسار إذا كانت $A$ على يسار $X$، ومن اليمين إذا كانت على يمينها. وقبل ذلك انقل الحدود الأخرى إلى الطرف الآخر كما في الأعداد.',
            'Matrices are not divided. To solve for $X$, multiply both sides by $A^{-1}$ on the same side: on the left if $A$ is on the left of $X$, on the right if it is on the right. First, move the other terms to the other side, as with numbers.'
        ),
        cases: [
            { title: say('$A$ ezkerrean', '$A$ a la izquierda', '$A$ على اليسار', '$A$ on the left'), text: say('Biderkatu $A^{-1}$ matrizeaz ezkerretik.', 'Multiplica por $A^{-1}$ por la izquierda.', 'اضرب في $A^{-1}$ من اليسار.', 'Multiply by $A^{-1}$ on the left.'), math: same('$AX=B\\ \\to\\ X=A^{-1}B$') },
            { title: say('$A$ eskuinean', '$A$ a la derecha', '$A$ على اليمين', '$A$ on the right'), text: say('Biderkatu $A^{-1}$ matrizeaz eskuinetik.', 'Multiplica por $A^{-1}$ por la derecha.', 'اضرب في $A^{-1}$ من اليمين.', 'Multiply by $A^{-1}$ on the right.'), math: same('$XA=B\\ \\to\\ X=BA^{-1}$') },
            { title: say('Faktore komuna', 'Factor común', 'العامل المشترك', 'Common factor'), text: say('$X=IX$ idatzi, eta atera $X$ faktore komun gisa.', 'Escribe $X=IX$ y saca $X$ factor común.', 'اكتب $X=IX$ وأخرج $X$ عاملًا مشتركًا.', 'Write $X=IX$ and take $X$ out as a common factor.'), math: same('$AX+X=B\\ \\to\\ (A+I)X=B$') }
        ],
        examplePrompt: say('Askatu $X$ hemen: $XA+B=C$.', 'Despeja $X$ en $XA+B=C$.', 'استخرج $X$ من $XA+B=C$.', 'Solve for $X$: $XA+B=C$.'),
        example: same('$XA=C-B\\ \\to\\ X=(C-B)A^{-1}$'),
        exampleAnswer: say('$A$ eskuinean dago; beraz, $A^{-1}$ eskuinetik biderkatzen da.', '$A$ está a la derecha, así que se multiplica por $A^{-1}$ por la derecha.', '$A$ على اليمين، لذا نضرب في $A^{-1}$ من اليمين.', '$A$ is on the right, so you multiply by $A^{-1}$ on the right.'),
        why: {
            text: say('Zergatik du garrantzia aldeak? $A^{-1}B$ eta $BA^{-1}$ desberdinak izan ohi direlako: biderkadura ez da trukakorra.', '¿Por qué importa el lado? Porque $A^{-1}B$ y $BA^{-1}$ suelen ser distintas: el producto no es conmutativo.', 'لماذا تهم الجهة؟ لأن $A^{-1}B$ و$BA^{-1}$ مختلفتان عادة: الضرب ليس تبديليًا.', 'Why does the side matter? Because $A^{-1}B$ and $BA^{-1}$ are usually different: the product is not commutative.')
        }
    },
    'equation-systems': {
        definitions: [
            { term: say('Laburketa', 'Reducción', 'الحذف', 'Elimination'), meaning: say('Bi ekuazio batu edo kendu, ezezagun bat desager dadin.', 'Sumar o restar las dos ecuaciones para que desaparezca una incógnita.', 'جمع المعادلتين أو طرحهما ليختفي مجهول.', 'Adding or subtracting the two equations so that one unknown disappears.') }
        ],
        vocabulary: [
            say('ordeztu', 'sustituir', 'عوّض', 'substitute'),
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown')
        ],
        explanation: say(
            'Bi matrize ezezagun, $X$ eta $Y$, eta bi ekuazio badaude batuketekin eta zenbakiekin bakarrik, bi ezezaguneko sistema bat bezala ebazten da: laburketaz matrize bat desagerrarazi, askatu eta beste ekuazioan ordeztu. Egiaztatu emaitzak bi ekuazioetan.',
            'Si hay dos matrices incógnita, $X$ e $Y$, y dos ecuaciones con solo sumas y números, se resuelve como un sistema de dos incógnitas: elimina una matriz por reducción, despeja y sustituye en la otra ecuación. Comprueba el resultado en las dos ecuaciones.',
            'إذا كانت هناك مصفوفتان مجهولتان $X$ و$Y$ ومعادلتان فيهما جمع وأعداد فقط، فإنهما تُحلّان مثل نظام بمجهولين: احذف مصفوفة بالحذف، واستخرج، ثم عوّض في المعادلة الأخرى. وتحقق من الناتج في المعادلتين.',
            'If there are two unknown matrices, $X$ and $Y$, and two equations with only sums and numbers, solve them like a system in two unknowns: eliminate one matrix, solve for the other and substitute into the other equation. Check the result in both equations.'
        ),
        examplePrompt: say('Aurkitu $X$ eta $Y$: $2X+Y=\\begin{pmatrix}5&2\\\\1&0\\end{pmatrix}$ eta $X+Y=\\begin{pmatrix}3&1\\\\0&1\\end{pmatrix}$.', 'Halla $X$ e $Y$: $2X+Y=\\begin{pmatrix}5&2\\\\1&0\\end{pmatrix}$ y $X+Y=\\begin{pmatrix}3&1\\\\0&1\\end{pmatrix}$.', 'أوجد $X$ و$Y$: $2X+Y=\\begin{pmatrix}5&2\\\\1&0\\end{pmatrix}$ و$X+Y=\\begin{pmatrix}3&1\\\\0&1\\end{pmatrix}$.', 'Find $X$ and $Y$: $2X+Y=\\begin{pmatrix}5&2\\\\1&0\\end{pmatrix}$ and $X+Y=\\begin{pmatrix}3&1\\\\0&1\\end{pmatrix}$.'),
        example: same('$X=\\begin{pmatrix}5&2\\\\1&0\\end{pmatrix}-\\begin{pmatrix}3&1\\\\0&1\\end{pmatrix}=\\begin{pmatrix}2&1\\\\1&-1\\end{pmatrix}$'),
        exampleAnswer: say('Eta $Y=\\begin{pmatrix}1&0\\\\-1&2\\end{pmatrix}$, bigarren ekuaziotik.', 'E $Y=\\begin{pmatrix}1&0\\\\-1&2\\end{pmatrix}$, de la segunda ecuación.', 'و$Y=\\begin{pmatrix}1&0\\\\-1&2\\end{pmatrix}$ من المعادلة الثانية.', 'And $Y=\\begin{pmatrix}1&0\\\\-1&2\\end{pmatrix}$, from the second equation.')
    },
    'commuting-matrices': {
        definitions: [
            { term: say('Matrize trukakorrak', 'Matrices que conmutan', 'مصفوفتان تتبادلان', 'Commuting matrices'), meaning: say('$AB=BA$ betetzen duten bi matrize karratu.', 'Dos matrices cuadradas con $AB=BA$.', 'مصفوفتان مربعتان تحققان $AB=BA$.', 'Two square matrices with $AB=BA$.') }
        ],
        vocabulary: [
            say('letrak', 'letras', 'الحروف', 'letters'),
            say('infinitu', 'infinitas', 'لا نهاية', 'infinitely many')
        ],
        explanation: say(
            'Matrize batekin trukatzen diren matrize guztiak aurkitzeko, idatzi $X$ letrekin, kalkulatu $AX$ eta $XA$, eta berdindu elementuz elementu. Sistema bat ateratzen da, eta normalean infinitu soluzio ditu: letra batzuk libre geratzen dira.',
            'Para hallar todas las matrices que conmutan con una dada, escribe $X$ con letras, calcula $AX$ y $XA$ e iguala casilla a casilla. Sale un sistema que suele tener infinitas soluciones: algunas letras quedan libres.',
            'لإيجاد كل المصفوفات التي تتبادل مع مصفوفة معطاة اكتب $X$ بحروف، واحسب $AX$ و$XA$، وساوِ عنصرًا عنصرًا. ينتج نظام له عادةً ما لا نهاية من الحلول: تبقى بعض الحروف حرة.',
            'To find all the matrices that commute with a given one, write $X$ with letters, work out $AX$ and $XA$ and match them entry by entry. You get a system that usually has infinitely many solutions: some letters stay free.'
        ),
        examplePrompt: say('Zein matrize trukatzen dira $\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$ matrizearekin?', '¿Qué matrices conmutan con $\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$?', 'ما المصفوفات التي تتبادل مع $\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$؟', 'Which matrices commute with $\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$?'),
        example: same('$2b=3b\\ \\to\\ b=0\\qquad 3c=2c\\ \\to\\ c=0$'),
        exampleAnswer: say('Diagonalak: $X=\\begin{pmatrix}a&0\\\\0&d\\end{pmatrix}$, $a$ eta $d$ edozein izanik.', 'Las diagonales: $X=\\begin{pmatrix}a&0\\\\0&d\\end{pmatrix}$, con $a$ y $d$ cualesquiera.', 'القطرية: $X=\\begin{pmatrix}a&0\\\\0&d\\end{pmatrix}$ مع أي $a$ و$d$.', 'The diagonal ones: $X=\\begin{pmatrix}a&0\\\\0&d\\end{pmatrix}$, with any $a$ and $d$.')
    }
}
