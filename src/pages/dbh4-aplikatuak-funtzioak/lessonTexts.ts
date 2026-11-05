import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { FunctionsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Funtzioak · 4. DBH aplikatuak — what each lesson tells: the new words
   (definitions), a short explanation, its cases and the example as an
   exercise («Another example»; the ones about reading a graph have no
   formula and answer in words), with the key words in four languages and,
   in three lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics. The cases keep what the
   drawings show: f(−2) = 1 in f(x) = x² − 3, Dom f = [−4, 5], the cuts of
   y = x² − 2x − 3, the intervals around −2 and 2, the maxima (2, 5) and
   (6, 4), the T.V.M. of x² − 4x + 5 on [1, 4], the cistern of T = 2, the
   glucose curve, the study graph and the box of 40 × 30 cm.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const functionsLessonTexts: Record<FunctionsTopicId, LessonTexts> = {
    /* ---------- 1. Concept ---------- */
    'what-is': {
        definitions: [
            {
                term: say('Funtzioa', 'Función', 'الدالة', 'Function'),
                meaning: say('Bi magnituderen arteko erlazioa, non $x$ balio bakoitzari (aldagai askea) $y$ balio bakar bat dagokion (menpeko aldagaia).', 'Relación entre dos magnitudes en la que a cada valor de $x$ (variable independiente) le corresponde un único valor de $y$ (variable dependiente).', 'علاقة بين مقدارين يقابل فيها كلَّ قيمة لـ$x$ (المتغير المستقل) قيمةٌ واحدة لـ$y$ (المتغير التابع).', 'A relation between two quantities in which each value of $x$ (independent variable) has exactly one value of $y$ (dependent variable).')
            }
        ],
        vocabulary: [
            say('aldagai askea', 'variable independiente', 'المتغير المستقل', 'independent variable'),
            say('menpeko aldagaia', 'variable dependiente', 'المتغير التابع', 'dependent variable'),
            say('zuzen bertikala', 'recta vertical', 'مستقيم عمودي', 'vertical line')
        ],
        explanation: say(
            '$y=f(x)$ idazten da. Boligrafo kopurua eta haien prezioa funtzioa da: kopuru bakoitzak prezio bakarra du. Zenbaki bakoitzari haren erro karratuak ematea ez da: 9 zenbakiari 3 eta $-3$ dagozkio. Grafiko batean, edozein zuzen bertikalek gehienez behin mozten du.',
            'Se escribe $y=f(x)$. El número de bolis y su precio es función: cada cantidad tiene un único precio. Asignar a cada número sus raíces cuadradas no lo es: al 9 le corresponden 3 y $-3$. En una gráfica, cualquier recta vertical la corta como mucho una vez.',
            'وتُكتب $y=f(x)$. عدد الأقلام وثمنها دالة: لكل كمية ثمن واحد. أما إسناد جذريه التربيعيين إلى كل عدد فليس دالة: للعدد 9 يقابل 3 و$-3$. وفي الرسم يقطعه أي مستقيم عمودي مرة واحدة على الأكثر.',
            'It is written $y=f(x)$. The number of pens and their price is a function: each amount has one price. Giving each number its square roots is not: 9 goes to 3 and $-3$. On a graph, any vertical line crosses it at most once.'
        ),
        why: {
            text: say(
                'Zuzen bertikal batek $x$ bera duten puntu guztiak ditu. Grafikoa bi aldiz mozten badu, $x$ horrek bi $y$ ditu, eta funtzio batean hori ezin da gertatu.',
                'Una recta vertical recoge todos los puntos con la misma $x$. Si corta la gráfica dos veces, esa $x$ tiene dos $y$, y en una función eso no puede pasar.',
                'المستقيم العمودي يضم كل النقاط التي لها $x$ نفسها. فإذا قطع الرسم مرتين كان لتلك $x$ قيمتان لـ$y$، وهذا لا يحدث في الدالة.',
                'A vertical line holds every point with the same $x$. If it crosses the graph twice, that $x$ has two values of $y$, and in a function that cannot happen.'
            )
        },
        examplePrompt: say('Funtzioa al da ikasle bakoitzari bere jaiotze-data ematen dion erlazioa? Eta data bakoitzari egun horretan jaiotako ikasleak ematen dizkiona?', '¿Es función la relación que da a cada alumno su fecha de nacimiento? ¿Y la que da a cada fecha los alumnos que nacieron ese día?', 'هل العلاقة التي تعطي كل تلميذ تاريخ ميلاده دالة؟ وهل العلاقة التي تعطي كل تاريخ التلاميذ المولودين فيه دالة؟', 'Is the relation that gives each student their date of birth a function? And the one that gives each date the students born that day?'),
        example: '',
        exampleAnswer: say('Lehena bai: ikasle bakoitzak data bakarra du. Bigarrena ez: data batek ikasle bat baino gehiago izan ditzake.', 'La primera sí: cada alumno tiene una sola fecha. La segunda no: una fecha puede tener varios alumnos.', 'الأولى نعم: لكل تلميذ تاريخ واحد. والثانية لا: قد يكون لتاريخ واحد عدة تلاميذ.', 'The first one is: each student has one date. The second is not: one date can have several students.')
    },
    expressions: {
        vocabulary: [
            say('balio-taula', 'tabla de valores', 'جدول قيم', 'table of values'),
            say('formula', 'fórmula', 'الصيغة', 'formula'),
            say('enuntziatua', 'enunciado', 'النص', 'statement')
        ],
        explanation: say(
            'Funtzio bat lau eratara eman daiteke, eta batetik bestera pasatzen da: enuntziatutik formulara, zer den $x$ eta zer den $y$ aukeratuz; formulatik taulara, $x$ balioak ordeztuz; taulatik grafikora, puntuak kokatuz.',
            'Una función se puede dar de cuatro formas, y se pasa de una a otra: del enunciado a la fórmula, eligiendo qué es $x$ y qué es $y$; de la fórmula a la tabla, sustituyendo valores de $x$; de la tabla a la gráfica, situando los puntos.',
            'يمكن إعطاء الدالة بأربع طرق، وننتقل من واحدة إلى أخرى: من النص إلى الصيغة باختيار ما هو $x$ وما هو $y$؛ ومن الصيغة إلى الجدول بتعويض قيم $x$؛ ومن الجدول إلى الرسم بتعيين النقاط.',
            'A function can be given in four ways, and you go from one to another: from the statement to the formula, choosing what $x$ and $y$ are; from the formula to the table, putting in values of $x$; from the table to the graph, plotting the points.'
        ),
        cases: [
            { title: say('Enuntziatua', 'Enunciado', 'النص', 'Statement'), text: say('Taxi batek $2{,}20$ € kobratzen ditu igotzean eta $0{,}95$ € minutuko.', 'Un taxi cobra $2{,}20$ € al subir y $0{,}95$ € por minuto.', 'تأخذ سيارة أجرة $2{,}20$ € عند الركوب و$0{,}95$ € لكل دقيقة.', 'A taxi charges €$2{,}20$ to get in and €$0{,}95$ a minute.') },
            { title: say('Formula', 'Fórmula', 'الصيغة', 'Formula'), text: say('Kalkulatzeko araua.', 'La regla para calcular.', 'قاعدة الحساب.', 'The rule to work it out.'), math: same('$y=0{,}95x+2{,}2$') },
            { title: say('Taula', 'Tabla', 'الجدول', 'Table'), text: say('Bikote batzuk, ez denak.', 'Algunas parejas, no todas.', 'بعض الأزواج لا كلها.', 'Some pairs, not all of them.'), math: same('$x=10\\ \\to\\ y=11{,}7$') },
            { title: say('Grafikoa', 'Gráfica', 'الرسم', 'Graph'), text: say('Puntuak lotzen dira magnitudeak jarraituak badira.', 'Los puntos se unen si las magnitudes son continuas.', 'نصل النقاط إذا كانت المقادير متصلة.', 'The points are joined if the quantities are continuous.') }
        ],
        examplePrompt: say('20 cm-ko kandela bat 2 cm gastatzen da orduko. Idatzi formula eta altuera 3 orduren buruan.', 'Una vela de 20 cm se gasta 2 cm cada hora. Escribe la fórmula y la altura a las 3 horas.', 'شمعة طولها 20 سم تذوب 2 سم كل ساعة. اكتب الصيغة والطول بعد 3 ساعات.', 'A 20 cm candle burns 2 cm an hour. Write the formula and its height after 3 hours.'),
        example: same('$\\begin{gathered}y=20-2x\\\\ y=20-2\\cdot 3=14\\end{gathered}$'),
        exampleAnswer: say('3 orduren buruan 14 cm ditu.', 'A las 3 horas mide 14 cm.', 'بعد 3 ساعات يصير طولها 14 سم.', 'After 3 hours it is 14 cm tall.')
    },
    evaluate: {
        definitions: [
            {
                term: say('Irudia', 'Imagen', 'الصورة', 'Image'),
                meaning: say('$x$ balio bati dagokion $y$ balioa: $a$ zenbakiaren irudia $f(a)$ da.', 'El valor de $y$ que corresponde a un valor de $x$: la imagen de $a$ es $f(a)$.', 'قيمة $y$ المقابلة لقيمة $x$: صورة $a$ هي $f(a)$.', 'The value of $y$ that goes with a value of $x$: the image of $a$ is $f(a)$.')
            }
        ],
        vocabulary: [
            say('ordeztu', 'sustituir', 'عوّض', 'substitute'),
            say('parentesia', 'paréntesis', 'قوسين', 'brackets'),
            say('puntua', 'punto', 'النقطة', 'point')
        ],
        explanation: say(
            '$f(a)$ kalkulatzeko, $x$ letraren ordez $a$ jartzen da, beti parentesi artean. $(a,\\,b)$ puntua grafikoan dago $f(a)=b$ bada. Alderantziz, $f(x)=b$ ebatziz aurkitzen dira irudi hori duten $x$ balioak.',
            'Para calcular $f(a)$ se pone $a$ en lugar de $x$, siempre entre paréntesis. El punto $(a,\\,b)$ está en la gráfica si $f(a)=b$. Al revés, resolviendo $f(x)=b$ se encuentran las $x$ que tienen esa imagen.',
            'لحساب $f(a)$ نضع $a$ مكان $x$، دائمًا بين قوسين. وتقع النقطة $(a,\\,b)$ على الرسم إذا كان $f(a)=b$. وبالعكس، بحل $f(x)=b$ نجد قيم $x$ التي لها تلك الصورة.',
            'To work out $f(a)$, put $a$ in place of $x$, always in brackets. The point $(a,\\,b)$ is on the graph if $f(a)=b$. The other way round, solving $f(x)=b$ finds the values of $x$ with that image.'
        ),
        cases: [
            { title: say('Marrazkikoa', 'La del dibujo', 'دالة الرسم', 'The one in the drawing'), text: say('$f(x)=x^{2}-3$ funtzioan:', 'En $f(x)=x^{2}-3$:', 'في $f(x)=x^{2}-3$:', 'In $f(x)=x^{2}-3$:'), math: same('$f(-2)=(-2)^{2}-3=1$') },
            { title: say('Puntu bat', 'Un punto', 'نقطة', 'A point'), text: say('$(3,\\,6)$ grafikoan dago, $f(3)=6$ delako; $(1,\\,1)$ ez.', '$(3,\\,6)$ está en la gráfica, porque $f(3)=6$; $(1,\\,1)$ no.', '$(3,\\,6)$ على الرسم لأن $f(3)=6$؛ أما $(1,\\,1)$ فلا.', '$(3,\\,6)$ is on the graph, because $f(3)=6$; $(1,\\,1)$ is not.') }
        ],
        examplePrompt: say('$g(x)=3x^{2}-2x$ bada, kalkulatu $g(-1)$. $(2,\\,8)$ grafikoan al dago?', 'Si $g(x)=3x^{2}-2x$, calcula $g(-1)$. ¿Está $(2,\\,8)$ en la gráfica?', 'إذا كان $g(x)=3x^{2}-2x$ فاحسب $g(-1)$. هل $(2,\\,8)$ على الرسم؟', 'If $g(x)=3x^{2}-2x$, work out $g(-1)$. Is $(2,\\,8)$ on the graph?'),
        example: same('$\\begin{gathered}g(-1)=3+2=5\\\\ g(2)=12-4=8\\end{gathered}$'),
        exampleAnswer: say('$g(-1)=5$, eta bai: $g(2)=8$.', '$g(-1)=5$, y sí: $g(2)=8$.', '$g(-1)=5$، ونعم: $g(2)=8$.', '$g(-1)=5$, and yes: $g(2)=8$.')
    },
    /* ---------- 2. Domain ---------- */
    'domain-graph': {
        definitions: [
            {
                term: say('Izate-eremua', 'Dominio', 'المجال', 'Domain'),
                meaning: say('Irudia duten $x$ balioak: grafikoak X ardatzean estaltzen duena.', 'Los valores de $x$ que tienen imagen: lo que cubre la gráfica sobre el eje X.', 'قيم $x$ التي لها صورة: ما يغطيه الرسم على محور X.', 'The values of $x$ that have an image: what the graph covers on the X axis.')
            },
            {
                term: say('Ibiltartea', 'Recorrido', 'المدى', 'Range'),
                meaning: say('Funtzioak hartzen dituen $y$ balioak: grafikoak Y ardatzean estaltzen duena.', 'Los valores de $y$ que toma la función: lo que cubre la gráfica sobre el eje Y.', 'قيم $y$ التي تأخذها الدالة: ما يغطيه الرسم على محور Y.', 'The values of $y$ the function takes: what the graph covers on the Y axis.')
            }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'فترة', 'interval'),
            say('ardatza', 'eje', 'محور', 'axis'),
            say('muturra', 'extremo', 'الطرف', 'endpoint')
        ],
        explanation: say(
            'Tarte gisa idazten dira: kortxetea muturra barne badago (puntu betea) eta parentesia ez badago (puntu hutsa); infinitua, beti parentesiarekin. Marrazkian, grafikoa $x=-4$ puntutik $x=5$ puntura doa, eta $y=-2$ eta $y=4$ artean mugitzen da.',
            'Se escriben como intervalos: corchete si el extremo está incluido (punto relleno) y paréntesis si no (punto hueco); el infinito, siempre con paréntesis. En el dibujo, la gráfica va de $x=-4$ a $x=5$ y se mueve entre $y=-2$ e $y=4$.',
            'تُكتب على صورة فترات: قوس معقوف إذا كان الطرف داخلًا (نقطة ممتلئة) وقوس عادي إذا لم يكن (نقطة فارغة)؛ واللانهاية دائمًا بقوس عادي. في الرسم يمتد المنحنى من $x=-4$ إلى $x=5$ ويتحرك بين $y=-2$ و$y=4$.',
            'They are written as intervals: a square bracket if the endpoint is included (filled dot) and a round one if not (open dot); infinity always with a round bracket. In the drawing, the graph goes from $x=-4$ to $x=5$ and moves between $y=-2$ and $y=4$.'
        ),
        cases: [
            { title: say('Izate-eremua', 'Dominio', 'المجال', 'Domain'), text: say('X ardatzean.', 'En el eje X.', 'على محور X.', 'On the X axis.'), math: same('$\\mathrm{Dom}\\,f=[-4,\\,5]$') },
            { title: say('Ibiltartea', 'Recorrido', 'المدى', 'Range'), text: say('Y ardatzean.', 'En el eje Y.', 'على محور Y.', 'On the Y axis.'), math: same('$\\mathrm{Rec}\\,f=[-2,\\,4]$') }
        ],
        examplePrompt: say('Grafiko bat $(-1,\\,3)$ puntu betean hasten da, $(2,\\,-1)$ puntura jaisten da, eta eskuinera gelditu gabe igotzen da. Izate-eremua eta ibiltartea?', 'Una gráfica empieza en $(-1,\\,3)$ con un punto relleno, baja hasta $(2,\\,-1)$ y sube sin parar hacia la derecha. ¿Dominio y recorrido?', 'رسم يبدأ عند $(-1,\\,3)$ بنقطة ممتلئة، وينزل إلى $(2,\\,-1)$، ثم يصعد دون توقف نحو اليمين. ما المجال والمدى؟', 'A graph starts at $(-1,\\,3)$ with a filled dot, falls to $(2,\\,-1)$ and rises without stopping to the right. Domain and range?'),
        example: same('$\\begin{gathered}\\mathrm{Dom}\\,f=[-1,\\,+\\infty)\\\\ \\mathrm{Rec}\\,f=[-1,\\,+\\infty)\\end{gathered}$'),
        exampleAnswer: say('Izate-eremua $-1$ zenbakian hasten da (barne), eta ibiltartea minimoan, $-1$ zenbakian.', 'El dominio empieza en $-1$ (incluido) y el recorrido, en el mínimo, $-1$.', 'يبدأ المجال عند $-1$ (داخل)، ويبدأ المدى عند القيمة الصغرى $-1$.', 'The domain starts at $-1$ (included) and the range at the minimum, $-1$.')
    },
    'domain-formula': {
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand'),
            say('polinomioa', 'polinomio', 'كثير الحدود', 'polynomial')
        ],
        explanation: say(
            'Formula batekin, izate-eremua $x$ guztiak dira, kalkulatu ezin direnak izan ezik. Problema batean, gainera, zentzua duten balioek bakarrik balio dute: alde batek ezin du negatiboa izan.',
            'Con una fórmula, el dominio son todas las $x$ menos las que no se pueden calcular. En un problema, además, solo valen los valores con sentido: un lado no puede ser negativo.',
            'مع الصيغة يكون المجال كل قيم $x$ ما عدا التي لا تُحسب. وفي المسألة لا تصح إلا القيم التي لها معنى: لا يكون الضلع سالبًا.',
            'With a formula, the domain is every $x$ except the ones you cannot work out. In a problem, also, only values that make sense count: a side cannot be negative.'
        ),
        cases: [
            { title: say('Polinomioa', 'Polinomio', 'كثير الحدود', 'Polynomial'), text: say('Edozein zenbaki.', 'Cualquier número.', 'أي عدد.', 'Any number.'), math: same('$y=x^{2}-4x\\ \\to\\ \\mathbb{R}$') },
            { title: say('Zatikia', 'Fracción', 'الكسر', 'Fraction'), text: say('Izendatzailea ezin da 0 izan.', 'El denominador no puede ser 0.', 'لا يكون المقام 0.', 'The denominator cannot be 0.'), math: same('$x-3\\neq 0\\ \\to\\ x\\neq 3$') },
            { title: say('Erro karratua', 'Raíz cuadrada', 'الجذر التربيعي', 'Square root'), text: say('Errokizuna ezin da negatiboa izan.', 'El radicando no puede ser negativo.', 'لا يكون ما تحت الجذر سالبًا.', 'The radicand cannot be negative.'), math: same('$x-2\\ge 0\\ \\to\\ x\\ge 2$') }
        ],
        examplePrompt: say('Zein da $y=\\frac{5}{2x-8}$ funtzioaren izate-eremua?', '¿Cuál es el dominio de $y=\\frac{5}{2x-8}$?', 'ما مجال $y=\\frac{5}{2x-8}$؟', 'What is the domain of $y=\\frac{5}{2x-8}$?'),
        example: same('$2x-8=0\\ \\to\\ x=4\\qquad \\mathbb{R}-\\{4\\}$'),
        exampleAnswer: say('Zenbaki guztiak, 4 izan ezik.', 'Todos los números menos el 4.', 'كل الأعداد ما عدا 4.', 'Every number except 4.')
    },
    intercepts: {
        vocabulary: [
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'intercept'),
            say('ardatza', 'eje', 'المحور', 'axis'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator')
        ],
        explanation: say(
            'Y ardatzarekiko ebaki-puntua: jarri $x=0$; gehienez bat dago, eta bat ere ez 0 izate-eremuan ez badago. X ardatzarekikoak: jarri $y=0$ eta ebatzi $f(x)=0$; ebazpen bakoitzak $(x,\\,0)$ puntu bat ematen du. Zatiki batean, zenbakitzailea berdintzen da 0 zenbakira.',
            'Corte con el eje Y: pon $x=0$; hay como mucho uno, y ninguno si el 0 no está en el dominio. Cortes con el eje X: pon $y=0$ y resuelve $f(x)=0$; cada solución da un punto $(x,\\,0)$. En una fracción, se iguala a 0 el numerador.',
            'التقاطع مع محور Y: ضع $x=0$؛ توجد نقطة واحدة على الأكثر، ولا توجد إذا لم يكن 0 في المجال. والتقاطع مع محور X: ضع $y=0$ وحلّ $f(x)=0$؛ وكل حل يعطي نقطة $(x,\\,0)$. وفي الكسر نساوي البسط بـ0.',
            'Y intercept: put $x=0$; there is at most one, and none if 0 is not in the domain. X intercepts: put $y=0$ and solve $f(x)=0$; each solution gives a point $(x,\\,0)$. In a fraction, set the numerator to 0.'
        ),
        cases: [
            { title: say('Y ardatza', 'Eje Y', 'محور Y', 'Y axis'), text: say('Marrazkian, $y=x^{2}-2x-3$:', 'En el dibujo, $y=x^{2}-2x-3$:', 'في الرسم $y=x^{2}-2x-3$:', 'In the drawing, $y=x^{2}-2x-3$:'), math: same('$x=0\\ \\to\\ (0,\\,-3)$') },
            { title: say('X ardatza', 'Eje X', 'محور X', 'X axis'), text: say('Ebatzi ekuazioa.', 'Resuelve la ecuación.', 'حلّ المعادلة.', 'Solve the equation.'), math: same('$x^{2}-2x-3=0\\ \\to\\ (-1,\\,0),\\ (3,\\,0)$') }
        ],
        examplePrompt: say('Kalkulatu $y=x^{2}-9$ funtzioaren ebaki-puntuak ardatzekin.', 'Calcula los cortes de $y=x^{2}-9$ con los ejes.', 'احسب نقاط تقاطع $y=x^{2}-9$ مع المحورين.', 'Work out where $y=x^{2}-9$ crosses the axes.'),
        example: same('$(0,\\,-9)\\qquad (3,\\,0),\\ (-3,\\,0)$'),
        exampleAnswer: say('Y ardatza $-9$ puntuan; X ardatza 3 eta $-3$ puntuetan.', 'Eje Y en $-9$; eje X en 3 y $-3$.', 'محور Y عند $-9$؛ ومحور X عند 3 و$-3$.', 'Y axis at $-9$; X axis at 3 and $-3$.')
    },
    /* ---------- 3. Change ---------- */
    monotony: {
        vocabulary: [
            say('gorakorra', 'creciente', 'متزايدة', 'increasing'),
            say('beherakorra', 'decreciente', 'متناقصة', 'decreasing'),
            say('konstantea', 'constante', 'ثابتة', 'constant')
        ],
        explanation: say(
            'Funtzio bat gorakorra da $x$ handitzean $y$ handitzen bada, beherakorra $y$ txikitzen bada, eta konstantea aldatzen ez bada. Grafikoa ezkerretik eskuinera irakurtzen da, mendiko bide bat bezala. Tarteak $x$ balioekin idazten dira, irekiak, eta zatiak $\\cup$ ikurrarekin lotzen dira.',
            'Una función es creciente si al aumentar $x$ aumenta $y$, decreciente si $y$ disminuye y constante si no cambia. La gráfica se lee de izquierda a derecha, como un camino de montaña. Los intervalos se escriben con valores de $x$, abiertos, y los tramos se unen con $\\cup$.',
            'تكون الدالة متزايدة إذا زادت $y$ بزيادة $x$، ومتناقصة إذا نقصت $y$، وثابتة إذا لم تتغير. ويُقرأ الرسم من اليسار إلى اليمين مثل طريق جبلي. وتُكتب الفترات بقيم $x$، مفتوحة، وتُجمع الأجزاء بالرمز $\\cup$.',
            'A function is increasing if $y$ goes up as $x$ goes up, decreasing if $y$ goes down, and constant if it does not change. Read the graph from left to right, like a mountain path. Intervals are written with values of $x$, open, and pieces are joined with $\\cup$.'
        ),
        cases: [
            { title: say('Gorakorra', 'Crece', 'تتزايد', 'Increasing'), text: say('Marrazkian.', 'En el dibujo.', 'في الرسم.', 'In the drawing.'), math: same('$(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$') },
            { title: say('Beherakorra', 'Decrece', 'تتناقص', 'Decreasing'), text: say('Bi tontorren artean.', 'Entre la cima y el valle.', 'بين القمة والوادي.', 'Between the peak and the valley.'), math: same('$(-2,\\,2)$') }
        ],
        examplePrompt: say('Grafiko bat $(-3,\\,4)$ puntutik $(0,\\,1)$ puntura jaisten da eta $(4,\\,5)$ puntura igotzen da. Non da gorakorra eta non beherakorra?', 'Una gráfica baja de $(-3,\\,4)$ a $(0,\\,1)$ y sube hasta $(4,\\,5)$. ¿Dónde crece y dónde decrece?', 'رسم ينزل من $(-3,\\,4)$ إلى $(0,\\,1)$ ثم يصعد إلى $(4,\\,5)$. أين يتزايد وأين يتناقص؟', 'A graph falls from $(-3,\\,4)$ to $(0,\\,1)$ and rises to $(4,\\,5)$. Where does it increase and where does it decrease?'),
        example: same('$(-3,\\,0)\\qquad (0,\\,4)$'),
        exampleAnswer: say('Beherakorra $(-3,\\,0)$ tartean eta gorakorra $(0,\\,4)$ tartean: $x$ tarteak.', 'Decrece en $(-3,\\,0)$ y crece en $(0,\\,4)$: intervalos de $x$.', 'يتناقص في $(-3,\\,0)$ ويتزايد في $(0,\\,4)$: فترات من $x$.', 'It decreases on $(-3,\\,0)$ and increases on $(0,\\,4)$: intervals of $x$.')
    },
    extrema: {
        definitions: [
            {
                term: say('Maximo erlatiboa', 'Máximo relativo', 'القيمة العظمى النسبية', 'Relative maximum'),
                meaning: say('Funtzioa gorakorra izatetik beherakorra izatera pasatzen den puntua: tontor bat.', 'Punto donde la función pasa de crecer a decrecer: una cima.', 'نقطة تنتقل فيها الدالة من التزايد إلى التناقص: قمة.', 'A point where the function goes from increasing to decreasing: a peak.')
            },
            {
                term: say('Minimo erlatiboa', 'Mínimo relativo', 'القيمة الصغرى النسبية', 'Relative minimum'),
                meaning: say('Beherakorra izatetik gorakorra izatera pasatzen den puntua: haran bat.', 'Punto donde pasa de decrecer a crecer: un valle.', 'نقطة تنتقل فيها من التناقص إلى التزايد: وادٍ.', 'A point where it goes from decreasing to increasing: a valley.')
            }
        ],
        vocabulary: [
            say('tontorra', 'cima', 'قمة', 'peak'),
            say('harana', 'valle', 'وادٍ', 'valley'),
            say('absolutua', 'absoluto', 'المطلقة', 'absolute')
        ],
        explanation: say(
            'Maximo absolutua grafiko osoko punturik altuena da, eta minimo absolutua, baxuena; izate-eremuaren mutur batean egon daitezke. Puntu osoa ematen da beti, $(x,\\,y)$: $x$ balioak non dagoen esaten du, eta $y$ balioak zenbat balio duen. Marrazkian, maximo absolutua $(2,\\,5)$ da.',
            'El máximo absoluto es el punto más alto de toda la gráfica, y el mínimo absoluto, el más bajo; pueden estar en un extremo del dominio. Se da siempre el punto entero, $(x,\\,y)$: la $x$ dice dónde está y la $y$, cuánto vale. En el dibujo, el máximo absoluto es $(2,\\,5)$.',
            'القيمة العظمى المطلقة أعلى نقطة في الرسم كله، والصغرى المطلقة أدناها؛ وقد تكونان عند طرف المجال. ونعطي دائمًا النقطة كاملة $(x,\\,y)$: $x$ تخبر أين هي و$y$ كم تساوي. في الرسم العظمى المطلقة $(2,\\,5)$.',
            'The absolute maximum is the highest point of the whole graph, and the absolute minimum the lowest; they can be at an end of the domain. Always give the whole point, $(x,\\,y)$: the $x$ says where it is and the $y$ how much it is. In the drawing, the absolute maximum is $(2,\\,5)$.'
        ),
        examplePrompt: say('Funtzio bat beherakorra da $(-\\infty,\\,1)$ tartean, gorakorra $(1,\\,+\\infty)$ tartean, eta $f(1)=-4$. Zer dago $x=1$ puntuan?', 'Una función decrece en $(-\\infty,\\,1)$, crece en $(1,\\,+\\infty)$ y $f(1)=-4$. ¿Qué hay en $x=1$?', 'دالة تتناقص في $(-\\infty,\\,1)$ وتتزايد في $(1,\\,+\\infty)$ و$f(1)=-4$. ماذا يوجد عند $x=1$؟', 'A function decreases on $(-\\infty,\\,1)$, increases on $(1,\\,+\\infty)$ and $f(1)=-4$. What is at $x=1$?'),
        example: same('$(1,\\,-4)$'),
        exampleAnswer: say('Minimo erlatibo bat (eta absolutua): jaistetik igotzera.', 'Un mínimo relativo (y absoluto): de bajar a subir.', 'قيمة صغرى نسبية (ومطلقة): من النزول إلى الصعود.', 'A relative minimum (and absolute): from falling to rising.')
    },
    rate: {
        definitions: [
            {
                term: say('Batez besteko aldakuntza-tasa', 'Tasa de variación media', 'معدل التغير المتوسط', 'Average rate of change'),
                meaning: say('Funtzioa batez beste zenbat aldatzen den $x$ unitate bakoitzeko, $[a,\\,b]$ tartean.', 'Lo que cambia la función, de media, por cada unidad de $x$ en el intervalo $[a,\\,b]$.', 'مقدار تغير الدالة في المتوسط لكل وحدة من $x$ في الفترة $[a,\\,b]$.', 'How much the function changes, on average, for each unit of $x$ on the interval $[a,\\,b]$.')
            }
        ],
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('batez besteko abiadura', 'velocidad media', 'السرعة المتوسطة', 'average speed'),
            say('kendu', 'restar', 'نطرح', 'subtract')
        ],
        explanation: say(
            '$y$ aldagaiaren aldaketa $x$ aldagaiaren aldaketaz zatitzen da, ordena berean kenduz. Grafikoan, bi puntuak lotzen dituen zuzenkiaren malda da. Positiboa bada, batez beste gorakorra da; negatiboa bada, beherakorra. Espazio–denbora grafiko batean, batez besteko abiadura da.',
            'Se calcula dividiendo el cambio de $y$ entre el cambio de $x$, al restar en el mismo orden. En la gráfica es la pendiente del segmento que une los dos puntos. Si es positiva, crece de media; si es negativa, decrece. En una gráfica espacio–tiempo, es la velocidad media.',
            'نحسبه بقسمة تغير $y$ على تغير $x$، مع الطرح بالترتيب نفسه. وهو في الرسم ميل القطعة التي تصل النقطتين. إذا كان موجبًا فالدالة تتزايد في المتوسط، وإذا كان سالبًا فتتناقص. وفي رسم المسافة–الزمن هو السرعة المتوسطة.',
            'You divide the change in $y$ by the change in $x$, subtracting in the same order. On the graph it is the slope of the segment joining the two points. If it is positive, it increases on average; if negative, it decreases. On a distance–time graph, it is the average speed.'
        ),
        cases: [
            { title: say('Formula', 'Fórmula', 'الصيغة', 'Formula'), text: say('Ordena berean goian eta behean.', 'En el mismo orden arriba y abajo.', 'بالترتيب نفسه في البسط والمقام.', 'In the same order on top and at the bottom.'), math: same('$\\frac{f(b)-f(a)}{b-a}$') },
            { title: say('Marrazkikoa', 'La del dibujo', 'دالة الرسم', 'The one in the drawing'), text: say('$f(x)=x^{2}-4x+5$ funtzioa, $[1,\\,4]$ tartean:', '$f(x)=x^{2}-4x+5$ en $[1,\\,4]$:', '$f(x)=x^{2}-4x+5$ في $[1,\\,4]$:', '$f(x)=x^{2}-4x+5$ on $[1,\\,4]$:'), math: same('$\\frac{f(4)-f(1)}{4-1}=\\frac{5-2}{3}=1$') }
        ],
        why: {
            text: say(
                'Zuzenki batek $b-a$ aurreratzen du eta $f(b)-f(a)$ igotzen: haien zatidura da zenbat igotzen den aurreratutako unitate bakoitzeko, hau da, malda. Funtzioak bidean gorabeherak izan ditzake; tasak hasiera eta amaiera bakarrik begiratzen ditu.',
                'El segmento avanza $b-a$ y sube $f(b)-f(a)$: su cociente es cuánto sube por cada unidad que avanza, es decir, la pendiente. La función puede subir y bajar por el camino; la tasa solo mira el principio y el final.',
                'تتقدّم القطعة بمقدار $b-a$ وتصعد بمقدار $f(b)-f(a)$: وخارج قسمتهما هو مقدار الصعود لكل وحدة تقدّم، أي الميل. قد تصعد الدالة وتنزل في الطريق؛ أما المعدل فلا ينظر إلا إلى البداية والنهاية.',
                'The segment moves along $b-a$ and up $f(b)-f(a)$: their quotient is how much it rises for each unit along, that is, the slope. The function may go up and down on the way; the rate only looks at the start and the end.'
            )
        },
        examplePrompt: say('Kalkulatu $f(x)=x^{2}$ funtzioaren batez besteko aldakuntza-tasa $[2,\\,5]$ tartean.', 'Calcula la tasa de variación media de $f(x)=x^{2}$ en $[2,\\,5]$.', 'احسب معدل التغير المتوسط لـ$f(x)=x^{2}$ في $[2,\\,5]$.', 'Work out the average rate of change of $f(x)=x^{2}$ on $[2,\\,5]$.'),
        example: same('$\\frac{25-4}{5-2}=\\frac{21}{3}=7$'),
        exampleAnswer: say('Batez beste, 7 igotzen da $x$ unitate bakoitzeko.', 'De media, sube 7 por cada unidad de $x$.', 'في المتوسط تصعد 7 لكل وحدة من $x$.', 'On average, it rises 7 for each unit of $x$.')
    },
    /* ---------- 4. Properties ---------- */
    continuity: {
        definitions: [
            {
                term: say('Funtzio jarraitua', 'Función continua', 'الدالة المتصلة', 'Continuous function'),
                meaning: say('Arkatza paperetik altxatu gabe marrazten dena.', 'La que se dibuja sin levantar el lápiz del papel.', 'التي تُرسم دون رفع القلم عن الورق.', 'One you can draw without lifting the pencil off the paper.')
            }
        ],
        vocabulary: [
            say('jauzia', 'salto', 'قفزة', 'jump'),
            say('arkatza', 'lápiz', 'القلم', 'pencil'),
            say('puntu hutsa', 'punto hueco', 'نقطة فارغة', 'open dot')
        ],
        explanation: say(
            'Bestela, etena da. Puntu huts batek esan nahi du puntu hori ez dagoela grafikoan; bete batek, badagoela. Hiru arrazoi ohikoenak:',
            'Si no, es discontinua. Un punto hueco indica que ese punto no está en la gráfica; uno relleno, que sí. Las tres causas más habituales:',
            'وإلا فهي منفصلة. النقطة الفارغة تعني أن تلك النقطة ليست على الرسم، والممتلئة تعني أنها عليه. الأسباب الثلاثة الأكثر شيوعًا:',
            'If not, it is discontinuous. An open dot means that point is not on the graph; a filled one, that it is. The three most common causes:'
        ),
        cases: [
            { title: say('Jauzia', 'Salto', 'قفزة', 'Jump'), text: say('Aparkaleku baten prezioa ordu bakoitzean jauzika igotzen da, eskailera bat bezala.', 'El precio de un aparcamiento sube de golpe cada hora, como una escalera.', 'يرتفع ثمن موقف السيارات فجأة كل ساعة، مثل الدرج.', 'The price of a car park jumps up every hour, like a staircase.') },
            { title: say('Zuloa', 'Agujero', 'ثقب', 'Hole'), text: say('Puntu bat lekuz aldatuta dago edo falta da.', 'Un punto desplazado o que falta.', 'نقطة مزاحة أو ناقصة.', 'A point that is moved or missing.') },
            { title: say('Adar infinitua', 'Rama infinita', 'فرع لانهائي', 'Infinite branch'), text: say('Izate-eremutik kanpoko puntu baten ondoan, funtzioa izugarri handitu edo txikitzen da.', 'Cerca de un punto fuera del dominio, la función se dispara.', 'قرب نقطة خارج المجال تنطلق الدالة بلا حدود.', 'Near a point outside the domain, the function shoots off.'), math: same('$y=\\frac{1}{x-2}$') }
        ],
        examplePrompt: say('Postak euro 1 kobratzen du 20 g arte, 2 € 50 g arte eta 3 € 100 g arte. Jarraitua al da pisua → prezioa funtzioa?', 'Correos cobra 1 € hasta 20 g, 2 € hasta 50 g y 3 € hasta 100 g. ¿Es continua la función peso → precio?', 'يأخذ البريد 1 € حتى 20 غ، و2 € حتى 50 غ، و3 € حتى 100 غ. هل الدالة الوزن ← الثمن متصلة؟', 'The post office charges €1 up to 20 g, €2 up to 50 g and €3 up to 100 g. Is the function weight → price continuous?'),
        example: '',
        exampleAnswer: say('Ez: 20 g eta 50 g puntuetan jauzi egiten du, eskailera bat bezala.', 'No: salta en 20 g y en 50 g, como una escalera.', 'لا: تقفز عند 20 غ وعند 50 غ مثل الدرج.', 'No: it jumps at 20 g and at 50 g, like a staircase.')
    },
    periodicity: {
        definitions: [
            {
                term: say('Periodoa', 'Periodo', 'الدور', 'Period'),
                meaning: say('Errepikatzen den grafiko-zatiaren luzera, $T$: $f(x+T)=f(x)$.', 'La longitud del trozo de gráfica que se repite, $T$: $f(x+T)=f(x)$.', 'طول الجزء المتكرر من الرسم $T$: $f(x+T)=f(x)$.', 'The length of the piece of graph that repeats, $T$: $f(x+T)=f(x)$.')
            }
        ],
        vocabulary: [
            say('errepikatu', 'se repite', 'يتكرر', 'repeat'),
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('zisterna', 'cisterna', 'خزان', 'tank')
        ],
        explanation: say(
            'Funtzio bat periodikoa da haren grafikoaren zati bat behin eta berriz errepikatzen bada, marrazkiko zisterna bezala, 2 minuturo betetzen eta husten baita. Urrutiko balio baterako, zatitu $x$ periodoaz eta hartu hondarra.',
            'Una función es periódica si un trozo de su gráfica se repite una y otra vez, como la cisterna del dibujo, que se llena y se vacía cada 2 minutos. Para un valor lejano, divide $x$ entre el periodo y toma el resto.',
            'تكون الدالة دورية إذا تكرر جزء من رسمها مرة بعد مرة، مثل خزان الرسم الذي يمتلئ ويفرغ كل دقيقتين. ولقيمة بعيدة اقسم $x$ على الدور وخذ الباقي.',
            'A function is periodic if a piece of its graph repeats over and over, like the tank in the drawing, which fills up and empties every 2 minutes. For a value far away, divide $x$ by the period and take the remainder.'
        ),
        cases: [
            { title: say('Urrutiko balioak', 'Valores lejanos', 'قيم بعيدة', 'Far values'), text: say('Zisternarekin, $T=2$:', 'Con la cisterna, $T=2$:', 'مع الخزان $T=2$:', 'With the tank, $T=2$:'), math: same('$17=8\\cdot 2+1\\ \\to\\ f(17)=f(1)$') },
            { title: say('Datak', 'Fechas', 'التواريخ', 'Dates'), text: say('Halley kometa 77 urtean behin itzultzen da:', 'El cometa Halley vuelve cada 77 años:', 'يعود مذنب هالي كل 77 سنة:', 'Halley’s comet comes back every 77 years:'), math: same('$1986+77=2063$') }
        ],
        why: {
            text: say(
                'Periodo oso bat aurreratzean funtzioa berdin geratzen da: $f(17)=f(15)=f(13)=\\dots=f(1)$. Periodoak kentzea itzuli osoak kentzea da, eta geratzen dena zatiketaren hondarra da.',
                'Avanzar un periodo entero deja la función igual: $f(17)=f(15)=f(13)=\\dots=f(1)$. Quitar periodos es quitar vueltas enteras, y lo que queda es el resto de la división.',
                'التقدّم بدور كامل يُبقي الدالة كما هي: $f(17)=f(15)=f(13)=\\dots=f(1)$. وحذف الأدوار حذفٌ لدورات كاملة، وما يبقى هو باقي القسمة.',
                'Moving on a whole period leaves the function the same: $f(17)=f(15)=f(13)=\\dots=f(1)$. Taking away periods is taking away whole turns, and what is left is the remainder of the division.'
            )
        },
        examplePrompt: say('Semaforo bat 30 s dago berdean, 5 s anbarean eta 25 s gorrian, eta errepikatu egiten da. Zer kolore du 130 s-ra?', 'Un semáforo está 30 s en verde, 5 s en ámbar y 25 s en rojo, y se repite. ¿De qué color está a los 130 s?', 'إشارة مرور تبقى 30 ث خضراء و5 ث صفراء و25 ث حمراء ثم تتكرر. ما لونها عند 130 ث؟', 'A traffic light is green for 30 s, amber for 5 s and red for 25 s, and repeats. What colour is it at 130 s?'),
        example: same('$130=2\\cdot 60+10$'),
        exampleAnswer: say('Berdean: periodoa 60 s da, eta 10 s berdean erortzen da.', 'En verde: el periodo es 60 s y 10 s cae en el verde.', 'خضراء: الدور 60 ث، و10 ث تقع في الأخضر.', 'Green: the period is 60 s and 10 s falls in the green.')
    },
    tendency: {
        vocabulary: [
            say('joera', 'tendencia', 'الاتجاه', 'trend'),
            say('hurbildu', 'se acerca', 'تقترب', 'get closer'),
            say('marra etena', 'línea discontinua', 'خط متقطع', 'dashed line')
        ],
        explanation: say(
            'Batzuetan funtzio bat, $x$ handitu ahala, gero eta gehiago hurbiltzen da balio batera, inoiz iritsi gabe: hori da haren joera. Grafikoaren azken zatiari begiratuta asmatzen da, eta askotan marra eten horizontal batekin marrazten da. Beste batzuek ez dute joera finkorik: gelditu gabe hazten dira edo errepikatzen dira.',
            'A veces una función, al crecer $x$, se acerca cada vez más a un valor sin llegar nunca a él: es su tendencia. Se adivina mirando el último trozo de la gráfica y a menudo se dibuja con una línea discontinua horizontal. Otras no tienen una tendencia fija: crecen sin parar o se repiten.',
            'أحيانًا تقترب الدالة، كلما كبرت $x$، أكثر فأكثر من قيمة دون أن تبلغها أبدًا: تلك قيمة اتجاهها. ونعرفها بالنظر إلى آخر جزء من الرسم، وكثيرًا ما تُرسم بخط متقطع أفقي. ودوال أخرى بلا اتجاه ثابت: تكبر بلا توقف أو تتكرر.',
            'Sometimes a function, as $x$ grows, gets closer and closer to a value without ever reaching it: that is its trend. You can tell it from the last piece of the graph, and it is often drawn with a horizontal dashed line. Others have no fixed trend: they grow without stopping or repeat.'
        ),
        cases: [
            { title: say('0 zenbakirantz', 'Hacia 0', 'نحو 0', 'Towards 0'), text: say('Urtero erdira murrizten den erradioaktibitatea.', 'La radiactividad que se reduce a la mitad cada año.', 'النشاط الإشعاعي الذي ينقص إلى النصف كل سنة.', 'Radioactivity that halves every year.') },
            { title: say('22 °C-rantz', 'Hacia 22 °C', 'نحو 22 °م', 'Towards 22 °C'), text: say('Hozkailutik edo mikrouhin-labetik ateratako ur-baso bat, gelako tenperaturara.', 'Un vaso de agua de la nevera o del microondas, a la temperatura de la habitación.', 'كأس ماء من الثلاجة أو من الميكروويف يتجه إلى حرارة الغرفة.', 'A glass of water from the fridge or the microwave, to the temperature of the room.') }
        ],
        examplePrompt: say('Egin berri den kafe bat 80 °C-tan dago, 20 °C-ko gela batean. Zertara jotzen du haren tenperaturak?', 'Un café recién hecho está a 80 °C en una habitación a 20 °C. ¿A qué tiende su temperatura?', 'قهوة محضّرة للتو حرارتها 80 °م في غرفة حرارتها 20 °م. إلامَ تتجه حرارتها؟', 'A freshly made coffee is at 80 °C in a room at 20 °C. What does its temperature tend to?'),
        example: same('$y\\to 20$'),
        exampleAnswer: say('20 °C-ra jotzen du, goitik, behera jaitsi gabe.', 'Tiende a 20 °C, desde arriba, sin bajar de ahí.', 'تتجه إلى 20 °م من الأعلى دون أن تنزل تحتها.', 'It tends to 20 °C, from above, without going below it.')
    },
    /* ---------- 5. Study ---------- */
    reading: {
        vocabulary: [
            say('unitateak', 'unidades', 'الوحدات', 'units'),
            say('kurba', 'curva', 'المنحنى', 'curve'),
            say('ardatza', 'eje', 'محور', 'axis')
        ],
        explanation: say(
            'Testuinguru bateko grafiko bat irakurtzeko, begiratu lehenik ardatz bakoitzak zer neurtzen duen, zein unitatetan eta lauki bakoitzak zenbat balio duen. Gero irakurri kurba ezkerretik eskuinera, eta kontatu noiz igotzen eta jaisten den, maximoak eta minimoak unitateekin, eta zertara jotzen duen.',
            'Para leer una gráfica de un contexto, mira primero qué mide cada eje, en qué unidades y cuánto vale cada cuadro. Después lee la curva de izquierda a derecha y cuenta cuándo crece y decrece, los máximos y mínimos con sus unidades y a qué tiende.',
            'لقراءة رسم في سياق انظر أولًا ماذا يقيس كل محور، وبأي وحدات، وكم تساوي كل خانة. ثم اقرأ المنحنى من اليسار إلى اليمين وصِف متى يتزايد ويتناقص، والقيم العظمى والصغرى بوحداتها، وإلامَ يتجه.',
            'To read a graph about a situation, first look at what each axis measures, in what units and how much each square is worth. Then read the curve from left to right and tell when it rises and falls, the maxima and minima with their units, and what it tends to.'
        ),
        cases: [
            { title: say('Marrazkikoa', 'La del dibujo', 'منحنى الرسم', 'The one in the drawing'), text: say('Gluzemia 90 eta 120 mg/dl artean igotzen da ordu batean (maximoa), 90 azpitik jaisten da 4 h-ra eta normaltasunera itzultzen da.', 'La glucemia sube de 90 a 120 mg/dl en una hora (el máximo), baja algo por debajo de 90 a las 4 h y vuelve a la normalidad.', 'يرتفع سكر الدم من 90 إلى 120 mg/dl في ساعة (العظمى)، وينزل قليلًا تحت 90 بعد 4 س، ثم يعود طبيعيًا.', 'Blood sugar rises from 90 to 120 mg/dl in an hour (the maximum), dips just below 90 at 4 h and goes back to normal.') },
            { title: say('Balio bat irakurri', 'Leer un valor', 'قراءة قيمة', 'Reading a value'), text: say('Joan ardatzetik kurbara eta kurbatik beste ardatzera.', 'Ve del eje a la curva y de la curva al otro eje.', 'اذهب من المحور إلى المنحنى ومن المنحنى إلى المحور الآخر.', 'Go from the axis to the curve and from the curve to the other axis.') }
        ],
        examplePrompt: say('Ibilaldi baten grafikoak 0 km markatzen ditu 10:00 orduan, 6 km 11:30 orduan eta 6 km 12:00 orduan. Zer gertatu zen 11:30 eta 12:00 artean?', 'Una gráfica de un paseo marca 0 km a las 10:00, 6 km a las 11:30 y 6 km a las 12:00. ¿Qué pasó entre las 11:30 y las 12:00?', 'رسم لنزهة يبيّن 0 كم عند 10:00، و6 كم عند 11:30، و6 كم عند 12:00. ماذا حدث بين 11:30 و12:00؟', 'A graph of a walk shows 0 km at 10:00, 6 km at 11:30 and 6 km at 12:00. What happened between 11:30 and 12:00?'),
        example: '',
        exampleAnswer: say('Geldirik egon zen: distantzia ez da aldatzen, eta grafikoa horizontala da.', 'Estuvo parado: la distancia no cambia y la gráfica es horizontal.', 'كان متوقفًا: المسافة لا تتغير والرسم أفقي.', 'They stopped: the distance does not change and the graph is flat.')
    },
    study: {
        vocabulary: [
            say('ordena', 'orden', 'الترتيب', 'order'),
            say('jarraitua', 'continua', 'متصلة', 'continuous'),
            say('ebaki-puntuak', 'cortes', 'نقاط التقاطع', 'intercepts')
        ],
        explanation: say(
            'Funtzio bat osorik aztertzeko, jarraitu beti ordena bera: horrela ez da ezer ahazten. Marrazkiko grafikoa:',
            'Para estudiar una función completa, sigue siempre el mismo orden: así no se olvida nada. La gráfica del dibujo:',
            'لدراسة دالة كاملة اتبع دائمًا الترتيب نفسه: هكذا لا تنسى شيئًا. رسم الشكل:',
            'To study a whole function, always follow the same order: that way nothing is forgotten. The graph in the drawing:'
        ),
        cases: [
            { title: say('Izate-eremua eta ibiltartea', 'Dominio y recorrido', 'المجال والمدى', 'Domain and range'), text: say('X eta Y ardatzetan.', 'En los ejes X e Y.', 'على المحورين X وY.', 'On the X and Y axes.'), math: same('$[0,\\,8]\\qquad [0,\\,3]$') },
            { title: say('Ebaki-puntuak', 'Cortes con los ejes', 'نقاط التقاطع', 'Intercepts'), text: say('Hasieran eta amaieran.', 'Al principio y al final.', 'في البداية والنهاية.', 'At the start and the end.'), math: same('$(0,\\,0)\\qquad (8,\\,0)$') },
            { title: say('Gorakorra eta muturrak', 'Crecimiento y extremos', 'التزايد والقيم القصوى', 'Growth and extremes'), text: say('Maximoak $(1,\\,3)$, $(5,\\,2)$ eta $(7,\\,3)$ puntuetan; minimoak $(3,\\,1)$ eta $(6,\\,1)$ puntuetan.', 'Máximos en $(1,\\,3)$, $(5,\\,2)$ y $(7,\\,3)$; mínimos en $(3,\\,1)$ y $(6,\\,1)$.', 'العظمى عند $(1,\\,3)$ و$(5,\\,2)$ و$(7,\\,3)$؛ والصغرى عند $(3,\\,1)$ و$(6,\\,1)$.', 'Maxima at $(1,\\,3)$, $(5,\\,2)$ and $(7,\\,3)$; minima at $(3,\\,1)$ and $(6,\\,1)$.') },
            { title: say('Jarraitasuna', 'Continuidad', 'الاتصال', 'Continuity'), text: say('Jarraitua da, eta ez da periodikoa.', 'Es continua y no es periódica.', 'متصلة وليست دورية.', 'It is continuous and not periodic.') }
        ],
        examplePrompt: say('Grafiko bat $(0,\\,1)$ puntutik ateratzen da, $(2,\\,5)$ puntura igotzen da, $(6,\\,0)$ puntura jaisten da eta han amaitzen da. Egin haren azterketa.', 'Una gráfica sale de $(0,\\,1)$, sube hasta $(2,\\,5)$, baja hasta $(6,\\,0)$ y ahí termina. Haz su estudio.', 'رسم يبدأ من $(0,\\,1)$، ويصعد إلى $(2,\\,5)$، وينزل إلى $(6,\\,0)$ وينتهي هناك. ادرسه.', 'A graph starts at $(0,\\,1)$, rises to $(2,\\,5)$, falls to $(6,\\,0)$ and ends there. Study it.'),
        example: same('$\\begin{gathered}\\mathrm{Dom}\\,f=[0,\\,6]\\qquad \\mathrm{Rec}\\,f=[0,\\,5]\\\\ (0,\\,1),\\ (6,\\,0)\\end{gathered}$'),
        exampleAnswer: say('Gorakorra $(0,\\,2)$ tartean eta beherakorra $(2,\\,6)$ tartean; maximoa $(2,\\,5)$ puntuan; jarraitua.', 'Crece en $(0,\\,2)$ y decrece en $(2,\\,6)$; máximo en $(2,\\,5)$; continua.', 'تتزايد في $(0,\\,2)$ وتتناقص في $(2,\\,6)$؛ العظمى عند $(2,\\,5)$؛ متصلة.', 'Increasing on $(0,\\,2)$ and decreasing on $(2,\\,6)$; maximum at $(2,\\,5)$; continuous.')
    },
    modelling: {
        vocabulary: [
            say('kartulina', 'cartulina', 'ورق مقوى', 'card'),
            say('izate-eremua', 'dominio', 'المجال', 'domain'),
            say('enuntziatua', 'enunciado', 'النص', 'statement')
        ],
        explanation: say(
            'Askotan enuntziatu batek funtzio bat ezkutatzen du. Aukeratu aldagai askea ($x$, aldatzen duguna), idatzi beste magnitudeak $x$ erabiliz eta erlazionatu. Izate-eremua problemaren zentzutik ateratzen da: luzera positiboak, pertsona osoak…',
            'Muchas veces un enunciado esconde una función. Elige la variable independiente ($x$, lo que cambiamos), escribe las demás magnitudes en función de $x$ y relaciónalas. El dominio sale del sentido del problema: longitudes positivas, personas enteras…',
            'كثيرًا ما يخفي النص دالة. اختر المتغير المستقل ($x$، ما نغيّره)، واكتب بقية المقادير بدلالة $x$ واربط بينها. والمجال يخرج من معنى المسألة: أطوال موجبة، وأشخاص بأعداد صحيحة…',
            'Often a statement hides a function. Choose the independent variable ($x$, what we change), write the other quantities in terms of $x$ and link them. The domain comes from what makes sense: positive lengths, whole numbers of people…'
        ),
        cases: [
            { title: say('Marrazkiko kutxa', 'La caja del dibujo', 'علبة الرسم', 'The box in the drawing'), text: say('40 × 30 cm-ko kartulina, izkina bakoitzean $x$ aldeko karratu bat moztuta.', 'Cartulina de 40 × 30 cm con un cuadrado de lado $x$ cortado en cada esquina.', 'ورق مقوى 40 × 30 سم قُصّ من كل زاوية مربع ضلعه $x$.', 'A 40 × 30 cm card with a square of side $x$ cut from each corner.'), math: same('$V(x)=(40-2x)(30-2x)\\,x$') },
            { title: say('Izate-eremua', 'Dominio', 'المجال', 'Domain'), text: say('$x>0$ eta $30-2x>0$.', '$x>0$ y $30-2x>0$.', '$x>0$ و$30-2x>0$.', '$x>0$ and $30-2x>0$.'), math: same('$0<x<15$') },
            { title: say('Taula', 'Tabla', 'الجدول', 'Table'), text: say('Balio bat ordeztuz:', 'Sustituyendo un valor:', 'بتعويض قيمة:', 'Putting in a value:'), math: same('$V(5)=30\\cdot 20\\cdot 5=3000$') }
        ],
        examplePrompt: say('Laukizuzen batek 24 m-ko perimetroa du eta alde batek $x$ neurtzen du. Idatzi haren azalera, $A(x)$, eta izate-eremua.', 'Un rectángulo tiene 24 m de perímetro y un lado mide $x$. Escribe su área $A(x)$ y su dominio.', 'مستطيل محيطه 24 م وطول أحد ضلعيه $x$. اكتب مساحته $A(x)$ ومجالها.', 'A rectangle has a perimeter of 24 m and one side is $x$. Write its area $A(x)$ and its domain.'),
        example: same('$A(x)=x(12-x)\\qquad 0<x<12$'),
        exampleAnswer: say('Beste aldeak $12-x$ neurtzen du; biek positiboak izan behar dute.', 'El otro lado mide $12-x$; los dos tienen que ser positivos.', 'الضلع الآخر $12-x$؛ ويجب أن يكون كلاهما موجبًا.', 'The other side is $12-x$; both have to be positive.')
    }
}
