import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { localizeNames, same, say } from '../batx1-zientziak-funtzioak/text'
import { AbsoluteGraphsFigure, AsymptotesReviewFigure, BellFigure, DataCurveFigure, DerivativeGraphFigure, DomainEdgesFigure, ExpProductsFigure, LogFigure, PiecewiseFigure, PositionFigure, RationalReviewFigure, RootFigure, SketchPlanFigure, SymmetryFigure, TrigFigure } from './figures'
import { bach2SketchLessonChecks, type Bach2SketchTopicId } from './lessonChecks'
import { bach2SketchLessonTexts } from './lessonTexts'

/* ==========================================================================
   Funtzioen adierazpena · Batxilergoa 2 · Zientziak — stages and lessons.
   The scope follows unit 10 of Santillana 2.º Bachillerato Ciencias (the
   study before differentiating and whole functions by families: rational,
   with roots, exponential, logarithmic, piecewise and with absolute
   values) with unit 10 of Anaya Matemáticas II (the position of the curve
   relative to its asymptotes, curves drawn from data) and the «study and
   sketch» of the Basque EBAU. What 1.º Bachillerato already taught (the
   plan, asymptotes, polynomial and rational graphs) is a review stage of
   three lessons; trigonometric functions take a single lesson over one
   period, and functions with parameters go to the exercises (owner,
   2026-11-11).
   ========================================================================== */

export type Bach2SketchStageId = 'review' | 'study' | 'explog' | 'roots' | 'reading'

export const bach2SketchStages: UnitStage[] = [
    { id: 'review', tone: 'blue', title: { eu: 'Batxilergoko 1. mailako errepasoa', es: 'Repaso de 1.º de Bachillerato', en: 'Review of 1st Bachillerato', ar: 'مراجعة السنة الأولى من البكالوريا' } },
    { id: 'study', tone: 'violet', title: { eu: 'Aurretiko azterketa, sakonago', es: 'El estudio previo, a fondo', en: 'The study before differentiating, in depth', ar: 'الدراسة المسبقة بعمق' } },
    { id: 'explog', tone: 'mustard', title: { eu: 'Esponentzialak eta logaritmikoak', es: 'Exponenciales y logarítmicas', en: 'Exponential and logarithmic', ar: 'الأسية واللوغاريتمية' } },
    { id: 'roots', tone: 'coral', title: { eu: 'Erroak, trigonometrikoak eta zatiak', es: 'Raíces, trigonométricas y trozos', en: 'Roots, trigonometric and piecewise', ar: 'الجذور والمثلثية والأجزاء' } },
    { id: 'reading', tone: 'green', title: { eu: 'Balio absolutua eta grafikoak alderantziz', es: 'Valor absoluto y gráficas al revés', en: 'Absolute values and graphs the other way round', ar: 'القيمة المطلقة والرسوم بالعكس' } }
]

const LIMITS1 = 'batx1-zientziak/limites-continuidad'
const APPLICATIONS1 = 'batx1-zientziak/aplicaciones-derivada'
const FUNCTIONS1 = 'batx1-zientziak/funciones'
const DERIVATIVES2 = 'batx2-zientziak/derivadas'
const APPLICATIONS2 = 'batx2-zientziak/aplicaciones-derivada'

