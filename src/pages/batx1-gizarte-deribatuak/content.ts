import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from './text.ts'

/* ==========================================================================
   Deribatuak eta haien aplikazioak · Batxilergoa 1 · Gizarte Zientziak —
   diagnostic, guided practice, exercise bank and challenges, with the
   scope of unit 7 of Anaya Matemáticas aplicadas a las CCSS I (all the
   exercises and numbers are our own). Every closed answer is a single
   exact number; derivatives as functions are asked as open questions.
   ========================================================================== */

const n = (value: number, denominator = 1) => fraction(value, denominator)

export const socDerivDiagnostic: DiagnosticQuestion[] = [
    {
        id: 136001,
        prompt: say('Zein da $(1,3)$ eta $(4,9)$ puntuetatik pasatzen den zuzenaren malda?', '¿Cuál es la pendiente de la recta que pasa por $(1,3)$ y $(4,9)$?', 'ما ميل المستقيم المار بـ $(1,3)$ و$(4,9)$؟', 'What is the slope of the line through $(1,3)$ and $(4,9)$?'),
        options: [same('$2$'), same('$6$'), same('$\\frac{1}{2}$')],
        correctIndex: 0,
        explanation: same('$\\frac{9-3}{4-1}=2$'),
        topic: 'average-rate'
    },
    {
        id: 136002,
        prompt: say('Zenbat da $\\lim_{h\\to 0}(4+h)$?', '¿Cuánto vale $\\lim_{h\\to 0}(4+h)$?', 'كم تساوي $\\lim_{h\\to 0}(4+h)$؟', 'What is $\\lim_{h\\to 0}(4+h)$?'),
        options: [same('$0$'), same('$4$'), same('$h$')],
        correctIndex: 1,
        explanation: say('$h$ desagertu egiten da, eta 4 geratzen da.', 'La $h$ desaparece y queda 4.', 'تختفي $h$ ويبقى 4.', 'The $h$ disappears and 4 is left.'),
        topic: 'derivative-point'
    },
    {
        id: 136003,
        prompt: say('Zein zuzenek du 3 malda, eta pasatzen da $(1,2)$ puntutik?', '¿Qué recta tiene pendiente 3 y pasa por $(1,2)$?', 'أي مستقيم ميله 3 ويمر بـ $(1,2)$؟', 'Which line has slope 3 and passes through $(1,2)$?'),
        options: [same('$y=3x+2$'), same('$y=3x-1$'), same('$y=2x+3$')],
        correctIndex: 1,
        explanation: same('$y-2=3(x-1)\\ \\to\\ y=3x-1$'),
        topic: 'tangent'
    },
    {
        id: 136004,
        prompt: say('Zenbat da $(x+h)^2-x^2$?', '¿Cuánto vale $(x+h)^2-x^2$?', 'كم تساوي $(x+h)^2-x^2$؟', 'What is $(x+h)^2-x^2$?'),
        options: [same('$h^2$'), same('$2xh+h^2$'), same('$2x+h$')],
        correctIndex: 1,
        explanation: same('$x^2+2xh+h^2-x^2=2xh+h^2$'),
        topic: 'derivative-function'
    },
    {
        id: 136005,
        prompt: say('Zenbat da $\\log 1$?', '¿Cuánto vale $\\log 1$?', 'كم تساوي $\\log 1$؟', 'What is $\\log 1$?'),
        options: [same('$1$'), same('$10$'), same('$0$')],
        correctIndex: 2,
        explanation: same('$10^0=1$'),
        topic: 'chain-exp-log'
    },
    {
        id: 136006,
        prompt: say('Ebatzi $3x^2-12=0$.', 'Resuelve $3x^2-12=0$.', 'حُلّ $3x^2-12=0$.', 'Solve $3x^2-12=0$.'),
        options: [same('$x=\\pm 2$'), same('$x=4$'), same('$x=\\pm 4$')],
        correctIndex: 0,
        explanation: same('$x^2=4\\ \\to\\ x=\\pm 2$'),
        topic: 'sign-intervals'
    },
    {
        id: 136007,
        prompt: say('Diru-sarrerak 500 € badira eta kostuak 320 €, zenbat da mozkina?', 'Si los ingresos son 500 € y los costes 320 €, ¿cuánto es el beneficio?', 'إذا كان الإيراد 500 € والتكاليف 320 €، فكم الربح؟', 'If the revenue is €500 and the costs €320, what is the profit?'),
        options: [same('$820$'), same('$180$'), same('$-180$')],
        correctIndex: 1,
        explanation: same('$500-320=180$'),
        topic: 'max-profit'
    },
    {
        id: 136008,
        prompt: say('Zein $x$ baliok anulatzen du $\\frac{x^2}{x-1}$ adierazpenaren izendatzailea?', '¿Qué $x$ anula el denominador de $\\frac{x^2}{x-1}$?', 'أي $x$ يعدم مقام $\\frac{x^2}{x-1}$؟', 'Which $x$ makes the denominator of $\\frac{x^2}{x-1}$ zero?'),
        options: [same('$x=0$'), same('$x=-1$'), same('$x=1$')],
        correctIndex: 2,
        explanation: same('$x-1=0\\ \\to\\ x=1$'),
        topic: 'rational-graph'
    }
]

