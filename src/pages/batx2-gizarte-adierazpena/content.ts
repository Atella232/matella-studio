import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Funtzioen adierazpen grafikoa · Batxilergoa 2 · Gizarte Zientziak —
   diagnostic, guided practice, exercise bank and challenges, with the
   scope of unit 8 of Santillana and Anaya 2.º Bachillerato CCSS (all the
   exercises, numbers and contexts are our own). Every closed answer is a
   single number: a point out of the domain, an intercept, the x of an
   asymptote, the n of y = mx + n, the x or the value of an extremum or an
   inflection, or a parameter of a model.
   ========================================================================== */

const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

/** «f(x) = …: the vertical asymptote x = a. Give a.» */
const verticalOf = (formula: string) => say(`Zein da $f(x)=${formula}$ funtzioaren asintota bertikala? Eman $x$.`, `¿Cuál es la asíntota vertical de $f(x)=${formula}$? Da la $x$.`, `ما المقارب العمودي للدالة $f(x)=${formula}$؟ اكتب $x$.`, `What is the vertical asymptote of $f(x)=${formula}$? Give $x$.`)
/** «f(x) = …: the horizontal asymptote y = b. Give b.» */
const horizontalOf = (formula: string) => say(`Zein da $f(x)=${formula}$ funtzioaren asintota horizontala? Eman $y$.`, `¿Cuál es la asíntota horizontal de $f(x)=${formula}$? Da la $y$.`, `ما المقارب الأفقي للدالة $f(x)=${formula}$؟ اكتب $y$.`, `What is the horizontal asymptote of $f(x)=${formula}$? Give $y$.`)
/** «The oblique asymptote of f is y = mx + n. What is n?» */
const obliqueN = (formula: string) => say(`$f(x)=${formula}$ funtzioaren asintota zeiharra $y=mx+n$ da. Zenbat da $n$?`, `La asíntota oblicua de $f(x)=${formula}$ es $y=mx+n$. ¿Cuánto vale $n$?`, `المقارب المائل للدالة $f(x)=${formula}$ هو $y=mx+n$. كم تساوي $n$؟`, `The oblique asymptote of $f(x)=${formula}$ is $y=mx+n$. What is $n$?`)
/** «The x of the point of inflection» */
const inflectionX = (formula: string) => say(`Zein $x$ baliotan du $f(x)=${formula}$ funtzioak inflexio-puntua?`, `¿En qué $x$ tiene $f(x)=${formula}$ un punto de inflexión?`, `عند أي $x$ يكون للدالة $f(x)=${formula}$ نقطة انعطاف؟`, `At which $x$ does $f(x)=${formula}$ have a point of inflection?`)
/** «Draw f: domain, asymptotes, extrema» */
const sketch = (formula: string) => say(`Egin $f(x)=${formula}$ funtzioaren fitxa eta marraztu.`, `Haz la ficha de $f(x)=${formula}$ y dibújala.`, `أنجز بطاقة $f(x)=${formula}$ وارسمها.`, `Make the card of $f(x)=${formula}$ and draw it.`)

export const bach2gSketchDiagnostic: DiagnosticQuestion[] = [
    {
        id: 148001,
        prompt: say('Zein $x$ baliotan ez dago $\\frac{1}{x-5}$?', '¿Para qué $x$ no existe $\\frac{1}{x-5}$?', 'عند أي $x$ لا يوجد $\\frac{1}{x-5}$؟', 'For which $x$ does $\\frac{1}{x-5}$ not exist?'),
        options: [same('$x=5$'), same('$x=-5$'), same('$x=0$')],
        correctIndex: 0,
        explanation: same('$x-5=0\\ \\to\\ x=5$'),
        topic: 'domain'
    },
    {
        id: 148002,
        prompt: say('$f(-x)=f(x)$ bada, grafikoa simetrikoa da…', 'Si $f(-x)=f(x)$, la gráfica es simétrica respecto…', 'إذا كانت $f(-x)=f(x)$ فالتمثيل متناظر بالنسبة إلى…', 'If $f(-x)=f(x)$, the graph is symmetric about…'),
        options: [say('jatorriarekiko', 'al origen', 'المبدأ', 'the origin'), say('$Y$ ardatzarekiko', 'al eje $Y$', 'محور $Y$', 'the $Y$ axis'), say('$X$ ardatzarekiko', 'al eje $X$', 'محور $X$', 'the $X$ axis')],
        correctIndex: 1,
        explanation: say('Bikoitia: $Y$ ardatza ispilua da.', 'Par: el eje $Y$ es un espejo.', 'زوجية: محور $Y$ مرآة.', 'Even: the $Y$ axis is a mirror.'),
        topic: 'symmetry'
    },
    {
        id: 148003,
        prompt: say('Non mozten du $y=2x-6$ zuzenak $X$ ardatza?', '¿Dónde corta $y=2x-6$ al eje $X$?', 'أين يقطع $y=2x-6$ محور $X$؟', 'Where does $y=2x-6$ cut the $X$ axis?'),
        options: [same('$x=-6$'), same('$x=6$'), same('$x=3$')],
        correctIndex: 2,
        explanation: same('$2x-6=0\\ \\to\\ x=3$'),
        topic: 'intercepts'
    },
    {
        id: 148004,
        prompt: say('Zenbat da $\\lim_{x\\to+\\infty}\\frac{3x+1}{x+2}$?', '¿Cuánto vale $\\lim_{x\\to+\\infty}\\frac{3x+1}{x+2}$?', 'كم تساوي $\\lim_{x\\to+\\infty}\\frac{3x+1}{x+2}$؟', 'What is $\\lim_{x\\to+\\infty}\\frac{3x+1}{x+2}$?'),
        options: [same('$3$'), same('$\\frac{1}{2}$'), same('$+\\infty$')],
        correctIndex: 0,
        explanation: same('$\\frac{3}{1}=3$'),
        topic: 'horizontal'
    },
    {
        id: 148005,
        prompt: say('Zenbat da $\\lim_{x\\to 2^+}\\frac{1}{x-2}$?', '¿Cuánto vale $\\lim_{x\\to 2^+}\\frac{1}{x-2}$?', 'كم تساوي $\\lim_{x\\to 2^+}\\frac{1}{x-2}$؟', 'What is $\\lim_{x\\to 2^+}\\frac{1}{x-2}$?'),
        options: [same('$-\\infty$'), same('$+\\infty$'), same('$0$')],
        correctIndex: 1,
        explanation: say('Zenbaki positibo bat zati zero positiboa: $+\\infty$.', 'Un positivo entre un cero positivo: $+\\infty$.', 'عدد موجب على صفر موجب: $+\\infty$.', 'A positive number over a positive zero: $+\\infty$.'),
        topic: 'vertical'
    },
    {
        id: 148006,
        prompt: say('$(1,4)$ tartean $f\'(x)<0$ bada, nolakoa da $f$ han?', 'Si $f\'(x)<0$ en $(1,4)$, ¿cómo es $f$ allí?', 'إذا كانت $f\'(x)<0$ في $(1,4)$ فكيف تكون $f$ هناك؟', 'If $f\'(x)<0$ on $(1,4)$, how is $f$ there?'),
        options: [say('Gorakorra', 'Creciente', 'متزايدة', 'Increasing'), say('Konstantea', 'Constante', 'ثابتة', 'Constant'), say('Beherakorra', 'Decreciente', 'متناقصة', 'Decreasing')],
        correctIndex: 2,
        explanation: say('Malda negatiboa: behera.', 'Pendiente negativa: baja.', 'ميل سالب: تنزل.', 'Negative slope: it falls.'),
        topic: 'monotony'
    },
    {
        id: 148007,
        prompt: say('$f\'\'(x)>0$ bada, nolakoa da kurba?', 'Si $f\'\'(x)>0$, ¿cómo es la curva?', 'إذا كانت $f\'\'(x)>0$ فكيف يكون المنحنى؟', 'If $f\'\'(x)>0$, how is the curve?'),
        options: [say('Ahurra (∪)', 'Cóncava (∪)', 'مقعّرة نحو الأعلى (∪)', 'Concave up (∪)'), say('Ganbila (∩)', 'Convexa (∩)', 'مقعّرة نحو الأسفل (∩)', 'Concave down (∩)'), say('Zuzena', 'Recta', 'مستقيمة', 'Straight')],
        correctIndex: 0,
        explanation: say('Maldak handitzen doaz: ∪.', 'Las pendientes aumentan: ∪.', 'الميول تزداد: ∪.', 'The slopes increase: ∪.'),
        topic: 'concavity'
    },
    {
        id: 148008,
        prompt: say('Zein $x$ baliotarako dago $\\ln x$?', '¿Para qué $x$ existe $\\ln x$?', 'لأي $x$ يوجد $\\ln x$؟', 'For which $x$ does $\\ln x$ exist?'),
        options: [same('$x\\ge 0$'), same('$x>0$'), same('$x\\in\\mathbb{R}$')],
        correctIndex: 1,
        explanation: say('Logaritmoaren barrukoak positiboa izan behar du.', 'Lo de dentro del logaritmo tiene que ser positivo.', 'يجب أن يكون ما داخل اللوغاريتم موجبًا.', 'What is inside the logarithm must be positive.'),
        topic: 'exp-log'
    }
]

