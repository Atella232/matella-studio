import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { same, say } from '../batx1-zientziak-funtzioak/text'
import { AbsoluteValueFigure, ConcavityFigure, DescribeFigure, DomainFigure, ExpLogFigure, FromDataFigure, HorizontalFigure, InterceptsFigure, MonotonyFigure, ObliqueFigure, PolynomialFigure, RationalFigure, SummaryFigure, SymmetryFigure, VerticalFigure } from './figures'
import { bach2gSketchLessonChecks, type Bach2gSketchTopicId } from './lessonChecks'
import { bach2gSketchLessonTexts } from './lessonTexts'

/* ==========================================================================
   Funtzioen adierazpen grafikoa · Batxilergoa 2 · Gizarte Zientziak —
   stages and lessons. The scope follows unit 8 of Santillana 2.º
   Bachillerato Ciencias Sociales and of Anaya Matemáticas Aplicadas a las
   CCSS II: domain, symmetry and intercepts, the three kinds of asymptote,
   increase, extrema and curvature, the complete graph of polynomial,
   rational, exponential and logarithmic functions, and reading and
   drawing: the absolute value, describing a graph and drawing from data.
   Without periodicity or trigonometric functions (owner, 2026-11-17).
   ========================================================================== */

export type Bach2gSketchStageId = 'first' | 'asymptotes' | 'derivatives' | 'graphs' | 'reading'

export const bach2gSketchStages: UnitStage[] = [
    { id: 'first', tone: 'blue', title: { eu: 'Lehen begiradan', es: 'Lo que se ve primero', en: 'At first sight', ar: 'من النظرة الأولى' } },
    { id: 'asymptotes', tone: 'violet', title: { eu: 'Asintotak', es: 'Asíntotas', en: 'Asymptotes', ar: 'المقاربات' } },
    { id: 'derivatives', tone: 'mustard', title: { eu: 'Deribatuekin', es: 'Con derivadas', en: 'With derivatives', ar: 'بالمشتقات' } },
    { id: 'graphs', tone: 'coral', title: { eu: 'Grafiko osoak', es: 'Gráficas completas', en: 'Complete graphs', ar: 'تمثيلات كاملة' } },
    { id: 'reading', tone: 'green', title: { eu: 'Irakurri eta marraztu', es: 'Leer y dibujar', en: 'Read and draw', ar: 'القراءة والرسم' } }
]

