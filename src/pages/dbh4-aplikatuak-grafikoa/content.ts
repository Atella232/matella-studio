import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseItem, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import type { GraphSpec } from '../dbh2-funtzioak-v2/functions.ts'
import { exponentialCurve, hyperbolaBranches, rootCurve, sampled } from './functions.ts'

/* ==========================================================================
   Funtzio baten grafikoa · 4. DBH aplikatuak — diagnostic, guided practice,
   exercise bank and challenges. Exercises follow Santillana Aplicadas 4,
   unit 8 (bottles at 1,25 €, eggs at 1,75 € a dozen, the runner at 9 km/h,
   y = mx through (−5, 10), comics for 100 €, the 180 € coach, the cows and
   their fodder, exponential bases) and Anaya Aplicadas 4, unit 9
   (Fahrenheit, the spring 30 + 15x, the braking car, lines through a point
   or two, parallels, vertices and shifted parabolas, the frame made from a
   3 m lath, the ball thrown from the springboard, hyperbolas, roots,
   y = k·aˣ through (0, 3) and (1; 3,6), Ana's salary and the unit cost of
   boxes). Every closed answer is a single number; exercises that read a
   graph carry it as a GraphSpec.
   ========================================================================== */

type WithGraph = { graph?: GraphSpec; solutionGraph?: GraphSpec }
export type GraphsDiagnosticQuestion = DiagnosticQuestion & WithGraph
export type GraphsPracticeItem = PracticeItem & WithGraph
export type GraphsChallengeItem = ChallengeItem & WithGraph
export type GraphsExerciseItem = ExerciseItem & WithGraph
export interface GraphsExerciseSection {
    id: string
    title: LocalizedText
    items: GraphsExerciseItem[]
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
const n = (value: number, denominator = 1) => fraction(value, denominator)

/* ---------- The graphs of the exercises (plain data, checked by the tests) ---------- */

/** The line through A(0, −2) and B(2, 1): m = 3/2 */
const lineGraph: GraphSpec = {
    box: { xMin: -2, xMax: 4, yMin: -4, yMax: 4 },
    cell: 30,
    lines: [{ m: 1.5, n: -2 }],
    points: [{ at: [0, -2], name: 'A', color: 'second', left: true }, { at: [2, 1], name: 'B', color: 'second' }]
}

/** y = x + 1 and y = −2x + 4 meet at (1, 2) */
const twoLinesGraph: GraphSpec = {
    box: { xMin: -2, xMax: 4, yMin: -2, yMax: 5 },
    cell: 30,
    lines: [{ m: 1, n: 1 }, { m: -2, n: 4, color: 'second' }]
}

/** y = x² − 2x − 3: vertex (1, −4), roots −1 and 3 */
const parabolaGraph: GraphSpec = {
    box: { xMin: -3, xMax: 5, yMin: -5, yMax: 6 },
    cell: 26,
    curves: [{ points: sampled((x) => x * x - 2 * x - 3, -3, 5) }]
}

/** y = 6/x through P(2, 3) */
const hyperbolaGraph: GraphSpec = {
    box: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 },
    cell: 22,
    labelStep: 2,
    curves: hyperbolaBranches(6, 0, 0, -6.5, 6.5, -6, 6).map((points) => ({ points })),
    points: [{ at: [2, 3], name: 'P', color: 'second' }]
}

/** y = √(x + 4): starts at (−4, 0), through (0, 2) and (5, 3) */
const rootGraph: GraphSpec = {
    box: { xMin: -5, xMax: 6, yMin: -1, yMax: 4 },
    cell: 28,
    curves: [{ points: rootCurve(1, -4, 0, 6.5) }],
    points: [{ at: [-4, 0], color: 'ink' }, { at: [0, 2], color: 'second' }, { at: [5, 3], color: 'second' }]
}

/** y = 4 · (1/2)ˣ through (0, 4), (1, 2) and (2, 1) */
const exponentialGraph: GraphSpec = {
    box: { xMin: -2, xMax: 4, yMin: 0, yMax: 9 },
    cell: 26,
    curves: [{ points: exponentialCurve(4, 0.5, -2, 4.5) }],
    points: [{ at: [0, 4], color: 'second' }, { at: [1, 2], color: 'second' }, { at: [2, 1], color: 'second' }]
}

export const exerciseGraphs = { lineGraph, twoLinesGraph, parabolaGraph, hyperbolaGraph, rootGraph, exponentialGraph }

/* ---------- Diagnostic ---------- */

export const graphsDiagnostic: GraphsDiagnosticQuestion[] = [
    {
        id: 4801,
        prompt: say('Zein da proportzionaltasun zuzeneko funtzioa?', '¿Cuál es una función de proporcionalidad directa?', 'أيّها دالة تناسب طردي؟', 'Which of these is a direct proportion function?'),
        options: [same('$y=3x-4$'), same('$y=5x$'), same('$y=\\frac{4}{x}$')],
        correctIndex: 1,
        explanation: say('$y=5x$ jatorritik pasatzen den zuzena da. $y=3x-4$ ez da jatorritik pasatzen eta $y=\\frac{4}{x}$ ez da zuzena.', '$y=5x$ es una recta que pasa por el origen. $y=3x-4$ no pasa por el origen e $y=\\frac{4}{x}$ no es una recta.', '$y=5x$ مستقيم يمر بالأصل. $y=3x-4$ لا يمر بالأصل و$y=\\frac{4}{x}$ ليست مستقيمًا.', '$y=5x$ is a straight line through the origin. $y=3x-4$ does not pass through the origin and $y=\\frac{4}{x}$ is not a straight line.'),
        topic: 'proportional'
    },
    {
        id: 4802,
        prompt: say('$y=-2x+5$ zuzenak Y ardatza ebakitzen du…', 'La recta $y=-2x+5$ corta al eje Y en…', 'يقطع المستقيم $y=-2x+5$ محور Y في…', 'The straight line $y=-2x+5$ crosses the y-axis at…'),
        options: [same('$(0,\\,5)$'), same('$(5,\\,0)$'), same('$(0,\\,-2)$')],
        correctIndex: 0,
        explanation: say('Y ardatzean $x=0$, beraz $y=5$: jatorriko ordenatua $n=5$ da.', 'En el eje Y, $x=0$, así que $y=5$: la ordenada en el origen es $n=5$.', 'على محور Y يكون $x=0$، إذن $y=5$: الجزء المقطوع $n=5$.', 'On the y-axis, $x=0$, so $y=5$: the y-intercept is $n=5$.'),
        topic: 'affine'
    },
    {
        id: 4803,
        prompt: say('Zein da $(1,\\,2)$ eta $(3,\\,8)$ puntuetatik pasatzen den zuzenaren malda?', '¿Cuál es la pendiente de la recta que pasa por $(1,\\,2)$ y $(3,\\,8)$?', 'ما ميل المستقيم المار بـ $(1,\\,2)$ و$(3,\\,8)$؟', 'What is the slope of the straight line through $(1,\\,2)$ and $(3,\\,8)$?'),
        options: [same('$2$'), same('$\\frac{1}{3}$'), same('$3$')],
        correctIndex: 2,
        explanation: same('$m=\\frac{8-2}{3-1}=\\frac{6}{2}=3$'),
        topic: 'slope'
    },
    {
        id: 4804,
        prompt: say('Zein zuzen da $y=3x-1$ zuzenaren paraleloa?', '¿Qué recta es paralela a $y=3x-1$?', 'أيّ مستقيم يوازي $y=3x-1$؟', 'Which straight line is parallel to $y=3x-1$?'),
        options: [same('$y=-3x+1$'), same('$y=3x+4$'), same('$y=\\frac{1}{3}x$')],
        correctIndex: 1,
        explanation: say('Paraleloek malda bera dute: $m=3$.', 'Las paralelas tienen la misma pendiente: $m=3$.', 'للمستقيمات المتوازية الميل نفسه: $m=3$.', 'Parallel lines have the same slope: $m=3$.'),
        topic: 'parallel'
    },
    {
        id: 4805,
        prompt: say('Nolakoa da $y=-2x^2+3$ parabola?', '¿Cómo es la parábola $y=-2x^2+3$?', 'كيف هو القطع المكافئ $y=-2x^2+3$؟', 'What is the parabola $y=-2x^2+3$ like?'),
        options: [say('Adarrak gora, minimoarekin', 'Ramas hacia arriba, con un mínimo', 'الفرعان للأعلى، مع قيمة صغرى', 'Opens upwards, with a minimum'), say('$(0,\\,-2)$ puntutik pasatzen da', 'Pasa por $(0,\\,-2)$', 'يمر بالنقطة $(0,\\,-2)$', 'Passes through $(0,\\,-2)$'), say('Adarrak behera, maximoarekin', 'Ramas hacia abajo, con un máximo', 'الفرعان للأسفل، مع قيمة عظمى', 'Opens downwards, with a maximum')],
        correctIndex: 2,
        explanation: say('$a=-2<0$: adarrak behera eta erpina maximoa da, $(0,\\,3)$ puntuan.', '$a=-2<0$: ramas hacia abajo y el vértice es un máximo, en $(0,\\,3)$.', '$a=-2<0$: الفرعان للأسفل والرأس قيمة عظمى في $(0,\\,3)$.', '$a=-2<0$: it opens downwards and the vertex is a maximum, at $(0,\\,3)$.'),
        topic: 'parabola'
    },
    {
        id: 4806,
        prompt: say('Zein da $y=x^2-6x+5$ parabolaren erpina?', '¿Cuál es el vértice de $y=x^2-6x+5$?', 'ما رأس $y=x^2-6x+5$؟', 'What is the vertex of $y=x^2-6x+5$?'),
        options: [same('$(3,\\,-4)$'), same('$(-3,\\,32)$'), same('$(6,\\,5)$')],
        correctIndex: 0,
        explanation: say('$x_V=\\frac{6}{2}=3$ eta $y_V=9-18+5=-4$.', '$x_V=\\frac{6}{2}=3$ e $y_V=9-18+5=-4$.', '$x_V=\\frac{6}{2}=3$ و$y_V=9-18+5=-4$.', '$x_V=\\frac{6}{2}=3$ and $y_V=9-18+5=-4$.'),
        topic: 'vertex'
    },
    {
        id: 4807,
        prompt: say('Zein da $y=\\frac{2}{x-3}$ funtzioaren asintota bertikala?', '¿Cuál es la asíntota vertical de $y=\\frac{2}{x-3}$?', 'ما المقارب الرأسي لـ $y=\\frac{2}{x-3}$؟', 'What is the vertical asymptote of $y=\\frac{2}{x-3}$?'),
        options: [same('$x=-3$'), same('$x=3$'), same('$y=3$')],
        correctIndex: 1,
        explanation: say('Izendatzailea 0 da $x=3$ denean.', 'El denominador vale 0 cuando $x=3$.', 'ينعدم المقام عندما $x=3$.', 'The denominator is 0 when $x=3$.'),
        topic: 'asymptotes'
    },
    {
        id: 4808,
        prompt: say('Urtero % 5 igotzen den kopuru bat urtero zenbatez biderkatzen da?', 'Una cantidad que sube un 5 % cada año, ¿por cuánto se multiplica cada año?', 'كمية تزيد 5 % كل سنة، في كم تُضرب كل سنة؟', 'A quantity rises by 5% each year: by what factor is it multiplied each year?'),
        options: [same('$0{,}05$'), same('$1{,}5$'), same('$1{,}05$')],
        correctIndex: 2,
        explanation: say('% 5 igotzea: $1+\\frac{5}{100}=1{,}05$.', 'Subir un 5 %: $1+\\frac{5}{100}=1{,}05$.', 'الزيادة 5 %: $1+\\frac{5}{100}=1{,}05$.', 'To increase by 5%: $1+\\frac{5}{100}=1{,}05$.'),
        topic: 'growth'
    }
]