export const socDerivPractice: PracticeItem[] = [
    /* ---------- Rate of change ---------- */
    { id: 1, stage: 'rate', prompt: say('Zein da $f(x)=x^2+2x$ funtzioaren T.V.M. $[1,4]$ tartean?', '¿Cuál es la T.V.M. de $f(x)=x^2+2x$ en $[1,4]$?', 'ما معدل التغير المتوسط لـ $f(x)=x^2+2x$ في $[1,4]$؟', 'What is the average rate of $f(x)=x^2+2x$ on $[1,4]$?'), expected: n(7), hint: same('$f(1)=3\\qquad f(4)=24$'), explanation: same('$\\frac{24-3}{4-1}=7$') },
    { id: 2, stage: 'rate', prompt: say('Definizioarekin, zenbat da $f\'(1)$, $f(x)=x^2+3x$ bada?', 'Con la definición, ¿cuánto vale $f\'(1)$ si $f(x)=x^2+3x$?', 'بالتعريف، كم تساوي $f\'(1)$ إذا كانت $f(x)=x^2+3x$؟', 'With the definition, what is $f\'(1)$ if $f(x)=x^2+3x$?'), expected: n(5), hint: same('$f(1)=4$'), explanation: same('$\\frac{(1+h)^2+3(1+h)-4}{h}=5+h\\ \\to\\ 5$') },
    { id: 3, stage: 'rate', prompt: say('Zein da $f(x)=x^2$ funtzioaren ukitzailearen malda $x=-3$ puntuan?', '¿Cuál es la pendiente de la tangente a $f(x)=x^2$ en $x=-3$?', 'ما ميل المماس لـ $f(x)=x^2$ عند $x=-3$؟', 'What is the slope of the tangent to $f(x)=x^2$ at $x=-3$?'), expected: n(-6), hint: same('$f\'(x)=2x$'), explanation: same('$f\'(-3)=2\\cdot(-3)=-6$') },
    { id: 4, stage: 'rate', prompt: say('$f(x)=x^2-1$ funtzioaren ukitzailea $x=2$ puntuan $y=mx+n$ da. Zenbat da $n$?', 'La tangente a $f(x)=x^2-1$ en $x=2$ es $y=mx+n$. ¿Cuánto vale $n$?', 'المماس لـ $f(x)=x^2-1$ عند $x=2$ هو $y=mx+n$. كم تساوي $n$؟', 'The tangent to $f(x)=x^2-1$ at $x=2$ is $y=mx+n$. What is $n$?'), expected: n(-5), hint: same('$f(2)=3\\qquad f\'(2)=4$'), explanation: same('$y-3=4(x-2)\\ \\to\\ y=4x-5$') },

    /* ---------- Rules ---------- */
    { id: 5, stage: 'rules', prompt: say('$f(x)=2x^3-5x$ bada, zenbat da $f\'(2)$?', 'Si $f(x)=2x^3-5x$, ¿cuánto vale $f\'(2)$?', 'إذا كانت $f(x)=2x^3-5x$ فكم تساوي $f\'(2)$؟', 'If $f(x)=2x^3-5x$, what is $f\'(2)$?'), expected: n(19), hint: same('$f\'(x)=6x^2-5$'), explanation: same('$6\\cdot 4-5=19$') },
    { id: 6, stage: 'rules', prompt: say('$f(x)=x^2(x+1)$ bada, zenbat da $f\'(1)$?', 'Si $f(x)=x^2(x+1)$, ¿cuánto vale $f\'(1)$?', 'إذا كانت $f(x)=x^2(x+1)$ فكم تساوي $f\'(1)$؟', 'If $f(x)=x^2(x+1)$, what is $f\'(1)$?'), expected: n(5), hint: same('$f(x)=x^3+x^2$'), explanation: same('$3\\cdot 1+2\\cdot 1=5$') },
    { id: 7, stage: 'rules', prompt: say('$g(x)=\\frac{x}{x+1}$ bada, zenbat da $g\'(1)$?', 'Si $g(x)=\\frac{x}{x+1}$, ¿cuánto vale $g\'(1)$?', 'إذا كانت $g(x)=\\frac{x}{x+1}$ فكم تساوي $g\'(1)$؟', 'If $g(x)=\\frac{x}{x+1}$, what is $g\'(1)$?'), expected: n(1, 4), hint: same('$g\'(x)=\\frac{1}{(x+1)^2}$'), explanation: same('$\\frac{1}{4}$') },
    { id: 8, stage: 'rules', prompt: say('$h(x)=e^{3x}$ bada, zenbat da $h\'(0)$?', 'Si $h(x)=e^{3x}$, ¿cuánto vale $h\'(0)$?', 'إذا كانت $h(x)=e^{3x}$ فكم تساوي $h\'(0)$؟', 'If $h(x)=e^{3x}$, what is $h\'(0)$?'), expected: n(3), hint: same('$h\'(x)=3e^{3x}$'), explanation: same('$3e^{0}=3$') },

    /* ---------- Growth and extremes ---------- */
    { id: 9, stage: 'monotony', prompt: say('Zein $x$ baliotan du minimoa $f(x)=x^2-8x+1$ funtzioak?', '¿En qué $x$ tiene su mínimo $f(x)=x^2-8x+1$?', 'عند أي $x$ تكون القيمة الصغرى لـ $f(x)=x^2-8x+1$؟', 'At which $x$ does $f(x)=x^2-8x+1$ have its minimum?'), expected: n(4), hint: say('Ebatzi $f\'(x)=0$.', 'Resuelve $f\'(x)=0$.', 'حُلّ $f\'(x)=0$.', 'Solve $f\'(x)=0$.'), explanation: same('$2x-8=0\\ \\to\\ x=4$') },
    { id: 10, stage: 'monotony', prompt: say('Zenbat balio du $f(x)=-x^2+6x$ funtzioaren maximoak?', '¿Cuánto vale el máximo de $f(x)=-x^2+6x$?', 'كم تساوي القيمة العظمى لـ $f(x)=-x^2+6x$؟', 'What is the maximum value of $f(x)=-x^2+6x$?'), expected: n(9), hint: same('$-2x+6=0\\ \\to\\ x=3$'), explanation: same('$-9+18=9$') },
    { id: 11, stage: 'monotony', prompt: say('$f(x)=x^3-27x$. Zein $x>0$ baliotan dago minimoa?', '$f(x)=x^3-27x$. ¿En qué $x>0$ hay un mínimo?', '$f(x)=x^3-27x$. عند أي $x>0$ توجد قيمة صغرى؟', '$f(x)=x^3-27x$. At which $x>0$ is there a minimum?'), expected: n(3), hint: same('$3x^2-27=0$'), explanation: same('$x^2=9\\ \\to\\ x=3$') },
    { id: 12, stage: 'monotony', prompt: say('Aurkitu $a$, $f(x)=x^2+ax+3$ funtzioak mutur bat izan dezan $x=5$ puntuan.', 'Halla $a$ para que $f(x)=x^2+ax+3$ tenga un extremo en $x=5$.', 'أوجد $a$ لتكون لـ $f(x)=x^2+ax+3$ قيمة قصوى عند $x=5$.', 'Find $a$ so that $f(x)=x^2+ax+3$ has an extreme at $x=5$.'), expected: n(-10), hint: same('$f\'(5)=0$'), explanation: same('$2\\cdot 5+a=0\\ \\to\\ a=-10$') },

    /* ---------- Optimisation ---------- */
    { id: 13, stage: 'optimization', prompt: say('$B(x)=-x^2+50x-400$. Zenbat unitatek ematen dute mozkin maximoa?', '$B(x)=-x^2+50x-400$. ¿Cuántas unidades dan el beneficio máximo?', '$B(x)=-x^2+50x-400$. كم وحدة تعطي الربح الأعظم؟', '$B(x)=-x^2+50x-400$. How many units give the greatest profit?'), expected: n(25), hint: same('$B\'(x)=-2x+50$'), explanation: same('$-2x+50=0\\ \\to\\ x=25$') },
    { id: 14, stage: 'optimization', prompt: say('$B$ berarekin, zenbat da mozkin maximoa?', 'Con el mismo $B$, ¿cuánto vale el beneficio máximo?', 'مع $B$ نفسها، كم يساوي الربح الأعظم؟', 'With the same $B$, what is the greatest profit?'), expected: n(225), hint: same('$B(25)$'), explanation: same('$-625+1250-400=225$') },
    { id: 15, stage: 'optimization', prompt: say('Bi zenbaki positiboren batura 20 da. Zein da haien biderkadurarik handiena?', 'Dos números positivos suman 20. ¿Cuál es su producto máximo?', 'عددان موجبان مجموعهما 20. ما أكبر جداء لهما؟', 'Two positive numbers add up to 20. What is their greatest product?'), expected: n(100), hint: same('$P(x)=x(20-x)$'), explanation: same('$10\\cdot 10=100$') },
    { id: 16, stage: 'optimization', prompt: say('Zein da $f(x)=x^2-2x$ funtzioaren maximoa $[0,4]$ tartean?', '¿Cuál es el máximo de $f(x)=x^2-2x$ en $[0,4]$?', 'ما القيمة العظمى لـ $f(x)=x^2-2x$ في $[0,4]$؟', 'What is the maximum of $f(x)=x^2-2x$ on $[0,4]$?'), expected: n(8), hint: say('Begiratu ertzak ere.', 'Mira también los bordes.', 'انظر إلى الطرفين أيضًا.', 'Look at the borders too.'), explanation: same('$f(0)=0\\qquad f(1)=-1\\qquad f(4)=16-8=8$') },

    /* ---------- Graphs ---------- */
    { id: 17, stage: 'graphs', prompt: say('Zenbat puntu singular ditu $f(x)=x^3-3x^2$ funtzioak?', '¿Cuántos puntos singulares tiene $f(x)=x^3-3x^2$?', 'كم نقطة حرجة لـ $f(x)=x^3-3x^2$؟', 'How many stationary points does $f(x)=x^3-3x^2$ have?'), expected: n(2), hint: same('$3x^2-6x=0$'), explanation: say('$x=0$ eta $x=2$: 2 puntu.', '$x=0$ y $x=2$: 2 puntos.', '$x=0$ و$x=2$: نقطتان، أي 2.', '$x=0$ and $x=2$: 2 points.') },
    { id: 18, stage: 'graphs', prompt: say('Zenbat balio du $f(x)=x^3-3x^2$ funtzioaren minimoak?', '¿Cuánto vale el mínimo relativo de $f(x)=x^3-3x^2$?', 'كم تساوي القيمة الصغرى لـ $f(x)=x^3-3x^2$؟', 'What is the local minimum value of $f(x)=x^3-3x^2$?'), expected: n(-4), hint: same('$f(2)$'), explanation: same('$8-12=-4$') },
    { id: 19, stage: 'graphs', prompt: say('$f\'(x)=(x-1)(x-5)$ bada, zein $x$ baliotan du maximoa $f$ funtzioak?', 'Si $f\'(x)=(x-1)(x-5)$, ¿en qué $x$ tiene $f$ un máximo?', 'إذا كانت $f\'(x)=(x-1)(x-5)$ فعند أي $x$ تكون لـ $f$ قيمة عظمى؟', 'If $f\'(x)=(x-1)(x-5)$, at which $x$ does $f$ have a maximum?'), expected: n(1), hint: say('Non pasatzen da $f\'$ positibotik negatibora?', '¿Dónde pasa $f\'$ de positiva a negativa?', 'أين تنتقل $f\'$ من موجبة إلى سالبة؟', 'Where does $f\'$ go from positive to negative?'), explanation: say('$f\'$ deribatua $+$ izatetik $-$ izatera pasatzen da $x=1$ puntuan.', '$f\'$ pasa de $+$ a $-$ en $x=1$.', 'تنتقل $f\'$ من $+$ إلى $-$ عند $x=1$.', '$f\'$ goes from $+$ to $-$ at $x=1$.') },
    { id: 20, stage: 'graphs', prompt: say('$f(x)=\\frac{x^2}{x-4}$ funtzioaren asintota bertikala $x=a$ da. Zenbat da $a$?', 'La asíntota vertical de $f(x)=\\frac{x^2}{x-4}$ es $x=a$. ¿Cuánto vale $a$?', 'المقارب الرأسي لـ $f(x)=\\frac{x^2}{x-4}$ هو $x=a$. كم تساوي $a$؟', 'The vertical asymptote of $f(x)=\\frac{x^2}{x-4}$ is $x=a$. What is $a$?'), expected: n(4), hint: say('Non anulatzen da izendatzailea?', '¿Dónde se anula el denominador?', 'أين ينعدم المقام؟', 'Where is the denominator 0?'), explanation: same('$x-4=0\\ \\to\\ x=4$') }
]

