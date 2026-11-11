import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { Bach2SketchTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Funtzioen adierazpena · Batxilergoa 2 · Zientziak — what each lesson
   tells: the new words (definitions), a short explanation, the example as
   an exercise («Another example»), the key words in four languages, cases
   in two lessons (the three kinds of asymptote; |f(x)| and f(|x|)) and,
   in five, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics and gives \sin and \tan each
   language's names. The example uses numbers of its own, never those of
   «Let's solve», of «Check it» or of the typical mistake. Tests in
   tests/lesson-texts.test.ts.
   ========================================================================== */

export const bach2SketchLessonTexts: Record<Bach2SketchTopicId, LessonTexts> = {
    /* ---------- 1. Review of 1.º ---------- */
    'sketch-plan': {
        definitions: [
            { term: say('Gidoia', 'Guion', 'الخطة', 'Plan'), meaning: say('Funtzio bat marraztu aurretik aztertzeko urratsen zerrenda ordenatua.', 'La lista ordenada de pasos para estudiar una función antes de dibujarla.', 'قائمة مرتبة بالخطوات لدراسة دالة قبل رسمها.', 'The ordered list of steps for studying a function before drawing it.') }
        ],
        vocabulary: [
            say('izate-eremua', 'dominio', 'المجال', 'domain'),
            say('ebaki-puntuak', 'cortes', 'نقاط التقاطع', 'intercepts'),
            say('adar infinitua', 'rama infinita', 'الفرع اللانهائي', 'infinite branch')
        ],
        explanation: say(
            'Funtzio bat irudikatzeko ez dira balioak ausaz ematen: gidoi bat jarraitzen da. Lehenik deribatu gabe ikusten dena (izate-eremua, ebaki-puntuak, zeinua, simetria, asintotak eta adar infinituak), gero $f\'$ hazkunderako eta $f\'\'$ kurbadurarako. Urrats bakoitzak markak uzten ditu planoan, eta kurbak lotu egiten ditu.',
            'Para representar una función no se dan valores al azar: se sigue un guion. Primero lo que se ve sin derivar (dominio, cortes, signo, simetría, asíntotas y cada rama infinita), después $f\'$ para el crecimiento y $f\'\'$ para la curvatura. Cada paso deja marcas en el plano, y la curva las une.',
            'لرسم دالة لا نعطي قيمًا عشوائية: نتبع خطة. أولًا ما يُرى دون اشتقاق (المجال ونقاط التقاطع والإشارة والتناظر والمقاربات والفرع اللانهائي)، ثم $f\'$ للتزايد و$f\'\'$ للتقعّر. وكل خطوة تترك علامات في المستوى، ويصل المنحنى بينها.',
            'To sketch a function you do not pick values at random: you follow a plan. First what is seen without differentiating (domain, intercepts, sign, symmetry, asymptotes and each infinite branch), then $f\'$ for increase and $f\'\'$ for concavity. Each step leaves marks on the plane, and the curve joins them.'
        ),
        examplePrompt: say('Aurkitu $g(x)=x^4-2x^2$ funtzioaren muturrak eta adarrak.', 'Halla los extremos y las ramas de $g(x)=x^4-2x^2$.', 'أوجد القيم القصوى والفروع للدالة $g(x)=x^4-2x^2$.', 'Find the extrema and the branches of $g(x)=x^4-2x^2$.'),
        example: same('$\\begin{gathered}g\'(x)=4x(x^2-1)=0\\ \\to\\ x=0,\\ x=\\pm 1\\\\ g(0)=0\\qquad g(\\pm 1)=-1\\end{gathered}$'),
        exampleAnswer: say('Maximoa $(0,\\,0)$ puntuan eta minimoak $(\\pm 1,\\,-1)$ puntuetan; bi aldeetatik $g\\to+\\infty$.', 'Máximo en $(0,\\,0)$ y mínimos en $(\\pm 1,\\,-1)$; por los dos lados $g\\to+\\infty$.', 'قيمة عظمى عند $(0,\\,0)$ وصغريان عند $(\\pm 1,\\,-1)$؛ ومن الجهتين $g\\to+\\infty$.', 'A maximum at $(0,\\,0)$ and minima at $(\\pm 1,\\,-1)$; on both sides $g\\to+\\infty$.')
    },
    'asymptotes-review': {
        definitions: [
            { term: say('Asintota zeiharra', 'Asíntota oblicua', 'المقارب المائل', 'Oblique asymptote'), meaning: say('$y=mx+n$ zuzen bat, $m\\neq 0$ izanik, kurba hurbiltzen zaiona $x\\to\\pm\\infty$ doanean.', 'Una recta $y=mx+n$ con $m\\neq 0$ a la que la curva se acerca cuando $x\\to\\pm\\infty$.', 'مستقيم $y=mx+n$ حيث $m\\neq 0$ يقترب منه المنحنى عندما $x\\to\\pm\\infty$.', 'A line $y=mx+n$ with $m\\neq 0$ that the curve approaches as $x\\to\\pm\\infty$.') }
        ],
        vocabulary: [
            say('bertikala', 'vertical', 'رأسي', 'vertical'),
            say('horizontala', 'horizontal', 'أفقي', 'horizontal'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Asintotak kurba urrunean edo puntu baten ondoan gidatzen duten zuzenak dira. Bertikalak funtzioak infinitura jotzen duen tokian daude, normalean izendatzailea zero den tokian. Horizontalek eta zeiharrek $x\\to\\pm\\infty$ doanean gertatzen dena deskribatzen dute: ezin dira biak egon alde beretik.',
            'Las asíntotas son rectas que guían la curva lejos o cerca de un punto. Las verticales están donde la función se va a infinito, normalmente donde se anula un denominador. Las horizontales y oblicuas describen qué pasa cuando $x\\to\\pm\\infty$: no puede haber las dos por el mismo lado.',
            'المقاربات مستقيمات توجّه المنحنى بعيدًا أو قرب نقطة. تقع الرأسية حيث تذهب الدالة إلى اللانهاية، وعادة حيث ينعدم المقام. وتصف الأفقية والمائلة ما يحدث عندما $x\\to\\pm\\infty$: ولا يمكن وجودهما معًا من الجهة نفسها.',
            'Asymptotes are lines that guide the curve far away or near a point. Vertical ones are where the function goes to infinity, usually where a denominator is 0. Horizontal and oblique ones describe what happens as $x\\to\\pm\\infty$: there cannot be both on the same side.'
        ),
        cases: [
            { title: say('Bertikala', 'Vertical', 'رأسي', 'Vertical'), text: say('Funtzioak infinitura jotzen du puntu batean.', 'La función se va a infinito en un punto.', 'تذهب الدالة إلى اللانهاية عند نقطة.', 'The function goes to infinity at a point.'), math: same('$\\lim_{x\\to a}f(x)=\\pm\\infty\\ \\to\\ x=a$') },
            { title: say('Horizontala', 'Horizontal', 'أفقي', 'Horizontal'), text: say('Funtzioak zenbaki batera jotzen du infinituan.', 'La función va a un número en el infinito.', 'تذهب الدالة إلى عدد في اللانهاية.', 'The function tends to a number at infinity.'), math: same('$\\lim_{x\\to\\pm\\infty}f(x)=k\\ \\to\\ y=k$') },
            { title: say('Zeiharra', 'Oblicua', 'مائل', 'Oblique'), text: say('Malda eta ordenatua jatorrian, bi limiterekin.', 'La pendiente y la ordenada en el origen, con dos límites.', 'الميل والجزء المقطوع، بنهايتين.', 'The slope and the intercept, with two limits.'), math: same('$m=\\lim\\frac{f(x)}{x}\\qquad n=\\lim(f(x)-mx)$') }
        ],
        examplePrompt: say('Aurkitu $g(x)=\\frac{3x}{x+2}$ funtzioaren asintotak.', 'Halla las asíntotas de $g(x)=\\frac{3x}{x+2}$.', 'أوجد مقاربات $g(x)=\\frac{3x}{x+2}$.', 'Find the asymptotes of $g(x)=\\frac{3x}{x+2}$.'),
        example: same('$\\begin{gathered}x+2=0\\ \\to\\ x=-2\\\\ \\lim_{x\\to\\pm\\infty}\\frac{3x}{x+2}=3\\ \\to\\ y=3\\end{gathered}$'),
        exampleAnswer: say('Bertikala $x=-2$ eta horizontala $y=3$; ez dago zeiharrik.', 'Vertical $x=-2$ y horizontal $y=3$; no hay oblicua.', 'رأسي $x=-2$ وأفقي $y=3$؛ ولا يوجد مائل.', 'Vertical $x=-2$ and horizontal $y=3$; there is no oblique one.')
    },
    'rational-review': {
        definitions: [
            { term: say('Adarra', 'Rama', 'الفرع', 'Branch'), meaning: say('Bi asintota bertikalen arteko grafiko-zati bakoitza.', 'Cada trozo de la gráfica entre dos asíntotas verticales.', 'كل جزء من الرسم بين مقاربين رأسيين.', 'Each piece of the graph between two vertical asymptotes.') }
        ],
        vocabulary: [
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('balio-taula', 'tabla de valores', 'جدول القيم', 'table of values')
        ],
        explanation: say(
            'Funtzio arrazional bat zatitan banatzen da bere asintota bertikalekin. Zati bakoitzean kurba jarraitua da, eta haren zeinua zenbakitzailearen zeroetan bakarrik aldatzen da. Asintotekin, zeinuarekin eta muturrekin, adar bakoitza ia marraztuta geratzen da balio-taula egin aurretik.',
            'Una racional se parte en trozos por sus asíntotas verticales. En cada trozo la curva es continua y su signo no cambia más que en los ceros del numerador. Con las asíntotas, el signo y los extremos, cada rama queda casi dibujada antes de hacer la tabla de valores.',
            'تنقسم الدالة الكسرية إلى أجزاء بمقارباتها الرأسية. وفي كل جزء يكون المنحنى متصلًا، ولا تتغير إشارته إلا عند أصفار البسط. وبالمقاربات والإشارة والقيم القصوى يكاد كل فرع يُرسم قبل إعداد جدول القيم.',
            'A rational function is split into pieces by its vertical asymptotes. In each piece the curve is continuous and its sign only changes at the zeros of the numerator. With the asymptotes, the sign and the extrema, each branch is almost drawn before making the table of values.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\frac{x^2+4}{x}$ funtzioaren asintotak eta muturrak.', 'Halla las asíntotas y los extremos de $g(x)=\\frac{x^2+4}{x}$.', 'أوجد مقاربات $g(x)=\\frac{x^2+4}{x}$ وقيمها القصوى.', 'Find the asymptotes and the extrema of $g(x)=\\frac{x^2+4}{x}$.'),
        example: same('$\\begin{gathered}g(x)=x+\\frac{4}{x}\\ \\to\\ x=0,\\ y=x\\\\ g\'(x)=1-\\frac{4}{x^2}=0\\ \\to\\ x=\\pm 2\\end{gathered}$'),
        exampleAnswer: say('$x=0$ eta $y=x$ asintotak; maximoa $(-2,\\,-4)$ puntuan eta minimoa $(2,\\,4)$ puntuan.', 'Asíntotas $x=0$ e $y=x$; máximo en $(-2,\\,-4)$ y mínimo en $(2,\\,4)$.', 'المقاربان $x=0$ و$y=x$؛ قيمة عظمى عند $(-2,\\,-4)$ وصغرى عند $(2,\\,4)$.', 'Asymptotes $x=0$ and $y=x$; a maximum at $(-2,\\,-4)$ and a minimum at $(2,\\,4)$.')
    },

    /* ---------- 2. The study before differentiating ---------- */
    'symmetry-period': {
        definitions: [
            { term: say('Funtzio bikoitia', 'Función par', 'الدالة الزوجية', 'Even function'), meaning: say('$f(-x)=f(x)$ betetzen duen funtzioa, bere izate-eremuko $x$ guztietarako.', 'Una función con $f(-x)=f(x)$ para todo $x$ de su dominio.', 'دالة تحقق $f(-x)=f(x)$ لكل $x$ من مجالها.', 'A function with $f(-x)=f(x)$ for every $x$ in its domain.') }
        ],
        vocabulary: [
            say('bakoitia', 'impar', 'فردية', 'odd'),
            say('jatorria', 'origen', 'الأصل', 'origin'),
            say('periodoa', 'periodo', 'الدور', 'period')
        ],
        explanation: say(
            'Simetriak lana aurrezten du. $f$ bikoitia bada, haren grafikoa ispilu bat da $Y$ ardatzarekiko; bakoitia bada, buelta erdi bat ematen du jatorriaren inguruan. Jakiteko, $f(-x)$ kalkulatzen da. Funtzio trigonometrikoak periodikoak dira: periodo batean gertatzen dena guztietan errepikatzen da.',
            'La simetría ahorra trabajo. Si $f$ es par, su gráfica es un espejo respecto del eje $Y$; si es impar, gira media vuelta alrededor del origen. Para saberlo se calcula $f(-x)$. Las trigonométricas son periódicas: lo que pasa en un periodo se repite en todos.',
            'يوفّر التناظر العمل. إذا كانت $f$ زوجية فرسمها مرآة بالنسبة إلى المحور $Y$، وإذا كانت فردية فإنه يدور نصف دورة حول الأصل. ولمعرفة ذلك نحسب $f(-x)$. والدوال المثلثية دورية: ما يحدث في دور واحد يتكرر في كل الأدوار.',
            'Symmetry saves work. If $f$ is even, its graph is a mirror image in the $Y$ axis; if it is odd, it turns half a turn about the origin. To find out, work out $f(-x)$. Trigonometric functions are periodic: what happens in one period repeats in all of them.'
        ),
        why: {
            text: say(
                'Zergatik funtzionatzen du? $f(-x)=f(x)$ bada, $(a,f(a))$ eta $(-a,f(a))$ puntuak biak daude grafikoan: bata bestearen isla da $Y$ ardatzean. $f(-x)=-f(x)$ bada, $(a,f(a))$ puntuaren isla $(-a,-f(a))$ da: buelta erdi bat jatorriaren inguruan.',
                '¿Por qué funciona? Si $f(-x)=f(x)$, los puntos $(a,f(a))$ y $(-a,f(a))$ están los dos en la gráfica: uno es el reflejo del otro en el eje $Y$. Si $f(-x)=-f(x)$, el reflejo de $(a,f(a))$ es $(-a,-f(a))$: media vuelta alrededor del origen.',
                'لماذا تصح؟ إذا كان $f(-x)=f(x)$ فالنقطتان $(a,f(a))$ و$(-a,f(a))$ كلتاهما على الرسم: كل منهما انعكاس للأخرى في المحور $Y$. وإذا كان $f(-x)=-f(x)$ فانعكاس $(a,f(a))$ هو $(-a,-f(a))$: نصف دورة حول الأصل.',
                'Why does it work? If $f(-x)=f(x)$, the points $(a,f(a))$ and $(-a,f(a))$ are both on the graph: each is the reflection of the other in the $Y$ axis. If $f(-x)=-f(x)$, the reflection of $(a,f(a))$ is $(-a,-f(a))$: half a turn about the origin.'
            )
        },
        examplePrompt: say('Bikoitia, bakoitia ala bat ere ez da $g(x)=x^2+x$?', '¿Es par, impar o ninguna $g(x)=x^2+x$?', 'هل $g(x)=x^2+x$ زوجية أم فردية أم لا هذه ولا تلك؟', 'Is $g(x)=x^2+x$ even, odd or neither?'),
        example: same('$g(-x)=x^2-x\\neq g(x)\\qquad g(-x)\\neq -g(x)$'),
        exampleAnswer: say('Ez bikoitia ez bakoitia: $g(-x)$ ez dator bat $g(x)$ adierazpenarekin, ezta $-g(x)$ adierazpenarekin ere.', 'Ni par ni impar: $g(-x)$ no coincide con $g(x)$ ni con $-g(x)$.', 'لا زوجية ولا فردية: لا تطابق $g(-x)$ العبارة $g(x)$ ولا $-g(x)$.', 'Neither even nor odd: $g(-x)$ matches neither $g(x)$ nor $-g(x)$.')
    },
    'asymptote-position': {
        definitions: [
            { term: say('Posizio erlatiboa', 'Posición relativa', 'الوضع النسبي', 'Relative position'), meaning: say('Kurba zuzen baten gainetik ala azpitik dagoen, zona bakoitzean.', 'Si la curva queda por encima o por debajo de una recta, en cada zona.', 'هل يقع المنحنى فوق مستقيم أم تحته، في كل منطقة.', 'Whether the curve lies above or below a line, in each region.') }
        ],
        vocabulary: [
            say('gainetik', 'por encima', 'فوق', 'above'),
            say('azpitik', 'por debajo', 'تحت', 'below'),
            say('kendura', 'diferencia', 'الفرق', 'difference')
        ],
        explanation: say(
            'Asintota batek esaten du nora doan kurba, baina ez zein aldetik hurbiltzen den. Horretarako, asintota funtziotik kentzen da eta kenduraren zeinua begiratzen da: positiboa bada, kurba gainetik dago; negatiboa bada, azpitik. Bertikal batean alboko limiteak begiratzen dira.',
            'Una asíntota dice hacia dónde va la curva, pero no por qué lado se acerca. Para eso se resta la asíntota a la función y se mira el signo de la diferencia: si es positiva, la curva está por encima; si es negativa, por debajo. Con una vertical se miran los límites laterales.',
            'يدل المقارب على اتجاه المنحنى، لكن لا يدل على الجهة التي يقترب منها. لذلك نطرح المقارب من الدالة وننظر إلى إشارة الفرق: إذا كان موجبًا فالمنحنى فوق، وإذا كان سالبًا فتحت. ومع المقارب الرأسي ننظر إلى النهايتين الجانبيتين.',
            'An asymptote says where the curve goes, but not from which side it comes in. For that, subtract the asymptote from the function and look at the sign of the difference: if it is positive, the curve is above; if negative, below. With a vertical one, look at the one-sided limits.'
        ),
        why: {
            text: say(
                'Zergatik funtzionatzen du? $x$ puntuan kurbaren eta zuzenaren arteko distantzia bertikala $f(x)-(mx+n)$ da. 0 baliora jotzen badu, zuzena asintota da; haren zeinuak esaten du zein dagoen gorago. Kendura jarraitua denez, bertikaletan izan ezik, zero den tokian bakarrik aldatzen du zeinua.',
                '¿Por qué funciona? La distancia vertical entre la curva y la recta en $x$ es $f(x)-(mx+n)$. Si tiende a 0, la recta es asíntota; su signo dice cuál está más arriba. Como la diferencia es continua salvo en las verticales, solo cambia de signo donde se anula.',
                'لماذا تصح؟ المسافة الرأسية بين المنحنى والمستقيم عند $x$ هي $f(x)-(mx+n)$. فإذا آلت إلى 0 كان المستقيم مقاربًا، وتدل إشارتها على أيهما أعلى. وبما أن الفرق متصل إلا عند المقاربات الرأسية، فلا تتغير إشارته إلا حيث ينعدم.',
                'Why does it work? The vertical distance between the curve and the line at $x$ is $f(x)-(mx+n)$. If it tends to 0, the line is an asymptote; its sign says which one is higher. Since the difference is continuous except at the vertical ones, it only changes sign where it is 0.'
            )
        },
        examplePrompt: say('$g(x)=\\frac{2x+1}{x-1}$ funtzioa $y=2$ zuzenaren gainetik ala azpitik doa $x\\to+\\infty$ doanean?', '¿Va $g(x)=\\frac{2x+1}{x-1}$ por encima o por debajo de $y=2$ cuando $x\\to+\\infty$?', 'هل تسير $g(x)=\\frac{2x+1}{x-1}$ فوق $y=2$ أم تحته عندما $x\\to+\\infty$؟', 'Does $g(x)=\\frac{2x+1}{x-1}$ run above or below $y=2$ as $x\\to+\\infty$?'),
        example: same('$g(x)-2=\\frac{2x+1-2x+2}{x-1}=\\frac{3}{x-1}$'),
        exampleAnswer: say('Gainetik: $\\frac{3}{x-1}$ kendura positiboa da $x\\to+\\infty$ doanean.', 'Por encima: la diferencia $\\frac{3}{x-1}$ es positiva cuando $x\\to+\\infty$.', 'فوقه: الفرق $\\frac{3}{x-1}$ موجب عندما $x\\to+\\infty$.', 'Above: the difference $\\frac{3}{x-1}$ is positive as $x\\to+\\infty$.')
    },
    'domain-edges': {
        definitions: [
            { term: say('Zuzen ukitzaile bertikala', 'Tangente vertical', 'المماس الرأسي', 'Vertical tangent'), meaning: say('$Y$ ardatzaren paraleloa den zuzen ukitzailea: $f\'$ maldak infinitura jotzen du.', 'Una tangente paralela al eje $Y$: la pendiente $f\'$ se va a infinito.', 'مماس موازٍ للمحور $Y$: يذهب الميل $f\'$ إلى اللانهاية.', 'A tangent parallel to the $Y$ axis: the slope $f\'$ goes to infinity.') }
        ],
        vocabulary: [
            say('ertza', 'borde', 'الحافة', 'edge'),
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root'),
            say('amaitzen da', 'termina', 'ينتهي', 'ends')
        ],
        explanation: say(
            'Indize bikoitiko erroek eta logaritmoek izate-eremua mozten dute, eta grafikoa ez dago hortik kanpo. Ertz batean kurba puntu batean amaitzen da. Han deribatuak infinitura jotzen badu, kurba bertikal heltzen da, zirkunferentzia bezala; bestela, malda finituarekin heltzen da. Erro karratua da adibiderik ohikoena.',
            'Las raíces de índice par y los logaritmos recortan el dominio, y la gráfica no existe fuera de él. En un borde la curva termina en un punto. Si allí la derivada se va a infinito, la curva llega en vertical, como la circunferencia; si no, llega con pendiente finita. La raíz cuadrada es el caso más común.',
            'تقتطع الجذور ذات الدليل الزوجي واللوغاريتمات المجال، ولا يوجد الرسم خارجه. وعند الحافة ينتهي المنحنى في نقطة. فإذا ذهبت المشتقة هناك إلى اللانهاية وصل المنحنى رأسيًّا كالدائرة، وإلا وصل بميل منته. والجذر التربيعي أكثر الحالات شيوعًا.',
            'Roots of even index and logarithms cut the domain, and the graph does not exist outside it. At an edge the curve ends at a point. If the derivative goes to infinity there, the curve arrives vertically, like the circle; if not, it arrives with a finite slope. The square root is the most common case.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\sqrt{x-4}$ funtzioaren izate-eremua eta ertza.', 'Halla el dominio y el borde de $g(x)=\\sqrt{x-4}$.', 'أوجد مجال $g(x)=\\sqrt{x-4}$ وحافته.', 'Find the domain and the edge of $g(x)=\\sqrt{x-4}$.'),
        example: same('$\\begin{gathered}x-4\\ge 0\\ \\to\\ x\\ge 4\\\\ g\'(x)=\\frac{1}{2\\sqrt{x-4}}\\end{gathered}$'),
        exampleAnswer: say('Izate-eremua $[4,\\,+\\infty)$ da; $(4,\\,0)$ puntuan $g\'$ infinitura doa, eta zuzen ukitzailea bertikala da.', 'Dominio $[4,\\,+\\infty)$; en $(4,\\,0)$, $g\'$ se va a infinito y la tangente es vertical.', 'المجال $[4,\\,+\\infty)$؛ وعند $(4,\\,0)$ تذهب $g\'$ إلى اللانهاية ويكون المماس رأسيًّا.', 'Domain $[4,\\,+\\infty)$; at $(4,\\,0)$, $g\'$ goes to infinity and the tangent is vertical.')
    },

    /* ---------- 3. Exponential and logarithmic ---------- */
    'exp-products': {
        definitions: [
            { term: say('Faktore positiboa', 'Factor positivo', 'العامل الموجب', 'Positive factor'), meaning: say('Inoiz negatiboa ez den faktorea, $e^{-x}$ bezala: ez du $f\'$ deribatuaren zeinua aldatzen.', 'Un factor que nunca es negativo, como $e^{-x}$: no cambia el signo de $f\'$.', 'عامل لا يكون سالبًا أبدًا مثل $e^{-x}$: لا يغيّر إشارة $f\'$.', 'A factor that is never negative, like $e^{-x}$: it does not change the sign of $f\'$.') }
        ],
        vocabulary: [
            say('esponentziala', 'exponencial', 'الأسية', 'exponential'),
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('faktore komuna', 'factor común', 'العامل المشترك', 'common factor')
        ],
        explanation: say(
            'Berretura bat bider $e^{-x}$ den biderkadura batean, $x\\to+\\infty$ doanean $\\infty\\cdot 0$ agertzen da. L\'Hôpitalekin ikusten da esponentziala edozein berretura baino azkarrago hazten dela, eta biderkadurak 0 baliora jotzen duela. Deribatzean, $e^{-x}$ faktore komun gisa ateratzen da, eta beste faktoreak ematen du zeinua.',
            'En un producto de una potencia por $e^{-x}$, cuando $x\\to+\\infty$ aparece $\\infty\\cdot 0$. Con L\'Hôpital se ve que la exponencial crece más deprisa que cualquier potencia, así que el producto tiende a 0. Al derivar, $e^{-x}$ sale como factor común y el signo lo da el otro factor.',
            'في جداء قوة في $e^{-x}$، عندما $x\\to+\\infty$ تظهر $\\infty\\cdot 0$. وبقاعدة لوبيتال نرى أن الدالة الأسية تكبر أسرع من أي قوة، فيؤول الجداء إلى 0. وعند الاشتقاق تخرج $e^{-x}$ عاملًا مشتركًا، ويحدد العامل الآخر الإشارة.',
            'In a product of a power and $e^{-x}$, as $x\\to+\\infty$ the form $\\infty\\cdot 0$ appears. With L\'Hôpital you see that the exponential grows faster than any power, so the product tends to 0. On differentiating, $e^{-x}$ comes out as a common factor and the other factor gives the sign.'
        ),
        why: {
            text: say(
                'Zergatik funtzionatzen du? $\\frac{x^n}{e^x}$ adierazpenari L\'Hôpital aplikatzen zaion bakoitzean, goiko berretzailea bat jaisten da eta behean $e^x$ geratzen da. $n$ urratsen ondoren $\\frac{n!}{e^x}$ geratzen da, eta 0 baliora jotzen du. Horregatik ezin du inongo berreturak esponentzialaren kontra.',
                '¿Por qué funciona? Cada vez que se aplica L\'Hôpital a $\\frac{x^n}{e^x}$, el exponente de arriba baja uno y abajo sigue $e^x$. Tras $n$ pasos queda $\\frac{n!}{e^x}$, que tiende a 0. Por eso ninguna potencia puede con la exponencial.',
                'لماذا تصح؟ كلما طبقنا لوبيتال على $\\frac{x^n}{e^x}$ نقص الأس في البسط واحدًا وبقيت $e^x$ في المقام. وبعد $n$ خطوة تبقى $\\frac{n!}{e^x}$ التي تؤول إلى 0. لذلك لا تغلب أي قوة الدالة الأسية.',
                'Why does it work? Each time L\'Hôpital is applied to $\\frac{x^n}{e^x}$, the exponent on top drops by one and $e^x$ stays below. After $n$ steps you get $\\frac{n!}{e^x}$, which tends to 0. That is why no power can beat the exponential.'
            )
        },
        examplePrompt: say('Aurkitu $g(x)=x\\,e^{2x}$ funtzioaren muturrak.', 'Halla los extremos de $g(x)=x\\,e^{2x}$.', 'أوجد القيم القصوى للدالة $g(x)=x\\,e^{2x}$.', 'Find the extrema of $g(x)=x\\,e^{2x}$.'),
        example: same('$g\'(x)=e^{2x}(1+2x)=0\\ \\to\\ x=-\\frac{1}{2}$'),
        exampleAnswer: say('Minimo bat $x=-\\frac{1}{2}$ puntuan; ezkerretik, $y=0$ asintota.', 'Un mínimo en $x=-\\frac{1}{2}$; por la izquierda, asíntota $y=0$.', 'قيمة صغرى عند $x=-\\frac{1}{2}$؛ ومن اليسار المقارب $y=0$.', 'A minimum at $x=-\\frac{1}{2}$; on the left, the asymptote $y=0$.')
    },
    'exp-special': {
        definitions: [
            { term: say('Gaussen kanpaia', 'Campana de Gauss', 'منحنى غاوس الجرسي', 'Gaussian bell'), meaning: say('$e^{-x^2}$ funtzioaren eta haren aldaeren grafikoa: simetrikoa, maximo batekin eta bi inflexiorekin.', 'La gráfica de $e^{-x^2}$ y de sus variantes: simétrica, con un máximo y dos inflexiones.', 'رسم $e^{-x^2}$ وأشباهها: متناظر، بقيمة عظمى وانعطافين.', 'The graph of $e^{-x^2}$ and its variants: symmetric, with one maximum and two inflections.') }
        ],
        vocabulary: [
            say('bikoitia', 'par', 'زوجية', 'even'),
            say('positiboa', 'positiva', 'موجبة', 'positive'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        explanation: say(
            '$f(x)=e^{g(x)}$ bada, ez da inoiz zero edo negatiboa, eta ez du $X$ ardatza ebakitzen: beti da positiboa. Haren asintotak berretzailearen, $g$ funtzioaren, limiteetatik ateratzen dira: $g\\to-\\infty$ bada, $f\\to 0$; $g\\to+\\infty$ bada, $f\\to+\\infty$. Deribatzean, $f\'=g\'e^{g}$ deribatuak $g\'$ deribatuaren zeinua du. Kanpaia bikoitia da.',
            'Si $f(x)=e^{g(x)}$, nunca se anula ni es negativa, así que no corta el eje $X$: es siempre positiva. Sus asíntotas salen de los límites del exponente $g$: si $g\\to-\\infty$, $f\\to 0$; si $g\\to+\\infty$, $f\\to+\\infty$. Al derivar, $f\'=g\'e^{g}$ tiene el signo de $g\'$. La campana es par.',
            'إذا كانت $f(x)=e^{g(x)}$ فإنها لا تنعدم ولا تكون سالبة، فلا تقطع المحور $X$: إنها موجبة دائمًا. وتخرج مقارباتها من نهايات الأس $g$: إذا كان $g\\to-\\infty$ فإن $f\\to 0$، وإذا كان $g\\to+\\infty$ فإن $f\\to+\\infty$. وعند الاشتقاق تكون إشارة $f\'=g\'e^{g}$ هي إشارة $g\'$. والجرس دالة زوجية.',
            'If $f(x)=e^{g(x)}$, it is never 0 or negative, so it does not cut the $X$ axis: it is always positive. Its asymptotes come from the limits of the exponent $g$: if $g\\to-\\infty$, $f\\to 0$; if $g\\to+\\infty$, $f\\to+\\infty$. On differentiating, $f\'=g\'e^{g}$ has the sign of $g\'$. The bell is even.'
        ),
        examplePrompt: say('Zer asintota ditu $h(x)=e^{1/x}$ funtzioak?', '¿Qué asíntotas tiene $h(x)=e^{1/x}$?', 'ما مقاربات $h(x)=e^{1/x}$؟', 'What asymptotes does $h(x)=e^{1/x}$ have?'),
        example: same('$\\begin{gathered}\\lim_{x\\to\\pm\\infty}e^{1/x}=1\\\\ \\lim_{x\\to 0^+}e^{1/x}=+\\infty\\qquad\\lim_{x\\to 0^-}e^{1/x}=0\\end{gathered}$'),
        exampleAnswer: say('Horizontala $y=1$, eta bertikala $x=0$ eskuinetik bakarrik: ezkerretik kurba $(0,\\,0)$ puntura hurbiltzen da.', 'Horizontal $y=1$, y vertical $x=0$ solo por la derecha: por la izquierda la curva se acerca a $(0,\\,0)$.', 'أفقي $y=1$، ورأسي $x=0$ من اليمين فقط: ومن اليسار يقترب المنحنى من $(0,\\,0)$.', 'Horizontal $y=1$, and vertical $x=0$ only on the right: on the left the curve approaches $(0,\\,0)$.')
    },
    'log-functions': {
        definitions: [
            { term: say('Logaritmo nepertarra', 'Logaritmo neperiano', 'اللوغاريتم الطبيعي', 'Natural logarithm'), meaning: say('$\\ln x$: $x$ lortzeko $e$ zein berretzailetara berretu behar den; $x>0$ bada bakarrik dago.', '$\\ln x$, el exponente al que hay que elevar $e$ para obtener $x$; solo existe si $x>0$.', '$\\ln x$: الأس الذي نرفع إليه $e$ لنحصل على $x$؛ ولا يوجد إلا إذا كان $x>0$.', '$\\ln x$, the exponent to which $e$ must be raised to get $x$; it only exists if $x>0$.') }
        ],
        vocabulary: [
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm'),
            say('poliki', 'despacio', 'ببطء', 'slowly'),
            say('asintota bertikala', 'asíntota vertical', 'المقارب الرأسي', 'vertical asymptote')
        ],
        explanation: say(
            'Logaritmoa zenbaki positiboetarako bakarrik dago; beraz, lehenik $g(x)>0$ ebazten da. Barrukoa 0 baliora hurbiltzen denean, logaritmoa $-\\infty$ aldera erortzen da, eta han asintota bertikala dago. Infinituan, logaritmoa poliki hazten da eta berreturen aurka galtzen du: L\'Hôpitalek berresten du.',
            'El logaritmo solo existe para números positivos, así que primero se resuelve $g(x)>0$. Cuando lo de dentro se acerca a 0, el logaritmo cae a $-\\infty$, y allí hay una asíntota vertical. En el infinito, el logaritmo crece despacio y pierde contra las potencias: L\'Hôpital lo confirma.',
            'لا يوجد اللوغاريتم إلا للأعداد الموجبة، لذا نحل أولًا $g(x)>0$. وعندما يقترب ما بالداخل من 0 يسقط اللوغاريتم إلى $-\\infty$، وهناك مقارب رأسي. وفي اللانهاية يكبر اللوغاريتم ببطء ويخسر أمام القوى: ويؤكد ذلك لوبيتال.',
            'The logarithm only exists for positive numbers, so first solve $g(x)>0$. When the inside approaches 0, the logarithm falls to $-\\infty$, and there is a vertical asymptote there. At infinity, the logarithm grows slowly and loses against powers: L\'Hôpital confirms it.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\ln(x^2-4)$ funtzioaren izate-eremua eta asintotak.', 'Halla el dominio y las asíntotas de $g(x)=\\ln(x^2-4)$.', 'أوجد مجال $g(x)=\\ln(x^2-4)$ ومقارباتها.', 'Find the domain and the asymptotes of $g(x)=\\ln(x^2-4)$.'),
        example: same('$\\begin{gathered}x^2-4>0\\ \\to\\ |x|>2\\\\ \\lim_{x\\to 2^+}\\ln(x^2-4)=-\\infty\\end{gathered}$'),
        exampleAnswer: say('Izate-eremua $|x|>2$ da; asintota bertikalak $x=\\pm 2$; eta adarrak mugarik gabe hazten dira.', 'Dominio $|x|>2$, asíntotas verticales $x=\\pm 2$ y ramas que crecen sin fin.', 'المجال $|x|>2$، والمقاربان الرأسيان $x=\\pm 2$، وفروع تكبر بلا حد.', 'Domain $|x|>2$, vertical asymptotes $x=\\pm 2$ and branches that grow without end.')
    },

    /* ---------- 4. Roots, trigonometric and piecewise ---------- */
    'root-functions': {
        definitions: [
            { term: say('x-ren balio absolutua', 'Valor absoluto de x', 'القيمة المطلقة لـ x', 'Absolute value of x'), meaning: say('$\\sqrt{x^2}=|x|$: $x$ da $x\\ge 0$ bada, eta $-x$ $x<0$ bada.', '$\\sqrt{x^2}=|x|$: vale $x$ si $x\\ge 0$ y $-x$ si $x<0$.', '$\\sqrt{x^2}=|x|$: تساوي $x$ إذا كان $x\\ge 0$ و$-x$ إذا كان $x<0$.', '$\\sqrt{x^2}=|x|$: it is $x$ if $x\\ge 0$ and $-x$ if $x<0$.') }
        ],
        vocabulary: [
            say('konjokatua', 'conjugado', 'المرافق', 'conjugate'),
            say('zeiharra', 'oblicua', 'مائل', 'oblique'),
            say('konstante', 'constante', 'ثابت', 'constant')
        ],
        explanation: say(
            '2. graduko polinomio baten erro karratua infinituan $|x|$ bider konstante bat bezala portatzen da. Horregatik, eskuineko eta ezkerreko zeiharra ez dira berdinak: maldaren zeinua aldatzen da. $n$ gaia konjokatuarekin ateratzen da, 1. mailako limiteetan bezala.',
            'Una raíz cuadrada de un polinomio de grado 2 se comporta en el infinito como $|x|$ por una constante. Por eso la oblicua por la derecha y por la izquierda no es la misma: cambia el signo de la pendiente. El término $n$ sale con el conjugado, como en los límites de 1.º.',
            'الجذر التربيعي لحدودية من الدرجة الثانية يسلك في اللانهاية سلوك $|x|$ مضروبًا في ثابت. لذلك لا يكون المقارب المائل من اليمين ومن اليسار نفسه: تتغير إشارة الميل. ونحصل على الحد $n$ بالمرافق، كما في نهايات السنة الأولى.',
            'The square root of a polynomial of degree 2 behaves at infinity like $|x|$ times a constant. That is why the oblique asymptote on the right and on the left is not the same: the sign of the slope changes. The term $n$ comes out with the conjugate, as in the limits of 1st year.'
        ),
        why: {
            text: say(
                'Zergatik funtzionatzen du? $x$ handia denean, $\\sqrt{x^2-4}=|x|\\sqrt{1-\\frac{4}{x^2}}$ da, eta eskuineko erroak 1 baliora jotzen du. Beraz, $\\frac{f(x)}{x}$ zatidurak $\\frac{|x|}{x}$ baliora jotzen du: 1 eskuinetik eta $-1$ ezkerretik.',
                '¿Por qué funciona? Para $x$ grande, $\\sqrt{x^2-4}=|x|\\sqrt{1-\\frac{4}{x^2}}$, y la raíz de la derecha tiende a 1. Así $\\frac{f(x)}{x}$ tiende a $\\frac{|x|}{x}$, que vale 1 por la derecha y $-1$ por la izquierda.',
                'لماذا تصح؟ عندما يكون $x$ كبيرًا يكون $\\sqrt{x^2-4}=|x|\\sqrt{1-\\frac{4}{x^2}}$، ويؤول الجذر الأيمن إلى 1. فتؤول $\\frac{f(x)}{x}$ إلى $\\frac{|x|}{x}$ التي تساوي 1 من اليمين و$-1$ من اليسار.',
                'Why does it work? For large $x$, $\\sqrt{x^2-4}=|x|\\sqrt{1-\\frac{4}{x^2}}$, and the root on the right tends to 1. So $\\frac{f(x)}{x}$ tends to $\\frac{|x|}{x}$, which is 1 on the right and $-1$ on the left.'
            )
        },
        examplePrompt: say('Aurkitu $g(x)=\\sqrt{x^2+6x}$ funtzioaren zeiharra $x\\to+\\infty$ doanean.', 'Halla la oblicua de $g(x)=\\sqrt{x^2+6x}$ cuando $x\\to+\\infty$.', 'أوجد المقارب المائل للدالة $g(x)=\\sqrt{x^2+6x}$ عندما $x\\to+\\infty$.', 'Find the oblique asymptote of $g(x)=\\sqrt{x^2+6x}$ as $x\\to+\\infty$.'),
        example: same('$\\begin{gathered}m=\\lim_{x\\to+\\infty}\\frac{\\sqrt{x^2+6x}}{x}=1\\\\ n=\\lim_{x\\to+\\infty}\\frac{6x}{\\sqrt{x^2+6x}+x}=3\\end{gathered}$'),
        exampleAnswer: say('Eskuinetik, zeiharra $y=x+3$ da.', 'Por la derecha, la oblicua es $y=x+3$.', 'من اليمين، المقارب المائل $y=x+3$.', 'On the right, the oblique asymptote is $y=x+3$.')
    },
    'trig-functions': {
        definitions: [
            { term: say('Anplitudea', 'Amplitud', 'السعة', 'Amplitude'), meaning: say('Uhin baten maximoaren eta minimoaren arteko distantziaren erdia.', 'La mitad de la distancia entre el máximo y el mínimo de una onda.', 'نصف المسافة بين القيمة العظمى والصغرى لموجة.', 'Half the distance between the maximum and the minimum of a wave.') }
        ],
        vocabulary: [
            say('uhin', 'onda', 'الموجة', 'wave'),
            say('errepikatzen da', 'se repite', 'يتكرر', 'repeats'),
            say('periodoa', 'periodo', 'الدور', 'period')
        ],
        explanation: say(
            'Sinua eta kosinua dituzten funtzioak periodikoak dira: periodo batean gertatzen dena errepikatzen da. Horregatik periodo bakar bat aztertzen da, normalean $[0,\\,2\\pi]$, gidoi berarekin: ebaki-puntuak, $f\'$ eta $f\'\'$. Amaieran marrazkia ezkerrera eta eskuinera kopiatzen da, uhin bat bezala.',
            'Las funciones con seno y coseno son periódicas: lo que pasa en un periodo se repite. Por eso se estudia un solo periodo, normalmente $[0,\\,2\\pi]$, con el mismo guion: cortes, $f\'$ y $f\'\'$. Al final se copia el dibujo a izquierda y derecha, como una onda.',
            'الدوال التي فيها الجيب وجيب التمام دورية: ما يحدث في دور يتكرر. لذلك ندرس دورًا واحدًا، عادة $[0,\\,2\\pi]$، بالخطة نفسها: نقاط التقاطع و$f\'$ و$f\'\'$. وفي النهاية ننسخ الرسم يسارًا ويمينًا مثل موجة.',
            'Functions with sine and cosine are periodic: what happens in one period repeats. That is why a single period is studied, usually $[0,\\,2\\pi]$, with the same plan: intercepts, $f\'$ and $f\'\'$. At the end the drawing is copied to the left and right, like a wave.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\sin 2x$ funtzioaren muturrak $[0,\\,\\pi]$ tartean.', 'Halla los extremos de $g(x)=\\sin 2x$ en $[0,\\,\\pi]$.', 'أوجد القيم القصوى للدالة $g(x)=\\sin 2x$ على $[0,\\,\\pi]$.', 'Find the extrema of $g(x)=\\sin 2x$ on $[0,\\,\\pi]$.'),
        example: same('$g\'(x)=2\\cos 2x=0\\ \\to\\ x=\\frac{\\pi}{4},\\ x=\\frac{3\\pi}{4}$'),
        exampleAnswer: say('Maximoa $\\left(\\frac{\\pi}{4},\\,1\\right)$ puntuan eta minimoa $\\left(\\frac{3\\pi}{4},\\,-1\\right)$ puntuan; periodoa $\\pi$ da.', 'Máximo en $\\left(\\frac{\\pi}{4},\\,1\\right)$ y mínimo en $\\left(\\frac{3\\pi}{4},\\,-1\\right)$; el periodo es $\\pi$.', 'قيمة عظمى عند $\\left(\\frac{\\pi}{4},\\,1\\right)$ وصغرى عند $\\left(\\frac{3\\pi}{4},\\,-1\\right)$؛ والدور $\\pi$.', 'A maximum at $\\left(\\frac{\\pi}{4},\\,1\\right)$ and a minimum at $\\left(\\frac{3\\pi}{4},\\,-1\\right)$; the period is $\\pi$.')
    },
    'piecewise-graphs': {
        definitions: [
            { term: say('Lotunea', 'Unión', 'نقطة الالتقاء', 'Joint'), meaning: say('Zati bat amaitu eta beste bat hasten den puntua.', 'El punto donde acaba un trozo y empieza otro.', 'النقطة التي ينتهي فيها جزء ويبدأ آخر.', 'The point where one piece ends and another begins.') }
        ],
        vocabulary: [
            say('jauzi', 'salto', 'القفزة', 'jump'),
            say('punta', 'pico', 'الزاوية', 'corner'),
            say('tartea', 'intervalo', 'الفترة', 'interval')
        ],
        explanation: say(
            'Zati bakoitza funtzio ezagun bat da, baina bere tartean bakarrik balio du: dagokion zatia marrazten da, eta ez gehiago. Garrantzitsuena lotuneetan dago: altuerak bat ez badatoz, jauzi bat dago; bat badatoz baina maldak ez, punta bat; biak bat badatoz, kurba leun igarotzen da.',
            'Cada trozo es una función conocida, pero solo vale en su intervalo: se dibuja la parte que toca y nada más. Lo importante está en las uniones: si las alturas no coinciden hay un salto; si coinciden pero las pendientes no, un pico; si coinciden las dos cosas, la curva pasa suave.',
            'كل جزء دالة معروفة، لكنه لا يصح إلا على فترته: نرسم الجزء المطلوب فقط. والمهم عند نقاط الالتقاء: إذا لم يتطابق الارتفاعان فهناك قفزة، وإذا تطابقا دون الميلين فهناك زاوية، وإذا تطابق الأمران مر المنحنى أملس.',
            'Each piece is a known function, but it only counts on its interval: draw the part that belongs and nothing more. What matters is at the joints: if the heights do not match there is a jump; if they match but the slopes do not, a corner; if both match, the curve passes smoothly.'
        ),
        examplePrompt: say('Zer gertatzen da $x=1$ puntuan $g(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}$ funtzioan?', '¿Qué pasa en $x=1$ con $g(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}$?', 'ماذا يحدث عند $x=1$ مع $g(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}$؟', 'What happens at $x=1$ with $g(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}$?'),
        example: same('$\\begin{gathered}g(1^-)=1\\qquad g(1^+)=2-1=1\\\\ g\'(1^-)=2\\qquad g\'(1^+)=2\\end{gathered}$'),
        exampleAnswer: say('Altuerak eta maldak bat datoz: lotunea leuna da, eta $g$ deribagarria da 1 puntuan.', 'Las alturas y las pendientes coinciden: la unión es suave y $g$ es derivable en 1.', 'يتطابق الارتفاعان والميلان: الالتقاء أملس و$g$ قابلة للاشتقاق عند 1.', 'The heights and the slopes match: the joint is smooth and $g$ is differentiable at 1.')
    },

    /* ---------- 5. Absolute values and graphs the other way round ---------- */
    'absolute-graphs': {
        definitions: [
            { term: say('Isla', 'Reflejo', 'الانعكاس', 'Reflection'), meaning: say('Grafikoaren zati baten zeinua aldatzea: ardatzaren azpian dagoena gainera pasatzen da.', 'Cambiar el signo de una parte de la gráfica: lo de debajo del eje pasa encima.', 'تغيير إشارة جزء من الرسم: ما تحت المحور ينتقل فوقه.', 'Changing the sign of part of the graph: what is below the axis goes above.') }
        ],
        vocabulary: [
            say('bikoitia', 'par', 'زوجية', 'even'),
            say('islatzen da', 'se refleja', 'ينعكس', 'is reflected'),
            say('punta', 'pico', 'الزاوية', 'corner')
        ],
        explanation: say(
            'Biak antzekoak dira, baina gauza desberdinak egiten dituzte. $|f(x)|$ funtzioan balio absolutuak altueran jarduten du: ez da ezer geratzen $X$ ardatzaren azpian, eta azpiko zatia gora islatzen da. $f(|x|)$ funtzioan $x$ aldagaian jarduten du: ezkerra eskuinaren kopia da, eta grafikoa bikoitia da.',
            'Las dos se parecen pero hacen cosas distintas. En $|f(x)|$ el valor absoluto actúa sobre la altura: nada queda bajo el eje $X$, y la parte de abajo se refleja hacia arriba. En $f(|x|)$ actúa sobre la $x$: la izquierda es copia de la derecha, y la función es par.',
            'تتشابهان لكنهما تفعلان أشياء مختلفة. في $|f(x)|$ تؤثر القيمة المطلقة في الارتفاع: لا يبقى شيء تحت المحور $X$، والجزء السفلي ينعكس إلى الأعلى. وفي $f(|x|)$ تؤثر في $x$: اليسار نسخة من اليمين، والدالة زوجية.',
            'The two look alike but do different things. In $|f(x)|$ the absolute value acts on the height: nothing stays below the $X$ axis, and the lower part is reflected upwards. In $f(|x|)$ it acts on the $x$: the left is a copy of the right, and the function is even.'
        ),
        cases: [
            { title: same('$|f(x)|$'), text: say('Ardatzaren azpikoa gora islatzen da; zeroetan puntak agertzen dira.', 'Lo de debajo del eje se refleja hacia arriba; en los ceros aparecen picos.', 'ما تحت المحور ينعكس إلى الأعلى؛ وتظهر زوايا عند الأصفار.', 'What is below the axis is reflected upwards; corners appear at the zeros.'), math: same('$|f(x)|=\\begin{cases}f(x) & f(x)\\ge 0\\\\ -f(x) & f(x)<0\\end{cases}$') },
            { title: same('$f(|x|)$'), text: say('Eskuineko zatia ezkerrera kopiatzen da; funtzioa bikoitia da.', 'La parte de la derecha se copia a la izquierda; la función es par.', 'يُنسخ الجزء الأيمن إلى اليسار؛ والدالة زوجية.', 'The right-hand part is copied to the left; the function is even.'), math: same('$f(|x|)=\\begin{cases}f(x) & x\\ge 0\\\\ f(-x) & x<0\\end{cases}$') }
        ],
        examplePrompt: say('Zein puntutan ez da deribagarria $g(x)=|x^2-9|$?', '¿En qué puntos no es derivable $g(x)=|x^2-9|$?', 'في أي النقاط لا تكون $g(x)=|x^2-9|$ قابلة للاشتقاق؟', 'At which points is $g(x)=|x^2-9|$ not differentiable?'),
        example: same('$x^2-9=0\\ \\to\\ x=\\pm 3$'),
        exampleAnswer: say('$x=-3$ eta $x=3$ puntuetan: han barrukoak zeinua aldatzen du, eta bi punta agertzen dira.', 'En $x=-3$ y $x=3$: allí lo de dentro cambia de signo y aparecen dos picos.', 'عند $x=-3$ و$x=3$: هناك تتغير إشارة ما بالداخل وتظهر زاويتان.', 'At $x=-3$ and $x=3$: there the inside changes sign and two corners appear.')
    },
    'derivative-graph': {
        definitions: [
            { term: say('Deribatuaren grafikoa', 'Gráfica de la derivada', 'رسم المشتقة', 'Graph of the derivative'), meaning: say('$y=f\'(x)$ kurba: haren altuera $f$ funtzioaren malda da puntu bakoitzean.', 'La curva $y=f\'(x)$: su altura es la pendiente de $f$ en cada punto.', 'المنحنى $y=f\'(x)$: ارتفاعه هو ميل $f$ عند كل نقطة.', 'The curve $y=f\'(x)$: its height is the slope of $f$ at each point.') }
        ],
        vocabulary: [
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('ardatza', 'eje', 'المحور', 'axis'),
            say('erpina', 'vértice', 'الرأس', 'vertex')
        ],
        explanation: say(
            'Kontuz: grafikoa $f\'$ deribatuarena da, ez $f$ funtzioarena. Haren altuera $f$ funtzioaren malda da. Horregatik, $f\'$ grafikoak ardatza ebakitzen duen puntuetan $f$ funtzioak zuzen ukitzaile horizontala du, eta $f\'$ grafikoaren muturretan $f$ funtzioak kurbadura aldatzen du.',
            'Cuidado: la gráfica es la de $f\'$, no la de $f$. Su altura es la pendiente de $f$. Por eso los cortes de $f\'$ con el eje son los puntos con tangente horizontal de $f$, y los extremos de $f\'$ son los puntos donde $f$ cambia de curvatura.',
            'انتبه: الرسم رسم $f\'$ لا رسم $f$. وارتفاعه هو ميل $f$. لذلك تكون نقاط تقاطع $f\'$ مع المحور نقاط المماس الأفقي لـ $f$، وتكون القيم القصوى لـ $f\'$ النقاط التي يتغير فيها تقعّر $f$.',
            'Careful: the graph is that of $f\'$, not that of $f$. Its height is the slope of $f$. That is why the points where $f\'$ meets the axis are the points of $f$ with a horizontal tangent, and the extrema of $f\'$ are the points where $f$ changes concavity.'
        ),
        why: {
            text: say(
                'Zergatik funtzionatzen du? $f\'(a)$ da $f$ funtzioaren malda $a$ puntuan. Tarte batean $f\'>0$ bada, zuzen ukitzaile guztiak igotzen dira eta $f$ gorakorra da. Eta $f\'\'$ da $f\'$ deribatuaren malda: $f\'$ deribatuak mutur bat duen tokian, $f\'\'$ deribatuak zeinua aldatzen du, eta hori $f$ funtzioaren inflexio bat da.',
                '¿Por qué funciona? $f\'(a)$ es la pendiente de $f$ en $a$. Si $f\'>0$ en un intervalo, todas las tangentes suben y $f$ crece. Y $f\'\'$ es la pendiente de $f\'$: donde $f\'$ tiene un extremo, $f\'\'$ cambia de signo, y eso es una inflexión de $f$.',
                'لماذا تصح؟ $f\'(a)$ هو ميل $f$ عند $a$. فإذا كان $f\'>0$ على فترة صعدت كل المماسات وتزايدت $f$. و$f\'\'$ هو ميل $f\'$: حيث يكون لـ $f\'$ قيمة قصوى تغيّر $f\'\'$ إشارتها، وهذا انعطاف لـ $f$.',
                'Why does it work? $f\'(a)$ is the slope of $f$ at $a$. If $f\'>0$ on an interval, every tangent goes up and $f$ increases. And $f\'\'$ is the slope of $f\'$: where $f\'$ has an extremum, $f\'\'$ changes sign, and that is an inflection of $f$.'
            )
        },
        examplePrompt: say('$g\'$ grafikoa $y=2-x$ zuzena da. Non du $g$ funtzioak mutur bat?', 'La gráfica de $g\'$ es la recta $y=2-x$. ¿Dónde tiene $g$ un extremo?', 'رسم $g\'$ هو المستقيم $y=2-x$. أين تكون لـ $g$ قيمة قصوى؟', 'The graph of $g\'$ is the line $y=2-x$. Where does $g$ have an extremum?'),
        example: same('$2-x=0\\ \\to\\ x=2$'),
        exampleAnswer: say('$x=2$ puntuan $g\'$ positibotik negatibora pasatzen da: $g$ funtzioak maximo bat du.', 'En $x=2$, $g\'$ pasa de positiva a negativa: $g$ tiene un máximo.', 'عند $x=2$ تنتقل $g\'$ من الموجب إلى السالب: لـ $g$ قيمة عظمى.', 'At $x=2$, $g\'$ goes from positive to negative: $g$ has a maximum.')
    },
    'curve-from-data': {
        definitions: [
            { term: say('Zirriborroa', 'Esbozo', 'المخطط', 'Sketch'), meaning: say('Datuak errespetatzen dituen gutxi gorabeherako marrazkia: asintotak, puntuak, hazkundea eta kurbadura.', 'Un dibujo aproximado que respeta los datos: asíntotas, puntos, crecimiento y curvatura.', 'رسم تقريبي يحترم المعطيات: المقاربات والنقاط والتزايد والتقعّر.', 'An approximate drawing that respects the data: asymptotes, points, increase and concavity.') }
        ],
        vocabulary: [
            say('datua', 'dato', 'المعطى', 'fact'),
            say('marka', 'marca', 'العلامة', 'mark'),
            say('gezia', 'flecha', 'السهم', 'arrow')
        ],
        explanation: say(
            'Batzuetan ez dago formularik: datuak daude. Limite bakoitza asintota bat bihurtzen da, eta kurba hurbiltzen den aldea; balio bakoitza, puntu bat; $f\'$ deribatuaren zeinua, igotzen edo jaisten diren geziak; eta $f\'\'$ deribatuarena, kurbadura. Datu bakoitza marka bat da, eta kurba askok betetzen dituzte datuak: nahikoa da bat.',
            'A veces no hay fórmula: hay datos. Cada límite se traduce en una asíntota y en el lado por el que se acerca la curva; cada valor, en un punto; el signo de $f\'$, en una flecha que sube o baja, y el de $f\'\'$, en la curvatura. Cada dato es una marca, y muchas curvas los cumplen: basta una.',
            'أحيانًا لا توجد صيغة بل معطيات. كل نهاية تصير مقاربًا وجهة يقترب منها المنحنى، وكل قيمة نقطة، وإشارة $f\'$ سهمًا يصعد أو ينزل، وإشارة $f\'\'$ تقعّرًا. وكل معطى علامة، وتحققها منحنيات كثيرة: يكفي واحد.',
            'Sometimes there is no formula: there are data. Each limit becomes an asymptote and the side the curve comes in from; each value, a point; the sign of $f\'$, an arrow going up or down, and that of $f\'\'$, the concavity. Each fact is a mark, and many curves meet them: one is enough.'
        ),
        examplePrompt: say('Deskribatu datuekin $g(x)=\\frac{1}{x^2}$ funtzioaren kurba.', 'Describe con datos la curva de $g(x)=\\frac{1}{x^2}$.', 'صِف بالمعطيات منحنى $g(x)=\\frac{1}{x^2}$.', 'Describe the curve of $g(x)=\\frac{1}{x^2}$ with data.'),
        example: same('$\\begin{gathered}\\lim_{x\\to 0}g(x)=+\\infty\\qquad\\lim_{x\\to\\pm\\infty}g(x)=0\\\\ g(-x)=g(x)\\end{gathered}$'),
        exampleAnswer: say('$x=0$ eta $y=0$ asintotak; bikoitia eta positiboa; gorakorra $x<0$ denean eta beherakorra $x>0$ denean.', 'Asíntotas $x=0$ e $y=0$, par, positiva; crece si $x<0$ y decrece si $x>0$.', 'المقاربان $x=0$ و$y=0$، زوجية وموجبة؛ تتزايد إذا كان $x<0$ وتتناقص إذا كان $x>0$.', 'Asymptotes $x=0$ and $y=0$, even, positive; it increases if $x<0$ and decreases if $x>0$.')
    }
}
