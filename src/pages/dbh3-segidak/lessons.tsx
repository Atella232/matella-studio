import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BounceFigure, GaussFigure, HalvesFigure, JumpsFigure, RecursiveFigure, SticksFigure } from './figures'
import { say, same } from './text'

/* ==========================================================================
   Segidak · 3. DBH — stages and lessons, following Santillana 3.º ESO
   unit 3 «Progresiones» (sequences, the general term, recursive rules,
   arithmetic progressions and their sum, geometric progressions, the sum
   of n terms and of infinitely many) and Anaya 3.º ESO unit 4
   «Progresiones». Every number and context is original: the books only fix
   the scope and the order. Each lesson names its typical mistake.
   ========================================================================== */

export type SequencesStageId = 'sequences' | 'arithmetic' | 'sums' | 'geometric' | 'geo-sums'

export const sequencesStages: UnitStage[] = [
    { id: 'sequences', tone: 'blue', title: { eu: 'Segidak', es: 'Sucesiones', en: 'Sequences', ar: 'المتتاليات' } },
    { id: 'arithmetic', tone: 'violet', title: { eu: 'Progresio aritmetikoak', es: 'Progresiones aritméticas', en: 'Arithmetic progressions', ar: 'المتتاليات الحسابية' } },
    { id: 'sums', tone: 'mustard', title: { eu: 'Gaien batura', es: 'Suma de términos', en: 'Sums of terms', ar: 'مجموع الحدود' } },
    { id: 'geometric', tone: 'coral', title: { eu: 'Progresio geometrikoak', es: 'Progresiones geométricas', en: 'Geometric progressions', ar: 'المتتاليات الهندسية' } },
    { id: 'geo-sums', tone: 'green', title: { eu: 'Batura geometrikoak', es: 'Sumas geométricas', en: 'Geometric sums', ar: 'المجاميع الهندسية' } }
]

