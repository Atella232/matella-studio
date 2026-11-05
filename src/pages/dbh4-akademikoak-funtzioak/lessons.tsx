import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { FormulaFigure, FunctionTestFigure } from '../dbh2-funtzioak-v2/figures'
import { ContinuityFigure, DomainGraphFigure, ExtremaFigure, PeriodicFigure, RateFigure } from '../dbh4-aplikatuak-funtzioak/figures'
import {
    CubicInterceptsFigure,
    DomainCasesFigure,
    JoinFigure,
    PiecewiseFigure,
    RationalDomainFigure,
    SignChartFigure,
    SignFigure,
    SymmetryFigure
} from './figures'
import { same, say } from './text'
import { functionsAkLessonChecks, type FunctionsAkTopicId } from './lessonChecks'
import { functionsAkLessonTexts } from './lessonTexts'

/* ==========================================================================
   Funtzioak · 4. DBH akademikoak — stages and lessons, following Anaya
   4.º Académicas unit 4 (Funciones. Características: basic concepts,
   images, the domain of fractions and roots, continuity and
   discontinuities, increasing and decreasing, the average rate of change,
   tendency and periodicity) and Santillana 4.º Académicas unit 9
   (Funciones: domain and range, intercepts of polynomials, symmetry, even
   and odd functions, and functions defined piecewise).
   ========================================================================== */

export type FunctionsAkStageId = 'concept' | 'domain' | 'continuity' | 'features' | 'change'

