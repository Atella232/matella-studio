import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { same, say } from '../batx1-zientziak-funtzioak/text'
import { AbsoluteFigure, AverageMinFigure, ExtremaFigure, GrowthContextFigure, IncomeMaxFigure, InflectionFigure, InflectionTangentFigure, IntervalsFigure, ParallelTangentFigure, ParametersFigure, ProfitMaxFigure, ReadGraphFigure, SecondSignFigure, SignFigure, TangentLineFigure } from './figures'
import { bach2gApplicationsLessonChecks, type Bach2gApplicationsTopicId } from './lessonChecks'
import { bach2gApplicationsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 2 · Gizarte Zientziak — stages
   and lessons. The scope follows unit 7 of Santillana 2.º Bachillerato
   Ciencias Sociales and unit 7 of Anaya Matemáticas Aplicadas a las CCSS
   II: the tangent line, increase and decrease, relative and absolute
   extrema (with parameters), curvature and inflection, and optimisation
   with the problems both books bring (the highest profit over some
   years, the lowest average cost, the highest income, a box). Without
   Rolle, the mean value theorem or L'Hôpital, which are not in the
   Sociales books (owner, 2026-11-17).
   ========================================================================== */

export type Bach2gApplicationsStageId = 'tangent' | 'growth' | 'extrema' | 'curvature' | 'optimization'

export const bach2gApplicationsStages: UnitStage[] = [
    { id: 'tangent', tone: 'blue', title: { eu: 'Zuzen ukitzailea', es: 'La recta tangente', en: 'The tangent line', ar: 'المماس' } },
    { id: 'growth', tone: 'violet', title: { eu: 'Hazkundea eta beherakada', es: 'Crecimiento y decrecimiento', en: 'Increase and decrease', ar: 'التزايد والتناقص' } },
    { id: 'extrema', tone: 'mustard', title: { eu: 'Maximoak eta minimoak', es: 'Máximos y mínimos', en: 'Maxima and minima', ar: 'القيم العظمى والصغرى' } },
    { id: 'curvature', tone: 'coral', title: { eu: 'Kurbadura', es: 'Curvatura', en: 'Curvature', ar: 'التقعّر' } },
    { id: 'optimization', tone: 'green', title: { eu: 'Optimizazioa', es: 'Optimización', en: 'Optimisation', ar: 'الاستمثال' } }
]

const APPLICATIONS1 = 'batx1-zientziak/aplicaciones-derivada'
const DERIVATIVES2 = 'batx2-gizarte/derivadas'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. The tangent line ---------- */
    {
        id: 'tangent-line',
        stage: 'tangent',
        title: say('Zuzen ukitzailea puntu batean', 'La recta tangente en un punto', 'المماس عند نقطة', 'The tangent line at a point'),
        goal: say('Kurba baten zuzen ukitzailearen ekuazioa idaztea puntu batean, eta testuinguruan interpretatzea.', 'Escribir la ecuación de la tangente a una curva en un punto e interpretarla en su contexto.', 'كتابة معادلة مماس منحنى عند نقطة وتفسيرها في سياقها.', 'Write the equation of the tangent to a curve at a point and read it in context.'),
        needs: [
            { unit: DERIVATIVES2, topic: 'tangent', title: { eu: 'Zuzen ukitzailea', es: 'La recta tangente', en: 'The tangent line', ar: 'المماس' } }
        ],
        problem: say('Idatzi $f(x)=x^3-3x+2$ kurbaren zuzen ukitzailea $x=2$ puntuan.', 'Escribe la tangente a $f(x)=x^3-3x+2$ en $x=2$.', 'اكتب مماس $f(x)=x^3-3x+2$ عند $x=2$.', 'Write the tangent to $f(x)=x^3-3x+2$ at $x=2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntua.', 'El punto.', 'النقطة.', 'The point.'), math: same('$f(2)=8-6+2=4$') },
            { text: say('Malda.', 'La pendiente.', 'الميل.', 'The slope.'), math: same("$f'(x)=3x^2-3\\ \\to\\ f'(2)=9$") },
            { text: say('Puntu-malda ekuazioa.', 'La ecuación punto-pendiente.', 'معادلة النقطة والميل.', 'The point-slope equation.'), math: same('$y-4=9(x-2)\\ \\to\\ y=9x-14$') }
        ],
        takeaway: say('$y-f(a)=f\'(a)(x-a)$. Puntu horren inguruan, zuzen ukitzaileak funtzioa ondo hurbiltzen du: hurrengo balioak aurreikusteko erabil daiteke.', '$y-f(a)=f\'(a)(x-a)$. Cerca de ese punto, la tangente aproxima bien la función: sirve para prever los valores siguientes.', '$y-f(a)=f\'(a)(x-a)$. قرب تلك النقطة يقرّب المماس الدالة جيدًا: ويصلح لتوقّع القيم التالية.', '$y-f(a)=f\'(a)(x-a)$. Near that point, the tangent approximates the function well: it can forecast the next values.'),
        figure: (language) => <TangentLineFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'parallel-tangent',
        stage: 'tangent',
        title: say('Zuzen baten paraleloa den ukitzailea', 'Tangente paralela a una recta', 'مماس مواز لمستقيم', 'Tangent parallel to a line'),
        goal: say('Kurbaren zein puntutan den zuzen ukitzailea zuzen jakin baten paraleloa aurkitzea: $f\'(x)$ zuzen horren malda da.', 'Hallar en qué punto de la curva la tangente es paralela a una recta dada: $f\'(x)$ vale la pendiente de esa recta.', 'إيجاد النقطة التي يكون فيها المماس موازيًا لمستقيم معلوم: $f\'(x)$ تساوي ميل ذلك المستقيم.', 'Find at which point of the curve the tangent is parallel to a given line: $f\'(x)$ equals the slope of that line.'),
        needs: [
            { unit: DERIVATIVES2, topic: 'powers', title: { eu: 'Berreturak, erroak eta baturak', es: 'Potencias, raíces y sumas', en: 'Powers, roots and sums', ar: 'القوى والجذور والمجاميع' } }
        ],
        problem: say('Zein puntutan da $f(x)=x^2-5x+1$ kurbaren zuzen ukitzailea $y=3x+2$ zuzenaren paraleloa?', '¿En qué punto la tangente a $f(x)=x^2-5x+1$ es paralela a $y=3x+2$?', 'عند أي نقطة يكون مماس $f(x)=x^2-5x+1$ موازيًا للمستقيم $y=3x+2$؟', 'At which point is the tangent to $f(x)=x^2-5x+1$ parallel to $y=3x+2$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zuzen paraleloek malda bera dute: 3.', 'Rectas paralelas tienen la misma pendiente: 3.', 'للمستقيمات المتوازية الميل نفسه: 3.', 'Parallel lines have the same slope: 3.'), math: same("$f'(x)=2x-5=3$") },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.', 'Solve.'), math: same('$x=4$') },
            { text: say('Puntua.', 'El punto.', 'النقطة.', 'The point.'), math: same('$f(4)=16-20+1=-3\\ \\to\\ (4,-3)$') }
        ],
        takeaway: say('Zuzen ukitzailea malda $m$ duen zuzen baten paraleloa izateko, $f\'(x)=m$ ebazten da. Zuzen horizontalaren kasuan, $m=0$.', 'Para que la tangente sea paralela a una recta de pendiente $m$, se resuelve $f\'(x)=m$. Si la recta es horizontal, $m=0$.', 'ليكون المماس موازيًا لمستقيم ميله $m$ نحل $f\'(x)=m$. وإذا كان المستقيم أفقيًا فإن $m=0$.', 'For the tangent to be parallel to a line of slope $m$, solve $f\'(x)=m$. If the line is horizontal, $m=0$.'),
        figure: (language) => <ParallelTangentFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'inflection-tangent',
        stage: 'tangent',
        title: say('Zuzen ukitzailea inflexio-puntuan', 'La tangente en el punto de inflexión', 'المماس عند نقطة الانعطاف', 'The tangent at the point of inflection'),
        goal: say('Inflexio-puntua aurkitzea ($f\'\'=0$) eta han zuzen ukitzailea idaztea: kurbak zeharkatu egiten du.', 'Hallar el punto de inflexión ($f\'\'=0$) y escribir allí la tangente: la curva la atraviesa.', 'إيجاد نقطة الانعطاف ($f\'\'=0$) وكتابة المماس فيها: يعبره المنحنى.', 'Find the point of inflection ($f\'\'=0$) and write the tangent there: the curve crosses it.'),
        needs: [
            { unit: DERIVATIVES2, topic: 'higher', title: { eu: 'Deribatu segidakoak', es: 'Derivadas sucesivas', en: 'Higher derivatives', ar: 'المشتقات المتتالية' } }
        ],
        problem: say('Idatzi $f(x)=x^3-6x^2+10x$ kurbaren zuzen ukitzailea haren inflexio-puntuan.', 'Escribe la tangente a $f(x)=x^3-6x^2+10x$ en su punto de inflexión.', 'اكتب مماس $f(x)=x^3-6x^2+10x$ عند نقطة انعطافه.', 'Write the tangent to $f(x)=x^3-6x^2+10x$ at its point of inflection.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Inflexioa: $f\'\'=0$.', 'Inflexión: $f\'\'=0$.', 'الانعطاف: $f\'\'=0$.', 'Inflection: $f\'\'=0$.'), math: same("$f''(x)=6x-12=0\\ \\to\\ x=2$") },
            { text: say('Puntua eta malda.', 'Punto y pendiente.', 'النقطة والميل.', 'Point and slope.'), math: same("$f(2)=8-24+20=4\\qquad f'(2)=12-24+10=-2$") },
            { text: say('Zuzena.', 'La recta.', 'المستقيم.', 'The line.'), math: same('$y-4=-2(x-2)\\ \\to\\ y=-2x+8$') }
        ],
        takeaway: say('Inflexio-puntuan, kurba zuzen ukitzailearen alde batetik bestera pasatzen da. Malda ($f\'$) hor maximoa edo minimoa da: salmenten hazkundea azkarrena den unea, adibidez.', 'En el punto de inflexión, la curva pasa de un lado de la tangente al otro. La pendiente ($f\'$) es ahí máxima o mínima: por ejemplo, el momento en que las ventas crecen más deprisa.', 'عند نقطة الانعطاف ينتقل المنحنى من جهة المماس إلى الأخرى. ويكون الميل ($f\'$) هناك أعظميًا أو أصغريًا: مثلًا لحظة أسرع نمو للمبيعات.', 'At the point of inflection, the curve passes from one side of the tangent to the other. The slope ($f\'$) is highest or lowest there: for example, the moment sales grow fastest.'),
        figure: (language) => <InflectionTangentFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Increase and decrease ---------- */
    {
        id: 'sign',
        stage: 'growth',
        title: say('Deribatuaren zeinua', 'El signo de la derivada', 'إشارة المشتقة', 'The sign of the derivative'),
        goal: say('Funtzio bat puntu batean gorakorra ala beherakorra den jakitea, $f\'$ deribatuaren zeinuarekin.', 'Saber si una función crece o decrece en un punto con el signo de $f\'$.', 'معرفة هل الدالة تتزايد أو تتناقص عند نقطة بإشارة $f\'$.', 'Tell whether a function increases or decreases at a point from the sign of $f\'$.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'sign-monotony', title: { eu: 'Deribatuaren zeinua eta hazkundea', es: 'Signo de la derivada y crecimiento', en: 'The sign of the derivative and growth', ar: 'إشارة المشتقة والتزايد' } }
        ],
        problem: say('$f(x)=x^3-12x$ gorakorra ala beherakorra da $x=1$ eta $x=3$ puntuetan?', '¿$f(x)=x^3-12x$ crece o decrece en $x=1$ y en $x=3$?', 'هل $f(x)=x^3-12x$ تتزايد أم تتناقص عند $x=1$ وعند $x=3$؟', 'Does $f(x)=x^3-12x$ increase or decrease at $x=1$ and at $x=3$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatua.', 'La derivada.', 'المشتقة.', 'The derivative.'), math: same("$f'(x)=3x^2-12$") },
            { text: say('$x=1$ puntuan negatiboa: beherakorra.', 'En $x=1$ es negativa: decrece.', 'سالبة عند $x=1$: متناقصة.', 'Negative at $x=1$: decreasing.'), math: same("$f'(1)=3-12=-9$") },
            { text: say('$x=3$ puntuan positiboa: gorakorra.', 'En $x=3$ es positiva: crece.', 'موجبة عند $x=3$: متزايدة.', 'Positive at $x=3$: increasing.'), math: same("$f'(3)=27-12=15$") }
        ],
        takeaway: say('$f\'(a)>0$ bada, $f$ gorakorra da $a$ puntuan; $f\'(a)<0$ bada, beherakorra. Zenbat eta handiagoa $|f\'(a)|$, orduan eta azkarrago aldatzen da.', 'Si $f\'(a)>0$, $f$ crece en $a$; si $f\'(a)<0$, decrece. Cuanto mayor es $|f\'(a)|$, más deprisa cambia.', 'إذا كان $f\'(a)>0$ فإن $f$ تتزايد عند $a$، وإذا كان $f\'(a)<0$ فهي تتناقص. وكلما كبر $|f\'(a)|$ كان التغير أسرع.', 'If $f\'(a)>0$, $f$ increases at $a$; if $f\'(a)<0$, it decreases. The larger $|f\'(a)|$ is, the faster it changes.'),
        figure: (language) => <SignFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'intervals',
        stage: 'growth',
        title: say('Hazkunde-tarteak', 'Intervalos de crecimiento', 'فترات التزايد والتناقص', 'Intervals of increase and decrease'),
        goal: say('Funtzio bat non hazten eta non jaisten den aztertzea, $f\'(x)=0$ ebatziz eta zeinu-taula eginez.', 'Estudiar dónde crece y dónde decrece una función resolviendo $f\'(x)=0$ y haciendo la tabla de signos.', 'دراسة أين تتزايد الدالة وأين تتناقص بحل $f\'(x)=0$ وإنشاء جدول الإشارات.', 'Study where a function increases and decreases by solving $f\'(x)=0$ and making the sign chart.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'intervals', title: { eu: 'Hazkunde-tarteak', es: 'Intervalos de crecimiento', en: 'Intervals of increase and decrease', ar: 'فترات التزايد والتناقص' } }
        ],
        problem: say('Aztertu $f(x)=x^3-3x^2$ funtzioaren hazkundea.', 'Estudia el crecimiento de $f(x)=x^3-3x^2$.', 'ادرس تزايد $f(x)=x^3-3x^2$.', 'Study the increase and decrease of $f(x)=x^3-3x^2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f\'(x)=0$ ebatzi.', 'Resuelve $f\'(x)=0$.', 'حُلّ $f\'(x)=0$.', 'Solve $f\'(x)=0$.'), math: same("$\\begin{gathered}f'(x)=3x^2-6x=3x(x-2)=0\\\\ x=0\\qquad x=2\\end{gathered}$") },
            { text: say('Zeinua tarte bakoitzean (proba-balio batekin).', 'El signo en cada intervalo (con un valor de prueba).', 'الإشارة في كل فترة (بقيمة اختبار).', 'The sign on each interval (with a test value).'), math: same("$f'(-1)=9\\qquad f'(1)=-3\\qquad f'(3)=9$") },
            { text: say('Gorakorra $(-\\infty,0)\\cup(2,+\\infty)$ tartean; beherakorra $(0,2)$ tartean.', 'Crece en $(-\\infty,0)\\cup(2,+\\infty)$; decrece en $(0,2)$.', 'متزايدة في $(-\\infty,0)\\cup(2,+\\infty)$ ومتناقصة في $(0,2)$.', 'Increasing on $(-\\infty,0)\\cup(2,+\\infty)$; decreasing on $(0,2)$.') }
        ],
        takeaway: say('$f\'(x)=0$ ebazten da (eta $f$ existitzen ez den puntuak gehitzen dira); puntu horiek zuzena tartetan zatitzen dute, eta tarte bakoitzean $f\'$ zeinua proba-balio batekin ikusten da.', 'Se resuelve $f\'(x)=0$ (y se añaden los puntos donde $f$ no existe); esos puntos parten la recta en intervalos, y en cada uno el signo de $f\'$ se ve con un valor de prueba.', 'نحل $f\'(x)=0$ (ونضيف النقاط التي لا توجد فيها $f$)؛ فتقسم تلك النقاط المستقيم إلى فترات، وفي كل فترة نرى إشارة $f\'$ بقيمة اختبار.', 'Solve $f\'(x)=0$ (and add the points where $f$ does not exist); those points split the line into intervals, and on each one the sign of $f\'$ is seen with a test value.'),
        figure: (language) => <IntervalsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'growth-context',
        stage: 'growth',
        title: say('Noiz hazten dira irabaziak?', '¿Cuándo crecen los beneficios?', 'متى تنمو الأرباح؟', 'When do profits grow?'),
        goal: say('Eredu ekonomiko batean magnitudea zein denbora-tartetan hazten eta jaisten den aztertzea, eta testuan azaltzea.', 'Estudiar en qué periodos crece y decrece una magnitud en un modelo económico, y contarlo con palabras.', 'دراسة الفترات التي يتزايد فيها مقدار ويتناقص في نموذج اقتصادي، وشرح ذلك بالكلمات.', 'Study in which periods a quantity grows and falls in an economic model, and tell it in words.'),
        problem: say('Enpresa baten irabaziak, milioitan, $B(t)=t^3-9t^2+24t$ dira, lehen 6 urteetan. Noiz hazten dira eta noiz jaisten?', 'Los beneficios de una empresa, en millones, son $B(t)=t^3-9t^2+24t$ en sus 6 primeros años. ¿Cuándo crecen y cuándo bajan?', 'أرباح شركة بالملايين هي $B(t)=t^3-9t^2+24t$ في سنواتها الست الأولى. متى تنمو ومتى تنخفض؟', 'A firm\'s profits, in millions, are $B(t)=t^3-9t^2+24t$ in its first 6 years. When do they grow and when do they fall?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatua eta haren zeroak.', 'La derivada y sus ceros.', 'المشتقة وأصفارها.', 'The derivative and its zeros.'), math: same("$B'(t)=3t^2-18t+24=3(t-2)(t-4)$") },
            { text: say('Zeinua.', 'El signo.', 'الإشارة.', 'The sign.'), math: same("$B'(1)=9\\qquad B'(3)=-3\\qquad B'(5)=9$") },
            { text: say('2. urtera arte hazten dira, 2. eta 4. urteen artean jaisten dira eta gero berriro hazten dira.', 'Crecen hasta el año 2, bajan entre los años 2 y 4 y después vuelven a crecer.', 'تنمو حتى السنة 2، وتنخفض بين السنتين 2 و4، ثم تعود إلى النمو.', 'They grow until year 2, fall between years 2 and 4 and then grow again.') }
        ],
        takeaway: say('Testuinguruan, zeinu-taula istorio bat da: $B\'>0$ den tarteetan irabaziak hazten dira, $B\'<0$ den tarteetan jaisten dira. Erantzuna denbora-unitateekin ematen da (urteak, hilabeteak…).', 'En contexto, la tabla de signos es una historia: donde $B\'>0$ los beneficios crecen, donde $B\'<0$ bajan. La respuesta se da con unidades de tiempo (años, meses…).', 'في السياق يكون جدول الإشارات حكاية: حيث $B\'>0$ تنمو الأرباح وحيث $B\'<0$ تنخفض. وتُعطى الإجابة بوحدات الزمن (سنوات، أشهر…).', 'In context, the sign chart is a story: where $B\'>0$ profits grow, where $B\'<0$ they fall. The answer is given in units of time (years, months…).'),
        figure: (language) => <GrowthContextFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. Maxima and minima ---------- */
    {
        id: 'relative',
        stage: 'extrema',
        title: say('Maximo eta minimo erlatiboak', 'Máximos y mínimos relativos', 'القيم العظمى والصغرى المحلية', 'Relative maxima and minima'),
        goal: say('Maximo eta minimo erlatiboak aurkitzea: $f\'=0$ den puntuak eta zeinu-aldaketa edo $f\'\'$ deribatuaren zeinua.', 'Hallar los máximos y mínimos relativos: los puntos con $f\'=0$ y el cambio de signo o el signo de $f\'\'$.', 'إيجاد القيم العظمى والصغرى المحلية: النقاط التي فيها $f\'=0$ وتغيّر الإشارة أو إشارة $f\'\'$.', 'Find the relative maxima and minima: the points with $f\'=0$ and the change of sign or the sign of $f\'\'$.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'singular-points', title: { eu: 'Puntu singularrak, maximoak eta minimoak', es: 'Puntos singulares y extremos relativos', en: 'Stationary points and local extrema', ar: 'النقاط الحرجة والقيم القصوى المحلية' } },
            { unit: APPLICATIONS1, topic: 'second-derivative', title: { eu: 'Bigarren deribatuaren irizpidea', es: 'Criterio de la segunda derivada', en: 'The second derivative test', ar: 'اختبار المشتقة الثانية' } }
        ],
        problem: say('Aurkitu $f(x)=2x^3-3x^2-12x$ funtzioaren maximo eta minimo erlatiboak.', 'Halla los máximos y mínimos relativos de $f(x)=2x^3-3x^2-12x$.', 'أوجد القيم العظمى والصغرى المحلية للدالة $f(x)=2x^3-3x^2-12x$.', 'Find the relative maxima and minima of $f(x)=2x^3-3x^2-12x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntu singularrak.', 'Los puntos singulares.', 'النقاط الحرجة.', 'The stationary points.'), math: same("$f'(x)=6x^2-6x-12=6(x+1)(x-2)=0$") },
            { text: say('Bigarren deribatua.', 'La segunda derivada.', 'المشتقة الثانية.', 'The second derivative.'), math: same("$f''(x)=12x-6\\qquad f''(-1)=-18\\qquad f''(2)=18$") },
            { text: say('$x=-1$ puntuan maximoa, $x=2$ puntuan minimoa.', 'Máximo en $x=-1$ y mínimo en $x=2$.', 'عظمى عند $x=-1$ وصغرى عند $x=2$.', 'A maximum at $x=-1$ and a minimum at $x=2$.'), math: same('$(-1,7)\\qquad(2,-20)$') }
        ],
        takeaway: say('Muturrak $f\'=0$ den puntuetan daude. $f\'$ positibotik negatibora pasatzen bada (edo $f\'\'<0$), maximoa da; negatibotik positibora (edo $f\'\'>0$), minimoa. $f\'=0$ izanik zeinuz aldatzen ez bada, ez da muturra.', 'Los extremos están donde $f\'=0$. Si $f\'$ pasa de positiva a negativa (o $f\'\'<0$), es un máximo; de negativa a positiva (o $f\'\'>0$), un mínimo. Si $f\'=0$ sin cambiar de signo, no es extremo.', 'تقع القيم القصوى حيث $f\'=0$. إذا انتقلت $f\'$ من موجبة إلى سالبة (أو $f\'\'<0$) فهي عظمى، ومن سالبة إلى موجبة (أو $f\'\'>0$) صغرى. وإذا كان $f\'=0$ دون تغيّر الإشارة فليست قيمة قصوى.', 'The extrema are where $f\'=0$. If $f\'$ goes from positive to negative (or $f\'\'<0$), it is a maximum; from negative to positive (or $f\'\'>0$), a minimum. If $f\'=0$ without a change of sign, it is not an extremum.'),
        figure: (language) => <ExtremaFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'absolute',
        stage: 'extrema',
        title: say('Maximo eta minimo absolutuak tarte batean', 'Máximo y mínimo absolutos en un intervalo', 'القيمتان العظمى والصغرى المطلقتان في فترة', 'Absolute maximum and minimum on an interval'),
        goal: say('Tarte itxi batean balio handiena eta txikiena aurkitzea: puntu singularrak eta muturrak alderatuz.', 'Hallar el valor mayor y el menor en un intervalo cerrado comparando los puntos singulares y los extremos.', 'إيجاد أكبر قيمة وأصغر قيمة في فترة مغلقة بمقارنة النقاط الحرجة والطرفين.', 'Find the largest and smallest value on a closed interval by comparing the stationary points and the ends.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'absolute-extremes', title: { eu: 'Maximo eta minimo absolutuak tarte batean', es: 'Máximo y mínimo absolutos en un intervalo', en: 'Absolute maximum and minimum on an interval', ar: 'القيمتان العظمى والصغرى المطلقتان في فترة' } }
        ],
        problem: say('Irabaziak $B(t)=t^3-9t^2+24t$ dira, $t\\in[0,6]$ urteetan. Noiz dira handienak eta zenbat?', 'Los beneficios son $B(t)=t^3-9t^2+24t$ con $t\\in[0,6]$ años. ¿Cuándo son máximos y cuánto?', 'الأرباح $B(t)=t^3-9t^2+24t$ مع $t\\in[0,6]$ سنوات. متى تكون أعظمية وكم؟', 'The profits are $B(t)=t^3-9t^2+24t$ with $t\\in[0,6]$ years. When are they highest and how much?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntu singularrak tartean: 2 eta 4.', 'Puntos singulares en el intervalo: 2 y 4.', 'النقاط الحرجة في الفترة: 2 و4.', 'Stationary points in the interval: 2 and 4.'), math: same('$B(2)=20\\qquad B(4)=16$') },
            { text: say('Muturrak.', 'Los extremos del intervalo.', 'طرفا الفترة.', 'The ends of the interval.'), math: same('$B(0)=0\\qquad B(6)=36$') },
            { text: say('Handiena 36 da, 6. urtean (muturrean); 2. urtekoa maximo erlatiboa baino ez da.', 'El mayor es 36, en el año 6 (en el extremo); el del año 2 es solo un máximo relativo.', 'الأكبر 36 في السنة 6 (عند الطرف)؛ وقيمة السنة 2 عظمى محلية فقط.', 'The highest is 36, in year 6 (at the end); that of year 2 is only a relative maximum.') }
        ],
        takeaway: say('Tarte itxi batean, balio absolutu handiena eta txikiena puntu singularretan edo tartearen muturretan daude. Denak kalkulatu eta alderatzen dira. Maximo erlatibo bat ez da beti absolutua.', 'En un intervalo cerrado, el mayor y el menor valor están en los puntos singulares o en los extremos del intervalo. Se calculan todos y se comparan. Un máximo relativo no siempre es absoluto.', 'في فترة مغلقة تقع أكبر قيمة وأصغر قيمة في النقاط الحرجة أو عند طرفي الفترة. نحسبها كلها ونقارن. والقيمة العظمى المحلية ليست دائمًا مطلقة.', 'On a closed interval, the largest and smallest values are at the stationary points or at the ends of the interval. Work them all out and compare. A relative maximum is not always absolute.'),
        figure: (language) => <AbsoluteFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'parameters',
        stage: 'extrema',
        title: say('Parametroak mutur batetik', 'Parámetros a partir de un extremo', 'الوسطاء من قيمة قصوى', 'Parameters from an extremum'),
        goal: say('Funtzio baten koefizienteak aurkitzea, puntu jakin batean maximoa edo minimoa izan dezan.', 'Hallar los coeficientes de una función para que tenga un máximo o un mínimo en un punto dado.', 'إيجاد معاملات دالة لتكون لها قيمة عظمى أو صغرى عند نقطة معلومة.', 'Find the coefficients of a function so that it has a maximum or minimum at a given point.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'extreme-coefficients', title: { eu: 'Koefizienteak muturretatik', es: 'Coeficientes a partir de los extremos', en: 'Coefficients from the extrema', ar: 'المعاملات من القيم القصوى' } }
        ],
        problem: say('Aurkitu $a$ eta $b$, $f(x)=x^2+ax+b$ funtzioak minimoa izan dezan $(3,1)$ puntuan.', 'Halla $a$ y $b$ para que $f(x)=x^2+ax+b$ tenga un mínimo en $(3,1)$.', 'أوجد $a$ و$b$ لتكون للدالة $f(x)=x^2+ax+b$ قيمة صغرى عند $(3,1)$.', 'Find $a$ and $b$ so that $f(x)=x^2+ax+b$ has a minimum at $(3,1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Mutur batean $f\'=0$.', 'En un extremo, $f\'=0$.', 'عند القيمة القصوى $f\'=0$.', 'At an extremum, $f\'=0$.'), math: same("$f'(3)=6+a=0\\ \\to\\ a=-6$") },
            { text: say('Puntua kurban dago.', 'El punto está en la curva.', 'النقطة على المنحنى.', 'The point is on the curve.'), math: same('$f(3)=9-18+b=1\\ \\to\\ b=10$') },
            { text: say('Egiaztatu: $f\'\'=2>0$, minimoa da.', 'Comprueba: $f\'\'=2>0$, es mínimo.', 'تحقّق: $f\'\'=2>0$ فهي صغرى.', 'Check: $f\'\'=2>0$, it is a minimum.') }
        ],
        takeaway: say('«Mutur bat $(p,q)$ puntuan» bi baldintza dira: $f\'(p)=0$ eta $f(p)=q$. Bi ekuazio, bi parametro. Azkenean, egiaztatu maximoa ala minimoa den.', '«Un extremo en $(p,q)$» son dos condiciones: $f\'(p)=0$ y $f(p)=q$. Dos ecuaciones, dos parámetros. Al final, comprueba si es máximo o mínimo.', '«قيمة قصوى عند $(p,q)$» تعني شرطين: $f\'(p)=0$ و$f(p)=q$. معادلتان لوسيطين. وفي النهاية تحقّق هل هي عظمى أم صغرى.', '«An extremum at $(p,q)$» is two conditions: $f\'(p)=0$ and $f(p)=q$. Two equations, two parameters. At the end, check whether it is a maximum or a minimum.'),
        figure: (language) => <ParametersFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Curvature ---------- */
    {
        id: 'second-sign',
        stage: 'curvature',
        title: say('Kurbadura: ahurra eta ganbila', 'Curvatura: cóncava y convexa', 'التقعّر نحو الأعلى ونحو الأسفل', 'Concave up and concave down'),
        goal: say('Kurba bat ahurra (∪) ala ganbila (∩) den jakitea, $f\'\'$ deribatuaren zeinuarekin.', 'Saber si una curva es cóncava (∪) o convexa (∩) con el signo de $f\'\'$.', 'معرفة هل المنحنى مقعّر نحو الأعلى (∪) أو نحو الأسفل (∩) بإشارة $f\'\'$.', 'Tell whether a curve is concave up (∪) or concave down (∩) from the sign of $f\'\'$.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'concavity', title: { eu: 'Kurbadura: ahurra eta ganbila', es: 'Curvatura: cóncava y convexa', en: 'Concave up and concave down', ar: 'التقعّر نحو الأعلى ونحو الأسفل' } }
        ],
        problem: say('Nolakoa da $f(x)=x^3-6x^2$ funtzioaren kurbadura?', '¿Cómo es la curvatura de $f(x)=x^3-6x^2$?', 'كيف تقعّر $f(x)=x^3-6x^2$؟', 'How is $f(x)=x^3-6x^2$ curved?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bigarren deribatua.', 'La segunda derivada.', 'المشتقة الثانية.', 'The second derivative.'), math: same("$f''(x)=6x-12$") },
            { text: say('Zero da $x=2$ puntuan.', 'Se anula en $x=2$.', 'تنعدم عند $x=2$.', 'It is 0 at $x=2$.'), math: same("$f''(0)=-12\\qquad f''(3)=6$") },
            { text: say('Ganbila (∩) $(-\\infty,2)$ tartean eta ahurra (∪) $(2,+\\infty)$ tartean.', 'Convexa (∩) en $(-\\infty,2)$ y cóncava (∪) en $(2,+\\infty)$.', 'مقعّرة نحو الأسفل (∩) في $(-\\infty,2)$ ونحو الأعلى (∪) في $(2,+\\infty)$.', 'Concave down (∩) on $(-\\infty,2)$ and concave up (∪) on $(2,+\\infty)$.') }
        ],
        takeaway: say('$f\'\'>0$ bada, kurba ahurra da (∪): maldak handitzen dira. $f\'\'<0$ bada, ganbila (∩): maldak txikitzen dira. Liburu batzuek izenak alderantziz erabiltzen dituzte; ∪ eta ∩ marrazkiak ez dira aldatzen.', 'Si $f\'\'>0$, la curva es cóncava (∪): las pendientes aumentan. Si $f\'\'<0$, convexa (∩): las pendientes disminuyen. Algunos libros usan los nombres al revés; los dibujos ∪ y ∩ no cambian.', 'إذا كان $f\'\'>0$ فالمنحنى مقعّر نحو الأعلى (∪): تزداد الميول. وإذا كان $f\'\'<0$ فهو مقعّر نحو الأسفل (∩): تتناقص الميول. وبعض الكتب تستعمل الأسماء بالعكس؛ أما الرسمان ∪ و∩ فلا يتغيران.', 'If $f\'\'>0$, the curve is concave up (∪): the slopes increase. If $f\'\'<0$, concave down (∩): the slopes decrease. Some books use the names the other way round; the drawings ∪ and ∩ do not change.'),
        figure: (language) => <SecondSignFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'inflection',
        stage: 'curvature',
        title: say('Inflexio-puntuak', 'Puntos de inflexión', 'نقاط الانعطاف', 'Points of inflection'),
        goal: say('Inflexio-puntuak aurkitzea, kurbadura aldatzen den tokiak, eta testuinguruan interpretatzea.', 'Hallar los puntos de inflexión, donde cambia la curvatura, e interpretarlos en contexto.', 'إيجاد نقاط الانعطاف حيث يتغير التقعّر وتفسيرها في السياق.', 'Find the points of inflection, where the curvature changes, and read them in context.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'inflection', title: { eu: 'Inflexio-puntuak', es: 'Puntos de inflexión', en: 'Points of inflection', ar: 'نقاط الانعطاف' } }
        ],
        problem: say('Produktu baten salmentak $V(t)=-t^3+9t^2$ dira (milakatan). Noiz hazten dira azkarren?', 'Las ventas de un producto son $V(t)=-t^3+9t^2$ (miles). ¿Cuándo crecen más deprisa?', 'مبيعات منتج $V(t)=-t^3+9t^2$ (بالآلاف). متى تنمو بأسرع ما يمكن؟', 'The sales of a product are $V(t)=-t^3+9t^2$ (thousands). When do they grow fastest?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hazkunde-erritmoa $V\'$ da; haren maximoa $V\'\'=0$ den tokian.', 'El ritmo de crecimiento es $V\'$; su máximo está donde $V\'\'=0$.', 'وتيرة النمو هي $V\'$؛ وأعظمها حيث $V\'\'=0$.', 'The rate of growth is $V\'$; its maximum is where $V\'\'=0$.'), math: same("$V''(t)=-6t+18=0\\ \\to\\ t=3$") },
            { text: say('Zeinua aldatzen da: inflexio-puntua.', 'Cambia de signo: punto de inflexión.', 'تتغير الإشارة: نقطة انعطاف.', 'It changes sign: a point of inflection.'), math: same("$V''(2)=6\\qquad V''(4)=-6$") },
            { text: say('3. hilabetean hazten dira azkarren: hilean 27 mila.', 'En el mes 3 crecen más deprisa: 27 mil al mes.', 'في الشهر 3 تنمو بأسرع ما يمكن: 27 ألفًا في الشهر.', 'In month 3 they grow fastest: 27 thousand a month.'), math: same("$V'(3)=-27+54=27$") }
        ],
        takeaway: say('Inflexio-puntu batean kurbadura aldatzen da: $f\'\'=0$ eta zeinuz aldatzen da. Han, $f\'$ maximoa edo minimoa da: hazkundea azkarrena (edo motelena) den unea.', 'En un punto de inflexión cambia la curvatura: $f\'\'=0$ y cambia de signo. Ahí $f\'$ es máxima o mínima: el momento en que el crecimiento es más rápido (o más lento).', 'في نقطة الانعطاف يتغير التقعّر: $f\'\'=0$ وتتغير إشارتها. وهناك تكون $f\'$ عظمى أو صغرى: لحظة أسرع نمو (أو أبطئه).', 'At a point of inflection the curvature changes: $f\'\'=0$ and it changes sign. There $f\'$ is highest or lowest: the moment growth is fastest (or slowest).'),
        figure: (language) => <InflectionFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'read-graph',
        stage: 'curvature',
        title: say('Deribatuaren grafikoa irakurtzea', 'Leer la gráfica de la derivada', 'قراءة تمثيل المشتقة', 'Reading the graph of the derivative'),
        goal: say('$f\'$ funtzioaren grafikotik $f$ funtzioa noiz hazten den, noiz duen muturra eta noiz aldatzen den kurbadura irakurtzea.', 'Leer en la gráfica de $f\'$ cuándo crece $f$, cuándo tiene un extremo y cuándo cambia su curvatura.', 'قراءة متى تتزايد $f$ ومتى لها قيمة قصوى ومتى يتغير تقعّرها من تمثيل $f\'$.', 'Read on the graph of $f\'$ when $f$ grows, when it has an extremum and when its curvature changes.'),
        problem: say('$f\'(x)=x^2-4$ deribatuaren grafikoa parabola bat da. Zer esaten du $f$ funtzioaz?', 'La gráfica de la derivada $f\'(x)=x^2-4$ es una parábola. ¿Qué dice de $f$?', 'تمثيل المشتقة $f\'(x)=x^2-4$ قطع مكافئ. ماذا يقول عن $f$؟', 'The graph of the derivative $f\'(x)=x^2-4$ is a parabola. What does it say about $f$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f\'$ ardatzaren azpian $(-2,2)$ tartean: hor $f$ jaisten da.', '$f\'$ está bajo el eje en $(-2,2)$: ahí $f$ baja.', '$f\'$ تحت المحور في $(-2,2)$: هناك تتناقص $f$.', '$f\'$ is below the axis on $(-2,2)$: there $f$ falls.') },
            { text: say('$f\'$ ardatza zeharkatzen du: $x=-2$ maximoa (+ → −) eta $x=2$ minimoa (− → +).', '$f\'$ cruza el eje: $x=-2$ máximo (+ → −) y $x=2$ mínimo (− → +).', '$f\'$ تقطع المحور: $x=-2$ عظمى (+ → −) و$x=2$ صغرى (− → +).', '$f\'$ crosses the axis: $x=-2$ a maximum (+ → −) and $x=2$ a minimum (− → +).') },
            { text: say('$f\'$ minimoa da $x=0$ puntuan: hor $f$ funtzioak inflexio-puntu bat du.', '$f\'$ es mínima en $x=0$: ahí $f$ tiene un punto de inflexión.', '$f\'$ صغرى عند $x=0$: هناك لـ $f$ نقطة انعطاف.', '$f\'$ is lowest at $x=0$: there $f$ has a point of inflection.') }
        ],
        takeaway: say('$f\'$ funtzioaren grafikoan: ardatzaren gainean, $f$ gorakorra; azpian, beherakorra; ardatza zeharkatzean, $f$ funtzioaren muturra; $f\'$ funtzioaren goiko edo beheko puntu batean, $f$ funtzioaren inflexioa.', 'En la gráfica de $f\'$: por encima del eje, $f$ crece; por debajo, decrece; donde cruza el eje, extremo de $f$; donde $f\'$ tiene un máximo o un mínimo, inflexión de $f$.', 'على تمثيل $f\'$: فوق المحور تتزايد $f$، وتحته تتناقص، وحيث تقطع المحور قيمة قصوى لـ $f$، وحيث تبلغ $f\'$ قمة أو قاعًا انعطاف لـ $f$.', 'On the graph of $f\'$: above the axis, $f$ rises; below, it falls; where it crosses the axis, an extremum of $f$; where $f\'$ tops or bottoms out, an inflection of $f$.'),
        figure: (language) => <ReadGraphFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Optimisation ---------- */
    {
        id: 'max-profit',
        stage: 'optimization',
        title: say('Irabazi handiena', 'El beneficio máximo', 'الربح الأعظمي', 'The highest profit'),
        goal: say('Irabazi-funtzioa, $B=I-C$, idaztea eta haren maximoa aurkitzea: zenbat unitate egin edo saldu.', 'Escribir la función beneficio, $B=I-C$, y hallar su máximo: cuántas unidades hacer o vender.', 'كتابة دالة الربح $B=I-C$ وإيجاد قيمتها العظمى: كم وحدة تُنتج أو تُباع.', 'Write the profit function, $B=I-C$, and find its maximum: how many units to make or sell.'),
        needs: [
            { unit: DERIVATIVES2, topic: 'marginal', title: { eu: 'Hurrengo unitatearen kostua', es: 'Lo que cuesta la unidad siguiente', en: 'What the next unit costs', ar: 'تكلفة الوحدة التالية' } }
        ],
        problem: say('Unitate bakoitza 50 eurotan saltzen da eta $x$ unitate egiteak $C(x)=x^2+10x+100$ euro balio du. Zenbat unitaterekin da irabazia handiena?', 'Cada unidad se vende a 50 € y hacer $x$ unidades cuesta $C(x)=x^2+10x+100$ euros. ¿Con cuántas unidades es máximo el beneficio?', 'تُباع كل وحدة بـ 50 € وتكلّف $x$ وحدة $C(x)=x^2+10x+100$ يورو. بكم وحدة يكون الربح أعظميًا؟', 'Each unit sells for €50 and making $x$ units costs $C(x)=x^2+10x+100$ euros. With how many units is the profit highest?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Irabazia: diru-sarrerak ken kostua.', 'Beneficio: ingresos menos coste.', 'الربح: الإيراد ناقص التكلفة.', 'Profit: income minus cost.'), math: same('$\\begin{gathered}B(x)=50x-(x^2+10x+100)\\\\ B(x)=-x^2+40x-100\\end{gathered}$') },
            { text: say('$B\'=0$.', '$B\'=0$.', '$B\'=0$.', '$B\'=0$.'), math: same("$B'(x)=-2x+40=0\\ \\to\\ x=20$") },
            { text: say('$B\'\'=-2<0$: maximoa. 20 unitaterekin 300 euro irabazten dira.', '$B\'\'=-2<0$: máximo. Con 20 unidades se ganan 300 €.', '$B\'\'=-2<0$: عظمى. مع 20 وحدة يُربح 300 €.', '$B\'\'=-2<0$: a maximum. With 20 units €300 is earned.'), math: same('$B(20)=-400+800-100=300$') }
        ],
        takeaway: say('Irabazia $B(x)=I(x)-C(x)$ da. Maximoa $B\'(x)=0$ den tokian dago, hau da, $I\'(x)=C\'(x)$: hurrengo unitateak ekartzen duena eta kostatzen duena berdinak direnean.', 'El beneficio es $B(x)=I(x)-C(x)$. El máximo está donde $B\'(x)=0$, es decir, $I\'(x)=C\'(x)$: cuando lo que aporta y lo que cuesta la unidad siguiente coinciden.', 'الربح $B(x)=I(x)-C(x)$. وأعظمه حيث $B\'(x)=0$ أي $I\'(x)=C\'(x)$: عندما يتساوى ما تضيفه الوحدة التالية وما تكلّفه.', 'The profit is $B(x)=I(x)-C(x)$. The maximum is where $B\'(x)=0$, that is, $I\'(x)=C\'(x)$: when what the next unit brings in and what it costs agree.'),
        figure: (language) => <ProfitMaxFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'min-average',
        stage: 'optimization',
        title: say('Batez besteko kosturik txikiena', 'El coste medio mínimo', 'أصغر متوسط تكلفة', 'The lowest average cost'),
        goal: say('Batez besteko kostua, $\\frac{C(x)}{x}$, minimoa den produkzioa aurkitzea.', 'Hallar la producción en la que el coste medio, $\\frac{C(x)}{x}$, es mínimo.', 'إيجاد الإنتاج الذي يكون فيه متوسط التكلفة $\\frac{C(x)}{x}$ أصغريًا.', 'Find the production at which the average cost, $\\frac{C(x)}{x}$, is lowest.'),
        problem: say('$C(x)=x^2+12x+400$ euro bada, zenbat unitaterekin da batez besteko kostua minimoa?', 'Si $C(x)=x^2+12x+400$ euros, ¿con cuántas unidades es mínimo el coste medio?', 'إذا كانت $C(x)=x^2+12x+400$ يورو، فبكم وحدة يكون متوسط التكلفة أصغريًا؟', 'If $C(x)=x^2+12x+400$ euros, with how many units is the average cost lowest?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez besteko kostua.', 'El coste medio.', 'متوسط التكلفة.', 'The average cost.'), math: same('$M(x)=x+12+\\frac{400}{x}$') },
            { text: say('$M\'=0$.', '$M\'=0$.', '$M\'=0$.', '$M\'=0$.'), math: same("$M'(x)=1-\\frac{400}{x^2}=0\\ \\to\\ x=20$") },
            { text: say('20 unitaterekin: unitateko 52 euro.', 'Con 20 unidades: 52 € por unidad.', 'مع 20 وحدة: 52 € للوحدة.', 'With 20 units: €52 per unit.'), math: same('$M(20)=20+12+20=52$') }
        ],
        takeaway: say('Batez besteko kostua $M(x)=\\frac{C(x)}{x}$ da. Haren minimoan, $M\'=0$, eta bertan batez besteko kostua eta hurrengo unitatearen kostua berdinak dira: $M(x)=C\'(x)$.', 'El coste medio es $M(x)=\\frac{C(x)}{x}$. En su mínimo, $M\'=0$, y ahí el coste medio y el de la unidad siguiente coinciden: $M(x)=C\'(x)$.', 'متوسط التكلفة $M(x)=\\frac{C(x)}{x}$. وفي أصغره $M\'=0$، وهناك يتساوى متوسط التكلفة وتكلفة الوحدة التالية: $M(x)=C\'(x)$.', 'The average cost is $M(x)=\\frac{C(x)}{x}$. At its minimum, $M\'=0$, and there the average cost and the cost of the next unit agree: $M(x)=C\'(x)$.'),
        figure: (language) => <AverageMinFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'max-income',
        stage: 'optimization',
        title: say('Diru-sarrera handiena eta beste problema batzuk', 'El ingreso máximo y otros problemas', 'الإيراد الأعظمي ومسائل أخرى', 'The highest income and other problems'),
        goal: say('Optimizazio-problema bat ebaztea: magnitudea aldagai bakarreko funtzio gisa idatzi, deribatu, berdindu zerora eta egiaztatu.', 'Resolver un problema de optimización: escribir la magnitud como función de una sola variable, derivar, igualar a cero y comprobar.', 'حل مسألة استمثال: كتابة المقدار دالةً لمتغير واحد، ثم الاشتقاق والمساواة بالصفر والتحقق.', 'Solve an optimisation problem: write the quantity as a function of one variable, differentiate, set to zero and check.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'contexts', title: { eu: 'Optimizazioa: mozkina eta distantzia', es: 'Optimización: beneficio y distancia', en: 'Optimisation: profit and distance', ar: 'الاستمثال: الربح والمسافة' } }
        ],
        problem: say('Kontzertu baterako sarrera 20 eurotan, 600 lagun joaten dira; euro bakoitzeko igoera, 20 lagun gutxiago. Zein preziorekin da diru-sarrera handiena?', 'A 20 € la entrada van 600 personas a un concierto; por cada euro que sube, 20 personas menos. ¿Con qué precio es máximo el ingreso?', 'بسعر 20 € للتذكرة يحضر 600 شخص حفلًا؛ ومع كل يورو زيادة يقل الحضور 20 شخصًا. بأي سعر يكون الإيراد أعظميًا؟', 'At €20 a ticket, 600 people go to a concert; for each euro more, 20 fewer people. At which price is the income highest?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x$ euroko igoerarekin, prezioa bider jendea.', 'Con una subida de $x$ euros, precio por personas.', 'مع زيادة $x$ يورو: السعر في عدد الأشخاص.', 'With a rise of $x$ euros, price times people.'), math: same('$I(x)=(20+x)(600-20x)$') },
            { text: say('Deribatu eta berdindu zerora.', 'Deriva e iguala a cero.', 'اشتق وساوِ بالصفر.', 'Differentiate and set to zero.'), math: same("$I'(x)=600-20x-20(20+x)=200-40x=0\\ \\to\\ x=5$") },
            { text: say('Prezioa 25 euro: 500 lagun eta 12 500 euro.', 'Precio 25 €: 500 personas y 12 500 €.', 'السعر 25 €: 500 شخص و12 500 €.', 'Price €25: 500 people and €12,500.'), math: same('$I(5)=25\\cdot 500=12\\,500$') }
        ],
        takeaway: say('Optimizazioan: (1) aldagaia aukeratu, (2) optimizatu beharrekoa aldagai horren funtzio gisa idatzi, (3) deribatu eta zerora berdindu, (4) maximoa edo minimoa den egiaztatu, eta (5) galderari erantzun bere unitateekin.', 'En optimización: (1) elige la variable, (2) escribe lo que hay que optimizar como función de ella, (3) deriva e iguala a cero, (4) comprueba si es máximo o mínimo y (5) contesta a la pregunta con sus unidades.', 'في الاستمثال: (1) اختر المتغير، (2) اكتب ما يُراد استمثاله دالةً له، (3) اشتق وساوِ بالصفر، (4) تحقّق هل هي عظمى أم صغرى، (5) أجب عن السؤال بوحداته.', 'In optimisation: (1) choose the variable, (2) write what is to be optimised as a function of it, (3) differentiate and set to zero, (4) check whether it is a maximum or minimum and (5) answer the question with its units.'),
        figure: (language) => <IncomeMaxFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bach2gApplicationsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bach2gApplicationsLessonTexts[topic.id as Bach2gApplicationsTopicId], ...bach2gApplicationsLessonChecks[topic.id as Bach2gApplicationsTopicId] }))
