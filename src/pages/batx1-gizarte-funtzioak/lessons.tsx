import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { DomainCasesFigure } from '../dbh4-akademikoak-funtzioak/figures'
import { AbsQuadraticFigure, LineKindsFigure } from '../dbh4-akademikoak-polinomikoak/figures'
import { HyperbolaFigure, ModelsFigure, RootGraphFigure, VertexFigure } from '../dbh4-aplikatuak-grafikoa/figures'
import { AreaFigure, AverageCostFigure, CopiesFigure, InterpolationFigure, ParkingFigure, RevenueFigure, TariffLinesFigure, ThreePointsFigure } from './figures'
import { socFunctionsLessonChecks, type SocFunctionsTopicId } from './lessonChecks'
import { socFunctionsLessonTexts } from './lessonTexts'
import { same, say } from './text'

/* ==========================================================================
   Funtzio elementalak · Batxilergoa 1 · Gizarte Zientziak — stages and
   lessons. The scope follows unit 4 «Funciones I» of the current Anaya
   Matemáticas aplicadas a las CCSS I (Suma Piezas), in its order: families
   and domain, linear functions and interpolation, quadratic functions
   (with the parabola through three points), inverse proportion and roots,
   piecewise functions and the absolute value. Transformations, the inverse
   and composition go to the next topic, as in that book. The contexts are
   economic and social; the 4. DBH lessons come back through «Review
   first» links and lend some of their drawings.
   ========================================================================== */

export type SocFunctionsStageId = 'families' | 'linear' | 'quadratic' | 'inverse' | 'piecewise'

export const socFunctionsStages: UnitStage[] = [
    { id: 'families', tone: 'blue', title: { eu: 'Funtzioak eta izate-eremua', es: 'Funciones y dominio', en: 'Functions and domain', ar: 'الدوال والمجال' } },
    { id: 'linear', tone: 'violet', title: { eu: 'Funtzio linealak eta interpolazioa', es: 'Funciones lineales e interpolación', en: 'Linear functions and interpolation', ar: 'الدوال الخطية والاستيفاء' } },
    { id: 'quadratic', tone: 'mustard', title: { eu: 'Funtzio koadratikoak', es: 'Funciones cuadráticas', en: 'Quadratic functions', ar: 'الدوال التربيعية' } },
    { id: 'inverse', tone: 'coral', title: { eu: 'Alderantzizkoak eta erroak', es: 'Proporcionalidad inversa y raíces', en: 'Inverse proportion and roots', ar: 'التناسب العكسي والجذور' } },
    { id: 'piecewise', tone: 'green', title: { eu: 'Zatika definitutako funtzioak', es: 'Funciones a trozos', en: 'Piecewise functions', ar: 'الدوال المعرّفة على أجزاء' } }
]

