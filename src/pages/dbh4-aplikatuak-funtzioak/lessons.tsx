import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { FormulaFigure, FunctionTestFigure } from '../dbh2-funtzioak-v2/figures'
import {
    BoxModelFigure,
    ContinuityFigure,
    DomainFormulaFigure,
    DomainGraphFigure,
    ExpressionsFigure,
    ExtremaFigure,
    GlucoseFigure,
    InterceptsFormulaFigure,
    MonotonyFigure,
    PeriodicFigure,
    RateFigure,
    StudyFigure,
    TendencyFigure
} from './figures'

/* ==========================================================================
   Funtzioak · 4. DBH aplikatuak — stages and lessons, following Santillana
   Aplicadas 4, unit 7 (Funciones: concept, ways of giving a function,
   domain and range from a graph and from a formula, intercepts, average
   rate of change, increasing and decreasing, maxima and minima, continuity,
   periodicity and the study of a graph) and Anaya Aplicadas 4, unit 8
   (Funciones. Características: tendency, reading graphs in context and
   functions that come from a problem, like the box made from a card).
   ========================================================================== */

export type FunctionsStageId = 'concept' | 'domain' | 'change' | 'properties' | 'study'

export const functionsStages: UnitStage[] = [
    { id: 'concept', tone: 'blue', title: { eu: 'Funtzio kontzeptua', es: 'Concepto de función', ar: 'مفهوم الدالة' } },
    { id: 'domain', tone: 'violet', title: { eu: 'Izate-eremua eta ebaki-puntuak', es: 'Dominio y puntos de corte', ar: 'المجال ونقاط التقاطع' } },
    { id: 'change', tone: 'mustard', title: { eu: 'Hazkundea eta muturrak', es: 'Crecimiento y extremos', ar: 'التزايد والقيم القصوى' } },
    { id: 'properties', tone: 'coral', title: { eu: 'Jarraitutasuna, periodikotasuna eta joera', es: 'Continuidad, periodicidad y tendencia', ar: 'الاتصال والدورية والاتجاه' } },
    { id: 'study', tone: 'green', title: { eu: 'Funtzioak aztertzea', es: 'Estudiar funciones', ar: 'دراسة الدوال' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const functionsTopics: UnitTopic[] = [
    /* ---------- 1. Concept ---------- */
    {
        id: 'what-is',
        stage: 'concept',
        title: say('Zer da funtzio bat?', '¿Qué es una función?', 'ما الدالة؟'),
        goal: say('Bi magnituderen arteko erlazio bat funtzioa den ala ez erabakitzea, eta aldagai askea eta menpekoa bereiztea.', 'Decidir si una relación entre dos magnitudes es una función y distinguir la variable independiente de la dependiente.', 'تقرير ما إذا كانت علاقة بين مقدارين دالة، والتمييز بين المتغير المستقل والتابع.'),
        explanation: say(
            'Funtzio bat bi magnituderen arteko erlazioa da, non lehenengoaren balio bakoitzari ($x$, aldagai askea) bigarrenaren balio bakar bat dagokion ($y$, menpeko aldagaia). Idazten da $y=f(x)$. Erosten diren boligrafoen kopurua eta prezioa: funtzioa, kopuru bakoitzak prezio bakarra duelako. Pertsona baten pisua eta altuera: ez, pisu bereko bi pertsonak altuera desberdina izan dezaketelako. Zenbaki bakoitzari bere erro karratuak ($\\pm$) esleitzea ere ez da funtzioa: 9ri 3 eta $-3$ dagozkio. Grafiko batean, zuzen bertikal batek gehienez puntu batean ebaki behar du kurba.',
            'Una función es una relación entre dos magnitudes en la que a cada valor de la primera ($x$, la variable independiente) le corresponde un único valor de la segunda ($y$, la variable dependiente). Se escribe $y=f(x)$. El número de bolis que se compran y su precio: es función, porque cada cantidad tiene un único precio. El peso y la estatura de una persona: no, porque dos personas con el mismo peso pueden medir distinto. Asignar a cada número sus raíces cuadradas ($\\pm$) tampoco es función: al 9 le corresponden 3 y $-3$. En una gráfica, cualquier recta vertical debe cortar a la curva como mucho en un punto.',
            'الدالة علاقة بين مقدارين يقابل فيها كلَّ قيمة للأول ($x$، المتغير المستقل) قيمةٌ واحدة فقط للثاني ($y$، المتغير التابع). وتُكتب $y=f(x)$. عدد الأقلام المشتراة وثمنها: دالة، لأن لكل كمية ثمنًا واحدًا. وزن الشخص وطوله: ليست دالة، لأن شخصين لهما الوزن نفسه قد يختلفان في الطول. وإسناد جذريه التربيعيين ($\\pm$) إلى كل عدد ليس دالة أيضًا: للعدد 9 يقابل 3 و$-3$. وفي الرسم يجب أن يقطع أي مستقيم رأسي المنحنى في نقطة واحدة على الأكثر.'
        ),
        problem: say('Erlazio honek funtzio bat ematen du? $(1,\\,4)$, $(2,\\,5)$, $(1,\\,6)$, $(3,\\,7)$', '¿Es función esta relación? $(1,\\,4)$, $(2,\\,5)$, $(1,\\,6)$, $(3,\\,7)$', 'هل هذه العلاقة دالة؟ $(1,\\,4)$، $(2,\\,5)$، $(1,\\,6)$، $(3,\\,7)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bilatu errepikatzen den $x$.', 'Busca una $x$ repetida.', 'ابحث عن $x$ مكررة.'), math: same('$x=1$') },
            { text: say('Bi irteera ditu: 4 eta 6. Ez da funtzioa.', 'Tiene dos salidas: 4 y 6. No es función.', 'لها مخرجان: 4 و6. ليست دالة.') }
        ],
        example: same('$y=f(x)$'),
        takeaway: say('Funtzioa: x bakoitzeko y bakarra. Y bat errepika daiteke, x bat ez.', 'Función: cada x, una sola y. Una y puede repetirse; una x, no.', 'الدالة: لكل x قيمة y واحدة. يمكن أن تتكرر y لا x.'),
        figure: (language) => <FunctionTestFigure language={language} />
    },
    {
        id: 'expressions',
        stage: 'concept',
        title: say('Funtzio bat adierazteko erak', 'Formas de expresar una función', 'طرق التعبير عن دالة'),
        goal: say('Funtzio bera enuntziatu, formula, balio-taula eta grafiko gisa adieraztea eta batetik bestera igarotzea.', 'Expresar una misma función con un enunciado, una fórmula, una tabla y una gráfica, y pasar de una forma a otra.', 'التعبير عن الدالة نفسها بنص وصيغة وجدول ورسم، والانتقال من صورة إلى أخرى.'),
        explanation: say(
            'Funtzio bat lau eratara eman daiteke. Enuntziatuak hitzez kontatzen du: «taxi batek 2,20 € kobratzen ditu igotzean eta 0,95 € minutuko». Formulak (adierazpen aljebraikoak) kalkulatzeko araua ematen du: $y=0{,}95x+2{,}2$. Balio-taulak bikote batzuk jasotzen ditu, ez guztiak. Grafikoak funtzioaren itxura erakusten du begirada batean. Enuntziatutik formulara igarotzeko, aukeratu zer den $x$ eta zer $y$, eta idatzi nola kalkulatzen den $y$. Formulatik taulara, ordeztu $x$-ren balio batzuk. Taulatik grafikora, kokatu bikoteak puntu gisa eta lotu, magnitudeak jarraituak badira.',
            'Una función se puede dar de cuatro formas. El enunciado lo cuenta con palabras: «un taxi cobra 2,20 € al subir y 0,95 € por minuto». La fórmula (expresión algebraica) da la regla para calcular: $y=0{,}95x+2{,}2$. La tabla de valores recoge algunas parejas, no todas. La gráfica enseña de un vistazo la forma de la función. Para pasar del enunciado a la fórmula, elige qué es $x$ y qué es $y$ y escribe cómo se calcula $y$. De la fórmula a la tabla, sustituye algunos valores de $x$. De la tabla a la gráfica, sitúa las parejas como puntos y únelos si las magnitudes son continuas.',
            'يمكن إعطاء الدالة بأربع طرق. النص يرويها بالكلمات: «تأخذ سيارة أجرة 2.20 € عند الركوب و0.95 € عن كل دقيقة». والصيغة (العبارة الجبرية) تعطي قاعدة الحساب: $y=0{,}95x+2{,}2$. وجدول القيم يجمع بعض الأزواج لا كلها. والرسم يُظهر شكل الدالة بنظرة واحدة. للانتقال من النص إلى الصيغة اختر ما هو $x$ وما هو $y$ واكتب كيف تُحسب $y$. ومن الصيغة إلى الجدول عوّض بعض قيم $x$. ومن الجدول إلى الرسم ضع الأزواج نقاطًا وصِلها إذا كانت المقادير متصلة.'
        ),
        problem: say('Txorrota batek 1,5 litro galtzen ditu orduko. Idatzi formula eta kalkulatu zenbat galtzen den 6 orduan.', 'Un grifo pierde 1,5 litros cada hora. Escribe la fórmula y calcula cuánto pierde en 6 horas.', 'يفقد صنبور 1.5 لتر كل ساعة. اكتب الصيغة واحسب كم يفقد في 6 ساعات.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x$: orduak; $y$: litroak.', '$x$: horas; $y$: litros.', '$x$: الساعات؛ $y$: اللترات.'), math: same('$y=1{,}5x$') },
            { text: say('Ordeztu $x=6$.', 'Sustituye $x=6$.', 'عوّض $x=6$.'), math: same('$y=1{,}5\\cdot 6=9$') }
        ],
        example: same('$y=0{,}95x+2{,}2$'),
        takeaway: say('Enuntziatua, formula, taula eta grafikoa: funtzio bera lau eratara.', 'Enunciado, fórmula, tabla y gráfica: la misma función de cuatro formas.', 'النص والصيغة والجدول والرسم: الدالة نفسها بأربع طرق.'),
        figure: (language) => <ExpressionsFigure language={language} />
    },
    {
        id: 'evaluate',
        stage: 'concept',
        title: say('Irudiak eta grafikoaren puntuak', 'Imágenes y puntos de la gráfica', 'الصور ونقاط الرسم'),
        goal: say('Formula batetik irudiak kalkulatzea eta puntu bat grafikoan dagoen ala ez egiaztatzea.', 'Calcular imágenes con una fórmula y comprobar si un punto está en la gráfica.', 'حساب الصور بصيغة والتحقق من وقوع نقطة على الرسم.'),
        explanation: say(
            '$f(a)$ da $a$-ren irudia: $x$-ren ordez $a$ jarri eta kalkulatzen den balioa. $f(x)=x^2-3$ bada, $f(-2)=(-2)^2-3=1$. Kontuz zeinuekin: ordeztu beti parentesi artean. $(a,\\,b)$ puntua grafikoan dago baldin eta $f(a)=b$ bada. Adibidez, $(3,\\,6)$ puntua $f(x)=x^2-3$ funtzioaren grafikoan dago, $f(3)=9-3=6$ delako; $(1,\\,1)$ ez, $f(1)=-2$ delako. Alderantziz, $f(x)=b$ ebaztean, irudi hori duten $x$-ak aurkitzen dira (aurreirudiak): $x^2-3=6$ bada, $x=3$ edo $x=-3$.',
            '$f(a)$ es la imagen de $a$: el valor que sale al poner $a$ en lugar de $x$. Si $f(x)=x^2-3$, $f(-2)=(-2)^2-3=1$. Cuidado con los signos: sustituye siempre entre paréntesis. El punto $(a,\\,b)$ está en la gráfica si $f(a)=b$. Por ejemplo, $(3,\\,6)$ está en la gráfica de $f(x)=x^2-3$ porque $f(3)=9-3=6$; $(1,\\,1)$ no, porque $f(1)=-2$. Al revés, resolviendo $f(x)=b$ se encuentran las $x$ que tienen esa imagen (las antiimágenes): si $x^2-3=6$, entonces $x=3$ o $x=-3$.',
            '$f(a)$ هي صورة $a$: القيمة الناتجة عن وضع $a$ مكان $x$. إذا كان $f(x)=x^2-3$ فإن $f(-2)=(-2)^2-3=1$. انتبه للإشارات: عوّض دائمًا بين قوسين. تقع النقطة $(a,\\,b)$ على الرسم إذا كان $f(a)=b$. مثلًا $(3,\\,6)$ تقع على رسم $f(x)=x^2-3$ لأن $f(3)=9-3=6$؛ أما $(1,\\,1)$ فلا، لأن $f(1)=-2$. وبالعكس، بحل $f(x)=b$ نجد قيم $x$ التي لها هذه الصورة (الأصول): إذا كان $x^2-3=6$ فإن $x=3$ أو $x=-3$.'
        ),
        problem: say('$f(x)=2x^2-x$ izanik, kalkulatu $f(-3)$.', 'Siendo $f(x)=2x^2-x$, calcula $f(-3)$.', 'إذا كان $f(x)=2x^2-x$ فاحسب $f(-3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu parentesi artean.', 'Sustituye entre paréntesis.', 'عوّض بين قوسين.'), math: same('$2\\cdot(-3)^2-(-3)$') },
            { text: say('Berretura lehenik.', 'Primero la potencia.', 'القوة أولًا.'), math: same('$2\\cdot 9+3=21$') }
        ],
        example: same('$f(-2)=1$'),
        takeaway: say('Puntu bat grafikoan dago bere x-aren irudia bere y bada.', 'Un punto está en la gráfica si la imagen de su x es su y.', 'تقع النقطة على الرسم إذا كانت صورة x فيها هي y.'),
        figure: (language) => <FormulaFigure language={language} />
    },

    /* ---------- 2. Domain and intercepts ---------- */
    {
        id: 'domain-graph',
        stage: 'domain',
        title: say('Izate-eremua eta ibiltartea grafikoan', 'Dominio y recorrido en una gráfica', 'المجال والمدى في الرسم'),
        goal: say('Grafiko baten izate-eremua eta ibiltartea irakurtzea eta tarte gisa idaztea.', 'Leer el dominio y el recorrido de una gráfica y escribirlos como intervalos.', 'قراءة مجال الرسم ومداه وكتابتهما فترات.'),
        explanation: say(
            'Izate-eremua (Dom $f$) irudia duten $x$ balioen multzoa da: grafikoa X ardatzaren gainean proiektatzean estaltzen dena. Ibiltartea (Rec $f$ edo Im $f$) funtzioak hartzen dituen $y$ balioak dira: Y ardatzaren gainean proiektatzean estaltzen dena. Tarte gisa idazten dira: $[a,\\,b]$ itxia da (muturrak barne, puntu beteak), $(a,\\,b)$ irekia (muturrik gabe, puntu hutsak), eta $+\\infty$ edo $-\\infty$ beti parentesiarekin doaz. Grafiko batek $x=-4$tik $x=5$era jarraitzen badu eta $y=-2$ eta $y=4$ artean ibiltzen bada, Dom $f=[-4,\\,5]$ eta Rec $f=[-2,\\,4]$.',
            'El dominio (Dom $f$) es el conjunto de valores de $x$ que tienen imagen: lo que cubre la gráfica al proyectarla sobre el eje X. El recorrido (Rec $f$ o Im $f$) son los valores de $y$ que toma la función: lo que cubre al proyectarla sobre el eje Y. Se escriben como intervalos: $[a,\\,b]$ es cerrado (con los extremos, puntos rellenos), $(a,\\,b)$ es abierto (sin los extremos, puntos huecos), y $+\\infty$ o $-\\infty$ van siempre con paréntesis. Si una gráfica va de $x=-4$ a $x=5$ y se mueve entre $y=-2$ e $y=4$, Dom $f=[-4,\\,5]$ y Rec $f=[-2,\\,4]$.',
            'المجال (Dom $f$) مجموعة قيم $x$ التي لها صورة: ما يغطيه الرسم عند إسقاطه على محور X. والمدى (Rec $f$ أو Im $f$) قيم $y$ التي تأخذها الدالة: ما يغطيه عند إسقاطه على محور Y. ويُكتبان فترات: $[a,\\,b]$ مغلقة (بالطرفين، نقاط ممتلئة)، و$(a,\\,b)$ مفتوحة (دون الطرفين، نقاط فارغة)، و$+\\infty$ أو $-\\infty$ دائمًا مع قوس عادي. إذا امتد رسم من $x=-4$ إلى $x=5$ وتحرك بين $y=-2$ و$y=4$ فإن Dom $f=[-4,\\,5]$ وRec $f=[-2,\\,4]$.'
        ),
        problem: say('Ur-txorrota baten tenperaturak 10 °C-tik 58 °C-ra igotzen du, 0tik 6 minutura. Zein dira izate-eremua eta ibiltartea?', 'La temperatura del agua de un grifo sube de 10 °C a 58 °C entre el minuto 0 y el 6. ¿Cuáles son el dominio y el recorrido?', 'ترتفع حرارة ماء صنبور من 10 °م إلى 58 °م بين الدقيقة 0 والدقيقة 6. ما المجال والمدى؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Denbora ($x$).', 'El tiempo ($x$).', 'الزمن ($x$).'), math: same('$\\text{Dom}\\,f=[0,\\,6]$') },
            { text: say('Tenperatura ($y$).', 'La temperatura ($y$).', 'الحرارة ($y$).'), math: same('$\\text{Rec}\\,f=[10,\\,58]$') }
        ],
        example: same('$[-4,\\,5]$'),
        takeaway: say('Izate-eremua X ardatzean, ibiltartea Y ardatzean.', 'Dominio en el eje X; recorrido en el eje Y.', 'المجال على محور X والمدى على محور Y.'),
        figure: (language) => <DomainGraphFigure language={language} />
    },
    {
        id: 'domain-formula',
        stage: 'domain',
        title: say('Izate-eremua formulatik', 'Dominio desde la fórmula', 'المجال من الصيغة'),
        goal: say('Polinomio, zatiki eta erro karratuen izate-eremua kalkulatzea, eta testuinguru baten izate-eremua erabakitzea.', 'Calcular el dominio de polinomios, fracciones y raíces cuadradas, y decidir el dominio de un contexto.', 'حساب مجال كثيرات الحدود والكسور والجذور التربيعية، وتحديد مجال سياق.'),
        explanation: say(
            'Formula batetik, izate-eremua kalkulatu ezin diren $x$-ak kenduta geratzen da. Polinomio batean ($y=x^2-4x$, $y=3x+1$) edozein zenbaki ordez daiteke: Dom $f=\\mathbb{R}$. Zatiki batean ezin da 0z zatitu: $y=\\dfrac{1-x}{x-3}$ funtzioan $x-3=0$ ebazten da, $x=3$, eta Dom $f=\\mathbb{R}-\\{3\\}$. Erro karratu batean errokizunak ez du negatiboa izan behar: $y=\\sqrt{x-2}$ funtzioan $x-2\\ge 0$, beraz Dom $f=[2,\\,+\\infty)$. Problema batean, gainera, zentzua duten balioak bakarrik: kutxa baten aldea ezin da negatiboa izan, eta pertsona kopurua zenbaki osoa da.',
            'Con una fórmula, el dominio son todas las $x$ menos las que no se pueden calcular. En un polinomio ($y=x^2-4x$, $y=3x+1$) se puede sustituir cualquier número: Dom $f=\\mathbb{R}$. En una fracción no se puede dividir entre 0: en $y=\\dfrac{1-x}{x-3}$ se resuelve $x-3=0$, $x=3$, y Dom $f=\\mathbb{R}-\\{3\\}$. En una raíz cuadrada el radicando no puede ser negativo: en $y=\\sqrt{x-2}$ hace falta $x-2\\ge 0$, así que Dom $f=[2,\\,+\\infty)$. En un problema, además, solo valen los valores con sentido: el lado de una caja no puede ser negativo y un número de personas es entero.',
            'مع الصيغة يكون المجال جميع قيم $x$ ما عدا التي لا تُحسب. في كثير الحدود ($y=x^2-4x$، $y=3x+1$) يمكن تعويض أي عدد: Dom $f=\\mathbb{R}$. وفي الكسر لا تجوز القسمة على 0: في $y=\\dfrac{1-x}{x-3}$ نحل $x-3=0$، $x=3$، فيكون Dom $f=\\mathbb{R}-\\{3\\}$. وفي الجذر التربيعي لا يكون ما تحت الجذر سالبًا: في $y=\\sqrt{x-2}$ يلزم $x-2\\ge 0$، إذن Dom $f=[2,\\,+\\infty)$. وفي المسألة تصلح فقط القيم ذات المعنى: ضلع العلبة لا يكون سالبًا، وعدد الأشخاص عدد صحيح.'
        ),
        problem: say('Zein $x$ balio ez dago $y=\\dfrac{x^2}{x+4}$ funtzioaren izate-eremuan?', '¿Qué valor de $x$ no está en el dominio de $y=\\dfrac{x^2}{x+4}$?', 'ما قيمة $x$ التي ليست في مجال $y=\\dfrac{x^2}{x+4}$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea zero.', 'Denominador cero.', 'المقام صفر.'), math: same('$x+4=0\\to x=-4$') },
            { text: say('Kendu balio hori.', 'Quita ese valor.', 'احذف هذه القيمة.'), math: same('$\\mathbb{R}-\\{-4\\}$') }
        ],
        example: same('$x-2\\ge 0$'),
        takeaway: say('Polinomioak: zenbaki guztiak. Zatikiak: izendatzailea ez zero. Erroak: barrukoa ez negatiboa.', 'Polinomios: todos los números. Fracciones: denominador distinto de cero. Raíces: el interior no negativo.', 'كثيرات الحدود: كل الأعداد. الكسور: مقام غير صفري. الجذور: ما تحتها غير سالب.'),
        figure: (language) => <DomainFormulaFigure language={language} />
    },
    {
        id: 'intercepts',
        stage: 'domain',
        title: say('Ardatzekiko ebaki-puntuak', 'Puntos de corte con los ejes', 'نقاط التقاطع مع المحورين'),
        goal: say('Funtzio baten eta ardatzen arteko ebaki-puntuak formulatik kalkulatzea.', 'Calcular con la fórmula los puntos de corte de una función con los ejes.', 'حساب نقاط تقاطع الدالة مع المحورين بالصيغة.'),
        explanation: say(
            'Y ardatzarekiko ebaki-puntua lortzeko, $x=0$ jartzen da: $y=f(0)$, eta puntua $(0,\\,f(0))$ da. Gehienez bat dago, eta ez dago 0 izate-eremuan ez badago. X ardatzarekiko ebaki-puntuak lortzeko, $y=0$ jartzen da eta $f(x)=0$ ekuazioa ebazten da; soluzio bakoitza $(x,\\,0)$ puntu bat da. $y=x^2-2x-3$ funtzioan: $f(0)=-3$, beraz $(0,\\,-3)$; eta $x^2-2x-3=0$ ebaztean $x=-1$ eta $x=3$, beraz $(-1,\\,0)$ eta $(3,\\,0)$. Zatiki batean, zenbakitzailea 0 egiten da (izendatzailea ez bada 0).',
            'Para el corte con el eje Y se pone $x=0$: $y=f(0)$ y el punto es $(0,\\,f(0))$. Hay como mucho uno, y ninguno si el 0 no está en el dominio. Para los cortes con el eje X se pone $y=0$ y se resuelve la ecuación $f(x)=0$; cada solución da un punto $(x,\\,0)$. En $y=x^2-2x-3$: $f(0)=-3$, así que $(0,\\,-3)$; y al resolver $x^2-2x-3=0$ sale $x=-1$ y $x=3$, así que $(-1,\\,0)$ y $(3,\\,0)$. En una fracción se iguala a 0 el numerador (si el denominador no es 0).',
            'للتقاطع مع محور Y نضع $x=0$: $y=f(0)$ والنقطة $(0,\\,f(0))$. توجد نقطة واحدة على الأكثر، ولا توجد إذا لم يكن 0 في المجال. وللتقاطع مع محور X نضع $y=0$ ونحل المعادلة $f(x)=0$؛ كل حل يعطي نقطة $(x,\\,0)$. في $y=x^2-2x-3$: $f(0)=-3$ إذن $(0,\\,-3)$؛ وبحل $x^2-2x-3=0$ نجد $x=-1$ و$x=3$، إذن $(-1,\\,0)$ و$(3,\\,0)$. وفي الكسر نساوي البسط بالصفر (إذا لم يكن المقام صفرًا).'
        ),
        problem: say('Kalkulatu $y=\\dfrac{2x+6}{x-1}$ funtzioaren ebaki-puntuak ardatzekin.', 'Calcula los puntos de corte de $y=\\dfrac{2x+6}{x-1}$ con los ejes.', 'احسب نقاط تقاطع $y=\\dfrac{2x+6}{x-1}$ مع المحورين.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatza: $x=0$.', 'Eje Y: $x=0$.', 'محور Y: $x=0$.'), math: same('$y=\\dfrac{6}{-1}=-6\\to(0,\\,-6)$') },
            { text: say('X ardatza: zenbakitzailea 0.', 'Eje X: numerador 0.', 'محور X: البسط 0.'), math: same('$2x+6=0\\to(-3,\\,0)$') }
        ],
        example: same('$(0,\\,f(0))$'),
        takeaway: say('Y ardatza: x = 0 jarri. X ardatza: y = 0 jarri eta ekuazioa ebatzi.', 'Eje Y: pon x = 0. Eje X: pon y = 0 y resuelve la ecuación.', 'محور Y: ضع x = 0. محور X: ضع y = 0 وحُلّ المعادلة.'),
        figure: (language) => <InterceptsFormulaFigure language={language} />
    },

    /* ---------- 3. Increasing, extremes and rate ---------- */
    {
        id: 'monotony',
        stage: 'change',
        title: say('Gorakorra eta beherakorra', 'Crecimiento y decrecimiento', 'التزايد والتناقص'),
        goal: say('Funtzio bat gorakorra, beherakorra edo konstantea den tarteak grafikoan irakurtzea eta idaztea.', 'Leer en una gráfica y escribir los intervalos en los que una función crece, decrece o es constante.', 'قراءة فترات تزايد الدالة وتناقصها وثباتها من الرسم وكتابتها.'),
        explanation: say(
            'Funtzio bat gorakorra da tarte batean $x$ handitzean $y$ ere handitzen bada: $x_1<x_2$ bada, $f(x_1)<f(x_2)$. Beherakorra da $x$ handitzean $y$ txikitzen bada, eta konstantea $y$ aldatzen ez bada. Grafikoa beti ezkerretik eskuinera irakurtzen da, mendi bateko bidea balitz bezala: igotzen bada, gorakorra; jaisten bada, beherakorra. Tarteak $x$-ren balioekin idazten dira, irekiak, eta bi tarte edo gehiago $\\cup$ ikurrarekin lotzen dira. Adibidez: gorakorra $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$ eta beherakorra $(-2,\\,2)$. Kontuz: ez idatzi $y$-ren balioak.',
            'Una función es creciente en un intervalo si al aumentar $x$ también aumenta $y$: si $x_1<x_2$, entonces $f(x_1)<f(x_2)$. Es decreciente si al aumentar $x$ disminuye $y$, y constante si $y$ no cambia. La gráfica se lee siempre de izquierda a derecha, como un camino de montaña: si sube, crece; si baja, decrece. Los intervalos se escriben con valores de $x$, abiertos, y dos o más tramos se unen con el signo $\\cup$. Por ejemplo: crece en $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$ y decrece en $(-2,\\,2)$. Cuidado: no escribas los valores de $y$.',
            'تكون الدالة متزايدة في فترة إذا زادت $y$ بزيادة $x$: إذا كان $x_1<x_2$ فإن $f(x_1)<f(x_2)$. وتكون متناقصة إذا نقصت $y$ بزيادة $x$، وثابتة إذا لم تتغير $y$. يُقرأ الرسم دائمًا من اليسار إلى اليمين كطريق جبلي: إذا صعد فهي متزايدة، وإذا نزل فهي متناقصة. تُكتب الفترات بقيم $x$ مفتوحةً، وتُجمع فترتان أو أكثر بالرمز $\\cup$. مثلًا: متزايدة في $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$ ومتناقصة في $(-2,\\,2)$. انتبه: لا تكتب قيم $y$.'
        ),
        problem: say('Grafiko bat $(0,\\,0)$tik $(1,\\,3)$ra igotzen da, $(3,\\,1)$era jaisten da eta $(5,\\,2)$ra igotzen da berriro. Idatzi tarteak.', 'Una gráfica sube de $(0,\\,0)$ a $(1,\\,3)$, baja hasta $(3,\\,1)$ y vuelve a subir hasta $(5,\\,2)$. Escribe los intervalos.', 'يصعد رسم من $(0,\\,0)$ إلى $(1,\\,3)$ وينزل إلى $(3,\\,1)$ ثم يصعد إلى $(5,\\,2)$. اكتب الفترات.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gorakorra.', 'Crece.', 'متزايدة.'), math: same('$(0,\\,1)\\cup(3,\\,5)$') },
            { text: say('Beherakorra.', 'Decrece.', 'متناقصة.'), math: same('$(1,\\,3)$') }
        ],
        example: same('$(-2,\\,2)$'),
        takeaway: say('Ezkerretik eskuinera irakurri eta idatzi x-ren tarteak.', 'Lee de izquierda a derecha y escribe intervalos de x.', 'اقرأ من اليسار إلى اليمين واكتب فترات x.'),
        figure: (language) => <MonotonyFigure language={language} />
    },
    {
        id: 'extrema',
        stage: 'change',
        title: say('Maximoak eta minimoak', 'Máximos y mínimos', 'القيم العظمى والصغرى'),
        goal: say('Maximo eta minimo erlatiboak eta absolutuak aurkitzea grafiko batean.', 'Encontrar máximos y mínimos relativos y absolutos en una gráfica.', 'إيجاد القيم العظمى والصغرى النسبية والمطلقة في رسم.'),
        explanation: say(
            'Funtzio batek maximo erlatibo bat du puntu batean gorakorra izatetik beherakorra izatera igarotzen bada: puntu hori ingurukoak baino altuagoa da (tontor bat). Minimo erlatiboa du beherakorra izatetik gorakorra izatera igarotzen bada (haran bat). Maximo absolutua grafiko osoko punturik altuena da, eta minimo absolutua baxuena; batzuetan izate-eremuaren mutur batean daude, eta orduan ez dira erlatiboak. Puntu osoa ematen da, $(x,\\,y)$: $x$-k esaten du non dagoen eta $y$-k zenbatekoa den. Adibidez, glukemia maximoa $(1,\\,120)$: ordu 1ean, 120 mg/dl.',
            'Una función tiene un máximo relativo en un punto si pasa de ser creciente a ser decreciente: ese punto es más alto que los de su alrededor (una cima). Tiene un mínimo relativo si pasa de decreciente a creciente (un valle). El máximo absoluto es el punto más alto de toda la gráfica, y el mínimo absoluto, el más bajo; a veces están en un extremo del dominio y entonces no son relativos. Se da el punto entero, $(x,\\,y)$: la $x$ dice dónde está y la $y$ cuánto vale. Por ejemplo, el máximo de la glucemia es $(1,\\,120)$: a la 1 h, 120 mg/dl.',
            'للدالة قيمة عظمى نسبية في نقطة إذا انتقلت من التزايد إلى التناقص: تكون تلك النقطة أعلى مما حولها (قمة). ولها قيمة صغرى نسبية إذا انتقلت من التناقص إلى التزايد (وادٍ). القيمة العظمى المطلقة أعلى نقطة في الرسم كله، والصغرى المطلقة أدناها؛ وقد تقعان أحيانًا عند طرف المجال فلا تكونان نسبيتين. تُعطى النقطة كاملة $(x,\\,y)$: $x$ تقول أين و$y$ كم. مثلًا القيمة العظمى لسكر الدم $(1,\\,120)$: بعد ساعة، 120 mg/dl.'
        ),
        problem: say('Funtzio bat gorakorra da $(-\\infty,\\,-3)$ tartean eta beherakorra $(-3,\\,1)$ tartean, eta $f(-3)=2$. Zer dago $x=-3$ puntuan?', 'Una función crece en $(-\\infty,\\,-3)$, decrece en $(-3,\\,1)$ y $f(-3)=2$. ¿Qué hay en $x=-3$?', 'دالة متزايدة في $(-\\infty,\\,-3)$ ومتناقصة في $(-3,\\,1)$ و$f(-3)=2$. ماذا يوجد عند $x=-3$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gorakorretik beherakorrera: maximo erlatiboa.', 'De creciente a decreciente: máximo relativo.', 'من التزايد إلى التناقص: عظمى نسبية.') },
            { text: say('Puntu osoa.', 'El punto entero.', 'النقطة كاملة.'), math: same('$(-3,\\,2)$') }
        ],
        example: same('$(1,\\,120)$'),
        takeaway: say('Maximoa: igotzetik jaistera. Minimoa: jaistetik igotzera. Eman puntu osoa.', 'Máximo: de subir a bajar. Mínimo: de bajar a subir. Da el punto entero.', 'العظمى: من الصعود إلى النزول. الصغرى: من النزول إلى الصعود. أعطِ النقطة كاملة.'),
        figure: (language) => <ExtremaFigure language={language} />
    },
    {
        id: 'rate',
        stage: 'change',
        title: say('Batez besteko aldakuntza-tasa', 'Tasa de variación media', 'معدل التغير المتوسط'),
        goal: say('Tarte bateko batez besteko aldakuntza-tasa kalkulatzea eta interpretatzea.', 'Calcular e interpretar la tasa de variación media en un intervalo.', 'حساب معدل التغير المتوسط في فترة وتفسيره.'),
        explanation: say(
            '$[a,\\,b]$ tarteko batez besteko aldakuntza-tasak (BAT; gaztelaniaz T.V.M.) adierazten du funtzioa batez beste zenbat aldatzen den $x$ unitate bakoitzeko: $\\text{BAT}[a,\\,b]=\\dfrac{f(b)-f(a)}{b-a}$. Grafikoan, $(a,\\,f(a))$ eta $(b,\\,f(b))$ puntuak lotzen dituen zuzenkiaren malda da. Positiboa bada, funtzioa batez beste hazten da tarte horretan; negatiboa bada, txikitzen; 0 bada, muturretan balio bera du. $f(x)=x^2-4x+5$ funtzioan, $[1,\\,4]$ tartean: $\\dfrac{f(4)-f(1)}{4-1}=\\dfrac{5-2}{3}=1$. Denbora-ibilbide grafiko batean, BAT batez besteko abiadura da.',
            'La tasa de variación media en el intervalo $[a,\\,b]$ (T.V.M.) dice cuánto cambia la función, de media, por cada unidad de $x$: $\\text{T.V.M.}[a,\\,b]=\\dfrac{f(b)-f(a)}{b-a}$. En la gráfica es la pendiente del segmento que une los puntos $(a,\\,f(a))$ y $(b,\\,f(b))$. Si es positiva, la función crece de media en ese intervalo; si es negativa, decrece; si es 0, vale lo mismo en los dos extremos. En $f(x)=x^2-4x+5$, en $[1,\\,4]$: $\\dfrac{f(4)-f(1)}{4-1}=\\dfrac{5-2}{3}=1$. En una gráfica espacio-tiempo, la T.V.M. es la velocidad media.',
            'يبيّن معدل التغير المتوسط في الفترة $[a,\\,b]$ مقدار تغير الدالة في المتوسط لكل وحدة من $x$: $\\text{T.V.M.}[a,\\,b]=\\dfrac{f(b)-f(a)}{b-a}$. وهو في الرسم ميل القطعة الواصلة بين النقطتين $(a,\\,f(a))$ و$(b,\\,f(b))$. إذا كان موجبًا فالدالة تتزايد في المتوسط في تلك الفترة؛ وإذا كان سالبًا فهي تتناقص؛ وإذا كان 0 فلها القيمة نفسها عند الطرفين. في $f(x)=x^2-4x+5$ في $[1,\\,4]$: $\\dfrac{f(4)-f(1)}{4-1}=\\dfrac{5-2}{3}=1$. وفي رسم المسافة والزمن يكون المعدل هو السرعة المتوسطة.'
        ),
        problem: say('Harri bat 0 s-tan 0 m-ra dago eta 3 s-tan 75 m-ra. Zein da batez besteko abiadura $[0,\\,3]$ tartean?', 'Una piedra está a 0 m en el segundo 0 y a 75 m en el segundo 3. ¿Cuál es su velocidad media en $[0,\\,3]$?', 'حجر على ارتفاع 0 م في الثانية 0 و75 م في الثانية 3. ما سرعته المتوسطة في $[0,\\,3]$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldaketak zatitu.', 'Divide los cambios.', 'اقسم التغيرين.'), math: same('$\\dfrac{75-0}{3-0}=25$') },
            { text: say('25 m/s.', '25 m/s.', '25 م/ث.') }
        ],
        example: same('$\\dfrac{f(b)-f(a)}{b-a}$'),
        takeaway: say('y-ren aldaketa zati x-ren aldaketa, bi aldeetan ordena berean.', 'Cambio de y entre cambio de x, restando en el mismo orden.', 'تغير y على تغير x، بالطرح بالترتيب نفسه.'),
        figure: (language) => <RateFigure language={language} />
    },

    /* ---------- 4. Continuity, periodicity and tendency ---------- */
    {
        id: 'continuity',
        stage: 'properties',
        title: say('Funtzio jarraituak eta etenak', 'Funciones continuas y discontinuas', 'الدوال المتصلة والمنفصلة'),
        goal: say('Funtzio bat jarraitua den erabakitzea eta etenuneak eta haien arrazoia aurkitzea.', 'Decidir si una función es continua y encontrar sus puntos de discontinuidad y su causa.', 'تقرير ما إذا كانت الدالة متصلة وإيجاد نقاط انقطاعها وسببه.'),
        explanation: say(
            'Funtzio bat jarraitua da bere grafikoa arkatza paperetik altxatu gabe marraz badaiteke. Bestela, etena da, eta etenuneak ditu. Hiru arrazoi ohikoenak: jauzi bat (aparkaleku bateko prezioa ordu bakoitzean igotzen da, mailaz maila), puntu bat lekuz aldatua edo falta dena (grafikoak zulo bat du, puntu huts batekin), eta adar infinitu bat (funtzioa izate-eremutik kanpo dagoen puntu baten ondoan izugarri handitzen edo txikitzen da, $y=\\dfrac{1}{x-2}$ funtzioak $x=2$ puntuan bezala). Puntu huts batek esan nahi du puntu hori ez dagoela grafikoan; puntu beteak, badagoela.',
            'Una función es continua si su gráfica se puede dibujar sin levantar el lápiz del papel. Si no, es discontinua y tiene puntos de discontinuidad. Las tres causas más habituales: un salto (el precio de un aparcamiento sube de golpe cada hora, como una escalera), un punto desplazado o que falta (la gráfica tiene un agujero, con un punto hueco), y una rama infinita (cerca de un punto que no está en el dominio, la función se hace enorme o muy negativa, como $y=\\dfrac{1}{x-2}$ en $x=2$). Un punto hueco indica que ese punto no está en la gráfica; uno relleno, que sí.',
            'تكون الدالة متصلة إذا أمكن رسمها دون رفع القلم عن الورق. وإلا فهي منفصلة ولها نقاط انقطاع. الأسباب الثلاثة الأكثر شيوعًا: قفزة (يرتفع ثمن موقف السيارات فجأة كل ساعة كالدرج)، ونقطة منزاحة أو مفقودة (في الرسم ثقب بنقطة فارغة)، وفرع لانهائي (قرب نقطة ليست في المجال تكبر الدالة جدًا أو تصغر جدًا، مثل $y=\\dfrac{1}{x-2}$ عند $x=2$). النقطة الفارغة تعني أن النقطة ليست على الرسم، والممتلئة أنها عليه.'
        ),
        problem: say('Aparkaleku batek 2 € kobratzen ditu hasitako ordu bakoitzeko. Zenbat ordaintzen da 2 ordu eta 10 minuturengatik? Jarraitua da funtzioa?', 'Un aparcamiento cobra 2 € por cada hora empezada. ¿Cuánto se paga por 2 h y 10 min? ¿Es continua la función?', 'يأخذ موقف سيارات 2 € عن كل ساعة بدأت. كم يُدفع عن ساعتين و10 دقائق؟ هل الدالة متصلة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru ordu hasi dira.', 'Se han empezado tres horas.', 'بدأت ثلاث ساعات.'), math: same('$3\\cdot 2=6$') },
            { text: say('Etena: jauziak ordu bakoitzean.', 'Discontinua: saltos en cada hora.', 'منفصلة: قفزات عند كل ساعة.') }
        ],
        example: same('$y=\\dfrac{1}{x-2}$'),
        takeaway: say('Jarraitua: arkatza altxatu gabe. Etenak: jauziak, zuloak eta adar infinituak.', 'Continua: sin levantar el lápiz. Discontinuidades: saltos, agujeros y ramas infinitas.', 'المتصلة: دون رفع القلم. الانقطاعات: قفزات وثقوب وفروع لانهائية.'),
        figure: (language) => <ContinuityFigure language={language} />
    },
    {
        id: 'periodicity',
        stage: 'properties',
        title: say('Funtzio periodikoak', 'Funciones periódicas', 'الدوال الدورية'),
        goal: say('Funtzio periodikoak ezagutzea, haien periodoa aurkitzea eta urruneko balioak kalkulatzea.', 'Reconocer funciones periódicas, hallar su periodo y calcular valores lejanos.', 'التعرف إلى الدوال الدورية وإيجاد دورها وحساب قيم بعيدة.'),
        explanation: say(
            'Funtzio bat periodikoa da bere grafikoaren zati bat behin eta berriz errepikatzen bada. Errepikatzen den zatiaren luzera periodoa da, $T$: $f(x+T)=f(x)$ edozein $x$-rentzat. Adibidez, 2 minuturo betetzen eta husten den zisterna bat periodikoa da, $T=2$ periodoarekin. Urruneko balio bat kalkulatzeko, $x$ periodoaz zatitzen da eta hondarra hartzen: $17=8\\cdot 2+1$, beraz $f(17)=f(1)$. Halleyren kometa 77 urtean behin hurbiltzen da Eguzkira: 1986an ikusi zen, beraz 2063an itzuliko da.',
            'Una función es periódica si un trozo de su gráfica se repite una y otra vez. La longitud del trozo que se repite es el periodo, $T$: $f(x+T)=f(x)$ para cualquier $x$. Por ejemplo, una cisterna que se llena y se vacía cada 2 minutos es periódica de periodo $T=2$. Para calcular un valor lejano se divide $x$ entre el periodo y se toma el resto: $17=8\\cdot 2+1$, así que $f(17)=f(1)$. El cometa Halley se acerca al Sol cada 77 años: se vio en 1986, así que volverá en 2063.',
            'تكون الدالة دورية إذا تكرر جزء من رسمها مرة بعد مرة. طول الجزء المتكرر هو الدور $T$: $f(x+T)=f(x)$ لأي $x$. مثلًا خزان يمتلئ ويفرغ كل دقيقتين دالة دورية دورها $T=2$. ولحساب قيمة بعيدة نقسم $x$ على الدور ونأخذ الباقي: $17=8\\cdot 2+1$، إذن $f(17)=f(1)$. يقترب مذنب هالي من الشمس كل 77 سنة: شوهد في 1986، إذن سيعود في 2063.'
        ),
        problem: say('Funtzio baten periodoa $T=4$ da eta $f(3)=2{,}5$. Zenbat da $f(23)$?', 'Una función tiene periodo $T=4$ y $f(3)=2{,}5$. ¿Cuánto vale $f(23)$?', 'دالة دورها $T=4$ و$f(3)=2{,}5$. كم تساوي $f(23)$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu periodoaz.', 'Divide entre el periodo.', 'اقسم على الدور.'), math: same('$23=5\\cdot 4+3$') },
            { text: say('Hondarreko balioa.', 'El valor del resto.', 'قيمة الباقي.'), math: same('$f(23)=f(3)=2{,}5$') }
        ],
        example: same('$f(x+T)=f(x)$'),
        takeaway: say('Periodikoa: zati bat errepikatzen da. Urruneko balioak: kendu periodoa.', 'Periódica: un trozo se repite. Valores lejanos: quita el periodo.', 'الدورية: جزء يتكرر. القيم البعيدة: اطرح الدور.'),
        figure: (language) => <PeriodicFigure language={language} />
    },
    {
        id: 'tendency',
        stage: 'properties',
        title: say('Funtzio baten joera', 'Tendencia de una función', 'اتجاه الدالة'),
        goal: say('Funtzio batek $x$ handitzean zein baliotara jotzen duen deskribatzea.', 'Describir a qué valor tiende una función cuando $x$ se hace grande.', 'وصف القيمة التي تتجه إليها الدالة عندما تكبر $x$.'),
        explanation: say(
            'Batzuetan funtzio batek, $x$ handitu ahala, balio jakin batera hurbiltzen jarraitzen du, inoiz iritsi gabe. Balio hori funtzioaren joera da. Urtero erdira murrizten den erradioaktibitateak 0ra jotzen du. Hozkailutik ateratako ur-baso batek gelako tenperaturara jotzen du (22 °C), eta mikrouhinetik ateratakoak ere bai, goitik. Beste funtzio batzuek ez dute joera finkorik: gero eta handiagoak dira (hazkunde mugagabea) edo errepikatu egiten dira (periodikoak). Joera grafiko baten azken zatiari begiratuta igartzen da, eta askotan marra eten horizontal batekin marrazten da.',
            'A veces una función, al crecer $x$, se va acercando cada vez más a un valor sin llegar nunca a él. Ese valor es su tendencia. La radiactividad que se reduce a la mitad cada año tiende a 0. Un vaso de agua sacado de la nevera tiende a la temperatura de la habitación (22 °C), y uno sacado del microondas también, desde arriba. Otras funciones no tienen una tendencia fija: crecen sin parar o se repiten (las periódicas). La tendencia se adivina mirando el último trozo de la gráfica, y a menudo se dibuja con una línea discontinua horizontal.',
            'أحيانًا تقترب الدالة، كلما كبرت $x$، أكثر فأكثر من قيمة دون أن تبلغها أبدًا. تلك القيمة هي اتجاهها. النشاط الإشعاعي الذي ينقص إلى النصف كل سنة يتجه إلى 0. وكأس ماء أُخرج من الثلاجة يتجه إلى حرارة الغرفة (22 °م)، وكذلك الكأس الخارج من الميكروويف لكن من الأعلى. ودوال أخرى ليس لها اتجاه ثابت: تكبر بلا توقف أو تتكرر (الدورية). يُستنتج الاتجاه بالنظر إلى آخر جزء من الرسم، وكثيرًا ما يُرسم بخط أفقي متقطع.'
        ),
        problem: say('Substantzia batek 64 unitate ditu eta urtero erdia galtzen du. Zenbat geratzen dira 4 urtean? Zertara jotzen du?', 'Una sustancia tiene 64 unidades y cada año pierde la mitad. ¿Cuántas quedan a los 4 años? ¿A qué tiende?', 'مادة فيها 64 وحدة وتفقد نصفها كل سنة. كم يبقى بعد 4 سنوات؟ وإلى أين تتجه؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lau aldiz erdira.', 'Cuatro veces a la mitad.', 'أربع مرات إلى النصف.'), math: same('$64\\to 32\\to 16\\to 8\\to 4$') },
            { text: say('0ra jotzen du, inoiz iritsi gabe.', 'Tiende a 0 sin llegar nunca.', 'تتجه إلى 0 دون أن تبلغه.') }
        ],
        example: same('$y\\to 22$'),
        takeaway: say('Joera: x oso handia denean y hurbiltzen den balioa.', 'Tendencia: el valor al que se acerca y cuando x es muy grande.', 'الاتجاه: القيمة التي تقترب منها y عندما تكون x كبيرة جدًا.'),
        figure: (language) => <TendencyFigure language={language} />
    },

    /* ---------- 5. Studying functions ---------- */
    {
        id: 'reading',
        stage: 'study',
        title: say('Testuinguruko grafikoak irakurtzea', 'Interpretar gráficas', 'تفسير الرسوم البيانية'),
        goal: say('Egoera erreal bat deskribatzen duen grafiko bat irakurtzea eta haren ezaugarriak hitzez kontatzea.', 'Leer una gráfica que describe una situación real y contar con palabras sus características.', 'قراءة رسم يصف وضعًا حقيقيًا ووصف خصائصه بالكلمات.'),
        explanation: say(
            'Testuinguru bateko grafiko bat irakurtzeko, lehenik begiratu zer neurtzen duen ardatz bakoitzak eta zein unitatetan, eta zenbat balio duen lauki bakoitzak. Gero, irakurri kurba ezkerretik eskuinera eta kontatu: noiz hazten den eta noiz txikitzen, zein diren maximoak eta minimoak (unitateekin) eta zertara jotzen duen. Adibidez, pertsona osasuntsu batek glukosa hartzen duenean, glukemia 90 mg/dl-tik 120ra igotzen da ordubetean (maximoa), 4 orduan apur bat jaisten da 90etik behera (minimoa) eta 5 orduan normalera itzultzen da. Balio bat irakurtzeko, joan ardatzetik kurbara eta kurbatik beste ardatzera.',
            'Para leer una gráfica de un contexto, mira primero qué mide cada eje y en qué unidades, y cuánto vale cada cuadro. Después lee la curva de izquierda a derecha y cuenta: cuándo crece y cuándo decrece, cuáles son los máximos y mínimos (con sus unidades) y a qué tiende. Por ejemplo, cuando una persona sana toma glucosa, su glucemia sube de 90 mg/dl a 120 en una hora (el máximo), baja algo por debajo de 90 a las 4 h (el mínimo) y vuelve a la normalidad a las 5 h. Para leer un valor, ve del eje a la curva y de la curva al otro eje.',
            'لقراءة رسم في سياق انظر أولًا ماذا يقيس كل محور وبأي وحدة، وكم تساوي كل خانة. ثم اقرأ المنحنى من اليسار إلى اليمين وصِف: متى يتزايد ومتى يتناقص، وما القيم العظمى والصغرى (بوحداتها)، وإلى أين يتجه. مثلًا عندما يتناول شخص سليم الغلوكوز يرتفع سكر دمه من 90 mg/dl إلى 120 في ساعة (العظمى)، وينخفض قليلًا تحت 90 بعد 4 ساعات (الصغرى)، ويعود إلى الطبيعي بعد 5 ساعات. ولقراءة قيمة اذهب من المحور إلى المنحنى ومن المنحنى إلى المحور الآخر.'
        ),
        problem: say('Enpresa baten balioa 600 000 €-koa zen hasieran eta 4 hilabetean 200 000 €-ra jaitsi zen. Zenbat galdu zuen hilabeteko, batez beste?', 'Una empresa valía 600 000 € al abrir y a los 4 meses bajó a 200 000 €. ¿Cuánto perdió por mes, de media?', 'كانت قيمة شركة 600 000 € عند الافتتاح وانخفضت بعد 4 أشهر إلى 200 000 €. كم خسرت في الشهر في المتوسط؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('BAT $[0,\\,4]$ tartean.', 'T.V.M. en $[0,\\,4]$.', 'المعدل في $[0,\\,4]$.'), math: same('$\\dfrac{200\\,000-600\\,000}{4}=-100\\,000$') },
            { text: say('100 000 € hilabeteko.', '100 000 € al mes.', '100 000 € في الشهر.') }
        ],
        example: same('$(1,\\,120)$'),
        takeaway: say('Lehenik ardatzak eta unitateak; gero kurba, ezkerretik eskuinera.', 'Primero los ejes y las unidades; después la curva, de izquierda a derecha.', 'أولًا المحاور والوحدات، ثم المنحنى من اليسار إلى اليمين.'),
        figure: (language) => <GlucoseFigure language={language} />
    },
    {
        id: 'study',
        stage: 'study',
        title: say('Funtzio baten azterketa osoa', 'Estudio completo de una función', 'دراسة كاملة لدالة'),
        goal: say('Grafiko baten ezaugarri guztiak ordenan aztertzea: izate-eremua, ebaki-puntuak, hazkundea, muturrak, jarraitutasuna eta periodikotasuna.', 'Estudiar en orden todas las características de una gráfica: dominio, cortes, crecimiento, extremos, continuidad y periodicidad.', 'دراسة كل خصائص رسم بالترتيب: المجال ونقاط التقاطع والتزايد والقيم القصوى والاتصال والدورية.'),
        explanation: say(
            'Funtzio bat osorik aztertzeko, jarraitu beti ordena bera, ezer ez ahazteko. 1) Izate-eremua eta ibiltartea. 2) Ebaki-puntuak ardatzekin. 3) Gorakorra eta beherakorra den tarteak. 4) Maximoak eta minimoak. 5) Jarraitutasuna eta periodikotasuna (eta joera, badu). Adibide-grafikoan: Dom $f=[0,\\,8]$ eta Rec $f=[0,\\,3]$; ardatzak $(0,\\,0)$ eta $(8,\\,0)$ puntuetan ebakitzen ditu; gorakorra da $(0,\\,1)\\cup(3,\\,5)\\cup(6,\\,7)$ tartean eta beherakorra $(1,\\,3)\\cup(5,\\,6)\\cup(7,\\,8)$ tartean; maximoak $(1,\\,3)$, $(5,\\,2)$ eta $(7,\\,3)$ dira, eta minimoak $(3,\\,1)$ eta $(6,\\,1)$; jarraitua da eta ez periodikoa.',
            'Para estudiar una función completa, sigue siempre el mismo orden y no se te olvidará nada. 1) Dominio y recorrido. 2) Puntos de corte con los ejes. 3) Intervalos de crecimiento y decrecimiento. 4) Máximos y mínimos. 5) Continuidad y periodicidad (y tendencia, si la hay). En la gráfica de ejemplo: Dom $f=[0,\\,8]$ y Rec $f=[0,\\,3]$; corta a los ejes en $(0,\\,0)$ y $(8,\\,0)$; crece en $(0,\\,1)\\cup(3,\\,5)\\cup(6,\\,7)$ y decrece en $(1,\\,3)\\cup(5,\\,6)\\cup(7,\\,8)$; tiene máximos en $(1,\\,3)$, $(5,\\,2)$ y $(7,\\,3)$, y mínimos en $(3,\\,1)$ y $(6,\\,1)$; es continua y no es periódica.',
            'لدراسة دالة كاملة اتبع دائمًا الترتيب نفسه فلن تنسى شيئًا. 1) المجال والمدى. 2) نقاط التقاطع مع المحورين. 3) فترات التزايد والتناقص. 4) القيم العظمى والصغرى. 5) الاتصال والدورية (والاتجاه إن وُجد). في الرسم المثال: Dom $f=[0,\\,8]$ وRec $f=[0,\\,3]$؛ يقطع المحورين في $(0,\\,0)$ و$(8,\\,0)$؛ يتزايد في $(0,\\,1)\\cup(3,\\,5)\\cup(6,\\,7)$ ويتناقص في $(1,\\,3)\\cup(5,\\,6)\\cup(7,\\,8)$؛ له قيم عظمى في $(1,\\,3)$ و$(5,\\,2)$ و$(7,\\,3)$ وصغرى في $(3,\\,1)$ و$(6,\\,1)$؛ وهو متصل وغير دوري.'
        ),
        problem: say('Abiadura-grafiko bat: 0tik 10 minutura 0tik 90 km/h-ra igotzen da, 15 minutura 45era jaisten da, 20 minutura 60ra igotzen da eta 25ean gelditzen da. Zenbat maximo ditu?', 'Una gráfica de velocidad sube de 0 a 90 km/h entre el minuto 0 y el 10, baja a 45 en el 15, sube a 60 en el 20 y se para en el 25. ¿Cuántos máximos tiene?', 'رسم سرعة يصعد من 0 إلى 90 كم/س بين الدقيقة 0 و10، وينزل إلى 45 في الدقيقة 15، ويصعد إلى 60 في الدقيقة 20، ويتوقف في الدقيقة 25. كم قيمة عظمى له؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Igotzetik jaistera: $x=10$ eta $x=20$.', 'De subir a bajar: $x=10$ y $x=20$.', 'من الصعود إلى النزول: $x=10$ و$x=20$.'), math: same('$(10,\\,90)\\quad(20,\\,60)$') },
            { text: say('Bi maximo; minimoa $(15,\\,45)$.', 'Dos máximos; mínimo en $(15,\\,45)$.', 'قيمتان عظميان؛ والصغرى $(15,\\,45)$.') }
        ],
        example: same('$[0,\\,8]$'),
        takeaway: say('Izate-eremua, ebakiak, hazkundea, muturrak, jarraitutasuna: beti ordena horretan.', 'Dominio, cortes, crecimiento, extremos, continuidad: siempre en ese orden.', 'المجال، التقاطع، التزايد، القيم القصوى، الاتصال: دائمًا بهذا الترتيب.'),
        figure: (language) => <StudyFigure language={language} />
    },
    {
        id: 'modelling',
        stage: 'study',
        title: say('Problema batetik funtziora', 'De un problema a una función', 'من مسألة إلى دالة'),
        goal: say('Enuntziatu batetik funtzioaren formula idaztea, zentzua duen izate-eremua erabakitzea eta balioak kalkulatzea.', 'Escribir la fórmula de una función a partir de un enunciado, decidir su dominio con sentido y calcular valores.', 'كتابة صيغة الدالة من نص، وتحديد مجالها المنطقي، وحساب قيم.'),
        explanation: say(
            'Enuntziatu batek funtzio bat ezkutatzen du askotan. Formula idazteko: aukeratu aldagai askea ($x$, aldatzen duguna), idatzi beste magnitude guztiak $x$-ren arabera eta erlazionatu. Adibidez, 40 × 30 cm-ko kartulina bati $x$ aldeko karratu bat moztuz gero izkina bakoitzean, kutxaren oinarriak $(40-2x)$ eta $(30-2x)$ neurtzen ditu eta altuera $x$ da: $V(x)=(40-2x)(30-2x)\\,x$. Izate-eremua problemaren zentzutik dator: $x>0$ eta $30-2x>0$, beraz $0<x<15$. Orduan taula bat egin daiteke: $V(5)=30\\cdot 20\\cdot 5=3000$ cm³. Fotokopietan, aldiz, $x$ zenbaki osoa da.',
            'Muchas veces un enunciado esconde una función. Para escribir la fórmula: elige la variable independiente ($x$, lo que cambiamos), escribe las demás magnitudes en función de $x$ y relaciónalas. Por ejemplo, si a una cartulina de 40 × 30 cm se le corta un cuadrado de lado $x$ en cada esquina, la base de la caja mide $(40-2x)$ por $(30-2x)$ y la altura es $x$: $V(x)=(40-2x)(30-2x)\\,x$. El dominio sale del sentido del problema: $x>0$ y $30-2x>0$, así que $0<x<15$. Después se puede hacer una tabla: $V(5)=30\\cdot 20\\cdot 5=3000$ cm³. En las fotocopias, en cambio, $x$ es un número entero.',
            'كثيرًا ما يخفي النص دالة. لكتابة الصيغة: اختر المتغير المستقل ($x$، ما نغيّره)، واكتب بقية المقادير بدلالة $x$ واربطها. مثلًا إذا قُصّ من ورق مقوى 40 × 30 سم مربع ضلعه $x$ في كل زاوية، فإن قاعدة العلبة $(40-2x)$ في $(30-2x)$ وارتفاعها $x$: $V(x)=(40-2x)(30-2x)\\,x$. المجال من معنى المسألة: $x>0$ و$30-2x>0$، إذن $0<x<15$. ثم يمكن عمل جدول: $V(5)=30\\cdot 20\\cdot 5=3000$ سم³. أما في النسخ المصورة فإن $x$ عدد صحيح.'
        ),
        problem: say('7 cm-ko aldeko karratu baten barruan beste karratu bat inskribatzen da, erpin bakoitza $x$ distantziara jarrita. Bere azalera $A(x)=x^2+(7-x)^2$ da. Kalkulatu $A(3)$.', 'Dentro de un cuadrado de 7 cm de lado se inscribe otro con cada vértice a distancia $x$. Su área es $A(x)=x^2+(7-x)^2$. Calcula $A(3)$.', 'داخل مربع ضلعه 7 سم يُرسم مربع آخر كل رأس منه على بعد $x$. مساحته $A(x)=x^2+(7-x)^2$. احسب $A(3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu $x=3$.', 'Sustituye $x=3$.', 'عوّض $x=3$.'), math: same('$3^2+4^2$') },
            { text: say('25 cm².', '25 cm².', '25 سم².'), math: same('$9+16=25$') }
        ],
        example: same('$0<x<15$'),
        takeaway: say('Aukeratu x, idatzi dena x-ren arabera eta begiratu zein balio diren zentzuzkoak.', 'Elige x, escribe todo en función de x y mira qué valores tienen sentido.', 'اختر x واكتب كل شيء بدلالتها وانظر أي القيم لها معنى.'),
        figure: (language) => <BoxModelFigure language={language} />
    }
]
