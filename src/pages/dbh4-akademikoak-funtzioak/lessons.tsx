import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { FormulaFigure, FunctionTestFigure } from '../dbh2-funtzioak-v2/figures'
import { ContinuityFigure, DomainGraphFigure, ExtremaFigure, PeriodicFigure, RateFigure } from '../dbh4-aplikatuak-funtzioak/figures'
import {
    CubicInterceptsFigure,
    DomainCasesFigure,
    JoinFigure,
    PiecewiseFigure,
    RationalDomainFigure,
    SignChartFigure,
    SignFigure,
    SymmetryFigure
} from './figures'
import { same, say } from './text'

/* ==========================================================================
   Funtzioak · 4. DBH akademikoak — stages and lessons, following Anaya
   4.º Académicas unit 4 (Funciones. Características: basic concepts,
   images, the domain of fractions and roots, continuity and
   discontinuities, increasing and decreasing, the average rate of change,
   tendency and periodicity) and Santillana 4.º Académicas unit 9
   (Funciones: domain and range, intercepts of polynomials, symmetry, even
   and odd functions, and functions defined piecewise).
   ========================================================================== */

export type FunctionsAkStageId = 'concept' | 'domain' | 'continuity' | 'features' | 'change'

export const functionsAkStages: UnitStage[] = [
    { id: 'concept', tone: 'blue', title: { eu: 'Funtzioak eta grafikoak', es: 'Funciones y gráficas', ar: 'الدوال والرسوم' } },
    { id: 'domain', tone: 'violet', title: { eu: 'Izate-eremua', es: 'Dominio de definición', ar: 'مجال التعريف' } },
    { id: 'continuity', tone: 'mustard', title: { eu: 'Jarraitutasuna eta zatiak', es: 'Continuidad y trozos', ar: 'الاتصال والأجزاء' } },
    { id: 'features', tone: 'coral', title: { eu: 'Ebakidurak, zeinua, simetria', es: 'Cortes, signo, simetría', ar: 'التقاطع والإشارة والتناظر' } },
    { id: 'change', tone: 'green', title: { eu: 'Hazkundea eta periodoa', es: 'Crecimiento y periodo', ar: 'التزايد والدورية' } }
]

