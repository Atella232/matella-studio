import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { localizeNames, same, say } from '../batx1-zientziak-funtzioak/text'
import { AbsoluteFigure, AlwaysIncreasingFigure, ConcavityFigure, ExpGraphFigure, ExtremeCoefficientsFigure, InflectionCoefficientsFigure, InflectionFigure, PolynomialGraphFigure, ProfitFigure, RationalGraphFigure, RectangleFigure, SecondDerivativeFigure, SignChartFigure, SignMonotonyFigure, SingularFigure } from './figures'
import { bachApplicationsLessonChecks, type BachApplicationsTopicId } from './lessonChecks'
import { bachApplicationsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 1 · Zientziak — stages and
   lessons. The scope follows unit 11 of Santillana 1.º Bachillerato
   Ciencias (monotony, extremes, curvature, coefficients from conditions,
   sketching and optimisation) with sections 5 and 6 of unit 12 of Anaya
   Matemáticas I (absolute extremes on a closed interval). Curvature
   follows Santillana, the owner's textbook: f″ > 0 is «cóncava» (∪) and
   f″ < 0 «convexa» (∩); Basque says ahurra (∪) and ganbila (∩), English
   concave up and concave down, and Arabic says towards which side it
   opens. The drawing ∪ or ∩ always goes next to the name. L'Hôpital is
   left out (only Anaya has it, in one exercise). Derivatives come from
   Deribatuak, asymptotes from Limiteak; they are linked as «Review
   first».
   ========================================================================== */

export type BachApplicationsStageId = 'monotony' | 'extremes' | 'curvature' | 'optimization' | 'graphs'

export const bachApplicationsStages: UnitStage[] = [
    { id: 'monotony', tone: 'blue', title: { eu: 'Hazkundea', es: 'Crecimiento', en: 'Increase and decrease', ar: 'التزايد والتناقص' } },
    { id: 'extremes', tone: 'violet', title: { eu: 'Maximoak eta minimoak', es: 'Máximos y mínimos', en: 'Maxima and minima', ar: 'القيم العظمى والصغرى' } },
    { id: 'curvature', tone: 'mustard', title: { eu: 'Kurbadura', es: 'Curvatura', en: 'Concavity', ar: 'التقعّر' } },
    { id: 'optimization', tone: 'coral', title: { eu: 'Optimizazioa', es: 'Optimización', en: 'Optimisation', ar: 'الاستمثال' } },
    { id: 'graphs', tone: 'green', title: { eu: 'Funtzioak irudikatzea', es: 'Representación de funciones', en: 'Sketching functions', ar: 'رسم الدوال' } }
]

const DERIVATIVES = 'batx1-zientziak/derivadas'
const LIMITS = 'batx1-zientziak/limites-continuidad'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Increase and decrease ---------- */
    {
        id: 'sign-monotony',
        stage: 'monotony',
        title: say('Deribatuaren zeinua eta hazkundea', 'Signo de la derivada y crecimiento', 'إشارة المشتقة والتزايد', 'The sign of the derivative and growth'),
        goal: say('Funtzio bat puntu batean gorakorra ala beherakorra den jakitea, bere deribatuaren zeinuari begiratuta.', 'Saber si una función crece o decrece en un punto mirando el signo de su derivada.', 'معرفة هل الدالة متزايدة أو متناقصة عند نقطة بالنظر إلى إشارة مشتقتها.', 'Tell whether a function is increasing or decreasing at a point by looking at the sign of its derivative.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'monotony', title: { eu: 'Hazkundea, maximoak eta minimoak', es: 'Crecimiento, máximos y mínimos', en: 'Increasing and decreasing, maxima and minima', ar: 'التزايد والقيم العظمى والصغرى' } },
            { unit: DERIVATIVES, topic: 'derivative-point', title: { eu: 'Deribatua puntu batean', es: 'Derivada en un punto', en: 'The derivative at a point', ar: 'المشتقة عند نقطة' } }
        ],
        problem: say('Gorakorra ala beherakorra da $f(x)=x^3-12x$ funtzioa $x=1$ puntuan? Eta $x=3$ puntuan?', '¿Crece o decrece $f(x)=x^3-12x$ en $x=1$? ¿Y en $x=3$?', 'هل الدالة $f(x)=x^3-12x$ متزايدة أو متناقصة عند $x=1$؟ وعند $x=3$؟', 'Is $f(x)=x^3-12x$ increasing or decreasing at $x=1$? And at $x=3$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatua.', 'La derivada.', 'المشتقة.', 'The derivative.'), math: same('$f\'(x)=3x^2-12$') },
            { text: say('Ordezkatu bi balioak.', 'Sustituye los dos valores.', 'عوّض القيمتين.', 'Substitute the two values.'), math: same('$\\begin{aligned}&f\'(1)=3-12=-9\\\\ &f\'(3)=27-12=15\\end{aligned}$') },
            { text: say('$x=1$ puntuan deribatua negatiboa da: $f$ beherakorra da. $x=3$ puntuan positiboa da: $f$ gorakorra da.', 'En $x=1$ la derivada es negativa: $f$ decrece. En $x=3$ es positiva: $f$ crece.', 'عند $x=1$ المشتقة سالبة: $f$ متناقصة. وعند $x=3$ موجبة: $f$ متزايدة.', 'At $x=1$ the derivative is negative: $f$ is decreasing. At $x=3$ it is positive: $f$ is increasing.') }
        ],
        takeaway: say('$f\'(a)>0$ bada, $f$ gorakorra da $a$ puntuan; $f\'(a)<0$ bada, beherakorra. Tarte osoan $f\'>0$ bada, $f$ gorakorra da tarte osoan.', 'Si $f\'(a)>0$, $f$ es creciente en $a$; si $f\'(a)<0$, decreciente. Si $f\'>0$ en todo un intervalo, $f$ crece en todo él.', 'إذا كان $f\'(a)>0$ فإن $f$ متزايدة عند $a$، وإذا كان $f\'(a)<0$ فمتناقصة. وإذا كان $f\'>0$ في فترة كاملة فإن $f$ متزايدة فيها كلها.', 'If $f\'(a)>0$, $f$ is increasing at $a$; if $f\'(a)<0$, decreasing. If $f\'>0$ on a whole interval, $f$ increases on all of it.'),
        figure: (language) => <SignMonotonyFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'intervals',
        stage: 'monotony',
        title: say('Hazkunde-tarteak', 'Intervalos de crecimiento', 'فترات التزايد والتناقص', 'Intervals of increase and decrease'),
        goal: say('Funtzio baten hazkunde- eta beherakada-tarteak aurkitzea, $f\'$ deribatuaren zeinu-taula batekin, izate-eremutik kanpoko puntuak barne.', 'Hallar los intervalos de crecimiento y de decrecimiento con una tabla de signos de $f\'$, incluidos los puntos fuera del dominio.', 'إيجاد فترات التزايد والتناقص بجدول إشارات $f\'$، مع النقاط الواقعة خارج المجال.', 'Find the intervals of increase and decrease with a sign chart of $f\'$, including the points outside the domain.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'quadratic-inequality', title: { eu: 'Bigarren mailako inekuazioak', es: 'Inecuaciones de segundo grado', en: 'Second-degree inequalities', ar: 'متراجحات الدرجة الثانية' } },
            { unit: 'batx1-zientziak/funciones', topic: 'domain', title: { eu: 'Izate-eremua: baldintza guztiak batera', es: 'Dominio: todas las condiciones a la vez', en: 'Domain: every condition at once', ar: 'المجال: كل الشروط معًا' } }
        ],
        problem: say('Aurkitu $f(x)=2x^3-3x^2-12x$ funtzioaren hazkunde- eta beherakada-tarteak.', 'Halla los intervalos de crecimiento y de decrecimiento de $f(x)=2x^3-3x^2-12x$.', 'أوجد فترات تزايد $f(x)=2x^3-3x^2-12x$ وتناقصها.', 'Find the intervals where $f(x)=2x^3-3x^2-12x$ increases and decreases.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatuaren zeroak.', 'Los ceros de la derivada.', 'أصفار المشتقة.', 'The zeros of the derivative.'), math: same('$\\begin{aligned}f\'(x)&=6x^2-6x-12\\\\ &=6(x+1)(x-2)\\end{aligned}$') },
            { text: say('Zeinua tarte bakoitzean, puntu bat probatuta.', 'El signo en cada intervalo, probando un punto.', 'الإشارة في كل فترة بتجربة نقطة.', 'The sign on each interval, testing one point.'), math: same('$\\begin{aligned}&f\'(-2)=24\\\\ &f\'(0)=-12\\\\ &f\'(3)=24\\end{aligned}$') },
            { text: say('Gorakorra da $(-\\infty,\\,-1)\\cup(2,\\,+\\infty)$ tartean, eta beherakorra $(-1,\\,2)$ tartean.', 'Crece en $(-\\infty,\\,-1)\\cup(2,\\,+\\infty)$ y decrece en $(-1,\\,2)$.', 'تتزايد في $(-\\infty,\\,-1)\\cup(2,\\,+\\infty)$ وتتناقص في $(-1,\\,2)$.', 'It increases on $(-\\infty,\\,-1)\\cup(2,\\,+\\infty)$ and decreases on $(-1,\\,2)$.') }
        ],
        takeaway: say('$f\'$ deribatuaren zeroek eta izate-eremutik kanpoko puntuek zuzena zatitzen dute. Zati bakoitzean $f\'$ deribatuak zeinu bakarra du: puntu bat probatzen da, eta $+$ bada $f$ gorakorra da; $-$ bada, beherakorra.', 'Los ceros de $f\'$ y los puntos fuera del dominio parten la recta. En cada trozo $f\'$ tiene un solo signo: se prueba un punto, y si sale $+$, $f$ crece; si sale $-$, decrece.', 'تقسم أصفار $f\'$ والنقاط الواقعة خارج المجال المستقيم. وفي كل جزء لـ $f\'$ إشارة واحدة: نجرب نقطة، فإذا كانت $+$ تزايدت $f$، وإذا كانت $-$ تناقصت.', 'The zeros of $f\'$ and the points outside the domain split the line. On each piece $f\'$ has a single sign: test one point, and if it is $+$, $f$ increases; if it is $-$, it decreases.'),
        figure: (language) => <SignChartFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'always-increasing',
        stage: 'monotony',
        title: say('Beti gorakorrak diren funtzioak', 'Funciones siempre crecientes', 'دوال متزايدة دائمًا', 'Functions that always increase'),
        goal: say('Funtzio bat $\\mathbb{R}$ osoan gorakorra den erabakitzea, eta hori lortzen duen parametroa aurkitzea, parabola baten zeinuarekin.', 'Decidir si una función crece en todo $\\mathbb{R}$ y hallar el parámetro que lo consigue, con el signo de una parábola.', 'تقرير هل الدالة متزايدة في كل $\\mathbb{R}$، وإيجاد الوسيط الذي يحقق ذلك، بإشارة قطع مكافئ.', 'Decide whether a function increases on all of $\\mathbb{R}$, and find the parameter that makes it so, using the sign of a parabola.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'quadratic-formula', title: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', en: 'Second-degree equations', ar: 'معادلات الدرجة الثانية' } }
        ],
        problem: say('$a$ parametroaren zer baliotarako da gorakorra $\\mathbb{R}$ osoan $f(x)=x^3-3x^2+ax$ funtzioa?', '¿Para qué valores de $a$ es creciente en todo $\\mathbb{R}$ la función $f(x)=x^3-3x^2+ax$?', 'ما قيم $a$ التي تجعل الدالة $f(x)=x^3-3x^2+ax$ متزايدة في كل $\\mathbb{R}$؟', 'For which values of $a$ is $f(x)=x^3-3x^2+ax$ increasing on all of $\\mathbb{R}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatua gorantz irekitzen den parabola bat da.', 'La derivada es una parábola que se abre hacia arriba.', 'المشتقة قطع مكافئ مفتوح إلى الأعلى.', 'The derivative is a parabola that opens upwards.'), math: same('$f\'(x)=3x^2-6x+a$') },
            { text: say('Inon negatiboa izan ez dadin, ezin du ardatza bi aldiz moztu: diskriminatzailea $\\le 0$.', 'Para que no sea negativa en ningún punto, no puede cortar el eje dos veces: discriminante $\\le 0$.', 'كي لا تكون سالبة عند أي نقطة لا يجوز أن تقطع المحور مرتين: المميز $\\le 0$.', 'For it never to be negative, it cannot cross the axis twice: discriminant $\\le 0$.'), math: same('$36-12a\\le 0\\ \\to\\ a\\ge 3$') },
            { text: say('$a=3$ denean, $f\'(x)=3(x-1)^2$ deribatua $x=1$ puntuan bakarrik anulatzen da, eta $f$ gorakorra da beti. Erantzuna: $a\\ge 3$.', 'Con $a=3$, $f\'(x)=3(x-1)^2$ solo se anula en $x=1$, y $f$ sigue creciendo. La respuesta: $a\\ge 3$.', 'مع $a=3$ لا تنعدم $f\'(x)=3(x-1)^2$ إلا عند $x=1$، وتبقى $f$ متزايدة. الجواب: $a\\ge 3$.', 'With $a=3$, $f\'(x)=3(x-1)^2$ is zero only at $x=1$, and $f$ keeps increasing. The answer: $a\\ge 3$.') }
        ],
        takeaway: say('$f\'(x)\\ge 0$ bada $\\mathbb{R}$ osoan, eta puntu solteetan bakarrik anulatzen bada, $f$ beti da gorakorra, $x^3$ bezala. Parametro batekin, eskatu $f\'$ deribatuak zeinurik ez aldatzea.', 'Si $f\'(x)\\ge 0$ en todo $\\mathbb{R}$ y solo se anula en puntos sueltos, $f$ crece siempre, como $x^3$. Con un parámetro, exige que $f\'$ no cambie de signo.', 'إذا كان $f\'(x)\\ge 0$ في كل $\\mathbb{R}$ ولم تنعدم إلا عند نقاط منفردة فإن $f$ متزايدة دائمًا مثل $x^3$. ومع وسيط اشترط ألا تغير $f\'$ إشارتها.', 'If $f\'(x)\\ge 0$ on all of $\\mathbb{R}$ and it is zero only at isolated points, $f$ always increases, like $x^3$. With a parameter, require that $f\'$ does not change sign.'),
        figure: (language) => <AlwaysIncreasingFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Maxima and minima ---------- */
    {
        id: 'singular-points',
        stage: 'extremes',
        title: say('Puntu singularrak, maximoak eta minimoak', 'Puntos singulares y extremos relativos', 'النقاط الحرجة والقيم القصوى المحلية', 'Stationary points and local extrema'),
        goal: say('Puntu singularrak ($f\'=0$) aurkitzea, eta $f\'$ deribatuaren zeinu-aldaketarekin maximo, minimo ala bat ere ez diren erabakitzea.', 'Hallar los puntos singulares ($f\'=0$) y decidir con el cambio de signo de $f\'$ si son máximo, mínimo o ninguno.', 'إيجاد النقاط الحرجة ($f\'=0$) وتقرير هل هي عظمى أو صغرى أو لا هذه ولا تلك بتغير إشارة $f\'$.', 'Find the stationary points ($f\'=0$) and decide from the change of sign of $f\'$ whether each is a maximum, a minimum or neither.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'monotony', title: { eu: 'Hazkundea, maximoak eta minimoak', es: 'Crecimiento, máximos y mínimos', en: 'Increasing and decreasing, maxima and minima', ar: 'التزايد والقيم العظمى والصغرى' } },
            { unit: DERIVATIVES, topic: 'tangent-conditions', title: { eu: 'Baldintzak dituzten zuzen ukitzaileak', es: 'Tangentes con condiciones', en: 'Tangents with conditions', ar: 'مماسات بشروط' } }
        ],
        problem: say('Aurkitu $f(x)=x^3-3x+2$ funtzioaren maximo eta minimo erlatiboak.', 'Halla los máximos y mínimos relativos de $f(x)=x^3-3x+2$.', 'أوجد القيم العظمى والصغرى المحلية للدالة $f(x)=x^3-3x+2$.', 'Find the local maxima and minima of $f(x)=x^3-3x+2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntu singularrak: $f\'(x)=0$.', 'Puntos singulares: $f\'(x)=0$.', 'النقاط الحرجة: $f\'(x)=0$.', 'Stationary points: $f\'(x)=0$.'), math: same('$3x^2-3=0\\ \\to\\ x=-1,\\ x=1$') },
            { text: say('$f\'$ deribatuaren zeinua: $+$ $-1$ baino lehen, $-$ $-1$ eta 1 artean, eta $+$ 1 ondoren.', 'El signo de $f\'$: $+$ antes de $-1$, $-$ entre $-1$ y 1, y $+$ después de 1.', 'إشارة $f\'$: $+$ قبل $-1$، و$-$ بين $-1$ و1، و$+$ بعد 1.', 'The sign of $f\'$: $+$ before $-1$, $-$ between $-1$ and 1, and $+$ after 1.') },
            { text: say('$-1$ puntuan igotzetik jaistera pasatzen da: maximoa $(-1,\\,4)$ puntuan. 1 puntuan, jaistetik igotzera: minimoa $(1,\\,0)$ puntuan.', 'En $-1$ pasa de subir a bajar: máximo en $(-1,\\,4)$. En 1, de bajar a subir: mínimo en $(1,\\,0)$.', 'عند $-1$ تنتقل من الصعود إلى النزول: قيمة عظمى عند $(-1,\\,4)$. وعند 1 من النزول إلى الصعود: قيمة صغرى عند $(1,\\,0)$.', 'At $-1$ it goes from rising to falling: a maximum at $(-1,\\,4)$. At 1, from falling to rising: a minimum at $(1,\\,0)$.') }
        ],
        takeaway: say('Mutur erlatibo bat puntu singular batean dago, $f\'(a)=0$, $f\'$ deribatuak zeinua aldatzen duen tokian: $+$ zeinutik $-$ zeinura maximoa da; $-$ zeinutik $+$ zeinura, minimoa. Aldatzen ez bada, ez dago muturrik.', 'Un extremo relativo está en un punto singular, $f\'(a)=0$, donde $f\'$ cambia de signo: de $+$ a $-$ es un máximo; de $-$ a $+$, un mínimo. Si no cambia, no hay extremo.', 'تقع القيمة القصوى المحلية عند نقطة حرجة، $f\'(a)=0$، تغير عندها $f\'$ إشارتها: من $+$ إلى $-$ قيمة عظمى، ومن $-$ إلى $+$ قيمة صغرى. وإذا لم تتغير فلا قيمة قصوى.', 'A local extremum is at a stationary point, $f\'(a)=0$, where $f\'$ changes sign: from $+$ to $-$ it is a maximum; from $-$ to $+$, a minimum. If it does not change, there is no extremum.'),
        figure: (language) => <SingularFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'second-derivative',
        stage: 'extremes',
        title: say('Bigarren deribatuaren irizpidea', 'Criterio de la segunda derivada', 'اختبار المشتقة الثانية', 'The second derivative test'),
        goal: say('Puntu singular batean $f\'\'(a)$ balioaren zeinua erabiltzea, maximoa ala minimoa den jakiteko zeinu-taularik egin gabe.', 'Usar el signo de $f\'\'(a)$ en un punto singular para saber si es un máximo o un mínimo sin hacer la tabla de signos.', 'استعمال إشارة $f\'\'(a)$ عند نقطة حرجة لمعرفة هل هي عظمى أو صغرى دون جدول إشارات.', 'Use the sign of $f\'\'(a)$ at a stationary point to know whether it is a maximum or a minimum without a sign chart.'),
        needs: [
            { unit: DERIVATIVES, topic: 'sum-constant', title: { eu: 'Batura eta konstante bat', es: 'Suma y constante', en: 'Sum and constant', ar: 'المجموع والثابت' } }
        ],
        problem: say('Aurkitu $f(x)=x^3-6x^2+9x$ funtzioaren mutur erlatiboak, bigarren deribatuarekin.', 'Halla los extremos relativos de $f(x)=x^3-6x^2+9x$ con la segunda derivada.', 'أوجد القيم القصوى المحلية للدالة $f(x)=x^3-6x^2+9x$ بالمشتقة الثانية.', 'Find the local extrema of $f(x)=x^3-6x^2+9x$ with the second derivative.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntu singularrak.', 'Los puntos singulares.', 'النقاط الحرجة.', 'The stationary points.'), math: same('$\\begin{aligned}&f\'(x)=3x^2-12x+9=0\\\\ &\\to\\ x=1,\\ x=3\\end{aligned}$') },
            { text: say('Bigarren deribatua puntu bakoitzean.', 'La segunda derivada en cada uno.', 'المشتقة الثانية عند كل منها.', 'The second derivative at each one.'), math: same('$\\begin{aligned}&f\'\'(x)=6x-12\\\\ &f\'\'(1)=-6\\quad f\'\'(3)=6\\end{aligned}$') },
            { text: say('$f\'\'(1)<0$: maximoa $(1,\\,4)$ puntuan. $f\'\'(3)>0$: minimoa $(3,\\,0)$ puntuan.', '$f\'\'(1)<0$: máximo en $(1,\\,4)$. $f\'\'(3)>0$: mínimo en $(3,\\,0)$.', '$f\'\'(1)<0$: قيمة عظمى عند $(1,\\,4)$. $f\'\'(3)>0$: قيمة صغرى عند $(3,\\,0)$.', '$f\'\'(1)<0$: a maximum at $(1,\\,4)$. $f\'\'(3)>0$: a minimum at $(3,\\,0)$.') }
        ],
        takeaway: say('$f\'(a)=0$ eta $f\'\'(a)<0$ badira, maximo bat dago; $f\'\'(a)>0$ bada, minimo bat. $f\'\'(a)=0$ bada, irizpideak ez du erabakitzen: itzuli $f\'$ deribatuaren zeinu-taulara.', 'Si $f\'(a)=0$ y $f\'\'(a)<0$, hay un máximo; si $f\'\'(a)>0$, un mínimo. Si $f\'\'(a)=0$, el criterio no decide: vuelve a la tabla de signos de $f\'$.', 'إذا كان $f\'(a)=0$ و$f\'\'(a)<0$ فهناك قيمة عظمى، وإذا كان $f\'\'(a)>0$ فقيمة صغرى. وإذا كان $f\'\'(a)=0$ فالاختبار لا يحسم: عد إلى جدول إشارات $f\'$.', 'If $f\'(a)=0$ and $f\'\'(a)<0$, there is a maximum; if $f\'\'(a)>0$, a minimum. If $f\'\'(a)=0$, the test does not decide: go back to the sign chart of $f\'$.'),
        figure: (language) => <SecondDerivativeFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'extreme-coefficients',
        stage: 'extremes',
        title: say('Koefizienteak muturretatik', 'Coeficientes a partir de los extremos', 'المعاملات من القيم القصوى', 'Coefficients from the extrema'),
        goal: say('Funtzio baten koefizienteak bere muturretatik aurkitzea: datu bakoitzak ekuazio bat ematen du.', 'Hallar los coeficientes de una función a partir de sus extremos: cada dato da una ecuación.', 'إيجاد معاملات دالة من قيمها القصوى: كل معطى يعطي معادلة.', 'Find the coefficients of a function from its extrema: each piece of data gives an equation.'),
        needs: [
            { unit: DERIVATIVES, topic: 'powers', title: { eu: 'Berreturak eta erroak', es: 'Potencias y raíces', en: 'Powers and roots', ar: 'القوى والجذور' } }
        ],
        problem: say('$f(x)=x^3+ax^2+b$ funtzioak minimo bat du $(2,\\,-1)$ puntuan. Aurkitu $a$ eta $b$.', 'La función $f(x)=x^3+ax^2+b$ tiene un mínimo en $(2,\\,-1)$. Halla $a$ y $b$.', 'للدالة $f(x)=x^3+ax^2+b$ قيمة صغرى عند $(2,\\,-1)$. أوجد $a$ و$b$.', 'The function $f(x)=x^3+ax^2+b$ has a minimum at $(2,\\,-1)$. Find $a$ and $b$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Minimoa $x=2$ puntuan: deribatua anulatzen da.', 'Mínimo en $x=2$: la derivada se anula.', 'قيمة صغرى عند $x=2$: تنعدم المشتقة.', 'A minimum at $x=2$: the derivative is zero.'), math: same('$f\'(2)=12+4a=0\\ \\to\\ a=-3$') },
            { text: say('Puntutik pasatzen da: $f(2)=-1$.', 'Pasa por el punto: $f(2)=-1$.', 'تمر بالنقطة: $f(2)=-1$.', 'It goes through the point: $f(2)=-1$.'), math: same('$8-12+b=-1\\ \\to\\ b=3$') },
            { text: say('Egiaztapena: $f\'\'(2)=12-6=6>0$, minimoa da.', 'Comprobación: $f\'\'(2)=12-6=6>0$, es un mínimo.', 'التحقق: $f\'\'(2)=12-6=6>0$، إنها قيمة صغرى.', 'Check: $f\'\'(2)=12-6=6>0$, it is a minimum.') }
        ],
        takeaway: say('$(a,\\,b)$ puntuko mutur batek bi ekuazio ematen ditu: $f\'(a)=0$ eta $f(a)=b$. Amaieran $f\'\'$ deribatuarekin egiaztatzen da eskatutako motakoa dela.', 'Un extremo en $(a,\\,b)$ da dos ecuaciones: $f\'(a)=0$ y $f(a)=b$. Al final se comprueba con $f\'\'$ que es del tipo pedido.', 'تعطي القيمة القصوى عند $(a,\\,b)$ معادلتين: $f\'(a)=0$ و$f(a)=b$. وفي النهاية نتحقق بـ $f\'\'$ من أنها من النوع المطلوب.', 'An extremum at $(a,\\,b)$ gives two equations: $f\'(a)=0$ and $f(a)=b$. At the end, check with $f\'\'$ that it is the kind asked for.'),
        figure: (language) => <ExtremeCoefficientsFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. Concavity ---------- */
    {
        id: 'concavity',
        stage: 'curvature',
        title: say('Kurbadura: ahurra eta ganbila', 'Curvatura: cóncava y convexa', 'التقعّر نحو الأعلى ونحو الأسفل', 'Concave up and concave down'),
        goal: say('Kurba bat ahurra (∪) ala ganbila (∩) den jakitea, $f\'\'$ deribatuaren zeinuarekin.', 'Saber si una curva es cóncava (∪) o convexa (∩) con el signo de $f\'\'$.', 'معرفة هل المنحنى مقعّر نحو الأعلى (∪) أو نحو الأسفل (∩) بإشارة $f\'\'$.', 'Tell whether a curve is concave up (∪) or concave down (∩) from the sign of $f\'\'$.'),
        needs: [
            { unit: DERIVATIVES, topic: 'definition', title: { eu: 'Funtzio deribatua definizioaren bidez', es: 'La función derivada por la definición', en: 'The derivative function from the definition', ar: 'الدالة المشتقة بالتعريف' } }
        ],
        problem: say('Nolakoa da $f(x)=x^3-3x^2$ funtzioaren kurbadura $x=-1$ puntuan eta $x=2$ puntuan?', '¿Cómo es la curvatura de $f(x)=x^3-3x^2$ en $x=-1$ y en $x=2$?', 'كيف تقعّر $f(x)=x^3-3x^2$ عند $x=-1$ وعند $x=2$؟', 'How is $f(x)=x^3-3x^2$ curved at $x=-1$ and at $x=2$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi deribatuak.', 'Las dos derivadas.', 'المشتقتان.', 'The two derivatives.'), math: same('$\\begin{aligned}&f\'(x)=3x^2-6x\\\\ &f\'\'(x)=6x-6\\end{aligned}$') },
            { text: say('Zeinua puntu bakoitzean.', 'El signo en cada punto.', 'الإشارة عند كل نقطة.', 'The sign at each point.'), math: same('$f\'\'(-1)=-12\\qquad f\'\'(2)=6$') },
            { text: say('$x=-1$ puntuan ganbila da (∩); $x=2$ puntuan, ahurra (∪).', 'En $x=-1$ es convexa (∩); en $x=2$, cóncava (∪).', 'عند $x=-1$ مقعّرة نحو الأسفل (∩)، وعند $x=2$ نحو الأعلى (∪).', 'At $x=-1$ it is concave down (∩); at $x=2$, concave up (∪).') }
        ],
        takeaway: say('$f\'\'>0$ bada, kurba ahurra da (∪): maldak handitzen dira eta zuzen ukitzailea azpian geratzen da. $f\'\'<0$ bada, ganbila (∩): zuzen ukitzailea gainean. Liburu batzuek izenak alderantziz erabiltzen dituzte; ∪ eta ∩ marrazkiak ez dira aldatzen.', 'Si $f\'\'>0$, la curva es cóncava (∪): las pendientes aumentan y la tangente queda por debajo. Si $f\'\'<0$, convexa (∩): la tangente queda por encima. Algunos libros usan los nombres al revés; los dibujos ∪ y ∩ no cambian.', 'إذا كان $f\'\'>0$ فالمنحنى مقعّر نحو الأعلى (∪): تزداد الميول ويبقى المماس تحته. وإذا كان $f\'\'<0$ فهو مقعّر نحو الأسفل (∩): يبقى المماس فوقه. الرسمان ∪ و∩ هما ما لا يتغير.', 'If $f\'\'>0$, the curve is concave up (∪): the slopes increase and the tangent lies below it. If $f\'\'<0$, it is concave down (∩): the tangent lies above it. Some books use other names; the drawings ∪ and ∩ do not change.'),
        figure: (language) => <ConcavityFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'inflection',
        stage: 'curvature',
        title: say('Inflexio-puntuak', 'Puntos de inflexión', 'نقاط الانعطاف', 'Points of inflection'),
        goal: say('Kurbadura-tarteak eta inflexio-puntuak aurkitzea, $f\'\'$ deribatuak zeinua aldatzen duen tokian.', 'Hallar los intervalos de curvatura y los puntos de inflexión, donde $f\'\'$ cambia de signo.', 'إيجاد فترات التقعّر ونقاط الانعطاف، حيث تغير $f\'\'$ إشارتها.', 'Find the intervals of concavity and the points of inflection, where $f\'\'$ changes sign.'),
        problem: say('Aztertu $f(x)=x^3-6x^2+4$ funtzioaren kurbadura eta aurkitu bere inflexio-puntua.', 'Estudia la curvatura de $f(x)=x^3-6x^2+4$ y halla su punto de inflexión.', 'ادرس تقعّر $f(x)=x^3-6x^2+4$ وأوجد نقطة انعطافها.', 'Study the concavity of $f(x)=x^3-6x^2+4$ and find its point of inflection.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bigarren deribatua $x=2$ puntuan anulatzen da.', 'La segunda derivada se anula en $x=2$.', 'تنعدم المشتقة الثانية عند $x=2$.', 'The second derivative is zero at $x=2$.'), math: same('$f\'\'(x)=6x-12=0\\ \\to\\ x=2$') },
            { text: say('Zeinua bi aldeetan.', 'El signo a los dos lados.', 'الإشارة على الجانبين.', 'The sign on both sides.'), math: same('$f\'\'(0)=-12\\qquad f\'\'(3)=6$') },
            { text: say('Zeinua aldatzen du: inflexioa $(2,\\,-12)$ puntuan. Ganbila (∩) $(-\\infty,\\,2)$ tartean eta ahurra (∪) $(2,\\,+\\infty)$ tartean.', 'Cambia de signo: inflexión en $(2,\\,-12)$. Convexa (∩) en $(-\\infty,\\,2)$ y cóncava (∪) en $(2,\\,+\\infty)$.', 'تتغير الإشارة: انعطاف عند $(2,\\,-12)$. مقعّرة نحو الأسفل (∩) في $(-\\infty,\\,2)$ ونحو الأعلى (∪) في $(2,\\,+\\infty)$.', 'It changes sign: an inflection at $(2,\\,-12)$. Concave down (∩) on $(-\\infty,\\,2)$ and concave up (∪) on $(2,\\,+\\infty)$.') }
        ],
        takeaway: say('Inflexio-puntu batean kurba ∩ izatetik ∪ izatera pasatzen da, edo alderantziz: $f\'\'$ deribatuak zeinua aldatzen du. $f\'\'(a)=0$ izatea ez da nahikoa: $x^4$ funtzioan $f\'\'(0)=0$ da, eta ez dago inflexiorik.', 'En un punto de inflexión la curva pasa de ∩ a ∪ o al revés: $f\'\'$ cambia de signo. Que $f\'\'(a)=0$ no basta: en $x^4$, $f\'\'(0)=0$ y no hay inflexión.', 'عند نقطة الانعطاف ينتقل المنحنى من ∩ إلى ∪ أو العكس: تغير $f\'\'$ إشارتها. ولا يكفي أن يكون $f\'\'(a)=0$: في $x^4$ يكون $f\'\'(0)=0$ ولا انعطاف.', 'At a point of inflection the curve goes from ∩ to ∪ or the other way round: $f\'\'$ changes sign. $f\'\'(a)=0$ is not enough: for $x^4$, $f\'\'(0)=0$ and there is no inflection.'),
        figure: (language) => <InflectionFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'inflection-coefficients',
        stage: 'curvature',
        title: say('Koefizienteak inflexio-puntutik', 'Coeficientes con un punto de inflexión', 'المعاملات من نقطة الانعطاف', 'Coefficients from a point of inflection'),
        goal: say('Funtzio baten koefizienteak inflexio-puntu batetik aurkitzea, $f\'\'(a)=0$ eta puntuaren baldintzarekin.', 'Hallar los coeficientes de una función a partir de un punto de inflexión, con $f\'\'(a)=0$ y la condición del punto.', 'إيجاد معاملات دالة من نقطة انعطاف، بالشرط $f\'\'(a)=0$ وشرط النقطة.', 'Find the coefficients of a function from a point of inflection, using $f\'\'(a)=0$ and the condition of the point.'),
        problem: say('$f(x)=ax^3+3x^2+b$ funtzioak inflexio-puntu bat du $(1,\\,5)$ puntuan. Aurkitu $a$ eta $b$.', 'La función $f(x)=ax^3+3x^2+b$ tiene un punto de inflexión en $(1,\\,5)$. Halla $a$ y $b$.', 'للدالة $f(x)=ax^3+3x^2+b$ نقطة انعطاف عند $(1,\\,5)$. أوجد $a$ و$b$.', 'The function $f(x)=ax^3+3x^2+b$ has a point of inflection at $(1,\\,5)$. Find $a$ and $b$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Inflexioa $x=1$ puntuan: bigarren deribatua anulatzen da.', 'Inflexión en $x=1$: la segunda derivada se anula.', 'انعطاف عند $x=1$: تنعدم المشتقة الثانية.', 'An inflection at $x=1$: the second derivative is zero.'), math: same('$\\begin{aligned}&f\'\'(x)=6ax+6\\\\ &6a+6=0\\ \\to\\ a=-1\\end{aligned}$') },
            { text: say('Puntutik pasatzen da: $f(1)=5$.', 'Pasa por el punto: $f(1)=5$.', 'تمر بالنقطة: $f(1)=5$.', 'It goes through the point: $f(1)=5$.'), math: same('$-1+3+b=5\\ \\to\\ b=3$') },
            { text: say('Egiaztapena: $f\'\'(x)=-6x+6$ deribatuak zeinua aldatzen du 1 puntuan.', 'Comprobación: $f\'\'(x)=-6x+6$ cambia de signo en 1.', 'التحقق: تغير $f\'\'(x)=-6x+6$ إشارتها عند 1.', 'Check: $f\'\'(x)=-6x+6$ changes sign at 1.') }
        ],
        takeaway: say('$(a,\\,b)$ puntuko inflexio batek $f\'\'(a)=0$ eta $f(a)=b$ ematen ditu. Gainera han zuzen ukitzailearen malda ematen badute, hori $f\'(a)$ da.', 'Un punto de inflexión en $(a,\\,b)$ da $f\'\'(a)=0$ y $f(a)=b$. Si además dan la pendiente de la tangente allí, eso es $f\'(a)$.', 'تعطي نقطة الانعطاف عند $(a,\\,b)$ الشرطين $f\'\'(a)=0$ و$f(a)=b$. وإذا أُعطي أيضًا ميل المماس هناك فهو $f\'(a)$.', 'A point of inflection at $(a,\\,b)$ gives $f\'\'(a)=0$ and $f(a)=b$. If you are also given the slope of the tangent there, that is $f\'(a)$.'),
        figure: (language) => <InflectionCoefficientsFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Optimisation ---------- */
    {
        id: 'absolute-extremes',
        stage: 'optimization',
        title: say('Maximo eta minimo absolutuak tarte batean', 'Máximo y mínimo absolutos en un intervalo', 'القيمتان العظمى والصغرى المطلقتان في فترة', 'Absolute maximum and minimum on an interval'),
        goal: say('Funtzio jarraitu batek $[a,\\,b]$ tartean duen baliorik handiena eta txikiena aurkitzea, barruko puntu singularrak eta tartearen muturrak konparatuta.', 'Hallar el mayor y el menor valor de una función continua en $[a,\\,b]$ comparando los puntos singulares de dentro con los extremos del intervalo.', 'إيجاد أكبر قيمة وأصغر قيمة لدالة متصلة في $[a,\\,b]$ بمقارنة النقاط الحرجة الداخلية بطرفي الفترة.', 'Find the greatest and least values of a continuous function on $[a,\\,b]$ by comparing the stationary points inside with the ends of the interval.'),
        needs: [
            { unit: LIMITS, topic: 'continuous', title: { eu: 'Funtzio jarraitua puntu batean', es: 'Función continua en un punto', en: 'A function continuous at a point', ar: 'الدالة المتصلة عند نقطة' } }
        ],
        problem: say('Aurkitu $f(x)=x^3-3x$ funtzioaren maximo eta minimo absolutuak $[0,\\,3]$ tartean.', 'Halla el máximo y el mínimo absolutos de $f(x)=x^3-3x$ en $[0,\\,3]$.', 'أوجد القيمتين العظمى والصغرى المطلقتين للدالة $f(x)=x^3-3x$ في $[0,\\,3]$.', 'Find the absolute maximum and minimum of $f(x)=x^3-3x$ on $[0,\\,3]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntu singularrak $x=\\pm 1$ dira, baina $x=1$ bakarrik dago $[0,\\,3]$ tartean.', 'Los puntos singulares son $x=\\pm 1$, pero solo $x=1$ está en $[0,\\,3]$.', 'النقطتان الحرجتان $x=\\pm 1$، لكن $x=1$ وحدها في $[0,\\,3]$.', 'The stationary points are $x=\\pm 1$, but only $x=1$ is in $[0,\\,3]$.'), math: same('$f\'(x)=3x^2-3=0$') },
            { text: say('Balioak puntu horretan eta muturretan.', 'Los valores en ese punto y en los extremos.', 'القيم عند تلك النقطة وعند الطرفين.', 'The values at that point and at the ends.'), math: same('$\\begin{aligned}&f(0)=0\\\\ &f(1)=-2\\\\ &f(3)=18\\end{aligned}$') },
            { text: say('Maximo absolutua 18 da, $x=3$ puntuan; minimo absolutua $-2$, $x=1$ puntuan.', 'Máximo absoluto 18, en $x=3$; mínimo absoluto $-2$, en $x=1$.', 'القيمة العظمى المطلقة 18 عند $x=3$، والصغرى المطلقة $-2$ عند $x=1$.', 'The absolute maximum is 18, at $x=3$; the absolute minimum is $-2$, at $x=1$.') }
        ],
        takeaway: say('$[a,\\,b]$ tartean, funtzio jarraitu batek bere maximo eta minimo absolutuak barruko puntu singular batean edo muturretako batean, $a$ edo $b$, hartzen ditu. Balio guztiak kalkulatu eta konparatzen dira.', 'En $[a,\\,b]$, una función continua alcanza su máximo y su mínimo absolutos en un punto singular de dentro o en uno de los extremos, $a$ o $b$. Se calculan todos los valores y se comparan.', 'في $[a,\\,b]$ تبلغ الدالة المتصلة قيمتيها العظمى والصغرى المطلقتين عند نقطة حرجة داخلية أو عند أحد الطرفين $a$ أو $b$. نحسب كل القيم ونقارن بينها.', 'On $[a,\\,b]$, a continuous function reaches its absolute maximum and minimum at a stationary point inside or at one of the ends, $a$ or $b$. Work out all the values and compare them.'),
        figure: (language) => <AbsoluteFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'geometry',
        stage: 'optimization',
        title: say('Optimizazio-problema geometrikoak', 'Problemas de optimización geométricos', 'مسائل الاستمثال الهندسية', 'Geometric optimisation problems'),
        goal: say('Optimizatu behar den funtzioa aldagai bakarrarekin idaztea, enuntziatuaren baldintza erabilita, eta haren maximoa edo minimoa aurkitzea.', 'Plantear la función que hay que optimizar con una sola variable, usando la condición del enunciado, y hallar su máximo o su mínimo.', 'كتابة الدالة المطلوب استمثالها بمتغير واحد باستعمال شرط المسألة، وإيجاد قيمتها العظمى أو الصغرى.', 'Write the function to be optimised in a single variable, using the condition in the statement, and find its maximum or minimum.'),
        problem: say('Perimetroa 20 cm duten laukizuzen guztietatik, zeinek du azalerarik handiena?', 'De todos los rectángulos de perímetro 20 cm, ¿cuál tiene el área mayor?', 'من بين كل المستطيلات التي محيطها 20 سم، أيها مساحته أكبر؟', 'Of all the rectangles with a perimeter of 20 cm, which one has the greatest area?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldagai bakarra: oinarria $x$ bada, altuera $10-x$ da.', 'Una sola variable: si la base es $x$, la altura es $10-x$.', 'متغير واحد: إذا كانت القاعدة $x$ فالارتفاع $10-x$.', 'A single variable: if the base is $x$, the height is $10-x$.'), math: same('$A(x)=x(10-x)=10x-x^2$') },
            { text: say('Deribatua zero.', 'Derivada igual a 0.', 'المشتقة تساوي 0.', 'Derivative equal to 0.'), math: same('$A\'(x)=10-2x=0\\ \\to\\ x=5$') },
            { text: say('$A\'\'=-2<0$: maximoa da. Karratua da: aldea 5 cm eta azalera 25 cm².', '$A\'\'=-2<0$: es un máximo. Es el cuadrado de lado 5 cm, con área 25 cm².', '$A\'\'=-2<0$: إنها قيمة عظمى. إنه المربع الذي طول ضلعه 5 سم ومساحته 25 سم².', '$A\'\'=-2<0$: it is a maximum. It is the square with side 5 cm and area 25 cm².') }
        ],
        takeaway: say('Optimizatzen den magnitudea idazten da; baldintzarekin aldagai bakarreko funtzio bihurtzen da; deribatu, zerorekin berdindu, eta egiaztatu maximoa (edo minimoa) dela eta $x$ balioak zentzua duela.', 'Se escribe la magnitud que se optimiza; con la condición se deja en función de una sola variable; se deriva, se iguala a 0 y se comprueba que es máximo (o mínimo) y que $x$ tiene sentido.', 'نكتب المقدار المراد استمثاله، ونجعله بالشرط دالة لمتغير واحد، ثم نشتق ونساوي بالصفر ونتحقق من أنها عظمى (أو صغرى) وأن لـ $x$ معنى.', 'Write the quantity to optimise; use the condition to make it a function of one variable; differentiate, set it equal to 0 and check that it is a maximum (or minimum) and that $x$ makes sense.'),
        figure: (language) => <RectangleFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'contexts',
        stage: 'optimization',
        title: say('Optimizazioa: mozkina eta distantzia', 'Optimización: beneficio y distancia', 'الاستمثال: الربح والمسافة', 'Optimisation: profit and distance'),
        goal: say('Ekonomiako eta distantzietako testuinguruetan optimizatzea, eta eskatzen den balioarekin erantzutea.', 'Optimizar en contextos de economía y de distancias, y responder con el valor que se pide.', 'الاستمثال في سياقات الاقتصاد والمسافات، والإجابة بالقيمة المطلوبة.', 'Optimise in contexts of economics and distances, and answer with the value that is asked for.'),
        problem: say('Denda batek $x$ unitate saltzen ditu, bakoitza $60-x$ eurotan, eta unitate bakoitza egiteak 20 € balio du. Zein da mozkinik handiena?', 'Una tienda vende $x$ unidades a $60-x$ euros cada una, y fabricar cada unidad cuesta 20 €. ¿Cuál es el beneficio máximo?', 'يبيع متجر $x$ وحدة بسعر $60-x$ يورو للوحدة، وتكلف صناعة كل وحدة 20 €. ما الربح الأكبر؟', 'A shop sells $x$ units at $60-x$ euros each, and making each unit costs €20. What is the greatest profit?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Mozkina = sarrerak − kostuak.', 'Beneficio = ingresos − costes.', 'الربح = الإيرادات − التكاليف.', 'Profit = revenue − costs.'), math: same('$\\begin{aligned}B(x)&=x(60-x)-20x\\\\ &=40x-x^2\\end{aligned}$') },
            { text: say('Deribatua zero.', 'Derivada igual a 0.', 'المشتقة تساوي 0.', 'Derivative equal to 0.'), math: same('$B\'(x)=40-2x=0\\ \\to\\ x=20$') },
            { text: say('20 unitaterekin, $B(20)=800-400=400$: mozkinik handiena 400 € da.', 'Con 20 unidades, $B(20)=800-400=400$: el beneficio máximo es de 400 €.', 'مع 20 وحدة، $B(20)=800-400=400$: الربح الأكبر 400 €.', 'With 20 units, $B(20)=800-400=400$: the greatest profit is €400.') }
        ],
        takeaway: say('Funtzioa idatzi, $x$ optimoa aurkitu eta, amaieran, enuntziatuak galdetzen duena erantzun: batzuetan $x$ da, beste batzuetan balio maximoa, $B(x)$. Distantzia batean, nahikoa da haren karratua minimizatzea.', 'Se plantea la función, se halla el $x$ óptimo y, al final, se responde lo que pregunta el enunciado: a veces es $x$, a veces el valor máximo, $B(x)$. Para una distancia, basta minimizar su cuadrado.', 'نكتب الدالة ونجد $x$ الأمثل، وفي النهاية نجيب عما تسأل عنه المسألة: أحيانًا $x$ وأحيانًا القيمة العظمى $B(x)$. وفي المسافة يكفي جعل مربعها أصغر ما يمكن.', 'Set up the function, find the optimal $x$ and, at the end, answer what the statement asks: sometimes it is $x$, sometimes the greatest value, $B(x)$. For a distance, it is enough to minimise its square.'),
        figure: (language) => <ProfitFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Sketching functions ---------- */
    {
        id: 'polynomial-graph',
        stage: 'graphs',
        title: say('Funtzio polinomikoak irudikatzea', 'Representar funciones polinómicas', 'رسم الدوال الحدودية', 'Sketching polynomial functions'),
        goal: say('Polinomio baten grafikoa marraztea, bere ebaki-puntuekin, muturrekin, inflexio-puntuarekin eta adarrekin.', 'Dibujar la gráfica de un polinomio con sus cortes, sus extremos, su punto de inflexión y sus ramas.', 'رسم بيان حدودية بنقاط تقاطعها وقيمها القصوى ونقطة انعطافها وفروعها.', 'Draw the graph of a polynomial with its intercepts, its extrema, its point of inflection and its branches.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'intercepts', title: { eu: 'Ardatzekiko ebaki-puntuak', es: 'Puntos de corte con los ejes', en: 'Intercepts with the axes', ar: 'نقاط التقاطع مع المحورين' } }
        ],
        problem: say('Irudikatu $f(x)=-x^3+3x$.', 'Representa $f(x)=-x^3+3x$.', 'ارسم $f(x)=-x^3+3x$.', 'Sketch $f(x)=-x^3+3x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebaki-puntuak: $x(3-x^2)=0$, hau da, $x=0$ eta $x=\\pm\\sqrt{3}$. Adarrak: $+\\infty$ aldera ezkerrean eta $-\\infty$ aldera eskuinean.', 'Cortes: $x(3-x^2)=0$, es decir, $x=0$ y $x=\\pm\\sqrt{3}$. Ramas: hacia $+\\infty$ por la izquierda y hacia $-\\infty$ por la derecha.', 'التقاطع: $x(3-x^2)=0$، أي $x=0$ و$x=\\pm\\sqrt{3}$. الفروع: نحو $+\\infty$ يسارًا ونحو $-\\infty$ يمينًا.', 'Intercepts: $x(3-x^2)=0$, that is, $x=0$ and $x=\\pm\\sqrt{3}$. Branches: towards $+\\infty$ on the left and towards $-\\infty$ on the right.') },
            { text: say('Muturrak: minimoa $(-1,\\,-2)$ puntuan eta maximoa $(1,\\,2)$ puntuan.', 'Extremos: mínimo en $(-1,\\,-2)$ y máximo en $(1,\\,2)$.', 'القيم القصوى: صغرى عند $(-1,\\,-2)$ وعظمى عند $(1,\\,2)$.', 'Extrema: a minimum at $(-1,\\,-2)$ and a maximum at $(1,\\,2)$.'), math: same('$\\begin{aligned}&f\'(x)=-3x^2+3=0\\\\ &\\to\\ x=\\pm 1\\end{aligned}$') },
            { text: say('Inflexioa $(0,\\,0)$ puntuan: ahurra (∪) ezkerrean eta ganbila (∩) eskuinean.', 'Inflexión en $(0,\\,0)$: cóncava (∪) a la izquierda y convexa (∩) a la derecha.', 'انعطاف عند $(0,\\,0)$: مقعّرة نحو الأعلى (∪) يسارًا ونحو الأسفل (∩) يمينًا.', 'An inflection at $(0,\\,0)$: concave up (∪) on the left and concave down (∩) on the right.'), math: same('$f\'\'(x)=-6x=0\\ \\to\\ x=0$') }
        ],
        takeaway: say('Polinomio bat marrazteko: ardatzekiko ebaki-puntuak, adarrak (maila handieneko gaiak ematen ditu), maximoak eta minimoak $f\'$ deribatuarekin, eta inflexioak $f\'\'$ deribatuarekin. Puntuak lotzen dira, hazkundea errespetatuz.', 'Para dibujar un polinomio: cortes con los ejes, ramas (las marca el término de mayor grado), máximos y mínimos con $f\'$, e inflexiones con $f\'\'$. Se unen los puntos respetando el crecimiento.', 'لرسم حدودية: نقاط التقاطع مع المحورين، والفروع (يحددها الحد ذو الدرجة الكبرى)، والقيم العظمى والصغرى بـ $f\'$، والانعطاف بـ $f\'\'$. ثم نصل النقاط مع احترام التزايد والتناقص.', 'To draw a polynomial: intercepts with the axes, branches (set by the term of highest degree), maxima and minima with $f\'$, and inflections with $f\'\'$. Join the points following where it increases and decreases.'),
        figure: (language) => <PolynomialGraphFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'rational-graph',
        stage: 'graphs',
        title: say('Funtzio arrazionalak irudikatzea', 'Representar funciones racionales', 'رسم الدوال الكسرية', 'Sketching rational functions'),
        goal: say('Funtzio arrazional bat marraztea, bere izate-eremuarekin, asintotekin, muturrekin eta hazkundearekin.', 'Dibujar una función racional con su dominio, sus asíntotas, sus extremos y su crecimiento.', 'رسم دالة كسرية بمجالها ومقارباتها وقيمها القصوى وتزايدها.', 'Draw a rational function with its domain, its asymptotes, its extrema and where it increases.'),
        needs: [
            { unit: LIMITS, topic: 'vertical-horizontal', title: { eu: 'Asintota bertikalak eta horizontalak', es: 'Asíntotas verticales y horizontales', en: 'Vertical and horizontal asymptotes', ar: 'المقاربات الرأسية والأفقية' } },
            { unit: LIMITS, topic: 'oblique', title: { eu: 'Asintota zeiharrak', es: 'Asíntotas oblicuas', en: 'Oblique asymptotes', ar: 'المقاربات المائلة' } }
        ],
        problem: say('Irudikatu $f(x)=\\frac{x^2}{x-1}$.', 'Representa $f(x)=\\frac{x^2}{x-1}$.', 'ارسم $f(x)=\\frac{x^2}{x-1}$.', 'Sketch $f(x)=\\frac{x^2}{x-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izate-eremua: $x\\ne 1$. Asintota bertikala $x=1$; zeiharra $y=x+1$, $\\frac{x^2}{x-1}=x+1+\\frac{1}{x-1}$ delako.', 'Dominio: $x\\ne 1$. Asíntota vertical $x=1$; oblicua $y=x+1$, porque $\\frac{x^2}{x-1}=x+1+\\frac{1}{x-1}$.', 'المجال: $x\\ne 1$. مقارب رأسي $x=1$، ومائل $y=x+1$ لأن $\\frac{x^2}{x-1}=x+1+\\frac{1}{x-1}$.', 'Domain: $x\\ne 1$. Vertical asymptote $x=1$; oblique $y=x+1$, because $\\frac{x^2}{x-1}=x+1+\\frac{1}{x-1}$.') },
            { text: say('Muturrak.', 'Los extremos.', 'القيم القصوى.', 'The extrema.'), math: same('$\\begin{aligned}&f\'(x)=\\frac{x^2-2x}{(x-1)^2}=0\\\\ &\\to\\ x=0,\\ x=2\\end{aligned}$') },
            { text: say('Maximoa $(0,\\,0)$ puntuan eta minimoa $(2,\\,4)$ puntuan. Beherakorra da $(0,\\,1)\\cup(1,\\,2)$ tartean: 1 puntua ez dago izate-eremuan.', 'Máximo en $(0,\\,0)$ y mínimo en $(2,\\,4)$. Decrece en $(0,\\,1)\\cup(1,\\,2)$: el 1 no está en el dominio.', 'قيمة عظمى عند $(0,\\,0)$ وصغرى عند $(2,\\,4)$. تتناقص في $(0,\\,1)\\cup(1,\\,2)$: العدد 1 ليس في المجال.', 'A maximum at $(0,\\,0)$ and a minimum at $(2,\\,4)$. It decreases on $(0,\\,1)\\cup(1,\\,2)$: 1 is not in the domain.') }
        ],
        takeaway: say('Funtzio arrazional batean, lehenik izate-eremua eta asintotak: bertikala izendatzailea anulatzen den tokian; horizontala edo zeiharra, mailen arabera. Gero, $f\'$ zeinu-taularekin, izate-eremutik kanpoko puntuak ahaztu gabe.', 'En una racional, primero el dominio y las asíntotas: la vertical donde se anula el denominador; la horizontal u oblicua, por los grados. Después, $f\'$ con la tabla de signos, sin olvidar los puntos fuera del dominio.', 'في الدالة الكسرية نبدأ بالمجال والمقاربات: الرأسي حيث ينعدم المقام، والأفقي أو المائل حسب الدرجات. ثم $f\'$ بجدول الإشارات دون نسيان النقاط الواقعة خارج المجال.', 'For a rational function, first the domain and the asymptotes: the vertical one where the denominator is zero; the horizontal or oblique one, from the degrees. Then $f\'$ with the sign chart, without forgetting the points outside the domain.'),
        figure: (language) => <RationalGraphFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'exp-log-graph',
        stage: 'graphs',
        title: say('Esponentzialak eta logaritmikoak irudikatzea', 'Representar exponenciales y logarítmicas', 'رسم الدوال الأسية واللوغاريتمية', 'Sketching exponential and logarithmic functions'),
        goal: say('$e^x$ edo $\\ln x$ duten funtzioak marraztea: izate-eremua, asintotak, muturrak eta kurbadura.', 'Dibujar funciones con $e^x$ o $\\ln x$: dominio, asíntotas, extremos y curvatura.', 'رسم دوال فيها $e^x$ أو $\\ln x$: المجال والمقاربات والقيم القصوى والتقعّر.', 'Draw functions with $e^x$ or $\\ln x$: domain, asymptotes, extrema and concavity.'),
        needs: [
            { unit: DERIVATIVES, topic: 'exp-log', title: { eu: 'Esponentzialak eta logaritmoak', es: 'Exponenciales y logaritmos', en: 'Exponentials and logarithms', ar: 'الدوال الأسية واللوغاريتمية' } }
        ],
        problem: say('Irudikatu $f(x)=x\\,e^x$.', 'Representa $f(x)=x\\,e^x$.', 'ارسم $f(x)=x\\,e^x$.', 'Sketch $f(x)=x\\,e^x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izate-eremua $\\mathbb{R}$; ardatzak $(0,\\,0)$ puntuan mozten ditu. $x\\to-\\infty$ denean, $f(x)\\to 0$: asintota horizontala $y=0$, ezkerrean.', 'Dominio $\\mathbb{R}$; corta los ejes en $(0,\\,0)$. Si $x\\to-\\infty$, $f(x)\\to 0$: asíntota horizontal $y=0$ por la izquierda.', 'المجال $\\mathbb{R}$، وتقطع المحورين عند $(0,\\,0)$. وإذا $x\\to-\\infty$ فإن $f(x)\\to 0$: مقارب أفقي $y=0$ يسارًا.', 'Domain $\\mathbb{R}$; it crosses the axes at $(0,\\,0)$. As $x\\to-\\infty$, $f(x)\\to 0$: horizontal asymptote $y=0$ on the left.') },
            { text: say('Minimoa $x=-1$ puntuan, $f(-1)=-\\frac{1}{e}$ balioarekin.', 'Mínimo en $x=-1$, con $f(-1)=-\\frac{1}{e}$.', 'قيمة صغرى عند $x=-1$ مع $f(-1)=-\\frac{1}{e}$.', 'A minimum at $x=-1$, with $f(-1)=-\\frac{1}{e}$.'), math: same('$\\begin{aligned}&f\'(x)=(1+x)\\,e^x=0\\\\ &\\to\\ x=-1\\end{aligned}$') },
            { text: say('Inflexioa $x=-2$ puntuan: ganbila (∩) ezkerrean eta ahurra (∪) eskuinean.', 'Inflexión en $x=-2$: convexa (∩) a la izquierda y cóncava (∪) a la derecha.', 'انعطاف عند $x=-2$: مقعّرة نحو الأسفل (∩) يسارًا ونحو الأعلى (∪) يمينًا.', 'An inflection at $x=-2$: concave down (∩) on the left and concave up (∪) on the right.'), math: same('$\\begin{aligned}&f\'\'(x)=(2+x)\\,e^x=0\\\\ &\\to\\ x=-2\\end{aligned}$') }
        ],
        takeaway: say('$e^x$ ez da inoiz anulatzen; beraz, $f\'$ deribatuaren zeinua beste faktoreek ematen dute. $\\ln x$ funtzioa $x>0$ denean bakarrik existitzen da. Asintotak limiteetatik ateratzen dira.', '$e^x$ nunca se anula, así que el signo de $f\'$ lo dan los otros factores. $\\ln x$ solo existe para $x>0$. Las asíntotas salen de los límites.', 'لا تنعدم $e^x$ أبدًا، فتحدد العوامل الأخرى إشارة $f\'$. ولا توجد $\\ln x$ إلا عندما $x>0$. وتُستخرج المقاربات من النهايات.', '$e^x$ is never zero, so the sign of $f\'$ comes from the other factors. $\\ln x$ only exists for $x>0$. The asymptotes come from the limits.'),
        figure: (language) => <ExpGraphFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bachApplicationsTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...localizeNames(bachApplicationsLessonTexts[topic.id as BachApplicationsTopicId]),
    ...localizeNames(bachApplicationsLessonChecks[topic.id as BachApplicationsTopicId])
}))