export const sequencesTopics: UnitTopic[] = [
    /* ---------- 1. Sequences ---------- */
    {
        id: 'terms',
        stage: 'sequences',
        title: say('Segidak eta gaiak', 'Sucesiones y términos', 'المتتاليات والحدود', 'Sequences and terms'),
        goal: say('Segida bat ordenatutako zenbaki-zerrenda gisa ulertzea eta gai bakoitzaren lekua ezagutzea.', 'Entender una sucesión como una lista ordenada de números y reconocer el lugar de cada término.', 'فهم المتتالية قائمةً مرتبة من الأعداد ومعرفة رتبة كل حد.', 'Understand a sequence as an ordered list of numbers and recognise the position of each term.'),
        explanation: say(
            'Segida bat ordena jakin batean idatzitako zenbaki-zerrenda da: $a_{1},\\,a_{2},\\,a_{3},\\ldots$ Zenbaki bakoitza gai bat da, eta azpiindizeak bere lekua adierazten du: $a_{5}$ bosgarren gaia da. Askotan, gaiek arau bat jarraitzen dute, eta arau hori aurkitzea da lehen urratsa: $3,\\,7,\\,11,\\,15,\\ldots$ segidan, gai bakoitza aurrekoa gehi 4 da. Kontuz: lekua eta balioa ez dira gauza bera; $a_{3}=11$ esan nahi du hirugarren gaiak 11 balio duela.',
            'Una sucesión es una lista de números escritos en un orden: $a_{1},\\,a_{2},\\,a_{3},\\ldots$ Cada número es un término, y el subíndice indica su lugar: $a_{5}$ es el quinto término. Muchas veces los términos siguen una regla, y descubrirla es el primer paso: en $3,\\,7,\\,11,\\,15,\\ldots$ cada término es el anterior más 4. Cuidado: lugar y valor no son lo mismo; $a_{3}=11$ significa que el tercer término vale 11.',
            'المتتالية قائمة أعداد مكتوبة بترتيب معيّن: $a_{1},\\,a_{2},\\,a_{3},\\ldots$ كل عدد حدّ، والدليل السفلي يدل على رتبته: $a_{5}$ هو الحد الخامس. وكثيرًا ما تتبع الحدود قاعدة، واكتشافها هو الخطوة الأولى: في $3,\\,7,\\,11,\\,15,\\ldots$ كل حد يساوي سابقه زائد 4. انتبه: الرتبة والقيمة ليستا شيئًا واحدًا؛ $a_{3}=11$ يعني أن الحد الثالث قيمته 11.',
            'A sequence is a list of numbers written in an order: $a_{1},\\,a_{2},\\,a_{3},\\ldots$ Each number is a term, and the subscript shows its position: $a_{5}$ is the fifth term. Often the terms follow a rule, and finding it is the first step: in $3,\\,7,\\,11,\\,15,\\ldots$ each term is the one before plus 4. Careful: position and value are not the same; $a_{3}=11$ means that the third term is 11.'
        ),
        problem: same('$2,\\,6,\\,18,\\,54,\\ldots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Begiratu nola igarotzen den gai batetik hurrengora.', 'Mira cómo se pasa de un término al siguiente.', 'انظر كيف ننتقل من حد إلى الذي يليه.', 'See how you get from one term to the next.'), math: same('$6=2\\cdot 3\\quad 18=6\\cdot 3$') },
            { text: say('Araua: bider 3.', 'La regla: por 3.', 'القاعدة: الضرب في 3.', 'The rule: times 3.') },
            { text: say('Hurrengo gaia, $a_{5}$.', 'El siguiente término, $a_{5}$.', 'الحد التالي $a_{5}$.', 'The next term, $a_{5}$.'), math: same('$a_{5}=54\\cdot 3=162$') }
        ],
        example: same('$1,\\,4,\\,9,\\,16,\\,25,\\ldots$'),
        mistake: {
            wrong: say('$5,\\,8,\\,11,\\,14$ segidan, $a_{2}=2$, bigarren lekuan dagoelako.', 'En $5,\\,8,\\,11,\\,14$, $a_{2}=2$, porque está en el segundo lugar.', 'في $5,\\,8,\\,11,\\,14$ يكون $a_{2}=2$ لأنه في الرتبة الثانية.', 'In $5,\\,8,\\,11,\\,14$, $a_{2}=2$, because it is in second place.'),
            right: say('Azpiindizea lekua da, eta $a_{2}$ leku horretan dagoen balioa: $a_{2}=8$.', 'El subíndice es el lugar, y $a_{2}$ es el valor que hay en ese lugar: $a_{2}=8$.', 'الدليل هو الرتبة، و$a_{2}$ هو القيمة في تلك الرتبة: $a_{2}=8$.', 'The subscript is the position, and $a_{2}$ is the value in that position: $a_{2}=8$.')
        },
        takeaway: say('$A_{N}$: $N$ lekuan dagoen gaia. Lehenik bilatu araua.', '$A_{N}$: el término que ocupa el lugar $N$. Primero busca la regla.', '$A_{N}$: الحد في الرتبة $N$. ابحث أولًا عن القاعدة.', '$A_{N}$: the term in position $N$. First look for the rule.'),
        figure: (language) => <SticksFigure language={language} />
    },
    {
        id: 'general-term',
        stage: 'sequences',
        title: say('Gai orokorra', 'Término general', 'الحد العام', 'The general term'),
        goal: say('Gai orokorraren formula erabiltzea edozein gai kalkulatzeko, eta formula sinpleak aurkitzea.', 'Usar la fórmula del término general para calcular cualquier término, y encontrar fórmulas sencillas.', 'استعمال صيغة الحد العام لحساب أي حد، وإيجاد صيغ بسيطة.', 'Use the formula of the general term to work out any term, and find simple formulas.'),
        explanation: say(
            'Gai orokorra $a_{n}$ da: $n$ lekuan dagoen gaia ematen duen formula. Adibidez, $a_{n}=2n+1$ bada, ordezkatu $n$ lekua: $a_{1}=3$, $a_{2}=5$, $a_{10}=21$. Formula horri esker ez dago gai guztiak idatzi beharrik: zuzenean kalkula daiteke $a_{100}=201$. Alderantziz ere egin daiteke: gai batek 41 balio badu, $2n+1=41$, beraz $n=20$ da haren lekua. $n$ beti zenbaki arrunta da: $n$ zatiki bat ateratzen bada, zenbakia ez dago segidan.',
            'El término general es $a_{n}$: la fórmula que da el término que ocupa el lugar $n$. Por ejemplo, si $a_{n}=2n+1$, se sustituye el lugar $n$: $a_{1}=3$, $a_{2}=5$, $a_{10}=21$. Gracias a la fórmula no hace falta escribir todos los términos: se calcula directamente $a_{100}=201$. También se puede hacer al revés: si un término vale 41, $2n+1=41$, así que su lugar es $n=20$. $n$ siempre es un número natural: si sale una fracción, ese número no está en la sucesión.',
            'الحد العام هو $a_{n}$: الصيغة التي تعطي الحد في الرتبة $n$. مثلًا إذا كان $a_{n}=2n+1$ نعوّض الرتبة $n$: $a_{1}=3$ و$a_{2}=5$ و$a_{10}=21$. وبفضل الصيغة لا داعي لكتابة كل الحدود: نحسب مباشرة $a_{100}=201$. ويمكن العكس: إذا كان حدٌّ يساوي 41 فإن $2n+1=41$ ورتبته $n=20$. و$n$ عدد طبيعي دائمًا: إذا خرج كسرًا فذلك العدد ليس في المتتالية.',
            'The general term is $a_{n}$: the formula that gives the term in position $n$. For example, if $a_{n}=2n+1$, substitute the position $n$: $a_{1}=3$, $a_{2}=5$, $a_{10}=21$. Thanks to the formula you do not need to write all the terms: you work out $a_{100}=201$ directly. You can also go the other way: if a term is 41, $2n+1=41$, so its position is $n=20$. $n$ is always a natural number: if you get a fraction, that number is not in the sequence.'
        ),
        cases: [
            { title: say('Gaia kalkulatu', 'Calcular un término', 'حساب حد', 'Work out a term'), text: say('Ordezkatu $n$ lekua.', 'Sustituye el lugar $n$.', 'عوّض الرتبة $n$.', 'Substitute the position $n$.'), math: same('$a_{n}=n^{2}-1\\ \\to\\ a_{6}=35$') },
            { title: say('Lekua aurkitu', 'Hallar el lugar', 'إيجاد الرتبة', 'Find the position'), text: say('Berdindu formula balioari eta ebatzi.', 'Iguala la fórmula al valor y resuelve.', 'ساوِ الصيغة بالقيمة وحلّ.', 'Set the formula equal to the value and solve.'), math: same('$3n-2=40\\ \\to\\ n=14$') }
        ],
        problem: say('$a_{n}=5n-3$. Zenbat da $a_{12}$? 77 segidan dago?', '$a_{n}=5n-3$. ¿Cuánto vale $a_{12}$? ¿Está el 77 en la sucesión?', '$a_{n}=5n-3$. كم يساوي $a_{12}$؟ هل 77 في المتتالية؟', '$a_{n}=5n-3$. What is $a_{12}$? Is 77 in the sequence?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatu $n=12$.', 'Sustituye $n=12$.', 'عوّض $n=12$.', 'Substitute $n=12$.'), math: same('$a_{12}=5\\cdot 12-3=57$') },
            { text: say('Berdindu 77-ri.', 'Iguala a 77.', 'ساوِ بـ 77.', 'Set it equal to 77.'), math: same('$5n-3=77\\ \\to\\ n=16$') },
            { text: say('$n=16$ zenbaki arrunta da: bai, $a_{16}=77$.', '$n=16$ es natural: sí, $a_{16}=77$.', '$n=16$ عدد طبيعي: نعم، $a_{16}=77$.', '$n=16$ is a natural number: yes, $a_{16}=77$.') }
        ],
        example: same('$a_{n}=\\frac{n}{n+1}\\ \\to\\ a_{4}=\\frac{4}{5}$'),
        mistake: {
            wrong: say('$a_{n}=2n+1$ bada, $a_{10}=2\\cdot 1+10=12$.', 'Si $a_{n}=2n+1$, $a_{10}=2\\cdot 1+10=12$.', 'إذا كان $a_{n}=2n+1$ فإن $a_{10}=2\\cdot 1+10=12$.', 'If $a_{n}=2n+1$, then $a_{10}=2\\cdot 1+10=12$.'),
            right: say('$n$ lekua da, eta hori ordezkatzen da: $a_{10}=2\\cdot 10+1=21$.', '$n$ es el lugar, y es lo que se sustituye: $a_{10}=2\\cdot 10+1=21$.', '$n$ هو الرتبة وهو ما نعوّضه: $a_{10}=2\\cdot 10+1=21$.', '$n$ is the position, and that is what you substitute: $a_{10}=2\\cdot 10+1=21$.')
        },
        takeaway: say('Gai bat: ordezkatu $N$. Lekua: berdindu eta ebatzi; $N$ zenbaki arrunta izan behar da.', 'Un término: sustituye $N$. El lugar: iguala y resuelve; $N$ tiene que ser natural.', 'الحد: عوّض $N$. الرتبة: ساوِ وحلّ؛ و$N$ يجب أن يكون طبيعيًا.', 'A term: substitute $N$. The position: set equal and solve; $N$ must be a natural number.'),
        figure: (language) => <SticksFigure language={language} />
    },
    {
        id: 'recursive',
        stage: 'sequences',
        title: say('Errepikapen-legea', 'Ley de recurrencia', 'العلاقة التراجعية', 'Recursive rules'),
        goal: say('Gai bakoitza aurrekoekin kalkulatzen den segidak eraikitzea, Fibonacci-rena barne.', 'Construir sucesiones en las que cada término se calcula con los anteriores, como la de Fibonacci.', 'بناء متتاليات يُحسب فيها كل حد من الحدود السابقة، مثل متتالية فيبوناتشي.', 'Build sequences in which each term is worked out from the previous ones, such as the Fibonacci sequence.'),
        explanation: say(
            'Errepikapen-lege batek ez du gaia lekutik ateratzen, aurreko gaietatik baizik. Adibidez, $a_{1}=3$ eta $a_{n}=2a_{n-1}-1$: $a_{2}=5$, $a_{3}=9$, $a_{4}=17$. Lehen gaia (edo lehen biak) eman behar dira; bestela segida ez dago zehaztuta. Fibonacci-ren segidan gai bakoitza aurreko bien batura da: $1,\\,1,\\,2,\\,3,\\,5,\\,8,\\,13,\\ldots$ Lege mota honekin $a_{20}$ kalkulatzeko aurreko guztiak kalkulatu behar dira.',
            'Una ley de recurrencia no saca el término de su lugar, sino de los términos anteriores. Por ejemplo, $a_{1}=3$ y $a_{n}=2a_{n-1}-1$: $a_{2}=5$, $a_{3}=9$, $a_{4}=17$. Hay que dar el primer término (o los dos primeros); si no, la sucesión no queda definida. En la sucesión de Fibonacci cada término es la suma de los dos anteriores: $1,\\,1,\\,2,\\,3,\\,5,\\,8,\\,13,\\ldots$ Con este tipo de ley, para calcular $a_{20}$ hay que calcular todos los anteriores.',
            'العلاقة التراجعية لا تُخرج الحد من رتبته بل من الحدود السابقة. مثلًا $a_{1}=3$ و$a_{n}=2a_{n-1}-1$: $a_{2}=5$ و$a_{3}=9$ و$a_{4}=17$. يجب إعطاء الحد الأول (أو الحدين الأولين)، وإلا فالمتتالية غير محددة. وفي متتالية فيبوناتشي كل حد مجموع الحدين السابقين: $1,\\,1,\\,2,\\,3,\\,5,\\,8,\\,13,\\ldots$ ومع هذا النوع من القواعد يلزم حساب كل الحدود السابقة لحساب $a_{20}$.',
            'A recursive rule does not get the term from its position, but from the previous terms. For example, $a_{1}=3$ and $a_{n}=2a_{n-1}-1$: $a_{2}=5$, $a_{3}=9$, $a_{4}=17$. You must give the first term (or the first two); otherwise the sequence is not defined. In the Fibonacci sequence each term is the sum of the two before it: $1,\\,1,\\,2,\\,3,\\,5,\\,8,\\,13,\\ldots$ With this kind of rule, to work out $a_{20}$ you have to work out all the earlier terms.'
        ),
        problem: same('$a_{1}=2,\\ a_{2}=5,\\ a_{n}=a_{n-1}+a_{n-2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hirugarrena: aurreko bien batura.', 'El tercero: la suma de los dos anteriores.', 'الثالث: مجموع الحدين السابقين.', 'The third: the sum of the two before.'), math: same('$a_{3}=5+2=7$') },
            { text: say('Laugarrena.', 'El cuarto.', 'الرابع.', 'The fourth.'), math: same('$a_{4}=7+5=12$') },
            { text: say('Bosgarrena.', 'El quinto.', 'الخامس.', 'The fifth.'), math: same('$a_{5}=12+7=19$') }
        ],
        example: same('$a_{1}=1,\\ a_{n}=3a_{n-1}\\ \\to\\ 1,\\,3,\\,9,\\,27$'),
        mistake: {
            wrong: say('$a_{n}=a_{n-1}+4$ segidan, $a_{5}=5+4=9$.', 'En $a_{n}=a_{n-1}+4$, $a_{5}=5+4=9$.', 'في $a_{n}=a_{n-1}+4$ يكون $a_{5}=5+4=9$.', 'In $a_{n}=a_{n-1}+4$, $a_{5}=5+4=9$.'),
            right: say('$a_{n-1}$ aurreko gaiaren balioa da, ez haren lekua. Lehen gaia behar da: $a_{1}=2$ bada, $a_{5}=18$.', '$a_{n-1}$ es el valor del término anterior, no su lugar. Hace falta el primer término: si $a_{1}=2$, $a_{5}=18$.', '$a_{n-1}$ قيمة الحد السابق لا رتبته. ويلزم الحد الأول: إذا كان $a_{1}=2$ فإن $a_{5}=18$.', '$a_{n-1}$ is the value of the previous term, not its position. You need the first term: if $a_{1}=2$, $a_{5}=18$.')
        },
        takeaway: say('Errepikapena: lehen gaia + aurrekotik hurrengora igarotzeko araua.', 'Recurrencia: primer término + la regla para pasar de uno al siguiente.', 'التراجعية: الحد الأول + قاعدة الانتقال من حد إلى الذي يليه.', 'Recursive: first term + the rule to go from one term to the next.'),
        figure: (language) => <RecursiveFigure language={language} />
    },

    /* ---------- 2. Arithmetic progressions ---------- */
    {
        id: 'arith-difference',
        stage: 'arithmetic',
        title: say('Progresio aritmetikoa eta diferentzia', 'Progresión aritmética y diferencia', 'المتتالية الحسابية والفرق', 'Arithmetic progression and common difference'),
        goal: say('Progresio aritmetikoak ezagutzea eta haien diferentzia kalkulatzea.', 'Reconocer progresiones aritméticas y calcular su diferencia.', 'التعرّف على المتتاليات الحسابية وحساب فرقها.', 'Recognise arithmetic progressions and work out their common difference.'),
        explanation: say(
            'Progresio aritmetiko batean, gai bakoitza aurrekoari zenbaki bera batuz lortzen da: zenbaki hori $d$ diferentzia da, $d=a_{n}-a_{n-1}$. $d>0$ bada, progresioa gorakorra da; $d<0$ bada, beherakorra; $d=0$ bada, konstantea. Zenbaki-zuzenean, gaiak saltoka doaz, salto guztiak berdinak. Egiaztatzeko, kalkulatu ondoz ondoko bi gaien kendura guztiak: berdinak badira, aritmetikoa da.',
            'En una progresión aritmética cada término se obtiene sumando al anterior el mismo número: ese número es la diferencia $d$, $d=a_{n}-a_{n-1}$. Si $d>0$ la progresión es creciente; si $d<0$, decreciente; si $d=0$, constante. En la recta numérica los términos van dando saltos, todos iguales. Para comprobarlo, calcula todas las restas entre términos consecutivos: si son iguales, es aritmética.',
            'في المتتالية الحسابية نحصل على كل حد بإضافة العدد نفسه إلى سابقه: هذا العدد هو الفرق $d$ حيث $d=a_{n}-a_{n-1}$. إذا كان $d>0$ فالمتتالية تزايدية، وإذا كان $d<0$ فتناقصية، وإذا كان $d=0$ فثابتة. وعلى مستقيم الأعداد تتقدم الحدود بقفزات متساوية. للتحقق احسب الفروق بين الحدود المتتالية: إذا تساوت فهي حسابية.',
            'In an arithmetic progression each term is found by adding the same number to the one before: that number is the common difference $d$, $d=a_{n}-a_{n-1}$. If $d>0$ the progression is increasing; if $d<0$, decreasing; if $d=0$, constant. On the number line the terms move in jumps, all the same size. To check, work out all the differences between consecutive terms: if they are equal, it is arithmetic.'
        ),
        problem: same('$17,\\,13,\\,9,\\,5,\\ldots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu ondoz ondoko gaiak.', 'Resta términos consecutivos.', 'اطرح الحدود المتتالية.', 'Subtract consecutive terms.'), math: same('$13-17=-4\\quad 9-13=-4$') },
            { text: say('Kendura beti bera: aritmetikoa, $d=-4$.', 'La resta siempre es la misma: aritmética, $d=-4$.', 'الفرق ثابت: حسابية، $d=-4$.', 'The difference is always the same: arithmetic, $d=-4$.') },
            { text: say('$d<0$: beherakorra. Hurrengoa:', '$d<0$: decreciente. El siguiente:', '$d<0$: تناقصية. الحد التالي:', '$d<0$: decreasing. The next term:'), math: same('$5-4=1$') }
        ],
        example: same('$2{,}5,\\,4,\\,5{,}5,\\,7\\ \\to\\ d=1{,}5$'),
        mistake: {
            wrong: say('$17,\\,13,\\,9$ segidan, $d=4$, zenbakiak lauko jauzietan aldatzen direlako.', 'En $17,\\,13,\\,9$, $d=4$, porque los números cambian de 4 en 4.', 'في $17,\\,13,\\,9$ يكون $d=4$ لأن الأعداد تتغير بأربعة.', 'In $17,\\,13,\\,9$, $d=4$, because the numbers change by 4 each time.'),
            right: say('Diferentzia hurrengoa ken aurrekoa da: $13-17=-4$. Zeinuak esaten du jaisten dela.', 'La diferencia es el siguiente menos el anterior: $13-17=-4$. El signo dice que baja.', 'الفرق هو التالي ناقص السابق: $13-17=-4$. والإشارة تدل على النقصان.', 'The difference is the next term minus the previous one: $13-17=-4$. The sign says it is going down.')
        },
        takeaway: say('$D=A_{N}-A_{N-1}$, beti bera. $D>0$ gorakorra, $D<0$ beherakorra.', '$D=A_{N}-A_{N-1}$, siempre la misma. $D>0$ creciente, $D<0$ decreciente.', '$D=A_{N}-A_{N-1}$ ثابت دائمًا. $D>0$ تزايدية و$D<0$ تناقصية.', '$D=A_{N}-A_{N-1}$, always the same. $D>0$ increasing, $D<0$ decreasing.'),
        figure: (language) => <JumpsFigure language={language} />
    },
    {
        id: 'arith-general',
        stage: 'arithmetic',
        title: say('Progresio aritmetikoaren gai orokorra', 'Término general de una progresión aritmética', 'الحد العام للمتتالية الحسابية', 'General term of an arithmetic progression'),
        goal: say('$a_{n}=a_{1}+(n-1)\\cdot d$ formula erabiltzea gaiak eta lekuak kalkulatzeko.', 'Usar la fórmula $a_{n}=a_{1}+(n-1)\\cdot d$ para calcular términos y lugares.', 'استعمال الصيغة $a_{n}=a_{1}+(n-1)\\cdot d$ لحساب الحدود والرتب.', 'Use the formula $a_{n}=a_{1}+(n-1)\\cdot d$ to work out terms and positions.'),
        explanation: say(
            '$a_{1}$ gaitik $a_{n}$ gaira iristeko $n-1$ salto egiten dira, eta salto bakoitza $d$ da. Horregatik, $a_{n}=a_{1}+(n-1)\\cdot d$. Adibidez, $a_{1}=7$ eta $d=3$ badira, $a_{20}=7+19\\cdot 3=64$. Formula sinplifika daiteke: $a_{n}=7+3n-3=3n+4$. Gai orokorra lehen graduko adierazpena da beti, eta $n$ zenbakiaren koefizientea $d$ da.',
            'Para ir de $a_{1}$ a $a_{n}$ se dan $n-1$ saltos, y cada salto mide $d$. Por eso, $a_{n}=a_{1}+(n-1)\\cdot d$. Por ejemplo, si $a_{1}=7$ y $d=3$, $a_{20}=7+19\\cdot 3=64$. La fórmula se puede simplificar: $a_{n}=7+3n-3=3n+4$. El término general siempre es una expresión de primer grado, y el coeficiente de $n$ es $d$.',
            'للانتقال من $a_{1}$ إلى $a_{n}$ نقفز $n-1$ قفزة، وطول كل قفزة $d$. لذلك $a_{n}=a_{1}+(n-1)\\cdot d$. مثلًا إذا كان $a_{1}=7$ و$d=3$ فإن $a_{20}=7+19\\cdot 3=64$. ويمكن تبسيط الصيغة: $a_{n}=7+3n-3=3n+4$. والحد العام دائمًا عبارة من الدرجة الأولى ومعامل $n$ فيها هو $d$.',
            'To go from $a_{1}$ to $a_{n}$ you make $n-1$ jumps, and each jump is $d$. That is why $a_{n}=a_{1}+(n-1)\\cdot d$. For example, if $a_{1}=7$ and $d=3$, $a_{20}=7+19\\cdot 3=64$. The formula can be simplified: $a_{n}=7+3n-3=3n+4$. The general term is always a first-degree expression, and the coefficient of $n$ is $d$.'
        ),
        problem: say('$a_{1}=12$ eta $d=-5$. Kalkulatu $a_{15}$ eta gai orokorra.', '$a_{1}=12$ y $d=-5$. Calcula $a_{15}$ y el término general.', '$a_{1}=12$ و$d=-5$. احسب $a_{15}$ والحد العام.', '$a_{1}=12$ and $d=-5$. Work out $a_{15}$ and the general term.'),
        stepsKind: 'steps',
        steps: [
            { text: say('14 salto daude.', 'Hay 14 saltos.', 'هناك 14 قفزة.', 'There are 14 jumps.'), math: same('$a_{15}=12+14\\cdot(-5)=-58$') },
            { text: say('Gai orokorra.', 'El término general.', 'الحد العام.', 'The general term.'), math: same('$a_{n}=12+(n-1)\\cdot(-5)$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$a_{n}=17-5n$') }
        ],
        example: same('$a_{1}=4,\\ d=6\\ \\to\\ a_{10}=4+9\\cdot 6=58$'),
        mistake: {
            wrong: say('$a_{1}=7$ eta $d=3$: $a_{20}=7+20\\cdot 3=67$.', '$a_{1}=7$ y $d=3$: $a_{20}=7+20\\cdot 3=67$.', '$a_{1}=7$ و$d=3$: $a_{20}=7+20\\cdot 3=67$.', '$a_{1}=7$ and $d=3$: $a_{20}=7+20\\cdot 3=67$.'),
            right: say('Lehen gaitik hogeigarrenera 19 salto daude, ez 20: $a_{20}=7+19\\cdot 3=64$.', 'Del primero al vigésimo hay 19 saltos, no 20: $a_{20}=7+19\\cdot 3=64$.', 'من الأول إلى العشرين 19 قفزة لا 20: $a_{20}=7+19\\cdot 3=64$.', 'From the first to the twentieth there are 19 jumps, not 20: $a_{20}=7+19\\cdot 3=64$.')
        },
        takeaway: say('$A_{N}=A_{1}+(N-1)\\cdot D$: $N-1$ salto.', '$A_{N}=A_{1}+(N-1)\\cdot D$: $N-1$ saltos.', '$A_{N}=A_{1}+(N-1)\\cdot D$: $N-1$ قفزة.', '$A_{N}=A_{1}+(N-1)\\cdot D$: $N-1$ jumps.'),
        figure: (language) => <JumpsFigure language={language} />
    },
    {
        id: 'arith-find',
        stage: 'arithmetic',
        title: say('Bi gaitik progresiora', 'De dos términos a la progresión', 'من حدّين إلى المتتالية', 'From two terms to the progression'),
        goal: say('Bi gai ezagututa, diferentzia, lehen gaia eta gai orokorra aurkitzea, eta gai bat zein lekutan dagoen jakitea.', 'Conocidos dos términos, hallar la diferencia, el primer término y el término general, y saber en qué lugar está un término.', 'معرفة حدّين لإيجاد الفرق والحد الأول والحد العام، ومعرفة رتبة حد ما.', 'Given two terms, find the common difference, the first term and the general term, and the position of a term.'),
        explanation: say(
            'Bi gai ezagutzen badira, haien artean dauden saltoak zenbatu: $a_{3}$ gaitik $a_{8}$ gaira 5 salto daude. Beraz, $d=\\frac{a_{8}-a_{3}}{5}$. $d$ ezagututa, atzera egin $a_{1}$ lortzeko: $a_{1}=a_{3}-2d$. Gai bat zein lekutan dagoen jakiteko, berdindu gai orokorra balio horri eta ebatzi $n$: zenbaki arrunta ateratzen ez bada, balio hori ez dago progresioan.',
            'Si se conocen dos términos, cuenta los saltos que hay entre ellos: de $a_{3}$ a $a_{8}$ hay 5 saltos. Así, $d=\\frac{a_{8}-a_{3}}{5}$. Conocida $d$, se retrocede para obtener $a_{1}$: $a_{1}=a_{3}-2d$. Para saber en qué lugar está un término, se iguala el término general a ese valor y se despeja $n$: si no sale un número natural, ese valor no está en la progresión.',
            'إذا عُرف حدّان فعُدّ القفزات بينهما: من $a_{3}$ إلى $a_{8}$ خمس قفزات. إذن $d=\\frac{a_{8}-a_{3}}{5}$. وبعد معرفة $d$ نرجع للحصول على $a_{1}$: $a_{1}=a_{3}-2d$. ولمعرفة رتبة حد نساوي الحد العام بقيمته ونستخرج $n$: إذا لم يخرج عددًا طبيعيًا فتلك القيمة ليست في المتتالية.',
            'If two terms are known, count the jumps between them: from $a_{3}$ to $a_{8}$ there are 5 jumps. So $d=\\frac{a_{8}-a_{3}}{5}$. Once you know $d$, go back to get $a_{1}$: $a_{1}=a_{3}-2d$. To find the position of a term, set the general term equal to that value and solve for $n$: if you do not get a natural number, that value is not in the progression.'
        ),
        problem: same('$a_{3}=11,\\ a_{8}=31$'),
        stepsKind: 'steps',
        steps: [
            { text: say('5 salto: $d$.', '5 saltos: $d$.', 'خمس قفزات: $d$.', '5 jumps: $d$.'), math: same('$d=\\frac{31-11}{5}=4$') },
            { text: say('Atzera bi salto: $a_{1}$.', 'Dos saltos atrás: $a_{1}$.', 'قفزتان إلى الوراء: $a_{1}$.', 'Two jumps back: $a_{1}$.'), math: same('$a_{1}=11-2\\cdot 4=3$') },
            { text: say('Gai orokorra.', 'El término general.', 'الحد العام.', 'The general term.'), math: same('$a_{n}=3+(n-1)\\cdot 4=4n-1$') }
        ],
        example: same('$4n-1=99\\ \\to\\ n=25$'),
        mistake: {
            wrong: say('$a_{3}=11$ eta $a_{8}=31$: $d=\\frac{31-11}{8-3+1}=\\frac{20}{6}$.', '$a_{3}=11$ y $a_{8}=31$: $d=\\frac{31-11}{8-3+1}=\\frac{20}{6}$.', '$a_{3}=11$ و$a_{8}=31$: $d=\\frac{31-11}{8-3+1}=\\frac{20}{6}$.', '$a_{3}=11$ and $a_{8}=31$: $d=\\frac{31-11}{8-3+1}=\\frac{20}{6}$.'),
            right: say('Saltoak zenbatzen dira, ez gaiak: hirugarren lekutik zortzigarrenera $8-3=5$ salto, $d=4$.', 'Se cuentan los saltos, no los términos: del lugar 3 al 8 hay $8-3=5$ saltos, $d=4$.', 'تُعدّ القفزات لا الحدود: من الرتبة 3 إلى 8 هناك $8-3=5$ قفزات، $d=4$.', 'Count the jumps, not the terms: from position 3 to 8 there are $8-3=5$ jumps, $d=4$.')
        },
        takeaway: say('$D=\\frac{A_{M}-A_{K}}{M-K}$: kendura zati salto kopurua.', '$D=\\frac{A_{M}-A_{K}}{M-K}$: la diferencia entre el número de saltos.', '$D=\\frac{A_{M}-A_{K}}{M-K}$: الفرق على عدد القفزات.', '$D=\\frac{A_{M}-A_{K}}{M-K}$: the difference divided by the number of jumps.'),
        figure: (language) => <JumpsFigure language={language} />
    },

    /* ---------- 3. Sums of arithmetic progressions ---------- */
    {
        id: 'gauss',
        stage: 'sums',
        title: say('Gaussen trikimailua', 'El truco de Gauss', 'حيلة غاوس', 'Gauss\'s trick'),
        goal: say('1 eta $n$ arteko zenbakiak eta antzeko segidak azkar batzea, muturretako bikoteak eginez.', 'Sumar deprisa los números de 1 a $n$ y otras sucesiones parecidas emparejando los extremos.', 'جمع الأعداد من 1 إلى $n$ ومتتاليات مشابهة بسرعة بمزاوجة الطرفين.', 'Add up the numbers from 1 to $n$ and similar sequences quickly by pairing the ends.'),
        explanation: say(
            'Kontatzen da Gauss txikiak segundo gutxitan batu zituela 1 eta 100 arteko zenbaki guztiak. Bikoteak egin zituen: $1+100$, $2+99$, $3+98\\ldots$ eta bikote guztiek 101 balio dute. 50 bikote daude, beraz batura $50\\cdot 101=5050$ da. Progresio aritmetiko guztietan gertatzen da: lehenengoa eta azkena, bigarrena eta azkenaurrekoa… beti batura bera ematen dute. Bikoteen kopurua gai kopuruaren erdia da.',
            'Se cuenta que Gauss, de niño, sumó en unos segundos los números del 1 al 100. Hizo parejas: $1+100$, $2+99$, $3+98\\ldots$ y todas las parejas valen 101. Hay 50 parejas, así que la suma es $50\\cdot 101=5050$. Pasa en todas las progresiones aritméticas: el primero y el último, el segundo y el penúltimo… siempre suman lo mismo. El número de parejas es la mitad del número de términos.',
            'يُروى أن غاوس جمع وهو طفل الأعداد من 1 إلى 100 في ثوانٍ. كوّن أزواجًا: $1+100$ و$2+99$ و$3+98\\ldots$ وكل زوج يساوي 101. هناك 50 زوجًا، فالمجموع $50\\cdot 101=5050$. ويحدث ذلك في كل متتالية حسابية: الأول والأخير، والثاني وما قبل الأخير… مجموعها واحد دائمًا. وعدد الأزواج نصف عدد الحدود.',
            'The story goes that Gauss, as a child, added the numbers from 1 to 100 in a few seconds. He made pairs: $1+100$, $2+99$, $3+98\\ldots$ and every pair is 101. There are 50 pairs, so the sum is $50\\cdot 101=5050$. It happens in every arithmetic progression: the first and the last, the second and the second-to-last… always add up to the same. The number of pairs is half the number of terms.'
        ),
        problem: say('$1+2+3+\\cdots+40$', '$1+2+3+\\cdots+40$', '$1+2+3+\\cdots+40$', '$1+2+3+\\cdots+40$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bikote bakoitza.', 'Cada pareja.', 'كل زوج.', 'Each pair.'), math: same('$1+40=2+39=41$') },
            { text: say('Bikote kopurua.', 'Número de parejas.', 'عدد الأزواج.', 'Number of pairs.'), math: same('$40\\mathbin{:}2=20$') },
            { text: say('Batura.', 'La suma.', 'المجموع.', 'The sum.'), math: same('$20\\cdot 41=820$') }
        ],
        example: same('$2+4+6+\\cdots+20=5\\cdot 22=110$'),
        mistake: {
            wrong: say('$1+2+\\cdots+40$: 40 bikote daude, beraz $40\\cdot 41=1640$.', '$1+2+\\cdots+40$: hay 40 parejas, así que $40\\cdot 41=1640$.', '$1+2+\\cdots+40$: هناك 40 زوجًا، إذن $40\\cdot 41=1640$.', '$1+2+\\cdots+40$: there are 40 pairs, so $40\\cdot 41=1640$.'),
            right: say('40 gai daude, eta bikote bakoitzak bi hartzen ditu: 20 bikote. $20\\cdot 41=820$.', 'Hay 40 términos, y cada pareja coge dos: 20 parejas. $20\\cdot 41=820$.', 'هناك 40 حدًا وكل زوج يأخذ حدّين: 20 زوجًا. $20\\cdot 41=820$.', 'There are 40 terms, and each pair takes two: 20 pairs. $20\\cdot 41=820$.')
        },
        takeaway: say('$1+2+\\cdots+N=\\frac{N\\cdot(N+1)}{2}$', '$1+2+\\cdots+N=\\frac{N\\cdot(N+1)}{2}$', '$1+2+\\cdots+N=\\frac{N\\cdot(N+1)}{2}$', '$1+2+\\cdots+N=\\frac{N\\cdot(N+1)}{2}$'),
        figure: (language) => <GaussFigure language={language} />
    },
    {
        id: 'arith-sum',
        stage: 'sums',
        title: say('Progresio aritmetikoaren $n$ gaien batura', 'Suma de $n$ términos de una progresión aritmética', 'مجموع $n$ حدًا من متتالية حسابية', 'Sum of $n$ terms of an arithmetic progression'),
        goal: say('$S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$ formula erabiltzea.', 'Usar la fórmula $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$.', 'استعمال الصيغة $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$.', 'Use the formula $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$.'),
        explanation: say(
            'Gaussen ideia formula bihurtzen da: progresioa bera alderantziz idatzi eta bien azpian batzen bada, zutabe bakoitzak $a_{1}+a_{n}$ balio du, eta $n$ zutabe daude. Hori batura bikoitza da, beraz $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$. $a_{n}$ ezagutzen ez bada, lehenik kalkulatu gai orokorrarekin. Formula honek gai kopuru bikoitiarekin zein bakoitiarekin balio du.',
            'La idea de Gauss se convierte en fórmula: si se escribe la progresión al revés debajo de ella misma y se suma, cada columna vale $a_{1}+a_{n}$, y hay $n$ columnas. Eso es el doble de la suma, así que $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$. Si no se conoce $a_{n}$, primero se calcula con el término general. La fórmula vale tanto con un número par de términos como impar.',
            'تتحول فكرة غاوس إلى صيغة: إذا كتبنا المتتالية معكوسة تحت نفسها وجمعنا، كان كل عمود يساوي $a_{1}+a_{n}$ وعدد الأعمدة $n$. وهذا ضعف المجموع، إذن $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$. وإذا لم يُعرف $a_{n}$ نحسبه أولًا بالحد العام. والصيغة صالحة لعدد زوجي أو فردي من الحدود.',
            'Gauss\'s idea becomes a formula: if you write the progression backwards under itself and add, each column is $a_{1}+a_{n}$, and there are $n$ columns. That is twice the sum, so $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$. If you do not know $a_{n}$, work it out first with the general term. The formula works for both an even and an odd number of terms.'
        ),
        problem: say('$5,\\,8,\\,11,\\ldots$ progresioaren lehen 20 gaien batura.', 'Suma de los 20 primeros términos de $5,\\,8,\\,11,\\ldots$', 'مجموع الحدود العشرين الأولى من $5,\\,8,\\,11,\\ldots$', 'Sum of the first 20 terms of $5,\\,8,\\,11,\\ldots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Azken gaia.', 'El último término.', 'الحد الأخير.', 'The last term.'), math: same('$a_{20}=5+19\\cdot 3=62$') },
            { text: say('Formula.', 'La fórmula.', 'الصيغة.', 'The formula.'), math: same('$S_{20}=\\frac{(5+62)\\cdot 20}{2}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$S_{20}=67\\cdot 10=670$') }
        ],
        example: same('$S_{7}=\\frac{(2+20)\\cdot 7}{2}=77$'),
        mistake: {
            wrong: say('$S_{20}=(5+62)\\cdot 20=1340$.', '$S_{20}=(5+62)\\cdot 20=1340$.', '$S_{20}=(5+62)\\cdot 20=1340$.', '$S_{20}=(5+62)\\cdot 20=1340$.'),
            right: say('Hori batura bikoitza da (progresioa bi aldiz). Zatitu 2 zenbakiaz: $S_{20}=670$.', 'Eso es el doble de la suma (la progresión dos veces). Divide entre 2: $S_{20}=670$.', 'هذا ضعف المجموع (المتتالية مرتين). اقسم على 2: $S_{20}=670$.', 'That is twice the sum (the progression twice). Divide by 2: $S_{20}=670$.')
        },
        takeaway: say('$S_{N}=\\frac{(A_{1}+A_{N})\\cdot N}{2}$', '$S_{N}=\\frac{(A_{1}+A_{N})\\cdot N}{2}$', '$S_{N}=\\frac{(A_{1}+A_{N})\\cdot N}{2}$', '$S_{N}=\\frac{(A_{1}+A_{N})\\cdot N}{2}$'),
        figure: (language) => <GaussFigure language={language} />
    },
    {
        id: 'arith-problems',
        stage: 'sums',
        title: say('Problemak progresio aritmetikoekin', 'Problemas con progresiones aritméticas', 'مسائل على المتتاليات الحسابية', 'Problems with arithmetic progressions'),
        goal: say('Egoera errealak (eserlekuak, aurrezkiak, entrenamenduak) progresio aritmetiko gisa idaztea eta ebaztea.', 'Escribir y resolver situaciones reales (asientos, ahorros, entrenamientos) como progresiones aritméticas.', 'كتابة مواقف حقيقية (المقاعد والمدخرات والتدريبات) متتاليات حسابية وحلّها.', 'Write and solve real situations (seats, savings, training) as arithmetic progressions.'),
        explanation: say(
            'Egoera batean kopuru bat beti zenbaki beraz handitzen edo txikitzen bada, progresio aritmetiko bat dago. Lehenik erabaki zer den $a_{1}$, zer den $d$ eta zenbat gai dauden. Gero galdetu zer eskatzen den: gai bat (adibidez, hamargarren ilarako eserlekuak) ala batura (eserleku guztiak). Kontuz lehen gaiarekin: «astelehenean 2 km, eta egunero 0,5 km gehiago» bada, astelehena da $a_{1}$.',
            'Si en una situación una cantidad aumenta o disminuye siempre en el mismo número, hay una progresión aritmética. Primero decide qué es $a_{1}$, qué es $d$ y cuántos términos hay. Luego mira qué se pide: un término (por ejemplo, los asientos de la décima fila) o la suma (todos los asientos). Cuidado con el primer término: si es «el lunes 2 km, y cada día 0,5 km más», el lunes es $a_{1}$.',
            'إذا كانت كمية في موقف ما تزيد أو تنقص دائمًا بالعدد نفسه فهناك متتالية حسابية. قرّر أولًا ما هو $a_{1}$ وما هو $d$ وكم عدد الحدود. ثم انظر ماذا يُطلب: حدّ (مثل مقاعد الصف العاشر) أو مجموع (كل المقاعد). وانتبه للحد الأول: إذا كان «يوم الاثنين 2 كم وكل يوم 0.5 كم زيادة» فالاثنين هو $a_{1}$.',
            'If in a situation a quantity always goes up or down by the same number, there is an arithmetic progression. First decide what $a_{1}$ is, what $d$ is and how many terms there are. Then look at what is asked: a term (for example, the seats in the tenth row) or the sum (all the seats). Careful with the first term: if it is «on Monday 2 km, and each day 0.5 km more», Monday is $a_{1}$.'
        ),
        problem: say('Antzoki batean lehen ilarak 18 eserleku ditu, eta ilara bakoitzak aurrekoak baino 2 gehiago. 15 ilara daude. Zenbat eserleku guztira?', 'Un teatro tiene 18 asientos en la primera fila y cada fila tiene 2 más que la anterior. Hay 15 filas. ¿Cuántos asientos hay en total?', 'في مسرح 18 مقعدًا في الصف الأول وكل صف فيه مقعدان أكثر من سابقه. هناك 15 صفًا. كم مقعدًا إجمالًا؟', 'A theatre has 18 seats in the first row and each row has 2 more than the one before. There are 15 rows. How many seats are there in total?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a_{1}=18$, $d=2$, $n=15$.', '$a_{1}=18$, $d=2$, $n=15$.', '$a_{1}=18$ و$d=2$ و$n=15$.', '$a_{1}=18$, $d=2$, $n=15$.') },
            { text: say('Azken ilara.', 'La última fila.', 'الصف الأخير.', 'The last row.'), math: same('$a_{15}=18+14\\cdot 2=46$') },
            { text: say('Guztira.', 'En total.', 'المجموع.', 'In total.'), math: same('$S_{15}=\\frac{(18+46)\\cdot 15}{2}=480$') }
        ],
        example: same('$S_{10}=\\frac{(2+6{,}5)\\cdot 10}{2}=42{,}5$'),
        mistake: {
            wrong: say('Egunero 0,5 km gehiago, 10 egunez, astelehenean 2 km: azken egunean $2+10\\cdot 0{,}5=7$ km.', 'Cada día 0,5 km más, 10 días, el lunes 2 km: el último día $2+10\\cdot 0{,}5=7$ km.', 'كل يوم 0.5 كم زيادة مدة 10 أيام والاثنين 2 كم: اليوم الأخير $2+10\\cdot 0{,}5=7$ كم.', 'Each day 0.5 km more, for 10 days, 2 km on Monday: on the last day $2+10\\cdot 0{,}5=7$ km.'),
            right: say('Astelehena lehen eguna da: hamargarren egunera 9 salto. $2+9\\cdot 0{,}5=6{,}5$ km.', 'El lunes es el primer día: hasta el décimo hay 9 saltos. $2+9\\cdot 0{,}5=6{,}5$ km.', 'الاثنين هو اليوم الأول: حتى العاشر 9 قفزات. $2+9\\cdot 0{,}5=6{,}5$ كم.', 'Monday is the first day: up to the tenth there are 9 jumps. $2+9\\cdot 0{,}5=6{,}5$ km.')
        },
        takeaway: say('Erabaki $A_{1}$, $D$ eta $N$; gero, gai bat ala batura.', 'Decide $A_{1}$, $D$ y $N$; después, un término o la suma.', 'حدّد $A_{1}$ و$D$ و$N$؛ ثم حدًا أو مجموعًا.', 'Decide $A_{1}$, $D$ and $N$; then a term or the sum.'),
        figure: (language) => <GaussFigure language={language} />
    },

    /* ---------- 4. Geometric progressions ---------- */
    {
        id: 'geo-ratio',
        stage: 'geometric',
        title: say('Progresio geometrikoa eta arrazoia', 'Progresión geométrica y razón', 'المتتالية الهندسية والأساس', 'Geometric progression and common ratio'),
        goal: say('Progresio geometrikoak ezagutzea eta haien arrazoia kalkulatzea.', 'Reconocer progresiones geométricas y calcular su razón.', 'التعرّف على المتتاليات الهندسية وحساب أساسها.', 'Recognise geometric progressions and work out their common ratio.'),
        explanation: say(
            'Progresio geometriko batean, gai bakoitza aurrekoa zenbaki beraz biderkatuz lortzen da: zenbaki hori $r$ arrazoia da, $r=\\frac{a_{n}}{a_{n-1}}$. $r>1$ bada eta gaiak positiboak, oso azkar hazten da; $0<r<1$ bada, txikitzen doa eta zerora hurbiltzen; $r<0$ bada, zeinuak txandakatzen dira. Egiaztatzeko, zatitu ondoz ondoko gaiak: zatidura beti bera bada, geometrikoa da.',
            'En una progresión geométrica cada término se obtiene multiplicando el anterior por el mismo número: ese número es la razón $r$, $r=\\frac{a_{n}}{a_{n-1}}$. Si $r>1$ y los términos son positivos, crece muy deprisa; si $0<r<1$, va disminuyendo y se acerca a cero; si $r<0$, los signos se alternan. Para comprobarlo, divide términos consecutivos: si el cociente es siempre el mismo, es geométrica.',
            'في المتتالية الهندسية نحصل على كل حد بضرب سابقه في العدد نفسه: هذا العدد هو الأساس $r$ حيث $r=\\frac{a_{n}}{a_{n-1}}$. إذا كان $r>1$ والحدود موجبة فإنها تكبر بسرعة كبيرة، وإذا كان $0<r<1$ فإنها تصغر وتقترب من الصفر، وإذا كان $r<0$ تتناوب الإشارات. للتحقق اقسم الحدود المتتالية: إذا كان حاصل القسمة ثابتًا فهي هندسية.',
            'In a geometric progression each term is found by multiplying the one before by the same number: that number is the common ratio $r$, $r=\\frac{a_{n}}{a_{n-1}}$. If $r>1$ and the terms are positive, it grows very fast; if $0<r<1$, it shrinks and gets closer to zero; if $r<0$, the signs alternate. To check, divide consecutive terms: if the quotient is always the same, it is geometric.'
        ),
        problem: same('$48,\\,24,\\,12,\\,6,\\ldots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu ondoz ondoko gaiak.', 'Divide términos consecutivos.', 'اقسم الحدود المتتالية.', 'Divide consecutive terms.'), math: same('$\\frac{24}{48}=\\frac{12}{24}=\\frac{1}{2}$') },
            { text: say('Geometrikoa, $r=\\frac{1}{2}$.', 'Geométrica, $r=\\frac{1}{2}$.', 'هندسية، $r=\\frac{1}{2}$.', 'Geometric, $r=\\frac{1}{2}$.') },
            { text: say('Hurrengoa.', 'El siguiente.', 'الحد التالي.', 'The next term.'), math: same('$6\\cdot\\frac{1}{2}=3$') }
        ],
        example: same('$3,\\,-6,\\,12,\\,-24\\ \\to\\ r=-2$'),
        mistake: {
            wrong: say('$48,\\,24,\\,12$ segidan, $r=-24$, 24 kentzen delako.', 'En $48,\\,24,\\,12$, $r=-24$, porque se resta 24.', 'في $48,\\,24,\\,12$ يكون $r=-24$ لأننا نطرح 24.', 'In $48,\\,24,\\,12$, $r=-24$, because 24 is subtracted.'),
            right: say('Arrazoia zatidura da, ez kendura (kendura ez da beti bera: 24, 12…). $r=\\frac{24}{48}=\\frac{1}{2}$.', 'La razón es un cociente, no una resta (la resta no es siempre igual: 24, 12…). $r=\\frac{24}{48}=\\frac{1}{2}$.', 'الأساس حاصل قسمة لا فرق (الفرق ليس ثابتًا: 24، 12…). $r=\\frac{24}{48}=\\frac{1}{2}$.', 'The ratio is a quotient, not a difference (the difference is not always the same: 24, 12…). $r=\\frac{24}{48}=\\frac{1}{2}$.')
        },
        takeaway: say('$R=\\frac{A_{N}}{A_{N-1}}$, beti bera. Aritmetikoan batu, geometrikoan biderkatu.', '$R=\\frac{A_{N}}{A_{N-1}}$, siempre la misma. En la aritmética se suma, en la geométrica se multiplica.', '$R=\\frac{A_{N}}{A_{N-1}}$ ثابت. في الحسابية نجمع وفي الهندسية نضرب.', '$R=\\frac{A_{N}}{A_{N-1}}$, always the same. Arithmetic adds, geometric multiplies.'),
        figure: (language) => <BounceFigure language={language} />
    },
    {
        id: 'geo-general',
        stage: 'geometric',
        title: say('Progresio geometrikoaren gai orokorra', 'Término general de una progresión geométrica', 'الحد العام للمتتالية الهندسية', 'General term of a geometric progression'),
        goal: say('$a_{n}=a_{1}\\cdot r^{n-1}$ formula erabiltzea.', 'Usar la fórmula $a_{n}=a_{1}\\cdot r^{n-1}$.', 'استعمال الصيغة $a_{n}=a_{1}\\cdot r^{n-1}$.', 'Use the formula $a_{n}=a_{1}\\cdot r^{n-1}$.'),
        explanation: say(
            '$a_{1}$ gaitik $a_{n}$ gaira $n-1$ aldiz biderkatzen da $r$ zenbakiaz, eta biderketa errepikatu hori berretura bat da: $a_{n}=a_{1}\\cdot r^{n-1}$. Adibidez, $a_{1}=3$ eta $r=2$ badira, $a_{6}=3\\cdot 2^{5}=96$. Kontuz ordenarekin: lehenik berretura, gero biderketa. $3\\cdot 2^{5}$ ez da $6^{5}$.',
            'De $a_{1}$ a $a_{n}$ se multiplica $n-1$ veces por $r$, y esa multiplicación repetida es una potencia: $a_{n}=a_{1}\\cdot r^{n-1}$. Por ejemplo, si $a_{1}=3$ y $r=2$, $a_{6}=3\\cdot 2^{5}=96$. Cuidado con el orden: primero la potencia, después el producto. $3\\cdot 2^{5}$ no es $6^{5}$.',
            'من $a_{1}$ إلى $a_{n}$ نضرب في $r$ عدد $n-1$ من المرات، وهذا الضرب المتكرر قوة: $a_{n}=a_{1}\\cdot r^{n-1}$. مثلًا إذا كان $a_{1}=3$ و$r=2$ فإن $a_{6}=3\\cdot 2^{5}=96$. انتبه للترتيب: القوة أولًا ثم الضرب. $3\\cdot 2^{5}$ ليست $6^{5}$.',
            'From $a_{1}$ to $a_{n}$ you multiply by $r$ $n-1$ times, and that repeated multiplication is a power: $a_{n}=a_{1}\\cdot r^{n-1}$. For example, if $a_{1}=3$ and $r=2$, $a_{6}=3\\cdot 2^{5}=96$. Careful with the order: first the power, then the product. $3\\cdot 2^{5}$ is not $6^{5}$.'
        ),
        problem: say('$a_{1}=5$ eta $r=3$. Kalkulatu $a_{5}$.', '$a_{1}=5$ y $r=3$. Calcula $a_{5}$.', '$a_{1}=5$ و$r=3$. احسب $a_{5}$.', '$a_{1}=5$ and $r=3$. Work out $a_{5}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('4 aldiz biderkatzen da.', 'Se multiplica 4 veces.', 'نضرب 4 مرات.', 'You multiply 4 times.'), math: same('$a_{5}=5\\cdot 3^{4}$') },
            { text: say('Lehenik berretura.', 'Primero la potencia.', 'القوة أولًا.', 'First the power.'), math: same('$3^{4}=81$') },
            { text: say('Gero biderketa.', 'Después el producto.', 'ثم الضرب.', 'Then the product.'), math: same('$5\\cdot 81=405$') }
        ],
        example: same('$a_{n}=64\\cdot\\left(\\frac{1}{2}\\right)^{n-1}\\ \\to\\ a_{4}=8$'),
        mistake: {
            wrong: say('$a_{1}=5$, $r=3$: $a_{5}=(5\\cdot 3)^{4}=50\\,625$.', '$a_{1}=5$, $r=3$: $a_{5}=(5\\cdot 3)^{4}=50\\,625$.', '$a_{1}=5$ و$r=3$: $a_{5}=(5\\cdot 3)^{4}=50\\,625$.', '$a_{1}=5$, $r=3$: $a_{5}=(5\\cdot 3)^{4}=50\\,625$.'),
            right: say('Berretzaileak $r$ zenbakiari bakarrik eragiten dio: $5\\cdot 3^{4}=405$.', 'El exponente solo afecta a $r$: $5\\cdot 3^{4}=405$.', 'الأس يؤثر في $r$ فقط: $5\\cdot 3^{4}=405$.', 'The exponent only applies to $r$: $5\\cdot 3^{4}=405$.')
        },
        takeaway: say('$A_{N}=A_{1}\\cdot R^{N-1}$: lehenik berretura.', '$A_{N}=A_{1}\\cdot R^{N-1}$: primero la potencia.', '$A_{N}=A_{1}\\cdot R^{N-1}$: القوة أولًا.', '$A_{N}=A_{1}\\cdot R^{N-1}$: the power first.'),
        figure: (language) => <BounceFigure language={language} />
    },
    {
        id: 'geo-find',
        stage: 'geometric',
        title: say('Bi gaitik progresio geometrikora', 'De dos términos a la progresión geométrica', 'من حدّين إلى المتتالية الهندسية', 'From two terms to the geometric progression'),
        goal: say('Bi gai ezagututa, arrazoia eta lehen gaia aurkitzea.', 'Conocidos dos términos, hallar la razón y el primer término.', 'معرفة حدّين لإيجاد الأساس والحد الأول.', 'Given two terms, find the common ratio and the first term.'),
        explanation: say(
            '$a_{2}$ gaitik $a_{5}$ gaira 3 aldiz biderkatzen da $r$ zenbakiaz, beraz $\\frac{a_{5}}{a_{2}}=r^{3}$. Zatitu bi gaiak eta atera erroa: $r^{3}=27$ bada, $r=3$. Aritmetikoetan bezala, saltoak zenbatzen dira, baina hemen salto bakoitza biderketa bat da. $r$ ezagututa, zatitu atzera $a_{1}$ lortzeko: $a_{1}=\\frac{a_{2}}{r}$.',
            'De $a_{2}$ a $a_{5}$ se multiplica 3 veces por $r$, así que $\\frac{a_{5}}{a_{2}}=r^{3}$. Se dividen los dos términos y se saca la raíz: si $r^{3}=27$, $r=3$. Como en las aritméticas, se cuentan los saltos, pero aquí cada salto es una multiplicación. Conocida $r$, se divide hacia atrás para obtener $a_{1}$: $a_{1}=\\frac{a_{2}}{r}$.',
            'من $a_{2}$ إلى $a_{5}$ نضرب في $r$ ثلاث مرات، إذن $\\frac{a_{5}}{a_{2}}=r^{3}$. نقسم الحدّين ونستخرج الجذر: إذا كان $r^{3}=27$ فإن $r=3$. وكما في الحسابية نعدّ القفزات، لكن كل قفزة هنا ضرب. وبعد معرفة $r$ نقسم رجوعًا للحصول على $a_{1}$: $a_{1}=\\frac{a_{2}}{r}$.',
            'From $a_{2}$ to $a_{5}$ you multiply by $r$ 3 times, so $\\frac{a_{5}}{a_{2}}=r^{3}$. Divide the two terms and take the root: if $r^{3}=27$, $r=3$. As with arithmetic progressions you count the jumps, but here each jump is a multiplication. Once you know $r$, divide backwards to get $a_{1}$: $a_{1}=\\frac{a_{2}}{r}$.'
        ),
        problem: same('$a_{2}=6,\\ a_{5}=162$'),
        stepsKind: 'steps',
        steps: [
            { text: say('3 salto: zatitu.', '3 saltos: divide.', 'ثلاث قفزات: اقسم.', '3 jumps: divide.'), math: same('$r^{3}=\\frac{162}{6}=27$') },
            { text: say('Erro kubikoa.', 'Raíz cúbica.', 'الجذر التكعيبي.', 'Cube root.'), math: same('$r=\\sqrt[3]{27}=3$') },
            { text: say('Lehen gaia.', 'El primer término.', 'الحد الأول.', 'The first term.'), math: same('$a_{1}=6\\mathbin{:}3=2$') }
        ],
        example: same('$a_{1}=5,\\ a_{3}=45\\ \\to\\ r^{2}=9,\\ r=\\pm 3$'),
        mistake: {
            wrong: say('$a_{2}=6$ eta $a_{5}=162$: $r=\\frac{162}{6}=27$.', '$a_{2}=6$ y $a_{5}=162$: $r=\\frac{162}{6}=27$.', '$a_{2}=6$ و$a_{5}=162$: $r=\\frac{162}{6}=27$.', '$a_{2}=6$ and $a_{5}=162$: $r=\\frac{162}{6}=27$.'),
            right: say('27 hiru biderketen ondorioa da, $r^{3}$. $r=3$.', '27 es el resultado de tres multiplicaciones, $r^{3}$. $r=3$.', '27 ناتج ثلاث عمليات ضرب، $r^{3}$. $r=3$.', '27 is the result of three multiplications, $r^{3}$. $r=3$.')
        },
        takeaway: say('$R^{M-K}=\\frac{A_{M}}{A_{K}}$: zatitu eta atera erroa.', '$R^{M-K}=\\frac{A_{M}}{A_{K}}$: divide y saca la raíz.', '$R^{M-K}=\\frac{A_{M}}{A_{K}}$: اقسم واستخرج الجذر.', '$R^{M-K}=\\frac{A_{M}}{A_{K}}$: divide and take the root.'),
        figure: (language) => <BounceFigure language={language} />
    },

    /* ---------- 5. Geometric sums ---------- */
    {
        id: 'geo-sum',
        stage: 'geo-sums',
        title: say('Progresio geometrikoaren $n$ gaien batura', 'Suma de $n$ términos de una progresión geométrica', 'مجموع $n$ حدًا من متتالية هندسية', 'Sum of $n$ terms of a geometric progression'),
        goal: say('$S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$ formula erabiltzea.', 'Usar la fórmula $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.', 'استعمال الصيغة $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.', 'Use the formula $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.'),
        explanation: say(
            'Progresio geometrikoetan ez dago Gaussen bikoterik, baina beste trikimailu bat dago: batura bider $r$ eginez gero, gai guztiak leku bat mugitzen dira. $r\\cdot S_{n}-S_{n}$ kenduz gero, ia guztiak desagertzen dira, eta $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$ geratzen da ($r\\neq 1$). Adibidez, $1+2+4+\\cdots+2^{9}=\\frac{2^{10}-1}{2-1}=1023$. Gai gutxi badira, eskuz ere batu daitezke formula egiaztatzeko.',
            'En las geométricas no hay parejas de Gauss, pero hay otro truco: al multiplicar la suma por $r$, todos los términos se desplazan un lugar. Al restar $r\\cdot S_{n}-S_{n}$ casi todos desaparecen, y queda $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$ (con $r\\neq 1$). Por ejemplo, $1+2+4+\\cdots+2^{9}=\\frac{2^{10}-1}{2-1}=1023$. Si son pocos términos, también se pueden sumar a mano para comprobar la fórmula.',
            'لا توجد أزواج غاوس في المتتالية الهندسية، لكن هناك حيلة أخرى: عند ضرب المجموع في $r$ تنتقل كل الحدود رتبة واحدة. وعند طرح $r\\cdot S_{n}-S_{n}$ تختفي كلها تقريبًا ويبقى $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$ (مع $r\\neq 1$). مثلًا $1+2+4+\\cdots+2^{9}=\\frac{2^{10}-1}{2-1}=1023$. وإذا كانت الحدود قليلة يمكن جمعها يدويًا للتحقق من الصيغة.',
            'Geometric progressions have no Gauss pairs, but there is another trick: when you multiply the sum by $r$, every term moves one place along. Subtracting $r\\cdot S_{n}-S_{n}$, almost all of them disappear, leaving $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$ (with $r\\neq 1$). For example, $1+2+4+\\cdots+2^{9}=\\frac{2^{10}-1}{2-1}=1023$. If there are only a few terms, you can also add them by hand to check the formula.'
        ),
        problem: say('$3,\\,6,\\,12,\\ldots$ progresioaren lehen 6 gaien batura.', 'Suma de los 6 primeros términos de $3,\\,6,\\,12,\\ldots$', 'مجموع الحدود الستة الأولى من $3,\\,6,\\,12,\\ldots$', 'Sum of the first 6 terms of $3,\\,6,\\,12,\\ldots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a_{1}=3$, $r=2$, $n=6$.', '$a_{1}=3$, $r=2$, $n=6$.', '$a_{1}=3$ و$r=2$ و$n=6$.', '$a_{1}=3$, $r=2$, $n=6$.') },
            { text: say('Formula.', 'La fórmula.', 'الصيغة.', 'The formula.'), math: same('$S_{6}=\\frac{3\\cdot(2^{6}-1)}{2-1}=3\\cdot 63$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$S_{6}=189$') }
        ],
        example: same('$2+6+18+54=\\frac{2\\cdot(3^{4}-1)}{2}=80$'),
        mistake: {
            wrong: say('$S_{6}=\\frac{(a_{1}+a_{6})\\cdot 6}{2}=\\frac{(3+96)\\cdot 6}{2}=297$.', '$S_{6}=\\frac{(a_{1}+a_{6})\\cdot 6}{2}=\\frac{(3+96)\\cdot 6}{2}=297$.', '$S_{6}=\\frac{(a_{1}+a_{6})\\cdot 6}{2}=\\frac{(3+96)\\cdot 6}{2}=297$.', '$S_{6}=\\frac{(a_{1}+a_{6})\\cdot 6}{2}=\\frac{(3+96)\\cdot 6}{2}=297$.'),
            right: say('Gaussen formula aritmetikoentzat da. Geometrikoan: $S_{6}=\\frac{3\\cdot(2^{6}-1)}{2-1}=189$.', 'La fórmula de Gauss es para las aritméticas. En la geométrica: $S_{6}=\\frac{3\\cdot(2^{6}-1)}{2-1}=189$.', 'صيغة غاوس للحسابية. وفي الهندسية: $S_{6}=\\frac{3\\cdot(2^{6}-1)}{2-1}=189$.', 'Gauss\'s formula is for arithmetic progressions. For a geometric one: $S_{6}=\\frac{3\\cdot(2^{6}-1)}{2-1}=189$.')
        },
        takeaway: say('$S_{N}=\\frac{A_{1}\\cdot(R^{N}-1)}{R-1}$', '$S_{N}=\\frac{A_{1}\\cdot(R^{N}-1)}{R-1}$', '$S_{N}=\\frac{A_{1}\\cdot(R^{N}-1)}{R-1}$', '$S_{N}=\\frac{A_{1}\\cdot(R^{N}-1)}{R-1}$')
    },
    {
        id: 'geo-infinite',
        stage: 'geo-sums',
        title: say('Gai infinituen batura', 'Suma de infinitos términos', 'مجموع عدد لا نهائي من الحدود', 'Sum of infinitely many terms'),
        goal: say('$|r|<1$ denean, progresio geometriko baten gai guztien batura $\\frac{a_{1}}{1-r}$ dela ulertzea eta kalkulatzea.', 'Entender y calcular que, si $|r|<1$, la suma de todos los términos de una geométrica es $\\frac{a_{1}}{1-r}$.', 'فهم وحساب أن مجموع كل حدود متتالية هندسية هو $\\frac{a_{1}}{1-r}$ عندما $|r|<1$.', 'Understand and work out that, if $|r|<1$, the sum of all the terms of a geometric progression is $\\frac{a_{1}}{1-r}$.'),
        explanation: say(
            'Karratu bat erdibitu, gero erdia berriro erdibitu, eta horrela behin eta berriz: $\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\cdots$ zatiak gero eta txikiagoak dira, eta karratua betetzen dute, baina ez dute inoiz gainditzen. Batura 1 da. $|r|<1$ denean, $r^{n}$ zerora hurbiltzen da, eta batura $S=\\frac{a_{1}}{1-r}$ zenbakira hurbiltzen da. $|r|\\geq 1$ bada, gaiak ez dira txikitzen eta batura infinitua da (edo ez dago).',
            'Parte un cuadrado por la mitad, luego vuelve a partir la mitad, y así una y otra vez: los trozos $\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\cdots$ son cada vez más pequeños y van llenando el cuadrado, pero nunca lo pasan. La suma es 1. Cuando $|r|<1$, $r^{n}$ se acerca a cero y la suma se acerca a $S=\\frac{a_{1}}{1-r}$. Si $|r|\\geq 1$, los términos no se hacen pequeños y la suma es infinita (o no existe).',
            'قسّم مربعًا نصفين ثم قسّم النصف مرة أخرى وهكذا مرارًا: القطع $\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\cdots$ تصغر شيئًا فشيئًا وتملأ المربع لكنها لا تتجاوزه أبدًا. المجموع 1. وعندما $|r|<1$ يقترب $r^{n}$ من الصفر ويقترب المجموع من $S=\\frac{a_{1}}{1-r}$. وإذا كان $|r|\\geq 1$ فالحدود لا تصغر والمجموع لا نهائي (أو غير موجود).',
            'Cut a square in half, then cut the half in half again, and so on again and again: the pieces $\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\cdots$ get smaller and smaller and fill the square, but never go past it. The sum is 1. When $|r|<1$, $r^{n}$ gets closer to zero and the sum gets closer to $S=\\frac{a_{1}}{1-r}$. If $|r|\\geq 1$, the terms do not get small and the sum is infinite (or does not exist).'
        ),
        problem: same('$12+4+\\frac{4}{3}+\\cdots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Arrazoia.', 'La razón.', 'الأساس.', 'The ratio.'), math: same('$r=\\frac{4}{12}=\\frac{1}{3}$') },
            { text: say('$|r|<1$: batura badago.', '$|r|<1$: la suma existe.', '$|r|<1$: المجموع موجود.', '$|r|<1$: the sum exists.') },
            { text: say('Formula.', 'La fórmula.', 'الصيغة.', 'The formula.'), math: same('$S=\\frac{12}{1-\\frac{1}{3}}=18$') }
        ],
        example: same('$0{,}3+0{,}03+0{,}003+\\cdots=\\frac{0{,}3}{0{,}9}=\\frac{1}{3}$'),
        mistake: {
            wrong: say('$5+10+20+\\cdots$ batura: $\\frac{5}{1-2}=-5$.', 'La suma $5+10+20+\\cdots$: $\\frac{5}{1-2}=-5$.', 'المجموع $5+10+20+\\cdots$: $\\frac{5}{1-2}=-5$.', 'The sum $5+10+20+\\cdots$: $\\frac{5}{1-2}=-5$.'),
            right: say('Formula $|r|<1$ denean bakarrik da baliozkoa. Hemen $r=2$: gaiak hazi egiten dira eta batura infinitua da.', 'La fórmula solo vale si $|r|<1$. Aquí $r=2$: los términos crecen y la suma es infinita.', 'الصيغة صالحة فقط إذا $|r|<1$. وهنا $r=2$: الحدود تكبر والمجموع لا نهائي.', 'The formula only works if $|r|<1$. Here $r=2$: the terms grow and the sum is infinite.')
        },
        takeaway: say('$|R|<1$ bada: $S=\\frac{A_{1}}{1-R}$.', 'Si $|R|<1$: $S=\\frac{A_{1}}{1-R}$.', 'إذا $|R|<1$: $S=\\frac{A_{1}}{1-R}$.', 'If $|R|<1$: $S=\\frac{A_{1}}{1-R}$.'),
        figure: (language) => <HalvesFigure language={language} />
    },
    {
        id: 'geo-problems',
        stage: 'geo-sums',
        title: say('Hazkunde geometrikoa', 'Crecimiento geométrico', 'النمو الهندسي', 'Geometric growth'),
        goal: say('Hazkunde edo beherakada esponentzialeko egoerak (bakterioak, interes konposatua, errebotea) progresio geometriko gisa ebaztea.', 'Resolver situaciones de crecimiento o decrecimiento exponencial (bacterias, interés compuesto, rebotes) como progresiones geométricas.', 'حلّ مواقف النمو أو الاضمحلال الأسي (البكتيريا والفائدة المركّبة والارتداد) متتالياتٍ هندسية.', 'Solve situations of exponential growth or decay (bacteria, compound interest, bouncing) as geometric progressions.'),
        explanation: say(
            'Kopuru bat aldi bakoitzean ehuneko berean hazten edo txikitzen bada, progresio geometriko bat dago: % 5 hazteak $r=1{,}05$ esan nahi du, eta % 20 galtzeak $r=0{,}8$. Bakterioak orduro bikoizten badira, $r=2$. Pilota batek bere altueraren $\\frac{3}{4}$ berreskuratzen badu, $r=\\frac{3}{4}$. Erabaki ondo zein den $a_{1}$: hasierako kopurua «0. aldia» bada, $n$ alditan $a_{1}\\cdot r^{n}$ izango da.',
            'Si una cantidad crece o disminuye cada vez en el mismo porcentaje, hay una progresión geométrica: crecer un 5 % significa $r=1{,}05$, y perder un 20 %, $r=0{,}8$. Si las bacterias se duplican cada hora, $r=2$. Si una pelota recupera $\\frac{3}{4}$ de su altura, $r=\\frac{3}{4}$. Decide bien cuál es $a_{1}$: si la cantidad inicial es «el momento 0», al cabo de $n$ veces habrá $a_{1}\\cdot r^{n}$.',
            'إذا كبرت كمية أو صغرت كل مرة بالنسبة المئوية نفسها فهناك متتالية هندسية: النمو 5٪ يعني $r=1{,}05$ وخسارة 20٪ تعني $r=0{,}8$. وإذا تضاعفت البكتيريا كل ساعة فإن $r=2$. وإذا استعادت كرة $\\frac{3}{4}$ من ارتفاعها فإن $r=\\frac{3}{4}$. حدّد جيدًا ما هو $a_{1}$: إذا كانت الكمية الأولى «اللحظة 0» فبعد $n$ مرة تكون $a_{1}\\cdot r^{n}$.',
            'If a quantity grows or shrinks by the same percentage each time, there is a geometric progression: growing by 5% means $r=1{,}05$, and losing 20% means $r=0{,}8$. If bacteria double every hour, $r=2$. If a ball gets back $\\frac{3}{4}$ of its height, $r=\\frac{3}{4}$. Decide carefully what $a_{1}$ is: if the starting amount is «time 0», after $n$ steps there will be $a_{1}\\cdot r^{n}$.'
        ),
        problem: say('Kultibo batean 500 bakterio daude, eta orduro bikoizten dira. Zenbat egongo dira 6 ordu barru?', 'En un cultivo hay 500 bacterias y se duplican cada hora. ¿Cuántas habrá dentro de 6 horas?', 'في مزرعة 500 بكتيريا تتضاعف كل ساعة. كم سيكون عددها بعد 6 ساعات؟', 'A culture has 500 bacteria, and they double every hour. How many will there be in 6 hours?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$r=2$; orain 0. ordua da.', '$r=2$; ahora es la hora 0.', '$r=2$؛ الآن الساعة 0.', '$r=2$; now is hour 0.') },
            { text: say('6 bider bikoiztu.', 'Se duplica 6 veces.', 'تتضاعف 6 مرات.', 'It doubles 6 times.'), math: same('$500\\cdot 2^{6}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$500\\cdot 64=32\\,000$') }
        ],
        example: same('$1000\\cdot 1{,}05^{2}=1102{,}5$'),
        mistake: {
            wrong: say('500 bakterio, orduro bikoiztuz, 6 ordu: $500\\cdot 2\\cdot 6=6000$.', '500 bacterias que se duplican cada hora, 6 horas: $500\\cdot 2\\cdot 6=6000$.', '500 بكتيريا تتضاعف كل ساعة مدة 6 ساعات: $500\\cdot 2\\cdot 6=6000$.', '500 bacteria doubling every hour, 6 hours: $500\\cdot 2\\cdot 6=6000$.'),
            right: say('Ordu bakoitzean bider 2 egiten da: hori berretura da, ez biderketa bakarra. $500\\cdot 2^{6}=32\\,000$.', 'Cada hora se multiplica por 2: eso es una potencia, no un solo producto. $500\\cdot 2^{6}=32\\,000$.', 'كل ساعة نضرب في 2: هذه قوة لا ضرب واحد. $500\\cdot 2^{6}=32\\,000$.', 'Each hour you multiply by 2: that is a power, not a single product. $500\\cdot 2^{6}=32\\,000$.')
        },
        takeaway: say('Ehuneko berean aldatzen bada: $R=1\\pm\\frac{P}{100}$ eta $A_{1}\\cdot R^{N}$.', 'Si cambia en el mismo porcentaje: $R=1\\pm\\frac{P}{100}$ y $A_{1}\\cdot R^{N}$.', 'إذا تغيّرت بالنسبة نفسها: $R=1\\pm\\frac{P}{100}$ و$A_{1}\\cdot R^{N}$.', 'If it changes by the same percentage: $R=1\\pm\\frac{P}{100}$ and $A_{1}\\cdot R^{N}$.'),
        figure: (language) => <BounceFigure language={language} />
    }
]
