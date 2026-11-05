import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'
import type { SequencesTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Segidak · 3. DBH — what each lesson tells: the new words (definitions),
   the key words in four languages (vocabulary), a short explanation, its
   cases, the example as an exercise («Another example») and, in three
   lessons, «Why does it work?» (the reversed sum, the shifted sum, r^n
   shrinking). Plain data so the tests can import it; lessons.tsx merges it
   into the topics. The explanations use the numbers of their drawings (the
   squares of sticks 4, 7, 10 and aₙ = 3n + 1, the jumps 3, 7, 11, 15, 19,
   2 + 4 + … + 12, the ball 160, 80, 40, the halves of a square); the
   example uses numbers of its own. No text command inside the formulas
   (the unit test forbids it). Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const sequencesLessonTexts: Record<SequencesTopicId, LessonTexts> = {
    terms: {
        definitions: [
            {
                term: say('Segida', 'Sucesión', 'المتتالية', 'Sequence'),
                meaning: say('Ordena jakin batean idatzitako zenbaki-zerrenda: $a_{1},\\,a_{2},\\,a_{3},\\ldots$ Zenbaki bakoitza gai bat da.', 'Una lista de números escritos en un orden: $a_{1},\\,a_{2},\\,a_{3},\\ldots$ Cada número es un término.', 'قائمة أعداد مكتوبة بترتيب معيّن: $a_{1},\\,a_{2},\\,a_{3},\\ldots$ وكل عدد حدّ.', 'A list of numbers written in an order: $a_{1},\\,a_{2},\\,a_{3},\\ldots$ Each number is a term.')
            }
        ],
        vocabulary: [
            say('azpiindizea', 'subíndice', 'الدليل السفلي', 'subscript'),
            say('lekua', 'lugar', 'الرتبة', 'place'),
            say('araua', 'regla', 'القاعدة', 'rule')
        ],
        explanation: say(
            'Azpiindizeak gai bakoitzaren lekua adierazten du: $a_{5}$ bosgarren gaia da. Askotan gaiek arau bat jarraitzen dute: makilen karratuetan, $4,\\,7,\\,10,\\ldots$, gai bakoitza aurrekoa gehi 3 da. Lekua eta balioa ez dira gauza bera: $a_{3}=10$ hirugarren gaia da, eta 10 balio du.',
            'El subíndice indica el lugar de cada término: $a_{5}$ es el quinto. Muchas veces los términos siguen una regla: en los cuadrados de palillos, $4,\\,7,\\,10,\\ldots$, cada término es el anterior más 3. Lugar y valor no son lo mismo: $a_{3}=10$ es el tercer término, que vale 10.',
            'يدل الدليل السفلي على رتبة كل حد: $a_{5}$ هو الحد الخامس. وكثيرًا ما تتبع الحدود قاعدة: في مربعات العيدان $4,\\,7,\\,10,\\ldots$ كل حد هو السابق زائد 3. والرتبة غير القيمة: $a_{3}=10$ هو الحد الثالث وقيمته 10.',
            'The subscript gives the place of each term: $a_{5}$ is the fifth. Terms often follow a rule: in the squares of sticks, $4,\\,7,\\,10,\\ldots$, each term is the previous one plus 3. Place and value are not the same: $a_{3}=10$ is the third term, and it is worth 10.'
        ),
        examplePrompt: say('$1,\\,4,\\,9,\\,16,\\ldots$ segidan, zein da araua eta zenbat balio du $a_{7}$ gaiak?', 'En $1,\\,4,\\,9,\\,16,\\ldots$, ¿cuál es la regla y cuánto vale $a_{7}$?', 'في $1,\\,4,\\,9,\\,16,\\ldots$ ما القاعدة وكم يساوي $a_{7}$؟', 'In $1,\\,4,\\,9,\\,16,\\ldots$, what is the rule and what is $a_{7}$?'),
        example: same('$1^{2},\\,2^{2},\\,3^{2},\\,4^{2},\\ldots\\ \\to\\ a_{7}=7^{2}=49$'),
        exampleAnswer: say('Gaiak bere lekuaren karratuak dira: $a_{7}=49$.', 'Los términos son los cuadrados de su lugar: $a_{7}=49$.', 'الحدود هي مربعات رتبها: $a_{7}=49$.', 'The terms are the squares of their places: $a_{7}=49$.')
    },
    'general-term': {
        definitions: [
            {
                term: say('Gai orokorra', 'Término general', 'الحد العام', 'General term'),
                meaning: say('$a_{n}$ formula: $n$ lekuan dagoen gaia ematen duena.', 'La fórmula $a_{n}$ que da el término que ocupa el lugar $n$.', 'الصيغة $a_{n}$ التي تعطي الحد في الرتبة $n$.', 'The formula $a_{n}$ that gives the term in place $n$.')
            }
        ],
        vocabulary: [
            say('ordezkatu', 'sustituir', 'عوّض', 'substitute'),
            say('lekua', 'lugar', 'الرتبة', 'place'),
            say('zenbaki naturala', 'número natural', 'عدد طبيعي', 'natural number')
        ],
        explanation: say(
            'Makilen karratuetan $a_{n}=3n+1$ da: 1. karratuak 4 makila ditu, eta hamargarrenak $a_{10}=31$. Formularekin ez dago gai guztiak idatzi beharrik: ordezkatu lekua. $n$ lekua zenbaki naturala da beti: zatiki bat ateratzen bada, balio hori ez dago segidan.',
            'En los cuadrados de palillos, $a_{n}=3n+1$: el cuadrado 1 lleva 4 palillos y el 10, $a_{10}=31$. Con la fórmula no hace falta escribir todos los términos: sustituye el lugar. El lugar $n$ siempre es un número natural: si sale una fracción, ese valor no está en la sucesión.',
            'في مربعات العيدان $a_{n}=3n+1$: المربع 1 فيه 4 عيدان والمربع 10 فيه $a_{10}=31$. وبالصيغة لا حاجة إلى كتابة كل الحدود: عوّض الرتبة. والرتبة $n$ عدد طبيعي دائمًا: إذا خرج كسر فتلك القيمة ليست في المتتالية.',
            'In the squares of sticks, $a_{n}=3n+1$: square 1 needs 4 sticks and square 10, $a_{10}=31$. With the formula you do not need to write every term: substitute the place. The place $n$ is always a natural number: if you get a fraction, that value is not in the sequence.'
        ),
        cases: [
            { title: say('Gaia kalkulatu', 'Calcular un término', 'حساب حد', 'Work out a term'), text: say('Ordezkatu $n$ lekua.', 'Sustituye el lugar $n$.', 'عوّض الرتبة $n$.', 'Substitute the position $n$.'), math: same('$a_{n}=n^{2}-1\\ \\to\\ a_{6}=35$') },
            { title: say('Lekua aurkitu', 'Hallar el lugar', 'إيجاد الرتبة', 'Find the position'), text: say('Berdindu formula balioari eta ebatzi.', 'Iguala la fórmula al valor y resuelve.', 'ساوِ الصيغة بالقيمة وحلّ.', 'Set the formula equal to the value and solve.'), math: same('$3n-2=40\\ \\to\\ n=14$') }
        ],
        examplePrompt: say('$a_{n}=4n-7$ bada, kalkulatu $a_{9}$. 50 zenbakia segidan dago?', 'Si $a_{n}=4n-7$, calcula $a_{9}$. ¿Está el 50 en la sucesión?', 'إذا كان $a_{n}=4n-7$ فاحسب $a_{9}$. هل العدد 50 في المتتالية؟', 'If $a_{n}=4n-7$, work out $a_{9}$. Is 50 in the sequence?'),
        example: same('$\\begin{gathered}a_{9}=4\\cdot 9-7=29\\\\ 4n-7=50\\ \\to\\ n=14{,}25\\end{gathered}$'),
        exampleAnswer: say('$a_{9}=29$. 50 ez dago: $n=14{,}25$ ez da naturala.', '$a_{9}=29$. El 50 no está: $n=14{,}25$ no es natural.', '$a_{9}=29$. العدد 50 ليس فيها: $n=14{,}25$ ليس طبيعيًا.', '$a_{9}=29$. 50 is not in it: $n=14{,}25$ is not natural.')
    },
    recursive: {
        definitions: [
            {
                term: say('Errepikapen-legea', 'Ley de recurrencia', 'العلاقة التراجعية', 'Recurrence rule'),
                meaning: say('Gai bakoitza aurrekoetatik ematen duen araua, $a_{n}=a_{n-1}+3$ bezala.', 'Una regla que da cada término a partir de los anteriores, como $a_{n}=a_{n-1}+3$.', 'قاعدة تعطي كل حد انطلاقًا من الحدود السابقة، مثل $a_{n}=a_{n-1}+3$.', 'A rule that gives each term from the previous ones, like $a_{n}=a_{n-1}+3$.')
            }
        ],
        vocabulary: [
            say('aurreko gaia', 'término anterior', 'الحد السابق', 'previous term'),
            say('lehen gaia', 'primer término', 'الحد الأول', 'first term'),
            say('Fibonacci', 'Fibonacci', 'فيبوناتشي', 'Fibonacci')
        ],
        explanation: say(
            'Errepikapen-lege batek ez du gaia lekutik ateratzen, aurrekoetatik baizik. Lehen gaia, edo lehen biak, eman behar dira: bestela segida ez dago zehaztuta. Fibonacciren segidan gai bakoitza aurreko bien batura da: $1,\\,1,\\,2,\\,3,\\,5,\\,8,\\,13,\\ldots$',
            'Una ley de recurrencia no saca el término de su lugar, sino de los anteriores. Hay que dar el primer término, o los dos primeros: si no, la sucesión no queda definida. En la de Fibonacci cada término es la suma de los dos anteriores: $1,\\,1,\\,2,\\,3,\\,5,\\,8,\\,13,\\ldots$',
            'العلاقة التراجعية لا تُخرج الحد من رتبته بل من الحدود السابقة. ويجب إعطاء الحد الأول أو الحدين الأولين، وإلا فالمتتالية غير محددة. وفي متتالية فيبوناتشي كل حد مجموع الحدين السابقين: $1,\\,1,\\,2,\\,3,\\,5,\\,8,\\,13,\\ldots$',
            'A recurrence rule does not get the term from its place, but from the previous ones. You must give the first term, or the first two: otherwise the sequence is not defined. In Fibonacci’s sequence each term is the sum of the two before it: $1,\\,1,\\,2,\\,3,\\,5,\\,8,\\,13,\\ldots$'
        ),
        examplePrompt: say('$a_{1}=10$ eta $a_{n}=a_{n-1}-4$ badira, idatzi lehen bost gaiak.', 'Si $a_{1}=10$ y $a_{n}=a_{n-1}-4$, escribe los cinco primeros términos.', 'إذا كان $a_{1}=10$ و$a_{n}=a_{n-1}-4$ فاكتب الحدود الخمسة الأولى.', 'If $a_{1}=10$ and $a_{n}=a_{n-1}-4$, write the first five terms.'),
        example: same('$a_{2}=10-4=6\\qquad a_{3}=6-4=2$'),
        exampleAnswer: say('$10,\\,6,\\,2,\\,-2,\\,-6$: aldi bakoitzean 4 gutxiago.', '$10,\\,6,\\,2,\\,-2,\\,-6$: cada vez 4 menos.', '$10,\\,6,\\,2,\\,-2,\\,-6$: في كل مرة أقل بـ 4.', '$10,\\,6,\\,2,\\,-2,\\,-6$: 4 less each time.')
    },
    'arith-difference': {
        definitions: [
            {
                term: say('Progresio aritmetikoa', 'Progresión aritmética', 'المتتالية الحسابية', 'Arithmetic sequence'),
                meaning: say('Gai bakoitza aurrekoa gehi zenbaki finko bat duen segida: $d$ diferentzia.', 'Una sucesión en la que cada término es el anterior más un número fijo, la diferencia $d$.', 'متتالية كل حد فيها هو السابق زائد عدد ثابت هو الفرق $d$.', 'A sequence in which each term is the previous one plus a fixed number, the difference $d$.')
            }
        ],
        vocabulary: [
            say('diferentzia', 'diferencia', 'الفرق', 'difference'),
            say('jauziak', 'saltos', 'القفزات', 'jumps'),
            say('kenketa', 'resta', 'الطرح', 'subtraction')
        ],
        explanation: say(
            'Diferentzia hurrengoa ken aurrekoa da, $d=a_{n}-a_{n-1}$: $3,\\,7,\\,11,\\,15,\\,19$ segidan, jauzi bakoitza 4 da, $d=4$. Aritmetikoa dela egiaztatzeko, egin kenketa guztiak: berdinak izan behar dute.',
            'La diferencia es el siguiente menos el anterior, $d=a_{n}-a_{n-1}$: en $3,\\,7,\\,11,\\,15,\\,19$, saltos de 4, $d=4$. Para comprobar que es aritmética, haz todas las restas: tienen que ser iguales.',
            'الفرق هو التالي ناقص السابق $d=a_{n}-a_{n-1}$: في $3,\\,7,\\,11,\\,15,\\,19$ قفزات بمقدار 4، $d=4$. وللتحقق من أنها حسابية أجرِ كل عمليات الطرح: يجب أن تتساوى.',
            'The difference is the next term minus the previous one, $d=a_{n}-a_{n-1}$: in $3,\\,7,\\,11,\\,15,\\,19$, jumps of 4, $d=4$. To check that it is arithmetic, do all the subtractions: they must be equal.'
        ),
        cases: [
            {
                title: say('Gorakorra', 'Creciente', 'متزايدة', 'Increasing'),
                text: say('$d>0$: gaiak igo egiten dira.', '$d>0$: los términos suben.', '$d>0$: الحدود تزداد.', '$d>0$: the terms go up.'),
                math: same('$3,\\,7,\\,11,\\ldots$')
            },
            {
                title: say('Beherakorra', 'Decreciente', 'متناقصة', 'Decreasing'),
                text: say('$d<0$: gaiak jaitsi egiten dira.', '$d<0$: los términos bajan.', '$d<0$: الحدود تتناقص.', '$d<0$: the terms go down.'),
                math: same('$9,\\,6,\\,3,\\ldots$')
            },
            {
                title: say('Konstantea', 'Constante', 'ثابتة', 'Constant'),
                text: say('$d=0$: gai guztiak berdinak dira.', '$d=0$: todos los términos son iguales.', '$d=0$: كل الحدود متساوية.', '$d=0$: all the terms are equal.'),
                math: same('$5,\\,5,\\,5,\\ldots$')
            }
        ],
        examplePrompt: say('Aritmetikoa da $-8,\\ -5,\\ -2,\\ 1$? Zein da hurrengo gaia?', '¿Es aritmética $-8,\\ -5,\\ -2,\\ 1$? ¿Cuál es el término siguiente?', 'هل $-8,\\ -5,\\ -2,\\ 1$ متتالية حسابية؟ ما الحد التالي؟', 'Is $-8,\\ -5,\\ -2,\\ 1$ arithmetic? What is the next term?'),
        example: same('$\\begin{gathered}-5-(-8)=3\\\\ -2-(-5)=3\\\\ 1-(-2)=3\\end{gathered}$'),
        exampleAnswer: say('Bai, $d=3$: gorakorra. Hurrengoa $1+3=4$ da.', 'Sí, $d=3$: creciente. El siguiente es $1+3=4$.', 'نعم، $d=3$: متزايدة. والتالي $1+3=4$.', 'Yes, $d=3$: increasing. The next one is $1+3=4$.')
    },
    'arith-general': {
        vocabulary: [
            say('jauziak', 'saltos', 'القفزات', 'jumps'),
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('lehen gradua', 'primer grado', 'الدرجة الأولى', 'first degree')
        ],
        explanation: say(
            '$a_{1}$ gaitik $a_{n}$ gaira $n-1$ jauzi egiten dira, bakoitza $d$ luzekoa: $a_{n}=a_{1}+(n-1)\\cdot d$. $3,\\,7,\\,11,\\ldots$ segidan, $a_{5}=3+4\\cdot 4=19$. Sinplifikatzean lehen graduko adierazpen bat ateratzen da, eta $n$ letraren koefizientea $d$ da: $a_{n}=4n-1$.',
            'Para ir de $a_{1}$ a $a_{n}$ se dan $n-1$ saltos de $d$: $a_{n}=a_{1}+(n-1)\\cdot d$. En $3,\\,7,\\,11,\\ldots$, $a_{5}=3+4\\cdot 4=19$. Al simplificar sale una expresión de primer grado, y el coeficiente de $n$ es $d$: $a_{n}=4n-1$.',
            'للانتقال من $a_{1}$ إلى $a_{n}$ نقفز $n-1$ قفزة طول كل منها $d$: $a_{n}=a_{1}+(n-1)\\cdot d$. في $3,\\,7,\\,11,\\ldots$ يكون $a_{5}=3+4\\cdot 4=19$. وعند التبسيط نحصل على عبارة من الدرجة الأولى، ومعامل $n$ هو $d$: $a_{n}=4n-1$.',
            'To go from $a_{1}$ to $a_{n}$ you make $n-1$ jumps of $d$: $a_{n}=a_{1}+(n-1)\\cdot d$. In $3,\\,7,\\,11,\\ldots$, $a_{5}=3+4\\cdot 4=19$. Simplifying gives a first-degree expression, and the coefficient of $n$ is $d$: $a_{n}=4n-1$.'
        ),
        examplePrompt: say('$a_{1}=-2$ eta $d=7$ badira, aurkitu $a_{30}$ eta gai orokorra.', 'Si $a_{1}=-2$ y $d=7$, halla $a_{30}$ y el término general.', 'إذا كان $a_{1}=-2$ و$d=7$ فجد $a_{30}$ والحد العام.', 'If $a_{1}=-2$ and $d=7$, find $a_{30}$ and the general term.'),
        example: same('$\\begin{gathered}a_{30}=-2+29\\cdot 7=201\\\\ a_{n}=7n-9\\end{gathered}$'),
        exampleAnswer: say('$a_{30}=201$ eta $a_{n}=7n-9$: 29 jauzi lehenengotik hogeita hamargarrenera.', '$a_{30}=201$ y $a_{n}=7n-9$: del primero al trigésimo hay 29 saltos.', '$a_{30}=201$ و$a_{n}=7n-9$: من الأول إلى الثلاثين 29 قفزة.', '$a_{30}=201$ and $a_{n}=7n-9$: from the first to the thirtieth there are 29 jumps.')
    },
    'arith-find': {
        vocabulary: [
            say('jauziak', 'saltos', 'القفزات', 'jumps'),
            say('lekua', 'lugar', 'الرتبة', 'place'),
            say('gai orokorra', 'término general', 'الحد العام', 'general term')
        ],
        explanation: say(
            'Bi gai ezagutzen badituzu, zenbatu haien arteko jauziak: $a_{3}$ gaitik $a_{8}$ gaira $8-3=5$ daude. Zatitu balioen kendura jauziez, eta $d$ izango duzu; gero, egin atzera $a_{1}$ gaira arte. Balio baten lekua jakiteko, berdindu gai orokorra eta askatu $n$.',
            'Si conoces dos términos, cuenta los saltos que hay entre ellos: de $a_{3}$ a $a_{8}$ hay $8-3=5$. Divide la diferencia de valores entre los saltos y tendrás $d$; después, retrocede hasta $a_{1}$. Para saber el lugar de un valor, iguala el término general y despeja $n$.',
            'إذا عرفت حدّين فعُدّ القفزات بينهما: من $a_{3}$ إلى $a_{8}$ توجد $8-3=5$. اقسم فرق القيمتين على عدد القفزات تحصل على $d$، ثم ارجع إلى $a_{1}$. ولمعرفة رتبة قيمة ساوِ الحد العام بها واستخرج $n$.',
            'If you know two terms, count the jumps between them: from $a_{3}$ to $a_{8}$ there are $8-3=5$. Divide the difference of the values by the jumps and you have $d$; then go back to $a_{1}$. To find the place of a value, set the general term equal to it and solve for $n$.'
        ),
        examplePrompt: say('$a_{4}=10$ eta $a_{10}=28$. Aurkitu $d$ eta $a_{1}$.', '$a_{4}=10$ y $a_{10}=28$. Halla $d$ y $a_{1}$.', '$a_{4}=10$ و$a_{10}=28$. جد $d$ و$a_{1}$.', '$a_{4}=10$ and $a_{10}=28$. Find $d$ and $a_{1}$.'),
        example: same('$\\begin{gathered}d=\\frac{28-10}{6}=3\\\\ a_{1}=10-3\\cdot 3=1\\end{gathered}$'),
        exampleAnswer: say('$d=3$, $a_{1}=1$ eta $a_{n}=3n-2$.', '$d=3$, $a_{1}=1$ y $a_{n}=3n-2$.', '$d=3$ و$a_{1}=1$ و$a_{n}=3n-2$.', '$d=3$, $a_{1}=1$ and $a_{n}=3n-2$.')
    },
    gauss: {
        vocabulary: [
            say('bikoteak', 'parejas', 'الأزواج', 'pairs'),
            say('azkena', 'último', 'الأخير', 'last'),
            say('batura', 'suma', 'المجموع', 'sum')
        ],
        explanation: say(
            'Kontatzen da Gauss txikiak 1 eta 100 arteko zenbakiak bikoteak eginez batu zituela: $1+100$, $2+99$, $3+98\\ldots$ Guztiek 101 balio dute, eta 50 bikote daude: $50\\cdot 101=5050$. Progresio aritmetiko guztietan, lehenak eta azkenak, bigarrenak eta azkenaurrekoak… gauza bera batzen dute.',
            'Se cuenta que Gauss, de niño, sumó los números del 1 al 100 haciendo parejas: $1+100$, $2+99$, $3+98\\ldots$ Todas valen 101, y hay 50 parejas: $50\\cdot 101=5050$. En toda progresión aritmética, el primero y el último, el segundo y el penúltimo… suman lo mismo.',
            'يُروى أن غاوس جمع وهو طفل الأعداد من 1 إلى 100 بتكوين أزواج: $1+100$ و$2+99$ و$3+98\\ldots$ كلها تساوي 101، وعددها 50 زوجًا: $50\\cdot 101=5050$. وفي كل متتالية حسابية يكون مجموع الأول والأخير، والثاني وما قبل الأخير… هو نفسه.',
            'The story goes that young Gauss added the numbers from 1 to 100 by making pairs: $1+100$, $2+99$, $3+98\\ldots$ They are all worth 101, and there are 50 pairs: $50\\cdot 101=5050$. In every arithmetic sequence, the first and the last, the second and the second-to-last… add up to the same.'
        ),
        examplePrompt: say('Kalkulatu $1+2+3+\\cdots+60$.', 'Calcula $1+2+3+\\cdots+60$.', 'احسب $1+2+3+\\cdots+60$.', 'Work out $1+2+3+\\cdots+60$.'),
        example: same('$1+60=61\\qquad 30\\cdot 61=1830$'),
        exampleAnswer: say('1830: 60 gai, 61 balio duten 30 bikote.', '1830: 60 términos, 30 parejas de 61.', '1830: ‏60 حدًا، 30 زوجًا كل منها 61.', '1,830: 60 terms, 30 pairs of 61.')
    },
    'arith-sum': {
        vocabulary: [
            say('zutabeak', 'columnas', 'الأعمدة', 'columns'),
            say('azken gaia', 'último término', 'الحد الأخير', 'last term'),
            say('batura', 'suma', 'المجموع', 'sum')
        ],
        explanation: say(
            'Gaussen ideiak formula bat ematen du: $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$. Azken gaia ezagutzen ez baduzu, kalkulatu lehenik gai orokorrarekin. $2+4+\\cdots+12$ baturan, $S_{6}=\\frac{(2+12)\\cdot 6}{2}=42$. Gai kopurua bikoitia zein bakoitia izan, balio du.',
            'La idea de Gauss da una fórmula: $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$. Si no conoces el último término, calcúlalo antes con el término general. En $2+4+\\cdots+12$, $S_{6}=\\frac{(2+12)\\cdot 6}{2}=42$. Vale tanto con un número par de términos como impar.',
            'تعطي فكرة غاوس صيغة: $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$. وإذا لم تعرف الحد الأخير فاحسبه أولًا بالحد العام. في $2+4+\\cdots+12$ يكون $S_{6}=\\frac{(2+12)\\cdot 6}{2}=42$. وتصلح الصيغة سواء كان عدد الحدود زوجيًا أو فرديًا.',
            'Gauss’s idea gives a formula: $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$. If you do not know the last term, work it out first with the general term. In $2+4+\\cdots+12$, $S_{6}=\\frac{(2+12)\\cdot 6}{2}=42$. It works with an even or an odd number of terms.'
        ),
        examplePrompt: say('Batu $4,\\,9,\\,14,\\ldots$ progresioaren lehen 15 gaiak.', 'Suma los 15 primeros términos de $4,\\,9,\\,14,\\ldots$', 'اجمع الحدود الخمسة عشر الأولى من $4,\\,9,\\,14,\\ldots$', 'Add the first 15 terms of $4,\\,9,\\,14,\\ldots$'),
        example: same('$\\begin{gathered}a_{15}=4+14\\cdot 5=74\\\\ S_{15}=\\frac{(4+74)\\cdot 15}{2}=585\\end{gathered}$'),
        exampleAnswer: say('585: lehenik azken gaia, $a_{15}=74$.', '585: primero el último término, $a_{15}=74$.', '585: أولًا الحد الأخير $a_{15}=74$.', '585: first the last term, $a_{15}=74$.'),
        why: {
            text: say(
                'Idatzi progresioa, eta azpian bera alderantziz. Zutabe bakoitzak $a_{1}+a_{n}$ batzen du, eta $n$ zutabe daude: hori batura bi aldiz da. Horregatik zatitzen da 2 zenbakiaz.',
                'Escribe la progresión y, debajo, la misma al revés. Cada columna suma $a_{1}+a_{n}$, y hay $n$ columnas: eso es dos veces la suma. Por eso se divide entre 2.',
                'اكتب المتتالية ثم اكتب تحتها المتتالية نفسها معكوسة. كل عمود مجموعه $a_{1}+a_{n}$، وعدد الأعمدة $n$: هذا ضعف المجموع، ولذلك نقسم على 2.',
                'Write the sequence and, underneath, the same one reversed. Each column adds up to $a_{1}+a_{n}$, and there are $n$ columns: that is the sum twice. That is why you divide by 2.'
            ),
            math: same('$6\\cdot 14=84=2\\cdot 42$')
        }
    },
    'arith-problems': {
        vocabulary: [
            say('ilara', 'fila', 'الصف', 'row'),
            say('gaia', 'término', 'الحد', 'term'),
            say('batura', 'suma', 'المجموع', 'sum')
        ],
        explanation: say(
            'Kopuru bat beti gauza bera handitzen edo txikitzen bada, progresio aritmetiko bat dago. Erabaki zer den $a_{1}$, zer den $d$ eta zenbat gai dauden; gero, begiratu gaia eskatzen duten (hamargarren ilarako eserlekuak) ala batura (eserleku guztiak). Lehen eguna, lehen ilara… $a_{1}$ dira.',
            'Si una cantidad aumenta o disminuye siempre lo mismo, hay una progresión aritmética. Decide qué es $a_{1}$, qué es $d$ y cuántos términos hay; después, mira si piden un término (los asientos de la décima fila) o la suma (todos los asientos). El primer día, la primera fila… son $a_{1}$.',
            'إذا زادت كمية أو نقصت دائمًا بالمقدار نفسه فهناك متتالية حسابية. قرّر ما هو $a_{1}$ وما هو $d$ وكم حدًا هناك، ثم انظر هل المطلوب حد (مقاعد الصف العاشر) أم المجموع (كل المقاعد). واليوم الأول والصف الأول… هما $a_{1}$.',
            'If an amount always goes up or down by the same, there is an arithmetic sequence. Decide what $a_{1}$ is, what $d$ is and how many terms there are; then see whether they ask for a term (the seats in the tenth row) or the sum (all the seats). The first day, the first row… are $a_{1}$.'
        ),
        examplePrompt: say('Norbaitek 5 € gordetzen ditu lehen astean, eta aste bakoitzean 3 € gehiago. Zenbat gorde ditu 12 astetan?', 'Alguien guarda 5 € la primera semana y cada semana 3 € más. ¿Cuánto ha guardado en 12 semanas?', 'يدّخر شخص 5 € في الأسبوع الأول ثم 3 € أكثر كل أسبوع. كم ادّخر في 12 أسبوعًا؟', 'Someone saves €5 in the first week and €3 more each week. How much have they saved in 12 weeks?'),
        example: same('$\\begin{gathered}a_{12}=5+11\\cdot 3=38\\\\ S_{12}=\\frac{(5+38)\\cdot 12}{2}=258\\end{gathered}$'),
        exampleAnswer: say('258 €: lehen astea $a_{1}$ da, eta 12. astean 38 € gordetzen ditu.', '258 €: la primera semana es $a_{1}$, y la semana 12 guarda 38 €.', '258 €: الأسبوع الأول هو $a_{1}$، وفي الأسبوع 12 يدّخر 38 €.', '€258: the first week is $a_{1}$, and in week 12 they save €38.')
    },
    'geo-ratio': {
        definitions: [
            {
                term: say('Progresio geometrikoa', 'Progresión geométrica', 'المتتالية الهندسية', 'Geometric sequence'),
                meaning: say('Gai bakoitza aurrekoa bider zenbaki finko bat duen segida: $r$ arrazoia.', 'Una sucesión en la que cada término es el anterior por un número fijo, la razón $r$.', 'متتالية كل حد فيها هو السابق مضروبًا في عدد ثابت هو الأساس $r$.', 'A sequence in which each term is the previous one times a fixed number, the ratio $r$.')
            }
        ],
        vocabulary: [
            say('zatidura', 'cociente', 'حاصل القسمة', 'quotient'),
            say('aurrekoa', 'anterior', 'السابق', 'previous'),
            say('pilota', 'pelota', 'الكرة', 'ball')
        ],
        explanation: say(
            'Arrazoia gai baten eta aurrekoaren arteko zatidura da, $r=\\frac{a_{n}}{a_{n-1}}$: pilota bat $160,\\,80,\\,40,\\,20$ cm-ra jauzten bada, $r=\\frac{1}{2}$. Geometrikoa dela egiaztatzeko, zatitu ondoz ondoko gaiak: zatidurak beti bera izan behar du.',
            'La razón es el cociente entre un término y el anterior, $r=\\frac{a_{n}}{a_{n-1}}$: si una pelota bota $160,\\,80,\\,40,\\,20$ cm, $r=\\frac{1}{2}$. Para comprobar que es geométrica, divide términos consecutivos: el cociente tiene que ser siempre el mismo.',
            'الأساس هو حاصل قسمة حد على سابقه $r=\\frac{a_{n}}{a_{n-1}}$: إذا ارتدت كرة إلى $160,\\,80,\\,40,\\,20$ سم فإن $r=\\frac{1}{2}$. وللتحقق من أنها هندسية اقسم الحدود المتتالية: يجب أن يكون حاصل القسمة نفسه دائمًا.',
            'The ratio is the quotient of a term and the previous one, $r=\\frac{a_{n}}{a_{n-1}}$: if a ball bounces $160,\\,80,\\,40,\\,20$ cm, $r=\\frac{1}{2}$. To check that it is geometric, divide consecutive terms: the quotient must always be the same.'
        ),
        cases: [
            {
                title: say('$r>1$', '$r>1$', '$r>1$', '$r>1$'),
                text: say('Gaiak positiboak badira, oso azkar hazten da.', 'Con términos positivos, crece muy deprisa.', 'إذا كانت الحدود موجبة تزداد بسرعة كبيرة.', 'With positive terms, it grows very fast.'),
                math: same('$3,\\,6,\\,12,\\,24,\\ldots$')
            },
            {
                title: say('$0<r<1$', '$0<r<1$', '$0<r<1$', '$0<r<1$'),
                text: say('Txikitzen doa eta zerora hurbiltzen da.', 'Va disminuyendo y se acerca a cero.', 'تتناقص وتقترب من الصفر.', 'It keeps shrinking and gets close to zero.'),
                math: same('$160,\\,80,\\,40,\\ldots$')
            },
            {
                title: say('$r<0$', '$r<0$', '$r<0$', '$r<0$'),
                text: say('Zeinuak txandakatu egiten dira.', 'Los signos se alternan.', 'تتناوب الإشارات.', 'The signs alternate.'),
                math: same('$1,\\,-2,\\,4,\\,-8,\\ldots$')
            }
        ],
        examplePrompt: say('Geometrikoa da $5,\\ 15,\\ 45,\\ 135$? Aurkitu arrazoia eta hurrengo gaia.', '¿Es geométrica $5,\\ 15,\\ 45,\\ 135$? Halla su razón y el término siguiente.', 'هل $5,\\ 15,\\ 45,\\ 135$ متتالية هندسية؟ جد أساسها والحد التالي.', 'Is $5,\\ 15,\\ 45,\\ 135$ geometric? Find its ratio and the next term.'),
        example: same('$\\frac{15}{5}=\\frac{45}{15}=\\frac{135}{45}=3$'),
        exampleAnswer: say('Bai, $r=3$: hurrengoa $135\\cdot 3=405$ da.', 'Sí, $r=3$: el siguiente es $135\\cdot 3=405$.', 'نعم، $r=3$: والتالي $135\\cdot 3=405$.', 'Yes, $r=3$: the next one is $135\\cdot 3=405$.')
    },
    'geo-general': {
        vocabulary: [
            say('berretura', 'potencia', 'القوة', 'power'),
            say('biderketa', 'multiplicación', 'الضرب', 'multiplication'),
            say('pilota', 'pelota', 'الكرة', 'ball')
        ],
        explanation: say(
            '$a_{1}$ gaitik $a_{n}$ gaira $n-1$ aldiz biderkatzen da $r$ zenbakiaz, eta biderketa errepikatu hori berretura bat da: $a_{n}=a_{1}\\cdot r^{n-1}$. 160 cm-tik jauzten den pilotarekin, $r=\\frac{1}{2}$: $a_{5}=160\\cdot\\left(\\frac{1}{2}\\right)^{4}=10$ cm. Lehenik berretura, gero biderketa.',
            'De $a_{1}$ a $a_{n}$ se multiplica $n-1$ veces por $r$, y esa multiplicación repetida es una potencia: $a_{n}=a_{1}\\cdot r^{n-1}$. Con la pelota que bota desde 160 cm, $r=\\frac{1}{2}$: $a_{5}=160\\cdot\\left(\\frac{1}{2}\\right)^{4}=10$ cm. Primero la potencia, después el producto.',
            'من $a_{1}$ إلى $a_{n}$ نضرب $n-1$ مرة في $r$، وهذا الضرب المتكرر قوة: $a_{n}=a_{1}\\cdot r^{n-1}$. مع الكرة التي ترتد من 160 سم يكون $r=\\frac{1}{2}$: $a_{5}=160\\cdot\\left(\\frac{1}{2}\\right)^{4}=10$ سم. القوة أولًا ثم الضرب.',
            'From $a_{1}$ to $a_{n}$ you multiply $n-1$ times by $r$, and that repeated multiplication is a power: $a_{n}=a_{1}\\cdot r^{n-1}$. With the ball bouncing from 160 cm, $r=\\frac{1}{2}$: $a_{5}=160\\cdot\\left(\\frac{1}{2}\\right)^{4}=10$ cm. First the power, then the product.'
        ),
        examplePrompt: say('$a_{1}=2$ eta $r=-3$ badira, aurkitu $a_{6}$.', 'Si $a_{1}=2$ y $r=-3$, halla $a_{6}$.', 'إذا كان $a_{1}=2$ و$r=-3$ فجد $a_{6}$.', 'If $a_{1}=2$ and $r=-3$, find $a_{6}$.'),
        example: same('$a_{6}=2\\cdot(-3)^{5}=2\\cdot(-243)=-486$'),
        exampleAnswer: say('$-486$: 5 berretzailea bakoitia da; beraz, negatiboa ateratzen da.', '$-486$: el exponente 5 es impar, así que sale negativo.', '$-486$: الأس 5 فردي، فالنتيجة سالبة.', '$-486$: the exponent 5 is odd, so it comes out negative.')
    },
    'geo-find': {
        vocabulary: [
            say('erroa', 'raíz', 'الجذر', 'root'),
            say('jauziak', 'saltos', 'القفزات', 'jumps'),
            say('zatitu', 'dividir', 'اقسم', 'divide')
        ],
        explanation: say(
            'Bi gai ezagutzen badituzu, zenbatu jauziak: $a_{2}$ gaitik $a_{5}$ gaira 3 daude; beraz, $\\frac{a_{5}}{a_{2}}=r^{3}$. Zatitu bi gaiak eta atera erroa. $r$ ezagututa, zatitu atzerantz $a_{1}$ lortzeko: $a_{1}=\\frac{a_{2}}{r}$.',
            'Si conoces dos términos, cuenta los saltos: de $a_{2}$ a $a_{5}$ hay 3, así que $\\frac{a_{5}}{a_{2}}=r^{3}$. Divide los dos términos y saca la raíz. Conocida $r$, divide hacia atrás para llegar a $a_{1}$: $a_{1}=\\frac{a_{2}}{r}$.',
            'إذا عرفت حدّين فعُدّ القفزات: من $a_{2}$ إلى $a_{5}$ ثلاث قفزات، إذن $\\frac{a_{5}}{a_{2}}=r^{3}$. اقسم الحدّين واستخرج الجذر. وبعد معرفة $r$ اقسم إلى الوراء للوصول إلى $a_{1}$: $a_{1}=\\frac{a_{2}}{r}$.',
            'If you know two terms, count the jumps: from $a_{2}$ to $a_{5}$ there are 3, so $\\frac{a_{5}}{a_{2}}=r^{3}$. Divide the two terms and take the root. Once you know $r$, divide backwards to reach $a_{1}$: $a_{1}=\\frac{a_{2}}{r}$.'
        ),
        examplePrompt: say('$a_{3}=12$ eta $a_{6}=96$. Aurkitu $r$ eta $a_{1}$.', '$a_{3}=12$ y $a_{6}=96$. Halla $r$ y $a_{1}$.', '$a_{3}=12$ و$a_{6}=96$. جد $r$ و$a_{1}$.', '$a_{3}=12$ and $a_{6}=96$. Find $r$ and $a_{1}$.'),
        example: same('$\\begin{gathered}r^{3}=\\frac{96}{12}=8\\ \\to\\ r=2\\\\ a_{1}=\\frac{12}{2^{2}}=3\\end{gathered}$'),
        exampleAnswer: say('$r=2$ eta $a_{1}=3$: $3,\\,6,\\,12,\\,24,\\,48,\\,96,\\ldots$', '$r=2$ y $a_{1}=3$: $3,\\,6,\\,12,\\,24,\\,48,\\,96,\\ldots$', '$r=2$ و$a_{1}=3$: $3,\\,6,\\,12,\\,24,\\,48,\\,96,\\ldots$', '$r=2$ and $a_{1}=3$: $3,\\,6,\\,12,\\,24,\\,48,\\,96,\\ldots$')
    },
    'geo-sum': {
        vocabulary: [
            say('Gaussen bikoteak', 'parejas de Gauss', 'أزواج غاوس', 'Gauss pairs'),
            say('formula', 'fórmula', 'الصيغة', 'formula'),
            say('batura', 'suma', 'المجموع', 'sum')
        ],
        explanation: say(
            'Geometrikoetan Gaussen bikoteek ez dute balio: beste formula bat dago, $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$, $r\\neq 1$ izanik. Adibidez, $1+2+4+\\cdots+2^{9}=\\frac{2^{10}-1}{2-1}=1023$. Gai gutxi badira, batu eskuz formula egiaztatzeko.',
            'En las geométricas no sirven las parejas de Gauss: hay otra fórmula, $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$, con $r\\neq 1$. Por ejemplo, $1+2+4+\\cdots+2^{9}=\\frac{2^{10}-1}{2-1}=1023$. Si son pocos términos, súmalos a mano para comprobar la fórmula.',
            'في المتتاليات الهندسية لا تصلح أزواج غاوس: هناك صيغة أخرى $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$ مع $r\\neq 1$. مثلًا $1+2+4+\\cdots+2^{9}=\\frac{2^{10}-1}{2-1}=1023$. وإذا كانت الحدود قليلة فاجمعها باليد للتحقق من الصيغة.',
            'In geometric sequences the Gauss pairs do not work: there is another formula, $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$, with $r\\neq 1$. For example, $1+2+4+\\cdots+2^{9}=\\frac{2^{10}-1}{2-1}=1023$. With few terms, add them by hand to check the formula.'
        ),
        examplePrompt: say('Batu $7,\\,21,\\,63,\\ldots$ progresioaren lehen 4 gaiak.', 'Suma los 4 primeros términos de $7,\\,21,\\,63,\\ldots$', 'اجمع الحدود الأربعة الأولى من $7,\\,21,\\,63,\\ldots$', 'Add the first 4 terms of $7,\\,21,\\,63,\\ldots$'),
        example: same('$S_{4}=\\frac{7\\cdot(3^{4}-1)}{3-1}=\\frac{7\\cdot 80}{2}=280$'),
        exampleAnswer: say('280; eskuz: $7+21+63+189=280$.', '280; a mano: $7+21+63+189=280$.', '280؛ وباليد: $7+21+63+189=280$.', '280; by hand: $7+21+63+189=280$.'),
        why: {
            text: say(
                'Biderkatu batura $r$ zenbakiaz: gai guztiak leku bat mugitzen dira. $r\\cdot S_{n}-S_{n}$ kentzean ia guztiak desagertzen dira, eta azkena bider $r$ eta lehena bakarrik geratzen dira.',
                'Multiplica la suma por $r$: todos los términos se mueven un lugar. Al restar $r\\cdot S_{n}-S_{n}$ casi todos desaparecen, y solo quedan el último por $r$ y el primero.',
                'اضرب المجموع في $r$: تنتقل كل الحدود رتبة واحدة. وعند طرح $r\\cdot S_{n}-S_{n}$ يختفي معظمها، ولا يبقى إلا الأخير مضروبًا في $r$ والأول.',
                'Multiply the sum by $r$: every term moves one place. Subtracting $r\\cdot S_{n}-S_{n}$, almost all of them cancel, and only the last times $r$ and the first are left.'
            ),
            math: same('$\\begin{aligned}&(2+4+8)-(1+2+4)\\\\&=8-1=7\\end{aligned}$')
        }
    },
    'geo-infinite': {
        vocabulary: [
            say('karratua', 'cuadrado', 'المربع', 'square'),
            say('erdia', 'mitad', 'النصف', 'half'),
            say('infinitua', 'infinita', 'لا نهائي', 'infinite')
        ],
        explanation: say(
            'Erdibitu karratu bat, gero geratzen den erdia, eta horrela amaigabe: $\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\cdots$ zatiek karratua betetzen dute, gainditu gabe; batura 1 da. $|r|<1$ denean, batura $S=\\frac{a_{1}}{1-r}$ balioaren hurbiltzen da. $|r|\\geq 1$ bada, gaiak ez dira txikitzen eta batura infinitua da.',
            'Parte un cuadrado por la mitad, después la mitad que queda, y así sin fin: $\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\cdots$ llena el cuadrado sin pasarlo; la suma es 1. Cuando $|r|<1$, la suma se acerca a $S=\\frac{a_{1}}{1-r}$. Si $|r|\\geq 1$, los términos no se hacen pequeños y la suma es infinita.',
            'قسّم مربعًا نصفين، ثم النصف الباقي، وهكذا بلا نهاية: $\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\cdots$ يملأ المربع دون أن يتجاوزه؛ والمجموع 1. وعندما $|r|<1$ يقترب المجموع من $S=\\frac{a_{1}}{1-r}$. وإذا كان $|r|\\geq 1$ فالحدود لا تصغر والمجموع لا نهائي.',
            'Cut a square in half, then the half that is left, and so on forever: $\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\cdots$ fills the square without going past it; the sum is 1. When $|r|<1$, the sum gets close to $S=\\frac{a_{1}}{1-r}$. If $|r|\\geq 1$, the terms do not get small and the sum is infinite.'
        ),
        examplePrompt: say('Kalkulatu $9+3+1+\\cdots$', 'Calcula $9+3+1+\\cdots$', 'احسب $9+3+1+\\cdots$', 'Work out $9+3+1+\\cdots$'),
        example: same('$r=\\frac{3}{9}=\\frac{1}{3}\\qquad S=\\frac{9}{1-\\frac{1}{3}}=13{,}5$'),
        exampleAnswer: say('$13{,}5$: $|r|<1$ denez, batura badago.', '$13{,}5$: como $|r|<1$, la suma existe.', '$13{,}5$: بما أن $|r|<1$ فالمجموع موجود.', '$13{,}5$: since $|r|<1$, the sum exists.'),
        why: {
            text: say(
                '$|r|<1$ denean, $r^{n}$ gero eta txikiagoa da: $\\left(\\frac{1}{2}\\right)^{10}$ milaren bat baino txikiagoa da jada. $S_{n}$ formulan $r^{n}$ ia desagertzen da, eta $\\frac{a_{1}}{1-r}$ geratzen da.',
                'Con $|r|<1$, $r^{n}$ se hace cada vez más pequeño: $\\left(\\frac{1}{2}\\right)^{10}$ ya es menos de una milésima. En la fórmula de $S_{n}$, $r^{n}$ casi desaparece y queda $\\frac{a_{1}}{1-r}$.',
                'عندما $|r|<1$ يصغر $r^{n}$ أكثر فأكثر: $\\left(\\frac{1}{2}\\right)^{10}$ أقل من جزء من ألف. وفي صيغة $S_{n}$ يكاد $r^{n}$ يختفي فيبقى $\\frac{a_{1}}{1-r}$.',
                'With $|r|<1$, $r^{n}$ keeps getting smaller: $\\left(\\frac{1}{2}\\right)^{10}$ is already less than a thousandth. In the formula for $S_{n}$, $r^{n}$ almost disappears and $\\frac{a_{1}}{1-r}$ is left.'
            ),
            math: same('$\\left(\\frac{1}{2}\\right)^{10}=\\frac{1}{1024}\\approx 0{,}001$')
        }
    },
    'geo-problems': {
        vocabulary: [
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage'),
            say('bikoiztu', 'duplicar', 'تضاعف', 'double'),
            say('hasierako kopurua', 'cantidad inicial', 'الكمية الأولية', 'starting amount')
        ],
        explanation: say(
            'Kopuru bat beti ehuneko berean aldatzen bada, progresio geometriko bat dago: % 5 hazteak $r=1{,}05$ esan nahi du. Zerbait bikoizten bada, $r=2$; pilotak altueraren erdia jauzten badu, $r=\\frac{1}{2}$. Hasierako kopurua 0 unean badago, $n$ aldiz aldatu ondoren $a_{1}\\cdot r^{n}$ izango da.',
            'Si una cantidad cambia siempre en el mismo porcentaje, hay una progresión geométrica: crecer un 5 % es $r=1{,}05$. Si algo se duplica, $r=2$; si la pelota bota la mitad, $r=\\frac{1}{2}$. Si la cantidad inicial es el momento 0, al cabo de $n$ veces habrá $a_{1}\\cdot r^{n}$.',
            'إذا تغيّرت كمية دائمًا بالنسبة المئوية نفسها فهناك متتالية هندسية: النمو 5٪ يعني $r=1{,}05$. وإذا تضاعف شيء فإن $r=2$، وإذا ارتدت الكرة نصف ارتفاعها فإن $r=\\frac{1}{2}$. وإذا كانت الكمية الأولية في اللحظة 0 فبعد $n$ مرة يصبح لدينا $a_{1}\\cdot r^{n}$.',
            'If an amount always changes by the same percentage, there is a geometric sequence: growing 5% means $r=1{,}05$. If something doubles, $r=2$; if the ball bounces half as high, $r=\\frac{1}{2}$. If the starting amount is at time 0, after $n$ times you will have $a_{1}\\cdot r^{n}$.'
        ),
        examplePrompt: say('Hiri batek 20 000 biztanle ditu, eta % 3 hazten da urtero. Zenbat izango ditu 2 urte barru?', 'Una ciudad tiene 20 000 habitantes y crece un 3 % cada año. ¿Cuántos tendrá dentro de 2 años?', 'في مدينة 20 000 نسمة وتنمو 3٪ كل سنة. كم سيكون عدد سكانها بعد سنتين؟', 'A city has 20,000 inhabitants and grows 3% each year. How many will it have in 2 years?'),
        example: same('$20\\,000\\cdot 1{,}03^{2}=21\\,218$'),
        exampleAnswer: say('21 218 biztanle: $r=1{,}03$, bi aldiz.', '21 218 habitantes: $r=1{,}03$, dos veces.', '21 218 نسمة: $r=1{,}03$ مرتين.', '21,218 inhabitants: $r=1{,}03$, twice.')
    }
}