export const bach2gSketchPractice: PracticeItem[] = [
    /* ---------- At first sight ---------- */
    { id: 1, stage: 'first', prompt: say('Zenbat puntu geratzen dira $f(x)=\\frac{x}{x^2-9}$ funtzioaren izate-eremutik kanpo?', '¿Cuántos puntos quedan fuera del dominio de $f(x)=\\frac{x}{x^2-9}$?', 'كم نقطة تبقى خارج مجال تعريف $f(x)=\\frac{x}{x^2-9}$؟', 'How many points are left out of the domain of $f(x)=\\frac{x}{x^2-9}$?'), expected: n(2), hint: same('$x^2-9=0$'), explanation: say('$x=-3$ eta $x=3$: 2 puntu.', '$x=-3$ y $x=3$: 2 puntos.', '$x=-3$ و$x=3$: نقطتان (2).', '$x=-3$ and $x=3$: 2 points.') },
    { id: 2, stage: 'first', prompt: say('Non mozten du $f(x)=\\frac{2x+6}{x-3}$ funtzioak $Y$ ardatza? Eman $y$.', '¿Dónde corta $f(x)=\\frac{2x+6}{x-3}$ al eje $Y$? Da la $y$.', 'أين تقطع $f(x)=\\frac{2x+6}{x-3}$ محور $Y$؟ اكتب $y$.', 'Where does $f(x)=\\frac{2x+6}{x-3}$ cut the $Y$ axis? Give $y$.'), expected: n(-2), hint: same('$f(0)$'), explanation: same('$f(0)=\\frac{6}{-3}=-2$') },
    { id: 3, stage: 'first', prompt: say('Non mozten du $f(x)=\\frac{x-5}{x+1}$ funtzioak $X$ ardatza? Eman $x$.', '¿Dónde corta $f(x)=\\frac{x-5}{x+1}$ al eje $X$? Da la $x$.', 'أين تقطع $f(x)=\\frac{x-5}{x+1}$ محور $X$؟ اكتب $x$.', 'Where does $f(x)=\\frac{x-5}{x+1}$ cut the $X$ axis? Give $x$.'), expected: n(5), hint: say('Zenbakitzailea zero.', 'Numerador cero.', 'البسط صفر.', 'Numerator zero.'), explanation: same('$x-5=0\\ \\to\\ x=5$') },
    { id: 4, stage: 'first', prompt: say('$f(x)=x^3+4x$ bakoitia da. Kalkulatu $f(1)+f(-1)$.', '$f(x)=x^3+4x$ es impar. Calcula $f(1)+f(-1)$.', '$f(x)=x^3+4x$ فردية. احسب $f(1)+f(-1)$.', '$f(x)=x^3+4x$ is odd. Work out $f(1)+f(-1)$.'), expected: n(0), hint: same('$f(-1)=-f(1)$'), explanation: same('$5+(-5)=0$') },
    /* ---------- Asymptotes ---------- */
    { id: 5, stage: 'asymptotes', prompt: verticalOf('\\frac{x+1}{x-4}'), expected: n(4), hint: say('Izendatzailea zero.', 'Denominador cero.', 'المقام صفر.', 'Denominator zero.'), explanation: same('$x-4=0\\ \\to\\ x=4$') },
    { id: 6, stage: 'asymptotes', prompt: horizontalOf('\\frac{6x-1}{2x+5}'), expected: n(3), hint: say('Maila bera: koefizienteen zatidura.', 'Mismo grado: cociente de coeficientes.', 'الدرجة نفسها: خارج قسمة المعاملين.', 'Same degree: quotient of coefficients.'), explanation: same('$\\frac{6}{2}=3$') },
    { id: 7, stage: 'asymptotes', prompt: obliqueN('\\frac{x^2+4x}{x+1}'), expected: n(3), hint: say('Zatitu $x^2+4x$ honen artean: $x+1$.', 'Divide $x^2+4x$ entre $x+1$.', 'اقسم $x^2+4x$ على $x+1$.', 'Divide $x^2+4x$ by $x+1$.'), explanation: same('$\\frac{x^2+4x}{x+1}=x+3-\\frac{3}{x+1}$') },
    { id: 8, stage: 'asymptotes', prompt: say('Herri bateko biztanleak $P(t)=\\frac{80t+10}{t+5}$ dira (milakatan). Zein baliotan egonkortzen dira?', 'La población de un pueblo es $P(t)=\\frac{80t+10}{t+5}$ (miles). ¿En qué valor se estabiliza?', 'سكان بلدة $P(t)=\\frac{80t+10}{t+5}$ (بالآلاف). عند أي قيمة يستقرون؟', 'A town has $P(t)=\\frac{80t+10}{t+5}$ inhabitants (thousands). At which value does it level off?'), expected: n(80), hint: same('$t\\to+\\infty$'), explanation: same('$\\frac{80}{1}=80$') },
    /* ---------- With derivatives ---------- */
    { id: 9, stage: 'derivatives', prompt: say('Zein $x$ baliotan du $f(x)=x^3-12x$ funtzioak maximo erlatiboa?', '¿En qué $x$ tiene $f(x)=x^3-12x$ un máximo relativo?', 'عند أي $x$ يكون للدالة $f(x)=x^3-12x$ قيمة عظمى محلية؟', 'At which $x$ does $f(x)=x^3-12x$ have a relative maximum?'), expected: n(-2), hint: same("$f'(x)=3x^2-12$"), explanation: same("$x=\\pm 2\\qquad f''(-2)=-12<0$") },
    { id: 10, stage: 'derivatives', prompt: say('Zein da $f(x)=\\frac{x}{x^2+9}$ funtzioaren maximoaren balioa?', '¿Cuánto vale el máximo de $f(x)=\\frac{x}{x^2+9}$?', 'كم تساوي القيمة العظمى للدالة $f(x)=\\frac{x}{x^2+9}$؟', 'What is the maximum value of $f(x)=\\frac{x}{x^2+9}$?'), expected: f(1, 6), hint: same("$f'(x)=\\frac{9-x^2}{(x^2+9)^2}$"), explanation: same('$x=3\\ \\to\\ f(3)=\\frac{3}{18}=\\frac{1}{6}$') },
    { id: 11, stage: 'derivatives', prompt: inflectionX('x^3-6x^2'), expected: n(2), hint: same("$f''(x)=6x-12$"), explanation: same('$6x-12=0\\ \\to\\ x=2$') },
    { id: 12, stage: 'derivatives', prompt: say('$f(x)=x^4-24x^2$ funtzioak bi inflexio-puntu ditu. Zein da $x$ positiboa?', '$f(x)=x^4-24x^2$ tiene dos puntos de inflexión. ¿Cuál es la $x$ positiva?', 'للدالة $f(x)=x^4-24x^2$ نقطتا انعطاف. ما قيمة $x$ الموجبة؟', '$f(x)=x^4-24x^2$ has two points of inflection. What is the positive $x$?'), expected: n(2), hint: same("$f''(x)=12x^2-48$"), explanation: same('$x^2=4\\ \\to\\ x=2$') },
    /* ---------- Complete graphs ---------- */
    { id: 13, stage: 'graphs', prompt: say('Zein da $f(x)=x^3-3x^2$ funtzioaren minimo erlatiboaren balioa?', '¿Cuánto vale el mínimo relativo de $f(x)=x^3-3x^2$?', 'كم تساوي القيمة الصغرى المحلية للدالة $f(x)=x^3-3x^2$؟', 'What is the relative minimum value of $f(x)=x^3-3x^2$?'), expected: n(-4), hint: same("$f'(x)=3x(x-2)$"), explanation: same('$f(2)=8-12=-4$') },
    { id: 14, stage: 'graphs', prompt: say('Zein da $f(x)=\\frac{x^2}{x-3}$ funtzioaren minimo erlatiboaren balioa?', '¿Cuánto vale el mínimo relativo de $f(x)=\\frac{x^2}{x-3}$?', 'كم تساوي القيمة الصغرى المحلية للدالة $f(x)=\\frac{x^2}{x-3}$؟', 'What is the relative minimum value of $f(x)=\\frac{x^2}{x-3}$?'), expected: n(12), hint: same("$f'(x)=\\frac{x(x-6)}{(x-3)^2}$"), explanation: same('$x=6\\ \\to\\ f(6)=\\frac{36}{3}=12$') },
    { id: 15, stage: 'graphs', prompt: say('Zein $x$ baliotan du $f(x)=xe^{-x}$ funtzioak maximoa?', '¿En qué $x$ tiene $f(x)=xe^{-x}$ su máximo?', 'عند أي $x$ تبلغ $f(x)=xe^{-x}$ قيمتها العظمى؟', 'At which $x$ does $f(x)=xe^{-x}$ have its maximum?'), expected: n(1), hint: same("$f'(x)=(1-x)e^{-x}$"), explanation: same('$1-x=0\\ \\to\\ x=1$') },
    { id: 16, stage: 'graphs', prompt: verticalOf('\\ln(x+3)'), expected: n(-3), hint: same('$x+3>0$'), explanation: same('$x+3=0\\ \\to\\ x=-3$') },
    /* ---------- Read and draw ---------- */
    { id: 17, stage: 'reading', prompt: say('Zein da $f(x)=|x^2-9|$ funtzioaren maximo erlatiboaren balioa?', '¿Cuánto vale el máximo relativo de $f(x)=|x^2-9|$?', 'كم تساوي القيمة العظمى المحلية للدالة $f(x)=|x^2-9|$؟', 'What is the relative maximum value of $f(x)=|x^2-9|$?'), expected: n(9), hint: say('Isladatu $(-3,3)$ tarteko zatia.', 'Refleja el trozo de $(-3,3)$.', 'اعكس الجزء الواقع في $(-3,3)$.', 'Reflect the piece on $(-3,3)$.'), explanation: same('$f(0)=|-9|=9$') },
    { id: 18, stage: 'reading', prompt: say('Zein $x$ baliotan du punta $f(x)=|x-7|$ funtzioak?', '¿En qué $x$ tiene el pico $f(x)=|x-7|$?', 'عند أي $x$ تقع زاوية $f(x)=|x-7|$؟', 'At which $x$ does $f(x)=|x-7|$ have its corner?'), expected: n(7), hint: same('$x-7=0$'), explanation: same('$x=7$') },
    { id: 19, stage: 'reading', prompt: say('Salmentak $V(t)=\\frac{60t}{t^2+9}$ dira (milakatan). Zein da balio handiena?', 'Las ventas son $V(t)=\\frac{60t}{t^2+9}$ (miles). ¿Cuál es el mayor valor?', 'المبيعات $V(t)=\\frac{60t}{t^2+9}$ (بالآلاف). ما أكبر قيمة؟', 'Sales are $V(t)=\\frac{60t}{t^2+9}$ (thousands). What is the largest value?'), expected: n(10), hint: same('$t=3$'), explanation: same('$V(3)=\\frac{180}{18}=10$') },
    { id: 20, stage: 'reading', prompt: say('$f(x)=1+\\frac{k}{x-2}$ funtzioak $(3,5)$ puntutik igaro behar du. Zenbat da $k$?', '$f(x)=1+\\frac{k}{x-2}$ tiene que pasar por $(3,5)$. ¿Cuánto vale $k$?', 'يجب أن تمر $f(x)=1+\\frac{k}{x-2}$ بـ $(3,5)$. كم تساوي $k$؟', '$f(x)=1+\\frac{k}{x-2}$ must pass through $(3,5)$. What is $k$?'), expected: n(4), hint: same('$f(3)=1+k$'), explanation: same('$1+k=5\\ \\to\\ k=4$') }
]

