import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AreaFigure, AverageRateFigure, CoefficientsFigure, DerivativeFunctionFigure, DerivativeGraphFigure, DerivativePointFigure, ExpLogFigure, ExtremaFigure, IntervalFigure, PolynomialFigure, ProfitFigure, QuotientFigure, RationalFigure, SignFigure, TangentFigure } from './figures'
import { socDerivLessonChecks, type SocDerivTopicId } from './lessonChecks'
import { socDerivLessonTexts } from './lessonTexts'
import { same, say } from './text'

/* ==========================================================================
   Deribatuak eta haien aplikazioak · Batxilergoa 1 · Gizarte Zientziak —
   stages and lessons. The scope follows unit 7 «Derivadas» of the current
   Anaya Matemáticas aplicadas a las CCSS I (Suma Piezas), the only unit of
   derivatives in that book, in its order: the average and instantaneous
   rate, the tangent, the rules (powers, product, quotient, the chain with
   exponentials and logarithms), growth and extremes, optimisation (profit,
   problems, closed intervals) and graphs. The owner left the
   trigonometric derivatives out; the book has no curvature. Lessons and
   drawings are this unit's own.
   ========================================================================== */

export type SocDerivStageId = 'rate' | 'rules' | 'monotony' | 'optimization' | 'graphs'

export const socDerivStages: UnitStage[] = [
    { id: 'rate', tone: 'blue', title: { eu: 'Aldakuntza-tasa', es: 'Tasa de variación', en: 'Rate of change', ar: 'معدل التغير' } },
    { id: 'rules', tone: 'violet', title: { eu: 'Deribazio-erregelak', es: 'Reglas de derivación', en: 'Differentiation rules', ar: 'قواعد الاشتقاق' } },
    { id: 'monotony', tone: 'mustard', title: { eu: 'Hazkundea eta muturrak', es: 'Crecimiento y extremos', en: 'Growth and extremes', ar: 'التزايد والقيم القصوى' } },
    { id: 'optimization', tone: 'coral', title: { eu: 'Optimizazioa', es: 'Optimización', en: 'Optimisation', ar: 'الاستمثال' } },
    { id: 'graphs', tone: 'green', title: { eu: 'Grafikoak', es: 'Representación', en: 'Graphs', ar: 'التمثيل البياني' } }
]

