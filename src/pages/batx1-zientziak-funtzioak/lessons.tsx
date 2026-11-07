import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { SymmetryFigure } from '../dbh4-akademikoak-funtzioak/figures'
import { LogGraphFigure } from '../dbh4-akademikoak-esponentzialak/figures'
import { AbsoluteGraphFigure, ArcFigure, CompositionFigure, DomainFigure, MachineFigure, MirrorFigure, OperationsFigure, PeriodicFigure, PiecewiseBachFigure, ReflectionsFigure, ShiftsFigure, StairsFigure, StretchFigure } from './figures'
import { bachFunctionsLessonChecks, type BachFunctionsTopicId } from './lessonChecks'
import { bachFunctionsLessonTexts } from './lessonTexts'
import { localizeNames, same, say } from './text'

/* ==========================================================================
   Funtzio elementalak · Batxilergoa 1 · Zientziak — stages and lessons.
   The scope follows unit 8 of Santillana 1.º Bachillerato Ciencias, in its
   order (domain and symmetry, transformations, the inverse, exponential,
   logarithmic and arc functions, piecewise functions, operations and
   composition), with unit 10 of Anaya Matemáticas I (the integer part, the
   chains of transformations, branches of an inverse). The families seen in
   4. DBH académicas (lines, parabolas, hyperbolas, radicals, exponentials)
   come back through «Review first» links; what 1.º adds is taught in
   depth. The integer part is written E(x) in every language.
   ========================================================================== */

export type BachFunctionsStageId = 'study' | 'transforms' | 'inverse' | 'piecewise' | 'operations'