const LIMITS2 = 'batx2-gizarte/limites-continuidad'
const APPLICATIONS2 = 'batx2-gizarte/aplicaciones-derivada'
const SKETCH2Z = 'batx2-zientziak/representacion-funciones'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. At first sight ---------- */
    {
        id: 'domain',
        stage: 'first',
        title: say('Izate-eremua', 'El dominio', 'مجال التعريف', 'The domain'),
        goal: say('Funtzio bat zein $x$ baliotarako dagoen aurkitzea: izendatzailea ez da zero, erro bikoitiaren barrukoa ez da negatiboa eta logaritmoarena positiboa da.', 'Hallar para qué valores de $x$ existe una función: el denominador no es cero, lo de dentro de una raíz par no es negativo y lo de dentro de un logaritmo es positivo.', 'إيجاد قيم $x$ التي توجد عندها الدالة: المقام لا يساوي صفرًا، وما تحت الجذر الزوجي ليس سالبًا، وما داخل اللوغاريتم موجب.', 'Find for which values of $x$ a function exists: the denominator is not zero, what is inside an even root is not negative and what is inside a logarithm is positive.'),
        needs: [
            { unit: LIMITS2, topic: 'k-zero', title: { eu: 'Zenbaki bat zati zero', es: 'Un número entre cero', en: 'A number over zero', ar: 'عدد على صفر' } }
        ],
        problem: say('Aurkitu $f(x)=\\frac{x+1}{x^2-4}$ funtzioaren izate-eremua.', 'Halla el dominio de $f(x)=\\frac{x+1}{x^2-4}$.', 'أوجد مجال تعريف $f(x)=\\frac{x+1}{x^2-4}$.', 'Find the domain of $f(x)=\\frac{x+1}{x^2-4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea zero den tokian ez dago funtziorik.', 'Donde el denominador es cero no hay función.', 'حيث يكون المقام صفرًا لا توجد الدالة.', 'Where the denominator is zero there is no function.'), math: same('$x^2-4=0$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.', 'Solve.'), math: same('$x=-2\\qquad x=2$') },
            { text: say('Izate-eremua.', 'El dominio.', 'مجال التعريف.', 'The domain.'), math: same('$D=\\mathbb{R}-\\{-2,\\,2\\}$') }
        ],
        takeaway: say('Zatiki batean, izendatzailearen zeroak kentzen dira. $\\sqrt{u}$: $u\\ge 0$. $\\ln u$: $u>0$. Polinomioak eta $e^{x}$ beti daude.', 'En una fracción se quitan los ceros del denominador. $\\sqrt{u}$: $u\\ge 0$. $\\ln u$: $u>0$. Los polinomios y $e^{x}$ existen siempre.', 'في الكسر نحذف أصفار المقام. $\\sqrt{u}$: $u\\ge 0$. $\\ln u$: $u>0$. والحدوديات و$e^{x}$ موجودة دائمًا.', 'In a fraction, the zeros of the denominator are removed. $\\sqrt{u}$: $u\\ge 0$. $\\ln u$: $u>0$. Polynomials and $e^{x}$ always exist.'),
        figure: (language) => <DomainFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'symmetry',
        stage: 'first',
        title: say('Simetriak', 'Simetrías', 'التناظر', 'Symmetry'),
        goal: say('$f(-x)$ kalkulatuz jakitea funtzioa bikoitia den (simetrikoa $Y$ ardatzarekiko) edo bakoitia (simetrikoa jatorriarekiko).', 'Saber, calculando $f(-x)$, si una función es par (simétrica respecto al eje $Y$) o impar (simétrica respecto al origen).', 'معرفة هل الدالة زوجية (متناظرة بالنسبة إلى محور $Y$) أم فردية (متناظرة بالنسبة إلى المبدأ) بحساب $f(-x)$.', 'Know, by working out $f(-x)$, whether a function is even (symmetric about the $Y$ axis) or odd (symmetric about the origin).'),
        needs: [
            { unit: SKETCH2Z, topic: 'symmetry-period', title: { eu: 'Simetria eta periodoa', es: 'Simetría y periodo', en: 'Symmetry and period', ar: 'التناظر والدور' } }
        ],
        problem: say('Bikoitia ala bakoitia da $f(x)=x^3-4x$?', '¿Es par o impar $f(x)=x^3-4x$?', 'هل $f(x)=x^3-4x$ زوجية أم فردية؟', 'Is $f(x)=x^3-4x$ even or odd?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatu $x$ honekin: $-x$.', 'Cambia $x$ por $-x$.', 'عوّض $x$ بـ $-x$.', 'Change $x$ to $-x$.'), math: same('$f(-x)=(-x)^3-4(-x)=-x^3+4x$') },
            { text: say('Alderatu $f(x)$ funtzioarekin.', 'Compara con $f(x)$.', 'قارن بـ $f(x)$.', 'Compare with $f(x)$.'), math: same('$f(-x)=-(x^3-4x)=-f(x)$') },
            { text: say('Bakoitia da: simetrikoa jatorriarekiko.', 'Es impar: simétrica respecto al origen.', 'فردية: متناظرة بالنسبة إلى المبدأ.', 'It is odd: symmetric about the origin.'), math: same('$f(-2)=0\\qquad f(2)=0$') }
        ],
        takeaway: say('$f(-x)=f(x)$: bikoitia, $Y$ ardatza ispilua da. $f(-x)=-f(x)$: bakoitia, jatorriarekiko simetrikoa. Bat ere ez bada, ez dago simetriarik.', '$f(-x)=f(x)$: par, el eje $Y$ es un espejo. $f(-x)=-f(x)$: impar, simétrica respecto al origen. Si no es ninguna, no hay simetría.', '$f(-x)=f(x)$: زوجية ومحور $Y$ مرآة. $f(-x)=-f(x)$: فردية ومتناظرة بالنسبة إلى المبدأ. وإن لم تكن أيًّا منهما فلا تناظر.', '$f(-x)=f(x)$: even, the $Y$ axis is a mirror. $f(-x)=-f(x)$: odd, symmetric about the origin. If neither, there is no symmetry.'),
        figure: (language) => <SymmetryFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'intercepts',
        stage: 'first',
        title: say('Ardatzekiko ebaki-puntuak eta zeinua', 'Cortes con los ejes y signo', 'التقاطع مع المحورين والإشارة', 'Intercepts and sign'),
        goal: say('Grafikoak ardatzak non mozten dituen aurkitzea ($x=0$ eta $f(x)=0$) eta zein tartetan dagoen ardatzaren gainean edo azpian.', 'Hallar dónde corta la gráfica a los ejes ($x=0$ y $f(x)=0$) y en qué intervalos está por encima o por debajo del eje.', 'إيجاد نقاط تقاطع التمثيل مع المحورين ($x=0$ و$f(x)=0$) والفترات التي يكون فيها فوق المحور أو تحته.', 'Find where the graph cuts the axes ($x=0$ and $f(x)=0$) and on which intervals it is above or below the axis.'),
        needs: [
            { unit: LIMITS2, topic: 'one-sided', title: { eu: 'Ordezkatu eta alboko limiteak', es: 'Sustituir y límites laterales', en: 'Substitute and one-sided limits', ar: 'التعويض والنهايتان الجانبيتان' } }
        ],
        problem: say('Aurkitu $f(x)=\\frac{x-2}{x+1}$ funtzioaren ebaki-puntuak eta zeinua.', 'Halla los cortes con los ejes y el signo de $f(x)=\\frac{x-2}{x+1}$.', 'أوجد نقاط تقاطع $f(x)=\\frac{x-2}{x+1}$ مع المحورين وإشارتها.', 'Find the intercepts and the sign of $f(x)=\\frac{x-2}{x+1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$Y$ ardatza: $x=0$.', 'Eje $Y$: $x=0$.', 'محور $Y$: $x=0$.', '$Y$ axis: $x=0$.'), math: same('$f(0)=-2\\ \\to\\ (0,-2)$') },
            { text: say('$X$ ardatza: zenbakitzailea zero.', 'Eje $X$: numerador cero.', 'محور $X$: البسط صفر.', '$X$ axis: numerator zero.'), math: same('$x-2=0\\ \\to\\ (2,0)$') },
            { text: say('Zeinua: $-1$ eta $2$ puntuek zatitutako tarteak.', 'Signo: los intervalos que dejan $-1$ y $2$.', 'الإشارة: الفترات التي يحددها $-1$ و$2$.', 'Sign: the intervals left by $-1$ and $2$.'), math: same('$+\\ \\ (-1)\\ \\ -\\ \\ (2)\\ \\ +$') }
        ],
        takeaway: say('Ebaki-puntuak eta izate-eremutik kanpoko puntuak dira zeinua alda daitekeen toki bakarrak. Tarte bakoitzean balio bat probatzea nahikoa da.', 'Los cortes con el eje $X$ y los puntos fuera del dominio son los únicos sitios donde puede cambiar el signo. Basta probar un valor en cada intervalo.', 'نقاط التقاطع مع محور $X$ والنقاط خارج المجال هي المواضع الوحيدة التي قد تتغير فيها الإشارة. ويكفي تجريب قيمة في كل فترة.', 'The $X$ intercepts and the points outside the domain are the only places where the sign can change. Trying one value in each interval is enough.'),
        figure: (language) => <InterceptsFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Asymptotes ---------- */
    {
        id: 'vertical',
        stage: 'asymptotes',
        title: say('Asintota bertikalak', 'Asíntotas verticales', 'المقاربات العمودية', 'Vertical asymptotes'),
        goal: say('Asintota bertikalak aurkitzea izate-eremutik kanpoko puntuetan, eta alboko limiteekin adarrak gora ala behera doazen jakitea.', 'Hallar las asíntotas verticales en los puntos fuera del dominio y saber, con los límites laterales, si las ramas suben o bajan.', 'إيجاد المقاربات العمودية عند النقاط خارج المجال، ومعرفة اتجاه الفرعين بالنهايتين الجانبيتين.', 'Find the vertical asymptotes at the points outside the domain and know, with the one-sided limits, whether the branches go up or down.'),
        needs: [
            { unit: LIMITS2, topic: 'k-zero', title: { eu: 'Zenbaki bat zati zero', es: 'Un número entre cero', en: 'A number over zero', ar: 'عدد على صفر' } }
        ],
        problem: say('Aurkitu $f(x)=\\frac{x+3}{x-1}$ funtzioaren asintota bertikala eta adarren norabidea.', 'Halla la asíntota vertical de $f(x)=\\frac{x+3}{x-1}$ y hacia dónde van las ramas.', 'أوجد المقارب العمودي لـ $f(x)=\\frac{x+3}{x-1}$ واتجاه الفرعين.', 'Find the vertical asymptote of $f(x)=\\frac{x+3}{x-1}$ and where the branches go.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea zero: $x=1$; zenbakitzailea ez.', 'Denominador cero: $x=1$; el numerador no.', 'المقام صفر: $x=1$؛ والبسط لا.', 'Denominator zero: $x=1$; the numerator is not.'), math: same('$\\frac{4}{0}$') },
            { text: say('Ezkerretik.', 'Por la izquierda.', 'من اليسار.', 'From the left.'), math: same('$\\lim_{x\\to 1^-}f(x)=-\\infty$') },
            { text: say('Eskuinetik.', 'Por la derecha.', 'من اليمين.', 'From the right.'), math: same('$\\lim_{x\\to 1^+}f(x)=+\\infty$') }
        ],
        takeaway: say('$x=a$ asintota bertikala da $f(x)$ infinitura doanean $x\\to a$ denean. Zatikian, izendatzailea zero eta zenbakitzailea ez. Biak zero badira, zulo bat izan daiteke.', '$x=a$ es asíntota vertical si $f(x)$ va a infinito cuando $x\\to a$. En una fracción: denominador cero y numerador no. Si los dos son cero, puede ser un agujero.', '$x=a$ مقارب عمودي إذا اتجهت $f(x)$ إلى اللانهاية عندما $x\\to a$. وفي الكسر: المقام صفر والبسط لا. وإذا انعدما معًا فقد تكون ثغرة.', '$x=a$ is a vertical asymptote if $f(x)$ goes to infinity as $x\\to a$. In a fraction: denominator zero and numerator not. If both are zero, it may be a hole.'),
        figure: (language) => <VerticalFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'horizontal',
        stage: 'asymptotes',
        title: say('Asintota horizontalak', 'Asíntotas horizontales', 'المقاربات الأفقية', 'Horizontal asymptotes'),
        goal: say('$x\\to\\pm\\infty$ denean funtzioa zenbaki batera hurbiltzen den aztertzea: hori da asintota horizontala, epe luzerako balioa.', 'Estudiar si la función se acerca a un número cuando $x\\to\\pm\\infty$: es la asíntota horizontal, el valor a largo plazo.', 'دراسة هل تقترب الدالة من عدد عندما $x\\to\\pm\\infty$: إنه المقارب الأفقي، أي القيمة على المدى الطويل.', 'Study whether the function approaches a number as $x\\to\\pm\\infty$: that is the horizontal asymptote, the long-run value.'),
        needs: [
            { unit: LIMITS2, topic: 'degrees', title: { eu: 'Maila handienak irabazten du', es: 'Gana el de mayor grado', en: 'The highest degree wins', ar: 'تفوز الدرجة الأكبر' } }
        ],
        problem: say('Aurkitu $f(x)=\\frac{2x+1}{x-3}$ funtzioaren asintota horizontala.', 'Halla la asíntota horizontal de $f(x)=\\frac{2x+1}{x-3}$.', 'أوجد المقارب الأفقي لـ $f(x)=\\frac{2x+1}{x-3}$.', 'Find the horizontal asymptote of $f(x)=\\frac{2x+1}{x-3}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maila berak goian eta behean.', 'El mismo grado arriba y abajo.', 'الدرجة نفسها في البسط والمقام.', 'The same degree on top and below.'), math: same('$\\lim_{x\\to\\pm\\infty}\\frac{2x+1}{x-3}=\\frac{2}{1}$') },
            { text: say('Asintota.', 'La asíntota.', 'المقارب.', 'The asymptote.'), math: same('$y=2$') },
            { text: say('Posizioa: kendu eta begiratu zeinua.', 'Posición: resta y mira el signo.', 'الموضع: اطرح وانظر إلى الإشارة.', 'Position: subtract and look at the sign.'), math: same('$f(x)-2=\\frac{7}{x-3}$') }
        ],
        takeaway: say('Zatiki batean: goiko maila txikiagoa bada, $y=0$; maila bera bada, koefiziente nagusien zatidura; goikoa handiagoa bada, ez dago asintota horizontalik.', 'En una fracción: si el grado de arriba es menor, $y=0$; si es igual, el cociente de los coeficientes principales; si el de arriba es mayor, no hay asíntota horizontal.', 'في الكسر: إذا كانت درجة البسط أصغر فـ $y=0$؛ وإذا تساوت فخارج قسمة المعاملين الرئيسيين؛ وإذا كانت أكبر فلا مقارب أفقي.', 'In a fraction: if the top degree is smaller, $y=0$; if equal, the quotient of the leading coefficients; if the top is bigger, there is no horizontal asymptote.'),
        figure: (language) => <HorizontalFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'oblique',
        stage: 'asymptotes',
        title: say('Asintota zeiharrak', 'Asíntotas oblicuas', 'المقاربات المائلة', 'Oblique asymptotes'),
        goal: say('Goiko maila behekoa baino bat handiagoa denean, zatiketaren zatidura asintota zeiharra dela ikustea.', 'Ver que, cuando el grado de arriba es uno más que el de abajo, el cociente de la división es la asíntota oblicua.', 'رؤية أن خارج القسمة هو المقارب المائل عندما تزيد درجة البسط على درجة المقام بواحد.', 'See that, when the top degree is one more than the bottom one, the quotient of the division is the oblique asymptote.'),
        needs: [
            { unit: SKETCH2Z, topic: 'asymptote-position', title: { eu: 'Kurba eta haren asintota', es: 'La curva y su asíntota', en: 'The curve and its asymptote', ar: 'المنحنى ومقاربه' } }
        ],
        problem: say('Aurkitu $f(x)=\\frac{x^2+1}{x-1}$ funtzioaren asintota zeiharra.', 'Halla la asíntota oblicua de $f(x)=\\frac{x^2+1}{x-1}$.', 'أوجد المقارب المائل لـ $f(x)=\\frac{x^2+1}{x-1}$.', 'Find the oblique asymptote of $f(x)=\\frac{x^2+1}{x-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu: zatidura $x+1$ eta hondarra $2$.', 'Divide: cociente $x+1$ y resto $2$.', 'اقسم: خارج القسمة $x+1$ والباقي $2$.', 'Divide: quotient $x+1$ and remainder $2$.'), math: same('$f(x)=x+1+\\frac{2}{x-1}$') },
            { text: say('Hondarraren zatia zerora doa.', 'La parte del resto se va a cero.', 'جزء الباقي يتجه إلى الصفر.', 'The remainder part goes to zero.'), math: same('$\\frac{2}{x-1}\\to 0$') },
            { text: say('Asintota zeiharra.', 'La asíntota oblicua.', 'المقارب المائل.', 'The oblique asymptote.'), math: same('$y=x+1$') }
        ],
        takeaway: say('Asintota zeiharra $y=mx+n$: zatiketaren zatidura, edo $m=\\lim\\frac{f(x)}{x}$ eta $n=\\lim(f(x)-mx)$. Asintota horizontala badago, ez dago zeiharrik alde berean.', 'La asíntota oblicua $y=mx+n$: el cociente de la división, o $m=\\lim\\frac{f(x)}{x}$ y $n=\\lim(f(x)-mx)$. Si hay horizontal, no hay oblicua por el mismo lado.', 'المقارب المائل $y=mx+n$: خارج القسمة، أو $m=\\lim\\frac{f(x)}{x}$ و$n=\\lim(f(x)-mx)$. وإذا وُجد مقارب أفقي فلا مائل في الجهة نفسها.', 'The oblique asymptote $y=mx+n$: the quotient of the division, or $m=\\lim\\frac{f(x)}{x}$ and $n=\\lim(f(x)-mx)$. If there is a horizontal one, there is no oblique one on the same side.'),
        figure: (language) => <ObliqueFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. With derivatives ---------- */
    {
        id: 'monotony',
        stage: 'derivatives',
        title: say('Hazkundea eta muturrak', 'Crecimiento y extremos', 'التزايد والقيم القصوى', 'Increase and extrema'),
        goal: say('$f\'$ deribatuaren zeinuarekin hazkunde-tarteak eta maximo eta minimo erlatiboak aurkitzea, grafikoan jartzeko.', 'Hallar con el signo de $f\'$ los intervalos de crecimiento y los máximos y mínimos relativos, para llevarlos a la gráfica.', 'إيجاد فترات التزايد والقيم العظمى والصغرى المحلية بإشارة $f\'$ لنقلها إلى التمثيل.', 'Find with the sign of $f\'$ the intervals of increase and the relative maxima and minima, to put them on the graph.'),
        needs: [
            { unit: APPLICATIONS2, topic: 'intervals', title: { eu: 'Hazkunde-tarteak', es: 'Intervalos de crecimiento', en: 'Intervals of increase', ar: 'فترات التزايد' } }
        ],
        problem: say('Aztertu $f(x)=\\frac{x}{x^2+1}$ funtzioaren hazkundea eta muturrak.', 'Estudia el crecimiento y los extremos de $f(x)=\\frac{x}{x^2+1}$.', 'ادرس تزايد $f(x)=\\frac{x}{x^2+1}$ وقيمها القصوى.', 'Study the increase and the extrema of $f(x)=\\frac{x}{x^2+1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatiduraren erregela.', 'La regla del cociente.', 'قاعدة خارج القسمة.', 'The quotient rule.'), math: same("$f'(x)=\\frac{1-x^2}{(x^2+1)^2}$") },
            { text: say('Zero da $x=\\pm 1$ puntuetan; zeinua.', 'Se anula en $x=\\pm 1$; el signo.', 'تنعدم عند $x=\\pm 1$؛ والإشارة.', 'It is zero at $x=\\pm 1$; the sign.'), math: same('$-\\ \\ (-1)\\ \\ +\\ \\ (1)\\ \\ -$') },
            { text: say('Minimoa eta maximoa.', 'Mínimo y máximo.', 'صغرى وعظمى.', 'Minimum and maximum.'), math: same('$\\min\\left(-1,-\\frac{1}{2}\\right)\\qquad \\max\\left(1,\\frac{1}{2}\\right)$') }
        ],
        takeaway: say('$f\'$ zero den eta izate-eremutik kanpoko puntuek zatitzen dute zuzena. Tarte bakoitzean $f\'$ zeinuak gora ala behera esaten du; zeinua aldatzen den tokian, muturra.', 'Los ceros de $f\'$ y los puntos fuera del dominio parten la recta. En cada intervalo, el signo de $f\'$ dice si sube o baja; donde cambia, hay un extremo.', 'أصفار $f\'$ والنقاط خارج المجال تقسم المستقيم. وفي كل فترة تخبر إشارة $f\'$ هل يصعد أم ينزل؛ وحيث تتغير توجد قيمة قصوى.', 'The zeros of $f\'$ and the points outside the domain split the line. In each interval, the sign of $f\'$ says whether it rises or falls; where it changes, there is an extremum.'),
        figure: (language) => <MonotonyFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'concavity',
        stage: 'derivatives',
        title: say('Kurbadura eta inflexioa', 'Curvatura e inflexión', 'التقعّر والانعطاف', 'Curvature and inflection'),
        goal: say('$f\'\'$ deribatuaren zeinuarekin kurba non den ahurra (∪) eta non ganbila (∩) jakitea, eta inflexio-puntuak marraztea.', 'Saber con el signo de $f\'\'$ dónde la curva es cóncava (∪) y dónde convexa (∩), y marcar los puntos de inflexión.', 'معرفة أين يكون المنحنى مقعّرًا نحو الأعلى (∪) وأين نحو الأسفل (∩) بإشارة $f\'\'$، وتعيين نقاط الانعطاف.', 'Know with the sign of $f\'\'$ where the curve is concave up (∪) and where concave down (∩), and mark the points of inflection.'),
        needs: [
            { unit: APPLICATIONS2, topic: 'second-sign', title: { eu: 'Bigarren deribatuaren zeinua', es: 'El signo de la segunda derivada', en: 'The sign of the second derivative', ar: 'إشارة المشتقة الثانية' } }
        ],
        problem: say('Aztertu $f(x)=x^4-6x^2$ funtzioaren kurbadura.', 'Estudia la curvatura de $f(x)=x^4-6x^2$.', 'ادرس تقعّر $f(x)=x^4-6x^2$.', 'Study the curvature of $f(x)=x^4-6x^2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bigarren deribatua.', 'La segunda derivada.', 'المشتقة الثانية.', 'The second derivative.'), math: same("$f''(x)=12x^2-12$") },
            { text: say('Zero da $x=\\pm 1$ puntuetan; zeinua.', 'Se anula en $x=\\pm 1$; el signo.', 'تنعدم عند $x=\\pm 1$؛ والإشارة.', 'It is zero at $x=\\pm 1$; the sign.'), math: same('$\\cup\\ \\ (-1)\\ \\ \\cap\\ \\ (1)\\ \\ \\cup$') },
            { text: say('Inflexio-puntuak.', 'Los puntos de inflexión.', 'نقاط الانعطاف.', 'The points of inflection.'), math: same('$(-1,-5)\\qquad (1,-5)$') }
        ],
        takeaway: say('$f\'\'>0$: ahurra (∪); $f\'\'<0$: ganbila (∩). Inflexio-puntuan kurbadura aldatzen da: $f\'\'=0$ eta zeinuz aldatzen da.', '$f\'\'>0$: cóncava (∪); $f\'\'<0$: convexa (∩). En un punto de inflexión cambia la curvatura: $f\'\'=0$ y cambia de signo.', '$f\'\'>0$: مقعّرة نحو الأعلى (∪)؛ $f\'\'<0$: نحو الأسفل (∩). وعند نقطة الانعطاف يتغير التقعّر: $f\'\'=0$ مع تغيّر الإشارة.', '$f\'\'>0$: concave up (∪); $f\'\'<0$: concave down (∩). At a point of inflection the curvature changes: $f\'\'=0$ and it changes sign.'),
        figure: (language) => <ConcavityFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'summary',
        stage: 'derivatives',
        title: say('Dena taula batean', 'Todo en una tabla', 'كل شيء في جدول', 'Everything in a table'),
        goal: say('Ikasitako guztia fitxa batean biltzea (izate-eremua, simetria, ebaki-puntuak, asintotak, muturrak eta inflexioa) eta grafikoa haren arabera marraztea.', 'Reunir todo lo estudiado en una ficha (dominio, simetría, cortes, asíntotas, extremos e inflexión) y dibujar la gráfica a partir de ella.', 'جمع كل ما دُرس في بطاقة (المجال، التناظر، التقاطعات، المقاربات، القيم القصوى والانعطاف) ثم رسم التمثيل انطلاقًا منها.', 'Gather everything studied in one card (domain, symmetry, intercepts, asymptotes, extrema and inflection) and draw the graph from it.'),
        needs: [
            { unit: SKETCH2Z, topic: 'sketch-plan', title: { eu: 'Grafikoa urratsez urrats', es: 'La gráfica paso a paso', en: 'The graph step by step', ar: 'التمثيل خطوة بخطوة' } }
        ],
        problem: say('Egin $f(x)=x^3-3x$ funtzioaren fitxa.', 'Haz la ficha de $f(x)=x^3-3x$.', 'أنجز بطاقة $f(x)=x^3-3x$.', 'Make the card of $f(x)=x^3-3x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izate-eremua, simetria eta ebaki-puntuak.', 'Dominio, simetría y cortes.', 'المجال والتناظر والتقاطعات.', 'Domain, symmetry and intercepts.'), math: same('$D=\\mathbb{R}\\qquad f(-x)=-f(x)\\qquad x=0,\\ \\pm\\sqrt{3}$') },
            { text: say('Muturrak.', 'Extremos.', 'القيم القصوى.', 'Extrema.'), math: same('$\\max(-1,2)\\qquad \\min(1,-2)$') },
            { text: say('Inflexioa.', 'Inflexión.', 'الانعطاف.', 'Inflection.'), math: same("$f''(x)=6x\\ \\to\\ (0,0)$") }
        ],
        takeaway: say('Fitxaren ordena: izate-eremua, simetria, ebaki-puntuak, asintotak, hazkundea eta muturrak, kurbadura. Puntuak eta asintotak lehenik jartzen dira, eta gero kurbak lotzen ditu.', 'El orden de la ficha: dominio, simetría, cortes, asíntotas, crecimiento y extremos, curvatura. Primero se colocan los puntos y las asíntotas, y después la curva los une.', 'ترتيب البطاقة: المجال، التناظر، التقاطعات، المقاربات، التزايد والقيم القصوى، التقعّر. تُوضع النقاط والمقاربات أولًا ثم يربطها المنحنى.', 'The order of the card: domain, symmetry, intercepts, asymptotes, increase and extrema, curvature. The points and asymptotes go first, then the curve joins them.'),
        figure: (language) => <SummaryFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Complete graphs ---------- */
    {
        id: 'polynomial',
        stage: 'graphs',
        title: say('Funtzio polinomikoak', 'Funciones polinómicas', 'الدوال الحدودية', 'Polynomial functions'),
        goal: say('Polinomio baten grafikoa marraztea: ez du asintotarik, ebaki-puntuak faktorizatuz ateratzen dira eta adarrak maila handieneko gaiak gidatzen ditu.', 'Dibujar la gráfica de un polinomio: no tiene asíntotas, los cortes salen factorizando y las ramas las manda el término de mayor grado.', 'رسم تمثيل حدودية: لا مقاربات لها، والتقاطعات تُستخرج بالتحليل، والحد ذو الدرجة الأكبر يحدد الفرعين.', 'Draw the graph of a polynomial: it has no asymptotes, the intercepts come from factorising and the term of highest degree rules the branches.'),
        needs: [
            { unit: APPLICATIONS2, topic: 'relative', title: { eu: 'Maximo eta minimo erlatiboak', es: 'Máximos y mínimos relativos', en: 'Relative maxima and minima', ar: 'القيم العظمى والصغرى المحلية' } }
        ],
        problem: say('Marraztu $f(x)=x^3-6x^2+9x$.', 'Dibuja $f(x)=x^3-6x^2+9x$.', 'ارسم $f(x)=x^3-6x^2+9x$.', 'Draw $f(x)=x^3-6x^2+9x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebaki-puntuak.', 'Los cortes.', 'التقاطعات.', 'The intercepts.'), math: same('$f(x)=x(x-3)^2\\ \\to\\ x=0,\\ x=3$') },
            { text: say('Muturrak.', 'Los extremos.', 'القيم القصوى.', 'The extrema.'), math: same("$f'(x)=3(x-1)(x-3)\\ \\to\\ \\max(1,4)\\qquad \\min(3,0)$") },
            { text: say('Inflexioa eta adarrak.', 'Inflexión y ramas.', 'الانعطاف والفرعان.', 'Inflection and branches.'), math: same("$f''(x)=6x-12\\ \\to\\ (2,2)$") }
        ],
        takeaway: say('Polinomioek ez dute asintotarik. Erro bikoitz batean ($x=3$ hemen) grafikoak ardatza ukitzen du, baina ez du zeharkatzen.', 'Los polinomios no tienen asíntotas. En una raíz doble ($x=3$ aquí) la gráfica toca el eje, pero no lo atraviesa.', 'ليس للحدوديات مقاربات. وعند جذر مضاعف ($x=3$ هنا) يمس التمثيل المحور دون أن يعبره.', 'Polynomials have no asymptotes. At a double root ($x=3$ here) the graph touches the axis, but does not cross it.'),
        figure: (language) => <PolynomialFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'rational',
        stage: 'graphs',
        title: say('Funtzio arrazionalak', 'Funciones racionales', 'الدوال الكسرية', 'Rational functions'),
        goal: say('Zatiki baten grafikoa marraztea: izate-eremua, asintotak, muturrak eta adar bakoitzaren posizioa.', 'Dibujar la gráfica de una fracción: dominio, asíntotas, extremos y la posición de cada rama.', 'رسم تمثيل كسر: المجال، المقاربات، القيم القصوى وموضع كل فرع.', 'Draw the graph of a fraction: domain, asymptotes, extrema and the position of each branch.'),
        needs: [
            { unit: SKETCH2Z, topic: 'rational-review', title: { eu: 'Funtzio arrazionalak', es: 'Funciones racionales', en: 'Rational functions', ar: 'الدوال الكسرية' } }
        ],
        problem: say('Marraztu $f(x)=\\frac{x^2}{x-1}$.', 'Dibuja $f(x)=\\frac{x^2}{x-1}$.', 'ارسم $f(x)=\\frac{x^2}{x-1}$.', 'Draw $f(x)=\\frac{x^2}{x-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Asintotak.', 'Asíntotas.', 'المقاربات.', 'Asymptotes.'), math: same('$x=1\\qquad y=x+1$') },
            { text: say('Deribatua.', 'La derivada.', 'المشتقة.', 'The derivative.'), math: same("$f'(x)=\\frac{x(x-2)}{(x-1)^2}$") },
            { text: say('Muturrak.', 'Los extremos.', 'القيم القصوى.', 'The extrema.'), math: same('$\\max(0,0)\\qquad \\min(2,4)$') }
        ],
        takeaway: say('Funtzio arrazional batean, asintotek grafikoaren eskeletoa ematen dute: lehenik marrazten dira, eta adarrak haietara hurbiltzen dira.', 'En una función racional, las asíntotas son el esqueleto de la gráfica: se dibujan primero, y las ramas se pegan a ellas.', 'في الدالة الكسرية تكون المقاربات هيكل التمثيل: تُرسم أولًا ثم يقترب منها الفرعان.', 'In a rational function, the asymptotes are the skeleton of the graph: they are drawn first, and the branches cling to them.'),
        figure: (language) => <RationalFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'exp-log',
        stage: 'graphs',
        title: say('Funtzio esponentzialak eta logaritmikoak', 'Funciones exponenciales y logarítmicas', 'الدوال الأسية واللوغاريتمية', 'Exponential and logarithmic functions'),
        goal: say('$e^{x}$ eta $\\ln x$ dituzten funtzioak marraztea: izate-eremua, asintota horizontala edo bertikala eta muturrak.', 'Dibujar funciones con $e^{x}$ y $\\ln x$: dominio, asíntota horizontal o vertical y extremos.', 'رسم دوال فيها $e^{x}$ و$\\ln x$: المجال والمقارب الأفقي أو العمودي والقيم القصوى.', 'Draw functions with $e^{x}$ and $\\ln x$: domain, horizontal or vertical asymptote and extrema.'),
        needs: [
            { unit: SKETCH2Z, topic: 'exp-products', title: { eu: 'Esponentzialen biderkadurak', es: 'Productos con exponenciales', en: 'Products with exponentials', ar: 'جداءات مع الأسية' } }
        ],
        problem: say('Iragarki baten ondoren, salmentak $V(t)=10te^{-t}$ dira (milakatan, $t$ hilabetetan). Marraztu.', 'Tras un anuncio, las ventas son $V(t)=10te^{-t}$ (en miles, $t$ en meses). Dibújala.', 'بعد إعلان صارت المبيعات $V(t)=10te^{-t}$ (بالآلاف، $t$ بالأشهر). ارسمها.', 'After an advert, sales are $V(t)=10te^{-t}$ (thousands, $t$ in months). Draw it.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatua.', 'La derivada.', 'المشتقة.', 'The derivative.'), math: same("$V'(t)=10(1-t)e^{-t}$") },
            { text: say('Maximoa $t=1$ unean.', 'Máximo en $t=1$.', 'عظمى عند $t=1$.', 'Maximum at $t=1$.'), math: same('$V(1)=\\frac{10}{e}\\approx 3{,}7$') },
            { text: say('Epe luzera.', 'A largo plazo.', 'على المدى الطويل.', 'In the long run.'), math: same('$\\lim_{t\\to+\\infty}10te^{-t}=0\\ \\to\\ y=0$') }
        ],
        takeaway: say('$e^{x}$ funtzioak beti du asintota horizontal bat alde batean. $\\ln x$ funtzioak $x>0$ eskatzen du eta asintota bertikala du $x=0$ zuzenean. Esponentzialak beti irabazten dio polinomioari.', '$e^{x}$ tiene siempre una asíntota horizontal por un lado. $\\ln x$ pide $x>0$ y tiene asíntota vertical en $x=0$. La exponencial siempre le gana al polinomio.', 'لـ $e^{x}$ مقارب أفقي دائمًا من جهة. و$\\ln x$ تتطلب $x>0$ ولها مقارب عمودي عند $x=0$. والأسية تتفوق دائمًا على الحدودية.', '$e^{x}$ always has a horizontal asymptote on one side. $\\ln x$ needs $x>0$ and has a vertical asymptote at $x=0$. The exponential always beats the polynomial.'),
        figure: (language) => <ExpLogFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Read and draw ---------- */
    {
        id: 'absolute-value',
        stage: 'reading',
        title: say('Balio absolutua duten funtzioak', 'Funciones con valor absoluto', 'دوال بالقيمة المطلقة', 'Functions with absolute value'),
        goal: say('$|f(x)|$ marraztea: ardatzaren azpiko zatia gora isladatzen da, eta ardatza mozten duen tokietan puntak sortzen dira.', 'Dibujar $|f(x)|$: la parte que está debajo del eje se refleja hacia arriba, y donde corta al eje aparecen picos.', 'رسم $|f(x)|$: ينعكس الجزء الواقع تحت المحور إلى الأعلى، وتظهر زوايا حيث يقطع المحور.', 'Draw $|f(x)|$: the part below the axis is reflected upwards, and corners appear where it cuts the axis.'),
        needs: [
            { unit: SKETCH2Z, topic: 'absolute-graphs', title: { eu: 'Balio absolutua', es: 'El valor absoluto', en: 'The absolute value', ar: 'القيمة المطلقة' } }
        ],
        problem: say('Marraztu $f(x)=|x^2-4|$.', 'Dibuja $f(x)=|x^2-4|$.', 'ارسم $f(x)=|x^2-4|$.', 'Draw $f(x)=|x^2-4|$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrukoa: parabola bat, $-2$ eta $2$ puntuetan zero.', 'Lo de dentro: una parábola, cero en $-2$ y $2$.', 'ما في الداخل: قطع مكافئ ينعدم عند $-2$ و$2$.', 'The inside: a parabola, zero at $-2$ and $2$.'), math: same('$x^2-4=0\\ \\to\\ x=\\pm 2$') },
            { text: say('Zati negatiboa gora isladatu.', 'Refleja hacia arriba la parte negativa.', 'اعكس الجزء السالب إلى الأعلى.', 'Reflect the negative part upwards.'), math: same('$-2<x<2\\ \\to\\ f(x)=4-x^2$') },
            { text: say('Puntak $\\pm 2$ puntuetan; maximo erlatiboa erdian.', 'Picos en $\\pm 2$; máximo relativo en el centro.', 'زاويتان عند $\\pm 2$؛ وعظمى محلية في الوسط.', 'Corners at $\\pm 2$; relative maximum in the middle.'), math: same('$\\max(0,4)$') }
        ],
        takeaway: say('$|f(x)|$ funtzioak ez du inoiz balio negatiborik. $f$ ardatzarekin mozten den puntuetan puntak egon daitezke: han ez da deribagarria.', '$|f(x)|$ nunca toma valores negativos. En los puntos donde $f$ corta al eje puede haber picos: ahí no es derivable.', 'لا تأخذ $|f(x)|$ قيمًا سالبة أبدًا. وحيث تقطع $f$ المحور قد توجد زوايا: هناك لا تكون قابلة للاشتقاق.', '$|f(x)|$ never takes negative values. Where $f$ cuts the axis there can be corners: there it is not differentiable.'),
        figure: (language) => <AbsoluteValueFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'describe',
        stage: 'reading',
        title: say('Grafiko bat deskribatu', 'Describir una gráfica', 'وصف تمثيل', 'Describing a graph'),
        goal: say('Grafiko bat irakurtzea eta haren ezaugarriak hitzez eta zenbakiz ematea: non hazten den, noiz den maximoa eta zer gertatzen den epe luzera.', 'Leer una gráfica y dar sus características con palabras y números: dónde crece, cuándo es máxima y qué pasa a largo plazo.', 'قراءة تمثيل وإعطاء خصائصه بالكلمات والأعداد: أين يتزايد، ومتى يبلغ العظمى، وماذا يحدث على المدى الطويل.', 'Read a graph and give its features in words and numbers: where it rises, when it peaks and what happens in the long run.'),
        needs: [
            { unit: LIMITS2, topic: 'long-run', title: { eu: 'Epe luzera', es: 'A largo plazo', en: 'In the long run', ar: 'على المدى الطويل' } }
        ],
        problem: say('Jokalari-kopurua, milakatan, $J(t)=\\frac{40t}{t^2+4}$ da ($t$ hilabeteetan). Deskribatu grafikoa.', 'Los jugadores de un juego, en miles, son $J(t)=\\frac{40t}{t^2+4}$ ($t$ en meses). Describe la gráfica.', 'عدد لاعبي لعبة بالآلاف $J(t)=\\frac{40t}{t^2+4}$ ($t$ بالأشهر). صف التمثيل.', 'The players of a game, in thousands, are $J(t)=\\frac{40t}{t^2+4}$ ($t$ in months). Describe the graph.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatua.', 'La derivada.', 'المشتقة.', 'The derivative.'), math: same("$J'(t)=\\frac{40(4-t^2)}{(t^2+4)^2}$") },
            { text: say('Gora $t=2$ arte, maximoa han.', 'Sube hasta $t=2$, máximo ahí.', 'تصعد حتى $t=2$، والعظمى هناك.', 'It rises up to $t=2$, the maximum there.'), math: same('$J(2)=\\frac{80}{8}=10$') },
            { text: say('Gero behera, zerorantz.', 'Después baja, hacia cero.', 'ثم تنزل نحو الصفر.', 'Then it falls, towards zero.'), math: same('$\\lim_{t\\to+\\infty}J(t)=0$') }
        ],
        takeaway: say('Grafiko bat deskribatzeko: hasierako balioa, noiz hazten eta jaisten den, maximoak eta minimoak (noiz eta zenbat) eta epe luzerako joera.', 'Para describir una gráfica: el valor inicial, cuándo crece y decrece, los máximos y mínimos (cuándo y cuánto) y la tendencia a largo plazo.', 'لوصف تمثيل: القيمة الأولى، ومتى يتزايد ويتناقص، والقيم العظمى والصغرى (متى وكم)، والاتجاه على المدى الطويل.', 'To describe a graph: the starting value, when it rises and falls, the maxima and minima (when and how much) and the long-run trend.'),
        figure: (language) => <DescribeFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'from-data',
        stage: 'reading',
        title: say('Datuetatik marraztu', 'Dibujar desde los datos', 'الرسم انطلاقًا من المعطيات', 'Drawing from data'),
        goal: say('Datu batzuk (asintotak, puntuak, zeinuak) betetzen dituen grafiko bat marraztea, eta formula bat aurkitzea.', 'Dibujar una gráfica que cumpla unos datos (asíntotas, puntos, signos) y hallar una fórmula.', 'رسم تمثيل يحقق معطيات (مقاربات، نقاط، إشارات) وإيجاد صيغة له.', 'Draw a graph that meets some data (asymptotes, points, signs) and find a formula.'),
        needs: [
            { unit: SKETCH2Z, topic: 'curve-from-data', title: { eu: 'Datuetatik kurbara', es: 'De los datos a la curva', en: 'From the data to the curve', ar: 'من المعطيات إلى المنحنى' } }
        ],
        problem: say('Funtzio batek asintota hauek ditu: $x=-1$ eta $y=3$; $Y$ ardatza $(0,1)$ puntuan mozten du. Aurkitu $f(x)=3+\\frac{k}{x+1}$ eredua.', 'Una función tiene asíntotas $x=-1$ e $y=3$ y corta al eje $Y$ en $(0,1)$. Halla el modelo $f(x)=3+\\frac{k}{x+1}$.', 'لدالة المقاربان $x=-1$ و$y=3$، وتقطع محور $Y$ عند $(0,1)$. أوجد النموذج $f(x)=3+\\frac{k}{x+1}$.', 'A function has asymptotes $x=-1$ and $y=3$ and cuts the $Y$ axis at $(0,1)$. Find the model $f(x)=3+\\frac{k}{x+1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntua ordezkatu.', 'Sustituye el punto.', 'عوّض النقطة.', 'Substitute the point.'), math: same('$f(0)=3+k=1$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.', 'Solve.'), math: same('$k=-2$') },
            { text: say('Eredua.', 'El modelo.', 'النموذج.', 'The model.'), math: same('$f(x)=3-\\frac{2}{x+1}$') }
        ],
        takeaway: say('Datuetatik marrazteko, lehenik asintotak eta puntuak jarri; gero adarrak lotu, zeinuak eta hazkundea errespetatuz. $k$ negatiboa bada, eskuineko adarra asintota horizontalaren azpian dago.', 'Para dibujar desde los datos, coloca primero asíntotas y puntos; después une las ramas respetando signos y crecimiento. Si $k$ es negativo, la rama derecha queda por debajo de la asíntota horizontal.', 'للرسم من المعطيات ضع أولًا المقاربات والنقاط، ثم صِل الفرعين مع احترام الإشارات والتزايد. وإذا كان $k$ سالبًا كان الفرع الأيمن تحت المقارب الأفقي.', 'To draw from data, place the asymptotes and points first; then join the branches respecting signs and increase. If $k$ is negative, the right branch stays below the horizontal asymptote.'),
        figure: (language) => <FromDataFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bach2gSketchTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bach2gSketchLessonTexts[topic.id as Bach2gSketchTopicId], ...bach2gSketchLessonChecks[topic.id as Bach2gSketchTopicId] }))