export const functionsAkStages: UnitStage[] = [
    { id: 'concept', tone: 'blue', title: { eu: 'Funtzioak eta grafikoak', es: 'Funciones y gráficas', en: 'Functions and graphs', ar: 'الدوال والرسوم' } },
    { id: 'domain', tone: 'violet', title: { eu: 'Izate-eremua', es: 'Dominio de definición', en: 'Domain of definition', ar: 'مجال التعريف' } },
    { id: 'continuity', tone: 'mustard', title: { eu: 'Jarraitutasuna eta zatiak', es: 'Continuidad y trozos', en: 'Continuity and pieces', ar: 'الاتصال والأجزاء' } },
    { id: 'features', tone: 'coral', title: { eu: 'Ebakidurak, zeinua, simetria', es: 'Cortes, signo, simetría', en: 'Intercepts, sign, symmetry', ar: 'التقاطع والإشارة والتناظر' } },
    { id: 'change', tone: 'green', title: { eu: 'Hazkundea eta periodoa', es: 'Crecimiento y periodo', en: 'Growth and period', ar: 'التزايد والدورية' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Functions and graphs ---------- */
    {
        id: 'what-is',
        stage: 'concept',
        title: say('Funtzioak eta aldagaiak', 'Funciones y variables', 'الدوال والمتغيرات', 'Functions and variables'),
        goal: say('Erlazio bat funtzioa den erabakitzea, aldagai askea eta menpekoa bereiztea eta grafiko bat funtzioarena den egiaztatzea.', 'Decidir si una relación es una función, distinguir la variable independiente de la dependiente y comprobar si una gráfica es de una función.', 'تقرير ما إذا كانت علاقة دالة، والتمييز بين المتغير المستقل والتابع، والتحقق مما إذا كان رسم ما لدالة.', 'Decide whether a relation is a function, tell the independent variable from the dependent one, and check whether a graph shows a function.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'function-concept', title: { eu: 'Funtzio baten kontzeptua', es: 'Concepto de función', en: 'What a function is', ar: 'مفهوم الدالة' } }
        ],
        problem: say('$y^{2}=x$ erlazioa funtzioa da? Eta $y=x^{2}$?', '¿Es función la relación $y^{2}=x$? ¿Y $y=x^{2}$?', 'هل العلاقة $y^{2}=x$ دالة؟ وماذا عن $y=x^{2}$؟', 'Is the relation $y^{2}=x$ a function? What about $y=x^{2}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x=4$ jarri lehenengoan: bi $y$.', 'Pon $x=4$ en la primera: dos $y$.', 'ضع $x=4$ في الأولى: قيمتان لـ $y$.', 'Put $x=4$ into the first one: two $y$-values.'), math: same('$y^{2}=4\\ \\to\\ y=2,\\ y=-2$') },
            { text: say('Bigarrenean $x$ bakoitzak $y$ bakarra du: funtzioa da.', 'En la segunda cada $x$ da una sola $y$: es función.', 'في الثانية تعطي كل $x$ قيمة $y$ واحدة: إنها دالة.', 'In the second, each $x$ gives only one $y$: it is a function.'), math: same('$f(4)=16$') }
        ],
        takeaway: say('Funtzioa: x bakoitzeko y bakarra. Zuzen bertikal batek ez du kurba bitan ebakitzen.', 'Función: cada x, una sola y. Ninguna recta vertical corta la curva dos veces.', 'الدالة: لكل x قيمة y واحدة. لا يقطع أي مستقيم رأسي المنحنى مرتين.', 'Function: each x, one single y. No vertical line crosses the curve twice.'),
        figure: (language) => <FunctionTestFigure language={language} />
    },
    {
        id: 'images',
        stage: 'concept',
        title: say('Irudiak eta aurreirudiak', 'Imágenes y antiimágenes', 'الصور والأصول', 'Images and preimages'),
        goal: say('Formula batekin irudiak kalkulatzea eta irudi jakin bat duten x-ak aurkitzea ekuazio bat ebatziz.', 'Calcular imágenes con una fórmula y encontrar las x que tienen una imagen dada resolviendo una ecuación.', 'حساب الصور بصيغة، وإيجاد قيم x التي لها صورة معطاة بحل معادلة.', 'Calculate images using a formula, and find the x-values that have a given image by solving an equation.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'quadratic-formula', title: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', en: 'Second-degree equations', ar: 'معادلات الدرجة الثانية' } }
        ],
        problem: say('$f(x)=x^{2}-2x$ izanik, kalkulatu $f(-3)$ eta $f(x)=3$ betetzen duten x-ak.', 'Siendo $f(x)=x^{2}-2x$, calcula $f(-3)$ y las x que cumplen $f(x)=3$.', 'إذا كان $f(x)=x^{2}-2x$ فاحسب $f(-3)$ وقيم x التي تحقق $f(x)=3$.', 'Given $f(x)=x^{2}-2x$, calculate $f(-3)$ and the x-values that satisfy $f(x)=3$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu parentesi artean.', 'Sustituye entre paréntesis.', 'عوّض بين قوسين.', 'Substitute it in brackets.'), math: same('$f(-3)=9+6=15$') },
            { text: say('Berdindu 3 zenbakiari eta ebatzi.', 'Iguala a 3 y resuelve.', 'ساوِ بـ 3 وحُلّ.', 'Set it equal to 3 and solve.'), math: same('$x^{2}-2x-3=0$') },
            { text: say('Bi aurreirudi.', 'Dos antiimágenes.', 'أصلان.', 'Two preimages.'), math: same('$x=3,\\ x=-1$') }
        ],
        takeaway: say('Irudia: ordeztu eta kalkulatu. Aurreirudia: ebatzi ekuazioa eta begiratu zentzua duen.', 'Imagen: sustituye y calcula. Antiimagen: resuelve la ecuación y mira si tiene sentido.', 'الصورة: عوّض واحسب. الأصل: حُلّ المعادلة وتأكد من أن للحل معنى.', 'Image: substitute and calculate. Preimage: solve the equation and check whether it makes sense.'),
        figure: (language) => <FormulaFigure language={language} />
    },
    {
        id: 'range-graph',
        stage: 'concept',
        title: say('Izate-eremua eta ibiltartea grafikoan', 'Dominio y recorrido en la gráfica', 'المجال والمدى في الرسم', 'Domain and range on a graph'),
        goal: say('Grafiko baten izate-eremua eta ibiltartea irakurtzea eta tarte eta bildura gisa idaztea.', 'Leer el dominio y el recorrido de una gráfica y escribirlos como intervalos y uniones.', 'قراءة مجال الرسم ومداه وكتابتهما فترات واتحادات.', 'Read the domain and range of a graph and write them as intervals and unions.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'domain-range', title: { eu: 'Definizio-eremua eta ibilbidea', es: 'Dominio y recorrido', en: 'Domain and range', ar: 'المجال والمدى' } },
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'intervals', title: { eu: 'Tarteak eta zuzenerdiak', es: 'Intervalos y semirrectas', en: 'Intervals and half-lines', ar: 'الفترات وأنصاف المستقيمات' } }
        ],
        problem: say('Grafiko bat $(-4,\\,-2)$ puntu betetik $(5,\\,-1)$ puntu betera doa, eta gehienez $y=4$ eta gutxienez $y=-2$ hartzen ditu. Idatzi izate-eremua eta ibiltartea.', 'Una gráfica va del punto relleno $(-4,\\,-2)$ al punto relleno $(5,\\,-1)$, y como mucho alcanza $y=4$ y como poco $y=-2$. Escribe el dominio y el recorrido.', 'يمتد رسم من النقطة الممتلئة $(-4,\\,-2)$ إلى النقطة الممتلئة $(5,\\,-1)$، وأكبر قيمة يبلغها $y=4$ وأصغرها $y=-2$. اكتب المجال والمدى.', 'A graph runs from the filled-in dot $(-4,\\,-2)$ to the filled-in dot $(5,\\,-1)$. Its highest value is $y=4$ and its lowest is $y=-2$. Write the domain and the range.'),
        stepsKind: 'steps',
        steps: [
            { text: say('X ardatzean, ezkerreko muturretik eskuinekora.', 'En el eje X, del extremo izquierdo al derecho.', 'على محور X من الطرف الأيسر إلى الأيمن.', 'On the x-axis, from the left end to the right end.'), math: same('$\\text{Dom}\\,f=[-4,\\,5]$') },
            { text: say('Y ardatzean, txikienetik handienera.', 'En el eje Y, del más bajo al más alto.', 'على محور Y من الأدنى إلى الأعلى.', 'On the y-axis, from the lowest to the highest.'), math: same('$\\text{Rec}\\,f=[-2,\\,4]$') }
        ],
        takeaway: say('Izate-eremua X ardatzean, ibiltartea Y ardatzean. Puntu betea: kortxetea; hutsa: parentesia.', 'Dominio en el eje X; recorrido en el eje Y. Punto relleno: corchete; hueco: paréntesis.', 'المجال على محور X والمدى على محور Y. النقطة الممتلئة: قوس معقوف؛ الفارغة: قوس عادي.', 'Domain on the x-axis; range on the y-axis. Filled-in dot: square bracket; open dot: round bracket.'),
        figure: (language) => <DomainGraphFigure language={language} />
    },

    /* ---------- 2. Domain of definition ---------- */
    {
        id: 'rational-domain',
        stage: 'domain',
        title: say('Zatikien izate-eremua', 'Dominio de las fracciones', 'مجال الكسور', 'Domain of fractions'),
        goal: say('Funtzio arrazional baten izate-eremua kalkulatzea izendatzailea anulatzen duten balioak kenduta.', 'Calcular el dominio de una función racional quitando los valores que anulan el denominador.', 'حساب مجال دالة كسرية بحذف القيم التي تعدم المقام.', 'Find the domain of a rational function by removing the values that make the denominator 0.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'algebraic-fractions', title: { eu: 'Zatiki aljebraikoak', es: 'Fracciones algebraicas', en: 'Algebraic fractions', ar: 'الكسور الجبرية' } }
        ],
        problem: say('Kalkulatu $y=\\dfrac{x+3}{x^{2}-4}$ funtzioaren izate-eremua.', 'Halla el dominio de $y=\\dfrac{x+3}{x^{2}-4}$.', 'أوجد مجال $y=\\dfrac{x+3}{x^{2}-4}$.', 'Find the domain of $y=\\dfrac{x+3}{x^{2}-4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea berdin 0.', 'Denominador igual a 0.', 'المقام يساوي 0.', 'Set the denominator equal to 0.'), math: same('$x^{2}-4=0\\ \\to\\ x=\\pm 2$') },
            { text: say('Kendu bi balioak.', 'Quita los dos valores.', 'احذف القيمتين.', 'Remove both values.'), math: same('$\\text{Dom}\\,f=\\mathbb{R}-\\{-2,\\,2\\}$') }
        ],
        takeaway: say('Zatikia: kendu izendatzailea anulatzen duten x-ak. Zenbakitzaileak ez du ezer kentzen.', 'Fracción: quita las x que anulan el denominador. El numerador no quita nada.', 'الكسر: احذف قيم x التي تعدم المقام. البسط لا يحذف شيئًا.', 'Fraction: remove the x-values that make the denominator 0. The numerator removes nothing.'),
        figure: (language) => <RationalDomainFigure language={language} />
    },
    {
        id: 'radical-domain',
        stage: 'domain',
        title: say('Erroen izate-eremua', 'Dominio de las raíces', 'مجال الجذور', 'Domain of radicals'),
        goal: say('Erro karratu baten izate-eremua kalkulatzea errokizuna ≥ 0 inekuazioa ebatziz, lineala edo bigarren mailakoa izan.', 'Calcular el dominio de una raíz cuadrada resolviendo la inecuación radicando ≥ 0, sea lineal o de segundo grado.', 'حساب مجال جذر تربيعي بحل المتراجحة: ما تحت الجذر ≥ 0، خطية كانت أو من الدرجة الثانية.', 'Find the domain of a square root by solving the inequality radicand ≥ 0, whether it is linear or quadratic.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'quadratic-inequality', title: { eu: 'Bigarren mailako inekuazioak', es: 'Inecuaciones de segundo grado', en: 'Second-degree inequalities', ar: 'متراجحات الدرجة الثانية' } }
        ],
        problem: say('Kalkulatu $y=\\sqrt{x^{2}+6x-7}$ funtzioaren izate-eremua.', 'Halla el dominio de $y=\\sqrt{x^{2}+6x-7}$.', 'أوجد مجال $y=\\sqrt{x^{2}+6x-7}$.', 'Find the domain of $y=\\sqrt{x^{2}+6x-7}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Errokizunaren erroak: $x=-7$ eta $x=1$.', 'Raíces del radicando: $x=-7$ y $x=1$.', 'جذرا ما تحت الجذر: $x=-7$ و$x=1$.', 'Roots of the radicand: $x=-7$ and $x=1$.'), math: same('$x^{2}+6x-7=0$') },
            { text: say('Zeinuak: + − +. Hartu positiboak eta muturrak.', 'Signos: + − +. Toma los positivos y los extremos.', 'الإشارات: + − +. خذ الموجبة والطرفين.', 'Signs: + − +. Take the positive regions and the endpoints.'), math: same('$(-\\infty,\\,-7]\\cup[1,\\,+\\infty)$') }
        ],
        takeaway: say('Erro karratua: errokizuna ≥ 0. Bigarren mailakoa: erroak, zeinu-taula eta muturrak barne.', 'Raíz cuadrada: radicando ≥ 0. Si es de segundo grado: raíces, tabla de signos y extremos incluidos.', 'الجذر التربيعي: ما تحته ≥ 0. من الدرجة الثانية: الجذران وجدول الإشارات والطرفان ضمنها.', 'Square root: radicand ≥ 0. If it is quadratic: roots, sign table, and endpoints included.'),
        figure: (language) => <SignChartFigure language={language} />
    },
    {
        id: 'mixed-domain',
        stage: 'domain',
        title: say('Izate-eremuak konbinatzea', 'Dominios combinados', 'مجالات مركّبة', 'Combined domains'),
        goal: say('Erroak eta zatikiak batera dituzten funtzioen izate-eremua eta problema baten izate-eremua kalkulatzea.', 'Calcular el dominio de funciones con raíces y fracciones a la vez, y el dominio de un problema.', 'حساب مجال دوال فيها جذور وكسور معًا، ومجال مسألة.', 'Find the domain of functions with roots and fractions at the same time, and the domain of a problem.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'interval-ops', title: { eu: 'Tarteen bildura eta ebakidura', es: 'Unión e intersección de intervalos', en: 'Union and intersection of intervals', ar: 'اتحاد الفترات وتقاطعها' } }
        ],
        problem: say('Kalkulatu $y=\\dfrac{\\sqrt{x+2}}{x-1}$ funtzioaren izate-eremua.', 'Halla el dominio de $y=\\dfrac{\\sqrt{x+2}}{x-1}$.', 'أوجد مجال $y=\\dfrac{\\sqrt{x+2}}{x-1}$.', 'Find the domain of $y=\\dfrac{\\sqrt{x+2}}{x-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erroa: errokizuna ≥ 0.', 'Raíz: radicando ≥ 0.', 'الجذر: ما تحته ≥ 0.', 'Root: radicand ≥ 0.'), math: same('$x+2\\ge 0\\ \\to\\ x\\ge -2$') },
            { text: say('Zatikia: izendatzailea ≠ 0.', 'Fracción: denominador ≠ 0.', 'الكسر: المقام ≠ 0.', 'Fraction: denominator ≠ 0.'), math: same('$x-1\\ne 0\\ \\to\\ x\\ne 1$') },
            { text: say('Biak batera.', 'Las dos a la vez.', 'الشرطان معًا.', 'Both at the same time.'), math: same('$[-2,\\,1)\\cup(1,\\,+\\infty)$') }
        ],
        takeaway: say('Erroa izendatzailean: errokizuna > 0, hertsia. Baldintza bat baino gehiago: guztiak batera.', 'Raíz en el denominador: radicando > 0, estricto. Varias condiciones: todas a la vez.', 'الجذر في المقام: ما تحته > 0 تمامًا. عدة شروط: كلها معًا.', 'Root in the denominator: radicand > 0, strictly. Several conditions: all at once.'),
        figure: (language) => <DomainCasesFigure language={language} />
    },

    /* ---------- 3. Continuity and pieces ---------- */
    {
        id: 'discontinuities',
        stage: 'continuity',
        title: say('Jarraitutasuna eta etenuneak', 'Continuidad y discontinuidades', 'الاتصال والانقطاعات', 'Continuity and discontinuities'),
        goal: say('Funtzio bat puntu batean jarraitua den erabakitzea eta etenune motak bereiztea: saihesgarria, jauzi finitukoa eta jauzi infinitukoa.', 'Decidir si una función es continua en un punto y distinguir los tipos de discontinuidad: evitable, de salto finito y de salto infinito.', 'تقرير ما إذا كانت الدالة متصلة عند نقطة، والتمييز بين أنواع الانقطاع: القابل للإزالة والقفزة المنتهية والقفزة اللانهائية.', 'Decide whether a function is continuous at a point, and tell apart the types of discontinuity: removable, finite jump and infinite jump.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'simplify', title: { eu: 'Zatiki aljebraikoak sinplifikatzea', es: 'Simplificar fracciones algebraicas', en: 'Simplifying algebraic fractions', ar: 'تبسيط الكسور الجبرية' } }
        ],
        problem: say('Aztertu $f(x)=\\dfrac{x^{2}-1}{x-1}$ funtzioaren jarraitutasuna $x=1$ puntuan.', 'Estudia la continuidad de $f(x)=\\dfrac{x^{2}-1}{x-1}$ en $x=1$.', 'ادرس اتصال $f(x)=\\dfrac{x^{2}-1}{x-1}$ عند $x=1$.', 'Study the continuity of $f(x)=\\dfrac{x^{2}-1}{x-1}$ at $x=1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x=1$ puntuan izendatzailea 0 da: ez dago definituta.', 'En $x=1$ el denominador es 0: no está definida.', 'عند $x=1$ يكون المقام 0: ليست معرّفة.', 'At $x=1$ the denominator is 0: it is not defined there.'), math: same('$\\frac{0}{0}$') },
            { text: say('Sinplifikatu beste puntuetarako.', 'Simplifica para los demás puntos.', 'بسّط لبقية النقاط.', 'For the other points, simplify it.'), math: same('$\\frac{(x-1)(x+1)}{x-1}=x+1$') },
            { text: say('Zulo bat $(1,\\,2)$ puntuan: saihesgarria.', 'Un agujero en $(1,\\,2)$: evitable.', 'ثقب عند $(1,\\,2)$: قابل للإزالة.', 'A hole at $(1,\\,2)$: removable.') }
        ],
        takeaway: say('Zuloa: saihesgarria. Bi balio desberdin: jauzi finitua. Adar infinitua: jauzi infinitua.', 'Agujero: evitable. Dos valores distintos: salto finito. Rama infinita: salto infinito.', 'ثقب: قابل للإزالة. قيمتان مختلفتان: قفزة منتهية. فرع لانهائي: قفزة لانهائية.', 'Hole: removable. Two different values: finite jump. Infinite branch: infinite jump.'),
        figure: (language) => <ContinuityFigure language={language} />
    },
    {
        id: 'piecewise',
        stage: 'continuity',
        title: say('Zatika definitutako funtzioak', 'Funciones definidas a trozos', 'الدوال المعرّفة على أجزاء', 'Piecewise functions'),
        goal: say('Zatika definitutako funtzio baten irudiak kalkulatzea eta haren grafikoa marraztea.', 'Calcular imágenes de una función definida a trozos y dibujar su gráfica.', 'حساب صور دالة معرّفة على أجزاء ورسم بيانها.', 'Calculate images of a piecewise function and draw its graph.'),
        problem: say('$f(x)=2x+1$ ($x<1$) eta $f(x)=4-x$ ($x\\ge 1$) izanik, kalkulatu $f(-2)$, $f(1)$ eta $f(3)$.', 'Si $f(x)=2x+1$ ($x<1$) y $f(x)=4-x$ ($x\\ge 1$), calcula $f(-2)$, $f(1)$ y $f(3)$.', 'إذا كان $f(x)=2x+1$ ($x<1$) و$f(x)=4-x$ ($x\\ge 1$) فاحسب $f(-2)$ و$f(1)$ و$f(3)$.', 'If $f(x)=2x+1$ ($x<1$) and $f(x)=4-x$ ($x\\ge 1$), calculate $f(-2)$, $f(1)$ and $f(3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$-2<1$: lehen zatia.', '$-2<1$: primer trozo.', '$-2<1$: الجزء الأول.', '$-2<1$: first piece.'), math: same('$f(-2)=2\\cdot(-2)+1=-3$') },
            { text: say('$1\\ge 1$: bigarren zatia.', '$1\\ge 1$: segundo trozo.', '$1\\ge 1$: الجزء الثاني.', '$1\\ge 1$: second piece.'), math: same('$f(1)=4-1=3$') },
            { text: say('$3\\ge 1$: bigarren zatia.', '$3\\ge 1$: segundo trozo.', '$3\\ge 1$: الجزء الثاني.', '$3\\ge 1$: second piece.'), math: same('$f(3)=4-3=1$') }
        ],
        takeaway: say('Lehenik zatia, gero formula. Puntu betea ≤ edo ≥; hutsa < edo >.', 'Primero el trozo, después la fórmula. Punto relleno con ≤ o ≥; hueco con < o >.', 'أولًا الجزء ثم الصيغة. النقطة الممتلئة مع ≤ أو ≥، والفارغة مع < أو >.', 'First the piece, then the formula. Filled-in dot for ≤ or ≥; open dot for < or >.'),
        figure: (language) => <PiecewiseFigure language={language} />
    },
    {
        id: 'piecewise-continuity',
        stage: 'continuity',
        title: say('Zatien arteko jarraitutasuna', 'Continuidad entre trozos', 'الاتصال بين الأجزاء', 'Continuity between pieces'),
        goal: say('Zatika definitutako funtzio bat lotuneetan jarraitua den aztertzea eta jarraitua izateko parametro bat kalkulatzea.', 'Estudiar si una función a trozos es continua en las uniones y calcular un parámetro para que lo sea.', 'دراسة اتصال دالة معرّفة على أجزاء عند نقاط الالتقاء، وحساب وسيط لتكون متصلة.', 'Study whether a piecewise function is continuous at the joins, and calculate a parameter that makes it continuous.'),
        problem: say('Kalkulatu $k$, $f(x)=x+k$ ($x<3$) eta $f(x)=x^{2}-4$ ($x\\ge 3$) funtzioa jarraitua izan dadin.', 'Halla $k$ para que $f(x)=x+k$ ($x<3$), $f(x)=x^{2}-4$ ($x\\ge 3$) sea continua.', 'أوجد $k$ لتكون $f(x)=x+k$ ($x<3$)، $f(x)=x^{2}-4$ ($x\\ge 3$) متصلة.', 'Find $k$ so that $f(x)=x+k$ ($x<3$), $f(x)=x^{2}-4$ ($x\\ge 3$) is continuous.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerreko zatia $x=3$ puntuan.', 'El trozo izquierdo en $x=3$.', 'الجزء الأيسر عند $x=3$.', 'The left piece at $x=3$.'), math: same('$3+k$') },
            { text: say('Eskuinekoa $x=3$ puntuan.', 'El derecho en $x=3$.', 'الأيمن عند $x=3$.', 'The right piece at $x=3$.'), math: same('$3^{2}-4=5$') },
            { text: say('Berdindu.', 'Iguala.', 'ساوِ بينهما.', 'Set them equal.'), math: same('$3+k=5\\ \\to\\ k=2$') }
        ],
        takeaway: say('Lotunean, bi zatien balioak berdinak: jarraitua. Desberdinak: jauzia.', 'En la unión, los dos trozos dan lo mismo: continua. Distinto: salto.', 'عند نقطة الالتقاء: الجزءان يعطيان القيمة نفسها فهي متصلة، وإلا فقفزة.', 'At the join, the two pieces give the same value: continuous. Different values: jump.'),
        figure: (language) => <JoinFigure language={language} />
    },

    /* ---------- 4. Intercepts, sign and symmetry ---------- */
    {
        id: 'intercepts',
        stage: 'features',
        title: say('Ardatzekiko ebaki-puntuak', 'Puntos de corte con los ejes', 'نقاط التقاطع مع المحورين', 'Intercepts with the axes'),
        goal: say('Polinomio eta zatiki baten ebaki-puntuak kalkulatzea faktorizatuz edo ekuazio bikarratuak ebatziz.', 'Calcular los puntos de corte de polinomios y fracciones factorizando o resolviendo ecuaciones bicuadradas.', 'حساب نقاط تقاطع كثيرات الحدود والكسور بالتحليل أو بحل المعادلات ثنائية التربيع.', 'Find the intercepts of polynomials and fractions by factorising or solving biquadratic equations.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'intercepts', title: { eu: 'Ardatzekiko ebaki-puntuak', es: 'Puntos de corte con los ejes', en: 'Where a graph meets the axes', ar: 'نقاط التقاطع مع المحورين' } },
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'biquadratic', title: { eu: 'Ekuazio bikarratuak', es: 'Ecuaciones bicuadradas', en: 'Biquadratic equations', ar: 'المعادلات الثنائية التربيع' } }
        ],
        problem: say('Kalkulatu $y=x^{4}-5x^{2}+4$ funtzioaren ebaki-puntuak ardatzekin.', 'Halla los puntos de corte de $y=x^{4}-5x^{2}+4$ con los ejes.', 'أوجد نقاط تقاطع $y=x^{4}-5x^{2}+4$ مع المحورين.', 'Find the intercepts of $y=x^{4}-5x^{2}+4$ with the axes.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatza: $x=0$.', 'Eje Y: $x=0$.', 'محور Y: $x=0$.', 'y-axis: $x=0$.'), math: same('$(0,\\,4)$') },
            { text: say('X ardatza: $t=x^{2}$ eginda.', 'Eje X: con $t=x^{2}$.', 'محور X: بوضع $t=x^{2}$.', 'x-axis: use $t=x^{2}$.'), math: same('$t^{2}-5t+4=0\\ \\to\\ t=1,\\ t=4$') },
            { text: say('Lau ebaki.', 'Cuatro cortes.', 'أربع نقاط تقاطع.', 'Four intercepts.'), math: same('$x=\\pm 1,\\ x=\\pm 2$') }
        ],
        takeaway: say('Y ardatza: x = 0. X ardatza: y = 0 eta faktorizatu. Zatikietan, zenbakitzailea.', 'Eje Y: x = 0. Eje X: y = 0 y factoriza. En fracciones, el numerador.', 'محور Y: x = 0. محور X: y = 0 ثم حلّل. في الكسور: البسط.', 'y-axis: x = 0. x-axis: y = 0, and factorise. In fractions, the numerator.'),
        figure: (language) => <CubicInterceptsFigure language={language} />
    },
    {
        id: 'sign',
        stage: 'features',
        title: say('Funtzio baten zeinua', 'El signo de una función', 'إشارة الدالة', 'The sign of a function'),
        goal: say('Funtzio bat positiboa edo negatiboa den tarteak aurkitzea eta √f eta 1/f funtzioen izate-eremua ondorioztatzea.', 'Encontrar los intervalos donde una función es positiva o negativa y deducir el dominio de √f y de 1/f.', 'إيجاد الفترات التي تكون فيها الدالة موجبة أو سالبة، واستنتاج مجال √f و1/f.', 'Find the intervals where a function is positive or negative, and work out the domain of √f and of 1/f.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'quadratic-inequality', title: { eu: 'Bigarren mailako inekuazioak', es: 'Inecuaciones de segundo grado', en: 'Second-degree inequalities', ar: 'متراجحات الدرجة الثانية' } }
        ],
        problem: say('Aztertu $f(x)=x^{2}-4x$ funtzioaren zeinua eta idatzi $\\sqrt{x^{2}-4x}$ funtzioaren izate-eremua.', 'Estudia el signo de $f(x)=x^{2}-4x$ y escribe el dominio de $\\sqrt{x^{2}-4x}$.', 'ادرس إشارة $f(x)=x^{2}-4x$ واكتب مجال $\\sqrt{x^{2}-4x}$.', 'Study the sign of $f(x)=x^{2}-4x$ and write the domain of $\\sqrt{x^{2}-4x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebaki-puntuak.', 'Cortes.', 'نقاط التقاطع.', 'Intercepts.'), math: same('$x(x-4)=0\\ \\to\\ x=0,\\ x=4$') },
            { text: say('Probatu tarte bakoitzean: $f(-1)=5$, $f(1)=-3$, $f(5)=5$.', 'Prueba en cada intervalo: $f(-1)=5$, $f(1)=-3$, $f(5)=5$.', 'جرّب في كل فترة: $f(-1)=5$ و$f(1)=-3$ و$f(5)=5$.', 'Test each interval: $f(-1)=5$, $f(1)=-3$, $f(5)=5$.') },
            { text: say('Erroa: $f\\ge 0$.', 'La raíz: $f\\ge 0$.', 'الجذر: $f\\ge 0$.', 'Square root: $f\\ge 0$.'), math: same('$(-\\infty,\\,0]\\cup[4,\\,+\\infty)$') }
        ],
        takeaway: say('Zeinua ebaki-puntuetan bakarrik aldatzen da: probatu zenbaki bat tarte bakoitzean.', 'El signo solo cambia en los cortes: prueba un número en cada intervalo.', 'لا تتغير الإشارة إلا عند نقاط التقاطع: جرّب عددًا في كل فترة.', 'The sign only changes at the intercepts: test one number in each interval.'),
        figure: (language) => <SignFigure language={language} />
    },
    {
        id: 'symmetry',
        stage: 'features',
        title: say('Funtzio bikoitiak eta bakoitiak', 'Funciones pares e impares', 'الدوال الزوجية والفردية', 'Even and odd functions'),
        goal: say('f(−x) kalkulatuz funtzio bat bikoitia, bakoitia edo bat ere ez den erabakitzea eta grafikoaren simetria ezagutzea.', 'Decidir calculando f(−x) si una función es par, impar o ninguna de las dos, y reconocer la simetría de su gráfica.', 'تقرير ما إذا كانت الدالة زوجية أو فردية أو لا هذه ولا تلك بحساب f(−x)، والتعرف على تناظر رسمها.', 'Decide, by calculating f(−x), whether a function is even, odd or neither, and recognise the symmetry of its graph.'),
        needs: [
            { unit: 'dbh3/movimientos-plano', topic: 'axial-symmetry', title: { eu: 'Simetria axiala', es: 'Simetría axial', en: 'Reflection', ar: 'التناظر المحوري' } }
        ],
        problem: say('$f(x)=x^{3}-5x$ bikoitia, bakoitia ala bat ere ez da?', '¿Es $f(x)=x^{3}-5x$ par, impar o ninguna?', 'هل $f(x)=x^{3}-5x$ زوجية أم فردية أم لا هذه ولا تلك؟', 'Is $f(x)=x^{3}-5x$ even, odd or neither?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kalkulatu $f(-x)$.', 'Calcula $f(-x)$.', 'احسب $f(-x)$.', 'Calculate $f(-x)$.'), math: same('$(-x)^{3}-5(-x)=-x^{3}+5x$') },
            { text: say('$-f(x)$ da: bakoitia.', 'Es $-f(x)$: impar.', 'إنها $-f(x)$: فردية.', 'It is $-f(x)$: odd.'), math: same('$-x^{3}+5x=-(x^{3}-5x)$') }
        ],
        takeaway: say('Bikoitia: Y ardatzeko ispilua. Bakoitia: jatorriarekiko biraketa erdia.', 'Par: espejo en el eje Y. Impar: media vuelta respecto del origen.', 'الزوجية: مرآة على محور Y. الفردية: نصف دورة حول الأصل.', 'Even: mirror image in the y-axis. Odd: half turn about the origin.'),
        figure: (language) => <SymmetryFigure language={language} />
    },

    /* ---------- 5. Increasing, rate and period ---------- */
    {
        id: 'monotony',
        stage: 'change',
        title: say('Hazkundea, maximoak eta minimoak', 'Crecimiento, máximos y mínimos', 'التزايد والقيم العظمى والصغرى', 'Increasing and decreasing, maxima and minima'),
        goal: say('Funtzio bat gorakorra eta beherakorra den tarteak eta haren maximo eta minimo erlatiboak eta absolutuak aurkitzea.', 'Encontrar los intervalos donde una función crece y decrece y sus máximos y mínimos relativos y absolutos.', 'إيجاد فترات تزايد الدالة وتناقصها وقيمها العظمى والصغرى النسبية والمطلقة.', 'Find the intervals where a function increases and decreases, and its relative and absolute maxima and minima.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'growth', title: { eu: 'Gorakortasuna eta beherakortasuna', es: 'Crecimiento y decrecimiento', en: 'Increasing and decreasing', ar: 'التزايد والتناقص' } },
            { unit: 'dbh3/funciones-lineales', topic: 'vertex', title: { eu: 'Erpina eta simetria-ardatza', es: 'Vértice y eje de simetría', en: 'The vertex and the axis of symmetry', ar: 'الرأس ومحور التناظر' } }
        ],
        problem: say('Aztertu $y=x^{2}-6x+5$ funtzioaren hazkundea eta muturrak.', 'Estudia el crecimiento y los extremos de $y=x^{2}-6x+5$.', 'ادرس تزايد $y=x^{2}-6x+5$ وقيمها القصوى.', 'Study where $y=x^{2}-6x+5$ increases and decreases, and its extreme points.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erpinaren abszisa: $-\\frac{b}{2a}$.', 'Abscisa del vértice: $-\\frac{b}{2a}$.', 'الإحداثي السيني للرأس: $-\\frac{b}{2a}$.', 'x-coordinate of the vertex: $-\\frac{b}{2a}$.'), math: same('$x=\\frac{6}{2}=3$') },
            { text: say('Haren ordenatua.', 'Su ordenada.', 'إحداثيه الصادي.', 'Its y-coordinate.'), math: same('$y=9-18+5=-4$') },
            { text: say('$a>0$: beherakorra $(-\\infty,\\,3)$ tartean eta gorakorra $(3,\\,+\\infty)$ tartean.', '$a>0$: decrece en $(-\\infty,\\,3)$ y crece en $(3,\\,+\\infty)$.', '$a>0$: تتناقص في $(-\\infty,\\,3)$ وتتزايد في $(3,\\,+\\infty)$.', '$a>0$: decreases on $(-\\infty,\\,3)$ and increases on $(3,\\,+\\infty)$.') },
            { text: say('Minimoa erpinean.', 'Mínimo en el vértice.', 'الصغرى عند الرأس.', 'Minimum at the vertex.'), math: same('$(3,\\,-4)$') }
        ],
        takeaway: say('Tarteak x-ekin, irekiak. Muturrak puntu gisa: gorakorretik beherakorrera, maximoa.', 'Intervalos con las x, abiertos. Extremos como puntos: de crecer a decrecer, máximo.', 'الفترات بقيم x ومفتوحة. القيم القصوى نقاط: من التزايد إلى التناقص عظمى.', 'Intervals in terms of x, open. Extreme points: from increasing to decreasing, it is a maximum.'),
        figure: (language) => <ExtremaFigure language={language} />
    },
    {
        id: 'rate',
        stage: 'change',
        figureAfterSteps: true,
        title: say('Batez besteko aldakuntza-tasa', 'Tasa de variación media', 'معدل التغير المتوسط', 'Average rate of change'),
        goal: say('Tarte batean T.V.M. kalkulatzea, formula edo grafiko batetik, eta abiadura ertain gisa interpretatzea.', 'Calcular la T.V.M. en un intervalo, con una fórmula o una gráfica, e interpretarla como una velocidad media.', 'حساب معدل التغير المتوسط في فترة من صيغة أو رسم، وتفسيره سرعةً متوسطة.', 'Calculate the average rate of change over an interval, from a formula or a graph, and interpret it as an average speed.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'slope', title: { eu: 'Malda', es: 'La pendiente', en: 'The slope', ar: 'الميل' } }
        ],
        problem: say('Kalkulatu $f(x)=x^{2}-4x+5$ funtzioaren T.V.M. $[1,\\,4]$ tartean.', 'Halla la T.V.M. de $f(x)=x^{2}-4x+5$ en $[1,\\,4]$.', 'أوجد معدل التغير المتوسط لـ $f(x)=x^{2}-4x+5$ في $[1,\\,4]$.', 'Find the average rate of change of $f(x)=x^{2}-4x+5$ over $[1,\\,4]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturretako balioak.', 'Valores en los extremos.', 'القيمتان عند الطرفين.', 'Values at the endpoints.'), math: same('$f(1)=2\\qquad f(4)=5$') },
            { text: say('Zatidura.', 'El cociente.', 'خارج القسمة.', 'The quotient.'), math: same('$\\frac{5-2}{4-1}=1$') }
        ],
        takeaway: say('T.V.M.: y-ren aldaketa zati x-renaren. Zuzenkiaren malda; distantzian, abiadura ertaina.', 'T.V.M.: cambio de y entre cambio de x. La pendiente del segmento; en distancias, la velocidad media.', 'المعدل: تغير y على تغير x. ميل القطعة؛ وفي المسافات السرعة المتوسطة.', 'Average rate of change: change in y divided by change in x. It is the slope of the segment; for distances, it is the average speed.'),
        figure: (language) => <RateFigure language={language} />
    },
    {
        id: 'periodic',
        stage: 'change',
        figureAfterSteps: true,
        title: say('Periodikotasuna eta joera', 'Periodicidad y tendencia', 'الدورية والاتجاه', 'Periodicity and trend'),
        goal: say('Funtzio periodiko baten balioak periodoaren bidez kalkulatzea eta funtzio baten joera eta asintotak deskribatzea.', 'Calcular valores de una función periódica con su periodo y describir la tendencia y las asíntotas de una función.', 'حساب قيم دالة دورية بواسطة دورها، ووصف اتجاه الدالة وخطوط تقاربها.', 'Calculate values of a periodic function using its period, and describe the trend and asymptotes of a function.'),
        problem: say('Zisterna bat 2 minuturo betetzen eta husten da, eta $f(1)=20$ L. Zenbat ur dago 17. minutuan? Eta 1 h 9 min 30 s-tan, $f(1{,}5)=30$ bada?', 'Una cisterna se llena y se vacía cada 2 minutos, y $f(1)=20$ L. ¿Cuánta agua hay en el minuto 17? ¿Y a la 1 h 9 min 30 s, si $f(1{,}5)=30$?', 'يمتلئ خزان ويفرغ كل دقيقتين، و$f(1)=20$ ل. كم من الماء في الدقيقة 17؟ وبعد ساعة و9 دقائق و30 ثانية إذا كان $f(1{,}5)=30$؟', 'A tank fills and empties every 2 minutes, and $f(1)=20$ L. How much water is there at minute 17? And at 1 h 9 min 30 s, if $f(1{,}5)=30$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu periodoaz.', 'Divide entre el periodo.', 'اقسم على الدور.', 'Divide by the period.'), math: same('$17=8\\cdot 2+1$') },
            { text: say('1. minutuko balio bera.', 'El mismo valor que en el minuto 1.', 'القيمة نفسها في الدقيقة 1.', 'The same value as at minute 1.'), math: same('$f(17)=f(1)=20$') },
            { text: say('1 h 9 min 30 s = 69,5 min.', '1 h 9 min 30 s = 69,5 min.', '1 س 9 د 30 ث = 69.5 د.', '1 h 9 min 30 s = 69.5 min.'), math: same('$69{,}5=34\\cdot 2+1{,}5$') },
            { text: say('Beraz, $f(1{,}5)=30$ litro.', 'Así que $f(1{,}5)=30$ litros.', 'إذن $f(1{,}5)=30$ لترًا.', 'So $f(1{,}5)=30$ litres.') }
        ],
        takeaway: say('Periodikoa: kendu periodoa hondarrera iritsi arte. Joera: x oso handia denean y-ren balioa.', 'Periódica: quita el periodo hasta llegar al resto. Tendencia: el valor de y cuando x es muy grande.', 'الدورية: اطرح الدور حتى تصل إلى الباقي. الاتجاه: قيمة y عندما تكبر x كثيرًا.', 'Periodic: keep subtracting the period until you reach the remainder. Trend: the value of y when x is very large.'),
        figure: (language) => <PeriodicFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const functionsAkTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...functionsAkLessonTexts[topic.id as FunctionsAkTopicId], ...functionsAkLessonChecks[topic.id as FunctionsAkTopicId] }))
