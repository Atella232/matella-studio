import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AffineFigure, ExtremesFigure, InterceptsFigure, LineEquationFigure, ProportionalFigure, ReadFigure, SlopeFigure, TableFigure, VariationFigure } from '../dbh2-funtzioak-v2/figures'
import { ParabolaCutsFigure } from '../dbh4-akademikoak-polinomikoak/figures'
import { DomainGraphFigure } from '../dbh4-aplikatuak-funtzioak/figures'
import { LinearModelsFigure, ParabolaShapesFigure, ParallelFigure, VertexFigure } from '../dbh4-aplikatuak-grafikoa/figures'
import { functions3LessonChecks, type Functions3TopicId } from './lessonChecks'
import { functions3LessonTexts } from './lessonTexts'
import { say, same } from './text'

/* ==========================================================================
   Funtzioak · 3. DBH — stages and lessons. The course lists one topic,
   «Funciones lineales», so it gathers Santillana 3.º ESO units 11
   «Funciones» (graphs and their features) and 12 «Funciones lineales y
   cuadráticas», and Anaya 3.º ESO units 8 «Funciones y gráficas» and 9
   «Funciones lineales». Every number and context is original: the books
   only fix the scope and the order. Each lesson names its typical mistake.
   ========================================================================== */

export type Functions3StageId = 'graphs' | 'features' | 'linear' | 'lines' | 'quadratic'