/* ---------- Guided practice ---------- */

export const graphsPractice: GraphsPracticeItem[] = [
    /* Linear functions */
    { id: 1, stage: 'linear', prompt: say('$y=mx$ funtzioa $(4,\\,10)$ puntutik pasatzen da. Zenbat da $m$?', 'La función $y=mx$ pasa por $(4,\\,10)$. ¿Cuánto vale $m$?', 'تمر الدالة $y=mx$ بالنقطة $(4,\\,10)$. كم تساوي $m$؟', 'The function $y=mx$ passes through $(4,\\,10)$. What is $m$?'), expected: n(5, 2), hint: say('$m=\\frac{y}{x}$', '$m=\\frac{y}{x}$', '$m=\\frac{y}{x}$', '$m=\\frac{y}{x}$'), explanation: same('$m=\\frac{10}{4}=2{,}5$') },
    { id: 2, stage: 'linear', prompt: say('Non ebakitzen du $y=-3x+6$ zuzenak X ardatza? Eman $x$.', '¿Dónde corta la recta $y=-3x+6$ al eje X? Da la $x$.', 'أين يقطع المستقيم $y=-3x+6$ محور X؟ أعطِ $x$.', 'Where does the straight line $y=-3x+6$ cross the x-axis? Give the $x$-value.'), expected: n(2), hint: say('Egin $y=0$.', 'Haz $y=0$.', 'ضع $y=0$.', 'Put $y=0$.'), explanation: same('$-3x+6=0\\to 3x=6\\to x=2$') },
    { id: 3, stage: 'linear', prompt: say('Malguki baten luzera $y=30+15x$ da ($x$ kg, $y$ cm). Zenbat kilo zintzilikatu behar dira 75 cm neur dezan?', 'La longitud de un muelle es $y=30+15x$ ($x$ en kg, $y$ en cm). ¿Cuántos kilos hay que colgar para que mida 75 cm?', 'طول نابض $y=30+15x$ ($x$ بالكغ و$y$ بالسم). كم كيلوغرامًا نعلق ليصبح طوله 75 سم؟', 'The length of a spring is $y=30+15x$ ($x$ in kg, $y$ in cm). How many kilograms do you need to hang on it so that it is 75 cm long?'), expected: n(3), hint: say('Ebatzi $30+15x=75$.', 'Resuelve $30+15x=75$.', 'حُلّ $30+15x=75$.', 'Solve $30+15x=75$.'), explanation: same('$15x=75-30=45\\to x=\\frac{45}{15}=3$') },
    { id: 4, stage: 'linear', prompt: say('Mugikor bat jatorritik 3 m-ra dago eta 2 m/s-ra urruntzen da: $y=3+2x$. Zenbat metrora dago 8 segundoren buruan?', 'Un móvil está a 3 m del origen y se aleja a 2 m/s: $y=3+2x$. ¿A cuántos metros está a los 8 segundos?', 'متحرك على بعد 3 م من الأصل ويبتعد بسرعة 2 م/ث: $y=3+2x$. على كم مترًا يكون بعد 8 ثوانٍ؟', 'A moving object is 3 m from the origin and moves away at 2 m/s: $y=3+2x$. How many metres away is it after 8 seconds?'), expected: n(19), hint: say('Ordeztu $x=8$.', 'Sustituye $x=8$.', 'عوّض $x=8$.', 'Substitute $x=8$.'), explanation: same('$3+2\\cdot 8=3+16=19$') },
    /* The equation of a line */
    { id: 5, stage: 'lines', prompt: say('Kalkulatu $(3,\\,-5)$ eta $(-4,\\,7)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $(3,\\,-5)$ y $(-4,\\,7)$.', 'احسب ميل المستقيم المار بـ $(3,\\,-5)$ و$(-4,\\,7)$.', 'Calculate the slope of the straight line through $(3,\\,-5)$ and $(-4,\\,7)$.'), expected: n(-12, 7), hint: say('Kendu ordena berean: $\\frac{7-(-5)}{-4-3}$.', 'Resta en el mismo orden: $\\frac{7-(-5)}{-4-3}$.', 'اطرح بالترتيب نفسه: $\\frac{7-(-5)}{-4-3}$.', 'Subtract in the same order: $\\frac{7-(-5)}{-4-3}$.'), explanation: same('$m=\\frac{7-(-5)}{-4-3}=\\frac{12}{-7}=-\\frac{12}{7}$') },
    { id: 6, stage: 'lines', prompt: say('Zein da grafikoko zuzenaren malda?', '¿Cuál es la pendiente de la recta de la gráfica?', 'ما ميل المستقيم في الرسم؟', 'What is the slope of the straight line on the graph?'), expected: n(3, 2), hint: say('A-tik B-ra: zenbat igotzen da eta zenbat aurreratzen?', 'De A a B: ¿cuánto sube y cuánto avanza?', 'من A إلى B: كم يصعد وكم يتقدم؟', 'From A to B: how much does it go up, and how far does it go across?'), explanation: same('$m=\\frac{1-(-2)}{2-0}=\\frac{3}{2}$'), graph: lineGraph },
    { id: 7, stage: 'lines', prompt: say('Zuzen bat $(2,\\,-1)$ puntutik pasatzen da eta bere malda $-2$ da. Zenbat da $n$?', 'Una recta pasa por $(2,\\,-1)$ y tiene pendiente $-2$. ¿Cuánto vale $n$?', 'يمر مستقيم بالنقطة $(2,\\,-1)$ وميله $-2$. كم تساوي $n$؟', 'A straight line passes through $(2,\\,-1)$ and has slope $-2$. What is $n$?'), expected: n(3), hint: say('Ordeztu $-1=-2\\cdot 2+n$.', 'Sustituye $-1=-2\\cdot 2+n$.', 'عوّض $-1=-2\\cdot 2+n$.', 'Substitute: $-1=-2\\cdot 2+n$.'), explanation: same('$-1=-4+n\\to n=-1+4=3$') },
    { id: 8, stage: 'lines', prompt: say('Grafikoan $y=x+1$ eta $y=-2x+4$ zuzenak daude. Zein da ebaki-puntuaren ordenatua?', 'En la gráfica están las rectas $y=x+1$ e $y=-2x+4$. ¿Cuál es la ordenada de su punto de corte?', 'في الرسم المستقيمان $y=x+1$ و$y=-2x+4$. ما ترتيبة نقطة تقاطعهما؟', 'On the graph are the straight lines $y=x+1$ and $y=-2x+4$. What is the y-coordinate of their point of intersection?'), expected: n(2), hint: say('Berdindu: $x+1=-2x+4$.', 'Iguala: $x+1=-2x+4$.', 'ساوِ: $x+1=-2x+4$.', 'Set them equal: $x+1=-2x+4$.'), explanation: same('$x+1=-2x+4\\to 3x=3\\to x=1\\to y=1+1=2$'), graph: twoLinesGraph },
    /* Quadratic functions */
    { id: 9, stage: 'quadratic', prompt: say('$y=-3x^2$ parabolan, zenbat da $y$ $x=2$ denean?', 'En la parábola $y=-3x^2$, ¿cuánto vale $y$ para $x=2$?', 'في القطع $y=-3x^2$، كم تساوي $y$ عند $x=2$؟', 'On the parabola $y=-3x^2$, what is $y$ when $x=2$?'), expected: n(-12), hint: say('Berretura lehenik.', 'Primero la potencia.', 'القوة أولًا.', 'Work out the power first.'), explanation: same('$-3\\cdot 2^{2}=-3\\cdot 4=-12$') },
    { id: 10, stage: 'quadratic', prompt: say('Zein da $y=x^2-6x+10$ parabolaren erpinaren ordenatua?', '¿Cuál es la ordenada del vértice de $y=x^2-6x+10$?', 'ما ترتيبة رأس $y=x^2-6x+10$؟', 'What is the y-coordinate of the vertex of $y=x^2-6x+10$?'), expected: n(1), hint: say('$x_V=\\frac{-b}{2a}$ eta gero ordeztu.', '$x_V=\\frac{-b}{2a}$ y después sustituye.', '$x_V=\\frac{-b}{2a}$ ثم عوّض.', '$x_V=\\frac{-b}{2a}$, and then substitute.'), explanation: same('$x_V=\\frac{6}{2}=3\\qquad y_V=9-18+10=1$') },
    { id: 11, stage: 'quadratic', prompt: say('Grafikoko parabola $y=x^2-2x-3$ da. Zein da bere minimoa (erpinaren ordenatua)?', 'La parábola de la gráfica es $y=x^2-2x-3$. ¿Cuál es su mínimo (la ordenada del vértice)?', 'القطع في الرسم هو $y=x^2-2x-3$. ما قيمته الصغرى (ترتيبة الرأس)؟', 'The parabola on the graph is $y=x^2-2x-3$. What is its minimum (the y-coordinate of the vertex)?'), expected: n(-4), hint: say('Erpina $x=1$ denean dago.', 'El vértice está en $x=1$.', 'الرأس عند $x=1$.', 'The vertex is at $x=1$.'), explanation: same('$x_V=\\frac{2}{2}=1\\to y=1-2-3=-4$'), graph: parabolaGraph },
    { id: 12, stage: 'quadratic', prompt: say('Zein da $y=(x+2)^2-5$ parabolaren erpinaren abszisa?', '¿Cuál es la abscisa del vértice de $y=(x+2)^2-5$?', 'ما فاصلة رأس $y=(x+2)^2-5$؟', 'What is the x-coordinate of the vertex of $y=(x+2)^2-5$?'), expected: n(-2), hint: say('$(x+2)=(x-(-2))$: ezkerrera doa.', '$(x+2)=(x-(-2))$: va hacia la izquierda.', '$(x+2)=(x-(-2))$: يتجه إلى اليسار.', '$(x+2)=(x-(-2))$: it shifts to the left.'), explanation: same('$y=(x-(-2))^{2}-5\\to V(-2,\\,-5)$') },
    /* Inverse proportion and radicals */
    { id: 13, stage: 'inverse', prompt: say('$y=\\frac{k}{x}$ hiperbola $(4,\\,3)$ puntutik pasatzen da. Zenbat da $k$?', 'La hipérbola $y=\\frac{k}{x}$ pasa por $(4,\\,3)$. ¿Cuánto vale $k$?', 'يمر القطع الزائد $y=\\frac{k}{x}$ بالنقطة $(4,\\,3)$. كم تساوي $k$؟', 'The hyperbola $y=\\frac{k}{x}$ passes through $(4,\\,3)$. What is $k$?'), expected: n(12), hint: say('$k=x\\cdot y$', '$k=x\\cdot y$', '$k=x\\cdot y$', '$k=x\\cdot y$'), explanation: same('$k=4\\cdot 3=12$') },
    { id: 14, stage: 'inverse', prompt: say('Grafikoko hiperbola $y=\\frac{k}{x}$ da eta P puntutik pasatzen da. Zenbat da $y$ $x=-3$ denean?', 'La hipérbola de la gráfica es $y=\\frac{k}{x}$ y pasa por P. ¿Cuánto vale $y$ para $x=-3$?', 'القطع في الرسم $y=\\frac{k}{x}$ ويمر بـ P. كم تساوي $y$ عند $x=-3$؟', 'The hyperbola on the graph is $y=\\frac{k}{x}$ and passes through P. What is $y$ when $x=-3$?'), expected: n(-2), hint: say('Irakurri P eta kalkulatu $k$.', 'Lee P y calcula $k$.', 'اقرأ P واحسب $k$.', 'Read P and work out $k$.'), explanation: same('$k=2\\cdot 3=6\\to y=\\frac{6}{-3}=-2$'), graph: hyperbolaGraph },
    { id: 15, stage: 'inverse', prompt: say('Zein da $y=\\frac{1}{x+5}+2$ funtzioaren asintota bertikala? Idatzi $x$-ren balioa.', '¿Cuál es la asíntota vertical de $y=\\frac{1}{x+5}+2$? Escribe el valor de $x$.', 'ما المقارب الرأسي لـ $y=\\frac{1}{x+5}+2$؟ اكتب قيمة $x$.', 'What is the vertical asymptote of $y=\\frac{1}{x+5}+2$? Write the value of $x$.'), expected: n(-5), hint: say('Izendatzailea 0.', 'El denominador vale 0.', 'المقام يساوي 0.', 'The denominator is 0.'), explanation: same('$x+5=0\\to x=-5$') },
    { id: 16, stage: 'inverse', prompt: say('Grafikoa $y=\\sqrt{x+4}$ da. Zein da 5en irudia?', 'La gráfica es $y=\\sqrt{x+4}$. ¿Cuál es la imagen de 5?', 'الرسم هو $y=\\sqrt{x+4}$. ما صورة 5؟', 'The function is $y=\\sqrt{x+4}$. What is the image of 5?'), expected: n(3), hint: say('Ordeztu eta atera erroa.', 'Sustituye y saca la raíz.', 'عوّض واستخرج الجذر.', 'Substitute, then take the square root.'), explanation: same('$\\sqrt{5+4}=\\sqrt{9}=3$'), graph: rootGraph },
    /* Exponentials and models */
    { id: 17, stage: 'exponential', prompt: say('$y=3^x$ funtzioan, zenbat da $y$ $x=-2$ denean?', 'En $y=3^x$, ¿cuánto vale $y$ para $x=-2$?', 'في $y=3^x$، كم تساوي $y$ عند $x=-2$؟', 'In $y=3^x$, what is $y$ when $x=-2$?'), expected: n(1, 9), hint: say('Berretzaile negatiboa: alderantzizkoa.', 'Exponente negativo: el inverso.', 'أس سالب: المقلوب.', 'Negative exponent: the reciprocal.'), explanation: same('$3^{-2}=\\frac{1}{3^{2}}=\\frac{1}{9}$') },
    { id: 18, stage: 'exponential', prompt: say('Ana-ren soldata $s=24\\,000\\cdot 1{,}08^t$ da (€, $t$ urteak). Zenbat irabaziko du 2 urte barru?', 'El sueldo de Ana es $s=24\\,000\\cdot 1{,}08^t$ (€, $t$ en años). ¿Cuánto ganará dentro de 2 años?', 'راتب آنا $s=24\\,000\\cdot 1{,}08^t$ (€، و$t$ بالسنوات). كم ستكسب بعد سنتين؟', 'Ana\'s salary is $s=24\\,000\\cdot 1{,}08^t$ (in €, with $t$ in years). How much will she earn in 2 years\' time?'), expected: n(279936, 10), hint: say('$1{,}08^2=1{,}1664$', '$1{,}08^2=1{,}1664$', '$1{,}08^2=1{,}1664$', '$1{,}08^2=1{,}1664$'), explanation: same('$24\\,000\\cdot 1{,}08^{2}=24\\,000\\cdot 1{,}1664=27\\,993{,}6$') },
    { id: 19, stage: 'exponential', prompt: say('Grafikoa $y=k\\cdot a^x$ da. Zenbat da $y$ $x=3$ denean?', 'La gráfica es $y=k\\cdot a^x$. ¿Cuánto vale $y$ para $x=3$?', 'الرسم هو $y=k\\cdot a^x$. كم تساوي $y$ عند $x=3$؟', 'The function is $y=k\\cdot a^x$. What is $y$ when $x=3$?'), expected: n(1, 2), hint: say('$k$ da $y$ $x=0$ denean; $a$ da $\\frac{y(1)}{y(0)}$.', '$k$ es $y$ para $x=0$; $a$ es $\\frac{y(1)}{y(0)}$.', '$k$ هي $y$ عند $x=0$؛ و$a$ هي $\\frac{y(1)}{y(0)}$.', '$k$ is $y$ when $x=0$; $a$ is $\\frac{y(1)}{y(0)}$.'), explanation: same('$k=4\\qquad a=\\frac{2}{4}=\\frac{1}{2}\\qquad y(3)=\\frac{4}{2^{3}}=\\frac{4}{8}=0{,}5$'), graph: exponentialGraph },
    { id: 20, stage: 'exponential', prompt: say('20 m-ko hesi batekin laukizuzen bat itxi nahi da. Zenbat da azalera handiena (m²)?', 'Con 20 m de valla se quiere cerrar un rectángulo. ¿Cuál es el área máxima (m²)?', 'نريد إحاطة مستطيل بسياج طوله 20 م. ما أكبر مساحة (م²)؟', 'With 20 m of fencing, you want to enclose a rectangle. What is the maximum area (m²)?'), expected: n(25), hint: say('Oinarria $x$, altuera $10-x$: $A=x(10-x)$.', 'Base $x$, altura $10-x$: $A=x(10-x)$.', 'القاعدة $x$ والارتفاع $10-x$: $A=x(10-x)$.', 'Base $x$, height $10-x$: $A=x(10-x)$.'), explanation: same('$A(x)=-x^{2}+10x\\qquad x_V=\\frac{-10}{-2}=5\\qquad A(5)=5\\cdot 5=25$') }
]

