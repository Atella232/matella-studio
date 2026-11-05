import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { ExponentialAkTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Funtzio esponentzialak, logaritmikoak eta trigonometrikoak · 4. DBH
   akademikoak — what each lesson tells: the new words (definitions), a
   short explanation, the example as an exercise («Another example»), the
   key words in four languages and, in three lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics through localizeNames, so \sin and \tan written here become sen
   and tg in Spanish and tg in Basque. Arabic writes the decimal point
   ({,} becomes .).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const exponentialAkLessonTexts: Record<ExponentialAkTopicId, LessonTexts> = {
    /* ---------- 1. The exponential function ---------- */
    'exp-graph': {
        vocabulary: [
            say('esponentziala', 'exponencial', 'الأسية', 'exponential'),
            say('oinarria', 'base', 'الأساس', 'base'),
            say('asintota', 'asíntota', 'مقارب', 'asymptote')
        ],
        explanation: say(
            'Funtzio esponentziala $y=a^{x}$ da, $a>0$ eta $a\\ne 1$ izanik, oinarria: aldagaia berretzailean dago. Dom $f=\\mathbb{R}$ eta Rec $f=(0,\\,+\\infty)$, beti positiboa delako. $(0,\\,1)$ eta $(1,\\,a)$ puntuetatik pasatzen da, eta $y=0$ asintota horizontala da. $a>1$ bada, gorakorra da; $0<a<1$ bada, beherakorra.',
            'La función exponencial es $y=a^{x}$, con base $a>0$ y $a\\ne 1$: la variable está en el exponente. Dom $f=\\mathbb{R}$ y Rec $f=(0,\\,+\\infty)$, porque siempre es positiva. Pasa por $(0,\\,1)$ y por $(1,\\,a)$, y $y=0$ es una asíntota horizontal. Si $a>1$ es creciente; si $0<a<1$, decreciente.',
            'الدالة الأسية هي $y=a^{x}$ بالأساس $a>0$ و$a\\ne 1$: المتغير في الأس. Dom $f=\\mathbb{R}$ وRec $f=(0,\\,+\\infty)$ لأنها موجبة دائمًا. تمر بـ $(0,\\,1)$ و$(1,\\,a)$، و$y=0$ مقارب أفقي. إذا كان $a>1$ فهي متزايدة، وإذا كان $0<a<1$ فمتناقصة.',
            'The exponential function is $y=a^{x}$, with base $a>0$ and $a\\ne 1$: the variable is in the exponent. Dom $f=\\mathbb{R}$ and Rec $f=(0,\\,+\\infty)$, because it is always positive. It goes through $(0,\\,1)$ and $(1,\\,a)$, and $y=0$ is a horizontal asymptote. If $a>1$ it is increasing; if $0<a<1$, decreasing.'
        ),
        examplePrompt: say('Kalkulatu $2^{x}$ eta $\\left(\\frac{1}{2}\\right)^{x}$, $-2$ eta 3 balioetan. Zein da gorakorra?', 'Calcula $2^{x}$ y $\\left(\\frac{1}{2}\\right)^{x}$ para $-2$ y para 3. ¿Cuál crece?', 'احسب $2^{x}$ و$\\left(\\frac{1}{2}\\right)^{x}$ عند $-2$ و3. أيهما تتزايد؟', 'Work out $2^{x}$ and $\\left(\\frac{1}{2}\\right)^{x}$ at $-2$ and at 3. Which one increases?'),
        example: same('$\\begin{gathered}2^{-2}=\\frac{1}{4}\\qquad 2^{3}=8\\\\ \\left(\\frac{1}{2}\\right)^{-2}=4\\qquad\\left(\\frac{1}{2}\\right)^{3}=\\frac{1}{8}\\end{gathered}$'),
        exampleAnswer: say('$2^{x}$ gorakorra da; $\\left(\\frac{1}{2}\\right)^{x}=2^{-x}$ haren islapena da Y ardatzean, eta beherakorra.', '$2^{x}$ crece; $\\left(\\frac{1}{2}\\right)^{x}=2^{-x}$ es su reflejo en el eje Y y decrece.', '$2^{x}$ متزايدة؛ و$\\left(\\frac{1}{2}\\right)^{x}=2^{-x}$ انعكاسها على محور Y ومتناقصة.', '$2^{x}$ increases; $\\left(\\frac{1}{2}\\right)^{x}=2^{-x}$ is its reflection in the Y axis and decreases.')
    },
    'exp-values': {
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('erroa', 'raíz', 'الجذر', 'root')
        ],
        explanation: say(
            'Balioak berreturen arauekin kalkulatzen dira: $a^{-n}=\\frac{1}{a^{n}}$ eta $a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$. Arau berek funtzioaren forma aldatzen dute: $4^{x}=2^{2x}$ eta $2^{x+3}=8\\cdot 2^{x}$. Horrela ikusten da gorakorra den: $\\left(\\frac{1}{3}\\right)^{-x}=3^{x}$ gorakorra da.',
            'Los valores se calculan con las reglas de las potencias: $a^{-n}=\\frac{1}{a^{n}}$ y $a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$. Las mismas reglas cambian la forma de la función: $4^{x}=2^{2x}$ y $2^{x+3}=8\\cdot 2^{x}$. Así se ve si crece: $\\left(\\frac{1}{3}\\right)^{-x}=3^{x}$ es creciente.',
            'تُحسب القيم بقواعد القوى: $a^{-n}=\\frac{1}{a^{n}}$ و$a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$. والقواعد نفسها تغيّر صيغة الدالة: $4^{x}=2^{2x}$ و$2^{x+3}=8\\cdot 2^{x}$. وهكذا نرى هل تتزايد: $\\left(\\frac{1}{3}\\right)^{-x}=3^{x}$ متزايدة.',
            'The values come from the rules of powers: $a^{-n}=\\frac{1}{a^{n}}$ and $a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$. The same rules change the form of the function: $4^{x}=2^{2x}$ and $2^{x+3}=8\\cdot 2^{x}$. That shows whether it increases: $\\left(\\frac{1}{3}\\right)^{-x}=3^{x}$ is increasing.'
        ),
        examplePrompt: say('$f(x)=9^{x}$ bada, kalkulatu $f\\left(\\frac{1}{2}\\right)$, $f\\left(\\frac{3}{2}\\right)$ eta $f(-1)$.', 'Siendo $f(x)=9^{x}$, calcula $f\\left(\\frac{1}{2}\\right)$, $f\\left(\\frac{3}{2}\\right)$ y $f(-1)$.', 'إذا كانت $f(x)=9^{x}$ فاحسب $f\\left(\\frac{1}{2}\\right)$ و$f\\left(\\frac{3}{2}\\right)$ و$f(-1)$.', 'If $f(x)=9^{x}$, work out $f\\left(\\frac{1}{2}\\right)$, $f\\left(\\frac{3}{2}\\right)$ and $f(-1)$.'),
        example: same('$\\begin{gathered}9^{\\frac{1}{2}}=\\sqrt{9}=3\\qquad 9^{\\frac{3}{2}}=\\sqrt{9^{3}}=27\\\\ 9^{-1}=\\frac{1}{9}\\end{gathered}$'),
        exampleAnswer: say('$\\frac{1}{2}$ berretzailea: erro karratua; berretzaile negatiboa: alderantzizkoa.', 'Exponente $\\frac{1}{2}$: raíz cuadrada; exponente negativo: el inverso.', 'الأس $\\frac{1}{2}$: جذر تربيعي؛ والأس السالب: المقلوب.', 'Exponent $\\frac{1}{2}$: square root; negative exponent: the reciprocal.')
    },
    'exp-shifts': {
        vocabulary: [
            say('lekualdaketa', 'traslación', 'انسحاب', 'translation'),
            say('asintota horizontala', 'asíntota horizontal', 'مقارب أفقي', 'horizontal asymptote')
        ],
        explanation: say(
            'Parabolekin bezala, $y=a^{x-p}+q$ funtzioa $y=a^{x}$ da, $p$ unitate horizontalean eta $q$ bertikalean lekualdatuta. $(0,\\,1)$ puntua $(p,\\,1+q)$ puntura doa, eta $y=0$ asintota $y=q$ bihurtzen da: ibiltartea $(q,\\,+\\infty)$ da. Kontuz zeinuarekin: $y=2^{x+1}$ ezkerrera doa.',
            'Como en las parábolas, $y=a^{x-p}+q$ es $y=a^{x}$ trasladada $p$ unidades en horizontal y $q$ en vertical. El punto $(0,\\,1)$ va a $(p,\\,1+q)$, y la asíntota $y=0$ pasa a ser $y=q$: el recorrido es $(q,\\,+\\infty)$. Cuidado con el signo: $y=2^{x+1}$ va a la izquierda.',
            'كما في القطوع المكافئة، $y=a^{x-p}+q$ هي $y=a^{x}$ بعد انسحاب $p$ وحدة أفقيًا و$q$ رأسيًا. تنتقل النقطة $(0,\\,1)$ إلى $(p,\\,1+q)$، ويصبح المقارب $y=0$ هو $y=q$: المدى $(q,\\,+\\infty)$. انتبه للإشارة: $y=2^{x+1}$ تتجه إلى اليسار.',
            'As with parabolas, $y=a^{x-p}+q$ is $y=a^{x}$ translated $p$ units horizontally and $q$ vertically. The point $(0,\\,1)$ goes to $(p,\\,1+q)$, and the asymptote $y=0$ becomes $y=q$: the range is $(q,\\,+\\infty)$. Mind the sign: $y=2^{x+1}$ moves to the left.'
        ),
        examplePrompt: say('Nola lortzen da $y=3^{x+1}-2$ funtzioa $y=3^{x}$ funtziotik? Eman haren asintota eta ibiltartea.', '¿Cómo se obtiene $y=3^{x+1}-2$ a partir de $y=3^{x}$? Da su asíntota y su recorrido.', 'كيف نحصل على $y=3^{x+1}-2$ من $y=3^{x}$؟ أعطِ مقاربها ومداها.', 'How do you get $y=3^{x+1}-2$ from $y=3^{x}$? Give its asymptote and its range.'),
        example: same('$\\begin{gathered}(0,\\,1)\\ \\to\\ (-1,\\,-1)\\\\ y=-2\\qquad(-2,\\,+\\infty)\\end{gathered}$'),
        exampleAnswer: say('1 ezkerrera eta 2 behera.', '1 a la izquierda y 2 hacia abajo.', '1 إلى اليسار و2 إلى الأسفل.', '1 to the left and 2 down.')
    },

    /* ---------- 2. Growth, decay and equations ---------- */
    growth: {
        vocabulary: [
            say('hasierako balioa', 'valor inicial', 'القيمة الابتدائية', 'initial value'),
            say('faktorea', 'factor', 'المعامل', 'factor'),
            say('interes konposatua', 'interés compuesto', 'فائدة مركبة', 'compound interest')
        ],
        explanation: say(
            'Magnitude bat urrats bakoitzean ehuneko berean hazten bada, esponentziala da: $y=k\\cdot a^{x}$, $k$ hasierako balioa eta $a$ urrats bakoitzeko faktorea izanik. % 5 igotzea $1{,}05$ zenbakiaz biderkatzea da, eta % 20 jaistea, $0{,}8$ zenbakiaz. Interes konposatua horrela hazten da. Hazkunde linealak gauza bera batzen du; esponentzialak, gero eta gehiago.',
            'Si una magnitud crece el mismo porcentaje en cada paso, es exponencial: $y=k\\cdot a^{x}$, donde $k$ es el valor inicial y $a$ el factor de cada paso. Subir un 5 % es multiplicar por $1{,}05$, y bajar un 20 %, por $0{,}8$. El interés compuesto crece así. El crecimiento lineal suma lo mismo; el exponencial, cada vez más.',
            'إذا نمت كمية بالنسبة نفسها في كل خطوة فهي أسية: $y=k\\cdot a^{x}$ حيث $k$ القيمة الابتدائية و$a$ المعامل في كل خطوة. الزيادة 5 % ضرب في $1{,}05$، والنقص 20 % ضرب في $0{,}8$. والفائدة المركبة تنمو هكذا. النمو الخطي يضيف المقدار نفسه، والأسي يضيف أكثر فأكثر.',
            'If a quantity grows by the same percentage at each step, it is exponential: $y=k\\cdot a^{x}$, where $k$ is the initial value and $a$ the factor of each step. Going up 5% is multiplying by $1{,}05$, and going down 20%, by $0{,}8$. Compound interest grows like this. Linear growth adds the same amount; exponential growth, more and more.'
        ),
        examplePrompt: say('500 bakterio ordu bakoitzean bikoizten dira. Zenbat daude 4 orduren buruan?', '500 bacterias se duplican cada hora. ¿Cuántas hay a las 4 horas?', '500 بكتيريا تتضاعف كل ساعة. كم عددها بعد 4 ساعات؟', '500 bacteria double every hour. How many are there after 4 hours?'),
        example: same('$N=500\\cdot 2^{4}=500\\cdot 16=8000$'),
        exampleAnswer: say('2 faktorea, 500 hasierako balioa: 8000 bakterio.', 'Factor 2, valor inicial 500: 8000 bacterias.', 'المعامل 2 والقيمة الابتدائية 500: 8000 بكتيريا.', 'Factor 2, initial value 500: 8,000 bacteria.')
    },
    decay: {
        definitions: [
            {
                term: say('Erdibizitza', 'Semivida', 'عمر النصف', 'Half-life'),
                meaning: say('Kantitate bat erdira jaisteko behar den denbora.', 'El tiempo que tarda una cantidad en reducirse a la mitad.', 'الزمن اللازم لتنقص الكمية إلى النصف.', 'The time a quantity takes to fall to half.')
            }
        ],
        vocabulary: [
            say('beherakorra', 'decreciente', 'متناقصة', 'decreasing'),
            say('asintota', 'asíntota', 'مقارب', 'asymptote')
        ],
        explanation: say(
            'Magnitude bat urrats bakoitzean ehuneko berean txikitzen bada, esponentzial beherakorra da, $0<a<1$: % 15 galtzea $0{,}85$ zenbakiaz biderkatzea da. Erdibizitza $T$ bada, $m=m_0\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}$: $T$ urtero erdia geratzen da. Ez da inoiz 0 izatera iristen: $y=0$ asintota da.',
            'Si una magnitud disminuye el mismo porcentaje en cada paso, es exponencial decreciente, con $0<a<1$: perder un 15 % es multiplicar por $0{,}85$. Si la semivida es $T$, $m=m_0\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}$: cada $T$ años queda la mitad. Nunca llega a 0: $y=0$ es una asíntota.',
            'إذا نقصت كمية بالنسبة نفسها في كل خطوة فهي أسية متناقصة مع $0<a<1$: فقدان 15 % ضرب في $0{,}85$. وإذا كان عمر النصف $T$ فإن $m=m_0\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}$: كل $T$ سنة يبقى النصف. ولا تصل أبدًا إلى 0: $y=0$ مقارب.',
            'If a quantity falls by the same percentage at each step, it is a decreasing exponential, with $0<a<1$: losing 15% is multiplying by $0{,}85$. If the half-life is $T$, $m=m_0\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}$: every $T$ years half is left. It never reaches 0: $y=0$ is an asymptote.'
        ),
        examplePrompt: say('5 urteko erdibizitzako substantzia baten 80 g daude. Zenbat geratzen da 10 urteren buruan? Eta 15 urteren buruan?', 'Hay 80 g de una sustancia de semivida 5 años. ¿Cuánto queda a los 10 años? ¿Y a los 15?', 'لدينا 80 غ من مادة عمر نصفها 5 سنوات. كم يبقى بعد 10 سنوات؟ وبعد 15؟', 'There are 80 g of a substance with a half-life of 5 years. How much is left after 10 years? And after 15?'),
        example: same('$\\begin{gathered}80\\cdot\\left(\\frac{1}{2}\\right)^{2}=20\\\\ 80\\cdot\\left(\\frac{1}{2}\\right)^{3}=10\\end{gathered}$'),
        exampleAnswer: say('10 urte bi erdibizitza dira: 20 g; 15 urte, hiru: 10 g.', '10 años son dos semividas: 20 g; 15 años, tres: 10 g.', '10 سنوات عمرا نصف: 20 غ؛ و15 سنة ثلاثة: 10 غ.', '10 years are two half-lives: 20 g; 15 years, three: 10 g.')
    },
    'exp-equations': {
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm')
        ],
        explanation: say(
            'Ekuazio esponentzial batean ezezaguna berretzailean dago. Bi aldeak oinarri berarekin idazten badira, berretzaileak berdintzen dira: $9^{x}=27$ ekuazioa $3^{2x}=3^{3}$ da; beraz, $x=\\frac{3}{2}$. Bestela, logaritmoak hartzen dira: $2^{x}=10$ ekuazioak $x=\\frac{\\log 10}{\\log 2}$ ematen du.',
            'En una ecuación exponencial la incógnita está en el exponente. Si los dos lados se escriben con la misma base, se igualan los exponentes: $9^{x}=27$ es $3^{2x}=3^{3}$, así que $x=\\frac{3}{2}$. Si no, se toman logaritmos: $2^{x}=10$ da $x=\\frac{\\log 10}{\\log 2}$.',
            'في المعادلة الأسية المجهول في الأس. إذا كُتب الطرفان بالأساس نفسه نساوي الأسين: $9^{x}=27$ هي $3^{2x}=3^{3}$، إذن $x=\\frac{3}{2}$. وإلا نأخذ اللوغاريتم: $2^{x}=10$ تعطي $x=\\frac{\\log 10}{\\log 2}$.',
            'In an exponential equation the unknown is in the exponent. If both sides can be written with the same base, set the exponents equal: $9^{x}=27$ is $3^{2x}=3^{3}$, so $x=\\frac{3}{2}$. If not, take logarithms: $2^{x}=10$ gives $x=\\frac{\\log 10}{\\log 2}$.'
        ),
        examplePrompt: say('Ebatzi $3^{x-1}=\\frac{1}{9}$.', 'Resuelve $3^{x-1}=\\frac{1}{9}$.', 'حُلّ $3^{x-1}=\\frac{1}{9}$.', 'Solve $3^{x-1}=\\frac{1}{9}$.'),
        example: same('$\\begin{gathered}3^{x-1}=3^{-2}\\\\ x-1=-2\\ \\to\\ x=-1\\end{gathered}$'),
        exampleAnswer: say('$\\frac{1}{9}=3^{-2}$: oinarri bera, berretzaile berdinak.', '$\\frac{1}{9}=3^{-2}$: misma base, exponentes iguales.', '$\\frac{1}{9}=3^{-2}$: الأساس نفسه فالأسان متساويان.', '$\\frac{1}{9}=3^{-2}$: same base, equal exponents.'),
        why: {
            text: say(
                '$y=a^{x}$ funtzioa beti gorakorra edo beti beherakorra da; beraz, ez du inoiz balio bera bi aldiz hartzen. $a^{m}=a^{n}$ bada, ez dago beste aukerarik: $m=n$. Horregatik berdindu daitezke berretzaileak.',
                'La función $y=a^{x}$ es siempre creciente o siempre decreciente, así que nunca toma dos veces el mismo valor. Si $a^{m}=a^{n}$, no queda otra: $m=n$. Por eso se pueden igualar los exponentes.',
                'الدالة $y=a^{x}$ متزايدة دائمًا أو متناقصة دائمًا، فلا تأخذ القيمة نفسها مرتين أبدًا. فإذا كان $a^{m}=a^{n}$ فلا بد أن $m=n$. لذلك يمكن مساواة الأسين.',
                'The function $y=a^{x}$ is always increasing or always decreasing, so it never takes the same value twice. If $a^{m}=a^{n}$, there is no other way: $m=n$. That is why the exponents can be set equal.'
            )
        }
    },

    /* ---------- 3. The logarithmic function ---------- */
    'log-values': {
        vocabulary: [
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm'),
            say('logaritmo hamartarra', 'logaritmo decimal', 'اللوغاريتم العشري', 'common logarithm')
        ],
        explanation: say(
            '$x$ zenbakiaren $a$ oinarriko logaritmoa $x$ lortzeko $a$ jaso behar den berretzailea da: $\\log_a x=y$, $a^{y}=x$ bada. Beti $\\log_a 1=0$ eta $\\log_a a=1$. Negatiboek eta 0 zenbakiak ez dute logaritmorik. $\\log x$ logaritmo hamartarra da, 10 oinarrikoa; beste oinarri batean, $\\log_a x=\\frac{\\log x}{\\log a}$.',
            'El logaritmo en base $a$ de $x$ es el exponente al que hay que elevar $a$ para obtener $x$: $\\log_a x=y$ si $a^{y}=x$. Siempre $\\log_a 1=0$ y $\\log_a a=1$. Los negativos y el 0 no tienen logaritmo. $\\log x$ es el logaritmo decimal, en base 10; en otra base, $\\log_a x=\\frac{\\log x}{\\log a}$.',
            'لوغاريتم $x$ للأساس $a$ هو الأس الذي نرفع إليه $a$ لنحصل على $x$: $\\log_a x=y$ إذا كان $a^{y}=x$. ودائمًا $\\log_a 1=0$ و$\\log_a a=1$. والأعداد السالبة و0 ليس لها لوغاريتم. و$\\log x$ هو اللوغاريتم العشري للأساس 10، وفي أساس آخر $\\log_a x=\\frac{\\log x}{\\log a}$.',
            'The logarithm in base $a$ of $x$ is the exponent you must raise $a$ to in order to get $x$: $\\log_a x=y$ if $a^{y}=x$. Always $\\log_a 1=0$ and $\\log_a a=1$. Negative numbers and 0 have no logarithm. $\\log x$ is the common logarithm, in base 10; in another base, $\\log_a x=\\frac{\\log x}{\\log a}$.'
        ),
        examplePrompt: say('Kalkulatu $\\log_4 64$, $\\log_3\\frac{1}{27}$ eta $\\log 0{,}01$.', 'Calcula $\\log_4 64$, $\\log_3\\frac{1}{27}$ y $\\log 0{,}01$.', 'احسب $\\log_4 64$ و$\\log_3\\frac{1}{27}$ و$\\log 0{,}01$.', 'Work out $\\log_4 64$, $\\log_3\\frac{1}{27}$ and $\\log 0{,}01$.'),
        example: same('$\\begin{gathered}4^{3}=64\\qquad 3^{-3}=\\frac{1}{27}\\\\ 10^{-2}=0{,}01\\end{gathered}$'),
        exampleAnswer: say('3, $-3$ eta $-2$: logaritmoak berretzaileak dira.', '3, $-3$ y $-2$: los logaritmos son los exponentes.', '3 و$-3$ و$-2$: اللوغاريتمات هي الأسس.', '3, $-3$ and $-2$: the logarithms are the exponents.')
    },
    'log-graph': {
        vocabulary: [
            say('alderantzizkoa', 'inversa', 'العكسية', 'inverse'),
            say('asintota bertikala', 'asíntota vertical', 'مقارب رأسي', 'vertical asymptote')
        ],
        explanation: say(
            '$y=\\log_a x$ funtzioa $y=a^{x}$ funtzioaren alderantzizkoa da: bikoteak trukatzen dira, eta $(3,\\,8)$ batean badago, $(8,\\,3)$ bestean dago. Horregatik, grafikoak $y=x$ zuzenarekiko simetrikoak dira. Dom $f=(0,\\,+\\infty)$ eta Rec $f=\\mathbb{R}$; $(1,\\,0)$ eta $(a,\\,1)$ puntuetatik pasatzen da, eta $x=0$ asintota bertikala da.',
            '$y=\\log_a x$ es la inversa de $y=a^{x}$: las parejas se intercambian, y si $(3,\\,8)$ está en una, $(8,\\,3)$ está en la otra. Por eso sus gráficas son simétricas respecto de $y=x$. Dom $f=(0,\\,+\\infty)$ y Rec $f=\\mathbb{R}$; pasa por $(1,\\,0)$ y por $(a,\\,1)$, y $x=0$ es una asíntota vertical.',
            '$y=\\log_a x$ هي الدالة العكسية لـ $y=a^{x}$: تتبادل الأزواج، فإذا كانت $(3,\\,8)$ على إحداهما كانت $(8,\\,3)$ على الأخرى. لذلك الرسمان متماثلان بالنسبة إلى $y=x$. Dom $f=(0,\\,+\\infty)$ وRec $f=\\mathbb{R}$؛ تمر بـ $(1,\\,0)$ و$(a,\\,1)$، و$x=0$ مقارب رأسي.',
            '$y=\\log_a x$ is the inverse of $y=a^{x}$: the pairs swap, and if $(3,\\,8)$ is on one, $(8,\\,3)$ is on the other. That is why their graphs are symmetric about $y=x$. Dom $f=(0,\\,+\\infty)$ and Rec $f=\\mathbb{R}$; it goes through $(1,\\,0)$ and $(a,\\,1)$, and $x=0$ is a vertical asymptote.'
        ),
        examplePrompt: say('Egin $y=\\log_2 x$ funtzioaren taula bat: $\\frac{1}{4}$, $\\frac{1}{2}$, 1, 2 eta 4.', 'Haz una tabla de $y=\\log_2 x$ con $\\frac{1}{4}$, $\\frac{1}{2}$, 1, 2 y 4.', 'أنشئ جدولًا لـ $y=\\log_2 x$ عند $\\frac{1}{4}$ و$\\frac{1}{2}$ و1 و2 و4.', 'Make a table of $y=\\log_2 x$ at $\\frac{1}{4}$, $\\frac{1}{2}$, 1, 2 and 4.'),
        example: same('$\\frac{1}{4},\\ \\frac{1}{2},\\ 1,\\ 2,\\ 4\\ \\to\\ -2,\\ -1,\\ 0,\\ 1,\\ 2$'),
        exampleAnswer: say('Gorakorra da, baina poliki; $x<1$ denean, negatiboa.', 'Crece, pero despacio; para $x<1$ es negativa.', 'متزايدة ولكن ببطء، وسالبة عندما $x<1$.', 'It increases, but slowly; for $x<1$ it is negative.'),
        why: {
            text: say(
                '$2^{3}=8$ bada, $(3,\\,8)$ puntua $y=2^{x}$ funtzioan dago, eta $\\log_2 8=3$ berdintzak $(8,\\,3)$ jartzen du $y=\\log_2 x$ funtzioan. $x$ eta $y$ trukatzea $y=x$ zuzenean islatzea da: puntuz puntu, grafiko bat bestearen islapena da.',
                'Si $2^{3}=8$, el punto $(3,\\,8)$ está en $y=2^{x}$, y $\\log_2 8=3$ pone $(8,\\,3)$ en $y=\\log_2 x$. Cambiar $x$ por $y$ es reflejar en la recta $y=x$: punto a punto, una gráfica es el reflejo de la otra.',
                'بما أن $2^{3}=8$ فالنقطة $(3,\\,8)$ على $y=2^{x}$، و$\\log_2 8=3$ تضع $(8,\\,3)$ على $y=\\log_2 x$. وتبديل $x$ بـ $y$ انعكاس في المستقيم $y=x$: نقطة نقطة، كل رسم انعكاس للآخر.',
                'Since $2^{3}=8$, the point $(3,\\,8)$ is on $y=2^{x}$, and $\\log_2 8=3$ puts $(8,\\,3)$ on $y=\\log_2 x$. Swapping $x$ and $y$ is reflecting in the line $y=x$: point by point, one graph is the reflection of the other.'
            )
        }
    },
    'log-shifts': {
        vocabulary: [
            say('izate-eremua', 'dominio', 'المجال', 'domain'),
            say('asintota bertikala', 'asíntota vertical', 'مقارب رأسي', 'vertical asymptote')
        ],
        explanation: say(
            '$y=\\log_a(x-p)+q$ funtzioa $y=\\log_a x$ da, $p$ horizontalean eta $q$ bertikalean mugituta. Barrukoak positiboa izan behar du: $x-p>0$; beraz, Dom $f=(p,\\,+\\infty)$, eta asintota bertikala $x=p$ da. $(1,\\,0)$ puntua $(p+1,\\,q)$ puntura doa.',
            '$y=\\log_a(x-p)+q$ es $y=\\log_a x$ movida $p$ en horizontal y $q$ en vertical. Lo de dentro tiene que ser positivo: $x-p>0$, así que Dom $f=(p,\\,+\\infty)$, y la asíntota vertical es $x=p$. El punto $(1,\\,0)$ pasa a $(p+1,\\,q)$.',
            '$y=\\log_a(x-p)+q$ هي $y=\\log_a x$ بعد تحريكها $p$ أفقيًا و$q$ رأسيًا. يجب أن يكون ما بالداخل موجبًا: $x-p>0$، إذن Dom $f=(p,\\,+\\infty)$، والمقارب الرأسي $x=p$. والنقطة $(1,\\,0)$ تنتقل إلى $(p+1,\\,q)$.',
            '$y=\\log_a(x-p)+q$ is $y=\\log_a x$ moved $p$ horizontally and $q$ vertically. What is inside must be positive: $x-p>0$, so Dom $f=(p,\\,+\\infty)$, and the vertical asymptote is $x=p$. The point $(1,\\,0)$ goes to $(p+1,\\,q)$.'
        ),
        examplePrompt: say('Aurkitu $y=\\log_2(x+2)$ funtzioaren izate-eremua eta X ardatzarekiko ebaki-puntua.', 'Halla el dominio de $y=\\log_2(x+2)$ y su corte con el eje X.', 'أوجد مجال $y=\\log_2(x+2)$ ونقطة تقاطعه مع محور X.', 'Find the domain of $y=\\log_2(x+2)$ and where it cuts the X axis.'),
        example: same('$\\begin{gathered}x+2>0\\ \\to\\ x>-2\\\\ x+2=1\\ \\to\\ x=-1\\end{gathered}$'),
        exampleAnswer: say('Dom $f=(-2,\\,+\\infty)$; X ardatza $(-1,\\,0)$ puntuan mozten du, $\\log_2 1=0$ delako.', 'Dom $f=(-2,\\,+\\infty)$; corta al eje X en $(-1,\\,0)$, porque $\\log_2 1=0$.', 'Dom $f=(-2,\\,+\\infty)$؛ ويقطع محور X في $(-1,\\,0)$ لأن $\\log_2 1=0$.', 'Dom $f=(-2,\\,+\\infty)$; it cuts the X axis at $(-1,\\,0)$, because $\\log_2 1=0$.')
    },

    /* ---------- 4. Sine and cosine ---------- */
    'trig-values': {
        vocabulary: [
            say('radiana', 'radián', 'راديان', 'radian'),
            say('zirkunferentzia unitarioa', 'circunferencia unidad', 'دائرة الوحدة', 'unit circle')
        ],
        explanation: say(
            'Funtzio trigonometrikoetan, $x$ angelu bat da, radianetan: $\\pi$ rad $=180°$. Zirkunferentzia unitarioan, $x$ angeluak $(\\cos x,\\,\\sin x)$ puntua ematen du, eta horrela irakurtzen dira balioak: $\\sin\\frac{\\pi}{2}=1$, $\\cos\\pi=-1$. Bira bat, $2\\pi$, gehituta puntu berera itzultzen da: funtzio periodikoak dira.',
            'En las funciones trigonométricas, $x$ es un ángulo en radianes: $\\pi$ rad $=180°$. En la circunferencia unidad, el ángulo $x$ da el punto $(\\cos x,\\,\\sin x)$, y así se leen los valores: $\\sin\\frac{\\pi}{2}=1$, $\\cos\\pi=-1$. Al sumar una vuelta, $2\\pi$, se vuelve al mismo punto: son funciones periódicas.',
            'في الدوال المثلثية $x$ زاوية بالراديان: $\\pi$ rad $=180°$. وفي دائرة الوحدة تعطي الزاوية $x$ النقطة $(\\cos x,\\,\\sin x)$، وهكذا تُقرأ القيم: $\\sin\\frac{\\pi}{2}=1$ و$\\cos\\pi=-1$. وبإضافة دورة $2\\pi$ نعود إلى النقطة نفسها: إنها دوال دورية.',
            'In trigonometric functions, $x$ is an angle in radians: $\\pi$ rad $=180°$. On the unit circle, the angle $x$ gives the point $(\\cos x,\\,\\sin x)$, and that is how you read the values: $\\sin\\frac{\\pi}{2}=1$, $\\cos\\pi=-1$. Adding a full turn, $2\\pi$, brings you back to the same point: they are periodic functions.'
        ),
        examplePrompt: say('Kalkulatu $\\sin\\frac{7\\pi}{6}$ eta $\\cos\\frac{5\\pi}{3}$.', 'Calcula $\\sin\\frac{7\\pi}{6}$ y $\\cos\\frac{5\\pi}{3}$.', 'احسب $\\sin\\frac{7\\pi}{6}$ و$\\cos\\frac{5\\pi}{3}$.', 'Work out $\\sin\\frac{7\\pi}{6}$ and $\\cos\\frac{5\\pi}{3}$.'),
        example: same('$\\begin{gathered}\\sin\\frac{7\\pi}{6}=\\sin 210°=-\\frac{1}{2}\\\\ \\cos\\frac{5\\pi}{3}=\\cos 300°=\\frac{1}{2}\\end{gathered}$'),
        exampleAnswer: say('210° hirugarren koadrantean dago (sinu negatiboa), eta 300°, laugarrenean (kosinu positiboa).', '210° está en el tercer cuadrante (seno negativo), y 300°, en el cuarto (coseno positivo).', '210° في الربع الثالث (الجيب سالب) و300° في الرابع (جيب التمام موجب).', '210° is in the third quadrant (negative sine), and 300° in the fourth (positive cosine).')
    },
    sine: {
        vocabulary: [
            say('sinua', 'seno', 'الجيب', 'sine'),
            say('periodoa', 'periodo', 'الدور', 'period'),
            say('bakoitia', 'impar', 'فردية', 'odd')
        ],
        explanation: say(
            '$y=\\sin x$ funtzioak angelu bakoitzari zirkunferentzia unitarioko puntuaren altuera ematen dio. Dom $f=\\mathbb{R}$ eta Rec $f=[-1,\\,1]$. Periodikoa da, $2\\pi$ periodokoa: nahikoa da $[0,\\,2\\pi]$ tartean marraztea. Maximoa $\\frac{\\pi}{2}$ puntuan du, minimoa $\\frac{3\\pi}{2}$ puntuan, eta zeroak $x=k\\pi$ puntuetan. Bakoitia da: $\\sin(-x)=-\\sin x$.',
            '$y=\\sin x$ da a cada ángulo la altura del punto de la circunferencia unidad. Dom $f=\\mathbb{R}$ y Rec $f=[-1,\\,1]$. Es periódica, de periodo $2\\pi$: basta dibujarla en $[0,\\,2\\pi]$. Tiene el máximo en $\\frac{\\pi}{2}$, el mínimo en $\\frac{3\\pi}{2}$ y los ceros en $x=k\\pi$. Es impar: $\\sin(-x)=-\\sin x$.',
            'تعطي $y=\\sin x$ لكل زاوية ارتفاع النقطة على دائرة الوحدة. Dom $f=\\mathbb{R}$ وRec $f=[-1,\\,1]$. وهي دورية دورها $2\\pi$: يكفي رسمها في $[0,\\,2\\pi]$. قيمتها العظمى عند $\\frac{\\pi}{2}$ والصغرى عند $\\frac{3\\pi}{2}$ وأصفارها عند $x=k\\pi$. وهي فردية: $\\sin(-x)=-\\sin x$.',
            '$y=\\sin x$ gives each angle the height of the point on the unit circle. Dom $f=\\mathbb{R}$ and Rec $f=[-1,\\,1]$. It is periodic, with period $2\\pi$: drawing it on $[0,\\,2\\pi]$ is enough. It has its maximum at $\\frac{\\pi}{2}$, its minimum at $\\frac{3\\pi}{2}$ and its zeros at $x=k\\pi$. It is odd: $\\sin(-x)=-\\sin x$.'
        ),
        examplePrompt: say('Zein $x$ balioetan, $[-2\\pi,\\,2\\pi]$ tartean, ditu minimoak $y=\\sin x$ funtzioak?', '¿En qué $x$ de $[-2\\pi,\\,2\\pi]$ tiene mínimos $y=\\sin x$?', 'عند أي قيم $x$ في $[-2\\pi,\\,2\\pi]$ تكون لـ $y=\\sin x$ قيم صغرى؟', 'At which $x$ in $[-2\\pi,\\,2\\pi]$ does $y=\\sin x$ have minima?'),
        example: same('$\\frac{3\\pi}{2}\\qquad\\frac{3\\pi}{2}-2\\pi=-\\frac{\\pi}{2}$'),
        exampleAnswer: say('Bi minimo, $-\\frac{\\pi}{2}$ eta $\\frac{3\\pi}{2}$, periodo bateko tartearekin.', 'Dos mínimos, $-\\frac{\\pi}{2}$ y $\\frac{3\\pi}{2}$, separados un periodo.', 'قيمتان صغريان $-\\frac{\\pi}{2}$ و$\\frac{3\\pi}{2}$ يفصل بينهما دور واحد.', 'Two minima, $-\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$, one period apart.')
    },
    cosine: {
        vocabulary: [
            say('kosinua', 'coseno', 'جيب التمام', 'cosine'),
            say('bikoitia', 'par', 'زوجية', 'even')
        ],
        explanation: say(
            '$y=\\cos x$ funtzioak zirkunferentzia unitarioko puntuaren abszisa ematen du. Sinuaren izate-eremu, ibiltarte eta periodo berak ditu, baina 1 balioan hasten da: maximoa $x=0$ puntuan, minimoa $x=\\pi$ puntuan eta zeroak $x=\\frac{\\pi}{2}+k\\pi$ puntuetan. Bikoitia da: $\\cos(-x)=\\cos x$. Gainera, $\\sin^{2}x+\\cos^{2}x=1$.',
            '$y=\\cos x$ da la abscisa del punto de la circunferencia unidad. Tiene el mismo dominio, recorrido y periodo que el seno, pero empieza en 1: máximo en $x=0$, mínimo en $x=\\pi$ y ceros en $x=\\frac{\\pi}{2}+k\\pi$. Es par: $\\cos(-x)=\\cos x$. Además, $\\sin^{2}x+\\cos^{2}x=1$.',
            'تعطي $y=\\cos x$ فاصلة النقطة على دائرة الوحدة. لها مجال الجيب ومداه ودوره، لكنها تبدأ من 1: عظمى عند $x=0$ وصغرى عند $x=\\pi$ وأصفار عند $x=\\frac{\\pi}{2}+k\\pi$. وهي زوجية: $\\cos(-x)=\\cos x$. وكذلك $\\sin^{2}x+\\cos^{2}x=1$.',
            '$y=\\cos x$ gives the x-coordinate of the point on the unit circle. It has the same domain, range and period as the sine, but starts at 1: maximum at $x=0$, minimum at $x=\\pi$ and zeros at $x=\\frac{\\pi}{2}+k\\pi$. It is even: $\\cos(-x)=\\cos x$. Also, $\\sin^{2}x+\\cos^{2}x=1$.'
        ),
        examplePrompt: say('Kalkulatu $\\cos(-\\pi)$ eta $\\cos\\frac{5\\pi}{2}$.', 'Calcula $\\cos(-\\pi)$ y $\\cos\\frac{5\\pi}{2}$.', 'احسب $\\cos(-\\pi)$ و$\\cos\\frac{5\\pi}{2}$.', 'Work out $\\cos(-\\pi)$ and $\\cos\\frac{5\\pi}{2}$.'),
        example: same('$\\begin{gathered}\\cos(-\\pi)=\\cos\\pi=-1\\\\ \\cos\\frac{5\\pi}{2}=\\cos\\frac{\\pi}{2}=0\\end{gathered}$'),
        exampleAnswer: say('Kosinua bikoitia da, eta $\\frac{5\\pi}{2}$ angelua $\\frac{\\pi}{2}$ gehi bira bat da.', 'El coseno es par, y $\\frac{5\\pi}{2}$ es $\\frac{\\pi}{2}$ más una vuelta.', 'جيب التمام زوجي، و$\\frac{5\\pi}{2}$ هي $\\frac{\\pi}{2}$ ودورة كاملة.', 'The cosine is even, and $\\frac{5\\pi}{2}$ is $\\frac{\\pi}{2}$ plus a full turn.')
    },

    /* ---------- 5. Amplitude, period and tangent ---------- */
    amplitude: {
        vocabulary: [
            say('anplitudea', 'amplitud', 'السعة', 'amplitude'),
            say('ibiltartea', 'recorrido', 'المدى', 'range')
        ],
        explanation: say(
            '$y=A\\sin x+d$ funtzioan, $|A|$ anplitudea da: gailurrak luzatzen ditu, eta $A$ negatibo batek grafikoa iraultzen du. $d$ zenbakiak kurba osoa igo edo jaisten du. Ibiltartea $[d-|A|,\\,d+|A|]$ da: maximoa $d+|A|$ da, eta minimoa, $d-|A|$. Periodoa ez da aldatzen: $2\\pi$ da.',
            'En $y=A\\sin x+d$, $|A|$ es la amplitud: estira las crestas, y una $A$ negativa da la vuelta a la gráfica. $d$ sube o baja toda la curva. El recorrido es $[d-|A|,\\,d+|A|]$: el máximo es $d+|A|$ y el mínimo, $d-|A|$. El periodo no cambia: sigue siendo $2\\pi$.',
            'في $y=A\\sin x+d$ تكون $|A|$ السعة: تمدّ القمم، و$A$ السالبة تقلب الرسم. و$d$ ترفع المنحنى كله أو تخفضه. والمدى $[d-|A|,\\,d+|A|]$: العظمى $d+|A|$ والصغرى $d-|A|$. والدور لا يتغير: يبقى $2\\pi$.',
            'In $y=A\\sin x+d$, $|A|$ is the amplitude: it stretches the crests, and a negative $A$ turns the graph upside down. $d$ moves the whole curve up or down. The range is $[d-|A|,\\,d+|A|]$: the maximum is $d+|A|$ and the minimum, $d-|A|$. The period does not change: it is still $2\\pi$.'
        ),
        examplePrompt: say('Itsasgoraren altuera $h=2\\sin x+5$ da (m). Zein altueraren artean mugitzen da?', 'La altura de la marea es $h=2\\sin x+5$ (m). ¿Entre qué alturas se mueve?', 'ارتفاع المد $h=2\\sin x+5$ (م). بين أي ارتفاعين يتحرك؟', 'The height of the tide is $h=2\\sin x+5$ (m). Between which heights does it move?'),
        example: same('$5-2=3\\qquad 5+2=7$'),
        exampleAnswer: say('3 m eta 7 m artean: 2 anplitudea, 5 inguruan.', 'Entre 3 m y 7 m: amplitud 2 alrededor de 5.', 'بين 3 م و7 م: السعة 2 حول 5.', 'Between 3 m and 7 m: amplitude 2 around 5.')
    },
    period: {
        vocabulary: [
            say('periodoa', 'periodo', 'الدور', 'period'),
            say('maximoa', 'máximo', 'القيمة العظمى', 'maximum')
        ],
        explanation: say(
            '$x$ zenbaki batez, $k$, biderkatzean, angelua $k$ aldiz azkarrago doa eta uhinak estutu egiten dira: $y=\\sin kx$ eta $y=\\cos kx$ funtzioen periodoa $T=\\frac{2\\pi}{|k|}$ da. $k$ zenbakiak ez du ibiltartea aldatzen. Grafikoan, periodoa segidako bi maximoren arteko distantzia da.',
            'Al multiplicar $x$ por $k$, el ángulo avanza $k$ veces más deprisa y las ondas se aprietan: el periodo de $y=\\sin kx$ y de $y=\\cos kx$ es $T=\\frac{2\\pi}{|k|}$. $k$ no cambia el recorrido. En la gráfica, el periodo es la distancia entre dos máximos seguidos.',
            'عند ضرب $x$ في $k$ تتقدم الزاوية أسرع بـ $k$ مرة وتتقارب الموجات: دور $y=\\sin kx$ و$y=\\cos kx$ هو $T=\\frac{2\\pi}{|k|}$. و$k$ لا تغيّر المدى. وفي الرسم الدور هو المسافة بين قيمتين عظميين متتاليتين، أي بين قمتين.',
            'Multiplying $x$ by $k$ makes the angle move $k$ times faster and the waves squeeze together: the period of $y=\\sin kx$ and of $y=\\cos kx$ is $T=\\frac{2\\pi}{|k|}$. $k$ does not change the range. On the graph, the period is the distance between two consecutive maxima.'
        ),
        examplePrompt: say('Aurkitu $y=\\sin 2x$ eta $y=\\cos\\frac{x}{3}$ funtzioen periodoa.', 'Halla el periodo de $y=\\sin 2x$ y de $y=\\cos\\frac{x}{3}$.', 'أوجد دور $y=\\sin 2x$ و$y=\\cos\\frac{x}{3}$.', 'Find the period of $y=\\sin 2x$ and of $y=\\cos\\frac{x}{3}$.'),
        example: same('$\\begin{gathered}T=\\frac{2\\pi}{2}=\\pi\\\\ T=\\frac{2\\pi}{\\frac{1}{3}}=6\\pi\\end{gathered}$'),
        exampleAnswer: say('$y=\\sin 2x$ bi aldiz azkarrago doa, eta $y=\\cos\\frac{x}{3}$, hiru aldiz polikiago.', '$y=\\sin 2x$ va el doble de rápida, y $y=\\cos\\frac{x}{3}$, tres veces más despacio.', '$y=\\sin 2x$ أسرع مرتين، و$y=\\cos\\frac{x}{3}$ أبطأ ثلاث مرات.', '$y=\\sin 2x$ goes twice as fast, and $y=\\cos\\frac{x}{3}$ three times slower.'),
        why: {
            text: say(
                'Sinuaren bira oso bat $2\\pi$ angelua da. $\\sin kx$ funtzioan angelua $kx$ da, eta bira bat ematen du $kx$ 0 zenbakitik $2\\pi$ angelura doanean, hau da, $x$ 0 zenbakitik $\\frac{2\\pi}{k}$ zenbakira doanean: hori da periodoa.',
                'Una vuelta completa del seno es un ángulo de $2\\pi$. En $\\sin kx$ el ángulo es $kx$, que da una vuelta cuando $kx$ pasa de 0 a $2\\pi$, es decir, cuando $x$ pasa de 0 a $\\frac{2\\pi}{k}$: ese es el periodo.',
                'الدورة الكاملة للجيب زاوية $2\\pi$. وفي $\\sin kx$ الزاوية هي $kx$، وتتم دورة عندما تنتقل $kx$ من 0 إلى $2\\pi$، أي عندما تنتقل $x$ من 0 إلى $\\frac{2\\pi}{k}$: وذلك هو الدور.',
                'A full turn of the sine is an angle of $2\\pi$. In $\\sin kx$ the angle is $kx$, which makes a turn when $kx$ goes from 0 to $2\\pi$, that is, when $x$ goes from 0 to $\\frac{2\\pi}{k}$: that is the period.'
            )
        }
    },
    tangent: {
        vocabulary: [
            say('tangentea', 'tangente', 'الظل', 'tangent'),
            say('asintota bertikala', 'asíntota vertical', 'مقارب رأسي', 'vertical asymptote')
        ],
        explanation: say(
            'Tangentea sinua zati kosinua da: $\\tan x=\\frac{\\sin x}{\\cos x}$. Ez da existitzen kosinua 0 den lekuan, $x=\\frac{\\pi}{2}+k\\pi$ puntuetan; han asintota bertikalak ditu. Haren ibiltartea $\\mathbb{R}$ da, eta periodoa $\\pi$, ez $2\\pi$. Adar bakoitzean gorakorra eta bakoitia da, eta haren zeroak $x=k\\pi$ dira.',
            'La tangente es el seno entre el coseno: $\\tan x=\\frac{\\sin x}{\\cos x}$. No existe donde el coseno vale 0, en $x=\\frac{\\pi}{2}+k\\pi$; ahí tiene asíntotas verticales. Su recorrido es $\\mathbb{R}$ y su periodo, $\\pi$, no $2\\pi$. Es creciente en cada rama e impar, y sus ceros son $x=k\\pi$.',
            'الظل هو الجيب على جيب التمام: $\\tan x=\\frac{\\sin x}{\\cos x}$. ولا يوجد حيث يساوي جيب التمام 0، عند $x=\\frac{\\pi}{2}+k\\pi$؛ وهناك مقاربات رأسية. مداه $\\mathbb{R}$ ودوره $\\pi$ لا $2\\pi$. وهو متزايد في كل فرع وفردي، وأصفاره $x=k\\pi$.',
            'The tangent is the sine over the cosine: $\\tan x=\\frac{\\sin x}{\\cos x}$. It does not exist where the cosine is 0, at $x=\\frac{\\pi}{2}+k\\pi$; there it has vertical asymptotes. Its range is $\\mathbb{R}$ and its period, $\\pi$, not $2\\pi$. It is increasing on each branch and odd, and its zeros are $x=k\\pi$.'
        ),
        examplePrompt: say('Kalkulatu $\\tan\\frac{3\\pi}{4}$ eta $\\tan\\left(-\\frac{\\pi}{3}\\right)$.', 'Calcula $\\tan\\frac{3\\pi}{4}$ y $\\tan\\left(-\\frac{\\pi}{3}\\right)$.', 'احسب $\\tan\\frac{3\\pi}{4}$ و$\\tan\\left(-\\frac{\\pi}{3}\\right)$.', 'Work out $\\tan\\frac{3\\pi}{4}$ and $\\tan\\left(-\\frac{\\pi}{3}\\right)$.'),
        example: same('$\\begin{gathered}\\tan\\frac{3\\pi}{4}=\\tan\\left(-\\frac{\\pi}{4}\\right)=-1\\\\ \\tan\\left(-\\frac{\\pi}{3}\\right)=-\\sqrt{3}\\end{gathered}$'),
        exampleAnswer: say('$\\pi$ kentzen da (periodoa), eta tangentea bakoitia da.', 'Se quita $\\pi$ (el periodo) y la tangente es impar.', 'نطرح $\\pi$ (الدور)، والظل فردي.', 'Take away $\\pi$ (the period), and the tangent is odd.')
    }
}
