import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { localizeNames, same, say } from '../batx1-zientziak-funtzioak/text'
import { AreaFunctionFigure, AreasReviewFigure, BarrowConditionsFigure, BarrowReviewFigure, DefiniteChangeFigure, DefinitePartsFigure, IntegralExtremaFigure, LimitSumsFigure, LowerUpperFigure, MeanValueFigure, ParameterFigure, PiecewiseFigure, RevolutionFigure, ThreeCurvesFigure, UpperLimitFigure } from './figures'
import { bach2DefiniteLessonChecks, type Bach2DefiniteTopicId } from './lessonChecks'
import { bach2DefiniteLessonTexts } from './lessonTexts'

/* ==========================================================================
   Integral mugatua · Batxilergoa 2 · Zientziak — stages and lessons. The
   scope follows unit 12 of Santillana 2.º Bachillerato Ciencias (the class
   book) and unit 12 of Anaya Matemáticas II: a short review of what 1.º
   already has (Barrow, the properties, signed areas and areas between two
   curves), then what is new in 2.º — lower and upper sums and the limit of
   sums, the mean value theorem, the integral function and the fundamental
   theorem (also with an upper limit g(x)), when Barrow's rule works,
   substitution and parts in a definite integral, piecewise functions and
   absolute values, regions bounded by three curves, parameter problems,
   the extrema of the integral function and, from Anaya only, volumes of
   revolution. The review links to Integralak of 1.º; substitution and
   parts link to Integral mugagabeak.
   ========================================================================== */

export type Bach2DefiniteStageId = 'review' | 'sums' | 'fundamental' | 'techniques' | 'problems'

export const bach2DefiniteStages: UnitStage[] = [
    { id: 'review', tone: 'blue', title: { eu: '1. mailako errepasoa', es: 'Repaso de 1.º', en: 'Review from 1.º', ar: 'مراجعة السنة الأولى' } },
    { id: 'sums', tone: 'violet', title: { eu: 'Baturak eta batez besteko balioa', es: 'Sumas y valor medio', en: 'Sums and mean value', ar: 'المجاميع والقيمة المتوسطة' } },
    { id: 'fundamental', tone: 'mustard', title: { eu: 'Oinarrizko teorema', es: 'Teorema fundamental', en: 'The fundamental theorem', ar: 'المبرهنة الأساسية' } },
    { id: 'techniques', tone: 'coral', title: { eu: 'Integral mugatuak kalkulatzea', es: 'Calcular integrales definidas', en: 'Working out definite integrals', ar: 'حساب التكاملات المحددة' } },
    { id: 'problems', tone: 'green', title: { eu: 'Barrutiak eta problemak', es: 'Recintos y problemas', en: 'Regions and problems', ar: 'المناطق والمسائل' } }
]


