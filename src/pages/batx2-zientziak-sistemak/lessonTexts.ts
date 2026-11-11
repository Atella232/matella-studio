import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { SistemakTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Sistemak · Batxilergoa 2 · Zientziak — what each lesson tells: the new
   words (definitions), a short explanation, the example as an exercise
   («Another example»), the key words in four languages and, in four
   lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics. The example uses numbers of its
   own. A negative entry of a matrix that is not the first of its row is
   written {-1}: the shared lesson test would read «1 -1» as a sum.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const sistemakLessonTexts: Record<SistemakTopicId, LessonTexts> = {
    /* ---------- 1. Rouché–Frobenius ---------- */
    'matrix-form': {
        definitions: [
            { term: say('Koefizienteen matrizea', 'Matriz de coeficientes', 'مصفوفة المعاملات', 'Coefficient matrix'), meaning: say('$A$ matrizea: ekuazioetako koefizienteak, errenkada bat ekuazio bakoitzeko.', 'La matriz $A$: los coeficientes de las ecuaciones, una fila por ecuación.', 'المصفوفة $A$: معاملات المعادلات، صف لكل معادلة.', 'The matrix $A$: the coefficients of the equations, one row per equation.') },
            { term: say('Matrize zabaldua', 'Matriz ampliada', 'المصفوفة الموسعة', 'Augmented matrix'), meaning: say('$A^*$ matrizea: $A$ eta, azken zutabe gisa, gai askeak.', 'La matriz $A^*$: $A$ y, como última columna, los términos independientes.', 'المصفوفة $A^*$: $A$ ومعها الحدود الثابتة عمودًا أخيرًا.', 'The matrix $A^*$: $A$ with the constant terms as its last column.') }
        ],
        vocabulary: [
            say('gai askea', 'término independiente', 'الحد الثابت', 'constant term'),
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('zutabea', 'columna', 'العمود', 'column')
        ],
        explanation: say(
            'Sistema lineal bat $AX=B$ biderkadura bat da: $A$ koefizienteen matrizea, $X$ ezezagunen zutabea eta $B$ gai askeen zutabea. Ekuazio batean ezezagun bat falta bada, haren koefizientea 0 da. Matrize zabaldua, $A^*$, $A$ da $B$ zutabea gehituta.',
            'Un sistema lineal es un producto $AX=B$: $A$ es la matriz de coeficientes, $X$ la columna de incógnitas y $B$ la de términos independientes. Si a una ecuación le falta una incógnita, su coeficiente es 0. La matriz ampliada $A^*$ es $A$ con la columna $B$ añadida.',
            'النظام الخطي جداء $AX=B$: $A$ مصفوفة المعاملات، و$X$ عمود المجاهيل، و$B$ عمود الحدود الثابتة. وإذا غاب مجهول عن معادلة فمعامله 0. والمصفوفة الموسعة $A^*$ هي $A$ مضافًا إليها العمود $B$.',
            'A linear system is a product $AX=B$: $A$ is the coefficient matrix, $X$ the column of unknowns and $B$ that of the constant terms. If an equation lacks an unknown, its coefficient is 0. The augmented matrix $A^*$ is $A$ with the column $B$ added.'
        ),
        examplePrompt: say('Idatzi $A^*$, $\\begin{cases}x+2y=5\\\\ 3x-y=1\\end{cases}$ sistemarako.', 'Escribe $A^*$ para $\\begin{cases}x+2y=5\\\\ 3x-y=1\\end{cases}$.', 'اكتب $A^*$ للنظام $\\begin{cases}x+2y=5\\\\ 3x-y=1\\end{cases}$.', 'Write $A^*$ for $\\begin{cases}x+2y=5\\\\ 3x-y=1\\end{cases}$.'),
        example: same('$A^*=\\left(\\begin{array}{cc|c}1&2&5\\\\3&{-1}&1\\end{array}\\right)$'),
        exampleAnswer: say('Bi ekuazio eta bi ezezagun: $A^*$ matrizea $2\\times 3$ da.', 'Dos ecuaciones y dos incógnitas: $A^*$ es $2\\times 3$.', 'معادلتان ومجهولان: $A^*$ من الأبعاد $2\\times 3$.', 'Two equations in two unknowns: $A^*$ is $2\\times 3$.')
    },
    'rouche-theorem': {
        definitions: [
            { term: say('Rouché-Frobeniusen teorema', 'Teorema de Rouché-Frobenius', 'مبرهنة روشيه-فروبينيوس', 'Rouché–Frobenius theorem'), meaning: say('Sistema bat bateragarria da, baldin eta $A$ eta $A^*$ matrizeek heina bera badute bakarrik.', 'Un sistema es compatible si y solo si $A$ y $A^*$ tienen el mismo rango.', 'يكون النظام متوافقًا إذا وفقط إذا كان لـ $A$ و$A^*$ الرتبة نفسها.', 'A system is consistent if and only if $A$ and $A^*$ have the same rank.') }
        ],
        vocabulary: [
            say('heina', 'rango', 'الرتبة', 'rank'),
            say('parametroa', 'parámetro', 'الوسيط', 'parameter'),
            say('bateragarria', 'compatible', 'متوافق', 'consistent')
        ],
        explanation: say(
            'Sistema bat sailkatzeko ez da ebatzi behar: nahikoa da $A$ matrizearen heina, $A^*$ matrizearena eta ezezagun kopurua, $n$, konparatzea. Heina desberdinak: bateraezina. $n$ zenbakiaren berdinak: soluzio bakarra. Berdinak baina $n$ baino txikiagoak: infinitu, $n-\\operatorname{rg}(A)$ parametrorekin.',
            'Para clasificar un sistema no hace falta resolverlo: basta comparar el rango de $A$, el de $A^*$ y el número de incógnitas $n$. Rangos distintos: incompatible. Iguales a $n$: una sola solución. Iguales pero menores que $n$: infinitas, con $n-\\operatorname{rg}(A)$ parámetros.',
            'لتصنيف نظام لا حاجة إلى حله: يكفي مقارنة رتبة $A$ ورتبة $A^*$ وعدد المجاهيل $n$. رتبتان مختلفتان: غير متوافق. تساويان $n$: حل واحد. متساويتان وأصغر من $n$: حلول لا نهائية بعدد $n-\\operatorname{rg}(A)$ من الوسائط.',
            'To classify a system you do not need to solve it: compare the rank of $A$, that of $A^*$ and the number of unknowns $n$. Different ranks: inconsistent. Equal to $n$: one solution. Equal but less than $n$: infinitely many, with $n-\\operatorname{rg}(A)$ parameters.'
        ),
        cases: [
            { title: say('Bateragarri determinatua', 'Compatible determinado', 'متوافق محدد', 'Consistent and independent'), text: say('Soluzio bakarra.', 'Una sola solución.', 'حل واحد.', 'One solution.'), math: same('$\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=n$') },
            { title: say('Bateragarri indeterminatua', 'Compatible indeterminado', 'متوافق غير محدد', 'Consistent and dependent'), text: say('Infinitu soluzio.', 'Infinitas soluciones.', 'حلول لا نهائية.', 'Infinitely many solutions.'), math: same('$\\operatorname{rg}(A)=\\operatorname{rg}(A^*)<n$') },
            { title: say('Bateraezina', 'Incompatible', 'غير متوافق', 'Inconsistent'), text: say('Soluziorik ez.', 'Ninguna solución.', 'لا حل.', 'No solution.'), math: same('$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$') }
        ],
        examplePrompt: say('4 ezezaguneko sistema batek $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$ du. Zenbat parametro ditu?', 'Un sistema de 4 incógnitas tiene $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$. ¿Cuántos parámetros tiene?', 'نظام بأربعة مجاهيل فيه $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$. كم وسيطًا له؟', 'A system in 4 unknowns has $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$. How many parameters does it have?'),
        example: same('$4-2=2$'),
        exampleAnswer: say('Bateragarri indeterminatua da, bi parametrorekin.', 'Es compatible indeterminado, con dos parámetros.', 'هو متوافق غير محدد بوسيطين.', 'It is consistent and dependent, with two parameters.'),
        why: {
            text: say('Zergatik? $AX=B$ adierazpenak $B$ zutabea $A$ matrizearen zutabeen konbinazio bat dela dio. $B$ gehitzean heina igotzen bada, $B$ ez da haien konbinazioa, eta ez dago soluziorik.', '¿Por qué? $AX=B$ dice que $B$ es una combinación de las columnas de $A$. Si al añadir $B$ sube el rango, $B$ no es combinación de ellas y no hay solución.', 'لماذا؟ تقول $AX=B$ إن $B$ تركيب من أعمدة $A$. فإذا ارتفعت الرتبة بإضافة $B$ فليس $B$ تركيبًا منها ولا يوجد حل.', 'Why? $AX=B$ says that $B$ is a combination of the columns of $A$. If adding $B$ raises the rank, $B$ is not a combination of them and there is no solution.')
        }
    },
    'rank-classify': {
        definitions: [
            { term: say('Menorea orlatzea', 'Orlar un menor', 'تطويق محدد أصغر', 'Bordering a minor'), meaning: say('Menore bati falta diren errenkada bat eta zutabe bat gehitzea, ordena bat handiagoko menorea lortzeko.', 'Añadir a un menor una fila y una columna que le faltan, para tener un menor de un orden más.', 'إضافة صف وعمود ناقصين إلى محدد أصغر للحصول على محدد أصغر برتبة أعلى.', 'Adding a missing row and column to a minor, to get a minor one order higher.') }
        ],
        vocabulary: [
            say('menorea', 'menor', 'المحدد الأصغر', 'minor'),
            say('bateraezina', 'incompatible', 'غير متوافق', 'inconsistent')
        ],
        explanation: say(
            'Heinak menoreekin kalkulatzen dira. Lehenik, $A$ matrizearena: 0 ez den menore handiena. Gero, ez da hutsetik hasi behar: menore hori $B$ zutabearekin eta falta den errenkadarekin orlatzen da. Orlatutakoak 0 badira, $A^*$ matrizeak heina bera du; bat 0 ez bada, heina igotzen da, eta sistema bateraezina da.',
            'Los rangos se calculan con menores. Primero el de $A$: el mayor menor distinto de 0. Después no hace falta empezar de cero: se orla ese menor con la columna $B$ y la fila que falta. Si los orlados valen 0, $A^*$ tiene el mismo rango; si alguno no, el rango sube y el sistema es incompatible.',
            'تُحسب الرتب بالمحددات الصغرى. أولًا رتبة $A$: أكبر محدد أصغر غير صفري. ثم لا حاجة إلى البدء من جديد: نطوّق ذلك المحدد بالعمود $B$ والصف الناقص. إذا كانت المطوَّقات أصفارًا فلـ $A^*$ الرتبة نفسها؛ وإلا ترتفع الرتبة ويكون النظام غير متوافق.',
            'The ranks are found with minors. First that of $A$: the largest minor that is not 0. Then there is no need to start again: border that minor with the column $B$ and the missing row. If the bordered minors are 0, $A^*$ has the same rank; if one is not, the rank goes up and the system is inconsistent.'
        ),
        examplePrompt: say('Sailkatu $\\begin{cases}x+y+z=1\\\\ x-y+z=3\\\\ 2x+2z=5\\end{cases}$.', 'Clasifica $\\begin{cases}x+y+z=1\\\\ x-y+z=3\\\\ 2x+2z=5\\end{cases}$.', 'صنّف $\\begin{cases}x+y+z=1\\\\ x-y+z=3\\\\ 2x+2z=5\\end{cases}$.', 'Classify $\\begin{cases}x+y+z=1\\\\ x-y+z=3\\\\ 2x+2z=5\\end{cases}$.'),
        example: same('$|A|=0,\\qquad \\begin{vmatrix}1&1&1\\\\1&{-1}&3\\\\2&0&5\\end{vmatrix}=-2\\neq 0$'),
        exampleAnswer: say('$\\operatorname{rg}(A)=2\\neq\\operatorname{rg}(A^*)=3$: bateraezina.', '$\\operatorname{rg}(A)=2\\neq\\operatorname{rg}(A^*)=3$: incompatible.', '$\\operatorname{rg}(A)=2\\neq\\operatorname{rg}(A^*)=3$: غير متوافق.', '$\\operatorname{rg}(A)=2\\neq\\operatorname{rg}(A^*)=3$: inconsistent.')
    },
    'geometric-meaning': {
        definitions: [
            { term: say('Zuzen ebakitzaileak', 'Rectas concurrentes', 'مستقيمات متلاقية', 'Concurrent lines'), meaning: say('Denak puntu beretik pasatzen diren zuzenak.', 'Rectas que pasan todas por un mismo punto.', 'مستقيمات تمر كلها بنقطة واحدة.', 'Lines that all pass through the same point.') }
        ],
        vocabulary: [
            say('zuzena', 'recta', 'المستقيم', 'line'),
            say('triangelua', 'triángulo', 'المثلث', 'triangle'),
            say('paraleloak', 'paralelas', 'متوازيان', 'parallel')
        ],
        explanation: say(
            'Bi ezezagunekin, ekuazio bakoitza planoko zuzen bat da, eta soluzio bat puntu komun bat. Heinek esaten dute nola dauden: $A$ eta $A^*$ matrizeek 2 heina badute, zuzenak puntu batetik pasatzen dira; $A^*$ matrizeak heina handiagoa badu, ez dago puntu komunik: triangelu bat osatzen dute, edo bi paraleloak dira.',
            'Con dos incógnitas, cada ecuación es una recta del plano y una solución es un punto común. Los rangos dicen cómo están: si $A$ y $A^*$ tienen rango 2, las rectas pasan por un punto; si $A^*$ tiene más rango, no hay punto común: forman un triángulo o dos son paralelas.',
            'مع مجهولين تكون كل معادلة مستقيمًا في المستوى والحل نقطة مشتركة. والرتب تقول كيف تقع: إذا كانت رتبة $A$ و$A^*$ تساوي 2 تمر المستقيمات بنقطة؛ وإذا زادت رتبة $A^*$ فلا نقطة مشتركة: تشكّل مثلثًا أو يكون اثنان منها متوازيين.',
            'With two unknowns, each equation is a line in the plane and a solution is a common point. The ranks say how they lie: if $A$ and $A^*$ have rank 2, the lines pass through one point; if $A^*$ has a higher rank, there is no common point: they make a triangle or two are parallel.'
        ),
        cases: [
            { title: say('Puntu batean', 'En un punto', 'في نقطة', 'At one point'), text: say('Zuzenak puntu batean ebakitzen dira.', 'Las rectas se cortan en un punto.', 'تتقاطع المستقيمات في نقطة.', 'The lines meet at one point.'), math: same('$\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$') },
            { title: say('Triangelua', 'Triángulo', 'مثلث', 'Triangle'), text: say('Bikoteka ebakitzen dira; ez dago puntu komunik.', 'Se cortan de dos en dos, sin punto común.', 'تتقاطع مثنى مثنى بلا نقطة مشتركة.', 'They cross in pairs, with no common point.'), math: same('$\\operatorname{rg}(A)=2,\\ \\operatorname{rg}(A^*)=3$') },
            { title: say('Paraleloak', 'Paralelas', 'متوازية', 'Parallel'), text: say('Norabide bera dute, baina ez dira bat egiten.', 'Tienen la misma dirección, pero no coinciden.', 'لها الاتجاه نفسه لكنها لا تنطبق.', 'They have the same direction, but do not coincide.'), math: same('$\\operatorname{rg}(A)=1,\\ \\operatorname{rg}(A^*)=2$') }
        ],
        examplePrompt: say('Ba al dute puntu komunik $x+y=1$, $x+y=4$ eta $x-y=0$ zuzenek?', '¿Tienen un punto común las rectas $x+y=1$, $x+y=4$ y $x-y=0$?', 'هل للمستقيمات $x+y=1$ و$x+y=4$ و$x-y=0$ نقطة مشتركة؟', 'Do the lines $x+y=1$, $x+y=4$ and $x-y=0$ have a common point?'),
        example: same('$|A^*|=\\begin{vmatrix}1&1&1\\\\1&1&4\\\\1&{-1}&0\\end{vmatrix}=6\\neq 0$'),
        exampleAnswer: say('Ez: $\\operatorname{rg}(A)=2$ eta $\\operatorname{rg}(A^*)=3$; lehen biak paraleloak dira.', 'No: $\\operatorname{rg}(A)=2$ y $\\operatorname{rg}(A^*)=3$; las dos primeras son paralelas.', 'لا: $\\operatorname{rg}(A)=2$ و$\\operatorname{rg}(A^*)=3$؛ والأوليان متوازيتان.', 'No: $\\operatorname{rg}(A)=2$ and $\\operatorname{rg}(A^*)=3$; the first two are parallel.')
    },

    /* ---------- 2. Cramer ---------- */
    'cramer-rule': {
        definitions: [
            { term: say('Cramerren sistema', 'Sistema de Cramer', 'نظام كرامر', 'Cramer system'), meaning: say('Ekuazioak eta ezezagunak kopuru berean, eta $|A|\\neq 0$.', 'Tantas ecuaciones como incógnitas, y $|A|\\neq 0$.', 'عدد المعادلات يساوي عدد المجاهيل، و$|A|\\neq 0$.', 'As many equations as unknowns, and $|A|\\neq 0$.') }
        ],
        vocabulary: [
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator')
        ],
        explanation: say(
            'Sistemak ekuazioak eta ezezagunak kopuru berean baditu eta $|A|\\neq 0$ bada, ezezagun bakoitza bi determinanteren zatidura da. Izendatzailea beti $|A|$ da; zenbakitzailea, berriz, $A$ matrizea, ezezagun horren zutabearen ordez gai askeak jarrita.',
            'Si el sistema tiene tantas ecuaciones como incógnitas y $|A|\\neq 0$, cada incógnita es un cociente de dos determinantes. El denominador es siempre $|A|$; el numerador es $A$ con la columna de esa incógnita sustituida por los términos independientes.',
            'إذا كان عدد المعادلات يساوي عدد المجاهيل و$|A|\\neq 0$ فكل مجهول خارج قسمة محددين. المقام دائمًا $|A|$، والبسط هو $A$ بعد استبدال عمود ذلك المجهول بالحدود الثابتة.',
            'If the system has as many equations as unknowns and $|A|\\neq 0$, each unknown is a quotient of two determinants. The denominator is always $|A|$; the numerator is $A$ with the column of that unknown replaced by the constant terms.'
        ),
        examplePrompt: say('Ebatzi Cramerren bidez $\\begin{cases}3x+y=5\\\\ x+2y=0\\end{cases}$.', 'Resuelve por Cramer $\\begin{cases}3x+y=5\\\\ x+2y=0\\end{cases}$.', 'حُلّ بطريقة كرامر $\\begin{cases}3x+y=5\\\\ x+2y=0\\end{cases}$.', 'Solve by Cramer $\\begin{cases}3x+y=5\\\\ x+2y=0\\end{cases}$.'),
        example: same('$x=\\frac{10}{5}=2\\qquad y=\\frac{-5}{5}=-1$'),
        exampleAnswer: say('$|A|=5$, $|A_x|=10$ eta $|A_y|=-5$ dira.', '$|A|=5$, $|A_x|=10$ y $|A_y|=-5$.', '$|A|=5$ و$|A_x|=10$ و$|A_y|=-5$.', '$|A|=5$, $|A_x|=10$ and $|A_y|=-5$.'),
        why: {
            text: say('Zergatik? $|A_x|$ determinantean, lehen zutabea $B$ da: $x$ aldiz $x$ ezezagunaren zutabea, gehi beste zutabeen multiploak. Multiplo horiek ez dute determinantea aldatzen, eta $x$ kanpora ateratzen da: $|A_x|=x|A|$.', '¿Por qué? En $|A_x|$ la primera columna es $B$: $x$ veces la columna de $x$ más múltiplos de las otras columnas. Esos múltiplos no cambian el determinante y la $x$ sale fuera: $|A_x|=x|A|$.', 'لماذا؟ في $|A_x|$ العمود الأول هو $B$: $x$ مرة عمود $x$ مضافًا إليه مضاعفات الأعمدة الأخرى. وهذه المضاعفات لا تغيّر المحدد، ويخرج $x$: $|A_x|=x|A|$.', 'Why? In $|A_x|$ the first column is $B$: $x$ times the column of $x$ plus multiples of the other columns. Those multiples do not change the determinant and the $x$ comes out: $|A_x|=x|A|$.')
        }
    },
    'cramer-indeterminate': {
        definitions: [
            { term: say('Ezezagun askea', 'Incógnita libre', 'المجهول الحر', 'Free unknown'), meaning: say('Edozein balio har dezakeen ezezaguna; $\\lambda$ deitzen zaio.', 'Una incógnita que puede tomar cualquier valor; se llama $\\lambda$.', 'مجهول يأخذ أي قيمة؛ يُسمى $\\lambda$.', 'An unknown that can take any value; it is called $\\lambda$.') }
        ],
        vocabulary: [
            say('bigarren atala', 'segundo miembro', 'الطرف الثاني', 'right-hand side'),
            say('menore ez-nulua', 'menor no nulo', 'المحدد الأصغر غير الصفري', 'non-zero minor')
        ],
        explanation: say(
            'Sistema bateragarri indeterminatua denean, menore ez-nuluarekin lan egiten da: soberan dauden ekuazioak kentzen dira, eta menorean ez dauden ezezagunak bigarren atalera pasatzen dira, $\\lambda$ izenarekin. Geratzen dena Cramerren sistema bat da.',
            'Cuando el sistema es compatible indeterminado, se trabaja con el menor no nulo: se quitan las ecuaciones que sobran y las incógnitas que no están en el menor pasan al segundo miembro con el nombre $\\lambda$. Lo que queda es un sistema de Cramer.',
            'عندما يكون النظام متوافقًا غير محدد نعمل بالمحدد الأصغر غير الصفري: نحذف المعادلات الزائدة، وننقل المجاهيل التي ليست في المحدد الأصغر إلى الطرف الثاني باسم $\\lambda$. وما يبقى نظام كرامر.',
            'When the system is consistent and dependent, work with the non-zero minor: drop the spare equations, and the unknowns that are not in the minor go to the right-hand side with the name $\\lambda$. What is left is a Cramer system.'
        ),
        examplePrompt: say('Ebatzi $\\begin{cases}x+y-z=1\\\\ y+z=3\\end{cases}$.', 'Resuelve $\\begin{cases}x+y-z=1\\\\ y+z=3\\end{cases}$.', 'حُلّ $\\begin{cases}x+y-z=1\\\\ y+z=3\\end{cases}$.', 'Solve $\\begin{cases}x+y-z=1\\\\ y+z=3\\end{cases}$.'),
        example: same('$x=-2+2\\lambda\\qquad y=3-\\lambda\\qquad z=\\lambda$'),
        exampleAnswer: say('$\\begin{vmatrix}1&1\\\\0&1\\end{vmatrix}=1\\neq 0$: $x$ eta $y$ ezezagunena da; hirugarrena librea da.', '$\\begin{vmatrix}1&1\\\\0&1\\end{vmatrix}=1\\neq 0$: es el de $x$ e $y$; la tercera incógnita es libre.', '$\\begin{vmatrix}1&1\\\\0&1\\end{vmatrix}=1\\neq 0$: هو محدد $x$ و$y$؛ والمجهول الثالث حر.', '$\\begin{vmatrix}1&1\\\\0&1\\end{vmatrix}=1\\neq 0$: it is that of $x$ and $y$; the third unknown is free.')
    },
    'inverse-solve': {
        definitions: [
            { term: say('Alderantzizko matrizea', 'Matriz inversa', 'المصفوفة المعكوسة', 'Inverse matrix'), meaning: say('$A^{-1}$ matrizea, $AA^{-1}=I$ betetzen duena; $|A|\\neq 0$ denean dago.', 'La matriz $A^{-1}$ con $AA^{-1}=I$; existe si $|A|\\neq 0$.', 'المصفوفة $A^{-1}$ التي تحقق $AA^{-1}=I$؛ توجد إذا كان $|A|\\neq 0$.', 'The matrix $A^{-1}$ with $AA^{-1}=I$; it exists if $|A|\\neq 0$.') }
        ],
        vocabulary: [
            say('ezkerretik', 'por la izquierda', 'من اليسار', 'on the left'),
            say('biderkadura', 'producto', 'جداء', 'product')
        ],
        explanation: say(
            '$|A|\\neq 0$ duen sistema bat $AX=B$ matrize-ekuazioa da. Ezkerretik $A^{-1}$ matrizeaz biderkatuta, $X=A^{-1}B$ geratzen da: soluzioa biderkadura batetik ateratzen da. Komeni da $A$ bera duten sistema batzuk ebatzi behar direnean.',
            'Un sistema con $|A|\\neq 0$ es la ecuación matricial $AX=B$. Multiplicando por $A^{-1}$ por la izquierda queda $X=A^{-1}B$: la solución sale de un producto. Conviene cuando hay que resolver varios sistemas con la misma $A$.',
            'النظام الذي فيه $|A|\\neq 0$ هو المعادلة المصفوفية $AX=B$. وبالضرب في $A^{-1}$ من اليسار يبقى $X=A^{-1}B$: يخرج الحل من جداء. وهذا مفيد عند حل عدة أنظمة لها $A$ نفسها.',
            'A system with $|A|\\neq 0$ is the matrix equation $AX=B$. Multiplying by $A^{-1}$ on the left leaves $X=A^{-1}B$: the solution comes from a product. It helps when several systems with the same $A$ have to be solved.'
        ),
        examplePrompt: say('Ebatzi $AX=B$, $A=\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}$ eta $B=\\begin{pmatrix}4\\\\7\\end{pmatrix}$ izanik.', 'Resuelve $AX=B$ con $A=\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}$ y $B=\\begin{pmatrix}4\\\\7\\end{pmatrix}$.', 'حُلّ $AX=B$ مع $A=\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}$ و$B=\\begin{pmatrix}4\\\\7\\end{pmatrix}$.', 'Solve $AX=B$ with $A=\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}$ and $B=\\begin{pmatrix}4\\\\7\\end{pmatrix}$.'),
        example: same('$X=A^{-1}B=\\begin{pmatrix}1\\\\3\\end{pmatrix}$'),
        exampleAnswer: say('$A^{-1}=\\begin{pmatrix}2&{-1}\\\\{-1}&1\\end{pmatrix}$; beraz, $x=1$ eta $y=3$.', '$A^{-1}=\\begin{pmatrix}2&{-1}\\\\{-1}&1\\end{pmatrix}$, así que $x=1$ e $y=3$.', '$A^{-1}=\\begin{pmatrix}2&{-1}\\\\{-1}&1\\end{pmatrix}$، إذن $x=1$ و$y=3$.', '$A^{-1}=\\begin{pmatrix}2&{-1}\\\\{-1}&1\\end{pmatrix}$, so $x=1$ and $y=3$.')
    },

    /* ---------- 3. Homogeneous systems ---------- */
    'homogeneous-trivial': {
        definitions: [
            { term: say('Sistema homogeneoa', 'Sistema homogéneo', 'النظام المتجانس', 'Homogeneous system'), meaning: say('Gai aske guztiak 0 dituen sistema.', 'Un sistema con todos los términos independientes iguales a 0.', 'نظام كل حدوده الثابتة أصفار.', 'A system whose constant terms are all 0.') },
            { term: say('Soluzio tribiala', 'Solución trivial', 'الحل البديهي', 'Trivial solution'), meaning: say('Ezezagun guztiak 0 dituen soluzioa.', 'La solución con todas las incógnitas iguales a 0.', 'الحل الذي كل مجاهيله أصفار.', 'The solution with every unknown equal to 0.') }
        ],
        vocabulary: [
            say('infinitu', 'infinitas', 'لا نهائية', 'infinitely many'),
            say('bakarra', 'única', 'الوحيد', 'only')
        ],
        explanation: say(
            'Sistema bat homogeneoa da gai aske guztiak 0 badira. Ez da inoiz bateraezina: $x=y=z=0$ beti da soluzioa, tribiala. Galdera da ea gehiago dauden: $|A|\\neq 0$ bada, tribiala da bakarra; $|A|=0$ bada, infinitu daude.',
            'Un sistema es homogéneo si todos sus términos independientes son 0. Nunca es incompatible: $x=y=z=0$ siempre es solución, la trivial. La pregunta es si hay más: si $|A|\\neq 0$, la trivial es la única; si $|A|=0$, hay infinitas.',
            'يكون النظام متجانسًا إذا كانت كل حدوده الثابتة أصفارًا. ولا يكون غير متوافق أبدًا: $x=y=z=0$ حل دائمًا، وهو البديهي. والسؤال هل توجد حلول أخرى: إذا كان $|A|\\neq 0$ فالبديهي هو الوحيد؛ وإذا كان $|A|=0$ فالحلول لا نهائية.',
            'A system is homogeneous if all its constant terms are 0. It is never inconsistent: $x=y=z=0$ is always a solution, the trivial one. The question is whether there are more: if $|A|\\neq 0$, the trivial one is the only one; if $|A|=0$, there are infinitely many.'
        ),
        examplePrompt: say('Ba al ditu soluzio ez-tribialak $\\begin{cases}x+2y=0\\\\ 3x+6y=0\\end{cases}$ sistemak?', '¿Tiene soluciones no triviales $\\begin{cases}x+2y=0\\\\ 3x+6y=0\\end{cases}$?', 'هل لـ $\\begin{cases}x+2y=0\\\\ 3x+6y=0\\end{cases}$ حلول غير بديهية؟', 'Does $\\begin{cases}x+2y=0\\\\ 3x+6y=0\\end{cases}$ have non-trivial solutions?'),
        example: same('$|A|=6-6=0$'),
        exampleAnswer: say('Bai, infinitu: $x=-2\\lambda$, $y=\\lambda$.', 'Sí, infinitas: $x=-2\\lambda$, $y=\\lambda$.', 'نعم، لا نهائية: $x=-2\\lambda$، $y=\\lambda$.', 'Yes, infinitely many: $x=-2\\lambda$, $y=\\lambda$.'),
        why: {
            text: say('Zergatik ez da inoiz bateraezina? $A^*$ matrizearen azken zutabea zeroz beteta dago, eta zeroko zutabe batek ezin du heina igo: $\\operatorname{rg}(A^*)=\\operatorname{rg}(A)$.', '¿Por qué nunca es incompatible? En $A^*$ la última columna es de ceros, y una columna de ceros no puede subir el rango: $\\operatorname{rg}(A^*)=\\operatorname{rg}(A)$.', 'لماذا لا يكون غير متوافق أبدًا؟ العمود الأخير في $A^*$ أصفار، وعمود الأصفار لا يرفع الرتبة: $\\operatorname{rg}(A^*)=\\operatorname{rg}(A)$.', 'Why is it never inconsistent? In $A^*$ the last column is all zeros, and a column of zeros cannot raise the rank: $\\operatorname{rg}(A^*)=\\operatorname{rg}(A)$.')
        }
    },
    'homogeneous-parameter': {
        definitions: [
            { term: say('Soluzio ez-tribiala', 'Solución no trivial', 'الحل غير البديهي', 'Non-trivial solution'), meaning: say('Ezezagunen bat 0 ez duen soluzioa.', 'Una solución con alguna incógnita distinta de 0.', 'حل فيه مجهول واحد على الأقل غير صفري.', 'A solution with some unknown other than 0.') }
        ],
        vocabulary: [
            say('erroak', 'raíces', 'الجذور', 'roots'),
            say('zerora berdindu', 'igualar a cero', 'المساواة بالصفر', 'set equal to zero')
        ],
        explanation: say(
            'Sistema homogeneo karratu batek tribiala ez beste soluziorik du, $|A|=0$ denean hain zuzen. Parametro batekin: kalkulatu $|A|$ eta berdindu zerora. Erro horiek infinitu soluzio ematen dituzte; beste balioek, tribiala bakarrik.',
            'Un homogéneo cuadrado tiene soluciones distintas de la trivial justo cuando $|A|=0$. Con un parámetro: calcula $|A|$ e iguálalo a cero. Esas raíces dan infinitas soluciones; los demás valores, solo la trivial.',
            'للنظام المتجانس المربع حلول غير البديهي عندما يكون $|A|=0$ بالضبط. ومع وسيط: احسب $|A|$ وساوِه بالصفر. تلك الجذور تعطي حلولًا لا نهائية، والقيم الأخرى تعطي البديهي فقط.',
            'A square homogeneous system has solutions other than the trivial one exactly when $|A|=0$. With a parameter: work out $|A|$ and set it equal to zero. Those roots give infinitely many solutions; the other values, only the trivial one.'
        ),
        examplePrompt: say('Zein $m$ baliotarako ditu soluzio ez-tribialak $\\begin{cases}mx+4y=0\\\\ x+my=0\\end{cases}$ sistemak?', '¿Para qué $m$ tiene soluciones no triviales $\\begin{cases}mx+4y=0\\\\ x+my=0\\end{cases}$?', 'لأي $m$ يكون لـ $\\begin{cases}mx+4y=0\\\\ x+my=0\\end{cases}$ حلول غير بديهية؟', 'For which $m$ does $\\begin{cases}mx+4y=0\\\\ x+my=0\\end{cases}$ have non-trivial solutions?'),
        example: same('$m^2-4=0\\ \\to\\ m=2,\\ m=-2$'),
        exampleAnswer: say('Bi erro: $m=2$ eta $m=-2$.', 'Dos raíces: $m=2$ y $m=-2$.', 'جذران: $m=2$ و$m=-2$.', 'Two roots: $m=2$ and $m=-2$.')
    },

    /* ---------- 4. Discussing with a parameter ---------- */
    'parameter-determinant': {
        definitions: [
            { term: say('Balio kritikoa', 'Valor crítico', 'القيمة الحرجة', 'Critical value'), meaning: say('$|A|$ anulatzen duen parametroaren balioa.', 'Un valor del parámetro que anula $|A|$.', 'قيمة الوسيط التي تعدم $|A|$.', 'A value of the parameter that makes $|A|$ zero.') }
        ],
        vocabulary: [
            say('eztabaidatu', 'discutir', 'ناقش', 'discuss'),
            say('polinomioa', 'polinomio', 'كثير الحدود', 'polynomial')
        ],
        explanation: say(
            'Sistema bat eztabaidatzea parametroaren balio bakoitzerako zer motatakoa den esatea da. Ekuazioak eta ezezagunak kopuru berean badaude, $|A|$ kalkulatzen da lehenik: parametroaren polinomio bat da, eta haren erroak dira sistema bateragarri determinatua ez izateko balio bakarrak.',
            'Discutir un sistema es decir de qué tipo es para cada valor del parámetro. Con tantas ecuaciones como incógnitas se empieza por $|A|$: es un polinomio en el parámetro, y sus raíces son los únicos valores en que el sistema puede no ser compatible determinado.',
            'مناقشة نظام هي قول نوعه لكل قيمة من قيم الوسيط. وعندما يتساوى عدد المعادلات والمجاهيل نبدأ بـ $|A|$: إنه كثير حدود في الوسيط، وجذوره هي القيم الوحيدة التي قد لا يكون فيها النظام متوافقًا محددًا.',
            'To discuss a system is to say what type it is for each value of the parameter. With as many equations as unknowns, start with $|A|$: it is a polynomial in the parameter, and its roots are the only values where the system may not be consistent and independent.'
        ),
        examplePrompt: say('Zein $m$ baliotarako da bateragarri determinatua $\\begin{cases}mx+3y=2\\\\ 3x+my=1\\end{cases}$?', '¿Para qué $m$ es compatible determinado $\\begin{cases}mx+3y=2\\\\ 3x+my=1\\end{cases}$?', 'لأي $m$ يكون $\\begin{cases}mx+3y=2\\\\ 3x+my=1\\end{cases}$ متوافقًا محددًا؟', 'For which $m$ is $\\begin{cases}mx+3y=2\\\\ 3x+my=1\\end{cases}$ consistent and independent?'),
        example: same('$m^2-9\\neq 0\\ \\to\\ m\\neq 3,\\ m\\neq -3$'),
        exampleAnswer: say('$3$ eta $-3$ dira balio kritikoak; gainerakoetan, soluzio bakarra.', 'Los valores críticos son $3$ y $-3$; en los demás, una sola solución.', 'القيمتان الحرجتان $3$ و$-3$؛ وفي الباقي حل واحد.', 'The critical values are $3$ and $-3$; for the rest, one solution.'),
        why: {
            text: say('Zergatik erroak bakarrik? $|A|\\neq 0$ bada, $\\operatorname{rg}(A)=n$ da, eta $A^*$ matrizeak, $n$ errenkadarekin, ezin du gehiago izan: bi heinak $n$ dira.', '¿Por qué solo las raíces? Si $|A|\\neq 0$, $\\operatorname{rg}(A)=n$ y $A^*$, con $n$ filas, no puede tener más: los dos rangos valen $n$.', 'لماذا الجذور فقط؟ إذا كان $|A|\\neq 0$ فإن $\\operatorname{rg}(A)=n$، و$A^*$ ذات $n$ صفوف لا يمكن أن تزيد: الرتبتان $n$.', 'Why only the roots? If $|A|\\neq 0$, $\\operatorname{rg}(A)=n$ and $A^*$, with $n$ rows, cannot have more: both ranks are $n$.')
        }
    },
    'parameter-ranks': {
        definitions: [
            { term: say('Sistema baten eztabaida', 'Discusión de un sistema', 'مناقشة نظام', 'Discussing a system'), meaning: say('Parametroaren balio bakoitzerako sistema mota esatea.', 'Decir el tipo de sistema para cada valor del parámetro.', 'قول نوع النظام لكل قيمة للوسيط.', 'Saying the type of the system for each value of the parameter.') }
        ],
        vocabulary: [
            say('orlatu', 'orlar', 'التطويق', 'border'),
            say('ordeztu', 'sustituye', 'عوّض', 'substitute')
        ],
        explanation: say(
            'Balio kritiko bakoitzean, ordeztu parametroa eta kalkulatu bi heinak menoreekin: $A$ matrizearen menore ez-nulu bat, eta, hura $B$ zutabearekin orlatuta, $A^*$ matrizearena. Berdinak badira, bateragarri indeterminatua; desberdinak badira, bateraezina.',
            'En cada valor crítico, sustituye el parámetro y calcula los dos rangos con menores: un menor no nulo de $A$ y, orlándolo con la columna $B$, el de $A^*$. Iguales: compatible indeterminado; distintos: incompatible.',
            'عند كل قيمة حرجة عوّض الوسيط واحسب الرتبتين بالمحددات الصغرى: محدد أصغر غير صفري من $A$، وبتطويقه بالعمود $B$ رتبة $A^*$. متساويتان: متوافق غير محدد؛ مختلفتان: غير متوافق.',
            'At each critical value, substitute the parameter and find both ranks with minors: a non-zero minor of $A$ and, bordering it with the column $B$, that of $A^*$. Equal: consistent and dependent; different: inconsistent.'
        ),
        cases: [
            { title: say('Ez kritikoa', 'No crítico', 'غير حرجة', 'Not critical'), text: say('Bateragarri determinatua.', 'Compatible determinado.', 'متوافق محدد.', 'Consistent and independent.'), math: same('$a\\neq 1,\\ a\\neq -2$') },
            { title: say('Lehen balio kritikoa', 'Primer valor crítico', 'القيمة الحرجة الأولى', 'First critical value'), text: say('Bateragarri indeterminatua, bi parametrorekin.', 'Compatible indeterminado, con dos parámetros.', 'متوافق غير محدد بوسيطين.', 'Consistent and dependent, with two parameters.'), math: same('$a=1$') },
            { title: say('Bigarren balio kritikoa', 'Segundo valor crítico', 'القيمة الحرجة الثانية', 'Second critical value'), text: say('Bateraezina.', 'Incompatible.', 'غير متوافق.', 'Inconsistent.'), math: same('$a=-2$') }
        ],
        examplePrompt: say('$\\begin{cases}x+y=1\\\\ 2x+my=3\\end{cases}$ sisteman, zer gertatzen da $m=2$ denean?', 'En $\\begin{cases}x+y=1\\\\ 2x+my=3\\end{cases}$, ¿qué pasa si $m=2$?', 'في $\\begin{cases}x+y=1\\\\ 2x+my=3\\end{cases}$، ماذا يحدث إذا كان $m=2$؟', 'In $\\begin{cases}x+y=1\\\\ 2x+my=3\\end{cases}$, what happens if $m=2$?'),
        example: same('$\\begin{vmatrix}1&1\\\\2&3\\end{vmatrix}=1\\neq 0$'),
        exampleAnswer: say('$\\operatorname{rg}(A)=1\\neq\\operatorname{rg}(A^*)=2$: bateraezina.', '$\\operatorname{rg}(A)=1\\neq\\operatorname{rg}(A^*)=2$: incompatible.', '$\\operatorname{rg}(A)=1\\neq\\operatorname{rg}(A^*)=2$: غير متوافق.', '$\\operatorname{rg}(A)=1\\neq\\operatorname{rg}(A^*)=2$: inconsistent.')
    },
    'parameter-solve': {
        definitions: [
            { term: say('Parametroaren araberako soluzioa', 'Solución en función del parámetro', 'الحل بدلالة الوسيط', 'Solution in terms of the parameter'), meaning: say('Parametroa barruan duten adierazpenak ezezagun bakoitzerako.', 'Expresiones con el parámetro dentro para cada incógnita.', 'عبارات فيها الوسيط لكل مجهول.', 'Expressions with the parameter inside, one for each unknown.') }
        ],
        vocabulary: [
            say('sinplifikatu', 'simplifica', 'بسّط', 'simplify'),
            say('faktoreak', 'factores', 'العوامل', 'factors')
        ],
        explanation: say(
            'Kasu bateragarri determinatuan, Cramerrek soluzioa ematen du parametroaren arabera. $|A|$ determinantearen faktoreez zatituz sinplifikatzen da: hor ez dira 0. Kasu indeterminatuetan, $\\lambda$ parametroarekin ebazten da.',
            'En el caso compatible determinado, Cramer da la solución en función del parámetro. Se simplifica dividiendo entre los factores de $|A|$, que ahí no son 0. En los casos indeterminados se resuelve con $\\lambda$.',
            'في حالة المتوافق المحدد يعطي كرامر الحل بدلالة الوسيط. ويُبسَّط بالقسمة على عوامل $|A|$، فهي ليست أصفارًا هناك. وفي الحالات غير المحددة يُحل بـ $\\lambda$.',
            'In the consistent independent case, Cramer gives the solution in terms of the parameter. Simplify by dividing by the factors of $|A|$, which are not 0 there. In the dependent cases, solve with $\\lambda$.'
        ),
        examplePrompt: say('Ebatzi $\\begin{cases}x+y=1\\\\ x+my=2\\end{cases}$, $m\\neq 1$ denean.', 'Resuelve $\\begin{cases}x+y=1\\\\ x+my=2\\end{cases}$ para $m\\neq 1$.', 'حُلّ $\\begin{cases}x+y=1\\\\ x+my=2\\end{cases}$ عندما $m\\neq 1$.', 'Solve $\\begin{cases}x+y=1\\\\ x+my=2\\end{cases}$ for $m\\neq 1$.'),
        example: same('$x=\\frac{m-2}{m-1}\\qquad y=\\frac{1}{m-1}$'),
        exampleAnswer: say('Adibidez, $m=3$ denean, $x=\\frac{1}{2}$ eta $y=\\frac{1}{2}$.', 'Por ejemplo, con $m=3$, $x=\\frac{1}{2}$ e $y=\\frac{1}{2}$.', 'مثلًا مع $m=3$: $x=\\frac{1}{2}$ و$y=\\frac{1}{2}$.', 'For example, with $m=3$, $x=\\frac{1}{2}$ and $y=\\frac{1}{2}$.')
    },

    /* ---------- 5. Problems ---------- */
    'extra-equations': {
        definitions: [
            { term: say('Soberako ekuazioa', 'Ecuación que sobra', 'المعادلة الزائدة', 'Spare equation'), meaning: say('Besteen konbinazioa den ekuazioa: kendu daiteke soluzioak aldatu gabe.', 'La que es combinación de las otras: se puede quitar sin cambiar las soluciones.', 'معادلة هي تركيب من غيرها: يمكن حذفها دون تغيير الحلول.', 'One that is a combination of the others: it can be dropped without changing the solutions.') }
        ],
        vocabulary: [
            say('karratua', 'cuadrada', 'مربعة', 'square'),
            say('zutabe kopurua', 'número de columnas', 'عدد الأعمدة', 'number of columns')
        ],
        explanation: say(
            'Ezezagunak baino ekuazio gehiago daudenean, $A$ ez da karratua: haren heina, gehienez, ezezagun kopurua da. $A^*$ karratua bada, haren determinanteak erabakitzen du: $|A^*|\\neq 0$ bada, sistema bateraezina da.',
            'Con más ecuaciones que incógnitas, $A$ no es cuadrada: su rango es como mucho el número de incógnitas. Si $A^*$ es cuadrada, decide su determinante: si $|A^*|\\neq 0$, el sistema es incompatible.',
            'عندما تزيد المعادلات على المجاهيل لا تكون $A$ مربعة: رتبتها على الأكثر عدد المجاهيل. وإذا كانت $A^*$ مربعة فمحددها يقرر: إذا كان $|A^*|\\neq 0$ فالنظام غير متوافق.',
            'With more equations than unknowns, $A$ is not square: its rank is at most the number of unknowns. If $A^*$ is square, its determinant decides: if $|A^*|\\neq 0$, the system is inconsistent.'
        ),
        examplePrompt: say('Zein $a$ baliotarako da bateragarria $\\begin{cases}x+y=3\\\\ x-y=1\\\\ x+2y=a\\end{cases}$?', '¿Para qué $a$ es compatible $\\begin{cases}x+y=3\\\\ x-y=1\\\\ x+2y=a\\end{cases}$?', 'لأي $a$ يكون $\\begin{cases}x+y=3\\\\ x-y=1\\\\ x+2y=a\\end{cases}$ متوافقًا؟', 'For which $a$ is $\\begin{cases}x+y=3\\\\ x-y=1\\\\ x+2y=a\\end{cases}$ consistent?'),
        example: same('$x=2,\\ y=1\\ \\to\\ a=2+2\\cdot 1=4$'),
        exampleAnswer: say('$a=4$ denean bakarrik: orduan hirugarren ekuazioa soberan dago.', 'Solo con $a=4$: entonces la tercera ecuación sobra.', 'فقط مع $a=4$: عندها تكون المعادلة الثالثة زائدة.', 'Only with $a=4$: then the third equation is spare.')
    },
    'word-problems': {
        definitions: [
            { term: say('Problema bat planteatzea', 'Plantear un problema', 'صياغة مسألة', 'Setting up a problem'), meaning: say('Ezezagunak aukeratzea eta datu bakoitzeko ekuazio bat idaztea.', 'Elegir las incógnitas y escribir una ecuación por cada dato.', 'اختيار المجاهيل وكتابة معادلة لكل معطى.', 'Choosing the unknowns and writing one equation for each piece of data.') }
        ],
        vocabulary: [
            say('datua', 'dato', 'المعطى', 'data'),
            say('egiaztatu', 'comprueba', 'تحقق', 'check')
        ],
        explanation: say(
            'Problema batean, ezezagun bat aukeratzen da kopuru ezezagun bakoitzeko, eta ekuazio bat idazten da datu bakoitzeko. Rouchék esaten du soluziorik dagoen, eta Cramerrek kalkulatzen du. Amaieran, egiaztatu soluzioak zentzua duela: kopuru negatiboak edo hamartarrak ez dira beti onargarriak.',
            'En un problema se elige una incógnita por cada cantidad desconocida y se escribe una ecuación por cada dato. Rouché dice si hay solución y Cramer la calcula. Al final, comprueba que la solución tiene sentido: cantidades negativas o decimales no siempre valen.',
            'في المسألة نختار مجهولًا لكل كمية مجهولة ونكتب معادلة لكل معطى. يقول روشيه هل يوجد حل، ويحسبه كرامر. وفي النهاية تحقق أن للحل معنى: الكميات السالبة أو العشرية لا تصلح دائمًا.',
            'In a problem, choose one unknown for each unknown amount and write one equation for each piece of data. Rouché says whether there is a solution and Cramer works it out. At the end, check that the solution makes sense: negative or decimal amounts do not always work.'
        ),
        examplePrompt: say('Hiru zenbakiren batura 12 da. Lehena beste bien batura da, eta hirugarrena bigarrenaren bikoitza. Zein dira?', 'Tres números suman 12. El primero es la suma de los otros dos y el tercero es el doble del segundo. ¿Cuáles son?', 'مجموع ثلاثة أعداد 12. الأول مجموع الآخرين، والثالث ضعف الثاني. ما هي؟', 'Three numbers add up to 12. The first is the sum of the other two and the third is twice the second. What are they?'),
        example: same('$\\begin{cases}x+y+z=12\\\\ x-y-z=0\\\\ 2y-z=0\\end{cases}$'),
        exampleAnswer: say('Zenbakiak 6, 2 eta 4 dira; 12 batzen dute.', 'Los números son 6, 2 y 4: suman 12.', 'الأعداد 6 و2 و4: مجموعها 12.', 'The numbers are 6, 2 and 4: they add up to 12.')
    },
    'parameter-problems': {
        definitions: [
            { term: say('Soluzio emana', 'Solución dada', 'الحل المعطى', 'Given solution'), meaning: say('Enuntziatuak ematen duen hirukotea; ekuazio guztiak bete behar ditu.', 'Una terna que da el enunciado; tiene que cumplir todas las ecuaciones.', 'ثلاثية يعطيها نص المسألة؛ يجب أن تحقق كل المعادلات.', 'A triple that the statement gives; it has to satisfy every equation.') }
        ],
        vocabulary: [
            say('hirukotea', 'terna', 'الثلاثية', 'triple'),
            say('baldintza', 'condición', 'الشرط', 'condition')
        ],
        explanation: say(
            'Soluzio bat ematen bada, ordeztu egiten da: ekuazio bakoitzak baldintza bat ematen du parametroaren gainean, eta denek balio bera eman behar dute. Gero, $|A|$ determinanteak esaten du soluzio hori bakarra den.',
            'Si se da una solución, se sustituye: cada ecuación da una condición sobre el parámetro, y todas deben dar el mismo valor. Después, $|A|$ dice si esa solución es la única.',
            'إذا أُعطي حل فإنه يُعوَّض: كل معادلة تعطي شرطًا على الوسيط، ويجب أن تعطي كلها القيمة نفسها. ثم يقول $|A|$ هل هذا الحل هو الوحيد.',
            'If a solution is given, substitute it: each equation gives a condition on the parameter, and they must all give the same value. Then $|A|$ says whether that solution is the only one.'
        ),
        examplePrompt: say('Zein $m$ baliotarako da $(2,1)$ $\\begin{cases}x+my=5\\\\ mx-y=5\\end{cases}$ sistemaren soluzioa?', '¿Para qué $m$ es $(2,1)$ solución de $\\begin{cases}x+my=5\\\\ mx-y=5\\end{cases}$?', 'لأي $m$ يكون $(2,1)$ حلًّا لـ $\\begin{cases}x+my=5\\\\ mx-y=5\\end{cases}$؟', 'For which $m$ is $(2,1)$ a solution of $\\begin{cases}x+my=5\\\\ mx-y=5\\end{cases}$?'),
        example: same('$2+m=5\\ \\to\\ m=3$'),
        exampleAnswer: say('$m=3$ denean, bigarrena ere betetzen da: $6-1=5$.', 'Con $m=3$ también se cumple la segunda: $6-1=5$.', 'مع $m=3$ تتحقق الثانية أيضًا: $6-1=5$.', 'With $m=3$ the second also holds: $6-1=5$.')
    }
}