export const functions3Stages: UnitStage[] = [
    { id: 'graphs', tone: 'blue', title: { eu: 'Funtzioak eta grafikoak', es: 'Funciones y gráficas', en: 'Functions and graphs', ar: 'الدوال والتمثيلات البيانية' } },
    { id: 'features', tone: 'violet', title: { eu: 'Ezaugarriak', es: 'Características', en: 'Features', ar: 'الخصائص' } },
    { id: 'linear', tone: 'mustard', title: { eu: 'Funtzio linealak', es: 'Funciones lineales', en: 'Linear functions', ar: 'الدوال الخطية' } },
    { id: 'lines', tone: 'coral', title: { eu: 'Zuzenak eta ereduak', es: 'Rectas y modelos', en: 'Lines and models', ar: 'المستقيمات والنماذج' } },
    { id: 'quadratic', tone: 'green', title: { eu: 'Funtzio koadratikoak', es: 'Funciones cuadráticas', en: 'Quadratic functions', ar: 'الدوال التربيعية' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Functions and graphs ---------- */
    {
        id: 'function-concept',
        stage: 'graphs',
        title: say('Funtzio baten kontzeptua', 'Concepto de función', 'مفهوم الدالة', 'What a function is'),
        goal: say('Funtzio bat taula, grafiko eta formula gisa ezagutzea.', 'Reconocer una función como tabla, gráfica y fórmula.', 'التعرّف على الدالة كجدول وتمثيل بياني وصيغة.', 'Recognise a function as a table, a graph and a formula.'),
        needs: [{ unit: 'dbh2/funciones', topic: 'function', title: { eu: 'Noiz da erlazio bat funtzioa?', es: '¿Cuándo una relación es función?', en: 'When is a relationship a function?', ar: 'متى تكون العلاقة دالة؟' } }],
        problem: say('$f(x)=x^{2}-3x$. Zenbat da $f(-2)$?', '$f(x)=x^{2}-3x$. ¿Cuánto vale $f(-2)$?', '$f(x)=x^{2}-3x$. كم يساوي $f(-2)$؟', '$f(x)=x^{2}-3x$. What is $f(-2)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatu, negatiboa parentesi artean.', 'Sustituye, con el negativo entre paréntesis.', 'عوّض، والسالب بين قوسين.', 'Substitute, with the negative number in brackets.'), math: same('$(-2)^{2}-3\\cdot(-2)$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Work it out.'), math: same('$4+6=10$') }
        ],
        takeaway: say('$x$ bakoitzari $y$ BAKAR bat.', 'A cada $x$, UN SOLO $y$.', 'لكل $x$ قيمة $y$ واحدة فقط.', 'Each $x$ gets ONE $y$ only.'),
        figure: (language) => <TableFigure language={language} />
    },
    {
        id: 'domain-range',
        stage: 'graphs',
        title: say('Definizio-eremua eta ibilbidea', 'Dominio y recorrido', 'المجال والمدى', 'Domain and range'),
        goal: say('Grafiko batean funtzioak hartzen dituen $x$ eta $y$ balioak irakurtzea.', 'Leer en una gráfica qué valores de $x$ y de $y$ toma la función.', 'قراءة قيم $x$ و$y$ التي تأخذها الدالة من تمثيلها البياني.', 'Read off a graph which values of $x$ and $y$ the function takes.'),
        needs: [{ unit: 'dbh3/potencias-raices', topic: 'intervals', title: { eu: 'Tarteak', es: 'Intervalos', en: 'Intervals', ar: 'الفترات' } }],
        problem: say('Zein da $f(x)=\\frac{1}{x-4}$ funtzioaren definizio-eremutik kanpo geratzen den zenbakia?', '¿Qué número queda fuera del dominio de $f(x)=\\frac{1}{x-4}$?', 'أي عدد يقع خارج مجال $f(x)=\\frac{1}{x-4}$؟', 'Which number is left out of the domain of $f(x)=\\frac{1}{x-4}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea ezin da zero izan.', 'El denominador no puede ser cero.', 'لا يكون المقام صفرًا.', 'The denominator cannot be zero.'), math: same('$x-4=0\\ \\to\\ x=4$') }
        ],
        takeaway: say('Eremua: $x$ ardatza. Ibilbidea: $y$ ardatza.', 'Dominio: eje $x$. Recorrido: eje $y$.', 'المجال: محور $x$. المدى: محور $y$.', 'Domain: the $x$ axis. Range: the $y$ axis.'),
        figure: (language) => <DomainGraphFigure language={language} />
    },
    {
        id: 'reading-graphs',
        stage: 'graphs',
        title: say('Grafikoak irakurri', 'Leer gráficas', 'قراءة التمثيلات البيانية', 'Reading graphs'),
        goal: say('Egoera erreal baten grafikoa interpretatzea.', 'Interpretar la gráfica de una situación real.', 'تفسير التمثيل البياني لموقف حقيقي.', 'Interpret the graph of a real situation.'),
        needs: [{ unit: 'dbh2/funciones', topic: 'graph-reading', title: { eu: 'Balioak grafikotik irakurri', es: 'Leer valores en una gráfica', en: 'Reading values from a graph', ar: 'قراءة القيم من الرسم' } }],
        problem: say('Ibilaldi batean, 2 orduan 8 km egin dira, gero ordubete geldirik, eta itzuli 2 orduan. Zenbat km dira gehienez etxetik?', 'En una excursión se recorren 8 km en 2 horas, se para una hora y se vuelve en 2 horas. ¿A cuántos km se llega de casa como mucho?', 'في رحلة يُقطع 8 كم في ساعتين، ثم توقّف ساعة، ثم عودة في ساعتين. ما أبعد مسافة عن البيت؟', 'On a walk, 8 km are covered in 2 hours, then a one-hour stop, then back in 2 hours. How far from home does it get at most?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati gorakorra: 8 km-raino.', 'Tramo creciente: hasta 8 km.', 'الجزء الصاعد: حتى 8 كم.', 'Rising stretch: up to 8 km.') },
            { text: say('Geldialdia: altuera bera.', 'Parada: la misma altura.', 'التوقف: الارتفاع نفسه.', 'Stop: the same height.'), math: same('$y=8$') }
        ],
        takeaway: say('Lehenik ARDATZAK; gero gora, horizontal, behera.', 'Primero los EJES; después sube, horizontal, baja.', 'أولًا المحوران؛ ثم صعود وأفقي ونزول.', 'First the AXES; then up, flat, down.'),
        figure: (language) => <ReadFigure language={language} />
    },
    /* ---------- 2. Features ---------- */
    {
        id: 'growth',
        stage: 'features',
        title: say('Gorakortasuna eta beherakortasuna', 'Crecimiento y decrecimiento', 'التزايد والتناقص', 'Increasing and decreasing'),
        goal: say('Funtzio bat non hazten eta non gutxitzen den tarteetan idaztea.', 'Escribir en intervalos dónde crece y dónde decrece una función.', 'كتابة أين تتزايد الدالة وأين تتناقص بالفترات.', 'Write in intervals where a function increases and where it decreases.'),
        problem: say('$f(x)=x^{2}$. Gorakorra ala beherakorra da $x<0$ denean?', '$f(x)=x^{2}$. ¿Es creciente o decreciente para $x<0$?', '$f(x)=x^{2}$. هل هي متزايدة أم متناقصة عندما $x<0$؟', '$f(x)=x^{2}$. Is it increasing or decreasing for $x<0$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Probatu bi balio.', 'Prueba dos valores.', 'جرّب قيمتين.', 'Try two values.'), math: same('$f(-3)=9,\\ f(-1)=1$') },
            { text: say('$x$ handitzean $y$ gutxitzen da: beherakorra.', 'Al aumentar $x$ disminuye $y$: decreciente.', 'عندما يزداد $x$ ينقص $y$: متناقصة.', 'As $x$ grows, $y$ falls: decreasing.') }
        ],
        takeaway: say('Ezkerretik eskuinera: igo = GORAKORRA, jaitsi = BEHERAKORRA.', 'De izquierda a derecha: sube = CRECIENTE, baja = DECRECIENTE.', 'من اليسار إلى اليمين: صعود = متزايدة، نزول = متناقصة.', 'Left to right: up = INCREASING, down = DECREASING.'),
        figure: (language) => <VariationFigure language={language} />
    },
    {
        id: 'extremes',
        stage: 'features',
        title: say('Maximoak eta minimoak', 'Máximos y mínimos', 'القيم العظمى والصغرى', 'Maxima and minima'),
        goal: say('Funtzio baten maximo eta minimo erlatiboak eta absolutuak aurkitzea.', 'Encontrar los máximos y mínimos relativos y absolutos de una función.', 'إيجاد القيم العظمى والصغرى النسبية والمطلقة لدالة.', 'Find the relative and absolute maxima and minima of a function.'),
        problem: say('Taula: $x=0,1,2,3,4$ eta $y=2,5,6,3,1$. Zein da maximoa?', 'Tabla: $x=0,1,2,3,4$ e $y=2,5,6,3,1$. ¿Cuál es el máximo?', 'الجدول: $x=0,1,2,3,4$ و$y=2,5,6,3,1$. ما القيمة العظمى؟', 'Table: $x=0,1,2,3,4$ and $y=2,5,6,3,1$. What is the maximum?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$y$ balioa 6 arte igotzen da eta gero jaisten da.', '$y$ sube hasta 6 y luego baja.', 'يصعد $y$ إلى 6 ثم ينزل.', '$y$ rises to 6 and then falls.') },
            { text: say('Maximoa:', 'Máximo:', 'العظمى:', 'Maximum:'), math: same('$(2,6)$') }
        ],
        takeaway: say('Maximoa: GORA → BEHERA. Minimoa: BEHERA → GORA.', 'Máximo: SUBE → BAJA. Mínimo: BAJA → SUBE.', 'العظمى: صعود ← نزول. الصغرى: نزول ← صعود.', 'Maximum: UP → DOWN. Minimum: DOWN → UP.'),
        figure: (language) => <ExtremesFigure language={language} />
    },
    {
        id: 'intercepts',
        stage: 'features',
        title: say('Ardatzekiko ebaki-puntuak', 'Puntos de corte con los ejes', 'نقاط التقاطع مع المحورين', 'Where a graph meets the axes'),
        goal: say('Grafikoak ardatzak non mozten dituen kalkulatzea.', 'Calcular dónde corta la gráfica a los ejes.', 'حساب أين يقطع التمثيل المحورين.', 'Work out where the graph meets the axes.'),
        needs: [{ unit: 'dbh2/ekuazioak', topic: 'simple', title: { eu: 'x bi ataletan', es: 'La x en los dos miembros', en: 'The x on both sides', ar: 'x في الطرفين' } }],
        problem: say('$f(x)=2x-6$. Non mozten ditu ardatzak?', '$f(x)=2x-6$. ¿Dónde corta a los ejes?', '$f(x)=2x-6$. أين تقطع المحورين؟', '$f(x)=2x-6$. Where does it meet the axes?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatza: $x=0$.', 'Eje Y: $x=0$.', 'محور Y: $x=0$.', 'Y axis: $x=0$.'), math: same('$f(0)=-6\\ \\to\\ (0,-6)$') },
            { text: say('X ardatza: $f(x)=0$.', 'Eje X: $f(x)=0$.', 'محور X: $f(x)=0$.', 'X axis: $f(x)=0$.'), math: same('$2x-6=0\\ \\to\\ (3,0)$') }
        ],
        takeaway: say('Y ardatza: $x=0$. X ardatza: $y=0$.', 'Eje Y: $x=0$. Eje X: $y=0$.', 'محور Y: $x=0$. محور X: $y=0$.', 'Y axis: $x=0$. X axis: $y=0$.'),
        figure: (language) => <InterceptsFigure language={language} />
    },
    /* ---------- 3. Linear functions ---------- */
    {
        id: 'proportional',
        stage: 'linear',
        figureAfterSteps: true,
        title: say('Proportzionaltasun zuzeneko funtzioak', 'Funciones de proporcionalidad directa', 'دوال التناسب الطردي', 'Direct proportion functions'),
        goal: say('$y=mx$ funtzioak ezagutzea eta haien grafikoa marraztea.', 'Reconocer las funciones $y=mx$ y dibujar su gráfica.', 'التعرّف على الدوال $y=mx$ ورسم تمثيلها.', 'Recognise the functions $y=mx$ and draw their graph.'),
        needs: [{ unit: 'dbh3/proporcionalidad', topic: 'direct', title: { eu: 'Proportzionaltasun zuzena', es: 'Proporcionalidad directa', en: 'Direct proportion', ar: 'التناسب الطردي' } }],
        problem: say('3 kg sagarrek 6 € balio dute. Zein da funtzioa, eta zenbat balio dute 7 kg-k?', '3 kg de manzanas cuestan 6 €. ¿Cuál es la función y cuánto cuestan 7 kg?', '3 كغ تفاح بـ 6 يورو. ما الدالة وكم ثمن 7 كغ؟', '3 kg of apples cost €6. What is the function and how much do 7 kg cost?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konstantea.', 'La constante.', 'الثابت.', 'The constant.'), math: same('$m=\\frac{6}{3}=2\\ \\to\\ y=2x$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$2\\cdot 7=14$') }
        ],
        takeaway: say('$y=mx$: zuzena JATORRITIK, $m=\\frac{y}{x}$.', '$y=mx$: recta por el ORIGEN, $m=\\frac{y}{x}$.', '$y=mx$: مستقيم يمر بالأصل، $m=\\frac{y}{x}$.', '$y=mx$: a line through the ORIGIN, $m=\\frac{y}{x}$.'),
        figure: (language) => <ProportionalFigure language={language} />
    },
    {
        id: 'slope',
        stage: 'linear',
        title: say('Malda', 'La pendiente', 'الميل', 'The slope'),
        goal: say('Zuzen baten malda bi puntutatik kalkulatzea eta interpretatzea.', 'Calcular la pendiente de una recta a partir de dos puntos e interpretarla.', 'حساب ميل مستقيم من نقطتين وتفسيره.', 'Work out the slope of a line from two points and interpret it.'),
        problem: say('$A=(1,2)$ eta $B=(4,11)$. Zein da malda?', '$A=(1,2)$ y $B=(4,11)$. ¿Cuál es la pendiente?', '$A=(1,2)$ و$B=(4,11)$. ما الميل؟', '$A=(1,2)$ and $B=(4,11)$. What is the slope?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Igoera zati aurrerapena.', 'Subida entre avance.', 'الصعود على التقدم.', 'Rise over run.'), math: same('$m=\\frac{11-2}{4-1}=\\frac{9}{3}=3$') }
        ],
        takeaway: same('$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$'),
        figure: (language) => <SlopeFigure language={language} />
    },
    {
        id: 'affine',
        stage: 'linear',
        title: say('Funtzio afinak', 'Funciones afines', 'الدوال التآلفية', 'Affine functions'),
        goal: say('$y=mx+n$ funtzioa irakurtzea eta marraztea.', 'Leer y dibujar la función $y=mx+n$.', 'قراءة الدالة $y=mx+n$ ورسمها.', 'Read and draw the function $y=mx+n$.'),
        problem: say('Marraztu $y=-2x+3$.', 'Dibuja $y=-2x+3$.', 'ارسم $y=-2x+3$.', 'Draw $y=-2x+3$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatzarekiko puntua.', 'Punto en el eje Y.', 'النقطة على محور Y.', 'Point on the Y axis.'), math: same('$(0,3)$') },
            { text: say('1 eskuinera, 2 behera.', '1 a la derecha, 2 hacia abajo.', '1 يمينًا و2 إلى الأسفل.', '1 to the right, 2 down.'), math: same('$(1,1)$') },
            { text: say('Egiaztatu beste puntu bat.', 'Comprueba otro punto.', 'تحقّق بنقطة أخرى.', 'Check another point.'), math: same('$-2\\cdot 2+3=-1$') }
        ],
        takeaway: say('$y=mx+n$: $m$ malda, $n$ Y ardatzean.', '$y=mx+n$: $m$ pendiente, $n$ en el eje Y.', '$y=mx+n$: $m$ الميل و$n$ على محور Y.', '$y=mx+n$: $m$ slope, $n$ on the Y axis.'),
        figure: (language) => <AffineFigure language={language} />
    },
    /* ---------- 4. Lines and models ---------- */
    {
        id: 'two-points',
        stage: 'lines',
        title: say('Bi puntutatik igarotzen den zuzena', 'Recta que pasa por dos puntos', 'المستقيم المار بنقطتين', 'The line through two points'),
        goal: say('Bi puntu ezagututa, zuzenaren ekuazioa aurkitzea.', 'Hallar la ecuación de la recta conociendo dos puntos.', 'إيجاد معادلة المستقيم بمعرفة نقطتين.', 'Find the equation of the line through two known points.'),
        problem: say('Aurkitu $(1,5)$ eta $(3,9)$ puntuetatik igarotzen den zuzena.', 'Halla la recta que pasa por $(1,5)$ y $(3,9)$.', 'جد المستقيم المار بـ$(1,5)$ و$(3,9)$.', 'Find the line through $(1,5)$ and $(3,9)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Malda.', 'Pendiente.', 'الميل.', 'Slope.'), math: same('$m=\\frac{9-5}{3-1}=2$') },
            { text: say('Ordezkatu $(1,5)$.', 'Sustituye $(1,5)$.', 'عوّض $(1,5)$.', 'Substitute $(1,5)$.'), math: same('$5=2\\cdot 1+n\\ \\to\\ n=3$') },
            { text: say('Zuzena eta egiaztapena.', 'Recta y comprobación.', 'المستقيم والتحقق.', 'Line and check.'), math: same('$y=2x+3\\qquad 2\\cdot 3+3=9\\ \\checkmark$') }
        ],
        takeaway: say('Lehenik $m$; gero puntu bat ordezkatu $n$ lortzeko.', 'Primero $m$; después sustituye un punto para hallar $n$.', 'أولًا $m$؛ ثم عوّض نقطة لإيجاد $n$.', 'First $m$; then substitute a point to find $n$.'),
        figure: (language) => <LineEquationFigure language={language} />
    },
    {
        id: 'parallel-lines',
        stage: 'lines',
        title: say('Zuzen paraleloak eta ebakidurak', 'Rectas paralelas y cortes', 'المستقيمات المتوازية والتقاطعات', 'Parallel lines and crossings'),
        goal: say('Bi zuzen paraleloak diren jakitea eta haien ebakidura-puntua kalkulatzea.', 'Saber si dos rectas son paralelas y calcular su punto de corte.', 'معرفة ما إذا كان مستقيمان متوازيين وحساب نقطة تقاطعهما.', 'Tell whether two lines are parallel and work out where they cross.'),
        needs: [{ unit: 'dbh3/ecuaciones-sistemas', topic: 'equalisation', title: { eu: 'Berdinketa metodoa', es: 'Método de igualación', en: 'The equalisation method', ar: 'طريقة المساواة' } }],
        problem: say('$y=3x-1$ eta $y=x+5$. Non ebakitzen dira?', '$y=3x-1$ e $y=x+5$. ¿Dónde se cortan?', '$y=3x-1$ و$y=x+5$. أين يتقاطعان؟', '$y=3x-1$ and $y=x+5$. Where do they cross?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set equal.'), math: same('$3x-1=x+5\\ \\to\\ x=3$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$y=3+5=8\\ \\to\\ (3,8)$') }
        ],
        takeaway: say('Paraleloak: $m$ BERA. Ebakidura: berdindu.', 'Paralelas: la MISMA $m$. Corte: igualar.', 'المتوازيان: $m$ نفسه. التقاطع: المساواة.', 'Parallel: the SAME $m$. Crossing: set equal.'),
        figure: (language) => <ParallelFigure language={language} />
    },
    {
        id: 'linear-problems',
        stage: 'lines',
        title: say('Eredu linealak', 'Modelos lineales', 'النماذج الخطية', 'Linear models'),
        goal: say('Egoera erreal bat funtzio afin batekin adieraztea eta erabiltzea.', 'Expresar una situación real con una función afín y usarla.', 'التعبير عن موقف حقيقي بدالة تآلفية واستعمالها.', 'Describe a real situation with an affine function and use it.'),
        needs: [{ unit: 'dbh3/ecuaciones-sistemas', topic: 'graphic', title: { eu: 'Ebazpen grafikoa', es: 'Resolución gráfica', en: 'Solving graphically', ar: 'الحل البياني' } }],
        problem: say('A tarifa: 10 € gehi 2 € orduko. B tarifa: 4 € orduko. Zenbat ordutan balio dute berdin?', 'Tarifa A: 10 € más 2 € por hora. Tarifa B: 4 € por hora. ¿A cuántas horas cuestan lo mismo?', 'التعريفة A: 10 يورو زائد 2 يورو للساعة. التعريفة B: 4 يورو للساعة. بعد كم ساعة تتساويان؟', 'Price A: €10 plus €2 an hour. Price B: €4 an hour. After how many hours do they cost the same?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Funtzioak.', 'Las funciones.', 'الدالتان.', 'The functions.'), math: same('$y=2x+10,\\ y=4x$') },
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set equal.'), math: same('$2x+10=4x\\ \\to\\ x=5$') }
        ],
        takeaway: say('Tarifa = $m$ · unitateak + $n$ finkoa.', 'Tarifa = $m$ · unidades + $n$ fijo.', 'التعريفة = $m$ · الوحدات + $n$ الثابت.', 'Price = $m$ · units + fixed $n$.'),
        figure: (language) => <LinearModelsFigure language={language} />
    },
    /* ---------- 5. Quadratic functions ---------- */
    {
        id: 'parabola-shape',
        stage: 'quadratic',
        title: say('Parabola', 'La parábola', 'القطع المكافئ', 'The parabola'),
        goal: say('$y=ax^{2}+bx+c$ funtzioaren grafikoa parabola bat dela eta $a$ zeinuak zer esaten duen jakitea.', 'Saber que la gráfica de $y=ax^{2}+bx+c$ es una parábola y qué dice el signo de $a$.', 'معرفة أن تمثيل $y=ax^{2}+bx+c$ قطع مكافئ وما تقوله إشارة $a$.', 'Know that the graph of $y=ax^{2}+bx+c$ is a parabola and what the sign of $a$ tells you.'),
        problem: say('$y=-2x^{2}+3x+5$: gora ala behera irekitzen da, eta non mozten du Y ardatza?', '$y=-2x^{2}+3x+5$: ¿se abre hacia arriba o hacia abajo, y dónde corta al eje Y?', '$y=-2x^{2}+3x+5$: هل ينفتح إلى الأعلى أم إلى الأسفل، وأين يقطع محور Y؟', '$y=-2x^{2}+3x+5$: does it open up or down, and where does it meet the Y axis?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a=-2<0$: behera.', '$a=-2<0$: hacia abajo.', '$a=-2<0$: إلى الأسفل.', '$a=-2<0$: down.') },
            { text: say('Y ardatza: $c$.', 'Eje Y: $c$.', 'محور Y: $c$.', 'Y axis: $c$.'), math: same('$(0,5)$') }
        ],
        takeaway: say('$a>0$: ∪ (minimoa). $a<0$: ∩ (maximoa).', '$a>0$: ∪ (mínimo). $a<0$: ∩ (máximo).', '$a>0$: ∪ (صغرى). $a<0$: ∩ (عظمى).', '$a>0$: ∪ (minimum). $a<0$: ∩ (maximum).'),
        figure: (language) => <ParabolaShapesFigure language={language} />
    },
    {
        id: 'vertex',
        stage: 'quadratic',
        title: say('Erpina eta simetria-ardatza', 'Vértice y eje de simetría', 'الرأس ومحور التناظر', 'The vertex and the axis of symmetry'),
        goal: say('Parabola baten erpina kalkulatzea.', 'Calcular el vértice de una parábola.', 'حساب رأس القطع المكافئ.', 'Work out the vertex of a parabola.'),
        problem: say('Aurkitu $y=x^{2}-6x+5$ parabolaren erpina.', 'Halla el vértice de $y=x^{2}-6x+5$.', 'جد رأس $y=x^{2}-6x+5$.', 'Find the vertex of $y=x^{2}-6x+5$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x$ koordenatua.', 'Coordenada $x$.', 'الإحداثي $x$.', 'The $x$ coordinate.'), math: same('$x_{v}=\\frac{6}{2}=3$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$9-18+5=-4\\ \\to\\ (3,-4)$') }
        ],
        takeaway: same('$x_{v}=\\frac{-b}{2a}$'),
        figure: (language) => <VertexFigure language={language} />
    },
    {
        id: 'parabola-intercepts',
        stage: 'quadratic',
        title: say('Parabolaren ebaki-puntuak', 'Cortes de la parábola con los ejes', 'تقاطعات القطع المكافئ مع المحورين', 'Where a parabola meets the axes'),
        goal: say('Parabola bat marraztea erpinarekin eta ebaki-puntuekin.', 'Dibujar una parábola con su vértice y sus cortes con los ejes.', 'رسم قطع مكافئ برأسه وتقاطعاته مع المحورين.', 'Draw a parabola with its vertex and where it meets the axes.'),
        needs: [{ unit: 'dbh3/ecuaciones-sistemas', topic: 'discriminant', title: { eu: 'Diskriminatzailea', es: 'El discriminante', en: 'The discriminant', ar: 'المميّز' } }],
        problem: say('$y=x^{2}-2x-8$: non mozten ditu ardatzak?', '$y=x^{2}-2x-8$: ¿dónde corta a los ejes?', '$y=x^{2}-2x-8$: أين يقطع المحورين؟', '$y=x^{2}-2x-8$: where does it meet the axes?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatza.', 'Eje Y.', 'محور Y.', 'Y axis.'), math: same('$(0,-8)$') },
            { text: say('X ardatza.', 'Eje X.', 'محور X.', 'X axis.'), math: same('$x=\\frac{2\\pm 6}{2}\\ \\to\\ (4,0),\\ (-2,0)$') },
            { text: say('Erpina erdian.', 'El vértice, en medio.', 'الرأس في المنتصف.', 'The vertex, halfway.'), math: same('$x_{v}=\\frac{4+(-2)}{2}=1$') }
        ],
        takeaway: say('Y ardatza: $(0,c)$. X ardatza: $ax^{2}+bx+c=0$.', 'Eje Y: $(0,c)$. Eje X: $ax^{2}+bx+c=0$.', 'محور Y: $(0,c)$. محور X: $ax^{2}+bx+c=0$.', 'Y axis: $(0,c)$. X axis: $ax^{2}+bx+c=0$.'),
        figure: (language) => <ParabolaCutsFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const functions3Topics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...functions3LessonTexts[topic.id as Functions3TopicId], ...functions3LessonChecks[topic.id as Functions3TopicId] }))
