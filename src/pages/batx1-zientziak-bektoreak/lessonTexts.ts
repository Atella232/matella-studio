import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { BachVectorsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Bektoreak · Batxilergoa 1 · Zientziak — what each lesson tells: the new
   words (definitions), a short explanation, the example as an exercise
   («Another example»), the key words in four languages and, in four
   lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics. The example uses numbers of its
   own, never those of «Let's solve», of «Check it» or of the typical
   mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachVectorsLessonTexts: Record<BachVectorsTopicId, LessonTexts> = {
    /* ---------- 1. Vectors and operations ---------- */
    'free-vectors': {
        definitions: [
            { term: say('Bektore finkoa', 'Vector fijo', 'المتجه المقيّد', 'Fixed vector'), meaning: say('Zuzenki orientatu bat, $\\overrightarrow{AB}$: $A$ jatorria eta $B$ muturra ditu.', 'Un segmento orientado $\\overrightarrow{AB}$, con origen $A$ y extremo $B$.', 'قطعة موجّهة $\\overrightarrow{AB}$ أصلها $A$ وطرفها $B$.', 'A directed segment $\\overrightarrow{AB}$, with start point $A$ and end point $B$.') },
            { term: say('Bektore askea', 'Vector libre', 'المتجه الحر', 'Free vector'), meaning: say('Modulu, norabide eta noranzko bera duten bektore finko guztiak; edozeinek ordezkatzen du.', 'Todos los vectores fijos con el mismo módulo, dirección y sentido; cualquiera de ellos lo representa.', 'كل المتجهات المقيّدة التي لها الطول والاتجاه والمنحى نفسها؛ وأي واحد منها يمثله.', 'All the fixed vectors with the same magnitude, direction and sense; any of them represents it.') }
        ],
        vocabulary: [
            say('modulua', 'módulo', 'الطول', 'magnitude'),
            say('norabidea', 'dirección', 'الاتجاه', 'direction'),
            say('noranzkoa', 'sentido', 'المنحى', 'sense')
        ],
        explanation: say(
            '$\\overrightarrow{AB}$ bektore finkoa $A$ jatorritik $B$ muturrera doa. Modulua (luzera), norabidea (bere zuzenarena) eta noranzkoa ($A$ jatorritik $B$ muturrera) ditu. Hiru gauza horietan bat datozen bektore finkoak ekipolenteak dira, eta bektore aske bera ordezkatzen dute: koordenatu berak dituzte, muturra ken jatorria.',
            'Un vector fijo $\\overrightarrow{AB}$ va de un origen $A$ a un extremo $B$. Tiene módulo (su longitud), dirección (la de su recta) y sentido (de $A$ hacia $B$). Los vectores fijos que coinciden en las tres cosas son equipolentes y representan el mismo vector libre: tienen las mismas coordenadas, extremo menos origen.',
            'يمتد المتجه المقيّد $\\overrightarrow{AB}$ من أصل $A$ إلى طرف $B$. له طول واتجاه (اتجاه مستقيمه) ومنحى (من $A$ نحو $B$). والمتجهات المقيّدة التي تتفق في هذه الثلاثة متكافئة وتمثل المتجه الحر نفسه: لها المركّبتان نفسهما، الطرف ناقص الأصل.',
            'A fixed vector $\\overrightarrow{AB}$ goes from a start point $A$ to an end point $B$. It has a magnitude (its length), a direction (that of its line) and a sense (from $A$ towards $B$). The fixed vectors that agree in all three are equivalent and represent the same free vector: they have the same coordinates, end point minus start point.'
        ),
        examplePrompt: say('$P(2,5)$, $Q(10,-1)$, $R(-3,0)$ eta $S(5,-6)$ badira, $\\overrightarrow{PQ}$ eta $\\overrightarrow{RS}$ bektore aske bera dira?', 'Si $P(2,5)$, $Q(10,-1)$, $R(-3,0)$ y $S(5,-6)$, ¿son $\\overrightarrow{PQ}$ y $\\overrightarrow{RS}$ el mismo vector libre?', 'إذا كانت $P(2,5)$ و$Q(10,-1)$ و$R(-3,0)$ و$S(5,-6)$، فهل $\\overrightarrow{PQ}$ و$\\overrightarrow{RS}$ المتجه الحر نفسه؟', 'If $P(2,5)$, $Q(10,-1)$, $R(-3,0)$ and $S(5,-6)$, are $\\overrightarrow{PQ}$ and $\\overrightarrow{RS}$ the same free vector?'),
        example: same('$\\overrightarrow{PQ}=(10-2,-1-5)=(8,-6)=\\overrightarrow{RS}$'),
        exampleAnswer: say('Bai: biak $(8,-6)$ dira, eta haien modulua $\\sqrt{64+36}=10$.', 'Sí: los dos son $(8,-6)$, de módulo $\\sqrt{64+36}=10$.', 'نعم: كلاهما $(8,-6)$ وطوله $\\sqrt{64+36}=10$.', 'Yes: both are $(8,-6)$, with magnitude $\\sqrt{64+36}=10$.')
    },
    'vector-operations': {
        definitions: [
            { term: say('Aurkako bektorea', 'Vector opuesto', 'المتجه المعاكس', 'Opposite vector'), meaning: say('$-\\vec{u}$ bektorea: $\\vec{u}$ bektorearen modulu eta norabide bera, eta aurkako noranzkoa.', 'El vector $-\\vec{u}$: el mismo módulo y dirección que $\\vec{u}$, y sentido contrario.', 'المتجه $-\\vec{u}$: له طول $\\vec{u}$ واتجاهه نفسهما ومنحى معاكس.', 'The vector $-\\vec{u}$: the same magnitude and direction as $\\vec{u}$, and the opposite sense.') },
            { term: say('Paralelogramoaren erregela', 'Regla del paralelogramo', 'قاعدة متوازي الأضلاع', 'Parallelogram rule'), meaning: say('$\\vec{u}$ eta $\\vec{v}$ jatorri berean jarrita, $\\vec{u}+\\vec{v}$ osatzen duten paralelogramoaren diagonala da.', 'Con $\\vec{u}$ y $\\vec{v}$ desde el mismo origen, $\\vec{u}+\\vec{v}$ es la diagonal del paralelogramo que forman.', 'إذا رُسم $\\vec{u}$ و$\\vec{v}$ من الأصل نفسه فإن $\\vec{u}+\\vec{v}$ قطر متوازي الأضلاع الذي يكوّنانه.', 'With $\\vec{u}$ and $\\vec{v}$ from the same start point, $\\vec{u}+\\vec{v}$ is the diagonal of the parallelogram they form.') }
        ],
        vocabulary: [
            say('batura', 'suma', 'المجموع', 'sum'),
            say('diagonala', 'diagonal', 'القطر', 'diagonal')
        ],
        explanation: say(
            'Bi bektore batzeko, bigarrena lehenengoaren muturrean marrazten da, edo biak jatorri berean: batura paralelogramoaren diagonala da. Kentzea aurkakoa batzea da. $k$ zenbaki batez biderkatzeak bektorea luzatu edo laburtu egiten du, eta buelta ematen dio $k<0$ bada. Koordenatuekin, dena koordenatuz koordenatu egiten da.',
            'Para sumar dos vectores se dibuja uno a continuación del otro, o los dos desde el mismo origen: la suma es la diagonal del paralelogramo. Restar es sumar el opuesto. Multiplicar por un número $k$ estira o encoge el vector, y le da la vuelta si $k<0$. Con coordenadas, todo se hace coordenada a coordenada.',
            'لجمع متجهين نرسم أحدهما بعد الآخر، أو كليهما من الأصل نفسه: المجموع قطر متوازي الأضلاع. والطرح جمع المعاكس. والضرب في عدد $k$ يمدّ المتجه أو يقصّره، ويعكس منحاه إذا كان $k<0$. وبالمركّبات تُجرى كل العمليات مركّبةً مركّبة.',
            'To add two vectors, draw one after the other, or both from the same start point: the sum is the diagonal of the parallelogram. Subtracting is adding the opposite. Multiplying by a number $k$ stretches or shrinks the vector, and turns it round if $k<0$. With coordinates, everything is done coordinate by coordinate.'
        ),
        examplePrompt: say('$\\vec{a}=(3,4)$ eta $\\vec{b}=(-2,5)$ badira, kalkulatu $3\\vec{a}-2\\vec{b}$.', 'Con $\\vec{a}=(3,4)$ y $\\vec{b}=(-2,5)$, calcula $3\\vec{a}-2\\vec{b}$.', 'إذا كان $\\vec{a}=(3,4)$ و$\\vec{b}=(-2,5)$، فاحسب $3\\vec{a}-2\\vec{b}$.', 'With $\\vec{a}=(3,4)$ and $\\vec{b}=(-2,5)$, work out $3\\vec{a}-2\\vec{b}$.'),
        example: same('$3\\vec{a}-2\\vec{b}=(9,12)-(-4,10)=(13,2)$'),
        exampleAnswer: same('$(13,2)$')
    },

    /* ---------- 2. Linear combinations and bases ---------- */
    'linear-combination': {
        definitions: [
            { term: say('Konbinazio lineala', 'Combinación lineal', 'التركيب الخطي', 'Linear combination'), meaning: say('$a\\vec{u}+b\\vec{v}$ formako bektore bat, $a$ eta $b$ zenbaki errealak izanik.', 'Un vector de la forma $a\\vec{u}+b\\vec{v}$, donde $a$ y $b$ son números reales.', 'متجه من الشكل $a\\vec{u}+b\\vec{v}$ حيث $a$ و$b$ عددان حقيقيان.', 'A vector of the form $a\\vec{u}+b\\vec{v}$, where $a$ and $b$ are real numbers.') }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('sistema', 'sistema', 'النظام', 'system')
        ],
        explanation: say(
            '$\\vec{w}=a\\vec{u}+b\\vec{v}$ bada, $\\vec{w}$ bektorea $\\vec{u}$ eta $\\vec{v}$ bektoreen konbinazio lineala dela esaten da, $a$ eta $b$ koefizienteekin. Marrazkian, $\\vec{w}$ bektorea $a\\vec{u}$ eta $b\\vec{v}$ aldeko paralelogramoaren diagonala da. Koordenatuekin, koordenatu bakoitzak ekuazio bat ematen du, eta sistemak $a$ eta $b$.',
            'Si $\\vec{w}=a\\vec{u}+b\\vec{v}$, se dice que $\\vec{w}$ es combinación lineal de $\\vec{u}$ y $\\vec{v}$, con coeficientes $a$ y $b$. En el dibujo, $\\vec{w}$ es la diagonal del paralelogramo de lados $a\\vec{u}$ y $b\\vec{v}$. Con coordenadas, cada coordenada da una ecuación, y el sistema da $a$ y $b$.',
            'إذا كان $\\vec{w}=a\\vec{u}+b\\vec{v}$ نقول إن $\\vec{w}$ تركيب خطي لـ $\\vec{u}$ و$\\vec{v}$ بالمعاملين $a$ و$b$. وفي الرسم يكون $\\vec{w}$ قطر متوازي الأضلاع الذي ضلعاه $a\\vec{u}$ و$b\\vec{v}$. وبالمركّبات تعطي كل مركّبة معادلة، ويعطي النظام $a$ و$b$.',
            'If $\\vec{w}=a\\vec{u}+b\\vec{v}$, we say that $\\vec{w}$ is a linear combination of $\\vec{u}$ and $\\vec{v}$, with coefficients $a$ and $b$. In the drawing, $\\vec{w}$ is the diagonal of the parallelogram with sides $a\\vec{u}$ and $b\\vec{v}$. With coordinates, each coordinate gives an equation, and the system gives $a$ and $b$.'
        ),
        examplePrompt: say('Idatzi $\\vec{w}=(7,-4)$ bektorea $\\vec{u}=(2,1)$ eta $\\vec{v}=(1,-2)$ bektoreen konbinazio lineal gisa.', 'Escribe $\\vec{w}=(7,-4)$ como combinación lineal de $\\vec{u}=(2,1)$ y $\\vec{v}=(1,-2)$.', 'اكتب $\\vec{w}=(7,-4)$ تركيبًا خطيًا لـ $\\vec{u}=(2,1)$ و$\\vec{v}=(1,-2)$.', 'Write $\\vec{w}=(7,-4)$ as a linear combination of $\\vec{u}=(2,1)$ and $\\vec{v}=(1,-2)$.'),
        example: same('$\\vec{w}=2\\vec{u}+3\\vec{v}$'),
        exampleAnswer: say('$2a+b=7$ eta $a-2b=-4$ ekuazioetatik $a=2$ eta $b=3$ ateratzen dira.', 'De $2a+b=7$ y $a-2b=-4$ salen $a=2$ y $b=3$.', 'من $2a+b=7$ و$a-2b=-4$ نجد $a=2$ و$b=3$.', 'From $2a+b=7$ and $a-2b=-4$ you get $a=2$ and $b=3$.')
    },
    basis: {
        definitions: [
            { term: say('Oinarria', 'Base', 'الأساس', 'Basis'), meaning: say('Paraleloak ez diren bi bektore, $B=(\\vec{u},\\vec{v})$: planoko bektore guztiak haien konbinazio linealak dira, modu bakarrean.', 'Dos vectores no paralelos, $B=(\\vec{u},\\vec{v})$: todo vector del plano es combinación lineal de ellos, y de una sola manera.', 'متجهان غير متوازيين $B=(\\vec{u},\\vec{v})$: كل متجه في المستوى تركيب خطي لهما بطريقة واحدة فقط.', 'Two vectors that are not parallel, $B=(\\vec{u},\\vec{v})$: every vector in the plane is a linear combination of them, in just one way.') },
            { term: say('Linealki menpekoak', 'Linealmente dependientes', 'مرتبطان خطيًا', 'Linearly dependent'), meaning: say('Bi bektore paralelo: bata bestea bider zenbaki bat da.', 'Dos vectores paralelos: uno es el otro multiplicado por un número.', 'متجهان متوازيان: أحدهما هو الآخر مضروبًا في عدد.', 'Two parallel vectors: one is the other multiplied by a number.') }
        ],
        vocabulary: [
            say('paraleloa', 'paralelo', 'المتوازيان', 'parallel'),
            say('proportzionala', 'proporcional', 'متناسبة', 'proportional')
        ],
        explanation: say(
            'Paraleloak ez diren bi bektorek plano osoa sortzen dute: haiekin edozein bektoretara iristen da, eta modu bakarrean. Horregatik osatzen dute oinarri bat. Paraleloak badira, haien konbinazio guztiak zuzen berean geratzen dira. Jakiteko, nahikoa da koordenatuei begiratzea: $(a,b)$ eta $(c,d)$ paraleloak dira $a\\cdot d=b\\cdot c$ bada.',
            'Dos vectores que no son paralelos generan todo el plano: con ellos se llega a cualquier vector, y de una sola manera. Por eso forman una base. Si son paralelos, todas sus combinaciones caen en una misma recta. Para saberlo basta mirar las coordenadas: $(a,b)$ y $(c,d)$ son paralelos si $a\\cdot d=b\\cdot c$.',
            'المتجهان غير المتوازيين يولّدان المستوى كله: نصل بهما إلى أي متجه وبطريقة واحدة فقط. لذلك يكوّنان أساسًا. أما إذا كانا متوازيين فكل تركيباتهما تقع على مستقيم واحد. ولمعرفة ذلك يكفي النظر إلى المركّبات: $(a,b)$ و$(c,d)$ متوازيان إذا كان $a\\cdot d=b\\cdot c$.',
            'Two vectors that are not parallel generate the whole plane: with them you reach any vector, and in just one way. That is why they form a basis. If they are parallel, all their combinations fall on one line. To find out, just look at the coordinates: $(a,b)$ and $(c,d)$ are parallel if $a\\cdot d=b\\cdot c$.'
        ),
        examplePrompt: say('$k$ zenbakiaren zer baliorekin ez dute oinarri bat osatzen $(3,k)$ eta $(-6,10)$ bektoreek?', '¿Para qué valor de $k$ los vectores $(3,k)$ y $(-6,10)$ no forman una base?', 'لأي قيمة لـ $k$ لا يكوّن المتجهان $(3,k)$ و$(-6,10)$ أساسًا؟', 'For which value of $k$ do the vectors $(3,k)$ and $(-6,10)$ not form a basis?'),
        example: same('$3\\cdot 10=k\\cdot(-6)\\ \\to\\ k=-5$'),
        exampleAnswer: say('$k=-5$ denean: orduan $(-6,10)=-2\\cdot(3,-5)$, paraleloak.', 'Con $k=-5$: entonces $(-6,10)=-2\\cdot(3,-5)$, son paralelos.', 'عندما $k=-5$: يكون $(-6,10)=-2\\cdot(3,-5)$، أي متوازيين.', 'With $k=-5$: then $(-6,10)=-2\\cdot(3,-5)$, they are parallel.'),
        why: {
            text: say(
                'Zergatik dago modu bakarra? Bektore bera bi modutara idatziko balitz, $a\\vec{u}+b\\vec{v}=a\'\\vec{u}+b\'\\vec{v}$, kenduz gero, $(a-a\')\\vec{u}=(b\'-b)\\vec{v}$. $a\\neq a\'$ balitz, $\\vec{u}$ bektorea $\\vec{v}$ bider zenbaki bat izango litzateke: paraleloak. Ez direnez, $a=a\'$ eta $b=b\'$.',
                '¿Por qué hay una sola manera? Si un vector se escribiera de dos formas, $a\\vec{u}+b\\vec{v}=a\'\\vec{u}+b\'\\vec{v}$, al restar quedaría $(a-a\')\\vec{u}=(b\'-b)\\vec{v}$. Si $a\\neq a\'$, $\\vec{u}$ sería $\\vec{v}$ por un número: paralelos. Como no lo son, $a=a\'$ y $b=b\'$.',
                'لماذا توجد طريقة واحدة؟ لو كُتب متجه بطريقتين $a\\vec{u}+b\\vec{v}=a\'\\vec{u}+b\'\\vec{v}$ لكان بالطرح $(a-a\')\\vec{u}=(b\'-b)\\vec{v}$. ولو كان $a\\neq a\'$ لكان $\\vec{u}$ هو $\\vec{v}$ مضروبًا في عدد: متوازيين. وبما أنهما ليسا كذلك فإن $a=a\'$ و$b=b\'$.',
                'Why is there only one way? If a vector could be written in two ways, $a\\vec{u}+b\\vec{v}=a\'\\vec{u}+b\'\\vec{v}$, subtracting would give $(a-a\')\\vec{u}=(b\'-b)\\vec{v}$. If $a\\neq a\'$, $\\vec{u}$ would be $\\vec{v}$ times a number: parallel. As they are not, $a=a\'$ and $b=b\'$.'
            )
        }
    },
    'basis-coordinates': {
        definitions: [
            { term: say('Oinarri bateko koordenatuak', 'Coordenadas en una base', 'المركّبات في أساس', 'Coordinates in a basis'), meaning: say('$(a,b)$ zenbakiak, $\\vec{w}=a\\vec{u}+b\\vec{v}$ berdintzakoak; $(a,b)_B$ idazten dira.', 'Los números $(a,b)$ de $\\vec{w}=a\\vec{u}+b\\vec{v}$; se escriben $(a,b)_B$.', 'العددان $(a,b)$ في $\\vec{w}=a\\vec{u}+b\\vec{v}$؛ ويُكتبان $(a,b)_B$.', 'The numbers $(a,b)$ in $\\vec{w}=a\\vec{u}+b\\vec{v}$; they are written $(a,b)_B$.') },
            { term: say('Oinarri kanonikoa', 'Base canónica', 'الأساس القانوني', 'Standard basis'), meaning: say('Lauki-sarearena: $\\vec{i}=(1,0)$ eta $\\vec{j}=(0,1)$.', 'La de la cuadrícula: $\\vec{i}=(1,0)$ y $\\vec{j}=(0,1)$.', 'أساس الشبكة: $\\vec{i}=(1,0)$ و$\\vec{j}=(0,1)$.', 'The one of the grid: $\\vec{i}=(1,0)$ and $\\vec{j}=(0,1)$.') }
        ],
        vocabulary: [
            say('lauki-sarea', 'cuadrícula', 'الشبكة', 'grid'),
            say('bakarra', 'única', 'وحيدة', 'unique')
        ],
        explanation: say(
            'Beti erabiltzen ditugun koordenatuak, $(-1,8)$ bezalakoak, oinarri kanonikokoak dira: $\\vec{w}=-\\vec{i}+8\\vec{j}$. Beste $B=(\\vec{u},\\vec{v})$ oinarri batean, $\\vec{w}$ bektorearen koordenatuak $a$ eta $b$ zenbakiak dira, $\\vec{w}=a\\vec{u}+b\\vec{v}$ berdintzakoak, sistema batetik ateratzen direnak. Bikote bakarra da, baina oinarriaren mende dago: lauki-sarearen mende.',
            'Las coordenadas de siempre, como $(-1,8)$, son las de la base canónica: $\\vec{w}=-\\vec{i}+8\\vec{j}$. En otra base $B=(\\vec{u},\\vec{v})$, las coordenadas de $\\vec{w}$ son los números $a$ y $b$ de $\\vec{w}=a\\vec{u}+b\\vec{v}$, que salen de un sistema. La pareja es única, pero depende de la base: de la cuadrícula.',
            'المركّبات المعتادة مثل $(-1,8)$ هي مركّبات الأساس القانوني: $\\vec{w}=-\\vec{i}+8\\vec{j}$. وفي أساس آخر $B=(\\vec{u},\\vec{v})$ تكون مركّبتا $\\vec{w}$ العددين $a$ و$b$ في $\\vec{w}=a\\vec{u}+b\\vec{v}$، ونجدهما بنظام. الزوج وحيد لكنه يتوقف على الأساس: على الشبكة.',
            'The usual coordinates, like $(-1,8)$, are those of the standard basis: $\\vec{w}=-\\vec{i}+8\\vec{j}$. In another basis $B=(\\vec{u},\\vec{v})$, the coordinates of $\\vec{w}$ are the numbers $a$ and $b$ in $\\vec{w}=a\\vec{u}+b\\vec{v}$, which come from a system. The pair is unique, but it depends on the basis: on the grid.'
        ),
        examplePrompt: say('Aurkitu $\\vec{w}=(5,4)$ bektorearen koordenatuak $B=(\\vec{u},\\vec{v})$ oinarrian, $\\vec{u}=(2,1)$ eta $\\vec{v}=(1,-1)$ izanik.', 'Halla las coordenadas de $\\vec{w}=(5,4)$ en la base $B=(\\vec{u},\\vec{v})$, con $\\vec{u}=(2,1)$ y $\\vec{v}=(1,-1)$.', 'أوجد مركّبتي $\\vec{w}=(5,4)$ في الأساس $B=(\\vec{u},\\vec{v})$ حيث $\\vec{u}=(2,1)$ و$\\vec{v}=(1,-1)$.', 'Find the coordinates of $\\vec{w}=(5,4)$ in the basis $B=(\\vec{u},\\vec{v})$, with $\\vec{u}=(2,1)$ and $\\vec{v}=(1,-1)$.'),
        example: same('$\\vec{w}=3\\vec{u}-\\vec{v}=(3,-1)_B$'),
        exampleAnswer: say('$2a+b=5$ eta $a-b=4$: $a=3$ eta $b=-1$.', '$2a+b=5$ y $a-b=4$: $a=3$ y $b=-1$.', '$2a+b=5$ و$a-b=4$: ‏$a=3$ و$b=-1$.', '$2a+b=5$ and $a-b=4$: $a=3$ and $b=-1$.')
    },

    /* ---------- 3. The dot product ---------- */
    'dot-definition': {
        definitions: [
            { term: say('Biderkadura eskalarra', 'Producto escalar', 'الجداء السلمي', 'Dot product'), meaning: say('$\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$ zenbakia, $\\alpha$ bi bektoreek osatzen duten angelua izanik.', 'El número $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, donde $\\alpha$ es el ángulo que forman.', 'العدد $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$ حيث $\\alpha$ الزاوية بينهما.', 'The number $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, where $\\alpha$ is the angle they make.') },
            { term: say('Bi bektoreren angelua', 'Ángulo de dos vectores', 'زاوية متجهين', 'Angle of two vectors'), meaning: say('Jatorri berean jarrita osatzen dutena; $0^\\circ$ eta $180^\\circ$ artekoa da.', 'El que forman puestos con el mismo origen; va de $0^\\circ$ a $180^\\circ$.', 'الزاوية بينهما حين يُرسمان من الأصل نفسه؛ وهي بين $0^\\circ$ و$180^\\circ$.', 'The one they make drawn from the same start point; it goes from $0^\\circ$ to $180^\\circ$.') }
        ],
        vocabulary: [
            say('kosinua', 'coseno', 'جيب التمام', 'cosine'),
            say('zorrotza', 'agudo', 'حادة', 'acute'),
            say('kamutsa', 'obtuso', 'منفرجة', 'obtuse')
        ],
        explanation: say(
            'Bi bektoreren biderkadura eskalarra ez da bektore bat, zenbaki bat baizik: haien moduluak bider osatzen duten angeluaren kosinua, $0^\\circ$ eta $180^\\circ$ artean. Kosinua positiboa da angelu zorrotzetan, 0 angelu zuzenean eta negatiboa kamutsetan; beraz, biderkaduraren zeinuak esaten du nolakoa den angelua.',
            'El producto escalar de dos vectores no es un vector, sino un número: sus módulos multiplicados por el coseno del ángulo que forman, entre $0^\\circ$ y $180^\\circ$. El coseno es positivo en los ángulos agudos, 0 en el recto y negativo en los obtusos, así que el signo del producto dice cómo es el ángulo.',
            'الجداء السلمي لمتجهين ليس متجهًا بل عدد: طولاهما مضروبين في جيب تمام الزاوية بينهما، وهي بين $0^\\circ$ و$180^\\circ$. وجيب التمام موجب في الزوايا الحادة و0 في القائمة وسالب في المنفرجة، لذلك تخبرنا إشارة الجداء بنوع الزاوية.',
            'The dot product of two vectors is not a vector but a number: their magnitudes multiplied by the cosine of the angle they make, between $0^\\circ$ and $180^\\circ$. The cosine is positive for acute angles, 0 for a right angle and negative for obtuse ones, so the sign of the product tells you what the angle is like.'
        ),
        examplePrompt: say('Kalkulatu $\\vec{a}\\cdot\\vec{b}$, $|\\vec{a}|=6$ eta $|\\vec{b}|=\\sqrt{2}$ badira eta $135^\\circ$ osatzen badute.', 'Calcula $\\vec{a}\\cdot\\vec{b}$ si $|\\vec{a}|=6$, $|\\vec{b}|=\\sqrt{2}$ y forman $135^\\circ$.', 'احسب $\\vec{a}\\cdot\\vec{b}$ إذا كان $|\\vec{a}|=6$ و$|\\vec{b}|=\\sqrt{2}$ ويصنعان $135^\\circ$.', 'Work out $\\vec{a}\\cdot\\vec{b}$ if $|\\vec{a}|=6$, $|\\vec{b}|=\\sqrt{2}$ and they make $135^\\circ$.'),
        example: same('$\\vec{a}\\cdot\\vec{b}=6\\cdot\\sqrt{2}\\cdot\\left(-\\frac{\\sqrt{2}}{2}\\right)=-6$'),
        exampleAnswer: say('$-6$: angelua kamutsa da, eta biderkadura negatiboa.', '$-6$: el ángulo es obtuso y el producto, negativo.', '$-6$: الزاوية منفرجة والجداء سالب.', '$-6$: the angle is obtuse and the product negative.')
    },
    'dot-figures': {
        definitions: [
            { term: say('Kanpoko angelua', 'Ángulo exterior', 'الزاوية الخارجية', 'Outer angle'), meaning: say('Alde batek aurreko aldearen luzapenarekin osatzen duena: $180^\\circ$ ken barneko angelua.', 'El que forma un lado con la prolongación del anterior: $180^\\circ$ menos el ángulo interior.', 'الزاوية بين ضلع وامتداد الضلع السابق: $180^\\circ$ ناقص الزاوية الداخلية.', 'The one a side makes with the extension of the previous side: $180^\\circ$ minus the inner angle.') }
        ],
        vocabulary: [
            say('triangelu aldeberdina', 'triángulo equilátero', 'مثلث متساوي الأضلاع', 'equilateral triangle'),
            say('hexagono erregularra', 'hexágono regular', 'سداسي منتظم', 'regular hexagon')
        ],
        explanation: say(
            'Poligono erregular batean aldeak eta angeluak ezagunak dira; beraz, biderkadura eskalarra koordenaturik gabe kalkulatzen da. Baina bi bektoreren angelua puntu beretik ateratzen direla neurtzen da. Bata bestea amaitzen den lekuan hasten bada, $\\overrightarrow{AB}$ eta $\\overrightarrow{BC}$ bezala, bat lekualdatu behar da: haien angelua kanpokoa da, ez poligonoarena.',
            'En un polígono regular se conocen los lados y los ángulos, así que el producto escalar sale sin coordenadas. Pero el ángulo de dos vectores se mide con los dos saliendo del mismo punto. Si uno empieza donde acaba el otro, como $\\overrightarrow{AB}$ y $\\overrightarrow{BC}$, hay que trasladar uno: su ángulo es el exterior, no el del polígono.',
            'في المضلع المنتظم نعرف الأضلاع والزوايا، لذلك نحسب الجداء السلمي دون مركّبات. لكن زاوية متجهين تُقاس وهما خارجان من النقطة نفسها. فإذا بدأ أحدهما حيث ينتهي الآخر، مثل $\\overrightarrow{AB}$ و$\\overrightarrow{BC}$، وجب نقل أحدهما: زاويتهما هي الخارجية لا زاوية المضلع.',
            'In a regular polygon the sides and the angles are known, so the dot product comes out without coordinates. But the angle of two vectors is measured with both leaving the same point. If one starts where the other ends, like $\\overrightarrow{AB}$ and $\\overrightarrow{BC}$, you have to move one: their angle is the outer one, not the polygon\'s.'
        ),
        examplePrompt: say('Alde 3 duen $ABCD$ karratu batean, kalkulatu $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$.', 'En un cuadrado $ABCD$ de lado 3, calcula $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$.', 'في مربع $ABCD$ طول ضلعه 3، احسب $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$.', 'In a square $ABCD$ with side 3, work out $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$.'),
        example: same('$\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=3\\cdot 3\\sqrt{2}\\cdot\\frac{\\sqrt{2}}{2}=9$'),
        exampleAnswer: say('$|\\overrightarrow{AC}|=3\\sqrt{2}$, eta $45^\\circ$ osatzen dute: biderkadura 9 da.', '$|\\overrightarrow{AC}|=3\\sqrt{2}$ y forman $45^\\circ$: el producto es 9.', '$|\\overrightarrow{AC}|=3\\sqrt{2}$ ويصنعان $45^\\circ$: الجداء 9.', '$|\\overrightarrow{AC}|=3\\sqrt{2}$ and they make $45^\\circ$: the product is 9.')
    },
    'dot-properties': {
        definitions: [
            { term: say('Propietate trukakorra', 'Propiedad conmutativa', 'خاصية التبديل', 'Commutative property'), meaning: say('Ordenak ez du axola: $\\vec{u}\\cdot\\vec{v}=\\vec{v}\\cdot\\vec{u}$.', 'El orden no importa: $\\vec{u}\\cdot\\vec{v}=\\vec{v}\\cdot\\vec{u}$.', 'الترتيب لا يهم: $\\vec{u}\\cdot\\vec{v}=\\vec{v}\\cdot\\vec{u}$.', 'The order does not matter: $\\vec{u}\\cdot\\vec{v}=\\vec{v}\\cdot\\vec{u}$.') },
            { term: say('Propietate banakorra', 'Propiedad distributiva', 'خاصية التوزيع', 'Distributive property'), meaning: say('Banatu egiten da: $\\vec{u}\\cdot(\\vec{v}+\\vec{w})=\\vec{u}\\cdot\\vec{v}+\\vec{u}\\cdot\\vec{w}$.', 'Se reparte: $\\vec{u}\\cdot(\\vec{v}+\\vec{w})=\\vec{u}\\cdot\\vec{v}+\\vec{u}\\cdot\\vec{w}$.', 'يتوزع: $\\vec{u}\\cdot(\\vec{v}+\\vec{w})=\\vec{u}\\cdot\\vec{v}+\\vec{u}\\cdot\\vec{w}$.', 'It spreads over a sum: $\\vec{u}\\cdot(\\vec{v}+\\vec{w})=\\vec{u}\\cdot\\vec{v}+\\vec{u}\\cdot\\vec{w}$.') }
        ],
        vocabulary: [
            say('karratua', 'cuadrado', 'المربع', 'square'),
            say('diagonala', 'diagonal', 'القطر', 'diagonal')
        ],
        explanation: say(
            'Biderkadura eskalarra trukakorra eta banakorra da, eta zenbakiak kanpora ateratzen dira: $(k\\vec{u})\\cdot\\vec{v}=k\\,(\\vec{u}\\cdot\\vec{v})$. Gainera, $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$. Arau horiekin, $(\\vec{u}+\\vec{v})\\cdot(\\vec{u}+\\vec{v})$ batura baten karratua bezala garatzen da, eta diagonal baten luzera ematen du ezer marraztu gabe.',
            'El producto escalar es conmutativo y distributivo, y los números salen fuera: $(k\\vec{u})\\cdot\\vec{v}=k\\,(\\vec{u}\\cdot\\vec{v})$. Además, $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$. Con estas reglas, $(\\vec{u}+\\vec{v})\\cdot(\\vec{u}+\\vec{v})$ se desarrolla como el cuadrado de una suma, y da la longitud de una diagonal sin dibujar nada.',
            'الجداء السلمي تبديلي وتوزيعي، والأعداد تخرج منه: $(k\\vec{u})\\cdot\\vec{v}=k\\,(\\vec{u}\\cdot\\vec{v})$. وكذلك $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$. وبهذه القواعد ننشر $(\\vec{u}+\\vec{v})\\cdot(\\vec{u}+\\vec{v})$ كما ننشر مربع مجموع، فنحصل على طول القطر دون أي رسم.',
            'The dot product is commutative and distributive, and numbers come out: $(k\\vec{u})\\cdot\\vec{v}=k\\,(\\vec{u}\\cdot\\vec{v})$. Also, $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$. With these rules, $(\\vec{u}+\\vec{v})\\cdot(\\vec{u}+\\vec{v})$ expands like the square of a sum, and gives the length of a diagonal without drawing anything.'
        ),
        examplePrompt: say('$|\\vec{a}|=4$, $|\\vec{b}|=7$ eta $\\vec{a}\\cdot\\vec{b}=8$ badira, aurkitu $|\\vec{a}-\\vec{b}|$.', 'Con $|\\vec{a}|=4$, $|\\vec{b}|=7$ y $\\vec{a}\\cdot\\vec{b}=8$, halla $|\\vec{a}-\\vec{b}|$.', 'إذا كان $|\\vec{a}|=4$ و$|\\vec{b}|=7$ و$\\vec{a}\\cdot\\vec{b}=8$، فأوجد $|\\vec{a}-\\vec{b}|$.', 'With $|\\vec{a}|=4$, $|\\vec{b}|=7$ and $\\vec{a}\\cdot\\vec{b}=8$, find $|\\vec{a}-\\vec{b}|$.'),
        example: same('$|\\vec{a}-\\vec{b}|^2=16-2\\cdot 8+49=49$'),
        exampleAnswer: same('$|\\vec{a}-\\vec{b}|=\\sqrt{49}=7$'),
        why: {
            text: say(
                'Zergatik $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$? Bektore batek $0^\\circ$ osatzen ditu bere buruarekin, eta $\\cos 0^\\circ=1$. Hori da luzeren eta biderkadura eskalarren arteko zubia: luzera baten karratua beti da biderkadura eskalar bat.',
                '¿Por qué $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$? Un vector forma $0^\\circ$ consigo mismo, y $\\cos 0^\\circ=1$. Es el puente entre longitudes y productos escalares: el cuadrado de una longitud es siempre un producto escalar.',
                'لماذا $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$؟ يصنع المتجه مع نفسه $0^\\circ$، و$\\cos 0^\\circ=1$. إنه الجسر بين الأطوال والجداءات السلمية: مربع أي طول هو دائمًا جداء سلمي.',
                'Why is $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$? A vector makes $0^\\circ$ with itself, and $\\cos 0^\\circ=1$. It is the bridge between lengths and dot products: the square of a length is always a dot product.'
            ),
            math: same('$\\vec{u}\\cdot\\vec{u}=|\\vec{u}|\\,|\\vec{u}|\\cos 0^\\circ=|\\vec{u}|^2$')
        }
    },

    /* ---------- 4. The dot product with coordinates ---------- */
    orthonormal: {
        definitions: [
            { term: say('Oinarri ortogonala', 'Base ortogonal', 'الأساس المتعامد', 'Orthogonal basis'), meaning: say('Elkarren perpendikularrak diren bi bektorez osatutako oinarria.', 'Una base de dos vectores perpendiculares.', 'أساس من متجهين متعامدين.', 'A basis of two perpendicular vectors.') },
            { term: say('Oinarri ortonormala', 'Base ortonormal', 'الأساس المتعامد المتجانس', 'Orthonormal basis'), meaning: say('Modulua 1 duten bektorez osatutako oinarri ortogonala, $\\vec{i}=(1,0)$ eta $\\vec{j}=(0,1)$ bezala.', 'Una base ortogonal de vectores de módulo 1, como $\\vec{i}=(1,0)$ y $\\vec{j}=(0,1)$.', 'أساس متعامد من متجهين طول كل منهما 1، مثل $\\vec{i}=(1,0)$ و$\\vec{j}=(0,1)$.', 'An orthogonal basis of vectors of magnitude 1, like $\\vec{i}=(1,0)$ and $\\vec{j}=(0,1)$.') }
        ],
        vocabulary: [
            say('perpendikularra', 'perpendicular', 'متعامد', 'perpendicular'),
            say('koordenatua', 'coordenada', 'المركّبة', 'coordinate')
        ],
        explanation: say(
            'Oinarri kanonikoan, $\\vec{i}\\cdot\\vec{i}=\\vec{j}\\cdot\\vec{j}=1$ eta $\\vec{i}\\cdot\\vec{j}=0$. Horregatik, $\\vec{u}=(u_1,u_2)$ eta $\\vec{v}=(v_1,v_2)$ badira, haien biderkadura garatzean bi gai bakarrik geratzen dira: $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$. Koordenatuekin kalkulatzen da, angelua jakin gabe. Oinarria ortonormala ez bada, formula hau ez da betetzen.',
            'En la base canónica, $\\vec{i}\\cdot\\vec{i}=\\vec{j}\\cdot\\vec{j}=1$ y $\\vec{i}\\cdot\\vec{j}=0$. Por eso, si $\\vec{u}=(u_1,u_2)$ y $\\vec{v}=(v_1,v_2)$, al desarrollar su producto solo quedan dos términos: $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$. Se calcula con las coordenadas, sin conocer el ángulo. Si la base no es ortonormal, esta fórmula no vale.',
            'في الأساس القانوني $\\vec{i}\\cdot\\vec{i}=\\vec{j}\\cdot\\vec{j}=1$ و$\\vec{i}\\cdot\\vec{j}=0$. لذلك إذا كان $\\vec{u}=(u_1,u_2)$ و$\\vec{v}=(v_1,v_2)$ فلا يبقى عند نشر جدائهما إلا حدّان: $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$. نحسبه بالمركّبات دون معرفة الزاوية. وإذا لم يكن الأساس متعامدًا ومتجانسًا فلا تصح هذه الصيغة.',
            'In the standard basis, $\\vec{i}\\cdot\\vec{i}=\\vec{j}\\cdot\\vec{j}=1$ and $\\vec{i}\\cdot\\vec{j}=0$. So, if $\\vec{u}=(u_1,u_2)$ and $\\vec{v}=(v_1,v_2)$, when you expand their product only two terms are left: $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$. It is worked out with the coordinates, without knowing the angle. If the basis is not orthonormal, this formula does not hold.'
        ),
        examplePrompt: say('Kalkulatu $\\vec{a}\\cdot\\vec{b}$, $\\vec{a}=(-7,2)$ eta $\\vec{b}=(3,11)$ izanik.', 'Calcula $\\vec{a}\\cdot\\vec{b}$ con $\\vec{a}=(-7,2)$ y $\\vec{b}=(3,11)$.', 'احسب $\\vec{a}\\cdot\\vec{b}$ حيث $\\vec{a}=(-7,2)$ و$\\vec{b}=(3,11)$.', 'Work out $\\vec{a}\\cdot\\vec{b}$ with $\\vec{a}=(-7,2)$ and $\\vec{b}=(3,11)$.'),
        example: same('$\\vec{a}\\cdot\\vec{b}=-7\\cdot 3+2\\cdot 11=1$'),
        exampleAnswer: say('1: positiboa, beraz angelua zorrotza da.', '1: es positivo, así que el ángulo es agudo.', '1: موجب، إذن الزاوية حادة.', '1: it is positive, so the angle is acute.'),
        why: {
            text: say(
                'Zergatik betetzen da? Garatu banakortasunarekin $(u_1\\vec{i}+u_2\\vec{j})\\cdot(v_1\\vec{i}+v_2\\vec{j})$: lau gai ateratzen dira. $\\vec{i}\\cdot\\vec{j}$ duten biek 0 balio dute, eta beste bietan $\\vec{i}\\cdot\\vec{i}=\\vec{j}\\cdot\\vec{j}=1$. $u_1v_1+u_2v_2$ geratzen da.',
                '¿Por qué funciona? Desarrolla con la distributiva $(u_1\\vec{i}+u_2\\vec{j})\\cdot(v_1\\vec{i}+v_2\\vec{j})$: salen cuatro términos. Los dos con $\\vec{i}\\cdot\\vec{j}$ valen 0, y en los otros dos $\\vec{i}\\cdot\\vec{i}=\\vec{j}\\cdot\\vec{j}=1$. Queda $u_1v_1+u_2v_2$.',
                'لماذا تصح؟ انشر بخاصية التوزيع $(u_1\\vec{i}+u_2\\vec{j})\\cdot(v_1\\vec{i}+v_2\\vec{j})$: نحصل على أربعة حدود. الحدّان اللذان فيهما $\\vec{i}\\cdot\\vec{j}$ يساويان 0، وفي الآخرين $\\vec{i}\\cdot\\vec{i}=\\vec{j}\\cdot\\vec{j}=1$. فيبقى $u_1v_1+u_2v_2$.',
                'Why does it work? Expand $(u_1\\vec{i}+u_2\\vec{j})\\cdot(v_1\\vec{i}+v_2\\vec{j})$ with the distributive property: you get four terms. The two with $\\vec{i}\\cdot\\vec{j}$ are 0, and in the other two $\\vec{i}\\cdot\\vec{i}=\\vec{j}\\cdot\\vec{j}=1$. What is left is $u_1v_1+u_2v_2$.'
            ),
            math: same('$\\begin{gathered}(2\\vec{i}+\\vec{j})\\cdot(\\vec{i}+3\\vec{j})\\\\ =2\\cdot 1+0+0+1\\cdot 3=5\\end{gathered}$')
        }
    },
    'modulus-unit': {
        definitions: [
            { term: say('Bektore unitarioa', 'Vector unitario', 'متجه الوحدة', 'Unit vector'), meaning: say('Modulua 1 duen bektorea.', 'Un vector de módulo 1.', 'متجه طوله 1.', 'A vector of magnitude 1.') }
        ],
        vocabulary: [
            say('modulua', 'módulo', 'الطول', 'magnitude'),
            say('zatitu', 'dividir', 'القسمة', 'divide')
        ],
        explanation: say(
            'Oinarri ortonormal batean, modulua Pitagoras da: $|\\vec{v}|=\\sqrt{v_1^2+v_2^2}$, hau da, $\\sqrt{\\vec{v}\\cdot\\vec{v}}$. $\\vec{v}$ bere moduluaz zatitzen bada, bektoreak norabidea eta noranzkoa gordetzen ditu, eta 1 neurtzen du: unitarioa da. Gero $k$ zenbakiaz biderkatuta, modulua $k$ duena lortzen da.',
            'En una base ortonormal, el módulo es Pitágoras: $|\\vec{v}|=\\sqrt{v_1^2+v_2^2}$, es decir, $\\sqrt{\\vec{v}\\cdot\\vec{v}}$. Si se divide $\\vec{v}$ entre su módulo, el vector conserva su dirección y su sentido y pasa a medir 1: es unitario. Multiplicándolo después por $k$ se obtiene el de módulo $k$.',
            'في أساس متعامد ومتجانس يكون الطول فيثاغورس: $|\\vec{v}|=\\sqrt{v_1^2+v_2^2}$، أي $\\sqrt{\\vec{v}\\cdot\\vec{v}}$. وإذا قسمنا $\\vec{v}$ على طوله حافظ على اتجاهه ومنحاه وصار طوله 1: إنه متجه الوحدة. وبضربه بعد ذلك في $k$ نحصل على المتجه الذي طوله $k$.',
            'In an orthonormal basis, the magnitude is Pythagoras: $|\\vec{v}|=\\sqrt{v_1^2+v_2^2}$, that is, $\\sqrt{\\vec{v}\\cdot\\vec{v}}$. If you divide $\\vec{v}$ by its magnitude, the vector keeps its direction and sense and becomes 1 long: it is a unit vector. Multiplying it then by $k$ gives the one of magnitude $k$.'
        ),
        examplePrompt: say('Aurkitu $\\vec{w}=(-5,12)$ bektorearen norabide eta noranzko bereko bektore unitarioa.', 'Halla el vector unitario con la dirección y el sentido de $\\vec{w}=(-5,12)$.', 'أوجد متجه الوحدة الذي له اتجاه $\\vec{w}=(-5,12)$ ومنحاه.', 'Find the unit vector with the direction and sense of $\\vec{w}=(-5,12)$.'),
        example: same('$\\frac{1}{13}(-5,12)=\\left(-\\frac{5}{13},\\frac{12}{13}\\right)$'),
        exampleAnswer: say('$|\\vec{w}|=\\sqrt{25+144}=13$, eta $\\vec{w}$ zati 13 egiten da.', '$|\\vec{w}|=\\sqrt{25+144}=13$, y se divide $\\vec{w}$ entre 13.', '$|\\vec{w}|=\\sqrt{25+144}=13$، ونقسم $\\vec{w}$ على 13.', '$|\\vec{w}|=\\sqrt{25+144}=13$, and you divide $\\vec{w}$ by 13.')
    },
    'angle-vectors': {
        definitions: [
            { term: say('Arku kosinua', 'Arco coseno', 'قوس جيب التمام', 'Inverse cosine'), meaning: say('Kosinu jakin bat duen angelua, $0^\\circ$ eta $180^\\circ$ artean; kalkulagailuan, $\\cos^{-1}$.', 'El ángulo entre $0^\\circ$ y $180^\\circ$ que tiene un coseno dado; en la calculadora, $\\cos^{-1}$.', 'الزاوية بين $0^\\circ$ و$180^\\circ$ التي لها جيب تمام معلوم؛ وفي الآلة الحاسبة $\\cos^{-1}$.', 'The angle between $0^\\circ$ and $180^\\circ$ with a given cosine; on the calculator, $\\cos^{-1}$.') }
        ],
        vocabulary: [
            say('kalkulagailua', 'calculadora', 'الآلة الحاسبة', 'calculator'),
            say('kamutsa', 'obtuso', 'منفرجة', 'obtuse')
        ],
        explanation: say(
            'Definiziotik, $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, kosinua askatzen da. Biderkadura eskalarra eta moduluak koordenatuetatik ateratzen dira, eta angelua kalkulagailuaren $\\cos^{-1}$ teklarekin. $\\alpha$ angelua $0^\\circ$ eta $180^\\circ$ artekoa denez, kosinu bakoitzak angelu bakarra ematen du: negatiboa bada, angelua kamutsa da.',
            'De la definición, $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, se despeja el coseno. El producto escalar y los módulos salen de las coordenadas, y el ángulo, de la tecla $\\cos^{-1}$ de la calculadora. Como $\\alpha$ va de $0^\\circ$ a $180^\\circ$, cada coseno da un solo ángulo: si es negativo, el ángulo es obtuso.',
            'من التعريف $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$ نستخرج جيب التمام. ونحسب الجداء السلمي والطولين من المركّبات، والزاوية بزر $\\cos^{-1}$ في الآلة الحاسبة. وبما أن $\\alpha$ بين $0^\\circ$ و$180^\\circ$ فكل جيب تمام يعطي زاوية واحدة: إذا كان سالبًا فالزاوية منفرجة.',
            'From the definition, $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, you solve for the cosine. The dot product and the magnitudes come from the coordinates, and the angle from the $\\cos^{-1}$ key of the calculator. As $\\alpha$ goes from $0^\\circ$ to $180^\\circ$, each cosine gives just one angle: if it is negative, the angle is obtuse.'
        ),
        examplePrompt: say('Aurkitu $\\vec{a}=(3,1)$ eta $\\vec{b}=(1,2)$ bektoreen angelua.', 'Halla el ángulo de $\\vec{a}=(3,1)$ y $\\vec{b}=(1,2)$.', 'أوجد الزاوية بين $\\vec{a}=(3,1)$ و$\\vec{b}=(1,2)$.', 'Find the angle of $\\vec{a}=(3,1)$ and $\\vec{b}=(1,2)$.'),
        example: same('$\\cos\\alpha=\\frac{3+2}{\\sqrt{10}\\cdot\\sqrt{5}}=\\frac{\\sqrt{2}}{2}$'),
        exampleAnswer: same('$\\alpha=45^\\circ$')
    },
    'perpendicular-vectors': {
        definitions: [
            { term: say('Bektore ortogonalak', 'Vectores ortogonales', 'المتجهات المتعامدة', 'Orthogonal vectors'), meaning: say('Perpendikularrak esateko beste modu bat: haien biderkadura eskalarra 0 da.', 'Otra forma de decir perpendiculares: su producto escalar es 0.', 'طريقة أخرى لقول متعامدة: جداؤها السلمي 0.', 'Another way of saying perpendicular: their dot product is 0.') }
        ],
        vocabulary: [
            say('parametroa', 'parámetro', 'الوسيط', 'parameter'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Nuluak ez diren bi bektorek $90^\\circ$ osatzen badute, haien biderkadura eskalarra 0 da, $\\cos 90^\\circ=0$ delako; eta alderantziz, biderkadura 0 bada, $90^\\circ$ osatzen dute. Horrela egiaztatzen da perpendikularrak diren, eta parametro bat aurkitzen da. Bat eraikitzeko, koordenatuen ordena eta baten zeinua aldatzen dira: $(a,b)\\cdot(-b,a)=0$.',
            'Si dos vectores no nulos forman $90^\\circ$, su producto escalar es 0, porque $\\cos 90^\\circ=0$; y al revés, si el producto es 0, forman $90^\\circ$. Así se comprueba si son perpendiculares y se halla un parámetro. Para construir uno, se cambia el orden de las coordenadas y el signo de una: $(a,b)\\cdot(-b,a)=0$.',
            'إذا صنع متجهان غير معدومين $90^\\circ$ فجداؤهما السلمي 0 لأن $\\cos 90^\\circ=0$؛ والعكس: إذا كان الجداء 0 فإنهما يصنعان $90^\\circ$. وهكذا نتحقق من التعامد ونوجد قيمة الوسيط. ولبناء متجه عمودي نبدّل ترتيب المركّبتين ونغيّر إشارة إحداهما: $(a,b)\\cdot(-b,a)=0$.',
            'If two non-zero vectors make $90^\\circ$, their dot product is 0, because $\\cos 90^\\circ=0$; and the other way round, if the product is 0, they make $90^\\circ$. That is how you check that they are perpendicular and find a parameter. To build one, swap the order of the coordinates and change the sign of one: $(a,b)\\cdot(-b,a)=0$.'
        ),
        examplePrompt: say('$m$ zenbakiaren zer baliorekin dira perpendikularrak $(m,5)$ eta $(10,-4)$?', '¿Para qué valor de $m$ son perpendiculares $(m,5)$ y $(10,-4)$?', 'لأي قيمة لـ $m$ يتعامد $(m,5)$ و$(10,-4)$؟', 'For which value of $m$ are $(m,5)$ and $(10,-4)$ perpendicular?'),
        example: same('$10m-20=0\\ \\to\\ m=2$'),
        exampleAnswer: say('$m=2$; egiaztatu: $(2,5)\\cdot(10,-4)=20-20=0$.', '$m=2$; comprueba: $(2,5)\\cdot(10,-4)=20-20=0$.', '$m=2$؛ تحقق: $(2,5)\\cdot(10,-4)=20-20=0$.', '$m=2$; check: $(2,5)\\cdot(10,-4)=20-20=0$.')
    },

    /* ---------- 5. Projections and applications ---------- */
    projection: {
        definitions: [
            { term: say('Proiekzioa', 'Proyección', 'الإسقاط', 'Projection'), meaning: say('$\\vec{u}$ bektorearen itzala $\\vec{v}$ bektorearen zuzenean, zuzen horrekiko perpendikularra den argiarekin.', 'La sombra de $\\vec{u}$ sobre la recta de $\\vec{v}$, con una luz perpendicular a esa recta.', 'ظل $\\vec{u}$ على مستقيم $\\vec{v}$ بضوء عمودي على ذلك المستقيم.', 'The shadow of $\\vec{u}$ on the line of $\\vec{v}$, with light perpendicular to that line.') }
        ],
        vocabulary: [
            say('itzala', 'sombra', 'الظل', 'shadow'),
            say('luzera', 'longitud', 'الطول', 'length')
        ],
        explanation: say(
            '$\\vec{u}$ bektorearen muturretik $\\vec{v}$ bektorearen zuzenera perpendikular bat jaisten bada, $\\vec{u}$ bektorearen itzala geratzen da zuzen horretan: haren proiekzioa. Haren luzera, zeinuarekin, $|\\vec{u}|\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$ da, negatiboa itzala atzera erortzen bada. Proiekzio-bektorea luzera hori da, $\\vec{v}$ bektorearen norabidean.',
            'Si desde el extremo de $\\vec{u}$ se baja una perpendicular a la recta de $\\vec{v}$, queda la sombra de $\\vec{u}$ sobre esa recta: su proyección. Su longitud con signo es $|\\vec{u}|\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$, negativa si la sombra cae hacia atrás. El vector proyección es esa longitud en la dirección de $\\vec{v}$.',
            'إذا أنزلنا من طرف $\\vec{u}$ عمودًا على مستقيم $\\vec{v}$ بقي ظل $\\vec{u}$ على ذلك المستقيم: إسقاطه. وطوله بإشارته $|\\vec{u}|\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$، ويكون سالبًا إذا وقع الظل إلى الخلف. ومتجه الإسقاط هو ذلك الطول في اتجاه $\\vec{v}$.',
            'If you drop a perpendicular from the tip of $\\vec{u}$ to the line of $\\vec{v}$, what is left is the shadow of $\\vec{u}$ on that line: its projection. Its signed length is $|\\vec{u}|\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$, negative if the shadow falls backwards. The projection vector is that length in the direction of $\\vec{v}$.'
        ),
        examplePrompt: say('Aurkitu $\\vec{a}=(-4,2)$ bektorearen proiekzioaren luzera, zeinuarekin, $\\vec{b}=(12,5)$ bektorearen gainean.', 'Halla la longitud con signo de la proyección de $\\vec{a}=(-4,2)$ sobre $\\vec{b}=(12,5)$.', 'أوجد طول إسقاط $\\vec{a}=(-4,2)$ على $\\vec{b}=(12,5)$ بإشارته.', 'Find the signed length of the projection of $\\vec{a}=(-4,2)$ onto $\\vec{b}=(12,5)$.'),
        example: same('$\\frac{-48+10}{13}=-\\frac{38}{13}$'),
        exampleAnswer: say('Negatiboa da: angelua kamutsa da, eta itzala atzera erortzen da.', 'Es negativa: el ángulo es obtuso y la sombra cae hacia atrás.', 'إنه سالب: الزاوية منفرجة والظل يقع إلى الخلف.', 'It is negative: the angle is obtuse and the shadow falls backwards.'),
        why: {
            text: say(
                'Zergatik betetzen da? $\\vec{u}$ bektoreak, haren proiekzioak eta perpendikularrak triangelu angeluzuzen bat osatzen dute. Proiekzioa $\\alpha$ angeluaren ondoko katetoa da: $|\\vec{u}|\\cos\\alpha$ neurtzen du. $|\\vec{v}|$ zenbakiaz biderkatuz eta zatituz, biderkadura eskalarra agertzen da.',
                '¿Por qué funciona? $\\vec{u}$, su proyección y la perpendicular forman un triángulo rectángulo. La proyección es el cateto contiguo al ángulo $\\alpha$: mide $|\\vec{u}|\\cos\\alpha$. Al multiplicar y dividir por $|\\vec{v}|$ aparece el producto escalar.',
                'لماذا تصح؟ يكوّن $\\vec{u}$ وإسقاطه والعمود مثلثًا قائمًا. والإسقاط هو الضلع المجاور للزاوية $\\alpha$: طوله $|\\vec{u}|\\cos\\alpha$. وبالضرب والقسمة على $|\\vec{v}|$ يظهر الجداء السلمي.',
                'Why does it work? $\\vec{u}$, its projection and the perpendicular make a right-angled triangle. The projection is the leg next to the angle $\\alpha$: it is $|\\vec{u}|\\cos\\alpha$ long. Multiplying and dividing by $|\\vec{v}|$, the dot product appears.'
            ),
            math: same('$|\\vec{u}|\\cos\\alpha=\\frac{|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha}{|\\vec{v}|}=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$')
        }
    },
    decomposition: {
        definitions: [
            { term: say('Osagai paraleloa', 'Componente paralela', 'المركّبة الموازية', 'Parallel component'), meaning: say('$\\vec{w}$ bektorearen zatia $\\vec{v}$ bektorearen norabidean: haren proiekzio-bektorea $\\vec{v}$ bektorearen gainean.', 'La parte de $\\vec{w}$ en la dirección de $\\vec{v}$: su vector proyección sobre $\\vec{v}$.', 'جزء $\\vec{w}$ في اتجاه $\\vec{v}$: متجه إسقاطه على $\\vec{v}$.', 'The part of $\\vec{w}$ in the direction of $\\vec{v}$: its projection vector onto $\\vec{v}$.') },
            { term: say('Osagai perpendikularra', 'Componente perpendicular', 'المركّبة العمودية', 'Perpendicular component'), meaning: say('Falta dena: $\\vec{w}$ ken osagai paraleloa.', 'Lo que falta: $\\vec{w}$ menos la componente paralela.', 'ما ينقص: $\\vec{w}$ ناقص المركّبة الموازية.', 'What is left: $\\vec{w}$ minus the parallel component.') }
        ],
        vocabulary: [
            say('indarra', 'fuerza', 'القوة', 'force'),
            say('arrapala', 'rampa', 'المنحدر', 'ramp')
        ],
        explanation: say(
            'Batzuetan bektore bat bi zatitan banatu behar da: bat norabide jakin batean eta bestea haren perpendikularra. Arrapala batean, adibidez, pisua bitan banatzen da: aldapan behera bultzatzen duen indarra eta lurraren kontra estutzen duena. Zati paraleloa proiekzio-bektorea da, eta perpendikularra, bektorera iristeko falta dena.',
            'A veces interesa partir un vector en dos piezas: una en una dirección dada y otra perpendicular a ella. En una rampa, por ejemplo, el peso se parte en la fuerza que empuja cuesta abajo y la que aprieta contra el suelo. La pieza paralela es el vector proyección, y la perpendicular, lo que falta hasta el vector.',
            'أحيانًا نحتاج إلى تقسيم متجه إلى قطعتين: واحدة في اتجاه معلوم وأخرى عمودية عليه. ففي المنحدر مثلًا ينقسم الوزن إلى القوة التي تدفع إلى الأسفل على المنحدر والقوة التي تضغط على الأرض. والقطعة الموازية هي متجه الإسقاط، والعمودية هي ما ينقص للوصول إلى المتجه.',
            'Sometimes you want to split a vector into two pieces: one in a given direction and another perpendicular to it. On a ramp, for example, the weight splits into the force that pushes down the slope and the one that presses against the ground. The parallel piece is the projection vector, and the perpendicular one is what is missing to reach the vector.'
        ),
        examplePrompt: say('Banatu $\\vec{w}=(5,-5)$ bi zatitan: bat $\\vec{v}=(2,1)$ bektorearen paraleloa eta bestea perpendikularra.', 'Descompón $\\vec{w}=(5,-5)$ en una parte paralela a $\\vec{v}=(2,1)$ y otra perpendicular.', 'فكّك $\\vec{w}=(5,-5)$ إلى جزء موازٍ لـ $\\vec{v}=(2,1)$ وآخر عمودي عليه.', 'Split $\\vec{w}=(5,-5)$ into a part parallel to $\\vec{v}=(2,1)$ and a perpendicular one.'),
        example: same('$\\vec{w}_{\\parallel}=\\frac{5}{5}(2,1)=(2,1)\\qquad\\vec{w}_{\\perp}=(5,-5)-(2,1)=(3,-6)$'),
        exampleAnswer: say('$(3,-6)\\cdot(2,1)=6-6=0$: bigarren zatia perpendikularra da.', '$(3,-6)\\cdot(2,1)=6-6=0$: la segunda parte es perpendicular.', '$(3,-6)\\cdot(2,1)=6-6=0$: الجزء الثاني عمودي.', '$(3,-6)\\cdot(2,1)=6-6=0$: the second part is perpendicular.')
    },
    forces: {
        definitions: [
            { term: say('Erresultantea', 'Resultante', 'المحصلة', 'Resultant'), meaning: say('Aldi berean eragiten duten indar edo abiadura guztien batura.', 'La suma de todas las fuerzas o velocidades que actúan a la vez.', 'مجموع كل القوى أو السرعات التي تؤثر في الوقت نفسه.', 'The sum of all the forces or velocities that act at the same time.') },
            { term: say('Lana', 'Trabajo', 'الشغل', 'Work'), meaning: say('Indarraren eta desplazamenduaren biderkadura eskalarra: $W=\\vec{F}\\cdot\\vec{d}$, jouletan.', 'El producto escalar de la fuerza por el desplazamiento: $W=\\vec{F}\\cdot\\vec{d}$, en julios.', 'الجداء السلمي للقوة والإزاحة: $W=\\vec{F}\\cdot\\vec{d}$، بالجول.', 'The dot product of the force and the displacement: $W=\\vec{F}\\cdot\\vec{d}$, in joules.') }
        ],
        vocabulary: [
            say('korrontea', 'corriente', 'التيار', 'current'),
            say('abiadura', 'velocidad', 'السرعة', 'velocity'),
            say('desplazamendua', 'desplazamiento', 'الإزاحة', 'displacement')
        ],
        explanation: say(
            'Ibai bat zeharkatzen duen txalupa bat bere abiadurarekin gehi korrontearenarekin mugitzen da, eta bi sokak tiratzen dioten gorputz batek bi indarren batura jasotzen du: erresultantea. Biderkadura eskalarra lanean agertzen da: indar batetik, desplazamenduaren norabidean doan zatiak bakarrik egiten du lana.',
            'Una barca que cruza un río se mueve con su propia velocidad más la de la corriente, y un objeto del que tiran dos cuerdas recibe la suma de las dos fuerzas: la resultante. El producto escalar aparece en el trabajo: de una fuerza solo trabaja la parte que va en la dirección del desplazamiento.',
            'القارب الذي يعبر نهرًا يتحرك بسرعته الخاصة زائد سرعة التيار، والجسم الذي يشدّه حبلان يتلقى مجموع القوتين: المحصلة. ويظهر الجداء السلمي في الشغل: لا يبذل الشغل من القوة إلا الجزء الذي في اتجاه الإزاحة.',
            'A boat crossing a river moves with its own velocity plus that of the current, and an object pulled by two ropes gets the sum of the two forces: the resultant. The dot product appears in work: only the part of a force that goes in the direction of the displacement does work.'
        ),
        examplePrompt: say('Kutxa bat $10$ m arrastatzen da, indar batekin tiratuz: $50$ N, lurrarekin $60^\\circ$ osatuz. Zenbateko lana egiten da?', 'Se arrastra una caja $10$ m tirando con una fuerza de $50$ N que forma $60^\\circ$ con el suelo. ¿Qué trabajo se hace?', 'تُسحب صندوق مسافة $10$ m بقوة $50$ N تصنع $60^\\circ$ مع الأرض. ما الشغل المبذول؟', 'A box is dragged $10$ m by pulling with a force of $50$ N that makes $60^\\circ$ with the ground. How much work is done?'),
        example: same('$W=50\\cdot 10\\cdot\\frac{1}{2}=250\\ \\text{J}$'),
        exampleAnswer: say('$250$ J: $\\cos 60^\\circ=\\frac{1}{2}$ delako.', '$250$ J, porque $\\cos 60^\\circ=\\frac{1}{2}$.', '$250$ J لأن $\\cos 60^\\circ=\\frac{1}{2}$.', '$250$ J, because $\\cos 60^\\circ=\\frac{1}{2}$.')
    }
}