const MODELS4 = { unit: 'dbh4-aplikatuak/grafica-funcion', topic: 'models', title: { eu: 'Eredu egokia aukeratzea', es: 'Elegir el modelo adecuado', en: 'Choose the right model', ar: 'اختيار النموذج المناسب' } }
const LINEAR_MODELS4 = { unit: 'dbh4-aplikatuak/grafica-funcion', topic: 'linear-models', title: { eu: 'Eredu linealak', es: 'Modelos lineales', en: 'Linear models', ar: 'نماذج خطية' } }

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Functions and domain ---------- */
    {
        id: 'families',
        stage: 'families',
        title: say('Funtzio-familiak', 'Familias de funciones', 'عائلات الدوال', 'Families of functions'),
        goal: say('Egoera bat, haren formula eta haren grafikoa familia berean ezagutzea: lineala, koadratikoa, alderantzizkoa, erroa edo esponentziala.', 'Reconocer en una situación, su fórmula y su gráfica la misma familia: lineal, cuadrática, inversa, raíz o exponencial.', 'التعرّف على العائلة نفسها في موقف وصيغته ورسمه: خطية أو تربيعية أو عكسية أو جذرية أو أسية.', 'Recognise the same family in a situation, its formula and its graph: linear, quadratic, inverse, root or exponential.'),
        needs: [MODELS4],
        problem: say('Zein familiatakoa da bakoitza? Taxi bat, $P(x)=3+1{,}2x$; karratu baten azalera, $S(x)=x^2$; lan bat $x$ pertsonaren artean egiteko denbora, $t(x)=\\frac{12}{x}$.', '¿De qué familia es cada una? Un taxi, $P(x)=3+1{,}2x$; el área de un cuadrado, $S(x)=x^2$; el tiempo para hacer un trabajo entre $x$ personas, $t(x)=\\frac{12}{x}$.', 'من أي عائلة كل واحدة؟ سيارة أجرة $P(x)=3+1{,}2x$، ومساحة مربع $S(x)=x^2$، وزمن إنجاز عمل بين $x$ شخصًا $t(x)=\\frac{12}{x}$.', 'Which family is each one? A taxi, $P(x)=3+1{,}2x$; the area of a square, $S(x)=x^2$; the time to do a job shared among $x$ people, $t(x)=\\frac{12}{x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Taxia: zati finkoa gehi kilometroko prezioa. Lineala da: zuzen bat.', 'El taxi: parte fija más precio por km. Es lineal: una recta.', 'سيارة الأجرة: جزء ثابت زائد سعر الكيلومتر. خطية: مستقيم.', 'The taxi: fixed part plus price per km. It is linear: a line.'), math: same('$P(x)=3+1{,}2x$') },
            { text: say('Azalera: $x^2$ gaia. Koadratikoa da: parabola bat.', 'El área: término en $x^2$. Es cuadrática: una parábola.', 'المساحة: حد $x^2$. تربيعية: قطع مكافئ.', 'The area: an $x^2$ term. It is quadratic: a parabola.') },
            { text: say('Denbora: $x\\cdot t=12$, konstantea. Alderantzizko proportzionaltasuna da: hiperbola bat.', 'El tiempo: $x\\cdot t=12$, constante. Es proporcionalidad inversa: una hipérbola.', 'الزمن: $x\\cdot t=12$ ثابت. تناسب عكسي: قطع زائد.', 'The time: $x\\cdot t=12$, constant. It is inverse proportion: a hyperbola.') }
        ],
        takeaway: say('Lineala, $y=mx+n$: zuzena. Koadratikoa, $y=ax^2+bx+c$: parabola. Alderantzizkoa, $y=\\frac{k}{x}$: hiperbola. Erroa, $y=\\sqrt{x}$: adar erdia. Esponentziala, $y=a^x$: gero eta azkarrago hazten da.', 'Lineal, $y=mx+n$: recta. Cuadrática, $y=ax^2+bx+c$: parábola. Inversa, $y=\\frac{k}{x}$: hipérbola. Raíz, $y=\\sqrt{x}$: media rama. Exponencial, $y=a^x$: crece cada vez más deprisa.', 'الخطية $y=mx+n$: مستقيم. التربيعية $y=ax^2+bx+c$: قطع مكافئ. العكسية $y=\\frac{k}{x}$: قطع زائد. الجذر $y=\\sqrt{x}$: نصف فرع. الأسية $y=a^x$: تتزايد بسرعة متزايدة.', 'Linear, $y=mx+n$: a line. Quadratic, $y=ax^2+bx+c$: a parabola. Inverse, $y=\\frac{k}{x}$: a hyperbola. Root, $y=\\sqrt{x}$: half a branch. Exponential, $y=a^x$: it grows faster and faster.'),
        figure: (language) => <ModelsFigure language={language} />
    },
    {
        id: 'domain',
        stage: 'families',
        title: say('Izate-eremua', 'Dominio de definición', 'مجال التعريف', 'Domain of definition'),
        goal: say('Zatikiak eta erro karratuak dituzten funtzioen izate-eremua aurkitzea.', 'Hallar el dominio de funciones con fracciones y raíces cuadradas.', 'إيجاد مجال دوال فيها كسور وجذور تربيعية.', 'Find the domain of functions with fractions and square roots.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'rational-domain', title: { eu: 'Zatikien izate-eremua', es: 'Dominio de las fracciones', en: 'Domain of fractions', ar: 'مجال الكسور' } },
            { unit: 'dbh4-akademikoak/funciones', topic: 'radical-domain', title: { eu: 'Erroen izate-eremua', es: 'Dominio de las raíces', en: 'Domain of radicals', ar: 'مجال الجذور' } }
        ],
        problem: say('Aurkitu $f(x)=\\frac{x+1}{x^2-9}$ eta $g(x)=\\sqrt{6-2x}$ funtzioen izate-eremua.', 'Halla el dominio de $f(x)=\\frac{x+1}{x^2-9}$ y el de $g(x)=\\sqrt{6-2x}$.', 'أوجد مجال $f(x)=\\frac{x+1}{x^2-9}$ ومجال $g(x)=\\sqrt{6-2x}$.', 'Find the domain of $f(x)=\\frac{x+1}{x^2-9}$ and that of $g(x)=\\sqrt{6-2x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f$: kendu izendatzailea anulatzen duten balioak.', '$f$: quita los valores que anulan el denominador.', '$f$: احذف القيم التي تعدم المقام.', '$f$: remove the values that make the denominator zero.'), math: same('$x^2-9=0\\ \\to\\ x=-3,\\ x=3$') },
            { text: say('Beraz, $f$ funtzioaren izate-eremua:', 'Así que el dominio de $f$ es:', 'إذن مجال $f$ هو:', 'So the domain of $f$ is:'), math: same('$\\mathbb{R}-\\{-3,3\\}$') },
            { text: say('$g$: errokizunak $\\ge 0$ izan behar du.', '$g$: el radicando tiene que ser $\\ge 0$.', '$g$: يجب أن يكون ما تحت الجذر $\\ge 0$.', '$g$: the radicand has to be $\\ge 0$.'), math: same('$6-2x\\ge 0\\ \\to\\ x\\le 3\\ \\to\\ (-\\infty,3]$') }
        ],
        takeaway: say('Polinomio batek ez du baldintzarik. Zatiki batean, kendu izendatzailearen zeroak. Erro karratu batean, errokizuna $\\ge 0$.', 'Un polinomio no pone condiciones. En una fracción, quita los ceros del denominador. En una raíz cuadrada, el radicando $\\ge 0$.', 'الحدودية لا تضع شروطًا. وفي الكسر احذف أصفار المقام. وفي الجذر التربيعي ما تحت الجذر $\\ge 0$.', 'A polynomial sets no conditions. In a fraction, remove the zeros of the denominator. In a square root, the radicand $\\ge 0$.'),
        figure: (language) => <DomainCasesFigure language={language} />
    },
    {
        id: 'context-domain',
        stage: 'families',
        title: say('Izate-eremua eta ibiltartea testuinguruan', 'Dominio y recorrido en un contexto', 'المجال والمدى في سياق', 'Domain and range in a context'),
        goal: say('Egoera erreal bat deskribatzen duen funtzio baten izate-eremua eta ibiltartea ematea.', 'Dar el dominio y el recorrido de una función que describe una situación real.', 'تحديد مجال دالة تصف موقفًا حقيقيًّا ومداها.', 'Give the domain and range of a function that describes a real situation.'),
        needs: [{ unit: 'dbh4-akademikoak/funciones', topic: 'range-graph', title: { eu: 'Izate-eremua eta ibiltartea grafikoan', es: 'Dominio y recorrido en la gráfica', en: 'Domain and range on a graph', ar: 'المجال والمدى في الرسم' } }],
        problem: say('Laukizuzen baten perimetroa 20 m da. Idatzi haren azalera $x$ oinarriaren menpe, eta eman izate-eremua eta ibiltartea.', 'Un rectángulo tiene 20 m de perímetro. Escribe su área en función de la base $x$ y da el dominio y el recorrido.', 'محيط مستطيل 20 م. اكتب مساحته بدلالة القاعدة $x$ واذكر المجال والمدى.', 'A rectangle has a perimeter of 20 m. Write its area in terms of the base $x$ and give the domain and range.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarria gehi altuera perimetroaren erdia da: altuera $10-x$.', 'Base más altura es medio perímetro: la altura es $10-x$.', 'القاعدة زائد الارتفاع نصف المحيط: الارتفاع $10-x$.', 'Base plus height is half the perimeter: the height is $10-x$.'), math: same('$A(x)=x(10-x)=10x-x^2$') },
            { text: say('Bi aldeak positiboak: $x>0$ eta $10-x>0$.', 'Los dos lados positivos: $x>0$ y $10-x>0$.', 'الضلعان موجبان: $x>0$ و$10-x>0$.', 'Both sides positive: $x>0$ and $10-x>0$.'), math: same('$0<x<10$') },
            { text: say('Azalerarik handiena erpinean dago, $x=5$ denean.', 'El área mayor está en el vértice, en $x=5$.', 'أكبر مساحة عند الرأس، عند $x=5$.', 'The largest area is at the vertex, at $x=5$.'), math: same('$10\\cdot 5-5^2=25\\ \\to\\ (0,25]$') }
        ],
        takeaway: say('Testuinguru batean, izate-eremuak zentzua duten balioak bakarrik hartzen ditu: luzerak eta kopuruak positiboak. Ibiltartea funtzioak benetan hartzen dituen $y$ balioak dira.', 'En un contexto, el dominio solo toma los valores con sentido: longitudes y cantidades positivas. El recorrido son los valores de $y$ que la función toma de verdad.', 'في السياق لا يأخذ المجال إلا القيم ذات المعنى: الأطوال والكميات موجبة. والمدى هو قيم $y$ التي تأخذها الدالة فعلًا.', 'In a context, the domain only takes the values that make sense: positive lengths and amounts. The range is the values of $y$ that the function really takes.'),
        figure: (language) => <AreaFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Linear functions and interpolation ---------- */
    {
        id: 'line',
        stage: 'linear',
        title: say('Zuzena: malda eta ekuazioa', 'La recta: pendiente y ecuación', 'المستقيم: الميل والمعادلة', 'The line: slope and equation'),
        goal: say('Bi puntutatik pasatzen den zuzenaren malda eta ekuazioa aurkitzea.', 'Hallar la pendiente y la ecuación de la recta que pasa por dos puntos.', 'إيجاد ميل المستقيم المار بنقطتين ومعادلته.', 'Find the slope and the equation of the line through two points.'),
        needs: [{ unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'line-equation', title: { eu: 'Zuzenaren ekuazioa', es: 'La ecuación de la recta', en: 'The equation of the straight line', ar: 'معادلة المستقيم' } }],
        problem: say('Aurkitu $A(2,5)$ eta $B(6,13)$ puntuetatik pasatzen den zuzena.', 'Halla la recta que pasa por $A(2,5)$ y $B(6,13)$.', 'أوجد المستقيم المار بالنقطتين $A(2,5)$ و$B(6,13)$.', 'Find the line through $A(2,5)$ and $B(6,13)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Malda: $y$ aldagaiaren aldaketa zati $x$ aldagaiaren aldaketa.', 'Pendiente: lo que cambia la $y$ entre lo que cambia la $x$.', 'الميل: تغيّر $y$ مقسومًا على تغيّر $x$.', 'Slope: the change in $y$ over the change in $x$.'), math: same('$m=\\frac{13-5}{6-2}=\\frac{8}{4}=2$') },
            { text: say('Puntu-malda ekuazioa, $A$ puntuarekin.', 'Ecuación punto-pendiente con el punto $A$.', 'معادلة النقطة والميل بالنقطة $A$.', 'Point-slope equation with the point $A$.'), math: same('$y=5+2(x-2)$') },
            { text: say('Sinplifikatuta.', 'Simplificada.', 'بعد التبسيط.', 'Simplified.'), math: same('$y=2x+1$') }
        ],
        takeaway: say('Malda $m=\\frac{y_2-y_1}{x_2-x_1}$ da, eta zuzena $y=y_1+m(x-x_1)$.', 'La pendiente es $m=\\frac{y_2-y_1}{x_2-x_1}$ y la recta, $y=y_1+m(x-x_1)$.', 'الميل $m=\\frac{y_2-y_1}{x_2-x_1}$ والمستقيم $y=y_1+m(x-x_1)$.', 'The slope is $m=\\frac{y_2-y_1}{x_2-x_1}$ and the line, $y=y_1+m(x-x_1)$.'),
        figure: (language) => <LineKindsFigure language={language} />
    },
    {
        id: 'interpolation',
        stage: 'linear',
        title: say('Interpolazio eta estrapolazio lineala', 'Interpolación y extrapolación lineal', 'الاستيفاء والاستقراء الخارجي الخطيان', 'Linear interpolation and extrapolation'),
        goal: say('Bi datuen zuzenarekin balio bat estimatzea, eta interpolazioa ala estrapolazioa den eta zenbateraino den fidagarria esatea.', 'Estimar un valor con la recta de dos datos y decir si es interpolación o extrapolación y cuánto se puede fiar uno.', 'تقدير قيمة بمستقيم بيانتين، وتحديد هل هو استيفاء أم استقراء خارجي ومدى الثقة به.', 'Estimate a value with the line through two data and say whether it is interpolation or extrapolation and how far it can be trusted.'),
        needs: [LINEAR_MODELS4],
        problem: say('Akademia batek 240 ikasle zituen hasieran, eta 300 lau urte geroago. Estimatu zenbat zeuden 2 urte geroago, eta zenbat egongo diren 12 urte geroago.', 'Una academia tenía 240 alumnos al principio y 300 cuatro años después. Estima cuántos había a los 2 años y cuántos habrá a los 12 años.', 'كان في أكاديمية 240 طالبًا في البداية و300 بعد أربع سنوات. قدّر عددهم بعد سنتين، وعددهم بعد 12 سنة.', 'A school had 240 students at the start and 300 four years later. Estimate how many there were after 2 years and how many there will be after 12 years.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Malda: urteko zenbat ikasle gehiago.', 'Pendiente: cuántos alumnos más por año.', 'الميل: كم طالبًا يزيدون كل سنة.', 'Slope: how many more students a year.'), math: same('$m=\\frac{300-240}{4-0}=\\frac{60}{4}=15$') },
            { text: say('2 urte: datuen artean dago. Interpolazioa.', 'A los 2 años: está entre los datos. Interpolación.', 'بعد سنتين: بين البيانات. استيفاء.', 'After 2 years: it lies between the data. Interpolation.'), math: same('$240+15\\cdot 2=270$') },
            { text: say('12 urte: datuetatik kanpo eta urrun. Estrapolazioa, ez oso fidagarria.', 'A los 12 años: fuera de los datos y lejos. Extrapolación, poco fiable.', 'بعد 12 سنة: خارج البيانات وبعيدًا. استقراء خارجي غير موثوق كثيرًا.', 'After 12 years: outside the data and far away. Extrapolation, not very reliable.'), math: same('$240+15\\cdot 12=420$') }
        ],
        takeaway: say('Bi datuekin, haietatik pasatzen den zuzena erabiltzen da. Datuen artean estimatzea interpolatzea da; kanpoan, estrapolatzea: zenbat eta urrunago, orduan eta fidagarritasun txikiagoa.', 'Con dos datos se usa la recta que pasa por ellos. Estimar entre los datos es interpolar; fuera, extrapolar: cuanto más lejos, menos fiable.', 'مع بيانتين نستعمل المستقيم المار بهما. التقدير بين البيانات استيفاء، وخارجها استقراء خارجي: كلما ابتعدنا قلّت الثقة.', 'With two data you use the line through them. Estimating between the data is interpolating; outside, extrapolating: the further away, the less reliable.'),
        figure: (language) => <InterpolationFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'linear-models',
        stage: 'linear',
        title: say('Kostu finkoa eta kostu aldakorra', 'Coste fijo y coste variable', 'التكلفة الثابتة والتكلفة المتغيرة', 'Fixed cost and variable cost'),
        goal: say('Tarifa bat zuzen gisa idaztea, eta bi tarifa alderatzea haien ebaki-puntua aurkituta.', 'Escribir una tarifa como una recta y comparar dos tarifas hallando su punto de corte.', 'كتابة تعرفة على صورة مستقيم ومقارنة تعرفتين بإيجاد نقطة تقاطعهما.', 'Write a tariff as a line and compare two tariffs by finding where they cross.'),
        needs: [LINEAR_MODELS4],
        problem: say('A tarifa: hilean 20 € eta 0,10 € minutuko. B tarifa: 0,30 € minutuko, kuotarik gabe. Zenbat minututik aurrera da merkeagoa A?', 'Tarifa A: 20 € al mes y 0,10 € por minuto. Tarifa B: 0,30 € por minuto, sin cuota. ¿A partir de cuántos minutos es más barata la A?', 'التعرفة A: ‏20 € شهريًّا و0.10 € للدقيقة. التعرفة B: ‏0.30 € للدقيقة بلا اشتراك. ابتداءً من كم دقيقة تكون A أرخص؟', 'Tariff A: €20 a month and €0.10 per minute. Tariff B: €0.30 per minute, no fee. From how many minutes on is A cheaper?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi zuzenak: kostu finkoa gehi minutuko prezioa.', 'Las dos rectas: coste fijo más precio por minuto.', 'المستقيمان: التكلفة الثابتة زائد سعر الدقيقة.', 'The two lines: fixed cost plus price per minute.'), math: same('$A(x)=20+0{,}1x\\qquad B(x)=0{,}3x$') },
            { text: say('Berdindu: non kostatzen dira gauza bera?', 'Iguala: ¿dónde cuestan lo mismo?', 'ساوِ بينهما: أين تكون التكلفة نفسها؟', 'Set them equal: where do they cost the same?'), math: same('$20+0{,}1x=0{,}3x\\ \\to\\ 0{,}2x=20\\ \\to\\ x=100$') },
            { text: say('100 minututik aurrera, A merkeagoa da, malda txikiagoa duelako.', 'A partir de 100 minutos, la A es más barata porque tiene menos pendiente.', 'ابتداءً من 100 دقيقة تكون A أرخص لأن ميلها أصغر.', 'From 100 minutes on, A is cheaper because its slope is smaller.') }
        ],
        takeaway: say('Kostu finkoa eta aldakorra: $C(x)=F+vx$, $F$ ordenatua eta $v$ malda dituen zuzena. Bi tarifa alderatzeko, berdindu.', 'Coste fijo y variable: $C(x)=F+vx$, una recta de ordenada $F$ y pendiente $v$. Para comparar dos tarifas, iguálalas.', 'التكلفة الثابتة والمتغيرة: $C(x)=F+vx$، مستقيم جزؤه المقطوع $F$ وميله $v$. ولمقارنة تعرفتين ساوِ بينهما.', 'Fixed and variable cost: $C(x)=F+vx$, a line with intercept $F$ and slope $v$. To compare two tariffs, set them equal.'),
        figure: (language) => <TariffLinesFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. Quadratic functions ---------- */
    {
        id: 'parabola',
        stage: 'quadratic',
        title: say('Parabola: erpina eta ebaki-puntuak', 'La parábola: vértice y puntos de corte', 'القطع المكافئ: الرأس ونقاط التقاطع', 'The parabola: vertex and intercepts'),
        goal: say('Parabola bat marraztea haren erpina eta ardatzekiko ebaki-puntuak aurkituta.', 'Dibujar una parábola hallando su vértice y sus cortes con los ejes.', 'رسم قطع مكافئ بإيجاد رأسه ونقاط تقاطعه مع المحورين.', 'Draw a parabola by finding its vertex and its intercepts.'),
        needs: [{ unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'vertex', title: { eu: 'Erpina eta simetria-ardatza', es: 'Vértice y eje de simetría', en: 'Vertex and axis of symmetry', ar: 'الرأس ومحور التماثل' } }],
        problem: say('Marraztu $y=x^2-6x+5$: erpina eta ardatzekiko ebaki-puntuak.', 'Dibuja $y=x^2-6x+5$: vértice y cortes con los ejes.', 'ارسم $y=x^2-6x+5$: الرأس ونقاط التقاطع مع المحورين.', 'Draw $y=x^2-6x+5$: vertex and intercepts.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erpinaren $x$ koordenatua.', 'La $x$ del vértice.', 'الإحداثي $x$ للرأس.', 'The $x$ of the vertex.'), math: same('$x=-\\frac{-6}{2\\cdot 1}=3\\qquad 3^2-6\\cdot 3+5=-4$') },
            { text: say('Y ardatzarekin: $x=0$.', 'Con el eje Y: $x=0$.', 'مع محور Y: ‏$x=0$.', 'With the y-axis: $x=0$.'), math: same('$(0,5)$') },
            { text: say('X ardatzarekin: $y=0$.', 'Con el eje X: $y=0$.', 'مع محور X: ‏$y=0$.', 'With the x-axis: $y=0$.'), math: same('$x^2-6x+5=0\\ \\to\\ x=1,\\ x=5$') }
        ],
        takeaway: say('Erpina $x=-\\frac{b}{2a}$ zuzenean dago. $a>0$ bada, adarrak gora eta minimoa; $a<0$ bada, behera eta maximoa.', 'El vértice está en $x=-\\frac{b}{2a}$. Si $a>0$, ramas hacia arriba y mínimo; si $a<0$, hacia abajo y máximo.', 'يقع الرأس عند $x=-\\frac{b}{2a}$. إذا كان $a>0$ فالفرعان إلى الأعلى وقيمة صغرى، وإذا كان $a<0$ فإلى الأسفل وقيمة عظمى.', 'The vertex is at $x=-\\frac{b}{2a}$. If $a>0$, branches up and a minimum; if $a<0$, down and a maximum.'),
        figure: (language) => <VertexFigure language={language} />
    },
    {
        id: 'optimum',
        stage: 'quadratic',
        title: say('Maximoak: diru-sarrerak eta mozkina', 'Máximos: ingresos y beneficio', 'القيم العظمى: الإيرادات والربح', 'Maxima: revenue and profit'),
        goal: say('Diru-sarrerak edo mozkina parabola gisa idaztea, eta maximoa ematen duen prezioa edo kopurua aurkitzea.', 'Escribir los ingresos o el beneficio como una parábola y hallar el precio o la cantidad que da el máximo.', 'كتابة الإيرادات أو الربح على صورة قطع مكافئ وإيجاد السعر أو الكمية التي تعطي القيمة العظمى.', 'Write revenue or profit as a parabola and find the price or amount that gives the maximum.'),
        needs: [{ unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'vertex', title: { eu: 'Erpina eta simetria-ardatza', es: 'Vértice y eje de simetría', en: 'Vertex and axis of symmetry', ar: 'الرأس ومحور التماثل' } }],
        problem: say('Enpresa batek $q=200-4p$ unitate saltzen ditu $p$ euroan. Zein preziok ematen ditu diru-sarrerarik handienak?', 'Una empresa vende $q=200-4p$ unidades a $p$ euros. ¿Qué precio da los mayores ingresos?', 'تبيع شركة $q=200-4p$ وحدة بسعر $p$ يورو. أي سعر يعطي أكبر الإيرادات؟', 'A firm sells $q=200-4p$ units at $p$ euros. Which price gives the greatest revenue?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Diru-sarrerak: prezioa bider kopurua.', 'Ingresos: precio por cantidad.', 'الإيرادات: السعر في الكمية.', 'Revenue: price times quantity.'), math: same('$I(p)=p(200-4p)=-4p^2+200p$') },
            { text: say('Adarrak behera: maximoa erpinean.', 'Ramas hacia abajo: el máximo está en el vértice.', 'الفرعان إلى الأسفل: القيمة العظمى عند الرأس.', 'Branches down: the maximum is at the vertex.'), math: same('$p=-\\frac{200}{2\\cdot(-4)}=25$') },
            { text: say('Diru-sarrerak prezio horretan.', 'Los ingresos a ese precio.', 'الإيرادات بهذا السعر.', 'The revenue at that price.'), math: same('$25\\cdot(200-4\\cdot 25)=25\\cdot 100=2500$') }
        ],
        takeaway: say('Diru-sarrerak = prezioa · kopurua; mozkina = diru-sarrerak − kostuak. Parabola bat bada, $a<0$ duena, maximoa erpinean dago: lehenik $x$, gero balioa.', 'Ingresos = precio · cantidad; beneficio = ingresos − costes. Si es una parábola con $a<0$, el máximo está en el vértice: primero la $x$, después el valor.', 'الإيرادات = السعر · الكمية، والربح = الإيرادات − التكاليف. وإذا كان قطعًا مكافئًا فيه $a<0$ فالقيمة العظمى عند الرأس: أولًا $x$ ثم القيمة.', 'Revenue = price · quantity; profit = revenue − costs. If it is a parabola with $a<0$, the maximum is at the vertex: first the $x$, then the value.'),
        figure: (language) => <RevenueFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'three-points',
        stage: 'quadratic',
        title: say('Hiru puntutatik pasatzen den parabola', 'La parábola que pasa por tres puntos', 'القطع المكافئ المار بثلاث نقاط', 'The parabola through three points'),
        goal: say('Hiru puntutatik pasatzen den parabola Newtonen metodoarekin aurkitzea, eta hiru datuekin interpolatzeko erabiltzea.', 'Hallar la parábola que pasa por tres puntos con el método de Newton y usarla para interpolar con tres datos.', 'إيجاد القطع المكافئ المار بثلاث نقاط بطريقة نيوتن واستعماله للاستيفاء بثلاث بيانات.', 'Find the parabola through three points with Newton\'s method and use it to interpolate with three data.'),
        needs: [{ unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'parabola-from', title: { eu: 'Parabola bat aurkitzea', es: 'Hallar una parábola', en: 'Find a parabola', ar: 'إيجاد قطع مكافئ' } }],
        problem: say('Aurkitu $(0,3)$, $(1,2)$ eta $(3,6)$ puntuetatik pasatzen den parabola.', 'Halla la parábola que pasa por $(0,3)$, $(1,2)$ y $(3,6)$.', 'أوجد القطع المكافئ المار بالنقاط $(0,3)$ و$(1,2)$ و$(3,6)$.', 'Find the parabola through $(0,3)$, $(1,2)$ and $(3,6)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Newtonen forma, lehen bi puntuen $x$ balioekin.', 'La forma de Newton con las $x$ de los dos primeros puntos.', 'صيغة نيوتن بقيمتي $x$ للنقطتين الأوليين.', 'Newton\'s form with the $x$ of the first two points.'), math: same('$y=a+b(x-0)+c(x-0)(x-1)$') },
            { text: say('$(0,3)$ puntuak $a$ ematen du; $(1,2)$ puntuak, $b$.', '$(0,3)$ da $a$; $(1,2)$ da $b$.', '$(0,3)$ تعطي $a$، و$(1,2)$ تعطي $b$.', '$(0,3)$ gives $a$; $(1,2)$ gives $b$.'), math: same('$a=3\\qquad 3+b=2\\ \\to\\ b=-1$') },
            { text: say('$(3,6)$ puntuak $c$ ematen du.', '$(3,6)$ da $c$.', '$(3,6)$ تعطي $c$.', '$(3,6)$ gives $c$.'), math: same('$3-3+6c=6\\ \\to\\ c=1$') },
            { text: say('Garatuta.', 'Desarrollada.', 'بعد النشر.', 'Expanded.'), math: same('$y=3-x+x(x-1)=x^2-2x+3$') }
        ],
        takeaway: say('Hiru puntutatik parabola bakarra pasatzen da: $y=a+b(x-x_1)+c(x-x_1)(x-x_2)$, eta puntu bakoitzak koefiziente bat ematen du.', 'Por tres puntos pasa una sola parábola: $y=a+b(x-x_1)+c(x-x_1)(x-x_2)$, y cada punto da un coeficiente.', 'يمر بثلاث نقاط قطع مكافئ واحد: $y=a+b(x-x_1)+c(x-x_1)(x-x_2)$، وكل نقطة تعطي معاملًا.', 'Through three points there passes a single parabola: $y=a+b(x-x_1)+c(x-x_1)(x-x_2)$, and each point gives one coefficient.'),
        figure: (language) => <ThreePointsFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Inverse proportion and roots ---------- */
    {
        id: 'inverse-prop',
        stage: 'inverse',
        title: say('Alderantzizko proportzionaltasuna', 'Proporcionalidad inversa', 'التناسب العكسي', 'Inverse proportion'),
        goal: say('Alderantziz proportzionalak diren bi magnitudearen funtzioa idaztea eta haren hiperbola ezagutzea.', 'Escribir la función de dos magnitudes inversamente proporcionales y conocer su hipérbola.', 'كتابة دالة كميتين متناسبتين عكسيًّا ومعرفة قطعها الزائد.', 'Write the function of two inversely proportional quantities and know its hyperbola.'),
        needs: [{ unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'inverse', title: { eu: 'Alderantzizko proportzionaltasuna', es: 'Proporcionalidad inversa', en: 'Inverse proportion', ar: 'التناسب العكسي' } }],
        problem: say('1200 euroko sari bat zati berdinetan banatzen da $x$ pertsonaren artean. Idatzi funtzioa eta kalkulatu 4 eta 8 pertsonarentzat.', 'Un premio de 1200 € se reparte a partes iguales entre $x$ personas. Escribe la función y calcula para 4 y para 8 personas.', 'تُوزَّع جائزة قيمتها 1200 € بالتساوي بين $x$ شخصًا. اكتب الدالة واحسبها لـ 4 أشخاص و8 أشخاص.', 'A €1,200 prize is shared equally among $x$ people. Write the function and work it out for 4 and for 8 people.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bakoitzaren zatia, eta biderkadura konstantea.', 'La parte de cada uno, y el producto constante.', 'نصيب كل واحد، والجداء ثابت.', 'Each one\'s share, and the constant product.'), math: same('$y=\\frac{1200}{x}\\qquad x\\cdot y=1200$') },
            { text: say('Pertsona kopurua bikoiztean, zatia erdira.', 'Al duplicar las personas, la parte se reduce a la mitad.', 'عند مضاعفة عدد الأشخاص ينقص النصيب إلى النصف.', 'Doubling the people halves the share.'), math: same('$\\frac{1200}{4}=300\\qquad\\frac{1200}{8}=150$') },
            { text: say('Ez da inoiz 0: ardatzak asintotak dira.', 'Nunca llega a 0: los ejes son asíntotas.', 'لا يبلغ 0 أبدًا: المحوران خطان مقاربان.', 'It never reaches 0: the axes are asymptotes.') }
        ],
        takeaway: say('$y=\\frac{k}{x}$: $x\\cdot y=k$ biderkadura konstantea da. Grafikoa hiperbola bat da, eta ardatzak ditu asintota.', '$y=\\frac{k}{x}$: el producto $x\\cdot y=k$ es constante. La gráfica es una hipérbola con los ejes como asíntotas.', '$y=\\frac{k}{x}$: الجداء $x\\cdot y=k$ ثابت. والرسم قطع زائد خطاه المقاربان هما المحوران.', '$y=\\frac{k}{x}$: the product $x\\cdot y=k$ is constant. The graph is a hyperbola with the axes as asymptotes.'),
        figure: (language) => <HyperbolaFigure language={language} />
    },
    {
        id: 'average-cost',
        stage: 'inverse',
        title: say('Batez besteko kostua eta hiperbola lekualdatuak', 'Coste medio e hipérbolas trasladadas', 'التكلفة المتوسطة والقطوع الزائدة المنسحبة', 'Average cost and shifted hyperbolas'),
        goal: say('Batez besteko kostua hiperbola lekualdatu gisa idaztea, eta haren asintotak irakurtzea.', 'Escribir el coste medio como una hipérbola trasladada y leer sus asíntotas.', 'كتابة التكلفة المتوسطة على صورة قطع زائد منسحب وقراءة خطيه المقاربين.', 'Write the average cost as a shifted hyperbola and read its asymptotes.'),
        needs: [{ unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'hyperbola-shift', title: { eu: 'Hiperbolen lekualdaketak', es: 'Traslaciones de hipérbolas', en: 'Translations of hyperbolas', ar: 'انسحابات القطوع الزائدة' } }],
        problem: say('$x$ unitate fabrikatzeak $C(x)=2000+5x$ euro kostatzen du. Aztertu batez besteko kostua.', 'Fabricar $x$ unidades cuesta $C(x)=2000+5x$ euros. Estudia el coste medio.', 'تكلفة صنع $x$ وحدة $C(x)=2000+5x$ يورو. ادرس التكلفة المتوسطة.', 'Making $x$ units costs $C(x)=2000+5x$ euros. Study the average cost.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez besteko kostua: kostu osoa zati unitateak.', 'Coste medio: coste total entre unidades.', 'التكلفة المتوسطة: التكلفة الكلية مقسومة على الوحدات.', 'Average cost: total cost over units.'), math: same('$M(x)=\\frac{2000+5x}{x}=5+\\frac{2000}{x}$') },
            { text: say('Zenbat eta gehiago ekoitzi, orduan eta merkeagoa unitatea.', 'Cuanto más se produce, más barata sale la unidad.', 'كلما زاد الإنتاج رخصت الوحدة.', 'The more is produced, the cheaper each unit.'), math: same('$5+\\frac{2000}{100}=25\\qquad 5+\\frac{2000}{1000}=7$') },
            { text: say('5 baliora hurbiltzen da, iritsi gabe: $y=5$ asintota horizontala da, eta $x=0$ bertikala.', 'Se acerca a 5 sin llegar: $y=5$ es asíntota horizontal y $x=0$, vertical.', 'تقترب من 5 دون أن تبلغها: $y=5$ خط مقارب أفقي و$x=0$ رأسي.', 'It approaches 5 without reaching it: $y=5$ is a horizontal asymptote and $x=0$ a vertical one.') }
        ],
        takeaway: say('$y=a+\\frac{k}{x-b}$ hiperbolaren asintotak $x=b$ eta $y=a$ dira. $C(x)=F+vx$ kostuaren batez bestekoa $v+\\frac{F}{x}$ da, eta $v$ baliora jaisten da.', 'La hipérbola $y=a+\\frac{k}{x-b}$ tiene asíntotas $x=b$ e $y=a$. El coste medio de $C(x)=F+vx$ es $v+\\frac{F}{x}$, que baja hacia $v$.', 'القطع الزائد $y=a+\\frac{k}{x-b}$ خطاه المقاربان $x=b$ و$y=a$. ومتوسط التكلفة $C(x)=F+vx$ هو $v+\\frac{F}{x}$، وينخفض نحو $v$.', 'The hyperbola $y=a+\\frac{k}{x-b}$ has asymptotes $x=b$ and $y=a$. The average cost of $C(x)=F+vx$ is $v+\\frac{F}{x}$, which falls towards $v$.'),
        figure: (language) => <AverageCostFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'root',
        stage: 'inverse',
        title: say('Erro-funtzioak', 'Funciones raíz', 'دوال الجذر', 'Root functions'),
        goal: say('Erro karratu baten grafikoa marraztea: non hasten den, haren izate-eremua eta nola hazten den.', 'Dibujar la gráfica de una raíz cuadrada: dónde empieza, su dominio y cómo crece.', 'رسم بيان جذر تربيعي: أين يبدأ، ومجاله، وكيف يتزايد.', 'Draw the graph of a square root: where it starts, its domain and how it grows.'),
        needs: [{ unit: 'dbh4-aplikatuak/grafica-funcion', topic: 'radical', title: { eu: 'Funtzio erradikalak', es: 'Funciones radicales', en: 'Radical functions', ar: 'الدوال الجذرية' } }],
        problem: say('Marraztu $y=\\sqrt{x-1}+2$: izate-eremua, hasiera-puntua eta beste puntu batzuk.', 'Dibuja $y=\\sqrt{x-1}+2$: dominio, punto de partida y algunos puntos más.', 'ارسم $y=\\sqrt{x-1}+2$: المجال ونقطة البداية وبعض النقاط الأخرى.', 'Draw $y=\\sqrt{x-1}+2$: domain, starting point and a few more points.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Errokizuna $\\ge 0$.', 'Radicando $\\ge 0$.', 'ما تحت الجذر $\\ge 0$.', 'Radicand $\\ge 0$.'), math: same('$x-1\\ge 0\\ \\to\\ x\\ge 1$') },
            { text: say('$x=1$ denean hasten da.', 'Empieza en $x=1$.', 'تبدأ عند $x=1$.', 'It starts at $x=1$.'), math: same('$\\sqrt{0}+2=2\\ \\to\\ (1,2)$') },
            { text: say('Beste puntu batzuk: gero eta astiroago hazten da.', 'Otros puntos: crece cada vez más despacio.', 'نقاط أخرى: تتزايد ببطء متزايد.', 'Other points: it grows more and more slowly.'), math: same('$\\sqrt{4}+2=4\\qquad\\sqrt{9}+2=5$') }
        ],
        takeaway: say('$y=\\sqrt{x-a}+b$ funtzioa $(a,b)$ puntuan hasten da, haren izate-eremua $[a,+\\infty)$ da, eta gero eta astiroago hazten da.', '$y=\\sqrt{x-a}+b$ empieza en $(a,b)$, su dominio es $[a,+\\infty)$ y crece cada vez más despacio.', '$y=\\sqrt{x-a}+b$ تبدأ من $(a,b)$، ومجالها $[a,+\\infty)$، وتتزايد ببطء متزايد.', '$y=\\sqrt{x-a}+b$ starts at $(a,b)$, its domain is $[a,+\\infty)$ and it grows more and more slowly.'),
        figure: (language) => <RootGraphFigure language={language} />
    },

    /* ---------- 5. Piecewise functions ---------- */
    {
        id: 'piecewise',
        stage: 'piecewise',
        title: say('Zatika definitutako funtzioak', 'Funciones definidas a trozos', 'الدوال المعرّفة على أجزاء', 'Piecewise functions'),
        goal: say('Zatika definitutako funtzio bat kalkulatzea eta marraztea, zati bakoitza bere tartean.', 'Calcular y dibujar una función a trozos, cada trozo en su tramo.', 'حساب دالة معرّفة على أجزاء ورسمها، كل جزء في مجاله.', 'Work out and draw a piecewise function, each piece on its stretch.'),
        needs: [{ unit: 'dbh4-akademikoak/funciones', topic: 'piecewise', title: { eu: 'Zatika definitutako funtzioak', es: 'Funciones definidas a trozos', en: 'Piecewise functions', ar: 'الدوال المعرّفة على أجزاء' } }],
        problem: say('Aparkaleku batek honela kobratzen du ($x$ ordutan): $P(x)=\\begin{cases}3 & 0<x\\le 2\\\\ 3+2(x-2) & 2<x\\le 6\\\\ 11 & x>6\\end{cases}$. Kalkulatu $P(1)$, $P(4)$ eta $P(9)$, eta marraztu.', 'Un aparcamiento cobra así ($x$ en horas): $P(x)=\\begin{cases}3 & 0<x\\le 2\\\\ 3+2(x-2) & 2<x\\le 6\\\\ 11 & x>6\\end{cases}$. Calcula $P(1)$, $P(4)$ y $P(9)$, y dibújala.', 'يتقاضى موقف سيارات ما يلي ($x$ بالساعات): $P(x)=\\begin{cases}3 & 0<x\\le 2\\\\ 3+2(x-2) & 2<x\\le 6\\\\ 11 & x>6\\end{cases}$. احسب $P(1)$ و$P(4)$ و$P(9)$ وارسمها.', 'A car park charges like this ($x$ in hours): $P(x)=\\begin{cases}3 & 0<x\\le 2\\\\ 3+2(x-2) & 2<x\\le 6\\\\ 11 & x>6\\end{cases}$. Work out $P(1)$, $P(4)$ and $P(9)$, and draw it.'),
        stepsKind: 'steps',
        steps: [
            { text: say('1 ordu: lehen zatia.', '1 hora: primer trozo.', 'ساعة واحدة: الجزء الأول.', '1 hour: first piece.'), math: same('$P(1)=3$') },
            { text: say('4 ordu: bigarren zatia.', '4 horas: segundo trozo.', '4 ساعات: الجزء الثاني.', '4 hours: second piece.'), math: same('$3+2\\cdot(4-2)=7$') },
            { text: say('9 ordu: hirugarren zatia, eguneko gehienekoa.', '9 horas: tercer trozo, el tope del día.', '9 ساعات: الجزء الثالث، الحد الأقصى لليوم.', '9 hours: third piece, the daily cap.'), math: same('$P(9)=11$') },
            { text: say('Mugetan zatiak elkartzen dira: ez dago jauzirik.', 'En los límites los trozos se unen: no hay saltos.', 'عند الحدود تتصل الأجزاء: لا توجد قفزات.', 'At the thresholds the pieces join: there are no jumps.'), math: same('$3+2\\cdot 0=3\\qquad 3+2\\cdot 4=11$') }
        ],
        takeaway: say('Zati bakoitza bere tartean bakarrik da baliozkoa: $f(a)$ kalkulatzeko, lehenik bilatu $a$ dagoen tartea. Puntu betea $\\le$ edo $\\ge$ denean, hutsa $<$ edo $>$ denean.', 'Cada trozo vale solo en su tramo: para calcular $f(a)$, busca primero el tramo en el que está $a$. Punto lleno con $\\le$ o $\\ge$, hueco con $<$ o $>$.', 'كل جزء صالح في مجاله فقط: لحساب $f(a)$ ابحث أولًا عن المجال الذي تقع فيه $a$. نقطة مملوءة مع $\\le$ أو $\\ge$، ومفرغة مع $<$ أو $>$.', 'Each piece only holds on its stretch: to work out $f(a)$, first find the stretch $a$ is in. Filled dot with $\\le$ or $\\ge$, hollow with $<$ or $>$.'),
        figure: (language) => <ParkingFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'piecewise-model',
        stage: 'piecewise',
        title: say('Enuntziatutik zatikako funtziora', 'Del enunciado a la función a trozos', 'من نص المسألة إلى الدالة المعرّفة على أجزاء', 'From the statement to the piecewise function'),
        goal: say('Tarteka aldatzen den tarifa bat zatika definitutako funtzio gisa idaztea eta erabiltzea.', 'Escribir y usar como función a trozos una tarifa que cambia por tramos.', 'كتابة تعرفة تتغير على مراحل على صورة دالة معرّفة على أجزاء واستعمالها.', 'Write and use a tariff that changes in stretches as a piecewise function.'),
        needs: [{ unit: 'batx1-zientziak/funciones', topic: 'piecewise', title: { eu: 'Zatika definitutako funtzioak marraztea', es: 'Dibujar funciones a trozos', en: 'Drawing piecewise functions', ar: 'رسم الدوال المعرّفة على أجزاء' } }],
        problem: say('Kopia-denda batek 0,20 € kobratzen ditu kopiako 100 kopiara arte, eta 100 kopiatik gorakoak 0,08 € dira. Idatzi $C(x)$ eta kalkulatu 250 kopiaren prezioa.', 'Una copistería cobra 0,20 € por copia hasta 100 copias, y las que pasan de 100, a 0,08 €. Escribe $C(x)$ y calcula el precio de 250 copias.', 'يتقاضى محل نسخ 0.20 € للنسخة حتى 100 نسخة، وما زاد على 100 بسعر 0.08 €. اكتب $C(x)$ واحسب ثمن 250 نسخة.', 'A copy shop charges €0.20 per copy up to 100 copies, and those beyond 100 at €0.08. Write $C(x)$ and work out the price of 250 copies.'),
        stepsKind: 'steps',
        steps: [
            { text: say('100 kopiara arte: zuzen bat jatorritik.', 'Hasta 100 copias: una recta desde el origen.', 'حتى 100 نسخة: مستقيم من الأصل.', 'Up to 100 copies: a line from the origin.'), math: same('$C(x)=0{,}2x\\qquad 0{,}2\\cdot 100=20$') },
            { text: say('100 kopiatik aurrera: metatutako 20 € gehi gainerakoak.', 'A partir de 100: los 20 € acumulados más las demás.', 'بعد 100: الـ 20 € المتراكمة زائد الباقي.', 'Beyond 100: the €20 built up plus the rest.'), math: same('$C(x)=\\begin{cases}0{,}2x & 0\\le x\\le 100\\\\ 20+0{,}08(x-100) & x>100\\end{cases}$') },
            { text: say('250 kopia: bigarren zatia.', '250 copias: segundo trozo.', '250 نسخة: الجزء الثاني.', '250 copies: second piece.'), math: same('$20+0{,}08\\cdot 150=32$') }
        ],
        takeaway: say('Bilatu araua non aldatzen den. Mugaz gaindiko zatian: mugaraino metatutakoa gehi gainditzen duenaren kostua. Egiaztatu zatiak elkartzen direla.', 'Busca dónde cambia la regla. En el trozo de después del límite: lo acumulado hasta el límite más lo que cuesta lo que pasa. Comprueba que los trozos se unen.', 'ابحث أين تتغير القاعدة. وفي الجزء الذي بعد الحدّ: المتراكم حتى الحدّ زائد تكلفة ما يتجاوزه. وتحقق من أن الأجزاء تتصل.', 'Look for where the rule changes. In the piece after the threshold: what has built up to it plus the cost of what goes beyond. Check that the pieces join.'),
        figure: (language) => <CopiesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'absolute',
        stage: 'piecewise',
        title: say('Funtzio baten balio absolutua', 'Valor absoluto de una función', 'القيمة المطلقة لدالة', 'Absolute value of a function'),
        goal: say('$y=|f(x)|$ zatika idaztea eta marraztea, $f$ negatiboa den tarteak bilatuz.', 'Escribir y dibujar $y=|f(x)|$ a trozos buscando los tramos en los que $f$ es negativa.', 'كتابة $y=|f(x)|$ على أجزاء ورسمها بالبحث عن المجالات التي تكون فيها $f$ سالبة.', 'Write and draw $y=|f(x)|$ piecewise by looking for the stretches where $f$ is negative.'),
        needs: [{ unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'absolute-quadratic', title: { eu: 'Parabola baten balio absolutua', es: 'Valor absoluto de una parábola', en: 'Absolute value of a parabola', ar: 'القيمة المطلقة لقطع مكافئ' } }],
        problem: say('Idatzi $y=|x^2-4x|$ zatika.', 'Escribe $y=|x^2-4x|$ a trozos.', 'اكتب $y=|x^2-4x|$ على أجزاء.', 'Write $y=|x^2-4x|$ piecewise.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrukoaren erroak.', 'Raíces de lo de dentro.', 'جذور ما بالداخل.', 'Roots of the inside.'), math: same('$x^2-4x=0\\ \\to\\ x=0,\\ x=4$') },
            { text: say('0 eta 4 artean negatiboa da: zeinua aldatzen zaio.', 'Entre 0 y 4 es negativa: se le cambia el signo.', 'بين 0 و4 سالبة: نغيّر إشارتها.', 'Between 0 and 4 it is negative: its sign is changed.'), math: same('$-(x^2-4x)=-x^2+4x$') },
            { text: say('Hiru zati.', 'Tres trozos.', 'ثلاثة أجزاء.', 'Three pieces.'), math: same('$y=\\begin{cases}x^2-4x & x<0\\\\ -x^2+4x & 0\\le x\\le 4\\\\ x^2-4x & x>4\\end{cases}$') }
        ],
        takeaway: say('$|f(x)|$ zatika idazteko, bilatu non den $f(x)<0$: han zeinua aldatzen zaio. Grafikoan, X ardatzaren azpian zegoena gora tolesten da.', 'Para escribir $|f(x)|$ a trozos, busca dónde $f(x)<0$: ahí se le cambia el signo. En la gráfica, lo que estaba bajo el eje X se dobla hacia arriba.', 'لكتابة $|f(x)|$ على أجزاء ابحث أين $f(x)<0$: هناك نغيّر الإشارة. وفي الرسم ما كان تحت محور X يُطوى إلى الأعلى.', 'To write $|f(x)|$ piecewise, look for where $f(x)<0$: there its sign is changed. On the graph, what was below the x-axis is folded up.'),
        figure: (language) => <AbsQuadraticFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const socFunctionsTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...socFunctionsLessonTexts[topic.id as SocFunctionsTopicId],
    ...socFunctionsLessonChecks[topic.id as SocFunctionsTopicId]
}))
