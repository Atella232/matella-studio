import type { LessonTexts } from '../../features/unit-v2/types.ts'
import type { BachFunctionsTopicId } from './lessonChecks.ts'
import { plain as say, plainSame as same } from './text.ts'

/* ==========================================================================
   Funtzio elementalak · Batxilergoa 1 · Zientziak — what each lesson
   tells: the new words (definitions), a short explanation, the example as
   an exercise («Another example»), the key words in four languages and, in
   seven lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics and gives each language its
   trigonometric names (\sin and \arcsin are written the same in the four
   here). The example uses numbers of its own, never those of «Let's
   solve», of «Check it» or of the typical mistake. Tests in
   tests/lesson-texts.test.ts.
   ========================================================================== */

export const bachFunctionsLessonTexts: Record<BachFunctionsTopicId, LessonTexts> = {
    /* ---------- 1. Studying a function ---------- */
    domain: {
        definitions: [
            { term: say('Izate-eremua', 'Dominio', 'مجال التعريف', 'Domain'), meaning: say('$x$ aldagaiaren balioak, $f(x)$ kalkulatu ahal izateko.', 'Los valores de $x$ para los que se puede calcular $f(x)$.', 'قيم $x$ التي يمكن عندها حساب $f(x)$.', 'The values of $x$ for which $f(x)$ can be worked out.') }
        ],
        vocabulary: [
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm'),
            say('ebakidura', 'intersección', 'التقاطع', 'intersection')
        ],
        explanation: say(
            'Izate-eremua aurkitzeko, baldintza guztiak batera idazten dira: indize bikoitiko erro baten errokizunak $\\ge 0$ izan behar du; izendatzaileak, $\\neq 0$; eta logaritmo baten argumentuak, $>0$. Izate-eremua guztien ebakidura da. Erro kubikoek eta polinomioek ez dute baldintzarik jartzen.',
            'Para hallar el dominio se apuntan todas las condiciones a la vez: el radicando de una raíz de índice par tiene que ser $\\ge 0$; un denominador, $\\neq 0$; y el argumento de un logaritmo, $>0$. El dominio es la intersección de todas. Las raíces cúbicas y los polinomios no ponen ninguna condición.',
            'لإيجاد المجال نكتب كل الشروط معًا: ما تحت الجذر ذي الدليل الزوجي يجب أن يكون $\\ge 0$، والمقام $\\neq 0$، ووسيط اللوغاريتم $>0$. والمجال هو تقاطع كل هذه الشروط. أما الجذور التكعيبية والحدوديات فلا تضع أي شرط.',
            'To find the domain, write down every condition at once: the radicand of a root with an even index must be $\\ge 0$; a denominator, $\\neq 0$; and the argument of a logarithm, $>0$. The domain is the intersection of them all. Cube roots and polynomials set no condition.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\log(5-x)+\\sqrt{x}$ funtzioaren izate-eremua.', 'Halla el dominio de $g(x)=\\log(5-x)+\\sqrt{x}$.', 'أوجد مجال $g(x)=\\log(5-x)+\\sqrt{x}$.', 'Find the domain of $g(x)=\\log(5-x)+\\sqrt{x}$.'),
        example: same('$5-x>0\\ \\to\\ x<5\\qquad x\\ge 0$'),
        exampleAnswer: say('Biak batera: izate-eremua $[0,5)$ da.', 'Las dos a la vez: el dominio es $[0,5)$.', 'الشرطان معًا: المجال هو $[0,5)$.', 'Both at once: the domain is $[0,5)$.')
    },
    symmetry: {
        definitions: [
            { term: say('Funtzio bikoitia', 'Función par', 'الدالة الزوجية', 'Even function'), meaning: say('$f(-x)=f(x)$ betetzen duena: Y ardatzarekiko simetrikoa.', 'La que cumple $f(-x)=f(x)$: es simétrica respecto del eje Y.', 'التي تحقق $f(-x)=f(x)$: متناظرة حول محور Y.', 'One with $f(-x)=f(x)$: it is symmetric about the y-axis.') },
            { term: say('Funtzio bakoitia', 'Función impar', 'الدالة الفردية', 'Odd function'), meaning: say('$f(-x)=-f(x)$ betetzen duena: jatorriarekiko simetrikoa.', 'La que cumple $f(-x)=-f(x)$: es simétrica respecto del origen.', 'التي تحقق $f(-x)=-f(x)$: متناظرة حول الأصل.', 'One with $f(-x)=-f(x)$: it is symmetric about the origin.') }
        ],
        vocabulary: [
            say('simetrikoa', 'simétrica', 'متناظرة', 'symmetric'),
            say('jatorria', 'origen', 'الأصل', 'origin'),
            say('ardatza', 'eje', 'المحور', 'axis')
        ],
        explanation: say(
            'Simetria aztertzeko, $x$ ordez $-x$ jartzen da eta $f(-x)$ kalkulatzen da. Lehenik, izate-eremuak simetrikoa izan behar du: $x$ badago, $-x$ ere bai. Gero konparatzen da: $f(x)$ ateratzen bada, funtzioa bikoitia da; $-f(x)$ ateratzen bada, bakoitia. Bestela, ez du simetria horietako bat ere.',
            'Para estudiar la simetría se cambia $x$ por $-x$ y se calcula $f(-x)$. Antes, el dominio tiene que ser simétrico: si está $x$, también $-x$. Después se compara: si sale $f(x)$, la función es par; si sale $-f(x)$, es impar. Si no, no tiene ninguna de esas simetrías.',
            'لدراسة التناظر نغيّر $x$ إلى $-x$ ونحسب $f(-x)$. قبل ذلك يجب أن يكون المجال متناظرًا: إذا كان فيه $x$ ففيه $-x$ أيضًا. ثم نقارن: إذا حصلنا على $f(x)$ فالدالة زوجية، وإذا حصلنا على $-f(x)$ فهي فردية. وإلا فليس لها أي من هذين التناظرين.',
            'To study the symmetry, change $x$ into $-x$ and work out $f(-x)$. First, the domain has to be symmetric: if $x$ is in it, so is $-x$. Then compare: if you get $f(x)$, the function is even; if you get $-f(x)$, it is odd. If not, it has neither of those symmetries.'
        ),
        examplePrompt: say('Aztertu $g(x)=x^4-3|x|$ funtzioaren simetria.', 'Estudia la simetría de $g(x)=x^4-3|x|$.', 'ادرس تناظر $g(x)=x^4-3|x|$.', 'Study the symmetry of $g(x)=x^4-3|x|$.'),
        example: same('$g(-x)=(-x)^4-3|-x|=x^4-3|x|=g(x)$'),
        exampleAnswer: say('Bikoitia da: Y ardatzarekiko simetrikoa.', 'Es par: simétrica respecto del eje Y.', 'إنها زوجية: متناظرة حول محور Y.', 'It is even: symmetric about the y-axis.'),
        why: {
            text: say(
                'Zergatik pasatzen da jatorritik 0 puntuan definitutako funtzio bakoiti bat? $x=0$ denean, $f(0)=-f(0)$ da, eta bere aurkakoaren berdina den zenbaki bakarra 0 da.',
                '¿Por qué una función impar definida en 0 pasa por el origen? Con $x=0$, $f(0)=-f(0)$, y el único número igual a su opuesto es el 0.',
                'لماذا تمر الدالة الفردية المعرّفة عند 0 بالأصل؟ مع $x=0$ يكون $f(0)=-f(0)$، والعدد الوحيد الذي يساوي معاكسه هو 0.',
                'Why does an odd function defined at 0 pass through the origin? With $x=0$, $f(0)=-f(0)$, and the only number equal to its opposite is 0.'
            )
        }
    },
    periodic: {
        definitions: [
            { term: say('Periodoa', 'Periodo', 'الدور', 'Period'), meaning: say('$T>0$ zenbakirik txikiena, $f(x+T)=f(x)$ betetzen duena.', 'El menor número $T>0$ que cumple $f(x+T)=f(x)$.', 'أصغر عدد $T>0$ يحقق $f(x+T)=f(x)$.', 'The smallest number $T>0$ with $f(x+T)=f(x)$.') }
        ],
        vocabulary: [
            say('periodikoa', 'periódica', 'دورية', 'periodic'),
            say('kosinua', 'coseno', 'جيب التمام', 'cosine'),
            say('errepikatu', 'se repite', 'يتكرر', 'repeat')
        ],
        explanation: say(
            'Funtzio periodiko batek bere grafikoa errepikatzen du $T$ unitatez behin. Nahikoa da $T$ luzerako zati bat ezagutzea: $f(a)$ kalkulatzeko, periodoak kendu edo gehitzen dira, $a$ zati horretara iritsi arte. Kosinuak $2\\pi$ unitatez behin errepikatzen du; $\\cos kx$ funtzioak, $\\frac{2\\pi}{k}$ unitatez behin.',
            'Una función periódica repite su gráfica cada $T$ unidades. Basta con conocer un trozo de longitud $T$: para calcular $f(a)$ se quitan o se suman periodos hasta que $a$ cae en ese trozo. El coseno se repite cada $2\\pi$; $\\cos kx$, cada $\\frac{2\\pi}{k}$.',
            'الدالة الدورية تكرر رسمها كل $T$ وحدة. يكفي أن نعرف جزءًا طوله $T$: لحساب $f(a)$ نطرح الأدوار أو نضيفها حتى يقع $a$ في ذلك الجزء. جيب التمام يتكرر كل $2\\pi$، و$\\cos kx$ يتكرر كل $\\frac{2\\pi}{k}$.',
            'A periodic function repeats its graph every $T$ units. It is enough to know one piece of length $T$: to work out $f(a)$, take away or add periods until $a$ lands in that piece. The cosine repeats every $2\\pi$; $\\cos kx$, every $\\frac{2\\pi}{k}$.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\cos\\frac{x}{3}$ funtzioaren periodoa.', 'Halla el periodo de $g(x)=\\cos\\frac{x}{3}$.', 'أوجد دور $g(x)=\\cos\\frac{x}{3}$.', 'Find the period of $g(x)=\\cos\\frac{x}{3}$.'),
        example: same('$\\frac{x+T}{3}=\\frac{x}{3}+2\\pi\\ \\to\\ T=6\\pi$'),
        exampleAnswer: say('$T=6\\pi$: grafikoa luzatu egiten da, eta periodoa bider 3 egiten da.', '$T=6\\pi$: la gráfica se estira y el periodo se multiplica por 3.', '$T=6\\pi$: يتمدد الرسم ويُضرب الدور في 3.', '$T=6\\pi$: the graph is stretched and the period is multiplied by 3.'),
        why: {
            text: say(
                'Zergatik da $\\cos kx$ funtzioaren periodoa $\\frac{2\\pi}{k}$? Kosinua $2\\pi$ unitatez behin errepikatzen da, eta $kx$ adierazpenak $2\\pi$ egiten du aurrera $x$ aldagaiak $\\frac{2\\pi}{k}$ egiten duenean.',
                '¿Por qué $\\cos kx$ tiene periodo $\\frac{2\\pi}{k}$? El coseno se repite cada $2\\pi$, y $kx$ avanza $2\\pi$ cuando $x$ avanza $\\frac{2\\pi}{k}$.',
                'لماذا دور $\\cos kx$ هو $\\frac{2\\pi}{k}$؟ جيب التمام يتكرر كل $2\\pi$، و$kx$ يتقدم $2\\pi$ عندما يتقدم $x$ بمقدار $\\frac{2\\pi}{k}$.',
                'Why does $\\cos kx$ have period $\\frac{2\\pi}{k}$? The cosine repeats every $2\\pi$, and $kx$ moves on $2\\pi$ when $x$ moves on $\\frac{2\\pi}{k}$.'
            ),
            math: same('$k\\left(x+\\frac{2\\pi}{k}\\right)=kx+2\\pi$')
        }
    },

    /* ---------- 2. Transformations ---------- */
    shifts: {
        definitions: [
            { term: say('Lekualdaketa', 'Traslación', 'الانسحاب', 'Translation'), meaning: say('Grafiko osoa mugitzea, biratu eta deformatu gabe.', 'Mover la gráfica entera sin girarla ni deformarla.', 'تحريك الرسم كله دون تدويره أو تشويهه.', 'Moving the whole graph without turning or bending it.') }
        ],
        vocabulary: [
            say('bertikala', 'vertical', 'رأسي', 'vertical'),
            say('horizontala', 'horizontal', 'أفقي', 'horizontal')
        ],
        explanation: say(
            'Funtzioaren kanpoan batzen den zenbaki batek lekualdaketa bertikala egiten du: $y=f(x)+k$ funtzioak grafikoa $k$ unitate igotzen du. Barruan batzen denak, lekualdaketa horizontala: $y=f(x-a)$ funtzioak $a$ unitate eramaten du eskuinera. Barruko zeinuak engainatzen du: $x+3$ ezkerrera doa.',
            'Un número sumado fuera de la función hace una traslación vertical: $y=f(x)+k$ sube la gráfica $k$ unidades. Uno sumado dentro hace una traslación horizontal: $y=f(x-a)$ la lleva $a$ unidades a la derecha. El signo de dentro engaña: $x+3$ va a la izquierda.',
            'العدد المضاف خارج الدالة يُحدث انسحابًا رأسيًا: $y=f(x)+k$ ترفع الرسم $k$ وحدة. والعدد المضاف داخلها يُحدث انسحابًا أفقيًا: $y=f(x-a)$ تنقله $a$ وحدة إلى اليمين. والإشارة الداخلية خادعة: $x+3$ تذهب إلى اليسار.',
            'A number added outside the function makes a vertical translation: $y=f(x)+k$ raises the graph $k$ units. One added inside makes a horizontal translation: $y=f(x-a)$ moves it $a$ units to the right. The sign inside is tricky: $x+3$ goes to the left.'
        ),
        examplePrompt: say('$f$ funtzioaren grafikoa $(4,1)$ puntutik pasatzen da. Zein puntutatik pasatzen da $y=f(x-5)+3$?', 'La gráfica de $f$ pasa por $(4,1)$. ¿Por qué punto pasa $y=f(x-5)+3$?', 'يمر رسم $f$ بالنقطة $(4,1)$. بأي نقطة يمر $y=f(x-5)+3$؟', 'The graph of $f$ passes through $(4,1)$. Which point does $y=f(x-5)+3$ pass through?'),
        example: same('$x-5=4\\ \\to\\ x=9\\qquad 1+3=4$'),
        exampleAnswer: say('$(9,4)$ puntutik: 5 unitate eskuinera eta 3 gora.', 'Por $(9,4)$: 5 unidades a la derecha y 3 hacia arriba.', 'بالنقطة $(9,4)$: 5 وحدات إلى اليمين و3 إلى الأعلى.', 'Through $(9,4)$: 5 units to the right and 3 up.'),
        why: {
            text: say(
                'Zergatik doa $f(x-a)$ eskuinera? $f$ funtzioak 0 puntuan zuena orain $x-a=0$ denean ateratzen da, hau da, $x=a$ puntuan: dena $a$ unitate beranduago iristen da.',
                '¿Por qué $f(x-a)$ va a la derecha? Lo que $f$ hacía en 0 ahora pasa cuando $x-a=0$, es decir, en $x=a$: todo llega $a$ unidades más tarde.',
                'لماذا تذهب $f(x-a)$ إلى اليمين؟ ما كانت تفعله $f$ عند 0 يحدث الآن عندما $x-a=0$، أي عند $x=a$: كل شيء يصل متأخرًا $a$ وحدة.',
                'Why does $f(x-a)$ go to the right? What $f$ did at 0 now happens when $x-a=0$, that is, at $x=a$: everything arrives $a$ units later.'
            )
        }
    },
    reflections: {
        definitions: [
            { term: say('Islapena', 'Reflexión', 'الانعكاس', 'Reflection'), meaning: say('Ardatz bat ispilutzat hartuta ikusten den grafikoa.', 'La gráfica vista en un espejo que es uno de los ejes.', 'الرسم كما يُرى في مرآة هي أحد المحورين.', 'The graph seen in a mirror that is one of the axes.') }
        ],
        vocabulary: [
            say('ispilua', 'espejo', 'المرآة', 'mirror'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Kanpoko zeinuak, $y=-f(x)$, $y$ balio guztiak aldatzen ditu: grafikoa X ardatzean islatzen da. Barruko zeinuak, $y=f(-x)$, $x$ balioak aldatzen ditu: Y ardatzean islatzen da. Biek batera, $y=-f(-x)$, jatorriarekiko simetrikoa ematen dute.',
            'El signo de fuera, $y=-f(x)$, cambia todas las $y$: la gráfica se refleja en el eje X. El signo de dentro, $y=f(-x)$, cambia las $x$: se refleja en el eje Y. Los dos a la vez, $y=-f(-x)$, dan la simétrica respecto del origen.',
            'الإشارة الخارجية، $y=-f(x)$، تغيّر كل قيم $y$: ينعكس الرسم في محور X. والإشارة الداخلية، $y=f(-x)$، تغيّر قيم $x$: ينعكس في محور Y. والاثنتان معًا، $y=-f(-x)$، تعطيان المتناظر حول الأصل.',
            'The sign outside, $y=-f(x)$, changes every $y$: the graph is reflected in the x-axis. The sign inside, $y=f(-x)$, changes the $x$ values: it is reflected in the y-axis. Both at once, $y=-f(-x)$, give the graph symmetric about the origin.'
        ),
        examplePrompt: say('Nolakoa da $y=\\log_2(-x)$ funtzioaren grafikoa? Zein puntutatik pasatzen da $x=-8$ denean?', '¿Cómo es la gráfica de $y=\\log_2(-x)$? ¿Por qué punto pasa con $x=-8$?', 'كيف يبدو رسم $y=\\log_2(-x)$؟ وبأي نقطة يمر عند $x=-8$؟', 'What does the graph of $y=\\log_2(-x)$ look like? Which point does it pass through at $x=-8$?'),
        example: same('$\\log_2(-(-8))=\\log_2 8=3$'),
        exampleAnswer: say('$\\log_2 x$ da, Y ardatzean islatuta: ezkerrean dago eta $(-8,3)$ puntutik pasatzen da.', 'Es $\\log_2 x$ reflejada en el eje Y: está a la izquierda y pasa por $(-8,3)$.', 'إنها انعكاس $\\log_2 x$ في محور Y: تقع إلى اليسار وتمر بالنقطة $(-8,3)$.', 'It is $\\log_2 x$ reflected in the y-axis: it lies on the left and passes through $(-8,3)$.')
    },
    stretch: {
        definitions: [
            { term: say('Luzapen bertikala', 'Estiramiento vertical', 'التمديد الرأسي', 'Vertical stretch'), meaning: say('$y=k\\cdot f(x)$: altuera guztiak bider $k$, $k>1$ denean.', '$y=k\\cdot f(x)$: todas las alturas por $k$, con $k>1$.', '$y=k\\cdot f(x)$: كل الارتفاعات مضروبة في $k$ مع $k>1$.', '$y=k\\cdot f(x)$: every height times $k$, with $k>1$.') }
        ],
        vocabulary: [
            say('faktorea', 'factor', 'المعامل', 'factor'),
            say('estutu', 'comprimir', 'يقلّص', 'squeeze'),
            say('altuera', 'altura', 'الارتفاع', 'height')
        ],
        explanation: say(
            'Kanpoko faktore batek, $y=k\\cdot f(x)$, altuera guztiak bider $k$ egiten ditu: grafikoa bertikalki luzatzen da. Barruko faktore batek, $y=f(kx)$, distantzia horizontalak $k$ zenbakiaz zatitzen ditu: $k>1$ denean, grafikoa estutu egiten da. Aldaketa batzuk elkarren segidan badaude, lehenik barrukoa egiten da, $x$ aldagaian, eta gero kanpokoa.',
            'Un factor fuera, $y=k\\cdot f(x)$, multiplica todas las alturas por $k$: la gráfica se estira en vertical. Un factor dentro, $y=f(kx)$, divide las distancias horizontales entre $k$: con $k>1$, la gráfica se comprime. Si hay varios cambios seguidos, primero va el de dentro, en la $x$, y después el de fuera.',
            'المعامل الخارجي، $y=k\\cdot f(x)$، يضرب كل الارتفاعات في $k$: يتمدد الرسم رأسيًا. والمعامل الداخلي، $y=f(kx)$، يقسم المسافات الأفقية على $k$: مع $k>1$ يتقلص الرسم. وإذا تتابعت عدة تغييرات فالداخلي أولًا، في $x$، ثم الخارجي.',
            'A factor outside, $y=k\\cdot f(x)$, multiplies every height by $k$: the graph is stretched vertically. A factor inside, $y=f(kx)$, divides the horizontal distances by $k$: with $k>1$, the graph is squeezed. If there are several changes in a row, the inside one comes first, on $x$, and then the outside one.'
        ),
        examplePrompt: say('$f$ funtzioaren grafikoa $(1,4)$ puntutik pasatzen da. Zein puntutatik pasatzen da $y=-2f(x+3)+1$?', 'La gráfica de $f$ pasa por $(1,4)$. ¿Por qué punto pasa $y=-2f(x+3)+1$?', 'يمر رسم $f$ بالنقطة $(1,4)$. بأي نقطة يمر $y=-2f(x+3)+1$؟', 'The graph of $f$ passes through $(1,4)$. Which point does $y=-2f(x+3)+1$ pass through?'),
        example: same('$x+3=1\\ \\to\\ x=-2\\qquad -2\\cdot 4+1=-7$'),
        exampleAnswer: say('$(-2,-7)$ puntutik: lehenik barrukoa ($x$), eta gero kanpokoa, biderkatu eta batu.', 'Por $(-2,-7)$: primero lo de dentro (la $x$) y después lo de fuera, multiplicar y sumar.', 'بالنقطة $(-2,-7)$: أولًا ما في الداخل (أي $x$) ثم ما في الخارج، الضرب ثم الجمع.', 'Through $(-2,-7)$: first the inside (the $x$) and then the outside, multiply and add.')
    },

    /* ---------- 3. The inverse function ---------- */
    'inverse-function': {
        definitions: [
            { term: say('Funtzio injektiboa', 'Función inyectiva', 'الدالة المتباينة', 'Injective function'), meaning: say('Irudi bakoitza $x$ bakar batetik datorrena.', 'Aquella en la que cada imagen viene de un solo $x$.', 'الدالة التي تأتي فيها كل صورة من قيمة واحدة لـ $x$.', 'One in which each image comes from a single $x$.') },
            { term: say('Alderantzizko funtzioa', 'Función inversa', 'الدالة العكسية', 'Inverse function'), meaning: say('$f(a)$ irudi bakoitza $a$ zenbakira itzultzen duen funtzioa: $f^{-1}$.', 'La que devuelve cada imagen $f(a)$ a su $a$: se escribe $f^{-1}$.', 'الدالة التي تعيد كل صورة $f(a)$ إلى $a$: نكتبها $f^{-1}$.', 'The one that takes each image $f(a)$ back to its $a$: it is written $f^{-1}$.') }
        ],
        vocabulary: [
            say('askatu', 'despejar', 'اعزل', 'solve for'),
            say('irudia', 'imagen', 'الصورة', 'image'),
            say('desegin', 'deshacer', 'تعكس', 'undo')
        ],
        explanation: say(
            'Alderantzizko funtzioak $f$ funtzioak egiten duena desegiten du: $f(a)=b$ bada, $f^{-1}(b)=a$. Funtzio injektiboek bakarrik dute alderantzizkoa. Kalkulatzeko, $y=f(x)$ idatzi, $x$ askatu eta letrak trukatzen dira. Kontuz: $f^{-1}(x)$ ez da $\\frac{1}{f(x)}$.',
            'La función inversa deshace lo que hace $f$: si $f(a)=b$, entonces $f^{-1}(b)=a$. Solo tienen inversa las funciones inyectivas. Para calcularla se escribe $y=f(x)$, se despeja $x$ y se cambian las letras. Ojo: $f^{-1}(x)$ no es $\\frac{1}{f(x)}$.',
            'الدالة العكسية تعكس ما تفعله $f$: إذا كان $f(a)=b$ فإن $f^{-1}(b)=a$. ولا يكون للدالة عكسية إلا إذا كانت متباينة. ولحسابها نكتب $y=f(x)$ ونعزل $x$ ثم نبدّل الحرفين. انتبه: $f^{-1}(x)$ ليست $\\frac{1}{f(x)}$.',
            'The inverse function undoes what $f$ does: if $f(a)=b$, then $f^{-1}(b)=a$. Only injective functions have an inverse. To find it, write $y=f(x)$, solve for $x$ and swap the letters. Careful: $f^{-1}(x)$ is not $\\frac{1}{f(x)}$.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\frac{3}{x-1}$ funtzioaren alderantzizkoa.', 'Halla la inversa de $g(x)=\\frac{3}{x-1}$.', 'أوجد الدالة العكسية لـ $g(x)=\\frac{3}{x-1}$.', 'Find the inverse of $g(x)=\\frac{3}{x-1}$.'),
        example: same('$x=\\frac{3}{y-1}\\ \\to\\ y-1=\\frac{3}{x}\\ \\to\\ y=\\frac{3}{x}+1$'),
        exampleAnswer: say('$g^{-1}(x)=\\frac{3}{x}+1$, $x\\neq 0$ denean.', '$g^{-1}(x)=\\frac{3}{x}+1$, para $x\\neq 0$.', '$g^{-1}(x)=\\frac{3}{x}+1$ عندما $x\\neq 0$.', '$g^{-1}(x)=\\frac{3}{x}+1$, for $x\\neq 0$.'),
        why: {
            text: say(
                'Zergatik trukatzen dira $x$ eta $y$? Alderantzizkoak bikote bakoitzari buelta ematen dio: $(5,4)$ puntua $f$ funtzioan badago, $(4,5)$ puntua $f^{-1}$ funtzioan dago. Letrak trukatzea bikote guztiei batera buelta ematea da.',
                '¿Por qué se cambian $x$ e $y$? La inversa da la vuelta a cada pareja: si $(5,4)$ está en $f$, $(4,5)$ está en $f^{-1}$. Cambiar las letras es dar la vuelta a todas las parejas a la vez.',
                'لماذا نبدّل $x$ و$y$؟ الدالة العكسية تقلب كل زوج: إذا كانت $(5,4)$ على $f$ فإن $(4,5)$ على $f^{-1}$. وتبديل الحرفين يقلب كل الأزواج دفعة واحدة.',
                'Why are $x$ and $y$ swapped? The inverse turns each pair round: if $(5,4)$ is on $f$, $(4,5)$ is on $f^{-1}$. Swapping the letters turns all the pairs round at once.'
            )
        }
    },
    'inverse-graph': {
        definitions: [
            { term: say('Adarra', 'Rama', 'الفرع', 'Branch'), meaning: say('Funtzioaren zati bat, non injektiboa den.', 'Un trozo de la función en el que sí es inyectiva.', 'جزء من الدالة تكون فيه متباينة.', 'A piece of the function on which it is injective.') },
            { term: say('Ibiltartea', 'Recorrido', 'المدى', 'Range'), meaning: say('$f(x)$ funtzioak hartzen dituen balioak.', 'Los valores que toma $f(x)$.', 'القيم التي تأخذها $f(x)$.', 'The values that $f(x)$ takes.') }
        ],
        vocabulary: [
            say('erdikaria', 'bisectriz', 'المنصّف', 'bisector'),
            say('simetrikoa', 'simétrica', 'متناظرة', 'symmetric'),
            say('horizontala', 'horizontal', 'أفقي', 'horizontal')
        ],
        explanation: say(
            '$f^{-1}$ funtzioaren grafikoa $f$ funtzioarenaren simetrikoa da $y=x$ zuzenarekiko, lehen koadranteko erdikariarekiko. Zuzen horizontal batek $f$ bi aldiz mozten badu, ez du alderantzizkorik: adar bat hautatu behar da. Funtzio baten izate-eremua bestearen ibiltartea da.',
            'La gráfica de $f^{-1}$ es la simétrica de la de $f$ respecto de la recta $y=x$, la bisectriz del primer cuadrante. Si una recta horizontal corta a $f$ dos veces, no tiene inversa: hay que elegir una rama. El dominio de una es el recorrido de la otra.',
            'رسم $f^{-1}$ هو متناظر رسم $f$ بالنسبة إلى المستقيم $y=x$، منصّف الربع الأول. وإذا قطع مستقيم أفقي الدالة $f$ مرتين فليس لها عكسية: يجب اختيار فرع. ومجال إحداهما هو مدى الأخرى.',
            'The graph of $f^{-1}$ is the reflection of that of $f$ in the line $y=x$, the bisector of the first quadrant. If a horizontal line cuts $f$ twice, it has no inverse: you have to choose a branch. The domain of one is the range of the other.'
        ),
        examplePrompt: say('Aurkitu $g(x)=(x-3)^2$ funtzioaren alderantzizkoa, $x\\ge 3$ adarrean.', 'Halla la inversa de $g(x)=(x-3)^2$ en la rama $x\\ge 3$.', 'أوجد الدالة العكسية لـ $g(x)=(x-3)^2$ على الفرع $x\\ge 3$.', 'Find the inverse of $g(x)=(x-3)^2$ on the branch $x\\ge 3$.'),
        example: same('$x-3=\\sqrt{y}\\ \\to\\ y=\\sqrt{x}+3$'),
        exampleAnswer: say('$g^{-1}(x)=\\sqrt{x}+3$, $x\\ge 0$ denean: adarraren ibiltartea.', '$g^{-1}(x)=\\sqrt{x}+3$, con $x\\ge 0$: el recorrido de la rama.', '$g^{-1}(x)=\\sqrt{x}+3$ مع $x\\ge 0$: مدى الفرع.', '$g^{-1}(x)=\\sqrt{x}+3$, with $x\\ge 0$: the range of the branch.'),
        why: {
            text: say(
                'Zergatik da $y=x$ zuzenarekiko simetrikoa? $(a,b)$ puntua $f$ funtzioan badago, $(b,a)$ puntua $f^{-1}$ funtzioan dago, eta bi puntu horiek $y=x$ zuzenaren alde banatan daude, distantzia berean.',
                '¿Por qué es la simétrica respecto de $y=x$? Si $(a,b)$ está en $f$, $(b,a)$ está en $f^{-1}$, y esos dos puntos quedan a los dos lados de $y=x$, a la misma distancia.',
                'لماذا يكون متناظرًا بالنسبة إلى $y=x$؟ إذا كانت $(a,b)$ على $f$ فإن $(b,a)$ على $f^{-1}$، وهاتان النقطتان على جانبي $y=x$ وعلى البعد نفسه.',
                'Why is it the reflection in $y=x$? If $(a,b)$ is on $f$, $(b,a)$ is on $f^{-1}$, and those two points lie on either side of $y=x$, at the same distance.'
            )
        }
    },
    'exp-log': {
        definitions: [
            { term: say('Funtzio logaritmikoa', 'Función logarítmica', 'الدالة اللوغاريتمية', 'Logarithmic function'), meaning: say('$y=\\log_a x$, $y=a^x$ funtzioaren alderantzizkoa.', '$y=\\log_a x$, la inversa de $y=a^x$.', '$y=\\log_a x$، الدالة العكسية لـ $y=a^x$.', '$y=\\log_a x$, the inverse of $y=a^x$.') }
        ],
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('gorakorra', 'creciente', 'متزايدة', 'increasing'),
            say('beherakorra', 'decreciente', 'متناقصة', 'decreasing'),
            say('asintota', 'asíntota', 'المقارب', 'asymptote')
        ],
        explanation: say(
            '$y=a^x$ eta $y=\\log_a x$ alderantzizkoak dira: batak bestea desegiten du. Esponentzialaren izate-eremua $\\mathbb{R}$ da eta ibiltartea $(0,+\\infty)$; logaritmoarena, alderantziz. $a>1$ denean, biak dira gorakorrak; oinarria 0 eta 1 artean dagoenean, biak beherakorrak. Esponentzialak $y=0$ asintota du, eta logaritmoak, $x=0$.',
            '$y=a^x$ e $y=\\log_a x$ son inversas: una deshace la otra. La exponencial tiene dominio $\\mathbb{R}$ y recorrido $(0,+\\infty)$; el logaritmo, al revés. Con $a>1$, las dos son crecientes; con base entre 0 y 1, las dos son decrecientes. La exponencial tiene la asíntota $y=0$, y el logaritmo, $x=0$.',
            '$y=a^x$ و$y=\\log_a x$ دالتان عكسيتان: كل منهما تعكس الأخرى. مجال الأسية $\\mathbb{R}$ ومداها $(0,+\\infty)$، واللوغاريتم بالعكس. مع $a>1$ كلتاهما متزايدة، ومع أساس بين 0 و1 كلتاهما متناقصة. للأسية المقارب $y=0$، وللوغاريتم $x=0$.',
            '$y=a^x$ and $y=\\log_a x$ are inverses: one undoes the other. The exponential has domain $\\mathbb{R}$ and range $(0,+\\infty)$; the logarithm, the other way round. With $a>1$, both are increasing; with a base between 0 and 1, both are decreasing. The exponential has the asymptote $y=0$, and the logarithm, $x=0$.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\log_2(x+4)$ funtzioaren alderantzizkoa.', 'Halla la inversa de $g(x)=\\log_2(x+4)$.', 'أوجد الدالة العكسية لـ $g(x)=\\log_2(x+4)$.', 'Find the inverse of $g(x)=\\log_2(x+4)$.'),
        example: same('$x=\\log_2(y+4)\\ \\to\\ y+4=2^x\\ \\to\\ y=2^x-4$'),
        exampleAnswer: say('$g^{-1}(x)=2^x-4$, $\\mathbb{R}$ osoan definitua.', '$g^{-1}(x)=2^x-4$, definida en todo $\\mathbb{R}$.', '$g^{-1}(x)=2^x-4$، معرّفة على كل $\\mathbb{R}$.', '$g^{-1}(x)=2^x-4$, defined on the whole of $\\mathbb{R}$.')
    },
    arc: {
        definitions: [
            { term: say('Arku sinua', 'Arco seno', 'قوس الجيب', 'Arc sine'), meaning: say('$\\arcsin x$: $\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]$ tarteko angelua, sinua $x$ duena.', '$\\arcsin x$: el ángulo de $\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]$ cuyo seno es $x$.', '$\\arcsin x$: الزاوية من $\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]$ التي جيبها $x$.', '$\\arcsin x$: the angle in $\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]$ whose sine is $x$.') },
            { term: say('Arku kosinua', 'Arco coseno', 'قوس جيب التمام', 'Arc cosine'), meaning: say('$\\arccos x$: $[0,\\pi]$ tarteko angelua, kosinua $x$ duena.', '$\\arccos x$: el ángulo de $[0,\\pi]$ cuyo coseno es $x$.', '$\\arccos x$: الزاوية من $[0,\\pi]$ التي جيب تمامها $x$.', '$\\arccos x$: the angle in $[0,\\pi]$ whose cosine is $x$.') }
        ],
        vocabulary: [
            say('radiana', 'radián', 'الراديان', 'radian'),
            say('tangentea', 'tangente', 'الظل', 'tangent'),
            say('angelua', 'ángulo', 'الزاوية', 'angle')
        ],
        explanation: say(
            'Sinuak, kosinuak eta tangenteak ez dute alderantzizkorik $\\mathbb{R}$ osoan: angelu askok dute arrazoi bera. Horregatik, adar bat hartzen da, eta arku-funtzioek angelu bakarra ematen dute, radianetan. Arku sinuak eta arku tangenteak $-\\frac{\\pi}{2}$ eta $\\frac{\\pi}{2}$ arteko angeluak ematen dituzte; arku kosinuak, 0 eta $\\pi$ artekoak.',
            'El seno, el coseno y la tangente no tienen inversa en todo $\\mathbb{R}$: muchos ángulos tienen la misma razón. Por eso se toma una rama, y las funciones arco dan un solo ángulo, en radianes. El arco seno y el arco tangente dan ángulos entre $-\\frac{\\pi}{2}$ y $\\frac{\\pi}{2}$; el arco coseno, entre 0 y $\\pi$.',
            'ليس للجيب وجيب التمام والظل دوال عكسية على كل $\\mathbb{R}$: لزوايا كثيرة النسبة نفسها. لذلك نأخذ فرعًا، فتعطي دوال القوس زاوية واحدة بالراديان. قوس الجيب وقوس الظل يعطيان زوايا بين $-\\frac{\\pi}{2}$ و$\\frac{\\pi}{2}$، وقوس جيب التمام بين 0 و$\\pi$.',
            'The sine, the cosine and the tangent have no inverse on the whole of $\\mathbb{R}$: many angles share the same ratio. So a branch is taken, and the arc functions give a single angle, in radians. The arc sine and the arc tangent give angles between $-\\frac{\\pi}{2}$ and $\\frac{\\pi}{2}$; the arc cosine, between 0 and $\\pi$.'
        ),
        examplePrompt: say('Kalkulatu $\\arctan(-1)$ eta $\\arcsin\\left(-\\frac{\\sqrt{3}}{2}\\right)$.', 'Calcula $\\arctan(-1)$ y $\\arcsin\\left(-\\frac{\\sqrt{3}}{2}\\right)$.', 'احسب $\\arctan(-1)$ و$\\arcsin\\left(-\\frac{\\sqrt{3}}{2}\\right)$.', 'Work out $\\arctan(-1)$ and $\\arcsin\\left(-\\frac{\\sqrt{3}}{2}\\right)$.'),
        example: same('$\\arctan(-1)=-\\frac{\\pi}{4}\\qquad\\arcsin\\left(-\\frac{\\sqrt{3}}{2}\\right)=-\\frac{\\pi}{3}$'),
        exampleAnswer: say('Biak negatiboak dira: arku sinuak eta arku tangenteak $-\\frac{\\pi}{2}$ eta $\\frac{\\pi}{2}$ arteko angeluak ematen dituzte.', 'Los dos son negativos: el arco seno y el arco tangente dan ángulos entre $-\\frac{\\pi}{2}$ y $\\frac{\\pi}{2}$.', 'كلاهما سالب: قوس الجيب وقوس الظل يعطيان زوايا بين $-\\frac{\\pi}{2}$ و$\\frac{\\pi}{2}$.', 'Both are negative: the arc sine and the arc tangent give angles between $-\\frac{\\pi}{2}$ and $\\frac{\\pi}{2}$.')
    },

    /* ---------- 4. Piecewise functions ---------- */
    piecewise: {
        definitions: [
            { term: say('Zatika definitutako funtzioa', 'Función a trozos', 'دالة معرّفة على أجزاء', 'Piecewise function'), meaning: say('$x$ aldagaiaren tarte bakoitzean formula desberdina duen funtzioa.', 'Una función con una fórmula distinta en cada tramo de $x$.', 'دالة لها صيغة مختلفة في كل مجال من قيم $x$.', 'A function with a different formula on each stretch of $x$.') }
        ],
        vocabulary: [
            say('tartea', 'tramo', 'المجال', 'stretch'),
            say('muturra', 'extremo', 'الطرف', 'end'),
            say('jauzia', 'salto', 'القفزة', 'jump')
        ],
        explanation: say(
            'Zati bakoitza bere tartean bakarrik marrazten da. Muturretan, puntu itxia jartzen da $\\le$ edo $\\ge$ dagoenean, eta irekia $<$ edo $>$ dagoenean. $f(a)$ kalkulatzeko, $a$ dagoen tarteko formula erabiltzen da, bakarra. Bi zatiren muturrak bat ez badatoz, grafikoak jauzi bat egiten du.',
            'Cada trozo se dibuja solo en su tramo. En los extremos se pone punto cerrado donde va $\\le$ o $\\ge$, y abierto donde va $<$ o $>$. Para calcular $f(a)$ se usa la fórmula del tramo en el que está $a$, solo una. Si los extremos de dos trozos no coinciden, la gráfica da un salto.',
            'يُرسم كل جزء في مجاله فقط. وعند الأطراف نضع نقطة مغلقة حيث يوجد $\\le$ أو $\\ge$، ومفتوحة حيث يوجد $<$ أو $>$. ولحساب $f(a)$ نستعمل صيغة المجال الذي يقع فيه $a$، صيغة واحدة فقط. وإذا لم يتطابق طرفا جزأين فإن الرسم يقفز قفزة.',
            'Each piece is drawn only on its stretch. At the ends, put a closed dot where there is $\\le$ or $\\ge$, and an open one where there is $<$ or $>$. To work out $f(a)$, use the formula of the stretch that $a$ is in, only one. If the ends of two pieces do not match, the graph makes a jump.'
        ),
        examplePrompt: say('Kalkulatu $f(-3)$, $f(0)$ eta $f(5)$, $f(x)=\\begin{cases}x^2 & x<0\\\\ 4-x & x\\ge 0\\end{cases}$ bada.', 'Calcula $f(-3)$, $f(0)$ y $f(5)$ si $f(x)=\\begin{cases}x^2 & x<0\\\\ 4-x & x\\ge 0\\end{cases}$', 'احسب $f(-3)$ و$f(0)$ و$f(5)$ إذا كانت $f(x)=\\begin{cases}x^2 & x<0\\\\ 4-x & x\\ge 0\\end{cases}$', 'Work out $f(-3)$, $f(0)$ and $f(5)$ if $f(x)=\\begin{cases}x^2 & x<0\\\\ 4-x & x\\ge 0\\end{cases}$'),
        example: same('$f(-3)=(-3)^2=9\\qquad f(0)=4-0=4\\qquad f(5)=4-5=-1$'),
        exampleAnswer: say('$f(0)$ kalkulatzeko, bigarren zatia erabiltzen da, $x\\ge 0$ daramalako.', '$f(0)$ usa el segundo trozo, porque lleva $x\\ge 0$.', '$f(0)$ تستعمل الجزء الثاني لأن فيه $x\\ge 0$.', '$f(0)$ uses the second piece, because it has $x\\ge 0$.')
    },
    absolute: {
        vocabulary: [
            say('tolestu', 'doblar', 'تطوي', 'fold'),
            say('erroak', 'raíces', 'الجذور', 'roots'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            '$|f(x)|$ funtzioa ez da inoiz negatiboa: $f(x)\\ge 0$ den lekuan, berdin geratzen da; $f(x)<0$ den lekuan, zeinua aldatzen zaio. Zatika idazteko, $f$ funtzioaren erroak bilatzen dira, eta tarte bakoitzaren zeinua aztertzen da. Grafikoan, X ardatzaren azpian zegoena gora tolesten da.',
            '$|f(x)|$ nunca es negativa: donde $f(x)\\ge 0$, queda igual; donde $f(x)<0$, se le cambia el signo. Para escribirla a trozos se buscan las raíces de $f$ y se mira el signo de cada tramo. En la gráfica, lo que estaba bajo el eje X se dobla hacia arriba.',
            '$|f(x)|$ لا تكون سالبة أبدًا: حيث $f(x)\\ge 0$ تبقى كما هي، وحيث $f(x)<0$ نغيّر إشارتها. ولكتابتها على أجزاء نبحث عن جذور $f$ وننظر إلى إشارة كل مجال. وفي الرسم، ما كان تحت محور X يُطوى إلى الأعلى.',
            '$|f(x)|$ is never negative: where $f(x)\\ge 0$, it stays the same; where $f(x)<0$, its sign is changed. To write it piecewise, find the roots of $f$ and look at the sign on each stretch. On the graph, what was below the x-axis is folded up.'
        ),
        examplePrompt: say('Idatzi $y=|2^x-4|$ zatika.', 'Escribe $y=|2^x-4|$ a trozos.', 'اكتب $y=|2^x-4|$ على أجزاء.', 'Write $y=|2^x-4|$ piecewise.'),
        example: same('$y=\\begin{cases}4-2^x & x<2\\\\ 2^x-4 & x\\ge 2\\end{cases}$'),
        exampleAnswer: say('Aldaketa $x=2$ puntuan dago, $2^x=4$ denean.', 'El cambio está en $x=2$, donde $2^x=4$.', 'التغيّر عند $x=2$ حيث $2^x=4$.', 'The change is at $x=2$, where $2^x=4$.'),
        why: {
            text: say(
                'Zergatik aldatzen da zeinua erroen artean? Polinomio batek bere erroetan bakarrik aldatzen du zeinua, eta $x^2-2x-3$ polinomioak $-3$ balio du $x=0$ denean: $(-1,3)$ tarte osoa negatiboa da.',
                '¿Por qué se cambia el signo justo entre las raíces? Un polinomio solo cambia de signo en sus raíces, y $x^2-2x-3$ vale $-3$ en $x=0$: todo el tramo $(-1,3)$ es negativo.',
                'لماذا تتغير الإشارة بين الجذرين بالضبط؟ الحدودية لا تغيّر إشارتها إلا عند جذورها، و$x^2-2x-3$ تساوي $-3$ عند $x=0$: إذن المجال $(-1,3)$ كله سالب.',
                'Why does the sign change exactly between the roots? A polynomial only changes sign at its roots, and $x^2-2x-3$ is $-3$ at $x=0$: the whole stretch $(-1,3)$ is negative.'
            ),
            math: same('$0^2-2\\cdot 0-3=-3$')
        }
    },
    floor: {
        definitions: [
            { term: say('Zati osoa', 'Parte entera', 'الجزء الصحيح', 'Integer part'), meaning: say('$E(x)$: $x$ baino txikiagoa edo berdina den zenbaki oso handiena.', '$E(x)$: el mayor número entero menor o igual que $x$.', '$E(x)$: أكبر عدد صحيح أصغر من $x$ أو يساويه.', '$E(x)$: the largest whole number less than or equal to $x$.') },
            { term: say('Zati hamartarra', 'Parte decimal', 'الجزء الكسري', 'Fractional part'), meaning: say('$x-E(x)$: beti 0 eta 1 artean, 1 sartu gabe.', '$x-E(x)$: siempre entre 0 y 1, sin llegar a 1.', '$x-E(x)$: دائمًا بين 0 و1 دون أن يبلغ 1.', '$x-E(x)$: always between 0 and 1, never reaching 1.') }
        ],
        vocabulary: [
            say('eskailera', 'escalera', 'الدرج', 'staircase'),
            say('biribildu', 'redondear', 'يقرّب', 'round')
        ],
        explanation: say(
            'Zati osoak beti beherantz biribiltzen du: $E(3{,}7)=3$ da, baina negatiboekin ere behera egiten da, ez 0 zenbakirantz. Haren grafikoa eskailera bat da: maila bakoitza ezkerrean itxita dago eta eskuinean irekita. Zati hamartarra $x-E(x)$ da, eta beti positiboa edo 0.',
            'La parte entera siempre redondea hacia abajo: $E(3{,}7)=3$, pero con los negativos también se baja, no se va hacia el 0. Su gráfica es una escalera: cada peldaño está cerrado a la izquierda y abierto a la derecha. La parte decimal es $x-E(x)$, siempre positiva o 0.',
            'الجزء الصحيح يقرّب دائمًا إلى الأسفل: $E(3{,}7)=3$، ومع الأعداد السالبة ننزل أيضًا ولا نذهب نحو 0. رسمه درج: كل درجة مغلقة من اليسار ومفتوحة من اليمين. والجزء الكسري هو $x-E(x)$، وهو دائمًا موجب أو 0.',
            'The integer part always rounds down: $E(3{,}7)=3$, but with negative numbers you also go down, not towards 0. Its graph is a staircase: each step is closed on the left and open on the right. The fractional part is $x-E(x)$, always positive or 0.'
        ),
        examplePrompt: say('Kalkulatu $E(-6{,}25)$ eta $8{,}75$ zenbakiaren zati hamartarra.', 'Calcula $E(-6{,}25)$ y la parte decimal de $8{,}75$.', 'احسب $E(-6{,}25)$ والجزء الكسري لـ $8{,}75$.', 'Work out $E(-6{,}25)$ and the fractional part of $8{,}75$.'),
        example: same('$E(-6{,}25)=-7\\qquad 8{,}75-E(8{,}75)=8{,}75-8=0{,}75$'),
        exampleAnswer: say('$-7\\le -6{,}25<-6$: zati osoa $-7$ da, ez $-6$.', '$-7\\le -6{,}25<-6$: la parte entera es $-7$, no $-6$.', '$-7\\le -6{,}25<-6$: الجزء الصحيح هو $-7$ لا $-6$.', '$-7\\le -6{,}25<-6$: the integer part is $-7$, not $-6$.'),
        why: {
            text: say(
                'Zergatik ez da $-2{,}4$ zenbakiaren zati hamartarra 0,4? $x$ zenbakia $E(x)$ gehi zati hamartarra delako, eta zati hamartarra 0 eta 1 artean dagoelako.',
                '¿Por qué la parte decimal de $-2{,}4$ no es 0,4? Porque $x$ es $E(x)$ más la parte decimal, y la parte decimal está entre 0 y 1.',
                'لماذا لا يكون الجزء الكسري لـ $-2{,}4$ هو 0.4؟ لأن $x$ يساوي $E(x)$ زائد الجزء الكسري، والجزء الكسري بين 0 و1.',
                'Why is the fractional part of $-2{,}4$ not 0.4? Because $x$ is $E(x)$ plus the fractional part, and the fractional part lies between 0 and 1.'
            ),
            math: same('$-3+0{,}6=-2{,}4$')
        }
    },

    /* ---------- 5. Operations and composition ---------- */
    operations: {
        definitions: [
            { term: say('Funtzioen batura', 'Suma de funciones', 'مجموع دالتين', 'Sum of functions'), meaning: say('$x$ bakoitzean $f(x)+g(x)$ ematen duen funtzioa.', 'La función que da en cada $x$ el valor $f(x)+g(x)$.', 'الدالة التي تعطي عند كل $x$ القيمة $f(x)+g(x)$.', 'The function that gives, at each $x$, the value $f(x)+g(x)$.') }
        ],
        vocabulary: [
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('ebakidura', 'intersección', 'التقاطع', 'intersection')
        ],
        explanation: say(
            'Funtzioak zenbakiak bezala batu, kendu, biderkatu eta zatitzen dira, $x$ bakoitzean: $(f\\cdot g)(x)=f(x)\\cdot g(x)$. Emaitzaren izate-eremua bi izate-eremuen ebakidura da. Zatiduran, gainera, izendatzailearen zeroak kentzen dira: $\\frac{f}{g}$ ez dago $g(x)=0$ den lekuan.',
            'Las funciones se suman, se restan, se multiplican y se dividen como números, en cada $x$: $(f\\cdot g)(x)=f(x)\\cdot g(x)$. El dominio del resultado es la intersección de los dos dominios. En el cociente, además, se quitan los ceros del denominador: $\\frac{f}{g}$ no existe donde $g(x)=0$.',
            'تُجمع الدوال وتُطرح وتُضرب وتُقسم كالأعداد عند كل $x$: $(f\\cdot g)(x)=f(x)\\cdot g(x)$. ومجال الناتج هو تقاطع المجالين. وفي خارج القسمة نحذف أيضًا أصفار المقام: $\\frac{f}{g}$ غير موجودة حيث $g(x)=0$.',
            'Functions are added, subtracted, multiplied and divided like numbers, at each $x$: $(f\\cdot g)(x)=f(x)\\cdot g(x)$. The domain of the result is the intersection of the two domains. In the quotient, the zeros of the denominator are also removed: $\\frac{f}{g}$ does not exist where $g(x)=0$.'
        ),
        examplePrompt: say('$f(x)=\\sqrt{x}$ eta $g(x)=x-4$ badira, kalkulatu $\\left(\\frac{f}{g}\\right)(9)$ eta $\\frac{f}{g}$ funtzioaren izate-eremua.', 'Con $f(x)=\\sqrt{x}$ y $g(x)=x-4$, calcula $\\left(\\frac{f}{g}\\right)(9)$ y el dominio de $\\frac{f}{g}$.', 'إذا كانت $f(x)=\\sqrt{x}$ و$g(x)=x-4$، فاحسب $\\left(\\frac{f}{g}\\right)(9)$ ومجال $\\frac{f}{g}$.', 'With $f(x)=\\sqrt{x}$ and $g(x)=x-4$, work out $\\left(\\frac{f}{g}\\right)(9)$ and the domain of $\\frac{f}{g}$.'),
        example: same('$\\left(\\frac{f}{g}\\right)(9)=\\frac{\\sqrt{9}}{9-4}=\\frac{3}{5}$'),
        exampleAnswer: say('Izate-eremua $[0,4)\\cup(4,+\\infty)$ da: erroak $x\\ge 0$ eskatzen du, eta izendatzaileak, $x\\neq 4$.', 'El dominio es $[0,4)\\cup(4,+\\infty)$: la raíz pide $x\\ge 0$ y el denominador, $x\\neq 4$.', 'المجال هو $[0,4)\\cup(4,+\\infty)$: يشترط الجذر $x\\ge 0$ ويشترط المقام $x\\neq 4$.', 'The domain is $[0,4)\\cup(4,+\\infty)$: the root needs $x\\ge 0$ and the denominator, $x\\neq 4$.')
    },
    composition: {
        definitions: [
            { term: say('Funtzio konposatua', 'Función compuesta', 'الدالة المركّبة', 'Composite function'), meaning: say('$f\\circ g$: lehenik $g$ eta gero $f$ aplikatzen dituena, $(f\\circ g)(x)=f(g(x))$.', '$f\\circ g$: la que aplica primero $g$ y después $f$, $(f\\circ g)(x)=f(g(x))$.', '$f\\circ g$: التي تطبّق $g$ أولًا ثم $f$، $(f\\circ g)(x)=f(g(x))$.', '$f\\circ g$: the one that applies $g$ first and then $f$, $(f\\circ g)(x)=f(g(x))$.') }
        ],
        vocabulary: [
            say('ordena', 'orden', 'الترتيب', 'order'),
            say('deskonposatu', 'descomponer', 'فكّك', 'break down'),
            say('makina', 'máquina', 'الآلة', 'machine')
        ],
        explanation: say(
            'Bi funtzio konposatzea makina bi segidan jartzea da: $x$ zenbakia $g$ makinan sartzen da, eta haren emaitza $f$ makinan. $f\\circ g$ eskuinetik ezkerrera irakurtzen da: lehenik $g$. Ordena garrantzitsua da: gehienetan, $f\\circ g\\neq g\\circ f$. Funtzio bat deskonposatzeko, aurkitu zer egiten den lehenik eta zer gero.',
            'Componer dos funciones es poner dos máquinas seguidas: $x$ entra en la máquina $g$ y su resultado, en la $f$. $f\\circ g$ se lee de derecha a izquierda: primero $g$. El orden importa: casi siempre $f\\circ g\\neq g\\circ f$. Para descomponer una función, busca qué se hace primero y qué después.',
            'تركيب دالتين هو وضع آلتين متتاليتين: يدخل $x$ في الآلة $g$ ويدخل ناتجها في الآلة $f$. وتُقرأ $f\\circ g$ من اليمين إلى اليسار: أولًا $g$. والترتيب مهم: في أغلب الأحيان $f\\circ g\\neq g\\circ f$. ولتفكيك دالة ابحث عمّا يُفعل أولًا وما يُفعل بعده.',
            'Composing two functions is putting two machines in a row: $x$ goes into machine $g$ and its result into machine $f$. $f\\circ g$ is read from right to left: $g$ first. The order matters: almost always $f\\circ g\\neq g\\circ f$. To break a function down, look for what is done first and what comes after.'
        ),
        examplePrompt: say('Deskonposatu $h(x)=\\sqrt{2x-1}$, $f\\circ g$ moduan.', 'Descompón $h(x)=\\sqrt{2x-1}$ como $f\\circ g$.', 'فكّك $h(x)=\\sqrt{2x-1}$ على صورة $f\\circ g$.', 'Break down $h(x)=\\sqrt{2x-1}$ as $f\\circ g$.'),
        example: same('$g(x)=2x-1\\qquad f(x)=\\sqrt{x}\\qquad h(x)=f(g(x))$'),
        exampleAnswer: say('Lehenik $2x-1$ kalkulatzen da (barruko makina, $g$), eta gero erroa ($f$).', 'Primero se calcula $2x-1$ (la máquina de dentro, $g$) y después la raíz ($f$).', 'أولًا نحسب $2x-1$ (الآلة الداخلية $g$) ثم الجذر ($f$).', 'First $2x-1$ is worked out (the inside machine, $g$) and then the root ($f$).'),
        why: {
            text: say(
                'Zergatik ez dira berdinak $f\\circ g$ eta $g\\circ f$? 3 batu eta gero karratura jasotzea ez da karratura jaso eta gero 3 batzea, 2 zenbakiarekin ikusten den bezala.',
                '¿Por qué $f\\circ g$ y $g\\circ f$ no coinciden? Sumar 3 y luego elevar al cuadrado no es lo mismo que elevar al cuadrado y luego sumar 3, como se ve con el 2.',
                'لماذا لا تتطابق $f\\circ g$ و$g\\circ f$؟ جمع 3 ثم التربيع ليس كالتربيع ثم جمع 3، كما نرى مع العدد 2.',
                'Why are $f\\circ g$ and $g\\circ f$ not the same? Adding 3 and then squaring is not the same as squaring and then adding 3, as you can see with 2.'
            ),
            math: same('$(2+3)^2=25\\qquad 2^2+3=7$')
        }
    }
}
