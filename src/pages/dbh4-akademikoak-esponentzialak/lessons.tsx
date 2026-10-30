import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { ExponentialFigure, GrowthFigure } from '../dbh4-aplikatuak-grafikoa/figures'
import { LogDefinitionFigure, PowerRulesFigure } from '../dbh4-akademikoak-potentziak/figures'
import { UnitCircleFigure } from '../dbh4-akademikoak-trigonometria/figures'
import { same, say } from '../dbh4-akademikoak-trigonometria/text'
import {
    AmplitudeFigure,
    CosineFigure,
    DecayFigure,
    ExpEquationFigure,
    ExpShiftFigure,
    LogGraphFigure,
    LogShiftFigure,
    PeriodFigure,
    SineFigure,
    TangentFigure
} from './figures'

/* ==========================================================================
   Funtzio esponentzialak, logaritmikoak eta trigonometrikoak · 4. DBH
   akademikoak — stages and lessons, following Santillana 4.º Académicas
   unit 11 (exponential functions and their translations, logarithmic
   functions as their inverses, the trigonometric functions sine, cosine
   and tangent, with amplitude and period) and the exponential and
   logarithmic part of Anaya 4.º Académicas unit 5 (tables of aˣ, growth
   and decay, y = log_a x next to y = aˣ). Inside formulas write \sen and
   \tg: each language gets its own names (sen / sin, tg / tan).
   ========================================================================== */

export type ExponentialAkStageId = 'exponential' | 'growth' | 'logarithmic' | 'trigonometric' | 'transforms'

export const exponentialAkStages: UnitStage[] = [
    { id: 'exponential', tone: 'blue', title: { eu: 'Funtzio esponentziala', es: 'Función exponencial', en: 'Exponential function', ar: 'الدالة الأسية' } },
    { id: 'growth', tone: 'violet', title: { eu: 'Hazkundea eta ekuazioak', es: 'Crecimiento y ecuaciones', en: 'Growth and equations', ar: 'النمو والمعادلات' } },
    { id: 'logarithmic', tone: 'mustard', title: { eu: 'Funtzio logaritmikoa', es: 'Función logarítmica', en: 'Logarithmic function', ar: 'الدالة اللوغاريتمية' } },
    { id: 'trigonometric', tone: 'coral', title: { eu: 'Sinua eta kosinua', es: 'Seno y coseno', en: 'Sine and cosine', ar: 'الجيب وجيب التمام' } },
    { id: 'transforms', tone: 'green', title: { eu: 'Anplitudea eta periodoa', es: 'Amplitud y periodo', en: 'Amplitude and period', ar: 'السعة والدور' } }
]