/* ---------- Challenges ---------- */

export const graphsChallenges: GraphsChallengeItem[] = [
    { id: 101, stage: 'linear', context: 'starter', points: 10, prompt: say('$y=32+1{,}8x$ formulak °C ($x$) °F ($y$) bihurtzen ditu. Zenbat °C dira 95 °F?', 'La fórmula $y=32+1{,}8x$ pasa de °C ($x$) a °F ($y$). ¿Cuántos °C son 95 °F?', 'تحوّل الصيغة $y=32+1{,}8x$ من °م ($x$) إلى °ف ($y$). كم °م تساوي 95 °ف؟', 'The formula $y=32+1{,}8x$ converts from °C ($x$) to °F ($y$). What is 95 °F in °C?'), expected: n(35), hint: say('Ebatzi $32+1{,}8x=95$.', 'Resuelve $32+1{,}8x=95$.', 'حُلّ $32+1{,}8x=95$.', 'Solve $32+1{,}8x=95$.'), explanation: same('$1{,}8x=95-32=63\\to x=\\frac{63}{1{,}8}=35$') },
    { id: 102, stage: 'linear', context: 'advanced', points: 20, prompt: say('Zuzen batek Y ardatza $(0,\\,4)$ puntuan ebakitzen du eta X ardatza $x=2$ puntuan. Zenbat da bere malda?', 'Una recta corta al eje Y en $(0,\\,4)$ y al eje X en $x=2$. ¿Cuánto vale su pendiente?', 'يقطع مستقيم محور Y في $(0,\\,4)$ ومحور X عند $x=2$. كم ميله؟', 'A straight line crosses the y-axis at $(0,\\,4)$ and the x-axis at $x=2$. What is its slope?'), expected: n(-2), hint: say('Bi puntu: $(0,\\,4)$ eta $(2,\\,0)$.', 'Dos puntos: $(0,\\,4)$ y $(2,\\,0)$.', 'نقطتان: $(0,\\,4)$ و$(2,\\,0)$.', 'Two points: $(0,\\,4)$ and $(2,\\,0)$.'), explanation: same('$m=\\frac{0-4}{2-0}=-2$') },
    { id: 103, stage: 'linear', context: 'master', points: 30, prompt: say('A tarifa: $y=20+0{,}5x$; B tarifa: $y=0{,}75x$ ($x$ km, $y$ €). Zenbat kilometrotan balio dute gauza bera?', 'Tarifa A: $y=20+0{,}5x$; tarifa B: $y=0{,}75x$ ($x$ en km, $y$ en €). ¿Para cuántos km cuestan lo mismo?', 'التعرفة A: $y=20+0{,}5x$؛ التعرفة B: $y=0{,}75x$ ($x$ بالكم و$y$ باليورو). عند كم كيلومترًا تتساويان؟', 'Tariff A: $y=20+0{,}5x$; tariff B: $y=0{,}75x$ ($x$ in km, $y$ in €). For how many km do they cost the same?'), expected: n(80), hint: say('Berdindu bi tarifak.', 'Iguala las dos tarifas.', 'ساوِ التعرفتين.', 'Set the two tariffs equal.'), explanation: same('$20+0{,}5x=0{,}75x\\to 0{,}25x=20\\to x=\\frac{20}{0{,}25}=80$') },
    { id: 104, stage: 'lines', context: 'starter', points: 10, prompt: say('Kalkulatu $(0,\\,-5)$ eta $(-3,\\,1)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $(0,\\,-5)$ y $(-3,\\,1)$.', 'احسب ميل المستقيم المار بـ $(0,\\,-5)$ و$(-3,\\,1)$.', 'Calculate the slope of the straight line through $(0,\\,-5)$ and $(-3,\\,1)$.'), expected: n(-2), hint: say('$\\frac{1-(-5)}{-3-0}$', '$\\frac{1-(-5)}{-3-0}$', '$\\frac{1-(-5)}{-3-0}$', '$\\frac{1-(-5)}{-3-0}$'), explanation: same('$m=\\frac{1-(-5)}{-3-0}=\\frac{6}{-3}=-2$') },
    { id: 105, stage: 'lines', context: 'advanced', points: 20, prompt: say('Zuzen bat $y=4x-7$ zuzenaren paraleloa da eta $(-1,\\,2)$ puntutik pasatzen da. Zenbat da bere $n$?', 'Una recta es paralela a $y=4x-7$ y pasa por $(-1,\\,2)$. ¿Cuánto vale su $n$?', 'مستقيم يوازي $y=4x-7$ ويمر بـ $(-1,\\,2)$. كم تساوي $n$ له؟', 'A straight line is parallel to $y=4x-7$ and passes through $(-1,\\,2)$. What is the value of $n$?'), expected: n(6), hint: say('Malda bera, $m=4$.', 'La misma pendiente, $m=4$.', 'الميل نفسه، $m=4$.', 'The same slope, $m=4$.'), explanation: same('$2=4\\cdot(-1)+n\\to n=2+4=6$') },
    { id: 106, stage: 'lines', context: 'master', points: 30, prompt: say('Zein $b$-rentzat pasatzen da $y=bx+2$ zuzena $(-3,\\,4)$ puntutik?', '¿Para qué valor de $b$ pasa la recta $y=bx+2$ por $(-3,\\,4)$?', 'عند أي قيمة لـ $b$ يمر المستقيم $y=bx+2$ بـ $(-3,\\,4)$؟', 'For what value of $b$ does the straight line $y=bx+2$ pass through $(-3,\\,4)$?'), expected: n(-2, 3), hint: say('Ordeztu: $4=b\\cdot(-3)+2$.', 'Sustituye: $4=b\\cdot(-3)+2$.', 'عوّض: $4=b\\cdot(-3)+2$.', 'Substitute: $4=b\\cdot(-3)+2$.'), explanation: same('$4=-3b+2\\to -3b=2\\to b=-\\frac{2}{3}$') },
    { id: 107, stage: 'quadratic', context: 'starter', points: 10, prompt: say('$y=x^2-4x$ parabolak X ardatza bi puntutan ebakitzen du. Bata $x=0$ da. Zein da bestea?', 'La parábola $y=x^2-4x$ corta al eje X en dos puntos. Uno es $x=0$. ¿Cuál es el otro?', 'يقطع القطع $y=x^2-4x$ محور X في نقطتين. إحداهما $x=0$. ما الأخرى؟', 'The parabola $y=x^2-4x$ crosses the x-axis at two points. One is $x=0$. What is the other?'), expected: n(4), hint: say('Atera $x$ biderkagai komun.', 'Saca factor común $x$.', 'أخرج $x$ عاملًا مشتركًا.', 'Take out the common factor $x$.'), explanation: same('$x(x-4)=0\\to x=0\\quad x=4$') },
    { id: 108, stage: 'quadratic', context: 'advanced', points: 20, prompt: say('$y=x^2+bx+c$ parabolaren erpina $x=3$ zuzenean dago. Zenbat da $b$?', 'El vértice de $y=x^2+bx+c$ está en $x=3$. ¿Cuánto vale $b$?', 'رأس $y=x^2+bx+c$ عند $x=3$. كم تساوي $b$؟', 'The vertex of $y=x^2+bx+c$ is at $x=3$. What is $b$?'), expected: n(-6), hint: say('$\\frac{-b}{2\\cdot 1}=3$', '$\\frac{-b}{2\\cdot 1}=3$', '$\\frac{-b}{2\\cdot 1}=3$', '$\\frac{-b}{2\\cdot 1}=3$'), explanation: same('$\\frac{-b}{2}=3\\to b=-6$') },
    { id: 109, stage: 'quadratic', context: 'master', points: 30, prompt: say('Trapolin batetik jaurtitako pilota batek $y=-\\frac{x^2}{18}+8$ ibilbidea egiten du ($x$ eta $y$ metrotan). Zenbat metrora erortzen da uretara ($y=0$)?', 'Una pelota lanzada desde un trampolín sigue $y=-\\frac{x^2}{18}+8$ ($x$ e $y$ en metros). ¿A cuántos metros cae al agua ($y=0$)?', 'تتبع كرة مقذوفة من منصة $y=-\\frac{x^2}{18}+8$ ($x$ و$y$ بالأمتار). على كم مترًا تسقط في الماء ($y=0$)؟', 'A ball thrown from a diving board follows $y=-\\frac{x^2}{18}+8$ ($x$ and $y$ in metres). At how many metres does it hit the water ($y=0$)?'), expected: n(12), hint: say('Ebatzi $\\frac{x^2}{18}=8$.', 'Resuelve $\\frac{x^2}{18}=8$.', 'حُلّ $\\frac{x^2}{18}=8$.', 'Solve $\\frac{x^2}{18}=8$.'), explanation: same('$x^{2}=18\\cdot 8=144\\to x=\\sqrt{144}=12$') },
    { id: 110, stage: 'inverse', context: 'starter', points: 10, prompt: say('Autobus batek 180 € balio ditu eta bidaiarien artean ordaintzen da: $y=\\frac{180}{x}$. Zenbat ordaintzen du bakoitzak 45 badira?', 'Un autobús cuesta 180 € y se paga entre los viajeros: $y=\\frac{180}{x}$. ¿Cuánto paga cada uno si son 45?', 'تكلفة حافلة 180 € تُقسم على الركاب: $y=\\frac{180}{x}$. كم يدفع كل واحد إذا كانوا 45؟', 'A bus costs €180 and the passengers share the cost: $y=\\frac{180}{x}$. How much does each one pay if there are 45?'), expected: n(4), hint: say('Ordeztu $x=45$.', 'Sustituye $x=45$.', 'عوّض $x=45$.', 'Substitute $x=45$.'), explanation: same('$y=\\frac{180}{45}=4$') },
    { id: 111, stage: 'inverse', context: 'advanced', points: 20, prompt: say('$y=\\frac{k}{x-2}$ funtzioa $(4,\\,3)$ puntutik pasatzen da. Zenbat da $k$?', 'La función $y=\\frac{k}{x-2}$ pasa por $(4,\\,3)$. ¿Cuánto vale $k$?', 'تمر الدالة $y=\\frac{k}{x-2}$ بالنقطة $(4,\\,3)$. كم تساوي $k$؟', 'The function $y=\\frac{k}{x-2}$ passes through $(4,\\,3)$. What is $k$?'), expected: n(6), hint: say('$3=\\frac{k}{4-2}$', '$3=\\frac{k}{4-2}$', '$3=\\frac{k}{4-2}$', '$3=\\frac{k}{4-2}$'), explanation: same('$3=\\frac{k}{2}\\to k=3\\cdot 2=6$') },
    { id: 112, stage: 'inverse', context: 'master', points: 30, prompt: say('Kutxa bakoitzaren kostua $y=\\frac{0{,}3x+1000}{x}$ € da, $x$ kutxen kopurua izanik. Zenbat balio du kutxa bakoitzak 10 000 egiten badira?', 'El coste por caja es $y=\\frac{0{,}3x+1000}{x}$ €, siendo $x$ el número de cajas. ¿Cuánto cuesta cada caja si se fabrican 10 000?', 'تكلفة العلبة الواحدة $y=\\frac{0{,}3x+1000}{x}$ € حيث $x$ عدد العلب. كم تكلف العلبة إذا صُنعت 10 000؟', 'The cost per box, in euros, is $y=\\frac{0{,}3x+1000}{x}$, where $x$ is the number of boxes. How much does each box cost if 10,000 are made?'), expected: n(2, 5), hint: say('Ordeztu $x=10\\,000$.', 'Sustituye $x=10\\,000$.', 'عوّض $x=10\\,000$.', 'Substitute $x=10\\,000$.'), explanation: same('$\\frac{0{,}3\\cdot 10\\,000+1000}{10\\,000}=\\frac{4000}{10\\,000}=0{,}4$') },
    { id: 113, stage: 'exponential', context: 'starter', points: 10, prompt: say('$y=2^x$ funtzioan, zein $x$-k du 32 irudia?', 'En $y=2^x$, ¿qué $x$ tiene imagen 32?', 'في $y=2^x$، ما قيمة $x$ التي صورتها 32؟', 'In $y=2^x$, which $x$ has the image 32?'), expected: n(5), hint: say('Bikoiztu 1etik 32ra iritsi arte.', 'Duplica desde 1 hasta llegar a 32.', 'ضاعف من 1 حتى تصل إلى 32.', 'Keep doubling from 1 until you reach 32.'), explanation: same('$2^{5}=32$') },
    { id: 114, stage: 'exponential', context: 'advanced', points: 20, prompt: say('$y=k\\cdot a^x$ funtzioa $(0,\\,3)$ eta $(1;\\,3{,}6)$ puntuetatik pasatzen da. Zenbat da $a$?', 'La función $y=k\\cdot a^x$ pasa por $(0,\\,3)$ y $(1;\\,3{,}6)$. ¿Cuánto vale $a$?', 'تمر الدالة $y=k\\cdot a^x$ بالنقطتين $(0,\\,3)$ و$(1;\\,3{,}6)$. كم تساوي $a$؟', 'The function $y=k\\cdot a^x$ passes through $(0,\\,3)$ and $(1;\\,3{,}6)$. What is $a$?'), expected: n(6, 5), hint: say('$x=0$ denean $y=k$.', 'Para $x=0$, $y=k$.', 'عند $x=0$ يكون $y=k$.', 'When $x=0$, $y=k$.'), explanation: same('$k=3\\qquad a=\\frac{3{,}6}{3}=1{,}2$') },
    { id: 115, stage: 'exponential', context: 'master', points: 30, prompt: say('Auto batek 20 000 € balio ditu eta urtero bere balioaren % 20 galtzen du. Zenbat balioko du 3 urte barru (€)?', 'Un coche vale 20 000 € y pierde cada año el 20 % de su valor. ¿Cuánto valdrá dentro de 3 años (€)?', 'سيارة قيمتها 20 000 € وتفقد كل سنة 20 % من قيمتها. كم ستساوي بعد 3 سنوات (€)؟', 'A car is worth €20,000 and loses 20% of its value each year. How much will it be worth in 3 years (in €)?'), expected: n(10240), hint: say('% 20 galtzea: bider $0{,}8$.', 'Perder un 20 %: por $0{,}8$.', 'خسارة 20 %: الضرب في $0{,}8$.', 'To lose 20%: multiply by $0{,}8$.'), explanation: same('$20\\,000\\cdot 0{,}8^{3}=20\\,000\\cdot 0{,}512=10\\,240$') }
]