export const bach2gSketchChallenges: ChallengeItem[] = [
    { id: 101, stage: 'first', points: 10, context: 'starter', prompt: say('$f(x)=\\sqrt{8-2x}$ funtzioaren izate-eremua $(-\\infty,a]$ da. Zenbat da $a$?', 'El dominio de $f(x)=\\sqrt{8-2x}$ es $(-\\infty,a]$. ¿Cuánto vale $a$?', 'مجال تعريف $f(x)=\\sqrt{8-2x}$ هو $(-\\infty,a]$. كم تساوي $a$؟', 'The domain of $f(x)=\\sqrt{8-2x}$ is $(-\\infty,a]$. What is $a$?'), expected: n(4), hint: same('$8-2x\\ge 0$'), explanation: same('$2x\\le 8\\ \\to\\ x\\le 4$') },
    { id: 102, stage: 'first', points: 20, context: 'advanced', prompt: say('$f(x)=\\frac{x^2-1}{x^2-5x}$ funtzioak bi puntu ditu izate-eremutik kanpo. Bata $0$ da; zein da bestea?', '$f(x)=\\frac{x^2-1}{x^2-5x}$ tiene dos puntos fuera del dominio. Uno es $0$; ¿cuál es el otro?', 'للدالة $f(x)=\\frac{x^2-1}{x^2-5x}$ نقطتان خارج المجال. إحداهما $0$؛ فما الأخرى؟', '$f(x)=\\frac{x^2-1}{x^2-5x}$ has two points out of the domain. One is $0$; what is the other?'), expected: n(5), hint: same('$x(x-5)=0$'), explanation: same('$x=0\\qquad x=5$') },
    { id: 103, stage: 'first', points: 30, context: 'master', prompt: say('$f(x)=x^3+bx^2+x$ bakoitia da. Zenbat da $b$?', '$f(x)=x^3+bx^2+x$ es impar. ¿Cuánto vale $b$?', '$f(x)=x^3+bx^2+x$ فردية. كم تساوي $b$؟', '$f(x)=x^3+bx^2+x$ is odd. What is $b$?'), expected: n(0), hint: same('$f(-x)=-x^3+bx^2-x$'), explanation: say('$f(-x)=-f(x)$ izateko, $bx^2=-bx^2$: $b=0$.', 'Para que $f(-x)=-f(x)$, $bx^2=-bx^2$: $b=0$.', 'لكي $f(-x)=-f(x)$ يجب $bx^2=-bx^2$: $b=0$.', 'For $f(-x)=-f(x)$, $bx^2=-bx^2$: $b=0$.') },
    { id: 104, stage: 'asymptotes', points: 10, context: 'starter', prompt: verticalOf('\\frac{2x}{x+6}'), expected: n(-6), hint: same('$x+6=0$'), explanation: same('$x=-6$') },
    { id: 105, stage: 'asymptotes', points: 20, context: 'advanced', prompt: horizontalOf('\\frac{5x^2+1}{2x^2-3}'), expected: f(5, 2), hint: say('Maila bera: koefizienteen zatidura.', 'Mismo grado: cociente de coeficientes.', 'الدرجة نفسها: خارج قسمة المعاملين.', 'Same degree: quotient of coefficients.'), explanation: same('$y=\\frac{5}{2}$') },
    { id: 106, stage: 'asymptotes', points: 30, context: 'master', prompt: obliqueN('\\frac{2x^2+3x+1}{x-1}'), expected: n(5), hint: say('Zatitu $2x^2+3x+1$ honen artean: $x-1$.', 'Divide $2x^2+3x+1$ entre $x-1$.', 'اقسم $2x^2+3x+1$ على $x-1$.', 'Divide $2x^2+3x+1$ by $x-1$.'), explanation: same('$\\frac{2x^2+3x+1}{x-1}=2x+5+\\frac{6}{x-1}$') },
    { id: 107, stage: 'derivatives', points: 10, context: 'starter', prompt: say('Zein da $f(x)=x^3-27x$ funtzioaren minimo erlatiboaren balioa?', '¿Cuánto vale el mínimo relativo de $f(x)=x^3-27x$?', 'كم تساوي القيمة الصغرى المحلية للدالة $f(x)=x^3-27x$؟', 'What is the relative minimum value of $f(x)=x^3-27x$?'), expected: n(-54), hint: same("$f'(x)=3x^2-27$"), explanation: same('$x=3\\ \\to\\ f(3)=27-81=-54$') },
    { id: 108, stage: 'derivatives', points: 20, context: 'advanced', prompt: say('Zein $x$ baliotan du $f(x)=\\frac{x}{x^2+16}$ funtzioak maximoa?', '¿En qué $x$ tiene $f(x)=\\frac{x}{x^2+16}$ su máximo?', 'عند أي $x$ تبلغ $f(x)=\\frac{x}{x^2+16}$ قيمتها العظمى؟', 'At which $x$ does $f(x)=\\frac{x}{x^2+16}$ have its maximum?'), expected: n(4), hint: same("$f'(x)=\\frac{16-x^2}{(x^2+16)^2}$"), explanation: same('$16-x^2=0\\ \\to\\ x=4$') },
    { id: 109, stage: 'derivatives', points: 30, context: 'master', prompt: say('$f(x)=x^4-6x^3$ funtzioak inflexio-puntu bat du $x>0$ denean. Zein da $x$?', '$f(x)=x^4-6x^3$ tiene un punto de inflexión con $x>0$. ¿Cuál es la $x$?', 'للدالة $f(x)=x^4-6x^3$ نقطة انعطاف مع $x>0$. ما قيمة $x$؟', '$f(x)=x^4-6x^3$ has a point of inflection with $x>0$. What is $x$?'), expected: n(3), hint: same("$f''(x)=12x^2-36x$"), explanation: same("$f''(x)=12x(x-3)\\ \\to\\ x=3$") },
    { id: 110, stage: 'graphs', points: 10, context: 'starter', prompt: say('Zein da $f(x)=x^3-9x^2+24x$ funtzioaren maximo erlatiboaren balioa?', '¿Cuánto vale el máximo relativo de $f(x)=x^3-9x^2+24x$?', 'كم تساوي القيمة العظمى المحلية للدالة $f(x)=x^3-9x^2+24x$؟', 'What is the relative maximum value of $f(x)=x^3-9x^2+24x$?'), expected: n(20), hint: same("$f'(x)=3(x-2)(x-4)$"), explanation: same('$f(2)=8-36+48=20$') },
    { id: 111, stage: 'graphs', points: 20, context: 'advanced', prompt: say('Zein da $f(x)=\\frac{x^2+4}{x}$ funtzioaren minimo erlatiboaren balioa, $x>0$ denean?', '¿Cuánto vale el mínimo relativo de $f(x)=\\frac{x^2+4}{x}$ con $x>0$?', 'كم تساوي القيمة الصغرى المحلية للدالة $f(x)=\\frac{x^2+4}{x}$ مع $x>0$؟', 'What is the relative minimum value of $f(x)=\\frac{x^2+4}{x}$ for $x>0$?'), expected: n(4), hint: same("$f'(x)=1-\\frac{4}{x^2}$"), explanation: same('$x=2\\ \\to\\ f(2)=\\frac{8}{2}=4$') },
    { id: 112, stage: 'graphs', points: 30, context: 'master', prompt: say('Zein $x>0$ baliotan du $f(x)=x^2e^{-x}$ funtzioak maximoa?', '¿En qué $x>0$ tiene $f(x)=x^2e^{-x}$ su máximo?', 'عند أي $x>0$ تبلغ $f(x)=x^2e^{-x}$ قيمتها العظمى؟', 'At which $x>0$ does $f(x)=x^2e^{-x}$ have its maximum?'), expected: n(2), hint: same("$f'(x)=x(2-x)e^{-x}$"), explanation: same('$2-x=0\\ \\to\\ x=2$') },
    { id: 113, stage: 'reading', points: 10, context: 'starter', prompt: say('Zein da $f(x)=|x^2-6x|$ funtzioaren maximo erlatiboaren balioa?', '¿Cuánto vale el máximo relativo de $f(x)=|x^2-6x|$?', 'كم تساوي القيمة العظمى المحلية للدالة $f(x)=|x^2-6x|$؟', 'What is the relative maximum value of $f(x)=|x^2-6x|$?'), expected: n(9), hint: say('Erpina $x=3$ puntuan dago.', 'El vértice está en $x=3$.', 'الرأس عند $x=3$.', 'The vertex is at $x=3$.'), explanation: same('$|9-18|=9$') },
    { id: 114, stage: 'reading', points: 20, context: 'advanced', prompt: say('Salmentak $V(t)=\\frac{100t}{t^2+25}$ dira. Zein unetan dira maximoak?', 'Las ventas son $V(t)=\\frac{100t}{t^2+25}$. ¿En qué momento son máximas?', 'المبيعات $V(t)=\\frac{100t}{t^2+25}$. في أي لحظة تكون أعظمية؟', 'Sales are $V(t)=\\frac{100t}{t^2+25}$. At what moment do they peak?'), expected: n(5), hint: same("$V'(t)=\\frac{100(25-t^2)}{(t^2+25)^2}$"), explanation: same('$25-t^2=0\\ \\to\\ t=5$') },
    { id: 115, stage: 'reading', points: 30, context: 'master', prompt: say('$f(x)=b+\\frac{k}{x-1}$ funtzioak $(2,6)$ eta $(3,4)$ puntuetatik igaro behar du. Zenbat da $b$?', '$f(x)=b+\\frac{k}{x-1}$ tiene que pasar por $(2,6)$ y $(3,4)$. ¿Cuánto vale $b$?', 'يجب أن تمر $f(x)=b+\\frac{k}{x-1}$ بـ $(2,6)$ و$(3,4)$. كم تساوي $b$؟', '$f(x)=b+\\frac{k}{x-1}$ must pass through $(2,6)$ and $(3,4)$. What is $b$?'), expected: n(2), hint: same('$b+k=6\\qquad b+\\frac{k}{2}=4$'), explanation: same('$\\begin{gathered}\\frac{k}{2}=2\\ \\to\\ k=4\\\\ b=6-4=2\\end{gathered}$') }
]