export const exponentialAkTopics: UnitTopic[] = [
    /* ---------- 1. The exponential function ---------- */
    {
        id: 'exp-graph',
        stage: 'exponential',
        title: say('$y=a^{x}$ funtzioa', 'La función $y=a^{x}$', 'الدالة $y=a^{x}$', 'The function $y=a^{x}$'),
        goal: say('$y=a^{x}$ funtzioaren propietateak ezagutzea eta $a$-ren arabera gorakorra ala beherakorra den esatea.', 'Conocer las propiedades de $y=a^{x}$ y decir si es creciente o decreciente según $a$.', 'التعرف إلى خصائص $y=a^{x}$ وتحديد تزايدها أو تناقصها بحسب $a$.', 'Know the properties of $y=a^{x}$ and say whether it is increasing or decreasing depending on $a$.'),
        explanation: say(
            'Funtzio esponentzialak $y=a^{x}$ forma du, $a>0$ eta $a\\ne 1$ izanik; aldagaia berretzailean dago. Edozein $x$-rentzat dago definituta (Dom $f=\\mathbb{R}$), eta beti positiboa da: Rec $f=(0,\\,+\\infty)$. Beti $(0,\\,1)$ puntutik pasatzen da, $a^{0}=1$ delako, eta $(1,\\,a)$ puntutik ere bai. $a>1$ bada, gorakorra da: $y=2^{x}$ funtzioan $2^{-2}=\\frac{1}{4}$, $2^{0}=1$, $2^{3}=8$; ezkerrera X ardatzera hurbiltzen da, eta $y=0$ asintota horizontala da. $0<a<1$ bada, beherakorra da: $y=\\left(\\frac{1}{2}\\right)^{x}$ funtzioa $y=2^{x}$ funtzioaren ispilua da Y ardatzean, $\\left(\\frac{1}{2}\\right)^{x}=2^{-x}$ delako. $a$ zenbat eta urrunago egon 1etik, orduan eta azkarrago hazten edo txikitzen da.',
            'La función exponencial tiene la forma $y=a^{x}$, con $a>0$ y $a\\ne 1$; la variable está en el exponente. Está definida para cualquier $x$ (Dom $f=\\mathbb{R}$) y siempre es positiva: Rec $f=(0,\\,+\\infty)$. Pasa siempre por $(0,\\,1)$, porque $a^{0}=1$, y también por $(1,\\,a)$. Si $a>1$ es creciente: en $y=2^{x}$, $2^{-2}=\\frac{1}{4}$, $2^{0}=1$, $2^{3}=8$; hacia la izquierda se acerca al eje X, y $y=0$ es una asíntota horizontal. Si $0<a<1$ es decreciente: $y=\\left(\\frac{1}{2}\\right)^{x}$ es el reflejo de $y=2^{x}$ en el eje Y, porque $\\left(\\frac{1}{2}\\right)^{x}=2^{-x}$. Cuanto más lejos de 1 está $a$, más deprisa crece o decrece.',
            'للدالة الأسية الصورة $y=a^{x}$ حيث $a>0$ و$a\\ne 1$؛ المتغير في الأس. وهي معرّفة لكل $x$ (Dom $f=\\mathbb{R}$) وموجبة دائمًا: Rec $f=(0,\\,+\\infty)$. تمر دائمًا بالنقطة $(0,\\,1)$ لأن $a^{0}=1$، وبالنقطة $(1,\\,a)$ أيضًا. إذا كان $a>1$ فهي متزايدة: في $y=2^{x}$ لدينا $2^{-2}=\\frac{1}{4}$ و$2^{0}=1$ و$2^{3}=8$؛ وإلى اليسار تقترب من محور X، و$y=0$ مقارب أفقي. وإذا كان $0<a<1$ فهي متناقصة: $y=\\left(\\frac{1}{2}\\right)^{x}$ انعكاس $y=2^{x}$ في محور Y لأن $\\left(\\frac{1}{2}\\right)^{x}=2^{-x}$. كلما ابتعد $a$ عن 1 كان النمو أو التناقص أسرع.', 'The exponential function has the form $y=a^{x}$, with $a>0$ and $a\\ne 1$; the variable is in the exponent. It is defined for any $x$ (Domain $f=\\mathbb{R}$) and is always positive: Range $f=(0,\\,+\\infty)$. It always passes through $(0,\\,1)$, because $a^{0}=1$, and also through $(1,\\,a)$. If $a>1$ it is increasing: for $y=2^{x}$, $2^{-2}=\\frac{1}{4}$, $2^{0}=1$, $2^{3}=8$; to the left it gets closer to the x-axis, and $y=0$ is a horizontal asymptote. If $0<a<1$ it is decreasing: $y=\\left(\\frac{1}{2}\\right)^{x}$ is the reflection of $y=2^{x}$ in the y-axis, because $\\left(\\frac{1}{2}\\right)^{x}=2^{-x}$. The further $a$ is from 1, the faster it grows or decays.'
        ),
        problem: say('$f(x)=3^{x}$ izanik, kalkulatu $f(2)$ eta $f(-2)$. Gorakorra da?', 'Siendo $f(x)=3^{x}$, calcula $f(2)$ y $f(-2)$. ¿Es creciente?', 'إذا كان $f(x)=3^{x}$ فاحسب $f(2)$ و$f(-2)$. هل هي متزايدة؟', 'Given $f(x)=3^{x}$, work out $f(2)$ and $f(-2)$. Is it increasing?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berretzaile positiboa.', 'Exponente positivo.', 'أس موجب.', 'Positive exponent.'), math: same('$3^{2}=9$') },
            { text: say('Berretzaile negatiboa: alderantzizkoa.', 'Exponente negativo: el inverso.', 'أس سالب: المقلوب.', 'Negative exponent: the reciprocal.'), math: same('$3^{-2}=\\frac{1}{9}$') },
            { text: say('$3>1$: gorakorra.', '$3>1$: creciente.', '$3>1$: متزايدة.', '$3>1$: increasing.'), math: same('$\\frac{1}{9}<9$') }
        ],
        example: same('$a^{0}=1$'),
        takeaway: say('y = aˣ: beti (0, 1) puntutik, beti positiboa. a > 1 gorakorra; 0 < a < 1 beherakorra.', 'y = aˣ: siempre por (0, 1), siempre positiva. a > 1 creciente; 0 < a < 1 decreciente.', 'y = aˣ: دائمًا عبر (0, 1) وموجبة دائمًا. a > 1 متزايدة؛ 0 < a < 1 متناقصة.', 'y = aˣ: always through (0, 1), always positive. a > 1 increasing; 0 < a < 1 decreasing.'),
        figure: (language) => <ExponentialFigure language={language} />
    },
    {
        id: 'exp-values',
        stage: 'exponential',
        title: say('Balioak eta forma baliokideak', 'Valores y formas equivalentes', 'القيم والصور المتكافئة', 'Values and equivalent forms'),
        goal: say('Funtzio esponentzialen balioak kalkulatzea eta berreturen propietateekin idazkera baliokideak aurkitzea.', 'Calcular valores de funciones exponenciales y encontrar escrituras equivalentes con las propiedades de las potencias.', 'حساب قيم الدوال الأسية وإيجاد كتابات متكافئة بخواص القوى.', 'Calculate values of exponential functions and find equivalent ways of writing them, using the rules of powers.'),
        explanation: say(
            'Funtzio esponentzialen balioak berreturen arauekin kalkulatzen dira: $a^{-n}=\\frac{1}{a^{n}}$ eta $a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$. Adibidez, $y=4^{x}$ funtzioan $f\\left(\\frac{1}{2}\\right)=\\sqrt{4}=2$ eta $f\\left(\\frac{3}{2}\\right)=\\sqrt{4^{3}}=8$. Arau berberek funtzio bera beste era batean idazten uzten dute: $\\left(\\frac{3}{5}\\right)^{x}=\\left(\\frac{5}{3}\\right)^{-x}$, $2^{x+3}=8\\cdot 2^{x}$ eta $4^{x}=(2^{2})^{x}=2^{2x}$. Era horretan ikusten da funtzio bat gorakorra den: $\\left(\\frac{1}{3}\\right)^{-x}=3^{x}$ gorakorra da. Kalkulagailuarekin, $2^{0{,}4x}=(2^{0{,}4})^{x}\\approx 1{,}32^{x}$.',
            'Los valores de las funciones exponenciales se calculan con las reglas de las potencias: $a^{-n}=\\frac{1}{a^{n}}$ y $a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$. Por ejemplo, en $y=4^{x}$, $f\\left(\\frac{1}{2}\\right)=\\sqrt{4}=2$ y $f\\left(\\frac{3}{2}\\right)=\\sqrt{4^{3}}=8$. Las mismas reglas permiten escribir la misma función de otra forma: $\\left(\\frac{3}{5}\\right)^{x}=\\left(\\frac{5}{3}\\right)^{-x}$, $2^{x+3}=8\\cdot 2^{x}$ y $4^{x}=(2^{2})^{x}=2^{2x}$. Así se ve si una función es creciente: $\\left(\\frac{1}{3}\\right)^{-x}=3^{x}$ es creciente. Con la calculadora, $2^{0{,}4x}=(2^{0{,}4})^{x}\\approx 1{,}32^{x}$.',
            'تُحسب قيم الدوال الأسية بقواعد القوى: $a^{-n}=\\frac{1}{a^{n}}$ و$a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$. مثلًا في $y=4^{x}$ يكون $f\\left(\\frac{1}{2}\\right)=\\sqrt{4}=2$ و$f\\left(\\frac{3}{2}\\right)=\\sqrt{4^{3}}=8$. وتسمح القواعد نفسها بكتابة الدالة نفسها بصورة أخرى: $\\left(\\frac{3}{5}\\right)^{x}=\\left(\\frac{5}{3}\\right)^{-x}$ و$2^{x+3}=8\\cdot 2^{x}$ و$4^{x}=(2^{2})^{x}=2^{2x}$. وهكذا نرى إن كانت الدالة متزايدة: $\\left(\\frac{1}{3}\\right)^{-x}=3^{x}$ متزايدة. وبالآلة الحاسبة $2^{0{,}4x}=(2^{0{,}4})^{x}\\approx 1{,}32^{x}$.', 'The values of exponential functions are worked out with the rules of powers: $a^{-n}=\\frac{1}{a^{n}}$ and $a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$. For example, in $y=4^{x}$, $f\\left(\\frac{1}{2}\\right)=\\sqrt{4}=2$ and $f\\left(\\frac{3}{2}\\right)=\\sqrt{4^{3}}=8$. The same rules let you write the same function in another way: $\\left(\\frac{3}{5}\\right)^{x}=\\left(\\frac{5}{3}\\right)^{-x}$, $2^{x+3}=8\\cdot 2^{x}$ and $4^{x}=(2^{2})^{x}=2^{2x}$. This also shows whether a function is increasing: $\\left(\\frac{1}{3}\\right)^{-x}=3^{x}$ is increasing. With a calculator, $2^{0{,}4x}=(2^{0{,}4})^{x}\\approx 1{,}32^{x}$.'
        ),
        problem: say('$f(x)=8^{x}$ izanik, kalkulatu $f\\left(\\frac{2}{3}\\right)$ eta $f(-1)$.', 'Siendo $f(x)=8^{x}$, calcula $f\\left(\\frac{2}{3}\\right)$ y $f(-1)$.', 'إذا كان $f(x)=8^{x}$ فاحسب $f\\left(\\frac{2}{3}\\right)$ و$f(-1)$.', 'Given $f(x)=8^{x}$, work out $f\\left(\\frac{2}{3}\\right)$ and $f(-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatikizko berretzailea: erroa.', 'Exponente fraccionario: raíz.', 'أس كسري: جذر.', 'Fractional exponent: root.'), math: same('$8^{\\frac{2}{3}}=\\sqrt[3]{64}=4$') },
            { text: say('Berretzaile negatiboa.', 'Exponente negativo.', 'أس سالب.', 'Negative exponent.'), math: same('$8^{-1}=\\frac{1}{8}$') }
        ],
        example: same('$4^{x}=2^{2x}$'),
        takeaway: say('Berreturen arauak: a⁻ⁿ = 1/aⁿ eta oinarri bera lortzeko faktorizatu.', 'Reglas de las potencias: a⁻ⁿ = 1/aⁿ, y factoriza para tener la misma base.', 'قواعد القوى: a⁻ⁿ = 1/aⁿ، وحلّل للحصول على الأساس نفسه.', 'Rules of powers: a⁻ⁿ = 1/aⁿ, and rewrite with the same base.'),
        figure: (language) => <PowerRulesFigure language={language} />
    },
    {
        id: 'exp-shifts',
        stage: 'exponential',
        title: say('Esponentzialen lekualdaketak', 'Traslaciones de exponenciales', 'انسحابات الدوال الأسية', 'Translations of exponentials'),
        goal: say('$y=a^{x-p}+q$ funtzioa $y=a^{x}$ funtzioaren lekualdaketa gisa irakurtzea, asintota eta puntu ezagunak barne.', 'Leer $y=a^{x-p}+q$ como una traslación de $y=a^{x}$, con su asíntota y sus puntos conocidos.', 'قراءة $y=a^{x-p}+q$ انسحابًا لـ $y=a^{x}$ مع مقاربها ونقاطها المعروفة.', 'Read $y=a^{x-p}+q$ as a translation of $y=a^{x}$, with its asymptote and its known points.'),
        explanation: say(
            'Parabolekin bezala, $y=a^{x-p}+q$ funtzioa $y=a^{x}$ bera da, $p$ unitate horizontalki eta $q$ unitate bertikalki eramanda. $(0,\\,1)$ puntua $(p,\\,1+q)$ puntura doa, eta $y=0$ asintota $y=q$ zuzenera. Adibidez, $y=4^{x-2}+3$ funtzioa $y=4^{x}$ da, 2 eskuinera eta 3 gora: $(2,\\,4)$ puntutik pasatzen da eta haren asintota $y=3$ da; beraz, ibiltartea $(3,\\,+\\infty)$ da. Kontuz zeinuekin: $y=2^{x+1}$ ezkerrera mugitzen da. Kanpoko zenbaki negatibo batek X ardatzaren azpira eraman dezake grafikoa: $y=2^{x}-4$ funtzioak X ardatza $x=2$ puntuan ebakitzen du, $2^{x}=4$ delako.',
            'Como con las parábolas, $y=a^{x-p}+q$ es la misma $y=a^{x}$ llevada $p$ unidades en horizontal y $q$ en vertical. El punto $(0,\\,1)$ va a $(p,\\,1+q)$ y la asíntota $y=0$ pasa a ser $y=q$. Por ejemplo, $y=4^{x-2}+3$ es $y=4^{x}$ movida 2 a la derecha y 3 hacia arriba: pasa por $(2,\\,4)$ y su asíntota es $y=3$; así que el recorrido es $(3,\\,+\\infty)$. Cuidado con los signos: $y=2^{x+1}$ se mueve a la izquierda. Un número negativo fuera puede bajar la gráfica por debajo del eje X: $y=2^{x}-4$ corta al eje X en $x=2$, porque $2^{x}=4$.',
            'كما في القطوع المكافئة، $y=a^{x-p}+q$ هي $y=a^{x}$ نفسها منقولة $p$ وحدة أفقيًا و$q$ رأسيًا. تنتقل النقطة $(0,\\,1)$ إلى $(p,\\,1+q)$، ويصير المقارب $y=0$ هو $y=q$. مثلًا $y=4^{x-2}+3$ هي $y=4^{x}$ منقولة 2 إلى اليمين و3 إلى الأعلى: تمر بـ $(2,\\,4)$ ومقاربها $y=3$؛ إذن المدى $(3,\\,+\\infty)$. انتبه للإشارات: $y=2^{x+1}$ تنتقل إلى اليسار. والعدد السالب في الخارج قد ينزل الرسم تحت محور X: $y=2^{x}-4$ تقطع محور X عند $x=2$ لأن $2^{x}=4$.', 'As with parabolas, $y=a^{x-p}+q$ is the same $y=a^{x}$ moved $p$ units horizontally and $q$ units vertically. The point $(0,\\,1)$ moves to $(p,\\,1+q)$ and the asymptote $y=0$ becomes $y=q$. For example, $y=4^{x-2}+3$ is $y=4^{x}$ moved 2 to the right and 3 up: it passes through $(2,\\,4)$ and its asymptote is $y=3$, so the range is $(3,\\,+\\infty)$. Be careful with the signs: $y=2^{x+1}$ moves to the left. A negative number outside can move the graph below the x-axis: $y=2^{x}-4$ crosses the x-axis at $x=2$, because $2^{x}=4$.'
        ),
        problem: say('Nola lortzen da $y=2^{x-2}+1$ funtzioa $y=2^{x}$ funtziotik? Zein da haren asintota?', '¿Cómo se obtiene $y=2^{x-2}+1$ a partir de $y=2^{x}$? ¿Cuál es su asíntota?', 'كيف نحصل على $y=2^{x-2}+1$ من $y=2^{x}$؟ وما مقاربها؟', 'How do you get $y=2^{x-2}+1$ from $y=2^{x}$? What is its asymptote?'),
        stepsKind: 'steps',
        steps: [
            { text: say('2 eskuinera eta 1 gora.', '2 a la derecha y 1 hacia arriba.', '2 إلى اليمين و1 إلى الأعلى.', '2 to the right and 1 up.'), math: same('$(0,\\,1)\\ \\to\\ (2,\\,2)$') },
            { text: say('Asintota ere igotzen da.', 'La asíntota también sube.', 'يصعد المقارب أيضًا.', 'The asymptote also goes up.'), math: same('$y=1$') }
        ],
        example: same('$y=a^{x-p}+q$'),
        takeaway: say('aˣ⁻ᵖ + q: p eskuinera, q gora. Asintota y = q eta (0, 1) puntua (p, 1 + q) puntura.', 'aˣ⁻ᵖ + q: p a la derecha, q hacia arriba. Asíntota y = q y el punto (0, 1) pasa a (p, 1 + q).', 'aˣ⁻ᵖ + q: p إلى اليمين وq إلى الأعلى. المقارب y = q والنقطة (0, 1) تصير (p, 1 + q).', 'aˣ⁻ᵖ + q: p to the right, q up. Asymptote y = q, and the point (0, 1) moves to (p, 1 + q).'),
        figure: (language) => <ExpShiftFigure language={language} />
    },

    /* ---------- 2. Growth, decay and equations ---------- */
    {
        id: 'growth',
        stage: 'growth',
        title: say('Hazkunde esponentziala', 'Crecimiento exponencial', 'النمو الأسي', 'Exponential growth'),
        goal: say('Ehuneko finko batean hazten diren magnitudeak $y=k\\cdot a^{x}$ eredu batekin adieraztea eta erabiltzea.', 'Expresar y usar con un modelo $y=k\\cdot a^{x}$ las magnitudes que crecen un porcentaje fijo.', 'التعبير عن الكميات التي تنمو بنسبة ثابتة بنموذج $y=k\\cdot a^{x}$ واستعماله.', 'Express and use, with a model $y=k\\cdot a^{x}$, quantities that grow by a fixed percentage.'),
        explanation: say(
            'Magnitude bat urrats bakoitzean ehuneko berean hazten bada, funtzio esponentzial bat da: $y=k\\cdot a^{x}$, non $k$ hasierako balioa den ($x=0$) eta $a$ urrats bakoitzeko faktorea. % 5 igotzea $\\cdot 1{,}05$ biderkatzea da, eta % 20 jaistea $\\cdot 0{,}8$. 2 000 €-ko kapital bat % 3an jarrita, interes konposatuan, $C=2\\,000\\cdot 1{,}03^{t}$ da $t$ urteren buruan: 5 urtean $2\\,000\\cdot 1{,}03^{5}\\approx 2\\,318{,}55$ €. Bakterio-kolonia bat orduro bikoizten bada eta 500 bakteriorekin hasten bada, $N=500\\cdot 2^{t}$: 4 ordutan $500\\cdot 16=8\\,000$. Hazkunde lineala ez bezala (kopuru bera urrats bakoitzean), esponentzialak gero eta gehiago gehitzen du.',
            'Si una magnitud crece el mismo porcentaje en cada paso, es una función exponencial: $y=k\\cdot a^{x}$, donde $k$ es el valor inicial ($x=0$) y $a$ el factor de cada paso. Subir un 5 % es multiplicar por $1{,}05$, y bajar un 20 %, por $0{,}8$. Un capital de 2 000 € al 3 % de interés compuesto vale $C=2\\,000\\cdot 1{,}03^{t}$ al cabo de $t$ años: en 5 años, $2\\,000\\cdot 1{,}03^{5}\\approx 2\\,318{,}55$ €. Si una colonia de bacterias se duplica cada hora y empieza con 500, $N=500\\cdot 2^{t}$: en 4 horas, $500\\cdot 16=8\\,000$. A diferencia del crecimiento lineal (la misma cantidad en cada paso), el exponencial añade cada vez más.',
            'إذا نمت كمية بالنسبة نفسها في كل خطوة فهي دالة أسية: $y=k\\cdot a^{x}$ حيث $k$ القيمة الابتدائية ($x=0$) و$a$ معامل كل خطوة. الزيادة 5 % ضرب في $1{,}05$، والنقص 20 % ضرب في $0{,}8$. رأس مال قدره 2000 € بفائدة مركبة 3 % يساوي $C=2\\,000\\cdot 1{,}03^{t}$ بعد $t$ سنة: في 5 سنوات $2\\,000\\cdot 1{,}03^{5}\\approx 2\\,318{,}55$ €. وإذا تضاعفت مستعمرة بكتيريا كل ساعة وبدأت بـ 500 فإن $N=500\\cdot 2^{t}$: في 4 ساعات $500\\cdot 16=8\\,000$. وبخلاف النمو الخطي (الكمية نفسها في كل خطوة) يضيف النمو الأسي أكثر فأكثر.', 'If a quantity grows by the same percentage at each step, it is an exponential function: $y=k\\cdot a^{x}$, where $k$ is the starting value ($x=0$) and $a$ is the factor for each step. Increasing by 5% means multiplying by $1{,}05$, and decreasing by 20% means multiplying by $0{,}8$. A principal of €2,000 at 3% compound interest is worth $C=2\\,000\\cdot 1{,}03^{t}$ after $t$ years: after 5 years, $2\\,000\\cdot 1{,}03^{5}\\approx 2\\,318{,}55$ €. If a colony of bacteria doubles every hour and starts with 500, $N=500\\cdot 2^{t}$: after 4 hours, $500\\cdot 16=8\\,000$. Unlike linear growth (the same amount at each step), exponential growth adds more and more each time.'
        ),
        problem: say('Herri batek 10 000 biztanle ditu eta urtero % 10 hazten da. Zenbat biztanle izango ditu 2 urte barru?', 'Un pueblo tiene 10 000 habitantes y crece un 10 % cada año. ¿Cuántos tendrá dentro de 2 años?', 'قرية فيها 10000 نسمة وتنمو 10 % كل سنة. كم سيكون عدد سكانها بعد سنتين؟', 'A village has 10,000 inhabitants and grows by 10% each year. How many will it have in 2 years?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorea: % 10 gehiago.', 'El factor: un 10 % más.', 'المعامل: 10 % أكثر.', 'The factor: 10% more.'), math: same('$a=1{,}1$') },
            { text: say('Eredua.', 'El modelo.', 'النموذج.', 'The model.'), math: same('$N=10\\,000\\cdot 1{,}1^{t}$') },
            { text: say('$t=2$.', '$t=2$.', '$t=2$.', '$t=2$.'), math: same('$10\\,000\\cdot 1{,}21=12\\,100$') }
        ],
        example: same('$y=k\\cdot a^{x}$'),
        takeaway: say('Ehuneko finkoa: y = k · aˣ. % r igo: a = 1 + r/100; % r jaitsi: a = 1 − r/100.', 'Porcentaje fijo: y = k · aˣ. Subir r %: a = 1 + r/100; bajar r %: a = 1 − r/100.', 'نسبة ثابتة: y = k · aˣ. زيادة r %: a = 1 + r/100؛ نقص r %: a = 1 − r/100.', 'Fixed percentage: y = k · aˣ. Increase by r%: a = 1 + r/100; decrease by r%: a = 1 − r/100.'),
        figure: (language) => <GrowthFigure language={language} />
    },
    {
        id: 'decay',
        stage: 'growth',
        title: say('Beherakuntza eta erdibizitza', 'Decrecimiento y semivida', 'التناقص وعمر النصف', 'Decay and half-life'),
        goal: say('Beherakuntza esponentzialak eta erdibizitza ulertzea eta erabiltzea.', 'Entender y usar el decrecimiento exponencial y la semivida.', 'فهم التناقص الأسي وعمر النصف واستعمالهما.', 'Understand and use exponential decay and half-life.'),
        explanation: say(
            'Magnitude bat ehuneko berean txikitzen bada, $0<a<1$ duen funtzio esponentzial bat da. Auto batek urtero balioaren % 15 galtzen badu, $V=20\\,000\\cdot 0{,}85^{t}$ da. Substantzia erradioaktibo baten erdibizitza bere masa erdira jaisteko behar den denbora da. Erdibizitza $T$ bada, $m=m_0\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}$: 80 g eta 5 urteko erdibizitza, $m=80\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{5}}$; 10 urtean $80\\cdot\\frac{1}{4}=20$ g geratzen dira, eta 15 urtean 10 g. Beherakuntzak ez du inoiz 0ra iristen: $y=0$ asintota da. Medikamentu baten kontzentrazioa edo kafe baten hozte-prozesua ere era horretakoak dira.',
            'Si una magnitud disminuye el mismo porcentaje, es una función exponencial con $0<a<1$. Si un coche pierde cada año el 15 % de su valor, $V=20\\,000\\cdot 0{,}85^{t}$. La semivida de una sustancia radiactiva es el tiempo que tarda su masa en reducirse a la mitad. Si la semivida es $T$, $m=m_0\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}$: con 80 g y una semivida de 5 años, $m=80\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{5}}$; en 10 años quedan $80\\cdot\\frac{1}{4}=20$ g, y en 15 años, 10 g. El decrecimiento nunca llega a 0: $y=0$ es una asíntota. La concentración de un medicamento o el enfriamiento de un café también son así.',
            'إذا نقصت كمية بالنسبة نفسها فهي دالة أسية فيها $0<a<1$. إذا فقدت سيارة كل سنة 15 % من قيمتها فإن $V=20\\,000\\cdot 0{,}85^{t}$. وعمر النصف لمادة مشعة هو الزمن اللازم لتنقص كتلتها إلى النصف. إذا كان عمر النصف $T$ فإن $m=m_0\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}$: مع 80 غ وعمر نصف 5 سنوات $m=80\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{5}}$؛ وبعد 10 سنوات يبقى $80\\cdot\\frac{1}{4}=20$ غ، وبعد 15 سنة 10 غ. التناقص لا يبلغ 0 أبدًا: $y=0$ مقارب. وتركيز دواء أو تبرّد فنجان قهوة من هذا النوع أيضًا.', 'If a quantity decreases by the same percentage, it is an exponential function with $0<a<1$. If a car loses 15% of its value each year, $V=20\\,000\\cdot 0{,}85^{t}$. The half-life of a radioactive substance is the time its mass takes to be reduced to half. If the half-life is $T$, $m=m_0\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}$: with 80 g and a half-life of 5 years, $m=80\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{5}}$; after 10 years there are $80\\cdot\\frac{1}{4}=20$ g left, and after 15 years, 10 g. Decay never reaches 0: $y=0$ is an asymptote. The concentration of a medicine and the cooling of a coffee also follow this pattern.'
        ),
        problem: say('Substantzia baten erdibizitza 8 egun da. 96 g badira, zenbat geratuko dira 24 egunean?', 'Una sustancia tiene una semivida de 8 días. Si hay 96 g, ¿cuántos quedarán en 24 días?', 'عمر النصف لمادة 8 أيام. إذا كان لدينا 96 غ فكم يبقى بعد 24 يومًا؟', 'A substance has a half-life of 8 days. If there are 96 g, how many grams will be left after 24 days?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbat erdibizitza?', '¿Cuántas semividas?', 'كم عمر نصف؟', 'How many half-lives?'), math: same('$\\frac{24}{8}=3$') },
            { text: say('Hiru aldiz erdira.', 'Tres veces a la mitad.', 'إلى النصف ثلاث مرات.', 'Three times halved.'), math: same('$96\\cdot\\left(\\frac{1}{2}\\right)^{3}=12$') }
        ],
        example: same('$m=m_0\\cdot\\left(\\frac{1}{2}\\right)^{\\frac{t}{T}}$'),
        takeaway: say('Beherakuntza: 0 < a < 1. Erdibizitza bakoitzean erdia geratzen da, eta ez da inoiz 0ra iristen.', 'Decrecimiento: 0 < a < 1. En cada semivida queda la mitad, y nunca se llega a 0.', 'التناقص: 0 < a < 1. في كل عمر نصف يبقى النصف، ولا نبلغ 0 أبدًا.', 'Decay: 0 < a < 1. At each half-life, half is left, and it never reaches 0.'),
        figure: (language) => <DecayFigure language={language} />
    },
    {
        id: 'exp-equations',
        stage: 'growth',
        title: say('Ekuazio esponentzialak', 'Ecuaciones exponenciales', 'المعادلات الأسية', 'Exponential equations'),
        goal: say('Ekuazio esponentzialak ebaztea bi aldeak oinarri berean idatziz edo logaritmoak erabiliz.', 'Resolver ecuaciones exponenciales escribiendo los dos lados en la misma base o usando logaritmos.', 'حل المعادلات الأسية بكتابة الطرفين بالأساس نفسه أو باستعمال اللوغاريتمات.', 'Solve exponential equations by writing both sides with the same base or by using logarithms.'),
        explanation: say(
            'Ekuazio esponentzial batean ezezaguna berretzailean dago. Bi aldeak oinarri berarekin idatz badaitezke, berretzaileak berdintzen dira, $a^{x}$ funtzioak ez duelako balio bera bi aldiz hartzen: $2^{x}=32=2^{5}$, beraz $x=5$; $9^{x}=27$ ekuazioan $3^{2x}=3^{3}$, $x=\\frac{3}{2}$; $2^{x-1}=\\frac{1}{8}=2^{-3}$, $x=-2$. Oinarri bera lortzen ez bada, hartu logaritmoak: $2^{x}=10$ bada, $x=\\log_2 10=\\frac{\\log 10}{\\log 2}\\approx 3{,}32$. Problemetan hori behar da: zenbat urtean bikoizten da kapital bat % 5ean? $1{,}05^{t}=2$, $t=\\frac{\\log 2}{\\log 1{,}05}\\approx 14{,}2$ urte. Grafikoki, soluzioa $y=a^{x}$ kurbaren eta zuzen horizontalaren ebaki-puntuaren abszisa da.',
            'En una ecuación exponencial la incógnita está en el exponente. Si los dos lados se pueden escribir con la misma base, se igualan los exponentes, porque $a^{x}$ no toma el mismo valor dos veces: $2^{x}=32=2^{5}$, así que $x=5$; en $9^{x}=27$, $3^{2x}=3^{3}$, $x=\\frac{3}{2}$; $2^{x-1}=\\frac{1}{8}=2^{-3}$, $x=-2$. Si no se consigue la misma base, se toman logaritmos: si $2^{x}=10$, $x=\\log_2 10=\\frac{\\log 10}{\\log 2}\\approx 3{,}32$. En los problemas hace falta: ¿en cuántos años se duplica un capital al 5 %? $1{,}05^{t}=2$, $t=\\frac{\\log 2}{\\log 1{,}05}\\approx 14{,}2$ años. Gráficamente, la solución es la abscisa del corte de la curva $y=a^{x}$ con la recta horizontal.',
            'في المعادلة الأسية يكون المجهول في الأس. إذا أمكن كتابة الطرفين بالأساس نفسه نساوي الأسين، لأن $a^{x}$ لا تأخذ القيمة نفسها مرتين: $2^{x}=32=2^{5}$ إذن $x=5$؛ وفي $9^{x}=27$ لدينا $3^{2x}=3^{3}$ و$x=\\frac{3}{2}$؛ و$2^{x-1}=\\frac{1}{8}=2^{-3}$ و$x=-2$. وإن لم نحصل على الأساس نفسه نأخذ اللوغاريتمات: إذا كان $2^{x}=10$ فإن $x=\\log_2 10=\\frac{\\log 10}{\\log 2}\\approx 3{,}32$. وتحتاج المسائل إلى ذلك: في كم سنة يتضاعف رأس مال بفائدة 5 %؟ $1{,}05^{t}=2$ و$t=\\frac{\\log 2}{\\log 1{,}05}\\approx 14{,}2$ سنة. وبيانيًا الحل هو الإحداثي السيني لتقاطع المنحنى $y=a^{x}$ مع المستقيم الأفقي.', 'In an exponential equation, the unknown is in the exponent. If both sides can be written with the same base, the exponents are set equal, because $a^{x}$ does not take the same value twice: $2^{x}=32=2^{5}$, so $x=5$; in $9^{x}=27$, $3^{2x}=3^{3}$, $x=\\frac{3}{2}$; $2^{x-1}=\\frac{1}{8}=2^{-3}$, $x=-2$. If the same base cannot be found, logarithms are used: if $2^{x}=10$, $x=\\log_2 10=\\frac{\\log 10}{\\log 2}\\approx 3{,}32$. It is also needed in problems: in how many years does a principal double at 5%? $1{,}05^{t}=2$, $t=\\frac{\\log 2}{\\log 1{,}05}\\approx 14{,}2$ years. Graphically, the solution is the x-coordinate where the curve $y=a^{x}$ crosses the horizontal line.'
        ),
        problem: say('Ebatzi $4^{x+1}=8$.', 'Resuelve $4^{x+1}=8$.', 'حُلّ $4^{x+1}=8$.', 'Solve $4^{x+1}=8$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarri bera: 2.', 'Misma base: 2.', 'الأساس نفسه: 2.', 'Same base: 2.'), math: same('$2^{2x+2}=2^{3}$') },
            { text: say('Berdindu berretzaileak.', 'Iguala los exponentes.', 'ساوِ الأسين.', 'Set the exponents equal.'), math: same('$2x+2=3$') },
            { text: say('Askatu.', 'Despeja.', 'اعزل.', 'Solve for x.'), math: same('$x=\\frac{1}{2}$') }
        ],
        example: same('$2^{x}=2^{5}$'),
        takeaway: say('Oinarri bera: berdindu berretzaileak. Bestela: x = log b / log a.', 'Misma base: iguala exponentes. Si no: x = log b / log a.', 'الأساس نفسه: ساوِ الأسين. وإلا: x = log b / log a.', 'Same base: set the exponents equal. If not: x = log b / log a.'),
        figure: (language) => <ExpEquationFigure language={language} />
    },

    /* ---------- 3. The logarithmic function ---------- */
    {
        id: 'log-values',
        stage: 'logarithmic',
        title: say('Logaritmoak', 'Logaritmos', 'اللوغاريتمات', 'Logarithms'),
        goal: say('Logaritmoaren definizioa gogoratzea eta logaritmo zehatzak kalkulatzea.', 'Recordar la definición de logaritmo y calcular logaritmos exactos.', 'تذكّر تعريف اللوغاريتم وحساب لوغاريتمات دقيقة.', 'Remember the definition of a logarithm and calculate exact logarithms.'),
        explanation: say(
            '$a$ oinarriko $x$-ren logaritmoa $a$ ber zenbat eman behar den $x$ lortzeko da: $\\log_a x=y$ baldin eta soilik baldin $a^{y}=x$. Adibidez, $\\log_2 8=3$, $2^{3}=8$ delako; $\\log_3\\frac{1}{9}=-2$, $3^{-2}=\\frac{1}{9}$ delako; $\\log_{4} 2=\\frac{1}{2}$, $\\sqrt{4}=2$ delako. Beti $\\log_a 1=0$ eta $\\log_a a=1$. Zenbaki negatiboek eta 0k ez dute logaritmorik, $a^{y}$ beti positiboa delako. $\\log x$ hamartarra da (10 oinarria): $\\log 1\\,000=3$. Kalkulagailuarekin, beste oinarri batean: $\\log_a x=\\frac{\\log x}{\\log a}$. Logaritmoak esponentzialaren alderantzizko eragiketa dira, kenketa batuketarena den bezala.',
            'El logaritmo en base $a$ de $x$ es el exponente al que hay que elevar $a$ para obtener $x$: $\\log_a x=y$ si y solo si $a^{y}=x$. Por ejemplo, $\\log_2 8=3$ porque $2^{3}=8$; $\\log_3\\frac{1}{9}=-2$ porque $3^{-2}=\\frac{1}{9}$; $\\log_{4} 2=\\frac{1}{2}$ porque $\\sqrt{4}=2$. Siempre $\\log_a 1=0$ y $\\log_a a=1$. Los números negativos y el 0 no tienen logaritmo, porque $a^{y}$ siempre es positivo. $\\log x$ es el decimal (base 10): $\\log 1\\,000=3$. Con la calculadora, en otra base: $\\log_a x=\\frac{\\log x}{\\log a}$. Los logaritmos son la operación inversa de la exponencial, igual que la resta lo es de la suma.',
            'لوغاريتم $x$ للأساس $a$ هو الأس الذي نرفع إليه $a$ لنحصل على $x$: $\\log_a x=y$ إذا وفقط إذا $a^{y}=x$. مثلًا $\\log_2 8=3$ لأن $2^{3}=8$؛ و$\\log_3\\frac{1}{9}=-2$ لأن $3^{-2}=\\frac{1}{9}$؛ و$\\log_{4} 2=\\frac{1}{2}$ لأن $\\sqrt{4}=2$. ودائمًا $\\log_a 1=0$ و$\\log_a a=1$. الأعداد السالبة والصفر ليس لها لوغاريتم لأن $a^{y}$ موجب دائمًا. و$\\log x$ هو العشري (الأساس 10): $\\log 1\\,000=3$. وبالآلة الحاسبة في أساس آخر: $\\log_a x=\\frac{\\log x}{\\log a}$. اللوغاريتمات العملية العكسية للأسية، كما أن الطرح عكس الجمع.', 'The logarithm of $x$ in base $a$ is the exponent you must raise $a$ to in order to get $x$: $\\log_a x=y$ if and only if $a^{y}=x$. For example, $\\log_2 8=3$ because $2^{3}=8$; $\\log_3\\frac{1}{9}=-2$ because $3^{-2}=\\frac{1}{9}$; $\\log_{4} 2=\\frac{1}{2}$ because $\\sqrt{4}=2$. Always $\\log_a 1=0$ and $\\log_a a=1$. Negative numbers and 0 do not have a logarithm, because $a^{y}$ is always positive. $\\log x$ is the decimal logarithm (base 10): $\\log 1\\,000=3$. With a calculator, for another base: $\\log_a x=\\frac{\\log x}{\\log a}$. Logarithms are the inverse operation of exponentials, just as subtraction is the inverse of addition.'
        ),
        problem: say('Kalkulatu $\\log_5 125$ eta $\\log_2\\frac{1}{16}$.', 'Calcula $\\log_5 125$ y $\\log_2\\frac{1}{16}$.', 'احسب $\\log_5 125$ و$\\log_2\\frac{1}{16}$.', 'Work out $\\log_5 125$ and $\\log_2\\frac{1}{16}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('5 ber zenbat da 125?', '¿5 elevado a cuánto da 125?', '5 أس كم يساوي 125؟', '5 raised to what power gives 125?'), math: same('$5^{3}=125$') },
            { text: say('Alderantzizkoa: berretzaile negatiboa.', 'El inverso: exponente negativo.', 'المقلوب: أس سالب.', 'The reciprocal: a negative exponent.'), math: same('$2^{-4}=\\frac{1}{16}$') }
        ],
        example: same('$\\log_2 8=3$'),
        takeaway: say('log_a x = y ⇔ aʸ = x. log_a 1 = 0 eta log_a a = 1. Ez dago logaritmorik 0rako eta negatiboetarako.', 'log_a x = y ⇔ aʸ = x. log_a 1 = 0 y log_a a = 1. No hay logaritmo de 0 ni de negativos.', 'log_a x = y ⇔ aʸ = x. log_a 1 = 0 وlog_a a = 1. لا لوغاريتم للصفر ولا للسالب.', 'log_a x = y ⇔ aʸ = x. log_a 1 = 0 and log_a a = 1. There is no logarithm of 0 or of negative numbers.'),
        figure: (language) => <LogDefinitionFigure language={language} />
    },
    {
        id: 'log-graph',
        stage: 'logarithmic',
        title: say('$y=\\log_a x$ funtzioa', 'La función $y=\\log_a x$', 'الدالة $y=\\log_a x$', 'The function $y=\\log_a x$'),
        goal: say('$y=\\log_a x$ funtzioaren grafikoa eta propietateak ezagutzea eta esponentzialarekin erlazionatzea.', 'Conocer la gráfica y las propiedades de $y=\\log_a x$ y relacionarla con la exponencial.', 'التعرف إلى رسم $y=\\log_a x$ وخصائصها وربطها بالأسية.', 'Know the graph and properties of $y=\\log_a x$ and relate it to the exponential function.'),
        explanation: say(
            '$y=\\log_a x$ funtzioa $y=a^{x}$ funtzioaren alderantzizkoa da: bikote bakoitza trukatuta dago. $y=2^{x}$ funtzioak $(3,\\,8)$ puntua badu, $y=\\log_2 x$ funtzioak $(8,\\,3)$ puntua du. Horregatik bi grafikoak simetrikoak dira $y=x$ zuzenarekiko. Propietateak: Dom $f=(0,\\,+\\infty)$, Rec $f=\\mathbb{R}$; beti $(1,\\,0)$ eta $(a,\\,1)$ puntuetatik pasatzen da; $x=0$ asintota bertikala da. $a>1$ bada, gorakorra da, baina oso poliki: $\\log_2 1\\,024=10$ baino ez. $0<a<1$ bada, beherakorra da: $y=\\log_{\\frac{1}{2}} x$ funtzioan $f(4)=-2$. Taula egiteko, hartu $a$-ren berreturak: $x=\\frac{1}{4},\\,\\frac{1}{2},\\,1,\\,2,\\,4$ balioek $y=-2,\\,-1,\\,0,\\,1,\\,2$ ematen dute.',
            'La función $y=\\log_a x$ es la inversa de $y=a^{x}$: cada pareja está intercambiada. Si $y=2^{x}$ tiene el punto $(3,\\,8)$, $y=\\log_2 x$ tiene el punto $(8,\\,3)$. Por eso las dos gráficas son simétricas respecto a la recta $y=x$. Propiedades: Dom $f=(0,\\,+\\infty)$, Rec $f=\\mathbb{R}$; pasa siempre por $(1,\\,0)$ y $(a,\\,1)$; $x=0$ es una asíntota vertical. Si $a>1$ es creciente, pero muy despacio: $\\log_2 1\\,024$ es solo 10. Si $0<a<1$ es decreciente: en $y=\\log_{\\frac{1}{2}} x$, $f(4)=-2$. Para la tabla, toma potencias de $a$: $x=\\frac{1}{4},\\,\\frac{1}{2},\\,1,\\,2,\\,4$ dan $y=-2,\\,-1,\\,0,\\,1,\\,2$.',
            'الدالة $y=\\log_a x$ عكس $y=a^{x}$: كل زوج مقلوب. إذا كانت النقطة $(3,\\,8)$ على $y=2^{x}$ فالنقطة $(8,\\,3)$ على $y=\\log_2 x$. لذلك الرسمان متماثلان بالنسبة إلى المستقيم $y=x$. الخصائص: Dom $f=(0,\\,+\\infty)$ وRec $f=\\mathbb{R}$؛ تمر دائمًا بـ $(1,\\,0)$ و$(a,\\,1)$؛ و$x=0$ مقارب رأسي. إذا كان $a>1$ فهي متزايدة لكن ببطء شديد: $\\log_2 1\\,024$ يساوي 10 فقط. وإذا كان $0<a<1$ فهي متناقصة: في $y=\\log_{\\frac{1}{2}} x$ يكون $f(4)=-2$. وللجدول خذ قوى $a$: القيم $x=\\frac{1}{4},\\,\\frac{1}{2},\\,1,\\,2,\\,4$ تعطي $y=-2,\\,-1,\\,0,\\,1,\\,2$.', 'The function $y=\\log_a x$ is the inverse of $y=a^{x}$: the x and y values of each pair are swapped. If $y=2^{x}$ has the point $(3,\\,8)$, then $y=\\log_2 x$ has the point $(8,\\,3)$. That is why the two graphs are symmetrical about the straight line $y=x$. Properties: Domain $f=(0,\\,+\\infty)$, Range $f=\\mathbb{R}$; it always passes through $(1,\\,0)$ and $(a,\\,1)$; $x=0$ is a vertical asymptote. If $a>1$ it is increasing, but very slowly: $\\log_2 1\\,024$ is only 10. If $0<a<1$ it is decreasing: in $y=\\log_{\\frac{1}{2}} x$, $f(4)=-2$. For the table, take powers of $a$: $x=\\frac{1}{4},\\,\\frac{1}{2},\\,1,\\,2,\\,4$ give $y=-2,\\,-1,\\,0,\\,1,\\,2$.'
        ),
        problem: say('$y=\\log_3 x$ izanik, kalkulatu $f(9)$ eta $f\\left(\\frac{1}{3}\\right)$. Zein da haren izate-eremua?', 'Siendo $y=\\log_3 x$, calcula $f(9)$ y $f\\left(\\frac{1}{3}\\right)$. ¿Cuál es su dominio?', 'إذا كان $y=\\log_3 x$ فاحسب $f(9)$ و$f\\left(\\frac{1}{3}\\right)$. ما مجالها؟', 'For $y=\\log_3 x$, calculate $f(9)$ and $f\\left(\\frac{1}{3}\\right)$. What is its domain?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$3^{2}=9$.', '$3^{2}=9$.', '$3^{2}=9$.', '$3^{2}=9$.'), math: same('$f(9)=2$') },
            { text: say('$3^{-1}=\\frac{1}{3}$.', '$3^{-1}=\\frac{1}{3}$.', '$3^{-1}=\\frac{1}{3}$.', '$3^{-1}=\\frac{1}{3}$.'), math: same('$f\\left(\\frac{1}{3}\\right)=-1$') },
            { text: say('Positiboak bakarrik.', 'Solo los positivos.', 'الموجبة فقط.', 'Only positive numbers.'), math: same('$(0,\\,+\\infty)$') }
        ],
        example: same('$(3,\\,8)\\ \\to\\ (8,\\,3)$'),
        takeaway: say('log_a x: aˣ-ren alderantzizkoa. Beti (1, 0) puntutik, x > 0 bakarrik, x = 0 asintota.', 'log_a x: la inversa de aˣ. Siempre por (1, 0), solo x > 0, asíntota x = 0.', 'log_a x: عكس aˣ. دائمًا عبر (1, 0)، فقط x > 0، والمقارب x = 0.', 'log_a x: the inverse of aˣ. Always through (1, 0), only x > 0, asymptote x = 0.'),
        figure: (language) => <LogGraphFigure language={language} />
    },
    {
        id: 'log-shifts',
        stage: 'logarithmic',
        title: say('Logaritmoen lekualdaketak', 'Traslaciones de logaritmos', 'انسحابات اللوغاريتمات', 'Translations of logarithms'),
        goal: say('$y=\\log_a(x-p)+q$ funtzioen izate-eremua, asintota eta ebaki-puntuak aurkitzea.', 'Hallar el dominio, la asíntota y los cortes de $y=\\log_a(x-p)+q$.', 'إيجاد مجال $y=\\log_a(x-p)+q$ ومقاربها ونقاط تقاطعها.', 'Find the domain, the asymptote and the intercepts of $y=\\log_a(x-p)+q$.'),
        explanation: say(
            '$y=\\log_a(x-p)+q$ funtzioa $y=\\log_a x$ da, $p$ eskuinera eta $q$ gora. Barrukoak positiboa izan behar du: $x-p>0$, beraz Dom $f=(p,\\,+\\infty)$, eta asintota bertikala $x=p$ da. $(1,\\,0)$ puntua $(p+1,\\,q)$ puntura doa. Adibidez, $y=\\log_2(x+2)$ funtzioa 2 ezkerrera mugitzen da: Dom $f=(-2,\\,+\\infty)$ eta X ardatza $x=-1$ puntuan ebakitzen du. $y=\\log x+3$ funtzioa 3 gora mugitzen da; X ardatza ebakitzeko $\\log x=-3$, $x=10^{-3}=0{,}001$. Izate-eremua kalkulatzeko arau bera balio du barrukoa konplexuagoa denean: $y=\\log(2x-6)$ funtzioan $2x-6>0$, $x>3$.',
            '$y=\\log_a(x-p)+q$ es $y=\\log_a x$ movida $p$ a la derecha y $q$ hacia arriba. Lo de dentro tiene que ser positivo: $x-p>0$, así que Dom $f=(p,\\,+\\infty)$, y la asíntota vertical es $x=p$. El punto $(1,\\,0)$ pasa a $(p+1,\\,q)$. Por ejemplo, $y=\\log_2(x+2)$ se mueve 2 a la izquierda: Dom $f=(-2,\\,+\\infty)$ y corta al eje X en $x=-1$. $y=\\log x+3$ se mueve 3 hacia arriba; para cortar al eje X, $\\log x=-3$, $x=10^{-3}=0{,}001$. La misma regla del dominio vale cuando lo de dentro es más complicado: en $y=\\log(2x-6)$, $2x-6>0$, $x>3$.',
            '$y=\\log_a(x-p)+q$ هي $y=\\log_a x$ منقولة $p$ إلى اليمين و$q$ إلى الأعلى. يجب أن يكون ما بالداخل موجبًا: $x-p>0$، إذن Dom $f=(p,\\,+\\infty)$ والمقارب الرأسي $x=p$. وتنتقل النقطة $(1,\\,0)$ إلى $(p+1,\\,q)$. مثلًا $y=\\log_2(x+2)$ تنتقل 2 إلى اليسار: Dom $f=(-2,\\,+\\infty)$ وتقطع محور X عند $x=-1$. و$y=\\log x+3$ تنتقل 3 إلى الأعلى؛ ولتقطع محور X: $\\log x=-3$، $x=10^{-3}=0{,}001$. وتصح قاعدة المجال نفسها حين يكون ما بالداخل أعقد: في $y=\\log(2x-6)$ لدينا $2x-6>0$، $x>3$.', '$y=\\log_a(x-p)+q$ is $y=\\log_a x$ moved $p$ to the right and $q$ up. What is inside the logarithm has to be positive: $x-p>0$, so Domain $f=(p,\\,+\\infty)$, and the vertical asymptote is $x=p$. The point $(1,\\,0)$ moves to $(p+1,\\,q)$. For example, $y=\\log_2(x+2)$ moves 2 to the left: Domain $f=(-2,\\,+\\infty)$ and it crosses the x-axis at $x=-1$. $y=\\log x+3$ moves 3 up; to cross the x-axis, $\\log x=-3$, $x=10^{-3}=0{,}001$. The same domain rule applies when what is inside is more complicated: in $y=\\log(2x-6)$, $2x-6>0$, $x>3$.'
        ),
        problem: say('Kalkulatu $y=\\log_3(x-1)+2$ funtzioaren izate-eremua eta $(1,\\,0)$ puntuaren irudia lekualdaketan.', 'Halla el dominio de $y=\\log_3(x-1)+2$ y adónde va el punto $(1,\\,0)$ en la traslación.', 'أوجد مجال $y=\\log_3(x-1)+2$ وإلى أين تنتقل النقطة $(1,\\,0)$.', 'Find the domain of $y=\\log_3(x-1)+2$ and where the point $(1,\\,0)$ goes after the translation.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrukoa positiboa.', 'Lo de dentro, positivo.', 'ما بالداخل موجب.', 'What is inside must be positive.'), math: same('$x-1>0\\ \\to\\ x>1$') },
            { text: say('1 eskuinera eta 2 gora.', '1 a la derecha y 2 arriba.', '1 يمينًا و2 أعلى.', '1 to the right and 2 up.'), math: same('$(1,\\,0)\\ \\to\\ (2,\\,2)$') }
        ],
        example: same('$x-p>0$'),
        takeaway: say('log_a(x − p) + q: Dom = (p, +∞), asintota x = p, eta (1, 0) puntua (p + 1, q) puntura.', 'log_a(x − p) + q: Dom = (p, +∞), asíntota x = p, y (1, 0) pasa a (p + 1, q).', 'log_a(x − p) + q: Dom = (p, +∞)، المقارب x = p، و(1, 0) تصير (p + 1, q).', 'log_a(x − p) + q: Domain = (p, +∞), asymptote x = p, and (1, 0) moves to (p + 1, q).'),
        figure: (language) => <LogShiftFigure language={language} />
    },

    /* ---------- 4. Sine and cosine ---------- */
    {
        id: 'trig-values',
        stage: 'trigonometric',
        title: say('Angeluak radianetan', 'Ángulos en radianes', 'الزوايا بالراديان', 'Angles in radians'),
        goal: say('Radianetan emandako angelu ohikoen sinua eta kosinua zirkunferentzia unitarioan irakurtzea.', 'Leer en la circunferencia unidad el seno y el coseno de los ángulos habituales dados en radianes.', 'قراءة جيب الزوايا المألوفة المعطاة بالراديان وجيب تمامها على دائرة الوحدة.', 'Read the sine and cosine of common angles given in radians from the unit circle.'),
        explanation: say(
            'Funtzio trigonometrikoetan $x$ angelu bat da radianetan: $\\pi$ rad $=180°$. Zirkunferentzia unitarioan, $x$ angeluari dagokion puntuaren koordenatuak $(\\cos x,\\,\\sen x)$ dira. Horrela irakurtzen dira balio ohikoak: $\\sen 0=0$, $\\sen\\frac{\\pi}{2}=1$, $\\sen\\pi=0$, $\\sen\\frac{3\\pi}{2}=-1$; $\\cos 0=1$, $\\cos\\frac{\\pi}{2}=0$, $\\cos\\pi=-1$. Erdiko angeluetan, $\\sen\\frac{\\pi}{6}=\\frac{1}{2}$, $\\cos\\frac{\\pi}{3}=\\frac{1}{2}$ eta $\\sen\\frac{\\pi}{4}=\\cos\\frac{\\pi}{4}=\\frac{\\sqrt{2}}{2}$. Buelta oso bat ($2\\pi$) gehitzean, puntu bera itzultzen da: $\\sen\\left(x+2\\pi\\right)=\\sen x$. Horregatik dira funtzio periodikoak. Bigarren koadrantean sinua positiboa da eta kosinua negatiboa: $\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$.',
            'En las funciones trigonométricas $x$ es un ángulo en radianes: $\\pi$ rad $=180°$. En la circunferencia unidad, el punto que corresponde al ángulo $x$ tiene coordenadas $(\\cos x,\\,\\sen x)$. Así se leen los valores habituales: $\\sen 0=0$, $\\sen\\frac{\\pi}{2}=1$, $\\sen\\pi=0$, $\\sen\\frac{3\\pi}{2}=-1$; $\\cos 0=1$, $\\cos\\frac{\\pi}{2}=0$, $\\cos\\pi=-1$. En los ángulos intermedios, $\\sen\\frac{\\pi}{6}=\\frac{1}{2}$, $\\cos\\frac{\\pi}{3}=\\frac{1}{2}$ y $\\sen\\frac{\\pi}{4}=\\cos\\frac{\\pi}{4}=\\frac{\\sqrt{2}}{2}$. Al sumar una vuelta entera ($2\\pi$) se vuelve al mismo punto: $\\sen\\left(x+2\\pi\\right)=\\sen x$. Por eso son funciones periódicas. En el segundo cuadrante el seno es positivo y el coseno negativo: $\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$.',
            'في الدوال المثلثية تكون $x$ زاوية بالراديان: $\\pi$ rad $=180°$. وعلى دائرة الوحدة إحداثيا النقطة المقابلة للزاوية $x$ هما $(\\cos x,\\,\\sen x)$. وهكذا تُقرأ القيم المألوفة: $\\sen 0=0$ و$\\sen\\frac{\\pi}{2}=1$ و$\\sen\\pi=0$ و$\\sen\\frac{3\\pi}{2}=-1$؛ و$\\cos 0=1$ و$\\cos\\frac{\\pi}{2}=0$ و$\\cos\\pi=-1$. وفي الزوايا الوسطى $\\sen\\frac{\\pi}{6}=\\frac{1}{2}$ و$\\cos\\frac{\\pi}{3}=\\frac{1}{2}$ و$\\sen\\frac{\\pi}{4}=\\cos\\frac{\\pi}{4}=\\frac{\\sqrt{2}}{2}$. وعند إضافة دورة كاملة ($2\\pi$) نعود إلى النقطة نفسها: $\\sen\\left(x+2\\pi\\right)=\\sen x$. لذلك هي دوال دورية. وفي الربع الثاني يكون الجيب موجبًا وجيب التمام سالبًا: $\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$.', 'In trigonometric functions, $x$ is an angle in radians: $\\pi$ rad $=180°$. On the unit circle, the point that corresponds to the angle $x$ has coordinates $(\\cos x,\\,\\sin x)$. This is how the common values are read off: $\\sin 0=0$, $\\sin\\frac{\\pi}{2}=1$, $\\sin\\pi=0$, $\\sin\\frac{3\\pi}{2}=-1$; $\\cos 0=1$, $\\cos\\frac{\\pi}{2}=0$, $\\cos\\pi=-1$. For the in-between angles, $\\sin\\frac{\\pi}{6}=\\frac{1}{2}$, $\\cos\\frac{\\pi}{3}=\\frac{1}{2}$ and $\\sin\\frac{\\pi}{4}=\\cos\\frac{\\pi}{4}=\\frac{\\sqrt{2}}{2}$. Adding one full turn ($2\\pi$) brings you back to the same point: $\\sin\\left(x+2\\pi\\right)=\\sin x$. That is why they are periodic functions. In the second quadrant the sine is positive and the cosine is negative: $\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$.'
        ),
        problem: say('Kalkulatu $\\sen\\frac{5\\pi}{2}$ eta $\\cos\\frac{4\\pi}{3}$.', 'Calcula $\\sen\\frac{5\\pi}{2}$ y $\\cos\\frac{4\\pi}{3}$.', 'احسب $\\sen\\frac{5\\pi}{2}$ و$\\cos\\frac{4\\pi}{3}$.', 'Calculate $\\sin\\frac{5\\pi}{2}$ and $\\cos\\frac{4\\pi}{3}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu buelta bat.', 'Quita una vuelta.', 'احذف دورة.', 'Remove one full turn.'), math: same('$\\sen\\frac{5\\pi}{2}=\\sen\\frac{\\pi}{2}=1$') },
            { text: say('$240°$: III. koadrantea.', '$240°$: tercer cuadrante.', '$240°$: الربع الثالث.', '$240°$: third quadrant.'), math: same('$\\cos\\frac{4\\pi}{3}=-\\frac{1}{2}$') }
        ],
        example: same('$(\\cos x,\\,\\sen x)$'),
        takeaway: say('Puntua (cos x, sin x) da. Buelta bat gehitzean (2π), balio berak.', 'El punto es (cos x, sen x). Al sumar una vuelta (2π), los mismos valores.', 'النقطة (cos x, sin x). بإضافة دورة (2π) نحصل على القيم نفسها.', 'The point is (cos x, sin x). Adding one full turn (2π) gives the same values.'),
        figure: (language) => <UnitCircleFigure language={language} />
    },
    {
        id: 'sine',
        stage: 'trigonometric',
        title: say('$y=\\sen x$ funtzioa', 'La función $y=\\sen x$', 'الدالة $y=\\sen x$', 'The function $y=\\sin x$'),
        goal: say('Sinu funtzioaren grafikoa eta propietateak ezagutzea: periodoa, ibiltartea, zeroak, maximoak eta minimoak.', 'Conocer la gráfica y las propiedades de la función seno: periodo, recorrido, ceros, máximos y mínimos.', 'التعرف إلى رسم دالة الجيب وخصائصها: الدور والمدى والأصفار والقيم العظمى والصغرى.', 'Know the graph and properties of the sine function: period, range, zeros, maxima and minima.'),
        explanation: say(
            '$y=\\sen x$ funtzioak angelu bakoitzari zirkunferentzia unitarioko puntuaren altuera ematen dio. Edozein angelurentzat dago definituta: Dom $f=\\mathbb{R}$; eta $-1$ eta $1$ artean dago beti: Rec $f=[-1,\\,1]$. Periodikoa da, $T=2\\pi$ periodoarekin: grafikoa $[0,\\,2\\pi]$ tartean marrazten da eta gero errepikatzen da. Tarte horretan: $x=0$ puntuan 0, $\\frac{\\pi}{2}$ puntuan maximoa (1), $\\pi$ puntuan 0, $\\frac{3\\pi}{2}$ puntuan minimoa ($-1$) eta $2\\pi$ puntuan 0 berriro. Zeroak $x=k\\pi$ dira, $k$ zenbaki osoa izanik: infinitu ebaki-puntu ditu X ardatzarekin, eta Y ardatza $(0,\\,0)$ puntuan ebakitzen du. Funtzio bakoitia da: $\\sen(-x)=-\\sen x$, jatorriarekiko simetrikoa.',
            'La función $y=\\sen x$ da a cada ángulo la altura del punto de la circunferencia unidad. Está definida para cualquier ángulo: Dom $f=\\mathbb{R}$; y siempre está entre $-1$ y $1$: Rec $f=[-1,\\,1]$. Es periódica, de periodo $T=2\\pi$: la gráfica se dibuja en $[0,\\,2\\pi]$ y luego se repite. En ese intervalo: 0 en $x=0$, máximo (1) en $\\frac{\\pi}{2}$, 0 en $\\pi$, mínimo ($-1$) en $\\frac{3\\pi}{2}$ y otra vez 0 en $2\\pi$. Los ceros son $x=k\\pi$, con $k$ entero: tiene infinitos cortes con el eje X, y corta al eje Y en $(0,\\,0)$. Es una función impar: $\\sen(-x)=-\\sen x$, simétrica respecto al origen.',
            'تعطي الدالة $y=\\sen x$ لكل زاوية ارتفاع نقطة دائرة الوحدة. وهي معرّفة لكل زاوية: Dom $f=\\mathbb{R}$؛ وتقع دائمًا بين $-1$ و$1$: Rec $f=[-1,\\,1]$. وهي دورية دورها $T=2\\pi$: يُرسم الرسم في $[0,\\,2\\pi]$ ثم يتكرر. في تلك الفترة: 0 عند $x=0$، والعظمى (1) عند $\\frac{\\pi}{2}$، و0 عند $\\pi$، والصغرى ($-1$) عند $\\frac{3\\pi}{2}$، و0 مجددًا عند $2\\pi$. أصفارها $x=k\\pi$ حيث $k$ عدد صحيح: لها عدد لانهائي من نقاط التقاطع مع محور X، وتقطع محور Y في $(0,\\,0)$. وهي دالة فردية: $\\sen(-x)=-\\sen x$، متماثلة بالنسبة إلى الأصل.', 'The function $y=\\sin x$ gives each angle the height of the point on the unit circle. It is defined for any angle: Domain $f=\\mathbb{R}$; and it always lies between $-1$ and $1$: Range $f=[-1,\\,1]$. It is periodic, with period $T=2\\pi$: the graph is drawn over $[0,\\,2\\pi]$ and then repeats. In that interval: 0 at $x=0$, maximum (1) at $\\frac{\\pi}{2}$, 0 at $\\pi$, minimum ($-1$) at $\\frac{3\\pi}{2}$ and again 0 at $2\\pi$. The zeros are $x=k\\pi$, with $k$ an integer: it has infinitely many crossings with the x-axis, and it crosses the y-axis at $(0,\\,0)$. It is an odd function: $\\sin(-x)=-\\sin x$, symmetrical about the origin.'
        ),
        problem: say('Zein $x$-tan du $y=\\sen x$ funtzioak maximoa $[0,\\,4\\pi]$ tartean? Eta zenbat zero ditu?', '¿En qué $x$ tiene máximos $y=\\sen x$ en $[0,\\,4\\pi]$? ¿Y cuántos ceros?', 'عند أي $x$ تبلغ $y=\\sen x$ قيمها العظمى في $[0,\\,4\\pi]$؟ وكم صفرًا لها؟', 'At which $x$ does $y=\\sin x$ have maxima in $[0,\\,4\\pi]$? And how many zeros?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maximoak, $2\\pi$-z behin.', 'Máximos, uno cada $2\\pi$.', 'عظمى كل $2\\pi$.', 'Maxima, one every $2\\pi$.'), math: same('$x=\\frac{\\pi}{2},\\ \\frac{5\\pi}{2}$') },
            { text: say('Zeroak: $k\\pi$.', 'Ceros: $k\\pi$.', 'الأصفار: $k\\pi$.', 'Zeros: $k\\pi$.'), math: same('$0,\\ \\pi,\\ 2\\pi,\\ 3\\pi,\\ 4\\pi$') }
        ],
        example: same('$\\sen(x+2\\pi)=\\sen x$'),
        takeaway: say('sin x: periodoa 2π, ibiltartea [−1, 1], zeroak kπ, maximoa π/2 puntuan.', 'sen x: periodo 2π, recorrido [−1, 1], ceros en kπ, máximo en π/2.', 'sin x: الدور 2π، المدى [−1, 1]، الأصفار kπ، العظمى عند π/2.', 'sin x: period 2π, range [−1, 1], zeros at kπ, maximum at π/2.'),
        figure: (language) => <SineFigure language={language} />
    },
    {
        id: 'cosine',
        stage: 'trigonometric',
        title: say('$y=\\cos x$ funtzioa', 'La función $y=\\cos x$', 'الدالة $y=\\cos x$', 'The function $y=\\cos x$'),
        goal: say('Kosinu funtzioaren grafikoa eta propietateak ezagutzea eta sinuarekin erlazionatzea.', 'Conocer la gráfica y las propiedades de la función coseno y relacionarla con el seno.', 'التعرف إلى رسم دالة جيب التمام وخصائصها وربطها بالجيب.', 'Know the graph and properties of the cosine function and relate it to the sine.'),
        explanation: say(
            '$y=\\cos x$ funtzioak zirkunferentzia unitarioko puntuaren abzisa ematen du. Sinuaren propietate berberak ditu: Dom $f=\\mathbb{R}$, Rec $f=[-1,\\,1]$ eta $T=2\\pi$ periodoa. Baina 1etik hasten da: maximoa $x=0$ puntuan (eta $2\\pi$, $4\\pi$… puntuetan), minimoa $x=\\pi$ puntuan, eta zeroak $\\frac{\\pi}{2}$ eta $\\frac{3\\pi}{2}$ puntuetan, hau da, $x=\\frac{\\pi}{2}+k\\pi$. Y ardatza $(0,\\,1)$ puntuan ebakitzen du. Funtzio bikoitia da: $\\cos(-x)=\\cos x$, Y ardatzarekiko simetrikoa. Kosinuaren grafikoa sinuarena bera da, $\\frac{\\pi}{2}$ ezkerrera eramanda: $\\cos x=\\sen\\left(x+\\frac{\\pi}{2}\\right)$. Bi funtzioak beti betetzen dute $\\sen^{2}x+\\cos^{2}x=1$.',
            'La función $y=\\cos x$ da la abscisa del punto de la circunferencia unidad. Tiene las mismas propiedades que el seno: Dom $f=\\mathbb{R}$, Rec $f=[-1,\\,1]$ y periodo $T=2\\pi$. Pero empieza en 1: máximo en $x=0$ (y en $2\\pi$, $4\\pi$…), mínimo en $x=\\pi$, y ceros en $\\frac{\\pi}{2}$ y $\\frac{3\\pi}{2}$, es decir, en $x=\\frac{\\pi}{2}+k\\pi$. Corta al eje Y en $(0,\\,1)$. Es una función par: $\\cos(-x)=\\cos x$, simétrica respecto al eje Y. La gráfica del coseno es la del seno llevada $\\frac{\\pi}{2}$ a la izquierda: $\\cos x=\\sen\\left(x+\\frac{\\pi}{2}\\right)$. Las dos cumplen siempre $\\sen^{2}x+\\cos^{2}x=1$.',
            'تعطي الدالة $y=\\cos x$ الإحداثي السيني لنقطة دائرة الوحدة. ولها خصائص الجيب نفسها: Dom $f=\\mathbb{R}$ وRec $f=[-1,\\,1]$ والدور $T=2\\pi$. لكنها تبدأ من 1: العظمى عند $x=0$ (وعند $2\\pi$ و$4\\pi$…)، والصغرى عند $x=\\pi$، والأصفار عند $\\frac{\\pi}{2}$ و$\\frac{3\\pi}{2}$، أي $x=\\frac{\\pi}{2}+k\\pi$. وتقطع محور Y في $(0,\\,1)$. وهي دالة زوجية: $\\cos(-x)=\\cos x$، متماثلة بالنسبة إلى محور Y. ورسم جيب التمام هو رسم الجيب منقولًا $\\frac{\\pi}{2}$ إلى اليسار: $\\cos x=\\sen\\left(x+\\frac{\\pi}{2}\\right)$. وتحقق الدالتان دائمًا $\\sen^{2}x+\\cos^{2}x=1$.', 'The function $y=\\cos x$ gives the x-coordinate of the point on the unit circle. It has the same properties as the sine: Domain $f=\\mathbb{R}$, Range $f=[-1,\\,1]$ and period $T=2\\pi$. But it starts at 1: maximum at $x=0$ (and at $2\\pi$, $4\\pi$…), minimum at $x=\\pi$, and zeros at $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$, that is, at $x=\\frac{\\pi}{2}+k\\pi$. It crosses the y-axis at $(0,\\,1)$. It is an even function: $\\cos(-x)=\\cos x$, symmetrical about the y-axis. The graph of the cosine is the graph of the sine moved $\\frac{\\pi}{2}$ to the left: $\\cos x=\\sin\\left(x+\\frac{\\pi}{2}\\right)$. Both always satisfy $\\sin^{2}x+\\cos^{2}x=1$.'
        ),
        problem: say('Zenbat da $\\cos 3\\pi$? Eta zein da $y=\\cos x$ funtzioaren lehen zero positiboa?', '¿Cuánto vale $\\cos 3\\pi$? ¿Y cuál es el primer cero positivo de $y=\\cos x$?', 'كم يساوي $\\cos 3\\pi$؟ وما أول صفر موجب للدالة $y=\\cos x$؟', 'What is $\\cos 3\\pi$? And what is the first positive zero of $y=\\cos x$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu buelta bat.', 'Quita una vuelta.', 'احذف دورة.', 'Remove one full turn.'), math: same('$\\cos 3\\pi=\\cos\\pi=-1$') },
            { text: say('Lehen zeroa.', 'El primer cero.', 'أول صفر.', 'The first zero.'), math: same('$x=\\frac{\\pi}{2}$') }
        ],
        example: same('$\\cos(-x)=\\cos x$'),
        takeaway: say('cos x: sinua π/2 ezkerrera. Maximoa 0 puntuan, zeroak π/2 + kπ, bikoitia.', 'cos x: el seno π/2 a la izquierda. Máximo en 0, ceros en π/2 + kπ, par.', 'cos x: الجيب منقولًا π/2 إلى اليسار. العظمى عند 0، الأصفار π/2 + kπ، زوجية.', 'cos x: the sine moved π/2 to the left. Maximum at 0, zeros at π/2 + kπ, even.'),
        figure: (language) => <CosineFigure language={language} />
    },

    /* ---------- 5. Amplitude, period and tangent ---------- */
    {
        id: 'amplitude',
        stage: 'transforms',
        title: say('Anplitudea eta lekualdaketa bertikala', 'Amplitud y traslación vertical', 'السعة والانسحاب الرأسي', 'Amplitude and vertical translation'),
        goal: say('$y=A\\sen x+d$ funtzioen ibiltartea, maximoa eta minimoa kalkulatzea.', 'Calcular el recorrido, el máximo y el mínimo de $y=A\\sen x+d$.', 'حساب مدى $y=A\\sen x+d$ وقيمتيها العظمى والصغرى.', 'Calculate the range, the maximum and the minimum of $y=A\\sin x+d$.'),
        explanation: say(
            '$y=A\\sen x$ funtzioan $A$ biderkatzaileak gailurrak luzatzen ditu: balioak $-|A|$ eta $|A|$ artean daude. $|A|$ anplitudea da. $y=2\\sen x$ funtzioaren ibiltartea $[-2,\\,2]$ da, eta $y=-3\\cos x$ funtzioarena $[-3,\\,3]$ ($A$ negatiboak grafikoa irauli egiten du). $d$ batugaiak, $y=\\sen x+d$, kurba osoa gora edo behera eramaten du: $y=\\sen x+1$ funtzioaren ibiltartea $[0,\\,2]$ da. Biak batera: $y=A\\sen x+d$ funtzioaren ibiltartea $[d-|A|,\\,d+|A|]$ da; maximoa $d+|A|$ eta minimoa $d-|A|$. Adibidez, itsasoko marea $h=2\\sen x+5$ bada (metroak), 3 m eta 7 m artean dabil. Periodoa ez da aldatzen: $2\\pi$ izaten jarraitzen du.',
            'En $y=A\\sen x$ el factor $A$ estira las crestas: los valores están entre $-|A|$ y $|A|$. $|A|$ es la amplitud. El recorrido de $y=2\\sen x$ es $[-2,\\,2]$ y el de $y=-3\\cos x$, $[-3,\\,3]$ (una $A$ negativa da la vuelta a la gráfica). El sumando $d$, en $y=\\sen x+d$, sube o baja toda la curva: el recorrido de $y=\\sen x+1$ es $[0,\\,2]$. Las dos cosas a la vez: el recorrido de $y=A\\sen x+d$ es $[d-|A|,\\,d+|A|]$; el máximo es $d+|A|$ y el mínimo $d-|A|$. Por ejemplo, si la marea es $h=2\\sen x+5$ (metros), se mueve entre 3 m y 7 m. El periodo no cambia: sigue siendo $2\\pi$.',
            'في $y=A\\sen x$ يمدّ المعامل $A$ القمم: تقع القيم بين $-|A|$ و$|A|$. و$|A|$ هي السعة. مدى $y=2\\sen x$ هو $[-2,\\,2]$ ومدى $y=-3\\cos x$ هو $[-3,\\,3]$ ($A$ السالبة تقلب الرسم). والحد المضاف $d$ في $y=\\sen x+d$ يرفع المنحنى كله أو ينزله: مدى $y=\\sen x+1$ هو $[0,\\,2]$. والأمران معًا: مدى $y=A\\sen x+d$ هو $[d-|A|,\\,d+|A|]$؛ والعظمى $d+|A|$ والصغرى $d-|A|$. مثلًا إذا كان المدّ $h=2\\sen x+5$ (بالأمتار) فهو يتحرك بين 3 م و7 م. والدور لا يتغير: يبقى $2\\pi$.', 'In $y=A\\sin x$ the factor $A$ stretches the peaks: the values lie between $-|A|$ and $|A|$. $|A|$ is the amplitude. The range of $y=2\\sin x$ is $[-2,\\,2]$, and that of $y=-3\\cos x$ is $[-3,\\,3]$ (a negative $A$ flips the graph over). The term $d$, in $y=\\sin x+d$, raises or lowers the whole curve: the range of $y=\\sin x+1$ is $[0,\\,2]$. Both at once: the range of $y=A\\sin x+d$ is $[d-|A|,\\,d+|A|]$; the maximum is $d+|A|$ and the minimum $d-|A|$. For example, if the tide is $h=2\\sin x+5$ (metres), it moves between 3 m and 7 m. The period does not change: it is still $2\\pi$.'
        ),
        problem: say('Kalkulatu $y=3\\sen x-1$ funtzioaren maximoa eta minimoa.', 'Halla el máximo y el mínimo de $y=3\\sen x-1$.', 'أوجد القيمة العظمى والصغرى لـ $y=3\\sen x-1$.', 'Find the maximum and minimum of $y=3\\sin x-1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maximoa: $\\sen x=1$.', 'Máximo: $\\sen x=1$.', 'العظمى: $\\sen x=1$.', 'Maximum: $\\sin x=1$.'), math: same('$3-1=2$') },
            { text: say('Minimoa: $\\sen x=-1$.', 'Mínimo: $\\sen x=-1$.', 'الصغرى: $\\sen x=-1$.', 'Minimum: $\\sin x=-1$.'), math: same('$-3-1=-4$') }
        ],
        example: same('$[d-|A|,\\,d+|A|]$'),
        takeaway: say('A · sin x + d: anplitudea |A|, erdiko maila d. Ibiltartea [d − |A|, d + |A|].', 'A · sen x + d: amplitud |A|, nivel medio d. Recorrido [d − |A|, d + |A|].', 'A · sin x + d: السعة |A| والمستوى الأوسط d. المدى [d − |A|, d + |A|].', 'A · sin x + d: amplitude |A|, midline d. Range [d − |A|, d + |A|].'),
        figure: (language) => <AmplitudeFigure language={language} />
    },
    {
        id: 'period',
        stage: 'transforms',
        title: say('$y=\\sen kx$ funtzioaren periodoa', 'El periodo de $y=\\sen kx$', 'دور $y=\\sen kx$', 'The period of $y=\\sin kx$'),
        goal: say('$y=\\sen kx$ eta $y=\\cos kx$ funtzioen periodoa kalkulatzea eta grafikoan irakurtzea.', 'Calcular el periodo de $y=\\sen kx$ y $y=\\cos kx$ y leerlo en la gráfica.', 'حساب دور $y=\\sen kx$ و$y=\\cos kx$ وقراءته على الرسم.', 'Calculate the period of $y=\\sin kx$ and $y=\\cos kx$ and read it from the graph.'),
        explanation: say(
            '$x$ $k$-z biderkatzean, angelua $k$ aldiz azkarrago doa, eta uhinak estuagoak dira. $y=\\sen kx$ funtzioaren periodoa $T=\\frac{2\\pi}{|k|}$ da: $\\sen 2x$ funtzioak $\\pi$ periodoa du, $\\sen 2(x+\\pi)=\\sen(2x+2\\pi)=\\sen 2x$ delako; $\\cos 3x$ funtzioak $\\frac{2\\pi}{3}$; eta $\\sen\\frac{x}{2}$ funtzioak $4\\pi$ (motelago doa). $k$-k ez du altuera aldatzen: $\\sen 2x$ funtzioaren ibiltartea $[-1,\\,1]$ da oraindik. Grafikoan, periodoa bi maximo jarraien arteko distantzia da. Alderantziz: periodoa $\\pi$ bada, $k=\\frac{2\\pi}{\\pi}=2$. Fenomeno periodikoak horrela modelizatzen dira: segundoko 50 aldiz errepikatzen den korronte batek $T=\\frac{1}{50}$ s du.',
            'Al multiplicar $x$ por $k$, el ángulo avanza $k$ veces más deprisa y las ondas se aprietan. El periodo de $y=\\sen kx$ es $T=\\frac{2\\pi}{|k|}$: $\\sen 2x$ tiene periodo $\\pi$, porque $\\sen 2(x+\\pi)=\\sen(2x+2\\pi)=\\sen 2x$; $\\cos 3x$, $\\frac{2\\pi}{3}$; y $\\sen\\frac{x}{2}$, $4\\pi$ (va más despacio). $k$ no cambia la altura: el recorrido de $\\sen 2x$ sigue siendo $[-1,\\,1]$. En la gráfica, el periodo es la distancia entre dos máximos seguidos. Al revés: si el periodo es $\\pi$, $k=\\frac{2\\pi}{\\pi}=2$. Así se modelizan fenómenos periódicos: una corriente que se repite 50 veces por segundo tiene $T=\\frac{1}{50}$ s.',
            'عند ضرب $x$ في $k$ تتقدم الزاوية أسرع $k$ مرة وتتقارب الموجات. دور $y=\\sen kx$ هو $T=\\frac{2\\pi}{|k|}$: دور $\\sen 2x$ هو $\\pi$ لأن $\\sen 2(x+\\pi)=\\sen(2x+2\\pi)=\\sen 2x$؛ ودور $\\cos 3x$ هو $\\frac{2\\pi}{3}$؛ ودور $\\sen\\frac{x}{2}$ هو $4\\pi$ (أبطأ). و$k$ لا يغير الارتفاع: يبقى مدى $\\sen 2x$ هو $[-1,\\,1]$. وعلى الرسم الدور هو المسافة بين قيمتين عظميين متتاليتين. وبالعكس: إذا كان الدور $\\pi$ فإن $k=\\frac{2\\pi}{\\pi}=2$. وهكذا تُنمذج الظواهر الدورية: تيار يتكرر 50 مرة في الثانية دوره $T=\\frac{1}{50}$ ث.', 'When you multiply $x$ by $k$, the angle moves $k$ times faster and the waves squeeze together. The period of $y=\\sin kx$ is $T=\\frac{2\\pi}{|k|}$: $\\sin 2x$ has period $\\pi$, because $\\sin 2(x+\\pi)=\\sin(2x+2\\pi)=\\sin 2x$; $\\cos 3x$ has $\\frac{2\\pi}{3}$; and $\\sin\\frac{x}{2}$ has $4\\pi$ (it goes more slowly). $k$ does not change the height: the range of $\\sin 2x$ is still $[-1,\\,1]$. On the graph, the period is the distance between two consecutive maxima. The other way round: if the period is $\\pi$, $k=\\frac{2\\pi}{\\pi}=2$. This is how periodic phenomena are modelled: an electric current that repeats 50 times a second has $T=\\frac{1}{50}$ s.'
        ),
        problem: say('Kalkulatu $y=\\cos 4x$ funtzioaren periodoa eta lehen maximo positiboa.', 'Halla el periodo de $y=\\cos 4x$ y su primer máximo positivo.', 'أوجد دور $y=\\cos 4x$ وأول قيمة عظمى موجبة لها.', 'Find the period of $y=\\cos 4x$ and its first positive maximum.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Periodoa.', 'El periodo.', 'الدور.', 'The period.'), math: same('$T=\\frac{2\\pi}{4}=\\frac{\\pi}{2}$') },
            { text: say('$x=0$ ondoren, periodo bat geroago.', 'Tras $x=0$, un periodo después.', 'بعد $x=0$ بدور واحد.', 'After $x=0$, one period later.'), math: same('$x=\\frac{\\pi}{2}$') }
        ],
        example: same('$T=\\frac{2\\pi}{k}$'),
        takeaway: say('sin kx eta cos kx: periodoa 2π/k. k handiagoa, uhin estuagoak; altuera berdina.', 'sen kx y cos kx: periodo 2π/k. k mayor, ondas más apretadas; la misma altura.', 'sin kx وcos kx: الدور 2π/k. k أكبر: موجات أضيق؛ الارتفاع نفسه.', 'sin kx and cos kx: period 2π/k. Larger k, tighter waves; the same height.'),
        figure: (language) => <PeriodFigure language={language} />
    },
    {
        id: 'tangent',
        stage: 'transforms',
        title: say('$y=\\tg x$ funtzioa', 'La función $y=\\tg x$', 'الدالة $y=\\tg x$', 'The function $y=\\tan x$'),
        goal: say('Tangente funtzioaren grafikoa, periodoa, asintotak eta izate-eremua ezagutzea.', 'Conocer la gráfica, el periodo, las asíntotas y el dominio de la función tangente.', 'التعرف إلى رسم دالة الظل ودورها ومقارباتها ومجالها.', 'Know the graph, the period, the asymptotes and the domain of the tangent function.'),
        explanation: say(
            'Tangentea sinua zati kosinua da: $\\tg x=\\frac{\\sen x}{\\cos x}$. Ez dago definituta kosinua 0 den lekuetan, $x=\\frac{\\pi}{2}+k\\pi$ puntuetan: Dom $f=\\mathbb{R}-\\left\\{\\frac{\\pi}{2}+k\\pi\\right\\}$. Puntu horietan asintota bertikalak ditu, eta grafikoa adarrez osatuta dago. Haren ibiltartea $\\mathbb{R}$ osoa da. Periodoa $\\pi$ da, ez $2\\pi$: $\\tg(x+\\pi)=\\tg x$, sinuak eta kosinuak biek zeinua aldatzen dutelako. Adar bakoitzean gorakorra da eta jatorritik pasatzen da: $\\tg 0=0$, $\\tg\\frac{\\pi}{4}=1$, $\\tg\\left(-\\frac{\\pi}{4}\\right)=-1$. Funtzio bakoitia da. Zeroak sinuarenak dira, $x=k\\pi$.',
            'La tangente es el seno entre el coseno: $\\tg x=\\frac{\\sen x}{\\cos x}$. No está definida donde el coseno vale 0, en $x=\\frac{\\pi}{2}+k\\pi$: Dom $f=\\mathbb{R}-\\left\\{\\frac{\\pi}{2}+k\\pi\\right\\}$. En esos puntos tiene asíntotas verticales, y la gráfica está formada por ramas. Su recorrido es todo $\\mathbb{R}$. El periodo es $\\pi$, no $2\\pi$: $\\tg(x+\\pi)=\\tg x$, porque el seno y el coseno cambian los dos de signo. En cada rama es creciente y pasa por el origen: $\\tg 0=0$, $\\tg\\frac{\\pi}{4}=1$, $\\tg\\left(-\\frac{\\pi}{4}\\right)=-1$. Es una función impar. Sus ceros son los del seno, $x=k\\pi$.',
            'الظل هو الجيب مقسومًا على جيب التمام: $\\tg x=\\frac{\\sen x}{\\cos x}$. وهو غير معرّف حيث يساوي جيب التمام 0، عند $x=\\frac{\\pi}{2}+k\\pi$: Dom $f=\\mathbb{R}-\\left\\{\\frac{\\pi}{2}+k\\pi\\right\\}$. وفي هذه النقاط له مقاربات رأسية، ويتكوّن الرسم من فروع. ومداه $\\mathbb{R}$ كله. ودوره $\\pi$ لا $2\\pi$: $\\tg(x+\\pi)=\\tg x$ لأن الجيب وجيب التمام كليهما يغيّران إشارتهما. وهو متزايد في كل فرع ويمر بالأصل: $\\tg 0=0$ و$\\tg\\frac{\\pi}{4}=1$ و$\\tg\\left(-\\frac{\\pi}{4}\\right)=-1$. وهو دالة فردية. وأصفاره أصفار الجيب $x=k\\pi$.', 'The tangent is the sine divided by the cosine: $\\tan x=\\frac{\\sin x}{\\cos x}$. It is not defined where the cosine is 0, at $x=\\frac{\\pi}{2}+k\\pi$: Domain $f=\\mathbb{R}-\\left\\{\\frac{\\pi}{2}+k\\pi\\right\\}$. At those points it has vertical asymptotes, and the graph is made up of branches. Its range is all of $\\mathbb{R}$. The period is $\\pi$, not $2\\pi$: $\\tan(x+\\pi)=\\tan x$, because the sine and the cosine both change sign. On each branch it is increasing and passes through the origin: $\\tan 0=0$, $\\tan\\frac{\\pi}{4}=1$, $\\tan\\left(-\\frac{\\pi}{4}\\right)=-1$. It is an odd function. Its zeros are the same as those of the sine, $x=k\\pi$.'
        ),
        problem: say('Kalkulatu $\\tg\\frac{5\\pi}{4}$. Zein da $\\frac{\\pi}{2}$ ondorengo asintota?', 'Calcula $\\tg\\frac{5\\pi}{4}$. ¿Cuál es la asíntota después de $\\frac{\\pi}{2}$?', 'احسب $\\tg\\frac{5\\pi}{4}$. ما المقارب التالي بعد $\\frac{\\pi}{2}$؟', 'Calculate $\\tan\\frac{5\\pi}{4}$. What is the asymptote after $\\frac{\\pi}{2}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Periodoa $\\pi$: kendu $\\pi$.', 'Periodo $\\pi$: quita $\\pi$.', 'الدور $\\pi$: اطرح $\\pi$.', 'Period $\\pi$: take away $\\pi$.'), math: same('$\\tg\\frac{5\\pi}{4}=\\tg\\frac{\\pi}{4}=1$') },
            { text: say('Asintotak $\\pi$-z behin.', 'Una asíntota cada $\\pi$.', 'مقارب كل $\\pi$.', 'One asymptote every $\\pi$.'), math: same('$x=\\frac{3\\pi}{2}$') }
        ],
        example: same('$\\tg x=\\frac{\\sen x}{\\cos x}$'),
        takeaway: say('tg x: periodoa π, asintotak π/2 + kπ puntuetan, adar bakoitzean gorakorra.', 'tg x: periodo π, asíntotas en π/2 + kπ, creciente en cada rama.', 'tan x: الدور π، المقاربات عند π/2 + kπ، متزايدة في كل فرع.', 'tan x: period π, asymptotes at π/2 + kπ, increasing on each branch.'),
        figure: (language) => <TangentFigure language={language} />
    }
]
