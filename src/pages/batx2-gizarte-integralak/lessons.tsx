import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { same, say } from '../batx1-zientziak-funtzioak/text'
import { AccumulatedFigure, AreaAxisFigure, AreaSignFigure, BarrowFigure, BetweenFigure, ConditionFigure, CostFigure, ExpLogFigure, IncomeFigure, LogExpChainFigure, PowerChainFigure, PowersFigure, PrimitiveFigure, PropertiesFigure, RectanglesFigure } from './figures'
import { bach2gIntegralsLessonChecks, type Bach2gIntegralsTopicId } from './lessonChecks'
import { bach2gIntegralsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Integralak · Batxilergoa 2 · Gizarte Zientziak — stages and lessons. One
   topic with the scope of unit 9 of Santillana 2.º Bachillerato Ciencias
   Sociales and of Anaya Matemáticas Aplicadas a las CCSS II: primitives
   and immediate integrals (powers, e^x, 1/x and the compound f′·fⁿ, f′/f
   and f′·e^f), a primitive through a point, the area with rectangles,
   Barrow's rule and the properties, areas between a curve and the axis
   (with changes of sign) and between two curves, and economy: the cost
   from the marginal one, what piles up over a period and the income
   from the marginal one. Without integration by parts, rational
   integrals or change of variable (owner, 2026-11-17).
   ========================================================================== */

export type Bach2gIntegralsStageId = 'primitives' | 'composite' | 'definite' | 'areas' | 'economy'

export const bach2gIntegralsStages: UnitStage[] = [
    { id: 'primitives', tone: 'blue', title: { eu: 'Jatorrizkoak', es: 'Primitivas', en: 'Antiderivatives', ar: 'الدوال الأصلية' } },
    { id: 'composite', tone: 'violet', title: { eu: 'Berehalako konposatuak', es: 'Inmediatas compuestas', en: 'Compound immediate integrals', ar: 'التكاملات الفورية المركبة' } },
    { id: 'definite', tone: 'mustard', title: { eu: 'Integral mugatua', es: 'Integral definida', en: 'The definite integral', ar: 'التكامل المحدد' } },
    { id: 'areas', tone: 'coral', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' } },
    { id: 'economy', tone: 'green', title: { eu: 'Ekonomian', es: 'En economía', en: 'In economics', ar: 'في الاقتصاد' } }
]

const INTEGRALS1 = 'batx1-zientziak/integrales'
const DERIVATIVES2 = 'batx2-gizarte/derivadas'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Antiderivatives ---------- */
    {
        id: 'primitive',
        stage: 'primitives',
        title: say('Jatorrizkoa eta integral mugagabea', 'Primitiva e integral indefinida', 'الدالة الأصلية والتكامل غير المحدد', 'Antiderivative and indefinite integral'),
        goal: say('Jatorrizko bat deribatuz egiaztatzea, eta ulertzea funtzio batek jatorrizko asko dituela, konstante batean bereizten direnak.', 'Comprobar una primitiva derivando y entender que una función tiene muchas primitivas, que se diferencian en una constante.', 'التحقق من دالة أصلية بالاشتقاق، وفهم أن للدالة دوالًا أصلية كثيرة تختلف بثابت.', 'Check an antiderivative by differentiating and understand that a function has many antiderivatives, which differ by a constant.'),
        needs: [
            { unit: DERIVATIVES2, topic: 'powers', title: { eu: 'Berreturak, erroak eta baturak', es: 'Potencias, raíces y sumas', en: 'Powers, roots and sums', ar: 'القوى والجذور والمجاميع' } }
        ],
        problem: say('Egiaztatu $F(x)=x^3+2x$ funtzioa $f(x)=3x^2+2$ funtzioaren jatorrizkoa dela, eta idatzi jatorrizko guztiak.', 'Comprueba que $F(x)=x^3+2x$ es una primitiva de $f(x)=3x^2+2$ y escribe todas las primitivas.', 'تحقّق أن $F(x)=x^3+2x$ دالة أصلية لـ $f(x)=3x^2+2$، واكتب كل الدوال الأصلية.', 'Check that $F(x)=x^3+2x$ is an antiderivative of $f(x)=3x^2+2$ and write all the antiderivatives.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatu $F$.', 'Deriva $F$.', 'اشتق $F$.', 'Differentiate $F$.'), math: same("$F'(x)=3x^2+2=f(x)$") },
            { text: say('Konstante bat gehituz, deribatua ez da aldatzen.', 'Si se suma una constante, la derivada no cambia.', 'إضافة ثابت لا تغيّر المشتقة.', 'Adding a constant does not change the derivative.'), math: same("$(x^3+2x+5)'=3x^2+2$") },
            { text: say('Jatorrizko guztiak.', 'Todas las primitivas.', 'كل الدوال الأصلية.', 'All the antiderivatives.'), math: same('$\\int(3x^2+2)\\,dx=x^3+2x+C$') }
        ],
        takeaway: say('$F$ funtzioa $f$ funtzioaren jatorrizkoa da $F\'=f$ bada. Integral mugagabea jatorrizko guztien multzoa da: $\\int f(x)\\,dx=F(x)+C$.', '$F$ es una primitiva de $f$ si $F\'=f$. La integral indefinida es el conjunto de todas las primitivas: $\\int f(x)\\,dx=F(x)+C$.', '$F$ دالة أصلية لـ $f$ إذا كانت $F\'=f$. والتكامل غير المحدد هو مجموعة كل الدوال الأصلية: $\\int f(x)\\,dx=F(x)+C$.', '$F$ is an antiderivative of $f$ if $F\'=f$. The indefinite integral is the set of all antiderivatives: $\\int f(x)\\,dx=F(x)+C$.'),
        figure: (language) => <PrimitiveFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'powers',
        stage: 'primitives',
        title: say('Berreturak eta baturak', 'Potencias y sumas', 'القوى والمجاميع', 'Powers and sums'),
        goal: say('Polinomioak eta erroak integratzea: berretzailea bat igo eta berretzaile berriaz zatitu, gaiz gai.', 'Integrar polinomios y raíces: subir el exponente en uno y dividir entre el nuevo exponente, término a término.', 'تكامل الحدوديات والجذور: زيادة الأس بواحد والقسمة على الأس الجديد حدًّا حدًّا.', 'Integrate polynomials and roots: raise the exponent by one and divide by the new exponent, term by term.'),
        needs: [
            { unit: INTEGRALS1, topic: 'power-rule', title: { eu: 'Berredura baten integrala', es: 'Integral de una potencia', en: 'Integral of a power', ar: 'تكامل القوة' } }
        ],
        problem: say('Kalkulatu $\\int(6x^2-4x+5)\\,dx$.', 'Calcula $\\int(6x^2-4x+5)\\,dx$.', 'احسب $\\int(6x^2-4x+5)\\,dx$.', 'Work out $\\int(6x^2-4x+5)\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gaiz gai.', 'Término a término.', 'حدًّا حدًّا.', 'Term by term.'), math: same('$6\\cdot\\frac{x^3}{3}-4\\cdot\\frac{x^2}{2}+5x$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$2x^3-2x^2+5x$') },
            { text: say('Ez ahaztu konstantea.', 'No olvides la constante.', 'لا تنس الثابت.', 'Do not forget the constant.'), math: same('$2x^3-2x^2+5x+C$') }
        ],
        takeaway: say('$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$ ($n\\ne -1$). Konstanteak kanpora ateratzen dira eta batura gaiz gai integratzen da.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$ ($n\\ne -1$). Las constantes salen fuera y la suma se integra término a término.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$ ($n\\ne -1$). تخرج الثوابت ويُكامل المجموع حدًّا حدًّا.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$ ($n\\ne -1$). Constants come out and a sum is integrated term by term.'),
        figure: (language) => <PowersFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'exp-log',
        stage: 'primitives',
        title: say('Esponentziala eta 1/x', 'La exponencial y 1/x', 'الأسية و1/x', 'The exponential and 1/x'),
        goal: say('$e^{x}$ eta $\\frac{1}{x}$ integratzea: berreturaren erregelak ez du balio $n=-1$ denean, eta logaritmoa agertzen da.', 'Integrar $e^{x}$ y $\\frac{1}{x}$: la regla de la potencia no sirve con $n=-1$, y aparece el logaritmo.', 'تكامل $e^{x}$ و$\\frac{1}{x}$: قاعدة القوة لا تصلح مع $n=-1$، فيظهر اللوغاريتم.', 'Integrate $e^{x}$ and $\\frac{1}{x}$: the power rule fails for $n=-1$, and the logarithm appears.'),
        needs: [
            { unit: INTEGRALS1, topic: 'exp-log', title: { eu: 'Esponentzialak eta logaritmoak', es: 'Exponenciales y logaritmos', en: 'Exponentials and logarithms', ar: 'الدوال الأسية واللوغاريتمية' } }
        ],
        problem: say('Kalkulatu $\\int\\left(e^{x}+\\frac{3}{x}\\right)dx$.', 'Calcula $\\int\\left(e^{x}+\\frac{3}{x}\\right)dx$.', 'احسب $\\int\\left(e^{x}+\\frac{3}{x}\\right)dx$.', 'Work out $\\int\\left(e^{x}+\\frac{3}{x}\\right)dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$e^{x}$ funtzioaren jatorrizkoa bera da.', 'La primitiva de $e^{x}$ es ella misma.', 'الدالة الأصلية لـ $e^{x}$ هي نفسها.', 'The antiderivative of $e^{x}$ is itself.'), math: same('$\\int e^{x}\\,dx=e^{x}$') },
            { text: say('$\\frac{1}{x}$ funtzioarena, logaritmoa.', 'La de $\\frac{1}{x}$, el logaritmo.', 'ولـ $\\frac{1}{x}$ اللوغاريتم.', 'That of $\\frac{1}{x}$, the logarithm.'), math: same('$\\int\\frac{3}{x}\\,dx=3\\ln|x|$') },
            { text: say('Elkartu.', 'Junta.', 'اجمع.', 'Put them together.'), math: same('$e^{x}+3\\ln|x|+C$') }
        ],
        takeaway: say('$\\int e^{x}\\,dx=e^{x}+C$ eta $\\int\\frac{1}{x}\\,dx=\\ln|x|+C$. Balio absolutuak $x<0$ denean ere balio du.', '$\\int e^{x}\\,dx=e^{x}+C$ y $\\int\\frac{1}{x}\\,dx=\\ln|x|+C$. El valor absoluto hace que sirva también con $x<0$.', '$\\int e^{x}\\,dx=e^{x}+C$ و$\\int\\frac{1}{x}\\,dx=\\ln|x|+C$. والقيمة المطلقة تجعلها تصلح مع $x<0$ أيضًا.', '$\\int e^{x}\\,dx=e^{x}+C$ and $\\int\\frac{1}{x}\\,dx=\\ln|x|+C$. The absolute value makes it work for $x<0$ too.'),
        figure: (language) => <ExpLogFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Compound immediate integrals ---------- */
    {
        id: 'power-chain',
        stage: 'composite',
        title: say('Barrukoaren deribatua eta berretura', 'La derivada de dentro y una potencia', 'مشتقة الداخل وقوة', 'The inside derivative and a power'),
        goal: say('$f\'\\cdot f^n$ itxurako integralak ezagutzea: barrukoaren deribatua kanpoan badago, berreturaren erregela erabiltzen da.', 'Reconocer integrales de la forma $f\'\\cdot f^n$: si la derivada de dentro está fuera, se usa la regla de la potencia.', 'التعرف على تكاملات من الشكل $f\'\\cdot f^n$: إذا كانت مشتقة الداخل في الخارج نستعمل قاعدة القوة.', 'Recognise integrals of the form $f\'\\cdot f^n$: if the derivative of the inside is outside, the power rule is used.'),
        needs: [
            { unit: DERIVATIVES2, topic: 'chain-power', title: { eu: 'Katearen erregela: berreturak eta erroak', es: 'Regla de la cadena: potencias y raíces', en: 'Chain rule: powers and roots', ar: 'قاعدة السلسلة: القوى والجذور' } }
        ],
        problem: say('Kalkulatu $\\int 2x(x^2+1)^3\\,dx$.', 'Calcula $\\int 2x(x^2+1)^3\\,dx$.', 'احسب $\\int 2x(x^2+1)^3\\,dx$.', 'Work out $\\int 2x(x^2+1)^3\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrukoa $x^2+1$ da, eta haren deribatua $2x$.', 'Lo de dentro es $x^2+1$, y su derivada $2x$.', 'ما في الداخل $x^2+1$ ومشتقته $2x$.', 'The inside is $x^2+1$, and its derivative $2x$.'), math: same("$(x^2+1)'=2x$") },
            { text: say('Berreturaren erregela barrukoarekin.', 'La regla de la potencia con lo de dentro.', 'قاعدة القوة مع ما في الداخل.', 'The power rule with the inside.'), math: same('$\\frac{(x^2+1)^4}{4}+C$') },
            { text: say('Egiaztatu deribatuz.', 'Comprueba derivando.', 'تحقّق بالاشتقاق.', 'Check by differentiating.'), math: same("$\\left(\\frac{(x^2+1)^4}{4}\\right)'=(x^2+1)^3\\cdot 2x$") }
        ],
        takeaway: say('$\\int f\'(x)\\,f(x)^n\\,dx=\\frac{f(x)^{n+1}}{n+1}+C$. Barrukoaren deribatua falta bada zenbaki batean, zenbaki horrekin doitzen da.', '$\\int f\'(x)\\,f(x)^n\\,dx=\\frac{f(x)^{n+1}}{n+1}+C$. Si a la derivada de dentro le falta un número, se ajusta con ese número.', '$\\int f\'(x)\\,f(x)^n\\,dx=\\frac{f(x)^{n+1}}{n+1}+C$. وإذا نقص مشتقةَ الداخل عددٌ نعدّلها بذلك العدد.', '$\\int f\'(x)\\,f(x)^n\\,dx=\\frac{f(x)^{n+1}}{n+1}+C$. If the inside derivative is missing a number, adjust with that number.'),
        figure: (language) => <PowerChainFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'log-exp-chain',
        stage: 'composite',
        title: say('Logaritmoa eta esponentziala katean', 'Logaritmo y exponencial en cadena', 'اللوغاريتم والأسية بالسلسلة', 'Logarithm and exponential in a chain'),
        goal: say('$\\frac{f\'}{f}$ eta $f\'\\cdot e^{f}$ itxurak ezagutzea: lehenak logaritmoa ematen du eta bigarrenak esponentziala.', 'Reconocer las formas $\\frac{f\'}{f}$ y $f\'\\cdot e^{f}$: la primera da un logaritmo y la segunda una exponencial.', 'التعرف على الشكلين $\\frac{f\'}{f}$ و$f\'\\cdot e^{f}$: الأول يعطي لوغاريتمًا والثاني أسية.', 'Recognise the forms $\\frac{f\'}{f}$ and $f\'\\cdot e^{f}$: the first gives a logarithm and the second an exponential.'),
        needs: [
            { unit: DERIVATIVES2, topic: 'chain-log', title: { eu: 'Funtzio logaritmikoak', es: 'Funciones logarítmicas', en: 'Logarithmic functions', ar: 'الدوال اللوغاريتمية' } }
        ],
        problem: say('Kalkulatu $\\int\\frac{2x}{x^2+5}\\,dx$ eta $\\int 3e^{3x}\\,dx$.', 'Calcula $\\int\\frac{2x}{x^2+5}\\,dx$ y $\\int 3e^{3x}\\,dx$.', 'احسب $\\int\\frac{2x}{x^2+5}\\,dx$ و$\\int 3e^{3x}\\,dx$.', 'Work out $\\int\\frac{2x}{x^2+5}\\,dx$ and $\\int 3e^{3x}\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Goian behekoaren deribatua dago.', 'Arriba está la derivada de abajo.', 'في البسط مشتقة المقام.', 'On top is the derivative of the bottom.'), math: same("$(x^2+5)'=2x$") },
            { text: say('Logaritmoa.', 'Logaritmo.', 'لوغاريتم.', 'Logarithm.'), math: same('$\\int\\frac{2x}{x^2+5}\\,dx=\\ln(x^2+5)+C$') },
            { text: say('Esponentzialaren aurrean, berretzailearen deribatua.', 'Delante de la exponencial, la derivada del exponente.', 'أمام الأسية مشتقة الأس.', 'In front of the exponential, the derivative of the exponent.'), math: same('$\\int 3e^{3x}\\,dx=e^{3x}+C$') }
        ],
        takeaway: say('$\\int\\frac{f\'(x)}{f(x)}\\,dx=\\ln|f(x)|+C$ eta $\\int f\'(x)\\,e^{f(x)}\\,dx=e^{f(x)}+C$. Gakoa da barrukoaren deribatua bilatzea.', '$\\int\\frac{f\'(x)}{f(x)}\\,dx=\\ln|f(x)|+C$ y $\\int f\'(x)\\,e^{f(x)}\\,dx=e^{f(x)}+C$. La clave es buscar la derivada de dentro.', '$\\int\\frac{f\'(x)}{f(x)}\\,dx=\\ln|f(x)|+C$ و$\\int f\'(x)\\,e^{f(x)}\\,dx=e^{f(x)}+C$. المفتاح هو البحث عن مشتقة الداخل.', '$\\int\\frac{f\'(x)}{f(x)}\\,dx=\\ln|f(x)|+C$ and $\\int f\'(x)\\,e^{f(x)}\\,dx=e^{f(x)}+C$. The key is to look for the derivative of the inside.'),
        figure: (language) => <LogExpChainFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'condition',
        stage: 'composite',
        title: say('Puntu batetik igarotzen den jatorrizkoa', 'La primitiva que pasa por un punto', 'الدالة الأصلية التي تمر بنقطة', 'The antiderivative through a point'),
        goal: say('Jatorrizko guztien artean, baldintza bat betetzen duena aukeratzea: puntua ordezkatu eta $C$ ebatzi.', 'Elegir, entre todas las primitivas, la que cumple una condición: sustituir el punto y despejar $C$.', 'اختيار الدالة الأصلية التي تحقق شرطًا من بين كلها: عوّض النقطة واستخرج $C$.', 'Choose, among all the antiderivatives, the one that meets a condition: substitute the point and solve for $C$.'),
        needs: [
            { unit: INTEGRALS1, topic: 'through-point', title: { eu: 'Puntu batetik pasatzen den jatorrizkoa', es: 'Primitiva que pasa por un punto', en: 'An antiderivative through a point', ar: 'دالة أصلية تمر بنقطة' } }
        ],
        problem: say('$F\'(x)=2x+3$ eta $F(1)=6$. Aurkitu $F$.', '$F\'(x)=2x+3$ y $F(1)=6$. Halla $F$.', '$F\'(x)=2x+3$ و$F(1)=6$. أوجد $F$.', '$F\'(x)=2x+3$ and $F(1)=6$. Find $F$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jatorrizko guztiak.', 'Todas las primitivas.', 'كل الدوال الأصلية.', 'All the antiderivatives.'), math: same('$F(x)=x^2+3x+C$') },
            { text: say('Ordezkatu baldintza.', 'Sustituye la condición.', 'عوّض الشرط.', 'Substitute the condition.'), math: same('$1+3+C=6\\ \\to\\ C=2$') },
            { text: say('Bakarra.', 'La única.', 'الوحيدة.', 'The only one.'), math: same('$F(x)=x^2+3x+2$') }
        ],
        takeaway: say('Jatorrizko-familiako kurba guztiak bata bestearen gainean daude, gora edo behera mugituta. Puntu batek bakarra aukeratzen du: $C$ ebazten da.', 'Todas las curvas de la familia de primitivas están una encima de otra, desplazadas arriba o abajo. Un punto elige una sola: se despeja $C$.', 'كل منحنيات عائلة الدوال الأصلية متراكبة، مزاحة إلى الأعلى أو الأسفل. ونقطة واحدة تختار منحنى واحدًا: نستخرج $C$.', 'All the curves of the family of antiderivatives sit one above another, shifted up or down. A point picks just one: solve for $C$.'),
        figure: (language) => <ConditionFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. The definite integral ---------- */
    {
        id: 'rectangles',
        stage: 'definite',
        title: say('Azalera laukizuzenekin', 'El área con rectángulos', 'المساحة بالمستطيلات', 'Area with rectangles'),
        goal: say('Kurba baten azpiko azalera laukizuzenekin gutxi gorabehera kalkulatzea, eta ikustea laukizuzen gehiagorekin hurbilketa hobea dela.', 'Calcular de forma aproximada el área bajo una curva con rectángulos y ver que con más rectángulos la aproximación mejora.', 'حساب المساحة تحت منحنى تقريبيًا بالمستطيلات، ورؤية أن التقريب يتحسن بمستطيلات أكثر.', 'Approximate the area under a curve with rectangles and see that more rectangles give a better approximation.'),
        needs: [
            { unit: INTEGRALS1, topic: 'rectangles', title: { eu: 'Azalera laukizuzenekin', es: 'Área con rectángulos', en: 'Area with rectangles', ar: 'المساحة بالمستطيلات' } }
        ],
        problem: say('Kalkulatu gutxi gorabehera $y=x^2$ kurbaren azpiko azalera $[0,2]$ tartean, eskuineko altuera duten 4 laukizuzenekin.', 'Calcula de forma aproximada el área bajo $y=x^2$ en $[0,2]$ con 4 rectángulos de altura por la derecha.', 'احسب تقريبيًا المساحة تحت $y=x^2$ على $[0,2]$ بأربعة مستطيلات بارتفاع الطرف الأيمن.', 'Approximate the area under $y=x^2$ on $[0,2]$ with 4 rectangles of right-hand height.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zabalera bakoitza $\\frac{2}{4}$.', 'Cada anchura, $\\frac{2}{4}$.', 'كل عرض $\\frac{2}{4}$.', 'Each width, $\\frac{2}{4}$.'), math: same('$\\frac{1}{2}$') },
            { text: say('Altuerak $f(0{,}5)$, $f(1)$, $f(1{,}5)$ eta $f(2)$.', 'Alturas $f(0{,}5)$, $f(1)$, $f(1{,}5)$ y $f(2)$.', 'الارتفاعات $f(0{,}5)$ و$f(1)$ و$f(1{,}5)$ و$f(2)$.', 'Heights $f(0{,}5)$, $f(1)$, $f(1{,}5)$ and $f(2)$.'), math: same('$0{,}25+1+2{,}25+4=7{,}5$') },
            { text: say('Azalera hurbildua.', 'El área aproximada.', 'المساحة التقريبية.', 'The approximate area.'), math: same('$7{,}5\\cdot\\frac{1}{2}=3{,}75$') }
        ],
        takeaway: say('Laukizuzenak gero eta estuagoak direnean, haien batura azalera zehatzera hurbiltzen da: hori da integral mugatua, $\\int_a^b f(x)\\,dx$.', 'Cuando los rectángulos son cada vez más estrechos, su suma se acerca al área exacta: eso es la integral definida, $\\int_a^b f(x)\\,dx$.', 'عندما تضيق المستطيلات أكثر فأكثر يقترب مجموعها من المساحة الدقيقة: ذلك هو التكامل المحدد $\\int_a^b f(x)\\,dx$.', 'As the rectangles get narrower, their sum approaches the exact area: that is the definite integral, $\\int_a^b f(x)\\,dx$.'),
        figure: (language) => <RectanglesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'barrow',
        stage: 'definite',
        title: say('Barrow-en erregela', 'La regla de Barrow', 'قاعدة بارو', "Barrow's rule"),
        goal: say('Integral mugatua jatorrizko batekin kalkulatzea: $F(b)-F(a)$.', 'Calcular una integral definida con una primitiva: $F(b)-F(a)$.', 'حساب تكامل محدد بدالة أصلية: $F(b)-F(a)$.', 'Work out a definite integral with an antiderivative: $F(b)-F(a)$.'),
        needs: [
            { unit: INTEGRALS1, topic: 'barrow', title: { eu: 'Barrow-ren erregela', es: 'Regla de Barrow', en: 'Barrow\'s rule', ar: 'قاعدة بارو' } }
        ],
        problem: say('Kalkulatu $\\int_1^3(2x+1)\\,dx$.', 'Calcula $\\int_1^3(2x+1)\\,dx$.', 'احسب $\\int_1^3(2x+1)\\,dx$.', 'Work out $\\int_1^3(2x+1)\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jatorrizko bat ($C$ gabe).', 'Una primitiva (sin $C$).', 'دالة أصلية (بدون $C$).', 'An antiderivative (no $C$).'), math: same('$F(x)=x^2+x$') },
            { text: say('Goiko muga ken behekoa.', 'Límite de arriba menos el de abajo.', 'الحد العلوي ناقص السفلي.', 'Top limit minus bottom one.'), math: same('$F(3)-F(1)=12-2$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: same('$10$') }
        ],
        takeaway: say('$\\int_a^b f(x)\\,dx=F(b)-F(a)$, $F$ edozein jatorrizko izanik. $C$ ez da behar: kenketan desagertzen da.', '$\\int_a^b f(x)\\,dx=F(b)-F(a)$, con $F$ cualquier primitiva. La $C$ no hace falta: se va en la resta.', '$\\int_a^b f(x)\\,dx=F(b)-F(a)$ حيث $F$ أي دالة أصلية. ولا حاجة إلى $C$: يختفي في الطرح.', '$\\int_a^b f(x)\\,dx=F(b)-F(a)$, with $F$ any antiderivative. No $C$ is needed: it cancels in the subtraction.'),
        figure: (language) => <BarrowFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'properties',
        stage: 'definite',
        title: say('Integral mugatuaren propietateak', 'Propiedades de la integral definida', 'خواص التكامل المحدد', 'Properties of the definite integral'),
        goal: say('Tarteak elkartzea eta mugak trukatzea: integralak batu daitezke eta mugak aldatzean zeinua aldatzen da.', 'Juntar intervalos y cambiar los límites: las integrales se suman y al cambiar los límites cambia el signo.', 'ضمّ الفترات وتبديل الحدود: تُجمع التكاملات ويتغير الإشارة عند تبديل الحدين.', 'Join intervals and swap the limits: integrals add up and swapping the limits changes the sign.'),
        needs: [
            { unit: INTEGRALS1, topic: 'properties', title: { eu: 'Integral mugatuaren propietateak', es: 'Propiedades de la integral definida', en: 'Properties of the definite integral', ar: 'خصائص التكامل المحدد' } }
        ],
        problem: say('$\\int_0^2 f(x)\\,dx=5$ eta $\\int_2^4 f(x)\\,dx=3$. Kalkulatu $\\int_0^4 f(x)\\,dx$ eta $\\int_4^0 f(x)\\,dx$.', 'Si $\\int_0^2 f(x)\\,dx=5$ y $\\int_2^4 f(x)\\,dx=3$, calcula $\\int_0^4 f(x)\\,dx$ y $\\int_4^0 f(x)\\,dx$.', 'إذا كان $\\int_0^2 f(x)\\,dx=5$ و$\\int_2^4 f(x)\\,dx=3$ فاحسب $\\int_0^4 f(x)\\,dx$ و$\\int_4^0 f(x)\\,dx$.', 'If $\\int_0^2 f(x)\\,dx=5$ and $\\int_2^4 f(x)\\,dx=3$, work out $\\int_0^4 f(x)\\,dx$ and $\\int_4^0 f(x)\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Tarteak elkartu.', 'Junta los intervalos.', 'اضمم الفترتين.', 'Join the intervals.'), math: same('$\\int_0^4 f=\\int_0^2 f+\\int_2^4 f$') },
            { text: say('Batu.', 'Suma.', 'اجمع.', 'Add.'), math: same('$5+3=8$') },
            { text: say('Mugak trukatuta, zeinua aldatzen da.', 'Con los límites cambiados, cambia el signo.', 'مع تبديل الحدين تتغير الإشارة.', 'With the limits swapped, the sign changes.'), math: same('$\\int_4^0 f=-8$') }
        ],
        takeaway: say('$\\int_a^b f=\\int_a^c f+\\int_c^b f$; $\\int_b^a f=-\\int_a^b f$; $\\int_a^a f=0$; eta $\\int_a^b(kf+g)=k\\int_a^b f+\\int_a^b g$.', '$\\int_a^b f=\\int_a^c f+\\int_c^b f$; $\\int_b^a f=-\\int_a^b f$; $\\int_a^a f=0$; y $\\int_a^b(kf+g)=k\\int_a^b f+\\int_a^b g$.', '$\\int_a^b f=\\int_a^c f+\\int_c^b f$؛ و$\\int_b^a f=-\\int_a^b f$؛ و$\\int_a^a f=0$؛ و$\\int_a^b(kf+g)=k\\int_a^b f+\\int_a^b g$.', '$\\int_a^b f=\\int_a^c f+\\int_c^b f$; $\\int_b^a f=-\\int_a^b f$; $\\int_a^a f=0$; and $\\int_a^b(kf+g)=k\\int_a^b f+\\int_a^b g$.'),
        figure: (language) => <PropertiesFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Areas ---------- */
    {
        id: 'area-axis',
        stage: 'areas',
        title: say('Kurba baten eta ardatzaren arteko azalera', 'Área entre una curva y el eje', 'المساحة بين منحنى والمحور', 'Area between a curve and the axis'),
        goal: say('Ardatzaren gainean dagoen kurba baten azpiko azalera kalkulatzea: ebaki-puntuak muga gisa eta Barrow.', 'Calcular el área bajo una curva que está encima del eje: los cortes como límites y Barrow.', 'حساب المساحة تحت منحنى فوق المحور: نقاط التقاطع حدودًا ثم بارو.', 'Work out the area under a curve that lies above the axis: the intercepts as limits and Barrow.'),
        needs: [
            { unit: INTEGRALS1, topic: 'area-axis', title: { eu: 'Kurba baten azpiko azalera', es: 'Área bajo una curva', en: 'Area under a curve', ar: 'المساحة تحت منحنى' } }
        ],
        problem: say('Kalkulatu $y=-x^2+4x$ kurbak eta $X$ ardatzak mugatzen duten azalera.', 'Calcula el área limitada por $y=-x^2+4x$ y el eje $X$.', 'احسب المساحة المحصورة بين $y=-x^2+4x$ ومحور $X$.', 'Work out the area enclosed by $y=-x^2+4x$ and the $X$ axis.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebaki-puntuak.', 'Los cortes.', 'نقاط التقاطع.', 'The intercepts.'), math: same('$-x^2+4x=0\\ \\to\\ x=0,\\ x=4$') },
            { text: say('Jatorrizkoa.', 'La primitiva.', 'الدالة الأصلية.', 'The antiderivative.'), math: same('$F(x)=-\\frac{x^3}{3}+2x^2$') },
            { text: say('Barrow.', 'Barrow.', 'بارو.', 'Barrow.'), math: same('$F(4)-F(0)=-\\frac{64}{3}+32=\\frac{32}{3}$') }
        ],
        takeaway: say('Kurba ardatzaren gainean badago, azalera integrala bera da. Mugak ematen ez badituzte, ebaki-puntuak dira.', 'Si la curva está encima del eje, el área es la propia integral. Si no dan los límites, son los puntos de corte.', 'إذا كان المنحنى فوق المحور فالمساحة هي التكامل نفسه. وإذا لم تُعطَ الحدود فهي نقاط التقاطع.', 'If the curve is above the axis, the area is the integral itself. If the limits are not given, they are the intercepts.'),
        figure: (language) => <AreaAxisFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'area-sign',
        stage: 'areas',
        title: say('Zeinu-aldaketak dituen azalera', 'Área con cambios de signo', 'المساحة مع تغيّر الإشارة', 'Area with changes of sign'),
        goal: say('Kurba ardatzaren azpitik pasatzen denean, tartea ebaki-puntuetan zatitzea eta zati bakoitzaren balio absolutua batzea.', 'Cuando la curva pasa por debajo del eje, partir el intervalo en los cortes y sumar el valor absoluto de cada trozo.', 'عندما يمر المنحنى تحت المحور نقسم الفترة عند نقاط التقاطع ونجمع القيمة المطلقة لكل جزء.', 'When the curve goes below the axis, split the interval at the intercepts and add the absolute value of each piece.'),
        needs: [
            { unit: INTEGRALS1, topic: 'area-sign', title: { eu: 'Ardatza mozten duten kurbak', es: 'Curvas que cortan el eje', en: 'Curves that cross the axis', ar: 'منحنيات تقطع المحور' } }
        ],
        problem: say('Kalkulatu $y=x^2-1$ kurbaren eta $X$ ardatzaren arteko azalera $[0,2]$ tartean.', 'Calcula el área entre $y=x^2-1$ y el eje $X$ en $[0,2]$.', 'احسب المساحة بين $y=x^2-1$ ومحور $X$ على $[0,2]$.', 'Work out the area between $y=x^2-1$ and the $X$ axis on $[0,2]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ardatza $x=1$ puntuan mozten du.', 'Corta al eje en $x=1$.', 'تقطع المحور عند $x=1$.', 'It cuts the axis at $x=1$.'), math: same('$\\int_0^1(x^2-1)\\,dx=-\\frac{2}{3}$') },
            { text: say('Bigarren zatia.', 'El segundo trozo.', 'الجزء الثاني.', 'The second piece.'), math: same('$\\int_1^2(x^2-1)\\,dx=\\frac{4}{3}$') },
            { text: say('Balio absolutuak batu.', 'Suma los valores absolutos.', 'اجمع القيم المطلقة.', 'Add the absolute values.'), math: same('$\\frac{2}{3}+\\frac{4}{3}=2$') }
        ],
        takeaway: say('Integralak ardatzaren azpiko zatiak negatibo zenbatzen ditu. Azalera lortzeko, zatitu ebaki-puntuetan eta batu balio absolutuak.', 'La integral cuenta en negativo las partes que están bajo el eje. Para el área, parte en los cortes y suma valores absolutos.', 'يحسب التكامل الأجزاء الواقعة تحت المحور بالسالب. وللمساحة قسّم عند نقاط التقاطع واجمع القيم المطلقة.', 'The integral counts the parts below the axis as negative. For the area, split at the intercepts and add absolute values.'),
        figure: (language) => <AreaSignFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'between',
        stage: 'areas',
        title: say('Bi kurben arteko azalera', 'Área entre dos curvas', 'المساحة بين منحنيين', 'Area between two curves'),
        goal: say('Bi kurbak mozten diren puntuak aurkitzea eta goikoa ken behekoa integratzea.', 'Hallar dónde se cortan las dos curvas e integrar la de arriba menos la de abajo.', 'إيجاد نقاط تقاطع المنحنيين وتكامل الأعلى ناقص الأدنى.', 'Find where the two curves meet and integrate the top one minus the bottom one.'),
        needs: [
            { unit: INTEGRALS1, topic: 'between-curves', title: { eu: 'Bi kurben arteko azalera', es: 'Área entre dos curvas', en: 'Area between two curves', ar: 'المساحة بين منحنيين' } }
        ],
        problem: say('Kalkulatu $y=x$ eta $y=x^2$ kurben arteko azalera.', 'Calcula el área entre $y=x$ e $y=x^2$.', 'احسب المساحة بين $y=x$ و$y=x^2$.', 'Work out the area between $y=x$ and $y=x^2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebaki-puntuak.', 'Los cortes.', 'نقاط التقاطع.', 'Where they meet.'), math: same('$x=x^2\\ \\to\\ x=0,\\ x=1$') },
            { text: say('Goikoa ken behekoa.', 'La de arriba menos la de abajo.', 'الأعلى ناقص الأدنى.', 'Top minus bottom.'), math: same('$\\int_0^1(x-x^2)\\,dx$') },
            { text: say('Barrow.', 'Barrow.', 'بارو.', 'Barrow.'), math: same('$\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}$') }
        ],
        takeaway: say('$\\int_a^b(f-g)\\,dx$, $f$ goian dagoela. Ez dio axola ardatzaren gainean ala azpian dauden: kenketak dena konpontzen du.', '$\\int_a^b(f-g)\\,dx$, con $f$ arriba. No importa si están encima o debajo del eje: la resta lo arregla.', '$\\int_a^b(f-g)\\,dx$ حيث $f$ في الأعلى. ولا يهم هل هما فوق المحور أم تحته: الطرح يحل ذلك.', '$\\int_a^b(f-g)\\,dx$, with $f$ on top. It does not matter whether they are above or below the axis: the subtraction sorts it out.'),
        figure: (language) => <BetweenFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. In economics ---------- */
    {
        id: 'cost-from-marginal',
        stage: 'economy',
        title: say('Kostu osoa hurrengo unitatearen kostutik', 'Del coste de la unidad siguiente al coste total', 'من تكلفة الوحدة التالية إلى التكلفة الكلية', 'From the cost of the next unit to the total cost'),
        goal: say('$C\'(x)$ jakinda, kostu osoa berreskuratzea: integratu eta kostu finkoarekin $C$ aurkitu.', 'Sabiendo $C\'(x)$, recuperar el coste total: integrar y hallar la $C$ con el coste fijo.', 'استرجاع التكلفة الكلية بمعرفة $C\'(x)$: التكامل وإيجاد الثابت بالتكلفة الثابتة.', 'Knowing $C\'(x)$, recover the total cost: integrate and find the constant with the fixed cost.'),
        needs: [
            { unit: DERIVATIVES2, topic: 'marginal', title: { eu: 'Hurrengo unitatearen kostua', es: 'Lo que cuesta la unidad siguiente', en: 'What the next unit costs', ar: 'تكلفة الوحدة التالية' } }
        ],
        problem: say('Hurrengo unitatearen kostua $C\'(x)=2x+10$ euro da eta kostu finkoa 200 euro. Zenbat kostatzen dira 20 unitate?', 'Lo que cuesta la unidad siguiente es $C\'(x)=2x+10$ euros y el coste fijo, 200 €. ¿Cuánto cuestan 20 unidades?', 'تكلفة الوحدة التالية $C\'(x)=2x+10$ يورو والتكلفة الثابتة 200 €. كم تكلّف 20 وحدة؟', 'The next unit costs $C\'(x)=2x+10$ euros and the fixed cost is €200. How much do 20 units cost?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Integratu.', 'Integra.', 'كامل.', 'Integrate.'), math: same('$C(x)=x^2+10x+K$') },
            { text: say('Kostu finkoa: $C(0)$.', 'El coste fijo: $C(0)$.', 'التكلفة الثابتة: $C(0)$.', 'The fixed cost: $C(0)$.'), math: same('$C(0)=K=200$') },
            { text: say('20 unitate.', '20 unidades.', '20 وحدة.', '20 units.'), math: same('$C(20)=400+200+200=800$') }
        ],
        takeaway: say('Integrazioak deribazioa desegiten du: $C\'$ jakinda, $C$ itzultzen da. Konstantea kostu finkoa da, $C(0)$: ekoizten ez denean ere ordaintzen dena.', 'Integrar deshace la derivada: sabiendo $C\'$, se vuelve a $C$. La constante es el coste fijo, $C(0)$: lo que se paga aunque no se produzca.', 'التكامل يلغي الاشتقاق: بمعرفة $C\'$ نعود إلى $C$. والثابت هو التكلفة الثابتة $C(0)$: ما يُدفع حتى دون إنتاج.', 'Integrating undoes the derivative: knowing $C\'$, you get back to $C$. The constant is the fixed cost, $C(0)$: what is paid even with no production.'),
        figure: (language) => <CostFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'accumulated',
        stage: 'economy',
        title: say('Denbora-tarte batean pilatutakoa', 'Lo acumulado en un periodo', 'المتراكم في فترة', 'What piles up over a period'),
        goal: say('Erritmo bat (salmentak hilean, biztanleak urtean) integratzea, denbora-tarte batean guztira pilatutakoa jakiteko.', 'Integrar un ritmo (ventas al mes, habitantes al año) para saber lo acumulado en total en un periodo.', 'تكامل وتيرة (مبيعات في الشهر، سكان في السنة) لمعرفة المتراكم الكلي في فترة.', 'Integrate a rate (sales per month, inhabitants per year) to know the total that piles up over a period.'),
        needs: [
            { unit: DERIVATIVES2, topic: 'rate-context', title: { eu: 'Aldakuntza-tasa testuinguruan', es: 'La tasa de variación en contexto', en: 'The rate of change in context', ar: 'معدل التغير في سياقه' } }
        ],
        problem: say('Denda batek $v(t)=3t^2+2$ mila produktu saltzen ditu hilean ($t$ hilabeteetan). Zenbat saltzen ditu lehen 4 hilabeteetan?', 'Una tienda vende $v(t)=3t^2+2$ miles de productos al mes ($t$ en meses). ¿Cuánto vende en los 4 primeros meses?', 'يبيع متجر $v(t)=3t^2+2$ ألف منتج في الشهر ($t$ بالأشهر). كم يبيع في الأشهر الأربعة الأولى؟', 'A shop sells $v(t)=3t^2+2$ thousand products a month ($t$ in months). How much does it sell in the first 4 months?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Pilatutakoa integrala da.', 'Lo acumulado es la integral.', 'المتراكم هو التكامل.', 'What piles up is the integral.'), math: same('$\\int_0^4(3t^2+2)\\,dt$') },
            { text: say('Jatorrizkoa.', 'La primitiva.', 'الدالة الأصلية.', 'The antiderivative.'), math: same('$t^3+2t$') },
            { text: say('Barrow.', 'Barrow.', 'بارو.', 'Barrow.'), math: same('$64+8=72$') }
        ],
        takeaway: say('Erritmo baten integralak denbora-tarte batean pilatutako kopurua ematen du. Unitateak: erritmoarenak bider denborarenak (mila produktu hilean × hilabeteak = mila produktu).', 'La integral de un ritmo da la cantidad acumulada en un periodo. Unidades: las del ritmo por las del tiempo (miles al mes × meses = miles de productos).', 'تكامل الوتيرة يعطي الكمية المتراكمة في فترة. والوحدات: وحدات الوتيرة في وحدات الزمن (آلاف في الشهر × أشهر = آلاف المنتجات).', 'The integral of a rate gives the amount piled up over a period. Units: those of the rate times those of time (thousands a month × months = thousands of products).'),
        figure: (language) => <AccumulatedFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'income-from-marginal',
        stage: 'economy',
        title: say('Diru-sarrera osoa hurrengo unitateak ekartzen duenetik', 'Del ingreso de la unidad siguiente al ingreso total', 'من إيراد الوحدة التالية إلى الإيراد الكلي', 'From the income of the next unit to the total income'),
        goal: say('$I\'(x)$ jakinda, diru-sarrera osoa eta tarte bateko igoera kalkulatzea: integral mugagabea eta mugatua.', 'Sabiendo $I\'(x)$, calcular el ingreso total y el aumento en un tramo: integral indefinida y definida.', 'بمعرفة $I\'(x)$ احسب الإيراد الكلي والزيادة في شريحة: التكامل غير المحدد والمحدد.', 'Knowing $I\'(x)$, work out the total income and the increase over a stretch: indefinite and definite integral.'),
        needs: [
            { unit: DERIVATIVES2, topic: 'marginal', title: { eu: 'Hurrengo unitatearen kostua', es: 'Lo que cuesta la unidad siguiente', en: 'What the next unit costs', ar: 'تكلفة الوحدة التالية' } }
        ],
        problem: say('Hurrengo unitateak $I\'(x)=100-2x$ euro ekartzen ditu. Zenbat igotzen dira diru-sarrerak 10 unitatetik 20 unitatera?', 'La unidad siguiente aporta $I\'(x)=100-2x$ euros. ¿Cuánto suben los ingresos de 10 a 20 unidades?', 'تضيف الوحدة التالية $I\'(x)=100-2x$ يورو. كم يرتفع الإيراد من 10 إلى 20 وحدة؟', 'The next unit brings in $I\'(x)=100-2x$ euros. How much does the income rise from 10 to 20 units?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Igoera integral mugatua da.', 'La subida es una integral definida.', 'الزيادة تكامل محدد.', 'The rise is a definite integral.'), math: same('$\\int_{10}^{20}(100-2x)\\,dx$') },
            { text: say('Jatorrizkoa.', 'La primitiva.', 'الدالة الأصلية.', 'The antiderivative.'), math: same('$I(x)=100x-x^2$') },
            { text: say('Barrow.', 'Barrow.', 'بارو.', 'Barrow.'), math: same('$1600-900=700$') }
        ],
        takeaway: say('$\\int_a^b I\'(x)\\,dx=I(b)-I(a)$: $a$ unitatetik $b$ unitatera ekoiztean irabazten den diru-sarrera. Ezer ez saltzean ezer ez da sartzen: $I(0)=0$.', '$\\int_a^b I\'(x)\\,dx=I(b)-I(a)$: el ingreso que se gana al pasar de $a$ a $b$ unidades. Sin vender nada no entra nada: $I(0)=0$.', '$\\int_a^b I\'(x)\\,dx=I(b)-I(a)$: الإيراد المكتسب عند الانتقال من $a$ إلى $b$ وحدة. ودون بيع لا يدخل شيء: $I(0)=0$.', '$\\int_a^b I\'(x)\\,dx=I(b)-I(a)$: the income earned going from $a$ to $b$ units. Selling nothing brings in nothing: $I(0)=0$.'),
        figure: (language) => <IncomeFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bach2gIntegralsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bach2gIntegralsLessonTexts[topic.id as Bach2gIntegralsTopicId], ...bach2gIntegralsLessonChecks[topic.id as Bach2gIntegralsTopicId] }))