/* ---------- Exercise bank ---------- */

export const graphsExerciseBank: GraphsExerciseSection[] = [
    {
        id: 'linear',
        title: say('Funtzio linealak', 'Funciones lineales', 'الدوال الخطية', 'Linear functions'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Proportzionaltasun zuzenekoak al dira? a) $y=3x-4$ b) $y=5x$ c) $y=\\frac{3}{4}x$ d) $y=\\frac{4}{x}$', '¿Son de proporcionalidad directa? a) $y=3x-4$ b) $y=5x$ c) $y=\\frac{3}{4}x$ d) $y=\\frac{4}{x}$', 'هل هي تناسب طردي؟ أ) $y=3x-4$ ب) $y=5x$ ج) $y=\\frac{3}{4}x$ د) $y=\\frac{4}{x}$', 'Are these direct proportions? a) $y=3x-4$ b) $y=5x$ c) $y=\\frac{3}{4}x$ d) $y=\\frac{4}{x}$'), solution: say('a) Ez: ez da jatorritik pasatzen. b) Bai, $m=5$, gorakorra. c) Bai, $m=\\frac{3}{4}$, gorakorra. d) Ez: ez da zuzena.', 'a) No: no pasa por el origen. b) Sí, $m=5$, creciente. c) Sí, $m=\\frac{3}{4}$, creciente. d) No: no es una recta.', 'أ) لا: لا يمر بالأصل. ب) نعم، $m=5$، متزايدة. ج) نعم، $m=\\frac{3}{4}$، متزايدة. د) لا: ليست مستقيمًا.', 'a) No: it does not pass through the origin. b) Yes, $m=5$, increasing. c) Yes, $m=\\frac{3}{4}$, increasing. d) No: it is not a straight line.') },
            { id: 2, difficulty: 'easy', question: say('Ur-botila batek 1,25 € balio du. Zenbat balio dute 6 botilak?', 'Una botella de agua cuesta 1,25 €. ¿Cuánto cuestan 6 botellas?', 'ثمن قارورة ماء 1.25 €. كم ثمن 6 قوارير؟', 'A bottle of water costs €1.25. How much do 6 bottles cost?'), solution: same('$1{,}25\\cdot 6=7{,}5$'), answer: { expected: n(15, 2) } },
            { id: 3, difficulty: 'easy', question: say('Idatzi $y=-7x-12$ zuzenaren jatorriko ordenatua.', 'Escribe la ordenada en el origen de la recta $y=-7x-12$.', 'اكتب الجزء المقطوع للمستقيم $y=-7x-12$.', 'Write the y-intercept of the straight line $y=-7x-12$.'), solution: say('$m=-7$ (beherakorra) eta $n=-12$.', '$m=-7$ (decreciente) y $n=-12$.', '$m=-7$ (متناقصة) و$n=-12$.', '$m=-7$ (decreasing) and $n=-12$.'), answer: { expected: n(-12) } },
            { id: 4, difficulty: 'easy', question: say('Non ebakitzen du $y=-5x+3$ zuzenak X ardatza? Eman $x$.', '¿Dónde corta $y=-5x+3$ al eje X? Da la $x$.', 'أين يقطع $y=-5x+3$ محور X؟ أعطِ $x$.', 'Where does $y=-5x+3$ cross the x-axis? Give the $x$-value.'), solution: same('$-5x+3=0\\to x=\\frac{3}{5}=0{,}6$'), answer: { expected: n(3, 5) } },
            { id: 5, difficulty: 'medium', question: say('Arrautza-dozena batek 1,75 € balio du. Zenbat dozena eros daitezke 21 €-rekin?', 'Una docena de huevos cuesta 1,75 €. ¿Cuántas docenas se compran con 21 €?', 'ثمن دزينة البيض 1.75 €. كم دزينة نشتري بـ 21 €؟', 'A dozen eggs costs €1.75. How many dozen can you buy with €21?'), solution: same('$1{,}75x=21\\to x=\\frac{21}{1{,}75}=12$'), answer: { expected: n(12) } },
            { id: 6, difficulty: 'medium', question: say('Korrikalari bat 0 km-tik 2 km-ra dago eta 9 km/h-ra doa: $y=9x+2$. Non dago 3 orduren buruan (km)?', 'Un corredor está a 2 km del km 0 y va a 9 km/h: $y=9x+2$. ¿Dónde está a las 3 horas (km)?', 'عدّاء على بعد 2 كم من الكيلومتر 0 ويسير بسرعة 9 كم/س: $y=9x+2$. أين يكون بعد 3 ساعات (كم)؟', 'A runner is 2 km from the 0 km mark and runs at 9 km/h: $y=9x+2$. Where is the runner at 3 hours (in km)?'), solution: same('$9\\cdot 3+2=27+2=29$'), answer: { expected: n(29) } },
            { id: 7, difficulty: 'medium', question: say('$y=30+15x$ malgukian, zenbat neurtzen du 4,6 kg zintzilikatuta (cm)?', 'En el muelle $y=30+15x$, ¿cuánto mide con 4,6 kg colgados (cm)?', 'في النابض $y=30+15x$ كم طوله عند تعليق 4.6 كغ (سم)؟', 'On the spring $y=30+15x$, how long is it with 4.6 kg hanging from it (cm)?'), solution: same('$30+15\\cdot 4{,}6=30+69=99$'), answer: { expected: n(99) } },
            { id: 8, difficulty: 'medium', question: say('Termometro kliniko batek 41 °C arte neurtzen du. Zenbat °F dira? ($y=32+1{,}8x$)', 'Un termómetro clínico llega a 41 °C. ¿Cuántos °F son? ($y=32+1{,}8x$)', 'يصل ميزان حرارة طبي إلى 41 °م. كم °ف تساوي؟ ($y=32+1{,}8x$)', 'A clinical thermometer shows 41 °C. How many °F is that? ($y=32+1{,}8x$)'), solution: same('$32+1{,}8\\cdot 41=32+73{,}8=105{,}8$'), answer: { expected: n(1058, 10) } },
            { id: 9, difficulty: 'hard', question: say('Mugikor bat 8 m/s-ra doa eta segundoko 1 m/s balaztatzen du: $y=8-x$. Zenbat segundotan gelditzen da?', 'Un móvil va a 8 m/s y frena 1 m/s cada segundo: $y=8-x$. ¿En cuántos segundos se para?', 'متحرك سرعته 8 م/ث ويتباطأ 1 م/ث كل ثانية: $y=8-x$. بعد كم ثانية يتوقف؟', 'A moving object travels at 8 m/s and slows down by 1 m/s every second: $y=8-x$. After how many seconds does it stop?'), solution: same('$8-x=0\\to x=8$'), answer: { expected: n(8) } },
            { id: 10, difficulty: 'hard', question: say('Funtzio konstante bat $(18;\\,-1{,}5)$ puntutik pasatzen da. Zein da bere balioa $x=-7$ denean?', 'Una función constante pasa por $(18;\\,-1{,}5)$. ¿Cuánto vale para $x=-7$?', 'تمر دالة ثابتة بالنقطة $(18;\\,-1{,}5)$. كم قيمتها عند $x=-7$؟', 'A constant function passes through $(18;\\,-1{,}5)$. What is its value when $x=-7$?'), solution: say('Konstantea da: beti $y=-1{,}5$.', 'Es constante: siempre $y=-1{,}5$.', 'إنها ثابتة: دائمًا $y=-1{,}5$.', 'It is constant: always $y=-1{,}5$.'), answer: { expected: n(-3, 2) } }
        ]
    },
    {
        id: 'lines',
        title: say('Zuzenaren ekuazioa', 'La ecuación de la recta', 'معادلة المستقيم', 'The equation of the straight line'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Kalkulatu $(1,\\,-2)$ eta $(-4,\\,3)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $(1,\\,-2)$ y $(-4,\\,3)$.', 'احسب ميل المستقيم المار بـ $(1,\\,-2)$ و$(-4,\\,3)$.', 'Calculate the slope of the straight line through $(1,\\,-2)$ and $(-4,\\,3)$.'), solution: same('$m=\\frac{3-(-2)}{-4-1}=\\frac{5}{-5}=-1$'), answer: { expected: n(-1) } },
            { id: 12, difficulty: 'easy', question: say('Idatzi $P(2,\\,-1)$ puntutik pasatzen den eta $m=-2$ malda duen zuzenaren ekuazioa.', 'Escribe la ecuación de la recta que pasa por $P(2,\\,-1)$ con pendiente $m=-2$.', 'اكتب معادلة المستقيم المار بـ $P(2,\\,-1)$ وميله $m=-2$.', 'Write the equation of the straight line through $P(2,\\,-1)$ with slope $m=-2$.'), solution: same('$-1=-2\\cdot 2+n\\to n=3\\to y=-2x+3$') },
            { id: 13, difficulty: 'easy', question: say('Zuzen bat $A(-2,\\,1)$ puntutik pasatzen da eta bere malda $\\frac{1}{2}$ da. Zenbat da $n$?', 'Una recta pasa por $A(-2,\\,1)$ con pendiente $\\frac{1}{2}$. ¿Cuánto vale $n$?', 'يمر مستقيم بـ $A(-2,\\,1)$ وميله $\\frac{1}{2}$. كم تساوي $n$؟', 'A straight line passes through $A(-2,\\,1)$ with slope $\\frac{1}{2}$. What is $n$?'), solution: same('$1=\\frac{1}{2}\\cdot(-2)+n\\to n=1+1=2$'), answer: { expected: n(2) } },
            { id: 14, difficulty: 'medium', question: say('Zein da $A(3,\\,0)$ eta $B(5,\\,0)$ puntuetatik pasatzen den zuzenaren malda?', '¿Cuál es la pendiente de la recta que pasa por $A(3,\\,0)$ y $B(5,\\,0)$?', 'ما ميل المستقيم المار بـ $A(3,\\,0)$ و$B(5,\\,0)$؟', 'What is the slope of the straight line through $A(3,\\,0)$ and $B(5,\\,0)$?'), solution: say('$m=\\frac{0-0}{5-3}=0$: X ardatza bera da, $y=0$.', '$m=\\frac{0-0}{5-3}=0$: es el propio eje X, $y=0$.', '$m=\\frac{0-0}{5-3}=0$: إنه محور X نفسه $y=0$.', '$m=\\frac{0-0}{5-3}=0$: it is the x-axis itself, $y=0$.'), answer: { expected: n(0) } },
            { id: 15, difficulty: 'medium', question: say('Zuzen bat $(-2,\\,-4)$ eta $(2,\\,-3)$ puntuetatik pasatzen da. Zenbat da bere $n$?', 'Una recta pasa por $(-2,\\,-4)$ y $(2,\\,-3)$. ¿Cuánto vale su $n$?', 'يمر مستقيم بـ $(-2,\\,-4)$ و$(2,\\,-3)$. كم تساوي $n$ له؟', 'A straight line passes through $(-2,\\,-4)$ and $(2,\\,-3)$. What is the value of $n$?'), solution: same('$m=\\frac{-3-(-4)}{2-(-2)}=\\frac{1}{4}\\qquad n=-3-\\frac{1}{4}\\cdot 2=-\\frac{7}{2}$'), answer: { expected: n(-7, 2) } },
            { id: 16, difficulty: 'medium', question: say('Zuzen bat $(2,\\,-3)$ puntutik pasatzen da eta $(1,\\,-2)$ eta $(-4,\\,3)$ puntuetatik pasatzen denaren paraleloa da. Zenbat da bere $n$?', 'Una recta pasa por $(2,\\,-3)$ y es paralela a la que pasa por $(1,\\,-2)$ y $(-4,\\,3)$. ¿Cuánto vale su $n$?', 'مستقيم يمر بـ $(2,\\,-3)$ ويوازي المار بـ $(1,\\,-2)$ و$(-4,\\,3)$. كم تساوي $n$ له؟', 'A straight line passes through $(2,\\,-3)$ and is parallel to the one through $(1,\\,-2)$ and $(-4,\\,3)$. What is the value of $n$?'), solution: same('$m=\\frac{3-(-2)}{-4-1}=-1\\qquad -3=-2+n\\to n=-1$'), answer: { expected: n(-1) } },
            { id: 17, difficulty: 'medium', question: say('Proportzionaltasun-funtzio bat $(-4,\\,2)$ puntutik pasatzen da. Zenbat da bere malda?', 'Una función de proporcionalidad pasa por $(-4,\\,2)$. ¿Cuánto vale su pendiente?', 'تمر دالة تناسب بالنقطة $(-4,\\,2)$. كم ميلها؟', 'A direct proportion function passes through $(-4,\\,2)$. What is its slope?'), solution: same('$2=m\\cdot(-4)\\to m=-\\frac{1}{2}$'), answer: { expected: n(-1, 2) } },
            { id: 18, difficulty: 'medium', question: say('Non ebakitzen dute $y=3x-1$ eta $y=-x+3$ zuzenek? Eman $x$.', '¿Dónde se cortan $y=3x-1$ e $y=-x+3$? Da la $x$.', 'أين يتقاطع $y=3x-1$ و$y=-x+3$؟ أعطِ $x$.', 'Where do $y=3x-1$ and $y=-x+3$ meet? Give the $x$-value.'), solution: same('$3x-1=-x+3\\to 4x=4\\to x=1$'), answer: { expected: n(1) } },
            { id: 19, difficulty: 'hard', question: say('$(4,\\,0)$ eta $(-2,\\,a)$ puntuetatik pasatzen den zuzenaren malda $-1$ da. Zenbat da $a$?', 'La recta que pasa por $(4,\\,0)$ y $(-2,\\,a)$ tiene pendiente $-1$. ¿Cuánto vale $a$?', 'المستقيم المار بـ $(4,\\,0)$ و$(-2,\\,a)$ ميله $-1$. كم تساوي $a$؟', 'The straight line through $(4,\\,0)$ and $(-2,\\,a)$ has slope $-1$. What is $a$?'), solution: same('$\\frac{a-0}{-2-4}=-1\\to a=6$'), answer: { expected: n(6) } },
            { id: 20, difficulty: 'hard', question: say('$(d,\\,-2)$ puntua $y=\\frac{1}{2}x-3$ zuzenean dago. Zenbat da $d$?', 'El punto $(d,\\,-2)$ está en la recta $y=\\frac{1}{2}x-3$. ¿Cuánto vale $d$?', 'النقطة $(d,\\,-2)$ تقع على المستقيم $y=\\frac{1}{2}x-3$. كم تساوي $d$؟', 'The point $(d,\\,-2)$ is on the straight line $y=\\frac{1}{2}x-3$. What is $d$?'), solution: same('$-2=\\frac{1}{2}d-3\\to \\frac{1}{2}d=1\\to d=2$'), answer: { expected: n(2) } }
        ]
    },
    {
        id: 'quadratic',
        title: say('Funtzio koadratikoak', 'Funciones cuadráticas', 'الدوال التربيعية', 'Quadratic functions'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Egin $y=x^2+1$ funtzioaren taula $x=-4$tik $x=4$ra.', 'Haz la tabla de $y=x^2+1$ desde $x=-4$ hasta $x=4$.', 'اعمل جدول $y=x^2+1$ من $x=-4$ إلى $x=4$.', 'Make a table of $y=x^2+1$ from $x=-4$ to $x=4$.'), solution: say('$y$: 17, 10, 5, 2, 1, 2, 5, 10, 17. Erpina $(0,\\,1)$.', '$y$: 17, 10, 5, 2, 1, 2, 5, 10, 17. Vértice $(0,\\,1)$.', '$y$: 17، 10، 5، 2، 1، 2، 5، 10، 17. الرأس $(0,\\,1)$.', '$y$: 17, 10, 5, 2, 1, 2, 5, 10, 17. Vertex $(0,\\,1)$.') },
            { id: 22, difficulty: 'easy', question: say('Non ebakitzen du $y=-x^2+4$ parabolak X ardatza? Eman $x$ positiboa.', '¿Dónde corta $y=-x^2+4$ al eje X? Da la $x$ positiva.', 'أين يقطع $y=-x^2+4$ محور X؟ أعطِ $x$ الموجبة.', 'Where does $y=-x^2+4$ cross the x-axis? Give the positive $x$-value.'), solution: same('$-x^{2}+4=0\\to x^{2}=4\\to x=\\pm 2$'), answer: { expected: n(2) } },
            { id: 23, difficulty: 'easy', question: say('$y=0{,}4x^2$ parabolan, zenbat da $y$ $x=4$ denean?', 'En $y=0{,}4x^2$, ¿cuánto vale $y$ para $x=4$?', 'في $y=0{,}4x^2$، كم تساوي $y$ عند $x=4$؟', 'In $y=0{,}4x^2$, what is $y$ when $x=4$?'), solution: same('$0{,}4\\cdot 4^{2}=0{,}4\\cdot 16=6{,}4$'), answer: { expected: n(32, 5) } },
            { id: 24, difficulty: 'medium', question: say('Aurkitu $y=x^2-2x+2$ parabolaren erpinaren ordenatua.', 'Halla la ordenada del vértice de $y=x^2-2x+2$.', 'أوجد ترتيبة رأس $y=x^2-2x+2$.', 'Find the y-coordinate of the vertex of $y=x^2-2x+2$.'), solution: say('$x_V=\\frac{2}{2}=1$ eta $y_V=1-2+2=1$. Ez du X ardatza ebakitzen.', '$x_V=\\frac{2}{2}=1$ e $y_V=1-2+2=1$. No corta al eje X.', '$x_V=\\frac{2}{2}=1$ و$y_V=1-2+2=1$. لا يقطع محور X.', '$x_V=\\frac{2}{2}=1$ and $y_V=1-2+2=1$. It does not cross the x-axis.'), answer: { expected: n(1) } },
            { id: 25, difficulty: 'medium', question: say('Grafikoa $y=x^2-2x-3$ da. Zein da X ardatzeko ebakidura negatiboa?', 'La gráfica es $y=x^2-2x-3$. ¿Cuál es el corte negativo con el eje X?', 'الرسم هو $y=x^2-2x-3$. ما التقاطع السالب مع محور X؟', 'The function is $y=x^2-2x-3$. What is the negative x-intercept?'), solution: same('$x^{2}-2x-3=0\\to x=\\frac{2\\pm 4}{2}\\to x=3\\quad x=-1$'), answer: { expected: n(-1) }, graph: parabolaGraph },
            { id: 26, difficulty: 'medium', question: say('Zein da $y=-2x^2-2x-3$ parabolaren erpinaren abszisa?', '¿Cuál es la abscisa del vértice de $y=-2x^2-2x-3$?', 'ما فاصلة رأس $y=-2x^2-2x-3$؟', 'What is the x-coordinate of the vertex of $y=-2x^2-2x-3$?'), solution: same('$x_V=\\frac{2}{-4}=-\\frac{1}{2}$'), answer: { expected: n(-1, 2) } },
            { id: 27, difficulty: 'medium', question: say('$y=4+(3-x)^2$ parabolaren erpina maximoa ala minimoa da? Eman bere ordenatua.', '¿El vértice de $y=4+(3-x)^2$ es máximo o mínimo? Da su ordenada.', 'هل رأس $y=4+(3-x)^2$ قيمة عظمى أم صغرى؟ أعطِ ترتيبته.', 'Is the vertex of $y=4+(3-x)^2$ a maximum or a minimum? Give its y-coordinate.'), solution: say('$(3-x)^2=(x-3)^2$, beraz $V(3,\\,4)$, minimoa.', '$(3-x)^2=(x-3)^2$, así que $V(3,\\,4)$, mínimo.', '$(3-x)^2=(x-3)^2$، إذن $V(3,\\,4)$ قيمة صغرى.', '$(3-x)^2=(x-3)^2$, so $V(3,\\,4)$, minimum.'), answer: { expected: n(4) } },
            { id: 28, difficulty: 'medium', question: say('Zein da $y=(x-1)(x-3)$ parabolaren simetria-ardatza? Idatzi $x$.', '¿Cuál es el eje de simetría de $y=(x-1)(x-3)$? Escribe la $x$.', 'ما محور تماثل $y=(x-1)(x-3)$؟ اكتب $x$.', 'What is the axis of symmetry of $y=(x-1)(x-3)$? Write the $x$-value.'), solution: say('Ebakidurak $x=1$ eta $x=3$; ardatza erdian: $\\frac{1+3}{2}=2$.', 'Los cortes son $x=1$ y $x=3$; el eje está en medio: $\\frac{1+3}{2}=2$.', 'التقاطعان $x=1$ و$x=3$؛ والمحور في المنتصف: $\\frac{1+3}{2}=2$.', 'The intercepts are $x=1$ and $x=3$; the axis is in the middle: $\\frac{1+3}{2}=2$.'), answer: { expected: n(2) } },
            { id: 29, difficulty: 'hard', question: say('3 m-ko listoi batekin marko bat egin nahi da. Zenbat da azalera handiena (m²)?', 'Con un listón de 3 m se quiere hacer un marco. ¿Cuál es el área máxima (m²)?', 'نريد صنع إطار من عود طوله 3 م. ما أكبر مساحة (م²)؟', 'You have a 3 m length of wood and want to make a frame. What is the maximum area (m²)?'), solution: same('$A(x)=-x^{2}+1{,}5x\\qquad x_V=\\frac{-1{,}5}{-2}=0{,}75\\qquad 0{,}75\\cdot 0{,}75=0{,}5625$'), answer: { expected: n(9, 16) } },
            { id: 30, difficulty: 'hard', question: say('$y=ax^2+bx$ parabola $(1,\\,3)$ eta $(4,\\,6)$ puntuetatik pasatzen da. Zenbat da $a$?', 'La parábola $y=ax^2+bx$ pasa por $(1,\\,3)$ y $(4,\\,6)$. ¿Cuánto vale $a$?', 'يمر القطع $y=ax^2+bx$ بـ $(1,\\,3)$ و$(4,\\,6)$. كم تساوي $a$؟', 'The parabola $y=ax^2+bx$ passes through $(1,\\,3)$ and $(4,\\,6)$. What is $a$?'), solution: same('$a+b=3\\qquad 16a+4b=6\\to 16a+12-4a=6\\to a=-\\frac{1}{2}$'), answer: { expected: n(-1, 2) } }
        ]
    },
    {
        id: 'inverse',
        title: say('Alderantzizkoak eta erroak', 'Inversas y radicales', 'العكسية والجذرية', 'Inverse and radical functions'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Pablok 100 € ditu komikietan gastatzeko: $y=\\frac{100}{x}$. Zenbat komiki eros ditzake bakoitzak 4 € balio badu?', 'Pablo tiene 100 € para cómics: $y=\\frac{100}{x}$. ¿Cuántos compra si cada uno cuesta 4 €?', 'لدى بابلو 100 € للمجلات المصورة: $y=\\frac{100}{x}$. كم يشتري إذا كان ثمن الواحدة 4 €؟', 'Pablo has €100 for comics: $y=\\frac{100}{x}$. How many comics can he buy if each one costs €4?'), solution: same('$y=\\frac{100}{4}=25$'), answer: { expected: n(25) } },
            { id: 32, difficulty: 'easy', question: say('60 bidaiarik 3 € ordaintzen dute bakoitzak. Zenbat ordainduko lukete 15 bidaiarik?', '60 viajeros pagan 3 € cada uno. ¿Cuánto pagaría cada uno si fueran 15?', 'يدفع 60 راكبًا 3 € لكل واحد. كم يدفع كل واحد لو كانوا 15؟', '60 passengers pay €3 each. How much would each one pay if there were 15?'), solution: same('$k=60\\cdot 3=180\\to y=\\frac{180}{15}=12$'), answer: { expected: n(12) } },
            { id: 33, difficulty: 'easy', question: say('Zein zenbaki ez dago $y=\\frac{1}{x+1}$ funtzioaren izate-eremuan?', '¿Qué número no está en el dominio de $y=\\frac{1}{x+1}$?', 'ما العدد الذي ليس في مجال $y=\\frac{1}{x+1}$؟', 'Which number is not in the domain of $y=\\frac{1}{x+1}$?'), solution: same('$x+1=0\\to x=-1$'), answer: { expected: n(-1) } },
            { id: 34, difficulty: 'medium', question: say('Zein da $y=\\frac{1}{x-1}+2$ funtzioaren asintota horizontala? Idatzi $y$.', '¿Cuál es la asíntota horizontal de $y=\\frac{1}{x-1}+2$? Escribe la $y$.', 'ما المقارب الأفقي لـ $y=\\frac{1}{x-1}+2$؟ اكتب $y$.', 'What is the horizontal asymptote of $y=\\frac{1}{x-1}+2$? Write the $y$-value.'), solution: say('Asintotak: $x=1$ eta $y=2$.', 'Asíntotas: $x=1$ e $y=2$.', 'المقاربان: $x=1$ و$y=2$.', 'Asymptotes: $x=1$ and $y=2$.'), answer: { expected: n(2) } },
            { id: 35, difficulty: 'medium', question: say('$y=\\frac{4}{x}$ funtzioan, zenbat da $y$ $x=-0{,}5$ denean?', 'En $y=\\frac{4}{x}$, ¿cuánto vale $y$ para $x=-0{,}5$?', 'في $y=\\frac{4}{x}$، كم تساوي $y$ عند $x=-0{,}5$؟', 'In $y=\\frac{4}{x}$, what is $y$ when $x=-0{,}5$?'), solution: same('$\\frac{4}{-0{,}5}=-8$'), answer: { expected: n(-8) } },
            { id: 36, difficulty: 'medium', question: say('48 behirentzako pentsuak 15 egun irauten du. 5 behi saltzen badira, zenbat egun osotan iraungo du?', 'El pienso para 48 vacas dura 15 días. Si se venden 5 vacas, ¿para cuántos días completos llega?', 'يكفي العلف 48 بقرة 15 يومًا. إذا بيعت 5 بقرات، لكم يومًا كاملًا يكفي؟', 'The feed for 48 cows lasts 15 days. If 5 cows are sold, for how many full days will it last?'), solution: same('$k=48\\cdot 15=720\\qquad \\frac{720}{43}\\approx 16{,}74$'), answer: { expected: n(16) } },
            { id: 37, difficulty: 'medium', question: say('$y=\\sqrt{x-3}$ funtzioaren izate-eremua $[a,\\,+\\infty)$ da. Zenbat da $a$?', 'El dominio de $y=\\sqrt{x-3}$ es $[a,\\,+\\infty)$. ¿Cuánto vale $a$?', 'مجال $y=\\sqrt{x-3}$ هو $[a,\\,+\\infty)$. كم تساوي $a$؟', 'The domain of $y=\\sqrt{x-3}$ is $[a,\\,+\\infty)$. What is $a$?'), solution: same('$x-3\\ge 0\\to x\\ge 3$'), answer: { expected: n(3) } },
            { id: 38, difficulty: 'medium', question: say('$y=3-\\sqrt{-x}$ funtzioaren izate-eremua $(-\\infty,\\,b]$ da. Zenbat da $b$?', 'El dominio de $y=3-\\sqrt{-x}$ es $(-\\infty,\\,b]$. ¿Cuánto vale $b$?', 'مجال $y=3-\\sqrt{-x}$ هو $(-\\infty,\\,b]$. كم تساوي $b$؟', 'The domain of $y=3-\\sqrt{-x}$ is $(-\\infty,\\,b]$. What is $b$?'), solution: same('$-x\\ge 0\\to x\\le 0$'), answer: { expected: n(0) } },
            { id: 39, difficulty: 'hard', question: say('Kalkulatu $y=7-\\sqrt{2x+4}$ funtzioaren balioa $x=6$ denean.', 'Calcula el valor de $y=7-\\sqrt{2x+4}$ para $x=6$.', 'احسب قيمة $y=7-\\sqrt{2x+4}$ عند $x=6$.', 'Calculate the value of $y=7-\\sqrt{2x+4}$ when $x=6$.'), solution: same('$7-\\sqrt{2\\cdot 6+4}=7-\\sqrt{16}=7-4=3$'), answer: { expected: n(3) } },
            { id: 40, difficulty: 'hard', question: say('$y=\\frac{a}{x-b}$ funtzioa $(2,\\,2)$ eta $(-1,\\,-1)$ puntuetatik pasatzen da. Zenbat da $b$?', 'La función $y=\\frac{a}{x-b}$ pasa por $(2,\\,2)$ y $(-1,\\,-1)$. ¿Cuánto vale $b$?', 'تمر الدالة $y=\\frac{a}{x-b}$ بـ $(2,\\,2)$ و$(-1,\\,-1)$. كم تساوي $b$؟', 'The function $y=\\frac{a}{x-b}$ passes through $(2,\\,2)$ and $(-1,\\,-1)$. What is $b$?'), solution: say('$a=2(2-b)$ eta $a=-1\\cdot(-1-b)=1+b$. Berdinduz: $4-2b=1+b$, $b=1$ eta $a=2$: $y=\\frac{2}{x-1}$.', '$a=2(2-b)$ y $a=-1\\cdot(-1-b)=1+b$. Igualando: $4-2b=1+b$, $b=1$ y $a=2$: $y=\\frac{2}{x-1}$.', '$a=2(2-b)$ و$a=-1\\cdot(-1-b)=1+b$. بالمساواة: $4-2b=1+b$ و$b=1$ و$a=2$: $y=\\frac{2}{x-1}$.', '$a=2(2-b)$ and $a=-1\\cdot(-1-b)=1+b$. Setting them equal: $4-2b=1+b$, $b=1$ and $a=2$: $y=\\frac{2}{x-1}$.'), answer: { expected: n(1) } }
        ]
    },
    {
        id: 'exponential',
        title: say('Esponentzialak eta ereduak', 'Exponenciales y modelos', 'الأسية والنماذج', 'Exponential functions and models'),
        items: [
            { id: 41, difficulty: 'easy', question: say('$y=2^x$ funtzioan, zenbat da $y$ $x=-3$ denean?', 'En $y=2^x$, ¿cuánto vale $y$ para $x=-3$?', 'في $y=2^x$، كم تساوي $y$ عند $x=-3$؟', 'In $y=2^x$, what is $y$ when $x=-3$?'), solution: same('$2^{-3}=\\frac{1}{8}=0{,}125$'), answer: { expected: n(1, 8) } },
            { id: 42, difficulty: 'easy', question: say('$y=1{,}5^x$ funtzioan, zenbat da $y$ $x=2$ denean?', 'En $y=1{,}5^x$, ¿cuánto vale $y$ para $x=2$?', 'في $y=1{,}5^x$، كم تساوي $y$ عند $x=2$؟', 'In $y=1{,}5^x$, what is $y$ when $x=2$?'), solution: same('$1{,}5^{2}=2{,}25$'), answer: { expected: n(9, 4) } },
            { id: 43, difficulty: 'easy', question: say('Gorakorrak ala beherakorrak dira? a) $y=3^x$ b) $y=0{,}8^x$ c) $y=\\left(\\frac{1}{3}\\right)^x$ d) $y=1{,}24^x$', '¿Crecientes o decrecientes? a) $y=3^x$ b) $y=0{,}8^x$ c) $y=\\left(\\frac{1}{3}\\right)^x$ d) $y=1{,}24^x$', 'متزايدة أم متناقصة؟ أ) $y=3^x$ ب) $y=0{,}8^x$ ج) $y=\\left(\\frac{1}{3}\\right)^x$ د) $y=1{,}24^x$', 'Increasing or decreasing? a) $y=3^x$ b) $y=0{,}8^x$ c) $y=\\left(\\frac{1}{3}\\right)^x$ d) $y=1{,}24^x$'), solution: say('a) eta d) gorakorrak (oinarria $>1$); b) eta c) beherakorrak (oinarria 0 eta 1 artean).', 'a) y d) crecientes (base $>1$); b) y c) decrecientes (base entre 0 y 1).', 'أ) ود) متزايدتان (الأساس $>1$)؛ ب) وج) متناقصتان (الأساس بين 0 و1).', 'a) and d) increasing (base $>1$); b) and c) decreasing (base between 0 and 1).') },
            { id: 44, difficulty: 'medium', question: say('Kalkulatu $y=3^x+1$ funtzioaren balioa $x=3$ denean.', 'Calcula el valor de $y=3^x+1$ para $x=3$.', 'احسب قيمة $y=3^x+1$ عند $x=3$.', 'Calculate the value of $y=3^x+1$ for $x=3$.'), solution: same('$3^{3}+1=27+1=28$'), answer: { expected: n(28) } },
            { id: 45, difficulty: 'medium', question: say('Ana-k 24 000 € irabazten ditu eta soldata urtero % 8 igotzen zaio. Idatzi funtzioa eta kalkulatu zenbat irabaziko duen 10 urte barru.', 'Ana gana 24 000 € y su sueldo sube un 8 % cada año. Escribe la función y calcula cuánto ganará dentro de 10 años.', 'تكسب آنا 24 000 € ويزيد راتبها 8 % كل سنة. اكتب الدالة واحسب كم ستكسب بعد 10 سنوات.', 'Ana earns €24,000 and her salary goes up 8% each year. Write the function and calculate how much she will earn in 10 years.'), solution: same('$s(t)=24\\,000\\cdot 1{,}08^{t}\\qquad s(10)\\approx 51\\,814{,}20$') },
            { id: 46, difficulty: 'medium', question: say('$y=0{,}25^x$ funtzioan, zenbat da $y$ $x=-2$ denean?', 'En $y=0{,}25^x$, ¿cuánto vale $y$ para $x=-2$?', 'في $y=0{,}25^x$، كم تساوي $y$ عند $x=-2$؟', 'In $y=0{,}25^x$, what is $y$ when $x=-2$?'), solution: same('$0{,}25^{-2}=\\frac{1}{0{,}0625}=16$'), answer: { expected: n(16) } },
            { id: 47, difficulty: 'medium', question: say('Grafikoa $y=k\\cdot a^x$ da. Zenbat da $k$?', 'La gráfica es $y=k\\cdot a^x$. ¿Cuánto vale $k$?', 'الرسم هو $y=k\\cdot a^x$. كم تساوي $k$؟', 'The graph is $y=k\\cdot a^x$. What is $k$?'), solution: say('$k$ da $x=0$ denean dagoen balioa: $k=4$. Gainera $a=\\frac{1}{2}$, beherakorra.', '$k$ es el valor para $x=0$: $k=4$. Además $a=\\frac{1}{2}$, decreciente.', '$k$ هي القيمة عند $x=0$: $k=4$. كما أن $a=\\frac{1}{2}$، متناقصة.', '$k$ is the value for $x=0$: $k=4$. Also $a=\\frac{1}{2}$, decreasing.'), answer: { expected: n(4) }, graph: exponentialGraph },
            { id: 48, difficulty: 'medium', question: say('500 bakterio daude eta orduro bikoizten dira. Zenbat ordutan izango dira 16 000?', 'Hay 500 bacterias y se duplican cada hora. ¿En cuántas horas habrá 16 000?', 'توجد 500 بكتيريا وتتضاعف كل ساعة. بعد كم ساعة تصبح 16 000؟', 'There are 500 bacteria, and they double every hour. In how many hours will there be 16,000?'), solution: same('$500\\cdot 2^{x}=16\\,000\\to 2^{x}=32\\to x=5$'), answer: { expected: n(5) } },
            { id: 49, difficulty: 'hard', question: say('$y=k\\cdot a^x$ funtzioa $(0,\\,5)$ eta $(2,\\,20)$ puntuetatik pasatzen da. Zenbat da $a$?', 'La función $y=k\\cdot a^x$ pasa por $(0,\\,5)$ y $(2,\\,20)$. ¿Cuánto vale $a$?', 'تمر الدالة $y=k\\cdot a^x$ بـ $(0,\\,5)$ و$(2,\\,20)$. كم تساوي $a$؟', 'The function $y=k\\cdot a^x$ passes through $(0,\\,5)$ and $(2,\\,20)$. What is $a$?'), solution: same('$k=5\\qquad 5a^{2}=20\\to a^{2}=4\\to a=2$'), answer: { expected: n(2) } },
            { id: 50, difficulty: 'hard', question: say('Kutxa baten kostua $y=\\frac{0{,}3x+1000}{x}$ € da. Zenbat balio du bakoitzak 10 kutxa egiten badira?', 'El coste por caja es $y=\\frac{0{,}3x+1000}{x}$ €. ¿Cuánto cuesta cada una si se fabrican 10 cajas?', 'تكلفة العلبة $y=\\frac{0{,}3x+1000}{x}$ €. كم تكلف الواحدة إذا صُنعت 10 علب؟', 'The cost per box is $y=\\frac{0{,}3x+1000}{x}$ euros. How much does each one cost if 10 boxes are made?'), solution: same('$\\frac{0{,}3\\cdot 10+1000}{10}=\\frac{1003}{10}=100{,}3$'), answer: { expected: n(1003, 10) } }
        ]
    }
]
