import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { DeterminanteakTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 · Zientziak — what each lesson tells: the
   new words (definitions), a short explanation, the example as an exercise
   («Another example»), the key words in four languages and, in five
   lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics. The example uses numbers of its
   own. A negative entry of a determinant that is not the first of its row
   is written {-10}: the shared lesson test would read «0 -10» as a sum.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const determinanteakLessonTexts: Record<DeterminanteakTopicId, LessonTexts> = {
    /* ---------- 1. Order 2 and 3 ---------- */
    'det-two': {
        definitions: [
            { term: say('Determinantea', 'Determinante', 'المحدد', 'Determinant'), meaning: say('Matrize karratu bati dagokion zenbakia; $|A|$ idazten da, edo zenbakiak bi barraren artean.', 'El número que corresponde a una matriz cuadrada; se escribe $|A|$ o con los números entre dos barras.', 'العدد المرافق لمصفوفة مربعة؛ يُكتب $|A|$ أو بالأعداد بين خطين.', 'The number that goes with a square matrix; it is written $|A|$ or with the numbers between two bars.') }
        ],
        vocabulary: [
            say('diagonal nagusia', 'diagonal principal', 'القطر الرئيسي', 'main diagonal'),
            say('bigarren diagonala', 'diagonal secundaria', 'القطر الثانوي', 'other diagonal'),
            say('azalera', 'área', 'المساحة', 'area')
        ],
        explanation: say(
            'Matrize karratu bakoitzak zenbaki bat du, bere determinantea. 2. ordenan gurutzean biderkatzen da: diagonal nagusia ken bigarren diagonala. Zutabeak gezi gisa ikusten badira, $|A|$ haiek osatzen duten paralelogramoaren azalera da, zeinuarekin.',
            'A cada matriz cuadrada le corresponde un número, su determinante. En orden 2 se multiplica en cruz: la diagonal principal menos la diagonal secundaria. Si las columnas se ven como flechas, $|A|$ es el área del paralelogramo que forman, con signo.',
            'لكل مصفوفة مربعة عدد هو محددها. وفي الرتبة 2 نضرب متقاطعًا: القطر الرئيسي ناقص القطر الثانوي. وإذا اعتبرنا العمودين سهمين فإن $|A|$ هو مساحة متوازي الأضلاع الذي يكوّنانه، بإشارتها.',
            'Every square matrix has a number, its determinant. In order 2 you multiply crosswise: the main diagonal minus the other diagonal. If the columns are seen as arrows, $|A|$ is the area of the parallelogram they make, with a sign.'
        ),
        examplePrompt: say('Kalkulatu $\\begin{vmatrix}-2&3\\\\4&1\\end{vmatrix}$.', 'Calcula $\\begin{vmatrix}-2&3\\\\4&1\\end{vmatrix}$.', 'احسب $\\begin{vmatrix}-2&3\\\\4&1\\end{vmatrix}$.', 'Work out $\\begin{vmatrix}-2&3\\\\4&1\\end{vmatrix}$.'),
        example: same('$\\begin{vmatrix}-2&3\\\\4&1\\end{vmatrix}=-2\\cdot 1-3\\cdot 4=-14$'),
        exampleAnswer: say('Negatiboa da: zutabeen ordena erlojuaren noranzkoan doa.', 'Sale negativo: las columnas van en el sentido de las agujas del reloj.', 'الناتج سالب: العمودان في اتجاه عقارب الساعة.', 'It comes out negative: the columns go clockwise.'),
        why: {
            text: say('Zergatik da azalera? $(a,c)$ eta $(b,d)$ zutabeekin, paralelogramoa $ad$ laukizuzena da, soberan dauden zatiak kenduta; zati horiek $bc$ batzen dute.', '¿Por qué es un área? Con columnas $(a,c)$ y $(b,d)$, el paralelogramo es el rectángulo $ad$ menos unos trozos que sobran, y esos trozos suman $bc$.', 'لماذا هو مساحة؟ مع العمودين $(a,c)$ و$(b,d)$ يكون متوازي الأضلاع هو المستطيل $ad$ ناقص قطع زائدة مجموعها $bc$.', 'Why is it an area? With columns $(a,c)$ and $(b,d)$, the parallelogram is the rectangle $ad$ minus some spare pieces, and those pieces add up to $bc$.')
        }
    },
    sarrus: {
        definitions: [
            { term: say('Sarrusen erregela', 'Regla de Sarrus', 'قاعدة ساروس', 'Sarrus\' rule'), meaning: say('3. ordenako determinanteak kalkulatzeko modua: sei biderkadura, hiru batzen eta hiru kentzen.', 'Una forma de calcular determinantes de orden 3: seis productos, tres que suman y tres que restan.', 'طريقة لحساب محددات الرتبة 3: ستة حواصل، ثلاثة تُجمع وثلاثة تُطرح.', 'A way of working out determinants of order 3: six products, three added and three subtracted.') }
        ],
        vocabulary: [
            say('triangelua', 'triángulo', 'المثلث', 'triangle'),
            say('biderkadura', 'producto', 'حواصل', 'product')
        ],
        explanation: say(
            '3. ordenan sei biderkadura daude, hiru zenbakikoak, errenkada eta zutabe bakoitzetik bat. Diagonal nagusiaren biderkadura eta haren paraleloek osatzen dituzten bi triangeluenak batzen dira; beste diagonalaren biderkadura eta haren bi triangeluenak kentzen dira.',
            'En orden 3 hay seis productos de tres números, uno de cada fila y de cada columna. Suman el de la diagonal principal y los dos triángulos que forman sus paralelas; restan el de la otra diagonal y sus dos triángulos.',
            'في الرتبة 3 ستة حواصل لثلاثة أعداد، واحد من كل صف ومن كل عمود. يُجمع حاصل القطر الرئيسي والمثلثان اللذان تكوّنهما موازياته، ويُطرح حاصل القطر الآخر ومثلثاه.',
            'In order 3 there are six products of three numbers, one from each row and each column. The main diagonal and the two triangles of its parallels are added; the other diagonal and its two triangles are subtracted.'
        ),
        examplePrompt: say('Kalkulatu $\\begin{vmatrix}2&0&1\\\\1&3&0\\\\0&1&2\\end{vmatrix}$ Sarrusen bidez.', 'Calcula $\\begin{vmatrix}2&0&1\\\\1&3&0\\\\0&1&2\\end{vmatrix}$ por Sarrus.', 'احسب $\\begin{vmatrix}2&0&1\\\\1&3&0\\\\0&1&2\\end{vmatrix}$ بقاعدة ساروس.', 'Work out $\\begin{vmatrix}2&0&1\\\\1&3&0\\\\0&1&2\\end{vmatrix}$ by Sarrus.'),
        example: same('$(12+0+1)-(0+0+0)=13$'),
        exampleAnswer: say('Kentzen diren hiru biderkadurak 0 dira: zeroek kontua laburtzen dute.', 'Los tres productos que restan valen 0: los ceros acortan la cuenta.', 'الحواصل الثلاثة التي تُطرح أصفار: الأصفار تختصر الحساب.', 'The three products that subtract are 0: zeros shorten the sum.')
    },
    'zero-det': {
        definitions: [
            { term: say('Matrize singularra', 'Matriz singular', 'المصفوفة المنفردة', 'Singular matrix'), meaning: say('$|A|=0$ duen matrize karratua: haren heina ez da maximoa.', 'Una matriz cuadrada con $|A|=0$: su rango no es máximo.', 'مصفوفة مربعة فيها $|A|=0$: رتبتها ليست عظمى.', 'A square matrix with $|A|=0$: its rank is not full.') }
        ],
        vocabulary: [
            say('proportzionalak', 'proporcionales', 'متناسبة', 'proportional'),
            say('konbinazio lineala', 'combinación lineal', 'تركيب خطي', 'linear combination')
        ],
        explanation: say(
            'Batzuetan, kalkulatu gabe dakigu $|A|=0$ dela: errenkada edo zutabe bat zeroz beteta dagoenean, bi berdinak edo proportzionalak direnean, edo bat besteen konbinazio lineala denean. Hau da, heina maximoa ez denean.',
            'A veces se sabe sin calcular que $|A|=0$: cuando una fila o columna es de ceros, cuando dos son iguales o proporcionales, o cuando una es combinación lineal de las otras. Es decir, cuando el rango no es máximo.',
            'أحيانًا نعرف دون حساب أن $|A|=0$: عندما يكون صف أو عمود أصفارًا، أو يكون اثنان متساويين أو متناسبين، أو يكون أحدها تركيبًا خطيًا من الأخرى. أي عندما لا تكون الرتبة عظمى.',
            'Sometimes you know without working it out that $|A|=0$: when a row or column is all zeros, when two are equal or proportional, or when one is a linear combination of the others. That is, when the rank is not full.'
        ),
        examplePrompt: say('Zero al da $\\begin{vmatrix}1&0&2\\\\0&1&3\\\\1&1&5\\end{vmatrix}$?', '¿Vale cero $\\begin{vmatrix}1&0&2\\\\0&1&3\\\\1&1&5\\end{vmatrix}$?', 'هل $\\begin{vmatrix}1&0&2\\\\0&1&3\\\\1&1&5\\end{vmatrix}$ يساوي صفرًا؟', 'Is $\\begin{vmatrix}1&0&2\\\\0&1&3\\\\1&1&5\\end{vmatrix}$ zero?'),
        example: same('$E_3=E_1+E_2\\ \\to\\ |A|=0$'),
        exampleAnswer: say('Bai: hirugarren errenkada beste bien batura da.', 'Sí: la tercera fila es la suma de las otras dos.', 'نعم: الصف الثالث مجموع الصفين الآخرين.', 'Yes: the third row is the sum of the other two.'),
        why: {
            text: say('Zergatik? Errenkada bat besteen konbinazio lineala bada, zeroko errenkada bihur daiteke, $|A|$ aldatu gabe, besteen multiploak batuz; eta zeroko errenkada batek 0 ematen du.', '¿Por qué? Si una fila es combinación lineal de las otras, se puede convertir en una fila de ceros sin cambiar $|A|$, sumándole múltiplos de las otras; y una fila de ceros da 0.', 'لماذا؟ إذا كان صف تركيبًا خطيًا من الأخرى يمكن تحويله إلى صف أصفار دون تغيير $|A|$ بإضافة مضاعفات الأخرى؛ وصف الأصفار يعطي 0.', 'Why? If a row is a linear combination of the others, it can be turned into a row of zeros without changing $|A|$, by adding multiples of the others; and a row of zeros gives 0.')
        }
    },

    /* ---------- 2. Properties ---------- */
    'transpose-swap': {
        definitions: [
            { term: say('Lerroa', 'Línea', 'الخط', 'Line'), meaning: say('Determinante baten errenkada edo zutabe bat.', 'Una fila o una columna de un determinante.', 'صف أو عمود في محدد.', 'A row or a column of a determinant.') }
        ],
        vocabulary: [
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('iraulia', 'traspuesta', 'المنقول', 'transpose')
        ],
        explanation: say(
            'Matrize baten eta haren irauliaren determinantea berdina da: $|A^t|=|A|$. Horregatik, errenkadei buruz esaten den guztia zutabeetarako ere balio du. Bi errenkada (edo bi zutabe) trukatzean, determinanteak zeinua aldatzen du.',
            'Una matriz y su traspuesta tienen el mismo determinante: $|A^t|=|A|$. Por eso todo lo que se dice de las filas vale también para las columnas. Al cambiar entre sí dos filas (o dos columnas), el determinante cambia de signo.',
            'للمصفوفة ومنقولها المحدد نفسه: $|A^t|=|A|$. لذلك فكل ما يقال عن الصفوف يصح للأعمدة أيضًا. وعند تبديل صفين (أو عمودين) تتغير إشارة المحدد.',
            'A matrix and its transpose have the same determinant: $|A^t|=|A|$. That is why everything said about rows also holds for columns. Swapping two rows (or two columns) changes the sign of the determinant.'
        ),
        examplePrompt: say('$|A|=-3$ da, eta $B$ matrizea $A$ da, 1. eta 3. zutabeak trukatuta. Zenbat da $|B^t|$?', '$|A|=-3$ y $B$ es $A$ con las columnas 1 y 3 cambiadas. ¿Cuánto vale $|B^t|$?', '$|A|=-3$ و$B$ هي $A$ بعد تبديل العمودين 1 و3. كم يساوي $|B^t|$؟', '$|A|=-3$ and $B$ is $A$ with columns 1 and 3 swapped. What is $|B^t|$?'),
        example: same('$|B|=-(-3)=3\\qquad |B^t|=|B|=3$'),
        exampleAnswer: say('Trukeak zeinua aldatzen du; irauliak ez.', 'El cambio de columnas cambia el signo; la traspuesta, no.', 'تبديل العمودين يغيّر الإشارة، والنقل لا يغيّرها.', 'Swapping columns changes the sign; transposing does not.')
    },
    'scale-row': {
        definitions: [
            { term: say('Faktore komuna', 'Factor común', 'العامل المشترك', 'Common factor'), meaning: say('Lerro bateko elementu guztiak biderkatzen dituen zenbakia; determinantetik kanpora atera daiteke.', 'Un número que multiplica a todos los elementos de una línea; puede salir fuera del determinante.', 'عدد يضرب كل عناصر خط؛ ويمكن إخراجه من المحدد.', 'A number that multiplies every entry of a line; it can come out of the determinant.') }
        ],
        vocabulary: [
            say('lerroa', 'línea', 'الخط', 'line'),
            say('ordena', 'orden', 'الرتبة', 'order')
        ],
        explanation: say(
            'Lerro bat $k$ zenbakiaz biderkatzen bada, determinantea ere $k$ zenbakiaz biderkatzen da. Alderantziz, lerro baten faktore komuna kanpora atera daiteke. $kA$ matrizean lerro guztiak biderkatzen dira; $n$ ordenan, $|kA|=k^n|A|$.',
            'Si se multiplica una línea por $k$, el determinante queda multiplicado por $k$. Al revés, el factor común de una línea puede salir fuera. En $kA$ se multiplican todas las líneas: en orden $n$, $|kA|=k^n|A|$.',
            'إذا ضُرب خط في $k$ ضُرب المحدد في $k$. وبالعكس يمكن إخراج العامل المشترك لخط. وفي $kA$ تُضرب كل الخطوط: في الرتبة $n$ يكون $|kA|=k^n|A|$.',
            'If a line is multiplied by $k$, the determinant is multiplied by $k$. The other way round, the common factor of a line can come out. In $kA$ every line is multiplied: in order $n$, $|kA|=k^n|A|$.'
        ),
        examplePrompt: say('Kalkulatu $\\begin{vmatrix}6&9\\\\2&5\\end{vmatrix}$, faktore komuna aterata.', 'Calcula $\\begin{vmatrix}6&9\\\\2&5\\end{vmatrix}$ sacando factor común.', 'احسب $\\begin{vmatrix}6&9\\\\2&5\\end{vmatrix}$ بإخراج العامل المشترك.', 'Work out $\\begin{vmatrix}6&9\\\\2&5\\end{vmatrix}$ by taking out a common factor.'),
        example: same('$\\begin{vmatrix}6&9\\\\2&5\\end{vmatrix}=3\\begin{vmatrix}2&3\\\\2&5\\end{vmatrix}=3\\cdot 4=12$'),
        exampleAnswer: say('3 zenbakia lehen errenkadatik bakarrik ateratzen da.', 'El 3 sale solo de la primera fila.', 'يخرج 3 من الصف الأول وحده.', 'The 3 comes out of the first row only.')
    },
    'add-multiple': {
        definitions: [
            { term: say('Matrize triangeluarra', 'Matriz triangular', 'المصفوفة المثلثية', 'Triangular matrix'), meaning: say('Diagonalaren alde batean zeroak dituena; haren determinantea diagonaleko biderkadura da.', 'La que tiene ceros a un lado de la diagonal; su determinante es el producto de la diagonal.', 'التي فيها أصفار على جانب من القطر؛ ومحددها حاصل ضرب القطر.', 'One with zeros on one side of the diagonal; its determinant is the product of the diagonal.') }
        ],
        vocabulary: [
            say('zeroak egin', 'hacer ceros', 'جعل أصفار', 'make zeros'),
            say('pibota', 'pivote', 'المحور', 'pivot')
        ],
        explanation: say(
            'Errenkada bati beste baten multiplo bat batzeak ez du determinantea aldatzen. Horrela egiten dira zeroak, Gaussen metodoan bezala, pibotaren azpian; eta matrize triangeluar baten determinantea diagonaleko zenbakien biderkadura da.',
            'Sumar a una fila un múltiplo de otra no cambia el determinante. Así se hacen ceros bajo cada pivote, como en Gauss; y el determinante de una matriz triangular es el producto de los números de la diagonal.',
            'إضافة مضاعف صف إلى صف آخر لا تغيّر المحدد. هكذا نجعل أصفارًا تحت كل محور كما في غاوس؛ ومحدد المصفوفة المثلثية حاصل ضرب أعداد القطر.',
            'Adding a multiple of one row to another does not change the determinant. That is how you make zeros below each pivot, as in Gauss; and the determinant of a triangular matrix is the product of the numbers on the diagonal.'
        ),
        examplePrompt: say('Kalkulatu $\\begin{vmatrix}1&3\\\\4&2\\end{vmatrix}$, zero bat eginda.', 'Calcula $\\begin{vmatrix}1&3\\\\4&2\\end{vmatrix}$ haciendo un cero.', 'احسب $\\begin{vmatrix}1&3\\\\4&2\\end{vmatrix}$ بجعل صفر.', 'Work out $\\begin{vmatrix}1&3\\\\4&2\\end{vmatrix}$ by making a zero.'),
        example: same('$E_2-4E_1\\ \\to\\ \\begin{vmatrix}1&3\\\\0&{-10}\\end{vmatrix}=1\\cdot(-10)=-10$'),
        exampleAnswer: say('Gurutzean ere bai: $2-12=-10$.', 'También en cruz: $2-12=-10$.', 'وبالضرب المتقاطع أيضًا: $2-12=-10$.', 'Crosswise too: $2-12=-10$.'),
        why: {
            text: say('Zergatik ez da aldatzen? Determinantea bitan banatzen da: hasierakoa, eta bi errenkada proportzional dituen beste bat, 0 balio duena.', '¿Por qué no cambia? El determinante se reparte en dos: el de partida y otro con dos filas proporcionales, que vale 0.', 'لماذا لا يتغير؟ ينقسم المحدد إلى اثنين: الأصلي ومحدد آخر فيه صفان متناسبان قيمته 0.', 'Why does it not change? The determinant splits in two: the starting one and another with two proportional rows, which is 0.')
        }
    },
    'product-det': {
        definitions: [
            { term: say('Biderkaduraren determinantea', 'Determinante del producto', 'محدد الجداء', 'Determinant of a product'), meaning: say('$|AB|=|A|\\cdot|B|$: biderkadurarena, determinanteen biderkadura.', '$|AB|=|A|\\cdot|B|$: el del producto es el producto de los determinantes.', '$|AB|=|A|\\cdot|B|$: محدد الجداء هو جداء المحددين.', '$|AB|=|A|\\cdot|B|$: that of the product is the product of the determinants.') }
        ],
        vocabulary: [
            say('batura', 'suma', 'المجموع', 'sum'),
            say('alderantzizkoa', 'inversa', 'المعكوس', 'inverse')
        ],
        explanation: say(
            'Determinanteak biderkadurarekin ondo moldatzen dira: $|AB|=|A|\\cdot|B|$, eta hortik $|A^n|=|A|^n$ eta $|A^{-1}|=\\frac{1}{|A|}$. Baturarekin, ordea, ez: oro har, $|A+B|\\neq|A|+|B|$.',
            'Los determinantes se llevan bien con el producto: $|AB|=|A|\\cdot|B|$, y de ahí $|A^n|=|A|^n$ y $|A^{-1}|=\\frac{1}{|A|}$. Con la suma, en cambio, no: en general, $|A+B|\\neq|A|+|B|$.',
            'تنسجم المحددات مع الضرب: $|AB|=|A|\\cdot|B|$، ومن ذلك $|A^n|=|A|^n$ و$|A^{-1}|=\\frac{1}{|A|}$. أما مع المجموع فلا: عمومًا $|A+B|\\neq|A|+|B|$.',
            'Determinants get on well with the product: $|AB|=|A|\\cdot|B|$, and from it $|A^n|=|A|^n$ and $|A^{-1}|=\\frac{1}{|A|}$. Not with the sum, though: in general, $|A+B|\\neq|A|+|B|$.'
        ),
        examplePrompt: say('Egiaztatu $|AB|=|A||B|$, $A=\\begin{pmatrix}1&2\\\\0&3\\end{pmatrix}$ eta $B=\\begin{pmatrix}2&0\\\\1&1\\end{pmatrix}$ badira.', 'Comprueba $|AB|=|A||B|$ con $A=\\begin{pmatrix}1&2\\\\0&3\\end{pmatrix}$ y $B=\\begin{pmatrix}2&0\\\\1&1\\end{pmatrix}$.', 'تحقق من $|AB|=|A||B|$ مع $A=\\begin{pmatrix}1&2\\\\0&3\\end{pmatrix}$ و$B=\\begin{pmatrix}2&0\\\\1&1\\end{pmatrix}$.', 'Check $|AB|=|A||B|$ with $A=\\begin{pmatrix}1&2\\\\0&3\\end{pmatrix}$ and $B=\\begin{pmatrix}2&0\\\\1&1\\end{pmatrix}$.'),
        example: same('$|AB|=\\begin{vmatrix}4&2\\\\3&3\\end{vmatrix}=6=3\\cdot 2$'),
        exampleAnswer: say('$|A|=3$ eta $|B|=2$: biderkadura 6 da.', '$|A|=3$ y $|B|=2$: el producto es 6.', '$|A|=3$ و$|B|=2$: الجداء 6.', '$|A|=3$ and $|B|=2$: the product is 6.'),
        why: {
            text: say('Zergatik $|A^{-1}|=\\frac{1}{|A|}$? $AA^{-1}=I$ eta $|I|=1$ direlako; beraz, $|A|\\cdot|A^{-1}|=1$.', '¿Por qué $|A^{-1}|=\\frac{1}{|A|}$? Porque $AA^{-1}=I$ y $|I|=1$, así que $|A|\\cdot|A^{-1}|=1$.', 'لماذا $|A^{-1}|=\\frac{1}{|A|}$؟ لأن $AA^{-1}=I$ و$|I|=1$، إذن $|A|\\cdot|A^{-1}|=1$.', 'Why $|A^{-1}|=\\frac{1}{|A|}$? Because $AA^{-1}=I$ and $|I|=1$, so $|A|\\cdot|A^{-1}|=1$.')
        }
    },

    /* ---------- 3. Minors and cofactors ---------- */
    'minors-cofactors': {
        definitions: [
            { term: say('Menore osagarria', 'Menor complementario', 'المحدد الأصغر', 'Minor'), meaning: say('$M_{ij}$: $a_{ij}$ elementuaren errenkada eta zutabea kenduta geratzen den determinantea.', '$M_{ij}$: el determinante que queda al quitar la fila y la columna de $a_{ij}$.', '$M_{ij}$: المحدد الذي يبقى بعد حذف صف $a_{ij}$ وعموده.', '$M_{ij}$: the determinant left when you remove the row and column of $a_{ij}$.') },
            { term: say('Adjuntua', 'Adjunto', 'المتمم الجبري', 'Cofactor'), meaning: say('$A_{ij}=(-1)^{i+j}M_{ij}$: menorea, bere zeinuarekin.', '$A_{ij}=(-1)^{i+j}M_{ij}$: el menor con su signo.', '$A_{ij}=(-1)^{i+j}M_{ij}$: المحدد الأصغر بإشارته.', '$A_{ij}=(-1)^{i+j}M_{ij}$: the minor with its sign.') }
        ],
        vocabulary: [
            say('xake-taula', 'tablero de ajedrez', 'رقعة الشطرنج', 'chessboard'),
            say('bakoitia', 'impar', 'فردي', 'odd')
        ],
        explanation: say(
            'Elementu bakoitzak bere menorea eta bere adjuntua ditu. Adjuntuaren zeinua xake-taula bat bezala txandakatzen da: plus $a_{11}$ elementuan, eta $i+j$ bakoitia den lekuetan minus. Adjuntuek determinantea zatitan kalkulatzeko balio dute.',
            'Cada elemento tiene su menor y su adjunto. El signo del adjunto se alterna como un tablero de ajedrez: más en $a_{11}$ y menos donde $i+j$ es impar. Los adjuntos sirven para calcular el determinante a trozos.',
            'لكل عنصر محدده الأصغر ومتممه الجبري. وتتناوب إشارة المتمم الجبري مثل رقعة الشطرنج: موجبة في $a_{11}$ وسالبة حيث $i+j$ فردي. وتفيد المتممات الجبرية في حساب المحدد على أجزاء.',
            'Every entry has its minor and its cofactor. The sign of the cofactor alternates like a chessboard: plus at $a_{11}$ and minus where $i+j$ is odd. Cofactors are used to work out the determinant in pieces.'
        ),
        examplePrompt: say('Aurkitu $A_{23}$ adjuntua, $\\begin{pmatrix}1&0&2\\\\3&1&4\\\\2&5&1\\end{pmatrix}$ matrizean.', 'Halla el adjunto $A_{23}$ de $\\begin{pmatrix}1&0&2\\\\3&1&4\\\\2&5&1\\end{pmatrix}$.', 'أوجد المتمم الجبري $A_{23}$ لـ $\\begin{pmatrix}1&0&2\\\\3&1&4\\\\2&5&1\\end{pmatrix}$.', 'Find the cofactor $A_{23}$ of $\\begin{pmatrix}1&0&2\\\\3&1&4\\\\2&5&1\\end{pmatrix}$.'),
        example: same('$A_{23}=(-1)^{2+3}\\begin{vmatrix}1&0\\\\2&5\\end{vmatrix}=-5$'),
        exampleAnswer: say('$2+3$ bakoitia da: menorea, 5, zeinua aldatuta.', '$2+3$ es impar: el menor, 5, cambia de signo.', '$2+3$ فردي: المحدد الأصغر 5 تتغير إشارته.', '$2+3$ is odd: the minor, 5, changes sign.')
    },
    laplace: {
        definitions: [
            { term: say('Garapena lerro baten arabera', 'Desarrollo por una línea', 'النشر حسب خط', 'Expansion along a line'), meaning: say('$|A|$ = lerro bateko elementu bakoitza bider bere adjuntua, guztiak batuta.', '$|A|$ = cada elemento de una línea por su adjunto, todo sumado.', '$|A|$ = كل عنصر من خط في متممه الجبري، والكل مجموع.', '$|A|$ = each entry of a line times its cofactor, all added.') }
        ],
        vocabulary: [
            say('zeroak', 'ceros', 'الأصفار', 'zeros'),
            say('adjuntua', 'adjunto', 'المتمم الجبري', 'cofactor')
        ],
        explanation: say(
            'Edozein lerro aukera daiteke, errenkada edo zutabe: haren elementuak bider haien adjuntuak batzean, determinantea ateratzen da. Komeni da zero gehien dituen lerroa aukeratzea: zero bakoitzak determinante bat aurrezten du.',
            'Se puede elegir cualquier línea, fila o columna: al sumar sus elementos por sus adjuntos sale el determinante. Conviene la línea con más ceros: cada cero ahorra un determinante.',
            'يمكن اختيار أي خط، صفًّا أو عمودًا: بجمع عناصره مضروبة في متمماتها الجبرية نحصل على المحدد. ويُستحسن الخط الذي فيه أكثر الأصفار: كل صفر يوفّر محددًا.',
            'You can choose any line, row or column: adding its entries times their cofactors gives the determinant. The line with the most zeros is best: each zero saves a determinant.'
        ),
        examplePrompt: say('Kalkulatu $\\begin{vmatrix}2&1&0\\\\4&3&0\\\\1&7&5\\end{vmatrix}$ 3. zutabearen arabera.', 'Calcula $\\begin{vmatrix}2&1&0\\\\4&3&0\\\\1&7&5\\end{vmatrix}$ por la columna 3.', 'احسب $\\begin{vmatrix}2&1&0\\\\4&3&0\\\\1&7&5\\end{vmatrix}$ حسب العمود 3.', 'Work out $\\begin{vmatrix}2&1&0\\\\4&3&0\\\\1&7&5\\end{vmatrix}$ along column 3.'),
        example: same('$5\\cdot\\begin{vmatrix}2&1\\\\4&3\\end{vmatrix}=5\\cdot 2=10$'),
        exampleAnswer: say('$a_{33}$ elementuak bakarrik balio du; haren zeinua plus da ($3+3$ bikoitia).', 'Solo cuenta $a_{33}$; su signo es más ($3+3$ es par).', 'لا يُحسب إلا $a_{33}$؛ وإشارته موجبة ($3+3$ زوجي).', 'Only $a_{33}$ counts; its sign is plus ($3+3$ is even).')
    },
    'order-four': {
        definitions: [
            { term: say('Ordena jaistea', 'Bajar el orden', 'إنقاص الرتبة', 'Lowering the order'), meaning: say('Lerro batean zeroak egin eta haren arabera garatzea: $n$ ordenako determinantea $n-1$ ordenakoak bihurtzen dira.', 'Hacer ceros en una línea y desarrollar por ella: un determinante de orden $n$ pasa a ser de orden $n-1$.', 'جعل أصفار في خط والنشر حسبه: يصير محدد الرتبة $n$ من الرتبة $n-1$.', 'Making zeros in a line and expanding along it: a determinant of order $n$ becomes one of order $n-1$.') }
        ],
        vocabulary: [
            say('Sarrus', 'Sarrus', 'ساروس', 'Sarrus'),
            say('ordena', 'orden', 'الرتبة', 'order')
        ],
        explanation: say(
            'Sarrusek 3. ordenarako bakarrik balio du. 4. ordenan edo gehiagoan, egin zeroak lerro batean, errenkada bati beste baten multiploak batuz ($|A|$ aldatu gabe), eta garatu lerro horren arabera: urrats bakoitzak ordena bat jaisten du.',
            'Sarrus solo sirve para orden 3. En orden 4 o más, haz ceros en una línea sumando a unas filas múltiplos de otra (sin cambiar $|A|$) y desarrolla por esa línea: cada paso baja un orden.',
            'ساروس للرتبة 3 فقط. وفي الرتبة 4 أو أكثر اجعل أصفارًا في خط بإضافة مضاعفات صف إلى صفوف أخرى (دون تغيير $|A|$) ثم انشر حسب ذلك الخط: كل خطوة تُنقص الرتبة واحدًا.',
            'Sarrus only works for order 3. In order 4 or more, make zeros in a line by adding multiples of one row to others (without changing $|A|$) and expand along that line: each step lowers the order by one.'
        ),
        examplePrompt: say('Kalkulatu $\\begin{vmatrix}2&0&0&0\\\\1&3&0&0\\\\4&5&1&0\\\\7&2&6&2\\end{vmatrix}$.', 'Calcula $\\begin{vmatrix}2&0&0&0\\\\1&3&0&0\\\\4&5&1&0\\\\7&2&6&2\\end{vmatrix}$.', 'احسب $\\begin{vmatrix}2&0&0&0\\\\1&3&0&0\\\\4&5&1&0\\\\7&2&6&2\\end{vmatrix}$.', 'Work out $\\begin{vmatrix}2&0&0&0\\\\1&3&0&0\\\\4&5&1&0\\\\7&2&6&2\\end{vmatrix}$.'),
        example: same('$2\\cdot 3\\cdot 1\\cdot 2=12$'),
        exampleAnswer: say('Triangeluarra da: diagonaleko biderkadura.', 'Es triangular: el producto de la diagonal.', 'إنها مثلثية: حاصل ضرب القطر.', 'It is triangular: the product of the diagonal.')
    },
    'det-equations': {
        definitions: [
            { term: say('Erro nabaria', 'Raíz evidente', 'الجذر الواضح', 'Obvious root'), meaning: say('Bi lerro berdin edo proportzional egiten dituen balioa: kalkulatu gabe ematen du $|A|=0$.', 'Un valor que hace dos líneas iguales o proporcionales: da $|A|=0$ sin calcular.', 'قيمة تجعل خطين متساويين أو متناسبين: تعطي $|A|=0$ دون حساب.', 'A value that makes two lines equal or proportional: it gives $|A|=0$ without working it out.') }
        ],
        vocabulary: [
            say('polinomioa', 'polinomio', 'كثير الحدود', 'polynomial'),
            say('erroa', 'raíz', 'الجذر', 'root')
        ],
        explanation: say(
            'Determinantearen barruan $x$ badago, polinomio bat ateratzen da, eta zerora berdintzen da. Bilatu lehenik bi lerro berdin edo proportzional egiten dituzten balioak: erro seguruak dira, eta polinomioa errazago faktorizatzen da.',
            'Si dentro del determinante hay una $x$, sale un polinomio y se iguala a cero. Busca primero los valores que hacen dos líneas iguales o proporcionales: son raíces seguras y el polinomio se factoriza mejor.',
            'إذا كان داخل المحدد $x$ ينتج كثير حدود يُساوى بالصفر. ابحث أولًا عن القيم التي تجعل خطين متساويين أو متناسبين: إنها جذور مؤكدة ويسهل بها تحليل كثير الحدود.',
            'If there is an $x$ inside the determinant, you get a polynomial and set it equal to zero. First look for the values that make two lines equal or proportional: they are sure roots and the polynomial factorises more easily.'
        ),
        examplePrompt: say('Ebatzi $\\begin{vmatrix}x&2\\\\8&x\\end{vmatrix}=0$.', 'Resuelve $\\begin{vmatrix}x&2\\\\8&x\\end{vmatrix}=0$.', 'حُلّ $\\begin{vmatrix}x&2\\\\8&x\\end{vmatrix}=0$.', 'Solve $\\begin{vmatrix}x&2\\\\8&x\\end{vmatrix}=0$.'),
        example: same('$x^2-16=0\\ \\to\\ x=\\pm 4$'),
        exampleAnswer: say('Bi soluzio: $x=4$ eta $x=-4$.', 'Dos soluciones: $x=4$ y $x=-4$.', 'حلّان: $x=4$ و$x=-4$.', 'Two solutions: $x=4$ and $x=-4$.')
    },

    /* ---------- 4. Rank by minors ---------- */
    'rank-by-minors': {
        definitions: [
            { term: say('Menore bat orlatzea', 'Orlar un menor', 'تطويق محدد أصغر', 'Bordering a minor'), meaning: say('Errenkada bat eta zutabe bat gehitzea, ordena bat handiagoko menorea lortzeko.', 'Añadirle una fila y una columna para tener un menor de un orden más.', 'إضافة صف وعمود إليه للحصول على محدد أصغر من رتبة أعلى.', 'Adding a row and a column to it to get a minor of one order more.') }
        ],
        vocabulary: [
            say('menorea', 'menor', 'المحدد الأصغر', 'minor'),
            say('heina', 'rango', 'الرتبة', 'rank')
        ],
        explanation: say(
            'Heina 0 ez den menorerik handienaren ordena da. Bilatu 0 ez den 2. ordenako menore bat, eta orlatu: hura duten 3. ordenako menore guztiak 0 badira, heina 2 da; bat 0 ez bada, gutxienez 3.',
            'El rango es el orden del mayor menor distinto de 0. Busca un menor de orden 2 que no sea 0 y órlalo: si todos los menores de orden 3 que lo contienen valen 0, el rango es 2; si alguno no, es al menos 3.',
            'الرتبة هي رتبة أكبر محدد أصغر غير صفري. ابحث عن محدد أصغر من الرتبة 2 غير صفري وطوّقه: إذا كانت كل المحددات الصغرى من الرتبة 3 التي تحتويه أصفارًا فالرتبة 2، وإن لم يكن أحدها صفرًا فهي 3 على الأقل.',
            'The rank is the order of the largest minor that is not 0. Find a minor of order 2 that is not 0 and border it: if every minor of order 3 containing it is 0, the rank is 2; if one is not, it is at least 3.'
        ),
        examplePrompt: say('Kalkulatu $\\begin{pmatrix}2&1&0&3\\\\4&2&1&1\\end{pmatrix}$ matrizearen heina.', 'Calcula el rango de $\\begin{pmatrix}2&1&0&3\\\\4&2&1&1\\end{pmatrix}$.', 'احسب رتبة $\\begin{pmatrix}2&1&0&3\\\\4&2&1&1\\end{pmatrix}$.', 'Find the rank of $\\begin{pmatrix}2&1&0&3\\\\4&2&1&1\\end{pmatrix}$.'),
        example: same('$\\begin{vmatrix}1&0\\\\2&1\\end{vmatrix}=1\\neq 0$'),
        exampleAnswer: say('Heina 2 da: bi errenkada baino ez daude.', 'El rango es 2: solo hay dos filas.', 'الرتبة 2: ليس هناك إلا صفّان.', 'The rank is 2: there are only two rows.')
    },
    'rank-parameter-minors': {
        definitions: [
            { term: say('Balio kritikoa', 'Valor crítico', 'القيمة الحرجة', 'Critical value'), meaning: say('$|A|$ zero egiten duen parametroaren balioa; hor heina jaitsi egiten da.', 'Un valor del parámetro que anula $|A|$; ahí el rango baja.', 'قيمة للوسيط تعدم $|A|$؛ وعندها تنقص الرتبة.', 'A value of the parameter that makes $|A|$ zero; there the rank goes down.') }
        ],
        vocabulary: [
            say('parametroa', 'parámetro', 'الوسيط', 'parameter'),
            say('aparte', 'aparte', 'على حدة', 'separately')
        ],
        explanation: say(
            'Kalkulatu $|A|$, parametroa barruan dela, eta berdindu zerora. Parametroa erroa ez bada, heina maximoa da. Erro bakoitzerako, idatzi matrizea zenbakiekin, eta aztertu aparte haren menore txikiagoak.',
            'Calcula $|A|$ con el parámetro dentro e iguálalo a cero. Si el parámetro no es una raíz, el rango es máximo. Para cada raíz, escribe la matriz con números y estudia aparte sus menores más pequeños.',
            'احسب $|A|$ والوسيط في الداخل وساوِه بالصفر. إذا لم يكن الوسيط جذرًا فالرتبة عظمى. ولكل جذر اكتب المصفوفة بالأعداد وادرس على حدة محدداتها الصغرى الأصغر.',
            'Work out $|A|$ with the parameter inside and set it equal to zero. If the parameter is not a root, the rank is full. For each root, write the matrix with numbers and study its smaller minors separately.'
        ),
        examplePrompt: say('Aztertu $\\begin{pmatrix}k&2\\\\2&k\\end{pmatrix}$ matrizearen heina, $k$ parametroaren arabera.', 'Estudia el rango de $\\begin{pmatrix}k&2\\\\2&k\\end{pmatrix}$ según $k$.', 'ادرس رتبة $\\begin{pmatrix}k&2\\\\2&k\\end{pmatrix}$ حسب $k$.', 'Study the rank of $\\begin{pmatrix}k&2\\\\2&k\\end{pmatrix}$ for the values of $k$.'),
        example: same('$k^2-4=0\\ \\to\\ k=\\pm 2$'),
        exampleAnswer: say('$k=2$ edo $k=-2$ denean, heina 1 da; bestela, 2.', 'Con $k=2$ o $k=-2$ el rango es 1; si no, 2.', 'مع $k=2$ أو $k=-2$ الرتبة 1، وإلا فهي 2.', 'With $k=2$ or $k=-2$ the rank is 1; otherwise, 2.')
    },

    /* ---------- 5. The inverse with the adjugate ---------- */
    'adjugate-inverse': {
        definitions: [
            { term: say('Matrize adjuntua', 'Matriz adjunta', 'المصفوفة المرافقة', 'Adjugate matrix'), meaning: say('$\\operatorname{Adj}(A)$: elementu bakoitzaren lekuan bere adjuntua duen matrizea.', '$\\operatorname{Adj}(A)$: la matriz que tiene en cada sitio el adjunto de ese elemento.', '$\\operatorname{Adj}(A)$: المصفوفة التي في كل موضع منها المتمم الجبري لذلك العنصر.', '$\\operatorname{Adj}(A)$: the matrix with the cofactor of each entry in its place.') }
        ],
        vocabulary: [
            say('irauli', 'trasponer', 'النقل', 'transpose'),
            say('zatitu', 'dividir', 'القسمة', 'divide')
        ],
        explanation: say(
            'Alderantzizkoa kalkulatzeko beste modu bat: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$. Kalkulatu adjuntu guztiak, irauli matrizea, eta zatitu $|A|$ zenbakiaz. Horregatik du alderantzizkoa $|A|\\neq 0$ denean bakarrik.',
            'Otra forma de hallar la inversa: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$. Calcula todos los adjuntos, traspón la matriz y divide entre $|A|$. Por eso solo hay inversa cuando $|A|\\neq 0$.',
            'طريقة أخرى لإيجاد المعكوس: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$. احسب كل المتممات الجبرية، ثم انقل المصفوفة واقسم على $|A|$. ولهذا لا يوجد معكوس إلا عندما $|A|\\neq 0$.',
            'Another way to find the inverse: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$. Work out all the cofactors, transpose the matrix and divide by $|A|$. That is why there is an inverse only when $|A|\\neq 0$.'
        ),
        examplePrompt: say('Kalkulatu $\\begin{pmatrix}4&3\\\\1&1\\end{pmatrix}$ matrizearen alderantzizkoa adjuntuekin.', 'Halla la inversa de $\\begin{pmatrix}4&3\\\\1&1\\end{pmatrix}$ con adjuntos.', 'أوجد معكوس $\\begin{pmatrix}4&3\\\\1&1\\end{pmatrix}$ بالمتممات الجبرية.', 'Find the inverse of $\\begin{pmatrix}4&3\\\\1&1\\end{pmatrix}$ with cofactors.'),
        example: same('$\\begin{pmatrix}4&3\\\\1&1\\end{pmatrix}^{-1}=\\begin{pmatrix}1&-3\\\\-1&4\\end{pmatrix}$'),
        exampleAnswer: say('$|A|=1$ da; beraz, alderantzizkoa $(\\operatorname{Adj}A)^t$ da.', '$|A|=1$, así que la inversa es $(\\operatorname{Adj}A)^t$.', '$|A|=1$، إذن المعكوس هو $(\\operatorname{Adj}A)^t$.', '$|A|=1$, so the inverse is $(\\operatorname{Adj}A)^t$.'),
        why: {
            text: say('Zergatik dabil? $A$ bider bere adjuntuen iraulia egitean, diagonalean $|A|$ ateratzen da (errenkada baten araberako garapena da), eta kanpoan 0 (bi errenkada berdin dituen determinante baten garapena da).', '¿Por qué funciona? Al multiplicar $A$ por la traspuesta de sus adjuntos, en la diagonal sale $|A|$ (es el desarrollo por una fila) y fuera, 0 (es el desarrollo de un determinante con dos filas iguales).', 'لماذا تنجح؟ عند ضرب $A$ في منقول متمماتها الجبرية يظهر $|A|$ على القطر (إنه النشر حسب صف) و0 خارجه (إنه نشر محدد فيه صفان متساويان).', 'Why does it work? Multiplying $A$ by the transpose of its cofactors gives $|A|$ on the diagonal (it is the expansion along a row) and 0 elsewhere (it is the expansion of a determinant with two equal rows).')
        }
    },
    'inverse-parameter': {
        definitions: [
            { term: say('Alderantzikagarria', 'Invertible', 'قابلة للعكس', 'Invertible'), meaning: say('Alderantzizkoa duen matrizea; matrize karratuetan, $|A|\\neq 0$ betetzen denean.', 'Que tiene inversa; en matrices cuadradas, cuando $|A|\\neq 0$.', 'لها معكوس؛ وفي المصفوفات المربعة عندما $|A|\\neq 0$.', 'Having an inverse; for square matrices, when $|A|\\neq 0$.') }
        ],
        vocabulary: [
            say('parametroa', 'parámetro', 'الوسيط', 'parameter'),
            say('balioa', 'valor', 'القيمة', 'value')
        ],
        explanation: say(
            '$A$ matrizeak alderantzizkoa du, baldin eta $|A|\\neq 0$ bada bakarrik. Parametro batekin: kalkulatu $|A|$, berdindu zerora, eta ateratzen diren balioak dira alderantzizkorik gabeko bakarrak; beste guztiekin, badu.',
            '$A$ tiene inversa si y solo si $|A|\\neq 0$. Con un parámetro: calcula $|A|$, iguálalo a cero, y los valores que salgan son los únicos sin inversa; con todos los demás, la hay.',
            'لـ $A$ معكوس إذا وفقط إذا كان $|A|\\neq 0$. ومع وسيط: احسب $|A|$ وساوِه بالصفر، فالقيم الناتجة هي الوحيدة التي لا معكوس معها؛ ومع كل القيم الأخرى يوجد.',
            '$A$ has an inverse if and only if $|A|\\neq 0$. With a parameter: work out $|A|$, set it equal to zero, and the values you get are the only ones with no inverse; with every other value there is one.'
        ),
        examplePrompt: say('Zein $k$ baliotarako ez du alderantzizkorik $\\begin{pmatrix}k&1\\\\6&k-1\\end{pmatrix}$ matrizeak?', '¿Para qué $k$ no tiene inversa $\\begin{pmatrix}k&1\\\\6&k-1\\end{pmatrix}$?', 'لأي $k$ ليس لـ $\\begin{pmatrix}k&1\\\\6&k-1\\end{pmatrix}$ معكوس؟', 'For which $k$ does $\\begin{pmatrix}k&1\\\\6&k-1\\end{pmatrix}$ have no inverse?'),
        example: same('$k(k-1)-6=k^2-k-6=0\\ \\to\\ k=3,\\ k=-2$'),
        exampleAnswer: say('$k=3$ eta $k=-2$ denean bakarrik.', 'Solo con $k=3$ y $k=-2$.', 'فقط مع $k=3$ و$k=-2$.', 'Only with $k=3$ and $k=-2$.')
    },
    'det-matrix-equations': {
        definitions: [
            { term: say('Determinanteak hartzea', 'Tomar determinantes', 'أخذ المحددات', 'Taking determinants'), meaning: say('Matrize-berdintza baten bi aldeen determinantea idaztea: zenbakizko ekuazio bat ateratzen da.', 'Escribir el determinante de los dos miembros de una igualdad de matrices: sale una ecuación con números.', 'كتابة محدد طرفي مساواة مصفوفية: تنتج معادلة بالأعداد.', 'Writing the determinant of both sides of a matrix equality: you get an equation with numbers.') }
        ],
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('propietateak', 'propiedades', 'الخواص', 'properties')
        ],
        explanation: say(
            '$|X|$ aurkitzeko ez dago $X$ kalkulatu beharrik: hartu determinanteak bi aldeetan, eta erabili propietateak, $|AB|=|A||B|$ eta $|kA|=k^n|A|$. Ekuazio bat ateratzen da, ezezaguna $|X|$ duena.',
            'Para hallar $|X|$ no hace falta calcular $X$: toma determinantes en los dos miembros y usa las propiedades $|AB|=|A||B|$ y $|kA|=k^n|A|$. Sale una ecuación cuya incógnita es $|X|$.',
            'لإيجاد $|X|$ لا حاجة إلى حساب $X$: خذ المحددين في الطرفين واستعمل الخواص $|AB|=|A||B|$ و$|kA|=k^n|A|$. تنتج معادلة مجهولها $|X|$.',
            'To find $|X|$ you do not need to work out $X$: take determinants on both sides and use the properties $|AB|=|A||B|$ and $|kA|=k^n|A|$. You get an equation whose unknown is $|X|$.'
        ),
        examplePrompt: say('$X^2=2A$ da, $A$ matrizea 3. ordenakoa izanik eta $|A|=4$. Zenbat da $|X|^2$?', '$X^2=2A$, con $A$ de orden 3 y $|A|=4$. ¿Cuánto vale $|X|^2$?', '$X^2=2A$ مع $A$ من الرتبة 3 و$|A|=4$. كم يساوي $|X|^2$؟', '$X^2=2A$, with $A$ of order 3 and $|A|=4$. What is $|X|^2$?'),
        example: same('$|X|^2=2^3\\cdot 4=32$'),
        exampleAnswer: say('$|X^2|=|X|^2$ da, eta $|2A|=2^3|A|$.', '$|X^2|=|X|^2$ y $|2A|=2^3|A|$.', '$|X^2|=|X|^2$ و$|2A|=2^3|A|$.', '$|X^2|=|X|^2$ and $|2A|=2^3|A|$.')
    }
}
