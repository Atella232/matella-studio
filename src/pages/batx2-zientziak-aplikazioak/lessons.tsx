import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { localizeNames, same, say } from '../batx1-zientziak-funtzioak/text'
import { AbsoluteReviewFigure, AreasFigure, ContextsFigure, CurvatureReviewFigure, DistanceFigure, ExtremeConditionFigure, ExtremeTangentFigure, HopitalFigure, InflectionConditionFigure, MeanValueFigure, MonotonyReviewFigure, PowersFigure, ProductsFigure, RolleFigure, RootsFigure } from './figures'
import { bach2ApplicationsLessonChecks, type Bach2ApplicationsTopicId } from './lessonChecks'
import { bach2ApplicationsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 2 · Zientziak — stages and
   lessons. The scope follows unit 9 of Santillana 2.º Bachillerato
   Ciencias (extremes, concavity, optimisation, Rolle, the mean value and
   L'Hôpital with all its indeterminate forms) with unit 9 of Anaya
   Matemáticas II (counting roots with Bolzano and Rolle, f′ = 0 means
   constant) and the coefficient problems of the Basque EBAU. What 1.º
   Bachillerato already taught (monotony, concavity, absolute extremes)
   is a review stage of three lessons linked to its lessons; Cauchy's
   theorem only appears in «Why does it work?» of L'Hôpital, and full
   graphs are left to «Representación de funciones» (owner, 2026-11-10).
   ========================================================================== */

export type Bach2ApplicationsStageId = 'review' | 'rolle' | 'hopital' | 'conditions' | 'optimization'

export const bach2ApplicationsStages: UnitStage[] = [
    { id: 'review', tone: 'blue', title: { eu: 'Batxilergoko 1. mailako errepasoa', es: 'Repaso de 1.º de Bachillerato', en: 'Review of 1st Bachillerato', ar: 'مراجعة السنة الأولى من البكالوريا' } },
    { id: 'rolle', tone: 'violet', title: { eu: 'Rolle eta batez besteko balioa', es: 'Rolle y el valor medio', en: 'Rolle and the mean value', ar: 'رول والقيمة المتوسطة' } },
    { id: 'hopital', tone: 'mustard', title: { eu: 'L\'Hôpitalen erregela', es: 'La regla de L\'Hôpital', en: 'L\'Hôpital\'s rule', ar: 'قاعدة لوبيتال' } },
    { id: 'conditions', tone: 'coral', title: { eu: 'Koefizienteak baldintzekin', es: 'Coeficientes con condiciones', en: 'Coefficients with conditions', ar: 'معاملات بشروط' } },
    { id: 'optimization', tone: 'green', title: { eu: 'Optimizazioa', es: 'Optimización', en: 'Optimisation', ar: 'الاستمثال' } }
]

const APPLICATIONS1 = 'batx1-zientziak/aplicaciones-derivada'
const LIMITS1 = 'batx1-zientziak/limites-continuidad'
const LIMITS2 = 'batx2-zientziak/limites-continuidad'

const ABSOLUTE1 = { unit: APPLICATIONS1, topic: 'absolute-extremes', title: { eu: 'Maximo eta minimo absolutuak tarte batean', es: 'Máximo y mínimo absolutos en un intervalo', en: 'Absolute maximum and minimum on an interval', ar: 'القيمتان العظمى والصغرى المطلقتان في فترة' } }
const CONTEXTS1 = { unit: APPLICATIONS1, topic: 'contexts', title: { eu: 'Optimizazioa: mozkina eta distantzia', es: 'Optimización: beneficio y distancia', en: 'Optimisation: profit and distance', ar: 'الاستمثال: الربح والمسافة' } }

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Review of 1.º ---------- */
    {
        id: 'monotony-review',
        stage: 'review',
        title: say('Hazkundea eta muturrak: errepasoa', 'Crecimiento y extremos: repaso', 'التزايد والقيم القصوى: مراجعة', 'Increase and extrema: review'),
        goal: say('$f\'$ deribatuaren zeinuarekin hazkunde-tarteak eta mutur erlatiboak aurkitzea, 1. mailan bezala.', 'Hallar con el signo de $f\'$ los intervalos de crecimiento y los extremos relativos, como en 1.º.', 'إيجاد فترات التزايد والقيم القصوى المحلية بإشارة $f\'$، كما في السنة الأولى.', 'Find the intervals of increase and the local extrema with the sign of $f\'$, as in the first year.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'intervals', title: { eu: 'Hazkunde-tarteak', es: 'Intervalos de crecimiento', en: 'Intervals of increase and decrease', ar: 'فترات التزايد والتناقص' } },
            { unit: APPLICATIONS1, topic: 'singular-points', title: { eu: 'Puntu singularrak, maximoak eta minimoak', es: 'Puntos singulares y extremos relativos', en: 'Stationary points and local extrema', ar: 'النقاط الحرجة والقيم القصوى المحلية' } }
        ],
        problem: say('Aurkitu $f(x)=x\\,e^{-x}$ funtzioaren hazkunde-tarteak eta muturrak.', 'Halla los intervalos de crecimiento y los extremos de $f(x)=x\\,e^{-x}$.', 'أوجد فترات التزايد والقيم القصوى للدالة $f(x)=x\\,e^{-x}$.', 'Find the intervals of increase and the extrema of $f(x)=x\\,e^{-x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatu biderkaduraren erregelarekin eta atera faktore komuna.', 'Deriva con la regla del producto y saca factor común.', 'اشتق بقاعدة الجداء وأخرج العامل المشترك.', 'Differentiate with the product rule and take out the common factor.'), math: same('$f\'(x)=e^{-x}-x\\,e^{-x}=e^{-x}(1-x)$') },
            { text: say('$e^{-x}$ beti da positiboa: zeinua $1-x$ adierazpenak ematen du, eta zero da $x=1$ puntuan.', '$e^{-x}$ siempre es positivo: el signo lo da $1-x$, que se anula en $x=1$.', '$e^{-x}$ موجبة دائمًا: الإشارة تحددها $1-x$ التي تنعدم عند $x=1$.', '$e^{-x}$ is always positive: the sign comes from $1-x$, which is 0 at $x=1$.'), math: same('$\\begin{gathered}x<1\\ \\to\\ f\'>0\\ \\nearrow\\\\ x>1\\ \\to\\ f\'<0\\ \\searrow\\end{gathered}$') },
            { text: say('$x=1$ puntuan gorakorra izatetik beherakorra izatera pasatzen da: maximo bat dago.', 'En $x=1$ pasa de crecer a decrecer: hay un máximo.', 'عند $x=1$ تنتقل من التزايد إلى التناقص: توجد قيمة عظمى.', 'At $x=1$ it goes from increasing to decreasing: there is a maximum.'), math: same('$f(1)=e^{-1}=\\frac{1}{e}$') }
        ],
        takeaway: say('$f\'>0$ den tokian, $f$ gorakorra da; $f\'<0$ den tokian, beherakorra. Mutur erlatiboak $f\'$ deribatuak zeinua aldatzen duen tokian daude: $+$ zeinutik $-$ zeinura maximoa, $-$ zeinutik $+$ zeinura minimoa.', 'Donde $f\'>0$, $f$ crece; donde $f\'<0$, decrece. Los extremos relativos están donde $f\'$ cambia de signo: de $+$ a $-$ un máximo, de $-$ a $+$ un mínimo.', 'حيث $f\'>0$ تتزايد $f$، وحيث $f\'<0$ تتناقص. والقيم القصوى المحلية حيث تغيّر $f\'$ إشارتها: من $+$ إلى $-$ قيمة عظمى، ومن $-$ إلى $+$ قيمة صغرى.', 'Where $f\'>0$, $f$ increases; where $f\'<0$, it decreases. The local extrema are where $f\'$ changes sign: from $+$ to $-$ a maximum, from $-$ to $+$ a minimum.'),
        figure: (language) => <MonotonyReviewFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'curvature-review',
        stage: 'review',
        title: say('Kurbadura eta inflexioa: errepasoa', 'Curvatura e inflexión: repaso', 'التقعّر والانعطاف: مراجعة', 'Concavity and inflection: review'),
        goal: say('$f\'\'$ deribatuaren zeinuarekin kurbadura aztertzea eta inflexio-puntuak aurkitzea, 1. mailan bezala.', 'Estudiar la curvatura con el signo de $f\'\'$ y hallar los puntos de inflexión, como en 1.º.', 'دراسة التقعّر بإشارة $f\'\'$ وإيجاد نقاط الانعطاف، كما في السنة الأولى.', 'Study concavity with the sign of $f\'\'$ and find the points of inflection, as in the first year.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'concavity', title: { eu: 'Kurbadura: ahurra eta ganbila', es: 'Curvatura: cóncava y convexa', en: 'Concave up and concave down', ar: 'التقعّر نحو الأعلى ونحو الأسفل' } },
            { unit: APPLICATIONS1, topic: 'inflection', title: { eu: 'Inflexio-puntuak', es: 'Puntos de inflexión', en: 'Points of inflection', ar: 'نقاط الانعطاف' } }
        ],
        problem: say('Aztertu $f(x)=x^4-6x^2$ funtzioaren kurbadura eta aurkitu haren inflexio-puntuak.', 'Estudia la curvatura de $f(x)=x^4-6x^2$ y halla sus puntos de inflexión.', 'ادرس تقعّر $f(x)=x^4-6x^2$ وأوجد نقاط انعطافها.', 'Study the concavity of $f(x)=x^4-6x^2$ and find its points of inflection.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bigarren deribatua.', 'La segunda derivada.', 'المشتقة الثانية.', 'The second derivative.'), math: same('$\\begin{gathered}f\'(x)=4x^3-12x\\\\ f\'\'(x)=12x^2-12=12(x^2-1)\\end{gathered}$') },
            { text: say('$f\'\'$ deribatuak zeinua aldatzen du $x=-1$ eta $x=1$ puntuetan.', 'El signo de $f\'\'$ cambia en $x=-1$ y en $x=1$.', 'تتغير إشارة $f\'\'$ عند $x=-1$ وعند $x=1$.', 'The sign of $f\'\'$ changes at $x=-1$ and at $x=1$.'), math: same('$\\begin{gathered}|x|>1\\ \\to\\ f\'\'>0\\ \\cup\\\\ |x|<1\\ \\to\\ f\'\'<0\\ \\cap\\end{gathered}$') },
            { text: say('Biak dira inflexio-puntuak, altuera berean.', 'Los dos son puntos de inflexión, a la misma altura.', 'كلتاهما نقطة انعطاف، على الارتفاع نفسه.', 'Both are points of inflection, at the same height.'), math: same('$f(-1)=f(1)=1-6=-5$') }
        ],
        takeaway: say('$f\'\'>0$ den tokian kurba ahurra da ($\\cup$), eta $f\'\'<0$ den tokian ganbila ($\\cap$). Inflexio-puntua kurbadura aldatzen den puntua da: $f\'\'$ zero da eta zeinua aldatzen du.', 'Donde $f\'\'>0$ la curva es cóncava ($\\cup$) y donde $f\'\'<0$ es convexa ($\\cap$). Un punto de inflexión es donde cambia la curvatura: $f\'\'$ se anula y cambia de signo.', 'حيث $f\'\'>0$ يكون المنحنى مقعّرًا نحو الأعلى ($\\cup$)، وحيث $f\'\'<0$ يكون مقعّرًا نحو الأسفل ($\\cap$). ونقطة الانعطاف حيث يتغير التقعّر: تنعدم $f\'\'$ وتغيّر إشارتها.', 'Where $f\'\'>0$ the curve is concave up ($\\cup$) and where $f\'\'<0$ it is concave down ($\\cap$). A point of inflection is where the concavity changes: $f\'\'$ is 0 and changes sign.'),
        figure: (language) => <CurvatureReviewFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'absolute-review',
        stage: 'review',
        title: say('Mutur absolutuak tarte batean: errepasoa', 'Extremos absolutos en un intervalo: repaso', 'القيم القصوى المطلقة في فترة: مراجعة', 'Absolute extrema on an interval: review'),
        goal: say('Funtzio jarraitu baten maximo eta minimo absolutuak aurkitzea $[a,b]$ tartean, puntu singularrak eta tartearen muturrak alderatuz.', 'Hallar el máximo y el mínimo absolutos de una función continua en $[a,b]$, comparando los puntos singulares y los bordes del intervalo.', 'إيجاد القيمتين العظمى والصغرى المطلقتين لدالة متصلة على $[a,b]$، بمقارنة النقاط الحرجة وطرفي الفترة.', 'Find the absolute maximum and minimum of a continuous function on $[a,b]$, comparing the stationary points and the ends of the interval.'),
        needs: [
            ABSOLUTE1,
            { unit: LIMITS2, topic: 'weierstrass', title: { eu: 'Weierstrassen teorema', es: 'El teorema de Weierstrass', en: 'The Weierstrass theorem', ar: 'مبرهنة فايرشتراس' } }
        ],
        problem: say('Aurkitu $f(x)=2x^3-3x^2$ funtzioaren maximo eta minimo absolutuak $[-1,\\,2]$ tartean.', 'Halla el máximo y el mínimo absolutos de $f(x)=2x^3-3x^2$ en $[-1,\\,2]$.', 'أوجد القيمتين العظمى والصغرى المطلقتين للدالة $f(x)=2x^3-3x^2$ على $[-1,\\,2]$.', 'Find the absolute maximum and minimum of $f(x)=2x^3-3x^2$ on $[-1,\\,2]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Tarte barruko puntu singularrak.', 'Los puntos singulares dentro del intervalo.', 'النقاط الحرجة داخل الفترة.', 'The stationary points inside the interval.'), math: same('$\\begin{gathered}f\'(x)=6x^2-6x=6x(x-1)\\\\ x=0,\\ x=1\\end{gathered}$') },
            { text: say('Balioa puntu singularretan eta muturretan.', 'El valor en los singulares y en los bordes.', 'القيمة عند النقاط الحرجة وعند الطرفين.', 'The value at the stationary points and at the ends.'), math: same('$\\begin{gathered}f(-1)=-2-3=-5\\qquad f(0)=0\\\\ f(1)=2-3=-1\\qquad f(2)=16-12=4\\end{gathered}$') },
            { text: say('Balio handiena 4 da, $x=2$ puntuan, eta txikiena $-5$, $x=-1$ puntuan: biak muturretan daude.', 'El mayor valor es 4, en $x=2$, y el menor es $-5$, en $x=-1$: los dos están en los bordes.', 'أكبر قيمة 4 عند $x=2$، وأصغر قيمة $-5$ عند $x=-1$: كلتاهما عند الطرفين.', 'The largest value is 4, at $x=2$, and the smallest is $-5$, at $x=-1$: both are at the ends.') }
        ],
        takeaway: say('$f$ jarraitua bada $[a,b]$ tartean, maximo eta minimo absolutuak ditu (Weierstrass). Puntu singular batean edo mutur batean daude: $f$ kalkulatzen da guztietan eta balioak alderatzen dira.', 'Si $f$ es continua en $[a,b]$, tiene máximo y mínimo absolutos (Weierstrass). Están en un punto singular o en un borde: se calcula $f$ en todos ellos y se comparan los valores.', 'إذا كانت $f$ متصلة على $[a,b]$ فلها قيمة عظمى وقيمة صغرى مطلقتان (فايرشتراس). وتقعان عند نقطة حرجة أو عند طرف: نحسب $f$ عندها كلها ونقارن القيم.', 'If $f$ is continuous on $[a,b]$, it has an absolute maximum and minimum (Weierstrass). They are at a stationary point or at an end: work out $f$ at all of them and compare the values.'),
        figure: (language) => <AbsoluteReviewFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Rolle and the mean value ---------- */
    {
        id: 'rolle',
        stage: 'rolle',
        title: say('Rolleren teorema', 'El teorema de Rolle', 'مبرهنة رول', 'Rolle\'s theorem'),
        goal: say('Rolleren hiru hipotesiak egiaztatzea eta zuzen ukitzailea horizontala den $c$ puntua aurkitzea.', 'Comprobar las tres hipótesis de Rolle y hallar el punto $c$ donde la tangente es horizontal.', 'التحقق من فرضيات رول الثلاث وإيجاد النقطة $c$ التي يكون فيها المماس أفقيًّا.', 'Check the three hypotheses of Rolle and find the point $c$ where the tangent is horizontal.'),
        needs: [
            { unit: LIMITS2, topic: 'interval', title: { eu: 'Jarraitutasuna tarte batean', es: 'Continuidad en un intervalo', en: 'Continuity on an interval', ar: 'الاتصال على فترة' } },
            { unit: 'batx2-zientziak/derivadas', topic: 'corners', title: { eu: 'Deribagarria bada, jarraitua da', es: 'Derivable implica continua', en: 'Differentiable implies continuous', ar: 'قابلية الاشتقاق تقتضي الاتصال' } }
        ],
        problem: say('Egiaztatu $f(x)=x^2-4x+1$ funtzioak Rolleren teorema betetzen duela $[0,\\,4]$ tartean, eta aurkitu $c$.', 'Comprueba que $f(x)=x^2-4x+1$ cumple el teorema de Rolle en $[0,\\,4]$ y halla $c$.', 'تحقّق من أن $f(x)=x^2-4x+1$ تحقق مبرهنة رول على $[0,\\,4]$ وأوجد $c$.', 'Check that $f(x)=x^2-4x+1$ satisfies Rolle\'s theorem on $[0,\\,4]$ and find $c$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Polinomio bat da: jarraitua $[0,\\,4]$ tartean eta deribagarria $(0,\\,4)$ tartean.', 'Es un polinomio: continua en $[0,\\,4]$ y derivable en $(0,\\,4)$.', 'إنها حدودية: متصلة على $[0,\\,4]$ وقابلة للاشتقاق على $(0,\\,4)$.', 'It is a polynomial: continuous on $[0,\\,4]$ and differentiable on $(0,\\,4)$.') },
            { text: say('Tartearen muturrek altuera bera ematen dute.', 'Los bordes del intervalo dan la misma altura.', 'يعطي طرفا الفترة الارتفاع نفسه.', 'The ends of the interval give the same height.'), math: same('$f(0)=1\\qquad f(4)=16-16+1=1$') },
            { text: say('Bilatu zuzen ukitzaile horizontala.', 'Busca la tangente horizontal.', 'ابحث عن المماس الأفقي.', 'Look for the horizontal tangent.'), math: same('$f\'(c)=2c-4=0\\ \\to\\ c=2\\in(0,\\,4)$') }
        ],
        takeaway: say('Rolle: $f$ jarraitua bada $[a,b]$ tartean, deribagarria $(a,b)$ tartean eta $f(a)=f(b)$ bada, gutxienez $c\\in(a,b)$ bat dago $f\'(c)=0$ betetzen duena. Hipotesi bat betetzen ez bada, teoremak ez du ezer ziurtatzen.', 'Rolle: si $f$ es continua en $[a,b]$, derivable en $(a,b)$ y $f(a)=f(b)$, hay al menos un $c\\in(a,b)$ con $f\'(c)=0$. Si falla una hipótesis, el teorema no asegura nada.', 'رول: إذا كانت $f$ متصلة على $[a,b]$ وقابلة للاشتقاق على $(a,b)$ و$f(a)=f(b)$ فيوجد $c\\in(a,b)$ واحد على الأقل يحقق $f\'(c)=0$. وإذا سقطت فرضية فالمبرهنة لا تضمن شيئًا.', 'Rolle: if $f$ is continuous on $[a,b]$, differentiable on $(a,b)$ and $f(a)=f(b)$, there is at least one $c\\in(a,b)$ with $f\'(c)=0$. If a hypothesis fails, the theorem guarantees nothing.'),
        figure: (language) => <RolleFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'roots-count',
        stage: 'rolle',
        title: say('Zenbat erro: Bolzano eta Rolle', 'Cuántas raíces: Bolzano y Rolle', 'كم جذرًا: بولتسانو ورول', 'How many roots: Bolzano and Rolle'),
        goal: say('Ekuazio batek erro bakarra duela frogatzea: Bolzanok gutxienez bat ematen du eta Rollek bigarrena galarazten du.', 'Demostrar que una ecuación tiene exactamente una raíz: Bolzano da al menos una y Rolle impide la segunda.', 'إثبات أن لمعادلة جذرًا واحدًا بالضبط: يعطي بولتسانو جذرًا واحدًا على الأقل ويمنع رول وجود جذر ثانٍ.', 'Prove that an equation has exactly one root: Bolzano gives at least one and Rolle rules out a second.'),
        needs: [
            { unit: LIMITS2, topic: 'bolzano-equations', title: { eu: 'Bolzano: ekuazio batek soluzioa du', es: 'Bolzano: una ecuación tiene solución', en: 'Bolzano: an equation has a solution', ar: 'بولتسانو: للمعادلة حل' } }
        ],
        problem: say('Frogatu $x^3+3x-1=0$ ekuazioak erro erreal bakarra duela.', 'Demuestra que $x^3+3x-1=0$ tiene una única raíz real.', 'أثبت أن للمعادلة $x^3+3x-1=0$ جذرًا حقيقيًّا واحدًا فقط.', 'Prove that $x^3+3x-1=0$ has exactly one real root.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bolzano $[0,\\,1]$ tartean: gutxienez erro bat dago.', 'Bolzano en $[0,\\,1]$: hay al menos una raíz.', 'بولتسانو على $[0,\\,1]$: يوجد جذر واحد على الأقل.', 'Bolzano on $[0,\\,1]$: there is at least one root.'), math: same('$f(0)=-1<0\\qquad f(1)=3>0$') },
            { text: say('Deribatua ez da inoiz zero.', 'La derivada nunca se anula.', 'المشتقة لا تنعدم أبدًا.', 'The derivative is never 0.'), math: same('$f\'(x)=3x^2+3>0$') },
            { text: say('Bi erro baleude, $a<b$, Rollek $c$ bat emango luke, $f\'(c)=0$ betetzen duena: ezinezkoa. Bakarra dago.', 'Si hubiera dos raíces $a<b$, Rolle daría un $c$ con $f\'(c)=0$: imposible. Solo hay una.', 'لو وُجد جذران $a<b$ لأعطت مبرهنة رول قيمة $c$ تحقق $f\'(c)=0$: وهذا مستحيل. فهناك جذر واحد فقط.', 'If there were two roots $a<b$, Rolle would give a $c$ with $f\'(c)=0$: impossible. There is only one.') }
        ],
        takeaway: say('Bolzanok ziurtatzen du erroa dagoela; Rollek zenbat egon daitezkeen zenbatzen du: $f\'$ inoiz zero ez bada, $f$ funtzioak erro bat du gehienez. Oro har, $f\'$ deribatuak $k$ erro baditu, $f$ funtzioak $k+1$ ditu gehienez.', 'Bolzano asegura que hay raíz; Rolle cuenta cuántas puede haber: si $f\'$ no se anula nunca, $f$ tiene como mucho una raíz. En general, si $f\'$ tiene $k$ raíces, $f$ tiene como mucho $k+1$.', 'تضمن مبرهنة بولتسانو وجود جذر، وتعدّ مبرهنة رول كم جذرًا يمكن أن يوجد: إذا لم تنعدم $f\'$ أبدًا فللدالة $f$ جذر واحد على الأكثر. وعمومًا، إذا كان للمشتقة $f\'$ عدد $k$ من الجذور فللدالة $f$ على الأكثر $k+1$.', 'Bolzano guarantees there is a root; Rolle counts how many there can be: if $f\'$ is never 0, $f$ has at most one root. In general, if $f\'$ has $k$ roots, $f$ has at most $k+1$.'),
        figure: (language) => <RootsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'mean-value',
        stage: 'rolle',
        title: say('Batez besteko balioaren teorema', 'El teorema del valor medio', 'مبرهنة القيمة المتوسطة', 'The mean value theorem'),
        goal: say('Zuzen ukitzailea ebakitzailearen paraleloa den $c$ puntua aurkitzea, eta teorema erabiltzea jakiteko $f\'=0$ bada, $f$ konstantea dela.', 'Hallar el punto $c$ donde la tangente es paralela a la secante y usar el teorema para saber que si $f\'=0$, $f$ es constante.', 'إيجاد النقطة $c$ التي يكون فيها المماس موازيًا للقاطع، واستعمال المبرهنة لمعرفة أنه إذا كان $f\'=0$ فإن $f$ ثابتة.', 'Find the point $c$ where the tangent is parallel to the secant, and use the theorem to know that if $f\'=0$, $f$ is constant.'),
        needs: [
            { unit: 'batx1-zientziak/derivadas', topic: 'derivative-point', title: { eu: 'Deribatua puntu batean', es: 'Derivada en un punto', en: 'The derivative at a point', ar: 'المشتقة عند نقطة' } }
        ],
        problem: say('Aurkitu batez besteko balioaren teoremaren $c$ puntua, $f(x)=x^3$ funtziorako $[0,\\,3]$ tartean.', 'Halla el punto $c$ del teorema del valor medio para $f(x)=x^3$ en $[0,\\,3]$.', 'أوجد النقطة $c$ في مبرهنة القيمة المتوسطة للدالة $f(x)=x^3$ على $[0,\\,3]$.', 'Find the point $c$ of the mean value theorem for $f(x)=x^3$ on $[0,\\,3]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jarraitua eta deribagarria da: teoremak balio du. Ebakitzailearen malda.', 'Es continua y derivable: vale el teorema. La pendiente de la secante.', 'إنها متصلة وقابلة للاشتقاق: تصح المبرهنة. ميل القاطع.', 'It is continuous and differentiable: the theorem holds. The slope of the secant.'), math: same('$\\frac{f(3)-f(0)}{3-0}=\\frac{27}{3}=9$') },
            { text: say('Berdindu $c$ puntuko deribatuarekin.', 'Iguala a la derivada en $c$.', 'ساوِه بالمشتقة عند $c$.', 'Set it equal to the derivative at $c$.'), math: same('$f\'(c)=3c^2=9\\ \\to\\ c^2=3$') },
            { text: say('Tarte barruan dagoen erroak bakarrik balio du, $(0,\\,3)$ tartean dagoenak.', 'Solo vale la raíz que está dentro del intervalo, en $(0,\\,3)$.', 'لا يصلح إلا الجذر الواقع داخل الفترة، في $(0,\\,3)$.', 'Only the root inside the interval works, the one in $(0,\\,3)$.'), math: same('$c=\\sqrt{3}\\approx 1{,}73$') }
        ],
        takeaway: say('Batez besteko balioa: $f$ jarraitua bada $[a,b]$ tartean eta deribagarria $(a,b)$ tartean, $c\\in(a,b)$ bat dago $f\'(c)=\\frac{f(b)-f(a)}{b-a}$ betetzen duena: $c$ puntuko zuzen ukitzailea ebakitzailearen paraleloa da. Ondorioa: tarte batean $f\'=0$ bada, $f$ konstantea da bertan.', 'Valor medio: si $f$ es continua en $[a,b]$ y derivable en $(a,b)$, hay un $c\\in(a,b)$ con $f\'(c)=\\frac{f(b)-f(a)}{b-a}$: la tangente en $c$ es paralela a la secante. Consecuencia: si $f\'=0$ en un intervalo, $f$ es constante en él.', 'القيمة المتوسطة: إذا كانت $f$ متصلة على $[a,b]$ وقابلة للاشتقاق على $(a,b)$ فيوجد $c\\in(a,b)$ يحقق $f\'(c)=\\frac{f(b)-f(a)}{b-a}$: المماس عند $c$ موازٍ للقاطع. والنتيجة: إذا كان $f\'=0$ على فترة فإن $f$ ثابتة عليها.', 'Mean value: if $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, there is a $c\\in(a,b)$ with $f\'(c)=\\frac{f(b)-f(a)}{b-a}$: the tangent at $c$ is parallel to the secant. Consequence: if $f\'=0$ on an interval, $f$ is constant on it.'),
        figure: (language) => <MeanValueFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. L'Hôpital ---------- */
    {
        id: 'hopital',
        stage: 'hopital',
        title: say('L\'Hôpitalen erregela: zero zati zero eta infinitu zati infinitu', 'La regla de L\'Hôpital: cero entre cero e infinito entre infinito', 'قاعدة لوبيتال: صفر على صفر ولانهاية على لانهاية', 'L\'Hôpital\'s rule: zero over zero and infinity over infinity'),
        goal: say('$\\frac{0}{0}$ edo $\\frac{\\infty}{\\infty}$ limiteak kalkulatzea, zenbakitzailea eta izendatzailea bakoitza bere aldetik deribatuz.', 'Calcular límites $\\frac{0}{0}$ o $\\frac{\\infty}{\\infty}$ derivando el numerador y el denominador por separado.', 'حساب نهايات من النوع $\\frac{0}{0}$ أو $\\frac{\\infty}{\\infty}$ باشتقاق البسط والمقام كلٌّ على حدة.', 'Work out $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$ limits by differentiating the numerator and the denominator separately.'),
        needs: [
            { unit: LIMITS1, topic: 'zero-zero', title: { eu: 'Zero zati zero: faktorizatu', es: 'Cero entre cero: factorizar', en: 'Zero over zero: factorising', ar: 'صفر على صفر: التحليل' } },
            { unit: LIMITS2, topic: 'orders', title: { eu: 'Infinituak alderatzea', es: 'Comparar infinitos', en: 'Comparing infinities', ar: 'مقارنة اللانهايات' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to 0}\\frac{e^x-1-x}{x^2}$.', 'Calcula $\\lim_{x\\to 0}\\frac{e^x-1-x}{x^2}$.', 'احسب $\\lim_{x\\to 0}\\frac{e^x-1-x}{x^2}$.', 'Work out $\\lim_{x\\to 0}\\frac{e^x-1-x}{x^2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatuz $\\frac{0}{0}$ ateratzen da: deribatu goikoa eta behekoa bakoitza bere aldetik.', 'Sustituyendo sale $\\frac{0}{0}$: deriva arriba y abajo por separado.', 'بالتعويض نحصل على $\\frac{0}{0}$: اشتق البسط والمقام كلًّا على حدة.', 'Substituting gives $\\frac{0}{0}$: differentiate the top and the bottom separately.'), math: same('$\\lim_{x\\to 0}\\frac{e^x-1}{2x}$') },
            { text: say('Oraindik $\\frac{0}{0}$ da: aplikatu erregela berriro.', 'Sigue siendo $\\frac{0}{0}$: aplica la regla otra vez.', 'ما زالت $\\frac{0}{0}$: طبّق القاعدة مرة أخرى.', 'It is still $\\frac{0}{0}$: apply the rule again.'), math: same('$\\lim_{x\\to 0}\\frac{e^x}{2}=\\frac{1}{2}$') },
            { text: say('Jada ez da indeterminatua: limitea $\\frac{1}{2}$ da.', 'Ya no es indeterminado: el límite vale $\\frac{1}{2}$.', 'لم تعد غير معيّنة: النهاية $\\frac{1}{2}$.', 'It is no longer indeterminate: the limit is $\\frac{1}{2}$.') }
        ],
        takeaway: say('L\'Hôpital: $\\lim\\frac{f}{g}$ limitea $\\frac{0}{0}$ edo $\\frac{\\infty}{\\infty}$ bada, $\\lim\\frac{f}{g}=\\lim\\frac{f\'}{g\'}$, azken hori existitzen bada. Goikoa eta behekoa bakoitza bere aldetik deribatzen dira, zatiduraren erregelarik gabe, eta lehenago indeterminazioa egiaztatzen da.', 'L\'Hôpital: si $\\lim\\frac{f}{g}$ es $\\frac{0}{0}$ o $\\frac{\\infty}{\\infty}$, entonces $\\lim\\frac{f}{g}=\\lim\\frac{f\'}{g\'}$, si este existe. Se deriva arriba y abajo por separado, sin la regla del cociente, y antes se comprueba la indeterminación.', 'لوبيتال: إذا كانت $\\lim\\frac{f}{g}$ من النوع $\\frac{0}{0}$ أو $\\frac{\\infty}{\\infty}$ فإن $\\lim\\frac{f}{g}=\\lim\\frac{f\'}{g\'}$ إن وُجدت الأخيرة. نشتق البسط والمقام كلًّا على حدة، دون قاعدة خارج القسمة، ونتحقق قبل ذلك من عدم التعيين.', 'L\'Hôpital: if $\\lim\\frac{f}{g}$ is $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$, then $\\lim\\frac{f}{g}=\\lim\\frac{f\'}{g\'}$, if the latter exists. Differentiate the top and the bottom separately, without the quotient rule, and check the indeterminate form first.'),
        figure: (language) => <HopitalFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'hopital-products',
        stage: 'hopital',
        title: say('Zero bider infinitu eta infinitu ken infinitu', 'Cero por infinito e infinito menos infinito', 'صفر في لانهاية ولانهاية ناقص لانهاية', 'Zero times infinity and infinity minus infinity'),
        goal: say('$0\\cdot\\infty$ eta $\\infty-\\infty$ zatidura bihurtzea, L\'Hôpital aplikatu ahal izateko.', 'Convertir $0\\cdot\\infty$ y $\\infty-\\infty$ en un cociente para poder aplicar L\'Hôpital.', 'تحويل $0\\cdot\\infty$ و$\\infty-\\infty$ إلى خارج قسمة لتطبيق قاعدة لوبيتال.', 'Turn $0\\cdot\\infty$ and $\\infty-\\infty$ into a quotient so that L\'Hôpital can be applied.'),
        needs: [
            { unit: LIMITS1, topic: 'infinity-minus', title: { eu: 'Infinitu ken infinitu', es: 'Infinito menos infinito', en: 'Infinity minus infinity', ar: 'لانهاية ناقص لانهاية' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to 0^+}x\\ln x$.', 'Calcula $\\lim_{x\\to 0^+}x\\ln x$.', 'احسب $\\lim_{x\\to 0^+}x\\ln x$.', 'Work out $\\lim_{x\\to 0^+}x\\ln x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$0\\cdot(-\\infty)$ da: pasatu $x$ behera, $\\frac{1}{x}$ gisa.', 'Es $0\\cdot(-\\infty)$: pasa $x$ abajo como $\\frac{1}{x}$.', 'إنها $0\\cdot(-\\infty)$: أنزل $x$ إلى المقام على صورة $\\frac{1}{x}$.', 'It is $0\\cdot(-\\infty)$: move $x$ down as $\\frac{1}{x}$.'), math: same('$\\lim_{x\\to 0^+}\\frac{\\ln x}{1/x}$') },
            { text: say('Orain $\\frac{-\\infty}{\\infty}$ da: aplikatu L\'Hôpital.', 'Ahora es $\\frac{-\\infty}{\\infty}$: aplica L\'Hôpital.', 'الآن هي $\\frac{-\\infty}{\\infty}$: طبّق لوبيتال.', 'Now it is $\\frac{-\\infty}{\\infty}$: apply L\'Hôpital.'), math: same('$\\lim_{x\\to 0^+}\\frac{1/x}{-1/x^2}=\\lim_{x\\to 0^+}(-x)$') },
            { text: say('Limitea 0 da: $x$ azkarrago doa 0 baliora $\\ln x$ doana baino $-\\infty$ aldera.', 'El límite es 0: $x$ va a 0 más deprisa de lo que $\\ln x$ va a $-\\infty$.', 'النهاية 0: يؤول $x$ إلى 0 أسرع مما يؤول $\\ln x$ إلى $-\\infty$.', 'The limit is 0: $x$ goes to 0 faster than $\\ln x$ goes to $-\\infty$.') }
        ],
        takeaway: say('$0\\cdot\\infty$: $f\\cdot g=\\frac{f}{1/g}$ idazten da, eta $\\frac{0}{0}$ edo $\\frac{\\infty}{\\infty}$ geratzen da. $\\infty-\\infty$: izendatzaile komuna egiten da edo faktore komuna ateratzen da. Gero, L\'Hôpital.', '$0\\cdot\\infty$: se escribe $f\\cdot g=\\frac{f}{1/g}$ y queda $\\frac{0}{0}$ o $\\frac{\\infty}{\\infty}$. $\\infty-\\infty$: se hace común denominador o se saca factor común. Después, L\'Hôpital.', '$0\\cdot\\infty$: نكتب $f\\cdot g=\\frac{f}{1/g}$ فنحصل على $\\frac{0}{0}$ أو $\\frac{\\infty}{\\infty}$. $\\infty-\\infty$: نوحّد المقامات أو نخرج عاملًا مشتركًا. ثم نطبق لوبيتال.', '$0\\cdot\\infty$: write $f\\cdot g=\\frac{f}{1/g}$ and you get $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$. $\\infty-\\infty$: take a common denominator or a common factor. Then, L\'Hôpital.'),
        figure: (language) => <ProductsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'hopital-powers',
        stage: 'hopital',
        title: say('Berretura indeterminatuak eta logaritmoak', 'Potencias indeterminadas y logaritmos', 'القوى غير المعيّنة واللوغاريتمات', 'Indeterminate powers and logarithms'),
        goal: say('$1^\\infty$, $0^0$ eta $\\infty^0$ indeterminazioak ebaztea, logaritmoak hartuz eta amaieran logaritmoa deseginez.', 'Resolver las indeterminaciones $1^\\infty$, $0^0$ e $\\infty^0$ tomando logaritmos y deshaciendo el logaritmo al final.', 'حل حالات عدم التعيين $1^\\infty$ و$0^0$ و$\\infty^0$ بأخذ اللوغاريتم ثم التخلص منه في النهاية.', 'Solve the indeterminate forms $1^\\infty$, $0^0$ and $\\infty^0$ by taking logarithms and undoing the logarithm at the end.'),
        needs: [
            { unit: LIMITS1, topic: 'e-limits', title: { eu: 'Bat infinitura berretuta eta e zenbakia', es: 'Uno elevado a infinito y el número e', en: 'One to the power of infinity and the number e', ar: 'واحد أس لانهاية والعدد e' } },
            { unit: LIMITS2, topic: 'one-infinity', title: { eu: 'Bat infinitura berretuta, orokorrean', es: 'Uno elevado a infinito, en general', en: 'One to the power of infinity, in general', ar: 'واحد أس لانهاية بشكل عام' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to 0}(1+2x)^{1/x}$.', 'Calcula $\\lim_{x\\to 0}(1+2x)^{1/x}$.', 'احسب $\\lim_{x\\to 0}(1+2x)^{1/x}$.', 'Work out $\\lim_{x\\to 0}(1+2x)^{1/x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$1^\\infty$ da. Deitu $L$ limiteari eta hartu logaritmoak.', 'Es $1^\\infty$. Llama $L$ al límite y toma logaritmos.', 'إنها $1^\\infty$. سمِّ النهاية $L$ وخذ اللوغاريتم.', 'It is $1^\\infty$. Call the limit $L$ and take logarithms.'), math: same('$\\ln L=\\lim_{x\\to 0}\\frac{\\ln(1+2x)}{x}$') },
            { text: say('$\\frac{0}{0}$ da: aplikatu L\'Hôpital.', 'Es $\\frac{0}{0}$: aplica L\'Hôpital.', 'إنها $\\frac{0}{0}$: طبّق لوبيتال.', 'It is $\\frac{0}{0}$: apply L\'Hôpital.'), math: same('$\\ln L=\\lim_{x\\to 0}\\frac{2}{1+2x}=2$') },
            { text: say('Desegin logaritmoa.', 'Deshaz el logaritmo.', 'تخلّص من اللوغاريتم.', 'Undo the logarithm.'), math: same('$L=e^2\\approx 7{,}39$') }
        ],
        takeaway: say('$1^\\infty$, $0^0$ edo $\\infty^0$ denean, limiteari $L$ deitzen zaio, $\\ln L=\\lim g\\ln f$ kalkulatzen da ($0\\cdot\\infty$ bat) eta amaieran $L=e^{\\ln L}$.', 'Con $1^\\infty$, $0^0$ o $\\infty^0$, se llama $L$ al límite, se calcula $\\ln L=\\lim g\\ln f$ (un $0\\cdot\\infty$) y al final $L=e^{\\ln L}$.', 'مع $1^\\infty$ أو $0^0$ أو $\\infty^0$ نسمي النهاية $L$، ونحسب $\\ln L=\\lim g\\ln f$ (وهي من النوع $0\\cdot\\infty$)، وفي النهاية $L=e^{\\ln L}$.', 'With $1^\\infty$, $0^0$ or $\\infty^0$, call the limit $L$, work out $\\ln L=\\lim g\\ln f$ (a $0\\cdot\\infty$) and at the end $L=e^{\\ln L}$.'),
        figure: (language) => <PowersFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Coefficients with conditions ---------- */
    {
        id: 'extreme-condition',
        stage: 'conditions',
        title: say('Koefizienteak mutur batetik', 'Coeficientes con un extremo', 'المعاملات من قيمة قصوى', 'Coefficients from an extremum'),
        goal: say('«Mutur bat du $(x_0,y_0)$ puntuan» bi ekuaziotan idaztea, $f(x_0)=y_0$ eta $f\'(x_0)=0$, eta sistema ebaztea.', 'Traducir «tiene un extremo en $(x_0,y_0)$» en dos ecuaciones, $f(x_0)=y_0$ y $f\'(x_0)=0$, y resolver el sistema.', 'ترجمة «لها قيمة قصوى عند $(x_0,y_0)$» إلى معادلتين $f(x_0)=y_0$ و$f\'(x_0)=0$، وحل النظام.', 'Turn «it has an extremum at $(x_0,y_0)$» into two equations, $f(x_0)=y_0$ and $f\'(x_0)=0$, and solve the system.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'extreme-coefficients', title: { eu: 'Koefizienteak muturretatik', es: 'Coeficientes a partir de los extremos', en: 'Coefficients from the extrema', ar: 'المعاملات من القيم القصوى' } },
            { unit: APPLICATIONS1, topic: 'second-derivative', title: { eu: 'Bigarren deribatuaren irizpidea', es: 'Criterio de la segunda derivada', en: 'The second derivative test', ar: 'اختبار المشتقة الثانية' } }
        ],
        problem: say('$f(x)=ax^3+bx^2$ funtzioak mutur erlatibo bat du $(1,\\,1)$ puntuan. Aurkitu $a$ eta $b$, eta esan maximoa ala minimoa den.', 'La función $f(x)=ax^3+bx^2$ tiene un extremo relativo en $(1,\\,1)$. Halla $a$ y $b$, y di si es máximo o mínimo.', 'للدالة $f(x)=ax^3+bx^2$ قيمة قصوى محلية عند $(1,\\,1)$. أوجد $a$ و$b$، وبيّن هل هي عظمى أم صغرى.', 'The function $f(x)=ax^3+bx^2$ has a local extremum at $(1,\\,1)$. Find $a$ and $b$, and say whether it is a maximum or a minimum.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$(1,\\,1)$ puntutik igarotzen da.', 'Pasa por $(1,\\,1)$.', 'تمر بالنقطة $(1,\\,1)$.', 'It passes through $(1,\\,1)$.'), math: same('$f(1)=a+b=1$') },
            { text: say('Zuzen ukitzaile horizontala $x=1$ puntuan.', 'Tangente horizontal en $x=1$.', 'مماس أفقي عند $x=1$.', 'A horizontal tangent at $x=1$.'), math: same('$f\'(x)=3ax^2+2bx\\ \\to\\ f\'(1)=3a+2b=0$') },
            { text: say('Ebatzi sistema eta begiratu $f\'\'(1)$ deribatuaren zeinua: maximoa da.', 'Resuelve el sistema y mira el signo de $f\'\'(1)$: es un máximo.', 'حلّ النظام وانظر إلى إشارة $f\'\'(1)$: إنها قيمة عظمى.', 'Solve the system and look at the sign of $f\'\'(1)$: it is a maximum.'), math: same('$\\begin{gathered}a=-2\\qquad b=3\\\\ f\'\'(1)=6a+2b=-6<0\\end{gathered}$') }
        ],
        takeaway: say('Datu bakoitza ekuazio bat da: $(x_0,y_0)$ puntutik igarotzeak $f(x_0)=y_0$ ematen du, eta $x_0$ puntuan mutur bat izateak $f\'(x_0)=0$. Koefiziente adina ekuaziorekin sistema ebazten da; $f\'\'(x_0)$ deribatuaren zeinuak esaten du maximoa ala minimoa den.', 'Cada dato es una ecuación: pasar por $(x_0,y_0)$ da $f(x_0)=y_0$ y tener un extremo en $x_0$ da $f\'(x_0)=0$. Con tantas ecuaciones como coeficientes se resuelve el sistema; el signo de $f\'\'(x_0)$ dice si es máximo o mínimo.', 'كل معطى معادلة: المرور بالنقطة $(x_0,y_0)$ يعطي $f(x_0)=y_0$، ووجود قيمة قصوى عند $x_0$ يعطي $f\'(x_0)=0$. وبعدد من المعادلات يساوي عدد المعاملات نحل النظام؛ وتبيّن إشارة $f\'\'(x_0)$ هل هي عظمى أم صغرى.', 'Each fact is an equation: passing through $(x_0,y_0)$ gives $f(x_0)=y_0$, and having an extremum at $x_0$ gives $f\'(x_0)=0$. With as many equations as coefficients, solve the system; the sign of $f\'\'(x_0)$ says whether it is a maximum or a minimum.'),
        figure: (language) => <ExtremeConditionFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'inflection-condition',
        stage: 'conditions',
        title: say('Koefizienteak inflexio-puntu batetik', 'Coeficientes con una inflexión', 'المعاملات من نقطة انعطاف', 'Coefficients from an inflection'),
        goal: say('Inflexio-puntu batean $f\'\'=0$ dela erabiltzea, beste datuekin batera, koefizienteak aurkitzeko.', 'Usar que en un punto de inflexión $f\'\'=0$, junto con los demás datos, para hallar los coeficientes.', 'استعمال أن $f\'\'=0$ عند نقطة الانعطاف، مع المعطيات الأخرى، لإيجاد المعاملات.', 'Use that $f\'\'=0$ at a point of inflection, together with the other facts, to find the coefficients.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'inflection-coefficients', title: { eu: 'Koefizienteak inflexio-puntutik', es: 'Coeficientes con un punto de inflexión', en: 'Coefficients from a point of inflection', ar: 'المعاملات من نقطة الانعطاف' } }
        ],
        problem: say('$f(x)=x^3+ax^2+bx$ funtzioak inflexio-puntu bat du $(2,\\,-4)$ puntuan. Aurkitu $a$ eta $b$.', '$f(x)=x^3+ax^2+bx$ tiene un punto de inflexión en $(2,\\,-4)$. Halla $a$ y $b$.', 'للدالة $f(x)=x^3+ax^2+bx$ نقطة انعطاف عند $(2,\\,-4)$. أوجد $a$ و$b$.', '$f(x)=x^3+ax^2+bx$ has a point of inflection at $(2,\\,-4)$. Find $a$ and $b$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Inflexioa $x=2$ puntuan: bigarren deribatua zero da.', 'Inflexión en $x=2$: la segunda derivada se anula.', 'انعطاف عند $x=2$: تنعدم المشتقة الثانية.', 'Inflection at $x=2$: the second derivative is 0.'), math: same('$f\'\'(x)=6x+2a\\ \\to\\ 12+2a=0\\ \\to\\ a=-6$') },
            { text: say('$(2,\\,-4)$ puntutik igarotzen da.', 'Pasa por $(2,\\,-4)$.', 'تمر بالنقطة $(2,\\,-4)$.', 'It passes through $(2,\\,-4)$.'), math: same('$f(2)=8-24+2b=-4\\ \\to\\ b=6$') },
            { text: say('Egiaztatu: $f\'\'$ deribatuak zeinua aldatzen du $x=2$ puntuan, beraz inflexioa da.', 'Comprueba: $f\'\'$ cambia de signo en $x=2$, así que es una inflexión.', 'تحقّق: تغيّر $f\'\'$ إشارتها عند $x=2$، فهي نقطة انعطاف.', 'Check: $f\'\'$ changes sign at $x=2$, so it is an inflection.'), math: same('$f\'\'(x)=6x-12$') }
        ],
        takeaway: say('Inflexioa $(x_0,y_0)$ puntuan: bi ekuazio, $f\'\'(x_0)=0$ eta $f(x_0)=y_0$. Gainera han zuzen ukitzailea horizontala dela edo malda jakin bat duela esaten badute, $f\'(x_0)$ gehitzen da.', 'Inflexión en $(x_0,y_0)$: dos ecuaciones, $f\'\'(x_0)=0$ y $f(x_0)=y_0$. Si además dicen que la tangente allí es horizontal o tiene cierta pendiente, se añade $f\'(x_0)$.', 'انعطاف عند $(x_0,y_0)$: معادلتان $f\'\'(x_0)=0$ و$f(x_0)=y_0$. وإذا قيل أيضًا إن المماس هناك أفقي أو له ميل معيّن أضفنا $f\'(x_0)$.', 'Inflection at $(x_0,y_0)$: two equations, $f\'\'(x_0)=0$ and $f(x_0)=y_0$. If they also say that the tangent there is horizontal or has a given slope, add $f\'(x_0)$.'),
        figure: (language) => <InflectionConditionFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'extreme-tangent',
        stage: 'conditions',
        title: say('Muturra eta zuzen ukitzailea batera', 'Extremo y tangente a la vez', 'قيمة قصوى ومماس معًا', 'Extremum and tangent together'),
        goal: say('Mutur bat eta zuzen ukitzaile bat konbinatzea hiru koefiziente aurkitzeko: datu bakoitzak ekuazio bat edo bi ematen ditu.', 'Combinar un extremo y una tangente para hallar tres coeficientes: cada dato da una o dos ecuaciones.', 'الجمع بين قيمة قصوى ومماس لإيجاد ثلاثة معاملات: كل معطى يعطي معادلة أو اثنتين.', 'Combine an extremum and a tangent to find three coefficients: each fact gives one or two equations.'),
        needs: [
            { unit: 'batx2-zientziak/derivadas', topic: 'coefficients', title: { eu: 'Koefizienteak zuzen ukitzailetik', es: 'Coeficientes a partir de la tangente', en: 'Coefficients from the tangent', ar: 'المعاملات من المماس' } }
        ],
        problem: say('$f(x)=ax^3+bx+c$ funtzioak mutur erlatibo bat du $x=1$ puntuan, eta haren zuzen ukitzailea $x=0$ puntuan $y=-3x+2$ da. Aurkitu $a$, $b$ eta $c$.', '$f(x)=ax^3+bx+c$ tiene un extremo relativo en $x=1$, y su tangente en $x=0$ es $y=-3x+2$. Halla $a$, $b$ y $c$.', 'للدالة $f(x)=ax^3+bx+c$ قيمة قصوى محلية عند $x=1$، ومماسها عند $x=0$ هو $y=-3x+2$. أوجد $a$ و$b$ و$c$.', '$f(x)=ax^3+bx+c$ has a local extremum at $x=1$, and its tangent at $x=0$ is $y=-3x+2$. Find $a$, $b$ and $c$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('0 puntuko zuzen ukitzaileak bi datu ematen ditu: altuera eta malda.', 'La tangente en 0 da dos datos: la altura y la pendiente.', 'يعطي المماس عند 0 معطيين: الارتفاع والميل.', 'The tangent at 0 gives two facts: the height and the slope.'), math: same('$f(0)=c=2\\qquad f\'(0)=b=-3$') },
            { text: say('Muturra $x=1$ puntuan.', 'El extremo en $x=1$.', 'القيمة القصوى عند $x=1$.', 'The extremum at $x=1$.'), math: same('$f\'(1)=3a+b=0\\ \\to\\ a=1$') },
            { text: say('$f(x)=x^3-3x+2$ geratzen da, minimo batekin $x=1$ puntuan.', 'Queda $f(x)=x^3-3x+2$, con un mínimo en $x=1$.', 'تصير $f(x)=x^3-3x+2$ ولها قيمة صغرى عند $x=1$.', 'It becomes $f(x)=x^3-3x+2$, with a minimum at $x=1$.'), math: same('$f\'\'(1)=6>0$') }
        ],
        takeaway: say('Zuzen ukitzaile ezagun batek $x_0$ puntuan bi ekuazio ematen ditu: $f(x_0)$ zuzenaren altuera da eta $f\'(x_0)$ haren malda. Mutur batek $f\'=0$ ematen du eta inflexio batek $f\'\'=0$. Denak bildu eta sistema ebazten da.', 'Una tangente conocida en $x_0$ da dos ecuaciones: $f(x_0)$ es la altura de la recta y $f\'(x_0)$ su pendiente. Un extremo da $f\'=0$ y una inflexión $f\'\'=0$. Se reúnen todas y se resuelve el sistema.', 'المماس المعروف عند $x_0$ يعطي معادلتين: $f(x_0)$ ارتفاع المستقيم و$f\'(x_0)$ ميله. والقيمة القصوى تعطي $f\'=0$ والانعطاف يعطي $f\'\'=0$. نجمعها كلها ونحل النظام.', 'A known tangent at $x_0$ gives two equations: $f(x_0)$ is the height of the line and $f\'(x_0)$ its slope. An extremum gives $f\'=0$ and an inflection $f\'\'=0$. Put them all together and solve the system.'),
        figure: (language) => <ExtremeTangentFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Optimisation ---------- */
    {
        id: 'areas-volumes',
        stage: 'optimization',
        title: say('Optimizazioa: azalerak eta bolumenak', 'Optimización: áreas y volúmenes', 'الاستمثال: المساحات والحجوم', 'Optimisation: areas and volumes'),
        goal: say('Optimizatzen den funtzioa aldagai bakarrarekin planteatzea, enuntziatuaren baldintza erabiliz, eta aurkitutako puntua optimoa dela egiaztatzea.', 'Plantear la función que se optimiza con una sola variable, usando la condición del enunciado, y comprobar que el punto hallado es el óptimo.', 'كتابة الدالة المراد استمثالها بمتغير واحد باستعمال شرط النص، والتحقق من أن النقطة الناتجة هي الأمثل.', 'Set up the function to optimise in a single variable, using the condition in the statement, and check that the point found is the optimum.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'geometry', title: { eu: 'Optimizazio-problema geometrikoak', es: 'Problemas de optimización geométricos', en: 'Geometric optimisation problems', ar: 'مسائل الاستمثال الهندسية' } }
        ],
        problem: say('Estalkirik gabeko oinarri karratuko depositu batek $32\\ \\text{m}^3$ bolumena du. Zein neurrik erabiltzen dute xafla gutxien?', 'Un depósito sin tapa, de base cuadrada, tiene $32\\ \\text{m}^3$ de volumen. ¿Qué medidas gastan menos chapa?', 'خزان بلا غطاء قاعدته مربعة وحجمه $32\\ \\text{m}^3$. ما الأبعاد التي تستهلك أقل كمية من الصفيح؟', 'A tank with no lid and a square base has a volume of $32\\ \\text{m}^3$. Which dimensions use the least metal sheet?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarriaren aldea $x$ eta altuera $h$; baldintzarekin $h$ askatzen da.', 'Lado de la base $x$ y altura $h$; con la condición se despeja $h$.', 'ضلع القاعدة $x$ والارتفاع $h$؛ وبالشرط نستخرج $h$.', 'Side of the base $x$ and height $h$; the condition gives $h$.'), math: same('$x^2h=32\\ \\to\\ h=\\frac{32}{x^2}$') },
            { text: say('Azalera, aldagai bakarrarekin: oinarria eta lau alde.', 'La superficie, con una sola variable: la base y cuatro lados.', 'المساحة بمتغير واحد: القاعدة وأربعة جوانب.', 'The surface, with a single variable: the base and four sides.'), math: same('$S(x)=x^2+4xh=x^2+\\frac{128}{x}$') },
            { text: say('Deribatu eta berdindu 0 balioarekin: $x=4$ m eta $h=2$ m. $S\'\'(4)>0$ denez, minimoa da.', 'Deriva e iguala a 0: $x=4$ m y $h=2$ m. Como $S\'\'(4)>0$, es un mínimo.', 'اشتق وساوِ بالصفر: $x=4$ m و$h=2$ m. وبما أن $S\'\'(4)>0$ فهي قيمة صغرى.', 'Differentiate and set it equal to 0: $x=4$ m and $h=2$ m. Since $S\'\'(4)>0$, it is a minimum.'), math: same('$\\begin{gathered}S\'(x)=2x-\\frac{128}{x^2}=0\\ \\to\\ x^3=64\\\\ h=\\frac{32}{16}=2\\end{gathered}$') }
        ],
        takeaway: say('Urratsak: aukeratu aldagaia, idatzi optimizatzen den funtzioa, erabili baldintza aldagai bakarrarekin uzteko, deribatu eta berdindu 0 balioarekin, eta egiaztatu $f\'\'$ deribatuarekin edo $f\'$ deribatuaren zeinuarekin bilatutako maximoa edo minimoa dela.', 'Pasos: elige la variable, escribe la función que se optimiza, usa la condición para dejarla con una sola variable, deriva e iguala a 0, y comprueba con $f\'\'$ o con el signo de $f\'$ que es el máximo o el mínimo buscado.', 'الخطوات: اختر المتغير، واكتب الدالة المراد استمثالها، واستعمل الشرط لتبقى بمتغير واحد، ثم اشتق وساوِ بالصفر، وتحقق بـ $f\'\'$ أو بإشارة $f\'$ من أنها القيمة العظمى أو الصغرى المطلوبة.', 'Steps: choose the variable, write the function to optimise, use the condition to leave it with a single variable, differentiate and set it equal to 0, and check with $f\'\'$ or with the sign of $f\'$ that it is the maximum or minimum you want.'),
        figure: (language) => <AreasFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'distances',
        stage: 'optimization',
        title: say('Optimizazioa: distantziak', 'Optimización: distancias', 'الاستمثال: المسافات', 'Optimisation: distances'),
        goal: say('Kurba baten puntu hurbilena aurkitzea puntu jakin batetik, distantziaren karratua minimizatuz.', 'Hallar el punto de una curva más cercano a un punto dado minimizando el cuadrado de la distancia.', 'إيجاد أقرب نقطة من منحنى إلى نقطة معطاة بتصغير مربع المسافة.', 'Find the point of a curve closest to a given point by minimising the square of the distance.'),
        needs: [
            CONTEXTS1,
            { unit: 'batx1-zientziak/derivadas', topic: 'tangent', title: { eu: 'Zuzen ukitzailea eta zuzen normala', es: 'Recta tangente y recta normal', en: 'Tangent and normal lines', ar: 'المماس والمستقيم العمودي' } }
        ],
        problem: say('$y=\\sqrt{x}$ kurbaren zein puntu dago $P\\left(\\frac{9}{2},\\,0\\right)$ puntutik hurbilen?', '¿Qué punto de la curva $y=\\sqrt{x}$ está más cerca de $P\\left(\\frac{9}{2},\\,0\\right)$?', 'أي نقطة من المنحنى $y=\\sqrt{x}$ هي الأقرب إلى $P\\left(\\frac{9}{2},\\,0\\right)$؟', 'Which point of the curve $y=\\sqrt{x}$ is closest to $P\\left(\\frac{9}{2},\\,0\\right)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kurbaren puntu bat $(x,\\sqrt{x})$ da. Minimizatu distantziaren karratua, errorik gabea.', 'Un punto de la curva es $(x,\\sqrt{x})$. Minimiza el cuadrado de la distancia, que no tiene raíz.', 'نقطة من المنحنى هي $(x,\\sqrt{x})$. صغّر مربع المسافة، فهو بلا جذر.', 'A point of the curve is $(x,\\sqrt{x})$. Minimise the square of the distance, which has no root.'), math: same('$D(x)=\\left(x-\\frac{9}{2}\\right)^2+x=x^2-8x+\\frac{81}{4}$') },
            { text: say('Deribatu eta berdindu 0 balioarekin.', 'Deriva e iguala a 0.', 'اشتق وساوِ بالصفر.', 'Differentiate and set it equal to 0.'), math: same('$D\'(x)=2x-8=0\\ \\to\\ x=4$') },
            { text: say('Puntua $(4,\\,2)$ da, eta distantzia $\\sqrt{D(4)}$.', 'El punto es $(4,\\,2)$, y la distancia, $\\sqrt{D(4)}$.', 'النقطة $(4,\\,2)$، والمسافة $\\sqrt{D(4)}$.', 'The point is $(4,\\,2)$, and the distance $\\sqrt{D(4)}$.'), math: same('$D(4)=16-32+\\frac{81}{4}=\\frac{17}{4}\\ \\to\\ d=\\frac{\\sqrt{17}}{2}$') }
        ],
        takeaway: say('$P$ puntutik kurbaren puntu baterako distantziarako, $D=d^2$ minimizatzen da: minimo bera du eta errorik gabe deribatzen da. Puntu hurbilenean, $PQ$ zuzenkia zuzen ukitzailearekiko perpendikularra da: normaletik doa.', 'Para la distancia de $P$ a un punto de la curva se minimiza $D=d^2$: tiene el mismo mínimo y se deriva sin raíces. En el punto más cercano, el segmento $PQ$ es perpendicular a la tangente: va por la normal.', 'لإيجاد المسافة من $P$ إلى نقطة من المنحنى نصغّر $D=d^2$: فلها القيمة الصغرى نفسها وتُشتق دون جذور. وعند أقرب نقطة تكون القطعة $PQ$ عمودية على المماس: أي تقع على المستقيم العمودي.', 'For the distance from $P$ to a point of the curve, minimise $D=d^2$: it has the same minimum and is differentiated without roots. At the closest point, the segment $PQ$ is perpendicular to the tangent: it lies along the normal.'),
        figure: (language) => <DistanceFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'contexts-interval',
        stage: 'optimization',
        title: say('Optimizazioa: kostua eta mozkina tarte batean', 'Optimización: coste y beneficio en un intervalo', 'الاستمثال: التكلفة والربح على فترة', 'Optimisation: cost and profit on an interval'),
        goal: say('Testuinguru erreal bateko funtzio bat optimizatzea zentzua duen tartean, haren muturrak ere begiratuz.', 'Optimizar una función de un contexto real en el intervalo donde tiene sentido, mirando también sus bordes.', 'استمثال دالة من سياق واقعي على الفترة التي يكون لها فيها معنى، مع النظر إلى طرفيها أيضًا.', 'Optimise a function from a real context on the interval where it makes sense, also looking at its ends.'),
        needs: [CONTEXTS1, ABSOLUTE1],
        problem: say('Enpresa batek egunean 0 eta 6 mila pieza artean egiten ditu, $B(x)=-x^3+9x^2-15x$ mozkinarekin (milaka eurotan). Zenbat egin behar ditu ahalik eta gehien irabazteko?', 'Una empresa fabrica entre 0 y 6 miles de piezas al día, con beneficio $B(x)=-x^3+9x^2-15x$ (miles de euros). ¿Cuánto debe fabricar para ganar lo máximo?', 'تصنع شركة ما بين 0 و6 آلاف قطعة يوميًّا، بربح $B(x)=-x^3+9x^2-15x$ (بآلاف اليوروهات). كم يجب أن تصنع لتربح أكبر ربح؟', 'A company makes between 0 and 6 thousand parts a day, with profit $B(x)=-x^3+9x^2-15x$ (thousands of euros). How much should it make to earn the most?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntu singularrak.', 'Los puntos singulares.', 'النقاط الحرجة.', 'The stationary points.'), math: same('$\\begin{gathered}B\'(x)=-3x^2+18x-15=0\\\\ x=1,\\ x=5\\end{gathered}$') },
            { text: say('Balioa puntu singularretan eta $[0,\\,6]$ tartearen muturretan.', 'El valor en los singulares y en los bordes de $[0,\\,6]$.', 'القيمة عند النقاط الحرجة وعند طرفي $[0,\\,6]$.', 'The value at the stationary points and at the ends of $[0,\\,6]$.'), math: same('$\\begin{gathered}B(0)=0\\qquad B(1)=-7\\\\ B(5)=-125+225-75=25\\qquad B(6)=18\\end{gathered}$') },
            { text: say('Handiena 25 da: 5 mila pieza egin behar dira, eta 25 mila euro irabazten dira.', 'El mayor es 25: hay que fabricar 5 mil piezas, y se ganan 25 mil euros.', 'الأكبر 25: يجب صنع 5 آلاف قطعة، فيكون الربح 25 ألف يورو.', 'The largest is 25: it should make 5 thousand parts, and it earns 25 thousand euros.') }
        ],
        takeaway: say('Testuinguru erreal batean aldagaia tarte itxi batean bizi da. Optimoa puntu singular batean edo mutur batean egon daiteke: denak alderatzen dira. Hemen $x=1$ minimo erlatiboak ez du balio: maximo bat bilatzen da.', 'En un contexto real la variable vive en un intervalo cerrado. El óptimo puede estar en un punto singular o en un borde: se comparan todos. Aquí el mínimo relativo $x=1$ no sirve: se busca un máximo.', 'في السياق الواقعي يعيش المتغير في فترة مغلقة. وقد يكون الأمثل عند نقطة حرجة أو عند طرف: فنقارن الجميع. وهنا لا تفيد القيمة الصغرى المحلية $x=1$: فنحن نبحث عن قيمة عظمى.', 'In a real context the variable lives on a closed interval. The optimum can be at a stationary point or at an end: compare them all. Here the local minimum $x=1$ is no use: we want a maximum.'),
        figure: (language) => <ContextsFigure language={language} />,
        figureAfterSteps: true
    }
]

export const bach2ApplicationsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...localizeNames({ ...bach2ApplicationsLessonTexts[topic.id as Bach2ApplicationsTopicId], ...bach2ApplicationsLessonChecks[topic.id as Bach2ApplicationsTopicId] }) }))