const VERTICAL1 = { unit: LIMITS1, topic: 'vertical-horizontal', title: { eu: 'Asintota bertikalak eta horizontalak', es: 'Asíntotas verticales y horizontales', en: 'Vertical and horizontal asymptotes', ar: 'المقاربات الرأسية والأفقية' } }
const OBLIQUE1 = { unit: LIMITS1, topic: 'oblique', title: { eu: 'Asintota zeiharrak', es: 'Asíntotas oblicuas', en: 'Oblique asymptotes', ar: 'المقاربات المائلة' } }
const EXP_LOG1 = { unit: APPLICATIONS1, topic: 'exp-log-graph', title: { eu: 'Esponentzialak eta logaritmikoak irudikatzea', es: 'Representar exponenciales y logarítmicas', en: 'Sketching exponential and logarithmic functions', ar: 'رسم الدوال الأسية واللوغاريتمية' } }
const PERIODIC1 = { unit: FUNCTIONS1, topic: 'periodic', title: { eu: 'Funtzio periodikoak', es: 'Funciones periódicas', en: 'Periodic functions', ar: 'الدوال الدورية' } }
const MONOTONY2 = { unit: APPLICATIONS2, topic: 'monotony-review', title: { eu: 'Hazkundea eta muturrak: errepasoa', es: 'Crecimiento y extremos: repaso', en: 'Increase and extrema: review', ar: 'التزايد والقيم القصوى: مراجعة' } }

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Review of 1.º ---------- */
    {
        id: 'sketch-plan',
        stage: 'review',
        title: say('Irudikatzeko gidoia: errepasoa', 'El guion para representar: repaso', 'خطة رسم الدالة: مراجعة', 'The plan for sketching: review'),
        goal: say('Funtzio bat irudikatzeko urratsak gogoratzea, ordenan, polinomio batekin.', 'Recordar los pasos para representar una función, en orden, con un polinomio.', 'تذكّر خطوات رسم دالة بالترتيب، مع حدودية.', 'Recall the steps for sketching a function, in order, with a polynomial.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'polynomial-graph', title: { eu: 'Funtzio polinomikoak irudikatzea', es: 'Representar funciones polinómicas', en: 'Sketching polynomial functions', ar: 'رسم الدوال الحدودية' } },
            MONOTONY2
        ],
        problem: say('Irudikatu $f(x)=x^3-3x^2$.', 'Representa $f(x)=x^3-3x^2$.', 'ارسم $f(x)=x^3-3x^2$.', 'Sketch $f(x)=x^3-3x^2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Polinomio bat da: izate-eremua $\\mathbb{R}$. Ebaki-puntuak $X$ ardatzarekin.', 'Es un polinomio: dominio $\\mathbb{R}$. Cortes con el eje $X$.', 'إنها حدودية: المجال $\\mathbb{R}$. نقاط التقاطع مع المحور $X$.', 'It is a polynomial: domain $\\mathbb{R}$. Intercepts with the $X$ axis.'), math: same('$x^2(x-3)=0\\ \\to\\ x=0,\\ x=3$') },
            { text: say('Muturrak.', 'Extremos.', 'القيم القصوى.', 'Extrema.'), math: same('$\\begin{gathered}f\'(x)=3x^2-6x=3x(x-2)\\\\ \\max\\ (0,\\,0)\\qquad \\min\\ (2,\\,-4)\\end{gathered}$') },
            { text: say('Inflexioa eta adarrak.', 'Inflexión y ramas.', 'الانعطاف والفروع.', 'Inflection and branches.'), math: same('$\\begin{gathered}f\'\'(x)=6x-6=0\\ \\to\\ (1,\\,-2)\\\\ x\\to\\pm\\infty\\ \\to\\ f\\to\\pm\\infty\\end{gathered}$') }
        ],
        takeaway: say('Gidoia: izate-eremua, ebaki-puntuak eta zeinua, simetria, asintotak eta adarrak, hazkundea eta muturrak ($f\'$), kurbadura eta inflexioa ($f\'\'$). Amaieran puntuak marrazten dira, eta geziei jarraituz lotzen dira.', 'Guion: dominio, cortes y signo, simetría, asíntotas y ramas, crecimiento y extremos ($f\'$), curvatura e inflexión ($f\'\'$). Al final se dibujan los puntos y se unen siguiendo las flechas.', 'الخطة: المجال، ونقاط التقاطع والإشارة، والتناظر، والمقاربات والفروع، والتزايد والقيم القصوى ($f\'$)، والتقعّر والانعطاف ($f\'\'$). وفي النهاية نرسم النقاط ونصلها متبعين الأسهم.', 'Plan: domain, intercepts and sign, symmetry, asymptotes and branches, increase and extrema ($f\'$), concavity and inflection ($f\'\'$). At the end, draw the points and join them following the arrows.'),
        figure: (language) => <SketchPlanFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'asymptotes-review',
        stage: 'review',
        title: say('Asintotak eta adar infinituak: errepasoa', 'Asíntotas y ramas infinitas: repaso', 'المقاربات والفروع اللانهائية: مراجعة', 'Asymptotes and infinite branches: review'),
        goal: say('Funtzio baten asintota bertikalak, horizontalak eta zeiharrak aurkitzea, 1. mailan bezala.', 'Hallar las asíntotas verticales, horizontales y oblicuas de una función, como en 1.º.', 'إيجاد المقاربات الرأسية والأفقية والمائلة لدالة، كما في السنة الأولى.', 'Find the vertical, horizontal and oblique asymptotes of a function, as in the first year.'),
        needs: [VERTICAL1, OBLIQUE1],
        problem: say('Aurkitu $f(x)=\\frac{2x^2+1}{x-1}$ funtzioaren asintotak.', 'Halla las asíntotas de $f(x)=\\frac{2x^2+1}{x-1}$.', 'أوجد مقاربات $f(x)=\\frac{2x^2+1}{x-1}$.', 'Find the asymptotes of $f(x)=\\frac{2x^2+1}{x-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bertikala: izendatzailea zero da $x=1$ puntuan, eta zenbakitzailea ez.', 'Vertical: el denominador se anula en $x=1$ y el numerador no.', 'الرأسي: ينعدم المقام عند $x=1$ ولا ينعدم البسط.', 'Vertical: the denominator is 0 at $x=1$ and the numerator is not.'), math: same('$\\lim_{x\\to 1^\\pm}f(x)=\\pm\\infty\\ \\to\\ x=1$') },
            { text: say('Ez dago horizontalik: goiko maila handiagoa da. Zatitu zeiharra aurkitzeko.', 'No hay horizontal: el grado de arriba es mayor. Divide para hallar la oblicua.', 'لا يوجد أفقي: درجة البسط أكبر. اقسم لإيجاد المائل.', 'There is no horizontal one: the degree on top is larger. Divide to find the oblique one.'), math: same('$2x^2+1=(x-1)(2x+2)+3$') },
            { text: say('Zeiharra zatidura da.', 'La oblicua es el cociente.', 'المائل هو خارج القسمة.', 'The oblique asymptote is the quotient.'), math: same('$f(x)=2x+2+\\frac{3}{x-1}\\ \\to\\ y=2x+2$') }
        ],
        takeaway: say('Bertikala $x=a$ zuzenean, $x\\to a$ doanean $f(x)\\to\\pm\\infty$ bada. Horizontala $y=k$, $x\\to\\pm\\infty$ doanean $f(x)\\to k$ bada. Zeiharra $y=mx+n$, $m=\\lim\\frac{f(x)}{x}$ eta $n=\\lim(f(x)-mx)$ izanik; funtzio arrazional batean, zatiketaren zatidura da.', 'Vertical en $x=a$ si $f(x)\\to\\pm\\infty$ cuando $x\\to a$. Horizontal $y=k$ si $f(x)\\to k$ cuando $x\\to\\pm\\infty$. Oblicua $y=mx+n$ con $m=\\lim\\frac{f(x)}{x}$ y $n=\\lim(f(x)-mx)$; en una racional, es el cociente de la división.', 'رأسي عند $x=a$ إذا كان $f(x)\\to\\pm\\infty$ عندما $x\\to a$. أفقي $y=k$ إذا كان $f(x)\\to k$ عندما $x\\to\\pm\\infty$. مائل $y=mx+n$ حيث $m=\\lim\\frac{f(x)}{x}$ و$n=\\lim(f(x)-mx)$؛ وفي الدالة الكسرية هو خارج القسمة.', 'Vertical at $x=a$ if $f(x)\\to\\pm\\infty$ as $x\\to a$. Horizontal $y=k$ if $f(x)\\to k$ as $x\\to\\pm\\infty$. Oblique $y=mx+n$ with $m=\\lim\\frac{f(x)}{x}$ and $n=\\lim(f(x)-mx)$; in a rational function, it is the quotient of the division.'),
        figure: (language) => <AsymptotesReviewFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'rational-review',
        stage: 'review',
        title: say('Funtzio arrazional oso bat: errepasoa', 'Una racional completa: repaso', 'دالة كسرية كاملة: مراجعة', 'A complete rational function: review'),
        goal: say('Funtzio arrazional bat gidoi osoarekin irudikatzea: asintotak, muturrak eta zeinua.', 'Representar una racional con todo el guion: asíntotas, extremos y signo.', 'رسم دالة كسرية بالخطة كاملة: المقاربات والقيم القصوى والإشارة.', 'Sketch a rational function with the whole plan: asymptotes, extrema and sign.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'rational-graph', title: { eu: 'Funtzio arrazionalak irudikatzea', es: 'Representar funciones racionales', en: 'Sketching rational functions', ar: 'رسم الدوال الكسرية' } },
            { unit: LIMITS1, topic: 'branches', title: { eu: 'Funtzio arrazionalen adar infinituak', es: 'Ramas infinitas de las funciones racionales', en: 'Infinite branches of rational functions', ar: 'الفروع اللانهائية للدوال الكسرية' } }
        ],
        problem: say('Irudikatu $f(x)=\\frac{x^2}{x^2-1}$.', 'Representa $f(x)=\\frac{x^2}{x^2-1}$.', 'ارسم $f(x)=\\frac{x^2}{x^2-1}$.', 'Sketch $f(x)=\\frac{x^2}{x^2-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izate-eremua $\\mathbb{R}-\\{-1,\\,1\\}$: $x=\\pm 1$ asintota bertikalak eta $y=1$ horizontala.', 'Dominio $\\mathbb{R}-\\{-1,\\,1\\}$: asíntotas verticales $x=\\pm 1$ y horizontal $y=1$.', 'المجال $\\mathbb{R}-\\{-1,\\,1\\}$: مقاربان رأسيان $x=\\pm 1$ وأفقي $y=1$.', 'Domain $\\mathbb{R}-\\{-1,\\,1\\}$: vertical asymptotes $x=\\pm 1$ and horizontal $y=1$.'), math: same('$\\lim_{x\\to\\pm\\infty}\\frac{x^2}{x^2-1}=1$') },
            { text: say('Gorakorra da $x<0$ denean eta beherakorra $x>0$ denean: maximoa $(0,\\,0)$ puntuan.', 'Crece si $x<0$ y decrece si $x>0$: máximo en $(0,\\,0)$.', 'تتزايد إذا كان $x<0$ وتتناقص إذا كان $x>0$: قيمة عظمى عند $(0,\\,0)$.', 'It increases if $x<0$ and decreases if $x>0$: a maximum at $(0,\\,0)$.'), math: same('$f\'(x)=\\frac{-2x}{(x^2-1)^2}=0\\ \\to\\ x=0$') },
            { text: say('Zeinua: positiboa $[-1,\\,1]$ tartetik kanpo eta negatiboa barruan (0 puntuan izan ezik). Hiru adarrak marrazten dira.', 'Signo: positiva fuera de $[-1,\\,1]$ y negativa dentro (salvo en 0). Se dibujan las tres ramas.', 'الإشارة: موجبة خارج $[-1,\\,1]$ وسالبة داخلها (إلا عند 0). نرسم الفروع الثلاثة.', 'Sign: positive outside $[-1,\\,1]$ and negative inside (except at 0). The three branches are drawn.') }
        ],
        takeaway: say('Funtzio arrazional batean, lehenik izate-eremua eta asintotak, planoa zatitzen dutenak; gero zeinuak esaten du zein zonatan doan kurba, eta $f\'$ deribatuak muturrak kokatzen ditu. Adar bakoitza bere asintotei itsatsita marrazten da.', 'En una racional, primero el dominio y las asíntotas, que parten el plano; después el signo dice en qué zonas va la curva, y $f\'$ coloca los extremos. Cada rama se dibuja pegada a sus asíntotas.', 'في الدالة الكسرية: أولًا المجال والمقاربات التي تقسم المستوى؛ ثم تدل الإشارة على المناطق التي يمر فيها المنحنى، وتحدد $f\'$ القيم القصوى. ويُرسم كل فرع ملاصقًا لمقارباته.', 'In a rational function, first the domain and the asymptotes, which split the plane; then the sign says in which regions the curve runs, and $f\'$ places the extrema. Each branch is drawn hugging its asymptotes.'),
        figure: (language) => <RationalReviewFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. The study before differentiating ---------- */
    {
        id: 'symmetry-period',
        stage: 'study',
        title: say('Simetriak eta periodikotasuna', 'Simetrías y periodicidad', 'التناظر والدورية', 'Symmetry and periodicity'),
        goal: say('Funtzio bikoitiak, bakoitiak eta periodikoak ezagutzea, eta zati bat bakarrik aztertzeko erabiltzea.', 'Reconocer funciones pares, impares y periódicas, y usarlo para estudiar solo una parte.', 'التعرف إلى الدوال الزوجية والفردية والدورية، واستعمال ذلك لدراسة جزء واحد فقط.', 'Recognise even, odd and periodic functions, and use that to study only one part.'),
        needs: [
            { unit: FUNCTIONS1, topic: 'symmetry', title: { eu: 'Simetriak: funtzio bikoitiak eta bakoitiak', es: 'Simetrías: funciones pares e impares', en: 'Symmetry: even and odd functions', ar: 'التناظر: الدوال الزوجية والفردية' } },
            PERIODIC1
        ],
        problem: say('Bikoitia ala bakoitia da $f(x)=\\frac{x^3}{x^2+1}$? Eta zein da $g(x)=\\cos 2x$ funtzioaren periodoa?', '¿Es par o impar $f(x)=\\frac{x^3}{x^2+1}$? ¿Y cuál es el periodo de $g(x)=\\cos 2x$?', 'هل $f(x)=\\frac{x^3}{x^2+1}$ زوجية أم فردية؟ وما دور $g(x)=\\cos 2x$؟', 'Is $f(x)=\\frac{x^3}{x^2+1}$ even or odd? And what is the period of $g(x)=\\cos 2x$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldatu $x$ eta $-x$: $-f(x)$ ateratzen da, beraz $f$ bakoitia da, jatorriarekiko simetrikoa.', 'Cambia $x$ por $-x$: sale $-f(x)$, así que $f$ es impar, simétrica respecto del origen.', 'بدّل $x$ بـ $-x$: نحصل على $-f(x)$، فالدالة $f$ فردية متناظرة بالنسبة إلى الأصل.', 'Change $x$ to $-x$: you get $-f(x)$, so $f$ is odd, symmetric about the origin.'), math: same('$f(-x)=\\frac{-x^3}{x^2+1}=-f(x)$') },
            { text: say('Kosinua $2\\pi$ bakoitzean errepikatzen da.', 'El coseno se repite cada $2\\pi$.', 'يتكرر جيب التمام كل $2\\pi$.', 'The cosine repeats every $2\\pi$.'), math: same('$\\cos 2(x+\\pi)=\\cos(2x+2\\pi)=\\cos 2x$') },
            { text: say('$g$ funtzioaren periodoa $\\pi$ da: nahikoa da $[0,\\,\\pi]$ tartean marraztea eta kopiatzea.', 'El periodo de $g$ es $\\pi$: basta dibujarla en $[0,\\,\\pi]$ y copiar.', 'دور $g$ هو $\\pi$: يكفي رسمها على $[0,\\,\\pi]$ ثم النسخ.', 'The period of $g$ is $\\pi$: it is enough to draw it on $[0,\\,\\pi]$ and copy.') }
        ],
        takeaway: say('Bikoitia: $f(-x)=f(x)$, $Y$ ardatzarekiko simetrikoa. Bakoitia: $f(-x)=-f(x)$, jatorriarekiko simetrikoa. $T$ periodoa duen periodikoa: $f(x+T)=f(x)$. Simetriarekin $x\\ge 0$ bakarrik aztertzen da; periodoarekin, periodoa bakarrik.', 'Par: $f(-x)=f(x)$, simétrica respecto del eje $Y$. Impar: $f(-x)=-f(x)$, simétrica respecto del origen. Periódica de periodo $T$: $f(x+T)=f(x)$. Con simetría se estudia solo $x\\ge 0$; con periodo, un solo periodo.', 'زوجية: $f(-x)=f(x)$، متناظرة بالنسبة إلى المحور $Y$. فردية: $f(-x)=-f(x)$، متناظرة بالنسبة إلى الأصل. دورية بدور $T$: $f(x+T)=f(x)$. مع التناظر ندرس $x\\ge 0$ فقط، ومع الدورية دورًا واحدًا.', 'Even: $f(-x)=f(x)$, symmetric about the $Y$ axis. Odd: $f(-x)=-f(x)$, symmetric about the origin. Periodic with period $T$: $f(x+T)=f(x)$. With symmetry only $x\\ge 0$ is studied; with a period, a single period.'),
        figure: (language) => <SymmetryFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'asymptote-position',
        stage: 'study',
        title: say('Kurbaren posizioa asintotekiko', 'Posición respecto de las asíntotas', 'وضع المنحنى بالنسبة إلى المقاربات', 'Position relative to the asymptotes'),
        goal: say('Kurba bere asintoten gainetik ala azpitik doan jakitea, kenduraren zeinuarekin.', 'Saber si la curva va por encima o por debajo de sus asíntotas, con el signo de la diferencia.', 'معرفة هل يسير المنحنى فوق مقارباته أم تحتها، بإشارة الفرق.', 'Know whether the curve runs above or below its asymptotes, with the sign of the difference.'),
        needs: [VERTICAL1, OBLIQUE1],
        problem: say('Kokatu $f(x)=\\frac{x^2+1}{x}$ funtzioa bere asintotekiko.', 'Sitúa $f(x)=\\frac{x^2+1}{x}$ respecto de sus asíntotas.', 'حدّد وضع $f(x)=\\frac{x^2+1}{x}$ بالنسبة إلى مقارباتها.', 'Place $f(x)=\\frac{x^2+1}{x}$ relative to its asymptotes.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Asintotak: bertikala $x=0$ eta zeiharra $y=x$.', 'Asíntotas: vertical $x=0$ y oblicua $y=x$.', 'المقاربان: رأسي $x=0$ ومائل $y=x$.', 'Asymptotes: vertical $x=0$ and oblique $y=x$.'), math: same('$f(x)=x+\\frac{1}{x}$') },
            { text: say('Kendura zeiharrarekiko: $x\\to+\\infty$ doanean positiboa da, eta kurba gainetik doa; $x\\to-\\infty$ doanean, azpitik.', 'La diferencia con la oblicua: cuando $x\\to+\\infty$ es positiva y la curva va por encima; cuando $x\\to-\\infty$, por debajo.', 'الفرق مع المائل: عندما $x\\to+\\infty$ يكون موجبًا ويسير المنحنى فوقه، وعندما $x\\to-\\infty$ تحته.', 'The difference from the oblique one: as $x\\to+\\infty$ it is positive and the curve runs above; as $x\\to-\\infty$, below.'), math: same('$f(x)-x=\\frac{1}{x}$') },
            { text: say('$x=0$ puntutik hurbil, alboko limiteak.', 'Cerca de $x=0$, los límites laterales.', 'قرب $x=0$، النهايتان الجانبيتان.', 'Near $x=0$, the one-sided limits.'), math: same('$\\lim_{x\\to 0^-}f(x)=-\\infty\\qquad\\lim_{x\\to 0^+}f(x)=+\\infty$') }
        ],
        takeaway: say('$y=mx+n$ asintotarako, $f(x)-(mx+n)$ kenduraren zeinua begiratzen da $x\\to\\pm\\infty$ doanean: positiboa, kurba gainetik doa; negatiboa, azpitik. Bertikal batean, alboko limiteek esaten dute alde bakoitzean igotzen ala jaisten den.', 'Para la asíntota $y=mx+n$ se mira el signo de $f(x)-(mx+n)$ cuando $x\\to\\pm\\infty$: positivo, la curva va por encima; negativo, por debajo. En una vertical, los límites laterales dicen si sube o baja a cada lado.', 'للمقارب $y=mx+n$ ننظر إلى إشارة $f(x)-(mx+n)$ عندما $x\\to\\pm\\infty$: موجبة، يسير المنحنى فوقه؛ سالبة، تحته. ومع المقارب الرأسي تدل النهايتان الجانبيتان على الصعود أو النزول في كل جهة.', 'For the asymptote $y=mx+n$, look at the sign of $f(x)-(mx+n)$ as $x\\to\\pm\\infty$: positive, the curve runs above; negative, below. At a vertical one, the one-sided limits say whether it goes up or down on each side.'),
        figure: (language) => <PositionFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'domain-edges',
        stage: 'study',
        title: say('Izate-eremuaren ertzak eta zuzen ukitzaile bertikala', 'Bordes del dominio y tangente vertical', 'حواف المجال والمماس الرأسي', 'Edges of the domain and vertical tangents'),
        goal: say('Erro baten izate-eremuaren ertzetan zer gertatzen den aztertzea: kurba amaitu egiten da, batzuetan zuzen ukitzaile bertikalarekin.', 'Estudiar qué pasa en los bordes del dominio de una raíz: la curva termina, a veces con tangente vertical.', 'دراسة ما يحدث عند حواف مجال جذر: ينتهي المنحنى، أحيانًا بمماس رأسي.', 'Study what happens at the edges of the domain of a root: the curve ends, sometimes with a vertical tangent.'),
        needs: [
            { unit: FUNCTIONS1, topic: 'domain', title: { eu: 'Izate-eremua: baldintza guztiak batera', es: 'Dominio: todas las condiciones a la vez', en: 'Domain: every condition at once', ar: 'المجال: كل الشروط معًا' } },
            { unit: DERIVATIVES2, topic: 'corners', title: { eu: 'Deribagarria bada, jarraitua da', es: 'Derivable implica continua', en: 'Differentiable implies continuous', ar: 'قابلية الاشتقاق تقتضي الاتصال' } }
        ],
        problem: say('Irudikatu $f(x)=\\sqrt{9-x^2}$ eta aztertu haren ertzak.', 'Representa $f(x)=\\sqrt{9-x^2}$ y estudia sus bordes.', 'ارسم $f(x)=\\sqrt{9-x^2}$ وادرس حوافها.', 'Sketch $f(x)=\\sqrt{9-x^2}$ and study its edges.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izate-eremua: barrukoa ezin da negatiboa izan.', 'Dominio: lo de dentro no puede ser negativo.', 'المجال: لا يمكن أن يكون ما بالداخل سالبًا.', 'Domain: the inside cannot be negative.'), math: same('$9-x^2\\ge 0\\ \\to\\ -3\\le x\\le 3$') },
            { text: say('$x\\to 3^-$ doanean, $f\'(x)\\to-\\infty$: $(3,\\,0)$ puntuan zuzen ukitzailea bertikala da; $(-3,\\,0)$ puntuan, berdin.', 'Cuando $x\\to 3^-$, $f\'(x)\\to-\\infty$: en $(3,\\,0)$ la tangente es vertical; en $(-3,\\,0)$, igual.', 'عندما $x\\to 3^-$ يكون $f\'(x)\\to-\\infty$: المماس رأسي عند $(3,\\,0)$، وكذلك عند $(-3,\\,0)$.', 'As $x\\to 3^-$, $f\'(x)\\to-\\infty$: at $(3,\\,0)$ the tangent is vertical; at $(-3,\\,0)$, the same.'), math: same('$f\'(x)=\\frac{-x}{\\sqrt{9-x^2}}$') },
            { text: say('Bikoitia da, gorakorra $x=0$ arte eta beherakorra gero: maximoa $(0,\\,3)$ puntuan. Zirkunferentzia erdi bat da.', 'Es par, crece hasta $x=0$ y decrece después: máximo en $(0,\\,3)$. Es media circunferencia.', 'إنها زوجية، تتزايد حتى $x=0$ ثم تتناقص: قيمة عظمى عند $(0,\\,3)$. إنها نصف دائرة.', 'It is even, increases up to $x=0$ and decreases after it: a maximum at $(0,\\,3)$. It is half a circle.'), math: same('$f(0)=\\sqrt{9}=3$') }
        ],
        takeaway: say('Indize bikoitiko erro batean, izate-eremuak eskatzen du barrukoa negatiboa ez izatea, eta grafikoa ertzetan amaitzen da. Ertz batean $f\'$ deribatuak infinitura jotzen badu, han zuzen ukitzailea bertikala da eta $f$ ez da deribagarria.', 'En una raíz de índice par, el dominio exige que lo de dentro no sea negativo, y la gráfica termina en los bordes. Si $f\'$ se va a infinito en un borde, allí la tangente es vertical y $f$ no es derivable.', 'في جذر ذي دليل زوجي يشترط المجال ألّا يكون ما بالداخل سالبًا، وينتهي الرسم عند الحواف. وإذا ذهبت $f\'$ إلى اللانهاية عند حافة فالمماس هناك رأسي و$f$ غير قابلة للاشتقاق.', 'In a root of even index, the domain requires the inside not to be negative, and the graph ends at the edges. If $f\'$ goes to infinity at an edge, the tangent there is vertical and $f$ is not differentiable.'),
        figure: (language) => <DomainEdgesFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. Exponential and logarithmic ---------- */
    {
        id: 'exp-products',
        stage: 'explog',
        title: say('Esponentzialarekin biderkadurak', 'Productos con la exponencial', 'جداءات مع الدالة الأسية', 'Products with the exponential'),
        goal: say('$x^2e^{-x}$ bezalako funtzioak irudikatzea: esponentzialak irabazten du infinituan eta asintota erabakitzen du.', 'Representar funciones como $x^2e^{-x}$: la exponencial gana en el infinito y decide la asíntota.', 'رسم دوال مثل $x^2e^{-x}$: تغلب الدالة الأسية في اللانهاية وتحدد المقارب.', 'Sketch functions like $x^2e^{-x}$: the exponential wins at infinity and decides the asymptote.'),
        needs: [
            EXP_LOG1,
            { unit: APPLICATIONS2, topic: 'hopital-products', title: { eu: 'Zero bider infinitu eta infinitu ken infinitu', es: 'Cero por infinito e infinito menos infinito', en: 'Zero times infinity and infinity minus infinity', ar: 'صفر في لانهاية ولانهاية ناقص لانهاية' } }
        ],
        problem: say('Irudikatu $f(x)=x^2e^{-x}$.', 'Representa $f(x)=x^2e^{-x}$.', 'ارسم $f(x)=x^2e^{-x}$.', 'Sketch $f(x)=x^2e^{-x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eskuinetik $\\infty\\cdot 0$ da, eta esponentzialak irabazten du: $y=0$ asintota. Ezkerretik, $f\\to+\\infty$.', 'Por la derecha es $\\infty\\cdot 0$ y la exponencial gana: asíntota $y=0$. Por la izquierda, $f\\to+\\infty$.', 'من اليمين هي $\\infty\\cdot 0$ وتغلب الدالة الأسية: المقارب $y=0$. ومن اليسار $f\\to+\\infty$.', 'On the right it is $\\infty\\cdot 0$ and the exponential wins: asymptote $y=0$. On the left, $f\\to+\\infty$.'), math: same('$\\lim_{x\\to+\\infty}\\frac{x^2}{e^x}=0$') },
            { text: say('Muturrak.', 'Extremos.', 'القيم القصوى.', 'Extrema.'), math: same('$f\'(x)=e^{-x}(2x-x^2)=0\\ \\to\\ x=0,\\ x=2$') },
            { text: say('Minimoa $(0,\\,0)$ puntuan eta maximoa $x=2$ puntuan; $f\\ge 0$ beti.', 'Mínimo en $(0,\\,0)$ y máximo en $x=2$; $f\\ge 0$ siempre.', 'قيمة صغرى عند $(0,\\,0)$ وعظمى عند $x=2$؛ و$f\\ge 0$ دائمًا.', 'A minimum at $(0,\\,0)$ and a maximum at $x=2$; $f\\ge 0$ always.'), math: same('$f(2)=\\frac{4}{e^2}\\approx 0{,}54$') }
        ],
        takeaway: say('$x^ne^{-x}$ funtzioan esponentzialak agintzen du: $x\\to+\\infty$ doanean funtzioak 0 baliora jotzen du ($y=0$ asintota), eta $x\\to-\\infty$ doanean infinitura doa. Muturrak $f\'$ deribatutik ateratzen dira, eta $e^{-x}$ faktorea beti da positiboa.', 'En $x^ne^{-x}$ la exponencial manda: cuando $x\\to+\\infty$ la función tiende a 0 (asíntota $y=0$), y cuando $x\\to-\\infty$ se va a infinito. Los extremos salen de $f\'$, que lleva el factor $e^{-x}$, siempre positivo.', 'في $x^ne^{-x}$ تتحكم الدالة الأسية: عندما $x\\to+\\infty$ تؤول الدالة إلى 0 (المقارب $y=0$)، وعندما $x\\to-\\infty$ تذهب إلى اللانهاية. وتخرج القيم القصوى من $f\'$ التي تحمل العامل $e^{-x}$ الموجب دائمًا.', 'In $x^ne^{-x}$ the exponential rules: as $x\\to+\\infty$ the function tends to 0 (asymptote $y=0$), and as $x\\to-\\infty$ it goes to infinity. The extrema come from $f\'$, which carries the factor $e^{-x}$, always positive.'),
        figure: (language) => <ExpProductsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'exp-special',
        stage: 'explog',
        title: say('Kanpaia eta beste esponentzial batzuk', 'La campana y otras exponenciales', 'الجرس ودوال أسية أخرى', 'The bell and other exponentials'),
        goal: say('$e^{-x^2}$ eta $e^{1/x}$ irudikatzea: funtzio baten esponentzialak haren limiteetatik hartzen ditu asintotak.', 'Representar $e^{-x^2}$ y $e^{1/x}$: la exponencial de una función saca sus asíntotas de los límites de esa función.', 'رسم $e^{-x^2}$ و$e^{1/x}$: تأخذ الأسية لدالة مقارباتها من نهايات تلك الدالة.', 'Sketch $e^{-x^2}$ and $e^{1/x}$: the exponential of a function takes its asymptotes from the limits of that function.'),
        needs: [
            EXP_LOG1,
            { unit: APPLICATIONS2, topic: 'curvature-review', title: { eu: 'Kurbadura eta inflexioa: errepasoa', es: 'Curvatura e inflexión: repaso', en: 'Concavity and inflection: review', ar: 'التقعّر والانعطاف: مراجعة' } }
        ],
        problem: say('Irudikatu $f(x)=e^{-x^2}$.', 'Representa $f(x)=e^{-x^2}$.', 'ارسم $f(x)=e^{-x^2}$.', 'Sketch $f(x)=e^{-x^2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bikoitia eta beti positiboa da; $x\\to\\pm\\infty$ doanean, $-x^2\\to-\\infty$.', 'Es par y siempre positiva; cuando $x\\to\\pm\\infty$, $-x^2\\to-\\infty$.', 'إنها زوجية وموجبة دائمًا؛ وعندما $x\\to\\pm\\infty$ يكون $-x^2\\to-\\infty$.', 'It is even and always positive; as $x\\to\\pm\\infty$, $-x^2\\to-\\infty$.'), math: same('$\\lim_{x\\to\\pm\\infty}e^{-x^2}=0\\ \\to\\ y=0$') },
            { text: say('Maximoa.', 'El máximo.', 'القيمة العظمى.', 'The maximum.'), math: same('$f\'(x)=-2x\\,e^{-x^2}=0\\ \\to\\ x=0\\ \\to\\ (0,\\,1)$') },
            { text: say('Inflexioak.', 'Las inflexiones.', 'نقطتا الانعطاف.', 'The inflections.'), math: same('$f\'\'(x)=(4x^2-2)e^{-x^2}=0\\ \\to\\ x=\\pm\\frac{1}{\\sqrt{2}}$') }
        ],
        takeaway: say('$e^{-x^2}$ kanpaia bikoitia eta positiboa da, $(0,\\,1)$ maximoarekin, $y=0$ asintotarekin eta $\\pm\\frac{1}{\\sqrt{2}}$ puntuetako inflexioekin. Oro har, $e^{g(x)}$ positiboa da, eta haren asintotak $g$ funtzioaren limiteetatik ateratzen dira.', 'La campana $e^{-x^2}$ es par, positiva, con máximo $(0,\\,1)$, asíntota $y=0$ e inflexiones en $\\pm\\frac{1}{\\sqrt{2}}$. En general, $e^{g(x)}$ es positiva y sus asíntotas salen de los límites de $g$.', 'الجرس $e^{-x^2}$ زوجي وموجب، بقيمة عظمى $(0,\\,1)$ ومقارب $y=0$ وانعطافين عند $\\pm\\frac{1}{\\sqrt{2}}$. وعمومًا $e^{g(x)}$ موجبة وتخرج مقارباتها من نهايات $g$.', 'The bell $e^{-x^2}$ is even, positive, with maximum $(0,\\,1)$, asymptote $y=0$ and inflections at $\\pm\\frac{1}{\\sqrt{2}}$. In general, $e^{g(x)}$ is positive and its asymptotes come from the limits of $g$.'),
        figure: (language) => <BellFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'log-functions',
        stage: 'explog',
        title: say('Funtzio logaritmikoak', 'Funciones logarítmicas', 'الدوال اللوغاريتمية', 'Logarithmic functions'),
        goal: say('Logaritmoak dituzten funtzioak irudikatzea: izate-eremuak barrukoa positiboa izatea eskatzen du, eta haren ertzean asintota bertikala egon ohi da.', 'Representar funciones con logaritmos: el dominio exige lo de dentro positivo y en su borde suele haber una asíntota vertical.', 'رسم دوال فيها لوغاريتمات: يشترط المجال أن يكون ما بالداخل موجبًا، وعند حافته يكون عادة مقارب رأسي.', 'Sketch functions with logarithms: the domain requires the inside to be positive, and at its edge there is usually a vertical asymptote.'),
        needs: [
            EXP_LOG1,
            { unit: APPLICATIONS2, topic: 'hopital', title: { eu: 'L\'Hôpitalen erregela: zero zati zero eta infinitu zati infinitu', es: 'La regla de L\'Hôpital: cero entre cero e infinito entre infinito', en: 'L\'Hôpital\'s rule: zero over zero and infinity over infinity', ar: 'قاعدة لوبيتال: صفر على صفر ولانهاية على لانهاية' } }
        ],
        problem: say('Irudikatu $f(x)=\\frac{\\ln x}{x}$.', 'Representa $f(x)=\\frac{\\ln x}{x}$.', 'ارسم $f(x)=\\frac{\\ln x}{x}$.', 'Sketch $f(x)=\\frac{\\ln x}{x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izate-eremua $(0,\\,+\\infty)$: $x=0$ asintota bertikala eta, L\'Hôpitalen bidez, $y=0$ horizontala.', 'Dominio $(0,\\,+\\infty)$: asíntota vertical $x=0$ y, por L\'Hôpital, horizontal $y=0$.', 'المجال $(0,\\,+\\infty)$: مقارب رأسي $x=0$ و، بقاعدة لوبيتال، أفقي $y=0$.', 'Domain $(0,\\,+\\infty)$: vertical asymptote $x=0$ and, by L\'Hôpital, horizontal $y=0$.'), math: same('$\\lim_{x\\to 0^+}\\frac{\\ln x}{x}=-\\infty\\qquad\\lim_{x\\to+\\infty}\\frac{\\ln x}{x}=0$') },
            { text: say('Maximoa $\\left(e,\\,\\frac{1}{e}\\right)$ puntuan.', 'Máximo en $\\left(e,\\,\\frac{1}{e}\\right)$.', 'قيمة عظمى عند $\\left(e,\\,\\frac{1}{e}\\right)$.', 'A maximum at $\\left(e,\\,\\frac{1}{e}\\right)$.'), math: same('$f\'(x)=\\frac{1-\\ln x}{x^2}=0\\ \\to\\ x=e$') },
            { text: say('$X$ ardatza $(1,\\,0)$ puntuan ebakitzen du: negatiboa lehenago eta positiboa gero.', 'Corta el eje $X$ en $(1,\\,0)$: negativa antes y positiva después.', 'تقطع المحور $X$ عند $(1,\\,0)$: سالبة قبلها وموجبة بعدها.', 'It cuts the $X$ axis at $(1,\\,0)$: negative before and positive after.') }
        ],
        takeaway: say('$\\ln g(x)$ funtzioan, izate-eremua $g(x)>0$ da. $g\\to 0^+$ doan tokian, logaritmoa $-\\infty$ aldera doa: asintota bertikala. Logaritmoak edozein berretura baino polikiago hazten dira, eta $\\frac{\\ln x}{x^n}\\to 0$.', 'Con $\\ln g(x)$, el dominio es $g(x)>0$. Donde $g\\to 0^+$, el logaritmo se va a $-\\infty$: asíntota vertical. Los logaritmos crecen más despacio que cualquier potencia, así que $\\frac{\\ln x}{x^n}\\to 0$.', 'مع $\\ln g(x)$ يكون المجال $g(x)>0$. وحيث $g\\to 0^+$ يذهب اللوغاريتم إلى $-\\infty$: مقارب رأسي. وتكبر اللوغاريتمات ببطء أكثر من أي قوة، لذا $\\frac{\\ln x}{x^n}\\to 0$.', 'With $\\ln g(x)$, the domain is $g(x)>0$. Where $g\\to 0^+$, the logarithm goes to $-\\infty$: a vertical asymptote. Logarithms grow more slowly than any power, so $\\frac{\\ln x}{x^n}\\to 0$.'),
        figure: (language) => <LogFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Roots, trigonometric and piecewise ---------- */
    {
        id: 'root-functions',
        stage: 'roots',
        title: say('Erroak dituzten funtzioak', 'Funciones con raíces', 'دوال فيها جذور', 'Functions with roots'),
        goal: say('Erroak dituzten funtzioak irudikatzea: izate-eremuak hutsuneak izan ditzake, eta zeiharrak aldatu egiten dira alde batetik bestera.', 'Representar funciones con raíces: el dominio puede tener huecos y las oblicuas cambian de un lado al otro.', 'رسم دوال فيها جذور: قد يكون في المجال فجوات، ويتغير المقارب المائل من جهة إلى أخرى.', 'Sketch functions with roots: the domain can have gaps and the oblique asymptotes change from one side to the other.'),
        needs: [
            { unit: LIMITS1, topic: 'roots', title: { eu: 'Erroak: konjokatuaz biderkatu', es: 'Raíces: multiplicar por el conjugado', en: 'Roots: multiplying by the conjugate', ar: 'الجذور: الضرب في المرافق' } },
            OBLIQUE1
        ],
        problem: say('Irudikatu $f(x)=\\sqrt{x^2-4}$.', 'Representa $f(x)=\\sqrt{x^2-4}$.', 'ارسم $f(x)=\\sqrt{x^2-4}$.', 'Sketch $f(x)=\\sqrt{x^2-4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izate-eremua hutsune batekin: $|x|\\ge 2$. Bikoitia da, eta 0 balio du $x=\\pm 2$ puntuetan.', 'Dominio con un hueco: $|x|\\ge 2$. Es par, y vale 0 en $x=\\pm 2$.', 'مجال فيه فجوة: $|x|\\ge 2$. إنها زوجية وتساوي 0 عند $x=\\pm 2$.', 'A domain with a gap: $|x|\\ge 2$. It is even, and it is 0 at $x=\\pm 2$.'), math: same('$x^2-4\\ge 0\\ \\to\\ |x|\\ge 2$') },
            { text: say('Zeiharrak desberdinak alde bakoitzean: eskuinetik $y=x$; ezkerretik $y=-x$.', 'Oblicuas distintas a cada lado: por la derecha $y=x$; por la izquierda $y=-x$.', 'مقاربان مائلان مختلفان في كل جهة: من اليمين $y=x$ ومن اليسار $y=-x$.', 'Different oblique asymptotes on each side: on the right $y=x$; on the left $y=-x$.'), math: same('$\\lim_{x\\to+\\infty}\\frac{\\sqrt{x^2-4}}{x}=1\\qquad\\lim_{x\\to-\\infty}\\frac{\\sqrt{x^2-4}}{x}=-1$') },
            { text: say('Gorakorra da $x>2$ denean eta beherakorra $x<-2$ denean; $(\\pm 2,\\,0)$ puntuetan zuzen ukitzailea bertikala da.', 'Crece si $x>2$ y decrece si $x<-2$; en $(\\pm 2,\\,0)$ la tangente es vertical.', 'تتزايد إذا كان $x>2$ وتتناقص إذا كان $x<-2$؛ وعند $(\\pm 2,\\,0)$ يكون المماس رأسيًّا.', 'It increases if $x>2$ and decreases if $x<-2$; at $(\\pm 2,\\,0)$ the tangent is vertical.'), math: same('$f\'(x)=\\frac{x}{\\sqrt{x^2-4}}$') }
        ],
        takeaway: say('$\\sqrt{ax^2+\\dots}$ funtzioan, zeiharren malda $\\pm\\sqrt{a}$ da: bat alde bakoitzeko, $\\sqrt{x^2}=|x|$ delako. $n$ lortzeko konjokatua erabiltzen da. Izate-eremuak hutsune bat utz dezake, eta haren ertzetan zuzen ukitzailea bertikala izan ohi da.', 'Con $\\sqrt{ax^2+\\dots}$, las oblicuas tienen pendiente $\\pm\\sqrt{a}$: una por cada lado, porque $\\sqrt{x^2}=|x|$. Para $n$ se usa el conjugado. El dominio puede dejar un hueco, y en sus bordes la tangente suele ser vertical.', 'مع $\\sqrt{ax^2+\\dots}$ يكون ميل المقاربين المائلين $\\pm\\sqrt{a}$: واحد لكل جهة، لأن $\\sqrt{x^2}=|x|$. ونستعمل المرافق لإيجاد $n$. وقد يترك المجال فجوة، ويكون المماس عند حوافها رأسيًّا عادة.', 'With $\\sqrt{ax^2+\\dots}$, the oblique asymptotes have slope $\\pm\\sqrt{a}$: one for each side, because $\\sqrt{x^2}=|x|$. For $n$ the conjugate is used. The domain can leave a gap, and at its edges the tangent is usually vertical.'),
        figure: (language) => <RootFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'trig-functions',
        stage: 'roots',
        title: say('Funtzio trigonometrikoak periodo batean', 'Trigonométricas en un periodo', 'دوال مثلثية في دور واحد', 'Trigonometric functions over one period'),
        goal: say('Funtzio trigonometriko bat irudikatzea periodo bakar batean aztertuz eta kopiatuz.', 'Representar una trigonométrica estudiándola en un solo periodo y copiándola.', 'رسم دالة مثلثية بدراستها في دور واحد ثم نسخها.', 'Sketch a trigonometric function by studying it over a single period and copying it.'),
        needs: [PERIODIC1, MONOTONY2],
        problem: say('Irudikatu $f(x)=\\sin x+\\cos x$ funtzioa $[0,\\,2\\pi]$ tartean.', 'Representa $f(x)=\\sin x+\\cos x$ en $[0,\\,2\\pi]$.', 'ارسم $f(x)=\\sin x+\\cos x$ على $[0,\\,2\\pi]$.', 'Sketch $f(x)=\\sin x+\\cos x$ on $[0,\\,2\\pi]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$2\\pi$ periodoa: nahikoa da periodo bat. Ebaki-puntuak.', 'Periodo $2\\pi$: basta un periodo. Cortes.', 'الدور $2\\pi$: يكفي دور واحد. نقاط التقاطع.', 'Period $2\\pi$: one period is enough. Intercepts.'), math: same('$\\sin x=-\\cos x\\ \\to\\ x=\\frac{3\\pi}{4},\\ x=\\frac{7\\pi}{4}$') },
            { text: say('Muturrak.', 'Extremos.', 'القيم القصوى.', 'Extrema.'), math: same('$\\begin{gathered}f\'(x)=\\cos x-\\sin x=0\\\\ x=\\frac{\\pi}{4},\\ x=\\frac{5\\pi}{4}\\end{gathered}$') },
            { text: say('Balioak: maximoa $\\sqrt{2}$ eta minimoa $-\\sqrt{2}$.', 'Valores: máximo $\\sqrt{2}$ y mínimo $-\\sqrt{2}$.', 'القيم: العظمى $\\sqrt{2}$ والصغرى $-\\sqrt{2}$.', 'Values: maximum $\\sqrt{2}$ and minimum $-\\sqrt{2}$.'), math: same('$f\\left(\\frac{\\pi}{4}\\right)=\\sqrt{2}\\qquad f\\left(\\frac{5\\pi}{4}\\right)=-\\sqrt{2}$') }
        ],
        takeaway: say('Funtzio trigonometriko bat periodo batean aztertzen da: ebaki-puntuak, muturrak eta inflexioak periodoaren barruan, eta gero errepikatu. $\\sin x+\\cos x$ funtzioa $\\sqrt{2}$ anplitudeko uhin bat da, $\\frac{\\pi}{4}$ lekualdatua.', 'Una trigonométrica se estudia en un periodo: cortes, extremos e inflexiones dentro de él, y después se repite. $\\sin x+\\cos x$ es una onda de amplitud $\\sqrt{2}$ desplazada $\\frac{\\pi}{4}$.', 'تُدرس الدالة المثلثية في دور واحد: نقاط التقاطع والقيم القصوى والانعطاف داخله، ثم يتكرر. و$\\sin x+\\cos x$ موجة سعتها $\\sqrt{2}$ مزاحة بمقدار $\\frac{\\pi}{4}$.', 'A trigonometric function is studied over one period: intercepts, extrema and inflections inside it, and then it repeats. $\\sin x+\\cos x$ is a wave of amplitude $\\sqrt{2}$ shifted by $\\frac{\\pi}{4}$.'),
        figure: (language) => <TrigFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'piecewise-graphs',
        stage: 'roots',
        title: say('Zatika definitutako funtzioen grafikoa', 'Representar funciones a trozos', 'تمثيل الدوال المعرّفة على أجزاء', 'Sketching piecewise functions'),
        goal: say('Zatika definitutako funtzio bat irudikatzea, zati bakoitza bere tartean eta lotunea aztertuz.', 'Representar una función a trozos estudiando cada trozo en su intervalo y la unión.', 'رسم دالة معرّفة على أجزاء بدراسة كل جزء على فترته ودراسة نقطة الالتقاء.', 'Sketch a piecewise function by studying each piece on its interval and the joint.'),
        needs: [
            { unit: FUNCTIONS1, topic: 'piecewise', title: { eu: 'Zatika definitutako funtzioak marraztea', es: 'Dibujar funciones a trozos', en: 'Drawing piecewise functions', ar: 'رسم الدوال المعرّفة على أجزاء' } },
            { unit: DERIVATIVES2, topic: 'corners', title: { eu: 'Deribagarria bada, jarraitua da', es: 'Derivable implica continua', en: 'Differentiable implies continuous', ar: 'قابلية الاشتقاق تقتضي الاتصال' } }
        ],
        problem: say('Irudikatu $f(x)=\\begin{cases}x^2+2x & x<0\\\\ \\ln(x+1) & x\\ge 0\\end{cases}$.', 'Representa $f(x)=\\begin{cases}x^2+2x & x<0\\\\ \\ln(x+1) & x\\ge 0\\end{cases}$.', 'ارسم $f(x)=\\begin{cases}x^2+2x & x<0\\\\ \\ln(x+1) & x\\ge 0\\end{cases}$.', 'Sketch $f(x)=\\begin{cases}x^2+2x & x<0\\\\ \\ln(x+1) & x\\ge 0\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lotunea $x=0$ puntuan: jarraitua da, baina maldak 2 eta 1 dira, punta bat.', 'La unión en $x=0$: es continua, pero las pendientes son 2 y 1, un pico.', 'الالتقاء عند $x=0$: متصلة، لكن الميلين 2 و1، زاوية.', 'The joint at $x=0$: it is continuous, but the slopes are 2 and 1, a corner.'), math: same('$\\begin{gathered}f(0^-)=0\\qquad f(0^+)=\\ln 1=0\\\\ f\'(0^-)=2\\qquad f\'(0^+)=1\\end{gathered}$') },
            { text: say('Ezkerreko zatia: minimoa $(-1,\\,-1)$ puntuan duen parabola; $x\\to-\\infty$ doanean, $f\\to+\\infty$.', 'Trozo izquierdo: parábola con mínimo en $(-1,\\,-1)$; si $x\\to-\\infty$, $f\\to+\\infty$.', 'الجزء الأيسر: قطع مكافئ بقيمة صغرى عند $(-1,\\,-1)$؛ وإذا $x\\to-\\infty$ فإن $f\\to+\\infty$.', 'Left piece: a parabola with a minimum at $(-1,\\,-1)$; if $x\\to-\\infty$, $f\\to+\\infty$.'), math: same('$2x+2=0\\ \\to\\ x=-1$') },
            { text: say('Eskuineko zatia: beti gorakorra, asintota horizontalik gabe ($\\ln$ mugarik gabe hazten da).', 'Trozo derecho: crece siempre, sin asíntota horizontal ($\\ln$ crece sin fin).', 'الجزء الأيمن: يتزايد دائمًا دون مقارب أفقي ($\\ln$ يكبر بلا حد).', 'Right piece: it always increases, with no horizontal asymptote ($\\ln$ grows without end).') }
        ],
        takeaway: say('Zatika definitutako funtzio batean, zati bakoitza bere tartean bakarrik irudikatzen da, bere gidoiarekin. Lotuneetan jarraitutasuna (altuerak) eta deribagarritasuna (maldak) begiratzen dira: jauzi bat, punta bat edo lotune leun bat.', 'En una función a trozos, cada trozo se representa solo en su intervalo, con su propio guion. En las uniones se miran la continuidad (alturas) y la derivabilidad (pendientes): un salto, un pico o una unión suave.', 'في الدالة المعرّفة على أجزاء، يُرسم كل جزء على فترته فقط بخطته الخاصة. وعند نقاط الالتقاء ننظر إلى الاتصال (الارتفاعات) والاشتقاق (الميول): قفزة أو زاوية أو التقاء أملس.', 'In a piecewise function, each piece is sketched only on its interval, with its own plan. At the joints, look at continuity (heights) and differentiability (slopes): a jump, a corner or a smooth join.'),
        figure: (language) => <PiecewiseFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Absolute values and graphs the other way round ---------- */
    {
        id: 'absolute-graphs',
        stage: 'reading',
        title: say('Balio absolutua: |f(x)| eta f(|x|)', 'Valor absoluto: |f(x)| y f(|x|)', 'القيمة المطلقة: |f(x)| و f(|x|)', 'Absolute value: |f(x)| and f(|x|)'),
        goal: say('$|f(x)|$ eta $f(|x|)$ bereiztea: lehenengoak negatiboa gora islatzen du; bigarrenak eskuineko zatia kopiatzen du.', 'Distinguir $|f(x)|$, que refleja hacia arriba lo negativo, de $f(|x|)$, que copia la parte de la derecha.', 'التمييز بين $|f(x)|$ التي تعكس السالب إلى الأعلى، و$f(|x|)$ التي تنسخ الجزء الأيمن.', 'Tell $|f(x)|$, which reflects the negative part upwards, from $f(|x|)$, which copies the right-hand part.'),
        needs: [
            { unit: FUNCTIONS1, topic: 'absolute', title: { eu: 'Funtzio baten balio absolutua', es: 'Valor absoluto de una función', en: 'Absolute value of a function', ar: 'القيمة المطلقة لدالة' } },
            { unit: DERIVATIVES2, topic: 'absolute', title: { eu: 'Balio absolutua eta zatiak', es: 'Valor absoluto y trozos', en: 'Absolute value and pieces', ar: 'القيمة المطلقة والأجزاء' } }
        ],
        problem: say('Marraztu $|f(x)|$ eta $f(|x|)$, $f(x)=x^2-2x-3$ izanik.', 'Dibuja $|f(x)|$ y $f(|x|)$ para $f(x)=x^2-2x-3$.', 'ارسم $|f(x)|$ و$f(|x|)$ للدالة $f(x)=x^2-2x-3$.', 'Draw $|f(x)|$ and $f(|x|)$ for $f(x)=x^2-2x-3$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f$ funtzioaren zeroak eta erpina.', 'Ceros y vértice de $f$.', 'أصفار $f$ ورأسها.', 'The zeros and the vertex of $f$.'), math: same('$\\begin{gathered}x^2-2x-3=0\\ \\to\\ x=-1,\\ x=3\\\\ V(1,\\,-4)\\end{gathered}$') },
            { text: say('$|f(x)|$: $-1$ eta $3$ artean ardatzaren azpian dagoena gora islatzen da; puntak agertzen dira $x=-1$ eta $x=3$ puntuetan.', '$|f(x)|$: lo que está bajo el eje entre $-1$ y $3$ se refleja hacia arriba; aparecen picos en $x=-1$ y $x=3$.', '$|f(x)|$: ما تحت المحور بين $-1$ و$3$ ينعكس إلى الأعلى؛ وتظهر زاويتان عند $x=-1$ و$x=3$.', '$|f(x)|$: what is below the axis between $-1$ and $3$ is reflected upwards; corners appear at $x=-1$ and $x=3$.'), math: same('$|f(1)|=4$') },
            { text: say('$f(|x|)$: $x\\ge 0$ duen zatia ezkerrera kopiatzen da; bikoitia da, punta bat du $x=0$ puntuan eta minimoak $(\\pm 1,\\,-4)$ puntuetan.', '$f(|x|)$: la parte con $x\\ge 0$ se copia a la izquierda; es par, con un pico en $x=0$ y mínimos en $(\\pm 1,\\,-4)$.', '$f(|x|)$: يُنسخ الجزء الذي فيه $x\\ge 0$ إلى اليسار؛ إنها زوجية، بزاوية عند $x=0$ وقيمتين صغريين عند $(\\pm 1,\\,-4)$.', '$f(|x|)$: the part with $x\\ge 0$ is copied to the left; it is even, with a corner at $x=0$ and minima at $(\\pm 1,\\,-4)$.'), math: same('$f(|x|)=x^2-2|x|-3$') }
        ],
        takeaway: say('$|f(x)|$ funtzioak $X$ ardatzaren gainean dagoena bere horretan uzten du eta azpikoa islatzen du: puntak agertzen dira $f$ funtzioak zeinua aldatzen duen zeroetan. $f(|x|)$ bikoitia da: $f$ marrazten da $x\\ge 0$ denean, eta $Y$ ardatzean islatzen da.', '$|f(x)|$ deja igual lo que está encima del eje $X$ y refleja lo de debajo: aparecen picos en los ceros donde $f$ cambia de signo. $f(|x|)$ es par: se dibuja $f$ para $x\\ge 0$ y se refleja en el eje $Y$.', 'تترك $|f(x)|$ ما فوق المحور $X$ كما هو وتعكس ما تحته: تظهر زوايا عند الأصفار التي تغيّر فيها $f$ إشارتها. و$f(|x|)$ زوجية: نرسم $f$ من أجل $x\\ge 0$ ونعكسها في المحور $Y$.', '$|f(x)|$ leaves what is above the $X$ axis as it is and reflects what is below: corners appear at the zeros where $f$ changes sign. $f(|x|)$ is even: draw $f$ for $x\\ge 0$ and reflect it in the $Y$ axis.'),
        figure: (language) => <AbsoluteGraphsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'derivative-graph',
        stage: 'reading',
        title: say('f′ grafikotik f grafikora', 'De la gráfica de f′ a la de f', 'من رسم f′ إلى رسم f', 'From the graph of f′ to that of f'),
        goal: say('$f\'$ deribatuaren grafikoan irakurtzea non den $f$ gorakorra, non dituen muturrak eta non inflexioak.', 'Leer en la gráfica de $f\'$ dónde crece $f$, dónde tiene extremos y dónde inflexiones.', 'قراءة رسم $f\'$ لمعرفة أين تتزايد $f$ وأين قيمها القصوى وأين انعطافها.', 'Read on the graph of $f\'$ where $f$ increases, where it has extrema and where inflections.'),
        needs: [
            { unit: APPLICATIONS1, topic: 'sign-monotony', title: { eu: 'Deribatuaren zeinua eta hazkundea', es: 'Signo de la derivada y crecimiento', en: 'The sign of the derivative and growth', ar: 'إشارة المشتقة والتزايد' } },
            MONOTONY2
        ],
        problem: say('$f\'$ deribatuaren grafikoa $y=x^2-1$ parabola da. Nolakoa da $f$?', 'La gráfica de $f\'$ es la parábola $y=x^2-1$. ¿Cómo es $f$?', 'رسم $f\'$ هو القطع المكافئ $y=x^2-1$. كيف تكون $f$؟', 'The graph of $f\'$ is the parabola $y=x^2-1$. What is $f$ like?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f\'$ deribatuaren zeinua: positiboa $[-1,\\,1]$ tartetik kanpo eta negatiboa barruan.', 'Signo de $f\'$: positiva fuera de $[-1,\\,1]$ y negativa dentro.', 'إشارة $f\'$: موجبة خارج $[-1,\\,1]$ وسالبة داخلها.', 'Sign of $f\'$: positive outside $[-1,\\,1]$ and negative inside.'), math: same('$x^2-1=0\\ \\to\\ x=\\pm 1$') },
            { text: say('$f$ funtzioaren muturrak $f\'$ deribatuak zeinua aldatzen duen tokian: $x=-1$ puntuan, $+$ zeinutik $-$ zeinura, maximoa; $x=1$ puntuan, $-$ zeinutik $+$ zeinura, minimoa.', 'Extremos de $f$ donde $f\'$ cambia de signo: en $x=-1$, de $+$ a $-$, máximo; en $x=1$, de $-$ a $+$, mínimo.', 'القيم القصوى لـ $f$ حيث تغيّر $f\'$ إشارتها: عند $x=-1$ من $+$ إلى $-$ قيمة عظمى، وعند $x=1$ من $-$ إلى $+$ قيمة صغرى.', 'Extrema of $f$ where $f\'$ changes sign: at $x=-1$, from $+$ to $-$, a maximum; at $x=1$, from $-$ to $+$, a minimum.') },
            { text: say('$f$ funtzioaren inflexioa $f\'$ deribatuak muturra duen tokian: parabolaren erpina, $x=0$.', 'Inflexión de $f$ donde $f\'$ tiene su extremo: el vértice de la parábola, $x=0$.', 'انعطاف $f$ حيث تبلغ $f\'$ قيمتها القصوى: رأس القطع المكافئ $x=0$.', 'The inflection of $f$ where $f\'$ has its extremum: the vertex of the parabola, $x=0$.'), math: same('$f\'\'(x)=2x=0\\ \\to\\ x=0$') }
        ],
        takeaway: say('$f\'$ grafikoan: ardatzaren gainean dagoen tokian, $f$ gorakorra da; azpian dagoen tokian, beherakorra. Ardatza zeinua aldatuz ebakitzen duen tokian, $f$ funtzioak mutur bat du. $f\'$ deribatuak maximo edo minimo bat duen tokian, $f$ funtzioak inflexio bat du.', 'En la gráfica de $f\'$: donde está encima del eje, $f$ crece; donde está debajo, decrece. Donde corta el eje cambiando de signo, $f$ tiene un extremo. Donde $f\'$ tiene un máximo o un mínimo, $f$ tiene una inflexión.', 'في رسم $f\'$: حيث يكون فوق المحور تتزايد $f$، وحيث يكون تحته تتناقص. وحيث يقطع المحور مغيّرًا إشارته تكون لـ $f$ قيمة قصوى. وحيث تبلغ $f\'$ قيمة عظمى أو صغرى يكون لـ $f$ انعطاف.', 'On the graph of $f\'$: where it is above the axis, $f$ increases; where it is below, it decreases. Where it crosses the axis changing sign, $f$ has an extremum. Where $f\'$ has a maximum or a minimum, $f$ has an inflection.'),
        figure: (language) => <DerivativeGraphFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'curve-from-data',
        stage: 'reading',
        title: say('Datuetatik kurbara', 'Una curva a partir de datos', 'منحنى انطلاقًا من معطيات', 'A curve from data'),
        goal: say('Datu-zerrenda bat (limiteak, balioak eta zeinuak) betetzen duen kurba bat marraztea, liburuen hasieran bezala.', 'Dibujar una curva que cumpla una lista de datos (límites, valores y signos), como al principio de los libros.', 'رسم منحنى يحقق قائمة معطيات (نهايات وقيم وإشارات)، كما في بداية الكتب.', 'Draw a curve that meets a list of data (limits, values and signs), as at the start of the textbooks.'),
        needs: [VERTICAL1, MONOTONY2],
        problem: say('Marraztu funtzio bat datu hauekin: $\\lim_{x\\to 2^-}f(x)=-\\infty$, $\\lim_{x\\to 2^+}f(x)=+\\infty$, $\\lim_{x\\to\\pm\\infty}f(x)=1$, $f(0)=0$ eta $f\'(x)<0$ izate-eremu osoan.', 'Dibuja una función con: $\\lim_{x\\to 2^-}f(x)=-\\infty$, $\\lim_{x\\to 2^+}f(x)=+\\infty$, $\\lim_{x\\to\\pm\\infty}f(x)=1$, $f(0)=0$ y $f\'(x)<0$ en todo su dominio.', 'ارسم دالة تحقق: $\\lim_{x\\to 2^-}f(x)=-\\infty$ و$\\lim_{x\\to 2^+}f(x)=+\\infty$ و$\\lim_{x\\to\\pm\\infty}f(x)=1$ و$f(0)=0$ و$f\'(x)<0$ في كل مجالها.', 'Draw a function with: $\\lim_{x\\to 2^-}f(x)=-\\infty$, $\\lim_{x\\to 2^+}f(x)=+\\infty$, $\\lim_{x\\to\\pm\\infty}f(x)=1$, $f(0)=0$ and $f\'(x)<0$ on its whole domain.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Asintotak: bertikala $x=2$ eta horizontala $y=1$.', 'Asíntotas: vertical $x=2$ y horizontal $y=1$.', 'المقاربان: رأسي $x=2$ وأفقي $y=1$.', 'Asymptotes: vertical $x=2$ and horizontal $y=1$.') },
            { text: say('Ezkerreko adarra: $y=1$ zuzenetik jaisten da, $(0,\\,0)$ puntutik igarotzen da eta $-\\infty$ aldera jaisten da $x=2$ zuzenaren ondoan.', 'Rama izquierda: decrece desde $y=1$, pasa por $(0,\\,0)$ y baja a $-\\infty$ junto a $x=2$.', 'الفرع الأيسر: يتناقص من $y=1$ ويمر بالنقطة $(0,\\,0)$ وينزل إلى $-\\infty$ قرب $x=2$.', 'Left branch: it decreases from $y=1$, passes through $(0,\\,0)$ and falls to $-\\infty$ next to $x=2$.') },
            { text: say('Eskuineko adarra: $+\\infty$ aldetik jaisten da $y=1$ zuzenera. Horrelako funtzio bat da hau:', 'Rama derecha: baja desde $+\\infty$ hacia $y=1$. Una función así es:', 'الفرع الأيمن: ينزل من $+\\infty$ نحو $y=1$. ودالة كهذه هي:', 'Right branch: it comes down from $+\\infty$ towards $y=1$. Such a function is:'), math: same('$f(x)=\\frac{x}{x-2}$') }
        ],
        takeaway: say('Datu bakoitza marka bat da: limiteek asintotak eta kurba zein aldetik doan ematen dute, balioek puntuak, eta $f\'$ deribatuaren zeinuak geziak. Lehenik asintotak eta puntuak marrazten dira, eta gero guztia betetzen duten adarrak.', 'Cada dato es una marca: los límites dan las asíntotas y por qué lado se va la curva, los valores dan puntos y el signo de $f\'$, las flechas. Se dibujan primero las asíntotas y los puntos, y luego ramas que cumplan todo.', 'كل معطى علامة: تعطي النهايات المقاربات والجهة التي يذهب منها المنحنى، وتعطي القيم النقاط، وتعطي إشارة $f\'$ الأسهم. نرسم أولًا المقاربات والنقاط، ثم فروعًا تحقق كل شيء.', 'Each fact is a mark: limits give the asymptotes and the side the curve goes, values give points and the sign of $f\'$, the arrows. Draw the asymptotes and the points first, and then branches that meet everything.'),
        figure: (language) => <DataCurveFigure language={language} />,
        figureAfterSteps: true
    }
]

export const bach2SketchTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...localizeNames({ ...bach2SketchLessonTexts[topic.id as Bach2SketchTopicId], ...bach2SketchLessonChecks[topic.id as Bach2SketchTopicId] }) }))
