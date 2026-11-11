import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { Bach2DerivativesTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Zientziak — what each lesson tells: the
   new words (definitions), a short explanation, the example as an
   exercise («Another example»), the key words in four languages, cases in
   two lessons and, in five, «Why does it work?». Plain data so the tests
   can import it; lessons.tsx merges it into the topics and gives \sin,
   \tan and the arcs each language's names. The example uses numbers of
   its own, never those of «Let's solve», of «Check it» or of the typical
   mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const bach2DerivativesLessonTexts: Record<Bach2DerivativesTopicId, LessonTexts> = {
    /* ---------- 1. Review of 1.º ---------- */
    'review-tangent': {
        definitions: [
            { term: say('Zuzen normala', 'Recta normal', 'المستقيم العمودي', 'Normal line'), meaning: say('Zuzen ukitzailearekiko perpendikularra den zuzena, ukitze-puntuan.', 'La recta perpendicular a la tangente en el punto de tangencia.', 'المستقيم المتعامد مع المماس في نقطة التماس.', 'The line perpendicular to the tangent at the point of tangency.') }
        ],
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('ukitze-puntua', 'punto de tangencia', 'نقطة التماس', 'point of tangency'),
            say('perpendikularra', 'perpendicular', 'متعامد', 'perpendicular')
        ],
        explanation: say(
            'Deribatua, $f\'(a)$, T.V.M.-aren limitea da tartea txikitzen denean, eta zuzen ukitzailearen malda neurtzen du $(a,f(a))$ puntuan. Puntu horrekin eta malda horrekin idazten da zuzen ukitzailea. Normala puntu beretik igarotzen da eta perpendikularra da: haren malda alderantzizkoa da, zeinua aldatuta.',
            'La derivada $f\'(a)$ es el límite de la T.V.M. cuando el intervalo se encoge, y mide la pendiente de la tangente en $(a,f(a))$. Con ese punto y esa pendiente se escribe la tangente. La normal pasa por el mismo punto y es perpendicular: su pendiente es la inversa cambiada de signo.',
            'المشتقة $f\'(a)$ هي نهاية معدل التغير المتوسط عندما تصغر الفترة، وتقيس ميل المماس عند $(a,f(a))$. وبهذه النقطة وهذا الميل نكتب المماس. أما العمودي فيمر بالنقطة نفسها ويتعامد معه: ميله مقلوب ميل المماس بإشارة معكوسة.',
            'The derivative $f\'(a)$ is the limit of the average rate as the interval shrinks, and it measures the slope of the tangent at $(a,f(a))$. With that point and that slope you write the tangent. The normal passes through the same point and is perpendicular: its slope is the reciprocal with the sign changed.'
        ),
        examplePrompt: say('Idatzi $f(x)=x^2+5x$ funtzioaren zuzen ukitzailea $x=-2$ puntuan.', 'Escribe la tangente a $f(x)=x^2+5x$ en $x=-2$.', 'اكتب مماس $f(x)=x^2+5x$ عند $x=-2$.', 'Write the tangent to $f(x)=x^2+5x$ at $x=-2$.'),
        example: same('$\\begin{gathered}f(-2)=4-10=-6\\\\ f\'(x)=2x+5\\\\ f\'(-2)=1\\\\ y+6=x+2\\ \\to\\ y=x-4\\end{gathered}$'),
        exampleAnswer: say('Zuzen ukitzailea $y=x-4$ da.', 'La tangente es $y=x-4$.', 'المماس هو $y=x-4$.', 'The tangent is $y=x-4$.')
    },
    'review-rules': {
        definitions: [
            { term: say('Funtzio konposatua', 'Función compuesta', 'الدالة المركبة', 'Composite function'), meaning: say('Funtzio bat beste baten barruan, $f(g(x))$: lehenik $g$ funtzioak jarduten du eta gero $f$ funtzioak.', 'Una función dentro de otra, $f(g(x))$: primero actúa $g$ y después $f$.', 'دالة داخل أخرى، $f(g(x))$: تعمل $g$ أولًا ثم $f$.', 'One function inside another, $f(g(x))$: first $g$ acts and then $f$.') }
        ],
        vocabulary: [
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('faktore komuna', 'factor común', 'العامل المشترك', 'common factor')
        ],
        explanation: say(
            '2. mailako deribatuak 1. mailako erregelekin egiten dira. Lehenik funtzioaren forma begiratzen da: batura, biderkadura, zatidura edo konposatua. Biderkadura batean faktore bakoitza txandaka deribatzen da; zatidura batean zenbakitzailearen ordenak garrantzia du; konposatu batean kanpokoa deribatzen da eta barrukoaren deribatuaz biderkatzen da.',
            'Las derivadas de 2.º se hacen con las reglas de 1.º. Primero se mira la forma de la función: suma, producto, cociente o compuesta. En un producto se deriva cada factor por turnos; en un cociente importa el orden del numerador; en una compuesta se deriva la de fuera y se multiplica por la derivada de dentro.',
            'تُحسب مشتقات السنة الثانية بقواعد السنة الأولى. ننظر أولًا إلى شكل الدالة: مجموع أو جداء أو خارج قسمة أو دالة مركبة. في الجداء نشتق كل عامل بالتناوب، وفي خارج القسمة يهم ترتيب البسط، وفي المركبة نشتق الخارجية ونضرب في مشتقة الداخلية.',
            'Second-year derivatives are done with the first-year rules. First look at the shape of the function: sum, product, quotient or composite. In a product each factor is differentiated in turn; in a quotient the order of the numerator matters; in a composite you differentiate the outside and multiply by the derivative of the inside.'
        ),
        examplePrompt: say('Deribatu $g(x)=\\frac{x}{x^2+1}$.', 'Deriva $g(x)=\\frac{x}{x^2+1}$.', 'اشتق $g(x)=\\frac{x}{x^2+1}$.', 'Differentiate $g(x)=\\frac{x}{x^2+1}$.'),
        example: same('$\\begin{gathered}g\'(x)=\\frac{1\\cdot(x^2+1)-x\\cdot 2x}{(x^2+1)^2}\\\\ =\\frac{1-x^2}{(x^2+1)^2}\\end{gathered}$'),
        exampleAnswer: say('Zatidura bat da: $g\'(x)=\\frac{1-x^2}{(x^2+1)^2}$.', 'Es un cociente: $g\'(x)=\\frac{1-x^2}{(x^2+1)^2}$.', 'إنها خارج قسمة: $g\'(x)=\\frac{1-x^2}{(x^2+1)^2}$.', 'It is a quotient: $g\'(x)=\\frac{1-x^2}{(x^2+1)^2}$.')
    },

    /* ---------- 2. Differentiability ---------- */
    corners: {
        definitions: [
            { term: say('Punta', 'Pico', 'الزاوية', 'Corner'), meaning: say('Funtzioa jarraitua den baina alboko deribatuak desberdinak diren puntua: grafikoak bat-batean aldatzen du norabidea.', 'Un punto donde la función es continua pero las derivadas laterales son distintas: la gráfica cambia de dirección de golpe.', 'نقطة تكون فيها الدالة متصلة لكن المشتقتين الجانبيتين مختلفتان: يغيّر الرسم اتجاهه فجأة.', 'A point where the function is continuous but the one-sided derivatives differ: the graph changes direction suddenly.') }
        ],
        vocabulary: [
            say('jarraitua', 'continua', 'متصلة', 'continuous'),
            say('alboko deribatuak', 'derivadas laterales', 'المشتقتان الجانبيتان', 'one-sided derivatives'),
            say('lotunea', 'unión', 'نقطة الالتقاء', 'joint')
        ],
        explanation: say(
            'Puntu batean deribagarria den funtzio batek ezin du han jauzirik izan: deribagarria bada, jarraitua da. Baina jarraitua izatea ez da nahikoa. Zatien lotune batean, lehenik bi zatiek balio bera dutela egiaztatzen da, eta gero alboko deribatuak berdinak direla. Bietako bat betetzen ez bada, ez da deribagarria.',
            'Una función derivable en un punto no puede tener allí un salto: derivable implica continua. Pero ser continua no basta. En una unión de trozos se comprueba primero que los dos trozos valen lo mismo y después que las derivadas laterales coinciden. Si falla una de las dos cosas, no es derivable.',
            'الدالة القابلة للاشتقاق عند نقطة لا يمكن أن تقفز عندها: القابلية للاشتقاق تقتضي الاتصال. لكن الاتصال وحده لا يكفي. عند نقطة التقاء جزأين نتحقق أولًا من أن للجزأين القيمة نفسها، ثم من تساوي المشتقتين الجانبيتين. وإذا اختل أحد الأمرين فهي غير قابلة للاشتقاق.',
            'A function that is differentiable at a point cannot jump there: differentiable implies continuous. But being continuous is not enough. At the joint of two pieces, first check that both pieces have the same value and then that the one-sided derivatives are equal. If either fails, it is not differentiable.'
        ),
        examplePrompt: say('Deribagarria al da funtzio hau $x=0$ puntuan? $g(x)=\\begin{cases}x^2+x & x<0\\\\ \\sin x & x\\ge 0\\end{cases}$', '¿Es derivable en $x=0$ esta función? $g(x)=\\begin{cases}x^2+x & x<0\\\\ \\sin x & x\\ge 0\\end{cases}$', 'هل هذه الدالة قابلة للاشتقاق عند $x=0$؟ $g(x)=\\begin{cases}x^2+x & x<0\\\\ \\sin x & x\\ge 0\\end{cases}$', 'Is this function differentiable at $x=0$? $g(x)=\\begin{cases}x^2+x & x<0\\\\ \\sin x & x\\ge 0\\end{cases}$'),
        example: same('$\\begin{gathered}g(0^-)=0\\\\ g(0^+)=\\sin 0=0\\\\ g\'(0^-)=2\\cdot 0+1=1\\\\ g\'(0^+)=\\cos 0=1\\end{gathered}$'),
        exampleAnswer: say('Jarraitua da eta alboko deribatuak berdinak dira: $g$ deribagarria da 0 puntuan, eta $g\'(0)=1$.', 'Es continua y las derivadas laterales coinciden: $g$ es derivable en 0, con $g\'(0)=1$.', 'إنها متصلة والمشتقتان الجانبيتان متساويتان: $g$ قابلة للاشتقاق عند 0، و$g\'(0)=1$.', 'It is continuous and the one-sided derivatives are equal: $g$ is differentiable at 0, with $g\'(0)=1$.'),
        why: {
            text: say(
                'Zergatik dakar deribagarritasunak jarraitutasuna? Idatzi altueren kendura zatidura bider $h$ gisa. $f$ deribagarria bada, zatidura $f\'(a)$ baliora doa eta $h$ 0 baliora: biderkadura 0 baliora doa, beraz $f(a+h)\\to f(a)$.',
                '¿Por qué derivable implica continua? Escribe la diferencia de alturas como el cociente por $h$. Si $f$ es derivable, el cociente tiende a $f\'(a)$ y $h$ tiende a 0: el producto tiende a 0, así que $f(a+h)\\to f(a)$.',
                'لماذا تقتضي القابلية للاشتقاق الاتصال؟ اكتب فرق الارتفاعين على صورة خارج القسمة مضروبًا في $h$. إذا كانت $f$ قابلة للاشتقاق فإن خارج القسمة يؤول إلى $f\'(a)$ و$h$ يؤول إلى 0: فيؤول الجداء إلى 0، أي $f(a+h)\\to f(a)$.',
                'Why does differentiable imply continuous? Write the difference of heights as the quotient times $h$. If $f$ is differentiable, the quotient tends to $f\'(a)$ and $h$ tends to 0: the product tends to 0, so $f(a+h)\\to f(a)$.'
            ),
            math: same('$\\begin{gathered}f(a+h)-f(a)\\\\ =\\frac{f(a+h)-f(a)}{h}\\cdot h\\end{gathered}$')
        }
    },
    absolute: {
        definitions: [
            { term: say('Zatika definitutako funtzioa', 'Función a trozos', 'دالة معرّفة على أجزاء', 'Piecewise function'), meaning: say('Tarte desberdinetan formula desberdinak dituen funtzioa.', 'Una función dada por fórmulas distintas en intervalos distintos.', 'دالة تُعطى بصيغ مختلفة في فترات مختلفة.', 'A function given by different formulas on different intervals.') }
        ],
        vocabulary: [
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value'),
            say('zeinua aldatu', 'cambiar de signo', 'تغيير الإشارة', 'change sign'),
            say('simetria', 'simetría', 'التناظر', 'symmetry')
        ],
        explanation: say(
            '$|g(x)|$ deribatzeko, balio absolutua kentzen da: $g$ positiboa den tokian bere horretan uzten da, eta negatiboa den tokian zeinua aldatzen zaio. Zatika definitutako funtzio bat ateratzen da. $g$ zero den puntuetan maldak zeinua aldatzen du, eta normalean punta bat agertzen da; han $g\'=0$ ere bada, ez dago puntarik.',
            'Para derivar $|g(x)|$ se quita el valor absoluto: donde $g$ es positiva se deja igual y donde es negativa se cambia de signo. Sale una función a trozos. En los puntos donde $g$ se anula, la pendiente cambia de signo y suele aparecer un pico; si allí también $g\'=0$, no hay pico.',
            'لاشتقاق $|g(x)|$ نزيل القيمة المطلقة: حيث تكون $g$ موجبة نتركها كما هي، وحيث تكون سالبة نغيّر إشارتها. فنحصل على دالة معرّفة على أجزاء. وعند النقاط التي تنعدم فيها $g$ يغيّر الميل إشارته وتظهر عادةً زاوية؛ وإذا كان $g\'=0$ هناك أيضًا فلا زاوية.',
            'To differentiate $|g(x)|$, remove the absolute value: where $g$ is positive leave it as it is, and where it is negative change its sign. You get a piecewise function. At the points where $g$ is 0, the slope changes sign and a corner usually appears; if $g\'=0$ there too, there is no corner.'
        ),
        examplePrompt: say('Deribagarria al da $g(x)=x\\,|x|$ funtzioa $x=0$ puntuan?', '¿Es derivable $g(x)=x\\,|x|$ en $x=0$?', 'هل $g(x)=x\\,|x|$ قابلة للاشتقاق عند $x=0$؟', 'Is $g(x)=x\\,|x|$ differentiable at $x=0$?'),
        example: same('$\\begin{gathered}g(x)=\\begin{cases}-x^2 & x<0\\\\ x^2 & x\\ge 0\\end{cases}\\\\ g\'(0^-)=-2\\cdot 0=0\\\\ g\'(0^+)=2\\cdot 0=0\\end{gathered}$'),
        exampleAnswer: say('Bi maldak 0 dira: $g$ deribagarria da 0 puntuan, puntarik gabe.', 'Las dos pendientes son 0: $g$ es derivable en 0, sin pico.', 'الميلان يساويان 0: $g$ قابلة للاشتقاق عند 0 دون زاوية.', 'Both slopes are 0: $g$ is differentiable at 0, with no corner.')
    },
    parameters: {
        definitions: [
            { term: say('Parametroa', 'Parámetro', 'الوسيط', 'Parameter'), meaning: say('Ezagutzen ez dugun balio finko bat duen letra bat, $a$ edo $b$ bezala; problemaren baldintzekin aurkitzen da.', 'Una letra con un valor fijo que no conocemos, como $a$ o $b$; se halla con las condiciones del problema.', 'حرف له قيمة ثابتة لا نعرفها، مثل $a$ أو $b$، ونجده من شروط المسألة.', 'A letter with a fixed value we do not know, such as $a$ or $b$; it is found from the conditions of the problem.') }
        ],
        vocabulary: [
            say('sistema', 'sistema', 'النظام', 'system'),
            say('ekuazioa', 'ecuación', 'المعادلة', 'equation'),
            say('baldintza', 'condición', 'الشرط', 'condition')
        ],
        explanation: say(
            'Parametroak dituen zatika definitutako funtzio bat deribagarria izateko, lotune bakoitzean bi ekuazio idazten dira: bi zatiek balio bera dute, eta haien deribatuek ere bai. Sistema ebazten da. Soluziorik ez badu, parametroen balio batek ere ez du funtzioa deribagarri egiten.',
            'Para que una función a trozos con parámetros sea derivable, en cada unión se escriben dos ecuaciones: los dos trozos valen lo mismo y sus derivadas valen lo mismo. Se resuelve el sistema. Si no tiene solución, ningún valor de los parámetros hace la función derivable.',
            'لتكون دالة معرّفة على أجزاء فيها وسيطات قابلة للاشتقاق نكتب عند كل نقطة التقاء معادلتين: للجزأين القيمة نفسها، ولمشتقتيهما القيمة نفسها. ثم نحل النظام. وإذا لم يكن له حل فلا توجد قيم للوسيطات تجعل الدالة قابلة للاشتقاق.',
            'For a piecewise function with parameters to be differentiable, at each joint you write two equations: both pieces have the same value and their derivatives have the same value. Then solve the system. If it has no solution, no value of the parameters makes the function differentiable.'
        ),
        examplePrompt: say('Aurkitu $a$ eta $b$, $g(x)=\\begin{cases}ax^2+1 & x<2\\\\ bx-3 & x\\ge 2\\end{cases}$ funtzioa $x=2$ puntuan deribagarria izan dadin.', 'Halla $a$ y $b$ para que $g(x)=\\begin{cases}ax^2+1 & x<2\\\\ bx-3 & x\\ge 2\\end{cases}$ sea derivable en $x=2$.', 'أوجد $a$ و$b$ لتكون $g(x)=\\begin{cases}ax^2+1 & x<2\\\\ bx-3 & x\\ge 2\\end{cases}$ قابلة للاشتقاق عند $x=2$.', 'Find $a$ and $b$ so that $g(x)=\\begin{cases}ax^2+1 & x<2\\\\ bx-3 & x\\ge 2\\end{cases}$ is differentiable at $x=2$.'),
        example: same('$\\begin{gathered}4a+1=2b-3\\\\ 4a=b\\\\ a=1\\qquad b=4\\end{gathered}$'),
        exampleAnswer: say('$a=1$ eta $b=4$ direnean, bi zatiak $(2,5)$ puntuan elkartzen dira, malda berarekin: 4.', 'Con $a=1$ y $b=4$, los dos trozos se unen en $(2,5)$ con la misma pendiente, 4.', 'مع $a=1$ و$b=4$ يلتقي الجزآن عند $(2,5)$ بالميل نفسه 4.', 'With $a=1$ and $b=4$, the two pieces meet at $(2,5)$ with the same slope, 4.')
    },

    /* ---------- 3. The chain rule in depth ---------- */
    'three-layers': {
        definitions: [
            { term: say('Geruza', 'Capa', 'الطبقة', 'Layer'), meaning: say('Funtzio konposatu bat osatzen duten funtzioetako bakoitza, kanpotik barrura zenbatuta.', 'Cada una de las funciones que forman una compuesta, contadas de fuera adentro.', 'كل واحدة من الدوال التي تتكون منها دالة مركبة، تُعدّ من الخارج إلى الداخل.', 'Each of the functions that make up a composite, counted from outside in.') }
        ],
        vocabulary: [
            say('kanpotik barrura', 'de fuera adentro', 'من الخارج إلى الداخل', 'from outside in'),
            say('faktorea', 'factor', 'العامل', 'factor'),
            say('biderkatu', 'multiplicar', 'الضرب', 'multiply')
        ],
        explanation: say(
            '$\\sin^2(3x)$ bezalako funtzio batek hiru geruza ditu: karratura berretzea, sinua eta $3x$. Tipula bat zurituko balitz bezala deribatzen da: kanpoko geruza, barrukoa ukitu gabe, bider hurrengo geruzaren deribatua, eta horrela azkeneraino. Geruza bakoitzak faktore bat ematen du.',
            'Una función como $\\sin^2(3x)$ tiene tres capas: elevar al cuadrado, el seno y $3x$. Se deriva como si se pelara una cebolla: la capa de fuera, con todo lo de dentro sin tocar, por la derivada de la siguiente capa, y así hasta la última. Cada capa da un factor.',
            'للدالة $\\sin^2(3x)$ ثلاث طبقات: التربيع، والجيب، و$3x$. نشتقها كأننا نقشر بصلة: الطبقة الخارجية مع ترك ما بداخلها دون مساس، في مشتقة الطبقة التالية، وهكذا حتى الأخيرة. وكل طبقة تعطي عاملًا.',
            'A function such as $\\sin^2(3x)$ has three layers: squaring, the sine and $3x$. You differentiate it as if peeling an onion: the outer layer, with everything inside untouched, times the derivative of the next layer, and so on to the last. Each layer gives a factor.'
        ),
        examplePrompt: say('Deribatu $g(x)=e^{\\cos(2x)}$.', 'Deriva $g(x)=e^{\\cos(2x)}$.', 'اشتق $g(x)=e^{\\cos(2x)}$.', 'Differentiate $g(x)=e^{\\cos(2x)}$.'),
        example: same('$\\begin{gathered}g\'(x)=e^{\\cos(2x)}\\\\ \\cdot(-\\sin(2x))\\cdot 2\\\\ =-2\\sin(2x)\\,e^{\\cos(2x)}\\end{gathered}$'),
        exampleAnswer: say('Hiru faktore, geruza bakoitzeko bat: $g\'(x)=-2\\sin(2x)\\,e^{\\cos(2x)}$.', 'Tres factores, uno por capa: $g\'(x)=-2\\sin(2x)\\,e^{\\cos(2x)}$.', 'ثلاثة عوامل، عامل لكل طبقة: $g\'(x)=-2\\sin(2x)\\,e^{\\cos(2x)}$.', 'Three factors, one per layer: $g\'(x)=-2\\sin(2x)\\,e^{\\cos(2x)}$.'),
        why: {
            text: say(
                'Zergatik biderkatzen dira? Geruza bakoitzak aldaketaren abiadura biderkatzen du. $x$ pixka bat aurreratzen bada, $3x$ hiru aldiz gehiago aurreratzen da; sinua $\\cos(3x)$ aldiz aldatzen da $3x$ aldatzen den bakoitzeko, eta karratua $2\\sin(3x)$ aldiz, sinua aldatzen den bakoitzeko. Faktoreak kateatu egiten dira.',
                '¿Por qué se multiplican? Cada capa multiplica la rapidez del cambio. Si $x$ avanza un poco, $3x$ avanza el triple; el seno cambia $\\cos(3x)$ veces lo que cambia $3x$, y el cuadrado, $2\\sin(3x)$ veces lo que cambia el seno. Los factores se encadenan.',
                'لماذا تُضرب؟ كل طبقة تضاعف سرعة التغير. إذا تقدّم $x$ قليلًا تقدّم $3x$ ثلاثة أضعاف؛ ويتغير الجيب $\\cos(3x)$ مرة قدر تغير $3x$، والمربع $2\\sin(3x)$ مرة قدر تغير الجيب. فتتسلسل العوامل.',
                'Why do they multiply? Each layer multiplies the speed of change. If $x$ moves a little, $3x$ moves three times as much; the sine changes $\\cos(3x)$ times as much as $3x$, and the square $2\\sin(3x)$ times as much as the sine. The factors chain together.'
            )
        }
    },
    'composite-table': {
        definitions: [
            { term: say('Barrukoaren deribatua', 'Derivada de dentro', 'مشتقة الداخلية', 'Inner derivative'), meaning: say('Barruan dagoenaren deribatua, $u\'$, taulako errenkada bakoitza biderkatzen duena.', 'La derivada $u\'$ de lo que hay dentro, que multiplica a cada fila de la tabla.', 'المشتقة $u\'$ لما في الداخل، وهي تضرب كل سطر من الجدول.', 'The derivative $u\'$ of what is inside, which multiplies every row of the table.') }
        ],
        vocabulary: [
            say('taula', 'tabla', 'الجدول', 'table'),
            say('errenkada', 'fila', 'السطر', 'row'),
            say('erroa', 'raíz', 'الجذر', 'root')
        ],
        explanation: say(
            '1. mailako taulak funtzio konposatuekin ere balio du. Kanpoko funtzioa zein den begiratzen da, bere errenkada $u$ aldagaiarekin idazten da $x$ ordez, eta $u\'$ biderkatzen da. Horrela, $(\\ln u)\'=\\frac{u\'}{u}$ eta $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$. Arkuekin, $\\arcsin$ funtzioaren edo $\\arctan$ funtzioaren errenkada da.',
            'La tabla de 1.º sirve también con funciones compuestas. Se mira cuál es la función de fuera, se escribe su fila con $u$ en lugar de $x$ y se multiplica por $u\'$. Así, $(\\ln u)\'=\\frac{u\'}{u}$ y $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$. Con arcos, la fila es la de $\\arcsin$ o la de $\\arctan$.',
            'يصلح جدول السنة الأولى مع الدوال المركبة أيضًا. ننظر أيّ دالة هي الخارجية، ونكتب سطرها بالحرف $u$ مكان $x$، ونضرب في $u\'$. وهكذا $(\\ln u)\'=\\frac{u\'}{u}$ و$(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$. ومع دوال القوس يكون السطر سطر $\\arcsin$ أو $\\arctan$.',
            'The first-year table also works with composite functions. See which function is the outer one, write its row with $u$ instead of $x$ and multiply by $u\'$. So $(\\ln u)\'=\\frac{u\'}{u}$ and $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$. With arcs, the row is that of $\\arcsin$ or that of $\\arctan$.'
        ),
        cases: [
            { title: say('Berreturak eta erroak', 'Potencias y raíces', 'القوى والجذور', 'Powers and roots'), text: say('Berretzailea jaisten da eta bat kentzen zaio; gero, bider $u\'$.', 'El exponente baja y se le resta uno; después, por $u\'$.', 'ينزل الأس ويُطرح منه واحد، ثم نضرب في $u\'$.', 'The exponent comes down and loses one; then, times $u\'$.'), math: same('$(u^n)\'=n\\,u^{n-1}\\,u\'$') },
            { title: say('Esponentzialak eta logaritmoak', 'Exponenciales y logaritmos', 'الدوال الأسية واللوغاريتمات', 'Exponentials and logarithms'), text: say('Esponentziala errepikatu egiten da; logaritmoak $u$ behean jartzen du.', 'La exponencial se repite; el logaritmo pone $u$ abajo.', 'تتكرر الدالة الأسية، ويضع اللوغاريتم $u$ في المقام.', 'The exponential repeats itself; the logarithm puts $u$ underneath.'), math: same('$\\begin{gathered}(e^u)\'=e^u\\,u\'\\\\ (\\ln u)\'=\\frac{u\'}{u}\\end{gathered}$') },
            { title: say('Trigonometrikoak eta arkuak', 'Trigonométricas y arcos', 'الدوال المثلثية ودوال القوس', 'Trigonometric and arc functions'), text: say('Kosinuak minus zeinua darama; arkuek zatikiak ematen dituzte.', 'El coseno lleva un signo menos; los arcos dan fracciones.', 'لجيب التمام إشارة سالبة، ودوال القوس تعطي كسورًا.', 'Cosine carries a minus sign; the arcs give fractions.'), math: same('$\\begin{gathered}(\\cos u)\'=-\\sin u\\cdot u\'\\\\ (\\arctan u)\'=\\frac{u\'}{1+u^2}\\end{gathered}$') }
        ],
        examplePrompt: say('Deribatu $g(x)=\\sqrt{\\ln x}$.', 'Deriva $g(x)=\\sqrt{\\ln x}$.', 'اشتق $g(x)=\\sqrt{\\ln x}$.', 'Differentiate $g(x)=\\sqrt{\\ln x}$.'),
        example: same('$\\begin{gathered}u=\\ln x\\qquad u\'=\\frac{1}{x}\\\\ g\'(x)=\\frac{u\'}{2\\sqrt{u}}=\\frac{1}{2x\\sqrt{\\ln x}}\\end{gathered}$'),
        exampleAnswer: say('Erroaren errenkada da: $g\'(x)=\\frac{1}{2x\\sqrt{\\ln x}}$, $x>1$ denean.', 'Es la fila de la raíz: $g\'(x)=\\frac{1}{2x\\sqrt{\\ln x}}$, para $x>1$.', 'إنه سطر الجذر: $g\'(x)=\\frac{1}{2x\\sqrt{\\ln x}}$ حيث $x>1$.', 'It is the root row: $g\'(x)=\\frac{1}{2x\\sqrt{\\ln x}}$, for $x>1$.')
    },
    'higher-order': {
        definitions: [
            { term: say('Faktoriala', 'Factorial', 'العاملي', 'Factorial'), meaning: say('$n!=1\\cdot 2\\cdot 3\\cdots n$; adibidez, $4!=24$.', '$n!=1\\cdot 2\\cdot 3\\cdots n$; por ejemplo, $4!=24$.', '$n!=1\\cdot 2\\cdot 3\\cdots n$؛ مثلًا $4!=24$.', '$n!=1\\cdot 2\\cdot 3\\cdots n$; for example, $4!=24$.') }
        ],
        vocabulary: [
            say('patroia', 'patrón', 'النمط', 'pattern'),
            say('txandakatu', 'alternar', 'التناوب', 'alternate'),
            say('ordena', 'orden', 'الرتبة', 'order')
        ],
        explanation: say(
            'Deribatu bat deribatu daiteke: $f\'\'$ deribatua $f\'$ funtzioarena da, eta horrela hurrenez hurren. $n$ ordenakoa aurkitzeko, lehenengoak kalkulatzen dira, batetik bestera zer aldatzen den begiratzen da (zeinua, aurreko zenbakia, berretzailea) eta $n$ duen formula bat idazten da. Ohikoenak faktorialak eta txandakatzen diren zeinuak dira.',
            'Se puede derivar una derivada: $f\'\'$ es la derivada de $f\'$, y así sucesivamente. Para la de orden $n$ se calculan las primeras, se mira qué cambia de una a otra (el signo, el número de delante, el exponente) y se escribe una fórmula con $n$. Lo más habitual son los factoriales y los signos que alternan.',
            'يمكن اشتقاق المشتقة: $f\'\'$ مشتقة $f\'$، وهكذا. وللمشتقة من الرتبة $n$ نحسب الأولى، وننظر ما يتغير من واحدة إلى أخرى (الإشارة، والعدد في المقدمة، والأس) ونكتب صيغة فيها $n$. والأكثر شيوعًا العاملي والإشارات المتناوبة.',
            'A derivative can be differentiated: $f\'\'$ is the derivative of $f\'$, and so on. For the derivative of order $n$, work out the first few, see what changes from one to the next (the sign, the number in front, the exponent) and write a formula with $n$. Factorials and alternating signs are the most common.'
        ),
        cases: [
            { title: say('Esponentziala', 'Exponencial', 'الدالة الأسية', 'Exponential'), text: say('Deribatu bakoitzak $a$ ateratzen du berriro.', 'Cada derivada saca otra vez $a$.', 'كل مشتقة تُخرج $a$ من جديد.', 'Each derivative brings out $a$ again.'), math: same('$(e^{ax})^{(n)}=a^n\\,e^{ax}$') },
            { title: say('Berretzaile negatiboa', 'Potencia negativa', 'قوة سالبة', 'Negative power'), text: say('Zeinu txandakatua eta faktoriala.', 'Signo que alterna y factorial.', 'إشارة متناوبة وعاملي.', 'Alternating sign and factorial.'), math: same('$\\left(\\frac{1}{x+b}\\right)^{(n)}=\\frac{(-1)^n\\,n!}{(x+b)^{n+1}}$') },
            { title: say('Sinua eta kosinua', 'Seno y coseno', 'الجيب وجيب التمام', 'Sine and cosine'), text: say('Lau deribatuz behin errepikatzen dira.', 'Se repiten cada cuatro derivadas.', 'تتكرر كل أربع مشتقات.', 'They repeat every four derivatives.'), math: same('$\\begin{gathered}\\sin\\ \\to\\ \\cos\\ \\to\\ -\\sin\\\\ \\to\\ -\\cos\\ \\to\\ \\sin\\end{gathered}$') }
        ],
        examplePrompt: say('Aurkitu $g^{(n)}(x)$, $g(x)=\\ln x$ bada.', 'Halla $g^{(n)}(x)$ si $g(x)=\\ln x$.', 'أوجد $g^{(n)}(x)$ إذا كانت $g(x)=\\ln x$.', 'Find $g^{(n)}(x)$ if $g(x)=\\ln x$.'),
        example: same('$\\begin{gathered}g\'=x^{-1}\\qquad g\'\'=-x^{-2}\\\\ g\'\'\'=2x^{-3}\\\\ g^{(n)}(x)=\\frac{(-1)^{n+1}(n-1)!}{x^n}\\end{gathered}$'),
        exampleAnswer: say('Zeinua $+$ da hasieran eta txandakatu egiten da; zenbakia $(n-1)!$ da.', 'El signo empieza en $+$ y alterna; el número es $(n-1)!$.', 'تبدأ الإشارة بالموجب $+$ وتتناوب، والعدد $(n-1)!$.', 'The sign starts at $+$ and alternates; the number is $(n-1)!$.')
    },

    /* ---------- 4. Special derivatives ---------- */
    inverse: {
        definitions: [
            { term: say('Alderantzizko funtzioa', 'Función inversa', 'الدالة العكسية', 'Inverse function'), meaning: say('$f^{-1}$ funtzioa, $f$ funtzioak egiten duena desegiten duena: $f(a)=b$ bada, $f^{-1}(b)=a$.', 'La función $f^{-1}$ que deshace lo que hace $f$: si $f(a)=b$, entonces $f^{-1}(b)=a$.', 'الدالة $f^{-1}$ التي تلغي ما تفعله $f$: إذا كان $f(a)=b$ فإن $f^{-1}(b)=a$.', 'The function $f^{-1}$ that undoes what $f$ does: if $f(a)=b$, then $f^{-1}(b)=a$.') }
        ],
        vocabulary: [
            say('simetrikoa', 'simétrica', 'متناظر', 'symmetric'),
            say('alderantzizko malda', 'pendiente inversa', 'الميل المقلوب', 'reciprocal slope'),
            say('islatu', 'reflejar', 'الانعكاس', 'reflect')
        ],
        explanation: say(
            '$f^{-1}$ funtzioaren grafikoa $f$ funtzioarena da, $y=x$ zuzenean islatuta. Islak $x$ eta $y$ aldagaien paperak trukatzen ditu: $m$ maldako zuzen ukitzailea $\\frac{1}{m}$ maldako bihurtzen da. Horregatik, alderantzizkoaren malda $b$ puntuan aurkitzeko, $a$ bilatzen da, $f(a)=b$ izanik, eta $\\frac{1}{f\'(a)}$ kalkulatzen da.',
            'La gráfica de $f^{-1}$ es la de $f$ reflejada en la recta $y=x$. El reflejo cambia los papeles de $x$ e $y$: una tangente con pendiente $m$ se convierte en otra con pendiente $\\frac{1}{m}$. Por eso, para la pendiente de la inversa en $b$, se busca el $a$ con $f(a)=b$ y se calcula $\\frac{1}{f\'(a)}$.',
            'رسم $f^{-1}$ هو رسم $f$ منعكسًا في المستقيم $y=x$. ويبدّل الانعكاس دوري $x$ و$y$: فالمماس الذي ميله $m$ يصير مماسًّا ميله $\\frac{1}{m}$. لذلك، لإيجاد ميل الدالة العكسية عند $b$، نبحث عن $a$ بحيث $f(a)=b$ ونحسب $\\frac{1}{f\'(a)}$.',
            'The graph of $f^{-1}$ is that of $f$ reflected in the line $y=x$. The reflection swaps the roles of $x$ and $y$: a tangent with slope $m$ becomes one with slope $\\frac{1}{m}$. So, for the slope of the inverse at $b$, look for the $a$ with $f(a)=b$ and work out $\\frac{1}{f\'(a)}$.'
        ),
        examplePrompt: say('$f(x)=e^x+x$ funtzioak alderantzizkoa du. Kalkulatu $(f^{-1})\'(1)$.', '$f(x)=e^x+x$ tiene inversa. Calcula $(f^{-1})\'(1)$.', 'للدالة $f(x)=e^x+x$ دالة عكسية. احسب $(f^{-1})\'(1)$.', '$f(x)=e^x+x$ has an inverse. Work out $(f^{-1})\'(1)$.'),
        example: same('$\\begin{gathered}f(0)=e^0+0=1\\\\ f\'(x)=e^x+1\\qquad f\'(0)=2\\\\ (f^{-1})\'(1)=\\frac{1}{2}\\end{gathered}$'),
        exampleAnswer: say('Alderantzizkoa $(1,0)$ puntutik igarotzen da, $\\frac{1}{2}$ maldarekin.', 'La inversa pasa por $(1,0)$ con pendiente $\\frac{1}{2}$.', 'تمر الدالة العكسية بالنقطة $(1,0)$ بميل $\\frac{1}{2}$.', 'The inverse passes through $(1,0)$ with slope $\\frac{1}{2}$.'),
        why: {
            text: say(
                'Zergatik $\\frac{1}{f\'(a)}$? $f(f^{-1}(x))=x$ delako. Katearen erregelarekin deribatuz, $f\'(f^{-1}(x))\\cdot(f^{-1})\'(x)=1$, eta askatu egiten da. Horrela ateratzen da, adibidez, logaritmoaren deribatua.',
                '¿Por qué $\\frac{1}{f\'(a)}$? Porque $f(f^{-1}(x))=x$. Al derivar con la regla de la cadena, $f\'(f^{-1}(x))\\cdot(f^{-1})\'(x)=1$, y se despeja. Así sale, por ejemplo, la derivada del logaritmo.',
                'لماذا $\\frac{1}{f\'(a)}$؟ لأن $f(f^{-1}(x))=x$. وبالاشتقاق بقاعدة السلسلة $f\'(f^{-1}(x))\\cdot(f^{-1})\'(x)=1$، ثم نستخرجها. وهكذا نجد مثلًا مشتقة اللوغاريتم.',
                'Why $\\frac{1}{f\'(a)}$? Because $f(f^{-1}(x))=x$. Differentiating with the chain rule, $f\'(f^{-1}(x))\\cdot(f^{-1})\'(x)=1$, and you solve for it. That is how, for example, the derivative of the logarithm comes out.'
            ),
            math: same('$(\\ln x)\'=\\frac{1}{e^{\\ln x}}=\\frac{1}{x}$')
        }
    },
    implicit: {
        definitions: [
            { term: say('Kurba inplizitua', 'Curva implícita', 'المنحنى الضمني', 'Implicit curve'), meaning: say('$x$ eta $y$ dituen ekuazio batek emandako kurba, $y$ askatu gabe.', 'Una curva dada por una ecuación en $x$ e $y$ sin despejar $y$.', 'منحنى تعطيه معادلة في $x$ و$y$ دون استخراج $y$.', 'A curve given by an equation in $x$ and $y$ without solving for $y$.') }
        ],
        vocabulary: [
            say('askatu', 'despejar', 'استخراج', 'solve for'),
            say('zirkunferentzia', 'circunferencia', 'الدائرة', 'circle'),
            say('katearen erregela', 'regla de la cadena', 'قاعدة السلسلة', 'chain rule')
        ],
        explanation: say(
            'Kurba asko, zirkunferentzia bat adibidez, ez dira funtzio bakar baten grafikoa: haien ekuazioak $x$ eta $y$ nahasten ditu. Malda aurkitzeko ez da $y$ askatu behar. Alde bakoitza $x$ aldagaiarekiko deribatzen da, $y$ aldagaia $x$ aldagaiaren menpe dagoela pentsatuz: $y^2$ adierazpenaren deribatua $2y\\,y\'$ da. Azkenean $y\'$ askatzen da eta puntua ordezkatzen da.',
            'Muchas curvas, como una circunferencia, no son la gráfica de una sola función: su ecuación mezcla $x$ e $y$. Para hallar la pendiente no hace falta despejar $y$. Se deriva cada lado respecto a $x$, pensando que $y$ depende de $x$: la derivada de $y^2$ es $2y\\,y\'$. Al final se despeja $y\'$ y se sustituye el punto.',
            'كثير من المنحنيات، مثل الدائرة، ليست رسم دالة واحدة: معادلتها تخلط $x$ و$y$. ولإيجاد الميل لا حاجة إلى استخراج $y$. نشتق كل طرف بالنسبة إلى $x$ معتبرين أن $y$ يتعلق بالمتغير $x$: مشتقة $y^2$ هي $2y\\,y\'$. وفي النهاية نستخرج $y\'$ ونعوّض النقطة.',
            'Many curves, such as a circle, are not the graph of a single function: their equation mixes $x$ and $y$. To find the slope you do not need to solve for $y$. Differentiate each side with respect to $x$, thinking that $y$ depends on $x$: the derivative of $y^2$ is $2y\\,y\'$. At the end solve for $y\'$ and substitute the point.'
        ),
        examplePrompt: say('Aurkitu $y\'$ deribatua $(1,2)$ puntuan, $x^2+xy+y^2=7$ kurban.', 'Halla $y\'$ en el punto $(1,2)$ de la curva $x^2+xy+y^2=7$.', 'أوجد $y\'$ عند النقطة $(1,2)$ من المنحنى $x^2+xy+y^2=7$.', 'Find $y\'$ at the point $(1,2)$ of the curve $x^2+xy+y^2=7$.'),
        example: same('$\\begin{gathered}2x+y+x\\,y\'+2y\\,y\'=0\\\\ y\'=-\\frac{2x+y}{x+2y}\\\\ =-\\frac{2+2}{1+4}=-\\frac{4}{5}\\end{gathered}$'),
        exampleAnswer: say('$(1,2)$ puntuan malda $-\\frac{4}{5}$ da.', 'En $(1,2)$ la pendiente es $-\\frac{4}{5}$.', 'الميل عند $(1,2)$ يساوي $-\\frac{4}{5}$.', 'At $(1,2)$ the slope is $-\\frac{4}{5}$.'),
        why: {
            text: say(
                'Zergatik agertzen da $y\'$? $y$ aldagaia $x$ aldagaiaren funtzio bat delako, eta $y^2$ konposatu bat da: karratua kanpoan eta $y(x)$ barruan. Katearen erregelak $2y\\cdot y\'$ ematen du, $(g(x)^2)\'=2g(x)\\,g\'(x)$ bezala.',
                '¿Por qué aparece $y\'$? Porque $y$ es una función de $x$, y $y^2$ es una compuesta: el cuadrado por fuera y $y(x)$ dentro. La regla de la cadena da $2y\\cdot y\'$, igual que $(g(x)^2)\'=2g(x)\\,g\'(x)$.',
                'لماذا يظهر $y\'$؟ لأن $y$ دالة في $x$، و$y^2$ دالة مركبة: المربع في الخارج و$y(x)$ في الداخل. وتعطي قاعدة السلسلة $2y\\cdot y\'$، كما في $(g(x)^2)\'=2g(x)\\,g\'(x)$.',
                'Why does $y\'$ appear? Because $y$ is a function of $x$, and $y^2$ is a composite: the square outside and $y(x)$ inside. The chain rule gives $2y\\cdot y\'$, just like $(g(x)^2)\'=2g(x)\\,g\'(x)$.'
            )
        }
    },
    logarithmic: {
        definitions: [
            { term: say('Berretzaile aldakorra', 'Exponente variable', 'أس متغير', 'Variable exponent'), meaning: say('$x$ aldagaiaren menpe dagoen berretzailea, $2^x$ funtzioan bezala.', 'Un exponente que depende de $x$, como en $2^x$.', 'أس يتعلق بالمتغير $x$، كما في $2^x$.', 'An exponent that depends on $x$, as in $2^x$.') }
        ],
        vocabulary: [
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm'),
            say('oinarria', 'base', 'الأساس', 'base'),
            say('biderkadura', 'producto', 'الجداء', 'product')
        ],
        explanation: say(
            'Berreturen erregelak eta esponentzialenak ez dute balio $x^x$ funtziorako: oinarria eta berretzailea batera aldatzen dira. Logaritmoak berretzailea jaisten du eta berretura biderkadura bihurtzen du, eta hori badakigu deribatzen. Deribazio inplizituan bezala deribatzen da, eta azkenean funtzioaz biderkatzen da.',
            'Ni la regla de las potencias ni la de las exponenciales sirven para $x^x$: la base y el exponente cambian a la vez. El logaritmo baja el exponente y convierte la potencia en un producto, que ya sabemos derivar. Se deriva como en la derivación implícita y al final se multiplica por la función.',
            'لا تصلح قاعدة القوى ولا قاعدة الدوال الأسية للدالة $x^x$: فالأساس والأس يتغيران معًا. يُنزل اللوغاريتم الأس ويحوّل القوة إلى جداء نعرف اشتقاقه. ثم نشتق كما في الاشتقاق الضمني، وفي النهاية نضرب في الدالة.',
            'Neither the power rule nor the exponential rule works for $x^x$: the base and the exponent change at the same time. The logarithm brings the exponent down and turns the power into a product, which we already know how to differentiate. Differentiate as in implicit differentiation and at the end multiply by the function.'
        ),
        examplePrompt: say('Deribatu $g(x)=x^{\\sin x}$, $x>0$ izanik.', 'Deriva $g(x)=x^{\\sin x}$ para $x>0$.', 'اشتق $g(x)=x^{\\sin x}$ حيث $x>0$.', 'Differentiate $g(x)=x^{\\sin x}$ for $x>0$.'),
        example: same('$\\begin{gathered}\\ln g=\\sin x\\,\\ln x\\\\ \\frac{g\'}{g}=\\cos x\\,\\ln x+\\frac{\\sin x}{x}\\\\ g\'=g\\cdot\\left(\\cos x\\,\\ln x+\\frac{\\sin x}{x}\\right)\\end{gathered}$'),
        exampleAnswer: say('Azkenean $g=x^{\\sin x}$ biderkatzen da.', 'Al final se multiplica por $g=x^{\\sin x}$.', 'في النهاية نضرب في $g=x^{\\sin x}$.', 'At the end multiply by $g=x^{\\sin x}$.'),
        why: {
            text: say(
                'Zergatik dabil? $x^x=e^{x\\ln x}$ idaztea eta katearen erregela aplikatzea bezala da: esponentziala errepikatu egiten da eta $x\\ln x$ adierazpenaren deribatuaz biderkatzen da, hau da, $\\ln x+1$. Logaritmoak kontuak ordenatu besterik ez ditu egiten.',
                '¿Por qué funciona? Es lo mismo que escribir $x^x=e^{x\\ln x}$ y aplicar la regla de la cadena: la exponencial se repite y se multiplica por la derivada de $x\\ln x$, que es $\\ln x+1$. El logaritmo solo ordena las cuentas.',
                'لماذا تنجح؟ الأمر مثل كتابة $x^x=e^{x\\ln x}$ وتطبيق قاعدة السلسلة: تتكرر الدالة الأسية وتُضرب في مشتقة $x\\ln x$، وهي $\\ln x+1$. فاللوغاريتم ينظّم الحساب فقط.',
                'Why does it work? It is the same as writing $x^x=e^{x\\ln x}$ and using the chain rule: the exponential repeats itself and is multiplied by the derivative of $x\\ln x$, which is $\\ln x+1$. The logarithm only tidies up the work.'
            )
        }
    },

    /* ---------- 5. Tangent problems ---------- */
    coefficients: {
        definitions: [
            { term: say('Ukitze-puntua', 'Punto de tangencia', 'نقطة التماس', 'Point of tangency'), meaning: say('Zuzen ukitzaileak kurba ukitzen duen puntua: kurban eta zuzenean dago aldi berean.', 'El punto donde la tangente toca la curva: está a la vez en la curva y en la recta.', 'النقطة التي يمسّ فيها المماس المنحنى: تقع على المنحنى وعلى المستقيم معًا.', 'The point where the tangent touches the curve: it is on the curve and on the line at the same time.') }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('datua', 'dato', 'المعلومة', 'fact'),
            say('zuzena', 'recta', 'المستقيم', 'line')
        ],
        explanation: say(
            'Problema askotan zuzen ukitzailea ematen da eta koefizienteak eskatzen dira. Ukitze-puntua kurban eta zuzenean dago aldi berean; beraz, $f(x_0)$ zuzenarekin kalkulatzen da. Zuzenaren malda $f\'(x_0)$ da. Bi ekuazio ateratzen dira; hirugarren datu bat badago, mutur bat adibidez, hirugarren bat ateratzen da.',
            'En muchos problemas se da la tangente y se piden los coeficientes. El punto de tangencia está a la vez en la curva y en la recta, así que $f(x_0)$ se calcula con la recta. La pendiente de la recta es $f\'(x_0)$. Salen dos ecuaciones; si hay un tercer dato, como un extremo, sale una tercera.',
            'في مسائل كثيرة يُعطى المماس ويُطلب إيجاد المعاملات. تقع نقطة التماس على المنحنى وعلى المستقيم معًا، لذلك تُحسب $f(x_0)$ من المستقيم. وميل المستقيم هو $f\'(x_0)$. فنحصل على معادلتين؛ وإذا وُجدت معلومة ثالثة، كقيمة قصوى، نحصل على معادلة ثالثة.',
            'In many problems you are given the tangent and asked for the coefficients. The point of tangency is on the curve and on the line at the same time, so $f(x_0)$ is worked out with the line. The slope of the line is $f\'(x_0)$. You get two equations; if there is a third fact, such as an extreme, you get a third.'
        ),
        examplePrompt: say('Aurkitu $a$ eta $b$, $g(x)=x^2+ax+b$ funtzioaren zuzen ukitzailea $x=2$ puntuan $y=x+1$ izan dadin.', 'Halla $a$ y $b$ para que la tangente a $g(x)=x^2+ax+b$ en $x=2$ sea $y=x+1$.', 'أوجد $a$ و$b$ ليكون مماس $g(x)=x^2+ax+b$ عند $x=2$ هو $y=x+1$.', 'Find $a$ and $b$ so that the tangent to $g(x)=x^2+ax+b$ at $x=2$ is $y=x+1$.'),
        example: same('$\\begin{gathered}4+2a+b=2+1=3\\\\ 4+a=1\\ \\to\\ a=-3\\\\ b=3-4+6=5\\end{gathered}$'),
        exampleAnswer: say('$g(x)=x^2-3x+5$: $x=2$ puntuan 3 balio du eta haren malda 1 da.', '$g(x)=x^2-3x+5$: en $x=2$ vale 3 y tiene pendiente 1.', '$g(x)=x^2-3x+5$: قيمتها عند $x=2$ تساوي 3 وميلها 1.', '$g(x)=x^2-3x+5$: at $x=2$ it is worth 3 and has slope 1.')
    },
    'exterior-point': {
        definitions: [
            { term: say('Kanpoko puntua', 'Punto exterior', 'النقطة الخارجية', 'Exterior point'), meaning: say('Kurban ez dagoen puntua; handik zuzen ukitzaile batzuk igaro daitezke, edo bat ere ez.', 'Un punto que no está en la curva; por él pueden pasar varias tangentes o ninguna.', 'نقطة لا تقع على المنحنى، وقد يمر بها عدة مماسات أو لا يمر أي مماس.', 'A point that is not on the curve; several tangents, or none, may pass through it.') }
        ],
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('igaro', 'pasar por', 'يمر بنقطة', 'pass through'),
            say('abzisa', 'abscisa', 'الفاصلة', 'abscissa')
        ],
        explanation: say(
            'Kurban ez dagoen puntu batetik, ezin da $f\'$ erabili haren abzisan: zuzen ukitzaileak ez du kurba han ukitzen. Ukitze-puntuaren abzisari $c$ deitzen zaio, $c$ puntuko zuzen ukitzailea idazten da, eta emandako puntutik igarotzera behartzen da. $c$ duen ekuazio bat ateratzen da; soluzio bakoitzak zuzen ukitzaile bat ematen du.',
            'Desde un punto que no está en la curva no se puede usar $f\'$ en su abscisa: la tangente no toca la curva allí. Se llama $c$ a la abscisa del punto de tangencia, se escribe la tangente en $c$ y se impone que pase por el punto dado. Sale una ecuación en $c$; cada solución da una tangente.',
            'من نقطة لا تقع على المنحنى لا يمكن استعمال $f\'$ عند فاصلتها: فالمماس لا يمسّ المنحنى هناك. نسمّي $c$ فاصلة نقطة التماس، ونكتب المماس عند $c$، ونفرض أن يمر بالنقطة المعطاة. فنحصل على معادلة في $c$، وكل حل يعطي مماسًّا.',
            'From a point that is not on the curve you cannot use $f\'$ at its abscissa: the tangent does not touch the curve there. Call $c$ the abscissa of the point of tangency, write the tangent at $c$ and make it pass through the given point. You get an equation in $c$; each solution gives a tangent.'
        ),
        examplePrompt: say('Aurkitu $g(x)=x^2+1$ funtzioaren zuzen ukitzaileak, jatorritik igarotzen direnak.', 'Halla las tangentes a $g(x)=x^2+1$ que pasan por el origen.', 'أوجد مماسات $g(x)=x^2+1$ التي تمر بالأصل.', 'Find the tangents to $g(x)=x^2+1$ that pass through the origin.'),
        example: same('$\\begin{gathered}-(c^2+1)=2c(0-c)\\\\ c^2=1\\ \\to\\ c=\\pm 1\\\\ y=2x\\qquad y=-2x\\end{gathered}$'),
        exampleAnswer: say('Bi zuzen ukitzaile, $y=2x$ eta $y=-2x$, kurba $(1,2)$ eta $(-1,2)$ puntuetan ukitzen dutenak.', 'Dos tangentes, $y=2x$ e $y=-2x$, que tocan la curva en $(1,2)$ y en $(-1,2)$.', 'مماسان، $y=2x$ و$y=-2x$، يمسّان المنحنى عند $(1,2)$ و$(-1,2)$.', 'Two tangents, $y=2x$ and $y=-2x$, which touch the curve at $(1,2)$ and at $(-1,2)$.')
    },
    'tangent-curves': {
        definitions: [
            { term: say('Kurba ukitzaileak', 'Curvas tangentes', 'منحنيان متماسّان', 'Tangent curves'), meaning: say('Puntu batean ukitzen diren bi kurba, zuzen ukitzaile bera dutela.', 'Dos curvas que se tocan en un punto con la misma recta tangente.', 'منحنيان يتلاقيان في نقطة ولهما المماس نفسه.', 'Two curves that touch at a point with the same tangent line.') }
        ],
        vocabulary: [
            say('ukitu', 'tocar', 'التماس', 'touch'),
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('parametroa', 'parámetro', 'الوسيط', 'parameter')
        ],
        explanation: say(
            'Bi kurba ukitzaileak izateak esan nahi du puntu batean ukitzen direla, zuzen ukitzaile bera dutela. Bi ekuazio idazten dira $c$ puntu ezezagunean, bata altuerekin eta bestea maldekin, eta parametroekin batera ebazten dira. Kurbetako bat zuzen bat bada, haren malda finkoa da.',
            'Que dos curvas sean tangentes quiere decir que en un punto se tocan con la misma recta tangente. Se escriben dos ecuaciones en el punto desconocido $c$, una con las alturas y otra con las pendientes, y se resuelven junto con los parámetros. Si una de las curvas es una recta, su pendiente es fija.',
            'أن يكون منحنيان متماسّين يعني أنهما يتلاقيان في نقطة ولهما المماس نفسه. نكتب معادلتين عند النقطة المجهولة $c$، إحداهما بالارتفاعات والأخرى بالميول، ونحلهما مع الوسيطات. وإذا كان أحد المنحنيين مستقيمًا فميله ثابت.',
            'Two curves being tangent means that at one point they touch with the same tangent line. Write two equations at the unknown point $c$, one with the heights and one with the slopes, and solve them together with the parameters. If one of the curves is a line, its slope is fixed.'
        ),
        examplePrompt: say('Aurkitu $a$, $y=x^2+a$ eta $y=-x^2+4x$ parabolak ukitzaileak izan daitezen.', 'Halla $a$ para que las parábolas $y=x^2+a$ e $y=-x^2+4x$ sean tangentes.', 'أوجد $a$ ليكون القطعان المكافئان $y=x^2+a$ و$y=-x^2+4x$ متماسّين.', 'Find $a$ so that the parabolas $y=x^2+a$ and $y=-x^2+4x$ are tangent.'),
        example: same('$\\begin{gathered}2c=-2c+4\\ \\to\\ c=1\\\\ 1+a=-1+4=3\\ \\to\\ a=2\\end{gathered}$'),
        exampleAnswer: say('$a=2$ denean, $(1,3)$ puntuan ukitzen dira, 2 maldarekin.', 'Con $a=2$ se tocan en $(1,3)$ con pendiente 2.', 'مع $a=2$ يتماسّان عند $(1,3)$ بميل 2.', 'With $a=2$ they touch at $(1,3)$ with slope 2.')
    }
}
