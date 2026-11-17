import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { same, say } from '../batx1-zientziak-funtzioak/text'
import { ChainExpFigure, ChainLogFigure, ChainPowerFigure, CornerFigure, DefinitionFigure, DerivativeGraphFigure, HigherFigure, InstantFigure, MarginalFigure, PowersFigure, ProductFigure, RateContextFigure, RateFigure, SmoothJoinFigure, TangentFigure } from './figures'
import { bach2gDerivativesLessonChecks, type Bach2gDerivativesTopicId } from './lessonChecks'
import { bach2gDerivativesLessonTexts } from './lessonTexts'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Gizarte Zientziak — stages and lessons. The
   scope follows unit 6 of Santillana 2.º Bachillerato Ciencias Sociales
   and unit 6 of Anaya Matemáticas Aplicadas a las CCSS II: the average
   rate of change, the derivative at a point (definition and tangent),
   differentiability (corners and jumps, pieces with parameters), the
   rules and the chain rule with powers, exponentials and logarithms,
   higher derivatives, and the derivative as the cost of the next unit
   (the «marginal» name is not in the books, owner 2026-11-17). Without
   implicit or logarithmic differentiation (2.º Ciencias) and without the
   trigonometric derivatives.
   ========================================================================== */

export type Bach2gDerivativesStageId = 'rate' | 'point' | 'rules' | 'chain' | 'economy'

export const bach2gDerivativesStages: UnitStage[] = [
    { id: 'rate', tone: 'blue', title: { eu: 'Aldakuntza-tasa', es: 'Tasa de variación', en: 'Rate of change', ar: 'معدل التغير' } },
    { id: 'point', tone: 'violet', title: { eu: 'Deribatua puntu batean', es: 'Derivada en un punto', en: 'The derivative at a point', ar: 'المشتقة عند نقطة' } },
    { id: 'rules', tone: 'mustard', title: { eu: 'Deribatzeko erregelak', es: 'Reglas de derivación', en: 'Rules of differentiation', ar: 'قواعد الاشتقاق' } },
    { id: 'chain', tone: 'coral', title: { eu: 'Katearen erregela', es: 'La regla de la cadena', en: 'The chain rule', ar: 'قاعدة السلسلة' } },
    { id: 'economy', tone: 'green', title: { eu: 'Ekonomian', es: 'En economía', en: 'In economy', ar: 'في الاقتصاد' } }
]

