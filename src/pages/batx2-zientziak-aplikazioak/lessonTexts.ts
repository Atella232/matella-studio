import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { Bach2ApplicationsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 2 · Zientziak — what each lesson
   tells: the new words (definitions), a short explanation, the example as
   an exercise («Another example»), the key words in four languages, cases
   in two lessons and, in five, «Why does it work?» (Cauchy's theorem only
   appears there, under L'Hôpital). Plain data so the tests can import it;
   lessons.tsx merges it into the topics and gives \sin and \tan each
   language's names. The example uses numbers of its own, never those of
   «Let's solve», of «Check it» or of the typical mistake. Tests in
   tests/lesson-texts.test.ts.
   ========================================================================== */

export const bach2ApplicationsLessonTexts: Record<Bach2ApplicationsTopicId, LessonTexts> = {
    /* ---------- 1. Review of 1.º ---------- */
    'monotony-review': {
        definitions: [
            { term: say('Mutur erlatiboa', 'Extremo relativo', 'القيمة القصوى المحلية', 'Local extremum'), meaning: say('Funtzioa inguruko puntuetan baino handiagoa (maximoa) edo txikiagoa (minimoa) den puntua.', 'Un punto donde la función es mayor (máximo) o menor (mínimo) que en los puntos de alrededor.', 'نقطة تكون فيها الدالة أكبر (عظمى) أو أصغر (صغرى) من النقاط المجاورة.', 'A point where the function is larger (maximum) or smaller (minimum) than at the points around it.') }
        ],
        vocabulary: [
            say('gorakorra', 'creciente', 'متزايدة', 'increasing'),
            say('beherakorra', 'decreciente', 'متناقصة', 'decreasing'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            '$f\'$ deribatuaren zeinuak esaten du nola doan $f$: tarte batean $f\'>0$ bada, $f$ gorakorra da; $f\'<0$ bada, beherakorra. Muturretarako hautagaiak $f\'=0$ duten puntuak eta $f$ deribagarria ez den puntuak dira. Zeinua inguruan aldatzen bada bakarrik dago muturra.',
            'El signo de $f\'$ dice cómo va $f$: si $f\'>0$ en un intervalo, $f$ es creciente; si $f\'<0$, decreciente. Los candidatos a extremo son los puntos con $f\'=0$ y los puntos donde $f$ no es derivable. Hay extremo solo si el signo cambia alrededor.',
            'تدل إشارة $f\'$ على سلوك $f$: إذا كان $f\'>0$ على فترة كانت $f$ متزايدة، وإذا كان $f\'<0$ كانت متناقصة. والمرشحة لتكون قيمًا قصوى هي النقاط التي فيها $f\'=0$ والنقاط التي لا تكون فيها $f$ قابلة للاشتقاق. ولا توجد قيمة قصوى إلا إذا تغيرت الإشارة حولها.',
            'The sign of $f\'$ tells how $f$ behaves: if $f\'>0$ on an interval, $f$ is increasing; if $f\'<0$, decreasing. The candidates for an extremum are the points with $f\'=0$ and the points where $f$ is not differentiable. There is an extremum only if the sign changes around it.'
        ),
        examplePrompt: say('Aurkitu $g(x)=x^2e^x$ funtzioaren mutur erlatiboak.', 'Halla los extremos relativos de $g(x)=x^2e^x$.', 'أوجد القيم القصوى المحلية للدالة $g(x)=x^2e^x$.', 'Find the local extrema of $g(x)=x^2e^x$.'),
        example: same('$\\begin{gathered}g\'(x)=e^x(x^2+2x)=x\\,e^x(x+2)\\\\ g\'(x)=0\\ \\to\\ x=-2,\\ x=0\\end{gathered}$'),
        exampleAnswer: say('Maximoa $x=-2$ puntuan eta minimoa $x=0$ puntuan: $g\'$ deribatua $+$ zeinutik $-$ zeinura doa $-2$ puntuan, eta $-$ zeinutik $+$ zeinura $0$ puntuan.', 'Máximo en $x=-2$ y mínimo en $x=0$: $g\'$ pasa de $+$ a $-$ en $-2$ y de $-$ a $+$ en $0$.', 'قيمة عظمى عند $x=-2$ وصغرى عند $x=0$: تنتقل $g\'$ من $+$ إلى $-$ عند $-2$ ومن $-$ إلى $+$ عند $0$.', 'A maximum at $x=-2$ and a minimum at $x=0$: $g\'$ goes from $+$ to $-$ at $-2$ and from $-$ to $+$ at $0$.')
    },
    'curvature-review': {
        definitions: [
            { term: say('Inflexio-puntua', 'Punto de inflexión', 'نقطة الانعطاف', 'Point of inflection'), meaning: say('Kurbadura aldatzen den kurbaren puntua: $\\cup$ formatik $\\cap$ formara, edo alderantziz.', 'Un punto de la curva donde cambia la curvatura: de $\\cup$ a $\\cap$ o al revés.', 'نقطة من المنحنى يتغير فيها التقعّر: من $\\cup$ إلى $\\cap$ أو العكس.', 'A point of the curve where the concavity changes: from $\\cup$ to $\\cap$ or the other way round.') }
        ],
        vocabulary: [
            say('ahurra', 'cóncava', 'مقعّر نحو الأعلى', 'concave up'),
            say('ganbila', 'convexa', 'مقعّر نحو الأسفل', 'concave down'),
            say('bigarren deribatua', 'segunda derivada', 'المشتقة الثانية', 'second derivative')
        ],
        explanation: say(
            'Bigarren deribatuak neurtzen du nola tolesten den kurba. $f\'\'>0$ bada, malda handitzen doa eta kurba ahurra da, $\\cup$ bezala; $f\'\'<0$ bada, ganbila da, $\\cap$ bezala. Inflexio-puntu batean kurbadura aldatzen da, beraz $f\'\'$ deribatuak zeinua aldatzen du; ez da nahikoa zero izatea.',
            'La segunda derivada mide cómo se dobla la curva. Si $f\'\'>0$, la pendiente crece y la curva es cóncava, como $\\cup$; si $f\'\'<0$, es convexa, como $\\cap$. En un punto de inflexión la curvatura cambia, así que $f\'\'$ cambia de signo; no basta con que valga 0.',
            'تقيس المشتقة الثانية كيف ينثني المنحنى. إذا كان $f\'\'>0$ يزداد الميل ويكون المنحنى مقعّرًا نحو الأعلى مثل $\\cup$، وإذا كان $f\'\'<0$ يكون مقعّرًا نحو الأسفل مثل $\\cap$. وعند نقطة الانعطاف يتغير التقعّر، فتغيّر $f\'\'$ إشارتها؛ ولا يكفي أن تساوي 0.',
            'The second derivative measures how the curve bends. If $f\'\'>0$, the slope grows and the curve is concave up, like $\\cup$; if $f\'\'<0$, it is concave down, like $\\cap$. At a point of inflection the concavity changes, so $f\'\'$ changes sign; being 0 is not enough.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\ln(x^2+1)$ funtzioaren inflexio-puntuak.', 'Halla los puntos de inflexión de $g(x)=\\ln(x^2+1)$.', 'أوجد نقاط انعطاف $g(x)=\\ln(x^2+1)$.', 'Find the points of inflection of $g(x)=\\ln(x^2+1)$.'),
        example: same('$\\begin{gathered}g\'(x)=\\frac{2x}{x^2+1}\\\\ g\'\'(x)=\\frac{2(1-x^2)}{(x^2+1)^2}\\\\ g\'\'(x)=0\\ \\to\\ x=\\pm 1\\end{gathered}$'),
        exampleAnswer: say('Inflexioak $x=-1$ eta $x=1$ puntuetan: $g\'\'$ deribatuak zeinua aldatzen du bietan.', 'Inflexiones en $x=-1$ y en $x=1$: $g\'\'$ cambia de signo en los dos.', 'انعطاف عند $x=-1$ وعند $x=1$: تغيّر $g\'\'$ إشارتها عند كلتيهما.', 'Inflections at $x=-1$ and at $x=1$: $g\'\'$ changes sign at both.')
    },
    'absolute-review': {
        definitions: [
            { term: say('Mutur absolutua', 'Extremo absoluto', 'القيمة القصوى المطلقة', 'Absolute extremum'), meaning: say('Funtzioak tarte osoan hartzen duen balio handiena (maximoa) edo txikiena (minimoa).', 'El valor mayor (máximo) o menor (mínimo) que toma la función en todo el intervalo.', 'أكبر قيمة (عظمى) أو أصغر قيمة (صغرى) تأخذها الدالة على الفترة كلها.', 'The largest (maximum) or smallest (minimum) value that the function takes on the whole interval.') }
        ],
        vocabulary: [
            say('tarte itxia', 'intervalo cerrado', 'فترة مغلقة', 'closed interval'),
            say('muturrak', 'bordes', 'طرفا الفترة', 'ends'),
            say('puntu singularra', 'punto singular', 'النقطة الحرجة', 'stationary point')
        ],
        explanation: say(
            'Funtzio jarraitu batek tarte itxi batean beti ditu maximo eta minimo absolutuak. Barruan badaude, puntu singularrak dira, $f\'=0$ dutenak edo $f$ deribagarria ez den puntuak. Baina tartearen muturretan ere egon daitezke, eta han $f\'$ deribatuak ez du zertan zero izan.',
            'Una función continua en un intervalo cerrado tiene siempre máximo y mínimo absolutos. Si están dentro, son puntos singulares, con $f\'=0$, o puntos donde $f$ no es derivable. Pero también pueden estar en los bordes del intervalo, y allí $f\'$ no tiene por qué anularse.',
            'للدالة المتصلة على فترة مغلقة دائمًا قيمة عظمى وقيمة صغرى مطلقتان. فإن كانتا في الداخل فهما نقطتان حرجتان فيهما $f\'=0$، أو نقطتان لا تكون فيهما $f$ قابلة للاشتقاق. لكن قد تقعان أيضًا عند الطرفين، وهناك لا يلزم أن تنعدم $f\'$.',
            'A function that is continuous on a closed interval always has an absolute maximum and minimum. If they are inside, they are stationary points, with $f\'=0$, or points where $f$ is not differentiable. But they can also be at the ends of the interval, and there $f\'$ need not be 0.'
        ),
        examplePrompt: say('Aurkitu $g(x)=x^3-12x$ funtzioaren minimo absolutua $[0,\\,3]$ tartean.', 'Halla el mínimo absoluto de $g(x)=x^3-12x$ en $[0,\\,3]$.', 'أوجد القيمة الصغرى المطلقة للدالة $g(x)=x^3-12x$ على $[0,\\,3]$.', 'Find the absolute minimum of $g(x)=x^3-12x$ on $[0,\\,3]$.'),
        example: same('$\\begin{gathered}g\'(x)=3x^2-12=0\\ \\to\\ x=2\\\\ g(0)=0\\qquad g(2)=8-24=-16\\\\ g(3)=27-36=-9\\end{gathered}$'),
        exampleAnswer: say('Minimo absolutua $-16$ da, $x=2$ puntuan; maximoa 0 da, $x=0$ muturrean.', 'El mínimo absoluto es $-16$, en $x=2$; el máximo es 0, en el borde $x=0$.', 'القيمة الصغرى المطلقة $-16$ عند $x=2$، والعظمى 0 عند الطرف $x=0$.', 'The absolute minimum is $-16$, at $x=2$; the maximum is 0, at the end $x=0$.')
    },

    /* ---------- 2. Rolle and the mean value ---------- */
    rolle: {
        definitions: [
            { term: say('Hipotesia', 'Hipótesis', 'الفرضية', 'Hypothesis'), meaning: say('Teorema bat erabili ahal izateko bete behar den baldintza bakoitza.', 'Cada condición que se debe cumplir para poder usar un teorema.', 'كل شرط يجب أن يتحقق لنتمكن من استعمال مبرهنة.', 'Each condition that must hold to be able to use a theorem.') }
        ],
        vocabulary: [
            say('teorema', 'teorema', 'مبرهنة', 'theorem'),
            say('horizontala', 'horizontal', 'أفقي', 'horizontal'),
            say('altuera bera', 'misma altura', 'الارتفاع نفسه', 'same height')
        ],
        explanation: say(
            'Funtzio jarraitu eta puntarik gabeko bat altuera berean hasi eta amaitzen bada, tarteko puntu batean igotzeari uzten dio jaisteko, edo alderantziz: han zuzen ukitzailea horizontala da. Hiru hipotesiak behar dira: jarraitua tarte itxian, deribagarria tarte irekian eta $f(a)=f(b)$.',
            'Si una función continua y sin picos empieza y acaba a la misma altura, en algún punto intermedio deja de subir para bajar, o al revés: allí la tangente es horizontal. Hacen falta las tres hipótesis: continua en el intervalo cerrado, derivable en el abierto y $f(a)=f(b)$.',
            'إذا بدأت دالة متصلة بلا زوايا وانتهت عند الارتفاع نفسه، فإنها تكفّ في نقطة وسيطة عن الصعود لتنزل، أو العكس: وهناك يكون المماس أفقيًّا. ويلزم تحقق الفرضيات الثلاث: الاتصال على الفترة المغلقة، والاشتقاق على المفتوحة، و$f(a)=f(b)$.',
            'If a continuous function with no corners starts and ends at the same height, at some point in between it stops going up to go down, or the other way round: there the tangent is horizontal. The three hypotheses are needed: continuous on the closed interval, differentiable on the open one and $f(a)=f(b)$.'
        ),
        why: {
            text: say(
                'Zergatik funtzionatzen du? Weierstrassen arabera, $f$ funtzioak maximoa eta minimoa ditu $[a,b]$ tartean. Biak muturretan badaude, $f$ konstantea da eta $f\'=0$ puntu guztietan. Bestela, bat barruan dago, $f$ deribagarria den $c$ puntu batean: han zuzen ukitzaileak ezin du igo edo jaitsi, beraz $f\'(c)=0$.',
                '¿Por qué funciona? Por Weierstrass, $f$ tiene máximo y mínimo en $[a,b]$. Si los dos están en los bordes, $f$ es constante y $f\'=0$ en todo punto. Si no, uno está dentro, en un $c$ donde $f$ es derivable: allí la tangente no puede subir ni bajar, así que $f\'(c)=0$.',
                'لماذا تصح؟ بحسب فايرشتراس للدالة $f$ قيمة عظمى وقيمة صغرى على $[a,b]$. إذا كانتا عند الطرفين فالدالة $f$ ثابتة و$f\'=0$ في كل نقطة. وإلا فإحداهما في الداخل عند $c$ تكون فيه $f$ قابلة للاشتقاق: وهناك لا يمكن للمماس أن يصعد أو ينزل، فإن $f\'(c)=0$.',
                'Why does it work? By Weierstrass, $f$ has a maximum and a minimum on $[a,b]$. If both are at the ends, $f$ is constant and $f\'=0$ everywhere. If not, one is inside, at a $c$ where $f$ is differentiable: there the tangent can go neither up nor down, so $f\'(c)=0$.'
            )
        },
        examplePrompt: say('Aurkitu Rolleren $c$ puntuak, $g(x)=x^3-x$ funtziorako $[-1,\\,1]$ tartean.', 'Halla los $c$ de Rolle de $g(x)=x^3-x$ en $[-1,\\,1]$.', 'أوجد قيم $c$ لمبرهنة رول للدالة $g(x)=x^3-x$ على $[-1,\\,1]$.', 'Find the Rolle points $c$ of $g(x)=x^3-x$ on $[-1,\\,1]$.'),
        example: same('$\\begin{gathered}g(-1)=g(1)=0\\\\ g\'(c)=3c^2-1=0\\\\ c=\\pm\\frac{1}{\\sqrt{3}}=\\pm\\frac{\\sqrt{3}}{3}\\end{gathered}$'),
        exampleAnswer: say('Bi daude: $c=-\\frac{\\sqrt{3}}{3}$ eta $c=\\frac{\\sqrt{3}}{3}$, biak $(-1,\\,1)$ tartean. Rollek bat gutxienez ziurtatzen du, ez bakarra.', 'Hay dos: $c=-\\frac{\\sqrt{3}}{3}$ y $c=\\frac{\\sqrt{3}}{3}$, los dos en $(-1,\\,1)$. Rolle asegura al menos uno, no uno solo.', 'توجد قيمتان: $c=-\\frac{\\sqrt{3}}{3}$ و$c=\\frac{\\sqrt{3}}{3}$، وكلتاهما في $(-1,\\,1)$. تضمن مبرهنة رول قيمة واحدة على الأقل، لا قيمة وحيدة.', 'There are two: $c=-\\frac{\\sqrt{3}}{3}$ and $c=\\frac{\\sqrt{3}}{3}$, both in $(-1,\\,1)$. Rolle guarantees at least one, not just one.')
    },
    'roots-count': {
        definitions: [
            { term: say('Ekuazio baten erroa', 'Raíz de una ecuación', 'جذر المعادلة', 'Root of an equation'), meaning: say('Ekuazioa betetzen duen $x$ zenbakia; $f(x)=0$ ekuazioan, grafikoak $X$ ardatza ebakitzen duen puntua.', 'Un número $x$ que la cumple; en $f(x)=0$, un punto donde la gráfica corta el eje $X$.', 'عدد $x$ يحققها؛ وفي $f(x)=0$ هو نقطة يقطع فيها الرسم المحور $X$.', 'A number $x$ that satisfies it; in $f(x)=0$, a point where the graph crosses the $X$ axis.') }
        ],
        vocabulary: [
            say('gutxienez', 'al menos', 'على الأقل', 'at least'),
            say('gehienez', 'como mucho', 'على الأكثر', 'at most'),
            say('bakarra', 'única', 'واحد فقط', 'only one')
        ],
        explanation: say(
            'Erroak zenbatzeko bi teorema erabiltzen dira. Bolzano: $f$ jarraitua bada eta zeinua aldatzen badu $[a,b]$ tartean, gutxienez erro bat dago. Rolle: $f$ funtzioaren bi erroren artean $f\'$ deribatuaren erro bat dago. Beraz, $f\'$ zero ez bada, ezin dira bi erro egon: bat dago gehienez.',
            'Para contar las raíces se usan dos teoremas. Bolzano: si $f$ es continua y cambia de signo en $[a,b]$, hay al menos una raíz. Rolle: entre dos raíces de $f$ hay una de $f\'$. Así, si $f\'$ no se anula, no puede haber dos raíces: hay como mucho una.',
            'لعدّ الجذور نستعمل مبرهنتين. بولتسانو: إذا كانت $f$ متصلة وغيّرت إشارتها على $[a,b]$ فهناك جذر واحد على الأقل. رول: بين جذرين للدالة $f$ يوجد جذر للمشتقة $f\'$. لذلك إذا لم تنعدم $f\'$ فلا يمكن أن يوجد جذران: هناك جذر واحد على الأكثر.',
            'Two theorems are used to count roots. Bolzano: if $f$ is continuous and changes sign on $[a,b]$, there is at least one root. Rolle: between two roots of $f$ there is one of $f\'$. So if $f\'$ is never 0, there cannot be two roots: there is at most one.'
        ),
        examplePrompt: say('Zenbat soluzio ditu $e^x+x=0$ ekuazioak?', '¿Cuántas soluciones tiene $e^x+x=0$?', 'كم حلًّا للمعادلة $e^x+x=0$؟', 'How many solutions does $e^x+x=0$ have?'),
        example: same('$\\begin{gathered}f(-1)=e^{-1}-1<0\\\\ f(0)=1>0\\\\ f\'(x)=e^x+1>0\\end{gathered}$'),
        exampleAnswer: say('Bakarra: Bolzanok bat ematen du $(-1,\\,0)$ tartean eta, $f\'>0$ denez, ez dago beste bat.', 'Una sola: Bolzano da una en $(-1,\\,0)$ y, como $f\'>0$, no hay otra.', 'حل واحد فقط: يعطي بولتسانو حلًّا في $(-1,\\,0)$، وبما أن $f\'>0$ فلا يوجد حل آخر.', 'Just one: Bolzano gives one in $(-1,\\,0)$ and, since $f\'>0$, there is no other.')
    },
    'mean-value': {
        definitions: [
            { term: say('Zuzen ebakitzailea', 'Recta secante', 'المستقيم القاطع', 'Secant line'), meaning: say('Kurbaren bi puntu lotzen dituen zuzena, $(a,f(a))$ eta $(b,f(b))$.', 'La recta que une dos puntos de la curva, $(a,f(a))$ y $(b,f(b))$.', 'المستقيم الذي يصل نقطتين من المنحنى، $(a,f(a))$ و$(b,f(b))$.', 'The line that joins two points of the curve, $(a,f(a))$ and $(b,f(b))$.') }
        ],
        vocabulary: [
            say('paraleloa', 'paralela', 'موازٍ', 'parallel'),
            say('konstantea', 'constante', 'ثابتة', 'constant'),
            say('batez besteko abiadura', 'velocidad media', 'السرعة المتوسطة', 'average speed')
        ],
        explanation: say(
            'Ebakitzailearen malda $[a,b]$ tarteko batez besteko aldakuntza-tasa da. Teoremak dio puntu batean berehalako aldakuntza batez bestekoaren berdina dela. Auto batek 120 km egiten baditu 2 ordutan, batez besteko abiadura 60 km/h da, eta uneren batean abiadura-neurgailuak 60 markatzen du zehazki.',
            'La pendiente de la secante es la tasa de variación media en $[a,b]$. El teorema dice que en algún punto la variación instantánea es igual a la media. Si un coche recorre 120 km en 2 horas, su velocidad media es 60 km/h, y en algún instante el velocímetro marca exactamente 60.',
            'ميل القاطع هو معدل التغير المتوسط على $[a,b]$. وتقول المبرهنة إن التغير اللحظي يساوي المتوسط في نقطة ما. إذا قطعت سيارة 120 km في ساعتين فسرعتها المتوسطة 60 km/h، وفي لحظة ما يشير العدّاد إلى 60 تمامًا.',
            'The slope of the secant is the average rate of change on $[a,b]$. The theorem says that at some point the instantaneous rate equals the average. If a car covers 120 km in 2 hours, its average speed is 60 km/h, and at some instant the speedometer reads exactly 60.'
        ),
        why: {
            text: say(
                'Zergatik funtzionatzen du? Rolle da, grafikoa okertuta. $f$ funtzioari ebakitzailea kentzen badiozu, $g(x)=f(x)-mx$ eta $m=\\frac{f(b)-f(a)}{b-a}$, $g(a)=g(b)$ geratzen da. Rollek $c$ bat ematen du, $g\'(c)=0$ betetzen duena, hau da, $f\'(c)=m$.',
                '¿Por qué funciona? Es Rolle con la gráfica inclinada. Si a $f$ le restas la secante, $g(x)=f(x)-mx$ con $m=\\frac{f(b)-f(a)}{b-a}$, queda $g(a)=g(b)$. Rolle da un $c$ con $g\'(c)=0$, es decir, $f\'(c)=m$.',
                'لماذا تصح؟ إنها مبرهنة رول مع رسم مائل. إذا طرحت القاطع من $f$، $g(x)=f(x)-mx$ حيث $m=\\frac{f(b)-f(a)}{b-a}$، يصبح $g(a)=g(b)$. فتعطي مبرهنة رول قيمة $c$ تحقق $g\'(c)=0$، أي $f\'(c)=m$.',
                'Why does it work? It is Rolle with the graph tilted. If you subtract the secant from $f$, $g(x)=f(x)-mx$ with $m=\\frac{f(b)-f(a)}{b-a}$, you get $g(a)=g(b)$. Rolle gives a $c$ with $g\'(c)=0$, that is, $f\'(c)=m$.'
            )
        },
        examplePrompt: say('Aurkitu batez besteko balioaren $c$, $g(x)=\\ln x$ funtziorako $[1,\\,e]$ tartean.', 'Halla el $c$ del valor medio para $g(x)=\\ln x$ en $[1,\\,e]$.', 'أوجد $c$ في مبرهنة القيمة المتوسطة للدالة $g(x)=\\ln x$ على $[1,\\,e]$.', 'Find the mean value $c$ for $g(x)=\\ln x$ on $[1,\\,e]$.'),
        example: same('$\\begin{gathered}\\frac{\\ln e-\\ln 1}{e-1}=\\frac{1}{e-1}\\\\ g\'(c)=\\frac{1}{c}\\ \\to\\ c=e-1\\end{gathered}$'),
        exampleAnswer: say('$c=e-1\\approx 1{,}72$, 1 eta $e$ artean.', '$c=e-1\\approx 1{,}72$, que está entre 1 y $e$.', '$c=e-1\\approx 1.72$، وهي بين 1 و$e$.', '$c=e-1\\approx 1{,}72$, which is between 1 and $e$.')
    },

    /* ---------- 3. L'Hôpital ---------- */
    hopital: {
        definitions: [
            { term: say('Indeterminazioa', 'Indeterminación', 'عدم التعيين', 'Indeterminate form'), meaning: say('$\\frac{0}{0}$ edo $\\frac{\\infty}{\\infty}$ bezalako forma, limitearen balioa ematen ez duena: eraldatu egin behar da.', 'Una forma como $\\frac{0}{0}$ o $\\frac{\\infty}{\\infty}$, que no da el valor del límite: hay que transformarla.', 'صيغة مثل $\\frac{0}{0}$ أو $\\frac{\\infty}{\\infty}$ لا تعطي قيمة النهاية: يجب تحويلها.', 'A form such as $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$ that does not give the value of the limit: it has to be transformed.') }
        ],
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('bakoitza bere aldetik', 'por separado', 'كلٌّ على حدة', 'separately')
        ],
        explanation: say(
            '$f$ eta $g$ zero diren puntu batetik hurbil, biak beren zuzen ukitzaileen antzekoak dira, eta beren zatidura beren malden zatiduraren antzekoa. Horregatik dute $\\frac{f}{g}$ eta $\\frac{f\'}{g\'}$ zatidurek limite bera. $\\frac{0}{0}$ edo $\\frac{\\infty}{\\infty}$ denean bakarrik balio du, eta behin baino gehiagotan aplika daiteke jarraian.',
            'Cerca de un punto donde $f$ y $g$ valen 0, las dos se parecen a sus tangentes, así que su cociente se parece al de sus pendientes. Por eso $\\frac{f}{g}$ y $\\frac{f\'}{g\'}$ tienen el mismo límite. Solo vale con $\\frac{0}{0}$ o $\\frac{\\infty}{\\infty}$, y se puede aplicar varias veces seguidas.',
            'قرب نقطة تنعدم فيها $f$ و$g$ تشبه كل منهما مماسها، فيشبه خارج قسمتهما خارج قسمة ميليهما. لذلك يكون للنسبتين $\\frac{f}{g}$ و$\\frac{f\'}{g\'}$ النهاية نفسها. ولا تصح القاعدة إلا مع $\\frac{0}{0}$ أو $\\frac{\\infty}{\\infty}$، ويمكن تطبيقها مرات متتالية.',
            'Near a point where $f$ and $g$ are 0, both look like their tangents, so their quotient looks like that of their slopes. That is why $\\frac{f}{g}$ and $\\frac{f\'}{g\'}$ have the same limit. It only works with $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$, and it can be applied several times in a row.'
        ),
        why: {
            text: say(
                'Zergatik funtzionatzen du? Cauchyren teorema da, bi funtziorentzako batez besteko balio bat: $\\frac{f(x)-f(a)}{g(x)-g(a)}=\\frac{f\'(c)}{g\'(c)}$, $c$ puntua $a$ eta $x$ artean dagoela. $f(a)=g(a)=0$ bada, ezkerrean $\\frac{f(x)}{g(x)}$ geratzen da, eta $x\\to a$ doanean, $c\\to a$ ere bai.',
                '¿Por qué funciona? Es el teorema de Cauchy, un valor medio para dos funciones a la vez: $\\frac{f(x)-f(a)}{g(x)-g(a)}=\\frac{f\'(c)}{g\'(c)}$ con $c$ entre $a$ y $x$. Si $f(a)=g(a)=0$, a la izquierda queda $\\frac{f(x)}{g(x)}$, y cuando $x\\to a$, también $c\\to a$.',
                'لماذا تصح؟ إنها مبرهنة كوشي، وهي قيمة متوسطة لدالتين معًا: $\\frac{f(x)-f(a)}{g(x)-g(a)}=\\frac{f\'(c)}{g\'(c)}$ حيث $c$ بين $a$ و$x$. وإذا كان $f(a)=g(a)=0$ بقي على اليسار $\\frac{f(x)}{g(x)}$، وعندما $x\\to a$ يكون أيضًا $c\\to a$.',
                'Why does it work? It is Cauchy\'s theorem, a mean value for two functions at once: $\\frac{f(x)-f(a)}{g(x)-g(a)}=\\frac{f\'(c)}{g\'(c)}$ with $c$ between $a$ and $x$. If $f(a)=g(a)=0$, the left side is $\\frac{f(x)}{g(x)}$, and as $x\\to a$, also $c\\to a$.'
            )
        },
        examplePrompt: say('Kalkulatu $\\lim_{x\\to+\\infty}\\frac{\\ln x}{x}$.', 'Calcula $\\lim_{x\\to+\\infty}\\frac{\\ln x}{x}$.', 'احسب $\\lim_{x\\to+\\infty}\\frac{\\ln x}{x}$.', 'Work out $\\lim_{x\\to+\\infty}\\frac{\\ln x}{x}$.'),
        example: same('$\\lim_{x\\to+\\infty}\\frac{\\ln x}{x}=\\lim_{x\\to+\\infty}\\frac{1/x}{1}=0$'),
        exampleAnswer: say('$\\frac{\\infty}{\\infty}$ da; L\'Hôpitalekin $\\frac{1}{x}\\to 0$ geratzen da: limitea 0 da.', 'Es $\\frac{\\infty}{\\infty}$; con L\'Hôpital queda $\\frac{1}{x}\\to 0$: el límite es 0.', 'إنها $\\frac{\\infty}{\\infty}$؛ وبقاعدة لوبيتال تصير $\\frac{1}{x}\\to 0$: النهاية 0.', 'It is $\\frac{\\infty}{\\infty}$; with L\'Hôpital it becomes $\\frac{1}{x}\\to 0$: the limit is 0.')
    },
    'hopital-products': {
        definitions: [
            { term: say('Alderantzizkoa', 'Inverso', 'المقلوب', 'Reciprocal'), meaning: say('$g$ funtzioaren alderantzizkoa $\\frac{1}{g}$ da: $g\\to\\infty$ bada, haren alderantzizkoa 0 baliora doa.', 'El inverso de $g$ es $\\frac{1}{g}$: si $g\\to\\infty$, su inverso tiende a 0.', 'مقلوب $g$ هو $\\frac{1}{g}$: إذا كان $g\\to\\infty$ فإن مقلوبه يؤول إلى 0.', 'The reciprocal of $g$ is $\\frac{1}{g}$: if $g\\to\\infty$, its reciprocal tends to 0.') }
        ],
        vocabulary: [
            say('izendatzaile komuna', 'común denominador', 'المقام المشترك', 'common denominator'),
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('kendura', 'resta', 'الفرق', 'difference')
        ],
        explanation: say(
            'L\'Hôpital zatidurekin bakarrik dabil. $0\\cdot\\infty$ biderkadura zatidura bihurtzen da, faktore bat behera pasatuz bere alderantzizkoarekin; komeni da errazen deribatzen dena jaistea, normalean ez logaritmoa. $\\infty-\\infty$ kendura zatidura bihurtzen da izendatzaile komun batekin.',
            'L\'Hôpital solo trabaja con cocientes. Un producto $0\\cdot\\infty$ se convierte en cociente pasando un factor abajo con su inverso; conviene bajar el que sea más fácil de derivar, normalmente no el logaritmo. Una resta $\\infty-\\infty$ se convierte en cociente con un común denominador.',
            'لا تعمل قاعدة لوبيتال إلا مع خوارج القسمة. يتحول الجداء $0\\cdot\\infty$ إلى خارج قسمة بإنزال أحد العاملين إلى المقام بمقلوبه؛ ويُستحسن إنزال الأسهل اشتقاقًا، وعادة ليس اللوغاريتم. ويتحول الفرق $\\infty-\\infty$ إلى خارج قسمة بمقام مشترك.',
            'L\'Hôpital only works with quotients. A product $0\\cdot\\infty$ becomes a quotient by moving one factor down as its reciprocal; it is best to move down the one that is easier to differentiate, usually not the logarithm. A difference $\\infty-\\infty$ becomes a quotient with a common denominator.'
        ),
        cases: [
            { title: say('Zero bider infinitu', 'Cero por infinito', 'صفر في لانهاية', 'Zero times infinity'), text: say('Faktore bat behera pasatzen da, alderantzizkoa bihurtuta.', 'Un factor pasa abajo, convertido en su inverso.', 'ينزل أحد العاملين إلى المقام مقلوبًا.', 'One factor moves down, turned into its reciprocal.'), math: same('$x\\,e^{-x}=\\frac{x}{e^x}$') },
            { title: say('Infinitu ken infinitu', 'Infinito menos infinito', 'لانهاية ناقص لانهاية', 'Infinity minus infinity'), text: say('Izendatzaile komuna egiten da.', 'Se hace común denominador.', 'نوحّد المقامات في مقام مشترك.', 'Take a common denominator.'), math: same('$\\frac{1}{x}-\\frac{1}{\\sin x}=\\frac{\\sin x-x}{x\\sin x}$') }
        ],
        examplePrompt: say('Kalkulatu $\\lim_{x\\to+\\infty}x^2e^{-x}$.', 'Calcula $\\lim_{x\\to+\\infty}x^2e^{-x}$.', 'احسب $\\lim_{x\\to+\\infty}x^2e^{-x}$.', 'Work out $\\lim_{x\\to+\\infty}x^2e^{-x}$.'),
        example: same('$\\begin{gathered}\\lim_{x\\to+\\infty}\\frac{x^2}{e^x}=\\lim_{x\\to+\\infty}\\frac{2x}{e^x}\\\\ =\\lim_{x\\to+\\infty}\\frac{2}{e^x}=0\\end{gathered}$'),
        exampleAnswer: say('$\\infty\\cdot 0$ da; zatidura gisa, L\'Hôpitalek bi aldiz 0 ematen du: esponentzialak irabazten du.', 'Es $\\infty\\cdot 0$; como cociente, L\'Hôpital dos veces da 0: la exponencial gana.', 'إنها $\\infty\\cdot 0$؛ وعلى صورة خارج قسمة تعطي قاعدة لوبيتال مرتين 0: الدالة الأسية تغلب.', 'It is $\\infty\\cdot 0$; as a quotient, L\'Hôpital twice gives 0: the exponential wins.')
    },
    'hopital-powers': {
        definitions: [
            { term: say('Logaritmo nepertarra', 'Logaritmo neperiano', 'اللوغاريتم الطبيعي', 'Natural logarithm'), meaning: say('$\\ln$ funtzioak esponentziala desegiten du: $\\ln L=k$ bada, $L=e^k$.', 'El $\\ln$ deshace la exponencial: si $\\ln L=k$, entonces $L=e^k$.', 'تلغي $\\ln$ الدالة الأسية: إذا كان $\\ln L=k$ فإن $L=e^k$.', 'The $\\ln$ undoes the exponential: if $\\ln L=k$, then $L=e^k$.') }
        ],
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('oinarria', 'base', 'الأساس', 'base')
        ],
        explanation: say(
            'Oinarria eta berretzailea aldakorrak dituen $f^g$ berretura batean, logaritmoak berretzailea jaisten du: $\\ln f^g=g\\ln f$. Horrela berretura biderkadura bihurtzen da, eta gero zatidura, L\'Hôpital erabiltzeko. Ohiko akatsa $\\ln L$ puntuan gelditzea da: $e$ emaitza horretara berretu behar da.',
            'En una potencia $f^g$ con base y exponente variables, el logaritmo baja el exponente: $\\ln f^g=g\\ln f$. Así la potencia se vuelve un producto, que se pasa a cociente para usar L\'Hôpital. El error típico es parar en $\\ln L$: hay que elevar $e$ a ese resultado.',
            'في قوة $f^g$ أساسها وأسّها متغيران، ينزل اللوغاريتم الأسّ: $\\ln f^g=g\\ln f$. وهكذا تصير القوة جداءً نحوّله إلى خارج قسمة لنستعمل لوبيتال. والخطأ الشائع التوقف عند $\\ln L$: يجب رفع $e$ إلى تلك النتيجة.',
            'In a power $f^g$ whose base and exponent both vary, the logarithm brings the exponent down: $\\ln f^g=g\\ln f$. So the power becomes a product, which is turned into a quotient to use L\'Hôpital. The typical mistake is to stop at $\\ln L$: $e$ has to be raised to that result.'
        ),
        cases: [
            { title: say('Bat infinitura', 'Uno elevado a infinito', 'واحد أس لانهاية', 'One to the infinity'), text: say('Logaritmoak $\\frac{0}{0}$ bat ematen du.', 'El logaritmo da un $\\frac{0}{0}$.', 'يعطي اللوغاريتم $\\frac{0}{0}$.', 'The logarithm gives a $\\frac{0}{0}$.'), math: same('$\\lim_{x\\to+\\infty}\\left(1+\\frac{1}{x}\\right)^x=e$') },
            { title: say('Zero zerora', 'Cero elevado a cero', 'صفر أس صفر', 'Zero to the zero'), text: say('Logaritmoak $0\\cdot\\infty$ bat ematen du.', 'El logaritmo da un $0\\cdot\\infty$.', 'يعطي اللوغاريتم $0\\cdot\\infty$.', 'The logarithm gives a $0\\cdot\\infty$.'), math: same('$\\lim_{x\\to 0^+}x^x=e^0=1$') }
        ],
        examplePrompt: say('Kalkulatu $\\lim_{x\\to+\\infty}(1+x)^{1/x}$.', 'Calcula $\\lim_{x\\to+\\infty}(1+x)^{1/x}$.', 'احسب $\\lim_{x\\to+\\infty}(1+x)^{1/x}$.', 'Work out $\\lim_{x\\to+\\infty}(1+x)^{1/x}$.'),
        example: same('$\\begin{gathered}\\ln L=\\lim_{x\\to+\\infty}\\frac{\\ln(1+x)}{x}\\\\ =\\lim_{x\\to+\\infty}\\frac{1}{1+x}=0\\\\ L=e^0=1\\end{gathered}$'),
        exampleAnswer: say('$\\infty^0$ da; $\\ln L=0$, beraz $L=e^0=1$.', 'Es $\\infty^0$; $\\ln L=0$, así que $L=e^0=1$.', 'إنها $\\infty^0$؛ و$\\ln L=0$، إذن $L=e^0=1$.', 'It is $\\infty^0$; $\\ln L=0$, so $L=e^0=1$.')
    },

    /* ---------- 4. Coefficients with conditions ---------- */
    'extreme-condition': {
        definitions: [
            { term: say('Koefizientea', 'Coeficiente', 'المعامل', 'Coefficient'), meaning: say('Funtzioaren formulako zenbaki ezezaguna, $a$ edo $b$ bezala, datuekin aurkitzen dena.', 'Un número desconocido de la fórmula de la función, como $a$ o $b$, que se halla con los datos.', 'عدد مجهول في صيغة الدالة، مثل $a$ أو $b$، نجده بالمعطيات.', 'An unknown number in the formula of the function, such as $a$ or $b$, found from the data.') }
        ],
        vocabulary: [
            say('datua', 'dato', 'المعطى', 'fact'),
            say('sistema', 'sistema', 'النظام', 'system'),
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown')
        ],
        explanation: say(
            'Problema hauetan funtzioak koefiziente ezezagunak ditu, eta enuntziatuak haren grafikoari buruzko datuak ematen ditu. Datu bakoitza ekuazio bihurtzen da: puntu bat, $f$ funtzioaren balio batean; mutur bat, $f\'=0$ ekuazioan. Ezezagunak adina ekuazio behar dira. Amaieran egiaztatzen da puntua benetan muturra dela.',
            'En estos problemas la función tiene coeficientes desconocidos y el enunciado da datos sobre su gráfica. Cada dato se traduce en una ecuación: un punto, en un valor de $f$; un extremo, en $f\'=0$. Hacen falta tantas ecuaciones como incógnitas. Al final se comprueba que el punto sea de verdad un extremo.',
            'في هذه المسائل للدالة معاملات مجهولة، ويعطي النص معطيات عن رسمها. وكل معطى يُترجم إلى معادلة: النقطة إلى قيمة لـ $f$، والقيمة القصوى إلى $f\'=0$. ويلزم عدد من المعادلات يساوي عدد المجاهيل. وفي النهاية نتحقق من أن النقطة قيمة قصوى فعلًا.',
            'In these problems the function has unknown coefficients and the statement gives facts about its graph. Each fact becomes an equation: a point, a value of $f$; an extremum, $f\'=0$. As many equations as unknowns are needed. At the end, check that the point really is an extremum.'
        ),
        examplePrompt: say('Aurkitu $k$, $g(x)=x^3-kx$ funtzioak mutur bat izan dezan $x=2$ puntuan.', 'Halla $k$ para que $g(x)=x^3-kx$ tenga un extremo en $x=2$.', 'أوجد $k$ لتكون للدالة $g(x)=x^3-kx$ قيمة قصوى عند $x=2$.', 'Find $k$ so that $g(x)=x^3-kx$ has an extremum at $x=2$.'),
        example: same('$\\begin{gathered}g\'(x)=3x^2-k\\\\ g\'(2)=12-k=0\\ \\to\\ k=12\\end{gathered}$'),
        exampleAnswer: say('$k=12$ denean, $g\'\'(2)=12>0$: minimo bat da.', 'Con $k=12$, $g\'\'(2)=12>0$: es un mínimo.', 'مع $k=12$ يكون $g\'\'(2)=12>0$: إنها قيمة صغرى.', 'With $k=12$, $g\'\'(2)=12>0$: it is a minimum.')
    },
    'inflection-condition': {
        definitions: [
            { term: say('Inflexioko zuzen ukitzailea', 'Tangente de inflexión', 'مماس الانعطاف', 'Inflectional tangent'), meaning: say('Inflexio-puntuko zuzen ukitzailea: kurba zeharkatzen du, eta kurba alde batetik bestera pasatzen da.', 'La tangente en un punto de inflexión: atraviesa la curva, que pasa de un lado al otro.', 'المماس عند نقطة الانعطاف: يخترق المنحنى الذي ينتقل من جهة إلى أخرى.', 'The tangent at a point of inflection: it crosses the curve, which passes from one side to the other.') }
        ],
        vocabulary: [
            say('zeharkatzen du', 'atraviesa', 'يخترق', 'crosses'),
            say('erdiko puntua', 'punto medio', 'المنتصف', 'halfway')
        ],
        explanation: say(
            'Inflexio-puntu batean kurbadura aldatzen da, eta bigarren deribatua zero da bertan: hori da ekuazio berria. 3. graduko polinomio batean, inflexioa beti dago maximoaren eta minimoaren erdiko puntuan. Lehen bezala, puntuaren altuerak beste ekuazio bat ematen du.',
            'En un punto de inflexión la curvatura cambia, así que la segunda derivada se anula allí: esa es la ecuación nueva. En un polinomio de grado 3, la inflexión está siempre en el punto medio entre el máximo y el mínimo. Como antes, la altura del punto da otra ecuación.',
            'عند نقطة الانعطاف يتغير التقعّر، فتنعدم المشتقة الثانية هناك: وهذه هي المعادلة الجديدة. وفي حدودية من الدرجة 3 يقع الانعطاف دائمًا في المنتصف بين القيمة العظمى والقيمة الصغرى. وكما سبق، يعطي ارتفاع النقطة معادلة أخرى.',
            'At a point of inflection the concavity changes, so the second derivative is 0 there: that is the new equation. In a polynomial of degree 3, the inflection is always halfway between the maximum and the minimum. As before, the height of the point gives another equation.'
        ),
        examplePrompt: say('Aurkitu $k$, $g(x)=x^4+kx^3$ funtzioak inflexio bat izan dezan $x=-1$ puntuan.', 'Halla $k$ para que $g(x)=x^4+kx^3$ tenga una inflexión en $x=-1$.', 'أوجد $k$ لتكون للدالة $g(x)=x^4+kx^3$ نقطة انعطاف عند $x=-1$.', 'Find $k$ so that $g(x)=x^4+kx^3$ has an inflection at $x=-1$.'),
        example: same('$\\begin{gathered}g\'\'(x)=12x^2+6kx\\\\ g\'\'(-1)=12-6k=0\\ \\to\\ k=2\\end{gathered}$'),
        exampleAnswer: say('$k=2$ denean, $g\'\'(x)=12x(x+1)$ adierazpenak zeinua aldatzen du $-1$ puntuan: inflexioa da.', 'Con $k=2$, $g\'\'(x)=12x(x+1)$ cambia de signo en $-1$: es una inflexión.', 'مع $k=2$ تغيّر $g\'\'(x)=12x(x+1)$ إشارتها عند $-1$: إنها نقطة انعطاف.', 'With $k=2$, $g\'\'(x)=12x(x+1)$ changes sign at $-1$: it is an inflection.')
    },
    'extreme-tangent': {
        definitions: [
            { term: say('Ekuazio-sistema', 'Sistema de ecuaciones', 'نظام المعادلات', 'System of equations'), meaning: say('Aldi berean bete behar diren zenbait ekuazio; hemen, enuntziatuko datu bakoitzeko bat.', 'Varias ecuaciones que deben cumplirse a la vez; aquí, una por cada dato del enunciado.', 'عدة معادلات يجب أن تتحقق معًا؛ وهنا معادلة لكل معطى في النص.', 'Several equations that must hold at once; here, one for each fact in the statement.') }
        ],
        vocabulary: [
            say('ordenatua jatorrian', 'ordenada en el origen', 'الجزء المقطوع من محور الصادات', 'y-intercept'),
            say('ukitze-puntua', 'punto de contacto', 'نقطة التماس', 'point of contact')
        ],
        explanation: say(
            'Azterketetako problemek datuak nahasten dituzte: mutur bat, inflexio bat, zuzen ukitzaile bat edo puntu bat. Komeni da zerrenda bat egitea: datu bakoitza, bere ekuazioa. $y=mx+n$ zuzen ukitzaileak, $x_0$ puntuan, bi gauza esaten ditu batera: ukitze-puntua eta $m$ malda. Zuzen ukitzailea $x=0$ puntuan bada, $n$ ordenatua jatorrian $f(0)$ da.',
            'Los problemas de examen suelen mezclar datos: un extremo, una inflexión, una tangente o un punto. Conviene hacer una lista: cada dato, su ecuación. Una tangente $y=mx+n$ en $x_0$ dice dos cosas a la vez: el punto de contacto y la pendiente $m$. Si la tangente es en $x=0$, la ordenada en el origen $n$ es $f(0)$.',
            'كثيرًا ما تخلط مسائل الامتحان المعطيات: قيمة قصوى أو انعطاف أو مماس أو نقطة. ويُستحسن عمل قائمة: لكل معطى معادلته. والمماس $y=mx+n$ عند $x_0$ يقول أمرين معًا: نقطة التماس والميل $m$. وإذا كان المماس عند $x=0$ فإن الجزء المقطوع من محور الصادات $n$ هو $f(0)$.',
            'Exam problems often mix facts: an extremum, an inflection, a tangent or a point. It helps to make a list: each fact, its equation. A tangent $y=mx+n$ at $x_0$ says two things at once: the point of contact and the slope $m$. If the tangent is at $x=0$, the y-intercept $n$ is $f(0)$.'
        ),
        why: {
            text: say(
                'Zergatik funtzionatzen du? Baldintza bakoitza ekuazio lineal bat da koefizienteetan, $f$, $f\'$ eta $f\'\'$ haien menpe modu linealean daudelako. Horregatik, hiru datu independenterekin $a$, $b$ eta $c$ ateratzen dira zehazki, hiru ezezaguneko hiru ekuazioko sistema batean bezala.',
                '¿Por qué funciona? Cada condición es una ecuación lineal en los coeficientes, porque $f$, $f\'$ y $f\'\'$ dependen de ellos de forma lineal. Por eso con tres datos independientes salen exactamente $a$, $b$ y $c$, como en un sistema de tres ecuaciones con tres incógnitas.',
                'لماذا تصح؟ كل شرط معادلة خطية في المعاملات، لأن $f$ و$f\'$ و$f\'\'$ تعتمد عليها اعتمادًا خطيًّا. لذلك تعطي ثلاثة معطيات مستقلة القيم $a$ و$b$ و$c$ بالضبط، كما في نظام من ثلاث معادلات بثلاثة مجاهيل.',
                'Why does it work? Each condition is a linear equation in the coefficients, because $f$, $f\'$ and $f\'\'$ depend on them linearly. That is why three independent facts give exactly $a$, $b$ and $c$, as in a system of three equations in three unknowns.'
            )
        },
        examplePrompt: say('Aurkitu $b$ eta $c$, $g(x)=x^2+bx+c$ funtzioaren zuzen ukitzailea $x=1$ puntuan $y=4x+1$ bada.', 'Halla $b$ y $c$ si la tangente a $g(x)=x^2+bx+c$ en $x=1$ es $y=4x+1$.', 'أوجد $b$ و$c$ إذا كان مماس $g(x)=x^2+bx+c$ عند $x=1$ هو $y=4x+1$.', 'Find $b$ and $c$ if the tangent to $g(x)=x^2+bx+c$ at $x=1$ is $y=4x+1$.'),
        example: same('$\\begin{gathered}g\'(1)=2+b=4\\ \\to\\ b=2\\\\ g(1)=1+b+c=5\\ \\to\\ c=2\\end{gathered}$'),
        exampleAnswer: say('Zuzenak 4 malda eta $4+1=5$ altuera ematen ditu: $b=2$ eta $c=2$.', 'La recta da la pendiente 4 y la altura $4+1=5$: $b=2$ y $c=2$.', 'يعطي المستقيم الميل 4 والارتفاع $4+1=5$: $b=2$ و$c=2$.', 'The line gives the slope 4 and the height $4+1=5$: $b=2$ and $c=2$.')
    },

    /* ---------- 5. Optimisation ---------- */
    'areas-volumes': {
        definitions: [
            { term: say('Helburu-funtzioa', 'Función objetivo', 'دالة الهدف', 'Objective function'), meaning: say('Maximo edo minimo egin nahi den funtzioa: azalera bat, bolumen bat, kostu bat...', 'La función que se quiere hacer máxima o mínima: un área, un volumen, un coste...', 'الدالة التي نريد جعلها عظمى أو صغرى: مساحة أو حجم أو تكلفة...', 'The function you want to make as large or as small as possible: an area, a volume, a cost...') }
        ],
        vocabulary: [
            say('aldagaia', 'variable', 'المتغير', 'variable'),
            say('baldintza', 'condición', 'الشرط', 'condition'),
            say('optimoa', 'óptimo', 'الأمثل', 'optimum')
        ],
        explanation: say(
            'Optimizazio-problema batean helburu-funtzio bat eta aldagaiak lotzen dituen baldintza bat daude. Baldintzak aldagai bat askatzeko balio du, funtzioa aldagai bakarrarekin uzteko. Gero, deribatua 0 duten puntuak bilatzen dira zentzua duen eremuan, eta egiaztatzen da zeinek ematen duen optimoa.',
            'En un problema de optimización hay una función objetivo y una condición que liga las variables. La condición sirve para despejar una variable y dejar la función con una sola. Después se buscan los puntos con derivada 0 dentro del dominio con sentido, y se comprueba cuál da el óptimo.',
            'في مسألة الاستمثال توجد دالة هدف وشرط يربط المتغيرات. ويفيد الشرط في استخراج متغير لتبقى الدالة بمتغير واحد. ثم نبحث عن النقاط التي مشتقتها 0 داخل المجال الذي له معنى، ونتحقق أيها يعطي الأمثل.',
            'In an optimisation problem there is an objective function and a condition that links the variables. The condition is used to solve for one variable and leave the function with only one. Then look for the points with derivative 0 inside the domain that makes sense, and check which one gives the optimum.'
        ),
        why: {
            text: say(
                'Zergatik funtzionatzen du? Tarte barruko maximo edo minimo batean, funtzioak igotzeari uzten dio jaisteko, edo alderantziz: zuzen ukitzailea horizontala da eta deribatua 0 da. Horregatik bilatzen da optimoa deribatuaren zeroen artean, tartearen muturrak ahaztu gabe.',
                '¿Por qué funciona? En un máximo o un mínimo dentro del intervalo, la función deja de subir para bajar, o al revés: la tangente es horizontal y la derivada vale 0. Por eso el óptimo se busca entre los ceros de la derivada, sin olvidar los bordes del intervalo.',
                'لماذا تصح؟ عند قيمة عظمى أو صغرى داخل الفترة تكفّ الدالة عن الصعود لتنزل أو العكس: فيكون المماس أفقيًّا والمشتقة 0. لذلك نبحث عن الأمثل بين أصفار المشتقة، دون أن ننسى طرفي الفترة.',
                'Why does it work? At a maximum or a minimum inside the interval, the function stops going up to go down, or the other way round: the tangent is horizontal and the derivative is 0. That is why the optimum is sought among the zeros of the derivative, without forgetting the ends of the interval.'
            )
        },
        examplePrompt: say('$49\\ \\text{cm}^2$ azalerako laukizuzenetatik, zeinek du perimetro txikiena?', 'De los rectángulos de área $49\\ \\text{cm}^2$, ¿cuál tiene el perímetro mínimo?', 'من بين المستطيلات التي مساحتها $49\\ \\text{cm}^2$، أيها له أصغر محيط؟', 'Of the rectangles with area $49\\ \\text{cm}^2$, which one has the smallest perimeter?'),
        example: same('$\\begin{gathered}P(x)=2x+\\frac{98}{x}\\\\ P\'(x)=2-\\frac{98}{x^2}=0\\ \\to\\ x=7\\end{gathered}$'),
        exampleAnswer: say('7 cm-ko aldeko karratua, 28 cm-ko perimetroarekin.', 'El cuadrado de lado 7 cm, con perímetro 28 cm.', 'المربع الذي ضلعه 7 cm ومحيطه 28 cm.', 'The square with side 7 cm, with perimeter 28 cm.')
    },
    distances: {
        definitions: [
            { term: say('Bi punturen arteko distantzia', 'Distancia entre dos puntos', 'المسافة بين نقطتين', 'Distance between two points'), meaning: say('$A(x_1,y_1)$ eta $B(x_2,y_2)$ puntuetarako, $d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.', 'Para $A(x_1,y_1)$ y $B(x_2,y_2)$, $d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.', 'للنقطتين $A(x_1,y_1)$ و$B(x_2,y_2)$: $d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.', 'For $A(x_1,y_1)$ and $B(x_2,y_2)$, $d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.') }
        ],
        vocabulary: [
            say('hurbilena', 'más cercano', 'الأقرب', 'closest'),
            say('karratua', 'cuadrado', 'مربع', 'square'),
            say('zuzenkia', 'segmento', 'القطعة', 'segment')
        ],
        explanation: say(
            'Distantziak erro bat du, eta horrek deribatua zailtzen du. Erroa barrukoa handitzean handitzen denez, $d$ eta $d^2$ puntu berean dira minimoak, beraz karratua minimizatzen da. Kurbaren puntua aldagai bakarrarekin idazten da, $(x,f(x))$.',
            'La distancia lleva una raíz, que complica la derivada. Como la raíz crece cuando crece lo de dentro, $d$ y $d^2$ son mínimas en el mismo punto, así que se minimiza el cuadrado. El punto de la curva se escribe con una sola variable, $(x,f(x))$.',
            'في المسافة جذر يعقّد المشتقة. وبما أن الجذر يكبر حين يكبر ما بداخله، فإن $d$ و$d^2$ صغريان في النقطة نفسها، فنصغّر المربع. ونكتب نقطة المنحنى بمتغير واحد، $(x,f(x))$.',
            'The distance carries a root, which makes the derivative harder. Since the root grows when the inside grows, $d$ and $d^2$ are smallest at the same point, so the square is minimised. The point of the curve is written with a single variable, $(x,f(x))$.'
        ),
        examplePrompt: say('$y=2x$ zuzenaren zein puntu dago $A(5,\\,0)$ puntutik hurbilen?', '¿Qué punto de la recta $y=2x$ está más cerca de $A(5,\\,0)$?', 'أي نقطة من المستقيم $y=2x$ هي الأقرب إلى $A(5,\\,0)$؟', 'Which point of the line $y=2x$ is closest to $A(5,\\,0)$?'),
        example: same('$\\begin{gathered}D(x)=(x-5)^2+4x^2=5x^2-10x+25\\\\ D\'(x)=10x-10=0\\\\ \\to\\ x=1\\end{gathered}$'),
        exampleAnswer: say('$(1,\\,2)$ puntua: $A$ punturainoko zuzenkia zuzenarekiko perpendikularra da.', 'El punto $(1,\\,2)$: el segmento hasta $A$ es perpendicular a la recta.', 'النقطة $(1,\\,2)$: القطعة حتى $A$ عمودية على المستقيم.', 'The point $(1,\\,2)$: the segment to $A$ is perpendicular to the line.')
    },
    'contexts-interval': {
        definitions: [
            { term: say('Mozkina', 'Beneficio', 'الربح', 'Profit'), meaning: say('Irabazten dena: diru-sarrerak ken kostuak.', 'Lo que se gana: los ingresos menos los costes.', 'ما نكسبه: الإيرادات ناقص التكاليف.', 'What is earned: income minus costs.') }
        ],
        vocabulary: [
            say('kostua', 'coste', 'التكلفة', 'cost'),
            say('diru-sarrerak', 'ingresos', 'الإيرادات', 'income'),
            say('mila', 'miles', 'آلاف', 'thousands')
        ],
        explanation: say(
            'Kostu-, diru-sarrera- edo mozkin-funtzioek balio batzuetarako bakarrik dute zentzua: ez dira pieza negatiboak egiten, eta fabrikak muga bat du. Horregatik bilatzen da optimoa tarte itxi batean, mutur absolutuak bezala: barruko puntu singularrak eta bi muturrak. Batzuetan onena mutur batean dago.',
            'Las funciones de coste, ingresos o beneficio solo tienen sentido para ciertos valores: no se fabrican piezas negativas y la fábrica tiene un límite. Por eso el óptimo se busca en un intervalo cerrado, como los extremos absolutos: puntos singulares de dentro y los dos bordes. A veces el mejor está en un borde.',
            'لدوال التكلفة والإيرادات والربح معنى لقيم معيّنة فقط: لا تُصنع قطع سالبة وللمصنع حدّ. لذلك نبحث عن الأمثل في فترة مغلقة كما في القيم القصوى المطلقة: النقاط الحرجة في الداخل والطرفان. وأحيانًا يكون الأفضل عند طرف.',
            'Cost, income or profit functions only make sense for some values: no negative parts are made and the factory has a limit. That is why the optimum is sought on a closed interval, as with absolute extrema: the stationary points inside and the two ends. Sometimes the best one is at an end.'
        ),
        examplePrompt: say('$x$ tona egiteko kostua $C(x)=x^2-10x+40$ da, $x\\in[0,\\,4]$ izanik. Zenbat tonarekin da minimoa?', 'El coste de fabricar $x$ toneladas es $C(x)=x^2-10x+40$, con $x\\in[0,\\,4]$. ¿Con cuántas toneladas es mínimo?', 'تكلفة صنع $x$ طنًّا هي $C(x)=x^2-10x+40$ حيث $x\\in[0,\\,4]$. عند كم طنًّا تكون صغرى؟', 'The cost of making $x$ tonnes is $C(x)=x^2-10x+40$, with $x\\in[0,\\,4]$. For how many tonnes is it smallest?'),
        example: same('$\\begin{gathered}C\'(x)=2x-10=0\\\\ \\to\\ x=5\\notin[0,\\,4]\\\\ C(0)=40\\\\ C(4)=16-40+40=16\\end{gathered}$'),
        exampleAnswer: say('4 tona: $C\'<0$ da tarte osoan, eta minimoa muturrean dago.', 'Con 4 toneladas: $C\'<0$ en todo el intervalo y el mínimo está en el borde.', 'عند 4 أطنان: $C\'<0$ على الفترة كلها والقيمة الصغرى عند الطرف.', 'With 4 tonnes: $C\'<0$ on the whole interval and the minimum is at the end.')
    }
}