export const socDerivChallenges: ChallengeItem[] = [
    { id: 101, stage: 'rate', points: 10, context: 'starter', prompt: say('Zein da $C(x)=x^2+10x$ kostuaren T.V.M., $x=10$ eta $x=20$ artean?', '¿Cuál es la T.V.M. del coste $C(x)=x^2+10x$ entre $x=10$ y $x=20$?', 'ما معدل التغير المتوسط للتكلفة $C(x)=x^2+10x$ بين $x=10$ و$x=20$؟', 'What is the average rate of the cost $C(x)=x^2+10x$ between $x=10$ and $x=20$?'), expected: n(40), hint: same('$C(10)=200\\qquad C(20)=600$'), explanation: same('$\\frac{600-200}{20-10}=40$') },
    { id: 102, stage: 'rate', points: 20, context: 'advanced', prompt: say('Zein $x$ baliotan da $f(x)=x^2-4x$ funtzioaren ukitzailea $y=2x+1$ zuzenaren paraleloa?', '¿En qué $x$ la tangente a $f(x)=x^2-4x$ es paralela a $y=2x+1$?', 'عند أي $x$ يكون المماس لـ $f(x)=x^2-4x$ موازيًا لـ $y=2x+1$؟', 'At which $x$ is the tangent to $f(x)=x^2-4x$ parallel to $y=2x+1$?'), expected: n(3), hint: say('Paraleloak: malda bera.', 'Paralelas: la misma pendiente.', 'متوازيان: الميل نفسه.', 'Parallel: the same slope.'), explanation: same('$2x-4=2\\ \\to\\ x=3$') },
    { id: 103, stage: 'rate', points: 30, context: 'master', prompt: say('$f(x)=x^3$ funtzioaren ukitzaileak $x=1$ puntuan X ardatza ebakitzen du $x=a$ puntuan. Zenbat da $a$?', 'La tangente a $f(x)=x^3$ en $x=1$ corta al eje X en $x=a$. ¿Cuánto vale $a$?', 'يقطع المماس لـ $f(x)=x^3$ عند $x=1$ محور X عند $x=a$. كم تساوي $a$؟', 'The tangent to $f(x)=x^3$ at $x=1$ cuts the x-axis at $x=a$. What is $a$?'), expected: n(2, 3), hint: same('$f(1)=1\\qquad f\'(1)=3$'), explanation: same('$y=3x-2=0\\ \\to\\ x=\\frac{2}{3}$') },
    { id: 104, stage: 'rules', points: 10, context: 'starter', prompt: say('$f(x)=(x^2+1)^3$ bada, zenbat da $f\'(1)$?', 'Si $f(x)=(x^2+1)^3$, ¿cuánto vale $f\'(1)$?', 'إذا كانت $f(x)=(x^2+1)^3$ فكم تساوي $f\'(1)$؟', 'If $f(x)=(x^2+1)^3$, what is $f\'(1)$?'), expected: n(24), hint: same('$f\'(x)=3(x^2+1)^2\\cdot 2x$'), explanation: same('$3\\cdot 2^{2}\\cdot 2=24$') },
    { id: 105, stage: 'rules', points: 20, context: 'advanced', prompt: say('$f(x)=\\ln(x^2+3)$ bada, zenbat da $f\'(1)$?', 'Si $f(x)=\\ln(x^2+3)$, ¿cuánto vale $f\'(1)$?', 'إذا كانت $f(x)=\\ln(x^2+3)$ فكم تساوي $f\'(1)$؟', 'If $f(x)=\\ln(x^2+3)$, what is $f\'(1)$?'), expected: n(1, 2), hint: same('$f\'(x)=\\frac{2x}{x^2+3}$'), explanation: same('$\\frac{2\\cdot 1}{1+3}=\\frac{1}{2}$') },
    { id: 106, stage: 'rules', points: 30, context: 'master', prompt: say('$f(x)=\\frac{x^2+1}{x-2}$ bada, zenbat da $f\'(3)$?', 'Si $f(x)=\\frac{x^2+1}{x-2}$, ¿cuánto vale $f\'(3)$?', 'إذا كانت $f(x)=\\frac{x^2+1}{x-2}$ فكم تساوي $f\'(3)$؟', 'If $f(x)=\\frac{x^2+1}{x-2}$, what is $f\'(3)$?'), expected: n(-4), hint: say('Zatiduraren erregela.', 'Regla del cociente.', 'قاعدة خارج القسمة.', 'Quotient rule.'), explanation: same('$\\frac{6\\cdot 1-10}{1}=-4$') },
    { id: 107, stage: 'monotony', points: 10, context: 'starter', prompt: say('Zenbat balio du $f(x)=x^2-6x+11$ funtzioaren minimoak?', '¿Cuánto vale el mínimo de $f(x)=x^2-6x+11$?', 'كم تساوي القيمة الصغرى لـ $f(x)=x^2-6x+11$؟', 'What is the minimum value of $f(x)=x^2-6x+11$?'), expected: n(2), hint: same('$2x-6=0\\ \\to\\ x=3$'), explanation: same('$9-18+11=2$') },
    { id: 108, stage: 'monotony', points: 20, context: 'advanced', prompt: say('$f(x)=x^3+ax^2$ funtzioak mutur bat du $x=4$ puntuan. Zenbat da $a$?', '$f(x)=x^3+ax^2$ tiene un extremo en $x=4$. ¿Cuánto vale $a$?', 'لـ $f(x)=x^3+ax^2$ قيمة قصوى عند $x=4$. كم تساوي $a$؟', '$f(x)=x^3+ax^2$ has an extreme at $x=4$. What is $a$?'), expected: n(-6), hint: same('$f\'(x)=3x^2+2ax$'), explanation: same('$48+8a=0\\ \\to\\ a=-6$') },
    { id: 109, stage: 'monotony', points: 30, context: 'master', prompt: say('$f(x)=x^2+ax+b$ funtzioak minimoa du $(2,5)$ puntuan. Zenbat da $a+b$?', '$f(x)=x^2+ax+b$ tiene un mínimo en $(2,5)$. ¿Cuánto vale $a+b$?', 'لـ $f(x)=x^2+ax+b$ قيمة صغرى عند $(2,5)$. كم تساوي $a+b$؟', '$f(x)=x^2+ax+b$ has a minimum at $(2,5)$. What is $a+b$?'), expected: n(5), hint: same('$f\'(2)=0\\qquad f(2)=5$'), explanation: same('$4+a=0\\ \\to\\ a=-4\\qquad 4-8+b=5\\ \\to\\ b=9\\qquad -4+9=5$') },
    { id: 110, stage: 'optimization', points: 10, context: 'starter', prompt: say('$I(x)=40x$ eta $C(x)=x^2+10x$. Zenbat unitatek ematen dute mozkin maximoa?', '$I(x)=40x$ y $C(x)=x^2+10x$. ¿Cuántas unidades dan el beneficio máximo?', '$I(x)=40x$ و$C(x)=x^2+10x$. كم وحدة تعطي الربح الأعظم؟', '$I(x)=40x$ and $C(x)=x^2+10x$. How many units give the greatest profit?'), expected: n(15), hint: same('$B(x)=30x-x^2$'), explanation: same('$30-2x=0\\ \\to\\ x=15$') },
    { id: 111, stage: 'optimization', points: 20, context: 'advanced', prompt: say('Azalera 64 metro karratu duen laukizuzen batek perimetro txikiena izan dezan, zenbat neurtzen du alde batek?', 'Un rectángulo tiene 64 metros cuadrados de área. ¿Cuánto mide un lado si su perímetro es el mínimo?', 'مستطيل مساحته 64 مترًا مربعًا. كم طول ضلعه إذا كان محيطه أصغريًّا؟', 'A rectangle has an area of 64 square metres. How long is a side if its perimeter is the least?'), expected: n(8), hint: same('$P(x)=2x+\\frac{128}{x}$'), explanation: same('$2-\\frac{128}{x^2}=0\\ \\to\\ x=\\sqrt{64}=8$') },
    { id: 112, stage: 'optimization', points: 30, context: 'master', prompt: say('Oinarri karratuko kutxa estali gabe bat egin nahi da 108 zentimetro karratu kartoirekin. Zenbat neurtzen du oinarriaren aldeak, bolumena maximoa izateko?', 'Se quiere una caja sin tapa de base cuadrada con 108 centímetros cuadrados de cartón. ¿Cuánto mide el lado de la base para que el volumen sea máximo?', 'نريد صندوقًا دون غطاء قاعدته مربعة من 108 سنتيمترات مربعة من الورق المقوى. كم طول ضلع القاعدة ليكون الحجم أعظميًّا؟', 'You want an open box with a square base from 108 square centimetres of card. How long is the side of the base for the greatest volume?'), expected: n(6), hint: same('$x^2+4xh=108\\qquad V=\\frac{108x-x^3}{4}$'), explanation: same('$108-3x^2=0\\ \\to\\ x=6$') },
    { id: 113, stage: 'graphs', points: 10, context: 'starter', prompt: say('Zenbat balio du $f(x)=x^3-12x$ funtzioaren maximoak?', '¿Cuánto vale el máximo relativo de $f(x)=x^3-12x$?', 'كم تساوي القيمة العظمى النسبية لـ $f(x)=x^3-12x$؟', 'What is the local maximum value of $f(x)=x^3-12x$?'), expected: n(16), hint: same('$3x^2-12=0\\ \\to\\ x=\\pm 2$'), explanation: same('$-8+24=16$') },
    { id: 114, stage: 'graphs', points: 20, context: 'advanced', prompt: say('$f(x)=\\frac{x^2}{x-2}$ funtzioak minimoa du $x=a$ puntuan. Zenbat da $a$?', '$f(x)=\\frac{x^2}{x-2}$ tiene un mínimo en $x=a$. ¿Cuánto vale $a$?', 'لـ $f(x)=\\frac{x^2}{x-2}$ قيمة صغرى عند $x=a$. كم تساوي $a$؟', '$f(x)=\\frac{x^2}{x-2}$ has a minimum at $x=a$. What is $a$?'), expected: n(4), hint: same('$f\'(x)=\\frac{x^2-4x}{(x-2)^2}$'), explanation: same('$x^2-4x=0\\ \\to\\ x=0,\\ x=4$') },
    { id: 115, stage: 'graphs', points: 30, context: 'master', prompt: say('$f\'(x)=x^2-4$ bada, zenbat mutur ditu $f$ funtzioak?', 'Si $f\'(x)=x^2-4$, ¿cuántos extremos tiene $f$?', 'إذا كانت $f\'(x)=x^2-4$ فكم قيمة قصوى لـ $f$؟', 'If $f\'(x)=x^2-4$, how many extremes does $f$ have?'), expected: n(2), hint: say('Non aldatzen du zeinua $f\'$ deribatuak?', '¿Dónde cambia de signo $f\'$?', 'أين تتغير إشارة $f\'$؟', 'Where does $f\'$ change sign?'), explanation: say('Zeinua aldatzen du $x=-2$ eta $x=2$ puntuetan: 2 mutur.', 'Cambia de signo en $x=-2$ y en $x=2$: 2 extremos.', 'تتغير الإشارة عند $x=-2$ وعند $x=2$: قيمتان قصويان، أي 2.', 'It changes sign at $x=-2$ and at $x=2$: 2 extremes.') }
]

