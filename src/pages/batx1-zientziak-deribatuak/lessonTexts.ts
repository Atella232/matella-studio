import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { BachDerivativesTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Deribatuak · Batxilergoa 1 · Zientziak — what each lesson tells: the
   new words (definitions), a short explanation, the example as an
   exercise («Another example»), the key words in four languages and, in
   five lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics and gives each language its
   trigonometric names (\sin is sen in Spanish). The example uses numbers
   of its own, never those of «Let's solve», of «Check it» or of the
   typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const bachDerivativesLessonTexts: Record<BachDerivativesTopicId, LessonTexts> = {
    /* ---------- 1. The rate of change ---------- */
    'average-rate': {
        definitions: [
            { term: say('Batez besteko aldakuntza-tasa', 'Tasa de variación media', 'معدل التغير المتوسط', 'Average rate of change'), meaning: say('$\\frac{f(b)-f(a)}{b-a}$: $f$ funtzioa zenbat aldatzen den $x$ aldagaiaren unitate bakoitzeko, $[a,b]$ tartean.', '$\\frac{f(b)-f(a)}{b-a}$: lo que cambia $f$ por cada unidad de $x$ en el intervalo $[a,b]$.', '$\\frac{f(b)-f(a)}{b-a}$: مقدار تغير $f$ لكل وحدة من $x$ في الفترة $[a,b]$.', '$\\frac{f(b)-f(a)}{b-a}$: how much $f$ changes for each unit of $x$ on the interval $[a,b]$.') },
            { term: say('Zuzen ebakitzailea', 'Recta secante', 'القاطع', 'Secant line'), meaning: say('Grafikoa bi puntutan ebakitzen duen zuzena; haren malda T.V.M. da.', 'La recta que corta la gráfica en dos puntos; su pendiente es la T.V.M.', 'المستقيم الذي يقطع الرسم في نقطتين؛ وميله هو معدل التغير المتوسط.', 'The line that cuts the graph at two points; its slope is the average rate.') }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'الفترة', 'interval'),
            say('batez besteko abiadura', 'velocidad media', 'السرعة المتوسطة', 'average speed')
        ],
        explanation: say(
            '$f$ funtzioaren T.V.M. $[a,b]$ tartean $f$ funtzioaren aldaketaren eta $x$ aldagaiaren aldaketaren arteko zatidura da: $\\frac{f(b)-f(a)}{b-a}$. Grafikoan, bi puntuetatik pasatzen den ebakitzailearen malda da. $f$ funtzioak mugikor baten posizioa ematen badu, T.V.M. denbora horretako batez besteko abiadura da.',
            'La T.V.M. de $f$ en $[a,b]$ es el cociente entre lo que cambia $f$ y lo que cambia $x$: $\\frac{f(b)-f(a)}{b-a}$. En la gráfica es la pendiente de la secante que pasa por los dos puntos. Si $f$ da la posición de un móvil, la T.V.M. es su velocidad media en ese tiempo.',
            'معدل التغير المتوسط لـ $f$ في $[a,b]$ هو خارج قسمة تغير $f$ على تغير $x$: $\\frac{f(b)-f(a)}{b-a}$. وهو في الرسم ميل القاطع المار بالنقطتين. وإذا كانت $f$ تعطي موضع متحرك فهو سرعته المتوسطة في تلك المدة.',
            'The average rate of $f$ on $[a,b]$ is the quotient of the change in $f$ by the change in $x$: $\\frac{f(b)-f(a)}{b-a}$. On the graph it is the slope of the secant through the two points. If $f$ gives the position of a moving object, the average rate is its average speed over that time.'
        ),
        examplePrompt: say('Kalkulatu $f(x)=x^3$ funtzioaren T.V.M. $[-1,\\,2]$ tartean.', 'Halla la T.V.M. de $f(x)=x^3$ en $[-1,\\,2]$.', 'أوجد معدل التغير المتوسط لـ $f(x)=x^3$ في $[-1,\\,2]$.', 'Find the average rate of $f(x)=x^3$ on $[-1,\\,2]$.'),
        example: same('$\\frac{8-(-1)}{2-(-1)}=\\frac{9}{3}=3$'),
        exampleAnswer: say('T.V.M. 3 da: batez beste, $f$ funtzioa 3 igotzen da $x$ aldagaiaren unitate bakoitzeko.', 'La T.V.M. es 3: de media, $f$ sube 3 por cada unidad de $x$.', 'المعدل 3: في المتوسط تزداد $f$ بمقدار 3 لكل وحدة من $x$.', 'The average rate is 3: on average, $f$ goes up 3 for each unit of $x$.')
    },
    'derivative-point': {
        definitions: [
            { term: say('Deribatua puntu batean', 'Derivada en un punto', 'المشتقة عند نقطة', 'Derivative at a point'), meaning: say('$f\'(a)$: $[a,\\,a+h]$ tarteko T.V.M.-aren limitea $h\\to 0$ denean, existitzen bada eta finitua bada.', '$f\'(a)$: el límite de la T.V.M. en $[a,\\,a+h]$ cuando $h\\to 0$, si existe y es finito.', '$f\'(a)$: نهاية معدل التغير المتوسط في $[a,\\,a+h]$ عندما $h\\to 0$، إن وُجدت وكانت منتهية.', '$f\'(a)$: the limit of the average rate on $[a,\\,a+h]$ as $h\\to 0$, if it exists and is finite.') }
        ],
        vocabulary: [
            say('zuzen ukitzailea', 'recta tangente', 'المماس', 'tangent line'),
            say('limitea', 'límite', 'النهاية', 'limit')
        ],
        explanation: say(
            '$[a,\\,a+h]$ tartea gero eta txikiagoa egiten bada, ebakitzaileak biratu egiten du kurba puntu bakar batean ukitu arte: zuzen ukitzailea da. Haren malda $f\'(a)$ deribatua da, T.V.M.-aren limitea $h\\to 0$ denean. Ordezkatuz gero $\\frac{0}{0}$ ateratzen da: lehenik sinplifikatu behar da.',
            'Si el intervalo $[a,\\,a+h]$ se hace cada vez más pequeño, la secante gira hasta tocar la curva en un solo punto: es la recta tangente. Su pendiente es la derivada $f\'(a)$, el límite de la T.V.M. cuando $h\\to 0$. Al sustituir sale $\\frac{0}{0}$: hay que simplificar antes.',
            'إذا صغرت الفترة $[a,\\,a+h]$ شيئًا فشيئًا دار القاطع حتى يمس المنحنى في نقطة واحدة: إنه المماس. وميله هو المشتقة $f\'(a)$، أي نهاية معدل التغير المتوسط عندما $h\\to 0$. وعند التعويض يظهر $\\frac{0}{0}$: يجب التبسيط أولًا.',
            'If the interval $[a,\\,a+h]$ gets smaller and smaller, the secant turns until it touches the curve at a single point: it is the tangent line. Its slope is the derivative $f\'(a)$, the limit of the average rate as $h\\to 0$. Substituting gives $\\frac{0}{0}$: you have to simplify first.'
        ),
        examplePrompt: say('Kalkulatu $f\'(-1)$ definizioaren bidez, $f(x)=x^2+x$ bada.', 'Calcula $f\'(-1)$ con la definición para $f(x)=x^2+x$.', 'احسب $f\'(-1)$ بالتعريف للدالة $f(x)=x^2+x$.', 'Work out $f\'(-1)$ from the definition for $f(x)=x^2+x$.'),
        example: same('$\\frac{(-1+h)^2+(-1+h)-0}{h}=\\frac{-h+h^2}{h}=-1+h$'),
        exampleAnswer: say('$h\\to 0$ eginez, $f\'(-1)=-1$.', 'Al hacer $h\\to 0$, $f\'(-1)=-1$.', 'عندما $h\\to 0$ نجد $f\'(-1)=-1$.', 'Letting $h\\to 0$, $f\'(-1)=-1$.'),
        why: {
            text: say(
                'Zergatik bihurtzen da ebakitzailea ukitzaile? $h$ txikia denean, bi puntuak ia bat datoz, eta ebakitzailea ia ez da bereizten kurbatik $a$ puntuaren ondoan. $x^2$ funtzioan, 3 puntuan, ebakitzaileen maldak 6 baliora hurbiltzen dira.',
                '¿Por qué la secante se convierte en tangente? Con $h$ pequeño, los dos puntos casi coinciden y la secante apenas se distingue de la curva cerca de $a$. Para $x^2$ en 3, las pendientes de las secantes se acercan a 6.',
                'لماذا يصير القاطع مماسًّا؟ عندما يكون $h$ صغيرًا تكاد النقطتان تتطابقان، ولا يكاد القاطع يتميز عن المنحنى قرب $a$. وفي $x^2$ عند 3 تقترب ميول القواطع من 6.',
                'Why does the secant become the tangent? With a small $h$, the two points almost coincide and the secant can hardly be told apart from the curve near $a$. For $x^2$ at 3, the slopes of the secants approach 6.'
            ),
            math: same('$h=0{,}1\\ \\to\\ 6{,}1\\qquad h=0{,}01\\ \\to\\ 6{,}01$')
        }
    },
    tangent: {
        definitions: [
            { term: say('Zuzen ukitzailea', 'Recta tangente', 'المماس', 'Tangent line'), meaning: say('$(a,\\,f(a))$ puntutik pasatzen den zuzena, $f\'(a)$ maldarekin.', 'La recta que pasa por $(a,\\,f(a))$ con pendiente $f\'(a)$.', 'المستقيم المار بالنقطة $(a,\\,f(a))$ بميل $f\'(a)$.', 'The line through $(a,\\,f(a))$ with slope $f\'(a)$.') },
            { term: say('Zuzen normala', 'Recta normal', 'المستقيم العمودي', 'Normal line'), meaning: say('Puntu berean zuzen ukitzailearekiko perpendikularra den zuzena.', 'La perpendicular a la tangente en el mismo punto.', 'المستقيم المتعامد مع المماس في النقطة نفسها.', 'The line perpendicular to the tangent at the same point.') }
        ],
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('horizontala', 'horizontal', 'أفقي', 'horizontal')
        ],
        explanation: say(
            '$(a,\\,f(a))$ puntuarekin eta $f\'(a)$ maldarekin, zuzen ukitzailea puntu-malda eran idazten da. Normala puntu beretik pasatzen da eta perpendikularra da: bi malden biderkadura $-1$ da. $f\'(a)=0$ bada, zuzen ukitzailea horizontala da, eta normala bertikala.',
            'Con el punto $(a,\\,f(a))$ y la pendiente $f\'(a)$ se escribe la tangente en forma punto-pendiente. La normal pasa por el mismo punto y es perpendicular: el producto de las dos pendientes es $-1$. Si $f\'(a)=0$, la tangente es horizontal y la normal, vertical.',
            'بالنقطة $(a,\\,f(a))$ والميل $f\'(a)$ يُكتب المماس بصيغة النقطة والميل. ويمر العمودي بالنقطة نفسها ويكون متعامدًا معه: جداء الميلين $-1$. وإذا كانت $f\'(a)=0$ فالمماس أفقي والعمودي رأسي.',
            'With the point $(a,\\,f(a))$ and the slope $f\'(a)$, the tangent is written in point-slope form. The normal goes through the same point and is perpendicular: the product of the two slopes is $-1$. If $f\'(a)=0$, the tangent is horizontal and the normal vertical.'
        ),
        examplePrompt: say('Idatzi $f(x)=x^3$ funtzioaren zuzen ukitzailea $x=2$ puntuan, $f\'(2)=12$ dela jakinda.', 'Escribe la tangente a $f(x)=x^3$ en $x=2$, sabiendo que $f\'(2)=12$.', 'اكتب مماس $f(x)=x^3$ عند $x=2$ علمًا أن $f\'(2)=12$.', 'Write the tangent to $f(x)=x^3$ at $x=2$, knowing that $f\'(2)=12$.'),
        example: same('$y-8=12(x-2)\\ \\to\\ y=12x-16$'),
        exampleAnswer: say('Zuzen ukitzailea $y=12x-16$ da; normalaren malda $-\\frac{1}{12}$ litzateke.', 'La tangente es $y=12x-16$; la normal tendría pendiente $-\\frac{1}{12}$.', 'المماس $y=12x-16$؛ وميل العمودي $-\\frac{1}{12}$.', 'The tangent is $y=12x-16$; the normal would have slope $-\\frac{1}{12}$.')
    },

    /* ---------- 2. Differentiability ---------- */
    'one-sided-derivatives': {
        definitions: [
            { term: say('Alboko deribatuak', 'Derivadas laterales', 'المشتقتان الجانبيتان', 'One-sided derivatives'), meaning: say('$f\'(a^-)$ eta $f\'(a^+)$: $a$ puntuaren ezkerreko eta eskuineko maldak.', '$f\'(a^-)$ y $f\'(a^+)$: las pendientes a la izquierda y a la derecha de $a$.', '$f\'(a^-)$ و$f\'(a^+)$: الميلان إلى يسار $a$ وإلى يمينه.', '$f\'(a^-)$ and $f\'(a^+)$: the slopes to the left and to the right of $a$.') },
            { term: say('Punta', 'Pico', 'الزاوية', 'Corner'), meaning: say('Grafikoak norabidea bat-batean aldatzen duen puntua: alboko deribatuak desberdinak dira.', 'Un punto donde la gráfica cambia de dirección de golpe: las derivadas laterales son distintas.', 'نقطة يغيّر فيها الرسم اتجاهه فجأة: المشتقتان الجانبيتان مختلفتان.', 'A point where the graph changes direction suddenly: the one-sided derivatives are different.') }
        ],
        vocabulary: [
            say('ezkerra', 'izquierda', 'اليسار', 'left'),
            say('eskuina', 'derecha', 'اليمين', 'right')
        ],
        explanation: say(
            'Zatika definitutako funtzio batean, edo balio absolutu batekin, $a$ puntuaren alde bakoitzak bere malda izan dezake. Alboko deribatuak bi malda horiek dira. Berdinak badira, funtzioa deribagarria da $a$ puntuan; bestela, grafikoak punta bat egiten du eta ez dago zuzen ukitzaile bakarrik.',
            'En una función a trozos, o con un valor absoluto, cada lado de $a$ puede tener su propia pendiente. Las derivadas laterales son esas dos pendientes. Si coinciden, la función es derivable en $a$; si no, la gráfica hace un pico y no hay una sola tangente.',
            'في دالة معرّفة على أجزاء، أو مع قيمة مطلقة، قد يكون لكل جانب من $a$ ميله الخاص. والمشتقتان الجانبيتان هما هذان الميلان. فإذا تساوتا كانت الدالة قابلة للاشتقاق عند $a$، وإلا صنع الرسم زاوية ولم يكن هناك مماس واحد.',
            'In a piecewise function, or with an absolute value, each side of $a$ can have its own slope. The one-sided derivatives are those two slopes. If they are equal, the function is differentiable at $a$; if not, the graph has a corner and there is no single tangent.'
        ),
        examplePrompt: say('Deribagarria al da $g(x)=|x+1|$ funtzioa $x=-1$ puntuan?', '¿Es derivable $g(x)=|x+1|$ en $x=-1$?', 'هل $g(x)=|x+1|$ قابلة للاشتقاق عند $x=-1$؟', 'Is $g(x)=|x+1|$ differentiable at $x=-1$?'),
        example: same('$g\'((-1)^-)=-1\\qquad g\'((-1)^+)=1$'),
        exampleAnswer: say('Ez: alboko deribatuak $-1$ eta 1 dira, eta $x=-1$ puntuan punta bat dago.', 'No: las derivadas laterales son $-1$ y 1, y en $x=-1$ hay un pico.', 'لا: المشتقتان الجانبيتان $-1$ و1، وعند $x=-1$ توجد زاوية.', 'No: the one-sided derivatives are $-1$ and 1, and at $x=-1$ there is a corner.')
    },
    'derivable-continuous': {
        definitions: [
            { term: say('Funtzio deribagarria', 'Función derivable', 'دالة قابلة للاشتقاق', 'Differentiable function'), meaning: say('Tarte bateko puntu guztietan deribatua duena: grafiko leuna, jauzirik eta puntarik gabe.', 'La que tiene derivada en cada punto de un intervalo: su gráfica es suave, sin saltos ni picos.', 'التي لها مشتقة عند كل نقطة من فترة: رسمها أملس بلا قفزات ولا زوايا.', 'One with a derivative at every point of an interval: its graph is smooth, with no jumps or corners.') }
        ],
        vocabulary: [
            say('jauzia', 'salto', 'القفزة', 'jump'),
            say('jarraitutasuna', 'continuidad', 'الاتصال', 'continuity')
        ],
        explanation: say(
            'Funtzio bat $a$ puntuan deribagarria bada, $a$ puntuan jarraitua ere bada: zuzen ukitzaile batek kurba ez haustea behar du. Horregatik, jauzia dagoen tokian ez dago deribaturik, nahiz eta zatiek malda bera izan. Alderantziz ez da betetzen: funtzio jarraitu batek punta bat izan dezake.',
            'Si una función es derivable en $a$, también es continua en $a$: una tangente necesita que la curva no se rompa. Por eso, donde hay un salto no hay derivada, aunque los trozos tengan la misma pendiente. Al revés no funciona: una función continua puede tener un pico.',
            'إذا كانت الدالة قابلة للاشتقاق عند $a$ فهي متصلة عند $a$ أيضًا: يحتاج المماس إلى منحنى غير منقطع. لذلك لا توجد مشتقة حيث توجد قفزة، ولو كان للجزأين الميل نفسه. والعكس لا يصح: قد يكون لدالة متصلة زاوية.',
            'If a function is differentiable at $a$, it is also continuous at $a$: a tangent needs a curve that does not break. So where there is a jump there is no derivative, even if the pieces have the same slope. The converse fails: a continuous function can have a corner.'
        ),
        examplePrompt: say('Deribagarria al da funtzio hau $x=2$ puntuan? $f(x)=\\begin{cases}3x & x<2\\\\ 3x-1 & x\\ge 2\\end{cases}$', '¿Es derivable en $x=2$ esta función? $f(x)=\\begin{cases}3x & x<2\\\\ 3x-1 & x\\ge 2\\end{cases}$', 'هل هذه الدالة قابلة للاشتقاق عند $x=2$؟ $f(x)=\\begin{cases}3x & x<2\\\\ 3x-1 & x\\ge 2\\end{cases}$', 'Is this function differentiable at $x=2$? $f(x)=\\begin{cases}3x & x<2\\\\ 3x-1 & x\\ge 2\\end{cases}$'),
        example: same('$\\lim_{x\\to 2^-}f(x)=6\\qquad f(2)=5$'),
        exampleAnswer: say('Ez da jarraitua 2 puntuan; beraz, ez da deribagarria, nahiz eta bi maldak 3 izan.', 'No es continua en 2, así que no es derivable, aunque las dos pendientes valgan 3.', 'ليست متصلة عند 2، إذن ليست قابلة للاشتقاق، مع أن الميلين يساويان 3.', 'It is not continuous at 2, so it is not differentiable, even though both slopes are 3.'),
        why: {
            text: say(
                'Zergatik da jarraitua funtzio deribagarri bat? $f(a+h)-f(a)$ kendura T.V.M. bider $h$ da. T.V.M. $f\'(a)$ baliora doa eta $h$ zero baliora; beraz, biderkadura $f\'(a)\\cdot 0=0$ baliora doa: $f(a+h)$ balioa $f(a)$ baliora hurbiltzen da.',
                '¿Por qué derivable implica continua? La diferencia $f(a+h)-f(a)$ es la T.V.M. por $h$. Si la T.V.M. tiende a $f\'(a)$ y $h$ tiende a 0, el producto tiende a $f\'(a)\\cdot 0=0$: $f(a+h)$ se acerca a $f(a)$.',
                'لماذا تكون الدالة القابلة للاشتقاق متصلة؟ الفرق $f(a+h)-f(a)$ هو معدل التغير المتوسط مضروبًا في $h$. فإذا آل المعدل إلى $f\'(a)$ وآل $h$ إلى 0 آل الجداء إلى $f\'(a)\\cdot 0=0$: تقترب $f(a+h)$ من $f(a)$.',
                'Why is a differentiable function continuous? The difference $f(a+h)-f(a)$ is the average rate times $h$. If the average rate tends to $f\'(a)$ and $h$ tends to 0, the product tends to $f\'(a)\\cdot 0=0$: $f(a+h)$ approaches $f(a)$.'
            ),
            math: same('$f(a+h)-f(a)=\\frac{f(a+h)-f(a)}{h}\\cdot h$')
        }
    },
    'piecewise-derivable': {
        definitions: [
            { term: say('Parametroa', 'Parámetro', 'الوسيط', 'Parameter'), meaning: say('$a$ edo $b$ bezalako letra bat, funtzioak baldintza bat bete dezan aukeratzen dena.', 'Una letra, como $a$ o $b$, que se elige para que la función cumpla una condición.', 'حرف مثل $a$ أو $b$ يُختار كي تحقق الدالة شرطًا.', 'A letter, such as $a$ or $b$, chosen so that the function meets a condition.') }
        ],
        vocabulary: [
            say('lotunea', 'unión', 'نقطة الالتقاء', 'join'),
            say('ekuazio-sistema', 'sistema', 'النظام', 'system')
        ],
        explanation: say(
            'Bi parametrorekin bi ekuazio behar dira. Lehenengoa jarraitutasunetik dator: bi zatiek balio bera dute lotunean. Bigarrena deribagarritasunetik: bi zatien deribatuek balio bera dute puntu horretan. Ondoren, ekuazio-sistema ebazten da.',
            'Con dos parámetros hacen falta dos ecuaciones. La primera sale de la continuidad: los dos trozos valen lo mismo en la unión. La segunda, de la derivabilidad: las derivadas de los dos trozos valen lo mismo en ese punto. Después se resuelve el sistema.',
            'مع وسيطين تلزم معادلتان. الأولى من الاتصال: للجزأين القيمة نفسها عند نقطة الالتقاء. والثانية من قابلية الاشتقاق: لمشتقتي الجزأين القيمة نفسها عند تلك النقطة. ثم يُحل النظام.',
            'With two parameters you need two equations. The first comes from continuity: the two pieces have the same value at the join. The second from differentiability: the derivatives of the two pieces have the same value at that point. Then you solve the system.'
        ),
        examplePrompt: say('Aurkitu $a$ eta $b$, funtzioa $x=2$ puntuan deribagarria izan dadin: $f(x)=\\begin{cases}ax^2 & x<2\\\\ 4x+b & x\\ge 2\\end{cases}$', 'Halla $a$ y $b$ para que sea derivable en $x=2$: $f(x)=\\begin{cases}ax^2 & x<2\\\\ 4x+b & x\\ge 2\\end{cases}$', 'أوجد $a$ و$b$ كي تكون قابلة للاشتقاق عند $x=2$: $f(x)=\\begin{cases}ax^2 & x<2\\\\ 4x+b & x\\ge 2\\end{cases}$', 'Find $a$ and $b$ so that it is differentiable at $x=2$: $f(x)=\\begin{cases}ax^2 & x<2\\\\ 4x+b & x\\ge 2\\end{cases}$'),
        example: same('$4a=8+b\\qquad 4a=4$'),
        exampleAnswer: say('$a=1$ eta $b=-4$.', '$a=1$ y $b=-4$.', '$a=1$ و$b=-4$.', '$a=1$ and $b=-4$.')
    },

    /* ---------- 3. The derivative function ---------- */
    definition: {
        definitions: [
            { term: say('Funtzio deribatua', 'Función derivada', 'الدالة المشتقة', 'Derivative function'), meaning: say('$f\'$: $x$ bakoitzari puntu horretako $f$ funtzioaren malda ematen dion funtzioa.', '$f\'$: la función que da a cada $x$ la pendiente de $f$ en ese punto.', '$f\'$: الدالة التي تعطي كل $x$ ميل $f$ عند تلك النقطة.', '$f\'$: the function that gives each $x$ the slope of $f$ at that point.') }
        ],
        vocabulary: [
            say('garatu', 'desarrollar', 'انشر', 'expand'),
            say('sinplifikatu', 'simplificar', 'بسّط', 'simplify')
        ],
        explanation: say(
            'Definizioak edozein $x$ baliotarako balio du: $\\frac{f(x+h)-f(x)}{h}$ kalkulatzen da, izendatzaileko $h$ sinplifikatzen da eta $h\\to 0$ egiten da. Emaitza, $f\'(x)$, beste funtzio bat da. $x$ bakoitzean, $f$ funtzioaren malda da puntu horretan.',
            'La definición vale para cualquier $x$: se calcula $\\frac{f(x+h)-f(x)}{h}$, se simplifica la $h$ del denominador y se hace $h\\to 0$. El resultado, $f\'(x)$, es otra función. Su valor en cada $x$ es la pendiente de $f$ en ese punto.',
            'يصح التعريف لأي $x$: نحسب $\\frac{f(x+h)-f(x)}{h}$ ونبسّط $h$ في المقام ثم نجعل $h\\to 0$. والنتيجة $f\'(x)$ دالة أخرى، وقيمتها عند كل $x$ هي ميل $f$ عند تلك النقطة.',
            'The definition works for any $x$: you work out $\\frac{f(x+h)-f(x)}{h}$, simplify the $h$ of the denominator and let $h\\to 0$. The result, $f\'(x)$, is another function. Its value at each $x$ is the slope of $f$ at that point.'
        ),
        examplePrompt: say('Kalkulatu $f\'(x)$ definizioaren bidez, $f(x)=5x-x^2$ bada.', 'Halla $f\'(x)$ con la definición para $f(x)=5x-x^2$.', 'أوجد $f\'(x)$ بالتعريف للدالة $f(x)=5x-x^2$.', 'Find $f\'(x)$ from the definition for $f(x)=5x-x^2$.'),
        example: same('$\\frac{5h-2xh-h^2}{h}=5-2x-h$'),
        exampleAnswer: say('$h\\to 0$ eginez, $f\'(x)=5-2x$.', 'Al hacer $h\\to 0$, $f\'(x)=5-2x$.', 'عندما $h\\to 0$ نجد $f\'(x)=5-2x$.', 'Letting $h\\to 0$, $f\'(x)=5-2x$.')
    },
    powers: {
        definitions: [
            { term: say('Berreturaren erregela', 'Regla de la potencia', 'قاعدة القوة', 'Power rule'), meaning: say('$(x^n)\'=n\\,x^{n-1}$: berretzailea aurrera jaisten da, eta berretzaile berria bat txikiagoa da.', '$(x^n)\'=n\\,x^{n-1}$: el exponente baja delante y el nuevo exponente es uno menos.', '$(x^n)\'=n\\,x^{n-1}$: ينزل الأس إلى الأمام ويصير الأس الجديد أقل بواحد.', '$(x^n)\'=n\\,x^{n-1}$: the exponent comes down in front and the new exponent is one less.') }
        ],
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('erroa', 'raíz', 'الجذر', 'root')
        ],
        explanation: say(
            '$(x^n)\'=n\\,x^{n-1}$ erregelak berretzaile oso, negatibo eta zatikiekin balio du. Horregatik, deribatu aurretik erro bakoitza eta zatiki bakoitza berretura gisa idazten dira: $\\sqrt[3]{x}=x^{\\frac{1}{3}}$ eta $\\frac{1}{x}=x^{-1}$. Gero emaitza berretzaile negatiborik gabe idazten da berriro.',
            'La regla $(x^n)\'=n\\,x^{n-1}$ vale para exponentes enteros, negativos y fraccionarios. Por eso, antes de derivar se escribe cada raíz y cada fracción como potencia: $\\sqrt[3]{x}=x^{\\frac{1}{3}}$ y $\\frac{1}{x}=x^{-1}$. Después se vuelve a escribir el resultado sin exponentes negativos.',
            'تصح القاعدة $(x^n)\'=n\\,x^{n-1}$ للأسس الصحيحة والسالبة والكسرية. لذلك نكتب قبل الاشتقاق كل جذر وكل كسر على صورة قوة: $\\sqrt[3]{x}=x^{\\frac{1}{3}}$ و$\\frac{1}{x}=x^{-1}$، فالجذر التكعيبي قوة أسها ثلث. ثم نعيد كتابة النتيجة دون أسس سالبة.',
            'The rule $(x^n)\'=n\\,x^{n-1}$ works for whole, negative and fractional exponents. So before differentiating you write each root and each fraction as a power: $\\sqrt[3]{x}=x^{\\frac{1}{3}}$ and $\\frac{1}{x}=x^{-1}$. Then you write the result again without negative exponents.'
        ),
        examplePrompt: say('Deribatu $f(x)=\\sqrt[3]{x^2}$.', 'Deriva $f(x)=\\sqrt[3]{x^2}$.', 'اشتق $f(x)=\\sqrt[3]{x^2}$.', 'Differentiate $f(x)=\\sqrt[3]{x^2}$.'),
        example: same('$x^{\\frac{2}{3}}\\ \\to\\ \\frac{2}{3}x^{-\\frac{1}{3}}$'),
        exampleAnswer: say('$f\'(x)=\\frac{2}{3\\sqrt[3]{x}}$, erro batekin idatzita.', '$f\'(x)=\\frac{2}{3\\sqrt[3]{x}}$, escrita con una raíz.', '$f\'(x)=\\frac{2}{3\\sqrt[3]{x}}$ مكتوبة بجذر.', '$f\'(x)=\\frac{2}{3\\sqrt[3]{x}}$, written with a root.'),
        why: {
            text: say(
                'Zergatik jaisten da berretzailea? $x^3$ funtzioan, $(x+h)^3$ garatzean $x^3+3x^2h+\\ldots$ ateratzen da, eta gainerakoek $h^2$ edo $h^3$ daramate. $h$ aldagaiaz zatitu eta $h\\to 0$ egitean, $3x^2$ bakarrik geratzen da.',
                '¿Por qué baja el exponente? Para $x^3$, al desarrollar $(x+h)^3$ sale $x^3+3x^2h+\\ldots$, y el resto lleva $h^2$ o $h^3$. Al dividir entre $h$ y hacer $h\\to 0$ solo queda $3x^2$.',
                'لماذا ينزل الأس؟ في $x^3$ عند نشر $(x+h)^3$ نجد $x^3+3x^2h+\\ldots$، وبقية الحدود فيها $h^2$ أو $h^3$. وعند القسمة على $h$ وجعل $h\\to 0$ لا يبقى إلا $3x^2$.',
                'Why does the exponent come down? For $x^3$, expanding $(x+h)^3$ gives $x^3+3x^2h+\\ldots$, and the rest carries $h^2$ or $h^3$. Dividing by $h$ and letting $h\\to 0$ leaves only $3x^2$.'
            ),
            math: same('$\\frac{(x+h)^3-x^3}{h}=3x^2+3xh+h^2$')
        }
    },
    'sum-constant': {
        definitions: [
            { term: say('Gaia', 'Término', 'الحد', 'Term'), meaning: say('Polinomio baten batugai bakoitza, $-5x^2$ edo $7x$ bezala.', 'Cada sumando de un polinomio, como $-5x^2$ o $7x$.', 'كل مجموع جزئي في حدودية، مثل $-5x^2$ أو $7x$.', 'Each addend of a polynomial, such as $-5x^2$ or $7x$.') }
        ],
        vocabulary: [
            say('konstantea', 'constante', 'الثابت', 'constant'),
            say('polinomioa', 'polinomio', 'الحدودية', 'polynomial')
        ],
        explanation: say(
            'Batura baten deribatua deribatuen batura da, eta biderkatzen duen konstante bat aurrean geratzen da. Zenbaki bakar baten deribatua 0 da: grafikoa igo edo jaitsi egiten du, baina ez du malda aldatzen. Horrela, polinomio bat gaiz gai deribatzen da, berreturaren erregelarekin.',
            'La derivada de una suma es la suma de las derivadas, y una constante que multiplica se queda delante. Un número suelto se deriva como 0: sube o baja la gráfica, pero no cambia su pendiente. Así, un polinomio se deriva término a término con la regla de la potencia.',
            'مشتقة المجموع هي مجموع المشتقات، والثابت الذي يضرب يبقى في الأمام. ومشتقة العدد المنفرد 0: يرفع الرسم أو يخفضه لكنه لا يغيّر ميله. وهكذا تُشتق الحدودية حدًّا حدًّا بقاعدة القوة.',
            'The derivative of a sum is the sum of the derivatives, and a constant that multiplies stays in front. A number on its own differentiates to 0: it moves the graph up or down but does not change its slope. So a polynomial is differentiated term by term with the power rule.'
        ),
        examplePrompt: say('Kalkulatu $f\'(2)$, $f(x)=x^4-6x+10$ bada.', 'Halla $f\'(2)$ para $f(x)=x^4-6x+10$.', 'أوجد $f\'(2)$ للدالة $f(x)=x^4-6x+10$.', 'Find $f\'(2)$ for $f(x)=x^4-6x+10$.'),
        example: same('$f\'(x)=4x^3-6\\ \\to\\ f\'(2)=32-6=26$'),
        exampleAnswer: say('$f\'(2)=26$: 10 konstanteak ez du ezer egiten.', '$f\'(2)=26$: la constante 10 no cuenta.', '$f\'(2)=26$: الثابت 10 لا يؤثر.', '$f\'(2)=26$: the constant 10 does not count.')
    },

    /* ---------- 4. Rules of differentiation ---------- */
    product: {
        definitions: [
            { term: say('Biderkaduraren erregela', 'Regla del producto', 'قاعدة الجداء', 'Product rule'), meaning: say('$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$: faktore bakoitza txandaka deribatzen da, bestea bere horretan utzita.', '$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$: se deriva cada factor por turno, dejando el otro igual.', '$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$: يُشتق كل عامل بالدور ويبقى الآخر كما هو.', '$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$: each factor is differentiated in turn, leaving the other as it is.') }
        ],
        vocabulary: [
            say('faktorea', 'factor', 'العامل', 'factor'),
            say('biderkadura', 'producto', 'الجداء', 'product')
        ],
        explanation: say(
            '$f\\cdot g$ deribatzeko, faktore bat deribatu eta bestea utzi egiten da, gero alderantziz, eta bi emaitzak batu. Ez da nahikoa deribatuak biderkatzea: $(x\\cdot x)\'=2x$, baina $1\\cdot 1=1$. Batzuetan azkarragoa da lehenik biderkatu eta polinomioa deribatzea.',
            'Para derivar $f\\cdot g$ se deriva un factor y se deja el otro, luego al revés, y se suman los dos resultados. No basta con multiplicar las derivadas: $(x\\cdot x)\'=2x$, pero $1\\cdot 1=1$. A veces es más rápido multiplicar primero y derivar el polinomio.',
            'لاشتقاق $f\\cdot g$ نشتق عاملًا ونترك الآخر، ثم بالعكس، ونجمع النتيجتين. ولا يكفي ضرب المشتقات: $(x\\cdot x)\'=2x$ لكن $1\\cdot 1=1$. وأحيانًا يكون الأسرع أن نضرب أولًا ثم نشتق الحدودية.',
            'To differentiate $f\\cdot g$ you differentiate one factor and leave the other, then the other way round, and add the two results. Multiplying the derivatives is not enough: $(x\\cdot x)\'=2x$, but $1\\cdot 1=1$. Sometimes it is quicker to multiply first and differentiate the polynomial.'
        ),
        examplePrompt: say('Deribatu $f(x)=x^3(2x+5)$.', 'Deriva $f(x)=x^3(2x+5)$.', 'اشتق $f(x)=x^3(2x+5)$.', 'Differentiate $f(x)=x^3(2x+5)$.'),
        example: same('$f\'(x)=3x^2(2x+5)+x^3\\cdot 2=8x^3+15x^2$'),
        exampleAnswer: say('Lehenik biderkatuz gero, $2x^4+5x^3$, gauza bera ateratzen da.', 'Multiplicando primero, $2x^4+5x^3$, sale lo mismo.', 'وبالضرب أولًا، $2x^4+5x^3$، نحصل على النتيجة نفسها.', 'Multiplying first, $2x^4+5x^3$, gives the same.'),
        why: {
            text: say(
                'Nondik dator batura? Pentsatu $f$ eta $g$ aldeetako laukizuzen batean. Aldeak pixka bat hazten badira, azalerak bi zerrenda irabazten ditu, $\\Delta f\\cdot g$ eta $f\\cdot\\Delta g$, eta hain izkina txikia, ezen ez baitu kontatzen.',
                '¿De dónde sale la suma? Piensa en un rectángulo de lados $f$ y $g$. Si los lados crecen un poco, el área gana dos tiras, $\\Delta f\\cdot g$ y $f\\cdot\\Delta g$, y una esquina tan pequeña que no cuenta.',
                'من أين يأتي المجموع؟ فكّر في مستطيل ضلعاه $f$ و$g$. إذا كبر الضلعان قليلًا ربحت المساحة شريطين، $\\Delta f\\cdot g$ و$f\\cdot\\Delta g$، وزاوية صغيرة جدًّا لا تُحسب.',
                'Where does the sum come from? Think of a rectangle with sides $f$ and $g$. If the sides grow a little, the area gains two strips, $\\Delta f\\cdot g$ and $f\\cdot\\Delta g$, and a corner so small that it does not count.'
            ),
            math: same('$\\Delta(f\\cdot g)\\approx\\Delta f\\cdot g+f\\cdot\\Delta g$')
        }
    },
    quotient: {
        definitions: [
            { term: say('Zatiduraren erregela', 'Regla del cociente', 'قاعدة خارج القسمة', 'Quotient rule'), meaning: say('$\\left(\\frac{f}{g}\\right)\'=\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$, $g\\neq 0$ denean.', '$\\left(\\frac{f}{g}\\right)\'=\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$, con $g\\neq 0$.', '$\\left(\\frac{f}{g}\\right)\'=\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$ مع $g\\neq 0$.', '$\\left(\\frac{f}{g}\\right)\'=\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$, with $g\\neq 0$.') }
        ],
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Zenbakitzailean, lehenik goikoaren deribatua bider izendatzailea doa, eta gero zenbakitzailea bider behekoaren deribatua kentzen da; dena izendatzailea ber bi zati. Ordena aldatuz gero, aurkako zeinua ateratzen da. Izendatzailea ber bi ez da garatzen.',
            'En el numerador va primero la derivada de arriba por el denominador, y después se resta el numerador por la derivada de abajo; todo entre el denominador al cuadrado. Si se cambia el orden, sale el signo contrario. El denominador al cuadrado no se desarrolla.',
            'في البسط نضع أولًا مشتقة البسط في المقام، ثم نطرح البسط في مشتقة المقام، والكل على مربع المقام. وإذا غيّرنا الترتيب ظهرت الإشارة المعاكسة. ولا يُنشر مربع المقام.',
            'In the numerator, first the derivative of the top times the denominator, and then subtract the numerator times the derivative of the bottom; all over the denominator squared. If you change the order, you get the opposite sign. The squared denominator is not expanded.'
        ),
        examplePrompt: say('Deribatu $f(x)=\\frac{x^2}{x+4}$.', 'Deriva $f(x)=\\frac{x^2}{x+4}$.', 'اشتق $f(x)=\\frac{x^2}{x+4}$.', 'Differentiate $f(x)=\\frac{x^2}{x+4}$.'),
        example: same('$f\'(x)=\\frac{2x(x+4)-x^2}{(x+4)^2}=\\frac{x^2+8x}{(x+4)^2}$'),
        exampleAnswer: say('Zenbakitzailea garatzen da; izendatzailea, ez.', 'Se desarrolla el numerador; el denominador, no.', 'يُنشر البسط، أما المقام فلا.', 'The numerator is expanded; the denominator is not.')
    },
    chain: {
        definitions: [
            { term: say('Funtzio konposatua', 'Función compuesta', 'الدالة المركبة', 'Composite function'), meaning: say('$g(f(x))$: lehenik $f$ funtzioak eragiten du, barrukoak, eta haren emaitzari $g$ funtzioak, kanpokoak.', '$g(f(x))$: primero actúa $f$, la de dentro, y sobre su resultado actúa $g$, la de fuera.', '$g(f(x))$: تعمل أولًا $f$ الداخلية، ثم تعمل $g$ الخارجية على نتيجتها.', '$g(f(x))$: first $f$ acts, the inside one, and then $g$ acts on its result, the outside one.') }
        ],
        vocabulary: [
            say('barrukoa', 'dentro', 'الداخلية', 'inside'),
            say('kanpokoa', 'fuera', 'الخارجية', 'outside')
        ],
        explanation: say(
            'Funtzio konposatu bat bi makinaren katea da. Deribatzeko, kanpokoa deribatzen da barrukoa letra bakar bat balitz bezala, eta barrukoaren deribatuaz biderkatzen da. Horrela, $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$ edo $(u^n)\'=n\\,u^{n-1}\\cdot u\'$.',
            'Una función compuesta es una cadena de dos máquinas. Para derivarla, se deriva la de fuera como si lo de dentro fuera una sola letra, y se multiplica por la derivada de lo de dentro. Así $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$ o $(u^n)\'=n\\,u^{n-1}\\cdot u\'$.',
            'الدالة المركبة سلسلة من آلتين. لاشتقاقها نشتق الخارجية كأن الداخل حرف واحد، ثم نضرب في مشتقة الداخلية. وهكذا $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$ أو $(u^n)\'=n\\,u^{n-1}\\cdot u\'$.',
            'A composite function is a chain of two machines. To differentiate it, you differentiate the outside one as if the inside were a single letter, and multiply by the derivative of the inside. So $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$ or $(u^n)\'=n\\,u^{n-1}\\cdot u\'$.'
        ),
        examplePrompt: say('Deribatu $f(x)=\\sqrt{4x+1}$.', 'Deriva $f(x)=\\sqrt{4x+1}$.', 'اشتق $f(x)=\\sqrt{4x+1}$.', 'Differentiate $f(x)=\\sqrt{4x+1}$.'),
        example: same('$f\'(x)=\\frac{4}{2\\sqrt{4x+1}}=\\frac{2}{\\sqrt{4x+1}}$'),
        exampleAnswer: say('Barrukoa $4x+1$ da, eta haren deribatua 4.', 'Dentro está $4x+1$, cuya derivada es 4.', 'في الداخل $4x+1$ ومشتقتها 4.', 'Inside there is $4x+1$, whose derivative is 4.'),
        why: {
            text: say(
                'Zergatik biderkatzen dira? $u$ aldagaia $x$ baino 2 aldiz azkarrago aldatzen bada, eta $g$ funtzioa $u$ baino 5 aldiz azkarrago, orduan $g$ funtzioa $5\\cdot 2=10$ aldiz azkarrago aldatzen da $x$ baino. Maldak biderkatuz kateatzen dira.',
                '¿Por qué se multiplican? Si $u$ cambia 2 veces más rápido que $x$, y $g$ cambia 5 veces más rápido que $u$, entonces $g$ cambia $5\\cdot 2=10$ veces más rápido que $x$. Las pendientes se encadenan multiplicándose.',
                'لماذا تُضرب؟ إذا تغيّر $u$ أسرع من $x$ مرتين، وتغيّرت $g$ أسرع من $u$ خمس مرات، فإن $g$ تتغير بمقدار $5\\cdot 2=10$ مرات أسرع من $x$. فالميول تتسلسل بالضرب.',
                'Why do they multiply? If $u$ changes 2 times as fast as $x$, and $g$ changes 5 times as fast as $u$, then $g$ changes $5\\cdot 2=10$ times as fast as $x$. The slopes chain together by multiplying.'
            ),
            math: same('$\\frac{\\Delta g}{\\Delta x}=\\frac{\\Delta g}{\\Delta u}\\cdot\\frac{\\Delta u}{\\Delta x}$')
        }
    },

    /* ---------- 5. Elementary functions ---------- */
    'exp-log': {
        definitions: [
            { term: say('e zenbakia', 'Número e', 'العدد e', 'The number e'), meaning: say('Funtzio esponentzialak $x=0$ puntuan 1 malda izan dezan oinarria: horregatik $(e^x)\'=e^x$.', 'La base cuya exponencial tiene pendiente 1 en $x=0$: por eso $(e^x)\'=e^x$.', 'الأساس الذي يكون ميل دالته الأسية 1 عند $x=0$: لذلك $(e^x)\'=e^x$.', 'The base whose exponential has slope 1 at $x=0$: that is why $(e^x)\'=e^x$.') }
        ],
        vocabulary: [
            say('esponentziala', 'exponencial', 'الأسية', 'exponential'),
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm')
        ],
        explanation: say(
            '$e^x$ esponentziala bere deribatuarekin bat datorren funtzio bakarra da. Beste oinarri batzuekin $\\ln a$ faktorea agertzen da. Logaritmo nepertarraren deribatua $\\frac{1}{x}$ da, $x>0$ denean. Barruan $u$ funtzio bat badago, katearen erregela aplikatzen da.',
            'La exponencial $e^x$ es la única función que coincide con su derivada. Para otras bases aparece el factor $\\ln a$. El logaritmo neperiano tiene derivada $\\frac{1}{x}$, para $x>0$. Si dentro hay una función $u$, se aplica la regla de la cadena.',
            'الدالة الأسية $e^x$ هي الدالة الوحيدة التي تساوي مشتقتها. ومع أسس أخرى يظهر العامل $\\ln a$. ومشتقة اللوغاريتم الطبيعي $\\frac{1}{x}$ عندما $x>0$. وإذا كان في الداخل دالة $u$ طُبّقت قاعدة السلسلة.',
            'The exponential $e^x$ is the only function equal to its own derivative. For other bases the factor $\\ln a$ appears. The natural logarithm has derivative $\\frac{1}{x}$, for $x>0$. If there is a function $u$ inside, the chain rule applies.'
        ),
        examplePrompt: say('Deribatu $f(x)=x\\,e^{2x}$.', 'Deriva $f(x)=x\\,e^{2x}$.', 'اشتق $f(x)=x\\,e^{2x}$.', 'Differentiate $f(x)=x\\,e^{2x}$.'),
        example: same('$f\'(x)=e^{2x}+x\\,e^{2x}\\cdot 2=(1+2x)e^{2x}$'),
        exampleAnswer: say('Biderkadura bat da, eta bigarren faktoreak katea behar du.', 'Es un producto, y el segundo factor necesita la cadena.', 'إنه جداء، والعامل الثاني يحتاج إلى السلسلة.', 'It is a product, and the second factor needs the chain.')
    },
    trig: {
        definitions: [
            { term: say('Radiana', 'Radián', 'الراديان', 'Radian'), meaning: say('Deribatu hauek balio duten angelu-unitatea: $\\pi$ radian $180^\\circ$ dira.', 'La unidad de ángulo con la que valen estas derivadas: $\\pi$ radianes son $180^\\circ$.', 'وحدة الزاوية التي تصح بها هذه المشتقات: $\\pi$ راديان تساوي $180^\\circ$.', 'The unit of angle in which these derivatives hold: $\\pi$ radians are $180^\\circ$.') }
        ],
        vocabulary: [
            say('sinua', 'seno', 'الجيب', 'sine'),
            say('kosinua', 'coseno', 'جيب التمام', 'cosine')
        ],
        explanation: say(
            'Sinuaren deribatua kosinua da, eta kosinuarena sinua zeinu minusarekin: $\\sin x$ funtzioaren malda puntu bakoitzean $\\cos x$ funtzioak ematen du. Erregela hauek $x$ radianetan dagoenean balio dute. Tangentea zatidura bat da, $\\frac{\\sin x}{\\cos x}$, eta haren deribatua zatiduraren erregelarekin ateratzen da.',
            'La derivada del seno es el coseno, y la del coseno es menos el seno: la pendiente de $\\sin x$ en cada punto la da $\\cos x$. Estas reglas valen con $x$ en radianes. La tangente es un cociente, $\\frac{\\sin x}{\\cos x}$, y su derivada sale con la regla del cociente.',
            'مشتقة الجيب جيب التمام، ومشتقة جيب التمام سالب الجيب: ميل $\\sin x$ عند كل نقطة تعطيه $\\cos x$. وتصح هذه القواعد و$x$ بالراديان. والظل خارج قسمة، $\\frac{\\sin x}{\\cos x}$، وتُحسب مشتقته بقاعدة خارج القسمة.',
            'The derivative of sine is cosine, and that of cosine is minus sine: the slope of $\\sin x$ at each point is given by $\\cos x$. These rules hold with $x$ in radians. The tangent is a quotient, $\\frac{\\sin x}{\\cos x}$, and its derivative comes from the quotient rule.'
        ),
        examplePrompt: say('Deribatu $f(x)=\\cos(x^2)$.', 'Deriva $f(x)=\\cos(x^2)$.', 'اشتق $f(x)=\\cos(x^2)$.', 'Differentiate $f(x)=\\cos(x^2)$.'),
        example: same('$f\'(x)=-\\sin(x^2)\\cdot 2x=-2x\\sin(x^2)$'),
        exampleAnswer: say('Kosinuaren deribatuak minus zeinua dakar, eta kateak $2x$.', 'La derivada del coseno trae el signo menos, y la cadena el $2x$.', 'مشتقة جيب التمام تجلب إشارة السالب، والسلسلة تجلب $2x$.', 'The derivative of cosine brings the minus sign, and the chain brings the $2x$.')
    },
    'tangent-conditions': {
        definitions: [
            { term: say('Zuzen ukitzaile horizontala', 'Tangente horizontal', 'المماس الأفقي', 'Horizontal tangent'), meaning: say('Malda 0 duen zuzen ukitzailea: $f\'(x)=0$ den puntuetan dago.', 'Una tangente con pendiente 0: está en los puntos donde $f\'(x)=0$.', 'مماس ميله 0: يكون عند النقاط التي فيها $f\'(x)=0$.', 'A tangent with slope 0: it is at the points where $f\'(x)=0$.') }
        ],
        vocabulary: [
            say('paraleloa', 'paralela', 'موازٍ', 'parallel'),
            say('perpendikularra', 'perpendicular', 'متعامد', 'perpendicular')
        ],
        explanation: say(
            'Batzuetan ez dute puntua ematen, maldari buruzko baldintza bat baizik. $y=mx+n$ zuzenaren paraleloa: $m$ malda; horizontala: 0 malda; $m$ maldako zuzen baten perpendikularra: $-\\frac{1}{m}$ malda. $f\'(x)$ malda horren berdin jarri, ebatzi, eta puntua aurkitzen da.',
            'A veces no dan el punto, sino una condición sobre la pendiente. Paralela a $y=mx+n$: pendiente $m$; horizontal: pendiente 0; perpendicular a una recta de pendiente $m$: pendiente $-\\frac{1}{m}$. Se iguala $f\'(x)$ a esa pendiente, se resuelve y se halla el punto.',
            'أحيانًا لا تُعطى النقطة بل شرط على الميل. موازٍ لـ $y=mx+n$: الميل $m$؛ أفقي: الميل 0؛ متعامد مع مستقيم ميله $m$: الميل $-\\frac{1}{m}$. نساوي $f\'(x)$ بذلك الميل ونحل فنجد النقطة.',
            'Sometimes you are given not the point but a condition on the slope. Parallel to $y=mx+n$: slope $m$; horizontal: slope 0; perpendicular to a line of slope $m$: slope $-\\frac{1}{m}$. Set $f\'(x)$ equal to that slope, solve and you find the point.'
        ),
        examplePrompt: say('Zein puntutan da horizontala $f(x)=x^2+6x$ funtzioaren zuzen ukitzailea?', '¿En qué punto es horizontal la tangente a $f(x)=x^2+6x$?', 'عند أي نقطة يكون مماس $f(x)=x^2+6x$ أفقيًّا؟', 'At which point is the tangent to $f(x)=x^2+6x$ horizontal?'),
        example: same('$f\'(x)=2x+6=0\\ \\to\\ x=-3$'),
        exampleAnswer: say('$(-3,\\,-9)$ puntuan; han zuzen ukitzailea $y=-9$ da.', 'En $(-3,\\,-9)$, donde la tangente es $y=-9$.', 'عند $(-3,\\,-9)$ حيث المماس $y=-9$.', 'At $(-3,\\,-9)$, where the tangent is $y=-9$.')
    }
}