const FUNCTIONS = 'batx1-gizarte/funciones'
const LIMITS = 'batx1-gizarte/limites-continuidad'
const LINE = { eu: 'Zuzena: malda eta ekuazioa', es: 'La recta: pendiente y ecuación', en: 'The line: slope and equation', ar: 'المستقيم: الميل والمعادلة' }
const PARABOLA = { eu: 'Parabola: erpina eta ebaki-puntuak', es: 'La parábola: vértice y puntos de corte', en: 'The parabola: vertex and intercepts', ar: 'القطع المكافئ: الرأس ونقاط التقاطع' }

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Rate of change ---------- */
    {
        id: 'average-rate',
        stage: 'rate',
        title: say('Batez besteko aldakuntza-tasa', 'Tasa de variación media', 'معدل التغير المتوسط', 'Average rate of change'),
        goal: say('Funtzio bat tarte batean unitateko zenbat aldatzen den kalkulatzea.', 'Calcular cuánto cambia una función por unidad en un intervalo.', 'حساب مقدار تغير الدالة لكل وحدة في مجال.', 'Work out how much a function changes per unit on an interval.'),
        needs: [{ unit: FUNCTIONS, topic: 'line', title: LINE }],
        problem: say('Enpresa batek $I(x)=-x^2+20x$ mila euro jasotzen ditu, $x$ mila unitate salduta. Zenbat hazten da diru-sarrera unitateko, $x=2$ eta $x=6$ artean?', 'Una empresa ingresa $I(x)=-x^2+20x$ miles de euros al vender $x$ miles de unidades. ¿Cuánto crece el ingreso por unidad entre $x=2$ y $x=6$?', 'تحصل شركة على $I(x)=-x^2+20x$ ألف يورو عند بيع $x$ ألف وحدة. كم ينمو الإيراد لكل وحدة بين $x=2$ و$x=6$؟', 'A firm takes in $I(x)=-x^2+20x$ thousand euros when it sells $x$ thousand units. How much does revenue grow per unit between $x=2$ and $x=6$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Balioak muturretan.', 'Valores en los extremos.', 'القيم عند الطرفين.', 'Values at the ends.'), math: same('$I(2)=36\\qquad I(6)=84$') },
            { text: say('Zatitu aldaketa luzeraz.', 'Divide el cambio entre la longitud.', 'اقسم التغير على الطول.', 'Divide the change by the length.'), math: same('$\\frac{84-36}{6-2}=\\frac{48}{4}=12$') },
            { text: say('Batez beste, 12 mila euro mila unitateko: ebakitzailearen malda da.', 'De media, 12 mil euros por cada mil unidades: es la pendiente de la secante.', 'في المتوسط 12 ألف يورو لكل ألف وحدة: إنه ميل القاطع.', 'On average, 12 thousand euros per thousand units: it is the slope of the secant.') }
        ],
        takeaway: say('$f$ funtzioaren T.V.M. $[a,b]$ tartean: $\\frac{f(b)-f(a)}{b-a}$. Bi puntuak lotzen dituen zuzenaren malda da.', 'T.V.M. de $f$ en $[a,b]$: $\\frac{f(b)-f(a)}{b-a}$. Es la pendiente de la recta que une los dos puntos.', 'معدل التغير المتوسط لـ $f$ في $[a,b]$: ‏$\\frac{f(b)-f(a)}{b-a}$. إنه ميل المستقيم الواصل بين النقطتين.', 'The average rate of $f$ on $[a,b]$: $\\frac{f(b)-f(a)}{b-a}$. It is the slope of the line joining the two points.'),
        figure: (language) => <AverageRateFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'derivative-point',
        stage: 'rate',
        title: say('Deribatua puntu batean', 'Derivada en un punto', 'المشتقة عند نقطة', 'The derivative at a point'),
        goal: say('$f\'(a)$ batez besteko tasen limite gisa aurkitzea, eta ukitzailearen malda gisa ikustea.', 'Hallar $f\'(a)$ como límite de las tasas medias y verla como la pendiente de la tangente.', 'إيجاد $f\'(a)$ نهايةً للمعدلات المتوسطة ورؤيتها ميلًا للمماس.', 'Find $f\'(a)$ as the limit of the average rates and see it as the slope of the tangent.'),
        needs: [{ unit: LIMITS, topic: 'zero-zero', title: { eu: 'Zero zati zero', es: 'Cero entre cero', en: 'Zero over zero', ar: 'صفر على صفر' } }],
        problem: say('Aurkitu $f(x)=x^2-3x$ funtzioaren deribatua $x=2$ puntuan, definizioarekin.', 'Halla la derivada de $f(x)=x^2-3x$ en $x=2$ con la definición.', 'أوجد مشتقة $f(x)=x^2-3x$ عند $x=2$ بالتعريف.', 'Find the derivative of $f(x)=x^2-3x$ at $x=2$ with the definition.'),
        stepsKind: 'steps',
        steps: [
            { text: say('T.V.M. $[2,2+h]$ tartean.', 'T.V.M. en $[2,2+h]$.', 'معدل التغير المتوسط في $[2,2+h]$.', 'Average rate on $[2,2+h]$.'), math: same('$\\frac{f(2+h)-f(2)}{h}=\\frac{(2+h)^2-3(2+h)+2}{h}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'اختصر.', 'Simplify.'), math: same('$\\frac{h^2+h}{h}=h+1$') },
            { text: say('$h$ 0 baliora doa.', '$h$ tiende a 0.', '$h$ تتجه إلى 0.', '$h$ tends to 0.'), math: same('$f\'(2)=\\lim_{h\\to 0}(h+1)=1$') }
        ],
        takeaway: say('$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$: berehalako aldakuntza-tasa eta $a$ puntuko ukitzailearen malda.', '$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$: la tasa de variación instantánea y la pendiente de la tangente en $a$.', '$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$: معدل التغير اللحظي وميل المماس عند $a$.', '$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$: the instantaneous rate of change and the slope of the tangent at $a$.'),
        figure: (language) => <DerivativePointFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'tangent',
        stage: 'rate',
        title: say('Zuzen ukitzailea', 'Recta tangente', 'المستقيم المماس', 'The tangent line'),
        goal: say('Kurba baten ukitzailearen (eta normalaren) ekuazioa idaztea puntu batean.', 'Escribir la ecuación de la tangente (y de la normal) a una curva en un punto.', 'كتابة معادلة المماس (والعمودي) لمنحنى عند نقطة.', 'Write the equation of the tangent (and of the normal) to a curve at a point.'),
        needs: [{ unit: FUNCTIONS, topic: 'line', title: LINE }],
        problem: say('Aurkitu $f(x)=x^2+1$ funtzioaren ukitzailea $x=1$ puntuan.', 'Halla la tangente a $f(x)=x^2+1$ en $x=1$.', 'أوجد المماس لـ $f(x)=x^2+1$ عند $x=1$.', 'Find the tangent to $f(x)=x^2+1$ at $x=1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntua.', 'El punto.', 'النقطة.', 'The point.'), math: same('$f(1)=2$') },
            { text: say('Malda, definizioarekin.', 'La pendiente, con la definición.', 'الميل بالتعريف.', 'The slope, with the definition.'), math: same('$\\frac{(1+h)^2+1-2}{h}=2+h\\ \\to\\ f\'(1)=2$') },
            { text: say('Puntu batetik pasatzen den zuzena.', 'Recta por un punto.', 'مستقيم يمر بنقطة.', 'Line through a point.'), math: same('$y-2=2(x-1)\\ \\to\\ y=2x$') }
        ],
        takeaway: say('$a$ puntuko ukitzailea: $y-f(a)=f\'(a)(x-a)$. Normala perpendikularra da: haren malda $-\\frac{1}{f\'(a)}$ da.', 'Tangente en $a$: $y-f(a)=f\'(a)(x-a)$. La normal es perpendicular: su pendiente es $-\\frac{1}{f\'(a)}$.', 'المماس عند $a$: ‏$y-f(a)=f\'(a)(x-a)$. والعمودي متعامد معه: ميله $-\\frac{1}{f\'(a)}$.', 'Tangent at $a$: $y-f(a)=f\'(a)(x-a)$. The normal is perpendicular: its slope is $-\\frac{1}{f\'(a)}$.'),
        figure: (language) => <TangentFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Rules ---------- */
    {
        id: 'derivative-function',
        stage: 'rules',
        title: say('Funtzio deribatua', 'La función derivada', 'الدالة المشتقة', 'The derivative function'),
        goal: say('Funtzio deribatua lortzea eta berreturen erregela erabiltzea.', 'Obtener la función derivada y usar la regla de las potencias.', 'الحصول على الدالة المشتقة واستعمال قاعدة القوى.', 'Get the derivative function and use the power rule.'),
        needs: [{ unit: FUNCTIONS, topic: 'parabola', title: PARABOLA }],
        problem: say('Aurkitu $f(x)=x^2$ funtzioaren $f\'(x)$, definizioarekin, eta gero $g(x)=4x^3-5x+2$ funtzioarena.', 'Halla $f\'(x)$ de $f(x)=x^2$ con la definición, y después la de $g(x)=4x^3-5x+2$.', 'أوجد $f\'(x)$ لـ $f(x)=x^2$ بالتعريف، ثم مشتقة $g(x)=4x^3-5x+2$.', 'Find $f\'(x)$ of $f(x)=x^2$ with the definition, and then that of $g(x)=4x^3-5x+2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Definizioa, $x$ aldagaiarekin.', 'La definición, con $x$.', 'التعريف مع $x$.', 'The definition, with $x$.'), math: same('$\\frac{(x+h)^2-x^2}{h}=2x+h\\ \\to\\ 2x$') },
            { text: say('Berretura: berretzailea jaitsi eta bat kendu.', 'Potencia: baja el exponente y réstale uno.', 'القوة: أنزل الأس واطرح منه واحدًا.', 'Power: bring the exponent down and take one off.'), math: same('$(4x^3)\'=12x^2\\qquad(5x)\'=5\\qquad(2)\'=0$') },
            { text: say('Gaiz gai deribatzen da.', 'Se deriva término a término.', 'نشتق حدًّا حدًّا.', 'Differentiate term by term.'), math: same('$g\'(x)=12x^2-5$') }
        ],
        takeaway: say('$(x^n)\'=n\\cdot x^{n-1}$; konstante baten deribatua 0 da; $(k\\cdot f)\'=k\\cdot f\'$ eta $(f+g)\'=f\'+g\'$.', '$(x^n)\'=n\\cdot x^{n-1}$; la derivada de una constante es 0; $(k\\cdot f)\'=k\\cdot f\'$ y $(f+g)\'=f\'+g\'$.', '$(x^n)\'=n\\cdot x^{n-1}$؛ مشتقة الثابت 0؛ و$(k\\cdot f)\'=k\\cdot f\'$ و$(f+g)\'=f\'+g\'$.', '$(x^n)\'=n\\cdot x^{n-1}$; the derivative of a constant is 0; $(k\\cdot f)\'=k\\cdot f\'$ and $(f+g)\'=f\'+g\'$.'),
        figure: (language) => <DerivativeFunctionFigure language={language} />
    },
    {
        id: 'product-quotient',
        stage: 'rules',
        title: say('Biderkadura eta zatidura', 'Producto y cociente', 'الجداء وخارج القسمة', 'Product and quotient'),
        goal: say('Biderkadurak eta zatidurak deribatzea.', 'Derivar productos y cocientes.', 'اشتقاق الجداءات وخوارج القسمة.', 'Differentiate products and quotients.'),
        needs: [{ unit: LIMITS, topic: 'vertical-horizontal', title: { eu: 'Asintota bertikalak eta horizontalak', es: 'Asíntotas verticales y horizontales', en: 'Vertical and horizontal asymptotes', ar: 'المقاربات الرأسية والأفقية' } }],
        problem: say('Deribatu $f(x)=(x^2+1)(3x-2)$ eta $g(x)=\\frac{2x}{x+1}$.', 'Deriva $f(x)=(x^2+1)(3x-2)$ y $g(x)=\\frac{2x}{x+1}$.', 'اشتق $f(x)=(x^2+1)(3x-2)$ و$g(x)=\\frac{2x}{x+1}$.', 'Differentiate $f(x)=(x^2+1)(3x-2)$ and $g(x)=\\frac{2x}{x+1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura.', 'Producto.', 'الجداء.', 'Product.'), math: same('$f\'(x)=2x(3x-2)+3(x^2+1)=9x^2-4x+3$') },
            { text: say('Zatidura.', 'Cociente.', 'خارج القسمة.', 'Quotient.'), math: same('$g\'(x)=\\frac{2(x+1)-2x}{(x+1)^2}=\\frac{2}{(x+1)^2}$') },
            { text: say('Egiaztatu puntu batean.', 'Comprueba en un punto.', 'تحقّق عند نقطة.', 'Check at a point.'), math: same('$g\'(1)=\\frac{2}{4}=\\frac{1}{2}$') }
        ],
        takeaway: say('$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$ eta $\\left(\\frac{f}{g}\\right)\'=\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$.', '$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$ y $\\left(\\frac{f}{g}\\right)\'=\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$.', '$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$ و$\\left(\\frac{f}{g}\\right)\'=\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$.', '$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$ and $\\left(\\frac{f}{g}\\right)\'=\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$.'),
        figure: (language) => <QuotientFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'chain-exp-log',
        stage: 'rules',
        title: say('Katea, esponentzialak eta logaritmoak', 'Cadena, exponenciales y logaritmos', 'السلسلة والأسيات واللوغاريتمات', 'Chain, exponentials and logarithms'),
        goal: say('$e^x$, $\\ln x$ eta funtzio konposatuak katearen erregelarekin deribatzea.', 'Derivar $e^x$, $\\ln x$ y funciones compuestas con la regla de la cadena.', 'اشتقاق $e^x$ و$\\ln x$ والدوال المركبة بقاعدة السلسلة.', 'Differentiate $e^x$, $\\ln x$ and composite functions with the chain rule.'),
        needs: [{ unit: 'batx1-gizarte/funciones-exponenciales', topic: 'exp-graph', title: { eu: 'Funtzio esponentziala', es: 'La función exponencial', en: 'The exponential function', ar: 'الدالة الأسية' } }],
        problem: say('Deribatu $f(x)=(2x+1)^3$, $g(x)=e^{2x}$ eta $h(x)=\\ln(x^2+1)$.', 'Deriva $f(x)=(2x+1)^3$, $g(x)=e^{2x}$ y $h(x)=\\ln(x^2+1)$.', 'اشتق $f(x)=(2x+1)^3$ و$g(x)=e^{2x}$ و$h(x)=\\ln(x^2+1)$.', 'Differentiate $f(x)=(2x+1)^3$, $g(x)=e^{2x}$ and $h(x)=\\ln(x^2+1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kanpokoa bider barrukoaren deribatua.', 'Lo de fuera por la derivada de dentro.', 'الخارج في مشتقة الداخل.', 'The outside times the derivative of the inside.'), math: same('$f\'(x)=3(2x+1)^2\\cdot 2=6(2x+1)^2$') },
            { text: say('Esponentziala.', 'Exponencial.', 'الأسية.', 'Exponential.'), math: same('$g\'(x)=e^{2x}\\cdot 2=2e^{2x}$') },
            { text: say('Logaritmoa.', 'Logaritmo.', 'اللوغاريتم.', 'Logarithm.'), math: same('$h\'(x)=\\frac{2x}{x^2+1}$') }
        ],
        takeaway: say('$(e^x)\'=e^x$ eta $(\\ln x)\'=\\frac{1}{x}$. Katearen erregela: $(f(g(x)))\'=f\'(g(x))\\cdot g\'(x)$.', '$(e^x)\'=e^x$ y $(\\ln x)\'=\\frac{1}{x}$. Regla de la cadena: $(f(g(x)))\'=f\'(g(x))\\cdot g\'(x)$.', '$(e^x)\'=e^x$ و$(\\ln x)\'=\\frac{1}{x}$. قاعدة السلسلة: $(f(g(x)))\'=f\'(g(x))\\cdot g\'(x)$.', '$(e^x)\'=e^x$ and $(\\ln x)\'=\\frac{1}{x}$. Chain rule: $(f(g(x)))\'=f\'(g(x))\\cdot g\'(x)$.'),
        figure: (language) => <ExpLogFigure language={language} />
    },

    /* ---------- 3. Growth and extremes ---------- */
    {
        id: 'sign-intervals',
        stage: 'monotony',
        title: say('Hazkundea eta deribatuaren zeinua', 'Crecimiento y signo de la derivada', 'التزايد وإشارة المشتقة', 'Growth and the sign of the derivative'),
        goal: say('Funtzio bat non den gorakorra eta non beherakorra jakitea, $f\'$ deribatuaren zeinuarekin.', 'Hallar dónde crece y dónde decrece una función con el signo de $f\'$.', 'إيجاد أين تتزايد الدالة وأين تتناقص بإشارة $f\'$.', 'Find where a function rises and where it falls with the sign of $f\'$.'),
        needs: [{ unit: FUNCTIONS, topic: 'parabola', title: PARABOLA }],
        problem: say('Aztertu $f(x)=x^3-12x$ funtzioaren hazkundea.', 'Estudia el crecimiento de $f(x)=x^3-12x$.', 'ادرس تزايد $f(x)=x^3-12x$.', 'Study the growth of $f(x)=x^3-12x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatu eta 0 berdindu.', 'Deriva e iguala a 0.', 'اشتق وساوِ بـ 0.', 'Differentiate and set to 0.'), math: same('$f\'(x)=3x^2-12=0\\ \\to\\ x=\\pm 2$') },
            { text: say('$f\'$ deribatuaren zeinua zati bakoitzean.', 'Signo de $f\'$ en cada tramo.', 'إشارة $f\'$ في كل جزء.', 'Sign of $f\'$ on each stretch.'), math: same('$f\'(-3)=15\\qquad f\'(0)=-12\\qquad f\'(3)=15$') },
            { text: say('Gorakorra $(-\\infty,-2)$ eta $(2,+\\infty)$ tarteetan; beherakorra $(-2,2)$ tartean.', 'Crece en $(-\\infty,-2)$ y en $(2,+\\infty)$; decrece en $(-2,2)$.', 'متزايدة في $(-\\infty,-2)$ و$(2,+\\infty)$، ومتناقصة في $(-2,2)$.', 'It rises on $(-\\infty,-2)$ and on $(2,+\\infty)$; it falls on $(-2,2)$.') }
        ],
        takeaway: say('Tarte batean $f\'(x)>0$ bada, $f$ gorakorra da; $f\'(x)<0$ bada, beherakorra. Aldaketak $f\'(x)=0$ den lekuan bilatzen dira.', 'Si $f\'(x)>0$ en un intervalo, $f$ crece; si $f\'(x)<0$, decrece. Los cambios se buscan donde $f\'(x)=0$.', 'إذا كانت $f\'(x)>0$ في مجال فإن $f$ متزايدة، وإذا كانت $f\'(x)<0$ فهي متناقصة. ونبحث عن التغيرات حيث $f\'(x)=0$.', 'If $f\'(x)>0$ on an interval, $f$ rises; if $f\'(x)<0$, it falls. The changes are found where $f\'(x)=0$.'),
        figure: (language) => <SignFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'singular-points',
        stage: 'monotony',
        title: say('Maximoak eta minimoak', 'Máximos y mínimos', 'القيم العظمى والصغرى', 'Maxima and minima'),
        goal: say('Puntu singularrak aurkitzea, eta maximoak ala minimoak diren erabakitzea.', 'Encontrar los puntos singulares y decidir si son máximos o mínimos.', 'إيجاد النقاط الحرجة وتحديد هل هي قيم عظمى أم صغرى.', 'Find the stationary points and decide whether they are maxima or minima.'),
        needs: [{ unit: FUNCTIONS, topic: 'optimum', title: { eu: 'Maximoak: diru-sarrerak eta mozkina', es: 'Máximos: ingresos y beneficio', en: 'Maxima: revenue and profit', ar: 'القيم العظمى: الإيرادات والربح' } }],
        problem: say('Aurkitu $f(x)=2x^3-3x^2-12x+5$ funtzioaren maximoak eta minimoak.', 'Halla los máximos y mínimos de $f(x)=2x^3-3x^2-12x+5$.', 'أوجد القيم العظمى والصغرى لـ $f(x)=2x^3-3x^2-12x+5$.', 'Find the maxima and minima of $f(x)=2x^3-3x^2-12x+5$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntu singularrak.', 'Puntos singulares.', 'النقاط الحرجة.', 'Stationary points.'), math: same('$f\'(x)=6x^2-6x-12=0\\ \\to\\ x=-1,\\ x=2$') },
            { text: say('$f\'$ deribatuaren zeinua: $+$, $-$, $+$.', 'Signo de $f\'$: $+$, $-$, $+$.', 'إشارة $f\'$: ‏$+$ و$-$ و$+$.', 'Sign of $f\'$: $+$, $-$, $+$.'), math: same('$f(-1)=12\\qquad f(2)=-15$') },
            { text: say('Maximoa $(-1,12)$ puntuan, eta minimoa $(2,-15)$ puntuan.', 'Máximo en $(-1,12)$ y mínimo en $(2,-15)$.', 'قيمة عظمى عند $(-1,12)$ وصغرى عند $(2,-15)$.', 'Maximum at $(-1,12)$ and minimum at $(2,-15)$.') }
        ],
        takeaway: say('Puntu singularrak: $f\'(x)=0$. $f\'$ deribatua $+$ izatetik $-$ izatera pasatzen bada, maximoa dago; $-$ izatetik $+$ izatera, minimoa; zeinua aldatzen ez bada, bat ere ez.', 'Puntos singulares: $f\'(x)=0$. Si $f\'$ pasa de $+$ a $-$, hay un máximo; si pasa de $-$ a $+$, un mínimo; si no cambia de signo, ninguno.', 'النقاط الحرجة: $f\'(x)=0$. إذا انتقلت $f\'$ من $+$ إلى $-$ فهناك قيمة عظمى، ومن $-$ إلى $+$ قيمة صغرى، وإن لم تتغير الإشارة فلا شيء.', 'Stationary points: $f\'(x)=0$. If $f\'$ goes from $+$ to $-$, there is a maximum; from $-$ to $+$, a minimum; if it does not change sign, neither.'),
        figure: (language) => <ExtremaFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'extreme-coefficients',
        stage: 'monotony',
        title: say('Koefizienteak muturretatik', 'Coeficientes a partir de los extremos', 'المعاملات من القيم القصوى', 'Coefficients from the extremes'),
        goal: say('Funtzio baten koefizienteak aurkitzea, haren maximoak edo minimoak jakinda.', 'Hallar los coeficientes de una función sabiendo sus máximos o mínimos.', 'إيجاد معاملات دالة بمعرفة قيمها العظمى أو الصغرى.', 'Find the coefficients of a function from its maxima or minima.'),
        needs: [{ unit: FUNCTIONS, topic: 'parabola', title: PARABOLA }],
        problem: say('Aurkitu $a$ eta $b$, $f(x)=x^2+ax+b$ funtzioak minimoa izan dezan $(3,-2)$ puntuan.', 'Halla $a$ y $b$ para que $f(x)=x^2+ax+b$ tenga un mínimo en $(3,-2)$.', 'أوجد $a$ و$b$ لتكون لـ $f(x)=x^2+ax+b$ قيمة صغرى عند $(3,-2)$.', 'Find $a$ and $b$ so that $f(x)=x^2+ax+b$ has a minimum at $(3,-2)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatua 0 da $x=3$ puntuan.', 'La derivada vale 0 en $x=3$.', 'المشتقة تساوي 0 عند $x=3$.', 'The derivative is 0 at $x=3$.'), math: same('$f\'(x)=2x+a\\qquad 6+a=0\\ \\to\\ a=-6$') },
            { text: say('Altuera $-2$ da.', 'La altura es $-2$.', 'الارتفاع $-2$.', 'The height is $-2$.'), math: same('$f(3)=9-18+b=-2\\ \\to\\ b=7$') },
            { text: say('Funtzioa.', 'La función.', 'الدالة.', 'The function.'), math: same('$f(x)=x^2-6x+7$') }
        ],
        takeaway: say('$(p,q)$ puntuko mutur batek bi ekuazio ematen ditu: $f\'(p)=0$ eta $f(p)=q$.', 'Un extremo en $(p,q)$ da dos ecuaciones: $f\'(p)=0$ y $f(p)=q$.', 'القيمة القصوى عند $(p,q)$ تعطي معادلتين: $f\'(p)=0$ و$f(p)=q$.', 'An extreme at $(p,q)$ gives two equations: $f\'(p)=0$ and $f(p)=q$.'),
        figure: (language) => <CoefficientsFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Optimisation ---------- */
    {
        id: 'max-profit',
        stage: 'optimization',
        title: say('Mozkin maximoa', 'Beneficio máximo', 'الربح الأعظم', 'The greatest profit'),
        goal: say('Mozkin maximoa ematen duen ekoizpena aurkitzea, diru-sarrerekin eta kostuekin.', 'Hallar la producción que da el beneficio máximo, con ingresos y costes.', 'إيجاد الإنتاج الذي يعطي الربح الأعظم من الإيرادات والتكاليف.', 'Find the production that gives the greatest profit, from revenue and costs.'),
        needs: [{ unit: FUNCTIONS, topic: 'optimum', title: { eu: 'Maximoak: diru-sarrerak eta mozkina', es: 'Máximos: ingresos y beneficio', en: 'Maxima: revenue and profit', ar: 'القيم العظمى: الإيرادات والربح' } }],
        problem: say('Lantegi batek $I(x)=60x$ euro jasotzen ditu eta $C(x)=x^2+20x+100$ euro gastatzen, $x$ unitate ekoiztean. Zenbat unitatek ematen dute mozkin maximoa?', 'Una fábrica ingresa $I(x)=60x$ y gasta $C(x)=x^2+20x+100$ euros al producir $x$ unidades. ¿Cuántas unidades dan el beneficio máximo?', 'يحصل مصنع على $I(x)=60x$ وينفق $C(x)=x^2+20x+100$ يورو عند إنتاج $x$ وحدة. كم وحدة تعطي الربح الأعظم؟', 'A factory takes in $I(x)=60x$ and spends $C(x)=x^2+20x+100$ euros producing $x$ units. How many units give the greatest profit?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Mozkina.', 'El beneficio.', 'الربح.', 'The profit.'), math: same('$B(x)=I(x)-C(x)=-x^2+40x-100$') },
            { text: say('Deribatu eta 0 berdindu.', 'Deriva e iguala a 0.', 'اشتق وساوِ بـ 0.', 'Differentiate and set to 0.'), math: same('$B\'(x)=-2x+40=0\\ \\to\\ x=20$') },
            { text: say('Mozkin maximoa 300 € da: han, $I\'=C\'$.', 'El beneficio máximo es 300 €: allí $I\'=C\'$.', 'الربح الأعظم 300 €: هناك $I\'=C\'$.', 'The greatest profit is €300: there $I\'=C\'$.'), math: same('$B(20)=-400+800-100=300$') }
        ],
        takeaway: say('$B(x)=I(x)-C(x)$. Maximoa $B\'(x)=0$ den lekuan dago, hau da, $I\'(x)=C\'(x)$ den lekuan: unitate bat gehiagoren diru-sarrera haren kostuaren berdina da.', '$B(x)=I(x)-C(x)$. El máximo está donde $B\'(x)=0$, es decir, donde $I\'(x)=C\'(x)$: el ingreso de una unidad más iguala a su coste.', '$B(x)=I(x)-C(x)$. القيمة العظمى حيث $B\'(x)=0$، أي حيث $I\'(x)=C\'(x)$: إيراد وحدة إضافية يساوي تكلفتها.', '$B(x)=I(x)-C(x)$. The maximum is where $B\'(x)=0$, that is, where $I\'(x)=C\'(x)$: the revenue of one more unit equals its cost.'),
        figure: (language) => <ProfitFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'optimize',
        stage: 'optimization',
        title: say('Optimizazio-problemak', 'Problemas de optimización', 'مسائل الاستمثال', 'Optimisation problems'),
        goal: say('Magnitude bat maximo edo minimo egitea, baldintza bat beteta.', 'Hacer máxima o mínima una magnitud que cumple una condición.', 'جعل مقدار يحقق شرطًا أعظميًّا أو أصغريًّا.', 'Make a quantity that meets a condition as large or as small as possible.'),
        needs: [{ unit: FUNCTIONS, topic: 'optimum', title: { eu: 'Maximoak: diru-sarrerak eta mozkina', es: 'Máximos: ingresos y beneficio', en: 'Maxima: revenue and profit', ar: 'القيم العظمى: الإيرادات والربح' } }],
        problem: say('Perimetroa 40 m duten laukizuzen guztien artean, zeinek du azalera handiena?', 'De todos los rectángulos de perímetro 40 m, ¿cuál tiene más área?', 'من بين كل المستطيلات التي محيطها 40 م، أيها أكبر مساحة؟', 'Of all the rectangles with perimeter 40 m, which has the greatest area?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Baldintza: aldagai bat askatu.', 'La condición: despeja una variable.', 'الشرط: اعزل متغيرًا.', 'The condition: solve for one variable.'), math: same('$2x+2y=40\\ \\to\\ y=20-x$') },
            { text: say('Azalera, aldagai bakarrarekin.', 'El área, con una sola variable.', 'المساحة بمتغير واحد.', 'The area, with a single variable.'), math: same('$A(x)=x(20-x)=20x-x^2$') },
            { text: say('Aldea 10 m duen karratu bat: 100 metro karratu.', 'Un cuadrado de 10 m de lado: 100 metros cuadrados.', 'مربع طول ضلعه 10 م: 100 متر مربع.', 'A square with 10 m sides: 100 square metres.'), math: same('$A\'(x)=20-2x=0\\ \\to\\ x=10$') }
        ],
        takeaway: say('Idatzi optimizatzen den magnitudea aldagai bakarrarekin, baldintza erabilita; deribatu, 0 berdindu eta egiaztatu maximoa ala minimoa den.', 'Escribe la magnitud que se optimiza con una sola variable, usando la condición; deriva, iguala a 0 y comprueba que es un máximo o un mínimo.', 'اكتب المقدار المراد استمثاله بمتغير واحد مستعملًا الشرط، ثم اشتق وساوِ بـ 0 وتحقق أنه قيمة عظمى أو صغرى.', 'Write the quantity to optimise with a single variable, using the condition; differentiate, set to 0 and check it is a maximum or a minimum.'),
        figure: (language) => <AreaFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'interval-extremes',
        stage: 'optimization',
        title: say('Muturrak tarte batean', 'Extremos en un intervalo', 'القيم القصوى في مجال', 'Extremes on an interval'),
        goal: say('Funtzio baten balio maximoa eta minimoa aurkitzea tarte itxi batean.', 'Hallar el valor máximo y mínimo de una función en un intervalo cerrado.', 'إيجاد القيمة العظمى والصغرى لدالة في مجال مغلق.', 'Find the greatest and least value of a function on a closed interval.'),
        needs: [{ unit: FUNCTIONS, topic: 'parabola', title: PARABOLA }],
        problem: say('Aurkitu $f(x)=x^2-4x+1$ funtzioaren maximoa eta minimoa $[0,5]$ tartean.', 'Halla el máximo y el mínimo de $f(x)=x^2-4x+1$ en $[0,5]$.', 'أوجد القيمة العظمى والصغرى لـ $f(x)=x^2-4x+1$ في $[0,5]$.', 'Find the maximum and the minimum of $f(x)=x^2-4x+1$ on $[0,5]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntu singularra.', 'Punto singular.', 'النقطة الحرجة.', 'Stationary point.'), math: same('$f\'(x)=2x-4=0\\ \\to\\ x=2$') },
            { text: say('Balioak puntu singularrean eta ertzetan.', 'Valores en el punto singular y en los bordes.', 'القيم عند النقطة الحرجة وعند الطرفين.', 'Values at the stationary point and at the borders.'), math: same('$f(0)=1\\qquad f(2)=-3\\qquad f(5)=6$') },
            { text: say('Maximoa 6 da, $x=5$ puntuan; minimoa $-3$, $x=2$ puntuan.', 'Máximo 6 en $x=5$ y mínimo $-3$ en $x=2$.', 'العظمى 6 عند $x=5$ والصغرى $-3$ عند $x=2$.', 'Maximum 6 at $x=5$ and minimum $-3$ at $x=2$.') }
        ],
        takeaway: say('$[a,b]$ tartean, alderatu $f$ barruko puntu singularretan eta $a$ eta $b$ ertzetan: handiena maximoa da, eta txikiena, minimoa.', 'En $[a,b]$, compara $f$ en los puntos singulares de dentro y en los bordes $a$ y $b$: el mayor es el máximo y el menor, el mínimo.', 'في $[a,b]$ قارن قيم $f$ عند النقاط الحرجة الداخلية وعند الطرفين $a$ و$b$: الأكبر هو العظمى والأصغر هو الصغرى.', 'On $[a,b]$, compare $f$ at the stationary points inside and at the borders $a$ and $b$: the greatest is the maximum and the least, the minimum.'),
        figure: (language) => <IntervalFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Graphs ---------- */
    {
        id: 'polynomial-graph',
        stage: 'graphs',
        title: say('Polinomio bat marraztea', 'Representar un polinomio', 'تمثيل حدودية', 'Drawing a polynomial'),
        goal: say('Polinomio bat marraztea ebaki-puntuekin, muturrekin eta adar infinituekin.', 'Dibujar un polinomio con sus cortes, sus extremos y sus ramas infinitas.', 'رسم حدودية بنقاط تقاطعها وقيمها القصوى وفروعها اللانهائية.', 'Draw a polynomial with its intercepts, its extremes and its infinite branches.'),
        needs: [{ unit: LIMITS, topic: 'poly-exp', title: { eu: 'Polinomioak eta esponentzialak infinituan', es: 'Polinomios y exponenciales en el infinito', en: 'Polynomials and exponentials at infinity', ar: 'الحدوديات والأسيات عند اللانهاية' } }],
        problem: say('Marraztu $f(x)=x^3-3x^2$.', 'Representa $f(x)=x^3-3x^2$.', 'ارسم $f(x)=x^3-3x^2$.', 'Draw $f(x)=x^3-3x^2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebaki-puntuak.', 'Cortes.', 'نقاط التقاطع.', 'Intercepts.'), math: same('$x^2(x-3)=0\\ \\to\\ x=0,\\ x=3$') },
            { text: say('Puntu singularrak.', 'Puntos singulares.', 'النقاط الحرجة.', 'Stationary points.'), math: same('$f\'(x)=3x^2-6x=0\\ \\to\\ x=0,\\ x=2$') },
            { text: say('Maximoa $(0,0)$ puntuan eta minimoa $(2,-4)$ puntuan; adarrak, $-\\infty$ eta $+\\infty$.', 'Máximo en $(0,0)$ y mínimo en $(2,-4)$; ramas, $-\\infty$ y $+\\infty$.', 'عظمى عند $(0,0)$ وصغرى عند $(2,-4)$؛ والفرعان $-\\infty$ و$+\\infty$.', 'Maximum at $(0,0)$ and minimum at $(2,-4)$; branches, $-\\infty$ and $+\\infty$.'), math: same('$f(0)=0\\qquad f(2)=-4$') }
        ],
        takeaway: say('Polinomio bat marrazteko: ardatzekin dituen ebaki-puntuak, puntu singularrak eta hazkundea, eta adar infinituak, maila handieneko gaiari jarraitzen diotenak.', 'Para dibujar un polinomio: cortes con los ejes, puntos singulares y crecimiento, y ramas infinitas, que siguen al término de mayor grado.', 'لرسم حدودية: نقاط التقاطع مع المحورين، والنقاط الحرجة والتزايد، والفروع اللانهائية التي تتبع الحد ذا الدرجة الأكبر.', 'To draw a polynomial: intercepts with the axes, stationary points and growth, and infinite branches, which follow the highest-degree term.'),
        figure: (language) => <PolynomialFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'rational-graph',
        stage: 'graphs',
        title: say('Funtzio arrazional bat marraztea', 'Representar una función racional', 'تمثيل دالة كسرية', 'Drawing a rational function'),
        goal: say('Funtzio arrazional bat marraztea asintotekin eta muturrekin.', 'Dibujar una función racional con sus asíntotas y sus extremos.', 'رسم دالة كسرية بمقارباتها وقيمها القصوى.', 'Draw a rational function with its asymptotes and its extremes.'),
        needs: [{ unit: LIMITS, topic: 'oblique', title: { eu: 'Asintota zeiharrak', es: 'Asíntotas oblicuas', en: 'Oblique asymptotes', ar: 'المقاربات المائلة' } }],
        problem: say('Marraztu $f(x)=\\frac{x^2}{x-1}$.', 'Representa $f(x)=\\frac{x^2}{x-1}$.', 'ارسم $f(x)=\\frac{x^2}{x-1}$.', 'Draw $f(x)=\\frac{x^2}{x-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Asintotak.', 'Asíntotas.', 'المقاربات.', 'Asymptotes.'), math: same('$x=1\\qquad y=x+1$') },
            { text: say('Puntu singularrak.', 'Puntos singulares.', 'النقاط الحرجة.', 'Stationary points.'), math: same('$f\'(x)=\\frac{x^2-2x}{(x-1)^2}=0\\ \\to\\ x=0,\\ x=2$') },
            { text: say('Maximoa $(0,0)$ puntuan eta minimoa $(2,4)$ puntuan.', 'Máximo en $(0,0)$ y mínimo en $(2,4)$.', 'عظمى عند $(0,0)$ وصغرى عند $(2,4)$.', 'Maximum at $(0,0)$ and minimum at $(2,4)$.'), math: same('$f(0)=0\\qquad f(2)=4$') }
        ],
        takeaway: say('Funtzio arrazional batean, gehitu izate-eremua eta asintotak polinomio batekoari; $f\'$ deribatuak zeinua alda dezake asintota bertikalean ere.', 'En una racional, añade el dominio y las asíntotas a lo de un polinomio; $f\'$ puede cambiar de signo también en la asíntota vertical.', 'في الدالة الكسرية أضف المجال والمقاربات إلى ما في الحدودية؛ وقد تتغير إشارة $f\'$ عند المقارب الرأسي أيضًا.', 'In a rational function, add the domain and the asymptotes to what you do for a polynomial; $f\'$ can also change sign at the vertical asymptote.'),
        figure: (language) => <RationalFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'derivative-graph',
        stage: 'graphs',
        title: say('Deribatuaren grafikoa', 'La gráfica de la derivada', 'رسم المشتقة', 'The graph of the derivative'),
        goal: say('$f$ funtzioaren grafikoan $f\'$ deribatuaren zeinua eta zeroak irakurtzea, eta alderantziz.', 'Leer en la gráfica de $f$ el signo y los ceros de $f\'$, y al revés.', 'قراءة إشارة $f\'$ وأصفارها على رسم $f$، والعكس.', 'Read on the graph of $f$ the sign and the zeros of $f\'$, and the other way round.'),
        needs: [{ unit: FUNCTIONS, topic: 'parabola', title: PARABOLA }],
        problem: say('$f$ funtzioaren grafikoa igo egiten da $x=-1$ arte, jaitsi $x=3$ arte, eta berriz igo. Nolakoa da $f\'$?', 'La gráfica de $f$ sube hasta $x=-1$, baja hasta $x=3$ y vuelve a subir. ¿Cómo es $f\'$?', 'يصعد رسم $f$ حتى $x=-1$ وينزل حتى $x=3$ ثم يصعد. كيف تكون $f\'$؟', 'The graph of $f$ rises up to $x=-1$, falls up to $x=3$ and rises again. What is $f\'$ like?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f$ igotzen den lekuan, $f\'>0$; jaisten den lekuan, $f\'<0$.', 'Donde $f$ sube, $f\'>0$; donde baja, $f\'<0$.', 'حيث تصعد $f$ تكون $f\'>0$، وحيث تنزل $f\'<0$.', 'Where $f$ rises, $f\'>0$; where it falls, $f\'<0$.') },
            { text: say('Muturretan, $f\'=0$.', 'En los extremos, $f\'=0$.', 'عند القيم القصوى $f\'=0$.', 'At the extremes, $f\'=0$.'), math: same('$f\'(-1)=0\\qquad f\'(3)=0$') },
            { text: say('$f$ kubikoa bada, $f\'$ zero horiek dituen parabola bat da.', 'Si $f$ es una cúbica, $f\'$ es una parábola con esos ceros.', 'إذا كانت $f$ تكعيبية فإن $f\'$ قطع مكافئ له هذان الصفران.', 'If $f$ is a cubic, $f\'$ is a parabola with those zeros.'), math: same('$f\'(x)=k(x+1)(x-3)$') }
        ],
        takeaway: say('$f$ gorakorra den lekuan, $f\'$ X ardatzaren gainetik dago; beherakorra den lekuan, azpitik; $f$ funtzioaren maximo eta minimoetan, $f\'$ deribatuak ardatza ebakitzen du.', 'Donde $f$ crece, $f\'$ está por encima del eje X; donde decrece, por debajo; en los máximos y mínimos de $f$, $f\'$ corta el eje.', 'حيث تتزايد $f$ تكون $f\'$ فوق محور X، وحيث تتناقص تكون تحته، وعند القيم العظمى والصغرى لـ $f$ تقطع $f\'$ المحور.', 'Where $f$ rises, $f\'$ is above the x-axis; where it falls, below; at the maxima and minima of $f$, $f\'$ cuts the axis.'),
        figure: (language) => <DerivativeGraphFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const socDerivTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...socDerivLessonTexts[topic.id as SocDerivTopicId],
    ...socDerivLessonChecks[topic.id as SocDerivTopicId]
}))