export const functionsAkTopics: UnitTopic[] = [
    /* ---------- 1. Functions and graphs ---------- */
    {
        id: 'what-is',
        stage: 'concept',
        title: say('Funtzioak eta aldagaiak', 'Funciones y variables', 'الدوال والمتغيرات'),
        goal: say('Erlazio bat funtzioa den erabakitzea, aldagai askea eta menpekoa bereiztea eta grafiko bat funtzioarena den egiaztatzea.', 'Decidir si una relación es una función, distinguir la variable independiente de la dependiente y comprobar si una gráfica es de una función.', 'تقرير ما إذا كانت علاقة دالة، والتمييز بين المتغير المستقل والتابع، والتحقق مما إذا كان رسم ما لدالة.'),
        explanation: say(
            'Funtzio bat bi aldagairen arteko erlazioa da, non aldagai askearen ($x$) balio bakoitzari menpeko aldagaiaren ($y$) balio bakar bat dagokion: $y=f(x)$. Txorrota batetik ateratzen den uraren tenperatura denboraren funtzioa da: minutu bakoitzean tenperatura bakarra dago. Arrapala batetik erortzen den bola baten distantzia ere bai: $e=10t^{2}$ (cm, s). Ez dira funtzio $y^{2}=x$ bezalako erlazioak, $x=4$ balioari $y=2$ eta $y=-2$ dagozkiolako. Grafikoan begiratzeko, irudikatu zuzen bertikalak: batek ere ez du kurba bi puntutan baino gehiagotan ebaki behar; bitan ebakitzen badu, ez da funtzioa. $y$-ren balio bera $x$ askorentzat errepika daiteke: $y=x^{2}$ funtzioan $f(3)=f(-3)=9$.',
            'Una función es una relación entre dos variables en la que a cada valor de la variable independiente ($x$) le corresponde un único valor de la variable dependiente ($y$): $y=f(x)$. La temperatura del agua que sale de un grifo es función del tiempo: en cada minuto hay una sola temperatura. También la distancia que recorre una bola que cae por un raíl: $e=10t^{2}$ (cm, s). No son funciones relaciones como $y^{2}=x$, porque a $x=4$ le corresponden $y=2$ e $y=-2$. Para mirarlo en la gráfica, imagina rectas verticales: ninguna debe cortar a la curva en más de un punto; si alguna la corta dos veces, no es función. En cambio, un mismo valor de $y$ puede repetirse para varias $x$: en $y=x^{2}$, $f(3)=f(-3)=9$.',
            'الدالة علاقة بين متغيرين يقابل فيها كلَّ قيمة للمتغير المستقل ($x$) قيمةٌ واحدة فقط للمتغير التابع ($y$): $y=f(x)$. حرارة الماء الخارج من صنبور دالة في الزمن: في كل دقيقة حرارة واحدة. وكذلك المسافة التي تقطعها كرة تنزلق على سكة: $e=10t^{2}$ (سم، ث). ليست دوالَّ علاقاتٌ مثل $y^{2}=x$، لأن $x=4$ يقابله $y=2$ و$y=-2$. وللتحقق في الرسم تخيّل مستقيمات رأسية: لا يجوز أن يقطع أيٌّ منها المنحنى في أكثر من نقطة؛ فإن قطعه مرتين فليست دالة. أما قيمة $y$ نفسها فيمكن أن تتكرر لعدة قيم $x$: في $y=x^{2}$ لدينا $f(3)=f(-3)=9$.'
        ),
        problem: say('$y^{2}=x$ erlazioa funtzioa da? Eta $y=x^{2}$?', '¿Es función la relación $y^{2}=x$? ¿Y $y=x^{2}$?', 'هل العلاقة $y^{2}=x$ دالة؟ وماذا عن $y=x^{2}$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x=4$ jarri lehenengoan: bi $y$.', 'Pon $x=4$ en la primera: dos $y$.', 'ضع $x=4$ في الأولى: قيمتان لـ $y$.'), math: same('$y^{2}=4\\ \\to\\ y=2,\\ y=-2$') },
            { text: say('Bigarrenean $x$ bakoitzak $y$ bakarra du: funtzioa da.', 'En la segunda cada $x$ da una sola $y$: es función.', 'في الثانية تعطي كل $x$ قيمة $y$ واحدة: إنها دالة.'), math: same('$f(4)=16$') }
        ],
        example: same('$y=f(x)$'),
        takeaway: say('Funtzioa: x bakoitzeko y bakarra. Zuzen bertikal batek ez du kurba bitan ebakitzen.', 'Función: cada x, una sola y. Ninguna recta vertical corta la curva dos veces.', 'الدالة: لكل x قيمة y واحدة. لا يقطع أي مستقيم رأسي المنحنى مرتين.'),
        figure: (language) => <FunctionTestFigure language={language} />
    },
    {
        id: 'images',
        stage: 'concept',
        title: say('Irudiak eta aurreirudiak', 'Imágenes y antiimágenes', 'الصور والأصول'),
        goal: say('Formula batekin irudiak kalkulatzea eta irudi jakin bat duten x-ak aurkitzea ekuazio bat ebatziz.', 'Calcular imágenes con una fórmula y encontrar las x que tienen una imagen dada resolviendo una ecuación.', 'حساب الصور بصيغة، وإيجاد قيم x التي لها صورة معطاة بحل معادلة.'),
        explanation: say(
            '$f(a)$ da $a$-ren irudia: $x$-ren ordez $a$ parentesi artean jarri eta kalkulatzen dena. $f(x)=x^{2}-2x$ bada, $f(-3)=(-3)^{2}-2\\cdot(-3)=15$. $(a,\\,b)$ puntua grafikoan dago $f(a)=b$ bada. Alderantzizko galdera (zein $x$-k du $b$ irudia?) ekuazio bat da: $f(x)=b$. Adibidez, plano inklinatu batean $e=0{,}1t^{2}$ (m, s) bada, 2 m egiteko behar den denbora $0{,}1t^{2}=2$ ebatzita lortzen da: $t^{2}=20$, $t=\\sqrt{20}\\approx 4{,}47$ s; soluzio negatiboa baztertzen da, denbora ezin delako negatiboa izan. Aurreirudi bat baino gehiago egon daiteke, bat ere ez, edo bakarra.',
            '$f(a)$ es la imagen de $a$: lo que sale al poner $a$ entre paréntesis en lugar de $x$. Si $f(x)=x^{2}-2x$, $f(-3)=(-3)^{2}-2\\cdot(-3)=15$. El punto $(a,\\,b)$ está en la gráfica si $f(a)=b$. La pregunta al revés (¿qué $x$ tienen imagen $b$?) es una ecuación: $f(x)=b$. Por ejemplo, si en un plano inclinado $e=0{,}1t^{2}$ (m, s), el tiempo para recorrer 2 m sale de resolver $0{,}1t^{2}=2$: $t^{2}=20$, $t=\\sqrt{20}\\approx 4{,}47$ s; la solución negativa se descarta porque el tiempo no puede ser negativo. Puede haber varias antiimágenes, ninguna o una sola.',
            '$f(a)$ صورة $a$: ما ينتج عن وضع $a$ بين قوسين مكان $x$. إذا كان $f(x)=x^{2}-2x$ فإن $f(-3)=(-3)^{2}-2\\cdot(-3)=15$. وتقع النقطة $(a,\\,b)$ على الرسم إذا كان $f(a)=b$. والسؤال المعاكس (ما قيم $x$ التي صورتها $b$؟) معادلة: $f(x)=b$. مثلًا إذا كان $e=0{,}1t^{2}$ (م، ث) على مستوى مائل، فزمن قطع 2 م يأتي من حل $0{,}1t^{2}=2$: $t^{2}=20$، $t=\\sqrt{20}\\approx 4{,}47$ ث؛ ويُستبعد الحل السالب لأن الزمن لا يكون سالبًا. قد توجد عدة أصول أو لا يوجد أيٌّ منها أو أصل واحد.'
        ),
        problem: say('$f(x)=x^{2}-2x$ izanik, kalkulatu $f(-3)$ eta $f(x)=3$ betetzen duten x-ak.', 'Siendo $f(x)=x^{2}-2x$, calcula $f(-3)$ y las x que cumplen $f(x)=3$.', 'إذا كان $f(x)=x^{2}-2x$ فاحسب $f(-3)$ وقيم x التي تحقق $f(x)=3$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu parentesi artean.', 'Sustituye entre paréntesis.', 'عوّض بين قوسين.'), math: same('$f(-3)=9+6=15$') },
            { text: say('Berdindu 3ri eta ebatzi.', 'Iguala a 3 y resuelve.', 'ساوِ بـ 3 وحُلّ.'), math: same('$x^{2}-2x-3=0$') },
            { text: say('Bi aurreirudi.', 'Dos antiimágenes.', 'أصلان.'), math: same('$x=3,\\ x=-1$') }
        ],
        example: same('$f(-3)=15$'),
        takeaway: say('Irudia: ordeztu eta kalkulatu. Aurreirudia: ebatzi ekuazioa eta begiratu zentzua duen.', 'Imagen: sustituye y calcula. Antiimagen: resuelve la ecuación y mira si tiene sentido.', 'الصورة: عوّض واحسب. الأصل: حُلّ المعادلة وتأكد من أن للحل معنى.'),
        figure: (language) => <FormulaFigure language={language} />
    },
    {
        id: 'range-graph',
        stage: 'concept',
        title: say('Izate-eremua eta ibiltartea grafikoan', 'Dominio y recorrido en la gráfica', 'المجال والمدى في الرسم'),
        goal: say('Grafiko baten izate-eremua eta ibiltartea irakurtzea eta tarte eta bildura gisa idaztea.', 'Leer el dominio y el recorrido de una gráfica y escribirlos como intervalos y uniones.', 'قراءة مجال الرسم ومداه وكتابتهما فترات واتحادات.'),
        explanation: say(
            'Izate-eremua (Dom $f$) irudia duten $x$-en multzoa da: grafikoa X ardatzaren gainean proiektatzean estaltzen dena. Ibiltartea (Rec $f$) funtzioak hartzen dituen $y$-ak dira: Y ardatzaren gainean proiektatzean estaltzen dena. Puntu betea tartean sartzen da, kortxetearekin: $[\\,]$; puntu hutsa ez, parentesiarekin: $(\\,)$; eta $\\pm\\infty$ beti parentesiarekin. Grafikoa zatituta badago, tarteak bildurarekin lotzen dira: $[-5,\\,-2)\\cup(-2,\\,5]$. Txorrota baten ura 0tik 6 minutura 10 °C-tik 58 °C-ra igotzen bada, Dom $f=[0,\\,6]$ eta Rec $f=[10,\\,58]$. Funtzio konstante batek, $y=1$ adibidez $[0,\\,5]$ tartean, ibiltarte gisa puntu bakarra du: $\\{1\\}$.',
            'El dominio (Dom $f$) es el conjunto de las $x$ que tienen imagen: lo que cubre la gráfica al proyectarla sobre el eje X. El recorrido (Rec $f$) son las $y$ que toma la función: lo que cubre al proyectarla sobre el eje Y. Un punto relleno entra en el intervalo, con corchete: $[\\,]$; un punto hueco no, con paréntesis: $(\\,)$; y $\\pm\\infty$ siempre con paréntesis. Si la gráfica está partida, los intervalos se unen con la unión: $[-5,\\,-2)\\cup(-2,\\,5]$. Si el agua de un grifo pasa de 10 °C a 58 °C entre el minuto 0 y el 6, Dom $f=[0,\\,6]$ y Rec $f=[10,\\,58]$. Una función constante, como $y=1$ en $[0,\\,5]$, tiene como recorrido un solo punto: $\\{1\\}$.',
            'المجال (Dom $f$) مجموعة قيم $x$ التي لها صورة: ما يغطيه الرسم عند إسقاطه على محور X. والمدى (Rec $f$) قيم $y$ التي تأخذها الدالة: ما يغطيه عند إسقاطه على محور Y. النقطة الممتلئة داخل الفترة، بقوس معقوف: $[\\,]$؛ والفارغة خارجها، بقوس عادي: $(\\,)$؛ و$\\pm\\infty$ دائمًا بقوس عادي. وإذا كان الرسم مقطّعًا تُجمع الفترات بالاتحاد: $[-5,\\,-2)\\cup(-2,\\,5]$. إذا ارتفعت حرارة ماء صنبور من 10 °م إلى 58 °م بين الدقيقة 0 والدقيقة 6 فإن Dom $f=[0,\\,6]$ وRec $f=[10,\\,58]$. والدالة الثابتة، مثل $y=1$ في $[0,\\,5]$، مداها نقطة واحدة: $\\{1\\}$.'
        ),
        problem: say('Grafiko bat $(-4,\\,-2)$ puntu betetik $(5,\\,-1)$ puntu betera doa, eta gehienez $y=4$ eta gutxienez $y=-2$ hartzen ditu. Idatzi izate-eremua eta ibiltartea.', 'Una gráfica va del punto relleno $(-4,\\,-2)$ al punto relleno $(5,\\,-1)$, y como mucho alcanza $y=4$ y como poco $y=-2$. Escribe el dominio y el recorrido.', 'يمتد رسم من النقطة الممتلئة $(-4,\\,-2)$ إلى النقطة الممتلئة $(5,\\,-1)$، وأكبر قيمة يبلغها $y=4$ وأصغرها $y=-2$. اكتب المجال والمدى.'),
        stepsKind: 'steps',
        steps: [
            { text: say('X ardatzean, ezkerreko muturretik eskuinekora.', 'En el eje X, del extremo izquierdo al derecho.', 'على محور X من الطرف الأيسر إلى الأيمن.'), math: same('$\\text{Dom}\\,f=[-4,\\,5]$') },
            { text: say('Y ardatzean, txikienetik handienera.', 'En el eje Y, del más bajo al más alto.', 'على محور Y من الأدنى إلى الأعلى.'), math: same('$\\text{Rec}\\,f=[-2,\\,4]$') }
        ],
        example: same('$[-5,\\,-2)\\cup(-2,\\,5]$'),
        takeaway: say('Izate-eremua X ardatzean, ibiltartea Y ardatzean. Puntu betea: kortxetea; hutsa: parentesia.', 'Dominio en el eje X; recorrido en el eje Y. Punto relleno: corchete; hueco: paréntesis.', 'المجال على محور X والمدى على محور Y. النقطة الممتلئة: قوس معقوف؛ الفارغة: قوس عادي.'),
        figure: (language) => <DomainGraphFigure language={language} />
    },

    /* ---------- 2. Domain of definition ---------- */
    {
        id: 'rational-domain',
        stage: 'domain',
        title: say('Zatikien izate-eremua', 'Dominio de las fracciones', 'مجال الكسور'),
        goal: say('Funtzio arrazional baten izate-eremua kalkulatzea izendatzailea anulatzen duten balioak kenduta.', 'Calcular el dominio de una función racional quitando los valores que anulan el denominador.', 'حساب مجال دالة كسرية بحذف القيم التي تعدم المقام.'),
        explanation: say(
            'Polinomio baten izate-eremua $\\mathbb{R}$ da: edozein zenbaki ordez daiteke. Zatiki batean, berriz, ezin da 0z zatitu: izate-eremua $\\mathbb{R}$ da, izendatzailea 0 egiten duten balioak izan ezik. Horiek aurkitzeko, berdindu izendatzailea 0ri eta ebatzi ekuazioa. $y=\\dfrac{1}{x^{2}+2x-8}$ funtzioan, $x^{2}+2x-8=0$ ekuazioaren soluzioak $x=-4$ eta $x=2$ dira, beraz Dom $f=\\mathbb{R}-\\{-4,\\,2\\}$. Batzuetan errazagoa da faktorizatzea: $x^{2}-x=x(x-1)$, eta kendu behar dira 0 eta 1. Izendatzailea inoiz anulatzen ez bada, $x^{2}+1$ adibidez (beti 1 edo gehiago), izate-eremua $\\mathbb{R}$ osoa da. Zenbakitzaileak ez du ezer kentzen.',
            'El dominio de un polinomio es $\\mathbb{R}$: se puede sustituir cualquier número. En una fracción, en cambio, no se puede dividir entre 0: el dominio es $\\mathbb{R}$ menos los valores que hacen 0 el denominador. Para encontrarlos, iguala el denominador a 0 y resuelve la ecuación. En $y=\\dfrac{1}{x^{2}+2x-8}$, las soluciones de $x^{2}+2x-8=0$ son $x=-4$ y $x=2$, así que Dom $f=\\mathbb{R}-\\{-4,\\,2\\}$. A veces es más rápido factorizar: $x^{2}-x=x(x-1)$, y hay que quitar el 0 y el 1. Si el denominador no se anula nunca, como $x^{2}+1$ (que vale siempre 1 o más), el dominio es todo $\\mathbb{R}$. El numerador no quita nada.',
            'مجال كثير الحدود هو $\\mathbb{R}$: يمكن تعويض أي عدد. أما في الكسر فلا تجوز القسمة على 0: المجال هو $\\mathbb{R}$ ما عدا القيم التي تجعل المقام 0. ولإيجادها ساوِ المقام بـ 0 وحُلّ المعادلة. في $y=\\dfrac{1}{x^{2}+2x-8}$ حلّا $x^{2}+2x-8=0$ هما $x=-4$ و$x=2$، إذن Dom $f=\\mathbb{R}-\\{-4,\\,2\\}$. وأحيانًا يكون التحليل أسرع: $x^{2}-x=x(x-1)$، فنحذف 0 و1. وإذا كان المقام لا ينعدم أبدًا، مثل $x^{2}+1$ (قيمته دائمًا 1 أو أكثر)، فالمجال هو $\\mathbb{R}$ كله. البسط لا يحذف شيئًا.'
        ),
        problem: say('Kalkulatu $y=\\dfrac{x+3}{x^{2}-4}$ funtzioaren izate-eremua.', 'Halla el dominio de $y=\\dfrac{x+3}{x^{2}-4}$.', 'أوجد مجال $y=\\dfrac{x+3}{x^{2}-4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea berdin 0.', 'Denominador igual a 0.', 'المقام يساوي 0.'), math: same('$x^{2}-4=0\\ \\to\\ x=\\pm 2$') },
            { text: say('Kendu bi balioak.', 'Quita los dos valores.', 'احذف القيمتين.'), math: same('$\\text{Dom}\\,f=\\mathbb{R}-\\{-2,\\,2\\}$') }
        ],
        example: same('$\\mathbb{R}-\\{-4,\\,2\\}$'),
        takeaway: say('Zatikia: kendu izendatzailea anulatzen duten x-ak. Zenbakitzaileak ez du ezer kentzen.', 'Fracción: quita las x que anulan el denominador. El numerador no quita nada.', 'الكسر: احذف قيم x التي تعدم المقام. البسط لا يحذف شيئًا.'),
        figure: (language) => <RationalDomainFigure language={language} />
    },
    {
        id: 'radical-domain',
        stage: 'domain',
        title: say('Erroen izate-eremua', 'Dominio de las raíces', 'مجال الجذور'),
        goal: say('Erro karratu baten izate-eremua kalkulatzea errokizuna ≥ 0 inekuazioa ebatziz, lineala edo bigarren mailakoa izan.', 'Calcular el dominio de una raíz cuadrada resolviendo la inecuación radicando ≥ 0, sea lineal o de segundo grado.', 'حساب مجال جذر تربيعي بحل المتراجحة: ما تحت الجذر ≥ 0، خطية كانت أو من الدرجة الثانية.'),
        explanation: say(
            'Indize bikoitiko erro batean errokizunak ez du negatiboa izan behar: izate-eremua errokizuna $\\ge 0$ inekuazioaren soluzioa da. Lineala bada, askatu $x$: $y=\\sqrt{x+7}$ funtzioan $x\\ge -7$, Dom $f=[-7,\\,+\\infty)$; $y=\\sqrt{1-x}$ funtzioan $x\\le 1$, Dom $f=(-\\infty,\\,1]$. Bigarren mailakoa bada, kalkulatu erroak eta egin zeinu-taula: $x^{2}-9$ positiboa da $-3$ baino lehen eta $3$ ondoren, eta negatiboa tartean; beraz $y=\\sqrt{x^{2}-9}$ funtzioan Dom $f=(-\\infty,\\,-3]\\cup[3,\\,+\\infty)$, muturrak barne ($\\ge$ delako). Kontuz kasu berezi hauekin: $\\sqrt{x^{2}+4}$ beti dago definituta ($\\mathbb{R}$), $\\sqrt{4-x^{2}}$ funtzioaren izate-eremua $[-2,\\,2]$ da, eta $\\sqrt{-x^{2}}$ funtzioarena $\\{0\\}$ bakarrik. Indize bakoitiko erroek ($\\sqrt[3]{\\ }$) ez dute murrizketarik.',
            'En una raíz de índice par el radicando no puede ser negativo: el dominio es la solución de la inecuación radicando $\\ge 0$. Si es lineal, despeja $x$: en $y=\\sqrt{x+7}$, $x\\ge -7$, Dom $f=[-7,\\,+\\infty)$; en $y=\\sqrt{1-x}$, $x\\le 1$, Dom $f=(-\\infty,\\,1]$. Si es de segundo grado, calcula las raíces y haz una tabla de signos: $x^{2}-9$ es positivo antes de $-3$ y después de $3$, y negativo entre ellos; así que en $y=\\sqrt{x^{2}-9}$, Dom $f=(-\\infty,\\,-3]\\cup[3,\\,+\\infty)$, con los extremos incluidos (porque es $\\ge$). Cuidado con estos casos especiales: $\\sqrt{x^{2}+4}$ existe siempre ($\\mathbb{R}$), el dominio de $\\sqrt{4-x^{2}}$ es $[-2,\\,2]$ y el de $\\sqrt{-x^{2}}$ es solo $\\{0\\}$. Las raíces de índice impar ($\\sqrt[3]{\\ }$) no tienen restricciones.',
            'في الجذر ذي الدليل الزوجي لا يكون ما تحت الجذر سالبًا: المجال هو حل المتراجحة: ما تحت الجذر $\\ge 0$. إذا كانت خطية فاعزل $x$: في $y=\\sqrt{x+7}$ يكون $x\\ge -7$ وDom $f=[-7,\\,+\\infty)$؛ وفي $y=\\sqrt{1-x}$ يكون $x\\le 1$ وDom $f=(-\\infty,\\,1]$. وإذا كانت من الدرجة الثانية فاحسب الجذرين واصنع جدول إشارات: $x^{2}-9$ موجب قبل $-3$ وبعد $3$ وسالب بينهما؛ إذن في $y=\\sqrt{x^{2}-9}$ يكون Dom $f=(-\\infty,\\,-3]\\cup[3,\\,+\\infty)$ مع الطرفين (لأنها $\\ge$). انتبه لهذه الحالات الخاصة: $\\sqrt{x^{2}+4}$ معرّف دائمًا ($\\mathbb{R}$)، ومجال $\\sqrt{4-x^{2}}$ هو $[-2,\\,2]$، ومجال $\\sqrt{-x^{2}}$ هو $\\{0\\}$ فقط. أما الجذور ذات الدليل الفردي ($\\sqrt[3]{\\ }$) فلا قيود عليها.'
        ),
        problem: say('Kalkulatu $y=\\sqrt{x^{2}+6x-7}$ funtzioaren izate-eremua.', 'Halla el dominio de $y=\\sqrt{x^{2}+6x-7}$.', 'أوجد مجال $y=\\sqrt{x^{2}+6x-7}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Errokizunaren erroak: $x=-7$ eta $x=1$.', 'Raíces del radicando: $x=-7$ y $x=1$.', 'جذرا ما تحت الجذر: $x=-7$ و$x=1$.'), math: same('$x^{2}+6x-7=0$') },
            { text: say('Zeinuak: + − +. Hartu positiboak eta muturrak.', 'Signos: + − +. Toma los positivos y los extremos.', 'الإشارات: + − +. خذ الموجبة والطرفين.'), math: same('$(-\\infty,\\,-7]\\cup[1,\\,+\\infty)$') }
        ],
        example: same('$x^{2}-9\\ge 0$'),
        takeaway: say('Erro karratua: errokizuna ≥ 0. Bigarren mailakoa: erroak, zeinu-taula eta muturrak barne.', 'Raíz cuadrada: radicando ≥ 0. Si es de segundo grado: raíces, tabla de signos y extremos incluidos.', 'الجذر التربيعي: ما تحته ≥ 0. من الدرجة الثانية: الجذران وجدول الإشارات والطرفان ضمنها.'),
        figure: (language) => <SignChartFigure language={language} />
    },
    {
        id: 'mixed-domain',
        stage: 'domain',
        title: say('Izate-eremuak konbinatzea', 'Dominios combinados', 'مجالات مركّبة'),
        goal: say('Erroak eta zatikiak batera dituzten funtzioen izate-eremua eta problema baten izate-eremua kalkulatzea.', 'Calcular el dominio de funciones con raíces y fracciones a la vez, y el dominio de un problema.', 'حساب مجال دوال فيها جذور وكسور معًا، ومجال مسألة.'),
        explanation: say(
            'Funtzio batek baldintza bat baino gehiago baditu, izate-eremua guztiak betetzen dituzten $x$-ena da. Erroa izendatzailean badago, errokizunak positibo hertsia izan behar du: $y=\\dfrac{1}{\\sqrt{x-5}}$ funtzioan $x-5>0$, Dom $f=(5,\\,+\\infty)$, 5 gabe, $\\sqrt{0}=0$ delako eta ezin delako 0z zatitu. Erroa zenbakitzailean eta beste izendatzaile bat badaude, bi baldintzak batera: $y=\\dfrac{\\sqrt{x+2}}{x-1}$ funtzioan $x\\ge -2$ eta $x\\ne 1$, beraz Dom $f=[-2,\\,1)\\cup(1,\\,+\\infty)$. Problema batean, gainera, zentzua duten balioak bakarrik: 100 × 70 cm-ko kartulina baten izkinetan $x$ aldeko karratuak moztuta kutxa bat egiten bada, $x>0$, $100-2x>0$ eta $70-2x>0$ izan behar dira, eta izate-eremua $(0,\\,35)$ da.',
            'Si una función tiene más de una condición, el dominio son las $x$ que las cumplen todas. Si la raíz está en el denominador, el radicando tiene que ser estrictamente positivo: en $y=\\dfrac{1}{\\sqrt{x-5}}$, $x-5>0$, Dom $f=(5,\\,+\\infty)$, sin el 5, porque $\\sqrt{0}=0$ y no se puede dividir entre 0. Si hay una raíz en el numerador y otro denominador, las dos condiciones a la vez: en $y=\\dfrac{\\sqrt{x+2}}{x-1}$, $x\\ge -2$ y $x\\ne 1$, así que Dom $f=[-2,\\,1)\\cup(1,\\,+\\infty)$. En un problema, además, solo valen los valores con sentido: si con una cartulina de 100 × 70 cm se hace una caja cortando cuadrados de lado $x$ en las esquinas, tiene que ser $x>0$, $100-2x>0$ y $70-2x>0$, y el dominio es $(0,\\,35)$.',
            'إذا كان للدالة أكثر من شرط فالمجال هو قيم $x$ التي تحققها كلها. وإذا كان الجذر في المقام فيجب أن يكون ما تحته موجبًا تمامًا: في $y=\\dfrac{1}{\\sqrt{x-5}}$ يكون $x-5>0$ وDom $f=(5,\\,+\\infty)$ دون 5، لأن $\\sqrt{0}=0$ ولا تجوز القسمة على 0. وإذا كان في البسط جذر وفي المقام عبارة أخرى فالشرطان معًا: في $y=\\dfrac{\\sqrt{x+2}}{x-1}$ يكون $x\\ge -2$ و$x\\ne 1$، إذن Dom $f=[-2,\\,1)\\cup(1,\\,+\\infty)$. وفي المسألة تصلح فقط القيم ذات المعنى: إذا صُنعت علبة من ورق مقوى 100 × 70 سم بقص مربعات ضلعها $x$ من الزوايا، فيجب أن يكون $x>0$ و$100-2x>0$ و$70-2x>0$، والمجال $(0,\\,35)$.'
        ),
        problem: say('Kalkulatu $y=\\dfrac{\\sqrt{x+2}}{x-1}$ funtzioaren izate-eremua.', 'Halla el dominio de $y=\\dfrac{\\sqrt{x+2}}{x-1}$.', 'أوجد مجال $y=\\dfrac{\\sqrt{x+2}}{x-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erroa: errokizuna ≥ 0.', 'Raíz: radicando ≥ 0.', 'الجذر: ما تحته ≥ 0.'), math: same('$x+2\\ge 0\\ \\to\\ x\\ge -2$') },
            { text: say('Zatikia: izendatzailea ≠ 0.', 'Fracción: denominador ≠ 0.', 'الكسر: المقام ≠ 0.'), math: same('$x-1\\ne 0\\ \\to\\ x\\ne 1$') },
            { text: say('Biak batera.', 'Las dos a la vez.', 'الشرطان معًا.'), math: same('$[-2,\\,1)\\cup(1,\\,+\\infty)$') }
        ],
        example: same('$x-5>0$'),
        takeaway: say('Erroa izendatzailean: errokizuna > 0, hertsia. Baldintza bat baino gehiago: guztiak batera.', 'Raíz en el denominador: radicando > 0, estricto. Varias condiciones: todas a la vez.', 'الجذر في المقام: ما تحته > 0 تمامًا. عدة شروط: كلها معًا.'),
        figure: (language) => <DomainCasesFigure language={language} />
    },

    /* ---------- 3. Continuity and pieces ---------- */
    {
        id: 'discontinuities',
        stage: 'continuity',
        title: say('Jarraitutasuna eta etenuneak', 'Continuidad y discontinuidades', 'الاتصال والانقطاعات'),
        goal: say('Funtzio bat puntu batean jarraitua den erabakitzea eta etenune motak bereiztea: saihesgarria, jauzi finitukoa eta jauzi infinitukoa.', 'Decidir si una función es continua en un punto y distinguir los tipos de discontinuidad: evitable, de salto finito y de salto infinito.', 'تقرير ما إذا كانت الدالة متصلة عند نقطة، والتمييز بين أنواع الانقطاع: القابل للإزالة والقفزة المنتهية والقفزة اللانهائية.'),
        explanation: say(
            'Funtzio bat puntu batean jarraitua da han definituta badago eta grafikoa arkatza altxatu gabe marraz badaiteke puntu horren inguruan. Hiru etenune mota daude. Saihesgarria: grafikoan zulo bat dago (edo puntu bat lekuz kanpo), eta puntu bakarra jarrita konpon liteke; $y=\\dfrac{x^{2}-1}{x-1}$ funtzioa $y=x+1$ da, $x=1$ puntuan izan ezik, non ez dagoen definituta. Jauzi finitukoa: ezkerreko eta eskuineko balioak desberdinak dira; aparkaleku batek ordu bakoitzeko euro bat kobratzen badu, prezioak jauzi egiten du ordu oso bakoitzean. Jauzi infinitukoa: funtzioak adar infinitu bat du; $y=\\dfrac{1}{(x-2)^{2}}$ funtzioan, $x=1{,}99$ denean $y=10\\,000$ da, eta gero eta handiagoa, $x$ 2ra hurbildu ahala: $x=2$ asintota bertikala da. Zatikietan, izendatzailea anulatzen den puntuetan bilatu etenuneak.',
            'Una función es continua en un punto si está definida en él y su gráfica se puede dibujar alrededor de ese punto sin levantar el lápiz. Hay tres tipos de discontinuidad. Evitable: en la gráfica hay un agujero (o un punto fuera de su sitio) que se arreglaría poniendo un solo punto; $y=\\dfrac{x^{2}-1}{x-1}$ es $y=x+1$ salvo en $x=1$, donde no está definida. De salto finito: los valores a la izquierda y a la derecha son distintos; si un aparcamiento cobra un euro por cada hora empezada, el precio salta en cada hora exacta. De salto infinito: la función tiene una rama infinita; en $y=\\dfrac{1}{(x-2)^{2}}$, con $x=1{,}99$ es $y=10\\,000$, y cada vez más grande al acercarse $x$ a 2: $x=2$ es una asíntota vertical. En las fracciones, busca las discontinuidades donde se anula el denominador.',
            'تكون الدالة متصلة عند نقطة إذا كانت معرّفة فيها وأمكن رسم بيانها حول تلك النقطة دون رفع القلم. وهناك ثلاثة أنواع من الانقطاع. القابل للإزالة: في الرسم ثقب (أو نقطة في غير موضعها) يُصلح بوضع نقطة واحدة؛ $y=\\dfrac{x^{2}-1}{x-1}$ هي $y=x+1$ إلا عند $x=1$ حيث لا تكون معرّفة. القفزة المنتهية: القيمتان عن اليسار وعن اليمين مختلفتان؛ إذا أخذ موقف سيارات يورو عن كل ساعة تبدأ، قفز السعر عند كل ساعة كاملة. القفزة اللانهائية: للدالة فرع لانهائي؛ في $y=\\dfrac{1}{(x-2)^{2}}$ عندما $x=1{,}99$ يكون $y=10\\,000$، ويكبر أكثر كلما اقتربت $x$ من 2: $x=2$ خط تقارب رأسي. في الكسور ابحث عن الانقطاعات حيث ينعدم المقام.'
        ),
        problem: say('Aztertu $f(x)=\\dfrac{x^{2}-1}{x-1}$ funtzioaren jarraitutasuna $x=1$ puntuan.', 'Estudia la continuidad de $f(x)=\\dfrac{x^{2}-1}{x-1}$ en $x=1$.', 'ادرس اتصال $f(x)=\\dfrac{x^{2}-1}{x-1}$ عند $x=1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x=1$ puntuan izendatzailea 0 da: ez dago definituta.', 'En $x=1$ el denominador es 0: no está definida.', 'عند $x=1$ يكون المقام 0: ليست معرّفة.'), math: same('$\\frac{0}{0}$') },
            { text: say('Sinplifikatu beste puntuetarako.', 'Simplifica para los demás puntos.', 'بسّط لبقية النقاط.'), math: same('$\\frac{(x-1)(x+1)}{x-1}=x+1$') },
            { text: say('Zulo bat $(1,\\,2)$ puntuan: saihesgarria.', 'Un agujero en $(1,\\,2)$: evitable.', 'ثقب عند $(1,\\,2)$: قابل للإزالة.') }
        ],
        example: same('$x=2$'),
        takeaway: say('Zuloa: saihesgarria. Bi balio desberdin: jauzi finitua. Adar infinitua: jauzi infinitua.', 'Agujero: evitable. Dos valores distintos: salto finito. Rama infinita: salto infinito.', 'ثقب: قابل للإزالة. قيمتان مختلفتان: قفزة منتهية. فرع لانهائي: قفزة لانهائية.'),
        figure: (language) => <ContinuityFigure language={language} />
    },
    {
        id: 'piecewise',
        stage: 'continuity',
        title: say('Zatika definitutako funtzioak', 'Funciones definidas a trozos', 'الدوال المعرّفة على أجزاء'),
        goal: say('Zatika definitutako funtzio baten irudiak kalkulatzea eta haren grafikoa marraztea.', 'Calcular imágenes de una función definida a trozos y dibujar su gráfica.', 'حساب صور دالة معرّفة على أجزاء ورسم بيانها.'),
        explanation: say(
            'Funtzio bat zatika definituta dago formula desberdinak baditu izate-eremuaren zati desberdinetan. Irudi bat kalkulatzeko, begiratu lehenik zein zatitan dagoen $x$, eta erabili zati horren formula bakarrik. $f(x)=-x$ ($x<0$), $f(x)=x^{2}$ ($0\\le x<2$) eta $f(x)=1$ ($x\\ge 2$) badira, $f(-3)=3$, $f(1)=1$ eta $f(2)=1$, 2 hirugarren zatian dagoelako. Marrazteko, egin zati bakoitza bere tartean bakarrik eta jarri muturretan puntu betea ($\\le$ edo $\\ge$) edo hutsa ($<$ edo $>$). Eguneroko bizitzan asko daude: zergen tarteak, garraio-tarifak edo balio absolutua bera: $|x|=-x$ ($x<0$) eta $|x|=x$ ($x\\ge 0$).',
            'Una función está definida a trozos si tiene fórmulas distintas en distintas partes de su dominio. Para calcular una imagen, mira primero en qué trozo está $x$ y usa solo la fórmula de ese trozo. Si $f(x)=-x$ ($x<0$), $f(x)=x^{2}$ ($0\\le x<2$) y $f(x)=1$ ($x\\ge 2$), entonces $f(-3)=3$, $f(1)=1$ y $f(2)=1$, porque el 2 está en el tercer trozo. Para dibujarla, traza cada trozo solo en su intervalo y pon en los extremos un punto relleno ($\\le$ o $\\ge$) o hueco ($<$ o $>$). En la vida diaria hay muchas: los tramos de un impuesto, las tarifas de transporte o el propio valor absoluto: $|x|=-x$ ($x<0$) y $|x|=x$ ($x\\ge 0$).',
            'تكون الدالة معرّفة على أجزاء إذا كانت لها صيغ مختلفة في أجزاء مختلفة من مجالها. لحساب صورة انظر أولًا في أي جزء تقع $x$ واستعمل صيغة ذلك الجزء فقط. إذا كان $f(x)=-x$ ($x<0$) و$f(x)=x^{2}$ ($0\\le x<2$) و$f(x)=1$ ($x\\ge 2$) فإن $f(-3)=3$ و$f(1)=1$ و$f(2)=1$، لأن 2 يقع في الجزء الثالث. ولرسمها ارسم كل جزء في فترته فقط وضع عند الطرفين نقطة ممتلئة ($\\le$ أو $\\ge$) أو فارغة ($<$ أو $>$). وفي الحياة اليومية أمثلة كثيرة: شرائح الضرائب وتعرفات النقل والقيمة المطلقة نفسها: $|x|=-x$ ($x<0$) و$|x|=x$ ($x\\ge 0$).'
        ),
        problem: say('$f(x)=2x+1$ ($x<1$) eta $f(x)=4-x$ ($x\\ge 1$) izanik, kalkulatu $f(-2)$, $f(1)$ eta $f(3)$.', 'Si $f(x)=2x+1$ ($x<1$) y $f(x)=4-x$ ($x\\ge 1$), calcula $f(-2)$, $f(1)$ y $f(3)$.', 'إذا كان $f(x)=2x+1$ ($x<1$) و$f(x)=4-x$ ($x\\ge 1$) فاحسب $f(-2)$ و$f(1)$ و$f(3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$-2<1$: lehen zatia.', '$-2<1$: primer trozo.', '$-2<1$: الجزء الأول.'), math: same('$f(-2)=2\\cdot(-2)+1=-3$') },
            { text: say('$1\\ge 1$: bigarren zatia.', '$1\\ge 1$: segundo trozo.', '$1\\ge 1$: الجزء الثاني.'), math: same('$f(1)=4-1=3$') },
            { text: say('$3\\ge 1$: bigarren zatia.', '$3\\ge 1$: segundo trozo.', '$3\\ge 1$: الجزء الثاني.'), math: same('$f(3)=4-3=1$') }
        ],
        example: same('$|x|$'),
        takeaway: say('Lehenik zatia, gero formula. Puntu betea ≤ edo ≥; hutsa < edo >.', 'Primero el trozo, después la fórmula. Punto relleno con ≤ o ≥; hueco con < o >.', 'أولًا الجزء ثم الصيغة. النقطة الممتلئة مع ≤ أو ≥، والفارغة مع < أو >.'),
        figure: (language) => <PiecewiseFigure language={language} />
    },
    {
        id: 'piecewise-continuity',
        stage: 'continuity',
        title: say('Zatien arteko jarraitutasuna', 'Continuidad entre trozos', 'الاتصال بين الأجزاء'),
        goal: say('Zatika definitutako funtzio bat lotuneetan jarraitua den aztertzea eta jarraitua izateko parametro bat kalkulatzea.', 'Estudiar si una función a trozos es continua en las uniones y calcular un parámetro para que lo sea.', 'دراسة اتصال دالة معرّفة على أجزاء عند نقاط الالتقاء، وحساب وسيط لتكون متصلة.'),
        explanation: say(
            'Zati bakoitza polinomio bat bada, funtzioa jarraitua da zati bakoitzaren barruan; etenuneak lotuneetan bakarrik egon daitezke. Lotune batean, kalkulatu ezkerreko zatiak eta eskuinekoak puntu horretan ematen duten balioa (biek, nahiz eta zati batek puntua ez hartu). Berdinak badira, funtzioa jarraitua da; desberdinak badira, jauzi finituko etenunea dago, eta jauzia bi balioen kendura da. $f(x)=x^{2}-1$ ($x\\le 2$) eta $f(x)=x+k$ ($x>2$) badira, ezkerrekoak $2^{2}-1=3$ ematen du eta eskuinekoak $2+k$; jarraitua izateko $2+k=3$, beraz $k=1$. $k=3$ balitz, jauzia $5-3=2$ izango litzateke.',
            'Si cada trozo es un polinomio, la función es continua dentro de cada trozo; las discontinuidades solo pueden estar en las uniones. En una unión, calcula el valor que da en ese punto el trozo de la izquierda y el que da el de la derecha (los dos, aunque uno de ellos no incluya el punto). Si coinciden, la función es continua; si no, hay una discontinuidad de salto finito, y el salto es la diferencia entre los dos valores. Si $f(x)=x^{2}-1$ ($x\\le 2$) y $f(x)=x+k$ ($x>2$), el de la izquierda da $2^{2}-1=3$ y el de la derecha $2+k$; para que sea continua, $2+k=3$, así que $k=1$. Si fuera $k=3$, el salto sería $5-3=2$.',
            'إذا كان كل جزء كثير حدود فالدالة متصلة داخل كل جزء؛ ولا تكون الانقطاعات إلا عند نقاط الالتقاء. عند نقطة التقاء احسب القيمة التي يعطيها الجزء الأيسر في تلك النقطة والتي يعطيها الأيمن (كليهما، حتى لو لم يشمل أحدهما النقطة). إن تساوتا فالدالة متصلة؛ وإلا فهناك انقطاع بقفزة منتهية، والقفزة هي الفرق بين القيمتين. إذا كان $f(x)=x^{2}-1$ ($x\\le 2$) و$f(x)=x+k$ ($x>2$) فالأيسر يعطي $2^{2}-1=3$ والأيمن $2+k$؛ لتكون متصلة يجب $2+k=3$، إذن $k=1$. ولو كان $k=3$ لكانت القفزة $5-3=2$.'
        ),
        problem: say('Kalkulatu $k$, $f(x)=x+k$ ($x<3$) eta $f(x)=x^{2}-4$ ($x\\ge 3$) funtzioa jarraitua izan dadin.', 'Halla $k$ para que $f(x)=x+k$ ($x<3$), $f(x)=x^{2}-4$ ($x\\ge 3$) sea continua.', 'أوجد $k$ لتكون $f(x)=x+k$ ($x<3$)، $f(x)=x^{2}-4$ ($x\\ge 3$) متصلة.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerreko zatia $x=3$ puntuan.', 'El trozo izquierdo en $x=3$.', 'الجزء الأيسر عند $x=3$.'), math: same('$3+k$') },
            { text: say('Eskuinekoa $x=3$ puntuan.', 'El derecho en $x=3$.', 'الأيمن عند $x=3$.'), math: same('$3^{2}-4=5$') },
            { text: say('Berdindu.', 'Iguala.', 'ساوِ بينهما.'), math: same('$3+k=5\\ \\to\\ k=2$') }
        ],
        example: same('$2+k=3$'),
        takeaway: say('Lotunean, bi zatien balioak berdinak: jarraitua. Desberdinak: jauzia.', 'En la unión, los dos trozos dan lo mismo: continua. Distinto: salto.', 'عند نقطة الالتقاء: الجزءان يعطيان القيمة نفسها فهي متصلة، وإلا فقفزة.'),
        figure: (language) => <JoinFigure language={language} />
    },

    /* ---------- 4. Intercepts, sign and symmetry ---------- */
    {
        id: 'intercepts',
        stage: 'features',
        title: say('Ardatzekiko ebaki-puntuak', 'Puntos de corte con los ejes', 'نقاط التقاطع مع المحورين'),
        goal: say('Polinomio eta zatiki baten ebaki-puntuak kalkulatzea faktorizatuz edo ekuazio bikarratuak ebatziz.', 'Calcular los puntos de corte de polinomios y fracciones factorizando o resolviendo ecuaciones bicuadradas.', 'حساب نقاط تقاطع كثيرات الحدود والكسور بالتحليل أو بحل المعادلات ثنائية التربيع.'),
        explanation: say(
            'Y ardatzarekiko ebaki-puntua $x=0$ jarrita lortzen da: $(0,\\,f(0))$; gehienez bat dago, eta bat ere ez 0 izate-eremuan ez badago. X ardatzarekikoak $f(x)=0$ ekuazioaren soluzioak dira. Polinomio handietan, faktorizatu: faktore komuna atera ($x^{3}-4x=x(x-2)(x+2)$), taldekatu ($x^{3}-x^{2}-4x+4=(x-1)(x-2)(x+2)$) edo Ruffini erabili; faktore bakoitza 0 eginez ebaki bat lortzen da. Ekuazio bikarratuetan, $x^{4}-5x^{2}+4=0$ adibidez, egin $t=x^{2}$: $t^{2}-5t+4=0$, $t=1$ eta $t=4$, eta $x=\\pm 1$, $x=\\pm 2$. Zatiki batean zenbakitzailea da 0 egin behar dena, puntu hori izate-eremuan badago. Polinomio batek gehienez bere maila adina ebaki ditu X ardatzarekin.',
            'El corte con el eje Y se obtiene poniendo $x=0$: $(0,\\,f(0))$; hay uno como mucho, y ninguno si 0 no está en el dominio. Los cortes con el eje X son las soluciones de $f(x)=0$. En polinomios grandes, factoriza: saca factor común ($x^{3}-4x=x(x-2)(x+2)$), agrupa ($x^{3}-x^{2}-4x+4=(x-1)(x-2)(x+2)$) o usa Ruffini; cada factor igualado a 0 da un corte. En las ecuaciones bicuadradas, como $x^{4}-5x^{2}+4=0$, haz $t=x^{2}$: $t^{2}-5t+4=0$, $t=1$ y $t=4$, y $x=\\pm 1$, $x=\\pm 2$. En una fracción, lo que se iguala a 0 es el numerador, si ese punto está en el dominio. Un polinomio tiene como mucho tantos cortes con el eje X como su grado.',
            'يُحصل على التقاطع مع محور Y بوضع $x=0$: $(0,\\,f(0))$؛ وهو واحد على الأكثر، ولا يوجد إذا لم يكن 0 في المجال. والتقاطعات مع محور X حلول $f(x)=0$. في كثيرات الحدود الكبيرة حلّل: أخرج العامل المشترك ($x^{3}-4x=x(x-2)(x+2)$) أو جمّع ($x^{3}-x^{2}-4x+4=(x-1)(x-2)(x+2)$) أو استعمل روفيني؛ وكل عامل يساوي 0 يعطي نقطة تقاطع. وفي المعادلات ثنائية التربيع، مثل $x^{4}-5x^{2}+4=0$، ضع $t=x^{2}$: $t^{2}-5t+4=0$، $t=1$ و$t=4$، ثم $x=\\pm 1$ و$x=\\pm 2$. وفي الكسر يُساوى البسط بـ 0، إذا كانت النقطة في المجال. ولكثير الحدود على الأكثر عدد من نقاط التقاطع مع محور X يساوي درجته.'
        ),
        problem: say('Kalkulatu $y=x^{4}-5x^{2}+4$ funtzioaren ebaki-puntuak ardatzekin.', 'Halla los puntos de corte de $y=x^{4}-5x^{2}+4$ con los ejes.', 'أوجد نقاط تقاطع $y=x^{4}-5x^{2}+4$ مع المحورين.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatza: $x=0$.', 'Eje Y: $x=0$.', 'محور Y: $x=0$.'), math: same('$(0,\\,4)$') },
            { text: say('X ardatza: $t=x^{2}$ eginda.', 'Eje X: con $t=x^{2}$.', 'محور X: بوضع $t=x^{2}$.'), math: same('$t^{2}-5t+4=0\\ \\to\\ t=1,\\ t=4$') },
            { text: say('Lau ebaki.', 'Cuatro cortes.', 'أربع نقاط تقاطع.'), math: same('$x=\\pm 1,\\ x=\\pm 2$') }
        ],
        example: same('$(0,\\,f(0))$'),
        takeaway: say('Y ardatza: x = 0. X ardatza: y = 0 eta faktorizatu. Zatikietan, zenbakitzailea.', 'Eje Y: x = 0. Eje X: y = 0 y factoriza. En fracciones, el numerador.', 'محور Y: x = 0. محور X: y = 0 ثم حلّل. في الكسور: البسط.'),
        figure: (language) => <CubicInterceptsFigure language={language} />
    },
    {
        id: 'sign',
        stage: 'features',
        title: say('Funtzio baten zeinua', 'El signo de una función', 'إشارة الدالة'),
        goal: say('Funtzio bat positiboa edo negatiboa den tarteak aurkitzea eta √f eta 1/f funtzioen izate-eremua ondorioztatzea.', 'Encontrar los intervalos donde una función es positiva o negativa y deducir el dominio de √f y de 1/f.', 'إيجاد الفترات التي تكون فيها الدالة موجبة أو سالبة، واستنتاج مجال √f و1/f.'),
        explanation: say(
            'Funtzio bat positiboa da grafikoa X ardatzaren gainean dagoen tarteetan, eta negatiboa azpian dagoenetan. Funtzio jarraitu batek zeinua X ardatza ebakitzen duen puntuetan bakarrik alda dezake (eta zatiki batean, izendatzailea anulatzen den puntuetan ere). Horregatik, zeinua aztertzeko: kalkulatu ebaki-puntuak, zatitu zuzena tarteetan eta probatu tarte bakoitzeko zenbaki bat. $f(x)=x^{2}-4x$ funtzioan erroak 0 eta 4 dira; $f(-1)=5>0$, $f(1)=-3<0$ eta $f(5)=5>0$, beraz positiboa da $(-\\infty,\\,0)\\cup(4,\\,+\\infty)$ tartean eta negatiboa $(0,\\,4)$ tartean. Horrekin beste izate-eremu batzuk irakurtzen dira: $\\sqrt{f(x)}$ funtzioarena $f\\ge 0$ den tokia da, $(-\\infty,\\,0]\\cup[4,\\,+\\infty)$, eta $\\dfrac{1}{f(x)}$ funtzioarena, $f\\ne 0$ den tokia, $\\mathbb{R}-\\{0,\\,4\\}$.',
            'Una función es positiva en los intervalos donde su gráfica está por encima del eje X, y negativa donde está por debajo. Una función continua solo puede cambiar de signo en los puntos donde corta al eje X (y una fracción, también donde se anula el denominador). Por eso, para estudiar el signo: calcula los cortes, divide la recta en intervalos y prueba un número de cada intervalo. En $f(x)=x^{2}-4x$ las raíces son 0 y 4; $f(-1)=5>0$, $f(1)=-3<0$ y $f(5)=5>0$, así que es positiva en $(-\\infty,\\,0)\\cup(4,\\,+\\infty)$ y negativa en $(0,\\,4)$. Con eso se leen otros dominios: el de $\\sqrt{f(x)}$ es donde $f\\ge 0$, $(-\\infty,\\,0]\\cup[4,\\,+\\infty)$, y el de $\\dfrac{1}{f(x)}$, donde $f\\ne 0$, $\\mathbb{R}-\\{0,\\,4\\}$.',
            'تكون الدالة موجبة في الفترات التي يكون فيها رسمها فوق محور X، وسالبة حيث يكون تحته. والدالة المتصلة لا تغيّر إشارتها إلا عند النقاط التي تقطع فيها محور X (والكسر أيضًا حيث ينعدم المقام). لذلك لدراسة الإشارة: احسب نقاط التقاطع، وقسّم المستقيم إلى فترات، وجرّب عددًا من كل فترة. في $f(x)=x^{2}-4x$ الجذران 0 و4؛ $f(-1)=5>0$ و$f(1)=-3<0$ و$f(5)=5>0$، إذن هي موجبة في $(-\\infty,\\,0)\\cup(4,\\,+\\infty)$ وسالبة في $(0,\\,4)$. وبذلك تُقرأ مجالات أخرى: مجال $\\sqrt{f(x)}$ حيث $f\\ge 0$، أي $(-\\infty,\\,0]\\cup[4,\\,+\\infty)$، ومجال $\\dfrac{1}{f(x)}$ حيث $f\\ne 0$، أي $\\mathbb{R}-\\{0,\\,4\\}$.'
        ),
        problem: say('Aztertu $f(x)=x^{2}-4x$ funtzioaren zeinua eta idatzi $\\sqrt{x^{2}-4x}$ funtzioaren izate-eremua.', 'Estudia el signo de $f(x)=x^{2}-4x$ y escribe el dominio de $\\sqrt{x^{2}-4x}$.', 'ادرس إشارة $f(x)=x^{2}-4x$ واكتب مجال $\\sqrt{x^{2}-4x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebaki-puntuak.', 'Cortes.', 'نقاط التقاطع.'), math: same('$x(x-4)=0\\ \\to\\ x=0,\\ x=4$') },
            { text: say('Probatu tarte bakoitzean: $f(-1)=5$, $f(1)=-3$, $f(5)=5$.', 'Prueba en cada intervalo: $f(-1)=5$, $f(1)=-3$, $f(5)=5$.', 'جرّب في كل فترة: $f(-1)=5$ و$f(1)=-3$ و$f(5)=5$.') },
            { text: say('Erroa: $f\\ge 0$.', 'La raíz: $f\\ge 0$.', 'الجذر: $f\\ge 0$.'), math: same('$(-\\infty,\\,0]\\cup[4,\\,+\\infty)$') }
        ],
        example: same('$f(x)>0$'),
        takeaway: say('Zeinua ebaki-puntuetan bakarrik aldatzen da: probatu zenbaki bat tarte bakoitzean.', 'El signo solo cambia en los cortes: prueba un número en cada intervalo.', 'لا تتغير الإشارة إلا عند نقاط التقاطع: جرّب عددًا في كل فترة.'),
        figure: (language) => <SignFigure language={language} />
    },
    {
        id: 'symmetry',
        stage: 'features',
        title: say('Funtzio bikoitiak eta bakoitiak', 'Funciones pares e impares', 'الدوال الزوجية والفردية'),
        goal: say('f(−x) kalkulatuz funtzio bat bikoitia, bakoitia edo bat ere ez den erabakitzea eta grafikoaren simetria ezagutzea.', 'Decidir calculando f(−x) si una función es par, impar o ninguna de las dos, y reconocer la simetría de su gráfica.', 'تقرير ما إذا كانت الدالة زوجية أو فردية أو لا هذه ولا تلك بحساب f(−x)، والتعرف على تناظر رسمها.'),
        explanation: say(
            'Funtzio bat bikoitia da $f(-x)=f(x)$ betetzen bada izate-eremuko $x$ guztientzat: haren grafikoa Y ardatzarekiko simetrikoa da, ispilu batean bezala. $f(x)=x^{2}-2$ bikoitia da, $f(-x)=(-x)^{2}-2=x^{2}-2$ delako. Bakoitia da $f(-x)=-f(x)$ betetzen bada: grafikoa jatorriarekiko simetrikoa da, 180°-ko biraketa batean bezala. $f(x)=x^{3}-5x$ bakoitia da: $f(-x)=-x^{3}+5x=-(x^{3}-5x)$. Polinomioetan laster ikusten da: berretzaile bikoitiak bakarrik (konstantea barne) badaude, bikoitia; bakoitiak bakarrik badaude, bakoitia; nahastuta badaude, $x^{2}+x$ adibidez, ez bata ez bestea. Funtzio bakoiti bat 0 puntuan definituta badago, jatorritik pasatzen da: $f(0)=0$. Simetriarekin grafikoaren erdia marraztea nahikoa da.',
            'Una función es par si $f(-x)=f(x)$ para todas las $x$ de su dominio: su gráfica es simétrica respecto del eje Y, como en un espejo. $f(x)=x^{2}-2$ es par, porque $f(-x)=(-x)^{2}-2=x^{2}-2$. Es impar si $f(-x)=-f(x)$: su gráfica es simétrica respecto del origen, como al girarla 180°. $f(x)=x^{3}-5x$ es impar: $f(-x)=-x^{3}+5x=-(x^{3}-5x)$. En los polinomios se ve enseguida: si solo hay exponentes pares (incluida la constante), es par; si solo hay impares, es impar; si están mezclados, como $x^{2}+x$, no es ni par ni impar. Si una función impar está definida en 0, pasa por el origen: $f(0)=0$. Con la simetría basta dibujar la mitad de la gráfica.',
            'تكون الدالة زوجية إذا تحقق $f(-x)=f(x)$ لكل $x$ في مجالها: رسمها متناظر حول محور Y كما في المرآة. $f(x)=x^{2}-2$ زوجية لأن $f(-x)=(-x)^{2}-2=x^{2}-2$. وتكون فردية إذا تحقق $f(-x)=-f(x)$: رسمها متناظر حول الأصل، كما عند تدويره 180°. $f(x)=x^{3}-5x$ فردية: $f(-x)=-x^{3}+5x=-(x^{3}-5x)$. وفي كثيرات الحدود يظهر ذلك فورًا: إذا كانت فيها أسس زوجية فقط (ومنها الثابت) فهي زوجية؛ وإذا كانت فردية فقط فهي فردية؛ وإذا اختلطت، مثل $x^{2}+x$، فليست زوجية ولا فردية. وإذا كانت الدالة الفردية معرّفة عند 0 فهي تمر بالأصل: $f(0)=0$. وبالتناظر يكفي رسم نصف البيان.'
        ),
        problem: say('$f(x)=x^{3}-5x$ bikoitia, bakoitia ala bat ere ez da?', '¿Es $f(x)=x^{3}-5x$ par, impar o ninguna?', 'هل $f(x)=x^{3}-5x$ زوجية أم فردية أم لا هذه ولا تلك؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kalkulatu $f(-x)$.', 'Calcula $f(-x)$.', 'احسب $f(-x)$.'), math: same('$(-x)^{3}-5(-x)=-x^{3}+5x$') },
            { text: say('$-f(x)$ da: bakoitia.', 'Es $-f(x)$: impar.', 'إنها $-f(x)$: فردية.'), math: same('$-x^{3}+5x=-(x^{3}-5x)$') }
        ],
        example: same('$f(-x)=f(x)$'),
        takeaway: say('Bikoitia: Y ardatzeko ispilua. Bakoitia: jatorriarekiko biraketa erdia.', 'Par: espejo en el eje Y. Impar: media vuelta respecto del origen.', 'الزوجية: مرآة على محور Y. الفردية: نصف دورة حول الأصل.'),
        figure: (language) => <SymmetryFigure language={language} />
    },

    /* ---------- 5. Increasing, rate and period ---------- */
    {
        id: 'monotony',
        stage: 'change',
        title: say('Hazkundea, maximoak eta minimoak', 'Crecimiento, máximos y mínimos', 'التزايد والقيم العظمى والصغرى'),
        goal: say('Funtzio bat gorakorra eta beherakorra den tarteak eta haren maximo eta minimo erlatiboak eta absolutuak aurkitzea.', 'Encontrar los intervalos donde una función crece y decrece y sus máximos y mínimos relativos y absolutos.', 'إيجاد فترات تزايد الدالة وتناقصها وقيمها العظمى والصغرى النسبية والمطلقة.'),
        explanation: say(
            'Funtzio bat gorakorra da tarte batean, $x$ handitzean $y$ ere handitzen bada, eta beherakorra, $x$ handitzean $y$ txikitzen bada. Tarteak $x$-ekin idazten dira, irekiak eta ezkerretik eskuinera: «gorakorra $(-5,\\,-3)\\cup(5,\\,+\\infty)$ tartean». Maximo erlatibo bat dago funtzioa gorakorra izatetik beherakorra izatera igarotzen den puntuan, eta minimo erlatibo bat alderantziz; puntu gisa ematen dira: maximoa $(-3,\\,5)$ puntuan. Maximo (minimo) absolutua grafiko osoko punturik altuena (baxuena) da, baldin badago. Parabola batean erpina da muturra: $y=x^{2}-6x+5$ funtzioaren erpina $x=\\dfrac{6}{2}=3$ abszisan dago, $y=9-18+5=-4$; beherakorra da $(-\\infty,\\,3)$ tartean, gorakorra $(3,\\,+\\infty)$ tartean, eta minimoa $(3,\\,-4)$ puntuan.',
            'Una función es creciente en un intervalo si al aumentar $x$ también aumenta $y$, y decreciente si al aumentar $x$ disminuye $y$. Los intervalos se escriben con las $x$, abiertos y de izquierda a derecha: «crece en $(-5,\\,-3)\\cup(5,\\,+\\infty)$». Hay un máximo relativo en el punto donde la función pasa de crecer a decrecer, y un mínimo relativo al revés; se dan como puntos: máximo en $(-3,\\,5)$. El máximo (mínimo) absoluto es el punto más alto (bajo) de toda la gráfica, si existe. En una parábola el extremo es el vértice: el de $y=x^{2}-6x+5$ está en la abscisa $x=\\dfrac{6}{2}=3$, con $y=9-18+5=-4$; decrece en $(-\\infty,\\,3)$, crece en $(3,\\,+\\infty)$ y tiene un mínimo en $(3,\\,-4)$.',
            'تكون الدالة متزايدة في فترة إذا زادت $y$ عندما تزيد $x$، ومتناقصة إذا نقصت $y$ عندما تزيد $x$. وتُكتب الفترات بقيم $x$، مفتوحة ومن اليسار إلى اليمين: «تتزايد في $(-5,\\,-3)\\cup(5,\\,+\\infty)$». وتوجد قيمة عظمى نسبية عند النقطة التي تنتقل فيها الدالة من التزايد إلى التناقص، وصغرى نسبية في العكس؛ وتُعطى نقاطًا: عظمى عند $(-3,\\,5)$. والعظمى (الصغرى) المطلقة أعلى (أدنى) نقطة في الرسم كله، إن وجدت. وفي القطع المكافئ يكون الرأس هو الطرف: رأس $y=x^{2}-6x+5$ عند الإحداثي السيني $x=\\dfrac{6}{2}=3$، و$y=9-18+5=-4$؛ تتناقص في $(-\\infty,\\,3)$ وتتزايد في $(3,\\,+\\infty)$ ولها صغرى عند $(3,\\,-4)$.'
        ),
        problem: say('Aztertu $y=x^{2}-6x+5$ funtzioaren hazkundea eta muturrak.', 'Estudia el crecimiento y los extremos de $y=x^{2}-6x+5$.', 'ادرس تزايد $y=x^{2}-6x+5$ وقيمها القصوى.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erpinaren abszisa: $-\\frac{b}{2a}$.', 'Abscisa del vértice: $-\\frac{b}{2a}$.', 'الإحداثي السيني للرأس: $-\\frac{b}{2a}$.'), math: same('$x=\\frac{6}{2}=3$') },
            { text: say('Haren ordenatua.', 'Su ordenada.', 'إحداثيه الصادي.'), math: same('$y=9-18+5=-4$') },
            { text: say('$a>0$: beherakorra $(-\\infty,\\,3)$ tartean eta gorakorra $(3,\\,+\\infty)$ tartean.', '$a>0$: decrece en $(-\\infty,\\,3)$ y crece en $(3,\\,+\\infty)$.', '$a>0$: تتناقص في $(-\\infty,\\,3)$ وتتزايد في $(3,\\,+\\infty)$.') },
            { text: say('Minimoa erpinean.', 'Mínimo en el vértice.', 'الصغرى عند الرأس.'), math: same('$(3,\\,-4)$') }
        ],
        example: same('$(-3,\\,5)$'),
        takeaway: say('Tarteak x-ekin, irekiak. Muturrak puntu gisa: gorakorretik beherakorrera, maximoa.', 'Intervalos con las x, abiertos. Extremos como puntos: de crecer a decrecer, máximo.', 'الفترات بقيم x ومفتوحة. القيم القصوى نقاط: من التزايد إلى التناقص عظمى.'),
        figure: (language) => <ExtremaFigure language={language} />
    },
    {
        id: 'rate',
        stage: 'change',
        title: say('Batez besteko aldakuntza-tasa', 'Tasa de variación media', 'معدل التغير المتوسط'),
        goal: say('Tarte batean T.V.M. kalkulatzea, formula edo grafiko batetik, eta abiadura ertain gisa interpretatzea.', 'Calcular la T.V.M. en un intervalo, con una fórmula o una gráfica, e interpretarla como una velocidad media.', 'حساب معدل التغير المتوسط في فترة من صيغة أو رسم، وتفسيره سرعةً متوسطة.'),
        explanation: say(
            '$[a,\\,b]$ tarteko batez besteko aldakuntza-tasa $y$-ren aldaketa zati $x$-ren aldaketa da: T.V.M. $[a,\\,b]=\\dfrac{f(b)-f(a)}{b-a}$. Geometrikoki, $(a,\\,f(a))$ eta $(b,\\,f(b))$ puntuak lotzen dituen zuzenkiaren malda da. Positiboa bada, funtzioa batez beste hazten da tartean; negatiboa bada, txikitzen; 0 bada, muturretan balio bera du. $f(x)$ distantzia bada eta $x$ denbora, T.V.M. abiadura ertaina da. Gorantz jaurtitako harri baten altuera $e=40t-5t^{2}$ (m, s) bada, $e(1)=35$ eta $e(3)=75$, beraz $[1,\\,3]$ tartean abiadura ertaina $\\dfrac{75-35}{2}=20$ m/s da. $[4,\\,8]$ tartean $\\dfrac{0-80}{4}=-20$ m/s: jaisten ari da.',
            'La tasa de variación media en $[a,\\,b]$ es el cambio de $y$ entre el cambio de $x$: T.V.M. $[a,\\,b]=\\dfrac{f(b)-f(a)}{b-a}$. Geométricamente, es la pendiente del segmento que une $(a,\\,f(a))$ con $(b,\\,f(b))$. Si es positiva, la función crece de media en el intervalo; si es negativa, decrece; si es 0, vale lo mismo en los extremos. Si $f(x)$ es una distancia y $x$ el tiempo, la T.V.M. es la velocidad media. Si la altura de una piedra lanzada hacia arriba es $e=40t-5t^{2}$ (m, s), $e(1)=35$ y $e(3)=75$, así que la velocidad media en $[1,\\,3]$ es $\\dfrac{75-35}{2}=20$ m/s. En $[4,\\,8]$ es $\\dfrac{0-80}{4}=-20$ m/s: está bajando.',
            'معدل التغير المتوسط في $[a,\\,b]$ هو تغير $y$ مقسومًا على تغير $x$: T.V.M. $[a,\\,b]=\\dfrac{f(b)-f(a)}{b-a}$. وهندسيًا هو ميل القطعة التي تصل $(a,\\,f(a))$ بـ $(b,\\,f(b))$. إذا كان موجبًا فالدالة تتزايد في المتوسط في الفترة؛ وإذا كان سالبًا فهي تتناقص؛ وإذا كان 0 فلها القيمة نفسها عند الطرفين. وإذا كانت $f(x)$ مسافة و$x$ زمنًا فالمعدل هو السرعة المتوسطة. إذا كان ارتفاع حجر مقذوف إلى أعلى $e=40t-5t^{2}$ (م، ث) فإن $e(1)=35$ و$e(3)=75$، إذن السرعة المتوسطة في $[1,\\,3]$ هي $\\dfrac{75-35}{2}=20$ م/ث. وفي $[4,\\,8]$ هي $\\dfrac{0-80}{4}=-20$ م/ث: إنه ينزل.'
        ),
        problem: say('Kalkulatu $f(x)=x^{2}-4x+5$ funtzioaren T.V.M. $[1,\\,4]$ tartean.', 'Halla la T.V.M. de $f(x)=x^{2}-4x+5$ en $[1,\\,4]$.', 'أوجد معدل التغير المتوسط لـ $f(x)=x^{2}-4x+5$ في $[1,\\,4]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturretako balioak.', 'Valores en los extremos.', 'القيمتان عند الطرفين.'), math: same('$f(1)=2\\qquad f(4)=5$') },
            { text: say('Zatidura.', 'El cociente.', 'خارج القسمة.'), math: same('$\\frac{5-2}{4-1}=1$') }
        ],
        example: same('$\\frac{f(b)-f(a)}{b-a}$'),
        takeaway: say('T.V.M.: y-ren aldaketa zati x-renaren. Zuzenkiaren malda; distantzian, abiadura ertaina.', 'T.V.M.: cambio de y entre cambio de x. La pendiente del segmento; en distancias, la velocidad media.', 'المعدل: تغير y على تغير x. ميل القطعة؛ وفي المسافات السرعة المتوسطة.'),
        figure: (language) => <RateFigure language={language} />
    },
    {
        id: 'periodic',
        stage: 'change',
        title: say('Periodikotasuna eta joera', 'Periodicidad y tendencia', 'الدورية والاتجاه'),
        goal: say('Funtzio periodiko baten balioak periodoaren bidez kalkulatzea eta funtzio baten joera eta asintotak deskribatzea.', 'Calcular valores de una función periódica con su periodo y describir la tendencia y las asíntotas de una función.', 'حساب قيم دالة دورية بواسطة دورها، ووصف اتجاه الدالة وخطوط تقاربها.'),
        explanation: say(
            'Funtzio bat periodikoa da haren grafikoa tarte jakin batean errepikatzen bada; tarte horren luzera periodoa da, $T$: $f(x+T)=f(x)$. Edozein balio kalkulatzeko, kendu periodoa behar adina aldiz (zatiketaren hondarra hartu): zisterna bat 2 minuturo betetzen eta husten bada, $f(17)=f(1)$, $17=8\\cdot 2+1$ delako; eta $f(40{,}5)=f(0{,}5)$. Asintotak ere errepikatzen dira: periodoa 7 bada eta $x=-1$ asintota bada, asintotak $x=-1+7n$ dira, $x=41$ eta $x=48$ barne. Joera da $x$ oso handia egitean funtzioa zein baliotara hurbiltzen den: urtero erdira jaisten den erradioaktibitatea 0ra doa, eta hozkailutik ateratako ura gelako tenperaturara. Zuzen horizontal horri asintota horizontal deitzen zaio.',
            'Una función es periódica si su gráfica se repite cada cierto intervalo; la longitud de ese intervalo es el periodo, $T$: $f(x+T)=f(x)$. Para calcular cualquier valor, quita el periodo tantas veces como haga falta (toma el resto de la división): si una cisterna se llena y se vacía cada 2 minutos, $f(17)=f(1)$, porque $17=8\\cdot 2+1$; y $f(40{,}5)=f(0{,}5)$. También se repiten las asíntotas: si el periodo es 7 y $x=-1$ es una asíntota, las asíntotas son $x=-1+7n$, entre ellas $x=41$ y $x=48$. La tendencia es el valor al que se acerca la función cuando $x$ se hace muy grande: la radiactividad que se reduce a la mitad cada año tiende a 0, y el agua sacada de la nevera, a la temperatura de la habitación. Esa recta horizontal se llama asíntota horizontal.',
            'تكون الدالة دورية إذا تكرر رسمها كل فترة معينة؛ وطول تلك الفترة هو الدور $T$: $f(x+T)=f(x)$. ولحساب أي قيمة اطرح الدور بقدر ما يلزم (خذ باقي القسمة): إذا امتلأ خزان وفرغ كل دقيقتين فإن $f(17)=f(1)$ لأن $17=8\\cdot 2+1$؛ و$f(40{,}5)=f(0{,}5)$. وتتكرر خطوط التقارب أيضًا: إذا كان الدور 7 وكان $x=-1$ خط تقارب فخطوط التقارب هي $x=-1+7n$، ومنها $x=41$ و$x=48$. والاتجاه هو القيمة التي تقترب منها الدالة عندما تكبر $x$ كثيرًا: النشاط الإشعاعي الذي ينقص إلى النصف كل سنة يتجه إلى 0، والماء المُخرج من الثلاجة يتجه إلى حرارة الغرفة. ويسمى ذلك المستقيم الأفقي خط تقارب أفقيًا.'
        ),
        problem: say('Zisterna bat 2 minuturo betetzen eta husten da, eta $f(1)=20$ L. Zenbat ur dago 17. minutuan? Eta 1 h 9 min 30 s-tan, $f(1{,}5)=30$ bada?', 'Una cisterna se llena y se vacía cada 2 minutos, y $f(1)=20$ L. ¿Cuánta agua hay en el minuto 17? ¿Y a la 1 h 9 min 30 s, si $f(1{,}5)=30$?', 'يمتلئ خزان ويفرغ كل دقيقتين، و$f(1)=20$ ل. كم من الماء في الدقيقة 17؟ وبعد ساعة و9 دقائق و30 ثانية إذا كان $f(1{,}5)=30$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu periodoaz.', 'Divide entre el periodo.', 'اقسم على الدور.'), math: same('$17=8\\cdot 2+1$') },
            { text: say('1. minutuko balio bera.', 'El mismo valor que en el minuto 1.', 'القيمة نفسها في الدقيقة 1.'), math: same('$f(17)=f(1)=20$') },
            { text: say('1 h 9 min 30 s = 69,5 min.', '1 h 9 min 30 s = 69,5 min.', '1 س 9 د 30 ث = 69.5 د.'), math: same('$69{,}5=34\\cdot 2+1{,}5$') },
            { text: say('Beraz, $f(1{,}5)=30$ litro.', 'Así que $f(1{,}5)=30$ litros.', 'إذن $f(1{,}5)=30$ لترًا.') }
        ],
        example: same('$f(x+T)=f(x)$'),
        takeaway: say('Periodikoa: kendu periodoa hondarrera iritsi arte. Joera: x oso handia denean y-ren balioa.', 'Periódica: quita el periodo hasta llegar al resto. Tendencia: el valor de y cuando x es muy grande.', 'الدورية: اطرح الدور حتى تصل إلى الباقي. الاتجاه: قيمة y عندما تكبر x كثيرًا.'),
        figure: (language) => <PeriodicFigure language={language} />
    }
]
