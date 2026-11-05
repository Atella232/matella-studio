import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { LineEquationFigure, SlopeFigure } from '../dbh2-funtzioak-v2/figures'
import { HyperbolaFigure, ParabolaShapesFigure, ShiftedHyperbolaFigure, ShiftFigure, VertexFigure } from '../dbh4-aplikatuak-grafikoa/figures'
import { same, say } from '../dbh4-akademikoak-funtzioak/text'
import {
    AbsLinearFigure,
    AbsPiecesFigure,
    AbsQuadraticFigure,
    LineKindsFigure,
    LineParabolaFigure,
    ParabolaCutsFigure,
    RationalFormFigure,
    VertexPointFigure
} from './figures'
import { polynomialAkLessonChecks, type PolynomialAkTopicId } from './lessonChecks'
import { polynomialAkLessonTexts } from './lessonTexts'

/* ==========================================================================
   Funtzio polinomikoak eta arrazionalak · 4. DBH akademikoak — stages and
   lessons, following Santillana 4.º Académicas unit 10 (Funciones
   polinómicas y racionales: linear functions, the slope and the equation
   of a line, parabolas with their vertex and intercepts, translations,
   inverse proportion and hyperbolas y = k/(x − a) + b) and Anaya 4.º
   Académicas unit 5 (Funciones elementales: lines through a point or two
   points, parabolas and their intercepts with a line, functions with
   absolute value written piecewise, inverse proportion and rational
   functions with their asymptotes).
   ========================================================================== */

export type PolynomialAkStageId = 'lines' | 'parabolas' | 'shifts' | 'absolute' | 'rational'

