import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { BachSequencesTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Segidak · Batxilergoa 1 · Zientziak — what each lesson tells: the new
   words (definitions), a short explanation, the example as an exercise
   («Another example»), the key words in four languages and, in four
   lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics. The example uses numbers of its
   own, never those of «Let's solve», of «Check it» or of the typical
   mistake. Arabic writes the decimal point ({,} becomes .). Tests in
   tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachSequencesLessonTexts: Record<BachSequencesTopicId, LessonTexts> = {
    /* ---------- 1. Sequences ---------- */
    terms: {
        definitions: [
            {
                term: say('Segida', 'Sucesión', 'المتتالية', 'Sequence'),
                meaning: say('Zenbakien zerrenda ordenatua: $a_1, a_2, a_3,\\ldots$; $a_n$ $n$ posizioko gaia da.', 'Lista ordenada de números: $a_1, a_2, a_3,\\ldots$; $a_n$ es el término del lugar $n$.', 'قائمة مرتّبة من الأعداد: $a_1, a_2, a_3,\\ldots$، و$a_n$ هو الحد ذو الرتبة $n$.', 'An ordered list of numbers: $a_1, a_2, a_3,\\ldots$; $a_n$ is the term in place $n$.')
            }
        ],
        vocabulary: [
            say('gaia', 'término', 'الحد', 'term'),
            say('posizioa', 'lugar', 'الرتبة', 'place')
        ],
        explanation: say(
            'Segida bat zenbakien zerrenda infinitu eta ordenatua da. $a_n$ gai orokorra edozein gai ematen duen formula da: $a_{20}$ lortzeko, $n$ ordez 20 jartzen da. Alderantziz, gai orokorra aurkitzeko, begiratu zer erlazio dagoen gai bakoitzaren eta bere posizioaren artean: $3, 6, 9, 12,\\ldots$ segida $a_n=3n$ da.',
            'Una sucesión es una lista infinita y ordenada de números. El término general $a_n$ es una fórmula que da cualquier término: para $a_{20}$, se sustituye $n$ por 20. Al revés, para encontrar el término general se mira qué relación hay entre cada término y su lugar: $3, 6, 9, 12,\\ldots$ es $a_n=3n$.',
            'المتتالية قائمة لا نهائية ومرتّبة من الأعداد. الحد العام $a_n$ صيغة تعطي أي حد: للحصول على $a_{20}$ نعوّض $n$ بالعدد 20. وبالعكس، لإيجاد الحد العام ننظر إلى العلاقة بين كل حد ورتبته: $3, 6, 9, 12,\\ldots$ هي $a_n=3n$.',
            'A sequence is an infinite, ordered list of numbers. The general term $a_n$ is a formula that gives any term: for $a_{20}$, replace $n$ by 20. The other way round, to find the general term, look at how each term relates to its place: $3, 6, 9, 12,\\ldots$ is $a_n=3n$.'
        ),
        examplePrompt: say('Aurkitu $\\frac{1}{4}, \\frac{2}{5}, \\frac{3}{6}, \\frac{4}{7},\\ldots$ segidaren gai orokorra.', 'Halla el término general de $\\frac{1}{4}, \\frac{2}{5}, \\frac{3}{6}, \\frac{4}{7},\\ldots$', 'أوجد الحد العام للمتتالية $\\frac{1}{4}, \\frac{2}{5}, \\frac{3}{6}, \\frac{4}{7},\\ldots$', 'Find the general term of $\\frac{1}{4}, \\frac{2}{5}, \\frac{3}{6}, \\frac{4}{7},\\ldots$'),
        example: same('$\\begin{gathered}a_n=\\frac{n}{n+3}\\\\ a_5=\\frac{5}{8}\\end{gathered}$'),
        exampleAnswer: say('Zenbakitzailea posizioa da, eta izendatzailea posizioa gehi 3: $a_n=\\frac{n}{n+3}$.', 'El numerador es el lugar y el denominador, el lugar más 3: $a_n=\\frac{n}{n+3}$.', 'البسط هو الرتبة والمقام الرتبة مضافًا إليها 3: $a_n=\\frac{n}{n+3}$.', 'The numerator is the place and the denominator the place plus 3: $a_n=\\frac{n}{n+3}$.')
    },
    fibonacci: {
        definitions: [
            {
                term: say('Errepikapen-legea', 'Ley de recurrencia', 'العلاقة التراجعية', 'Recursive rule'),
                meaning: say('Gai bakoitza aurreko gaien bidez ematen duen araua; lehen gaiak ere eman behar dira.', 'Regla que da cada término a partir de los anteriores; hay que dar también los primeros.', 'قاعدة تعطي كل حد من الحدود السابقة، ويجب إعطاء الحدود الأولى أيضًا.', 'A rule that gives each term from the earlier ones; the first terms must be given too.')
            }
        ],
        vocabulary: [
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('zenbaki urrea', 'número áureo', 'العدد الذهبي', 'golden ratio')
        ],
        explanation: say(
            'Segida batzuek ez dute $a_n$ gaiarentzat formula erraz bat, aurreko gaiak erabiltzen dituen arau bat baizik. Ospetsuena Fibonaccirena da: $1, 1, 2, 3, 5, 8,\\ldots$, non gai bakoitzak aurreko biak batzen dituen. Gai bakoitza aurrekoaz zatitzen baduzu, zatidurak gero eta gehiago hurbiltzen dira zenbaki urrera, $\\varphi\\approx 1{,}618$.',
            'Algunas sucesiones no tienen una fórmula sencilla para $a_n$, sino una regla que usa los términos anteriores. La más famosa es la de Fibonacci: $1, 1, 2, 3, 5, 8,\\ldots$, donde cada término suma los dos anteriores. Si divides cada término entre el anterior, los cocientes se acercan cada vez más al número áureo, $\\varphi\\approx 1{,}618$.',
            'بعض المتتاليات ليس لها صيغة بسيطة للحد $a_n$ بل قاعدة تستعمل الحدود السابقة. وأشهرها متتالية فيبوناتشي: $1, 1, 2, 3, 5, 8,\\ldots$، حيث كل حد مجموع الحدين السابقين. وإذا قسمت كل حد على سابقه فإن خوارج القسمة تقترب أكثر فأكثر من العدد الذهبي $\\varphi\\approx 1{,}618$.',
            'Some sequences have no simple formula for $a_n$, but a rule that uses the earlier terms. The most famous is Fibonacci\'s: $1, 1, 2, 3, 5, 8,\\ldots$, where each term adds the two before it. If you divide each term by the one before, the quotients get closer and closer to the golden ratio, $\\varphi\\approx 1{,}618$.'
        ),
        examplePrompt: say('$b_1=3$ eta $b_{n}=2b_{n-1}-1$ dira. Kalkulatu $b_2$, $b_3$ eta $b_4$.', 'Con $b_1=3$ y $b_{n}=2b_{n-1}-1$, calcula $b_2$, $b_3$ y $b_4$.', 'مع $b_1=3$ و$b_{n}=2b_{n-1}-1$ احسب $b_2$ و$b_3$ و$b_4$.', 'With $b_1=3$ and $b_{n}=2b_{n-1}-1$, work out $b_2$, $b_3$ and $b_4$.'),
        example: same('$\\begin{gathered}b_2=2\\cdot 3-1=5\\\\ b_3=2\\cdot 5-1=9\\\\ b_4=17\\end{gathered}$'),
        exampleAnswer: say('$5$, $9$ eta $17$: bakoitza aurrekoaren bikoitza ken 1.', '$5$, $9$ y $17$: cada uno es el doble del anterior menos 1.', '$5$ و$9$ و$17$: كل منها ضعف السابق ناقص 1.', '$5$, $9$ and $17$: each is twice the one before minus 1.'),
        why: {
            text: say(
                'Zergatik hurbiltzen dira zatidurak $\\varphi$ zenbakira? Gai aurreratuetan $\\frac{a_{n+1}}{a_n}\\approx x$ bada, $a_{n+1}=a_n+a_{n-1}$ araua $a_n$ zenbakiaz zatituz $x=1+\\frac{1}{x}$ lortzen da. Ekuazio horren, $x^2=x+1$, soluzio positiboa $\\frac{1+\\sqrt{5}}{2}$ da.',
                '¿Por qué los cocientes se acercan a $\\varphi$? Si en los términos avanzados $\\frac{a_{n+1}}{a_n}\\approx x$, la regla $a_{n+1}=a_n+a_{n-1}$ dividida entre $a_n$ da $x=1+\\frac{1}{x}$. Esa ecuación, $x^2=x+1$, tiene como solución positiva $\\frac{1+\\sqrt{5}}{2}$.',
                'لماذا تقترب خوارج القسمة من $\\varphi$؟ إذا كان في الحدود المتقدمة $\\frac{a_{n+1}}{a_n}\\approx x$ فإن قسمة القاعدة $a_{n+1}=a_n+a_{n-1}$ على $a_n$ تعطي $x=1+\\frac{1}{x}$. وهذه المعادلة $x^2=x+1$ حلّها الموجب $\\frac{1+\\sqrt{5}}{2}$.',
                'Why do the quotients get close to $\\varphi$? If, far along, $\\frac{a_{n+1}}{a_n}\\approx x$, the rule $a_{n+1}=a_n+a_{n-1}$ divided by $a_n$ gives $x=1+\\frac{1}{x}$. That equation, $x^2=x+1$, has $\\frac{1+\\sqrt{5}}{2}$ as its positive solution.'
            ),
            math: same('$x^2=x+1\\ \\to\\ x=\\frac{1+\\sqrt{5}}{2}$')
        }
    },
    monotony: {
        definitions: [
            {
                term: say('Segida gorakorra', 'Sucesión creciente', 'المتتالية المتزايدة', 'Increasing sequence'),
                meaning: say('Gai bakoitza aurrekoa baino handiagoa da: $a_{n+1}>a_n$.', 'Cada término es mayor que el anterior: $a_{n+1}>a_n$.', 'كل حد أكبر من سابقه: $a_{n+1}>a_n$.', 'Each term is greater than the one before: $a_{n+1}>a_n$.')
            }
        ],
        vocabulary: [
            say('beherakorra', 'decreciente', 'متناقصة', 'decreasing'),
            say('txandakatua', 'alternada', 'متناوبة', 'alternating'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Segida bat hazten ala gutxitzen den jakiteko, alderatu bi gai jarraitu: $a_{n+1}-a_n$ beti positiboa bada, gorakorra da; beti negatiboa bada, beherakorra. Gaien zeinua aldatzen bada, $(-1)^n$ segidan bezala, txandakatua da: ez da hazten ez gutxitzen. Kontuz: hazteak ez du esan nahi infinitura joatea.',
            'Para saber si una sucesión crece o decrece, compara dos términos seguidos: si $a_{n+1}-a_n$ es siempre positivo, es creciente; si es siempre negativo, decreciente. Si el signo de los términos va cambiando, como en $(-1)^n$, es alternada: no crece ni decrece. Ojo: crecer no significa irse a infinito.',
            'لمعرفة إن كانت المتتالية تتزايد أو تتناقص قارن حدين متتاليين: إذا كان $a_{n+1}-a_n$ موجبًا دائمًا فهي متزايدة، وإذا كان سالبًا دائمًا فهي متناقصة. وإذا تغيّرت إشارة الحدود كما في $(-1)^n$ فهي متناوبة: لا تتزايد ولا تتناقص. انتبه: التزايد لا يعني الذهاب إلى اللانهاية.',
            'To tell whether a sequence goes up or down, compare two consecutive terms: if $a_{n+1}-a_n$ is always positive, it is increasing; if always negative, decreasing. If the sign of the terms keeps changing, as in $(-1)^n$, it is alternating: it neither goes up nor down. Careful: increasing does not mean going off to infinity.'
        ),
        examplePrompt: say('Gorakorra ala beherakorra da $c_n=\\frac{5}{n+2}$?', '¿Es creciente o decreciente $c_n=\\frac{5}{n+2}$?', 'هل $c_n=\\frac{5}{n+2}$ متزايدة أم متناقصة؟', 'Is $c_n=\\frac{5}{n+2}$ increasing or decreasing?'),
        example: same('$\\begin{gathered}c_{n+1}-c_n=\\frac{5}{n+3}-\\frac{5}{n+2}\\\\ =\\frac{-5}{(n+2)(n+3)}<0\\end{gathered}$'),
        exampleAnswer: say('Beherakorra: kendura beti negatiboa da, $\\frac{5}{3}>\\frac{5}{4}>\\frac{5}{5}$.', 'Decreciente: la resta siempre es negativa, $\\frac{5}{3}>\\frac{5}{4}>\\frac{5}{5}$.', 'متناقصة: الفرق سالب دائمًا، $\\frac{5}{3}>\\frac{5}{4}>\\frac{5}{5}$.', 'Decreasing: the difference is always negative, $\\frac{5}{3}>\\frac{5}{4}>\\frac{5}{5}$.')
    },

    /* ---------- 2. Progressions ---------- */
    arithmetic: {
        definitions: [
            {
                term: say('Diferentzia', 'Diferencia', 'الفرق', 'Common difference'),
                meaning: say('Progresio aritmetiko batean gai bakoitzari gehitzen zaion zenbaki finkoa: $d=a_{n+1}-a_n$.', 'El número fijo que se suma a cada término de una progresión aritmética: $d=a_{n+1}-a_n$.', 'العدد الثابت الذي يُضاف إلى كل حد في المتتالية الحسابية: $d=a_{n+1}-a_n$.', 'The fixed number added to each term of an arithmetic progression: $d=a_{n+1}-a_n$.')
            }
        ],
        vocabulary: [
            say('batura', 'suma', 'المجموع', 'sum'),
            say('jauzia', 'salto', 'القفزة', 'jump')
        ],
        explanation: say(
            'Progresio aritmetiko batean, gai batetik hurrengora $d$ diferentzia bera gehitzen da beti. Lehenengotik $n$ gaira iristeko $n-1$ jauzi daude: $a_n=a_1+(n-1)\\,d$. Edozein bi gairekin, $d$ lortzen da distantzia jauzi kopuruaz zatituz. Lehen $n$ gaien batura $S_n=\\frac{(a_1+a_n)\\,n}{2}$ da.',
            'En una progresión aritmética se pasa de un término al siguiente sumando siempre la misma diferencia $d$. Para llegar al término $n$ desde el primero hay $n-1$ saltos: $a_n=a_1+(n-1)\\,d$. Con dos términos cualesquiera se saca $d$ dividiendo la distancia entre el número de saltos. La suma de los $n$ primeros es $S_n=\\frac{(a_1+a_n)\\,n}{2}$.',
            'في المتتالية الحسابية ننتقل من حد إلى التالي بإضافة الفرق $d$ نفسه دائمًا. وللوصول إلى الحد $n$ من الأول توجد $n-1$ قفزة: $a_n=a_1+(n-1)\\,d$. ومن أي حدين نحصل على $d$ بقسمة المسافة على عدد القفزات. ومجموع الحدود $n$ الأولى $S_n=\\frac{(a_1+a_n)\\,n}{2}$.',
            'In an arithmetic progression you go from one term to the next by always adding the same difference $d$. To reach term $n$ from the first there are $n-1$ jumps: $a_n=a_1+(n-1)\\,d$. With any two terms, $d$ comes from dividing the distance by the number of jumps. The sum of the first $n$ terms is $S_n=\\frac{(a_1+a_n)\\,n}{2}$.'
        ),
        examplePrompt: say('$a_1=-4$ eta $d=6$ badira, kalkulatu $a_{15}$ eta $S_{15}$.', 'Si $a_1=-4$ y $d=6$, calcula $a_{15}$ y $S_{15}$.', 'إذا كان $a_1=-4$ و$d=6$ فاحسب $a_{15}$ و$S_{15}$.', 'If $a_1=-4$ and $d=6$, work out $a_{15}$ and $S_{15}$.'),
        example: same('$\\begin{gathered}a_{15}=-4+14\\cdot 6=80\\\\ S_{15}=\\frac{(-4+80)\\cdot 15}{2}=570\\end{gathered}$'),
        exampleAnswer: say('$a_{15}=80$ eta $S_{15}=570$.', '$a_{15}=80$ y $S_{15}=570$.', '$a_{15}=80$ و$S_{15}=570$.', '$a_{15}=80$ and $S_{15}=570$.')
    },
    geometric: {
        definitions: [
            {
                term: say('Arrazoia', 'Razón', 'الأساس', 'Common ratio'),
                meaning: say('Gai bakoitza lortzeko aurrekoa biderkatzen duen zenbaki finkoa: $r=\\frac{a_{n+1}}{a_n}$.', 'El número fijo por el que se multiplica cada término para obtener el siguiente: $r=\\frac{a_{n+1}}{a_n}$.', 'العدد الثابت الذي نضرب فيه كل حد لنحصل على التالي: $r=\\frac{a_{n+1}}{a_n}$.', 'The fixed number each term is multiplied by to get the next: $r=\\frac{a_{n+1}}{a_n}$.')
            }
        ],
        vocabulary: [
            say('biderkatu', 'multiplicar', 'الضرب', 'multiply'),
            say('erroa', 'raíz', 'جذر', 'root')
        ],
        explanation: say(
            'Progresio geometriko batean, gai batetik hurrengora $r$ arrazoiaz biderkatzen da. $n-1$ biderketaren ondoren, $a_n=a_1\\cdot r^{\\,n-1}$. Bi gairekin, $r$ erro batetik ateratzen da: haien artean $k$ jauzi badaude, zatidura $r^k$ da. Lehen $n$ gaien batura $S_n=\\frac{a_1\\,(r^n-1)}{r-1}$ da, $r\\neq 1$ bada.',
            'En una progresión geométrica se pasa de un término al siguiente multiplicando por la razón $r$. Tras $n-1$ multiplicaciones, $a_n=a_1\\cdot r^{\\,n-1}$. Con dos términos, $r$ sale de una raíz: si entre ellos hay $k$ saltos, el cociente es $r^k$. La suma de los $n$ primeros es $S_n=\\frac{a_1\\,(r^n-1)}{r-1}$, si $r\\neq 1$.',
            'في المتتالية الهندسية ننتقل من حد إلى التالي بالضرب في الأساس $r$. وبعد $n-1$ عملية ضرب يكون $a_n=a_1\\cdot r^{\\,n-1}$. ومن حدين نحصل على $r$ بجذر: إذا كانت بينهما $k$ قفزة فخارج القسمة $r^k$. ومجموع الحدود $n$ الأولى $S_n=\\frac{a_1\\,(r^n-1)}{r-1}$ إذا كان $r\\neq 1$.',
            'In a geometric progression you go from one term to the next by multiplying by the ratio $r$. After $n-1$ multiplications, $a_n=a_1\\cdot r^{\\,n-1}$. With two terms, $r$ comes from a root: if there are $k$ jumps between them, the quotient is $r^k$. The sum of the first $n$ terms is $S_n=\\frac{a_1\\,(r^n-1)}{r-1}$, if $r\\neq 1$.'
        ),
        examplePrompt: say('$a_1=48$ eta $r=\\frac{1}{2}$ badira, kalkulatu $a_6$ eta $S_6$.', 'Si $a_1=48$ y $r=\\frac{1}{2}$, calcula $a_6$ y $S_6$.', 'إذا كان $a_1=48$ و$r=\\frac{1}{2}$ فاحسب $a_6$ و$S_6$.', 'If $a_1=48$ and $r=\\frac{1}{2}$, work out $a_6$ and $S_6$.'),
        example: same('$\\begin{gathered}a_6=48\\cdot\\left(\\frac{1}{2}\\right)^5=\\frac{3}{2}\\\\ S_6=\\frac{48\\cdot\\left(\\left(\\frac{1}{2}\\right)^6-1\\right)}{\\frac{1}{2}-1}=\\frac{189}{2}\\end{gathered}$'),
        exampleAnswer: say('$a_6=\\frac{3}{2}$ eta $S_6=\\frac{189}{2}$.', '$a_6=\\frac{3}{2}$ y $S_6=\\frac{189}{2}$.', '$a_6=\\frac{3}{2}$ و$S_6=\\frac{189}{2}$.', '$a_6=\\frac{3}{2}$ and $S_6=\\frac{189}{2}$.')
    },
    'progression-problems': {
        vocabulary: [
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage'),
            say('hazkundea', 'crecimiento', 'النمو', 'growth')
        ],
        explanation: say(
            'Problema bat ebazteko, erabaki lehenik zer progresio mota den. Aldi bakoitzean kantitate bera gehitzen bada (urtero 50 € igotzen den soldata), aritmetikoa da. Aldi bakoitzean gauza beraz biderkatzen bada (urtean % 3 hazten den hazkundea), geometrikoa da, $r=1{,}03$ arrazoiarekin. Gero, erabili gai orokorra edo batura.',
            'Para resolver un problema, primero decide qué tipo de progresión es. Si cada vez se añade la misma cantidad (un sueldo que sube 50 € al año), es aritmética. Si cada vez se multiplica por lo mismo (un crecimiento del 3 % anual), es geométrica con $r=1{,}03$. Después usa el término general o la suma.',
            'لحل مسألة حدّد أولًا نوع المتتالية. إذا أُضيفت الكمية نفسها كل مرة (راتب يزيد 50 € كل سنة) فهي حسابية. وإذا ضُربت في العدد نفسه كل مرة (نمو بنسبة 3 % سنويًا) فهي هندسية أساسها $r=1{,}03$. ثم استعمل الحد العام أو المجموع.',
            'To solve a problem, first decide what kind of progression it is. If the same amount is added each time (a salary that goes up by €50 a year), it is arithmetic. If it is multiplied by the same number each time (a growth of 3% a year), it is geometric with $r=1{,}03$. Then use the general term or the sum.'
        ),
        examplePrompt: say('Lan batean, lehen hilabetean 900 € kobratzen dira, eta hilero 25 € gehiago. Zenbat kobratzen da guztira lehen urtean?', 'En un trabajo se cobran 900 € el primer mes y 25 € más cada mes. ¿Cuánto se cobra en total el primer año?', 'في عمل يُتقاضى 900 € في الشهر الأول و25 € زيادة كل شهر. كم يُتقاضى في السنة الأولى كلها؟', 'In a job you earn €900 the first month and €25 more each month. How much do you earn in total in the first year?'),
        example: same('$\\begin{gathered}a_{12}=900+11\\cdot 25=1175\\\\ S_{12}=\\frac{(900+1175)\\cdot 12}{2}=12\\,450\\end{gathered}$'),
        exampleAnswer: say('$12\\,450$ €: progresio aritmetikoa, $d=25$ diferentziarekin.', '$12\\,450$ €: progresión aritmética de diferencia $d=25$.', '$12\\,450$ €: متتالية حسابية فرقها $d=25$.', '€$12\\,450$: an arithmetic progression with $d=25$.')
    },

    /* ---------- 3. Infinite sums ---------- */
    'geometric-series': {
        definitions: [
            {
                term: say('Batura partziala', 'Suma parcial', 'المجموع الجزئي', 'Partial sum'),
                meaning: say('$S_n$: lehen $n$ gaien batura. Batura infinitua $S_n$ hurbiltzen den zenbakia da.', '$S_n$: la suma de los $n$ primeros términos. La suma infinita es el número al que se acerca $S_n$.', '$S_n$: مجموع الحدود $n$ الأولى. والمجموع اللانهائي هو العدد الذي يقترب منه $S_n$.', '$S_n$: the sum of the first $n$ terms. The infinite sum is the number $S_n$ gets close to.')
            }
        ],
        vocabulary: [
            say('infinitua', 'infinito', 'لا نهائي', 'infinite'),
            say('arrazoia', 'razón', 'الأساس', 'common ratio')
        ],
        explanation: say(
            'Progresio geometriko baten arrazoiak $|r|<1$ betetzen badu, gaiak gero eta txikiagoak dira, eta batura partzialak zenbaki batera hurbiltzen dira: gai infinituen batura, $S_\\infty=\\frac{a_1}{1-r}$. $|r|\\ge 1$ bada, gaiak ez dira txikitzen, eta batura ez da inolako zenbakitara hurbiltzen.',
            'Si la razón de una progresión geométrica cumple $|r|<1$, sus términos se hacen cada vez más pequeños y las sumas parciales se acercan a un número: la suma de los infinitos términos, $S_\\infty=\\frac{a_1}{1-r}$. Si $|r|\\ge 1$, los términos no se hacen pequeños y la suma no se acerca a ningún número.',
            'إذا كان أساس المتتالية الهندسية يحقق $|r|<1$ فإن حدودها تصغر أكثر فأكثر وتقترب المجاميع الجزئية من عدد: مجموع الحدود اللانهائية $S_\\infty=\\frac{a_1}{1-r}$. وإذا كان $|r|\\ge 1$ فالحدود لا تصغر والمجموع لا يقترب من أي عدد.',
            'If the ratio of a geometric progression satisfies $|r|<1$, its terms get smaller and smaller and the partial sums get close to a number: the sum of the infinitely many terms, $S_\\infty=\\frac{a_1}{1-r}$. If $|r|\\ge 1$, the terms do not get small and the sum does not get close to any number.'
        ),
        examplePrompt: say('Kalkulatu $27-9+3-1+\\ldots$', 'Calcula $27-9+3-1+\\ldots$', 'احسب $27-9+3-1+\\ldots$', 'Work out $27-9+3-1+\\ldots$'),
        example: same('$S_\\infty=\\frac{27}{1-\\left(-\\frac{1}{3}\\right)}=\\frac{81}{4}$'),
        exampleAnswer: say('$\\frac{81}{4}=20{,}25$: $r=-\\frac{1}{3}$ da, eta $|r|<1$.', '$\\frac{81}{4}=20{,}25$: aquí $r=-\\frac{1}{3}$ y $|r|<1$.', '$\\frac{81}{4}=20{,}25$: هنا $r=-\\frac{1}{3}$ و$|r|<1$.', '$\\frac{81}{4}=20{,}25$: here $r=-\\frac{1}{3}$ and $|r|<1$.')
    },
    'periodic-decimals': {
        definitions: [
            {
                term: say('Periodoa', 'Periodo', 'الدورة', 'Repeating block'),
                meaning: say('Behin eta berriz errepikatzen den zifra-taldea: $0{,}\\overline{36}$ zenbakian, 36.', 'El grupo de cifras que se repite sin fin: en $0{,}\\overline{36}$, el 36.', 'مجموعة الأرقام التي تتكرر بلا نهاية: في $0{,}\\overline{36}$ هي 36.', 'The group of digits that repeats for ever: in $0{,}\\overline{36}$, it is 36.')
            }
        ],
        vocabulary: [
            say('zatiki sortzailea', 'fracción generatriz', 'الكسر المولّد', 'generating fraction'),
            say('blokea', 'bloque', 'الكتلة', 'block')
        ],
        explanation: say(
            'Hamartar periodiko bat batura infinitu bat da: $0{,}\\overline{7}=0{,}7+0{,}07+0{,}007+\\ldots$, $\\frac{1}{10}$ arrazoiko progresio geometrikoa. $|r|<1$ denez, bere batura zatiki bat da, bere zatiki sortzailea: $\\frac{0{,}7}{1-0{,}1}=\\frac{7}{9}$. Horrela frogatzen da hamartar periodiko oro arrazionala dela, eta $0{,}\\overline{9}=1$ dela.',
            'Un decimal periódico es una suma infinita: $0{,}\\overline{7}=0{,}7+0{,}07+0{,}007+\\ldots$, una progresión geométrica de razón $\\frac{1}{10}$. Como $|r|<1$, su suma es una fracción, su fracción generatriz: $\\frac{0{,}7}{1-0{,}1}=\\frac{7}{9}$. Así se demuestra que todo decimal periódico es racional, y que $0{,}\\overline{9}=1$.',
            'العدد العشري الدوري مجموع لا نهائي: $0{,}\\overline{7}=0{,}7+0{,}07+0{,}007+\\ldots$، أي متتالية هندسية أساسها $\\frac{1}{10}$. وبما أن $|r|<1$ فمجموعها كسر هو الكسر المولّد: $\\frac{0{,}7}{1-0{,}1}=\\frac{7}{9}$. وهكذا نبرهن أن كل عدد عشري دوري نسبي، وأن $0{,}\\overline{9}=1$.',
            'A recurring decimal is an infinite sum: $0{,}\\overline{7}=0{,}7+0{,}07+0{,}007+\\ldots$, a geometric progression with ratio $\\frac{1}{10}$. Since $|r|<1$, its sum is a fraction, its generating fraction: $\\frac{0{,}7}{1-0{,}1}=\\frac{7}{9}$. This proves that every recurring decimal is rational, and that $0{,}\\overline{9}=1$.'
        ),
        examplePrompt: say('Aurkitu $0{,}\\overline{5}$ eta $2{,}\\overline{18}$ zenbakien zatikiak, batura infinituekin.', 'Halla con sumas infinitas las fracciones de $0{,}\\overline{5}$ y $2{,}\\overline{18}$.', 'أوجد بالمجاميع اللانهائية كسري $0{,}\\overline{5}$ و$2{,}\\overline{18}$.', 'Use infinite sums to find the fractions of $0{,}\\overline{5}$ and $2{,}\\overline{18}$.'),
        example: same('$\\begin{gathered}0{,}\\overline{5}=\\frac{0{,}5}{1-0{,}1}=\\frac{5}{9}\\\\ 2{,}\\overline{18}=2+\\frac{0{,}18}{1-0{,}01}=2+\\frac{2}{11}=\\frac{24}{11}\\end{gathered}$'),
        exampleAnswer: say('$\\frac{5}{9}$ eta $\\frac{24}{11}$.', '$\\frac{5}{9}$ y $\\frac{24}{11}$.', '$\\frac{5}{9}$ و$\\frac{24}{11}$.', '$\\frac{5}{9}$ and $\\frac{24}{11}$.'),
        why: {
            text: say(
                'Zergatik da $0{,}\\overline{9}=1$? $0{,}9+0{,}09+\\ldots$ batura da, $r=\\frac{1}{10}$ arrazoiarekin: $\\frac{0{,}9}{1-0{,}1}=1$. Ez da «ia» 1: $0{,}\\overline{9}$ eta 1 artean ez dago zenbakirik, beraz zenbaki bera dira, bi modutara idatzita.',
                '¿Por qué $0{,}\\overline{9}=1$? Es la suma $0{,}9+0{,}09+\\ldots$ con $r=\\frac{1}{10}$: $\\frac{0{,}9}{1-0{,}1}=1$. No es «casi» 1: entre $0{,}\\overline{9}$ y 1 no cabe ningún número, así que son el mismo número escrito de dos formas.',
                'لماذا $0{,}\\overline{9}=1$؟ إنه المجموع $0{,}9+0{,}09+\\ldots$ بالأساس $r=\\frac{1}{10}$: $\\frac{0{,}9}{1-0{,}1}=1$. وليس «تقريبًا» 1: لا يوجد عدد بين $0{,}\\overline{9}$ و1، فهما العدد نفسه مكتوبًا بطريقتين.',
                'Why is $0{,}\\overline{9}=1$? It is the sum $0{,}9+0{,}09+\\ldots$ with $r=\\frac{1}{10}$: $\\frac{0{,}9}{1-0{,}1}=1$. It is not «almost» 1: no number fits between $0{,}\\overline{9}$ and 1, so they are the same number written in two ways.'
            ),
            math: same('$\\frac{0{,}9}{1-0{,}1}=1$')
        }
    },
    'squares-sum': {
        vocabulary: [
            say('karratua', 'cuadrado', 'المربع', 'square'),
            say('formula', 'fórmula', 'الصيغة', 'formula')
        ],
        explanation: say(
            '$1, 4, 9, 16,\\ldots$ karratuek ez dute progresiorik osatzen: haien kendurak handitzen doaz. Hala ere, haien baturak formula bat du: $1^2+2^2+\\ldots+n^2=\\frac{n(n+1)(2n+1)}{6}$. $n$ txiki batekin egiazta daiteke: $n=3$ bada, $1+4+9=14$ eta $\\frac{3\\cdot 4\\cdot 7}{6}=14$.',
            'Los cuadrados $1, 4, 9, 16,\\ldots$ no forman una progresión: sus diferencias van creciendo. Aun así, su suma tiene fórmula: $1^2+2^2+\\ldots+n^2=\\frac{n(n+1)(2n+1)}{6}$. Se puede comprobar con un $n$ pequeño: con $n=3$, $1+4+9=14$ y $\\frac{3\\cdot 4\\cdot 7}{6}=14$.',
            'المربعات $1, 4, 9, 16,\\ldots$ لا تشكّل متتالية حسابية ولا هندسية: فروقها تكبر. ومع ذلك لمجموعها صيغة: $1^2+2^2+\\ldots+n^2=\\frac{n(n+1)(2n+1)}{6}$. ويمكن التحقق مع $n$ صغير: مع $n=3$ يكون $1+4+9=14$ و$\\frac{3\\cdot 4\\cdot 7}{6}=14$.',
            'The squares $1, 4, 9, 16,\\ldots$ do not form a progression: their differences keep growing. Even so, their sum has a formula: $1^2+2^2+\\ldots+n^2=\\frac{n(n+1)(2n+1)}{6}$. You can check it with a small $n$: with $n=3$, $1+4+9=14$ and $\\frac{3\\cdot 4\\cdot 7}{6}=14$.'
        ),
        examplePrompt: say('Kalkulatu $1^2+2^2+\\ldots+20^2$ eta $11^2+12^2+\\ldots+20^2$.', 'Calcula $1^2+2^2+\\ldots+20^2$ y $11^2+12^2+\\ldots+20^2$.', 'احسب $1^2+2^2+\\ldots+20^2$ و$11^2+12^2+\\ldots+20^2$.', 'Work out $1^2+2^2+\\ldots+20^2$ and $11^2+12^2+\\ldots+20^2$.'),
        example: same('$\\begin{gathered}\\frac{20\\cdot 21\\cdot 41}{6}=2870\\\\ 2870-385=2485\\end{gathered}$'),
        exampleAnswer: say('$2870$ eta $2485$: bigarrena lehenengoa da, lehen hamar karratuak kenduta.', '$2870$ y $2485$: la segunda es la primera menos los diez primeros cuadrados.', '$2870$ و$2485$: الثاني هو الأول ناقص المربعات العشرة الأولى.', '$2870$ and $2485$: the second is the first minus the first ten squares.'),
        why: {
            text: say(
                'Nondik dator 6 zenbakia? Karratuak kubozko piramide gisa pilatzen badira, sei piramide berdinek $n\\times(n+1)\\times(2n+1)$ kuboko kutxa bat betetzen dute zehatz-mehatz. Horregatik, batura kutxa horren bolumena da zati 6.',
                '¿De dónde sale el 6? Si los cuadrados se apilan como una pirámide de cubos, seis pirámides iguales llenan justo una caja de $n\\times(n+1)\\times(2n+1)$ cubos. Por eso la suma es el volumen de esa caja entre 6.',
                'من أين يأتي العدد 6؟ إذا كُدّست المربعات كهرم من المكعبات فإن ستة أهرام متساوية تملأ تمامًا صندوقًا من $n\\times(n+1)\\times(2n+1)$ مكعبًا. لذلك المجموع هو حجم هذا الصندوق مقسومًا على 6.',
                'Where does the 6 come from? If the squares are stacked as a pyramid of cubes, six equal pyramids fill exactly a box of $n\\times(n+1)\\times(2n+1)$ cubes. That is why the sum is the volume of that box divided by 6.'
            ),
            math: same('$6\\cdot(1+4+9)=3\\cdot 4\\cdot 7=84$')
        }
    },

    /* ---------- 4. Limits ---------- */
    converge: {
        definitions: [
            {
                term: say('Limitea', 'Límite', 'النهاية', 'Limit'),
                meaning: say('$a_n$ gaiak hurbiltzen diren zenbakia, $n$ handitzean: $\\lim a_n=L$.', 'El número al que se acercan los términos $a_n$ cuando $n$ crece: $\\lim a_n=L$.', 'العدد الذي تقترب منه الحدود $a_n$ عندما يكبر $n$: $\\lim a_n=L$.', 'The number the terms $a_n$ get closer to as $n$ grows: $\\lim a_n=L$.')
            }
        ],
        vocabulary: [
            say('konbergentea', 'convergente', 'متقاربة', 'convergent'),
            say('gai aurreratuak', 'términos avanzados', 'الحدود المتقدمة', 'terms far along')
        ],
        explanation: say(
            'Segida bat konbergentea da bere gaiak $L$ zenbaki batera nahi bezain hurbiltzen badira: gai batetik aurrera, guztiak aukeratzen dugun edozein distantzia baino gertuago daude. $L$ hori limitea da, $\\lim a_n=L$. Asmatzeko, kalkulatu gai aurreratuak; ziurtatzeko, aldatu $a_n$: $\\frac{3n+2}{n}=3+\\frac{2}{n}$.',
            'Una sucesión es convergente si sus términos se acercan a un número $L$ tanto como queramos: a partir de cierto término, todos están a menos de cualquier distancia que elijamos. Ese $L$ es el límite, $\\lim a_n=L$. Para estimarlo, calcula términos avanzados; para asegurarlo, transforma $a_n$: $\\frac{3n+2}{n}=3+\\frac{2}{n}$.',
            'تكون المتتالية متقاربة إذا اقتربت حدودها من عدد $L$ بالقدر الذي نريد: ابتداءً من حد ما تكون كلها على بعد أقل من أي مسافة نختارها. هذا $L$ هو النهاية $\\lim a_n=L$. لتقديرها احسب حدودًا متقدمة، وللتأكد حوّل $a_n$: $\\frac{3n+2}{n}=3+\\frac{2}{n}$.',
            'A sequence is convergent if its terms get as close as we like to a number $L$: from some term on, all of them are within any distance we choose. That $L$ is the limit, $\\lim a_n=L$. To estimate it, work out terms far along; to make sure, rewrite $a_n$: $\\frac{3n+2}{n}=3+\\frac{2}{n}$.'
        ),
        examplePrompt: say('Asmatu $b_n=\\frac{5n-1}{2n}$ segidaren limitea.', 'Estima el límite de $b_n=\\frac{5n-1}{2n}$.', 'قدّر نهاية $b_n=\\frac{5n-1}{2n}$.', 'Estimate the limit of $b_n=\\frac{5n-1}{2n}$.'),
        example: same('$\\begin{gathered}b_n=\\frac{5}{2}-\\frac{1}{2n}\\ \\to\\ \\frac{5}{2}\\\\ b_{1000}=2{,}4995\\end{gathered}$'),
        exampleAnswer: say('$\\frac{5}{2}=2{,}5$: kentzen den zatikia gero eta txikiagoa da.', '$\\frac{5}{2}=2{,}5$: la fracción que se resta es cada vez más pequeña.', '$\\frac{5}{2}=2{,}5$: الكسر المطروح يصغر أكثر فأكثر.', '$\\frac{5}{2}=2{,}5$: the fraction taken away gets smaller and smaller.')
    },
    'from-term': {
        definitions: [
            {
                term: say('Epsilon distantzia', 'Distancia épsilon', 'مسافة إبسيلون', 'Epsilon distance'),
                meaning: say('$\\varepsilon$ zenbaki positibo txiki bat da: limitetik onartzen dugun distantzia.', '$\\varepsilon$ es un número positivo pequeño: la distancia al límite que admitimos.', '$\\varepsilon$ عدد موجب صغير: المسافة التي نقبلها عن النهاية.', '$\\varepsilon$ is a small positive number: the distance from the limit we accept.')
            }
        ],
        vocabulary: [
            say('distantzia', 'distancia', 'المسافة', 'distance'),
            say('desberdintza', 'desigualdad', 'المتباينة', 'inequality')
        ],
        explanation: say(
            '$\\lim a_n=L$ esateak esan nahi du aukeratzen dugun edozein $\\varepsilon$ distantziatarako, gai batetik aurrera guztiak $\\varepsilon$ baino gertuago daudela $L$ zenbakitik. Gai hori aurkitzeko, idatzi $|a_n-L|<\\varepsilon$ desberdintza eta askatu $n$. Zenbat eta txikiagoa $\\varepsilon$, orduan eta urrunago joan behar da.',
            'Decir que $\\lim a_n=L$ significa que, para cualquier distancia $\\varepsilon$ que elijamos, a partir de algún término todos están a menos de $\\varepsilon$ de $L$. Para encontrar ese término se plantea la desigualdad $|a_n-L|<\\varepsilon$ y se despeja $n$. Cuanto más pequeña es $\\varepsilon$, más lejos hay que ir.',
            'القول إن $\\lim a_n=L$ يعني أنه لأي مسافة $\\varepsilon$ نختارها تكون كل الحدود، ابتداءً من حد ما، على بعد أقل من $\\varepsilon$ عن $L$. ولإيجاد ذلك الحد نكتب المتباينة $|a_n-L|<\\varepsilon$ ونحلّها بالنسبة إلى $n$. وكلما صغرت $\\varepsilon$ وجب الذهاب أبعد.',
            'Saying that $\\lim a_n=L$ means that, for any distance $\\varepsilon$ we choose, from some term on all of them are less than $\\varepsilon$ away from $L$. To find that term, write the inequality $|a_n-L|<\\varepsilon$ and solve for $n$. The smaller $\\varepsilon$ is, the further you have to go.'
        ),
        examplePrompt: say('$b_n=\\frac{n+5}{n}$ segidaren limitea 1 da. Zein gaitik aurrera daude gai guztiak 1 zenbakitik $0{,}001$ baino gertuago?', '$b_n=\\frac{n+5}{n}$ tiende a 1. ¿A partir de qué término están todos a menos de $0{,}001$ de 1?', '$b_n=\\frac{n+5}{n}$ تتجه إلى 1. ابتداءً من أيّ حد تكون كلها على بعد أقل من $0{,}001$ عن 1؟', '$b_n=\\frac{n+5}{n}$ tends to 1. From which term on are they all less than $0{,}001$ away from 1?'),
        example: same('$|b_n-1|=\\frac{5}{n}<0{,}001\\ \\to\\ n>5000$'),
        exampleAnswer: say('$5001$ gaitik aurrera: $\\frac{5}{n}$ zatikiak $0{,}001$ baino txikiagoa izan behar du.', 'A partir del término $5001$: $\\frac{5}{n}$ tiene que ser menor que $0{,}001$.', 'ابتداءً من الحد $5001$: يجب أن يكون $\\frac{5}{n}$ أصغر من $0{,}001$.', 'From term $5001$ on: $\\frac{5}{n}$ has to be less than $0{,}001$.')
    },
    'infinite-limits': {
        definitions: [
            {
                term: say('Segida dibergentea', 'Sucesión divergente', 'المتتالية المتباعدة', 'Divergent sequence'),
                meaning: say('$+\\infty$ edo $-\\infty$ aldera doana: gaiek edozein zenbaki gainditzen dute.', 'La que tiende a $+\\infty$ o a $-\\infty$: sus términos acaban pasando de cualquier número.', 'التي تتجه إلى $+\\infty$ أو $-\\infty$: تتجاوز حدودها في النهاية أي عدد.', 'One that tends to $+\\infty$ or $-\\infty$: its terms end up going past any number.')
            }
        ],
        vocabulary: [
            say('oszilatzailea', 'oscilante', 'متذبذبة', 'oscillating'),
            say('infinitua', 'infinito', 'اللانهاية', 'infinity')
        ],
        explanation: say(
            'Segida guztiak ez dira zenbaki batera hurbiltzen. Gaiek edozein zenbaki gainditzen badute, segida $+\\infty$ aldera doa, eta edozein zenbakiren azpitik geratzen badira, $-\\infty$ aldera: dibergenteak dira. Beste batzuk, $(-1)^n$ bezala, balioen artean saltoka dabiltza, bat ere hurbildu gabe: oszilatzaileak dira, eta ez dute limiterik.',
            'No todas las sucesiones se acercan a un número. Si los términos acaban superando cualquier número, la sucesión tiende a $+\\infty$, y si acaban por debajo de cualquier número, a $-\\infty$: son divergentes. Otras, como $(-1)^n$, saltan entre valores sin acercarse a ninguno: son oscilantes y no tienen límite.',
            'ليست كل المتتاليات تقترب من عدد. إذا تجاوزت الحدود في النهاية أي عدد فالمتتالية تتجه إلى $+\\infty$، وإذا صارت تحت أي عدد فإلى $-\\infty$: إنها متباعدة. وأخرى مثل $(-1)^n$ تقفز بين قيم دون أن تقترب من أيّ منها: إنها متذبذبة وليس لها نهاية.',
            'Not every sequence gets close to a number. If the terms end up going past any number, the sequence tends to $+\\infty$, and if they end up below any number, to $-\\infty$: they are divergent. Others, such as $(-1)^n$, jump between values without getting close to any of them: they are oscillating and have no limit.'
        ),
        examplePrompt: say('Nora doaz $d_n=\\frac{n^2}{4}$ eta $e_n=(-2)^n$?', '¿A dónde van $d_n=\\frac{n^2}{4}$ y $e_n=(-2)^n$?', 'إلى أين تتجه $d_n=\\frac{n^2}{4}$ و$e_n=(-2)^n$؟', 'Where do $d_n=\\frac{n^2}{4}$ and $e_n=(-2)^n$ go?'),
        example: same('$\\begin{gathered}d_{20}=100\\ \\to\\ +\\infty\\\\ e_n=-2,\\ 4,\\ -8,\\ 16,\\ldots\\end{gathered}$'),
        exampleAnswer: say('$d_n$ segida $+\\infty$ aldera doa; $e_n$ segidak ez du limiterik: zeinua aldatzen du, eta gero eta handiagoa da.', '$d_n$ tiende a $+\\infty$; $e_n$ no tiene límite: cambia de signo y crece de tamaño.', '$d_n$ تتجه إلى $+\\infty$، أما $e_n$ فليس لها نهاية: تتغيّر إشارتها ويكبر حجمها.', '$d_n$ tends to $+\\infty$; $e_n$ has no limit: it changes sign and grows in size.')
    },
    'quotient-limits': {
        definitions: [
            {
                term: say('Koefiziente nagusia', 'Coeficiente principal', 'المعامل الرئيسي', 'Leading coefficient'),
                meaning: say('Maila handieneko gaiaren koefizientea: $6n^2-n$ polinomioan, 6.', 'El coeficiente del término de mayor grado: en $6n^2-n$, el 6.', 'معامل الحد ذي الدرجة الكبرى: في $6n^2-n$ هو 6.', 'The coefficient of the highest-degree term: in $6n^2-n$, it is 6.')
            }
        ],
        vocabulary: [
            say('maila', 'grado', 'الدرجة', 'degree'),
            say('polinomioa', 'polinomio', 'كثيرة الحدود', 'polynomial')
        ],
        explanation: say(
            '$n$ oso handia denean, polinomio bakoitzean maila handieneko gaiak bakarrik du garrantzia: $6n^2-n$ polinomioa $6n^2$ bezala portatzen da. Horregatik nahikoa da mailak alderatzea. Berdinak badira, limitea koefiziente nagusien zatidura da; goikoarena handiagoa bada, $\\pm\\infty$ aldera doa; behekoarena handiagoa bada, 0 zenbakira.',
            'Cuando $n$ es muy grande, en cada polinomio solo cuenta el término de mayor grado: $6n^2-n$ se comporta como $6n^2$. Por eso basta comparar grados. Si son iguales, el límite es el cociente de los coeficientes principales; si el de arriba es mayor, tiende a $\\pm\\infty$; si el de abajo es mayor, tiende a 0.',
            'عندما يكون $n$ كبيرًا جدًا لا يهم في كل كثيرة حدود إلا الحد ذو الدرجة الكبرى: $6n^2-n$ تتصرف مثل $6n^2$. لذلك تكفي مقارنة الدرجات. فإذا تساوت فالنهاية خارج قسمة المعاملين الرئيسيين، وإذا كانت درجة البسط أكبر فتتجه إلى $\\pm\\infty$، وإذا كانت درجة المقام أكبر فإلى 0.',
            'When $n$ is very large, only the highest-degree term of each polynomial matters: $6n^2-n$ behaves like $6n^2$. That is why comparing degrees is enough. If they are equal, the limit is the quotient of the leading coefficients; if the top one is higher, it tends to $\\pm\\infty$; if the bottom one is higher, it tends to 0.'
        ),
        examplePrompt: say('Kalkulatu $\\lim\\frac{4n-7}{8n+3}$ eta $\\lim\\frac{-2n^2}{n+9}$.', 'Calcula $\\lim\\frac{4n-7}{8n+3}$ y $\\lim\\frac{-2n^2}{n+9}$.', 'احسب $\\lim\\frac{4n-7}{8n+3}$ و$\\lim\\frac{-2n^2}{n+9}$.', 'Work out $\\lim\\frac{4n-7}{8n+3}$ and $\\lim\\frac{-2n^2}{n+9}$.'),
        example: same('$\\begin{gathered}\\lim\\frac{4n-7}{8n+3}=\\frac{4}{8}=\\frac{1}{2}\\\\ \\lim\\frac{-2n^2}{n+9}=-\\infty\\end{gathered}$'),
        exampleAnswer: say('$\\frac{1}{2}$ eta $-\\infty$: bigarrenean goiko maila handiagoa da, eta koefizientea negatiboa.', '$\\frac{1}{2}$ y $-\\infty$: en el segundo, el grado de arriba es mayor y el coeficiente es negativo.', '$\\frac{1}{2}$ و$-\\infty$: في الثانية درجة البسط أكبر والمعامل سالب.', '$\\frac{1}{2}$ and $-\\infty$: in the second, the top degree is higher and the coefficient is negative.'),
        why: {
            text: say(
                'Zergatik du garrantzia maila handieneko gaiak bakarrik? Zatitu goian eta behean $n^2$ zenbakiaz: $\\frac{6n^2-n}{2n^2+5}=\\frac{6-\\frac{1}{n}}{2+\\frac{5}{n^2}}$. $n$ handitzean, $\\frac{1}{n}$ eta $\\frac{5}{n^2}$ nahi bezain txiki egiten dira, eta $\\frac{6}{2}$ geratzen da.',
                '¿Por qué solo cuenta el término de mayor grado? Divide arriba y abajo entre $n^2$: $\\frac{6n^2-n}{2n^2+5}=\\frac{6-\\frac{1}{n}}{2+\\frac{5}{n^2}}$. Al crecer $n$, $\\frac{1}{n}$ y $\\frac{5}{n^2}$ se hacen tan pequeños como queramos, y queda $\\frac{6}{2}$.',
                'لماذا لا يهم إلا الحد ذو الدرجة الكبرى؟ اقسم البسط والمقام على $n^2$: $\\frac{6n^2-n}{2n^2+5}=\\frac{6-\\frac{1}{n}}{2+\\frac{5}{n^2}}$. وعندما يكبر $n$ يصغر $\\frac{1}{n}$ و$\\frac{5}{n^2}$ بالقدر الذي نريد ويبقى $\\frac{6}{2}$.',
                'Why does only the highest-degree term matter? Divide top and bottom by $n^2$: $\\frac{6n^2-n}{2n^2+5}=\\frac{6-\\frac{1}{n}}{2+\\frac{5}{n^2}}$. As $n$ grows, $\\frac{1}{n}$ and $\\frac{5}{n^2}$ get as small as we like, and $\\frac{6}{2}$ is left.'
            ),
            math: same('$\\frac{6-\\frac{1}{n}}{2+\\frac{5}{n^2}}\\ \\to\\ \\frac{6}{2}=3$')
        }
    },

    /* ---------- 5. The number e ---------- */
    'e-number': {
        definitions: [
            {
                term: say('e zenbakia', 'Número e', 'العدد e', 'The number e'),
                meaning: say('$\\left(1+\\frac{1}{n}\\right)^n$ segidaren limitea: $e=2{,}71828\\ldots$, zenbaki irrazionala.', 'El límite de $\\left(1+\\frac{1}{n}\\right)^n$: $e=2{,}71828\\ldots$, un número irracional.', 'نهاية $\\left(1+\\frac{1}{n}\\right)^n$: $e=2{,}71828\\ldots$، وهو عدد غير نسبي.', 'The limit of $\\left(1+\\frac{1}{n}\\right)^n$: $e=2{,}71828\\ldots$, an irrational number.')
            }
        ],
        vocabulary: [
            say('interesa', 'interés', 'الفائدة', 'interest'),
            say('plazoa', 'plazo', 'الدفعة', 'instalment')
        ],
        explanation: say(
            'Urteko interesa % 100 bada, 1 € 2 € bihurtzen da urte amaieran. Interesa $n$ plazotan ordaintzen bada, bakoitza $\\frac{100}{n}$ ehunekokoa, urte amaieran $\\left(1+\\frac{1}{n}\\right)^n$ € daude. Plazo gehiagorekin, zertxobait gehiago, baina ez mugarik gabe: segida hazten da eta $e\\approx 2{,}718$ zenbakira hurbiltzen da.',
            'Si 1 € se presta al 100 % anual, al final del año hay 2 €. Si el interés se paga en $n$ plazos, cada uno del $\\frac{100}{n}$ por ciento, al final hay $\\left(1+\\frac{1}{n}\\right)^n$ €. Con más plazos hay algo más, pero no sin límite: la sucesión crece y se acerca a $e\\approx 2{,}718$.',
            'إذا أُقرض 1 € بفائدة 100 % سنويًا صار في نهاية السنة 2 €. وإذا دُفعت الفائدة على $n$ دفعة، كل منها $\\frac{100}{n}$ في المئة، صار في النهاية $\\left(1+\\frac{1}{n}\\right)^n$ €. ومع دفعات أكثر يزيد قليلًا لكن ليس بلا حدّ: المتتالية تتزايد وتقترب من $e\\approx 2{,}718$.',
            'If €1 is lent at 100% a year, at the end of the year there is €2. If the interest is paid in $n$ instalments, each of $\\frac{100}{n}$ per cent, at the end there is €$\\left(1+\\frac{1}{n}\\right)^n$. With more instalments there is a little more, but not without limit: the sequence grows and gets close to $e\\approx 2{,}718$.'
        ),
        examplePrompt: say('Kalkulatu $\\left(1+\\frac{1}{4}\\right)^4$ eta $\\left(1+\\frac{1}{12}\\right)^{12}$: zenbat bihurtzen da 1 €, hiru hilabetean behin edo hilero ordainduta?', 'Calcula $\\left(1+\\frac{1}{4}\\right)^4$ y $\\left(1+\\frac{1}{12}\\right)^{12}$: ¿en cuánto se convierte 1 € pagado cada trimestre o cada mes?', 'احسب $\\left(1+\\frac{1}{4}\\right)^4$ و$\\left(1+\\frac{1}{12}\\right)^{12}$: إلامَ يتحوّل 1 € إذا دُفعت الفائدة كل ثلاثة أشهر أو كل شهر؟', 'Work out $\\left(1+\\frac{1}{4}\\right)^4$ and $\\left(1+\\frac{1}{12}\\right)^{12}$: what does €1 become if paid every quarter or every month?'),
        example: same('$\\begin{gathered}1{,}25^4\\approx 2{,}441\\\\ \\left(\\frac{13}{12}\\right)^{12}\\approx 2{,}613\\end{gathered}$'),
        exampleAnswer: say('$2{,}44$ € eta $2{,}61$ €: plazo gehiagorekin, gehiago, baina beti $e$ baino gutxiago.', '$2{,}44$ € y $2{,}61$ €: con más plazos, más, pero siempre menos que $e$.', '$2{,}44$ € و$2{,}61$ €: مع دفعات أكثر يزيد، لكنه دائمًا أقل من $e$.', '€$2{,}44$ and €$2{,}61$: with more instalments, more, but always less than $e$.')
    },
    'continuous-growth': {
        definitions: [
            {
                term: say('Interes jarraitua', 'Interés continuo', 'الفائدة المستمرة', 'Continuous interest'),
                meaning: say('Interesa gero eta tarte laburragoetan ordaintzean lortzen den limitea: $C_0\\cdot e^{k\\,t}$.', 'El límite al que se llega pagando el interés en plazos cada vez más cortos: $C_0\\cdot e^{k\\,t}$.', 'النهاية التي نبلغها بدفع الفائدة على فترات أقصر فأقصر: $C_0\\cdot e^{k\\,t}$.', 'The limit you reach by paying the interest over shorter and shorter periods: $C_0\\cdot e^{k\\,t}$.')
            }
        ],
        vocabulary: [
            say('kapitala', 'capital', 'رأس المال', 'capital'),
            say('esponentziala', 'exponencial', 'أسّي', 'exponential')
        ],
        explanation: say(
            'Kapital bat urtero $k$ zati bat hazten bada, baina interesa $n$ plazotan ordaintzen bada, $\\left(1+\\frac{k}{n}\\right)^n$ zenbakiaz biderkatzen da, eta horren limitea $e^k$ da. Plazoak infinituki laburrak badira, interesa jarraitua da: $t$ urteren ondoren, $C=C_0\\cdot e^{k\\,t}$. Biztanleen, bakterioen edo kapitalen hazkunde esponentziala da.',
            'Si un capital crece un tanto por uno $k$ al año, pero el interés se paga en $n$ plazos, se multiplica por $\\left(1+\\frac{k}{n}\\right)^n$, que tiende a $e^k$. Con plazos infinitamente cortos, el interés es continuo: tras $t$ años, $C=C_0\\cdot e^{k\\,t}$. Es el crecimiento exponencial de poblaciones, bacterias o capitales.',
            'إذا زاد رأس المال بنسبة $k$ من الواحد سنويًا ودُفعت الفائدة على $n$ دفعة فإنه يُضرب في $\\left(1+\\frac{k}{n}\\right)^n$ الذي يتجه إلى $e^k$. ومع دفعات قصيرة إلى ما لا نهاية تكون الفائدة مستمرة: بعد $t$ سنة $C=C_0\\cdot e^{k\\,t}$. إنه النمو الأسّي للسكان والبكتيريا ورؤوس الأموال.',
            'If a capital grows by a proportion $k$ each year but the interest is paid in $n$ instalments, it is multiplied by $\\left(1+\\frac{k}{n}\\right)^n$, which tends to $e^k$. With infinitely short instalments, the interest is continuous: after $t$ years, $C=C_0\\cdot e^{k\\,t}$. It is the exponential growth of populations, bacteria or capital.'
        ),
        examplePrompt: say('Bakterio-kolonia bat etengabe hazten da, orduko % 20. 300 bakterio badaude, zenbat egongo dira 5 ordu barru?', 'Una colonia de bacterias crece de forma continua un 20 % por hora. Si hay 300, ¿cuántas habrá dentro de 5 horas?', 'تنمو مستعمرة بكتيريا نموًا مستمرًا بنسبة 20 % في الساعة. إذا كان فيها 300 فكم يصبح عددها بعد 5 ساعات؟', 'A colony of bacteria grows continuously by 20% an hour. If there are 300, how many will there be in 5 hours?'),
        example: same('$300\\cdot e^{0{,}2\\cdot 5}=300\\cdot e\\approx 815$'),
        exampleAnswer: say('815 bakterio inguru: $0{,}2\\cdot 5=1$, eta $e^1=e$.', 'Unas 815 bacterias: $0{,}2\\cdot 5=1$, y $e^1=e$.', 'نحو 815 بكتيريا: $0{,}2\\cdot 5=1$ و$e^1=e$.', 'About 815 bacteria: $0{,}2\\cdot 5=1$, and $e^1=e$.')
    }
}