const DERIVATIVES1 = 'batx1-zientziak/derivadas'
const LIMITS2 = 'batx2-gizarte/limites-continuidad'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Rate of change ---------- */
    {
        id: 'average-rate',
        stage: 'rate',
        title: say('Batez besteko aldakuntza-tasa', 'Tasa de variación media', 'معدل التغير المتوسط', 'Average rate of change'),
        goal: say('Tarte batean T.V.M. kalkulatzea eta ebakitzailearen malda gisa ikustea.', 'Calcular la T.V.M. en un intervalo y verla como la pendiente de la secante.', 'حساب معدل التغير المتوسط في فترة ورؤيته ميلًا للقاطع.', 'Work out the average rate of change over an interval and see it as the slope of the secant.'),
        needs: [
            { unit: DERIVATIVES1, topic: 'average-rate', title: { eu: 'T.V.M. eta batez besteko abiadura', es: 'T.V.M. y velocidad media', en: 'Average rate and average speed', ar: 'معدل التغير المتوسط والسرعة المتوسطة' } }
        ],
        problem: say('Kalkulatu $f(x)=x^2-2x$ funtzioaren T.V.M. $[1,4]$ tartean.', 'Calcula la T.V.M. de $f(x)=x^2-2x$ en $[1,4]$.', 'احسب معدل التغير المتوسط للدالة $f(x)=x^2-2x$ في $[1,4]$.', 'Work out the average rate of change of $f(x)=x^2-2x$ on $[1,4]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Balioak muturretan.', 'Valores en los extremos.', 'القيمتان عند الطرفين.', 'Values at the ends.'), math: same('$f(1)=-1\\qquad f(4)=8$') },
            { text: say('Aldaketa zati tartearen luzera.', 'Variación entre la longitud del intervalo.', 'التغير على طول الفترة.', 'Change over the length of the interval.'), math: same('$\\frac{8-(-1)}{4-1}=\\frac{9}{3}=3$') },
            { text: say('Ebakitzailearen malda 3 da.', 'La pendiente de la secante es 3.', 'ميل القاطع 3.', 'The slope of the secant is 3.') }
        ],
        takeaway: say('$[a,b]$ tarteko T.V.M. $\\frac{f(b)-f(a)}{b-a}$ da: bi puntuak lotzen dituen ebakitzailearen malda, $x$ unitate bakoitzeko batez besteko aldaketa.', 'La T.V.M. en $[a,b]$ es $\\frac{f(b)-f(a)}{b-a}$: la pendiente de la secante que une los dos puntos, el cambio medio por cada unidad de $x$.', 'معدل التغير المتوسط في $[a,b]$ هو $\\frac{f(b)-f(a)}{b-a}$: ميل القاطع الواصل بين النقطتين، أي متوسط التغير لكل وحدة من $x$.', 'The average rate on $[a,b]$ is $\\frac{f(b)-f(a)}{b-a}$: the slope of the secant joining the two points, the average change per unit of $x$.'),
        figure: (language) => <RateFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'rate-context',
        stage: 'rate',
        title: say('Aldakuntza-tasa testuinguruan', 'La tasa de variación en contexto', 'معدل التغير في سياقه', 'The rate of change in context'),
        goal: say('Salmenta, biztanleria edo kostu baten T.V.M. kalkulatzea eta bere unitateekin interpretatzea.', 'Calcular la T.V.M. de unas ventas, una población o un coste e interpretarla con sus unidades.', 'حساب معدل التغير المتوسط لمبيعات أو سكان أو تكلفة وتفسيره بوحداته.', 'Work out the average rate of change of sales, a population or a cost and read it with its units.'),
        problem: say('Produktu baten salmentak, milakatan, $V(t)=12t-t^2$ dira, $t$ hilabetetan. Zenbat aldatzen dira hilabete bakoitzean, batez beste, 2. eta 5. hilabeteen artean?', 'Las ventas de un producto, en miles, son $V(t)=12t-t^2$, con $t$ en meses. ¿Cuánto cambian de media cada mes entre los meses 2 y 5?', 'مبيعات منتج بالآلاف هي $V(t)=12t-t^2$، حيث $t$ بالأشهر. كم تتغير في المتوسط كل شهر بين الشهرين 2 و5؟', 'The sales of a product, in thousands, are $V(t)=12t-t^2$, with $t$ in months. How much do they change on average each month between months 2 and 5?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Salmentak bi hilabeteetan.', 'Las ventas en los dos meses.', 'المبيعات في الشهرين.', 'The sales in the two months.'), math: same('$V(2)=20\\qquad V(5)=35$') },
            { text: say('T.V.M.', 'La T.V.M.', 'معدل التغير المتوسط.', 'The average rate.'), math: same('$\\frac{35-20}{5-2}=\\frac{15}{3}=5$') },
            { text: say('Hilean 5000 unitate gehiago saltzen dira, batez beste.', 'Se venden de media 5000 unidades más cada mes.', 'تُباع في المتوسط 5000 وحدة إضافية كل شهر.', 'On average, 5,000 more units are sold each month.') }
        ],
        takeaway: say('T.V.M.-ak bi unitate ditu: $f$ funtzioarenak zati $x$ aldagaiarenak (milaka unitate hilean, euro unitateko…). Positiboa bada, magnitudea hazten da tartean; negatiboa bada, txikitzen da.', 'La T.V.M. lleva las unidades de $f$ entre las de $x$ (miles de unidades al mes, euros por unidad…). Si es positiva, la magnitud crece en el intervalo; si es negativa, decrece.', 'لمعدل التغير المتوسط وحدات $f$ مقسومة على وحدات $x$ (آلاف الوحدات في الشهر، اليورو لكل وحدة…). إذا كان موجبًا فالمقدار يزداد في الفترة؛ وإذا كان سالبًا فإنه يتناقص.', 'The average rate carries the units of $f$ over those of $x$ (thousands of units a month, euros per unit…). If it is positive, the quantity grows on the interval; if negative, it falls.'),
        figure: (language) => <RateContextFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'instant',
        stage: 'rate',
        title: say('Batez bestekotik unean unekora', 'De la media a la instantánea', 'من المتوسط إلى اللحظي', 'From the average to the instantaneous'),
        goal: say('T.V.M.-a gero eta tarte txikiagoetan kalkulatzea eta haren limitea, aldakuntza-tasa unekoa, ulertzea.', 'Calcular la T.V.M. en intervalos cada vez más pequeños y entender su límite, la tasa de variación instantánea.', 'حساب معدل التغير المتوسط في فترات تصغر شيئًا فشيئًا وفهم نهايته، أي معدل التغير اللحظي.', 'Work out the average rate on smaller and smaller intervals and understand its limit, the instantaneous rate of change.'),
        needs: [
            { unit: LIMITS2, topic: 'zero-zero', title: { eu: 'Zero zati zero: faktorizatu edo konjokatua', es: 'Cero entre cero: factorizar o conjugado', en: 'Zero over zero: factorise or conjugate', ar: 'صفر على صفر: التحليل أو المرافق' } }
        ],
        problem: say('$V(t)=12t-t^2$ bada, kalkulatu T.V.M. $[2,2+h]$ tartean eta haren limitea $h\\to 0$ denean.', 'Si $V(t)=12t-t^2$, calcula la T.V.M. en $[2,2+h]$ y su límite cuando $h\\to 0$.', 'إذا كانت $V(t)=12t-t^2$ فاحسب معدل التغير المتوسط في $[2,2+h]$ ونهايته عندما $h\\to 0$.', 'If $V(t)=12t-t^2$, work out the average rate on $[2,2+h]$ and its limit as $h\\to 0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Balioak.', 'Los valores.', 'القيمتان.', 'The values.'), math: same('$V(2+h)=20+8h-h^2\\qquad V(2)=20$') },
            { text: say('T.V.M., $h$ sinplifikatuz.', 'La T.V.M., simplificando $h$.', 'معدل التغير المتوسط مع اختصار $h$.', 'The average rate, cancelling $h$.'), math: same('$\\frac{8h-h^2}{h}=8-h$') },
            { text: say('$h\\to 0$ denean, 8: 2. hilabetean salmentak hilean 8000 unitateko erritmoan hazten dira.', 'Cuando $h\\to 0$, 8: en el mes 2 las ventas crecen a un ritmo de 8000 unidades al mes.', 'عندما $h\\to 0$ نجد 8: في الشهر 2 تنمو المبيعات بمعدل 8000 وحدة في الشهر.', 'As $h\\to 0$, 8: in month 2 the sales grow at a rate of 8,000 units a month.'), math: same('$\\lim_{h\\to 0}(8-h)=8$') }
        ],
        takeaway: say('Tartea txikitzean, T.V.M.-a zenbaki batera hurbiltzen da: aldakuntza-tasa unekoa edo deribatua. Ebakitzailea zuzen ukitzaile bihurtzen da.', 'Al encoger el intervalo, la T.V.M. se acerca a un número: la tasa de variación instantánea o derivada. La secante se convierte en la tangente.', 'عند تصغير الفترة يقترب معدل التغير المتوسط من عدد: معدل التغير اللحظي أو المشتقة. ويصير القاطع مماسًا.', 'As the interval shrinks, the average rate approaches a number: the instantaneous rate of change, or derivative. The secant becomes the tangent.'),
        figure: (language) => <InstantFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. The derivative at a point ---------- */
    {
        id: 'definition',
        stage: 'point',
        title: say('Deribatua definizioaren bidez', 'La derivada por la definición', 'المشتقة بالتعريف', 'The derivative from the definition'),
        goal: say('$f\'(a)$ definizioaren bidez kalkulatzea: $h$ txikiko tarteen T.V.M.-aren limitea.', 'Calcular $f\'(a)$ con la definición: el límite de la T.V.M. en intervalos de ancho $h$.', 'حساب $f\'(a)$ بالتعريف: نهاية معدل التغير المتوسط في فترات عرضها $h$.', 'Work out $f\'(a)$ from the definition: the limit of the average rate over intervals of width $h$.'),
        needs: [
            { unit: DERIVATIVES1, topic: 'derivative-point', title: { eu: 'Deribatua puntu batean', es: 'Derivada en un punto', en: 'The derivative at a point', ar: 'المشتقة عند نقطة' } }
        ],
        problem: say('Kalkulatu $f\'(1)$ definizioaren bidez, $f(x)=3x^2+x$ bada.', 'Calcula $f\'(1)$ con la definición si $f(x)=3x^2+x$.', 'احسب $f\'(1)$ بالتعريف إذا كانت $f(x)=3x^2+x$.', 'Work out $f\'(1)$ from the definition if $f(x)=3x^2+x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $f(1+h)-f(1)$.', 'Escribe $f(1+h)-f(1)$.', 'اكتب $f(1+h)-f(1)$.', 'Write $f(1+h)-f(1)$.'), math: same('$3(1+h)^2+(1+h)-4=7h+3h^2$') },
            { text: say('Zatitu $h$ aldagaiaz.', 'Divide entre $h$.', 'اقسم على $h$.', 'Divide by $h$.'), math: same('$\\frac{7h+3h^2}{h}=7+3h$') },
            { text: say('Limitea $h\\to 0$ denean.', 'Límite cuando $h\\to 0$.', 'النهاية عندما $h\\to 0$.', 'Limit as $h\\to 0$.'), math: same('$f\'(1)=\\lim_{h\\to 0}(7+3h)=7$') }
        ],
        takeaway: say('$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$. Ordezkatzean $\\frac{0}{0}$ ateratzen da beti: garatu, $h$ sinplifikatu eta $h=0$ ordezkatu.', '$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$. Al sustituir siempre sale $\\frac{0}{0}$: desarrolla, simplifica $h$ y sustituye $h=0$.', '$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$. بالتعويض تظهر دائمًا $\\frac{0}{0}$: انشر واختصر $h$ ثم عوّض $h=0$.', '$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$. Substituting always gives $\\frac{0}{0}$: expand, cancel $h$ and substitute $h=0$.'),
        figure: (language) => <DefinitionFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'tangent',
        stage: 'point',
        title: say('Zuzen ukitzailea', 'La recta tangente', 'المماس', 'The tangent line'),
        goal: say('Kurba baten zuzen ukitzailea puntu batean idaztea, $f\'(a)$ malda gisa erabiliz.', 'Escribir la recta tangente a una curva en un punto usando $f\'(a)$ como pendiente.', 'كتابة معادلة المماس لمنحنى عند نقطة باستعمال $f\'(a)$ ميلًا.', 'Write the tangent line to a curve at a point using $f\'(a)$ as the slope.'),
        needs: [
            { unit: DERIVATIVES1, topic: 'tangent', title: { eu: 'Zuzen ukitzailea eta zuzen normala', es: 'Recta tangente y recta normal', en: 'Tangent and normal lines', ar: 'المماس والمستقيم العمودي' } }
        ],
        problem: say('Idatzi $f(x)=x^2-4x+5$ kurbaren zuzen ukitzailea $x=3$ puntuan.', 'Escribe la recta tangente a $f(x)=x^2-4x+5$ en $x=3$.', 'اكتب معادلة مماس المنحنى $f(x)=x^2-4x+5$ عند $x=3$.', 'Write the tangent line to $f(x)=x^2-4x+5$ at $x=3$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ukitze-puntua.', 'El punto de tangencia.', 'نقطة التماس.', 'The point of contact.'), math: same('$f(3)=9-12+5=2$') },
            { text: say('Malda, deribatuarekin.', 'La pendiente, con la derivada.', 'الميل بالمشتقة.', 'The slope, with the derivative.'), math: same('$f\'(x)=2x-4\\ \\to\\ f\'(3)=2$') },
            { text: say('Zuzena puntu eta maldarekin.', 'La recta con punto y pendiente.', 'المستقيم بنقطة وميل.', 'The line from point and slope.'), math: same('$y-2=2(x-3)\\ \\to\\ y=2x-4$') }
        ],
        takeaway: say('$x=a$ puntuko zuzen ukitzailea $y-f(a)=f\'(a)(x-a)$ da: puntua $(a,f(a))$ eta malda $f\'(a)$.', 'La recta tangente en $x=a$ es $y-f(a)=f\'(a)(x-a)$: el punto es $(a,f(a))$ y la pendiente, $f\'(a)$.', 'المماس عند $x=a$ هو $y-f(a)=f\'(a)(x-a)$: النقطة $(a,f(a))$ والميل $f\'(a)$.', 'The tangent at $x=a$ is $y-f(a)=f\'(a)(x-a)$: the point is $(a,f(a))$ and the slope $f\'(a)$.'),
        figure: (language) => <TangentFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'derivable',
        stage: 'point',
        title: say('Deribagarria ala ez: puntak eta jauziak', 'Derivable o no: picos y saltos', 'قابلة للاشتقاق أم لا: الزوايا والقفزات', 'Differentiable or not: corners and jumps'),
        goal: say('Funtzio bat puntu batean deribagarria den aztertzea, alboko deribatuekin, eta jarraitutasunarekin duen lotura ulertzea.', 'Estudiar si una función es derivable en un punto con las derivadas laterales y entender su relación con la continuidad.', 'دراسة قابلية اشتقاق دالة عند نقطة بالمشتقتين الجانبيتين وفهم علاقتها بالاتصال.', 'Study whether a function is differentiable at a point with the one-sided derivatives, and understand how it relates to continuity.'),
        needs: [
            { unit: DERIVATIVES1, topic: 'one-sided-derivatives', title: { eu: 'Alboko deribatuak eta puntak', es: 'Derivadas laterales y picos', en: 'One-sided derivatives and corners', ar: 'المشتقتان الجانبيتان والزوايا' } },
            { unit: LIMITS2, topic: 'continuous', title: { eu: 'Jarraitutasunaren hiru baldintzak', es: 'Las tres condiciones de la continuidad', en: 'The three conditions for continuity', ar: 'شروط الاتصال الثلاثة' } }
        ],
        problem: say('Deribagarria al da $f(x)=\\begin{cases}x^2 & x\\le 1\\\\ 3x-2 & x>1\\end{cases}$ funtzioa $x=1$ puntuan?', '¿Es derivable $f(x)=\\begin{cases}x^2 & x\\le 1\\\\ 3x-2 & x>1\\end{cases}$ en $x=1$?', 'هل $f(x)=\\begin{cases}x^2 & x\\le 1\\\\ 3x-2 & x>1\\end{cases}$ قابلة للاشتقاق عند $x=1$؟', 'Is $f(x)=\\begin{cases}x^2 & x\\le 1\\\\ 3x-2 & x>1\\end{cases}$ differentiable at $x=1$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenik, jarraitua: bi zatiek 1 ematen dute.', 'Primero, continua: los dos trozos dan 1.', 'أولًا متصلة: يعطي الجزآن 1.', 'First, continuous: both pieces give 1.'), math: same('$1^2=1\\qquad 3\\cdot 1-2=1$') },
            { text: say('Alboko deribatuak.', 'Las derivadas laterales.', 'المشتقتان الجانبيتان.', 'The one-sided derivatives.'), math: same('$f\'(1^-)=2\\cdot 1=2\\qquad f\'(1^+)=3$') },
            { text: say('$2\\neq 3$: punta bat dago. Jarraitua da, baina ez deribagarria.', '$2\\neq 3$: hay un pico. Es continua, pero no derivable.', '$2\\neq 3$: توجد زاوية. متصلة لكنها غير قابلة للاشتقاق.', '$2\\neq 3$: there is a corner. It is continuous but not differentiable.') }
        ],
        takeaway: say('Deribagarria bada, jarraitua da; alderantziz, ez beti. Jauzi batean ez da deribagarria; punta batean ere ez (alboko deribatuak desberdinak). Zatika: lehenik jarraitutasuna, gero alboko deribatuak.', 'Si es derivable, es continua; al revés, no siempre. En un salto no es derivable; en un pico tampoco (laterales distintas). A trozos: primero la continuidad, después las derivadas laterales.', 'إذا كانت قابلة للاشتقاق فهي متصلة، والعكس ليس دائمًا. لا تكون قابلة للاشتقاق عند قفزة ولا عند زاوية (مشتقتان جانبيتان مختلفتان). وفي الدوال متعددة الأجزاء: الاتصال أولًا ثم المشتقتان الجانبيتان.', 'If it is differentiable, it is continuous; not always the other way. At a jump it is not differentiable; nor at a corner (different one-sided derivatives). Piecewise: first continuity, then the one-sided derivatives.'),
        figure: (language) => <CornerFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. Rules ---------- */
    {
        id: 'powers',
        stage: 'rules',
        title: say('Berreturak, erroak eta baturak', 'Potencias, raíces y sumas', 'القوى والجذور والمجاميع', 'Powers, roots and sums'),
        goal: say('Polinomioak, erroak eta $\\frac{1}{x^n}$ motako funtzioak deribatzea, berreturaren erregelarekin.', 'Derivar polinomios, raíces y funciones como $\\frac{1}{x^n}$ con la regla de la potencia.', 'اشتقاق الحدوديات والجذور ودوال مثل $\\frac{1}{x^n}$ بقاعدة القوة.', 'Differentiate polynomials, roots and functions like $\\frac{1}{x^n}$ with the power rule.'),
        needs: [
            { unit: DERIVATIVES1, topic: 'powers', title: { eu: 'Berreturak eta erroak', es: 'Potencias y raíces', en: 'Powers and roots', ar: 'القوى والجذور' } }
        ],
        problem: say('Deribatu $f(x)=4x^3-\\frac{2}{x}+6\\sqrt{x}$.', 'Deriva $f(x)=4x^3-\\frac{2}{x}+6\\sqrt{x}$.', 'اشتق $f(x)=4x^3-\\frac{2}{x}+6\\sqrt{x}$.', 'Differentiate $f(x)=4x^3-\\frac{2}{x}+6\\sqrt{x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi berretura gisa.', 'Escribe como potencias.', 'اكتب على صورة قوى.', 'Write as powers.'), math: same('$4x^3-2x^{-1}+6x^{\\frac{1}{2}}$') },
            { text: say('Berretzailea aurrera eta bat gutxiago.', 'El exponente delante y uno menos.', 'الأس إلى الأمام ونقصه واحدًا.', 'The exponent in front and one less.'), math: same('$12x^2+2x^{-2}+3x^{-\\frac{1}{2}}$') },
            { text: say('Idatzi berriro zatiki eta erroekin.', 'Vuelve a escribir con fracciones y raíces.', 'أعد الكتابة بالكسور والجذور.', 'Write it again with fractions and roots.'), math: same('$f\'(x)=12x^2+\\frac{2}{x^2}+\\frac{3}{\\sqrt{x}}$') }
        ],
        takeaway: say('$(x^n)\'=nx^{n-1}$, edozein $n$ berretzailerekin: $\\frac{1}{x^n}=x^{-n}$ eta $\\sqrt{x}=x^{\\frac{1}{2}}$. Batura gaiz gai deribatzen da eta konstante batena 0 da.', '$(x^n)\'=nx^{n-1}$ con cualquier exponente $n$: $\\frac{1}{x^n}=x^{-n}$ y $\\sqrt{x}=x^{\\frac{1}{2}}$. Una suma se deriva término a término y una constante da 0.', '$(x^n)\'=nx^{n-1}$ مع أي أس $n$: ‏$\\frac{1}{x^n}=x^{-n}$ و$\\sqrt{x}=x^{\\frac{1}{2}}$. ويُشتق المجموع حدًّا حدًّا ومشتقة الثابت 0.', '$(x^n)\'=nx^{n-1}$ for any exponent $n$: $\\frac{1}{x^n}=x^{-n}$ and $\\sqrt{x}=x^{\\frac{1}{2}}$. A sum is differentiated term by term and a constant gives 0.'),
        figure: (language) => <PowersFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'product-quotient',
        stage: 'rules',
        title: say('Biderkadura eta zatidura', 'Producto y cociente', 'الجداء وخارج القسمة', 'Product and quotient'),
        goal: say('Biderkadurak eta zatidurak deribatzea, haien erregelekin.', 'Derivar productos y cocientes con sus reglas.', 'اشتقاق الجداءات وخوارج القسمة بقواعدها.', 'Differentiate products and quotients with their rules.'),
        needs: [
            { unit: DERIVATIVES1, topic: 'product', title: { eu: 'Biderkaduraren deribatua', es: 'Derivada del producto', en: 'The product rule', ar: 'مشتقة الجداء' } },
            { unit: DERIVATIVES1, topic: 'quotient', title: { eu: 'Zatiduraren deribatua', es: 'Derivada del cociente', en: 'The quotient rule', ar: 'مشتقة خارج القسمة' } }
        ],
        problem: say('Deribatu batez besteko kostua $M(x)=\\frac{2x+50}{x+1}$.', 'Deriva el coste medio $M(x)=\\frac{2x+50}{x+1}$.', 'اشتق متوسط التكلفة $M(x)=\\frac{2x+50}{x+1}$.', 'Differentiate the average cost $M(x)=\\frac{2x+50}{x+1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatiduraren erregela.', 'La regla del cociente.', 'قاعدة خارج القسمة.', 'The quotient rule.'), math: same('$\\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-uv\'}{v^2}$') },
            { text: say('$u=2x+50$, $v=x+1$.', '$u=2x+50$, $v=x+1$.', '$u=2x+50$، $v=x+1$.', '$u=2x+50$, $v=x+1$.'), math: same('$\\frac{2(x+1)-(2x+50)\\cdot 1}{(x+1)^2}$') },
            { text: say('Sinplifikatu: beti negatiboa, batez besteko kostua jaisten doa.', 'Simplifica: siempre negativa, el coste medio va bajando.', 'بسّط: سالبة دائمًا، فمتوسط التكلفة يتناقص.', 'Simplify: always negative, the average cost keeps falling.'), math: same('$M\'(x)=\\frac{-48}{(x+1)^2}$') }
        ],
        takeaway: say('$(uv)\'=u\'v+uv\'$ eta $\\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-uv\'}{v^2}$. Biderkaduraren deribatua ez da deribatuen biderkadura, eta zatiduran kenketaren ordena garrantzitsua da.', '$(uv)\'=u\'v+uv\'$ y $\\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-uv\'}{v^2}$. La derivada del producto no es el producto de las derivadas, y en el cociente importa el orden de la resta.', '$(uv)\'=u\'v+uv\'$ و$\\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-uv\'}{v^2}$. مشتقة الجداء ليست جداء المشتقتين، وفي خارج القسمة يهم ترتيب الطرح.', '$(uv)\'=u\'v+uv\'$ and $\\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-uv\'}{v^2}$. The derivative of a product is not the product of the derivatives, and in a quotient the order of the subtraction matters.'),
        figure: (language) => <ProductFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'derivative-graph',
        stage: 'rules',
        title: say('Funtzio deribatua eta haren grafikoa', 'La función derivada y su gráfica', 'الدالة المشتقة وتمثيلها البياني', 'The derivative function and its graph'),
        goal: say('$f\'$ funtzioa $f$ funtzioaren maldak bezala irakurtzea: $f$ hazten den tokian $f\'>0$, jaisten den tokian $f\'<0$.', 'Leer $f\'$ como las pendientes de $f$: donde $f$ crece, $f\'>0$; donde baja, $f\'<0$.', 'قراءة $f\'$ على أنها ميول $f$: حيث تتزايد $f$ يكون $f\'>0$، وحيث تتناقص يكون $f\'<0$.', 'Read $f\'$ as the slopes of $f$: where $f$ rises, $f\'>0$; where it falls, $f\'<0$.'),
        problem: say('$B(x)=-x^2+8x-7$ irabazia bada, kalkulatu $B\'(x)$ eta esan non den positiboa.', 'Si el beneficio es $B(x)=-x^2+8x-7$, calcula $B\'(x)$ y di dónde es positiva.', 'إذا كان الربح $B(x)=-x^2+8x-7$ فاحسب $B\'(x)$ وقل أين تكون موجبة.', 'If the profit is $B(x)=-x^2+8x-7$, work out $B\'(x)$ and say where it is positive.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatua.', 'La derivada.', 'المشتقة.', 'The derivative.'), math: same('$B\'(x)=-2x+8$') },
            { text: say('Zero da $x=4$ puntuan.', 'Se anula en $x=4$.', 'تنعدم عند $x=4$.', 'It is 0 at $x=4$.'), math: same('$-2x+8=0\\ \\to\\ x=4$') },
            { text: say('$x<4$ denean positiboa (irabazia hazten da) eta $x>4$ denean negatiboa (jaisten da).', 'Positiva si $x<4$ (el beneficio crece) y negativa si $x>4$ (baja).', 'موجبة إذا $x<4$ (يزداد الربح) وسالبة إذا $x>4$ (يتناقص).', 'Positive if $x<4$ (the profit grows) and negative if $x>4$ (it falls).') }
        ],
        takeaway: say('$f\'(x)$ funtzioak $x$ bakoitzean $f$ funtzioaren malda ematen du. $f\'>0$: $f$ hazten da; $f\'<0$: jaisten da; $f\'=0$: zuzen ukitzaile horizontala.', '$f\'(x)$ da la pendiente de $f$ en cada $x$. $f\'>0$: $f$ crece; $f\'<0$: baja; $f\'=0$: tangente horizontal.', 'تعطي $f\'(x)$ ميل $f$ عند كل $x$. ‏$f\'>0$: تتزايد $f$؛ ‏$f\'<0$: تتناقص؛ ‏$f\'=0$: مماس أفقي.', '$f\'(x)$ gives the slope of $f$ at each $x$. $f\'>0$: $f$ rises; $f\'<0$: it falls; $f\'=0$: a horizontal tangent.'),
        figure: (language) => <DerivativeGraphFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. The chain rule ---------- */
    {
        id: 'chain-power',
        stage: 'chain',
        title: say('Katearen erregela: berreturak eta erroak', 'Regla de la cadena: potencias y raíces', 'قاعدة السلسلة: القوى والجذور', 'Chain rule: powers and roots'),
        goal: say('Funtzio baten berretura edo erroa deribatzea: kanpokoa deribatu eta barrukoaren deribatuaz biderkatu.', 'Derivar una potencia o una raíz de una función: derivar lo de fuera y multiplicar por la derivada de dentro.', 'اشتقاق قوة أو جذر لدالة: اشتق الخارج واضرب في مشتقة الداخل.', 'Differentiate a power or a root of a function: differentiate the outside and multiply by the derivative of the inside.'),
        needs: [
            { unit: DERIVATIVES1, topic: 'chain', title: { eu: 'Katearen erregela', es: 'La regla de la cadena', en: 'The chain rule', ar: 'قاعدة السلسلة' } }
        ],
        problem: say('Deribatu $f(x)=(x^2+3)^4$ eta $g(x)=\\sqrt{2x+5}$.', 'Deriva $f(x)=(x^2+3)^4$ y $g(x)=\\sqrt{2x+5}$.', 'اشتق $f(x)=(x^2+3)^4$ و$g(x)=\\sqrt{2x+5}$.', 'Differentiate $f(x)=(x^2+3)^4$ and $g(x)=\\sqrt{2x+5}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kanpoan berretura bat, barruan $x^2+3$.', 'Fuera una potencia, dentro $x^2+3$.', 'في الخارج قوة وفي الداخل $x^2+3$.', 'Outside a power, inside $x^2+3$.'), math: same('$f\'(x)=4(x^2+3)^3\\cdot 2x$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$f\'(x)=8x(x^2+3)^3$') },
            { text: say('Erroarekin: $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$.', 'Con la raíz: $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$.', 'مع الجذر: $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$.', 'With the root: $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$.'), math: same('$g\'(x)=\\frac{2}{2\\sqrt{2x+5}}=\\frac{1}{\\sqrt{2x+5}}$') }
        ],
        takeaway: say('$(u^n)\'=nu^{n-1}\\cdot u\'$ eta $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$. Barrukoaren deribatua, $u\'$, ez da ahaztu behar.', '$(u^n)\'=nu^{n-1}\\cdot u\'$ y $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$. No hay que olvidar la derivada de dentro, $u\'$.', '$(u^n)\'=nu^{n-1}\\cdot u\'$ و$(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$. ولا يجوز نسيان مشتقة الداخل $u\'$.', '$(u^n)\'=nu^{n-1}\\cdot u\'$ and $(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$. Do not forget the derivative of the inside, $u\'$.'),
        figure: (language) => <ChainPowerFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'chain-exp',
        stage: 'chain',
        title: say('Funtzio esponentzialak', 'Funciones exponenciales', 'الدوال الأسية', 'Exponential functions'),
        goal: say('$e^{u}$ eta $a^{u}$ motako funtzioak deribatzea, hazkunde eta beherakada esponentzialeko ereduetan.', 'Derivar funciones como $e^{u}$ y $a^{u}$ en modelos de crecimiento y decrecimiento exponencial.', 'اشتقاق دوال مثل $e^{u}$ و$a^{u}$ في نماذج النمو والتناقص الأسي.', 'Differentiate functions like $e^{u}$ and $a^{u}$ in models of exponential growth and decay.'),
        needs: [
            { unit: DERIVATIVES1, topic: 'exp-log', title: { eu: 'Esponentzialak eta logaritmoak', es: 'Exponenciales y logaritmos', en: 'Exponentials and logarithms', ar: 'الدوال الأسية واللوغاريتمية' } }
        ],
        problem: say('Biztanleria bat $P(t)=200e^{0{,}03t}$ da. Kalkulatu $P\'(t)$ eta $P\'(0)$.', 'Una población es $P(t)=200e^{0{,}03t}$. Calcula $P\'(t)$ y $P\'(0)$.', 'عدد سكان $P(t)=200e^{0{,}03t}$. احسب $P\'(t)$ و$P\'(0)$.', 'A population is $P(t)=200e^{0{,}03t}$. Work out $P\'(t)$ and $P\'(0)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$(e^{u})\'=e^{u}\\cdot u\'$, $u=0{,}03t$ izanik.', '$(e^{u})\'=e^{u}\\cdot u\'$ con $u=0{,}03t$.', '$(e^{u})\'=e^{u}\\cdot u\'$ مع $u=0{,}03t$.', '$(e^{u})\'=e^{u}\\cdot u\'$ with $u=0{,}03t$.'), math: same('$P\'(t)=200e^{0{,}03t}\\cdot 0{,}03$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$P\'(t)=6e^{0{,}03t}$') },
            { text: say('Hasieran, $t=0$: urtean 6 biztanle gehiago.', 'Al principio, $t=0$: 6 habitantes más al año.', 'في البداية $t=0$: ستة سكان إضافيين في السنة.', 'At the start, $t=0$: 6 more inhabitants a year.'), math: same('$P\'(0)=6e^{0}=6$') }
        ],
        takeaway: say('$(e^{u})\'=e^{u}\\cdot u\'$ eta $(a^{u})\'=a^{u}\\ln a\\cdot u\'$. Hazkunde esponentzialean, deribatua magnitudearen proportzionala da: zenbat eta handiagoa, orduan eta azkarrago hazten da.', '$(e^{u})\'=e^{u}\\cdot u\'$ y $(a^{u})\'=a^{u}\\ln a\\cdot u\'$. En el crecimiento exponencial, la derivada es proporcional a la magnitud: cuanto mayor es, más deprisa crece.', '$(e^{u})\'=e^{u}\\cdot u\'$ و$(a^{u})\'=a^{u}\\ln a\\cdot u\'$. في النمو الأسي تتناسب المشتقة مع المقدار: كلما كبر نما أسرع.', '$(e^{u})\'=e^{u}\\cdot u\'$ and $(a^{u})\'=a^{u}\\ln a\\cdot u\'$. In exponential growth, the derivative is proportional to the quantity: the larger it is, the faster it grows.'),
        figure: (language) => <ChainExpFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'chain-log',
        stage: 'chain',
        title: say('Funtzio logaritmikoak', 'Funciones logarítmicas', 'الدوال اللوغاريتمية', 'Logarithmic functions'),
        goal: say('$\\ln u$ motako funtzioak deribatzea: $\\frac{u\'}{u}$.', 'Derivar funciones como $\\ln u$: $\\frac{u\'}{u}$.', 'اشتقاق دوال مثل $\\ln u$: ‏$\\frac{u\'}{u}$.', 'Differentiate functions like $\\ln u$: $\\frac{u\'}{u}$.'),
        problem: say('Deribatu $f(x)=\\ln(x^2+4x)$ eta kalkulatu $f\'(1)$.', 'Deriva $f(x)=\\ln(x^2+4x)$ y calcula $f\'(1)$.', 'اشتق $f(x)=\\ln(x^2+4x)$ واحسب $f\'(1)$.', 'Differentiate $f(x)=\\ln(x^2+4x)$ and work out $f\'(1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$(\\ln u)\'=\\frac{u\'}{u}$, $u=x^2+4x$ izanik.', '$(\\ln u)\'=\\frac{u\'}{u}$ con $u=x^2+4x$.', '$(\\ln u)\'=\\frac{u\'}{u}$ مع $u=x^2+4x$.', '$(\\ln u)\'=\\frac{u\'}{u}$ with $u=x^2+4x$.'), math: same('$f\'(x)=\\frac{2x+4}{x^2+4x}$') },
            { text: say('Ordezkatu $x=1$.', 'Sustituye $x=1$.', 'عوّض $x=1$.', 'Substitute $x=1$.'), math: same('$f\'(1)=\\frac{2+4}{1+4}=\\frac{6}{5}$') }
        ],
        takeaway: say('$(\\ln u)\'=\\frac{u\'}{u}$: barrukoaren deribatua zati barrukoa. Bereziki, $(\\ln x)\'=\\frac{1}{x}$. Logaritmoaren propietateek askotan kalkulua errazten dute deribatu aurretik.', '$(\\ln u)\'=\\frac{u\'}{u}$: la derivada de dentro entre lo de dentro. En particular, $(\\ln x)\'=\\frac{1}{x}$. Las propiedades del logaritmo suelen simplificar antes de derivar.', '$(\\ln u)\'=\\frac{u\'}{u}$: مشتقة الداخل على الداخل. وبخاصة $(\\ln x)\'=\\frac{1}{x}$. وكثيرًا ما تبسّط خواص اللوغاريتم الحساب قبل الاشتقاق.', '$(\\ln u)\'=\\frac{u\'}{u}$: the derivative of the inside over the inside. In particular, $(\\ln x)\'=\\frac{1}{x}$. The properties of the logarithm often simplify before differentiating.'),
        figure: (language) => <ChainLogFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. In economy ---------- */
    {
        id: 'higher',
        stage: 'economy',
        title: say('Deribatu segidakoak', 'Derivadas sucesivas', 'المشتقات المتتالية', 'Higher derivatives'),
        goal: say('Bigarren eta hirugarren deribatuak kalkulatzea eta bigarrena hazkundearen erritmoaren aldaketa gisa ulertzea.', 'Calcular la segunda y la tercera derivada y entender la segunda como el cambio del ritmo de crecimiento.', 'حساب المشتقتين الثانية والثالثة وفهم الثانية على أنها تغيّر وتيرة النمو.', 'Work out the second and third derivatives and understand the second as the change in the rate of growth.'),
        problem: say('$V(t)=t^3-6t^2+20t$ salmentak badira, kalkulatu $V\'$, $V\'\'$ eta $V\'\'\'$, eta $V\'\'(1)$.', 'Si las ventas son $V(t)=t^3-6t^2+20t$, calcula $V\'$, $V\'\'$ y $V\'\'\'$, y $V\'\'(1)$.', 'إذا كانت المبيعات $V(t)=t^3-6t^2+20t$ فاحسب $V\'$ و$V\'\'$ و$V\'\'\'$ و$V\'\'(1)$.', 'If the sales are $V(t)=t^3-6t^2+20t$, work out $V\'$, $V\'\'$ and $V\'\'\'$, and $V\'\'(1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen deribatua.', 'La primera derivada.', 'المشتقة الأولى.', 'The first derivative.'), math: same('$V\'(t)=3t^2-12t+20$') },
            { text: say('Bigarrena eta hirugarrena.', 'La segunda y la tercera.', 'الثانية والثالثة.', 'The second and the third.'), math: same('$V\'\'(t)=6t-12\\qquad V\'\'\'(t)=6$') },
            { text: say('$V\'\'(1)=-6<0$: salmentak hazten dira, baina gero eta motelago.', '$V\'\'(1)=-6<0$: las ventas crecen, pero cada vez más despacio.', '$V\'\'(1)=-6<0$: تنمو المبيعات لكن ببطء متزايد.', '$V\'\'(1)=-6<0$: sales grow, but more and more slowly.'), math: same('$V\'\'(1)=6-12=-6$') }
        ],
        takeaway: say('$f\'\'$ funtzioa $f\'$ funtzioaren deribatua da: malda nola aldatzen den. $f\'\'>0$ bada, hazkundea bizkortzen da; $f\'\'<0$ bada, moteltzen da. Polinomio batean, deribatu bakoitzak maila bat jaisten du.', '$f\'\'$ es la derivada de $f\'$: cómo cambia la pendiente. Si $f\'\'>0$, el crecimiento se acelera; si $f\'\'<0$, se frena. En un polinomio, cada derivada baja un grado.', '$f\'\'$ هي مشتقة $f\'$: كيف يتغير الميل. إذا كان $f\'\'>0$ تسارع النمو، وإذا كان $f\'\'<0$ تباطأ. وفي الحدودية تُنزل كل مشتقة الدرجة واحدًا.', '$f\'\'$ is the derivative of $f\'$: how the slope changes. If $f\'\'>0$, growth speeds up; if $f\'\'<0$, it slows down. In a polynomial, each derivative lowers the degree by one.'),
        figure: (language) => <HigherFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'smooth-join',
        stage: 'economy',
        title: say('Parametrodun funtzio deribagarriak', 'Funciones derivables con parámetros', 'دوال قابلة للاشتقاق مع وسطاء', 'Differentiable functions with parameters'),
        goal: say('Bi parametro aurkitzea, zatika definitutako funtzio bat jarraitua eta deribagarria izan dadin.', 'Hallar dos parámetros para que una función a trozos sea continua y derivable.', 'إيجاد وسيطين لتكون دالة متعددة الأجزاء متصلة وقابلة للاشتقاق.', 'Find two parameters so that a piecewise function is continuous and differentiable.'),
        needs: [
            { unit: LIMITS2, topic: 'parameter', title: { eu: 'Parametrodun funtzio zatikatuak', es: 'Funciones a trozos con parámetros', en: 'Piecewise functions with parameters', ar: 'دوال متعددة الأجزاء مع وسطاء' } },
            { unit: DERIVATIVES1, topic: 'piecewise-derivable', title: { eu: 'Zatika definitutako funtzio deribagarriak', es: 'Funciones a trozos derivables', en: 'Differentiable piecewise functions', ar: 'دوال معرّفة على أجزاء قابلة للاشتقاق' } }
        ],
        problem: say('Aurkitu $a$ eta $b$, $f(x)=\\begin{cases}x^2+1 & x\\le 2\\\\ ax+b & x>2\\end{cases}$ deribagarria izan dadin.', 'Halla $a$ y $b$ para que $f(x)=\\begin{cases}x^2+1 & x\\le 2\\\\ ax+b & x>2\\end{cases}$ sea derivable.', 'أوجد $a$ و$b$ لتكون $f(x)=\\begin{cases}x^2+1 & x\\le 2\\\\ ax+b & x>2\\end{cases}$ قابلة للاشتقاق.', 'Find $a$ and $b$ so that $f(x)=\\begin{cases}x^2+1 & x\\le 2\\\\ ax+b & x>2\\end{cases}$ is differentiable.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jarraitua: bi zatiek balio bera.', 'Continua: los dos trozos valen lo mismo.', 'متصلة: للجزأين القيمة نفسها.', 'Continuous: both pieces give the same.'), math: same('$4+1=2a+b$') },
            { text: say('Deribagarria: malda bera.', 'Derivable: la misma pendiente.', 'قابلة للاشتقاق: الميل نفسه.', 'Differentiable: the same slope.'), math: same('$2\\cdot 2=a\\ \\to\\ a=4$') },
            { text: say('Ordezkatu lehenengoan.', 'Sustituye en la primera.', 'عوّض في الأولى.', 'Substitute in the first.'), math: same('$5=8+b\\ \\to\\ b=-3$') }
        ],
        takeaway: say('Zatika definitutako funtzio bat lotune batean deribagarria izateko, bi baldintza: ez jauzirik (balio bera) eta ez puntarik (malda bera). Bi ekuazio, bi parametro.', 'Para que una función a trozos sea derivable en una unión, dos condiciones: sin salto (el mismo valor) y sin pico (la misma pendiente). Dos ecuaciones, dos parámetros.', 'لتكون الدالة متعددة الأجزاء قابلة للاشتقاق عند نقطة التقاء يلزم شرطان: بلا قفزة (القيمة نفسها) وبلا زاوية (الميل نفسه). معادلتان لوسيطين.', 'For a piecewise function to be differentiable at a joint, two conditions: no jump (the same value) and no corner (the same slope). Two equations, two parameters.'),
        figure: (language) => <SmoothJoinFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'marginal',
        stage: 'economy',
        title: say('Hurrengo unitatearen kostua', 'Lo que cuesta la unidad siguiente', 'تكلفة الوحدة التالية', 'What the next unit costs'),
        goal: say('$C\'(x)$ deribatua $x+1$ unitatea egiteak gutxi gorabehera kostatzen duena bezala erabiltzea (kostu marjinala).', 'Usar la derivada $C\'(x)$ como lo que cuesta, más o menos, hacer la unidad $x+1$ (coste marginal).', 'استعمال المشتقة $C\'(x)$ على أنها تقريبًا تكلفة إنتاج الوحدة $x+1$ (التكلفة الحدية).', 'Use the derivative $C\'(x)$ as roughly what it costs to make unit $x+1$ (marginal cost).'),
        problem: say('$C(x)=0{,}5x^2+10x+200$ euro bada, zenbat kostatzen da gutxi gorabehera 21. unitatea? Alderatu zehatzarekin.', 'Si $C(x)=0{,}5x^2+10x+200$ euros, ¿cuánto cuesta aproximadamente la unidad 21? Compáralo con el valor exacto.', 'إذا كانت $C(x)=0{,}5x^2+10x+200$ يورو، فكم تكلّف تقريبًا الوحدة 21؟ قارن بالقيمة الدقيقة.', 'If $C(x)=0{,}5x^2+10x+200$ euros, roughly what does unit 21 cost? Compare it with the exact value.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatua $x=20$ puntuan.', 'La derivada en $x=20$.', 'المشتقة عند $x=20$.', 'The derivative at $x=20$.'), math: same('$C\'(x)=x+10\\ \\to\\ C\'(20)=30$') },
            { text: say('Zehatza: bi kostuen kenketa.', 'Exacto: la diferencia de los dos costes.', 'الدقيقة: فرق التكلفتين.', 'Exact: the difference of the two costs.'), math: same('$C(21)-C(20)=630{,}5-600=30{,}5$') },
            { text: say('Ia berdinak: 21. unitateak 30 euro inguru kostatzen du.', 'Casi iguales: la unidad 21 cuesta unos 30 €.', 'متقاربتان: تكلّف الوحدة 21 نحو 30 €.', 'Almost equal: unit 21 costs about €30.') }
        ],
        takeaway: say('$C\'(x)\\approx C(x+1)-C(x)$: deribatuak hurrengo unitatearen kostua ematen du gutxi gorabehera (kostu marjinala). Gauza bera diru-sarrerekin, $I\'(x)$, eta irabaziarekin, $B\'(x)$.', '$C\'(x)\\approx C(x+1)-C(x)$: la derivada da más o menos lo que cuesta la unidad siguiente (coste marginal). Lo mismo con los ingresos, $I\'(x)$, y el beneficio, $B\'(x)$.', '$C\'(x)\\approx C(x+1)-C(x)$: تعطي المشتقة تقريبًا تكلفة الوحدة التالية (التكلفة الحدية). وكذلك مع الإيراد $I\'(x)$ والربح $B\'(x)$.', '$C\'(x)\\approx C(x+1)-C(x)$: the derivative gives roughly what the next unit costs (marginal cost). The same with income, $I\'(x)$, and profit, $B\'(x)$.'),
        figure: (language) => <MarginalFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bach2gDerivativesTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bach2gDerivativesLessonTexts[topic.id as Bach2gDerivativesTopicId], ...bach2gDerivativesLessonChecks[topic.id as Bach2gDerivativesTopicId] }))
