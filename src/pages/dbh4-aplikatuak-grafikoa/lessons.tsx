import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AffineFigure, LineEquationFigure, ProportionalFigure, SlopeFigure } from '../dbh2-funtzioak-v2/figures'
import {
    ExponentialFigure,
    GrowthFigure,
    HyperbolaFigure,
    LinearModelsFigure,
    ModelsFigure,
    ParabolaShapesFigure,
    ParallelFigure,
    RootGraphFigure,
    ShiftedHyperbolaFigure,
    ShiftFigure,
    VertexFigure
} from './figures'
import { graphsLessonChecks, type GraphsTopicId } from './lessonChecks'
import { graphsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Funtzio baten grafikoa · 4. DBH aplikatuak — stages and lessons,
   following Santillana Aplicadas 4, unit 8 (Gráfica de una función: direct
   proportion, linear functions, parabolas, inverse proportion and
   exponential functions) and Anaya Aplicadas 4, unit 9 (Funciones
   elementales: temperatures and springs, the equation of a line through a
   point or two points, parallel lines, the vertex x = −b/2a, shifted
   parabolas, hyperbolas with their asymptotes, square roots, y = k·aˣ and
   problems such as the frame of greatest area or a salary growing 8 %).
   ========================================================================== */

export type GraphsStageId = 'linear' | 'lines' | 'quadratic' | 'inverse' | 'exponential'

export const graphsStages: UnitStage[] = [
    { id: 'linear', tone: 'blue', title: { eu: 'Funtzio linealak', es: 'Funciones lineales', en: 'Linear functions', ar: 'الدوال الخطية' } },
    { id: 'lines', tone: 'violet', title: { eu: 'Zuzenaren ekuazioa', es: 'La ecuación de la recta', en: 'The equation of the straight line', ar: 'معادلة المستقيم' } },
    { id: 'quadratic', tone: 'mustard', title: { eu: 'Funtzio koadratikoak', es: 'Funciones cuadráticas', en: 'Quadratic functions', ar: 'الدوال التربيعية' } },
    { id: 'inverse', tone: 'coral', title: { eu: 'Alderantzizkoak eta erroak', es: 'Inversas y radicales', en: 'Inverse and radical functions', ar: 'العكسية والجذرية' } },
    { id: 'exponential', tone: 'green', title: { eu: 'Esponentzialak eta ereduak', es: 'Exponenciales y modelos', en: 'Exponential functions and models', ar: 'الأسية والنماذج' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Linear functions ---------- */
    {
        id: 'proportional',
        stage: 'linear',
        title: say('Proportzionaltasun zuzeneko funtzioak', 'Funciones de proporcionalidad directa', 'دوال التناسب الطردي', 'Direct proportion functions'),
        goal: say('$y=mx$ funtzioak ezagutzea, $m$ proportzionaltasun-konstantea (malda) kalkulatzea eta grafikoa marraztea.', 'Reconocer las funciones $y=mx$, calcular la constante de proporcionalidad $m$ (la pendiente) y dibujar la gráfica.', 'التعرف على الدوال $y=mx$ وحساب ثابت التناسب $m$ (الميل) ورسم البيان.', 'Recognise functions $y=mx$, calculate the constant of proportionality $m$ (the slope), and draw the graph.'),
        problem: say('$y=mx$ zuzena $(-5,\\,10)$ puntutik pasatzen da. Zenbat da $m$?', 'La recta $y=mx$ pasa por $(-5,\\,10)$. ¿Cuánto vale $m$?', 'يمر المستقيم $y=mx$ بالنقطة $(-5,\\,10)$. كم تساوي $m$؟', 'The line $y=mx$ passes through $(-5,\\,10)$. What is $m$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu puntua.', 'Sustituye el punto.', 'عوّض النقطة.', 'Substitute the point.'), math: same('$10=m\\cdot(-5)$') },
            { text: say('Zatitu. Beherakorra da.', 'Divide. Es decreciente.', 'اقسم. الدالة متناقصة.', 'Divide. It is decreasing.'), math: same('$m=-2$') }
        ],
        takeaway: say('Proportzionaltasun zuzena: jatorritik pasatzen den zuzena, malda m = y : x.', 'Proporcionalidad directa: recta por el origen, de pendiente m = y : x.', 'التناسب الطردي: مستقيم يمر بالأصل ميله m = y : x.', 'Direct proportion: a straight line through the origin, with slope m = y : x.'),
        figure: (language) => <ProportionalFigure language={language} />
    },
    {
        id: 'affine',
        stage: 'linear',
        title: say('Funtzio linealak eta konstanteak', 'Funciones lineales y constantes', 'الدوال الخطية والثابتة', 'Linear and constant functions'),
        goal: say('$y=mx+n$ funtzioan malda eta jatorriko ordenatua irakurtzea, ardatzekiko ebakidurak kalkulatzea eta grafikoa marraztea.', 'Leer la pendiente y la ordenada en el origen de $y=mx+n$, calcular los cortes con los ejes y dibujar la gráfica.', 'قراءة الميل والجزء المقطوع من $y=mx+n$ وحساب التقاطع مع المحورين ورسم البيان.', 'Read the slope and the y-intercept of $y=mx+n$, calculate where it crosses the axes, and draw the graph.'),
        problem: say('Non ebakitzen du $y=2x-6$ zuzenak X ardatza?', '¿Dónde corta la recta $y=2x-6$ al eje X?', 'أين يقطع المستقيم $y=2x-6$ محور X؟', 'Where does the line $y=2x-6$ cross the x-axis?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Egin $y=0$.', 'Haz $y=0$.', 'ضع $y=0$.', 'Put $y=0$.'), math: same('$2x-6=0$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.', 'Solve.'), math: same('$x=3\\to(3,\\,0)$') }
        ],
        takeaway: say('m: aldapa. n: Y ardatzeko ebakidura. m = 0: zuzen horizontala.', 'm: la inclinación. n: el corte con el eje Y. m = 0: recta horizontal.', 'm: الانحدار. n: التقاطع مع محور Y. m = 0: مستقيم أفقي.', 'm: the slope. n: where it crosses the y-axis. m = 0: horizontal line.'),
        figure: (language) => <AffineFigure language={language} />
    },
    {
        id: 'linear-models',
        stage: 'linear',
        title: say('Eredu linealak', 'Modelos lineales', 'نماذج خطية', 'Linear models'),
        goal: say('Egoera erreal bat $y=mx+n$ funtzio batez adieraztea eta datuak kalkulatzeko erabiltzea.', 'Describir una situación real con una función $y=mx+n$ y usarla para calcular datos.', 'وصف موقف واقعي بدالة $y=mx+n$ واستعمالها لحساب المعطيات.', 'Describe a real situation with a function $y=mx+n$ and use it to calculate data.'),
        problem: say('$y=32+1{,}8x$ erabiliz, zenbat °F dira 35 °C?', 'Con $y=32+1{,}8x$, ¿cuántos °F son 35 °C?', 'باستعمال $y=32+1{,}8x$، كم °F تساوي 35 °م؟', 'With $y=32+1{,}8x$, how many °F is 35 °C?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu $x=35$.', 'Sustituye $x=35$.', 'عوّض $x=35$.', 'Substitute $x=35$.'), math: same('$32+1{,}8\\cdot 35$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$32+63=95$') }
        ],
        takeaway: say('Hasierako balioa n da; urrats bakoitzeko aldaketa, m.', 'El valor inicial es n; el cambio por cada unidad, m.', 'القيمة الابتدائية n؛ والتغير لكل وحدة m.', 'The starting value is n; the change for each unit is m.'),
        figure: (language) => <LinearModelsFigure language={language} />
    },

    /* ---------- 2. The equation of a line ---------- */
    {
        id: 'slope',
        stage: 'lines',
needs: [{ unit: 'dbh3/funciones-lineales', topic: 'slope', title: { eu: 'Malda', es: 'La pendiente', en: 'The slope', ar: 'الميل' } }],
        title: say('Bi punturen arteko malda', 'La pendiente entre dos puntos', 'الميل بين نقطتين', 'The slope between two points'),
        goal: say('Bi puntutatik pasatzen den zuzenaren malda kalkulatzea eta grafiko batean irakurtzea.', 'Calcular la pendiente de la recta que pasa por dos puntos y leerla en una gráfica.', 'حساب ميل المستقيم المار بنقطتين وقراءته في بيان.', 'Calculate the slope of the line through two points, and read it from a graph.'),
        problem: say('Kalkulatu $(-2,\\,-4)$ eta $(2,\\,-3)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $(-2,\\,-4)$ y $(2,\\,-3)$.', 'احسب ميل المستقيم المار بـ $(-2,\\,-4)$ و$(2,\\,-3)$.', 'Calculate the slope of the line through $(-2,\\,-4)$ and $(2,\\,-3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu ordena berean.', 'Resta en el mismo orden.', 'اطرح بالترتيب نفسه.', 'Subtract in the same order.'), math: same('$m=\\frac{-3-(-4)}{2-(-2)}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$m=\\frac{1}{4}$') }
        ],
        takeaway: say('Malda: zenbat igotzen den zati zenbat aurreratzen den.', 'Pendiente: lo que sube entre lo que avanza.', 'الميل: ما يصعده مقسومًا على ما يتقدمه.', 'Slope: how much it goes up divided by how far it goes across.'),
        figure: (language) => <SlopeFigure language={language} />
    },
    {
        id: 'line-equation',
        stage: 'lines',
        needs: [{ unit: 'dbh3/funciones-lineales', topic: 'two-points', title: { eu: 'Bi puntutatik igarotzen den zuzena', es: 'Recta que pasa por dos puntos', en: 'The line through two points', ar: 'المستقيم المار بنقطتين' } }],
        figureAfterSteps: true,
        title: say('Zuzenaren ekuazioa', 'La ecuación de una recta', 'معادلة مستقيم', 'The equation of a straight line'),
        goal: say('Puntu bat eta malda ezagututa, edo bi puntu ezagututa, zuzenaren ekuazioa idaztea.', 'Escribir la ecuación de una recta conocidos un punto y la pendiente, o dos puntos.', 'كتابة معادلة مستقيم بمعرفة نقطة والميل أو بمعرفة نقطتين.', 'Write the equation of a straight line given a point and the slope, or two points.'),
        problem: say('Idatzi $(1,\\,3)$ puntutik pasatzen den eta malda 2 duen zuzenaren ekuazioa.', 'Escribe la ecuación de la recta que pasa por $(1,\\,3)$ con pendiente 2.', 'اكتب معادلة المستقيم المار بـ $(1,\\,3)$ وميله 2.', 'Write the equation of the line that passes through $(1,\\,3)$ with slope 2.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu puntua.', 'Sustituye el punto.', 'عوّض النقطة.', 'Substitute the point.'), math: same('$3=2\\cdot 1+n$') },
            { text: say('Atera $n$.', 'Despeja $n$.', 'استخرج $n$.', 'Solve for $n$.'), math: same('$n=1\\to y=2x+1$') }
        ],
        takeaway: say('Lehenik malda; gero puntu bat ordeztu n aurkitzeko.', 'Primero la pendiente; después un punto para hallar n.', 'الميل أولًا؛ ثم نقطة لإيجاد n.', 'First the slope; then a point to find n.'),
        figure: (language) => <LineEquationFigure language={language} />
    },
    {
        id: 'parallel',
        stage: 'lines',
        title: say('Zuzen paraleloak eta ebakitzaileak', 'Rectas paralelas y secantes', 'المستقيمات المتوازية والمتقاطعة', 'Parallel and intersecting lines'),
        goal: say('Bi zuzen paraleloak diren ala ez maldaz jakitzea, paralelo bat idaztea eta bi zuzenen ebaki-puntua aurkitzea.', 'Saber por la pendiente si dos rectas son paralelas, escribir una paralela y hallar el punto de corte de dos rectas.', 'معرفة توازي مستقيمين من الميل، وكتابة مستقيم مواز، وإيجاد نقطة تقاطع مستقيمين.', 'Know from the slope whether two lines are parallel, write a parallel line, and find where two lines intersect.'),
        problem: say('Non ebakitzen dute $y=3x-1$ eta $y=x+5$ zuzenek? Eman $x$.', '¿Dónde se cortan $y=3x-1$ e $y=x+5$? Da la $x$.', 'أين يتقاطع $y=3x-1$ و$y=x+5$؟ أعطِ $x$.', 'Where do $y=3x-1$ and $y=x+5$ intersect? Give the value of $x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set them equal.'), math: same('$3x-1=x+5$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.', 'Solve.'), math: same('$2x=6\\to x=3$') }
        ],
        takeaway: say('Malda bera: paraleloak. Malda desberdina: puntu batean ebakitzen dira.', 'Misma pendiente: paralelas. Distinta pendiente: se cortan en un punto.', 'الميل نفسه: متوازيان. ميل مختلف: يتقاطعان في نقطة.', 'Same slope: parallel. Different slope: they cross at one point.'),
        figure: (language) => <ParallelFigure language={language} />
    },

    /* ---------- 3. Quadratic functions ---------- */
    {
        id: 'parabola',
        stage: 'quadratic',
        title: say('Parabolak: y = ax²', 'Parábolas: y = ax²', 'القطوع المكافئة: y = ax²', 'Parabolas: y = ax²'),
        goal: say('$y=ax^2$ parabolaren forma $a$ koefizientearen arabera aurreikustea eta balio-taula batez marraztea.', 'Prever la forma de la parábola $y=ax^2$ según el coeficiente $a$ y dibujarla con una tabla de valores.', 'توقع شكل القطع المكافئ $y=ax^2$ بحسب المعامل $a$ ورسمه بجدول قيم.', 'Predict the shape of the parabola $y=ax^2$ from the coefficient $a$, and draw it using a table of values.'),
        problem: say('$y=0{,}4x^2$ parabolan, zenbat da $y$ $x=-3$ denean?', 'En la parábola $y=0{,}4x^2$, ¿cuánto vale $y$ para $x=-3$?', 'في القطع $y=0{,}4x^2$ كم تساوي $y$ عند $x=-3$؟', 'On the parabola $y=0{,}4x^2$, what is $y$ when $x=-3$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berretura lehenik.', 'Primero la potencia.', 'القوة أولًا.', 'Work out the power first.'), math: same('$(-3)^2=9$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$0{,}4\\cdot 9=3{,}6$') }
        ],
        takeaway: say('a positiboa: adarrak gora. a negatiboa: adarrak behera. |a| handia: itxia.', 'a positivo: ramas arriba. a negativo: ramas abajo. |a| grande: cerrada.', 'a موجب: الفرعان للأعلى. a سالب: للأسفل. |a| كبير: ضيق.', 'a positive: branches up. a negative: branches down. Large |a|: narrow.'),
        figure: (language) => <ParabolaShapesFigure language={language} />
    },
    {
        id: 'vertex',
        stage: 'quadratic',
        needs: [{ unit: 'dbh3/funciones-lineales', topic: 'vertex', title: { eu: 'Erpina eta simetria-ardatza', es: 'Vértice y eje de simetría', en: 'The vertex and the axis of symmetry', ar: 'الرأس ومحور التناظر' } }],
        title: say('Erpina eta ebaki-puntuak', 'Vértice y puntos de corte', 'الرأس ونقاط التقاطع', 'Vertex and intercepts'),
        goal: say('Parabola baten erpina, simetria-ardatza eta ardatzekiko ebakidurak kalkulatzea, eta haiekin marraztea.', 'Calcular el vértice, el eje de simetría y los cortes con los ejes de una parábola, y dibujarla con ellos.', 'حساب رأس القطع المكافئ ومحور تماثله وتقاطعه مع المحورين ورسمه بها.', 'Calculate the vertex, the axis of symmetry and where a parabola crosses the axes, and draw it using them.'),
        problem: say('Aurkitu $y=-x^2-2x+4$ parabolaren erpina.', 'Halla el vértice de la parábola $y=-x^2-2x+4$.', 'أوجد رأس القطع $y=-x^2-2x+4$.', 'Find the vertex of the parabola $y=-x^2-2x+4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Abszisa.', 'La abscisa.', 'الفاصلة.', 'The x-coordinate.'), math: same('$x_V=\\frac{2}{-2}=-1$') },
            { text: say('Ordenatua. Maximoa da.', 'La ordenada. Es un máximo.', 'الترتيبة. إنها قيمة عظمى.', 'The y-coordinate. It is a maximum.'), math: same('$-1+2+4=5$') }
        ],
        takeaway: say('Erpina: x = −b : 2a. Y ardatza: (0, c). X ardatza: ebatzi y = 0.', 'Vértice: x = −b : 2a. Eje Y: (0, c). Eje X: resuelve y = 0.', 'الرأس: x = −b : 2a. محور Y: (0, c). محور X: حُلّ y = 0.', 'Vertex: x = −b : 2a. y-axis: (0, c). x-axis: solve y = 0.'),
        figure: (language) => <VertexFigure language={language} />
    },
    {
        id: 'shifts',
        stage: 'quadratic',
        title: say('Parabolen lekualdaketak', 'Traslaciones de parábolas', 'انسحاب القطوع المكافئة', 'Translations of parabolas'),
        goal: say('$y=a(x-p)^2+q$ parabola $y=ax^2$ parabolaren lekualdaketa gisa ikustea eta erpina zuzenean irakurtzea.', 'Ver la parábola $y=a(x-p)^2+q$ como una traslación de $y=ax^2$ y leer el vértice directamente.', 'رؤية القطع $y=a(x-p)^2+q$ انسحابًا للقطع $y=ax^2$ وقراءة الرأس مباشرة.', 'See the parabola $y=a(x-p)^2+q$ as a translation of $y=ax^2$, and read the vertex directly.'),
        problem: say('Zein da $y=4-(x-2)^2$ parabolaren erpina?', '¿Cuál es el vértice de la parábola $y=4-(x-2)^2$?', 'ما رأس القطع $y=4-(x-2)^2$؟', 'What is the vertex of the parabola $y=4-(x-2)^2$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $a(x-p)^2+q$ eran.', 'Escríbela como $a(x-p)^2+q$.', 'اكتبه بالصورة $a(x-p)^2+q$.', 'Write it as $a(x-p)^2+q$.'), math: same('$y=-(x-2)^2+4$') },
            { text: say('Irakurri. Maximoa da.', 'Lee. Es un máximo.', 'اقرأ. إنها قيمة عظمى.', 'Read it off. It is a maximum.'), math: same('$V(2,\\,4)$') }
        ],
        takeaway: say('(x − p)²: p eskuinera. + q: q gora. Erpina (p, q).', '(x − p)²: p a la derecha. + q: q hacia arriba. Vértice (p, q).', '(x − p)²: p إلى اليمين. + q: q إلى الأعلى. الرأس (p, q).', '(x − p)²: p to the right. + q: q upwards. Vertex (p, q).'),
        figure: (language) => <ShiftFigure language={language} />
    },

    /* ---------- 4. Inverse proportion and radicals ---------- */
    {
        id: 'inverse',
        stage: 'inverse',
        needs: [{ unit: 'dbh4-aplikatuak/proporcionalidad', topic: 'inverse-rule', title: { eu: 'Hiruko erregela alderantzizkoa', es: 'Regla de tres inversa', en: 'Inverse rule of three', ar: 'قاعدة الثلاثة العكسية' } }],
        title: say('Alderantzizko proportzionaltasuna: y = k/x', 'Proporcionalidad inversa: y = k/x', 'التناسب العكسي: y = k/x', 'Inverse proportion: y = k/x'),
        goal: say('Alderantziz proportzionalak diren magnitudeak $y=\\frac{k}{x}$ funtzioaz adieraztea eta hiperbola marraztea.', 'Expresar magnitudes inversamente proporcionales con una función $y=\\frac{k}{x}$ y dibujar la hipérbola.', 'التعبير عن مقادير متناسبة عكسيًا بدالة $y=\\frac{k}{x}$ ورسم القطع الزائد.', 'Express inversely proportional quantities with a function $y=\\frac{k}{x}$, and draw the hyperbola.'),
        problem: say('48 behirentzako pentsuak 15 egun irauten du. Zenbat egun iraungo du 60 behirentzat?', 'El pienso para 48 vacas dura 15 días. ¿Cuántos días dura para 60 vacas?', 'يكفي العلف 48 بقرة مدة 15 يومًا. كم يومًا يكفي 60 بقرة؟', 'The feed for 48 cows lasts 15 days. How many days will it last for 60 cows?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konstantea.', 'La constante.', 'الثابت.', 'The constant.'), math: same('$k=48\\cdot 15=720$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: same('$y=\\frac{720}{60}=12$') }
        ],
        takeaway: say('Alderantzizkoa: x · y = k. Hiperbola, ardatzak asintota.', 'Inversa: x · y = k. Hipérbola con los ejes como asíntotas.', 'عكسي: x · y = k. قطع زائد مقارباه المحوران.', 'Inverse: x · y = k. Hyperbola with the axes as asymptotes.'),
        figure: (language) => <HyperbolaFigure language={language} />
    },
    {
        id: 'asymptotes',
        stage: 'inverse',
        title: say('Hiperbolak eta asintotak', 'Hipérbolas y asíntotas', 'القطوع الزائدة والمقاربات', 'Hyperbolas and asymptotes'),
        goal: say('$y=\\frac{k}{x-a}+b$ funtzioaren asintotak eta izate-eremua aurkitzea eta $y=\\frac{k}{x}$ hiperbolaren lekualdaketa gisa marraztea.', 'Hallar las asíntotas y el dominio de $y=\\frac{k}{x-a}+b$ y dibujarla como traslación de $y=\\frac{k}{x}$.', 'إيجاد مقاربات $y=\\frac{k}{x-a}+b$ ومجالها ورسمها انسحابًا للقطع $y=\\frac{k}{x}$.', 'Find the asymptotes and the domain of $y=\\frac{k}{x-a}+b$, and draw it as a translation of $y=\\frac{k}{x}$.'),
        problem: say('Zein dira $y=\\frac{3}{x+1}-2$ funtzioaren asintotak?', '¿Cuáles son las asíntotas de $y=\\frac{3}{x+1}-2$?', 'ما مقاربا $y=\\frac{3}{x+1}-2$؟', 'What are the asymptotes of $y=\\frac{3}{x+1}-2$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea 0.', 'Denominador 0.', 'المقام 0.', 'Denominator = 0.'), math: same('$x+1=0\\to x=-1$') },
            { text: say('Batutako zenbakia.', 'El número sumado.', 'العدد المضاف.', 'The number that is added.'), math: same('$y=-2$') }
        ],
        takeaway: say('Asintota bertikala: izendatzailea 0. Horizontala: batzen den zenbakia.', 'Asíntota vertical: el denominador se anula. Horizontal: el número que se suma.', 'المقارب الرأسي: ينعدم المقام. الأفقي: العدد المضاف.', 'Vertical asymptote: the denominator becomes zero. Horizontal: the number that is added.'),
        figure: (language) => <ShiftedHyperbolaFigure language={language} />
    },
    {
        id: 'radical',
        stage: 'inverse',
        needs: [{ unit: 'dbh4-aplikatuak/funciones', topic: 'domain-formula', title: { eu: 'Izate-eremua formulatik', es: 'Dominio desde la fórmula', en: 'Domain from the formula', ar: 'المجال من الصيغة' } }],
        title: say('Funtzio erradikalak', 'Funciones radicales', 'الدوال الجذرية', 'Radical functions'),
        goal: say('$y=\\sqrt{x}$ motako funtzioen izate-eremua aurkitzea eta taula batez marraztea.', 'Hallar el dominio de funciones del tipo $y=\\sqrt{x}$ y dibujarlas con una tabla.', 'إيجاد مجال الدوال من نوع $y=\\sqrt{x}$ ورسمها بجدول.', 'Find the domain of functions like $y=\\sqrt{x}$, and draw them using a table.'),
        problem: say('$y=\\sqrt{x-5}$ funtzioaren izate-eremua $[a,\\,+\\infty)$ da. Zenbat da $a$?', 'El dominio de $y=\\sqrt{x-5}$ es $[a,\\,+\\infty)$. ¿Cuánto vale $a$?', 'مجال $y=\\sqrt{x-5}$ هو $[a,\\,+\\infty)$. كم تساوي $a$؟', 'The domain of $y=\\sqrt{x-5}$ is $[a,\\,+\\infty)$. What is $a$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Errokizuna $\\ge 0$.', 'Lo de dentro $\\ge 0$.', 'ما تحت الجذر $\\ge 0$.', 'What is inside the root $\\ge 0$.'), math: same('$x-5\\ge 0$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.', 'Solve.'), math: same('$x\\ge 5\\to a=5$') }
        ],
        takeaway: say('Erroaren barrukoa ≥ 0: hortik izate-eremua. Taula: 0, 1, 4, 9.', 'Lo de dentro de la raíz ≥ 0: de ahí el dominio. Tabla: 0, 1, 4, 9.', 'ما تحت الجذر ≥ 0: ومنه المجال. الجدول: 0، 1، 4، 9.', 'What is inside the root ≥ 0: that gives the domain. Table: 0, 1, 4, 9.'),
        figure: (language) => <RootGraphFigure language={language} />
    },

    /* ---------- 5. Exponentials and models ---------- */
    {
        id: 'exponential',
        stage: 'exponential',
        title: say('Funtzio esponentzialak: y = aˣ', 'Funciones exponenciales: y = aˣ', 'الدوال الأسية: y = aˣ', 'Exponential functions: y = aˣ'),
        goal: say('$y=a^x$ funtzioak ezagutzea, balio-taula egitea eta gorakorrak edo beherakorrak diren erabakitzea.', 'Reconocer las funciones $y=a^x$, hacer su tabla de valores y decidir si son crecientes o decrecientes.', 'التعرف على الدوال $y=a^x$ وعمل جدول قيمها وتقرير تزايدها أو تناقصها.', 'Recognise functions $y=a^x$, make their table of values, and decide whether they are increasing or decreasing.'),
        problem: say('$y=\\left(\\frac{1}{2}\\right)^x$ funtzioan, zenbat da $y$ $x=-3$ denean?', 'En $y=\\left(\\frac{1}{2}\\right)^x$, ¿cuánto vale $y$ para $x=-3$?', 'في $y=\\left(\\frac{1}{2}\\right)^x$ كم تساوي $y$ عند $x=-3$؟', 'In $y=\\left(\\frac{1}{2}\\right)^x$, what is $y$ when $x=-3$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berretzaile negatiboa: alderantzizkoa.', 'Exponente negativo: el inverso.', 'أس سالب: المقلوب.', 'Negative exponent: the reciprocal.'), math: same('$\\left(\\frac{1}{2}\\right)^{-3}=2^3$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$2^3=8$') }
        ],
        takeaway: say('y = aˣ: beti (0, 1) puntutik. a > 1 gorakorra; 0 < a < 1 beherakorra.', 'y = aˣ: siempre por (0, 1). a > 1 creciente; 0 < a < 1 decreciente.', 'y = aˣ: دائمًا عبر (0, 1). a > 1 متزايدة؛ 0 < a < 1 متناقصة.', 'y = aˣ: always through (0, 1). a > 1 increasing; 0 < a < 1 decreasing.'),
        figure: (language) => <ExponentialFigure language={language} />
    },
    {
        id: 'growth',
        stage: 'exponential',
        needs: [{ unit: 'dbh4-aplikatuak/proporcionalidad', topic: 'index', title: { eu: 'Aldakuntza-indizea: BEZa eta beherapenak', es: 'El índice de variación: IVA y rebajas', en: 'The multiplier: VAT and sales', ar: 'مؤشر التغيّر: الضريبة والتخفيضات' } }],
        title: say('Hazkunde eta beherakada esponentziala', 'Crecimiento y decrecimiento exponencial', 'النمو والتناقص الأسي', 'Exponential growth and decay'),
        goal: say('Ehuneko berean hazten edo txikitzen diren egoerak $y=k\\cdot a^x$ funtzioaz adieraztea.', 'Describir con una función $y=k\\cdot a^x$ las situaciones que crecen o decrecen en el mismo porcentaje.', 'وصف المواقف التي تزيد أو تنقص بالنسبة نفسها بدالة $y=k\\cdot a^x$.', 'Describe, with a function $y=k\\cdot a^x$, situations that grow or decrease by the same percentage.'),
        problem: say('500 bakterio daude eta orduro bikoizten dira. Zenbat izango dira 4 ordu barru?', 'Hay 500 bacterias y se duplican cada hora. ¿Cuántas habrá dentro de 4 horas?', 'توجد 500 بكتيريا وتتضاعف كل ساعة. كم ستكون بعد 4 ساعات؟', 'There are 500 bacteria, and they double every hour. How many will there be in 4 hours?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eredua.', 'El modelo.', 'النموذج.', 'The model.'), math: same('$y=500\\cdot 2^x$') },
            { text: say('Ordeztu $x=4$.', 'Sustituye $x=4$.', 'عوّض $x=4$.', 'Substitute $x=4$.'), math: same('$500\\cdot 16=8000$') }
        ],
        takeaway: say('% p igo: bider (1 + p/100). % p jaitsi: bider (1 − p/100).', 'Subir un p %: por (1 + p/100). Bajar un p %: por (1 − p/100).', 'زيادة p %: الضرب في (1 + p/100). نقصان p %: في (1 − p/100).', 'Going up p%: multiply by (1 + p/100). Going down p%: multiply by (1 − p/100).'),
        figure: (language) => <GrowthFigure language={language} />
    },
    {
        id: 'models',
        stage: 'exponential',
        title: say('Eredu egokia aukeratzea', 'Elegir el modelo adecuado', 'اختيار النموذج المناسب', 'Choose the right model'),
        goal: say('Egoera edo grafiko bat ikusita zein funtzio-mota den erabakitzea eta problemak ebaztea, maximo bat aurkitzea barne.', 'Decidir qué tipo de función describe una situación o una gráfica y resolver problemas, incluido hallar un máximo.', 'تقرير نوع الدالة التي تصف موقفًا أو بيانًا وحل المسائل، بما فيها إيجاد قيمة عظمى.', 'Decide which type of function describes a situation or a graph, and solve problems, including finding a maximum.'),
        problem: say('20 m-ko hesi batekin laukizuzen bat itxi nahi da. Zenbat da azalera handiena?', 'Con 20 m de valla se quiere cerrar un rectángulo. ¿Cuál es el área máxima?', 'نريد إحاطة مستطيل بسياج طوله 20 م. ما أكبر مساحة؟', 'With 20 m of fencing, you want to enclose a rectangle. What is the maximum area?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarria $x$, altuera $10-x$.', 'Base $x$, altura $10-x$.', 'القاعدة $x$ والارتفاع $10-x$.', 'Base $x$, height $10-x$.'), math: same('$A=x(10-x)$') },
            { text: say('Erpina $x=5$ denean.', 'Vértice en $x=5$.', 'الرأس عند $x=5$.', 'Vertex at $x=5$.'), math: same('$5\\cdot 5=25$') }
        ],
        takeaway: say('Batu: lineala. Biderkadura finkoa: alderantzizkoa. Ehunekoa: esponentziala. Azalera: parabola.', 'Sumar: lineal. Producto fijo: inversa. Porcentaje: exponencial. Área: parábola.', 'جمع: خطية. ضرب ثابت: عكسية. نسبة: أسية. مساحة: قطع مكافئ.', 'Add: linear. Fixed product: inverse. Percentage: exponential. Area: parabola.'),
        figure: (language) => <ModelsFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const graphsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...graphsLessonTexts[topic.id as GraphsTopicId], ...graphsLessonChecks[topic.id as GraphsTopicId] }))
