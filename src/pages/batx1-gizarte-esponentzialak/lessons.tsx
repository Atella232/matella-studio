import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { LogGraphFigure, LogShiftFigure } from '../dbh4-akademikoak-esponentzialak/figures'
import { ExponentialFigure, ShiftFigure } from '../dbh4-aplikatuak-grafikoa/figures'
import { MachineFigure, MirrorFigure, ReflectionsFigure, ShiftsFigure } from '../batx1-zientziak-funtzioak/figures'
import { DoublingFigure, LogisticFigure, LogModelFigure, PercentFigure, SolveTimeFigure, TaxDiscountFigure, TwoPointsExpFigure } from './figures'
import { socExpLessonChecks, type SocExpTopicId } from './lessonChecks'
import { socExpLessonTexts } from './lessonTexts'
import { same, say } from './text'

/* ==========================================================================
   Funtzio esponentzialak eta logaritmikoak · Batxilergoa 1 · Gizarte
   Zientziak — stages and lessons. The scope follows unit 5 «Funciones II»
   of the current Anaya Matemáticas aplicadas a las CCSS I (Suma Piezas),
   in its order: transformations, composition and the inverse,
   exponential functions, logarithmic functions and models (doubling and
   half-life, the logistic curve, logarithmic models). The owner left the
   trigonometric exercises of that unit out, and compound interest is only
   linked: it belongs to «Aritmética mercantil». Some drawings come from
   the Ciencias twin and from 4. DBH.
   ========================================================================== */

export type SocExpStageId = 'transforms' | 'composition' | 'exponential' | 'logarithmic' | 'models'

export const socExpStages: UnitStage[] = [
    { id: 'transforms', tone: 'blue', title: { eu: 'Transformazioak', es: 'Transformaciones', en: 'Transformations', ar: 'التحويلات' } },
    { id: 'composition', tone: 'violet', title: { eu: 'Konposizioa eta alderantzizkoa', es: 'Composición e inversa', en: 'Composition and inverse', ar: 'التركيب والعكسية' } },
    { id: 'exponential', tone: 'mustard', title: { eu: 'Funtzio esponentzialak', es: 'Funciones exponenciales', en: 'Exponential functions', ar: 'الدوال الأسية' } },
    { id: 'logarithmic', tone: 'coral', title: { eu: 'Funtzio logaritmikoak', es: 'Funciones logarítmicas', en: 'Logarithmic functions', ar: 'الدوال اللوغاريتمية' } },
    { id: 'models', tone: 'green', title: { eu: 'Ereduak', es: 'Modelos', en: 'Models', ar: 'النماذج' } }
]

