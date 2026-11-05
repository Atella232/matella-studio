import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { PolynomialAkTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Funtzio polinomikoak eta arrazionalak · 4. DBH akademikoak — what each
   lesson tells: a short explanation, its cases, the example as an exercise
   («Another example»), the key words in four languages and, in three
   lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics. Several examples are the ones the
   lesson figures draw. Points and intervals are written left to right in
   every language; Arabic writes the decimal point ({,} becomes .).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const polynomialAkLessonTexts: Record<PolynomialAkTopicId, LessonTexts> = {
    /* ---------- 1. Straight lines ---------- */
    'line-kinds': {
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('jatorriko ordenatua', 'ordenada en el origen', 'الجزء المقطوع', 'y-intercept'),
            say('konstantea', 'constante', 'ثابتة', 'constant')
        ],
        explanation: say(
            '$y=mx+n$ funtzioaren grafikoa zuzen bat da: $m$ malda da, haren inklinazioa, eta $n$ jatorriko ordenatua, Y ardatza mozten duen lekua, $(0,\\,n)$. $m$ eta $n$ balioen arabera, hiru mota daude. Marrazteko, nahikoa dira bi puntu: kalkulatu $f(0)$ eta beste irudi bat.',
            'La gráfica de $y=mx+n$ es una recta: $m$ es la pendiente, su inclinación, y $n$ la ordenada en el origen, donde corta al eje Y, $(0,\\,n)$. Según $m$ y $n$ hay tres tipos. Para dibujarla bastan dos puntos: calcula $f(0)$ y otra imagen.',
            'رسم $y=mx+n$ مستقيم: $m$ هو الميل أي انحداره، و$n$ الجزء المقطوع من محور Y حيث يقطعه في $(0,\\,n)$. وبحسب $m$ و$n$ توجد ثلاثة أنواع. ولرسمه تكفي نقطتان: احسب $f(0)$ وصورة أخرى.',
            'The graph of $y=mx+n$ is a straight line: $m$ is the slope, its steepness, and $n$ the y-intercept, where it cuts the Y axis, $(0,\\,n)$. Depending on $m$ and $n$ there are three kinds. To draw it, two points are enough: work out $f(0)$ and another image.'
        ),
        cases: [
            { title: say('Proportzionaltasun zuzena', 'Proporcionalidad directa', 'تناسب طردي', 'Direct proportion'), text: say('Jatorritik pasatzen da.', 'Pasa por el origen.', 'يمر بالأصل.', 'It goes through the origin.'), math: same('$y=mx$') },
            { title: say('Lineala', 'Lineal', 'خطية', 'Linear'), text: say('$m\\ne 0$ eta $n\\ne 0$.', '$m\\ne 0$ y $n\\ne 0$.', '$m\\ne 0$ و$n\\ne 0$.', '$m\\ne 0$ and $n\\ne 0$.'), math: same('$y=mx+n$') },
            { title: say('Konstantea', 'Constante', 'ثابتة', 'Constant'), text: say('X ardatzaren paraleloa.', 'Paralela al eje X.', 'موازية لمحور X.', 'Parallel to the X axis.'), math: same('$y=n$') }
        ],
        examplePrompt: say('Zer motatakoak dira $y=2x$, $y=-x+3$ eta $y=-2$?', '¿De qué tipo son $y=2x$, $y=-x+3$ e $y=-2$?', 'ما نوع كل من $y=2x$ و$y=-x+3$ و$y=-2$؟', 'What kind of function is each of $y=2x$, $y=-x+3$ and $y=-2$?'),
        example: same('$\\begin{gathered}y=2x\\ \\to\\ n=0\\\\ y=-x+3\\ \\to\\ m=-1,\\ n=3\\\\ y=-2\\ \\to\\ m=0\\end{gathered}$'),
        exampleAnswer: say('Proportzionaltasun zuzena, lineala eta konstantea.', 'Proporcionalidad directa, lineal y constante.', 'تناسب طردي، وخطية، وثابتة.', 'Direct proportion, linear and constant.')
    },
    slope: {
        vocabulary: [
            say('gorakorra', 'creciente', 'متزايدة', 'increasing'),
            say('beherakorra', 'decreciente', 'متناقصة', 'decreasing')
        ],
        explanation: say(
            'Malda zuzenak $x$ ardatzean unitate bat aurreratzean igotzen duena da. Bi punturekin, $m=\\dfrac{y_2-y_1}{x_2-x_1}$, ordena berean kenduta. $m>0$ bada, funtzioa gorakorra da; $m<0$ bada, beherakorra; $m=0$ bada, konstantea. $|m|$ handiagoa, zuzena orduan eta malkartsuagoa.',
            'La pendiente es lo que sube la recta al avanzar una unidad en $x$. Con dos puntos, $m=\\dfrac{y_2-y_1}{x_2-x_1}$, restando en el mismo orden. Si $m>0$, la función es creciente; si $m<0$, decreciente; si $m=0$, constante. Cuanto mayor es $|m|$, más empinada es la recta.',
            'الميل هو ما يصعده المستقيم عند التقدم وحدة واحدة في $x$. وبنقطتين $m=\\dfrac{y_2-y_1}{x_2-x_1}$ مع الطرح بالترتيب نفسه. إذا كان $m>0$ فالدالة متزايدة، وإذا كان $m<0$ فمتناقصة، وإذا كان $m=0$ فثابتة. وكلما كبر $|m|$ زاد انحدار المستقيم.',
            'The slope is how much the line rises when you move one unit along $x$. With two points, $m=\\dfrac{y_2-y_1}{x_2-x_1}$, subtracting in the same order. If $m>0$, the function is increasing; if $m<0$, decreasing; if $m=0$, constant. The bigger $|m|$, the steeper the line.'
        ),
        examplePrompt: say('Aurkitu $A(1,\\,2)$ eta $B(4,\\,8)$ puntuetatik pasatzen den zuzenaren malda.', 'Halla la pendiente de la recta que pasa por $A(1,\\,2)$ y $B(4,\\,8)$.', 'أوجد ميل المستقيم المار بـ $A(1,\\,2)$ و$B(4,\\,8)$.', 'Find the slope of the line through $A(1,\\,2)$ and $B(4,\\,8)$.'),
        example: same('$m=\\frac{8-2}{4-1}=\\frac{6}{3}=2$'),
        exampleAnswer: say('Malda 2: 1 aurreratuta, 2 igotzen da; gorakorra.', 'Pendiente 2: al avanzar 1, sube 2; creciente.', 'الميل 2: عند التقدم 1 يصعد 2؛ متزايدة.', 'Slope 2: moving 1 across, it rises 2; increasing.')
    },
    'line-equation': {
        vocabulary: [
            say('puntu-malda ekuazioa', 'ecuación punto-pendiente', 'معادلة النقطة والميل', 'point-slope equation'),
            say('paraleloak', 'paralelas', 'متوازية', 'parallel')
        ],
        explanation: say(
            '$(x_0,\\,y_0)$ puntutik $m$ maldarekin pasatzen den zuzenak puntu-malda ekuazioa du, $y-y_0=m(x-x_0)$; gero $y$ askatzen da. Bi punturekin, lehenik malda kalkulatzen da, eta gero haietako bat erabiltzen da. Zuzen paraleloek malda bera dute. Egiaztatzeko, ordeztu puntuak.',
            'La recta que pasa por $(x_0,\\,y_0)$ con pendiente $m$ tiene la ecuación punto-pendiente $y-y_0=m(x-x_0)$; después se despeja $y$. Con dos puntos, primero se calcula la pendiente y luego se usa uno de ellos. Las rectas paralelas tienen la misma pendiente. Para comprobar, sustituye los puntos.',
            'المستقيم المار بـ $(x_0,\\,y_0)$ بميل $m$ معادلته معادلة النقطة والميل $y-y_0=m(x-x_0)$، ثم نعزل $y$. وبنقطتين نحسب الميل أولًا ثم نستعمل إحداهما. والمستقيمات المتوازية لها الميل نفسه. وللتحقق عوّض النقطتين.',
            'The line through $(x_0,\\,y_0)$ with slope $m$ has the point-slope equation $y-y_0=m(x-x_0)$; then solve for $y$. With two points, first find the slope and then use one of them. Parallel lines have the same slope. To check, substitute the points.'
        ),
        examplePrompt: say('Idatzi $(0,\\,1)$ eta $(3,\\,7)$ puntuetatik pasatzen den zuzenaren ekuazioa.', 'Escribe la ecuación de la recta que pasa por $(0,\\,1)$ y $(3,\\,7)$.', 'اكتب معادلة المستقيم المار بـ $(0,\\,1)$ و$(3,\\,7)$.', 'Write the equation of the line through $(0,\\,1)$ and $(3,\\,7)$.'),
        example: same('$\\begin{gathered}m=\\frac{7-1}{3-0}=2\\\\ y-1=2(x-0)\\ \\to\\ y=2x+1\\end{gathered}$'),
        exampleAnswer: say('Jatorriko ordenatua 1 da, $(0,\\,1)$ puntutik pasatzen delako.', 'La ordenada en el origen es 1, porque pasa por $(0,\\,1)$.', 'الجزء المقطوع 1 لأنه يمر بـ $(0,\\,1)$.', 'The y-intercept is 1, because it goes through $(0,\\,1)$.')
    },

    /* ---------- 2. Quadratic functions ---------- */
    'parabola-a': {
        vocabulary: [
            say('parabola', 'parábola', 'القطع المكافئ', 'parabola'),
            say('erpina', 'vértice', 'الرأس', 'vertex')
        ],
        explanation: say(
            'Bigarren mailako polinomio baten grafikoa parabola bat da. Errazena, $y=ax^{2}$, erpina $(0,\\,0)$ puntuan du, eta Y ardatzarekiko simetrikoa da. $a>0$ bada, adarrak gora doaz; $a<0$ bada, behera. $|a|$ handiagoa, parabola orduan eta itxiagoa.',
            'La gráfica de un polinomio de segundo grado es una parábola. La más sencilla, $y=ax^{2}$, tiene el vértice en $(0,\\,0)$ y es simétrica respecto del eje Y. Si $a>0$, las ramas van hacia arriba; si $a<0$, hacia abajo. Cuanto mayor es $|a|$, más cerrada es la parábola.',
            'رسم كثير حدود من الدرجة الثانية قطع مكافئ. وأبسطه $y=ax^{2}$ رأسه في $(0,\\,0)$ وهو متناظر حول محور Y. إذا كان $a>0$ يتجه الفرعان إلى الأعلى، وإذا كان $a<0$ فإلى الأسفل. وكلما كبر $|a|$ ضاق القطع المكافئ.',
            'The graph of a quadratic polynomial is a parabola. The simplest, $y=ax^{2}$, has its vertex at $(0,\\,0)$ and is symmetric about the Y axis. If $a>0$, the arms go up; if $a<0$, down. The bigger $|a|$, the narrower the parabola.'
        ),
        examplePrompt: say('Kalkulatu $y=\\frac{1}{2}x^{2}$ funtzioa $\\pm 2$ eta $\\pm 4$ balioetan. $y=x^{2}$ baino irekiagoa ala itxiagoa da?', 'Calcula $y=\\frac{1}{2}x^{2}$ en $\\pm 2$ y en $\\pm 4$. ¿Es más abierta o más cerrada que $y=x^{2}$?', 'احسب $y=\\frac{1}{2}x^{2}$ عند $\\pm 2$ و$\\pm 4$. هل هو أوسع أم أضيق من $y=x^{2}$؟', 'Work out $y=\\frac{1}{2}x^{2}$ at $\\pm 2$ and $\\pm 4$. Is it wider or narrower than $y=x^{2}$?'),
        example: same('$\\frac{1}{2}\\cdot 2^{2}=2\\qquad\\frac{1}{2}\\cdot 4^{2}=8$'),
        exampleAnswer: say('Irekiagoa: $|a|=\\frac{1}{2}<1$. Balio simetrikoek $y$ bera ematen dute.', 'Más abierta: $|a|=\\frac{1}{2}<1$. Los valores simétricos dan la misma $y$.', 'أوسع: $|a|=\\frac{1}{2}<1$. والقيم المتناظرة تعطي $y$ نفسها.', 'Wider: $|a|=\\frac{1}{2}<1$. Symmetric values give the same $y$.')
    },
    vertex: {
        vocabulary: [
            say('erpina', 'vértice', 'الرأس', 'vertex'),
            say('simetria-ardatza', 'eje de simetría', 'محور التناظر', 'axis of symmetry'),
            say('ibiltartea', 'recorrido', 'المدى', 'range')
        ],
        explanation: say(
            '$y=ax^{2}+bx+c$ parabolan, erpinaren abszisa $x_v=\\dfrac{-b}{2a}$ da, eta ordenatua, haren irudia: $y_v=f(x_v)$. Simetria-ardatza $x=x_v$ zuzena da. $a>0$ bada, erpina minimoa da eta ibiltartea $[y_v,\\,+\\infty)$; $a<0$ bada, maximoa eta $(-\\infty,\\,y_v]$.',
            'En $y=ax^{2}+bx+c$, la abscisa del vértice es $x_v=\\dfrac{-b}{2a}$, y la ordenada, su imagen: $y_v=f(x_v)$. El eje de simetría es la recta $x=x_v$. Si $a>0$, el vértice es un mínimo y el recorrido es $[y_v,\\,+\\infty)$; si $a<0$, un máximo y $(-\\infty,\\,y_v]$.',
            'في $y=ax^{2}+bx+c$ فاصلة الرأس $x_v=\\dfrac{-b}{2a}$ وترتيبه صورتها: $y_v=f(x_v)$. ومحور التناظر هو المستقيم $x=x_v$. إذا كان $a>0$ فالرأس قيمة صغرى والمدى $[y_v,\\,+\\infty)$، وإذا كان $a<0$ فقيمة عظمى و$(-\\infty,\\,y_v]$.',
            'In $y=ax^{2}+bx+c$, the x-coordinate of the vertex is $x_v=\\dfrac{-b}{2a}$, and the y-coordinate, its image: $y_v=f(x_v)$. The axis of symmetry is the line $x=x_v$. If $a>0$, the vertex is a minimum and the range is $[y_v,\\,+\\infty)$; if $a<0$, a maximum and $(-\\infty,\\,y_v]$.'
        ),
        examplePrompt: say('Aurkitu $y=x^{2}-4x+3$ parabolaren erpina eta ibiltartea.', 'Halla el vértice y el recorrido de $y=x^{2}-4x+3$.', 'أوجد رأس $y=x^{2}-4x+3$ ومداه.', 'Find the vertex and the range of $y=x^{2}-4x+3$.'),
        example: same('$\\begin{gathered}x_v=\\frac{4}{2}=2\\\\ y_v=4-8+3=-1\\end{gathered}$'),
        exampleAnswer: say('$V(2,\\,-1)$ minimoa da: Rec $f=[-1,\\,+\\infty)$.', '$V(2,\\,-1)$ es un mínimo: Rec $f=[-1,\\,+\\infty)$.', '$V(2,\\,-1)$ قيمة صغرى: Rec $f=[-1,\\,+\\infty)$.', '$V(2,\\,-1)$ is a minimum: Rec $f=[-1,\\,+\\infty)$.'),
        why: {
            text: say(
                'Parabola simetrikoa da: $y$ bera duten bi puntu ardatzetik distantzia berera daude. $ax^{2}+bx+c=0$ ekuazioaren erroak $\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$ dira, eta haien erdiko puntua $\\frac{-b}{2a}$ da: han dago ardatza, eta haren gainean, erpina.',
                'La parábola es simétrica: dos puntos con la misma $y$ están a la misma distancia del eje. Las raíces de $ax^{2}+bx+c=0$ son $\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$, y su punto medio es $\\frac{-b}{2a}$: ahí está el eje, y sobre él, el vértice.',
                'القطع المكافئ متناظر: نقطتان لهما $y$ نفسها على البعد نفسه من المحور. وجذرا $ax^{2}+bx+c=0$ هما $\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$، ومنتصفهما $\\frac{-b}{2a}$: هناك المحور، وعليه الرأس.',
                'The parabola is symmetric: two points with the same $y$ are the same distance from the axis. The roots of $ax^{2}+bx+c=0$ are $\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$, and their midpoint is $\\frac{-b}{2a}$: the axis is there, and the vertex on it.'
            )
        }
    },
    'parabola-cuts': {
        vocabulary: [
            say('diskriminatzailea', 'discriminante', 'المميز', 'discriminant'),
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'intercept')
        ],
        explanation: say(
            'Y ardatzarekiko ebaki-puntua $(0,\\,c)$ da. X ardatzarekikoak $ax^{2}+bx+c=0$ ekuazioaren ebazpenak dira, eta diskriminatzaileak, $\\Delta=b^{2}-4ac$, zenbat dauden esaten du. Parabola marrazteko: erpina, ebaki-puntuak eta puntu batzuk bi aldeetan, simetria aprobetxatuz.',
            'El corte con el eje Y es $(0,\\,c)$. Los cortes con el eje X son las soluciones de $ax^{2}+bx+c=0$, y el discriminante, $\\Delta=b^{2}-4ac$, dice cuántos hay. Para dibujar la parábola: el vértice, los cortes y algunos puntos a los dos lados, aprovechando la simetría.',
            'نقطة التقاطع مع محور Y هي $(0,\\,c)$. ونقاط التقاطع مع محور X هي حلول $ax^{2}+bx+c=0$، والمميز $\\Delta=b^{2}-4ac$ يبيّن عددها. ولرسم القطع المكافئ: الرأس ونقاط التقاطع وبعض النقاط على الجانبين مستفيدًا من التناظر.',
            'The Y-axis intercept is $(0,\\,c)$. The X-axis intercepts are the solutions of $ax^{2}+bx+c=0$, and the discriminant, $\\Delta=b^{2}-4ac$, tells how many there are. To draw the parabola: the vertex, the intercepts and a few points on both sides, using the symmetry.'
        ),
        cases: [
            { title: say('Bi ebaki-puntu', 'Dos cortes', 'نقطتا تقاطع', 'Two intercepts'), text: say('Parabolak X ardatza zeharkatzen du.', 'La parábola atraviesa el eje X.', 'يعبر القطع المكافئ محور X.', 'The parabola crosses the X axis.'), math: same('$\\Delta>0$') },
            { title: say('Bat', 'Uno', 'نقطة واحدة', 'One'), text: say('Erpina ardatzean dago.', 'El vértice está en el eje.', 'الرأس على المحور.', 'The vertex is on the axis.'), math: same('$\\Delta=0$') },
            { title: say('Bat ere ez', 'Ninguno', 'لا شيء', 'None'), text: say('Parabola osoa ardatzaren gainean edo azpian.', 'Toda la parábola, por encima o por debajo del eje.', 'القطع كله فوق المحور أو تحته.', 'The whole parabola is above or below the axis.'), math: same('$\\Delta<0$') }
        ],
        examplePrompt: say('Aurkitu $y=x^{2}-4$ parabolak ardatzekin dituen ebaki-puntuak.', 'Halla los cortes de $y=x^{2}-4$ con los ejes.', 'أوجد نقاط تقاطع $y=x^{2}-4$ مع المحورين.', 'Find where $y=x^{2}-4$ cuts the axes.'),
        example: same('$\\begin{gathered}\\Delta=0-4\\cdot 1\\cdot(-4)=16\\\\ (-2,\\,0)\\quad(2,\\,0)\\quad(0,\\,-4)\\end{gathered}$'),
        exampleAnswer: say('Bi ebaki-puntu X ardatzarekin, $-2$ eta 2 puntuetan, eta Y ardatza $(0,\\,-4)$ puntuan.', 'Dos cortes con el eje X, en $-2$ y en 2, y el eje Y en $(0,\\,-4)$.', 'نقطتا تقاطع مع محور X عند $-2$ و2، ومحور Y في $(0,\\,-4)$.', 'Two X-axis intercepts, at $-2$ and 2, and the Y axis at $(0,\\,-4)$.')
    },

    /* ---------- 3. Translations and intersections ---------- */
    'vertex-form': {
        vocabulary: [
            say('lekualdaketa', 'traslación', 'انسحاب', 'translation'),
            say('erpina', 'vértice', 'الرأس', 'vertex')
        ],
        explanation: say(
            '$y=a(x-p)^{2}+q$ funtzioa $y=ax^{2}$ parabola da, $p$ unitate horizontalean eta $q$ bertikalean lekualdatuta: haren erpina $(p,\\,q)$ da. Kontuz zeinuarekin: $(x+1)^{2}=(x-(-1))^{2}$ ezkerrera doa. Forma orokorrera pasatzeko, karratua garatzen da; alderantziz, erpina kalkulatzen da. $a$ ez da aldatzen.',
            '$y=a(x-p)^{2}+q$ es la parábola $y=ax^{2}$ trasladada $p$ unidades en horizontal y $q$ en vertical: su vértice es $(p,\\,q)$. Cuidado con el signo: $(x+1)^{2}=(x-(-1))^{2}$ va a la izquierda. Para pasar a la forma general se desarrolla el cuadrado; al revés, se calcula el vértice. La $a$ no cambia.',
            '$y=a(x-p)^{2}+q$ هو القطع المكافئ $y=ax^{2}$ بعد انسحاب $p$ وحدة أفقيًا و$q$ رأسيًا: رأسه $(p,\\,q)$. انتبه للإشارة: $(x+1)^{2}=(x-(-1))^{2}$ يتجه إلى اليسار. وللانتقال إلى الصيغة العامة ننشر المربع، وبالعكس نحسب الرأس. و$a$ لا تتغير.',
            '$y=a(x-p)^{2}+q$ is the parabola $y=ax^{2}$ translated $p$ units horizontally and $q$ vertically: its vertex is $(p,\\,q)$. Mind the sign: $(x+1)^{2}=(x-(-1))^{2}$ moves to the left. To get the general form, expand the square; the other way round, find the vertex. The $a$ does not change.'
        ),
        examplePrompt: say('Idatzi $y=x^{2}-6x+5$ funtzioa $y=a(x-p)^{2}+q$ eran.', 'Escribe $y=x^{2}-6x+5$ en la forma $y=a(x-p)^{2}+q$.', 'اكتب $y=x^{2}-6x+5$ على الصيغة $y=a(x-p)^{2}+q$.', 'Write $y=x^{2}-6x+5$ in the form $y=a(x-p)^{2}+q$.'),
        example: same('$\\begin{gathered}x_v=\\frac{6}{2}=3\\\\ y_v=9-18+5=-4\\\\ y=(x-3)^{2}-4\\end{gathered}$'),
        exampleAnswer: say('Erpina $(3,\\,-4)$: $y=x^{2}$, 3 eskuinera eta 4 behera lekualdatuta.', 'Vértice $(3,\\,-4)$: $y=x^{2}$ movida 3 a la derecha y 4 hacia abajo.', 'الرأس $(3,\\,-4)$: $y=x^{2}$ منسحبة 3 إلى اليمين و4 إلى الأسفل.', 'Vertex $(3,\\,-4)$: $y=x^{2}$ moved 3 to the right and 4 down.')
    },
    'parabola-from': {
        vocabulary: [
            say('forma faktorizatua', 'forma factorizada', 'الصيغة المحللة', 'factored form'),
            say('erroak', 'raíces', 'الجذور', 'roots')
        ],
        explanation: say(
            'Erpina, $(p,\\,q)$, ezagutzen bada, $y=a(x-p)^{2}+q$ idazten da, eta $a$ beste puntu bat ordeztuta ateratzen da. X ardatzarekiko ebaki-puntuak ezagutzen badira, $r_1$ eta $r_2$ erroak, forma faktorizatua erabiltzen da, $y=a(x-r_1)(x-r_2)$, eta beste puntu batek ematen du $a$. Erpinaren abszisa erroen erdian dago.',
            'Si se conoce el vértice $(p,\\,q)$, se escribe $y=a(x-p)^{2}+q$ y se halla $a$ sustituyendo otro punto. Si se conocen los cortes con el eje X, las raíces $r_1$ y $r_2$, se usa la forma factorizada, $y=a(x-r_1)(x-r_2)$, y otro punto da $a$. La abscisa del vértice está en medio de las raíces.',
            'إذا عُرف الرأس $(p,\\,q)$ نكتب $y=a(x-p)^{2}+q$ ونجد $a$ بتعويض نقطة أخرى. وإذا عُرفت نقاط التقاطع مع محور X أي الجذور $r_1$ و$r_2$ نستعمل الصيغة المحللة $y=a(x-r_1)(x-r_2)$ وتعطي نقطة أخرى $a$. وفاصلة الرأس في منتصف الجذور.',
            'If you know the vertex $(p,\\,q)$, write $y=a(x-p)^{2}+q$ and find $a$ by substituting another point. If you know where it cuts the X axis, the roots $r_1$ and $r_2$, use the factored form, $y=a(x-r_1)(x-r_2)$, and another point gives $a$. The x-coordinate of the vertex is midway between the roots.'
        ),
        examplePrompt: say('Parabola batek X ardatza $-1$ eta 3 puntuetan mozten du, eta $(0,\\,6)$ puntutik pasatzen da. Idatzi haren ekuazioa.', 'Una parábola corta al eje X en $-1$ y en 3, y pasa por $(0,\\,6)$. Escribe su ecuación.', 'قطع مكافئ يقطع محور X عند $-1$ و3 ويمر بـ $(0,\\,6)$. اكتب معادلته.', 'A parabola cuts the X axis at $-1$ and 3, and goes through $(0,\\,6)$. Write its equation.'),
        example: same('$\\begin{gathered}y=a(x+1)(x-3)\\\\ 6=a\\cdot 1\\cdot(-3)\\ \\to\\ a=-2\\end{gathered}$'),
        exampleAnswer: say('$y=-2(x+1)(x-3)$: adarrak behera doaz.', '$y=-2(x+1)(x-3)$: las ramas van hacia abajo.', '$y=-2(x+1)(x-3)$: الفرعان نحو الأسفل.', '$y=-2(x+1)(x-3)$: the arms go down.')
    },
    'line-parabola': {
        vocabulary: [
            say('ebakitzailea', 'secante', 'قاطع', 'secant'),
            say('ukitzailea', 'tangente', 'مماس', 'tangent')
        ],
        explanation: say(
            'Bi grafikoren ebaki-puntuek bi ekuazioak betetzen dituzte batera. Zuzen eta parabola batekin, bi adierazpenak berdindu eta ateratzen den bigarren mailako ekuazioa ebazten da; ordenatuak zuzenean kalkulatzen dira. $\\Delta>0$ bada, zuzena ebakitzailea da; $\\Delta=0$ bada, ukitzailea; $\\Delta<0$ bada, ez dira mozten.',
            'Los puntos de corte de dos gráficas cumplen a la vez sus dos ecuaciones. Con una recta y una parábola, se igualan las dos expresiones y se resuelve la ecuación de segundo grado que sale; las ordenadas se calculan en la recta. Si $\\Delta>0$, la recta es secante; si $\\Delta=0$, tangente; si $\\Delta<0$, no se cortan.',
            'نقاط تقاطع رسمين تحقق معادلتيهما معًا. ومع مستقيم وقطع مكافئ نساوي العبارتين ونحل معادلة الدرجة الثانية الناتجة، ونحسب التراتيب في المستقيم. إذا كان $\\Delta>0$ فالمستقيم قاطع، وإذا كان $\\Delta=0$ فمماس، وإذا كان $\\Delta<0$ فلا يتقاطعان.',
            'The points where two graphs meet satisfy both their equations at once. With a line and a parabola, set the two expressions equal and solve the quadratic equation you get; work out the y values on the line. If $\\Delta>0$, the line is a secant; if $\\Delta=0$, a tangent; if $\\Delta<0$, they do not meet.'
        ),
        examplePrompt: say('Non mozten dira $y=x^{2}$ eta $y=2x-1$?', '¿Dónde se cortan $y=x^{2}$ e $y=2x-1$?', 'أين يتقاطع $y=x^{2}$ و$y=2x-1$؟', 'Where do $y=x^{2}$ and $y=2x-1$ meet?'),
        example: same('$\\begin{gathered}x^{2}=2x-1\\ \\to\\ x^{2}-2x+1=0\\\\ \\Delta=4-4=0\\ \\to\\ x=1\\end{gathered}$'),
        exampleAnswer: say('$(1,\\,1)$ puntuan bakarrik: zuzena ukitzailea da.', 'Solo en $(1,\\,1)$: la recta es tangente.', 'في $(1,\\,1)$ فقط: المستقيم مماس.', 'Only at $(1,\\,1)$: the line is a tangent.'),
        why: {
            text: say(
                'Ebaki-puntu bat bi grafikoetan dago; beraz, haren $y$ parabolarena da eta zuzenarena ere bai. Bi adierazpenak berdintzean, biek $y$ bera ematen duten $x$ balioak bilatzen dira.',
                'Un punto de corte está en las dos gráficas, así que su $y$ es la de la parábola y también la de la recta. Al igualar las dos expresiones se buscan las $x$ en las que las dos dan la misma $y$.',
                'نقطة التقاطع على الرسمين معًا، فقيمة $y$ فيها للقطع المكافئ وللمستقيم أيضًا. وبمساواة العبارتين نبحث عن قيم $x$ التي تعطي فيها العبارتان $y$ نفسها.',
                'A meeting point is on both graphs, so its $y$ is the parabola\'s and also the line\'s. Setting the two expressions equal looks for the $x$ values where both give the same $y$.'
            )
        }
    },

    /* ---------- 4. Absolute value ---------- */
    'absolute-linear': {
        vocabulary: [
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value'),
            say('distantzia', 'distancia', 'المسافة', 'distance')
        ],
        explanation: say(
            'Balio absolutua zenbakia da, zeinurik gabe: $|-5|=5$. Horregatik, $y=|f(x)|$ ez da inoiz negatiboa: $f(x)\\ge 0$ den lekuan grafikoa ez da aldatzen, eta $f(x)<0$ den lekuan gorantz islatzen da, X ardatzarekiko. $|x-a|$ da $x$ zenbakitik $a$ zenbakirako distantzia: $|x-a|=b$ ekuazioak bi ebazpen ditu.',
            'El valor absoluto es el número sin su signo: $|-5|=5$. Por eso $y=|f(x)|$ nunca es negativa: donde $f(x)\\ge 0$ la gráfica no cambia, y donde $f(x)<0$ se refleja hacia arriba respecto del eje X. $|x-a|$ es la distancia de $x$ a $a$: la ecuación $|x-a|=b$ tiene dos soluciones.',
            'القيمة المطلقة هي العدد بلا إشارة: $|-5|=5$. لذلك $y=|f(x)|$ ليست سالبة أبدًا: حيث $f(x)\\ge 0$ لا يتغير الرسم، وحيث $f(x)<0$ ينعكس إلى الأعلى حول محور X. و$|x-a|$ هي المسافة من $x$ إلى $a$: والمعادلة $|x-a|=b$ لها حلّان.',
            'The absolute value is the number without its sign: $|-5|=5$. So $y=|f(x)|$ is never negative: where $f(x)\\ge 0$ the graph does not change, and where $f(x)<0$ it is reflected upwards in the X axis. $|x-a|$ is the distance from $x$ to $a$: the equation $|x-a|=b$ has two solutions.'
        ),
        examplePrompt: say('Ebatzi $|x-1|=3$.', 'Resuelve $|x-1|=3$.', 'حُلّ $|x-1|=3$.', 'Solve $|x-1|=3$.'),
        example: same('$\\begin{gathered}x-1=3\\ \\to\\ x=4\\\\ x-1=-3\\ \\to\\ x=-2\\end{gathered}$'),
        exampleAnswer: say('4 eta $-2$ zenbakiak 1 zenbakitik 3 unitatera daude.', '4 y $-2$ están a 3 unidades del 1.', 'العددان 4 و$-2$ على بعد 3 وحدات من 1.', '4 and $-2$ are 3 units away from 1.')
    },
    'absolute-pieces': {
        vocabulary: [
            say('zatika', 'a trozos', 'على أجزاء', 'piecewise'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Balio absolutua kentzeko, aztertu barrukoaren zeinua. Positiboa edo zero den lekuan, bere horretan uzten da; negatiboa den lekuan, zeinua aldatzen zaio. Zatien arteko muga barrukoaren erroa da. Bi zatiek balio bera dute han: funtzioa jarraitua da.',
            'Para quitar el valor absoluto, estudia el signo de lo de dentro. Donde es positivo o cero, se deja igual; donde es negativo, se le cambia el signo. El límite entre los trozos es la raíz de lo de dentro. Los dos trozos valen lo mismo en ella: la función es continua.',
            'لإزالة القيمة المطلقة ادرس إشارة ما بداخلها. حيث يكون موجبًا أو صفرًا نتركه كما هو، وحيث يكون سالبًا نغيّر إشارته. والحد بين الأجزاء هو جذر ما بالداخل، والجزءان يعطيان القيمة نفسها عنده: الدالة متصلة.',
            'To remove the absolute value, study the sign of what is inside. Where it is positive or zero, leave it as it is; where it is negative, change its sign. The boundary between the pieces is the root of what is inside. Both pieces give the same value there: the function is continuous.'
        ),
        examplePrompt: say('Idatzi $y=|x+3|$ zatika.', 'Escribe $y=|x+3|$ a trozos.', 'اكتب $y=|x+3|$ على أجزاء.', 'Write $y=|x+3|$ piecewise.'),
        example: same('$\\begin{gathered}x+3=0\\ \\to\\ x=-3\\\\ y=-x-3\\quad(x<-3)\\\\ y=x+3\\quad(x\\ge -3)\\end{gathered}$'),
        exampleAnswer: say('$x=-3$ puntuan bi zatiek 0 balio dute.', 'En $x=-3$ los dos trozos valen 0.', 'عند $x=-3$ يعطي الجزءان 0.', 'At $x=-3$ both pieces give 0.')
    },
    'absolute-quadratic': {
        vocabulary: [
            say('maximo erlatiboa', 'máximo relativo', 'قيمة عظمى نسبية', 'local maximum'),
            say('minimoa', 'mínimo', 'قيمة صغرى', 'minimum')
        ],
        explanation: say(
            'Parabola batekin, berdin: X ardatzaren azpian geratzen den zatia gorantz islatzen da. Gorantz irekitzen bada, zati hori ebaki-puntuen artean dago: erpina igo eta maximo erlatiboa bihurtzen da, eta ebaki-puntuak minimoak dira. Parabolak X ardatza mozten ez badu, ez da ezer aldatzen.',
            'Con una parábola, igual: se refleja hacia arriba la parte que queda por debajo del eje X. Si se abre hacia arriba, esa parte está entre los cortes: el vértice sube y es un máximo relativo, y los cortes son mínimos. Si la parábola no corta al eje X, no cambia nada.',
            'مع القطع المكافئ الأمر نفسه: يُعكس إلى الأعلى الجزء الواقع تحت محور X. وإذا كان مفتوحًا إلى الأعلى فذلك الجزء بين نقطتي التقاطع: يصعد الرأس فيصبح قيمة عظمى نسبية، ونقطتا التقاطع قيمتان صغريان. وإذا لم يقطع محور X فلا يتغير شيء.',
            'With a parabola, the same: the part below the X axis is reflected upwards. If it opens upwards, that part lies between the intercepts: the vertex goes up and becomes a local maximum, and the intercepts are minima. If the parabola does not cut the X axis, nothing changes.'
        ),
        examplePrompt: say('Aurkitu $y=|x^{2}-4|$ funtzioaren maximoak eta minimoak.', 'Halla los máximos y mínimos de $y=|x^{2}-4|$.', 'أوجد القيم العظمى والصغرى لـ $y=|x^{2}-4|$.', 'Find the maxima and minima of $y=|x^{2}-4|$.'),
        example: same('$\\begin{gathered}x^{2}-4=0\\ \\to\\ x=-2,\\ x=2\\\\ (0,\\,-4)\\ \\to\\ (0,\\,4)\\end{gathered}$'),
        exampleAnswer: say('Minimoak, $(-2,\\,0)$ eta $(2,\\,0)$; maximo erlatiboa, $(0,\\,4)$.', 'Mínimos $(-2,\\,0)$ y $(2,\\,0)$; máximo relativo $(0,\\,4)$.', 'القيمتان الصغريان $(-2,\\,0)$ و$(2,\\,0)$؛ والقيمة العظمى النسبية $(0,\\,4)$.', 'Minima $(-2,\\,0)$ and $(2,\\,0)$; local maximum $(0,\\,4)$.')
    },

    /* ---------- 5. Rational functions ---------- */
    inverse: {
        vocabulary: [
            say('hiperbola', 'hipérbola', 'القطع الزائد', 'hyperbola'),
            say('asintota', 'asíntota', 'مقارب', 'asymptote'),
            say('alderantziz proportzionalak', 'inversamente proporcionales', 'تناسب عكسي', 'inversely proportional')
        ],
        explanation: say(
            'Bi magnitude alderantziz proportzionalak dira haien biderkadura konstantea bada: $x\\cdot y=k$, edo $y=\\frac{k}{x}$. Grafikoa bi adarreko hiperbola bat da: I. eta III. koadranteetan $k>0$ bada, eta II. eta IV. koadranteetan $k<0$ bada. Ardatzak asintotak dira: grafikoa hurbiltzen zaie, ukitu gabe. $k$ puntu baten koordenatuen biderkadura da.',
            'Dos magnitudes son inversamente proporcionales si su producto es constante: $x\\cdot y=k$, o sea, $y=\\frac{k}{x}$. Su gráfica es una hipérbola de dos ramas: en los cuadrantes I y III si $k>0$, y en II y IV si $k<0$. Los ejes son asíntotas: la gráfica se acerca a ellos sin tocarlos. $k$ es el producto de las coordenadas de un punto.',
            'يكون مقداران في تناسب عكسي إذا كان جداؤهما ثابتًا: $x\\cdot y=k$، أي $y=\\frac{k}{x}$. ورسمه قطع زائد بفرعين: في الربعين الأول والثالث إذا كان $k>0$، وفي الثاني والرابع إذا كان $k<0$. والمحوران مقاربان: يقترب منهما الرسم دون أن يلمسهما. و$k$ جداء إحداثيي نقطة.',
            'Two quantities are inversely proportional if their product is constant: $x\\cdot y=k$, that is, $y=\\frac{k}{x}$. Its graph is a hyperbola with two branches: in quadrants I and III if $k>0$, and in II and IV if $k<0$. The axes are asymptotes: the graph gets closer to them without touching. $k$ is the product of the coordinates of a point.'
        ),
        examplePrompt: say('$y=\\frac{k}{x}$ hiperbola $(1,\\,4)$ puntutik pasatzen da. Aurkitu $k$ eta $f(-2)$.', 'La hipérbola $y=\\frac{k}{x}$ pasa por $(1,\\,4)$. Halla $k$ y $f(-2)$.', 'القطع الزائد $y=\\frac{k}{x}$ يمر بـ $(1,\\,4)$. أوجد $k$ و$f(-2)$.', 'The hyperbola $y=\\frac{k}{x}$ goes through $(1,\\,4)$. Find $k$ and $f(-2)$.'),
        example: same('$\\begin{gathered}k=1\\cdot 4=4\\\\ f(-2)=\\frac{4}{-2}=-2\\end{gathered}$'),
        exampleAnswer: say('$k=4>0$: adarrak I. eta III. koadranteetan.', '$k=4>0$: ramas en los cuadrantes I y III.', '$k=4>0$: الفرعان في الربعين الأول والثالث.', '$k=4>0$: branches in quadrants I and III.')
    },
    'hyperbola-shift': {
        vocabulary: [
            say('asintota bertikala', 'asíntota vertical', 'مقارب رأسي', 'vertical asymptote'),
            say('asintota horizontala', 'asíntota horizontal', 'مقارب أفقي', 'horizontal asymptote')
        ],
        explanation: say(
            '$y=\\dfrac{k}{x-a}+b$ funtzioa $y=\\frac{k}{x}$ hiperbola da, $a$ unitate horizontalean eta $b$ bertikalean lekualdatuta. Asintotak ere mugitzen dira: asintota bertikala $x=a$ da, izendatzailea anulatzen den lekua, eta asintota horizontala, $y=b$. Beraz, Dom $f=\\mathbb{R}-\\{a\\}$ eta Rec $f=\\mathbb{R}-\\{b\\}$.',
            '$y=\\dfrac{k}{x-a}+b$ es la hipérbola $y=\\frac{k}{x}$ trasladada $a$ unidades en horizontal y $b$ en vertical. Sus asíntotas también se mueven: la asíntota vertical es $x=a$, donde se anula el denominador, y la asíntota horizontal, $y=b$. Así, Dom $f=\\mathbb{R}-\\{a\\}$ y Rec $f=\\mathbb{R}-\\{b\\}$.',
            '$y=\\dfrac{k}{x-a}+b$ هو القطع الزائد $y=\\frac{k}{x}$ بعد انسحاب $a$ وحدة أفقيًا و$b$ رأسيًا. ومقارباه يتحركان أيضًا: المقارب الرأسي $x=a$ حيث ينعدم المقام، والمقارب الأفقي $y=b$. لذلك Dom $f=\\mathbb{R}-\\{a\\}$ وRec $f=\\mathbb{R}-\\{b\\}$.',
            '$y=\\dfrac{k}{x-a}+b$ is the hyperbola $y=\\frac{k}{x}$ translated $a$ units horizontally and $b$ vertically. Its asymptotes move too: the vertical asymptote is $x=a$, where the denominator is 0, and the horizontal asymptote, $y=b$. So Dom $f=\\mathbb{R}-\\{a\\}$ and Rec $f=\\mathbb{R}-\\{b\\}$.'
        ),
        examplePrompt: say('Idatzi $y=\\frac{1}{x-2}+1$ funtzioaren asintotak eta Y ardatzarekiko ebaki-puntua.', 'Escribe las asíntotas y el corte con el eje Y de $y=\\frac{1}{x-2}+1$.', 'اكتب مقاربي $y=\\frac{1}{x-2}+1$ ونقطة تقاطعه مع محور Y.', 'Write the asymptotes of $y=\\frac{1}{x-2}+1$ and where it cuts the Y axis.'),
        example: same('$\\begin{gathered}x=2\\qquad y=1\\\\ f(0)=\\frac{1}{-2}+1=\\frac{1}{2}\\end{gathered}$'),
        exampleAnswer: say('Dom $f=\\mathbb{R}-\\{2\\}$ eta Rec $f=\\mathbb{R}-\\{1\\}$.', 'Dom $f=\\mathbb{R}-\\{2\\}$ y Rec $f=\\mathbb{R}-\\{1\\}$.', 'Dom $f=\\mathbb{R}-\\{2\\}$ وRec $f=\\mathbb{R}-\\{1\\}$.', 'Dom $f=\\mathbb{R}-\\{2\\}$ and Rec $f=\\mathbb{R}-\\{1\\}$.')
    },
    'rational-form': {
        vocabulary: [
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('hondarra', 'resto', 'الباقي', 'remainder')
        ],
        explanation: say(
            '$y=\\dfrac{ax+b}{cx+d}$ ere hiperbola bat da. Zatiketa eginda ikusten da: zatidura asintota horizontala da, eta hondarra, $k$ berria. Lasterbidea: asintota bertikala izendatzailearen erroa da, $x=\\frac{-d}{c}$, eta horizontala, $x$ letraren koefizienteen zatidura, $y=\\frac{a}{c}$.',
            '$y=\\dfrac{ax+b}{cx+d}$ también es una hipérbola. Se ve al hacer la división: el cociente es la asíntota horizontal y el resto, el nuevo $k$. Un atajo: la asíntota vertical es la raíz del denominador, $x=\\frac{-d}{c}$, y la horizontal, el cociente de los coeficientes de $x$, $y=\\frac{a}{c}$.',
            '$y=\\dfrac{ax+b}{cx+d}$ قطع زائد أيضًا. ويظهر ذلك بالقسمة: خارج القسمة هو المقارب الأفقي والباقي هو $k$ الجديد. واختصارًا: المقارب الرأسي جذر المقام $x=\\frac{-d}{c}$، والأفقي خارج قسمة معاملي $x$، $y=\\frac{a}{c}$.',
            '$y=\\dfrac{ax+b}{cx+d}$ is also a hyperbola. You see it by dividing: the quotient is the horizontal asymptote and the remainder, the new $k$. A shortcut: the vertical asymptote is the root of the denominator, $x=\\frac{-d}{c}$, and the horizontal one, the quotient of the coefficients of $x$, $y=\\frac{a}{c}$.'
        ),
        examplePrompt: say('Aurkitu $y=\\frac{3x-1}{x+2}$ funtzioaren asintotak.', 'Halla las asíntotas de $y=\\frac{3x-1}{x+2}$.', 'أوجد مقاربي $y=\\frac{3x-1}{x+2}$.', 'Find the asymptotes of $y=\\frac{3x-1}{x+2}$.'),
        example: same('$\\begin{gathered}y=3-\\frac{7}{x+2}\\\\ x=-2\\qquad y=3\\end{gathered}$'),
        exampleAnswer: say('Zatidura 3 eta hondarra $-7$: $y=\\frac{-7}{x}$ hiperbola, lekualdatuta.', 'Cociente 3 y resto $-7$: la hipérbola $y=\\frac{-7}{x}$, trasladada.', 'خارج القسمة 3 والباقي $-7$: القطع الزائد $y=\\frac{-7}{x}$ بعد الانسحاب.', 'Quotient 3 and remainder $-7$: the hyperbola $y=\\frac{-7}{x}$, translated.'),
        why: {
            text: say(
                '$x$ oso handia denean, hondarra zati $cx+d$ ia 0 da, eta zatidura bakarrik geratzen da, $\\frac{a}{c}$: horregatik da $y=\\frac{a}{c}$ asintota horizontala. Eta izendatzailearen errotik hurbil, zatikia izugarri handitzen da: han dago bertikala.',
                'Cuando $x$ es muy grande, el resto entre $cx+d$ es casi 0 y solo queda el cociente, $\\frac{a}{c}$: por eso $y=\\frac{a}{c}$ es la asíntota horizontal. Y cerca de la raíz del denominador, la fracción se dispara: ahí está la vertical.',
                'عندما تكبر $x$ كثيرًا يقترب الباقي على $cx+d$ من 0 ولا يبقى إلا خارج القسمة $\\frac{a}{c}$: لذلك $y=\\frac{a}{c}$ هو المقارب الأفقي. وقرب جذر المقام يكبر الكسر بلا حد: هناك الرأسي.',
                'When $x$ is very large, the remainder over $cx+d$ is almost 0 and only the quotient is left, $\\frac{a}{c}$: that is why $y=\\frac{a}{c}$ is the horizontal asymptote. And near the root of the denominator, the fraction shoots up: the vertical one is there.'
            )
        }
    }
}