export const bach2gSketchExerciseBank: ExerciseSection[] = [
    {
        id: 'first',
        title: say('Lehen begiradan', 'Lo que se ve primero', 'من النظرة الأولى', 'At first sight'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Aurkitu $f(x)=\\frac{3}{x+7}$ funtzioaren izate-eremua.', 'Halla el dominio de $f(x)=\\frac{3}{x+7}$.', 'أوجد مجال تعريف $f(x)=\\frac{3}{x+7}$.', 'Find the domain of $f(x)=\\frac{3}{x+7}$.'), solution: same('$D=\\mathbb{R}-\\{-7\\}$') },
            { id: 2, difficulty: 'easy', question: say('Aurkitu $f(x)=\\sqrt{x+1}$ funtzioaren izate-eremua.', 'Halla el dominio de $f(x)=\\sqrt{x+1}$.', 'أوجد مجال تعريف $f(x)=\\sqrt{x+1}$.', 'Find the domain of $f(x)=\\sqrt{x+1}$.'), solution: same('$x+1\\ge 0\\ \\to\\ D=[-1,+\\infty)$') },
            { id: 3, difficulty: 'easy', question: say('Aurkitu $f(x)=x^2-9$ funtzioaren ebaki-puntuak.', 'Halla los cortes de $f(x)=x^2-9$ con los ejes.', 'أوجد نقاط تقاطع $f(x)=x^2-9$ مع المحورين.', 'Find the intercepts of $f(x)=x^2-9$.'), solution: same('$(-3,0)\\qquad (3,0)\\qquad (0,-9)$') },
            { id: 4, difficulty: 'medium', question: say('Bikoitia ala bakoitia da $f(x)=x^4+x^2$?', '¿Es par o impar $f(x)=x^4+x^2$?', 'هل $f(x)=x^4+x^2$ زوجية أم فردية؟', 'Is $f(x)=x^4+x^2$ even or odd?'), solution: say('$f(-x)=x^4+x^2=f(x)$: bikoitia.', '$f(-x)=x^4+x^2=f(x)$: par.', '$f(-x)=x^4+x^2=f(x)$: زوجية.', '$f(-x)=x^4+x^2=f(x)$: even.') },
            { id: 5, difficulty: 'medium', question: say('Bikoitia ala bakoitia da $f(x)=\\frac{x}{x^2+1}$?', '¿Es par o impar $f(x)=\\frac{x}{x^2+1}$?', 'هل $f(x)=\\frac{x}{x^2+1}$ زوجية أم فردية؟', 'Is $f(x)=\\frac{x}{x^2+1}$ even or odd?'), solution: say('$f(-x)=\\frac{-x}{x^2+1}=-f(x)$: bakoitia.', '$f(-x)=\\frac{-x}{x^2+1}=-f(x)$: impar.', '$f(-x)=\\frac{-x}{x^2+1}=-f(x)$: فردية.', '$f(-x)=\\frac{-x}{x^2+1}=-f(x)$: odd.') },
            { id: 6, difficulty: 'medium', question: say('$f(x)=\\ln(6-x)$ funtzioaren izate-eremua $(-\\infty,a)$ da. Zenbat da $a$?', 'El dominio de $f(x)=\\ln(6-x)$ es $(-\\infty,a)$. ¿Cuánto vale $a$?', 'مجال تعريف $f(x)=\\ln(6-x)$ هو $(-\\infty,a)$. كم تساوي $a$؟', 'The domain of $f(x)=\\ln(6-x)$ is $(-\\infty,a)$. What is $a$?'), solution: same('$6-x>0\\ \\to\\ x<6$'), answer: { expected: n(6) } },
            { id: 7, difficulty: 'medium', question: say('Non mozten du $f(x)=\\frac{x+2}{x-1}$ funtzioak $Y$ ardatza? Eman $y$.', '¿Dónde corta $f(x)=\\frac{x+2}{x-1}$ al eje $Y$? Da la $y$.', 'أين تقطع $f(x)=\\frac{x+2}{x-1}$ محور $Y$؟ اكتب $y$.', 'Where does $f(x)=\\frac{x+2}{x-1}$ cut the $Y$ axis? Give $y$.'), solution: same('$f(0)=\\frac{2}{-1}=-2$'), answer: { expected: n(-2) } },
            { id: 8, difficulty: 'hard', question: say('Aurkitu $f(x)=\\frac{1}{\\sqrt{x-3}}$ funtzioaren izate-eremua.', 'Halla el dominio de $f(x)=\\frac{1}{\\sqrt{x-3}}$.', 'أوجد مجال تعريف $f(x)=\\frac{1}{\\sqrt{x-3}}$.', 'Find the domain of $f(x)=\\frac{1}{\\sqrt{x-3}}$.'), solution: say('Erroa izendatzailean dago: $x-3>0$, $D=(3,+\\infty)$.', 'La raíz está en el denominador: $x-3>0$, $D=(3,+\\infty)$.', 'الجذر في المقام: $x-3>0$، و$D=(3,+\\infty)$.', 'The root is in the denominator: $x-3>0$, $D=(3,+\\infty)$.') },
            { id: 9, difficulty: 'hard', question: say('Aztertu $f(x)=\\frac{x-2}{x+3}$ funtzioaren zeinua.', 'Estudia el signo de $f(x)=\\frac{x-2}{x+3}$.', 'ادرس إشارة $f(x)=\\frac{x-2}{x+3}$.', 'Study the sign of $f(x)=\\frac{x-2}{x+3}$.'), solution: same('$+\\ \\ (-3)\\ \\ -\\ \\ (2)\\ \\ +$') },
            { id: 10, difficulty: 'hard', question: say('$f(x)=x^3-x$ bakoitia dela egiaztatzeko, kalkulatu $f(2)+f(-2)$.', 'Para comprobar que $f(x)=x^3-x$ es impar, calcula $f(2)+f(-2)$.', 'للتحقق من أن $f(x)=x^3-x$ فردية احسب $f(2)+f(-2)$.', 'To check that $f(x)=x^3-x$ is odd, work out $f(2)+f(-2)$.'), solution: same('$6+(-6)=0$'), answer: { expected: n(0) } }
        ]
    },
    {
        id: 'asymptotes',
        title: say('Asintotak', 'Asíntotas', 'المقاربات', 'Asymptotes'),
        items: [
            { id: 11, difficulty: 'easy', question: verticalOf('\\frac{5}{x-2}'), solution: same('$x-2=0\\ \\to\\ x=2$'), answer: { expected: n(2) } },
            { id: 12, difficulty: 'easy', question: horizontalOf('\\frac{3x}{x+1}'), solution: same('$\\frac{3}{1}=3$'), answer: { expected: n(3) } },
            { id: 13, difficulty: 'easy', question: horizontalOf('\\frac{4}{x^2+1}'), solution: say('Behekoaren maila handiagoa: $y=0$.', 'El grado de abajo es mayor: $y=0$.', 'درجة المقام أكبر: $y=0$.', 'The bottom degree is bigger: $y=0$.'), answer: { expected: n(0) } },
            { id: 14, difficulty: 'medium', question: say('Aurkitu $f(x)=\\frac{x+1}{x^2-x-6}$ funtzioaren asintota bertikalak.', 'Halla las asíntotas verticales de $f(x)=\\frac{x+1}{x^2-x-6}$.', 'أوجد المقاربات العمودية للدالة $f(x)=\\frac{x+1}{x^2-x-6}$.', 'Find the vertical asymptotes of $f(x)=\\frac{x+1}{x^2-x-6}$.'), solution: same('$\\begin{gathered}x^2-x-6=(x-3)(x+2)\\\\ x=3\\qquad x=-2\\end{gathered}$') },
            { id: 15, difficulty: 'medium', question: say('Asintota bertikala al du $f(x)=\\frac{x^2-4}{x+2}$ funtzioak $x=-2$ zuzenean?', '¿Tiene $f(x)=\\frac{x^2-4}{x+2}$ asíntota vertical en $x=-2$?', 'هل لـ $f(x)=\\frac{x^2-4}{x+2}$ مقارب عمودي عند $x=-2$؟', 'Does $f(x)=\\frac{x^2-4}{x+2}$ have a vertical asymptote at $x=-2$?'), solution: say('Ez: $\\frac{x^2-4}{x+2}=x-2$; zuloa $(-2,-4)$ puntuan.', 'No: $\\frac{x^2-4}{x+2}=x-2$; agujero en $(-2,-4)$.', 'لا: $\\frac{x^2-4}{x+2}=x-2$؛ ثغرة عند $(-2,-4)$.', 'No: $\\frac{x^2-4}{x+2}=x-2$; a hole at $(-2,-4)$.') },
            { id: 16, difficulty: 'medium', question: obliqueN('\\frac{x^2+x+1}{x}'), solution: same('$\\frac{x^2+x+1}{x}=x+1+\\frac{1}{x}$'), answer: { expected: n(1) } },
            { id: 17, difficulty: 'medium', question: say('Kalkulatu $f(x)=\\frac{1}{(x-3)^2}$ funtzioaren alboko limiteak $x=3$ puntuan.', 'Calcula los límites laterales de $f(x)=\\frac{1}{(x-3)^2}$ en $x=3$.', 'احسب النهايتين الجانبيتين لـ $f(x)=\\frac{1}{(x-3)^2}$ عند $x=3$.', 'Work out the one-sided limits of $f(x)=\\frac{1}{(x-3)^2}$ at $x=3$.'), solution: say('Biak $+\\infty$: izendatzailea beti positiboa da; bi adarrak gora.', 'Los dos $+\\infty$: el denominador es siempre positivo; las dos ramas suben.', 'كلتاهما $+\\infty$: المقام موجب دائمًا؛ والفرعان يصعدان.', 'Both $+\\infty$: the denominator is always positive; both branches go up.') },
            { id: 18, difficulty: 'hard', question: obliqueN('\\frac{3x^2-2x}{x+1}'), solution: same('$\\frac{3x^2-2x}{x+1}=3x-5+\\frac{5}{x+1}$'), answer: { expected: n(-5) } },
            { id: 19, difficulty: 'hard', question: say('Batez besteko kostua $M(x)=\\frac{2x^2+100}{x}$ da. Zein asintota ditu?', 'El coste medio es $M(x)=\\frac{2x^2+100}{x}$. ¿Qué asíntotas tiene?', 'متوسط التكلفة $M(x)=\\frac{2x^2+100}{x}$. ما مقارباته؟', 'The average cost is $M(x)=\\frac{2x^2+100}{x}$. Which asymptotes does it have?'), solution: same('$\\begin{gathered}M(x)=2x+\\frac{100}{x}\\\\ x=0\\qquad y=2x\\end{gathered}$') },
            { id: 20, difficulty: 'hard', question: say('$f(x)=\\frac{ax+1}{x-2}$ funtzioaren asintota horizontala $y=3$ da. Zenbat da $a$?', 'La asíntota horizontal de $f(x)=\\frac{ax+1}{x-2}$ es $y=3$. ¿Cuánto vale $a$?', 'المقارب الأفقي لـ $f(x)=\\frac{ax+1}{x-2}$ هو $y=3$. كم تساوي $a$؟', 'The horizontal asymptote of $f(x)=\\frac{ax+1}{x-2}$ is $y=3$. What is $a$?'), solution: same('$\\frac{a}{1}=3\\ \\to\\ a=3$'), answer: { expected: n(3) } }
        ]
    },
    {
        id: 'derivatives',
        title: say('Deribatuekin', 'Con derivadas', 'بالمشتقات', 'With derivatives'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Zein $x$ baliotan du $f(x)=x^2-8x$ funtzioak minimoa?', '¿En qué $x$ tiene $f(x)=x^2-8x$ su mínimo?', 'عند أي $x$ تبلغ $f(x)=x^2-8x$ قيمتها الصغرى؟', 'At which $x$ does $f(x)=x^2-8x$ have its minimum?'), solution: same("$f'(x)=2x-8=0\\ \\to\\ x=4$"), answer: { expected: n(4) } },
            { id: 22, difficulty: 'easy', question: say('Zein da $f(x)=-x^2+6x+1$ funtzioaren maximoaren balioa?', '¿Cuánto vale el máximo de $f(x)=-x^2+6x+1$?', 'كم تساوي القيمة العظمى للدالة $f(x)=-x^2+6x+1$؟', 'What is the maximum value of $f(x)=-x^2+6x+1$?'), solution: same('$\\begin{gathered}x=3\\\\ f(3)=-9+18+1=10\\end{gathered}$'), answer: { expected: n(10) } },
            { id: 23, difficulty: 'easy', question: inflectionX('x^3-3x^2'), solution: same("$f''(x)=6x-6=0\\ \\to\\ x=1$"), answer: { expected: n(1) } },
            { id: 24, difficulty: 'medium', question: say('Zein $x$ baliotan du $f(x)=x^3-48x$ funtzioak maximo erlatiboa?', '¿En qué $x$ tiene $f(x)=x^3-48x$ un máximo relativo?', 'عند أي $x$ يكون للدالة $f(x)=x^3-48x$ قيمة عظمى محلية؟', 'At which $x$ does $f(x)=x^3-48x$ have a relative maximum?'), solution: same("$\\begin{gathered}3x^2-48=0\\ \\to\\ x=\\pm 4\\\\ f''(-4)=-24<0\\end{gathered}$"), answer: { expected: n(-4) } },
            { id: 25, difficulty: 'medium', question: say('Zein da $f(x)=\\frac{x}{x^2+25}$ funtzioaren maximoaren balioa?', '¿Cuánto vale el máximo de $f(x)=\\frac{x}{x^2+25}$?', 'كم تساوي القيمة العظمى للدالة $f(x)=\\frac{x}{x^2+25}$؟', 'What is the maximum value of $f(x)=\\frac{x}{x^2+25}$?'), solution: same('$x=5\\ \\to\\ f(5)=\\frac{5}{50}=\\frac{1}{10}$'), answer: { expected: f(1, 10) } },
            { id: 26, difficulty: 'medium', question: say('Zein da $f(x)=x^4-4x^3$ funtzioaren minimoaren balioa?', '¿Cuánto vale el mínimo de $f(x)=x^4-4x^3$?', 'كم تساوي القيمة الصغرى للدالة $f(x)=x^4-4x^3$؟', 'What is the minimum value of $f(x)=x^4-4x^3$?'), solution: same("$\\begin{gathered}f'(x)=4x^2(x-3)\\\\ f(3)=81-108=-27\\end{gathered}$"), answer: { expected: n(-27) } },
            { id: 27, difficulty: 'medium', question: say('Muturrik al du $f(x)=x^3-6x^2+12x$ funtzioak?', '¿Tiene extremos $f(x)=x^3-6x^2+12x$?', 'هل للدالة $f(x)=x^3-6x^2+12x$ قيم قصوى؟', 'Does $f(x)=x^3-6x^2+12x$ have extrema?'), solution: say('$f\'(x)=3(x-2)^2\\ge 0$: beti gorakorra, muturrik gabe; inflexioa $(2,8)$.', '$f\'(x)=3(x-2)^2\\ge 0$: siempre crece, sin extremos; inflexión en $(2,8)$.', '$f\'(x)=3(x-2)^2\\ge 0$: متزايدة دائمًا بلا قيم قصوى؛ والانعطاف $(2,8)$.', '$f\'(x)=3(x-2)^2\\ge 0$: always increasing, no extrema; inflection at $(2,8)$.') },
            { id: 28, difficulty: 'hard', question: say('Zein da $f(x)=\\frac{x^2+9}{x}$ funtzioaren minimo erlatiboaren balioa, $x>0$ denean?', '¿Cuánto vale el mínimo relativo de $f(x)=\\frac{x^2+9}{x}$ con $x>0$?', 'كم تساوي القيمة الصغرى المحلية للدالة $f(x)=\\frac{x^2+9}{x}$ مع $x>0$؟', 'What is the relative minimum value of $f(x)=\\frac{x^2+9}{x}$ for $x>0$?'), solution: same("$\\begin{gathered}f'(x)=1-\\frac{9}{x^2}\\ \\to\\ x=3\\\\ f(3)=6\\end{gathered}$"), answer: { expected: n(6) } },
            { id: 29, difficulty: 'hard', question: curvatureOf('\\frac{1}{x}'), solution: say('$f\'\'(x)=\\frac{2}{x^3}$: ganbila $x<0$ denean eta ahurra $x>0$ denean; ez dago inflexiorik, $x=0$ ez baitago izate-eremuan.', '$f\'\'(x)=\\frac{2}{x^3}$: convexa si $x<0$ y cóncava si $x>0$; no hay inflexión, porque $x=0$ no está en el dominio.', '$f\'\'(x)=\\frac{2}{x^3}$: مقعّرة نحو الأسفل إذا $x<0$ ونحو الأعلى إذا $x>0$؛ ولا انعطاف لأن $x=0$ ليست في المجال.', '$f\'\'(x)=\\frac{2}{x^3}$: concave down if $x<0$ and concave up if $x>0$; no inflection, as $x=0$ is not in the domain.') },
            { id: 30, difficulty: 'hard', question: say('Aurkitu $f(x)=x^4-12x^2$ funtzioaren inflexio-puntuak.', 'Halla los puntos de inflexión de $f(x)=x^4-12x^2$.', 'أوجد نقاط انعطاف $f(x)=x^4-12x^2$.', 'Find the points of inflection of $f(x)=x^4-12x^2$.'), solution: same("$\\begin{gathered}f''(x)=12x^2-24=0\\\\ x=\\pm\\sqrt{2}\\end{gathered}$") }
        ]
    },
    {
        id: 'graphs',
        title: say('Grafiko osoak', 'Gráficas completas', 'تمثيلات كاملة', 'Complete graphs'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Zein da $f(x)=x^2-4x+3$ parabolaren erpinaren $y$?', '¿Cuál es la $y$ del vértice de $f(x)=x^2-4x+3$?', 'ما $y$ رأس $f(x)=x^2-4x+3$؟', 'What is the $y$ of the vertex of $f(x)=x^2-4x+3$?'), solution: same('$x=2\\ \\to\\ f(2)=4-8+3=-1$'), answer: { expected: n(-1) } },
            { id: 32, difficulty: 'easy', question: say('Non mozten du $f(x)=(x-1)^2(x+3)$ funtzioak $X$ ardatza, eta nola?', '¿Dónde corta $f(x)=(x-1)^2(x+3)$ al eje $X$ y cómo?', 'أين تقطع $f(x)=(x-1)^2(x+3)$ محور $X$ وكيف؟', 'Where does $f(x)=(x-1)^2(x+3)$ cut the $X$ axis, and how?'), solution: say('$x=-3$ puntuan zeharkatzen du; $x=1$ puntuan ukitu bakarrik (erro bikoitza).', 'Atraviesa en $x=-3$; en $x=1$ solo toca (raíz doble).', 'تعبره عند $x=-3$؛ وعند $x=1$ تمسه فقط (جذر مضاعف).', 'It crosses at $x=-3$; at $x=1$ it only touches (double root).') },
            { id: 33, difficulty: 'easy', question: say('Aurkitu $f(x)=x^3-x^2$ funtzioaren ebaki-puntuak.', 'Halla los cortes de $f(x)=x^3-x^2$.', 'أوجد نقاط تقاطع $f(x)=x^3-x^2$.', 'Find the intercepts of $f(x)=x^3-x^2$.'), solution: same('$x^2(x-1)=0\\ \\to\\ x=0,\\ x=1$') },
            { id: 34, difficulty: 'medium', question: obliqueN('\\frac{x^2}{x+1}'), solution: same('$\\frac{x^2}{x+1}=x-1+\\frac{1}{x+1}$'), answer: { expected: n(-1) } },
            { id: 35, difficulty: 'medium', question: sketch('\\frac{x^2-3}{x-2}'), solution: same('$\\begin{gathered}x=2\\qquad y=x+2\\\\ \\frac{x^2-3}{x-2}=x+2+\\frac{1}{x-2}\\end{gathered}$') },
            { id: 36, difficulty: 'medium', question: say('Zein da $f(x)=e^{x}-x$ funtzioaren minimoaren balioa?', '¿Cuánto vale el mínimo de $f(x)=e^{x}-x$?', 'كم تساوي القيمة الصغرى للدالة $f(x)=e^{x}-x$؟', 'What is the minimum value of $f(x)=e^{x}-x$?'), solution: same("$\\begin{gathered}f'(x)=e^{x}-1=0\\ \\to\\ x=0\\\\ f(0)=1\\end{gathered}$"), answer: { expected: n(1) } },
            { id: 37, difficulty: 'medium', question: say('Non du maximoa $f(x)=\\frac{\\ln x}{x}$ funtzioak?', '¿Dónde tiene el máximo $f(x)=\\frac{\\ln x}{x}$?', 'أين القيمة العظمى للدالة $f(x)=\\frac{\\ln x}{x}$؟', 'Where does $f(x)=\\frac{\\ln x}{x}$ have its maximum?'), solution: same("$\\begin{gathered}f'(x)=\\frac{1-\\ln x}{x^2}\\ \\to\\ x=e\\\\ f(e)=\\frac{1}{e}\\end{gathered}$") },
            { id: 38, difficulty: 'hard', question: sketch('x^3-3x+2'), solution: same('$\\begin{gathered}f(x)=(x-1)^2(x+2)\\\\ \\max(-1,4)\\qquad \\min(1,0)\\\\ (0,2)\\end{gathered}$') },
            { id: 39, difficulty: 'hard', question: say('Zein $x$ baliotan du $f(x)=xe^{x}$ funtzioak minimoa?', '¿En qué $x$ tiene $f(x)=xe^{x}$ su mínimo?', 'عند أي $x$ تبلغ $f(x)=xe^{x}$ قيمتها الصغرى؟', 'At which $x$ does $f(x)=xe^{x}$ have its minimum?'), solution: same("$f'(x)=(x+1)e^{x}=0\\ \\to\\ x=-1$"), answer: { expected: n(-1) } },
            { id: 40, difficulty: 'hard', question: sketch('\\frac{x^2}{x^2-1}'), solution: same('$\\begin{gathered}x=\\pm 1\\qquad y=1\\\\ f(-x)=f(x)\\qquad \\max(0,0)\\end{gathered}$') }
        ]
    },
    {
        id: 'reading',
        title: say('Irakurri eta marraztu', 'Leer y dibujar', 'القراءة والرسم', 'Read and draw'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Zein $x$ baliotan du punta $f(x)=|x-4|$ funtzioak?', '¿En qué $x$ tiene el pico $f(x)=|x-4|$?', 'عند أي $x$ تقع زاوية $f(x)=|x-4|$؟', 'At which $x$ does $f(x)=|x-4|$ have its corner?'), solution: same('$x-4=0\\ \\to\\ x=4$'), answer: { expected: n(4) } },
            { id: 42, difficulty: 'easy', question: say('Zein da $f(x)=|x^2-16|$ funtzioaren maximo erlatiboaren balioa?', '¿Cuánto vale el máximo relativo de $f(x)=|x^2-16|$?', 'كم تساوي القيمة العظمى المحلية للدالة $f(x)=|x^2-16|$؟', 'What is the relative maximum value of $f(x)=|x^2-16|$?'), solution: same('$f(0)=|-16|=16$'), answer: { expected: n(16) } },
            { id: 43, difficulty: 'easy', question: say('Salmentak $V(t)=-t^2+6t$ dira. Zein unetan dira maximoak?', 'Las ventas son $V(t)=-t^2+6t$. ¿En qué momento son máximas?', 'المبيعات $V(t)=-t^2+6t$. في أي لحظة تكون أعظمية؟', 'Sales are $V(t)=-t^2+6t$. At what moment do they peak?'), solution: same("$V'(t)=-2t+6=0\\ \\to\\ t=3$"), answer: { expected: n(3) } },
            { id: 44, difficulty: 'medium', question: say('Zein da $f(x)=|x^2-2x|$ funtzioaren maximo erlatiboaren balioa?', '¿Cuánto vale el máximo relativo de $f(x)=|x^2-2x|$?', 'كم تساوي القيمة العظمى المحلية للدالة $f(x)=|x^2-2x|$؟', 'What is the relative maximum value of $f(x)=|x^2-2x|$?'), solution: same('$x=1\\ \\to\\ |1-2|=1$'), answer: { expected: n(1) } },
            { id: 45, difficulty: 'medium', question: say('Biztanleak $P(t)=\\frac{50t+100}{t+1}$ dira (milakatan). Zein baliotan egonkortzen dira?', 'La población es $P(t)=\\frac{50t+100}{t+1}$ (miles). ¿En qué valor se estabiliza?', 'السكان $P(t)=\\frac{50t+100}{t+1}$ (بالآلاف). عند أي قيمة يستقرون؟', 'The population is $P(t)=\\frac{50t+100}{t+1}$ (thousands). At which value does it level off?'), solution: say('$P(0)=100$ eta $P(t)\\to 50$: 100 milatik 50 milara jaisten da.', '$P(0)=100$ y $P(t)\\to 50$: baja de 100 mil a 50 mil.', '$P(0)=100$ و$P(t)\\to 50$: تنخفض من 100 ألف إلى 50 ألفًا.', '$P(0)=100$ and $P(t)\\to 50$: it falls from 100 thousand to 50 thousand.'), answer: { expected: n(50) } },
            { id: 46, difficulty: 'medium', question: say('$f(x)=b+\\frac{2}{x+1}$ funtzioaren asintota horizontala $y=4$ da. Kalkulatu $f(1)$.', 'La asíntota horizontal de $f(x)=b+\\frac{2}{x+1}$ es $y=4$. Calcula $f(1)$.', 'المقارب الأفقي لـ $f(x)=b+\\frac{2}{x+1}$ هو $y=4$. احسب $f(1)$.', 'The horizontal asymptote of $f(x)=b+\\frac{2}{x+1}$ is $y=4$. Work out $f(1)$.'), solution: same('$b=4\\ \\to\\ f(1)=4+1=5$'), answer: { expected: n(5) } },
            { id: 47, difficulty: 'medium', question: say('$f(x)=\\frac{k}{x-2}$ funtzioak $(3,6)$ puntutik igaro behar du. Zenbat da $k$?', '$f(x)=\\frac{k}{x-2}$ tiene que pasar por $(3,6)$. ¿Cuánto vale $k$?', 'يجب أن تمر $f(x)=\\frac{k}{x-2}$ بـ $(3,6)$. كم تساوي $k$؟', '$f(x)=\\frac{k}{x-2}$ must pass through $(3,6)$. What is $k$?'), solution: same('$\\frac{k}{1}=6\\ \\to\\ k=6$'), answer: { expected: n(6) } },
            { id: 48, difficulty: 'hard', question: say('Deskribatu $f(x)=|x^3-x|$ funtzioaren grafikoa.', 'Describe la gráfica de $f(x)=|x^3-x|$.', 'صف تمثيل $f(x)=|x^3-x|$.', 'Describe the graph of $f(x)=|x^3-x|$.'), solution: say('Ez da inoiz negatiboa; ardatza $x=-1$, $x=0$ eta $x=1$ puntuetan ukitzen du, han puntak ditu; bikoitia da.', 'Nunca es negativa; toca el eje en $x=-1$, $x=0$ y $x=1$, donde tiene picos; es par.', 'ليست سالبة أبدًا؛ تمس المحور عند $x=-1$ و$x=0$ و$x=1$ حيث توجد زوايا؛ وهي زوجية.', 'It is never negative; it touches the axis at $x=-1$, $x=0$ and $x=1$, where it has corners; it is even.') },
            { id: 49, difficulty: 'hard', question: say('Funtzio batek asintotak ditu $x=1$ eta $y=-2$ zuzenetan, eta $(0,0)$ puntutik igarotzen da. $f(x)=-2+\\frac{k}{x-1}$ bada, zenbat da $k$?', 'Una función tiene asíntotas $x=1$ e $y=-2$ y pasa por $(0,0)$. Si $f(x)=-2+\\frac{k}{x-1}$, ¿cuánto vale $k$?', 'لدالة المقاربان $x=1$ و$y=-2$ وتمر بـ $(0,0)$. إذا كانت $f(x)=-2+\\frac{k}{x-1}$ فكم تساوي $k$؟', 'A function has asymptotes $x=1$ and $y=-2$ and passes through $(0,0)$. If $f(x)=-2+\\frac{k}{x-1}$, what is $k$?'), solution: same('$-2+\\frac{k}{-1}=0\\ \\to\\ k=-2$'), answer: { expected: n(-2) } },
            { id: 50, difficulty: 'hard', question: say('Salmentak $V(t)=\\frac{120t}{t^2+36}$ dira (milakatan). Zein da balio handiena?', 'Las ventas son $V(t)=\\frac{120t}{t^2+36}$ (miles). ¿Cuál es el mayor valor?', 'المبيعات $V(t)=\\frac{120t}{t^2+36}$ (بالآلاف). ما أكبر قيمة؟', 'Sales are $V(t)=\\frac{120t}{t^2+36}$ (thousands). What is the largest value?'), solution: same('$t=6\\ \\to\\ V(6)=\\frac{720}{72}=10$'), answer: { expected: n(10) } }
        ]
    }
]

/** «Study the curvature of f» */
function curvatureOf(formula: string) {
    return say(`Aztertu $f(x)=${formula}$ funtzioaren kurbadura.`, `Estudia la curvatura de $f(x)=${formula}$.`, `ادرس تقعّر $f(x)=${formula}$.`, `Study the curvature of $f(x)=${formula}$.`)
}
