import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'
import type { Functions3TopicId } from './lessonChecks.ts'

/* ==========================================================================
   Funtzioak · 3. DBH — what each lesson tells: the new words (definitions),
   the key words in four languages (vocabulary), a short explanation, the
   example as an exercise («Another example») and, in four lessons, «Why
   does it work?» (one y for each x, x = 0 on the y axis, the same slope
   anywhere on a line, the symmetry of the parabola). Plain data so the
   tests can import it; lessons.tsx merges it into the topics. The
   explanations use the numbers of their drawings (y = 2x + 1, f(4) = 8,
   A(1, 2) and B(4, 8), y = 2x − 1, the line through (0, 1) and (3, 7),
   y = x² − 4x + 3); the example uses numbers of its own. No text command
   inside the formulas (the unit test forbids it). Tests in
   tests/lesson-texts.test.ts.
   ========================================================================== */

export const functions3LessonTexts: Record<Functions3TopicId, LessonTexts> = {
    'function-concept': {
        definitions: [
            {
                term: say('Funtzioa', 'Función', 'الدالة', 'Function'),
                meaning: say('$x$ aldagai independentearen balio bakoitzari $y$ aldagai menpekoaren balio bakar bat lotzen dion erlazioa.', 'Una relación que asocia a cada valor de la variable independiente $x$ un único valor de la variable dependiente $y$.', 'علاقة تربط كل قيمة للمتغيّر المستقل $x$ بقيمة واحدة فقط للمتغيّر التابع $y$.', 'A relation that gives each value of the independent variable $x$ a single value of the dependent variable $y$.')
            }
        ],
        vocabulary: [
            say('taula', 'tabla', 'جدول', 'table'),
            say('grafikoa', 'gráfica', 'التمثيل البياني', 'graph'),
            say('formula', 'fórmula', 'صيغة', 'formula')
        ],
        explanation: say(
            'Funtzio bat taula batean, grafiko batean edo formula batean eman daiteke, $y=2x+1$ bezala. Formularekin, $x$ ordezkatu eta $y$ kalkulatzen da: $f(3)=2\\cdot 3+1=7$. Grafikoan, edozein zuzen bertikalek puntu bakar batean ebakitzen du.',
            'Una función se puede dar con una tabla, una gráfica o una fórmula, como $y=2x+1$. Con la fórmula, se sustituye $x$ y se calcula $y$: $f(3)=2\\cdot 3+1=7$. En una gráfica, cualquier recta vertical la corta en un solo punto.',
            'يمكن إعطاء الدالة بجدول أو بتمثيل بياني أو بصيغة مثل $y=2x+1$. وبالصيغة نعوّض $x$ ونحسب $y$: $f(3)=2\\cdot 3+1=7$. وفي التمثيل البياني يقطعه أي مستقيم عمودي في نقطة واحدة فقط.',
            'A function can be given by a table, a graph or a formula, like $y=2x+1$. With the formula, substitute $x$ and work out $y$: $f(3)=2\\cdot 3+1=7$. On a graph, any vertical line cuts it at a single point.'
        ),
        examplePrompt: say('$f(x)=3x-4$ bada, kalkulatu $f(5)$ eta $f(-1)$.', 'Si $f(x)=3x-4$, calcula $f(5)$ y $f(-1)$.', 'إذا كان $f(x)=3x-4$ فاحسب $f(5)$ و$f(-1)$.', 'If $f(x)=3x-4$, work out $f(5)$ and $f(-1)$.'),
        example: same('$\\begin{gathered}f(5)=3\\cdot 5-4=11\\\\ f(-1)=3\\cdot(-1)-4=-7\\end{gathered}$'),
        exampleAnswer: say('$f(5)=11$ eta $f(-1)=-7$: negatiboa parentesi artean.', '$f(5)=11$ y $f(-1)=-7$: el negativo, entre paréntesis.', '$f(5)=11$ و$f(-1)=-7$: السالب بين قوسين.', '$f(5)=11$ and $f(-1)=-7$: the negative, in brackets.'),
        why: {
            text: say(
                'Zuzen bertikal batek grafikoa bi aldiz ebakiko balu, $x$ beraren bi $y$ balio egongo lirateke, eta hori ez da funtzio bat: funtzioak $x$ bakoitzari balio bakarra ematen dio.',
                'Si una recta vertical cortara la gráfica dos veces, a un mismo $x$ le tocarían dos valores de $y$, y eso no es una función: una función da un único valor a cada $x$.',
                'لو قطع مستقيم عمودي التمثيل مرتين لكان لقيمة $x$ نفسها قيمتان لـ $y$، وهذه ليست دالة: الدالة تعطي كل $x$ قيمة واحدة فقط.',
                'If a vertical line cut the graph twice, the same $x$ would have two values of $y$, and that is not a function: a function gives each $x$ a single value.'
            )
        }
    },
    'domain-range': {
        definitions: [
            {
                term: say('Definizio-eremua', 'Dominio', 'المجال', 'Domain'),
                meaning: say('Funtzioa definituta dagoen $x$ balioak: grafikoak ardatz horizontalean hartzen duena.', 'Los valores de $x$ para los que la función está definida: lo que ocupa la gráfica en el eje horizontal.', 'قيم $x$ التي تكون الدالة معرّفة عندها: ما يشغله التمثيل على المحور الأفقي.', 'The values of $x$ for which the function is defined: what the graph covers on the horizontal axis.')
            },
            {
                term: say('Ibilbidea', 'Recorrido', 'المدى', 'Range'),
                meaning: say('$y$ aldagaiak hartzen dituen balioak: grafikoak ardatz bertikalean hartzen duena.', 'Los valores que toma $y$: lo que ocupa la gráfica en el eje vertical.', 'القيم التي يأخذها $y$: ما يشغله التمثيل على المحور العمودي.', 'The values that $y$ takes: what the graph covers on the vertical axis.')
            }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'فترة', 'interval'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root')
        ],
        explanation: say(
            'Tarte gisa idazten dira: $[-2,5]$ tarteak $-2$ eta 5 barne hartzen ditu. Formula batean, izendatzailea ezin da zero izan, eta erro karratu baten barrukoa ezin da negatiboa izan: $x$ balio horiek definizio-eremutik kanpo geratzen dira.',
            'Se escriben como intervalos: $[-2,5]$ incluye el $-2$ y el 5. En una fórmula, un denominador no puede ser cero, y lo de dentro de una raíz cuadrada no puede ser negativo: esos valores de $x$ quedan fuera del dominio.',
            'تُكتب على صورة فترات: $[-2,5]$ تضم $-2$ و5. وفي الصيغة لا يجوز أن يكون المقام صفرًا، ولا ما تحت الجذر التربيعي سالبًا: تلك القيم لـ $x$ تبقى خارج المجال.',
            'They are written as intervals: $[-2,5]$ includes $-2$ and 5. In a formula, a denominator cannot be zero, and what is under a square root cannot be negative: those values of $x$ are left out of the domain.'
        ),
        examplePrompt: say('Zein $x$ balio daude $f(x)=\\sqrt{x-3}$ funtzioaren definizio-eremuan?', '¿Qué valores de $x$ están en el dominio de $f(x)=\\sqrt{x-3}$?', 'ما قيم $x$ التي في مجال $f(x)=\\sqrt{x-3}$؟', 'Which values of $x$ are in the domain of $f(x)=\\sqrt{x-3}$?'),
        example: same('$x-3\\geq 0\\ \\to\\ x\\geq 3$'),
        exampleAnswer: say('3 zenbakitik aurrera: $[3,+\\infty)$.', 'Del 3 en adelante: $[3,+\\infty)$.', 'من 3 فما فوق: $[3,+\\infty)$.', 'From 3 onwards: $[3,+\\infty)$.')
    },
    'reading-graphs': {
        vocabulary: [
            say('ardatzak', 'ejes', 'المحورين', 'axes'),
            say('unitateak', 'unidades', 'وحدات', 'units'),
            say('tenperatura', 'temperatura', 'الحرارة', 'temperature')
        ],
        explanation: say(
            'Begiratu lehenik ardatzei: zer neurtzen duten eta zein unitatetan. Puntu bakoitza $(x,y)$ bikote bat da: tenperaturaren grafikoan, $f(4)=8$ esan nahi du $x=4$ denean tenperatura 8 dela. Igotzen diren zatiek hazten dela esaten dute; horizontalek, ez dela aldatzen; jaisten direnek, txikitzen dela.',
            'Mira primero los ejes: qué miden y en qué unidades. Cada punto es una pareja $(x,y)$: en la gráfica de la temperatura, $f(4)=8$ dice que con $x=4$ la temperatura es 8. Los tramos que suben dicen que crece; los horizontales, que no cambia; los que bajan, que disminuye.',
            'انظر أولًا إلى المحورين: ماذا يقيسان وبأي وحدات. كل نقطة زوج $(x,y)$: في تمثيل الحرارة يعني $f(4)=8$ أن الحرارة 8 عندما $x=4$. والأجزاء الصاعدة تقول إن القيمة تزداد، والأفقية إنها لا تتغير، والنازلة إنها تنقص.',
            'Look at the axes first: what they measure and in which units. Each point is a pair $(x,y)$: on the temperature graph, $f(4)=8$ says that when $x=4$ the temperature is 8. Stretches going up say it grows; flat ones, that it does not change; those going down, that it decreases.'
        ),
        examplePrompt: say('Pertsona bat etxetik irten, 3 km egin ordubetean, ordu erdiz atseden hartu eta ordu eta erdian itzultzen da. Zein abiaduratan itzultzen da?', 'Una persona sale de casa, camina 3 km en 1 hora, descansa media hora y vuelve en 1,5 horas. ¿A qué velocidad vuelve?', 'يخرج شخص من بيته فيمشي 3 كم في ساعة، ويستريح نصف ساعة، ويعود في 1.5 ساعة. ما سرعته في العودة؟', 'Someone leaves home, walks 3 km in 1 hour, rests for half an hour and comes back in 1.5 hours. How fast do they come back?'),
        example: same('$\\frac{3}{1{,}5}=2$'),
        exampleAnswer: say('2 km/h: itzulerako zatia joanekoa baino gutxiago makurtzen da.', '2 km/h: el tramo de vuelta está menos inclinado que el de ida.', '2 كم/س: جزء العودة أقل ميلًا من جزء الذهاب.', '2 km/h: the way back is less steep than the way there.')
    },
    growth: {
        vocabulary: [
            say('gorakorra', 'creciente', 'متزايدة', 'increasing'),
            say('beherakorra', 'decreciente', 'متناقصة', 'decreasing'),
            say('konstantea', 'constante', 'ثابتة', 'constant')
        ],
        explanation: say(
            'Funtzio bat gorakorra da tarte batean, ezkerretik eskuinera grafikoa igotzen bada: $x$ handitzean $y$ handitzen da. Beherakorra da jaisten bada, eta konstantea horizontala bada. Tarteak $x$ ardatzean irakurtzen dira, hegazkinaren altueran bezala.',
            'Una función es creciente en un intervalo si, de izquierda a derecha, la gráfica sube: al aumentar $x$ aumenta $y$. Es decreciente si baja, y constante si es horizontal. Los intervalos se leen en el eje $x$, como en la altura de la avioneta.',
            'تكون الدالة متزايدة على فترة إذا صعد تمثيلها من اليسار إلى اليمين: عندما يزداد $x$ يزداد $y$. وتكون متناقصة إذا نزل، وثابتة إذا كان أفقيًا. وتُقرأ الفترات على المحور $x$، كما في ارتفاع الطائرة.',
            'A function is increasing on an interval if, from left to right, the graph goes up: as $x$ grows, $y$ grows. It is decreasing if it goes down, and constant if it is flat. Intervals are read on the $x$ axis, as with the height of the plane.'
        ),
        examplePrompt: say('Gorakorra ala beherakorra da $f(x)=-3x+2$? Probatu $x=0$ eta $x=2$ balioekin.', '¿Es creciente o decreciente $f(x)=-3x+2$? Prueba con $x=0$ y $x=2$.', 'هل $f(x)=-3x+2$ متزايدة أم متناقصة؟ جرّب $x=0$ و$x=2$.', 'Is $f(x)=-3x+2$ increasing or decreasing? Try $x=0$ and $x=2$.'),
        example: same('$\\begin{gathered}f(0)=2\\\\ f(2)=-3\\cdot 2+2=-4\\end{gathered}$'),
        exampleAnswer: say('Beherakorra: $x$ 0 zenbakitik 2 zenbakira handitzean, $y$ 2 zenbakitik $-4$ zenbakira jaisten da.', 'Decreciente: al aumentar $x$ de 0 a 2, $y$ baja de 2 a $-4$.', 'متناقصة: عندما يزداد $x$ من 0 إلى 2 ينزل $y$ من 2 إلى $-4$.', 'Decreasing: as $x$ goes from 0 to 2, $y$ drops from 2 to $-4$.')
    },
    extremes: {
        definitions: [
            {
                term: say('Maximo erlatiboa', 'Máximo relativo', 'القيمة العظمى النسبية', 'Relative maximum'),
                meaning: say('Funtzioa gorakorra izatetik beherakorra izatera pasatzen den puntua: tontor bat.', 'Un punto donde la función pasa de crecer a decrecer: una cima.', 'نقطة تنتقل فيها الدالة من التزايد إلى التناقص: قمة.', 'A point where the function goes from increasing to decreasing: a peak.')
            },
            {
                term: say('Minimo erlatiboa', 'Mínimo relativo', 'القيمة الصغرى النسبية', 'Relative minimum'),
                meaning: say('Beherakorretik gorakorrera pasatzen den puntua: haran bat.', 'Un punto donde pasa de decrecer a crecer: un valle.', 'نقطة تنتقل فيها من التناقص إلى التزايد: وادٍ.', 'A point where it goes from decreasing to increasing: a valley.')
            }
        ],
        vocabulary: [
            say('tontorra', 'cima', 'قمة', 'peak'),
            say('harana', 'valle', 'وادٍ', 'valley'),
            say('puntua', 'punto', 'النقطة', 'point')
        ],
        explanation: say(
            'Maximo absolutua grafiko osoko punturik altuena da, eta minimo absolutua, baxuena. Maximo edo minimo bat $(x,y)$ puntu gisa ematen da: non dagoen $x$ eta zenbat balio duen $y$ aldagaiak han.',
            'El máximo absoluto es el punto más alto de toda la gráfica, y el mínimo absoluto, el más bajo. Un máximo o un mínimo se da como un punto $(x,y)$: dónde está $x$ y cuánto vale $y$ allí.',
            'القيمة العظمى المطلقة أعلى نقطة في التمثيل كله، والصغرى المطلقة أخفضها. وتُعطى العظمى أو الصغرى نقطةً $(x,y)$: أين يقع $x$ وكم يساوي $y$ هناك.',
            'The absolute maximum is the highest point of the whole graph, and the absolute minimum, the lowest. A maximum or a minimum is given as a point $(x,y)$: where $x$ is and how much $y$ is there.'
        ),
        examplePrompt: say('Taula: $x$: 0, 1, 2, 3, 4; $y$: 7, 4, 2, 3, 6. Minimorik badago?', 'Tabla: $x$: 0, 1, 2, 3, 4; $y$: 7, 4, 2, 3, 6. ¿Hay un mínimo?', 'جدول: $x$: 0، 1، 2، 3، 4؛ $y$: 7، 4، 2، 3، 6. هل توجد قيمة صغرى؟', 'Table: $x$: 0, 1, 2, 3, 4; $y$: 7, 4, 2, 3, 6. Is there a minimum?'),
        example: same('$(2,2)$'),
        exampleAnswer: say('Bai, $(2,2)$: $y$ 2 zenbakiraino jaisten da eta gero igo egiten da.', 'Sí, $(2,2)$: $y$ baja hasta 2 y luego sube.', 'نعم، $(2,2)$: ينزل $y$ حتى 2 ثم يصعد.', 'Yes, $(2,2)$: $y$ goes down to 2 and then up.')
    },
    intercepts: {
        vocabulary: [
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'crossing point'),
            say('ardatzak', 'ejes', 'المحورين', 'axes'),
            say('ekuazioa', 'ecuación', 'المعادلة', 'equation')
        ],
        explanation: say(
            'Y ardatza mozteko, ordezkatu $x=0$: $(0,f(0))$ puntua. X ardatza mozteko, ebatzi $f(x)=0$ ekuazioa: soluzio bakoitzak $(x,0)$ puntu bat ematen du. Funtzio batek Y ardatza gehienez behin mozten du, baina X ardatza hainbat aldiz.',
            'Para cortar el eje Y, se sustituye $x=0$: el punto $(0,f(0))$. Para cortar el eje X, se resuelve la ecuación $f(x)=0$: cada solución da un punto $(x,0)$. Una función corta el eje Y como mucho una vez, pero el eje X puede cortarlo varias.',
            'لإيجاد التقاطع مع محور Y نعوّض $x=0$: النقطة $(0,f(0))$. ولإيجاد التقاطع مع محور X نحل المعادلة $f(x)=0$: كل حل يعطي نقطة $(x,0)$. وتقطع الدالة محور Y مرة واحدة على الأكثر، أما محور X فقد تقطعه مرات.',
            'To cross the Y axis, substitute $x=0$: the point $(0,f(0))$. To cross the X axis, solve the equation $f(x)=0$: each solution gives a point $(x,0)$. A function crosses the Y axis at most once, but it may cross the X axis several times.'
        ),
        examplePrompt: say('Non mozten ditu ardatzak $f(x)=-3x+12$ funtzioak?', '¿Dónde corta a los ejes $f(x)=-3x+12$?', 'أين تقطع $f(x)=-3x+12$ المحورين؟', 'Where does $f(x)=-3x+12$ cross the axes?'),
        example: same('$\\begin{gathered}f(0)=12\\ \\to\\ (0,12)\\\\ -3x+12=0\\ \\to\\ x=4\\end{gathered}$'),
        exampleAnswer: say('$(0,12)$ eta $(4,0)$ puntuetan.', 'En $(0,12)$ y en $(4,0)$.', 'في $(0,12)$ و$(4,0)$.', 'At $(0,12)$ and at $(4,0)$.'),
        why: {
            text: say(
                'Y ardatzeko puntu guztiek $x=0$ dute, eta X ardatzeko guztiek $y=0$. Horregatik, Y ardatza aurkitzeko $x=0$ jartzen da, eta X ardatza aurkitzeko $y=0$.',
                'Todos los puntos del eje Y tienen $x=0$, y todos los del eje X tienen $y=0$. Por eso, para el eje Y se pone $x=0$, y para el eje X, $y=0$.',
                'كل نقاط محور Y فيها $x=0$، وكل نقاط محور X فيها $y=0$. لذلك نضع $x=0$ لمحور Y، و$y=0$ لمحور X.',
                'Every point on the Y axis has $x=0$, and every point on the X axis has $y=0$. That is why you put $x=0$ for the Y axis, and $y=0$ for the X axis.'
            )
        }
    },
    proportional: {
        vocabulary: [
            say('jatorria', 'origen', 'الأصل', 'origin'),
            say('konstantea', 'constante', 'ثابت', 'constant'),
            say('zatidura', 'cociente', 'حاصل القسمة', 'quotient')
        ],
        explanation: say(
            'Bi magnitude zuzenki proportzionalak badira, haien funtzioa $y=mx$ da, jatorritik pasatzen den zuzen bat. $m$ zenbakia proportzionaltasun-konstantea da: $\\frac{y}{x}$ zatidurak beti $m$ ematen du. Marrazteko, nahikoa dira jatorria eta beste puntu bat: $x=1$ bada, $y=m$.',
            'Si dos magnitudes son directamente proporcionales, su función es $y=mx$, una recta que pasa por el origen. El número $m$ es la constante de proporcionalidad: el cociente $\\frac{y}{x}$ siempre da $m$. Para dibujarla basta el origen y otro punto: si $x=1$, $y=m$.',
            'إذا كان مقداران متناسبين طرديًا فدالتهما $y=mx$، مستقيم يمر بالأصل. والعدد $m$ ثابت التناسب: حاصل القسمة $\\frac{y}{x}$ يعطي دائمًا $m$. ولرسمها يكفي الأصل ونقطة أخرى: إذا كان $x=1$ فإن $y=m$.',
            'If two quantities are directly proportional, their function is $y=mx$, a line through the origin. The number $m$ is the constant of proportionality: the quotient $\\frac{y}{x}$ always gives $m$. To draw it you only need the origin and one more point: if $x=1$, $y=m$.'
        ),
        examplePrompt: say('Auto batek 6 L gastatzen ditu 100 km bakoitzeko. Idatzi funtzioa eta kalkulatu 250 km-tan zenbat gastatzen duen.', 'Un coche gasta 6 L cada 100 km. Escribe la función y calcula el gasto en 250 km.', 'تستهلك سيارة 6 لترات لكل 100 كم. اكتب الدالة واحسب الاستهلاك في 250 كم.', 'A car uses 6 L every 100 km. Write the function and work out how much it uses in 250 km.'),
        example: same('$m=\\frac{6}{100}=0{,}06\\qquad 0{,}06\\cdot 250=15$'),
        exampleAnswer: say('$y=0{,}06x$: 250 km-tan 15 L gastatzen ditu.', '$y=0{,}06x$: en 250 km gasta 15 L.', '$y=0{,}06x$: تستهلك 15 لترًا في 250 كم.', '$y=0{,}06x$: in 250 km it uses 15 L.')
    },
    slope: {
        vocabulary: [
            say('igoera', 'subida', 'الصعود', 'rise'),
            say('aurrerapena', 'avance', 'التقدم', 'run'),
            say('horizontala', 'horizontal', 'أفقيًا', 'horizontal')
        ],
        explanation: say(
            'Malda igoera zati aurrerapena da: $x$ unitate bat aurreratzean $y$ zenbat aldatzen den, $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. $A(1,2)$ eta $B(4,8)$ puntuen artean, $m=\\frac{6}{3}=2$. $m>0$ bada, zuzena igo egiten da; $m<0$ bada, jaitsi; $m=0$ bada, horizontala da.',
            'La pendiente es la subida entre el avance: cuánto cambia $y$ cuando $x$ avanza una unidad, $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. Entre $A(1,2)$ y $B(4,8)$, $m=\\frac{6}{3}=2$. Si $m>0$, la recta sube; si $m<0$, baja; si $m=0$, es horizontal.',
            'الميل هو الصعود مقسومًا على التقدم: كم يتغير $y$ عندما يتقدم $x$ وحدة، $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. بين $A(1,2)$ و$B(4,8)$ يكون $m=\\frac{6}{3}=2$. إذا $m>0$ يصعد المستقيم، وإذا $m<0$ ينزل، وإذا $m=0$ يكون أفقيًا.',
            'The slope is the rise over the run: how much $y$ changes when $x$ moves on one unit, $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. Between $A(1,2)$ and $B(4,8)$, $m=\\frac{6}{3}=2$. If $m>0$, the line goes up; if $m<0$, down; if $m=0$, it is horizontal.'
        ),
        examplePrompt: say('Aurkitu $P(-2,5)$ eta $Q(3,-5)$ puntuen arteko malda.', 'Halla la pendiente entre $P(-2,5)$ y $Q(3,-5)$.', 'جد الميل بين $P(-2,5)$ و$Q(3,-5)$.', 'Find the slope between $P(-2,5)$ and $Q(3,-5)$.'),
        example: same('$m=\\frac{-5-5}{3-(-2)}=\\frac{-10}{5}=-2$'),
        exampleAnswer: say('$m=-2$: zuzena jaitsi egiten da.', '$m=-2$: la recta baja.', '$m=-2$: المستقيم ينزل.', '$m=-2$: the line goes down.'),
        why: {
            text: say(
                'Zuzen batean, $x$ 1 aurreratzen den bakoitzean, $y$ beti gauza bera igotzen da: horregatik berdin dio zein bi puntu erabiltzen dituzun. $(1,2)$ eta $(4,8)$ puntuekin edo $(2,4)$ eta $(3,6)$ puntuekin, $m=2$ ateratzen da.',
                'En una recta, cada vez que $x$ avanza 1, $y$ sube siempre lo mismo: por eso da igual qué dos puntos uses. Con $(1,2)$ y $(4,8)$, o con $(2,4)$ y $(3,6)$, sale $m=2$.',
                'في المستقيم، كلما تقدم $x$ بمقدار 1 يصعد $y$ المقدار نفسه دائمًا: لذلك لا يهم أي نقطتين تستعمل. مع $(1,2)$ و$(4,8)$ أو مع $(2,4)$ و$(3,6)$ يخرج $m=2$.',
                'On a line, each time $x$ moves on 1, $y$ always rises the same: that is why it does not matter which two points you use. With $(1,2)$ and $(4,8)$, or with $(2,4)$ and $(3,6)$, you get $m=2$.'
            ),
            math: same('$\\frac{8-2}{4-1}=\\frac{6-4}{3-2}=2$')
        }
    },
    affine: {
        definitions: [
            {
                term: say('Jatorriko ordenatua', 'Ordenada en el origen', 'الجزء المقطوع', 'Y-intercept'),
                meaning: say('$n$ zenbakia, $y=mx+n$ formulan: zuzenak Y ardatza $(0,n)$ puntuan mozten du.', 'El número $n$ de $y=mx+n$: la recta corta el eje Y en $(0,n)$.', 'العدد $n$ في $y=mx+n$: يقطع المستقيم محور Y في $(0,n)$.', 'The number $n$ in $y=mx+n$: the line crosses the Y axis at $(0,n)$.')
            }
        ],
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('Y ardatza', 'eje Y', 'محور Y', 'Y axis'),
            say('eskuinera', 'derecha', 'اليمين', 'right')
        ],
        explanation: say(
            'Funtzio afin baten formula $y=mx+n$ da, $m$ malda izanik. Marrazteko, jarri $(0,n)$ puntua eta handik aurreratu 1 eskuinera eta $m$ gora, edo behera $m$ negatiboa bada. $y=2x-1$ zuzena $y=2x$ zuzena da, 1 jaitsita.',
            'La fórmula de una función afín es $y=mx+n$, con $m$ la pendiente. Para dibujarla, marca $(0,n)$ y desde ahí avanza 1 a la derecha y $m$ hacia arriba, o hacia abajo si $m$ es negativa. $y=2x-1$ es la recta $y=2x$ bajada 1.',
            'صيغة الدالة التآلفية $y=mx+n$ حيث $m$ الميل. ولرسمها ضع النقطة $(0,n)$ وتقدم منها 1 إلى اليمين و$m$ إلى الأعلى، أو إلى الأسفل إذا كان $m$ سالبًا. والمستقيم $y=2x-1$ هو $y=2x$ منخفضًا بمقدار 1.',
            'The formula of an affine function is $y=mx+n$, with $m$ the slope. To draw it, mark $(0,n)$ and from there move 1 to the right and $m$ up, or down if $m$ is negative. $y=2x-1$ is the line $y=2x$ moved down 1.'
        ),
        examplePrompt: say('Marraztu $y=\\frac{1}{2}x-3$: zein bi puntu erabiltzen dituzu?', 'Dibuja $y=\\frac{1}{2}x-3$: ¿qué dos puntos usas?', 'ارسم $y=\\frac{1}{2}x-3$: أي نقطتين تستعمل؟', 'Draw $y=\\frac{1}{2}x-3$: which two points do you use?'),
        example: same('$\\begin{gathered}(0,-3)\\\\ \\frac{1}{2}\\cdot 2-3=-2\\ \\to\\ (2,-2)\\end{gathered}$'),
        exampleAnswer: say('$(0,-3)$ eta $(2,-2)$: $m=\\frac{1}{2}$ izanik, 2 aurreratu eta 1 igo.', '$(0,-3)$ y $(2,-2)$: con $m=\\frac{1}{2}$, avanza 2 y sube 1.', '$(0,-3)$ و$(2,-2)$: مع $m=\\frac{1}{2}$ تقدّم 2 واصعد 1.', '$(0,-3)$ and $(2,-2)$: with $m=\\frac{1}{2}$, move on 2 and up 1.')
    },
    'two-points': {
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('ordezkatu', 'sustituye', 'عوّض', 'substitute'),
            say('egiaztatu', 'comprueba', 'تحقق', 'check')
        ],
        explanation: say(
            'Bi puntu ezagututa, kalkulatu lehenik malda. Gero, ordezkatu puntuetako bat $y=mx+n$ formulan eta askatu $n$. $(0,1)$ eta $(3,7)$ puntuetatik pasatzen den zuzenean, $m=\\frac{7-1}{3-0}=2$ eta $n=1$: $y=2x+1$. Egiaztatu beste puntuarekin.',
            'Con dos puntos, calcula primero la pendiente. Después sustituye uno de los puntos en $y=mx+n$ y despeja $n$. Para la recta que pasa por $(0,1)$ y $(3,7)$, $m=\\frac{7-1}{3-0}=2$ y $n=1$: $y=2x+1$. Comprueba con el otro punto.',
            'بمعرفة نقطتين احسب أولًا الميل. ثم عوّض إحدى النقطتين في $y=mx+n$ واعزل $n$. للمستقيم المار بـ $(0,1)$ و$(3,7)$ يكون $m=\\frac{7-1}{3-0}=2$ و$n=1$: ‏$y=2x+1$. تحقق بالنقطة الأخرى.',
            'With two points, first work out the slope. Then substitute one of the points into $y=mx+n$ and solve for $n$. For the line through $(0,1)$ and $(3,7)$, $m=\\frac{7-1}{3-0}=2$ and $n=1$: $y=2x+1$. Check with the other point.'
        ),
        examplePrompt: say('Aurkitu $(2,1)$ eta $(4,-5)$ puntuetatik pasatzen den zuzena.', 'Halla la recta que pasa por $(2,1)$ y $(4,-5)$.', 'جد المستقيم المار بـ $(2,1)$ و$(4,-5)$.', 'Find the line through $(2,1)$ and $(4,-5)$.'),
        example: same('$\\begin{gathered}m=\\frac{-5-1}{4-2}=-3\\\\ 1=-3\\cdot 2+n\\ \\to\\ n=7\\end{gathered}$'),
        exampleAnswer: say('$y=-3x+7$; $(4,-5)$ puntuarekin: $-3\\cdot 4+7=-5$.', '$y=-3x+7$; con $(4,-5)$: $-3\\cdot 4+7=-5$.', '$y=-3x+7$؛ ومع $(4,-5)$: ‏$-3\\cdot 4+7=-5$.', '$y=-3x+7$; with $(4,-5)$: $-3\\cdot 4+7=-5$.')
    },
    'parallel-lines': {
        vocabulary: [
            say('paraleloak', 'paralelas', 'متوازيين', 'parallel'),
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'crossing point'),
            say('berdindu', 'iguala', 'ساوِ', 'set equal')
        ],
        explanation: say(
            'Bi zuzen paraleloak dira malda bera eta $n$ desberdina badituzte. Malda desberdina badute, puntu batean ebakitzen dira: ebaki-puntua aurkitzeko, berdindu bi adierazpenak, ebatzi $x$ eta ordezkatu $y$ lortzeko. Sistema bat grafikoki ebaztea da.',
            'Dos rectas son paralelas si tienen la misma pendiente y distinto $n$. Si tienen distinta pendiente, se cortan en un punto: para hallar el punto de corte, iguala las dos expresiones, resuelve $x$ y sustituye para obtener $y$. Es resolver un sistema gráficamente.',
            'يتوازى مستقيمان إذا كان لهما الميل نفسه و$n$ مختلف. وإذا اختلف الميلان تقاطعا في نقطة: لإيجاد نقطة التقاطع ساوِ العبارتين وحلّ $x$ ثم عوّض لتحصل على $y$. إنه حل نظام بيانيًا.',
            'Two lines are parallel if they have the same slope and a different $n$. If their slopes differ, they cross at one point: to find the crossing point, set the two expressions equal, solve for $x$ and substitute to get $y$. It is solving a system graphically.'
        ),
        examplePrompt: say('Non ebakitzen dira $y=2x+3$ eta $y=-x+9$?', '¿Dónde se cortan $y=2x+3$ e $y=-x+9$?', 'أين يتقاطع $y=2x+3$ و$y=-x+9$؟', 'Where do $y=2x+3$ and $y=-x+9$ cross?'),
        example: same('$\\begin{gathered}2x+3=-x+9\\ \\to\\ x=2\\\\ y=2\\cdot 2+3=7\\end{gathered}$'),
        exampleAnswer: say('$(2,7)$ puntuan.', 'En $(2,7)$.', 'في $(2,7)$.', 'At $(2,7)$.')
    },
    'linear-problems': {
        vocabulary: [
            say('tarifa', 'tarifa', 'التعريفة', 'rate'),
            say('zati finkoa', 'parte fija', 'جزء ثابت', 'fixed part'),
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'crossing point')
        ],
        explanation: say(
            'Tarifa askok funtzio afin bat jarraitzen dute: zati finko bat, $n$, gehi unitate bakoitzeko prezio bat, $m$. Bi tarifa konparatzeko, berdindu: ebaki-puntuaren alde batean bat da merkeagoa, eta bestean, bestea.',
            'Muchas tarifas siguen una función afín: una parte fija, $n$, más un precio por cada unidad, $m$. Para comparar dos tarifas, iguálalas: a un lado del punto de corte es más barata una, y al otro, la otra.',
            'تتبع تعريفات كثيرة دالة تآلفية: جزء ثابت $n$ زائد سعر لكل وحدة $m$. ولمقارنة تعريفتين ساوِ بينهما: على جانب من نقطة التقاطع تكون إحداهما أرخص، وعلى الجانب الآخر الأخرى.',
            'Many rates follow an affine function: a fixed part, $n$, plus a price for each unit, $m$. To compare two rates, set them equal: on one side of the crossing point one is cheaper, and on the other side, the other.'
        ),
        examplePrompt: say('Gimnasio batek 20 € kobratzen ditu izena emateko eta 25 € hilean. Zenbat ordaintzen da 6 hilabetetan?', 'Un gimnasio cobra 20 € de matrícula y 25 € al mes. ¿Cuánto se paga en 6 meses?', 'يتقاضى نادٍ رياضي 20 € للتسجيل و25 € في الشهر. كم يُدفع في 6 أشهر؟', 'A gym charges €20 to join and €25 a month. How much do you pay in 6 months?'),
        example: same('$y=25x+20\\ \\to\\ 25\\cdot 6+20=170$'),
        exampleAnswer: say('170 €: hilekoa bider 6, gehi zati finkoa.', '170 €: la cuota por 6, más la parte fija.', '170 €: الاشتراك الشهري في 6 زائد الجزء الثابت.', '€170: the monthly fee times 6, plus the fixed part.')
    },
    'parabola-shape': {
        definitions: [
            {
                term: say('Parabola', 'Parábola', 'القطع المكافئ', 'Parabola'),
                meaning: say('Funtzio koadratiko baten grafikoa, $y=ax^{2}+bx+c$, $a\\neq 0$ izanik.', 'La gráfica de una función cuadrática, $y=ax^{2}+bx+c$, con $a\\neq 0$.', 'تمثيل الدالة التربيعية $y=ax^{2}+bx+c$ حيث $a\\neq 0$.', 'The graph of a quadratic function, $y=ax^{2}+bx+c$, with $a\\neq 0$.')
            }
        ],
        vocabulary: [
            say('adarrak', 'ramas', 'الفرعان', 'branches'),
            say('erpina', 'vértice', 'الرأس', 'vertex'),
            say('simetrikoa', 'simétrica', 'متناظر', 'symmetric')
        ],
        explanation: say(
            '$a>0$ bada, adarrak gora doaz eta minimo bat du; $a<0$ bada, behera, eta maximo bat du. $|a|$ zenbat eta handiagoa, orduan eta estuagoa. Y ardatzarekiko ebakia $(0,c)$ da, eta erpinetik pasatzen den zuzen bertikalarekiko simetrikoa da.',
            'Si $a>0$, las ramas van hacia arriba y tiene un mínimo; si $a<0$, hacia abajo y tiene un máximo. Cuanto mayor es $|a|$, más estrecha. El corte con el eje Y es $(0,c)$, y es simétrica respecto a la recta vertical que pasa por el vértice.',
            'إذا كان $a>0$ يتجه الفرعان إلى الأعلى وله قيمة صغرى، وإذا $a<0$ فإلى الأسفل وله عظمى. وكلما كبر $|a|$ ضاق. والتقاطع مع محور Y هو $(0,c)$، وهو متناظر بالنسبة إلى المستقيم العمودي المار بالرأس.',
            'If $a>0$, the branches go up and it has a minimum; if $a<0$, down, and it has a maximum. The bigger $|a|$, the narrower. It crosses the Y axis at $(0,c)$, and it is symmetric about the vertical line through the vertex.'
        ),
        examplePrompt: say('Nora irekitzen da $y=\\frac{1}{2}x^{2}-4$, eta non mozten du Y ardatza?', '¿Hacia dónde se abre $y=\\frac{1}{2}x^{2}-4$ y dónde corta al eje Y?', 'إلى أين يتجه $y=\\frac{1}{2}x^{2}-4$ وأين يقطع محور Y؟', 'Which way does $y=\\frac{1}{2}x^{2}-4$ open, and where does it cross the Y axis?'),
        example: same('$a=\\frac{1}{2}>0\\qquad c=-4$'),
        exampleAnswer: say('Gora, eta $y=x^{2}$ baino zabalagoa da; Y ardatza $(0,-4)$ puntuan mozten du.', 'Hacia arriba, y es más ancha que $y=x^{2}$; corta al eje Y en $(0,-4)$.', 'إلى الأعلى، وهو أعرض من $y=x^{2}$؛ ويقطع محور Y في $(0,-4)$.', 'Upwards, and it is wider than $y=x^{2}$; it crosses the Y axis at $(0,-4)$.')
    },
    vertex: {
        vocabulary: [
            say('simetria-ardatza', 'eje de simetría', 'محور التناظر', 'axis of symmetry'),
            say('bertikala', 'vertical', 'العمودي', 'vertical'),
            say('ordezkatu', 'sustituir', 'التعويض', 'substitute')
        ],
        explanation: say(
            'Erpina parabolaren punturik baxuena edo altuena da. Haren $x$ koordenatua $x_{v}=\\frac{-b}{2a}$ da, eta $y$ ordezkatuz ateratzen da. $y=x^{2}-4x+3$ parabolan, $x_{v}=2$ eta $y_{v}=-1$. Simetria-ardatza $x=x_{v}$ zuzen bertikala da.',
            'El vértice es el punto más bajo, o más alto, de la parábola. Su coordenada $x$ es $x_{v}=\\frac{-b}{2a}$, y la $y$ sale al sustituir. En $y=x^{2}-4x+3$, $x_{v}=2$ e $y_{v}=-1$. El eje de simetría es la recta vertical $x=x_{v}$.',
            'الرأس أخفض نقطة في القطع المكافئ أو أعلاها. إحداثيه $x$ هو $x_{v}=\\frac{-b}{2a}$، ويخرج $y$ بالتعويض. في $y=x^{2}-4x+3$ يكون $x_{v}=2$ و$y_{v}=-1$. ومحور التناظر هو المستقيم العمودي $x=x_{v}$.',
            'The vertex is the lowest, or highest, point of the parabola. Its $x$ coordinate is $x_{v}=\\frac{-b}{2a}$, and the $y$ comes from substituting. In $y=x^{2}-4x+3$, $x_{v}=2$ and $y_{v}=-1$. The axis of symmetry is the vertical line $x=x_{v}$.'
        ),
        examplePrompt: say('Aurkitu $y=-x^{2}+8x-7$ parabolaren erpina.', 'Halla el vértice de $y=-x^{2}+8x-7$.', 'جد رأس $y=-x^{2}+8x-7$.', 'Find the vertex of $y=-x^{2}+8x-7$.'),
        example: same('$\\begin{gathered}x_{v}=\\frac{-8}{-2}=4\\\\ y_{v}=-16+32-7=9\\end{gathered}$'),
        exampleAnswer: say('$(4,9)$: maximo bat da, $a<0$ delako.', '$(4,9)$: es un máximo, porque $a<0$.', '$(4,9)$: إنه قيمة عظمى لأن $a<0$.', '$(4,9)$: it is a maximum, because $a<0$.')
    },
    'parabola-intercepts': {
        vocabulary: [
            say('diskriminatzailea', 'discriminante', 'المميّز', 'discriminant'),
            say('ebakiak', 'cortes', 'التقاطعات', 'crossings'),
            say('erdian', 'en medio', 'في المنتصف', 'in the middle')
        ],
        explanation: say(
            'Y ardatza: $(0,c)$. X ardatza: ebatzi $ax^{2}+bx+c=0$; diskriminatzaileak esaten du bi ebaki, bat ala bat ere ez dagoen. Bi badaude, erpina erdian dago: $x_{v}=\\frac{x_{1}+x_{2}}{2}$. Marrazteko, erabili erpina, ebakiak eta puntu simetrikoren bat.',
            'Eje Y: $(0,c)$. Eje X: resuelve $ax^{2}+bx+c=0$; el discriminante dice si hay dos cortes, uno o ninguno. Si hay dos, el vértice está justo en medio: $x_{v}=\\frac{x_{1}+x_{2}}{2}$. Para dibujarla, usa el vértice, los cortes y algún punto simétrico.',
            'محور Y: ‏$(0,c)$. محور X: حلّ $ax^{2}+bx+c=0$؛ ويقول المميّز هل هناك تقاطعان أو واحد أو لا شيء. وإذا كانا اثنين فالرأس في المنتصف تمامًا: $x_{v}=\\frac{x_{1}+x_{2}}{2}$. وللرسم استعمل الرأس والتقاطعات ونقطة متناظرة.',
            'Y axis: $(0,c)$. X axis: solve $ax^{2}+bx+c=0$; the discriminant tells whether there are two crossings, one or none. If there are two, the vertex is right in the middle: $x_{v}=\\frac{x_{1}+x_{2}}{2}$. To draw it, use the vertex, the crossings and a symmetric point.'
        ),
        examplePrompt: say('Non mozten du $y=x^{2}-6x+8$ parabolak X ardatza? Non dago erpina?', '¿Dónde corta $y=x^{2}-6x+8$ al eje X? ¿Dónde está el vértice?', 'أين يقطع $y=x^{2}-6x+8$ محور X؟ وأين الرأس؟', 'Where does $y=x^{2}-6x+8$ cross the X axis? Where is the vertex?'),
        example: same('$\\begin{gathered}x=\\frac{6\\pm 2}{2}\\ \\to\\ (2,0),\\ (4,0)\\\\ x_{v}=\\frac{2+4}{2}=3\\end{gathered}$'),
        exampleAnswer: say('$(2,0)$ eta $(4,0)$ puntuetan; erpina $(3,-1)$ da.', 'En $(2,0)$ y $(4,0)$; el vértice es $(3,-1)$.', 'في $(2,0)$ و$(4,0)$؛ والرأس $(3,-1)$.', 'At $(2,0)$ and $(4,0)$; the vertex is $(3,-1)$.'),
        why: {
            text: say(
                'Parabola simetrikoa da: altuera berean dauden bi puntu ardatzetik distantzia berera daude. Horregatik dago erpina bi ebakien erdian: $y=x^{2}-4x+3$ parabolak 1 eta 3 puntuetan mozten du, eta erpina 2 puntuan dago.',
                'La parábola es simétrica: dos puntos a la misma altura están a la misma distancia del eje. Por eso el vértice está en medio de los dos cortes: $y=x^{2}-4x+3$ corta en 1 y en 3, y el vértice está en 2.',
                'القطع المكافئ متناظر: نقطتان على الارتفاع نفسه تبعدان المسافة نفسها عن المحور. لذلك يقع الرأس في منتصف التقاطعين: يقطع $y=x^{2}-4x+3$ في 1 و3، والرأس في 2.',
                'The parabola is symmetric: two points at the same height are the same distance from the axis. That is why the vertex is midway between the two crossings: $y=x^{2}-4x+3$ crosses at 1 and 3, and the vertex is at 2.'
            ),
            math: same('$\\frac{1+3}{2}=2$')
        }
    }
}
