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

export const polynomialAkTopics: UnitTopic[] = [
    /* ---------- 1. Linear functions ---------- */
    {
        id: 'line-kinds',
        stage: 'lines',
        title: say('Funtzio linealak, proportzionalak eta konstanteak', 'Funciones lineales, de proporcionalidad y constantes', 'الدوال الخطية والتناسبية والثابتة', 'Linear, proportional and constant functions'),
        goal: say('$y=mx+n$ funtzio mota bereiztea, $m$ eta $n$ irakurtzea eta zuzena bi punturekin marraztea.', 'Distinguir los tipos de función $y=mx+n$, leer $m$ y $n$ y dibujar la recta con dos puntos.', 'التمييز بين أنواع الدالة $y=mx+n$، وقراءة $m$ و$n$، ورسم المستقيم بنقطتين.', 'Recognise the types of function $y=mx+n$, read $m$ and $n$, and draw a straight line through two points.'),
        explanation: say(
            'Lehen mailako polinomio baten grafikoa zuzen bat da: $y=mx+n$. $m$ malda da (zuzenaren inklinazioa) eta $n$ jatorriko ordenatua (zuzenak Y ardatza $(0,\\,n)$ puntuan ebakitzen du). Hiru kasu daude. $n=0$ bada, $y=mx$ proportzionaltasun zuzeneko funtzioa da, eta zuzenak jatorritik pasatzen da: adibidez, kilo bakoitza 2 € bada, $y=2x$. $m\\ne 0$ eta $n\\ne 0$ badira, funtzio lineala (afina) da: taxi batek 3 € hartzen baditu hasieran eta 1,2 € km bakoitzeko, $y=1{,}2x+3$. $m=0$ bada, $y=n$ funtzio konstantea da, X ardatzaren zuzen paraleloa. Zuzen bat marrazteko nahikoa da bi puntu: kalkulatu, adibidez, $f(0)$ eta beste irudi bat.',
            'La gráfica de un polinomio de primer grado es una recta: $y=mx+n$. $m$ es la pendiente (la inclinación de la recta) y $n$ la ordenada en el origen (la recta corta al eje Y en el punto $(0,\\,n)$). Hay tres casos. Si $n=0$, $y=mx$ es una función de proporcionalidad directa y la recta pasa por el origen: si cada kilo cuesta 2 €, $y=2x$. Si $m\\ne 0$ y $n\\ne 0$, es una función lineal (afín): un taxi que cobra 3 € al subir y 1,2 € por km da $y=1{,}2x+3$. Si $m=0$, $y=n$ es una función constante, una recta paralela al eje X. Para dibujar una recta bastan dos puntos: calcula, por ejemplo, $f(0)$ y otra imagen.',
            'رسم كثير حدود من الدرجة الأولى مستقيم: $y=mx+n$. $m$ هو الميل (انحدار المستقيم) و$n$ الجزء المقطوع من محور Y (يقطع المستقيم محور Y في النقطة $(0,\\,n)$). هناك ثلاث حالات. إذا كان $n=0$ فإن $y=mx$ دالة تناسب طردي ويمر المستقيم بالأصل: إذا كان ثمن الكيلوغرام 2 € فإن $y=2x$. وإذا كان $m\\ne 0$ و$n\\ne 0$ فهي دالة خطية (تآلفية): سيارة أجرة تأخذ 3 € عند الركوب و1.2 € لكل كم تعطي $y=1{,}2x+3$. وإذا كان $m=0$ فإن $y=n$ دالة ثابتة، مستقيم يوازي محور X. يكفي لرسم المستقيم نقطتان: احسب مثلًا $f(0)$ وصورة أخرى.', 'The graph of a first-degree polynomial is a straight line: $y=mx+n$. $m$ is the slope (how steep the straight line is) and $n$ is the y-intercept (the straight line crosses the y-axis at the point $(0,\\,n)$). There are three cases. If $n=0$, $y=mx$ is a direct proportion function and the straight line passes through the origin: if each kilo costs €2, $y=2x$. If $m\\ne 0$ and $n\\ne 0$, it is a linear (affine) function: a taxi that charges €3 for getting in and €1.2 per km gives $y=1{,}2x+3$. If $m=0$, $y=n$ is a constant function, a straight line parallel to the x-axis. To draw a straight line you only need two points: for example, work out $f(0)$ and one other value.'
        ),
        problem: say('Marraztu $y=-\\frac{1}{2}x+2$: aurkitu bi puntu.', 'Representa $y=-\\frac{1}{2}x+2$: halla dos puntos.', 'ارسم $y=-\\frac{1}{2}x+2$: أوجد نقطتين.', 'Draw $y=-\\frac{1}{2}x+2$: find two points.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x=0$: jatorriko ordenatua.', '$x=0$: la ordenada en el origen.', '$x=0$: الجزء المقطوع.', '$x=0$: the y-intercept.'), math: same('$f(0)=2\\ \\to\\ (0,\\,2)$') },
            { text: say('$x=4$ hartu, zatikia desagertzeko.', 'Toma $x=4$ para que se vaya la fracción.', 'خذ $x=4$ لتختفي الكسور.', 'Take $x=4$ so the fraction cancels out.'), math: same('$f(4)=-2+2=0$') },
            { text: say('Lotu $(0,\\,2)$ eta $(4,\\,0)$ puntuak.', 'Une $(0,\\,2)$ y $(4,\\,0)$.', 'صِل $(0,\\,2)$ و$(4,\\,0)$.', 'Join $(0,\\,2)$ and $(4,\\,0)$.'), math: same('$m=-\\frac{1}{2}<0$') }
        ],
        example: same('$y=mx+n$'),
        takeaway: say('Proportzionala: n = 0. Konstantea: m = 0. Bi puntu nahikoak dira zuzena marrazteko.', 'Proporcional: n = 0. Constante: m = 0. Dos puntos bastan para dibujar la recta.', 'تناسبية: n = 0. ثابتة: m = 0. تكفي نقطتان لرسم المستقيم.', 'Proportional: n = 0. Constant: m = 0. Two points are enough to draw the straight line.'),
        figure: (language) => <LineKindsFigure language={language} />
    },
    {
        id: 'slope',
        stage: 'lines',
        title: say('Malda', 'La pendiente', 'الميل', 'Slope'),
        goal: say('Bi puntutatik pasatzen den zuzenaren malda kalkulatzea eta zuzena gorakorra edo beherakorra den esatea.', 'Calcular la pendiente de la recta que pasa por dos puntos y decir si la recta es creciente o decreciente.', 'حساب ميل المستقيم المار بنقطتين، وتحديد ما إذا كان متزايدًا أو متناقصًا.', 'Work out the slope of the straight line through two points, and say whether the straight line is increasing or decreasing.'),
        explanation: say(
            'Malda zuzenak gora egiten duena da $x$ unitate bat aurreratzean. $A(x_1,\\,y_1)$ eta $B(x_2,\\,y_2)$ puntuetatik pasatzen bada, $m=\\dfrac{y_2-y_1}{x_2-x_1}$: $y$-ren aldaketa zati $x$-ren aldaketa, ordena berean. $A(1,\\,2)$ eta $B(4,\\,8)$ puntuetan, $m=\\frac{6}{3}=2$: $x$ 1 aurreratzean, $y$ 2 igotzen da. $m>0$ bada, funtzioa gorakorra da; $m<0$ bada, beherakorra; $m=0$ bada, konstantea. Zenbat eta handiagoa izan $|m|$, orduan eta zutikago zuzena. Malda zatiki bat denean, $m=\\frac{2}{3}$ adibidez, irakurri honela: 3 eskuinera, 2 gora. Bi puntuen $x$ berdina bada, zuzena bertikala da eta ez da funtzio bat.',
            'La pendiente es lo que sube la recta al avanzar una unidad en $x$. Si pasa por $A(x_1,\\,y_1)$ y $B(x_2,\\,y_2)$, $m=\\dfrac{y_2-y_1}{x_2-x_1}$: la variación de $y$ entre la variación de $x$, en el mismo orden. Con $A(1,\\,2)$ y $B(4,\\,8)$, $m=\\frac{6}{3}=2$: al avanzar 1 en $x$, $y$ sube 2. Si $m>0$ la función es creciente; si $m<0$, decreciente; si $m=0$, constante. Cuanto mayor es $|m|$, más empinada es la recta. Cuando la pendiente es una fracción, como $m=\\frac{2}{3}$, léela así: 3 a la derecha y 2 hacia arriba. Si los dos puntos tienen la misma $x$, la recta es vertical y no es una función.',
            'الميل هو مقدار صعود المستقيم عند التقدم وحدة واحدة في $x$. إذا مرّ بـ $A(x_1,\\,y_1)$ و$B(x_2,\\,y_2)$ فإن $m=\\dfrac{y_2-y_1}{x_2-x_1}$: تغير $y$ مقسومًا على تغير $x$ بالترتيب نفسه. مع $A(1,\\,2)$ و$B(4,\\,8)$ يكون $m=\\frac{6}{3}=2$: عند التقدم 1 في $x$ يصعد $y$ بمقدار 2. إذا كان $m>0$ فالدالة متزايدة؛ وإذا كان $m<0$ فمتناقصة؛ وإذا كان $m=0$ فثابتة. كلما كبر $|m|$ ازداد انحدار المستقيم. وعندما يكون الميل كسرًا مثل $m=\\frac{2}{3}$ فاقرأه هكذا: 3 إلى اليمين و2 إلى الأعلى. وإذا كان للنقطتين $x$ نفسه فالمستقيم رأسي وليس دالة.', 'The slope is how much the straight line rises when you move one unit in $x$. If it passes through $A(x_1,\\,y_1)$ and $B(x_2,\\,y_2)$, $m=\\dfrac{y_2-y_1}{x_2-x_1}$: the change in $y$ divided by the change in $x$, in the same order. With $A(1,\\,2)$ and $B(4,\\,8)$, $m=\\frac{6}{3}=2$: when you move 1 in $x$, $y$ goes up 2. If $m>0$ the function is increasing; if $m<0$, decreasing; if $m=0$, constant. The bigger $|m|$ is, the steeper the straight line. When the slope is a fraction, such as $m=\\frac{2}{3}$, read it like this: 3 to the right and 2 up. If the two points have the same $x$, the straight line is vertical and it is not a function.'
        ),
        problem: say('Kalkulatu $A(-1,\\,4)$ eta $B(3,\\,-4)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $A(-1,\\,4)$ y $B(3,\\,-4)$.', 'احسب ميل المستقيم المار بـ $A(-1,\\,4)$ و$B(3,\\,-4)$.', 'Work out the slope of the straight line through $A(-1,\\,4)$ and $B(3,\\,-4)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$y$-ren aldaketa zati $x$-ren aldaketa.', 'Variación de $y$ entre variación de $x$.', 'تغير $y$ على تغير $x$.', 'Change in $y$ divided by change in $x$.'), math: same('$m=\\frac{-4-4}{3-(-1)}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$m=\\frac{-8}{4}=-2$') },
            { text: say('Negatiboa: beherakorra.', 'Negativa: decreciente.', 'سالب: متناقصة.', 'Negative: decreasing.'), math: same('$m<0$') }
        ],
        example: same('$m=\\frac{y_2-y_1}{x_2-x_1}$'),
        takeaway: say('Malda: y-ren aldaketa zati x-ren aldaketa. Positiboa, gorakorra; negatiboa, beherakorra.', 'Pendiente: variación de y entre variación de x. Positiva, creciente; negativa, decreciente.', 'الميل: تغير y على تغير x. موجب: متزايدة؛ سالب: متناقصة.', 'Slope: change in $y$ divided by change in $x$. Positive, increasing; negative, decreasing.'),
        figure: (language) => <SlopeFigure language={language} />
    },
    {
        id: 'line-equation',
        stage: 'lines',
        title: say('Zuzenaren ekuazioa', 'La ecuación de la recta', 'معادلة المستقيم', 'The equation of the straight line'),
        goal: say('Zuzen baten ekuazioa idaztea puntu bat eta malda, bi puntu edo zuzen paralelo bat ezagututa.', 'Escribir la ecuación de una recta conociendo un punto y la pendiente, dos puntos o una recta paralela.', 'كتابة معادلة مستقيم بمعرفة نقطة والميل، أو نقطتين، أو مستقيم موازٍ.', 'Write the equation of a straight line when you know a point and the slope, two points, or a parallel straight line.'),
        explanation: say(
            '$(x_0,\\,y_0)$ puntutik pasatzen den eta $m$ malda duen zuzenaren ekuazioa puntu-malda ekuazioa da: $y-y_0=m(x-x_0)$. Gero askatu $y$ eta $y=mx+n$ forman geratzen da. Bi puntu ematen badizkigute, lehenik kalkulatu malda haiekin eta gero erabili horietako bat: $(1,\\,2)$ eta $(3,\\,8)$ puntuetan $m=3$, eta $y-2=3(x-1)$, hau da, $y=3x-1$. Bi zuzen paraleloak dira malda bera badute; beraz, $y=2x+5$ zuzenaren paraleloa den eta $(1,\\,-1)$ puntutik pasatzen den zuzena $y+1=2(x-1)$ da, $y=2x-3$. Egiaztatzeko, ordeztu puntuak lortutako ekuazioan.',
            'La ecuación de la recta que pasa por el punto $(x_0,\\,y_0)$ con pendiente $m$ es la ecuación punto-pendiente: $y-y_0=m(x-x_0)$. Después despeja $y$ y queda en la forma $y=mx+n$. Si nos dan dos puntos, primero calcula la pendiente con ellos y luego usa uno de los dos: con $(1,\\,2)$ y $(3,\\,8)$, $m=3$, e $y-2=3(x-1)$, es decir, $y=3x-1$. Dos rectas son paralelas si tienen la misma pendiente; así, la paralela a $y=2x+5$ que pasa por $(1,\\,-1)$ es $y+1=2(x-1)$, o sea $y=2x-3$. Para comprobarlo, sustituye los puntos en la ecuación obtenida.',
            'معادلة المستقيم المار بالنقطة $(x_0,\\,y_0)$ وميله $m$ هي معادلة النقطة والميل: $y-y_0=m(x-x_0)$. ثم اعزل $y$ فتصير على الصورة $y=mx+n$. وإذا أُعطيت نقطتين فاحسب الميل بهما أولًا ثم استعمل إحداهما: مع $(1,\\,2)$ و$(3,\\,8)$ يكون $m=3$ و$y-2=3(x-1)$، أي $y=3x-1$. يتوازى مستقيمان إذا كان لهما الميل نفسه؛ فالمستقيم الموازي لـ $y=2x+5$ والمار بـ $(1,\\,-1)$ هو $y+1=2(x-1)$، أي $y=2x-3$. وللتحقق عوّض النقاط في المعادلة الناتجة.', 'The equation of the straight line through the point $(x_0,\\,y_0)$ with slope $m$ is the point-slope form: $y-y_0=m(x-x_0)$. Then solve for $y$ and you get the form $y=mx+n$. If we are given two points, first work out the slope from them, then use one of the two: with $(1,\\,2)$ and $(3,\\,8)$, $m=3$, and $y-2=3(x-1)$, that is, $y=3x-1$. Two straight lines are parallel if they have the same slope, so the straight line parallel to $y=2x+5$ through $(1,\\,-1)$ is $y+1=2(x-1)$, or $y=2x-3$. To check it, substitute the points into the equation you have obtained.'
        ),
        problem: say('Idatzi $(1,\\,2)$ eta $(3,\\,8)$ puntuetatik pasatzen den zuzenaren ekuazioa.', 'Escribe la ecuación de la recta que pasa por $(1,\\,2)$ y $(3,\\,8)$.', 'اكتب معادلة المستقيم المار بـ $(1,\\,2)$ و$(3,\\,8)$.', 'Write the equation of the straight line through $(1,\\,2)$ and $(3,\\,8)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Malda.', 'La pendiente.', 'الميل.', 'The slope.'), math: same('$m=\\frac{8-2}{3-1}=3$') },
            { text: say('Puntu-malda ekuazioa.', 'Ecuación punto-pendiente.', 'معادلة النقطة والميل.', 'Point-slope form.'), math: same('$y-2=3(x-1)$') },
            { text: say('Askatu $y$.', 'Despeja $y$.', 'اعزل $y$.', 'Solve for $y$.'), math: same('$y=3x-1$') }
        ],
        example: same('$y-y_0=m(x-x_0)$'),
        takeaway: say('Puntu bat eta malda: y − y₀ = m(x − x₀). Paraleloak: malda bera.', 'Un punto y la pendiente: y − y₀ = m(x − x₀). Paralelas: la misma pendiente.', 'نقطة وميل: y − y₀ = m(x − x₀). المتوازيان: الميل نفسه.', 'One point and the slope: y − y₀ = m(x − x₀). Parallel lines: the same slope.'),
        figure: (language) => <LineEquationFigure language={language} />
    },

    /* ---------- 2. Quadratic functions ---------- */
    {
        id: 'parabola-a',
        stage: 'parabolas',
        title: say('$y=ax^{2}$ parabolak', 'Las parábolas $y=ax^{2}$', 'القطوع المكافئة $y=ax^{2}$', 'The parabolas $y=ax^{2}$'),
        goal: say('$a$ koefizienteak parabolaren forman duen eragina ulertzea: irekiera, norabidea eta erpina.', 'Entender cómo influye el coeficiente $a$ en la forma de la parábola: abertura, orientación y vértice.', 'فهم أثر المعامل $a$ في شكل القطع المكافئ: الانفتاح والاتجاه والرأس.', 'Understand how the coefficient $a$ affects the shape of the parabola: how wide it is, which way it opens, and its vertex.'),
        explanation: say(
            'Bigarren mailako polinomio baten grafikoa parabola bat da. Errazena $y=ax^{2}$ da: erpina $(0,\\,0)$ puntuan du eta Y ardatza simetria-ardatz du, $f(-x)=f(x)$ delako. $a>0$ bada, adarrak gora doaz eta erpina minimoa da; $a<0$ bada, adarrak behera doaz eta erpina maximoa da. $|a|$ zenbat eta handiagoa izan, orduan eta itxiagoa parabola: $y=3x^{2}$ itxiagoa da $y=x^{2}$ baino, eta $y=\\frac{1}{2}x^{2}$ irekiagoa. Balio-taula egiteko, hartu $x$-ren balio simetrikoak: $y=2x^{2}$ funtzioan, $x=\\pm 1$ denean $y=2$ eta $x=\\pm 2$ denean $y=8$.',
            'La gráfica de un polinomio de segundo grado es una parábola. La más sencilla es $y=ax^{2}$: tiene el vértice en $(0,\\,0)$ y el eje Y como eje de simetría, porque $f(-x)=f(x)$. Si $a>0$, las ramas van hacia arriba y el vértice es un mínimo; si $a<0$, las ramas van hacia abajo y el vértice es un máximo. Cuanto mayor es $|a|$, más cerrada es la parábola: $y=3x^{2}$ es más cerrada que $y=x^{2}$, e $y=\\frac{1}{2}x^{2}$ más abierta. Para la tabla de valores, toma valores de $x$ simétricos: en $y=2x^{2}$, para $x=\\pm 1$ sale $y=2$ y para $x=\\pm 2$ sale $y=8$.',
            'رسم كثير حدود من الدرجة الثانية قطع مكافئ. أبسطه $y=ax^{2}$: رأسه في $(0,\\,0)$ ومحور تماثله محور Y لأن $f(-x)=f(x)$. إذا كان $a>0$ يتجه الفرعان إلى الأعلى ويكون الرأس قيمة صغرى؛ وإذا كان $a<0$ يتجهان إلى الأسفل ويكون الرأس قيمة عظمى. كلما كبر $|a|$ ضاق القطع: $y=3x^{2}$ أضيق من $y=x^{2}$، و$y=\\frac{1}{2}x^{2}$ أوسع. ولجدول القيم خذ قيمًا متماثلة لـ $x$: في $y=2x^{2}$ يكون $y=2$ عند $x=\\pm 1$ و$y=8$ عند $x=\\pm 2$.', 'The graph of a second-degree polynomial is a parabola. The simplest one is $y=ax^{2}$: it has its vertex at $(0,\\,0)$ and the y-axis as its axis of symmetry, because $f(-x)=f(x)$. If $a>0$, the arms point upwards and the vertex is a minimum; if $a<0$, the arms point downwards and the vertex is a maximum. The bigger $|a|$ is, the narrower the parabola: $y=3x^{2}$ is narrower than $y=x^{2}$, and $y=\\frac{1}{2}x^{2}$ is wider. For the table of values, choose symmetric values of $x$: for $y=2x^{2}$, when $x=\\pm 1$ we get $y=2$, and when $x=\\pm 2$ we get $y=8$.'
        ),
        problem: say('Kalkulatu $y=3x^{2}$ eta $y=-\\frac{1}{2}x^{2}$ funtzioen balioa $x=2$ puntuan. Zein dago behera irekita?', 'Calcula el valor de $y=3x^{2}$ y de $y=-\\frac{1}{2}x^{2}$ en $x=2$. ¿Cuál se abre hacia abajo?', 'احسب قيمة $y=3x^{2}$ و$y=-\\frac{1}{2}x^{2}$ عند $x=2$. أيهما مفتوح إلى الأسفل؟', 'Work out the value of $y=3x^{2}$ and of $y=-\\frac{1}{2}x^{2}$ at $x=2$. Which one opens downwards?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoa: $a=3>0$, gora.', 'La primera: $a=3>0$, hacia arriba.', 'الأولى: $a=3>0$، إلى الأعلى.', 'The first: $a=3>0$, opens upwards.'), math: same('$3\\cdot 2^{2}=12$') },
            { text: say('Bigarrena: $a<0$, behera.', 'La segunda: $a<0$, hacia abajo.', 'الثانية: $a<0$، إلى الأسفل.', 'The second: $a<0$, opens downwards.'), math: same('$-\\frac{1}{2}\\cdot 2^{2}=-2$') }
        ],
        example: same('$y=ax^{2}$'),
        takeaway: say('a > 0: gora eta minimoa. a < 0: behera eta maximoa. |a| handiagoa: itxiagoa.', 'a > 0: hacia arriba y mínimo. a < 0: hacia abajo y máximo. |a| mayor: más cerrada.', 'a > 0: إلى الأعلى وقيمة صغرى. a < 0: إلى الأسفل وقيمة عظمى. |a| أكبر: أضيق.', 'a > 0: upwards and a minimum. a < 0: downwards and a maximum. Bigger |a|: narrower.'),
        figure: (language) => <ParabolaShapesFigure language={language} />
    },
    {
        id: 'vertex',
        stage: 'parabolas',
        title: say('Erpina eta simetria-ardatza', 'Vértice y eje de simetría', 'الرأس ومحور التماثل', 'Vertex and axis of symmetry'),
        goal: say('$y=ax^{2}+bx+c$ parabolaren erpina kalkulatzea, maximoa ala minimoa den esatea eta ibiltartea idaztea.', 'Calcular el vértice de la parábola $y=ax^{2}+bx+c$, decir si es máximo o mínimo y escribir el recorrido.', 'حساب رأس القطع $y=ax^{2}+bx+c$، وتحديد ما إذا كان عظمى أو صغرى، وكتابة المدى.', 'Work out the vertex of the parabola $y=ax^{2}+bx+c$, say whether it is a maximum or a minimum, and write the range.'),
        explanation: say(
            '$y=ax^{2}+bx+c$ parabola $y=ax^{2}$ bera da, beste leku batera eramanda: forma bera du ($a$-k erabakitzen du), baina erpina beste puntu batean dago. Erpinaren abzisa $x_v=\\dfrac{-b}{2a}$ da, eta ordenatua irudia kalkulatuta lortzen da: $y_v=f(x_v)$. $y=x^{2}-4x+3$ funtzioan $x_v=\\frac{4}{2}=2$ eta $y_v=4-8+3=-1$: $V(2,\\,-1)$. Simetria-ardatza $x=x_v$ zuzen bertikala da: erpinetik distantzia berera dauden puntuek irudi bera dute. $a>0$ bada, erpina minimoa da eta ibiltartea $[y_v,\\,+\\infty)$; $a<0$ bada, maximoa da eta ibiltartea $(-\\infty,\\,y_v]$. Problemetan erpinak ematen du balio handiena edo txikiena: altuera maximoa, etekin handiena, azalera maximoa…',
            'La parábola $y=ax^{2}+bx+c$ es la misma $y=ax^{2}$ llevada a otro sitio: tiene la misma forma (la decide $a$), pero el vértice está en otro punto. La abscisa del vértice es $x_v=\\dfrac{-b}{2a}$, y la ordenada sale de calcular la imagen: $y_v=f(x_v)$. En $y=x^{2}-4x+3$, $x_v=\\frac{4}{2}=2$ e $y_v=4-8+3=-1$: $V(2,\\,-1)$. El eje de simetría es la recta vertical $x=x_v$: los puntos a la misma distancia del vértice tienen la misma imagen. Si $a>0$, el vértice es un mínimo y el recorrido es $[y_v,\\,+\\infty)$; si $a<0$, es un máximo y el recorrido es $(-\\infty,\\,y_v]$. En los problemas el vértice da el valor mayor o menor: la altura máxima, el beneficio mayor, el área máxima…',
            'القطع $y=ax^{2}+bx+c$ هو القطع $y=ax^{2}$ نفسه منقولًا إلى مكان آخر: له الشكل نفسه (يحدده $a$) لكن رأسه في نقطة أخرى. الإحداثي السيني للرأس $x_v=\\dfrac{-b}{2a}$، والصادي يأتي من حساب الصورة: $y_v=f(x_v)$. في $y=x^{2}-4x+3$ يكون $x_v=\\frac{4}{2}=2$ و$y_v=4-8+3=-1$: $V(2,\\,-1)$. محور التماثل هو المستقيم الرأسي $x=x_v$: النقاط التي على البعد نفسه من الرأس لها الصورة نفسها. إذا كان $a>0$ فالرأس قيمة صغرى والمدى $[y_v,\\,+\\infty)$؛ وإذا كان $a<0$ فهو قيمة عظمى والمدى $(-\\infty,\\,y_v]$. في المسائل يعطي الرأس القيمة الكبرى أو الصغرى: أقصى ارتفاع، أكبر ربح، أكبر مساحة…', 'The parabola $y=ax^{2}+bx+c$ is the same $y=ax^{2}$ moved to another place: it has the same shape (decided by $a$), but its vertex is at a different point. The x-coordinate of the vertex is $x_v=\\dfrac{-b}{2a}$, and the y-coordinate comes from working out the value of the function: $y_v=f(x_v)$. For $y=x^{2}-4x+3$, $x_v=\\frac{4}{2}=2$ and $y_v=4-8+3=-1$: $V(2,\\,-1)$. The axis of symmetry is the vertical straight line $x=x_v$: points the same distance from the vertex have the same y-value. If $a>0$, the vertex is a minimum and the range is $[y_v,\\,+\\infty)$; if $a<0$, it is a maximum and the range is $(-\\infty,\\,y_v]$. In problems, the vertex gives the greatest or smallest value: the maximum height, the greatest profit, the maximum area…'
        ),
        problem: say('Kalkulatu $y=-x^{2}+4x+1$ parabolaren erpina. Maximoa ala minimoa da?', 'Calcula el vértice de $y=-x^{2}+4x+1$. ¿Es máximo o mínimo?', 'احسب رأس $y=-x^{2}+4x+1$. هل هو عظمى أم صغرى؟', 'Work out the vertex of $y=-x^{2}+4x+1$. Is it a maximum or a minimum?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Abzisa: $a=-1$, $b=4$.', 'Abscisa: $a=-1$, $b=4$.', 'الإحداثي السيني: $a=-1$، $b=4$.', 'x-coordinate: $a=-1$, $b=4$.'), math: same('$x_v=\\frac{-4}{-2}=2$') },
            { text: say('Ordenatua: irudia.', 'Ordenada: la imagen.', 'الإحداثي الصادي: الصورة.', 'y-coordinate: the value of the function.'), math: same('$y_v=-4+8+1=5$') },
            { text: say('$a<0$: $V(2,\\,5)$ maximoa da.', '$a<0$: $V(2,\\,5)$ es un máximo.', '$a<0$: $V(2,\\,5)$ قيمة عظمى.', '$a<0$: $V(2,\\,5)$ is a maximum.'), math: same('$\\text{Rec}\\,f=(-\\infty,\\,5]$') }
        ],
        example: same('$x_v=\\frac{-b}{2a}$'),
        takeaway: say('Erpina: x = −b/2a eta gero haren irudia. a-ren zeinuak esaten du maximoa ala minimoa den.', 'Vértice: x = −b/2a y luego su imagen. El signo de a dice si es máximo o mínimo.', 'الرأس: x = −b/2a ثم صورته. إشارة a تحدد العظمى أو الصغرى.', 'Vertex: x = −b/2a, then its value. The sign of a tells you whether it is a maximum or a minimum.'),
        figure: (language) => <VertexFigure language={language} />
    },
    {
        id: 'parabola-cuts',
        stage: 'parabolas',
        title: say('Ebaki-puntuak eta grafikoa', 'Puntos de corte y gráfica', 'نقاط التقاطع والرسم', 'Intercepts and graph'),
        goal: say('Parabolak ardatzekin dituen ebaki-puntuak kalkulatzea, zenbat diren diskriminatzailearekin jakitea eta grafikoa osatzea.', 'Calcular los puntos de corte de una parábola con los ejes, saber cuántos hay con el discriminante y completar la gráfica.', 'حساب نقاط تقاطع القطع المكافئ مع المحورين، ومعرفة عددها بالمميز، وإكمال الرسم.', 'Work out where a parabola crosses the axes, use the discriminant to see how many crossing points there are, and complete the graph.'),
        explanation: say(
            'Y ardatzarekin ebaki-puntua beti dago eta $x=0$ eginda lortzen da: $(0,\\,c)$. X ardatzarekin ebaki-puntuak $ax^{2}+bx+c=0$ ekuazioaren soluzioak dira, eta diskriminatzaileak, $\\Delta=b^{2}-4ac$, esaten du zenbat dauden: $\\Delta>0$ bada, bi; $\\Delta=0$ bada, bat (erpina ardatzaren gainean dago); $\\Delta<0$ bada, bat ere ez (parabola osoa ardatzaren gainetik edo azpitik dago). Parabola bat ondo marrazteko: 1) erpina, 2) ebaki-puntuak, 3) erpinaren bi aldeetako puntu batzuk, simetria aprobetxatuz. $y=x^{2}-2x-8$ funtzioan: $V(1,\\,-9)$, Y ardatza $(0,\\,-8)$ puntuan eta X ardatza $x=4$ eta $x=-2$ puntuetan; $(0,\\,-8)$ puntuaren bikia $(2,\\,-8)$ da.',
            'El corte con el eje Y siempre existe y se obtiene haciendo $x=0$: $(0,\\,c)$. Los cortes con el eje X son las soluciones de $ax^{2}+bx+c=0$, y el discriminante, $\\Delta=b^{2}-4ac$, dice cuántos hay: si $\\Delta>0$, dos; si $\\Delta=0$, uno (el vértice está sobre el eje); si $\\Delta<0$, ninguno (toda la parábola queda por encima o por debajo del eje). Para dibujar bien una parábola: 1) el vértice, 2) los puntos de corte, 3) algunos puntos a los dos lados del vértice, aprovechando la simetría. En $y=x^{2}-2x-8$: $V(1,\\,-9)$, eje Y en $(0,\\,-8)$ y eje X en $x=4$ y $x=-2$; la pareja simétrica de $(0,\\,-8)$ es $(2,\\,-8)$.',
            'التقاطع مع محور Y موجود دائمًا ونحصل عليه بجعل $x=0$: $(0,\\,c)$. أما التقاطعات مع محور X فهي حلول $ax^{2}+bx+c=0$، والمميز $\\Delta=b^{2}-4ac$ يحدد عددها: إذا كان $\\Delta>0$ فاثنتان؛ وإذا كان $\\Delta=0$ فواحدة (الرأس على المحور)؛ وإذا كان $\\Delta<0$ فلا شيء (يبقى القطع كله فوق المحور أو تحته). لرسم القطع جيدًا: 1) الرأس، 2) نقاط التقاطع، 3) بعض النقاط على جانبي الرأس مستفيدًا من التماثل. في $y=x^{2}-2x-8$: $V(1,\\,-9)$، ومحور Y عند $(0,\\,-8)$، ومحور X عند $x=4$ و$x=-2$؛ ونظيرة $(0,\\,-8)$ هي $(2,\\,-8)$.', 'The crossing point with the y-axis always exists and is found by setting $x=0$: $(0,\\,c)$. The crossing points with the x-axis are the solutions of $ax^{2}+bx+c=0$, and the discriminant, $\\Delta=b^{2}-4ac$, tells you how many there are: if $\\Delta>0$, two; if $\\Delta=0$, one (the vertex is on the x-axis); if $\\Delta<0$, none (the whole parabola is above or below the x-axis). To draw a parabola well: 1) the vertex, 2) the crossing points, 3) some points on either side of the vertex, using the symmetry. For $y=x^{2}-2x-8$: $V(1,\\,-9)$; it crosses the y-axis at $(0,\\,-8)$ and the x-axis at $x=4$ and $x=-2$; the symmetric partner of $(0,\\,-8)$ is $(2,\\,-8)$.'
        ),
        problem: say('Kalkulatu $y=x^{2}-2x-8$ parabolak ardatzekin dituen ebaki-puntuak.', 'Halla los puntos de corte de $y=x^{2}-2x-8$ con los ejes.', 'أوجد نقاط تقاطع $y=x^{2}-2x-8$ مع المحورين.', 'Find where $y=x^{2}-2x-8$ crosses the axes.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatza: $x=0$.', 'Eje Y: $x=0$.', 'محور Y: $x=0$.', 'y-axis: $x=0$.'), math: same('$(0,\\,-8)$') },
            { text: say('X ardatza: diskriminatzailea.', 'Eje X: el discriminante.', 'محور X: المميز.', 'x-axis: the discriminant.'), math: same('$\\Delta=4+32=36>0$') },
            { text: say('Bi soluzio.', 'Dos soluciones.', 'حلّان.', 'Two solutions.'), math: same('$x=\\frac{2\\pm 6}{2}$') },
            { text: say('Ebaki-puntuak.', 'Los cortes.', 'نقاط التقاطع.', 'The crossing points.'), math: same('$(4,\\,0),\\ (-2,\\,0)$') }
        ],
        example: same('$\\Delta=b^{2}-4ac$'),
        takeaway: say('Y ardatza: (0, c). X ardatza: ebatzi ekuazioa. Δ > 0 bi, Δ = 0 bat, Δ < 0 bat ere ez.', 'Eje Y: (0, c). Eje X: resuelve la ecuación. Δ > 0 dos, Δ = 0 uno, Δ < 0 ninguno.', 'محور Y: (0, c). محور X: حُلّ المعادلة. Δ > 0 اثنتان، Δ = 0 واحدة، Δ < 0 لا شيء.', 'y-axis: (0, c). x-axis: solve the equation. Δ > 0 two, Δ = 0 one, Δ < 0 none.'),
        figure: (language) => <ParabolaCutsFigure language={language} />
    },

    /* ---------- 3. Translations and intersections ---------- */
    {
        id: 'vertex-form',
        stage: 'shifts',
        title: say('Parabolen lekualdaketak', 'Traslaciones de parábolas', 'انسحابات القطوع المكافئة', 'Translations of parabolas'),
        goal: say('$y=a(x-p)^{2}+q$ parabola $y=ax^{2}$ parabolaren lekualdaketa gisa irakurtzea eta forma orokorrera eta alderantziz igarotzea.', 'Leer $y=a(x-p)^{2}+q$ como una traslación de $y=ax^{2}$ y pasar a la forma general y al revés.', 'قراءة $y=a(x-p)^{2}+q$ انسحابًا لـ $y=ax^{2}$، والانتقال إلى الصورة العامة وبالعكس.', 'Read $y=a(x-p)^{2}+q$ as a translation of $y=ax^{2}$, and switch between this form and the general form, in both directions.'),
        explanation: say(
            '$y=a(x-p)^{2}+q$ parabola $y=ax^{2}$ da, $p$ unitate horizontalki eta $q$ unitate bertikalki lekualdatuta; erpina $(p,\\,q)$ puntuan dago. Kontuz zeinuarekin: $y=(x-3)^{2}$ eskuinera mugitzen da ($p=3$), eta $y=(x+1)^{2}=(x-(-1))^{2}$ ezkerrera ($p=-1$). $q>0$ bada, gora; $q<0$ bada, behera. Forma orokorrera igarotzeko, garatu karratua: $2(x-1)^{2}+3=2x^{2}-4x+5$. Alderantziz, $y=x^{2}-6x+5$ emanda, kalkulatu erpina: $x_v=3$, $y_v=9-18+5=-4$, eta beraz $y=(x-3)^{2}-4$; $a$ bera da bi formetan. Forma kanonikoan erpina zuzenean irakurtzen da.',
            '$y=a(x-p)^{2}+q$ es la parábola $y=ax^{2}$ trasladada $p$ unidades en horizontal y $q$ unidades en vertical; el vértice está en $(p,\\,q)$. Cuidado con el signo: $y=(x-3)^{2}$ se mueve a la derecha ($p=3$) e $y=(x+1)^{2}=(x-(-1))^{2}$ a la izquierda ($p=-1$). Si $q>0$, hacia arriba; si $q<0$, hacia abajo. Para pasar a la forma general, desarrolla el cuadrado: $2(x-1)^{2}+3=2x^{2}-4x+5$. Al revés, dada $y=x^{2}-6x+5$, calcula el vértice: $x_v=3$, $y_v=9-18+5=-4$, así que $y=(x-3)^{2}-4$; la $a$ es la misma en las dos formas. En la forma canónica el vértice se lee directamente.',
            '$y=a(x-p)^{2}+q$ هو القطع $y=ax^{2}$ مسحوبًا $p$ وحدة أفقيًا و$q$ وحدة رأسيًا؛ ورأسه في $(p,\\,q)$. انتبه للإشارة: $y=(x-3)^{2}$ ينتقل إلى اليمين ($p=3$)، و$y=(x+1)^{2}=(x-(-1))^{2}$ إلى اليسار ($p=-1$). إذا كان $q>0$ فإلى الأعلى؛ وإذا كان $q<0$ فإلى الأسفل. للانتقال إلى الصورة العامة انشر المربع: $2(x-1)^{2}+3=2x^{2}-4x+5$. وبالعكس، إذا أُعطيت $y=x^{2}-6x+5$ فاحسب الرأس: $x_v=3$ و$y_v=9-18+5=-4$، إذن $y=(x-3)^{2}-4$؛ والمعامل $a$ نفسه في الصورتين. في الصورة القانونية يُقرأ الرأس مباشرة.', '$y=a(x-p)^{2}+q$ is the parabola $y=ax^{2}$ moved $p$ units horizontally and $q$ units vertically; the vertex is at $(p,\\,q)$. Be careful with the sign: $y=(x-3)^{2}$ moves to the right ($p=3$), and $y=(x+1)^{2}=(x-(-1))^{2}$ moves to the left ($p=-1$). If $q>0$, it moves upwards; if $q<0$, downwards. To convert to the general form, expand the square: $2(x-1)^{2}+3=2x^{2}-4x+5$. The other way round, given $y=x^{2}-6x+5$, work out the vertex: $x_v=3$, $y_v=9-18+5=-4$, so $y=(x-3)^{2}-4$; the $a$ is the same in both forms. In vertex form, the vertex can be read directly.'
        ),
        problem: say('Nola lortzen da $y=2(x+1)^{2}-3$ parabola $y=2x^{2}$ parabolatik? Zein da erpina?', '¿Cómo se obtiene $y=2(x+1)^{2}-3$ a partir de $y=2x^{2}$? ¿Cuál es su vértice?', 'كيف نحصل على $y=2(x+1)^{2}-3$ من $y=2x^{2}$؟ وما رأسه؟', 'How do you get $y=2(x+1)^{2}-3$ from $y=2x^{2}$? What is its vertex?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $x-p$ forman.', 'Escríbelo como $x-p$.', 'اكتبه على صورة $x-p$.', 'Write it as $x-p$.'), math: same('$x+1=x-(-1)$') },
            { text: say('1 ezkerrera eta 3 behera.', '1 a la izquierda y 3 hacia abajo.', '1 إلى اليسار و3 إلى الأسفل.', '1 to the left and 3 down.'), math: same('$V(-1,\\,-3)$') }
        ],
        example: same('$y=a(x-p)^{2}+q$'),
        takeaway: say('Erpina (p, q): x − p barruan (zeinua aldatuta) eta q kanpoan. Forma bera, beste leku batean.', 'Vértice (p, q): x − p dentro (con el signo cambiado) y q fuera. La misma forma en otro sitio.', 'الرأس (p, q): x − p في الداخل (بإشارة معكوسة) وq في الخارج. الشكل نفسه في مكان آخر.', 'Vertex (p, q): x − p inside the bracket (with its sign changed) and q outside. The same shape in another place.'),
        figure: (language) => <ShiftFigure language={language} />
    },
    {
        id: 'parabola-from',
        stage: 'shifts',
        title: say('Parabola bat aurkitzea', 'Hallar una parábola', 'إيجاد قطع مكافئ', 'Find a parabola'),
        goal: say('Parabola baten ekuazioa aurkitzea erpina eta puntu bat, edo ebaki-puntuak eta beste puntu bat ezagututa.', 'Hallar la ecuación de una parábola conociendo el vértice y un punto, o los cortes con el eje X y otro punto.', 'إيجاد معادلة قطع مكافئ بمعرفة الرأس ونقطة، أو نقاط التقاطع مع محور X ونقطة أخرى.', 'Find the equation of a parabola when you know the vertex and a point, or its crossing points with the x-axis and another point.'),
        explanation: say(
            'Erpina $(p,\\,q)$ ezagutzen badugu, idatzi $y=a(x-p)^{2}+q$: falta den bakarra $a$ da, eta beste puntu bat ordeztuta lortzen da. Erpina $(1,\\,-4)$ eta $(3,\\,0)$ puntutik pasatzen bada: $0=a\\cdot 4-4$, $a=1$, eta $y=(x-1)^{2}-4=x^{2}-2x-3$. X ardatzarekin ebaki-puntuak, $r_1$ eta $r_2$, ezagutzen baditugu, erabili forma faktorizatua: $y=a(x-r_1)(x-r_2)$, eta lortu $a$ beste puntu batekin. $-1$ eta $3$ puntuetan ebakitzen badu eta $(0,\\,6)$ puntutik pasatzen bada: $6=a\\cdot(1)\\cdot(-3)$, $a=-2$. Gogoratu simetria: ebaki-puntuen erdian dago erpinaren abzisa, $x_v=\\frac{r_1+r_2}{2}$.',
            'Si conocemos el vértice $(p,\\,q)$, escribe $y=a(x-p)^{2}+q$: solo falta $a$, que sale al sustituir otro punto. Si el vértice es $(1,\\,-4)$ y pasa por $(3,\\,0)$: $0=a\\cdot 4-4$, $a=1$, e $y=(x-1)^{2}-4=x^{2}-2x-3$. Si conocemos los cortes con el eje X, $r_1$ y $r_2$, usa la forma factorizada: $y=a(x-r_1)(x-r_2)$, y halla $a$ con otro punto. Si corta en $-1$ y en $3$ y pasa por $(0,\\,6)$: $6=a\\cdot(1)\\cdot(-3)$, $a=-2$. Recuerda la simetría: la abscisa del vértice está en medio de los cortes, $x_v=\\frac{r_1+r_2}{2}$.',
            'إذا عرفنا الرأس $(p,\\,q)$ فاكتب $y=a(x-p)^{2}+q$: يبقى $a$ وحده، ونحصل عليه بتعويض نقطة أخرى. إذا كان الرأس $(1,\\,-4)$ والقطع يمر بـ $(3,\\,0)$: $0=a\\cdot 4-4$، $a=1$، و$y=(x-1)^{2}-4=x^{2}-2x-3$. وإذا عرفنا نقطتي التقاطع مع محور X، $r_1$ و$r_2$، فاستعمل الصورة المحللة: $y=a(x-r_1)(x-r_2)$، وأوجد $a$ بنقطة أخرى. إذا قطع عند $-1$ و$3$ ومرّ بـ $(0,\\,6)$: $6=a\\cdot(1)\\cdot(-3)$، $a=-2$. تذكّر التماثل: الإحداثي السيني للرأس في منتصف نقطتي التقاطع، $x_v=\\frac{r_1+r_2}{2}$.', 'If we know the vertex $(p,\\,q)$, write $y=a(x-p)^{2}+q$: you only need $a$, which you get by substituting another point. If the vertex is $(1,\\,-4)$ and it passes through $(3,\\,0)$: $0=a\\cdot 4-4$, $a=1$, and $y=(x-1)^{2}-4=x^{2}-2x-3$. If we know the x-axis crossing points, $r_1$ and $r_2$, use the factored form: $y=a(x-r_1)(x-r_2)$, and find $a$ using another point. If it crosses at $-1$ and $3$ and passes through $(0,\\,6)$: $6=a\\cdot(1)\\cdot(-3)$, $a=-2$. Remember the symmetry: the x-coordinate of the vertex is halfway between the crossing points, $x_v=\\frac{r_1+r_2}{2}$.'
        ),
        problem: say('Parabola baten erpina $(1,\\,-4)$ da eta $(3,\\,0)$ puntutik pasatzen da. Idatzi haren ekuazioa.', 'Una parábola tiene el vértice en $(1,\\,-4)$ y pasa por $(3,\\,0)$. Escribe su ecuación.', 'قطع مكافئ رأسه $(1,\\,-4)$ ويمر بـ $(3,\\,0)$. اكتب معادلته.', 'A parabola has its vertex at $(1,\\,-4)$ and passes through $(3,\\,0)$. Write its equation.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erpina ordeztu.', 'Pon el vértice.', 'ضع الرأس.', 'Put in the vertex.'), math: same('$y=a(x-1)^{2}-4$') },
            { text: say('$(3,\\,0)$ puntua ordeztu.', 'Sustituye el punto $(3,\\,0)$.', 'عوّض النقطة $(3,\\,0)$.', 'Substitute the point $(3,\\,0)$.'), math: same('$0=4a-4\\ \\to\\ a=1$') },
            { text: say('Garatu.', 'Desarrolla.', 'انشر.', 'Expand.'), math: same('$y=x^{2}-2x-3$') }
        ],
        example: same('$y=a(x-r_1)(x-r_2)$'),
        takeaway: say('Erpina ezagututa: a(x − p)² + q. Ebaki-puntuak ezagututa: a(x − r₁)(x − r₂). Beste puntu batek ematen du a.', 'Con el vértice: a(x − p)² + q. Con los cortes: a(x − r₁)(x − r₂). Otro punto da la a.', 'بالرأس: a(x − p)² + q. بالتقاطعات: a(x − r₁)(x − r₂). ونقطة أخرى تعطي a.', 'With the vertex: a(x − p)² + q. With the crossing points: a(x − r₁)(x − r₂). Another point gives you a.'),
        figure: (language) => <VertexPointFigure language={language} />
    },
    {
        id: 'line-parabola',
        stage: 'shifts',
        title: say('Zuzen eta parabola baten ebakidurak', 'Cortes de recta y parábola', 'تقاطع مستقيم وقطع مكافئ', 'Intersections of a straight line and a parabola'),
        goal: say('Zuzen baten eta parabola baten ebaki-puntuak kalkulatzea ekuazio-sistema ebatziz.', 'Calcular los puntos de corte de una recta y una parábola resolviendo un sistema de ecuaciones.', 'حساب نقاط تقاطع مستقيم وقطع مكافئ بحل نظام معادلات.', 'Work out where a straight line and a parabola cross by solving a system of equations.'),
        explanation: say(
            'Bi grafikoren ebaki-puntuak bi ekuazioak aldi berean betetzen dituzten puntuak dira. Zuzen bat eta parabola bat badira, berdindu bi adierazpenak: $x^{2}-1=x+1$, eta lortzen den bigarren mailako ekuazioak, $x^{2}-x-2=0$, ematen ditu abzisak: $x=2$ eta $x=-1$. Ordenatuak kalkulatzeko, ordeztu errazena den adierazpenean (zuzenean): $(2,\\,3)$ eta $(-1,\\,0)$. Diskriminatzaileak esaten du zer gertatzen den: $\\Delta>0$ bada, zuzena ebakitzailea da (bi puntu); $\\Delta=0$ bada, ukitzailea (puntu bat); $\\Delta<0$ bada, ez dute elkar ebakitzen. Era berean, bi parabolen ebaki-puntuak ere berdinduta kalkulatzen dira.',
            'Los puntos de corte de dos gráficas son los puntos que cumplen a la vez las dos ecuaciones. Si son una recta y una parábola, iguala las dos expresiones: $x^{2}-1=x+1$, y la ecuación de segundo grado que sale, $x^{2}-x-2=0$, da las abscisas: $x=2$ y $x=-1$. Para las ordenadas, sustituye en la expresión más sencilla (la recta): $(2,\\,3)$ y $(-1,\\,0)$. El discriminante dice qué ocurre: si $\\Delta>0$, la recta es secante (dos puntos); si $\\Delta=0$, tangente (un punto); si $\\Delta<0$, no se cortan. Del mismo modo, los cortes de dos parábolas también se calculan igualando.',
            'نقاط تقاطع رسمين هي النقاط التي تحقق المعادلتين معًا. إذا كانا مستقيمًا وقطعًا مكافئًا فساوِ بين العبارتين: $x^{2}-1=x+1$، والمعادلة التربيعية الناتجة $x^{2}-x-2=0$ تعطي الإحداثيات السينية: $x=2$ و$x=-1$. وللإحداثيات الصادية عوّض في أبسط عبارة (المستقيم): $(2,\\,3)$ و$(-1,\\,0)$. والمميز يحدد ما يحدث: إذا كان $\\Delta>0$ فالمستقيم قاطع (نقطتان)؛ وإذا كان $\\Delta=0$ فمماس (نقطة)؛ وإذا كان $\\Delta<0$ فلا يتقاطعان. وبالطريقة نفسها تُحسب تقاطعات قطعين مكافئين بالمساواة.', 'The intersection points of two graphs are the points that satisfy both equations at the same time. If they are a straight line and a parabola, set the two expressions equal: $x^{2}-1=x+1$, and the second-degree equation that comes out, $x^{2}-x-2=0$, gives the x-coordinates: $x=2$ and $x=-1$. For the y-coordinates, substitute into the simpler expression (the straight line): $(2,\\,3)$ and $(-1,\\,0)$. The discriminant tells you what happens: if $\\Delta>0$, the straight line is a secant (two points); if $\\Delta=0$, it is a tangent (one point); if $\\Delta<0$, they do not meet. In the same way, the intersections of two parabolas are also found by setting them equal.'
        ),
        problem: say('Kalkulatu $y=x^{2}-1$ eta $y=x+1$ grafikoen ebaki-puntuak.', 'Halla los puntos de corte de $y=x^{2}-1$ e $y=x+1$.', 'أوجد نقاط تقاطع $y=x^{2}-1$ و$y=x+1$.', 'Find where $y=x^{2}-1$ and $y=x+1$ meet.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set them equal.'), math: same('$x^{2}-1=x+1$') },
            { text: say('Eraman dena ezkerrera.', 'Pásalo todo a la izquierda.', 'انقل كل شيء إلى اليسار.', 'Move everything to the left-hand side.'), math: same('$x^{2}-x-2=0$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.', 'Solve.'), math: same('$x=2,\\ x=-1$') },
            { text: say('Ordeztu zuzenean.', 'Sustituye en la recta.', 'عوّض في المستقيم.', 'Substitute into the straight line.'), math: same('$(2,\\,3),\\ (-1,\\,0)$') }
        ],
        example: same('$x^{2}-1=x+1$'),
        takeaway: say('Ebaki-puntuak: berdindu bi adierazpenak. Δ-k esaten du ebakitzailea, ukitzailea ala kanpokoa den.', 'Cortes: iguala las dos expresiones. Δ dice si es secante, tangente o exterior.', 'التقاطع: ساوِ بين العبارتين. Δ يحدد إن كان قاطعًا أو مماسًا أو خارجيًا.', 'Intersections: set the two expressions equal. Δ tells you whether the straight line is a secant, a tangent or misses the parabola.'),
        figure: (language) => <LineParabolaFigure language={language} />
    },

    /* ---------- 4. Absolute value ---------- */
    {
        id: 'absolute-linear',
        stage: 'absolute',
        title: say('Zuzen baten balio absolutua', 'Valor absoluto de una recta', 'القيمة المطلقة لمستقيم', 'Absolute value of a straight line'),
        goal: say('$y=|mx+n|$ funtzioak marraztea zuzenaren zati negatiboa islatuta, eta $|x-a|=b$ bezalako ekuazioak ebaztea.', 'Dibujar funciones $y=|mx+n|$ reflejando la parte negativa de la recta y resolver ecuaciones como $|x-a|=b$.', 'رسم دوال $y=|mx+n|$ بعكس الجزء السالب من المستقيم، وحل معادلات مثل $|x-a|=b$.', 'Draw functions $y=|mx+n|$ by reflecting the negative part of the straight line, and solve equations such as $|x-a|=b$.'),
        explanation: say(
            'Zenbaki baten balio absolutua zeinurik gabeko zenbakia da: $|5|=5$ eta $|-5|=5$. Beraz, $y=|f(x)|$ funtzioak ez du inoiz balio negatiborik: $f(x)\\ge 0$ den lekuan grafikoa ez da aldatzen, eta $f(x)<0$ den lekuan X ardatzarekiko simetrikoa egiten da (gora islatzen da). $y=|x-2|$ marrazteko, marraztu $y=x-2$ zuzena eta islatu X ardatzaren azpian dagoen zatia: V forma bat geratzen da, erpina $(2,\\,0)$ puntuan, barrukoa 0 egiten den lekuan. $|x-2|$ zenbakizuzenean $x$-tik 2ra dagoen distantzia ere bada, eta horregatik $|x-1|=3$ ekuazioak bi soluzio ditu: $x-1=3$ edo $x-1=-3$, hau da, $x=4$ eta $x=-2$.',
            'El valor absoluto de un número es el número sin su signo: $|5|=5$ y $|-5|=5$. Por eso, la función $y=|f(x)|$ nunca toma valores negativos: donde $f(x)\\ge 0$ la gráfica no cambia, y donde $f(x)<0$ se hace simétrica respecto al eje X (se refleja hacia arriba). Para dibujar $y=|x-2|$, traza la recta $y=x-2$ y refleja el trozo que queda por debajo del eje X: queda una V con el pico en $(2,\\,0)$, donde lo de dentro vale 0. $|x-2|$ es también la distancia de $x$ a 2 en la recta numérica, y por eso la ecuación $|x-1|=3$ tiene dos soluciones: $x-1=3$ o $x-1=-3$, es decir, $x=4$ y $x=-2$.',
            'القيمة المطلقة لعدد هي العدد بلا إشارة: $|5|=5$ و$|-5|=5$. لذلك لا تأخذ الدالة $y=|f(x)|$ أي قيمة سالبة أبدًا: حيث $f(x)\\ge 0$ لا يتغير الرسم، وحيث $f(x)<0$ يصير متماثلًا بالنسبة لمحور X (ينعكس إلى الأعلى). لرسم $y=|x-2|$ ارسم المستقيم $y=x-2$ واعكس الجزء الواقع تحت محور X: يبقى شكل V رأسه في $(2,\\,0)$ حيث يساوي ما بالداخل 0. و$|x-2|$ هي أيضًا المسافة بين $x$ و2 على خط الأعداد، ولذلك للمعادلة $|x-1|=3$ حلّان: $x-1=3$ أو $x-1=-3$، أي $x=4$ و$x=-2$.', 'The absolute value of a number is the number without its sign: $|5|=5$ and $|-5|=5$. So the function $y=|f(x)|$ never takes negative values: where $f(x)\\ge 0$ the graph does not change, and where $f(x)<0$ the graph is reflected in the x-axis (upwards). To draw $y=|x-2|$, draw the straight line $y=x-2$ and reflect the part below the x-axis: you get a V with its peak at $(2,\\,0)$, where the expression inside is 0. $|x-2|$ is also the distance from $x$ to 2 on the number line, and so the equation $|x-1|=3$ has two solutions: $x-1=3$ or $x-1=-3$, that is, $x=4$ and $x=-2$.'
        ),
        problem: say('$y=|x-2|$ izanik, kalkulatu $f(0)$ eta $f(5)$. Non dago erpina?', 'Siendo $y=|x-2|$, calcula $f(0)$ y $f(5)$. ¿Dónde está el pico?', 'إذا كان $y=|x-2|$ فاحسب $f(0)$ و$f(5)$. أين الرأس؟', 'Given $y=|x-2|$, work out $f(0)$ and $f(5)$. Where is the peak?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu eta kendu zeinua.', 'Sustituye y quita el signo.', 'عوّض واحذف الإشارة.', 'Substitute and remove the sign.'), math: same('$f(0)=|-2|=2$') },
            { text: say('Positiboa da: ez da aldatzen.', 'Es positivo: no cambia.', 'موجب: لا يتغير.', 'It is positive: it does not change.'), math: same('$f(5)=|3|=3$') },
            { text: say('Barrukoa 0.', 'Lo de dentro, 0.', 'ما بالداخل يساوي 0.', 'The expression inside is 0.'), math: same('$x-2=0\\ \\to\\ (2,\\,0)$') }
        ],
        example: same('$|-5|=5$'),
        takeaway: say('|f(x)|: ardatzaren azpiko zatia gora islatzen da. Erpina barrukoa 0 den lekuan.', '|f(x)|: lo que está bajo el eje se refleja hacia arriba. El pico, donde lo de dentro vale 0.', '|f(x)|: ما تحت المحور ينعكس إلى الأعلى. والرأس حيث يساوي ما بالداخل 0.', '|f(x)|: whatever is below the x-axis is reflected upwards. The peak is where the expression inside is 0.'),
        figure: (language) => <AbsLinearFigure language={language} />
    },
    {
        id: 'absolute-pieces',
        stage: 'absolute',
        title: say('Balio absolutua zatika', 'El valor absoluto a trozos', 'القيمة المطلقة على أجزاء', 'Absolute value as a piecewise function'),
        goal: say('Balio absolutua duen funtzio bat zatika definitutako funtzio gisa idaztea, barrukoaren zeinua aztertuta.', 'Escribir una función con valor absoluto como una función definida a trozos, estudiando el signo de lo de dentro.', 'كتابة دالة فيها قيمة مطلقة دالةً معرّفة على أجزاء بدراسة إشارة ما بالداخل.', 'Write a function with an absolute value as a piecewise function, by studying the sign of the expression inside.'),
        explanation: say(
            'Balio absolutua kentzeko, aztertu barrukoaren zeinua. Barrukoa positiboa edo zero den lekuan, utzi den bezala; negatiboa den lekuan, aldatu zeinua (aurkakoa hartu). Mugak barrukoaren erroak dira. $y=|2x-4|$ funtzioan $2x-4=0$ denean $x=2$: ezkerrean, $x=0$ hartuta, $2\\cdot 0-4<0$, beraz $y=-2x+4$; eskuinean, $y=2x-4$. Hau da, $y=-2x+4$ baldin $x<2$ eta $y=2x-4$ baldin $x\\ge 2$. Bi zatiek balio bera ematen dute $x=2$ puntuan (0), eta horregatik funtzioa jarraitua da. Zati bakoitzean funtzioa lineala denez, balio absolutuko funtzio bat zuzen-zatiz osatuta dago, eta zati bakoitzaren malda zuzenaren malda bera da edo haren aurkakoa.',
            'Para quitar el valor absoluto, estudia el signo de lo de dentro. Donde lo de dentro es positivo o cero, se deja igual; donde es negativo, se cambia de signo (se toma el opuesto). Los límites son las raíces de lo de dentro. En $y=|2x-4|$, $2x-4=0$ cuando $x=2$: a la izquierda, tomando $x=0$, $2\\cdot 0-4<0$, así que $y=-2x+4$; a la derecha, $y=2x-4$. Es decir, $y=-2x+4$ si $x<2$ e $y=2x-4$ si $x\\ge 2$. Los dos trozos dan el mismo valor en $x=2$ (el 0), y por eso la función es continua. Como en cada trozo la función es lineal, una función con valor absoluto de una recta está hecha de trozos de recta cuya pendiente es la de la recta o su opuesta.',
            'لحذف القيمة المطلقة ادرس إشارة ما بالداخل. حيث يكون موجبًا أو صفرًا يبقى كما هو؛ وحيث يكون سالبًا تُغيَّر إشارته (نأخذ معاكسه). والحدود هي جذور ما بالداخل. في $y=|2x-4|$ يكون $2x-4=0$ عند $x=2$: إلى اليسار، بأخذ $x=0$، $2\\cdot 0-4<0$، إذن $y=-2x+4$؛ وإلى اليمين $y=2x-4$. أي $y=-2x+4$ إذا كان $x<2$ و$y=2x-4$ إذا كان $x\\ge 2$. يعطي الجزآن القيمة نفسها عند $x=2$ (الصفر)، ولذلك الدالة متصلة. وبما أن الدالة خطية في كل جزء، فإن دالة القيمة المطلقة لمستقيم تتكون من قطع مستقيمة ميل كل منها هو ميل المستقيم أو معاكسه.', 'To remove the absolute value, study the sign of the expression inside. Where the expression inside is positive or zero, leave it as it is; where it is negative, change its sign (take the opposite). The boundaries are the roots of the expression inside. In $y=|2x-4|$, $2x-4=0$ when $x=2$: on the left, taking $x=0$, $2\\cdot 0-4<0$, so $y=-2x+4$; on the right, $y=2x-4$. That is, $y=-2x+4$ if $x<2$ and $y=2x-4$ if $x\\ge 2$. The two pieces give the same value at $x=2$ (the value 0), and so the function is continuous. As the function is linear on each piece, a function with the absolute value of a straight line is made of straight pieces whose slope is either the slope of the straight line or its opposite.'
        ),
        problem: say('Idatzi $y=|2x-4|$ zatika eta kalkulatu $f(-1)$.', 'Escribe $y=|2x-4|$ a trozos y calcula $f(-1)$.', 'اكتب $y=|2x-4|$ على أجزاء واحسب $f(-1)$.', 'Write $y=|2x-4|$ as a piecewise function and work out $f(-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrukoaren erroa.', 'La raíz de lo de dentro.', 'جذر ما بالداخل.', 'The root of the expression inside.'), math: same('$2x-4=0\\ \\to\\ x=2$') },
            { text: say('$x<2$: negatiboa, aldatu zeinua.', '$x<2$: negativo, cambia el signo.', '$x<2$: سالب، غيّر الإشارة.', '$x<2$: negative, so the sign changes.'), math: same('$y=-2x+4$') },
            { text: say('$x\\ge 2$: utzi den bezala.', '$x\\ge 2$: déjalo igual.', '$x\\ge 2$: اتركه كما هو.', '$x\\ge 2$: leave it as it is.'), math: same('$y=2x-4$') },
            { text: say('$-1<2$: lehen zatia.', '$-1<2$: primer trozo.', '$-1<2$: الجزء الأول.', '$-1<2$: first piece.'), math: same('$f(-1)=2+4=6$') }
        ],
        example: same('$|2x-4|$'),
        takeaway: say('Zatika: barrukoaren erroek banatzen dute. Negatiboa den zatian, aldatu zeinua.', 'A trozos: las raíces de lo de dentro separan. En el trozo negativo, cambia el signo.', 'على أجزاء: جذور ما بالداخل تفصل. في الجزء السالب غيّر الإشارة.', 'Piecewise: the roots of the expression inside separate the pieces. On the negative piece, change the sign.'),
        figure: (language) => <AbsPiecesFigure language={language} />
    },
    {
        id: 'absolute-quadratic',
        stage: 'absolute',
        title: say('Parabola baten balio absolutua', 'Valor absoluto de una parábola', 'القيمة المطلقة لقطع مكافئ', 'Absolute value of a parabola'),
        goal: say('$y=|ax^{2}+bx+c|$ funtzioak marraztea eta haien maximo eta minimoak aurkitzea.', 'Dibujar funciones $y=|ax^{2}+bx+c|$ y encontrar sus máximos y mínimos.', 'رسم دوال $y=|ax^{2}+bx+c|$ وإيجاد قيمها العظمى والصغرى.', 'Draw functions $y=|ax^{2}+bx+c|$ and find their maximum and minimum points.'),
        explanation: say(
            'Parabola batekin ere berdin egiten da: marraztu barruko parabola eta islatu X ardatzaren azpian dagoen zatia. Gora irekitako parabola batean ($a>0$) zati negatiboa bi ebaki-puntuen artean dago; hor erpina gora igarotzen da eta maximo erlatibo bihurtzen da. $y=|x^{2}-4|$ funtzioan ebaki-puntuak $x=\\pm 2$ dira, eta $(0,\\,-4)$ erpina $(0,\\,4)$ bihurtzen da: grafikoak bi minimo ditu, $(-2,\\,0)$ eta $(2,\\,0)$, eta maximo erlatibo bat, $(0,\\,4)$. Zatika idatzita: $y=x^{2}-4$ baldin $x\\le -2$ edo $x\\ge 2$, eta $y=-x^{2}+4$ baldin $-2<x<2$. Parabolak ez badu X ardatza ebakitzen ($\\Delta<0$) eta gora irekita badago, $|f(x)|=f(x)$: ez da ezer aldatzen.',
            'Con una parábola se hace igual: dibuja la parábola de dentro y refleja la parte que queda por debajo del eje X. En una parábola abierta hacia arriba ($a>0$) la parte negativa está entre los dos cortes; allí el vértice sube y se convierte en un máximo relativo. En $y=|x^{2}-4|$ los cortes son $x=\\pm 2$, y el vértice $(0,\\,-4)$ pasa a $(0,\\,4)$: la gráfica tiene dos mínimos, $(-2,\\,0)$ y $(2,\\,0)$, y un máximo relativo, $(0,\\,4)$. A trozos: $y=x^{2}-4$ si $x\\le -2$ o $x\\ge 2$, e $y=-x^{2}+4$ si $-2<x<2$. Si la parábola no corta al eje X ($\\Delta<0$) y se abre hacia arriba, $|f(x)|=f(x)$: no cambia nada.',
            'مع القطع المكافئ نفعل الشيء نفسه: ارسم القطع الداخلي واعكس الجزء الواقع تحت محور X. في قطع مفتوح إلى الأعلى ($a>0$) يكون الجزء السالب بين نقطتي التقاطع؛ وهناك يصعد الرأس ويصير قيمة عظمى نسبية. في $y=|x^{2}-4|$ نقطتا التقاطع $x=\\pm 2$، والرأس $(0,\\,-4)$ يصير $(0,\\,4)$: للرسم قيمتان صغريان $(-2,\\,0)$ و$(2,\\,0)$ وقيمة عظمى نسبية $(0,\\,4)$. على أجزاء: $y=x^{2}-4$ إذا كان $x\\le -2$ أو $x\\ge 2$، و$y=-x^{2}+4$ إذا كان $-2<x<2$. وإذا كان القطع لا يقطع محور X ($\\Delta<0$) ومفتوحًا إلى الأعلى فإن $|f(x)|=f(x)$: لا يتغير شيء.', 'With a parabola you do the same: draw the parabola of the expression inside and reflect the part below the x-axis. For a parabola that opens upwards ($a>0$), the negative part lies between the two crossing points; there the vertex goes up and becomes a local maximum. For $y=|x^{2}-4|$ the crossing points are $x=\\pm 2$, and the vertex $(0,\\,-4)$ becomes $(0,\\,4)$: the graph has two minima, $(-2,\\,0)$ and $(2,\\,0)$, and one local maximum, $(0,\\,4)$. In pieces: $y=x^{2}-4$ if $x\\le -2$ or $x\\ge 2$, and $y=-x^{2}+4$ if $-2<x<2$. If the parabola does not cross the x-axis ($\\Delta<0$) and opens upwards, $|f(x)|=f(x)$: nothing changes.'
        ),
        problem: say('Kalkulatu $y=|x^{2}-2x-3|$ funtzioaren maximo erlatiboa.', 'Halla el máximo relativo de $y=|x^{2}-2x-3|$.', 'أوجد القيمة العظمى النسبية لـ $y=|x^{2}-2x-3|$.', 'Find the local maximum of $y=|x^{2}-2x-3|$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barruko parabolaren ebaki-puntuak.', 'Cortes de la parábola de dentro.', 'تقاطعات القطع الداخلي.', 'The crossing points of the parabola inside.'), math: same('$x=-1,\\ x=3$') },
            { text: say('Erpina, tartean.', 'El vértice, entre ellos.', 'الرأس بينهما.', 'The vertex, between them.'), math: same('$x_v=1,\\ y_v=-4$') },
            { text: say('Gora islatzen da.', 'Se refleja hacia arriba.', 'ينعكس إلى الأعلى.', 'It is reflected upwards.'), math: same('$(1,\\,-4)\\ \\to\\ (1,\\,4)$') }
        ],
        example: same('$|x^{2}-4|$'),
        takeaway: say('Parabola: ebaki-puntuen arteko zatia islatzen da, eta erpina maximo erlatibo bihurtzen da.', 'Parábola: se refleja el trozo entre los cortes, y el vértice se convierte en máximo relativo.', 'القطع المكافئ: ينعكس الجزء بين نقطتي التقاطع ويصير الرأس قيمة عظمى نسبية.', 'Parabola: reflect the part between the crossing points, and the vertex becomes a local maximum.'),
        figure: (language) => <AbsQuadraticFigure language={language} />
    },

    /* ---------- 5. Rational functions ---------- */
    {
        id: 'inverse',
        stage: 'rational',
        title: say('Alderantzizko proportzionaltasuna: $y=\\frac{k}{x}$', 'Proporcionalidad inversa: $y=\\frac{k}{x}$', 'التناسب العكسي: $y=\\frac{k}{x}$', 'Inverse proportion: $y=\\frac{k}{x}$'),
        goal: say('$y=\\frac{k}{x}$ hiperbolak ezagutzea: $k$ puntu batetik kalkulatzea, adarren koadranteak eta asintotak.', 'Conocer las hipérbolas $y=\\frac{k}{x}$: calcular $k$ a partir de un punto, los cuadrantes de las ramas y las asíntotas.', 'التعرف إلى القطوع الزائدة $y=\\frac{k}{x}$: حساب $k$ من نقطة، وأرباع الفرعين، والمقاربين.', 'Know the hyperbolas $y=\\frac{k}{x}$: work out $k$ from a point, the quadrants of the branches and the asymptotes.'),
        explanation: say(
            'Bi magnitude alderantziz proportzionalak dira haien biderkadura konstantea bada: $x\\cdot y=k$, edo $y=\\frac{k}{x}$. Adibidez, 120 km egiteko abiadura eta denbora: $t=\\frac{120}{v}$. Grafikoa hiperbola bat da, bi adarrekin. $k>0$ bada, adarrak I. eta III. koadranteetan daude eta funtzioa beherakorra da adar bakoitzean; $k<0$ bada, II. eta IV. koadranteetan daude eta gorakorra da. Ez du ardatzik ebakitzen: Dom $f=\\mathbb{R}-\\{0\\}$ eta Rec $f=\\mathbb{R}-\\{0\\}$. Ardatzak asintotak dira: grafikoa gero eta hurbilago dago haietatik, baina ez ditu inoiz ukitzen. $k$ kalkulatzeko, biderkatu puntu baten koordenatuak: $(2,\\,-3)$ puntutik pasatzen bada, $k=-6$.',
            'Dos magnitudes son inversamente proporcionales si su producto es constante: $x\\cdot y=k$, o sea $y=\\frac{k}{x}$. Por ejemplo, la velocidad y el tiempo para recorrer 120 km: $t=\\frac{120}{v}$. La gráfica es una hipérbola, con dos ramas. Si $k>0$, las ramas están en los cuadrantes I y III y la función es decreciente en cada rama; si $k<0$, están en los cuadrantes II y IV y es creciente. No corta a los ejes: Dom $f=\\mathbb{R}-\\{0\\}$ y Rec $f=\\mathbb{R}-\\{0\\}$. Los ejes son asíntotas: la gráfica se acerca cada vez más a ellos, pero nunca los toca. Para calcular $k$, multiplica las coordenadas de un punto: si pasa por $(2,\\,-3)$, $k=-6$.',
            'تكون كميتان متناسبتين عكسيًا إذا كان حاصل ضربهما ثابتًا: $x\\cdot y=k$، أي $y=\\frac{k}{x}$. مثلًا السرعة والزمن لقطع 120 كم: $t=\\frac{120}{v}$. الرسم قطع زائد له فرعان. إذا كان $k>0$ فالفرعان في الربعين الأول والثالث والدالة متناقصة في كل فرع؛ وإذا كان $k<0$ ففي الربعين الثاني والرابع وهي متزايدة. لا يقطع المحورين: Dom $f=\\mathbb{R}-\\{0\\}$ وRec $f=\\mathbb{R}-\\{0\\}$. المحوران مقاربان: يقترب الرسم منهما أكثر فأكثر ولا يلمسهما أبدًا. ولحساب $k$ اضرب إحداثيي نقطة: إذا مرّ بـ $(2,\\,-3)$ فإن $k=-6$.', 'Two quantities are inversely proportional if their product is constant: $x\\cdot y=k$, or in other words $y=\\frac{k}{x}$. For example, speed and time to travel 120 km: $t=\\frac{120}{v}$. The graph is a hyperbola, with two branches. If $k>0$, the branches are in quadrants I and III and the function is decreasing on each branch; if $k<0$, they are in quadrants II and IV and it is increasing. It does not cross the axes: Domain $f=\\mathbb{R}-\\{0\\}$ and Range $f=\\mathbb{R}-\\{0\\}$. The axes are asymptotes: the graph gets closer and closer to them, but never touches them. To work out $k$, multiply the coordinates of a point: if it passes through $(2,\\,-3)$, $k=-6$.'
        ),
        problem: say('$y=\\frac{k}{x}$ hiperbola $(2,\\,-3)$ puntutik pasatzen da. Kalkulatu $k$ eta $f(-1)$.', 'La hipérbola $y=\\frac{k}{x}$ pasa por $(2,\\,-3)$. Halla $k$ y $f(-1)$.', 'يمر القطع الزائد $y=\\frac{k}{x}$ بـ $(2,\\,-3)$. أوجد $k$ و$f(-1)$.', 'The hyperbola $y=\\frac{k}{x}$ passes through $(2,\\,-3)$. Find $k$ and $f(-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu koordenatuak.', 'Multiplica las coordenadas.', 'اضرب الإحداثيين.', 'Multiply the coordinates.'), math: same('$k=2\\cdot(-3)=-6$') },
            { text: say('$k<0$: II. eta IV. koadranteak.', '$k<0$: cuadrantes II y IV.', '$k<0$: الربعان الثاني والرابع.', '$k<0$: quadrants II and IV.'), math: same('$f(-1)=\\frac{-6}{-1}=6$') }
        ],
        example: same('$x\\cdot y=k$'),
        takeaway: say('y = k/x: biderkadura konstantea. k > 0, I. eta III.; k < 0, II. eta IV. Asintotak: ardatzak.', 'y = k/x: producto constante. k > 0, I y III; k < 0, II y IV. Asíntotas: los ejes.', 'y = k/x: حاصل ضرب ثابت. k > 0 الأول والثالث؛ k < 0 الثاني والرابع. المقاربان: المحوران.', 'y = k/x: constant product. k > 0, I and III; k < 0, II and IV. Asymptotes: the axes.'),
        figure: (language) => <HyperbolaFigure language={language} />
    },
    {
        id: 'hyperbola-shift',
        stage: 'rational',
        title: say('Hiperbolen lekualdaketak', 'Traslaciones de hipérbolas', 'انسحابات القطوع الزائدة', 'Translations of hyperbolas'),
        goal: say('$y=\\frac{k}{x-a}+b$ funtzioen asintotak, izate-eremua eta ibiltartea irakurtzea eta haien grafikoak marraztea.', 'Leer las asíntotas, el dominio y el recorrido de las funciones $y=\\frac{k}{x-a}+b$ y dibujar sus gráficas.', 'قراءة المقاربين والمجال والمدى للدوال $y=\\frac{k}{x-a}+b$ ورسمها.', 'Read the asymptotes, the domain and the range of the functions $y=\\frac{k}{x-a}+b$, and draw their graphs.'),
        explanation: say(
            '$y=\\dfrac{k}{x-a}+b$ hiperbola $y=\\frac{k}{x}$ bera da, $a$ unitate horizontalki eta $b$ unitate bertikalki lekualdatuta, parabolekin bezala. Asintotak ere mugitzen dira: bertikala $x=a$ da (izendatzailea anulatzen den lekua) eta horizontala $y=b$. Beraz, Dom $f=\\mathbb{R}-\\{a\\}$ eta Rec $f=\\mathbb{R}-\\{b\\}$. $y=\\frac{2}{x+1}-3$ funtzioan asintotak $x=-1$ eta $y=-3$ dira, eta adarrak $y=\\frac{2}{x}$ funtzioarenak bezala daude, asintoten gurutzearen inguruan. Marrazteko: 1) asintotak marra etenekin, 2) ardatzekin ebaki-puntuak, 3) puntu gehiago asintota bertikalaren bi aldeetan.',
            '$y=\\dfrac{k}{x-a}+b$ es la misma hipérbola $y=\\frac{k}{x}$ trasladada $a$ unidades en horizontal y $b$ en vertical, como las parábolas. Las asíntotas también se mueven: la vertical es $x=a$ (donde se anula el denominador) y la horizontal $y=b$. Por tanto, Dom $f=\\mathbb{R}-\\{a\\}$ y Rec $f=\\mathbb{R}-\\{b\\}$. En $y=\\frac{2}{x+1}-3$ las asíntotas son $x=-1$ e $y=-3$, y las ramas están como las de $y=\\frac{2}{x}$, alrededor del cruce de las asíntotas. Para dibujarla: 1) las asíntotas con línea discontinua, 2) los cortes con los ejes, 3) algunos puntos más a los dos lados de la asíntota vertical.',
            '$y=\\dfrac{k}{x-a}+b$ هو القطع الزائد $y=\\frac{k}{x}$ نفسه مسحوبًا $a$ وحدة أفقيًا و$b$ رأسيًا، كما في القطوع المكافئة. ويتحرك المقاربان أيضًا: الرأسي $x=a$ (حيث ينعدم المقام) والأفقي $y=b$. إذن Dom $f=\\mathbb{R}-\\{a\\}$ وRec $f=\\mathbb{R}-\\{b\\}$. في $y=\\frac{2}{x+1}-3$ المقاربان $x=-1$ و$y=-3$، والفرعان كفرعي $y=\\frac{2}{x}$ حول تقاطع المقاربين. لرسمه: 1) المقاربان بخط متقطع، 2) التقاطعات مع المحورين، 3) بعض النقاط الأخرى على جانبي المقارب الرأسي.', '$y=\\dfrac{k}{x-a}+b$ is the same hyperbola $y=\\frac{k}{x}$ moved $a$ units horizontally and $b$ units vertically, like the parabolas. The asymptotes also move: the vertical one is $x=a$ (where the denominator is 0) and the horizontal one is $y=b$. So Domain $f=\\mathbb{R}-\\{a\\}$ and Range $f=\\mathbb{R}-\\{b\\}$. In $y=\\frac{2}{x+1}-3$ the asymptotes are $x=-1$ and $y=-3$, and the branches are like those of $y=\\frac{2}{x}$, around the point where the asymptotes cross. To draw it: 1) the asymptotes as dashed lines, 2) where it crosses the axes, 3) a few more points on both sides of the vertical asymptote.'
        ),
        problem: say('Idatzi $y=\\frac{2}{x+1}-3$ funtzioaren asintotak eta Y ardatzarekin duen ebaki-puntua.', 'Escribe las asíntotas de $y=\\frac{2}{x+1}-3$ y su corte con el eje Y.', 'اكتب مقاربي $y=\\frac{2}{x+1}-3$ وتقاطعه مع محور Y.', 'Write the asymptotes of $y=\\frac{2}{x+1}-3$ and where it crosses the y-axis.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea 0: asintota bertikala.', 'Denominador 0: asíntota vertical.', 'المقام 0: المقارب الرأسي.', 'Denominator = 0: vertical asymptote.'), math: same('$x=-1$') },
            { text: say('Kanpoko gaia: asintota horizontala.', 'El término de fuera: asíntota horizontal.', 'الحد الخارجي: المقارب الأفقي.', 'The term outside the fraction: horizontal asymptote.'), math: same('$y=-3$') },
            { text: say('Y ardatza: $x=0$.', 'Eje Y: $x=0$.', 'محور Y: $x=0$.', 'y-axis: $x=0$.'), math: same('$f(0)=2-3=-1$') }
        ],
        example: same('$y=\\frac{k}{x-a}+b$'),
        takeaway: say('Asintotak: x = a eta y = b. Dom = ℝ − {a}, Rec = ℝ − {b}.', 'Asíntotas: x = a e y = b. Dom = ℝ − {a}, Rec = ℝ − {b}.', 'المقاربان: x = a وy = b. Dom = ℝ − {a}، Rec = ℝ − {b}.', 'Asymptotes: x = a and y = b. Domain = ℝ − {a}, Range = ℝ − {b}.'),
        figure: (language) => <ShiftedHyperbolaFigure language={language} />
    },
    {
        id: 'rational-form',
        stage: 'rational',
        title: say('$y=\\frac{ax+b}{cx+d}$ funtzioak', 'Funciones $y=\\frac{ax+b}{cx+d}$', 'الدوال $y=\\frac{ax+b}{cx+d}$', 'Functions $y=\\frac{ax+b}{cx+d}$'),
        goal: say('Funtzio arrazional bat zatiketaren bidez $\\frac{k}{x-a}+b$ forman idaztea eta haren asintotak aurkitzea.', 'Escribir una función racional como $\\frac{k}{x-a}+b$ mediante la división y encontrar sus asíntotas.', 'كتابة دالة كسرية على صورة $\\frac{k}{x-a}+b$ بالقسمة، وإيجاد مقاربيها.', 'Write a rational function as $\\frac{k}{x-a}+b$ by division, and find its asymptotes.'),
        explanation: say(
            'Zenbakitzailean eta izendatzailean lehen mailako polinomioak dituen funtzio arrazional bat ere hiperbola bat da. Zatiketa eginda ikusten da: $\\dfrac{2x+1}{x-1}$ zatitzean zatidura 2 eta hondarra 3 dira, beraz $y=2+\\dfrac{3}{x-1}$, $y=\\frac{3}{x}$ hiperbola 1 eskuinera eta 2 gora eramanda. Lasterbide bat: asintota bertikala izendatzailearen erroa da ($x-1=0$, $x=1$), eta horizontala $x$-en koefizienteen zatidura ($y=\\frac{2}{1}=2$). Orokorrean, $y=\\dfrac{ax+b}{cx+d}$ funtzioan, $x=\\frac{-d}{c}$ eta $y=\\frac{a}{c}$. Ebaki-puntuak: Y ardatza $f(0)=\\frac{b}{d}$ puntuan, eta X ardatza zenbakitzailea 0 egiten den lekuan ($2x+1=0$, $x=-\\frac{1}{2}$).',
            'Una función racional con polinomios de primer grado en el numerador y en el denominador también es una hipérbola. Se ve haciendo la división: al dividir $\\dfrac{2x+1}{x-1}$ el cociente es 2 y el resto 3, así que $y=2+\\dfrac{3}{x-1}$, la hipérbola $y=\\frac{3}{x}$ llevada 1 a la derecha y 2 hacia arriba. Un atajo: la asíntota vertical es la raíz del denominador ($x-1=0$, $x=1$), y la horizontal el cociente de los coeficientes de $x$ ($y=\\frac{2}{1}=2$). En general, en $y=\\dfrac{ax+b}{cx+d}$, $x=\\frac{-d}{c}$ e $y=\\frac{a}{c}$. Cortes: el eje Y en $f(0)=\\frac{b}{d}$, y el eje X donde se anula el numerador ($2x+1=0$, $x=-\\frac{1}{2}$).',
            'الدالة الكسرية التي بسطها ومقامها من الدرجة الأولى قطع زائد أيضًا. ويظهر ذلك بالقسمة: عند قسمة $\\dfrac{2x+1}{x-1}$ يكون الناتج 2 والباقي 3، إذن $y=2+\\dfrac{3}{x-1}$، أي القطع $y=\\frac{3}{x}$ منقولًا 1 إلى اليمين و2 إلى الأعلى. اختصار: المقارب الرأسي جذر المقام ($x-1=0$، $x=1$)، والأفقي ناتج قسمة معاملي $x$ ($y=\\frac{2}{1}=2$). وعمومًا في $y=\\dfrac{ax+b}{cx+d}$ يكون $x=\\frac{-d}{c}$ و$y=\\frac{a}{c}$. التقاطعات: محور Y عند $f(0)=\\frac{b}{d}$، ومحور X حيث ينعدم البسط ($2x+1=0$، $x=-\\frac{1}{2}$).', 'A rational function with first-degree polynomials in the numerator and the denominator is also a hyperbola. You can see this by doing the division: when you divide $\\dfrac{2x+1}{x-1}$, the quotient is 2 and the remainder is 3, so $y=2+\\dfrac{3}{x-1}$, which is the hyperbola $y=\\frac{3}{x}$ moved 1 to the right and 2 up. A shortcut: the vertical asymptote is the root of the denominator ($x-1=0$, $x=1$), and the horizontal one is the ratio of the coefficients of $x$ ($y=\\frac{2}{1}=2$). In general, for $y=\\dfrac{ax+b}{cx+d}$, $x=\\frac{-d}{c}$ and $y=\\frac{a}{c}$. Where it crosses the axes: the y-axis at $f(0)=\\frac{b}{d}$, and the x-axis where the numerator is 0 ($2x+1=0$, $x=-\\frac{1}{2}$).'
        ),
        problem: say('Kalkulatu $y=\\frac{2x+1}{x-1}$ funtzioaren asintotak.', 'Halla las asíntotas de $y=\\frac{2x+1}{x-1}$.', 'أوجد مقاربي $y=\\frac{2x+1}{x-1}$.', 'Find the asymptotes of $y=\\frac{2x+1}{x-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu: zatidura 2, hondarra 3.', 'Divide: cociente 2, resto 3.', 'اقسم: الناتج 2 والباقي 3.', 'Divide: quotient 2, remainder 3.'), math: same('$y=2+\\frac{3}{x-1}$') },
            { text: say('Asintota bertikala.', 'Asíntota vertical.', 'المقارب الرأسي.', 'Vertical asymptote.'), math: same('$x=1$') },
            { text: say('Asintota horizontala.', 'Asíntota horizontal.', 'المقارب الأفقي.', 'Horizontal asymptote.'), math: same('$y=2$') }
        ],
        example: same('$y=\\frac{a}{c}$'),
        takeaway: say('Zatitu eta hiperbola lekualdatua agertzen da. Bertikala: izendatzailea 0. Horizontala: a/c.', 'Divide y aparece una hipérbola trasladada. Vertical: denominador 0. Horizontal: a/c.', 'اقسم فيظهر قطع زائد مسحوب. الرأسي: المقام 0. الأفقي: a/c.', 'Divide, and a translated hyperbola appears. Vertical: denominator = 0. Horizontal: a/c.'),
        figure: (language) => <RationalFormFigure language={language} />
    }
]