export const socDerivExerciseBank: ExerciseSection[] = [
    {
        id: 'rate',
        title: say('Aldakuntza-tasa', 'Tasa de variación', 'معدل التغير', 'Rate of change'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Zein da $f(x)=3x+1$ funtzioaren T.V.M. $[0,5]$ tartean?', '¿Cuál es la T.V.M. de $f(x)=3x+1$ en $[0,5]$?', 'ما معدل التغير المتوسط لـ $f(x)=3x+1$ في $[0,5]$؟', 'What is the average rate of $f(x)=3x+1$ on $[0,5]$?'), solution: same('$\\frac{16-1}{5}=3$'), answer: { expected: n(3) } },
            { id: 2, difficulty: 'easy', question: say('Zein da $f(x)=x^2$ funtzioaren T.V.M. $[2,5]$ tartean?', '¿Cuál es la T.V.M. de $f(x)=x^2$ en $[2,5]$?', 'ما معدل التغير المتوسط لـ $f(x)=x^2$ في $[2,5]$؟', 'What is the average rate of $f(x)=x^2$ on $[2,5]$?'), solution: same('$\\frac{25-4}{3}=7$'), answer: { expected: n(7) } },
            { id: 3, difficulty: 'easy', question: say('Zer neurtzen du $f\'(a)$ deribatuak grafikoan?', '¿Qué mide $f\'(a)$ en la gráfica?', 'ماذا تقيس $f\'(a)$ على الرسم؟', 'What does $f\'(a)$ measure on the graph?'), solution: say('Ukitzailearen malda $x=a$ puntuan.', 'La pendiente de la tangente en $x=a$.', 'ميل المماس عند $x=a$.', 'The slope of the tangent at $x=a$.') },
            { id: 4, difficulty: 'medium', question: say('Definizioarekin, kalkulatu $f\'(2)$, $f(x)=x^2$ bada.', 'Con la definición, calcula $f\'(2)$ si $f(x)=x^2$.', 'بالتعريف، احسب $f\'(2)$ إذا كانت $f(x)=x^2$.', 'With the definition, work out $f\'(2)$ if $f(x)=x^2$.'), solution: same('$\\frac{(2+h)^2-4}{h}=4+h\\ \\to\\ 4$'), answer: { expected: n(4) } },
            { id: 5, difficulty: 'medium', question: say('Definizioarekin, aurkitu $f\'(x)$, $f(x)=3x^2$ bada.', 'Con la definición, halla $f\'(x)$ si $f(x)=3x^2$.', 'بالتعريف، أوجد $f\'(x)$ إذا كانت $f(x)=3x^2$.', 'With the definition, find $f\'(x)$ if $f(x)=3x^2$.'), solution: same('$\\frac{3(x+h)^2-3x^2}{h}=6x+3h\\ \\to\\ 6x$') },
            { id: 6, difficulty: 'medium', question: say('Aurkitu $f(x)=x^2+x$ funtzioaren ukitzailea $x=1$ puntuan.', 'Halla la tangente a $f(x)=x^2+x$ en $x=1$.', 'أوجد المماس لـ $f(x)=x^2+x$ عند $x=1$.', 'Find the tangent to $f(x)=x^2+x$ at $x=1$.'), solution: same('$y-2=3(x-1)\\ \\to\\ y=3x-1$') },
            { id: 7, difficulty: 'medium', question: say('Aurkitu $f(x)=x^2$ funtzioaren normala $x=1$ puntuan.', 'Halla la normal a $f(x)=x^2$ en $x=1$.', 'أوجد العمودي على $f(x)=x^2$ عند $x=1$.', 'Find the normal to $f(x)=x^2$ at $x=1$.'), solution: same('$y-1=-\\frac{1}{2}(x-1)$') },
            { id: 8, difficulty: 'medium', question: say('Auto batek $s(t)=5t^2$ metro egiten ditu. Zein da haren batez besteko abiadura 1 eta 3 segundo artean?', 'Un coche recorre $s(t)=5t^2$ metros. ¿Cuál es su velocidad media entre 1 y 3 segundos?', 'تقطع سيارة $s(t)=5t^2$ مترًا. ما سرعتها المتوسطة بين 1 و3 ثوانٍ؟', 'A car covers $s(t)=5t^2$ metres. What is its average speed between 1 and 3 seconds?'), solution: same('$\\frac{45-5}{3-1}=20$'), answer: { expected: n(20) } },
            { id: 9, difficulty: 'hard', question: say('Zein da aurreko autoaren abiadura $t=3$ unean?', '¿Cuál es la velocidad del coche anterior en $t=3$?', 'ما سرعة السيارة السابقة عند $t=3$؟', 'What is the speed of the previous car at $t=3$?'), solution: same('$s\'(t)=10t\\qquad s\'(3)=30$'), answer: { expected: n(30) } },
            { id: 10, difficulty: 'hard', question: say('Zein $x$ baliotan da horizontala $f(x)=x^2-6x$ funtzioaren ukitzailea?', '¿En qué $x$ es horizontal la tangente a $f(x)=x^2-6x$?', 'عند أي $x$ يكون المماس لـ $f(x)=x^2-6x$ أفقيًّا؟', 'At which $x$ is the tangent to $f(x)=x^2-6x$ horizontal?'), solution: same('$2x-6=0\\ \\to\\ x=3$'), answer: { expected: n(3) } }
        ]
    },
    {
        id: 'rules',
        title: say('Deribazio-erregelak', 'Reglas de derivación', 'قواعد الاشتقاق', 'Differentiation rules'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Deribatu $f(x)=x^5$.', 'Deriva $f(x)=x^5$.', 'اشتق $f(x)=x^5$.', 'Differentiate $f(x)=x^5$.'), solution: same('$f\'(x)=5x^4$') },
            { id: 12, difficulty: 'easy', question: say('Deribatu $f(x)=4x^2-7x+2$.', 'Deriva $f(x)=4x^2-7x+2$.', 'اشتق $f(x)=4x^2-7x+2$.', 'Differentiate $f(x)=4x^2-7x+2$.'), solution: same('$f\'(x)=8x-7$') },
            { id: 13, difficulty: 'easy', question: say('Deribatu $f(x)=\\frac{1}{x}=x^{-1}$.', 'Deriva $f(x)=\\frac{1}{x}=x^{-1}$.', 'اشتق $f(x)=\\frac{1}{x}=x^{-1}$.', 'Differentiate $f(x)=\\frac{1}{x}=x^{-1}$.'), solution: same('$f\'(x)=-x^{-2}=-\\frac{1}{x^2}$') },
            { id: 14, difficulty: 'medium', question: say('$f(x)=\\sqrt{x}$ bada, zenbat da $f\'(4)$?', 'Si $f(x)=\\sqrt{x}$, ¿cuánto vale $f\'(4)$?', 'إذا كانت $f(x)=\\sqrt{x}$ فكم تساوي $f\'(4)$؟', 'If $f(x)=\\sqrt{x}$, what is $f\'(4)$?'), solution: same('$\\frac{1}{2\\sqrt{4}}=\\frac{1}{4}$'), answer: { expected: n(1, 4) } },
            { id: 15, difficulty: 'medium', question: say('Deribatu $f(x)=(3x-1)(x+2)$.', 'Deriva $f(x)=(3x-1)(x+2)$.', 'اشتق $f(x)=(3x-1)(x+2)$.', 'Differentiate $f(x)=(3x-1)(x+2)$.'), solution: same('$3(x+2)+(3x-1)=6x+5$') },
            { id: 16, difficulty: 'medium', question: say('$f(x)=\\frac{3x}{x-1}$ bada, zenbat da $f\'(2)$?', 'Si $f(x)=\\frac{3x}{x-1}$, ¿cuánto vale $f\'(2)$?', 'إذا كانت $f(x)=\\frac{3x}{x-1}$ فكم تساوي $f\'(2)$؟', 'If $f(x)=\\frac{3x}{x-1}$, what is $f\'(2)$?'), solution: same('$f\'(x)=\\frac{-3}{(x-1)^2}\\qquad f\'(2)=-3$'), answer: { expected: n(-3) } },
            { id: 17, difficulty: 'medium', question: say('Deribatu $f(x)=(x^2-5)^4$.', 'Deriva $f(x)=(x^2-5)^4$.', 'اشتق $f(x)=(x^2-5)^4$.', 'Differentiate $f(x)=(x^2-5)^4$.'), solution: same('$4(x^2-5)^3\\cdot 2x=8x(x^2-5)^3$') },
            { id: 18, difficulty: 'medium', question: say('Deribatu $f(x)=e^{x^2+1}$.', 'Deriva $f(x)=e^{x^2+1}$.', 'اشتق $f(x)=e^{x^2+1}$.', 'Differentiate $f(x)=e^{x^2+1}$.'), solution: same('$f\'(x)=2x\\cdot e^{x^2+1}$') },
            { id: 19, difficulty: 'hard', question: say('$f(x)=x\\cdot\\ln x$ bada, zenbat da $f\'(1)$?', 'Si $f(x)=x\\cdot\\ln x$, ¿cuánto vale $f\'(1)$?', 'إذا كانت $f(x)=x\\cdot\\ln x$ فكم تساوي $f\'(1)$؟', 'If $f(x)=x\\cdot\\ln x$, what is $f\'(1)$?'), solution: same('$f\'(x)=\\ln x+1\\qquad f\'(1)=1$'), answer: { expected: n(1) } },
            { id: 20, difficulty: 'hard', question: say('$f(x)=\\ln(x^2+4x)$ bada, zenbat da $f\'(1)$?', 'Si $f(x)=\\ln(x^2+4x)$, ¿cuánto vale $f\'(1)$?', 'إذا كانت $f(x)=\\ln(x^2+4x)$ فكم تساوي $f\'(1)$؟', 'If $f(x)=\\ln(x^2+4x)$, what is $f\'(1)$?'), solution: same('$\\frac{2+4}{1+4}=\\frac{6}{5}$'), answer: { expected: n(6, 5) } }
        ]
    },
    {
        id: 'monotony',
        title: say('Hazkundea eta muturrak', 'Crecimiento y extremos', 'التزايد والقيم القصوى', 'Growth and extremes'),
        items: [
            { id: 21, difficulty: 'easy', question: say('$(1,4)$ tartean $f\'(x)>0$ bada, zer egiten du $f$ funtzioak?', 'Si $f\'(x)>0$ en $(1,4)$, ¿qué hace $f$?', 'إذا كانت $f\'(x)>0$ في $(1,4)$ فماذا تفعل $f$؟', 'If $f\'(x)>0$ on $(1,4)$, what does $f$ do?'), solution: say('Gorakorra da $(1,4)$ tartean.', 'Crece en $(1,4)$.', 'متزايدة في $(1,4)$.', 'It rises on $(1,4)$.') },
            { id: 22, difficulty: 'easy', question: say('Zein $x$ baliotan du puntu singularra $f(x)=x^2-10x$ funtzioak?', '¿En qué $x$ tiene un punto singular $f(x)=x^2-10x$?', 'عند أي $x$ توجد نقطة حرجة لـ $f(x)=x^2-10x$؟', 'At which $x$ does $f(x)=x^2-10x$ have a stationary point?'), solution: same('$2x-10=0\\ \\to\\ x=5$'), answer: { expected: n(5) } },
            { id: 23, difficulty: 'easy', question: say('Aurkitu $f(x)=x^2+4x$ funtzioaren hazkunde-tarteak.', 'Halla los intervalos de crecimiento de $f(x)=x^2+4x$.', 'أوجد مجالات تزايد $f(x)=x^2+4x$.', 'Find the intervals of growth of $f(x)=x^2+4x$.'), solution: say('Beherakorra $(-\\infty,-2)$ tartean, eta gorakorra $(-2,+\\infty)$ tartean.', 'Decrece en $(-\\infty,-2)$ y crece en $(-2,+\\infty)$.', 'متناقصة في $(-\\infty,-2)$ ومتزايدة في $(-2,+\\infty)$.', 'It falls on $(-\\infty,-2)$ and rises on $(-2,+\\infty)$.') },
            { id: 24, difficulty: 'medium', question: say('Aurkitu $f(x)=x^3-3x^2+1$ funtzioaren muturrak.', 'Halla los extremos de $f(x)=x^3-3x^2+1$.', 'أوجد القيم القصوى لـ $f(x)=x^3-3x^2+1$.', 'Find the extremes of $f(x)=x^3-3x^2+1$.'), solution: say('Maximoa $(0,1)$ puntuan, eta minimoa $(2,-3)$ puntuan.', 'Máximo en $(0,1)$ y mínimo en $(2,-3)$.', 'عظمى عند $(0,1)$ وصغرى عند $(2,-3)$.', 'Maximum at $(0,1)$ and minimum at $(2,-3)$.') },
            { id: 25, difficulty: 'medium', question: say('Aztertu $f(x)=x^3-27x$ funtzioaren hazkundea.', 'Estudia el crecimiento de $f(x)=x^3-27x$.', 'ادرس تزايد $f(x)=x^3-27x$.', 'Study the growth of $f(x)=x^3-27x$.'), solution: say('Gorakorra $(-\\infty,-3)$ eta $(3,+\\infty)$ tarteetan; beherakorra $(-3,3)$ tartean.', 'Crece en $(-\\infty,-3)$ y $(3,+\\infty)$; decrece en $(-3,3)$.', 'متزايدة في $(-\\infty,-3)$ و$(3,+\\infty)$ ومتناقصة في $(-3,3)$.', 'It rises on $(-\\infty,-3)$ and $(3,+\\infty)$; it falls on $(-3,3)$.') },
            { id: 26, difficulty: 'medium', question: say('Ba al du muturrik $f(x)=x^3+x$ funtzioak?', '¿Tiene extremos $f(x)=x^3+x$?', 'هل لـ $f(x)=x^3+x$ قيم قصوى؟', 'Does $f(x)=x^3+x$ have extremes?'), solution: say('Ez: $f\'(x)=3x^2+1>0$, beti gorakorra da.', 'No: $f\'(x)=3x^2+1>0$, siempre crece.', 'لا: $f\'(x)=3x^2+1>0$، متزايدة دائمًا.', 'No: $f\'(x)=3x^2+1>0$, it always rises.') },
            { id: 27, difficulty: 'medium', question: say('Zenbat balio du $f(x)=2x^2-8x+3$ funtzioaren minimoak?', '¿Cuánto vale el mínimo de $f(x)=2x^2-8x+3$?', 'كم تساوي القيمة الصغرى لـ $f(x)=2x^2-8x+3$؟', 'What is the minimum value of $f(x)=2x^2-8x+3$?'), solution: same('$4x-8=0\\ \\to\\ x=2\\qquad 8-16+3=-5$'), answer: { expected: n(-5) } },
            { id: 28, difficulty: 'medium', question: say('Ba al du muturrik $f(x)=x^3$ funtzioak $x=0$ puntuan?', '¿Hay extremo en $x=0$ para $f(x)=x^3$?', 'هل توجد قيمة قصوى لـ $f(x)=x^3$ عند $x=0$؟', 'Is there an extreme of $f(x)=x^3$ at $x=0$?'), solution: say('Ez: $f\'(0)=0$ da, baina $f\'$ deribatuak ez du zeinua aldatzen.', 'No: $f\'(0)=0$, pero $f\'$ no cambia de signo.', 'لا: $f\'(0)=0$ لكن إشارة $f\'$ لا تتغير.', 'No: $f\'(0)=0$, but $f\'$ does not change sign.') },
            { id: 29, difficulty: 'hard', question: say('$f(x)=x^3+ax^2+bx$ funtzioak muturrak ditu $x=1$ eta $x=3$ puntuetan. Zenbat da $a$?', '$f(x)=x^3+ax^2+bx$ tiene extremos en $x=1$ y $x=3$. ¿Cuánto vale $a$?', 'لـ $f(x)=x^3+ax^2+bx$ قيم قصوى عند $x=1$ و$x=3$. كم تساوي $a$؟', '$f(x)=x^3+ax^2+bx$ has extremes at $x=1$ and $x=3$. What is $a$?'), solution: same('$3(x-1)(x-3)=3x^2-12x+9\\ \\to\\ a=-6,\\ b=9$'), answer: { expected: n(-6) } },
            { id: 30, difficulty: 'hard', question: say('Aurkitu $k$, $f(x)=x^2+kx+1$ funtzioaren minimoa 0 izan dadin $x>0$ puntu batean.', 'Halla $k$ para que el mínimo de $f(x)=x^2+kx+1$ valga 0 en un $x>0$.', 'أوجد $k$ لتكون القيمة الصغرى لـ $f(x)=x^2+kx+1$ مساوية 0 عند $x>0$.', 'Find $k$ so that the minimum of $f(x)=x^2+kx+1$ is 0 at some $x>0$.'), solution: same('$1-\\frac{k^2}{4}=0\\ \\to\\ k=-2$'), answer: { expected: n(-2) } }
        ]
    },
    {
        id: 'optimization',
        title: say('Optimizazioa', 'Optimización', 'الاستمثال', 'Optimisation'),
        items: [
            { id: 31, difficulty: 'easy', question: say('$B\'(x)=0$ da $x=12$ puntuan, eta $B\'$ deribatua $+$ izatetik $-$ izatera pasatzen da. Zer dago han?', '$B\'(x)=0$ en $x=12$ y $B\'$ pasa de $+$ a $-$. ¿Qué hay ahí?', '$B\'(x)=0$ عند $x=12$ وتنتقل $B\'$ من $+$ إلى $-$. ماذا يوجد هناك؟', '$B\'(x)=0$ at $x=12$ and $B\'$ goes from $+$ to $-$. What is there?'), solution: say('Mozkin maximoa, 12 unitaterekin.', 'El beneficio máximo, con 12 unidades.', 'الربح الأعظم بـ 12 وحدة.', 'The greatest profit, with 12 units.') },
            { id: 32, difficulty: 'easy', question: say('$B(x)=-x^2+20x$. Zenbat unitatek ematen dute mozkin maximoa?', '$B(x)=-x^2+20x$. ¿Cuántas unidades dan el beneficio máximo?', '$B(x)=-x^2+20x$. كم وحدة تعطي الربح الأعظم؟', '$B(x)=-x^2+20x$. How many units give the greatest profit?'), solution: same('$-2x+20=0\\ \\to\\ x=10$'), answer: { expected: n(10) } },
            { id: 33, difficulty: 'easy', question: say('Bi zenbakiren batura 30 da. Zein da haien biderkadurarik handiena?', 'Dos números suman 30. ¿Cuál es su producto máximo?', 'عددان مجموعهما 30. ما أكبر جداء لهما؟', 'Two numbers add up to 30. What is their greatest product?'), solution: same('$15\\cdot 15=225$'), answer: { expected: n(225) } },
            { id: 34, difficulty: 'medium', question: say('$I(x)=100x$ eta $C(x)=x^2+40x+200$. Zenbat unitatek ematen dute mozkin maximoa?', '$I(x)=100x$ y $C(x)=x^2+40x+200$. ¿Cuántas unidades dan el beneficio máximo?', '$I(x)=100x$ و$C(x)=x^2+40x+200$. كم وحدة تعطي الربح الأعظم؟', '$I(x)=100x$ and $C(x)=x^2+40x+200$. How many units give the greatest profit?'), solution: same('$B\'(x)=-2x+60=0\\ \\to\\ x=30$'), answer: { expected: n(30) } },
            { id: 35, difficulty: 'medium', question: say('Zein da aurreko ariketako mozkin maximoa?', '¿Cuál es el beneficio máximo del ejercicio anterior?', 'ما الربح الأعظم في التمرين السابق؟', 'What is the greatest profit in the previous exercise?'), solution: same('$-900+1800-200=700$'), answer: { expected: n(700) } },
            { id: 36, difficulty: 'medium', question: say('Perimetroa 24 duen laukizuzen baten azalerarik handiena?', '¿Área máxima de un rectángulo de perímetro 24?', 'ما أكبر مساحة لمستطيل محيطه 24؟', 'Greatest area of a rectangle with perimeter 24?'), solution: same('$6\\cdot 6=36$'), answer: { expected: n(36) } },
            { id: 37, difficulty: 'medium', question: say('Zein da $f(x)=x^2-6x+5$ funtzioaren minimoa $[0,2]$ tartean?', '¿Cuál es el mínimo de $f(x)=x^2-6x+5$ en $[0,2]$?', 'ما القيمة الصغرى لـ $f(x)=x^2-6x+5$ في $[0,2]$؟', 'What is the minimum of $f(x)=x^2-6x+5$ on $[0,2]$?'), solution: same('$f(0)=5\\qquad f(2)=4-12+5=-3$'), answer: { expected: n(-3) } },
            { id: 38, difficulty: 'medium', question: say('Zein da $f(x)=x^3-3x$ funtzioaren maximoa $[-2,2]$ tartean?', '¿Cuál es el máximo de $f(x)=x^3-3x$ en $[-2,2]$?', 'ما القيمة العظمى لـ $f(x)=x^3-3x$ في $[-2,2]$؟', 'What is the maximum of $f(x)=x^3-3x$ on $[-2,2]$?'), solution: same('$f(-1)=2\\qquad f(2)=8-6=2$'), answer: { expected: n(2) } },
            { id: 39, difficulty: 'hard', question: say('80 m hesirekin laukizuzen bat ixten da ibai baten ondoan (hiru alde). Zein da azalerarik handiena?', 'Con 80 m de valla se cerca un rectángulo junto a un río (tres lados). ¿Cuál es el área máxima?', 'نسيّج مستطيلًا بجانب نهر بسياج طوله 80 م (ثلاثة أضلاع). ما أكبر مساحة؟', 'With 80 m of fence you close a rectangle next to a river (three sides). What is the greatest area?'), solution: same('$A(y)=80y-2y^2\\qquad y=20\\qquad 40\\cdot 20=800$'), answer: { expected: n(800) } },
            { id: 40, difficulty: 'hard', question: say('$C(x)=x^2+100$ bada, zein $x$ baliok egiten du minimo $\\frac{C(x)}{x}$ batez besteko kostua?', 'Si $C(x)=x^2+100$, ¿qué $x$ hace mínimo el coste medio $\\frac{C(x)}{x}$?', 'إذا كانت $C(x)=x^2+100$ فأي $x$ يجعل التكلفة المتوسطة $\\frac{C(x)}{x}$ أصغرية؟', 'If $C(x)=x^2+100$, which $x$ makes the average cost $\\frac{C(x)}{x}$ least?'), solution: same('$1-\\frac{100}{x^2}=0\\ \\to\\ x=10$'), answer: { expected: n(10) } }
        ]
    },
    {
        id: 'graphs',
        title: say('Grafikoak', 'Representación', 'التمثيل البياني', 'Graphs'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Zein dira $f(x)=x^2-4x$ funtzioaren ebaki-puntuak X ardatzarekin?', '¿Cuáles son los cortes de $f(x)=x^2-4x$ con el eje X?', 'ما نقاط تقاطع $f(x)=x^2-4x$ مع محور X؟', 'What are the intercepts of $f(x)=x^2-4x$ with the x-axis?'), solution: same('$x(x-4)=0\\ \\to\\ x=0,\\ x=4$') },
            { id: 42, difficulty: 'easy', question: say('Zein dira $f(x)=-2x^3+x$ funtzioaren adarrak?', '¿Cuáles son las ramas de $f(x)=-2x^3+x$?', 'ما فروع $f(x)=-2x^3+x$؟', 'What are the branches of $f(x)=-2x^3+x$?'), solution: say('$+\\infty$ ezkerrean eta $-\\infty$ eskuinean.', '$+\\infty$ a la izquierda y $-\\infty$ a la derecha.', '$+\\infty$ إلى اليسار و$-\\infty$ إلى اليمين.', '$+\\infty$ on the left and $-\\infty$ on the right.') },
            { id: 43, difficulty: 'easy', question: say('$f$ funtzioak minimoa badu $x=2$ puntuan, zenbat da $f\'(2)$?', 'Si $f$ tiene un mínimo en $x=2$, ¿cuánto vale $f\'(2)$?', 'إذا كانت لـ $f$ قيمة صغرى عند $x=2$ فكم تساوي $f\'(2)$؟', 'If $f$ has a minimum at $x=2$, what is $f\'(2)$?'), solution: say('Ukitzailea horizontala da: 0.', 'La tangente es horizontal: 0.', 'المماس أفقي: 0.', 'The tangent is horizontal: 0.'), answer: { expected: n(0) } },
            { id: 44, difficulty: 'medium', question: say('Aurkitu $f(x)=x^3-3x$ funtzioaren muturrak.', 'Halla los extremos de $f(x)=x^3-3x$.', 'أوجد القيم القصوى لـ $f(x)=x^3-3x$.', 'Find the extremes of $f(x)=x^3-3x$.'), solution: say('Maximoa $(-1,2)$ puntuan, eta minimoa $(1,-2)$ puntuan.', 'Máximo en $(-1,2)$ y mínimo en $(1,-2)$.', 'عظمى عند $(-1,2)$ وصغرى عند $(1,-2)$.', 'Maximum at $(-1,2)$ and minimum at $(1,-2)$.') },
            { id: 45, difficulty: 'medium', question: say('Aurkitu $f(x)=x^4-2x^2$ funtzioaren puntu singularrak.', 'Halla los puntos singulares de $f(x)=x^4-2x^2$.', 'أوجد النقاط الحرجة لـ $f(x)=x^4-2x^2$.', 'Find the stationary points of $f(x)=x^4-2x^2$.'), solution: same('$4x(x^2-1)=0\\ \\to\\ x=0,\\ x=\\pm 1$') },
            { id: 46, difficulty: 'medium', question: say('Aurkitu $f(x)=\\frac{x^2}{x+2}$ funtzioaren asintotak.', 'Halla las asíntotas de $f(x)=\\frac{x^2}{x+2}$.', 'أوجد مقاربات $f(x)=\\frac{x^2}{x+2}$.', 'Find the asymptotes of $f(x)=\\frac{x^2}{x+2}$.'), solution: same('$x=-2\\qquad y=x-2$') },
            { id: 47, difficulty: 'medium', question: say('Aurkitu $f(x)=x+\\frac{4}{x}$ funtzioaren muturrak.', 'Halla los extremos de $f(x)=x+\\frac{4}{x}$.', 'أوجد القيم القصوى لـ $f(x)=x+\\frac{4}{x}$.', 'Find the extremes of $f(x)=x+\\frac{4}{x}$.'), solution: say('Maximoa $(-2,-4)$ puntuan, eta minimoa $(2,4)$ puntuan.', 'Máximo en $(-2,-4)$ y mínimo en $(2,4)$.', 'عظمى عند $(-2,-4)$ وصغرى عند $(2,4)$.', 'Maximum at $(-2,-4)$ and minimum at $(2,4)$.') },
            { id: 48, difficulty: 'medium', question: say('$f\'$ positiboa bada $(-\\infty,1)$ tartean eta negatiboa $(1,+\\infty)$ tartean, zer dago $x=1$ puntuan?', 'Si $f\'$ es positiva en $(-\\infty,1)$ y negativa en $(1,+\\infty)$, ¿qué hay en $x=1$?', 'إذا كانت $f\'$ موجبة في $(-\\infty,1)$ وسالبة في $(1,+\\infty)$ فماذا يوجد عند $x=1$؟', 'If $f\'$ is positive on $(-\\infty,1)$ and negative on $(1,+\\infty)$, what is at $x=1$?'), solution: say('Maximo bat.', 'Un máximo.', 'قيمة عظمى.', 'A maximum.') },
            { id: 49, difficulty: 'hard', question: say('$f\'(x)=x(x-4)$. Zein $x$ baliotan du minimoa $f$ funtzioak?', '$f\'(x)=x(x-4)$. ¿En qué $x$ tiene $f$ su mínimo?', '$f\'(x)=x(x-4)$. عند أي $x$ تكون القيمة الصغرى لـ $f$؟', '$f\'(x)=x(x-4)$. At which $x$ does $f$ have its minimum?'), solution: say('$-$ izatetik $+$ izatera pasatzen da $x=4$ puntuan.', 'Pasa de $-$ a $+$ en $x=4$.', 'تنتقل من $-$ إلى $+$ عند $x=4$.', 'It goes from $-$ to $+$ at $x=4$.'), answer: { expected: n(4) } },
            { id: 50, difficulty: 'hard', question: say('Zenbat balio du $f(x)=\\frac{x^2+1}{x}$ funtzioaren minimoak $x>0$ denean?', '¿Cuánto vale el mínimo relativo de $f(x)=\\frac{x^2+1}{x}$ para $x>0$?', 'كم تساوي القيمة الصغرى لـ $f(x)=\\frac{x^2+1}{x}$ عندما $x>0$؟', 'What is the local minimum value of $f(x)=\\frac{x^2+1}{x}$ for $x>0$?'), solution: same('$1-\\frac{1}{x^2}=0\\ \\to\\ x=1\\qquad f(1)=2$'), answer: { expected: n(2) } }
        ]
    }
]