/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Review from 1.º ---------- */
    {
        id: 'barrow-review',
        stage: 'review',
        title: say('Barrow eta propietateak', 'Barrow y propiedades', 'بارو والخصائص', 'Barrow and the properties'),
        goal: say('1. mailako Barrow-ren erregela eta propietateak gogoratzea: integralak baturak banatzen ditu, zeinua aldatzen du mugak alderantzikatzean, eta puntu batean zatitu daiteke.', 'Recordar la regla de Barrow y las propiedades de 1.º: la integral reparte las sumas, cambia de signo al invertir los límites y se parte en un punto.', 'تذكّر قاعدة بارو وخصائص السنة الأولى: التكامل يوزّع المجاميع، ويغيّر إشارته عند قلب الحدّين، ويُقسم عند نقطة.', 'Remember Barrow\'s rule and the properties from 1.º: the integral splits sums, changes sign when the limits are swapped and can be split at a point.'),
        needs: [
            { unit: 'batx1-zientziak/integrales', topic: 'barrow', title: { eu: 'Barrow-ren erregela', es: 'Regla de Barrow', en: 'Barrow\'s rule', ar: 'قاعدة بارو' } },
            { unit: 'batx1-zientziak/integrales', topic: 'properties', title: { eu: 'Integral mugatuaren propietateak', es: 'Propiedades de la integral definida', en: 'Properties of the definite integral', ar: 'خصائص التكامل المحدد' } }
        ],
        problem: say('Kalkulatu $\\int_1^3(3x^2-2x)\\,dx$.', 'Calcula $\\int_1^3(3x^2-2x)\\,dx$.', 'احسب $\\int_1^3(3x^2-2x)\\,dx$.', 'Work out $\\int_1^3(3x^2-2x)\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jatorrizko bat.', 'Una primitiva.', 'دالة أصلية.', 'An antiderivative.'), math: same('$F(x)=x^3-x^2$') },
            { text: say('Goiko muga ken behekoa.', 'El límite de arriba menos el de abajo.', 'الحد الأعلى ناقص الأدنى.', 'The top limit minus the bottom one.'), math: same('$F(3)-F(1)=18-0=18$') }
        ],
        takeaway: say('$\\int_a^b f(x)\\,dx=F(b)-F(a)$. Gainera, $\\int_b^a f(x)\\,dx=-\\int_a^b f(x)\\,dx$ eta $\\int_a^c f(x)\\,dx=\\int_a^b f(x)\\,dx+\\int_b^c f(x)\\,dx$.', '$\\int_a^b f(x)\\,dx=F(b)-F(a)$. Además, $\\int_b^a f(x)\\,dx=-\\int_a^b f(x)\\,dx$ y $\\int_a^c f(x)\\,dx=\\int_a^b f(x)\\,dx+\\int_b^c f(x)\\,dx$.', '$\\int_a^b f(x)\\,dx=F(b)-F(a)$. كما أن $\\int_b^a f(x)\\,dx=-\\int_a^b f(x)\\,dx$ و$\\int_a^c f(x)\\,dx=\\int_a^b f(x)\\,dx+\\int_b^c f(x)\\,dx$.', '$\\int_a^b f(x)\\,dx=F(b)-F(a)$. Also, $\\int_b^a f(x)\\,dx=-\\int_a^b f(x)\\,dx$ and $\\int_a^c f(x)\\,dx=\\int_a^b f(x)\\,dx+\\int_b^c f(x)\\,dx$.'),
        figure: (language) => <BarrowReviewFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'areas-review',
        stage: 'review',
        title: say('Zeinudun azalerak eta kurben artekoak', 'Áreas con signo y entre curvas', 'المساحات ذات الإشارة وبين المنحنيات', 'Signed areas and areas between curves'),
        goal: say('Gogoratzea integralak negatibo gisa zenbatzen duela ardatzaren azpian dagoena, eta bi kurben artean goikoa ken behekoa integratzen dela.', 'Recordar que la integral cuenta en negativo lo que queda bajo el eje, y que entre dos curvas se integra la de arriba menos la de abajo.', 'تذكّر أن التكامل يحسب ما تحت المحور بالسالب، وأننا بين منحنيين نكامل الأعلى ناقص الأدنى.', 'Remember that the integral counts what is below the axis as negative, and that between two curves you integrate the top one minus the bottom one.'),
        needs: [
            { unit: 'batx1-zientziak/integrales', topic: 'area-sign', title: { eu: 'Ardatza mozten duten kurbak', es: 'Curvas que cortan el eje', en: 'Curves that cross the axis', ar: 'منحنيات تقطع المحور' } },
            { unit: 'batx1-zientziak/integrales', topic: 'between-curves', title: { eu: 'Bi kurben arteko azalera', es: 'Área entre dos curvas', en: 'Area between two curves', ar: 'المساحة بين منحنيين' } }
        ],
        problem: say('Aurkitu $f(x)=x^2-4$ kurbaren eta X ardatzaren arteko azalera $[0,\\,3]$ tartean.', 'Halla el área entre $f(x)=x^2-4$ y el eje X en $[0,\\,3]$.', 'أوجد المساحة بين $f(x)=x^2-4$ ومحور X في $[0,\\,3]$.', 'Find the area between $f(x)=x^2-4$ and the x-axis on $[0,\\,3]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebaki-puntua $x=2$ da: ardatzaren azpian $(0,\\,2)$ tartean, eta gainean $(2,\\,3)$ tartean.', 'Corte en $x=2$: debajo del eje en $(0,\\,2)$ y encima en $(2,\\,3)$.', 'تقاطع عند $x=2$: تحت المحور في $(0,\\,2)$ وفوقه في $(2,\\,3)$.', 'A crossing at $x=2$: below the axis on $(0,\\,2)$ and above on $(2,\\,3)$.') },
            { text: say('Bi integralak.', 'Las dos integrales.', 'التكاملان.', 'The two integrals.'), math: same('$\\begin{aligned}&\\int_0^2(x^2-4)\\,dx=-\\frac{16}{3}\\\\ &\\int_2^3(x^2-4)\\,dx=\\frac{7}{3}\\end{aligned}$') },
            { text: say('Azalera: balio absolutuak batuta.', 'El área: se suman los valores absolutos.', 'المساحة: نجمع القيم المطلقة.', 'The area: add the absolute values.'), math: same('$\\frac{16}{3}+\\frac{7}{3}=\\frac{23}{3}$') }
        ],
        takeaway: say('Lehenik ebaki-puntuak; ardatzaren azpiko zatiak balio absolutuan batzen dira. Bi kurben artean, $\\int_a^b(f-g)\\,dx$, $f$ goikoa izanik.', 'Primero los cortes; las partes bajo el eje se suman en valor absoluto. Entre dos curvas, $\\int_a^b(f-g)\\,dx$, con $f$ la de arriba.', 'أولًا نقاط التقاطع؛ ونجمع الأجزاء التي تحت المحور بالقيمة المطلقة. وبين منحنيين $\\int_a^b(f-g)\\,dx$ حيث $f$ الأعلى.', 'First the crossings; the parts below the axis are added as absolute values. Between two curves, $\\int_a^b(f-g)\\,dx$, with $f$ the top one.'),
        figure: (language) => <AreasReviewFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Sums and mean value ---------- */
    {
        id: 'lower-upper',
        stage: 'sums',
        title: say('Behe-batura eta goi-batura', 'Sumas inferior y superior', 'المجموع الأدنى والمجموع الأعلى', 'Lower and upper sums'),
        goal: say('Azalera bi baturaren artean ixtea: zati bakoitzean $f$ funtzioaren altuera minimoarekin (behe-batura, $s$) eta maximoarekin (goi-batura, $S$).', 'Encerrar el área entre dos sumas: en cada tramo, con la altura mínima de $f$ (suma inferior, $s$) y con la máxima (suma superior, $S$).', 'حصر المساحة بين مجموعين: في كل جزء نأخذ أصغر ارتفاع لـ $f$ (المجموع الأدنى $s$) وأكبره (المجموع الأعلى $S$).', 'Trap the area between two sums: on each piece, with the minimum height of $f$ (lower sum, $s$) and with the maximum one (upper sum, $S$).'),
        needs: [
            { unit: 'batx1-zientziak/integrales', topic: 'rectangles', title: { eu: 'Azalera laukizuzenekin', es: 'Área con rectángulos', en: 'Area with rectangles', ar: 'المساحة بالمستطيلات' } }
        ],
        problem: say('$\\{0,\\,1,\\,2\\}$ zatiketarekin, aurkitu $s$ eta $S$, $f(x)=x^2+1$ funtzioarentzat $[0,\\,2]$ tartean.', 'Con la partición $\\{0,\\,1,\\,2\\}$, halla $s$ y $S$ para $f(x)=x^2+1$ en $[0,\\,2]$.', 'باستعمال التجزئة $\\{0,\\,1,\\,2\\}$ أوجد $s$ و$S$ لـ $f(x)=x^2+1$ في $[0,\\,2]$.', 'With the partition $\\{0,\\,1,\\,2\\}$, find $s$ and $S$ for $f(x)=x^2+1$ on $[0,\\,2]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f$ gorakorra da: zati bakoitzeko minimoa ezkerrean dago, eta maximoa eskuinean.', '$f$ crece: el mínimo de cada tramo está a la izquierda y el máximo, a la derecha.', '$f$ متزايدة: أصغر قيمة في كل جزء عند اليسار وأكبرها عند اليمين.', '$f$ increases: the minimum of each piece is on the left and the maximum on the right.'), math: same('$\\begin{aligned}&m_1=1\\qquad m_2=2\\\\ &M_1=2\\qquad M_2=5\\end{aligned}$') },
            { text: say('Bi baturak, 1 oinarriarekin.', 'Las dos sumas, con base 1.', 'المجموعان بقاعدة 1.', 'The two sums, with base 1.'), math: same('$\\begin{aligned}&s=1\\cdot 1+1\\cdot 2=3\\\\ &S=1\\cdot 2+1\\cdot 5=7\\end{aligned}$') },
            { text: say('Azalera bien artean dago: $3\\le A\\le 7$. Egiaz, $A=\\frac{14}{3}$.', 'El área está entre las dos: $3\\le A\\le 7$. De hecho, $A=\\frac{14}{3}$.', 'المساحة بينهما: $3\\le A\\le 7$. وفي الواقع $A=\\frac{14}{3}$.', 'The area lies between the two: $3\\le A\\le 7$. In fact, $A=\\frac{14}{3}$.') }
        ],
        takeaway: say('$s=\\sum m_i\\,\\Delta x_i\\le\\int_a^b f(x)\\,dx\\le S=\\sum M_i\\,\\Delta x_i$. Zatiketa finagoarekin, $s$ igo egiten da eta $S$ jaitsi.', '$s=\\sum m_i\\,\\Delta x_i\\le\\int_a^b f(x)\\,dx\\le S=\\sum M_i\\,\\Delta x_i$. Con una partición más fina, $s$ sube y $S$ baja.', '$s=\\sum m_i\\,\\Delta x_i\\le\\int_a^b f(x)\\,dx\\le S=\\sum M_i\\,\\Delta x_i$. ومع تجزئة أدق يرتفع $s$ وينخفض $S$.', '$s=\\sum m_i\\,\\Delta x_i\\le\\int_a^b f(x)\\,dx\\le S=\\sum M_i\\,\\Delta x_i$. With a finer partition, $s$ goes up and $S$ goes down.'),
        figure: (language) => <LowerUpperFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'limit-sums',
        stage: 'sums',
        title: say('Integrala limite gisa', 'La integral como límite', 'التكامل بوصفه نهاية', 'The integral as a limit'),
        goal: say('$[a,b]$ tartea $n$ zati berdinetan zatitzean, $s_n$ eta $S_n$ zenbaki berera hurbiltzen direla ikustea: integral mugatua. $\\sum i$ eta $\\sum i^2$ erabiliz kalkulatzen da limitea.', 'Ver que, al partir $[a,b]$ en $n$ tramos iguales, $s_n$ y $S_n$ tienden al mismo número: la integral definida. El límite se calcula con $\\sum i$ y $\\sum i^2$.', 'رؤية أن $s_n$ و$S_n$ يقتربان من العدد نفسه عند تقسيم $[a,b]$ إلى $n$ أجزاء متساوية: إنه التكامل المحدد. ونحسب النهاية بـ $\\sum i$ و$\\sum i^2$.', 'See that, when $[a,b]$ is split into $n$ equal pieces, $s_n$ and $S_n$ approach the same number: the definite integral. The limit is worked out with $\\sum i$ and $\\sum i^2$.'),
        problem: say('Kalkulatu $\\int_0^1 x^2\\,dx$, $n$ zatiko goi-baturen limite gisa.', 'Calcula $\\int_0^1 x^2\\,dx$ como límite de sumas superiores con $n$ tramos.', 'احسب $\\int_0^1 x^2\\,dx$ بوصفه نهاية مجاميع عليا بـ $n$ أجزاء.', 'Work out $\\int_0^1 x^2\\,dx$ as the limit of upper sums with $n$ pieces.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatien oinarria $\\frac{1}{n}$ da, eta altuera $f\\left(\\frac{i}{n}\\right)=\\frac{i^2}{n^2}$.', 'Tramos de base $\\frac{1}{n}$ y altura $f\\left(\\frac{i}{n}\\right)=\\frac{i^2}{n^2}$.', 'أجزاء قاعدتها $\\frac{1}{n}$ وارتفاعها $f\\left(\\frac{i}{n}\\right)=\\frac{i^2}{n^2}$.', 'Pieces of base $\\frac{1}{n}$ and height $f\\left(\\frac{i}{n}\\right)=\\frac{i^2}{n^2}$.'), math: same('$S_n=\\frac{1}{n^3}\\sum_{i=1}^{n}i^2$') },
            { text: say('$\\sum i^2=\\frac{n(n+1)(2n+1)}{6}$ erabiliz:', 'Con $\\sum i^2=\\frac{n(n+1)(2n+1)}{6}$:', 'باستعمال $\\sum i^2=\\frac{n(n+1)(2n+1)}{6}$:', 'With $\\sum i^2=\\frac{n(n+1)(2n+1)}{6}$:'), math: same('$S_n=\\frac{(n+1)(2n+1)}{6n^2}$') },
            { text: say('Limitea.', 'El límite.', 'النهاية.', 'The limit.'), math: same('$\\lim_{n\\to\\infty}S_n=\\frac{2}{6}=\\frac{1}{3}$') }
        ],
        takeaway: say('$\\int_a^b f(x)\\,dx=\\lim_{n\\to\\infty}s_n=\\lim_{n\\to\\infty}S_n$, bi limiteak berdinak direnean: orduan $f$ integragarria da. $[a,b]$ tartean jarraitua den funtzio oro integragarria da.', '$\\int_a^b f(x)\\,dx=\\lim_{n\\to\\infty}s_n=\\lim_{n\\to\\infty}S_n$ cuando los dos límites coinciden: entonces $f$ es integrable. Toda función continua en $[a,b]$ lo es.', '$\\int_a^b f(x)\\,dx=\\lim_{n\\to\\infty}s_n=\\lim_{n\\to\\infty}S_n$ عندما تتساوى النهايتان: عندئذ تكون $f$ قابلة للتكامل. وكل دالة متصلة في $[a,b]$ كذلك.', '$\\int_a^b f(x)\\,dx=\\lim_{n\\to\\infty}s_n=\\lim_{n\\to\\infty}S_n$ when the two limits agree: then $f$ is integrable. Every function continuous on $[a,b]$ is.'),
        figure: (language) => <LimitSumsFigure language={language} />
    },
    {
        id: 'mean-value',
        stage: 'sums',
        title: say('Batez besteko balioaren teorema', 'El teorema del valor medio', 'مبرهنة القيمة المتوسطة', 'The mean value theorem'),
        goal: say('$f$ jarraitua bada $[a,b]$ tartean, $[a,b]$ tarteko $c$ bat dagoela ikustea, $\\int_a^b f(x)\\,dx=f(c)(b-a)$ betetzen duena: azalera bereko laukizuzen bat.', 'Si $f$ es continua en $[a,b]$, hay un $c$ en $[a,b]$ con $\\int_a^b f(x)\\,dx=f(c)(b-a)$: un rectángulo con la misma área.', 'إذا كانت $f$ متصلة في $[a,b]$ يوجد $c$ في $[a,b]$ يحقق $\\int_a^b f(x)\\,dx=f(c)(b-a)$: مستطيل له المساحة نفسها.', 'If $f$ is continuous on $[a,b]$, there is a $c$ in $[a,b]$ with $\\int_a^b f(x)\\,dx=f(c)(b-a)$: a rectangle with the same area.'),
        problem: say('Aurkitu batez besteko balioaren teoremaren $c$, $f(x)=x^2$ funtzioarentzat $[0,\\,3]$ tartean.', 'Halla el $c$ del teorema del valor medio para $f(x)=x^2$ en $[0,\\,3]$.', 'أوجد $c$ مبرهنة القيمة المتوسطة لـ $f(x)=x^2$ في $[0,\\,3]$.', 'Find the $c$ of the mean value theorem for $f(x)=x^2$ on $[0,\\,3]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Integrala.', 'La integral.', 'التكامل.', 'The integral.'), math: same('$\\int_0^3 x^2\\,dx=9$') },
            { text: say('3 oinarriko laukizuzena: $f(c)\\cdot 3=9$.', 'Rectángulo de base 3: $f(c)\\cdot 3=9$.', 'مستطيل قاعدته 3: $f(c)\\cdot 3=9$.', 'A rectangle of base 3: $f(c)\\cdot 3=9$.'), math: same('$c^2=3\\ \\to\\ c=\\sqrt{3}$') },
            { text: say('$\\sqrt{3}\\approx 1{,}73$ zenbakia $[0,\\,3]$ tartean dago.', '$\\sqrt{3}\\approx 1{,}73$ está en $[0,\\,3]$.', '$\\sqrt{3}\\approx 1{,}73$ يقع في $[0,\\,3]$.', '$\\sqrt{3}\\approx 1{,}73$ is in $[0,\\,3]$.') }
        ],
        takeaway: say('$\\int_a^b f(x)\\,dx=f(c)\\,(b-a)$, $c$ zenbakia $[a,b]$ tartean dagoela. $f(c)=\\frac{1}{b-a}\\int_a^b f(x)\\,dx$ zenbakia $f$ funtzioaren batez besteko balioa da tartean.', '$\\int_a^b f(x)\\,dx=f(c)\\,(b-a)$, con $c$ en $[a,b]$. El número $f(c)=\\frac{1}{b-a}\\int_a^b f(x)\\,dx$ es el valor medio de $f$ en el intervalo.', '$\\int_a^b f(x)\\,dx=f(c)\\,(b-a)$ حيث $c$ في $[a,b]$. والعدد $f(c)=\\frac{1}{b-a}\\int_a^b f(x)\\,dx$ هو القيمة المتوسطة لـ $f$ في الفترة.', '$\\int_a^b f(x)\\,dx=f(c)\\,(b-a)$, with $c$ in $[a,b]$. The number $f(c)=\\frac{1}{b-a}\\int_a^b f(x)\\,dx$ is the mean value of $f$ on the interval.'),
        figure: (language) => <MeanValueFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. The fundamental theorem ---------- */
    {
        id: 'area-function',
        stage: 'fundamental',
        title: say('Funtzio integrala', 'La función integral', 'الدالة التكاملية', 'The integral function'),
        goal: say('$F(x)=\\int_a^x f(t)\\,dt$ funtzioa $a$ puntutik pilatutako azalera gisa ikustea, eta haren deribatua $f$ dela: $F\'(x)=f(x)$.', 'Ver $F(x)=\\int_a^x f(t)\\,dt$ como el área acumulada desde $a$, y que su derivada es $f$: $F\'(x)=f(x)$.', 'رؤية $F(x)=\\int_a^x f(t)\\,dt$ بوصفها المساحة المتراكمة من $a$، وأن مشتقتها $f$: $F\'(x)=f(x)$.', 'See $F(x)=\\int_a^x f(t)\\,dt$ as the area piled up from $a$, and that its derivative is $f$: $F\'(x)=f(x)$.'),
        problem: say('Aurkitu $F(x)=\\int_0^x(2t+1)\\,dt$, eta egiaztatu $F\'(x)=2x+1$ dela.', 'Halla $F(x)=\\int_0^x(2t+1)\\,dt$ y comprueba que $F\'(x)=2x+1$.', 'أوجد $F(x)=\\int_0^x(2t+1)\\,dt$ وتحقق من أن $F\'(x)=2x+1$.', 'Find $F(x)=\\int_0^x(2t+1)\\,dt$ and check that $F\'(x)=2x+1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrow, goiko muga $x$ dela.', 'Barrow con el límite de arriba $x$.', 'بارو مع الحد الأعلى $x$.', 'Barrow with $x$ as the top limit.'), math: same('$F(x)=\\left[t^2+t\\right]_0^x=x^2+x$') },
            { text: say('Deribatu.', 'Deriva.', 'اشتق.', 'Differentiate.'), math: same('$F\'(x)=2x+1$') },
            { text: say('Barruko funtzioa da, $t$ letraren ordez $x$ duela.', 'Es la función de dentro, con $x$ en lugar de $t$.', 'إنها الدالة التي في الداخل مع $x$ بدل $t$.', 'It is the function inside, with $x$ instead of $t$.') }
        ],
        takeaway: say('Oinarrizko teorema: $f$ jarraitua bada, $F(x)=\\int_a^x f(t)\\,dt$ deribagarria da, eta $F\'(x)=f(x)$. Horregatik $F$ funtzioa $f$ funtzioaren jatorrizkoa da, eta Barrow-ren erregelak balio du.', 'Teorema fundamental: si $f$ es continua, $F(x)=\\int_a^x f(t)\\,dt$ es derivable y $F\'(x)=f(x)$. Por eso $F$ es una primitiva de $f$ y funciona la regla de Barrow.', 'المبرهنة الأساسية: إذا كانت $f$ متصلة فإن $F(x)=\\int_a^x f(t)\\,dt$ قابلة للاشتقاق و$F\'(x)=f(x)$. لذلك $F$ أصلية لـ $f$ وتصح قاعدة بارو.', 'Fundamental theorem: if $f$ is continuous, $F(x)=\\int_a^x f(t)\\,dt$ is differentiable and $F\'(x)=f(x)$. That is why $F$ is an antiderivative of $f$ and Barrow\'s rule works.'),
        figure: (language) => <AreaFunctionFigure language={language} />
    },
    {
        id: 'upper-limit',
        stage: 'fundamental',
        title: say('Funtzio bat den muga', 'Un límite que es una función', 'حدّ هو دالة', 'A limit that is a function'),
        goal: say('$F(x)=\\int_a^{g(x)} f(t)\\,dt$ katearen erregelarekin deribatzea: $F\'(x)=f(g(x))\\cdot g\'(x)$.', 'Derivar $F(x)=\\int_a^{g(x)} f(t)\\,dt$ con la regla de la cadena: $F\'(x)=f(g(x))\\cdot g\'(x)$.', 'اشتقاق $F(x)=\\int_a^{g(x)} f(t)\\,dt$ بقاعدة السلسلة: $F\'(x)=f(g(x))\\cdot g\'(x)$.', 'Differentiate $F(x)=\\int_a^{g(x)} f(t)\\,dt$ with the chain rule: $F\'(x)=f(g(x))\\cdot g\'(x)$.'),
        needs: [
            { unit: 'batx1-zientziak/derivadas', topic: 'chain', title: { eu: 'Katearen erregela', es: 'La regla de la cadena', en: 'The chain rule', ar: 'قاعدة السلسلة' } }
        ],
        problem: say('Deribatu $F(x)=\\int_1^{x^2}\\frac{dt}{t}$.', 'Deriva $F(x)=\\int_1^{x^2}\\frac{dt}{t}$.', 'اشتق $F(x)=\\int_1^{x^2}\\frac{dt}{t}$.', 'Differentiate $F(x)=\\int_1^{x^2}\\frac{dt}{t}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barruko funtzioa, mugan: $\\frac{1}{t}$, $t=x^2$ dela.', 'La función de dentro, en el límite: $\\frac{1}{t}$ con $t=x^2$.', 'الدالة التي في الداخل عند الحد: $\\frac{1}{t}$ مع $t=x^2$.', 'The function inside, at the limit: $\\frac{1}{t}$ with $t=x^2$.'), math: same('$\\frac{1}{x^2}$') },
            { text: say('Biderkatu mugaren deribatuaz, $g\'(x)=2x$.', 'Multiplica por la derivada del límite, $g\'(x)=2x$.', 'اضرب في مشتقة الحد $g\'(x)=2x$.', 'Multiply by the derivative of the limit, $g\'(x)=2x$.'), math: same('$F\'(x)=\\frac{1}{x^2}\\cdot 2x=\\frac{2}{x}$') },
            { text: say('Egiaztatu: $F(x)=\\ln x^2=2\\ln x$, eta haren deribatua $\\frac{2}{x}$ da.', 'Comprueba: $F(x)=\\ln x^2=2\\ln x$, cuya derivada es $\\frac{2}{x}$.', 'تحقق: $F(x)=\\ln x^2=2\\ln x$ ومشتقتها $\\frac{2}{x}$.', 'Check: $F(x)=\\ln x^2=2\\ln x$, whose derivative is $\\frac{2}{x}$.') }
        ],
        takeaway: say('$\\left(\\int_a^{g(x)} f(t)\\,dt\\right)\'=f(g(x))\\cdot g\'(x)$. Bi mugak funtzioak badira: $\\left(\\int_{h(x)}^{g(x)} f(t)\\,dt\\right)\'=f(g)\\,g\'-f(h)\\,h\'$.', '$\\left(\\int_a^{g(x)} f(t)\\,dt\\right)\'=f(g(x))\\cdot g\'(x)$. Si los dos límites son funciones: $\\left(\\int_{h(x)}^{g(x)} f(t)\\,dt\\right)\'=f(g)\\,g\'-f(h)\\,h\'$.', '$\\left(\\int_a^{g(x)} f(t)\\,dt\\right)\'=f(g(x))\\cdot g\'(x)$. وإذا كان الحدّان دالتين: $\\left(\\int_{h(x)}^{g(x)} f(t)\\,dt\\right)\'=f(g)\\,g\'-f(h)\\,h\'$.', '$\\left(\\int_a^{g(x)} f(t)\\,dt\\right)\'=f(g(x))\\cdot g\'(x)$. If both limits are functions: $\\left(\\int_{h(x)}^{g(x)} f(t)\\,dt\\right)\'=f(g)\\,g\'-f(h)\\,h\'$.'),
        figure: (language) => <UpperLimitFigure language={language} />
    },
    {
        id: 'barrow-conditions',
        stage: 'fundamental',
        title: say('Noiz balio du Barrow-k', 'Cuándo vale Barrow', 'متى تصح قاعدة بارو', 'When Barrow\'s rule works'),
        goal: say('Barrow aplikatzea $f$ funtzioa $[a,b]$ tarte osoan jarraitua denean bakarrik: tartearen barruko asintota batek eragozten du.', 'Aplicar Barrow solo si $f$ es continua en todo $[a,b]$: una asíntota dentro del intervalo lo impide.', 'تطبيق بارو فقط إذا كانت $f$ متصلة في كل $[a,b]$: المقارب داخل الفترة يمنع ذلك.', 'Apply Barrow only if $f$ is continuous on the whole of $[a,b]$: an asymptote inside the interval rules it out.'),
        problem: say('$\\int_{-1}^{1}\\frac{dx}{x^2}$ Barrow-rekin kalkula daiteke?', '¿Se puede calcular $\\int_{-1}^{1}\\frac{dx}{x^2}$ con Barrow?', 'هل يمكن حساب $\\int_{-1}^{1}\\frac{dx}{x^2}$ ببارو؟', 'Can $\\int_{-1}^{1}\\frac{dx}{x^2}$ be worked out with Barrow?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrow itsu-itsuan aplikatzeak zenbaki negatibo bat emango luke.', 'Barrow «a ciegas» daría un número negativo.', 'تطبيق بارو دون انتباه يعطي عددًا سالبًا.', 'Barrow applied blindly would give a negative number.'), math: same('$\\left[-\\frac{1}{x}\\right]_{-1}^{1}=-1-1=-2$') },
            { text: say('Baina $\\frac{1}{x^2}>0$: azalera ezin da negatiboa izan. Asintota bat dago $x=0$ puntuan, $[-1,\\,1]$ tartearen barruan.', 'Pero $\\frac{1}{x^2}>0$: el área no puede ser negativa. Hay una asíntota en $x=0$, dentro de $[-1,\\,1]$.', 'لكن $\\frac{1}{x^2}>0$: لا يمكن أن تكون المساحة سالبة. يوجد مقارب عند $x=0$ داخل $[-1,\\,1]$.', 'But $\\frac{1}{x^2}>0$: the area cannot be negative. There is an asymptote at $x=0$, inside $[-1,\\,1]$.') },
            { text: say('Ez du balio: $f$ ez da jarraitua tartean, eta integrala ez da zenbaki finitu bat.', 'No vale: $f$ no es continua en el intervalo, y la integral no es un número finito.', 'لا تصح: $f$ ليست متصلة في الفترة، والتكامل ليس عددًا منتهيًا.', 'It does not work: $f$ is not continuous on the interval, and the integral is not a finite number.') }
        ],
        takeaway: say('Barrow-k $f$ jarraitua eskatzen du $[a,b]$ tartean. Kalkulatu aurretik, begiratu $f$ funtzioak asintotarik edo jauzirik duen tartearen barruan; jauziak badaude, bertan zatitzen da.', 'Barrow exige $f$ continua en $[a,b]$. Antes de calcular, mira si $f$ tiene asíntotas o saltos dentro del intervalo; si hay saltos, se parte en ellos.', 'تشترط قاعدة بارو أن تكون $f$ متصلة في $[a,b]$. قبل الحساب انظر هل لـ $f$ مقاربات أو قفزات داخل الفترة؛ وإذا كانت قفزات نقسم عندها.', 'Barrow needs $f$ continuous on $[a,b]$. Before working it out, see whether $f$ has asymptotes or jumps inside the interval; if there are jumps, split at them.'),
        figure: (language) => <BarrowConditionsFigure language={language} />
    },

    /* ---------- 4. Working out definite integrals ---------- */
    {
        id: 'definite-change',
        stage: 'techniques',
        title: say('Aldagai-aldaketa eta mugak', 'Cambio de variable y límites', 'تغيير المتغير والحدود', 'Substitution and limits'),
        goal: say('Integral mugatu batean $t=g(x)$ aldaketa egitean mugak ere aldatzea: $x=a$ bada $t=g(a)$, eta $x=b$ bada $t=g(b)$. Horrela ez da aldaketa desegin behar.', 'Al hacer $t=g(x)$ en una integral definida, cambiar también los límites: $x=a\\to t=g(a)$ y $x=b\\to t=g(b)$. Así no hace falta deshacer el cambio.', 'عند التعويض $t=g(x)$ في تكامل محدد نغيّر الحدود أيضًا: $x=a\\to t=g(a)$ و$x=b\\to t=g(b)$. وبذلك لا حاجة إلى التراجع عن التعويض.', 'When you substitute $t=g(x)$ in a definite integral, change the limits too: $x=a\\to t=g(a)$ and $x=b\\to t=g(b)$. Then there is no need to undo the change.'),
        needs: [
            { unit: 'batx2-zientziak/integrales-indefinidas', topic: 'change', title: { eu: 'Aldaketaren metodoa', es: 'El método del cambio', en: 'The substitution method', ar: 'طريقة تغيير المتغير' } }
        ],
        problem: say('Kalkulatu $\\int_0^2 2x\\,e^{x^2}\\,dx$.', 'Calcula $\\int_0^2 2x\\,e^{x^2}\\,dx$.', 'احسب $\\int_0^2 2x\\,e^{x^2}\\,dx$.', 'Work out $\\int_0^2 2x\\,e^{x^2}\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$t=x^2$ eta $dt=2x\\,dx$; mugak:', '$t=x^2$ y $dt=2x\\,dx$; los límites:', '$t=x^2$ و$dt=2x\\,dx$؛ والحدود:', '$t=x^2$ and $dt=2x\\,dx$; the limits:'), math: same('$\\begin{aligned}&x=0\\ \\to\\ t=0\\\\ &x=2\\ \\to\\ t=4\\end{aligned}$') },
            { text: say('Dena $t$ letraz, muga berriekin.', 'Todo en $t$, con los límites nuevos.', 'كل شيء بـ $t$ مع الحدود الجديدة.', 'Everything in $t$, with the new limits.'), math: same('$\\int_0^4 e^t\\,dt=\\left[e^t\\right]_0^4$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$e^4-1$') }
        ],
        takeaway: say('$\\int_a^b f(g(x))\\,g\'(x)\\,dx=\\int_{g(a)}^{g(b)} f(t)\\,dt$. Edo mugak aldatzen dira eta ez da $x$ aldagaira itzultzen, edo aldaketa desegiten da eta $x$ aldagaiaren mugak erabiltzen dira: inoiz ez nahastu.', '$\\int_a^b f(g(x))\\,g\'(x)\\,dx=\\int_{g(a)}^{g(b)} f(t)\\,dt$. O se cambian los límites y no se vuelve a $x$, o se deshace el cambio y se usan los de $x$: nunca se mezclan.', '$\\int_a^b f(g(x))\\,g\'(x)\\,dx=\\int_{g(a)}^{g(b)} f(t)\\,dt$. إما أن نغيّر الحدود ولا نعود إلى $x$، وإما أن نتراجع عن التعويض ونستعمل حدود $x$: لا نخلط أبدًا.', '$\\int_a^b f(g(x))\\,g\'(x)\\,dx=\\int_{g(a)}^{g(b)} f(t)\\,dt$. Either change the limits and do not go back to $x$, or undo the change and use the limits of $x$: never mix them.'),
        figure: (language) => <DefiniteChangeFigure language={language} />
    },
    {
        id: 'definite-parts',
        stage: 'techniques',
        title: say('Zatikakoa integral mugatu batean', 'Partes en una integral definida', 'التجزئة في تكامل محدد', 'By parts in a definite integral'),
        goal: say('$\\int_a^b u\\,dv=\\left[uv\\right]_a^b-\\int_a^b v\\,du$ aplikatzea: $uv$ zatia ere $a$ eta $b$ artean kalkulatzen da.', 'Aplicar $\\int_a^b u\\,dv=\\left[uv\\right]_a^b-\\int_a^b v\\,du$: la parte $uv$ también se calcula entre $a$ y $b$.', 'تطبيق $\\int_a^b u\\,dv=\\left[uv\\right]_a^b-\\int_a^b v\\,du$: الجزء $uv$ أيضًا يُحسب بين $a$ و$b$.', 'Apply $\\int_a^b u\\,dv=\\left[uv\\right]_a^b-\\int_a^b v\\,du$: the part $uv$ is also worked out between $a$ and $b$.'),
        needs: [
            { unit: 'batx2-zientziak/integrales-indefinidas', topic: 'by-parts', title: { eu: 'Zatikako integrazioaren formula', es: 'La fórmula de partes', en: 'The by-parts formula', ar: 'صيغة التكامل بالتجزئة' } }
        ],
        problem: say('Kalkulatu $\\int_0^1 xe^x\\,dx$.', 'Calcula $\\int_0^1 xe^x\\,dx$.', 'احسب $\\int_0^1 xe^x\\,dx$.', 'Work out $\\int_0^1 xe^x\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$u=x$ eta $dv=e^x\\,dx$.', '$u=x$ y $dv=e^x\\,dx$.', '$u=x$ و$dv=e^x\\,dx$.', '$u=x$ and $dv=e^x\\,dx$.'), math: same('$\\left[xe^x\\right]_0^1-\\int_0^1 e^x\\,dx$') },
            { text: say('Kalkulatu bi zatiak.', 'Calcula las dos partes.', 'احسب الجزأين.', 'Work out the two parts.'), math: same('$(e-0)-(e-1)$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$=1$') }
        ],
        takeaway: say('$\\int_a^b u\\,dv=\\left[uv\\right]_a^b-\\int_a^b v\\,du$. Jatorrizko osoa aurkitu eta amaieran Barrow aplika daiteke ere; ez du balio $uv$ kalkulatzea ahazteak.', '$\\int_a^b u\\,dv=\\left[uv\\right]_a^b-\\int_a^b v\\,du$. También se puede hallar la primitiva completa y aplicar Barrow al final; lo que no vale es olvidar calcular $uv$.', '$\\int_a^b u\\,dv=\\left[uv\\right]_a^b-\\int_a^b v\\,du$. ويمكن أيضًا إيجاد الأصلية كاملة وتطبيق بارو في النهاية؛ أما نسيان حساب $uv$ فلا يصح.', '$\\int_a^b u\\,dv=\\left[uv\\right]_a^b-\\int_a^b v\\,du$. You can also find the whole antiderivative and apply Barrow at the end; what does not work is forgetting to work out $uv$.'),
        figure: (language) => <DefinitePartsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'piecewise',
        stage: 'techniques',
        title: say('Zatika eta balio absolutuarekin', 'A trozos y con valor absoluto', 'على أجزاء ومع القيمة المطلقة', 'Piecewise and with absolute value'),
        goal: say('Integrala formula aldatzen den tokian zatitzea: zatika definitutako funtzio batean, lotura-puntuan; $|f(x)|$ funtzioarekin, $f$ zeinuz aldatzen den tokian.', 'Partir la integral donde cambia la fórmula: en una función a trozos, en el punto de unión; con $|f(x)|$, donde $f$ cambia de signo.', 'تقسيم التكامل حيث تتغير الصيغة: في دالة معرّفة على أجزاء عند نقطة الالتقاء، ومع $|f(x)|$ حيث تتغير إشارة $f$.', 'Split the integral where the formula changes: in a piecewise function, at the joining point; with $|f(x)|$, where $f$ changes sign.'),
        problem: say('Kalkulatu $\\int_0^3|x-1|\\,dx$.', 'Calcula $\\int_0^3|x-1|\\,dx$.', 'احسب $\\int_0^3|x-1|\\,dx$.', 'Work out $\\int_0^3|x-1|\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$|x-1|$ funtzioak formula aldatzen du $x=1$ puntuan.', '$|x-1|$ cambia de fórmula en $x=1$.', 'تتغير صيغة $|x-1|$ عند $x=1$.', '$|x-1|$ changes formula at $x=1$.'), math: same('$|x-1|=\\begin{cases}1-x & x<1\\\\ x-1 & x\\ge 1\\end{cases}$') },
            { text: say('Zatitu 1 puntuan.', 'Parte en 1.', 'قسّم عند 1.', 'Split at 1.'), math: same('$\\int_0^1(1-x)\\,dx+\\int_1^3(x-1)\\,dx$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$\\frac{1}{2}+2=\\frac{5}{2}$') }
        ],
        takeaway: say('Balio absolutuarekin edo zatika definitutako funtzio batekin, tartea formula aldatzen den puntuetan zatitzen da, eta zati bakoitzaren integralak batzen dira, bakoitza bere formularekin.', 'Con valor absoluto o con una función a trozos, se parte el intervalo en los puntos donde cambia la fórmula y se suman las integrales de cada trozo, cada una con su fórmula.', 'مع القيمة المطلقة أو مع دالة معرّفة على أجزاء نقسم الفترة عند النقاط التي تتغير فيها الصيغة، ونجمع تكاملات الأجزاء، كلًّا بصيغته.', 'With an absolute value or a piecewise function, split the interval at the points where the formula changes and add the integrals of each piece, each with its own formula.'),
        figure: (language) => <PiecewiseFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Regions and problems ---------- */
    {
        id: 'three-curves',
        stage: 'problems',
        title: say('Hiru kurbako barrutiak', 'Recintos de tres curvas', 'مناطق تحدّها ثلاثة منحنيات', 'Regions bounded by three curves'),
        goal: say('Hiru kurbak mugatutako barruti baten azalera aurkitzea: binaka hartutako ebaki-puntuek zerrendatan zatitzen dute, eta zerrenda bakoitzean goikoa ken behekoa integratzen da.', 'Hallar el área de un recinto limitado por tres curvas: los cortes dos a dos lo parten en tiras, y en cada tira se integra la de arriba menos la de abajo.', 'إيجاد مساحة منطقة تحدّها ثلاثة منحنيات: نقاط التقاطع مثنى مثنى تقسمها إلى شرائح، وفي كل شريحة نكامل الأعلى ناقص الأدنى.', 'Find the area of a region bounded by three curves: the crossings two by two split it into strips, and in each strip you integrate the top one minus the bottom one.'),
        problem: say('Aurkitu lehen koadranteko barrutiaren azalera, $y=x^2$ kurbak, $y=2-x$ zuzenak eta X ardatzak mugatua.', 'Halla el área del recinto del primer cuadrante limitado por $y=x^2$, $y=2-x$ y el eje X.', 'أوجد مساحة المنطقة في الربع الأول التي يحدّها $y=x^2$ و$y=2-x$ ومحور X.', 'Find the area of the region in the first quadrant bounded by $y=x^2$, $y=2-x$ and the x-axis.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebaki-puntuak: $x^2=2-x$ puntuan $x=1$; $2-x=0$ puntuan $x=2$; eta $x^2=0$ puntuan $x=0$.', 'Cortes: $x^2=2-x$ en $x=1$; $2-x=0$ en $x=2$; $x^2=0$ en $x=0$.', 'نقاط التقاطع: $x^2=2-x$ عند $x=1$، و$2-x=0$ عند $x=2$، و$x^2=0$ عند $x=0$.', 'Crossings: $x^2=2-x$ at $x=1$; $2-x=0$ at $x=2$; $x^2=0$ at $x=0$.') },
            { text: say('Bi zerrenda: 1 arte $x^2$ da goian; 1 eta 2 artean, $2-x$.', 'Dos tiras: hasta 1 manda $x^2$; de 1 a 2, $2-x$.', 'شريحتان: حتى 1 يكون $x^2$ في الأعلى، ومن 1 إلى 2 يكون $2-x$.', 'Two strips: up to 1 the top is $x^2$; from 1 to 2, $2-x$.'), math: same('$\\int_0^1 x^2\\,dx+\\int_1^2(2-x)\\,dx$') },
            { text: say('Azalera: $\\frac{1}{3}+\\frac{1}{2}=\\frac{5}{6}$ u².', 'Área: $\\frac{1}{3}+\\frac{1}{2}=\\frac{5}{6}$ u².', 'المساحة: $\\frac{1}{3}+\\frac{1}{2}=\\frac{5}{6}$ وحدة مربعة.', 'Area: $\\frac{1}{3}+\\frac{1}{2}=\\frac{5}{6}$ square units.') }
        ],
        takeaway: say('Marraztu barrutia eta aurkitu ebaki-puntu guztiak binaka. Goiko edo beheko kurba aldatzen duen ebaki bakoitzak zerrenda berri bat irekitzen du; azalera zerrenda bakoitzaren integralen batura da.', 'Dibuja el recinto y halla todos los cortes dos a dos. Cada corte que cambia la curva de arriba o la de abajo abre una tira nueva; el área es la suma de las integrales de cada tira.', 'ارسم المنطقة وأوجد كل نقاط التقاطع مثنى مثنى. كل تقاطع يغيّر المنحنى الأعلى أو الأدنى يفتح شريحة جديدة، والمساحة مجموع تكاملات الشرائح.', 'Draw the region and find all the crossings two by two. Each crossing that changes the top or the bottom curve opens a new strip; the area is the sum of the integrals of the strips.'),
        figure: (language) => <ThreeCurvesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'parameter',
        stage: 'problems',
        title: say('Azalera ematen duen parametroa', 'Un parámetro que da el área', 'وسيط يعطي المساحة', 'A parameter that gives the area'),
        goal: say('Parametro bat aurkitzea (muga bat, $b$, edo koefiziente bat, $k$), integral batek edo azalera batek eskatutako balioa izan dezan: parametroaren ekuazio bat geratzen da.', 'Hallar un parámetro (un límite $b$ o un coeficiente $k$) para que una integral o un área valga lo que se pide: queda una ecuación en el parámetro.', 'إيجاد وسيط (حد $b$ أو معامل $k$) ليكون للتكامل أو للمساحة القيمة المطلوبة: تبقى معادلة في الوسيط.', 'Find a parameter (a limit $b$ or a coefficient $k$) so that an integral or an area has the value asked for: an equation in the parameter is left.'),
        problem: say('Aurkitu $b>0$, $y=x^2$ kurbaren, X ardatzaren eta $x=b$ zuzenaren arteko azalera 9 izan dadin.', 'Halla $b>0$ para que el área entre $y=x^2$, el eje X y $x=b$ valga 9.', 'أوجد $b>0$ لتكون المساحة بين $y=x^2$ ومحور X و$x=b$ مساوية لـ 9.', 'Find $b>0$ so that the area between $y=x^2$, the x-axis and $x=b$ is 9.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Azalera $b$ parametroaren funtzioan.', 'El área en función de $b$.', 'المساحة بدلالة $b$.', 'The area in terms of $b$.'), math: same('$\\int_0^b x^2\\,dx=\\frac{b^3}{3}$') },
            { text: say('Berdindu 9 zenbakiarekin.', 'Iguala a 9.', 'ساوِ بـ 9.', 'Set it equal to 9.'), math: same('$\\frac{b^3}{3}=9\\ \\to\\ b^3=27$') },
            { text: say('$b=3$.', '$b=3$.', '$b=3$.', '$b=3$.') }
        ],
        takeaway: say('Integrala edo azalera parametroarekin idazten da, zenbaki bat balitz bezala; Barrow aplikatzen da, eta eskatutako balioarekin berdintzen da. Amaieran, egiaztatu soluzioak zentzua duen (positiboa, tartearen barruan…).', 'Se escribe la integral o el área con el parámetro como si fuera un número, se aplica Barrow y se iguala al valor pedido. Al final se comprueba que la solución tiene sentido (positiva, dentro del intervalo…).', 'نكتب التكامل أو المساحة بالوسيط كأنه عدد، ونطبّق بارو، ونساوي بالقيمة المطلوبة. وفي النهاية نتحقق من أن الحل منطقي (موجب، داخل الفترة…).', 'Write the integral or the area with the parameter as if it were a number, apply Barrow and set it equal to the value asked for. At the end, check that the solution makes sense (positive, inside the interval…).'),
        figure: (language) => <ParameterFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'integral-extrema',
        stage: 'problems',
        title: say('Funtzio integralaren muturrak', 'Extremos de la función integral', 'القيم القصوى للدالة التكاملية', 'Extrema of the integral function'),
        goal: say('$F(x)=\\int_a^x f(t)\\,dt$ funtzioaren hazkundea aztertzea kalkulatu gabe: $F\'=f$ denez, $F$ hazten da $f>0$ den tokian, eta muturrak ditu $f$ zeinuz aldatzen den tokian.', 'Estudiar el crecimiento de $F(x)=\\int_a^x f(t)\\,dt$ sin calcularla: $F\'=f$, así que $F$ crece donde $f>0$ y tiene extremos donde $f$ cambia de signo.', 'دراسة تزايد $F(x)=\\int_a^x f(t)\\,dt$ دون حسابها: $F\'=f$، إذن تتزايد $F$ حيث $f>0$ ولها قيم قصوى حيث تتغير إشارة $f$.', 'Study the growth of $F(x)=\\int_a^x f(t)\\,dt$ without working it out: $F\'=f$, so $F$ grows where $f>0$ and has extrema where $f$ changes sign.'),
        needs: [
            { unit: 'batx1-zientziak/aplicaciones-derivada', topic: 'singular-points', title: { eu: 'Puntu singularrak, maximoak eta minimoak', es: 'Puntos singulares y extremos relativos', en: 'Stationary points and local extrema', ar: 'النقاط الحرجة والقيم القصوى المحلية' } }
        ],
        problem: say('Non ditu $F(x)=\\int_0^x(t^2-4)\\,dt$ funtzioak maximo bat eta minimo bat?', '¿Dónde tiene $F(x)=\\int_0^x(t^2-4)\\,dt$ un máximo y un mínimo?', 'أين تكون لـ $F(x)=\\int_0^x(t^2-4)\\,dt$ قيمة عظمى وقيمة صغرى؟', 'Where does $F(x)=\\int_0^x(t^2-4)\\,dt$ have a maximum and a minimum?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarrizko teorema: $F\'(x)=x^2-4$.', 'Teorema fundamental: $F\'(x)=x^2-4$.', 'المبرهنة الأساسية: $F\'(x)=x^2-4$.', 'Fundamental theorem: $F\'(x)=x^2-4$.'), math: same('$F\'(x)=0\\ \\to\\ x=\\pm 2$') },
            { text: say('$F\'$ deribatua $+$ izatetik $-$ izatera pasatzen da $-2$ puntuan, eta $-$ izatetik $+$ izatera 2 puntuan.', '$F\'$ pasa de $+$ a $-$ en $-2$ y de $-$ a $+$ en 2.', 'تنتقل $F\'$ من $+$ إلى $-$ عند $-2$ ومن $-$ إلى $+$ عند 2.', '$F\'$ goes from $+$ to $-$ at $-2$ and from $-$ to $+$ at 2.') },
            { text: say('Maximoa $x=-2$ puntuan, eta minimoa $x=2$ puntuan.', 'Máximo en $x=-2$ y mínimo en $x=2$.', 'قيمة عظمى عند $x=-2$ وصغرى عند $x=2$.', 'Maximum at $x=-2$ and minimum at $x=2$.'), math: same('$F(2)=\\frac{8}{3}-8=-\\frac{16}{3}$') }
        ],
        takeaway: say('$F\'=f$ denez, $f$ funtzioaren zeroak, zeinuz aldatzen den tokian, $F$ funtzioaren muturrak dira: maximoa $f$ positibo izatetik negatibo izatera pasatzen bada, eta minimoa alderantziz. $F\'\'=f\'$ deribatuak kurbadura ematen du.', 'Como $F\'=f$, los ceros de $f$ donde cambia de signo son los extremos de $F$: máximo si $f$ pasa de positiva a negativa, mínimo si pasa de negativa a positiva. $F\'\'=f\'$ da la curvatura.', 'لأن $F\'=f$ فأصفار $f$ التي تتغير عندها إشارتها هي القيم القصوى لـ $F$: عظمى إذا انتقلت $f$ من الموجب إلى السالب، وصغرى إذا انتقلت من السالب إلى الموجب. و$F\'\'=f\'$ تعطي التقعّر.', 'Since $F\'=f$, the zeros of $f$ where it changes sign are the extrema of $F$: a maximum if $f$ goes from positive to negative, a minimum if it goes from negative to positive. $F\'\'=f\'$ gives the concavity.'),
        figure: (language) => <IntegralExtremaFigure language={language} />
    },
    {
        id: 'revolution',
        stage: 'problems',
        title: say('Bira-gorputzen bolumenak', 'Volúmenes de revolución', 'أحجام الدوران', 'Volumes of revolution'),
        goal: say('$y=f(x)$ kurbaren azpiko eskualdea X ardatzaren inguruan $a$ eta $b$ artean biratzean lortzen den gorputzaren bolumena aurkitzea: $V=\\pi\\int_a^b f(x)^2\\,dx$.', 'Hallar el volumen del cuerpo que se obtiene al girar alrededor del eje X la región bajo $y=f(x)$ entre $a$ y $b$: $V=\\pi\\int_a^b f(x)^2\\,dx$.', 'إيجاد حجم الجسم الناتج عن دوران المنطقة تحت $y=f(x)$ بين $a$ و$b$ حول محور X: $V=\\pi\\int_a^b f(x)^2\\,dx$.', 'Find the volume of the solid made by turning the region under $y=f(x)$ between $a$ and $b$ about the x-axis: $V=\\pi\\int_a^b f(x)^2\\,dx$.'),
        problem: say('Aurkitu $y=\\sqrt{x}$ kurba X ardatzaren inguruan 0 eta 4 artean biratzean lortzen den bolumena.', 'Halla el volumen al girar $y=\\sqrt{x}$ alrededor del eje X entre 0 y 4.', 'أوجد الحجم الناتج عن دوران $y=\\sqrt{x}$ حول محور X بين 0 و4.', 'Find the volume when $y=\\sqrt{x}$ is turned about the x-axis between 0 and 4.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Disko bakoitzaren erradioa $f(x)$ da, eta azalera $\\pi f(x)^2$.', 'Cada disco tiene radio $f(x)$ y área $\\pi f(x)^2$.', 'لكل قرص نصف قطر $f(x)$ ومساحة $\\pi f(x)^2$.', 'Each disc has radius $f(x)$ and area $\\pi f(x)^2$.'), math: same('$\\pi(\\sqrt{x})^2=\\pi x$') },
            { text: say('Batu diskoak.', 'Suma los discos.', 'اجمع الأقراص.', 'Add up the discs.'), math: same('$V=\\pi\\int_0^4 x\\,dx=\\pi\\left[\\frac{x^2}{2}\\right]_0^4$') },
            { text: say('Bolumena.', 'El volumen.', 'الحجم.', 'The volume.'), math: same('$V=8\\pi$') }
        ],
        takeaway: say('$V=\\pi\\int_a^b f(x)^2\\,dx$: ebaki bakoitza $f(x)$ erradioko zirkulu bat da. Ez ahaztu $\\pi$ ez karratua; $r$ erradioko esfera $y=\\sqrt{r^2-x^2}$ biratuta lortzen da.', '$V=\\pi\\int_a^b f(x)^2\\,dx$: cada sección es un círculo de radio $f(x)$. No se olvidan $\\pi$ ni el cuadrado; una esfera de radio $r$ sale de girar $y=\\sqrt{r^2-x^2}$.', '$V=\\pi\\int_a^b f(x)^2\\,dx$: كل مقطع دائرة نصف قطرها $f(x)$. لا ننسى $\\pi$ ولا التربيع؛ والكرة التي نصف قطرها $r$ تنتج عن دوران $y=\\sqrt{r^2-x^2}$.', '$V=\\pi\\int_a^b f(x)^2\\,dx$: each section is a circle of radius $f(x)$. Do not forget $\\pi$ or the square; a sphere of radius $r$ comes from turning $y=\\sqrt{r^2-x^2}$.'),
        figure: (language) => <RevolutionFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts), in each language's trigonometric names */
export const bach2DefiniteTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...localizeNames(bach2DefiniteLessonTexts[topic.id as Bach2DefiniteTopicId]),
    ...localizeNames(bach2DefiniteLessonChecks[topic.id as Bach2DefiniteTopicId])
}))
