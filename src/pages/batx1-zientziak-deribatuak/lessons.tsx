import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { localizeNames, same, say } from '../batx1-zientziak-funtzioak/text'
import { ChainFigure, CornerFigure, DerivativeGraphFigure, ExpTangentFigure, JumpSlopesFigure, ParallelTangentFigure, PowerRulesFigure, ProductAreaFigure, QuotientTangentFigure, SameSlopeFigure, SecantFigure, SecantsToTangentFigure, SinCosFigure, SmoothJoinFigure, TangentNormalFigure } from './figures'
import { bachDerivativesLessonChecks, type BachDerivativesTopicId } from './lessonChecks'
import { bachDerivativesLessonTexts } from './lessonTexts'

/* ==========================================================================
   Deribatuak · Batxilergoa 1 · Zientziak — stages and lessons. The scope
   follows unit 10 of Santillana 1.º Bachillerato Ciencias (the average
   rate, the derivative at a point with its tangent and normal, the
   derivative function, the rules and the table of derivatives) with
   unit 12 of Anaya Matemáticas I (the chain rule by name, the arc
   functions, tangents with conditions and parameters for a piecewise
   function to be differentiable). Monotony, extremes, curvature and
   optimisation are the next unit, Aplicaciones de la derivada: here a
   horizontal tangent is only f′ = 0. The average rate comes from 4. DBH
   académicas, limits from Límites and composition from Funciones; they
   are linked as «Review first».
   ========================================================================== */

export type BachDerivativesStageId = 'rate' | 'derivability' | 'function' | 'rules' | 'elementary'

export const bachDerivativesStages: UnitStage[] = [
    { id: 'rate', tone: 'blue', title: { eu: 'Aldakuntza-tasa', es: 'La tasa de variación', en: 'The rate of change', ar: 'معدل التغير' } },
    { id: 'derivability', tone: 'violet', title: { eu: 'Deribagarritasuna', es: 'Derivabilidad', en: 'Differentiability', ar: 'قابلية الاشتقاق' } },
    { id: 'function', tone: 'mustard', title: { eu: 'Funtzio deribatua', es: 'La función derivada', en: 'The derivative function', ar: 'الدالة المشتقة' } },
    { id: 'rules', tone: 'coral', title: { eu: 'Deribazio-erregelak', es: 'Reglas de derivación', en: 'Rules of differentiation', ar: 'قواعد الاشتقاق' } },
    { id: 'elementary', tone: 'green', title: { eu: 'Funtzio elementalak', es: 'Funciones elementales', en: 'Elementary functions', ar: 'الدوال الأساسية' } }
]

