import type { LessonTexts } from '../../features/unit-v2/types.ts'
import type { SocFunctionsTopicId } from './lessonChecks.ts'
import { plain as say, plainSame as same } from './text.ts'

/* ==========================================================================
   Funtzio elementalak · Batxilergoa 1 · Gizarte Zientziak — what each
   lesson tells: the new words (definitions), a short explanation, the
   example as an exercise («Another example»), the key words in four
   languages and, in some lessons, «Why does it work?». Plain data so the
   tests can import it; lessons.tsx merges it into the topics. The example
   uses numbers of its own, never those of «Let's solve», of «Check it» or
   of the typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const socFunctionsLessonTexts: Record<SocFunctionsTopicId, LessonTexts> = {
    /* ---------- 1. Functions and domain ---------- */
    families: {
        definitions: [
            { term: say('Funtzio-familia', 'Familia de funciones', 'عائلة دوال', 'Family of functions'), meaning: say('Formula mota bera eta grafiko-forma bera dituzten funtzioak.', 'Las funciones con el mismo tipo de fórmula y la misma forma de gráfica.', 'الدوال التي لها نوع الصيغة نفسه وشكل الرسم نفسه.', 'The functions with the same type of formula and the same shape of graph.') }
        ],
        vocabulary: [
            say('zuzena', 'recta', 'المستقيم', 'line'),
            say('parabola', 'parábola', 'القطع المكافئ', 'parabola'),
            say('hiperbola', 'hipérbola', 'القطع الزائد', 'hyperbola')
        ],
        explanation: say(
            'Gizarte-zientzietako egoera asko funtzio-familia gutxi batzuekin deskribatzen dira. Funtzio lineal batek zuzen bat ematen du; koadratiko batek, parabola bat; alderantzizko proportzionaltasunak, hiperbola bat; erro batek, adar erdi bat; eta esponentzial batek, gero eta azkarrago hazten den kurba bat. Familia ezagututa, grafikoaren forma aurreikusten da.',
            'Muchas situaciones de las ciencias sociales se describen con unas pocas familias de funciones. Una función lineal da una recta; una cuadrática, una parábola; la proporcionalidad inversa, una hipérbola; una raíz, media rama; y una exponencial, una curva que crece cada vez más deprisa. Conociendo la familia se prevé la forma de la gráfica.',
            'تُوصف حالات كثيرة في العلوم الاجتماعية بعائلات قليلة من الدوال. الدالة الخطية تعطي مستقيمًا، والتربيعية قطعًا مكافئًا، والتناسب العكسي قطعًا زائدًا، والجذر نصف فرع، والأسية منحنى يتزايد بسرعة متزايدة. وبمعرفة العائلة نتوقع شكل الرسم.',
            'Many situations in the social sciences are described with a few families of functions. A linear function gives a line; a quadratic one, a parabola; inverse proportion, a hyperbola; a root, half a branch; and an exponential one, a curve that grows faster and faster. Knowing the family, you can foresee the shape of the graph.'
        ),
        examplePrompt: say('500 euroko aurrezki batek % 3 egiten du gora urtero. Zein familiak deskribatzen du kapitala?', 'Un ahorro de 500 € crece un 3 % cada año. ¿Qué familia describe el capital?', 'مدّخرات قيمتها 500 € تزداد 3 % كل سنة. أي عائلة تصف رأس المال؟', 'Savings of €500 grow by 3 % every year. Which family describes the capital?'),
        example: same('$V(t)=500\\cdot 1{,}03^{t}$'),
        exampleAnswer: say('Esponentziala: urte bakoitzean 1,03 zenbakiaz biderkatzen da.', 'Exponencial: cada año se multiplica por 1,03.', 'أسية: تُضرب كل سنة في 1.03.', 'Exponential: every year it is multiplied by 1.03.')
    },
    domain: {
        definitions: [
            { term: say('Izate-eremua', 'Dominio', 'مجال التعريف', 'Domain'), meaning: say('$x$ aldagaiaren balioak, $f(x)$ kalkulatu ahal izateko.', 'Los valores de $x$ para los que se puede calcular $f(x)$.', 'قيم $x$ التي يمكن عندها حساب $f(x)$.', 'The values of $x$ for which $f(x)$ can be worked out.') }
        ],
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand'),
            say('polinomioa', 'polinomio', 'الحدودية', 'polynomial')
        ],
        explanation: say(
            'Polinomio bat edozein $x$ zenbakirekin kalkulatzen da: haren izate-eremua $\\mathbb{R}$ da. Zatiki batean, izendatzailea anulatzen duten balioak kentzen dira. Erro karratu batean, errokizunak $\\ge 0$ izan behar du. Bi baldintzak badaude, biak batera bete behar dira.',
            'Un polinomio se calcula con cualquier $x$: su dominio es $\\mathbb{R}$. En una fracción se quitan los valores que anulan el denominador. En una raíz cuadrada, el radicando tiene que ser $\\ge 0$. Si hay dos condiciones, se tienen que cumplir las dos a la vez.',
            'تُحسب الحدودية لأي $x$: مجالها $\\mathbb{R}$. وفي الكسر نحذف القيم التي تعدم المقام. وفي الجذر التربيعي يجب أن يكون ما تحت الجذر $\\ge 0$. وإذا وُجد شرطان فيجب أن يتحققا معًا.',
            'A polynomial can be worked out for any $x$: its domain is $\\mathbb{R}$. In a fraction, the values that make the denominator zero are removed. In a square root, the radicand has to be $\\ge 0$. If there are two conditions, both must hold at once.'
        ),
        examplePrompt: say('Aurkitu $h(x)=\\frac{2}{\\sqrt{x+7}}$ funtzioaren izate-eremua.', 'Halla el dominio de $h(x)=\\frac{2}{\\sqrt{x+7}}$.', 'أوجد مجال $h(x)=\\frac{2}{\\sqrt{x+7}}$.', 'Find the domain of $h(x)=\\frac{2}{\\sqrt{x+7}}$.'),
        example: same('$x+7>0\\ \\to\\ x>-7$'),
        exampleAnswer: say('Erroak $\\ge 0$ eskatzen du, eta izendatzaileak $\\neq 0$: izate-eremua $(-7,+\\infty)$ da.', 'La raíz pide $\\ge 0$ y el denominador, $\\neq 0$: el dominio es $(-7,+\\infty)$.', 'يشترط الجذر $\\ge 0$ ويشترط المقام $\\neq 0$: المجال هو $(-7,+\\infty)$.', 'The root needs $\\ge 0$ and the denominator $\\neq 0$: the domain is $(-7,+\\infty)$.')
    },
    'context-domain': {
        definitions: [
            { term: say('Ibiltartea', 'Recorrido', 'المدى', 'Range'), meaning: say('$y$ aldagaiak hartzen dituen balioak.', 'Los valores que toma la $y$.', 'القيم التي تأخذها $y$.', 'The values that $y$ takes.') }
        ],
        vocabulary: [
            say('testuingurua', 'contexto', 'السياق', 'context'),
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter')
        ],
        explanation: say(
            'Funtzio batek egoera erreal bat deskribatzen duenean, izate-eremua ez da formulak bakarrik erabakitzen duena: zentzua duten balioak bakarrik hartzen dira. Luzerak, prezioak eta unitate kopuruak positiboak dira, eta denbora batzuetan tarte batean bakarrik du zentzua. Ibiltartea grafikotik irakurtzen da.',
            'Cuando una función describe una situación real, el dominio no lo decide solo la fórmula: se toman solo los valores que tienen sentido. Las longitudes, los precios y las cantidades son positivos, y el tiempo a veces solo tiene sentido en un intervalo. El recorrido se lee en la gráfica.',
            'عندما تصف دالة موقفًا حقيقيًّا لا تحدد الصيغة وحدها المجال: نأخذ فقط القيم التي لها معنى. فالأطوال والأسعار والكميات موجبة، والزمن قد لا يكون له معنى إلا في فترة. ويُقرأ المدى من الرسم.',
            'When a function describes a real situation, the formula alone does not decide the domain: only the values that make sense are taken. Lengths, prices and quantities are positive, and time sometimes only makes sense on an interval. The range is read off the graph.'
        ),
        examplePrompt: say('Pilota bat gora jaurtitzen da, eta haren altuera $h(t)=30t-5t^2$ metro da. Zein da izate-eremua testuinguruan?', 'Una pelota se lanza hacia arriba y su altura es $h(t)=30t-5t^2$ metros. ¿Cuál es el dominio en el contexto?', 'تُقذف كرة إلى الأعلى وارتفاعها $h(t)=30t-5t^2$ مترًا. ما المجال في هذا السياق؟', 'A ball is thrown upwards and its height is $h(t)=30t-5t^2$ metres. What is the domain in the context?'),
        example: same('$30t-5t^2\\ge 0\\ \\to\\ 0\\le t\\le 6$'),
        exampleAnswer: say('Izate-eremua $[0,6]$ da: jaurti aurretik eta lurrera erori ondoren, formulak ez du ezer deskribatzen.', 'El dominio es $[0,6]$: antes de lanzarla y después de caer al suelo, la fórmula no describe nada.', 'المجال هو $[0,6]$: قبل القذف وبعد السقوط على الأرض لا تصف الصيغة شيئًا.', 'The domain is $[0,6]$: before the throw and after it hits the ground, the formula describes nothing.')
    },

    /* ---------- 2. Linear functions and interpolation ---------- */
    line: {
        definitions: [
            { term: say('Malda', 'Pendiente', 'الميل', 'Slope'), meaning: say('$x$ aldagaia 1 handitzean $y$ aldagaiak egiten duen aldaketa.', 'Lo que cambia la $y$ cuando la $x$ aumenta 1.', 'مقدار تغيّر $y$ عندما تزداد $x$ بمقدار 1.', 'How much $y$ changes when $x$ goes up by 1.') }
        ],
        vocabulary: [
            say('jatorriko ordenatua', 'ordenada en el origen', 'الجزء المقطوع من محور Y', 'y-intercept'),
            say('puntu-malda', 'punto-pendiente', 'النقطة والميل', 'point-slope')
        ],
        explanation: say(
            'Funtzio lineal baten grafikoa zuzen bat da, $y=mx+n$: $m$ malda da, eta $n$ jatorriko ordenatua. Bi puntu ezagututa, malda kalkulatzen da $y$ aldagaiaren aldaketa zati $x$ aldagaiaren aldaketa eginda. Gero puntu-malda ekuazioa idazten da.',
            'La gráfica de una función lineal es una recta, $y=mx+n$: $m$ es la pendiente y $n$, la ordenada en el origen. Conocidos dos puntos, la pendiente es lo que cambia la $y$ dividido entre lo que cambia la $x$. Después se escribe la ecuación punto-pendiente.',
            'رسم الدالة الخطية مستقيم $y=mx+n$: حيث $m$ الميل و$n$ الجزء المقطوع من محور Y. وإذا عُرفت نقطتان فالميل هو تغيّر $y$ مقسومًا على تغيّر $x$. ثم نكتب معادلة النقطة والميل.',
            'The graph of a linear function is a line, $y=mx+n$: $m$ is the slope and $n$ the y-intercept. Given two points, the slope is the change in $y$ divided by the change in $x$. Then the point-slope equation is written.'
        ),
        examplePrompt: say('Aurkitu $-3$ malda duen eta $(4,-1)$ puntutik pasatzen den zuzena.', 'Halla la recta de pendiente $-3$ que pasa por $(4,-1)$.', 'أوجد المستقيم الذي ميله $-3$ ويمر بالنقطة $(4,-1)$.', 'Find the line with slope $-3$ through $(4,-1)$.'),
        example: same('$y=-1-3(x-4)=-3x+11$'),
        exampleAnswer: say('$y=-3x+11$ zuzena.', 'La recta $y=-3x+11$.', 'المستقيم $y=-3x+11$.', 'The line $y=-3x+11$.')
    },
    interpolation: {
        definitions: [
            { term: say('Interpolatzea', 'Interpolar', 'الاستيفاء', 'Interpolating'), meaning: say('Datuen tartearen barruan dagoen balio bat estimatzea.', 'Estimar un valor dentro del intervalo de los datos.', 'تقدير قيمة داخل فترة البيانات.', 'Estimating a value inside the interval of the data.') },
            { term: say('Estrapolatzea', 'Extrapolar', 'الاستقراء الخارجي', 'Extrapolating'), meaning: say('Datuen tartetik kanpo dagoen balio bat estimatzea.', 'Estimar un valor fuera del intervalo de los datos.', 'تقدير قيمة خارج فترة البيانات.', 'Estimating a value outside the interval of the data.') }
        ],
        vocabulary: [
            say('estimazioa', 'estimación', 'التقدير', 'estimate'),
            say('fidagarria', 'fiable', 'موثوق', 'reliable')
        ],
        explanation: say(
            'Bi datu baino ez badaude, haietatik pasatzen den zuzenak tarteko balioak estimatzen ditu: interpolazio lineala da. Zuzen bera datuetatik kanpo erabiltzea estrapolatzea da. Interpolazioa fidagarria izan ohi da; estrapolazioa, berriz, gero eta okerragoa zenbat eta urrunago joan.',
            'Si solo hay dos datos, la recta que pasa por ellos estima los valores intermedios: es la interpolación lineal. Usar esa misma recta fuera de los datos es extrapolar. La interpolación suele ser fiable; la extrapolación, en cambio, es peor cuanto más lejos se va.',
            'إذا لم تتوفر إلا بيانتان، فالمستقيم المار بهما يقدّر القيم الواقعة بينهما: هذا هو الاستيفاء الخطي. واستعمال المستقيم نفسه خارج البيانات استقراء خارجي. والاستيفاء موثوق عادة، أما الاستقراء الخارجي فيسوء كلما ابتعدنا.',
            'If there are only two data, the line through them estimates the values in between: that is linear interpolation. Using the same line outside the data is extrapolating. Interpolation is usually reliable; extrapolation, on the other hand, gets worse the further you go.'
        ),
        examplePrompt: say('Auto batek 5,4 L gastatzen ditu 80 km/h abiaduran, eta 6,6 L 110 km/h abiaduran. Estimatu gastua 90 km/h abiaduran.', 'Un coche gasta 5,4 L a 80 km/h y 6,6 L a 110 km/h. Estima el gasto a 90 km/h.', 'تستهلك سيارة 5.4 L بسرعة 80 km/h و6.6 L بسرعة 110 km/h. قدّر الاستهلاك بسرعة 90 km/h.', 'A car uses 5.4 L at 80 km/h and 6.6 L at 110 km/h. Estimate its use at 90 km/h.'),
        example: same('$5{,}4+0{,}04\\cdot(90-80)=5{,}8$'),
        exampleAnswer: say('5,8 L inguru. Interpolazioa da: 90 balioa 80 eta 110 artean dago.', 'Unos 5,8 L. Es una interpolación: 90 está entre 80 y 110.', 'نحو 5.8 L. إنه استيفاء: 90 بين 80 و110.', 'About 5.8 L. It is an interpolation: 90 lies between 80 and 110.'),
        why: {
            text: say('Zergatik zuzen bat? Bi datu hurbilen artean, ia edozein kurba zuzen baten antzekoa da. Urrun, ordea, kurbak asko alde daiteke zuzenetik, eta horregatik da arriskutsua estrapolatzea.', '¿Por qué una recta? Entre dos datos cercanos casi cualquier curva se parece a una recta. Lejos, en cambio, la curva puede separarse mucho de ella, y por eso extrapolar es arriesgado.', 'لماذا مستقيم؟ بين بيانتين متقاربتين يشبه أي منحنى تقريبًا المستقيم. أما بعيدًا فقد يبتعد المنحنى عنه كثيرًا، ولذلك يكون الاستقراء الخارجي محفوفًا بالخطر.', 'Why a line? Between two nearby data almost any curve looks like a line. Far away, though, the curve can move a long way from it, and that is why extrapolating is risky.')
        }
    },
    'linear-models': {
        definitions: [
            { term: say('Kostu finkoa', 'Coste fijo', 'التكلفة الثابتة', 'Fixed cost'), meaning: say('Kopurua edozein dela ere ordaintzen dena.', 'Lo que se paga sea cual sea la cantidad.', 'ما يُدفع أيًّا كانت الكمية.', 'What is paid whatever the amount.') },
            { term: say('Kostu aldakorra', 'Coste variable', 'التكلفة المتغيرة', 'Variable cost'), meaning: say('Unitate bakoitzeko ordaintzen dena.', 'Lo que se paga por cada unidad.', 'ما يُدفع عن كل وحدة.', 'What is paid for each unit.') }
        ],
        vocabulary: [
            say('tarifa', 'tarifa', 'التعرفة', 'tariff'),
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'crossing point')
        ],
        explanation: say(
            'Tarifa askok zati finko bat eta unitateko prezio bat dituzte: $C(x)=F+vx$. Zuzen bat da: jatorriko ordenatua kostu finkoa da, eta malda unitateko prezioa. Bi tarifa alderatzeko, bi zuzenak berdintzen dira: ebaki-puntutik aurrera, malda txikiena duena da merkeena.',
            'Muchas tarifas tienen una parte fija y un precio por unidad: $C(x)=F+vx$. Es una recta: la ordenada en el origen es el coste fijo y la pendiente, el precio por unidad. Para comparar dos tarifas se igualan las dos rectas: a partir del punto de corte, la de menor pendiente es la más barata.',
            'لتعرفات كثيرة جزء ثابت وسعر للوحدة: $C(x)=F+vx$. إنه مستقيم: الجزء المقطوع من محور Y هو التكلفة الثابتة، والميل سعر الوحدة. ولمقارنة تعرفتين نساوي المستقيمين: بعد نقطة التقاطع تكون ذات الميل الأصغر هي الأرخص.',
            'Many tariffs have a fixed part and a price per unit: $C(x)=F+vx$. It is a line: the y-intercept is the fixed cost and the slope the price per unit. To compare two tariffs, set the two lines equal: beyond the crossing point, the one with the smaller slope is cheaper.'
        ),
        examplePrompt: say('Gimnasio batek 30 euroko matrikula eta hilean 25 € kobratzen ditu. Zenbat kostatzen da urtebete?', 'Un gimnasio cobra 30 € de matrícula y 25 € al mes. ¿Cuánto cuesta un año?', 'يتقاضى نادٍ رياضي 30 € للتسجيل و25 € شهريًّا. كم تكلّف سنة؟', 'A gym charges a €30 joining fee and €25 a month. How much does a year cost?'),
        example: same('$30+25\\cdot 12=330$'),
        exampleAnswer: say('330 €.', '330 €.', '330 €.', '€330.')
    },

    /* ---------- 3. Quadratic functions ---------- */
    parabola: {
        definitions: [
            { term: say('Erpina', 'Vértice', 'الرأس', 'Vertex'), meaning: say('Parabolaren punturik baxuena edo altuena.', 'El punto más bajo o más alto de la parábola.', 'أدنى نقطة في القطع المكافئ أو أعلاها.', 'The lowest or highest point of the parabola.') }
        ],
        vocabulary: [
            say('adarrak', 'ramas', 'الفرعان', 'branches'),
            say('simetria-ardatza', 'eje de simetría', 'محور التناظر', 'axis of symmetry')
        ],
        explanation: say(
            '$y=ax^2+bx+c$ funtzioaren grafikoa parabola bat da. $a>0$ bada, adarrak gora doaz eta erpina minimoa da; $a<0$ bada, behera, eta erpina maximoa da. Erpina $x=-\\frac{b}{2a}$ zuzenean dago, simetria-ardatzean. Ardatzekin ebaki-puntuak $x=0$ eginez eta $y=0$ ebatziz lortzen dira.',
            'La gráfica de $y=ax^2+bx+c$ es una parábola. Si $a>0$, las ramas van hacia arriba y el vértice es un mínimo; si $a<0$, hacia abajo, y el vértice es un máximo. El vértice está en $x=-\\frac{b}{2a}$, en el eje de simetría. Los cortes con los ejes salen de hacer $x=0$ y de resolver $y=0$.',
            'رسم $y=ax^2+bx+c$ قطع مكافئ. إذا كان $a>0$ فالفرعان إلى الأعلى والرأس قيمة صغرى، وإذا كان $a<0$ فإلى الأسفل والرأس قيمة عظمى. ويقع الرأس عند $x=-\\frac{b}{2a}$ على محور التناظر. ونحصل على نقاط التقاطع مع المحورين بوضع $x=0$ وبحل $y=0$.',
            'The graph of $y=ax^2+bx+c$ is a parabola. If $a>0$, the branches go up and the vertex is a minimum; if $a<0$, they go down and the vertex is a maximum. The vertex is at $x=-\\frac{b}{2a}$, on the axis of symmetry. The intercepts come from putting $x=0$ and from solving $y=0$.'
        ),
        examplePrompt: say('Aurkitu $y=-2x^2+8x-1$ parabolaren erpina.', 'Halla el vértice de $y=-2x^2+8x-1$.', 'أوجد رأس $y=-2x^2+8x-1$.', 'Find the vertex of $y=-2x^2+8x-1$.'),
        example: same('$x=-\\frac{8}{2\\cdot(-2)}=2\\qquad -2\\cdot 2^2+8\\cdot 2-1=7$'),
        exampleAnswer: say('Erpina $(2,7)$ da, eta maximoa, $a<0$ delako.', 'El vértice es $(2,7)$, y es un máximo porque $a<0$.', 'الرأس $(2,7)$ وهو قيمة عظمى لأن $a<0$.', 'The vertex is $(2,7)$, and it is a maximum because $a<0$.')
    },
    optimum: {
        definitions: [
            { term: say('Diru-sarrerak', 'Ingresos', 'الإيرادات', 'Revenue'), meaning: say('Salmentetatik jasotzen dena: prezioa bider saldutako kopurua.', 'Lo que se cobra por las ventas: precio por cantidad vendida.', 'ما يُقبض من المبيعات: السعر في الكمية المبيعة.', 'What is taken in from sales: price times quantity sold.') },
            { term: say('Mozkina', 'Beneficio', 'الربح', 'Profit'), meaning: say('Diru-sarrerak ken kostuak.', 'Los ingresos menos los costes.', 'الإيرادات ناقص التكاليف.', 'Revenue minus costs.') }
        ],
        vocabulary: [
            say('prezioa', 'precio', 'السعر', 'price'),
            say('kostuak', 'costes', 'التكاليف', 'costs'),
            say('unitateak', 'unidades', 'الوحدات', 'units')
        ],
        explanation: say(
            'Prezioa igotzean gutxiago saltzen da. Diru-sarrerak prezioa bider kopurua dira, eta parabola bat ematen dute, adarrak behera dituena. Mozkina diru-sarrerak ken kostuak da. Bietan, maximoa erpinean dago: lehenik erpinaren $x$ kalkulatzen da (prezioa edo unitateak), eta gero funtzioaren balioa.',
            'Al subir el precio se vende menos. Los ingresos son precio por cantidad y dan una parábola con las ramas hacia abajo. El beneficio es ingresos menos costes. En los dos casos el máximo está en el vértice: primero se calcula la $x$ del vértice (el precio o las unidades) y después el valor de la función.',
            'عندما يرتفع السعر تقل المبيعات. والإيرادات هي السعر في الكمية، وتعطي قطعًا مكافئًا فرعاه إلى الأسفل. والربح هو الإيرادات ناقص التكاليف. وفي الحالتين تقع القيمة العظمى عند الرأس: نحسب أولًا $x$ الرأس (السعر أو الوحدات) ثم قيمة الدالة.',
            'When the price goes up, less is sold. Revenue is price times quantity and gives a parabola with its branches down. Profit is revenue minus costs. In both cases the maximum is at the vertex: first work out the $x$ of the vertex (the price or the units) and then the value of the function.'
        ),
        examplePrompt: say('Enpresa baten mozkina $B(x)=-0{,}5x^2+40x-300$ euro da, $x$ unitate saltzean. Zenbat unitaterekin da handiena, eta zenbatekoa da?', 'El beneficio de una empresa es $B(x)=-0{,}5x^2+40x-300$ euros al vender $x$ unidades. ¿Con cuántas unidades es máximo y cuánto vale?', 'ربح شركة $B(x)=-0{,}5x^2+40x-300$ يورو عند بيع $x$ وحدة. عند كم وحدة يكون أكبر ما يمكن، وكم يساوي؟', 'A firm makes a profit of $B(x)=-0{,}5x^2+40x-300$ euros by selling $x$ units. For how many units is it greatest, and how much is it?'),
        example: same('$x=-\\frac{40}{2\\cdot(-0{,}5)}=40\\qquad -0{,}5\\cdot 40^2+40\\cdot 40-300=500$'),
        exampleAnswer: say('40 unitaterekin, eta 500 euroko mozkina.', 'Con 40 unidades, y el beneficio es de 500 €.', 'عند 40 وحدة، والربح 500 €.', 'With 40 units, and the profit is €500.'),
        why: {
            text: say('Zergatik erpinean? Parabola simetrikoa da: bi aldeetan berdin igo eta jaisten da. Punturik altuena simetria-ardatzean dago, X ardatzarekiko bi ebaki-puntuen erdian.', '¿Por qué en el vértice? La parábola es simétrica: sube y baja igual a los dos lados. El punto más alto está en el eje de simetría, a medio camino entre los dos cortes con el eje X.', 'لماذا عند الرأس؟ القطع المكافئ متناظر: يصعد وينزل بالقدر نفسه على الجانبين. وأعلى نقطة على محور التناظر، في منتصف المسافة بين نقطتي التقاطع مع محور X.', 'Why at the vertex? The parabola is symmetric: it rises and falls the same on both sides. The highest point is on the axis of symmetry, halfway between the two crossings with the x-axis.')
        }
    },
    'three-points': {
        definitions: [
            { term: say('Interpolazio parabolikoa', 'Interpolación parabólica', 'الاستيفاء التربيعي', 'Parabolic interpolation'), meaning: say('Hiru datutatik pasatzen den parabolarekin estimatzea.', 'Estimar con la parábola que pasa por tres datos.', 'التقدير بالقطع المكافئ المار بثلاث بيانات.', 'Estimating with the parabola through three data.') }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('lerrokatuta', 'alineados', 'على استقامة واحدة', 'in a line')
        ],
        explanation: say(
            'Hiru puntutatik, $x$ desberdinekin, parabola bakarra pasatzen da. Newtonen metodoak horrela idazten du: $y=a+b(x-x_1)+c(x-x_1)(x-x_2)$. Lehen puntuak $a$ ematen du; bigarrenak, $b$; eta hirugarrenak, $c$. Datuak kurbatzen direnean, zuzena baino hobeto estimatzen du.',
            'Por tres puntos con $x$ distintas pasa una sola parábola. El método de Newton la escribe así: $y=a+b(x-x_1)+c(x-x_1)(x-x_2)$. El primer punto da $a$; el segundo, $b$; y el tercero, $c$. Cuando los datos se curvan, estima mejor que la recta.',
            'يمر بثلاث نقاط مختلفة الإحداثي $x$ قطع مكافئ واحد. وتكتبه طريقة نيوتن هكذا: $y=a+b(x-x_1)+c(x-x_1)(x-x_2)$. النقطة الأولى تعطي $a$، والثانية $b$، والثالثة $c$. وعندما تنحني البيانات يقدّر أفضل من المستقيم.',
            'Through three points with different $x$ there passes a single parabola. Newton\'s method writes it like this: $y=a+b(x-x_1)+c(x-x_1)(x-x_2)$. The first point gives $a$; the second, $b$; and the third, $c$. When the data curve, it estimates better than the line.'
        ),
        examplePrompt: say('$(0,10)$, $(2,14)$ eta $(4,22)$ datuekin, estimatu $y$ balioa $x=3$ denean, parabolarekin.', 'Con los datos $(0,10)$, $(2,14)$ y $(4,22)$, estima $y$ en $x=3$ con la parábola.', 'بالبيانات $(0,10)$ و$(2,14)$ و$(4,22)$، قدّر $y$ عند $x=3$ بالقطع المكافئ.', 'With the data $(0,10)$, $(2,14)$ and $(4,22)$, estimate $y$ at $x=3$ with the parabola.'),
        example: same('$10+2\\cdot 3+0{,}5\\cdot 3\\cdot 1=17{,}5$'),
        exampleAnswer: say('$a=10$, $b=2$ eta $c=0{,}5$ ateratzen dira: estimazioa 17,5 da.', 'Salen $a=10$, $b=2$ y $c=0{,}5$: la estimación es 17,5.', 'نحصل على $a=10$ و$b=2$ و$c=0{,}5$: التقدير 17.5.', 'You get $a=10$, $b=2$ and $c=0{,}5$: the estimate is 17.5.'),
        why: {
            text: say('Zergatik Newton? Gai bakoitza 0 da aurreko puntuetan: $(x-x_1)$ gaia 0 da lehen puntuan. Horregatik, puntu bakoitzak koefiziente berri bat baino ez du askatzen, eta ez dago sistemarik ebatzi beharrik.', '¿Por qué Newton? Cada término vale 0 en los puntos anteriores: $(x-x_1)$ es 0 en el primer punto. Por eso cada punto solo despeja un coeficiente nuevo y no hace falta resolver ningún sistema.', 'لماذا نيوتن؟ كل حد يساوي 0 عند النقاط السابقة: $(x-x_1)$ يساوي 0 عند النقطة الأولى. ولذلك تعطي كل نقطة معاملًا جديدًا واحدًا، ولا حاجة إلى حل نظام.', 'Why Newton? Each term is 0 at the earlier points: $(x-x_1)$ is 0 at the first point. So each point only gives one new coefficient, and no system needs solving.')
        }
    },

    /* ---------- 4. Inverse proportion and roots ---------- */
    'inverse-prop': {
        definitions: [
            { term: say('Asintota', 'Asíntota', 'الخط المقارب', 'Asymptote'), meaning: say('Grafikoa gero eta gehiago hurbiltzen zaion zuzena, ukitu gabe.', 'Una recta a la que la gráfica se acerca cada vez más sin tocarla.', 'مستقيم يقترب منه الرسم أكثر فأكثر دون أن يلمسه.', 'A line the graph gets closer and closer to without touching it.') }
        ],
        vocabulary: [
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('konstantea', 'constante', 'ثابت', 'constant')
        ],
        explanation: say(
            'Bi magnitude alderantziz proportzionalak dira haien biderkadura konstantea denean: $x\\cdot y=k$, hau da, $y=\\frac{k}{x}$. $x$ bikoizten bada, $y$ erdira jaisten da. Grafikoa hiperbola bat da, eta ardatzak ditu asintota: $y$ ez da inoiz 0, eta $x$ ezin da 0 izan.',
            'Dos magnitudes son inversamente proporcionales cuando su producto es constante: $x\\cdot y=k$, es decir, $y=\\frac{k}{x}$. Si $x$ se duplica, $y$ se reduce a la mitad. La gráfica es una hipérbola con los ejes como asíntotas: $y$ nunca vale 0 y $x$ no puede ser 0.',
            'تكون كميتان متناسبتين عكسيًّا عندما يكون جداؤهما ثابتًا: $x\\cdot y=k$، أي $y=\\frac{k}{x}$. إذا تضاعفت $x$ نقصت $y$ إلى النصف. والرسم قطع زائد خطاه المقاربان هما المحوران: $y$ لا تساوي 0 أبدًا و$x$ لا يمكن أن تكون 0.',
            'Two quantities are inversely proportional when their product is constant: $x\\cdot y=k$, that is, $y=\\frac{k}{x}$. If $x$ doubles, $y$ halves. The graph is a hyperbola with the axes as asymptotes: $y$ is never 0 and $x$ cannot be 0.'
        ),
        examplePrompt: say('360 km-ko bidaia bat egiteko denbora $v$ abiaduraren menpe dago. Zenbat ordu behar dira 90 km/h abiaduran?', 'El tiempo de un viaje de 360 km depende de la velocidad $v$. ¿Cuántas horas hacen falta a 90 km/h?', 'زمن رحلة طولها 360 كم يتعلق بالسرعة $v$. كم ساعة نحتاج بسرعة 90 km/h؟', 'The time of a 360 km trip depends on the speed $v$. How many hours are needed at 90 km/h?'),
        example: same('$t=\\frac{360}{90}=4$'),
        exampleAnswer: say('4 ordu. $v\\cdot t=360$ konstantea da.', '4 horas. $v\\cdot t=360$ es constante.', '4 ساعات. $v\\cdot t=360$ ثابت.', '4 hours. $v\\cdot t=360$ is constant.')
    },
    'average-cost': {
        definitions: [
            { term: say('Batez besteko kostua', 'Coste medio', 'التكلفة المتوسطة', 'Average cost'), meaning: say('Unitate bakoitzari dagokion kostua: kostu osoa zati unitate kopurua.', 'Lo que cuesta cada unidad: el coste total entre el número de unidades.', 'ما تكلّفه كل وحدة: التكلفة الكلية مقسومة على عدد الوحدات.', 'What each unit costs: the total cost divided by the number of units.') }
        ],
        vocabulary: [
            say('asintota horizontala', 'asíntota horizontal', 'الخط المقارب الأفقي', 'horizontal asymptote'),
            say('lekualdatuta', 'trasladada', 'منسحبة', 'shifted')
        ],
        explanation: say(
            '$y=a+\\frac{k}{x-b}$ funtzioa $y=\\frac{k}{x}$ hiperbola lekualdatuta da: asintotak $x=b$ eta $y=a$ dira. $C(x)=F+vx$ kostu baten batez besteko kostua $\\frac{C(x)}{x}=v+\\frac{F}{x}$ da: ekoizpena handitzean, kostu finkoa unitate gehiagotan banatzen da, eta batez besteko kostua $v$ baliora jaisten da.',
            '$y=a+\\frac{k}{x-b}$ es la hipérbola $y=\\frac{k}{x}$ trasladada: sus asíntotas son $x=b$ e $y=a$. El coste medio de un coste $C(x)=F+vx$ es $\\frac{C(x)}{x}=v+\\frac{F}{x}$: al producir más, el coste fijo se reparte entre más unidades y el coste medio baja hacia $v$.',
            '$y=a+\\frac{k}{x-b}$ هي القطع الزائد $y=\\frac{k}{x}$ منسحبًا: خطاه المقاربان $x=b$ و$y=a$. والتكلفة المتوسطة لتكلفة $C(x)=F+vx$ هي $\\frac{C(x)}{x}=v+\\frac{F}{x}$: عند إنتاج المزيد تتوزع التكلفة الثابتة على وحدات أكثر فتنخفض التكلفة المتوسطة نحو $v$.',
            '$y=a+\\frac{k}{x-b}$ is the hyperbola $y=\\frac{k}{x}$ shifted: its asymptotes are $x=b$ and $y=a$. The average cost of a cost $C(x)=F+vx$ is $\\frac{C(x)}{x}=v+\\frac{F}{x}$: as more is produced, the fixed cost is shared among more units and the average cost falls towards $v$.'
        ),
        examplePrompt: say('Idatzi $y=\\frac{3x+5}{x+1}$ funtzioa $a+\\frac{k}{x+1}$ moduan, eta eman haren asintotak.', 'Escribe $y=\\frac{3x+5}{x+1}$ como $a+\\frac{k}{x+1}$ y da sus asíntotas.', 'اكتب $y=\\frac{3x+5}{x+1}$ على صورة $a+\\frac{k}{x+1}$ واذكر خطيها المقاربين.', 'Write $y=\\frac{3x+5}{x+1}$ as $a+\\frac{k}{x+1}$ and give its asymptotes.'),
        example: same('$\\frac{3x+5}{x+1}=\\frac{3(x+1)+2}{x+1}=3+\\frac{2}{x+1}$'),
        exampleAnswer: say('Asintotak $x=-1$ eta $y=3$ dira.', 'Las asíntotas son $x=-1$ e $y=3$.', 'الخطان المقاربان هما $x=-1$ و$y=3$.', 'The asymptotes are $x=-1$ and $y=3$.'),
        why: {
            text: say('Zergatik ez da inoiz $v$ baliora iristen? $\\frac{F}{x}$ zatia txikia egiten da, baina beti da positiboa: unitate bakoitzak kostu finkoaren zati txiki bat ordaintzen jarraitzen du.', '¿Por qué nunca llega a $v$? La parte $\\frac{F}{x}$ se hace pequeña, pero siempre es positiva: cada unidad sigue pagando un trocito del coste fijo.', 'لماذا لا تبلغ $v$ أبدًا؟ الجزء $\\frac{F}{x}$ يصغر لكنه موجب دائمًا: كل وحدة تظل تدفع جزءًا صغيرًا من التكلفة الثابتة.', 'Why does it never reach $v$? The part $\\frac{F}{x}$ gets small, but it is always positive: each unit still pays a little piece of the fixed cost.')
        }
    },
    root: {
        definitions: [
            { term: say('Erro-funtzioa', 'Función raíz', 'دالة الجذر', 'Root function'), meaning: say('$x$ aldagaia erro baten barruan duen funtzioa, $y=\\sqrt{x}$ bezala.', 'Una función con la $x$ dentro de una raíz, como $y=\\sqrt{x}$.', 'دالة فيها $x$ تحت جذر، مثل $y=\\sqrt{x}$.', 'A function with $x$ inside a root, like $y=\\sqrt{x}$.') }
        ],
        vocabulary: [
            say('adarra', 'rama', 'الفرع', 'branch'),
            say('hasiera-puntua', 'punto de partida', 'نقطة البداية', 'starting point')
        ],
        explanation: say(
            '$y=\\sqrt{x}$ funtzioaren grafikoa parabola baten adar erdia da: $(0,0)$ puntuan hasten da, eta gero eta astiroago hazten da. $y=\\sqrt{x-a}+b$ funtzioa $(a,b)$ puntuan hasten da, eta haren izate-eremua $[a,+\\infty)$ da. Ekonomian, adibidez, ekoizpenak batzuetan horrela egiten du gora lan-orduekin.',
            'La gráfica de $y=\\sqrt{x}$ es media rama de parábola: empieza en $(0,0)$ y crece cada vez más despacio. $y=\\sqrt{x-a}+b$ empieza en $(a,b)$ y su dominio es $[a,+\\infty)$. En economía, por ejemplo, la producción a veces crece así con las horas de trabajo.',
            'رسم $y=\\sqrt{x}$ نصف فرع قطع مكافئ: يبدأ من $(0,0)$ ويتزايد ببطء متزايد. و$y=\\sqrt{x-a}+b$ تبدأ من $(a,b)$ ومجالها $[a,+\\infty)$. وفي الاقتصاد مثلًا قد يزداد الإنتاج هكذا مع ساعات العمل.',
            'The graph of $y=\\sqrt{x}$ is half a branch of a parabola: it starts at $(0,0)$ and grows more and more slowly. $y=\\sqrt{x-a}+b$ starts at $(a,b)$ and its domain is $[a,+\\infty)$. In economics, for example, output sometimes grows like this with the hours of work.'
        ),
        examplePrompt: say('Lantegi baten ekoizpena $P(h)=10\\sqrt{h}$ pieza da $h$ ordutan. Zenbat pieza egiten dira 16 ordutan?', 'La producción de un taller es $P(h)=10\\sqrt{h}$ piezas en $h$ horas. ¿Cuántas piezas se hacen en 16 horas?', 'إنتاج ورشة $P(h)=10\\sqrt{h}$ قطعة في $h$ ساعة. كم قطعة تُصنع في 16 ساعة؟', 'A workshop produces $P(h)=10\\sqrt{h}$ pieces in $h$ hours. How many pieces are made in 16 hours?'),
        example: same('$10\\sqrt{16}=10\\cdot 4=40$'),
        exampleAnswer: say('40 pieza: ordu kopurua 4 aldiz handituta, ekoizpena 2 aldiz baino ez da handitzen.', '40 piezas: con cuatro veces más horas, la producción solo se duplica.', '40 قطعة: بأربعة أضعاف الساعات يتضاعف الإنتاج مرتين فقط.', '40 pieces: with four times the hours, output only doubles.')
    },

    /* ---------- 5. Piecewise functions ---------- */
    piecewise: {
        definitions: [
            { term: say('Zatika definitutako funtzioa', 'Función a trozos', 'دالة معرّفة على أجزاء', 'Piecewise function'), meaning: say('Tarte bakoitzean formula desberdin bat duen funtzioa.', 'Una función con una fórmula distinta en cada tramo.', 'دالة لها صيغة مختلفة في كل مجال جزئي.', 'A function with a different formula on each stretch.') }
        ],
        vocabulary: [
            say('tartea', 'tramo', 'المجال الجزئي', 'stretch'),
            say('jauzia', 'salto', 'القفزة', 'jump')
        ],
        explanation: say(
            'Prezio eta tarifa askok araua aldatzen dute kopuru batetik aurrera: zatika definitutako funtzioak dira. Zati bakoitza bere tartean bakarrik da baliozkoa. $f(a)$ kalkulatzeko, lehenik begiratu zein tartetan dagoen $a$. Grafikoan, puntu betea jartzen da $\\le$ edo $\\ge$ dagoen lekuan, eta hutsa $<$ edo $>$ dagoen lekuan.',
            'Muchos precios y tarifas cambian de regla a partir de una cantidad: son funciones a trozos. Cada trozo vale solo en su tramo. Para calcular $f(a)$, mira primero en qué tramo está $a$. En la gráfica se pone punto lleno donde hay $\\le$ o $\\ge$ y hueco donde hay $<$ o $>$.',
            'كثير من الأسعار والتعرفات تغيّر قاعدتها ابتداءً من كمية ما: إنها دوال معرّفة على أجزاء. وكل جزء صالح في مجاله الجزئي فقط. ولحساب $f(a)$ انظر أولًا في أي مجال جزئي تقع $a$. وفي الرسم نضع نقطة مملوءة حيث يوجد $\\le$ أو $\\ge$ ونقطة مفرغة حيث يوجد $<$ أو $>$.',
            'Many prices and tariffs change their rule beyond a certain amount: they are piecewise functions. Each piece only holds on its own stretch. To work out $f(a)$, first look at which stretch $a$ is in. On the graph, put a filled dot where there is $\\le$ or $\\ge$ and a hollow one where there is $<$ or $>$.'
        ),
        examplePrompt: say('$g(x)=\\begin{cases}x^2 & x<1\\\\ 4-x & x\\ge 1\\end{cases}$ bada, kalkulatu $g(-3)$ eta $g(5)$.', 'Si $g(x)=\\begin{cases}x^2 & x<1\\\\ 4-x & x\\ge 1\\end{cases}$, calcula $g(-3)$ y $g(5)$.', 'إذا كانت $g(x)=\\begin{cases}x^2 & x<1\\\\ 4-x & x\\ge 1\\end{cases}$، فاحسب $g(-3)$ و$g(5)$.', 'If $g(x)=\\begin{cases}x^2 & x<1\\\\ 4-x & x\\ge 1\\end{cases}$, work out $g(-3)$ and $g(5)$.'),
        example: same('$(-3)^2=9\\qquad 4-5=-1$'),
        exampleAnswer: say('$-3<1$: lehen zatia, 9. $5\\ge 1$: bigarren zatia, $-1$.', '$-3<1$: primer trozo, 9. $5\\ge 1$: segundo trozo, $-1$.', '$-3<1$: الجزء الأول، 9. و$5\\ge 1$: الجزء الثاني، $-1$.', '$-3<1$: first piece, 9. $5\\ge 1$: second piece, $-1$.')
    },
    'piecewise-model': {
        definitions: [
            { term: say('Muga', 'Límite del tramo', 'حدّ المجال الجزئي', 'Threshold'), meaning: say('Araua aldatzen den kopurua.', 'La cantidad en la que cambia la regla.', 'الكمية التي تتغير عندها القاعدة.', 'The amount at which the rule changes.') }
        ],
        vocabulary: [
            say('metatua', 'acumulado', 'المتراكم', 'accumulated'),
            say('gehigarria', 'extra', 'الإضافي', 'extra')
        ],
        explanation: say(
            'Enuntziatu batetik funtzioa idazteko, bilatu araua non aldatzen den. Lehen zatia zuzenean idazten da. Mugaz gaindiko zatian, mugaraino metatutakoa gehi muga gainditzen duen zatiaren kostua idazten da. Azkenik, egiaztatu zatiak mugan elkartzen direla.',
            'Para escribir la función a partir de un enunciado, busca dónde cambia la regla. El primer trozo se escribe directamente. En el trozo de después del límite se escribe lo acumulado hasta el límite más lo que cuesta la parte que lo pasa. Al final, comprueba que los trozos se unen en el límite.',
            'لكتابة الدالة انطلاقًا من نص المسألة، ابحث أين تتغير القاعدة. يُكتب الجزء الأول مباشرة. وفي الجزء الذي بعد الحدّ نكتب المتراكم حتى الحدّ مضافًا إليه تكلفة ما يتجاوزه. وفي النهاية تحقق من أن الجزأين يتصلان عند الحدّ.',
            'To write the function from a statement, look for where the rule changes. The first piece is written straight away. In the piece after the threshold, write what has accumulated up to the threshold plus the cost of the part beyond it. Finally, check that the pieces join at the threshold.'
        ),
        examplePrompt: say('Ur-ordainagiri bat: 8 € finko, 0,5 € m³ bakoitzeko 10 m³ arte, eta 1 € m³ bakoitzeko hortik aurrera. Zenbat ordaintzen da 16 m³ kontsumituta?', 'Un recibo de agua: 8 € fijos, 0,5 € por m³ hasta 10 m³ y 1 € por m³ a partir de ahí. ¿Cuánto se paga por 16 m³?', 'فاتورة ماء: 8 € ثابتة و0.5 € لكل m³ حتى 10 m³ و1 € لكل m³ بعد ذلك. كم يُدفع مقابل 16 m³؟', 'A water bill: €8 fixed, €0.5 per m³ up to 10 m³ and €1 per m³ after that. How much is paid for 16 m³?'),
        example: same('$8+0{,}5\\cdot 10+1\\cdot(16-10)=19$'),
        exampleAnswer: say('19 €.', '19 €.', '19 €.', '€19.')
    },
    absolute: {
        definitions: [
            { term: say('Funtzio baten balio absolutua', 'Valor absoluto de una función', 'القيمة المطلقة لدالة', 'Absolute value of a function'), meaning: say('$y=|f(x)|$: $f$ da, $f$ positiboa den lekuan; eta $f$ zeinua aldatuta, negatiboa den lekuan.', '$y=|f(x)|$: es $f$ donde $f$ es positiva y $f$ con el signo cambiado donde es negativa.', '$y=|f(x)|$: تساوي $f$ حيث $f$ موجبة، و$f$ بإشارة معكوسة حيث تكون سالبة.', '$y=|f(x)|$: it is $f$ where $f$ is positive, and $f$ with its sign changed where it is negative.') }
        ],
        vocabulary: [
            say('erroak', 'raíces', 'الجذور', 'roots'),
            say('tolestu', 'doblar', 'يُطوى', 'fold')
        ],
        explanation: say(
            '$|f(x)|$ zatika idazteko, aurkitu $f$ funtzioaren erroak eta begiratu non den negatiboa: tarte horietan zeinua aldatzen zaio, eta beste tarteetan bere horretan geratzen da. Grafikoan, X ardatzaren azpian zegoen zatia gora tolestu behar da.',
            'Para escribir $|f(x)|$ a trozos, halla las raíces de $f$ y mira dónde es negativa: en esos tramos se le cambia el signo y en los demás se queda igual. En la gráfica, el trozo que estaba debajo del eje X hay que doblarlo hacia arriba.',
            'لكتابة $|f(x)|$ على أجزاء، أوجد جذور $f$ وانظر أين تكون سالبة: في تلك المجالات نغيّر إشارتها، وفي غيرها تبقى كما هي. وفي الرسم يجب طيّ الجزء الذي كان تحت محور X إلى الأعلى.',
            'To write $|f(x)|$ piecewise, find the roots of $f$ and see where it is negative: on those stretches its sign is changed, and on the others it stays the same. On the graph, the piece that was below the x-axis has to be folded up.'
        ),
        examplePrompt: say('Idatzi $y=|2x-6|$ zatika.', 'Escribe $y=|2x-6|$ a trozos.', 'اكتب $y=|2x-6|$ على أجزاء.', 'Write $y=|2x-6|$ piecewise.'),
        example: same('$y=\\begin{cases}-2x+6 & x<3\\\\ 2x-6 & x\\ge 3\\end{cases}$'),
        exampleAnswer: say('$2x-6$ negatiboa da $x<3$ denean.', '$2x-6$ es negativa cuando $x<3$.', '$2x-6$ سالبة عندما $x<3$.', '$2x-6$ is negative when $x<3$.'),
        why: {
            text: say('Zergatik tolesten da gora? $|f|$ funtzioak positiboa dena bere horretan uzten du, eta negatiboari zeinua aldatzen dio: $(a,-3)$ puntua $(a,3)$ bihurtzen da, X ardatzarekiko bere simetrikoa.', '¿Por qué se dobla hacia arriba? $|f|$ deja igual lo positivo y cambia el signo de lo negativo: el punto $(a,-3)$ pasa a $(a,3)$, su simétrico respecto del eje X.', 'لماذا يُطوى إلى الأعلى؟ $|f|$ تترك الموجب كما هو وتغيّر إشارة السالب: النقطة $(a,-3)$ تصبح $(a,3)$، وهي متناظرتها حول محور X.', 'Why is it folded up? $|f|$ leaves what is positive as it is and changes the sign of what is negative: the point $(a,-3)$ becomes $(a,3)$, its reflection in the x-axis.')
        }
    }
}
