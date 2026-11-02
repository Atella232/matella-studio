import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Funtzioak · 2. DBH — the typical mistake and the «Check it» question of
   every lesson. Plain data (no JSX) so the tests can import it; lessons.tsx
   merges it into the topics. The questions use new numbers, never those of
   «Let's solve» or of the example, and one of their wrong answers is the
   lesson's typical mistake. The card has no drawing, so a graph is given
   in words (its points and how it goes between them).
   ========================================================================== */

export type FunctionsTopicId = 'coordinates' | 'function' | 'variables' | 'tables' | 'formula' | 'plot' | 'continuity' | 'graph-reading' | 'intercepts' | 'variation' | 'extremes' | 'direct-proportion' | 'slope' | 'slope-sign' | 'affine' | 'constant' | 'line-equation'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const functionsLessonChecks: Record<FunctionsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    coordinates: {
        mistake: {
            wrong: say('$P(4,\\,-1)$ puntua kokatzeko, 4 gora eta 1 ezkerrera zenbatzen ditut.', 'Para situar $P(4,\\,-1)$ cuento 4 hacia arriba y 1 a la izquierda.', 'لتحديد النقطة $P(4,\\,-1)$ أعدّ 4 إلى الأعلى و1 إلى اليسار.', 'To plot $P(4,\\,-1)$ I count 4 up and 1 to the left.'),
            right: say('Lehenengo x, gero y: 4 eskuinera eta 1 behera. Laugarren koadrantean dago.', 'Primero x y después y: 4 a la derecha y 1 hacia abajo. Está en el cuarto cuadrante.', 'x أولًا ثم y: 4 إلى اليمين و1 إلى الأسفل. إنها في الربع الرابع.', 'First x, then y: 4 to the right and 1 down. It is in the fourth quadrant.')
        },
        check: {
            prompt: say('Zein koadrantetan dago $(3,\\,-5)$ puntua?', '¿En qué cuadrante está el punto $(3,\\,-5)$?', 'في أيّ ربع تقع النقطة $(3,\\,-5)$؟', 'Which quadrant is the point $(3,\\,-5)$ in?'),
            options: [
                say('Bigarrenean', 'En el segundo', 'في الربع الثاني', 'The second'),
                say('Hirugarrenean', 'En el tercero', 'في الربع الثالث', 'The third'),
                say('Laugarrenean', 'En el cuarto', 'في الربع الرابع', 'The fourth')
            ],
            correctIndex: 2,
            explanation: say('$x=3$ positiboa da (eskuinera) eta $y=-5$ negatiboa (behera): $(+,\\,-)$ zeinuak, laugarren koadrantea.', '$x=3$ es positiva (derecha) e $y=-5$, negativa (abajo): signos $(+,\\,-)$, cuarto cuadrante.', '$x=3$ موجبة (يمين) و$y=-5$ سالبة (أسفل): الإشارتان $(+,\\,-)$، الربع الرابع.', '$x=3$ is positive (right) and $y=-5$ is negative (down): signs $(+,\\,-)$, fourth quadrant.')
        }
    },
    function: {
        mistake: {
            wrong: say('$1\\to 3,\\ 2\\to 3,\\ 4\\to 6$ ez da funtzioa, 3 bi aldiz ateratzen delako.', '$1\\to 3,\\ 2\\to 3,\\ 4\\to 6$ no es función, porque el 3 sale dos veces.', '$1\\to 3,\\ 2\\to 3,\\ 4\\to 6$ ليست دالة لأن 3 يظهر مرتين.', '$1\\to 3,\\ 2\\to 3,\\ 4\\to 6$ is not a function, because 3 appears twice.'),
            right: say('Sarrera bakoitzak irteera bakarra du; beraz, funtzioa da. Irteera bat errepikatzeak ez du axola.', 'Cada entrada tiene una sola salida, así que sí es función. Que una salida se repita no importa.', 'لكل مدخل مخرج واحد، إذن هي دالة. ولا يهم أن يتكرر مخرج.', 'Each input has a single output, so it is a function. A repeated output does not matter.')
        },
        check: {
            prompt: say('Erlazio hauetatik, zein ez da funtzioa?', '¿Cuál de estas relaciones no es una función?', 'أيّ هذه العلاقات ليست دالة؟', 'Which of these relations is not a function?'),
            options: [same('$2\\to 5,\\ 2\\to 7$'), same('$1\\to 4,\\ 3\\to 4$'), same('$0\\to 1,\\ 5\\to 6$')],
            correctIndex: 0,
            explanation: say('2 sarrerak bi irteera ditu, 5 eta 7. $1\\to 4,\\ 3\\to 4$ erlazioan irteera bakarrik errepikatzen da, eta hori gerta daiteke.', 'La entrada 2 tiene dos salidas, 5 y 7. En $1\\to 4,\\ 3\\to 4$ solo se repite la salida, y eso sí puede pasar.', 'للمدخل 2 مخرجان، 5 و7. أما في $1\\to 4,\\ 3\\to 4$ فيتكرر المخرج فقط، وهذا ممكن.', 'The input 2 has two outputs, 5 and 7. In $1\\to 4,\\ 3\\to 4$ only the output repeats, and that is allowed.')
        }
    },
    variables: {
        mistake: {
            wrong: say('«Prezioa kiloen arabera» erlazioan, prezioa da aldagai askea.', 'En «el precio según los kilos», el precio es la variable independiente.', 'في «السعر حسب الكيلوغرامات» السعر هو المتغير المستقل.', 'In «the price depending on the kilos», the price is the independent variable.'),
            right: say('Kiloak aukeratzen dira, eta prezioa haietatik ateratzen da: kiloak aldagai askea dira ($x$) eta prezioa menpekoa ($y$).', 'Los kilos se eligen y el precio resulta de ellos: los kilos son la independiente ($x$) y el precio, la dependiente ($y$).', 'نختار الكيلوغرامات وينتج عنها السعر: الكيلوغرامات هي المتغير المستقل ($x$) والسعر هو التابع ($y$).', 'You choose the kilos and the price follows from them: the kilos are the independent variable ($x$) and the price the dependent one ($y$).')
        },
        check: {
            prompt: say('Ur-faktura gastatutako litroen araberakoa da. Zein da aldagai askea?', 'La factura del agua depende de los litros que se gastan. ¿Cuál es la variable independiente?', 'فاتورة الماء تتوقف على عدد اللترات المستهلكة. ما المتغير المستقل؟', 'The water bill depends on the litres used. Which is the independent variable?'),
            options: [
                say('Faktura', 'La factura', 'الفاتورة', 'The bill'),
                say('Gastatutako litroak', 'Los litros gastados', 'اللترات المستهلكة', 'The litres used'),
                say('Biak', 'Las dos', 'كلاهما', 'Both')
            ],
            correctIndex: 1,
            explanation: say('Litroak sartzen dira, eta faktura haietatik ateratzen da: faktura litroen funtzioa da.', 'Los litros entran y la factura resulta de ellos: la factura es función de los litros.', 'اللترات هي المدخل والفاتورة تنتج عنها: الفاتورة دالة في اللترات.', 'The litres go in and the bill comes out of them: the bill is a function of the litres.')
        }
    },
    tables: {
        mistake: {
            wrong: say('$y=-2x+1$, $x=-3$ denean: $y=-2\\cdot 3+1=-5$.', '$y=-2x+1$ para $x=-3$: $y=-2\\cdot 3+1=-5$.', '$y=-2x+1$ عندما $x=-3$: $y=-2\\cdot 3+1=-5$.', '$y=-2x+1$ for $x=-3$: $y=-2\\cdot 3+1=-5$.'),
            right: say('Ordeztu parentesi artean: $y=-2\\cdot(-3)+1=6+1=7$.', 'Sustituye entre paréntesis: $y=-2\\cdot(-3)+1=6+1=7$.', 'عوّض بين قوسين: $y=-2\\cdot(-3)+1=6+1=7$.', 'Substitute in brackets: $y=-2\\cdot(-3)+1=6+1=7$.')
        },
        check: {
            prompt: say('$y=x^{2}-1$ funtzioaren taulan, zer balio doa $x=-2$ balioaren azpian?', 'En la tabla de $y=x^{2}-1$, ¿qué valor va debajo de $x=-2$?', 'في جدول $y=x^{2}-1$، ما القيمة التي توضع تحت $x=-2$؟', 'In the table of $y=x^{2}-1$, which value goes under $x=-2$?'),
            options: [same('$-5$'), same('$-3$'), same('$3$')],
            correctIndex: 2,
            explanation: say('$(-2)^{2}-1=4-1=3$: puntua $(-2,\\,3)$ da. Parentesirik gabe, $-4-1=-5$ aterako litzateke.', '$(-2)^{2}-1=4-1=3$: el punto es $(-2,\\,3)$. Sin paréntesis saldría $-4-1=-5$.', '$(-2)^{2}-1=4-1=3$: النقطة $(-2,\\,3)$. وبلا أقواس يخرج $-4-1=-5$.', '$(-2)^{2}-1=4-1=3$: the point is $(-2,\\,3)$. Without brackets you would get $-4-1=-5$.')
        }
    },
    formula: {
        mistake: {
            wrong: say('$f(2)=7$ esan nahi du $(7,\\,2)$ puntua funtzioarena dela.', '$f(2)=7$ quiere decir que el punto $(7,\\,2)$ es de la función.', '$f(2)=7$ تعني أن النقطة $(7,\\,2)$ من الدالة.', '$f(2)=7$ means that the point $(7,\\,2)$ is on the function.'),
            right: say('Sarrera doa lehenengo: $f(2)=7$ esan nahi du $(2,\\,7)$ puntua funtzioarena dela.', 'La entrada va primero: $f(2)=7$ significa que $(2,\\,7)$ es de la función.', 'المدخل أولًا: $f(2)=7$ تعني أن $(2,\\,7)$ من الدالة.', 'The input comes first: $f(2)=7$ means that $(2,\\,7)$ is on the function.')
        },
        check: {
            prompt: say('$f(x)=3x-5$ bada, zenbat da $f(4)$?', 'Si $f(x)=3x-5$, ¿cuánto vale $f(4)$?', 'إذا كانت $f(x)=3x-5$، فكم تساوي $f(4)$؟', 'If $f(x)=3x-5$, what is $f(4)$?'),
            options: [same('$7$'), same('$3$'), same('$17$')],
            correctIndex: 0,
            explanation: say('Ordeztu $x$ 4 zenbakiaz: $f(4)=3\\cdot 4-5=7$. 3 da $f(x)=4$ ematen duen $x$.', 'Sustituye $x$ por 4: $f(4)=3\\cdot 4-5=7$. El 3 es la $x$ con la que $f(x)=4$.', 'عوّض $x$ بالعدد 4: $f(4)=3\\cdot 4-5=7$. أما 3 فهي قيمة $x$ التي تجعل $f(x)=4$.', 'Replace $x$ with 4: $f(4)=3\\cdot 4-5=7$. 3 is the $x$ that makes $f(x)=4$.')
        }
    },
    plot: {
        mistake: {
            wrong: say('$y=x^{2}$ marrazteko, $(0,\\,0)$ eta $(2,\\,4)$ kalkulatu eta zuzen batekin lotzen ditut.', 'Para dibujar $y=x^{2}$ calculo $(0,\\,0)$ y $(2,\\,4)$ y los uno con una recta.', 'لرسم $y=x^{2}$ أحسب $(0,\\,0)$ و$(2,\\,4)$ وأصلهما بخط مستقيم.', 'To draw $y=x^{2}$ I work out $(0,\\,0)$ and $(2,\\,4)$ and join them with a straight line.'),
            right: say('Bi puntu nahikoak dira zuzenetarako, ez kurbetarako. $x=-2,\\ -1,\\ 0,\\ 1,\\ 2$ balioekin parabola bat dela ikusten da.', 'Dos puntos bastan para las rectas, no para las curvas. Con $x=-2,\\ -1,\\ 0,\\ 1,\\ 2$ se ve que es una parábola.', 'نقطتان تكفيان للمستقيمات لا للمنحنيات. ومع $x=-2,\\ -1,\\ 0,\\ 1,\\ 2$ يتضح أنه قطع مكافئ.', 'Two points are enough for straight lines, not for curves. With $x=-2,\\ -1,\\ 0,\\ 1,\\ 2$ you can see it is a parabola.')
        },
        check: {
            prompt: say('Puntu hauetatik, zein dago $y=x^{2}+1$ funtzioaren grafikoan?', '¿Cuál de estos puntos es de la gráfica de $y=x^{2}+1$?', 'أيّ هذه النقاط تقع على الرسم البياني لـ$y=x^{2}+1$؟', 'Which of these points is on the graph of $y=x^{2}+1$?'),
            options: [same('$(2,\\,4)$'), same('$(-1,\\,2)$'), same('$(1,\\,3)$')],
            correctIndex: 1,
            explanation: say('$(-1)^{2}+1=2$: $(-1,\\,2)$ puntua grafikoan dago. $x=2$ denean $y=5$, eta $x=1$ denean $y=2$.', '$(-1)^{2}+1=2$: el punto $(-1,\\,2)$ es de la gráfica. Con $x=2$ sale $y=5$, y con $x=1$, $y=2$.', '$(-1)^{2}+1=2$: النقطة $(-1,\\,2)$ على الرسم. ومع $x=2$ يخرج $y=5$، ومع $x=1$ يخرج $y=2$.', '$(-1)^{2}+1=2$: the point $(-1,\\,2)$ is on the graph. With $x=2$ you get $y=5$, and with $x=1$, $y=2$.')
        }
    },
    continuity: {
        mistake: {
            wrong: say('Egunero etortzen diren ikasleen kopurua: puntuak marra batekin lotzen ditut.', 'El número de alumnos que vienen cada día: uno los puntos con una línea.', 'عدد التلاميذ الحاضرين كل يوم: أصل النقاط بخط.', 'The number of pupils who come each day: I join the points with a line.'),
            right: say('Ez dago 23,5 ikaslerik: tarteko balioek ez dute zentzurik; beraz, puntuak solte uzten dira. Etena da.', 'No existen 23,5 alumnos: los valores intermedios no tienen sentido, así que los puntos se dejan sueltos. Es discontinua.', 'لا يوجد 23.5 تلميذ: القيم الوسيطة لا معنى لها، فتبقى النقاط منفصلة. إنها متقطعة.', 'There is no such thing as 23.5 pupils: the values in between make no sense, so the points are left apart. It is discontinuous.')
        },
        check: {
            prompt: say('Grafiko hauetatik, zein da jarraitua?', '¿Cuál de estas gráficas es continua?', 'أيّ هذه الرسوم البيانية متصل؟', 'Which of these graphs is continuous?'),
            options: [
                say('Egunero saldutako sarrerak', 'Entradas vendidas cada día', 'التذاكر المبيعة كل يوم', 'Tickets sold each day'),
                say('Ilara bateko pertsonak', 'Personas en una cola', 'الأشخاص في طابور', 'People in a queue'),
                say('Landare baten altuera egunen arabera', 'Altura de una planta según los días', 'طول نبتة حسب الأيام', 'Height of a plant over the days')
            ],
            correctIndex: 2,
            explanation: say('Altuerak tarteko balio guztiak hartzen ditu (12,3 cm, 12,4 cm…): jarraitua. Sarrerak eta pertsonak zenbaki osoak dira.', 'La altura toma todos los valores intermedios (12,3 cm, 12,4 cm…): continua. Entradas y personas son números enteros.', 'الطول يأخذ كل القيم الوسيطة (12.3 سم، 12.4 سم…): متصل. أما التذاكر والأشخاص فأعداد صحيحة.', 'The height takes every value in between (12.3 cm, 12.4 cm…): continuous. Tickets and people are whole numbers.')
        }
    },
    'graph-reading': {
        mistake: {
            wrong: say('$f(5)$ kalkulatzeko, 5 bilatzen dut ardatz bertikalean eta x irakurtzen dut.', 'Para $f(5)$ busco el 5 en el eje vertical y leo la x.', 'لإيجاد $f(5)$ أبحث عن 5 على المحور الرأسي وأقرأ x.', 'For $f(5)$ I look for 5 on the vertical axis and read off x.'),
            right: say('$f(5)$ lortzeko, 5 ardatz horizontalean (X) bilatzen da, kurbaraino igo, eta Y ardatzean irakurtzen da.', 'Para $f(5)$, el 5 se busca en el eje horizontal (X), se sube hasta la curva y se lee en el eje Y.', 'لإيجاد $f(5)$ نبحث عن 5 على المحور الأفقي (X)، ونصعد إلى المنحنى، ونقرأ على المحور Y.', 'For $f(5)$, find 5 on the horizontal axis (X), go up to the curve and read the value on the Y axis.')
        },
        check: {
            prompt: say('Grafiko bat $(2,\\,7)$, $(4,\\,1)$ eta $(7,\\,4)$ puntuetatik pasatzen da. Zenbat da $f(4)$?', 'Una gráfica pasa por los puntos $(2,\\,7)$, $(4,\\,1)$ y $(7,\\,4)$. ¿Cuánto vale $f(4)$?', 'يمر رسم بياني بالنقاط $(2,\\,7)$ و$(4,\\,1)$ و$(7,\\,4)$. كم تساوي $f(4)$؟', 'A graph goes through the points $(2,\\,7)$, $(4,\\,1)$ and $(7,\\,4)$. What is $f(4)$?'),
            options: [same('$1$'), same('$7$'), same('$4$')],
            correctIndex: 0,
            explanation: say('$f(4)$ da $x=4$ duen puntuaren $y$: $(4,\\,1)$; beraz, $f(4)=1$. 7 da $y=4$ duen puntuaren $x$.', '$f(4)$ es la $y$ del punto que tiene $x=4$: $(4,\\,1)$, así que $f(4)=1$. El 7 es la $x$ del punto con $y=4$.', '$f(4)$ هي قيمة $y$ للنقطة التي فيها $x=4$: أي $(4,\\,1)$، إذن $f(4)=1$. أما 7 فهي $x$ النقطة التي فيها $y=4$.', '$f(4)$ is the $y$ of the point with $x=4$: $(4,\\,1)$, so $f(4)=1$. 7 is the $x$ of the point with $y=4$.')
        }
    },
    intercepts: {
        mistake: {
            wrong: say('$y=3x-6$ eta Y ardatzaren ebakidura: $y=0$ egiten dut, eta $(2,\\,0)$ ateratzen da.', 'Corte de $y=3x-6$ con el eje Y: hago $y=0$ y sale $(2,\\,0)$.', 'تقاطع $y=3x-6$ مع المحور Y: أضع $y=0$ فيخرج $(2,\\,0)$.', 'Where $y=3x-6$ crosses the Y axis: I set $y=0$ and get $(2,\\,0)$.'),
            right: say('Y ardatzean $x=0$ betetzen da: $y=-6$, $(0,\\,-6)$ puntua. $(2,\\,0)$ X ardatzarekiko ebakidura da.', 'En el eje Y se cumple $x=0$: $y=-6$, el punto $(0,\\,-6)$. $(2,\\,0)$ es el corte con el eje X.', 'على المحور Y يكون $x=0$: $y=-6$، أي النقطة $(0,\\,-6)$. أما $(2,\\,0)$ فهي التقاطع مع المحور X.', 'On the Y axis $x=0$: $y=-6$, the point $(0,\\,-6)$. $(2,\\,0)$ is where it crosses the X axis.')
        },
        check: {
            prompt: say('Non ebakitzen du $y=-2x+8$ zuzenak X ardatza?', '¿Dónde corta la recta $y=-2x+8$ al eje X?', 'أين يقطع المستقيم $y=-2x+8$ المحور X؟', 'Where does the line $y=-2x+8$ cross the X axis?'),
            options: [same('$(0,\\,8)$'), same('$(4,\\,0)$'), same('$(-4,\\,0)$')],
            correctIndex: 1,
            explanation: say('X ardatzean $y=0$ betetzen da: $0=-2x+8$; beraz, $x=4$ eta puntua $(4,\\,0)$ da. $(0,\\,8)$ Y ardatzarekiko ebakidura da.', 'En el eje X se cumple $y=0$: $0=-2x+8$, así que $x=4$ y el punto es $(4,\\,0)$. $(0,\\,8)$ es el corte con el eje Y.', 'على المحور X يكون $y=0$: $0=-2x+8$، إذن $x=4$ والنقطة $(4,\\,0)$. أما $(0,\\,8)$ فهي التقاطع مع المحور Y.', 'On the X axis $y=0$: $0=-2x+8$, so $x=4$ and the point is $(4,\\,0)$. $(0,\\,8)$ is where it crosses the Y axis.')
        }
    },
    variation: {
        mistake: {
            wrong: say('Funtzioa $y=1$ baliotik $y=6$ baliora igotzen da: gorakorra da $(1,\\,6)$ tartean.', 'La función sube desde $y=1$ hasta $y=6$: es creciente en $(1,\\,6)$.', 'الدالة تصعد من $y=1$ إلى $y=6$: إذن هي متزايدة في $(1,\\,6)$.', 'The function goes up from $y=1$ to $y=6$: it is increasing on $(1,\\,6)$.'),
            right: say('Tarteak $x$-ren balioekin ematen dira, ez $y$-renekin: $x=0$ eta $x=3$ artean igotzen bada, gorakorra da $(0,\\,3)$ tartean.', 'Los tramos se dan con valores de $x$, no de $y$: si sube entre $x=0$ y $x=3$, es creciente en $(0,\\,3)$.', 'تُعطى الفترات بقيم $x$ لا $y$: إذا صعدت بين $x=0$ و$x=3$ فهي متزايدة في $(0,\\,3)$.', 'Intervals are given with values of $x$, not $y$: if it rises between $x=0$ and $x=3$, it is increasing on $(0,\\,3)$.')
        },
        check: {
            prompt: say('Funtzio batek 2 balio du $x=0$ denean, 6 $x=3$ denean, 6 $x=5$ denean eta 1 $x=8$ denean, eta puntu horien artean zuzen doa. Zein tartetan da beherakorra?', 'Una función vale 2 en $x=0$, 6 en $x=3$, 6 en $x=5$ y 1 en $x=8$, y entre esos puntos va en línea recta. ¿En qué intervalo es decreciente?', 'دالة قيمتها 2 عند $x=0$ و6 عند $x=3$ و6 عند $x=5$ و1 عند $x=8$، وتسير بخط مستقيم بين هذه النقاط. في أيّ فترة تكون متناقصة؟', 'A function is 2 at $x=0$, 6 at $x=3$, 6 at $x=5$ and 1 at $x=8$, and goes in a straight line between those points. On which interval is it decreasing?'),
            options: [same('$(0,\\,3)$'), same('$(6,\\,1)$'), same('$(5,\\,8)$')],
            correctIndex: 2,
            explanation: say('$x=5$ eta $x=8$ artean $y$ 6 baliotik 1 baliora jaisten da: beherakorra $(5,\\,8)$ tartean. 3 eta 5 artean konstantea da, eta 0 eta 3 artean gorakorra.', 'Entre $x=5$ y $x=8$ la $y$ baja de 6 a 1: decreciente en $(5,\\,8)$. Entre 3 y 5 es constante, y entre 0 y 3, creciente.', 'بين $x=5$ و$x=8$ تنزل $y$ من 6 إلى 1: متناقصة في $(5,\\,8)$. وبين 3 و5 ثابتة، وبين 0 و3 متزايدة.', 'Between $x=5$ and $x=8$, $y$ drops from 6 to 1: decreasing on $(5,\\,8)$. Between 3 and 5 it is constant, and between 0 and 3, increasing.')
        }
    },
    extremes: {
        mistake: {
            wrong: say('Maximoa 9 da.', 'El máximo es 9.', 'القيمة العظمى هي 9.', 'The maximum is 9.'),
            right: say('Mutur bat puntu oso bat da: $x=4$ puntuan badago eta 9 balio badu, maximoa $(4,\\,9)$ da.', 'Un extremo es un punto completo: si está en $x=4$ y vale 9, el máximo es $(4,\\,9)$.', 'القيمة القصوى نقطة كاملة: إذا كانت عند $x=4$ وقيمتها 9، فالقيمة العظمى $(4,\\,9)$.', 'An extreme is a whole point: if it is at $x=4$ and its value is 9, the maximum is $(4,\\,9)$.')
        },
        check: {
            prompt: say('Funtzio bat $(2,\\,5)$ punturaino hazten da, $(6,\\,-1)$ punturaino txikitzen da, eta berriro hazten da $(9,\\,3)$ punturaino, non amaitzen den. Zein da haren minimoa?', 'Una función crece hasta $(2,\\,5)$, decrece hasta $(6,\\,-1)$ y vuelve a crecer hasta $(9,\\,3)$, donde termina. ¿Cuál es su mínimo?', 'دالة تتزايد حتى $(2,\\,5)$، ثم تتناقص حتى $(6,\\,-1)$، ثم تتزايد من جديد حتى $(9,\\,3)$ حيث تنتهي. ما قيمتها الصغرى؟', 'A function rises to $(2,\\,5)$, falls to $(6,\\,-1)$ and rises again to $(9,\\,3)$, where it ends. What is its minimum?'),
            options: [same('$(6,\\,-1)$'), same('$-1$'), same('$(2,\\,5)$')],
            correctIndex: 0,
            explanation: say('$(6,\\,-1)$ puntuan beherakorretik gorakorrera pasatzen da: minimoa da, eta puntu osoa idazten da. $(2,\\,5)$ maximoa da.', 'En $(6,\\,-1)$ pasa de decreciente a creciente: es un mínimo, y se escribe el punto completo. $(2,\\,5)$ es un máximo.', 'عند $(6,\\,-1)$ تنتقل من التناقص إلى التزايد: إنها قيمة صغرى، وتُكتب النقطة كاملة. أما $(2,\\,5)$ فقيمة عظمى.', 'At $(6,\\,-1)$ it goes from falling to rising: it is a minimum, and you write the whole point. $(2,\\,5)$ is a maximum.')
        }
    },
    'direct-proportion': {
        mistake: {
            wrong: say('Taxi batek 3 € kobratzen ditu hasieran eta 1 € kilometroko: $y=x+3$ proportzionaltasun zuzenekoa da.', 'Un taxi cobra 3 € de bajada y 1 € por km: $y=x+3$ es de proporcionalidad directa.', 'سيارة أجرة تأخذ 3 يورو عند الركوب و1 يورو لكل كم: $y=x+3$ تناسب طردي.', 'A taxi charges €3 to start and €1 per km: $y=x+3$ is direct proportion.'),
            right: say('Ez da jatorritik pasatzen: 0 km eginda ere 3 € ordaintzen dira. $\\frac{y}{x}$ zatidura ez da konstantea ($\\frac{4}{1}\\neq\\frac{5}{2}$).', 'No pasa por el origen: con 0 km ya se pagan 3 €. El cociente $\\frac{y}{x}$ no es constante ($\\frac{4}{1}\\neq\\frac{5}{2}$).', 'لا يمر بنقطة الأصل: مع 0 كم ندفع 3 يورو. وحاصل القسمة $\\frac{y}{x}$ ليس ثابتًا ($\\frac{4}{1}\\neq\\frac{5}{2}$).', 'It does not go through the origin: with 0 km you already pay €3. The quotient $\\frac{y}{x}$ is not constant ($\\frac{4}{1}\\neq\\frac{5}{2}$).')
        },
        check: {
            prompt: say('Zein puntu-zerrenda da proportzionaltasun zuzenekoa?', '¿Qué lista de puntos es de proporcionalidad directa?', 'أيّ قائمة نقاط تمثّل تناسبًا طرديًا؟', 'Which list of points shows direct proportion?'),
            options: [same('$(1,\\,4),\\ (2,\\,6),\\ (3,\\,8)$'), same('$(1,\\,3),\\ (2,\\,6),\\ (4,\\,12)$'), same('$(2,\\,1),\\ (4,\\,3),\\ (6,\\,5)$')],
            correctIndex: 1,
            explanation: say('$\\frac{3}{1}=\\frac{6}{2}=\\frac{12}{4}=3$: $y=3x$. Lehenengoan $\\frac{4}{1}\\neq\\frac{6}{2}$: hazi egiten da, baina ez proportzio berean.', '$\\frac{3}{1}=\\frac{6}{2}=\\frac{12}{4}=3$: $y=3x$. En la primera, $\\frac{4}{1}\\neq\\frac{6}{2}$: también crece, pero no en la misma proporción.', '$\\frac{3}{1}=\\frac{6}{2}=\\frac{12}{4}=3$: $y=3x$. وفي الأولى $\\frac{4}{1}\\neq\\frac{6}{2}$: تتزايد هي أيضًا لكن ليس بالنسبة نفسها.', '$\\frac{3}{1}=\\frac{6}{2}=\\frac{12}{4}=3$: $y=3x$. In the first one, $\\frac{4}{1}\\neq\\frac{6}{2}$: it grows too, but not in the same proportion.')
        }
    },
    slope: {
        mistake: {
            wrong: say('$A(1,\\,5)$ eta $B(3,\\,1)$ puntuekin: $m=\\dfrac{1-5}{1-3}=2$.', 'Con $A(1,\\,5)$ y $B(3,\\,1)$: $m=\\dfrac{1-5}{1-3}=2$.', 'مع $A(1,\\,5)$ و$B(3,\\,1)$: $m=\\dfrac{1-5}{1-3}=2$.', 'With $A(1,\\,5)$ and $B(3,\\,1)$: $m=\\dfrac{1-5}{1-3}=2$.'),
            right: say('Bi kenketak ordena berean: $m=\\dfrac{1-5}{3-1}=\\dfrac{-4}{2}=-2$.', 'Las dos restas en el mismo orden: $m=\\dfrac{1-5}{3-1}=\\dfrac{-4}{2}=-2$.', 'الطرحان بالترتيب نفسه: $m=\\dfrac{1-5}{3-1}=\\dfrac{-4}{2}=-2$.', 'Both subtractions in the same order: $m=\\dfrac{1-5}{3-1}=\\dfrac{-4}{2}=-2$.')
        },
        check: {
            prompt: say('Zein da $A(2,\\,1)$ eta $B(5,\\,10)$ puntuetatik pasatzen den zuzenaren malda?', '¿Cuál es la pendiente de la recta que pasa por $A(2,\\,1)$ y $B(5,\\,10)$?', 'ما ميل المستقيم المار بالنقطتين $A(2,\\,1)$ و$B(5,\\,10)$؟', 'What is the slope of the line through $A(2,\\,1)$ and $B(5,\\,10)$?'),
            options: [same('$\\frac{1}{3}$'), same('$-3$'), same('$3$')],
            correctIndex: 2,
            explanation: say('$m=\\dfrac{10-1}{5-2}=\\dfrac{9}{3}=3$. $x$-ren aldaketa goian jarrita, $\\frac{1}{3}$ aterako litzateke.', '$m=\\dfrac{10-1}{5-2}=\\dfrac{9}{3}=3$. Con el cambio de $x$ arriba saldría $\\frac{1}{3}$.', '$m=\\dfrac{10-1}{5-2}=\\dfrac{9}{3}=3$. ولو وضعنا تغيّر $x$ في الأعلى لخرج $\\frac{1}{3}$.', '$m=\\dfrac{10-1}{5-2}=\\dfrac{9}{3}=3$. With the change in $x$ on top you would get $\\frac{1}{3}$.')
        }
    },
    'slope-sign': {
        mistake: {
            wrong: say('$y=-4x$ zuzena $y=2x$ baino gutxiago makurtuta dago, $-4<2$ delako.', '$y=-4x$ es menos inclinada que $y=2x$, porque $-4<2$.', '$y=-4x$ أقل انحدارًا من $y=2x$ لأن $-4<2$.', '$y=-4x$ is less steep than $y=2x$, because $-4<2$.'),
            right: say('Aldapa balio absolutuak ematen du: $|-4|=4>2$. $y=-4x$ makurtuagoa da, baina beherakorra.', 'La inclinación la da el valor absoluto: $|-4|=4>2$. $y=-4x$ es más inclinada, pero decreciente.', 'الانحدار تحدده القيمة المطلقة: $|-4|=4>2$. إذن $y=-4x$ أكثر انحدارًا لكنها متناقصة.', 'The steepness comes from the absolute value: $|-4|=4>2$. $y=-4x$ is steeper, but decreasing.')
        },
        check: {
            prompt: say('Zuzen hauetatik, zein da beherakorra eta makurtuena?', '¿Cuál de estas rectas es decreciente y la más inclinada?', 'أيّ هذه المستقيمات متناقص والأكثر انحدارًا؟', 'Which of these lines is decreasing and the steepest?'),
            options: [same('$y=-3x+1$'), same('$y=-\\frac{1}{2}x$'), same('$y=5x$')],
            correctIndex: 0,
            explanation: say('$m=-3$: negatiboa (beherakorra), eta $|m|=3$, $\\frac{1}{2}$ baino gehiago. $y=5x$ makurtuagoa da, baina gorakorra.', '$m=-3$: negativa (decreciente) y con $|m|=3$, más que $\\frac{1}{2}$. $y=5x$ es más inclinada, pero creciente.', '$m=-3$: سالب (متناقص) و$|m|=3$ أكبر من $\\frac{1}{2}$. أما $y=5x$ فأكثر انحدارًا لكنها متزايدة.', '$m=-3$: negative (decreasing) and $|m|=3$, more than $\\frac{1}{2}$. $y=5x$ is steeper, but increasing.')
        }
    },
    affine: {
        mistake: {
            wrong: say('$y=4x-3$ zuzenak Y ardatza $(0,\\,4)$ puntuan ebakitzen du.', 'En $y=4x-3$, la recta corta al eje Y en $(0,\\,4)$.', 'في $y=4x-3$ يقطع المستقيم المحور Y في $(0,\\,4)$.', 'In $y=4x-3$, the line crosses the Y axis at $(0,\\,4)$.'),
            right: say('Y ardatzarekiko ebakidura $n$ da: $(0,\\,-3)$. 4 malda da.', 'El corte con el eje Y es $n$: $(0,\\,-3)$. El 4 es la pendiente.', 'التقاطع مع المحور Y هو $n$: $(0,\\,-3)$. أما 4 فهو الميل.', 'The Y-axis crossing is $n$: $(0,\\,-3)$. The 4 is the slope.')
        },
        check: {
            prompt: say('Gimnasio batek 25 € kobratzen ditu izena ematean eta 30 € hilean. Zein funtziok ematen du $x$ hilabetetan ordaintzen dena?', 'Un gimnasio cobra 25 € de matrícula y 30 € al mes. ¿Qué función da lo que se paga en $x$ meses?', 'نادٍ رياضي يأخذ 25 يورو رسم تسجيل و30 يورو شهريًا. أيّ دالة تعطي ما يُدفع في $x$ شهرًا؟', 'A gym charges €25 to join and €30 a month. Which function gives what you pay in $x$ months?'),
            options: [same('$y=25x+30$'), same('$y=30x+25$'), same('$y=55x$')],
            correctIndex: 1,
            explanation: say('$n=25$ hasieran ordaintzen dena da ($x=0$), eta $m=30$ hilero gehitzen dena: $y=30x+25$.', '$n=25$ es lo que se paga al empezar ($x=0$) y $m=30$, lo que se suma cada mes: $y=30x+25$.', '$n=25$ هو ما يُدفع في البداية ($x=0$) و$m=30$ ما يُضاف كل شهر: $y=30x+25$.', '$n=25$ is what you pay at the start ($x=0$) and $m=30$ is what is added each month: $y=30x+25$.')
        }
    },
    constant: {
        mistake: {
            wrong: say('$x=3$ funtzio konstante bat da.', '$x=3$ es una función constante.', '$x=3$ دالة ثابتة.', '$x=3$ is a constant function.'),
            right: say('$x=3$ zuzen bertikal bat da: $x=3$ denean infinitu $y$ daude; beraz, ez da funtzioa. Konstanteak horizontalak dira: $y=3$.', '$x=3$ es una recta vertical: para $x=3$ hay infinitas $y$, así que no es función. Las constantes son horizontales: $y=3$.', '$x=3$ مستقيم رأسي: عند $x=3$ توجد قيم لا نهائية لـ$y$، فهو ليس دالة. الدوال الثابتة أفقية: $y=3$.', '$x=3$ is a vertical line: for $x=3$ there are infinitely many $y$, so it is not a function. Constant functions are horizontal: $y=3$.')
        },
        check: {
            prompt: say('$y=-2$ funtzioan, zenbat da $y$, $x=7$ denean?', 'En la función $y=-2$, ¿cuánto vale $y$ cuando $x=7$?', 'في الدالة $y=-2$، كم تساوي $y$ عندما $x=7$؟', 'In the function $y=-2$, what is $y$ when $x=7$?'),
            options: [same('$-14$'), same('$7$'), same('$-2$')],
            correctIndex: 2,
            explanation: say('$y=-2$ funtzioan emaitza beti $-2$ da, $x$ edozein dela ere: haren grafikoa horizontala da.', 'En $y=-2$ el resultado es siempre $-2$, sea cual sea $x$: su gráfica es horizontal.', 'في $y=-2$ تكون النتيجة دائمًا $-2$ مهما كانت $x$: رسمها أفقي.', 'In $y=-2$ the result is always $-2$, whatever $x$ is: its graph is horizontal.')
        }
    },
    'line-equation': {
        mistake: {
            wrong: say('$A(2,\\,5)$ eta $B(4,\\,9)$ puntuetatik pasatzen den zuzena: $m=2$ eta $n=5$.', 'Recta por $A(2,\\,5)$ y $B(4,\\,9)$: $m=2$ y $n=5$.', 'المستقيم المار بـ$A(2,\\,5)$ و$B(4,\\,9)$: $m=2$ و$n=5$.', 'Line through $A(2,\\,5)$ and $B(4,\\,9)$: $m=2$ and $n=5$.'),
            right: say('$n$ da $x=0$ denean dagoen balioa, eta $A$ puntuak ez du $x=0$. Ordeztu: $5=2\\cdot 2+n$; beraz, $n=1$ eta $y=2x+1$.', '$n$ es el valor en $x=0$, y $A$ no tiene $x=0$. Sustituye: $5=2\\cdot 2+n$, así que $n=1$ e $y=2x+1$.', '$n$ هي القيمة عند $x=0$، والنقطة $A$ ليست عند $x=0$. عوّض: $5=2\\cdot 2+n$، إذن $n=1$ و$y=2x+1$.', '$n$ is the value at $x=0$, and $A$ does not have $x=0$. Substitute: $5=2\\cdot 2+n$, so $n=1$ and $y=2x+1$.')
        },
        check: {
            prompt: say('Zein da $A(0,\\,-2)$ eta $B(2,\\,4)$ puntuetatik pasatzen den zuzenaren ekuazioa?', '¿Cuál es la ecuación de la recta que pasa por $A(0,\\,-2)$ y $B(2,\\,4)$?', 'ما معادلة المستقيم المار بالنقطتين $A(0,\\,-2)$ و$B(2,\\,4)$؟', 'What is the equation of the line through $A(0,\\,-2)$ and $B(2,\\,4)$?'),
            options: [same('$y=3x-2$'), same('$y=-2x+3$'), same('$y=3x+4$')],
            correctIndex: 0,
            explanation: say('$n=-2$, $A$ Y ardatzean dagoelako. $m=\\dfrac{4-(-2)}{2-0}=3$. Egiaztatu $B$ puntuarekin: $3\\cdot 2-2=4$.', '$n=-2$, porque $A$ está en el eje Y. $m=\\dfrac{4-(-2)}{2-0}=3$. Comprueba con $B$: $3\\cdot 2-2=4$.', '$n=-2$ لأن $A$ على المحور Y. $m=\\dfrac{4-(-2)}{2-0}=3$. تحقّق بالنقطة $B$: $3\\cdot 2-2=4$.', '$n=-2$, because $A$ is on the Y axis. $m=\\dfrac{4-(-2)}{2-0}=3$. Check with $B$: $3\\cdot 2-2=4$.')
        }
    }
}
