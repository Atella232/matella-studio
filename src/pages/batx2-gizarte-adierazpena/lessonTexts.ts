import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { Bach2gSketchTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Funtzioen adierazpen grafikoa · Batxilergoa 2 · Gizarte Zientziak — what
   each lesson tells: the new words, a short explanation, the example as an
   exercise with numbers of its own, the key words and, in three lessons,
   «Why does it work?». Plain data so the tests can import it.
   ========================================================================== */

export const bach2gSketchLessonTexts: Record<Bach2gSketchTopicId, LessonTexts> = {
    /* ---------- 1. At first sight ---------- */
    domain: {
        definitions: [
            { term: say('Izate-eremua', 'Dominio', 'مجال التعريف', 'Domain'), meaning: say('Funtzioa kalkula daitekeen $x$ balio guztien multzoa: $D$.', 'El conjunto de valores de $x$ en los que se puede calcular la función: $D$.', 'مجموعة قيم $x$ التي يمكن حساب الدالة عندها: $D$.', 'The set of values of $x$ at which the function can be worked out: $D$.') }
        ],
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm')
        ],
        explanation: say(
            'Grafikoa marraztu aurretik, jakin behar da non dagoen. Hiru oztopo daude: izendatzailea zero, erro bikoitiaren barruan zenbaki negatibo bat, eta logaritmoaren barruan zero edo negatibo bat. Oztopo horiek kenduta geratzen dena da izate-eremua.',
            'Antes de dibujar la gráfica hay que saber dónde existe. Hay tres obstáculos: el denominador cero, un número negativo dentro de una raíz par y un cero o negativo dentro de un logaritmo. Lo que queda al quitarlos es el dominio.',
            'قبل رسم التمثيل يجب معرفة أين توجد الدالة. هناك ثلاث عقبات: المقام صفر، وعدد سالب تحت جذر زوجي، وصفر أو عدد سالب داخل اللوغاريتم. وما يبقى بعد حذفها هو المجال.',
            'Before drawing the graph you must know where it exists. There are three obstacles: the denominator being zero, a negative number inside an even root, and zero or a negative inside a logarithm. What is left after removing them is the domain.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\ln(x-5)$ funtzioaren izate-eremua.', 'Halla el dominio de $g(x)=\\ln(x-5)$.', 'أوجد مجال تعريف $g(x)=\\ln(x-5)$.', 'Find the domain of $g(x)=\\ln(x-5)$.'),
        example: same('$x-5>0\\ \\to\\ x>5$'),
        exampleAnswer: say('$D=(5,+\\infty)$.', '$D=(5,+\\infty)$.', '$D=(5,+\\infty)$.', '$D=(5,+\\infty)$.')
    },
    symmetry: {
        definitions: [
            { term: say('Funtzio bikoitia', 'Función par', 'دالة زوجية', 'Even function'), meaning: say('$f(-x)=f(x)$: grafikoa simetrikoa da $Y$ ardatzarekiko.', '$f(-x)=f(x)$: la gráfica es simétrica respecto al eje $Y$.', '$f(-x)=f(x)$: التمثيل متناظر بالنسبة إلى محور $Y$.', '$f(-x)=f(x)$: the graph is symmetric about the $Y$ axis.') },
            { term: say('Funtzio bakoitia', 'Función impar', 'دالة فردية', 'Odd function'), meaning: say('$f(-x)=-f(x)$: grafikoa simetrikoa da jatorriarekiko.', '$f(-x)=-f(x)$: la gráfica es simétrica respecto al origen.', '$f(-x)=-f(x)$: التمثيل متناظر بالنسبة إلى المبدأ.', '$f(-x)=-f(x)$: the graph is symmetric about the origin.') }
        ],
        vocabulary: [
            say('ispilua', 'espejo', 'مرآة', 'mirror'),
            say('jatorria', 'origen', 'المبدأ', 'origin')
        ],
        explanation: say(
            'Simetria batek lana erdira murrizten du: grafikoaren erdia marraztu eta beste erdia kopiatu. Bikoitia bada, $Y$ ardatza ispilua da. Bakoitia bada, puntu bakoitzak bere bikotea du jatorriaren beste aldean. Polinomio batean, berretzaile guztiak bikoitiak badira, bikoitia da.',
            'Una simetría ahorra la mitad del trabajo: se dibuja media gráfica y se copia la otra mitad. Si es par, el eje $Y$ es un espejo. Si es impar, cada punto tiene su pareja al otro lado del origen. En un polinomio con todos los exponentes pares, es par.',
            'يوفّر التناظر نصف العمل: نرسم نصف التمثيل وننسخ النصف الآخر. إذا كانت زوجية كان محور $Y$ مرآة. وإذا كانت فردية كان لكل نقطة نظيرتها في الجهة الأخرى من المبدأ. والحدودية التي كل أسسها زوجية تكون زوجية.',
            'A symmetry saves half the work: you draw half the graph and copy the other half. If it is even, the $Y$ axis is a mirror. If it is odd, each point has its partner on the other side of the origin. A polynomial with all exponents even is even.'
        ),
        examplePrompt: say('Bikoitia ala bakoitia da $g(x)=\\frac{3}{x^2+1}$?', '¿Es par o impar $g(x)=\\frac{3}{x^2+1}$?', 'هل $g(x)=\\frac{3}{x^2+1}$ زوجية أم فردية؟', 'Is $g(x)=\\frac{3}{x^2+1}$ even or odd?'),
        example: same('$g(-x)=\\frac{3}{(-x)^2+1}=\\frac{3}{x^2+1}=g(x)$'),
        exampleAnswer: say('Bikoitia: simetrikoa $Y$ ardatzarekiko.', 'Par: simétrica respecto al eje $Y$.', 'زوجية: متناظرة بالنسبة إلى محور $Y$.', 'Even: symmetric about the $Y$ axis.')
    },
    intercepts: {
        definitions: [
            { term: say('Ebaki-puntuak', 'Puntos de corte', 'نقاط التقاطع', 'Intercepts'), meaning: say('Grafikoak ardatzak mozten dituen puntuak: $(0,f(0))$ eta $f(x)=0$ ekuazioaren soluzioak.', 'Los puntos donde la gráfica corta a los ejes: $(0,f(0))$ y las soluciones de $f(x)=0$.', 'النقاط التي يقطع فيها التمثيل المحورين: $(0,f(0))$ وحلول $f(x)=0$.', 'The points where the graph cuts the axes: $(0,f(0))$ and the solutions of $f(x)=0$.') }
        ],
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Ardatzekiko ebaki-puntuek grafikoaren lehen puntuak ematen dituzte. $Y$ ardatzean, $x=0$ ordezkatu. $X$ ardatzean, $f(x)=0$ ebatzi; zatiki batean, zenbakitzailea zero. Gero zeinuak esaten du tarte bakoitzean grafikoa ardatzaren gainean ala azpian dagoen.',
            'Los puntos de corte dan los primeros puntos de la gráfica. En el eje $Y$, sustituye $x=0$. En el eje $X$, resuelve $f(x)=0$; en una fracción, numerador cero. Después el signo dice si en cada intervalo la gráfica está encima o debajo del eje.',
            'تعطي نقاط التقاطع أولى نقاط التمثيل. على محور $Y$ عوّض $x=0$. وعلى محور $X$ حلّ $f(x)=0$؛ وفي الكسر يكون البسط صفرًا. ثم تخبر الإشارة هل التمثيل فوق المحور أم تحته في كل فترة.',
            'The intercepts give the first points of the graph. On the $Y$ axis, substitute $x=0$. On the $X$ axis, solve $f(x)=0$; in a fraction, numerator zero. Then the sign tells whether the graph is above or below the axis on each interval.'
        ),
        examplePrompt: say('Aurkitu $g(x)=x^2-x-6$ funtzioaren ebaki-puntuak.', 'Halla los puntos de corte de $g(x)=x^2-x-6$.', 'أوجد نقاط تقاطع $g(x)=x^2-x-6$.', 'Find the intercepts of $g(x)=x^2-x-6$.'),
        example: same('$\\begin{gathered}g(0)=-6\\\\ x^2-x-6=0\\ \\to\\ x=-2,\\ x=3\\end{gathered}$'),
        exampleAnswer: say('$(0,-6)$, $(-2,0)$ eta $(3,0)$.', '$(0,-6)$, $(-2,0)$ y $(3,0)$.', '$(0,-6)$ و$(-2,0)$ و$(3,0)$.', '$(0,-6)$, $(-2,0)$ and $(3,0)$.')
    },

    /* ---------- 2. Asymptotes ---------- */
    vertical: {
        definitions: [
            { term: say('Asintota bertikala', 'Asíntota vertical', 'المقارب العمودي', 'Vertical asymptote'), meaning: say('$x=a$ zuzena, $f(x)\\to\\pm\\infty$ bada $x\\to a$ denean.', 'La recta $x=a$ si $f(x)\\to\\pm\\infty$ cuando $x\\to a$.', 'المستقيم $x=a$ إذا كانت $f(x)\\to\\pm\\infty$ عندما $x\\to a$.', 'The line $x=a$ if $f(x)\\to\\pm\\infty$ as $x\\to a$.') }
        ],
        vocabulary: [
            say('adarrak', 'ramas', 'الفرعان', 'branches'),
            say('zuloa', 'agujero', 'ثغرة', 'hole')
        ],
        explanation: say(
            'Asintota bertikalak izate-eremutik kanpoko puntuetan bilatzen dira. Zenbaki bat zati zero bada, asintota dago; alboko limiteek esaten dute adarrak gora ala behera doazen. Zero zati zero bada, sinplifikatu: askotan zuloa besterik ez da.',
            'Las asíntotas verticales se buscan en los puntos fuera del dominio. Si sale un número entre cero, hay asíntota; los límites laterales dicen si las ramas suben o bajan. Si sale cero entre cero, simplifica: muchas veces es solo un agujero.',
            'نبحث عن المقاربات العمودية في النقاط خارج المجال. إذا ظهر عدد على صفر فهناك مقارب، وتخبر النهايتان الجانبيتان هل الفرعان يصعدان أم ينزلان. وإذا ظهر صفر على صفر فاختصر: فكثيرًا ما تكون ثغرة فقط.',
            'Vertical asymptotes are looked for at the points outside the domain. If a number over zero comes out, there is an asymptote; the one-sided limits say whether the branches go up or down. If zero over zero comes out, simplify: often it is just a hole.'
        ),
        examplePrompt: say('Asintota bertikala al du $g(x)=\\frac{x^2-9}{x-3}$ funtzioak $x=3$ zuzenean?', '¿Tiene $g(x)=\\frac{x^2-9}{x-3}$ asíntota vertical en $x=3$?', 'هل لـ $g(x)=\\frac{x^2-9}{x-3}$ مقارب عمودي عند $x=3$؟', 'Does $g(x)=\\frac{x^2-9}{x-3}$ have a vertical asymptote at $x=3$?'),
        example: same('$\\frac{x^2-9}{x-3}=x+3\\ \\to\\ 6$'),
        exampleAnswer: say('Ez: zuloa dago $(3,6)$ puntuan.', 'No: hay un agujero en $(3,6)$.', 'لا: توجد ثغرة عند $(3,6)$.', 'No: there is a hole at $(3,6)$.')
    },
    horizontal: {
        definitions: [
            { term: say('Asintota horizontala', 'Asíntota horizontal', 'المقارب الأفقي', 'Horizontal asymptote'), meaning: say('$y=b$ zuzena, $f(x)\\to b$ bada $x\\to+\\infty$ edo $x\\to-\\infty$ denean.', 'La recta $y=b$ si $f(x)\\to b$ cuando $x\\to+\\infty$ o $x\\to-\\infty$.', 'المستقيم $y=b$ إذا كانت $f(x)\\to b$ عندما $x\\to+\\infty$ أو $x\\to-\\infty$.', 'The line $y=b$ if $f(x)\\to b$ as $x\\to+\\infty$ or $x\\to-\\infty$.') }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('egonkortu', 'estabilizarse', 'يستقر', 'level off')
        ],
        explanation: say(
            'Asintota horizontalak esaten du funtzioa non egonkortzen den epe luzera. Zatiki batean mailak alderatzen dira: goikoa txikiagoa bada, $y=0$; berdinak badira, koefiziente nagusien zatidura. Ekonomian, kostu edo populazio baten balio egonkorra da.',
            'La asíntota horizontal dice dónde llega a estabilizarse la función a largo plazo. En una fracción se comparan los grados: si arriba es menor, $y=0$; si son iguales, el cociente de los coeficientes principales. En economía, es el valor estable de un coste o una población.',
            'يخبر المقارب الأفقي أين يستقر مقدار الدالة على المدى الطويل. في الكسر نقارن الدرجتين: إذا كانت درجة البسط أصغر فـ $y=0$، وإذا تساوتا فخارج قسمة المعاملين الرئيسيين. وفي الاقتصاد هو القيمة المستقرة لتكلفة أو لعدد سكان.',
            'The horizontal asymptote says where the function levels off in the long run. In a fraction the degrees are compared: if the top is smaller, $y=0$; if equal, the quotient of the leading coefficients. In economics, it is the stable value of a cost or a population.'
        ),
        examplePrompt: say('Herri bateko biztanleak, milakatan, $P(t)=\\frac{60t+20}{t+2}$ dira. Zein baliotan egonkortzen dira?', 'La población de un pueblo, en miles, es $P(t)=\\frac{60t+20}{t+2}$. ¿Dónde se estabiliza?', 'سكان بلدة بالآلاف $P(t)=\\frac{60t+20}{t+2}$. أين يستقر؟', 'The population of a town, in thousands, is $P(t)=\\frac{60t+20}{t+2}$. Where does it level off?'),
        example: same('$\\lim_{t\\to+\\infty}\\frac{60t+20}{t+2}=60$'),
        exampleAnswer: say('$y=60$: 60 mila biztanle ingurutan.', '$y=60$: en unos 60 mil habitantes.', '$y=60$: عند نحو 60 ألف ساكن.', '$y=60$: at about 60 thousand inhabitants.'),
        why: {
            text: say(
                'Zergatik koefizienteen zatidura? $x$ oso handia denean, maila handieneko gaiek bakarrik balio dute: $\\frac{2x+1}{x-3}\\approx\\frac{2x}{x}=2$. Beste gaiak ahaztu daitezke.',
                '¿Por qué el cociente de los coeficientes? Cuando $x$ es muy grande, solo cuentan los términos de mayor grado: $\\frac{2x+1}{x-3}\\approx\\frac{2x}{x}=2$. Los demás términos se pueden olvidar.',
                'لماذا خارج قسمة المعاملين؟ عندما يكون $x$ كبيرًا جدًا لا تُحسب إلا الحدود ذات الدرجة الأكبر: $\\frac{2x+1}{x-3}\\approx\\frac{2x}{x}=2$. ويمكن نسيان الحدود الأخرى.',
                'Why the quotient of the coefficients? When $x$ is very large, only the terms of highest degree count: $\\frac{2x+1}{x-3}\\approx\\frac{2x}{x}=2$. The other terms can be forgotten.'
            )
        }
    },
    oblique: {
        definitions: [
            { term: say('Asintota zeiharra', 'Asíntota oblicua', 'المقارب المائل', 'Oblique asymptote'), meaning: say('$y=mx+n$ zuzena ($m\\ne 0$), $f(x)-(mx+n)\\to 0$ bada.', 'La recta $y=mx+n$ ($m\\ne 0$) si $f(x)-(mx+n)\\to 0$.', 'المستقيم $y=mx+n$ ($m\\ne 0$) إذا كانت $f(x)-(mx+n)\\to 0$.', 'The line $y=mx+n$ ($m\\ne 0$) if $f(x)-(mx+n)\\to 0$.') }
        ],
        vocabulary: [
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('hondarra', 'resto', 'الباقي', 'remainder')
        ],
        explanation: say(
            'Goiko maila behekoa baino bat handiagoa denean, zatiketa egiten da. Zatidura asintota zeiharra da, eta hondarraren zatia zerora doa. Hondarraren zeinuak esaten du kurba asintotaren gainean ala azpian dagoen.',
            'Cuando el grado de arriba es uno más que el de abajo, se hace la división. El cociente es la asíntota oblicua, y la parte del resto tiende a cero. El signo de esa parte dice si la curva está por encima o por debajo de la asíntota.',
            'عندما تزيد درجة البسط على درجة المقام بواحد نجري القسمة. خارج القسمة هو المقارب المائل، وجزء الباقي يتجه إلى الصفر. وإشارة ذلك الجزء تخبر هل المنحنى فوق المقارب أم تحته.',
            'When the top degree is one more than the bottom one, you divide. The quotient is the oblique asymptote, and the remainder part tends to zero. The sign of that part says whether the curve is above or below the asymptote.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\frac{x^2+3x}{x+1}$ funtzioaren asintota zeiharra.', 'Halla la asíntota oblicua de $g(x)=\\frac{x^2+3x}{x+1}$.', 'أوجد المقارب المائل لـ $g(x)=\\frac{x^2+3x}{x+1}$.', 'Find the oblique asymptote of $g(x)=\\frac{x^2+3x}{x+1}$.'),
        example: same('$\\frac{x^2+3x}{x+1}=x+2-\\frac{2}{x+1}$'),
        exampleAnswer: say('$y=x+2$.', '$y=x+2$.', '$y=x+2$.', '$y=x+2$.'),
        why: {
            text: say(
                'Zergatik zatidura? Zatiketak $f(x)=c(x)+\\frac{r}{q(x)}$ ematen du, $c(x)$ zatidura eta $r$ hondarra izanik. Azken zatia gero eta txikiagoa da, beraz $f(x)$ eta $c(x)$ ia berdinak dira.',
                '¿Por qué el cociente? La división da $f(x)=c(x)+\\frac{r}{q(x)}$, con cociente $c(x)$ y resto $r$. La última parte es cada vez más pequeña, así que $f(x)$ y $c(x)$ casi coinciden.',
                'لماذا خارج القسمة؟ القسمة تعطي $f(x)=c(x)+\\frac{r}{q(x)}$ حيث خارج القسمة $c(x)$ والباقي $r$. والجزء الأخير يصغر شيئًا فشيئًا، لذا تكاد $f(x)$ و$c(x)$ تتطابقان.',
                'Why the quotient? The division gives $f(x)=c(x)+\\frac{r}{q(x)}$, with quotient $c(x)$ and remainder $r$. The last part keeps getting smaller, so $f(x)$ and $c(x)$ almost coincide.'
            )
        }
    },

    /* ---------- 3. With derivatives ---------- */
    monotony: {
        definitions: [
            { term: say('Mutur erlatiboa', 'Extremo relativo', 'القيمة القصوى المحلية', 'Relative extremum'), meaning: say('Maximo edo minimo bat: $f\'$ zeinuz aldatzen den puntua.', 'Un máximo o un mínimo: un punto donde $f\'$ cambia de signo.', 'قيمة عظمى أو صغرى: نقطة تتغير فيها إشارة $f\'$.', 'A maximum or a minimum: a point where $f\'$ changes sign.') }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'الفترة', 'interval'),
            say('gora', 'sube', 'يصعد', 'rises')
        ],
        explanation: say(
            'Grafikoa marrazteko, $f\'$ deribatuaren zeinu-taula egiten da. Tarte bakoitzean geziak jartzen dira: $f\'>0$ bada, gora; $f\'<0$ bada, behera. Muturretan $f$ kalkulatzen da puntuak kokatzeko. Gogoratu: izate-eremutik kanpoko puntuek ere zatitzen dute zuzena.',
            'Para dibujar la gráfica se hace la tabla de signos de $f\'$. En cada intervalo se ponen flechas: si $f\'>0$, sube; si $f\'<0$, baja. En los extremos se calcula $f$ para colocar los puntos. Recuerda: los puntos fuera del dominio también parten la recta.',
            'لرسم التمثيل نُعدّ جدول إشارات $f\'$. ونضع أسهمًا في كل فترة: إذا كانت $f\'>0$ يصعد، وإذا كانت $f\'<0$ ينزل. وعند القيم القصوى نحسب $f$ لنضع النقاط. وتذكّر: النقاط خارج المجال تقسم المستقيم أيضًا.',
            'To draw the graph, make the sign chart of $f\'$. Put arrows in each interval: if $f\'>0$, it rises; if $f\'<0$, it falls. At the extrema work out $f$ to place the points. Remember: points outside the domain also split the line.'
        ),
        examplePrompt: say('Aztertu $g(x)=\\frac{x^2}{x-2}$ funtzioaren hazkundea.', 'Estudia el crecimiento de $g(x)=\\frac{x^2}{x-2}$.', 'ادرس تزايد $g(x)=\\frac{x^2}{x-2}$.', 'Study the increase of $g(x)=\\frac{x^2}{x-2}$.'),
        example: same("$g'(x)=\\frac{x(x-4)}{(x-2)^2}$"),
        exampleAnswer: say('Maximoa $(0,0)$ puntuan eta minimoa $(4,8)$ puntuan; $x=2$ ez dago izate-eremuan.', 'Máximo en $(0,0)$ y mínimo en $(4,8)$; $x=2$ no está en el dominio.', 'عظمى عند $(0,0)$ وصغرى عند $(4,8)$؛ و$x=2$ ليست في المجال.', 'A maximum at $(0,0)$ and a minimum at $(4,8)$; $x=2$ is not in the domain.')
    },
    concavity: {
        definitions: [
            { term: say('Inflexio-puntua', 'Punto de inflexión', 'نقطة الانعطاف', 'Point of inflection'), meaning: say('Kurbadura aldatzen den puntua: ∪ izatetik ∩ izatera, edo alderantziz.', 'Un punto donde cambia la curvatura: de ∪ a ∩ o al revés.', 'نقطة يتغير فيها التقعّر: من ∪ إلى ∩ أو العكس.', 'A point where the curvature changes: from ∪ to ∩ or the other way.') }
        ],
        vocabulary: [
            say('ahurra', 'cóncava', 'مقعّرة نحو الأعلى', 'concave up'),
            say('ganbila', 'convexa', 'مقعّرة نحو الأسفل', 'concave down')
        ],
        explanation: say(
            'Kurbadurak grafikoaren forma zehazten du. $f\'\'>0$ den tartean, kurba ahurra da (∪); $f\'\'<0$ denean, ganbila (∩). Inflexio-puntuetan forma aldatzen da: han $f$ kalkulatu eta grafikoan jarri.',
            'La curvatura afina la forma de la gráfica. Donde $f\'\'>0$, la curva es cóncava (∪); donde $f\'\'<0$, convexa (∩). En los puntos de inflexión cambia la forma: calcula ahí $f$ y ponlos en la gráfica.',
            'يحدد التقعّر شكل التمثيل بدقة. حيث $f\'\'>0$ يكون المنحنى مقعّرة نحو الأعلى (∪)، وحيث $f\'\'<0$ يكون مقعّرة نحو الأسفل (∩). وعند نقاط الانعطاف يتغير الشكل: احسب $f$ هناك وضعها على التمثيل.',
            'Curvature refines the shape of the graph. Where $f\'\'>0$, the curve is concave up (∪); where $f\'\'<0$, concave down (∩). At the points of inflection the shape changes: work out $f$ there and put them on the graph.'
        ),
        examplePrompt: say('Aztertu $g(x)=x^3-9x^2$ funtzioaren kurbadura.', 'Estudia la curvatura de $g(x)=x^3-9x^2$.', 'ادرس تقعّر $g(x)=x^3-9x^2$.', 'Study the curvature of $g(x)=x^3-9x^2$.'),
        example: same("$g''(x)=6x-18=0\\ \\to\\ x=3$"),
        exampleAnswer: say('Ganbila $(-\\infty,3)$ tartean, ahurra $(3,+\\infty)$ tartean; inflexioa $(3,-54)$.', 'Convexa en $(-\\infty,3)$, cóncava en $(3,+\\infty)$; inflexión en $(3,-54)$.', 'مقعّرة نحو الأسفل في $(-\\infty,3)$ ونحو الأعلى في $(3,+\\infty)$؛ والانعطاف $(3,-54)$.', 'Concave down on $(-\\infty,3)$, concave up on $(3,+\\infty)$; inflection at $(3,-54)$.')
    },
    summary: {
        definitions: [
            { term: say('Funtzioaren fitxa', 'Ficha de la función', 'بطاقة الدالة', 'Function card'), meaning: say('Grafikoa marrazteko behar den guztia, ordenan: izate-eremutik kurbaduraraino.', 'Todo lo necesario para dibujar la gráfica, en orden: del dominio a la curvatura.', 'كل ما يلزم لرسم التمثيل بالترتيب: من المجال إلى التقعّر.', 'Everything needed to draw the graph, in order: from the domain to the curvature.') }
        ],
        vocabulary: [
            say('puntuak', 'puntos', 'النقاط', 'points'),
            say('ordena', 'orden', 'الترتيب', 'order')
        ],
        explanation: say(
            'Fitxa batek ordena bat jarraitzen du: izate-eremua, simetria, ebaki-puntuak, asintotak, hazkundea eta kurbadura. Datu bakoitza grafikoan jartzen da: lehenik asintotak marra etenekin, gero puntuak, eta azkenik kurba, gezien eta formaren arabera.',
            'Una ficha sigue un orden: dominio, simetría, cortes, asíntotas, crecimiento y curvatura. Cada dato va a la gráfica: primero las asíntotas a trazos, después los puntos y por último la curva, según las flechas y la forma.',
            'تتبع البطاقة ترتيبًا: المجال، التناظر، التقاطعات، المقاربات، التزايد والتقعّر. وكل معطى يُنقل إلى التمثيل: أولًا المقاربات بخطوط متقطعة، ثم النقاط، وأخيرًا المنحنى بحسب الأسهم والشكل.',
            'A card follows an order: domain, symmetry, intercepts, asymptotes, increase and curvature. Each fact goes on the graph: first the dashed asymptotes, then the points and finally the curve, following the arrows and the shape.'
        ),
        examplePrompt: say('Egin $g(x)=x^4-2x^2$ funtzioaren fitxa laburra.', 'Haz la ficha breve de $g(x)=x^4-2x^2$.', 'أنجز بطاقة قصيرة لـ $g(x)=x^4-2x^2$.', 'Make a short card of $g(x)=x^4-2x^2$.'),
        example: same("$g(-x)=g(x)\\qquad g'(x)=4x(x^2-1)$"),
        exampleAnswer: say('Bikoitia; maximoa $(0,0)$ eta minimoak $(\\pm 1,-1)$.', 'Par; máximo $(0,0)$ y mínimos $(\\pm 1,-1)$.', 'زوجية؛ عظمى $(0,0)$ وصغريان $(\\pm 1,-1)$.', 'Even; maximum $(0,0)$ and minima $(\\pm 1,-1)$.')
    },

    /* ---------- 4. Complete graphs ---------- */
    polynomial: {
        definitions: [
            { term: say('Erro bikoitza', 'Raíz doble', 'جذر مضاعف', 'Double root'), meaning: say('Bi aldiz agertzen den erroa, $(x-a)^2$ faktorea: grafikoak ardatza ukitu eta itzuli egiten da.', 'Una raíz que aparece dos veces, el factor $(x-a)^2$: la gráfica toca el eje y vuelve.', 'جذر يظهر مرتين، العامل $(x-a)^2$: يمس التمثيل المحور ويعود.', 'A root that appears twice, the factor $(x-a)^2$: the graph touches the axis and turns back.') }
        ],
        vocabulary: [
            say('faktorizatu', 'factorizar', 'التحليل', 'factorise'),
            say('ukitu', 'tocar', 'يمس', 'touch')
        ],
        explanation: say(
            'Polinomioak jarraituak eta leunak dira, asintotarik gabe. Faktorizatzeak ebaki-puntuak ematen ditu; erro bikoitz batean grafikoak ardatza ukitzen du. Muturreko adarrak maila handieneko gaiak gidatzen ditu: $x^3$ ezkerrean behean eta eskuinean goian.',
            'Los polinomios son continuos y suaves, sin asíntotas. Al factorizar salen los cortes; en una raíz doble la gráfica llega a tocar el eje. Las ramas de los extremos las manda el término de mayor grado: $x^3$ abajo a la izquierda y arriba a la derecha.',
            'الحدوديات متصلة وملساء ولا مقاربات لها. ويعطي التحليل نقاط التقاطع، وعند الجذر المضاعف يمس التمثيل المحور. والحد ذو الدرجة الأكبر يحدد الفرعين: $x^3$ تحت من اليسار وفوق من اليمين.',
            'Polynomials are continuous and smooth, with no asymptotes. To factorise gives the intercepts; at a double root the graph touches the axis. The term of highest degree rules the end branches: $x^3$ low on the left and high on the right.'
        ),
        examplePrompt: say('Non mozten du $g(x)=x^3-4x^2+4x$ funtzioak $X$ ardatza?', '¿Dónde corta $g(x)=x^3-4x^2+4x$ al eje $X$?', 'أين تقطع $g(x)=x^3-4x^2+4x$ محور $X$؟', 'Where does $g(x)=x^3-4x^2+4x$ cut the $X$ axis?'),
        example: same('$g(x)=x(x-2)^2$'),
        exampleAnswer: say('$x=0$ puntuan zeharkatzen du eta $x=2$ puntuan ukitzen du (erro bikoitza).', 'Atraviesa en $x=0$ y toca en $x=2$ (raíz doble).', 'تعبره عند $x=0$ وتمسه عند $x=2$ (جذر مضاعف).', 'It crosses at $x=0$ and touches at $x=2$ (double root).')
    },
    rational: {
        definitions: [
            { term: say('Funtzio arrazionala', 'Función racional', 'دالة كسرية', 'Rational function'), meaning: say('Bi polinomioren zatidura: $\\frac{P(x)}{Q(x)}$.', 'El cociente de dos polinomios: $\\frac{P(x)}{Q(x)}$.', 'خارج قسمة حدوديتين: $\\frac{P(x)}{Q(x)}$.', 'The quotient of two polynomials: $\\frac{P(x)}{Q(x)}$.') }
        ],
        vocabulary: [
            say('eskeletoa', 'esqueleto', 'هيكل', 'skeleton'),
            say('asintotak', 'asíntotas', 'المقاربات', 'asymptotes')
        ],
        explanation: say(
            'Funtzio arrazional batean, lehenik asintotak marrazten dira: grafikoaren eskeletoa dira. Gero muturrak eta ebaki-puntuak jartzen dira. Asintota bertikal batek grafikoa bi zatitan banatzen du, eta zati bakoitza bere aldetik marrazten da.',
            'En una función racional, primero se dibujan las asíntotas: son el esqueleto de la gráfica. Después se colocan extremos y cortes. Una asíntota vertical parte la gráfica en dos trozos, y cada trozo se dibuja por su lado.',
            'في الدالة الكسرية تُرسم المقاربات أولًا: فهي هيكل التمثيل. ثم توضع القيم القصوى ونقاط التقاطع. والمقارب العمودي يقسم التمثيل جزأين، ويُرسم كل جزء في جهته.',
            'In a rational function, the asymptotes are drawn first: they are the skeleton of the graph. Then the extrema and intercepts are placed. A vertical asymptote splits the graph into two pieces, and each piece is drawn on its own side.'
        ),
        examplePrompt: say('Zein asintota ditu $g(x)=\\frac{3x}{x+2}$ funtzioak?', '¿Qué asíntotas tiene $g(x)=\\frac{3x}{x+2}$?', 'ما مقاربات $g(x)=\\frac{3x}{x+2}$؟', 'Which asymptotes does $g(x)=\\frac{3x}{x+2}$ have?'),
        example: same('$x+2=0\\ \\to\\ x=-2\\qquad \\frac{3}{1}=3$'),
        exampleAnswer: say('Bertikala $x=-2$ eta horizontala $y=3$.', 'Vertical $x=-2$ y horizontal $y=3$.', 'عمودي $x=-2$ وأفقي $y=3$.', 'Vertical $x=-2$ and horizontal $y=3$.')
    },
    'exp-log': {
        definitions: [
            { term: say('Hazkunde esponentziala', 'Crecimiento exponencial', 'النمو الأسي', 'Exponential growth'), meaning: say('$e^{x}$ funtzioak polinomio guztiak baino azkarrago hazten du: $\\frac{x^n}{e^{x}}\\to 0$.', '$e^{x}$ crece más deprisa que cualquier polinomio: $\\frac{x^n}{e^{x}}\\to 0$.', 'تنمو $e^{x}$ أسرع من أي حدودية: $\\frac{x^n}{e^{x}}\\to 0$.', '$e^{x}$ grows faster than any polynomial: $\\frac{x^n}{e^{x}}\\to 0$.') }
        ],
        vocabulary: [
            say('iragarkia', 'anuncio', 'إعلان', 'advert'),
            say('esponentziala', 'exponencial', 'الأسية', 'exponential')
        ],
        explanation: say(
            'Esponentzialak beti dira positiboak eta asintota horizontal bat dute alde batean. Logaritmoak $x>0$ eskatzen du. Biderkadura batean, $te^{-t}$ adibidez, esponentzialak irabazten du: hasieran gora, gero zerorantz. Hori da iragarki baten efektuaren itxura.',
            'Las exponenciales son siempre positivas y tienen asíntota horizontal por un lado. El logaritmo pide $x>0$. En un producto como $te^{-t}$ gana la exponencial: primero sube, después va a cero. Es la forma del efecto de un anuncio.',
            'الدوال الأسية موجبة دائمًا ولها مقارب أفقي من جهة. واللوغاريتم يتطلب $x>0$. وفي جداء مثل $te^{-t}$ تتغلب الأسية: يصعد أولًا ثم يتجه إلى الصفر. هذا شكل أثر إعلان.',
            'Exponentials are always positive and have a horizontal asymptote on one side. The logarithm needs $x>0$. In a product such as $te^{-t}$ the exponential wins: first it rises, then it goes to zero. That is the shape of the effect of an advert.'
        ),
        examplePrompt: say('Zein da $g(x)=x-\\ln x$ funtzioaren minimoa?', '¿Cuál es el mínimo de $g(x)=x-\\ln x$?', 'ما القيمة الصغرى للدالة $g(x)=x-\\ln x$؟', 'What is the minimum of $g(x)=x-\\ln x$?'),
        example: same("$g'(x)=1-\\frac{1}{x}=0\\ \\to\\ x=1$"),
        exampleAnswer: say('Minimoa $(1,1)$ puntuan; $x>0$ bakarrik.', 'Mínimo en $(1,1)$; solo con $x>0$.', 'صغرى عند $(1,1)$؛ مع $x>0$ فقط.', 'A minimum at $(1,1)$; only for $x>0$.')
    },

    /* ---------- 5. Read and draw ---------- */
    'absolute-value': {
        definitions: [
            { term: say('Balio absolutua', 'Valor absoluto', 'القيمة المطلقة', 'Absolute value'), meaning: say('$|u|=u$ $u\\ge 0$ bada, eta $|u|=-u$ $u<0$ bada.', '$|u|=u$ si $u\\ge 0$, y $|u|=-u$ si $u<0$.', '$|u|=u$ إذا $u\\ge 0$، و$|u|=-u$ إذا $u<0$.', '$|u|=u$ if $u\\ge 0$, and $|u|=-u$ if $u<0$.') }
        ],
        vocabulary: [
            say('isladatu', 'reflejar', 'نعكس', 'reflect'),
            say('puntak', 'picos', 'زوايا', 'corners')
        ],
        explanation: say(
            '$|f(x)|$ marrazteko, lehenik $f$ marraztu. Ardatzaren gaineko zatiak bere horretan geratzen dira; azpiko zatiak gora isladatu behar dira, ardatza ispilu gisa hartuta. Ardatza mozten den puntuetan puntak sortzen dira.',
            'Para dibujar $|f(x)|$, dibuja primero $f$. Las partes que están encima del eje se quedan igual; las de debajo hay que reflejar hacia arriba, con el eje como espejo. Donde se corta el eje aparecen picos.',
            'لرسم $|f(x)|$ ارسم $f$ أولًا. تبقى الأجزاء فوق المحور كما هي، أما الأجزاء تحته فيجب أن نعكس كلًّا منها إلى الأعلى والمحور مرآة. وحيث يُقطع المحور تظهر زوايا.',
            'To draw $|f(x)|$, draw $f$ first. The parts above the axis stay the same; the parts below must be reflected upwards, with the axis as a mirror. Where the axis is cut, corners appear.'
        ),
        examplePrompt: say('Idatzi $g(x)=|x-3|$ zatika.', 'Escribe $g(x)=|x-3|$ a trozos.', 'اكتب $g(x)=|x-3|$ دالةً متعددة الأجزاء.', 'Write $g(x)=|x-3|$ piecewise.'),
        example: same('$g(x)=\\begin{cases}3-x & x<3\\\\ x-3 & x\\ge 3\\end{cases}$'),
        exampleAnswer: say('V forma, punta $(3,0)$ puntuan.', 'Forma de V, con el pico en $(3,0)$.', 'شكل V والزاوية عند $(3,0)$.', 'A V shape, with the corner at $(3,0)$.'),
        why: {
            text: say(
                'Zergatik isladatu? $f(x)$ negatiboa denean, $|f(x)|=-f(x)$: altuera bera, baina zeinua aldatuta. Puntu bakoitza ardatzaren beste aldera pasatzen da, distantzia berean.',
                '¿Por qué reflejar? Cuando $f(x)$ es negativa, $|f(x)|=-f(x)$: la misma altura con el signo cambiado. Cada punto pasa al otro lado del eje, a la misma distancia.',
                'لماذا نعكس؟ عندما تكون $f(x)$ سالبة يكون $|f(x)|=-f(x)$: الارتفاع نفسه بإشارة معكوسة. فتنتقل كل نقطة إلى الجهة الأخرى من المحور على المسافة نفسها.',
                'Why reflect? When $f(x)$ is negative, $|f(x)|=-f(x)$: the same height with the sign changed. Each point moves to the other side of the axis, at the same distance.'
            )
        }
    },
    describe: {
        definitions: [
            { term: say('Epe luzerako joera', 'Tendencia a largo plazo', 'الاتجاه على المدى الطويل', 'Long-run trend'), meaning: say('Funtzioaren limitea $t\\to+\\infty$ denean: zer gertatzen den denbora asko igarotakoan.', 'El límite de la función cuando $t\\to+\\infty$: lo que pasa al cabo de mucho tiempo.', 'نهاية الدالة عندما $t\\to+\\infty$: ما يحدث بعد وقت طويل.', 'The limit of the function as $t\\to+\\infty$: what happens after a long time.') }
        ],
        vocabulary: [
            say('jokalariak', 'jugadores', 'لاعبي', 'players'),
            say('hasierako', 'inicial', 'الأولى', 'starting')
        ],
        explanation: say(
            'Grafiko bat deskribatzean, galdera hauei erantzuten zaie: zein da hasierako balioa? Noiz hazten da eta noiz jaisten? Noiz da maximoa eta zenbatekoa? Zer gertatzen da epe luzera? Jokalariak, salmentak edo biztanleak: erantzunak bere unitateekin ematen dira.',
            'Al describir una gráfica se contestan estas preguntas: ¿cuál es el valor inicial? ¿Cuándo crece y cuándo decrece? ¿Cuándo es máxima y cuánto vale? ¿Qué pasa a largo plazo? Jugadores, ventas o habitantes: las respuestas van con sus unidades.',
            'عند وصف تمثيل نجيب عن هذه الأسئلة: ما القيمة الأولى؟ متى يتزايد ومتى يتناقص؟ متى يبلغ العظمى وكم يساوي؟ ماذا يحدث على المدى الطويل؟ عدد لاعبي لعبة أو المبيعات أو السكان: تُعطى الإجابات بوحداتها.',
            'When describing a graph, answer these questions: what is the starting value? When does it rise and when does it fall? When does it peak and how much? What happens in the long run? Players, sales or inhabitants: the answers carry their units.'
        ),
        examplePrompt: say('Salmentak $V(t)=\\frac{90t}{t^2+9}$ dira (milakatan). Noiz da maximoa?', 'Las ventas son $V(t)=\\frac{90t}{t^2+9}$ (miles). ¿Cuándo son máximas?', 'المبيعات $V(t)=\\frac{90t}{t^2+9}$ (بالآلاف). متى تبلغ العظمى؟', 'Sales are $V(t)=\\frac{90t}{t^2+9}$ (thousands). When do they peak?'),
        example: same("$V'(t)=\\frac{90(9-t^2)}{(t^2+9)^2}=0\\ \\to\\ t=3$"),
        exampleAnswer: say('$t=3$ unean, $V(3)=15$ mila; gero zerorantz jaisten dira.', 'En $t=3$, con $V(3)=15$ mil; después bajan hacia cero.', 'عند $t=3$ مع $V(3)=15$ ألفًا؛ ثم تنخفض نحو الصفر.', 'At $t=3$, with $V(3)=15$ thousand; then they fall towards zero.')
    },
    'from-data': {
        definitions: [
            { term: say('Eredua', 'Modelo', 'النموذج', 'Model'), meaning: say('Datu batzuk betetzen dituen formula, parametroak ebatzi ondoren.', 'Una fórmula que cumple unos datos, tras resolver sus parámetros.', 'صيغة تحقق معطيات بعد حل وسطائها.', 'A formula that meets some data, after solving for its parameters.') }
        ],
        vocabulary: [
            say('datuak', 'datos', 'المعطيات', 'data'),
            say('parametroa', 'parámetro', 'الوسيط', 'parameter')
        ],
        explanation: say(
            'Datuetatik marrazteko, lehenik asintotak eta puntu ezagunak jartzen dira. Gero adarrak lotzen dira, zeinuak eta hazkundea errespetatuz. Eredu bat eskatzen badute, ordezkatu puntu bat eta ebatzi parametroa.',
            'Para dibujar desde los datos se colocan primero las asíntotas y los puntos conocidos. Después se unen las ramas respetando signos y crecimiento. Si piden un modelo, sustituye un punto y resuelve el parámetro.',
            'للرسم من المعطيات نضع أولًا المقاربات والنقاط المعلومة، ثم نصل الفرعين مع احترام الإشارات والتزايد. وإذا طُلب نموذج فعوّض نقطة وحلّ الوسيط.',
            'To draw from data, place the asymptotes and the known points first. Then join the branches respecting signs and increase. If a model is asked for, substitute a point and solve for the parameter.'
        ),
        examplePrompt: say('$g(x)=b+\\frac{4}{x-2}$ funtzioak $(4,7)$ puntutik igaro behar du. Zenbat da $b$?', '$g(x)=b+\\frac{4}{x-2}$ tiene que pasar por $(4,7)$. ¿Cuánto vale $b$?', 'يجب أن تمر $g(x)=b+\\frac{4}{x-2}$ بـ $(4,7)$. كم تساوي $b$؟', '$g(x)=b+\\frac{4}{x-2}$ must pass through $(4,7)$. What is $b$?'),
        example: same('$b+\\frac{4}{2}=7\\ \\to\\ b=5$'),
        exampleAnswer: say('$b=5$: asintota horizontala $y=5$ da.', '$b=5$: la asíntota horizontal es $y=5$.', '$b=5$: المقارب الأفقي $y=5$.', '$b=5$: the horizontal asymptote is $y=5$.')
    }
}