const SCIENCE = 'batx1-zientziak/funciones'
const EXP4 = 'dbh4-akademikoak/funciones-exponenciales'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Transformations ---------- */
    {
        id: 'shifts',
        stage: 'transforms',
        title: say('Lekualdaketak', 'Traslaciones', 'الانسحابات', 'Translations'),
        goal: say('Grafiko bat gora, behera, ezkerrera edo eskuinera mugitzea, eta puntu bakoitza nora doan jakitea.', 'Mover una gráfica hacia arriba, abajo, a la izquierda o a la derecha, y saber adónde va cada punto.', 'تحريك رسم إلى الأعلى أو الأسفل أو اليسار أو اليمين، ومعرفة أين تذهب كل نقطة.', 'Move a graph up, down, left or right, and know where each point goes.'),
        needs: [{ unit: SCIENCE, topic: 'shifts', title: { eu: 'Lekualdaketak', es: 'Traslaciones', en: 'Translations', ar: 'الانسحابات' } }],
        problem: say('$y=x^2$ parabola $y=(x-3)^2+2$ bihurtzen da. Nora doaz erpina eta $(1,1)$ puntua?', 'La parábola $y=x^2$ se convierte en $y=(x-3)^2+2$. ¿Adónde van el vértice y el punto $(1,1)$?', 'يتحول القطع المكافئ $y=x^2$ إلى $y=(x-3)^2+2$. أين يذهب الرأس والنقطة $(1,1)$؟', 'The parabola $y=x^2$ becomes $y=(x-3)^2+2$. Where do the vertex and the point $(1,1)$ go?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x-3$: 3 unitate eskuinera.', '$x-3$: 3 unidades a la derecha.', '$x-3$: ‏3 وحدات إلى اليمين.', '$x-3$: 3 units to the right.') },
            { text: say('$+2$: 2 unitate gora.', '$+2$: 2 unidades hacia arriba.', '$+2$: وحدتان إلى الأعلى.', '$+2$: 2 units up.'), math: same('$(0,0)\\ \\to\\ (3,2)$') },
            { text: say('Puntu guztiak berdin mugitzen dira.', 'Todos los puntos se mueven igual.', 'تتحرك كل النقاط بالقدر نفسه.', 'Every point moves the same.'), math: same('$(1,1)\\ \\to\\ (4,3)$') }
        ],
        takeaway: say('$f(x)+k$: $k$ gora. $f(x-a)$: $a$ eskuinera; $f(x+a)$: $a$ ezkerrera.', '$f(x)+k$: $k$ hacia arriba. $f(x-a)$: $a$ a la derecha; $f(x+a)$: $a$ a la izquierda.', '$f(x)+k$: ‏$k$ إلى الأعلى. و$f(x-a)$: ‏$a$ إلى اليمين؛ و$f(x+a)$: ‏$a$ إلى اليسار.', '$f(x)+k$: $k$ up. $f(x-a)$: $a$ to the right; $f(x+a)$: $a$ to the left.'),
        figure: (language) => <ShiftsFigure language={language} />
    },
    {
        id: 'reflections',
        stage: 'transforms',
        title: say('Simetriak eta luzapenak', 'Simetrías y estiramientos', 'التناظرات والتمديدات', 'Reflections and stretches'),
        goal: say('$-f(x)$, $f(-x)$, $k\\cdot f(x)$ eta $|f(x)|$ funtzioen grafikoak $f$ funtzioarenetik marraztea.', 'Dibujar $-f(x)$, $f(-x)$, $k\\cdot f(x)$ y $|f(x)|$ a partir de la gráfica de $f$.', 'رسم $-f(x)$ و$f(-x)$ و$k\\cdot f(x)$ و$|f(x)|$ انطلاقًا من رسم $f$.', 'Draw $-f(x)$, $f(-x)$, $k\\cdot f(x)$ and $|f(x)|$ from the graph of $f$.'),
        needs: [{ unit: SCIENCE, topic: 'reflections', title: { eu: 'Grafikoa ardatzetan islatzea', es: 'Reflejar una gráfica en los ejes', en: 'Reflecting a graph in the axes', ar: 'عكس الرسم في المحورين' } }],
        problem: say('$f$ funtzioa $(2,5)$ puntutik pasatzen da. Zein puntutatik pasatzen dira $-f(x)$, $f(-x)$ eta $3f(x)$?', 'La gráfica de $f$ pasa por $(2,5)$. ¿Por qué puntos pasan $-f(x)$, $f(-x)$ y $3f(x)$?', 'يمر رسم $f$ بالنقطة $(2,5)$. بأي نقاط تمر $-f(x)$ و$f(-x)$ و$3f(x)$؟', 'The graph of $f$ passes through $(2,5)$. Which points do $-f(x)$, $f(-x)$ and $3f(x)$ pass through?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$-f(x)$: $y$ zeinuz aldatzen da.', '$-f(x)$: cambia el signo de la $y$.', '$-f(x)$: تتغير إشارة $y$.', '$-f(x)$: the sign of $y$ changes.'), math: same('$(2,-5)$') },
            { text: say('$f(-x)$: $x$ zeinuz aldatzen da.', '$f(-x)$: cambia el signo de la $x$.', '$f(-x)$: تتغير إشارة $x$.', '$f(-x)$: the sign of $x$ changes.'), math: same('$(-2,5)$') },
            { text: say('$3f(x)$: $y$ bider 3.', '$3f(x)$: la $y$ por 3.', '$3f(x)$: ‏$y$ في 3.', '$3f(x)$: $y$ times 3.'), math: same('$(2,15)$') }
        ],
        takeaway: say('$-f(x)$: X ardatzean islatuta. $f(-x)$: Y ardatzean islatuta. $k\\cdot f(x)$: $y$ bider $k$. $|f(x)|$: azpikoa gora tolestuta.', '$-f(x)$: reflejo en el eje X. $f(-x)$: reflejo en el eje Y. $k\\cdot f(x)$: la $y$ por $k$. $|f(x)|$: lo de abajo, doblado hacia arriba.', '$-f(x)$: انعكاس في محور X. و$f(-x)$: انعكاس في محور Y. و$k\\cdot f(x)$: ‏$y$ في $k$. و$|f(x)|$: ما تحت المحور يُطوى إلى الأعلى.', '$-f(x)$: reflection in the x-axis. $f(-x)$: reflection in the y-axis. $k\\cdot f(x)$: $y$ times $k$. $|f(x)|$: what is below folded up.'),
        figure: (language) => <ReflectionsFigure language={language} />
    },
    {
        id: 'vertex-form',
        stage: 'transforms',
        title: say('Lekualdatutako parabolak eta hiperbolak', 'Parábolas e hipérbolas trasladadas', 'القطوع المكافئة والزائدة المنسحبة', 'Shifted parabolas and hyperbolas'),
        goal: say('$y=x^2+bx+c$ parabola $(x-m)^2+p$ moduan idaztea, eta zein lekualdaketa den esatea.', 'Escribir la parábola $y=x^2+bx+c$ como $(x-m)^2+p$ y decir qué traslación es.', 'كتابة القطع المكافئ $y=x^2+bx+c$ على صورة $(x-m)^2+p$ وتحديد الانسحاب.', 'Write the parabola $y=x^2+bx+c$ as $(x-m)^2+p$ and say which translation it is.'),
        needs: [{ unit: 'batx1-gizarte/funciones', topic: 'parabola', title: { eu: 'Parabola: erpina eta ebaki-puntuak', es: 'La parábola: vértice y puntos de corte', en: 'The parabola: vertex and intercepts', ar: 'القطع المكافئ: الرأس ونقاط التقاطع' } }],
        problem: say('Idatzi $y=x^2+4x+1$ funtzioa $(x-m)^2+p$ moduan, eta esan nola lortzen den $y=x^2$ funtziotik.', 'Escribe $y=x^2+4x+1$ como $(x-m)^2+p$ y di cómo se obtiene de $y=x^2$.', 'اكتب $y=x^2+4x+1$ على صورة $(x-m)^2+p$ وقل كيف نحصل عليها من $y=x^2$.', 'Write $y=x^2+4x+1$ as $(x-m)^2+p$ and say how it comes from $y=x^2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x^2+4x$ karratu batean sartzen da, 4 erdibituta.', '$x^2+4x$ entra en un cuadrado con la mitad de 4.', '$x^2+4x$ تدخل في مربع بنصف 4.', '$x^2+4x$ fits into a square with half of 4.'), math: same('$(x+2)^2=x^2+4x+4$') },
            { text: say('Kendu soberan dagoena.', 'Quita lo que sobra.', 'اطرح الزائد.', 'Take away what is extra.'), math: same('$x^2+4x+1=(x+2)^2-4+1=(x+2)^2-3$') },
            { text: say('2 ezkerrera eta 3 behera: erpina $(-2,-3)$.', '2 a la izquierda y 3 hacia abajo: vértice $(-2,-3)$.', 'وحدتان إلى اليسار و3 إلى الأسفل: الرأس $(-2,-3)$.', '2 to the left and 3 down: vertex $(-2,-3)$.') }
        ],
        takeaway: say('$x^2+bx+c=(x-m)^2+p$: erpina $(m,p)$ da. $\\frac{k}{x-a}+b$: asintotak $x=a$ eta $y=b$.', '$x^2+bx+c=(x-m)^2+p$: el vértice es $(m,p)$. $\\frac{k}{x-a}+b$: asíntotas $x=a$ e $y=b$.', '$x^2+bx+c=(x-m)^2+p$: الرأس $(m,p)$. و$\\frac{k}{x-a}+b$: الخطان المقاربان $x=a$ و$y=b$.', '$x^2+bx+c=(x-m)^2+p$: the vertex is $(m,p)$. $\\frac{k}{x-a}+b$: asymptotes $x=a$ and $y=b$.'),
        figure: (language) => <ShiftFigure language={language} />
    },

    /* ---------- 2. Composition and inverse ---------- */
    {
        id: 'composition',
        stage: 'composition',
        title: say('Funtzioen konposizioa', 'Composición de funciones', 'تركيب الدوال', 'Composition of functions'),
        goal: say('Bi funtzio segidan aplikatzea, eta ordenak emaitza aldatzen duela ikustea.', 'Aplicar dos funciones seguidas y ver que el orden cambia el resultado.', 'تطبيق دالتين متتاليتين ورؤية أن الترتيب يغيّر النتيجة.', 'Apply two functions in a row and see that the order changes the result.'),
        needs: [{ unit: SCIENCE, topic: 'composition', title: { eu: 'Funtzioen konposizioa', es: 'Composición de funciones', en: 'Composition of functions', ar: 'تركيب الدوال' } }],
        problem: say('Denda batek 10 euroko deskontua eta BEZa (% 21) aplikatzen ditu: $g(x)=x-10$ eta $f(x)=1{,}21x$. Alderatu $f\\circ g$ eta $g\\circ f$, 100 euroko produktu batekin.', 'Una tienda aplica un descuento de 10 € y el IVA del 21 %: $g(x)=x-10$ y $f(x)=1{,}21x$. Compara $f\\circ g$ y $g\\circ f$ con un artículo de 100 €.', 'يطبّق متجر خصمًا قدره 10 € وضريبة 21 %: ‏$g(x)=x-10$ و$f(x)=1{,}21x$. قارن $f\\circ g$ و$g\\circ f$ لسلعة ثمنها 100 €.', 'A shop applies a €10 discount and 21 % VAT: $g(x)=x-10$ and $f(x)=1{,}21x$. Compare $f\\circ g$ and $g\\circ f$ for a €100 item.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f\\circ g$: lehenik deskontua, gero BEZa.', '$f\\circ g$: primero el descuento y después el IVA.', '$f\\circ g$: أولًا الخصم ثم الضريبة.', '$f\\circ g$: first the discount, then VAT.'), math: same('$f(100-10)=1{,}21\\cdot 90=108{,}9$') },
            { text: say('$g\\circ f$: lehenik BEZa, gero deskontua.', '$g\\circ f$: primero el IVA y después el descuento.', '$g\\circ f$: أولًا الضريبة ثم الخصم.', '$g\\circ f$: first VAT, then the discount.'), math: same('$1{,}21\\cdot 100-10=111$') },
            { text: say('Ordenak 2,10 € aldatzen ditu: $f\\circ g\\neq g\\circ f$.', 'El orden cambia 2,10 €: $f\\circ g\\neq g\\circ f$.', 'الترتيب يغيّر 2.10 €: ‏$f\\circ g\\neq g\\circ f$.', 'The order changes €2.10: $f\\circ g\\neq g\\circ f$.') }
        ],
        takeaway: say('$(f\\circ g)(x)=f(g(x))$: lehenik $g$, gero $f$. Oro har, $f\\circ g\\neq g\\circ f$.', '$(f\\circ g)(x)=f(g(x))$: primero $g$, después $f$. En general, $f\\circ g\\neq g\\circ f$.', '$(f\\circ g)(x)=f(g(x))$: أولًا $g$ ثم $f$. وعمومًا $f\\circ g\\neq g\\circ f$.', '$(f\\circ g)(x)=f(g(x))$: $g$ first, then $f$. In general, $f\\circ g\\neq g\\circ f$.'),
        figure: (language) => <TaxDiscountFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'inverse',
        stage: 'composition',
        title: say('Alderantzizko funtzioa', 'La función inversa', 'الدالة العكسية', 'The inverse function'),
        goal: say('Funtzio baten alderantzizkoa kalkulatzea eta testuinguruan interpretatzea.', 'Calcular la inversa de una función e interpretarla en un contexto.', 'حساب عكسية دالة وتفسيرها في سياق.', 'Work out the inverse of a function and interpret it in a context.'),
        needs: [{ unit: SCIENCE, topic: 'inverse-function', title: { eu: 'Alderantzizko funtzioa kalkulatzea', es: 'Calcular la función inversa', en: 'Finding the inverse function', ar: 'إيجاد الدالة العكسية' } }],
        problem: say('Taxi batek $C(x)=3+1{,}5x$ euro kobratzen ditu $x$ kilometrorengatik. Aurkitu $C^{-1}$, eta esan zenbat kilometro egiten diren 18 eurorekin.', 'Un taxi cobra $C(x)=3+1{,}5x$ euros por $x$ km. Halla $C^{-1}$ y di cuántos km se hacen con 18 €.', 'تتقاضى سيارة أجرة $C(x)=3+1{,}5x$ يورو مقابل $x$ كم. أوجد $C^{-1}$ وقل كم كيلومترًا نقطع بـ 18 €.', 'A taxi charges $C(x)=3+1{,}5x$ euros for $x$ km. Find $C^{-1}$ and say how many km €18 pays for.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu $x$.', 'Despeja $x$.', 'اعزل $x$.', 'Solve for $x$.'), math: same('$y=3+1{,}5x\\ \\to\\ x=\\frac{y-3}{1{,}5}$') },
            { text: say('Trukatu letrak.', 'Cambia las letras.', 'بدّل الحرفين.', 'Swap the letters.'), math: same('$C^{-1}(x)=\\frac{x-3}{1{,}5}$') },
            { text: say('Orain sarrera eurotan da, eta irteera kilometrotan.', 'Ahora entra el dinero y salen los kilómetros.', 'الآن يدخل المال وتخرج الكيلومترات.', 'Now money goes in and kilometres come out.'), math: same('$\\frac{18-3}{1{,}5}=10$') }
        ],
        takeaway: say('$f^{-1}$ aurkitzeko: $y=f(x)$, askatu $x$, eta trukatu letrak. $f^{-1}$ ez da $\\frac{1}{f}$.', 'Para hallar $f^{-1}$: $y=f(x)$, despeja $x$ y cambia las letras. $f^{-1}$ no es $\\frac{1}{f}$.', 'لإيجاد $f^{-1}$: ‏$y=f(x)$، اعزل $x$ وبدّل الحرفين. و$f^{-1}$ ليست $\\frac{1}{f}$.', 'To find $f^{-1}$: $y=f(x)$, solve for $x$ and swap the letters. $f^{-1}$ is not $\\frac{1}{f}$.'),
        figure: (language) => <MachineFigure language={language} />
    },
    {
        id: 'inverse-graph',
        stage: 'composition',
        title: say('Alderantzizkoaren grafikoa eta adarrak', 'La gráfica de la inversa y las ramas', 'رسم العكسية والفروع', 'The graph of the inverse and branches'),
        goal: say('Alderantzizkoa $y=x$ zuzenean islatuta marraztea, eta funtzio bat adarretan banatzea alderantzizkoa izan dezan.', 'Dibujar la inversa reflejando en la recta $y=x$ y partir una función en ramas para que tenga inversa.', 'رسم العكسية بالانعكاس في المستقيم $y=x$ وتقسيم دالة إلى فروع لتكون لها عكسية.', 'Draw the inverse by reflecting in the line $y=x$ and split a function into branches so it has an inverse.'),
        needs: [{ unit: SCIENCE, topic: 'inverse-graph', title: { eu: 'Alderantzizkoaren grafikoa eta adarrak', es: 'La gráfica de la inversa y las ramas', en: 'The graph of the inverse and branches', ar: 'رسم الدالة العكسية والفروع' } }],
        problem: say('Aurkitu $y=x^2-1$ funtzioaren bi adarren alderantzizkoak.', 'Halla las inversas de las dos ramas de $y=x^2-1$.', 'أوجد عكسيتي فرعي $y=x^2-1$.', 'Find the inverses of the two branches of $y=x^2-1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ez du alderantzizkorik $\\mathbb{R}$ osoan: $x=2$ eta $x=-2$ zenbakiek balio bera ematen dute.', 'No tiene inversa en todo $\\mathbb{R}$: $x=2$ y $x=-2$ dan lo mismo.', 'ليس لها عكسية على كل $\\mathbb{R}$: ‏$x=2$ و$x=-2$ تعطيان الشيء نفسه.', 'It has no inverse on all of $\\mathbb{R}$: $x=2$ and $x=-2$ give the same.'), math: same('$2^2-1=(-2)^2-1=3$') },
            { text: say('$x\\ge 0$ adarra.', 'Rama $x\\ge 0$.', 'الفرع $x\\ge 0$.', 'Branch $x\\ge 0$.'), math: same('$x=\\sqrt{y+1}\\ \\to\\ y=\\sqrt{x+1}$') },
            { text: say('$x\\le 0$ adarra.', 'Rama $x\\le 0$.', 'الفرع $x\\le 0$.', 'Branch $x\\le 0$.'), math: same('$x=-\\sqrt{y+1}\\ \\to\\ y=-\\sqrt{x+1}$') }
        ],
        takeaway: say('$f$ eta $f^{-1}$ simetrikoak dira $y=x$ zuzenarekiko: $(a,b)$ puntua $(b,a)$ bihurtzen da. Gora eta behera doan funtzio bat adarretan banatzen da.', '$f$ y $f^{-1}$ son simétricas respecto de $y=x$: $(a,b)$ pasa a $(b,a)$. Una función que sube y baja se parte en ramas.', '$f$ و$f^{-1}$ متناظرتان حول $y=x$: ‏$(a,b)$ تصبح $(b,a)$. والدالة التي تصعد وتنزل تُقسَم إلى فروع.', '$f$ and $f^{-1}$ are symmetric about $y=x$: $(a,b)$ becomes $(b,a)$. A function that rises and falls is split into branches.'),
        figure: (language) => <MirrorFigure language={language} />
    },

    /* ---------- 3. Exponential functions ---------- */
    {
        id: 'exp-graph',
        stage: 'exponential',
        title: say('Funtzio esponentziala', 'La función exponencial', 'الدالة الأسية', 'The exponential function'),
        goal: say('$y=a^x$ funtzioaren grafikoa ezagutzea: gorakorra ala beherakorra, $(0,1)$ puntua eta asintota.', 'Conocer la gráfica de $y=a^x$: creciente o decreciente, el punto $(0,1)$ y la asíntota.', 'معرفة رسم $y=a^x$: متزايدة أم متناقصة، والنقطة $(0,1)$ والخط المقارب.', 'Know the graph of $y=a^x$: increasing or decreasing, the point $(0,1)$ and the asymptote.'),
        needs: [{ unit: EXP4, topic: 'exp-graph', title: { eu: 'Funtzio esponentziala', es: 'La función exponencial', en: 'The exponential function', ar: 'الدالة الأسية' } }],
        problem: say('Alderatu $y=2^x$ eta $y=0{,}5^x$: kalkulatu balioak $x=-2$, $x=0$ eta $x=2$ direnean.', 'Compara $y=2^x$ e $y=0{,}5^x$: calcula sus valores en $x=-2$, $x=0$ y $x=2$.', 'قارن $y=2^x$ و$y=0{,}5^x$: احسب قيمهما عند $x=-2$ و$x=0$ و$x=2$.', 'Compare $y=2^x$ and $y=0{,}5^x$: work out their values at $x=-2$, $x=0$ and $x=2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$y=2^x$ gorakorra da.', '$y=2^x$ es creciente.', '$y=2^x$ متزايدة.', '$y=2^x$ is increasing.'), math: same('$2^{-2}=0{,}25\\qquad 2^0=1\\qquad 2^2=4$') },
            { text: say('$y=0{,}5^x$ beherakorra da.', '$y=0{,}5^x$ es decreciente.', '$y=0{,}5^x$ متناقصة.', '$y=0{,}5^x$ is decreasing.'), math: same('$0{,}5^{-2}=4\\qquad 0{,}5^0=1\\qquad 0{,}5^2=0{,}25$') },
            { text: say('Simetrikoak dira Y ardatzarekiko, $0{,}5^x=2^{-x}$ delako.', 'Son simétricas respecto del eje Y, porque $0{,}5^x=2^{-x}$.', 'متناظرتان حول محور Y لأن $0{,}5^x=2^{-x}$.', 'They are symmetric about the y-axis, because $0{,}5^x=2^{-x}$.') }
        ],
        takeaway: say('$y=a^x$: beti $(0,1)$ puntutik eta X ardatzaren gainetik; $a>1$ bada gorakorra, $0<a<1$ bada beherakorra; $y=0$ asintota.', '$y=a^x$: siempre por $(0,1)$ y por encima del eje X; creciente si $a>1$, decreciente si $0<a<1$; asíntota $y=0$.', '$y=a^x$: تمر دائمًا بـ $(0,1)$ وفوق محور X؛ متزايدة إذا $a>1$ ومتناقصة إذا $0<a<1$؛ والخط المقارب $y=0$.', '$y=a^x$: always through $(0,1)$ and above the x-axis; increasing if $a>1$, decreasing if $0<a<1$; asymptote $y=0$.'),
        figure: (language) => <ExponentialFigure language={language} />
    },
    {
        id: 'percent-growth',
        stage: 'exponential',
        title: say('Ehunekoetan hazi eta jaitsi', 'Crecer y decrecer en porcentaje', 'النمو والتناقص بالنسبة المئوية', 'Growing and falling by a percentage'),
        goal: say('Ehuneko berean hazten edo jaisten den magnitude bat $y=k\\cdot(1\\pm r)^t$ moduan idaztea.', 'Escribir como $y=k\\cdot(1\\pm r)^t$ una magnitud que sube o baja el mismo porcentaje.', 'كتابة كمية تزيد أو تنقص بالنسبة نفسها على صورة $y=k\\cdot(1\\pm r)^t$.', 'Write a quantity that rises or falls by the same percentage as $y=k\\cdot(1\\pm r)^t$.'),
        needs: [
            { unit: EXP4, topic: 'growth', title: { eu: 'Hazkunde esponentziala', es: 'Crecimiento exponencial', en: 'Exponential growth', ar: 'النمو الأسي' } },
            { unit: EXP4, topic: 'decay', title: { eu: 'Beherakuntza eta erdibizitza', es: 'Decrecimiento y semivida', en: 'Decay and half-life', ar: 'التناقص وعمر النصف' } }
        ],
        problem: say('50 000 biztanleko hiri bat % 2 hazten da urtero, eta 20 000 euroko auto batek % 15 galtzen du urtero. Idatzi bi funtzioak, eta kalkulatu 3 urteren buruan.', 'Una ciudad de 50 000 habitantes crece un 2 % al año, y un coche de 20 000 € pierde un 15 % al año. Escribe las dos funciones y calcula su valor a los 3 años.', 'مدينة سكانها 50 000 تنمو 2 % سنويًّا، وسيارة قيمتها 20 000 € تفقد 15 % سنويًّا. اكتب الدالتين واحسب قيمتهما بعد 3 سنوات.', 'A city of 50,000 people grows 2 % a year, and a €20,000 car loses 15 % a year. Write the two functions and work out their values after 3 years.'),
        stepsKind: 'steps',
        steps: [
            { text: say('% 2 hazi: bider 1,02 urtero.', 'Crecer un 2 %: por 1,02 cada año.', 'النمو 2 %: الضرب في 1.02 كل سنة.', 'Growing 2 %: times 1.02 every year.'), math: same('$P(t)=50\\,000\\cdot 1{,}02^t$') },
            { text: say('% 15 galdu: % 85 geratzen da.', 'Perder un 15 %: queda el 85 %.', 'فقدان 15 %: يبقى 85 %.', 'Losing 15 %: 85 % is left.'), math: same('$V(t)=20\\,000\\cdot 0{,}85^t$') },
            { text: say('3 urteren buruan.', 'A los 3 años.', 'بعد 3 سنوات.', 'After 3 years.'), math: same('$50\\,000\\cdot 1{,}02^3=53\\,060{,}4\\qquad 20\\,000\\cdot 0{,}85^3=12\\,282{,}5$') }
        ],
        takeaway: say('Urrats bakoitzean % $r$ hazi: $y=k\\cdot(1+r)^t$. % $r$ jaitsi: $y=k\\cdot(1-r)^t$. $k$ hasierako balioa da.', 'Subir un $r$ % en cada paso: $y=k\\cdot(1+r)^t$. Bajar un $r$ %: $y=k\\cdot(1-r)^t$. $k$ es el valor inicial.', 'الزيادة $r$ % في كل خطوة: $y=k\\cdot(1+r)^t$. والنقص $r$ %: $y=k\\cdot(1-r)^t$. و$k$ القيمة الابتدائية.', 'Rising $r$ % at each step: $y=k\\cdot(1+r)^t$. Falling $r$ %: $y=k\\cdot(1-r)^t$. $k$ is the starting value.'),
        figure: (language) => <PercentFigure language={language} />
    },
    {
        id: 'two-points',
        stage: 'exponential',
        title: say('Bi datutik eredu esponentzialera', 'De dos datos al modelo exponencial', 'من بيانتين إلى النموذج الأسي', 'From two data to the exponential model'),
        goal: say('$y=k\\cdot a^x$ eredua bi datutatik aurkitzea, eta zuzenarekin alderatzea.', 'Hallar el modelo $y=k\\cdot a^x$ a partir de dos datos y compararlo con la recta.', 'إيجاد النموذج $y=k\\cdot a^x$ من بيانتين ومقارنته بالمستقيم.', 'Find the model $y=k\\cdot a^x$ from two data and compare it with the line.'),
        needs: [{ unit: 'batx1-gizarte/funciones', topic: 'interpolation', title: { eu: 'Interpolazio eta estrapolazio lineala', es: 'Interpolación y extrapolación lineal', en: 'Linear interpolation and extrapolation', ar: 'الاستيفاء والاستقراء الخارجي الخطيان' } }],
        problem: say('Produktu baten salmentak 80 ziren lehen urtean ($x=0$), eta 100 bigarrenean. Aurkitu $y=k\\cdot a^x$, eta alderatu zuzenarekin $x=4$ denean.', 'Las ventas de un producto fueron 80 el primer año ($x=0$) y 100 el segundo. Halla $y=k\\cdot a^x$ y compárala con la recta en $x=4$.', 'كانت مبيعات منتج 80 في السنة الأولى ($x=0$) و100 في الثانية. أوجد $y=k\\cdot a^x$ وقارنها بالمستقيم عند $x=4$.', 'A product sold 80 in the first year ($x=0$) and 100 in the second. Find $y=k\\cdot a^x$ and compare it with the line at $x=4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x=0$ denean, $k$.', 'En $x=0$, $k$.', 'عند $x=0$ نحصل على $k$.', 'At $x=0$, $k$.'), math: same('$k=80$') },
            { text: say('Urrats bateko zatidura, $a$.', 'El cociente de un paso, $a$.', 'خارج قسمة خطوة واحدة هو $a$.', 'The quotient of one step, $a$.'), math: same('$a=\\frac{100}{80}=1{,}25$') },
            { text: say('$x=4$ denean, esponentziala eta zuzena ($80+20x$).', 'En $x=4$, la exponencial y la recta ($80+20x$).', 'عند $x=4$: الأسية والمستقيم ($80+20x$).', 'At $x=4$, the exponential and the line ($80+20x$).'), math: same('$80\\cdot 1{,}25^4=195{,}3125\\qquad 80+20\\cdot 4=160$') }
        ],
        takeaway: say('$y=k\\cdot a^x$: $k$ $x=0$ puntuko balioa da, eta $a$ urrats bateko zatidura. Datuetatik urrun, esponentziala eta zuzena asko bereizten dira.', '$y=k\\cdot a^x$: $k$ es el valor en $x=0$ y $a$, el cociente de un paso. Lejos de los datos, la exponencial y la recta se separan mucho.', '$y=k\\cdot a^x$: ‏$k$ القيمة عند $x=0$ و$a$ خارج قسمة خطوة واحدة. وبعيدًا عن البيانات تفترق الأسية والمستقيم كثيرًا.', '$y=k\\cdot a^x$: $k$ is the value at $x=0$ and $a$ the quotient of one step. Far from the data, the exponential and the line split a lot.'),
        figure: (language) => <TwoPointsExpFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Logarithmic functions ---------- */
    {
        id: 'log-inverse',
        stage: 'logarithmic',
        title: say('Logaritmoa, esponentzialaren alderantzizkoa', 'El logaritmo, inversa de la exponencial', 'اللوغاريتم، عكسية الأسية', 'The logarithm, inverse of the exponential'),
        goal: say('Logaritmoak berretzaile gisa kalkulatzea, eta kalkulagailuarekin oinarria aldatzea.', 'Calcular logaritmos como exponentes y cambiar de base con la calculadora.', 'حساب اللوغاريتمات على أنها أسس، وتغيير الأساس بالآلة الحاسبة.', 'Work out logarithms as exponents and change the base with the calculator.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'log-definition', title: { eu: 'Logaritmoa', es: 'El logaritmo', en: 'The logarithm', ar: 'اللوغاريتم' } },
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'change-base', title: { eu: 'Oinarri-aldaketa eta kalkulagailua', es: 'Cambio de base y calculadora', en: 'Change of base and calculator', ar: 'تغيير الأساس والآلة الحاسبة' } }
        ],
        problem: say('Kalkulatu $\\log_2 32$, $\\log 1000$ eta $\\log_4 2$, eta kalkulagailuarekin $\\log_3 20$.', 'Calcula $\\log_2 32$, $\\log 1000$ y $\\log_4 2$, y con la calculadora $\\log_3 20$.', 'احسب $\\log_2 32$ و$\\log 1000$ و$\\log_4 2$، وبالآلة الحاسبة $\\log_3 20$.', 'Work out $\\log_2 32$, $\\log 1000$ and $\\log_4 2$, and with the calculator $\\log_3 20$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zein berretzaile?', '¿Qué exponente?', 'أي أس؟', 'Which exponent?'), math: same('$2^5=32\\qquad 10^3=1000$') },
            { text: say('Erroa ere berretzailea da: $\\sqrt{4}=2$.', 'Una raíz también es un exponente: $\\sqrt{4}=2$.', 'الجذر أيضًا أس: $\\sqrt{4}=2$.', 'A root is also an exponent: $\\sqrt{4}=2$.'), math: same('$4^{\\frac{1}{2}}=2\\ \\to\\ \\log_4 2=\\frac{1}{2}$') },
            { text: say('Beste oinarri bat: zatitu bi logaritmo.', 'Otra base: divide dos logaritmos.', 'أساس آخر: اقسم لوغاريتمين.', 'Another base: divide two logarithms.'), math: same('$\\log_3 20=\\frac{\\log 20}{\\log 3}\\approx 2{,}73$') }
        ],
        takeaway: say('$\\log_a x=y$ esan nahi du $a^y=x$. $y=\\log_a x$ eta $y=a^x$ alderantzizkoak dira. $\\log_a x=\\frac{\\log x}{\\log a}$.', '$\\log_a x=y$ quiere decir $a^y=x$. $y=\\log_a x$ e $y=a^x$ son inversas. $\\log_a x=\\frac{\\log x}{\\log a}$.', '$\\log_a x=y$ تعني $a^y=x$. و$y=\\log_a x$ و$y=a^x$ عكسيتان. و$\\log_a x=\\frac{\\log x}{\\log a}$.', '$\\log_a x=y$ means $a^y=x$. $y=\\log_a x$ and $y=a^x$ are inverses. $\\log_a x=\\frac{\\log x}{\\log a}$.'),
        figure: (language) => <LogGraphFigure language={language} />
    },
    {
        id: 'log-graph',
        stage: 'logarithmic',
        title: say('Funtzio logaritmikoaren grafikoa', 'La gráfica de la función logarítmica', 'رسم الدالة اللوغاريتمية', 'The graph of the logarithmic function'),
        goal: say('Logaritmo baten grafikoa marraztea, haren izate-eremua eta asintota emanez.', 'Dibujar la gráfica de un logaritmo dando su dominio y su asíntota.', 'رسم بيان لوغاريتم مع تحديد مجاله وخطه المقارب.', 'Draw the graph of a logarithm, giving its domain and asymptote.'),
        needs: [{ unit: EXP4, topic: 'log-shifts', title: { eu: 'Logaritmoen lekualdaketak', es: 'Traslaciones de logaritmos', en: 'Translations of logarithms', ar: 'انسحابات اللوغاريتمات' } }],
        problem: say('Marraztu $y=\\log_2(x-1)+2$: izate-eremua, asintota eta bi puntu.', 'Dibuja $y=\\log_2(x-1)+2$: dominio, asíntota y dos puntos.', 'ارسم $y=\\log_2(x-1)+2$: المجال والخط المقارب ونقطتين.', 'Draw $y=\\log_2(x-1)+2$: domain, asymptote and two points.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrukoa positiboa.', 'Lo de dentro, positivo.', 'ما بالداخل موجب.', 'The inside, positive.'), math: same('$x-1>0\\ \\to\\ x>1$') },
            { text: say('Asintota bertikala, $x=1$; $y=\\log_2 x$ 1 eskuinera eta 2 gora.', 'Asíntota vertical $x=1$; es $y=\\log_2 x$ llevada 1 a la derecha y 2 hacia arriba.', 'الخط المقارب الرأسي $x=1$؛ إنها $y=\\log_2 x$ منقولة 1 إلى اليمين و2 إلى الأعلى.', 'Vertical asymptote $x=1$; it is $y=\\log_2 x$ moved 1 right and 2 up.') },
            { text: say('Bi puntu.', 'Dos puntos.', 'نقطتان.', 'Two points.'), math: same('$\\log_2 1+2=2\\qquad\\log_2 4+2=4$') }
        ],
        takeaway: say('$y=\\log_a x$: izate-eremua $(0,+\\infty)$, $(1,0)$ puntutik pasatzen da, eta Y ardatza asintota du. $\\log_a(x-h)+k$: $x>h$.', '$y=\\log_a x$: dominio $(0,+\\infty)$, pasa por $(1,0)$ y tiene el eje Y como asíntota. $\\log_a(x-h)+k$: $x>h$.', '$y=\\log_a x$: المجال $(0,+\\infty)$، تمر بـ $(1,0)$، ومحور Y خط مقارب. و$\\log_a(x-h)+k$: ‏$x>h$.', '$y=\\log_a x$: domain $(0,+\\infty)$, through $(1,0)$, with the y-axis as asymptote. $\\log_a(x-h)+k$: $x>h$.'),
        figure: (language) => <LogShiftFigure language={language} />
    },
    {
        id: 'solve-time',
        stage: 'logarithmic',
        title: say('Noiz? Logaritmoekin ebaztea', '¿Cuándo? Resolver con logaritmos', 'متى؟ الحل باللوغاريتمات', 'When? Solving with logarithms'),
        goal: say('Eredu esponentzial batek balio bat noiz hartzen duen kalkulatzea, logaritmoak erabilita.', 'Calcular cuándo un modelo exponencial llega a un valor, usando logaritmos.', 'حساب متى يبلغ نموذج أسي قيمة ما باستعمال اللوغاريتمات.', 'Work out when an exponential model reaches a value, using logarithms.'),
        needs: [
            { unit: EXP4, topic: 'exp-equations', title: { eu: 'Ekuazio esponentzialak', es: 'Ecuaciones exponenciales', en: 'Exponential equations', ar: 'المعادلات الأسية' } },
            { unit: 'batx1-zientziak/numeros-reales', topic: 'log-unknown', title: { eu: 'Ezezaguna logaritmoekin kalkulatzea', es: 'Calcular la incógnita con logaritmos', en: 'Finding the unknown with logarithms', ar: 'إيجاد المجهول باللوغاريتمات' } }
        ],
        problem: say('15 000 euroko makina batek % 20 galtzen du urtero. Noiz balioko du 6000 € baino gutxiago?', 'Una máquina de 15 000 € pierde un 20 % al año. ¿Cuándo valdrá menos de 6000 €?', 'آلة قيمتها 15 000 € تفقد 20 % سنويًّا. متى تصبح قيمتها أقل من 6000 €؟', 'A €15,000 machine loses 20 % a year. When will it be worth less than €6,000?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ekuazioa, eta isolatu berretura.', 'La ecuación, y aísla la potencia.', 'المعادلة، واعزل القوة.', 'The equation, and isolate the power.'), math: same('$15\\,000\\cdot 0{,}8^t=6000\\ \\to\\ 0{,}8^t=0{,}4$') },
            { text: say('Hartu logaritmoak.', 'Toma logaritmos.', 'خذ اللوغاريتم.', 'Take logarithms.'), math: same('$t=\\frac{\\log 0{,}4}{\\log 0{,}8}\\approx 4{,}11$') },
            { text: say('Bosgarren urtean jaitsiko da 6000 € azpitik.', 'Bajará de 6000 € durante el quinto año.', 'ستنزل تحت 6000 € خلال السنة الخامسة.', 'It will drop below €6,000 during the fifth year.') }
        ],
        takeaway: say('$k\\cdot a^t=c$: isolatu $a^t=\\frac{c}{k}$, eta $t=\\frac{\\log(c/k)}{\\log a}$. Biribildu testuinguruaren arabera.', '$k\\cdot a^t=c$: aísla $a^t=\\frac{c}{k}$ y $t=\\frac{\\log(c/k)}{\\log a}$. Redondea según el contexto.', '$k\\cdot a^t=c$: اعزل $a^t=\\frac{c}{k}$ ثم $t=\\frac{\\log(c/k)}{\\log a}$. وقرّب حسب السياق.', '$k\\cdot a^t=c$: isolate $a^t=\\frac{c}{k}$ and $t=\\frac{\\log(c/k)}{\\log a}$. Round to suit the context.'),
        figure: (language) => <SolveTimeFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Models ---------- */
    {
        id: 'doubling',
        stage: 'models',
        title: say('Bikoizte-denbora eta erdibizitza', 'Tiempo de duplicación y semivida', 'زمن التضاعف وعمر النصف', 'Doubling time and half-life'),
        goal: say('Kopuru bat bikoizteko edo erdira jaisteko denbora kalkulatzea, eta konstantea dela ikustea.', 'Calcular el tiempo en que una cantidad se duplica o se reduce a la mitad, y ver que es constante.', 'حساب زمن تضاعف كمية أو نقصانها إلى النصف، ورؤية أنه ثابت.', 'Work out the time an amount takes to double or to halve, and see that it is constant.'),
        needs: [{ unit: EXP4, topic: 'decay', title: { eu: 'Beherakuntza eta erdibizitza', es: 'Decrecimiento y semivida', en: 'Decay and half-life', ar: 'التناقص وعمر النصف' } }],
        problem: say('Biztanleria bat % 5 hazten da urtero. Zenbat urtetan bikoizten da? Eta zenbatetan laukoizten?', 'Una población crece un 5 % al año. ¿En cuántos años se duplica? ¿Y en cuántos se cuadruplica?', 'ينمو عدد سكان 5 % سنويًّا. في كم سنة يتضاعف؟ وفي كم يصبح أربعة أضعاف؟', 'A population grows 5 % a year. In how many years does it double? And in how many does it quadruple?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bikoiztu: $1{,}05^T=2$.', 'Duplicar: $1{,}05^T=2$.', 'التضاعف: $1{,}05^T=2$.', 'Doubling: $1{,}05^T=2$.'), math: same('$T=\\frac{\\log 2}{\\log 1{,}05}\\approx 14{,}2$') },
            { text: say('Laukoiztea bi bikoizketa dira.', 'Cuadruplicar son dos duplicaciones.', 'أربعة أضعاف تعني مضاعفتين.', 'Quadrupling is two doublings.'), math: same('$2T\\approx 28{,}4$') },
            { text: say('Ez du axola noiz hasten den: 14,2 urtean behin bikoizten da.', 'Da igual cuándo se empiece: se duplica cada 14,2 años.', 'لا يهم متى نبدأ: يتضاعف كل 14.2 سنة.', 'It does not matter when you start: it doubles every 14.2 years.') }
        ],
        takeaway: say('$a^T=2$ denean, $T$ bikoizte-denbora da; $a^T=\\frac{1}{2}$ denean, erdibizitza. Biak konstanteak dira.', 'Si $a^T=2$, $T$ es el tiempo de duplicación; si $a^T=\\frac{1}{2}$, la semivida. Los dos son constantes.', 'إذا $a^T=2$ فإن $T$ زمن التضاعف، وإذا $a^T=\\frac{1}{2}$ فهو عمر النصف. وكلاهما ثابت.', 'If $a^T=2$, $T$ is the doubling time; if $a^T=\\frac{1}{2}$, the half-life. Both are constant.'),
        figure: (language) => <DoublingFigure language={language} />
    },
    {
        id: 'logistic',
        stage: 'models',
        title: say('Kurba logistikoa', 'La curva logística', 'المنحنى اللوجستي', 'The logistic curve'),
        goal: say('Sabai bat duen hazkundea funtzio logistikoarekin deskribatzea, eta balio bat noiz lortzen den kalkulatzea.', 'Describir con la función logística un crecimiento con techo y calcular cuándo se alcanza un valor.', 'وصف نمو له سقف بالدالة اللوجستية وحساب متى تُبلغ قيمة ما.', 'Describe growth with a ceiling using the logistic function and work out when a value is reached.'),
        needs: [{ unit: EXP4, topic: 'growth', title: { eu: 'Hazkunde esponentziala', es: 'Crecimiento exponencial', en: 'Exponential growth', ar: 'النمو الأسي' } }],
        problem: say('Bideo-joko baten salmentak $V(x)=\\frac{12\\,000}{1+399\\cdot 1{,}1^{-x}}$ dira, $x$ egunetan. Zenbat ziren hasieran? Noiz iristen dira 6000 salmentara?', 'Las ventas de un videojuego son $V(x)=\\frac{12\\,000}{1+399\\cdot 1{,}1^{-x}}$, con $x$ en días. ¿Cuántas había al principio? ¿Cuándo llegan a 6000?', 'مبيعات لعبة فيديو $V(x)=\\frac{12\\,000}{1+399\\cdot 1{,}1^{-x}}$ و$x$ بالأيام. كم كانت في البداية؟ ومتى تبلغ 6000؟', 'A video game\'s sales are $V(x)=\\frac{12\\,000}{1+399\\cdot 1{,}1^{-x}}$, with $x$ in days. How many were there at the start? When do they reach 6,000?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hasieran, $x=0$.', 'Al principio, $x=0$.', 'في البداية $x=0$.', 'At the start, $x=0$.'), math: same('$\\frac{12\\,000}{1+399}=30$') },
            { text: say('6000 sabaiaren erdia da: izendatzaileak 2 izan behar du.', '6000 es la mitad del techo: el denominador tiene que valer 2.', '6000 نصف السقف: يجب أن يساوي المقام 2.', '6,000 is half the ceiling: the denominator must be 2.'), math: same('$399\\cdot 1{,}1^{-x}=1\\ \\to\\ 1{,}1^x=399$') },
            { text: say('Logaritmoekin.', 'Con logaritmos.', 'باللوغاريتمات.', 'With logarithms.'), math: same('$x=\\frac{\\log 399}{\\log 1{,}1}\\approx 62{,}8$') }
        ],
        takeaway: say('$y=\\frac{M}{1+b\\cdot a^{-x}}$: hasieran $\\frac{M}{1+b}$, eta $M$ sabairantz hurbiltzen da; $\\frac{M}{2}$ baliora iristen da $a^x=b$ denean.', '$y=\\frac{M}{1+b\\cdot a^{-x}}$: empieza en $\\frac{M}{1+b}$ y se acerca al techo $M$; llega a $\\frac{M}{2}$ cuando $a^x=b$.', '$y=\\frac{M}{1+b\\cdot a^{-x}}$: تبدأ من $\\frac{M}{1+b}$ وتقترب من السقف $M$، وتبلغ $\\frac{M}{2}$ عندما $a^x=b$.', '$y=\\frac{M}{1+b\\cdot a^{-x}}$: it starts at $\\frac{M}{1+b}$ and approaches the ceiling $M$; it reaches $\\frac{M}{2}$ when $a^x=b$.'),
        figure: (language) => <LogisticFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'log-model',
        stage: 'models',
        title: say('Eredu logaritmikoak', 'Modelos logarítmicos', 'النماذج اللوغاريتمية', 'Logarithmic models'),
        goal: say('Logaritmo batekin deskribatutako egoerak ebaztea: balio bat kalkulatzea, edo noiz iristen den.', 'Resolver situaciones descritas con un logaritmo: calcular un valor o cuándo se llega a él.', 'حل مواقف موصوفة بلوغاريتم: حساب قيمة أو متى نصل إليها.', 'Solve situations described with a logarithm: work out a value or when it is reached.'),
        needs: [{ unit: EXP4, topic: 'log-graph', title: { eu: 'Funtzio logaritmikoa', es: 'La función logarítmica', en: 'The logarithmic function', ar: 'الدالة اللوغاريتمية' } }],
        problem: say('Enpresa baten bezeroak $C(x)=200+150\\log x$ dira, publizitatean $x$ mila euro inbertituta. Zenbat bezero 10 eta 100 milarekin? Zenbat inbertitu 650 bezero izateko?', 'Los clientes de una empresa son $C(x)=200+150\\log x$ al invertir $x$ miles de euros en publicidad. ¿Cuántos con 10 y con 100 miles? ¿Cuánto invertir para tener 650?', 'عملاء شركة هم $C(x)=200+150\\log x$ عند استثمار $x$ آلاف يورو في الإعلان. كم عميلًا مع 10 و100 ألف؟ وكم نستثمر لنحصل على 650؟', 'A firm has $C(x)=200+150\\log x$ customers when it spends $x$ thousand euros on advertising. How many with 10 and with 100 thousand? How much to spend to have 650?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\log 10=1$ eta $\\log 100=2$.', '$\\log 10=1$ y $\\log 100=2$.', '$\\log 10=1$ و$\\log 100=2$.', '$\\log 10=1$ and $\\log 100=2$.'), math: same('$200+150\\cdot 1=350\\qquad 200+150\\cdot 2=500$') },
            { text: say('Isolatu logaritmoa.', 'Aísla el logaritmo.', 'اعزل اللوغاريتم.', 'Isolate the logarithm.'), math: same('$150\\log x=450\\ \\to\\ \\log x=3$') },
            { text: say('$x=10^3$: mila mila euro, hau da, milioi bat.', '$x=10^3$: mil miles de euros, es decir, un millón.', '$x=10^3$: ألف ألف يورو، أي مليون.', '$x=10^3$: a thousand thousand euros, that is, a million.'), math: same('$x=1000$') }
        ],
        takeaway: say('$y=a+b\\log x$: hasieran azkar hazten da, gero oso motel. $\\log x=d$ bada, $x=10^d$.', '$y=a+b\\log x$: al principio crece deprisa y luego muy despacio. Si $\\log x=d$, $x=10^d$.', '$y=a+b\\log x$: تنمو بسرعة في البداية ثم ببطء شديد. وإذا $\\log x=d$ فإن $x=10^d$.', '$y=a+b\\log x$: it grows fast at first and then very slowly. If $\\log x=d$, $x=10^d$.'),
        figure: (language) => <LogModelFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const socExpTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...socExpLessonTexts[topic.id as SocExpTopicId],
    ...socExpLessonChecks[topic.id as SocExpTopicId]
}))