export const bachFunctionsStages: UnitStage[] = [
    { id: 'study', tone: 'blue', title: { eu: 'Funtzio baten azterketa', es: 'Estudio de una función', en: 'Studying a function', ar: 'دراسة دالة' } },
    { id: 'transforms', tone: 'violet', title: { eu: 'Transformazioak', es: 'Transformaciones', en: 'Transformations', ar: 'التحويلات' } },
    { id: 'inverse', tone: 'mustard', title: { eu: 'Alderantzizko funtzioa', es: 'Función inversa', en: 'The inverse function', ar: 'الدالة العكسية' } },
    { id: 'piecewise', tone: 'coral', title: { eu: 'Zatika definitutako funtzioak', es: 'Funciones a trozos', en: 'Piecewise functions', ar: 'الدوال المعرّفة على أجزاء' } },
    { id: 'operations', tone: 'green', title: { eu: 'Eragiketak eta konposizioa', es: 'Operaciones y composición', en: 'Operations and composition', ar: 'العمليات والتركيب' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Studying a function ---------- */
    {
        id: 'domain',
        stage: 'study',
        title: say('Izate-eremua: baldintza guztiak batera', 'Dominio: todas las condiciones a la vez', 'المجال: كل الشروط معًا', 'Domain: every condition at once'),
        goal: say('Erroak, zatikiak eta logaritmoak batera dituen funtzio baten izate-eremua aurkitzea, baldintza guztien ebakidura hartuta.', 'Hallar el dominio de una función con raíces, fracciones y logaritmos a la vez, intersecando todas sus condiciones.', 'إيجاد مجال دالة فيها جذور وكسور ولوغاريتمات معًا، بتقاطع كل شروطها.', 'Find the domain of a function with roots, fractions and logarithms at once, by intersecting all its conditions.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'mixed-domain', title: { eu: 'Izate-eremuak konbinatzea', es: 'Dominios combinados', en: 'Combined domains', ar: 'مجالات مركّبة' } },
            { unit: 'dbh4-akademikoak/funciones-exponenciales', topic: 'log-graph', title: { eu: 'Funtzio logaritmikoa', es: 'La función logarítmica', en: 'The logarithmic function', ar: 'الدالة اللوغاريتمية' } }
        ],
        problem: say('Aurkitu $f(x)=\\frac{\\sqrt{x+2}}{x-3}$ funtzioaren izate-eremua.', 'Halla el dominio de $f(x)=\\frac{\\sqrt{x+2}}{x-3}$.', 'أوجد مجال $f(x)=\\frac{\\sqrt{x+2}}{x-3}$.', 'Find the domain of $f(x)=\\frac{\\sqrt{x+2}}{x-3}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erroak errokizun ez-negatiboa eskatzen du.', 'La raíz pide un radicando no negativo.', 'يشترط الجذر أن يكون ما تحته غير سالب.', 'The root needs a radicand that is not negative.'), math: same('$x+2\\ge 0\\ \\to\\ x\\ge -2$') },
            { text: say('Izendatzaileak ezin du 0 izan.', 'El denominador no puede ser 0.', 'لا يمكن أن يكون المقام 0.', 'The denominator cannot be 0.'), math: same('$x-3\\neq 0\\ \\to\\ x\\neq 3$') },
            { text: say('Biak batera: bien ebakidura.', 'Las dos a la vez: la intersección.', 'الشرطان معًا: التقاطع.', 'Both at once: the intersection.'), math: same('$[-2,3)\\cup(3,+\\infty)$') }
        ],
        takeaway: say('Idatzi baldintza bakoitza: erro bikoitiaren barrukoa $\\ge 0$, izendatzailea $\\neq 0$ eta logaritmoaren barrukoa $>0$. Izate-eremua guztien zati komuna da.', 'Apunta cada condición: lo de dentro de una raíz par, $\\ge 0$; el denominador, $\\neq 0$; y lo de dentro de un logaritmo, $>0$. El dominio es la parte común de todas.', 'اكتب كل شرط: ما تحت الجذر الزوجي $\\ge 0$، والمقام $\\neq 0$، وما داخل اللوغاريتم $>0$. والمجال هو الجزء المشترك بينها كلها.', 'Write down each condition: what is inside an even root, $\\ge 0$; the denominator, $\\neq 0$; and what is inside a logarithm, $>0$. The domain is the part they all share.'),
        figure: (language) => <DomainFigure language={language} />
    },
    {
        id: 'symmetry',
        stage: 'study',
        title: say('Simetriak: funtzio bikoitiak eta bakoitiak', 'Simetrías: funciones pares e impares', 'التناظر: الدوال الزوجية والفردية', 'Symmetry: even and odd functions'),
        goal: say('$f(-x)$ kalkulatuz, funtzio bat bikoitia, bakoitia edo bat ere ez den erabakitzea, baita funtzio arrazionaletan ere.', 'Decidir si una función es par, impar o ninguna de las dos calculando $f(-x)$, también en funciones racionales.', 'تحديد ما إذا كانت الدالة زوجية أو فردية أو لا هذه ولا تلك بحساب $f(-x)$، ومنها الدوال الكسرية.', 'Decide whether a function is even, odd or neither by working out $f(-x)$, rational functions included.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'symmetry', title: { eu: 'Funtzio bikoitiak eta bakoitiak', es: 'Funciones pares e impares', en: 'Even and odd functions', ar: 'الدوال الزوجية والفردية' } }
        ],
        problem: say('Aztertu $f(x)=\\frac{x}{x^2+1}$ funtzioaren simetria.', 'Estudia la simetría de $f(x)=\\frac{x}{x^2+1}$.', 'ادرس تناظر $f(x)=\\frac{x}{x^2+1}$.', 'Study the symmetry of $f(x)=\\frac{x}{x^2+1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izate-eremua $\\mathbb{R}$ da: simetrikoa.', 'El dominio es $\\mathbb{R}$: es simétrico.', 'المجال $\\mathbb{R}$: إنه متناظر.', 'The domain is $\\mathbb{R}$: it is symmetric.') },
            { text: say('Jarri $-x$, $x$ ordez.', 'Cambia $x$ por $-x$.', 'ضع $-x$ مكان $x$.', 'Change $x$ into $-x$.'), math: same('$f(-x)=\\frac{-x}{(-x)^2+1}=\\frac{-x}{x^2+1}$') },
            { text: say('Konparatu: $f(-x)=-f(x)$. Bakoitia da, jatorriarekiko simetrikoa.', 'Compara: $f(-x)=-f(x)$. Es impar, simétrica respecto del origen.', 'قارن: $f(-x)=-f(x)$. إنها فردية، متناظرة حول الأصل.', 'Compare: $f(-x)=-f(x)$. It is odd, symmetric about the origin.') }
        ],
        takeaway: say('Kalkulatu $f(-x)$: $f(x)$ ateratzen bada, bikoitia da (Y ardatzarekiko simetrikoa); $-f(x)$ ateratzen bada, bakoitia (jatorriarekiko simetrikoa). Bestela, ez du simetria horietako bat ere.', 'Calcula $f(-x)$: si da $f(x)$, es par (simétrica respecto del eje Y); si da $-f(x)$, es impar (simétrica respecto del origen). Si no, no tiene esas simetrías.', 'احسب $f(-x)$: إذا أعطت $f(x)$ فالدالة زوجية (متناظرة حول محور Y)، وإذا أعطت $-f(x)$ ففردية (متناظرة حول الأصل). وإلا فليس لها هذان التناظران.', 'Work out $f(-x)$: if you get $f(x)$, it is even (symmetric about the y-axis); if you get $-f(x)$, it is odd (symmetric about the origin). If not, it has neither symmetry.'),
        figure: (language) => <SymmetryFigure language={language} />
    },
    {
        id: 'periodic',
        stage: 'study',
        title: say('Funtzio periodikoak', 'Funciones periódicas', 'الدوال الدورية', 'Periodic functions'),
        goal: say('Funtzio periodiko baten balioak bere lehen zatira itzuliz kalkulatzea, eta $\\cos kx$ motako funtzioen periodoa aurkitzea.', 'Calcular valores de una función periódica llevándolos a su primer trozo, y hallar el periodo de funciones como $\\cos kx$.', 'حساب قيم دالة دورية بإرجاعها إلى جزئها الأول، وإيجاد دور دوال مثل $\\cos kx$.', 'Work out values of a periodic function by bringing them back to its first piece, and find the period of functions such as $\\cos kx$.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'periodic', title: { eu: 'Periodikotasuna eta joera', es: 'Periodicidad y tendencia', en: 'Periodicity and trend', ar: 'الدورية والاتجاه' } },
            { unit: 'dbh4-akademikoak/funciones-exponenciales', topic: 'cosine', title: { eu: 'Kosinu funtzioa', es: 'La función coseno', en: 'The cosine function', ar: 'دالة جيب التمام' } }
        ],
        problem: say('$f$ funtzioaren periodoa 4 da, eta $[-2,2)$ tartean $f(x)=x^2$. Kalkulatu $f(7)$.', 'Una función $f$ tiene periodo 4 y en $[-2,2)$ vale $f(x)=x^2$. Calcula $f(7)$.', 'دور الدالة $f$ هو 4، وفي $[-2,2)$ تكون $f(x)=x^2$. احسب $f(7)$.', 'A function $f$ has period 4 and on $[-2,2)$ it is $f(x)=x^2$. Work out $f(7)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu periodoak, $[-2,2)$ tartera iritsi arte.', 'Quita periodos hasta caer en $[-2,2)$.', 'اطرح أدوارًا حتى تقع في $[-2,2)$.', 'Take away periods until you land in $[-2,2)$.'), math: same('$7-4-4=-1$') },
            { text: say('Balioa berdina da.', 'El valor es el mismo.', 'القيمة نفسها.', 'The value is the same.'), math: same('$f(7)=f(3)=f(-1)$') },
            { text: say('Erabili lehen zatiko formula.', 'Usa la fórmula del primer trozo.', 'استعمل صيغة الجزء الأول.', 'Use the formula of the first piece.'), math: same('$f(-1)=(-1)^2=1$') }
        ],
        takeaway: say('$f$ funtzioaren periodoa $T$ bada, $f(x+T)=f(x)$: nahikoa da $T$ luzerako zati bat ezagutzea. $\\cos kx$ funtzioaren periodoa $\\frac{2\\pi}{k}$ da.', 'Si $f$ tiene periodo $T$, $f(x+T)=f(x)$: basta con conocer un trozo de longitud $T$. El periodo de $\\cos kx$ es $\\frac{2\\pi}{k}$.', 'إذا كان دور $f$ هو $T$ فإن $f(x+T)=f(x)$: يكفي أن نعرف جزءًا طوله $T$. ودور $\\cos kx$ هو $\\frac{2\\pi}{k}$.', 'If $f$ has period $T$, $f(x+T)=f(x)$: it is enough to know one piece of length $T$. The period of $\\cos kx$ is $\\frac{2\\pi}{k}$.'),
        figure: (language) => <PeriodicFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Transformations ---------- */
    {
        id: 'shifts',
        stage: 'transforms',
        title: say('Lekualdaketak', 'Traslaciones', 'الانسحابات', 'Translations'),
        goal: say('$y=f(x)+k$ eta $y=f(x-a)$ funtzioen grafikoak $f$ funtzioarenetik marraztea, eta puntu baten bidea jarraitzea.', 'Dibujar las gráficas de $y=f(x)+k$ e $y=f(x-a)$ a partir de la de $f$, y seguir adónde va un punto.', 'رسم $y=f(x)+k$ و$y=f(x-a)$ انطلاقًا من رسم $f$، وتتبّع أين تذهب نقطة.', 'Draw the graphs of $y=f(x)+k$ and $y=f(x-a)$ from that of $f$, and follow where a point goes.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'vertex-form', title: { eu: 'Parabolen lekualdaketak', es: 'Traslaciones de parábolas', en: 'Translations of parabolas', ar: 'انسحابات القطوع المكافئة' } },
            { unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'hyperbola-shift', title: { eu: 'Hiperbolen lekualdaketak', es: 'Traslaciones de hipérbolas', en: 'Translations of hyperbolas', ar: 'انسحابات القطوع الزائدة' } }
        ],
        problem: say('Marraztu $y=\\sqrt{x+3}-2$, $y=\\sqrt{x}$ funtziotik abiatuta.', 'Dibuja $y=\\sqrt{x+3}-2$ a partir de $y=\\sqrt{x}$.', 'ارسم $y=\\sqrt{x+3}-2$ انطلاقًا من $y=\\sqrt{x}$.', 'Draw $y=\\sqrt{x+3}-2$ starting from $y=\\sqrt{x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\sqrt{x}$ funtzioa $(0,0)$ puntuan hasten da.', '$\\sqrt{x}$ empieza en $(0,0)$.', 'تبدأ $\\sqrt{x}$ من $(0,0)$.', '$\\sqrt{x}$ starts at $(0,0)$.') },
            { text: say('$x+3$: 3 unitate ezkerrera.', '$x+3$: 3 unidades a la izquierda.', '$x+3$: ثلاث وحدات إلى اليسار.', '$x+3$: 3 units to the left.'), math: same('$(0,0)\\ \\to\\ (-3,0)$') },
            { text: say('$-2$: 2 unitate behera.', '$-2$: 2 unidades hacia abajo.', '$-2$: وحدتان إلى الأسفل.', '$-2$: 2 units down.'), math: same('$(-3,0)\\ \\to\\ (-3,-2)$') }
        ],
        takeaway: say('$y=f(x)+k$ funtzioak grafikoa $k$ unitate igotzen du ($k<0$ bada, jaitsi). $y=f(x-a)$ funtzioak $a$ unitate eramaten du eskuinera: barruko zeinuak engainatzen du.', '$y=f(x)+k$ sube la gráfica $k$ unidades (la baja si $k<0$). $y=f(x-a)$ la mueve $a$ unidades a la derecha: el signo de dentro engaña.', '$y=f(x)+k$ ترفع الرسم $k$ وحدة (وتخفضه إذا كان $k<0$). و$y=f(x-a)$ تنقله $a$ وحدة إلى اليمين: الإشارة الداخلية خادعة.', '$y=f(x)+k$ raises the graph $k$ units (lowers it if $k<0$). $y=f(x-a)$ moves it $a$ units to the right: the sign inside is tricky.'),
        figure: (language) => <ShiftsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'reflections',
        stage: 'transforms',
        title: say('Grafikoa ardatzetan islatzea', 'Reflejar una gráfica en los ejes', 'عكس الرسم في المحورين', 'Reflecting a graph in the axes'),
        goal: say('$y=-f(x)$ eta $y=f(-x)$ bereiztea: lehenak X ardatzean islatzen du, eta bigarrenak Y ardatzean.', 'Distinguir $y=-f(x)$ de $y=f(-x)$: la primera refleja en el eje X y la segunda, en el eje Y.', 'التمييز بين $y=-f(x)$ و$y=f(-x)$: الأولى تعكس في محور X والثانية في محور Y.', 'Tell $y=-f(x)$ from $y=f(-x)$: the first reflects in the x-axis and the second in the y-axis.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'symmetry', title: { eu: 'Funtzio bikoitiak eta bakoitiak', es: 'Funciones pares e impares', en: 'Even and odd functions', ar: 'الدوال الزوجية والفردية' } }
        ],
        problem: say('$f$ funtzioaren grafikoa $(2,5)$ puntutik pasatzen da. Zein puntutatik pasatzen dira $y=-f(x)$, $y=f(-x)$ eta $y=-f(-x)$?', 'La gráfica de $f$ pasa por $(2,5)$. ¿Por qué punto pasan $y=-f(x)$, $y=f(-x)$ e $y=-f(-x)$?', 'يمر رسم $f$ بالنقطة $(2,5)$. بأي نقطة تمر $y=-f(x)$ و$y=f(-x)$ و$y=-f(-x)$؟', 'The graph of $f$ passes through $(2,5)$. Which point do $y=-f(x)$, $y=f(-x)$ and $y=-f(-x)$ pass through?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$-f(x)$: $y$ balioaren zeinua aldatzen da. X ardatzean islatuta.', '$-f(x)$: cambia el signo de la $y$. Reflejada en el eje X.', '$-f(x)$: تتغير إشارة $y$. منعكسة في محور X.', '$-f(x)$: the sign of $y$ changes. Reflected in the x-axis.'), math: same('$(2,5)\\ \\to\\ (2,-5)$') },
            { text: say('$f(-x)$: $x$ balioaren zeinua aldatzen da. Y ardatzean islatuta.', '$f(-x)$: cambia el signo de la $x$. Reflejada en el eje Y.', '$f(-x)$: تتغير إشارة $x$. منعكسة في محور Y.', '$f(-x)$: the sign of $x$ changes. Reflected in the y-axis.'), math: same('$(2,5)\\ \\to\\ (-2,5)$') },
            { text: say('$-f(-x)$: biak. Jatorriarekiko simetrikoa.', '$-f(-x)$: las dos. Simétrica respecto del origen.', '$-f(-x)$: الاثنتان. متناظرة حول الأصل.', '$-f(-x)$: both. Symmetric about the origin.'), math: same('$(2,5)\\ \\to\\ (-2,-5)$') }
        ],
        takeaway: say('Kanpoko zeinuak, $-f(x)$, X ardatzean islatzen du; barrukoak, $f(-x)$, Y ardatzean.', 'El signo de fuera, $-f(x)$, refleja en el eje X; el de dentro, $f(-x)$, en el eje Y.', 'الإشارة الخارجية، $-f(x)$، تعكس في محور X، والداخلية، $f(-x)$، في محور Y.', 'The sign outside, $-f(x)$, reflects in the x-axis; the one inside, $f(-x)$, in the y-axis.'),
        figure: (language) => <ReflectionsFigure language={language} />
    },
    {
        id: 'stretch',
        stage: 'transforms',
        title: say('Grafikoa luzatzea eta estutzea', 'Estirar y comprimir una gráfica', 'تمديد الرسم وتقليصه', 'Stretching and squeezing a graph'),
        goal: say('$y=k\\cdot f(x)$ eta $y=f(kx)$ bereiztea, eta hainbat transformazio segidan aplikatzea puntu bati.', 'Distinguir $y=k\\cdot f(x)$ de $y=f(kx)$ y aplicar a un punto varias transformaciones seguidas.', 'التمييز بين $y=k\\cdot f(x)$ و$y=f(kx)$ وتطبيق عدة تحويلات متتالية على نقطة.', 'Tell $y=k\\cdot f(x)$ from $y=f(kx)$ and apply several transformations in a row to a point.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones-exponenciales', topic: 'amplitude', title: { eu: 'Anplitudea eta lekualdaketa bertikala', es: 'Amplitud y traslación vertical', en: 'Amplitude and vertical translation', ar: 'السعة والانسحاب الرأسي' } }
        ],
        problem: say('$f$ funtzioaren grafikoa $(4,6)$ puntutik pasatzen da. Zein puntutatik pasatzen dira $y=3f(x)$ eta $y=f(2x)$?', 'La gráfica de $f$ pasa por $(4,6)$. ¿Por qué punto pasan $y=3f(x)$ e $y=f(2x)$?', 'يمر رسم $f$ بالنقطة $(4,6)$. بأي نقطة تمر $y=3f(x)$ و$y=f(2x)$؟', 'The graph of $f$ passes through $(4,6)$. Which point do $y=3f(x)$ and $y=f(2x)$ pass through?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$3f(x)$: $y$ balioak bider 3.', '$3f(x)$: las $y$ por 3.', '$3f(x)$: قيم $y$ مضروبة في 3.', '$3f(x)$: the $y$ values times 3.'), math: same('$(4,6)\\ \\to\\ (4,18)$') },
            { text: say('$f(2x)$: $2x=4$ behar da, hau da, $x=2$.', '$f(2x)$: hace falta $2x=4$, es decir, $x=2$.', '$f(2x)$: نحتاج $2x=4$، أي $x=2$.', '$f(2x)$: you need $2x=4$, that is, $x=2$.'), math: same('$(4,6)\\ \\to\\ (2,6)$') },
            { text: say('Kanpoko faktoreak bertikalki luzatzen du; barrukoak horizontalki estutzen du.', 'Un factor fuera estira en vertical; dentro, comprime en horizontal.', 'المعامل الخارجي يمدّد رأسيًا، والداخلي يقلّص أفقيًا.', 'A factor outside stretches vertically; inside, it squeezes horizontally.') }
        ],
        takeaway: say('$y=k\\cdot f(x)$ funtzioak altuerak bider $k$ egiten ditu. $y=f(kx)$ funtzioak distantzia horizontalak $k$ zenbakiaz zatitzen ditu: $k>1$ denean, estutu egiten du.', '$y=k\\cdot f(x)$ multiplica las alturas por $k$. $y=f(kx)$ divide las distancias horizontales entre $k$: con $k>1$, comprime.', '$y=k\\cdot f(x)$ تضرب الارتفاعات في $k$. و$y=f(kx)$ تقسم المسافات الأفقية على $k$: مع $k>1$ تقلّص.', '$y=k\\cdot f(x)$ multiplies the heights by $k$. $y=f(kx)$ divides the horizontal distances by $k$: with $k>1$, it squeezes.'),
        figure: (language) => <StretchFigure language={language} />
    },

    /* ---------- 3. The inverse function ---------- */
    {
        id: 'inverse-function',
        stage: 'inverse',
        title: say('Alderantzizko funtzioa kalkulatzea', 'Calcular la función inversa', 'إيجاد الدالة العكسية', 'Finding the inverse function'),
        goal: say('Funtzio injektibo baten alderantzizkoa kalkulatzea, $x$ askatuz, eta $f$ desegiten duela egiaztatzea.', 'Calcular la inversa de una función inyectiva despejando $x$, y comprobar que deshace lo que hace $f$.', 'حساب الدالة العكسية لدالة متباينة بعزل $x$، والتحقق من أنها تعكس ما تفعله $f$.', 'Find the inverse of an injective function by solving for $x$, and check that it undoes what $f$ does.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'images', title: { eu: 'Irudiak eta aurreirudiak', es: 'Imágenes y antiimágenes', en: 'Images and preimages', ar: 'الصور والأصول' } }
        ],
        problem: say('Aurkitu $f(x)=2x-6$ funtzioaren alderantzizkoa, eta egiaztatu $f$ desegiten duela.', 'Halla la inversa de $f(x)=2x-6$ y comprueba que deshace lo que hace $f$.', 'أوجد الدالة العكسية لـ $f(x)=2x-6$ وتحقق من أنها تعكس ما تفعله $f$.', 'Find the inverse of $f(x)=2x-6$ and check that it undoes what $f$ does.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $y=2x-6$ eta askatu $x$.', 'Escribe $y=2x-6$ y despeja $x$.', 'اكتب $y=2x-6$ واعزل $x$.', 'Write $y=2x-6$ and solve for $x$.'), math: same('$x=\\frac{y+6}{2}$') },
            { text: say('Trukatu letrak.', 'Cambia las letras.', 'بدّل الحرفين.', 'Swap the letters.'), math: same('$f^{-1}(x)=\\frac{x+6}{2}$') },
            { text: say('Egiaztatu: $f(5)=4$, eta $f^{-1}$ funtzioak 5 zenbakira itzultzen du.', 'Comprueba: $f(5)=4$, y $f^{-1}$ lo devuelve al 5.', 'تحقق: $f(5)=4$، و$f^{-1}$ تعيده إلى 5.', 'Check: $f(5)=4$, and $f^{-1}$ takes it back to 5.'), math: same('$f^{-1}(4)=\\frac{4+6}{2}=5$') }
        ],
        takeaway: say('$f^{-1}$ funtzioak $f$ desegiten du: $f(a)=b$ bada, $f^{-1}(b)=a$. Kalkulatzeko, askatu $x$, $y=f(x)$ adierazpenean, eta trukatu $x$ eta $y$.', '$f^{-1}$ deshace lo que hace $f$: si $f(a)=b$, entonces $f^{-1}(b)=a$. Para hallarla, despeja $x$ en $y=f(x)$ y cambia $x$ por $y$.', '$f^{-1}$ تعكس ما تفعله $f$: إذا كان $f(a)=b$ فإن $f^{-1}(b)=a$. ولإيجادها اعزل $x$ في $y=f(x)$ ثم بدّل $x$ و$y$.', '$f^{-1}$ undoes what $f$ does: if $f(a)=b$, then $f^{-1}(b)=a$. To find it, solve $y=f(x)$ for $x$ and swap $x$ and $y$.'),
        figure: (language) => <MachineFigure language={language} />
    },
    {
        id: 'inverse-graph',
        stage: 'inverse',
        title: say('Alderantzizkoaren grafikoa eta adarrak', 'La gráfica de la inversa y las ramas', 'رسم الدالة العكسية والفروع', 'The graph of the inverse and branches'),
        goal: say('Alderantzizkoaren grafikoa $y=x$ zuzenarekiko simetriaz marraztea, eta funtzio ez-injektibo batean adar bat hautatzea.', 'Dibujar la gráfica de la inversa por simetría respecto de $y=x$ y elegir una rama cuando la función no es inyectiva.', 'رسم الدالة العكسية بالتناظر حول $y=x$، واختيار فرع عندما لا تكون الدالة متباينة.', 'Draw the graph of the inverse by symmetry in $y=x$, and choose a branch when the function is not injective.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'range-graph', title: { eu: 'Izate-eremua eta ibiltartea grafikoan', es: 'Dominio y recorrido en la gráfica', en: 'Domain and range on a graph', ar: 'المجال والمدى في الرسم' } }
        ],
        problem: say('$f(x)=x^2-1$ funtzioak ez du alderantzizkorik $\\mathbb{R}$ osoan. Aurkitu $x\\ge 0$ adarraren alderantzizkoa.', '$f(x)=x^2-1$ no tiene inversa en todo $\\mathbb{R}$. Halla la inversa de la rama $x\\ge 0$.', 'ليس للدالة $f(x)=x^2-1$ عكسية على كل $\\mathbb{R}$. أوجد عكسية الفرع $x\\ge 0$.', '$f(x)=x^2-1$ has no inverse on the whole of $\\mathbb{R}$. Find the inverse of the branch $x\\ge 0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ez da injektiboa: bi $x$ desberdinek irudi bera dute.', 'No es inyectiva: dos $x$ distintos tienen la misma imagen.', 'ليست متباينة: لقيمتين مختلفتين لـ $x$ الصورة نفسها.', 'It is not injective: two different $x$ have the same image.'), math: same('$f(2)=f(-2)=3$') },
            { text: say('$x\\ge 0$ adarrean, askatu $x$.', 'En la rama $x\\ge 0$, despeja $x$.', 'في الفرع $x\\ge 0$ اعزل $x$.', 'On the branch $x\\ge 0$, solve for $x$.'), math: same('$y=x^2-1\\ \\to\\ x=\\sqrt{y+1}$') },
            { text: say('Trukatu letrak: $y=x$ zuzenarekiko simetrikoa da.', 'Cambia las letras: es la simétrica respecto de $y=x$.', 'بدّل الحرفين: إنها المتناظرة حول $y=x$.', 'Swap the letters: it is the reflection in $y=x$.'), math: same('$f^{-1}(x)=\\sqrt{x+1},\\ x\\ge -1$') }
        ],
        takeaway: say('$f^{-1}$ funtzioaren grafikoa $f$ funtzioarenaren simetrikoa da $y=x$ zuzenarekiko. Zuzen horizontal batek $f$ bi aldiz mozten badu, adar bat hautatu behar da.', 'La gráfica de $f^{-1}$ es la simétrica de la de $f$ respecto de la recta $y=x$. Si una recta horizontal corta a $f$ dos veces, hay que quedarse con una rama.', 'رسم $f^{-1}$ هو متناظر رسم $f$ حول المستقيم $y=x$. وإذا قطع مستقيم أفقي الدالة $f$ مرتين فيجب الاكتفاء بفرع واحد.', 'The graph of $f^{-1}$ is the reflection of that of $f$ in the line $y=x$. If a horizontal line cuts $f$ twice, you have to keep one branch.'),
        figure: (language) => <MirrorFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'exp-log',
        stage: 'inverse',
        title: say('Esponentziala eta logaritmoa, alderantzizkoak', 'Exponencial y logaritmo, inversas', 'الأسية واللوغاريتمية دالتان عكسيتان', 'Exponential and logarithm, inverses'),
        goal: say('Funtzio esponentzial eta logaritmikoen alderantzizkoak kalkulatzea, eta haien izate-eremua, ibiltartea eta monotonia oinarriaren arabera ezagutzea.', 'Calcular inversas de funciones exponenciales y logarítmicas, y conocer su dominio, su recorrido y su crecimiento según la base.', 'حساب عكسيات الدوال الأسية واللوغاريتمية، ومعرفة مجالها ومداها وتزايدها حسب الأساس.', 'Find inverses of exponential and logarithmic functions, and know their domain, range and growth according to the base.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones-exponenciales', topic: 'exp-graph', title: { eu: 'Funtzio esponentziala', es: 'La función exponencial', en: 'The exponential function', ar: 'الدالة الأسية' } },
            { unit: 'dbh4-akademikoak/funciones-exponenciales', topic: 'log-graph', title: { eu: 'Funtzio logaritmikoa', es: 'La función logarítmica', en: 'The logarithmic function', ar: 'الدالة اللوغاريتمية' } }
        ],
        problem: say('Aurkitu $f(x)=3^{x-1}$ funtzioaren alderantzizkoa eta haren izate-eremua.', 'Halla la inversa de $f(x)=3^{x-1}$ y su dominio.', 'أوجد الدالة العكسية لـ $f(x)=3^{x-1}$ ومجالها.', 'Find the inverse of $f(x)=3^{x-1}$ and its domain.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hartu 3 oinarriko logaritmoak.', 'Toma logaritmos en base 3.', 'خذ اللوغاريتم للأساس 3.', 'Take logarithms to base 3.'), math: same('$y=3^{x-1}\\ \\to\\ x-1=\\log_3 y$') },
            { text: say('Askatu $x$ eta trukatu letrak.', 'Despeja $x$ y cambia las letras.', 'اعزل $x$ وبدّل الحرفين.', 'Solve for $x$ and swap the letters.'), math: same('$f^{-1}(x)=1+\\log_3 x$') },
            { text: say('Izate-eremua: $x>0$, esponentzialaren ibiltartea.', 'Dominio: $x>0$, el recorrido de la exponencial.', 'المجال: $x>0$، مدى الدالة الأسية.', 'Domain: $x>0$, the range of the exponential.') }
        ],
        takeaway: say('$y=a^x$ eta $y=\\log_a x$ alderantzizkoak dira. $a>1$ denean, biak gorakorrak dira; $0<a<1$ denean, biak beherakorrak.', '$y=a^x$ e $y=\\log_a x$ son inversas. Con $a>1$, las dos crecen; con $0<a<1$, las dos decrecen.', '$y=a^x$ و$y=\\log_a x$ دالتان عكسيتان. مع $a>1$ تتزايدان، ومع $0<a<1$ تتناقصان.', '$y=a^x$ and $y=\\log_a x$ are inverses. With $a>1$, both increase; with $0<a<1$, both decrease.'),
        figure: (language) => <LogGraphFigure language={language} />
    },
    {
        id: 'arc',
        stage: 'inverse',
        title: say('Arku-funtzioak', 'Funciones arco', 'دوال القوس', 'Arc functions'),
        goal: say('Arku sinua, arku kosinua eta arku tangentea kalkulatzea, haien angeluak zein tartetan dauden jakinda.', 'Calcular el arco seno, el arco coseno y el arco tangente sabiendo en qué intervalo están sus ángulos.', 'حساب قوس الجيب وقوس جيب التمام وقوس الظل مع معرفة المجال الذي تقع فيه زواياها.', 'Work out the arc sine, the arc cosine and the arc tangent, knowing which interval their angles lie in.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'radians', title: { eu: 'Radiana', es: 'El radián', en: 'The radian', ar: 'الراديان' } },
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'notable-angles', title: { eu: '30°, 45° eta 60°', es: '30°, 45° y 60°', en: '30°, 45° and 60°', ar: '30° و45° و60°' } }
        ],
        problem: say('Kalkulatu $\\arcsin\\frac{1}{2}$ eta $\\arccos\\left(-\\frac{\\sqrt{2}}{2}\\right)$.', 'Calcula $\\arcsin\\frac{1}{2}$ y $\\arccos\\left(-\\frac{\\sqrt{2}}{2}\\right)$.', 'احسب $\\arcsin\\frac{1}{2}$ و$\\arccos\\left(-\\frac{\\sqrt{2}}{2}\\right)$.', 'Work out $\\arcsin\\frac{1}{2}$ and $\\arccos\\left(-\\frac{\\sqrt{2}}{2}\\right)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$-\\frac{\\pi}{2}$ eta $\\frac{\\pi}{2}$ artean, sinua $\\frac{1}{2}$ duen angelua.', 'El ángulo entre $-\\frac{\\pi}{2}$ y $\\frac{\\pi}{2}$ con seno $\\frac{1}{2}$.', 'الزاوية بين $-\\frac{\\pi}{2}$ و$\\frac{\\pi}{2}$ التي جيبها $\\frac{1}{2}$.', 'The angle between $-\\frac{\\pi}{2}$ and $\\frac{\\pi}{2}$ whose sine is $\\frac{1}{2}$.'), math: same('$\\arcsin\\frac{1}{2}=\\frac{\\pi}{6}$') },
            { text: say('0 eta $\\pi$ artean, kosinua negatiboa duen angelua.', 'El ángulo entre 0 y $\\pi$ con coseno negativo.', 'الزاوية بين 0 و$\\pi$ التي جيب تمامها سالب.', 'The angle between 0 and $\\pi$ with a negative cosine.'), math: same('$\\arccos\\left(-\\frac{\\sqrt{2}}{2}\\right)=\\frac{3\\pi}{4}$') },
            { text: say('Egiaztatu.', 'Comprueba.', 'تحقق.', 'Check.'), math: same('$\\sin\\frac{\\pi}{6}=\\frac{1}{2}\\qquad\\cos\\frac{3\\pi}{4}=-\\frac{\\sqrt{2}}{2}$') }
        ],
        takeaway: say('$\\arcsin x$ eta $\\arctan x$ funtzioek $-\\frac{\\pi}{2}$ eta $\\frac{\\pi}{2}$ arteko angelua ematen dute; $\\arccos x$ funtzioak, $[0,\\pi]$ tartekoa.', '$\\arcsin x$ y $\\arctan x$ dan el ángulo entre $-\\frac{\\pi}{2}$ y $\\frac{\\pi}{2}$; $\\arccos x$, el de $[0,\\pi]$.', '$\\arcsin x$ و$\\arctan x$ تعطيان الزاوية بين $-\\frac{\\pi}{2}$ و$\\frac{\\pi}{2}$، و$\\arccos x$ تعطي زاوية من $[0,\\pi]$.', '$\\arcsin x$ and $\\arctan x$ give the angle between $-\\frac{\\pi}{2}$ and $\\frac{\\pi}{2}$; $\\arccos x$, the one in $[0,\\pi]$.'),
        figure: (language) => <ArcFigure language={language} />
    },

    /* ---------- 4. Piecewise functions ---------- */
    {
        id: 'piecewise',
        stage: 'piecewise',
        title: say('Zatika definitutako funtzioak marraztea', 'Dibujar funciones a trozos', 'رسم الدوال المعرّفة على أجزاء', 'Drawing piecewise functions'),
        goal: say('Zatika definitutako funtzio bat marraztea, muturrak ondo jarrita, eta zati batetik bestera jauzirik dagoen ikustea.', 'Dibujar una función a trozos con los extremos bien puestos y ver si salta al pasar de un trozo a otro.', 'رسم دالة معرّفة على أجزاء مع وضع الأطراف بشكل صحيح، ورؤية هل تقفز عند الانتقال من جزء إلى آخر.', 'Draw a piecewise function with its ends in the right place, and see whether it jumps from one piece to the next.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'piecewise', title: { eu: 'Zatika definitutako funtzioak', es: 'Funciones definidas a trozos', en: 'Piecewise functions', ar: 'الدوال المعرّفة على أجزاء' } },
            { unit: 'dbh4-akademikoak/funciones', topic: 'piecewise-continuity', title: { eu: 'Zatien arteko jarraitutasuna', es: 'Continuidad entre trozos', en: 'Continuity between pieces', ar: 'الاتصال بين الأجزاء' } }
        ],
        problem: say('Marraztu $f(x)=\\begin{cases}x+3 & x<-1\\\\ x^2 & -1\\le x\\le 2\\\\ 6-x & x>2\\end{cases}$, eta esan non egiten duen jauzi.', 'Dibuja $f(x)=\\begin{cases}x+3 & x<-1\\\\ x^2 & -1\\le x\\le 2\\\\ 6-x & x>2\\end{cases}$ y di dónde salta.', 'ارسم $f(x)=\\begin{cases}x+3 & x<-1\\\\ x^2 & -1\\le x\\le 2\\\\ 6-x & x>2\\end{cases}$ وقل أين تقفز.', 'Draw $f(x)=\\begin{cases}x+3 & x<-1\\\\ x^2 & -1\\le x\\le 2\\\\ 6-x & x>2\\end{cases}$ and say where it jumps.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati bakoitza bere tartean: zuzen bat, parabola baten zatia eta beste zuzen bat.', 'Cada trozo en su tramo: una recta, un trozo de parábola y otra recta.', 'كل جزء في مجاله: مستقيم، وجزء من قطع مكافئ، ومستقيم آخر.', 'Each piece on its stretch: a line, a piece of a parabola and another line.') },
            { text: say('$x=-1$ puntuan: zuzena 2 balioraino iristen da (puntu irekia), eta parabola 1 balioan hasten da (itxia). Jauzia dago.', 'En $x=-1$: la recta llega a 2 (punto abierto) y la parábola empieza en 1 (cerrado). Hay salto.', 'عند $x=-1$: يصل المستقيم إلى 2 (نقطة مفتوحة) ويبدأ القطع المكافئ من 1 (مغلقة). توجد قفزة.', 'At $x=-1$: the line reaches 2 (open dot) and the parabola starts at 1 (closed). There is a jump.'), math: same('$-1+3=2\\qquad(-1)^2=1$') },
            { text: say('$x=2$ puntuan, biek balio bera dute: zatiak elkartzen dira.', 'En $x=2$, los dos valen lo mismo: los trozos se unen.', 'عند $x=2$ للجزأين القيمة نفسها: يتصلان.', 'At $x=2$, both have the same value: the pieces join.'), math: same('$2^2=4\\qquad 6-2=4$') }
        ],
        takeaway: say('Marraztu zati bakoitza bere tartean bakarrik, puntu itxia $\\le$ edo $\\ge$ dagoen lekuan eta irekia $<$ edo $>$ dagoen lekuan. $f(a)$ kalkulatzeko, erabili $a$ dagoen zatia.', 'Dibuja cada trozo solo en su tramo, con punto cerrado donde va $\\le$ o $\\ge$ y abierto donde va $<$ o $>$. Para calcular $f(a)$, usa el trozo en el que está $a$.', 'ارسم كل جزء في مجاله فقط، بنقطة مغلقة حيث يوجد $\\le$ أو $\\ge$ ومفتوحة حيث يوجد $<$ أو $>$. ولحساب $f(a)$ استعمل الجزء الذي يقع فيه $a$.', 'Draw each piece only on its stretch, with a closed dot where there is $\\le$ or $\\ge$ and an open one where there is $<$ or $>$. To work out $f(a)$, use the piece that $a$ is in.'),
        figure: (language) => <PiecewiseBachFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'absolute',
        stage: 'piecewise',
        title: say('Funtzio baten balio absolutua', 'Valor absoluto de una función', 'القيمة المطلقة لدالة', 'Absolute value of a function'),
        goal: say('$y=|f(x)|$ zatika idaztea eta marraztea, $f$ negatiboa den tarteak bilatuz.', 'Escribir y dibujar $y=|f(x)|$ a trozos buscando los tramos en los que $f$ es negativa.', 'كتابة $y=|f(x)|$ على أجزاء ورسمها بالبحث عن المجالات التي تكون فيها $f$ سالبة.', 'Write and draw $y=|f(x)|$ piecewise by looking for the stretches where $f$ is negative.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'absolute-quadratic', title: { eu: 'Parabola baten balio absolutua', es: 'Valor absoluto de una parábola', en: 'Absolute value of a parabola', ar: 'القيمة المطلقة لقطع مكافئ' } },
            { unit: 'batx1-zientziak/numeros-reales', topic: 'absolute-value', title: { eu: 'Balio absolutua eta distantzia', es: 'Valor absoluto y distancia', en: 'Absolute value and distance', ar: 'القيمة المطلقة والمسافة' } }
        ],
        problem: say('Idatzi $y=|x^2-2x-3|$ zatika eta marraztu.', 'Escribe $y=|x^2-2x-3|$ a trozos y dibújala.', 'اكتب $y=|x^2-2x-3|$ على أجزاء وارسمها.', 'Write $y=|x^2-2x-3|$ piecewise and draw it.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrukoaren erroak.', 'Raíces de lo de dentro.', 'جذور ما بالداخل.', 'Roots of the inside.'), math: same('$x^2-2x-3=0\\ \\to\\ x=-1,\\ x=3$') },
            { text: say('$-1$ eta 3 artean negatiboa da: zeinua aldatzen zaio.', 'Entre $-1$ y 3 es negativa: se le cambia el signo.', 'بين $-1$ و3 تكون سالبة: نغيّر إشارتها.', 'Between $-1$ and 3 it is negative: its sign is changed.'), math: same('$-(x^2-2x-3)=-x^2+2x+3$') },
            { text: say('Hiru zati.', 'Tres trozos.', 'ثلاثة أجزاء.', 'Three pieces.'), math: same('$y=\\begin{cases}x^2-2x-3 & x<-1\\\\ -x^2+2x+3 & -1\\le x\\le 3\\\\ x^2-2x-3 & x>3\\end{cases}$') }
        ],
        takeaway: say('$|f(x)|$ zatika idazteko, bilatu non den $f(x)<0$: han zeinua aldatzen zaio. Grafikoan, X ardatzaren azpian zegoena gora tolesten da.', 'Para escribir $|f(x)|$ a trozos, busca dónde $f(x)<0$: ahí se le cambia el signo. En la gráfica, lo que estaba bajo el eje X se dobla hacia arriba.', 'لكتابة $|f(x)|$ على أجزاء ابحث أين $f(x)<0$: هناك نغيّر الإشارة. وفي الرسم، ما كان تحت محور X يُطوى إلى الأعلى.', 'To write $|f(x)|$ piecewise, look for where $f(x)<0$: there its sign is changed. On the graph, what was below the x-axis is folded up.'),
        figure: (language) => <AbsoluteGraphFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'floor',
        stage: 'piecewise',
        title: say('Zati osoa eta zati hamartarra', 'Parte entera y parte decimal', 'الجزء الصحيح والجزء الكسري', 'Integer part and fractional part'),
        goal: say('$E(x)$ zati osoa eta $x-E(x)$ zati hamartarra kalkulatzea, zenbaki negatiboekin ere, eta haien grafikoak ezagutzea.', 'Calcular la parte entera $E(x)$ y la parte decimal $x-E(x)$, también de números negativos, y conocer sus gráficas.', 'حساب الجزء الصحيح $E(x)$ والجزء الكسري $x-E(x)$، ومنها للأعداد السالبة، ومعرفة رسميهما.', 'Work out the integer part $E(x)$ and the fractional part $x-E(x)$, of negative numbers too, and know their graphs.'),
        needs: [
            { unit: 'batx1-zientziak/numeros-reales', topic: 'interval-sets', title: { eu: 'Tarteak eta haien eragiketak', es: 'Intervalos y operaciones', en: 'Intervals and their operations', ar: 'الفترات والعمليات عليها' } }
        ],
        problem: say('Kalkulatu $E(3{,}7)$, $E(-2{,}4)$ eta $-2{,}4$ zenbakiaren zati hamartarra.', 'Calcula $E(3{,}7)$, $E(-2{,}4)$ y la parte decimal de $-2{,}4$.', 'احسب $E(3{,}7)$ و$E(-2{,}4)$ والجزء الكسري لـ $-2{,}4$.', 'Work out $E(3{,}7)$, $E(-2{,}4)$ and the fractional part of $-2{,}4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('3,7 baino handiagoa ez den oso handiena.', 'El mayor entero que no pasa de 3,7.', 'أكبر عدد صحيح لا يتجاوز 3.7.', 'The largest whole number not above 3.7.'), math: same('$E(3{,}7)=3$') },
            { text: say('Negatiboekin ere behera, ez 0 zenbakirantz.', 'Con negativos también hacia abajo, no hacia el 0.', 'مع السالبة أيضًا إلى الأسفل، لا نحو 0.', 'With negatives also down, not towards 0.'), math: same('$-3\\le -2{,}4<-2\\ \\to\\ E(-2{,}4)=-3$') },
            { text: say('Zati hamartarra: zenbakia ken bere zati osoa.', 'Parte decimal: el número menos su parte entera.', 'الجزء الكسري: العدد ناقص جزئه الصحيح.', 'Fractional part: the number minus its integer part.'), math: same('$-2{,}4-(-3)=0{,}6$') }
        ],
        takeaway: say('$E(x)$ funtzioa $x$ baino txikiagoa edo berdina den oso handiena da: negatiboekin behera egiten da. Zati hamartarra, $x-E(x)$, beti dago 0 eta 1 artean.', '$E(x)$ es el mayor entero menor o igual que $x$: con negativos se baja. La parte decimal, $x-E(x)$, está siempre entre 0 y 1.', '$E(x)$ هو أكبر عدد صحيح أصغر من $x$ أو يساويه: مع السالبة ننزل. والجزء الكسري، $x-E(x)$، يقع دائمًا بين 0 و1.', '$E(x)$ is the largest whole number less than or equal to $x$: with negatives you go down. The fractional part, $x-E(x)$, always lies between 0 and 1.'),
        figure: (language) => <StairsFigure language={language} />
    },

    /* ---------- 5. Operations and composition ---------- */
    {
        id: 'operations',
        stage: 'operations',
        title: say('Funtzioen arteko eragiketak', 'Operaciones con funciones', 'العمليات على الدوال', 'Operations with functions'),
        goal: say('Funtzioak batzea, kentzea, biderkatzea eta zatitzea, eta emaitzaren izate-eremua aurkitzea.', 'Sumar, restar, multiplicar y dividir funciones, y hallar el dominio del resultado.', 'جمع الدوال وطرحها وضربها وقسمتها، وإيجاد مجال الناتج.', 'Add, subtract, multiply and divide functions, and find the domain of the result.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'images', title: { eu: 'Irudiak eta aurreirudiak', es: 'Imágenes y antiimágenes', en: 'Images and preimages', ar: 'الصور والأصول' } }
        ],
        problem: say('$f(x)=x^2-1$ eta $g(x)=x+3$ badira, aurkitu $(f\\cdot g)(2)$ eta $\\frac{f}{g}$ funtzioaren izate-eremua.', 'Si $f(x)=x^2-1$ y $g(x)=x+3$, halla $(f\\cdot g)(2)$ y el dominio de $\\frac{f}{g}$.', 'إذا كانت $f(x)=x^2-1$ و$g(x)=x+3$، فأوجد $(f\\cdot g)(2)$ ومجال $\\frac{f}{g}$.', 'If $f(x)=x^2-1$ and $g(x)=x+3$, find $(f\\cdot g)(2)$ and the domain of $\\frac{f}{g}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Irudiekin egiten da eragiketa.', 'Se opera con las imágenes.', 'نجري العملية على الصور.', 'You operate with the images.'), math: same('$(f\\cdot g)(2)=f(2)\\cdot g(2)$') },
            { text: say('Kalkulatu bakoitza.', 'Calcula cada una.', 'احسب كل واحدة.', 'Work out each one.'), math: same('$f(2)=3\\qquad g(2)=5\\qquad 3\\cdot 5=15$') },
            { text: say('$\\frac{f}{g}$ ez dago $g(x)=0$ den lekuan.', '$\\frac{f}{g}$ no existe donde $g(x)=0$.', '$\\frac{f}{g}$ غير موجودة حيث $g(x)=0$.', '$\\frac{f}{g}$ does not exist where $g(x)=0$.'), math: same('$x+3=0\\ \\to\\ \\mathbb{R}-\\{-3\\}$') }
        ],
        takeaway: say('$(f+g)(x)=f(x)+g(x)$, eta berdin kenketa, biderkadura eta zatidura. Izate-eremua bien zati komuna da; $\\frac{f}{g}$ funtzioan, $g$ funtzioaren zerorik gabe.', '$(f+g)(x)=f(x)+g(x)$, y lo mismo con la resta, el producto y el cociente. El dominio es la parte común de los dos; en $\\frac{f}{g}$, sin los ceros de $g$.', '$(f+g)(x)=f(x)+g(x)$، وكذلك الطرح والجداء وخارج القسمة. والمجال هو الجزء المشترك بين المجالين، وفي $\\frac{f}{g}$ من دون أصفار $g$.', '$(f+g)(x)=f(x)+g(x)$, and the same with the difference, the product and the quotient. The domain is the part both share; for $\\frac{f}{g}$, without the zeros of $g$.'),
        figure: (language) => <OperationsFigure language={language} />
    },
    {
        id: 'composition',
        stage: 'operations',
        title: say('Funtzioen konposizioa', 'Composición de funciones', 'تركيب الدوال', 'Composition of functions'),
        goal: say('$f\\circ g$ eta $g\\circ f$ kalkulatzea, ordenak garrantzia duela ikustea eta funtzio bat bi funtzio sinpleagotan deskonposatzea.', 'Calcular $f\\circ g$ y $g\\circ f$, ver que el orden importa y descomponer una función en dos más sencillas.', 'حساب $f\\circ g$ و$g\\circ f$، ورؤية أن الترتيب مهم، وتفكيك دالة إلى دالتين أبسط.', 'Work out $f\\circ g$ and $g\\circ f$, see that the order matters and break a function down into two simpler ones.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'images', title: { eu: 'Irudiak eta aurreirudiak', es: 'Imágenes y antiimágenes', en: 'Images and preimages', ar: 'الصور والأصول' } }
        ],
        problem: say('$f(x)=x^2$ eta $g(x)=x+3$ badira, aurkitu $(f\\circ g)(x)$ eta $(g\\circ f)(x)$.', 'Si $f(x)=x^2$ y $g(x)=x+3$, halla $(f\\circ g)(x)$ y $(g\\circ f)(x)$.', 'إذا كانت $f(x)=x^2$ و$g(x)=x+3$، فأوجد $(f\\circ g)(x)$ و$(g\\circ f)(x)$.', 'If $f(x)=x^2$ and $g(x)=x+3$, find $(f\\circ g)(x)$ and $(g\\circ f)(x)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f\\circ g$: lehenik $g$, eta gero $f$.', '$f\\circ g$: primero $g$ y después $f$.', '$f\\circ g$: أولًا $g$ ثم $f$.', '$f\\circ g$: first $g$, then $f$.'), math: same('$(f\\circ g)(x)=f(x+3)=(x+3)^2$') },
            { text: say('$g\\circ f$: lehenik $f$, eta gero $g$.', '$g\\circ f$: primero $f$ y después $g$.', '$g\\circ f$: أولًا $f$ ثم $g$.', '$g\\circ f$: first $f$, then $g$.'), math: same('$(g\\circ f)(x)=g(x^2)=x^2+3$') },
            { text: say('Ez dira berdinak: $x=1$ denean, 16 eta 4.', 'No son iguales: con $x=1$, 16 y 4.', 'ليستا متساويتين: مع $x=1$ نحصل على 16 و4.', 'They are not equal: with $x=1$, 16 and 4.'), math: same('$(1+3)^2=16\\qquad 1^2+3=4$') }
        ],
        takeaway: say('$(f\\circ g)(x)=f(g(x))$: lehenik $g$ aplikatzen da, eta haren emaitzari, $f$. Oro har, $f\\circ g\\neq g\\circ f$.', '$(f\\circ g)(x)=f(g(x))$: se aplica primero $g$ y a su resultado, $f$. En general, $f\\circ g\\neq g\\circ f$.', '$(f\\circ g)(x)=f(g(x))$: نطبّق $g$ أولًا ثم نطبّق $f$ على ناتجها. وعمومًا $f\\circ g\\neq g\\circ f$.', '$(f\\circ g)(x)=f(g(x))$: $g$ is applied first and $f$ to its result. In general, $f\\circ g\\neq g\\circ f$.'),
        figure: (language) => <CompositionFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts), with the trigonometric names of each language */
export const bachFunctionsTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...localizeNames(bachFunctionsLessonTexts[topic.id as BachFunctionsTopicId]),
    ...localizeNames(bachFunctionsLessonChecks[topic.id as BachFunctionsTopicId])
}))
