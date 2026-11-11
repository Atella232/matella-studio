import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 · Zientziak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests
   can import it; lessons.tsx merges it into the topics. The questions use
   new numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake. The wrong line of a
   mistake writes a wrong equality on purpose: the tests of this unit skip
   it when they check the products and the inverses.
   ========================================================================== */

export type MatrizeakTopicId =
    | 'what-is-a-matrix' | 'matrix-types' | 'transpose-symmetric'
    | 'sum-scalar' | 'matrix-product' | 'product-properties' | 'matrix-applications'
    | 'linear-dependence' | 'rank-gauss' | 'rank-parameter'
    | 'inverse-definition' | 'gauss-jordan' | 'matrix-powers'
    | 'matrix-equations' | 'equation-systems' | 'commuting-matrices'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const matrizeakLessonChecks: Record<MatrizeakTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Matrices and their types ---------- */
    'what-is-a-matrix': {
        mistake: {
            wrong: say('$\\begin{pmatrix}1&5\\\\8&0\\end{pmatrix}$ matrizean, $a_{21}=5$.', 'En $\\begin{pmatrix}1&5\\\\8&0\\end{pmatrix}$, $a_{21}=5$.', 'في $\\begin{pmatrix}1&5\\\\8&0\\end{pmatrix}$ يكون $a_{21}=5$.', 'In $\\begin{pmatrix}1&5\\\\8&0\\end{pmatrix}$, $a_{21}=5$.'),
            right: say('Lehenik errenkada: $a_{21}$ bigarren errenkadan eta lehen zutabean dago; beraz, $a_{21}=8$.', 'Primero la fila: $a_{21}$ está en la fila 2 y la columna 1, así que $a_{21}=8$.', 'الصف أولًا: $a_{21}$ في الصف 2 والعمود 1، إذن $a_{21}=8$.', 'Row first: $a_{21}$ is in row 2 and column 1, so $a_{21}=8$.')
        },
        check: {
            prompt: say('Zein dimentsio du $\\begin{pmatrix}1&0&4&2\\\\3&5&1&6\\end{pmatrix}$ matrizeak?', '¿Qué dimensión tiene $\\begin{pmatrix}1&0&4&2\\\\3&5&1&6\\end{pmatrix}$?', 'ما أبعاد $\\begin{pmatrix}1&0&4&2\\\\3&5&1&6\\end{pmatrix}$؟', 'What size is $\\begin{pmatrix}1&0&4&2\\\\3&5&1&6\\end{pmatrix}$?'),
            options: [same('$4\\times 2$'), same('$2\\times 4$'), same('$8$')],
            correctIndex: 1,
            explanation: say('2 errenkada eta 4 zutabe ditu: lehenik errenkadak, $2\\times 4$.', 'Tiene 2 filas y 4 columnas: primero las filas, $2\\times 4$.', 'لها صفّان و4 أعمدة: الصفوف أولًا، $2\\times 4$.', 'It has 2 rows and 4 columns: rows first, $2\\times 4$.')
        }
    },
    'matrix-types': {
        mistake: {
            wrong: same('$I=\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$'),
            right: say('Identitate-matrizeak diagonal nagusian bakarrik ditu batekoak: $I=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$.', 'La identidad solo tiene unos en la diagonal principal: $I=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$.', 'المصفوفة المحايدة فيها آحاد على القطر الرئيسي فقط: $I=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$.', 'The identity has ones only on the main diagonal: $I=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$.')
        },
        check: {
            prompt: say('Zein da behe-triangeluarra?', '¿Cuál es triangular inferior?', 'أيها مثلثية سفلى؟', 'Which one is lower triangular?'),
            options: [same('$\\begin{pmatrix}4&0\\\\-2&3\\end{pmatrix}$'), same('$\\begin{pmatrix}4&-2\\\\0&3\\end{pmatrix}$'), same('$\\begin{pmatrix}0&4\\\\3&-2\\end{pmatrix}$')],
            correctIndex: 0,
            explanation: say('Zeroak diagonalaren gainean daude, eta zenbakiak azpian.', 'Los ceros están encima de la diagonal y los números, debajo.', 'الأصفار فوق القطر والأعداد تحته.', 'The zeros are above the diagonal and the numbers below it.')
        }
    },
    'transpose-symmetric': {
        mistake: {
            wrong: say('$2\\times 3$ matrize baten iraulia beste $2\\times 3$ bat da, errenkadak alderantziz jarrita.', 'La traspuesta de una matriz $2\\times 3$ es otra $2\\times 3$ con las filas al revés.', 'منقول مصفوفة $2\\times 3$ مصفوفة $2\\times 3$ أخرى صفوفها معكوسة.', 'The transpose of a $2\\times 3$ matrix is another $2\\times 3$ one with its rows the other way round.'),
            right: say('Errenkadak zutabe bihurtzen dira: iraulia $3\\times 2$ da.', 'Las filas pasan a ser columnas: la traspuesta es $3\\times 2$.', 'تصير الصفوف أعمدة: المنقول $3\\times 2$.', 'The rows become columns: the transpose is $3\\times 2$.')
        },
        check: {
            prompt: say('Zein da antisimetrikoa?', '¿Cuál es antisimétrica?', 'أيها متماثلة تخالفيًا؟', 'Which one is skew-symmetric?'),
            options: [same('$\\begin{pmatrix}2&3\\\\-3&2\\end{pmatrix}$'), same('$\\begin{pmatrix}0&3\\\\3&0\\end{pmatrix}$'), same('$\\begin{pmatrix}0&3\\\\-3&0\\end{pmatrix}$')],
            correctIndex: 2,
            explanation: say('$A^t=-A$ izateko, diagonalean zeroak behar dira, eta $a_{21}=-a_{12}$.', 'Para que $A^t=-A$ la diagonal tiene que ser de ceros y $a_{21}=-a_{12}$.', 'لكي يكون $A^t=-A$ يجب أن يكون القطر أصفارًا و$a_{21}=-a_{12}$.', 'For $A^t=-A$ the diagonal must be zeros and $a_{21}=-a_{12}$.')
        }
    },

    /* ---------- 2. Operations with matrices ---------- */
    'sum-scalar': {
        mistake: {
            wrong: same('$2\\begin{pmatrix}1&4\\\\3&0\\end{pmatrix}=\\begin{pmatrix}2&4\\\\3&0\\end{pmatrix}$'),
            right: say('Zenbakiak elementu guztiak biderkatzen ditu: $\\begin{pmatrix}2&8\\\\6&0\\end{pmatrix}$.', 'El número multiplica todos los elementos: $\\begin{pmatrix}2&8\\\\6&0\\end{pmatrix}$.', 'العدد يضرب كل العناصر: $\\begin{pmatrix}2&8\\\\6&0\\end{pmatrix}$.', 'The number multiplies every entry: $\\begin{pmatrix}2&8\\\\6&0\\end{pmatrix}$.')
        },
        check: {
            prompt: say('Kalkulatu $\\begin{pmatrix}5&-2\\\\1&3\\end{pmatrix}-\\begin{pmatrix}2&4\\\\-1&3\\end{pmatrix}$.', 'Calcula $\\begin{pmatrix}5&-2\\\\1&3\\end{pmatrix}-\\begin{pmatrix}2&4\\\\-1&3\\end{pmatrix}$.', 'احسب $\\begin{pmatrix}5&-2\\\\1&3\\end{pmatrix}-\\begin{pmatrix}2&4\\\\-1&3\\end{pmatrix}$.', 'Work out $\\begin{pmatrix}5&-2\\\\1&3\\end{pmatrix}-\\begin{pmatrix}2&4\\\\-1&3\\end{pmatrix}$.'),
            options: [same('$\\begin{pmatrix}3&2\\\\0&0\\end{pmatrix}$'), same('$\\begin{pmatrix}3&-6\\\\2&0\\end{pmatrix}$'), same('$\\begin{pmatrix}7&2\\\\0&6\\end{pmatrix}$')],
            correctIndex: 1,
            explanation: say('Elementuz elementu: $-2-4=-6$ eta $1-(-1)=2$.', 'Elemento a elemento: $-2-4=-6$ y $1-(-1)=2$.', 'عنصرًا عنصرًا: $-2-4=-6$ و$1-(-1)=2$.', 'Entry by entry: $-2-4=-6$ and $1-(-1)=2$.')
        }
    },
    'matrix-product': {
        mistake: {
            wrong: same('$\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}\\begin{pmatrix}5&0\\\\1&2\\end{pmatrix}=\\begin{pmatrix}5&0\\\\3&8\\end{pmatrix}$'),
            right: say('Errenkada bider zutabe, ez elementuz elementu: $c_{11}=1\\cdot 5+2\\cdot 1=7$.', 'Fila por columna, no elemento a elemento: $c_{11}=1\\cdot 5+2\\cdot 1=7$.', 'صفّ في عمود، لا عنصرًا في عنصر: $c_{11}=1\\cdot 5+2\\cdot 1=7$.', 'Row by column, not entry by entry: $c_{11}=1\\cdot 5+2\\cdot 1=7$.')
        },
        check: {
            prompt: say('$A$ matrizea $3\\times 2$ da, eta $B$ matrizea $2\\times 4$. Zein dimentsio du $AB$ biderkadurak?', 'Si $A$ es $3\\times 2$ y $B$ es $2\\times 4$, ¿qué dimensión tiene $AB$?', 'إذا كانت $A$ من الأبعاد $3\\times 2$ و$B$ من الأبعاد $2\\times 4$ فما أبعاد $AB$؟', 'If $A$ is $3\\times 2$ and $B$ is $2\\times 4$, what size is $AB$?'),
            options: [same('$3\\times 4$'), same('$2\\times 2$'), say('Ezin da egin', 'No se puede hacer', 'لا يمكن إجراؤه', 'It cannot be done')],
            correctIndex: 0,
            explanation: say('Erdiko bi zenbakiak berdinak dira ($2$); emaitzak muturretakoak hartzen ditu: $3\\times 4$.', 'Los dos números del medio coinciden ($2$); el resultado se queda con los de fuera: $3\\times 4$.', 'العددان في الوسط متساويان ($2$)، والناتج يأخذ العددين الخارجيين: $3\\times 4$.', 'The two middle numbers match ($2$); the result keeps the outer ones: $3\\times 4$.')
        }
    },
    'product-properties': {
        mistake: {
            wrong: same('$(A+B)^2=A^2+2AB+B^2$'),
            right: say('$(A+B)^2=A^2+AB+BA+B^2$; $AB=BA$ denean bakarrik biltzen dira $2AB$ batean.', '$(A+B)^2=A^2+AB+BA+B^2$; solo si $AB=BA$ se juntan en $2AB$.', '$(A+B)^2=A^2+AB+BA+B^2$؛ ولا يجتمعان في $2AB$ إلا إذا كان $AB=BA$.', '$(A+B)^2=A^2+AB+BA+B^2$; only when $AB=BA$ do they make $2AB$.')
        },
        check: {
            prompt: say('$AB=\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$ dakigu. Zer dakigu $BA$ biderkaduraz?', 'Sabemos que $AB=\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$. ¿Qué sabemos de $BA$?', 'نعلم أن $AB=\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$. ماذا نعلم عن $BA$؟', 'We know that $AB=\\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$. What do we know about $BA$?'),
            options: [say('Berdina da', 'Es la misma', 'هو نفسه', 'It is the same'), say('Iraulia da', 'Es su traspuesta', 'هو منقوله', 'It is its transpose'), say('Kalkulatu egin behar da', 'Hay que calcularlo', 'يجب حسابه', 'It has to be worked out')],
            correctIndex: 2,
            explanation: say('Biderkadura ez da trukakorra: $BA$ beste matrize bat izan daiteke, edo ez egon.', 'El producto no es conmutativo: $BA$ puede ser otra matriz, o ni siquiera existir.', 'الضرب ليس تبديليًا: قد يكون $BA$ مصفوفة أخرى، أو قد لا يوجد أصلًا.', 'The product is not commutative: $BA$ can be another matrix, or not exist at all.')
        }
    },
    'matrix-applications': {
        mistake: {
            wrong: say('$A^2$ kalkulatzeko, grafoaren matrizearen elementu bakoitza karratura jasotzen da.', '$A^2$ se calcula elevando al cuadrado cada elemento de la matriz del grafo.', 'نحسب $A^2$ برفع كل عنصر من مصفوفة البيان إلى القوة الثانية.', '$A^2$ is found by squaring each entry of the graph\'s matrix.'),
            right: say('$A^2=A\\cdot A$, errenkada bider zutabe; horregatik zenbatzen ditu bi urratseko bideak.', '$A^2=A\\cdot A$, fila por columna; por eso cuenta los caminos de dos pasos.', '$A^2=A\\cdot A$، صفًّا في عمود؛ ولهذا يعدّ المسارات ذات الخطوتين.', '$A^2=A\\cdot A$, row by column; that is why it counts the two-step paths.')
        },
        check: {
            prompt: say('Grafo baten matrizea $\\begin{pmatrix}0&2\\\\1&0\\end{pmatrix}$ da. Zenbat bi urratseko bide doaz 1 erpinetik 1 erpinera?', 'La matriz de un grafo es $\\begin{pmatrix}0&2\\\\1&0\\end{pmatrix}$. ¿Cuántos caminos de dos pasos van del vértice 1 al 1?', 'مصفوفة بيان هي $\\begin{pmatrix}0&2\\\\1&0\\end{pmatrix}$. كم مسارًا بخطوتين يذهب من الرأس 1 إلى الرأس 1؟', 'The matrix of a graph is $\\begin{pmatrix}0&2\\\\1&0\\end{pmatrix}$. How many two-step paths go from vertex 1 to vertex 1?'),
            options: [same('$0$'), same('$2$'), same('$4$')],
            correctIndex: 1,
            explanation: say('$A^2$ matrizearen $(1,1)$ elementua: $0\\cdot 0+2\\cdot 1=2$.', 'El elemento $(1,1)$ de $A^2$: $0\\cdot 0+2\\cdot 1=2$.', 'العنصر $(1,1)$ من $A^2$: $0\\cdot 0+2\\cdot 1=2$.', 'The entry $(1,1)$ of $A^2$: $0\\cdot 0+2\\cdot 1=2$.')
        }
    },

    /* ---------- 3. Rank ---------- */
    'linear-dependence': {
        mistake: {
            wrong: say('$(1,2)$ eta $(2,1)$ menpekoak dira, zenbaki berberak dituztelako.', '$(1,2)$ y $(2,1)$ son dependientes porque tienen los mismos números.', '$(1,2)$ و$(2,1)$ مرتبطان خطيًا لأن فيهما العددين نفسيهما.', '$(1,2)$ and $(2,1)$ are dependent because they have the same numbers.'),
            right: say('Menpekoak izateko, bata bestearen multiploa izan behar da, eta $(2,1)$ ez da $(1,2)$ errenkadaren multiploa: independenteak dira.', 'Para depender, una tiene que ser múltiplo de la otra, y $(2,1)$ no es múltiplo de $(1,2)$: son independientes.', 'لكي يرتبطا يجب أن يكون أحدهما مضاعفًا للآخر، و$(2,1)$ ليس مضاعفًا لـ $(1,2)$: هما مستقلان.', 'To be dependent one must be a multiple of the other, and $(2,1)$ is not a multiple of $(1,2)$: they are independent.')
        },
        check: {
            prompt: say('Zein errenkada da $(1,0,2)$ eta $(0,1,1)$ errenkaden konbinazio lineala?', '¿Qué fila es combinación lineal de $(1,0,2)$ y $(0,1,1)$?', 'أي صف تركيب خطي من $(1,0,2)$ و$(0,1,1)$؟', 'Which row is a linear combination of $(1,0,2)$ and $(0,1,1)$?'),
            options: [same('$(1,1,2)$'), same('$(2,3,6)$'), same('$(2,3,7)$')],
            correctIndex: 2,
            explanation: same('$2\\cdot(1,0,2)+3\\cdot(0,1,1)=(2,3,7)$')
        }
    },
    'rank-gauss': {
        mistake: {
            wrong: say('Hiru errenkada ditu; beraz, haren heina 3 da.', 'Tiene tres filas, así que su rango es 3.', 'لها ثلاثة صفوف، إذن رتبتها 3.', 'It has three rows, so its rank is 3.'),
            right: say('Mailakatu egin behar da: errenkada bat zero bihurtzen bada, heina jaitsi egiten da.', 'Hay que escalonar: si una fila se hace de ceros, el rango baja.', 'يجب التحويل إلى الشكل الدرجي: إذا صار صف أصفارًا نقصت الرتبة.', 'You have to reduce it: if a row turns into zeros, the rank goes down.')
        },
        check: {
            prompt: say('Zein da $\\begin{pmatrix}1&-1&3\\\\-2&2&-6\\end{pmatrix}$ matrizearen heina?', '¿Cuál es el rango de $\\begin{pmatrix}1&-1&3\\\\-2&2&-6\\end{pmatrix}$?', 'ما رتبة $\\begin{pmatrix}1&-1&3\\\\-2&2&-6\\end{pmatrix}$؟', 'What is the rank of $\\begin{pmatrix}1&-1&3\\\\-2&2&-6\\end{pmatrix}$?'),
            options: [same('$1$'), same('$2$'), same('$3$')],
            correctIndex: 0,
            explanation: say('$E_2+2E_1$ eragiketak zeroko errenkada bat uzten du: bigarrena lehenaren $-2$ aldiz da.', '$E_2+2E_1$ deja una fila de ceros: la segunda es $-2$ veces la primera.', '$E_2+2E_1$ تترك صفًّا من الأصفار: الثاني يساوي $-2$ مرة الأول.', '$E_2+2E_1$ leaves a row of zeros: the second is $-2$ times the first.')
        }
    },
    'rank-parameter': {
        mistake: {
            wrong: say('$E_3$ errenkada $m-4$ adierazpenaz zatitzen dut, eta $(0\\ \\ 0\\ \\ 1)$ geratzen da: heina beti 3 da.', 'Divido $E_3$ entre $m-4$ y queda $(0\\ \\ 0\\ \\ 1)$: el rango es siempre 3.', 'أقسم $E_3$ على $m-4$ فيبقى $(0\\ \\ 0\\ \\ 1)$: الرتبة دائمًا 3.', 'I divide $E_3$ by $m-4$ and get $(0\\ \\ 0\\ \\ 1)$: the rank is always 3.'),
            right: say('$m\\neq 4$ denean bakarrik zati daiteke; $m=4$ denean, errenkada zeroz beteta dago, eta heina 2 da.', 'Solo se puede dividir si $m\\neq 4$; con $m=4$ la fila es de ceros y el rango es 2.', 'لا يجوز القسمة إلا إذا كان $m\\neq 4$؛ ومع $m=4$ يكون الصف أصفارًا والرتبة 2.', 'You can only divide if $m\\neq 4$; with $m=4$ the row is all zeros and the rank is 2.')
        },
        check: {
            prompt: say('Zein $a$ baliotarako du 1 heina $\\begin{pmatrix}2&a\\\\6&9\\end{pmatrix}$ matrizeak?', '¿Para qué valor de $a$ tiene rango 1 la matriz $\\begin{pmatrix}2&a\\\\6&9\\end{pmatrix}$?', 'لأي قيمة لـ $a$ تكون رتبة $\\begin{pmatrix}2&a\\\\6&9\\end{pmatrix}$ مساوية 1؟', 'For which value of $a$ does $\\begin{pmatrix}2&a\\\\6&9\\end{pmatrix}$ have rank 1?'),
            options: [same('$a=9$'), same('$a=3$'), same('$a=2$')],
            correctIndex: 1,
            explanation: say('$E_2-3E_1$ eragiketak $(0,\\ 9-3a)$ ematen du, eta $a=3$ denean zeroz beteta dago.', '$E_2-3E_1$ da $(0,\\ 9-3a)$, que es de ceros con $a=3$.', '$E_2-3E_1$ تعطي $(0,\\ 9-3a)$، وهو أصفار عندما $a=3$.', '$E_2-3E_1$ gives $(0,\\ 9-3a)$, which is all zeros when $a=3$.')
        }
    },

    /* ---------- 4. Inverse and powers ---------- */
    'inverse-definition': {
        mistake: {
            wrong: same('$\\begin{pmatrix}2&4\\\\1&5\\end{pmatrix}^{-1}=\\begin{pmatrix}\\frac{1}{2}&\\frac{1}{4}\\\\1&\\frac{1}{5}\\end{pmatrix}$'),
            right: say('Alderantzizkoa ez da zenbaki bakoitzaren alderantzizkoa: $AA^{-1}=I$ bete behar du.', 'La inversa no es el inverso de cada número: tiene que cumplir $AA^{-1}=I$.', 'المعكوس ليس مقلوب كل عدد: يجب أن يحقق $AA^{-1}=I$.', 'The inverse is not the reciprocal of each number: it must satisfy $AA^{-1}=I$.')
        },
        check: {
            prompt: say('Ba al du alderantzizkorik $\\begin{pmatrix}1&3\\\\2&6\\end{pmatrix}$ matrizeak?', '¿Tiene inversa $\\begin{pmatrix}1&3\\\\2&6\\end{pmatrix}$?', 'هل لـ $\\begin{pmatrix}1&3\\\\2&6\\end{pmatrix}$ معكوس؟', 'Does $\\begin{pmatrix}1&3\\\\2&6\\end{pmatrix}$ have an inverse?'),
            options: [say('Bai, karratua delako', 'Sí, porque es cuadrada', 'نعم، لأنها مربعة', 'Yes, because it is square'), say('Ez: haren heina 1 da', 'No: su rango es 1', 'لا: رتبتها 1', 'No: its rank is 1'), say('Bai: $\\begin{pmatrix}1&\\frac{1}{3}\\\\\\frac{1}{2}&\\frac{1}{6}\\end{pmatrix}$', 'Sí: $\\begin{pmatrix}1&\\frac{1}{3}\\\\\\frac{1}{2}&\\frac{1}{6}\\end{pmatrix}$', 'نعم: $\\begin{pmatrix}1&\\frac{1}{3}\\\\\\frac{1}{2}&\\frac{1}{6}\\end{pmatrix}$', 'Yes: $\\begin{pmatrix}1&\\frac{1}{3}\\\\\\frac{1}{2}&\\frac{1}{6}\\end{pmatrix}$')],
            correctIndex: 1,
            explanation: say('Bigarren errenkada lehenaren bikoitza da: heina ez da maximoa, eta ez dago alderantzizkorik.', 'La segunda fila es el doble de la primera: el rango no es máximo y no hay inversa.', 'الصف الثاني ضعف الأول: الرتبة ليست عظمى، فلا معكوس.', 'The second row is twice the first: the rank is not full, so there is no inverse.')
        }
    },
    'gauss-jordan': {
        mistake: {
            wrong: say('Eragiketak ezkerreko zatian bakarrik egiten ditut, $A$ matrizean.', 'Hago las operaciones solo en la parte de la izquierda, en $A$.', 'أجري العمليات في الجزء الأيسر فقط، في $A$.', 'I do the operations on the left part only, on $A$.'),
            right: say('Eragiketa bakoitza errenkada osoan egiten da, $I$ zatian ere: hor osatzen da $A^{-1}$.', 'Cada operación se hace en la fila entera, también en la parte de $I$: ahí se va formando $A^{-1}$.', 'تُجرى كل عملية على الصف كله، وفي جزء $I$ أيضًا: هناك يتكوّن $A^{-1}$.', 'Each operation is done on the whole row, the $I$ part too: that is where $A^{-1}$ takes shape.')
        },
        check: {
            prompt: say('Gauss-Jordan egin ondoren, $\\left(\\begin{array}{cc|cc}1&0&4&-3\\\\0&1&-1&1\\end{array}\\right)$ geratzen da. Zein da $A^{-1}$?', 'Tras Gauss-Jordan queda $\\left(\\begin{array}{cc|cc}1&0&4&-3\\\\0&1&-1&1\\end{array}\\right)$. ¿Cuál es $A^{-1}$?', 'بعد غاوس-جوردان يبقى $\\left(\\begin{array}{cc|cc}1&0&4&-3\\\\0&1&-1&1\\end{array}\\right)$. ما $A^{-1}$؟', 'After Gauss–Jordan you are left with $\\left(\\begin{array}{cc|cc}1&0&4&-3\\\\0&1&-1&1\\end{array}\\right)$. What is $A^{-1}$?'),
            options: [same('$\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$'), same('$\\begin{pmatrix}4&-3\\\\-1&1\\end{pmatrix}$'), same('$\\begin{pmatrix}1&3\\\\1&4\\end{pmatrix}$')],
            correctIndex: 1,
            explanation: say('Ezkerrean $I$ geratzen denean, eskuineko zatia da $A^{-1}$.', 'Cuando a la izquierda queda $I$, la parte derecha es $A^{-1}$.', 'عندما يبقى $I$ في اليسار يكون الجزء الأيمن هو $A^{-1}$.', 'When $I$ is left on the left, the right part is $A^{-1}$.')
        }
    },
    'matrix-powers': {
        mistake: {
            wrong: same('$\\begin{pmatrix}2&1\\\\1&0\\end{pmatrix}^2=\\begin{pmatrix}4&1\\\\1&0\\end{pmatrix}$'),
            right: say('$A^2=A\\cdot A$, errenkada bider zutabe: $\\begin{pmatrix}5&2\\\\2&1\\end{pmatrix}$.', '$A^2=A\\cdot A$, fila por columna: $\\begin{pmatrix}5&2\\\\2&1\\end{pmatrix}$.', '$A^2=A\\cdot A$، صفًّا في عمود: $\\begin{pmatrix}5&2\\\\2&1\\end{pmatrix}$.', '$A^2=A\\cdot A$, row by column: $\\begin{pmatrix}5&2\\\\2&1\\end{pmatrix}$.')
        },
        check: {
            prompt: say('$A^3=I$ bada, zenbat da $A^{10}$?', 'Si $A^3=I$, ¿cuánto es $A^{10}$?', 'إذا كان $A^3=I$ فكم يساوي $A^{10}$؟', 'If $A^3=I$, what is $A^{10}$?'),
            options: [same('$I$'), same('$A^{2}$'), same('$A$')],
            correctIndex: 2,
            explanation: say('$10=3\\cdot 3+1$; beraz, $A^{10}=(A^3)^3A=A$.', '$10=3\\cdot 3+1$, así que $A^{10}=(A^3)^3A=A$.', '$10=3\\cdot 3+1$، إذن $A^{10}=(A^3)^3A=A$.', '$10=3\\cdot 3+1$, so $A^{10}=(A^3)^3A=A$.')
        }
    },

    /* ---------- 5. Matrix equations ---------- */
    'matrix-equations': {
        mistake: {
            wrong: same('$AX=B\\ \\to\\ X=BA^{-1}$'),
            right: say('$A$ matrizea $X$ matrizearen ezkerrean dago; beraz, $A^{-1}$ ere ezkerrean doa: $X=A^{-1}B$.', '$A$ está a la izquierda de $X$, así que $A^{-1}$ va a la izquierda: $X=A^{-1}B$.', '$A$ على يسار $X$، إذن يوضع $A^{-1}$ على اليسار: $X=A^{-1}B$.', '$A$ is on the left of $X$, so $A^{-1}$ goes on the left: $X=A^{-1}B$.')
        },
        check: {
            prompt: say('Askatu $X$ hemen: $AX-X=B$.', 'Despeja $X$ en $AX-X=B$.', 'استخرج $X$ من $AX-X=B$.', 'Solve $AX-X=B$ for $X$.'),
            options: [same('$X=(A-I)^{-1}B$'), same('$X=(A-1)^{-1}B$'), same('$X=B(A-I)^{-1}$')],
            correctIndex: 0,
            explanation: say('$X=IX$; beraz, $AX-IX=(A-I)X=B$, eta $(A-I)^{-1}$ ezkerretik biderkatzen da.', 'Como $X=IX$, $AX-IX=(A-I)X=B$, y se multiplica por $(A-I)^{-1}$ a la izquierda.', 'بما أن $X=IX$ فإن $AX-IX=(A-I)X=B$، ونضرب في $(A-I)^{-1}$ من اليسار.', 'As $X=IX$, $AX-IX=(A-I)X=B$, and you multiply by $(A-I)^{-1}$ on the left.')
        }
    },
    'equation-systems': {
        mistake: {
            wrong: same('$X-Y=B\\ \\to\\ Y=B-X$'),
            right: say('$X$ beste aldera pasatzean, zeinua aldatzen du: $-Y=B-X$; beraz, $Y=X-B$.', 'Al pasar $X$ al otro lado cambia de signo: $-Y=B-X$, así que $Y=X-B$.', 'عند نقل $X$ إلى الطرف الآخر تتغير إشارته: $-Y=B-X$، إذن $Y=X-B$.', 'When $X$ moves to the other side its sign changes: $-Y=B-X$, so $Y=X-B$.')
        },
        check: {
            prompt: say('$X+Y=A$ eta $X-Y=B$ badira, zenbat da $X$?', 'Si $X+Y=A$ y $X-Y=B$, ¿cuánto es $X$?', 'إذا كان $X+Y=A$ و$X-Y=B$ فكم تساوي $X$؟', 'If $X+Y=A$ and $X-Y=B$, what is $X$?'),
            options: [same('$\\frac{1}{2}(A-B)$'), same('$A+B$'), same('$\\frac{1}{2}(A+B)$')],
            correctIndex: 2,
            explanation: say('Batzean, $2X=A+B$.', 'Al sumar, $2X=A+B$.', 'بالجمع: $2X=A+B$.', 'Adding them, $2X=A+B$.')
        }
    },
    'commuting-matrices': {
        mistake: {
            wrong: say('$AX=XA$ izateko, nahikoa da $X$ simetrikoa izatea.', 'Para que $AX=XA$ basta con que $X$ sea simétrica.', 'لكي يكون $AX=XA$ يكفي أن تكون $X$ متماثلة.', 'For $AX=XA$ it is enough for $X$ to be symmetric.'),
            right: say('Elementuz elementu berdindu behar dira: $\\begin{pmatrix}1&2\\\\2&1\\end{pmatrix}$ simetrikoa da, baina ez da trukatzen $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ matrizearekin.', 'Hay que igualar casilla a casilla: $\\begin{pmatrix}1&2\\\\2&1\\end{pmatrix}$ es simétrica y no conmuta con $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$.', 'يجب المساواة عنصرًا عنصرًا: $\\begin{pmatrix}1&2\\\\2&1\\end{pmatrix}$ متماثلة ولا تتبادل مع $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$.', 'You must match entry by entry: $\\begin{pmatrix}1&2\\\\2&1\\end{pmatrix}$ is symmetric and does not commute with $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$.')
        },
        check: {
            prompt: say('Zein trukatzen da $\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$ matrizearekin?', '¿Cuál conmuta con $\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$?', 'أيها تتبادل مع $\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$؟', 'Which one commutes with $\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$?'),
            options: [same('$\\begin{pmatrix}2&5\\\\-5&2\\end{pmatrix}$'), same('$\\begin{pmatrix}2&5\\\\5&2\\end{pmatrix}$'), same('$\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$')],
            correctIndex: 1,
            explanation: say('$\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$ matrizearekin, $AX=XA$ berdintzak $c=b$ eta $d=a$ ematen ditu.', 'Con $\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$, $AX=XA$ da $c=b$ y $d=a$.', 'مع $\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$ تعطي $AX=XA$ أن $c=b$ و$d=a$.', 'With $\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$, $AX=XA$ gives $c=b$ and $d=a$.')
        }
    }
}