export const polynomialAkStages: UnitStage[] = [
    { id: 'lines', tone: 'blue', title: { eu: 'Funtzio linealak', es: 'Funciones lineales', en: 'Linear functions', ar: 'الدوال الخطية' } },
    { id: 'parabolas', tone: 'violet', title: { eu: 'Funtzio koadratikoak', es: 'Funciones cuadráticas', en: 'Quadratic functions', ar: 'الدوال التربيعية' } },
    { id: 'shifts', tone: 'mustard', title: { eu: 'Lekualdaketak eta ebakidurak', es: 'Traslaciones y cortes', en: 'Translations and intersections', ar: 'الانسحابات والتقاطعات' } },
    { id: 'absolute', tone: 'coral', title: { eu: 'Balio absolutua', es: 'Valor absoluto', en: 'Absolute value', ar: 'القيمة المطلقة' } },
    { id: 'rational', tone: 'green', title: { eu: 'Funtzio arrazionalak', es: 'Funciones racionales', en: 'Rational functions', ar: 'الدوال الكسرية' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Linear functions ---------- */
    {
        id: 'line-kinds',
        stage: 'lines',
        title: say('Funtzio linealak, proportzionalak eta konstanteak', 'Funciones lineales, de proporcionalidad y constantes', 'الدوال الخطية والتناسبية والثابتة', 'Linear, proportional and constant functions'),
        goal: say('$y=mx+n$ funtzio mota bereiztea, $m$ eta $n$ irakurtzea eta zuzena bi punturekin marraztea.', 'Distinguir los tipos de función $y=mx+n$, leer $m$ y $n$ y dibujar la recta con dos puntos.', 'التمييز بين أنواع الدالة $y=mx+n$، وقراءة $m$ و$n$، ورسم المستقيم بنقطتين.', 'Recognise the types of function $y=mx+n$, read $m$ and $n$, and draw a straight line through two points.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'affine', title: { eu: 'Funtzio afinak', es: 'Funciones afines', en: 'Affine functions', ar: 'الدوال التآلفية' } }
        ],
        problem: say('Marraztu $y=-\\frac{1}{2}x+2$: aurkitu bi puntu.', 'Representa $y=-\\frac{1}{2}x+2$: halla dos puntos.', 'ارسم $y=-\\frac{1}{2}x+2$: أوجد نقطتين.', 'Draw $y=-\\frac{1}{2}x+2$: find two points.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x=0$: jatorriko ordenatua.', '$x=0$: la ordenada en el origen.', '$x=0$: الجزء المقطوع.', '$x=0$: the y-intercept.'), math: same('$f(0)=2\\ \\to\\ (0,\\,2)$') },
            { text: say('$x=4$ hartu, zatikia desagertzeko.', 'Toma $x=4$ para que se vaya la fracción.', 'خذ $x=4$ لتختفي الكسور.', 'Take $x=4$ so the fraction cancels out.'), math: same('$f(4)=-2+2=0$') },
            { text: say('Lotu $(0,\\,2)$ eta $(4,\\,0)$ puntuak.', 'Une $(0,\\,2)$ y $(4,\\,0)$.', 'صِل $(0,\\,2)$ و$(4,\\,0)$.', 'Join $(0,\\,2)$ and $(4,\\,0)$.'), math: same('$m=-\\frac{1}{2}<0$') }
        ],
        takeaway: say('Proportzionala: n = 0. Konstantea: m = 0. Bi puntu nahikoak dira zuzena marrazteko.', 'Proporcional: n = 0. Constante: m = 0. Dos puntos bastan para dibujar la recta.', 'تناسبية: n = 0. ثابتة: m = 0. تكفي نقطتان لرسم المستقيم.', 'Proportional: n = 0. Constant: m = 0. Two points are enough to draw the straight line.'),
        figure: (language) => <LineKindsFigure language={language} />
    },
    {
        id: 'slope',
        stage: 'lines',
        title: say('Malda', 'La pendiente', 'الميل', 'Slope'),
        goal: say('Bi puntutatik pasatzen den zuzenaren malda kalkulatzea eta zuzena gorakorra edo beherakorra den esatea.', 'Calcular la pendiente de la recta que pasa por dos puntos y decir si la recta es creciente o decreciente.', 'حساب ميل المستقيم المار بنقطتين، وتحديد ما إذا كان متزايدًا أو متناقصًا.', 'Work out the slope of the straight line through two points, and say whether the straight line is increasing or decreasing.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'slope', title: { eu: 'Malda', es: 'La pendiente', en: 'The slope', ar: 'الميل' } }
        ],
        problem: say('Kalkulatu $A(-1,\\,4)$ eta $B(3,\\,-4)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $A(-1,\\,4)$ y $B(3,\\,-4)$.', 'احسب ميل المستقيم المار بـ $A(-1,\\,4)$ و$B(3,\\,-4)$.', 'Work out the slope of the straight line through $A(-1,\\,4)$ and $B(3,\\,-4)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$y$-ren aldaketa zati $x$-ren aldaketa.', 'Variación de $y$ entre variación de $x$.', 'تغير $y$ على تغير $x$.', 'Change in $y$ divided by change in $x$.'), math: same('$m=\\frac{-4-4}{3-(-1)}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$m=\\frac{-8}{4}=-2$') },
            { text: say('Negatiboa: beherakorra.', 'Negativa: decreciente.', 'سالب: متناقصة.', 'Negative: decreasing.'), math: same('$m<0$') }
        ],
        takeaway: say('Malda: y-ren aldaketa zati x-ren aldaketa. Positiboa, gorakorra; negatiboa, beherakorra.', 'Pendiente: variación de y entre variación de x. Positiva, creciente; negativa, decreciente.', 'الميل: تغير y على تغير x. موجب: متزايدة؛ سالب: متناقصة.', 'Slope: change in $y$ divided by change in $x$. Positive, increasing; negative, decreasing.'),
        figure: (language) => <SlopeFigure language={language} />
    },
    {
        id: 'line-equation',
        stage: 'lines',
        title: say('Zuzenaren ekuazioa', 'La ecuación de la recta', 'معادلة المستقيم', 'The equation of the straight line'),
        goal: say('Zuzen baten ekuazioa idaztea puntu bat eta malda, bi puntu edo zuzen paralelo bat ezagututa.', 'Escribir la ecuación de una recta conociendo un punto y la pendiente, dos puntos o una recta paralela.', 'كتابة معادلة مستقيم بمعرفة نقطة والميل، أو نقطتين، أو مستقيم موازٍ.', 'Write the equation of a straight line when you know a point and the slope, two points, or a parallel straight line.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'two-points', title: { eu: 'Bi puntutatik igarotzen den zuzena', es: 'Recta que pasa por dos puntos', en: 'The line through two points', ar: 'المستقيم المار بنقطتين' } },
            { unit: 'dbh4-akademikoak/vectores-rectas', topic: 'continuous', title: { eu: 'Ekuazio jarraitua eta puntu-malda ekuazioa', es: 'Ecuación continua y punto-pendiente', en: 'Continuous and point-slope equations', ar: 'المعادلة المتصلة ومعادلة النقطة والميل' } }
        ],
        problem: say('Idatzi $(1,\\,2)$ eta $(3,\\,8)$ puntuetatik pasatzen den zuzenaren ekuazioa.', 'Escribe la ecuación de la recta que pasa por $(1,\\,2)$ y $(3,\\,8)$.', 'اكتب معادلة المستقيم المار بـ $(1,\\,2)$ و$(3,\\,8)$.', 'Write the equation of the straight line through $(1,\\,2)$ and $(3,\\,8)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Malda.', 'La pendiente.', 'الميل.', 'The slope.'), math: same('$m=\\frac{8-2}{3-1}=3$') },
            { text: say('Puntu-malda ekuazioa.', 'Ecuación punto-pendiente.', 'معادلة النقطة والميل.', 'Point-slope form.'), math: same('$y-2=3(x-1)$') },
            { text: say('Askatu $y$.', 'Despeja $y$.', 'اعزل $y$.', 'Solve for $y$.'), math: same('$y=3x-1$') }
        ],
        takeaway: say('Puntu bat eta malda: y − y₀ = m(x − x₀). Paraleloak: malda bera.', 'Un punto y la pendiente: y − y₀ = m(x − x₀). Paralelas: la misma pendiente.', 'نقطة وميل: y − y₀ = m(x − x₀). المتوازيان: الميل نفسه.', 'One point and the slope: y − y₀ = m(x − x₀). Parallel lines: the same slope.'),
        figure: (language) => <LineEquationFigure language={language} />
    },

    /* ---------- 2. Quadratic functions ---------- */
    {
        id: 'parabola-a',
        stage: 'parabolas',
        title: say('$y=ax^{2}$ parabolak', 'Las parábolas $y=ax^{2}$', 'القطوع المكافئة $y=ax^{2}$', 'The parabolas $y=ax^{2}$'),
        goal: say('$a$ koefizienteak parabolaren forman duen eragina ulertzea: irekiera, norabidea eta erpina.', 'Entender cómo influye el coeficiente $a$ en la forma de la parábola: abertura, orientación y vértice.', 'فهم أثر المعامل $a$ في شكل القطع المكافئ: الانفتاح والاتجاه والرأس.', 'Understand how the coefficient $a$ affects the shape of the parabola: how wide it is, which way it opens, and its vertex.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'parabola-shape', title: { eu: 'Parabola', es: 'La parábola', en: 'The parabola', ar: 'القطع المكافئ' } }
        ],
        problem: say('Kalkulatu $y=3x^{2}$ eta $y=-\\frac{1}{2}x^{2}$ funtzioen balioa $x=2$ puntuan. Zein dago behera irekita?', 'Calcula el valor de $y=3x^{2}$ y de $y=-\\frac{1}{2}x^{2}$ en $x=2$. ¿Cuál se abre hacia abajo?', 'احسب قيمة $y=3x^{2}$ و$y=-\\frac{1}{2}x^{2}$ عند $x=2$. أيهما مفتوح إلى الأسفل؟', 'Work out the value of $y=3x^{2}$ and of $y=-\\frac{1}{2}x^{2}$ at $x=2$. Which one opens downwards?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoa: $a=3>0$, gora.', 'La primera: $a=3>0$, hacia arriba.', 'الأولى: $a=3>0$، إلى الأعلى.', 'The first: $a=3>0$, opens upwards.'), math: same('$3\\cdot 2^{2}=12$') },
            { text: say('Bigarrena: $a<0$, behera.', 'La segunda: $a<0$, hacia abajo.', 'الثانية: $a<0$، إلى الأسفل.', 'The second: $a<0$, opens downwards.'), math: same('$-\\frac{1}{2}\\cdot 2^{2}=-2$') }
        ],
        takeaway: say('a > 0: gora eta minimoa. a < 0: behera eta maximoa. |a| handiagoa: itxiagoa.', 'a > 0: hacia arriba y mínimo. a < 0: hacia abajo y máximo. |a| mayor: más cerrada.', 'a > 0: إلى الأعلى وقيمة صغرى. a < 0: إلى الأسفل وقيمة عظمى. |a| أكبر: أضيق.', 'a > 0: upwards and a minimum. a < 0: downwards and a maximum. Bigger |a|: narrower.'),
        figure: (language) => <ParabolaShapesFigure language={language} />
    },
    {
        id: 'vertex',
        stage: 'parabolas',
        title: say('Erpina eta simetria-ardatza', 'Vértice y eje de simetría', 'الرأس ومحور التماثل', 'Vertex and axis of symmetry'),
        goal: say('$y=ax^{2}+bx+c$ parabolaren erpina kalkulatzea, maximoa ala minimoa den esatea eta ibiltartea idaztea.', 'Calcular el vértice de la parábola $y=ax^{2}+bx+c$, decir si es máximo o mínimo y escribir el recorrido.', 'حساب رأس القطع $y=ax^{2}+bx+c$، وتحديد ما إذا كان عظمى أو صغرى، وكتابة المدى.', 'Work out the vertex of the parabola $y=ax^{2}+bx+c$, say whether it is a maximum or a minimum, and write the range.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'vertex', title: { eu: 'Erpina eta simetria-ardatza', es: 'Vértice y eje de simetría', en: 'The vertex and the axis of symmetry', ar: 'الرأس ومحور التناظر' } }
        ],
        problem: say('Kalkulatu $y=-x^{2}+4x+1$ parabolaren erpina. Maximoa ala minimoa da?', 'Calcula el vértice de $y=-x^{2}+4x+1$. ¿Es máximo o mínimo?', 'احسب رأس $y=-x^{2}+4x+1$. هل هو عظمى أم صغرى؟', 'Work out the vertex of $y=-x^{2}+4x+1$. Is it a maximum or a minimum?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Abzisa: $a=-1$, $b=4$.', 'Abscisa: $a=-1$, $b=4$.', 'الإحداثي السيني: $a=-1$، $b=4$.', 'x-coordinate: $a=-1$, $b=4$.'), math: same('$x_v=\\frac{-4}{-2}=2$') },
            { text: say('Ordenatua: irudia.', 'Ordenada: la imagen.', 'الإحداثي الصادي: الصورة.', 'y-coordinate: the value of the function.'), math: same('$y_v=-4+8+1=5$') },
            { text: say('$a<0$: $V(2,\\,5)$ maximoa da.', '$a<0$: $V(2,\\,5)$ es un máximo.', '$a<0$: $V(2,\\,5)$ قيمة عظمى.', '$a<0$: $V(2,\\,5)$ is a maximum.'), math: same('$\\text{Rec}\\,f=(-\\infty,\\,5]$') }
        ],
        takeaway: say('Erpina: x = −b/2a eta gero haren irudia. a-ren zeinuak esaten du maximoa ala minimoa den.', 'Vértice: x = −b/2a y luego su imagen. El signo de a dice si es máximo o mínimo.', 'الرأس: x = −b/2a ثم صورته. إشارة a تحدد العظمى أو الصغرى.', 'Vertex: x = −b/2a, then its value. The sign of a tells you whether it is a maximum or a minimum.'),
        figure: (language) => <VertexFigure language={language} />
    },
    {
        id: 'parabola-cuts',
        stage: 'parabolas',
        title: say('Ebaki-puntuak eta grafikoa', 'Puntos de corte y gráfica', 'نقاط التقاطع والرسم', 'Intercepts and graph'),
        goal: say('Parabolak ardatzekin dituen ebaki-puntuak kalkulatzea, zenbat diren diskriminatzailearekin jakitea eta grafikoa osatzea.', 'Calcular los puntos de corte de una parábola con los ejes, saber cuántos hay con el discriminante y completar la gráfica.', 'حساب نقاط تقاطع القطع المكافئ مع المحورين، ومعرفة عددها بالمميز، وإكمال الرسم.', 'Work out where a parabola crosses the axes, use the discriminant to see how many crossing points there are, and complete the graph.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'parabola-intercepts', title: { eu: 'Parabolaren ebaki-puntuak', es: 'Cortes de la parábola con los ejes', en: 'Where a parabola meets the axes', ar: 'تقاطعات القطع المكافئ مع المحورين' } },
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'quadratic-formula', title: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', en: 'Second-degree equations', ar: 'معادلات الدرجة الثانية' } }
        ],
        problem: say('Kalkulatu $y=x^{2}-2x-8$ parabolak ardatzekin dituen ebaki-puntuak.', 'Halla los puntos de corte de $y=x^{2}-2x-8$ con los ejes.', 'أوجد نقاط تقاطع $y=x^{2}-2x-8$ مع المحورين.', 'Find where $y=x^{2}-2x-8$ crosses the axes.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatza: $x=0$.', 'Eje Y: $x=0$.', 'محور Y: $x=0$.', 'y-axis: $x=0$.'), math: same('$(0,\\,-8)$') },
            { text: say('X ardatza: diskriminatzailea.', 'Eje X: el discriminante.', 'محور X: المميز.', 'x-axis: the discriminant.'), math: same('$\\Delta=4+32=36>0$') },
            { text: say('Bi soluzio.', 'Dos soluciones.', 'حلّان.', 'Two solutions.'), math: same('$x=\\frac{2\\pm 6}{2}$') },
            { text: say('Ebaki-puntuak.', 'Los cortes.', 'نقاط التقاطع.', 'The crossing points.'), math: same('$(4,\\,0),\\ (-2,\\,0)$') }
        ],
        takeaway: say('Y ardatza: (0, c). X ardatza: ebatzi ekuazioa. Δ > 0 bi, Δ = 0 bat, Δ < 0 bat ere ez.', 'Eje Y: (0, c). Eje X: resuelve la ecuación. Δ > 0 dos, Δ = 0 uno, Δ < 0 ninguno.', 'محور Y: (0, c). محور X: حُلّ المعادلة. Δ > 0 اثنتان، Δ = 0 واحدة، Δ < 0 لا شيء.', 'y-axis: (0, c). x-axis: solve the equation. Δ > 0 two, Δ = 0 one, Δ < 0 none.'),
        figure: (language) => <ParabolaCutsFigure language={language} />
    },

    /* ---------- 3. Translations and intersections ---------- */
    {
        id: 'vertex-form',
        stage: 'shifts',
        title: say('Parabolen lekualdaketak', 'Traslaciones de parábolas', 'انسحابات القطوع المكافئة', 'Translations of parabolas'),
        goal: say('$y=a(x-p)^{2}+q$ parabola $y=ax^{2}$ parabolaren lekualdaketa gisa irakurtzea eta forma orokorrera eta alderantziz igarotzea.', 'Leer $y=a(x-p)^{2}+q$ como una traslación de $y=ax^{2}$ y pasar a la forma general y al revés.', 'قراءة $y=a(x-p)^{2}+q$ انسحابًا لـ $y=ax^{2}$، والانتقال إلى الصورة العامة وبالعكس.', 'Read $y=a(x-p)^{2}+q$ as a translation of $y=ax^{2}$, and switch between this form and the general form, in both directions.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'identities', title: { eu: 'Identitate nabarmenak', es: 'Igualdades notables', en: 'Remarkable identities', ar: 'المتطابقات الشهيرة' } }
        ],
        problem: say('Nola lortzen da $y=2(x+1)^{2}-3$ parabola $y=2x^{2}$ parabolatik? Zein da erpina?', '¿Cómo se obtiene $y=2(x+1)^{2}-3$ a partir de $y=2x^{2}$? ¿Cuál es su vértice?', 'كيف نحصل على $y=2(x+1)^{2}-3$ من $y=2x^{2}$؟ وما رأسه؟', 'How do you get $y=2(x+1)^{2}-3$ from $y=2x^{2}$? What is its vertex?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $x-p$ forman.', 'Escríbelo como $x-p$.', 'اكتبه على صورة $x-p$.', 'Write it as $x-p$.'), math: same('$x+1=x-(-1)$') },
            { text: say('1 ezkerrera eta 3 behera.', '1 a la izquierda y 3 hacia abajo.', '1 إلى اليسار و3 إلى الأسفل.', '1 to the left and 3 down.'), math: same('$V(-1,\\,-3)$') }
        ],
        takeaway: say('Erpina (p, q): x − p barruan (zeinua aldatuta) eta q kanpoan. Forma bera, beste leku batean.', 'Vértice (p, q): x − p dentro (con el signo cambiado) y q fuera. La misma forma en otro sitio.', 'الرأس (p, q): x − p في الداخل (بإشارة معكوسة) وq في الخارج. الشكل نفسه في مكان آخر.', 'Vertex (p, q): x − p inside the bracket (with its sign changed) and q outside. The same shape in another place.'),
        figure: (language) => <ShiftFigure language={language} />
    },
    {
        id: 'parabola-from',
        stage: 'shifts',
        figureAfterSteps: true,
        title: say('Parabola bat aurkitzea', 'Hallar una parábola', 'إيجاد قطع مكافئ', 'Find a parabola'),
        goal: say('Parabola baten ekuazioa aurkitzea erpina eta puntu bat, edo ebaki-puntuak eta beste puntu bat ezagututa.', 'Hallar la ecuación de una parábola conociendo el vértice y un punto, o los cortes con el eje X y otro punto.', 'إيجاد معادلة قطع مكافئ بمعرفة الرأس ونقطة، أو نقاط التقاطع مع محور X ونقطة أخرى.', 'Find the equation of a parabola when you know the vertex and a point, or its crossing points with the x-axis and another point.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'factorize', title: { eu: 'Polinomioak faktorizatzea', es: 'Factorizar polinomios', en: 'Factorising polynomials', ar: 'تحليل الحدوديات' } }
        ],
        problem: say('Parabola baten erpina $(1,\\,-4)$ da eta $(3,\\,0)$ puntutik pasatzen da. Idatzi haren ekuazioa.', 'Una parábola tiene el vértice en $(1,\\,-4)$ y pasa por $(3,\\,0)$. Escribe su ecuación.', 'قطع مكافئ رأسه $(1,\\,-4)$ ويمر بـ $(3,\\,0)$. اكتب معادلته.', 'A parabola has its vertex at $(1,\\,-4)$ and passes through $(3,\\,0)$. Write its equation.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erpina ordeztu.', 'Pon el vértice.', 'ضع الرأس.', 'Put in the vertex.'), math: same('$y=a(x-1)^{2}-4$') },
            { text: say('$(3,\\,0)$ puntua ordeztu.', 'Sustituye el punto $(3,\\,0)$.', 'عوّض النقطة $(3,\\,0)$.', 'Substitute the point $(3,\\,0)$.'), math: same('$0=4a-4\\ \\to\\ a=1$') },
            { text: say('Garatu.', 'Desarrolla.', 'انشر.', 'Expand.'), math: same('$y=x^{2}-2x-3$') }
        ],
        takeaway: say('Erpina ezagututa: a(x − p)² + q. Ebaki-puntuak ezagututa: a(x − r₁)(x − r₂). Beste puntu batek ematen du a.', 'Con el vértice: a(x − p)² + q. Con los cortes: a(x − r₁)(x − r₂). Otro punto da la a.', 'بالرأس: a(x − p)² + q. بالتقاطعات: a(x − r₁)(x − r₂). ونقطة أخرى تعطي a.', 'With the vertex: a(x − p)² + q. With the crossing points: a(x − r₁)(x − r₂). Another point gives you a.'),
        figure: (language) => <VertexPointFigure language={language} />
    },
    {
        id: 'line-parabola',
        stage: 'shifts',
        figureAfterSteps: true,
        title: say('Zuzen eta parabola baten ebakidurak', 'Cortes de recta y parábola', 'تقاطع مستقيم وقطع مكافئ', 'Intersections of a straight line and a parabola'),
        goal: say('Zuzen baten eta parabola baten ebaki-puntuak kalkulatzea ekuazio-sistema ebatziz.', 'Calcular los puntos de corte de una recta y una parábola resolviendo un sistema de ecuaciones.', 'حساب نقاط تقاطع مستقيم وقطع مكافئ بحل نظام معادلات.', 'Work out where a straight line and a parabola cross by solving a system of equations.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'line-curve', title: { eu: 'Lehen mailakoa eta bigarren mailakoa', es: 'Una de primer grado y otra de segundo', en: 'One linear and one quadratic', ar: 'معادلة من الدرجة الأولى وأخرى من الثانية' } }
        ],
        problem: say('Kalkulatu $y=x^{2}-1$ eta $y=x+1$ grafikoen ebaki-puntuak.', 'Halla los puntos de corte de $y=x^{2}-1$ e $y=x+1$.', 'أوجد نقاط تقاطع $y=x^{2}-1$ و$y=x+1$.', 'Find where $y=x^{2}-1$ and $y=x+1$ meet.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set them equal.'), math: same('$x^{2}-1=x+1$') },
            { text: say('Eraman dena ezkerrera.', 'Pásalo todo a la izquierda.', 'انقل كل شيء إلى اليسار.', 'Move everything to the left-hand side.'), math: same('$x^{2}-x-2=0$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.', 'Solve.'), math: same('$x=2,\\ x=-1$') },
            { text: say('Ordeztu zuzenean.', 'Sustituye en la recta.', 'عوّض في المستقيم.', 'Substitute into the straight line.'), math: same('$(2,\\,3),\\ (-1,\\,0)$') }
        ],
        takeaway: say('Ebaki-puntuak: berdindu bi adierazpenak. Δ-k esaten du ebakitzailea, ukitzailea ala kanpokoa den.', 'Cortes: iguala las dos expresiones. Δ dice si es secante, tangente o exterior.', 'التقاطع: ساوِ بين العبارتين. Δ يحدد إن كان قاطعًا أو مماسًا أو خارجيًا.', 'Intersections: set the two expressions equal. Δ tells you whether the straight line is a secant, a tangent or misses the parabola.'),
        figure: (language) => <LineParabolaFigure language={language} />
    },

    /* ---------- 4. Absolute value ---------- */
    {
        id: 'absolute-linear',
        stage: 'absolute',
        figureAfterSteps: true,
        title: say('Zuzen baten balio absolutua', 'Valor absoluto de una recta', 'القيمة المطلقة لمستقيم', 'Absolute value of a straight line'),
        goal: say('$y=|mx+n|$ funtzioak marraztea zuzenaren zati negatiboa islatuta, eta $|x-a|=b$ bezalako ekuazioak ebaztea.', 'Dibujar funciones $y=|mx+n|$ reflejando la parte negativa de la recta y resolver ecuaciones como $|x-a|=b$.', 'رسم دوال $y=|mx+n|$ بعكس الجزء السالب من المستقيم، وحل معادلات مثل $|x-a|=b$.', 'Draw functions $y=|mx+n|$ by reflecting the negative part of the straight line, and solve equations such as $|x-a|=b$.'),
        problem: say('$y=|x-2|$ izanik, kalkulatu $f(0)$ eta $f(5)$. Non dago erpina?', 'Siendo $y=|x-2|$, calcula $f(0)$ y $f(5)$. ¿Dónde está el pico?', 'إذا كان $y=|x-2|$ فاحسب $f(0)$ و$f(5)$. أين الرأس؟', 'Given $y=|x-2|$, work out $f(0)$ and $f(5)$. Where is the peak?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu eta kendu zeinua.', 'Sustituye y quita el signo.', 'عوّض واحذف الإشارة.', 'Substitute and remove the sign.'), math: same('$f(0)=|-2|=2$') },
            { text: say('Positiboa da: ez da aldatzen.', 'Es positivo: no cambia.', 'موجب: لا يتغير.', 'It is positive: it does not change.'), math: same('$f(5)=|3|=3$') },
            { text: say('Barrukoa 0.', 'Lo de dentro, 0.', 'ما بالداخل يساوي 0.', 'The expression inside is 0.'), math: same('$x-2=0\\ \\to\\ (2,\\,0)$') }
        ],
        takeaway: say('|f(x)|: ardatzaren azpiko zatia gora islatzen da. Erpina barrukoa 0 den lekuan.', '|f(x)|: lo que está bajo el eje se refleja hacia arriba. El pico, donde lo de dentro vale 0.', '|f(x)|: ما تحت المحور ينعكس إلى الأعلى. والرأس حيث يساوي ما بالداخل 0.', '|f(x)|: whatever is below the x-axis is reflected upwards. The peak is where the expression inside is 0.'),
        figure: (language) => <AbsLinearFigure language={language} />
    },
    {
        id: 'absolute-pieces',
        stage: 'absolute',
        figureAfterSteps: true,
        title: say('Balio absolutua zatika', 'El valor absoluto a trozos', 'القيمة المطلقة على أجزاء', 'Absolute value as a piecewise function'),
        goal: say('Balio absolutua duen funtzio bat zatika definitutako funtzio gisa idaztea, barrukoaren zeinua aztertuta.', 'Escribir una función con valor absoluto como una función definida a trozos, estudiando el signo de lo de dentro.', 'كتابة دالة فيها قيمة مطلقة دالةً معرّفة على أجزاء بدراسة إشارة ما بالداخل.', 'Write a function with an absolute value as a piecewise function, by studying the sign of the expression inside.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'piecewise', title: { eu: 'Zatika definitutako funtzioak', es: 'Funciones definidas a trozos', en: 'Piecewise functions', ar: 'الدوال المعرّفة على أجزاء' } }
        ],
        problem: say('Idatzi $y=|2x-4|$ zatika eta kalkulatu $f(-1)$.', 'Escribe $y=|2x-4|$ a trozos y calcula $f(-1)$.', 'اكتب $y=|2x-4|$ على أجزاء واحسب $f(-1)$.', 'Write $y=|2x-4|$ as a piecewise function and work out $f(-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrukoaren erroa.', 'La raíz de lo de dentro.', 'جذر ما بالداخل.', 'The root of the expression inside.'), math: same('$2x-4=0\\ \\to\\ x=2$') },
            { text: say('$x<2$: negatiboa, aldatu zeinua.', '$x<2$: negativo, cambia el signo.', '$x<2$: سالب، غيّر الإشارة.', '$x<2$: negative, so the sign changes.'), math: same('$y=-2x+4$') },
            { text: say('$x\\ge 2$: utzi den bezala.', '$x\\ge 2$: déjalo igual.', '$x\\ge 2$: اتركه كما هو.', '$x\\ge 2$: leave it as it is.'), math: same('$y=2x-4$') },
            { text: say('$-1<2$: lehen zatia.', '$-1<2$: primer trozo.', '$-1<2$: الجزء الأول.', '$-1<2$: first piece.'), math: same('$f(-1)=2+4=6$') }
        ],
        takeaway: say('Zatika: barrukoaren erroek banatzen dute. Negatiboa den zatian, aldatu zeinua.', 'A trozos: las raíces de lo de dentro separan. En el trozo negativo, cambia el signo.', 'على أجزاء: جذور ما بالداخل تفصل. في الجزء السالب غيّر الإشارة.', 'Piecewise: the roots of the expression inside separate the pieces. On the negative piece, change the sign.'),
        figure: (language) => <AbsPiecesFigure language={language} />
    },
    {
        id: 'absolute-quadratic',
        stage: 'absolute',
        title: say('Parabola baten balio absolutua', 'Valor absoluto de una parábola', 'القيمة المطلقة لقطع مكافئ', 'Absolute value of a parabola'),
        goal: say('$y=|ax^{2}+bx+c|$ funtzioak marraztea eta haien maximo eta minimoak aurkitzea.', 'Dibujar funciones $y=|ax^{2}+bx+c|$ y encontrar sus máximos y mínimos.', 'رسم دوال $y=|ax^{2}+bx+c|$ وإيجاد قيمها العظمى والصغرى.', 'Draw functions $y=|ax^{2}+bx+c|$ and find their maximum and minimum points.'),
        problem: say('Kalkulatu $y=|x^{2}-2x-3|$ funtzioaren maximo erlatiboa.', 'Halla el máximo relativo de $y=|x^{2}-2x-3|$.', 'أوجد القيمة العظمى النسبية لـ $y=|x^{2}-2x-3|$.', 'Find the local maximum of $y=|x^{2}-2x-3|$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barruko parabolaren ebaki-puntuak.', 'Cortes de la parábola de dentro.', 'تقاطعات القطع الداخلي.', 'The crossing points of the parabola inside.'), math: same('$x=-1,\\ x=3$') },
            { text: say('Erpina, tartean.', 'El vértice, entre ellos.', 'الرأس بينهما.', 'The vertex, between them.'), math: same('$x_v=1,\\ y_v=-4$') },
            { text: say('Gora islatzen da.', 'Se refleja hacia arriba.', 'ينعكس إلى الأعلى.', 'It is reflected upwards.'), math: same('$(1,\\,-4)\\ \\to\\ (1,\\,4)$') }
        ],
        takeaway: say('Parabola: ebaki-puntuen arteko zatia islatzen da, eta erpina maximo erlatibo bihurtzen da.', 'Parábola: se refleja el trozo entre los cortes, y el vértice se convierte en máximo relativo.', 'القطع المكافئ: ينعكس الجزء بين نقطتي التقاطع ويصير الرأس قيمة عظمى نسبية.', 'Parabola: reflect the part between the crossing points, and the vertex becomes a local maximum.'),
        figure: (language) => <AbsQuadraticFigure language={language} />
    },

    /* ---------- 5. Rational functions ---------- */
    {
        id: 'inverse',
        stage: 'rational',
        title: say('Alderantzizko proportzionaltasuna: $y=\\frac{k}{x}$', 'Proporcionalidad inversa: $y=\\frac{k}{x}$', 'التناسب العكسي: $y=\\frac{k}{x}$', 'Inverse proportion: $y=\\frac{k}{x}$'),
        goal: say('$y=\\frac{k}{x}$ hiperbolak ezagutzea: $k$ puntu batetik kalkulatzea, adarren koadranteak eta asintotak.', 'Conocer las hipérbolas $y=\\frac{k}{x}$: calcular $k$ a partir de un punto, los cuadrantes de las ramas y las asíntotas.', 'التعرف إلى القطوع الزائدة $y=\\frac{k}{x}$: حساب $k$ من نقطة، وأرباع الفرعين، والمقاربين.', 'Know the hyperbolas $y=\\frac{k}{x}$: work out $k$ from a point, the quadrants of the branches and the asymptotes.'),
        needs: [
            { unit: 'dbh3/proporcionalidad', topic: 'inverse', title: { eu: 'Alderantzizko proportzionaltasuna', es: 'Proporcionalidad inversa', en: 'Inverse proportion', ar: 'التناسب العكسي' } }
        ],
        problem: say('$y=\\frac{k}{x}$ hiperbola $(2,\\,-3)$ puntutik pasatzen da. Kalkulatu $k$ eta $f(-1)$.', 'La hipérbola $y=\\frac{k}{x}$ pasa por $(2,\\,-3)$. Halla $k$ y $f(-1)$.', 'يمر القطع الزائد $y=\\frac{k}{x}$ بـ $(2,\\,-3)$. أوجد $k$ و$f(-1)$.', 'The hyperbola $y=\\frac{k}{x}$ passes through $(2,\\,-3)$. Find $k$ and $f(-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu koordenatuak.', 'Multiplica las coordenadas.', 'اضرب الإحداثيين.', 'Multiply the coordinates.'), math: same('$k=2\\cdot(-3)=-6$') },
            { text: say('$k<0$: II. eta IV. koadranteak.', '$k<0$: cuadrantes II y IV.', '$k<0$: الربعان الثاني والرابع.', '$k<0$: quadrants II and IV.'), math: same('$f(-1)=\\frac{-6}{-1}=6$') }
        ],
        takeaway: say('y = k/x: biderkadura konstantea. k > 0, I. eta III.; k < 0, II. eta IV. Asintotak: ardatzak.', 'y = k/x: producto constante. k > 0, I y III; k < 0, II y IV. Asíntotas: los ejes.', 'y = k/x: حاصل ضرب ثابت. k > 0 الأول والثالث؛ k < 0 الثاني والرابع. المقاربان: المحوران.', 'y = k/x: constant product. k > 0, I and III; k < 0, II and IV. Asymptotes: the axes.'),
        figure: (language) => <HyperbolaFigure language={language} />
    },
    {
        id: 'hyperbola-shift',
        stage: 'rational',
        title: say('Hiperbolen lekualdaketak', 'Traslaciones de hipérbolas', 'انسحابات القطوع الزائدة', 'Translations of hyperbolas'),
        goal: say('$y=\\frac{k}{x-a}+b$ funtzioen asintotak, izate-eremua eta ibiltartea irakurtzea eta haien grafikoak marraztea.', 'Leer las asíntotas, el dominio y el recorrido de las funciones $y=\\frac{k}{x-a}+b$ y dibujar sus gráficas.', 'قراءة المقاربين والمجال والمدى للدوال $y=\\frac{k}{x-a}+b$ ورسمها.', 'Read the asymptotes, the domain and the range of the functions $y=\\frac{k}{x-a}+b$, and draw their graphs.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'rational-domain', title: { eu: 'Zatikien izate-eremua', es: 'Dominio de las fracciones', en: 'Domain of fractions', ar: 'مجال الكسور' } }
        ],
        problem: say('Idatzi $y=\\frac{2}{x+1}-3$ funtzioaren asintotak eta Y ardatzarekin duen ebaki-puntua.', 'Escribe las asíntotas de $y=\\frac{2}{x+1}-3$ y su corte con el eje Y.', 'اكتب مقاربي $y=\\frac{2}{x+1}-3$ وتقاطعه مع محور Y.', 'Write the asymptotes of $y=\\frac{2}{x+1}-3$ and where it crosses the y-axis.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea 0: asintota bertikala.', 'Denominador 0: asíntota vertical.', 'المقام 0: المقارب الرأسي.', 'Denominator = 0: vertical asymptote.'), math: same('$x=-1$') },
            { text: say('Kanpoko gaia: asintota horizontala.', 'El término de fuera: asíntota horizontal.', 'الحد الخارجي: المقارب الأفقي.', 'The term outside the fraction: horizontal asymptote.'), math: same('$y=-3$') },
            { text: say('Y ardatza: $x=0$.', 'Eje Y: $x=0$.', 'محور Y: $x=0$.', 'y-axis: $x=0$.'), math: same('$f(0)=2-3=-1$') }
        ],
        takeaway: say('Asintotak: x = a eta y = b. Dom = ℝ − {a}, Rec = ℝ − {b}.', 'Asíntotas: x = a e y = b. Dom = ℝ − {a}, Rec = ℝ − {b}.', 'المقاربان: x = a وy = b. Dom = ℝ − {a}، Rec = ℝ − {b}.', 'Asymptotes: x = a and y = b. Domain = ℝ − {a}, Range = ℝ − {b}.'),
        figure: (language) => <ShiftedHyperbolaFigure language={language} />
    },
    {
        id: 'rational-form',
        stage: 'rational',
        figureAfterSteps: true,
        title: say('$y=\\frac{ax+b}{cx+d}$ funtzioak', 'Funciones $y=\\frac{ax+b}{cx+d}$', 'الدوال $y=\\frac{ax+b}{cx+d}$', 'Functions $y=\\frac{ax+b}{cx+d}$'),
        goal: say('Funtzio arrazional bat zatiketaren bidez $\\frac{k}{x-a}+b$ forman idaztea eta haren asintotak aurkitzea.', 'Escribir una función racional como $\\frac{k}{x-a}+b$ mediante la división y encontrar sus asíntotas.', 'كتابة دالة كسرية على صورة $\\frac{k}{x-a}+b$ بالقسمة، وإيجاد مقاربيها.', 'Write a rational function as $\\frac{k}{x-a}+b$ by division, and find its asymptotes.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'long-division', title: { eu: 'Polinomioen zatiketa', es: 'División de polinomios', en: 'Polynomial division', ar: 'قسمة الحدوديات' } }
        ],
        problem: say('Kalkulatu $y=\\frac{2x+1}{x-1}$ funtzioaren asintotak.', 'Halla las asíntotas de $y=\\frac{2x+1}{x-1}$.', 'أوجد مقاربي $y=\\frac{2x+1}{x-1}$.', 'Find the asymptotes of $y=\\frac{2x+1}{x-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu: zatidura 2, hondarra 3.', 'Divide: cociente 2, resto 3.', 'اقسم: الناتج 2 والباقي 3.', 'Divide: quotient 2, remainder 3.'), math: same('$y=2+\\frac{3}{x-1}$') },
            { text: say('Asintota bertikala.', 'Asíntota vertical.', 'المقارب الرأسي.', 'Vertical asymptote.'), math: same('$x=1$') },
            { text: say('Asintota horizontala.', 'Asíntota horizontal.', 'المقارب الأفقي.', 'Horizontal asymptote.'), math: same('$y=2$') }
        ],
        takeaway: say('Zatitu eta hiperbola lekualdatua agertzen da. Bertikala: izendatzailea 0. Horizontala: a/c.', 'Divide y aparece una hipérbola trasladada. Vertical: denominador 0. Horizontal: a/c.', 'اقسم فيظهر قطع زائد مسحوب. الرأسي: المقام 0. الأفقي: a/c.', 'Divide, and a translated hyperbola appears. Vertical: denominator = 0. Horizontal: a/c.'),
        figure: (language) => <RationalFormFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const polynomialAkTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...polynomialAkLessonTexts[topic.id as PolynomialAkTopicId], ...polynomialAkLessonChecks[topic.id as PolynomialAkTopicId] }))
