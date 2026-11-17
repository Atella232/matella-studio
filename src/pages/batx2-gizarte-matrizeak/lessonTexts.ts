import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { GizarteMatrizeakTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 · Gizarte Zientziak — what the four lessons of
   this unit tell (the others come from the Ciencias twin with their own
   texts): definitions, a short explanation, the example as an exercise,
   key words and «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const gizarteMatrizeakLessonTexts: Record<GizarteMatrizeakTopicId, LessonTexts> = {
    'data-tables': {
        definitions: [
            { term: say('Matrizea', 'Matriz', 'المصفوفة', 'Matrix'), meaning: say('Errenkadatan eta zutabetan ordenatutako zenbakiak, parentesi artean. Letra larriz izendatzen da: $A$.', 'Números ordenados en filas y columnas, entre paréntesis. Se nombra con mayúscula: $A$.', 'أعداد مرتبة في صفوف وأعمدة بين قوسين، وتُسمّى بحرف كبير: $A$.', 'Numbers arranged in rows and columns, between brackets. It is named with a capital letter: $A$.') },
            { term: say('Dimentsioa', 'Dimensión', 'الأبعاد', 'Size'), meaning: say('$m\\times n$: $m$ errenkada eta $n$ zutabe; lehenik errenkadak.', '$m\\times n$: $m$ filas y $n$ columnas; primero las filas.', '$m\\times n$: $m$ صفًّا و$n$ عمودًا؛ الصفوف أولًا.', '$m\\times n$: $m$ rows and $n$ columns; rows first.') }
        ],
        vocabulary: [
            say('errenkada', 'fila', 'الصف', 'row'),
            say('zutabea', 'columna', 'العمود', 'column'),
            say('elementua', 'elemento', 'العنصر', 'entry')
        ],
        explanation: say(
            'Taula bat matrize bihurtzeko, erabaki zer doan errenkadetan (taldeak, dendak, hilabeteak) eta zer zutabeetan (produktuak, gaiak), eta mantendu ordena hori. $a_{ij}$ elementua $i$ errenkadan eta $j$ zutabean dago, eta haren esanahia errenkada eta zutabe horien izenetatik dator. Bi matrize berdinak dira lauki guztietan bat badatoz.',
            'Para pasar una tabla a matriz, decide qué va en las filas (grupos, tiendas, meses) y qué en las columnas (productos, asignaturas), y mantén ese orden. El elemento $a_{ij}$ está en la fila $i$ y la columna $j$, y su significado sale de los nombres de esa fila y esa columna. Dos matrices son iguales si coinciden casilla a casilla.',
            'لتحويل جدول إلى مصفوفة قرّر ما يوضع في الصفوف (المجموعات، المتاجر، الأشهر) وما يوضع في الأعمدة (المنتجات، المواد)، وحافظ على هذا الترتيب. العنصر $a_{ij}$ في الصف $i$ والعمود $j$، ومعناه يأتي من اسمي ذلك الصف وذلك العمود. وتتساوى مصفوفتان إذا تطابقتا خانةً خانة.',
            'To turn a table into a matrix, decide what goes in the rows (groups, shops, months) and what in the columns (products, subjects), and keep that order. The entry $a_{ij}$ is in row $i$ and column $j$, and its meaning comes from the names of that row and that column. Two matrices are equal if they match cell by cell.'
        ),
        examplePrompt: say(
            'Aurkitu $x$ eta $y$, $\\begin{pmatrix}x+4&5\\\\7&2y\\end{pmatrix}=\\begin{pmatrix}11&5\\\\7&14\\end{pmatrix}$ izan dadin.',
            'Halla $x$ e $y$ para que $\\begin{pmatrix}x+4&5\\\\7&2y\\end{pmatrix}=\\begin{pmatrix}11&5\\\\7&14\\end{pmatrix}$.',
            'أوجد $x$ و$y$ ليكون $\\begin{pmatrix}x+4&5\\\\7&2y\\end{pmatrix}=\\begin{pmatrix}11&5\\\\7&14\\end{pmatrix}$.',
            'Find $x$ and $y$ so that $\\begin{pmatrix}x+4&5\\\\7&2y\\end{pmatrix}=\\begin{pmatrix}11&5\\\\7&14\\end{pmatrix}$.'
        ),
        example: same('$x+4=11\\ \\to\\ x=7\\qquad 2y=14\\ \\to\\ y=7$'),
        exampleAnswer: say('$x=7$ eta $y=7$: lauki bakoitza toki bereko laukiaren berdina da.', '$x=7$ e $y=7$: cada casilla es igual a la del mismo sitio.', '$x=7$ و$y=7$: كل خانة تساوي الخانة التي في الموضع نفسه.', '$x=7$ and $y=7$: each cell equals the one in the same place.')
    },
    'costs-profits': {
        definitions: [
            { term: say('Diru-sarrera', 'Ingreso', 'الإيراد', 'Income'), meaning: say('Saltzean jasotzen dena: kopurua bider salmenta-prezioa.', 'Lo que se cobra al vender: cantidad por precio de venta.', 'ما يُقبض عند البيع: الكمية في سعر البيع.', 'What you take in when you sell: quantity times selling price.') },
            { term: say('Irabazia', 'Beneficio', 'الربح', 'Profit'), meaning: say('Diru-sarrera ken kostua. Negatiboa bada, galerak daude.', 'Ingreso menos coste. Si sale negativo, hay pérdidas.', 'الإيراد ناقص الكلفة. وإذا كان سالبًا فهناك خسارة.', 'Income minus cost. If it is negative, there is a loss.') }
        ],
        vocabulary: [
            say('kostua', 'coste', 'الكلفة', 'cost'),
            say('prezioa', 'precio', 'السعر', 'price'),
            say('kopurua', 'cantidad', 'الكمية', 'quantity')
        ],
        explanation: say(
            'Kopuruen $Q$ matrize bat (errenkadetan hilabeteak edo dendak; zutabeetan produktuak) bider prezioen $P$ zutabe bat (errenkada bat produktu bakoitzeko) errenkada bakoitzaren guztizkoa da: produktu bakoitza bere prezioaz biderkatu eta batu egiten da. Biderkatu ahal izateko, $Q$ matrizearen zutabeek eta $P$ matrizearen errenkadek produktu berak izan behar dituzte.',
            'Una matriz de cantidades $Q$ (filas: meses o tiendas; columnas: productos) por una columna de precios $P$ (una fila por producto) da el total de cada fila: cada producto se multiplica por su precio y se suma. Para poder multiplicar, las columnas de $Q$ y las filas de $P$ tienen que ser los mismos productos.',
            'مصفوفة كميات $Q$ (الصفوف: الأشهر أو المتاجر؛ الأعمدة: المنتجات) في عمود أسعار $P$ (صف لكل منتج) تعطي مجموع كل صف: يُضرب كل منتج في سعره ثم نجمع. ولكي يمكن الضرب يجب أن تكون أعمدة $Q$ وصفوف $P$ هي المنتجات نفسها.',
            'A matrix of quantities $Q$ (rows: months or shops; columns: products) times a column of prices $P$ (one row per product) gives the total of each row: each product is multiplied by its price and they are added. To be able to multiply, the columns of $Q$ and the rows of $P$ must be the same products.'
        ),
        examplePrompt: say(
            'Denda batek 12 kamiseta eta 30 txano saltzen ditu; beste batek, 25 kamiseta eta 16 txano. Kamiseta 9 euro da, eta txanoa 4 euro. Zenbat jasotzen du denda bakoitzak?',
            'Una tienda vende 12 camisetas y 30 gorras; otra, 25 camisetas y 16 gorras. La camiseta cuesta 9 € y la gorra, 4 €. ¿Cuánto ingresa cada tienda?',
            'يبيع متجر 12 قميصًا و30 قبعة، ويبيع متجر آخر 25 قميصًا و16 قبعة. سعر القميص 9 € والقبعة 4 €. كم إيراد كل متجر؟',
            'One shop sells 12 T-shirts and 30 caps; another, 25 T-shirts and 16 caps. A T-shirt costs €9 and a cap €4. How much does each shop take in?'
        ),
        example: same('$12\\cdot 9+30\\cdot 4=228\\qquad 25\\cdot 9+16\\cdot 4=289$'),
        exampleAnswer: say('Lehen dendak 228 euro jasotzen ditu, eta bigarrenak 289 euro.', 'La primera tienda ingresa 228 € y la segunda, 289 €.', 'إيراد المتجر الأول 228 € والثاني 289 €.', 'The first shop takes in €228 and the second €289.'),
        why: {
            text: say(
                '$QV$ matrizearen lauki bakoitza hilabete baten diru-sarrera da, eta $QC$ matrizearena haren kostua. Laukiz lauki kentzea lehenik prezioak kentzea bezala da, propietate banatzailea dela eta.',
                'Cada casilla de $QV$ es el ingreso de un mes y la de $QC$, su coste. Restar casilla a casilla es lo mismo que restar antes los precios, por la propiedad distributiva.',
                'كل خانة من $QV$ هي إيراد شهر، وخانة $QC$ كلفته. والطرح خانةً خانة هو نفسه طرح الأسعار أولًا، بفضل خاصية التوزيع.',
                'Each cell of $QV$ is the income of a month and the one of $QC$ its cost. Subtracting cell by cell is the same as subtracting the prices first, by the distributive property.'
            ),
            math: same('$QV-QC=Q(V-C)$')
        }
    },
    'production-chain': {
        definitions: [
            { term: say('Ekoizpen-katea', 'Cadena de producción', 'سلسلة الإنتاج', 'Production chain'), meaning: say('Urrats batzuk bata bestearen atzetik: urrats batetik ateratzen dena hurrengoan sartzen da (etxeak → leihoak → piezak).', 'Varios pasos seguidos: lo que sale de un paso es lo que entra en el siguiente (casas → ventanas → piezas).', 'خطوات متتالية: ما يخرج من خطوة هو ما يدخل في التي تليها (البيوت ← النوافذ ← القطع).', 'Several steps in a row: what comes out of one step goes into the next (houses → windows → parts).') }
        ],
        vocabulary: [
            say('urratsa', 'paso', 'الخطوة', 'step'),
            say('ordena', 'orden', 'الترتيب', 'order'),
            say('pieza', 'pieza', 'القطعة', 'part')
        ],
        explanation: say(
            'Problema batek bi urrats dituenean (etxeek leihoak behar dituzte, eta leihoek piezak), urrats bakoitza matrize bat da. Biderkadurak urratsak kateatzen ditu: $AB$ matrizearen lauki bakoitzak, leihoz leiho, etxe baten piezak batzen ditu. Ordena katearena da: lehen urratsaren matrizea, ezkerrean.',
            'Cuando un problema tiene dos pasos (las casas piden ventanas y las ventanas piden piezas), cada paso es una matriz. El producto encadena los pasos: cada casilla de $AB$ suma, ventana a ventana, las piezas de una casa. El orden es el de la cadena: la matriz del primer paso, a la izquierda.',
            'عندما تكون للمسألة خطوتان (البيوت تحتاج نوافذ والنوافذ تحتاج قطعًا) تكون كل خطوة مصفوفة. والجداء يربط الخطوات: كل خانة من $AB$ تجمع، نافذةً نافذة، قطع بيت واحد. والترتيب هو ترتيب السلسلة: مصفوفة الخطوة الأولى على اليسار.',
            'When a problem has two steps (the houses need windows and the windows need parts), each step is a matrix. The product chains the steps: each cell of $AB$ adds up, window by window, the parts of one house. The order is the chain\'s: the matrix of the first step, on the left.'
        ),
        examplePrompt: say(
            'Mahai batek 6 torloju eta 2 ohol behar ditu; aulki batek, 4 torloju eta 3 ohol. 10 mahai eta 12 aulki eskatu dituzte. Zenbat torloju eta ohol behar dira?',
            'Una mesa lleva 6 tornillos y 2 tablas; una silla, 4 tornillos y 3 tablas. Piden 10 mesas y 12 sillas. ¿Cuántos tornillos y tablas hacen falta?',
            'تحتاج الطاولة 6 براغٍ ولوحين، والكرسي 4 براغٍ و3 ألواح. طُلبت 10 طاولات و12 كرسيًا. كم برغيًا ولوحًا نحتاج؟',
            'A table takes 6 screws and 2 boards; a chair, 4 screws and 3 boards. An order comes for 10 tables and 12 chairs. How many screws and boards are needed?'
        ),
        example: same('$\\begin{pmatrix}10&12\\end{pmatrix}\\begin{pmatrix}6&2\\\\4&3\\end{pmatrix}=\\begin{pmatrix}108&56\\end{pmatrix}$'),
        exampleAnswer: say('108 torloju eta 56 ohol behar dira.', 'Hacen falta 108 tornillos y 56 tablas.', 'نحتاج 108 براغٍ و56 لوحًا.', '108 screws and 56 boards are needed.')
    },
    'matrix-form-system': {
        definitions: [
            { term: say('Koefiziente-matrizea', 'Matriz de coeficientes', 'مصفوفة المعاملات', 'Coefficient matrix'), meaning: say('Ezezagunak biderkatzen dituzten zenbakiena, errenkada bat ekuazio bakoitzeko.', 'La de los números que multiplican a las incógnitas, una fila por ecuación.', 'مصفوفة الأعداد التي تضرب المجاهيل، صف لكل معادلة.', 'The one with the numbers that multiply the unknowns, one row per equation.') },
            { term: say('Gai askeak', 'Términos independientes', 'الحدود الثابتة', 'Constant terms'), meaning: say('Ezezagunik gabeko zenbakiak, berdin ikurraren eskuinean; $B$ zutabea osatzen dute.', 'Los números sin incógnita, a la derecha del igual; forman la columna $B$.', 'الأعداد التي بلا مجهول، يمين علامة المساواة؛ وتكوّن العمود $B$.', 'The numbers with no unknown, to the right of the equals sign; they make up the column $B$.') }
        ],
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('ekuazioa', 'ecuación', 'المعادلة', 'equation')
        ],
        explanation: say(
            'Ekuazio bakoitza errenkada bat da: koefizienteak $A$ matrizera doaz, ezezagunak $X$ zutabera eta gai askeak $B$ zutabera. $AX$ errenkada bider zutabe biderkatzean, sistema berriro agertzen da. $A$ matrizea $X$ matrizearen ezkerrean dagoenez, $A^{-1}$ matrizeaz ezkerretik biderkatuz askatzen da.',
            'Cada ecuación es una fila: los coeficientes van a la matriz $A$, las incógnitas a la columna $X$ y los términos independientes a la columna $B$. Al multiplicar $AX$ fila por columna reaparece el sistema. Como $A$ está a la izquierda de $X$, se despeja multiplicando por $A^{-1}$ por la izquierda.',
            'كل معادلة صف: تذهب المعاملات إلى المصفوفة $A$، والمجاهيل إلى العمود $X$، والحدود الثابتة إلى العمود $B$. وعند ضرب $AX$ صفًّا في عمود يعود النظام. وبما أن $A$ على يسار $X$ نجد الحل بالضرب في $A^{-1}$ من اليسار.',
            'Each equation is a row: the coefficients go into the matrix $A$, the unknowns into the column $X$ and the constant terms into the column $B$. Multiplying $AX$ row by column brings the system back. Since $A$ is to the left of $X$, you solve by multiplying by $A^{-1}$ on the left.'
        ),
        examplePrompt: say(
            'Ebatzi alderantzizkoaren bidez: $3x+y=11$ eta $5x+2y=19$.',
            'Resuelve con la inversa: $3x+y=11$ y $5x+2y=19$.',
            'حُلّ باستعمال المعكوس: $3x+y=11$ و$5x+2y=19$.',
            'Solve with the inverse: $3x+y=11$ and $5x+2y=19$.'
        ),
        example: same('$x=2\\cdot 11-1\\cdot 19=3\\qquad y=-5\\cdot 11+3\\cdot 19=2$'),
        exampleAnswer: say('$A^{-1}=\\begin{pmatrix}2&-1\\\\-5&3\\end{pmatrix}$ matrizearen errenkadak bider $B$: $x=3$ eta $y=2$.', 'Las filas de $A^{-1}=\\begin{pmatrix}2&-1\\\\-5&3\\end{pmatrix}$ por $B$: $x=3$ e $y=2$.', 'صفوف $A^{-1}=\\begin{pmatrix}2&-1\\\\-5&3\\end{pmatrix}$ في $B$: $x=3$ و$y=2$.', 'The rows of $A^{-1}=\\begin{pmatrix}2&-1\\\\-5&3\\end{pmatrix}$ times $B$: $x=3$ and $y=2$.'),
        why: {
            text: say(
                'Bi aldeak $A^{-1}$ matrizeaz ezkerretik biderkatzean, $A^{-1}A=I$ da, eta $X$ bakarrik geratzen da.',
                'Al multiplicar los dos miembros por $A^{-1}$ por la izquierda, $A^{-1}A=I$ y queda $X$ sola.',
                'عند ضرب الطرفين في $A^{-1}$ من اليسار يكون $A^{-1}A=I$ ويبقى $X$ وحده.',
                'Multiplying both sides by $A^{-1}$ on the left, $A^{-1}A=I$ and $X$ is left on its own.'
            ),
            math: same('$A^{-1}AX=A^{-1}B\\ \\to\\ X=A^{-1}B$')
        }
    }
}
