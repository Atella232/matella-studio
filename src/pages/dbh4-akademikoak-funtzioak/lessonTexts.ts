import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { FunctionsAkTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Funtzioak · 4. DBH akademikoak — what each lesson tells: the new words
   (definitions), a short explanation, its cases, the example as an
   exercise («Another example»), the key words in four languages and, in
   three lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics. Several examples are the ones
   the lesson figures draw. Intervals and points are written left to right
   in every language; Arabic writes the decimal point ({,} becomes .).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const functionsAkLessonTexts: Record<FunctionsAkTopicId, LessonTexts> = {
    /* ---------- 1. Functions ---------- */
    'what-is': {
        definitions: [
            {
                term: say('Funtzioa', 'Función', 'الدالة', 'Function'),
                meaning: say('Aldagai independentearen balio bakoitzari mendeko aldagaiaren balio bakar bat ematen dion erlazioa.', 'Relación que a cada valor de la variable independiente le asigna un único valor de la variable dependiente.', 'علاقة تعطي كل قيمة للمتغير المستقل قيمة واحدة فقط للمتغير التابع.', 'A relation that gives each value of the independent variable exactly one value of the dependent variable.')
            }
        ],
        vocabulary: [
            say('aldagai independentea', 'variable independiente', 'المتغير المستقل', 'independent variable'),
            say('mendeko aldagaia', 'variable dependiente', 'المتغير التابع', 'dependent variable')
        ],
        explanation: say(
            'Funtzio batek bi aldagai erlazionatzen ditu: aldagai independentearen balio bakoitzari, $x$, mendeko aldagaiaren balio bakar bat dagokio, $y=f(x)$. Grafikoan, zuzen bertikal batek ere ezin du kurba bitan ebaki. $y$ bera, ordea, $x$ batzuetan errepika daiteke: $y=x^{2}$ funtzioan, $f(3)=f(-3)=9$.',
            'Una función relaciona dos variables: a cada valor de la variable independiente, $x$, le corresponde un único valor de la variable dependiente, $y=f(x)$. En la gráfica, ninguna recta vertical puede cortar la curva dos veces. Una misma $y$, en cambio, sí puede repetirse para varias $x$: en $y=x^{2}$, $f(3)=f(-3)=9$.',
            'تربط الدالة بين متغيرين: لكل قيمة للمتغير المستقل $x$ تقابلها قيمة واحدة فقط للمتغير التابع $y=f(x)$. وفي الرسم لا يمكن لأي مستقيم رأسي أن يقطع المنحنى مرتين. أما قيمة $y$ نفسها فيمكن أن تتكرر لعدة قيم $x$: في $y=x^{2}$ يكون $f(3)=f(-3)=9$.',
            'A function relates two variables: each value of the independent variable, $x$, has exactly one value of the dependent variable, $y=f(x)$. On the graph, no vertical line can cut the curve twice. The same $y$, though, can repeat for several $x$: in $y=x^{2}$, $f(3)=f(-3)=9$.'
        ),
        examplePrompt: say('$y=x^{2}+1$ funtzioa da? Eta $x^{2}+y^{2}=25$ zirkunferentzia?', '¿Es función $y=x^{2}+1$? ¿Y la circunferencia $x^{2}+y^{2}=25$?', 'هل $y=x^{2}+1$ دالة؟ وهل الدائرة $x^{2}+y^{2}=25$ دالة؟', 'Is $y=x^{2}+1$ a function? And the circle $x^{2}+y^{2}=25$?'),
        example: same('$9+y^{2}=25\\ \\to\\ y=4,\\ y=-4$'),
        exampleAnswer: say('$y=x^{2}+1$ funtzioa da; zirkunferentzia ez: 3 balioari bi $y$ dagozkio.', '$y=x^{2}+1$ es función; la circunferencia no: al 3 le tocan dos $y$.', '$y=x^{2}+1$ دالة؛ أما الدائرة فلا: للعدد 3 قيمتان لـ $y$.', '$y=x^{2}+1$ is a function; the circle is not: 3 gets two values of $y$.')
    },
    images: {
        vocabulary: [
            say('irudia', 'imagen', 'الصورة', 'image'),
            say('aurreirudia', 'antiimagen', 'الأصل', 'preimage')
        ],
        explanation: say(
            '$f(a)$ da $a$ zenbakiaren irudia: $x$ letraren ordez $a$ jartzen da, parentesi artean, eta kalkulatzen da. $(a,\\,b)$ puntua grafikoan dago $f(a)=b$ bada. Alderantziz, $b$ zenbakiaren aurreirudiak $f(x)=b$ ekuazioaren ebazpenak dira: batzuk, bat edo bat ere ez egon daitezke, eta problema batean zentzurik gabekoak baztertzen dira.',
            '$f(a)$ es la imagen de $a$: se pone $a$ en lugar de $x$, entre paréntesis, y se calcula. El punto $(a,\\,b)$ está en la gráfica si $f(a)=b$. Al revés, las antiimágenes de $b$ son las soluciones de la ecuación $f(x)=b$: puede haber varias, una o ninguna, y en un problema se descartan las que no tienen sentido.',
            '$f(a)$ هي صورة $a$: نضع $a$ مكان $x$ بين قوسين ونحسب. والنقطة $(a,\\,b)$ على الرسم إذا كان $f(a)=b$. وبالعكس، أصول $b$ هي حلول المعادلة $f(x)=b$: قد تكون عدة أصول أو أصل واحد أو لا شيء، وفي المسائل نستبعد ما لا معنى له.',
            '$f(a)$ is the image of $a$: put $a$ in place of $x$, in brackets, and work it out. The point $(a,\\,b)$ is on the graph if $f(a)=b$. The other way round, the preimages of $b$ are the solutions of the equation $f(x)=b$: there may be several, one or none, and in a problem you drop those that make no sense.'
        ),
        examplePrompt: say('$g(x)=2x^{2}-5$ bada, kalkulatu $g(-2)$ eta $x$ balioak, $g(x)=13$ betetzen dutenak.', 'Si $g(x)=2x^{2}-5$, calcula $g(-2)$ y las $x$ que cumplen $g(x)=13$.', 'إذا كانت $g(x)=2x^{2}-5$ فاحسب $g(-2)$ وقيم $x$ التي تحقق $g(x)=13$.', 'If $g(x)=2x^{2}-5$, work out $g(-2)$ and the values of $x$ with $g(x)=13$.'),
        example: same('$\\begin{gathered}g(-2)=2\\cdot 4-5=3\\\\ 2x^{2}-5=13\\ \\to\\ x^{2}=9\\ \\to\\ x=-3,\\ x=3\\end{gathered}$'),
        exampleAnswer: say('$g(-2)=3$; 13 zenbakiaren aurreirudiak $-3$ eta 3 dira.', '$g(-2)=3$; las antiimágenes de 13 son $-3$ y 3.', '$g(-2)=3$؛ وأصلا 13 هما $-3$ و3.', '$g(-2)=3$; the preimages of 13 are $-3$ and 3.')
    },
    'range-graph': {
        vocabulary: [
            say('izate-eremua', 'dominio', 'المجال', 'domain'),
            say('ibiltartea', 'recorrido', 'المدى', 'range'),
            say('bildura', 'unión', 'الاتحاد', 'union')
        ],
        explanation: say(
            'Izate-eremua, Dom $f$, irudia duten $x$ balioak dira: grafikoak X ardatzean estaltzen duena. Ibiltartea, Rec $f$, funtzioak hartzen dituen $y$ balioak dira: Y ardatzean estaltzen duena. Puntu betea tartean sartzen da, kortxetearekin; hutsa ez, parentesiarekin. Grafikoa zatituta badago, bildura erabiltzen da, $\\cup$.',
            'El dominio, Dom $f$, son las $x$ que tienen imagen: lo que cubre la gráfica en el eje X. El recorrido, Rec $f$, son las $y$ que toma: lo que cubre en el eje Y. Un punto relleno entra en el intervalo, con corchete; uno hueco no, con paréntesis. Si la gráfica está partida, se usa la unión, $\\cup$.',
            'المجال Dom $f$ هو قيم $x$ التي لها صورة: ما يغطيه الرسم على محور X. والمدى Rec $f$ هو قيم $y$ التي تأخذها الدالة: ما يغطيه على محور Y. النقطة الممتلئة تدخل في الفترة بقوس معقوف، والفارغة لا تدخل فتُكتب بقوس عادي. وإذا كان الرسم مقطّعًا نستعمل الاتحاد $\\cup$.',
            'The domain, Dom $f$, is the set of $x$ that have an image: what the graph covers on the X axis. The range, Rec $f$, is the set of $y$ the function takes: what it covers on the Y axis. A filled point belongs to the interval, with a square bracket; an open one does not, with a round bracket. If the graph is in pieces, use the union, $\\cup$.'
        ),
        examplePrompt: say('Grafiko bat $(-3,\\,1)$ puntu hutsetik $(4,\\,6)$ puntu betera doa, eta haren $y$ balioak $-2$ eta 6 artekoak dira. Idatzi izate-eremua eta ibiltartea.', 'Una gráfica va del punto hueco $(-3,\\,1)$ al punto relleno $(4,\\,6)$, y sus $y$ van de $-2$ a 6. Escribe el dominio y el recorrido.', 'يمتد رسم من النقطة الفارغة $(-3,\\,1)$ إلى النقطة الممتلئة $(4,\\,6)$، وقيم $y$ فيه من $-2$ إلى 6. اكتب المجال والمدى.', 'A graph goes from the open point $(-3,\\,1)$ to the filled point $(4,\\,6)$, and its $y$ values go from $-2$ to 6. Write the domain and the range.'),
        example: same('$\\begin{gathered}\\text{Dom}\\,f=(-3,\\,4]\\\\ \\text{Rec}\\,f=[-2,\\,6]\\end{gathered}$'),
        exampleAnswer: say('$-3$ ez da sartzen (puntu hutsa); 4, bai.', 'El $-3$ no entra (punto hueco); el 4, sí.', '$-3$ لا يدخل (نقطة فارغة)، و4 يدخل.', '$-3$ is left out (open point); 4 is in.')
    },

    /* ---------- 2. Domain of definition ---------- */
    'rational-domain': {
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator')
        ],
        explanation: say(
            'Polinomio baten izate-eremua $\\mathbb{R}$ da. Zatiki batean ezin da 0 zenbakiaz zatitu: izendatzailea 0 egiten da, ekuazioa ebazten da eta ebazpen horiek $\\mathbb{R}$ multzotik kentzen dira. Izendatzailea inoiz anulatzen ez bada, $x^{2}+1$ bezala, izate-eremua $\\mathbb{R}$ osoa da. Zenbakitzaileak ez du ezer kentzen.',
            'Un polinomio tiene dominio $\\mathbb{R}$. En una fracción no se puede dividir entre 0: se iguala el denominador a 0, se resuelve la ecuación y esas soluciones se quitan de $\\mathbb{R}$. Si el denominador no se anula nunca, como $x^{2}+1$, el dominio es todo $\\mathbb{R}$. El numerador no quita nada.',
            'مجال كثير الحدود هو $\\mathbb{R}$. وفي الكسر لا يمكن القسمة على 0: نساوي المقام بـ 0 ونحل المعادلة ونحذف تلك الحلول من $\\mathbb{R}$. وإذا لم ينعدم المقام أبدًا مثل $x^{2}+1$ فالمجال هو $\\mathbb{R}$ كلها. البسط لا يحذف شيئًا.',
            'A polynomial has domain $\\mathbb{R}$. In a fraction you cannot divide by 0: set the denominator equal to 0, solve the equation and remove those solutions from $\\mathbb{R}$. If the denominator is never 0, like $x^{2}+1$, the domain is all of $\\mathbb{R}$. The numerator removes nothing.'
        ),
        examplePrompt: say('Aurkitu $y=\\dfrac{1}{x^{2}+2x-8}$ funtzioaren izate-eremua.', 'Halla el dominio de $y=\\dfrac{1}{x^{2}+2x-8}$.', 'أوجد مجال $y=\\dfrac{1}{x^{2}+2x-8}$.', 'Find the domain of $y=\\dfrac{1}{x^{2}+2x-8}$.'),
        example: same('$\\begin{gathered}x^{2}+2x-8=0\\ \\to\\ x=-4,\\ x=2\\\\ \\text{Dom}\\,f=\\mathbb{R}-\\{-4,\\,2\\}\\end{gathered}$'),
        exampleAnswer: say('$-4$ eta 2 kentzen dira: haietan izendatzailea 0 da.', 'Se quitan $-4$ y 2: en ellos el denominador vale 0.', 'نحذف $-4$ و2: عندهما يساوي المقام 0.', 'Remove $-4$ and 2: there the denominator is 0.')
    },
    'radical-domain': {
        vocabulary: [
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand'),
            say('zeinu-taula', 'tabla de signos', 'جدول الإشارات', 'sign table')
        ],
        explanation: say(
            'Erro karratu batean errokizuna ezin da negatiboa izan: izate-eremua errokizuna $\\ge 0$ inekuazioaren ebazpena da. Lineala bada, $x$ askatzen da. Bigarren mailakoa bada, haren erroak kalkulatu eta zeinu-taula bat egiten da; muturrak sartzen dira, $\\ge$ delako. Erro kubikoek ez dute mugarik.',
            'En una raíz cuadrada el radicando no puede ser negativo: el dominio es la solución de la inecuación radicando $\\ge 0$. Si es lineal, se despeja $x$. Si es de segundo grado, se calculan sus raíces y se hace una tabla de signos; los extremos entran, porque es $\\ge$. Las raíces cúbicas no tienen restricciones.',
            'في الجذر التربيعي لا يمكن أن يكون ما تحت الجذر سالبًا: المجال هو حل المتراجحة ما تحت الجذر $\\ge 0$. إذا كان خطيًا نعزل $x$. وإذا كان من الدرجة الثانية نحسب جذريه ونرسم جدول الإشارات؛ والطرفان يدخلان لأنها $\\ge$. والجذور التكعيبية بلا قيود.',
            'In a square root the radicand cannot be negative: the domain is the solution of the inequality radicand $\\ge 0$. If it is linear, solve for $x$. If it is quadratic, find its roots and make a sign table; the end points are in, because it is $\\ge$. Cube roots have no restrictions.'
        ),
        examplePrompt: say('Aurkitu $y=\\sqrt{x^{2}-9}$ funtzioaren izate-eremua.', 'Halla el dominio de $y=\\sqrt{x^{2}-9}$.', 'أوجد مجال $y=\\sqrt{x^{2}-9}$.', 'Find the domain of $y=\\sqrt{x^{2}-9}$.'),
        example: same('$\\begin{gathered}x^{2}-9=0\\ \\to\\ x=-3,\\ x=3\\\\ (-\\infty,\\,-3]\\cup[3,\\,+\\infty)\\end{gathered}$'),
        exampleAnswer: say('Zeinuak $+\\ -\\ +$: bi aldeak balio dute, $-3$ eta 3 barne.', 'Signos $+\\ -\\ +$: valen los dos lados, con $-3$ y 3 incluidos.', 'الإشارات $+\\ -\\ +$: يصلح الطرفان مع $-3$ و3.', 'Signs $+\\ -\\ +$: both outer sides work, with $-3$ and 3 included.')
    },
    'mixed-domain': {
        vocabulary: [
            say('baldintza', 'condición', 'شرط', 'condition'),
            say('hertsiki positiboa', 'estrictamente positivo', 'موجب تمامًا', 'strictly positive')
        ],
        explanation: say(
            'Baldintza bat baino gehiago badaude, izate-eremua denak batera betetzen dituzten $x$ balioak dira. Erroa izendatzailean badago, errokizunak hertsiki positiboa izan behar du, $>0$, $\\sqrt{0}=0$ delako eta ezin delako 0 zenbakiaz zatitu. Problema batean, gainera, zentzua duten balioek bakarrik balio dute: luzera eta denbora positiboak.',
            'Si hay varias condiciones, el dominio son las $x$ que las cumplen todas a la vez. Si la raíz está en el denominador, el radicando debe ser estrictamente positivo, $>0$, porque $\\sqrt{0}=0$ y no se puede dividir entre 0. En un problema, además, solo valen los valores con sentido: longitudes y tiempos positivos.',
            'إذا وُجد أكثر من شرط فالمجال هو قيم $x$ التي تحققها كلها معًا. وإذا كان الجذر في المقام فيجب أن يكون ما تحته موجبًا تمامًا $>0$ لأن $\\sqrt{0}=0$ ولا يمكن القسمة على 0. وفي المسائل لا تصلح إلا القيم التي لها معنى: أطوال وأزمنة موجبة.',
            'If there are several conditions, the domain is the set of $x$ that meet them all at once. If the root is in the denominator, the radicand must be strictly positive, $>0$, because $\\sqrt{0}=0$ and you cannot divide by 0. In a problem, also, only values that make sense count: positive lengths and times.'
        ),
        examplePrompt: say('Aurkitu $y=\\dfrac{1}{\\sqrt{x-5}}$ funtzioaren izate-eremua.', 'Halla el dominio de $y=\\dfrac{1}{\\sqrt{x-5}}$.', 'أوجد مجال $y=\\dfrac{1}{\\sqrt{x-5}}$.', 'Find the domain of $y=\\dfrac{1}{\\sqrt{x-5}}$.'),
        example: same('$x-5>0\\ \\to\\ \\text{Dom}\\,f=(5,\\,+\\infty)$'),
        exampleAnswer: say('5 ez da sartzen: izendatzailea 0 izango litzateke.', 'El 5 no entra: el denominador sería 0.', 'العدد 5 لا يدخل: سيصبح المقام 0.', '5 is left out: the denominator would be 0.')
    },

    /* ---------- 3. Continuity and pieces ---------- */
    discontinuities: {
        vocabulary: [
            say('jarraitua', 'continua', 'متصلة', 'continuous'),
            say('etenunea', 'discontinuidad', 'انقطاع', 'discontinuity'),
            say('asintota', 'asíntota', 'مقارب', 'asymptote')
        ],
        explanation: say(
            'Funtzio bat jarraitua da puntu batean, bertan definituta badago eta haren grafikoa inguruan arkatza altxatu gabe marrazten bada. Bestela, puntu hori etenunea da, hiru motatakoa. Zatikietan, izendatzailea anulatzen den lekuan bilatzen dira.',
            'Una función es continua en un punto si está definida en él y su gráfica se dibuja a su alrededor sin levantar el lápiz. Si no, el punto es una discontinuidad, de uno de estos tres tipos. En las fracciones, se buscan donde se anula el denominador.',
            'تكون الدالة متصلة عند نقطة إذا كانت معرّفة فيها وأمكن رسم منحناها حولها دون رفع القلم. وإلا فالنقطة نقطة انقطاع من أحد هذه الأنواع الثلاثة. وفي الكسور نبحث عنها حيث ينعدم المقام.',
            'A function is continuous at a point if it is defined there and its graph can be drawn around it without lifting the pencil. If not, the point is a discontinuity, of one of these three kinds. In fractions, look where the denominator is 0.'
        ),
        cases: [
            { title: say('Saihesgarria', 'Evitable', 'قابل للإزالة', 'Removable'), text: say('Zulo bat, puntu bakar batekin estaltzen dena.', 'Un agujero que se tapa con un solo punto.', 'ثقب يُسدّ بنقطة واحدة.', 'A hole that a single point would fill.') },
            { title: say('Jauzi finitukoa', 'De salto finito', 'قفزة منتهية', 'Finite jump'), text: say('Alde banatan, balio desberdinak.', 'A cada lado, valores distintos.', 'قيمتان مختلفتان على الجانبين.', 'Different values on each side.') },
            { title: say('Jauzi infinitukoa', 'De salto infinito', 'قفزة لانهائية', 'Infinite jump'), text: say('Adar infinitu bat: asintota bertikala.', 'Una rama infinita: asíntota vertical.', 'فرع لانهائي: مقارب رأسي.', 'An infinite branch: a vertical asymptote.') }
        ],
        examplePrompt: say('Kalkulatu $y=\\dfrac{1}{(x-2)^{2}}$ 2 zenbakitik hurbil, eta esan zer etenune dagoen 2 puntuan.', 'Calcula $y=\\dfrac{1}{(x-2)^{2}}$ cerca de 2 y di qué discontinuidad hay en 2.', 'احسب $y=\\dfrac{1}{(x-2)^{2}}$ قرب 2 وبيّن نوع الانقطاع عند 2.', 'Work out $y=\\dfrac{1}{(x-2)^{2}}$ near 2 and say which discontinuity there is at 2.'),
        example: same('$\\begin{gathered}\\frac{1}{(1{,}9-2)^{2}}=\\frac{1}{0{,}01}=100\\\\ \\frac{1}{(1{,}99-2)^{2}}=10\\,000\\end{gathered}$'),
        exampleAnswer: say('$y$ gero eta handiagoa da: jauzi infinitukoa, asintota bertikal batekin.', 'La $y$ crece sin parar: salto infinito, con una asíntota vertical.', 'تكبر $y$ بلا حد: قفزة لانهائية مع مقارب رأسي.', 'The $y$ grows without limit: an infinite jump, with a vertical asymptote.')
    },
    piecewise: {
        vocabulary: [
            say('zatika', 'a trozos', 'على أجزاء', 'piecewise'),
            say('zatia', 'trozo', 'جزء', 'piece')
        ],
        explanation: say(
            'Zatika definitutako funtzio batek formula desberdin bat du bere izate-eremuaren zati bakoitzean. Irudi bat kalkulatzeko, begiratu lehenik $x$ zein zatitan dagoen, eta erabili zati horren formula bakarrik. Marraztean, zati bakoitza bere tartean bakarrik doa: puntu betea $\\le$ edo $\\ge$ denean, hutsa $<$ edo $>$ denean.',
            'Una función definida a trozos tiene una fórmula distinta en cada parte de su dominio. Para calcular una imagen, mira primero en qué trozo está $x$ y usa solo la fórmula de ese trozo. Al dibujarla, cada trozo va solo en su intervalo: punto relleno con $\\le$ o $\\ge$, y hueco con $<$ o $>$.',
            'للدالة المعرّفة على أجزاء صيغة مختلفة في كل جزء من مجالها. لحساب صورة انظر أولًا في أي جزء تقع $x$ واستعمل صيغة ذلك الجزء وحدها. وعند الرسم يُرسم كل جزء في فترته فقط: نقطة ممتلئة مع $\\le$ أو $\\ge$، وفارغة مع $<$ أو $>$.',
            'A piecewise function has a different formula on each part of its domain. To find an image, first see which piece $x$ is in and use only that piece\'s formula. When drawing it, each piece goes only on its interval: a filled point with $\\le$ or $\\ge$, and an open one with $<$ or $>$.'
        ),
        examplePrompt: say('$f(x)=-x$ $x<0$ denean, $f(x)=x^{2}$ $0\\le x<2$ denean eta $f(x)=1$ $x\\ge 2$ denean, kalkulatu $f(-3)$, $f(1)$ eta $f(2)$.', 'Si $f(x)=-x$ para $x<0$, $f(x)=x^{2}$ para $0\\le x<2$ y $f(x)=1$ para $x\\ge 2$, calcula $f(-3)$, $f(1)$ y $f(2)$.', 'إذا كانت $f(x)=-x$ عندما $x<0$، و$f(x)=x^{2}$ عندما $0\\le x<2$، و$f(x)=1$ عندما $x\\ge 2$، فاحسب $f(-3)$ و$f(1)$ و$f(2)$.', 'If $f(x)=-x$ for $x<0$, $f(x)=x^{2}$ for $0\\le x<2$ and $f(x)=1$ for $x\\ge 2$, work out $f(-3)$, $f(1)$ and $f(2)$.'),
        example: same('$f(-3)=3\\qquad f(1)=1^{2}=1\\qquad f(2)=1$'),
        exampleAnswer: say('2 hirugarren zatian dago, $x\\ge 2$ delako.', 'El 2 va en el tercer trozo, porque $x\\ge 2$.', 'العدد 2 في الجزء الثالث لأن $x\\ge 2$.', '2 goes in the third piece, because $x\\ge 2$.')
    },
    'piecewise-continuity': {
        vocabulary: [
            say('lotunea', 'unión', 'نقطة الالتقاء', 'join'),
            say('jauzia', 'salto', 'القفزة', 'jump')
        ],
        explanation: say(
            'Zati bakoitza polinomio bat bada, funtzioa lotuneetan bakarrik izan daiteke etena. Lotune bakoitzean, kalkulatu ezkerreko zatiaren balioa eta eskuinekoarena, bietako batek puntua sartzen ez badu ere. Berdinak badira, jarraitua da; bestela, jauzi finitu bat dago, kenduraren adinakoa. Parametro bat aurkitzeko, berdindu bi balioak.',
            'Si cada trozo es un polinomio, la función solo puede ser discontinua en las uniones. En cada unión, calcula el valor del trozo izquierdo y el del derecho, aunque uno de ellos no incluya el punto. Si coinciden, es continua; si no, hay un salto finito, igual a la diferencia. Para hallar un parámetro, iguala los dos valores.',
            'إذا كان كل جزء كثير حدود فلا يمكن أن تنقطع الدالة إلا عند نقاط الالتقاء. وعند كل نقطة التقاء احسب قيمة الجزء الأيسر وقيمة الأيمن حتى لو لم يشمل أحدهما النقطة. فإن تساوتا فهي متصلة، وإلا ففيها قفزة منتهية بقدر الفرق. ولإيجاد وسيط ساوِ القيمتين.',
            'If each piece is a polynomial, the function can only be discontinuous at the joins. At each join, work out the value of the left piece and of the right one, even if one does not include the point. If they match, it is continuous; if not, there is a finite jump, equal to the difference. To find a parameter, set the two values equal.'
        ),
        examplePrompt: say('Aurkitu $k$, $f(x)=x^{2}-1$ ($x\\le 2$), $f(x)=x+k$ ($x>2$) funtzioa jarraitua izan dadin.', 'Halla $k$ para que $f(x)=x^{2}-1$ ($x\\le 2$), $f(x)=x+k$ ($x>2$) sea continua.', 'أوجد $k$ لتكون $f(x)=x^{2}-1$ ($x\\le 2$)، $f(x)=x+k$ ($x>2$) متصلة.', 'Find $k$ so that $f(x)=x^{2}-1$ ($x\\le 2$), $f(x)=x+k$ ($x>2$) is continuous.'),
        example: same('$2^{2}-1=2+k\\ \\to\\ 3=2+k\\ \\to\\ k=1$'),
        exampleAnswer: say('$k=1$ denean, bi zatiek 3 balio dute 2 puntuan.', 'Con $k=1$, los dos trozos valen 3 en el 2.', 'عندما $k=1$ يعطي الجزءان 3 عند 2.', 'With $k=1$, both pieces give 3 at 2.')
    },

    /* ---------- 4. Intercepts, sign and symmetry ---------- */
    intercepts: {
        vocabulary: [
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'intercept'),
            say('faktorizatu', 'factorizar', 'حلّل', 'factorise')
        ],
        explanation: say(
            'Y ardatzarekiko ebaki-puntua $(0,\\,f(0))$ da, 0 izate-eremuan badago. X ardatzarekikoak $f(x)=0$ ekuazioaren ebazpenak dira: polinomioetan, faktorizatu (faktore komuna, taldekatu edo Ruffini), eta bikarratuetan egin $t=x^{2}$. Zatiki batean, zenbakitzailea berdintzen da 0 zenbakira. Gehienez, mailak adina ebaki-puntu daude.',
            'El corte con el eje Y es $(0,\\,f(0))$, si 0 está en el dominio. Los cortes con el eje X son las soluciones de $f(x)=0$: en los polinomios, factoriza (factor común, agrupar o Ruffini), y en las bicuadradas haz $t=x^{2}$. En una fracción, se iguala a 0 el numerador. Hay como mucho tantos cortes como indica el grado.',
            'نقطة التقاطع مع محور Y هي $(0,\\,f(0))$ إذا كان 0 في المجال. ونقاط التقاطع مع محور X هي حلول $f(x)=0$: في كثيرات الحدود حلّل (عامل مشترك أو تجميع أو روفيني)، وفي المعادلات الثنائية التربيع ضع $t=x^{2}$. وفي الكسر نساوي البسط بـ 0. وعدد نقاط التقاطع لا يتجاوز الدرجة.',
            'The Y-axis intercept is $(0,\\,f(0))$, if 0 is in the domain. The X-axis intercepts are the solutions of $f(x)=0$: in polynomials, factorise (common factor, grouping or Ruffini), and in biquadratics put $t=x^{2}$. In a fraction, set the numerator equal to 0. There are at most as many intercepts as the degree.'
        ),
        examplePrompt: say('Aurkitu $y=x^{3}-x^{2}-4x+4$ funtzioak ardatzekin dituen ebaki-puntuak.', 'Halla los puntos de corte de $y=x^{3}-x^{2}-4x+4$ con los ejes.', 'أوجد نقاط تقاطع $y=x^{3}-x^{2}-4x+4$ مع المحورين.', 'Find where $y=x^{3}-x^{2}-4x+4$ cuts the axes.'),
        example: same('$\\begin{gathered}(x-1)(x-2)(x+2)=0\\\\ (1,\\,0)\\quad(2,\\,0)\\quad(-2,\\,0)\\quad(0,\\,4)\\end{gathered}$'),
        exampleAnswer: say('Taldekatuz, $x^{2}(x-1)-4(x-1)$; Y ardatza $(0,\\,4)$ puntuan mozten du.', 'Agrupando, $x^{2}(x-1)-4(x-1)$; corta al eje Y en $(0,\\,4)$.', 'بالتجميع $x^{2}(x-1)-4(x-1)$؛ ويقطع محور Y في $(0,\\,4)$.', 'Grouping, $x^{2}(x-1)-4(x-1)$; it cuts the Y axis at $(0,\\,4)$.')
    },
    sign: {
        vocabulary: [
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('positiboa', 'positiva', 'موجبة', 'positive'),
            say('negatiboa', 'negativa', 'سالبة', 'negative')
        ],
        explanation: say(
            'Funtzio bat positiboa da grafikoa X ardatzaren gainean dagoen lekuan, eta negatiboa azpian dagoen lekuan. Funtzio jarraitu batek X ardatzarekiko ebaki-puntuetan bakarrik alda dezake zeinua. Horregatik: kalkulatu ebaki-puntuak, zatitu zuzena tartetan eta probatu zenbaki bat tarte bakoitzean. Zeinuarekin, $\\sqrt{f(x)}$ funtzioaren izate-eremua ere ateratzen da, $f\\ge 0$ denean.',
            'Una función es positiva donde su gráfica está por encima del eje X, y negativa donde está por debajo. Si es continua, solo cambia de signo en sus cortes con el eje X. Por eso: calcula los cortes, divide la recta en intervalos y prueba un número en cada uno. El signo da el dominio de $\\sqrt{f(x)}$: donde $f\\ge 0$.',
            'تكون الدالة موجبة حيث يقع منحناها فوق محور X، وسالبة حيث يقع تحته. ولا تغيّر الدالة المتصلة إشارتها إلا عند نقاط تقاطعها مع محور X. لذلك: احسب نقاط التقاطع، وقسّم المستقيم إلى فترات، وجرّب عددًا في كل فترة. ومن الإشارة نحصل أيضًا على مجال $\\sqrt{f(x)}$ حيث $f\\ge 0$.',
            'A function is positive where its graph is above the X axis, and negative where it is below. A continuous function can only change sign where it cuts the X axis. So: find those points, split the line into intervals and try one number in each. The sign also gives the domain of $\\sqrt{f(x)}$, where $f\\ge 0$.'
        ),
        examplePrompt: say('Aztertu $g(x)=x^{2}-x-6$ funtzioaren zeinua.', 'Estudia el signo de $g(x)=x^{2}-x-6$.', 'ادرس إشارة $g(x)=x^{2}-x-6$.', 'Study the sign of $g(x)=x^{2}-x-6$.'),
        example: same('$\\begin{gathered}x^{2}-x-6=0\\ \\to\\ x=-2,\\ x=3\\\\ g(-3)=6\\qquad g(0)=-6\\qquad g(4)=6\\end{gathered}$'),
        exampleAnswer: say('Positiboa $(-\\infty,\\,-2)\\cup(3,\\,+\\infty)$ tartean, eta negatiboa $(-2,\\,3)$ tartean.', 'Positiva en $(-\\infty,\\,-2)\\cup(3,\\,+\\infty)$ y negativa en $(-2,\\,3)$.', 'موجبة في $(-\\infty,\\,-2)\\cup(3,\\,+\\infty)$ وسالبة في $(-2,\\,3)$.', 'Positive on $(-\\infty,\\,-2)\\cup(3,\\,+\\infty)$ and negative on $(-2,\\,3)$.'),
        why: {
            text: say(
                'Funtzio jarraitu batek ez du jauzirik egiten: balio positiboetatik negatiboetara igarotzeko, X ardatza zeharkatu behar du, eta han 0 balio du. Horregatik, segidako bi ebaki-punturen artean zeinua ez da aldatzen, eta nahikoa da tarte bakoitzeko zenbaki bat probatzea.',
                'Una función continua no da saltos: para pasar de valores positivos a negativos tiene que atravesar el eje X, y ahí vale 0. Por eso, entre dos cortes seguidos el signo no cambia, y basta con probar un número de cada intervalo.',
                'الدالة المتصلة لا تقفز: لكي تنتقل من قيم موجبة إلى سالبة يجب أن تعبر محور X وهناك تساوي 0. لذلك لا تتغير الإشارة بين نقطتي تقاطع متتاليتين، ويكفي تجريب عدد واحد من كل فترة.',
                'A continuous function does not jump: to go from positive to negative values it has to cross the X axis, and there it is 0. So between two consecutive intercepts the sign does not change, and trying one number in each interval is enough.'
            )
        }
    },
    symmetry: {
        vocabulary: [
            say('bikoitia', 'par', 'زوجية', 'even'),
            say('bakoitia', 'impar', 'فردية', 'odd'),
            say('simetrikoa', 'simétrica', 'متناظرة', 'symmetric')
        ],
        explanation: say(
            'Funtzio bat bikoitia da $f(-x)=f(x)$ bada: grafikoa Y ardatzarekiko simetrikoa da. Bakoitia da $f(-x)=-f(x)$ bada: jatorriarekiko simetrikoa da. Jakiteko, kalkulatu $f(-x)$ eta konparatu. Polinomioetan: berretzaile bikoitiak bakarrik (konstantea barne), bikoitia; bakoitiak bakarrik, bakoitia; nahastuta, ez bata ez bestea.',
            'Una función es par si $f(-x)=f(x)$: su gráfica es simétrica respecto del eje Y. Es impar si $f(-x)=-f(x)$: es simétrica respecto del origen. Para saberlo, calcula $f(-x)$ y compara. En los polinomios: solo exponentes pares (con la constante), par; solo impares, impar; mezclados, ninguna de las dos.',
            'تكون الدالة زوجية إذا كان $f(-x)=f(x)$: منحناها متناظر حول محور Y. وتكون فردية إذا كان $f(-x)=-f(x)$: متناظرة حول الأصل. ولمعرفة ذلك احسب $f(-x)$ وقارن. وفي كثيرات الحدود: أسس زوجية فقط (مع الثابت) زوجية، وفردية فقط فردية، ومختلطة لا هذه ولا تلك.',
            'A function is even if $f(-x)=f(x)$: its graph is symmetric about the Y axis. It is odd if $f(-x)=-f(x)$: it is symmetric about the origin. To tell, work out $f(-x)$ and compare. In polynomials: only even powers (with the constant), even; only odd ones, odd; mixed, neither.'
        ),
        examplePrompt: say('$g(x)=x^{4}-3x^{2}+1$ bikoitia, bakoitia ala ez bata ez bestea da?', '¿Es par, impar o ninguna de las dos $g(x)=x^{4}-3x^{2}+1$?', 'هل $g(x)=x^{4}-3x^{2}+1$ زوجية أم فردية أم لا هذه ولا تلك؟', 'Is $g(x)=x^{4}-3x^{2}+1$ even, odd or neither?'),
        example: same('$\\begin{gathered}g(-x)=(-x)^{4}-3(-x)^{2}+1\\\\ =x^{4}-3x^{2}+1=g(x)\\end{gathered}$'),
        exampleAnswer: say('Bikoitia da: berretzaile bikoitiak eta konstantea bakarrik ditu.', 'Es par: solo tiene exponentes pares y la constante.', 'زوجية: فيها أسس زوجية والثابت فقط.', 'It is even: it only has even powers and the constant.'),
        why: {
            text: say(
                'Berretzaile bikoiti batek zeinua ezabatzen du, $(-x)^{2}=x^{2}$, eta bakoiti batek gorde, $(-x)^{3}=-x^{3}$. Denak bikoitiak badira, $f(-x)$ eta $f(x)$ berdinak dira; denak bakoitiak badira, gai guztiek zeinua aldatzen dute eta $-f(x)$ ateratzen da.',
                'Un exponente par borra el signo, $(-x)^{2}=x^{2}$, y uno impar lo mantiene, $(-x)^{3}=-x^{3}$. Si todos son pares, $f(-x)$ es igual que $f(x)$; si todos son impares, todos los términos cambian de signo y sale $-f(x)$.',
                'الأس الزوجي يمحو الإشارة $(-x)^{2}=x^{2}$، والفردي يُبقيها $(-x)^{3}=-x^{3}$. فإذا كانت كلها زوجية كان $f(-x)$ مساويًا لـ $f(x)$، وإذا كانت كلها فردية تغيّرت إشارة كل الحدود ونتج $-f(x)$.',
                'An even power wipes out the sign, $(-x)^{2}=x^{2}$, and an odd one keeps it, $(-x)^{3}=-x^{3}$. If all are even, $f(-x)$ equals $f(x)$; if all are odd, every term changes sign and you get $-f(x)$.'
            )
        }
    },

    /* ---------- 5. Increasing, rate and period ---------- */
    monotony: {
        vocabulary: [
            say('gorakorra', 'creciente', 'متزايدة', 'increasing'),
            say('beherakorra', 'decreciente', 'متناقصة', 'decreasing'),
            say('maximoa', 'máximo', 'قيمة عظمى', 'maximum'),
            say('minimoa', 'mínimo', 'قيمة صغرى', 'minimum')
        ],
        explanation: say(
            'Funtzio bat gorakorra da $x$ handitzean $y$ handitzen bada, eta beherakorra txikitzen bada. Tarteak $x$ balioekin idazten dira, irekiak. Gorakorretik beherakorrera igarotzen den lekuan maximo erlatibo bat dago; alderantziz, minimo bat; puntu gisa ematen dira. Parabola batean, muturra erpina da.',
            'Una función es creciente si al aumentar $x$ aumenta $y$, y decreciente si disminuye. Los intervalos se escriben con las $x$, abiertos. Donde pasa de creciente a decreciente hay un máximo relativo; al revés, un mínimo; se dan como puntos. El absoluto es el más alto o el más bajo de todos. En una parábola, el extremo es el vértice.',
            'تكون الدالة متزايدة إذا زادت $y$ عند زيادة $x$، ومتناقصة إذا نقصت. وتُكتب الفترات بقيم $x$ ومفتوحة. وحيث تنتقل من متزايدة إلى متناقصة توجد قيمة عظمى نسبية، وبالعكس قيمة صغرى، وتُعطى نقاطًا. والمطلقة هي الأعلى أو الأدنى بين الجميع. وفي القطع المكافئ تكون القيمة القصوى عند الرأس.',
            'A function is increasing if $y$ grows as $x$ grows, and decreasing if it falls. Intervals are written with the $x$ values, open. Where it goes from increasing to decreasing there is a local maximum; the other way round, a minimum; they are given as points. The absolute one is the highest or lowest of all. In a parabola, the extreme is the vertex.'
        ),
        examplePrompt: say('Aztertu $y=-x^{2}+4x+1$ funtzioaren hazkundea eta muturra.', 'Estudia el crecimiento y el extremo de $y=-x^{2}+4x+1$.', 'ادرس تزايد $y=-x^{2}+4x+1$ وقيمتها القصوى.', 'Study where $y=-x^{2}+4x+1$ increases and its extreme.'),
        example: same('$\\begin{gathered}x=\\frac{-4}{2\\cdot(-1)}=2\\\\ y=-4+8+1=5\\end{gathered}$'),
        exampleAnswer: say('Gorakorra $(-\\infty,\\,2)$ tartean, beherakorra $(2,\\,+\\infty)$ tartean, eta maximoa $(2,\\,5)$ puntuan.', 'Crece en $(-\\infty,\\,2)$, decrece en $(2,\\,+\\infty)$ y tiene un máximo en $(2,\\,5)$.', 'متزايدة في $(-\\infty,\\,2)$ ومتناقصة في $(2,\\,+\\infty)$ ولها قيمة عظمى في $(2,\\,5)$.', 'It increases on $(-\\infty,\\,2)$, decreases on $(2,\\,+\\infty)$ and has a maximum at $(2,\\,5)$.')
    },
    rate: {
        vocabulary: [
            say('batez besteko aldakuntza-tasa', 'tasa de variación media', 'معدل التغير المتوسط', 'average rate of change'),
            say('abiadura ertaina', 'velocidad media', 'السرعة المتوسطة', 'average speed')
        ],
        explanation: say(
            '$[a,\\,b]$ tarteko batez besteko aldakuntza-tasa $y$-ren aldaketa zati $x$-ren aldaketa da: T.V.M. $[a,\\,b]=\\dfrac{f(b)-f(a)}{b-a}$. Grafikoko bi puntuak lotzen dituen zuzenkiaren malda da: positiboa bada, funtzioa batez beste hazten da. $f$ distantzia bat bada eta $x$ denbora, abiadura ertaina da.',
            'La tasa de variación media en $[a,\\,b]$ es el cambio de $y$ entre el cambio de $x$: T.V.M. $[a,\\,b]=\\dfrac{f(b)-f(a)}{b-a}$. Es la pendiente del segmento que une los dos puntos de la gráfica: si es positiva, la función crece de media. Si $f$ es una distancia y $x$ el tiempo, es la velocidad media.',
            'معدل التغير المتوسط في $[a,\\,b]$ هو تغير $y$ مقسومًا على تغير $x$: T.V.M. $[a,\\,b]=\\dfrac{f(b)-f(a)}{b-a}$. وهو ميل القطعة التي تصل نقطتي الرسم: إذا كان موجبًا فالدالة تتزايد في المتوسط. وإذا كانت $f$ مسافة و$x$ الزمن فهو السرعة المتوسطة.',
            'The average rate of change on $[a,\\,b]$ is the change in $y$ over the change in $x$: T.V.M. $[a,\\,b]=\\dfrac{f(b)-f(a)}{b-a}$. It is the slope of the segment joining the two points of the graph: if it is positive, the function increases on average. If $f$ is a distance and $x$ the time, it is the average speed.'
        ),
        examplePrompt: say('Harri baten altuera $e=40t-5t^{2}$ da (m, s). Aurkitu haren abiadura ertaina $t=1$ eta $t=3$ artean.', 'La altura de una piedra es $e=40t-5t^{2}$ (m, s). Halla su velocidad media entre $t=1$ y $t=3$.', 'ارتفاع حجر $e=40t-5t^{2}$ (م، ث). أوجد سرعته المتوسطة بين $t=1$ و$t=3$.', 'The height of a stone is $e=40t-5t^{2}$ (m, s). Find its average speed between $t=1$ and $t=3$.'),
        example: same('$\\begin{gathered}e(1)=35\\qquad e(3)=75\\\\ \\frac{75-35}{3-1}=20\\end{gathered}$'),
        exampleAnswer: say('Batez beste, 20 m/s gorantz.', 'De media, 20 m/s hacia arriba.', 'في المتوسط 20 م/ث نحو الأعلى.', 'On average, 20 m/s upwards.'),
        why: {
            text: say(
                'Zatidurak grafikoa zenbat igotzen den zati zenbat aurreratzen den neurtzen du, zuzen baten malda bezala. $(a,\\,f(a))$ eta $(b,\\,f(b))$ lotzen dituen zuzenkiak aldaketa oso bera ematen du: horregatik da haren malda.',
                'El cociente mide lo que sube la gráfica entre lo que avanza, como la pendiente de una recta. El segmento que une $(a,\\,f(a))$ y $(b,\\,f(b))$ da exactamente el mismo cambio total: por eso es su pendiente.',
                'خارج القسمة يقيس كم يصعد الرسم مقابل ما يتقدمه، مثل ميل المستقيم. والقطعة التي تصل $(a,\\,f(a))$ و$(b,\\,f(b))$ تعطي التغير الكلي نفسه تمامًا: لذلك هو ميلها.',
                'The quotient measures how much the graph rises for how far it moves on, like the slope of a line. The segment joining $(a,\\,f(a))$ and $(b,\\,f(b))$ gives exactly the same total change: that is why it is its slope.'
            )
        }
    },
    periodic: {
        definitions: [
            {
                term: say('Periodoa', 'Periodo', 'الدور', 'Period'),
                meaning: say('Funtzio periodiko batean errepikatzen den tartearen luzera.', 'La longitud del intervalo que se repite en una función periódica.', 'طول الفترة التي تتكرر في الدالة الدورية.', 'The length of the interval that repeats in a periodic function.')
            }
        ],
        vocabulary: [
            say('periodikoa', 'periódica', 'دورية', 'periodic'),
            say('joera', 'tendencia', 'الاتجاه', 'tendency'),
            say('asintota horizontala', 'asíntota horizontal', 'مقارب أفقي', 'horizontal asymptote')
        ],
        explanation: say(
            'Funtzio bat periodikoa da haren grafikoa tarte jakin batean errepikatzen bada; tarte horren luzera periodoa da, $T$: $f(x+T)=f(x)$. Balio bat kalkulatzeko, zatitu periodoaz eta hartu hondarra. Joera $x$ oso handia denean $f$ hurbiltzen den balioa da; zuzen horizontal hori asintota horizontala da.',
            'Una función es periódica si su gráfica se repite cada cierto intervalo; su longitud es el periodo, $T$: $f(x+T)=f(x)$. Para calcular un valor, divide entre el periodo y quédate con el resto. La tendencia es el valor al que se acerca $f$ cuando $x$ se hace muy grande; esa recta horizontal es una asíntota horizontal.',
            'تكون الدالة دورية إذا تكرر منحناها كل فترة معيّنة، وطول هذه الفترة هو الدور $T$: $f(x+T)=f(x)$. ولحساب قيمة اقسم على الدور وخذ الباقي. والاتجاه هو القيمة التي تقترب منها $f$ عندما تكبر $x$ كثيرًا، وذلك المستقيم الأفقي مقارب أفقي.',
            'A function is periodic if its graph repeats every so often; the length of that interval is the period, $T$: $f(x+T)=f(x)$. To find a value, divide by the period and keep the remainder. The tendency is the value $f$ gets close to when $x$ becomes very large; that horizontal line is a horizontal asymptote.'
        ),
        examplePrompt: say('Noria batek bira bat ematen du 8 minuturo, eta 3. minutuan kabina bat 12 m-ko altueran dago. Zein altueratan dago 59. minutuan?', 'Una noria da una vuelta cada 8 minutos, y en el minuto 3 una cabina está a 12 m de altura. ¿A qué altura está en el minuto 59?', 'تدور عجلة دوّارة دورة كل 8 دقائق، وفي الدقيقة 3 تكون مقصورة على ارتفاع 12 م. على أي ارتفاع تكون في الدقيقة 59؟', 'A big wheel turns once every 8 minutes, and at minute 3 a cabin is 12 m high. How high is it at minute 59?'),
        example: same('$59=7\\cdot 8+3\\ \\to\\ f(59)=f(3)=12$'),
        exampleAnswer: say('Altuera 12 m da: 59 minutuan, 3 minutuan bezala.', 'A 12 m: el minuto 59 es como el 3.', 'على ارتفاع 12 م: الدقيقة 59 مثل الدقيقة 3.', 'At 12 m: minute 59 is like minute 3.')
    }
}