const LIMITS = 'batx1-zientziak/limites-continuidad'
const FUNCTIONS = 'batx1-zientziak/funciones'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. The rate of change ---------- */
    {
        id: 'average-rate',
        stage: 'rate',
        title: say('T.V.M. eta batez besteko abiadura', 'T.V.M. y velocidad media', 'معدل التغير المتوسط والسرعة المتوسطة', 'Average rate and average speed'),
        goal: say('Tarte batean T.V.M. kalkulatzea, ebakitzailearen malda gisa ikustea eta mugimendu batean batez besteko abiadura gisa ulertzea.', 'Calcular la T.V.M. en un intervalo, verla como la pendiente de la secante y entenderla en un movimiento como la velocidad media.', 'حساب معدل التغير المتوسط في فترة، ورؤيته ميلًا للقاطع، وفهمه في الحركة سرعةً متوسطة.', 'Work out the average rate of change over an interval, see it as the slope of the secant and understand it in a motion as the average speed.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'rate', title: { eu: 'Batez besteko aldakuntza-tasa', es: 'Tasa de variación media', en: 'Average rate of change', ar: 'معدل التغير المتوسط' } },
            { unit: 'dbh4-akademikoak/vectores-rectas', topic: 'slope', title: { eu: 'Zuzen baten malda', es: 'Pendiente de una recta', en: 'Slope of a straight line', ar: 'ميل المستقيم' } }
        ],
        problem: say('Harri batek $d(t)=5t^2$ metro egiten ditu $t$ segundotan. Zein da bere batez besteko abiadura $t=1$ eta $t=3$ artean?', 'Una piedra cae $d(t)=5t^2$ metros en $t$ segundos. ¿Cuál es su velocidad media entre $t=1$ y $t=3$?', 'يسقط حجر مسافة $d(t)=5t^2$ مترًا في $t$ ثانية. ما سرعته المتوسطة بين $t=1$ و$t=3$؟', 'A stone falls $d(t)=5t^2$ metres in $t$ seconds. What is its average speed between $t=1$ and $t=3$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturretako balioak.', 'Valores en los extremos.', 'القيمتان عند الطرفين.', 'Values at the ends.'), math: same('$d(1)=5\\qquad d(3)=45$') },
            { text: say('Ibilbidea zati denbora.', 'Recorrido entre tiempo.', 'المسافة على الزمن.', 'Distance over time.'), math: same('$\\frac{45-5}{3-1}=\\frac{40}{2}=20$') },
            { text: say('Batez besteko abiadura 20 m/s da.', 'La velocidad media es 20 m/s.', 'السرعة المتوسطة 20 م/ث.', 'The average speed is 20 m/s.') }
        ],
        takeaway: say('$[a,b]$ tarteko T.V.M. $\\frac{f(b)-f(a)}{b-a}$ da: bi puntuak lotzen dituen ebakitzailearen malda. $f$ posizio bat bada, batez besteko abiadura da.', 'La T.V.M. en $[a,b]$ es $\\frac{f(b)-f(a)}{b-a}$: la pendiente de la secante que une los dos puntos. Si $f$ es una posición, es la velocidad media.', 'معدل التغير المتوسط في $[a,b]$ هو $\\frac{f(b)-f(a)}{b-a}$: ميل القاطع الواصل بين النقطتين. وإذا كانت $f$ موضعًا فهو السرعة المتوسطة.', 'The average rate on $[a,b]$ is $\\frac{f(b)-f(a)}{b-a}$: the slope of the secant joining the two points. If $f$ is a position, it is the average speed.'),
        figure: (language) => <SecantFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'derivative-point',
        stage: 'rate',
        title: say('Deribatua puntu batean', 'Derivada en un punto', 'المشتقة عند نقطة', 'The derivative at a point'),
        goal: say('$f\'(a)$ definizioaren bidez kalkulatzea, $h$ txikiko tarteen T.V.M.-aren limite gisa, eta une bateko abiadura gisa ulertzea.', 'Calcular $f\'(a)$ con la definición, como el límite de la T.V.M. en intervalos de ancho $h$ cada vez menor, y entenderla como velocidad instantánea.', 'حساب $f\'(a)$ بالتعريف نهايةً لمعدل التغير المتوسط في فترات عرضها $h$ يصغر، وفهمها سرعةً لحظية.', 'Work out $f\'(a)$ from the definition, as the limit of the average rate over intervals of width $h$ that shrinks, and understand it as the instantaneous speed.'),
        needs: [
            { unit: LIMITS, topic: 'idea', title: { eu: 'Limitearen ideia', es: 'La idea de límite', en: 'The idea of a limit', ar: 'فكرة النهاية' } },
            { unit: LIMITS, topic: 'zero-zero', title: { eu: 'Zero zati zero: faktorizatu', es: 'Cero entre cero: factorizar', en: 'Zero over zero: factorising', ar: 'صفر على صفر: التحليل' } }
        ],
        problem: say('Kalkulatu $f\'(3)$ definizioaren bidez, $f(x)=x^2$ bada.', 'Calcula $f\'(3)$ con la definición para $f(x)=x^2$.', 'احسب $f\'(3)$ بالتعريف للدالة $f(x)=x^2$.', 'Work out $f\'(3)$ from the definition for $f(x)=x^2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$[3,\\,3+h]$ tarteko T.V.M.', 'La T.V.M. en $[3,\\,3+h]$.', 'معدل التغير المتوسط في $[3,\\,3+h]$.', 'The average rate on $[3,\\,3+h]$.'), math: same('$\\frac{(3+h)^2-9}{h}=\\frac{6h+h^2}{h}=6+h$') },
            { text: say('$h$ zero baliora eraman.', 'Haz que $h$ tienda a 0.', 'اجعل $h$ يؤول إلى 0.', 'Let $h$ go to 0.'), math: same('$f\'(3)=\\lim_{h\\to 0}(6+h)=6$') },
            { text: say('Malda 6 da $x=3$ puntuan.', 'La pendiente en $x=3$ es 6.', 'الميل عند $x=3$ يساوي 6.', 'The slope at $x=3$ is 6.') }
        ],
        takeaway: say('$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$: T.V.M.-aren limitea, tartea txikitzen denean. Une bateko aldakuntza-tasa da; mugimendu batean, une bateko abiadura.', '$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$: el límite de la T.V.M. cuando el intervalo se encoge. Es la tasa de variación instantánea; en un movimiento, la velocidad instantánea.', '$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$: نهاية معدل التغير المتوسط عندما تصغر الفترة. إنها معدل التغير اللحظي، وفي الحركة السرعة اللحظية.', '$f\'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$: the limit of the average rate as the interval shrinks. It is the instantaneous rate of change; in a motion, the instantaneous speed.'),
        figure: (language) => <SecantsToTangentFigure language={language} />
    },
    {
        id: 'tangent',
        stage: 'rate',
        title: say('Zuzen ukitzailea eta zuzen normala', 'Recta tangente y recta normal', 'المماس والمستقيم العمودي', 'Tangent and normal lines'),
        goal: say('$f\'(a)$ zuzen ukitzailearen malda dela erabiltzea, puntu batean zuzen ukitzailearen eta normalaren ekuazioak idazteko.', 'Usar que $f\'(a)$ es la pendiente de la tangente para escribir las ecuaciones de la recta tangente y de la normal en un punto.', 'استعمال أن $f\'(a)$ ميل المماس لكتابة معادلتي المماس والمستقيم العمودي عند نقطة.', 'Use that $f\'(a)$ is the slope of the tangent to write the equations of the tangent and normal lines at a point.'),
        needs: [
            { unit: 'dbh4-akademikoak/vectores-rectas', topic: 'parallel-perpendicular', title: { eu: 'Zuzen paraleloak eta perpendikularrak', es: 'Rectas paralelas y perpendiculares', en: 'Parallel and perpendicular straight lines', ar: 'المستقيمات المتوازية والمتعامدة' } }
        ],
        problem: say('Idatzi $f(x)=x^2$ funtzioaren zuzen ukitzailea eta normala $x=1$ puntuan, $f\'(1)=2$ dela jakinda.', 'Escribe la tangente y la normal a $f(x)=x^2$ en $x=1$, sabiendo que $f\'(1)=2$.', 'اكتب المماس والمستقيم العمودي للدالة $f(x)=x^2$ عند $x=1$ علمًا أن $f\'(1)=2$.', 'Write the tangent and the normal to $f(x)=x^2$ at $x=1$, knowing that $f\'(1)=2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntua: $f(1)=1$. Malda: 2.', 'El punto: $f(1)=1$. La pendiente: 2.', 'النقطة: $f(1)=1$. الميل: 2.', 'The point: $f(1)=1$. The slope: 2.') },
            { text: say('Zuzen ukitzailea.', 'La tangente.', 'المماس.', 'The tangent.'), math: same('$y-1=2(x-1)\\ \\to\\ y=2x-1$') },
            { text: say('Normala perpendikularra da: malda $-\\frac{1}{2}$.', 'La normal es perpendicular: pendiente $-\\frac{1}{2}$.', 'العمودي متعامد معه: ميله $-\\frac{1}{2}$.', 'The normal is perpendicular: slope $-\\frac{1}{2}$.'), math: same('$y-1=-\\frac{1}{2}(x-1)$') }
        ],
        takeaway: say('Zuzen ukitzailea $x=a$ puntuan: $y-f(a)=f\'(a)(x-a)$. Normala perpendikularra da, eta haren malda $-\\frac{1}{f\'(a)}$ da.', 'Tangente en $x=a$: $y-f(a)=f\'(a)(x-a)$. La normal es perpendicular, y su pendiente es $-\\frac{1}{f\'(a)}$.', 'المماس عند $x=a$: $y-f(a)=f\'(a)(x-a)$. والعمودي متعامد معه، وميله $-\\frac{1}{f\'(a)}$.', 'Tangent at $x=a$: $y-f(a)=f\'(a)(x-a)$. The normal is perpendicular, and its slope is $-\\frac{1}{f\'(a)}$.'),
        figure: (language) => <TangentNormalFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Differentiability ---------- */
    {
        id: 'one-sided-derivatives',
        stage: 'derivability',
        title: say('Alboko deribatuak eta puntak', 'Derivadas laterales y picos', 'المشتقتان الجانبيتان والزوايا', 'One-sided derivatives and corners'),
        goal: say('Ezkerreko eta eskuineko deribatuak kalkulatzea eta, desberdinak direnean, grafikoak punta bat egiten duela eta funtzioa ez dela deribagarria ikustea.', 'Calcular las derivadas por la izquierda y por la derecha y ver que, si son distintas, la gráfica hace un pico y la función no es derivable.', 'حساب المشتقتين من اليسار ومن اليمين، ورؤية أن الرسم يصنع زاوية والدالة غير قابلة للاشتقاق إذا اختلفتا.', 'Work out the derivatives from the left and from the right, and see that if they differ the graph has a corner and the function is not differentiable.'),
        needs: [
            { unit: LIMITS, topic: 'one-sided', title: { eu: 'Alboko limiteak', es: 'Límites laterales', en: 'One-sided limits', ar: 'النهايتان الجانبيتان' } },
            { unit: FUNCTIONS, topic: 'absolute', title: { eu: 'Funtzio baten balio absolutua', es: 'Valor absoluto de una función', en: 'Absolute value of a function', ar: 'القيمة المطلقة لدالة' } }
        ],
        problem: say('Deribagarria al da $f(x)=|x-2|$ funtzioa $x=2$ puntuan?', '¿Es derivable $f(x)=|x-2|$ en $x=2$?', 'هل الدالة $f(x)=|x-2|$ قابلة للاشتقاق عند $x=2$؟', 'Is $f(x)=|x-2|$ differentiable at $x=2$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerretik, $f(x)=2-x$.', 'Por la izquierda, $f(x)=2-x$.', 'من اليسار، $f(x)=2-x$.', 'From the left, $f(x)=2-x$.'), math: same('$f\'(2^-)=-1$') },
            { text: say('Eskuinetik, $f(x)=x-2$.', 'Por la derecha, $f(x)=x-2$.', 'من اليمين، $f(x)=x-2$.', 'From the right, $f(x)=x-2$.'), math: same('$f\'(2^+)=1$') },
            { text: say('Desberdinak dira: punta bat dago, eta ez da deribagarria 2 puntuan.', 'Son distintas: hay un pico y no es derivable en 2.', 'إنهما مختلفتان: توجد زاوية، والدالة غير قابلة للاشتقاق عند 2.', 'They are different: there is a corner, and it is not differentiable at 2.') }
        ],
        takeaway: say('$f$ deribagarria da $a$ puntuan alboko deribatuak, $f\'(a^-)$ eta $f\'(a^+)$, existitzen badira eta berdinak badira. Desberdinak badira, grafikoak punta bat egiten du.', '$f$ es derivable en $a$ si las derivadas laterales $f\'(a^-)$ y $f\'(a^+)$ existen y coinciden. Si son distintas, la gráfica hace un pico.', 'تكون $f$ قابلة للاشتقاق عند $a$ إذا وُجدت المشتقتان الجانبيتان $f\'(a^-)$ و$f\'(a^+)$ وتساوتا. وإذا اختلفتا صنع الرسم زاوية.', '$f$ is differentiable at $a$ if the one-sided derivatives $f\'(a^-)$ and $f\'(a^+)$ exist and are equal. If they differ, the graph has a corner.'),
        figure: (language) => <CornerFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'derivable-continuous',
        stage: 'derivability',
        title: say('Deribagarritasuna eta jarraitutasuna', 'Derivabilidad y continuidad', 'الاشتقاق والاتصال', 'Differentiability and continuity'),
        goal: say('Funtzio deribagarri bat jarraitua dela jakitea, eta alderantziz ez dela beti betetzen: jauzi batean ez dago deribaturik.', 'Saber que una función derivable es continua, y que al revés no siempre: donde hay un salto no hay derivada.', 'معرفة أن الدالة القابلة للاشتقاق متصلة، وأن العكس ليس صحيحًا دائمًا: حيث توجد قفزة لا توجد مشتقة.', 'Know that a differentiable function is continuous, and that the converse does not always hold: where there is a jump there is no derivative.'),
        needs: [
            { unit: LIMITS, topic: 'continuous', title: { eu: 'Funtzio jarraitua puntu batean', es: 'Función continua en un punto', en: 'A function continuous at a point', ar: 'الدالة المتصلة عند نقطة' } }
        ],
        problem: say('Funtzio honek zati bietan malda bera du. Deribagarria al da $x=1$ puntuan? $f(x)=\\begin{cases}x+1 & x<1\\\\ x+3 & x\\ge 1\\end{cases}$', 'Esta función tiene la misma pendiente en los dos trozos. ¿Es derivable en $x=1$? $f(x)=\\begin{cases}x+1 & x<1\\\\ x+3 & x\\ge 1\\end{cases}$', 'لهذه الدالة الميل نفسه في الجزأين. هل هي قابلة للاشتقاق عند $x=1$؟ $f(x)=\\begin{cases}x+1 & x<1\\\\ x+3 & x\\ge 1\\end{cases}$', 'This function has the same slope on both pieces. Is it differentiable at $x=1$? $f(x)=\\begin{cases}x+1 & x<1\\\\ x+3 & x\\ge 1\\end{cases}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenik, jarraitutasuna.', 'Primero, la continuidad.', 'أولًا، الاتصال.', 'First, continuity.'), math: same('$\\lim_{x\\to 1^-}f(x)=2\\qquad f(1)=4$') },
            { text: say('Ez da jarraitua: jauzi egiten du.', 'No es continua: da un salto.', 'ليست متصلة: تقفز.', 'It is not continuous: it jumps.') },
            { text: say('Jarraitua ez bada, ezin da deribagarria izan, nahiz eta zatien maldak berdinak izan.', 'Si no es continua, no puede ser derivable, aunque las pendientes de los trozos coincidan.', 'إذا لم تكن متصلة فلا يمكن أن تكون قابلة للاشتقاق، ولو تساوى ميلا الجزأين.', 'If it is not continuous, it cannot be differentiable, even though the slopes of the pieces are equal.') }
        ],
        takeaway: say('$f$ deribagarria bada $a$ puntuan, jarraitua da $a$ puntuan. Alderantziz ez: $|x|$ jarraitua da 0 puntuan, baina ez deribagarria. Lehenik jarraitutasuna begiratzen da.', 'Si $f$ es derivable en $a$, es continua en $a$. Al revés no: $|x|$ es continua en 0 pero no derivable. Primero se mira la continuidad.', 'إذا كانت $f$ قابلة للاشتقاق عند $a$ فهي متصلة عند $a$. والعكس لا: $|x|$ متصلة عند 0 لكنها غير قابلة للاشتقاق. ننظر إلى الاتصال أولًا.', 'If $f$ is differentiable at $a$, it is continuous at $a$. Not the other way round: $|x|$ is continuous at 0 but not differentiable. You look at continuity first.'),
        figure: (language) => <JumpSlopesFigure language={language} />
    },
    {
        id: 'piecewise-derivable',
        stage: 'derivability',
        title: say('Zatika definitutako funtzio deribagarriak', 'Funciones a trozos derivables', 'دوال معرّفة على أجزاء قابلة للاشتقاق', 'Differentiable piecewise functions'),
        goal: say('Zatika definitutako funtzio baten parametroak aurkitzea, lotunean jarraitua eta deribagarria izan dadin.', 'Hallar los parámetros de una función a trozos para que sea continua y derivable en la unión.', 'إيجاد وسائط دالة معرّفة على أجزاء كي تكون متصلة وقابلة للاشتقاق عند نقطة الالتقاء.', 'Find the parameters of a piecewise function so that it is continuous and differentiable where the pieces join.'),
        needs: [
            { unit: FUNCTIONS, topic: 'piecewise', title: { eu: 'Zatika definitutako funtzioak marraztea', es: 'Dibujar funciones a trozos', en: 'Drawing piecewise functions', ar: 'رسم الدوال المعرّفة على أجزاء' } }
        ],
        problem: say('Aurkitu $a$ eta $b$, funtzio hau $x=1$ puntuan deribagarria izan dadin: $f(x)=\\begin{cases}x^2+a & x<1\\\\ bx & x\\ge 1\\end{cases}$', 'Halla $a$ y $b$ para que esta función sea derivable en $x=1$: $f(x)=\\begin{cases}x^2+a & x<1\\\\ bx & x\\ge 1\\end{cases}$', 'أوجد $a$ و$b$ كي تكون هذه الدالة قابلة للاشتقاق عند $x=1$: $f(x)=\\begin{cases}x^2+a & x<1\\\\ bx & x\\ge 1\\end{cases}$', 'Find $a$ and $b$ so that this function is differentiable at $x=1$: $f(x)=\\begin{cases}x^2+a & x<1\\\\ bx & x\\ge 1\\end{cases}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jarraitua 1 puntuan: zatiak elkartu.', 'Continua en 1: los trozos se unen.', 'متصلة عند 1: يلتقي الجزآن.', 'Continuous at 1: the pieces meet.'), math: same('$1+a=b$') },
            { text: say('Malda bera 1 puntuan: $x^2$ funtzioaren malda $2x$ da.', 'Misma pendiente en 1: la de $x^2$ es $2x$.', 'الميل نفسه عند 1: ميل $x^2$ هو $2x$.', 'Same slope at 1: the slope of $x^2$ is $2x$.'), math: same('$2\\cdot 1=b$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$b=2\\qquad a=1$') }
        ],
        takeaway: say('Zatika definitutako funtzio bat lotunean deribagarria izateko, bi baldintza: zatiak elkartzea (jarraitutasuna) eta malda berarekin iristea (alboko deribatuak berdinak).', 'Para que una función a trozos sea derivable en la unión hacen falta dos condiciones: que los trozos se unan (continuidad) y que lleguen con la misma pendiente (derivadas laterales iguales).', 'لكي تكون دالة معرّفة على أجزاء قابلة للاشتقاق عند نقطة الالتقاء يلزم شرطان: أن يلتقي الجزآن (الاتصال) وأن يصلا بالميل نفسه (تساوي المشتقتين الجانبيتين).', 'For a piecewise function to be differentiable where the pieces join, two conditions are needed: the pieces meet (continuity) and they arrive with the same slope (equal one-sided derivatives).'),
        figure: (language) => <SmoothJoinFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. The derivative function ---------- */
    {
        id: 'definition',
        stage: 'function',
        title: say('Funtzio deribatua definizioaren bidez', 'La función derivada por la definición', 'الدالة المشتقة بالتعريف', 'The derivative function from the definition'),
        goal: say('$f\'(x)$ definizioaren bidez kalkulatzea, $x$ edozein izanik, eta funtzio berri bat dela ikustea: puntu bakoitzeko malda.', 'Calcular $f\'(x)$ con la definición para cualquier $x$ y ver que es una función nueva: la pendiente en cada punto.', 'حساب $f\'(x)$ بالتعريف لأي $x$، ورؤية أنها دالة جديدة: الميل عند كل نقطة.', 'Work out $f\'(x)$ from the definition for any $x$, and see that it is a new function: the slope at each point.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'simplify', title: { eu: 'Zatiki aljebraikoak sinplifikatzea', es: 'Simplificar fracciones algebraicas', en: 'Simplifying algebraic fractions', ar: 'تبسيط الكسور الجبرية' } }
        ],
        problem: say('Kalkulatu $f\'(x)$ definizioaren bidez, $f(x)=x^2+3x$ bada.', 'Halla $f\'(x)$ con la definición para $f(x)=x^2+3x$.', 'أوجد $f\'(x)$ بالتعريف للدالة $f(x)=x^2+3x$.', 'Find $f\'(x)$ from the definition for $f(x)=x^2+3x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Garatu $f(x+h)-f(x)$.', 'Desarrolla $f(x+h)-f(x)$.', 'انشر $f(x+h)-f(x)$.', 'Expand $f(x+h)-f(x)$.'), math: same('$\\begin{aligned}&(x+h)^2+3(x+h)-x^2-3x\\\\ &=2xh+h^2+3h\\end{aligned}$') },
            { text: say('Zatitu $h$ aldagaiaz.', 'Divide entre $h$.', 'اقسم على $h$.', 'Divide by $h$.'), math: same('$\\frac{2xh+h^2+3h}{h}=2x+h+3$') },
            { text: say('$h$ zero baliora eraman.', 'Haz que $h$ tienda a 0.', 'اجعل $h$ يؤول إلى 0.', 'Let $h$ go to 0.'), math: same('$f\'(x)=2x+3$') }
        ],
        takeaway: say('$f\'(x)=\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}$ funtzioak puntu bakoitzeko malda ematen du. Hartara, $f\'(a)$ ordezkatuz kalkulatzen da.', '$f\'(x)=\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}$ da la pendiente en cada punto. Con ella, $f\'(a)$ se calcula sustituyendo.', '$f\'(x)=\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}$ تعطي الميل عند كل نقطة. وبها تُحسب $f\'(a)$ بالتعويض.', '$f\'(x)=\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}$ gives the slope at each point. With it, $f\'(a)$ is found by substituting.'),
        figure: (language) => <DerivativeGraphFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'powers',
        stage: 'function',
        title: say('Berreturak eta erroak', 'Potencias y raíces', 'القوى والجذور', 'Powers and roots'),
        goal: say('Berreturak deribatzea, berretzailea edozein izanik, eta erroak eta zatikiak berretura gisa idaztea deribatu aurretik.', 'Derivar potencias con cualquier exponente, y escribir las raíces y las fracciones como potencias antes de derivar.', 'اشتقاق القوى بأي أس، وكتابة الجذور والكسور على صورة قوى قبل الاشتقاق.', 'Differentiate powers with any exponent, and write roots and fractions as powers before differentiating.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'fractional', title: { eu: 'Berretzaile zatikiak', es: 'Exponentes fraccionarios', en: 'Fractional exponents', ar: 'الأسس الكسرية' } }
        ],
        problem: say('Deribatu $f(x)=\\sqrt{x}$ eta $g(x)=\\frac{1}{x^2}$.', 'Deriva $f(x)=\\sqrt{x}$ y $g(x)=\\frac{1}{x^2}$.', 'اشتق $f(x)=\\sqrt{x}$ و$g(x)=\\frac{1}{x^2}$.', 'Differentiate $f(x)=\\sqrt{x}$ and $g(x)=\\frac{1}{x^2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi berretura gisa.', 'Escríbelas como potencias.', 'اكتبهما على صورة قوى.', 'Write them as powers.'), math: same('$\\sqrt{x}=x^{\\frac{1}{2}}\\qquad\\frac{1}{x^2}=x^{-2}$') },
            { text: say('Jaitsi berretzailea eta kendu 1.', 'Baja el exponente y réstale 1.', 'أنزل الأس واطرح منه 1.', 'Bring the exponent down and subtract 1.'), math: same('$f\'(x)=\\frac{1}{2}x^{-\\frac{1}{2}}=\\frac{1}{2\\sqrt{x}}$') },
            { text: say('Gauza bera $g$ funtzioarekin.', 'Lo mismo con $g$.', 'الأمر نفسه مع $g$.', 'The same with $g$.'), math: same('$g\'(x)=-2x^{-3}=-\\frac{2}{x^3}$') }
        ],
        takeaway: say('$(x^n)\'=n\\,x^{n-1}$, edozein berretzailerekin. Erroak eta $\\frac{1}{x^k}$ zatikiak berretura gisa idazten dira lehenik.', '$(x^n)\'=n\\,x^{n-1}$ con cualquier exponente. Las raíces y las fracciones $\\frac{1}{x^k}$ se escriben antes como potencias.', '$(x^n)\'=n\\,x^{n-1}$ بأي أس. وتُكتب الجذور والكسور $\\frac{1}{x^k}$ أولًا على صورة قوى.', '$(x^n)\'=n\\,x^{n-1}$ with any exponent. Roots and fractions $\\frac{1}{x^k}$ are written as powers first.'),
        figure: (language) => <PowerRulesFigure language={language} />
    },
    {
        id: 'sum-constant',
        stage: 'function',
        title: say('Batura eta konstante bat', 'Suma y constante', 'المجموع والثابت', 'Sum and constant'),
        goal: say('Polinomioak gaiz gai deribatzea, konstante batez biderkatutako funtzioak deribatzea eta konstante baten deribatua 0 dela jakitea.', 'Derivar polinomios término a término, derivar una función por una constante y saber que la derivada de una constante es 0.', 'اشتقاق الحدوديات حدًّا حدًّا، واشتقاق دالة مضروبة في ثابت، ومعرفة أن مشتقة الثابت 0.', 'Differentiate polynomials term by term, differentiate a function times a constant and know that the derivative of a constant is 0.'),
        problem: say('Deribatu $f(x)=4x^3-5x^2+7x-2$ eta kalkulatu $f\'(1)$.', 'Deriva $f(x)=4x^3-5x^2+7x-2$ y calcula $f\'(1)$.', 'اشتق $f(x)=4x^3-5x^2+7x-2$ واحسب $f\'(1)$.', 'Differentiate $f(x)=4x^3-5x^2+7x-2$ and work out $f\'(1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gai bakoitza bere aldetik; konstantea aurrean geratzen da, eta $-2$ desagertu egiten da.', 'Cada término por separado; la constante se queda delante y el $-2$ desaparece.', 'كل حد على حدة؛ يبقى الثابت في الأمام ويختفي $-2$.', 'Each term separately; the constant stays in front and the $-2$ disappears.'), math: same('$f\'(x)=12x^2-10x+7$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$f\'(1)=12-10+7=9$') }
        ],
        takeaway: say('$(f+g)\'=f\'+g\'$ eta $(k\\cdot f)\'=k\\cdot f\'$; konstante baten deribatua 0 da. Polinomio bat gaiz gai deribatzen da.', '$(f+g)\'=f\'+g\'$ y $(k\\cdot f)\'=k\\cdot f\'$; la derivada de una constante es 0. Un polinomio se deriva término a término.', '$(f+g)\'=f\'+g\'$ و$(k\\cdot f)\'=k\\cdot f\'$؛ ومشتقة الثابت 0. وتُشتق الحدودية حدًّا حدًّا.', '$(f+g)\'=f\'+g\'$ and $(k\\cdot f)\'=k\\cdot f\'$; the derivative of a constant is 0. A polynomial is differentiated term by term.'),
        figure: (language) => <SameSlopeFigure language={language} />
    },

    /* ---------- 4. Rules of differentiation ---------- */
    {
        id: 'product',
        stage: 'rules',
        title: say('Biderkaduraren deribatua', 'Derivada del producto', 'مشتقة الجداء', 'The product rule'),
        goal: say('Bi funtzioren biderkadura deribatzea, eta $(f\\cdot g)\'$ eta $f\'\\cdot g\'$ ez nahastea.', 'Derivar el producto de dos funciones, sin confundir $(f\\cdot g)\'$ con $f\'\\cdot g\'$.', 'اشتقاق جداء دالتين دون خلط $(f\\cdot g)\'$ بـ $f\'\\cdot g\'$.', 'Differentiate the product of two functions, without mixing up $(f\\cdot g)\'$ with $f\'\\cdot g\'$.'),
        problem: say('Deribatu $f(x)=(x^2+1)(3x-2)$.', 'Deriva $f(x)=(x^2+1)(3x-2)$.', 'اشتق $f(x)=(x^2+1)(3x-2)$.', 'Differentiate $f(x)=(x^2+1)(3x-2)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoaren deribatua bider bigarrena, gehi lehenengoa bider bigarrenaren deribatua.', 'La derivada del primero por el segundo, más el primero por la derivada del segundo.', 'مشتقة الأول في الثاني، زائد الأول في مشتقة الثاني.', 'The derivative of the first times the second, plus the first times the derivative of the second.'), math: same('$f\'(x)=2x(3x-2)+(x^2+1)\\cdot 3$') },
            { text: say('Eragin.', 'Opera.', 'بسّط.', 'Simplify.'), math: same('$f\'(x)=9x^2-4x+3$') }
        ],
        takeaway: say('$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$. Ez da $f\'\\cdot g\'$.', '$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$. No es $f\'\\cdot g\'$.', '$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$. وليست $f\'\\cdot g\'$.', '$(f\\cdot g)\'=f\'\\cdot g+f\\cdot g\'$. It is not $f\'\\cdot g\'$.'),
        figure: (language) => <ProductAreaFigure language={language} />
    },
    {
        id: 'quotient',
        stage: 'rules',
        title: say('Zatiduraren deribatua', 'Derivada del cociente', 'مشتقة خارج القسمة', 'The quotient rule'),
        goal: say('Bi funtzioren zatidura deribatzea, zenbakitzaileko zeinuak eta ordena zainduz.', 'Derivar el cociente de dos funciones, cuidando el orden y los signos del numerador.', 'اشتقاق خارج قسمة دالتين مع الانتباه إلى الترتيب والإشارات في البسط.', 'Differentiate the quotient of two functions, taking care of the order and the signs of the numerator.'),
        problem: say('Deribatu $f(x)=\\frac{2x+1}{x-3}$.', 'Deriva $f(x)=\\frac{2x+1}{x-3}$.', 'اشتق $f(x)=\\frac{2x+1}{x-3}$.', 'Differentiate $f(x)=\\frac{2x+1}{x-3}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Goikoaren deribatua bider behekoa, ken goikoa bider behekoaren deribatua, zati behekoa ber bi.', 'Derivada de arriba por abajo, menos arriba por derivada de abajo, entre abajo al cuadrado.', 'مشتقة البسط في المقام، ناقص البسط في مشتقة المقام، على مربع المقام.', 'Derivative of the top times the bottom, minus the top times the derivative of the bottom, over the bottom squared.'), math: same('$f\'(x)=\\frac{2(x-3)-(2x+1)\\cdot 1}{(x-3)^2}$') },
            { text: say('Zenbakitzailea sinplifikatu.', 'Simplifica el numerador.', 'بسّط البسط.', 'Simplify the numerator.'), math: same('$f\'(x)=\\frac{-7}{(x-3)^2}$') }
        ],
        takeaway: say('$\\left(\\frac{f}{g}\\right)\'=\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$. Ordenak garrantzia du: lehenik goikoaren deribatua.', '$\\left(\\frac{f}{g}\\right)\'=\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$. El orden importa: primero la derivada de arriba.', '$\\left(\\frac{f}{g}\\right)\'=\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$. الترتيب مهم: مشتقة البسط أولًا.', '$\\left(\\frac{f}{g}\\right)\'=\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$. The order matters: the derivative of the top first.'),
        figure: (language) => <QuotientTangentFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'chain',
        stage: 'rules',
        title: say('Katearen erregela', 'La regla de la cadena', 'قاعدة السلسلة', 'The chain rule'),
        goal: say('Funtzio konposatuak deribatzea: kanpokoaren deribatua, barrukoa ukitu gabe, bider barrukoaren deribatua.', 'Derivar funciones compuestas: la derivada de fuera, sin tocar lo de dentro, por la derivada de dentro.', 'اشتقاق الدوال المركبة: مشتقة الخارجية مع ترك الداخلية كما هي، في مشتقة الداخلية.', 'Differentiate composite functions: the derivative of the outside, leaving the inside alone, times the derivative of the inside.'),
        needs: [
            { unit: FUNCTIONS, topic: 'composition', title: { eu: 'Funtzioen konposizioa', es: 'Composición de funciones', en: 'Composition of functions', ar: 'تركيب الدوال' } }
        ],
        problem: say('Deribatu $f(x)=(x^2+3)^5$.', 'Deriva $f(x)=(x^2+3)^5$.', 'اشتق $f(x)=(x^2+3)^5$.', 'Differentiate $f(x)=(x^2+3)^5$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kanpoan, berretura bat; barruan, $x^2+3$.', 'Fuera, una potencia; dentro, $x^2+3$.', 'في الخارج قوة، وفي الداخل $x^2+3$.', 'Outside, a power; inside, $x^2+3$.') },
            { text: say('Deribatu kanpokoa, barrukoa bere horretan utzita.', 'Deriva la de fuera dejando dentro igual.', 'اشتق الخارجية واترك الداخل كما هو.', 'Differentiate the outside, leaving the inside as it is.'), math: same('$5(x^2+3)^4$') },
            { text: say('Biderkatu barrukoaren deribatuaz.', 'Multiplica por la derivada de dentro.', 'اضرب في مشتقة الداخلية.', 'Multiply by the derivative of the inside.'), math: same('$f\'(x)=5(x^2+3)^4\\cdot 2x=10x(x^2+3)^4$') }
        ],
        takeaway: say('$\\big(g(f(x))\\big)\'=g\'(f(x))\\cdot f\'(x)$: kanpokoaren deribatua, barrukoa ukitu gabe, bider barrukoaren deribatua.', '$\\big(g(f(x))\\big)\'=g\'(f(x))\\cdot f\'(x)$: la derivada de fuera, con lo de dentro sin tocar, por la derivada de dentro.', '$\\big(g(f(x))\\big)\'=g\'(f(x))\\cdot f\'(x)$: مشتقة الخارجية والداخل كما هو، في مشتقة الداخلية.', '$\\big(g(f(x))\\big)\'=g\'(f(x))\\cdot f\'(x)$: the derivative of the outside, with the inside untouched, times the derivative of the inside.'),
        figure: (language) => <ChainFigure language={language} />
    },

    /* ---------- 5. Elementary functions ---------- */
    {
        id: 'exp-log',
        stage: 'elementary',
        title: say('Esponentzialak eta logaritmoak', 'Exponenciales y logaritmos', 'الدوال الأسية واللوغاريتمية', 'Exponentials and logarithms'),
        goal: say('$e^x$, $a^x$, $\\ln x$ eta $\\log_a x$ deribatzea, eta katearen erregelarekin konbinatzea.', 'Derivar $e^x$, $a^x$, $\\ln x$ y $\\log_a x$, y combinarlas con la regla de la cadena.', 'اشتقاق $e^x$ و$a^x$ و$\\ln x$ و$\\log_a x$، وجمعها مع قاعدة السلسلة.', 'Differentiate $e^x$, $a^x$, $\\ln x$ and $\\log_a x$, and combine them with the chain rule.'),
        needs: [
            { unit: FUNCTIONS, topic: 'exp-log', title: { eu: 'Esponentziala eta logaritmoa, alderantzizkoak', es: 'Exponencial y logaritmo, inversas', en: 'Exponential and logarithm, inverses', ar: 'الأسية واللوغاريتمية دالتان عكسيتان' } }
        ],
        problem: say('Deribatu $f(x)=e^{3x}$ eta $g(x)=\\ln(x^2+1)$.', 'Deriva $f(x)=e^{3x}$ y $g(x)=\\ln(x^2+1)$.', 'اشتق $f(x)=e^{3x}$ و$g(x)=\\ln(x^2+1)$.', 'Differentiate $f(x)=e^{3x}$ and $g(x)=\\ln(x^2+1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$e^x$ funtzioaren deribatua bera da; barrukoa $3x$ da.', 'La derivada de $e^x$ es ella misma; dentro hay $3x$.', 'مشتقة $e^x$ هي نفسها؛ وفي الداخل $3x$.', 'The derivative of $e^x$ is itself; inside there is $3x$.'), math: same('$f\'(x)=e^{3x}\\cdot 3=3e^{3x}$') },
            { text: say('$\\ln$ funtzioarekin, barrukoaren deribatua zati barrukoa.', 'Con $\\ln$, la derivada de dentro entre lo de dentro.', 'مع $\\ln$، مشتقة الداخل على الداخل.', 'With $\\ln$, the derivative of the inside over the inside.'), math: same('$g\'(x)=\\frac{2x}{x^2+1}$') }
        ],
        takeaway: say('$(e^x)\'=e^x$, $(a^x)\'=a^x\\ln a$, $(\\ln x)\'=\\frac{1}{x}$ eta $(\\log_a x)\'=\\frac{1}{x\\ln a}$. Barruan zerbait badago, katearen erregela: $(e^{u})\'=e^{u}\\cdot u\'$ eta $(\\ln u)\'=\\frac{u\'}{u}$.', '$(e^x)\'=e^x$, $(a^x)\'=a^x\\ln a$, $(\\ln x)\'=\\frac{1}{x}$ y $(\\log_a x)\'=\\frac{1}{x\\ln a}$. Con algo dentro, la regla de la cadena: $(e^{u})\'=e^{u}\\cdot u\'$ y $(\\ln u)\'=\\frac{u\'}{u}$.', '$(e^x)\'=e^x$ و$(a^x)\'=a^x\\ln a$ و$(\\ln x)\'=\\frac{1}{x}$ و$(\\log_a x)\'=\\frac{1}{x\\ln a}$. وإذا كان في الداخل شيء فقاعدة السلسلة: $(e^{u})\'=e^{u}\\cdot u\'$ و$(\\ln u)\'=\\frac{u\'}{u}$.', '$(e^x)\'=e^x$, $(a^x)\'=a^x\\ln a$, $(\\ln x)\'=\\frac{1}{x}$ and $(\\log_a x)\'=\\frac{1}{x\\ln a}$. With something inside, the chain rule: $(e^{u})\'=e^{u}\\cdot u\'$ and $(\\ln u)\'=\\frac{u\'}{u}$.'),
        figure: (language) => <ExpTangentFigure language={language} />
    },
    {
        id: 'trig',
        stage: 'elementary',
        title: say('Trigonometrikoak eta arkuak', 'Trigonométricas y arcos', 'الدوال المثلثية ودوال القوس', 'Trigonometric and arc functions'),
        goal: say('Sinua, kosinua, tangentea eta arku-funtzioak deribatzea, katearen erregelarekin eta biderkaduraren erregelarekin batera.', 'Derivar seno, coseno, tangente y las funciones arco, junto con la regla de la cadena y la del producto.', 'اشتقاق الجيب وجيب التمام والظل ودوال القوس، مع قاعدتي السلسلة والجداء.', 'Differentiate sine, cosine, tangent and the arc functions, together with the chain rule and the product rule.'),
        needs: [
            { unit: FUNCTIONS, topic: 'arc', title: { eu: 'Arku-funtzioak', es: 'Funciones arco', en: 'Arc functions', ar: 'دوال القوس' } },
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'radians', title: { eu: 'Radiana', es: 'El radián', en: 'The radian', ar: 'الراديان' } }
        ],
        problem: say('Deribatu $f(x)=\\sin(2x)$ eta $g(x)=x\\cos x$.', 'Deriva $f(x)=\\sin(2x)$ y $g(x)=x\\cos x$.', 'اشتق $f(x)=\\sin(2x)$ و$g(x)=x\\cos x$.', 'Differentiate $f(x)=\\sin(2x)$ and $g(x)=x\\cos x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Katea: barruan $2x$.', 'Cadena: dentro hay $2x$.', 'السلسلة: في الداخل $2x$.', 'Chain: inside there is $2x$.'), math: same('$f\'(x)=\\cos(2x)\\cdot 2=2\\cos(2x)$') },
            { text: say('Biderkadura: $x$ eta $\\cos x$.', 'Producto: $x$ por $\\cos x$.', 'الجداء: $x$ في $\\cos x$.', 'Product: $x$ times $\\cos x$.'), math: same('$g\'(x)=\\cos x-x\\sin x$') }
        ],
        takeaway: say('$(\\sin x)\'=\\cos x$, $(\\cos x)\'=-\\sin x$ eta $(\\tan x)\'=1+\\tan^2 x$, $x$ radianetan. Arkuak: $(\\arcsin x)\'=\\frac{1}{\\sqrt{1-x^2}}$ eta $(\\arctan x)\'=\\frac{1}{1+x^2}$.', '$(\\sin x)\'=\\cos x$, $(\\cos x)\'=-\\sin x$ y $(\\tan x)\'=1+\\tan^2 x$, con $x$ en radianes. Arcos: $(\\arcsin x)\'=\\frac{1}{\\sqrt{1-x^2}}$ y $(\\arctan x)\'=\\frac{1}{1+x^2}$.', '$(\\sin x)\'=\\cos x$ و$(\\cos x)\'=-\\sin x$ و$(\\tan x)\'=1+\\tan^2 x$، و$x$ بالراديان. دوال القوس: $(\\arcsin x)\'=\\frac{1}{\\sqrt{1-x^2}}$ و$(\\arctan x)\'=\\frac{1}{1+x^2}$.', '$(\\sin x)\'=\\cos x$, $(\\cos x)\'=-\\sin x$ and $(\\tan x)\'=1+\\tan^2 x$, with $x$ in radians. Arcs: $(\\arcsin x)\'=\\frac{1}{\\sqrt{1-x^2}}$ and $(\\arctan x)\'=\\frac{1}{1+x^2}$.'),
        figure: (language) => <SinCosFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'tangent-conditions',
        stage: 'elementary',
        title: say('Baldintzak dituzten zuzen ukitzaileak', 'Tangentes con condiciones', 'مماسات بشروط', 'Tangents with conditions'),
        goal: say('Zuzen ukitzailea zein puntutan den aurkitzea, malda ematen dutenean: zuzen baten paraleloa edo horizontala.', 'Hallar en qué punto está la tangente cuando dan su pendiente: paralela a una recta u horizontal.', 'إيجاد النقطة التي يكون عندها المماس عندما يُعطى ميله: موازيًا لمستقيم أو أفقيًّا.', 'Find at which point the tangent is when its slope is given: parallel to a line or horizontal.'),
        problem: say('Zein puntutan da $f(x)=x^2-4x+1$ funtzioaren zuzen ukitzailea $y=2x+5$ zuzenaren paraleloa?', '¿En qué punto la tangente a $f(x)=x^2-4x+1$ es paralela a $y=2x+5$?', 'عند أي نقطة يكون مماس $f(x)=x^2-4x+1$ موازيًا للمستقيم $y=2x+5$؟', 'At which point is the tangent to $f(x)=x^2-4x+1$ parallel to $y=2x+5$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Paraleloa: malda bera, 2.', 'Paralela: la misma pendiente, 2.', 'موازٍ: الميل نفسه، 2.', 'Parallel: the same slope, 2.'), math: same('$f\'(x)=2x-4=2\\ \\to\\ x=3$') },
            { text: say('Puntua.', 'El punto.', 'النقطة.', 'The point.'), math: same('$f(3)=9-12+1=-2$') },
            { text: say('Zuzen ukitzailea $(3,\\,-2)$ puntuan.', 'La tangente en $(3,\\,-2)$.', 'المماس عند $(3,\\,-2)$.', 'The tangent at $(3,\\,-2)$.'), math: same('$y+2=2(x-3)\\ \\to\\ y=2x-8$') }
        ],
        takeaway: say('Malda $m$ ematen badute (zuzen baten paraleloa, edo horizontala $m=0$ denean), ebatzi $f\'(x)=m$ puntua aurkitzeko, eta gero idatzi zuzen ukitzailea.', 'Si dan la pendiente $m$ (paralela a una recta, u horizontal con $m=0$), resuelve $f\'(x)=m$ para hallar el punto, y después escribe la tangente.', 'إذا أُعطي الميل $m$ (موازٍ لمستقيم، أو أفقي مع $m=0$) فحلّ $f\'(x)=m$ لإيجاد النقطة، ثم اكتب المماس.', 'If the slope $m$ is given (parallel to a line, or horizontal with $m=0$), solve $f\'(x)=m$ to find the point, and then write the tangent.'),
        figure: (language) => <ParallelTangentFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts), in each language's trigonometric names */
export const bachDerivativesTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...localizeNames(bachDerivativesLessonTexts[topic.id as BachDerivativesTopicId]),
    ...localizeNames(bachDerivativesLessonChecks[topic.id as BachDerivativesTopicId])
}))
