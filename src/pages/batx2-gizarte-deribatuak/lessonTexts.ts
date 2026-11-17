import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { Bach2gDerivativesTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Gizarte Zientziak — what each lesson
   tells: the new words, a short explanation, the example as an exercise
   with numbers of its own, the key words and, in four lessons, «Why does
   it work?». Plain data so the tests can import it.
   ========================================================================== */

export const bach2gDerivativesLessonTexts: Record<Bach2gDerivativesTopicId, LessonTexts> = {
    /* ---------- 1. Rate of change ---------- */
    'average-rate': {
        definitions: [
            { term: say('T.V.M.', 'T.V.M.', 'معدل التغير المتوسط', 'Average rate of change'), meaning: say('Batez besteko aldakuntza-tasa: $\\frac{f(b)-f(a)}{b-a}$, $x$ unitate bakoitzeko batez besteko aldaketa.', 'Tasa de variación media: $\\frac{f(b)-f(a)}{b-a}$, el cambio medio por unidad de $x$.', '$\\frac{f(b)-f(a)}{b-a}$: متوسط التغير لكل وحدة من $x$.', '$\\frac{f(b)-f(a)}{b-a}$: the average change per unit of $x$.') }
        ],
        vocabulary: [
            say('ebakitzailea', 'secante', 'القاطع', 'secant'),
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('tartea', 'intervalo', 'الفترة', 'interval')
        ],
        explanation: say(
            'Funtzio bat $a$ puntutik $b$ puntura nola aldatzen den neurtzeko, aldaketa osoa, $f(b)-f(a)$, tartearen luzeraz zatitzen da. Hori T.V.M. da: bi puntuak lotzen dituen zuzenaren (ebakitzailearen) malda. Positiboa bada, funtzioak gora egiten du batez beste.',
            'Para medir cuánto cambia una función de $a$ a $b$, el cambio total, $f(b)-f(a)$, se divide entre la longitud del intervalo. Eso es la T.V.M.: la pendiente de la recta que une los dos puntos (la secante). Si es positiva, la función sube de media.',
            'لقياس تغيّر دالة من $a$ إلى $b$ نقسم التغير الكلي $f(b)-f(a)$ على طول الفترة. هذا هو معدل التغير المتوسط: ميل المستقيم الواصل بين النقطتين (القاطع). وإذا كان موجبًا فالدالة تصعد في المتوسط.',
            'To measure how much a function changes from $a$ to $b$, the total change, $f(b)-f(a)$, is divided by the length of the interval. That is the average rate: the slope of the line joining the two points (the secant). If it is positive, the function rises on average.'
        ),
        examplePrompt: say('Kalkulatu $g(x)=x^3$ funtzioaren T.V.M. $[0,2]$ tartean.', 'Calcula la T.V.M. de $g(x)=x^3$ en $[0,2]$.', 'احسب معدل التغير المتوسط للدالة $g(x)=x^3$ في $[0,2]$.', 'Work out the average rate of change of $g(x)=x^3$ on $[0,2]$.'),
        example: same('$\\frac{g(2)-g(0)}{2-0}=\\frac{8-0}{2}=4$'),
        exampleAnswer: say('T.V.M. 4 da: tartean, $x$ unitate bakoitzeko 4 igotzen da batez beste.', 'La T.V.M. es 4: en el intervalo sube 4 de media por cada unidad de $x$.', 'معدل التغير المتوسط 4: يصعد في المتوسط 4 لكل وحدة من $x$.', 'The average rate is 4: on the interval it rises 4 on average per unit of $x$.')
    },
    'rate-context': {
        definitions: [
            { term: say('Aldakuntza-erritmoa', 'Ritmo de variación', 'وتيرة التغير', 'Rate of change'), meaning: say('Magnitude bat denbora-unitate bakoitzeko (edo unitate bakoitzeko) zenbat aldatzen den.', 'Cuánto cambia una magnitud por unidad de tiempo (o por unidad producida).', 'مقدار تغيّر كمية لكل وحدة زمن (أو لكل وحدة منتجة).', 'How much a quantity changes per unit of time (or per unit made).') }
        ],
        vocabulary: [
            say('salmentak', 'ventas', 'المبيعات', 'sales'),
            say('unitateak', 'unidades', 'الوحدات', 'units'),
            say('hilabetea', 'mes', 'الشهر', 'month')
        ],
        explanation: say(
            'Ekonomian eta gizartean T.V.M. erritmo bat da: salmentak hilean, biztanleak urtean, eurak unitateko. Unitateak garrantzitsuak dira: $f$ funtzioarenak zati $x$ aldagaiarenak. Negatiboa bada, magnitudea jaisten ari da tartean.',
            'En economía y sociedad la T.V.M. es un ritmo: ventas al mes, habitantes al año, euros por unidad. Las unidades importan: las de $f$ entre las de $x$. Si es negativa, la magnitud está bajando en el intervalo.',
            'في الاقتصاد والمجتمع يكون معدل التغير المتوسط وتيرةً: مبيعات في الشهر، سكان في السنة، يورو لكل وحدة. والوحدات مهمة: وحدات $f$ على وحدات $x$. وإذا كان سالبًا فالمقدار يتناقص في الفترة.',
            'In economy and society the average rate is a pace: sales a month, inhabitants a year, euros per unit. The units matter: those of $f$ over those of $x$. If it is negative, the quantity is falling on the interval.'
        ),
        examplePrompt: say('Herri bateko biztanleak $P(t)=40-0{,}5t^2$ dira (milakatan), $t$ urteetan. Zein da T.V.M. $[2,6]$ tartean?', 'Los habitantes de un pueblo son $P(t)=40-0{,}5t^2$ (miles), con $t$ en años. ¿Cuál es la T.V.M. en $[2,6]$?', 'سكان بلدة $P(t)=40-0{,}5t^2$ (بالآلاف)، حيث $t$ بالسنوات. ما معدل التغير المتوسط في $[2,6]$؟', 'The inhabitants of a town are $P(t)=40-0{,}5t^2$ (thousands), with $t$ in years. What is the average rate on $[2,6]$?'),
        example: same('$\\frac{P(6)-P(2)}{6-2}=\\frac{22-38}{4}=-4$'),
        exampleAnswer: say('$-4$: urtean 4000 biztanle galtzen ditu, batez beste.', '$-4$: pierde de media 4000 habitantes al año.', '$-4$: يفقد في المتوسط 4000 ساكن في السنة.', '$-4$: it loses 4,000 inhabitants a year on average.')
    },
    instant: {
        definitions: [
            { term: say('Aldakuntza-tasa unekoa', 'Tasa instantánea', 'معدل التغير اللحظي', 'Instantaneous rate'), meaning: say('T.V.M.-aren limitea tartea zero aldera doanean: une jakin bateko erritmoa.', 'El límite de la T.V.M. cuando el intervalo tiende a cero: el ritmo en un instante.', 'نهاية معدل التغير المتوسط عندما يؤول طول الفترة إلى الصفر: الوتيرة في لحظة.', 'The limit of the average rate as the interval shrinks to zero: the pace at one instant.') }
        ],
        vocabulary: [
            say('zuzen ukitzailea', 'tangente', 'المماس', 'tangent'),
            say('unea', 'instante', 'اللحظة', 'instant')
        ],
        explanation: say(
            'T.V.M.-ak tarte osoan zer gertatzen den esaten du, baina ez une batean. Une baterako, tartea txikitu egiten da: $[a,a+h]$, $h$ gero eta txikiagoa. T.V.M.-ak zenbaki batera jotzen du: hori da aldakuntza-tasa unekoa. Grafikoan, ebakitzailea zuzen ukitzaile bihurtzen da.',
            'La T.V.M. dice lo que pasa en todo el intervalo, no en un instante. Para un instante, se encoge el intervalo: $[a,a+h]$ con $h$ cada vez menor. La T.V.M. tiende a un número: la tasa de variación instantánea. En la gráfica, la secante se convierte en la tangente.',
            'يخبر معدل التغير المتوسط بما يحدث في الفترة كلها لا في لحظة. وللحظة نصغّر الفترة: $[a,a+h]$ مع $h$ يصغر. فيؤول معدل التغير المتوسط إلى عدد: معدل التغير اللحظي. وفي الرسم يصير القاطع مماسًا.',
            'The average rate tells what happens over the whole interval, not at an instant. For an instant, the interval shrinks: $[a,a+h]$ with $h$ smaller and smaller. The average rate tends to a number: the instantaneous rate. On the graph, the secant becomes the tangent.'
        ),
        examplePrompt: say('$f(x)=x^2+x$ bada, kalkulatu T.V.M. $[3,3+h]$ tartean eta haren limitea.', 'Si $f(x)=x^2+x$, calcula la T.V.M. en $[3,3+h]$ y su límite.', 'إذا كانت $f(x)=x^2+x$ فاحسب معدل التغير المتوسط في $[3,3+h]$ ونهايته.', 'If $f(x)=x^2+x$, work out the average rate on $[3,3+h]$ and its limit.'),
        example: same('$\\frac{(3+h)^2+(3+h)-12}{h}=7+h\\ \\to\\ 7$'),
        exampleAnswer: say('T.V.M. $7+h$ da; $h\\to 0$ denean, 7.', 'La T.V.M. es $7+h$; cuando $h\\to 0$, 7.', 'معدل التغير المتوسط $7+h$؛ وعندما $h\\to 0$ نجد 7.', 'The average rate is $7+h$; as $h\\to 0$, 7.')
    },

    /* ---------- 2. The derivative at a point ---------- */
    definition: {
        definitions: [
            { term: say('Deribatua puntu batean', 'Derivada en un punto', 'المشتقة عند نقطة', 'Derivative at a point'), meaning: same("$f'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$") }
        ],
        vocabulary: [
            say('limitea', 'límite', 'النهاية', 'limit'),
            say('garatu', 'desarrollar', 'النشر', 'expand')
        ],
        explanation: say(
            'Deribatua T.V.M.-aren limitea da $h\\to 0$ denean. Ordezkatzean beti $\\frac{0}{0}$ ateratzen da, beraz eragiketak egin behar dira: $f(a+h)$ garatu, $f(a)$ kendu, $h$ faktore komun atera eta sinplifikatu. Gero, $h=0$ ordezkatzen da.',
            'La derivada es el límite de la T.V.M. cuando $h\\to 0$. Al sustituir sale siempre $\\frac{0}{0}$, así que hay que operar: desarrollar $f(a+h)$, restar $f(a)$, sacar factor común $h$ y simplificar. Después se sustituye $h=0$.',
            'المشتقة هي نهاية معدل التغير المتوسط عندما $h\\to 0$. وبالتعويض تظهر دائمًا $\\frac{0}{0}$ فلا بد من الحساب: انشر $f(a+h)$ واطرح $f(a)$ وأخرج $h$ عاملًا مشتركًا واختصر. ثم عوّض $h=0$.',
            'The derivative is the limit of the average rate as $h\\to 0$. Substituting always gives $\\frac{0}{0}$, so you must work: expand $f(a+h)$, subtract $f(a)$, take out $h$ as a common factor and cancel. Then substitute $h=0$.'
        ),
        examplePrompt: say('Kalkulatu $g\'(2)$ definizioaren bidez, $g(x)=x^2-5x$ bada.', 'Calcula $g\'(2)$ con la definición si $g(x)=x^2-5x$.', 'احسب $g\'(2)$ بالتعريف إذا كانت $g(x)=x^2-5x$.', 'Work out $g\'(2)$ from the definition if $g(x)=x^2-5x$.'),
        example: same('$\\frac{(2+h)^2-5(2+h)+6}{h}=h-1\\ \\to\\ -1$'),
        exampleAnswer: say('$g\'(2)=-1$: puntu horretan funtzioa jaisten ari da.', '$g\'(2)=-1$: en ese punto la función está bajando.', '$g\'(2)=-1$: عند تلك النقطة تتناقص الدالة.', '$g\'(2)=-1$: at that point the function is falling.')
    },
    tangent: {
        definitions: [
            { term: say('Zuzen ukitzailea', 'Recta tangente', 'المماس', 'Tangent line'), meaning: say('Puntu batean kurba «ukitzen» duen zuzena, kurbaren malda bera duena: $f\'(a)$.', 'La recta que «toca» la curva en un punto con su misma pendiente: $f\'(a)$.', 'المستقيم الذي «يمس» المنحنى عند نقطة وله ميله نفسه: $f\'(a)$.', 'The line that «touches» the curve at a point with its same slope: $f\'(a)$.') }
        ],
        vocabulary: [
            say('puntua', 'punto', 'النقطة', 'point'),
            say('malda', 'pendiente', 'الميل', 'slope')
        ],
        explanation: say(
            'Zuzen bat idazteko puntu bat eta malda bat behar dira. Zuzen ukitzailean, puntua $(a,f(a))$ da eta malda $f\'(a)$. Beraz, lehenik $f(a)$ kalkulatzen da, gero $f\'(x)$ deribatua eta haren balioa $a$ puntuan, eta azkenik puntu-malda ekuazioa idazten da.',
            'Para escribir una recta hacen falta un punto y una pendiente. En la tangente, el punto es $(a,f(a))$ y la pendiente $f\'(a)$. Así que primero se calcula $f(a)$, luego la derivada $f\'(x)$ y su valor en $a$, y por último la ecuación punto-pendiente.',
            'لكتابة مستقيم يلزم نقطة وميل. في المماس النقطة $(a,f(a))$ والميل $f\'(a)$. لذا نحسب أولًا $f(a)$ ثم المشتقة $f\'(x)$ وقيمتها عند $a$، وأخيرًا معادلة النقطة والميل.',
            'To write a line you need a point and a slope. For the tangent, the point is $(a,f(a))$ and the slope $f\'(a)$. So first work out $f(a)$, then the derivative $f\'(x)$ and its value at $a$, and last the point-slope equation.'
        ),
        examplePrompt: say('Idatzi $g(x)=x^3-3x$ kurbaren zuzen ukitzailea $x=2$ puntuan.', 'Escribe la tangente a $g(x)=x^3-3x$ en $x=2$.', 'اكتب مماس $g(x)=x^3-3x$ عند $x=2$.', 'Write the tangent to $g(x)=x^3-3x$ at $x=2$.'),
        example: same("$\\begin{gathered}g(2)=8-6=2\\qquad g'(2)=12-3=9\\\\ y=9x-16\\end{gathered}$"),
        exampleAnswer: say('Puntua $(2,2)$ eta malda 9: $y=9x-16$.', 'Punto $(2,2)$ y pendiente 9: $y=9x-16$.', 'النقطة $(2,2)$ والميل 9: ‏$y=9x-16$.', 'Point $(2,2)$ and slope 9: $y=9x-16$.')
    },
    derivable: {
        definitions: [
            { term: say('Alboko deribatuak', 'Derivadas laterales', 'المشتقتان الجانبيتان', 'One-sided derivatives'), meaning: say('Ezkerreko eta eskuineko maldak, $f\'(a^-)$ eta $f\'(a^+)$; deribagarria izateko berdinak izan behar dute.', 'Las pendientes por la izquierda y por la derecha, $f\'(a^-)$ y $f\'(a^+)$; para ser derivable deben coincidir.', 'الميلان من اليسار ومن اليمين $f\'(a^-)$ و$f\'(a^+)$؛ ويجب أن يتساويا لتكون قابلة للاشتقاق.', 'The slopes from the left and from the right, $f\'(a^-)$ and $f\'(a^+)$; to be differentiable they must agree.') }
        ],
        vocabulary: [
            say('punta', 'pico', 'الزاوية', 'corner'),
            say('jauzia', 'salto', 'القفزة', 'jump'),
            say('jarraitua', 'continua', 'متصلة', 'continuous')
        ],
        explanation: say(
            'Funtzio bat deribagarria da puntu batean, han zuzen ukitzaile bakarra badu. Jauzi batean ez dago; punta batean ere ez, alde bakoitzak malda bat duelako. Horregatik, zatika: lehenik jarraitua den begiratzen da, eta gero alboko deribatuak berdinak diren.',
            'Una función es derivable en un punto si allí tiene una sola tangente. En un salto no la hay; en un pico tampoco, porque cada lado tiene su pendiente. Por eso, a trozos: primero se mira si es continua y después si las derivadas laterales coinciden.',
            'تكون الدالة قابلة للاشتقاق عند نقطة إذا كان لها هناك مماس واحد. ولا يوجد عند قفزة، ولا عند زاوية لأن لكل جانب ميله. لذلك في الدوال متعددة الأجزاء: ننظر أولًا هل هي متصلة ثم هل تتساوى المشتقتان الجانبيتان.',
            'A function is differentiable at a point if it has a single tangent there. At a jump there is none; at a corner neither, because each side has its own slope. So, piecewise: first check that it is continuous, then that the one-sided derivatives agree.'
        ),
        examplePrompt: say('Deribagarria al da $g(x)=\\begin{cases}2x+1 & x\\le 3\\\\ x^2-2 & x>3\\end{cases}$ funtzioa $x=3$ puntuan?', '¿Es derivable $g(x)=\\begin{cases}2x+1 & x\\le 3\\\\ x^2-2 & x>3\\end{cases}$ en $x=3$?', 'هل $g(x)=\\begin{cases}2x+1 & x\\le 3\\\\ x^2-2 & x>3\\end{cases}$ قابلة للاشتقاق عند $x=3$؟', 'Is $g(x)=\\begin{cases}2x+1 & x\\le 3\\\\ x^2-2 & x>3\\end{cases}$ differentiable at $x=3$?'),
        example: same("$\\begin{gathered}7=7\\\\ g'(3^-)=2\\qquad g'(3^+)=6\\end{gathered}$"),
        exampleAnswer: say('Jarraitua da (7 bi aldeetan), baina maldak 2 eta 6: ez da deribagarria.', 'Es continua (7 por los dos lados), pero las pendientes son 2 y 6: no es derivable.', 'متصلة (7 من الجانبين) لكن الميلين 2 و6: غير قابلة للاشتقاق.', 'It is continuous (7 on both sides), but the slopes are 2 and 6: not differentiable.'),
        why: {
            text: say(
                'Zergatik da jarraitua funtzio deribagarri bat? $f(a+h)-f(a)=\\frac{f(a+h)-f(a)}{h}\\cdot h$. $h\\to 0$ denean, zatikia $f\'(a)$ baliora doa eta $h$ zerora: biderkadura 0 da, beraz $f(a+h)\\to f(a)$.',
                '¿Por qué una función derivable es continua? $f(a+h)-f(a)=\\frac{f(a+h)-f(a)}{h}\\cdot h$. Cuando $h\\to 0$, la fracción tiende a $f\'(a)$ y $h$ a 0: el producto es 0, así que $f(a+h)\\to f(a)$.',
                'لماذا تكون الدالة القابلة للاشتقاق متصلة؟ $f(a+h)-f(a)=\\frac{f(a+h)-f(a)}{h}\\cdot h$. عندما $h\\to 0$ يؤول الكسر إلى $f\'(a)$ ويؤول $h$ إلى 0: فالجداء 0، إذن $f(a+h)\\to f(a)$.',
                'Why is a differentiable function continuous? $f(a+h)-f(a)=\\frac{f(a+h)-f(a)}{h}\\cdot h$. As $h\\to 0$, the fraction tends to $f\'(a)$ and $h$ to 0: the product is 0, so $f(a+h)\\to f(a)$.'
            )
        }
    },

    /* ---------- 3. Rules ---------- */
    powers: {
        definitions: [
            { term: say('Berreturaren erregela', 'Regla de la potencia', 'قاعدة القوة', 'Power rule'), meaning: same("$(x^n)'=nx^{n-1}$") }
        ],
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('batura', 'suma', 'المجموع', 'sum'),
            say('konstantea', 'constante', 'الثابت', 'constant')
        ],
        explanation: say(
            'Berretura baten deribatua: berretzailea aurrera pasatzen da eta bat kentzen zaio. Erroak eta zatikiak lehenik berretura gisa idazten dira. Batura bat gaiz gai deribatzen da, eta konstante batek, biderkatzen badu, bere horretan jarraitzen du; bakarrik badago, 0 ematen du.',
            'La derivada de una potencia: el exponente pasa delante y se le resta uno. Las raíces y las fracciones se escriben antes como potencias. Una suma se deriva término a término, y una constante que multiplica se queda; si va sola, da 0.',
            'مشتقة القوة: ينتقل الأس إلى الأمام ويُطرح منه واحد. وتُكتب الجذور والكسور أولًا على صورة قوى. ويُشتق المجموع حدًّا حدًّا، والثابت الضارب يبقى، أما الثابت وحده فمشتقته 0.',
            'The derivative of a power: the exponent goes in front and one is taken off. Roots and fractions are first written as powers. A sum is differentiated term by term, and a constant that multiplies stays; on its own, it gives 0.'
        ),
        examplePrompt: say('Deribatu $g(x)=5x^4-\\frac{3}{x^2}+7$.', 'Deriva $g(x)=5x^4-\\frac{3}{x^2}+7$.', 'اشتق $g(x)=5x^4-\\frac{3}{x^2}+7$.', 'Differentiate $g(x)=5x^4-\\frac{3}{x^2}+7$.'),
        example: same("$g'(x)=20x^3+\\frac{6}{x^3}$"),
        exampleAnswer: say('$-3x^{-2}$ gaiaren deribatua $6x^{-3}$ da, eta 7 konstanteena 0.', 'La derivada de $-3x^{-2}$ es $6x^{-3}$, y la de la constante 7 es 0.', 'مشتقة $-3x^{-2}$ هي $6x^{-3}$، ومشتقة الثابت 7 هي 0.', 'The derivative of $-3x^{-2}$ is $6x^{-3}$, and that of the constant 7 is 0.')
    },
    'product-quotient': {
        definitions: [
            { term: say('Zatiduraren erregela', 'Regla del cociente', 'قاعدة خارج القسمة', 'Quotient rule'), meaning: same("$\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}$") }
        ],
        vocabulary: [
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('erregela', 'regla', 'القاعدة', 'rule')
        ],
        explanation: say(
            'Biderkadura batean, bakoitza txandaka deribatzen da: $u\'v+uv\'$. Zatidura batean, goikoaren deribatua bider behekoa, ken goikoa bider behekoaren deribatua, guztia behekoaren karratuaz zatituta. Batez besteko kostua, $\\frac{C(x)}{x}$, zatidura bat da.',
            'En un producto se deriva cada factor por turnos: $u\'v+uv\'$. En un cociente, la derivada de arriba por la de abajo, menos la de arriba por la derivada de abajo, todo entre el cuadrado de abajo. El coste medio, $\\frac{C(x)}{x}$, es un cociente.',
            'في الجداء يُشتق كل عامل بالتناوب: $u\'v+uv\'$. وفي خارج القسمة: مشتقة البسط في المقام ناقص البسط في مشتقة المقام، والكل على مربع المقام. ومتوسط التكلفة $\\frac{C(x)}{x}$ خارج قسمة.',
            'In a product each factor is differentiated in turn: $u\'v+uv\'$. In a quotient, the derivative of the top times the bottom, minus the top times the derivative of the bottom, all over the bottom squared. The average cost, $\\frac{C(x)}{x}$, is a quotient.'
        ),
        examplePrompt: say('Deribatu $h(x)=(x^2+1)(3x-2)$.', 'Deriva $h(x)=(x^2+1)(3x-2)$.', 'اشتق $h(x)=(x^2+1)(3x-2)$.', 'Differentiate $h(x)=(x^2+1)(3x-2)$.'),
        example: same("$\\begin{gathered}h'(x)=2x(3x-2)+3(x^2+1)\\\\ =9x^2-4x+3\\end{gathered}$"),
        exampleAnswer: say('Biderkaduraren erregelarekin: $9x^2-4x+3$.', 'Con la regla del producto: $9x^2-4x+3$.', 'بقاعدة الجداء: $9x^2-4x+3$.', 'With the product rule: $9x^2-4x+3$.')
    },
    'derivative-graph': {
        definitions: [
            { term: say('Funtzio deribatua', 'Función derivada', 'الدالة المشتقة', 'Derivative function'), meaning: say('$x$ bakoitzari $f$ funtzioaren malda, $f\'(x)$, ematen dion funtzioa.', 'La función que da a cada $x$ la pendiente de $f$, $f\'(x)$.', 'الدالة التي تعطي كل $x$ ميل $f$ أي $f\'(x)$.', 'The function that gives each $x$ the slope of $f$, $f\'(x)$.') }
        ],
        vocabulary: [
            say('hazten', 'crece', 'تتزايد', 'rises'),
            say('irabazia', 'beneficio', 'الربح', 'profit'),
            say('malda', 'pendiente', 'الميل', 'slope')
        ],
        explanation: say(
            '$f\'$ funtzioaren grafikoa $f$ funtzioaren maldak marraztuz lortzen da. $f$ igotzen den tokian, $f\'$ ardatzaren gainean dago; jaisten den tokian, azpian; eta $f$ goian edo behean geratzen den tokian (zuzen ukitzaile horizontala), $f\'$ ardatza zeharkatzen du.',
            'La gráfica de $f\'$ se obtiene dibujando las pendientes de $f$. Donde $f$ sube, $f\'$ está por encima del eje; donde baja, por debajo; y donde $f$ se queda arriba o abajo (tangente horizontal), $f\'$ cruza el eje.',
            'يُرسم $f\'$ برسم ميول $f$. حيث تصعد $f$ يكون $f\'$ فوق المحور، وحيث تنزل يكون تحته، وحيث تبلغ $f$ قمة أو قاعًا (مماس أفقي) يقطع $f\'$ المحور.',
            'The graph of $f\'$ is made by drawing the slopes of $f$. Where $f$ goes up, $f\'$ is above the axis; where it goes down, below; and where $f$ tops out or bottoms out (horizontal tangent), $f\'$ crosses the axis.'
        ),
        examplePrompt: say('$I(x)=30x-2x^2$ diru-sarrerak badira, non da $I\'(x)$ zero?', 'Si los ingresos son $I(x)=30x-2x^2$, ¿dónde se anula $I\'(x)$?', 'إذا كان الإيراد $I(x)=30x-2x^2$ فأين تنعدم $I\'(x)$؟', 'If the income is $I(x)=30x-2x^2$, where is $I\'(x)$ zero?'),
        example: same("$I'(x)=30-4x=0\\ \\to\\ x=7{,}5$"),
        exampleAnswer: say('$x=7{,}5$ unitatean: hor diru-sarrerak gehien dira.', 'En $x=7{,}5$ unidades: ahí los ingresos son máximos.', 'عند $x=7{,}5$ وحدة: هناك يكون الإيراد أكبر ما يمكن.', 'At $x=7{,}5$ units: there the income is highest.')
    },

    /* ---------- 4. The chain rule ---------- */
    'chain-power': {
        definitions: [
            { term: say('Katearen erregela', 'Regla de la cadena', 'قاعدة السلسلة', 'Chain rule'), meaning: say('Funtzio konposatu bat deribatzeko: kanpokoa deribatu (barrukoa bere horretan) eta barrukoaren deribatuaz biderkatu.', 'Para derivar una función compuesta: derivar la de fuera (dejando dentro lo mismo) y multiplicar por la derivada de dentro.', 'لاشتقاق دالة مركبة: اشتق الخارجية (مع إبقاء الداخل) واضرب في مشتقة الداخلية.', 'To differentiate a composite function: differentiate the outside (keeping the inside) and multiply by the derivative of the inside.') }
        ],
        vocabulary: [
            say('barrukoa', 'de dentro', 'الداخلية', 'inside'),
            say('kanpokoa', 'de fuera', 'الخارجية', 'outside')
        ],
        explanation: say(
            'Funtzio batek beste bat barruan duenean, $(x^2+3)^4$ adibidez, kanpoko berretura deribatzen da barrukoa ukitu gabe, eta gero barrukoaren deribatuaz biderkatzen da. Erroekin berdin: $\\sqrt{u}$ funtzioaren deribatua $\\frac{u\'}{2\\sqrt{u}}$ da.',
            'Cuando una función lleva otra dentro, como $(x^2+3)^4$, se deriva la potencia de fuera sin tocar lo de dentro y después se multiplica por la derivada de dentro. Con raíces igual: la derivada de $\\sqrt{u}$ es $\\frac{u\'}{2\\sqrt{u}}$.',
            'عندما تحتوي دالة على أخرى، مثل $(x^2+3)^4$، نشتق القوة الخارجية دون لمس الداخل ثم نضرب في مشتقة الداخل. وكذلك مع الجذور: مشتقة $\\sqrt{u}$ هي $\\frac{u\'}{2\\sqrt{u}}$.',
            'When a function carries another inside, like $(x^2+3)^4$, differentiate the outer power without touching the inside, then multiply by the derivative of the inside. The same with roots: the derivative of $\\sqrt{u}$ is $\\frac{u\'}{2\\sqrt{u}}$.'
        ),
        examplePrompt: say('Deribatu $h(x)=(5x-1)^3$.', 'Deriva $h(x)=(5x-1)^3$.', 'اشتق $h(x)=(5x-1)^3$.', 'Differentiate $h(x)=(5x-1)^3$.'),
        example: same("$h'(x)=3(5x-1)^2\\cdot 5=15(5x-1)^2$"),
        exampleAnswer: say('Barrukoaren deribatua 5 da: $15(5x-1)^2$.', 'La derivada de dentro es 5: $15(5x-1)^2$.', 'مشتقة الداخل 5: ‏$15(5x-1)^2$.', 'The derivative of the inside is 5: $15(5x-1)^2$.'),
        why: {
            text: say(
                'Zergatik biderkatu barrukoaren deribatuaz? Barrukoa $u\'$ erritmoan aldatzen da eta kanpokoak aldaketa hori bere maldaz biderkatzen du. Bi erritmoak biderkatu egiten dira, engranaje batean bezala.',
                '¿Por qué multiplicar por la derivada de dentro? Lo de dentro cambia al ritmo $u\'$ y la función de fuera multiplica ese cambio por su pendiente. Los dos ritmos se multiplican, como en un engranaje.',
                'لماذا نضرب في مشتقة الداخل؟ يتغير الداخل بوتيرة $u\'$ وتضرب الدالة الخارجية ذلك التغير في ميلها. فتُضرب الوتيرتان كما في المسننات.',
                'Why multiply by the derivative of the inside? The inside changes at the pace $u\'$ and the outer function multiplies that change by its slope. The two paces multiply, as in a gearbox.'
            )
        }
    },
    'chain-exp': {
        definitions: [
            { term: say('Hazkunde esponentziala', 'Crecimiento exponencial', 'النمو الأسي', 'Exponential growth'), meaning: say('Magnitude bat aldiro ehuneko berean hazten denean: $P_0e^{kt}$.', 'Cuando una magnitud crece el mismo porcentaje en cada periodo: $P_0e^{kt}$.', 'عندما يكبر مقدار بالنسبة المئوية نفسها في كل فترة: $P_0e^{kt}$.', 'When a quantity grows by the same percentage each period: $P_0e^{kt}$.') }
        ],
        vocabulary: [
            say('biztanleria', 'población', 'السكان', 'population'),
            say('esponentziala', 'exponencial', 'الأسية', 'exponential')
        ],
        explanation: say(
            '$e^{x}$ funtzioaren deribatua bera da. Barruan beste funtzio bat badago, haren deribatuaz biderkatzen da: $(e^{u})\'=e^{u}\\cdot u\'$. Beste oinarri batekin, $\\ln a$ faktorea agertzen da. Biztanleria edo kapital baten ereduetan, deribatua hazkundearen abiadura da.',
            'La derivada de $e^{x}$ es ella misma. Si dentro hay otra función, se multiplica por su derivada: $(e^{u})\'=e^{u}\\cdot u\'$. Con otra base aparece el factor $\\ln a$. En los modelos de población o de capital, la derivada es la velocidad de crecimiento.',
            'مشتقة $e^{x}$ هي نفسها. وإذا كان في الداخل دالة أخرى نضرب في مشتقتها: $(e^{u})\'=e^{u}\\cdot u\'$. ومع أساس آخر يظهر العامل $\\ln a$. وفي نماذج السكان أو رأس المال تكون المشتقة سرعة النمو.',
            'The derivative of $e^{x}$ is itself. If there is another function inside, multiply by its derivative: $(e^{u})\'=e^{u}\\cdot u\'$. With another base the factor $\\ln a$ appears. In population or capital models, the derivative is the speed of growth.'
        ),
        examplePrompt: say('Deribatu $g(x)=e^{x^2-4x}$ eta kalkulatu $g\'(2)$.', 'Deriva $g(x)=e^{x^2-4x}$ y calcula $g\'(2)$.', 'اشتق $g(x)=e^{x^2-4x}$ واحسب $g\'(2)$.', 'Differentiate $g(x)=e^{x^2-4x}$ and work out $g\'(2)$.'),
        example: same("$g'(x)=(2x-4)e^{x^2-4x}\\ \\to\\ g'(2)=0$"),
        exampleAnswer: say('$x=2$ puntuan $2x-4=0$: zuzen ukitzaile horizontala.', 'En $x=2$, $2x-4=0$: tangente horizontal.', 'عند $x=2$ يكون $2x-4=0$: مماس أفقي.', 'At $x=2$, $2x-4=0$: a horizontal tangent.')
    },
    'chain-log': {
        definitions: [
            { term: say('Logaritmo nepertarra', 'Logaritmo neperiano', 'اللوغاريتم الطبيعي', 'Natural logarithm'), meaning: say('$e$ oinarriko logaritmoa, $\\ln x$; haren deribatua $\\frac{1}{x}$ da.', 'El logaritmo de base $e$, $\\ln x$; su derivada es $\\frac{1}{x}$.', 'اللوغاريتم ذو الأساس $e$، ‏$\\ln x$؛ ومشتقته $\\frac{1}{x}$.', 'The logarithm to base $e$, $\\ln x$; its derivative is $\\frac{1}{x}$.') }
        ],
        vocabulary: [
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm'),
            say('propietateak', 'propiedades', 'الخواص', 'properties')
        ],
        explanation: say(
            '$\\ln u$ funtzioaren deribatua $\\frac{u\'}{u}$ da: barrukoaren deribatua zati barrukoa. Biderkadura edo zatidura baten logaritmoa bada, askotan errazagoa da lehenik bereiztea: $\\ln(uv)=\\ln u+\\ln v$, eta gero gaiz gai deribatzea.',
            'La derivada de $\\ln u$ es $\\frac{u\'}{u}$: la derivada de dentro entre lo de dentro. Si es el logaritmo de un producto o un cociente, a menudo es más fácil separarlo antes: $\\ln(uv)=\\ln u+\\ln v$, y después derivar término a término.',
            'مشتقة $\\ln u$ هي $\\frac{u\'}{u}$: مشتقة الداخل على الداخل. وإذا كان لوغاريتم جداء أو خارج قسمة فكثيرًا ما يكون الفصل أولًا أسهل: $\\ln(uv)=\\ln u+\\ln v$، ثم الاشتقاق حدًّا حدًّا.',
            'The derivative of $\\ln u$ is $\\frac{u\'}{u}$: the derivative of the inside over the inside. If it is the logarithm of a product or a quotient, it is often easier to split it first: $\\ln(uv)=\\ln u+\\ln v$, then differentiate term by term.'
        ),
        examplePrompt: say('Deribatu $h(x)=\\ln(3x+2)$ eta kalkulatu $h\'(1)$.', 'Deriva $h(x)=\\ln(3x+2)$ y calcula $h\'(1)$.', 'اشتق $h(x)=\\ln(3x+2)$ واحسب $h\'(1)$.', 'Differentiate $h(x)=\\ln(3x+2)$ and work out $h\'(1)$.'),
        example: same("$h'(x)=\\frac{3}{3x+2}\\ \\to\\ h'(1)=\\frac{3}{5}$"),
        exampleAnswer: say('Barrukoaren deribatua 3 da: $h\'(1)=\\frac{3}{5}$.', 'La derivada de dentro es 3: $h\'(1)=\\frac{3}{5}$.', 'مشتقة الداخل 3: ‏$h\'(1)=\\frac{3}{5}$.', 'The derivative of the inside is 3: $h\'(1)=\\frac{3}{5}$.')
    },

    /* ---------- 5. In economy ---------- */
    higher: {
        definitions: [
            { term: say('Bigarren deribatua', 'Segunda derivada', 'المشتقة الثانية', 'Second derivative'), meaning: say('Deribatuaren deribatua, $f\'\'$: malda nola aldatzen den.', 'La derivada de la derivada, $f\'\'$: cómo cambia la pendiente.', 'مشتقة المشتقة $f\'\'$: كيف يتغير الميل.', 'The derivative of the derivative, $f\'\'$: how the slope changes.') }
        ],
        vocabulary: [
            say('erritmoa', 'ritmo', 'الوتيرة', 'pace'),
            say('bizkortu', 'acelerar', 'التسارع', 'speed up')
        ],
        explanation: say(
            'Deribatu bat deribatu daiteke berriro: $f\'\'$, $f\'\'\'$… Bigarrenak esaten du hazkundearen erritmoa nola aldatzen den. Salmentak hazten badira eta $V\'\'<0$ bada, gero eta motelago hazten dira; $V\'\'>0$ bada, gero eta bizkorrago.',
            'Una derivada se puede volver a derivar: $f\'\'$, $f\'\'\'$… La segunda dice cómo cambia el ritmo de crecimiento. Si las ventas crecen y $V\'\'<0$, crecen cada vez más despacio; si $V\'\'>0$, cada vez más deprisa.',
            'يمكن اشتقاق المشتقة من جديد: $f\'\'$ و$f\'\'\'$… وتخبر الثانية بكيفية تغيّر وتيرة النمو. إذا كانت المبيعات تنمو و$V\'\'<0$ فهي تنمو أبطأ فأبطأ، وإذا $V\'\'>0$ فأسرع فأسرع.',
            'A derivative can be differentiated again: $f\'\'$, $f\'\'\'$… The second tells how the pace of growth changes. If sales grow and $V\'\'<0$, they grow more and more slowly; if $V\'\'>0$, faster and faster.'
        ),
        examplePrompt: say('$f(x)=2x^4-x^2$ bada, kalkulatu $f\'\'(x)$ eta $f\'\'\'(x)$.', 'Si $f(x)=2x^4-x^2$, calcula $f\'\'(x)$ y $f\'\'\'(x)$.', 'إذا كانت $f(x)=2x^4-x^2$ فاحسب $f\'\'(x)$ و$f\'\'\'(x)$.', 'If $f(x)=2x^4-x^2$, work out $f\'\'(x)$ and $f\'\'\'(x)$.'),
        example: same("$\\begin{gathered}f'(x)=8x^3-2x\\\\ f''(x)=24x^2-2\\\\ f'''(x)=48x\\end{gathered}$"),
        exampleAnswer: say('Deribatu bakoitzak maila bat jaisten du.', 'Cada derivada baja un grado.', 'تُنزل كل مشتقة الدرجة واحدًا.', 'Each derivative lowers the degree by one.')
    },
    'smooth-join': {
        definitions: [
            { term: say('Lotura leuna', 'Unión suave', 'التقاء أملس', 'Smooth joint'), meaning: say('Bi zati jauzirik eta puntarik gabe elkartzen diren lotunea: balio bera eta malda bera.', 'Una unión de dos trozos sin salto ni pico: mismo valor y misma pendiente.', 'التقاء جزأين بلا قفزة ولا زاوية: القيمة نفسها والميل نفسه.', 'A joint of two pieces with no jump and no corner: same value and same slope.') }
        ],
        vocabulary: [
            say('parametroa', 'parámetro', 'الوسيط', 'parameter'),
            say('lotunea', 'unión', 'نقطة الالتقاء', 'joint'),
            say('sistema', 'sistema', 'الجملة', 'system')
        ],
        explanation: say(
            'Zatika definitutako funtzio batek bi parametro baditu, bi baldintza erabiltzen dira lotunean: jarraitua izateko, bi zatiek balio bera; deribagarria izateko, bi deribatuek balio bera. Bi ekuazio dira, eta sistemak $a$ eta $b$ ematen ditu.',
            'Si una función a trozos tiene dos parámetros, en la unión se usan dos condiciones: para que sea continua, los dos trozos valen lo mismo; para que sea derivable, las dos derivadas valen lo mismo. Son dos ecuaciones, y el sistema da $a$ y $b$.',
            'إذا كان لدالة متعددة الأجزاء وسيطان نستعمل عند الالتقاء شرطين: لتكون متصلة يتساوى الجزآن، ولتكون قابلة للاشتقاق تتساوى المشتقتان. هما معادلتان تعطي جملتهما $a$ و$b$.',
            'If a piecewise function has two parameters, two conditions are used at the joint: for it to be continuous, both pieces give the same; for it to be differentiable, both derivatives give the same. That is two equations, and the system gives $a$ and $b$.'
        ),
        examplePrompt: say('Aurkitu $a$ eta $b$, $g(x)=\\begin{cases}ax^2 & x\\le 1\\\\ 6x+b & x>1\\end{cases}$ deribagarria izan dadin.', 'Halla $a$ y $b$ para que $g(x)=\\begin{cases}ax^2 & x\\le 1\\\\ 6x+b & x>1\\end{cases}$ sea derivable.', 'أوجد $a$ و$b$ لتكون $g(x)=\\begin{cases}ax^2 & x\\le 1\\\\ 6x+b & x>1\\end{cases}$ قابلة للاشتقاق.', 'Find $a$ and $b$ so that $g(x)=\\begin{cases}ax^2 & x\\le 1\\\\ 6x+b & x>1\\end{cases}$ is differentiable.'),
        example: same('$\\begin{gathered}2a=6\\ \\to\\ a=3\\\\ a=6+b\\ \\to\\ b=-3\\end{gathered}$'),
        exampleAnswer: say('Malda berarekin $a=3$, eta balio berarekin $b=-3$.', 'Con la misma pendiente $a=3$, y con el mismo valor $b=-3$.', 'بالميل نفسه $a=3$، وبالقيمة نفسها $b=-3$.', 'With the same slope $a=3$, and with the same value $b=-3$.')
    },
    marginal: {
        definitions: [
            { term: say('Kostu marjinala', 'Coste marginal', 'التكلفة الحدية', 'Marginal cost'), meaning: say('$C\'(x)$: unitate bat gehiago egiteak gutxi gorabehera kostatzen duena.', '$C\'(x)$: lo que cuesta, más o menos, hacer una unidad más.', '$C\'(x)$: ما يكلّفه تقريبًا إنتاج وحدة إضافية.', '$C\'(x)$: roughly what one more unit costs.') }
        ],
        vocabulary: [
            say('kostua', 'coste', 'التكلفة', 'cost'),
            say('diru-sarrerak', 'ingresos', 'الإيراد', 'income'),
            say('gutxi gorabehera', 'aproximadamente', 'تقريبًا', 'roughly')
        ],
        explanation: say(
            'Deribatua aldaketa-erritmoa da, eta $x$ unitateetan neurtzen bada, $C\'(x)$ unitate bat gehiago egiteak kostatzen duenaren oso hurbil dago: $C(x+1)-C(x)$. Ekonomian kostu marjinala deitzen zaio. Gauza bera diru-sarrerekin eta irabaziarekin.',
            'La derivada es un ritmo de cambio, y si $x$ se mide en unidades, $C\'(x)$ está muy cerca de lo que cuesta hacer una unidad más: $C(x+1)-C(x)$. En economía se llama coste marginal. Lo mismo con los ingresos y el beneficio.',
            'المشتقة وتيرة تغيّر، وإذا قيس $x$ بالوحدات فإن $C\'(x)$ قريبة جدًا مما يكلّفه إنتاج وحدة إضافية: $C(x+1)-C(x)$. وتسمى في الاقتصاد التكلفة الحدية. وكذلك مع الإيراد والربح.',
            'The derivative is a rate of change, and if $x$ is measured in units, $C\'(x)$ is very close to what one more unit costs: $C(x+1)-C(x)$. In economics it is called the marginal cost. The same with income and profit.'
        ),
        examplePrompt: say('Diru-sarrerak $I(x)=60x-0{,}2x^2$ euro badira, zenbat ekarriko du gutxi gorabehera 101. unitateak?', 'Si los ingresos son $I(x)=60x-0{,}2x^2$ euros, ¿cuánto aportará más o menos la unidad 101?', 'إذا كان الإيراد $I(x)=60x-0{,}2x^2$ يورو، فكم ستضيف الوحدة 101 تقريبًا؟', 'If the income is $I(x)=60x-0{,}2x^2$ euros, roughly how much will unit 101 bring in?'),
        example: same("$I'(x)=60-0{,}4x\\ \\to\\ I'(100)=20$"),
        exampleAnswer: say('20 euro inguru: unitate bakoitzak gero eta gutxiago ekartzen du.', 'Unos 20 €: cada unidad aporta cada vez menos.', 'نحو 20 €: تضيف كل وحدة أقل فأقل.', 'About €20: each unit brings in less and less.'),
        why: {
            text: say(
                'Zergatik $C\'(x)\\approx C(x+1)-C(x)$? Ezkerrekoa T.V.M. da $h=1$ denean: $\\frac{C(x+1)-C(x)}{1}$. Unitateak asko direnean, $h=1$ oso txikia da eta T.V.M. deribatutik oso hurbil dago.',
                '¿Por qué $C\'(x)\\approx C(x+1)-C(x)$? Lo de la derecha es la T.V.M. con $h=1$: $\\frac{C(x+1)-C(x)}{1}$. Cuando hay muchas unidades, $h=1$ es muy pequeño y la T.V.M. está muy cerca de la derivada.',
                'لماذا $C\'(x)\\approx C(x+1)-C(x)$؟ الطرف الأيمن هو معدل التغير المتوسط مع $h=1$: ‏$\\frac{C(x+1)-C(x)}{1}$. وعندما تكثر الوحدات يكون $h=1$ صغيرًا جدًا ويقترب معدل التغير المتوسط من المشتقة.',
                'Why $C\'(x)\\approx C(x+1)-C(x)$? The right-hand side is the average rate with $h=1$: $\\frac{C(x+1)-C(x)}{1}$. When there are many units, $h=1$ is very small and the average rate is very close to the derivative.'
            )
        }
    }
}
