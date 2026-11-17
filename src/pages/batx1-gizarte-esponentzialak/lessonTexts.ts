import type { LessonTexts } from '../../features/unit-v2/types.ts'
import type { SocExpTopicId } from './lessonChecks.ts'
import { plain as say, plainSame as same } from './text.ts'

/* ==========================================================================
   Funtzio esponentzialak eta logaritmikoak · Batxilergoa 1 · Gizarte
   Zientziak — what each lesson tells: definitions, a short explanation,
   the example as an exercise («Another example»), key words and, in some
   lessons, «Why does it work?». Plain data so the tests can import it.
   The example uses numbers of its own.
   ========================================================================== */

export const socExpLessonTexts: Record<SocExpTopicId, LessonTexts> = {
    /* ---------- 1. Transformations ---------- */
    shifts: {
        definitions: [
            { term: say('Lekualdaketa', 'Traslación', 'الانسحاب', 'Translation'), meaning: say('Grafikoa forma aldatu gabe mugitzea.', 'Mover la gráfica sin cambiar su forma.', 'تحريك الرسم دون تغيير شكله.', 'Moving the graph without changing its shape.') }
        ],
        vocabulary: [
            say('eskuinera', 'derecha', 'اليمين', 'right'),
            say('ezkerrera', 'izquierda', 'اليسار', 'left')
        ],
        explanation: say(
            '$y=f(x)+k$ funtzioak grafikoa $k$ unitate igotzen du ($k<0$ bada, jaitsi). $y=f(x-a)$ funtzioak $a$ unitate eskuinera eramaten du, eta $y=f(x+a)$ funtzioak ezkerrera: barrukoak alderantziz egiten du. Puntu bakoitza berdin mugitzen da.',
            '$y=f(x)+k$ sube la gráfica $k$ unidades (si $k<0$, la baja). $y=f(x-a)$ la lleva $a$ unidades a la derecha, e $y=f(x+a)$, a la izquierda: lo de dentro actúa al revés. Cada punto se mueve igual.',
            '$y=f(x)+k$ ترفع الرسم $k$ وحدات (وإذا كان $k<0$ تخفضه). و$y=f(x-a)$ تنقله $a$ وحدات إلى اليمين، و$y=f(x+a)$ إلى اليسار: ما بالداخل يعمل بالعكس. وتتحرك كل نقطة بالقدر نفسه.',
            '$y=f(x)+k$ raises the graph $k$ units (if $k<0$, it lowers it). $y=f(x-a)$ takes it $a$ units to the right, and $y=f(x+a)$ to the left: the inside works the other way round. Every point moves the same.'
        ),
        examplePrompt: say('$f$ funtzioa $(5,-1)$ puntutik pasatzen da. Zein puntutatik pasatzen da $y=f(x+2)+6$?', 'La gráfica de $f$ pasa por $(5,-1)$. ¿Por qué punto pasa $y=f(x+2)+6$?', 'يمر رسم $f$ بالنقطة $(5,-1)$. بأي نقطة يمر $y=f(x+2)+6$؟', 'The graph of $f$ passes through $(5,-1)$. Which point does $y=f(x+2)+6$ pass through?'),
        example: same('$x+2=5\\ \\to\\ x=3\\qquad -1+6=5$'),
        exampleAnswer: say('$(3,5)$ puntutik: 2 ezkerrera eta 6 gora.', 'Por $(3,5)$: 2 a la izquierda y 6 hacia arriba.', 'بالنقطة $(3,5)$: وحدتان إلى اليسار و6 إلى الأعلى.', 'Through $(3,5)$: 2 to the left and 6 up.')
    },
    reflections: {
        definitions: [
            { term: say('Simetrikoa', 'Simétrica', 'المتناظرة', 'Reflection'), meaning: say('Ardatz baten bestaldean, distantzia berean geratzen den grafikoa.', 'La gráfica que queda al otro lado de un eje, a la misma distancia.', 'الرسم الذي يقع في الجهة الأخرى من محور، على المسافة نفسها.', 'The graph on the other side of an axis, at the same distance.') }
        ],
        vocabulary: [
            say('ardatza', 'eje', 'المحور', 'axis'),
            say('luzatu', 'estirar', 'تمديد', 'stretch'),
            say('tolestu', 'doblar', 'تطوي', 'fold')
        ],
        explanation: say(
            '$y=-f(x)$ funtzioak $y$ zeinuz aldatzen du: X ardatzean islatzen da. $y=f(-x)$ funtzioak $x$ zeinuz aldatzen du: Y ardatzean islatzen da. $y=k\\cdot f(x)$ funtzioak $y$ bider $k$ egiten du, eta grafikoa bertikalki luzatzen. $y=|f(x)|$ funtzioak X ardatzaren azpikoa gora tolesten du.',
            '$y=-f(x)$ cambia el signo de la $y$: se refleja en el eje X. $y=f(-x)$ cambia el signo de la $x$: se refleja en el eje Y. $y=k\\cdot f(x)$ multiplica la $y$ por $k$ y estira la gráfica en vertical. $y=|f(x)|$ dobla hacia arriba lo que está bajo el eje X.',
            '$y=-f(x)$ تغيّر إشارة $y$: انعكاس في محور X. و$y=f(-x)$ تغيّر إشارة $x$: انعكاس في محور Y. و$y=k\\cdot f(x)$ تضرب $y$ في $k$ وتمدّ الرسم رأسيًّا. و$y=|f(x)|$ تطوي إلى الأعلى ما تحت محور X.',
            '$y=-f(x)$ changes the sign of $y$: it is reflected in the x-axis. $y=f(-x)$ changes the sign of $x$: it is reflected in the y-axis. $y=k\\cdot f(x)$ multiplies $y$ by $k$ and stretches the graph vertically. $y=|f(x)|$ folds up what is below the x-axis.'
        ),
        examplePrompt: say('$f$ funtzioa $(-1,3)$ puntutik pasatzen da. Zein puntutatik pasatzen da $y=-4f(-x)$?', 'La gráfica de $f$ pasa por $(-1,3)$. ¿Por qué punto pasa $y=-4f(-x)$?', 'يمر رسم $f$ بالنقطة $(-1,3)$. بأي نقطة يمر $y=-4f(-x)$؟', 'The graph of $f$ passes through $(-1,3)$. Which point does $y=-4f(-x)$ pass through?'),
        example: same('$-x=-1\\ \\to\\ x=1\\qquad -4\\cdot 3=-12$'),
        exampleAnswer: say('$(1,-12)$ puntutik.', 'Por $(1,-12)$.', 'بالنقطة $(1,-12)$.', 'Through $(1,-12)$.')
    },
    'vertex-form': {
        definitions: [
            { term: say('Karratua osatzea', 'Completar el cuadrado', 'إكمال المربع', 'Completing the square'), meaning: say('$x^2+bx$ adierazpena $(x+\\frac{b}{2})^2$ moduan idaztea, falta dena kenduta.', 'Escribir $x^2+bx$ como $(x+\\frac{b}{2})^2$ restando lo que sobra.', 'كتابة $x^2+bx$ على صورة $(x+\\frac{b}{2})^2$ بطرح الزائد.', 'Writing $x^2+bx$ as $(x+\\frac{b}{2})^2$, taking away what is extra.') }
        ],
        vocabulary: [
            say('erpina', 'vértice', 'الرأس', 'vertex'),
            say('hiperbola', 'hipérbola', 'القطع الزائد', 'hyperbola')
        ],
        explanation: say(
            '$y=x^2+bx+c$ parabola $y=x^2$ funtzioaren lekualdaketa bat da. Karratua osatuz $(x-m)^2+p$ idazten da: $m$ unitate horizontalki eta $p$ bertikalki mugitu da, eta erpina $(m,p)$ da. Era berean, $y=\\frac{k}{x-a}+b$ hiperbola $\\frac{k}{x}$ da, $a$ eskuinera eta $b$ gora eramanda.',
            'La parábola $y=x^2+bx+c$ es una traslación de $y=x^2$. Completando el cuadrado se escribe $(x-m)^2+p$: se ha movido $m$ en horizontal y $p$ en vertical, y el vértice es $(m,p)$. Igual, la hipérbola $y=\\frac{k}{x-a}+b$ es $\\frac{k}{x}$ llevada $a$ a la derecha y $b$ hacia arriba.',
            'القطع المكافئ $y=x^2+bx+c$ انسحاب لـ $y=x^2$. وبإكمال المربع نكتبه $(x-m)^2+p$: تحرّك $m$ أفقيًّا و$p$ رأسيًّا، ورأسه $(m,p)$. وكذلك القطع الزائد $y=\\frac{k}{x-a}+b$ هو $\\frac{k}{x}$ منقولًا $a$ إلى اليمين و$b$ إلى الأعلى.',
            'The parabola $y=x^2+bx+c$ is a translation of $y=x^2$. Completing the square writes it as $(x-m)^2+p$: it has moved $m$ across and $p$ up, and the vertex is $(m,p)$. In the same way, the hyperbola $y=\\frac{k}{x-a}+b$ is $\\frac{k}{x}$ moved $a$ right and $b$ up.'
        ),
        examplePrompt: say('Idatzi $y=x^2-6x+11$ funtzioa $(x-m)^2+p$ moduan.', 'Escribe $y=x^2-6x+11$ como $(x-m)^2+p$.', 'اكتب $y=x^2-6x+11$ على صورة $(x-m)^2+p$.', 'Write $y=x^2-6x+11$ as $(x-m)^2+p$.'),
        example: same('$x^2-6x+11=(x-3)^2-9+11=(x-3)^2+2$'),
        exampleAnswer: say('$y=x^2$ parabola, 3 eskuinera eta 2 gora: erpina $(3,2)$.', 'Es $y=x^2$ llevada 3 a la derecha y 2 hacia arriba: vértice $(3,2)$.', 'إنها $y=x^2$ منقولة 3 إلى اليمين و2 إلى الأعلى: الرأس $(3,2)$.', 'It is $y=x^2$ moved 3 right and 2 up: vertex $(3,2)$.')
    },

    /* ---------- 2. Composition and inverse ---------- */
    composition: {
        definitions: [
            { term: say('Konposizioa', 'Composición', 'التركيب', 'Composition'), meaning: say('$(f\\circ g)(x)=f(g(x))$: $g$ funtzioaren emaitzari $f$ aplikatzea.', '$(f\\circ g)(x)=f(g(x))$: aplicar $f$ al resultado de $g$.', '$(f\\circ g)(x)=f(g(x))$: تطبيق $f$ على ناتج $g$.', '$(f\\circ g)(x)=f(g(x))$: applying $f$ to the result of $g$.') }
        ],
        vocabulary: [
            say('ordena', 'orden', 'الترتيب', 'order'),
            say('deskontua', 'descuento', 'الخصم', 'discount')
        ],
        explanation: say(
            'Bi eragiketa segidan egitea bi funtzio konposatzea da. $f\\circ g$ funtzioan lehenik $g$ aplikatzen da, eta gero $f$. Ordenak garrantzia du: deskontu bat eta BEZa ez dira berdinak edozein ordenatan, kopuru finko bat batzen bada.',
            'Hacer dos operaciones seguidas es componer dos funciones. En $f\\circ g$ se aplica primero $g$ y después $f$. El orden importa: un descuento y el IVA no dan lo mismo en cualquier orden si se suma o resta una cantidad fija.',
            'إجراء عمليتين متتاليتين هو تركيب دالتين. في $f\\circ g$ نطبّق $g$ أولًا ثم $f$. والترتيب مهم: الخصم والضريبة لا يعطيان الشيء نفسه بأي ترتيب إذا أضيف مبلغ ثابت أو طُرح.',
            'Doing two operations in a row is composing two functions. In $f\\circ g$, $g$ is applied first and then $f$. The order matters: a discount and VAT do not give the same in any order if a fixed amount is added or taken away.'
        ),
        examplePrompt: say('$f(x)=x^2+1$ eta $g(x)=3x$ badira, kalkulatu $(f\\circ g)(2)$ eta $(g\\circ f)(2)$.', 'Si $f(x)=x^2+1$ y $g(x)=3x$, calcula $(f\\circ g)(2)$ y $(g\\circ f)(2)$.', 'إذا كانت $f(x)=x^2+1$ و$g(x)=3x$، فاحسب $(f\\circ g)(2)$ و$(g\\circ f)(2)$.', 'If $f(x)=x^2+1$ and $g(x)=3x$, work out $(f\\circ g)(2)$ and $(g\\circ f)(2)$.'),
        example: same('$6^2+1=37\\qquad 3\\cdot(2^2+1)=15$'),
        exampleAnswer: say('37 eta 15: ez dira berdinak.', '37 y 15: no son iguales.', '37 و15: ليستا متساويتين.', '37 and 15: they are not equal.')
    },
    inverse: {
        definitions: [
            { term: say('Alderantzizko funtzioa', 'Función inversa', 'الدالة العكسية', 'Inverse function'), meaning: say('$f^{-1}$: $f$ desegiten duena, $f^{-1}(f(x))=x$.', '$f^{-1}$: la que deshace $f$, $f^{-1}(f(x))=x$.', '$f^{-1}$: التي تلغي عمل $f$، $f^{-1}(f(x))=x$.', '$f^{-1}$: the one that undoes $f$, $f^{-1}(f(x))=x$.') }
        ],
        vocabulary: [
            say('askatu', 'despejar', 'اعزل', 'solve'),
            say('desegin', 'deshacer', 'تلغي', 'undo')
        ],
        explanation: say(
            'Alderantzizkoa aurkitzeko, $y=f(x)$ idazten da, $x$ askatzen da, eta letrak trukatzen dira. Eragiketak desegiten dira, alderantzizko ordenan. Egiaztatzeko, $f(f^{-1}(x))=x$ atera behar da. Testuinguruan, galdera aldatzen du: kilometroetatik prezioa ateratzen bazen, orain prezioetatik kilometroak.',
            'Para hallar la inversa se escribe $y=f(x)$, se despeja $x$ y se cambian las letras. Las operaciones se deshacen en orden inverso. Para comprobarlo, tiene que salir $f(f^{-1}(x))=x$. En un contexto cambia la pregunta: si se sacaba el precio de los kilómetros, ahora los kilómetros del precio.',
            'لإيجاد العكسية نكتب $y=f(x)$ ونعزل $x$ ثم نبدّل الحرفين. وتُلغى العمليات بترتيب معكوس. وللتحقق يجب أن نحصل على $f(f^{-1}(x))=x$. وفي السياق يتغير السؤال: إذا كنا نحسب السعر من الكيلومترات فنحسب الآن الكيلومترات من السعر.',
            'To find the inverse, write $y=f(x)$, solve for $x$ and swap the letters. The operations are undone in reverse order. To check, $f(f^{-1}(x))=x$ must come out. In a context the question changes: if the price came from the kilometres, now the kilometres come from the price.'
        ),
        examplePrompt: say('Aurkitu $f(x)=\\frac{x-2}{5}$ funtzioaren alderantzizkoa.', 'Halla la inversa de $f(x)=\\frac{x-2}{5}$.', 'أوجد عكسية $f(x)=\\frac{x-2}{5}$.', 'Find the inverse of $f(x)=\\frac{x-2}{5}$.'),
        example: same('$y=\\frac{x-2}{5}\\ \\to\\ x=5y+2\\ \\to\\ f^{-1}(x)=5x+2$'),
        exampleAnswer: say('Zatitzeari biderkatzea dagokio, eta kentzeari batzea.', 'A dividir le corresponde multiplicar, y a restar, sumar.', 'القسمة يقابلها الضرب، والطرح يقابله الجمع.', 'Dividing is undone by multiplying, and subtracting by adding.')
    },
    'inverse-graph': {
        definitions: [
            { term: say('Adarra', 'Rama', 'الفرع', 'Branch'), meaning: say('Funtzio baten zati bat, non beti gora edo beti behera doan.', 'Un trozo de la función en el que siempre sube o siempre baja.', 'جزء من الدالة تصعد فيه دائمًا أو تنزل دائمًا.', 'A piece of the function where it always rises or always falls.') }
        ],
        vocabulary: [
            say('trukatu', 'intercambiar', 'يتبادل', 'swap'),
            say('koordenatuak', 'coordenadas', 'الإحداثيات', 'coordinates')
        ],
        explanation: say(
            '$f$ eta $f^{-1}$ funtzioen grafikoak simetrikoak dira $y=x$ zuzenarekiko: $(a,b)$ puntua $(b,a)$ bihurtzen da. Funtzio batek alderantzizkoa izateko, $y$ bakoitza $x$ bakar batetik etorri behar da. Parabola batek ez du hori betetzen: adar bakoitzak bere alderantzizkoa du.',
            'Las gráficas de $f$ y de $f^{-1}$ son simétricas respecto de la recta $y=x$: el punto $(a,b)$ pasa a $(b,a)$. Para tener inversa, cada $y$ tiene que venir de una sola $x$. Una parábola no lo cumple: cada rama tiene su propia inversa.',
            'رسما $f$ و$f^{-1}$ متناظران حول المستقيم $y=x$: النقطة $(a,b)$ تصبح $(b,a)$. ولكي تكون للدالة عكسية يجب أن تأتي كل $y$ من $x$ واحدة. والقطع المكافئ لا يحقق ذلك: لكل فرع عكسيته.',
            'The graphs of $f$ and $f^{-1}$ are symmetric about the line $y=x$: the point $(a,b)$ becomes $(b,a)$. To have an inverse, each $y$ must come from a single $x$. A parabola does not do that: each branch has its own inverse.'
        ),
        examplePrompt: say('Aurkitu $x\\ge 0$ adarraren alderantzizkoa, $y=x^2+3$ funtzioan.', 'Halla la inversa de la rama $x\\ge 0$ de $y=x^2+3$.', 'أوجد عكسية الفرع $x\\ge 0$ من $y=x^2+3$.', 'Find the inverse of the branch $x\\ge 0$ of $y=x^2+3$.'),
        example: same('$x^2=y-3\\ \\to\\ x=\\sqrt{y-3}$'),
        exampleAnswer: say('$f^{-1}(x)=\\sqrt{x-3}$, $x\\ge 3$ denean.', '$f^{-1}(x)=\\sqrt{x-3}$, con $x\\ge 3$.', '$f^{-1}(x)=\\sqrt{x-3}$ مع $x\\ge 3$.', '$f^{-1}(x)=\\sqrt{x-3}$, with $x\\ge 3$.'),
        why: {
            text: say('Zergatik trukatzen dira koordenatuak? $f$ funtzioak $a$ zenbakia $b$ bihurtzen badu, $f^{-1}$ funtzioak $b$ zenbakia $a$ bihurtzen du: $(a,b)$ $f$ funtzioarena da, eta $(b,a)$ $f^{-1}$ funtzioarena.', '¿Por qué se intercambian las coordenadas? Si $f$ lleva $a$ a $b$, $f^{-1}$ lleva $b$ a $a$: $(a,b)$ es de $f$ y $(b,a)$, de $f^{-1}$.', 'لماذا يتبادل الإحداثيان؟ إذا نقلت $f$ العدد $a$ إلى $b$ فإن $f^{-1}$ تنقل $b$ إلى $a$: ‏$(a,b)$ من $f$ و$(b,a)$ من $f^{-1}$.', 'Why do the coordinates swap? If $f$ takes $a$ to $b$, $f^{-1}$ takes $b$ to $a$: $(a,b)$ belongs to $f$ and $(b,a)$ to $f^{-1}$.')
        }
    },

    /* ---------- 3. Exponential functions ---------- */
    'exp-graph': {
        definitions: [
            { term: say('Funtzio esponentziala', 'Función exponencial', 'الدالة الأسية', 'Exponential function'), meaning: say('$y=a^x$, $a>0$ eta $a\\neq 1$ izanik: $x$ berretzailean dago.', '$y=a^x$, con $a>0$ y $a\\neq 1$: la $x$ está en el exponente.', '$y=a^x$ مع $a>0$ و$a\\neq 1$: ‏$x$ في الأس.', '$y=a^x$, with $a>0$ and $a\\neq 1$: $x$ is in the exponent.') }
        ],
        vocabulary: [
            say('gorakorra', 'creciente', 'متزايدة', 'increasing'),
            say('asintota', 'asíntota', 'الخط المقارب', 'asymptote')
        ],
        explanation: say(
            '$y=a^x$ funtzioa beti $(0,1)$ puntutik pasatzen da, eta haren grafikoa X ardatzaren gainean dago. $a>1$ denean, gero eta azkarrago hazten da; $0<a<1$ denean, jaitsi egiten da. Ezkerrean (edo eskuinean) X ardatzera hurbiltzen da: $y=0$ asintota da.',
            '$y=a^x$ pasa siempre por $(0,1)$ y su gráfica está por encima del eje X. Si $a>1$, crece cada vez más deprisa; si $0<a<1$, decrece. Por un lado se acerca al eje X: $y=0$ es una asíntota.',
            '$y=a^x$ تمر دائمًا بـ $(0,1)$ ورسمها فوق محور X. إذا كان $a>1$ تتزايد بسرعة متزايدة، وإذا كان $0<a<1$ تتناقص. ومن جهة تقترب من محور X: ‏$y=0$ خط مقارب.',
            '$y=a^x$ always passes through $(0,1)$ and its graph lies above the x-axis. If $a>1$, it grows faster and faster; if $0<a<1$, it decreases. On one side it approaches the x-axis: $y=0$ is an asymptote.'
        ),
        examplePrompt: say('Kalkulatu $y=3^x$ funtzioaren balioak $x=-2$, $x=0$ eta $x=2$ direnean.', 'Calcula los valores de $y=3^x$ en $x=-2$, $x=0$ y $x=2$.', 'احسب قيم $y=3^x$ عند $x=-2$ و$x=0$ و$x=2$.', 'Work out the values of $y=3^x$ at $x=-2$, $x=0$ and $x=2$.'),
        example: same('$3^{-2}=\\frac{1}{9}\\qquad 3^0=1\\qquad 3^2=9$'),
        exampleAnswer: say('Hazten da, eta ezkerrean 0 baliora hurbiltzen da, iritsi gabe.', 'Crece, y por la izquierda se acerca a 0 sin llegar.', 'تتزايد، ومن اليسار تقترب من 0 دون أن تبلغه.', 'It grows, and on the left it approaches 0 without reaching it.')
    },
    'percent-growth': {
        definitions: [
            { term: say('Aldakuntza-indizea', 'Índice de variación', 'مؤشر التغير', 'Growth factor'), meaning: say('Urrats bakoitzean biderkatzen den zenbakia: $1+r$ hazkundean, $1-r$ beherakadan.', 'El número por el que se multiplica en cada paso: $1+r$ al crecer, $1-r$ al bajar.', 'العدد الذي نضرب فيه في كل خطوة: $1+r$ عند النمو و$1-r$ عند التناقص.', 'The number multiplied at each step: $1+r$ when growing, $1-r$ when falling.') }
        ],
        vocabulary: [
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage'),
            say('balio-galera', 'depreciación', 'الاستهلاك', 'depreciation')
        ],
        explanation: say(
            'Magnitude bat ehuneko berean hazten edo jaisten bada urrats bakoitzean, eredua esponentziala da: $y=k\\cdot(1\\pm r)^t$. $k$ hasierako balioa da, eta $r$ ehunekoa zati 100. Biztanleriak, aurrezkiek eta makinen balio-galerak horrela egiten dute.',
            'Si una magnitud sube o baja el mismo porcentaje en cada paso, el modelo es exponencial: $y=k\\cdot(1\\pm r)^t$. $k$ es el valor inicial y $r$, el porcentaje entre 100. Así se comportan las poblaciones, los ahorros y la depreciación de las máquinas.',
            'إذا زادت كمية أو نقصت بالنسبة المئوية نفسها في كل خطوة فالنموذج أسي: $y=k\\cdot(1\\pm r)^t$. حيث $k$ القيمة الابتدائية و$r$ النسبة مقسومة على 100. وهكذا تتصرف السكان والمدخرات واستهلاك الآلات.',
            'If a quantity goes up or down by the same percentage at each step, the model is exponential: $y=k\\cdot(1\\pm r)^t$. $k$ is the starting value and $r$ the percentage over 100. Populations, savings and the depreciation of machines behave like this.'
        ),
        examplePrompt: say('Ordenagailu batek 900 € balio ditu, eta % 25 galtzen du urtero. Zenbat balio du 2 urteren buruan?', 'Un ordenador vale 900 € y pierde un 25 % al año. ¿Cuánto vale a los 2 años?', 'حاسوب قيمته 900 € ويفقد 25 % سنويًّا. كم قيمته بعد سنتين؟', 'A computer is worth €900 and loses 25 % a year. What is it worth after 2 years?'),
        example: same('$900\\cdot 0{,}75^2=506{,}25$'),
        exampleAnswer: say('506,25 € inguru.', 'Unos 506,25 €.', 'نحو 506.25 €.', 'About €506.25.')
    },
    'two-points': {
        definitions: [
            { term: say('Hasierako balioa', 'Valor inicial', 'القيمة الابتدائية', 'Starting value'), meaning: say('$k$, $x=0$ denean funtzioak duen balioa.', '$k$, el valor de la función en $x=0$.', '$k$، قيمة الدالة عند $x=0$.', '$k$, the value of the function at $x=0$.') }
        ],
        vocabulary: [
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('zuzena', 'recta', 'المستقيم', 'line')
        ],
        explanation: say(
            '$y=k\\cdot a^x$ ereduak bi zenbaki ditu, eta bi datu nahikoak dira. $x=0$ puntuko datuak $k$ ematen du. Beste datuarekin, bi balioen zatidura $a$ da, urrats batean; bi urratsetan, $a^2$. Esponentzialak ez du kendura konstantea, zatidura konstantea baizik: hori da zuzenarekiko aldea.',
            'El modelo $y=k\\cdot a^x$ tiene dos números, y bastan dos datos. El dato en $x=0$ da $k$. Con el otro, el cociente de los dos valores es $a$ si están a un paso; si están a dos pasos, $a^2$. La exponencial no tiene la diferencia constante, sino el cociente: esa es la diferencia con la recta.',
            'للنموذج $y=k\\cdot a^x$ عددان، وتكفي بيانتان. البيانة عند $x=0$ تعطي $k$. ومع الأخرى، خارج قسمة القيمتين هو $a$ إذا كانت بينهما خطوة واحدة، و$a^2$ إذا كانت خطوتان. فالأسية ليس فيها فرق ثابت بل خارج قسمة ثابت: هذا هو الفرق مع المستقيم.',
            'The model $y=k\\cdot a^x$ has two numbers, and two data are enough. The datum at $x=0$ gives $k$. With the other one, the quotient of the two values is $a$ if they are one step apart; two steps apart, $a^2$. The exponential has a constant quotient, not a constant difference: that is how it differs from the line.'
        ),
        examplePrompt: say('$y=k\\cdot a^x$ funtzioa $(0,200)$ eta $(2,288)$ puntuetatik pasatzen da. Aurkitu $k$ eta $a$.', 'La función $y=k\\cdot a^x$ pasa por $(0,200)$ y $(2,288)$. Halla $k$ y $a$.', 'تمر $y=k\\cdot a^x$ بـ $(0,200)$ و$(2,288)$. أوجد $k$ و$a$.', 'The function $y=k\\cdot a^x$ passes through $(0,200)$ and $(2,288)$. Find $k$ and $a$.'),
        example: same('$k=200\\qquad a^2=\\frac{288}{200}=1{,}44\\ \\to\\ a=1{,}2$'),
        exampleAnswer: say('$y=200\\cdot 1{,}2^x$: % 20 hazten da urrats bakoitzean.', '$y=200\\cdot 1{,}2^x$: crece un 20 % en cada paso.', '$y=200\\cdot 1{,}2^x$: تنمو 20 % في كل خطوة.', '$y=200\\cdot 1{,}2^x$: it grows 20 % at each step.')
    },

    /* ---------- 4. Logarithmic functions ---------- */
    'log-inverse': {
        definitions: [
            { term: say('Logaritmoa', 'Logaritmo', 'اللوغاريتم', 'Logarithm'), meaning: say('$\\log_a x$, $a$ zenbakiak $x$ emateko behar duen berretzailea.', '$\\log_a x$, el exponente al que hay que elevar $a$ para obtener $x$.', '$\\log_a x$، الأس الذي نرفع إليه $a$ لنحصل على $x$.', '$\\log_a x$, the exponent $a$ must be raised to in order to get $x$.') }
        ],
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('kalkulagailua', 'calculadora', 'الآلة الحاسبة', 'calculator')
        ],
        explanation: say(
            '$y=\\log_a x$ funtzioa $y=a^x$ funtzioaren alderantzizkoa da: $a^y=x$ esan nahi du. Kalkulagailuak $\\log$ (10 oinarria) eta $\\ln$ ($e$ oinarria) ditu. Beste oinarri bat behar bada, $\\log_a x=\\frac{\\log x}{\\log a}$ erabiltzen da.',
            '$y=\\log_a x$ es la inversa de $y=a^x$: quiere decir $a^y=x$. La calculadora tiene $\\log$ (base 10) y $\\ln$ (base $e$). Si hace falta otra base, se usa $\\log_a x=\\frac{\\log x}{\\log a}$.',
            '$y=\\log_a x$ هي عكسية $y=a^x$: تعني $a^y=x$. وفي الآلة الحاسبة $\\log$ (الأساس 10) و$\\ln$ (الأساس $e$). وإذا احتجنا أساسًا آخر نستعمل $\\log_a x=\\frac{\\log x}{\\log a}$.',
            '$y=\\log_a x$ is the inverse of $y=a^x$: it means $a^y=x$. The calculator has $\\log$ (base 10) and $\\ln$ (base $e$). If another base is needed, use $\\log_a x=\\frac{\\log x}{\\log a}$.'
        ),
        examplePrompt: say('Kalkulatu $\\log_5 125$ eta $\\log_2\\frac{1}{16}$.', 'Calcula $\\log_5 125$ y $\\log_2\\frac{1}{16}$.', 'احسب $\\log_5 125$ و$\\log_2\\frac{1}{16}$.', 'Work out $\\log_5 125$ and $\\log_2\\frac{1}{16}$.'),
        example: same('$5^3=125\\qquad 2^{-4}=\\frac{1}{16}$'),
        exampleAnswer: say('$\\log_5 125=3$ eta $\\log_2\\frac{1}{16}=-4$.', '$\\log_5 125=3$ y $\\log_2\\frac{1}{16}=-4$.', '$\\log_5 125=3$ و$\\log_2\\frac{1}{16}=-4$.', '$\\log_5 125=3$ and $\\log_2\\frac{1}{16}=-4$.')
    },
    'log-graph': {
        definitions: [
            { term: say('Funtzio logaritmikoa', 'Función logarítmica', 'الدالة اللوغاريتمية', 'Logarithmic function'), meaning: say('$y=\\log_a x$; zenbaki positiboetan bakarrik dago.', '$y=\\log_a x$; solo existe para números positivos.', '$y=\\log_a x$؛ موجودة للأعداد الموجبة فقط.', '$y=\\log_a x$; it only exists for positive numbers.') }
        ],
        vocabulary: [
            say('izate-eremua', 'dominio', 'المجال', 'domain'),
            say('motela', 'lenta', 'ببطء', 'slow')
        ],
        explanation: say(
            '$y=\\log_a x$ funtzioaren grafikoa $y=a^x$ funtzioarena da, $y=x$ zuzenean islatuta. $(1,0)$ puntutik pasatzen da, haren izate-eremua $(0,+\\infty)$ da, eta Y ardatza asintota du. $a>1$ denean oso motel hazten da. $\\log_a(x-h)+k$ funtzioan, barrukoak positiboa izan behar du.',
            'La gráfica de $y=\\log_a x$ es la de $y=a^x$ reflejada en la recta $y=x$. Pasa por $(1,0)$, su dominio es $(0,+\\infty)$ y tiene el eje Y como asíntota. Con $a>1$ crece muy lenta. En $\\log_a(x-h)+k$, lo de dentro tiene que ser positivo.',
            'رسم $y=\\log_a x$ هو رسم $y=a^x$ منعكسًا في المستقيم $y=x$. يمر بـ $(1,0)$، ومجاله $(0,+\\infty)$، ومحور Y خط مقارب له. ومع $a>1$ يتزايد ببطء شديد. وفي $\\log_a(x-h)+k$ يجب أن يكون ما بالداخل موجبًا.',
            'The graph of $y=\\log_a x$ is that of $y=a^x$ reflected in the line $y=x$. It passes through $(1,0)$, its domain is $(0,+\\infty)$ and the y-axis is an asymptote. With $a>1$ it grows very slowly. In $\\log_a(x-h)+k$, the inside must be positive.'
        ),
        examplePrompt: say('Aurkitu $y=\\log_3(x+5)-2$ funtzioaren izate-eremua eta X ardatzarekiko ebaki-puntua.', 'Halla el dominio de $y=\\log_3(x+5)-2$ y su corte con el eje X.', 'أوجد مجال $y=\\log_3(x+5)-2$ ونقطة تقاطعه مع محور X.', 'Find the domain of $y=\\log_3(x+5)-2$ and where it cuts the x-axis.'),
        example: same('$x+5>0\\qquad\\log_3(x+5)=2\\ \\to\\ x+5=9$'),
        exampleAnswer: say('Izate-eremua $(-5,+\\infty)$ da, eta X ardatza $x=4$ puntuan mozten du.', 'El dominio es $(-5,+\\infty)$ y corta al eje X en $x=4$.', 'المجال $(-5,+\\infty)$ ويقطع محور X عند $x=4$.', 'The domain is $(-5,+\\infty)$ and it cuts the x-axis at $x=4$.')
    },
    'solve-time': {
        definitions: [
            { term: say('Ekuazio esponentziala', 'Ecuación exponencial', 'المعادلة الأسية', 'Exponential equation'), meaning: say('Ezezaguna berretzailean duen ekuazioa, $a^t=c$ bezala.', 'Una ecuación con la incógnita en el exponente, como $a^t=c$.', 'معادلة فيها المجهول في الأس، مثل $a^t=c$.', 'An equation with the unknown in the exponent, like $a^t=c$.') }
        ],
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('biribildu', 'redondear', 'التقريب', 'round')
        ],
        explanation: say(
            '«Noiz iritsiko da?» galdetzean, ezezaguna berretzailean dago: $k\\cdot a^t=c$. Lehenik isolatu $a^t=\\frac{c}{k}$, eta gero hartu logaritmoak bi aldeetan: $t=\\frac{\\log(c/k)}{\\log a}$. Emaitza testuinguruaren arabera biribiltzen da (urteak, hilabeteak…).',
            'Al preguntar «¿cuándo se llega?», la incógnita está en el exponente: $k\\cdot a^t=c$. Primero se aísla $a^t=\\frac{c}{k}$ y después se toman logaritmos en los dos lados: $t=\\frac{\\log(c/k)}{\\log a}$. El resultado se redondea según el contexto (años, meses…).',
            'عند السؤال «متى نصل؟» يكون المجهول في الأس: $k\\cdot a^t=c$. نعزل أولًا $a^t=\\frac{c}{k}$ ثم نأخذ اللوغاريتم في الطرفين: $t=\\frac{\\log(c/k)}{\\log a}$. ثم نجري التقريب حسب السياق (سنوات، أشهر…).',
            'When asking «when will it get there?», the unknown is in the exponent: $k\\cdot a^t=c$. First isolate $a^t=\\frac{c}{k}$, then take logarithms on both sides: $t=\\frac{\\log(c/k)}{\\log a}$. The result is rounded to suit the context (years, months…).'
        ),
        examplePrompt: say('Biztanleria bat 8000 da, eta % 4 hazten da urtero. Noiz iritsiko da 12\u00a0000 biztanlera?', 'Una población de 8000 personas crece un 4 % al año. ¿Cuándo llegará a 12 000?', 'عدد سكان 8000 ينمو 4 % سنويًّا. متى يبلغ 12 000؟', 'A population of 8,000 grows 4 % a year. When will it reach 12,000?'),
        example: same('$1{,}04^t=1{,}5\\ \\to\\ t=\\frac{\\log 1{,}5}{\\log 1{,}04}\\approx 10{,}3$'),
        exampleAnswer: say('11. urtean gaindituko ditu 12\u00a0000 biztanle.', 'Pasará de 12 000 durante el año 11.', 'سيتجاوز 12 000 خلال السنة 11.', 'It will pass 12,000 during year 11.')
    },

    /* ---------- 5. Models ---------- */
    doubling: {
        definitions: [
            { term: say('Bikoizte-denbora', 'Tiempo de duplicación', 'زمن التضاعف', 'Doubling time'), meaning: say('Kopurua bikoizteko behar den denbora; beti bera da.', 'El tiempo que tarda la cantidad en duplicarse; siempre es el mismo.', 'الزمن اللازم لتتضاعف الكمية؛ وهو ثابت دائمًا.', 'The time the amount takes to double; it is always the same.') },
            { term: say('Erdibizitza', 'Semivida', 'عمر النصف', 'Half-life'), meaning: say('Kopurua erdira jaisteko behar den denbora.', 'El tiempo que tarda la cantidad en reducirse a la mitad.', 'الزمن اللازم لتنقص الكمية إلى النصف.', 'The time the amount takes to fall to half.') }
        ],
        vocabulary: [
            say('bikoiztu', 'duplicar', 'يتضاعف', 'double'),
            say('erdia', 'mitad', 'النصف', 'half')
        ],
        explanation: say(
            'Eredu esponentzial batean, kopurua bikoizteko denbora beti bera da, edozein unetan hasita: $a^T=2$ denean. Beherakadan, erdira jaisteko denbora (erdibizitza) ere konstantea da. Horregatik, $T$ urtean bikoizten bada, $3T$ urtean $2^3=8$ aldiz handiagoa da.',
            'En un modelo exponencial, el tiempo que tarda la cantidad en duplicarse es siempre el mismo, empiece cuando empiece: cuando $a^T=2$. Al decrecer, el tiempo en reducirse a la mitad (semivida) también es constante. Por eso, si se duplica en $T$ años, en $3T$ años es $2^3=8$ veces mayor.',
            'في النموذج الأسي يكون زمن تضاعف الكمية ثابتًا دائمًا أيًّا كانت البداية: عندما $a^T=2$. وعند التناقص يكون زمن الوصول إلى النصف (عمر النصف) ثابتًا أيضًا. ولذلك إذا تضاعفت في $T$ سنة تصبح بعد $3T$ سنة أكبر بـ $2^3=8$ مرات.',
            'In an exponential model, the time the amount takes to double is always the same, whenever you start: when $a^T=2$. When it decreases, the time to fall to half (half-life) is also constant. That is why, if it doubles in $T$ years, in $3T$ years it is $2^3=8$ times bigger.'
        ),
        examplePrompt: say('Bakterio-kolonia bat % 25 hazten da orduro. Zenbat denboran bikoizten da?', 'Una colonia de bacterias crece un 25 % cada hora. ¿En cuánto tiempo se duplica?', 'مستعمرة بكتيريا تنمو 25 % كل ساعة. في كم من الوقت تتضاعف؟', 'A colony of bacteria grows 25 % every hour. How long does it take to double?'),
        example: same('$1{,}25^T=2\\ \\to\\ T=\\frac{\\log 2}{\\log 1{,}25}\\approx 3{,}1$'),
        exampleAnswer: say('3 ordu pasatxo; eta beste 3,1 ordutan, berriz bikoiztuko da.', 'Algo más de 3 horas; y en otras 3,1 horas se duplicará otra vez.', 'أكثر بقليل من 3 ساعات؛ وبعد 3.1 ساعة أخرى تتضاعف مجددًا.', 'Just over 3 hours; and in another 3.1 hours it will double again.'),
        why: {
            text: say('Zergatik da beti bera? $a^{t+T}=a^t\\cdot a^T=a^t\\cdot 2$: edozein unetan hasita, $T$ geroago kopurua bider 2 da.', '¿Por qué es siempre el mismo? $a^{t+T}=a^t\\cdot a^T=a^t\\cdot 2$: empiece donde empiece, $T$ después la cantidad está multiplicada por 2.', 'لماذا هو ثابت دائمًا؟ $a^{t+T}=a^t\\cdot a^T=a^t\\cdot 2$: أيًّا كانت البداية تُضرب الكمية في 2 بعد $T$.', 'Why is it always the same? $a^{t+T}=a^t\\cdot a^T=a^t\\cdot 2$: wherever you start, $T$ later the amount is multiplied by 2.')
        }
    },
    logistic: {
        definitions: [
            { term: say('Funtzio logistikoa', 'Función logística', 'الدالة اللوجستية', 'Logistic function'), meaning: say('$y=\\frac{M}{1+b\\cdot a^{-x}}$: S forma duen kurba, $M$ sabairantz hurbiltzen dena.', '$y=\\frac{M}{1+b\\cdot a^{-x}}$: una curva en forma de S que se acerca al techo $M$.', '$y=\\frac{M}{1+b\\cdot a^{-x}}$: منحنى على شكل S يقترب من السقف $M$.', '$y=\\frac{M}{1+b\\cdot a^{-x}}$: an S-shaped curve that approaches the ceiling $M$.') }
        ],
        vocabulary: [
            say('sabaia', 'techo', 'السقف', 'ceiling'),
            say('salmentak', 'ventas', 'المبيعات', 'sales')
        ],
        explanation: say(
            'Merkatu batek mugak ditu: salmentak hasieran esponentzialki hazten dira, gero moteldu, eta azkenean $M$ sabairantz hurbiltzen dira. Funtzio logistikoak hori deskribatzen du. Hasieran $\\frac{M}{1+b}$ balio du, eta $\\frac{M}{2}$ baliora iristen da $a^x=b$ denean.',
            'Un mercado tiene límites: las ventas crecen al principio de forma exponencial, después se frenan y al final se acercan a un techo $M$. Eso lo describe la función logística. Al principio vale $\\frac{M}{1+b}$, y llega a $\\frac{M}{2}$ cuando $a^x=b$.',
            'للسوق حدود: تنمو المبيعات في البداية نموًّا أسيًّا ثم تتباطأ وتقترب أخيرًا من سقف $M$. وهذا ما تصفه الدالة اللوجستية. قيمتها في البداية $\\frac{M}{1+b}$، وتبلغ $\\frac{M}{2}$ عندما $a^x=b$.',
            'A market has limits: sales grow exponentially at first, then slow down and finally approach a ceiling $M$. The logistic function describes that. At the start it is $\\frac{M}{1+b}$, and it reaches $\\frac{M}{2}$ when $a^x=b$.'
        ),
        examplePrompt: say('Aplikazio baten deskargak $f(x)=\\frac{6000}{1+59\\cdot 1{,}5^{-x}}$ dira, $x$ astetan. Zenbat ziren hasieran?', 'Las descargas de una aplicación son $f(x)=\\frac{6000}{1+59\\cdot 1{,}5^{-x}}$, con $x$ en semanas. ¿Cuántas había al principio?', 'تنزيلات تطبيق هي $f(x)=\\frac{6000}{1+59\\cdot 1{,}5^{-x}}$ و$x$ بالأسابيع. كم كانت في البداية؟', 'An app\'s downloads are $f(x)=\\frac{6000}{1+59\\cdot 1{,}5^{-x}}$, with $x$ in weeks. How many were there at the start?'),
        example: same('$f(0)=\\frac{6000}{1+59}=100$'),
        exampleAnswer: say('100 deskarga, eta sabaia 6000 da.', '100 descargas, y el techo es 6000.', '100 تنزيل، والسقف 6000.', '100 downloads, and the ceiling is 6,000.')
    },
    'log-model': {
        definitions: [
            { term: say('Eredu logaritmikoa', 'Modelo logarítmico', 'النموذج اللوغاريتمي', 'Logarithmic model'), meaning: say('$y=a+b\\log x$ moduko funtzioa: hasieran azkar aldatzen da, eta gero oso motel.', 'Una función del tipo $y=a+b\\log x$: cambia deprisa al principio y luego muy despacio.', 'دالة من نوع $y=a+b\\log x$: تتغير بسرعة في البداية ثم ببطء شديد.', 'A function of the type $y=a+b\\log x$: it changes fast at first and then very slowly.') }
        ],
        vocabulary: [
            say('publizitatea', 'publicidad', 'الإعلان', 'advertising'),
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage')
        ],
        explanation: say(
            'Fenomeno batzuk logaritmo batekin deskribatzen dira: zer gogoratzen den denboraren poderioz, soinu baten intentsitatea, ikasteko kurbak. Balio batera noiz iristen den jakiteko, logaritmoa isolatzen da, eta gero $10^{\\ldots}$ egiten da: $\\log x=c$ bada, $x=10^c$.',
            'Algunos fenómenos se describen con un logaritmo: lo que se recuerda con el paso del tiempo, la intensidad de un sonido, las curvas de aprendizaje. Para saber cuándo se llega a un valor se aísla el logaritmo y después se hace $10^{\\ldots}$: si $\\log x=c$, $x=10^c$.',
            'بعض الظواهر تُوصف بلوغاريتم: ما نتذكره مع مرور الوقت، وشدة الصوت، ومنحنيات التعلّم. ولمعرفة متى نصل إلى قيمة نعزل اللوغاريتم ثم نحسب $10^{\\ldots}$: إذا كان $\\log x=c$ فإن $x=10^c$.',
            'Some phenomena are described with a logarithm: what is remembered as time goes by, the loudness of a sound, learning curves. To find when a value is reached, isolate the logarithm and then work out $10^{\\ldots}$: if $\\log x=c$, $x=10^c$.'
        ),
        examplePrompt: say('Ikasle batek gogoratzen duen ehunekoa $R(t)=90-40\\log(t+1)$ da, $t$ hilabetetan. Zenbat gogoratzen du 9 hilabeteren buruan?', 'El porcentaje que recuerda un alumno es $R(t)=90-40\\log(t+1)$, con $t$ en meses. ¿Cuánto recuerda a los 9 meses?', 'النسبة التي يتذكرها طالب هي $R(t)=90-40\\log(t+1)$ و$t$ بالأشهر. كم يتذكر بعد 9 أشهر؟', 'The percentage a student remembers is $R(t)=90-40\\log(t+1)$, with $t$ in months. How much do they remember after 9 months?'),
        example: same('$\\log 10=1\\qquad 90-40\\cdot 1=50$'),
        exampleAnswer: say('% 50.', 'El 50 %.', '50 %.', '50 %.')
    }
}
